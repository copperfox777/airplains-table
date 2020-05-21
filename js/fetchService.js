class FetchService {
  url =
    "https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48";
  // _apiBase = 'https://data-live.flightradar24.com/zones/fcgi/feed.js';
  // _url = '?bounds=56.84,55.27,33.48,41.48';

  getAnyAPIResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    const data = await res.json();
    return data;
    // return await res.json();
  };

  getFlights = async () => {
    const res = await this.getAnyAPIResource(this.url);
    return this.transformData(res);
  };

  _computeDistance = (x0, y0, x1, y1) =>
    ((x0 - x1) ** 2 + (y0 - y1) ** 2).toFixed(2);

  transformData = (data) => {
    delete data.full_count;
    delete data.version;
    const dataArray = Object.values(data);
    const transformedData = dataArray.map((item) => {
      return {
        flightNumber: item[16],
        coordinates: `${item[1]} ${item[2]}`,
        speed: item[5],
        cousre: item[3],
        altitude: item[4],
        airports: `${item[11]} ${item[12]}`,
        distance: this._computeDistance(55.41, 37.902, item[1], item[2]),
      };
    });
    // console.log('dataArray', dataArray);
    // console.log('transformedData', transformedData)
    return transformedData;
  };
}
