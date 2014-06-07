// ==UserScript==
// @name        stiddari.de (Version Española)
// @namespace   http://userscripts.org/users/513921
// @description Traduce el juego del alemán al español
// @include     http://test.de.stiddari.com*
// @include     http://ravengames.de*
// @include     http://www.ravengames.de*
// @version     1
// ==/UserScript==
//



(function() {

// HOME
if (location.pathname.search('index.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(spielername)\b/g, 'Nombre de usuario');
document.body.innerHTML = document.body.innerHTML.replace(/\b(passwort)\b/g, 'contraseña');
document.body.innerHTML = document.body.innerHTML.replace(/\b(anmelden)\b/g, 'registrar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(vergessen)\b/g, 'se te olvidó?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Willkommen bei)\b/g, 'Bienvenido a');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Was erwartet dich)\b/g, '¿Qué esperas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Platz für)\b/g, 'Espacio para');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unidades de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(defensive Jungs)\b/g, 'Unidades defensivas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungen)\b/g, 'Entrenamientos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(informationen)\b/g, 'Información');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jugadores');
document.body.innerHTML = document.body.innerHTML.replace(/\b(pranger)\b/g, 'Lista de Baneados');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grund)\b/g, 'Razón');
document.body.innerHTML = document.body.innerHTML.replace(/\b(gesperrt)\b/g, 'Baneado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bis)\b/g, 'Hasta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrieren)\b/g, 'Registro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Wenn Du bereits einen Account bei einem der Spiele unter)\b/g, 'Si ya tiene una cuenta en alguno de los siguientes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hast oder hattest, dann brauchst Du dir keinen neuen erstellen)\b/g, 'entonces no es necesario crear uno nueva');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auch kannst Du dich mit deinem globalen Account)\b/g, 'También puedes iniciar sesión en el foro, con los mismos datos de registro,');
document.body.innerHTML = document.body.innerHTML.replace(/\b(im Forum Register und brauchst dich dort nicht mehr Register)\b/g, 'sin necesidad de hacer ningún otro registro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dein Account ist global und in allen dieser Spiele zu erreichen)\b/g, 'Tu cuenta es global y te da acceso instantáneo a todos estos juegos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Globale Accountverwaltung)\b/g, 'Administración Global de Cuentas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Loginname)\b/g, 'Nombre de usuario');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Passwort)\b/g, 'contraseña');
document.body.innerHTML = document.body.innerHTML.replace(/\b(wiederholen)\b/g, 'Confirmar Contraseña');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hiermit akzeptiere ich die)\b/g, 'Acepto los términos y condiciones en');
document.body.innerHTML = document.body.innerHTML.replace(/\b(oder)\b/g, 'o');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(im)\b/g, 'en');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrierte)\b/g, 'registrados');
document.body.innerHTML = document.body.innerHTML.replace(/\b(spieler)\b/g, 'jugadores');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'días');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'día');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Planeten)\b/g, 'Planetas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(E-Mailadresse)\b/g, 'Email');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hier kannst du dir ein neues contraseña für deinen Account zuschicken lassen)\b/g, 'Aquí puedes enviar una nueva contraseña para tu cuenta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dieses gilt für die Spiel, Foren und für die Globale Spielerverwaltung)\b/g, 'Esto se aplica a los juegos, foros y para la Administración Global de Cuentas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Um die Passwörter in den Foren zu den Spielen zu ändern)\b/g, 'Para cambiar las contraseñas de los juegos y foros');
document.body.innerHTML = document.body.innerHTML.replace(/\b(logg dich bitte mit deinem contraseña in die Globale Spielerverwaltung ein)\b/g, 'por favor entre con su contraseña en la Administración Global de Cuentas');
}


