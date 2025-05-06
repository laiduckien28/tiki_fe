import axios from 'axios';
export const sign_up_services = async(data) => {

  try { 
    const res = await axios.post('${import.meta.env.VITE_API_URL}/api/user/signup', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log("res.data",res.data)
  return res.data
  } catch(e) {
    console.log(e.message)
  }

}

