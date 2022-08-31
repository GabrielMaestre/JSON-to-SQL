const fs = require('fs');
var uuid = require('uuid');
const { 
    v4: uuidv4,
  } = require('uuid');

const directoryPath = '/json';
const arquivos = fs.readdirSync(__dirname + directoryPath);
const directoryResult = '/result';

// fs.readdirSync('./commands').filter(file => file.endsWith('.js');

async function start()
{
    console.log('\nComeçando...\n');

    // arquivos.forEach(async () => {
    // });

    console.log(arquivos);

    await arquivos.forEach(async element => {

        var arquivoAtual = await fs.readFileSync(__dirname + directoryPath + '/' + element, 'utf8');

        var arquivoAtualFormatado = JSON.stringify(JSON.parse(arquivoAtual));

        await fs.writeFileSync(__dirname + directoryPath + '/' + element, arquivoAtualFormatado);

        await sqlFormat(arquivoAtualFormatado, element);

    });
}

async function sqlFormat(jsonFile, nomeArquivo)
{

    console.log('Iniciando SQL...');

    const formato = await
`
INSERT INTO dashboard
(version, slug,
 title, data,
 org_id, created,
 updated, updated_by,
 created_by, gnet_id,
 plugin_id, folder_id,
 is_folder, has_acl,
 uid, is_public) 
 VALUES 
 ('1', '${nomeArquivo.replaceAll('.json', '')}', '${nomeArquivo.replaceAll('.json', '')}',
'${jsonFile}',
'1', '2022-08-31 15:40:00',
'2022-08-31 15:40:00', '1',
'1', '0',
null, '0',
'0', '0',
'${uuidv4().replaceAll('-', '')}', '0');
`;

await fs.writeFileSync(__dirname  + directoryResult + '/' + nomeArquivo.replaceAll('.json', '') + '.sql', formato, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log(`Arquivo: ${nomeArquivo} -- Salvo`);
}); 

}



start();