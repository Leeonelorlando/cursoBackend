import { Command } from 'commander'

const program = new Command()

program
    .option('-d', 'Variable para debug', false)
    .option('-p, --port <port>', 'Puerto para el servidor', 8080)
    .option('--mode <mode>', 'Modo de ejecución de nuestra app', 'development')
    .requiredOption('-u <user>', 'Usuario utilizando el applicativo', 'No se ha declarado un usuario')
    .option('-l, --letters [letter...]', 'specify letter')
    .parse()