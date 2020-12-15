import { useState } from "react";
import { parseCookies } from "nookies";
import Router from "next/router";

function AddContact() {
  const [name, setName] = useState("");

  async function handleContactCreate(e) {
    e.preventDefault();
    const jwt = parseCookies().jwt;

    const contact = {
      name,
    };

    const create = await fetch("http://localhost:1337/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(contact),
    });

    const createResponse = await create.json();

    Router.push(`/contact/${createResponse.id}`);
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto p-6">
      <div className="relative rounded overflow-hidden border border-grey-light mb-8 bg-white">
        <div className="border-b border-grey-light p-4 bg-grey-lighter py-8">
          <div className="mx-auto max-w-sm">
            <h3 className="font-normal leading-tight">New Contact</h3>
            <br />
            <form class="w-full max-w-lg">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Name
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p class="text-gray-600 text-xs italic">
                    Complete name or nickname of the contact
                  </p>
                </div>
              </div>
              <div class="md:flex md:items-center">
                <div class="md:w-1/3">
                  <button
                    class="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={handleContactCreate}
                  >
                    Create
                  </button>
                </div>
                <div class="md:w-2/3"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddContact;
