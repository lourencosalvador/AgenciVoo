const URL = 'http://localhost:3000/voos';
const chalk = require('chalk');

const VoosDesponiveis = async() => {         
   try{
    const response = await fetch(URL)
    const data = await response.json();

    Array.isArray(data) ? chalk.blue(console.table(data)) : 
    console.log("A mesma API não é um Array");
   } catch (error) {
      console.error("Erro ao buscar os dados da API", error);
   }
}

module.exports = VoosDesponiveis;