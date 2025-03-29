import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import { changePwdAsync, logout, selectUser, updateUser } from "../../features/user/userSlice"
import ModalEditProfile from "./ModalEditProfile"
import { ChangePwd, UserEdit } from "../../features/user/type"

const Account = () => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const newEmail = ''

  const updateEmail = () => {
    const emailDto = prompt("Введите ваш email", newEmail);
    const dto: UserEdit = {
          userId: String(user?.userId),
          firstName: String(user?.firstName),
          lastName: String(user?.lastName),
          email: String(emailDto),
          telefon: String(user?.telefon),
        }
        dispatch(updateUser(dto)).then(() => alert('Ok!')).catch(() => {
            alert('Error!')
        })
  }

  const updatePassword = () => {
    const pwd1 = prompt("Введите ваш password", newEmail);
    const pwd2 = prompt("Повторите password", newEmail);
    if(pwd1 === pwd2) {
      const pwdDto: ChangePwd = {
        userId: String(user?.userId),
        password2: String(pwd2),
      }
      dispatch(changePwdAsync(pwdDto)).then(() => alert('Ok!')).catch(() => {
        alert('Error!')
    })
    }else {
      alert('Error!')
    }
    
  }

  const logOut = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <section className="pt-sm-7">
      <div className="container pt-3 pt-xl-5">
        <div className="row">
          <div className="col-lg-4 col-xl-3">
            <div
              className="offcanvas-lg offcanvas-start h-100"
              id="offcanvasSidebar"
            >
              <div className="offcanvas-header bg-light">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  My profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#offcanvasSidebar"
                  aria-label="Close"
                ></button>
              </div>

              <div className="offcanvas-body p-0">
                <div className="card border p-3 w-100">
                  <div className="card-header text-center border-bottom">
                    <div className="avatar avatar-xl position-relative mb-2">
                      <img
                        className="avatar-img rounded-circle border border-2 border-white"
                        src={user?.image}
                        alt=""
                      />
                    </div>
                    <h6 className="mb-0">
                      {user?.firstName} {user?.lastName}
                    </h6>
                    <a href="#" className="text-reset text-primary-hover small">
                      {user?.email}
                    </a>
                  </div>

                  <div className="card-body p-0 mt-4">
                    <ul className="nav nav-pills-primary-border-start flex-column">
                      <ModalEditProfile />
                      <li className="nav-item" onClick={() => alert('Update email')}>
                        <a className="nav-link">
                          <i className="bi bi-shield-lock fa-fw me-2"></i>Update email
                        </a>
                      </li>
                      <li className="nav-item" onClick={() => alert('Security')}>
                        <a className="nav-link">
                          <i className="bi bi-bell fa-fw me-2"></i>Security
                        </a>
                      </li>

                      <li className="nav-item" onClick={logOut}>
                        <a className="nav-link text-danger" href="#">
                          <i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign
                          Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-xl-9 ps-lg-4 ps-xl-6">
            <div className="d-flex justify-content-between align-items-center mb-5 mb-sm-6">
              <h1 className="h3 mb-0">My profile</h1>

              <button
                className="btn btn-primary d-lg-none flex-shrink-0 ms-2"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSidebar"
                aria-controls="offcanvasSidebar"
              >
                <i className="fas fa-sliders-h"></i> Menu
              </button>
            </div>

            <form>
              <div className="card bg-transparent p-3">
                <div className="card-header bg-transparent border-bottom p-0 pb-3">
                  <h6 className="mb-0">Personal Information</h6>
                </div>
                <div className="card-body px-0">
                  <div className="row g-4">
                    <div className="col-12">
                      <label className="form-label">Full name</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={user?.firstName}
                          placeholder="First name"
                        />
                        <input
                          type="text"
                          className="form-control"
                          value={user?.lastName}
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        value={user?.email}
                        placeholder="Enter your email id"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Mobile number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={user?.telefon}
                        placeholder="Enter your mobile number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="text-center my-5">
              <i className="bi bi-three-dots"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Account
