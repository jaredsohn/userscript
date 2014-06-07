// ==UserScript==
// @name        Facebook Fixer
// @namespace   http://userscripts.org/people/14536
// @description Enhancements for Facebook: bigger profile pictures and photos, easier viewing of albums, links to download videos, showing people's age and sign, google calendar integration, keyboard shortcuts & more. Compatible with new Facebook and fully customizable!
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @exclude     *facebook.com/logout.php*
// @exclude     *facebook.com/*logged_out*
// @exclude     *facebook.com/
// @author      Vaughan Chandler
// @timestamp   1251766198120
// ==/UserScript==

// Last updated on 2009-08-31

// TODO:
// Get to work with Google Chrome (seems to have incompletely/poorly implemented GM_ functions, in particular setvalue & getvalue?)
// Implement cross-browser XHR
// Investigate bug where script appears to loop too much when inviting to a group or suggesting friends
// Add option to change bottom menu opacity on events: mouseover, chat seesion, new message etc
// Add option to move all right column stuff on the homepage to the left column
// Add option to autoclick on 'older posts' on homepage, profiles, etc
// Remove code for unrounding profile pics if Facebook doesn't bring it back
// Add option to control how often the news feed is refreshed


(function() {
	
if (self != top) { return; } // Don't run in frames

var version_timestamp = 1251766198120; // javascript:window.alert(new Date().getTime());
var release_date = 20090831;

var loc;
var page = '';
var lastPage = '';
var listening = false;
var homePageNotModified = true;
var id = 0;
var language = 'en';
var newsFeedInterval;
var popupPicTimeout;

var lang = {
	en : {
		'AddToCalendar' : 'Add to Calendar',
		'AddToGoogleCalendar' : 'Add to Google Calendar',
		'all' : 'all',
		'All' : 'All',
		'AllPhotosLoaded' : 'All photos loaded',
		'Automatic' : 'Automatic',
		'Birthday' : '%s\'s Birthday',
		'CreatingFile' : 'Creating File',
		'Close' : 'Close',
		'ConfigureFacebookFixer' : 'Configure Facebook Fixer',
		'ConfigureInstructions' : 'All changes are saved immediately, but some changes might not take effect in tabs that are already open.',
		'ConfAge' : 'Show people\'s age on their profile (if they provide their full birthdate).',
		'ConfAutoBigAlbumPictures' : 'Automatically show bigger album pictures when the page opens.',
		'ConfAutoLoadFullAlbum' : 'Automatically load thumbnnails for all images in an album on a single page.',
		'ConfAutoLoadTaggedPhotos' : 'Automatically load thumbnnails for all tagged photos on a single page (the photos tab on people\'s profiles).',
		'ConfAutoRefreshFeed' : 'Automatically refresh the news feed every minute.', // 20090830
		'ConfBigAlbumPictures' : 'Add a link on album pages to show bigger versions of all pictures on that page.',
		'ConfBlockThirdPartyStreams' : 'Automatically block streams for 3rd party apps (use \'edit options\' below the feed to unblock).',
		'ConfBottomBarHoverOpacity' : 'On mouse-over', // 20090830
		'ConfBottomBarOpacity' : 'Bottom menu bar transparency',
		'ConfCalendarBirthDate' : 'Include the person\'s birthdate in the event details.',
		'ConfCalendarFullName' : 'Use the person\'s full name as the title for birthdays (instead of just first name).',
		'ConfChatDifferentiate' : 'Use bold and italics to differentiate between available and idle buddies.', // 20090830
		'ConfChatHideIdle' : 'Hide idle buddies.', // 20090830
		'ConfDelayPopupPics' : 'Wait 0.5 seconds before showing popup pictures.', // 20090830
		'ConfDownloadVideo' : 'Add a link to download the videos from video pages. (You may need an <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Automaticaly reload application error pages after 5 seconds.',
		'ConfExternalPopup' : 'Popup full-sized versions of external images. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Language for Facebook Fixer', // 20090830
		'ConfGoogleApps' : 'Create Google Calendar links compatible with Google Apps.',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Add links to add birthdays and events to <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Language for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHeaderEvents' : 'Birthday/Event Enhancements',
		'ConfHeaderHomePage' : 'Home Page Customization',
		'ConfHeaderMenu' : 'Menu and Chat Enhancements', // 20090830
		'ConfHeaderOther' : 'Other Options',
		'ConfHeaderPictures' : 'Picture Enhancements',
		'ConfHomeFilterList' : 'Show the filter list.',
		'ConfHomeFilterListFixed' : 'Keep the filter list visible even after scrolling down (only available when the list is in the left column).', // 20090830
		'ConfHomeFindFriends' : 'Show the Connect With Friends section.',
		'ConfHomeLeftAlign' : 'Left-align the contents of the home page.',
		'ConfHomeHighlights' : 'Show the Highlights section.',
		'ConfHomePeopleYouMayKnow' : 'Show the Suggestions section.',
		'ConfHomePokes' : 'Show the Pokes section.',
		'ConfHomeRightColumn' : 'Show the right column.',
		'ConfiCalendar' : 'Add links to download an <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> file with all birthdays.',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - Facebook Fixer configuration<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>L</b> - Start/stop Facebook Fixer from Listening for page changes<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by Facebook Fixer<br /><br /><i>From the home page</i>:<br />&nbsp;<b>f</b> or <b>l</b> - Live feed<br />&nbsp;<b>i</b> - Posted items<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfMoveFilterList' : 'Move the filter list to the top of the right column.',
		'ConfMoveHighlights' : 'Move highlights to the bottom of the right column.',
		'ConfNewTabSearch' : 'Make search results open in a new tab/window when pressing CTRL + Enter to search.',
		'ConfPageTitle' : 'Remove "Facebook |" from the title of every page.',
		'ConfPhotoPopup' : 'Popup bigger versions of photos on mouse over.',
		'ConfPopupAutoClose' : 'Close popup pictures automatically.',
		'ConfPopupPosition' : 'Position for popup pictures',
		'ConfProfilePicPopup' : 'Popup bigger versions of profile pictures on mouse over',
		'ConfProtocolLinks' : 'Turn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
		'ConfRoundedProfilePics' : 'Show rounded profile pictures.',
		'ConfSecureLinks' : 'Force Facebook links to point to HTTPS pages.', // 20090830
		'ConfShortcuts' : 'Enable keyboard shortcuts. (See the <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">list</a>)',
		'ConfSign' : 'Show people\'s sign on their profile (if they provide their birthdate).',
		'ConfTopBarFixed' : 'Keep the top menu bar on the screen, even after scrolling down.',
		'ConfTopBarHoverOpacity' : 'On mouse-over', // 20090830
		'ConfTopBarOpacity' : 'Top menu bar transparency',
		'ConfUpdates' : 'Check Userscripts.org daily for updates to Facebook Fixer. Or <a href="#" id="fbfUpdateLink" onclick="return false;">check now</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(This will take a while if you have a lot of friends)',
		'fullAlbumLoaded' : 'full album loaded',
		'Left' : 'Left',
		'ListeningRestarted' : 'Facebook Fixer has started listening for changes again.',
		'ListeningStopped' : 'Facebook Fixer has stopped listening for changes.\nPress L (SHIFT + l) to enable listening again',
		'LoadingAllPhotos' : 'Loading all photos...',
		'loadingFullAlbum' : 'loading full album...',
		'LoadingPic' : 'Loading Pic...',
		'LoadPhotosWarning' : 'Loading all photos may take a long time',
		'Months' : new Array('January','February','March','April','May','June','July','August','September','October','November','December'),
		'ProtocolSkype' : 'Call %s using Skype',
		'ProtocolMSN' : 'Chat with %s using Windows Live',
		'ProtocolYahoo' : 'Chat with %s using Yahoo Messenger',
		'ProtocolGoogle' : 'Chat with %s using Google Talk',
		'ReloadErrorPage' : 'Click to Try Again, or wait 5 seconds',
		'Remove' : 'Remove', // 20090830
		'Right' : 'Right',
		'ShowBigPictures' : 'Show Big Pictures',
		'Signs' : new Array('Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius'),
		'today' : 'today', // this is the lower case version of the text Facebook uses on the home page to mark today's birthdays
		'UpdateAvailable1' : 'An update is available for Facebook Fixer',
		'UpdateAvailable2' : 'Would you like to update now?',
		'UpdateHomepage' : 'Go to homepage',
		'UpdateInstall' : 'Install now',
		'UpdateTomorrow' : 'Remind me tomorrow',
		'yearsOld' : '%s years old'
	},
	
	// Spanish - Contributed by Glen Farmer
	// In sync with 20090729
	es : {
		'AddToCalendar' : 'Añadir a Calendario',
		'AddToGoogleCalendar' : 'Añadir a Calendario Google',
		'all' : 'todo',
		'All' : 'Todo',
		'AllPhotosLoaded' : 'Todas las fotos han sido cargadas',
		'Automatic' : 'Automatic',
		'Birthday' : 'El cumpleaños de %s',
		'CreatingFile' : 'Creando Archivo',
		'Close' : 'Cerrar',
		'ConfigureFacebookFixer' : 'Configuración de Facebook Fixer',
		'ConfigureInstructions' : 'Todos los cambios son guardados inmediatamente, pero algunos cambios no tomaran efecto en ventanas que ya esten abiertas.',
		'ConfAge' : 'Mostrar edad de las personas en sus perfiles (Solo si muestran su fecha de nacimiento).',
		'ConfAutoBigAlbumPictures' : 'Mostrar automaticamente las fotos de los álbumes grandes cuando al abrir la pagina.',
		'ConfAutoLoadFullAlbum' : 'Cargar automaticamente los THUMBNAILS de todas las imagenes de un álbum en una sola pagina.',
		'ConfAutoLoadTaggedPhotos' : 'Cargar automaticamente los THUMBNAILS de todas las fotos etiquetadas en una sola pagina (el tab de las fotos en los perfiles de las personas).',
		'ConfBigAlbumPictures' : 'Añadir un enlace en la página de los álbumes mostrar las versiones grandes de todas las fotos en esa página.',
		'ConfBlockThirdPartyStreams' : 'Bloquear automaticamente STREAMS para las applicaciones de 3ra personas (Use \'edit options\' debajo del FEED para desbloquear).',
		'ConfBottomBarOpacity' : 'Transparencia de la barra de menu de abajo',
		'ConfCalendarBirthDate' : 'Incluir la fecha de cumpleaños de las personas en los detalles de los eventos.',
		'ConfCalendarFullName' : 'Usar el nombre completo de las personas para el titulo de los cumpleaños (en vez de solo el primer nombre).',
		'ConfDownloadVideo' : 'Añadir un enlace para descargar los videos de las paginas de videos. (Puede que necesites un <a href="http://es.wikipedia.org/wiki/Flash_Video#Reproductores_FLV" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Recargar automaticamente aplicaciones con errores despues de 5 segundos',
		'ConfExternalPopup' : 'Crear un popup con las fotos externas en tamaño real. <sup>beta</sup>',
		'ConfGoogleApps' : 'Crear enlaces de Calendarios de Google compatibles con las Aplicaciones de Google.',
		'ConfGoogleAppsDomain' : 'Dominio',
		'ConfGoogleCalendar' : 'Mostrar enlaces para añadir cumpleaños y eventos a <a href="http://es.wikipedia.org/wiki/Google_Calendar" target="_blank">Calendarios de Google</a>.',
		'ConfGoogleLanguage' : 'Idiomas para <a href="http://es.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHeaderEvents' : 'Mejoras de Cumpleaños/Eventos',
		'ConfHeaderHomePage' : 'Configuracion de la página de inicio',
		'ConfHeaderOther' : 'Otras Opciones',
		'ConfHeaderPictures' : 'Mejoras de Fotos.',
		'ConfHomeFilterList' : 'Mostrar la lista del filtro.',
		'ConfHomeFindFriends' : 'Mostrar la seccion de Conecta con Amigos.', 
		'ConfHomeLeftAlign' : 'Aliniar a la izquierda el contenido de la pagina de inicio.',
		'ConfHomeHighlights' : 'Mostrar la seccion de Lo Mas Destacado.',
		'ConfHomePeopleYouMayKnow' : 'Mostrar la seccion sugerencia de amigos.',
		'ConfHomePokes' : 'Mostrar la seccion de Toques.',
		'ConfHomeRightColumn' : 'Mostrar la columna derecha.',
		'ConfiCalendar' : 'Añadir enlaces para descargar un archivo <a href="http://es.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> con todos los cumpleaños.',
		'ConfMoveFilterList' : 'Mover la seccion de Noticias a la columna derecha.',
		'ConfMoveHighlights' : 'Mover Lo Mas Destacado al final de la columna derecha.',
		'ConfNewTabSearch' : 'Hacer que los resultados de una busqueda abran en una nueva ventana/tab al presionar CTRL + Enter al hacer la busqueda.',
		'ConfPageTitle' : 'Eliminar "Facebook |" del titulo de cada pagina.',
		'ConfPhotoPopup' : 'Hacer que salga un Popup con la version grande de la foto al pasar el raton sobre la foto.',
		'ConfPopupAutoClose' : 'Cerrar el popup de la foto automaticamente.',
		'ConfPopupPosition' : 'Posicion del popup de las fotos',
		'ConfProfilePicPopup' : 'Hacer que salga un Popup con la version grande de la foto del perfil al pasar el raton sobre la foto.',
		'ConfProtocolLinks' : 'Convertir los IDs de los programas de chats de los perfiles en enlaces para comemzar un chat (Google Talk, Windows Live etc).',
		'ConfRoundedProfilePics' : 'Mostrar las fotos de perfiles con esquinas curvas.',
		'ConfShortcuts' : 'Abilitar los atajos de teclado. (Ver la <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">lista</a>)',
		'ConfSign' : 'Mostrar los signos zodiacales de las personas en sus perfiles (Si indican fecha de nacimiento).',
		'ConfTopBarFixed' : 'Mantener la barra superior de menu en la pantalla, aun cuando bajen la pagina.',
		'ConfTopBarOpacity' : 'Transparencia de la barra de menu superior',
		'ConfUpdates' : 'Revisar Userscripts.org diarimente por si hay actualizaciones en Facebook Fixer. O <a href="#" id="fbfUpdateLink" onclick="return false;">revisar Ahora</a>.',
		'DownloadVideo' : 'Descargar el Video',
		'ExportICalendarFile' : 'Exportar el archivo de iCalendar',
		'ExportICalendarFileWarning' : '(Esto puede tardar bastante dependiendo de la cantidad de amigos)',
		'fullAlbumLoaded' : 'album completamente cargado',
		'Left' : 'Izquierda',
		'ListeningRestarted' : 'Facebook Fixer esta esprando actualizaciones en la pagina.',
		'ListeningStopped' : 'Facebook Fixer no esta esprando actualizaciones en la pagina.\nPresione L (SHIFT + l) para comenzar a esperar por actualizaciones de nuevo',
		'LoadingAllPhotos' : 'Cargando todas las fotos...',
		'loadingFullAlbum' : 'Cargando albumes completos...',
		'LoadingPic' : 'Cargando Foto...',
		'LoadPhotosWarning' : 'Cargar todas las fotos puede tomar mucho tiempo',
		'Months' : new Array('enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'),
		'ProtocolSkype' : 'Llamar a  %s usando Skype',
		'ProtocolMSN' : 'Chatear con %s usando Windows Live',
		'ProtocolYahoo' : 'Chatear with %s usando Yahoo Messenger',
		'ProtocolGoogle' : 'Chatear with %s usando Google Talk',
		'ReloadErrorPage' : 'Hacer clic para intentar de nuevo o esperar 5 segundos',
		'Right' : 'Derecha',
		'ShowBigPictures' : 'Mostrar Imágenes Grandes',
		'Signs' : new Array('Capricornio','Acuario','Piscis','Aries','Tauro','Géminis ','Cancer','Leo','Virgo','Libra','Escorpio','Sagitario'),
		'today' : 'hoy',
		'UpdateAvailable1' : 'Hay una actualizacion disponible para Facebook Fixer',
		'UpdateAvailable2' : 'Desea actualizar ahora?',
		'UpdateHomepage' : 'Ir a la pagina de inicio',
		'UpdateInstall' : 'Instalar ahora',
		'UpdateTomorrow' : 'Recordarme mañana',
		'yearsOld' : '%s años'
	},
	
	// French - Contributed by Serge Thiry
	// In sync with 20090830
	fr : {
		'AddToCalendar' : 'Ajouter au calendrier',
		'AddToGoogleCalendar' : 'Ajouter au Google Agenda',
		'all' : 'tout',
		'All' : 'Tout',
		'AllPhotosLoaded' : 'Toutes les photos sont charg&eacute;es',
		'Automatic' : 'Automatique',
		'Birthday' : 'Anniversaire de %s',
		'CreatingFile' : 'Cr&eacute;ation du fichier',
		'Close' : 'Fermer',
		'ConfigureFacebookFixer' : 'Configurer Facebook Fixer',
		'ConfigureInstructions' : 'Tout changement est imm&eacute;diatement sauvegard&eacute;, mais il est possible que certains changements ne s\'actualisent pas dans des onglets d&eacute;j&agrave; ouverts.',
		'ConfAge' : 'Affichage de l\'&acirc;ge des personnes sur leur profil (si la date de naissance ins&eacute;r&eacute;e est compl&egrave;te).',
		'ConfAutoBigAlbumPictures' : 'Affichage automatique d\'images agrandies dans les albums.',
		'ConfAutoLoadFullAlbum' : 'Chargement automatique des aper&ccedil;us de toutes les images contenues dans l\'album, sur une seule page.',
		'ConfAutoLoadTaggedPhotos' : 'Chargement automatique des aper&ccedil;us de toutes les photos marqu&eacute;es, sur une seule page (l\'onglet Photos sur le profil de la personne concern&eacute;e).',
		'ConfAutoRefreshFeed' : 'Rafra&icirc;chissement automatique de la page d\'accueil toute les minutes.',
		'ConfBigAlbumPictures' : 'Ajout d\'un lien dans l\'album permettant d\'afficher une version agrandie de toutes les images de la page.',
		'ConfBlockThirdPartyStreams' : 'Blocage automatique de tout flux provenant d\'un programme tierce (utiliser \'&Eacute;diter les options\' sous le contenu de la page d\'accueil pour d&eacute;bloquer).',
		'ConfBottomBarHoverOpacity' : 'Lors du passage de la souris',
		'ConfBottomBarOpacity' : 'Transparence de la barre de menu inf&eacute;rieure',
		'ConfCalendarBirthDate' : 'Ajout de la date d\'anniversaire de la personne dans les d&eacute;tails de l\'&eacute;v&eacute;nement.',
		'ConfCalendarFullName' : 'Utilisation du nom complet de la personne lors de l\'anniversaire de celle-ci (&agrave; la place du pr&eacute;nom uniquement).',
		'ConfChatDifferentiate' : 'Utilisation du gras et de l\'italique pour diff&eacute;rencier les amis connect&eacute;s et d&eacute;connect&eacute;s.',
		'ConfChatHideIdle' : 'Cacher les amis inactifs.',
		'ConfDelayPopupPics' : 'Attendre 0.5 secondes avant d\'afficher les images en popup.',
		'ConfDownloadVideo' : 'Ajout d\'un lien de t&eacute;l&eacute;chargement de la vid&eacute;o sur la page de celle-ci. (Il peut s\'av&eacute;rer n&eacute;cessaire d\'installer un <a href="http://fr.wikipedia.org/wiki/Flash_Video#Logiciels_de_lecture_de_ce_format" target="_blank">lecteur FLV</a>)',
		'ConfErrorPageReload' : 'Rechargement automatique de la page apr&egrave;s 5 secondes en cas d\'erreur.',
		'ConfExternalPopup' : 'Affichage en popup des images externes en taille originale. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Langue utilis&eacute;e par Facebook Fixer',
		'ConfGoogleApps' : 'Cr&eacute;ation de liens Google Agenda compatibles avec les Google Apps.',
		'ConfGoogleAppsDomain' : 'Nom de domaine',
		'ConfGoogleCalendar' : 'Ajout d\'un lien pour ajouter les anniversaires et les &eacute;v&eacute;nements au <a href="http://www.google.com/intl/fr/googlecalendar/tour.html" target="_blank">Google Agenda</a>.',
		'ConfGoogleLanguage' : 'Langue utilis&eacute;e par <a href="http://fr.wikipedia.org/wiki/Google_Traduction" target="_blank">Google Traduction</a>',
		'ConfHeaderEvents' : 'Am&eacute;liorations des anniversaires/&eacute;v&eacute;nements',
		'ConfHeaderHomePage' : 'Personnalisation de la page d\'accueil',
		'ConfHeaderMenu' : 'Am&eacute;liorations du Menu et de la discussion en ligne',
		'ConfHeaderOther' : 'Autres options',
		'ConfHeaderPictures' : 'Am&eacute;lioration des images',
		'ConfHomeFilterList' : 'Affichage de la liste des filtres.',
		'ConfHomeFilterListFixed' : 'Maintien la liste des filtres &agrave; l\'&eacute;cran, m&ecirc;me apr&egrave;s &ecirc;tre descendu dans la page (uniquement lorsque la liste est dans la colonne de gauche).',
		'ConfHomeFindFriends' : 'Affichage de la section Communiquez avec vos amis.',
		'ConfHomeLeftAlign' : 'Alignement &agrave; gauche du contenu de la page d\'accueil.',
		'ConfHomeHighlights' : 'Affichage de la section Morceaux choisis.',
		'ConfHomePeopleYouMayKnow' : 'Affichage de la section Personnes que vous connaissez peut-&ecirc;tre.',
		'ConfHomePokes' : 'Affichage de la section des Pokes.',
		'ConfHomeRightColumn' : 'Affichage de la colonne de droite.',
		'ConfiCalendar' : 'Ajout d\'un lien de t&eacute;l&eacute;chargement d\'un fichier <a href="http://fr.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> contenant tous les anniversaires.',
		'ConfMoveFilterList' : 'D&eacute;placement de la liste des filtres en haut de la colonne de droite.',
		'ConfMoveHighlights' : 'D&eacute;placement des Morceaux choisis en bas de la colonne de droite.',
		'ConfNewTabSearch' : 'Fait appara&icirc;tre les r&eacute;sultats de la recherche dans un nouvel onglet/une nouvelle fen&ecirc;tre lors de l\'utilisation de CTRL + Enter pour valider la recherche.',
		'ConfPageTitle' : 'Suppression du "Facebook |" contenu dans le titre de chaque page.',
		'ConfPhotoPopup' : 'Affichage en popup de versions plus grandes des photos au passage de la souris.',
		'ConfPopupAutoClose' : 'Fermeture automatique des images en popup.',
		'ConfPopupPosition' : 'Position des images en popup',
		'ConfProfilePicPopup' : 'Affichage en popup de versions plus grandes des photos de profil au passage de la souris',
		'ConfProtocolLinks' : 'Modifie les identifiants de messagerie des profils en liens permettant de commencer une conversation instantan&eacute;ment (Google Talk, Windows Live etc).',
		'ConfRoundedProfilePics' : 'Affiche des images de profil arrondies.',
		'ConfSecureLinks' : 'Force les liens Facebook &agrave; pointer vers des pages HTTPS.',
		'ConfShortcuts' : 'Active les raccourcis clavier. (Voir la <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">liste</a>)',
		'ConfSign' : 'Affiche le signe zodiacal des personnes sur leur profil (si la date de naissance ins&eacute;r&eacute;e est compl&egrave;te).',
		'ConfTopBarFixed' : 'Maintien la barre de menu sup&eacute;rieure &agrave; l\'&eacute;cran, m&ecirc;me apr&egrave;s &ecirc;tre descendu dans la page.',
		'ConfTopBarHoverOpacity' : 'Lors du passage de la souris',
		'ConfTopBarOpacity' : 'Transparence de la barre de menu sup&eacute;rieure',
		'ConfUpdates' : 'V&eacute;rifie quotidiennement sur Userscripts.org si une mise &agrave; jour de Facebook Fixer est disponible. Ou <a href="#" id="fbfUpdateLink" onclick="return false;">v&eacute;rifier maintenant</a>.',
		'DownloadVideo' : 'T&eacute;l&eacute;charger la vid&eacute;o',
		'ExportICalendarFile' : 'Exporter en fichier iCalendar',
		'ExportICalendarFileWarning' : '(Ceci risque de prendre un moment si vous avez beaucoup d\'amis)',
		'fullAlbumLoaded' : 'l\'album complet est charg&eacute;',
		'Left' : 'Gauche',
		'ListeningRestarted' : 'Facebook Fixer s\'est remit \340 l\'\351coute des changements \351ventuels.',
		'ListeningStopped' : 'Facebook Fixer a arret\351 d\'\352tre \340 l\'\351coute des changements \351ventuels.\nAppuyez sur L (SHIFT + l) pour r\351-activer l\'\351coute',
		'LoadingAllPhotos' : 'Chargement de toutes les photos...',
		'loadingFullAlbum' : 'Chargement de l\'album complet...',
		'LoadingPic' : 'Chargement de l\'image...',
		'LoadPhotosWarning' : 'Charger toutes les photos peut prendre un moment',
		'Months' : new Array('janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'),
		'ProtocolSkype' : 'Appeler %s via Skype',
		'ProtocolMSN' : 'Discuter avec %s via Windows Live',
		'ProtocolYahoo' : 'Discuter avec %s via Yahoo Messenger',
		'ProtocolGoogle' : 'Discuter avec %s via Google Talk',
		'ReloadErrorPage' : 'Cliquez ici pour essayer &agrave; nouveau, ou attendez 5 secondes',
		'Remove' : 'Cacher',
		'Right' : 'Droite',
		'ShowBigPictures' : 'Afficher les images en plus grand',
		'Signs' : new Array('Capricorne','Verseau','Poissons','Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire'),
		'today' : 'aujourd\'hui',
		'UpdateAvailable1' : 'Une mise &agrave; jour de Facebook Fixer est disponible',
		'UpdateAvailable2' : 'Voulez-vous installer la mise &agrave; jour ?',
		'UpdateHomepage' : 'Aller &agrave; la page principale',
		'UpdateInstall' : 'Installer maintenant',
		'UpdateTomorrow' : 'Me le rappeler demain',
		'yearsOld' : '%s ans'
	},
	
	// Italian - Contributed by Dario Archetti
	// In sync with 20090729
	it : {
		'AddToCalendar' : 'Aggiungi al calendario',
		'AddToGoogleCalendar' : 'Aggiungi a Google Calendar',
		'all' : 'tutto',
		'All' : 'Tutto',
		'AllPhotosLoaded' : 'Tutte le foto sono state caricate.',
		'Automatic' : 'Automatico',
		'Birthday' : 'Il compleanno di %s',
		'CreatingFile' : 'Sto creando il file',
		'Close' : 'Chiudi',
		'ConfigureFacebookFixer' : 'Impostazioni di Facebook Fixer',
		'ConfigureInstructions' : 'I cambiamenti vengono salvati immediatamente, ma alcuni possono non avere effetto nelle schede già aperte.',
		'ConfAge' : 'Mostra l\'età nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfAutoBigAlbumPictures' : 'Negli album mostra automaticamente immagini più grandi quando la pagina si apre.',
		'ConfAutoLoadFullAlbum' : 'Carica automaticamente le anteprime di tutte le immagini in un album o in una pagina.',
		'ConfAutoLoadTaggedPhotos' : 'Carica automaticamente le anteprime di tutte le foto taggate in una pagina (nella sezione "Foto" dei profili).',
		'ConfBigAlbumPictures' : 'Aggiungi un link negli album per mostrare una versione più grande di ogni foto nella pagina.',
		'ConfBlockThirdPartyStreams' : 'Blocca automaticamente le notizie delle applicazioni di terze parti (usa \'Modifica opzioni\' sotto la lista per modificare).',
		'ConfBottomBarOpacity' : 'Trasparenza della barra inferiore',
		'ConfCalendarBirthDate' : 'Includi il compleanno di una persona nei dettagli dell\'evento.',
		'ConfCalendarFullName' : 'Usa il nome completo di una persona come titolo per i compleanni. (invece che soltanto il nome).',
		'ConfDownloadVideo' : 'Aggiungi un link per scaricare i video. (Per riprodurli avrai bisogno di un <a href="http://it.wikipedia.org/wiki/Flash_Video" target="_blank">programma esterno</a>)',
		'ConfErrorPageReload' : 'Dopo 5 secondi ricarica automaticamente la pagina di errore di un\'applicazione.',
		'ConfExternalPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle immagini esterne. <sup>beta</sup>',
		'ConfGoogleApps' : 'Crea un link a Google Calendar compatibile con Google Apps.',
		'ConfGoogleAppsDomain' : 'Dominio',
		'ConfGoogleCalendar' : 'Aggiungi link per inserire compleanni ed eventi a <a href="http://it.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Lingua per <a href="http://it.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHeaderEvents' : 'Miglioramenti di compleanni ed eventi',
		'ConfHeaderHomePage' : 'Personalizzazione della homepage',
		'ConfHeaderOther' : 'Altre opzioni',
		'ConfHeaderPictures' : 'Miglioramenti delle immagini',
		'ConfHomeFilterList' : 'Mostra la lista dei filtri.',
		'ConfHomeFindFriends' : 'Mostra la sezione "Connettiti con i tuoi amici".',
		'ConfHomeLeftAlign' : 'Allinea a sinistra il contenuto della homepage.',
		'ConfHomeHighlights' : 'Mostra la sezione "In primo piano".',
		'ConfHomePeopleYouMayKnow' : 'Mostra la sezione "Persone che potresti conoscere".',
		'ConfHomePokes' : 'Mostra la sezione "Poke".',
		'ConfHomeRightColumn' : 'Mostra la colonna di destra.',
		'ConfiCalendar' : 'Aggiungi link per scaricare un file di <a href="http://it.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> con tutti i compleanni.',
		'ConfShortcutList' : '<b>Scorciatoie da tastiera</b> (Viene rilevata la differenza maiuscolo/minuscolo):<br /><br /><i>Da ogni pagina:</i><br />&nbsp;<b>A</b> - Album/Foto<br />&nbsp;<b>B</b> - Apri la lista degli amici online<br />&nbsp;<b>C</b> - Configurazione di Facebook Fixer<br />&nbsp;<b>F</b> - Amici<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Posta<br />&nbsp;<b>L</b> - Attiva/disattiva il rilevamento dei cambiamenti della pagina da parte di Facebook Fixer<br />&nbsp;<b>N</b> - Notifiche<br />&nbsp;<b>P</b> - Il tuo profilo<br />&nbsp;<b>T</b> - Traduci il testo selezionato<br />&nbsp;<b>&lt;escape&gt;</b> - Chiudi i popup creati da Facebook Fixer<br /><br /><i>Dalla homepage</i>:<br />&nbsp;<b>f</b> o <b>l</b> - Live feed<br />&nbsp;<b>i</b> - Elementi pubblicati<br />&nbsp;<b>n</b> - Notizie<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>s</b> o <b>u</b> - Aggiornamenti di stato<br /><br /><i>Dai profili</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Riquadri<br /><br /><i>Dalle pagine con numeri di pagina (precedente, successiva, etc)</i><br />&nbsp;<b>&lt;freccia sinistra&gt;</b> - Precedente<br />&nbsp;<b>&lt;freccia destra&gt;</b> - Successiva<br />&nbsp;<b>&lt;shift&gt; + &lt;freccia destra&gt;</b> - Prima pagina (se disponibile)<br />&nbsp;<b>&lt;shift&gt; + &lt;freccia destra&gt;</b> - Ultima pagina (se disponibile)<br /><br /><i>Mentre si guardano album/foto:</i><br />&nbsp;<b>a</b> - Carica tutte le antepime (se disponibile)<br />&nbsp;<b>b</b> - Mostra immagini grandi<br />&nbsp;<b>c</b> - Mostra i commenti<br />&nbsp;<b>k</b> - Torna all\'album<br />&nbsp;<b>m</b> - Foto con me (ed altri)<br /><br /><i>Mentre si guardano album e foto caricate/taggate di recente:</i><br />&nbsp;<b>a</b> o &nbsp;<b>r</b> - Album recenti<br />&nbsp;<b>m</b> o &nbsp;<b>u</b> - Caricate da dispositivi mobiili<br />&nbsp;<b>o</b> - Foto con me.<br />&nbsp;<b>p</b> - Le mie foto<br />&nbsp;<b>t</b> o &nbsp;<b>f</b> - Amici taggati',
		'ConfMoveFilterList' : 'Sposta la lista dei filtri in cima alla colonna di destra.',
		'ConfMoveHighlights' : 'Sposta la sezione "In primo piano" in fondo alla colonna di destra.',
		'ConfNewTabSearch' : 'Fai in modo che i risultati delle ricerche si aprano in una nuova scheda quando si preme CTRL + Invio per cercare.',
		'ConfPageTitle' : 'Rimuovi "Facebook |" dal titolo di ciascuna pagina.',
		'ConfPhotoPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle foto.',
		'ConfPopupAutoClose' : 'Chiudi il popup automaticamente.',
		'ConfPopupPosition' : 'Posizione del popup',
		'ConfProfilePicPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle immagini dei profili.',
		'ConfProtocolLinks' : 'Converti gli ID di messaggistica nei profili in link che iniziano una conversazione. (Google Talk, Windows Live etc).',
		'ConfRoundedProfilePics' : 'Arrotonda le immagini dei profili.',
		'ConfShortcuts' : 'Attiva le scorciatoie da tastiera. (Guarda la <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">lista</a>)',
		'ConfSign' : 'Mostra il segno zodiacale nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfTopBarFixed' : 'Mantieni fissa la posizione della barra superiore.',
		'ConfTopBarOpacity' : 'Trasparenza della barra superiore',
		'ConfUpdates' : 'Controlla ogni giorno Userscripts.org per eventuali update, oppure <a href="#" id="fbfUpdateLink" onclick="return false;">controlla adesso!</a>.',
		'DownloadVideo' : 'Scarica il video.',
		'ExportICalendarFile' : 'Esporta file di iCalendar.',
		'ExportICalendarFileWarning' : '(Questo impiegherà un po\' se hai molti amici!)',
		'fullAlbumLoaded' : 'l\'album completo è stato caricato.',
		'Left' : 'Sinistra',
		'ListeningRestarted' : 'Registrazione dei cambiamenti da parte di Facebook Fixer attivata.',
		'ListeningStopped' : 'Registrazione dei cambiamenti da parte di Facebook Fixer disattivata.\nPremi L (SHIFT + l) per riabilitare la registrazione.',
		'LoadingAllPhotos' : 'Sto caricando tutte le foto...',
		'loadingFullAlbum' : 'Sto caricando l\'album completo...',
		'LoadingPic' : 'Sto caricando l\'immagine...',
		'LoadPhotosWarning' : 'Il caricamento di tutte le immagini può richiedere qualche minuto.',
		'Months' : new Array('Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'),
		'ProtocolSkype' : 'Chiama %s usando Skype',
		'ProtocolMSN' : 'Chatta con %s usando Windows Live',
		'ProtocolYahoo' : 'Chatta con %s usando Yahoo Messenger',
		'ProtocolGoogle' : 'Chatta con %s usando Google Talk.',
		'ReloadErrorPage' : 'Clicca per riprovare, oppure aspetta 5 secondi.',
		'Right' : 'Destra',
		'ShowBigPictures' : 'Mostra immagini a grandi dimensioni.',
		'Signs' : new Array('Capricorno','Aquario','Pesci','Ariete','Toro','Gemelli','Cancro','Leone','Vergine','Bilancia','Scorpione','Sagittario'),
		'today' : 'oggi',
		'UpdateAvailable1' : 'È disponibile un update per Facebook Fixer.',
		'UpdateAvailable2' : 'Vuoi scaricare l\'aggiornamento adesso?',
		'UpdateHomepage' : 'Visita la Homepage',
		'UpdateInstall' : 'Installa ora.',
		'UpdateTomorrow' : 'Ricordamelo domani.',
		'yearsOld' : '%s anni.'
	},
	
	// German - Contributed by Constantin Groß
	// In sync with 20090830
	de : {
		'AddToCalendar' : 'Zu Kalender hinzugügen',
		'AddToGoogleCalendar' : 'Zu Google Kalender hinzufügen',
		'all' : 'alle',
		'All' : 'Alle',
		'AllPhotosLoaded' : 'Alle Fotos geladen',
		'Automatic' : 'Automatisch',
		'Birthday' : '%ss Geburtstag',
		'CreatingFile' : 'Erstelle Datei',
		'Close' : 'Schließen',
		'ConfigureFacebookFixer' : 'Facebook Fixer konfigurieren',
		'ConfigureInstructions' : 'Alle Änderungen werden sofort gespeichert, aber einige Änderungen können in bereits offenen Tabs nicht angewendet werden.',
		'ConfAge' : 'Alter von Personen im Profil anzeigen (wenn das volle Geburtsdatum angegeben wurde).',
		'ConfAutoBigAlbumPictures' : 'Automatisch größere Albenbilder beim öffnen der Seite anzeigen.',
		'ConfAutoLoadFullAlbum' : 'Vorschaubilder für alle Bilder eines Albums automatisch laden.',
		'ConfAutoLoadTaggedPhotos' : 'Vorschaubilder für alle getaggten Bilder automatisch laden (Fotos-Tab auf der Profilseite).',
		'ConfAutoRefreshFeed' : 'News-Feed automatisch jede Minute aktualisieren.',
		'ConfBigAlbumPictures' : 'Link auf Albumseiten hinzüfügen, über den größere Versionen aller Bilder angezeigt werden können.',
		'ConfBlockThirdPartyStreams' : 'Streams für Applikationen von Drittanbietern automatisch blockieren (\'edit options\' unter dem Feed verwenden, um ihn zuzulassen).',
		'ConfBottomBarHoverOpacity' : 'Bei Mouse-Over',
		'ConfBottomBarOpacity' : 'Transparenz der unteren Menüleiste',
		'ConfCalendarBirthDate' : 'Geburtstage in Event-Details anzeigen.',
		'ConfCalendarFullName' : 'Vollständigen Namen bei Geburtstagen anzeigen (statt nur den Vornamen).',
		'ConfChatDifferentiate' : 'Fett- und Kursiv-Formatierung zur Unterscheidung zwischen online- und offline-Freunden verwenden.',
		'ConfChatHideIdle' : 'Freunde, die offline sind verstecken.',
		'ConfDelayPopupPics' : '0,5 Sekunden warten, bevor die Popup-Bilder gezeigt werden.',
		'ConfDownloadVideo' : 'Link zum Herunterladen von Videos hinzufügen. (Es wird evtl. ein <a href="http://de.wikipedia.org/wiki/Flash_Video#Abspielen_im_Videoplayer" target="_blank">FLV-Player</a> benötigt)',
		'ConfErrorPageReload' : 'Fehlerseiten von Applikationen automatisch nach 5 Sekunden neu laden.',
		'ConfExternalPopup' : 'Externe Bilder in Originalgröße im Popup anzeigen. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Sprache für Facebook Fixer',
		'ConfGoogleApps' : 'Google Kalender Links kompatibel zu Google Apps erstellen.',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Links hinzufügen, um Geburtstage und Veranstaltungen zu <a href="http://de.wikipedia.org/wiki/Google_Kalender" target="_blank">Google Kalender</a> hinzuzufügen.',
		'ConfGoogleLanguage' : 'Sprache für <a href="http://translate.google.de/#" target="_blank">Google Übersetzer</a>',
		'ConfHeaderEvents' : 'Geburtstags- & Veranstaltungs-Erweiterungen',
		'ConfHeaderHomePage' : 'Startseite anpassen',
		'ConfHeaderMenu' : 'Menü- und Chaterweiterungen',
		'ConfHeaderOther' : 'Sonstige Einstellungen',
		'ConfHeaderPictures' : 'Bilder-Erweiterungen',
		'ConfHomeFilterList' : 'Filterliste anzeigen.',
		'ConfHomeFilterListFixed' : 'Filterliste auch beim Herunterscrollen sichtbar belassen (nur verfügbar, wenn sich die Liste in der Linken Spalte befindet).',
		'ConfHomeFindFriends' : '"Mit Freunden in Verbindung treten" anzeigen.',
		'ConfHomeLeftAlign' : 'Startseiteninhalte linksorientiert ausrichten.',
		'ConfHomeHighlights' : '"Höhepunkte" anzeigen.',
		'ConfHomePeopleYouMayKnow' : '"Vorschläge" anzeigen.',
		'ConfHomePokes' : '"Anstupser" anzeigen.',
		'ConfHomeRightColumn' : 'Rechte Spalte anzeigen.',
		'ConfiCalendar' : 'Link zum herunterladen einer <a href="http://de.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-Datei mit allen Geburtstagen hinzufügen.',
		'ConfShortcutList' : '<b>Tastenkürzel</b> (Groß-/Kleinschreibung beachten!):<br /><br /><i>Auf jeder Seite:</i><br />&nbsp;<b>A</b> - Alben/Fotos<br />&nbsp;<b>B</b> - Chatliste ein-/ausblenden<br />&nbsp;<b>C</b> - Facebook Fixer Einstellungen<br />&nbsp;<b>F</b> - Freunde<br />&nbsp;<b>H</b> - Startseite<br />&nbsp;<b>I</b> - Postfach<br />&nbsp;<b>L</b> - Reagieren von Facebook Fixer auf Seitenänderung ein-/ausschalten<br />&nbsp;<b>N</b> - Benachrichtigungen<br />&nbsp;<b>P</b> - Mein Profil<br />&nbsp;<b>T</b> - Markierten Text übersetzen<br />&nbsp;<b>&lt;escape&gt;</b> - Von Facebook Fixer erstellte Popups schließen<br /><br /><i>Auf der Startseite</i>:<br />&nbsp;<b>f</b> oder <b>l</b> - Live-Feed<br />&nbsp;<b>i</b> - Posted items<br />&nbsp;<b>n</b> - News-Feed<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>s</b> oder <b>u</b> - Status-Updates<br /><br /><i>Auf Profilseiten</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Pinnwand<br />&nbsp;<b>x</b> - Felder<br /><br /><i>Auf Seiten mit Seitenzahlen (zurück, vor, etc)</i><br />&nbsp;<b>&lt;Pfeil-nach-Links&gt;</b> - Zurück<br />&nbsp;<b>&lt;Pfeil-nach-Rechts&gt;</b> - Vor<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Links&gt;</b> - Erste (wenn verfügbar)<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Rechts&gt;</b> - Letzte (wenn verfügbar)<br /><br /><i>Bei der Anzeige von Alben & Fotos:</i><br />&nbsp;<b>a</b> - Alle Vorschaubilder laden (wenn verfügbar)<br />&nbsp;<b>b</b> - Große Bilder anzeigen<br />&nbsp;<b>c</b> - Kommentare anzeigen<br />&nbsp;<b>k</b> - Zurück zum Album<br />&nbsp;<b>m</b> - Fotos der Person und mir<br /><br /><i>Bei neuen Alben und getaggten/hochgeladenen Fotos:</i><br />&nbsp;<b>a</b> oder &nbsp;<b>r</b> - Neue Alben<br />&nbsp;<b>m</b> oder &nbsp;<b>u</b> - Mobile Uploads<br />&nbsp;<b>o</b> - Fotos von mir<br />&nbsp;<b>p</b> - Meine Fotos<br />&nbsp;<b>t</b> oder &nbsp;<b>f</b> - Getaggte Freunde',
		'ConfMoveFilterList' : 'Filterliste nach oben rechts in der rechten Spalte verlegen.',
		'ConfMoveHighlights' : '"Höhepunkte" ans Ende der rechten Spalte verschieben.',
		'ConfNewTabSearch' : 'Suchergebnisse in einem neuen Tab/Fenster öffnen, wenn für die Suche STRG + Enter gedrückt wurde.',
		'ConfPageTitle' : '"Facebook |" überall aus dem Seitentitel entfernen.',
		'ConfPhotoPopup' : 'Größere Versionen von Fotos im Popup anzeigen, wenn sie mit der Maus berührt werden.',
		'ConfPopupAutoClose' : 'Bilder-Popup automatisch schließen.',
		'ConfPopupPosition' : 'Position des Bilder-Popups',
		'ConfProfilePicPopup' : 'Größere Profilbilder im Popup anzeigen, wenn sie mit der Maus berührt werden',
		'ConfProtocolLinks' : 'Messenger-IDs der Profile in Links umwandeln, über die eine Kommunikation gestartet werden kann (Google Talk, Windows Live etc).',
		'ConfRoundedProfilePics' : 'Abgerundete Profilbilder anzeigen.',
		'ConfSecureLinks' : 'HTTPS-Verbindung für alle Facebook-Links verwenden.',
		'ConfShortcuts' : 'Tastenkürzel aktivieren. (<a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">Liste ansehen</a>)',
		'ConfSign' : 'Sternzeichen im Profil anzeigen (wenn das volle Geburtsdatum angegeben wurde).',
		'ConfTopBarFixed' : 'Obere Menüleiste auch beim Scrollen anzeigen.',
		'ConfTopBarHoverOpacity' : 'Bei Mouse-Over',
		'ConfTopBarOpacity' : 'Transparenz der oberen Menüleiste',
		'ConfUpdates' : 'UÜberprüfen Sie Userscripts.org täglich auf Updates für Facebook Fixer. <a href="#" id="fbfUpdateLink" onclick="return false;">Jetzt überprüfen</a>.',
		'DownloadVideo' : 'Video herunterladen',
		'ExportICalendarFile' : 'iCalendar-Export',
		'ExportICalendarFileWarning' : '(kann bei einer großen Zahl an Freunden eine Weile dauern)',
		'fullAlbumLoaded' : 'Album vollständig geladen',
		'Left' : 'Links',
		'ListeningRestarted' : 'Facebook Fixer reagiert wieder auf Änderungen.',
		'ListeningStopped' : 'Facebook Fixer reagiert nicht auf Änderungen.\nL (SHIFT + l) drücken, um die Reaktion wieder zu aktvieren.',
		'LoadingAllPhotos' : 'Lade alle Fotos...',
		'loadingFullAlbum' : 'Lade komplettes Album...',
		'LoadingPic' : 'Lade Bild...',
		'LoadPhotosWarning' : 'Das Laden aller Bilder kann längere Zeit dauern',
		'Months' : new Array('Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'),
		'ProtocolSkype' : '%s per Skype anrufen',
		'ProtocolMSN' : 'Mit %s per Windows Live chatten',
		'ProtocolYahoo' : 'Mit %s per Yahoo Messenger chatten',
		'ProtocolGoogle' : 'Mit %s per Google Talk chatten',
		'ReloadErrorPage' : 'Klicken, um es erneut zu versuchen, oder 5 Sekunden warten',
		'Remove' : 'Entfernen',
		'Right' : 'Rechts',
		'ShowBigPictures' : 'Große Bilder anzeigen',
		'Signs' : new Array('Steinbock','Wassermann','Fische','Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze'),
		'today' : 'heute',
		'UpdateAvailable1' : 'Es gibt ein Update für Facebook Fixer',
		'UpdateAvailable2' : 'Update jetzt herunterladen?',
		'UpdateHomepage' : 'Zur Webseite',
		'UpdateInstall' : 'Jetzt installieren',
		'UpdateTomorrow' : 'Morgen erinnern',
		'yearsOld' : '%s Jahre alt'
	},
	
	// Bulgarian - Contributed by Svetlozar Mladenoff
	// In sync with 20090830
	bg : {
		'AddToCalendar' : 'Добавяне към Календар',
		'AddToGoogleCalendar' : 'Добавяне към Google Calendar',
		'all' : 'всички',
		'All' : 'Всички',
		'AllPhotosLoaded' : 'Всички снимки са заредени',
		'Automatic' : 'Автоматично',
		'Birthday' : 'Рождения ден на %s',
		'CreatingFile' : 'Създаване на файл',
		'Close' : 'Затваряне',
		'ConfigureFacebookFixer' : 'Конфигуриране на Facebook Fixer',
		'ConfigureInstructions' : 'Всички промени се запаметяват веднага, но някои може да не придобият ефект при вече отворени табове.',
		'ConfAge' : 'Показване на възрастта (ако потребителите са представили пълна рождена дата).',
		'ConfAutoBigAlbumPictures' : 'Автоматично показване на по-големи снимки от албумите, когато страницата се зареди.',
		'ConfAutoLoadFullAlbum' : 'Автоматично зареждане на превюта за всички картини в албум, събиращи се на една страница.',
		'ConfAutoLoadTaggedPhotos' : 'Автоматично зареждане на превюта на всички тагнати снимки, събиращи се на една страница (табът Снимки на профила).',
		'ConfAutoRefreshFeed' : 'Автоматично опресняване на новините всяка минута.',
		'ConfBigAlbumPictures' : 'Добавяне на връзка на страницата с албуми за показване на увеличени версии на всички снимки, съществуващи на тази страница.',
		'ConfBlockThirdPartyStreams' : 'Автоматично блокиране на потоците от приложения на трети партии (използвайте  \'настройки\' под фийда за разблокиране).',
		'ConfBottomBarHoverOpacity' : 'При курсор отгоре',
		'ConfBottomBarOpacity' : 'Прозрачност на долното меню',
		'ConfCalendarBirthDate' : 'Включване на рождената дата на потребителя в детайлите на събитието.',
		'ConfCalendarFullName' : 'Използване на трите имена на човека като заглавие за рождените дни (в замяна на само първото име).',
		'ConfChatDifferentiate' : 'Използване на удебелен и наклонен шрифт за различаване на приятели на линия и офлайн.',
		'ConfChatHideIdle' : 'Скриване на офлайн-приятелите.',
		'ConfDelayPopupPics' : 'Изчакване от половин секунда преди показване на превю на снимка.',
		'ConfDownloadVideo' : 'Добавяне на връзка за теглене от видео страниците. (Може да ви трябва <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV плейър</a>)',
		'ConfErrorPageReload' : 'Автоматично презареждане на страниците с грешки от приложения след 5 секунди.',
		'ConfExternalPopup' : 'Пълен размер на външните картинки при превю. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Език за Facebook Fixer',
		'ConfGoogleApps' : 'Създаване на Google Calendar връзки, съвместими с Google Apps.',
		'ConfGoogleAppsDomain' : 'Домейн',
		'ConfGoogleCalendar' : 'Добавяне на връзки за прибавяне на рождени дни и събития в <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Език за <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHeaderEvents' : 'Подобрения за Рожден Ден/Събитие',
		'ConfHeaderHomePage' : 'Персонализиране на главната страница',
		'ConfHeaderMenu' : 'Подобрения на меню и чат',
		'ConfHeaderOther' : 'Други възможности',
		'ConfHeaderPictures' : 'Графични подобрения',
		'ConfHomeFilterList' : 'Показване на списъка с филтри.',
		'ConfHomeFilterListFixed' : 'Запазване на списъка с филтри видим, дори след скролиране (само ако списъка се намира в лявата колона).',
		'ConfHomeFindFriends' : 'Показване на Свържете се с приятели секцията.',
		'ConfHomeLeftAlign' : 'Ляво подравняване на съдържанието на главната страница.',
		'ConfHomeHighlights' : 'Показване на секция Акценти.',
		'ConfHomePeopleYouMayKnow' : 'Показване на секция Предложения.',
		'ConfHomePokes' : 'Показване на секцията за Сръчквания.',
		'ConfHomeRightColumn' : 'Показване на дясната колона.',
		'ConfiCalendar' : 'Добавяне на връзки за изтегляне на <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-файл с всички рождени дни.',
		'ConfShortcutList' : '<b>Бързи бутони</b> (големи/малки чувствителни):<br /><br /><i>От коя да е страница:</i><br />&nbsp;<b>A</b> - Албуми/снимки<br />&nbsp;<b>B</b> - Превключване на списък Приятели на линия<br />&nbsp;<b>C</b> - Конфигуруране на Facebook Fixer<br />&nbsp;<b>F</b> - Приятели<br />&nbsp;<b>H</b> - Главна страница<br />&nbsp;<b>I</b> - Входяща кутия<br />&nbsp;<b>L</b> - Разрешаване/Забраняване на Facebook Fixer да проверява за промени по страниците<br />&nbsp;<b>N</b> - Известия<br />&nbsp;<b>P</b> - Профил<br />&nbsp;<b>T</b> - Превод на маркирания текст<br />&nbsp;<b>&lt;escape&gt;</b> - Затваряне на изскачащи прозорци, отворени от Facebook Fixer<br /><br /><i>На заглавната страница</i>:<br />&nbsp;<b>f</b> or <b>l</b> - Новини на живо<br />&nbsp;<b>i</b> - Публикации<br />&nbsp;<b>n</b> - Новини<br />&nbsp;<b>p</b> - Снимки<br />&nbsp;<b>s</b> или <b>u</b> - Промени в статуса<br /><br /><i>На профилите</i>:<br />&nbsp;<b>i</b> - Инфо<br />&nbsp;<b>p</b> - Снимки<br />&nbsp;<b>w</b> - Стена<br />&nbsp;<b>x</b> - Кутии<br /><br /><i>На страници с навигация (предишна, следваща и т.н.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Предишна<br />&nbsp;<b>&lt;right arrow&gt;</b> - Следваща<br />&nbsp;<b>&lt;Shift&gt; + &lt;left arrow&gt;</b> - Първа (когато е възможно)<br />&nbsp;<b>&lt;Shift&gt; + &lt;right arrow&gt;</b> - Последна (когато е възможно)<br /><br /><i>При разглеждане на албуми/снимки:</i><br />&nbsp;<b>a</b> - Зареждане на всички превюта (когато е възможно)<br />&nbsp;<b>b</b> - Показване на големи снимки<br />&nbsp;<b>c</b> - Преглед на коментарите<br />&nbsp;<b>k</b> - Назад към албума<br />&nbsp;<b>m</b> - Снимки на (някой) и мен<br /><br /><i>При разглеждане на скорошни албуми и качени/тагнати снимки:</i><br />&nbsp;<b>a</b> или &nbsp;<b>r</b> - Скорошни албуми<br />&nbsp;<b>m</b> или &nbsp;<b>u</b> - Качвания от мобилно устройство<br />&nbsp;<b>o</b> - Снимки с мен<br />&nbsp;<b>p</b> - Мои снимки<br />&nbsp;<b>t</b> или &nbsp;<b>f</b> - Тагнати приятели',
		'ConfMoveFilterList' : 'Преместване на списъка с филтри най-отгоре на дясната колона.',
		'ConfMoveHighlights' : 'Преместване Акценти най-отдолу на дясната колона.',
		'ConfNewTabSearch' : 'Резултатите от търсения да се отварят в нов таб/прозорец, когато е натиснат Ctrl + Enter при търсене.',
		'ConfPageTitle' : 'Премахване на "Facebook |" от заглавието на всяка страница.',
		'ConfPhotoPopup' : 'Показване на по-големи превюта на снимките при курсор отгоре.',
		'ConfPopupAutoClose' : 'Автоматично затваряне на изскачащите картинки.',
		'ConfPopupPosition' : 'Позиция на изскачащите картинки',
		'ConfProfilePicPopup' : 'Показване на по-големи превюта на профилните снимки при курсор отгоре',
		'ConfProtocolLinks' : 'Превръщане на ID-тата по профилите във връзки, който започват разговор (Google Talk, Windows Live и т.н.).',
		'ConfRoundedProfilePics' : 'Показване на заоблени профилни снимки.',
		'ConfSecureLinks' : 'Принуждаване на Facebook връзките да водят до HTTPS страници.',
		'ConfShortcuts' : 'Разрешаване на Бързи бутони. (Вижте <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">списъка</a>)',
		'ConfSign' : 'Показване зодията по профилите (ако е въведена рождена дата).',
		'ConfTopBarFixed' : 'Запазване на горното меню на екрана, дори при скролиране.',
		'ConfTopBarHoverOpacity' : 'При курсор отгоре',
		'ConfTopBarOpacity' : 'Прозрачност на горното меню',
		'ConfUpdates' : 'Проверяване на Userscripts.org ежедневно за ъпдейти на Facebook Fixer. Или <a href="#" id="fbfUpdateLink" onclick="return false;">проверка сега</a>.',
		'DownloadVideo' : 'Смъкване на видеото',
		'ExportICalendarFile' : 'Експортиране в iCalendar-файл',
		'ExportICalendarFileWarning' : '(Това ще отнеме време, ако имате много приятели)',
		'fullAlbumLoaded' : 'целият албум е зареден',
		'Left' : 'Отляво',
		'ListeningRestarted' : 'Facebook Fixer възстанови проверките за промени.',
		'ListeningStopped' : 'Facebook Fixer спря проверките за промени.\nНатиснете L (Shift + l) за повторно пускане',
		'LoadingAllPhotos' : 'Зареждане на всички снимки...',
		'loadingFullAlbum' : 'зареждане на целия албум...',
		'LoadingPic' : 'Зареждане на снимката...',
		'LoadPhotosWarning' : 'Зареждането на всички снимки може да отнеме много време',
		'Months' : new Array('Януари','Февруари','Март','Април','Май','Юни','Юли','Август','Септември','Октомври','Ноември','Декември'),
		'ProtocolSkype' : 'Обаждане на %s по Skype',
		'ProtocolMSN' : 'Чат с %s чрез Windows Live',
		'ProtocolYahoo' : 'Чат с %s чрез Yahoo Messenger',
		'ProtocolGoogle' : 'Чат с %s чрез Google Talk',
		'ReloadErrorPage' : 'Кликнете за повторен опит или изчакайте 5 секунди',
		'Remove' : 'Премахване',
		'Right' : 'Отдясно',
		'ShowBigPictures' : 'Показване на големи снимки',
		'Signs' : new Array('Козирог','Водолей','Риби','Овен','Телец','Близнаци','Рак','Лъв','Дева','Везни','Скорпион','Стрелец'),
		'today' : 'днес',
		'UpdateAvailable1' : 'Излязло е обновление на Facebook Fixer',
		'UpdateAvailable2' : 'Желаете ли да обновите сега?',
		'UpdateHomepage' : 'Към главната страница',
		'UpdateInstall' : 'Инсталиране сега',
		'UpdateTomorrow' : 'Напомняне утре',
		'yearsOld' : 'на %s години'
	}

}

//
// Greasemonkey functions / cross-browser stuff
//

function setValue(key, value) {
	if (typeof GM_setValue !== 'undefined') { GM_setValue(id+'-'+key, value); }
	else if (navigator.cookieEnabled) {
		var d = new Date();
		d.setTime(new Date().getTime()+31536000000);
		document.cookie = 'fbf-' + id + '-' + key + "=" + escape(value) + ";expires=" + d.toGMTString() + ';domain=.facebook.com';
	}
	prefs[key] = value;
}

function getValue(key, value) {
	if (typeof GM_getValue !== 'undefined') { return GM_getValue(id+'-'+key, value); }
	else if (navigator.cookieEnabled && document.cookie.length>0) {
		var c_name = 'fbf-' + id + '-' + key;
		var c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) {
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			var val = unescape(document.cookie.substring(c_start,c_end));
			if (val=='true') { return true; }
			else if (val=='false') { return false; }
			else if (val) { return val; }
		}
	}
	return value;
}

function log(str) {
	if (typeof GM_log !== 'undefined') { return GM_log(str); }
	else if (typeof console !== 'undefined' && console.log) { console.log(str); }
}

function addStyle(css) {
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
	}
}

