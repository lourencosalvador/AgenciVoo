const VoosDisponiveis = require('././src/components/voos')
const readline = require('readline');
const configEquip = require('./src/components/config')
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log(chalk.cyan('Seja Bem-Vindo ao VooSpress'));
console.log('Menu Spress');
console.log('');
console.log(chalk.blue('1- Voos Disponíveis'));
console.log(chalk.blue('2- Escolher Assento'));
console.log(chalk.blue('3- Fazer Reservas'));
console.log(chalk.blue('4- Config Equipe Técnica'));
console.log('');

rl.question('Digite algo: ', (input) => {
  console.clear();
   add(input);
});

const add = (input) => {
  switch (input) {
    case '1':
      VoosDisponiveis ();
      break;
    case '2':
       configEquip();
      break;
  }
}

add();