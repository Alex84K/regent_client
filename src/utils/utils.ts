import { EventApi } from "@fullcalendar/core/index.js"
import { Composition } from "../features/composition/types"
import { EventPlan } from "../features/events_feature/type"

export const compositionSorted = (compositions: Composition[]) => {
  return compositions.slice().sort((a, b) => a.name.localeCompare(b.name))
}

export const compositionSortedAndToUpperCase = (
  compositions: Composition[],
) => {
  return compositions.slice().sort((a, b) => a.name.localeCompare(b.name))
}

export const formatEventDate = (date: Date | string): string => {
  // Преобразуем строку в объект Date, если это нужно
  const eventDate = date instanceof Date ? date : new Date(date);

  // Проверяем, если это валидная дата
  if (isNaN(eventDate.getTime())) {
    return "Invalid Date";
  }

  return eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}