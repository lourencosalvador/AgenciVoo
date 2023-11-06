const chalk = require('chalk');
const readline = require('readline');
const fetch = require('node-fetch'); // Certifique-se de importar o node-fetch
const acentosDesponiveis = require('./acentosDesp');

const pt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const configEquip = () => {
  console.log(chalk.blue('1- Gerenciar Passageiros'));
  console.log(chalk.blue('2- Registrar Passageiro'));
  console.log(chalk.blue('3- Alterar Reservas'));
  console.log('');
  pt.question('Digite a sua resposta: ', (res) => {
    if (res === '1') {
      console.log("1");
      apiPassageiro();
      pt.close();
    } else if (res === '2') {
      console.clear();
      pt.question('Nome do passageiro: ', (nome) => {
        pt.question('Número do voo: ', (numero) => {
          pt.question('Idade: ', (idade) => {
            pt.question('Email: ', (email) => {
              // Função para recuperar o próximo ID
              function idRecup(data) {
                let maxId = 0;
                data.forEach((passageiro) => {
                  if (passageiro.id > maxId) {
                    maxId = passageiro.id;
                  }
                });
                return maxId + 1; // Retorna o próximo ID disponível
              }

              // Recupere os passageiros existentes
              apiPassageiro().then((passageiros) => {
                const novoPassageiro = {
                  id: idRecup(passageiros), 
                  nome,
                  numero,
                  idade,
                  email
                };

                const url = 'http://localhost:3001/passageiro';

                fetch(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(novoPassageiro),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log('Passageiro registrado com sucesso:', data);
                  })
                  .catch((error) => {
                    console.error('Erro ao registrar o passageiro:', error);
                  });

                pt.close();
              });
            });
          });
        });
      });
    } else if (res === '3') {
      // acentosDesponiveis();
      pt.close();
    } else {
      console.log('Resposta inválida. Encerrando o programa.');
      pt.close();
    }
  });
};

const apiPassageiro = async () => {
  try {
    const response = await fetch('http://localhost:3001/passageiro');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports = configEquip;
