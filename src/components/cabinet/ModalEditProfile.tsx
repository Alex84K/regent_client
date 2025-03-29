import React from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { useState } from "react"
import { NewComposition } from "../../features/composition/types"
import { fetchNewComposition } from "../../features/composition/compositionApi"
import { selectUser, updateUser } from "../../features/user/userSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import { UserEdit } from "../../features/user/type"

const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}
const ModalEditProfile = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState("")
  const [tel, setTel] = useState("")
  const [firstName, setFirstname] = useState("")
  const [lastName, setLastname] = useState("")

  const editProfile = () => {
    const dto: UserEdit = {
      userId: String(user?.userId),
      firstName: firstName,
      lastName: lastName,
      email: "",
      telefon: tel,
    }
    dispatch(updateUser(dto)).then(() => setOpen(false)).catch(() => {
        alert('Error!')
        setOpen(false)
    })
  }

  return (
    <div className="container">
      <li className="nav-item" onClick={handleOpen}>
        <a className="nav-link">
          <i className="bi bi-shield-lock fa-fw "></i>Edit profile
        </a>
      </li>
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
            <div className="row">
              <div className="col-sm-6 mx-auto">
                <form>
                  <div className="mb-3 mt-3">
                    <label className="form-label">Username</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Username"
                      name="email"
                      value={username}
                      onChange={e => setUsername(e.target.value.trim())}
                    />
                  </div>
                  <div className="mb-3 mt-3">
                    <label className="form-label">First name</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="First name"
                      name="firstName"
                      value={firstName}
                      onChange={e => setFirstname(e.target.value.trim())}
                    />
                  </div>
                  <div className="mb-3 mt-3">
                    <label className="form-label">Last name</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Last name"
                      name="firstName"
                      value={lastName}
                      onChange={e => setLastname(e.target.value.trim())}
                    />
                  </div>
                  <div className="mb-3 mt-3">
                    <label className="form-label">Telefon</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Telefon"
                      name="firstName"
                      value={tel}
                      onChange={e => setTel(e.target.value.trim())}
                    />
                  </div>

                  <button className="btn btn-primary" onClick={editProfile}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  )
}

export default ModalEditProfile