// Menu
document.body.innerHTML = document.body.innerHTML.replace(/Übersicht/g, 'Visión general');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Räume im Ausbau)\b/g, 'Habitaciones en construcción');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Räume)\b/g, 'Habitaciones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Campo de entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektschutz)\b/g, 'Seguridad');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edificios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suche)\b/g, 'Buscar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielliste)\b/g, 'Lista de Granjas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kopfgeld)\b/g, 'Recompensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Technik)\b/g, 'Árbol tecnológico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzen)\b/g, 'Familias');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rohstoffe)\b/g, 'Recursos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsätze)\b/g, 'Misiones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadtkarte)\b/g, 'Mapa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachrichten)\b/g, 'Mensajes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Highscore)\b/g, 'Clasificación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Freunde)\b/g, 'Amigos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Statistiken)\b/g, 'Estadísticas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Regeln)\b/g, 'Reglas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einstellungen)\b/g, 'Opciones');
document.body.innerHTML = document.body.innerHTML.replace(/Bilder Upload/g, 'Subir Imagen');
document.body.innerHTML = document.body.innerHTML.replace(/\b(spenden)\b/g, 'Donar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Logout)\b/g, 'Salir');
document.body.innerHTML = document.body.innerHTML.replace(/Schläger/g, 'Matón');
document.body.innerHTML = document.body.innerHTML.replace(/Türsteher/g, 'Portero');
document.body.innerHTML = document.body.innerHTML.replace(/Messerstecher/g, 'Acuchillador');
document.body.innerHTML = document.body.innerHTML.replace(/Revolverheld/g, 'Pistolero');
document.body.innerHTML = document.body.innerHTML.replace(/Besetzungstruppe/g, 'Tropa de ocupación');
document.body.innerHTML = document.body.innerHTML.replace(/Spion/g, 'Espia');
document.body.innerHTML = document.body.innerHTML.replace(/Möbelpacker/g, 'Porteador');
document.body.innerHTML = document.body.innerHTML.replace(/CIA Agent/g, 'Agente de la C.I.A.');
document.body.innerHTML = document.body.innerHTML.replace(/FBI Agent/g, 'Agente del F.B.I.');
document.body.innerHTML = document.body.innerHTML.replace(/Scharfschütze/g, 'Francotirador');
document.body.innerHTML = document.body.innerHTML.replace(/Transporteur/g, 'Transportista');
document.body.innerHTML = document.body.innerHTML.replace(/Problemlöser/g, 'Experto táctico');
document.body.innerHTML = document.body.innerHTML.replace(/Profikiller/g, 'Asesino');
document.body.innerHTML = document.body.innerHTML.replace(/Bombenleger/g, 'Experto en demoliciones');
document.body.innerHTML = document.body.innerHTML.replace(/Söldner/g, 'Mercenario');
document.body.innerHTML = document.body.innerHTML.replace(/Attentäter/g, 'Scout');
document.body.innerHTML = document.body.innerHTML.replace(/Schwarzgeldarbeiter/g, 'Trabajador Ilegal');
document.body.innerHTML = document.body.innerHTML.replace(/Objektwache/g, 'Centinela');
document.body.innerHTML = document.body.innerHTML.replace(/Bodyguard/g, 'Guardaespaldas');
document.body.innerHTML = document.body.innerHTML.replace(/Guarde/g, 'Guardia de honor');
document.body.innerHTML = document.body.innerHTML.replace(/Polizist/g, 'Policía');

// Visión general
if (location.pathname.search('overview.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Truppen)\b/g, 'Tropas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(der Einheiten)\b/g, 'de las Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Ningúna Unidad');
document.body.innerHTML = document.body.innerHTML.replace(/ändern/g, 'Modificar');
document.body.innerHTML = document.body.innerHTML.replace(/Truppe/g, 'Tropas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Defensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Puntos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Número');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfstärke)\b/g, 'Poder de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Tropas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gesamtübersicht)\b/g, 'Visión global');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Details)\b/g, 'Detalles');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Recursos Transportieren)\b/g, 'Transporte');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tropas stationieren)\b/g, 'Estación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Oficina del Jefe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Armería');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Almacén de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Cervecería');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Taberna');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Almacén de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Depósito de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Almacén de Alcohol');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Caja fuerte');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Campo de entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Torreta de fuego automático');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Minas ocultas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Entrenamiento)\b/g, 'Entrenamiento químico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Entrenamiento psicológico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Entrenamiento de Guerrilla');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Fabricación de explosivos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Entrenamiento de Tiro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Combate de Armas a corta distancia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combate cuerpo a cuerpo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protección de Grupo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Seguridad');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Espionaje');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Administración de base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Extorsión');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Planificación de encargos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Planificación de rutas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rückkehr)\b/g, 'Volviendo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Camp gründen)\b/g, 'Ocupación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Atacar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Día');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Días');
}

// General Visión general
if (location.pathname.search('empire.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Oficina del Jefe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Armería');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Almacén de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Cervecería');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Taberna');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Almacén de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Depósito de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Almacén de Alcohol');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Caja fuerte');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Campo de entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Torreta de fuego automático');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Minas ocultas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Habitación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Puntos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Día');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Días');
}

// Details
if (location.pathname.search('kampftab.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfstärke)\b/g, 'Poder de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Número de');
}

// Unidad Visión general
if (location.pathname.search('unitview.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Recursos Transportieren)\b/g, 'Transporte');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten stationieren)\b/g, 'Estación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abbrechen)\b/g, 'Cancelar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Truppen)\b/g, 'Tropas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Startgebäude)\b/g, 'Origen');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielgebäude)\b/g, 'Destino');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Start)\b/g, 'Salida');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ankunft)\b/g, 'Llegada');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Restdauer)\b/g, 'Tiempo Restante');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Número');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftrag)\b/g, 'Mission');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rückkehr)\b/g, 'Volviendo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Camp gründen)\b/g, 'Ocupación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine)\b/g, 'Sin');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Atacar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Día');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Días');
}

// Habitaciones
if ((location.pathname.search('konst.php') != -1) || (location.pathname.search('stats.php') != -1)) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Oficina del Jefe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Armería');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Almacén de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Cervecería');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Taberna');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Almacén de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Depósito de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Almacén de Alcohol');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Caja fuerte');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Campo de entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Torreta de fuego automático');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Minas ocultas ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau)\b/g, 'Ampliación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Nivel');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abbrechen)\b/g, 'cancelar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Habitaciones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Duración');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Día');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Días');
}

