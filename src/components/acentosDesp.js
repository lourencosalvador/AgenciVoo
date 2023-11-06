const readline = require('readline');
const fetch = require('node-fetch'); 
const URL = 'http://localhost:3000/voos';
const resEmail = require('./email')



const pt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const acentosDesponiveis = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    db(data);
  
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

function db(data) {
  data.map((voos) => {
    console.log("Destino: " + voos.destino + " / Acentos Disponíveis: " + voos.acento_Desponivel);
  });

  pt.question('Pretende fazer uma reserva? s/sim e n/Não\nDigite a sua resposta: ', (res) => {
    if (res.toLowerCase() === 's' || res.toLowerCase() === 'sim') {
      pt.question('Digite o destino e o número do assento: ', (ac) => {
        console.log("Receberá a confirmação por email, aguarde...")
        let dadosREset = ac.split(' ')
        
     
        let dadosApi;
        dadosApi = {
          id: id,
          Nome_Destino: dadosREset[0],
          Acentos: dadosREset[1],
        };
       
        console.log(dadosApi.id)
       // resEmail();
           
       const url = 'http://localhost:4000/reservas'; 
      
       fetch(url, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(dadosApi),
       })
         .then((response) => response.json())
         .then((data) => {
           console.log('Passageiro registrado com sucesso:', data);
         })
         .catch((error) => {
           console.error('Erro ao registrar o passageiro:', error);
         });

        pt.close(); 
       
      })
    } else if (res.toLowerCase() === 'n' || res.toLowerCase() === 'não') {
      console.log('Você escolheu não. Encerrando o programa.');
      pt.close(); 
    } else {
      console.log('Resposta inválida. Encerrando o programa.');
      pt.close();
    }
  });
}




acentosDesponiveis();
