// Creado por Angelous para la Comunidad de AoG ( America OnLine Games )
// Uruguay
// OGame Uruguay By AoG

// ==UserScript== 
// @name          OGame Uruguay en Espaniol
// @namespace     http://americaonlinegames.info/forum/index.php
// @description   Traduce algunos terminos que estan en otros idiomas al Espaniol Uruguayo
// @include       http://www.ogameuruguay.com/*
// ==/UserScript== 


(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "Session closed.": "Chau Chau Adios", 
    "I hope to see you again very soon. RageOnline team.": "Tu Flota No Esta Segura, Regresa Pronto !!!", 
    "Username:": "Usuario:", 
    "Password": "Contrasenia", 
    "Register": "Registro", 
    "Forum": "Foro AoG", 
    "Players online": "Jugadores Conectados", 
    "Ogame_AOG": "Script Traductor 1.0 By Angelous", 
    "americaonlinegames": "AmericaOnLineGames", 
    "Navigation": "Navegacion", 
    "Overview": "Vision General", 
    "Imperium": "Imperio", 
    "New Officers": "Oficiales", 
    "Merchand": "Mercader", 
    "My Messages": "Mensajes", 
    "Message": "Mensajes", 
    "Score Board": "Records", 
    "Credits": "Creditos", 
    "Crystal": "Cristal", 
    "Deuterium": "Deuterio", 
    "Energy": "Energia", 
    "Planet": "Planeta", 
    "free": "Libre", 
    "Buildings": "Edificios", 
    "Research": "Investigacion", 
    "Shipyard": "Hangar", 
    "Defense": "Defensas", 
    "Fleet": "Flotas", 
    "Alliance": "Alianza", 
    "Resources": "Recursos", 
    "Galaxy": "Galaxia", 
    "Technology": "Tecnologias", 
    "Options": "Opciones", 
    "Buddylist": "Companieros", 
    "Notes": "Notas", 
    "Contacts": "Contacto", 
    "no ships": "Ninguna Nave", 
    "all ships": "Todas las Naves", 
    "Target": "Destino", 
    "Speed": "Velocidad", 
    "Distance": "Distancia", 
    "Duration": "Duracion", 
    "(one way)": "(solo de ida)", 
    "consumption": "a consumir", 
    "Cargo capacity": "Capacidad de Carga", 
    "My planets": "Mi Imperio Planetario", 
    "Transport": "Transportar", 
    "Deploy": "Desplegar", 
    "all resources": "Todos los Recursos", 
    "DF": "Escombros", 
    "Moon": "Luna", 
    "Harvest": "Recolectar", 
    "Mission": "Mision", 
    "Espionage": "Espiar", 
    "Attack": "Atacar", 
    "Capacity left": "Capacidad Restante", 
    "Logout": "Cerrar  ", 
    "Ship Type": "Naves", 
    "Available": "Disponible", 
    "Expeditions": "Expediciones", 
    "New mission": "Nueva Mision", 
    "select ships": "Seleccionar Naves", 
    "Temperature": "Temperatura", 
    "Call an merchand": "Tienes que seleccionar lo que TU quieres VENDER", 
    "Update Ranking": "Actualizar el Ranking", 
    "Final": "Final"}; 

regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in replacements) { 
        s = s.replace(regex[key], replacements[key]); 
    } 
    node.data = s; 
} 

})();