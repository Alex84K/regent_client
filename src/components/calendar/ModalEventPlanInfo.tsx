import React, { useEffect, useState } from "react"
import {
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  MenuItem,
} from "@mui/material"
import { themesCompositions } from "../repertuar/repertuarThemes"
import {
  fetchCompositionAll,
  fetchCompositionByTheme,
} from "../../features/composition/compositionApi"
import { Composition } from "../../features/composition/types"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  addNewComposition,
  selectCompositionsList,
} from "../../features/composition/compositionSlice"
import { compositionSorted } from "../../utils/utils"
import { NewEventPlan } from "../../features/events_feature/type"
import {
  addNewEvent,
  getAllEvents,
  removeEventById,
  selectEvent,
} from "../../features/events_feature/eventPlanSlice"
import { style } from "./ModalAddCompositionInCalendar"

export interface PropsOpenClose {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalEventPlanInfo: React.FC<PropsOpenClose> = ({ open, setOpen }) => {
  const [title, setTitle] = useState("") // 👈 Поле для ввода названия
  const [filterCompositions, setFilterCompositions] = useState<Composition[]>(
    [],
  )
  const [filteredCompositions, setFilteredCompositions] = useState<
    Composition[]
  >([]) // 👈 Состояние для отфильтрованных композиций
  const [searchQuery, setSearchQuery] = useState("") // 👈 Состояние для поискового запроса
  const [nameRegent, setNameNameRegent] = useState("")
  const [nameCompositions, setNameCompositions] = useState("")
  const compositions = useAppSelector(selectCompositionsList)
  const eventPlan = useAppSelector(selectEvent)
  const dispatch = useAppDispatch()

  // Функция для получения композиций по теме
  const getCompositions = (theme: string) => {
    setNameCompositions(theme)
  }

  const deleteEvent = () => {
    if(eventPlan?.id) {
        dispatch(removeEventById(eventPlan?.id)).then(() => {
              dispatch(getAllEvents())
              setOpen(false)
            })
    } else {
        alert('Error!')
    }
  }


  // Эффект для обновления списка композиций при изменении данных
  useEffect(() => {
    setFilterCompositions(compositionSorted(compositions))
    setFilteredCompositions(compositionSorted(compositions)) // Изначально показываем все композиции
  }, [compositions, dispatch])

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style} className="col-lg-6 mx-auto mt-5 border rounded p-4">
        <Typography variant="h6">Cобытие</Typography>

        <h2 className="mb-3 mt-2"><b>Title:</b> {eventPlan?.title}</h2>
        <p><b>Number:</b> {eventPlan?.number}-{eventPlan?.book}</p>
        <p><b>Regent:</b> {eventPlan?.regent}</p>
        <Button variant="outlined" color="error" size="small" onClick={deleteEvent}>
          Delete
        </Button>
      </Box>
    </Modal>
  )
}

export default ModalEventPlanInfo