function registerMenuCommand(name, func) {
	if (typeof GM_registerMenuCommand !== 'undefined') { return GM_registerMenuCommand(name, func); }
}

function xmlhttpRequest(params, callBack) {
	if (typeof GM_xmlhttpRequest !== 'undefined') {
		params['onload'] = callBack;
		return GM_xmlhttpRequest(params);
	}
	return null;
}

function openInTab(url) {
	if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
	else { window.open(url); }
}


//
// Enable profile-specific settings
//
try {
	var profileLink = document.evaluate("//a[contains(@href,'ref=profile')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
	if (m = profileLink.href.match(/\/([a-z0-9\.]+)\?ref=profile/)) { id = m[1]; }
	else if (m = profileLink.href.match(/id=(\d+)\b/)) { id = m[1]; }
} catch(x) {}
//log('id = ' + id); // DEBUG ONLY
var buf = 'ProfilePicPopup,PhotoPopup,ExternalPopup,!DelayPopupPics,PopupAutoClose,BigAlbumPictures,!AutoBigAlbumPictures,!AutoLoadFullAlbum,!AutoLoadTaggedPhotos,Age,Sign,iCalendar,GoogleCalendar,CalendarFullName,CalendarBirthDate,!GoogleApps,ChatDifferentiate,!ChatHideIdle,AutoRefreshFeed,!HomeLeftAlign,!MoveFilterList,HomeFilterList,!HomeFilterListFixed,HomeRightColumn,HomeHighlights,HomePokes,HomePeopleYouMayKnow,HomeFindFriends,MoveHighlights,!BlockThirdPartyStreams,DownloadVideo,ErrorPageReload,PageTitle,NewTabSearch,!SecureLinks,Updates,ProtocolLinks,!TopBarFixed,Shortcuts';
var booleanOptions = buf.split(',');
var prefs = {
	'FacebookFixerLanguage': getValue('FacebookFixerLanguage', 'auto'),
	'PopupPosition': getValue('PopupPosition', 'Auto'),
	'GoogleAppsDomain': getValue('GoogleAppsDomain', ''),
	'TopBarOpacity': getValue('TopBarOpacity', '1.0'),
	'TopBarHoverOpacity': getValue('TopBarHoverOpacity', '1.0'),
	'BottomBarOpacity': getValue('BottomBarOpacity', '0.9'),
	'BottomBarHoverOpacity': getValue('BottomBarHoverOpacity', '1.0'),
	'GoogleLanguage': getValue('GoogleLanguage', 'en')
}
for (var i=0; i<booleanOptions.length; i++) {
	bool = true;
	if (booleanOptions[i].charAt(0)=='!') {
		booleanOptions[i] = booleanOptions[i].replace('!','');
		bool = false;
	}
	prefs[booleanOptions[i]] = getValue(booleanOptions[i], bool)
}

//
// Figure out what language we should be using
//
if (prefs['FacebookFixerLanguage'] == 'auto') {
	try {
		var facebookLanguage = document.getElementById('locale_selector_dialog_onclick').innerHTML.toLowerCase();
		if (facebookLanguage.indexOf('english')!=-1) { language = 'en'; }
		else if (facebookLanguage.indexOf('español')!=-1) { language = 'es'; }
		else if (facebookLanguage.indexOf('français')!=-1) { language = 'fr'; }
		else if (facebookLanguage.indexOf('български')!=-1) { language = 'bg'; }
		//else { window.alert(facebookLanguage); } // DEBUG ONLY
	} catch(x) {
		log('LANG Error! => Defaulting to English');
		language = 'en';
	}
} else {
	language = prefs['FacebookFixerLanguage'];
}
//log(language); // DEBUG ONLY

//
// Add styles used by script
//
addStyle(
	'.fbfPopup { background:#f6f6f6; border:3px double #666666; }'+
	'.fbfPopupContainer { display:none; top:0; right:0; bottom:0; left:0; }'+
	'#FBPPdiv { display:none; position:fixed !important; top:2px !important; padding:2px 4px; min-width:130px; z-index:99999 !important;}'+
	'.FBPPdivLeft { left:2px !important; right:auto !important; }'+
	'.FBPPdivRight { right:2px !important; left:auto !important; }'+
	'#FBPPdiv img { max-height: ' + (window.innerHeight-35) + 'px; }'+
	'#FBPPheader, #FBPPloading { text-align:center; color:#3366cc; font-variant:small-caps; font-weight:bold !important; }'+
	'#FBPPclose { text-align:right; color:#ffaaaa; cursor:pointer; font-weight:bold; height:1px; }'+
	'#FBPPclose:hover { color:#aa6666; }'+
	'#FBPPimg { text-align:center; }'+
	'#FBPPimg img { color:#999999; }'+
	'#FBFBigAlbumContainer { padding:0 0 40px; }'+
	'#FBFBigAlbum { padding:3px 3px 20px; margin:35px 15px 0px; text-align:center; }'+
	'#FBFBigAlbum img { padding:1px; }'+
	'.FBFBigAlbumClose { float:right; color:red; cursor:pointer; font-weight:bold; background:#fff9f9; padding:0 10px; border:1px solid #f6f6f0; }'+
	'#FBFConfigContainer { z-index:1001; }'+
	'#FBFConfig { width:700px; padding:10px; margin:20px auto 0; }'+
	'#FBFConfig label, #FBFConfig .fbfLabel { color:#666666; font-weight:normal; } '+
	'#FBFConfig .fbfHeader { font-weight:bold; }'+
	'#FBFConfigShadow, #fbfShadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.6; }'+
	'#fbfKeyboardShortcutsList { display:none; }'+
	'#fbfUpdatePopup { max-width:450px; margin:100px auto; padding:10px; }'+
	'.fbfImportant { font-weight:bold; }'+
	'.fbfNote { color:#777777; }'+
	'.fbfRight { text-align:right; }'
);

//
// Add div for showing big profile pics
//
var div = document.createElement('div');
div.id = 'FBPPdiv';
div.className = 'fbfPopup FBPPdiv' + (prefs['PopupPosition']=='Auto' ? 'Left' : prefs['PopupPosition']);
div.innerHTML = '<div id="FBPPclose" title="' + $l('Close') + '">x</div><div id="FBPPheader">Facebook Fixer</div><div id="FBPPimg"><span></span></div>';
try {
	document.body.insertBefore(div, document.body.lastChild.nextSibling);
	document.getElementById('FBPPclose').addEventListener('click', function() { document.getElementById('FBPPdiv').style.display='none'; }, false);
} catch(x) {
	var fbppdivAdder = setInterval(function() {
		//log('waiting to add FBPPdiv'); // DEBUG ONLY
		try {
			document.body.insertBefore(div, document.body.lastChild.nextSibling);
			document.getElementById('FBPPclose').addEventListener('click', function() { document.getElementById('FBPPdiv').style.display='none'; }, false);
			if ($('FBPPdiv')) { clearInterval(fbppdivAdder); }
		} catch(x){}
	}, 100);
}

//
// Add div for popups and shadows
//
var popupDiv = document.createElement('div');
popupDiv.id = 'fbfPopupContainer';
popupDiv.className = 'fbfPopupContainer';
document.body.appendChild(popupDiv);
var shadowDiv = document.createElement('div');
shadowDiv.id = 'fbfShadow';
document.body.appendChild(shadowDiv);

//
// Listen for DOM changes, if required
//
if (prefs['BigAlbumPictures'] || prefs['AutoBigAlbumPictures'] || prefs['AutoLoadFullAlbum'] || prefs['AutoLoadTaggedPhotos'] || prefs['Age'] || prefs['Sign'] || prefs['iCalendar'] || prefs['GoogleCalendar'] || prefs['CalendarBirthDate'] || prefs['GoogleApps'] || prefs['HomeLeftAlign'] || prefs['MoveFilterList'] || prefs['HomeFilterList'] || prefs['HomeRightColumn'] || prefs['HomeHighlights'] || prefs['HomePokes'] || prefs['HomePeopleYouMayKnow'] || prefs['HomeFindFriends'] || prefs['MoveHighlights'] || prefs['BlockThirdPartyStreams'] || prefs['RoundedProfilePics'] || prefs['DownloadVideo'] || prefs['ErrorPageReload'] || prefs['PageTitle'] || prefs['ProtocolLinks']) {
	processPage();
}

//
// Misc. Short Functions
//

// Add a child node
//function appendChild(child,parent){parent.insertBefore(child,parent.lastChild.nextSibling);} // OBSOLETE

// Get element by id
function $(id,root){return root ? root.getElementById(id) : document.getElementById(id);}

// Get element(s) by class name
function $c(className,root){
	if (document.getElementsByClassName) {
		return root ? root.getElementsByClassName(className) : document.getElementsByClassName(className);
	} else {
		var elms = $x('//*[contains(@class,"'+className+'")]',root);
		var buffer = new Array();
		for (var i=0; i<elms.snapshotLength; i++) { buffer.push(elms.snapshotItem(i)); }
		return buffer;
	}
}
function $c1(className,root){
	if (document.getElementsByClassName) {
		return root ? root.getElementsByClassName(className)[0] : document.getElementsByClassName(className)[0];
	} else {
		return $x1('//*[contains(@class,"'+className+'")][1]',root);
	}
}

// XPath
function $x(xpath,root){return document.evaluate(xpath,(root?root:document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
function $x1(xpath,root){return document.evaluate(xpath,(root?root:document),null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;}

// Get a string in the current language, or default to english
function $l(key,text) {
	var string, l;
	if (lang[language][key]) { string = lang[language][key]; l = language; }
	else { string = lang['en'][key]; l = 'en'}
	if (text) { string = string.replace('%s', text); }
	return string; // + ' [' + l + ']';
}

// Pad with a 0
function $0(x) { return x<10 ? '0'+x : ''+x; }

// Add 'click' event listener
function onClick(id,func){$(id).addEventListener('click',func,false);}

// Click on an element
function click(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent( 'click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null );
	elm.dispatchEvent(evt);
}

// Get an elements position
function getPosition(elm) {
	var x=0;
	var y=0;
	while (elm != null) {
		x += elm.offsetLeft;
		y += elm.offsetTop;
		elm = elm.offsetParent;
	}
	return Array(x,y);
}

// Show a popup div with a shadow background
function showPopup(content, onTop, fixedPosition) {
	$('fbfPopupContainer').innerHTML = content;
	$('fbfPopupContainer').style.position = fixedPosition ? 'fixed' : 'absolute';
	if (onTop) {
		$('fbfShadow').style.zIndex = '1000';
		$('fbfPopupContainer').style.zIndex = '1001';
	} else {
		$('fbfShadow').style.zIndex = '1';
		$('fbfPopupContainer').style.zIndex = '2';
	}
	$('fbfShadow').style.display = 'block';
	$('fbfPopupContainer').style.display = 'block';
	if (!fixedPosition) { window.scroll(0,0); }
}

// Hide popups created with showPopup()
function hidePopup() {
	if ($('fbfPopupContainer')) {
		$('fbfPopupContainer').style.display = 'none';
		$('fbfShadow').style.display = 'none';
	}
}

// Figure out the month from a string containing a date
function $m(str) {
	// Supports: English (UK,US), Spanish, French, German, Dutch, Italian, Portuguese (Brazil,Portugal), Swedish, Greek, Serbian, Bulgarian
	str = str.toLowerCase();
	var months = new Array (/^(.*\s)?(jan(uar[iy]?)?|enero|janvier|gennaio|janeiro|ιανουαρίου|јануар|януари)(\s.*)?$/,
							/^(.*\s)?(feb(ruar[iy]?)?|febrero|février|febbraio|fevereiro|φεβρουαρίου|фебруар|февруари)(\s.*)?$/,
							/^(.*\s)?(mar(ch)?|marzo|mars|märz|maart|março|μαρτίου|март)(\s.*)?$/,
							/^(.*\s)?(apr(ile?)?|abril|avril|απριλίου|април)(\s.*)?$/,
							/^(.*\s)?(ma(yo?|i|j)|mei|maggio|maio|μαΐου|мај|май)(\s.*)?$/,
							/^(.*\s)?(june?|junio?|juin|giugno|junho|ιουνίου|јун|юни)(\s.*)?$/,
							/^(.*\s)?(jul[iy]?|julio|juillet|luglio|julho|ιουλίου|јул|юли)(\s.*)?$/,
							/^(.*\s)?(aug(ust(i|us)?)?|agosto|août|αυγούστου|август)(\s.*)?$/,
							/^(.*\s)?(sep(tember)?|septiembre|se[pt]tembre|setembro|σεπτεμβρίου|септембар|септември)(\s.*)?$/,
							/^(.*\s)?(o[ck]t(ober)?|oct[ou]bre|ottobre|outubro|οκτωβρίου|октобар|октомври)(\s.*)?$/,
							/^(.*\s)?(nov(ember)?|noviembre|novembre|novembro|νοεμβρίου|новембар|ноември)(\s.*)?$/,
							/^(.*\s)?(de[cz](ember)?|dici?embre|décembre|dezembro|δεκεμβρίου|децембар|декември)(\s.*)?$/);
	for (var i=0; i<months.length; i++) {
		if (str.match(months[i])) { return i; }
	}
	return -1;
}


// Parse a date
function $d(str) {
	str = ' ' + str.toLowerCase() + ' ';
	var m;
	var date = new Date();
	if (str.indexOf('tomorrow')!=-1) { date = date.getNextDay(); }
	else if (str.indexOf('today')==-1) {
		if (m = str.match(/\s(\d\d?)[\s,]/)) { if (m[1]<32) { date.setDate(m[1]); } }
		if (m = str.match(/\b(\d{4})\b/)) { date.setYear(m[1]); }
		var month = $m(str);
		if (month==-1) return null;
		date.setMonth(month);
	}
	if (m = str.match(/\b(\d\d?):(\d\d)( (a|p)m)?/i)) {
		date.setHours(m[4]=='p' ? m[1]-0+12 : m[1]);
		date.setMinutes(m[2]);
		date.setSeconds(0);
	}
	return date;
}

// Pause listening when typing messages so we don't slow things down
function handleAutoGrower(elm) {
	if (elm.className.indexOf('handled') == -1) {
		elm.addEventListener('focus', function(e) {
			listening = false;
			document.getElementById('content').removeEventListener('DOMNodeInserted', processPage, false);
		}, false);	
		elm.addEventListener('blur', function(e) {
			processPage();
		}, false);
		elm.className = elm.className + ' handled';
	}
}


//
// Keyboard shortcuts
//
if (prefs['Shortcuts']) {
	window.addEventListener('keydown', function(e) {
		//log(String.fromCharCode(e.keyCode) + ' - ' + e.keyCode + ' - ' + e.ctrlKey + ' - ' + e.altKey + ' - ' + e.metaKey); // DEBUG ONLY
		if ((e.target.type && e.target.type!='checkbox' && e.target.type!='select') || e.ctrlKey || e.altKey || e.metaKey) { return; }
		function clickLink(filter, root) {
			var link;
			if (!root) { root = document; }
			if (filter.charAt(0) == ':') {
				filter = filter.replace(/^./,'');
				link = document.evaluate("//a[contains(@href,'"+filter+"')][1]",root,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
			} else {
				link = document.evaluate("//a[contains(string(),'"+filter+"')][1]",root,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
			}
			if (!link) { return -1; }
			click(link);
		}
		if (e.keyCode==27) {
			if (document.getElementById('fbfPopupContainer')) { document.getElementById('fbfPopupContainer').style.display = 'none'; }
			if (document.getElementById('fbfShadow')) { document.getElementById('fbfShadow').style.display = 'none'; }
			if (prefs['PhotoPopup'] || prefs['ProfilePicPopup']) { document.getElementById('FBPPdiv').style.display='none'; }
		}
		else if (e.keyCode==16 || e.keyCode==17 || e.keyCode==18) {}
		else if (e.keyCode==191) { if (e.shiftKey) { window.alert('Facebook Fixer Debug Info:\n\nid: ' + id + '\ntimestamp: ' + version_timestamp + '\npage: ' + page + '\nlanguage: ' + language + '\nlistening: ' + (listening?'true':'false')); } } // ?
		else if (e.shiftKey) {
			switch(e.keyCode) {
				case 37: clickLink('First'); break; // Left Arrow
				case 39: clickLink('Last'); break; // Right Arrow
				case 65: window.location.href = 'http://www.facebook.com/photos/?ref=sb'; break; // A
				case 66: click(document.getElementById('buddy_list_tab')); break; // B
				case 67: showConfig(); break; // C
				case 70: window.location.href = 'http://www.facebook.com/friends/?ref=tn'; break; // F
				case 72: window.location.href = 'http://www.facebook.com/home.php?ref=home'; break; // H
				case 73: window.location.href = 'http://www.facebook.com/inbox/?ref=mb'; break; // I
				case 76: if (listening) {
							stopListening();
							window.alert($l('ListeningStopped'));
						} else {
							startListening();
							window.alert($l('ListeningRestarted'));
						}
						break; // L
				case 78: window.location.href = 'http://www.facebook.com/notifications.php'; break; // N
				case 80: window.location.href = 'http://www.facebook.com/' + (id.match(/^\d+$/) ? 'profile.php?id='+id+'&ref=profile' : id); break // P
				case 83: e.stopPropagation(); e.preventDefault(); document.getElementById('q').focus(); break // S
				case 84: if (window.getSelection()!='') {
							if (typeof GM_xmlhttpRequest !== 'undefined') {
								handleTranslateRequest();
								xmlhttpRequest({method: "GET", url: "http://translate.google.com/translate_a/t?client=t&text=" + window.getSelection() + "&sl=auto&tl=" + prefs['GoogleLanguage']}, handleTranslateResponse);
							} else {
								window.open('http://translate.google.com/translate_t?hl=en#auto|' + prefs['GoogleLanguage'] + '|' + window.getSelection());
							}
						 } break // T
			}
		}
		else {
			if (window.location.href.indexOf('/photos/')!=-1) {
				switch(e.keyCode) {
					case 65: // a
					case 82: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=recent'; break; // r
					case 77: // m
					case 85: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=mobile'; break; // u
					case 84: // t
					case 70: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=tagged'; break; // f
					case 67: clickLink('Photo Comments'); break; // c
					case 79: clickLink('Photos of Me'); break; // o
					case 80: clickLink('My Photos'); break; // p
				}
			}
			else if (page.match(/^home.php/)) {
				switch(e.keyCode) {
					case 73: clickLink(':home.php?tab=5'); break; // i
					case 70: // f
					case 76: clickLink(':home.php?tab=2'); break; // l
					case 78: clickLink(':home.php?tab=1'); break; // n
					case 80: clickLink(':home.php?tab=4'); break; // p
					case 83: // s
					case 85: clickLink(':home.php?tab=3'); break; // u
				}
			}
			else {
				switch(e.keyCode) {
					case 66: clickLink('Show Big Pictures'); break; // b
					case 67: if (clickLink('View Comments')==-1) { if (clickLink('Photo Comments')==-1) { clickLink('Comments on Photos'); } } break; // c
					case 73: clickLink(':v=info'); break; // i
					case 80: if (clickLink('s Profile')==-1) { clickLink(':v=photos'); } break; // p
					case 87: clickLink(':v=feed'); break; // w
					case 88: clickLink('Boxes'); break; // x
				}
			}
			if (page.match(/^profile\.php\?.*photos/) && e.keyCode==77) { clickLink('and Me ('); }
			switch(e.keyCode) {
				case 37: if (clickLink('Prev')==-1) { clickLink('prev'); }  break; // Left Arrow
				case 39: if (clickLink('Next')==-1) { clickLink('next'); } break; // Right Arrow
				case 75: clickLink('Back to '); break; // k
				case 65: click(document.getElementById('FBFLoadAllPhotos')); break; // a
			}
		}
	}, false);
}


//
// Google Translate functions
//
function handleTranslateRequest() { showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; "><b>Translating...</b> (press escape to close this popup)</div>', true, true); }
function handleTranslateResponse(r) {
	eval('var t = ' + r.responseText);
	showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; "><b>Translated Text via Google Translate</b> (from ' + t[1] + ' to ' + prefs['GoogleLanguage'] + '):<br /><br />' + t[0] + '<div style="text-align:right;"><input id="fbfCloseTranslation" type="button" value="' + $l('Close') + '" /></div></div>', true, true);
	onClick('fbfCloseTranslation', function() { hidePopup(); });
}

//
// Start/Stop listening
//
function stopListening() {
	listening = false;
	document.getElementById('content').removeEventListener('DOMNodeInserted', processPage, false);
}
function startListening() { processPage(); }


//
// Allow script configuration
//
registerMenuCommand($l('ConfigureFacebookFixer'), showConfig);
if ($('fb_menu_settings_dropdown')) {
	var configLink = document.createElement('div');
	configLink.className = 'fb_menu_item';
	configLink.innerHTML = '<a id="fbfConfigMenuLink" class="fb_menu_item_link" href="#" onclick="return false;"><small style="background-image: url(http://static.ak.fbcdn.net/images/app_icons/edit_applications.gif);"> </small>Facebook Fixer</a>';
	$('fb_menu_settings_dropdown').appendChild(configLink);
	$('fbfConfigMenuLink').addEventListener('click', showConfig, false);
}
function showConfig() {
	var opacitySelect = '';
	for (i=100; i>=0; i-=10) { opacitySelect=opacitySelect+'<option value="' + (i==100?'1.0':'0.'+(i/10)) + '">' + (100-i) + '%</option>'; }
	function makeOpacitySelector(id1, id2) { return '<tr><td><span class="fbfLabel">' + $l('Conf'+id1) + '</span></td><td><select id="fbfConf' + id1 + '">' + opacitySelect + '<option value="-1">' + $l('Remove') + '</option></select> &nbsp; &nbsp;<span class="fbfLabel">' + $l('Conf'+id2) + '</span> &nbsp;<select id="fbfConf' + id2 + '">' + opacitySelect + '</select></td></tr>'; }
	function makeCheckBox(id) { return ' &nbsp; &nbsp; <input type="checkbox" id="fbfConf' + id + '" /><label for="fbfConf' + id + '">' + $l('Conf'+id) + '</label><br />'; }
	showPopup('<div id="FBFConfig" class="fbfPopup">'+
		'<div style="text-align:center;"><span class="fbfImportant">' + $l('ConfigureFacebookFixer') + '</span><br /><span class="fbfNote">(' + id + ' - ' + version_timestamp + ' - ' + release_date + ')</span></div><br />'+
		$l('ConfigureInstructions') + '<br />'+
		'<br /><span class="fbfHeader">' + $l('ConfHeaderPictures') + '</span><br />'+//' + $l('Conf') + '
		makeCheckBox('ProfilePicPopup') +
		makeCheckBox('PhotoPopup') +
		makeCheckBox('ExternalPopup') +
		makeCheckBox('DelayPopupPics') +
		makeCheckBox('PopupAutoClose') +
		makeCheckBox('BigAlbumPictures') +
		//makeCheckBox('RoundedProfilePics') +
		makeCheckBox('AutoBigAlbumPictures') +
		makeCheckBox('AutoLoadFullAlbum') +
		makeCheckBox('AutoLoadTaggedPhotos') +
		' &nbsp; &nbsp; &nbsp; <span class="fbfLabel">' + $l('ConfPopupPosition') + ': </span><input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPositionAuto" value="auto" /><label for="fbfConfPopupPositionAuto">' + $l('Automatic') + '</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPositionLeft" value="left" /><label for="fbfConfPopupPositionLeft">' + $l('Left') + '</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPositionRight" value="right" /><label for="fbfConfPopupPositionRight">' + $l('Right') + '</label><br />'+
		'<br /><span class="fbfHeader">' + $l('ConfHeaderHomePage') + '</span><br />'+
		makeCheckBox('AutoRefreshFeed') +
		makeCheckBox('BlockThirdPartyStreams') +
		makeCheckBox('MoveFilterList') +
		makeCheckBox('MoveHighlights') +
		makeCheckBox('HomeLeftAlign') +
		makeCheckBox('HomeFilterListFixed') +
		makeCheckBox('HomeFilterList') +
		makeCheckBox('HomeRightColumn') +
		' &nbsp; &nbsp; ' + makeCheckBox('HomeHighlights') +
		' &nbsp; &nbsp; ' + makeCheckBox('HomePokes') +
		' &nbsp; &nbsp; ' + makeCheckBox('HomePeopleYouMayKnow') +
		' &nbsp; &nbsp; ' + makeCheckBox('HomeFindFriends') +
		'<br /><span class="fbfHeader">' + $l('ConfHeaderEvents') + '</span><br />'+
		makeCheckBox('Age') +
		makeCheckBox('Sign') +
		makeCheckBox('iCalendar') +
		makeCheckBox('GoogleCalendar') +
		makeCheckBox('CalendarFullName') +
		makeCheckBox('CalendarBirthDate') +
		makeCheckBox('GoogleApps') +
		' &nbsp; &nbsp; &nbsp; &nbsp; Domain: <input id="fbfConfGoogleAppsDomain"></input><br />'+
		'<br /><span class="fbfHeader">' + $l('ConfHeaderMenu') + '</span><br />'+
		makeCheckBox('ChatHideIdle') +
		makeCheckBox('ChatDifferentiate') +
		makeCheckBox('TopBarFixed') +
		'<table style="margin-left:20px;">' +
		makeOpacitySelector('TopBarOpacity', 'TopBarHoverOpacity') +
		makeOpacitySelector('BottomBarOpacity', 'BottomBarHoverOpacity') +
		'</table>' +
		'<br /><span class="fbfHeader">' + $l('ConfHeaderOther') + '</span><br />'+
		makeCheckBox('DownloadVideo') +
		makeCheckBox('ProtocolLinks') +
		makeCheckBox('ErrorPageReload') +
		makeCheckBox('PageTitle') +
		makeCheckBox('NewTabSearch') +
		makeCheckBox('SecureLinks') +
		makeCheckBox('Updates') +
		'<table style="margin-left:20px;">' +
		'<tr><td><span class="fbfLabel">' + $l('ConfFacebookFixerLanguage') + ':</span></td><td><select id="fbfConfFacebookFixerLanguage" style="padding:0; margin-top:3px;"><option value="auto">Automatic</option><option value="bg">Bulgarian</option><option value="en">English</option><option value="fr">French</option><option value="de">German</option><option value="it">Italian</option><option value="es">Spanish</option></select></td></tr>'+
		'<tr><td><span class="fbfLabel">' + $l('ConfGoogleLanguage') + ':</span></td><td><select id="fbfConfGoogleLanguage" style="padding:0; margin-top:3px;"><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">Chinese (Simplified)</option><option value="zh-TW">Chinese (Traditional)</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="de">German</option><option value="el">Greek</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="id">Indonesian</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="ko">Korean</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="es">Spanish</option><option value="sv">Swedish</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="vi">Vietnamese</option></select></td></tr>'+
		'</table>' +
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfShortcuts"/><label for="fbfConfShortcuts">'+ $l('ConfShortcuts') + '</label><div id="fbfKeyboardShortcutsList"><br />' + $l('ConfShortcutList') + '<br /></div><br />'+
		'<br /><hr /><div style="text-align:right;"><input type="button" value="Refresh Page" onclick="location.reload();" /> <input type="button" id="fbfCloseConfig" value="' + $l('Close') + '" /></div>'+
		'</div>', true
	);
	
	// Update fields to match current settings
	for (var i=0; i<booleanOptions.length; i++) {
		if (prefs[booleanOptions[i]]) { $('fbfConf'+booleanOptions[i]).checked='checked'; }
		onClick('fbfConf'+booleanOptions[i], function(e) {
			setValue(e.target.id.replace('fbfConf',''), e.target.checked);
			prefs[e.target.id.replace('fbfConf','')] = e.target.checked;
		});
	}
	$('fbfConfPopupPosition' + prefs['PopupPosition']).checked='checked';
	var positions = new Array('Auto','Left','Right');
	for (var i=0; i<positions.length; i++) {
		onClick('fbfConfPopupPosition'+positions[i], function(e) {
			setValue('PopupPosition', e.target.id.replace('fbfConfPopupPosition',''));
			e.target.blur();
		});
	}
	var opacities = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity');
	for (var i=0; i<opacities.length; i++) { $('fbfConf'+opacities[i]).value = prefs[opacities[i]]; }
	$('fbfConfGoogleAppsDomain').value = prefs['GoogleAppsDomain'];
	$('fbfConfGoogleLanguage').value = prefs['GoogleLanguage'];
	$('fbfConfFacebookFixerLanguage').value = prefs['FacebookFixerLanguage'];
	
	// Listen for changes
	$('fbfConfGoogleAppsDomain').addEventListener('keyup', function(e) {
			setValue('GoogleAppsDomain', e.target.value);
			prefs['GoogleAppsDomain'] = e.target.value;
	}, false);
	onClick('fbfUpdateLink', function() { FBFUpdateCheck(true); });
	onClick('fbfCloseConfig', function() { hidePopup(); });
	onClick('fbfKeyboardShortcutsLink', function() { $('fbfKeyboardShortcutsList').style.display = $('fbfKeyboardShortcutsList').style.display == 'block' ? 'none' : 'block'; });
	var selects = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity','FacebookFixerLanguage','GoogleLanguage');
	for (var i=0; i<selects.length; i++) { $('fbfConf'+selects[i]).addEventListener('change', function(e) { setValue(e.target.id.replace(/^fbfConf/,''),e.target.options[e.target.selectedIndex].value); e.target.blur(); }, false); }
	window.scroll(0,0);
}

//
// Check for Updates (very modified, originally based on code by Jarett - http://userscripts.org/users/38602)
//
var updateForced;
function FBFUpdateCheck(forced) {
	if((forced)||(parseInt(getValue("LastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {
		updateForced = forced;
		// new: http://userscripts.org/scripts/source/8861.meta.js old: http://userscripts.org/scripts/review/8861
		try { xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/source/8861.meta.js?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'}}, handleUpdateResponse); }
		catch (err) { if (forced) { alert("An error occurred while checking for updates:\n" + err); } }
	}
}
function handleUpdateResponse(r) {
	setValue('LastUpdate', new Date().getTime() + "");
	if (r.responseText.match(/@timestamp\s+(\d+)/)[1] > version_timestamp) { showUpdatePopup(); }
	else if (updateForced) { alert("No update is available for Facebook Fixer."); }
}
if (prefs['Updates']) { FBFUpdateCheck(false); }
function showUpdatePopup() {
	showPopup(''+
		'<div id="fbfUpdatePopup" class="fbfPopup"><div class="fbfImportant"></div>' + $l('UpdateAvailable1') + '<br /><br /><div class="fbfNote">' + $l('UpdateAvailable2') + '</div><br /><div class="fbfRight">'+
		'<input type="button" value="' + $l('UpdateInstall') + '" id="fbfUpdateInstall" /> '+
		'<input type="button" value="' + $l('UpdateHomepage') + '" id="fbfUpdateHomepage" /> '+
		'<input type="button" value="' + $l('UpdateTomorrow') + '" id="fbfUpdateTomorrow" /></div></div>', true
	);
	onClick('fbfUpdateInstall', function() { openInTab('http://userscripts.org/scripts/source/8861.user.js'); hidePopup(); });
	onClick('fbfUpdateHomepage', function() { window.open('http://userscripts.org/scripts/show/8861'); hidePopup(); });
	onClick('fbfUpdateTomorrow', hidePopup);
}

//
// Load thumbnails for entire album
//
function loadFullAlbum() {
	try {
		if (m = $c1('summary').textContent.split('|')[0].match(/(\d+)/g)) {
			m = m.sort(function(a,b){return a-b});
			totalImagePages = Math.ceil(m[2]/20);
			if (n=page.match(/page=(\d)/)) { thisPageNumber=n[1]; } else { thisPageNumber=1; }
			albumPagesLoaded = 0;
			totalAlbumPages = totalImagePages-1;
			$('fbf_photo_pagination').innerHTML = '<span class="caption">' + $l('loadingFullAlbum') + '</span>'
			stopListening();
			for (var i=1; i<totalImagePages+1; i++) {
				if (i!=thisPageNumber) {
					appendPhotos((page.indexOf('page=')!=-1 ? page.replace(/page=\d+/,'page='+i) : page+'&page='+i) + '&quickling', $l('fullAlbumLoaded'));
				}
			}
		}
	} catch(x) { log('LOADFULL Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
}

//
// Load tagged thumbnails
//
function loadTaggedPhotos() {
	try {
		if (m = $c1('caption').textContent.split('|')[0].match(/(\d+)/g)) {
			$('fbf_photo_pagination').innerHTML = '<span class="caption">' + $l('LoadingAllPhotos') + '</span>'
			totalImagePages = Math.ceil(m[m.length-1]/15);
			albumPagesLoaded = 0;
			totalAlbumPages = totalImagePages-1;
			var thisPhoto = 0;
			if (m = page.match(/so=(\d+)/)) { thisPhoto = m[1]; }
			var tid = 0;
			if (m = page.match(/id=(\d+)/)) { tid = m[1]; }
			else if (m = $('top_bar_pic').href.match(/id=(\d+)/)) { tid = m[1]; }
			if (tid!=0) {
				for (var i=1; i<totalImagePages+1; i++) {
					stopListening();
					if (i*15!=thisPhoto) {
						appendPhotos('http://www.facebook.com/ajax/photos.php?id=' + tid + '&v=photos&so=' + (i*15) + '&action=page&section=photos_of', '<span class="caption">' + $l('AllPhotosLoaded') + '</span>');
					}
				}
			} else { log('LOADFULL Error! => could not get tid'); }
		}
	} catch(x) { log('LOADFULL Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
}

//
// Add thumbnails from the specified URL
//
function appendPhotos(url, completeMessage) {
	//log('Requesting from ' + url); // DEBUG ONLY
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.send(null);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				albumPagesLoaded++;
				var sub = req.responseText.match(/UIPhotoGrid_Table[^>]+>(.*?)<\\\/table>/)[1];
				var buf = sub.replace(/\\/g,'').split(/<tr>/g);
				var table = document.createElement('table');
				table.className="UIPhotoGrid_Table";
				html = '';
				for (var i=1; i<buf.length; i++) { html = html + '<tr>' + buf[i]; }
				//var tbody = document.getElementsByClassName('UIPhotoGrid_Table')[0].firstChild;
				var tbody = $c1('UIPhotoGrid_Table').firstChild;
				tbody.innerHTML = tbody.innerHTML + html;
				if (albumPagesLoaded>=totalAlbumPages) {
					startListening();
					$('fbf_photo_pagination').innerHTML = completeMessage;
				}
				if (prefs['AutoBigAlbumPictures']) { click(document.evaluate("//a[contains(string(),'Show Big Pictures')][1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue); }
			}
		}
	}
}

//
// Un-Round profile pictures
//
if (!prefs['RoundedProfilePics']) {addStyle('.UIRoundedImage_Corners, .UIRoundedImage_CornersSprite { display:none ! important; }'); }

//
// Top Bar Positioning
//
if (prefs['TopBarFixed']) { 
	var contentPosition = getPosition($('content'));
	addStyle(' #menubar_container { position:fixed !important; width:100% !important; z-index:12; margin-top:0; } '+
	'#fb_menubar { position:relative !important; margin:0 auto !important; }'+
	'#content { padding-top:' + contentPosition[1] + 'px; }');
}

//
// Top Bar Transparency
//
if (prefs['TopBarOpacity']!='1.0' || prefs['TopBarHoverOpacity']!='1.0') {
	if (prefs['TopBarOpacity'] < 0) { addStyle(' #menubar_container { display:none; } #content > div { padding-top:10px; }'); }
	else { addStyle(' #menubar_container { opacity:' + prefs['TopBarOpacity'] + '; } #menubar_container:hover { opacity:' + prefs['TopBarHoverOpacity'] + '; }'); }
}

//
// Bottom Bar Transparency
//
if (prefs['BottomBarOpacity']!='1.0' || prefs['BottomBarHoverOpacity']!='1.0') {
	if (prefs['BottomBarOpacity'] < 0) { addStyle(' #presence { display:none; }'); }
	else { addStyle(' #presence { opacity:' + prefs['BottomBarOpacity'] + '; } #presence:hover { opacity:' + prefs['BottomBarHoverOpacity'] + '; }'); }
}

//
// Make Available Buddies Bold and Idle Buddies Italic
//
if (prefs['ChatDifferentiate']) {
	addStyle(' .presence_menu_opts .list_select li div strong { font-weight:bold; } .presence_menu_opts .list_select li.idle div strong { font-weight:normal; }');
	addStyle(' .presence_menu_opts .list_select li.idle a { font-style:italic; }');
}

//
// Hide Idle Buddies
//
if (prefs['ChatHideIdle']) { addStyle(' .presence_menu_opts .list_select li.idle { max-height:0; overflow:hidden; }'); }

//
// Listen for image mouseovers/mouseouts to show/hide popups
//
if (prefs['ProfilePicPopup'] || prefs['PhotoPopup']) {
	picRegex = /:\/\/(profile).*(\/[aqst]\d|_[aqst]\.jpg)/;
	
	function showPopupPic(e) {
		try {
			var t = e.target;
			var oldSrc;
			var newSrc;
			if (t.tagName == 'IMG' && picRegex.test(t.src)) { oldSrc = t.src; }
			else if (t.parentNode.firstChild.tagName == 'IMG' && picRegex.test(t.parentNode.firstChild.src)) { oldSrc = t.parentNode.firstChild.src; }
			//if (oldSrc) { log(oldSrc); } // DEBUG
			else if (t.tagName == 'IMG') {
				if (t.src.indexOf('UIRoundedImage.png')!=-1) {
					try { oldSrc = t.previousSibling.src; }
					catch(x) { oldSrc = t.parentNode.previousSibling.src; }
				}
				else if (t.src.indexOf('app_full_proxy.php')!=-1) { oldSrc = unescape(t.src.match(/src=([^&]+)/)[1]); }
				else if (t.src.indexOf('safe_image.php')!=-1) { oldSrc = unescape(t.src.match(/url=([^&]+)/)[1]); }
				else if (t.src.match(/\/[aqst]\d|_[aqst]\.jpg/)) { oldSrc = t.src; }
			} else if (t.tagName == 'DIV' && t.className.indexOf('UIMediaItem_PhotoFrame')!=-1) {
				oldSrc = t.parentNode.parentNode.parentNode.style.backgroundImage.match(/url\((.*)\)/)[1];
			} else if (t.tagName == 'SPAN') {
				if (t.className.indexOf('UIObjectListing_PicRounded')!=-1) { oldSrc = t.parentNode.getElementsByTagName('img')[0].src; }
				if (t.className.indexOf('invisible_png')!=-1) { oldSrc = t.parentNode.parentNode.parentNode.getElementsByTagName('img')[0].src; }
				else if (t.className.indexOf('play')!=-1) {
					if (m = t.firstChild.src.match(/url=([^&]+)/)) { oldSrc = unescape(m[1]); }
					else { newSrc = t.firstChild.src; } // alpha
				}
			}
			if (newSrc || (oldSrc && (oldSrc.indexOf('facebook.com') ? (oldSrc.indexOf('profile')!=-1 ? prefs['ProfilePicPopup'] : prefs['PhotoPopup']) : prefs['ExternalPopup']))) {
				if (!newSrc) {
					if (m = oldSrc.match(/^["']+(.*)["']+$/)) { oldSrc = m[1]; } // Opera needs this, no idea why...
					newSrc = oldSrc.replace(/\/[aqst]([\d_]+)\.jpg/, "/n$1.jpg").replace(/\/([\d_]+)[aqst]\.jpg/, "/$1n.jpg");
				}
				if (m = newSrc.match(/\/n(\d+)_\d+\.jpg/)) { profileLink = 'http://www.facebook.com/profile.php?id=' + m[1]; }
				else if (t.parentNode.href) { profileLink = t.parentNode.href; }
				else if (t.parentNode.parentNode.href) { profileLink = t.parentNode.parentNode.href; }
				$('FBPPimg').innerHTML = '<a href="' + profileLink + '"><img src="' + newSrc + '" alt="' + $l('LoadingPic') + '" /></a>';
				$('FBPPdiv').style.display = 'block';
				$('FBPPdiv').className = 'fbfPopup FBPPdiv' + (prefs['PopupPosition'] == 'Auto' ? (e.pageX>document.body.clientWidth/2 ? 'Left' : 'Right') : prefs['PopupPosition']);
			}
		} catch(x) { log('PopupPic Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
	}
	
	if (prefs['DelayPopupPics']) { 
		window.addEventListener('mouseover', function(e) {
			if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
				popupPicTimeout = setTimeout(function(){showPopupPic(e);}, 500);
			}
		}, false);
	} else {
		window.addEventListener('mouseover', function(e) {
			if (!e.shiftKey && !e.ctrlKey && !e.altKey) { showPopupPic(e); }
		}, false);
	}
	
	document.addEventListener('mouseout', function(e) {
		if (prefs['DelayPopupPics']) { clearTimeout(popupPicTimeout); }
		if (prefs['PopupAutoClose']) {
			if (!e.shiftKey && !e.ctrlKey && !e.altKey) { document.getElementById('FBPPdiv').style.display = 'none'; }
		}
	}, false);
}


//
// Add link for showing full-size album pictures
//
function addBigAlbumPicLinks(x, parent, className, container, showPipe) {
	// x allows multiple links on a page, link is added to parent with a class of className, images are found in container
	if (document.getElementById('fbfbaplink'+x)) { return; }
	var albumLink = document.createElement('a');
	albumLink.id = 'fbfbaplink'+x;
	parent.appendChild(albumLink);
	albumLink.innerHTML = $l('ShowBigPictures');
	if (className!='') { albumLink.className = className; }
	albumLink.addEventListener('click', function() {
		var images = container.getElementsByTagName('img');
		var buf = '';
		for (i=0; i<images.length; i++) {
			buf+= '<a href="' + images[i].parentNode.href + '">'+
				'<img src="' + images[i].src.replace(/\/s([\d_]+)\.jpg/, '/n$1.jpg').replace(/\/([\d_]+)s\.jpg/, '/$1n.jpg') + '"' + (images[i].getAttribute('title')!=null ? ' title="' + images[i].getAttribute('title') + '"' : '') + ' />'+
				'</a>';
		}
		hidePopup();
		showPopup('<div id="FBFBigAlbumContainer"><div id="FBFBigAlbum" class="fbfPopup"><div id="FBFBigAlbumClose1" class="FBFBigAlbumClose">' + $l('Close') + '</div>' + buf + '<div id="FBFBigAlbumClose2" class="FBFBigAlbumClose">' + $l('Close') + '</div></div></div>', false);
		onClick('FBFBigAlbumClose1', hidePopup);
		onClick('FBFBigAlbumClose2', hidePopup);
	}, false);
	if (showPipe) {
		var pipe = document.createElement('span');
		pipe.id = 'fbfbappipe'+x;
		pipe.className = 'pipe';
		pipe.innerHTML = '|';
		albumLink.parentNode.insertBefore(pipe, albumLink);
	}
	if (prefs['AutoBigAlbumPictures']) { click(albumLink); }
}

//
// Modify search form so search results open in a new tab/window
//
if (prefs['NewTabSearch'] && $('q')) {
	$('q').addEventListener('keydown', function(e) {
		if (e.keyCode == 13 && e.ctrlKey) { $('universal_search_form').target = '_blank'; }
		else { $('universal_search_form').target = ''; }
	}, false);
}

//
// Block 3rd party streams
//
function blockStream(appId) {
	if (typeof unsafeWindow==='undefined') { unsafeWindow = window; }
	var xmlhttp =  new XMLHttpRequest();
	xmlhttp.open("POST", "http://www.facebook.com/ajax/feed/filter_action.php", true);
	var params = "value="+appId+"&action=unfollow&filter_key=app_"+appId+"&post_form_id_source=AsyncRequest&post_form_id="+$('post_form_id').value+"&nectar_impid="+unsafeWindow.env_get("nectar_last_impression_id")+'&nectar_navimpid='+unsafeWindow.Env["nectar_last_impression_id"];
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", params.length);
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.send(params);
}

//
// Check if anything needs to be done
//
function processPage() {
	
	//
	// Check for "auto growers" and handle them - don't let things slow down
	//
	var autoGrows = document.evaluate("//textarea[contains(@class,'DOMControl_placeholder')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
	if (autoGrows.snapshotLength > 0) {
		for (i=0; i<autoGrows.snapshotLength; i++) {
			handleAutoGrower(autoGrows.snapshotItem(i));
		}
	}
	var autoGrows = document.evaluate("//textarea[contains(@class,'UIComposer_TextArea')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
	if (autoGrows.snapshotLength > 0) {
		for (i=0; i<autoGrows.snapshotLength; i++) {
			handleAutoGrower(autoGrows.snapshotItem(i));
		}
	}
	if ($('message')) { handleAutoGrower($('message')); }
	
	
	//
	// Make sure we're listening
	//
	if (!listening) {
		Date.prototype.getNextDay=function(){var nextDay=new Date(); nextDay.setTime(this.getTime()+86400000); return nextDay; }
		Date.prototype.before=function(date){if(!date)date=new Date(); return this.getTime()<date.getTime();}
		Date.prototype.past=function(date){if(!date)date=new Date(); var thisDate=this; thisDate.setHours(0); thisDate.setMinutes(0); thisDate.setSeconds(0); date.setYear(thisDate.getFullYear()); return thisDate.getTime()<date.getTime();}
		Date.prototype.getAge=function(){var now=new Date(); return this.past(new Date())?now.getFullYear()-this.getFullYear():now.getFullYear()-this.getFullYear()-1;}
		Date.prototype.toISOString=function(includeTime){return ''+this.getFullYear()+$0(this.getMonth()-0+1)+$0(this.getDate())+(includeTime?'T'+$0(this.getHours())+$0(this.getMinutes())+$0(this.getSeconds()):'');}
		Date.prototype.getSign=function(){ var signs = $l('Signs'); var endDates=new Array(19,18,20,19,20,21,22,22,22,22,21,21); return signs[this.getDate()>endDates[this.getMonth()]?(this.getMonth()+1)%12:this.getMonth()];}
		Date.prototype.format = function() { var monthNames = $l('Months'); return monthNames[this.getMonth()] + ' ' + this.getDate() + ', ' + this.getFullYear(); }
		try {
			document.getElementById('content').addEventListener('DOMNodeInserted', processPage, false);
			listening = true;
		}
		catch(x) {}
	}

	//
	// Figure out what page we're looking at
	//
	loc = window.location.href.toLowerCase();
	page = loc.split('facebook.com/')[1];
	if (page.indexOf('#')!=-1) {
		buf = page.split('#');
		page = buf[1]!='' ? buf[1] : buf[0];
	}
	if (page.indexOf('/')==0) { page = page.replace(/^\//,''); }
	if (page != lastPage && prefs['PopupAutoClose'] && $('FBPPdiv')) {
		$('FBPPdiv').style.display = 'none';
		lastPage = page;
	}
	//log('Page => ' + page); // DEBUG ONLY
	
	//
	// Customize Home Page
	//
	if (page.indexOf('home.php')!=-1) {
		try {
			homeStream = $('home_stream');
			if (homeStream && !homeStream.className.match(/\bfbf\b/)) {
				homeStream.className = homeStream.className + (' fbf');
				var style = '';
				var style2 = '';
				if (prefs['MoveFilterList'] || (homePageNotModified && !prefs['HomeFilterList'])) {
					style = style + ' #home_stream { padding-left:0; }';
						style2 = '#home_stream { width:' + (document.defaultView.getComputedStyle($('home_stream'), null).width.replace('px','')-0+143) + 'px; }';
				}
				if (homePageNotModified) {
					if (!prefs['HomeFilterList']) {
						style = style + '#home_filter_list { display:none; }';
					}
					if (!prefs['HomeRightColumn']) {
						style = style + '#home_sidebar { display:none; } #home_stream { padding-right:0; }';
						style2 = '#home_stream { width:' + (document.defaultView.getComputedStyle($('home_stream'), null).width.replace('px','')-0+270) + 'px; } #home_left_column { width:100%; }';
					}
					if (!prefs['HomeFilterList'] && !prefs['HomeRightColumn']) { style2 = '#home_left_column, #home_stream { width:100%; }'; }
					if (!prefs['HomeHighlights']) { style = style + ' #home_sidebar .UIHotStream { display:none; }'; }
					if (!prefs['HomePokes']) { style = style + ' #home_sidebar .pokes { display:none; }'; }
					if (!prefs['HomePeopleYouMayKnow']) { style = style + ' #home_sidebar .pymk { display:none; }'; }
					if (!prefs['HomeFindFriends']) { style = style + ' #home_sidebar .hp_connect_box { display:none; }'; }
					if (style) {
						style = style + style2 + ' .UIIntentionalStory_Message { width:96%; }';
						addStyle(style.replace(/;/g,' ! important'));
					}
					homePageNotModified = false;
				}
				if (!prefs['HomeHighlights']) {
					//$x1('//div[@id="home_sidebar"]//span[contains(string(),"Highlights")][1]').parentNode.parentNode.parentNode.style.display="none";
					$x1('//span[contains(string(),"Highlights")][1]',$('home_sidebar')).parentNode.parentNode.parentNode.style.display="none";
				}
				if (!prefs['HomePeopleYouMayKnow']) {
					//$x1('//span[contains(string(),"People You May Know")][1]',$('home_sidebar')).parentNode.parentNode.parentNode.style.display="none";
					if ($('pymk_hp_box')) { $('pymk_hp_box').style.display='none'; }
				}
				
				// Move filter list to the right column
				if (prefs['MoveFilterList']) {
					$('home_sidebar').insertBefore($('home_filter_list'), $('home_sidebar').firstChild);
					addStyle('#home_filter_list { width:100% !important; margin-bottom:15px; float:none; clear:none; }');
				}
				
				// Move Hightlights to the bottom
				if (prefs['MoveHighlights']) { $('home_sidebar').appendChild($c1('UIHotStream').parentNode.parentNode); }
				
				// Left align the home page content
				if (prefs['HomeLeftAlign']) { addStyle('.UIFullPage_Container, .UIOneOff_Container { margin:0 ! important; }'); }
				
				// Make today's events bold
				var eventDays = $c('UIUpcoming_Time');
				for (var i=0; i<eventDays.length; i++) {
					if (eventDays[i].innerHTML.toLowerCase().indexOf($l('today'))!=-1) {
						eventDays[i].parentNode.style.fontWeight = 'bold';
					}
				}
				
				// Block 3rd party streams
				if (prefs['BlockThirdPartyStreams']) {
					var apps = document.evaluate('//div[contains(@class, "UIFilterList_Item")]/a[contains(@href, "?filter=app_")]', document, null, 6, null), app, i=0;
					while(app=apps.snapshotItem(i++)) {
						if(!/(2361831622|2344061033|2347471856|2392950137|2309869772|2305272732)/.test(app.href)) {
							blockStream(appId=app.href.split('app_')[1]);
							app.parentNode.parentNode.removeChild(app.parentNode);
						}
					}
				}
				
				// Auto-load new posts in news feed
				if (prefs['AutoRefreshFeed']) {
					try {
						var elm = $c1('UIIntentionalStream_ShowNewStories_Msg');
						newsFeedInterval = setInterval(elm.getAttribute('onclick'), 10000);
					} catch(x) { log('FEED Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
				}
				
				// Fixed positioning for filter list
				if (prefs['HomeFilterListFixed'] && !prefs['MoveFilterList']) {
					var streamMargin = getPosition($('home_stream'))[0] - getPosition($('home_filter_list'))[0];
					addStyle('#home_filter_list { position:fixed; } #home_stream { margin-left:' + streamMargin + 'px; }');
				}
				
			}
		} catch(x) { log('HOME Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
	} else { clearInterval(newsFeedInterval); }
	
	//
	// Replace links with HTTPS versions
	//
	if (prefs['SecureLinks']) {
		var links = $x("//a[contains(@href,'facebook.com')]");
		for (var i=0; i<links.snapshotLength; i++) { links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/^http:\/\/([^\.]*\.)?facebook\.com\//,'https://$1facebook.com/'); }
	}

	//
	// Show big album pictures
	//
	if (prefs['BigAlbumPictures']) {
		if (page.match(/^album.php/) || page.match(/^photo_search.php/) || page.match(/^profile.php\?.*\bv=photos/) || page.match(/^pages\/.*\?.*\bv=photos/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1 && page.indexOf('v=photos')!=-1)) {
			try {
				var parents;
				if (page.indexOf('album.php')!=-1) {
					parents = document.evaluate("//div[@id='content']//div[@class='summary'][1]/*[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
					addBigAlbumPicLinks(0, parents, '', document.getElementById('album_container'), true);
				} else if (page.indexOf('profile.php')!=-1 || page.indexOf('.php')==-1) {
					parents = document.getElementsByClassName('photos_header_actions')[0];
					var container = document.getElementById('photosofme_wrapper') ? document.getElementById('photosofme_wrapper') : document.getElementById('photos_of_wrapper');
					addBigAlbumPicLinks(0, parents, 'normal_size', container, true);
				} else if (page.indexOf('pages/')!=-1) {
					parents = document.evaluate("//div[contains(@class,'photos_header_actions')][contains(string(),'Fan Photos')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
					var container = document.getElementById('photos_of_wrapper');
					addBigAlbumPicLinks(0, parents, 'normal_size', container, true);
				} else {
					parents = document.evaluate("//div[contains(@class,'sectiontype')]/h3",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE ,null);
					if (parents.snapshotLength>0) {
						for (i=0; i<parents.snapshotLength; i++) { addBigAlbumPicLinks(i, parents.snapshotItem(i), '', parents.snapshotItem(i).parentNode.nextSibling, true); }
					} else {
						parents = document.evaluate("//div[contains(@class,'summary_bar')][1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
						addBigAlbumPicLinks(0, parents, '', document.getElementById('album'), false);
					}
				}
			} catch(x) { log('BAP Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
		} else if ((page.match(/^profile.php\?.*\bv=info/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1 && page.indexOf('v=info')!=-1)) && document.getElementById('fbfbaplink0')) {
			document.getElementById('fbfbaplink0').parentNode.removeChild(document.getElementById('fbfbaplink0'));
			document.getElementById('fbfbappipe0').parentNode.removeChild(document.getElementById('fbfbappipe0'));
		}
	}
	
	//
	// Add calendar features to Events pages
	//
	if ((prefs['GoogleCalendar'] || prefs['iCalendar']) && page.indexOf('events.php')==0) {
		if (prefs['iCalendar'] && page.indexOf('events.php?bday=1')==0) {
			try {
				var elm = document.evaluate("//div[contains(@class,'summary_bar')][1]/div[@class='summary'][1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
				if (elm!=null) {
					if (elm.className.indexOf('fbfcal')!=-1) { return; }
					elm.className = elm.className + ' fbfcal';
					elm.innerHTML = elm.innerHTML + ' | <a href="#" id="fbfical">' + $l('ExportICalendarFile') + '</a><span id="fbfcalwarning"> ' + $l('ExportICalendarFileWarning') + '</span>';
					document.getElementById('fbfical').addEventListener('click', function(e) {
						if (e.target.href.match(/#$/)) {
							e.stopPropagation();
							e.preventDefault();
							document.getElementById('fbfical').innerHTML = $l('CreatingFile');
							setTimeout(function(){
								var now = new Date();
								var day = now.getDate();
								var month = now.getMonth()+1;
								var year = now.getFullYear();
								var divs = document.evaluate("//div[@class='bdaycal_month_section']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE ,null);
								var ical = 'BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0APRODID:Facebook Fixer%0D%0A';
								var eventMonth;
								var date;
								var days;
								var bdays;
								for (i=0; i<divs.snapshotLength; i++) {
									eventMonth = $m(divs.snapshotItem(i).id)+1+'';
									if (eventMonth<10) { eventMonth = '0' + eventMonth; }
									days = divs.snapshotItem(i).innerHTML.replace(/.*<\/table>/,'').split(/<br[^>]*>/g);
									for (j=0; j<days.length; j++) {
										if (m = days[j].match(/^(\d+)/)) {
											bdays = days[j].split(',');
											for (k=0; k<bdays.length; k++) {
												if (n = bdays[k].match(/[^>]+>([^<]+)/)) {
													date = ((eventMonth < month || (eventMonth == month && m[1] < day)) ? year-0+1 : year) + eventMonth + m[1];
													ical = ical + 'BEGIN:VEVENT%0D%0ASUMMARY:' + $l('Birthday',prefs['CalendarFullName'] ? n[1] : n[1].split(' ')[0]) + '%0D%0ADESCRIPTION:' + $l('Birthday',n[1]) + '%0D%0ADTSTART:' + date + '%0D%0ADTEND:' + date + '%0D%0ARRULE:FREQ=YEARLY%0D%0AEND:VEVENT%0D%0A';
												}
											}
										}
									}
								}
								e.target.href = 'data:text/calendar;charset=US-ASCII,' + ical + 'END:VCALENDAR';
								e.target.onclick='';
								location.replace(e.target.href);
								document.getElementById('fbfcalwarning').style.display = 'none';
								document.getElementById('fbfical').innerHTML = $l('ExportICalendarFile');
							},0);
						}
					}, false);
				}
			} catch(x) { log('CAL Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
		} else if (prefs['GoogleCalendar'] && page.indexOf('events.php?archive=1')!=0) {
			var divs = $c('partyrow');
			var now = new Date();
			var year = now.getFullYear();
			var div;
			if (divs.length>0) {
				for (var i=0; i<divs.length; i++) {
					div = divs[i];
					var tds = div.getElementsByTagName('td');
					for (var j=0; j<tds.length; j++) {
						if (tds[j].className == 'actions' && tds[j].innerHTML.indexOf('class="calLink"')==-1) {
							h = div.innerHTML;
							title = h.match(/class="etitle">([^<]+)</i)[1];
							where = h.match(/Where:<\/td><td>(.+?)<\/td/i)[1];
							when = h.match(/When:<\/td><td>(.+?)<\/td/i)[1];
							host = h.match(/Hosted by:<\/td><td>(.+?)<\/td/i)[1];
							var startDate, endDate;
							if (m = when.match(/^(.*)<.+?>(.*)$/)) {
								startDate = $d(m[1]);
								endDate = $d(m[2]);
							}
							else if (m = when.match(/(.*)( \d\d?:\d\d ?(am|pm)?).*( \d\d?:\d\d ?(am|pm)?)/)) {
								startDate = $d(m[1]+m[2]);
								endDate = $d(m[1]+m[4]);
								if (endDate!=null && endDate.before(startDate)) { endDate=endDate.getNextDay(); }
							}
							if (startDate==null || endDate==null) return;
							var calLink = document.createElement('a');
							calLink.innerHTML = $l('AddToCalendar');
							calLink.className = 'calLink';
							calLink.href = 'http://www.google.com/calendar/' + (prefs['GoogleApps'] && prefs['GoogleAppsDomain']!='' ? 'hosted/'+prefs['GoogleAppsDomain']+'/' : '') + 'event?action=TEMPLATE&text=' + title + '&dates=' + startDate.toISOString(true) + '/' + endDate.toISOString(true) + '&location=' + where + '&details=Hosted by ' + host;
							tds[j].appendChild(calLink);
							break;
						}
					}
				}
			}
		}
	}
	
	//
	// Show birthday info and Google Calendar link
	//
	if ((prefs['Age'] || prefs['Sign'] || prefs['GoogleCalendar']) && (page.match(/^profile.php/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1))) {
		try {
			var bdayNode = document.evaluate("//div[@class='birthday'][1]/dd",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
			if (bdayNode != null) {
				if (bdayNode.className!='fbfbday') {
					bdayNode.className='fbfbday';
					var info = '';
					var now = new Date();
					var bday = $d(bdayNode.innerHTML);
					if (bday!=null)  {
						var past = bday.past();
						if (prefs['Age']) { if (now.getFullYear()!=bday.getFullYear()) { info = info + '<br />' + $l('yearsOld',bday.getAge()); } }
						if (prefs['Sign']) { info = info + '<br /><span id="FBFsign">' + ' ' + bday.getSign() + '</span>'; }
						if (prefs['GoogleCalendar']) {
							var thisYearBday = new Date();
							thisYearBday.setTime(bday.getTime());
							thisYearBday.setYear(past ? now.getFullYear()-0+1 : now.getFullYear());
							var name = document.getElementById('profile_name').innerHTML;
							info = info + '<br /><a href="http://www.google.com/calendar/' + (prefs['GoogleApps'] && prefs['GoogleAppsDomain']!='' ? 'hosted/'+prefs['GoogleAppsDomain']+'/' : '') + 'event?action=TEMPLATE&text=' + $l('Birthday',prefs['CalendarFullName'] ? name : name.split(' ')[0]) + '&dates=' + thisYearBday.toISOString() + '/' + thisYearBday.getNextDay().toISOString() + '&details=' + $l('Birthday',name) + (prefs['CalendarBirthDate'] && now.getFullYear()!=bday.getFullYear() ? ' - ' + bday.format() : '') + '">' + $l('AddToGoogleCalendar') + '</a>';
						}
						bdayNode.innerHTML = bdayNode.innerHTML + info;
					}
				}
			}
		} catch(x) { log('AGE/CAL Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
	}
	
	//
	// Show video download link
	//
	if (prefs['DownloadVideo'] && page.match(/^video\/video.php\?.*v=/)) {
		try {
			var parent = $x1("//div[@id='video_actions']/ul[@class='actionspro'][1]");
			if (parent.innerHTML.indexOf($l('DownloadVideo'))==-1) {
				var embed = $x1("//div[@class='mvp_holder'][1]/embed[1]");
				var link = document.createElement('li');
				link.className = 'actionspro_li';
				link.innerHTML = '<a class="actionspro_a" href="' + unescape(embed.getAttribute('flashvars')).match(/video_src=([^&]*)/)[1] + '" title="' + $l('DownloadVideo') + '" />' + $l('DownloadVideo') + '</a>';
				parent.insertBefore(link, parent.lastChild.nextSibling);
			}
		} catch(x) { log('VID Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
	}
	
	//
	// Change page title
	//
	if (prefs['PageTitle'] && document.title.indexOf('Facebook | ')!=-1) { document.title = document.title.replace('Facebook | ', ''); }
	
	
	//
	// Reload Error Page
	//
	if (prefs['ErrorPageReload'] && $('content') && $('content').innerHTML.toLowerCase().indexOf('error while loading page from')!=-1 && $('try_again_button')) {
		tryAgainButton=$('try_again_button');
		if (tryAgainButton.className.indexOf('autoreload')==-1) {
			tryAgainButton.className = tryAgainButton.className + ' autoreload';
			tryAgainButton.value = $l('ReloadErrorPage');
			setTimeout("if (document.getElementById('try_again_button')) { window.location.reload(); }", 5000);
		}
	}
	
	//
	// Add Protocol Links
	//
	if (prefs['ProtocolLinks'] && (page.match(/profile\.php\?id=.*&v=info/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1) && page.indexOf('v=info')!=-1) && $('info_section_info_contact') && $('info_section_info_contact').className.indexOf('fbfhandled')==-1) {
		try {
			$('info_section_info_contact').className = $('info_section_info_contact').className + ' ' + 'fbfhandled';
			var dds = $('info_section_info_contact').getElementsByTagName('dd');
			var dts = $('info_section_info_contact').getElementsByTagName('dt');
			for (var i=0; i<dds.length; i++) {
				if (dts[i].innerHTML == 'Skype:') { dds[i].innerHTML = '<a href="skype:' + dds[i].innerHTML + '?call" title="' + $l('ProtocolSkype', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
				if (dts[i].innerHTML == 'Windows Live:') { dds[i].innerHTML = '<a href="msnim:chat?contact=' + dds[i].innerHTML + '" title="' + $l('ProtocolMSN', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
				if (dts[i].innerHTML == 'Yahoo:') { dds[i].innerHTML = '<a href="ymsgr:sendIM?' + dds[i].innerHTML + '" title="' + $l('ProtocolYahoo', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
				if (dts[i].innerHTML == 'Google Talk:') { dds[i].innerHTML = '<a href="xmpp:' + dds[i].innerHTML + '" title="' + $l('ProtocolGoogle', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
			}
		} catch(x) { log('PROTO Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
	}
	
	//
	// Load thumbnails for entire album
	//
	if (page.match(/^album.php?/)) {
		try {
			var pager = $c1('pagerpro');
			if (pager && pager.className.indexOf(' fbfhandled')==-1) {
				pager.id='fbf_photo_pagination';
				pager.className = pager.className + ' fbfhandled';
				if (prefs['AutoLoadFullAlbum']) {
					loadFullAlbum();
				} else {
					var loadAlbumLink = document.createElement('li');
					loadAlbumLink.className = 'pagerpro_li';
					loadAlbumLink.innerHTML = '<a id="FBFLoadAllPhotos" class="pagerpro_a" href="#" onclick="return false;" title="' + $l('LoadPhotosWarning') + '">' + $l('all') + '</a>';
					pager.insertBefore(loadAlbumLink, pager.lastChild.nextSibling);
					onClick('FBFLoadAllPhotos', function(e) {
						setTimeout(function(){ loadFullAlbum(); }, 0);
					});
				}
			}
		} catch(x) { log('FULL Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
	}

	//
	// Load thumbnails for tagged photos
	//
	if (page.match(/^profile.php?.*v=photos/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1 && page.indexOf('v=photos')!=-1)) {
		try {
			var pager = $c1('pagerpro');
			if (pager && pager.className.indexOf(' fbfhandled')==-1) {
				pager.id='fbf_photo_pagination';
				pager.className = pager.className + ' fbfhandled';
				if (prefs['AutoLoadTaggedPhotos']) {
					loadTaggedPhotos();
				} else {
					var loadAlbumLink = document.createElement('li');
					loadAlbumLink.className = 'pagerpro_li';
					loadAlbumLink.innerHTML = '<a id="FBFLoadAllPhotos" class="pagerpro_a" href="#" onclick="return false;" title="' + $l('LoadPhotosWarning') + '">' + $l('All') + '</a>';
					pager.insertBefore(loadAlbumLink, pager.lastChild.nextSibling);
					onClick('FBFLoadAllPhotos', function(e) {
						setTimeout(function(){ loadTaggedPhotos(); }, 0);
					});
				}
			}
		} catch(x) { log('FULL Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
	}

	
}


}) ();

// There are only 10 types of people in the world — those who understand ternary, those who don't, and those who mistake it for binary :)
