import { Button, MenuItem, TextField } from "@mui/material"
import React, { useState } from "react"
import { themesCompositions } from "./repertuarThemes"
import ModalAddComposition from "./ModalAddComposition"
import { fetchCompositionByTheme } from "../../features/composition/compositionApi"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Composition } from "../../features/composition/types"

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
]

const RepertuarList = () => {
  const [compositions, setCompositions] = useState<Composition[]>(
    [] as Composition[],
  )
  const getCompositions = (theme: string) => {
    fetchCompositionByTheme(theme).then(data => {
      setCompositions(data)
    })
  }

  return (
    <div className="row ">
      <div className="col-lg-4">
      <ModalAddComposition />
        <div className="">
          <TextField
            id="outlined-select-currency"
            select
            label="Repertuar"
            defaultValue="Alle"
            helperText="Please select your currency"
            className="w-100"
            onChange={e => {
              getCompositions(e.target.value)
            }}
          >
            {themesCompositions.map((t, i) => (
              <MenuItem key={i + t} value={t}>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {compositions.map((row, i) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.book}</StyledTableCell>
                  <StyledTableCell align="right">{row.number}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.lastData}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      
    </div>
  )
}

export default RepertuarList
