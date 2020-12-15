import { parseCookies } from "nookies";
import Router from "next/router";

function ContactsPage({ contacts }) {
  const ContactsSection = () => {
    if (contacts) {
      return (
        <>
          {contacts.map((contact) => (
            <div
              className="flex my-1 cursor-pointer hover:bg-blue-lightest rounded"
              onClick={() => Router.push(`/contact/${contact.id}`)}
              key={contact.id}
            >
              <div className="w-4/5  h-10 py-3 px-1">
                <p className="hover:text-blue-dark">{contact.name}</p>
              </div>
              <div className="w-1/5 h-10 text-right p-3">
                <p className="text-sm text-grey-dark">.</p>
              </div>
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto p-6">
        <div className="relative rounded overflow-hidden border border-grey-light mb-8 bg-white">
          <div className="border-b border-grey-light p-4 bg-grey-lighter py-8">
            <div className="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
              <div className="sm:flex sm:items-center px-2 py-4">
                <div className="flex-grow">
                  <h3 className="font-normal px-2 py-3 leading-tight">
                    Contacts
                  </h3>
                  <div className="w-full">
                    <ContactsSection />
                  </div>
                </div>
              </div>
              <div className="sm:flex bg-grey-light sm:items-center px-2 py-4">
                <div className="flex-grow text-right">
                  <button
                    className="text-black py-2 px-4 rounded"
                    onClick={() => Router.push("/add-contact")}
                  >
                    Create New
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt;

  const res = await fetch("http://localhost:1337/contacts", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const contacts = await res.json();

  return {
    props: {
      contacts: contacts,
    },
  };
}

export default ContactsPage;
