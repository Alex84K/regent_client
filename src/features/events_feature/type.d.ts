export interface EventState {
  eventPlan?: EventPlan
  eventsList?: EventPlan[]
  errorMessage?: string
  status?: "idle" | "loading" | "success" | "error"
}

export interface EventPlan {
  id: string
  title: string
  book: string
  number: string
  regent: string
  start: Date
  startStr?: string
}

export interface NewEventPlan {
  title: string
  book: string
  number: string
  regent: string
  start: Date
}

export interface EventsByMonthsDto {
  month: string
  year: string
}
