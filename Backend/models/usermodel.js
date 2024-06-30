// connect to db
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const bcrypt = require('bcrypt')


const loginUser = async (id, password) => {
    if (!id || !password) {
      return 'error provide all fields'
    }

    const check = await supabase
    .from('Public')
    .select('*',{ count: 'exact' })
    .eq('userid',id)
    
    if(!check.count) {
      return "id does not exist"
    }

    const user = check.data
    const error = check.error
    if (!user) {
      return user
    }
  
    const match = await bcrypt.compare(password,user[0].password_hash)

    if (!match) {
      return 'incorrect password'
    }

    if(user[0].role == "admin") {
      const allUser = await supabase
      .from('Public')
      .select('*')

      return allUser.data
    }
  
    return user
  }


const signUpUser = async (id, password,role) => {
  if(!id || !password || !role) {
    return 'error provide all fields'
  }

  const check = await supabase
    .from('Public')
    .select('*',{ count: 'exact' })
    .eq('userid',id)

  if (check.count) {
    return "id exists"
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password,salt)

  const {data,error} = await supabase
  .from('Public')
  .insert([{userid : id,password_hash: hash,role: role}])
  .select()

  if(error){
    return error
  }

  return data
  }



module.exports = {signUpUser,loginUser,supabase}