/*
 FilmAffinity++
 Version 3.2.3 - benjani  benjani86 at gmail.com
 Basado en una versión anterior de psychomaster zico10 at gmail.com, 
 David Buxó Alvarez davidbuxo at gmail.com,
 Javier Arias http://javierarias.wordpress.com/scripts/filmaffinityplus/
 @todo:
 - Aplicar limites a todas las paginas de listados, comprobar limite real de FA
 - Nota media en busquedas por director
 - Cambios en la lista de TOP
 - Unificar los menus
 - Ordenar listas
 @no todo (cosas que solo podrian hacer en el servidor)
 - Afinidad de amigos
 - Grafico de usuarios
 Changelog
* 3.2.4, 7 de Septiembre 2013
 + Añadidas notas del usuario en búsqueda avanzada, topics y votos de otros usuarios
 + Arreglado el problema en FA con las notas, y con los amigos
 + Acrtualizado el icono de argenteam, y revisada su página de búsqueda, así como la de clan-sudamerica
 
* 3.2.3, 18 de Agosto 2013
 + Arreglado el script tras el cambio de estilo visual de FA
 + Mejorado notas de otras páginas (IMDB y Rottentomatoes) y añadida MyAnimeList
 + Mejorado el aspeto de votos en busquedas
 + Añadido votos por continentes en estadísticas de otros
 + Añadida afinidad entre 2 usuarios en estadísticas
 
* 3.2.2, 30 de Diciembre 2012
 + Arreglado obtener Id de usuario
 + Añadida listas favoritas IMDB
 + Añadidas notas de IMDB, Rotten y Abandomoviez en fichas de películas (no funcionan al 100%)
 
* 3.2.1, 27 de Junio
 + Opción de abrir votaciones/críticas/listas en una nueva pestaña
 + Opción de poner el retardo manual
 + Añadidos Comores, Lesotho, Liberia, Myanmar a los rankings
 + Arreglado enlace externo IMDB
 
* 3.2.0, 23 de Junio 2012
 + Arreglado cambios en nº de votos/criticas/listas
 + Rediseñado el aspecto de la tabla de amigos
 + Actualizados Premios II
* 3.1.0, 11 de Febrero 2012
 + Añadida clasificaciones por países
* 3.0.1, 30 de Enero 2012
 + Arreglado añadir contactos adicionales sin críticas
 + Arreglado y añadido poder añadir contactos desde estadisticas, recomendaciones, listas
* 3.0.0, 24 de Enero 2012
 + Arreglado mostrar banderas coproducciones
 + Arreglado búsquedas adicionales en búsquedas
 + Arreglado añadir rápido a listas
 + Nueva versión (con el nuevo diseño) de mis datos adicionales
 + Añadida listas en tabla de contactos adicionales
 + Posibilidad de ordenar contactos adicionales por nick/ubicacion/votos/criticas/listas
 + Búsqueda directa de guionistas, músicos, fotógrafos y años desde fichas
 + Agregados resumenes de votaciones en listas propias, y en listas de otros
 + Nueva versión de contactos adicionales (votos sacados desde página propia)
 + Añadido mostrar tus estadísticas al ver las de otro usuario
* 2.0.50, 9 de Diciembre 2011
 - Deshabilitado de momento votos de contactos en fichas
 + Arreglado Añadir contactos desde url
 + Arreglado añadir contacto cuando no hay ninguno	
* 2.0.49, 8 de Diciembre 2011
 + Arreglado votos de contactos adicionales en fichas de películas con crítica hecha
* 2.0.48, 8 de Diciembre 2011
 + Añadido votos de otros contactos en fichas de películas
 + Arreglado captura de nombre de otros contactos cuando contenian "de"
 + Añadido enlaces a votos y críticas en tabla de otros contactos	
* 2.0.47, 4 de Diciembre 2011
 + Arreglado mostrar listas favoritas en mis listas
 + Arreglado y mejorado añadir contactos adicionales desde página de votaciones
 + Arreglado captura nombre de listas
 + Arreglada tabla contactos adicionales
 + Arreglado menús en la barra izquierda
 + Añadido nuevo menú: Premios II
* 2.0.46, 24 de Noviembre 2011
 + Corregido momentaneamente orden nuestras listas
 + Arreglado ordenar películas en listas con flechas (valido hasta 999 elementos)
 + Arreglado ver votos del usuario en listas de otros
 + Corregido ver votos en busquedas
 + Aumentado numero de votos mostrados en busquedas (no tops fa) (antes solo 20, ahora para los 45)
 * 2.0.45, 21 de Noviembre 2011
 + Corregidos enlaces externos en fichas de películas
 + Arreglada página de amigos que salía en blanco
 + Corregido actualización de contactos adicionales
 + Banderas en Mis Datos
 * 2.0.44, 12 de Julio 2011
 + Corregidos enlaces en Listas favoritas
 * 2.0.43, 11 de Julio 2011
 + Corregidos enlaces en Mis listas
 * 2.0.42, 21 de Mayo 2009
 + Ordenar lista de Mis Listas
 + Corregido Bug en Capturar listas con listas sin nombre.
 * 2.0.41, 20 de Mayo
 * Agrupadas las fechas en historico de cambios de Almas Gemelas.
 * Listas Favoritas
 * Distribución de paises 'Continental simplificado' de Multifolio
 * Ordenar listas multipagina
 * 2.0.40, 9 de Mayo
 * han vuelto a cambiar a TITULO ORIGINAL.
 * 2.0.38, 7 de Mayo
 * Cambio en FA. TITULO ORIGINAL -> TÍTULO ORIGINAL
 * 2.0.37b, 4 de Mayo
 * Cambios en Mis Datos opcionales.
 * 2.0.37, 4 de Mayo
 * Agrupaciones de paises según criterios
 * Bloqueado movimiento en listas para listas con mas de una página
 * 2.0.36, 1 de Mayo
 + Votos por año en Mis Datos
 * 2.0.35, 29 de Abril
 + Corregido problema con paises sin continente
 * 2.0.34 , 29 de Abril
 + Votaciones y Media por continentes en Mis Datos
 * 2.0.33 , 28 de Abril
 + Corregido tamaño de las barras en Mis Datos
 * 2.0.32, 27 de Abril
 + Añadidos dos indices mas (rareza, documentales)
 + Modificada la apariencia de la tabla de votos en Mis Datos
 + Corregida la ordenación de contactos adicionales por nombre
 * 2.0.31, 26 de Abril
 + Ajustada presentación de indices
 + Ordenados contactos adicionales por nombre
 * 2.0.30, 25 de Abril
 + Corregido Bug en contactos si tienes 20 amigos
 + Añadidos índices 'multifolio' - http://filmaffinity.mforos.com/1360515/7122665-indices-indicadores-e-indicios/
 * 2.0.29, 23 de Abril
 + Contactos adicionales
 + Corregido error si no se borra la lista temporal.
 + Corregido error al votar en listas, no se actualizaba la nueva puntuación en el menu
 + Enlaces externos en listas
 + Buscar listas (Usando metodo multifolio) (preliminar, por ahora te manda a la pagina de google)
 * 2.0.28, 26 de Marzo
 * Corregido cambio de estilo de puntuaciones
 * 2.0.27, 25 de Marzo
 # Corregido error con worklist
 * 2.0.26, 25 de Marzo
 + Mis votos en los resultados de las busquedas
 + Posibilidad de votar desde las busquedas y las listas de los amigos
 + Posibilidad de votar desde mis listas 
 + En caso de que la busqueda no de resultado, nos redirige al buscador global
 * 2.0.25, 24 de Marzo
 + Mis votos en las listas de amigos
 + Soporte para varios usuarios de FilmAffinity en el mismo perfir de Firefox
 * 2.0.24, 21 de Marzo
 # Corregido Bug en coproducciones. (Ahora solo busca paises si aparece la palabra coproducción, quizas tengamos problemas)
 # Corregido Bug en Coproducciones -> Detectaba Alemania en 'Alemania del Oeste',etc..
 * 2.0.23, 21 de Marzo
 # Corregido error en nº de criticas modificadas en amigos
 # Corregido error: Se mostraba el botón de añadir a listas aun cuando no estabamos logeados.
 # Corregido error: No se mostraba el botón de añadir a listas al continuar con la busqueda.
 + Enlaces en la lista de amigos, pinchando en sus votaciones, vamos a su pagina de votaciones
 pinchando en sus criticas, vamos a su lista de criticas.
 * 2.0.22, 20 de Marzo
 * Soporte preliminar para opera en algunas opciones.
 necesita http://www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js
 de la página http://www.howtocreate.co.uk/operaStuff/userJavaScript.html
 * Banderas en la lista de amigos
 * Añadidos codigos para Lituania, Eslovaquia , Sri Lanka,
 Albania,Azerbaijan,Bangladesh,Benín,Emiratos Árabes,Etiopía,Guinea,Guinea Bissau,
 Haití,Jamaica,Jordania,Kenia,Kirguizstán,Laos,Letonia,Malta,
 Mauritania,Moldavia,Namibia,Tanzania,Trinidad y Tobago y Ucrania
 Andorra,Antigua y Barbuda,Arabia Saudí,Bahamas,Bahrein,Barbados,Belize,
 Botswana,Brunei,Burundi,Cabo Verde,Camerún,Chipre,Comores,Congo,Dominica,
 El Salvador,Eritrea,Fidji,Gabón,Gambia,Ghana,Granada,Guinea Ecuatorial,
 Guyana,Honduras,Kuwait,Lesotho,Liberia,Libia,Liechtenstein,Madagascar,
 Malawi,Maldivas,Marshall (Islas),Mauricio (Isla),Micronesia,Mónaco,Montenegro,
 Mozambique,Myanmar - Birmania,Níger,Omán,Palau,Papuasia Nueva Guinea,Qatar,
 Rep. Centroafricana,Ruanda,Samoa,San Marino,Santo Tomé y Príncipe,
 Seychelles,Sierra Leona,Siria,Somalia,Sudán,Surinam,Swazilandia,
 Tajikistan,Togo,Turkmenistán,Uganda,Uzbekistan,Vanuatú,Zambia,Zimbabwe
 * 2.0.21, 18 de Marzo de 2009
 + Añadidos/modificados codigos para RDA, RFA, URSS, Líbano y Serbia y Montenegro
 - Eliminado opción para Ocultar series de TV (por ahora da problemas)
 # Cambiadas las imagenes de Almas gemelas(problemas al copiar/pegar en foros)
 * 2.0.20
 + Banderas de los paises coproductores en la ficha de la pelicula (Sacado de la lista de Productora)
 + Muestra los cambios en el nº de criticas de los amigos
 * 2.0.19, 17 de Marzo de 2009
 # Corregido bug con icono de zoom de los posters al centrar
 # Modifica la etiqueta de cantidad de listas a las que pertenece la pelicula al añadir o borrar
 # Corregido bug en opción de centrado (no se mostraba en panel de configuración)
 # Corregido bug en enlaces externos con tilde (no se podian ocultar)
 # Corregido bug en enlaces externos en el panel derecho (se mostraban las categorias sin enlaces activos)
 * 2.0.18, 16 de Marzo de 2009
 + Añadido ordenación dentro de las listas
 # Corregido Bug en estadisticas de usuarios
 # Corregido Bug en puntuaciones. (en pagina de película, con una sola alma gemela)
 + Añadido ocultar Series de TV (preliminar)
 # Centrar pagina en ventana del navegador (mejor hacerlo via stylish)
 + Añadido opción para plegar menus
 * 2.0.17, 13 de Marzo de 2009
 # Corregido bug en página de amigos
 * 2.0.16, 12 de Marzo de 2009
 # Corregido bug al mostrar enlaces en la página de busqueda
 * 2.0.15, 12 de Marzo de 2009
 + Añadido comprobación de listas en el menu rapido de listas
 * 2.0.14, 11 de Marzo de 2009
 # Sustituidas las funciones de comprobación de sección.
 + Añadido QuickList a las paginas de busqueda y Top
 # Modificado el estilo del menu de listas rapidas.  
 * 2.0.12
 # Modificado DaleYa para que busque por el titulo original
 * 2.0.11
 + Añadido enlace a ForiegMMoviesDDL (petición de capacitivo)
 + Añadido enlace a DaleYa (petición de capacitivo)
 + Añadido soporte para opciones en los enlaces (DaleYa)
 * 2.0.9, 10 de Marzo de 2009
 - Eliminada la dependencia del indice de tabla en insertar enlaces en titulo
 * 2.0.8, 10 de Marzo de 2009
 +Añadido rapido a listas desde la ficha de la pélicula
 * 2.0.7b, 10 de Marzo de 2009
 # Modificado Icono vagos.es
 # Corregido el error en listas rapidas
 * 2.0.7, 10 de Marzo de 2009
 Historico en almas gemelas.
 * 2.0.6, 7 de Marzo de 2009
 Añadida lista rapida a pagina de votaciones de usuarios
 * 2.0.5, 5 de Marzo de 2009
 Corregida pantalla selección de listas para nº grande de listas
 * 2.0.4, 4 de marzo de 2009 (publica)
 Añadidos almas gemelas caidas y fecha de ultimos cambios.
 Ocultar enlaces por tipo
 Modificado el codigo para guardar las preferencias
 Posibilidad de modificar el nº de peliculas que aparecen en las listas de recomendaciones y TOP
 * 2.0.3, 3 de marzo de 2009 (interna)
 Añadido el control de cambios en almas gemelas
 Añadidas opciones para activar/desactivar los nuevos cambios
 * 2.0.2, 2 de marzo de 2009 (interna)
 Añadido el sistema rapido para añadir a listas
 * 2.0.1, 1 de marzo de 2009 (interna)
 Integrados los menus en la barra izquierda
 Integrados enlaces en la ficha de la pelicula
 * 1.2.0 -> FilmAffinityPlus por Javier Arias
 * 1.2.0, 26 de agosto de 2008
 Añadida la opción para abrir los enlaces en nueva ventana (muy solicitado).
 Ahora se utiliza la versión en castellano de IMDb.
 Cambio de imagen del panel de configuración.
 Añadido el sitio de información general Rotten Tomatoes (petición de Jerry Lucas).
 Añadidos los siguientes sitios de descargas: aRGENTeaM, titles.box.sk y fileheaven (petición de aixa-impaciente).
 Añadido el sitio de descarga directa Taringa!.
 Arreglada la búsqueda en CINeol.
 Se indica cuáles de los sitios web a los que enlaza el script requieren registro.
 En el log se muestra la versión del script, útil para buscar y corregir errores.
 Se puede acceder fácilmente a la información de depurado pulsando en el título de la barra de FilmAffinityPlus.
 * 1.1.0, 27 de junio de 2008
 Añadida una barra en la parte superior izquierda de la pantalla, con botones para acceder al panel de configuración, a la web oficial y para añadir FilmAffinity a los motores de búsqueda de Firefox.
 Añadida una opción para cambiar el estilo de las estrellas de puntuación. Se incluyen dos esquemas: uno de estrellas rojas y otro de estrellas amarillas, además de la posibilidad de dejar las estrellas que vienen por defecto.
 Los enlaces a otros sitios web se muestran también en la página de resultados de una búsqueda.
 Tras realizar una búsqueda se guarda la opción de búsqueda realizada (ej: una búsqueda por "Reparto" deja seleccionada la opción "Reparto", actualmente tras cualquier tipo de búsqueda la opción seleccionada es siempre "Todas"). Además, tras la búsqueda el cuadro de búsqueda se queda con el foco del teclado.
 Arreglada la búsqueda en otros sitios web cuando los títulos contenían caracteres "raros", como tildes o acentos circunflejos (gracias aka_IDIOT).
 Se cambia el enlace a la versión inglesa de FilmAffinity para que apunte a la misma página en inglés, actualmente apunta siempre a la página principal (ej: desde la ficha de una película se va a la versión inglesa de la ficha).
 Cambiado el antiguo webchat por su nueva versión en flash.
 Recuperado el sitio de subtítulos solosubtitulos.com pues parece que vuelve a funcionar.
 Añadido un enlace externo a "el grupo de last.fm que surgió del foro que surgió de FilmAffinity" (sugerencia de VicenteJavier).
 Se muestra la bandera de cada país en la sección "Mis datos", también en la búsqueda avanzada y en los TOP FilmAffinity.
 En la sección "Mis datos" se añade a las estadísticas el número de países diferentes con películas vistas.
 Las búsquedas para AllZine (gracias VicenteJavier) y para Cinépatas (gracias pohc) se realizan con el título traducido debido a que la tasa de aciertos es mucho mayor que con el título original.
 Añadido el sitio de descargas Vagos.es (petición de Soisa y de un usuario anónimo).
 Correcciones menores.
 * 1.0.1, 14 de mayo de 2008
 Cambiado ligeramente el CSS del panel de configuración.
 Correcciones menores.
 * 1.0.0, 12 de mayo de 2008
 Primera versión pública.
 Eliminada la búsqueda de subtítulos en solosubtitulos.com pues la página ha desaparecido.
 * 0.9.9, 25 de abril de 2008
 Arreglada la búsqueda en La Butaca.
 * 0.9.8, 23 de abril de 2008
 Para los enlaces a otros sitios web se utiliza el título original, no el traducido.
 Arreglada de nuevo la búsqueda en Google (gracias jota724).
 La notificación de cambios en el número de votos de Mis amigos también funciona para usuarios validadores de críticas, tal vez funcione para el resto de administradores (gracias jota724).
 * 0.9.7, 21 de abril de 2008
 Ahora el script funciona también para usuarios validadores de críticas, tal vez funcione para el resto de administradores (gracias jota724).
 Si no hay seleccionado ningún enlace de alguna categoría no se muestra ésta en la ficha de la película (gracias Zopilote).
 Arreglada la búsqueda en Alpacine (gracias Manhoman).
 Añadido DivX Clásico (petición de Grandine).
 * 0.9.6, 20 de abril de 2008
 'Secciones externas' aparecía incorrectamente en las páginas de estadísticas (gracias aka_IDIOT).
 Arreglada la búsqueda en Google (gracias aka_IDIOT).
 Arreglado pequeño fallo al cargar las preferencias cuando el tipo de dato era 'undefined'.
 Añadido Cine-Clásico (petición de Grandine).
 Añadido Cinépatas (petición de Zopilote).
 Añadido AllZine (petición de Grandine).
 * 0.9.5, 18 de abril de 2008
 Primera versión beta pública.
 */
// ==UserScript==
// @name           FilmAffinity++
// @namespace      http://www.filmaffinity.com/
// @description    Mejoras en FilmAffinity
// @include        http://www.filmaffinity.com/es/*
// @include        http://www.imdb.com/*
// @version 3.2.4
// ==/UserScript==
//window.addEventListener("load", function () {
doFAPP();
//}, false);
function doFAPP() {
    var d = document;
    var appName = "FilmAffinity++";
    var appVersion = '3.2.4';
    // Ya no existe -> hilo foro filmaffinity
    //var homepage = 'http://www.buxo.org/filmaffinity/';
    var homepage = 'http://filmaffinity.mforos.com/1360515/9537533-filmaffinity-plus-disponible-vol-ii/';
    var url = d.location.href;
	//Trim es una función que nos permite eliminar los carácteres en blanco al principio y fin de una cadena.
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
	//Quita el título alternativo entre paréntesis
    String.prototype.clearTitle = function()
    {
        return (this.indexOf('(') > 1) ? this.substr(0, this.indexOf('(')).trim() : this.trim();
    };
	//Invierte la cadena
    String.prototype.reverse = function() {
        return this.split("").reverse().join("");
    };
	// 
    // var node = document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;    
    String.prototype.findNode = function(context)
    {
		//Si no se pasa ningún argumento, context = document
		//var xpathResult = document.evaluate( xpathExpression, contextNode, namespaceResolver, resultType, result );
		// -xpathExpression: expresión que queremos buscar en el XML 
		// -contextNode: nodo padre del que dependerá la expresión (con document se puede acceder a todo)
		// -namespaceResolver: null para html
		// -resultType: constante que indica el tipo en que queremos recibir el resultado (FIRST... -> primer nodo del resultado
		// -result: sirve para reutilizar el objeto xpathresult, con null uno nuevo
        if (typeof context == "undefined") context = d;		
        var nodo = document.evaluate(this, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (typeof nodo == "undefined" || nodo == null) {
            log("Nodo no encontrado: " + this);
            nodo = null;
        }
        return nodo;
    };
    String.prototype.findNodes = function(context)
    {
        if (typeof context == "undefined") context = d;
        return findNodes(context, this);
    };
    String.prototype.findNodesArray = function(context)
    {
        if (typeof context == "undefined") context = d;
        return findNodesArray(context, this);
    };
    /*
     Sustituye las cadenas {propiedad} en la cadena por la propiedad del objeto
     */
    String.prototype.replaceObject = function(object)
    {
        var string = this;
        for (var property in object) {
            var value = object[property];
            var regexpr = eval("/{" + property + "}/g");
            string = string.replace(regexpr, value);
        }
        return string;
    };
	//Función sólo usada para ver cambios de almas gemelas
    /**
     * Returns the week number for this date. dowOffset is the day of week the week
     * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
     * the week returned is the ISO 8601 week number.
     * @param int dowOffset
     * @return int
     */
    Date.prototype.getWeek = function (dowOffset) {
        /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
        dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
        var newYear = new Date(this.getFullYear(), 0, 1);
        var day = newYear.getDay() - dowOffset; //the day of week the year begins on
        day = (day >= 0 ? day : day + 7);
        var daynum = Math.floor((this.getTime() - newYear.getTime() -
                                 (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
        var weeknum;
        //if the year starts before the middle of a week
        if (day < 4) {
            weeknum = Math.floor((daynum + day - 1) / 7) + 1;
            if (weeknum > 52) {
                var nYear = new Date(this.getFullYear() + 1, 0, 1);
                var nday = nYear.getDay() - dowOffset;
                nday = nday >= 0 ? nday : nday + 7;
                /*if the next year starts before the middle of
                 the week, it is week #1 of that year*/
                weeknum = nday < 4 ? 1 : 53;
            }
        }
        else {
            weeknum = Math.floor((daynum + day - 1) / 7);
        }
        return weeknum;
    };
    var logged = isLogged();
    //var userId = (logged) ? getUserId() : '';
    var userId = getUserId();
    var isAdmin = d.body.innerHTML.search(/\/es\/adm\/reviews_val\.php/ig) > -1;
    var methodEncode = function(txt) {
        return encodeURIComponent(txt);
    };
    var methodEscape = function(txt) {
        return escape(txt.replace(/\s/g, '+'));
    };
    var _TFILM = 1;
    var _TGEN = 2;
    var _TDOWN = 3;
    var _TSUB = 4;
    var DIST_REGIONS = 0;
    var DIST_CONTINENTS = 1;
    var ANCHOR_AFTER = 1;
    var ANCHOR_BEFORE = 2;
    var NUM_SM = 20;
    var debuglog = '<u><strong>INFORMACIÓN DE DEPURADO</strong></u>';
    var XPATH_SML = '//table[@class="list2"]';
    //http://www.iconarchive.com/category/funny/kidcons-icons-by-iconfactory.html
    var ratingStyles = {
        red: { name: 'Estrellas rojas', code: 'red', iconOn: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gFFA4sOtCB5EwAAAJhSURBVDjLbdNNaJxVGAXg537zTWca8zOkdVBoU61dtCBBq4hVEcEYRFyIaFcSFDcuuigiXbjwN2ipC0E3IkVExYVEF9GFhYgt1Y0UFbGodVNUEgxpE2JIJpnMvC5yI7PwwuEuLueew/ueIyJsA8V+xav7pd/xMIZQQ+F/TkToJUPtJUM//OT6uFe5hKfRRB+qGfV8V5DKng/T1mNleLKY80J3YGhK5+0PrI12+XZEuumo2q2XrN/4ie6HeB+ttK2eUkpontS4xNLgKvrU7FG1oR2llA7oqKs6bHUax7FQZDIUu6Wxpug/quHlcyuGrfvOmgU70mRqKbUds9rFN7gG5bb1sql4YsqeufFCxN7bIiKiO9ONeKMT3bGLMVEV0wYCF/OAD2GwrEt3P6P/xXEDYxfMOZOOcPY8syEtEtfyzswRjTrT7Q6cx2pGuzhl4LNnHRx7Jc1arnTEV2e4rmCBWN+azw12u7pJY8vxP5ncwmZxwvLn7/q59VbsckunNH7/IA89RT82SH/z4JMXrOB2O5TchcgAw3i04NPn9a98RLxXijjXjRk3xwRxUi0OF2KyIh5T7+IE9mFnwk4M5I8e+Fjj1Lyl+gEjTpd/eG5zS6VQNaiqtM9Bv/yGx/GnHNNaju3II8qzrxETNfGjvXGPSvRJVwal+TtZG006mMUdaKaeFFZQb0ivf2/02Ly/3OeqlvgSU3l4NezCfF7nbJmTGCmlDjaWxa9LWia2yF/jdCYsYj0LdrdX2Rtl2cUhfIHLeDOT57CEdk93OminniZKKRW5bcPZqqy8iLWs/F+bEf8CaxrvLdIwvxgAAAAASUVORK5CYII=',
            iconOff: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gFFA4hJnEuxk4AAALqSURBVDjLbZNBSCNXHMZ/8+ZNMrGuKcYEQmpCacEuSCBGUOxhiaQXWVBphYJ3b+3Ncw8Fwfawh+KtB6U9ilDqofVSomsED/VQJRsqxiRiSRCNJiYzk5lMD51sPeyDDx7v8f2+B+//4boufQEimUx+m0wm/9Z1/SUQBPyA4B3Ldd3/LxRFQUqppdPpl/Pz8x9PT0//rGnaFx5EBzRAk1L296qiKIp8AlSEELqqqsNHR0ek0+lgJBL54eDgIOk4zmEsFvtofHw8VavVPszn8z+1Wq1NwHgKwAO8H4lEqFar6LoeWFpa+rrX630lhFCCwSCJRIJ8Pn8N/ArciP7zARGPx7NSysFUKsXa2ho+n49KpYJhGMr+/j4Ae3t7PcuyXgPvAVIq/7nVsbGxLxcWFr4/PDwUMzMzxGIxVldXubm5oVQqUavVMAyD09PTN5ZlFQAHcGQ0Gv00k8l8Mzo6mq1WqywvLzM7O0uz2cQwDAKBALlcDl3XKZVKdLvdA6DtqSsWFxd3pqamsrlcDtM0yWazDA4OYpomvV4PgKGhIVqtFoFAAKDpmQ3AVuv1+ieapj2fnJyUQgg2NzeJRqPE43EajQadTodwOMzx8TGJRIJisUin0/kduAMM9f7+/nWhUPjz5ORESyQS8XA47Lu4uGBiYoKtrS22t7epVCpcX1+jaRqRSOSDy8vLc8dxikBHAQLAM2DY7/d/trKy8t3Dw4MeCoU4OzsjlUoBIKVE13VUVWV9fb3YaDSWgKoETKAHmKZp/lIoFD4Ph8Mvzs/PyWQy7O7ucnV1dSuEcEZGRp7Ztu0Dhrxgn/TMVv9byuXyX3Nzcy8eHx/Z2NigVqv9Ztv2tuu6zXK57BdChIC6F+xKr0SuoigOYN3e3r5ptVrs7OxQr9f/sCzrR89w5ziO6TgOXmgbaCseoD+N6sDAwHNN03Zt275st9uvXNetA/8ADaD7ZPIdoPsW4EGE17xhIOQd33nqeMlv2wy4/wJOnkltDSAWfgAAAABJRU5ErkJggg==',
            iconHalf: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gFFA8tIUI9dtYAAAKsSURBVDjLbZNfiExhGMZ/7zfHnp05s2fraMa27DLYrJU/bWz+bDbiRkq0KxfccCv5U7IpNoQIcYmkpC3hAmWVskUhNf4sa0OLxWrHyDTGzpiZM58L32oufPX0XT3v8/S+z4PWmjEAqj4w/mBMqt8Cq4FqwAYU/3laa8rJAPYOd9HT50zTS5mSArYAUSAEjDOoNH8AkPIBAlR32os+drjou0T0Rmf+aCAQOK2UWh+JRDpbW1uvNDQ0PAG2AS5QIWPqIiJA9Chz3ryPZdy0pZj9boQ7S5spFotaRCQUCqGUoqen5wawHUgqQwZQjvJWREmFVzmTOHv5BZ/nTiWdTuM4jvT39+P7PvF4vAQ8ABzAsoxywCay4WJpxvFz9gN1qGEZ4QVBuo49Y9B9zODgIENDQ4gIiURiAHgN+ICvwF6yuarl9nUmXOqdMFyza/k25p28QOEL5FMQDofp7u6moqKCZDIJcB8YNSioE9a0610/wysOuC/57CmW7D+CFVXkk5DP/T2N53lks1mCwSDAT0POAUW1x39381RoJHcmXU/76w+sWRvmzY4urCoo5CGTydDe3k6pVMJxHERkMaAN/goA60Cu7aycmbkEunPedP29V+vDLft0Y2Ojbmtr0zU1Nbq5uVk3NTWVgN3AZCAYMENGgIcPi8n3HUxZ9lUVrPijAeIfTzJu6mxEhNraWlzXJRaLSV9fXz1wA/iFialtYlu/MjS5d69TpTdNRD+lUdfV1WnLsr7btp2IRqNZz/N8YBhoAaJiHIiJZmVIqo/06Vlbv/GJhXwDcj3AVbM8GxgPJIBXwLBlkqhFxAfyozo9kAI2qjSUcveA84bwA/htBEtjpyyPMsbFTOAW8AE4ZchfgRRQKCujDxSkrImIiDJt84xVjPIPIGuU/7UZ0H8AV94JRR0cbigAAAAASUVORK5CYII=' },
        yellow: { name: 'Estrellas amarillas', code: 'yellow', iconOn: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACdUlEQVR42pVRW0gUYRT+/rmtq+stlIIy00mlB8MHKdSgoHwIQrrYQyEp+FIaUVg9FUpET6Iv2dKFLpAFGURPW0hCG2xQka5Blrcu3iHF1HV05p/5O4NbVNaCA9/858w5853/+w5DjId3tpbjbBWUduvh/3pYLAKrrbgXgddQb1q5Kybge9Usp4YN4AMHC0i6GuCfVkRgVmuNqDPrMETJba1Ru2+eWRlBvacfJyt1fLsG+D2DWtOi/k8C/uZeAWa7k/Hs8gJUvgbpcoITrxU5G+dqpcJHDMYeOC8VoQz7rtij8yExZEZgYIJNy5qYcKYY35VSKXLtZlFZlAzrOWDbDHmHGFIqAKebzLgBSB+Br5QGmcCYEGxGAl5I08LgxxnfqsUJjiqu203yAduLIrrXqtOAwinoo5+n6DSA8S6gk8IemtGhGRgVpxizbv3yYGGLmiN5RAD7uY4y+pCRR6/MJZsi74HgEJx2SoOePkeRd8e/nR9YZiIvVCTkqUHnvFGCbCLgq2n4NDBCUkiF7fcFvR1z22Nuwdin+uUa6yiyKZlzWQkkGYNEcD3O732yUPM3QRxBi8YiUiGF1cPOBkQoGyEohPVuhVb7QPviazU3/+x1t+0GiYQkQmpFGrKvlqNN3QHN6SDpYc8IFm0k5PO1UimwGFLMY232wbuTop/6XXdnf5egjJbgXFoB6vk4w3BYDeX2mw1uoVdHwzodxUoO8P2dtz49aFyKivvTg5l8KSxr0qbQJGsu/Wzdibrg9iQ9zcSRbT7phKMqPYldZsEyE6vToF5IZS1jNtoLB8Xj6AQnWnZt1F5loSxDZjtbIqL24tjSDX4AdFTzI/nnv+kAAAAASUVORK5CYII%3D',
            iconOff: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gFFA4bKl0xVBwAAAKOSURBVDjLlZJNaxNRFIbfeydzuTNpMhga8lULtUkp7aKBuhEXCrpQKUVE8B+00FqoG/+A4EZEhFJpd6XgSqjShYKrFtpFoSQgBiWRfoATJjiZmElnksnNxI2VLozSsz3PeThfEv4R+Xz+vizLY3t7e4VeTOA/gqeKogDAm14M7ZVYXFwcsm07rWlaemFhYejcAsbYPOec9PX1EcbY3LkFqqreHRsbQzAYhKIo93pxJJfLZU3T1HZ2dpqEkDjnPBgIBK5wzuenpqbI1tYWqtVqVwixbNv2bqPROOl0OoYQgrmuWw2sra1NBIPBF5OTk5phGPB9n4yPj5N0Oo1arYZwOAxKKXEcZ77Vas0pitIVQsA0zVqn03koZbPZr47jmLqu31QUhWmaRgYGBtBoNFCr1UApBeccjuNACEGEEMSyrKbneY8BvCans8zMzGQkSXqfTCaHk8kkYrEYVFUFAFiWhaOjIxiGAdM0i5TS26urq98AgJxdyOzsLA2Hw9sjIyNXE4kEGGNoNpsol8uwbRuHh4fbS0tL13peYWVlxfc875PrujAMAwcHB9B1Hd1uF4QQEEI+/+0TOQD2u5supfSW7/uwLAuu64JSClVVQQiBLMt3AIRPWQBeAIAMIATgQiaTuSRJUrLdbqNSqcCyrO9CCEQikVQsFoMkSYlMJnO9WCyWAFQBdCQAHgAbQHV6evpBKBS6YZomdF3fXV9ff5TP59+lUqnhdrt9kXMuxePxL/v7+28B1AG0pTPj+Nls9mWr1YocHx8/39jYeAKgDKBaKBQ+9vf3n1BKLwOI5nK55dOiP4LR0VE5Go1O1Ov1Z5ubm68AVADUAPwE8KNUKm0PDg4WCCGMMfahXC77APAL7BgSZ+fkffYAAAAASUVORK5CYII=',
            iconHalf: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gFFA8wOa49gpwAAAJ5SURBVDjLlZJPSBRhHIafb2Zn3NldW6mVtFUj/BN0qUAEkUioQ3UIqSACwUPQIfPQLbp0CLpERVAG4rVCIqqTgnhIRGrRFKOlWE1k0cXcP+bO7sp+38x0CCOCFfqdn/eBl/ens8upueeXcmb0SCwWi1ditN0E3uLTe5Zl3duNqShQPcYhLzzTEg6HWwYGBg79t8DdJ/ppKItQKCRM07z+/xUaRA/11wgGg1iWdaESJtTMi2PkF8JMPNnGUHXU6kE3YHa6LXa/1v5GjLzKkc1mPaXUYD6fn7Ztu+A4zrpSyiyVSlmhTtf0eW3OI6+vM4x8D44jOHxFUNML7gKj423Ytk2xWGRjY8MrlUqeUopMJrMppbzhI18c4SOWk554qF90LDqB0H5gFLQElnUU0zQpl8v4/X4hpRS5XK7kOM5tIcRrsdNlu8No1aq8US6oZs4DjYeBg0xN3SKXy7GyssL6+jqZTCahadrZoaGhJQDfjsAfkwnV7mtjxpp0z5a6fm+5jW3bpNNpXNelUChMDg8Pn6y4gm9GubKoPpMEkt8gMcna2hqe5yGEQAjx5d8VfIAfMAEBeG7QOaNL4BOwCplChkAggBACwzDOAXt2WKCsAQZQDTT2Rugm5B5gC9xxyL+sWk0kEqvJZBIpJbqu17e2tnYDUSAA6DpQBvJAduw4l6sPcErFBMkP5nTj5/LN+fn5d9FotFlK2ej3+/W6urqvs7Ozb4EtQOp/f++dGu2xl9L3Ti/pDzq+y7tACsjG4/HxSCRS0DStHaidm5sb3An9EVyNYHQZHF0uevdPLDvPgB/AJvATSC8uLk42NTXFhRCmaZpjqVTKBfgFwF0VMjiLGusAAAAASUVORK5CYII=' }
    };
    var img_plus = "http://www.imageconverterplus.com/img/tree-menu/signplus.gif";
    var img_minus = "http://www.imageconverterplus.com/img/tree-menu/signminus.gif";
    var closeimg = "http://www.buxo.org/content/fapp/icons/close.png";
    var upimg = /*"http://neokben.host-ed.me/fa/src/arrowupfa.jpg";*/ "http://i46.tinypic.com/2cyp1s9.gif";
    var upimg10 = "http://www.freeiconsweb.com/Icons/16x16_arrow_icons/arrow_17.gif";
    var downimg = "http://i45.tinypic.com/2vdp3eb.gif";
    var downimg10 = "http://cinemakb.freehostingcloud.com/src/arrow_1810.gif";
	var logoimdb = "http://s3.subirimagenes.com:81/otros/previo/thump_7805471logoimdb2.jpg";
    var newimg = "http://www.buxo.org/content/fapp/icons/new.png";
    var upload_img = "data:image/gif;base64,R0lGODlhEAAQAPQAAPD09qUJCe3u8LQ8PcuCg6YNDa8rK%2BPO0NWkpaodHcd1dsJmZ%2Bfb3NGVlt%2B%2FwLpLS75XWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla%2BKIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK%2Bo2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC%2B0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU%2FNXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK%2BkCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm%2F4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg%2BboUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC%2BRAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA%3D%3D";
    var download_img = "data:image/gif;base64,R0lGODlhEAAQAPQAAPD09hi7Q%2Bry8UbGaofXnxy7RjfDXM3q2abguCm%2FUnvVlW7Qitnu4pjdrcDnzVXKdWDNfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla%2BKIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK%2Bo2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC%2B0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU%2FNXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK%2BkCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm%2F4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg%2BboUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC%2BRAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA%3D%3D";
    var link_img = "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys%2FRD84QzQ5Ojf%2F2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf%2FwAARCAAMAAwDASIAAhEBAxEB%2F8QAFgABAQEAAAAAAAAAAAAAAAAABQMG%2F8QAIhAAAgEDBAMBAQAAAAAAAAAAAQIDBBESAAUTIQYUMSNC%2F8QAFAEBAAAAAAAAAAAAAAAAAAAABP%2FEABwRAAIBBQEAAAAAAAAAAAAAAAECAwARMWGR8P%2FaAAwDAQACEQMRAD8A3u8b3NPUx%2ByVotuppZnnkSskVpER2itZVU5Fh0FYgf0PmmvGJOWGtdPcFOan8RVs7Oo448hdyT0%2BYPf0HU6rxmOpimhbcaxYJXmbjCQHDlLF8WMZYXzYfb2OntOnYJGFAzvd%2B0OEFnLE49yv%2F9k%3D";
    var ratings = {
        1: "Muy mala",
        2: "Mala",
        3: "Floja",
        4: "Regular",
        5: "Pasable",
        6: "Interesante",
        7: "Buena",
        8: "Notable",
        9: "Muy buena",
        10: "Excelente"
    };
    var menus = {
        0: {name:'SECCIONES EXTERNAS',anchor:'TOPs',cond:'SHOWSEMENU',
            options: {0:{title: 'El Foro que surgió de FilmAffinity',
                href:'http://filmaffinity.mforos.com',
                target:'_blank'},
                1:{title: 'Chat NO OFICIAL en iRC-Hispano',
                    href:'http://www.irc-hispano.es/webchat/flash.php?canal=filmaffinity',
                    target:'_blank'},
                2:{title: 'El grupo de last.fm que surgió del foro que surgió de FilmAffinity',
                    href:'http://www.lastfm.es/group/El+grupo+que+surgi%C3%B3+del+foro+que+surgi%C3%B3+de+Filmaffinity',
                    target:'_blank'}
            }
        },
        1: {name:'FilmAffinity++',anchor:'USUARIOS',position:ANCHOR_BEFORE,cond:'SHOWSCRIPTMENU',
            options: 	{0: {title:'Panel de Configuración',href:'#',target:'',onclick:preferences},
						1: {title:'Hilo Oficial FA++',href:'http://filmaffinity.mforos.com/1360515/9537533-filmaffinity-plus-disponible-vol-ii/#84559313',target:'_blank'},
						2: {title:'Añadir motor busqueda',href:'#',target:'',onclick:installSearchEngine},
						3: {title:'Información de depurado',href:'#',target:'',onclick:showLog}
            }
        }, 
         2: {name:'Premios++', anchor:'INFORMACIÓN', position:ANCHOR_BEFORE,cond:'SHOWEXTRAPRIZES',
			options: {  0: {title:'BAFTA', href:'#',target:'',onclick:showBAFTA},	
						1: {title:'Berlín', href:'#',target:'',onclick:showBerlin},	
						2: {title:'Cannes', href:'#',target:'',onclick:showCannes},
						3: {title:'Cine Europeo', href:'#',target:'',onclick:showCineEuropeo},
			//4: {title:'Críticos de NY', href:'#',target:'',onclick:showCriticosNY},
						4: {title:'Emmy', href:'#',target:'',onclick:showEmmy},	
						5: {title:'Gijón', href:'#',target:'',onclick:showGijon},
						6: {title:'Globos de Oro', href:'#',target:'',onclick:showGoldenGlobe},
						7: {title:'Goya', href:'#',target:'',onclick:showGoya},
			//8: {title:'Gotham', href:'#',target:'',onclick:showGotham},
						8: {title:'Málaga', href:'#',target:'',onclick:showMalaga},
						9: {title:'Razzie', href:'#',target:'',onclick:showRazzie},
			//10: {title:'NBR', href:'#',target:'',onclick:showNBR},
						10: {title:'San Sebastián', href:'#',target:'',onclick:showSS},
			//12: {title:'Satellite', href:'#',target:'',onclick:showSatellite},
						11: {title:'Sevilla', href:'#',target:'',onclick:showSevilla},
						12: {title:'Sitges', href:'#',target:'',onclick:showSitges},
						13: {title:'Spirit', href:'#',target:'',onclick:showSpirit},
						14: {title:'Sundance', href:'#',target:'',onclick:showSundance},
						15: {title:'Tribeca', href:'#',target:'',onclick:showTribeca},
						16: {title:'Valladolid', href:'#',target:'',onclick:showValladolid},			
						17: {title:'Venecia', href:'#',target:'',onclick:showVenecia},
					}
        }};
    // todo: modificar para no usar indices en esta lista de preferencias.
    var preferencesOptions = {
    
        //Opciones de Menus
        0:{name:'SHOWSCRIPTMENU',text:'Mostrar el menú FilmAffinity++',def:true},
        1:{name:'SHOWSEMENU',text:'Mostrar el menú Secciones Externas',def:true},
        2:{name:'SHOWEXTRAPRIZES',text:'Mostrar el menú Premios II', def:true},
        //Opciones de listas
        3:{name:'FAVLISTS',text:'Activar Listas Favoritas',def:true},
        4:{name:'SHOWQUICKLIST',text:'Mostrar icono para añadir rápidamente a listas',def:true},
        5:{name:'FETCHFILMLISTS',text:'Mostrar las listas a las que pertenece la pelicula en el menú de listas rapidas',def:false},
        6:{name:'MEDIALISTS',text:'Mostrar medias de votaciones en listas',def:true}, 
        7:{name:'SHOWVOTESONFRIENDLISTS',text:'Mostrar mis votos en las listas de otros usuarios y en los resultados de búsquedas',def:true},
        //Opciones de Mis Datos
        8:{name:'FLAGSINMYDATA',text:'Mostrar banderas de países',def:true},
        9:{name:'SHOWCLASIF',text:'Mostrar clasificaciones',def:true},	
        10:{name:'SHOWMFINDEXES',text:'Mostrar índices de votaciones',def:true},
        11:{name:'SHOWYEARDATA',text:'Mostrar tabla de votos por años',def:false},
        12:{name:'COUNTRYDISTS',text:'Mostrar tabla de votos por paises agrupados',def:false},
        //Otras opciones
        13:{name:'FLAGSINOPTIONS',text:'Mostrar banderas en desplegables de selección de país',def:true},
        //14:{name:'FLAGSINFRIENDS',text:'Mostrar banderas en la lista de Amigos',def:true},
        14:{name:'FLAGSCOPRODUCTIONS',text:'Mostrar banderas de coproducciones en fichas de películas',def:true},
        //16:{name:'SHOWEXTRAVOTES',text:'Mostrar votos de otros contactos en fichas de películas',def:true},
        //16:{name:'SHOWEXTRAGROUPS',text:'Mostrar votos de otros grupos en fichas de películas',def:true},
        15:{name:'SHOWMYSTATS',text:'Mostrar mis estadísticas en estadísticas de otros', def:true},
        16:{name:'SHOWEXTERNALS',text:'Mostrar enlaces externos en búsquedas', def:true},
        17:{name:'SHOWEXTPAGES',text:'Mostrar información de otras páginas en fichas',def:true},
        //Opciones de almas gemelas (No activas por el momento)
        //2:{name:'SHOWSMCHANGES',text:'Mostrar cambios en las almas gemelas.',def:true},
        //3:{name:'SHOWSMFALLEN',text:'Mostrar las almas gemelas caidas de la lista.',def:true},
        //4:{name:'KEEPSMCHANGES',text:'Mantener los cambios en las almas gemelas mientras no se produzcan nuevos cambios.',def:true},
        //7:{name:'OMITTVSHOWS',text:'Ocultar series de TV (experimental)',def:false},
        //12:{name:'ENABLEVOTES',text:'Permitir votar desde mis listas, listas de otros usuarios y resultados de busqueda',def:true},
        //13:{name:'CENTERPAGE',text:'Centrar pagina en la ventana del navegador',def:false},
        //14:{name:'FOLDMENUS',text:'Permitir plegar los menús',def:false},
        //15:{name:'SEARCHFORLIST',text:'Añadir buscar en listas',def:true},
        //22:{name:'COMPACTVOTES',text:'Notas compactas',def:true},
        18:{name:'CHANGELIMIT',text:'Cambiar el n&deg; de peliculas a mostrar en Recomendaciones y TOP',def:false}
//        
    };
    var sections = {
        MyFriends:'/myfriends2\\.php/ig',
        Stats:'/userrep\\.php\\?user_id\\=/ig',
        UserRatting:'/userratings\\.php\\?user_id\\=/ig',
        Film:'/\\/film/ig',
        Search:'/\\/search\\.php/ig',
        MyData:'/\\/mydata\\.php/ig',
        TopGen:'/\\/topgen\\.php/ig',
        AdvSearch:'/\\/advsearch\\.php/ig',
        SoulMates: '/\\/soulmates\\.php/ig',
        MyLists:'/\\/mylists\\.php/ig',
        MyList:'/\\/mylist\\.php/ig',
        Tour:'/\\/tour\\.php/ig',
        SoulMatesRec:'/\\/smsrec\\.php/ig',
        UserRec: '/\\/userrec\\.php/ig',
        UserList: '/\\userlist\\.php/ig',
        UserLists: '/\\userlists\\.php/ig',
        UserReviews: '/\\/userreviews/ig',
        MyVotes: '/\\/myvotes\\.php/ig',
        AutoTour:'/\\/autotour\\.php/ig',
        EditMovieList: '/\\edtmovielists\\.php/ig',
        UptMyData: '/\\updmydata\\.php/ig', 
        Topics: '/movietopic\\.php\\?topic\\=/ig',
        IMDBLists: '/\\/list/ig',        
        Reviews:'/reviews/g'        	
    };
    var patches = {
        // Añade el icono para añadir a listas favoritas (IMDB)
        addAddToFavListsIMDB:{browser:['FF'],sections:['IMDBLists'],method:doAddToFavListsIMDB,preference:'FAVLISTS',def:true},
        // Centrar la página en la ventana del navegador
        centerPage:{browser:['FF','OP'],preference:'CENTERPAGE',def:false,method:doCenterPage},
        // Añadir menús a las opciones
        addMenus:{browser:['FF'],method:doMenus},        
        // Redirigir en caso de que la busqueda de 0 resultados
        //redirectSearch:{browser:['FF'],sections:['Search'],method:doRedirectSearch},
        // Captura el valor de UCD, usado para subir votos
        captureUCD:{browser:['FF'],sections:['AutoTour'],method:doCaptureUCD},
        // Copia la configuraciones desde monousuario al usuario actual
        // updateFromMonoUser:{logged:true,preference:'MUMP',def:true,browser:['FF'],method:doUpdateMultiuser},
        // Registra los comandos GM
        registerCommands:{browser:['FF'],method:doRegisterCommands},
        // Estilo de las puntuaciones
        changeRatingStyle:{browser:['FF'],method:doRatingStyle},
        // Cambios en la lista de amigos 
        friendsRatingChange:{browser:['FF'],sections:['MyFriends'],method:doFriendsRatingChange},
        // Añade enlaces en la lista de amigos
        //friendsLinks:{browser:['FF'],sections:['MyFriends'],method:addFriendsLinks},
        // Enlaces Externos
        externalLinks:{browser:['FF','OP'],sections:['Film','Search'],method:doExternalLinks},
        //Añade enlaces en fichas para guion, musica, ...
        addOtherLinksInFilms:{browser:['FF'],sections:['Film'],method:doAddOtherLinks},        
        // Cambios en almas gemelas
        //soulMatesChanges:{browser:['FF'],sections:['SoulMates'],preference:'SHOWSMCHANGES',def:true,method:doSoulMates},
        // Ordenación de las peliculas de una lista 
        sortFilmsInList:{browser:['FF'],sections:['MyList'],method:doSortFilmsInList},
        // Captura los nombres de nuestras listas
        captureLists:{browser:['FF'],sections:['MyLists'],method:doCaptureLists},
        // Ordena Mis listas según el orden establecido y muestra los botones de subir y bajar
        sortMyLists:{browser:['FF'],sections:['MyLists'],method:doSortMyLists},
        // Add External link to myLists 
        addExternalLinkMyLists:{browser:['FF'],sections:['MyLists'],method:doAddExternalLinkLists},
        // Añade votos de contactos adicionales en las fichas de las peliculas
        //addExtraVotes:{browser:['FF'],sections:['Film'],method:doAddExtraVotes,preference:'SHOWEXTRAVOTES',def:true},
		// Añade notas de otras páginas
        addExtraRatings:{browser:['FF'],sections:['Film'],method:doAddExtraRatings,preference:'SHOWEXTPAGES',def:true},
        // Añade las listas favoritas a la pagina de Mis Listas
        addFavLists:{browser:['FF'],sections:['MyLists'],method:doAddFavLists,preference:'FAVLISTS',def:true},
        // Añade el icono para añadir a listas favoritas
        addAddToFavLists:{browser:['FF'],sections:['UserLists'],method:doAddToFavLists,preference:'FAVLISTS',def:true},         
        // Añadir rapidamente a lista
        quickList:{logged:true,browser:['FF'],sections:['UserList','AdvSearch','MyList','Film','Tour','SoulMatesRec','UserRec','MyVotes','AutoTour','UserRatting','TopGen','Search'],preference:'SHOWQUICKLIST',def:true,method:doQuickList},
        // Muestra nuestra puntuación en listas que no lo incorporan de serie 
        showVote:{logged:true,browser:['FF'],preference:'SHOWVOTESONFRIENDLISTS',def:true,sections:['Search','UserList','Topics','AdvSearch','UserRatting'],method:doShowVote},
        //Mostras medias de votaciones de listas
        addMediaInLists:{browser:['FF'],sections:['MyList','UserList'],method:doAddMediaInLists},		
        // Nos permite votar en listas ajenas, nuestras listas, ##NO FUNC##
        //enableVotes:{logged:true,browser:['FF'],preference:'ENABLEVOTES',def:true,sections:['MyList','Search','UserList'],method:doEnableVotes},
        // Edita el control de busqueda tras buscar
        processSearch:{browser:['FF'],sections:['Search'],method:doProcessSearch},
        // Añade banderas a la lista de amigos
        //addFlagsToFriends:{browser:['FF','OP'],preference:'FLAGSINFRIENDS',def:true,sections:['MyFriends'],method:doAddFlagsToFriends},
        // Añade banderas a las opciones de los combo box de paises
        addFlagsToOptions:{browser:['FF'],preference:'FLAGSINOPTIONS',def:true,sections:['TopGen','AdvSearch','UptMyData'],method:doAddFlagsToOptionsSel},
        // Añade las banderas a las estadisticas de 'mis datos'
        addFlagsMyData:{browser:['FF','OP'],preference:'FLAGSINMYDATA',def:true,sections:['MyData'],method:doAddFlagsMyData},
        // Banderas de coproductoras
        addCoproductionFlags:{browser:['FF','OP'],preference:'FLAGSCOPRODUCTIONS',def:true,sections:['Film'],method:doAddCoproductionFlags},
        // Añade estadisticas adicionales en myData 
        doMyDataMod:{browser:['FF','OP'],sections:['MyData'],method:doMyDataMod},
        // Añade clasificaciones en myData 
        addClasif:{browser:['FF'],preference:'SHOWCLASIF',sections:['MyData'],method:doAddClasif,def:true},
        // Captura las puntuaciones de las criticas, para analizar
        captureReviews:{browser:['FF'],sections:['Reviews'],method:doCaptureReviews},
        // Cambia el nº de resultados en los listados de TOPs ##NO FUNC##
        alterLimits:{browser:['FF','OP'],method:doAlterLimits,preference:'CHANGELIMIT',def:true},
        // Modifica los titles de las imagenes para que coincidan con el alt
        alt2Title:{browser:['FF','OP'],method:doAlt2Title},
        // Corrige los enlaces a la web inglesa
        fixEnglishLinks:{browser:['FF','OP'],method:doFixEnglishLink},
        // Corrige la posición del icono de zoom al centrar la página
        fixZoomIcon:{browser:['FF','OP'],sections:['Film'],method:doFixZoomIcon},
        // Añade nuevos contactos en Amigos 
        //extraContacts:{browser:['FF'],sections:['MyFriends'],method:doExtraContacts,preference:'ADITIONALFRIENDS',def:true},
        // TODO: Aplicar esto al resto de paginas del usuario
        // Captura los datos de los nuevos Contactos
        //captureContactData:{browser:['FF'],sections:['UserRatting'],method:doCaptureContactData,preference:'ADITIONALFRIENDS',def:true},
        // Añade enlace para añadir a la lista de contactos adicionales
        //addToExtraContactsLink:{browser:['FF'],sections:['UserRatting','UserReviews','UserRec','UserLists','Stats'],method:doAddToExtraContactsLink,preference:'ADIOTIONALFRIENS',def:true},
        //Compactar generos, paises, y años en estadísticas	
        //addCompactCountries:{browser:['FF'],sections:['Stats'],method:doAddCompactCountries,def:true},
        //Compactar topics	
        //addCompactTopics:{browser:['FF'],sections:['Topics'],method:doAddCompactTopics,def:true},
        //Añade nuestras estadísticas en las páginas de estadísticas de otros usuarios
        addMyStatsToOthers:{browser:['FF'],sections:['Stats'],method:doAddMyStatsToOthers,preference:'SHOWMYSTATS',def:true},
        // Compacta votos para copiar y pegar
        //addCompactVotes:{browser:['FF'],sections:['UserRatting'],method:doAddCompactVotes,preference:'COMPACTVOTES',def:true},		
        // Add Search for lists
        addSearchForListsOption:{browser:['FF'],method:doAddSearchListsOption,preference:'SEARCHFORLIST',def:true}
    };
    var linkSitesTypes = {
        1:{caption:'Ficha en: ',preference:'verCine'},
        2:{caption:'Buscar en: ',preference:'verGeneral'},
        3:{caption:'Descargar de: ',preference:'verDescargas'},
        4:{caption:'Subtítulos en: ',preference:'verSubtitulos'}
    };
    var linkSites = {
        abandomoviez : { name: 'Abandomoviez',
            icon: 'http://www.abandomoviez.net/favicon.ico',
            search: 'http://www.abandomoviez.net/db/busca_titulo_o.php?busco2=%searchvo',
             method: methodEscape,
            type: _TFILM
        },
		aullidos : { name: 'Aullidos',
            icon: 'http://www.aullidos.com/imagenes/scream-16.ico',
            search: 'http://www.aullidos.com/buscador.asp?txtBusqueda=%searchtr',
            method: methodEncode,
            type: _TFILM
        },
		cineol : { name: 'CINeol',
            icon: 'http://www.cineol.net/favicon.ico',
            search: 'http://www.cineol.net/multisearch.php?fan=1&where=movies&search=%searchvo',
            method: methodEscape,
            type: _TFILM
        },
        cinepatas : { name: 'Cinépatas',
            icon: 'http://www.cinepatas.com/favicon.ico',
            search: 'http://www.cinepatas.com/forum/searcher.php?search_keywords=%searchtr&easy_search=titles',
            method: methodEscape,
            type: _TFILM
        },
		imdb : { name: 'IMDb',
            icon: 'http://imdb.com/favicon.ico',
            search: 'http://www.imdb.com/find?q=%searchvo',
            method: methodEncode,
            type: _TFILM
        },
        labutaca : { name: 'La Butaca',
            icon: 'http://www.labutaca.net/favicon.ico',
            search: 'http://www.google.com/custom?q=%searchvo&sa=Buscar+en&sitesearch=www.labutaca.net&q=&domains=www.labutaca.net',
            method: methodEncode,

        },
		mrskin : { name: 'Mr. Skin',
            icon: 'http://www.mrskin.com/favicon.ico',
            search: 'http://www.mrskin.com/search/search?term=%searchvo',
             method: methodEscape,
            type: _TFILM
        },
        myanimelist : { name: 'MyAnimeList',
            icon: 'http://cdn.myanimelist.net/images/faviconv5.ico',
            search: 'http://myanimelist.net/anime.php?q=%searchanm',
            method: methodEscape,
            type: _TFILM
        },
		rotten : { name: 'Rotten Tomatoes',
            icon: 'http://www.rottentomatoes.com/favicon.ico',
            search: 'http://www.rottentomatoes.com/search/full_search.php?search=%searchvo',
            method: methodEscape,
            type: _TFILM
        },
        yahoo : { name: 'Yahoo! Movies',
            icon: 'http://movies.yahoo.com/favicon.ico',
            search: 'http://movies.yahoo.com/mv/search?p=%searchvo&x=0&y=0&fr=ush-movies&toggle=1&cop=&ei=UTF-8',
            method: methodEncode,
            type: _TFILM
        },
        wikipedia : { name: 'Wikipedia',
            icon: 'http://en.wikipedia.org/favicon.ico',
            search: 'http://en.wikipedia.org/wiki/Special:Search?search=%searchvo&go=Go',
            method: methodEncode,
            type: _TGEN
        },
        wikipediaES : { name: 'Wikipedia ES',
            icon: 'data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAgQAGRgZACgoKAAAAP8APDo8AEhHSABXWFcAaWppAHp7egCEg4QAmJiYAKmoqQC5urkAyMfIANjZ2ADp6OkAAP//APz9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREREREREQMDAwMDAxERERERDA0REREDAwMDAwMREREREQUFDhEREBAQEBAQEREREQsCAgsRDBAQEBAQEBEREREJBAgLDggDAwMDAwMRERERAgYPCwcEAwMDAwMDERERCQALEQ4EAgwRCgoREREREQUFDhEOBAUREQ4IEREREQwBCRERCgAGEREPCQwREREGAQ0RDgUCCQsREQwLEREOAQcPEQoBCw0HEREPBxERCQIMEREFAg4PCQoRDwcKDAYFDBELBQgOEQgGDg4HBhEREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
            search: 'http://es.wikipedia.org/w/index.php?title=Especial:Search&search=%searchvo&go=Go',
            method: methodEncode,
            type: _TGEN
        },
        google : { name: 'Google',
            icon: 'http://www.google.es/favicon.ico',
            search: 'http://www.google.es/search?q=%searchvo',
            method: methodEncode,
            type: _TGEN
        },
        mininova : { name: 'Mininova',
            icon: 'http://www.mininova.org/favicon.ico',
            search: 'http://www.mininova.org/search/%searchvo/4',
            method: methodEncode,
            type: _TDOWN
        },
        isohunt : { name: 'isoHunt',
            icon: 'http://isohunt.com/favicon.ico',
            search: 'http://isohunt.com/torrents/%searchvo?ihs1=2&iho1=d&iht=1',
            method: methodEncode,
            type: _TDOWN
        },
        piratebay : { name: 'The Pirate Bay',
            icon: 'http://thepiratebay.org/favicon.ico',
            search: 'http://thepiratebay.org/search/%searchvo/0/99/200',
            method: methodEncode,
            type: _TDOWN
        },        
        cineclasico : { name: 'Cine-Clásico',
            icon: 'http://www.cine-clasico.com/favicon.ico',
            search: 'http://www.cine-clasico.com/foros/search.php?keywords=%searchvo&terms=all&author=&sc=1&sf=firstpost&sr=posts&sk=t&sd=d&st=0&ch=300&t=0&submit=Buscar',
            method: methodEncode,
            regreq: true,
            type: _TDOWN
        },
        divxclasico : { name: 'DivX Clásico',
            icon: 'http://www.divxclasico.com/favicon.ico',
            search: 'http://www.divxclasico.com/foro/search.php?search_keywords=%searchvo&highlight=%searchvo',
            method: methodEncode,
            regreq: false,
            type: _TDOWN
        },
        allzine : { name: 'AllZine',
            icon: 'data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB7sACgm3AAoKtAAMDasACwuzAA0NrQAPDqoADQ6sABEPqAAMDLQADw+pAA8QpgAREKYAERGjAA8QqAAUEqEAEhKiABITnwAUE58AFBScABQUngAWFZoAFBaYABYVmwAWFpgAGBeVABYXlwAYGJQAFhiVABoYlAAaGZEAFxeZABoajgAaGpAAGhuNABkYmAAbGZQAGxyKAB0dhwAaHIwAHx2HABsdiQAdHYkAHR6GAB0fhQAiIX0AHB6KACEgggAhIX8AIiJ8ACgobgApKHAAMTDTADAw1gAxMtAAMzTKADU0ygAyMtIANzfBADU1yQA4NsUANjfFADg4wgA6Ob4AODm/ADY5wAA6OrwAPDu5ADc5wwA+PLcAOzq/ADo8uQA/PbQAPj21AD4+sgA8PbcAPD60AD4+tAA/PbgAQ0KpAENDpwBFRKQARkWhAEVEpgBGR58ASEmaAEpKmABRUIgAUlL4AFRU9ABUVfMAWFftAF9d3wBfXtwAYV/aAGFh1wBiYtQAZGTOAGZlzABmZc0AaGfHAGhnyQBoaMYAZmjHAGhpwwBpasAAaWrCAGtsvQBtbbkAcXKvAHR1qAByc7AAeXigAIGD/wCMiu4AjIvtAJGR3QCTk9kAlZbTAJ2fvgCrrf8Ara7/ALa2/wC5uP8AuLn/ALm8/wC9vv8Av77/AL+//wC/wP8AwMH/AMLC/wDCw/8AxMP/AMXE/wDGxf8Axsb/AMjG/wDGx/8AyMf/AMjI/wDJyv8Az876ANLT7wDU0/8A1tX/ANjZ/wDc2v8A3Nz/AN3e/wDf3v8A39//AOHg/wDj4v8A5OX/AOXm/wDm5v8A5uf/AOjn/wDq6P8A6On/AOrp/wDq6v8A7Oz/AOzt/wDt7f8A7e7/AO/u/wDv7/8A7/D/APDw/wDx8P8A8fH/APHy/wDz8v8A8/P/APT0/wD09v8A9vb/APb3/wD49/8A+Pj/APj5/wD6+f8A+vr/APv7/wD8/f8A/f3/AP/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtoxUgFNig6+5ury7sYRodrKCImEqICZsrLa3r3UqKTKygSaIpXQwHmGoqGIeKmuOsYArja6onEYUfmcYQn+ks7GALoaoqKB7EAYMTpmhqrWtfidpbGtmYD0AAV1ka293in0hUCoRDRkXBAIPIxwsVzFxH36WNAmSegNYkD4UlacqBQyFnjsFlHwLWZFDIZqwTwQGiaVDDUpMDDY8JC+jtocKCIurZUtHQQY5OEVWr7mrQhKFo5lJFHkGWjY/m664sHIdY5iTOg54W3k1N5eisLSfKEgbGhMMDRoWBwslM3C3plIeXF9NFV5qZkRAaW6PubBtLXOcVS2dqaZRUaaxuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D',
            search: 'http://www.allzine.org/Foro/index.php?action=search2&search=%searchtr&subject_only=1',
            method: methodEncode,
            regreq: true,
            type: _TDOWN
        },
        mcanime : { name: 'MCAnime',
            icon: 'http://www.mcanime.net/favicon.ico',
            search: 'http://www.mcanime.net/busqueda/google?cx=007892940784097042092:uruccpok3vu&cof=FORID:11&q=%searchvo',
            method: methodEncode,
            regreq: true,
            type: _TDOWN
        },
         patio : { name: 'Patio de Butacas',
            icon: 'http://www.patiodebutacas.org/foro/favicon.ico',
            search: 'http://www.patiodebutacas.org/foro/search.php?query=%searchvo&exactname=0&starteronly=0&forumchoice[]=0&prefixchoice[]=&childforums=1&titleonly=0&showposts=0&searchdate=0&beforeafter=after&sortby=lastpost&sortorder=descending&replyless=0&replylimit=0&searchthreadid=0&saveprefs=1&quicksearch=0&searchtype=1&nocache=0&ajax=0&userid=0&',
            method: methodEncode,
            regreq: true,
            type: _TDOWN
        },
        clansa : { name: 'Clan-Sudamérica',
            icon: 'http://www.clan-sudamerica.net/invision/favicon.ico',
            search: 'http://www.clan-sudamerica.net/invision/index.php?act=Search&CODE=show&searchid=827b042d37e3387690c2085b3dc9e1f5&search_in=posts&result_type=topics&highlite=%searchtr',
            method: methodEncode,
            regreq: true,
            type: _TDOWN
        },
        argenteam : { name: 'aRGENTeaM',
            icon: 'http://www.argenteam.net/static/images/favicon.ico',
            search: 'http://www.argenteam.net/search',
            method: methodEncode,
            regreq: true,
            type: _TDOWN
        },
        fileheaven : { name: 'fileheaven',
            icon: 'http://www.fileheaven.com/favicon.ico',
            search: 'http://www.fileheaven.org/forum/search.php?mode=results&search_keywords=%searchvo&search_terms=all&search_author=&search_forum=-1&search_time=0&search_fields=subjonly&search_cat=-1&sort_by=0&sort_dir=DESC&show_results=topics&return_chars=200',
            method: methodEncode,
            regreq: true,
            type: _TDOWN
        },
        taringa : { name: 'Taringa!',
            icon: 'http://i.t.net.ar/images/favicon.ico',
            search: 'http://www.taringa.net/buscador/?q=%searchvo&categoria=13&sort_by=0&autor=',
            method: methodEncode,
            type: _TDOWN
        },
        opensubtitles : { name: 'OpenSubtitles',
            icon: 'http://static.opensubtitles.org/favicon.ico',
            search: 'http://www.opensubtitles.com/es/search2/sublanguageid-spa/moviename-%searchvo',
            method: methodEncode,
            type: _TSUB
        },
        solosubtitulos : { name: 'solosubtitulos',
            icon: 'http://www.solosubtitulos.com/favicon.ico',
            search: 'http://www.solosubtitulos.com/?q=%searchvo',
            method: methodEscape,
            type: _TSUB
        },
        subdivx : { name: 'SubDivX',
            icon: 'http://www.subdivx.com/favicon.ico',
            search: 'http://www.subdivx.com/index.php?buscar=%searchvo&accion=5&subtitulos=1&realiza_b=1',
            method: methodEscape,
            type: _TSUB
        },
        titles : { name: 'titles.box.sk',
            icon: 'data:image/gif;base64,R0lGODlhEAAQAKEAAAAAAIfb9a7b9QAAACH5BAEKAAMALAAAAAAQABAAAAJOhI95wu18RJi0TmFEUCgIIwTcEQiGEBiTMRmBYAiBMRmTEQiGYBmWYHgEDIGH4REwBB4Gx8QwcRgcAUTAYXAEEAGHwWEJOA6PsmCEBhQAADs%3D',
            search: 'http://titles.box.sk/index.php?z3=%searchvo&rad1=an&aka=1&alt=1&jaz=9&z=datum+desc&days=0&pid=subt2&p=as&cas=1215777572&bt1=ADVANCED+SEARCH',
            method: methodEscape,
            type: _TSUB
        },
        daleya: {name: 'DaleYA',
            icon: 'http://www.daleya.com/Images/icons/cur.gif',
            search: 'http://www.daleya.com/?query=%searchvo{OPTIONS}',
            method:methodEscape,
            type: _TDOWN,
            options: {1:{name:'Megaupload',text:'megaupload.com'},
                2:{name:'Badongo',text:'badongo.com'},
                3:{name:'Rapidshare',text:'rapidshare.com'},
                4:{name:'Mediafire',text:'mediafire.com'},
                5:{name:'Gigasize',text:'gigasize.com'},
                6:{name:'SeriesYonkis',text:'seriesyonkis.com'},
                7:{name:'FileFactory',text:'filefactory.com'},
                8:{name:'FileFront',text:'filefront.com'},
                9:{name:'PeliculasYonkis',text:'peliculasyonkis.com'},
                10:{name:'TurboUpload',text:'turboupload.com'},
                11:{name:'Multiply',text:'multiply.com'},
                12:{name:'SendSpace',text:'sendspace.com'}
            } ,
            getOptions:function() {
                var tmp = "";
                for (opt in this.options) {
                    var option = this.options[opt];
                    if (getPreference(this.name + ".opt." + option.name, true)) {
                        tmp += "&daleyaid[]=" + opt;
                    }
                }
                return  tmp;
            }
        }
    };
    function $id(v) {
        return(d.getElementById(v));
    }
    /*
     getElementsByClassName
     Written by Jonathan Snook, http://www.snook.ca/jonathan
     Add-ons by Robert Nyman, http://www.robertnyman.com
     */
    function getElementsByClassName(oElm, strTagName, strClassName) {
        var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm.getElementsByTagName(strTagName);
        var arrReturnElements = new Array();
        strClassName = strClassName.replace(/\-/g, "\\-");
        var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
        var oElement;
        for (var i = 0; i < arrElements.length; i++) {
            oElement = arrElements[i];
            if (oRegExp.test(oElement.className)) {
                arrReturnElements.push(oElement);
            }
        }
        return (arrReturnElements);
    }
    function formatDate(fDate) {
        if (typeof fDate != 'undefined') {
            var yyyy = fDate.getFullYear();
            var m = fDate.getMonth() + 1;
            var d = fDate.getDate();
            var h = fDate.getHours();
            var n = fDate.getMinutes();
            var nn = n < 10 ? "0" + n : n;
            var s = fDate.getSeconds();
            var ss = s < 10 ? "0" + s : s;
            return d + "/" + m + "/" + yyyy + " a las " + h + ":" + nn + ":" + ss;
        } else {
            return "";
        }
    }
    function deFormatDate(cadena) {
        var date = new Date();
        var dia = cadena.split('/')[0];
        var mes = cadena.split('/')[1];
        var anio = cadena.split('/')[2].split(" ")[0];
        var hora = cadena.split(' ')[3].split(":")[0];
        var minuto = cadena.split(':')[1];
        var segundo = cadena.split(':')[2];
        date.setFullYear(anio, mes - 1, dia);
        date.setHours(hora, minuto, segundo, 0);
        return date;
    }
    function inArray(a, property, value) {
        if (property != "") property = "." + property;
        for (var ix in a) {
            var v = eval('a[' + ix + ']' + property);
            if (typeof v != "undefined") {
                if (v == value) return ix;
            }
        }
        return false;
    }
    function inArray2(a, property, value, p2, value2) {
        if (property != "") property = "." + property;
        if (p2 != "") p2 = "." + p2;
        for (var ix in a) {
            var v = eval('a[' + ix + ']' + property);
            var v2 = eval('a[' + ix + ']' + p2);
            if (typeof v != "undefined") {
                if (v == value && value2 == v2) return ix;
            }
        }
        return false;
    }
    function arrayReplace(a, property, obj) {
        for (var ix in a) {
            var v = eval('a[' + ix + '].' + property);
            var value = eval("obj." + property);
            if (typeof v != "undefined") {
                if (v == value) {
                    a[ix] = obj;
                }
            }
        }
        return a;
    }
    function findNodes(context, xpath) {
        return d.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    }
    function findNodesArray(context, xpath) {
        var nodes = [];
        var node;
        var iterator = findNodes(context, xpath);
        while ((node = iterator.iterateNext()) != null) {
            nodes.push(node);
        }
        return nodes;
    }
    
	function replaceAll( text, busca, reemplaza ){
  		while (text.toString().indexOf(busca) != -1)
      		text = text.toString().replace(busca,reemplaza);
  			return text;
	}

    function doPost(url, data, cb) {
        GM_xmlhttpRequest({
            method: "POST",
            url: url,
            headers:{'Content-type':'application/x-www-form-urlencoded'},
            data:encodeURI(data),
            onload: function(xhr) {
                cb(xhr.responseText);
            },
            onerror: function (details) {
                log("Error en el Post");
                log(" Status: " + details.status);
                log(" Status Text: " + details.statusText);
                log(" Response headers: " + details.responseHeaders);
                log(" Response Text: " + details.responseText);
            }
        });
    }
    function doGet(url, cb) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(xhr) {
                cb(xhr.responseText);
            }
        });
    }
    function log(msg) {
        debuglog += '<br/>' + msg;
        // Si tenemos Firebug --> 
        //        if(unsafeWindow.console){
        //              unsafeWindow.console.log(msg);
        //      } else {
        GM_log(msg);
        //      }
    }
    function setPreference(name, value) {
        GM_setValue(userId + '.cfg.' + name, value);
    }
    function getPreference(name, def) {
        def = (typeof def == "undefined") ? false : def;
        var r = GM_getValue(userId + '.cfg.' + name);
        return (typeof r == "undefined") ? def : r;
    }
    function getValues(start) {
        var result = new Array();
        var values = GM_listValues();
        for (ix in values) {
            var name = values[ix];
            if (name.indexOf(start) == 0) {
                result.push(name.substr(start.length));
            }
        }
        return result;
    }
    function deleteValues(start) {
        var values = GM_listValues();
        for (var ix in values) {
            var name = values[ix];
            if (name.indexOf(start) == 0) {
                GM_deleteValue(name);
            }
        }
    }
    function showLog() {
        GM_addStyle('#backgroundLayer { width: 100%; height: 100%; background-color: black; position: fixed; left: 0; right: 0; top: 0; bottom: 0; opacity: .7; }');
        GM_addStyle('#board { color: black; background-color: #def; text-align: left; border: 4px solid gray; width: 50%; height: 70%; opacity: 1; margin: auto; position: fixed; left: 0; right: 0; top: 0; bottom: 0; overflow: auto; }');
        var background = d.createElement('DIV');
        background.id = 'backgroundLayer';
        var board = d.createElement('div');
        board.id = 'board';
        board.innerHTML = '<code>' + debuglog + '</code>';
        d.body.appendChild(background);
        d.body.appendChild(board);
        $id("backgroundLayer").addEventListener("click", hideLog, true);
    }
    function hideLog() {
        d.body.removeChild($id('board'));
        d.body.removeChild($id('backgroundLayer'));
    }
   function showBAFTA(){
        var anio = prompt('Año (1948-2013)'); 	
        var aux = parseInt(anio);
        if(aux > 1947 && aux < 2014)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=bafta&year=" + aux;          
    }
   function showBerlin(){
        var anio = prompt('Año (1951-2013)'); 	
        var aux = parseInt(anio);
        if(aux > 1950 && aux < 2014)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=berlin&year=" + aux;          
    }
   function showCannes(){
        var anio = prompt('Año (1939-2013)'); 	
        var aux = parseInt(anio);
        if(aux > 1945 && aux < 2014 && aux != 1948 && aux != 1950 && aux != 1968 || aux == 1939)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=cannes&year=" + aux;          
    }
   function showCineEuropeo(){
        var anio = prompt('Año (1988-2012)'); 	
        var aux = parseInt(anio);
        if(aux > 1987 && aux < 2013)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=european&year=" + aux;          
    }
   function showGijon(){
        var anio = prompt('Año (1994-2012)'); 	
        var aux = parseInt(anio);
        if(aux > 1993 && aux < 2013)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=gijon&year=" + aux;          
    }
   function showEmmy(){
        var anio = prompt('Año (1949-2013)'); 	
        var aux = parseInt(anio);
        if(aux > 1948 && aux < 2014)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=emmy&year=" + aux;          
    }
    function showGoldenGlobe(){
        var anio = prompt('Año (1944-2013)'); 	
        var aux = parseInt(anio);
        if(aux > 1943 && aux < 2014)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=goldenglobes&year=" + aux;          
    }
    function showGoya(){
        var anio = prompt('Año (1987-2013)'); 	
        var aux = parseInt(anio);
        if(aux > 1986 && aux < 2014)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=goya&year=" + aux;          
    }
   function showMalaga(){
        var anio = prompt('Año (1998-2013)'); 	
        var aux = parseInt(anio);
        if(aux > 1997 && aux < 2014)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=malaga&year=" + aux;          
    }
	function showRazzie(){
        var anio = prompt('Año (1981-2013)'); 	
        var aux = parseInt(anio);
        if(aux > 1980 && aux < 2014)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=razzie&year=" + aux;          
    }
	
    function showSevilla(){
        var anio = prompt('Año (2004-2012)'); 	
        var aux = parseInt(anio);
        if(aux > 2003 && aux < 2013)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=sevilla&year=" + aux;          
    }
   function showSS(){
        var anio = prompt('Año (1953-2012)'); 	
        var aux = parseInt(anio);
        if(aux > 1952 && aux < 2013)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=ss&year=" + aux;          
    }
    function showSitges(){
        var anio = prompt('Año (1971-2013)'); 	
        var aux = parseInt(anio);
        if(aux > 1970 && aux < 2014)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=sitges&year=" + aux;          
    }
    function showSpirit(){
        var anio = prompt('Año (1986-2013)'); 	
        var aux = parseInt(anio);
        if(aux > 1985 && aux < 2014)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=spirit&year=" + aux;          
    }
	function showSundance(){
        var anio = prompt('Año (1985-2013)'); 	
        var aux = parseInt(anio);
        if(aux > 1984 && aux < 2014)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=sundance&year=" + aux;          
    }
	function showTribeca(){
        var anio = prompt('Año (2002-2013)'); 	
        var aux = parseInt(anio);
        if(aux > 2001 && aux < 2014)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=tribeca&year=" + aux;          
    }
	
    function showValladolid(){
        var anio = prompt('Año (1960-2012)'); 	
        var aux = parseInt(anio);
        if(aux > 1959 && aux < 2013)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=seminci&year=" + aux;          
    }
    function showVenecia(){
        var anio = prompt('Año (1947-2012)'); 	
        var aux = parseInt(anio);
        if(aux > 1946 && aux < 2013)
			location.href = "http://www.filmaffinity.com/es/awards.php?award_id=venice&year=" + aux;          
    }
    function goToHomepage() {
        location.href = homepage;
    }
    function isFlagImg(img) {
        return img.src.search(/\/countries\//ig) > -1;
    }
    function inSection(section) {
        return url.search(eval(sections[section])) > -1;
    }
    function inSections(s) {
        var value = false;
        var i = 0;
        while (!value && i < s.length) {
            value = url.search(eval(sections[s[i]])) > -1;
            i++;
        }
        return value;
    }
    /* Paises / contienentes
     Sacado de http://en.wikipedia.org/wiki/List_of_countries_by_continent_(data_file)
     */
    var continents = {
        "América del Norte":["AI","AG","AW","BS","BB","BZ","BM","VG","CA","KY","CR","CU","DM","DO","SV","GL","GD","GP","GT","HT","HN","JM","MQ","MX","MS","AN","NI","PA","PR","BL","KN","LC","MF","PM","VC","TT","TC","US","VI"],
        Europa:["ZX","LE","RR","ZY","YU","AX","AL","AD","AT","BY","BE","BA","BG","HR","CZ","DK","EE","FO","FI","FD","FF","FR","DE","GI","GR","GG","VA","HU","IS","IE","IM","IT","JE","LV","LI","LT","LU","MK","MT","MD","MC","ME","NL","NO","PL","PT","RO","RU","SM","RS","SK","SI","ES","SJ","SE","CH","UA","GB"],
        "América del Sur":["AR","BO","BR","CL","CO","EC","FK","GF","GY","PY","PE","SR","UY","VE"],
        Oceanía:["AS","AU","CK","FJ","PF","GU","KI","MH","FM","NR","NC","NZ","NU","NF","MP","PW","PG","PN","WS","SB","TK","TO","TV","UM","VU","WF"],
        Asia:["AF","AM","AZ","BH","BD","BT","IO","BN","KH","CN","CX","CC","CY","GE","HK","IN","ID","IR","IQ","IL","JP","JO","KZ","KP","KR","KW","KG","LA","LB","MO","MY","MV","MN","MM","NP","OM","PK","PS","PH","QA","SA","SG","LK","SY","TW","TJ","TH","TL","TR","TM","AE","UZ","VN","YE"],
        África:["DZ","AO","BJ","BW","BF","BI","CD","CM","CV","CF","TD","KM","CG","CI","DJ","EG","GQ","ER","ET","GA","GM","GH","GN","GW","KE","LS","LR","LY","MG","MW","ML","MR","MU","YT","MA","MZ","NA","NE","NG","RE","RW","SH","ST","SN","SC","SL","SO","ZA","SD","SZ","TZ","TG","TN","UG","EH","ZM","ZW"]
    };
    var distribuciones = {
        "Lingüístico": {nombre: "Lingüístico",tipo:DIST_REGIONS,autor:"zopilote",descripcion:"", data :{
            "Lenguas románicas":['BJ','CV','CI','GA','GW','GQ','GN','MU','ST','SC','BZ','CR','CU','SV','GT','HT','HN','MX','NI','PA','PR','DO','AR','BO','BR','CL','CO','EC','PY','PE','SR','UY','VE','AD','BE','ES','FR','IT','MD','MC','PT','RO','SM','CH'],
            "Lenguas germánicas":['GH','LR','SL','ZA','AG','BS','BB','CA','US','US','GD','JM','TT','US','FD','FF','FD','FF','DE','AT','DK','NL','IE','IS','LI','NO','FD','GB','GB','FF','SE','AU','NZ'],
            "Lenguas eslavas":['BA','BG','ZX','HR','SK','SI','MK','ME','PL','CZ','RU','RR','RS','UA','ZY','ZY','ZY','YU'],
            "Lenguas urálicas":['EE','FI','HU'],
            "Lenguas bálticas":['LE','LT'],
            "Lenguas indo-iranias":['AF','BD','IN','IR','MV','NP','PK','LK','TJ'],
            "Lenguas sino-tibetanas":['BT','CN','HK','MM','TW'],
            "Lenguas austronesias":['BN','PH','ID','MY','FJ'],
            "Lenguas tai-kadai":['KH','TH'],
            "Lenguas altaicas":['AZ','KP','KR','JP','KZ','KG','MN','TM','TR','UZ'],
            "Lenguas afroasiáticas":['DZ','TD','EG','ER','ET','LY','MA','MR','NE','SO','SD','TN','SA','BH','AE','IQ','IL','JO','KW','LB','OM','QA','SY','PS','YE'],
            "Indefinida / Otras":['AO','BW','BF','BI','CM','KM','CG','GM','KE','LS','MG','MW','ML','MZ','NA','NG','CF','RW','SN','SZ','TZ','TG','UG','ZM','ZW','DM','GY','AM','CY','GE','LA','SG','VN','AL','GR','LU','MT','MH','FM','PW','PG','WS','VU']}
        },
        "Cultural - Euroasiaticocéntrico": {nombre: "Cultural - Euroasiaticocéntrico",tipo:DIST_REGIONS,autor:"VicenteJavier",descripcion:"", data :{
            'Europeo Latino':['AD','ES','FR','IT','MT','MC','PT','SM'],'Europeo Central':['FD','FF','FD','FF','DE','AT','BE','NL','HU','LI','LU','PL','FD','CZ','FF','CH'],'Europeo Nórdico':['DK','FI','IS','NO','SE'],'Europeo Soviético':['AM','AZ','GE','KZ','KG','TJ','TM','UZ','EE','LE','LT','MD','RU','UA','ZY','ZY','ZY'],'Europeo Balcánico':['CY','AL','BA','BG','ZX','HR','SK','SI','GR','MK','ME','RO','RR','RS','YU'],'Asiático Oeste':['AF','SA','BH','AE','IQ','IR','IL','JO','KW','LB','OM','QA','SY','PS','TR','YE'],'Asiático Indostánico':['BD','BT','IN','MV','NP','PK','LK'],'Asiático Chino':['CN','HK','MN','TW'],'Asiático Sudeste':['BN','KH','PH','ID','LA','MY','MM','SG','TH','VN'],'Asiático Japonés':['JP'],'Asiático Coreano':['KP','KR'],'Anglo-sajón Británico':['IE','GB','GB'],'Anglo-sajón Norteamericano':['AG','BS','BB','CA','DM','US','US','GD','HT','JM','PR','TT','US','SR'],'Anglo-sajón Oceánico':['AU','FJ','MH','FM','NZ','PW','PG','WS','VU'],'Latinoamericano':['BZ','CR','CU','SV','GT','HN','MX','NI','PA','DO','AR','BO','BR','CL','CO','EC','PY','PE','UY','VE'],'Africano':['AO','DZ','BJ','BW','BF','BI','CV','CM','TD','KM','CG','CI','EG','ER','ET','GA','GM','GH','GW','GQ','GN','KE','LS','LR','LY','MG','MW','ML','MA','MU','MR','MZ','NA','NE','NG','CF','RW','ST','SN','SC','SL','SO','SD','ZA','SZ','TZ','TG','TN','UG','ZM','ZW']
        }},
        "Continental Simplificado": {nombre: "Continental Simplificado",tipo:DIST_REGIONS,autor:"Multifolio",descripcion:"", data :{
            'África':['AO','DZ','BJ','BW','BF','BI','CV','CM','TD','KM','CG','CI','EG','ER','ET','GA','GM','GH','GW','GQ','GN','KE','LS','LR','LY','MG','MW','ML','MA','MU','MR','MZ','NA','NE','NG','CF','RW','ST','SN','SC','SL','SO','SD','ZA','SZ','TZ','TG','TN','UG','ZM','ZW'],'América':['AG','BS','BB','BZ','CA','CR','CU','DM','US','SV','US','GD','GT','HT','HN','JM','MX','NI','PA','PR','DO','TT','US','AR','BO','BR','CL','CO','EC','GY','PY','PE','SR','UY','VE'],'Asia':['AF','SA','AM','AZ','BH','BD','BN','BT','KH','CN','CY','KP','KR','AE','PH','GE','HK','IN','ID','IQ','IR','IL','JP','JO','KZ','KG','KW','LA','LB','MY','MV','MN','MM','NP','OM','PK','QA','SG','SY','LK','TH','TW','TJ','PS','TM','TR','UZ','VN','YE'],'Europa':['AL','FD','FF','FD','FF','DE','AD','AT','BE','BA','BG','ZX','HR','DK','SK','SI','ES','EE','FI','FR','GR','NL','HU','IE','IS','IT','LE','LI','LT','LU','MK','MT','MD','MC','ME','NO','PL','PT','FD','GB','GB','CZ','FF','RO','RU','SM','RR','RS','SE','CH','UA','ZY','ZY','ZY','YU'],'Oceanía':['AU','FJ','MH','FM','NZ','PW','PG','WS','VU']
        }}
    };
    var genCodes = {
        "Acción":"AC","Animación":"AN","Aventuras":"AV","Bélico":"BE","Ciencia ficción":"CF",
        "Cine negro":"CN","Comedia":"CO","Desconocido":"DE","Documental":"DO","Drama":"DR",
        "Fantástico":"FN","Infantil":"IF","Intriga":"IT","Musical":"MU","Romance":"RO","Serie de TV":"TV",	
        "Terror":"TE","Thriller":"TH","Western":"WE"
    };
    var anioCodes = {
        "1900 - 1929":"A1","1930 - 1939":"A2","1940 - 1949":"A3","1950 - 1959":"A4","1960 - 1969":"A5",
        "1970 - 1979":"A6","1980 - 1989":"A7","1990 - 1999":"A8","2000":"2A","2001":"2B","2002":"2C",
        "2003":"2D","2004":"2E","2005":"2F","2006":"2G","2007":"2H","2008":"2I","2009":"2J","2010":"2K",
        "2011":"2L","2012":"2M","2013":"2N"
    };
    var countriesCodes = {
        "Afganistán":"AF","Albania":"AL","Alemania del Este (RDA)":"FD","Alemania del Oeste (RFA)":"FF",
        "Alemania del Este":"FD","Alemania del Oeste":"FF",
        "Alemania":"DE","Andorra":"AD","Angola":"AO","Antigua y Barbuda":"AG","Arabia Saudí":"SA",
        "Argelia":"DZ","Argentina":"AR","Armenia":"AM","Australia":"AU","Austria":"AT","Azerbaijan":"AZ",
        "Bahamas":"BS","Bahrein":"BH","Bangladesh":"BD","Barbados":"BB","Bélgica":"BE","Belize":"BZ",
        "Benín":"BJ","Bielorusia":"BY","Bolivia":"BO","Bosnia y Herzegovina":"BA","Botswana":"BW","Brasil":"BR",
        "Brunei":"BN","Bulgaria":"BG","Burkina Faso":"BF","Burundi":"BI","Bután":"BT","Cabo Verde":"CV",
        "Camboya":"KH","Camerún":"CM","Canadá":"CA","Chad":"TD","Checoslovaquia":"ZX","Chile":"CL",
        "China":"CN","Chipre":"CY","Colombia":"CO","Comores":"KM","Congo":"CG","Corea del Norte":"KP",
        "Corea del Sur":"KR","Costa de Marfil":"CI","Costa Rica":"CR","Croacia":"HR","Cuba":"CU","Dinamarca":"DK",
        "Dominica":"DM","Ecuador":"EC","EEUU":"US","Egipto":"EG","El Salvador":"SV","Emiratos Árabes":"AE",
        "Eritrea":"ER","Eslovaquia":"SK","Eslovenia":"SI","España":"ES","Estados Unidos":"US","Estonia":"EE",
        "Etiopía":"ET","Fidji":"FJ","Filipinas":"PH","Finlandia":"FI","Francia":"FR","Gabón":"GA",
        "Gambia":"GM","Georgia":"GE","Ghana":"GH","Granada":"GD","Grecia":"GR","Groenlandia":"GL", "Guatemala":"GT",
        "Guinea Bissau":"GW","Guinea Ecuatorial":"GQ","Guinea":"GN","Guyana":"GY","Haití":"HT","Países Bajos (Holanda)":"NL",
        "Honduras":"HN","Hong Kong":"HK","Hungría":"HU","India":"IN","Indonesia":"ID","Irak":"IQ","Irán":"IR",
        "Irlanda":"IE","Islandia":"IS","Israel":"IL","Italia":"IT","Jamaica":"JM","Japón":"JP","Jordania":"JO",
        "Kazajstán":"KZ","Kenia":"KE","Kirguizstán":"KG","Kuwait":"KW","Laos":"LA","Lesotho":"LS",
        "Letonia":"LE","Líbano":"LB","Liberia":"LR","Libia":"LY","Liechtenstein":"LI","Lituania":"LT",
        "Luxemburgo":"LU","Macedonia":"MK","Madagascar":"MG","Malasia":"MY","Malawi":"MW",
        "Maldivas":"MV","Mali":"ML","Malta":"MT","Marruecos":"MA","Marshall (Islas)":"MH","Mauricio (Isla)":"MU",
        "Mauritania":"MR","México":"MX","Micronesia":"FM","Moldavia":"MD","Mónaco":"MC",
        "Mongolia":"MN","Montenegro":"ME","Mozambique":"MZ","Myanmar - Birmania":"MM","Namibia":"NA",
        "Nepal":"NP","Nicaragua":"NI","Níger":"NE","Nigeria":"NG","Noruega":"NO","Nueva Zelanda":"NZ",
        "Omán":"OM","Palau":"PW","Panamá":"PA","Papuasia Nueva Guinea":"PG","Paquistán":"PK","Paraguay":"PY",
        "Perú":"PE","Polonia":"PL","Portugal":"PT","Puerto Rico":"PR","Qatar":"QA","RDA":"FD",
        "Reino Unido":"GB","GB":"GB","Rep. Centroafricana":"CF","Rep. Dominicana":"DO","República Checa":"CZ","República del Congo":"CD","RFA":"FF",
        "Ruanda":"RW","Rumanía":"RO","Rusia":"RU","Samoa":"WS","San Marino":"SM","Santo Tomé y Príncipe":"ST",
        "Senegal":"SN","Serbia y Montenegro":"RR","Serbia":"RS","Seychelles":"SC","Sierra Leona":"SL","Singapur":"SG",
        "Siria":"SY","Somalia":"SO","Sri Lanka":"LK","Sudán":"SD","Suecia":"SE","Suiza":"CH","Sudáfrica":"ZA",
        "Surinam":"SR","Swazilandia":"SZ","Tailandia":"TH","Taiwán":"TW","Tajikistan":"TJ","Tanzania":"TZ",
        "Territorios Palestinos":"PS","Togo":"TG","Trinidad y Tobago":"TT","Túnez":"TN","Turkmenistán":"TM","Turquía":"TR",
        "Ucrania":"UA","Uganda":"UG","Unión Soviética (URSS)":"ZY","Unión Soviética":"ZY","URSS":"ZY","Uruguay":"UY",
        "USA":"US","Uzbekistan":"UZ","Vanuatú":"VU","Venezuela":"VE","Vietnam":"VN","Yemen":"YE",
        "Yugoslavia":"YU","Zambia":"ZM","Zimbabwe":"ZW"
    };
    var countriesSpanish = {
        "Argentina":"AR","Bolivia":"BO","Chile":"CL","Colombia":"CO"
        ,"Costa Rica":"CR","Cuba":"CU","Ecuador":"EC","El Salvador":"SV"
        ,"España":"ES","Guatemala":"GT","Guinea Ecuatorial":"GQ","Honduras":"HN"
        ,"México":"MX","Nicaragua":"NI","Panamá":"PA","Paraguay":"PY",
        "Perú":"PE","Puerto Rico":"PR","Rep. Dominicana":"DO","Venezuela":"VE"
    };
    function getCountryCode(country) {
        return countriesCodes[country];
    }
    function getGenCode(genre) {
        return genCodes[genre];
    }
    function getAnioCode(anio) {
        return anioCodes[anio];
    }
    function getContinent(countryCode) {
        for (var continent in continents) {
            if (inArray(continents[continent], '', countryCode)) return continent;
        }
        return 'NA';
    }
    function getRegion(distribucion, countryCode) {
        var dist = distribuciones[distribucion].data;
        for (var region in dist) {
            if (inArray(dist[region], '', countryCode)) return region;
        }
        return 'NA';
    }
    // ************************ PREFERENCIAS *********************************************
    function preferences() {
        function showPreferences() {
            log("Mostrar preferencias");
            GM_addStyle('#backgroundLayer { width: 100%; height: 100%; background-color: black; position: fixed; left: 0; right: 0; top: 0; bottom: 0; opacity: .7; }');
            GM_addStyle('#fap_prefs { color: black; background-color: #def; text-align: center; border: 4px solid gray; width: 70%; height: 90%; opacity: 1; margin: auto; position: fixed; left: 0; right: 0; top: 0; bottom: 0; overflow: auto; }');
            GM_addStyle('#fap_prefs>#closeButton { width: 22px; height: 22px; margin: 0; padding: 0; position: absolute; right: 0; top: 0; background-image: url(' + closeimg + '); opacity: .5; }');
            GM_addStyle('#fap_prefs>#closeButton:hover { opacity: 1; }');
            GM_addStyle('#fap_prefs>h1 { font-size: x-large; }');
            GM_addStyle('#fap_prefs>h2 { font-size: large; font-style: italic; }');
            GM_addStyle('#fap_prefs>table { border: 1; margin-left: auto; margin-right: auto; }');
            GM_addStyle('#fap_prefs>table>caption { border: 1; margin-left: auto; margin-right: auto; }');
            GM_addStyle('#fap_prefs>button { margin: 2em; }');
            GM_addStyle('#fap_prefs img { width: 16px; height: 16px; }');
            GM_addStyle('#fap_prefs th { background-color: black; color: white; font-style: italic; }');
            GM_addStyle('#fap_prefs>table { border: 1px solid black; }');
            GM_addStyle('#fap_prefs td.sites { border: 1px solid black; }');
            GM_addStyle('#fap_prefs label:hover { text-decoration: none; }');
            GM_addStyle('#fap_prefs .puntuacion { width: 300px; margin-left: auto; margin-right: auto; }');
            GM_addStyle('#fap_prefs legend { font-weight: bold; }');
            GM_addStyle('#fap_prefs .regreq { font-weight: bold; color: red }');
            GM_addStyle('#fap_prefs .viewSuboptions {margin-left:4px;cursor:pointer;width:9px;height:9px;}');
            GM_addStyle('#fap_prefs .subOptions {background-color:#eef;display:none;border:1px solid black;margin-left:10%;font-size:90%;}');
            var background = d.createElement('DIV');
            background.id = 'backgroundLayer';
            d.body.appendChild(background);
            var prefs = d.createElement('DIV');
            var iconTemplate = '<img src="{ICON}" alt="icono de {NAME}" title="{TITLE}"/>';
            var linkTemplate = '<label title="{TITLE}"><input type="checkbox" name="{NAME}" checked></input>{ICON}&nbsp;{NAME}{REGISTRO}</label>{OPTIONS}</br>';
            var subOptionTemplate = '<label title="{NAME}"><input type="checkbox" name="{NAME}" checked></input>{TEXT}</label><br/>';
            var optTemplate = '<tr><td colspan=4><label><input type="checkbox" name="{NAME}" {CHECKED}>{TEXT}</label></td></tr>';
            prefs.id = 'fap_prefs';
            var tmp = '<div id="closeButton" title="Cierra el panel de configuraci&oacute;n"></div>';
            tmp += '<h2>Panel de configuraci&oacute;n ' + appName + ' versi&oacute;n ' + appVersion + '</h2>';
            tmp += '<table>';
            tmp += '<thead><tr>';
            tmp += '<th><label><input type="checkbox" name="verCine" checked>Cine</label></th>';
            tmp += '<th><label><input type="checkbox" name="verGeneral" checked>General</label></th>';
            tmp += '<th><label><input type="checkbox" name="verDescargas" checked>Descargas</label></th>';
            tmp += '<th><label><input type="checkbox" name="verSubtitulos" checked>Subtitulos</label></th>';
            tmp += '</thead><tbody><tr valign="top">';
            var types = [_TFILM, _TGEN, _TDOWN, _TSUB];
            for (var t in types) {
                tmp += '<td class="sites">';
                for (var i in linkSites) {
                    if (linkSites[i].type == types[t]) {
                        var name = linkSites[i].name;
                        var title = name;
                        if (linkSites[i].regreq) title += ' (requiere registro)';
                        var text = linkTemplate.replace(/{ICON}/g, iconTemplate);
                        text = text.replace(/{ICON}/g, linkSites[i].icon).replace(/{NAME}/g, name);
                        text = text.replace(/{TITLE}/g, (linkSites[i].regreq) ? name + ' (requiere registro' : name);
                        text = text.replace(/{REGISTRO}/g, (linkSites[i].regreq) ? ' <span class="regreq">(*)</span>' : '');
                        if (linkSites[i].search.indexOf("{OPTIONS}") > -1) {
                            var htmlOptions = '<img src=' + img_plus + ' id= "' + name + '" class="viewSuboptions"><div class="subOptions" id="subOptions' + name + '" style="display:none;">';
                            for (var j in linkSites[i].options) {
                                var option = linkSites[i].options[j];
                                htmlOptions += subOptionTemplate.replace(/{NAME}/g, name + ".opt." + option.name).replace(/{TEXT}/g, option.text);
                            }
                            text = text.replace(/{OPTIONS}/g, htmlOptions + '</div>');
                        } else {
                            text = text.replace(/{OPTIONS}/g, "");
                        }
                        tmp += text;
                    }
                }
                tmp += '</td>';
            }
            tmp += '</tr>';
            tmp += optTemplate.replace(/{NAME}/g, 'newwindow').replace(/{TEXT}/g, 'Abrir enlaces en una nueva pestaña');
            tmp += '<tr><td colspan=4>Los sitios marcados con <span class="regreq">(*)</span> requieren registro.</td></tr>';
            tmp += '<tr><td colspan="4"><fieldset><legend>Posici&oacute;n de los enlaces a webs externas</legend>';
            tmp += '<label><input type="radio" name="linksPosition" value="default">Integrados en la ficha de la pelicula</input></label>&nbsp;&nbsp;&nbsp;';
            tmp += '<label><input type="radio" name="linksPosition" value="inTitle">En el título de la pelicula</input></label>';
            //tmp += '<label><input type="radio" name="linksPosition" value="inPanel">Panel derecho, debajo de la puntuaci&oacute;n</input></label>';
            tmp += '</fieldset><hr></td></tr>';
            //Obtener Id propia
            var idfinal = getPreference('idinput', 000000); 
            tmp += '<tr><td colspan=4><label>Introduce tu ID de usuario: <input type="text" size ="7" value="' + idfinal + '" name="idinput"></label></td></tr>';
            
            tmp += '<tr height="18"><td align="center" bgcolor="#008000" colspan="4"><font color="#ffffff">Opciones de Menús</font></td></tr>';
            // Nuevas preferencias
            	    
            for (pref in preferencesOptions) {
				if(pref == 3)
					tmp += '<tr height="18"><td align="center" bgcolor="#008000" colspan="4"><font color="#ffffff">Opciones de Listas</font></td></tr>';
				if(pref == 8)
					tmp += '<tr height="18"><td align="center" bgcolor="#008000" colspan="4"><font color="#ffffff">Opciones de Mis Datos</font></td></tr>';
				if(pref == 10){
					var nusuarios = getPreference('nusers', 20);
					tmp += '<tr><td colspan=4><label>Número de usuarios a mostrar en Clasificaciones: (10-100) <input type="text" size ="5" value="' + nusuarios + '" name="nusers"></label></td></tr>';
					}
				if(pref == 13){
					tmp += '<tr height="18"><td align="center" bgcolor="#008000" colspan="4"><font color="#ffffff">Opciones de Mis amigos</font></td></tr>';
					//var ret_tiempo = getPreference('retardoamigos', 750);
					//tmp += '<tr><td colspan=4><label>Retardo al mostrar amigos (mínimo 200 ms):  <input type="text" size ="5" value="' + ret_tiempo + '" name="retardoamigos"> ms.</label></td></tr>';
					tmp += optTemplate.replace(/{NAME}/g, 'abriramigos').replace(/{TEXT}/g, 'Abrir votaciones/críticas/listas de amigos en una nueva pestaña');
					tmp += '<tr height="18"><td align="center" bgcolor="#008000" colspan="4"><font color="#ffffff">Otras opciones</font></td></tr>';
					}
									
                t = optTemplate.replace(/{NAME}/g, preferencesOptions[pref].name).replace(/{TEXT}/g, preferencesOptions[pref].text);
                tmp += t.replace(/{CHECKED}/g, preferencesOptions[pref].def ? 'checked' : '');
            }
            // Limite en recomendaciones y TOPs
            var limite = getPreference('limit', 20);
            tmp += '<tr><td colspan=4><label>N&deg; de pel&iacute;culas a mostrar en Recomendaciones y TOP: <input type="text" size ="5" value="' + limite + '" name="limit"></label></td></tr>';
            tmp += '</tbody></table>';
            tmp += '<br/><fieldset class="puntuacion"><legend>Estilo de las puntuaciones</legend><div style="text-align: left"><label><input type="radio" name="ratingStyle" value="default" >Estilo por defecto</input></label><br/>';
            for (t in ratingStyles) {
                tmp += '<label><input type="radio" name="ratingStyle" value="' + ratingStyles[t].code + '">' + ratingStyles[t].name + ': <img src="' + ratingStyles[t].iconOn + '"><img src="' + ratingStyles[t].iconOn + '"><img src="' + ratingStyles[t].iconOn + '"><img src="' + ratingStyles[t].iconHalf + '"><img src="' + ratingStyles[t].iconOff + '"><img src="' + ratingStyles[t].iconOff + '"></input></label><br/>';
            }
            tmp += '</div></fieldset>';
            tmp += '<button id="saveButton" title="Guarda las preferencias y cierra el panel de configuraci&oacute;n">Guardar preferencias</button>';
            prefs.innerHTML += tmp;
            d.body.appendChild(prefs);
            $id("saveButton").addEventListener("click", savePreferences, true);
            $id("closeButton").addEventListener("click", hidePreferences, true);
            $id("backgroundLayer").addEventListener("click", hidePreferences, true);
            
            loadPreferences();
            setSubOptionsEvents();
            log("-mostradas preferencias");
        }
        function showSubOptionPanel() {
            var element = $id("subOptions" + this.id);
            if (element.style.display != 'none') {
                element.style.display = "none";
                this.src = img_plus;
            } else {
                element.style.display = "block";
                this.src = img_minus;
            }
        }
        function setSubOptionsEvents() {
            var imagenes = getElementsByClassName(d, "img", "viewSuboptions");
            for (i in imagenes) {
                var img = imagenes[i];
                img.addEventListener("click", showSubOptionPanel, false);
            }
        }
        // Por ahora solo los radio, preparar para todos
        function loadPreferences() {
            var xpath = 'id("fap_prefs")//input';
            var nodo;
            var iterator = findNodes(d, xpath);
            while ((nodo = iterator.iterateNext()) != null) {
                var valor = getPreference(nodo.name, "undefined");
                switch (nodo.type) {
                    case "checkbox":nodo.checked = (valor != "undefined") ? valor : nodo.checked; break;
                    //case "text":nodo.value = (valor != "undefined") ? valor : "";break;
                    case "radio":nodo.checked = (valor != "undefined") ? (nodo.value == valor) : (nodo.value == "default");break;
                }
            }
        }
        function savePreferences() {
            var xpath = 'id("fap_prefs")//input';
            var iterator = findNodes(d, xpath);
            var nodo = null;
            while (nodo = iterator.iterateNext()) {
                switch (nodo.type) {
                    case "checkbox":setPreference(nodo.name, nodo.checked);break;
                    case "text":setPreference(nodo.name, nodo.value);break;
                    case "radio":if (nodo.checked) {
                        setPreference(nodo.name, nodo.value);
                    };break;	    
                }
            }
            alert('Los cambios tendrán efecto al recargar la página.');
            hidePreferences();
        }
        function hidePreferences() {
            d.body.removeChild($id('fap_prefs'));
            d.body.removeChild($id('backgroundLayer'));
        }
        showPreferences();       
        // ************************ FIN PREFERENCIAS *********************************************
    }
    // Coloca enlaces a las paginas de los amigos
    function addFriendsLinks() {
        var friendsTable = "//span[text()='Nombre/Nick']/ancestor::*[position()=4]".findNode();
        var votesTpl = "<a class='lnk3' href='http://www.filmaffinity.com/es/userratings.php?user_id={ID}'>{VOTES}</a>";
        var criticsTpl = "<a class='lnk3' href='http://www.filmaffinity.com/es/userreviews/1/{ID}.html?orderby=5'>{CRITICAS}</a>";
        for (var i = 1; i < friendsTable.rows.length - 1; i++) {
            var fiendId = friendsTable.rows[i].cells[0].firstChild.href.split('=')[1];
            var ratedfilms = friendsTable.rows[i].cells[3].textContent;
            var criticas = friendsTable.rows[i].cells[4].textContent;
            friendsTable.rows[i].cells[3].innerHTML = votesTpl.replace(/{ID}/g, fiendId).replace(/{VOTES}/g, ratedfilms);
            if (parseInt(criticas.split('.').join('')) > 0) {
                friendsTable.rows[i].cells[4].innerHTML = criticsTpl.replace(/{ID}/g, fiendId).replace(/{CRITICAS}/g, criticas);
            }
        }
    }
    // Comprueba los cambios en las puntuaciones de los amigos
    function doFriendsRatingChange() {
	
	var nodselect = "//select[@id='select-group']".findNode();	
	var nodcab = "//strong[text()='Votaciones']/ancestor::*[position()=2]".findNode();
	
	//var retardo = parseInt(getPreference('retardoamigos'));
	//if(retardo < 200 || retardo > 10000)
		retardo = 700;
	
	nodcab.childNodes[1].style.marginRight = "15px";
	nodcab.childNodes[3].style.marginRight = "14px";
	nodcab.childNodes[5].style.marginRight = "9px";
	nodcab.style.marginTop = "8px";
	
	nodselect.onchange = function(){cambio_grupo(retardo);}
		setTimeout(ver_cambios_amigos, retardo);
	onload=function(){          
	  setTimeout(ver_cambios_amigos, retardo)
	}
}
function dar_formato(num){  
  
	var cadena = ""; 
	var aux;    
	var cont = 1,m,k;  
  
	if(num<0) 
		aux=1; 
	else 
		aux=0;  
  
	num=num.toString();    
  
	for(m=num.length-1; m>=0; m--){ 	
		cadena = num.charAt(m) + cadena; 		
		if(cont%3 == 0 && m >aux)  
			cadena = "." + cadena; 
		else 
			cadena = cadena;  
  
	if(cont== 3) 
		cont = 1; 
	else 
		cont++;    
	}  
  
	cadena = cadena.replace(/.,/,",");   
	return cadena;    
}  
function cambio_grupo(retardo){	
	
	setTimeout(ver_cambios_amigos, retardo);
}
function ver_cambios_amigos(){
		
		var nodselect = "//select[@id='select-group']".findNode();
		var namigos = parseInt(nodselect.options[nodselect.selectedIndex].textContent.split('[')[1].split(']')[0]);
		var nodmaster = "//div[@id='user-friends-container']".findNode();
		
		var nhijos = nodmaster.childNodes.length;		
		var prim_nodo = nhijos - namigos;		
		var target = getPreference('abriramigos', true) ? '_blank' : '_self';
		
		//Mejora el aspecto de la "tabla"
		nodmaster.style.padding = "0px 15px 5px 8px";	
		
		for(var j = prim_nodo; j < nhijos; j++) {		
			nodmaster.childNodes[j].style.padding = "0px 0px 3px";			
			nodmaster.childNodes[j].style.height = "18px";								
		}
			
		for (var i = prim_nodo; i < nhijos; i++){
			
			var friendId = nodmaster.childNodes[i].id.split('-')[2];
			var name = nodmaster.childNodes[i].childNodes[1].childNodes[7].childNodes[1].firstChild.firstChild.textContent;
			var ratedfilms = nodmaster.childNodes[i].childNodes[1].childNodes[9].firstChild.firstChild.textContent;
			var criticas = nodmaster.childNodes[i].childNodes[1].childNodes[11].firstChild.firstChild.textContent;
			var listas = nodmaster.childNodes[i].childNodes[1].childNodes[13].firstChild.firstChild.textContent;
			var avg = nodmaster.childNodes[i].childNodes[1].childNodes[15].firstChild.firstChild.textContent;	
			var changenode = nodmaster.childNodes[i].childNodes[1].childNodes[9].firstChild;
			
			changenode.parentNode.style.paddingTop = "2.2px";
			nodmaster.childNodes[i].childNodes[1].childNodes[1].style.paddingTop = "1px";
			
			//Nombre
			nodmaster.childNodes[i].childNodes[1].childNodes[7].style.width = "420px";
			nodmaster.childNodes[i].childNodes[1].childNodes[7].style.marginTop = "3px";
				
			//Votos
			changenode.style.width = "71px";
			changenode.style.height = "14px";					
			changenode.style.marginLeft = "10px";
			changenode.style.marginTop = "1.5px";
			changenode.target = target;
			
			//Críticas
			nodmaster.childNodes[i].childNodes[1].childNodes[11].firstChild.style.width = "55px";
			nodmaster.childNodes[i].childNodes[1].childNodes[11].firstChild.style.marginLeft = "10px";
			nodmaster.childNodes[i].childNodes[1].childNodes[11].firstChild.style.height = "14px";
			nodmaster.childNodes[i].childNodes[1].childNodes[11].firstChild.style.marginTop = "1.5px";
			nodmaster.childNodes[i].childNodes[1].childNodes[11].firstChild.target = target;
			nodmaster.childNodes[i].childNodes[1].childNodes[11].firstChild.href += "?orderby=5";
			
			//Listas
			nodmaster.childNodes[i].childNodes[1].childNodes[13].firstChild.style.width = "50px";
			nodmaster.childNodes[i].childNodes[1].childNodes[13].firstChild.style.marginLeft = "5px";
			nodmaster.childNodes[i].childNodes[1].childNodes[13].firstChild.style.height = "14px";
			nodmaster.childNodes[i].childNodes[1].childNodes[13].firstChild.style.marginTop = "1.5px";
			nodmaster.childNodes[i].childNodes[1].childNodes[13].firstChild.target = target;
			
			//Media
			nodmaster.childNodes[i].childNodes[1].childNodes[15].firstChild.style.width = "40px";
			nodmaster.childNodes[i].childNodes[1].childNodes[15].firstChild.style.marginLeft = "10px";
			nodmaster.childNodes[i].childNodes[1].childNodes[15].firstChild.style.height = "14px";
			nodmaster.childNodes[i].childNodes[1].childNodes[15].firstChild.style.marginTop = "1.5px";
			
			//Mensaje
			nodmaster.childNodes[i].childNodes[1].childNodes[17].style.paddingTop = "2.5px";
			
			var friendstr = GM_getValue(userId + ".friends." + friendId);
				
				if (typeof friendstr != 'undefined') {
					
					var friend = eval(friendstr);
					var dif = ratedfilms - friend.films;
					var prefix;
										
					if (dif != 0) {
					prefix = dif > 0 ? '+' : '';
					changenode.style.backgroundColor = dif > 0 ? 'lightgreen' : '#FF6666';
					changenode.firstChild.textContent = dar_formato(parseInt(ratedfilms)) + '(' + prefix + dif + ')';
					}
					else
					changenode.firstChild.textContent = dar_formato(parseInt(ratedfilms));
					//Comparar el número de críticas con la última vez (si existen datos guardados)
					if (typeof friend.criticas != 'undefined') {
						dif = criticas - friend.criticas;
                    if (dif != 0) {
                        prefix = dif > 0 ? '+' : '';
                        nodmaster.childNodes[i].childNodes[1].childNodes[11].firstChild.style.backgroundColor = dif > 0 ? 'lightgreen' : '#FF6666';
                        nodmaster.childNodes[i].childNodes[1].childNodes[11].firstChild.firstChild.textContent = dar_formato(parseInt(criticas)) + '(' + prefix + dif + ')';
                    }
					else
						nodmaster.childNodes[i].childNodes[1].childNodes[11].firstChild.firstChild.textContent = dar_formato(parseInt(criticas));
					}
					//Comparar el número de listas con la última vez (si existen datos guardados)
					if (typeof friend.listas != 'undefined') {
						dif = listas - friend.listas;
                    if (dif != 0) {
                        prefix = dif > 0 ? '+' : '';
                        nodmaster.childNodes[i].childNodes[1].childNodes[13].firstChild.style.backgroundColor = dif > 0 ? 'lightgreen' : '#FF6666';
                        nodmaster.childNodes[i].childNodes[1].childNodes[13].firstChild.firstChild.textContent = dar_formato(parseInt(listas)) + '(' + prefix + dif + ')';
                    }
					else
						nodmaster.childNodes[i].childNodes[1].childNodes[13].firstChild.firstChild.textContent = dar_formato(parseInt(listas));
					}
				}
				else{
					changenode.firstChild.textContent = dar_formato(parseInt(ratedfilms));
					nodmaster.childNodes[i].childNodes[1].childNodes[11].firstChild.firstChild.textContent = dar_formato(parseInt(criticas));
					nodmaster.childNodes[i].childNodes[1].childNodes[13].firstChild.firstChild.textContent = dar_formato(parseInt(listas));
				}
				GM_setValue(userId + ".friends." + friendId, {name:name,films:ratedfilms,criticas:criticas,listas:listas}.toSource());
		}		
    }
    // CAMBIOS EN ALMAS GEMELAS
    // @todo: cambiar los nombres de las variables/metodos a algo medianamente coherente
    function doSoulMates() {
        function getSavedSoulMatesLists() {
            var ssml = eval(GM_getValue(userId + ".ssml"));
            if (typeof ssml == "undefined") {
                ssml = new Object();
                ssml.items = new Array();
                ssml.last = 0;
            }
            return ssml;
        }
        function getSavedSoulMates(index) {
            return eval(GM_getValue(userId + ".sml." + index));
        }
        function saveSoulMates(ssml, index, sm) {
            GM_setValue(userId + ".sml." + index, sm.toSource());
            ssml.items.push({'index':index,'date':sm.date});
            ssml.last = index;
            GM_setValue(userId + ".ssml", ssml.toSource());
        }
        function extractSoulMates(soulMatesTable) {
            var soulMates = new Object;
            soulMates.sm = [];
            for (i = 1; i < NUM_SM; i++) {
                var row = soulMatesTable.rows[i];
                var id = row.cells[1].innerHTML.split("=")[2].split('"')[0];
                var name = row.cells[1].firstChild.firstChild.textContent;
                var affinity = row.cells[2].firstChild.firstChild.innerHTML.replace(',', '.');
                var votes = row.cells[3].firstChild.innerHTML;
                soulMates.sm[i] = {'id':id,'name':name,'affinity':affinity,'votes':votes};
            }
            soulMates.date = formatDate(new Date());
            return soulMates;
        }
        function findChangesAllSoulMates(soulMates, previous) {
            var changesAll = new Object;
            var siguen = "";
            changesAll.changed = false;
            var rows = [];
            for (j = 1; j < NUM_SM; j++) {
                var changes = new Object;
                var sm = soulMates.sm[j];
                var found = false;
                var i = 0;
                while ((++i < NUM_SM) && !found) {
                    if (previous.sm[i]['id'] == sm['id']) {
                        found = true;
                        changes.pos = i - j;
                        changes.affinity = sm['affinity'] - previous.sm[i]['affinity'];
                        changes.votes = sm['votes'] - previous.sm[i]['votes'];
                        changes.changed = (changes['pos'] != 0) || (changes['affinity'] != 0) || (changes['votes'] != 0);
                    }
                }
                changes.found = found;
                if (found) {
                    siguen += "," + sm['name'];
                }
                rows[j] = changes;
                changesAll.changed = changesAll.changed || changes.changed || !found;
            }
            // Buscamos los caidos de la lista
            var caidos = [];
            for (j = 1; j < NUM_SM; j++) {
                var user = previous.sm[j].name;
                if (siguen.indexOf(user) < 0) {
                    caidos.push(user);
                }
            }
            changesAll.rows = rows;
            changesAll.fallen = caidos;
            changesAll.date = formatDate(new Date());
            return changesAll;
        }
        function clearSoulMatesTable(soulMatesTable) {
            for (var i = 1; i < NUM_SM; i++) {
                var row = soulMatesTable.rows[i];
                row.cells[1].innerHTML = "&nbsp;";
                row.cells[4].innerHTML = "&nbsp;";
                row.cells[6].innerHTML = "&nbsp;";
            }
        }
        function prepareSoulMatesTable(soulMatesTable) {
            soulMatesTable.rows[0].cells[0].colSpan = 2;
            soulMatesTable.rows[0].cells[2].colSpan = 2;
            soulMatesTable.rows[0].cells[3].colSpan = 2;
            for (var i = 1; i < soulMatesTable.rows.length; i++) {
                var row = soulMatesTable.rows[i];
                var newCell = d.createElement('TD');
                //newCell.width = 25;
                newCell.innerHTML = "&nbsp;";
                row.insertBefore(newCell, row.cells[0].nextSibling);
                newCell = d.createElement('TD');
                newCell.width = 20;
                newCell.innerHTML = "&nbsp;";
                row.insertBefore(newCell, row.cells[3].nextSibling);
                newCell = d.createElement('TD');
                newCell.width = 20;
                newCell.innerHTML = "&nbsp;";
                row.insertBefore(newCell, row.cells[5].nextSibling);
            }
        }
        function applySoulMatesChanges(soulMatesTable, i, changes) {
            // ¿Cambio de posicion?
            if (changes.pos > 0) {
                soulMatesTable.rows[i].cells[1].innerHTML = '<img src="' + upimg + '"><span style="font-size:80%;color:#1FA012;">' + changes.pos + '</span>';
            } else if (changes.pos < 0) {
                soulMatesTable.rows[i].cells[1].innerHTML = '<img src="' + downimg + '"><span style="font-size:80%;color:#A0121F;">' + changes.pos + '</span>';
            }
            // ¿cambio de afinidad?
            if (changes.affinity > 0) {
                soulMatesTable.rows[i].cells[4].innerHTML = '<span style="font-size:85%;color:#1FA012;">(+' + changes.affinity.toFixed(2) + ')</span>';
            } else if (changes.affinity < 0) {
                soulMatesTable.rows[i].cells[4].innerHTML = '<span style="font-size:85%;color:#A0121F;">(' + changes.affinity.toFixed(2) + ')</span>';
            }
            // ¿cambio de valoradas?
            if (changes.votes > 0) {
                soulMatesTable.rows[i].cells[6].innerHTML = '<span style="font-size:85%;color:#1FA012;">(+' + changes.votes + ')</span>';
            } else if (changes.votes < 0) {
                soulMatesTable.rows[i].cells[6].innerHTML = '<span style="font-size:85%;color:#A0121F;">(' + changes.votes + ')</span>';
            }
        }
        function applyNewSoulMate(soulMatesTable, i) {
            soulMatesTable.rows[i].cells[1].innerHTML = '<img src="' + newimg + '">';
        }
        // A&ntilde;ade la leyenda de los caidos
        function injectLostSM(soulMatesTable, fallen) {
            log("Mostrando caidos");
            if (fallen.length > 0) {
                var tr = d.createElement('TR');
                var td = d.createElement('TD');
                td.innerHTML = 'Almas gemelas caidas de la lista: <b>' + fallen.join(', ') + '</b>';
                td.colSpan = 7;
                tr.appendChild(td);
                soulMatesTable.rows[1].parentNode.appendChild(tr);
            }
        }
        function injectLastChangeTime(soulMatesTable, date) {
            if (typeof date != "undefined") {
                var tr = d.createElement('TR');
                var td = d.createElement('TD');
                td.innerHTML = 'Ultimos cambios detectados el ' + date;
                td.colSpan = 7;
                tr.appendChild(td);
                soulMatesTable.rows[1].parentNode.appendChild(tr);
            }
        }
        function injectDateCombobox(soulMatesTable, newChanges, ssml) {
            var currentTS = new Date();
            var lastWeek = 0;
            if (!newChanges) ssml.items.pop(); // Eliminamos el tiempo actual.
            if (ssml.items.length > 1) {
                ssml.items.sort(function(a, b) {
                    return b.index - a.index;
                });
                var tr = d.createElement('TR');
                var td = d.createElement('TD');
                var html = 'Comparar con: <select id="HSML" name="HSML">';
                for (var ix in ssml.items) {
                    var index = ssml.items[ix].index;
                    var date = ssml.items[ix].date;
                    var dateTS = deFormatDate(date);
                    dateTS.setDate(dateTS.getDate() + 15);
                    var week = dateTS.getWeek(1);
                    // Si la fecha es de hace mas de quince dias, solo ponemos una
                    // por semana
                    if (dateTS > currentTS || week != lastWeek) {
                        lastWeek = week;
                        html += '<option value=' + index + '>' + date + '</option>';
                    }
                }
                html += "</select>";
                td.innerHTML = html;
                td.colSpan = 7;
                tr.appendChild(td);
                soulMatesTable.rows[1].parentNode.appendChild(tr);
                $id("HSML").firstChild.selected = true;
                $id("HSML").addEventListener("change", doSoulMatesHist, false);
            }
        }
        function doSoulMatesChanges(soulMatesTable, newChanges, changesList, ssml, historic) {
            // comparar y modificar
            var changes;
            for (i = 1; i < NUM_SM; i++) {
                changes = changesList.rows[i];
                if (changes.found) {
                    // ya la teniamos
                    if (changes.changed) {
                        applySoulMatesChanges(soulMatesTable, i, changes);
                    }
                }
                else {
                    // Es un alma gemela nueva
                    applyNewSoulMate(soulMatesTable, i);
                }
            }
            if (getPreference("SHOWSMFALLEN", true) && !historic) {
                injectLostSM(soulMatesTable, changesList.fallen);
            }
            if ((newChanges || getPreference("KEEPSMCHANGES"),true) && !historic) {
                injectLastChangeTime(soulMatesTable, changesList.date);
            }
            /* Mostrar el combo para comparar con el historico */
            if (!historic) injectDateCombobox(soulMatesTable, newChanges, ssml);
        }
        function getHSMSelectedIndex() {
            var select = $id("HSML");
            var index = 0;
            var nodo = select.firstChild;
            while (nodo != null && index == 0) {
                if (nodo.selected) {
                    index = nodo.value;
                }
                nodo = nodo.nextSibling;
            }
            return index;
        }
        // Comparamos los ultimos datos con el historico.
        function doSoulMatesHist() {
            var soulMatesTable = XPATH_SML.findNode();
            var ssml = getSavedSoulMatesLists();
            var currentSM = getSavedSoulMates(ssml.last);
            var index = getHSMSelectedIndex();
            var historicSM = getSavedSoulMates(index);
            var changes = findChangesAllSoulMates(currentSM, historicSM);
            log("Comparando:" + currentSM.toSource());
            log("Historico:" + historicSM.toSource());
            clearSoulMatesTable(soulMatesTable);
            doSoulMatesChanges(soulMatesTable, false, changes, ssml, true);
        }
        function doSoulMates() {
            // Leer las almas gemelas del HTML
            var soulMatesTable = XPATH_SML.findNode();
            var ssml = getSavedSoulMatesLists();
            var currentSoulMates = extractSoulMates(soulMatesTable);
            if (ssml.last > 0) {
                prepareSoulMatesTable(soulMatesTable);
                var previousSoulMates = getSavedSoulMates(ssml.last);
                var changes = findChangesAllSoulMates(currentSoulMates, previousSoulMates);
                var newChanges = changes.changed;
                var previousChanges = eval(GM_getValue(userId + '.smc'));
                if (!changes.changed && (previousChanges != undefined)) {
                    log("No hay Cambios");
                    if (getPreference("KEEPSMCHANGES", true)) {
                        changes = previousChanges;
                    }
                }
                else {
                    log("Guardando los nuevos cambios");
                    GM_setValue(userId + '.smc', changes.toSource());
                }
                doSoulMatesChanges(soulMatesTable, newChanges, changes, ssml, false);
                if (newChanges) {
                    saveSoulMates(ssml, ssml.last + 1, currentSoulMates);
                }
            }
            else {
                // Primera vez que detectamos Almas gemelas, borramos la lista de cambios
                // por si acaso
                GM_deleteValue(userId + '.smc');
                saveSoulMates(ssml, ssml.last + 1, currentSoulMates);
            }
        }
        doSoulMates();
        /*
         FIN ALMAS GEMELAS
         */
    }
    function doAlt2Title() {
        var imgs = d.getElementsByTagName('img');
        for (var i = 0; i < imgs.length; ++i)
            if (imgs[i].hasAttribute('alt') && !imgs[i].hasAttribute('title'))
                imgs[i].setAttribute('title', imgs[i].getAttribute('alt'));
    }
     function doAddOtherLinks() {
	
          function linkYear(){        
	
    		var nodoanio = "//dt[text()='Año']/following-sibling::*".findNode();
			if(nodoanio != null) {              
				var anio = nodoanio.lastChild.textContent.trim();
				nodoanio.removeChild(nodoanio.lastChild);
				var newa = d.createElement('a');
				newa.textContent = anio;	
                newa.href = "http://www.filmaffinity.com/es/advsearch.php?stext=&stype[]=title&genre=&country=&fromyear="+anio+"&toyear="+anio;
				newa.target = "";
				newa.style.color = "inherit";
				newa.style.textDecoration = "none";
				nodoanio.appendChild(newa);
       		 }
         }
         
         function linkGuion(){
             
			var nguion = "//dt[text()='Guión']/following-sibling::*".findNode(); 
             
             if(nguion != null) {
				var linea = nguion.textContent;
				if(linea != ""){
					nguion.removeChild(nguion.lastChild);
					var aux = linea.split('(');	
					var gnistas = aux[0].split(',');
	
					var txt = "";
					var nombre = "";
					for(ix in gnistas){
						nombre = gnistas[ix].split(' ');
						txt += '<a href="http://www.filmaffinity.com/es/advsearch.php?stext=' + gnistas[ix] + '&stype[]=script&genre=&country=&fromyear=&toyear=" ';
						txt += 'target="" style="text-decoration: none; color:inherit">' + gnistas[ix] + '</a>';	
						if(ix != gnistas.length -1)
	 						txt += ', '	;
					}	
	
					if(aux.length > 1){
						txt += '(';
						txt += aux[1];
					}
				nguion.innerHTML = txt;
            	}
			}
         }
         
         function linkMusica(){
             
			var nmusic = "//dt[text()='Música']/following-sibling::*".findNode();
            if(nmusic != null) {
				var linea = nmusic.textContent;
				if(linea != ""){
					nmusic.removeChild(nmusic.lastChild);
					var aux = linea.split('(');	
					var musicos = aux[0].split(',');	
					var txt = "";
					for(ix in musicos){	
						txt += '<a href="http://www.filmaffinity.com/es/advsearch.php?stext=' + musicos[ix] + '&stype[]=music&genre=&country=&fromyear=&toyear=" ';
						txt += 'target="" style="text-decoration: none; color:inherit">' + musicos[ix] + '</a>';	
						if(ix != musicos.length -1)
	 					txt += ', '	;
					}
		
					if(aux.length > 1){
						txt += '(';
						txt += aux[1];
					}
					nmusic.innerHTML = txt;
    			}
			}
         }
         
         function linkFoto(){
             
			var nfoto = "//dt[text()='Fotografía']/following-sibling::*".findNode();
            if(nfoto != null) {
				var linea = nfoto.textContent;
				if(linea != ""){
					nfoto.removeChild(nfoto.lastChild);
					var aux = linea.split('(');	
					var fotogs = aux[0].split(',');	
					var txt = "";
					for(ix in fotogs){	
						txt += '<a href="http://www.filmaffinity.com/es/advsearch.php?stext=' + fotogs[ix] + '&stype[]=photo&genre=&country=&fromyear=&toyear=" ';
						txt += 'target="" style="text-decoration: none; color:inherit">' + fotogs[ix] + '</a>';	
						if(ix != fotogs.length -1)
	 					txt += ', '	;
						}	
						if(aux.length > 1){
							txt += '(';
							txt += aux[1];
						}
						nfoto.innerHTML = txt;
    				}
                }             
         }	
         
	linkYear();
	linkGuion();
	linkMusica();
	linkFoto();
         
}
    function doExternalLinks() {
        
        function extractTranslatedTitle() {            
            var nodo = "//h1[@id='main-title']".findNode();            
            return nodo.lastChild.textContent.clearTitle();
        }
        function extractOriginalTitle()
        {
           var nodo = "//dt[contains(text(),'tulo original')]/following-sibling::*".findNode();            
           return nodo.textContent.clearTitle();
        }
        function getLinkSitesCode(type, title, titletr, titleanm) {
            var linkSiteTemplate = ' <a href="{LINK}" target="{TARGET}" ><img src="{ICON}" width=16 height=16 alt="{TITLE}" title="{TITLE}"></a>';
            var html = '';
            for (var i in linkSites) {
                // @todo: si la preferencia es false la consulta se hace dos veces, optimizar
                if (linkSites[i].type == type && ( getPreference(linkSites[i].name, true))) {
                    var sicon = linkSites[i].icon;
                    var stit = linkSites[i].name;
                    var sstr = '';
                    var target = getPreference('newwindow', true) ? '_blank' : '_self';
                    if (linkSites[i].search.search(/%searchtr/) > -1)
                        sstr = linkSites[i].search.replace(/%searchtr/, linkSites[i].method(titletr));
                    else if(linkSites[i].search.search(/%searchvo/) > -1)
                        sstr = linkSites[i].search.replace(/%searchvo/, linkSites[i].method(title));
                    else
                        sstr = linkSites[i].search.replace(/%searchanm/, linkSites[i].method(titleanm));
                    // Si tiene Opciones adicionales
                    if (linkSites[i].search.indexOf("{OPTIONS}") > -1) {
                        sstr = sstr.replace(/{OPTIONS}/g, linkSites[i].getOptions());
                    }
                    html += linkSiteTemplate.replace(/{LINK}/g, sstr).replace(/{ICON}/g, sicon).replace(/{TARGET}/g, target).replace(/{TITLE}/g, stit);
                }
            }
            return html;
        }
		//Añadir enlaces en título
        function doAddLinksInTitle() {
     
            var translatedTitle = extractTranslatedTitle();            
            var originalTitle = extractOriginalTitle();  
            
            if ("//span[@itemprop='name']".findNode().textContent.indexOf("Serie de TV") > -1){
                var auxanm = "//dt[contains(text(),'tulo original')]/following-sibling::*".findNode().textContent;
                var coincidencias = auxanm.match(/\(/g);
				var numcars = coincidencias ? coincidencias.length : 0;
				if(numcars == 1)
                var animeTitle = originalTitle;
                else
				var animeTitle = auxanm.split('(')[1].split(')')[0];
            }
            else {
                var auxanm = "//dt[contains(text(),'tulo original')]/following-sibling::*".findNode().textContent;
                var coincidencias = auxanm.match(/\(/g);
				var numcars = coincidencias ? coincidencias.length : 0;
				if(numcars == 1)
                var animeTitle = auxanm.split('(')[1].split(')')[0];
                else
                var animeTitle = originalTitle;
            }
            
            //var titlediv = "//img[@src='http://www.filmaffinity.com/images/movie.gif']/parent::*/parent::*".findNode();
            
            var titlediv = "//h1[@id='main-title']/a/span".findNode();
            var midiv = d.createElement('div');
            midiv.style.marginTop = "8px";
            var types = [_TFILM, _TGEN, _TDOWN, _TSUB];
            for (var t in types) {
                var tmp = '';
                var txt = linkSitesTypes[types[t]].caption;
                if (getPreference(linkSitesTypes[types[t]].preference, true)) {
                    tmp += getLinkSitesCode(types[t], originalTitle, translatedTitle, animeTitle);
                }
                if (tmp != '')                    
                    midiv.innerHTML += '<span style="color:#000000; font-size:11px; font-family: Arial; font-weight: bold; padding-left: 1em; font-style: normal;">' + txt + tmp + '</span>';
            }
            titlediv.appendChild(midiv);
        }
        //
        // Añade los enlaces Externos en el panel de la derecha
        //
        function doAddLinksOnPanel() {            
            
            var nodo = "//div[text()='Listas']".findNode();
            nodo = nodo.parentNode;
            
            var originalTitle = extractOriginalTitle();
            var translatedTitle = extractTranslatedTitle();
            if ("//span[@itemprop='name']".findNode().textContent.indexOf("Serie de TV") > -1)
				var animeTitle = "//dt[contains(text(),'tulo original')]/following-sibling::*".findNode().textContent.split('(')[1].split(')')[0];
            else
                var animeTitle = originalTitle;
            /*
            var html = '<td align="center">\n<table bgcolor="#ddddff" border="0" cellpadding="0" cellspacing="1" width="100%">\n <tbody>';
            html += '<tr><td bgcolor="#ffffff">\n\n<table border="0" cellpadding="2" cellspacing="2" width="100%">\n<tbody>';
            html += '{LINKS}\n</tbody></table>\n\n </td></tr>\n </tbody></table>\n </td>';*/            
            
            var html = '<div class="add-movie-list-cont"><div>{TITLE}</div></div>';
            var linkTemplate = '<tr>\n <td align="center">\n <div style="position: relative;">\n\n';
            linkTemplate += '<div style="color: rgb(0, 51, 102); font-size: 12px;"><b>{TITLE}</b></div>\n\n</div>\n\n </td>\n </tr>\n';
            linkTemplate += '<tr><td align="center">{LINKS}</td></tr>';
            var links = "";
            var texto;
            if (getPreference("verCine", true)) {
                texto = getLinkSitesCode(_TFILM, originalTitle, translatedTitle, animeTitle);
                if (texto != '') links += linkTemplate.replace(/{TITLE}/g, "Ficha").replace(/{LINKS}/g, texto);
            }
            if (getPreference("verGeneral", true)) {
                texto = getLinkSitesCode(_TGEN, originalTitle, translatedTitle, animeTitle);
                if (texto != '') links += linkTemplate.replace(/{TITLE}/g, "Buscar").replace(/{LINKS}/g, texto);
            }
            if (getPreference("verDescargas", true)) {
                texto = getLinkSitesCode(_TDOWN, originalTitle, translatedTitle, animeTitle);
                if (texto != '') links += linkTemplate.replace(/{TITLE}/g, "Descargas").replace(/{LINKS}/g, texto);
            }
            if (getPreference("verSubtitulos", true)) {
                texto = getLinkSitesCode(_TSUB, originalTitle, translatedTitle, animeTitle);
                if (texto != '') links += linkTemplate.replace(/{TITLE}/g, "Subtitulos").replace(/{LINKS}/g, texto);
            }
            
            var spacer = document.createElement("TR");
            spacer.innerHTML = "<td>&nbsp;</td>";
            nodo.parentNode.insertBefore(spacer, nodo);
            var nodoTr = document.createElement("TR");
            nodo.parentNode.insertBefore(nodoTr, nodo.previousSibling);
            nodoTr.innerHTML = html.replace(/{LINKS}/g, links);
        }
        //
        // Añade los enlaces Externos en la ficha de la pelicula
        //
        function doAddLinksInline() {
            var originalTitle = extractOriginalTitle();
            var translatedTitle = extractTranslatedTitle();
            var animeTitle = "";
            
		    if ("//span[@itemprop='name']".findNode().textContent.indexOf("Serie de TV") > -1){
                var auxanm = "//dt[contains(text(),'tulo original')]/following-sibling::*".findNode().textContent;
                var coincidencias = auxanm.match(/\(/g);
				var numcars = coincidencias ? coincidencias.length : 0;
				if(numcars == 1)
                animeTitle = originalTitle;
                else
				animeTitle = auxanm.split('(')[1].split(')')[0];
            }
            else {
                var auxanm = "//dt[contains(text(),'tulo original')]/following-sibling::*".findNode().textContent;
                var coincidencias = auxanm.match(/\(/g);
				var numcars = coincidencias ? coincidencias.length : 0;
				if(numcars == 1)
                animeTitle = auxanm.split('(')[1].split(')')[0];
                else
                animeTitle = originalTitle;
            }
            
            log("-T&iacute;tulo original: " + originalTitle + " - T&iacute;tulo traducido: " + translatedTitle);
            // recogemos el tr padre de la columna 'productora'            
            var nodoProductora = "//dt[text()='Productora']".findNode();
            // Fichas
            
            addDataRow(nodoProductora, "verSubtitulos", 'Subtitulos', _TSUB, originalTitle, translatedTitle, animeTitle);
            addDataRow(nodoProductora, "verDescargas", 'Descargas', _TDOWN, originalTitle, translatedTitle, animeTitle);            
            addDataRow(nodoProductora, "verGeneral", 'Buscar', _TGEN, originalTitle, translatedTitle, animeTitle);            
            addDataRow(nodoProductora, "verCine", 'Ficha', _TFILM, originalTitle, translatedTitle, animeTitle);
            
            
        }
        // Añadimos los enlaces en la pagina de busqueda
        function doAddLinksSearch() {
            var nodo = "//span[text()='Resultados por título']".findNode();
	
            if (nodo != null) {
                var busqueda = d.forms[0].elements[0].value;
                var types = [_TFILM, _TGEN, _TDOWN, _TSUB];
                var html = "<td><b>&nbsp;Búsquedas adicionales:</b>&nbsp;&nbsp;";
                for (var t in types) {
                    var type = types[t];
                    if (getPreference(linkSitesTypes[types[t]].preference, true)) {
                        html += getLinkSitesCode(type, busqueda, busqueda) + "&nbsp;&nbsp;";
                    }
                }
                html += "<br></br></td>";
                var nodoTr = d.createElement('tr');
                nodoTr.innerHTML = html;
                nodo.parentNode.parentNode.insertBefore(nodoTr, nodo.parentNode);
            }
        }
        function addDataRow(sibling, preference, title, type, originalTitle, translatedTitle, animeTitle) {
            if (getPreference(preference, true)) {
                var html = getLinkSitesCode(type, originalTitle, translatedTitle, animeTitle);
                if (html != "") {
                    var nodoDt = d.createElement('dt');
                    var nodoDd = d.createElement('dd');   
                    nodoDt.textContent = title;
                    nodoDd.innerHTML = html;
                                      
                    sibling.parentNode.insertBefore(nodoDt, sibling.nextSibling.nextSibling.nextSibling);
                    nodoDt.parentNode.insertBefore(nodoDd, nodoDt.nextSibling);  
                }
            }
        }
        if (inSection('Film')) {
            var doFunction;
            
            switch (getPreference("linksPosition", "default")) {                    
                case "default": doFunction = doAddLinksInline;break;
                case "inTitle": doFunction = doAddLinksInTitle;break;
                //case "inPanel": doFunction = doAddLinksOnPanel;break;
            }
            doFunction();
        }
        else {            
	if(getPreference("SHOWEXTERNALS", true))
            doAddLinksSearch();
        }
        ;
    }
    function installSearchEngine() {
        log("Instalando buscador");
        window.setTimeout("window.sidebar.addSearchEngine('http://mycroft.mozdev.org/install.php/1913/filmaffinity_es.src', 'http://mycroft.mozdev.org/install.php/1913/filmaffinity_es.gif', 'FilmAffinity ES', 'as');", 50);
        log("-instalado");
    }
    var limitUrls = ['/es/topgen.php','/es/smsrec.php'];
    /*
     * Modifica los men&uacute;s originales de FA
     */
    function doAlterLimits() {
        
        var nodo = null;
        var limit = getPreference("limit", 20);
        for (ix in limitUrls) {
            nodo = ('//a[@href="' + limitUrls[ix] + '"]').findNode();
				if (nodo != null && typeof nodo != "undefined") {
                nodo.href = nodo.href + "?limit=" + limit;
            }
        }
    }
    function doCaptureLists() {
	        
        //var listsTable = '/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td/span[text()="Nombre"]/ancestor::*[position()=3]'.findNode();
        var listsTable = '//table[@class="llstd"]'.findNode();        
        var listas = [];
        deleteValues(userId + ".list.");
        for (var i = 1; i < listsTable.rows.length; i++) {
            var listNode = listsTable.rows[i].cells[0].firstChild.firstChild;
            var listName = "";
            if (listNode != null) {
                listName = listNode.data;
            }
            var listId = listsTable.rows[i].cells[0].firstChild.href.split('=')[1];
            if (listName.indexOf('FAPP') == -1) {
                //if (listName.indexOf('(') != -1)
                //    listName = listName.substr(0, listName.indexOf('(')).trim();
                listas[i] = {'id':listId,'name':listName};
                GM_setValue(userId + ".list." + listId, listName);
            } else {
                setPreference("worklist", listId);
            }
        }
    }
    function doRatingStyle() {
        // TODO: modificar
        function getRatingFromImg(img) {
            if (img.src.indexOf('ns.gif') > - 1) return 0;
            return img.src.split('ratings/')[1].split('.')[0];
        }
        function getRatingImageCode(j, rating, schema) {
            var imgTemplate = "<img src='{SOURCE}' class='ratingimg' alt='" + rating + ' - ' + ratings[rating] + "'>";
            return imgTemplate.replace(/{SOURCE}/g, j > rating ? ratingStyles[schema].iconOff : ratingStyles[schema].iconOn);
        }
        function doChangeRatingStyle() {
            log("Cambiar estilo de las puntuaciones");
            var schema = getPreference('ratingStyle', 'default');
            if (schema == 'default') return;
            // Obtenemos las imagenes a cambiar
            var images = "//img[contains(@src,'ratings')]".findNodesArray();
            for (var ix in images) {
                var img = images[ix];
                var rating = getRatingFromImg(img);
                if (rating > 0) {
                    var html = "";
                    for (var j = 1; j < 11; j++) {
                        html += getRatingImageCode(j, rating, schema);
                    }
                    var divNode = d.createElement('DIV');
                    divNode.style.width = "160";
                    divNode.innerHTML = html;
                    img.parentNode.insertBefore(divNode, img);
                    img.parentNode.removeChild(img);
                }
            }
        }
        doChangeRatingStyle();
    }
    function doAddFlagsMyData() {
        
        var styleTemplate = 'padding-left: 21px; background: url("{URL}") no-repeat scroll center left';
        var baseUrl = "http://www.filmaffinity.com/imgs/countries/";
        var countriesTable = "//td[text()='Estados Unidos']/ancestor::*[position()=2]".findNode();    
        
        var aux = "//h1[text()='Mis Datos']".findNode();
        aux = aux.parentNode.parentNode.parentNode.parentNode.parentNode;
        aux.style.width = "100%";
           
        for (var i = 0; i < countriesTable.rows.length; ++i) {
             countriesTable.rows[i].cells[0].setAttribute('class','odd_votes');
             countriesTable.rows[i].cells[0].setAttribute('style',
                    styleTemplate.replace(/{URL}/g, baseUrl + getCountryCode(countriesTable.rows[i].cells[0].textContent) + ".jpg"));
             
        }
    }
    function doAddFlagsToOptionsSel() {
        if (inSection('TopGen'))
            doAddFlagsToOptions(d.forms[1].elements[2]);
        else if (inSection('AdvSearch'))
            doAddFlagsToOptions(d.forms[1].elements[9]);
        else if (inSection('UptMyData'))
                doAddFlagsToOptions(d.forms[1].elements[5]);
    }
    function doAddFlagsToOptions(o) {
        //var paises = "";
        //var code = "";
        log("Añadir banderas a options");
        for (var i = 0; i < o.options.length; ++i) {
            o.options[i].setAttribute('style', 'padding-left: 19px; background: white url("http://www.filmaffinity.com/imgs/countries/' + o.options[i].value + '.jpg") no-repeat scroll center left');
            if (typeof getCountryCode(o.options[i].textContent) == "undefined") {
                //paises += o.options[i].textContent + ",";
                //code += '"' + o.options[i].textContent + '":"' + o.options[i].value + '",';
            }
        }
        //log(paises);
        //log(code);
        o.setAttribute('style', 'padding-left: 19px; background: white url("http://www.filmaffinity.com/imgs/countries/' + o.options[o.selectedIndex].value + '.jpg") no-repeat scroll center left');
        o.addEventListener("change", doAddFlagsToOptionsSel, true);
        o.addEventListener("keyup", doAddFlagsToOptionsSel, true);
        log("-fin banderas a options");
    }
function poner_banderas(){
var nprub = "//div[@class='user-friend-info']".findNodesArray();
var ndatos = "//td[@class='avg-ratings']".findNode();
//alert(ndatos.childNodes.length);
}
    function doAddFlagsToFriends() {
/*
	window.onload=function(){
	  setTimeout(poner_banderas, 200)
	}
*/
	//alert('entro');
//	var nprub = "//div[@id='user-friend-878650']".findNode();
//	alert(nprub.nodeName);
        /*var friendsTable = "//span[text()='Nombre/Nick']/ancestor::*[position()=4]".findNode();
        for (var i = 1; i < friendsTable.rows.length - 1; i++) {
            var localidad = friendsTable.rows[i].cells[1].textContent.reverse();
            var pais = localidad.substr(1, localidad.indexOf('(') - 1).reverse();
            var code = getCountryCode(pais);
            friendsTable.rows[i].cells[1].setAttribute('style', 'padding-left: 22px; background: white url("http://www.filmaffinity.com/imgs/countries/' + code + '.jpg") no-repeat scroll center left');
        }*/
    }
    function doAddFlagsToExtraContacts() {
        var contactsTable = "//table[@id='newFriends']".findNode();
        for (var i = 1; i < contactsTable.rows.length; i++) {
            var localidad = contactsTable.rows[i].cells[1].textContent.reverse();
            var pais = localidad.substr(1, localidad.indexOf('(') - 1).reverse();
            var code = getCountryCode(pais);
            contactsTable.rows[i].cells[1].setAttribute('style', 'padding-left: 22px; background: white url("http://www.filmaffinity.com/imgs/countries/' + code + '.jpg") no-repeat scroll center left');
        }
    }
    var contentPrefix = "";
    function doEnableVotes() {
        function doFilmVote(id, current) {
            var url = "http://www.filmaffinity.com/es/ratemovie.php?id={PELICULA}&rating={VOTO}&ucd={UCD}&ts=" + (new Date()).valueOf();
            var pelicula = id.split(':')[1];
            var voto = id.split(':')[2];
            var nodename = pelicula + ":" + ((current == 0) ? '-' : current);
            var nodo = $id(nodename);
            var ucd = getPreference("UCD", false);
            if (typeof ucd != "undefined" && ucd) {
                if (voto != current) {
                    nodo.innerHTML = contentPrefix + "<img src='" + upload_img + "'/>";
                    url = url.replace(/{PELICULA}/g, pelicula).replace(/{VOTO}/g, voto).replace(/{UCD}/g, ucd);
                    doGet(url, function (response) {
                        if (voto == 0) {
                            nodo.innerHTML = contentPrefix + "-";
                            nodo.id = pelicula + ":-";
                        }
                        else {
                            nodo.innerHTML = contentPrefix + voto;
                            nodo.id = pelicula + ":" + voto;
                        }
                    });
                }
            }
            hideVoteMenu();
        }
        function hideVoteMenu() {
            d.body.removeChild($id('panel_votacion'));
            d.body.removeChild($id('backgroundLayer'));
        }
        var puntuaciones = { 0:'No vista',
            10:'Excelente',
            9:'Muy buena',
            8:'Notable',
            7:'Buena',
            6:'Interesante',
            5:'Pasable',
            4:'Regular',
            3:'Floja',
            2:'Mala',
            1:'Muy mala'};
        function showVoteMenu(e) {
            var listItemTemplate = '<td class="menu"><span class="{CLASS}" id="{ID}" href="#">{NAME}</span></td>';
            var ancho = 80;
            var pelicula = this.id.split(':')[0];
            var voto = this.id.split(':')[1];
            if (voto == '-')  voto = 0;
            var numItems = 11;
            var numColumns = 1;
            var numItemsPerColumn = 11;
            var alto = (Math.min(numItems, numItemsPerColumn)) * 15;
            var ucd = getPreference("UCD", false);
            if (typeof ucd == "undefined" || !ucd) {
                alert("Es necesario que visite la pagina de AutoTour para poder votar desde aqui.");
                return;
            }
            if (numItems > 0) {
                GM_addStyle('#backgroundLayer { width: 100%; height: 100%; background-color: white; position: fixed; left: 0; right: 0; top: 0; bottom: 0; opacity: 0; }');
                GM_addStyle('#panel_votacion { color: black; background-color: #FFF; text-align: center; border: 1px solid gray; width:auto; height: ' + alto + 'px; opacity: 1; position: absolute; left: 0; top: 0; overflow: auto; }');
                GM_addStyle("#panel_votacion td.menu {border-top:1px solid #EEEEEE;background-color:#FFF;}");
                GM_addStyle("#panel_votacion span.emptyItem {background-color: #FFF;}");
                GM_addStyle('td.menu span.listItem {cursor:pointer;padding:1px 10px 1px 5px; color: black; background-color: #FFF; font-size: 9px; font-family: Verdana,Arial,Helvetica,sans-serif; text-decoration: none; text-indent: 3px; cursor: hand; display: block}');
                GM_addStyle('td.menu span.listItem:hover {padding:1px 10px 1px 5px; color: #003366; background-color: #FFCC00; font-size: 9px; font-family: Verdana,Arial,Helvetica,sans-serif; text-decoration: none; text-indent: 3px;  cursor: hand; display: block }');
                GM_addStyle('td.menu span.delListItem {cursor:pointer;padding:1px 10px 1px 5px; color: black; background-color: #E0FFE0; font-size: 9px; font-family: Verdana,Arial,Helvetica,sans-serif; text-decoration: none; text-indent: 3px; cursor: hand; display: block}');
                GM_addStyle('td.menu span.delListItem:hover {padding:1px 10px 1px 5px; color: #003366; background-color: #FF6666; font-size: 9px; font-family: Verdana,Arial,Helvetica,sans-serif; text-decoration: none; text-indent: 3px;  cursor: hand; display: block }');
                var background = d.createElement('DIV');
                background.id = 'backgroundLayer';
                d.body.appendChild(background);
                var panel = d.createElement('DIV');
                panel.id = 'panel_votacion';
                var html = '<table width="auto" cellspacing="0" cellpadding="0" border="0" bgcolor="#415570" class="rmenu">';
                html += '<tbody>';
                for (var ix in puntuaciones) {
                    html += '<tr>';
                    var text = ((ix > 0) ? ix + ' - ' : '') + puntuaciones[ix];
                    var clase = ((ix == voto) ? 'delListItem' : 'listItem');
                    var id = "VOTO:" + pelicula + ":" + ix;
                    html += listItemTemplate.replace(/{ID}/g, id).replace(/{NAME}/g, text).replace(/{CLASS}/g, clase);
                    html += '</tr>';
                }
                html += '</tbody></table>';
                panel.innerHTML = html;
                var centro;
                var left = e.clientX;
                var top = e.clientY;
                if (left + (ancho * numColumns + 2) > document.body.clientWidth) {
                    centro = (document.body.clientWidth / 2) - ((ancho * numColumns + 2) / 2);
                    left = Math.max(document.body.clientWidth - (ancho * numColumns + 2) - 10, centro);
                }
                if ((top + alto) > document.body.clientHeight) {
                    centro = (document.body.clientHeight / 2) - (alto / 2);
                    top = Math.max(document.body.clientHeight - (alto + 20), centro);
                }
                panel.style.left = left + document.body.scrollLeft;
                panel.style.top = top + document.body.scrollTop;
                d.body.appendChild(panel);
                $id("backgroundLayer").addEventListener("click", hideVoteMenu, true);
                for (ix in puntuaciones) {
                    id = "VOTO:" + pelicula + ":" + ix;
                    $id(id).addEventListener("click", function() {
                        doFilmVote(this.id, voto);
                    }, false);
                }
            } else {
                alert("Error interno");
            }
        }
        //
        // añade el envento onClick a las celdas ultima-posicion de las filas en rows
        //
        function insertEventListeners(rows, posicion, skipStart, skipEnd) {
            for (var i = skipStart; i < (rows.length - skipEnd); i++) {
                var row = rows[i];
                var celda = row.cells[row.cells.length - 1 - posicion];
                celda.addEventListener("click", showVoteMenu, true);
            }
        }
        function prepareTable_MyList() {
            var filmsTable = "//b[text()='Tu voto']/ancestor::*[position()=4]".findNode();
            for (var i = 1; i < filmsTable.rows.length - 2; i++) {
                var row = filmsTable.rows[i];
                var pelicula = "td/a[@class='posn']/@id".findNode(row).textContent.split('ch')[1];
                var celda = row.cells[row.cells.length - 2];
                celda.style.cursor = "pointer";
                celda.id = pelicula + ":" + celda.textContent;
            }
        }
        if (inSection('UserList')) {	
            if (getPreference('SHOWVOTESONFRIENDLISTS'))	
                insertEventListeners("//b[text()='Su voto']/ancestor::*[position()=4]".findNode().rows, 0, 1, 0);
        } else if (inSection('Search')) {
            if (getPreference('SHOWVOTESONFRIENDLISTS'))
                insertEventListeners("//img[contains(@src,'countries')]/ancestor::*[position()=6]".findNodesArray(), 0, 0, 0);
        } else if (inSection('MyList')) {
            prepareTable_MyList();
            insertEventListeners("//b[text()='Tu voto']/ancestor::*[position()=4]".findNode().rows, 1, 1, 1);
        }
    }
    function doShowVote() {
        
        var firstCell;
        function emptyWorkList(votos) {
            var workList = getPreference("worklist", "none");
            
            if (workList != 'none') {
                var url = "http://www.filmaffinity.com/es/rcmlistmovies.php";
                var data = "action=remove";
                data += "&list_id=" + workList;
                data += "&rc=js/esp.js";
                for (var ix in votos) {
                    data += "&movie_ids[]=" + votos[ix].pelicula;
                }
                doPost(url, data, function (result) {
                    log("lista temporal vaciada");
                });
            }
        }
        function prepareTable() {
            function prepareTableUserList() {                
                var filmListTable = "//b[text()='Su voto']/ancestor::*[position()=4]".findNode();
                var celda = d.createElement('TD');
                celda.innerHTML = "<b>Tu voto</b>";
                celda.align = "center";
                celda.width = "50";
                filmListTable.rows[0].appendChild(celda);
                for (n = 1; n < filmListTable.rows.length; n++) {
                    celda = d.createElement('TD');
                    celda.innerHTML = "-";
                    celda.className = "rating";
                    celda.bgColor = "#FFFFFF";
                    celda.align = "center";    
                    celda.style.color = "#900";
                    filmListTable.rows[n].appendChild(celda);
                }
                filmListTable.rows[1].cells[filmListTable.rows[1].cells.length - 1].innerHTML = "<img src='" + download_img + "'/>";
            }
            function prepareTableSearch() {
                                               
            }
            
            function prepareTableTopics(){
                
            }
            
            if (inSection('UserList')) {
                prepareTableUserList();
            } else if(inSection('Search')){
                prepareTableSearch();
            } else {
                prepareTableTopics();
            }
        }
        function injectVotes(votos, numero) {
            function injectVotesUserList(votos) {
                var filmListTable = "//b[text()='Su voto']/ancestor::*[position()=4]".findNode();
                filmListTable.rows[1].cells[filmListTable.rows[1].cells.length - 1].innerHTML = contentPrefix + "-";
	
                for (ix in votos) {
                    var voto = votos[ix];	
                    var aux = parseInt(ix)+1;
	     			var cell = filmListTable.rows[aux].cells[filmListTable.rows[ix].cells.length - 1];
                     cell.id = voto.pelicula + ":" + voto.puntuacion;
	    			 cell.style.backgroundColor = "#eee"
	     			 cell.style.fontFamily = "Arial";
	   				 cell.style.fontSize = "25px";
	    			 cell.style.border = "2px solid #fff";
	    			 cell.style.fontWeight = "normal";
                        //cell.style.cursor = "pointer";
                        // cell.addEventListener("click", showVoteMenu, true);
                        if (voto.puntuacion != '-') {
                            cell.textContent = contentPrefix + voto.puntuacion;
	
                        }
                   // }
                }
            }
            
            function injectVotesSearch(votos, numero) {			
                              
				var aux = 0;
				var numaux = 0;
				var cont = 0;                
				if(numero == 2)
					aux = 20;
				else if(numero == 3)
					aux = 40;                
                 
                //Eliminamos la publi
                var divpubli = "//div[@id='mt-content-cell']".findNode();
                if(aux == 0){
                if(divpubli.childNodes[0].nodeName == "DIV"){                    
                    divpubli.removeChild(divpubli.childNodes[0]);
                }
                else{                    
                    divpubli.removeChild(divpubli.childNodes[1]);   
                }
                                
                var divtall = "//h1[contains(text(),'Resultados por')]".findNodesArray();
                divtall[0].parentNode.style.marginRight = "20px";
                }
                
                var contens = "//div[@class='mc-info-container']".findNodesArray();
				var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox/') > -1;                
                contens[0].parentNode.parentNode.parentNode.style.width = "795px";
                for(var ix in votos) {
                    numaux = aux + cont;                    
                 	contens[numaux].style.width = "650px";
                    var newd = d.createElement('div');
                    //newd.style.position = "inherit";
                    if(is_firefox)
                   	    newd.style.cssFloat = "right";
                    else
                    	newd.style.float = "right";    
                    newd.style.fontSize = "25px";
                    newd.style.height = "40px";
                    newd.style.width = "50px";
                    newd.style.color = '#ffffff';
                    if(votos[ix].puntuacion == 10){                        
                        newd.style.backgroundColor = '#008B00';
                        newd.style.border = "1px solid #008B00";
                    }
                    else if(votos[ix].puntuacion == 9 || votos[ix].puntuacion == 8 || votos[ix].puntuacion == 7){                        
                        newd.style.backgroundColor = '#00B200';
                        newd.style.border = "1px solid #00B200";
                    }          
                    else if(votos[ix].puntuacion == 6 || votos[ix].puntuacion == 5 || votos[ix].puntuacion == 4){                        
                        newd.style.backgroundColor = '#F2C522';
                        newd.style.border = "1px solid #F2C522";
                    }
                    else if(votos[ix].puntuacion == 3 || votos[ix].puntuacion == 2 || votos[ix].puntuacion == 1){                        
                        newd.style.backgroundColor = '#FF0000';
                        newd.style.border = "1px solid #FF0000";
                    }        
                    else if(votos[ix].puntuacion == "-"){
                        newd.style.border = "1px solid #4682B4";
                    	newd.style.color = '#4682B4';
                    }
					newd.style.textAlign = "center";                    
                    newd.style.margin = "19px 0px 15px 5px";
                    newd.style.paddingTop = "6px";   
                                  
                    newd.textContent = votos[ix].puntuacion;
                    contens[numaux].parentNode.insertBefore(newd,contens[numaux]);
                    cont++;
                }                    
                
          }
            function injectVotesAdvSearch(votos, numero) {			
                              
				var aux = 0;
				var numaux = 0;
				var cont = 0;                
				if(numero == 2)
					aux = 20;
				else if(numero == 3)
					aux = 40;              
                 
                var contens = "//div[@class='mc-info-container']".findNodesArray();                
                var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox/') > -1;
                
                for(var ix in votos) {
                    numaux = aux + cont;                    
                 	contens[numaux].style.width = "670px";
                    var newd = d.createElement('div');
                    //newd.style.position = "inherit";
                    if(is_firefox)
                   	    newd.style.cssFloat = "right";
                    else
                    	newd.style.float = "right"; 
                    newd.style.fontSize = "25px";
                    newd.style.height = "40px";
                    newd.style.width = "50px";
                    newd.style.color = '#ffffff';
                    if(votos[ix].puntuacion == 10){                        
                        newd.style.backgroundColor = '#008B00';
                        newd.style.border = "1px solid #008B00";
                    }
                    else if(votos[ix].puntuacion == 9 || votos[ix].puntuacion == 8 || votos[ix].puntuacion == 7){
                        
                        newd.style.backgroundColor = '#00B200';
                        newd.style.border = "1px solid #00B200";
                    }          
                    else if(votos[ix].puntuacion == 6 || votos[ix].puntuacion == 5 || votos[ix].puntuacion == 4){                        
                        newd.style.backgroundColor = '#F2C522';
                        newd.style.border = "1px solid #F2C522";
                    }
                    else if(votos[ix].puntuacion == 3 || votos[ix].puntuacion == 2 || votos[ix].puntuacion == 1){                        
                        newd.style.backgroundColor = '#FF0000';
                        newd.style.border = "1px solid #FF0000";
                    }    
                    else if(votos[ix].puntuacion == "-"){
                        newd.style.border = "1px solid #4682B4";
                    	newd.style.color = '#4682B4';
                    }
					newd.style.textAlign = "center";                    
                    newd.style.margin = "18px 0px 14px 0px";
                    newd.style.paddingTop = "6px";   
                                  
                    newd.textContent = votos[ix].puntuacion;
                    contens[numaux].parentNode.insertBefore(newd,contens[numaux]);
                    cont++;
                }                    
                
          }
            function injectVotesUserRatings(votos, numero) {			
                              
				var aux = 0;
				var numaux = 0;
				var cont = 0;                
				if(numero == 2)
					aux = 20;				             
                 
                var contens = "//div[@class='mc-info-container']".findNodesArray();                
                var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox/') > -1;
                
                for(var ix in votos) {
                    numaux = aux + cont;                    
                 	contens[numaux].parentNode.parentNode.style.width = "670px";
                    var newd = d.createElement('td');
                    //newd.style.position = "inherit";
                    if(is_firefox)
                   	    newd.style.cssFloat = "right";
                    else
                    	newd.style.float = "right"; 
                    newd.style.fontSize = "25px";
                    newd.style.height = "40px";
                    newd.style.width = "50px";
                    newd.style.color = '#ffffff';
                    if(votos[ix].puntuacion == 10){                        
                        newd.style.backgroundColor = '#008B00';
                        newd.style.border = "1px solid #008B00";
                    }
                    else if(votos[ix].puntuacion == 9 || votos[ix].puntuacion == 8 || votos[ix].puntuacion == 7){
                        
                        newd.style.backgroundColor = '#00B200';
                        newd.style.border = "1px solid #00B200";
                    }          
                    else if(votos[ix].puntuacion == 6 || votos[ix].puntuacion == 5 || votos[ix].puntuacion == 4){                        
                        newd.style.backgroundColor = '#F2C522';
                        newd.style.border = "1px solid #F2C522";
                    }
                    else if(votos[ix].puntuacion == 3 || votos[ix].puntuacion == 2 || votos[ix].puntuacion == 1){                        
                        newd.style.backgroundColor = '#FF0000';
                        newd.style.border = "1px solid #FF0000";
                    }    
                    else if(votos[ix].puntuacion == "-"){
                        newd.style.border = "1px solid #4682B4";
                    	newd.style.color = '#4682B4';
                    }
					newd.style.textAlign = "center";                    
                    newd.style.margin = "12px 0px 14px 5px";
                    newd.style.paddingTop = "6px";   
                                  
                    newd.textContent = votos[ix].puntuacion;
                    contens[numaux].parentNode.parentNode.parentNode.appendChild(newd);
                    cont++;
                }                    
                
          }
            
            function injectVotesTopics(votos, numero){
                
                var aux = 0;
				var numaux = 0;
				var cont = 0;                
				if(numero == 2)
					aux = 20;
				else if(numero == 3)
					aux = 40;
                    
                var contens = "//div[@class='record']".findNodesArray();  
                var urlact = location.href;
                var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox/') > -1;
                
                if((urlact.indexOf('attr=all') != -1) && (aux == 0)){
                    var nodosel = '//select[@id="exclude"]/parent::*'.findNode();                    
                    var nclone = nodosel.cloneNode(true);
                    nclone.style.paddingRight = "40px";
                    var ntopic = urlact.split('=')[1].split('&')[0];
                    nclone.childNodes[3].onchange = function(){location.href = "/es/movietopic.php?topic=" + ntopic + "&attr=all&order=" + $(this).val();}
                    nodosel.parentNode.parentNode.insertBefore(nclone, nodosel.parentNode);
                    nodosel.parentNode.removeChild(nodosel);
                }
                
                for(var ix in votos) {
                    numaux = aux + cont;                    
                 	contens[numaux].style.width = "730px";
                    var newd = d.createElement('div');
                    //newd.style.position = "inherit";
                    if(is_firefox)
                   	    newd.style.cssFloat = "right";
                    else
                    	newd.style.float = "right"; 
                    newd.style.fontSize = "25px";
                    newd.style.height = "40px";
                    newd.style.width = "50px";
                    newd.style.color = '#ffffff';
                    if(votos[ix].puntuacion == 10){                        
                        newd.style.backgroundColor = '#008B00';
                        newd.style.border = "1px solid #008B00";
                    }
                    else if(votos[ix].puntuacion == 9 || votos[ix].puntuacion == 8 || votos[ix].puntuacion == 7){
                        
                        newd.style.backgroundColor = '#00B200';
                        newd.style.border = "1px solid #00B200";
                    }          
                    else if(votos[ix].puntuacion == 6 || votos[ix].puntuacion == 5 || votos[ix].puntuacion == 4){                        
                        newd.style.backgroundColor = '#F2C522';
                        newd.style.border = "1px solid #F2C522";
                    }
                    else if(votos[ix].puntuacion == 3 || votos[ix].puntuacion == 2 || votos[ix].puntuacion == 1){                        
                        newd.style.backgroundColor = '#FF0000';
                        newd.style.border = "1px solid #FF0000";
                    }    
                    else if(votos[ix].puntuacion == "-"){
                        newd.style.border = "1px solid #4682B4";
                    	newd.style.color = '#4682B4';
                    }
					newd.style.textAlign = "center";                    
                    newd.style.margin = "15px 0px 19px 25px";
                    newd.style.paddingTop = "6px";   
                                  
                    newd.textContent = votos[ix].puntuacion;
                    contens[numaux].parentNode.insertBefore(newd,contens[numaux]);
                    cont++;     
                }   
            }
            
           if (inSection('UserList')) {
                injectVotesUserList(votos);
            } else if(inSection('Search')){
                injectVotesSearch(votos, numero);
            } else if(inSection('AdvSearch')){
                injectVotesAdvSearch(votos, numero);
            } else if(inSection('UserRatting')){
                injectVotesUserRatings(votos, numero);
            }
              else {
                injectVotesTopics(votos, numero);
            }
        }
        function extractVotesFromList(div) {
            
            var nodos = "//img[contains(@src,'countries')]/parent::*/a".findNodesArray(div);            
			var votes = "//td[@class='rating2']".findNodesArray(div);            
            var votos = [];
            for (var ix in nodos) {
                var pelicula = nodos[ix].href.split("es/film")[1].split(".")[0];          
                //var temp = "ancestor::*[position()=10]".findNode(nodos[ix]);                
                //var voto = temp.parentNode.cells[temp.cellIndex + 1].textContent;
                var voto = votes[ix].textContent;                    
                votos.push({pelicula:pelicula,puntuacion:voto});
            }
            
            return votos;
        }
        //
        // Lee la lista temporal de trabajo y obtiene nuestras puntuaciones
        //
        function readVotes(list) {
            
            var url1 = "http://www.filmaffinity.com/es/mylist.php?list_id=" + list;
			var url2 = "http://www.filmaffinity.com/es/mylist.php?list_id=" + list + "&page=2";
			var url3 = "http://www.filmaffinity.com/es/mylist.php?list_id=" + list + "&page=3";
			if(inSection('Topics')){
                    var anchors = '//div[@class="title"]/a'.findNodesArray();
                }
                else {
					var anchors = "//img[contains(@src,'countries')]/parent::*/a".findNodesArray();
                }
			var long = anchors.length;
			var v1 = 0;
            
            setTimeout(function(){             
            doGet(url1, function(response) {
                
                response = response.replace("<img", "<omg"); // Para que no se ponga a cargar las peliculas
                var emptydiv = document.createElement('div');
                emptydiv.innerHTML = response;
                var votos = extractVotesFromList(emptydiv);                
				v1 = votos.length;	                
				// Borrar lista temporal	
                injectVotes(votos);	
                emptyWorkList(votos);
            });
            
			if(long > 20){
			  doGet(url2, function(response) {
                response = response.replace("<img", "<omg"); // Para que no se ponga a cargar las peliculas
                var emptydiv = document.createElement('div');
                emptydiv.innerHTML = response;
                var votos = extractVotesFromList(emptydiv);				
			// Borrar lista temporal	
                injectVotes(votos, 2);	
                emptyWorkList(votos);
			});
			}
                
			if(long > 40){
        
			doGet(url3, function(response) {
                response = response.replace("<img", "<omg"); // Para que no se ponga a cargar las peliculas
                var emptydiv = document.createElement('div');
                emptydiv.innerHTML = response;
                var votos = extractVotesFromList(emptydiv);
	
			// Borrar lista temporal	
                injectVotes(votos, 3);	
                emptyWorkList(votos);
			});
			}            
            }, 750);
        }
        
        //
        // Elimina la lista de trabajo, borrando el contenido y luego
        // Añade las peliculas llamando a la url y data
        //
        function resetWorkList(url, data, workList) {
            log('Elminando WorkList');
            var delUrl = "http://www.filmaffinity.com/es/delmylist.php?list_id=" + workList;
            var delData = "postback=1&del=Borrar+lista";
            doPost(delUrl, delData, function (result) {
                log('Creando nueva WorkList');
                // Hemos borrado la lista, ahora creamos una nueva
                var addUrl = "http://www.filmaffinity.com/es/addlist.php";
                var addData = "name=Lista+Temporal+para+FAPP+-+creada+automaticamente";
                
                doPost(addUrl, addData, function(result) {
                    // Y ahora cogemos el nuevo workList
                    var searchStr = 'name="list_id" value="';
                    var p = result.indexOf(searchStr);
                    var newWorkList = result.substr(p + searchStr.length, 4);
                    log('Nueva worklist: ' + newWorkList);
                    setPreference("worklist", newWorkList);
                    data.replace("id2=" + workList, "id2=" + newWorkList);
                    log('Agregando peliculas a nueva workList');
                    doPost(url, data, function (result) {                        
                        readVotes(newWorkList);
                    });
                });
            });
        }
        function notEmpty(workList, result) {
            var buscando = "/es/mylist.php?list_id=" + workList + "&page=2";
            return result.indexOf(buscando) > -1;
        }
        //
        // Inserta las peliculas de una lista en la lista temporal de trabajo
        //
        function insertInList() {
            var workList = getPreference("worklist", "none");            
            var url = "http://www.filmaffinity.com/es/rcmlistmovies.php";
            // todo: borrar la worklist
            if (typeof workList != "undefined" && workList != "none") {
                if(inSection('Topics')){
                    var anchors = '//div[@class="title"]/a'.findNodesArray();
                }
                else {
					var anchors = "//img[contains(@src,'countries')]/parent::*/a".findNodesArray();
                }
				
                if (anchors.length > 0) {
                    var data = "action=copy";                    
                    data += "&list_id2=" + workList;
                    data += "&list_id=1001";
                    data += "&rc=js/esp.js";					
                    for (var ix in anchors) {
                        data += "&movie_ids[]=" + anchors[ix].href.split("es/film")[1].split(".")[0];
                    }
	
                    doPost(url, data, function (result) {
                        //log(result);
                        if (notEmpty(workList, result)) {							                            
                            resetWorkList(url, data, workList);
                        } else {	                            
                            readVotes(workList);
                            
                        }
                    });
                }
            }
        }
        prepareTable();
        insertInList();
    }
//Fin de nuestros votos en listas de otros
//Función para añadir películas a listas mediente un enlace
    function doQuickList() {
        function hideQuickListPanel() {
            d.body.removeChild($id('panel_listas'));
            d.body.removeChild($id('backgroundLayer'));
        }
        function getNumOfLists() {
            var anchorTr = "//div/b[text()='LISTAS']/ancestor::*[position()=3]".findNode();
            if (anchorTr.parentNode.rows.length == 2) {
                return 0;
            } else {
                var texto = anchorTr.parentNode.rows[1].firstChild.textContent;
                return parseInt(texto.split(" en ")[1].split(" de ")[0]);
            }
        }
        function updateListCount(delta) {
            var comentario = "Esta película se encuentra en <b>{NUM}</b> de tus listas.";
            var actual = getNumOfLists();
            var nuevo = actual + delta;
            var nodo;
            var texto = "";
            var anchorTr = "//div/b[text()='LISTAS']/ancestor::*[position()=3]".findNode();
            if (actual == 0) {
                var nodoTr = d.createElement("TR");
                var nodoTd = d.createElement('TD');
                nodoTd.align = "center";
                nodoTd.innerHTML = "nbsp;";
                nodoTr.appendChild(nodoTd);
                anchorTr.parentNode.insertBefore(nodoTr, anchorTr.nextSibling);
            }
            if (nuevo > 0) {
                texto = comentario.replace(/{NUM}/g, nuevo);
                nodo = anchorTr.parentNode.rows[1].cells[0];
                nodo.innerHTML = texto;
            } else {
                anchorTr.parentNode.removeChild(anchorTr.parentNode.rows[1]);
            }
        }
        function doAddFilmToList(film, list) {
            var nodo = $id(list);
            var remove = false;
            if (nodo.className == "delListItem") {
                if (confirm("¿Desea eliminar la pelicula de esta lista?")) {
                    remove = true;
                } else {
                    hideQuickListPanel();
                    return;
                }
            }
            var url = "http://www.filmaffinity.com/es/edtmovielists.php?movie_id=";
            url += film + "&rp=/favicon.ico";
            $id("backgroundLayer").removeEventListener("click", hideQuickListPanel, true);
            hideQuickListPanel();
            log("url: " + url);
            log("añadir: " + !remove);
            var estado = document.body.style.cursor;
            document.body.style.cursor = 'wait';
            doPost(url, (!remove ? "atl" : "rfl") + "[]=" + list, function(result) {
                log("Datos enviados con exito");
                log("resultado: " + result.length);
                log("resultado: " + result);
                //hideQuickListPanel();
                if (inSection('Film')) {
                    updateListCount(remove ? -1 : 1);
                }
            });
            document.body.style.cursor = estado;
        }
        // TODO: esto seria "//input[@name='rfl[]']/@value".findNodeArray(emptydiv)
        function extractFilmLists(emptydiv) {
            var xpath = "//input[@name='rfl[]']/@value";
            var iterator = findNodes(emptydiv, xpath);
            var nodo;
            var lists = [];
            while ((nodo = iterator.iterateNext()) != null) {
                lists.push(nodo.value);
            }
            return lists;
        }
        function readLists(id) {
            var url = "http://www.filmaffinity.com/es/edtmovielists.php?movie_id=" + id;
            doGet(url, function(response) {
                response = response.replace("<img", "<omg");
                var emptydiv = document.createElement('div');
                emptydiv.innerHTML = response;
                var listas = extractFilmLists(emptydiv);
                for (ix in listas) {
                    var lista = listas[ix];
                    var nodo = $id(lista);
                    if (typeof nodo != "undefined") {
                        //nodo.style.backgroundColor = "#E0FFE0";
                        nodo.className = "delListItem";
                    }
                }
            });
        }
        function openQuickListPanel(e) {
          var listItemTemplate = '<td class="menu"><span class="listItem" id="{ID}" href="#">{NAME}</span></td>';
            var ancho = 320;
            var pelicula = this.id;
            //Obtenemos las listas desde la configuración
            var listas = getValues(userId + ".list.");
            listas.sort(function(a, b) {
                return a - b;
            });
            // Por si queremos simular mas listas
            //for (n=1;n<63;n++) listas.push(listas[0]);
            log("Nº de listas:" + listas.length);
            var numItems = listas.length;
            var maxItemsPerColumn = Math.floor((document.body.clientHeight * 0.75) / 14);
            var numColumns = Math.ceil(numItems / maxItemsPerColumn);
            var numItemsPerColumn = Math.ceil(numItems / numColumns);
            var alto = (Math.min(numItems, numItemsPerColumn)) * 15;
            var id;
            if (numItems > 0) {
                GM_addStyle('#backgroundLayer { width: 100%; height: 100%; background-color: white; position: fixed; left: 0; right: 0; top: 0; bottom: 0; opacity: 0; }');
                GM_addStyle('#panel_listas { color: black; background-color: #FFF; text-align: center; border: 1px solid gray; width:auto; height: ' + alto + 'px; opacity: 1; position: absolute; left: 0; top: 0; overflow: auto; }');
                GM_addStyle("#panel_listas td.menu {border-top:1px solid #EEEEEE;background-color:#FFF;}");
                GM_addStyle("#panel_listas span.emptyItem {background-color: #FFF;}");
                GM_addStyle('td.menu span.listItem {cursor:pointer;padding:1px 10px 1px 5px; color: black; background-color: #FFF; font-size: 9px; font-family: Verdana,Arial,Helvetica,sans-serif; text-decoration: none; text-indent: 3px; cursor: hand; display: block}');
                GM_addStyle('td.menu span.listItem:hover {padding:1px 10px 1px 5px; color: #003366; background-color: #FFCC00; font-size: 9px; font-family: Verdana,Arial,Helvetica,sans-serif; text-decoration: none; text-indent: 3px;  cursor: hand; display: block }');
                GM_addStyle('td.menu span.delListItem {cursor:pointer;padding:1px 10px 1px 5px; color: black; background-color: #E0FFE0; font-size: 9px; font-family: Verdana,Arial,Helvetica,sans-serif; text-decoration: none; text-indent: 3px; cursor: hand; display: block}');
                GM_addStyle('td.menu span.delListItem:hover {padding:1px 10px 1px 5px; color: #003366; background-color: #FF6666; font-size: 9px; font-family: Verdana,Arial,Helvetica,sans-serif; text-decoration: none; text-indent: 3px;  cursor: hand; display: block }');
                var background = d.createElement('DIV');
                background.id = 'backgroundLayer';
                d.body.appendChild(background);
                var panel = d.createElement('DIV');
                panel.id = 'panel_listas';
                var html = '<table width="auto" cellspacing="0" cellpadding="0" border="0" bgcolor="#415570" class="rmenu">';
                html += '<tbody>';
                for (var row = 0; row < numItemsPerColumn; row++) {
                    html += '<tr>';
                    for (var col = 0; col < numColumns; col++) {
                        var i = (numItemsPerColumn * col) + row;
                        if (i < numItems) {
                            id = listas[i];
                            var name = GM_getValue(userId + '.list.' + listas[i]);
                            html += listItemTemplate.replace(/{ID}/g, id).replace(/{NAME}/g, name);
                        } else {
                            html += '<td class="menu"><span class="emptyItem" style="background-color:#FFF;">&nbsp;</span></td>';
                        }
                    }
                    html += '</tr>';
                }
                html += '</tbody></table>';
                panel.innerHTML = html;
                var centro;
                var left = e.clientX;
                var top = e.clientY;
                if (left + (ancho * numColumns + 2) > document.body.clientWidth) {
                    centro = (document.body.clientWidth / 2) - ((ancho * numColumns + 2) / 2);
                    left = Math.max(document.body.clientWidth - (ancho * numColumns + 2) - 10, centro);
                }
                if ((top + alto) > document.body.clientHeight) {
                    centro = (document.body.clientHeight / 2) - (alto / 2);
                    top = Math.max(document.body.clientHeight - (alto + 20), centro);
                }
                panel.style.left = left + document.body.scrollLeft;
                panel.style.top = top + document.body.scrollTop;
                d.body.appendChild(panel);
                $id("backgroundLayer").addEventListener("click", hideQuickListPanel, true);
                for (i = 0; i < listas.length; i++) {
                    id = listas[i];
                    $id(id).addEventListener("click", function() {
                        log('Seleccionada lista: ' + this.id + " nombre: " + this.textContent);
                        doAddFilmToList(pelicula, this.id);
                    }, false);
                }
                if (getPreference('FETCHFILMLISTS', false)) readLists(pelicula);
            } else {
                alert("Visite primero la página MIS LISTAS");
            }
            return false;
        }
        function createButtonNode(pelicula) {
            var button = d.createElement('IMG');
            button.className = 'addToList';
            button.src = img_plus;
            button.alt = "Añadir pelicula a listas";
            button.id = pelicula;
            button.addEventListener("click", openQuickListPanel, false);
            return button;
        }
        // Añade el icono de añadir a listas rapidas en las listas de peliculas
        function addQuickListSearch() {
            
            GM_addStyle('.addToList {margin-left:5px;cursor:pointer;width:12px;height:12px;}');
            var anchors = getElementsByClassName(d, 'a', 'addl');
            var posic = getElementsByClassName(d, 'div', 'mc-title');
            for (var i = 0; i < anchors.length; i++) {
                var anchor = anchors[i];
                
                if (anchor.textContent.indexOf('a listas') >= 0) {
                    var pelicula = anchor.href.split('=')[1].split('&')[0];
                    posic[i].appendChild(createButtonNode(pelicula));
                }
            }
        }
        function addQuickListList() {
            GM_addStyle('.addToList {margin-left:5px;cursor:pointer;width:12px;height:12px;}');
            var anchors = "//img[contains(@src,'countries')]/parent::*/b/a".findNodesArray();
            for (var ix in anchors) {
                var pelicula = anchors[ix].href.split("es/film")[1].split(".")[0];
                anchors[ix].parentNode.parentNode.appendChild(createButtonNode(pelicula));
            }
        }
        // Añade el enlace a listas rapidas en la ficha de la pelicula
        function addQuickListFilm() {
            GM_addStyle('.addToList {margin-left:5px;cursor:pointer;width:12px;height:12px;}');
            var pelicula = document.location.href.split('/film')[1].split('.')[0];            
            anchor = '//dt[text()="Título original"]/following-sibling::*'.findNode();	
            if (anchor != null) {
                anchor.appendChild(createButtonNode(pelicula));
            }
        }
        if (inSection('Film')) addQuickListFilm(); else
            if (inSection('MyList') || inSection('UserList')) addQuickListList(); else addQuickListSearch();
    }
    // Soporte para ordenar las peliculas en las listas
    function doSortFilmsInList() {
        var filmList = [];
        var primeroPantalla,ultimoPantalla;
        var ultimo,timerID;
        var working = false;
        function mark(node, color) {
            for (var n = 0; n < 4; n++) {
                node.cells[n].style.backgroundColor = color;
            }
        }
        function sendData() {
            var urlListOrder = "http://www.filmaffinity.com/es/listorder.php";
            var params = "neworder={NEWORDER}&list_id={ID}";
            // Obtener ID de la lista
            var id = url.split("=")[1];
            // Obtener todos los ID de las peliculas, en orden.
            //var nodos = "//a[@class='posn']".findNodesArray();
            var neworder = "";
            for (var ix = 0; ix < filmList.length; ix++) {
                neworder += "," + filmList[ix].id;
            }
            neworder = neworder.substr(1).replace(/ch/g, "");
            working = true;
            var estado = document.body.style.cursor;
            document.body.style.cursor = 'wait';
            //log('Ordenando: ' + neworder);
            doPost(urlListOrder, params.replace(/{NEWORDER}/g, neworder).replace(/{ID}/g, id), function() {
                var nodosTR = "//a[@class='posn' or @class='posn2' or @class='posn3']/parent::*/parent::*".findNodesArray();
                for (var ix in nodosTR) {
                    mark(nodosTR[ix], "#FFFFFF");
                }
                working = false;
                d.body.style.cursor = estado;
            });
        }
        function setEventUp(img) {
            img.addEventListener("click", function () {
                doFilmUp(this);
            }, false);
        }
        function setEventDown(img) {
            img.addEventListener("click", function () {
                doFilmDown(this);
            }, false);
        }
        // Cambiamos la posición
        function adjustRowData(node, pos) {
            node.cells[0].childNodes[1].textContent = pos;	
            var imgUp = node.cells[0].childNodes[5];
            var imgDown = node.cells[0].childNodes[6];
            if (pos == 1 || pos == primeroPantalla) {
                imgUp.style.display = "none";
            } else {
                imgUp.style.display = "block";
                setEventUp(imgUp);
            }
            if (pos == ultimo || pos == ultimoPantalla) {
                imgDown.style.display = "none";
            } else {
                imgDown.style.display = "block";
                setEventDown(imgDown);
            }
            // Marcamos el panel,
            mark(node, "#FFEFEF");
        }
        function intercambiaEnFilmList(pos) {
            pos--;
            log("Intercambiando: " + pos + " con " + (pos + 1));
            var tmp = filmList[pos];
            filmList[pos] = filmList[pos + 1];
            filmList[pos + 1] = tmp;
        }
        function doFilmUp(e) {
            clearTimeout(timerID);
            var pos = "//a[@id='{ID}']/text()".replace(/{ID}/g, e.id).findNode().textContent;
	
            if (pos > primeroPantalla) {
                var nodo1 = e.parentNode.parentNode;
                var tabla = nodo1.parentNode;
                var nodo2 = tabla.rows[pos - 1 - primeroPantalla + 1 ];
                var clon1 = nodo1.cloneNode(true);
                var clon2 = nodo2.cloneNode(true);
                tabla.insertBefore(clon1, nodo2);
                tabla.insertBefore(clon2, nodo2);
                tabla.removeChild(nodo1);
                tabla.removeChild(nodo2);
                // intercambiar nodos pos y pos-1
                intercambiaEnFilmList(pos - 1);
                adjustRowData(clon1, pos - 1);
                adjustRowData(clon2, pos);
                timerID = setTimeout(sendData, 2000);
                // si pos = 2 o pos = ultimo => modificar flechas
            }
        }
        function doFilmDown(e) {
            clearTimeout(timerID);
            var pos = parseInt("//a[@id='{ID}']/text()".replace(/{ID}/g, e.id).findNode().textContent);
            if (pos < ultimoPantalla) {
                var nodo1 = e.parentNode.parentNode;
                var tabla = nodo1.parentNode;
                var nodo2 = tabla.rows[pos + 1 - primeroPantalla + 1];
                var clon1 = nodo1.cloneNode(true);
                var clon2 = nodo2.cloneNode(true);
                tabla.insertBefore(clon2, nodo2);
                tabla.insertBefore(clon1, nodo2);
                tabla.removeChild(nodo1);
                tabla.removeChild(nodo2);
                // intercambiar nodos pos y pos-1
                intercambiaEnFilmList(pos);
	
                adjustRowData(clon1, pos + 1);
                adjustRowData(clon2, pos);
                timerID = setTimeout(sendData, 2000);
            }
            // si pos = 2 o pos = ultimo => modificar flechas
        }
        // Si hay algun nodo con page=2 es que estamos en una lista multiple.
        // Si estamos en la pagina 2 tambien saltara por el enlace a la página en ingles
        function multiPageList() {
            var nodo2 = "//a[contains(@href,'page=2')]".findNode();
            var nodo1 = "//a[contains(@href,'page=1')]".findNode();
            return !(nodo1 == null && nodo2 == null);
        }
        /*
         Si tiene 1 unica página, entonces la lista la leemos directamente de la tabla.
         Si tiene mas de 1 página, tendremos que leer la página de ordenación para leer todos los ids.
         */
        function readMovieList() {
            if (multiPageList()) {
                // leemos la página de ordenación
                // capturamos los IDs de las peliculas
                // Obtener ID de la lista
                var listId = url.split("=")[1];
	
                var lurl = "http://www.filmaffinity.com/es/listorder.php?list_id=" + listId;
                doGet(lurl, function (response) {
                    var emptydiv = document.createElement('div');
                    emptydiv.innerHTML = response;
                    var options = "//select[@id='slist']/option".findNodesArray(emptydiv);
                    for (var ix in options) {
                        filmList.push({id:options[ix].value,name:options[ix].textContent});
                    }	
                    init();
                });
            } else {
	
                var nodos = "//a[@class='posn' or @class='posn2']".findNodesArray();                                
                for (var ix in nodos) {
                    filmList.push({id:nodos[ix].id.replace(/ch/g, '')});
                }	   
                init();
            }
        }
        function init() {
            GM_addStyle('.upimg {display:block;margin-top:5px;cursor:pointer;}');
            GM_addStyle('.downimg {display:block;margin-top:5px;cursor:pointer;}');
            var nodos = "//a[@class='posn'  or @class='posn2'  or @class='posn3']".findNodesArray();	
            var arriba = "<img id='{ID}' title='Subir pelicula en lista' class='upimg' src='" + upimg + "'>";
            var arribah = "<img id='{ID}' title='Subir pelicula en lista' class='upimg' style='display:none' src='" + upimg + "'>";
            var abajo = "<img id='{ID}' title='Bajar pelicula en lista' class='downimg' src='" + downimg + "'>";
            var abajoh = "<img id='{ID}' title='Bajar pelicula en lista' class='downimg' style='display:none' src='" + downimg + "'>";
            ultimo = nodos.length;
            primeroPantalla = parseInt(nodos[0].textContent);
            ultimoPantalla = parseInt(nodos[ultimo - 1].textContent);
            for (var ix in nodos) {
                nodos[ix].style.display = "block";
                var pos = parseInt(nodos[ix].textContent);
                // Por el momento no vamos a permitir que las peliculas se crucen entre pantalla y pantalla
                var esPrimero = (pos == 1) || (pos == primeroPantalla);
                var esUltimo = (pos == filmList.length) || (pos == ultimoPantalla);
                var html = ((!esPrimero) ? arriba : arribah) + ((!esUltimo) ? abajo : abajoh);
                html = html.replace(/{ID}/g, nodos[ix].id);
                nodos[ix].parentNode.innerHTML += html;
            }
            var imagenes = getElementsByClassName(d, 'img', 'upimg');	
            for (ix in imagenes) {	
                setEventUp(imagenes[ix]);
            }
           
            imagenes = getElementsByClassName(d, 'img', 'downimg');
            for (ix in imagenes) {
                setEventDown(imagenes[ix]);
            }
        }
        readMovieList();
    }
     function doAddMediaInLists(){
         
         var username = '//span[text()="Bienvenido/a: "]/following-sibling::*'.findNode();
         var usern = username.lastChild.textContent;
         var notasfa = '//img[contains(@src, "com/imgs/ratings/")]'.findNodesArray();
         var notaspl = '//td[@class="rating2"]'.findNodesArray();
         
         var snotasul = 0;
         var snotasfa = 0;	
         var pvistasul = 0;	
         var mediauser;
         var hacer_todo = false;
         var afinidad = 0.00;
         var n1 = 0;
         var n2 = 0;
         var dif = 0;
         var coincfa = 0;
   
    if(notaspl.length == notasfa.length)
        hacer_todo = true;
       function injectMediasToMyLists(){
                var nodoTR = '//a[text()="Ordenar lista completa"]/ancestor::*[position()=6]'.findNode();	
	var nodoTit = '//span[contains(text(),"Lista: ")]'.findNode();
	var tituloaux = nodoTit.textContent.split(':');
	var titulo = "";
	if(tituloaux.length > 2)
	  for(i = 1; i < tituloaux.length ; i++)
	     titulo += tituloaux[i];
	else
	titulo = tituloaux[1];
      	var nodob = '//b[contains(text(), "Películas:")]'.findNode();
	var pvistasfa = 0;
	var peliculas = nodob.textContent.split(':')[1];
	peliculas = parseInt(peliculas);	
        for(i=0; i < notaspl.length; i++){
            if(notaspl[i].textContent != "-"){
	n1 = parseInt(notaspl[i].textContent);
       	snotasul += n1;
	pvistasul++;
	if(hacer_todo){
	     n2 = notasfa[i].src.split('/')[5].split('.')[0];       	          
	     if(n2 > n1)
	         dif += 90 - (n2*10 - n1*10);
	     else if(n1 > n2)
	         dif += 90 - (n1*10 - n2*10);
	     else {
                         dif += 100; 
	         coincfa++;
	      }
	} 
           } 
       } 
	for(j=0; j < notasfa.length; j++){
	       var auxnotasfa = notasfa[j].src.split('/')[5].split('.')[0];
	       snotasfa += parseInt(auxnotasfa);	
	       pvistasfa++;
	}
        if(peliculas > 20 && peliculas < 41) {
	var nodpag = '//a[@title="Cambiar posición"]'.findNode();
	var primerapos = nodpag.textContent;
	var pageact = 0;
	var pagnod = '//a[contains(@href, "listorder.php")]'.findNode();
	var numlist = pagnod.href.split('=')[1];
	var hacer_todo2 = false;
	var url = 'http://www.filmaffinity.com/es/mylist.php?list_id=' + numlist;
	if(primerapos == 1)
	  url += "&page=2";
	else
	  url += "&page=1";
	doGet(url, function (response) {
	var emptydiv = document.createElement('div');
                emptydiv.innerHTML = response;
                var notasfa2 = '//img[contains(@src, "com/imgs/ratings/")]'.findNodesArray(emptydiv);
         	var notaspl2 = '//td[@class="rating2"]'.findNodesArray(emptydiv); 
    if(notaspl2.length == notasfa2.length)
        hacer_todo2 = true;
        for(i=0; i < notaspl2.length; i++){
            if(notaspl2[i].textContent != "-"){
	n1 = parseInt(notaspl2[i].textContent);
       	snotasul += n1;
	pvistasul++;
	if(hacer_todo2){
	     n2 = notasfa2[i].src.split('/')[5].split('.')[0];       	          
	     if(n2 > n1)
	         dif += 90 - (n2*10 - n1*10);
	     else if(n1 > n2)
	         dif += 90 - (n1*10 - n2*10);
	     else {
                         dif += 100; 
	         coincfa++;
	      }
	} 
           } 
       } 
	for(j=0; j < notasfa2.length; j++){
	       var auxnotasfa2 = notasfa2[j].src.split('/')[5].split('.')[0];
	       snotasfa += parseInt(auxnotasfa2);
	       pvistasfa++;	
	}
	if(pvistasul == 0)
	   mediauser = "-,--";
	else {
	   mediauser = snotasul/parseInt(pvistasul);
	   mediauser = (mediauser.toFixed(2)).replace('.',',');
	}	
	var mediafa = snotasfa/parseInt(pvistasfa);
	mediafa = (mediafa.toFixed(2)).replace('.',',');
	if(hacer_todo && hacer_todo2){
	     if(pvistasul > 0){
	 afinidad = dif/pvistasul;
	 afinidad = (afinidad.toFixed(2)).replace('.',',');
	 }
	 else
	  afinidad = "-,--";
	}
	var newtr = d.createElement('tr');
	var txt = "";
	txt += '<td bgcolor="#ffffff" colspan="4" align="center"><br/><table bgcolor="#dcdcdc">';
	txt += '<tr><th height="30" colspan = "2" align="center" bgcolor="#5FACF3"><font color="#ffffff">' + titulo + '</font></th></tr>';
	txt += '<tr><td align="left">Media <b>' + usern + '</b>: </td><td align="right">' + mediauser + '</td></tr>';
	txt += '<tr><td width="200" align="left">Media <b>FA</b>: </td><td width="80" align="right">' + mediafa + '</td></tr>';
	   if(hacer_todo && hacer_todo2){
	      txt += '<tr><td width="*" align="left">Afinidad con <b>FA</b>: </td><td align="right">' + afinidad + ' %</td></tr>';
	      txt += '<tr><td width="*" align="left">Coincidencias con <b>FA</b>: </td><td align="right">' + coincfa + '/' + pvistasul + '</td></tr>';
	   }
	txt += '</table></td>';
	newtr.innerHTML = txt;
	nodoTR.parentNode.insertBefore(newtr, nodoTR);
	});
         }
	
       else {
	if(pvistasul == 0)
	   mediauser = "-,--";
	else {
	   mediauser = snotasul/parseInt(pvistasul);
	   mediauser = mediauser.toFixed(2);
	   mediauser = mediauser.replace('.',',');
	}	
	var mediafa = snotasfa/parseInt(pvistasfa);
	mediafa = mediafa.toFixed(2);
	mediafa = mediafa.replace('.',',');
	if(hacer_todo){
	     if(pvistasul > 0){
	 afinidad = dif/pvistasul;
	 afinidad = (afinidad.toFixed(2)).replace('.',',');
	 }
	 else
	  afinidad = "-,--";
	}
	var newtr = d.createElement('tr');
	var txt = "";
	txt += '<td bgcolor="#ffffff" colspan="4" align="center"><br/><table bgcolor="#dcdcdc">';
	txt += '<tr><th height="30" colspan = "2" align="center" bgcolor="#5FACF3"><font color="#ffffff">' + titulo + '</font></th></tr>';
	txt += '<tr><td align="left">Media <b>' + usern + '</b>: </td><td align="right">' + mediauser + '</td></tr>';
	txt += '<tr><td width="200" align="left">Media <b>FA</b>: </td><td width="80" align="right">' + mediafa + '</td></tr>';
	   if(hacer_todo){
	      txt += '<tr><td width="*" align="left">Afinidad con <b>FA</b>: </td><td align="right">' + afinidad + ' %</td></tr>';
	      txt += '<tr><td width="*" align="left">Coincidencias con <b>FA</b>: </td><td align="right">' + coincfa + '/' + pvistasul + '</td></tr>';
	   }
	txt += '</table></td>';
	newtr.innerHTML = txt;
	nodoTR.parentNode.insertBefore(newtr, nodoTR);
       }
        }
         function crear_tablas_listas(){
      
         var nodoTR = '//a[contains(text(),"Ver otra lista de")]/ancestor::*[position()=4]'.findNode();
	var userlist = '//span[@id="nick"]'.findNode().textContent;
            
	var titulo = '//i'.findNode().textContent;
	//Distintas variables para las sumas y los cálculos
	var snotasv = 0;
	var pvistasv = 0;
	var pvistasc = 0;
	var afinidad2 = 0.00;
	var afinidad3 = 0.00;
	var mediauser2;
	var n3 = 0;
	var difu = 0;
	var dif3 = 0;
	var coincfau = 0;
	var coinc3 = 0;
	var entro1 = false;
	var entro2 = false;
    
    var notasu = '//td[@class="rating"]'.findNodesArray();
    for(i=0; i < notaspl.length; i++){
	entro1 = false;
	entro2 = false;
       //Primero para el autor de la lista
       if(notaspl[i].textContent != "-"){
         entro1 = true;
         n1 = parseInt(notaspl[i].textContent);
         snotasul += n1;
         pvistasul++;
	if(hacer_todo){
	     n2 = notasfa[i].src.split('/')[5].split('.')[0];       	          
	     if(n2 > n1)
	         dif += 90 - (n2*10 - n1*10);
	     else if(n1 > n2)
	         dif += 90 - (n1*10 - n2*10);
	     else {
                         dif += 100; 
	         coincfa++;
	      } 
	   } 
           } 
      //Luego para el visitante de la lista
      if(notasu[i].textContent != "-"){
          entro2 = true;
          n3 = parseInt(notasu[i].textContent);	
          snotasv += n3;
          pvistasv++;
	if(hacer_todo){
	     if(n2 > n3)
	         difu += 90 - (n2*10 - n3*10);
	     else if(n3 > n2)
	         difu += 90 - (n3*10 - n2*10);
	     else {
                         difu += 100; 
	         coincfau++;
	      } 
	   } 
           } 
	if(entro1 && entro2){
 	  pvistasc++;
	    if(n1 > n3)
	         dif3 += 90 - (n1*10 - n3*10);
	     else if(n3 > n1)
	         dif3 += 90 - (n3*10 - n1*10);
	     else {
                         dif3 += 100; 
	         coinc3++;
	      } 
	   } 
       } 
	for(j=0; j < notasfa.length; j++){
	       var auxnotasfa = notasfa[j].src.split('/')[5].split('.')[0];
	       snotasfa += parseInt(auxnotasfa);	
	}
	if(pvistasul == 0)
	     mediauser = "-,--";
	else {
	     mediauser = snotasul/parseInt(pvistasul);
	     mediauser = mediauser.toFixed(2);
	     mediauser = mediauser.replace('.',',');
	   }
	if(pvistasv == 0)
	     mediauser2 = "-,--";
	else {
	     mediauser2 = snotasv/parseInt(pvistasv);
	     mediauser2 = mediauser2.toFixed(2);
	     mediauser2 = mediauser2.replace('.',',');
	   }	
	var mediafa = snotasfa/parseInt(notasfa.length);
	mediafa = mediafa.toFixed(2);
	mediafa = mediafa.replace('.',',');
	if(hacer_todo){
	   if(pvistasul == 0)
	      afinidad = "-,--";
	   else {
	      afinidad = dif/pvistasul;	 
	      afinidad = (afinidad.toFixed(2)).replace('.',',');
	    }
	   if(pvistasv == 0)
	     afinidad2 = "-,--";
	   else {
	     afinidad2 = difu/pvistasv;
	     afinidad2 = (afinidad2.toFixed(2)).replace('.',',');
	    }
	   if(pvistasc == 0)
	     afinidad3 = "-,--";
	   else {
	     afinidad3 = dif3/pvistasc;
	     afinidad3 = (afinidad3.toFixed(2)).replace('.',',');
	    }
	}
	var long1 = usern.length + userlist.length;
	var long2 = (long1*10)+15;
	var newtr = d.createElement('table');
	newtr.align = "center"
	var txt = "";
	txt += '<tbody><tr><td bgcolor="#ffffff" align="center"><br/><table bgcolor="#dcdcdc">';
	txt += '<tr><th height="30" colspan = "2" align="center" bgcolor="#5FACF3"><font color="#ffffff">' + titulo + '</font></th></tr>';
	txt += '<tr><td height="18" bgcolor="#4169E1" colspan="2" align="center"><font color="#FFD700"><b>Media</b></font></td></tr>';
	txt += '<tr><td width="*" align="center"><b>' + usern + '</b></td><td align="right">' + mediauser2 + '</td></tr>';
	txt += '<tr><td width="*" align="center"><b>' + userlist + '</b></td><td align="right">' + mediauser + '</td></tr>';
	txt += '<tr><td width="*" align="center"><b>FA</b></td><td align="right">' + mediafa + '</td></tr>';
	if(hacer_todo){
	txt += '<tr><td height="18" bgcolor="#4169E1" colspan="2" align="center"><font color="#FFD700"><b>Afinidades</b></font></td></tr>';
	txt += '<tr><td width="*" align="center"><b>' + usern + '</b> <-> <b>FA</b></td><td align="right">' + afinidad2 + ' %</td></tr>';
	txt += '<tr><td width="*" align="center"><b>' + userlist + '</b> <-> <b>FA</b></td><td width="70" align="right">' + afinidad + ' %</td></tr>';
	txt += '<tr><td width="' + long2 + '" align="center"><b>' + usern + '</b> <-> <b>' + userlist + '</b></td><td align="right">' + afinidad3 + ' %</td></tr>';
	txt += '<tr><td height="18" bgcolor="#4169E1" colspan="2" align="center"><font color="#FFD700"><b>Coincidencias</b></font></td></tr>';
	txt += '<tr><td width="*" align="center"><b>' + usern + '</b> <-> <b>FA</b></td><td align="right">' + coincfau + '/' + notaspl.length + '</td></tr>';
	txt += '<tr><td width="*" align="center"><b>' + userlist + '</b> <-> <b>FA</b></td><td align="right">' + coincfa + '/' + notaspl.length + '</td></tr>';
	txt += '<tr><td width="*" align="center"><b>' + usern + '</b> <-> <b>' + userlist + '</b></td><td align="right">' + coinc3 + '/' + pvistasc + '</td></tr>';
	}
	txt += '</table></td></tr>';
	newtr.innerHTML = txt;
	nodoTR.parentNode.insertBefore(newtr, nodoTR.nextSibling);
       }
         
       function injectMediasToOtherLists(){	
             
      setTimeout(crear_tablas_listas,2000);
      
         }
         
	if(inSection('MyList'))
	      injectMediasToMyLists();
	else {
	      if (getPreference('SHOWVOTESONFRIENDLISTS'))	     
	          injectMediasToOtherLists();	
	}
}
    // Soporte para plegar los menús
    function doMenus() {    
        
        // Muestra u oculta el menu que enviamos
        // recibe el nodo TD que contiene el titulo
        function doFold(menu, fold) {
            //alert(menu.textContent);
            var nodo = menu.parentNode.nextSibling;
            while (nodo != null) {
                if (nodo.nodeType != 3) {
                    if (fold) nodo.style.display = "none";
                    else nodo.style.display = "";
                }
                nodo = nodo.nextSibling;
            }
        }
        function onFold() {
            var nodo = this.parentNode.nextSibling;
            var folded = nodo.style.display == "none";
            doFold(this, !folded);
            setPreference("menuFolded." + this.textContent, !folded);
        }
        function injectFoldCode() {
            var menus = "//td[@class='menutitle']".findNodesArray();
            for (var ix in menus) {
                var menu = menus[ix];
                menu.style.cursor = "pointer";
                menu.addEventListener("click", onFold, true);
                //alert(menu.textContent);
                doFold(menu, getPreference("menuFolded." + menu.textContent, false));
            }
        }
        //injectNewMenus();
        //if (getPreference('FOLDMENUS', false)) {
        //    injectFoldCode();
        //}
for(var ix in menus) {	
    var menu = menus[ix];	
    if(getPreference(menu.cond, true)){	
       var numaux = parseInt(ix);	
       switch(numaux){	
       case 0:
       var nodo = "//div[@class='lsmheader' and contains(text(), 'TOPs')]".findNode();	
       break;
       case 1:
       var nodo = "//div[@class='lsmheader' and contains(text(), 'Usuarios')]".findNode();
       break;
       case 2:
       var nodo = "//div[@class='lsmheader' and contains(text(), 'Informaci')]".findNode();
       break;
	   }
        
       var newdiv = d.createElement('div');
       newdiv.textContent = menu['name'];
       newdiv.className = "lsmheader";
       var newul = d.createElement('ul');
	for(var ox in menu['options']){
	    var option = menu['options'][ox];
	    var newli = d.createElement('li');
	    var newa = d.createElement('a');
	    newa.textContent = option['title'];
   	    newa.href = option['href'];  
                    newa.target = option['target'];
                  
	    if(option['onclick'] != null){
                    newa.addEventListener("click", option['onclick'], true);
	}
                    newul.appendChild(newli);
                    newli.appendChild(newa);         
	
	}
	
        nodo.parentNode.insertBefore(newdiv, nodo);
        nodo.parentNode.insertBefore(newul, nodo);
 
	}
	}     
    }
    // Añade enlaces a la pagina de busqueda
    function doProcessSearch() {
        /* todo: reparar, no funciona correctamente
         var stype = url.substr(url.lastIndexOf('=') + 1).replace('#','');
         log("Process Search: "+stype);
         var nodo = "//option[@value='" + stype + "']".findNode();
         var elem = d.forms[0].elements[1];
         if (nodo != null && typeof nodo != "undefined") elem.selectedIndex = nodo.index;
         d.forms[0].elements[0].focus();
         */
    }
    function doFixEnglishLink() {
        for (var i = 0; i < d.links.length; ++i)
            if (d.links[i].href == 'http://www.filmaffinity.com/en/main.html')
                d.links[i].href = url.replace('/es/', '/en/');
    }
    function hideTVShows(ancestor) {
        var nodos = ("//a[contains(text(),'(Serie de TV)')]/ancestor::*[position()=" + ancestor + "]").findNodesArray();
        for (ix in nodos) {
            nodos[ix].style.display = "none";
        }
    }
    function addCountryFlag(country) {	
        var imgTemplate = '<img style="margin-left:5px;" border="0" align="middle" title="{NAME}" src="/imgs/countries/{CODE}.jpg"/>';
          var nodo = "//b[text()='PAÍS']/../following-sibling::*/img".findNode();
        if (nodo != null && typeof nodo != "undefined") {
            var code = getCountryCode(country);
            var html = nodo.parentNode.innerHTML;
            if (html.indexOf(code + ".jpg") == -1) {
                nodo.parentNode.innerHTML = html + imgTemplate.replace(/{NAME}/g, country).replace(/{CODE}/g, getCountryCode(country));
            }
        }
    }
    // Banderas de los paises coproductores.
    function doAddCoproductionFlags() {        
        var productora = '//th[text()="PRODUCTORA"]/following-sibling::*'.findNode().textContent.toLowerCase().split(';')[0];
        var codigos = [];
        for (ix in countriesCodes) {
            codigos.push(ix);
        }
        codigos.sort(function(a, b) {
            return b.length - a.length;
        });
        if (productora.indexOf('coproducción') > -1)
            for (var ix in codigos) {
                var pais = codigos[ix];
                if (productora.indexOf(pais.toLowerCase()) > -1) {
                    addCountryFlag(pais);
                    productora = productora.replace(pais.toLowerCase(), '');
                }
            }
    }
    //Centrado de la página en la ventana del navegador
    function doCenterPage() {
        GM_addStyle('.ot {margin-left:auto;margin-right:auto;');
    }
    // Registra los comandos de GM
    function doRegisterCommands() {
        GM_registerMenuCommand('Configurar ' + appName + ' ' + appVersion + '...', preferences);
        GM_registerMenuCommand('Ver información de depurado', showLog);
    }
    // Alinear el icono de zoom a la imagen, por si hemos centrado con el script o
    // via stylish
    function doFixZoomIcon() {
        // Todo: Supongo que este classname sera temporal
        var icon = "//img[@class='foto']".findNode();
        log("icono: " + icon);
        if (icon != null && typeof icon != "undefined") {
            var thumb = "//img[@class='foto']/../a/img".findNode();
            icon.style.position = "relative";
            icon.style.left = "-" + (thumb.width / 2 - 7) + "px"; // Las miniaturas tienen 100 de ancho - mitad de icono
            icon.style.top = "15px"; // bajamos el icono para sobreponerlo a la miniatura
        }
    }
    var browserCodes = {'Netscape':'FF','Opera':'OP'};
    function getBrowserCode() {
        var browserName = navigator.appName;
        return browserCodes[browserName];
    }
    function isLogged() {
        //var nodo = "//td[@class='menu2']/a[text()='Salir']".findNode();
          var nodo = "//li/a[text()='Salir']".findNode();	
        return nodo != null;
    }
    function getUserId() {
        //var nodo = "//li/a[contains(text(),'ticas favoritas')]".findNode();
        
        myid = parseInt(getPreference('idinput'));
        var usuario = myid;
        log('Usuario: ' + usuario);
        return usuario;
    }
    function doUpdateMultiuser() {
        var sections = ['cfg.','friends.','list.','sml.'];
        // Copiamos los valores de configuración
        // La lista de amigos
        // SoulMates
        for (i in sections) {
            var section = sections[i];
            var values = getValues(section);
            for (ix in values) {
                var c = values[ix];
                var valor = GM_getValue(section + c);
                log('migrando valor: ' + section + c + " :: " + valor);
                if (typeof valor != 'undefined') {
                    GM_setValue(userId + "." + section + c, valor);
                    GM_deleteValue(section + c);
                }
            }
        }
        var valueNames = ['smc','ssml'];
        for (ix in valueNames) {
            valor = GM_getValue(valueNames[ix]);
            if (typeof valor != 'undefined') {
                GM_setValue(userId + '.' + valueNames[ix], valor);
                GM_deleteValue(valueNames[ix]);
            }
            ;
        }
        ;
        setPreference('MUMP', false);
    }
    ;
    // Nos redirige a la pagina de busqueda global en caso de que no tengamos resultados
    function doRedirectSearch() {
        var anchors = "//img[contains(@src,'countries')]/parent::*/b/a".findNodesArray();
        if (anchors.length == 0) {
            var global = "//a[text()='buscador global']".findNode();
            location.href = global.href;
            return false;
        }
        return true;
    }
    // Obtiene el valor UCD necesario para subir votos
    function doCaptureUCD() {
        var ucd = "//select[contains(@id,'rate')]/@onchange".findNode().textContent.split("'")[3];
        setPreference("UCD", ucd);
    }
    // Simplemente captura las puntuaciones y las mandamos al log
    function doCaptureReviews() {
        var nodos = "//img[contains(@src,'myratings')]/ancestor::*[position()=6]/preceding-sibling::*[1]/td".findNodesArray();
        var tmp = GM_getValue("reviews");
        var reviews;
        if (typeof tmp == "undefined") {
            reviews = [];
        } else {
            reviews = eval(tmp);
        }
        for (var ix in nodos) {
            var sies = nodos[ix].textContent.split('de')[0];
            var total = nodos[ix].textContent.split('de')[1].split('usuarios')[0];
            reviews.push({si:sies,total:total});
        }
        for (ix in reviews) {
            log(reviews[ix].si + ";" + reviews[ix].total);
        }
        GM_setValue("reviews", reviews.toSource());
    }
    
    function afinidad_votos(diferencia){
    
    	if(diferencia > 24)
            return 0.0;
        else if (diferencia > 17)
            return 0.25;
        else if (diferencia > 12)
            return 0.5;
        else if (diferencia > 9)
            return 0.75;
        else if (diferencia > 5)
            return 1.0;
        else if (diferencia > 3)
            return 1.25;
        else if (diferencia > 1.5)
            return 1.55;
        else if (diferencia > 0.7)
            return 1.75;
        else
            return 2.0;
    }  
    
    function afinidad_votos_años(diferencia){
    
    	if(diferencia > 10.909)
            return 0.0;
        else if (diferencia > 7.727)
            return 0.25;
        else if (diferencia > 5.454)
            return 0.5;
        else if (diferencia > 4.090)
            return 0.75;
        else if (diferencia > 2.272)
            return 1.0;
        else if (diferencia > 1.363)
            return 1.25;
        else if (diferencia > 0.681)
            return 1.55;
        else if (diferencia > 0.318)
            return 1.75;
        else
            return 2.0;
    } 
    
    function afinidad_medias(diferencia){
    
    	if(diferencia > 5)
            return 0.0;
        else if (diferencia > 4)
            return 0.15;
        else if (diferencia > 3)
            return 0.4;        
        else if (diferencia > 1.5)
            return 0.75;        
        else if (diferencia > 0.7)
            return 1.3;
        else if (diferencia > 0.3)
            return 1.75;
        else
            return 2.0;
    } 
       
   function afinidad_npaises(diferencia){
    
    	if(diferencia > 40)
            return 0.0;
        else if (diferencia > 25)
            return 0.15;
        else if (diferencia > 15)
            return 0.5;        
        else if (diferencia > 10)
            return 1;        
        else if (diferencia > 5)
            return 1.5;
        else
            return 2.0;
    } 
    
   function doAddMyStatsToOthers(){
	
    var myid = "";
    	myid = getPreference('idinput');
    var suid = d.URL.split('=')[1];
    if(myid == suid)
        return 0;
       
    var nodotodo = '//caption[contains(text(),"Votaciones por valor")]/ancestor::*[position()=2]'.findNode();
	var nodoval = '//caption[contains(text(),"Votaciones por valor")]/following-sibling::*'.findNode();
	var nodogen = '//caption[contains(text(),"Votaciones por g")]/following-sibling::*'.findNode();
	var nodopais = '//caption[contains(text(),"Votaciones por pa")]/following-sibling::*'.findNode();
	var nodoanios = '//caption[contains(text(),"Votaciones por años")]/following-sibling::*'.findNode();
	var nick1 = '//span[@id="nick"]'.findNode().textContent;
	var nodonick2 = '//span[contains(text(),"Bienvenido/a")]'.findNode();
	var nick2 = nodonick2.nextSibling.lastChild.textContent;
	var anchob = 0;
	
       
	var txt2 = "";
	var tablagen = d.createElement('table');
    
      //Para afinidad entre géneros
       var datosGeneros = [
            {nombre:"Drama",votos:0,media:0},
            {nombre:'Comedia',votos:0,media:0},
            {nombre:"Thriller",votos:0,media:0},
            {nombre:'Romance',votos:0,media:0},
            {nombre:'Acción',votos:0,media:0},
            {nombre:'Fantástico',votos:0,media:0},
            {nombre:'Intriga',votos:0,media:0},
            {nombre:"Ciencia ficción",votos:0,media:0},
            {nombre:'Aventuras',votos:0,media:0},
            {nombre:"Animación",votos:0,media:0},
            {nombre:'Terror',votos:0,media:0},
            {nombre:'Documental',votos:0,media:0},
            {nombre:'Infantil',votos:0,media:0},
            {nombre:'Musical',votos:0,media:0},
            {nombre:"Western",votos:0,media:0},
            {nombre:'Bélico',votos:0,media:0},
            {nombre:"Cine negro",votos:0,media:0},
            {nombre:'Serie de TV',votos:0,media:0}
        ];
       var totalGens = nodogen.rows.length-1;      		
			
            for (var i = 1; i <= totalGens; i++) {
                var genero = nodogen.rows[i].cells[1].textContent;
                var votos = parseInt(nodogen.rows[i].cells[0].textContent);                
                var media = parseFloat(nodogen.rows[i].cells[2].textContent.replace(',', '.'));                
                var ix = inArray(datosGeneros, 'nombre', genero);                
                datosGeneros[ix].votos = votos;
                datosGeneros[ix].media = media;
            }
            datosGeneros.sort(function(a, b) {
                return (a.nombre - b.nombre);
            });
       
       //Afinidad Paises
       var datosPaises = [
        {nombre:"Afganistán",votos:0,media:0},
		{nombre:"Albania",votos:0,media:0},
		{nombre:"Alemania",votos:0,media:0},
		{nombre:"Alemania del Este (RDA)",votos:0,media:0},
		{nombre:"Alemania del Oeste (RFA)",votos:0,media:0},
		{nombre:"Andorra",votos:0,media:0},
		{nombre:"Angola",votos:0,media:0},
		{nombre:"Antigua y Barbuda",votos:0,media:0},
		{nombre:"Arabia Saudí",votos:0,media:0},
		{nombre:"Argelia",votos:0,media:0},
		{nombre:"Argentina",votos:0,media:0},
		{nombre:"Armenia",votos:0,media:0},
		{nombre:"Australia",votos:0,media:0},
		{nombre:"Austria",votos:0,media:0},
		{nombre:"Azerbaijan",votos:0,media:0},
		{nombre:"Bahamas",votos:0,media:0},
		{nombre:"Bahrein",votos:0,media:0},
		{nombre:"Bangladesh",votos:0,media:0},
		{nombre:"Barbados",votos:0,media:0},
		{nombre:"Bélgica",votos:0,media:0},
		{nombre:"Belize",votos:0,media:0},
		{nombre:"Benín",votos:0,media:0},
		{nombre:"Bielorusia",votos:0,media:0},
		{nombre:"Bolivia",votos:0,media:0},
		{nombre:"Bosnia y Herzegovina",votos:0,media:0},
		{nombre:"Botswana",votos:0,media:0},
		{nombre:"Brasil",votos:0,media:0},
		{nombre:"Brunei",votos:0,media:0},
		{nombre:"Bulgaria",votos:0,media:0},
		{nombre:"Burkina Faso",votos:0,media:0},
		{nombre:"Burundi",votos:0,media:0},
		{nombre:"Bután",votos:0,media:0},
		{nombre:"Cabo Verde",votos:0,media:0},
		{nombre:"Camboya",votos:0,media:0},
		{nombre:"Camerún",votos:0,media:0},
		{nombre:"Canadá",votos:0,media:0},
		{nombre:"Chad",votos:0,media:0},
		{nombre:"Checoslovaquia",votos:0,media:0},
		{nombre:"Chile",votos:0,media:0},
		{nombre:"China",votos:0,media:0},
		{nombre:"Chipre",votos:0,media:0},
		{nombre:"Colombia",votos:0,media:0},
		{nombre:"Comores",votos:0,media:0},
		{nombre:"Congo",votos:0,media:0},
		{nombre:"Corea del Norte",votos:0,media:0},
		{nombre:"Corea del Sur",votos:0,media:0},
		{nombre:"Costa de Marfil",votos:0,media:0},
		{nombre:"Costa Rica",votos:0,media:0},
		{nombre:"Croacia",votos:0,media:0},
		{nombre:"Cuba",votos:0,media:0},
		{nombre:"Dinamarca",votos:0,media:0},
		{nombre:"Dominica",votos:0,media:0},
		{nombre:"Ecuador",votos:0,media:0},
		{nombre:"Egipto",votos:0,media:0},
		{nombre:"El Salvador",votos:0,media:0},
		{nombre:"Emiratos Árabes",votos:0,media:0},
		{nombre:"Eritrea",votos:0,media:0},
		{nombre:"Eslovaquia",votos:0,media:0},
		{nombre:"Eslovenia",votos:0,media:0},
		{nombre:"España",votos:0,media:0},
		{nombre:"Estados Unidos",votos:0,media:0},
		{nombre:"Estonia",votos:0,media:0},
		{nombre:"Etiopía",votos:0,media:0},
		{nombre:"Fidji",votos:0,media:0},
		{nombre:"Filipinas",votos:0,media:0},
		{nombre:"Finlandia",votos:0,media:0},
		{nombre:"Francia",votos:0,media:0},
		{nombre:"Gabón",votos:0,media:0},
		{nombre:"Gambia",votos:0,media:0},
		{nombre:"Georgia",votos:0,media:0},
		{nombre:"Ghana",votos:0,media:0},
		{nombre:"Granada",votos:0,media:0},
		{nombre:"Grecia",votos:0,media:0},
		{nombre:"Groenlandia",votos:0,media:0},
		{nombre:"Guatemala",votos:0,media:0},
		{nombre:"Guinea",votos:0,media:0},
		{nombre:"Guinea Bissau",votos:0,media:0},
		{nombre:"Guinea Ecuatorial",votos:0,media:0},
		{nombre:"Guyana",votos:0,media:0},
		{nombre:"Haití",votos:0,media:0},
		{nombre:"Honduras",votos:0,media:0},
		{nombre:"Hong Kong",votos:0,media:0},
		{nombre:"Hungría",votos:0,media:0},
		{nombre:"India",votos:0,media:0},
		{nombre:"Indonesia",votos:0,media:0},
		{nombre:"Irak",votos:0,media:0},
		{nombre:"Irán",votos:0,media:0},
		{nombre:"Irlanda",votos:0,media:0},
		{nombre:"Islandia",votos:0,media:0},
		{nombre:"Israel",votos:0,media:0},
		{nombre:"Italia",votos:0,media:0},
		{nombre:"Jamaica",votos:0,media:0},
		{nombre:"Japón",votos:0,media:0},
		{nombre:"Jordania",votos:0,media:0},
		{nombre:"Kazajstán",votos:0,media:0},
		{nombre:"Kenia",votos:0,media:0},
		{nombre:"Kirguizstán",votos:0,media:0},
		{nombre:"Kuwait",votos:0,media:0},
		{nombre:"Laos",votos:0,media:0},
		{nombre:"Lesotho",votos:0,media:0},
		{nombre:"Letonia",votos:0,media:0},
		{nombre:"Líbano",votos:0,media:0},
		{nombre:"Liberia",votos:0,media:0},
		{nombre:"Libia",votos:0,media:0},
		{nombre:"Liechtenstein",votos:0,media:0},
		{nombre:"Lituania",votos:0,media:0},
		{nombre:"Luxemburgo",votos:0,media:0},
		{nombre:"Macedonia",votos:0,media:0},
		{nombre:"Madagascar",votos:0,media:0},
		{nombre:"Malasia",votos:0,media:0},
		{nombre:"Malawi",votos:0,media:0},
		{nombre:"Maldivas",votos:0,media:0},
		{nombre:"Mali",votos:0,media:0},
		{nombre:"Malta",votos:0,media:0},
		{nombre:"Marruecos",votos:0,media:0},
		{nombre:"Marshall (Islas)",votos:0,media:0},
		{nombre:"Mauricio (Isla)",votos:0,media:0},
		{nombre:"Mauritania",votos:0,media:0},
		{nombre:"México",votos:0,media:0},
		{nombre:"Micronesia",votos:0,media:0},
		{nombre:"Moldavia",votos:0,media:0},
		{nombre:"Mónaco",votos:0,media:0},
		{nombre:"Mongolia",votos:0,media:0},
		{nombre:"Montenegro",votos:0,media:0},
		{nombre:"Mozambique",votos:0,media:0},
		{nombre:"Myanmar - Birmania",votos:0,media:0},
		{nombre:"Namibia",votos:0,media:0},
		{nombre:"Nepal",votos:0,media:0},
		{nombre:"Nicaragua",votos:0,media:0},
		{nombre:"Níger",votos:0,media:0},
		{nombre:"Nigeria",votos:0,media:0},
		{nombre:"Noruega",votos:0,media:0},
		{nombre:"Nueva Zelanda",votos:0,media:0},
		{nombre:"Omán",votos:0,media:0},
		{nombre:"Países Bajos (Holanda)",votos:0,media:0},
		{nombre:"Panamá",votos:0,media:0},
		{nombre:"Papuasia Nueva Guinea",votos:0,media:0},
		{nombre:"Paquistán",votos:0,media:0},
		{nombre:"Paraguay",votos:0,media:0},
		{nombre:"Perú",votos:0,media:0},
		{nombre:"Polonia",votos:0,media:0},
		{nombre:"Portugal",votos:0,media:0},
		{nombre:"Puerto Rico",votos:0,media:0},
		{nombre:"Qatar",votos:0,media:0},
		{nombre:"Reino Unido",votos:0,media:0},
		{nombre:"Rep. Centroafricana",votos:0,media:0},
		{nombre:"Rep. Dominicana",votos:0,media:0},
		{nombre:"República Checa",votos:0,media:0},
		{nombre:"República del Congo",votos:0,media:0},
		{nombre:"Ruanda",votos:0,media:0},
		{nombre:"Rumanía",votos:0,media:0},
		{nombre:"Rusia",votos:0,media:0},
		{nombre:"Samoa",votos:0,media:0},
		{nombre:"San Marino",votos:0,media:0},
		{nombre:"Senegal",votos:0,media:0},
		{nombre:"Serbia",votos:0,media:0},
		{nombre:"Serbia y Montenegro",votos:0,media:0},
		{nombre:"Seychelles",votos:0,media:0},
		{nombre:"Sierra Leona",votos:0,media:0},
		{nombre:"Singapur",votos:0,media:0},
		{nombre:"Siria",votos:0,media:0},
		{nombre:"Somalia",votos:0,media:0},
		{nombre:"Sri Lanka",votos:0,media:0},
		{nombre:"Sudáfrica",votos:0,media:0},
		{nombre:"Sudán",votos:0,media:0},
		{nombre:"Suecia",votos:0,media:0},
		{nombre:"Suiza",votos:0,media:0},
		{nombre:"Surinam",votos:0,media:0},
		{nombre:"Swazilandia",votos:0,media:0},
		{nombre:"Tailandia",votos:0,media:0},
		{nombre:"Taiwán",votos:0,media:0},
		{nombre:"Tajikistan",votos:0,media:0},
		{nombre:"Tanzania",votos:0,media:0},
		{nombre:"Territorios Palestinos",votos:0,media:0},
		{nombre:"Togo",votos:0,media:0},
		{nombre:"Trinidad y Tobago",votos:0,media:0},
		{nombre:"Túnez",votos:0,media:0},
		{nombre:"Turkmenistán",votos:0,media:0},
		{nombre:"Turquía",votos:0,media:0},
		{nombre:"Ucrania",votos:0,media:0},
		{nombre:"Uganda",votos:0,media:0},
		{nombre:"Unión Soviética (URSS)",votos:0,media:0},
		{nombre:"Uruguay",votos:0,media:0},
		{nombre:"Uzbekistan",votos:0,media:0},
		{nombre:"Venezuela",votos:0,media:0},
		{nombre:"Vietnam",votos:0,media:0},
		{nombre:"Yemen",votos:0,media:0},
		{nombre:"Yugoslavia",votos:0,media:0},
		{nombre:"Zambia",votos:0,media:0},
		{nombre:"Zimbabwe",votos:0,media:0} 
           ];
	   //Calculo datos continentes otro user
       var datosContinentes = [
            {nombre:"América del Norte",votos:0,media:0},
            {nombre:'Europa',votos:0,media:0},
            {nombre:"América del Sur",votos:0,media:0},
            {nombre:'Oceanía',votos:0,media:0},
            {nombre:'Asia',votos:0,media:0},
            {nombre:'África',votos:0,media:0},
            {nombre:'NA',votos:0,media:0}
        ];
    		var totalPaises = nodopais.rows.length-1;
       		var totalVotos = 0;
			var contador = 1;
            for (var i = 1; i <= totalPaises; i++) {
                var pais = nodopais.rows[i].cells[1].textContent;
                var votos = parseInt(nodopais.rows[i].cells[0].textContent);
                totalVotos += votos;
                var media = parseFloat(nodopais.rows[i].cells[2].textContent.replace(',', '.'));
                var continente = getContinent(getCountryCode(pais));
                var ix = inArray(datosContinentes, 'nombre', continente);
                var iy = inArray(datosPaises, 'nombre', pais);
                var oldVotos = datosContinentes[ix].votos;
                var oldMedia = datosContinentes[ix].media;
                datosContinentes[ix].votos = oldVotos + votos;
                datosContinentes[ix].media = ((oldVotos * oldMedia) + (votos * media)) / (oldVotos + votos);
                datosPaises[iy].votos = votos;
                datosPaises[iy].media = media;
            }
            datosContinentes.sort(function(a, b) {
                return (b.votos - a.votos);
            }); 
       		datosPaises.sort(function(a, b) {
                return (a.nombre - b.nombre);
            }); 
	//tablagen.className = "reptable";
	tablagen.width = "100%";
	tablagen.border = "0";
	var txt1 = "";
    var url = "http://www.filmaffinity.com/es/userrep.php?user_id=" + myid;
	doGet(url, function(response) {
	var emptydiv = document.createElement('div');
                emptydiv.innerHTML = response;
	var nodo2val = '//caption[contains(text(),"Votaciones por valor")]/following-sibling::*'.findNode(emptydiv);
	var nodo2gen = '//caption[contains(text(),"Votaciones por g")]/following-sibling::*'.findNode(emptydiv);
	var nodo2pais = '//caption[contains(text(),"Votaciones por pa")]/following-sibling::*'.findNode(emptydiv);
	var nodo2anios = '//caption[contains(text(),"Votaciones por a")]/following-sibling::*'.findNode(emptydiv);	
     
    //Para nosotros
        //Afinidad Paises
       var datosPaises2 = [
        {nombre:"Afganistán",votos:0,media:0},
		{nombre:"Albania",votos:0,media:0},
		{nombre:"Alemania",votos:0,media:0},
		{nombre:"Alemania del Este (RDA)",votos:0,media:0},
		{nombre:"Alemania del Oeste (RFA)",votos:0,media:0},
		{nombre:"Andorra",votos:0,media:0},
		{nombre:"Angola",votos:0,media:0},
		{nombre:"Antigua y Barbuda",votos:0,media:0},
		{nombre:"Arabia Saudí",votos:0,media:0},
		{nombre:"Argelia",votos:0,media:0},
		{nombre:"Argentina",votos:0,media:0},
		{nombre:"Armenia",votos:0,media:0},
		{nombre:"Australia",votos:0,media:0},
		{nombre:"Austria",votos:0,media:0},
		{nombre:"Azerbaijan",votos:0,media:0},
		{nombre:"Bahamas",votos:0,media:0},
		{nombre:"Bahrein",votos:0,media:0},
		{nombre:"Bangladesh",votos:0,media:0},
		{nombre:"Barbados",votos:0,media:0},
		{nombre:"Bélgica",votos:0,media:0},
		{nombre:"Belize",votos:0,media:0},
		{nombre:"Benín",votos:0,media:0},
		{nombre:"Bielorusia",votos:0,media:0},
		{nombre:"Bolivia",votos:0,media:0},
		{nombre:"Bosnia y Herzegovina",votos:0,media:0},
		{nombre:"Botswana",votos:0,media:0},
		{nombre:"Brasil",votos:0,media:0},
		{nombre:"Brunei",votos:0,media:0},
		{nombre:"Bulgaria",votos:0,media:0},
		{nombre:"Burkina Faso",votos:0,media:0},
		{nombre:"Burundi",votos:0,media:0},
		{nombre:"Bután",votos:0,media:0},
		{nombre:"Cabo Verde",votos:0,media:0},
		{nombre:"Camboya",votos:0,media:0},
		{nombre:"Camerún",votos:0,media:0},
		{nombre:"Canadá",votos:0,media:0},
		{nombre:"Chad",votos:0,media:0},
		{nombre:"Checoslovaquia",votos:0,media:0},
		{nombre:"Chile",votos:0,media:0},
		{nombre:"China",votos:0,media:0},
		{nombre:"Chipre",votos:0,media:0},
		{nombre:"Colombia",votos:0,media:0},
		{nombre:"Comores",votos:0,media:0},
		{nombre:"Congo",votos:0,media:0},
		{nombre:"Corea del Norte",votos:0,media:0},
		{nombre:"Corea del Sur",votos:0,media:0},
		{nombre:"Costa de Marfil",votos:0,media:0},
		{nombre:"Costa Rica",votos:0,media:0},
		{nombre:"Croacia",votos:0,media:0},
		{nombre:"Cuba",votos:0,media:0},
		{nombre:"Dinamarca",votos:0,media:0},
		{nombre:"Dominica",votos:0,media:0},
		{nombre:"Ecuador",votos:0,media:0},
		{nombre:"Egipto",votos:0,media:0},
		{nombre:"El Salvador",votos:0,media:0},
		{nombre:"Emiratos Árabes",votos:0,media:0},
		{nombre:"Eritrea",votos:0,media:0},
		{nombre:"Eslovaquia",votos:0,media:0},
		{nombre:"Eslovenia",votos:0,media:0},
		{nombre:"España",votos:0,media:0},
		{nombre:"Estados Unidos",votos:0,media:0},
		{nombre:"Estonia",votos:0,media:0},
		{nombre:"Etiopía",votos:0,media:0},
		{nombre:"Fidji",votos:0,media:0},
		{nombre:"Filipinas",votos:0,media:0},
		{nombre:"Finlandia",votos:0,media:0},
		{nombre:"Francia",votos:0,media:0},
		{nombre:"Gabón",votos:0,media:0},
		{nombre:"Gambia",votos:0,media:0},
		{nombre:"Georgia",votos:0,media:0},
		{nombre:"Ghana",votos:0,media:0},
		{nombre:"Granada",votos:0,media:0},
		{nombre:"Grecia",votos:0,media:0},
		{nombre:"Groenlandia",votos:0,media:0},
		{nombre:"Guatemala",votos:0,media:0},
		{nombre:"Guinea",votos:0,media:0},
		{nombre:"Guinea Bissau",votos:0,media:0},
		{nombre:"Guinea Ecuatorial",votos:0,media:0},
		{nombre:"Guyana",votos:0,media:0},
		{nombre:"Haití",votos:0,media:0},
		{nombre:"Honduras",votos:0,media:0},
		{nombre:"Hong Kong",votos:0,media:0},
		{nombre:"Hungría",votos:0,media:0},
		{nombre:"India",votos:0,media:0},
		{nombre:"Indonesia",votos:0,media:0},
		{nombre:"Irak",votos:0,media:0},
		{nombre:"Irán",votos:0,media:0},
		{nombre:"Irlanda",votos:0,media:0},
		{nombre:"Islandia",votos:0,media:0},
		{nombre:"Israel",votos:0,media:0},
		{nombre:"Italia",votos:0,media:0},
		{nombre:"Jamaica",votos:0,media:0},
		{nombre:"Japón",votos:0,media:0},
		{nombre:"Jordania",votos:0,media:0},
		{nombre:"Kazajstán",votos:0,media:0},
		{nombre:"Kenia",votos:0,media:0},
		{nombre:"Kirguizstán",votos:0,media:0},
		{nombre:"Kuwait",votos:0,media:0},
		{nombre:"Laos",votos:0,media:0},
		{nombre:"Lesotho",votos:0,media:0},
		{nombre:"Letonia",votos:0,media:0},
		{nombre:"Líbano",votos:0,media:0},
		{nombre:"Liberia",votos:0,media:0},
		{nombre:"Libia",votos:0,media:0},
		{nombre:"Liechtenstein",votos:0,media:0},
		{nombre:"Lituania",votos:0,media:0},
		{nombre:"Luxemburgo",votos:0,media:0},
		{nombre:"Macedonia",votos:0,media:0},
		{nombre:"Madagascar",votos:0,media:0},
		{nombre:"Malasia",votos:0,media:0},
		{nombre:"Malawi",votos:0,media:0},
		{nombre:"Maldivas",votos:0,media:0},
		{nombre:"Mali",votos:0,media:0},
		{nombre:"Malta",votos:0,media:0},
		{nombre:"Marruecos",votos:0,media:0},
		{nombre:"Marshall (Islas)",votos:0,media:0},
		{nombre:"Mauricio (Isla)",votos:0,media:0},
		{nombre:"Mauritania",votos:0,media:0},
		{nombre:"México",votos:0,media:0},
		{nombre:"Micronesia",votos:0,media:0},
		{nombre:"Moldavia",votos:0,media:0},
		{nombre:"Mónaco",votos:0,media:0},
		{nombre:"Mongolia",votos:0,media:0},
		{nombre:"Montenegro",votos:0,media:0},
		{nombre:"Mozambique",votos:0,media:0},
		{nombre:"Myanmar - Birmania",votos:0,media:0},
		{nombre:"Namibia",votos:0,media:0},
		{nombre:"Nepal",votos:0,media:0},
		{nombre:"Nicaragua",votos:0,media:0},
		{nombre:"Níger",votos:0,media:0},
		{nombre:"Nigeria",votos:0,media:0},
		{nombre:"Noruega",votos:0,media:0},
		{nombre:"Nueva Zelanda",votos:0,media:0},
		{nombre:"Omán",votos:0,media:0},
		{nombre:"Países Bajos (Holanda)",votos:0,media:0},
		{nombre:"Panamá",votos:0,media:0},
		{nombre:"Papuasia Nueva Guinea",votos:0,media:0},
		{nombre:"Paquistán",votos:0,media:0},
		{nombre:"Paraguay",votos:0,media:0},
		{nombre:"Perú",votos:0,media:0},
		{nombre:"Polonia",votos:0,media:0},
		{nombre:"Portugal",votos:0,media:0},
		{nombre:"Puerto Rico",votos:0,media:0},
		{nombre:"Qatar",votos:0,media:0},
		{nombre:"Reino Unido",votos:0,media:0},
		{nombre:"Rep. Centroafricana",votos:0,media:0},
		{nombre:"Rep. Dominicana",votos:0,media:0},
		{nombre:"República Checa",votos:0,media:0},
		{nombre:"República del Congo",votos:0,media:0},
		{nombre:"Ruanda",votos:0,media:0},
		{nombre:"Rumanía",votos:0,media:0},
		{nombre:"Rusia",votos:0,media:0},
		{nombre:"Samoa",votos:0,media:0},
		{nombre:"San Marino",votos:0,media:0},
		{nombre:"Senegal",votos:0,media:0},
		{nombre:"Serbia",votos:0,media:0},
		{nombre:"Serbia y Montenegro",votos:0,media:0},
		{nombre:"Seychelles",votos:0,media:0},
		{nombre:"Sierra Leona",votos:0,media:0},
		{nombre:"Singapur",votos:0,media:0},
		{nombre:"Siria",votos:0,media:0},
		{nombre:"Somalia",votos:0,media:0},
		{nombre:"Sri Lanka",votos:0,media:0},
		{nombre:"Sudáfrica",votos:0,media:0},
		{nombre:"Sudán",votos:0,media:0},
		{nombre:"Suecia",votos:0,media:0},
		{nombre:"Suiza",votos:0,media:0},
		{nombre:"Surinam",votos:0,media:0},
		{nombre:"Swazilandia",votos:0,media:0},
		{nombre:"Tailandia",votos:0,media:0},
		{nombre:"Taiwán",votos:0,media:0},
		{nombre:"Tajikistan",votos:0,media:0},
		{nombre:"Tanzania",votos:0,media:0},
		{nombre:"Territorios Palestinos",votos:0,media:0},
		{nombre:"Togo",votos:0,media:0},
		{nombre:"Trinidad y Tobago",votos:0,media:0},
		{nombre:"Túnez",votos:0,media:0},
		{nombre:"Turkmenistán",votos:0,media:0},
		{nombre:"Turquía",votos:0,media:0},
		{nombre:"Ucrania",votos:0,media:0},
		{nombre:"Uganda",votos:0,media:0},
		{nombre:"Unión Soviética (URSS)",votos:0,media:0},
		{nombre:"Uruguay",votos:0,media:0},
		{nombre:"Uzbekistan",votos:0,media:0},
		{nombre:"Venezuela",votos:0,media:0},
		{nombre:"Vietnam",votos:0,media:0},
		{nombre:"Yemen",votos:0,media:0},
		{nombre:"Yugoslavia",votos:0,media:0},
		{nombre:"Zambia",votos:0,media:0},
		{nombre:"Zimbabwe",votos:0,media:0} 
           ];
        
    var datosContinentes2 = [
            {nombre:"América del Norte",votos:0,media:0},
            {nombre:'Europa',votos:0,media:0},
            {nombre:"América del Sur",votos:0,media:0},
            {nombre:'Oceanía',votos:0,media:0},
            {nombre:'Asia',votos:0,media:0},
            {nombre:'África',votos:0,media:0},
            {nombre:'NA',votos:0,media:0}
        ];
    		var totalPaises2 = nodo2pais.rows.length-1;
       		var totalVotos2 = 0;
			var contador2 = 1;
            for (var j = 1; j <= totalPaises2; j++) {                
                var pais2 = nodo2pais.rows[j].cells[1].textContent;
                               //Arreglamos el nombre del pais
                if(pais2.indexOf("n Sovi") != -1)
	               pais2 = 'Unión Soviética (URSS)';
	       else if(pais2.indexOf("Jap") != -1)
	       pais2 = 'Japón';
	else if(pais2.indexOf("Espa") != -1)
	       pais2 = 'España';
	else if(pais2.indexOf("Canad") != -1)
	       pais2 = 'Canadá';
	else if(pais2.indexOf("Taiw") != -1)
	       pais2 = 'Taiwán';
	else if(pais2.indexOf("xico") != -1)
	       pais2 = 'México';
	else if(pais2.indexOf("lgica") != -1)
	       pais2 = 'Bélgica';
	else if(pais2.indexOf("Ruman") != -1)
	       pais2 = 'Rumanía';
	else if(pais2.indexOf("frica") != -1)
	       pais2 = 'Sudáfrica';
	else if(pais2.indexOf("Turq") != -1)
	       pais2 = 'Turquía';
	else if(pais2.indexOf("nia del Oest") != -1)
	       pais2 = 'Alemania del Oeste (RFA)';
	else if(pais2.indexOf("nia del Est") != -1)
	       pais2 = 'Alemania del Este (RDA)';
	else if(pais2.indexOf("ca Checa") != -1)
	       pais2 = 'República Checa';
	else if(pais2.indexOf("Ir") == 0 && pais2.indexOf("Irl") == -1)
	       pais2 = 'Irán';
	else if(pais2.indexOf("Paquist") != -1)
	       pais2 = 'Paquistán';
	else if(pais2.indexOf("bano") != -1)
	       pais2 = 'Líbano';
	else if(pais2.indexOf("Hungr") != -1)
	       pais2 = 'Hungría';
	else if(pais2.indexOf("Afganis") != -1)
	       pais2 = 'Afganistán';
	else if(pais2.indexOf("Kazajs") != -1)
	       pais2 = 'Kazajstán';
	else if(pais2.indexOf("But") != -1)
	       pais2 = 'Bután';
	else if(pais2.indexOf("Etiop") != -1)
	       pais2 = 'Etiopía';
	else if(pais2.indexOf("Panam") != -1)
	       pais2 = 'Panamá';
	else if(pais2.indexOf("Emiratos") != -1)
	       pais2 = 'Emiratos Árabes';
	else if(pais2.indexOf("Camer") != -1)
	       pais2 = 'Camerún';
	else if(pais2.indexOf("Per") != -1)
	       pais2 = 'Perú';
    else if(pais2.indexOf("ses Bajos") != -1)
           pais2 = 'Países Bajos (Holanda)';    
	else if(pais2.indexOf("T") == 0 && pais2.indexOf("nez") != -1)
	       pais2 = 'Túnez';  
	       else if(pais2.indexOf("rabia Sau") != -1)
                pais2 = 'Arabia Saudí'; 
            else if(pais2.indexOf("rabia Sau") != -1)
                pais2 = 'Arabia Saudí'; 
           else if(pais2.indexOf("Ben") != -1 && pais2.length == 5)
                pais2 = 'Benín'; 
           else if(pais2.indexOf("Gab") != -1)
                pais2 = 'Gabón';   
                else if(pais2.indexOf("Hait") != -1)
                pais2 = 'Haití'; 
           else if(pais2.indexOf("Kirg") != -1)
                pais2 = 'Kirguizstán';      
           else if(pais2.indexOf("naco") != -1)
                pais2 = 'Mónaco';  
           else if(pais2.indexOf("ger") != -1 && pais2.length == 5)
                pais2 = 'Níger';    
           else if(pais2.indexOf("Om") != -1)
                pais2 = 'Omán';   
           else if(pais2.indexOf("lica del Con") != -1)
                pais2 = 'República del Congo';      
           else if(pais2.indexOf("Turkmenist") != -1)
                pais2 = 'Turkmenistán';
                var votos2 = parseInt(nodo2pais.rows[j].cells[0].textContent);
                totalVotos2 += votos2;
                var media2 = parseFloat(nodo2pais.rows[j].cells[2].textContent.replace(',', '.'));
                var continente2 = getContinent(getCountryCode(pais2));
                var ix = inArray(datosContinentes2, 'nombre', continente2);                
                var it = inArray(datosPaises2, 'nombre', pais2);
                var oldVotos2 = datosContinentes2[ix].votos;
                var oldMedia2 = datosContinentes2[ix].media;
                datosContinentes2[ix].votos = oldVotos2 + votos2;
                datosContinentes2[ix].media = ((oldVotos2 * oldMedia2) + (votos2 * media2)) / (oldVotos2 + votos2);                 	
                datosPaises2[it].votos = votos2;                
                datosPaises2[it].media = media2;
                
            }
        	
            datosContinentes2.sort(function(a, b) {
                return (b.votos - a.votos);
            });
        	datosPaises2.sort(function(a, b) {
                return (a.nombre - b.nombre);
            }); 
        
    //Afinidad géneros
        var datosGeneros2 = [
            {nombre:"Drama",votos:0,media:0},
            {nombre:'Comedia',votos:0,media:0},
            {nombre:"Thriller",votos:0,media:0},
            {nombre:'Romance',votos:0,media:0},
            {nombre:'Acción',votos:0,media:0},
            {nombre:'Fantástico',votos:0,media:0},
            {nombre:'Intriga',votos:0,media:0},
            {nombre:"Ciencia ficción",votos:0,media:0},
            {nombre:'Aventuras',votos:0,media:0},
            {nombre:"Animación",votos:0,media:0},
            {nombre:'Terror',votos:0,media:0},
            {nombre:'Documental',votos:0,media:0},
            {nombre:'Infantil',votos:0,media:0},
            {nombre:'Musical',votos:0,media:0},
            {nombre:"Western",votos:0,media:0},
            {nombre:'Bélico',votos:0,media:0},
            {nombre:"Cine negro",votos:0,media:0},
            {nombre:'Serie de TV',votos:0,media:0}
        ];
        
        var totalGens2 = nodo2gen.rows.length-1;      		
			
            for (var i = 1; i <= totalGens2; i++) {
                var genero2 = nodo2gen.rows[i].cells[1].textContent;
                var votos2 = parseInt(nodo2gen.rows[i].cells[0].textContent);                
                var media2 = parseFloat(nodo2gen.rows[i].cells[2].textContent.replace(',', '.'));
if(genero2.indexOf("Acci") != -1)
	       genero2 = 'Acción';	       	
	    else if(genero2.indexOf("Fant") != -1)
	       genero2 = 'Fantástico';	    
	    else if(genero2.indexOf("Ciencia fic") != -1)
	       genero2 = 'Ciencia ficción';	    
	    else if(genero2.indexOf("Animaci") != -1)
	       genero2 = 'Animación';	    
	    else if(genero2.indexOf("lico") != -1)
	       genero2 = 'Bélico';                
                var ix2 = inArray(datosGeneros2, 'nombre', genero2);                
                datosGeneros2[ix2].votos = votos2;
                datosGeneros2[ix2].media = media2;
            }
            datosGeneros2.sort(function(a, b) {
                return (a.nombre - b.nombre);
            });
        
        //Afinidad Paises
        
	txt1 += '<tbody>';
	//Tablas de VALORACIONES
	txt1 += '<tr><td align="center" colspan="2"><b><FONT SIZE=4>Votaciones por valoración</FONT></b></td></tr>';
	txt1 += '<tr><td width="50%" align="center"><b><FONT SIZE=2 COLOR=BLUE>' + nick1 + '</FONT></b></td><td width="50%" align="center"><b><FONT SIZE=2 COLOR=GREEN>' + nick2 + '</FONT></b></td></tr>';
	txt1 += '<tr><td><table class="reptable" align="center"><tbody>';
	txt1 += '<tr><th>' + nodoval.rows[0].cells[0].textContent + '</th><th>' + nodoval.rows[0].cells[1].textContent + '</th><th>' + nodoval.rows[0].cells[2].textContent + '</th></tr>';
	for(i = 1; i < nodoval.rows.length; i++) {
	    txt1 += '<tr><td class="repitem" align="center"><b>' + nodoval.rows[i].cells[0].textContent + '</b></td>'; //Valoración
	    txt1 += '<td><img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodoval.rows[i].cells[1].firstChild.width)*0.82) + '" height="14" border="1">' + nodoval.rows[i].cells[1].textContent + '</td>'; //Porcentaje
	    txt1 += '<td align="right">' + nodoval.rows[i].cells[2].textContent + '</td></tr>'; //Votos
	}
	txt1 += '</table></td>';
	txt1 += '<td><table class="reptable" align="center"><tbody>';
	txt1 += '<tr><th>' + nodoval.rows[0].cells[0].textContent + '</th><th>' + nodoval.rows[0].cells[1].textContent + '</th><th>' + nodoval.rows[0].cells[2].textContent + '</th></tr>';
	for(i = 1; i < nodo2val.rows.length; i++) {
	    txt1 += '<tr><td class="repitem" align="center"><b>' + nodo2val.rows[i].cells[0].textContent + '</b></td>'; //Valoración
	    txt1 += '<td><img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodo2val.rows[i].cells[1].firstChild.width)*0.82) + '" height="14" border="1">' + nodo2val.rows[i].cells[1].textContent + '</td>'; //Porcentaje
	    txt1 += '<td align="right">' + nodo2val.rows[i].cells[2].textContent + '</td></tr>'; //Votos
	}
	txt1 += '</table></td></tr>';
	
	//Tablas de GENEROS
	txt1 += '<tr><td>&nbsp;</td></tr>';
	txt1 += '<tr><td align="center" colspan="2"><b><FONT SIZE=4>Votaciones por géneros</FONT></b></td></tr>';
	txt1 += '<tr><td width="50%" align="center"><b><FONT SIZE=2 COLOR=BLUE>' + nick1 + '</FONT></b></td><td width="50%" align="center"><b><FONT SIZE=2 COLOR=GREEN>' + nick2 + '</FONT></b></td></tr>';
	txt1 += '<tr><td><table class="reptable" align="center"><tbody>';
	txt1 += '<tr><th>' + nodogen.rows[0].cells[0].textContent + '</th><th>' + nodogen.rows[0].cells[1].textContent + '</th><th>' + nodogen.rows[0].cells[2].textContent + '</th></tr>';
	for(i = 1; i < nodogen.rows.length; i++) {
	    txt1 += '<tr><td align="right">' + nodogen.rows[i].cells[0].textContent + '<img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodogen.rows[i].cells[0].lastChild.width)*0.91) + '" height="14" border="1"></td>';
	    txt1 += '<td class="repitem" align="center">' + nodogen.rows[i].cells[1].textContent + '</td>';
	    txt1 += '<td><img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodogen.rows[i].cells[2].firstChild.width)*0.91) + '" height="14" border="1">' + nodogen.rows[i].cells[2].textContent + '</td></tr>';
	}
	txt1 += '</table></td>';
	txt1 += '<td><table class="reptable" align="center"><tbody>';
	txt1 += '<tr><th>' + nodogen.rows[0].cells[0].textContent + '</th><th>' + nodogen.rows[0].cells[1].textContent + '</th><th>' + nodogen.rows[0].cells[2].textContent + '</th></tr>';
	for(i = 1; i < nodo2gen.rows.length; i++) {
	    txt1 += '<tr><td align="right">' + nodo2gen.rows[i].cells[0].textContent + '<img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodo2gen.rows[i].cells[0].lastChild.width)*0.91) + '" height="14" border="1"></td>';
 	    txt1 += '<td class="repitem" align="center">';
	    txt2 = nodo2gen.rows[i].cells[1].textContent;
	    if(txt2.indexOf("Acci") != -1)
	       txt1 += 'Acción</td>';	       	
	    else if(txt2.indexOf("Fant") != -1)
	       txt1 += 'Fantástico</td>';	    
	    else if(txt2.indexOf("Ciencia fic") != -1)
	       txt1 += 'Ciencia ficción</td>';	    
	    else if(txt2.indexOf("Animaci") != -1)
	       txt1 += 'Animación</td>';	    
	    else if(txt2.indexOf("lico") != -1)
	       txt1 += 'Bélico</td>';	    
	    else 
	    txt1 += txt2 + '</td>';
	    txt1 += '<td><img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodo2gen.rows[i].cells[2].firstChild.width)*0.91) + '" height="14" border="1">' + nodo2gen.rows[i].cells[2].textContent + '</td></tr>';
	}
	txt1 += '</table></td></tr>';
	//Tablas de PAISES
	txt1 += '<tr><td>&nbsp;</td></tr>';
	txt1 += '<tr><td align="center" colspan="2"><b><FONT SIZE=4>Votaciones por países</FONT></b></td></tr>';
	txt1 += '<tr><td width="50%" align="center"><b><FONT SIZE=2 COLOR=BLUE>' + nick1 + '</FONT></b></td><td width="50%" align="center"><b><FONT SIZE=2 COLOR=GREEN>' + nick2 + '</FONT></b></td></tr>';
	txt1 += '<tr><td style="vertical-align:top"><table class="reptable" align="center"><tbody>';
	txt1 += '<tr><th>' + nodopais.rows[0].cells[0].textContent + '</th><th>' + nodopais.rows[0].cells[1].textContent + '</th><th>' + nodopais.rows[0].cells[2].textContent + '</th></tr>';
	for(i = 1; i < nodopais.rows.length; i++) {
	    txt1 += '<tr><td align="right">' + nodopais.rows[i].cells[0].textContent + '<img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodopais.rows[i].cells[0].lastChild.width)*0.75) + '" height="14" border="1"></td>';
	txt2 = nodopais.rows[i].cells[1].textContent;
	txt1 += '<td class="repitem" align="center">';
	if(txt2.indexOf("n Sovi") != -1)
	       txt1 += 'Unión Soviética</td>';
	else if(txt2.indexOf("nia del Oest") != -1)
	       txt1 += 'Alemania del Oeste</td>';
	else if(txt2.indexOf("nia del Est") != -1)
	       txt1 += 'Alemania del Este</td>';
    else if(txt2.indexOf("ses Bajos") != -1)
           txt1 += 'Holanda</td>';
	else
	     txt1 += nodopais.rows[i].cells[1].textContent + '</td>';
	    txt1 += '<td><img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodopais.rows[i].cells[2].firstChild.width)*0.78) + '" height="14" border="1">' + nodopais.rows[i].cells[2].textContent + '</td></tr>';
	}
	txt1 += '</table></td>';
	
	txt1 += '<td style="vertical-align:top"><table class="reptable" align="center"><tbody>';
	txt1 += '<tr><th>' + nodopais.rows[0].cells[0].textContent + '</th><th>' + nodopais.rows[0].cells[1].textContent + '</th><th>' + nodopais.rows[0].cells[2].textContent + '</th></tr>';
	for(i = 1; i < nodo2pais.rows.length; i++) {
	    txt1 += '<tr><td align="right">' + nodo2pais.rows[i].cells[0].textContent + '<img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodo2pais.rows[i].cells[0].lastChild.width)*0.75) + '" height="14" border="1"></td>';
	txt2 = nodo2pais.rows[i].cells[1].textContent;
	txt1 += '<td class="repitem" align="center">';
	if(txt2.indexOf("n Sovi") != -1)
	       txt1 += 'Unión Soviética</td>';
	else if(txt2.indexOf("Jap") != -1)
	       txt1 += 'Japón</td>';
	else if(txt2.indexOf("Espa") != -1)
	       txt1 += 'España</td>';
	else if(txt2.indexOf("Canad") != -1)
	       txt1 += 'Canadá</td>';
	else if(txt2.indexOf("Taiw") != -1)
	       txt1 += 'Taiwán</td>';
	else if(txt2.indexOf("xico") != -1)
	       txt1 += 'México</td>';
	else if(txt2.indexOf("lgica") != -1)
	       txt1 += 'Bélgica</td>';
	else if(txt2.indexOf("Ruman") != -1)
	       txt1 += 'Rumanía</td>';
	else if(txt2.indexOf("frica") != -1)
	       txt1 += 'Suráfrica</td>';
	else if(txt2.indexOf("Turq") != -1)
	       txt1 += 'Turquía</td>';
	else if(txt2.indexOf("nia del Oest") != -1)
	       txt1 += 'Alemania del Oeste</td>';
	else if(txt2.indexOf("nia del Est") != -1)
	       txt1 += 'Alemania del Este</td>';
	else if(txt2.indexOf("ca Checa") != -1)
	       txt1 += 'República Checa</td>';
	else if(txt2.indexOf("Ir") == 0 && txt2.indexOf("Irl") == -1)
	       txt1 += 'Irán</td>';
	else if(txt2.indexOf("Paquist") != -1)
	       txt1 += 'Paquistán</td>';
	else if(txt2.indexOf("bano") != -1)
	       txt1 += 'Líbano</td>';
	else if(txt2.indexOf("Hungr") != -1)
	       txt1 += 'Hungría</td>';
	else if(txt2.indexOf("Afganis") != -1)
	       txt1 += 'Afganistán</td>';
	else if(txt2.indexOf("Kazajs") != -1)
	       txt1 += 'Kazajstán</td>';
	else if(txt2.indexOf("But") != -1)
	       txt1 += 'Bután</td>';
	else if(txt2.indexOf("Etiop") != -1)
	       txt1 += 'Etiopía</td>';
	else if(txt2.indexOf("Panam") != -1)
	       txt1 += 'Panamá</td>';
	else if(txt2.indexOf("Emiratos") != -1)
	       txt1 += 'Emiratos Árabes</td>';
	else if(txt2.indexOf("Camer") != -1)
	       txt1 += 'Camerún</td>';
	else if(txt2.indexOf("Per") != -1)
	       txt1 += 'Perú</td>';
    else if(txt2.indexOf("ses Bajos") != -1)
           txt1 += 'Holanda</td>';    
	else if(txt2.indexOf("T") == 0 && txt2.indexOf("nez") != -1)
	       txt1 += 'Túnez</td>';
	else
	     txt1 += txt2 + '</td>';
	    txt1 += '<td><img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodo2pais.rows[i].cells[2].firstChild.width)*0.78) + '" height="14" border="1">' + nodo2pais.rows[i].cells[2].textContent + '</td></tr>';
	}
    
    txt1 += '</table></td></tr>';
        //Tabla de continentes
	txt1 += '<tr><td>&nbsp;</td></tr>';
	txt1 += '<tr><td align="center" colspan="2"><b><FONT SIZE=4>Votaciones por continentes</FONT></b></td></tr>'; 
    txt1 += '<tr><td width="50%" align="center"><b><FONT SIZE=2 COLOR=BLUE>' + nick1 + '</FONT></b></td><td width="50%" align="center"><b><FONT SIZE=2 COLOR=GREEN>' + nick2 + '</FONT></b></td></tr>';
    txt1 += '<tr><td><table class="reptable" align="center" width="355px"><tbody>';
    txt1 += '<tr><th>' + nodopais.rows[0].cells[0].textContent + '</th><th>' + "Continente" + '</th><th>' + nodopais.rows[0].cells[2].textContent + '</th></tr>';
        for(i = 0; i < 6; i++){           
        txt1 += '<tr><td align="right">' + datosContinentes[i].votos + ' <img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(Math.sqrt((datosContinentes[i].votos*120)/totalVotos)*8) + '" height="14" border="1"></td>';
	    txt1 += '<td class="repitem" align="center">' + datosContinentes[i].nombre + '</td>';
	    txt1 += '<td><img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(((Math.round(datosContinentes[i].media*10)/10)*120)/10) + '" height="14" border="1"> ' + ((Math.round(datosContinentes[i].media*10)/10).toFixed(1) + '').replace('.', ',') + '</td></tr>';
	    }
    txt1 += '</table></td>';
	txt1 += '<td><table class="reptable" align="center" width="355px"><tbody>';
	txt1 += '<tr><th>' + nodopais.rows[0].cells[0].textContent + '</th><th>' + "Continente" + '</th><th>' + nodopais.rows[0].cells[2].textContent + '</th></tr>';
	for(i = 0; i < 6; i++) {
	    txt1 += '<tr><td align="right">' + datosContinentes2[i].votos + ' <img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(Math.sqrt((datosContinentes2[i].votos*120)/totalVotos2)*8) + '" height="14" border="1"></td>';
	    txt1 += '<td class="repitem" align="center">' + datosContinentes2[i].nombre + '</td>';
	    txt1 += '<td><img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(((Math.round(datosContinentes2[i].media*10)/10)*120)/10) + '" height="14" border="1"> ' + ((Math.round(datosContinentes2[i].media*10)/10).toFixed(1) + '').replace('.', ',') + '</td></tr>';
	    }            
	txt1 += '</table></td></tr>';
        //Tabla de años
	txt1 += '<tr><td>&nbsp;</td></tr>';
	txt1 += '<tr><td align="center" colspan="2"><b><FONT SIZE=4>Votaciones por años</FONT></b></td></tr>';
	txt1 += '<tr><td width="50%" align="center"><b><FONT SIZE=2 COLOR=BLUE>' + nick1 + '</FONT></b></td><td width="50%" align="center"><b><FONT SIZE=2 COLOR=GREEN>' + nick2 + '</FONT></b></td></tr>';
	txt1 += '<tr><td><table class="reptable" align="center"><tbody>';
	txt1 += '<tr><th>' + nodoanios.rows[0].cells[0].textContent + '</th><th>' + nodoanios.rows[0].cells[1].textContent + '</th><th>' + nodoanios.rows[0].cells[2].textContent + '</th></tr>';
	for(i = 1; i < nodoanios.rows.length; i++) {
	    txt1 += '<tr><td align="right">' + nodoanios.rows[i].cells[0].textContent + '<img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodoanios.rows[i].cells[0].lastChild.width)*0.93) + '" height="14" border="1"></td>';
	    txt1 += '<td class="repitem" align="center">' + nodoanios.rows[i].cells[1].textContent + '</td>';
	    txt1 += '<td><img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodoanios.rows[i].cells[2].firstChild.width)*0.93) + '" height="14" border="1">' + nodoanios.rows[i].cells[2].textContent + '</td></tr>';
	}
	txt1 += '</table></td>';
	txt1 += '<td><table class="reptable" align="center"><tbody>';
	txt1 += '<tr><th>' + nodoanios.rows[0].cells[0].textContent + '</th><th>' + nodoanios.rows[0].cells[1].textContent + '</th><th>' + nodoanios.rows[0].cells[2].textContent + '</th></tr>';
	for(i = 1; i < nodo2anios.rows.length; i++) {
	    txt1 += '<tr><td align="right">' + nodo2anios.rows[i].cells[0].textContent + '<img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodo2anios.rows[i].cells[0].lastChild.width)*0.93) + '" height="14" border="1"></td>';
	    txt1 += '<td class="repitem" align="center">' + nodo2anios.rows[i].cells[1].textContent + '</td>';
	    txt1 += '<td><img align="top" src="/images/bars/bar1.gif" border="0" width="' + Math.round(parseInt(nodo2anios.rows[i].cells[2].firstChild.width)*0.93) + '" height="14" border="1">' + nodo2anios.rows[i].cells[2].textContent + '</td></tr>';
	}
	txt1 += '</table></td></tr>';
        //Afinidad
        txt1 += '<tr><td>&nbsp;</td></tr>';
        txt1 += '<tr><td align="center" colspan="2"><b><FONT SIZE=4>Afinidad (<FONT SIZE=3 COLOR=BLUE>' + nick1 + "</FONT> - <FONT SIZE=3 COLOR=GREEN>" + nick2 + '</FONT>)</FONT></b></td></tr>'; 
        //Valoración
        var afnvot = 0.0, afnvot2 = 0.0;
        for(i = 1; i <= 10; i++){
        	var porcv1 = nodoval.rows[i].cells[1].textContent.split('%')[0].replace(',','.'); 
            var porcv2 = nodo2val.rows[i].cells[1].textContent.split('%')[0].replace(',','.');			   
			var difn2 = Math.abs(parseFloat(porcv1)-parseFloat(porcv2));  
            afnvot2 += afinidad_votos(difn2);
        }
        afnvot = afnvot2;
        afnvot2 = 5*afnvot2;        
        txt1 += '<tr><td align="center" colspan="2" style="padding-top:2px" width="180px"><b><FONT SIZE=3 COLOR="#447CAD">Valoración</FONT>&nbsp;&nbsp;&nbsp;' + afnvot2.toFixed(1) + ' %</b></td></tr>';
        //Géneros
        var afngen = 0.0, afngen2 = 0.0, afngen3 = 0.0;
        for(i = 0; i <= 17; i++){
        	var porcg1 = datosGeneros[i].votos/totalVotos; 
            var porcg2 = datosGeneros2[i].votos/totalVotos2;
            var medg1 = datosGeneros[i].media; 
            var medg2 = datosGeneros2[i].media; 
			var difn = Math.abs((porcg1*100)-(porcg2*100));            
			var difn2 = Math.abs(parseFloat(medg1)-parseFloat(medg2));            
            afngen += afinidad_votos(difn)*0.5;            
            afngen2 += afinidad_medias(difn2)*0.5;            
        }
        afngen3 = (afngen+afngen2)*2.78;
        txt1 += '<tr><td align="center" colspan="2" width="180px"><b><FONT SIZE=3 COLOR="#447CAD">Géneros</FONT>&nbsp;&nbsp;&nbsp;' + afngen3.toFixed(1) + ' %</b></td></tr>';
        //Afinidad paises
        var afnnpaises = afinidad_npaises(Math.abs(totalPaises-totalPaises2))*2.5; 
        var afnp = 0.0, afnp2 = 0.0, afnp3 = 0.0, afnp4 = 0.0;
        var contp = 0;
        for(i = 0; i <= 189; i++){
            if(datosPaises[i].votos != 0 && datosPaises2[i].votos != 0){
            contp++;
        	var porcg1 = datosPaises[i].votos/totalVotos; 
            var porcg2 = datosPaises2[i].votos/totalVotos2;
            var medg1 = datosPaises[i].media; 
            var medg2 = datosPaises2[i].media; 
			var difn = Math.abs((porcg1*100)-(porcg2*100));            
			var difn2 = Math.abs(parseFloat(medg1)-parseFloat(medg2));            
            afnp += afinidad_votos(difn);            
            afnp2 += afinidad_medias(difn2);  
            }   
        }
        afnp3 = ((afnp*8.5)/(2*contp)) + ((afnp2*8.5)/(2*contp));        
        afnp4 = (afnp3*5.588235294117647)+afnnpaises;
        txt1 += '<tr><td align="center" colspan="2" width="180px"><b><FONT SIZE=3 COLOR="#447CAD">Países</FONT>&nbsp;&nbsp;&nbsp;' + afnp4.toFixed(1) + ' %</b></td></tr>';
        //Años
        var afnanios = 0.0, afnanios2 = 0.0, afnanios3 = 0.0;
        for(i = 1; i <= 22; i++){
        	var porcg1 = parseFloat(nodoanios.rows[i].cells[0].textContent)/totalVotos; 
            var porcg2 = parseFloat(nodo2anios.rows[i].cells[0].textContent)/totalVotos2; 
            var medg1 = parseFloat(nodoanios.rows[i].cells[2].textContent.replace(',', '.')); 
            var medg2 = parseFloat(nodo2anios.rows[i].cells[2].textContent.replace(',', '.'));
            porcg1 = porcg1*100;
            porcg2 = porcg2*100;
			var difn = Math.abs(porcg1-porcg2);             
			var difn2 = Math.abs(parseFloat(medg1)-parseFloat(medg2));            
            afnanios += afinidad_votos_años(difn);            
            afnanios2 += afinidad_medias(difn2);  
        }
        afnanios = afnanios*0.375;
        afnanios2 = afnanios2*0.125;
        afnanios3 = (afnanios+afnanios2)*4.545454545454545;      
        txt1 += '<tr><td align="center" colspan="2" width="180px"><b><FONT SIZE=3 COLOR="#447CAD">Años</FONT>&nbsp;&nbsp;' + afnanios3.toFixed(1) + ' %</b></td></tr>';
        //Afinidad total
        // 20% afnvot - 18% votos gen - 18% media gen - 5% npaises - 17% paises - 16,5% votos anios - 5,5 medias anios
        var afntotal = afnvot + afngen + afngen2 + afnp3 + afnnpaises + afnanios + afnanios2;
        //alert(afnvot + "-" + afngen + "-" +  afngen2 + "-" +  afnp3 + "-" +  afnnpaises + "-" +  afnanios + "-" + afnanios2);
        txt1 += '<tr><td align="center" colspan="2" width="180px" style="padding-top:2px"><b><FONT SIZE=5 COLOR="F0860C">TOTAL</FONT>&nbsp;&nbsp;&nbsp;<FONT SIZE=5>' + afntotal.toFixed(1) + ' </FONT>%</b></td></tr>';
	tablagen.innerHTML = txt1;
	nodotodo.parentNode.insertBefore(tablagen, nodotodo);
	});
	nodoval.parentNode.parentNode.removeChild(nodoval.parentNode);
	nodogen.parentNode.parentNode.removeChild(nodogen.parentNode);
	nodopais.parentNode.parentNode.removeChild(nodopais.parentNode);
	nodoanios.parentNode.parentNode.removeChild(nodoanios.parentNode);
   }
//Añade nuevos contactos en mis amigos
    function doExtraContacts() {
        function hideBox() {
            var box = "//font[contains(text(),'MO FUNCIONA LA SECCI')]/ancestor::*[position()=5]".findNode();            
            if (box != null) {
	box.parentNode.removeChild(box);
                // box.style.display = "none";
            }
        }
        function addContactsFromUrl() {
            var url = prompt("Introduzca una dirección de internet que contenga enlaces a fichas de usuarios", "");
            var nuevos = false;
            if (url != null && url != "") {
                doGet(url, function (result) {
                    var re = new RegExp('userrep\\.php\\?user_id=(\\d+)" rel="nofollow">(\\w+)', 'g');
                    var myArray = result.match(re);
                    var friendsStr = GM_getValue(userId + '.extraFriends');
                    var eFriends;
                    if (typeof friendsStr != 'undefined') {
                        eFriends = eval(friendsStr);
                    } else {
                        eFriends = [];
                    }
                    for (var ix in myArray) {
                        var id = myArray[ix].split('user_id=')[1].split('"')[0];
                        var name = myArray[ix].split('">')[1];
                        if (!inArray(eFriends, 'id', id)) {
                            var friend = {id:id,name:name,city:"-",votes:0,reviews:0,lists:0};
                            eFriends.push(friend);
                            nuevos = true;
                        }
                    }
                    GM_setValue(userId + ".extraFriends", eFriends.toSource());
                    if (nuevos) {
                        alert("Contactos añadidos");
                        window.location.reload();
                    }
                });
            }
        }
        function prepareContactsTable() {
                
	var friendsTable = "//table[@class='list']".findNode();
	var friendsTitle = "//span[text()='MIS AMIGOS / USUARIOS FAVORITOS']/ancestor::*[position()=1]".findNode();
           
            if (friendsTable != null) {
                var nuevo = friendsTable.cloneNode(true);
	nuevo.id = "newFriends";
	 // Cambiar titulo
	var titulo = friendsTitle.cloneNode(true);	
                var span = "/span".findNode(titulo);	
                span.innerHTML = "CONTACTOS ADICIONALES <span style='font-size:50%'>(el numero de votos, criticas y listas no se actualizan automaticamente)</span>";
	var adbr = d.createElement('br');
	
	//Añadimos titulo + linea en blanco + tabla clonada
	friendsTable.parentNode.appendChild(titulo);
	friendsTable.parentNode.appendChild(adbr);
                friendsTable.parentNode.appendChild(nuevo);               
                
                // Borrar los amigos existentes (si los hubiera)
                var tBody = nuevo.lastChild;
	var contactsTable = tBody.parentNode;
                while (contactsTable.rows.length > 1) {
                    tBody.removeChild(contactsTable.rows[1]);
                }
	
	//Soporte para ordenar por columnas
	for(i = 0; i < 5; i++){
	if(i != 2){
	var nodoc = contactsTable.rows[0].cells[i].firstChild;
	nodon = nodoc.cloneNode(true);	
	nodoc.parentNode.removeChild(nodoc);
	var newaa = d.createElement('a');
	newaa.href = "#";
	newaa.target = "";
	newaa.style.textDecoration = "none";
	switch(i){
	    case 0:
	newaa.addEventListener("click", function(){newContactsOrder(0);}, true);
	    break;
	    case 1:
	newaa.addEventListener("click", function(){newContactsOrder(1);}, true);
	    break;
	    case 3:
	newaa.addEventListener("click", function(){newContactsOrder(3);}, true);
	    break;
	    case 4:
	newaa.addEventListener("click", function(){newContactsOrder(4);}, true);
	    break;
	}
	newaa.appendChild(nodon);
	contactsTable.rows[0].cells[i].appendChild(newaa);
	}
	}
	//Añadimos las listas
	var m = contactsTable.rows[0].insertCell(5);
	      m.align = "right";	
	      m.width = "60px";
	      m.innerHTML = '<a><span style="color:#406080">' + "Listas" +  '</span></a>';
	var nlistas = "//span[text()='Listas']/ancestor::*[position()=1]".findNode();
	nlistas.href = "#";
	nlistas.target = "";
	nlistas.style.textDecoration = "none";
	nlistas.addEventListener("click", function(){newContactsOrder(5);}, true);
                // Borramos lo de las consultas
                //var nodeP = "td/p".findNode(nuevo);
                //nodeP.parentNode.removeChild(nodeP);
                // Cambiamos el link a añadir	
	var tabla = d.createElement('table');
	tabla.width = "100%";
            	tabla.innerHTML = "<br></br><tbody><tr><td align='right'><a href='#'>Añadir contactos desde URL</a></td></tr></tbody>";
	contactsTable.parentNode.insertBefore(tabla, contactsTable.nextSibling);
	nodo = "following-sibling::table/tbody/tr/td/a".findNode(contactsTable);
	nodo.textContent = "Añadir contactos desde URL";
	nodo.href = "#";
                nodo.addEventListener("click", addContactsFromUrl, true);
            }	
        }
        function removeContactRow(id) {
            var row = "//tr[@id='CONTACT-ROW:{ID}']".replace(/{ID}/g, id).findNode();
            row.parentNode.removeChild(row);
        }
        function deleteContact() {
            var id = this.firstChild.id;
            var friendsStr = GM_getValue(userId + '.extraFriends');
            var eFriends;
            if (typeof friendsStr != 'undefined') {
                eFriends = eval(friendsStr);
            } else {
                eFriends = [];
            }
            var ix = inArray(eFriends, 'id', id);
            if (ix) {
                eFriends.splice(ix, 1);
                // Actualizamos la tabla
                removeContactRow(id);
                GM_setValue(userId + ".extraFriends", eFriends.toSource());
                //window.location.reload();
            }
        }
          function newContactsOrder(orden){
	var contactsTable = "//table[@id='newFriends']".findNode();
	var tBody = contactsTable.lastChild;
	
	//Limpiar la tabla
	while (contactsTable.rows.length > 1) {
                    tBody.removeChild(contactsTable.rows[1]);
                }
	var friendsstr = GM_getValue(userId + '.extraFriends');
            // Añadimos los nuevos amigos
            if (typeof friendsstr != 'undefined') {
                var eFriends = eval(friendsstr);
	switch(orden){
	     case 0:
	        eFriends.sort(function(a, b) {
                           return a.name.toLowerCase() > b.name.toLowerCase();
                         });
	         break;
	     case 1:
	        eFriends.sort(function(a, b) {
                           return a.city.toLowerCase() > b.city.toLowerCase();
                         });
	         break;
	     case 3:
	        eFriends.sort(function(a, b) {
                           return parseInt(b.votes) > parseInt(a.votes);
                         });
	         break;
	     case 4:
	        eFriends.sort(function(a, b) {
                           return parseInt(b.reviews) > parseInt(a.reviews);
                         });
	         break;
	     case 5:
	        eFriends.sort(function(a, b) {
                           return parseInt(b.lists) > parseInt(a.lists);
                         });
	         break;
               } //switch
                for (ix in eFriends) {
                    var friend = eFriends[ix];
                    var nodoTr = createFriendNode(friend);
                    contactsTable.rows[0].parentNode.appendChild(nodoTr);
                }
            }
	if (getPreference('FLAGSINFRIENDS', true)) {
                      doAddFlagsToExtraContacts();
                }
        }	
        var friendColumns = [
            {text:'<a href="/es/userlastratings.php?user_id={ID}" class="lnk3"><b>{NAME}</b></a>',
                rep:[{find:"/{ID}/g",replace:"friend.id"},{find:'/{NAME}/g',replace:'friend.name'}]},
            {text:'{CITY}',rep:[{find:"/{CITY}/g",replace:"friend.city"}]},
            {align:'center',text:'<a href="/es/imsendmsg.php?to={ID}" title="Enviar mensaje" class="lnk3"><img src="http://www.filmaffinity.com/images/sendmsg.gif"/></a>',
                rep:[{find:"/{ID}/g",replace:"friend.id"}]},
            //{align:'right',text:'{VOTES}',rep:[{find:"/{VOTES}/g",replace:'friend.votes'}]},
	{align:'right',text:'<a href="http://www.filmaffinity.com/es/userlastratings.php?user_id={ID}" class="lnk3">{VOTES}</a>',
	   rep:[{find:"/{ID}/g",replace:"friend.id"},{find:"/{VOTES}/g",replace:'friend.votes'}]},
            {align:'right',text:'<a href="http://www.filmaffinity.com/es/userreviews/1/{ID}.html" class="lnk3">{REVIEWS}</a>',
	   rep:[{find:"/{ID}/g",replace:"friend.id"},{find:"/{REVIEWS}/g",replace:'friend.reviews'}]},
            {align:'right',text:'<a href="http://www.filmaffinity.com/es/userlists.php?user_id={ID}" class="lnk3">{LISTS}</a>',
	   rep:[{find:"/{ID}/g",replace:"friend.id"},{find:"/{LISTS}/g",replace:'friend.lists'}]},
            {align:'right',text:'<a id="{ID}" href="#" class="lnk3">Quitar</a>',rep:[{find:"/{ID}/g",replace:"friend.id"}]}
        ];
        function createFriendNode(friend) {
            var nodeTR = d.createElement("tr");
            for (var ix in friendColumns) {
                var nodeTD = d.createElement("td");
                var text = friendColumns[ix].text;
                var reps = friendColumns[ix].rep;
                if (typeof reps != "undefined") {
                    for (var ox in reps) {
                        var expr = eval(reps[ox].find);
                        var value = eval(reps[ox].replace);
                        text = text.replace(expr, value);
                    }
                }
                var align = friendColumns[ix].align;
                if (typeof align != "undefined") {
                    nodeTD.align = align;
                }
	nodeTD.innerHTML = text;
                nodeTR.appendChild(nodeTD);
            }
            // Añadimos el onclick para el elemento 'quitar'
            nodeTR.lastChild.addEventListener("click", deleteContact, true);
            nodeTR.id = "CONTACT-ROW:" + friend.id;
            return nodeTR;
        }
        hideBox();
        prepareContactsTable();
        newContactsOrder(0);
    }
	
	function doAddExtraRatings(){
	
                
	function extractTranslatedTitle() {
            var nodo = "//span[@itemprop='name']".findNode();        
            return nodo.textContent.clearTitle();
        }
    function extractOriginalTitle(){
           
           var nodo = "//dt[contains(text(),'tulo original')]/following-sibling::*".findNode();        
           return nodo.textContent.clearTitle();
        }
	
        var isSerie = false;
		var tit_traducido = extractTranslatedTitle().split(' ').join('+');
		var tit_original = extractOriginalTitle().split(' ').join('+');
		var anio = "//dt[text()='Año']/following-sibling::*".findNode().lastChild.textContent.trim();	
        
        //Para animes
        var isAnime = false;
        var generoanm = '//dt[text()="Reparto"]/following-sibling::*/a'.findNode();        
        var paisanm = '//dt[text()="País"]/following-sibling::*'.findNode();
        var urlmal = "";
        var animeTitle = "";
        if(generoanm.textContent == "Animation" && paisanm.textContent.trim() == "Japón"){             
            isAnime = true;
        if ("//span[@itemprop='name']".findNode().textContent.indexOf("Serie de TV") > -1){
                var auxanm = "//dt[contains(text(),'tulo original')]/following-sibling::*".findNode().textContent;
                var coincidencias = auxanm.match(/\(/g);            
				var numcars = coincidencias ? coincidencias.length : 0;
				if(numcars == 1)
                    animeTitle = tit_original;
                else
					animeTitle = auxanm.split('(')[1].split(')')[0];
            }
            else {
                var auxanm = "//dt[contains(text(),'tulo original')]/following-sibling::*".findNode().textContent;                
                var coincidencias = auxanm.match(/\(/g);                
				var numcars = coincidencias ? coincidencias.length : 0;                
				if(numcars == 1)
                	animeTitle = auxanm.split('(')[1].split(')')[0];
                else
                	animeTitle = tit_original;                
            }            
            urlmal = "https://www.google.es/search?q=" + animeTitle.replace('#',' ') + "+score+users+myanimelist";
            
        }        
		        	
		//Comprobar si es serie de tv
		if ("//span[@itemprop='name']".findNode().textContent.indexOf("Serie de TV") > -1)
			isSerie = true;
			
		//Urls	
		var urlimdb = "https://www.google.es/search?q=" + tit_original.replace('#',' ') + "+" + anio + "+imdb";	                
		var urlrtn = "https://www.google.es/search?q=" + tit_original.replace('#',' ') + "+" + anio + '+tomatoes+"user+ratings:"+liked+it';
        var urlrtn2 = "https://www.google.es/search?q=" + tit_original.replace('#',' ') + '+"User+Ratings:"+"Average+Rating"+"liked+it."+site:www.rottentomatoes.com';
        //var urlabd = "https://www.google.es/search?q=" + tit_traducido.replace('#',' ') + "+" + anio + "+abandomoviez+puntos+total";
        //var urlabd2 = "https://www.google.es/search?q=" + tit_traducido.replace('#',' ') + "+" + anio + '+pts+"(Total:"+www.abandomoviez.net/movil/';
		var nodop = '//div[@class="share-links-movie"]'.findNode();
        
		//Creamos un nuevo cuadro para las notas
		var newdiv = d.createElement('div');
        newdiv.style.backgroundColor = "#F0F0F0";
		newdiv.style.border = "1px solid #CDDCEB";
		newdiv.style.textAlign = "center";
		newdiv.style.margin = "10px";
        newdiv.style.display = "block";
			
        var auximdb;
		var notaimdb;
        var votosimdb;
        var auxrtn;
		var notartn;
        var votosrtn;
        //var auxabd, notaabd, votosabd;
		var auxmal, notamal, votosmal;       
                
		var tmp = "";
		tmp += '<div style="text-align:center;">';
		tmp += '<div style="padding:10px 0 4px; color:#4682B4; font-size:13px"><strong>OTRAS PÁGINAS</strong></div>';
		//tmp += '<img id="logoimdb" src="' + logoimdb + '">';
        
        if(!isAnime){            
        //IMDB
        tmp += '<div style="margin: 5px 15px; padding:4px 0; color:#A58500; background-color:#ffffff; font-size:18px;font-weight: bold;border:1px solid #A58500;">IMDB';
        tmp += '<div>';
        tmp += '<div id="cnimdb" style="padding:6px;font-size:22px;color:#136CB2;font-weight: bold;">-,-</div>';
        tmp += '<div id="vtimdb" style="font-size:12px;color:#A58500;padding:1px 0px;"></div></div></div>';
        //RottenTomatoes
		tmp += '<div style="margin: 12px 15px; padding:4px 0; color:#627D11; background-color:#ffffff; font-size:18px;font-weight: bold;border:1px solid #627D11;">Rotten Tomatoes';
        tmp += '<div>';
		tmp += '<div id="notartn" style="padding:6px; color:#CF4400; font-size:22px;font-weight: bold;">-,-</div>';
        tmp += '<div id="vrtn" style="font-size:12px;color:#627D11;padding:1px 0px;">NO</div></div></div>';
        //Abandomoviez
		/*tmp += '<div style="margin: 5px 15px 10px; padding:4px 0; color:#000000; background-color:#ffffff; font-size:16px;font-weight: bold;border:1px solid #000000;">Abandomoviez';
        tmp += '<div>';
		tmp += '<div id="notaabd" style="padding:6px; color:#310100; font-size:22px;font-weight: bold;">-,-</div>';
        tmp += '<div id="vabd" style="font-size:12px;color:#000000;padding:1px 0px;">NO</div></div></div>';*/
        }
        else {
        //MyAnimeList
		tmp += '<div style="margin: 5px 15px 10px; padding:4px 0; color:#2e51a2; background-color:#ffffff; font-size:16px;font-weight: bold;border:1px solid #2e51a2;">MyAnimeList';
        tmp += '<div>';
		tmp += '<div id="notamal" style="padding:6px; color:#000000; font-size:22px;font-weight: bold;">-,-</div>';
        tmp += '<div id="vmal" style="font-size:12px;color:#2e51a2;padding:1px 0px;">NO</div></div></div>';
        }
		tmp += '</div>';
		newdiv.innerHTML = tmp;
		nodop.parentNode.insertBefore(newdiv, nodop);			
		
        if(!isAnime){ 
		doGet(urlimdb, function (response) {
			
			var emptydiv = document.createElement('div');
            emptydiv.innerHTML = response;
            //notaimdb = '//div[contains(text(),"Valoraci")]'.findNode(emptydiv).textContent.split(" ")[1].split("/")[0];
            auximdb = '//div[contains(text(),"Valoraci")]'.findNode(emptydiv).textContent;
            notaimdb = auximdb.split(" ")[2].split("/")[0];
            votosimdb = auximdb.split(" ")[4];
            //var notabien = (parseFloat(notaimdb)).toFixed(1).replace('.',',');
            var notabien = notaimdb.replace('.',',');
			var nodnota = '//div[@id="cnimdb"]'.findNode();
            var nodvotos = '//div[@id="vtimdb"]'.findNode();
            
            if(notabien.length == 1)
				nodnota.textContent = notabien + ",0";
            else
                nodnota.textContent = notabien;
            
            nodvotos.textContent = votosimdb + " votos";
			                     
        });
		
		if(!isSerie){		
		doGet(urlrtn, function (response) {			
			var emptydiv = document.createElement('div');
            emptydiv.innerHTML = response;
            //notartn = '//span[@class="st"]'.findNode(emptydiv).textContent.split("it. Average Rating: ")[1].split('/')[0];
            auxrtn = '//span[@class="st"]'.findNode(emptydiv).textContent;            
			var coincidencias = auxrtn.match(/it. Average Rating/g);
            var nodvotos = '//div[@id="vrtn"]'.findNode();
            if(coincidencias != null){			            
            	notartn = auxrtn.split("it. Average Rating: ")[1].split('/')[0];            
            	votosrtn = auxrtn.split("User Ratings: ")[1].split("...")[0].trim();            
				var notabien = (parseFloat(notartn)*2).toFixed(1).replace('.',',');
				var nodnota = '//div[@id="notartn"]'.findNode();
				nodnota.textContent = notabien;
				var votosbien = votosrtn.split(',').join('.');                
            	nodvotos.textContent = votosbien + " votos";
            } 
            if(nodvotos.textContent == "NO"){                
        	doGet(urlrtn2, function (response) {
			var nodvotos = '//div[@id="vrtn"]'.findNode();               
			var emptydiv = document.createElement('div');
            emptydiv.innerHTML = response;
            //notartn = '//span[@class="st"]'.findNode(emptydiv).textContent.split("it. Average Rating: ")[1].split('/')[0];
            auxrtn = '//span[@class="st"]'.findNode(emptydiv).textContent;                
			var coincidencias = auxrtn.match(/it. Average Rating/g);            
            if(coincidencias != null){	                
            	notartn = auxrtn.split("it. Average Rating: ")[1].split('/')[0];                  
            	votosrtn = auxrtn.split("User Ratings: ")[1].split("...")[0].trim();                  
				var notabien = (parseFloat(notartn)*2).toFixed(1).replace('.',',');
				var nodnota = '//div[@id="notartn"]'.findNode();
				nodnota.textContent = notabien;            	
            	var votosbien = votosrtn.split(',').join('.');                
            	nodvotos.textContent = votosbien + " votos";            
            }});
        }});
		}       
        
		/*doGet(urlabd2, function (response) {
			
			var emptydiv = document.createElement('div');
            emptydiv.innerHTML = response;
            //auxabd = '//em[text()="Total"]/ancestor::*[position()=1]'.findNode(emptydiv).textContent;
            auxabd = '//em[text()="Total"]'.findNode(emptydiv).parentNode.textContent;            
            votosabd = auxabd.split("Total: ")[1].split(')')[0];            
            notaabd = auxabd.split("'. ")[1].split(" pts")[0];			        
			var notabien = (parseFloat(notaabd)).toFixed(1).replace('.',',');
			var nodnota = '//div[@id="notaabd"]'.findNode();
			nodnota.textContent = notabien;            
            var nodvotos = '//div[@id="vabd"]'.findNode();            
			nodvotos.textContent = addMiles(votosabd) + " votos";
                                 
        });	*/ 
        }
        else {
        doGet(urlmal, function (response) {
			
			var emptydiv = document.createElement('div');
            emptydiv.innerHTML = response;
            //auxabd = '//em[text()="Total"]/ancestor::*[position()=1]'.findNode(emptydiv).textContent;
            auxmal = '//em[text()="scored"]'.findNode(emptydiv).parentNode.textContent;            
            votosmal = auxmal.split("scored by ")[1].split(' users)')[0];            
            notamal = auxmal.split("Score: ")[1].split(" (scored")[0];			        
			var notabien = (parseFloat(notamal)).toFixed(1).replace('.',',');
			var nodnota = '//div[@id="notamal"]'.findNode();
			nodnota.textContent = notabien;            
            var nodvotos = '//div[@id="vmal"]'.findNode();            
			nodvotos.textContent = addMiles(votosmal) + " votos";
                                 
        });	
        } 
        var disclai = '//div[@class="movie-disclaimer"]'.findNode();
        disclai.style.padding = "0px 20px";
	}
	
    function addMiles(nStr)
	{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
	}
    
    function doAddExtraVotes(){
	
	var nodot = '//b[contains(text(),"Votaciones de tus Amigos")]/ancestor::*[position()=7]'.findNode();
	var clon1 = nodot.cloneNode(true);
		
	var aux = '/td[2]/table/tbody/tr'.findNode(clon1);	
	aux.style.backgroundColor = "#CAFF70";
	//Nodo span titulo tabla
	aux = '/td[2]/table/tbody/tr/td/span'.findNode(clon1);
	aux.style.color="#308014";
	aux.lastChild.textContent = "Votaciones de tus contactos adicionales:";
	//Eliminamos los votos de amigos
	var votesTable = '/td[2]/table'.findNode(clon1);
	var tBody = votesTable.lastChild;
	    while(votesTable.rows.length > 1) {
	       tBody.removeChild(votesTable.rows[1]);
	}
	
	//Añadimos por defecto que nadie haya votado
	var trnadie = d.createElement('tr');
	var tdnadie = d.createElement('td');
	tdnadie.colSpan = 3;
	tdnadie.textContent = "Tus contactos adicionales no han valorado esta película.";
	trnadie.appendChild(tdnadie);
	tBody.appendChild(trnadie);
	
	//Añadimos la fila vacía del final para mejorar aspecto
	var trvacia = d.createElement('tr');
	var tdvacia = d.createElement('td');
	tdvacia.colSpan = 3;
	tdvacia.textContent = "";
	trvacia.appendChild(tdvacia);
	tBody.appendChild(trvacia);
	//Obtenemos los contactos
	var friendsStr = GM_getValue(userId + '.extraFriends');
	var eFriends;
	if (typeof friendsStr != 'undefined') {
                eFriends = eval(friendsStr);
                 } else {
                eFriends = [];
                 }
	
	eFriends.sort(function(a, b) {
                    return a.name.toLowerCase() > b.name.toLowerCase();
                });
	//Obtenemos id de la película
	var nodo3 = '//a[contains(text(),"Añade tu crítica") or contains(text(),"Eliminar crítica")]'.findNode();
	
	var aux3 = nodo3.href.split('=');
	var idpeli = aux3[1];
	var nota = ""; 
	var numvista = 0;
	var sumavotos = 0;
	var url = 'http://cinemakb.freehostingcloud.com/src/prueba.php?pelicula=' + idpeli;
	doGet(url, function (response) {
	var emptydiv = document.createElement('div');
                emptydiv.innerHTML = response;
	var nodos = '//strong'.findNodesArray(emptydiv);
	if(nodos.length > 0){
	var aids = new Array(nodos.length);
	var anotas = new Array(nodos.length);
	
	for(i = 0; i < nodos.length; i++){
	    aids[i] = nodos[i].textContent.split('-')[0];
	    anotas[i] = nodos[i].textContent.split('-')[1];
	}
	
	for(ix in eFriends)
	     for(j = 0; j < aids.length; j++)
	         if(eFriends[ix].id == aids[j])
	              nueva_fila(eFriends[ix].id, eFriends[ix].name, anotas[j]);	
	 }  
	});
       function nueva_fila(numero, nombre, nota){
	
	numvista++;
	sumavotos += parseInt(nota);
	var notamedia = 0.0;
	//Creamos la fila con nick +  compartir + nota
	var newtr = d.createElement('tr');
	var txtfila = "";
	txtfila += '<td width="300"><a class="lnk3" href="/es/userlastratings.php?user_id=' + numero + '"><b>' + nombre + '</b></a></td>';
	txtfila += '<td><span class="share-link" style="float:none"><a href="/es/sharerating/' + numero + '/' + idpeli + '.html">Compartir</a></span></td>';
	txtfila += '<td width="140" align="center"><img src="http://www.filmaffinity.com/imgs/myratings/' + nota + '.gif" width="112" height="11"></td>';
	newtr.innerHTML = txtfila;
	
	//Media votaciones
	var trmedia = d.createElement('tr');
	trmedia.style.backgroundColor = "#eeeeee";
	var tdmedia = d.createElement('td');
	tdmedia.colSpan = 2;
	var spanmedia = d.createElement('span');
	spanmedia.style.color = "#606020";
	spanmedia.textContent = "La votación media de tus contactos adicionales es ";
	var bmedia = d.createElement('b');	   
	   spanmedia.appendChild(bmedia);
	   tdmedia.appendChild(spanmedia);
	   trmedia.appendChild(tdmedia);
	var tdmediaimg = d.createElement('td');
	tdmediaimg.align = "center";
	var imgmediaimg = d.createElement('img');
	imgmediaimg.src = "";
	imgmediaimg.id = "pruebaimg";
	  tdmediaimg.appendChild(imgmediaimg);
	  trmedia.appendChild(tdmediaimg);  
	if(numvista == 2){
	    notamedia = (sumavotos/numvista).toFixed(1);
	    imgmediaimg.src = "http://www.filmaffinity.com/imgs/myratings/" + Math.round(notamedia) + ".gif";
	    bmedia.textContent = notamedia.replace('.',',');
	    votesTable.rows[0].parentNode.insertBefore(newtr, votesTable.rows[0].parentNode.lastChild );
	    votesTable.rows[0].parentNode.insertBefore(trmedia,votesTable.rows[0].parentNode.lastChild);
	   }
	else if(numvista > 2){	
	    var nspan = '//span[contains(text(),"tactos adicionales es")]'.findNode();
	    var nodob = nspan.lastChild;
	    var nimg = '//img[@id="pruebaimg"]'.findNode();	
	    notamedia = (sumavotos/numvista).toFixed(1);
	    	    
	    nimg.src = "http://www.filmaffinity.com/imgs/myratings/" + Math.round(notamedia) + ".gif";
	    nodob.textContent = notamedia.replace('.',',');
	    votesTable.rows[0].parentNode.insertBefore(newtr, votesTable.rows[0].parentNode.lastChild.previousSibling);		
	  }	
	else {
	   votesTable.rows[0].parentNode.removeChild(votesTable.rows[0].parentNode.lastChild.previousSibling);
	   votesTable.rows[0].parentNode.insertBefore(newtr,votesTable.rows[0].parentNode.lastChild);
	}	
          }	
	nodot.parentNode.appendChild(clon1);
}
    function extractUserData() {
	
        var user = url.split('user_id=')[1].split("&")[0];
        var nombre = '//span[@id="nick"]'.findNode().textContent;
         var valoradas = '//strong[contains(text(),"Media votos")]/../following-sibling::*'.findNode().textContent;
         var criticas = '//a[contains(text(),"valoradas")]/../following-sibling::*'.findNode().textContent;
	if(criticas != 0)
         var listas = '//a[text()="Críticas"]/../following-sibling::*'.findNode().textContent;
	else
         var listas = '//dd[text()="Críticas"]/following-sibling::*'.findNode().textContent;         	
        var ciudad =  d.getElementById("loc").textContent;
        var pais = ciudad.split('-')[1].trim();
        ciudad = ciudad.split('-')[0].trim();
        dir = ciudad + ' (' + pais + ')';
        return {id:user,name:nombre,city:dir,votes:valoradas,reviews:criticas,lists:listas};
    }
    // Captura los datos del usuario si lo tenemos en la lista de Contactos y actualiza los datos
    function doCaptureContactData() {
        var user = url.split('user_id=')[1].split("#")[0];
        var friendsStr = GM_getValue(userId + '.extraFriends');
        // Añadimos los nuevos amigos
        if (typeof friendsStr != 'undefined') {
            var eFriends = eval(friendsStr);
            if (inArray(eFriends, 'id', user)) {
                var friend = extractUserData();
                eFriends = arrayReplace(eFriends, 'id', friend);
                GM_setValue(userId + '.extraFriends', eFriends.toSource());
            }
        }
    }
    
    function doAddCompactTopics(){
    
        var topic = '//h1'.findNode().textContent;
        var nompelis = '//div[@class="title"]/a'.findNodesArray();
        var nodofin = '//a[@href="/es/abouttopics.php"]'.findNode();	
	for(var ix in nompelis){
	var titlep2 = nompelis[ix].textContent;
    //var titlep = titlep2.replace('\'','\\\'');    
    //var titlep = replaceAll(titlep2,'\'','\\\'');    
    var titlep = titlep2.replace(/'/g,"\\\'");
    var aux = nompelis[ix].href;
    var idpeli = aux.split('/film')[1].split('.')[0];    
	//aux = aux.split('/')[1];    
	var newa = d.createElement('div');
	newa.textContent = "\nINSERT INTO Topics (topic, movietitle, movieid) VALUES ('" + topic + "','" + titlep + "'," + idpeli + ");";
	nodofin.parentNode.appendChild(newa);	   	
    }}
        
function doAddCompactCountries(){
	var nodopais = '//caption[contains(text(),"Votaciones por pa")]/following-sibling::*'.findNode();
	var nodogen = '//caption[contains(text(),"Votaciones por g")]/following-sibling::*'.findNode();
	var nodoanios = '//caption[contains(text(),"Votaciones por a")]/following-sibling::*'.findNode();
	var nodofin = '//em[contains(text(),"Por motivos de rendimiento")]/ancestor::*[position()=5]'.findNode();
	var nombre = '//span[@id="nick"]'.findNode().textContent;
	var nid = url.split('user_id=')[1];
	var txt = "";
	var cant = "";
	var txt2 = "";
	var media = "";
	var newdel1 = d.createElement('div');
	var newdel2 = d.createElement('div');
	var newdel3 = d.createElement('div');
	newdel1.textContent = "DELETE FROM Generos WHERE userid = " + nid + ";";
	newdel2.textContent = "DELETE FROM Paises WHERE userid = " + nid + ";";
	newdel3.textContent = "DELETE FROM Anios WHERE userid = " + nid + ";";
	nodofin.parentNode.appendChild(newdel1);
	nodofin.parentNode.appendChild(newdel2);
	nodofin.parentNode.appendChild(newdel3);
	for(i = 1; i < nodogen.rows.length; i++){
	    cant = nodogen.rows[i].cells[0].textContent.trim();	
	    txt = nodogen.rows[i].cells[1].textContent.trim();
	    media = nodogen.rows[i].cells[2].textContent.trim();
	    txt2 = getGenCode(txt);	    
	   var newa = d.createElement('div');
	   newa.textContent = "\nINSERT INTO Generos (nick, userid, gen, cant, avg) VALUES ('" + nombre + "'," + nid + ",'" + txt2 + "'," + cant + ",'" + media + "');";
	   nodofin.parentNode.appendChild(newa);	
	}
	for(i = 1; i < nodopais.rows.length ; i++){
	    cant = nodopais.rows[i].cells[0].textContent.trim();	
	    txt = nodopais.rows[i].cells[1].textContent.trim();
	    media = nodopais.rows[i].cells[2].textContent.trim();
	    txt2 = getCountryCode(txt);
	   var newa = d.createElement('div');
	   newa.textContent = "\nINSERT INTO Paises (nick, userid, pais, cant, avg) VALUES ('" + nombre + "'," + nid + ",'" + txt2 + "'," + cant + ",'" + media + "');";
	   nodofin.parentNode.appendChild(newa);
	}
	for(i = 1; i < nodoanios.rows.length ; i++){
	    cant = nodoanios.rows[i].cells[0].textContent.trim();	
	    txt = nodoanios.rows[i].cells[1].textContent.trim();
	    media = nodoanios.rows[i].cells[2].textContent.trim();
	    txt2 = getAnioCode(txt);
	   var newa = d.createElement('div');
	   newa.textContent = "\nINSERT INTO Anios (nick, userid, anio, cant, avg) VALUES ('" + nombre + "'," + nid + ",'" + txt2 + "'," + cant + ",'" + media + "');";
	   nodofin.parentNode.appendChild(newa);
	}
	
}
function doAddCompactVotes(){
	var nodos = '//a[contains(@href,"sharerating/")]'.findNodesArray();
	var notas = '//img[contains(@src,"images/myratings")]'.findNodesArray();
	var anios = '//a[@class="ntext"]'.findNodesArray();
	var nodofin = '//a[contains(text(),"Ir arriba")]'.findNode();
	var nick = '//span[@id="nick"]'.findNode().textContent;
	
	for(var ix in nodos){
	var cad = nodos[ix].href;
	usuario = cad.split('/')[5];
	var pelid = cad.split('/')[6].split('.')[0];
	cad = notas[ix].src;
	var nota = cad.split('/')[5].split('.')[0];
	var anio = anios[ix].parentNode.nextSibling.textContent.replace(/[()]/gi,"").trim();
	var newa = d.createElement('div');
	newa.textContent = "\nINSERT INTO Votos (movieid, nick, userid, rating, anio) VALUES (" + pelid + ",'" + nick + "'," + usuario + "," + nota + "," + anio + ");";
	nodofin.parentNode.appendChild(newa);	
	}
}
    function doAddToExtraContactsLink() {
	
        function doAddContact() {
            var friend = extractUserData();	
            var friendsStr = GM_getValue(userId + '.extraFriends');
            var eFriends;
            if (typeof friendsStr != 'undefined') {
                eFriends = eval(friendsStr);
            } else {
                eFriends = [];
            }
            if (!inArray(eFriends, 'id', friend.id)) {
                eFriends.push(friend);
                GM_setValue(userId + ".extraFriends", eFriends.toSource());
                alert("Contacto añadido");
            }
        }
        var user = url.split('user_id=')[1].split('&')[0];
        var friendsStr = GM_getValue(userId + '.extraFriends');
        // Añadimos los nuevos amigos
        if (typeof friendsStr != 'undefined') {
            var eFriends = eval(friendsStr);
            log(eFriends.toSource());
            if (!inArray(eFriends, 'id', user)) {
                var anchor = '//a[@class="uc"]'.findNode();	
                if (anchor != null) {                    
                    var a = d.createElement('a');
	    var imag = d.createElement('img');
                    a.id = user;
	    imag.src = "http://i40.tinypic.com/34ipdw1.gif";
	    a.title = "añadir a contactos adicionales";
                    a.className = 'uc';
                    a.href = "#";
                    a.addEventListener("click", doAddContact, true);
                    //a.textContent = "Añadir a lista de contactos adicionales";
	   a.appendChild(imag);                    
                    anchor.parentNode.insertBefore(a, anchor.nextSibling);
                }
            }
        }//if (undefined)
        else	{
            var anchor = '//a[@class="uc"]'.findNode();	
                if (anchor != null) {                    
                    var a = d.createElement('a');
	    var imag = d.createElement('img');
                    a.id = user;
	    imag.src = "http://i40.tinypic.com/34ipdw1.gif";
	    a.title = "añadir a contactos adicionales";
                    a.className = 'uc';
                    a.href = "#";
                    a.addEventListener("click", doAddContact, true);                   
	    a.appendChild(imag);                    
                    anchor.parentNode.insertBefore(a, anchor.nextSibling);
                } 	
        }//else
    }
    function doAddExternalLinkLists() {
        var linkTPL = "http://www.filmaffinity.com/es/userlist.php?user_id={USER}&list_id={LIST}";
        var links = getElementsByClassName(d, "a", "llnk");
        for (var ix = 0; ix < links.length; ix++) {
            var link = links[ix];
            var listID = link.href.split('=')[1];
            var a = d.createElement('a');
            a.id = listID;
            a.href = linkTPL.replace(/{USER}/g, userId).replace(/{LIST}/g, listID);
            a.innerHTML = "<img style='margin-left:5px;' src='" + link_img + "'>";
            a.alt = "Enlace externo para otros usuarios";
            a.title = a.alt;
            link.parentNode.appendChild(a);
        }
    }
    function doAddSearchListsOption() {
        function OnSearchButtonClick() {
            var nodoSelect = "//select[@name='stype']".findNode();
            if (nodoSelect.value != "lists") {
                // Enviamos el form de forma normal
                nodoSelect.form.submit();
            } else {
                var texto = "//input[@name='stext']".findNode().value;
                // var search = texto + ' "listas de:" site:filmaffinity.com -list_id -búsqueda -"crítica de" -"críticas de" -"votaciones de"';
                // var url = "http://www.google.es/search?hl=es&q="+search;
                // De momento, nos vamos a google
                window.location.href = url;
                //doGet(url,function (result) {
                //    log(result);
                //})
            }
        }
        function injectSearchListsOption() {
            // Localizamos el combo de busquedas.
            var nodoSelect = "//select[@name='stype']".findNode();
            if (nodoSelect != null) {
                // añadimos la opción listas
                var option = d.createElement("option");
                option.value = "lists";
                option.text = "Listas";
                nodoSelect.appendChild(option);
                // modificamos el codigo del boton.
                var boton = nodoSelect.nextSibling;
                boton.type = "button";
                boton.addEventListener("click", OnSearchButtonClick, true);
            }
        }
      
        injectSearchListsOption();
    }
    function doMyDataMod() {
        
        function doAddExtraStats() {
           var countriesTable = "//div[text()='Votos por países']/following-sibling::*".findNode();
           var totalCountries = countriesTable.rows.length;
	var parrafo = d.createElement("p");
	var imagen = d.createElement('img');
	var elem_strong = document.createElement('strong');
                var cont1 = d.createTextNode( " " + totalCountries);
                var cont2 = d.createTextNode(" Nº países diferentes");
	imagen.setAttribute('src', 'http://www.filmaffinity.com/images/arrow.gif');
	parrafo.setAttribute("class","profile_activity");
                parrafo.appendChild(imagen);
	elem_strong.appendChild(cont1);
	parrafo.appendChild(elem_strong);
                parrafo.appendChild(cont2);
	var divpelis = "//div[text()='Estadísticas']/following-sibling::*".findNode();
                divpelis.appendChild(parrafo);            
        }
        /*
         Añade estadisticas por continente
         */
        var datosContinentes = [
            {nombre:"América del Norte",votos:0,media:0},
            {nombre:'Europa',votos:0,media:0},
            {nombre:"América del Sur",votos:0,media:0},
            {nombre:'Oceanía',votos:0,media:0},
            {nombre:'Asia',votos:0,media:0},
            {nombre:'África',votos:0,media:0},
            {nombre:'NA',votos:0,media:0}
        ];
        function addLine2Table(table, text, value, media, cont) {
            var clon = table.rows[table.rows.length - 2].cloneNode(true);	
	if(cont%2 == 0)
	clon.className = "odd_votes";
            clon.cells[0].width = "*";	
            clon.cells[0].textContent = text;
            clon.cells[0].setAttribute('style', '');
            clon.cells[1].innerHTML = "<b>" + value + "</b>";
            clon.cells[2].innerHTML = "<b>" + media + "</b>";
            table.rows[table.rows.length - 1].parentNode.appendChild(clon);
        }
	function addLine2RegionsTable(table, text, value, media, cont){
	newttr = d.createElement('tr');
	if(cont%2 == 0)
	     newttr.className = "odd_votes";
	newttd1 = d.createElement('td');
	newttd2 = d.createElement('td');
	btd2 = d.createElement('b');
	btd3 = d.createElement('b');
	newttd3 = d.createElement('td');
	newttd1.width = "165px";
	newttd1.textContent = text;
	newttd2.align = "right";
	newttd2.width = "40px";
	btd2.textContent = value;
	newttd2.appendChild(btd2);
	newttd3.align = "right";
	newttd3.width = "40px";
	btd3.textContent = media;
	newttd3.appendChild(btd3);
	newttr.appendChild(newttd1);
	newttr.appendChild(newttd2);
	newttr.appendChild(newttd3);
	table.appendChild(newttr);
	}
	function addlinenewtable(table, text, value, media, contador, anchoc){
	newttr = d.createElement('tr');
	if(contador%2 == 0)
	     newttr.className = "odd_votes";
	newttd1 = d.createElement('td');
	newttd2 = d.createElement('td');
	btd2 = d.createElement('b');
	btd3 = d.createElement('b');
	newttd3 = d.createElement('td');
	newttd1.width = anchoc;
	newttd1.textContent = text;
	newttd2.align = "right";
	newttd2.width = "40px";
	btd2.textContent = value;
	newttd2.appendChild(btd2);
	newttd3.align = "right";
	newttd3.width = "40px";
	btd3.textContent = media;
	newttd3.appendChild(btd3);
	newttr.appendChild(newttd1);
	newttr.appendChild(newttd2);
	newttr.appendChild(newttd3);
	table.appendChild(newttr);
}
        function doAddContinentStats() {
           
            var countriesTable = "//div[text()='Votos por países']/following-sibling::*".findNode();
            var totalPaises = countriesTable.rows.length;
			var contador = 1;
            for (var i = 0; i < totalPaises; i++) {
                var pais = countriesTable.rows[i].cells[0].textContent;
                var votos = parseInt(countriesTable.rows[i].cells[1].textContent);
                var media = parseFloat(countriesTable.rows[i].cells[2].textContent.replace(',', '.'));
                var continente = getContinent(getCountryCode(pais));
                var ix = inArray(datosContinentes, 'nombre', continente);
                var oldVotos = datosContinentes[ix].votos;
                var oldMedia = datosContinentes[ix].media;
                datosContinentes[ix].votos = oldVotos + votos;
                datosContinentes[ix].media = ((oldVotos * oldMedia) + (votos * media)) / (oldVotos + votos);
            }
            datosContinentes.sort(function(a, b) {
                return (b.votos - a.votos);
            });
           //Creamos la tabla y ajustamos el tamaño
	var continentTable = d.createElement('table');
	var anchura = "160px";
	if(getPreference("FLAGSINMYDATA", false))
	    anchura = "181px";
	for(it = 0; it < totalPaises ; it++)
	  countriesTable.rows[it].cells[0].width = anchura;
            for (ix in datosContinentes) {
                if (datosContinentes[ix].votos > 0) {                  
	contador++;
	addlinenewtable(continentTable, datosContinentes[ix].nombre, datosContinentes[ix].votos, datosContinentes[ix].media.toFixed(1).replace('.', ','), contador, anchura);
                }
            }
	var newtr = d.createElement('tr');
	var divcont = d.createElement('div');
	divcont.textContent = "Votos por continentes";
	divcont.className = "title_profile_votes";
                var divpcont = d.createElement('div');
	divpcont.className = "profile_cont_votes";
	divpcont.style.float = "left";
	divpcont.appendChild(divcont);
	divpcont.appendChild(continentTable);
	newtr.appendChild(divpcont);
            countriesTable.parentNode.parentNode.appendChild(newtr);
            log(datosContinentes.toSource());
        }
        function doChangeDistribution() {
            var index = this.options.selectedIndex;
            var name = this.options[index].value;
            // Eliminamos la tabla actual y creamos una nueva
            $id("REGION_TABLE").parentNode.removeChild($id("REGION_TABLE"));
            doAddRegionsStats(name, DIST_REGIONS, true);
        }
        /*
         Inserta el combobox en la tabla, con los nombres de las distribuciones
         del tipo 'type'
         */
        function insertDistributionCombo(table, current, type) {
            var html = "&nbsp;<select id='DIST_SELECT' name='DIST_SELECT' >";
            for (var ix in distribuciones) {
                if (distribuciones[ix].tipo == type) {
                    html += "<option value='" + ix + "'";
                    if (ix == current) html += " selected ";
                    html += ">" + distribuciones[ix].nombre + "</option>";
                }
            }	
            html += "</select>";
	var trcombo = d.createElement('tr');
	var tdcombo = d.createElement('td');
            	tdcombo.innerHTML = " criterio: " + html;
	trcombo.appendChild(tdcombo);		
            table.rows[0].parentNode.parentNode.insertBefore(trcombo, table.rows[0].parentNode);
            $id("DIST_SELECT").addEventListener("change", doChangeDistribution, false);
        }
        function doAddRegionsStats(distributionName, type, cambio) {
            var datosRegiones = [];
	var cont = 1;
            var countriesTable = "//div[text()='Votos por países']/following-sibling::*".findNode();
            var votesTable = "//div[text()='Votos por nota']/following-sibling::*".findNode();
            var totalPaises = countriesTable.rows.length;
            for (var i = 0; i < totalPaises; i++) {
                var pais = countriesTable.rows[i].cells[0].textContent;
                var votos = parseInt(countriesTable.rows[i].cells[1].textContent);
                var media = parseFloat(countriesTable.rows[i].cells[2].textContent.replace(',', '.'));
                var region = getRegion(distributionName, getCountryCode(pais));
                var ix = inArray(datosRegiones, 'nombre', region);
                if (!ix) {
                    var dato = {nombre:region,votos:0,media:0};
                    datosRegiones.push(dato);
                    ix = inArray(datosRegiones, 'nombre', region);
                }
                var oldVotos = datosRegiones[ix].votos;
                var oldMedia = datosRegiones[ix].media;
                datosRegiones[ix].votos = oldVotos + votos;
                datosRegiones[ix].media = ((oldVotos * oldMedia) + (votos * media)) / (oldVotos + votos);
            }
            datosRegiones.sort(function(a, b) {
                return (b.votos - a.votos);
            });
            /*
             Clonamos la tabla de los paises y metemos los datos
             */
            var regionTable = countriesTable.cloneNode(true);
            for (ix in datosRegiones) {
                if (datosRegiones[ix].votos > 0) {
	    cont++;
	addLine2RegionsTable(regionTable, datosRegiones[ix].nombre, datosRegiones[ix].votos, datosRegiones[ix].media.toFixed(1).replace('.', ','), cont);
//                    addLine2Table(regionTable, datosRegiones[ix].nombre, datosRegiones[ix].votos, datosRegiones[ix].media.toFixed(1).replace('.', ','), cont);
                }
            }
            for (var n = 0; n < totalPaises; n++) {
                regionTable.rows[0].parentNode.removeChild(regionTable.rows[0]);
            }
            //regionTable.rows[0].cells[0].firstChild.firstChild.textContent = "Mis votos por país agrupados según";
            regionTable.id = "REGION_TABLE";
		
	if(cambio){
	var nodoborrar = "//div[text()='Votos por regiones']/ancestor::*[position()=1]".findNode();
	nodoborrar.parentNode.removeChild(nodoborrar);
	}
	
	var newtr = d.createElement('tr');
            divregion = d.createElement('div');
	divregion.className = "title_profile_votes";
	divregion.textContent = "Votos por regiones";
            divpregion = d.createElement('div');
	divpregion.className = "profile_cont_votes";
	divpregion.appendChild(divregion);
	divpregion.appendChild(regionTable);
	newtr.appendChild(divpregion);
            votesTable.parentNode.parentNode.appendChild(newtr);
	
            insertDistributionCombo(regionTable, distributionName, type);
        }
        /*
         * Modifica la apariencia de la tabla Mis Votos por Valor en Mis Datos
         */
        function doAlterMyVotes() {
	var votesTable = "//div[text()='Votos por nota']/following-sibling::*".findNode();
            const ANCHO_MAXIMO = 153;
            var imgTpl = '<img height="14" width="{WIDTH}" border="0" align="top" src="/images/bars/bar1.gif"/><span style="font-size:80%;">&nbsp;{PCT}%</span>';
	//var imgTpl = '<img height="14" width="{WIDTH}" border="0" align="top" src="http://cinemakb.freehostingcloud.com/src/bar1.gif"/><span style="font-size:80%;">&nbsp;{PCT}%</span>';
	var votosTotal = "//img[@src='/images/arrow.gif']/following-sibling::*".findNode().textContent;
            var maxVotos = 0;
            var n;
            var votos;
            for (n = 1; n < votesTable.rows.length; n++) {
                votos = parseInt(votesTable.rows[n].cells[2].textContent);
                if (votos > maxVotos) {
                    maxVotos = votos;
                }
            }
            for (n = 0; n < votesTable.rows.length; n++) {
                var row = votesTable.rows[n];
                row.cells[0].innerHTML = "<b>" + (10 - n) + "</b>&nbsp;";
                row.cells[0].title = row.cells[1].textContent;
                row.cells[1].title = row.cells[1].textContent;
                row.cells[2].title = row.cells[1].textContent;
                row.cells[0].align = "left";
                row.cells[1].align = "left";
	row.cells[0].width = "20";
	votos = parseInt(row.cells[2].textContent);
                var pct = (100 * votos) / votosTotal;
                var width = (ANCHO_MAXIMO * votos) / maxVotos;	
                row.cells[1].innerHTML = imgTpl.replace(/{WIDTH}/g, width).replace(/{PCT}/g, pct.toFixed(2));
            }
        }
        //Preparar la tabla para los distintos datos
        function prepareMyDataTables() {
                      
	var countriesTable = "//div[text()='Votos por países']/ancestor::*[position()=1]".findNode();	
	var votesTable = "//div[text()='Votos por nota']/ancestor::*[position()=1]".findNode();
	var genTable = "//div[text()='Votos por género']/ancestor::*[position()=1]".findNode();            
	//Clonamos las 3 tablas
	var clonVotes = votesTable.cloneNode(true);
	var clonGen = genTable.cloneNode(true);
                var clonPaises = countriesTable.cloneNode(true);
	//Borramos las 3 en la página para meterlas en una tabla
	votesTable.parentNode.removeChild(votesTable);
	genTable.parentNode.removeChild(genTable);
               	countriesTable.parentNode.removeChild(countriesTable);
	var todo = "//div[text()='Estadísticas']/ancestor::*[position()=1]".findNode();
	var tablaextra = d.createElement('table');
	tablaextra.width = "100%";
	tablaextra.border = "0";
	var tr1 = d.createElement('tr');
	var td1 = d.createElement('td');
	var td2 = d.createElement('td');
	var td3 = d.createElement('td');
	td1.width = "280px";
	td1.appendChild(clonVotes);
	td1.style.verticalAlign = "top";
	td2.width = "230px";
	td2.appendChild(clonGen);
	td2.style.verticalAlign = "top";
	td3.appendChild(clonPaises);
	td3.style.verticalAlign = "top";
	tr1.appendChild(td1);
	tr1.appendChild(td2);
	tr1.appendChild(td3);
	tablaextra.appendChild(tr1);
	todo.appendChild(tablaextra);           
        }
        /*
         Indices sobre nuestras votaciones
         ver http://filmaffinity.mforos.com/1360515/7122665-indices-indicadores-e-indicios/
         */
        function doAddDataIndexes() {
            var countriesTable = "//div[text()='Votos por países']/following-sibling::*".findNode();
            var genTable = "//div[text()='Votos por género']/following-sibling::*".findNode();
            var votesTable = "//div[text()='Votos por nota']/following-sibling::*".findNode();
           
	statsTable = d.createElement('table');
	divindices = d.createElement('div');
	divpindices = d.createElement('div');
	divindices.className = "title_profile_votes";
	divindices.textContent = "Índices";
	divpindices.className = "profile_cont_votes";
	divpindices.appendChild(divindices);
	divpindices.appendChild(statsTable);
	contindices = 0;
            function getIndiceRareza() {
                /*
                 Si, ya se que esta duplicada esta función, quizas haga algo con ello algún dia
                 */
                function getSavedSoulMatesLists() {
                    var ssml = eval(GM_getValue(userId + ".ssml"));
                    if (typeof ssml == "undefined") {
                        ssml = new Object();
                        ssml.items = new Array();
                        ssml.last = 0;
                    }
                    return ssml;
                }
                // Obtenemos las ultimas almas gemelas
                var ssml = getSavedSoulMatesLists();
                if (ssml.last > 0) {
                    var lista = eval(GM_getValue(userId + ".sml." + ssml.last));
                    // Si son 20, devolvemos el indice de la ultima
                    if (lista.length < 20) {
                        return 20 - lista.length;
                    } else {
                        return (100 / lista.sm[20].affinity).toFixed(2);
                    }
                    // Si son menos, 20-nº almas gemelas.
                } else {
                    return 0;
                }
            }
            function addIndexHeader(delta) {
                GM_addStyle('a.bindexeslink {color:white;cursor:pointer;font-size:80%;text-decoration:none;} !important');
                GM_addStyle('a.bindexeslink:visited {color:white;cursor:pointer;font-size:80%;text-decoration:none;} !important');
                var clon = statsTable.rows[0].cloneNode(true);
                clon.cells[0].firstChild.firstChild.innerHTML = "Índices <a class='bindexeslink' href='http://filmaffinity.mforos.com/1360515/7122665-indices-indicadores-e-indicios/'>(Detalles)</a>";
                statsTable.rows[statsTable.rows.length - 2].parentNode.insertBefore(clon, statsTable.rows[statsTable.rows.length - delta]);
            }
            function addToStatsTable(text, value, hint) {
                //var clon = statsTable.rows[statsTable.rows.length - 2].cloneNode(true);
	contindices++;
	var newtr = d.createElement('tr');
	if(contindices%2 == 0)
		newtr.className = "odd_votes";
	var tdtxt = d.createElement('td');
	var tdval = d.createElement('td');
	var bval = d.createElement('b');
	tdtxt.textContent = text;
	tdtxt.title = hint;
	bval.textContent = value;
	tdval.appendChild(bval);
               /* clon.cells[0].textContent = text;
                clon.cells[1].innerHTML = "<b>" + value + "</b>";
                clon.cells[0].title = hint;
                statsTable.rows[statsTable.rows.length - 2].parentNode.insertBefore(clon, statsTable.rows[statsTable.rows.length - 1]);*/
	newtr.appendChild(tdtxt);
	newtr.appendChild(tdval);
	statsTable.appendChild(newtr);
            }
            var bPais = "//img[contains(@src,'imgs/countries')]".findNode(); 
            var miPais = bPais.title;
            var rowEEUU = "//td[text()='Estados Unidos']/..".findNode(countriesTable);
            var vistasEEUU = 0;
            var mediaEEUU = 0;
            if (rowEEUU != null) {
                vistasEEUU = rowEEUU.cells[1].textContent;
                mediaEEUU = parseFloat(rowEEUU.cells[2].textContent.replace(',', '.'));
            }
            var rowPais = "//td[text()='{PAIS}']/..".replace(/{PAIS}/g, miPais).findNode(countriesTable);
            var mediaPais = 0;
            var vistasPais = 0;
            if (rowPais != null) {
                mediaPais = parseFloat(rowPais.cells[2].textContent.replace(',', '.'));
                vistasPais = rowPais.cells[1].textContent;
            }
            var rowDocumentales = "//td[text()='Documental']/..".findNode(genTable);
            var vistosDocumentales = 0;
            var mediaDocumentales = 0;
            if (rowDocumentales != null) {
                vistosDocumentales = rowDocumentales.cells[1].textContent;
                mediaDocumentales = parseFloat(rowDocumentales.cells[2].textContent.replace(',', '.'));
            }
            // Obtenemos las variables basicas
            var totalPaises = countriesTable.rows.length;
            var vistasTotal = "//img[@src='/images/arrow.gif']/following-sibling::*".findNode().textContent;
            var mediaux = "//div[@id='ignore_film']/following-sibling::*/strong".findNode().textContent;
            var mediaTotal = parseFloat(mediaux.replace(',', '.'));
            var vistasCastellano = 0;
            var paisesUnaPelicula = 0;
            var paisesUnaPeliculaVoto8910 = 0;
            var paisesCastellano = 0;
            var paisesPromedioMayorEEUU = 0;
            var paisesPromedioMenorEEUU = 0;
            // Recorremos la tabla de paises para obtener el resto de
            // datos
            for (var i = 0; i < totalPaises; i++) {
                var pais = countriesTable.rows[i].cells[0].textContent;
                var peliculas = parseInt(countriesTable.rows[i].cells[1].textContent);
                var media = parseFloat(countriesTable.rows[i].cells[2].textContent.replace(',', '.'));
                if (typeof countriesSpanish[pais] != "undefined") {
                    vistasCastellano += peliculas;
                    paisesCastellano++;
                }
                if (peliculas == 1) {
                    paisesUnaPelicula++;
                    if (media >= 8) {
                        paisesUnaPeliculaVoto8910++;
                    }
                }
                if (peliculas > 1) {
                    if (media > mediaEEUU) {
                        paisesPromedioMayorEEUU++;
                    } else if (media < mediaEEUU) {
                        paisesPromedioMenorEEUU++;
                    }
                }
            }
            /*
             Calculamos los indices
             */
            if (vistasTotal > 0) {
                var IUI = (100 * vistasCastellano) / vistasTotal;
                var IAO = (100 * (vistasCastellano - vistasPais)) / vistasTotal;
                var IB = (100 * vistasEEUU) / vistasTotal;
            }
            if (totalPaises > 0) {
                var IBI = (100 * paisesUnaPelicula) / totalPaises;
            }
            var II = paisesUnaPeliculaVoto8910;
            var IAA = 10 * (mediaPais - mediaTotal);
            var IDC = paisesCastellano;
            var IPCH = 0;
            if (paisesPromedioMayorEEUU > 0) {
                IPCH = paisesPromedioMenorEEUU / paisesPromedioMayorEEUU;
            }
            var IBD = 0;
            if (vistosDocumentales > 0) {
                IBD = (100 * vistosDocumentales) / vistasTotal;
            }
            addToStatsTable("General: ", IB.toFixed(2) + "%", "Numero de películas de EE.UU. en relación al número de películas vistas.");
            addToStatsTable("Búsqueda infructuosa: ", IBI.toFixed(2) + "%", "Número de países con una sola película votada en relación al total de países votados.");
            addToStatsTable("Ingratitud: ", II, "Número de países con una sola película pero con 8, 9 ó 10 de votación.");
            addToStatsTable("Autoaceptación: ", IAA.toFixed(2), "Diez veces la diferencia entre la votación promedio de tu propio país y tu votación promedio.");
            addToStatsTable("Uso del idioma: ", IUI.toFixed(2) + "%", "Número de películas en castellano, en relación al número de películas votadas.");
            addToStatsTable("Aceptación del otro: ", IAO.toFixed(2) + "%", "Número de películas en castellano, sin contar las de tu país en relación al número de películas votadas.");
            addToStatsTable("Difusión: ", IDC, "Número de países votados de habla castellana.");
            //addToStatsTable("Rareza: ", getIndiceRareza(), "Inverso del grado de afinidad de tu última Alma Gemela.");
            addToStatsTable("Percepción de la Calidad de Hollywood: ", IPCH.toFixed(2), "Número de países con votación promedio menor que la de EE.UU. en relación a los países con votación promedio mayor a la de EE.UU. Excluyendo los países con una sola película votada.");
            addToStatsTable("Bien Documentado:", IBD.toFixed(2) + "%", "Porcentaje de documentales que has votado sobre el total votado.");
            //addIndexHeader(11);
            // Como ahora duplicamos la tabla, borramos los restos de la tabla anterior
            /*for (var n = 0; n < 6; n++) {
                statsTable.rows[0].parentNode.removeChild(statsTable.rows[0]);
            }
            // y la ultima fila
            statsTable.rows[0].parentNode.removeChild(statsTable.rows[statsTable.rows.length - 1]);*/
	var newtr = d.createElement('tr');
	newtr.appendChild(divpindices);
	votesTable.parentNode.parentNode.appendChild(newtr);
        }
	function addLine2YearTable(table, text, votos, media, cont){
	
	newttr = d.createElement('tr');
	if(cont%2 == 0)
	     newttr.className = "odd_votes";
	else
	     newttr.style.backgroundColor = "#ffffff";
	newttd1 = d.createElement('td');
	newttd2 = d.createElement('td');
	newttd3 = d.createElement('td');
	btd1 = d.createElement('b');
	btd2 = d.createElement('b');
	btd3 = d.createElement('b');
	newttd1.width = "122px";
	newttd1.align = "center";
	newttd1.style.color = "blue";
	btd1.textContent = text;
	newttd1.appendChild(btd1);
	newttd2.align = "right";
	newttd2.width = "40px";
	btd2.textContent = votos;
	newttd2.appendChild(btd2);
	newttd3.align = "right";
	newttd3.width = "40px";
	btd3.textContent = media;
	newttd3.appendChild(btd3);
	newttr.appendChild(newttd1);
	newttr.appendChild(newttd2);
	newttr.appendChild(newttd3);
	table.appendChild(newttr);
	}
        function doAddVotesYear() {
            var url = "http://www.filmaffinity.com/es/userrep.php?user_id=" + userId;
	var cont = 1;
            doGet(url, function(response) {
                // Procesamos los datos                
	var genTable = "//div[text()='Votos por género']/following-sibling::*".findNode();               
	var yearTable = d.createElement('table');    
                var emptydiv = document.createElement('div');
                emptydiv.innerHTML = response;
                var statsYearTable = "//caption[contains(text(),'Votaciones por a')]/..".findNode(emptydiv);
	
                if (statsYearTable != null) {
                    for (var n = 1; n < statsYearTable.rows.length; n++) {
	        cont++;
                        var year = statsYearTable.rows[n].cells[1].textContent;
                        var votes = statsYearTable.rows[n].cells[0].textContent;
                        var mean = statsYearTable.rows[n].cells[2].textContent;                       
	        addLine2YearTable(yearTable, year, votes, mean, cont);
                    }
                    /*for (n = 0; n < countriesTable.rows.length; n++) {
                        yearTable.rows[0].parentNode.removeChild(yearTable.rows[0]);
                    }
	*/
	divanios = d.createElement('div');
	divpanios = d.createElement('div');
	divanios.className = "title_profile_votes";
	divanios.textContent = "Votos por año";
	divpanios.className = "profile_cont_votes";
	divpanios.appendChild(divanios);	
	divpanios.appendChild(yearTable);
	var newtr = d.createElement('tr');
	newtr.appendChild(divpanios);
                    genTable.parentNode.parentNode.appendChild(newtr);
                }
            });
        }
	function doAlterMyGens(){
	var media = 0.0;
	var mauz = 0.0;
	var genTable = "//div[text()='Votos por género']/following-sibling::*".findNode();
	var vistasTotal = "//img[@src='/images/arrow.gif']/following-sibling::*".findNode().textContent;
	for(i = 0; i < genTable.rows.length ; i++){
	      var m = genTable.rows[i].insertCell(-1);
	      m.align = "right";	
	      m.width = "50px";
	      mauz = genTable.rows[i].cells[1].textContent;
	      media = (parseFloat(mauz)/vistasTotal)*100;
	      media = media.toFixed(2);
	      //m.innerHTML = '<b>' + media + "%" +  '</b>';	      
	      m.innerHTML = media + "%";	      
	}	
        }
        
        /*function doAddTopicStats(){
            var nodoadd = '//span[contains(text(),"Redes sociales")]/ancestor::*[position()=1]'.findNode();           
			var ndivclas = d.createElement('div');
			ndivclas.className = "title_profile";
			ndivclas.textContent = "Topics";
            var ntopicclas = d.createElement('table');
			ntopicclas.style.width = "100%";
		    var txt = "";
			txt += '<tbody><tr>';
			txt += '<td style="vertical-align:top;" width="270px"><div class="profile_cont_votes" width="260px">';
			txt += '<div class="title_profile_votes">A-H</div>';
			txt += '<table id="TOPICSAH"><tbody>';           
            txt += '<td width="180" align="left">Animación para adultos</td>';
	        txt += '<td align="right" width="40"><b>12</b></td>';   
	        txt += '<td align="right" width="40"><b>5,7</b></td>';   
            txt += '</table></div></td>';
            txt += '<td style="vertical-align:top;" width="270px"><div class="profile_cont_votes" width="260px">';
			txt += '<div class="title_profile_votes">I-N</div>';
			txt += '<table id="TOPICSI-N"><tbody>';           
            txt += '<td align="center"><b><font color="#CDAD00">3-D</font></b></td>';
	        txt += '<td align="center"><b><font color="#CDAD00">12</font></b></td>';   
	        txt += '<td align="center"><b><font color="#CDAD00">5,7</font></b></td>';  
            txt += '</table></div></td>';
            txt += '<td style="vertical-align:top;" width="270px"><div class="profile_cont_votes" width="260px">';
			txt += '<div class="title_profile_votes">O-Z</div>';
			txt += '<table id="TOPICSOZ"><tbody>';           
            txt += '<td align="center"><b><font color="#CDAD00">3-D</font></b></td>';
	        txt += '<td align="center"><b><font color="#CDAD00">12</font></b></td>';   
	        txt += '<td align="center"><b><font color="#CDAD00">5,7</font></b></td>';   
            txt += '</table></div></td></tr>';
                      
            ntopicclas.innerHTML = txt;
            nodoadd.parentNode.appendChild(ndivclas);
            nodoadd.parentNode.appendChild(ntopicclas);            
        }
*/
        
        doAddExtraStats();
        prepareMyDataTables();
        doAlterMyVotes();
        if (getPreference("SHOWMFINDEXES", true)) doAddDataIndexes();
        	doAddContinentStats();
        if (getPreference("COUNTRYDISTS", false)) doAddRegionsStats("Lingüístico", DIST_REGIONS, false);
        if (getPreference("SHOWYEARDATA", false)) doAddVotesYear();
			doAlterMyGens();
        //doAddTopicStats();
    }
  //Función que añade a Mis Datos distintas clasificaciones
  function doAddClasif(){
    function doClasPais(){     
          function injectFilesGeneral(codigo, clas){
			var order = 6;
	var url = 'http://www.neokben.host-ed.me/fa/src/';
	if(clas == "paises"){
	    url += 'paises.php?cpais=';
	    var nodot = '//table[@id="CLAS_PAISES"]'.findNode();
		order = 6;
	}
	else if(clas == "generos"){
	    url += 'generos.php?cgenre=';
 	    var nodot = '//table[@id="CLAS_GENEROS"]'.findNode();
		order = 8;
	}
	else if(clas == "anios"){
	    url += 'anios.php?canio=';
	    var nodot = '//table[@id="CLAS_ANIOS"]'.findNode();
		order = 1;
	}
	url += codigo;
	var nodoid = '//a[contains(text(),"ticas favoritas")]'.findNode();
	var idprop = getUserId();
	var tbody = nodot.lastChild;
	var name = "";
	var nusuarios = parseInt(getPreference('nusers'));
	if(nusuarios < 10 || nusuarios > 100)
	   nusuarios = 20;	
	
	//Primero limpiamos la tabla	
	while(nodot.rows.length > 1) {
	       tbody.removeChild(nodot.rows[1]);
	}
	//Luego añadimos los nuevos datos
	doGet(url, function (response) {
	         	
	    var emptydiv = document.createElement('div');
                    emptydiv.innerHTML = response;
	    var nodos = '//strong'.findNodesArray(emptydiv);
	    if(nodos.length > 0){
	     for(i = 0; i < nodos.length && i < nusuarios; i++){
				name = nodos[i].textContent.split('-')[0];	         
	         if(name.indexOf("h e r m a n") != -1)
	            name = "hermanônegrö";
	         if(name.indexOf("latra") != -1)
	            name = "ególatra";
             if(name.indexOf("Fili") != -1)
	            name = "Filiûs de Fructüs";
	         if(name.indexOf("Atticus") != -1)
	            name = "Atticus Fiúncho";
	         if(name.indexOf("dovicum") != -1)
	            name = "Luis (Ludovicum)";
	         if(name.indexOf("Iv") == 0)
	            name = "Iván";
	         if(name.indexOf("es Martes") != -1)
	            name = "Sonríe es Martes";
			 if(name.indexOf("ManuFdez") != -1)
	            name = "ManuFdezReinón";  	
			 if(name.indexOf("Atrapa") != -1)
	            name = "Atrapasueños";  
             
	         var newtr = d.createElement('tr');
	         if(i%2 == 0)
                newtr.className = "odd_votes";
	         var txtfila = "";
	         
	         if(i == 0){
	           txtfila += '<td align="center"><b><font color="#CDAD00">' + (i+1) + '</font></b></td>';
	           txtfila += '<td width="140px">';
	           txtfila += '<a href="http://www.filmaffinity.com/es/userratings.php?user_id=' + nodos[i].textContent.split('-')[1] + '&orderby=' + order + '"';
	           txtfila += 'target="_blank" style="text-decoration: none; color:inherit">';	
                           txtfila += '<b><font color="#CDAD00">' + name + '</font></b></a></td>';
	           txtfila += '<td align="right" width="35px"><b><font color="#CDAD00">' + nodos[i].textContent.split('-')[2] + '</font></b></td>';
	           txtfila += '<td align="right" width="35px"><b><font color="#CDAD00">' + nodos[i].textContent.split('-')[3] + '</font></b></td>';
	         }
	         else if(i ==1){
				txtfila += '<td align="center"><b><font color="#B7B7B7">' + (i+1) + '</font></b></td>';
				txtfila += '<td width="140px">';
				txtfila += '<a href="http://www.filmaffinity.com/es/userratings.php?user_id=' + nodos[i].textContent.split('-')[1] + '&orderby=' + order + '"';
				txtfila += 'target="_blank" style="text-decoration: none; color:inherit">';
                txtfila += '<b><font color="#B7B7B7">' + name + '</font></b></a></td>';
				txtfila += '<td align="right" width="35px"><b><font color="#B7B7B7">' + nodos[i].textContent.split('-')[2] + '</font></b></td>';
				txtfila += '<td align="right" width="35px"><b><font color="#B7B7B7">' + nodos[i].textContent.split('-')[3] + '</font></b></td>';}
	         else if(i ==2){              
				txtfila += '<td align="center"><b><font color="#B87333">' + (i+1) + '</font></b></td>';
	            txtfila += '<td width="140px">';
	            txtfila += '<a href="http://www.filmaffinity.com/es/userratings.php?user_id=' + nodos[i].textContent.split('-')[1] + '&orderby=' + order + '"';
	            txtfila += 'target="_blank" style="text-decoration: none; color:inherit">';             
	            txtfila += '<b><font color="#B87333">' + name + '</b></font></a></td>';
 	            txtfila += '<td align="right" width="35px"><b><font color="#B87333">' + nodos[i].textContent.split('-')[2] + '</font></b></td>';
	            txtfila += '<td align="right" width="35px"><b><font color="#B87333">' + nodos[i].textContent.split('-')[3] + '</font></b></td>';}
	         else {
	            if(idprop == nodos[i].textContent.split('-')[1]){
					txtfila += '<td align="center"><b><font color="blue">' + (i+1) + '</font></b></td>';
					txtfila += '<td width="140px">';
	                txtfila += '<a href="http://www.filmaffinity.com/es/userratings.php?user_id=' + nodos[i].textContent.split('-')[1] + '&orderby=' + order + '"';
	                txtfila += 'target="_blank" style="text-decoration: none; color:inherit"><b><font color="blue">';
                    txtfila += name + '</font></b></a></td>';
 	                txtfila += '<td align="right" width="35px"><b><font color="blue">' + nodos[i].textContent.split('-')[2] + '</font></b></td>';
	                txtfila += '<td align="right" width="35px"><b><font color="blue">' + nodos[i].textContent.split('-')[3] + '</font></b></td>';
	             }
	             else {
					txtfila += '<td align="center"><b>' + (i+1) + '</b></td>';
					txtfila += '<td width="140px">';
	                txtfila += '<a href="http://www.filmaffinity.com/es/userratings.php?user_id=' + nodos[i].textContent.split('-')[1] + '&orderby=' + order + '"';
	                txtfila += 'target="_blank" style="text-decoration: none; color:inherit">';
                    txtfila += name + '</a></td>';
 	                txtfila += '<td align="right" width="35px"><b>' + nodos[i].textContent.split('-')[2] + '</b></td>';
	                txtfila += '<td align="right" width="35px"><b>' + nodos[i].textContent.split('-')[3] + '</b></td>';
	              }
	         }
	         newtr.innerHTML = txtfila;
	         nodot.rows[0].parentNode.appendChild(newtr);
	      }
	     }
	});
	        
	}
 
	 function doChangeGen() {
            	        var index = this.options.selectedIndex;
                        var name = this.options[index].value;
	         injectFilesGeneral(name,'generos');
        }
	 function doChangeAnio() {
            	        var index = this.options.selectedIndex;
                        var name = this.options[index].value;
	         injectFilesGeneral(name,'anios');
        }
	 function doChangePais() {
            	        var index = this.options.selectedIndex;
                        var name = this.options[index].value;
	         this.setAttribute('style', 'padding-left: 19px; background: white url("http://www.filmaffinity.com/imgs/countries/' + this.options[this.selectedIndex].value + '.jpg") no-repeat scroll center left');
	         injectFilesGeneral(name,'paises');
                         // Eliminamos la tabla actual y creamos una nueva
                         /*$id("REGION_TABLE").parentNode.removeChild($id("REGION_TABLE"));
                         doAddRegionsStats(name, DIST_REGIONS, true);*/
        }
	var nodoadd = '//span[contains(text(),"Redes sociales")]/ancestor::*[position()=1]'.findNode();           
	var ndivclas = d.createElement('div');
	ndivclas.className = "title_profile";
	ndivclas.textContent = "Clasificaciones";
	var ntableclas = d.createElement('table');
	ntableclas.style.width = "100%";
	var txt = "";
	txt += '<tbody><tr>';
	txt += '<td style="vertical-align:top;" width="270px"><div class="profile_cont_votes" width="260px">';
	txt += '<div class="title_profile_votes">Por países</div>';
	txt += '<table id="CLAS_PAISES"><tbody>';
	
	txt += '<tr><td width="20px"><b>País:</b></td>';
	txt += '<td colspan="3"><select style="padding-left: 19px; background-image: url(http://www.filmaffinity.com/imgs/countries/ES.jpg) no-repeat scroll center left white;" id="PAIS_SELECT" name="PAIS_SELECT">';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/AF.jpg) no-repeat scroll center left white;" value="AF">Afganistán</option>';
    txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/DE.jpg) no-repeat scroll center left white;" value="DE">Alemania</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/FD.jpg) no-repeat scroll center left white;" value="FD">Alemania del Este (RDA)</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/FF.jpg) no-repeat scroll center left white;" value="FF">Alemania del Oeste (RFA)</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/AD.jpg) no-repeat scroll center left white;" value="AD">Andorra</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/AO.jpg) no-repeat scroll center left white;" value="AO">Angola</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/AG.jpg) no-repeat scroll center left white;" value="AG">Antigua y Barbuda</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/SA.jpg) no-repeat scroll center left white;" value="SA">Arabia Saud&iacute;</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/DZ.jpg) no-repeat scroll center left white;" value="DZ">Argelia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/AR.jpg) no-repeat scroll center left white;" value="AR">Argentina</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/AM.jpg) no-repeat scroll center left white;" value="AM">Armenia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/AU.jpg) no-repeat scroll center left white;" value="AU">Australia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/AT.jpg) no-repeat scroll center left white;" value="AT">Austria</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/AZ.jpg) no-repeat scroll center left white;" value="AZ">Azerbaijan</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BS.jpg) no-repeat scroll center left white;" value="BS">Bahamas</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BH.jpg) no-repeat scroll center left white;" value="BH">Bahrein</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BD.jpg) no-repeat scroll center left white;" value="BD">Bangladesh</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BB.jpg) no-repeat scroll center left white;" value="BB">Barbados</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BE.jpg) no-repeat scroll center left white;" value="BE">B&eacute;lgica</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BZ.jpg) no-repeat scroll center left white;" value="BZ">Belize</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BJ.jpg) no-repeat scroll center left white;" value="BJ">Ben&iacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BY.jpg) no-repeat scroll center left white;" value="BY">Bielorusia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BO.jpg) no-repeat scroll center left white;" value="BO">Bolivia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BA.jpg) no-repeat scroll center left white;" value="BA">Bosnia y Herzegovina</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BW.jpg) no-repeat scroll center left white;" value="BW">Botswana</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BR.jpg) no-repeat scroll center left white;" value="BR">Brasil</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BG.jpg) no-repeat scroll center left white;" value="BG">Bulgaria</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BF.jpg) no-repeat scroll center left white;" value="BF">Burkina Faso</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BI.jpg) no-repeat scroll center left white;" value="BI">Burundi</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/BT.jpg) no-repeat scroll center left white;" value="BT">But&aacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CV.jpg) no-repeat scroll center left white;" value="CV">Cabo Verde</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/KH.jpg) no-repeat scroll center left white;" value="KH">Camboya</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CM.jpg) no-repeat scroll center left white;" value="CM">Camer&uacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CA.jpg) no-repeat scroll center left white;" value="CA">Canad&aacute;</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/TD.jpg) no-repeat scroll center left white;" value="TD">Chad</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/ZX.jpg) no-repeat scroll center left white;" value="ZX">Checoslovaquia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CL.jpg) no-repeat scroll center left white;" value="CL">Chile</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CN.jpg) no-repeat scroll center left white;" value="CN">China</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CY.jpg) no-repeat scroll center left white;" value="CY">Chipre</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CO.jpg) no-repeat scroll center left white;" value="CO">Colombia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/KM.jpg) no-repeat scroll center left white;" value="KM">Comores</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CG.jpg) no-repeat scroll center left white;" value="CG">Congo</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/KP.jpg) no-repeat scroll center left white;" value="KP">Corea del Norte</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/KR.jpg) no-repeat scroll center left white;" value="KR">Corea del Sur</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CI.jpg) no-repeat scroll center left white;" value="CI">Costa de Marfil</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CR.jpg) no-repeat scroll center left white;" value="CR">Costa Rica</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/HR.jpg) no-repeat scroll center left white;" value="HR">Croacia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CU.jpg) no-repeat scroll center left white;" value="CU">Cuba</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/DK.jpg) no-repeat scroll center left white;" value="DK">Dinamarca</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/DM.jpg) no-repeat scroll center left white;" value="DM">Dominica</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/EC.jpg) no-repeat scroll center left white;" value="EC">Ecuador</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/EG.jpg) no-repeat scroll center left white;" value="EG">Egipto</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/SV.jpg) no-repeat scroll center left white;" value="SV">El Salvador</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/AE.jpg) no-repeat scroll center left white;" value="AE">Emiratos &Aacute;rabes</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/ER.jpg) no-repeat scroll center left white;" value="ER">Eritrea</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/SK.jpg) no-repeat scroll center left white;" value="SK">Eslovaquia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/SI.jpg) no-repeat scroll center left white;" value="SI">Eslovenia</option>';
	txt += '<option selected style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/ES.jpg) no-repeat scroll center left white;" value="ES">Espa&ntilde;a</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/US.jpg) no-repeat scroll center left white;" value="US">Estados Unidos</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/EE.jpg) no-repeat scroll center left white;" value="EE">Estonia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/ET.jpg) no-repeat scroll center left white;" value="ET">Etiop&iacute;a</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/FJ.jpg) no-repeat scroll center left white;" value="FJ">Fidji</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/PH.jpg) no-repeat scroll center left white;" value="PH">Filipinas</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/FI.jpg) no-repeat scroll center left white;" value="FI">Finlandia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/FR.jpg) no-repeat scroll center left white;" value="FR">Francia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/GA.jpg) no-repeat scroll center left white;" value="GA">Gab&oacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/GM.jpg) no-repeat scroll center left white;" value="GM">Gambia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/GE.jpg) no-repeat scroll center left white;" value="GE">Georgia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/GR.jpg) no-repeat scroll center left white;" value="GR">Grecia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/GL.jpg) no-repeat scroll center left white;" value="GL">Groenlandia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/GT.jpg) no-repeat scroll center left white;" value="GT">Guatemala</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/GN.jpg) no-repeat scroll center left white;" value="GN">Guinea</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/GW.jpg) no-repeat scroll center left white;" value="GW">Guinea Bissau</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/GQ.jpg) no-repeat scroll center left white;" value="GQ">Guinea Ecuatorial</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/GY.jpg) no-repeat scroll center left white;" value="GY">Guyana</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/HT.jpg) no-repeat scroll center left white;" value="HT">Hait&iacute;</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/NL.jpg) no-repeat scroll center left white;" value="NL">Holanda</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/HN.jpg) no-repeat scroll center left white;" value="HN">Honduras</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/HK.jpg) no-repeat scroll center left white;" value="HK">Hong Kong</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/HU.jpg) no-repeat scroll center left white;" value="HU">Hungr&iacute;a</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/IN.jpg) no-repeat scroll center left white;" value="IN">India</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/ID.jpg) no-repeat scroll center left white;" value="ID">Indonesia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/IQ.jpg) no-repeat scroll center left white;" value="IQ">Irak</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/IR.jpg) no-repeat scroll center left white;" value="IR">Ir&aacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/IE.jpg) no-repeat scroll center left white;" value="IE">Irlanda</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/IS.jpg) no-repeat scroll center left white;" value="IS">Islandia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/IL.jpg) no-repeat scroll center left white;" value="IL">Israel</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/IT.jpg) no-repeat scroll center left white;" value="IT">Italia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/JM.jpg) no-repeat scroll center left white;" value="JM">Jamaica</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/JP.jpg) no-repeat scroll center left white;" value="JP">Jap&oacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/JO.jpg) no-repeat scroll center left white;" value="JO">Jordania</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/KZ.jpg) no-repeat scroll center left white;" value="KZ">Kazajst&aacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/KE.jpg) no-repeat scroll center left white;" value="KE">Kenia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/KG.jpg) no-repeat scroll center left white;" value="KG">Kirguizst&aacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/KW.jpg) no-repeat scroll center left white;" value="KW">Kuwait</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/LA.jpg) no-repeat scroll center left white;" value="LA">Laos</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/LS.jpg) no-repeat scroll center left white;" value="LS">Lesotho</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/LE.jpg) no-repeat scroll center left white;" value="LE">Letonia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/LB.jpg) no-repeat scroll center left white;" value="LB">L&iacute;bano</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/LR.jpg) no-repeat scroll center left white;" value="LR">Liberia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/LY.jpg) no-repeat scroll center left white;" value="LY">Libia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/LI.jpg) no-repeat scroll center left white;" value="LI">Liechtenstein</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/LT.jpg) no-repeat scroll center left white;" value="LT">Lituania</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/LU.jpg) no-repeat scroll center left white;" value="LU">Luxemburgo</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MK.jpg) no-repeat scroll center left white;" value="MK">Macedonia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MG.jpg) no-repeat scroll center left white;" value="MG">Madagascar</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MY.jpg) no-repeat scroll center left white;" value="MY">Malasia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MW.jpg) no-repeat scroll center left white;" value="MW">Malawi</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MV.jpg) no-repeat scroll center left white;" value="MV">Maldivas</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/ML.jpg) no-repeat scroll center left white;" value="ML">Mali</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MT.jpg) no-repeat scroll center left white;" value="MT">Malta</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MA.jpg) no-repeat scroll center left white;" value="MA">Marruecos</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MH.jpg) no-repeat scroll center left white;" value="MH">Marshall (Islas)</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MU.jpg) no-repeat scroll center left white;" value="MU">Mauricio (Isla)</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MR.jpg) no-repeat scroll center left white;" value="MR">Mauritania</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MX.jpg) no-repeat scroll center left white;" value="MX">M&eacute;xico</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/FM.jpg) no-repeat scroll center left white;" value="FM">Micronesia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MD.jpg) no-repeat scroll center left white;" value="MD">Moldavia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MC.jpg) no-repeat scroll center left white;" value="MC">M&oacute;naco</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MN.jpg) no-repeat scroll center left white;" value="MN">Mongolia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/ME.jpg) no-repeat scroll center left white;" value="ME">Montenegro</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MZ.jpg) no-repeat scroll center left white;" value="MZ">Mozambique</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/MM.jpg) no-repeat scroll center left white;" value="MM">Myamnmar - Birmania</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/NA.jpg) no-repeat scroll center left white;" value="NA">Namibia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/NP.jpg) no-repeat scroll center left white;" value="NP">Nepal</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/NI.jpg) no-repeat scroll center left white;" value="NI">Nicaragua</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/NE.jpg) no-repeat scroll center left white;" value="NE">N&iacute;ger</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/NG.jpg) no-repeat scroll center left white;" value="NG">Nigeria</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/NO.jpg) no-repeat scroll center left white;" value="NO">Noruega</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/NZ.jpg) no-repeat scroll center left white;" value="NZ">Nueva Zelanda</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/OM.jpg) no-repeat scroll center left white;" value="OM">Om&aacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/PA.jpg) no-repeat scroll center left white;" value="PA">Panam&aacute;</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/PG.jpg) no-repeat scroll center left white;" value="PG">Papuasia Nueva Guinea</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/PK.jpg) no-repeat scroll center left white;" value="PK">Paquist&aacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/PY.jpg) no-repeat scroll center left white;" value="PY">Paraguay</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/PE.jpg) no-repeat scroll center left white;" value="PE">Per&uacute;</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/PL.jpg) no-repeat scroll center left white;" value="PL">Polonia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/PT.jpg) no-repeat scroll center left white;" value="PT">Portugal</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/PR.jpg) no-repeat scroll center left white;" value="PR">Puerto Rico</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/QA.jpg) no-repeat scroll center left white;" value="QA">Qatar</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/GB.jpg) no-repeat scroll center left white;" value="GB">Reino Unido</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CF.jpg) no-repeat scroll center left white;" value="CF">Rep. Centroafricana</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/DO.jpg) no-repeat scroll center left white;" value="DO">Rep. Dominicana</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CZ.jpg) no-repeat scroll center left white;" value="CZ">Rep&uacute;blica Checa</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CD.jpg) no-repeat scroll center left white;" value="CD">Rep&uacute;blica del Congo</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/RW.jpg) no-repeat scroll center left white;" value="RW">Ruanda</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/RO.jpg) no-repeat scroll center left white;" value="RO">Ruman&iacute;a</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/RU.jpg) no-repeat scroll center left white;" value="RU">Rusia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/WS.jpg) no-repeat scroll center left white;" value="WS">Samoa</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/SN.jpg) no-repeat scroll center left white;" value="SN">Senegal</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/RS.jpg) no-repeat scroll center left white;" value="RS">Serbia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/RR.jpg) no-repeat scroll center left white;" value="RR">Serbia y Montenegro</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/SL.jpg) no-repeat scroll center left white;" value="SL">Sierra Leona</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/SG.jpg) no-repeat scroll center left white;" value="SG">Singapur</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/SY.jpg) no-repeat scroll center left white;" value="SY">Siria</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/LK.jpg) no-repeat scroll center left white;" value="LK">Sri Lanka</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/SD.jpg) no-repeat scroll center left white;" value="SD">Sud&aacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/SE.jpg) no-repeat scroll center left white;" value="SE">Suecia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/CH.jpg) no-repeat scroll center left white;" value="CH">Suiza</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/ZA.jpg) no-repeat scroll center left white;" value="ZA">Sur&aacute;frica</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/SR.jpg) no-repeat scroll center left white;" value="SR">Surinam</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/SZ.jpg) no-repeat scroll center left white;" value="SZ">Swazilandia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/TH.jpg) no-repeat scroll center left white;" value="TH">Tailandia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/TW.jpg) no-repeat scroll center left white;" value="TW">Taiw&aacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/TJ.jpg) no-repeat scroll center left white;" value="TJ">Tajikistan</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/TZ.jpg) no-repeat scroll center left white;" value="TZ">Tanzania</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/PS.jpg) no-repeat scroll center left white;" value="PS">Territorios Palestinos</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/TG.jpg) no-repeat scroll center left white;" value="TG">Togo</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/TT.jpg) no-repeat scroll center left white;" value="TT">Trinidad y Tobago</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/TN.jpg) no-repeat scroll center left white;" value="TN">T&uacute;nez</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/TM.jpg) no-repeat scroll center left white;" value="TM">Turkmenist&aacute;n</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/TR.jpg) no-repeat scroll center left white;" value="TR">Turqu&iacute;a</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/UA.jpg) no-repeat scroll center left white;" value="UA">Ucrania</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/UG.jpg) no-repeat scroll center left white;" value="UG">Uganda</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/ZY.jpg) no-repeat scroll center left white;" value="ZY">Uni&oacute;n Sovi&eacute;tica (URSS)</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/UY.jpg) no-repeat scroll center left white;" value="UY">Uruguay</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/UZ.jpg) no-repeat scroll center left white;" value="UZ">Uzbekistan</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/VE.jpg) no-repeat scroll center left white;" value="VE">Venezuela</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/VN.jpg) no-repeat scroll center left white;" value="VN">Vietnam</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/YE.jpg) no-repeat scroll center left white;" value="YE">Yemen</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/YU.jpg) no-repeat scroll center left white;" value="YU">Yugoslavia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/ZM.jpg) no-repeat scroll center left white;" value="ZM">Zambia</option>';
	txt += '<option style="padding-left: 19px; background: url(http://www.filmaffinity.com/imgs/countries/ZW.jpg) no-repeat scroll center left white;" value="ZW">Zimbabwe</option>';
	
	txt += '</select></td></tr></table></div></td>';
	
	//<--------------------- Clasif. por GENEROS --------------------------------->
	txt += '<td style="vertical-align:top;" width="270px"><div class="profile_cont_votes" width="260px">';
	
	txt += '<div class="title_profile_votes">Por géneros</div>';
	txt += '<table id="CLAS_GENEROS"><tbody>';
	
	txt += '<tr><td><b>Género:</b></td>';	
	txt += '<td colspan="2"><select id="GEN_SELECT" name="GEN_SELECT">';
	txt += '<option value="AC">Acción</option>';
	txt += '<option value="AN">Animación</option>';
	txt += '<option value="AV">Aventuras</option>';
	txt += '<option value="BE">Bélico</option>';
	txt += '<option value="CF">Ciencia ficción</option>';
	txt += '<option value="CN">Cine negro</option>';
	txt += '<option value="CO">Comedia</option>';
	txt += '<option value="DO">Documental</option>';
	txt += '<option value="DR">Drama</option>';
	txt += '<option value="FN">Fantástico</option>';
	txt += '<option value="IF">Infantil</option>';
	txt += '<option value="IT">Intriga</option>';
	txt += '<option value="MU">Musical</option>';
	txt += '<option value="RO">Romance</option>';	
	txt += '<option value="TV">Serie de TV</option>';	
	txt += '<option value="TE">Terror</option>';	
	txt += '<option value="TH">Thriller</option>';	
	txt += '<option value="WE">Western</option>';	
	txt += '</select></td></tr></table></div></td>';
	//<--------------------- Clasif. por AÑOS --------------------------------->
	txt += '<td style="vertical-align:top;" width="270px"><div class="profile_cont_votes" width="260px">';
	
	txt += '<div class="title_profile_votes">Por años</div>';
	txt += '<table id="CLAS_ANIOS"><tbody>';
	
	txt += '<tr><td><b>Años:</b></td>';	
	txt += '<td colspan="2"><select style="text-align: center;" id="ANIO_SELECT" name="ANIO_SELECT">';
	/*txt += '<option style="text-align: center;" value="AA1">18XX - 1899</option>';
	txt += '<option style="text-align: center;" value="AA2">1900 - 1909</option>';
	txt += '<option style="text-align: center;" value="AA3">1910 - 1919</option>';
	txt += '<option style="text-align: center;" value="AA4">1920 - 1929</option>';
	*/txt += '<option style="text-align: center;" value="A1">18XX - 1929</option>';
	txt += '<option style="text-align: center;" value="A2">1930 - 1939</option>';
	txt += '<option style="text-align: center;" value="A3">1940 - 1949</option>';
	txt += '<option style="text-align: center;" value="A4">1950 - 1959</option>';
	txt += '<option style="text-align: center;" value="A5">1960 - 1969</option>';
	txt += '<option style="text-align: center;" value="A6">1970 - 1979</option>';
	txt += '<option style="text-align: center;" value="A7">1980 - 1989</option>';
	txt += '<option style="text-align: center;" value="A8">1990 - 1999</option>';
	txt += '<option style="text-align: center;" value="2A">2000</option>';
	txt += '<option style="text-align: center;" value="2B">2001</option>';
	txt += '<option style="text-align: center;" value="2C">2002</option>';
	txt += '<option style="text-align: center;" value="2D">2003</option>';
	txt += '<option style="text-align: center;" value="2E">2004</option>';
	txt += '<option style="text-align: center;" value="2F">2005</option>';
	txt += '<option style="text-align: center;" value="2G">2006</option>';
	txt += '<option style="text-align: center;" value="2H">2007</option>';
	txt += '<option style="text-align: center;" value="2I">2008</option>';
	txt += '<option style="text-align: center;" value="2J">2009</option>';
	txt += '<option style="text-align: center;" value="2K">2010</option>';
	txt += '<option style="text-align: center;" value="2L">2011</option>';
	txt += '<option style="text-align: center;" value="2M">2012</option>';
    txt += '<option selected style="text-align: center;" value="2N">2013</option>';
	txt += '</select></td></tr></table></div></td></tr>';
	
	ntableclas.innerHTML = txt;
	nodoadd.parentNode.appendChild(ndivclas);
	nodoadd.parentNode.appendChild(ntableclas);
	injectFilesGeneral('ES','paises');
                $id("PAIS_SELECT").addEventListener("change", doChangePais, false);
	injectFilesGeneral('AC','generos');
                $id("GEN_SELECT").addEventListener("change", doChangeGen, false);
	injectFilesGeneral('2N','anios');
                $id("ANIO_SELECT").addEventListener("change", doChangeAnio, false);
            }
        doClasPais();
   }
    /*
     doAddFavList
     Añade las listas favoritas a la página de Mis listas
     Creado: 18/5/2009 - David Buxó
     Mod: 19/5/2009 - David Buxó - Añadido elminar listas
     Comentarios: Por ahora tenemos que tener alguna lista nuestra para que funcione correctamente.
     */
    function doAddFavLists() {
        function removeListFromFavorites() {
            if (confirm("¿Desea eliminar esta lista de sus Listas Favoritas?")) {
                var favListsStr = GM_getValue(getUserId() + '.favlists');
                var favoritas = eval(favListsStr);
                var user_id = this.id.split(':')[0];                
                var list_id = this.id.split(':')[1];
                
                var ix = inArray2(favoritas, 'list_id', list_id, 'user_id', user_id);
                
                if (ix) {
                    favoritas.splice(ix, 1);
                    GM_setValue(getUserId() + '.favlists', favoritas.toSource());                    
                    var row = this.parentNode.parentNode;
                    row.parentNode.removeChild(row);
                }
            }
        }
        function removeListIMDBFromFavorites() {
            if (confirm("¿Desea eliminar esta lista de sus Listas Favoritas?")) {
                
                var favListsStr = GM_getValue(getUserId() + '.favlistsim');
                var favoritas = eval(favListsStr);
                var titulol = this.id.split(':')[0];
                var useraut = this.id.split(':')[1];
                
                var ix = inArray2(favoritas, 'titulo', titulol, 'user', useraut);
                if (ix) {
                    favoritas.splice(ix, 1);
                    GM_setValue(getUserId() + '.favlistsim', favoritas.toSource());
                    var row = this.parentNode.parentNode;
                    row.parentNode.removeChild(row);
                }
            }
        }
        
        GM_addStyle('.addToFavorites {margin-left:5px;cursor:pointer;width:12px;height:12px;}');
        var MyListsTable = '//table[@class="llstd"]'.findNode();	
        var favListsStr = GM_getValue(getUserId() + '.favlists'); 
        
        if (typeof favListsStr != 'undefined' && MyListsTable.rows.length > 1) {
            var tpl = "<a class='llnk' href='/es/userlist.php?user_id={user_id}&list_id={list_id}'>{list_name}</a>";
                       
            //Divs contenedores: títulos + tablas
			var divfav = d.createElement('div');
            divfav.id = "mt-content-cell";
			divfav.innerHTML = '<h1 id="main-title">Mis Listas Favoritas</h1>';
            
            var divimdb = d.createElement('div');
            divimdb.id = "mt-content-cell";
			divimdb.innerHTML = '<h1 id="main-title">Mis Listas Favoritas (IMDB)</h1>';    
            
            var tabfav = d.createElement('table');
            tabfav.className = "llstd";            
            /*tabfav.width = "100%";
            tabfav.border = "0";
            tabfav.cellPadding = "0";
            tabfav.cellSpacing = "0";
            */
            var tabimdb = d.createElement('table');
            tabimdb.className = "llstd";
            tabimdb.width = "100%";
            tabimdb.border = "0";
            tabimdb.cellPadding = "0";
            tabimdb.cellSpacing = "0";                      
	
            //Cabeceras
            var txtt = "";
            txtt += '<tr bgcolor="#006633"><td><span style="font-size:10px; font-weight: bold; color:#ffffff">Nombre</span></td>';
        	txtt += '<td align="center"><span style="font-size:10px; font-weight: bold; color:#ffffff">Usuario</span></td>';
        	txtt += '<td>&nbsp;</td></tr></tbody>';
            tabfav.innerHTML = txtt;
            
            var txtti = "";
            txtti += '<tr bgcolor="#DDDB3F"><td><span style="font-size:10px; font-weight: bold; color:#000000">Nombre</span></td>';
        	txtti += '<td align="center"><span style="font-size:10px; font-weight: bold; color:#000000">Usuario</span></td>';
        	txtti += '<td>&nbsp;</td></tr>';
            tabimdb.innerHTML = txtti;

            var favlists = eval(favListsStr);
            favlists.sort(function(a, b) {                			
                           return b.list_name.toLowerCase() > a.list_name.toLowerCase();
                		   
                         });
            
            for (var ix in favlists) {
               
                var list = favlists[ix];
                var content = tpl.replaceObject(list);
                
                var tri = d.createElement('tr');
                tri.className = "list-item";
                tri.style.backgroundColor = "#ffffff";
                
 				 tri.addEventListener("mouseover", function() {
      				this.style.backgroundColor = "#f0f0f0";
   					 }, false);  
                 tri.addEventListener("mouseout", function() {
      				this.style.backgroundColor = "#ffffff";
    				}, false);
                
                var tdi1 = d.createElement('td');
                tdi1.style.padding = "3px 1px"; 
                tdi1.style.color = "#444444";
                tdi1.style.fontSize = "14px";
                tdi1.style.borderTop = "1px solid #e2e2e2";
                var tdi2 = d.createElement('td');
                tdi2.style.padding = "3px 1px"; 
                tdi2.style.color = "#444444";
                tdi2.style.fontSize = "14px";
                tdi2.style.borderTop = "1px solid #e2e2e2";
                tdi2.width = "90px";
                tdi2.align = "center";
                var tdi3 = d.createElement('td');
                tdi3.style.padding = "3px 1px"; 
                tdi3.style.color = "#444444";
                tdi3.style.fontSize = "14px";
                tdi3.style.borderTop = "1px solid #e2e2e2";
                tdi3.width = "20px";
                tdi1.innerHTML = content;                
                tdi2.innerHTML = "<b>" + list.user_name.replace(" ", "&nbsp;") + "</b>";// "<b>" + list.films + "</b>"; 
                
                var button = d.createElement('IMG');
                button.className = 'addToFavorites';
                button.src = img_minus;
                button.alt = "Eliminar lista de Favoritas";
                button.id = list.titulo + ":" + list.user;
                button.addEventListener("click", removeListFromFavorites, false);
                tdi3.appendChild(button);
				tri.appendChild(tdi1);                                 
                tri.appendChild(tdi2);
                tri.appendChild(tdi3);
                tabfav.appendChild(tri);                
                
            }            	
            
            // Insertamos las listas (Favoritas -> IMDB)            
            var favListsStr2 = GM_getValue(getUserId() + '.favlistsim');            
        	if (typeof favListsStr2 != 'undefined') {                
                var tpl2 = "<a href='{direccion}/?view=compact' class='llnk' target='_blank'>{titulo} ({nelements} elem.)</a>";
            }        
            
            var favlists2 = eval(favListsStr2);
            favlists2.sort(function(a, b) {
                var titA = a.titulo.toLowerCase();
                var titB = b.titulo.toLowerCase();
                           //return b.titulo.toLowerCase() > a.titulo.toLowerCase();
                	if (titA < titB) //sort string ascending
  						return -1 
 					if (titA > titB)
  						return 1
 					return 0 //default return value (no sorting)
					});                      
                        
            for (var ix2 in favlists2) {				
              
                var list2 = favlists2[ix2];
                var content2 = tpl2.replaceObject(list2);
                var tri = d.createElement('tr');
                tri.className = "list-item";
                tri.style.backgroundColor = "#ffffff";
                
 				 tri.addEventListener("mouseover", function() {
      				this.style.backgroundColor = "#f0f0f0";
   					 }, false);  
                 tri.addEventListener("mouseout", function() {
      				this.style.backgroundColor = "#ffffff";
    				}, false);
                
                var tdi1 = d.createElement('td');
                tdi1.style.padding = "3px 1px"; 
                tdi1.style.color = "#444444";
                tdi1.style.fontSize = "14px";
                tdi1.style.borderTop = "1px solid #e2e2e2";
                var tdi2 = d.createElement('td');
                tdi2.style.padding = "3px 1px"; 
                tdi2.style.color = "#444444";
                tdi2.style.fontSize = "14px";
                tdi2.style.borderTop = "1px solid #e2e2e2";
                tdi2.width = "90px";
                tdi2.align = "center";
                var tdi3 = d.createElement('td');
                tdi3.style.padding = "3px 1px"; 
                tdi3.style.color = "#444444";
                tdi3.style.fontSize = "14px";
                tdi3.style.borderTop = "1px solid #e2e2e2";
                tdi3.width = "20px";
                tdi1.innerHTML = content2;
                tdi2.innerHTML = "<b>" + list2.user.replace(" ", "&nbsp;") + "</b>";// "<b>" + list2.films + "</b>";                
                var button2 = d.createElement('IMG');
                button2.className = 'addToFavorites';
                button2.src = img_minus;
                button2.alt = "Eliminar lista de Favoritas";
                button2.id = list2.titulo + ":" + list2.user;
                button2.addEventListener("click", removeListIMDBFromFavorites, false);
                tdi3.appendChild(button2);
				tri.appendChild(tdi1);                                 
                tri.appendChild(tdi2);
                tri.appendChild(tdi3);
                tabimdb.appendChild(tri);                
            }
            
            var nodop = '//div[@id="mt-content-cell"]'.findNode();
            MyListsTable.parentNode.removeChild(MyListsTable.parentNode.lastChild);
            divfav.appendChild(tabfav);
            divimdb.appendChild(tabimdb);            
            nodop.parentNode.insertBefore(divfav, nodop.nextSibling);
            nodop.parentNode.insertBefore(divimdb, nodop.nextSibling.nextSibling);            
            
        }
        
    }    

    /*
     doAddToFavList
     Añade el icono para añadir las listas a las Listas Favoritas
     Creado: 19/5/2009 - David Buxó
     */
    function doAddToFavLists() {
        var favoritas;
        function addListToFavorites() {
            var anchor = ("//img[@id='" + this.id + "']").findNode().previousSibling;
            var name = "//h1[@id='main-title']".findNode();            
            var list = { user_id:url.split('=')[1].split('#')[0],
                list_id:anchor.href.split('=')[2],
                list_name:anchor.textContent,
                user_name:name.textContent.split(': ')[1]};           
            if (confirm("¿Desea añadir esta lista a sus Listas Favoritas?")) {
                favoritas.push(list);
                GM_setValue(getUserId() + '.favlists', favoritas.toSource());
                this.parentNode.removeChild(this);
            }
        }
        function injectCode() {
            
            GM_addStyle('.addToFavorites {margin-left:5px;cursor:pointer;width:12px;height:12px;}');
            var user_id = url.split('=')[1].split('#')[0];
            var links = "//a[@class='llnk']".findNodesArray();
            var favListsStr = GM_getValue(getUserId() + '.favlists');
            if (typeof favListsStr != 'undefined') {
                favoritas = eval(favListsStr);
            } else {
                favoritas = [];
            }
            ;
            for (var ix in links) {
                var anchor = links[ix];
                var list_id = anchor.href.split('=')[2];
                if (!inArray2(favoritas, 'user_id', user_id, 'list_id', list_id)) {
                    var button = d.createElement('IMG');
                    button.className = 'addToFavorites';
                    button.src = img_plus;
                    button.alt = "Añadir lista a Favoritas";
                    button.id = anchor.href.split('=')[2];
                    button.addEventListener("click", addListToFavorites, false);
                    anchor.parentNode.insertBefore(button, anchor.nextSibling);
                }
            }
        }
        injectCode();
    }
    /*
     doAddToFavListsIMDB
     Añade el icono para añadir las listas a las Listas Favoritas (en IMDB)
     Creado: 28/12/12 - Benjani
     */
    function doAddToFavListsIMDB() {
        
        var favoritas;
        
        function addListToFavorites() {
            
            var titulol = "//h1[@class='header']".findNode();
            var user_aut = "//h3[contains(text(),'Other Lists By')]".findNode();
            user_aut = user_aut.textContent.split(' ')[3]; 
            var elementos = "//div[@class='desc']".findNode();            
            var nelementos = elementos.getAttribute("data-size",0);
            var basedir = "http://www.imdb.com/list/";
            var dir = url.split('/')[4];            
            var finaldir = basedir + dir;              
            var list = { titulo:titulol.textContent,
                user:user_aut,
                nelements:nelementos,
                direccion:finaldir};
            if (confirm("¿Desea añadir esta lista a sus Listas Favoritas (IMDB)?")) {
                favoritas.push(list);
                GM_setValue(getUserId() + '.favlistsim', favoritas.toSource());
                this.parentNode.removeChild(this);
            }
        }
        function extractUserData() {
	
        	var titulol = "//h1[@class='header']".findNode();
            var user_aut = "//h3[contains(text(),'Other Lists By')]".findNode();
            user_aut = user_aut.textContent.split(' ')[3]; 
            var elementos = "//div[@class='desc']".findNode();     
            var basedir = "http://www.imdb.com/list/";
            var dir = url.split('/')[4];            
            var finaldir = basedir + dir;            
            var nelementos = elementos.getAttribute("data-size",0);
        return {titulo:titulol.textContent,
                user:user_aut,
                nelements:nelementos,
                direccion:finaldir};
    }
        
        function injectCode() {
            GM_addStyle('.addToFavorites {margin-left:5px;cursor:pointer;width:12px;height:12px;}');            
            var titulo = "//h1[@class='header']".findNode();
            var user_aut = "//h3[contains(text(),'Other Lists By')]".findNode();            
            user_aut = user_aut.textContent.split(' ')[3];          
            
            var favListsStrIM = GM_getValue(getUserId() + '.favlistsim');
            
            if (typeof favListsStrIM != 'undefined') {
                favoritas = eval(favListsStrIM);
            } else {
                favoritas = [];
            }
            ;            
                 
                if (!inArray2(favoritas, 'titulo', titulo.textContent, 'user', user_aut)) {
                    var button = d.createElement('IMG');
                    button.className = 'addToFavorites';
                    button.src = img_plus;
                    button.alt = "Añadir lista a Favoritas";
                    button.id = user_aut;                    
                    button.addEventListener("click", addListToFavorites, false);
                    titulo.parentNode.insertBefore(button, titulo.nextSibling);
                }
            	else{            		
                    var listas_im = extractUserData();                    
                    favoritas = arrayReplace(favoritas,'titulo',listas_im);                     
                    GM_setValue(getUserId() + '.favlistsim', favoritas.toSource());                    
                }
            
        }
        injectCode();
        
    }
    /*
     doSortMyLists
     Ordena las listas del usuario y guarda este orden
     Creado: 20/5/2009 - David Buxó
     */
    function doSortMyLists() {
        var order = [];
        function doSort() {
            var ix;	
            order.length = 0;
            var orderStr = GM_getValue(userId + '.myListOrder');
            if (typeof orderStr != 'undefined') {
                var newOrder = eval(orderStr);
                var table = "//table[@class='llstd']".findNode();	              
                // Tenemos un nuevo 'orden'
                var pos = 0;
                for (ix in newOrder) {
                    var list_id = newOrder[ix]; // La lista list_id va en la posición IX+1
                    // Localizamos la lista en la tabla	
                    var row = ("//a[@class='llnk' and @href='/es/mylist.php?list_id=" + list_id + "']/../..").findNode();	   
                    // Si ya esta en la posición correcta no hacemos nada
                    if (row != null) {
                        order.push(list_id);
                        var last = table.rows.length;
                        var newRow = row.cloneNode(true);
                        row.parentNode.insertBefore(newRow, table.rows[pos].nextSibling);
                        row.parentNode.removeChild(row);
                        pos++;
                    }
                }
                // Metemos en el array Order las listas que faltan (nuevas)
                for (var n=pos+1;n<table.rows.length;n++) {
                    var cell = table.rows[n].cells[0];
                    var link = "a[@class='llnk']".findNode(cell);
                    list_id = link.href.split('list_id=')[1];
                    order.push(list_id);
                }
            } else {
                var links = getElementsByClassName(d, "a", "llnk");
                for (ix = 0; ix < links.length; ix++) {
                    order.push(links[ix].href.split('=')[1]);
                }
            }
            log('Orden: '+order.toSource());
        }
        function addListeners(row) {
            var botonera = "span[@class='botonera']".findNode(row.cells[0]);
//            var imgUp10 = botonera.childNodes[0];
            var imgUp = botonera.childNodes[0];
            var imgDown = botonera.childNodes[1];
/*            if (imgUp10.className == 'upimg10') {
            botonera.childNodes[0].addEventListener("click", function () {doListUp(this);}, false);}	*/
            if (imgUp.className == 'upimg') {
            botonera.childNodes[0].addEventListener("click", function () {doListUp(this);}, false);}
            if (imgDown.className == 'downimg') {
            botonera.childNodes[1].addEventListener("click", function () {doListDown(this);}, false); }
        }
        function restoreRow(r) {
            var table = r.parentNode.parentNode;
            var link = "a[@class='llnk']".findNode(r.cells[0]);
            removeBotonera(r);
            injectBotonera(r.rowIndex - 1, table.rows.length - 1, link);
            addListeners(r);
        }
        // Intercambia las filas ix y ox en la tabla
        function intercambio(row, prevRow, ix, ox) {
            var cloned = row.cloneNode(true);
            row.parentNode.insertBefore(cloned, prevRow);
            row.parentNode.removeChild(row);
            restoreRow(cloned);
            log(order.toSource());
            var tmp = order[ix];
            order[ix] = order[ox];
            order[ox] = tmp;
            GM_setValue(userId + '.myListOrder',order.toSource());
            log(order.toSource());
        }
        // Asumimos que no puede ser llamado por la primera lista
        function doListUp(e) {
            var row = e.parentNode.parentNode.parentNode; // Columna en la tabla
            var table = row.parentNode.parentNode;
            var clone = row.cloneNode(true);
            var index = row.rowIndex;
            row.parentNode.insertBefore(clone,table.rows[index-1]);
            row.parentNode.removeChild(row);
            index--; // Puesto que el array esta basado en 0.
            var tmp = order[index];
            order[index] = order[index-1];
            order[index-1] = tmp;
            log(order.toSource());
            GM_setValue(userId + '.myListOrder',order.toSource());
            restoreRow(clone);
            restoreRow(clone.nextSibling);
        }
        // Asumimos que no puede ser llamado por la ultima lista
        function doListDown(e) {
            var row = e.parentNode.parentNode.parentNode; // Columna en la tabla
            var table = row.parentNode.parentNode;
            var clone = row.cloneNode(true);
            var index = row.rowIndex;
            row.parentNode.insertBefore(clone,table.rows[index+1].nextSibling);
            row.parentNode.removeChild(row);
            index--; // Puesto que el array esta basado en 0.
            var tmp = order[index];
            order[index] = order[index+1];
            order[index+1] = tmp;
            log(order.toSource());
            GM_setValue(userId + '.myListOrder',order.toSource());
            restoreRow(clone);
            restoreRow(clone.previousSibling);
        }
        function removeBotonera(row) {
            var botonera = "span[@class='botonera']".findNode(row.cells[0]);
            if (botonera != null) {
                botonera.parentNode.removeChild(botonera);
            }
        }      
        function injectBotonera(ix, total, link) {
            //var arriba10 = "<img id='{ID}' title='Subir pelicula 10 posiciones en lista' class='upimg10' src='" + upimg10 + "'><span class='up10space'></span>";
            //var arribah10 = "<span class='upspace'></span>";            
            var arriba = "<img id='{ID}' title='Subir pelicula en lista' class='upimg' src='" + upimg + "'>";
            var arribah = "<span class='upspace'></span>";
            var abajo = "<img id='{ID}' title='Bajar pelicula en lista' class='downimg' src='" + downimg + "'>";
            var abajoh = "<span class='downspace'></span>";
            var list_id = link.href.split('=')[1];
            //var esdiezp = ix < 10;	
            var esPrimero = ix == 0;
            var esUltimo = ix == total - 1;
            //var html = ((!esdiezp) ? arriba10 : arribah10) + ((!esPrimero) ? arriba : arribah) + ((!esUltimo) ? abajo : abajoh);
            var html = ((!esPrimero) ? arriba : arribah) + ((!esUltimo) ? abajo : abajoh);
            html = "<span class='botonera'>" + html.replace(/{ID}/g, list_id) + "</span>";
            link.parentNode.innerHTML = html + link.parentNode.innerHTML;
        }
        function injectSortButtons() {
            //GM_addStyle('.upimg10 {cursor:pointer;}');
            GM_addStyle('.upimg {cursor:pointer;}');
            //GM_addStyle('.up10space {padding-left:1px;}');
            GM_addStyle('.upspace {padding-left:9px;}');
            GM_addStyle('.downspace {padding-left:9px;margin-right:5px;}');
            GM_addStyle('.downimg {margin-right:5px;cursor:pointer;}');
            var links = getElementsByClassName(d, "a", "llnk");
            for (var ix = 0; ix < links.length; ix++) {
                // miramos si ya tiene botonera, si es asi la eliminamos
                var link = links[ix];
                injectBotonera(ix, links.length, link);
            };
            /*var imagenes = getElementsByClassName(d, 'img', 'upimg10');
            for (ix in imagenes) {
                imagenes[ix].addEventListener("click", function () {
                      doListUp(this);	  
                }, false);
            };*/
            var imagenes = getElementsByClassName(d, 'img', 'upimg');
            for (ix in imagenes) {
                imagenes[ix].addEventListener("click", function () {
                    doListUp(this);
                }, false);
            };
            imagenes = getElementsByClassName(d, 'img', 'downimg');
            for (ix in imagenes) {
                imagenes[ix].addEventListener("click", function () {
                    doListDown(this);
                }, false);
            }
        }
        doSort();
        injectSortButtons();
        // Ordenar las listas
        // Injectar los botones de subir y bajar
    }
    // Inicio codigo principal
    var browser = getBrowserCode();
    var date = new Date();
    log('Iniciando ' + appName + ' ' + appVersion + ' (' + date + ') ');
    log(navigator.appName + ' ' + navigator.appVersion);
    log('Logeado: ' + logged);
    log('Administrador: ' + isAdmin);
    if (url.search(/\/filter\.php/ig) > -1) return;
    // Parcheador
    // TODO: Comprobar browser y compatibilidad
    for (var patchName in patches) {
        var patch = patches[patchName];
        if (patch.browser.indexOf(browser) > -1) {
            var enabled = (typeof patch.sections == "undefined") || inSections(patch.sections);
			            
            if (typeof patch.preference != "undefined") {
                enabled = enabled && getPreference(patch.preference, patch.def);
	
            }
            if (typeof patch.logged != "undefined") {
				enabled = enabled && (logged || !patch.logged);	
            }
            if (enabled) {
                log("parche activado: " + patchName);
	
                var resultado = patch.method();
                // Si el parche devuelve false, finalizamos la ejecución
                if (typeof resultado != "undefined" && !resultado) {
                    return;
                }
            }
        }
        
    }
    log("Fin (" + date + ")");
}
;