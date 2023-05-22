import logo from "./logo.svg";
import "./App.css";
import { Fragment, useState } from "react";
import axios from "axios";

function App() {
  const [dataTampil, setDataTampil] = useState([]);
  const [pencarian, setPencarian] = useState("Jalan Jalan ke Kota Jakarta");
  const setCAri = (e) => {
    setPencarian(e.target.value);
  };

  const ambilData = () => {
    axios
      .get(`https://api.rekreasi.com/api/activities?filter[title]=${pencarian}`)
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

  return (
    <Fragment>
      <div>
        <header className="App-header max-h-screen p-1 flex">
          <img src={logo} className="App-logo h-12" alt="logo" />
          <div className="">React js. prakter membuat filter rekreasi.com</div>
        </header>
      </div>
      <div className="App grid grid-cols-3 min-h-screen bg-[#282c34] ">
        <div className="bg-blue-100 col-span-1 p-10 ">
          <div>nama:</div>
          <input
            className="w-full bg-blue-200 px-5 py-6 font-mono font-semibold text-2xl  h-12 rounded-2xl"
            onChange={setCAri}
            onKeyDown={cari}
          />
        </div>

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
    </Fragment>
  );
}

export default App;
