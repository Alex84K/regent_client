
import { Button } from '@mui/material'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../features/user/userSlice'

const MyData = () => {
  const user = useAppSelector(selectUser)

  return (
    <div className='p-5'>
      <h3>Mein Account</h3>
      <div className='border border-primary p-3 rounded'>
        <p className='mb-0'>Account:</p>
        <p className='mb-0'><b>{user?.username}</b></p>
      </div>

      <h3 className='mt-3'>Mein Account</h3>
      <div className='row'>
        <div className='col-lg-6 p-2'>
          <div className='border border-primary p-3 rounded mt-2'>
            <p className='mb-0'>Firma:</p>
            <p className='mb-0'><b>{user?.username}</b></p>
          </div>
        </div>
        <div className='col-lg-6 p-2'>
          <div className='border border-primary p-3 rounded mt-2'>
            <p className='mb-0'>Branche:</p>
            <p className='mb-0'><b>Heizungsinstallateur</b></p>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6 p-2'>
          <div className='border border-primary p-3 rounded mt-2'>
            <p className='mb-0'>Vorname:</p>
            <p className='mb-0'><b>{user?.username}</b></p>
          </div>
        </div>
        <div className='col-lg-6 p-2'>
          <div className='border border-primary p-3 rounded mt-2'>
            <p className='mb-0'>Name:</p>
            <p className='mb-0'><b>{user?.username}</b></p>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6 p-2'>
          <div className='border border-primary p-3 rounded mt-2'>
            <p className='mb-0'>Strasse:</p>
            <p className='mb-0'><b>{user?.email}</b></p>
          </div>
        </div>
        <div className='col-lg-6 p-2'>
          <div className='border border-primary p-3 rounded mt-2'>
            <p className='mb-0'>Nr.:</p>
            <p className='mb-0'><b>{user?.username}</b></p>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6 p-2'>
          <div className='border border-primary p-3 rounded mt-2'>
            <p className='mb-0'>PLZ:</p>
            <p className='mb-0'><b>{user?.username}</b></p>
          </div>
        </div>
        <div className='col-lg-6 p-2'>
          <div className='border border-primary p-3 rounded mt-2'>
            <p className='mb-0'>Ort:</p>
            <p className='mb-0'><b>{user?.username}</b></p>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6 p-2'>
          <div className='border border-primary p-3 rounded mt-2'>
            <p className='mb-0'>Land:</p>
            <p className='mb-0'><b>Deutschland</b></p>
          </div>
        </div>
        <div className='col-lg-6 p-2'>
          <div className='border border-primary p-3 rounded mt-2'>
            <p className='mb-0'>Telefon:</p>
            <p className='mb-0'><b>{user?.username}</b></p>
          </div>
        </div>
      </div>
      <div className='d-flex flex-row-reverse mt-2'>
        <Button variant="contained">speichern</Button>
      </div>

    </div>
  )
}

export default MyData