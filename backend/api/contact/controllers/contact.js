"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.contact.create(
        { ...data, users_permissions_user: user.id },
        { files }
      );
    } else {
      entity = await strapi.services.contact.create({
        ...ctx.request.body,
        users_permissions_user: user.id,
      });
    }
    return sanitizeEntity(entity, { model: strapi.models.contact });
  },

  async me(ctx) {
    let entities;
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    entities = await strapi.services.contact.find({
      users_permissions_user: user.id,
    });

    if (!entities) {
      return ctx.notFound();
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.contact })
    );
  },
};
