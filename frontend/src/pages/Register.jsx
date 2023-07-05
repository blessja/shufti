import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    // name: '',
   
    phone: '',
    // car: '',
    // carwash: '',
    password: '',
    password2: '',
  })

  const { phone, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/staff/dashboard')
    }
    // if (isSuccess || user) {
    //   const userId = user?.id || ''; // Ensure user.id is defined or set it to an empty string
    //   navigate(`/user/dashboard/${userId}`)
    // }

    // dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        password,
        phone,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          {/* <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
              autoComplete='on'
            />
          </div> */}
          <div className='form-group'>
            <input
              type='phone'
              className='form-control'
              id='phone'
              name='phone'
              value={phone}
              placeholder='Enter your phone number'
              onChange={onChange}
              autoComplete='on'
            />
          </div>
          {/* <div className='form-group'>
            <input
              type='car'
              className='form-control'
              id='car'
              name='car'
              value={car}
              placeholder='Type of car (eg. Toyota Corolla)'
              onChange={onChange}
              autoComplete='on'
            />
          </div> */}
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
              autoComplete='on'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
              autoComplete='on'
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
