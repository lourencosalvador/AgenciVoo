const chalk = require('chalk');
const fs = require('fs');
const readline = require('readline');

const pt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const configEquip = () => {
  console.log(chalk.blue('1- Gerenciar Voos'));
  console.log(chalk.blue('2- Registrar Passageiro'));
  console.log(chalk.blue('1- Alterar Reservas'));
  console.log('');
  pt.question('Digite a sua resposta: ', (res) => {
    if (res == '1') {
      console.log("1");
      pt.close();
    } else if (res == '2') {
      console.clear();
      pt.question('Nome do passageiro cuja reserva deseja alterar: ', (nome) => {
        const reservas = lerReservas();
        const reservaParaAlterar = reservas.find((reserva) => reserva.nome === nome); 
        if (reservaParaAlterar) {
          console.log('Reserva encontrada:');
          console.log('Nome: ' + reservaParaAlterar.nome);
          console.log('Número do Voo: ' + reservaParaAlterar.numero);
    
          pt.question('Novo número do Voo: ', (novoNumero) => {
           
            reservaParaAlterar.numeroVoo = novoNumero;
    
           
            fs.writeFileSync('reservas.json', JSON.stringify(reservas, null, 2), 'utf8');
    
            console.log('Reserva atualizada com sucesso.');
            pt.close();
          });
        } else {
          console.log('Reserva não encontrada para o passageiro ' + nome);
          pt.close();
        }
      })      
    } else if (res == '3') {
      console.log("3");
      pt.close();
    } else {
      console.log('Resposta inválida. Encerrando o programa.');
      pt.close();
    }
  });

  function lerReservas() {
    if (fs.existsSync('paci.json')) {
      const data = fs.readFileSync('paci.json', 'utf8');
      return JSON.parse(data);
    } else {
      return [];
    }
}
}