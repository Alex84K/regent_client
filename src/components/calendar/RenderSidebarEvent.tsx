import { EventApi, formatDate } from "@fullcalendar/core/index.js";
import styles from "./Calendar.module.css"

// ✅ Функция renderSidebarEvent тоже выше
export default function RenderSidebarEvent(event: EventApi) {
    return (
      <li key={event.id} className={styles.li}>
        <b className={styles.b}>
          {formatDate(event.start!, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    )
  }