import axios from 'axios';

export default axios.create({
    baseURL: 'https://forms.achva.ac.il/calc/api/'
});