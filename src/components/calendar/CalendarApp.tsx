import React, { useEffect, useState } from "react"
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { INITIAL_EVENTS, createEventId } from "./event-utils"
import styles from "./Calendar.module.css"
import ModalAddCompositionInCalendar from "./ModalAddCompositionInCalendar"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  getAllEvents,
  getAllEventsBuMonth,
  getEventById,
  removeEventById,
  selectEventsList,
} from "../../features/events_feature/eventPlanSlice"
import { EventsByMonthsDto } from "../../features/events_feature/type"
import ModalEventPlanInfo from "./ModalEventPlanInfo"
import { EventPlan, RenderSidebar } from "./RenderSidebar"

// ✅ Функция renderSidebar теперь выше CalendarApp


// ✅ Функция renderEventContent теперь тоже выше CalendarApp
function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b className={styles.b}>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}


const CalendarApp: React.FC = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
  const [currentEventsPlan, setCurrentEventsPlan] = useState<EventPlan[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [openModalEventInfo, setOpenModalEventInfo] = useState(false)
  const [selectedStart, setSelectedStart] = useState("")
  const [selectedEnd, setSelectedEnd] = useState("")
  const [calendarApi, setCalendarApi] = useState<any>(null)
  const dispatch = useAppDispatch()
  const initial_events = useAppSelector(selectEventsList)

  useEffect(() => {
    dispatch(getAllEvents())
  }, [])

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedStart(selectInfo.startStr)
    setSelectedEnd(selectInfo.endStr)
    setCalendarApi(selectInfo.view.calendar)
    setOpenModal(true)
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    dispatch(getEventById(clickInfo.event._def.publicId))
    setOpenModalEventInfo(true)
    console.log(clickInfo)
    const eventDate = clickInfo.event.start // Получаем объект Date
    const formattedDate = eventDate
      ? formatDate(eventDate, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Дата неизвестна"

    console.log("Выбранное событие:", clickInfo.event.title)
    console.log("Дата события:", formattedDate)
    /*dispatch(removeEventById(clickInfo.event._def.publicId))
    if (confirm(`Удалить событие "${clickInfo.event.title}"?`)) {
      clickInfo.event.remove()
    }*/
  }

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events)
  }

  return (
    <div className="demo-app">
      {RenderSidebar(weekendsVisible, setWeekendsVisible, currentEventsPlan)}

      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          //initialEvents={INITIAL_EVENTS}
          //initialEvents={initial_events}
          events={initial_events}
          select={handleDateSelect}
          eventContent={renderEventContent} // ✅ Ошибка пропадёт
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>

      <ModalAddCompositionInCalendar
        open={openModal}
        setOpen={setOpenModal}
        selectedStart={selectedStart}
        selectedEnd={selectedEnd}
        calendarApi={calendarApi}
      />

      <ModalEventPlanInfo
        open={openModalEventInfo}
        setOpen={setOpenModalEventInfo}
      />
    </div>
  )
}

export default CalendarApp
