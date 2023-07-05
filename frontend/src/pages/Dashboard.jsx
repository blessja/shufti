import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Dashboard() {
  const navigate = useNavigate()
  



  const { user } = useSelector((state) => state.auth)
  const { staff } = useSelector((state) => state.staff);
  

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    if (!staff) {
      navigate('/');
    }
  }, [user, staff, navigate]);

 

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
   
      </section>
      <section>
        <img style={{width:"100%", height:"100%"}} src="https://images.unsplash.com/photo-1613216512748-39895e7e9675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" />
      </section>
     

    
    </>
  )
}

export default Dashboard
