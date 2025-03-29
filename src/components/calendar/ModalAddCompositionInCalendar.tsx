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
  addCompositionInWork,
  fetchCompositionAll,
  fetchCompositionByTheme,
} from "../../features/composition/compositionApi"
import {
  AddCompositionInWorkDto,
  Composition,
} from "../../features/composition/types"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  addNewComposition,
  getCompositionById,
  selectComposition,
  selectCompositionsList,
} from "../../features/composition/compositionSlice"
import { compositionSorted } from "../../utils/utils"
import { NewEventPlan } from "../../features/events_feature/type"
import {
  addNewEvent,
  getAllEvents,
} from "../../features/events_feature/eventPlanSlice"

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedStart: string
  selectedEnd: string
  calendarApi: any // 👈 Получаем API календаря из CalendarApp
}

export const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh", // 🔹 Ограничение высоты модалки
  overflowY: "auto", // 🔹 Добавляем прокрутку, если контент выходит за пределы
  borderRadius: "10px", // 🔹 Добавим скругление углов для красоты
}

const ModalAddCompositionInCalendar: React.FC<Props> = ({
  open,
  setOpen,
  selectedStart,
  selectedEnd,
  calendarApi,
}) => {
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
  const [compositions, setCompositions] = useState<Composition[]>([])
  const composition = useAppSelector(selectComposition)
  const dispatch = useAppDispatch()

  // Функция для получения композиций по теме
  const getCompositions = (selectedValue: string) => {
    console.log(selectedValue)

    setNameCompositions(selectedValue)

    // Разбиваем строку по `/` и `-`, так как в выпадающем списке формат "name/book-number"
    const [namePart, bookAndNumber] = selectedValue.split("/")
    const [bookPart, numberPart] = bookAndNumber?.split("-") || []

    // Находим выбранную композицию по всем трем полям
    const selectedComposition = filterCompositions.find(
      comp =>
        comp.name === namePart.trim() &&
        comp.book === bookPart?.trim() &&
        comp.number === numberPart?.trim(),
    )

    if (selectedComposition) {
      dispatch(getCompositionById(selectedComposition.id))
    }
  }

  // Добавление события в календарь
  const handleAddEvent = () => {
    const newTitle = `${nameCompositions}/${nameRegent}`

    if (!newTitle.trim()) {
      alert("Введите название события!")
      return
    }
    // Преобразуем selectedStart в Date с временем (например, текущим временем)
    const dateString = selectedStart // "2025-03-28"
    const dateObj = new Date(dateString) // Создаем объект Date

    // Форматируем в ISO строку с временем (например, "2025-03-28T16:26:40.887+00:00")
    const isoStringWithTime = dateObj.toISOString() // Автоматически добавляет время и часовой пояс

    setTitle(newTitle) // Устанавливаем title после проверки
    const newEventDto: NewEventPlan = {
      title: composition.name,
      book: composition.book,
      number: composition.number,
      regent: nameRegent,
      start: dateObj,
    }

    const newInWorkDto: AddCompositionInWorkDto = {
      id: composition.id,
      lastDirigent: nameRegent,
    }
    
    dispatch(addNewEvent(newEventDto)).then(() => {
      addCompositionInWork(newInWorkDto)
      dispatch(getAllEvents()) // 🔥 Загружаем обновленный список событий
    })

    setOpen(false) // Закрываем модальное окно
    setTitle("") // Очищаем поле ввода
  }

  // Эффект для обновления списка композиций при изменении данных
  useEffect(() => {
    fetchCompositionAll().then(data => setCompositions(data))

    setFilterCompositions(compositionSorted(compositions))
    setFilteredCompositions(compositionSorted(compositions)) // Изначально показываем все композиции
  }, [compositions, dispatch])

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style} className="col-lg-6 mx-auto mt-5 border rounded p-4">
        <Typography variant="h6">Добавить событие</Typography>
        <Typography sx={{ mt: 2 }}>
          Дата: {selectedStart} - {selectedEnd}
        </Typography>

        {/* Поле ввода названия события */}
        <TextField
          fullWidth
          label="Regent name"
          variant="outlined"
          value={nameRegent}
          onChange={e => setNameNameRegent(e.target.value)}
          sx={{ mt: 2 }}
        />

        <div className=" mt-2">
          <TextField
            id="outlined-select-currency"
            select
            label="Composition name"
            helperText="Please select your currency"
            className="w-100"
            onChange={e => {
              getCompositions(e.target.value)
            }}
          >
            {filterCompositions.map((t, i) => (
              // Используем уникальный key
              <MenuItem
                key={`${t.id}`}
                value={`${t.name}/${t.book}-${t.number}`}
              >
                {t.name}/{t.book}-{t.number}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* Кнопки */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleAddEvent}>
            Добавить
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalAddCompositionInCalendar
