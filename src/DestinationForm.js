import React, { Component } from "react";
import Destinations from "./Destinations";
import { v4 as uuidv4 } from "uuid";

export default class DestinationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desMarkers: JSON.parse(localStorage.getItem("markers")) || [],
      destination: "",
      des: JSON.parse(localStorage.getItem("destinations")) || [],
      activity: "",
    };
  }

  handleDeleteDestination = (id) => {
    let newDes = this.state.des.filter((d) => {
      return d.id !== id;
    });

    let newMarkers = newDes.map((i) => [...i.coords]);
    this.setState({ des: newDes, desMarkers: newMarkers }, () => {
      localStorage.setItem("destinations", JSON.stringify(newDes));
      localStorage.setItem("markers", JSON.stringify(newMarkers));
      this.props.setMarkers(JSON.parse(localStorage.getItem("markers")));
      this.props.setCoords(JSON.parse(localStorage.getItem("markers")));
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { coords } = this.props;
    const { destination, activity } = this.state;
    if (coords === null) return;
    this.setState(
      {
        desMarkers: [...this.state.desMarkers, this.props.coords],
        des: [
          ...this.state.des,
          { destination, coords, activity, id: uuidv4() },
        ],
      },
      () => this.props.setMarkers(this.state.desMarkers)
    );

    this.setState({ destination: "", activity: "" });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prev, cur) {
    if (cur.desMarkers.length !== 0 && cur !== null) {
      this.saveToLocalStorage(cur);
    }
  }

  saveToLocalStorage = (des) => {
    localStorage.setItem("markers", JSON.stringify(des.desMarkers));

    localStorage.setItem("destinations", JSON.stringify(des.des));
  };

  render() {
    return (
      <div>
        <div className="DestinationForm px-6 py-10 font-sans rounded-lg ">
          <form
            onSubmit={this.handleSubmit}
            className="shadow-xl rounded-lg px-4 py-6"
          >
            <div>
              <label
                htmlFor="destination"
                className="font-bold text-lg uppercase"
              >
                Name of the destination
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-center mb-5"
                type="text"
                name="destination"
                id="destination"
                value={this.state.destination}
                onChange={this.handleChange}
                placeholder="e.g University of Toronto"
              />
            </div>

            <div>
              <label htmlFor="activity" className="text-lg font-bold uppercase">
                Activity
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-center"
                type="text"
                name="activity"
                id="activity"
                value={this.state.activity}
                onChange={this.handleChange}
                placeholder="e.g Education"
              />
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg font-bold py-2 px-4  focus:outline-none focus:shadow-outline my-2"
              onClick={this.handleClick}
            >
              Add Destination
            </button>
          </form>
        </div>

        <Destinations
          delete={this.handleDeleteDestination}
          key={uuidv4()}
          des={this.state.des}
          handleFly={this.props.handleFly}
        />
      </div>
    );
  }
}
