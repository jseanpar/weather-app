require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer') 
const { Busquedas } = require('./models/busquedas')

console.log(process.env)

const main = async() => {

    const busquedas = new Busquedas();
    let opt

    do{
        opt = await inquirerMenu();

        switch( opt ){
            case 1: 
                //mostrar mensajes
                const termino = await leerInput('Ciudad: ');
            
                //Buscar los lugares
                const lugares = await busquedas.cuidad( termino );

                //Seleccionar el lugar
                const idSeleccionado = await listarLugares(lugares);

                if(idSeleccionado === '0') continue

                const lugarSeleccionado = lugares.find( l => l.id === idSeleccionado);

                busquedas.agregarHistorial( lugarSeleccionado.nombre )

                //Clima
                const clima = await busquedas.climaPorLugar( lugarSeleccionado.lat, lugarSeleccionado.lng );
            
                //Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSeleccionado.nombre.green);
                console.log('Lat: ', lugarSeleccionado.lat);
                console.log('Lng: ',lugarSeleccionado.lng);
                console.log('Temperatura: ', clima.temp);
                console.log('Mínima: ', clima.min);
                console.log('Máxima: ', clima.max);
                console.log('Como está el clima:', clima.desc.green);
            break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i) => {
                    const idx = `${ i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })

        }

        if( opt !==0 ) await pausa();
    } while (opt !== 0){

    }
}

main();