// Campo de entrenamiento
if ((location.pathname.search('off.php') != -1) || (location.pathname.search('stats.php') != -1)) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schläger)\b/g, 'Matón');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Türsteher)\b/g, 'Portero');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Messerstecher)\b/g, 'Acuchillador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Revolverheld)\b/g, 'Pistolero');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Besetzungstruppe)\b/g, 'Tropa de ocupación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spion)\b/g, 'Espia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Möbelpacker)\b/g, 'Porteador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(CIA Agent)\b/g, 'Agente de la C.I.A.');
document.body.innerHTML = document.body.innerHTML.replace(/\b(FBI Agent)\b/g, 'Agente del F.B.I.');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trasporteur)\b/g, 'Transportista');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Problemlöser)\b/g, 'Experto táctico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Scharfschütze)\b/g, 'Francotirador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Profikiller)\b/g, 'Asesino');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenleger)\b/g, 'Experto en demoliciones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Söldner)\b/g, 'Mercenario');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Attentäter)\b/g, 'Scout');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Produktion)\b/g, 'Production');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauschleife)\b/g, 'Cola de espera');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Sin ordenes de momento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Duración');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Ir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Día');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Días');
}

// Seguridad
if (location.pathname.search('deff.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schwarzgeldarbeiter)\b/g, 'Trabajador Ilegal');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektwache)\b/g, 'Centinela');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bodyguard)\b/g, 'Guardaespaldas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guarde)\b/g, 'Guardia de honor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Polizist)\b/g, 'Policía');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Defensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauschleife)\b/g, 'Cola de espera');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Sin ordenes de momento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Duración');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Ir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Día');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Días');
}

// Entrenamientos
if (location.pathname.search('forsch.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Entrenamiento)\b/g, 'Entrenamiento químico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Entrenamiento psicológico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Entrenamiento de Guerrilla');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Fabricación de explosivos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Entrenamiento de Tiro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Combate de Armas a corta distancia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combate cuerpo a cuerpo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protección de Grupo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Seguridad');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Espionaje');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Administración de base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Extorsión');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Planificación de encargos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Planificación de rutas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau)\b/g, 'Ampliación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Nivel');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abbrechen)\b/g, 'cancelar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Duración');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Entrenamiento Habitación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Día');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Días');
}

// Árbol tecnológico
if (location.pathname.search('techtree.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Defensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Produktion)\b/g, 'Production');
document.body.innerHTML = document.body.innerHTML.replace(/Chefbüro/g, 'Oficina del Jefe');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Armería');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Almacén de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Cervecería');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Taberna');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Almacén de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Depósito de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Almacén de Alcohol');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Caja fuerte');
document.body.innerHTML = document.body.innerHTML.replace(/Trainingslager/g, 'Campo de entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Torreta de fuego automático');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Minas ocultas');
document.body.innerHTML = document.body.innerHTML.replace(/Ehre/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/Chemische Entrenamiento/g, 'Entrenamiento químico');
document.body.innerHTML = document.body.innerHTML.replace(/Psychisches Training/g, 'Entrenamiento psicológico');
document.body.innerHTML = document.body.innerHTML.replace(/Guerillaausbildung/g, 'Entrenamiento de Guerrilla');
document.body.innerHTML = document.body.innerHTML.replace(/Bombenbau/g, 'Fabricación de explosivos');
document.body.innerHTML = document.body.innerHTML.replace(/Schusstraining/g, 'Entrenamiento de Tiro');
document.body.innerHTML = document.body.innerHTML.replace(/Kurzwaffenkampf/g, 'Combate de Armas a corta distancia');
document.body.innerHTML = document.body.innerHTML.replace(/Nahkampf/g, 'Combate cuerpo a cuerpo');
document.body.innerHTML = document.body.innerHTML.replace(/Gruppenschutz/g, 'Protección de Grupo');
document.body.innerHTML = document.body.innerHTML.replace(/Objektbewachung/g, 'Seguridad');
document.body.innerHTML = document.body.innerHTML.replace(/Informationsbeschaffung/g, 'Espionaje');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/Basisverwaltung/g, 'Administración de base');
document.body.innerHTML = document.body.innerHTML.replace(/Schutzgeldeintreibung/g, 'Extorsión');
document.body.innerHTML = document.body.innerHTML.replace(/Auftragsplanung/g, 'Planificación de encargos');
document.body.innerHTML = document.body.innerHTML.replace(/Routenplanung/g, 'Planificación de rutas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Habitaciones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Nivel');   
}

