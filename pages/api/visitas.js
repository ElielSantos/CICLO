import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve('.', 'visitas.txt');

  // Verificar se o arquivo existe
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '0');
  }

  // Ler o conteúdo do arquivo
  const visitas = parseInt(fs.readFileSync(filePath, 'utf8'), 10);

  // Incrementar o número de visitas
  const novasVisitas = visitas + 1;
  fs.writeFileSync(filePath, novasVisitas.toString());

  // Retornar o número de visitas como JSON
  res.status(200).json({ visitas: novasVisitas });
}

