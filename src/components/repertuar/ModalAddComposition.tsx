import { Button, Box, Typography, Modal } from "@mui/material"
import { useState } from "react"
import { styled } from "@mui/material/styles"
import { themesCompositions } from "./repertuarThemes"
import { NewComposition } from "../../features/composition/types"
import { fetchNewComposition } from "../../features/composition/compositionApi"

const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}

const FloatingButton = styled(Button)({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 1000,
})

const ModalAddComposition = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [name, setName] = useState("")
  const [book, setBook] = useState("")
  const [number, setNumber] = useState("")
  const [theme, setTheme] = useState("Anbetung und Dank")

  const newComp: NewComposition = { name, book, number, theme }

  const addCompos = () => {
    fetchNewComposition(newComp)
      .then(() => {
        setName("")
        setBook("")
        setNumber("")
        setTheme("Anbetung und Dank")
        setOpen(false)
      })
      .catch(() => {
        alert("Error")
        setOpen(false)
      })
  }

  return (
    <>
      <FloatingButton variant="contained" onClick={handleOpen}>
        Fügen Sie ein Werk hinzu
      </FloatingButton>
      <Modal open={open} onClose={handleClose}>
        <div className="row">
          <Box sx={style} className="col-lg-6 mx-auto mt-5 border rounded">
            <Typography variant="h6">Fügen Sie ein Werk hinzu</Typography>
            <Typography sx={{ mt: 2 }}>Füllen Sie alle Felder aus.</Typography>
            <div>
              <div className="row">
                <div className="mb-3 mt-3 col-lg-6">
                  <label className="form-label">Book:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={book}
                    onChange={(e) => setBook(e.target.value)}
                  />
                </div>
                <div className="mb-3 mt-3 col-lg-6">
                  <label className="form-label">Nr.:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Wählen Sie ein Thema aus:</label>
                <select
                  className="form-select"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  {themesCompositions.map((t, i) => (
                    <option key={i} value={t}>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
  )
}

export default ModalAddComposition
