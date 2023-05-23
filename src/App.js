import logo from "./logo.svg";
import "./App.css";
import { Fragment, useState } from "react";
import axios from "axios";
import { handleQueryingUrl } from "./utils";

function App() {
  const [dataTampil, setDataTampil] = useState([]);
  const [pencarian, setPencarian] = useState("Jalan Jalan ke Kota Jakarta");
  // const [golek, setGolek] = useState({});

  // console.log("query", handleQueryingUrl(golek));

  const ambilData = (filters) => {
    axios
      .get(
        `https://api.rekreasi.com/api/activities?${handleQueryingUrl(filters)}`
      )
      .then((res) => {
        // console.log("data ", res.data.data);
        setDataTampil(res.data.data);
        // console.log("data tampil", dataTampil[0]);
      });
  };
  const cari = (e) => {
    if (e.key === "Enter" || e.target.value > 0) {
      ambilData();
    } else {
      setDataTampil([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGolek = {};

    if (e.target.title.value) newGolek.title = e.target.title.value;
    else delete newGolek.title;
    if (e.target.minCost.value) newGolek.minCost = e.target.minCost.value;
    else delete newGolek.minCost;

    if (e.target.maxCost.value) newGolek.maxCost = e.target.maxCost.value;
    else delete newGolek.maxCost;
    // console.log("new", newGolek);
    ambilData(newGolek);
  };

  return (
    <>
      <div>
        <header className="App-header maxCost-h-screen p-1 flex">
          <img src={logo} className="App-logo h-12" alt="logo" />
          <div className="">React js. prakter membuat filter rekreasi.com</div>
        </header>
      </div>
      <div className="App grid grid-cols-3 minCost-h-screen bg-[#282c34] ">
        <form onSubmit={handleSubmit} className="bg-blue-100 col-span-1 p-10 ">
          <div className="text-left font-bold ml-4 text-xl mb-1">title:</div>
          <input
            name="title"
            // onChange={(e) => console.log(e.target.value)}
            className="w-full bg-blue-200 px-5 py-6 font-mono font-semibold text-2xl  h-12 rounded-2xl"
            // onChange={setCAri}
            // onKeyDown={cari}
          />{" "}
          <div className="text-left font-bold ml-4 text-xl mb-1">
            minCostim:
          </div>
          <input
            name="minCost"
            type="number"
            className="w-full bg-blue-200 px-5 py-6 font-mono font-semibold text-2xl  h-12 rounded-2xl"
            // onChange={setCAri}
            // onKeyDown={cari}
          />{" "}
          <div className="text-left font-bold ml-4 text-xl mb-1">maxCost:</div>
          <input
            name="maxCost"
            type="number"
            className="w-full bg-blue-200 px-5 py-6 font-mono font-semibold text-2xl  h-12 rounded-2xl"
            // onChange={setCAri}
            // onKeyDown={cari}
          />
          <button>testse</button>
        </form>

        <div className="grid bg-blue-100 col-span-2 p-10">
          {dataTampil.map((v, i) => (
            <div className="w-full bg-blue-400 rounded-xl mt-6 p-5 text-left text-[20px] ">
              <div className="grid grid-cols-5">
                <div className="font-bold">title:</div>
                <div className="col-span-4 font-semibold">
                  {v.attributes.title}
                </div>
              </div>
              <div className="grid grid-cols-5">
                <div className="font-bold">Deskripsi:</div>
                <div className="font-semibold col-span-4">
                  {v.attributes.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
