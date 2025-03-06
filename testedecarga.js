const fs = require('fs');
const faker = require('faker-br');


function gerarDados(ufs, generos, necessidadesEspeciais, telefonesGerados, matriculasGeradas, cpfsGerados) {
    let telefone;
    do {
        telefone = faker.phone.phoneNumber('(##) 988##-####'); // Gera um telefone único
    } while (telefonesGerados.has(telefone));
    telefonesGerados.add(telefone);
    
    let matricula;
    do {
        matricula = faker.random.number({ min: 100000, max: 999999 }).toString();
    } while (matriculasGeradas.has(matricula));
    matriculasGeradas.add(matricula);
    
    let cpf;
    do {
        cpf = faker.br.cpf(); // Gera um CPF único
    } while (cpfsGerados.has(cpf));
    cpfsGerados.add(cpf);
    
    return {
        uf: faker.random.arrayElement(ufs),
        nome: faker.name.findName(),
        email: faker.internet.email(),
        telefone: telefone,
        escolaridade: faker.random.arrayElement(['Ensino médio completo', 'Superior completo', 'Fundamental completo']),
        matricula: matricula,
        cpf: cpf,
        genero: faker.random.arrayElement(generos),
        necessidadesEspeciais: faker.random.arrayElement(necessidadesEspeciais)
    };
}


const fileName = 'dados_usuarios.csv';


const numRecords = 1;


let csvContent = 'UF,NOME,EMAIL,TELEFONE,ESCOLARIDADE,MATRICULA,CPF,GENERO,NECESSIDADES_ESPECIAIS\n';


const telefonesGerados = new Set();
const matriculasGeradas = new Set();
const cpfsGerados = new Set();
const ufs = ['AL', 'SP', 'RJ', 'MG', 'BA', 'PR', 'RS', 'PE', 'CE', 'GO'];
const generos = ['Masculino', 'Feminino'];
const necessidadesEspeciais = ['9 - Nenhuma'];


for (let i = 0; i < numRecords; i++) {
    const dados = gerarDados(ufs, generos, necessidadesEspeciais, telefonesGerados, matriculasGeradas, cpfsGerados);
    csvContent += `${dados.uf},${dados.nome},${dados.email},${dados.telefone},${dados.escolaridade},${dados.matricula},${dados.cpf},${dados.genero},${dados.necessidadesEspeciais}\n`;
}


fs.writeFileSync(fileName, csvContent, 'utf8');

console.log(`${numRecords} registros únicos foram gerados no arquivo ${fileName}`);
