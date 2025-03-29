import { Button, MenuItem, TextField } from "@mui/material"
import React, { useState, useEffect } from "react"
import { themesCompositions } from "./repertuarThemes"
import ModalAddComposition from "./ModalAddComposition"
import { fetchCompositionByTheme, fetchDeleteFromWorkComposition } from "../../features/composition/compositionApi"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Composition } from "../../features/composition/types"
import ModalAddInWork from "./ModalAddInWork"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getCompositionById, getCompositionsByTheme, selectCompositionsList } from "../../features/composition/compositionSlice"

// Стилизация таблицы
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

const RepertuarList = () => {
  const [themeCompositions, setThemeCompositions] = useState("Anbetung und Dank")  // Инициализация выбранной темы как "Alle"
  const compositions = useAppSelector(selectCompositionsList)
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useAppDispatch();

  // Получение композиций по выбранной теме
  const getCompositions = (theme: string) => {
    setThemeCompositions(theme)
    dispatch(getCompositionsByTheme(theme))
  }

  // Удаление из работы
  const deleteFromWork = (id: string) => {
    fetchDeleteFromWorkComposition(id).then(() =>
      dispatch(getCompositionsByTheme(themeCompositions))
    )
  }

  // Сразу загружаем данные для первой темы при монтировании компонента
  useEffect(() => {
    getCompositions("Anbetung und Dank")
  }, [])

  const openModalAdd = (id: string) => {
    dispatch(getCompositionById(id))
    setOpenModal(true)
  }

  return (
    <div className="row mb-5 pb-5">
      <div className="col-lg-4">
        <ModalAddComposition />
        <div className="">
          <TextField
            id="outlined-select-currency"
            select
            label="Repertuar"
            value={themeCompositions}  // Используем значение состояния
            helperText="Please select your currency"
            className="w-100"
            onChange={e => {
              getCompositions(e.target.value)  // Обработчик выбора темы
            }}
          >
            {themesCompositions.map((t, i) => (
              // Используем уникальный key для каждого MenuItem
              <MenuItem key={`${t}-${i}`} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <div className="">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Book</StyledTableCell>
                <StyledTableCell align="right">Nr.</StyledTableCell>
                <StyledTableCell align="right">Data</StyledTableCell>
                <StyledTableCell align="right">in Work</StyledTableCell>
                <StyledTableCell align="right">Add in Work</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {compositions.map((row, i) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.book}</StyledTableCell>
                  <StyledTableCell align="right">{row.number}</StyledTableCell>
                  <StyledTableCell align="right">{row.lastData}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.inWork ? (
                      <>
                        {row.lastDirigent} /{" "}
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => deleteFromWork(row.id)}
                        >
                          <DeleteIcon fontSize="inherit" sx={{ color: "red" }} />
                        </IconButton>
                      </>
                    ) : (
                      <></>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => openModalAdd(row.id)}>open</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <ModalAddInWork
        open={openModal}
        setOpen={setOpenModal}
      />
    </div>
  )
}

export default RepertuarList
