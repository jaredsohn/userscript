/*
 FilmAffinity++
 Version 2.0.40
 7 de Mayo de 2009
 Basado en FilmAffinityPlus por Javier Arias http://javierarias.wordpress.com/scripts/filmaffinityplus/
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 Website: http://www.buxo.org/filmaffinity/

 @todo:
 - Aplicar limites a todas las paginas de listados, comprobar limite real de FA
 - Nota media en listas
 - Nota media en busquedas por director
 - Cambios en la lista de TOP
 - Unificar los menus

 @no todo (cosas que solo podrian hacer en el servidor)
 - Afinidad de amigos
 - Grafico de usuarios

 Changelog
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
// @version 2.0.40
// ==/UserScript==

//window.addEventListener("load", function () {
doFAPP();
//}, false);

function doFAPP() {
    var d = document;
    var appName = "FilmAffinity++";
    var appVersion = '2.0.40';
    var homepage = 'http://www.buxo.org/filmaffinity/';
    var url = d.location.href;

    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };

    String.prototype.clearTitle = function()
    {
        return (this.indexOf('(') > 1) ? this.substr(0, this.indexOf('(')).trim() : this.trim();
    };

    String.prototype.reverse = function() {
        return this.split("").reverse().join("");
    };

    String.prototype.findNode = function(context)
    {
        if (typeof context == "undefined") context = d;
        return document.evaluate(this, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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

    var logged = isLogged();
    var userId = (logged) ? getUserId() : '';
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
    var NUM_SM = 20 + 1;
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

    var img_plus = "http://www.buxo.org/content/fapp/icons/plus.gif";
    var img_minus = "http://www.buxo.org/content/fapp/icons/minus.gif";
    var closeimg = "http://www.buxo.org/content/fapp/icons/close.png";
    var upimg = "http://www.buxo.org/content/fapp/icons/up.png";
    var downimg = "http://www.buxo.org/content/fapp/icons/down.png";
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
        0: {name:'SECCIONES EXTERNAS',anchor:'SECCIONES',position:ANCHOR_AFTER,cond:'SHOWSEMENU',
            options: {0:{title: 'El Foro que surgi&oacute; de FilmAffinity',
                href:'http://filmaffinity.mforos.com',
                target:'_blank'},
                1:{title: 'Chat NO OFICIAL en iRC-Hispano',
                    href:'http://www.irc-hispano.es/webchat/flash.php?canal=filmaffinity',
                    target:'_blank'},
                2:{title: 'El grupo de last.fm que surgi&oacute; del foro que surgi&oacute; de FilmAffinity',
                    href:'http://www.lastfm.es/group/El+grupo+que+surgi%C3%B3+del+foro+que+surgi%C3%B3+de+Filmaffinity',
                    target:'_blank'}
            }
        },
        1: {name:'FilmAffinity++',anchor:'USUARIOS',position:ANCHOR_BEFORE,cond:'SHOWSCRIPTMENU',
            options: {0: {title:'Panel de Configuraci&oacute;n',href:'#',target:'',onclick:preferences},
                1: {title:'Web Oficial FA++',href:'#',target:'',onclick:goToHomepage},
                2: {title:'A&ntilde;adir motor busqueda',href:'#',target:'',onclick:installSearchEngine},
                3: {title:'Informaci&oacute;n de depurado',href:'#',target:'',onclick:showLog}
            }
        }};

    // todo: modificar para no usar indices en esta lista de preferencias.
    var preferencesOptions = {
        0:{name:'SHOWQUICKLIST',text:'Mostrar icono para añadir rapidamente a listas.',def:true},
        1:{name:'FETCHFILMLISTS',text:'Mostrar las listas a las que pertenece la pelicula en el menú de listas rapidas.',def:false},
        2:{name:'SHOWSMCHANGES',text:'Mostrar cambios en las almas gemelas.',def:true},
        3:{name:'SHOWSMFALLEN',text:'Mostrar las almas gemelas caidas de la lista.',def:true},
        4:{name:'KEEPSMCHANGES',text:'Mantener los cambios en las almas gemelas mientras no se produzcan nuevos cambios.',def:true},
        5:{name:'SHOWSEMENU',text:'Mostrar el men&uacute; Secciones Externas en la barra de la izquierda.',def:true},
        6:{name:'SHOWSCRIPTMENU',text:'Mostrar el men&uacute; FilmAffinity++ en la barra de la izquierda.',def:true},
        7:{name:'FLAGSINMYDATA',text:'Mostrar banderas en Mis Datos',def:true},
        8:{name:'FLAGSINOPTIONS',text:'Mostrar banderas en desplegables de selección de pa&iacute;.',def:true},
        9:{name:'FLAGSINFRIENDS',text:'Mostrar banderas en la lista de Amigos',def:true},
        10:{name:'FLAGSCOPRODUCTIONS',text:'Mostrar banderas de coproducciones',def:true},
        //7:{name:'OMITTVSHOWS',text:'Ocultar series de TV (experimental)',def:false},
        11:{name:'SHOWVOTESONFRIENDLISTS',text:'Mostrar mis votos en las listas de otros usuarios y en los resultados de busquedas',def:false},
        12:{name:'ENABLEVOTES',text:'Permitir votar desde mis listas, listas de otros usuarios y resultados de busqueda',def:true},
        13:{name:'CENTERPAGE',text:'Centrar pagina en la ventana del navegador',def:false},
        14:{name:'FOLDMENUS',text:'Permitir plegar los menús',def:false},
        15:{name:'SEARCHFORLIST',text:'Añadir buscar en listas',def:true},
        16:{name:'SHOWMFINDEXES',text:'Mostrar indices de votación en pagina MIS DATOS',def:true},
        17:{name:'SHOWYEARDATA',text:'Mostrar tabla de votos por año en MIS DATOS',def:false},
        18:{name:'COUNTRYDISTS',text:'Mostrar tabla de votos por paises agrupados en MIS DATOS',def:false},
        19:{name:'CHANGELIMIT',text:'Cambiar el n&deg; de peliculas a mostrar en Recomendaciones y TOP',def:false}
    };


    var sections = {
        MyFriends:'/myfriends\\.php/ig',
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
        MyVotes: '/\\/myvotes\\.php/ig',
        AutoTour:'/\\/autotour\\.php/ig',
        EditMovieList: '/\\edtmovielists\\.php/ig',
        UptMyData: '/\\updmydata\\.php/ig',
        Reviews:'/reviews/g'
    };

    var patches = {
        // Centrar la página en la ventana del navegador
        centerPage:{browser:['FF','OP'],preference:'CENTERPAGE',def:false,method:doCenterPage},
        // Añadir menús a las opciones
        addMenus:{browser:['FF'],method:doMenus},
        // Redirigir en caso de que la busqueda de 0 resultados
        redirectSearch:{browser:['FF'],sections:['Search'],method:doRedirectSearch},
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
        friendsLinks:{browser:['FF'],sections:['MyFriends'],method:addFriendsLinks},
        // Enlaces Externos
        externalLinks:{browser:['FF','OP'],sections:['Film','Search'],method:doExternalLinks},
        // Cambios en almas gemelas
        soulMatesChanges:{browser:['FF'],sections:['SoulMates'],preference:'SHOWSMCHANGES',def:true,method:doSoulMates},
        // Ordenación de las peliculas de una lsita
        sortFilmsInList:{browser:['FF'],sections:['MyList'],method:doSortFilmsInList},
        // Captura los nombres de nuestras listas
        captureLists:{browser:['FF'],sections:['MyLists'],method:doCaptureLists},
        // Añadir rapidamente a lista
        quickList:{logged:true,browser:['FF'],sections:['UserList','MyList','Film','Tour','SoulMatesRec','UserRec','MyVotes','AutoTour','UserRatting','TopGen','Search'],preference:'SHOWQUICKLIST',def:true,method:doQuickList},
        // Muestra nuestra puntuación en listas que no lo incorporan de serie
        showVote:{logged:true,browser:['FF'],preference:'SHOWVOTESONFRIENDLISTS',def:false,sections:['Search','UserList'],method:doShowVote},
        // Nos permite votar en listas ajenas, nuestras listas,
        enableVotes:{logged:true,browser:['FF'],preference:'ENABLEVOTES',def:true,sections:['MyList','Search','UserList'],method:doEnableVotes},
        // Edita el control de busqueda tras buscar
        processSearch:{browser:['FF'],sections:['Search'],method:doProcessSearch},
        // Añade banderas a la lista de amigos
        addFlagsToFriends:{browser:['FF','OP'],preference:'FLAGSINFRIENDS',def:true,sections:['MyFriends'],method:doAddFlagsToFriends},
        // Añade banderas a las opciones de los combo box de paises
        addFlagsToOptions:{browser:['FF'],preference:'FLAGSINOPTIONS',def:true,sections:['TopGen','AdvSearch','UptMyData'],method:doAddFlagsToOptionsSel},
        // Añade las banderas a las estadisticas de 'mis datos'
        addFlagsMyData:{browser:['FF','OP'],preference:'FLAGSINMYDATA',def:true,sections:['MyData'],method:doAddFlagsMyData},
        // Banderas de coproductoras
        addCoproductionFlags:{browser:['FF','OP'],preference:'FLAGSCOPRODUCTIONS',def:true,sections:['Film'],method:doAddCoproductionFlags},
        // Añade estadisticas adicionales en myData
        doMyDataMod:{browser:['FF','OP'],sections:['MyData'],method:doMyDataMod},
        // Captura las puntuaciones de las criticas, para analizar
        captureReviews:{browser:['FF'],sections:['Reviews'],method:doCaptureReviews},
        // Cambia el nº de resultados en los listados de TOPs
        alterLimits:{browser:['FF','OP'],method:doAlterLimits,preference:'CHANGELIMIT',def:true},
        // Modifica los titles de las imagenes para que coincidan con el alt
        alt2Title:{browser:['FF','OP'],method:doAlt2Title},
        // Corrige los enlaces a la web inglesa
        fixEnglishLinks:{browser:['FF','OP'],method:doFixEnglishLink},
        // Corrige la posición del icono de zoom al centrar la página
        fixZoomIcon:{browser:['FF','OP'],sections:['Film'],method:doFixZoomIcon},
        // Añade nuevos contactos en Amigos
        extraContacts:{browser:['FF'],sections:['MyFriends'],method:doExtraContacts,preference:'ADITIONALFRIENDS',def:true},
        // TODO: Aplicar esto al resto de paginas del usuario
        // Captura los datos de los nuevos Contactos
        captureContactData:{browser:['FF'],sections:['UserRatting'],method:doCaptureContactData,preference:'ADITIONALFRIENDS',def:true},
        // Añade enlace para añadir a la lista de contactos adicionales
        addToExtraContactsLink:{browser:['FF'],sections:['UserRatting'],method:doAddToExtraContactsLink,preference:'ADIOTIONALFRIENS',def:true},
        // Add External link to myLists
        addExternalLinkMyLists:{browser:['FF'],sections:['MyLists'],method:doAddExternalLinkLists},
        // Add Search for lists
        addSearchForListsOption:{browser:['FF'],method:doAddSearchListsOption,preference:'SEARCHFORLIST',def:true},
    };

    var linkSitesTypes = {
        1:{caption:'Ficha en: ',preference:'verCine'},
        2:{caption:'Buscar en: ',preference:'verGeneral'},
        3:{caption:'Descagar de: ',preference:'verDescargas'},
        4:{caption:'Subtitulos en: ',preference:'verSubtitulos'}
    };

    var linkSites = {
        imdb : { name: 'IMDb',
            icon: 'http://imdb.com/favicon.ico',
            search: 'http://spanish.imdb.com/find?q=%searchvo;tt=on;nm=on;mx=20',
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
        rotten : { name: 'Rotten Tomatoes',
            icon: 'http://www.rottentomatoes.com/favicon.ico',
            search: 'http://www.rottentomatoes.com/search/full_search.php?search=%searchvo',
            method: methodEscape,
            type: _TFILM
        },
        alpacine : { name: 'Alpacine',
            icon: 'http://www.alpacine.com/favicon.ico',
            search: 'http://www.alpacine.com/buscar/?buscar=%searchvo',
            method: methodEscape,
            type: _TFILM
        },
        labutaca : { name: 'La Butaca',
            icon: 'http://www.labutaca.net/favicon.ico',
            search: 'http://www.google.com/custom?q=%searchvo&sa=Buscar+en&sitesearch=www.labutaca.net&q=&domains=www.labutaca.net',
            method: methodEncode,
            type: _TFILM
        },
        /*	dvdreviews : { name: 'DVD-reviews',
         icon: 'http://www.dvd-reviews.net/favicon.ico',
         search: 'http://www.google.com/custom?q=%searchvo&sitesearch=dvd-reviews.net',
         type: _TFILM
         },*/
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
            icon: 'http://s.mininova.org/images/favicon.ico',
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
        youtorrent : { name: 'YouTorrent',
            icon: 'http://www.youtorrent.com/favicon.ico',
            search: 'http://www.youtorrent.com/tag/%searchvo',
            method: methodEscape,
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
            regreq: true,
            type: _TDOWN
        },
        allzine : { name: 'AllZine',
            icon: 'data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB7sACgm3AAoKtAAMDasACwuzAA0NrQAPDqoADQ6sABEPqAAMDLQADw+pAA8QpgAREKYAERGjAA8QqAAUEqEAEhKiABITnwAUE58AFBScABQUngAWFZoAFBaYABYVmwAWFpgAGBeVABYXlwAYGJQAFhiVABoYlAAaGZEAFxeZABoajgAaGpAAGhuNABkYmAAbGZQAGxyKAB0dhwAaHIwAHx2HABsdiQAdHYkAHR6GAB0fhQAiIX0AHB6KACEgggAhIX8AIiJ8ACgobgApKHAAMTDTADAw1gAxMtAAMzTKADU0ygAyMtIANzfBADU1yQA4NsUANjfFADg4wgA6Ob4AODm/ADY5wAA6OrwAPDu5ADc5wwA+PLcAOzq/ADo8uQA/PbQAPj21AD4+sgA8PbcAPD60AD4+tAA/PbgAQ0KpAENDpwBFRKQARkWhAEVEpgBGR58ASEmaAEpKmABRUIgAUlL4AFRU9ABUVfMAWFftAF9d3wBfXtwAYV/aAGFh1wBiYtQAZGTOAGZlzABmZc0AaGfHAGhnyQBoaMYAZmjHAGhpwwBpasAAaWrCAGtsvQBtbbkAcXKvAHR1qAByc7AAeXigAIGD/wCMiu4AjIvtAJGR3QCTk9kAlZbTAJ2fvgCrrf8Ara7/ALa2/wC5uP8AuLn/ALm8/wC9vv8Av77/AL+//wC/wP8AwMH/AMLC/wDCw/8AxMP/AMXE/wDGxf8Axsb/AMjG/wDGx/8AyMf/AMjI/wDJyv8Az876ANLT7wDU0/8A1tX/ANjZ/wDc2v8A3Nz/AN3e/wDf3v8A39//AOHg/wDj4v8A5OX/AOXm/wDm5v8A5uf/AOjn/wDq6P8A6On/AOrp/wDq6v8A7Oz/AOzt/wDt7f8A7e7/AO/u/wDv7/8A7/D/APDw/wDx8P8A8fH/APHy/wDz8v8A8/P/APT0/wD09v8A9vb/APb3/wD49/8A+Pj/APj5/wD6+f8A+vr/APv7/wD8/f8A/f3/AP/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtoxUgFNig6+5ury7sYRodrKCImEqICZsrLa3r3UqKTKygSaIpXQwHmGoqGIeKmuOsYArja6onEYUfmcYQn+ks7GALoaoqKB7EAYMTpmhqrWtfidpbGtmYD0AAV1ka293in0hUCoRDRkXBAIPIxwsVzFxH36WNAmSegNYkD4UlacqBQyFnjsFlHwLWZFDIZqwTwQGiaVDDUpMDDY8JC+jtocKCIurZUtHQQY5OEVWr7mrQhKFo5lJFHkGWjY/m664sHIdY5iTOg54W3k1N5eisLSfKEgbGhMMDRoWBwslM3C3plIeXF9NFV5qZkRAaW6PubBtLXOcVS2dqaZRUaaxuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D',
            search: 'http://www.allzine.org/Foro/index.php?action=search2&search=%searchtr&subject_only=1',
            method: methodEncode,
            regreq: true,
            type: _TDOWN
        },
        vagos : { name: 'Vagos.es',
            icon: 'http://wf1.vagos.es/favicon.ico',
            search: 'http://buscador.wamba.com/buscar/index.php?cx=004825717204032381724%3Ajfqcclqsbpi&cof=FORID%3A11&q=%searchtr',
            method: methodEncode,
            type: _TDOWN
        },                   /*
         vagos : { name: 'PorDescargaDirecta.es',
         icon: 'http://http://pordescargadirecta.com/foro/favicon.ico/favicon.ico',
         search: 'http://buscador.wamba.com/buscar/index.php?cx=004825717204032381724%3Ajfqcclqsbpi&cof=FORID%3A11&q=%searchtr',
         method: methodEncode,
         type: _TDOWN
         },                     */
        clansa : { name: 'Clan-Sudamérica',
            icon: 'http://www.clan-sudamerica.net/invision/favicon.ico',
            search: 'http://www.clan-sudamerica.com.ar/invision/index.php?act=Search&CODE=01&keywords=%searchtr&namesearch=&forums%5B%5D=all&searchsubs=1&prune=0&prune_type=newer&sort_key=last_post&sort_order=desc&search_in=titles&result_type=topics',
            method: methodEncode,
            regreq: true,
            type: _TDOWN
        },
        argenteam : { name: 'aRGENTeaM',
            icon: 'http://www.argenteam.net/favicon.ico',
            search: 'http://foro.argenteam.net/search.php?keywords=%searchvo&terms=all&author=&fid%5B%5D=68&fid%5B%5D=69&fid%5B%5D=70&sc=1&sf=firstpost&sr=posts&sk=t&sd=d&st=0&ch=500&t=0&submit=Buscar',
            method: methodEncode,
            regreq: true,
            type: _TDOWN
        },
        fileheaven : { name: 'fileheaven',
            icon: 'http://www.fileheaven.org/favicon.ico',
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
            icon: 'http://www.solosubtitulos.com/imagenes_web/favicon.ico',
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
        foreingddl: {name: 'ForiegnMoviesDDL',
            icon: 'http://www.blogger.com/favicon.ico',
            search: 'http://www.foriegnmoviesddl.com/search?q=%searchvo',
            method: methodEscape,
            type: _TDOWN
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
        África:["DZ","AO","BJ","BW","BF","BI","CM","CV","CF","TD","KM","CD","CG","CI","DJ","EG","GQ","ER","ET","GA","GM","GH","GN","GW","KE","LS","LR","LY","MG","MW","ML","MR","MU","YT","MA","MZ","NA","NE","NG","RE","RW","SH","ST","SN","SC","SL","SO","ZA","SD","SZ","TZ","TG","TN","UG","EH","ZM","ZW"]
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
        }}
    };

    var countriesCodes = {
        "Afganistán":"AF","Albania":"AL","Alemania del Este (RDA)":"FD","Alemania del Oeste (RFA)":"FF",
        "Alemania del Este":"FD","Alemania del Oeste":"FF",
        "Alemania":"DE","Andorra":"AD","Angola":"AO","Antigua y Barbuda":"AG","Arabia Saudí":"SA",
        "Argelia":"DZ","Argentina":"AR","Armenia":"AM","Australia":"AU","Austria":"AT","Azerbaijan":"AZ",
        "Bahamas":"BS","Bahrein":"BH","Bangladesh":"BD","Barbados":"BB","Bélgica":"BE","Belize":"BZ",
        "Benín":"BJ","Bolivia":"BO","Bosnia - Herzegovina":"BA","Botswana":"BW","Brasil":"BR",
        "Brunei":"BN","Bulgaria":"BG","Burkina Faso":"BF","Burundi":"BI","Bután":"BT","Cabo Verde":"CV",
        "Camboya":"KH","Camerún":"CM","Canadá":"CA","Chad":"TD","Checoslovaquia":"ZX","Chile":"CL",
        "China":"CN","Chipre":"CY","Colombia":"CO","Comores":"KM","Congo":"CG","Corea del Norte":"KP",
        "Corea del Sur":"KR","Costa de Marfil":"CI","Costa Rica":"CR","Croacia":"HR","Cuba":"CU","Dinamarca":"DK",
        "Dominica":"DM","Ecuador":"EC","EEUU":"US","Egipto":"EG","El Salvador":"SV","Emiratos Árabes":"AE",
        "Eritrea":"ER","Eslovaquia":"SK","Eslovenia":"SI","España":"ES","Estados Unidos":"US","Estonia":"EE",
        "Etiopía":"ET","Fidji":"FJ","Filipinas":"PH","Finlandia":"FI","Francia":"FR","Gabón":"GA",
        "Gambia":"GM","Georgia":"GE","Ghana":"GH","Granada":"GD","Grecia":"GR","Guatemala":"GT",
        "Guinea Bissau":"GW","Guinea Ecuatorial":"GQ","Guinea":"GN","Guyana":"GY","Haití":"HT","Holanda":"NL",
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
        "Reino Unido":"GB","GB":"GB","Rep. Centroafricana":"CF","Rep. Dominicana":"DO","República Checa":"CZ","RFA":"FF",
        "Ruanda":"RW","Rumanía":"RO","Rusia":"RU","Samoa":"WS","San Marino":"SM","Santo Tomé y Príncipe":"ST",
        "Senegal":"SN","Serbia y Montenegro":"RR","Serbia":"RS","Seychelles":"SC","Sierra Leona":"SL","Singapur":"SG",
        "Siria":"SY","Somalia":"SO","Sri Lanka":"LK","Sudán":"SD","Suecia":"SE","Suiza":"CH","Suráfrica":"ZA",
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
            tmp += optTemplate.replace(/{NAME}/g, 'newwindow').replace(/{TEXT}/g, 'Abrir los enlaces en una nueva ventana');
            tmp += '<tr><td colspan=4>Los sitios marcados con <span class="regreq">(*)</span> requieren registro.</td></tr>';

            tmp += '<tr><td colspan="4"><fieldset><legend>Posici&oacute;n de los enlaces a webs externas</legend>';
            tmp += '<label><input type="radio" name="linksPosition" value="default">Integrados en la ficha de la pelicula</input></label>';
            tmp += '<label><input type="radio" name="linksPosition" value="inTitle">En el titulo de la pelicula</input></label>';
            tmp += '<label><input type="radio" name="linksPosition" value="inPanel">Panel derecho, debajo de la puntuaci&oacute;n</input></label>';
            tmp += '</fieldset><hr></td></tr>';


            // Nuevas preferencias
            for (pref in preferencesOptions) {
                t = optTemplate.replace(/{NAME}/g, preferencesOptions[pref].name).replace(/{TEXT}/g, preferencesOptions[pref].text);
                tmp += t.replace(/{CHECKED}/g, preferencesOptions[pref].def ? 'checked' : '');
            }
            // Limite en recomendaciones y TOPs
            var limite = getPreference('limit', 20);
            tmp += '<tr><td colspan=4><label>N&deg; de pel&iacute;culas a mostrar en Recomendaciones y TOP: <input type="text" value="' + limite + '" name="limit"></label></td></tr>';

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
        var friendsTable = "//span[text()='Nombre/Nick']/ancestor::*[position()=4]".findNode();
        for (var i = 1; i < friendsTable.rows.length - 1; ++i) {
            var friendId = friendsTable.rows[i].cells[0].firstChild.href.split('=')[1];
            var name = friendsTable.rows[i].cells[0].firstChild.textContent;
            var ratedfilms = friendsTable.rows[i].cells[3].textContent.split('.').join('');
            var criticas = friendsTable.rows[i].cells[4].textContent.split('.').join('');
            var friendstr = GM_getValue(userId + ".friends." + friendId);
            if (typeof friendstr != 'undefined') {
                var friend = eval(friendstr);
                var dif = ratedfilms - friend.films;
                var prefix;
                if (dif != 0) {
                    prefix = dif > 0 ? '+' : '';
                    friendsTable.rows[i].cells[3].bgColor = dif > 0 ? 'lightgreen' : '#FF6666';
                    friendsTable.rows[i].cells[3].textContent += '(' + prefix + dif + ')';
                }
                ;
                if (typeof friend.criticas != 'undefined') {
                    dif = criticas - friend.criticas;
                    if (dif != 0) {
                        prefix = dif > 0 ? '+' : '';
                        friendsTable.rows[i].cells[4].bgColor = dif > 0 ? 'lightgreen' : '#FF6666';
                        friendsTable.rows[i].cells[4].textContent += '(' + prefix + dif + ')';
                    }
                }
            }
            GM_setValue(userId + ".friends." + friendId, {name:name,films:ratedfilms,criticas:criticas}.toSource());
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
        function applyFallenSoulMates(soulMatesTable, fallen) {
            if (fallen.length > 0) {
                var tr = d.createElement('TR');
                var td = d.createElement('TD');
                td.innerHTML = 'Almas gemelas caidas de la lista: <b>' + fallen.join(', ') + '</b>';
                td.colSpan = 7;
                tr.appendChild(td);
                soulMatesTable.rows[1].parentNode.appendChild(tr);
            }
        }

        function applyLastChangesTime(soulMatesTable, date) {
            if (typeof date != "undefined") {
                var tr = d.createElement('TR');
                var td = d.createElement('TD');
                td.innerHTML = 'Ultimos cambios detectados el ' + date;
                td.colSpan = 7;
                tr.appendChild(td);
                soulMatesTable.rows[1].parentNode.appendChild(tr);
            }
        }

        function applyTimeMachine(soulMatesTable, newChanges, ssml) {
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
                    html += '<option value=' + index + '>' + date + '</option>';
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
                applyFallenSoulMates(soulMatesTable, changesList.fallen);
            }
            if ((newChanges || getPreference("KEEPSMCHANGES"),true) && !historic) {
                applyLastChangesTime(soulMatesTable, changesList.date);
            }
            /* Mostrar el combo para comparar con el historico */
            if (!historic) applyTimeMachine(soulMatesTable, newChanges, ssml);
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

    function doExternalLinks() {

        function extractTranslatedTitle() {
            var nodo = "//img[@src='http://www.filmaffinity.com/images/movie.gif']/parent::*/text()".findNode();
            return nodo.textContent.clearTitle();
        }

        function extractOriginalTitle()
        {
            var nodo = '//b[contains(text(),"TULO ORIGINAL")]/../following-sibling::*/b/text()'.findNode();
            return nodo.textContent.clearTitle();
        }

        function getLinkSitesCode(type, title, titletr) {
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
                    else
                        sstr = linkSites[i].search.replace(/%searchvo/, linkSites[i].method(title));
                    // Si tiene Opciones adicionales
                    if (linkSites[i].search.indexOf("{OPTIONS}") > -1) {
                        sstr = sstr.replace(/{OPTIONS}/g, linkSites[i].getOptions());
                    }
                    html += linkSiteTemplate.replace(/{LINK}/g, sstr).replace(/{ICON}/g, sicon).replace(/{TARGET}/g, target).replace(/{TITLE}/g, stit);
                }
            }
            return html;
        }

        function doAddLinksInTitle() {
            var originalTitle = extractOriginalTitle();
            var translatedTitle = extractTranslatedTitle();
            var titlediv = "//img[@src='http://www.filmaffinity.com/images/movie.gif']/parent::*/parent::*".findeNode();
            var types = [_TFILM, _TGEN, _TDOWN, _TSUB];
            for (var t in types) {
                var tmp = '';
                var txt = linkSitesTypes[types[t]].caption;
                if (getPreference(linkSitesTypes[types[t]].preference, true)) {
                    tmp += getLinkSitesCode(types[t], originalTitle, translatedTitle);
                }
                if (tmp != '')
                    titlediv.innerHTML += '<span style="padding-left: 1em; font-style: italic;">' + txt + tmp + '</span>';
            }
        }

        //
        // Añade los enlaces Externos en el panel de la derecha
        //
        function doAddLinksOnPanel() {
            var nodo = "//b[text()='TU VOTO']".findNode();
            for (var n = 1; n < 13; n++) {
                nodo = nodo.parentNode;
            }
            ;
            var originalTitle = extractOriginalTitle();
            var translatedTitle = extractTranslatedTitle();

            var html = '<td align="center">\n <table bgcolor="#ddddff" border="0" cellpadding="0" cellspacing="1" width="100%">\n <tbody>';
            html += '<tr><td bgcolor="#ffffff">\n\n<table border="0" cellpadding="2" cellspacing="2" width="100%">\n <tbody>';
            html += '{LINKS}\n</tbody></table>\n\n </td></tr>\n </tbody></table>\n </td>';

            var linkTemplate = '<tr>\n <td align="center">\n <div style="position: relative;">\n\n';
            linkTemplate += '<div style="color: rgb(0, 51, 102); font-size: 12px;"><b>{TITLE}</b></div>\n\n</div>\n\n </td>\n </tr>\n';
            linkTemplate += '<tr><td align="center">{LINKS}</td></tr>';
            var links = "";
            var texto;

            if (getPreference("verCine", true)) {
                texto = getLinkSitesCode(_TFILM, originalTitle, translatedTitle);
                if (texto != '') links += linkTemplate.replace(/{TITLE}/g, "FICHA").replace(/{LINKS}/g, texto);
            }
            if (getPreference("verGeneral", true)) {
                texto = getLinkSitesCode(_TGEN, originalTitle, translatedTitle);
                if (texto != '') links += linkTemplate.replace(/{TITLE}/g, "BUSCAR").replace(/{LINKS}/g, texto);
            }
            if (getPreference("verDescargas", true)) {
                texto = getLinkSitesCode(_TDOWN, originalTitle, translatedTitle);
                if (texto != '') links += linkTemplate.replace(/{TITLE}/g, "DESCARGAS").replace(/{LINKS}/g, texto);
            }
            if (getPreference("verSubtitulos", true)) {
                texto = getLinkSitesCode(_TSUB, originalTitle, translatedTitle);
                if (texto != '') links += linkTemplate.replace(/{TITLE}/g, "SUBTITULOS").replace(/{LINKS}/g, texto);
            }
            var spacer = document.createElement("TR");
            spacer.innerHTML = "<td>&nbsp;</td>";
            nodo.parentNode.insertBefore(spacer, nodo.nextSibling);
            var nodoTr = document.createElement("TR");
            nodo.parentNode.insertBefore(nodoTr, nodo.nextSibling.nextSibling);
            nodoTr.innerHTML = html.replace(/{LINKS}/g, links);
        }

        //
        // Añade los enlaces Externos en la ficha de la pelicula
        //
        function doAddLinksInline() {
            var originalTitle = extractOriginalTitle();
            var translatedTitle = extractTranslatedTitle();

            log("-T&iacute;tulo original: " + originalTitle + " - T&iacute;tulo traducido: " + translatedTitle);

            // recogemos el tr padre de la columna 'productora'
            var nodoProductora = "//b[text()='PRODUCTORA']/parent::*/parent::*".findNode();

            // Fichas
            addDataRow(nodoProductora, "verSubtitulos", 'SUBTITULOS', _TSUB, originalTitle, translatedTitle);
            addDataRow(nodoProductora, "verDescargas", 'DESCARGAS', _TDOWN, originalTitle, translatedTitle);
            addDataRow(nodoProductora, "verGeneral", 'BUSCAR', _TGEN, originalTitle, translatedTitle);
            addDataRow(nodoProductora, "verCine", 'FICHA', _TFILM, originalTitle, translatedTitle);
        }

        // Añadimos los enlaces en la pagina de busqueda
        function doAddLinksSearch() {
            var nodo = "//span[text()='Resultados por título']/ancestor::*[position()=3]".findNode();
            if (nodo != null) {
                var busqueda = d.forms[0].elements[0].value;
                var types = [_TFILM, _TGEN, _TDOWN, _TSUB];
                var html = "<td>&nbsp;Busquedas adicionales:&nbsp;&nbsp;";
                for (var t in types) {
                    var type = types[t];
                    if (getPreference(linkSitesTypes[types[t]].preference, true)) {
                        html += getLinkSitesCode(type, busqueda, busqueda) + "&nbsp;&nbsp;";
                    }
                }
                html += "</td>";
                var nodoTr = d.createElement('tr');
                nodoTr.innerHTML = html;
                nodo.parentNode.insertBefore(nodoTr, nodo);
            }
        }

        function addDataRow(sibling, preference, title, type, originalTitle, translatedTitle) {
            if (getPreference(preference, true)) {
                var html = getLinkSitesCode(type, originalTitle, translatedTitle);
                if (html != "") {
                    var nodoTr = d.createElement('tr');
                    var nodoTd = d.createElement('td');
                    nodoTd.align = "right";
                    nodoTd.valign = "baseline";
                    nodoTd.innerHTML = '<b>' + title + '</b>';
                    nodoTr.appendChild(nodoTd);
                    nodoTd = d.createElement('td');
                    nodoTd.innerHTML = html;
                    nodoTr.appendChild(nodoTd);
                    sibling.parentNode.insertBefore(nodoTr, sibling.nextSibling);
                }
            }
        }

        if (inSection('Film')) {
            var doFunction;
            switch (getPreference("linksPosition", "default")) {
                case "default": doFunction = doAddLinksInline;break;
                case "inTitle": doFunction = doAddLinksInTitle;break;
                case "inPanel": doFunction = doAddLinksOnPanel;break;
            }
            doFunction();
        }
        else {
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
        var listsTable = '/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td/span[text()="Nombre"]/ancestor::*[position()=3]'.findNode();
        var listas = [];
        deleteValues(userId + ".list.");
        for (var i = 1; i < listsTable.rows.length; i++) {
            var listName = listsTable.rows[i].cells[0].firstChild.firstChild.data;
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
        var styleTemplate = 'padding-left: 19px; background: white url("{URL}") no-repeat scroll center left';
        var baseUrl = "http://www.filmaffinity.com/imgs/countries/";
        var countriesTable = "//b[text()='Mis votos por país']/ancestor::*[position()=5]".findNode();
        for (var i = 1; i < countriesTable.rows.length; ++i) {
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

    function doAddFlagsToFriends() {
        var friendsTable = "//span[text()='Nombre/Nick']/ancestor::*[position()=4]".findNode();
        for (var i = 1; i < friendsTable.rows.length - 1; i++) {
            var localidad = friendsTable.rows[i].cells[1].textContent.reverse();
            var pais = localidad.substr(1, localidad.indexOf('(') - 1).reverse();
            var code = getCountryCode(pais);
            friendsTable.rows[i].cells[1].setAttribute('style', 'padding-left: 22px; background: white url("http://www.filmaffinity.com/imgs/countries/' + code + '.jpg") no-repeat scroll center left');

        }
    }

    function doAddFlagsToExtraContacts() {
        var contactsTable = "//tr[@id='newFriends']/td/table".findNode();
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

        ;


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
                    filmListTable.rows[n].appendChild(celda);
                }
                filmListTable.rows[1].cells[filmListTable.rows[1].cells.length - 1].innerHTML = "<img src='" + download_img + "'/>";
            }

            function prepareTableSearch() {
                var anchors = "//img[contains(@src,'countries')]/ancestor::*[position()=6]".findNodesArray();
                contentPrefix = "<b style='color:black;font-size:8pt;'>TU VOTO</b><br><br>";
                var primero = true;
                for (var ix in anchors) {
                    var nodoTR = anchors[ix];
                    var nodoTD = d.createElement('TD');
                    nodoTD.width = "60";
                    nodoTD.align = "center";
                    nodoTD.verticalAlign = "top";
                    nodoTD.vAlign = "top";
                    nodoTD.className = 'rating';
                    nodoTD.innerHTML = contentPrefix + "-";
                    if (primero) {
                        firstCell = nodoTD;
                        nodoTD.innerHTML = contentPrefix + "<img src='" + download_img + "'/>";
                        primero = false;
                    }
                    nodoTR.appendChild(nodoTD);
                }
            }

            if (inSection('UserList')) {
                prepareTableUserList();
            } else {
                prepareTableSearch();
            }
        }


        function injectVotes(votos) {
            function injectVotesUserList(votos) {
                var filmListTable = "//b[text()='Su voto']/ancestor::*[position()=4]".findNode();
                filmListTable.rows[1].cells[filmListTable.rows[1].cells.length - 1].innerHTML = contentPrefix + "-";
                for (ix in votos) {
                    var voto = votos[ix];
                    var row = "//img[@id={ID}]/ancestor::*[position()=10]".replace(/{ID}/g, voto.pelicula).findNode();
                    if (row != null) {
                        var cell = row.cells[row.cells.length - 1];
                        cell.id = voto.pelicula + ":" + voto.puntuacion;
                        cell.style.cursor = "pointer";
                        // cell.addEventListener("click", showVoteMenu, true);
                        if (voto.puntuacion != '-') {
                            cell.textContent = contentPrefix + voto.puntuacion;
                        }
                    }
                }
            }

            function injectVotesSearch(votos) {
                firstCell.innerHTML = contentPrefix + "-";
                for (var ix in votos) {
                    var voto = votos[ix];
                    var row = "//img[@id={ID}]/ancestor::*[position()=6]".replace(/{ID}/g, voto.pelicula).findNode();
                    if (row != null) {
                        var cell = row.cells[row.cells.length - 1];
                        cell.id = voto.pelicula + ":" + voto.puntuacion;
                        cell.style.cursor = "pointer";
                        // cell.addEventListener("click", showVoteMenu, true);
                        if (voto.puntuacion != '-') {
                            cell.innerHTML = contentPrefix + voto.puntuacion;
                        }
                    }
                }
            }

            if (inSection('UserList')) {
                injectVotesUserList(votos);
            } else {
                injectVotesSearch(votos);
            }
        }

        function extractVotesFromList(div) {
            var nodos = "//img[contains(@src,'countries')]/parent::*/b/a".findNodesArray(div);
            var votos = [];
            for (var ix in nodos) {
                var pelicula = nodos[ix].href.split("es/film")[1].split(".")[0];
                var temp = "ancestor::*[position()=10]".findNode(nodos[ix]);
                var voto = temp.parentNode.cells[temp.cellIndex + 1].textContent;
                votos.push({pelicula:pelicula,puntuacion:voto});
            }
            return votos;
        }

        //
        // Lee la lista temporal de trabajo y obtiene nuestras puntuaciones
        //
        function readVotes(list) {
            var url = "http://www.filmaffinity.com/es/mylist.php?list_id=" + list;
            doGet(url, function(response) {
                response = response.replace("<img", "<omg"); // Para que no se ponga a cargar las peliculas
                var emptydiv = document.createElement('div');
                emptydiv.innerHTML = response;
                var votos = extractVotesFromList(emptydiv);
                // Borrar lista temporal
                injectVotes(votos);
                emptyWorkList(votos);
            });
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
                var anchors = "//img[contains(@src,'countries')]/parent::*/b/a".findNodesArray();
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
            button.alt = "Añadir pélicula a listas";
            button.id = pelicula;
            button.addEventListener("click", openQuickListPanel, false);
            return button;
        }

        // Añade el icono de añadir a listas rapidas en las listas de peliculas
        function addQuickListSearch() {
            GM_addStyle('.addToList {margin-left:5px;cursor:pointer;width:9px;height:9px;}');
            var anchors = getElementsByClassName(d, 'a', 'addl');
            for (var i = 0; i < anchors.length; i++) {
                var anchor = anchors[i];
                if (anchor.textContent.indexOf('a listas') >= 0) {
                    var pelicula = anchor.href.split('=')[1].split('&')[0];
                    anchor.parentNode.appendChild(createButtonNode(pelicula));
                }
            }
        }

        function addQuickListList() {
            GM_addStyle('.addToList {margin-left:5px;cursor:pointer;width:9px;height:9px;}');
            var anchors = "//img[contains(@src,'countries')]/parent::*/b/a".findNodesArray();
            for (var ix in anchors) {
                var pelicula = anchors[ix].href.split("es/film")[1].split(".")[0];
                anchors[ix].parentNode.parentNode.appendChild(createButtonNode(pelicula));
            }
        }

        // Añade el enlace a listas rapidas en la ficha de la pelicula
        function addQuickListFilm() {
            GM_addStyle('.addToList {margin-left:5px;cursor:pointer;width:9px;height:9px;}');
            var pelicula = document.location.href.split('/film')[1].split('.')[0];
            var anchor = "//div/b[text()='LISTAS']".findNode();
            if (anchor != null) {
                anchor.parentNode.appendChild(createButtonNode(pelicula));
            }
            anchor = '//b[text()="TITULO ORIGINAL"]/../following-sibling::*'.findNode();
            if (anchor != null) {
                anchor.appendChild(createButtonNode(pelicula));
            }
        }

        if (inSection('Film')) addQuickListFilm(); else
            if (inSection('MyList') || inSection('UserList')) addQuickListList(); else addQuickListSearch();
    }

    ;


    // Soporte para ordenar las peliculas en las listas
    function doSortFilmsInList() {
        var filmList = [];
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
            var nodos = "//a[@class='posn']".findNodesArray();
            var neworder = "";
            for (var ix in nodos) {
                neworder += "," + nodos[ix].id;
            }
            neworder = neworder.substr(1).replace(/ch/g, "");
            working = true;
            var estado = document.body.style.cursor;
            document.body.style.cursor = 'wait';
            log('Ordenando: ' + urlListOrder);
            doPost(urlListOrder, params.replace(/{NEWORDER}/g, neworder).replace(/{ID}/g, id), function() {
                var nodosTR = "//a[@class='posn']/parent::*/parent::*".findNodesArray();
                for (var ix in nodosTR) {
                    mark(nodosTR[ix], "#FFFFFF");
                }
                working = false;
                d.body.style.cursor = estado;
            });
        }

        ;

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
            var imgUp = node.cells[0].childNodes[3];
            var imgDown = node.cells[0].childNodes[4];
            if (pos == 1) {
                imgUp.style.display = "none";
            } else {
                imgUp.style.display = "block";
                setEventUp(imgUp);
            }
            if (pos == ultimo) {
                imgDown.style.display = "none";
            } else {
                imgDown.style.display = "block";
                setEventDown(imgDown);
            }
            // Marcamos el panel,
            mark(node, "#FFEFEF");
        }

        ;


        function doFilmUp(e) {
            clearTimeout(timerID);
            var pos = "//a[@id='{ID}']/text()".replace(/{ID}/g, e.id).findNode().textContent;
            if (pos < 21) {
                var nodo1 = e.parentNode.parentNode;
                var tabla = nodo1.parentNode;
                var nodo2 = tabla.rows[pos - 1];
                var clon1 = nodo1.cloneNode(true);
                var clon2 = nodo2.cloneNode(true);
                tabla.insertBefore(clon1, nodo2);
                tabla.insertBefore(clon2, nodo2);
                tabla.removeChild(nodo1);
                tabla.removeChild(nodo2);
                // intercambiar nodos pos y pos-1
                adjustRowData(clon1, pos - 1);
                adjustRowData(clon2, pos);
                timerID = setTimeout(sendData, 2000);
                // si pos = 2 o pos = ultimo => modificar flechas
            }
        }

        function doFilmDown(e) {
            clearTimeout(timerID);
            var pos = parseInt("//a[@id='{ID}']/text()".replace(/{ID}/g, e.id).findNode().textContent);
            if (pos < 21) {
                var nodo1 = e.parentNode.parentNode;
                var tabla = nodo1.parentNode;
                var nodo2 = tabla.rows[pos + 1];
                var clon1 = nodo1.cloneNode(true);
                var clon2 = nodo2.cloneNode(true);
                tabla.insertBefore(clon2, nodo2);
                tabla.insertBefore(clon1, nodo2);
                tabla.removeChild(nodo1);
                tabla.removeChild(nodo2);
                // intercambiar nodos pos y pos-1
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
            } else {
                var nodos = "//a[@class='posn']".findNodesArray();
                for (var ix in nodos) {
                    filmList.push({id:nodos[ix].id.replace(/ch/g, '')});
                }
                init();
            }
            log(filmList.toSource());
        }

        function init() {
            GM_addStyle('.upimg {display:block;margin-top:5px;cursor:pointer;}');
            GM_addStyle('.downimg {display:block;margin-top:5px;cursor:pointer;}');
            var nodos = "//a[@class='posn']".findNodesArray();
            var arriba = "<img id='{ID}' title='Subir pelicula en lista' class='upimg' src='" + upimg + "'>";
            var arribah = "<img id='{ID}' title='Subir pelicula en lista' class='upimg' style='display:none' src='" + upimg + "'>";
            var abajo = "<img id='{ID}' title='Bajar pelicula en lista' class='downimg' src='" + downimg + "'>";
            var abajoh = "<img id='{ID}' title='Bajar pelicula en lista' class='downimg' style='display:none' src='" + downimg + "'>";
            ultimo = nodos.length;
            for (var ix in nodos) {
                nodos[ix].style.display = "block";
                var html = ((ix > 0) ? arriba : arribah) + ((ix < ultimo - 1) ? abajo : abajoh);
                html = html.replace(/{ID}/g, nodos[ix].id);
                nodos[ix].parentNode.innerHTML += html;
            }
            var imagenes = getElementsByClassName(d, 'img', 'upimg');
            for (ix in imagenes) {
                setEventUp(imagenes[ix]);
            }
            ;
            imagenes = getElementsByClassName(d, 'img', 'downimg');
            for (ix in imagenes) {
                setEventDown(imagenes[ix]);
            }
            ;
        }

        readMovieList();
        //init();

    }

    // Soporte para plegar los menús
    function doMenus() {

        function injectNewMenus() {
            // Dirección base de los menus
            var baseXPath = '/html/body/table[2]/tbody/tr/td/table/tbody';
            var nodePath = '/tr/td/table/tbody/tr/td/i[text()="{ANCHOR}"]/ancestor::*[position()=6]';
            var menuTemplate = '<td><table width="150" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" class="menu"><tbody><tr><td class="menutitle"><i>{MENU_NAME}</i></td></tr>{OPTIONS}</tbody></table></td>';
            var optionTemplate = '<tr><td class="menu"><a id="{ID}" href="{HREF}" target="{TARGET}">{TITLE}</a></td></tr>';
            var container = baseXPath.findNode();
            for (var ix in menus)
            {
                var menu = menus[ix];
                if (getPreference(menu.cond, true)) {
                    var anchor = getPreference("menu." + menu['name'] + ".anchor", menu['anchor']);
                    var xpath = baseXPath + nodePath.replace("{ANCHOR}", anchor);
                    var nodoAnterior = xpath.findNode();
                    var optionsHTML = "";
                    for (ox in menu['options'])
                    {
                        var option = menu['options'][ox];
                        var text = optionTemplate.replace("{ID}", "IX" + ix + "OX" + ox);
                        text = text.replace("{HREF}", option['href']);
                        text = text.replace("{TARGET}", option['target']);
                        text = text.replace("{TITLE}", option['title']);
                        optionsHTML += text;
                    }
                    var html = menuTemplate.replace('{MENU_NAME}', menu['name']);
                    html = html.replace("{OPTIONS}", optionsHTML);
                    var fapp = d.createElement('tr');
                    fapp.innerHTML = html;
                    if (nodoAnterior != null) {
                        var position = getPreference("menu." + menu['name'] + ".position", menu['position']);
                        nodoAnterior = (position == ANCHOR_AFTER) ? nodoAnterior.nextSibling : nodoAnterior;
                        container.insertBefore(fapp, nodoAnterior);
                        for (var ox in menu['options'])
                        {
                            option = menu['options'][ox];
                            var id = "IX" + ix + "OX" + ox;
                            if (option['onclick'] != null) {
                                $id(id).addEventListener("click", option['onclick'], true);
                            }
                        }
                    }
                }
            }
        }

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

        injectNewMenus();
        if (getPreference('FOLDMENUS', false)) {
            injectFoldCode();
        }
    }

    ;

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
        var nodo = "//b[text()='PAÍS']/../../td/table/tbody/tr/td/img".findNode();
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
        var productora = '//b[text()="PRODUCTORA"]/../following-sibling::*/text()'.findNode().textContent.toLowerCase().split(';')[0];
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
        var nodo = "//td[@class='menu']/a[text()='SALIR']".findNode();
        return nodo != null;
    }

    function getUserId() {
        var nodo = "//td[@class='menu']/a[contains(text(),'TICAS FAVORITAS')]".findNode();
        var usuario = (nodo != null) ? nodo.href.split('=')[1] : '';
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


    function doExtraContacts() {

        function hideBox() {
            var box = "//font[contains(text(),'MO FUNCIONA LA SECCI')]/ancestor::*[position()=6]".findNode();
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
            var friendsTable = "//span[text()='MIS AMIGOS / USUARIOS FAVORITOS']/../../../../..".findNode();
            if (friendsTable != null) {
                var nuevo = friendsTable.rows[0].cloneNode(true);
                nuevo.id = "newFriends";
                friendsTable.rows[0].parentNode.appendChild(nuevo);
                // Cambiar titulo
                var span = "td/div/span".findNode(nuevo);
                span.innerHTML = "CONTACTOS ADICIONALES <span style='font-size:50%'>(el numero de votos, criticas y listas no se actualizan automaticamente)</span>";
                // Borrar los amigos existentes (si los hubiera)
                var tBody = "td/table[@class='list']/tbody".findNode(nuevo);
                var contactsTable = tBody.parentNode;
                while (contactsTable.rows.length > 1) {
                    tBody.removeChild(contactsTable.rows[1]);
                }
                // Borramos lo de las consultas
                var nodeP = "td/p".findNode(nuevo);
                nodeP.parentNode.removeChild(nodeP);
                // Cambiamos el link a añadir
                var nodo = "following-sibling::table/tbody/tr/td/a".findNode(contactsTable);
                if (nodo == null) {
                    var tabla = d.createElement('table');
                    tabla.innerHTML = "<tbody><tr><td align='right'><a href='#'>Añadir contactos desde URL</a></td></tr></tbody>";
                    contactsTable.parentNode.insertBefore(tabla, contactsTable.nextSibling);
                    nodo = "following-sibling::table/tbody/tr/td/a".findNode(contactsTable);
                }
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

        var friendColumns = [
            {text:'<a href="/es/userlastratings.php?user_id={ID}" class="lnk3"><b>{NAME}</b></a>',
                rep:[{find:"/{ID}/g",replace:"friend.id"},{find:'/{NAME}/g',replace:'friend.name'}]},
            {text:'{CITY}',rep:[{find:"/{CITY}/g",replace:"friend.city"}]},
            {align:'center',text:'<a href="/es/imsendmsg.php?to={ID}" title="Enviar mensaje" class="lnk3"><img src="http://www.filmaffinity.com/images/sendmsg.gif"/></a>',
                rep:[{find:"/{ID}/g",replace:"friend.id"}]},
            {align:'right',text:'{VOTES}',rep:[{find:"/{VOTES}/g",replace:'friend.votes'}]},
            {align:'right',text:'{REVIEWS}',rep:[{find:"/{REVIEWS}/g",replace:'friend.reviews'}]},
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

        function injectContacts() {
            var contactsTable = "//tr[@id='newFriends']/td/table".findNode();
            var friendsstr = GM_getValue(userId + '.extraFriends');
            // Añadimos los nuevos amigos
            if (typeof friendsstr != 'undefined') {
                var eFriends = eval(friendsstr);
                eFriends.sort(function(a, b) {
                    return a.name.toLowerCase() > b.name.toLowerCase();
                });
                for (ix in eFriends) {
                    var friend = eFriends[ix];
                    var nodoTr = createFriendNode(friend);
                    contactsTable.rows[0].parentNode.appendChild(nodoTr);
                }
            }
        }

        hideBox();
        prepareContactsTable();
        injectContacts();
        if (getPreference('FLAGSINFRIENDS', true)) {
            doAddFlagsToExtraContacts();
        }
    }

    function extractUserData() {
        var user = url.split('user_id=')[1].split("#")[0];
        var nombre = '//span[contains(text(),"Votaciones de ")]'.findNode().textContent.split(' de ')[1];
        var row = '//td[contains(text(),"valoradas")]/..'.findNode();
        var valoradas = row.cells[0].textContent;
        row = row.parentNode.rows[1];
        var criticas = row.cells[0].textContent;
        row = row.parentNode.rows[2];
        var listas = row.cells[0].textContent;
        var dir = ("//b[contains(text(),'" + nombre + "')]/ancestor::*[position()=5]/following-sibling::i").findNode().textContent;
        var ciudad = dir.split(',')[0].split('(')[1].trim();
        var pais = dir.split(',')[1].trim();
        dir = ciudad + ' (' + pais;
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

        var user = url.split('user_id=')[1].split("#")[0];
        var friendsStr = GM_getValue(userId + '.extraFriends');
        // Añadimos los nuevos amigos
        if (typeof friendsStr != 'undefined') {
            var eFriends = eval(friendsStr);
            log(eFriends.toSource());
            if (!inArray(eFriends, 'id', user)) {
                var anchor = '//a[contains(text(),"adir a mi lista de amigos")]'.findNode();
                if (anchor != null) {
                    var text = d.createTextNode(' | ');
                    var a = d.createElement('a');
                    a.id = user;
                    a.className = 'uc';
                    a.href = "#";
                    a.addEventListener("click", doAddContact, true);
                    a.textContent = "Añadir a lista de contactos adicionales";
                    anchor.parentNode.appendChild(text);
                    anchor.parentNode.appendChild(a);
                }
            }
        }
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

        ;

        injectSearchListsOption();
    }

    function doMyDataMod() {

        function doAddExtraStats() {
            var countriesTable = "//b[text()='Mis votos por país']/ancestor::*[position()=5]".findNode();
            var statsTable = "//td[text()='Nº de críticas validadas:']/ancestor::*[position()=3]".findNode();
            var totalCountries = countriesTable.rows.length - 1;
            var clon = statsTable.rows[statsTable.rows.length - 2].cloneNode(true);
            clon.cells[0].textContent = "Nº paises diferentes:";
            clon.cells[1].innerHTML = "<b>" + totalCountries + "</b>";
            statsTable.rows[statsTable.rows.length - 2].parentNode.insertBefore(clon, statsTable.rows[statsTable.rows.length - 1]);
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

        function addLine2Table(table, text, value, media) {
            var clon = table.rows[table.rows.length - 2].cloneNode(true);
            clon.cells[0].textContent = text;
            clon.cells[0].setAttribute('style', '');
            clon.cells[1].innerHTML = "<b>" + value + "</b>";
            clon.cells[2].innerHTML = "<b>" + media + "</b>";
            table.rows[table.rows.length - 1].parentNode.appendChild(clon);
        }

        function doAddContinentStats() {
            var countriesTable = "//b[text()='Mis votos por país']/ancestor::*[position()=5]".findNode();
            var totalPaises = countriesTable.rows.length - 1;
            for (var i = 1; i <= totalPaises; i++) {
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
            /*
             Clonamos la tabla de los paises y metemos los datos
             */
            var continentTable = countriesTable.cloneNode(true);

            for (ix in datosContinentes) {
                if (datosContinentes[ix].votos > 0) {
                    addLine2Table(continentTable, datosContinentes[ix].nombre, datosContinentes[ix].votos, datosContinentes[ix].media.toFixed(1).replace('.', ','));
                }
            }
            for (var n = 0; n < totalPaises; n++) {
                continentTable.rows[1].parentNode.removeChild(continentTable.rows[1]);
            }
            continentTable.rows[0].cells[0].firstChild.firstChild.textContent = "Mis votos por continente";

            countriesTable.parentNode.insertBefore(continentTable, countriesTable.nextSibling);
            log(datosContinentes.toSource());
        }

        function doChangeDistribution() {
            var index = this.options.selectedIndex;
            var name = this.options[index].value;
            // Eliminamos la tabla actual y creamos una nueva
            $id("REGION_TABLE").parentNode.removeChild($id("REGION_TABLE"));
            doAddRegionsStats(name, DIST_REGIONS);
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
            var clone = table.rows[0].cloneNode(true);
            clone.cells[0].firstChild.firstChild.innerHTML = " criterio: " + html;
            table.rows[0].parentNode.insertBefore(clone, table.rows[0].nextSibling);
            $id("DIST_SELECT").addEventListener("change", doChangeDistribution, false);
        }

        function doAddRegionsStats(distributionName, type) {
            var datosRegiones = [];
            var countriesTable = "//b[text()='Mis votos por país']/ancestor::*[position()=5]".findNode();
            var totalPaises = countriesTable.rows.length - 1;
            for (var i = 1; i <= totalPaises; i++) {
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
                    addLine2Table(regionTable, datosRegiones[ix].nombre, datosRegiones[ix].votos, datosRegiones[ix].media.toFixed(1).replace('.', ','));
                }
            }
            for (var n = 0; n < totalPaises; n++) {
                regionTable.rows[1].parentNode.removeChild(regionTable.rows[1]);
            }
            regionTable.rows[0].cells[0].firstChild.firstChild.textContent = "Mis votos por país agrupados según";
            regionTable.id = "REGION_TABLE";
            countriesTable.parentNode.appendChild(regionTable);
            insertDistributionCombo(regionTable, distributionName, type);
        }

        /*
         * Modifica la apariencia de la tabla Mis Votos por Valor en Mis Datos
         */

        function doAlterMyVotes() {
            const ANCHO_MAXIMO = 177;
            var imgTpl = '<img height="14" width="{WIDTH}" border="0" align="top" src="/images/bars/bar1.gif"/><span style="font-size:80%;">&nbsp;{PCT}%</span>';
            var votesTable = "//b[text()='Mis votos por valor']/ancestor::*[position()=5]".findNode();
            var statsTable = "//td[text()='Nº de críticas validadas:']/ancestor::*[position()=3]".findNode();
            var votosTotal = statsTable.rows[1].cells[1].textContent;
            var maxVotos = 0;
            var n;
            var votos;
            for (n = 1; n < votesTable.rows.length; n++) {
                votos = parseInt(votesTable.rows[n].cells[2].textContent);
                if (votos > maxVotos) {
                    maxVotos = votos;
                }
                ;
            }
            for (n = 1; n < votesTable.rows.length; n++) {
                var row = votesTable.rows[n];
                row.cells[0].innerHTML = "<b>" + (11 - n) + "</b>&nbsp;";
                row.cells[0].title = row.cells[1].textContent;
                row.cells[1].title = row.cells[1].textContent;
                row.cells[2].title = row.cells[1].textContent;
                row.cells[0].align = "right";
                row.cells[1].align = "left";
                votos = parseInt(row.cells[2].textContent);
                var pct = (100 * votos) / votosTotal;
                var width = (ANCHO_MAXIMO * votos) / maxVotos;
                row.cells[1].innerHTML = imgTpl.replace(/{WIDTH}/g, width).replace(/{PCT}/g, pct.toFixed(2));
            }

        }

        /*
         Movemos las tablas a una mila fila para que al crecer con los nuevos indices no se nos
         descuadre
         */
        function prepareMyDataTables() {
            var countriesTable = "//b[text()='Mis votos por país']/ancestor::*[position()=5]".findNode();
            var votesTable = "//b[text()='Mis votos por valor']/ancestor::*[position()=5]".findNode();
            var genTable = "//b[text()='Mis votos por género']/ancestor::*[position()=5]".findNode();
            var statsTable = "//td[text()='Nº de críticas validadas:']/ancestor::*[position()=3]".findNode();
            var persTable = "//b[text()='Datos personales']/ancestor::*[position()=5]".findNode();

            var clonPaises = countriesTable.cloneNode(true);
            clonPaises.style.marginTop = "10";
            votesTable.parentNode.appendChild(clonPaises);
            countriesTable.parentNode.removeChild(countriesTable);
            clonPaises.width = "100%";

            var clonGen = genTable.cloneNode(true);
            clonGen.style.marginTop = "10";
            statsTable.parentNode.appendChild(clonGen);
            genTable.parentNode.removeChild(genTable);
            clonGen.width = "100%";
        }

        /*
         Indices sobre nuestras votaciones
         ver http://filmaffinity.mforos.com/1360515/7122665-indices-indicadores-e-indicios/
         */
        function doAddDataIndexes() {
            var countriesTable = "//b[text()='Mis votos por país']/ancestor::*[position()=5]".findNode();
            var genTable = "//b[text()='Mis votos por género']/ancestor::*[position()=5]".findNode();
            var orig_statsTable = "//td[text()='Nº de críticas validadas:']/ancestor::*[position()=3]".findNode();
            var persTable = "//b[text()='Datos personales']/ancestor::*[position()=5]".findNode();
            var statsTable = orig_statsTable.cloneNode(true);
            statsTable.style.marginTop = "10";
            orig_statsTable.parentNode.insertBefore(statsTable, orig_statsTable.nextSibling);

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
                var clon = statsTable.rows[statsTable.rows.length - 2].cloneNode(true);
                clon.cells[0].textContent = text;
                clon.cells[1].innerHTML = "<b>" + value + "</b>";
                clon.cells[0].title = hint;
                statsTable.rows[statsTable.rows.length - 2].parentNode.insertBefore(clon, statsTable.rows[statsTable.rows.length - 1]);
            }

            var miPais = persTable.rows[5].cells[1].textContent;
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
            var totalPaises = countriesTable.rows.length - 1;
            var vistasTotal = statsTable.rows[1].cells[1].textContent;
            var mediaTotal = parseFloat(statsTable.rows[2].cells[1].textContent.replace(',', '.'));
            var vistasCastellano = 0;
            var paisesUnaPelicula = 0;
            var paisesUnaPeliculaVoto8910 = 0;
            var paisesCastellano = 0;
            var paisesPromedioMayorEEUU = 0;
            var paisesPromedioMenorEEUU = 0;

            // Recorremos la tabla de paises para obtener el resto de
            // datos
            for (var i = 1; i <= totalPaises; i++) {
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
            addToStatsTable("Rareza: ", getIndiceRareza(), "Inverso del grado de afinidad de tu última Alma Gemela.");
            addToStatsTable("Percepción de la Calidad de Hollywood: ", IPCH.toFixed(2), "Número de países con votación promedio menor que la de EE.UU. en relación a los países con votación promedio mayor a la de EE.UU. Excluyendo los países con una sola película votada.");
            addToStatsTable("Bien Documentado:", IBD.toFixed(2) + "%", "Porcentaje de documentales que has votado sobre el total votado.");
            addIndexHeader(11);

            // Como ahora duplicamos la tabla, borramos los restos de la tabla anterior
            for (var n = 0; n < 6; n++) {
                statsTable.rows[0].parentNode.removeChild(statsTable.rows[0]);
            }
            // y la ultima fila
            statsTable.rows[0].parentNode.removeChild(statsTable.rows[statsTable.rows.length - 1]);
        }

        function doAddVotesYear() {
            var url = "http://www.filmaffinity.com/es/userrep.php?user_id=" + userId;
            doGet(url, function(response) {
                // Procesamos los datos
                // Clonamos la tabla de Generos
                var genTable = "//b[text()='Mis votos por género']/ancestor::*[position()=5]".findNode();
                var yearTable = genTable.cloneNode(true);
                yearTable.rows[0].cells[0].firstChild.firstChild.textContent = "Mis votos por año";
                var emptydiv = document.createElement('div');
                emptydiv.innerHTML = response;
                var statsYearTable = "//caption[contains(text(),'Votaciones por a')]/..".findNode(emptydiv);
                if (statsYearTable != null) {
                    for (var n = 1; n < statsYearTable.rows.length; n++) {
                        var year = statsYearTable.rows[n].cells[1].textContent;
                        var votes = statsYearTable.rows[n].cells[0].textContent;
                        var mean = statsYearTable.rows[n].cells[2].textContent;
                        addLine2Table(yearTable, year, votes, mean);
                    }
                    for (n = 1; n < genTable.rows.length; n++) {
                        yearTable.rows[0].parentNode.removeChild(yearTable.rows[1]);
                    }

                    genTable.parentNode.appendChild(yearTable);
                }
            });

        }

        doAddExtraStats();
        prepareMyDataTables();
        doAlterMyVotes();
        if (getPreference("SHOWMFINDEXES", true)) doAddDataIndexes();
        doAddContinentStats();
        if (getPreference("COUNTRYDISTS", false)) doAddRegionsStats("Lingüístico", DIST_REGIONS);
        if (getPreference("SHOWYEARDATA", false)) doAddVotesYear();
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


