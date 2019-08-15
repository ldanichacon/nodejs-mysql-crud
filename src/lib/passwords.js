const bcrypt = require('bcryptjs');
const passwords = {};

passwords.encriptar = async (password)=> {
  try{
    const salt = await bcrypt.genSalt();
    const pass = await bcrypt.hash(password,salt);
    return pass;
  }catch (e){
    console.error(e);
  }
};
passwords.comparar = async(password,passBd) =>{
  try{
    return await bcrypt.compare(password,passBd);
  }
  catch(e)
  {
    console.error(e);
  }
};

module.exports = passwords;