import axios from 'axios';
export const sign_up_services = async(data) => {

  try { 
    const res = await axios.post('http://localhost:3001/api/user/signup', data, {
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

