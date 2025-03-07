import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { useState } from "react"
import { themesCompositions } from "./repertuarThemes"
import { NewComposition } from "../../features/composition/types"
import { fetchNewComposition } from "../../features/composition/compositionApi"

const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}
const ModalAddComposition = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [name, setNane] = useState("")
  const [book, setBook] = useState("")
  const [number, setNumber] = useState("")
  const [theme, setTheme] = useState("Anbetung und Dank")

  const newComp: NewComposition = {
    name: name,
    book: book,
    number: number,
    theme: theme,
  }

  const addCompos = () => {
    console.log(newComp);
    
    fetchNewComposition(newComp).then(() => {
        setNane('')
        setBook('')
        setNumber('')
        setTheme('Anbetung und Dank')
        setOpen(false)
    }).catch(() => {
        setNane('')
        setBook('')
        setNumber('')
        setTheme('Anbetung und Dank')
        setOpen(false)
        alert('Error')
    })
  }

  return (
    <div className="container">
      <Button variant="contained" onClick={handleOpen} className="mb-3">
        Fügen Sie ein Werk hinzu
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=""
      >
        <div className="row">
          <Box
            sx={style}
            className="col-lg-6 mx-auto mt-5 border border-light rounded"
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Fügen Sie ein Werk hinzu
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Füllen Sie alle Felder aus.
            </Typography>
            <div className="">
              <div className="row">
                <div className="mb-3 mt-3 col-lg-6">
                  <label className="form-label">Book:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="book"
                    placeholder="Enter book"
                    name="book"
                    value={book}
                    onChange={e => setBook(e.target.value)}
                  />
                </div>
                <div className="mb-3 mt-3 col-lg-6">
                  <label className="form-label">Nr.:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nr"
                    placeholder="Enter Nr."
                    name="nr"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Wählen Sie ein Thema aus:</label>
                <select
                  className="form-select"
                  aria-label="Wählen Sie ein Thema aus"
                  value={theme} // Связываем значение с состоянием
                  onChange={(e) => {
                    console.log("Выбрано:", e.target.value);
                    setTheme(e.target.value);
                  }}
                >
                  {themesCompositions.map((t, i) => (
                    <option key={t + i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Composition:</label>
                <input
                  type="text"
                  className="form-control"
                  id="composition"
                  placeholder="Enter Composition"
                  name="name"
                  value={name}
                  onChange={e => setNane(e.target.value)}
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
    </div>
  )
}

export default ModalAddComposition
