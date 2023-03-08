import React, { Component } from "react";

import "./MapApplication.css";
import MyMap from "./MyMap";
export default class MapApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
    };
    this.mapRef = React.createRef();
  }

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  };
  render() {
    const { latitude, longitude } = this.state;

    return (
      <div className="MapApplication flex items-center justify-center my-12 rounded-lg ">
        {latitude || longitude ? (
          <div>
            <nav className="bg-stone-50 border-black rounded p-6 ">
            <h1 className="font-bold text-4xl tracking-wide uppercase font-serif">
              Destination Tracker
            </h1>
            </nav>
            <MyMap lat={latitude} long={longitude} />
          </div>
        ) : (
          <div>
            <div
              className="inline-block my-20 h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spinner-grow_0.75s_linear_infinite]"
              role="status"
            ></div>

            <h1 className="MapApplication-primary-heading">Loading...</h1>
          </div>
        )}
      </div>
    );
  }
}
