// ==UserScript==
// @name           Catalanizator - Last.FM en català
// @namespace      http://www.catmidia.cat
// @description    Tradueix last.fm de l'espanyol al català en les seves funcions principals,basat en la seqüència :  profil word changes on facebook.Fet per animarval.Portat a tu per http://www.catmidia.cat  V:26042009
// @include        *.lastfm.es*
// ==/UserScript==


(function () {

  var replacements, regex, key, textnodes, node, s;

// you can customize the script below by changing the letter "a" to a lowercase version of the word
// and the letter "B" to the uppercase version of the word. Currently, in this version you
// can only change "a" and B to a word that turns plural by just adding an "s"
// Remember: KEEP THE QUOTES when changing "a" and "B"

replacements = {

// PER A LAST.FM
	// capçalera
	"Español": "Català (pendent el canviar la bandera)",
	"Radio": "Ràdio",
	"Eventos": "Esdeveniments",
	"Listas": "Llistes",
	"Tag": "Etiqueta",
	"Usuario": "Usuari",
	"Grupo": "Grup",
	"Buscar": "Cercar",
	"Ayuda": "Ajuda",
	"Registrarse": "Registrar-se",
// barra lateral esquerra
"Colección": "Col·lecció",
"Usuario": "Usuari",
"Listas": "Llistes",
"Amigos": "Amics",
"Vecinos": "Veïns",
"Etiquetas": "Etiquetes",
	// part central
	"hombre": "home",
	"mujer": "dona",
	"Visto por última vez": "Vist per última vegada",
	"pasado": "passat",
	"pasada": "passada",
	"desde": "des de",
	"por la mañana": "pel matí",
	"por la tarde": "per la tarda",
	"temas favoritos": "temes favorits",
	"mensajes": "missatges",
	"lista de temas": "llistat de temes",
	"notas": "notes",
	"Agregar a amigos": "Afegir a amics",
	"notas": "notes",
	"mensaje": "missatge",
	"Dejar": "Deixar",
	"Tu compatibilidad musical con": "La teva compatibilitat amb",
	"Desconocida": "Desconeguda",
	"Muy Alta": "Molt Alta",
	"Compara tu vena musical": "Compara els teus gustos musicals",
	"Temas escuchados recientemente": "Temes escoltats recentment",
	"Ver más": "Veure més",
	"Hace": "Fa",
	"hace": "fa",
	"horas": "hores",
	"minutos": "minuts",
	"segundos": "segons",
	"Los últimos": "Els últims",
	"días": "dies",
	"meses": "mesos",
	"meses": "mesos",
	"ver más": "veure més",
	"artistas": "artistes",
	"Escuchar": "Escoltar",
	"Mostrando": "Mostrant",
	"Todo": "Tot",
	"Temas favoritos": "Temes favorits",
	"Último tema marcado como favorito": "Últim tema marcat com a favorit",
	"Artistas más escuchados": "Artistes més escoltats",
	"Últimos": "Últims",
	"Días": "Dies",
	"Temas más escuchados": "Temes més escoltats",
	"Notas": "Notes",
	"comentario": "comentari",
	"(es gratis)": " (és gratuït)",
	"escribió": "va escriure",
	"Ver perfil": "Veure Perfil",
	"Responder": "Respondre",
	"Lunes": "Dilluns",
	"Martes": "Dimarts",
	"Miércoles": "Dimecres",
	"Jueves": "Dijous",
	"Viernes": "Divendres",
	"Sábado": "Dissabte",
	"Domingo": "Diumenge",
	"por": "per",
	"Enero": "Gener",
	"Febrero": "Febrer",
	"Marzo": "Març",
	"Mayo": "Maig",
	"Junio": "Juny",
	"Julio": "Julio",
	"Agosto": "Agost",
	"Septiembre": "Setembre",
	"Noviembre": "Novembre",
	"Diciembre": "Desembre",
	"Ver Todas": "Veure Totes",
	"Artistas": "Artistes",
	"Discográficas": "Discogràfiques",
	"Ver todas": "Veure totes", 
// barra lateral dreta
"Conóceme": "Coneixe'm",
"Actividad reciente": "Activitat recent",
"Escuchando ahora": "Escoltant ara",
"Agregar un comentario": "Afegir un comentari",
"semana": "setmana",
"miembros": "membres",
"Agregar": "Afegir",
"se unió al grupo": "s'ha unit al grup",
"dejó una nota para": "ha deixat una nota a",
"semana pasada": "setmana passada",
	// peu de pàgina
	"Conócenos": "Coneixe'ns",
	"Contacto": "Contacte",
	"Quiénes somos": "Qui som",
	"Equipo": "Equip",
	"Empleos": "Feines/Ocupacions",
	"Kit de prensa": "Kit de premsa",
	"Publicidad": "Publicitat",
	//
	"Obtén ayuda": "Obtingues ajuda",
	"P+F": "PMF",
	"Soperte del sitio web": "Suport del lloc web",
	"Soperte del software": "Suport del programari",
	"Soperte del iPhone": "Suport de l'iPhone",
	//
	"Únete": "Uneix-te",
	"gente": "gent",
	"grupos": "grups",
	"Foros": "Fòrums",
	"Directrices de la comunidad": "Directrius de la comunitat",
	"Moderadores": "Moderadors",
	"Concursos y promociones": "Concursos i promocions",
	//
	"Ve más allá": "Vés més enllà",
	"Software de Last.fm": "Programari de Last.fm",
	"Last.fm en tu iPod": "Last.fm al teu iPod",
	"Last.fm en tu iPhone": "Last.fm al teu iPhone",
	"Más aplicaciones": "Més aplicacions",
	"Temas gratuitos": "Temes gratuïts",
	"Hardware": "Maquinari",
	"Diseños de listas": "Disenys de llistes",
	"Suscripción": "Subscripció",
	//
	"Más sitios de Last.fm:": "Més llocs de Last.fm",
	"Actualización": "Actualització",
	"enero": "gener",
	"febrero": "febrer",
	"marzo": "març",
	"mayo": "maig",
	"junio": "juny",
	"julio": "julio",
	"agosto": "agost",
	"septiembre": "setembre",
	"noviembre": "novembre",
	"diciembre": "desembre",
//// pàgina principal (no és gaire "estable", queden algunes coses desquadrades)
"Last.fm te recomienda música que va con lo que escuchas": "Last.fm et recomana música que va amb el que escoltes",
"¿Qué música te gusta?": "Quina música escoltes?",
"Pon": "Posa",
"Por qué no pruebas": "Perquè no proves",
"A quienes escuchan": "A qui escolten",
"También les suele gustar": "També els sol agradar",
"Lista de conciertos en tu zona": "Llista de concerts a la teva zona",
"asistentes": "assistents",
"Con la música que escuchan miles de personas, creamos la lista de temas perfecta para ti.": "Amb la música que escolten milers de persones, creem la llista perfecta de temes per a tu",
"Escuchar": "Escoltar",
"Para empezar, escribe el nombre de un artista": "Per començar, escriu el nom d'un artista",
"Emisoras destacadas": "Emisores destacades",
"Populares hoy en Last.fm": "Populars avui a Last.fm",
"populares": "populars",
"El maigr catálogo musical online": "El més gran catàleg musical online",
"dan que hablar": "que despuntaran",
"Es probable que tus oyentes ya hayan creado una página para ti. Uneix-te a ellos, carga tu música y gana royalties cada vez que alguien la escuche. Además, puesto que Last.fm recomienda nueva música a los usuarios, tus temas llegarán a quienes de verdad sabrán apreciarla. Tot esto gratis.": "És probable que els teus oients ja hagin creat una pàgina per a tu. Uneixe-te a ells, carrega la teva música i guanya royalties cada vefada que algú l'escolti. A més, ja que Last.fm recomana nova música als usuaris, els teus temes arribaran a qui de veritat sabrà apreciar-la. Tot és gratuït.",
"oyentes": "oients",
	// PER A LAST.FM
//FRASES FETES
"Any Time, Any Place, Last.fm.": "Qualsevol Moment, Qualsevol Lloc, Last.fm.",
"Come Fly The Friendly Last.fm.": "Ve Volant Amistosament Last.fm",
"Say It With Last.fm.": "Digues-ho amb Last.fm",
"The Good Last.fm Kids Go For.": "Els bons nois de Last.fm per tu.",
"Out Of The Strong Came Forth Last.fm.": "Fora de la Força Sorgí Last.fm.",
// "...": "Last.fm gros, llarg i fort.", (no trobo la frase original en anglès)
"It's How Last.fm Is Done.": "Així és com Last.fm està fet",
"Keep That Last.fm Complexion.": "Manté Aquesta Complexitat de Last.fm",
  };
regex = {};
for ( key in replacements ) {
  regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate( "//text()" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
for ( var i=0 ; i<textnodes.snapshotLength ; i++ ) {
  node = textnodes.snapshotItem(i);
  s = node.data;
  for ( key in replacements ) {
    s = s.replace( regex[key] , replacements[key] );
  }
  node.data = s;
}

})();