// Edificios
if (location.pathname.search('camps.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edificios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Habitaciones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Puntos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Restdauer)\b/g, 'Tiempo restante');
document.body.innerHTML = document.body.innerHTML.replace(/\b(auflösen)\b/g, 'Borrar');
document.body.innerHTML = document.body.innerHTML.replace(/Änderungen/g, 'Guardar'); 
document.body.innerHTML = document.body.innerHTML.replace(/\b(speichern)\b/g, 'alteraciones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nombre');
document.body.innerHTML = document.body.innerHTML.replace(/Chefbüro/g, 'Oficina del Jefe');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Armería');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Almacén de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Cervecería');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Taberna');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Almacén de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Depósito de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Almacén de Alcohol');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Caja fuerte');
document.body.innerHTML = document.body.innerHTML.replace(/Trainingslager/g, 'Campo de entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Torreta de fuego automático');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Minas ocultas ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Día');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Días');
}

// Buscar
if (location.pathname.search('suche.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suche)\b/g, 'Buscar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edificio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jugador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nombre')
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Puntos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suchen)\b/g, 'Buscar');
}

// Unidadinfo
if (location.pathname.search('info.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unidad');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nombre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Puntuación de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Valor de Defensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basis)\b/g, 'De base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktuell)\b/g, 'Actual');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Beschreibung)\b/g, 'Descripción');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Valor de Defensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Puntos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Voraussetzung)\b/g, 'Rré-requisitos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffsbonus)\b/g, 'Bonificación de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungsbonus)\b/g, 'Bonificación de Defensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verbrauch)\b/g, 'Salario');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geschwindigkeit)\b/g, 'Velocidad');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ladekapazität)\b/g, 'Capacidad de carga');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Nivel');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Entrenamiento)\b/g, 'Entrenamiento químico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Entrenamiento psicológico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Entrenamiento de Guerrilla');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Fabricación de explosivos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Entrenamiento de Tiro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Combate de Armas a corta distancia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combate cuerpo a cuerpo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protección de Grupo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Seguridad');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Espionaje');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Administración de base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Extorsión');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Planificación de encargos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Planificación de rutas');
}

// Map
if (location.pathname.search('map.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadt)\b/g, 'Ciudad');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadtteil)\b/g, 'Barrio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Infos)\b/g, 'Infos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edificios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jugador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Puntos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Actualizar');
}

// Statistiche
if (location.pathname.search('stats.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(in einem Camp)\b/g, 'en un edificio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Höchste)\b/g, 'Mayor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Habitaciones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Die meisten Einheiten)\b/g, 'Mayor cantidad de Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Número');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Entrenamiento)\b/g, 'Entrenamiento químico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Entrenamiento psicológico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Entrenamiento de Guerrilla');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Fabricación de explosivos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Entrenamiento de Tiro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Combate de Armas a corta distancia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combate cuerpo a cuerpo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protección de Grupo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Seguridad');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Espionaje');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Administración de base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Extorsión');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Planificación de encargos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Planificación de rutas');
}

// Target List - Lista farm
if (location.pathname.search('targetlist.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Ir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edificio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielname)\b/g, 'Nombre del alvo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jugador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Borrar');
}

// Recompensa
if (location.pathname.search('bounty*') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Recompensa vergeben)\b/g, 'Ofrecer Recompensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Top 50 Kopfgelder)\b/g, 'Recompensas - Top 50');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rohstoff)\b/g, 'Recursos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Pott)\b/g, 'Premio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Recompensa auszahlen)\b/g, 'Pago');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erarbeitetes Recompensa)\b/g, 'Recompensa gaña');
document.body.innerHTML = document.body.innerHTML.replace(/\b(zahl mich aus)\b/g, 'Recoger mi recompensa');
document.body.innerHTML = document.body.innerHTML.replace(/suchen/g, 'Buscar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Recompensa für)\b/g, 'Recompensa ofrecida por');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aktuell)\b/g, 'actual');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hinzugeben)\b/g, 'añadir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(maximal)\b/g, 'máximo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheitenpunkte)\b/g, 'Puntos de Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Recompensa aussetzen)\b/g, 'Añadir Recompensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Topf ausbezahlen)\b/g, 'Recoger mi  Recompensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nombre');
}

// Familia
if (location.pathname.search('ally.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nombre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomacia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglied)\b/g, 'Miembro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Miembros');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Nuevo Mensaje');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz verlassen)\b/g, 'Dejar la Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Descripción de la Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Beschreibung)\b/g, 'Ninguna descripción');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Es liegen keine Bewerbungen vor)\b/g, 'No hay nuevas Solicitudes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzeinstellungen)\b/g, 'Configuración de la Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Miembros verwalten)\b/g, 'Administrar Miembros');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'de');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Mensaje');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Familia auflösen)\b/g, 'Disolución de la Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Homepage)\b/g, 'Ninguna Homepage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Familia wirklich dissolution)\b/g, '¿De verdad que quieres disolver la Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(gründen)\b/g, 'fundación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(suchen)\b/g, 'buscar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbung)\b/g, 'Solicitud');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbungstext)\b/g, 'Texto de la Solicitud');
document.body.innerHTML = document.body.innerHTML.replace(/\b(zurück ziehen)\b/g, 'cancelar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(zurück gezogen)\b/g, 'cancelada');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Es liegen Bewerbungen vor)\b/g, 'Nuevas Solicitudes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jugador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(annehmen)\b/g, 'Aceptar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ablehnen)\b/g, 'Rechazar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Familia wirklich auflösen)\b/g, '¿Estás seguro que deseas disolver la Familia');
}

