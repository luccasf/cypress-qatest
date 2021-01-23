let routs = {
  postCreateLocation(body) {
    var request = {
      method: "POST",
      url:
        "https://api.fidel.uk/v1/programs/9d884fb1-bff0-4156-8da5-641a2c688fd6/locations",
      failOnStatusCode: false,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "fidel-key": "dashboard_e33fe6a3-293f-4e64-a35b-9fe942c0824b",
        "content-type": "application/json",
        "fidel-live": "false",
        origin: "https://dashboard.fidel.uk",
      },
      body: body,
    };
    return request;
  },
};
export { routs };
