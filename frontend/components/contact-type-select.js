import { useState } from "react";

const Select = ({ options, handleChangeOption, handleSubmitOption }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="flex-auto flex flex-col items-center h-64">
      <div className="flex flex-col items-center relative">
        <div className="w-full  svelte-1l8159u">
          <div className="my-2 bg-white p-1 flex border border-gray-200 rounded svelte-1l8159u">
            <div className="flex flex-auto flex-wrap"></div>
            <input
              value="Javascript"
              className="p-1 px-2 appearance-none outline-none w-full text-gray-800  svelte-1l8159u"
            />
            <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
              <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-chevron-up w-4 h-4"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute shadow top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
          <ul className="list-reset">
            <li className="p-2">
              <input
                className="border-2 rounded h-8 w-full"
                onChange={(e) => setText(e.target.value)}
                value={text}
                onFocus={() => setOpen(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setOpen(false);
                  }, 1000);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitOption(e, { name: text });
                  }
                }}
              />
              <br />
            </li>
            {open &&
              options.map((option) => (
                <li
                  key={option.id}
                  onClick={() => {
                    setText(option.name);
                    handleChangeOption(option.id);
                  }}
                >
                  <div
                    onClick={() => {
                      console.log(option.name);
                      setText(option.name);
                      handleChangeOption(option.id);
                    }}
                    className="mx-2 leading-6 cursor-pointer"
                  >
                    {option.name}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Select;
