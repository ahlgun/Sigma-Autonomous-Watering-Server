## Sigma Autonomous Watering Server Side

#### By Niklas & Gunnar

#### Server side functions:

##### chipGetStations:
      Endpoint: /api/getStation,
      Payload: {key: chipKey},
      Response: {...station}.

      Retrieve a station with Fetch:

      var request = new Request('https://sigma-itc-watering.herokuapp.com/api/getStation', {
                  method: 'POST',
                  body: JSON.stringify({key: chipKey}), //chipKey = a string with chips key
                  mode: "cors",
                  headers: new Headers({
                      'Accept': 'application/json, text/plain, */*',
                      'Content-Type': 'application/json'
                  })
              });
              fetch(request)
                  .then(function (response) {
                      return response.json()
                  })
                        .then((data) => {
                            console.log(data)
                            })
                  .catch(function (error) {
                      console.log(error)
      				})

-----------------------------------------------------------------------------------------------------