import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useState, useEffect } from "react"
import { getEventById, selectEventsList } from "../../features/events_feature/eventPlanSlice"
import styles from "./Calendar.module.css"
import ModalEventPlanInfo from "./ModalEventPlanInfo"
import { formatEventDate } from "../../utils/utils"

// Тип EventPlan, который уже имеется в вашем коде
export interface EventPlan {
  id: string
  title: string
  book: string
  number: string
  regent: string
  start: Date
  startStr?: string
}

export const RenderSidebar = (
  weekendsVisible: boolean,
  setWeekendsVisible: React.Dispatch<React.SetStateAction<boolean>>,
  currentEvents: EventPlan[], // Используем тип EventPlan
) => {
  const dispatch = useAppDispatch()
  const eventsList = useAppSelector(selectEventsList)

  const [openModalEventInfo, setOpenModalEventInfo] = useState(false)
  const [filterText, setFilterText] = useState("") // Состояние для фильтра
  const [filteredEvents, setFilteredEvents] = useState<EventPlan[]>([]) // Состояние для отфильтрованных событий

  // Функция для фильтрации событий
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value
    setFilterText(filter)

    if(eventsList) {
        if (filter === "") {
            setFilteredEvents(eventsList) // Если фильтр пустой, показываем все события
          } else {
            const filtered = eventsList.filter(
              (e) =>
                e.title.toLowerCase().includes(filter.toLowerCase()) ||
                formatEventDate(e.start) // Фильтрация по названию и дате
                  .toLowerCase()
                  .includes(filter.toLowerCase())
            )
            setFilteredEvents(filtered) // Устанавливаем отфильтрованные события
          }
    }
    
  }

  const handleEventClick = (id: string) => {
    dispatch(getEventById(id))
    setOpenModalEventInfo(true)
  }

  useEffect(() => {
    // Устанавливаем список отфильтрованных событий при первоначальной загрузке
    if(eventsList){
        setFilteredEvents(eventsList)
    }
    
  }, [eventsList])

  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h2>Все события ({filteredEvents.length})</h2>

        {/* Добавление поля для ввода */}
        <input
          type="text"
          placeholder="Фильтровать события..."
          value={filterText}
          onChange={handleFilterChange}
          className={`${styles.filterInput} mt-3`}
        />

        <ul className={styles.ul}>
          {filteredEvents.map((e) => (
            <li key={e.id} onClick={() => handleEventClick(e.id)} className="cursor_pointer">
              {formatEventDate(e.start)} {e.title}
            </li>
          ))}
        </ul>
      </div>

      <ModalEventPlanInfo
        open={openModalEventInfo}
        setOpen={setOpenModalEventInfo}
      />
    </div>
  )
}
