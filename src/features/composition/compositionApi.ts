import axios from "axios";
import { apiUrl } from "../../App";
import { Composition, NewComposition } from "./types";

export const fetchNewComposition = async (dto: NewComposition):Promise<Composition> => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/compositions`, {
      name: dto.name,
      book: dto.book,
      number: dto.number,
      theme: dto.theme
    });

    console.log(response.data);
    return response.data
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    throw error;
  }
};

export const fetchCompositionByTheme = async (theme: string):Promise<Composition[]> => {
    console.log(theme);
    
    try {
      const response = await axios.get(`${apiUrl}/api/v1/compositions/themes/${theme}
`, {});
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      throw error;
    }
  };
