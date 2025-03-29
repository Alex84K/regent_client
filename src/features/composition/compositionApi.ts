import axios from "axios"
import { apiUrl } from "../../App"
import { AddCompositionInWorkDto, Composition, NewComposition } from "./types"

export const fetchNewComposition = async (
  dto: NewComposition,
): Promise<Composition> => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/compositions`, {
      name: dto.name,
      book: dto.book,
      number: dto.number,
      theme: dto.theme,
    })

    //console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error)
    throw error
  }
}

export const fetchCompositionAll = async (): Promise<Composition[]> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/compositions
`,
      {},
    )
    //console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error)
    throw error
  }
}

export const fetchCompositionByTheme = async (
  theme: string,
): Promise<Composition[]> => {
  console.log(theme)

  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/compositions/themes/${theme}
`,
      {},
    )
    //console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error)
    throw error
  }
}

export const addCompositionInWork = async (
  dto: AddCompositionInWorkDto,
): Promise<Composition> => {
  console.log(dto)

  try {
    const response = await axios.post(
      `${apiUrl}/api/v1/compositions/works
`,
{
  id: dto.id,
  lastDirigent: dto.lastDirigent
})
    //console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error)
    throw error
  }
}

export const fetchDeleteFromWorkComposition = async (
  id: string,
): Promise<Composition[]> => {

  try {
    const response = await axios.delete(
      `${apiUrl}/api/v1/compositions/works/${id}
`,
      {},
    )
    //console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error)
    throw error
  }
}

export const fetchCompositionById = async (
  id: string,
): Promise<Composition> => {

  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/compositions/${id}
`,
      {},
    )
    //console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error)
    throw error
  }
}
