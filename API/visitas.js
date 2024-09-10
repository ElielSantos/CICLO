// /api/visitas.js
const fs = require('fs');
const path = require('path');

// Caminho para o arquivo de visitas
const filePath = path.resolve('./visitas.txt');

export default function handler(req, res) {
  // Lê o número de visitas do arquivo
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Se o arquivo não existir, cria com 0 visitas
      if (err.code === 'ENOENT') {
        fs.writeFileSync(filePath, '0');
        data = '0';
      } else {
        return res.status(500).json({ message: 'Erro ao ler o arquivo' });
      }
    }

    // Converte o número de visitas em um número inteiro
    let visitas = parseInt(data, 10) || 0;

    // Incrementa o número de visitas
    visitas++;

    // Escreve o novo número de visitas no arquivo
    fs.writeFile(filePath, visitas.toString(), err => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao atualizar o arquivo' });
      }

      // Retorna o número de visitas atualizado
      return res.status(200).json({ visitas });
    });
  });
}

