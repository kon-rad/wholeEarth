import axios from 'axios';
import { getImageDate } from './DataFormatter';

const NASA_API_URL = 'https://epic.gsfc.nasa.gov';

export default class PasteCloud {
  constructor() {}

  getLatestMetadata() {
    return axios
      .get(`${NASA_API_URL}/api/natural`)
      .then(response => response.data)
      .catch(err => console.log(err));
  }

  getFullImageFilePath(name, identifier) {
    const { year, mon, day } = getImageDate(identifier);
    return `${NASA_API_URL}/archive/natural/${year}/${mon}/${day}/png/${name}.png`;
  }

  getMedImageFilePath(name, identifier) {
    const { year, mon, day } = getImageDate(identifier);
    return `${NASA_API_URL}/archive/natural/${year}/${mon}/${day}/jpg/${name}.jpg`;
  }

  getImageDate(identifier) {
    const year = identifier.substring(0, 4);
    const mon = identifier.substring(4, 6);
    const day = identifier.substring(6, 8);
    return { year, mon, day };
  }
}