// Familia Foundation
if (location.pathname.search('ally_new.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz gründen)\b/g, 'Fundación de una Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz-Tag)\b/g, 'Tag de la Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz-Name)\b/g, 'Nombre de la Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zeichen)\b/g, 'caracteres');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gründen)\b/g, 'Crear');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Die Allianz wurde erfolgreich gegründet)\b/g, 'La Familia ha sido creada con éxito');
}

// Familia Miembros
if (location.pathname.search('ally_member.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Miembros');
document.body.innerHTML = document.body.innerHTML.replace(/\b(rauswerfen)\b/g, 'Expulsión');
}

// Familia settings
if (location.pathname.search('ally_config.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzeinstellungen)\b/g, 'Configuración de la Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbild)\b/g, 'Logotipo de le Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Descripción de la Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Actualizar');
}

// Familia Diplomacy
if (location.pathname.search('ally_diplo.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomacia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bestätigung)\b/g, 'Confirmación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bündnis)\b/g, 'Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzbündnis)\b/g, 'Alianza Defensiva');
document.body.innerHTML = document.body.innerHTML.replace(/Nicht/g, 'Pacto ');
document.body.innerHTML = document.body.innerHTML.replace(/angriffs/g, 'de');
document.body.innerHTML = document.body.innerHTML.replace(/packt/g, ' No Agresión');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geheimbund)\b/g, 'Sociedad Secreta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Krieg)\b/g, 'Guerra');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Begründung)\b/g, 'Razón');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(unbestätigt)\b/g, 'inconfirmado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bestätigt)\b/g, 'confirmado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kündigen)\b/g, 'cancelar');

}

// Familia View
if (location.pathname.search('ally_view.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nombre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomacia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bestätigung)\b/g, 'Confirmación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bündnis)\b/g, 'Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzbündnis)\b/g, 'Alianza Defensiva');
document.body.innerHTML = document.body.innerHTML.replace(/Nicht/g, 'Pacto ');
document.body.innerHTML = document.body.innerHTML.replace(/angriffs/g, 'de');
document.body.innerHTML = document.body.innerHTML.replace(/packt/g, ' No Agresión');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geheimbund)\b/g, 'Sociedad Secreta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Krieg)\b/g, 'Guerra');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Begründung)\b/g, 'Razón');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(unbestätigt)\b/g, 'inconfirmado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bestätigt)\b/g, 'confirmado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kündigen)\b/g, 'cancelar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Miembros');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Descripción de la Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Homepage)\b/g, 'Ninguna Homepage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bewerben)\b/g, 'Enviar Solicitud');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglied)\b/g, 'Miembro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Beschreibung)\b/g, 'Ninguna descripción');
}

// Logout
if (location.pathname.search('logout.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/Zur Startseite wechseln/g, 'Ir a la página principal');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sie sind jetzt erfolgreich augeloggt)\b/g, 'Te has desconectado con éxito');
}

// Ally join
if (location.pathname.search('ally_join.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbung)\b/g, 'Solicitud');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbungstext)\b/g, 'Texto de la Solicitud');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bewerben)\b/g, 'Enviar Solicitud');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast dich Erfolgreich bei der Allianz beworben)\b/g, 'Tu solicitud ha sido enviado con éxito');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Jetzt müssen sie nur noch zustimmen)\b/g, 'Ahora sólo tienes que esperar a que sea aceptada');
}

// Recursos
if (location.pathname.search('res.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grundeinkommen)\b/g, 'Ingreso de Base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Lagerkapazität)\b/g, 'Capacidad de almacenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(davon sicher untergebracht)\b/g, 'Almacenados de forma segura');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Armería');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Almacén de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Cervecería');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Taberna');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stunde)\b/g, '(Hora)');
}

// Misiones
if (location.pathname.search('unit.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geschwindigkeit)\b/g, 'Velocidad');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neuen Einsatz planen)\b/g, 'Planificación de nueva misión');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielcamp)\b/g, 'Edificio Alvo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftrag)\b/g, 'Misión');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Atacar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten stationieren)\b/g, 'Estacionar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Recursos Transportieren)\b/g, 'Transportar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Edificios besetzen)\b/g, 'Ocupar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nur bei Transport und Stationieren)\b/g, 'Sólo para el Transporte y la Estación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Actualizar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Entfernung)\b/g, 'Distancia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzkosten)\b/g, 'Salario');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ladekapazität)\b/g, 'Capacidad de carga');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzzeit)\b/g, 'Duración de la misión');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ankunft)\b/g, 'Llegada');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzdaten)\b/g, 'Resumen de la Misión');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Sin Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Número');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edificio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Puntuación de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Valor de Defensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jugador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Deine Unidades machen sich auf den Weg)\b/g, 'Tus unidades ya siguen su camino');
}

