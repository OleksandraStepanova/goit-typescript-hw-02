import axios from "axios";
import { ApiResponse } from "../components/App.types";


const API_KEY = 'OAHwj3sXlSKWKQ6-XAkKr3pwCLMCCoi4KgLInJRzqyc';
axios.defaults.baseURL = 'https://api.unsplash.com/';


axios.defaults.params = {
    orientation: 'landscape',
    per_page: 12,
    client_id: API_KEY,
}

export const getPhotos = async (query:string, page:number):Promise<ApiResponse>=> {
  const {data} = await axios.get<ApiResponse>(`search/photos?query=${query}&page=${page}`);
  return data;
};