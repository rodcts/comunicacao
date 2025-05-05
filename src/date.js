// src/date.js
// Cria uma nova instância de Date com a data atual

const dia = () => {
  // Cria uma nova instância de Date com a data atual
  const dataAtual = new Date(); // Coleta o dia, mês e ano
  const dia = dataAtual.getDate();
  return dia;
};
const mes = () => {
  // Cria uma nova instância de Date com a data atual
  const dataAtual = new Date(); // Coleta o dia, mês e ano
  const mes = dataAtual.getMonth() + 1; // Os meses são indexados a partir de 0
  return mes;
};
const ano = () => {
  // Cria uma nova instância de Date com a data atual
  const dataAtual = new Date(); // Coleta o dia, mês e ano
  const ano = dataAtual.getFullYear();
  return ano;
};

module.exports = { dia, mes, ano };