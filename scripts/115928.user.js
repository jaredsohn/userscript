// ==UserScript==
// @name           pioneers translation es
// @namespace      pioneers_translation es
// @description    pioneers translation es
// @include        http://uni670.ogame.org/game/index.php?page=overview*
// @include        http://uni670.ogame.org/game/index.php?page=resources*
// @include        http://uni670.ogame.org/game/index.php?page=station*
// @include        http://uni670.ogame.org/game/index.php?page=trader*
// @include        http://uni670.ogame.org/game/index.php?page=research*
// @include        http://uni670.ogame.org/game/index.php?page=shipyard*
// @include        http://uni670.ogame.org/game/index.php?page=defense*
// @include        http://uni670.ogame.org/game/index.php?page=fleet1*
// @include        http://uni670.ogame.org/game/index.php?page=fleet2*
// @include        http://uni670.ogame.org/game/index.php?page=fleet3*
// @include        http://uni670.ogame.org/game/index.php?page=alliance*
// @include        http://uni670.ogame.org/game/index.php?page=galaxy*
// @include        http://uni670.ogame.org/game/index.php?page=message*
// @include        http://uni670.ogame.org/game/index.php?page=movement*
// @include        http://uni670.ogame.org/game/index.php?page=highscore*
// @include        http://uni670.ogame.org/game/index.php?page=preferences*
// ==/UserScript==

/*VERSION*/var Version = '1.0.0';/*VERSION*/