// Mensajes
if (location.pathname.search('msg.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauabschluss)\b/g, 'Finalización de Construcciones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spielernachrichten)\b/g, 'Mensajes de Jugadores');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfberichte)\b/g, 'Informes de Batalla');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Escribir Mensaje');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzberichte)\b/g, 'Informes de uso');
}

// Mensajes box
if (location.pathname.search('msg_read.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/Chefbüro/g, 'Oficina del Jefe');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Armería');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Almacén de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Cervecería');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Taberna');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Almacén de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Depósito de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Almacén de Alcohol');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Caja fuerte');
document.body.innerHTML = document.body.innerHTML.replace(/Trainingslager/g, 'Campo de entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Torreta de fuego automático');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Minas ocultas ');
document.body.innerHTML = document.body.innerHTML.replace(/Ehre/g, 'Honor');
document.body.innerHTML = document.body.innerHTML.replace(/Chemische Entrenamiento/g, 'Entrenamiento químico');
document.body.innerHTML = document.body.innerHTML.replace(/Psychisches Training/g, 'Entrenamiento psicológico');
document.body.innerHTML = document.body.innerHTML.replace(/Guerillaausbildung/g, 'Entrenamiento de Guerrilla');
document.body.innerHTML = document.body.innerHTML.replace(/Bombenbau/g, 'Fabricación de explosivos');
document.body.innerHTML = document.body.innerHTML.replace(/Schusstraining/g, 'Entrenamiento de Tiro');
document.body.innerHTML = document.body.innerHTML.replace(/Kurzwaffenkampf/g, 'Combate de Armas a corta distancia');
document.body.innerHTML = document.body.innerHTML.replace(/Nahkampf/g, 'Combate cuerpo a cuerpo');
document.body.innerHTML = document.body.innerHTML.replace(/Gruppenschutz/g, 'Protección de Grupo');
document.body.innerHTML = document.body.innerHTML.replace(/Objektbewachung/g, 'Seguridad');
document.body.innerHTML = document.body.innerHTML.replace(/Informationsbeschaffung/g, 'Espionaje');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/Basisverwaltung/g, 'Administración de base');
document.body.innerHTML = document.body.innerHTML.replace(/Schutzgeldeintreibung/g, 'Extorsión');
document.body.innerHTML = document.body.innerHTML.replace(/Auftragsplanung/g, 'Planificación de encargos');
document.body.innerHTML = document.body.innerHTML.replace(/Routenplanung/g, 'Planificación de rutas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Oficina del Jefe');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Armería');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Almacén de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Cervecería');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Taberna');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Almacén de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Depósito de Munición');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Almacén de Alcohol');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Caja fuerte');
document.body.innerHTML = document.body.innerHTML.replace(/Trainingslager/g, 'Campo de entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Torreta de fuego automático');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Minas ocultas ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau)\b/g, '');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erfolgreich)\b/g, 'terminado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abgeschlossen)\b/g, 'con éxito');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erforscht)\b/g, 'con éxito');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ausgebildet)\b/g, 'con éxito');
document.body.innerHTML = document.body.innerHTML.replace(/\b(mal)\b/g, 'unidades de');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Betreff)\b/g, 'Asunto');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'De');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Datum)\b/g, 'Fecha');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Markierte)\b/g, 'Borrar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Seleccionadas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kein)\b/g, 'No');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfbericht)\b/g, 'Informe de Batalla');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfrunde)\b/g, 'Ronda de batalla');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Tropas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Cantidad');
document.body.innerHTML = document.body.innerHTML.replace(/\b(vernichtet)\b/g, 'Destruido');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Puntuación de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Valor de Defensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erbeutete Recursos)\b/g, 'Recursos Robados');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Siegchance)\b/g, 'Oportunidad de victoria');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Espiaagechance)\b/g, 'Oportunidad de espionaje');
document.body.innerHTML = document.body.innerHTML.replace(/\b(im Forum speichern)\b/g, 'Guardar (en el foro)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neu)\b/g, 'Nuevo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(AW)\b/g, 'Citar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(in)\b/g, 'en');
}

// Mensajes Writing
if (location.pathname.search('msg_write.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ursprüngliche Nachricht)\b/g, 'Mensaje Original');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Von)\b/g, 'De');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gesendet)\b/g, 'Recibido en');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Datum)\b/g, 'Fecha');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Betreff)\b/g, 'Asunto');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Empfänger)\b/g, 'Para');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Mensaje');
document.body.innerHTML = document.body.innerHTML.replace(/\b(schreiben)\b/g, 'Editor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erfolgreich)\b/g, 'con éxito');
document.body.innerHTML = document.body.innerHTML.replace(/eingetragen/g, 'enviado');
}

// Highscore
if (location.pathname.search('score.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nombre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Puntos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Entrenamiento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edificios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzen)\b/g, 'Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Titel)\b/g, 'Título');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler 7 Tage inaktiv)\b/g, 'Jugador inactivo 7 días');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler 14 Tage inaktiv)\b/g, 'Jugador inactivo 14 días');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler im Urlaub)\b/g, 'Jugador en modo vacaciones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler gesperrt)\b/g, 'Jugador banido');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jugador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Número');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Familia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Miembros');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Durchschnitt)\b/g, 'Media');
}

