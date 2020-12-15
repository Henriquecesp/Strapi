import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { withRouter } from "next/router";
import Select from "@/components/contact-type-select";

const Contact = ({ router }) => {
  const [actualContact, setActualContact] = useState({});
  const [contactPhones, setContactPhones] = useState([]);
  const [contactEmails, setContactEmails] = useState([]);
  const [telephoneTypes, setTelephoneTypes] = useState([]);
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const jwt = parseCookies().jwt;

  useEffect(() => {
    fetch(`http://localhost:1337/contacts/${router.query.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setActualContact(data));

    fetch(`http://localhost:1337/telephone-types`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTelephoneTypes(data));
  }, []);

  useEffect(() => {
    if (actualContact.emails) {
      setContactEmails(actualContact.emails);
    }
    if (actualContact.telephones) {
      setContactPhones(actualContact.telephones);
    }
  }, [actualContact]);

  async function handleSubmitEmail(e) {
    e.preventDefault();

    const data = {
      email,
      contact: Number(router.query.id),
    };

    const submit = await fetch("http://localhost:1337/emails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });

    const response = await submit.json();

    setContactEmails((emails) => [...emails, response]);
  }

  async function handleSubmitTelephone(e) {
    e.preventDefault();
    const jwt = parseCookies().jwt;

    const data = {
      telephone,
      contact: Number(router.query.id),
      telephone_type: 2,
    };

    const submit = await fetch("http://localhost:1337/telephones", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });

    const response = await submit.json();

    setContactPhones((phones) => [...phones, response]);
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto p-6">
      <div className="relative rounded overflow-hidden border border-grey-light mb-8 bg-white">
        <div className="border-b border-grey-light p-4 bg-grey-lighter py-8">
          <form className="mx-auto max-w-sm">
            <h3 className="font-bold leading-tight">{actualContact.name}</h3>
            <br />
            <div className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    E-mail
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-gray-600 text-xs italic">
                    You can add many emails as you want
                  </p>
                  {contactEmails &&
                    contactEmails.map((mail) => (
                      <div
                        className="flex my-1 cursor-pointer hover:bg-blue-lightest rounded"
                        key={email.id}
                      >
                        <div className="w-4/5 py-3 px-1">
                          <p className="hover:text-blue-dark">{mail.email}</p>
                        </div>
                        <div className="py-3">
                          <p className="hover:text-blue-dark">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
                            </svg>
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <button
                  className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={handleSubmitEmail}
                >
                  Add
                </button>
              </div>
              <div className="md:w-2/3"></div>
            </div>
            <br />
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Telephone
                </label>
                <div className="flex items-start h-12">
                  <input
                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="telephone"
                    type="telephone"
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                  <Select options={telephoneTypes} />
                </div>
                <p className="text-gray-600 text-xs italic">
                  You can add many telephone as you want
                </p>
                {contactPhones &&
                  contactPhones.map((telephone) => (
                    <div
                      className="flex my-1 cursor-pointer hover:bg-blue-lightest rounded"
                      key={telephone.id}
                    >
                      <div className="w-2/5 py-3 px-1">
                        <p className="hover:text-blue-dark">
                          {telephone.telephone}
                        </p>
                      </div>
                      <div className="w-2/5 text-right p-3">
                        <p className="hover:text-blue-dark">
                          {telephone.telephone_type &&
                            telephone.telephone_type.name}
                        </p>
                      </div>
                      <div className="py-3">
                        <p className="hover:text-blue-dark">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
                          </svg>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <button
                  className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={handleSubmitTelephone}
                >
                  Add
                </button>
              </div>
              <div className="md:w-2/3"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Contact);
