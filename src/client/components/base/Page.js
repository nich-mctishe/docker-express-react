import React, { Component } from 'react';

export default class Page extends Component {
  constructor() {
    if (new.target === Page) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }

  callApi = async () => {
    const response = await fetch('/api/hello'); //make this specific to the page
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };
}
