import { EventInput } from "@fullcalendar/core/index.js"
import { createAppSlice } from "../../app/createAppSlice"
import {
  fetchEditEventById,
  fetchEventById,
  fetchEventsAll,
  fetchEventsAllByMonth,
  fetchNewEvent,
  fetchRemoveEventById,
} from "./eventsPlanApi"
import { EventPlan, EventsByMonthsDto, EventState, NewEventPlan } from "./type"

const initialState: EventState = {
  eventPlan: {} as EventPlan,
  eventsList: [] as EventPlan[],
  errorMessage: "",
  status: "idle",
}

export const eventPlanSlice = createAppSlice({
  name: "event_plan",
  initialState,
  reducers: create => ({
    getAllEvents: create.asyncThunk(
      async () => {
        const response = await fetchEventsAll()
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.eventsList = action.payload
          state.status = "success"
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
          state.status = "error"
        },
      },
    ),
    getAllEventsBuMonth: create.asyncThunk(
      async (dto: EventsByMonthsDto) => {
        const response = await fetchEventsAllByMonth(dto)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.eventsList = action.payload
          state.status = "success"
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
          state.status = "error"
        },
      },
    ),
    resetError: create.reducer(state => {
      state.errorMessage = ""
    }),
    getEventById: create.asyncThunk(
      async (id: string) => {
        const response = await fetchEventById(id)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.eventPlan = action.payload
          state.status = "success"
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
          state.status = "error"
        },
      },
    ),
    removeEventById: create.asyncThunk(
      async (id: string) => {
        const response = await fetchRemoveEventById(id)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.eventPlan = {} as EventPlan
          state.status = "success"
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
          state.status = "error"
        },
      },
    ),
    addNewEvent: create.asyncThunk(
      async (dto: NewEventPlan) => {
        const response = await fetchNewEvent(dto)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.eventPlan = action.payload
          state.status = "idle"
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
          state.status = "idle"
        },
      },
    ),
    editEventPlan: create.asyncThunk(
      async (dto: EventInput) => {
        const response = await fetchEditEventById(dto)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.eventPlan = action.payload
          state.status = "success"
        },
        rejected: state => {
          state.status = "error"
        },
      },
    ),
  }),

  selectors: {
    selectEvent: state => state.eventPlan,
    selectEventsList: state => state.eventsList,
    selectError: state => state.errorMessage,
    selectCompositionStatus: state => state.status,
  },
})
export const {
  getAllEvents,
  resetError,
  getEventById,
  removeEventById,
  editEventPlan,
  getAllEventsBuMonth,
  addNewEvent
} = eventPlanSlice.actions

export const {
  selectEvent,
  selectEventsList,
  selectError,
  selectCompositionStatus,
} = eventPlanSlice.selectors
