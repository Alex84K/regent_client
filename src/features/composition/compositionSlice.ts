import { createAppSlice } from "../../app/createAppSlice"
import { addCompositionInWork, fetchCompositionAll, fetchCompositionById, fetchCompositionByTheme, fetchNewComposition } from "./compositionApi"
import { AddCompositionInWorkDto, Composition, CompositionState, NewComposition } from "./types"

const initialState: CompositionState = {
  composition: {} as Composition,
  compositionsList: [] as Composition[],
  errorMessage: "",
  status: "idle",
}

export const compositionSlice = createAppSlice({
  name: "composition",
  initialState,
  reducers: create => ({
    getAllCompositions: create.asyncThunk(
      async () => {
        const response = await fetchCompositionAll()
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.compositionsList = action.payload
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
    getCompositionById: create.asyncThunk(
      async (id: string) => {
        const response = await fetchCompositionById(id)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.composition = action.payload
          state.status = "success"
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
          state.status = "error"
        },
      },
    ),
    getCompositionsByTheme: create.asyncThunk(
      async (theme: string) => {
        const response = await fetchCompositionByTheme(theme)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.compositionsList = action.payload
          state.status = "success"
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
          state.status = "error"
        },
      },
    ),
    addNewComposition: create.asyncThunk(
      async (dto: NewComposition) => {
        const response = await fetchNewComposition(dto)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.composition = action.payload
          state.status = "idle"
        },
        rejected: (state, action) => {
          state.errorMessage = action.error.message
          state.status = "idle"
        },
      },
    ),
    addCompositionInJob: create.asyncThunk(
      async (dto: AddCompositionInWorkDto) => {
        const response = await addCompositionInWork(dto)
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.composition = action.payload
          state.status = "success"
        },
        rejected: state => {
          state.status = "error"
        },
      },
    ),

  }),

  selectors: {
    selectComposition: state => state.composition,
    selectCompositionsList: state => state.compositionsList,
    selectError: state => state.errorMessage,
    selectCompositionStatus: state => state.status,
  },
})
export const { getAllCompositions, resetError, getCompositionById, getCompositionsByTheme, addNewComposition, addCompositionInJob } = compositionSlice.actions

export const {
    selectComposition,
    selectCompositionsList,
  selectError,
  selectCompositionStatus,
} = compositionSlice.selectors
