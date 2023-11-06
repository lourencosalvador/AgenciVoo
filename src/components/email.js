const fetch = require('node-fetch'); 
const URL = ' http://localhost:3001/passageiro';
const nodemailer = require('nodemailer')


const apiRest = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
     envioEmail(data)
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }

  function envioEmail(data){
    let email = '';
    let nome = '';
      data.map((res) => {
        email = res.email;
        nome = res.nome;
      })
      let transport =nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
         user: 'lorryscode@gmail.com',
         pass: 'eekmekjnznwdvxav',
        }
      }); 
      
      
      transport.sendMail({
       from: `AgenciVoo <${email}>`,
       to: `${email}`,
       subject: 'Confirmação de reserva',
       html: `<h1> Olá ${nome}!</h1> <p>A sua reserva foi confirmada`,
       text: 'A AgenciVoo pedi obrigado pela reserva feita e que tenha uma otima experiencia.'
      })
      .then(() => console.log('Email enviado com sucesso'))
      .catch((err) => console.log('Erro ao enviar o email', err))
  }
 // envioEmail();
};




module.exports = apiRest;