// Amigos
if (location.pathname.search('buddy.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler hinzufügen)\b/g, 'Añadir Jugador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anfragen von Spielern)\b/g, 'Solicitudes de otros Jugadores');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Borrar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Als Online werden alle Amigos angezeigt)\b/g, 'Se muestran los amigos conectados');
document.body.innerHTML = document.body.innerHTML.replace(/\b(welche in den letzten 15 Minuten)\b/g, 'que han llevado a cabo al menos una acción ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(mindestens eine Aktion durchgeführt hatten)\b/g, 'en los últimos 15 minutos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast noch keine bestätigten Amigos)\b/g, 'Actualmente no tienes Amigos confirmados');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Als Freund einladen)\b/g, 'Invitar como amigo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(unbestätigt)\b/g, 'inconfirmado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bestätigen)\b/g, 'aceptar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ablehnen)\b/g, 'rechazar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nombre');
}

// Chat
if (location.pathname.search('chat.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Flüstern)\b/g, 'Susurrar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Mensaje');
document.body.innerHTML = document.body.innerHTML.replace(/Sagen/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Unsichtbare)\b/g, 'Invisible');
document.body.innerHTML = document.body.innerHTML.replace(/\b(online Anzeige)\b/g, 'Anuncio Online');
document.body.innerHTML = document.body.innerHTML.replace(/\b(in den Chat schreiben)\b/g, '(escribirlo en el chat)');
}

// OPTIONS (Settings)
if (location.pathname.search('config.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du kannst erst wieder in)\b/g, 'Tienes que esperar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(deinen Namen ändern)\b/g, 'para que puedas cambiar tu Nickname de ​​nuevo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Guardar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(weitere)\b/g, ' ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allgemeine Opciones)\b/g, 'Opciones Generales');
document.body.innerHTML = document.body.innerHTML.replace(/allgemeine/g, 'General');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Sharing melden)\b/g, 'Reportar IP-sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spielername)\b/g, 'Nickname');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Accountsicherheit)\b/g, ': Seguridad de la Cuenta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Bindung)\b/g, 'Bloquear IP');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Cookie-Bindung)\b/g, 'Bloquear Cookies');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Autologout)\b/g, 'Salir automáticamente');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aus)\b/g, 'Off');
document.body.innerHTML = document.body.innerHTML.replace(/\b(an)\b/g, 'On');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Mensajes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Angriff)\b/g, 'de los Ataques');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Stationieren)\b/g, 'de las Estaciones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Transport)\b/g, 'de los Transportes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Campgründung)\b/g, 'de las Ocupaciones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sichtbar in Useronlineliste)\b/g, 'Visible en la lista de Usuarios-Online');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sortierung der Camps)\b/g, 'Orden de los Edificios ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sortiermethode)\b/g, 'Ordenar por');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gründung)\b/g, 'Ocupación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Koordinaten)\b/g, 'Coordenadas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aufsteigend)\b/g, 'Orden Ascendente ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Absteigend)\b/g, 'Orden Descendente');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Urlaubsmodus)\b/g, 'Modo de vacaciones');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aktivieren)\b/g, '- Activación');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Empfohlen)\b/g, 'Recomendado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alle Opciones auf)\b/g, 'Elegir la opción');
document.body.innerHTML = document.body.innerHTML.replace(/\b(lassen)\b/g, 'para todos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(In der Zeit in dem du im Urlaub bist kannst du nicht angegriffen werden und es können auch keine anderen Misiones zu dir gestartet werden)\b/g, 'Durante el tiempo que estás de vacaciones, no puedes ser atacado y no puede ser iniciada ninguna otra misión por ti');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du produzierst in dieser Zeit keine Recursos und die Bauarbeiten On Einheiten, Gebäuden und Forschungen werden ebenfalls eingestellt)\b/g, 'Durante este tiempo, tu cuenta no produce recursos y la expansion de edificios,  el dessarollo de los entreinamientos  y la constucion de tropas no es posible');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Den Modo de vacaciones kannst du erst)\b/g, 'Sólo puedes desactivar el modo de vacaciones de nuevo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(nach dem - Activación wieder beenden)\b/g, 'después de que termine');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Día');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Días');
}

