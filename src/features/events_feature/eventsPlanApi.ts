import axios from "axios"
import { EventPlan, EventsByMonthsDto, NewEventPlan } from "./type"
import { apiUrl } from "../../App"
import { EventInput } from "@fullcalendar/core/index.js"

export async function fetchEventsAll(): Promise<EventPlan[]> {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/events`, {
      headers: { "content-type": "application/json" },
    })
    return response.data
  } catch (error) {
    console.error("Error:", error)
    throw new Error("Failed to confirm email")
  }
}

export async function fetchEventsAllByMonth(
  dto: EventsByMonthsDto,
): Promise<EventPlan[]> {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/events/months/${dto.month}/years/${dto.year}`,
      {
        headers: { "content-type": "application/json" },
      },
    )
    return response.data
  } catch (error) {
    console.error("Error:", error)
    throw new Error("Failed to confirm email")
  }
}

export async function fetchNewEvent(dto: NewEventPlan): Promise<EventPlan> {
  try {
    const response = await axios.post(
      `${apiUrl}/api/v1/events
    `,
      {
        title: dto.title,
        book: dto.book,
        number: dto.number,
        regent: dto.regent,
        start: dto.start,
      },
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error:", error)
    throw new Error("Failed")
  }
}

export async function fetchEventById(id: string): Promise<EventPlan> {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/events/${id}`, {
      headers: { "content-type": "application/json" },
    })
    return response.data
  } catch (error) {
    console.error("Error:", error)
    throw new Error("Failed to confirm email")
  }
}

export async function fetchRemoveEventById(id: string): Promise<EventPlan> {
  try {
    const response = await axios.delete(`${apiUrl}/api/v1/events/${id}`, {
      headers: { "content-type": "application/json" },
    })
    return response.data
  } catch (error) {
    console.error("Error:", error)
    throw new Error("Failed to confirm email")
  }
}

export async function fetchEditEventById(dto: EventInput): Promise<EventPlan> {
  try {
    const response = await axios.put(
      `${apiUrl}/api/v1/events
    `,
      {
        id: dto.id,
        title: dto.title,
        start: dto.start,
      },
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error:", error)
    throw new Error("Failed to confirm email")
  }
}
