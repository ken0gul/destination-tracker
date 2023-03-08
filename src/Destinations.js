import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";

export default class Destinations extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.des !== prevState.des) {
      return { des: nextProps.des };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      des: [props.des],
    };
  }

  render() {
    return (
      <ul className="overflow-scroll h-80">
        {this.state.des?.map((d) => {
          return (
            <div>
              <li
                key={d.id}
                className="flex items-center justify-around my-6 border-2 border-slate-200 rounded-xl p-2 "
              >
                <p className="font-sans">
                  <span className="text-lg font-bold italic font-sans">
                    Name:{" "}
                  </span>
                  {d.destination}
                </p>
                <p className="font-sans">
                  <span className="text-lg font-bold italic font-sans">
                    Activity:{" "}
                  </span>
                  {d.activity}
                </p>
                <div className="">
                  <button
                    type="button"
                    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 "
                    onClick={() => this.props.delete(d.id)}
                  >
                    X
                  </button>
                  <button
                    type="button"
                    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 "
                    onClick={() => this.props.handleFly(d.coords)}
                  >
                    GO
                  </button>
                </div>
                {/* <button onClick={() => this.props.delete(d.id)}>delete</button> */}
              </li>
            </div>
          );
        })}
      </ul>
    );
  }
}