// OPTIONS (IP-Sharing)
if (location.pathname.search('config_sharing.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(weitere)\b/g, ' ');
document.body.innerHTML = document.body.innerHTML.replace(/allgemeine/g, 'General');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Sharing melden)\b/g, 'Reportar IP-sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neues Sharing hinzufügen)\b/g, 'Añadir Nuevo IP-Sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktuelle Sharings)\b/g, 'IP-Sharings Actuales');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ende)\b/g, 'Terminando en');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Begründung)\b/g, 'Razón');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Von)\b/g, 'Del');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mit)\b/g, 'Al');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erfolgreich gemeldet)\b/g, 'reportado con éxito');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Januar)\b/g, 'Enero');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Februar)\b/g, 'Febrero');
document.body.innerHTML = document.body.innerHTML.replace(/\b(März)\b/g, 'Marzo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(April)\b/g, 'Abril');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mai)\b/g, 'Mayo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Juni)\b/g, 'Junio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Juli)\b/g, 'Julio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(August)\b/g, 'Agosto');
document.body.innerHTML = document.body.innerHTML.replace(/\b(September)\b/g, 'Septiembre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Oktober)\b/g, 'Octubre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(November)\b/g, 'Noviembre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dezember)\b/g, 'Diciembre');
}

// Immages
if (location.pathname.search('img.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Image Upload)\b/g, 'Subir Imagen');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'de');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bildern)\b/g, 'Imágenes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hochladen)\b/g, 'subir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hochgeladene Bilder)\b/g, 'Imágenes Cargadas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'borrar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Das Bild was du subir)\b/g, 'Las imágenes a subir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(möchtest darf Maximal)\b/g, 'no pueden superar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Pixel)\b/g, 'Pixels');
document.body.innerHTML = document.body.innerHTML.replace(/\b(groß sein)\b/g, '(dimensiones máximas)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ein Maximale Dateigröße)\b/g, 'y el tamaño máximo del archivo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(haben und im Format)\b/g, '(formatos permitidos:');
document.body.innerHTML = document.body.innerHTML.replace(/\b(oder)\b/g, 'de');
document.body.innerHTML = document.body.innerHTML.replace(/\b( vorliegen)\b/g, ')');

}

// Giocatore - info click su player
if (location.pathname.search('player.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edificios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jugador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Puntos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Camps)\b/g, 'de Edificios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Forschung)\b/g, 'de Entrenamientos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'de Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aussetzen)\b/g, '(Mostrar)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Enviar mensaje');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nombre');
}

// Menu other resources
document.body.innerHTML = document.body.innerHTML.replace(/\b(Serverzeit)\b/g, 'Server (hora)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffen)\b/g, 'Armas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munition)\b/g, 'Munición');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohol)\b/g, 'Alcohol');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dollar)\b/g, 'Dólares');

// Others and Eventual
document.body.innerHTML = document.body.innerHTML.replace(/Fehler!/g, 'Error!');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Seitenaufbau in)\b/g, 'Página cargada en');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sekunden)\b/g, 'segundos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast hier kein)\b/g, 'Tu no tienes:');
document.body.innerHTML = document.body.innerHTML.replace(/Erfolgreich!/g, '¡Está hecho!');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Deine Unidada machen sich auf den Weg)\b/g, 'Tus Unidades ya siguen su camino');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrieren)\b/g, 'Registrar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(passwort vergessen)\b/g, '¿Olvidó su contraseña?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Globale Accountverwaltung)\b/g, 'Administración Global de Cuentas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jugadores');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registriert)\b/g, 'registrados');
document.body.innerHTML = document.body.innerHTML.replace(/\b(spielername)\b/g, 'Nombre de usuario');
document.body.innerHTML = document.body.innerHTML.replace(/\b(passwort)\b/g, 'Contraseña');
document.body.innerHTML = document.body.innerHTML.replace(/\b(anmelden)\b/g, 'Registrar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Password vergessen)\b/g, '¿Olvidó su contraseña?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Willkommen bei)\b/g, 'Bienvenido a');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Was erwartet dich)\b/g, '¿Qué esperas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Platz für)\b/g, 'Espacio para');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unidades de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(defensive Jungs)\b/g, 'Unidades defensivas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungen)\b/g, 'Entrenamientos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(informationen)\b/g, 'Información');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jugadores');
document.body.innerHTML = document.body.innerHTML.replace(/\b(pranger)\b/g, 'Lista de Baneados');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grund)\b/g, 'Razón');
document.body.innerHTML = document.body.innerHTML.replace(/\b(gesperrt)\b/g, 'Baneado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bis)\b/g, 'Hasta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrieren)\b/g, 'Registro');
document.body.innerHTML = document.body.innerHTML.replace(/ändern/g, 'Cambiar')
document.body.innerHTML = document.body.innerHTML.replace(/\b(Accountdaten)\b/g, 'Datos de la Cuenta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(contraseña Cambiar)\b/g, 'Cambiar contraseña');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bewerbung)\b/g, 'Solicitudes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(einstellungen)\b/g, 'configuración');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktuelles)\b/g, 'Actual');
document.body.innerHTML = document.body.innerHTML.replace(/\b(neues)\b/g, 'Nueva contraseña');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast dich erfolgreich ausgeloggt)\b/g, 'Te has desconectado con éxito');
document.body.innerHTML = document.body.innerHTML.replace(/\b(weiter)\b/g, 'continuar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Wrong password)\b/g, 'Contraseña incorrecta!');

})();
