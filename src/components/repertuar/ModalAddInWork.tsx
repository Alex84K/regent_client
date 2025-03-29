import { Button, Box, Typography, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { themesCompositions } from "./repertuarThemes";
import { AddCompositionInWorkDto, NewComposition } from "../../features/composition/types";
import { addCompositionInWork, fetchNewComposition } from "../../features/composition/compositionApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNewEvent } from "../../features/events_feature/eventPlanSlice";
import { NewEventPlan } from "../../features/events_feature/type";
import { addCompositionInJob, getCompositionById, getCompositionsByTheme, selectComposition } from "../../features/composition/compositionSlice";
import { PropsOpenClose } from "../calendar/ModalEventPlanInfo";

const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};


const ModalAddInWork: React.FC<PropsOpenClose> = ({open, setOpen}) => {
  const dispatch = useAppDispatch();
  const composition = useAppSelector(selectComposition);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [nameDirigent, setNameDirigent] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const addCompos = () => {
    console.log(composition.id);
    
    if (selectedDate) {
      const dto: AddCompositionInWorkDto = {
        id: composition.id, // Теперь TypeScript понимает id
        lastDirigent: nameDirigent,
      };

      const newEventDto: NewEventPlan = {
        title: composition.name,
        book: composition.book,
        number: composition.number,
        regent: nameDirigent,
        start: new Date(selectedDate), // Преобразуем строку в объект Date
      };
        dispatch(addNewEvent(newEventDto))
        dispatch(addCompositionInJob(dto)).then(() => dispatch(getCompositionsByTheme(composition.theme)));
        setOpen(false);
        //window.location.reload(); // Перезагрузка страницы
    } else {
      alert("Bitte wählen Sie ein Datum.");
    }
  };

  useEffect(() => {
    //dispatch(getCompositionById(id))
  },[dispatch])

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="row">
          <Box sx={style} className="col-lg-6 mx-auto mt-5 border rounded">
            <Typography variant="h6">Fügen Sie ein Werk hinzu</Typography>
            <Typography sx={{ mt: 2 }}>Füllen Sie alle Felder aus.</Typography>
            <div>
              <div className="mb-3">
                <label className="form-label">Dirigent:</label>
                <input
                  type="text"
                  className="form-control"
                  value={nameDirigent}
                  onChange={(e) => setNameDirigent(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Datum:</label>
                <input
                  type="date" // Используем стандартный HTML DatePicker
                  className="form-control"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)} // Устанавливаем значение выбранной даты
                />
              </div>

              <div className="d-flex flex-row-reverse">
                <button className="btn btn-primary" onClick={addCompos}>
                  Hinzufügen
                </button>
              </div>
            </div>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddInWork;