try{

    translation_overview = [
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[2]/table/tbody/tr/td/a', 'from': /There are no buildings in the queue!/g, 'to': 'No hay edificios en construcción..'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/div[2]/table/tbody/tr/td/a', 'from': /There is no research in progress at the moment./g, 'to': 'No hay ninguna investigación en progreso en este momento.'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[6]/div[2]/table/tbody/tr/td/a', 'from': /No ships\/defense are being built at the moment./g, 'to': 'No se está construyendo ninguna nave o defensa en este momento.'},
        {'xpath':'/html/body/div/div[2]/div/div/div[6]/ul/li/a', 'from': /Buddies/g, 'to': 'Amigos'},
        {'xpath':'/html/body/div/div[2]/div/div/div[9]/div[2]/div/table/tbody/tr/td', 'from': /Own Missions/g, 'to': 'Misiones propias'},
        {'xpath':'/html/body/div/div[2]/div/div/div[9]/div[2]/div/table/tbody/tr/td[3]', 'from': /Hostile Missions/g, 'to': 'Misiones hostiles'},
        {'xpath':'/html/body/div/div[2]/div/div/div[9]/div[2]/div/table/tbody/tr/td[2]', 'from': /Friendly Missions/g, 'to': 'Misiones amigas'},
        {'xpath':'/html/body/div/div[2]/div/div/div[6]/ul/li[2]/a', 'from': /Notes/g, 'to': 'Notas'}, 
        {'xpath':'/html/body/div/div[2]/div/div/div[6]/ul/li[3]/a', 'from': /Highscore/g, 'to': 'Clasificación'},
        {'xpath':'/html/body/div/div[2]/div/div/div[6]/ul/li[4]/a', 'from': /Search/g, 'to': 'Búsqueda'}, 
        {'xpath':'/html/body/div/div[2]/div/div/div[6]/ul/li[5]/a', 'from': /Options/g, 'to': 'Opciones'}, 
        {'xpath':'//*[@id="playerName"]', 'from': /Player/g, 'to': 'Jugadores'},
        {'xpath':'/html/body/div/div[2]/div/div/div[6]/ul/li[6]/a', 'from': /Log out/g, 'to': 'Salir'},         
        {'xpath':'/html/body/div/div[2]/div/div[6]/ul/li/a/span', 'from': /Overview/g, 'to': 'Visión General'}, 
        {'xpath':'/html/body/div/div[2]/div/div[6]/ul/li[2]/a/span', 'from': /Resources/g, 'to': 'Recursos'}, 
        {'xpath':'/html/body/div/div[2]/div/div[6]/ul/li[3]/a/span', 'from': /Facilities/g, 'to': 'Instalaciones'},                   
        {'xpath':'/html/body/div/div[2]/div/div[6]/ul/li[4]/a/span', 'from': /Merchant/g, 'to': 'Mercader'},
        {'xpath':'/html/body/div/div[2]/div/div[6]/ul/li[5]/a/span', 'from': /Research/g, 'to': 'Investigación'},
        {'xpath':'/html/body/div/div[2]/div/div[6]/ul/li[6]/a/span', 'from': /Shipyard/g, 'to': 'Hangar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[6]/div/h3', 'from': /Shipyard/g, 'to': 'Hangar'},        
        {'xpath':'/html/body/div/div[2]/div/div[6]/ul/li[7]/a/span', 'from': /Defense/g, 'to': 'Defensa'},
        {'xpath':'/html/body/div/div[2]/div/div[6]/ul/li[8]/a/span', 'from': /Fleet/g, 'to': 'Flota'},
        {'xpath':'/html/body/div/div[2]/div/div[6]/ul/li[9]/a/span', 'from': /Galaxy/g, 'to': 'Galaxia'},
        {'xpath':'/html/body/div/div[2]/div/div[6]/ul/li[10]/a/span', 'from': /Empire/g, 'to': 'Imperio'},
        {'xpath':'/html/body/div/div[2]/div/div[6]/ul/li[11]/a/span', 'from': /Alliance/g, 'to': 'Alianza'},
        {'xpath':'/html/body/div/div[2]/div/div[6]/ul/li[12]/a/span', 'from': /Recruit Officers/g, 'to': 'Casino'},  
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[9]/td', 'from': /Number/g, 'to': 'Número'},      
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/div/h3', 'from': /Research/g, 'to': 'Investigación'},
        {'xpath':'//*[@id="eventboxBlank"]', 'from': /No fleet movement/g, 'to': 'No hay movimientos de flota'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/h3', 'from': /Buildings/g, 'to': 'Edificios'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[2]/a/span', 'from': /Relocate/g, 'to': 'Rehubicar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[2]/a[2]/span', 'from': /give up\/rename/g, 'to': 'abandonar/renombrar'},
        {'xpath':'/html/body/div/div[2]/div/div[8]/div/div/div/p', 'from': /Planets/g, 'to': 'Planetas'},
        
        {'xpath':'/html/body/div/div[2]/div/div[8]/div/div/div/p', 'from': /Planets/g, 'to': 'Planetas'},
        
    ];
    
    translation_resources = [
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li/div/div/a[2]/div', 'from': /Metal Mine/g, 'to': 'Mina de metal'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/form/table/tbody/tr[2]/td[2]/b', 'from': /Metal Mine/g, 'to': 'Mina de metal'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[4]/td', 'from': /Metal Mine/g, 'to': 'Mina de metal'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[2]/div/div/a[2]/div', 'from': /Crystal Mine/g, 'to': 'Mina de cristal'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/form/table/tbody/tr[3]/td[2]/b', 'from': /Crystal Mine/g, 'to': 'Mina de cristal'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[5]', 'from': /Crystal Mine/g, 'to': 'Mina de cristal'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[4]/div/div/a[2]/div', 'from': /Solar Plant/g, 'to': 'Planta de energía solar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[7]/td', 'from': /Solar Plant/g, 'to': 'Planta de energía solar'},        
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[3]/div/div/a[2]/div', 'from': /Deuterium Synthesizer/g, 'to': 'Sintetizador de deuterio'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/form/table/tbody/tr[4]/td[2]/b', 'from': /Deuterium Synthesizer/g, 'to': 'Sintetizador de deuterio'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[6]/td', 'from': /Deuterium Synthesizer/g, 'to': 'Sintetizador de deuterio'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[5]/div/div/a/div', 'from': /Fusion Reactor/g, 'to': 'Planta de fusión'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[5]/div/div/a[2]/div', 'from': /Fusion Reactor/g, 'to': 'Planta de fusión'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[8]/td', 'from': /Fusion Reactor/g, 'to': 'Planta de fusión'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[6]/div/div/a/div', 'from': /Solar Satellite/g, 'to': 'Satelite solar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[6]/div/div/a[2]/div', 'from': /Solar Satellite/g, 'to': 'Satelite solar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[9]/td', 'from': /Solar Satellite/g, 'to': 'Satelite solar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul[2]/li/div/div/a/div', 'from': /Metal Storage/g, 'to': 'Almacén de metal'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul[2]/li[2]/div/div/a/div', 'from': /Crystal Storage/g, 'to': 'Almacén de cristal'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul[2]/li[3]/div/div/a/div', 'from': /Deuterium Tank/g, 'to': 'Contenedor de deuterio'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/form/table/tbody/tr[2]/td[2]/span', 'from': /Energy needed/g, 'to': 'Energía necesaria'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/form/table/tbody/tr[3]/td[2]/span', 'from': /Energy needed/g, 'to': 'Energía necesaria'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/form/table/tbody/tr[4]/td[2]/span', 'from': /Energy needed/g, 'to': 'Energía necesaria'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/form/table/tbody/tr[2]/td[2]/span', 'from': /Current production/g, 'to': 'Producción actual'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/form/table/tbody/tr[3]/td[2]/span', 'from': /Current production/g, 'to': 'Producción actual'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/form/table/tbody/tr[4]/td[2]/span', 'from': /Current production/g, 'to': 'Producción actual'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/div/h3', 'from': /Buildings/g, 'to': 'Edificios'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/form/table/tbody/tr[6]/td/span/input', 'from': 'Recalculate', 'to': 'Recalcular'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr/td/div/div/span[2]/input', 'from': 'Recalculate', 'to': 'Recalcular'},
        
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/form/table/tbody/tr[5]/td[2]/b', 'from': /Energy Consumption/g, 'to': 'Consumo de energía'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/h2', 'from': /Resource buildings/g, 'to': 'Edificios de recursos'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/a', 'from': /Resource settings/g, 'to': 'Opciones de recursos'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/div[2]/table/tbody/tr/td/a', 'from': /There are no buildings in the queue!/g, 'to': 'No hay edificios en construcción..'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[6]/div/h3', 'from': /Current production/g, 'to': 'Producción Actual'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/form/table/tbody/tr/td/b', 'from': /Energy management/g, 'to': 'Administración de energía'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/h2', 'from': /Resources/g, 'to': 'Recursos'},
        
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[2]/th[2]', 'from': /Metal/g, 'to': 'Metal'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[2]/th[3]', 'from': /Crystal/g, 'to': 'Cristal'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[2]/th[4]', 'from': /Deuterium/g, 'to': 'Deuterio'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[2]/th[5]', 'from': /Energy/g, 'to': 'Energía'},        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[11]/td', 'from': /Storage capacity/g, 'to': 'Capacidad de almacenamiento'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[10]/td', 'from': /Booster/g, 'to': 'Amplificador'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr/td/div/div/span', 'from': /Production factor/g, 'to': 'Factor de producción'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[12]/td/em', 'from': /Total per hour/g, 'to': 'Total por hora'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[13]/td/em', 'from': /Total per day/g, 'to': 'Total por día'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[14]/td/em', 'from': /Total per week/g, 'to': 'Total por semana'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/div[2]/form/table/tbody/tr[3]/td', 'from': /Basic Income/g, 'to': 'Ingresos básicos'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/h2/span', 'from': /Resource settings/g, 'to': 'Opciones de recursos'},
            
    ];
    
    translation_mercader = [
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/h3', 'from': /Call a trader who buys the following resource/g, 'to': 'Llamar a un mercader que compre el siguiente recurso'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/p/span', 'from': /Costs/g, 'to': 'Costo'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/p/span', 'from': /Dark Matter/g, 'to': 'Materia Oscura'},    
    ];
    
    translation_facilities = [
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[3]/div/div/a/div', 'from': /Research Lab/g, 'to': 'Laboratorio de investigación'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[3]/div/div/a[2]/div', 'from': /Research Lab/g, 'to': 'Laboratorio de investigación'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[4]/div/div/a/div', 'from': /Alliance Depot/g, 'to': 'Depósito de la alianza'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[4]/div/div/a[2]/div', 'from': /Alliance Depot/g, 'to': 'Depósito de la alianza'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li/div/div/a/div', 'from': /Robotics Factory/g, 'to': 'Fábrica de robots'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li/div/div/a[2]/div', 'from': /Robotics Factory/g, 'to': 'Fábrica de robots'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[5]/div/div/a/div', 'from': /Missile Silo/g, 'to': 'Silo'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[5]/div/div/a[2]/div', 'from': /Missile Silo/g, 'to': 'Silo'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[6]/div/div/a/div', 'from': /Nanite Factory/g, 'to': 'Fábrica de nanobots'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[6]/div/div/a[2]/div', 'from': /Nanite Factory/g, 'to': 'Fábrica de nanobots'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[2]/div/div/a/div ', 'from': /Shipyard/g, 'to': 'Hangar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[2]/div/div/a[2]/div ', 'from': /Shipyard/g, 'to': 'Hangar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/h2', 'from': /Facilities buildings/g, 'to': 'Instalaciones'},         
                  
    ];
    translation_research = [
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li/div/div/a/div', 'from': /Energy Technology/g, 'to': 'Tecnología de Energía'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li/div/div/a[2]/div', 'from': /Energy Technology/g, 'to': 'Tecnología de Energía'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[2]/div/div/a/div', 'from': /Laser Technology/g, 'to': 'Tecnología Laser'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[2]/div/div/a[2]/div', 'from': /Laser Technology/g, 'to': 'Tecnología Laser'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[5]/div/div/a/div', 'from': /Plasma Technology/g, 'to': 'Tecnología de Plasma'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[5]/div/div/a[2]/div', 'from': /Plasma Technology/g, 'to': 'Tecnología de Plasma'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[3]/div/div/a/div', 'from': /Ion Technology/g, 'to': 'Tecnología Iónica'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[3]/div/div/a[2]/div', 'from': /Ion Technology/g, 'to': 'Tecnología Iónica'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[4]/div/div/a/div', 'from': /Hyperspace Technology/g, 'to': 'Tecnología de Hyperespacio'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[4]/div/div/a[2]/div', 'from': /Hyperspace Technology/g, 'to': 'Tecnología de Hyperespacio'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li/div/div/a/div', 'from': /Espionage Technology/g, 'to': 'Tecnología de Espionaje'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li/div/div/a[2]/div', 'from': /Espionage Technology/g, 'to': 'Tecnología de Espionaje'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[2]/div/div/a/div', 'from': /Computer Technology/g, 'to': 'Tecnología de computación'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[2]/div/div/a[2]/div', 'from': /Computer Technology/g, 'to': 'Tecnología de computación'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[5]/div/div/a/div', 'from': /Graviton Technology/g, 'to': 'Tecnología de Gravitón'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[5]/div/div/a[2]/div', 'from': /Graviton Technology/g, 'to': 'Tecnología de Gravitón'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[4]/ul/li/div/div/a/div', 'from': /Weapons Technology/g, 'to': 'Tecnología de Militar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[4]/ul/li/div/div/a[2]/div', 'from': /Weapons Technology/g, 'to': 'Tecnología de Militar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[4]/ul/li[2]/div/div/a/div', 'from': /Shielding Technology/g, 'to': 'Tecnología de Defensa'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[4]/ul/li[2]/div/div/a[2]/div', 'from': /Shielding Technology/g, 'to': 'Tecnología de Defensa'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[4]/ul/li[3]/div/div/a/div', 'from': /Armour Technology/g, 'to': 'Tecnología de Blindaje'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[4]/ul/li[3]/div/div/a[2]/div', 'from': /Armour Technology/g, 'to': 'Tecnología de Blindaje'},
                
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[4]/div/div/a/div', 'from': /Intergalactic Research Network/g, 'to': 'Red de investigación intergaláctica'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[4]/div/div/a[2]/div', 'from': /Intergalactic Research Network/g, 'to': 'Red de investigación intergaláctica'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[3]/div/div/a/div', 'from': /Astrophysics/g, 'to': 'Astrofísica'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[3]/div/div/a[2]/div', 'from': /Astrophysics/g, 'to': 'Astrofísica'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[2]/ul/li/div/div/a/div', 'from': /Combustion Drive/g, 'to': 'Motor de Combustión'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[2]/ul/li/div/div/a[2]/div', 'from': /Combustion Drive/g, 'to': 'Motor de Combustión'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[2]/ul/li[2]/div/div/a/div', 'from': /Impulse Drive/g, 'to': 'Motor de Impulso'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[2]/ul/li[2]/div/div/a[2]/div', 'from': /Impulse Drive/g, 'to': 'Motor de Impulso'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[2]/ul/li[3]/div/div/a/div', 'from': /Hyperspace Drive/g, 'to': 'Propulsor Hyperespacial'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[2]/ul/li[3]/div/div/a[2]/div', 'from': /Hyperspace Drive/g, 'to': 'Propulsor Hyperespacial'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/h3', 'from': /Basic research/g, 'to': 'Investigación básica'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[2]/h3', 'from': /Drive research/g, 'to': 'Investigación de propulsión'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/h3', 'from': /Advanced researches/g, 'to': 'Investigaciones avanzadas'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[4]/h3', 'from': /Combat research/g, 'to': 'Investigación de combate'},    
    ];
    translation_hangar = [
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li/div/div/a/div', 'from': /Light Fighter/g, 'to': 'Cazador Ligero'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li/div/div/a[2]/div', 'from': /Light Fighter/g, 'to': 'Cazador Ligero'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[2]/div/div/a/div', 'from': /Heavy Fighter/g, 'to': 'Cazador Pesado'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[2]/div/div/a[2]/div', 'from': /Heavy Fighter/g, 'to': 'Cazador Pesado'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[3]/div/div/a/div', 'from': /Cruiser/g, 'to': 'Crucero'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[3]/div/div/a[2]/div', 'from': /Cruiser/g, 'to': 'Crucero'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[4]/div/div/a/div', 'from': /Battleship/g, 'to': 'Nave de batalla'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[4]/div/div/a[2]/div', 'from': /Battleship/g, 'to': 'Nave de batalla'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li/div/div/a/div', 'from': /Small Cargo/g, 'to': 'Nave pequeña de carga'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li/div/div/a[2]/div', 'from': /Small Cargo/g, 'to': 'Nave pequeña de carga'},
                
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[2]/div/div/a/div', 'from': /Large Cargo/g, 'to': 'Nave grande de carga'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[2]/div/div/a[2]/div', 'from': /Large Cargo/g, 'to': 'Nave grande de carga'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[3]/div/div/a/div', 'from': /Colony Ship/g, 'to': 'Colonizador'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[3]/div/div/a[2]/div', 'from': /Colony Ship/g, 'to': 'Colonizador'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[5]/div/div/a/div', 'from': /Battlecruiser/g, 'to': 'Acorazado'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[5]/div/div/a[2]/div', 'from': /Battlecruiser/g, 'to': 'Acorazado'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[6]/div/div/a/div', 'from': /Bomber/g, 'to': 'Bombardero'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[6]/div/div/a[2]/div', 'from': /Bomber/g, 'to': 'Bombardero'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[7]/div/div/a/div', 'from': /Destroyer/g, 'to': 'Destructor'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[7]/div/div/a[2]/div', 'from': /Destroyer/g, 'to': 'Destructor'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[8]/div/div/a/div', 'from': /Deathstar/g, 'to': 'Estrella de la muerte'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/ul/li[8]/div/div/a[2]/div', 'from': /Deathstar/g, 'to': 'Estrella de la muerte'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[4]/div/div/a/div', 'from': /Recycler/g, 'to': 'Reciclador'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[4]/div/div/a[2]/div', 'from': /Recycler/g, 'to': 'Reciclador'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[5]/div/div/a/div', 'from': /Espionage Probe/g, 'to': 'Sonda de espionaje'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[5]/div/div/a[2]/div', 'from': /Espionage Probe/g, 'to': 'Sonda de espionaje'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[6]/div/div/a/div', 'from': /Solar Satellite/g, 'to': 'Satelite Solar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/ul/li[6]/div/div/a[2]/div', 'from': /Solar Satellite/g, 'to': 'Satelite Solar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/h2', 'from': /Combat ships/g, 'to': 'Naves de batalla'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div[3]/h3', 'from': /Civil ships/g, 'to': 'Naves civiles'},    
    ];
    translation_defense = [
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/h2', 'from': /Defensive structures/g, 'to': 'Estructuras defensivas'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li/div/div/a/div', 'from': /Rocket Launcher/g, 'to': 'Lanzamisiles'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[2]/div/div/a/span', 'from': /Light Laser/g, 'to': 'Laser pequeño'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[3]/div/div/a/div', 'from': /Heavy Laser/g, 'to': 'Laser Grande'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[4]/div/div/a/div', 'from': /Gauss Cannon/g, 'to': 'Cañon de gauss'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[5]/div/div/a/div', 'from': /Ion Cannon/g, 'to': 'Cañon iónico'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[6]/div/div/a/div', 'from': /Plasma Turret/g, 'to': 'Cañon de plasma'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[7]/div/div/a/div', 'from': /Small Shield Dome/g, 'to': 'Cúpula pequeña de protección'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[8]/div/div/a/div', 'from': /Large Shield Dome/g, 'to': 'Cúpula grande de protección'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[9]/div/div/a/div', 'from': /Anti-Ballistic Missiles/g, 'to': 'Misiles antibalísticos'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/ul/li[10]/div/div/a/div', 'from': /Interplanetary Missiles/g, 'to': 'Misiles interplanetarios'}, 
    ];
    translation_fleet = [
    
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div[2]/span', 'from': /Deuterium consumption/, 'to':'Consumo de combustible'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/span', 'from': /Tactical retreat/, 'to':'Repligue táctico'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div/h2', 'from': /Fleet dispatch/, 'to':'Envío de flotas'},    
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/div/ul/li[2]', 'from': /Duration of flight/g, 'to': 'Duración del vuelo'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/form/div/div/ul/li[3]', 'from': /Duration of flight/g, 'to': 'Duración del vuelo'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/div/ul/li[2]', 'from': /one way/g, 'to': 'un trayecto'}, 
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/form/div/div/ul/li[3]', 'from': /one way/g, 'to': 'un trayecto'}, 
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/div/ul/li[3]', 'from': /Deuterium consumption/g, 'to': 'Consumo de combustible'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/form/div/div/ul/li[8]', 'from': /Deuterium consumption/g, 'to': 'Consumo de combustible'},
            
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/div[2]/div/a/span', 'from': /Next/g, 'to': 'Siguiente'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[3]/div[2]/a/span', 'from': /fleet movement/g, 'to': 'movimiento de flota'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[3]/div/div[2]/span', 'from': /Expedition/g, 'to': 'Expediciones'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[3]/div/div/span', 'from': /fleets/g, 'to': 'Flotas'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div/ul/li/div/a/div', 'from': /Light Fighter/g, 'to': 'Cazador Ligero'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div/ul/li[2]/div/a/div', 'from': /Heavy Fighter/g, 'to': 'Cazador Pesado'},
          
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div/ul/li[3]/div/a/div', 'from': /Cruiser/g, 'to': 'Crucero'},
          
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div/ul/li[4]/div/a/div', 'from': /Battleship/g, 'to': 'Nave de batalla'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div[3]/ul/li/div/a/div', 'from': /Small Cargo/g, 'to': 'Nave pequeña de carga'},
                
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div[3]/ul/li[2]/div/a/div', 'from': /Large Cargo/g, 'to': 'Nave grande de carga'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div[3]/ul/li[3]/div/a/div', 'from': /Colony Ship/g, 'to': 'Colonizador'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div/ul/li[5]/div/a/div', 'from': /Battlecruiser/g, 'to': 'Acorazado'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div/ul/li[6]/div/a/div', 'from': /Bomber/g, 'to': 'Bombardero'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div/ul/li[7]/div/a/div', 'from': /Destroyer/g, 'to': 'Destructor'},
       
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div/ul/li[8]/div/a/div', 'from': /Deathstar/g, 'to': 'Estrella de la muerte'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div[3]/ul/li[4]/div/a/div', 'from': /Recycler/g, 'to': 'Reciclador'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div[3]/ul/li[5]/div/a/div', 'from': /Espionage Probe/g, 'to': 'Sonda de espionaje'},
       
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div/h3', 'from': /Combat ships/g, 'to': 'Naves de batalla'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[7]/form/div[3]/h3', 'from': /Civil ships/g, 'to': 'Naves civiles'}, 
                        
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/table/tbody/tr/th', 'from': /Take off location/g, 'to': 'Lugar de despegue'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/table/tbody/tr/th[3]', 'from': /Destination/g, 'to': 'Destino'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/table/tbody/tr[2]/td/div[3]', 'from': /Coordinates/g, 'to': 'Coordenadas'},
        {'xpath':'/div/div[2]/div/div[7]/form/div/div[4]/table/tbody/tr[2]/td[3]/div[3]', 'from': /Coordinates/g, 'to': 'Coordenadas'},
        
        {'xpath':'//*[@id="shortlinks tips"]', 'from': /Shortcuts/g, 'to': 'Acceso rápido'},
        {'xpath':'//*[@id="combatunits tips"]', 'from': /Combat forces/g, 'to': 'Fuerzas Bélicas'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/div/h3', 'from': /Briefing/g, 'to': 'Resumen'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/div/ul/li', 'from': /Speed/g, 'to': 'Velocidad'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/div/ul[2]/li', 'from': /Arrival/g, 'to': 'Llegada'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/form/div/div/ul/li[4]', 'from': /Arrival/g, 'to': 'Llegada'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/div/ul[2]/li[2]', 'from': /Return/g, 'to': 'Retorno'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/form/div/div/ul/li[5]', 'from': /Return/g, 'to': 'Retorno'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/div/ul[2]/li[3]', 'from': /Empty cargobays/g, 'to': 'Compartimientos libre de carga'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/div/div/a[2]/span', 'from': /Back/g, 'to': 'Volver'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/div/a/span', 'from': /Back/g, 'to': 'Volver'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/table/tbody/tr[2]/td[2]/div[2]', 'from': /Distance/g, 'to': 'Distancia'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/div/ul[2]/li/span', 'from': /Clock/g, 'to': 'Reloj'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/div/ul[2]/li[2]/span', 'from': /Clock/g, 'to': 'Reloj'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/form/div/div/ul/li[4]/span', 'from': /Clock/g, 'to': 'Reloj'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/form/div/div/ul/li[5]/span', 'from': /Clock/g, 'to': 'Reloj'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/form/div/div[4]/div/div/a/span', 'from': /Next/g, 'to': 'Siguiente'},
        
        {'xpath':'//*[@id="missionNameWrapper"]', 'from': /Mission/g, 'to': 'Misión'},
        {'xpath':'//*[@id="missionName"]', 'from': /Attack/g, 'to': 'Ataque'},
        {'xpath':'//*[@id="missionName"]', 'from': /Espionage/g, 'to': 'Espionaje'},
        {'xpath':'//*[@id="missionName"]', 'from': /Transport/g, 'to': 'Transportar'},
        {'xpath':'//*[@id="missionName"]', 'from': /ASC Defend/g, 'to': 'Mantener Posición'},
        {'xpath':'//*[@id="missionName"]', 'from': /Deployment/g, 'to': 'Desplegar'},
        {'xpath':'//*[@id="missionName"]', 'from': /ASC Attack/g, 'to': 'Ataque en confederación'},
        {'xpath':'//*[@id="missionName"]', 'from': /Moon Destruction/g, 'to': 'Destruir'},
        {'xpath':'//*[@id="missionName"]', 'from': /Recycle debris fields/g, 'to': 'Reciclar campos de escombros'},
        {'xpath':'//*[@id="missionName"]', 'from': /Colonization/g, 'to': 'Colonizar'},
        {'xpath':'//*[@id="missionName"]', 'from': /Expedition/g, 'to': 'Expedición'},
                
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/form/div/div/ul/li', 'from': /Target/g, 'to': 'Objetivo'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/form/div/div/ul/li', 'from': /Target/g, 'to': 'Objetivo'},
        
        //{'xpath':'', 'from': /Hold Time/g, 'to': 'Tiempo'},
        {'xpath':'//*[@id="loadRoom"]', 'from': /cargo bay/g, 'to': 'compatimientos de carga'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/div/a[2]/span', 'from': /Send fleet/g, 'to': 'Enviar Flota'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/form/div/div[2]/h3', 'from': /Load resources/g, 'to': 'Cargar recursos'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/h3', 'from': /Select mission for target/g, 'to': 'Seleccione misión para el objetivo'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/form/div/div/h3', 'from': /Briefing/g, 'to': 'Resumen'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/form/div/div/ul/li[8]/span ', 'from': /Deuterium/g, 'to': 'Deuterio'}, 
              

    ];
    
    translation_fleet_missions = [
        {'xpath':'//*[@id="missionName"]', 'from': /Attack/g, 'to': 'Ataque'},
        {'xpath':'//*[@id="missionName"]', 'from': /Espionage/g, 'to': 'Espionaje'},
        {'xpath':'//*[@id="missionName"]', 'from': /Transport/g, 'to': 'Transportar'},
        {'xpath':'//*[@id="missionName"]', 'from': /ASC Defend/g, 'to': 'Mantener Posición'},
        {'xpath':'//*[@id="missionName"]', 'from': /Deployment/g, 'to': 'Desplegar'},
        {'xpath':'//*[@id="missionName"]', 'from': /ASC Attack/g, 'to': 'Ataque en confederación'},
        {'xpath':'//*[@id="missionName"]', 'from': /Moon Destruction/g, 'to': 'Destruir'},
        {'xpath':'//*[@id="missionName"]', 'from': /Recycle debris fields/g, 'to': 'Reciclar campos de escombros'},
        {'xpath':'//*[@id="missionName"]', 'from': /Colonization/g, 'to': 'Colonizar'},
        {'xpath':'//*[@id="missionName"]', 'from': /Expedition/g, 'to': 'Expedición'},    
    ];
    translation_messages = [
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[5]/div/div/div/ul/li/a/span', 'from': /Espionage/g, 'to': 'Espionaje'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[5]/div/div/div/ul/li[3]/a/span', 'from': /Player/g, 'to': 'jugador'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[5]/div/div/div/ul/li[4]/a/span', 'from': /Expedition/g, 'to': 'Expedición'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[5]/div/div/div/ul/li[5]/a/span', 'from': /Alliance/g, 'to': 'Alianza'},        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[5]/div/div/div/ul/li[2]/a/span', 'from': /Battle/g, 'to': 'Batallas'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[5]/div/div/div/ul/li[6]/a/span', 'from': /Other/g, 'to': 'Otros'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[4]/ul[3]/li[2]/a/span', 'from': /Recycle bin/g, 'to': 'Papelera de reciclaje'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[4]/ul[3]/li/a/span', 'from': /Inbox/g, 'to': 'Bandeja de entrada'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[4]/ul[3]/li[3]/a/span', 'from': /Outbox/g, 'to': 'Bandeja de salida'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[4]/ul[3]/li[4]/a/span', 'from': /Address Book/g, 'to': 'Libreta de contactos'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div/h2', 'from': /Messages/g, 'to': 'Mensajes'},
    ];
    
    translations_messages_ajax = [
    {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[5]/div/div/div/div/form/table/tbody/tr/th[3]', 'from': /Subject/g, 'to': 'Asunto'},
    {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[5]/div/div/div/div/form/table/tbody/tr/th[4]', 'from': /Date/g, 'to': 'Fecha'},
    {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[5]/div/div/div/div/form/table/tbody/tr/th[2]', 'from': /Sender/g, 'to': 'Remitente'},
    ];

    translations_messages_ajax2 = [
    {'xpath':'//*[@id="mailz"]', 'from': /No messages found/g, 'to': 'No hay mensajes'},
    
    {'xpath':'//*[@id="mailz"]', 'from': /Circular message/g, 'to': 'Mensaje circular'},
    {'xpath':'//*[@id="mailz"]', 'from': /Espionage action on/g, 'to': 'Informe de espionaje en'},
    {'xpath':'//*[@id="mailz"]', 'from': /Espionage report of/g, 'to': 'Reporte de espionaje de'},

    {'xpath':'//*[@id="mailz"]', 'from': /Fleet deployment/g, 'to': 'Despligue de una flota'},    
    {'xpath':'//*[@id="mailz"]', 'from': /has joined/g, 'to': 'se ha unido'},	
    {'xpath':'//*[@id="mailz"]', 'from': /Space Monitoring/g, 'to': 'Control del espacio'},
    {'xpath':'//*[@id="mailz"]', 'from': /Fleet Command/g, 'to': 'Ordenes de la flota'},
    
    {'xpath':'//*[@id="mailz"]', 'from': /Alliance/g, 'to': 'Alianza'},
    
    /*{'xpath':'', 'from': /Select action/g, 'to': 'Seleccione una acción'},
    {'xpath':'', 'from': /Mark message as read/g, 'to': 'Marcar mensaje como leído'},
    {'xpath':'', 'from': /Delete marked messages/g, 'to': 'Borrar mensajes marcados'},
    {'xpath':'', 'from': /Delete all unmarked messages/g, 'to': 'Borrar mensajes sin marcar'},
    {'xpath':'', 'from': /Delete shown messages/g, 'to': 'Borrar mensajes mostrados'},
    {'xpath':'', 'from': /Delete all messages/g, 'to': 'Borrar todos los mensajes'},
    {'xpath':'', 'from': /Messages/g, 'to': 'Mensajes'},    */
    ];
    
    translation_movement = [
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[3]', 'from': /Attack/g, 'to': 'Ataque'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[3]', 'from': /Espionage/g, 'to': 'Espionaje'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[3]', 'from': /Transport/g, 'to': 'Transportar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[3]', 'from': /ASC Defend/g, 'to': 'Mantener Posición'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[3]', 'from': /Deployment/g, 'to': 'Desplegar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[3]', 'from': /ASC Attack/g, 'to': 'Ataque en confederación'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[3]', 'from': /Moon Destruction/g, 'to': 'Destruir'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[3]', 'from': /Recycle debris fields/g, 'to': 'Reciclar campos de escombros'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[3]', 'from': /Colonization/g, 'to': 'Colonizar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[3]', 'from': /Expedition/g, 'to': 'Expedición'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/span/a/span', 'from': /Reload/g, 'to': 'Recargar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/span[2]', 'from': /fleets/g, 'to': 'Flotas'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/span[3]', 'from': /Expeditions/g, 'to': 'Expediciones'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[13]', 'from': /Return/g, 'to': 'Retorno'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[2]', 'from': /Clock/g, 'to': 'Reloj'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[5]/span[12]', 'from': /Clock/g, 'to': 'Reloj'},  
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/h2', 'from': /fleet movement/g, 'to': 'Movimiento de flota'},                 
    ];
    
    translation_fleet_missions2 = [
        {'xpath':'//*[@id="eventContent"]', 'from': /Attack/g, 'to': 'Ataque'},
        {'xpath':'//*[@id="eventContent"]', 'from': /Espionage/g, 'to': 'Espionaje'},
        {'xpath':'//*[@id="eventContent"]', 'from': /Transport/g, 'to': 'Transportar'},
        {'xpath':'//*[@id="eventContent"]', 'from': /ASC Defend/g, 'to': 'Mantener Posición'},
        {'xpath':'//*[@id="eventContent"]', 'from': /Deployment/g, 'to': 'Desplegar'},
        {'xpath':'//*[@id="eventContent"]', 'from': /ASC Attack/g, 'to': 'Ataque en confederación'},
        {'xpath':'//*[@id="eventContent"]', 'from': /Moon Destruction/g, 'to': 'Destruir'},
        {'xpath':'//*[@id="eventContent"]', 'from': /Recycle debris fields/g, 'to': 'Reciclar'},
        {'xpath':'//*[@id="eventContent"]', 'from': /Colonization/g, 'to': 'Colonizar'},
        {'xpath':'//*[@id="eventContent"]', 'from': /Expedition/g, 'to': 'Expedición'}, 
        {'xpath':'/html/body/div/div[2]/div/div[7]/div/div/div/h4', 'from': /Events/g, 'to': 'Eventos'},
           
    ];
    
    translations_galaxy = [
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/table/tbody/tr/td/div/form/div/span', 'from': /Galaxy/g, 'to': 'Galaxia'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/table/tbody/tr/td/div/form/div[2]/span', 'from': /System/g, 'to': 'Sistema Solar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/table/tbody/tr/td/div/div/a/span[2]', 'from': /Display/g, 'to': 'Mostrar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/table/tbody/tr/td/div/div[2]/a/span[2]', 'from': /Expedition/g, 'to': 'Expedición'},        

    ];
    
    translations_galaxy_ajax = [
        {'xpath':'//*[@id="probes"]', 'from': /Spy probes/g, 'to': 'Sondas de espionaje'},
        {'xpath':'//*[@id="recycler"]', 'from': /Recycler/g, 'to': 'Reciclador'},
        {'xpath':'//*[@id="rockets"]', 'from': /Interplanetary missiles/g, 'to': 'Misiles interplanetarios'},
        {'xpath':'//*[@id="slots"]', 'from': /used slots/g, 'to': 'espacios usados'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/table/tbody/tr[2]/th', 'from': /Planet/g, 'to': 'Planeta'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/table/tbody/tr[2]/th[2]', 'from': /Name/g, 'to': 'Nombre'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/table/tbody/tr[2]/th[3]', 'from': /moon/g, 'to': 'Luna'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/table/tbody/tr[2]/th[4]', 'from': /DF/g, 'to': 'Escombros'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/table/tbody/tr[2]/th[5]', 'from': /Player/g, 'to': 'Jugador'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/table/tbody/tr[2]/th[5]', 'from': /status/g, 'to': 'estado'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/table/tbody/tr[2]/th[6]', 'from': /Alliance/g, 'to': 'Alianza'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[2]/table/tbody/tr[2]/th[8]', 'from': /Action/g, 'to': 'Acción'},
        {'xpath':'//*[@id="colonized"]', 'from': /Planets colonized/g, 'to': 'Planetas colonizados'},                
    ]; 
    
    translations_alliance = [
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[4]/ul/li[2]/a/span', 'from': /Management/g, 'to': 'Administración'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[4]/ul/li[3]/a/span', 'from': /Communication/g, 'to': 'Comunicación'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[4]/ul/li[4]/a/span', 'from': /Applications/g, 'to': 'Solicitudes'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[2]/div/table/tbody/tr[2]/td', 'from': /Tag/g, 'to': 'Etiqueta'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[2]/div/table/tbody/tr[3]/td', 'from': /Member/g, 'to': 'Miembros'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[2]/div/table/tbody/tr[4]/td', 'from': /Your Rank/g, 'to': 'Tu rango'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[2]/div/table/tbody/tr[5]/td', 'from': /Homepage/g, 'to': 'Página principal'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[4]/div/form/table/thead/tr/th[4]/a', 'from': /Rank/g, 'to': 'Posición'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[4]/div/form/table/thead/tr/th[3]/a', 'from': /Rank/g, 'to': 'Rango'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[4]/div/form/table/thead/tr/th[5]', 'from': /Coords/g, 'to': 'Coordenadas'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[4]/div/form/table/thead/tr/th[6]/a', 'from': /Joined/g, 'to': 'Ingreso'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div/h3/a/span', 'from': /Your alliance/g, 'to': 'Tu alianza'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[3]/h3/a/span', 'from': /Member List/g, 'to': 'Lista de miembros'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[5]/h3/a/span', 'from': /Internal Area/g, 'to': 'Area interna'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[7]/h3/a/span', 'from': /External Area/g, 'to': 'Area externa'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[9]/h3/a/span', 'from': /Leave alliance/g, 'to': 'Salir de la alianza'},
         
         
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div/h2', 'from': /Alliance/g, 'to': 'Alianza'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[4]/ul/li/a/span', 'from': /Overview/g, 'to': 'Visión general'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[4]/div/form/table/thead/tr/th[7]/a', 'from': /Online/g, 'to': 'Estado'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[2]/div/table/tbody/tr/td', 'from': /Name/g, 'to': 'Nombre'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[4]/div/form/table/thead/tr/th/a', 'from': /Name/g, 'to': 'Nombre'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/div[10]/div/div/a/span', 'from': /Next/g, 'to': 'Salir'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/form/div/div/table/tbody/tr/td', 'from': /To/g, 'to': 'Destinatario'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/form/div/div/table/tbody/tr[2]/td/span', 'from': /Mail text/g, 'to': 'Texto de e-mail'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/form/div/div/table/tbody/tr[2]/td/span', 'from': /characters/g, 'to': 'caracteres'},
                
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/form/div/div/table/tbody/tr/td[2]/select/option', 'from': /all players/g, 'to': 'Todos los jugadores'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/form/div/div/table/tbody/tr/td[2]/select', 'from': /only rank/g, 'to': 'Sólo rango'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div/div[6]/form/div/div/table/tbody/tr[3]/td/input', 'from': /Send/g, 'to': 'Enviar'},                                                                
                                
    ];
    
    translations_highscore = [        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr/td', 'from': /Economy points/g, 'to': 'Economía'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr/td', 'from': /Research points/g, 'to': 'Investigación'},
        
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr/td', 'from': /Military points built /g, 'to': 'Puntos militares construidos'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr/td', 'from': /Military points destroyed/g, 'to': 'Puntos militares destruidos'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr/td', 'from': /Military points lost/g, 'to': 'Puntos militares perdidos'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr/td', 'from': /Honour points/g, 'to': 'Puntos de honor'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr/td', 'from': /Military points/g, 'to': 'Puntos militares'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr/td', 'from': /Points/g, 'to': 'Puntos'},
        
         
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr[2]/td[5]', 'from': /Points/g, 'to': 'Puntos'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr[2]/td', 'from': /Position/g, 'to': 'Posición'},        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr[2]/td[3]', 'from': /Alliance/g, 'to': 'Alianza'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr[2]/td[4]', 'from': /Action/g, 'to': 'Acción'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr[2]/td[5]', 'from': /Member/g, 'to': 'Miembros'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr[2]/td[6]', 'from': /Points/g, 'to': 'Puntos'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div/div[2]/form/div[2]/div/table/tbody/tr[2]/td[3]', 'from': /Players Name/g, 'to': 'Nombre del jugador'},

        
        
    ];
    
    translations_preferences = [
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/div/ul/li/a/span', 'from': /User data/g, 'to': 'Datos de usuario'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/div/ul/li[2]/a/span', 'from': /General/g, 'to': 'General'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/div/ul/li[3]/a/span', 'from': /Display/g, 'to': 'Descripción'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/div/ul/li[4]/a/span', 'from': /Extended/g, 'to': 'Extendido'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div/label', 'from': /Players Name/g, 'to': 'Nombre del jugador'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[2]/div/label', 'from': /Your player name/g, 'to': 'Tu nombre de jugador'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[2]/div[2]/label', 'from': /New player name/g, 'to': 'Nuevo nombre de jugador'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[2]/div[3]/label', 'from': /Enter password/g, 'to': 'Ingresa la contraseña'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[2]/div[3]/label/em', 'from': /as confirmation/g, 'to': 'como confirmación'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[2]/div[4]/p', 'from': /You are able to change your player name/g, 'to': 'Puedes cambiar tu nombre de jugador'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[2]/div[4]/p/strong', 'from': /once a week/g, 'to': 'una vez a la semana'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[2]/input', 'from': /Use settings/g, 'to': 'Aplicar'},
                
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[3]/label', 'from': /Change password/g, 'to': 'Cambiar contraseña'}, 
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[4]/div/label', 'from': /Enter old password/g, 'to': 'Introducir contraseña antigua'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[4]/div[2]/label', 'from': /New password/g, 'to': 'Nueva contraseña'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[4]/div[2]/label', 'from': /at least 8 characters/g, 'to': 'min. 8 caracteres'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[4]/div[3]/label', 'from': /Repeat the new password/g, 'to': 'Repite la nueva contraseña'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[4]/input ', 'from': /Use settings/g, 'to': 'Aplicar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[5]/label', 'from': /Email address/g, 'to': 'Correo electrónico'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[6]/div/label', 'from': /Current e-mail address/g, 'to': 'Correo electrónico actual'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[6]/div[2]/label', 'from': /New e-mail address/g, 'to': 'Nuevo correo electrónico'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[6]/div[3]/label', 'from': /Enter password/g, 'to': 'Ingresa la contraseña'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[6]/div[3]/label/em', 'from': /as confirmation/g, 'to': 'como confirmación'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[6]/div[4]/p', 'from': /You can change your e-mail address every/g, 'to': 'Puedes cambiar tu correo electrónico cada'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[6]/div[4]/p/strong', 'from': /7 days/g, 'to': '7 días'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div/div[6]/input', 'from': /Use settings/g, 'to': 'Aplicar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div/label', 'from': /Spy probes/g, 'to': 'Sondas de espionaje'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[2]/div/label', 'from': /Number of espionage probes/g, 'to': 'Número de sondas de espionaje'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[2]/input', 'from': /Use settings/g, 'to': 'Aplicar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[3]/label', 'from': /Warnings/g, 'to': 'Avisos'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[4]/div/label', 'from': /Deactivate Outlaw-Warning on attacks on opponents 10-times stronger/g, 'to': 'Desactivar alertas sobre los ataques fuera de la ley a los opositores de 10 veces más fuerte'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[4]/input', 'from': /Use settings/g, 'to': 'Aplicar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[5]/label', 'from': /Messages/g, 'to': 'Mensajes'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[6]/div/label', 'from': /Show full spy report/g, 'to': 'Mostrar informe de espionaje completo'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[6]/div[2]/label', 'from': /Amount of displayed message per page/g, 'to': 'Mensajes mostrados por página'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[6]/input', 'from': /Use settings/g, 'to': 'Aplicar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[7]/label', 'from': /IP-Check/g, 'to': 'Comprobación de IP'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[8]/div/label', 'from': /Disable IP Check/g, 'to': 'Desactivar comprobación de IP'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[8]/div[2]/p', 'from': /IP Check means that you will be automatically logged out for safety reasons if your IP is changed or two players log in through different IPs on the same account. Deactivating IP check can be a safety risk./g, 'to': 'La Comprobación de IP significa que serás automáticamente deslogueado por razones de seguridad si tu IP ha cambiado o si dos jugadores están logueados a través de IPs distintas en la misma cuenta. Desactivar esta opción puede significar un riesgo de seguridad.'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[8]/input', 'from': /Use settings/g, 'to': 'Aplicar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[2]/div[10]/input', 'from': /Use settings/g, 'to': 'Aplicar'},
        
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div/label', 'from': /Your planets/g, 'to': 'Tus planetas'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[2]/div/label', 'from': /Sort planets by/g, 'to': 'Ordenar planetas por'},        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[2]/div[2]/label', 'from': /Sorting sequence/g, 'to': 'Secuencia de ordenado'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[2]/div/div/select', 'from': /Order of emergence/g, 'to': 'Orden de creación'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[2]/div/div/select', 'from': /Coordinates/g, 'to': 'Coordenadas'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[2]/div/div/select', 'from': /Alphabet/g, 'to': 'Alfabeticamente'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[2]/div/div/select', 'from': /Size/g, 'to': 'Tamaño'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[2]/div/div/select', 'from': /Used fields/g, 'to': 'Campos usados'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[2]/div[2]/div/select', 'from': /up/g, 'to': 'ascendente'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[2]/div[2]/div/select', 'from': /down/g, 'to': 'descendente'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[2]/input', 'from': /Use settings/g, 'to': 'Aplicar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[3]/label', 'from': /Other/g, 'to': 'Otros'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[4]/div/label', 'from': /Animated detail display/g, 'to': 'Visualización detallada animada'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[4]/div[2]/label', 'from': /Animated overview/g, 'to': 'Vista animada'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[4]/div[3]/label', 'from': /Always show events/g, 'to': 'Siempre mostrar eventos'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[4]/div[3]/div/select', 'from': /Hide/g, 'to': 'Ocultar'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[4]/div[3]/div/select', 'from': /Above the content/g, 'to': 'Encima del contenido'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[4]/div[3]/div/select', 'from': /Below the content/g, 'to': 'Debajo del contenido'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[3]/div[4]/input', 'from': /Use settings/g, 'to': 'Aplicar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[4]/div/label', 'from': /Vacation Mode/g, 'to': 'Modo Vacaciones'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[4]/div[2]/div/label', 'from': /Activate vacation mode/g, 'to': 'Activar modo vacaciones'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[4]/div[2]/input', 'from': /Use settings/g, 'to': 'Aplicar'},
        
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[4]/div[3]/label', 'from': /Your Account/g, 'to': 'Tu cuenta'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[4]/div[4]/div/label', 'from': /Delete account/g, 'to': 'Borrar cuenta'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[4]/div[4]/div[2]/p', 'from': /check here to have your account marked for automatical deletion after 7 days./g, 'to': 'Si marcas ésta opción, tu cuenta se borrará automáticamente después de 7 días.'},
        {'xpath':'/html/body/div/div[2]/div/div[7]/div[2]/div[4]/div/div/form/div/div[4]/div[4]/input', 'from': /Use settings/g, 'to': 'Aplicar'},      
 
    ];
    
    url = location.href;
    
    for(var i = 0; i < translation_overview.length; i++) {
        if(translation_overview[i].xpath != '') {
            var objectTranslate = document.evaluate( translation_overview[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
            if(objectTranslate != null) {
                objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translation_overview[i].from, translation_overview[i].to);    
            }             
        } else {
            document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translation_overview[i].from, translation_overview[i].to);
        }
    }         
    
    if(url.indexOf('resource') > -1) {
        for(var i = 0; i < translation_resources.length; i++) {
            if(translation_resources[i].xpath != '') {
                var objectTranslate = document.evaluate( translation_resources[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                if(objectTranslate != null) {
                    if(translation_resources[i].xpath.indexOf('input') > -1) {
                        objectTranslate.value = translation_resources[i].to;    
                    } else {
                        objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translation_resources[i].from, translation_resources[i].to);
                    }  
                }             
            } else {
                document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translation_resources[i].from, translation_resources[i].to);
            }
        }         
    }
    
    if(url.indexOf('station') > -1) {
        for(var i = 0; i < translation_facilities.length; i++) {
            if(translation_facilities[i].xpath != '') {
                var objectTranslate = document.evaluate( translation_facilities[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                if(objectTranslate != null) {
                    if(translation_facilities[i].xpath.indexOf('input') > -1) {
                        objectTranslate.value = translation_facilities[i].to;    
                    } else {
                        objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translation_facilities[i].from, translation_facilities[i].to);
                    }  
                }             
            } else {
                document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translation_facilities[i].from, translation_facilities[i].to);
            }
        }          
    }
    
    if(url.indexOf('trader') > -1) {
        for(var i = 0; i < translation_mercader.length; i++) {
            if(translation_mercader[i].xpath != '') {
                var objectTranslate = document.evaluate( translation_mercader[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                if(objectTranslate != null) {
                    if(translation_mercader[i].xpath.indexOf('input') > -1) {
                        objectTranslate.value = translation_mercader[i].to;    
                    } else {
                        objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translation_mercader[i].from, translation_mercader[i].to);
                    }  
                }             
            } else {
                document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translation_mercader[i].from, translation_mercader[i].to);
            }
        }          
    }   
    
    if(url.indexOf('research') > -1) {
        for(var i = 0; i < translation_research.length; i++) {
            if(translation_research[i].xpath != '') {
                var objectTranslate = document.evaluate( translation_research[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                if(objectTranslate != null) {
                    if(translation_research[i].xpath.indexOf('input') > -1) {
                        objectTranslate.value = translation_research[i].to;    
                    } else {
                        objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translation_research[i].from, translation_research[i].to);
                    }  
                }             
            } else {
                document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translation_research[i].from, translation_research[i].to);
            }
        }          
    } 

    if(url.indexOf('shipyard') > -1) {
        for(var i = 0; i < translation_hangar.length; i++) {
            if(translation_hangar[i].xpath != '') {
                var objectTranslate = document.evaluate( translation_hangar[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                if(objectTranslate != null) {
                    if(translation_hangar[i].xpath.indexOf('input') > -1) {
                        objectTranslate.value = translation_hangar[i].to;    
                    } else {
                        objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translation_hangar[i].from, translation_hangar[i].to);
                    }  
                }             
            } else {
                document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translation_hangar[i].from, translation_hangar[i].to);
            }
        }          
    }  
    
    if(url.indexOf('fleet') > -1) {
        for(var i = 0; i < translation_fleet.length; i++) {
            if(translation_fleet[i].xpath != '') {
                var objectTranslate = document.evaluate( translation_fleet[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                if(objectTranslate != null) {
                    if(translation_fleet[i].xpath.indexOf('input') > -1) {
                        objectTranslate.value = translation_fleet[i].to;    
                    } else {
                        objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translation_fleet[i].from, translation_fleet[i].to);
                    }  
                }             
            } else {
                document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translation_fleet[i].from, translation_fleet[i].to);
            }
        }         
    }
    
    if(url.indexOf('movement') > -1) {
        for(var i = 0; i < translation_movement.length; i++) {
            if(translation_movement[i].xpath != '') {
                var objectTranslate = document.evaluate( translation_movement[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                if(objectTranslate != null) {
                    if(translation_movement[i].xpath.indexOf('input') > -1) {
                        objectTranslate.value = translation_movement[i].to;    
                    } else {
                        objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translation_movement[i].from, translation_movement[i].to);
                    }  
                }             
            } else {
                document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translation_movement[i].from, translation_movement[i].to);
            }
        }         
    } 
    
    if(url.indexOf('defense') > -1) {
        for(var i = 0; i < translation_defense.length; i++) {
            if(translation_defense[i].xpath != '') {
                var objectTranslate = document.evaluate( translation_defense[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                if(objectTranslate != null) {
                    if(translation_defense[i].xpath.indexOf('input') > -1) {
                        objectTranslate.value = translation_defense[i].to;    
                    } else {
                        objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translation_defense[i].from, translation_defense[i].to);
                    }  
                }             
            } else {
                document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translation_defense[i].from, translation_defense[i].to);
            }
        }         
    } 
    
    if(url.indexOf('messages') > -1) {
        for(var i = 0; i < translation_messages.length; i++) {
            if(translation_messages[i].xpath != '') {
                var objectTranslate = document.evaluate( translation_messages[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                if(objectTranslate != null) {
                    if(translation_messages[i].xpath.indexOf('input') > -1) {
                        objectTranslate.value = translation_messages[i].to;    
                    } else {
                        objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translation_messages[i].from, translation_messages[i].to);
                    }  
                }             
            } else {
                document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translation_messages[i].from, translation_messages[i].to);
            }
        }         
    } 
    
    if(url.indexOf('galaxy') > -1) {
        for(var i = 0; i < translations_galaxy.length; i++) {
            if(translations_galaxy[i].xpath != '') {
                var objectTranslate = document.evaluate( translations_galaxy[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                if(objectTranslate != null) {
                    if(translations_galaxy[i].xpath.indexOf('input') > -1) {
                        objectTranslate.value = translations_galaxy[i].to;    
                    } else {
                        objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translations_galaxy[i].from, translations_galaxy[i].to);
                    }  
                }             
            } else {
                document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translations_galaxy[i].from, translations_galaxy[i].to);
            }
        }         
    }
    
    if(url.indexOf('alliance') > -1) {
        for(var i = 0; i < translations_alliance.length; i++) {
            if(translations_alliance[i].xpath != '') {
                var objectTranslate = document.evaluate( translations_alliance[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                if(objectTranslate != null) {
                    if(translations_alliance[i].xpath.indexOf('input') > -1) {
                        objectTranslate.value = translations_alliance[i].to;    
                    } else {
                        objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translations_alliance[i].from, translations_alliance[i].to);
                    }  
                }             
            } else {
                document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translations_alliance[i].from, translations_alliance[i].to);
            }
        }         
    } 
    
    if(url.indexOf('preferences') > -1) {
        for(var i = 0; i < translations_preferences.length; i++) {
            if(translations_preferences[i].xpath != '') {
                var objectTranslate = document.evaluate( translations_preferences[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                if(objectTranslate != null) {
                    if(translations_preferences[i].xpath.indexOf('input') > -1) {
                        objectTranslate.value = translations_preferences[i].to;    
                    } else {
                        objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translations_preferences[i].from, translations_preferences[i].to);
                    }  
                }             
            } else {
                document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translations_preferences[i].from, translations_preferences[i].to);
            }
        }          
    }                    

    (function(){    
    	if (typeof unsafeWindow === 'undefined') {
    		unsafeWindow = window;
    	}
        
    	function safeWrap(f) {
    		return function() {
    			setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
    		};
    	}     
        unsafeWindow.$('.tipsTitle').click(function(){            
            var objectTranslate = document.evaluate( '//*[@id="missionName"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
            if(objectTranslate != null) {
                for(var i = 0; i < translation_fleet_missions.length; i++) {
                    objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translation_fleet_missions[i].from, translation_fleet_missions[i].to);
                } 
            }
        });
        
		unsafeWindow.$("#eventdetails").ajaxSuccess(safeWrap(function(e,xhr,settings){
            var objectTranslate = document.evaluate( '//*[@id="eventContent"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
            if(objectTranslate != null) {
                for(var i = 0; i < translation_fleet_missions2.length; i++) {
                    objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translation_fleet_missions2[i].from, translation_fleet_missions2[i].to);
                } 
            }          
		}));
        
		unsafeWindow.$("#galaxyContent").ajaxSuccess(safeWrap(function(e,xhr,settings){
			if (settings.url.indexOf("page=galaxyContent") == -1) return;
            for(var i = 0; i < translations_galaxy_ajax.length; i++) {
                if(translations_galaxy_ajax[i].xpath != '') {
                    var objectTranslate = document.evaluate( translations_galaxy_ajax[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                    if(objectTranslate != null) {
                        if(translations_galaxy_ajax[i].xpath.indexOf('input') > -1) {
                            objectTranslate.value = translations_galaxy_ajax[i].to;    
                        } else {
                            objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translations_galaxy_ajax[i].from, translations_galaxy_ajax[i].to);
                        }  
                    }             
                } else {
                    document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translations_galaxy_ajax[i].from, translations_galaxy_ajax[i].to);
                }
            }           
		}));        
        
		unsafeWindow.$("#eins").ajaxSuccess(safeWrap(function(e,xhr,settings){
            for(var i = 0; i < translations_alliance.length; i++) {
                if(translations_alliance[i].xpath != '') {
                    var objectTranslate = document.evaluate( translations_alliance[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                    if(objectTranslate != null) {
                        if(translations_alliance[i].xpath.indexOf('input') > -1) {
                            objectTranslate.value = translations_alliance[i].to;    
                        } else {
                            objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translations_alliance[i].from, translations_alliance[i].to);
                        }  
                    }             
                } else {
                    document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translations_alliance[i].from, translations_alliance[i].to);
                }
            }         
		}));
        
		unsafeWindow.$("#messageContent").ajaxSuccess(safeWrap(function(e,xhr,settings){
            for(var i = 0; i < translations_messages_ajax.length; i++) {
                if(translations_messages_ajax[i].xpath != '') {
                    var objectTranslate = document.evaluate( translations_messages_ajax[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                    if(objectTranslate != null) {
                        if(translations_messages_ajax[i].xpath.indexOf('input') > -1) {
                            objectTranslate.value = translations_messages_ajax[i].to;    
                        } else {
                            objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translations_messages_ajax[i].from, translations_messages_ajax[i].to);
                        }  
                    }             
                } else {
                    document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translations_messages_ajax[i].from, translations_messages_ajax[i].to);
                }
            }
            unsafeWindow.$("td.from").each(function() {
                for(var i = 0; i < translations_messages_ajax2.length; i++) {
                    unsafeWindow.$(this).html(unsafeWindow.$(this).html().replace(translations_messages_ajax2[i].from, translations_messages_ajax2[i].to));
                }                
            });
            unsafeWindow.$(".ajax_thickbox").each(function() {
                for(var i = 0; i < translations_messages_ajax2.length; i++) {
                    unsafeWindow.$(this).html(unsafeWindow.$(this).html().replace(translations_messages_ajax2[i].from, translations_messages_ajax2[i].to));
                }                
            });            
               
		})); 
        
        unsafeWindow.$("#stat_list_content").ajaxSuccess(safeWrap(function(e,xhr,settings){
            for(var i = 0; i < translations_highscore.length; i++) {
                if(translations_highscore[i].xpath != '') {
                    var objectTranslate = document.evaluate( translations_highscore[i].xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                    if(objectTranslate != null) {
                        if(translations_highscore[i].xpath.indexOf('input') > -1) {
                            objectTranslate.value = translations_highscore[i].to;    
                        } else {
                            objectTranslate.innerHTML = objectTranslate.innerHTML.replace(translations_highscore[i].from, translations_highscore[i].to);
                        }  
                    }             
                } else {
                    document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(translations_highscore[i].from, translations_highscore[i].to);
                }
            }                         
        }));
        
        function checkVersion() {
            GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://userscripts.org/scripts/source/115928.user.js',
            headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
            },
            onload: function(responseDetails) {
                var vrs = responseDetails.responseText.split('/*VERSION*/');
                eval(vrs[1].replace('var Version', 'var Version2'));
                if(Version2 > Version) {
                    var box_top = '<div class="content-box-s" style="display: block; position: fixed; top: 10px; right: 10px; z-index: 999;" id="new_version_fleet_points"><div class="header"><a class="close_details" style="float: right; margin: 5px;" onclick="document.getElementById(\'new_version_fleet_points\').style.display = \'none\';" href="#"></a><h3 style="font-weight: bold;">New version available</h3></div><div class="content" style="max-height: 200px; max-width: 190px; overflow: auto;">';
                    var box_bottom = '</div><div class="footer"></div></div>';
                    donate_form = 'You can help us with our work <form target="_blank" style="margin-top:6px" action="https://www.paypal.com/cgi-bin/webscr" method="post">';
                    donate_form += '<input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----MIIHLwYJKoZIhvcNAQcEoIIHIDCCBxwCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYD';
                    donate_form += 'VQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYA3eCS1+iA32D7pqUVwevVBGmzYILcka+1rDI45iJooVV0TnBUH80Ei36Tcb0e6alMHYS9hJ+wNK/qwZcNz2ZlM0kcK/65r3YNQ1Rh0EVBt';
                    donate_form += 'uI8x2dkXwWScVkRI2I8TuKZfGqR/JjeALFeY0G6c0Zn3oW2h1U5imjGuL89i8Pm11zELMAkGBSsOAwIaBQAwgawGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQI2q9r9uiHHCeAgYie6zNA+mazvKMRZX/VPuRfg/pOwt3uOIGL7CV77j3FdJ1reDHd5YDM7KXZL9f5aM8rypY55P7OiFEpx2/N8xpJVfHE7MHZVCGqGB/RPpFBCXWWr8Td';
                    donate_form += 'ihPTufG5g+Ras6SUKO2VHvTIgde7JaL3g2+mmtdsSH5xEWzAXYqFJRza8qDg+LFIR6bjoIIDhzCCA4MwggLsoAMCAQICAQAwDQYJKoZIhvcNAQEFBQAwgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAP';
                    donate_form += 'BgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMB4XDTA0MDIxMzEwMTMxNVoXDTM1MDIxMzEwMTMxNVowgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxp';
                    donate_form += 'dmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBR07d/ETMS1ycjtkpkvjXZe9k+6CieLuLsPumsJ7QC1odNz3sJiCbs2wC0nLE0uLGaEtXynIgRqIddYCHx88pb5HTXv4SZeuv0Rqq4+axW9PLAAATU8w04qqjaSXgbGLP3NmohqM6bV9kZZwZLR/klDaQGo1u9uDb';
                    donate_form += '9lr4Yn+rBQIDAQABo4HuMIHrMB0GA1UdDgQWBBSWn3y7xm8XvVk/UtcKG+wQ1mSUazCBuwYDVR0jBIGzMIGwgBSWn3y7xm8XvVk/UtcKG+wQ1mSUa6GBlKSBkTCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0';
                    donate_form += 'czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb22CAQAwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCBXzpWmoBa5e9fo6ujionW1hUhPkOBakTr3YCDjbYfvJEiv/2P+IobhOGJr85+XHhN0v4gUkEDI8r2/rNk1m0GA8HKddvTjyGw/XqXa+LSTlDYkqI8OwR8GEYj4efEtcRpRYBx';
                    donate_form += 'V8KxAW93YDWzFGvruKnnLbDAF6VR5w/cCMn5hzGCAZowggGWAgEBMIGUMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNv';
                    donate_form += 'bQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTEwOTI0MDUyNzA2WjAjBgkqhkiG9w0BCQQxFgQUjmSKrIQUhYjrgS+sKnxR7e/xvzQwDQYJKoZIhvcNAQEBBQAEgYA1N2mGTesKPf56Q5tbkymofC75Fn1PK35cy4kXNKuMfHIhe3nIca2DkwXuiZPvI36xtzd6zAZ22CRS';
                    donate_form += 'thT86ok0lxBV9SkenTN1gJcuUmtLCcYXifY8zz6ybLhHXR6ao6CH/+XfsCcejDRRcLgclKjy8ajqm6kGT5QV5LT4+DYOZw==-----END PKCS7-----"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The sa';
                    donate_form += 'fer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1"></form>'
                    var link = box_top +'<a style="color:red;right:10px;font-size:12px;text-decoration:underline;font-weight:bold" onclick="this.innerHTML=\'\';" href="http://userscripts.org/scripts/source/115928.user.js">Pioones ES translation: '+Version2+'. Install!</a><br />'+ '<div style="margin-top:8px">'+donate_form+'</div>'+box_bottom;
                    document.body.innerHTML = document.body.innerHTML +link; 
                    
                }
            }
            });    
        }        
        
        checkVersion();
                      
    })();  
     
} catch(e){
    //alert(e);
}