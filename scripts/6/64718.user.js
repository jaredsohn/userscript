// ==UserScript==
// @name        Facebook Fixer
// @namespace   http://userscripts.org/people/14536
// @description Enhancements for Facebook: bigger profile pictures and photos, easier viewing of albums, links to download videos, showing people's age and sign, google calendar integration, keyboard shortcuts & more. Compatible with new Facebook and fully customizable!
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @author      Vaughan Chandler
// @timestamp   1260157766298
// @version     2.0.0rc3
// ==/UserScript==

// Last edited 2009-12-31

/*
Facebook Fixer is Copyright (c) 2009, Vaughan Chandler
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * The name of the author may not be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY VAUGHAN CHANDLER ''AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL VAUGHAN CHANDLER BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


/*

DONE in 2.0.0rc3

Fixed ability to load all tagged photos on one page.
The "big album pictures" and "load full albums" features now support non-English localizations.
Updated Slovak localization (thanks to Peter Miksik).
Added Turkish localization (thanks to Gökhan Gurbeto?lu).


DONE in 2.0.0rc2

Forced "Big Pictures" to show above "ads"
Fixed translation using Google's translation API
Updated Greek localization (thanks to DoSMaN - http://userscripts.org/users/82259)
Added Chinese (Taiwan) localization (thanks to Acedia.Liu - http://userscripts.org/users/50953)
Fixed a bug causing the chat/notification popups to hide when automatically clicking on 'read more' links
Fixed ability to download videos after a Facebook change broke it
Added ability to download videos even if flash is not installed (thanks to Philipp Weis - http://userscripts.org/users/111324)
Cleaned up code for popup pictures
Added option to prevent automatically closing popup pics when the mouse is over them, which should prevent flickering especially at lower resolutions (thanks to Samuel Tai - http://userscripts.org/users/119171)


HIGH PRIORITY TODO:

Check HTTPS links (especially with the inbox)
Add option to see seconds in fbf timestamps
Add option to disable news feed / force live feed


TODO:

Change the FBF language selecter to show the language name in that language as well as English
Implement cross-browser XHR
Add option to show the thumbnail's alt/title text underneath the popup image
Add option to change bottom menu opacity on events: mouseover, chat seesion, new message etc
Add option to move all right column stuff on the homepage to the left column
Add option to autoclick on 'older posts' on homepage, profiles, etc
Add option to show current status in "whats on your mind" on the home page
Add option to immediately go to the popup search result if there is only one
Make it possible to have more than 6 applications bookmarked
Add option to show the number of chats with unread messages to the title bar
Modify homepage to make a "superhomepage" by moving the left and right column to a top row, with both the news feed and live feed below
	http://dl.getdropbox.com/u/927778/facebook%20superhomepage.png

*/


(function() {
	
if (self != window.top) { return; } // Don't run in frames

var version = '2.0.0 rc3';
var version_timestamp = 1262238673057; // javascript:window.alert(new Date().getTime());
var release_date = 20091231;

var loc;
var page = '';
var lastPage = '';
var homePageNotModified = true;
var id = 0;
var language = 'en';
var popupPicTimeout;

var lang = {
	// English - By Vaughan Chandler (20091117)
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
		'ConfAutoReadMore' : 'Automatically click on "read more" links.', // 20091104
		'ConfBigAlbumPictures' : 'Add a link on album pages to show bigger versions of all pictures on that page.',
		'ConfBlockThirdPartyStreams' : 'Automatically block streams for 3rd party apps (use \'edit options\' below the feed to unblock).',
		'ConfBottomBarHoverOpacity' : 'On mouse-over', // 20090830
		'ConfBottomBarOpacity' : 'Bottom menu bar transparency',
		'ConfCalendarBirthDate' : 'Include the person\'s birthdate in the event details.',
		'ConfCalendarFullName' : 'Use the person\'s full name as the title for birthdays (instead of just first name).',
		'ConfChatDifferentiate' : 'Use bold and italics to differentiate between available and idle buddies.', // 20090830
		'ConfChatHideIdle' : 'Hide idle buddies.', // 20090830
		'ConfDelayPopupPics' : 'Add a short delay before showing popup pictures.', // 20091117
		'ConfDelayPopupPicsTimeout' : 'Delay before showing popup pictures, in milliseconds (default=500):',
		'ConfDownloadVideo' : 'Add a link to download the videos from video pages. (You may need an <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Automaticaly reload application error pages after 5 seconds.',
		'ConfExternalPopup' : 'Popup full-sized versions of external images. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Language for Facebook Fixer', // 20090830
		'ConfFacebookTimestamps' : 'Show Facebook timestamps (eg. "3 hours ago").', // 20091025
		'ConfFBFTimestamps' : 'Add Facebook Fixer timestamps after Facebook timestamps (eg. "11:45").', // 20091025
		'ConfFBFTimestamps24' : 'Show Facebook Fixer timestamps in 24-hour format.', // 20091025
		'ConfGoogleApps' : 'Create Google Calendar links compatible with Google Apps.',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Add links to add birthdays and events to <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Language for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHeaderEvents' : 'Birthday/Event Enhancements', // OBSOLETE
		'ConfHeaderHomePage' : 'Home Page Customization', // OBSOLETE
		'ConfHeaderMenu' : 'Menu and Chat Enhancements', // OBSOLETE/20090830
		'ConfHeaderOther' : 'Other Options', // OBSOLETE
		'ConfHeaderPictures' : 'Picture Enhancements', // OBSOLETE
		'ConfHideEventStories' : 'Hide event stories.', // 20091025
		'ConfHideFanStories' : 'Hide fan stories.', // 20091025
		'ConfHideFriendStories' : 'Hide friend stories.', // 20091025
		'ConfHideGroupStories' : 'Hide group stories.', // 20091025
		'ConfHideLinkStories' : 'Hide link stories.', // 20091117
		'ConfHidePhotoStories' : 'Hide photo stories.', // 20091117
		'ConfHideProfilePicStories' : 'Hide profile pic stories.', // 20091117
		'ConfHideRead' : 'Hide items in the live feed that have been marked as read.', // 20091104
		'ConfHideRelationshipStories' : 'Hide relationship stories.', // 20091028
		'ConfHideTagStories' : 'Hide tag stories.', // 20091025
		'ConfHideVideoStories' : 'Hide video stories.', // 20091117
		'ConfHomeEvents' : 'Show the Events section.', // 20091117
		'ConfHomeFilterList' : 'Show the filter list.',
		'ConfHomeFilterListFixed' : 'Keep the filter list on the screen (only applies when its is in the left column).', // 20090830
		'ConfHomeFindFriends' : 'Show the Connect With Friends section.',
		'ConfHomeLeftAlign' : 'Left-align the contents of the home page.',
		'ConfHomePeopleYouMayKnow' : 'Show the Suggestions section.',
		'ConfHomePokes' : 'Show the Pokes section.',
		'ConfHomeRequests' : 'Show the Requests section.', // 20091117
		'ConfHomeRightColumn' : 'Show the right column.',
		'ConfHomeStretch' : 'Stretch the home page to the width of the browser window.',
		'ConfiCalendar' : 'Add links to download an <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> file with all birthdays.',
		'ConfInboxCountInTitle' : 'Show the number of unread messages in your inbox in the page title.', // 20091025
		'ConfProcessInterval' : 'Interval at which to process the page, in milliseconds (default=1000):',
		'ConfSectionAdvanced' : 'Advanced', // 20091102
		'ConfSectionEvents' : 'Birthdays/Events', // 20091102
		'ConfSectionHomePage' : 'Home Page', // 20091102
		'ConfSectionLiveFeed' : 'Live Feed', // 20091102
		'ConfSectionMenu' : 'Menus/Chat', // 20091102
		'ConfSectionOther' : 'Other Options', // 20091102
		'ConfSectionPictures' : 'Pictures', // 20091102
		'ConfSectionShortcuts' : 'Keyboard Shortcuts', // 20091102
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - Facebook Fixer configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show Facebook Fixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by Facebook Fixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfMoveFilterList' : 'Move the filter list to the top of the right column.',
		'ConfNotificationCountInTitle' : 'Show the number of new notifications in the page title.', // 20091025
		'ConfNewTabSearch' : 'Make search results open in a new tab/window when pressing CTRL + Enter to search.',
		'ConfPageTitle' : 'Remove "Facebook |" from the title of every page.',
		'ConfPhotoPopup' : 'Popup bigger versions of photos on mouse over.',
		'ConfPopupAutoClose' : 'Close popup pictures automatically.',
		'ConfPopupSmartAutoClose' : 'Prevent popup pictures from closing automatically if the mouse is over it.',
		'ConfPopupPosition' : 'Position for popup pictures',
		'ConfProfilePicPopup' : 'Popup bigger versions of profile pictures on mouse over',
		'ConfProtocolLinks' : 'Turn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
		'ConfSecureLinks' : 'Force Facebook links to point to HTTPS pages.', // 20090830
		'ConfShortcuts' : 'Enable keyboard shortcuts.', // 20091104
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
		'Refresh' : 'Refresh', // 20090830
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
	
	// Spanish - Contributed by Glen Farmer (20090830)
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
		'ConfAutoRefreshFeed' : 'Actualizar la lista de noticias cada minuto',
		'ConfBigAlbumPictures' : 'Añadir un enlace en la página de los álbumes mostrar las versiones grandes de todas las fotos en esa página.',
		'ConfBlockThirdPartyStreams' : 'Bloquear automaticamente STREAMS para las applicaciones de 3ra personas (Use \'edit options\' debajo del FEED para desbloquear).',
		'ConfBottomBarOpacity' : 'Transparencia de la barra de menu de abajo',
		'ConfCalendarBirthDate' : 'Incluir la fecha de cumpleaños de las personas en los detalles de los eventos.',
		'ConfCalendarFullName' : 'Usar el nombre completo de las personas para el titulo de los cumpleaños (en vez de solo el primer nombre).',
		'ConfChatDifferentiate' : 'Usar negrita y cursiva para diferenciar entre amigos disponibles y ausentes.',
		'ConfChatHideIdle' : 'Ocultar los amigos ausentes.',
		'ConfDelayPopupPics' : 'Esperar 0.5 segundos antes de enseñar el popup de las fotos.',
		'ConfDownloadVideo' : 'Añadir un enlace para descargar los videos de las paginas de videos. (Puede que necesites un <a href="http://es.wikipedia.org/wiki/Flash_Video#Reproductores_FLV" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Recargar automaticamente aplicaciones con errores despues de 5 segundos',
		'ConfExternalPopup' : 'Crear un popup con las fotos externas en tamaño real. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Lenguaje del Facebook Fixer',
		'ConfGoogleApps' : 'Crear enlaces de Calendarios de Google compatibles con las Aplicaciones de Google.',
		'ConfGoogleAppsDomain' : 'Dominio',
		'ConfGoogleCalendar' : 'Mostrar enlaces para añadir cumpleaños y eventos a <a href="http://es.wikipedia.org/wiki/Google_Calendar" target="_blank">Calendarios de Google</a>.',
		'ConfGoogleLanguage' : 'Idiomas para <a href="http://es.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHeaderEvents' : 'Mejoras de Cumpleaños/Eventos',
		'ConfHeaderHomePage' : 'Configuracion de la página de inicio',
		'ConfHeaderMenu' : 'Menú y Mejoras del Chat',
		'ConfHeaderOther' : 'Otras Opciones',
		'ConfHeaderPictures' : 'Mejoras de Fotos.',
		'ConfHomeFilterList' : 'Mostrar la lista del filtro.',
		'ConfHomeFilterListFixed' : 'Mantener la lista de filtro visible aun al haber bajado en la pagina (solo disponible cuando la lista esta en la columna izquierda)',
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
		'ConfSecureLinks' : 'Hacer que los links apunten a paginas HTTPS.',
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
		'Remove' : 'Eliminar',
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
	
	// French - Contributed by Serge Thiry (20090830)
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
	
	// Italian - Contributed by Dario Archetti (20090729)
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
	
	// German - Contributed by Constantin Groß (20090830)
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
	
	// Bulgarian - Contributed by Svetlozar Mladenoff (20090830)
	bg : {
		'AddToCalendar' : '???????? ??? ????????',
		'AddToGoogleCalendar' : '???????? ??? Google Calendar',
		'all' : '??????',
		'All' : '??????',
		'AllPhotosLoaded' : '?????? ?????? ?? ????????',
		'Automatic' : '???????????',
		'Birthday' : '???????? ??? ?? %s',
		'CreatingFile' : '????????? ?? ????',
		'Close' : '?????????',
		'ConfigureFacebookFixer' : '????????????? ?? Facebook Fixer',
		'ConfigureInstructions' : '?????? ??????? ?? ??????????? ???????, ?? ????? ???? ?? ?? ????????? ????? ??? ???? ???????? ??????.',
		'ConfAge' : '????????? ?? ????????? (??? ????????????? ?? ??????????? ????? ??????? ????).',
		'ConfAutoBigAlbumPictures' : '??????????? ????????? ?? ??-?????? ?????? ?? ????????, ?????? ?????????? ?? ??????.',
		'ConfAutoLoadFullAlbum' : '??????????? ????????? ?? ??????? ?? ?????? ??????? ? ?????, ???????? ?? ?? ???? ????????.',
		'ConfAutoLoadTaggedPhotos' : '??????????? ????????? ?? ??????? ?? ?????? ??????? ??????, ???????? ?? ?? ???? ???????? (????? ?????? ?? ???????).',
		'ConfAutoRefreshFeed' : '??????????? ??????????? ?? ???????? ????? ??????.',
		'ConfBigAlbumPictures' : '???????? ?? ?????? ?? ?????????? ? ?????? ?? ????????? ?? ????????? ?????? ?? ?????? ??????, ???????????? ?? ???? ????????.',
		'ConfBlockThirdPartyStreams' : '??????????? ????????? ?? ???????? ?? ?????????? ?? ????? ?????? (???????????  \'?????????\' ??? ????? ?? ????????????).',
		'ConfBottomBarHoverOpacity' : '??? ?????? ??????',
		'ConfBottomBarOpacity' : '??????????? ?? ??????? ????',
		'ConfCalendarBirthDate' : '????????? ?? ????????? ???? ?? ??????????? ? ????????? ?? ?????????.',
		'ConfCalendarFullName' : '?????????? ?? ????? ????? ?? ?????? ???? ???????? ?? ????????? ??? (? ?????? ?? ???? ??????? ???).',
		'ConfChatDifferentiate' : '?????????? ?? ???????? ? ???????? ????? ?? ??????????? ?? ???????? ?? ????? ? ??????.',
		'ConfChatHideIdle' : '???????? ?? ??????-??????????.',
		'ConfDelayPopupPics' : '????????? ?? ??????? ??????? ????? ????????? ?? ????? ?? ??????.',
		'ConfDownloadVideo' : '???????? ?? ?????? ?? ??????? ?? ????? ??????????. (???? ?? ?? ?????? <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV ??????</a>)',
		'ConfErrorPageReload' : '??????????? ???????????? ?? ?????????? ? ?????? ?? ?????????? ???? 5 ???????.',
		'ConfExternalPopup' : '????? ?????? ?? ???????? ???????? ??? ?????. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : '???? ?? Facebook Fixer',
		'ConfGoogleApps' : '????????? ?? Google Calendar ??????, ?????????? ? Google Apps.',
		'ConfGoogleAppsDomain' : '??????',
		'ConfGoogleCalendar' : '???????? ?? ?????? ?? ????????? ?? ??????? ??? ? ??????? ? <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : '???? ?? <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHeaderEvents' : '?????????? ?? ?????? ???/???????',
		'ConfHeaderHomePage' : '??????????????? ?? ???????? ????????',
		'ConfHeaderMenu' : '?????????? ?? ???? ? ???',
		'ConfHeaderOther' : '????? ???????????',
		'ConfHeaderPictures' : '???????? ??????????',
		'ConfHomeFilterList' : '????????? ?? ??????? ? ??????.',
		'ConfHomeFilterListFixed' : '????????? ?? ??????? ? ?????? ?????, ???? ???? ?????????? (???? ??? ??????? ?? ?????? ? ?????? ??????).',
		'ConfHomeFindFriends' : '????????? ?? ???????? ?? ? ???????? ????????.',
		'ConfHomeLeftAlign' : '???? ???????????? ?? ???????????? ?? ???????? ????????.',
		'ConfHomeHighlights' : '????????? ?? ?????? ???????.',
		'ConfHomePeopleYouMayKnow' : '????????? ?? ?????? ???????????.',
		'ConfHomePokes' : '????????? ?? ???????? ?? ??????????.',
		'ConfHomeRightColumn' : '????????? ?? ??????? ??????.',
		'ConfiCalendar' : '???????? ?? ?????? ?? ????????? ?? <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-???? ? ?????? ??????? ???.',
		'ConfShortcutList' : '<b>????? ??????</b> (??????/????? ????????????):<br /><br /><i>?? ??? ?? ? ????????:</i><br />&nbsp;<b>A</b> - ??????/??????<br />&nbsp;<b>B</b> - ???????????? ?? ?????? ???????? ?? ?????<br />&nbsp;<b>C</b> - ????????????? ?? Facebook Fixer<br />&nbsp;<b>F</b> - ????????<br />&nbsp;<b>H</b> - ?????? ????????<br />&nbsp;<b>I</b> - ??????? ?????<br />&nbsp;<b>L</b> - ???????????/??????????? ?? Facebook Fixer ?? ????????? ?? ??????? ?? ??????????<br />&nbsp;<b>N</b> - ????????<br />&nbsp;<b>P</b> - ??????<br />&nbsp;<b>T</b> - ?????? ?? ?????????? ?????<br />&nbsp;<b>&lt;escape&gt;</b> - ????????? ?? ????????? ????????, ???????? ?? Facebook Fixer<br /><br /><i>?? ?????????? ????????</i>:<br />&nbsp;<b>f</b> or <b>l</b> - ?????? ?? ????<br />&nbsp;<b>i</b> - ??????????<br />&nbsp;<b>n</b> - ??????<br />&nbsp;<b>p</b> - ??????<br />&nbsp;<b>s</b> ??? <b>u</b> - ??????? ? ???????<br /><br /><i>?? ?????????</i>:<br />&nbsp;<b>i</b> - ????<br />&nbsp;<b>p</b> - ??????<br />&nbsp;<b>w</b> - ?????<br />&nbsp;<b>x</b> - ?????<br /><br /><i>?? ???????? ? ????????? (????????, ???????? ? ?.?.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - ????????<br />&nbsp;<b>&lt;right arrow&gt;</b> - ????????<br />&nbsp;<b>&lt;Shift&gt; + &lt;left arrow&gt;</b> - ????? (?????? ? ????????)<br />&nbsp;<b>&lt;Shift&gt; + &lt;right arrow&gt;</b> - ???????? (?????? ? ????????)<br /><br /><i>??? ??????????? ?? ??????/??????:</i><br />&nbsp;<b>a</b> - ????????? ?? ?????? ??????? (?????? ? ????????)<br />&nbsp;<b>b</b> - ????????? ?? ?????? ??????<br />&nbsp;<b>c</b> - ??????? ?? ???????????<br />&nbsp;<b>k</b> - ????? ??? ??????<br />&nbsp;<b>m</b> - ?????? ?? (?????) ? ???<br /><br /><i>??? ??????????? ?? ???????? ?????? ? ??????/??????? ??????:</i><br />&nbsp;<b>a</b> ??? &nbsp;<b>r</b> - ???????? ??????<br />&nbsp;<b>m</b> ??? &nbsp;<b>u</b> - ???????? ?? ??????? ??????????<br />&nbsp;<b>o</b> - ?????? ? ???<br />&nbsp;<b>p</b> - ??? ??????<br />&nbsp;<b>t</b> ??? &nbsp;<b>f</b> - ??????? ????????',
		'ConfMoveFilterList' : '??????????? ?? ??????? ? ?????? ???-?????? ?? ??????? ??????.',
		'ConfMoveHighlights' : '??????????? ??????? ???-?????? ?? ??????? ??????.',
		'ConfNewTabSearch' : '??????????? ?? ???????? ?? ?? ??????? ? ??? ???/????????, ?????? ? ???????? Ctrl + Enter ??? ???????.',
		'ConfPageTitle' : '?????????? ?? "Facebook |" ?? ?????????? ?? ????? ????????.',
		'ConfPhotoPopup' : '????????? ?? ??-?????? ??????? ?? ???????? ??? ?????? ??????.',
		'ConfPopupAutoClose' : '??????????? ????????? ?? ??????????? ????????.',
		'ConfPopupPosition' : '??????? ?? ??????????? ????????',
		'ConfProfilePicPopup' : '????????? ?? ??-?????? ??????? ?? ?????????? ?????? ??? ?????? ??????',
		'ConfProtocolLinks' : '?????????? ?? ID-???? ?? ????????? ??? ??????, ????? ???????? ???????? (Google Talk, Windows Live ? ?.?.).',
		'ConfRoundedProfilePics' : '????????? ?? ???????? ???????? ??????.',
		'ConfSecureLinks' : '???????????? ?? Facebook ???????? ?? ????? ?? HTTPS ????????.',
		'ConfShortcuts' : '??????????? ?? ????? ??????. (????? <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">???????</a>)',
		'ConfSign' : '????????? ??????? ?? ????????? (??? ? ???????? ??????? ????).',
		'ConfTopBarFixed' : '????????? ?? ??????? ???? ?? ??????, ???? ??? ??????????.',
		'ConfTopBarHoverOpacity' : '??? ?????? ??????',
		'ConfTopBarOpacity' : '??????????? ?? ??????? ????',
		'ConfUpdates' : '??????????? ?? Userscripts.org ????????? ?? ??????? ?? Facebook Fixer. ??? <a href="#" id="fbfUpdateLink" onclick="return false;">???????? ????</a>.',
		'DownloadVideo' : '???????? ?? ???????',
		'ExportICalendarFile' : '???????????? ? iCalendar-????',
		'ExportICalendarFileWarning' : '(???? ?? ?????? ?????, ??? ????? ????? ????????)',
		'fullAlbumLoaded' : '?????? ????? ? ???????',
		'Left' : '??????',
		'ListeningRestarted' : 'Facebook Fixer ?????????? ?????????? ?? ???????.',
		'ListeningStopped' : 'Facebook Fixer ???? ?????????? ?? ???????.\n????????? L (Shift + l) ?? ???????? ???????',
		'LoadingAllPhotos' : '????????? ?? ?????? ??????...',
		'loadingFullAlbum' : '????????? ?? ????? ?????...',
		'LoadingPic' : '????????? ?? ????????...',
		'LoadPhotosWarning' : '??????????? ?? ?????? ?????? ???? ?? ?????? ????? ?????',
		'Months' : new Array('??????','????????','????','?????','???','???','???','??????','?????????','????????','???????','????????'),
		'ProtocolSkype' : '???????? ?? %s ?? Skype',
		'ProtocolMSN' : '??? ? %s ???? Windows Live',
		'ProtocolYahoo' : '??? ? %s ???? Yahoo Messenger',
		'ProtocolGoogle' : '??? ? %s ???? Google Talk',
		'ReloadErrorPage' : '???????? ?? ???????? ???? ??? ????????? 5 ???????',
		'Remove' : '??????????',
		'Right' : '???????',
		'ShowBigPictures' : '????????? ?? ?????? ??????',
		'Signs' : new Array('???????','???????','????','????','?????','????????','???','???','????','?????','????????','???????'),
		'today' : '????',
		'UpdateAvailable1' : '??????? ? ?????????? ?? Facebook Fixer',
		'UpdateAvailable2' : '??????? ?? ?? ???????? ?????',
		'UpdateHomepage' : '??? ???????? ????????',
		'UpdateInstall' : '??????????? ????',
		'UpdateTomorrow' : '????????? ????',
		'yearsOld' : '?? %s ??????'
	},
	
	// Greek - Contributed by Dimitris DoSMaN Sarlis (20091205)
	el : {
		'AddToCalendar' : '???????? ??? ??????????',
		'AddToGoogleCalendar' : '???????? ??? ?????????? ??? Google',
		'all' : '???',
		'All' : '???',
		'AllPhotosLoaded' : '???? ?? ??????????? ??????????',
		'Automatic' : '????????',
		'Birthday' : '????????? %s',
		'CreatingFile' : '?????????? ???????',
		'Close' : '????????',
		'ConfigureFacebookFixer' : '?????????? Facebook Fixer',
		'ConfigureInstructions' : '???? ?? ??????? ????????????? ?????, ???? ??????? ??????? ?????? ?? ??? ??????????? ?? ???????? ??? ????? ??? ????????.',
		'ConfAge' : '???????? ??? ??????? ?????? ??? ?????? ???? (???? ?????? ????? ??????? ??? ?????? ??????????).',
		'ConfAutoBigAlbumPictures' : '???????? ???????? ??????? ??????? ??????? ???? ? ?????? ???????.',
		'ConfAutoLoadFullAlbum' : '???????? ??????? ???????????? ??? ???? ??? ??????? ??? ??????? ?? ??? ??????.',
		'ConfAutoLoadTaggedPhotos' : '???????? ??????? ???????????? ??? ???? ??? "???????????" ??????????? ?? ??? ?????? (???? ??????? ???????????, ??? ?????? ??? ????????).',
		'ConfAutoReadMore' : '???????? ???? ??? ???????? "???????? ???????????"', // 20091104
		'ConfAutoRefreshFeed' : '???????? ???????? ??? ??????????? ????, ???? ?????.', // 20090830
		'ConfBigAlbumPictures' : '???????? ????????? ???? ??????? ??? ???????, ??? ???????? ??????????? ??????? ???? ??? ??????? ???? ???????????? ??????.',
		'ConfBlockThirdPartyStreams' : '????????? ???????????? ???? ??? ??????????? ?????? (?????????????? ?? \'??????????? ????????\' ???? ??? ?? ??? ??? ?????????????).',
		'ConfBottomBarHoverOpacity' : '???? ?? ??????? ??? ?????????', // 20090830
		'ConfBottomBarOpacity' : '????????? ??? ???? ??????? ?????.',
		'ConfCalendarBirthDate' : '?? ????????????? ? ?????????? ???????? ??? ?????? ???? ??????????? ?????????.',
		'ConfCalendarFullName' : '????? ??? ?????? ???????? ??? ?????? ??? ????? ????????? (???? ??? ???? ?? ?????).',
		'ConfChatDifferentiate' : '????? ??????? ??? ??????? ????????? ??? ????????????? ?????? ?????????? ??? ??????? ?????.', // 20090830
		'ConfChatHideIdle' : '???????? ??????? ?????.', // 20090830
		'ConfDelayPopupPics' : '??????? 0.5 ????????????? ???? ??? ???????? ??????????? ???????.', // 20090830
		'ConfDelayPopupPicsTimeout' : '???????????????? ???? ??? ???????? ??? ??????????? ???????, ?? ???????? ??? ????????????? (??????????=500):',
		'ConfDownloadVideo' : '???????? ????????? ??? ???? ?????? ??? ??? ??????? ??????. (?????? ?? ??????????? ?? <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '???????? ???????????? ??????? ????????? ?? ????????, ???? ??? 5 ????????????.',
		'ConfExternalPopup' : '??????? ??????????? ???????? ??? ?????????? ???????. <sup>???????????</sup>',
		'ConfFacebookFixerLanguage' : '?????? ??? ?? Facebook Fixer', // 20090830
		'ConfFacebookTimestamps' : '???????? ??? ???? ??? Facebook (??. "???? 3 ????").', // 20091025
		'ConfFBFTimestamps' : '???????? ??? ???? ??? Facebook Fixer ???? ??? ??? ??? ??? Facebook (??. "11:45").', // 20091025
		'ConfFBFTimestamps24' : '???????? ??? ???? ??? Facebook Fixer ?? 24-??? ?????.', // 20091025
		'ConfGoogleApps' : '?????????? ??????????? Google, ??????? ?? ????????? Google.',
		'ConfGoogleAppsDomain' : '??????:',
		'ConfGoogleCalendar' : '???????? ????????? ??? ???????? ?????????? ??? ????????? ??? <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">?????????? Google</a>.',
		'ConfGoogleLanguage' : '?????? ??? <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">?????????? Google</a>',
		'ConfHeaderEvents' : '?????????? ??? ?????????/????????',
		'ConfHeaderHomePage' : '????????????? ?????? ??????Home',
		'ConfHeaderMenu' : '?????????? ??? ????? ??? ??????????', // 20090830
		'ConfHeaderOther' : '????? ????????',
		'ConfHeaderPictures' : '?????????? ???????????',
		'ConfHideEventStories' : '???????? ???????? ??????????.', // 20091025
		'ConfHideFanStories' : '???????? ???????? ?????????.', // 20091025
		'ConfHideFriendStories' : '???????? ???????? ?????.', // 20091025
		'ConfHideGroupStories' : '???????? ???????? ??????.', // 20091025
		'ConfHideLinkStories' : '???????? ???????? ?????????.', // 20091117
		'ConfHidePhotoStories' : '???????? ???????? ???????????.', // 20091117
		'ConfHideProfilePicStories' : '???????? ???????? ??????? ??????.', // 20091117
		'ConfHideRead' : '???????? ???????????? ??? ??? ?????????? ???? ??? ????? ????????? ??? ??????????.', // 20091104
		'ConfHideRelationshipStories' : '???????? ???????? ??????.', // 20091028
		'ConfHideTagStories' : '???????? ???????? ???????????.', // 20091025
		'ConfHideVideoStories' : '???????? ???????? ??????.', // 20091117
		'ConfHomeEvents' : '???????? ??? ?????????? ??????????.', // 20091117
		'ConfHomeFilterList' : '???????? ????? ???????.',
		'ConfHomeFilterListFixed' : '????? ??? ????? ??????? ?????, ????? ??? ?? ??????????? ???? ?? ???? (????????? ???? ???? ? ????? ????? ???? ???????? ?????).', // 20090830
		'ConfHomeFindFriends' : '???????? ??? ????? "?????????? ?? ??????".',
		'ConfHomeLeftAlign' : '???????? ???????? ??? ???????????? ??? ??????? ???????.',
		'ConfHomeHighlights' : '???????? ??? ????? "?? ?????????".',
		'ConfHomePeopleYouMayKnow' : '???????? ??? ????? "?????????".',
		'ConfHomePokes' : '???????? ??? ?????????????.',
		'ConfHomeRequests' : '???????? ??? ?????????? ?????????.', // 20091117
		'ConfHomeRightColumn' : '???????? ??? ?????? ????????.',
		'ConfHomeStretch' : '??????? ??? ??????? ??????? ?? ???? ?? ?????? ??? ????????? ??? ?????????.',
		'ConfiCalendar' : '???????? ????????? ??? ???? ??????? <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> ?? ??? ?? ?????????.',
		'ConfInboxCountInTitle' : '???????? ??? ??????? ??? ?????????? ????????? ??? ??????????? ???? ????? ??? ???????.', // 20091025
		'ConfProcessInterval' : '???????? ??? ?????????? ??? ?? ???????? ? ??????, ?? ???????? ??? ?????????????. (??????????=1000):',
		'ConfSectionAdvanced' : '??? ?????????????', // 20091102
		'ConfSectionEvents' : '?????????/??????????', // 20091102
		'ConfSectionHomePage' : '?????? ??????', // 20091102
		'ConfSectionLiveFeed' : '?????????? ????', // 20091102
		'ConfSectionMenu' : '?????/?????????', // 20091102
		'ConfSectionOther' : '????? ????????', // 20091102
		'ConfSectionPictures' : '???????', // 20091102
		'ConfSectionShortcuts' : '???????????? ?????????????', // 20091102
		'ConfShortcutList' : '<b>???????????? ?????????????</b> (?????????? ??????????):<br /><br /><i>??? ??????????? ??????:</i><br />&nbsp;<b>A</b> - ???????/???????????<br />&nbsp;<b>B</b> - ????????/???????? ????? ????? (?????????? ?????)<br />&nbsp;<b>C</b> - ???????? Facebook Fixer<br />&nbsp;<b>F</b> - ?????<br />&nbsp;<b>H</b> - ?????? ??????<br />&nbsp;<b>I</b> - ???????????<br />&nbsp;<b>L</b> - ????????/????????? ??? Facebook Fixer ??? ?? ?? "??????" ??????? ???? ???????<br />&nbsp;<b>N</b> - ????????????<br />&nbsp;<b>P</b> - ?? ?????? ???<br />&nbsp;<b>T</b> - ????????? ??????????? ????????<br />&nbsp;<b>&lt;escape&gt;</b> - ???????? ??????????? ????????????? ??? ?? Facebook Fixer<br /><br /><i>??? ??? ?????? ??????</i>:<br />&nbsp;<b>f</b> ? <b>l</b> - ???????? ?????????????<br />&nbsp;<b>i</b> - ???????????? ????????<br />&nbsp;<b>n</b> - ??????????? ????<br />&nbsp;<b>p</b> - ???????????<br />&nbsp;<b>s</b> ? <b>u</b> - ?????????? ??????????<br /><br /><i>??? ??????</i>:<br />&nbsp;<b>i</b> - ???????????<br />&nbsp;<b>p</b> - ???????????<br />&nbsp;<b>w</b> - ??????<br />&nbsp;<b>x</b> - ???????<br /><br /><i>??? ??????? ?? ???????? (???????????, ???????, ?.?.)</i><br />&nbsp;<b>&lt;???????? ??????&gt;</b> - ???????????<br />&nbsp;<b>&lt;???? ??????&gt;</b> - ???????<br />&nbsp;<b>&lt;shift&gt; + &lt;???????? ??????&gt;</b> - ?????? (???? ????? ?????????)<br />&nbsp;<b>&lt;shift&gt; + &lt;???? ??????&gt;</b> - ????????? (???? ????? ?????????)<br /><br /><i>???? ??? ??????? ???????/???????????:</i><br />&nbsp;<b>a</b> - ??????? ???? ??? ???????????? (???? ????? ?????????)<br />&nbsp;<b>b</b> - ???????? ??????????? ???????????<br />&nbsp;<b>c</b> - ???????? ????????????<br />&nbsp;<b>k</b> - ????????? ??? ???????<br />&nbsp;<b>m</b> - ??????????? ??? (?????) ??? ?????<br /><br /><i>???? ??? ???????? ????????? ??????? ??? ???????????/??????????? ???????????:</i><br />&nbsp;<b>a</b> ? &nbsp;<b>r</b> - ???????? ???????<br />&nbsp;<b>m</b> ? &nbsp;<b>u</b> - ?????????? ??? ??????<br />&nbsp;<b>o</b> - ??????????? ?? ????<br />&nbsp;<b>p</b> - ?? ??????????? ???<br />&nbsp;<b>t</b> ? &nbsp;<b>f</b> - ??????????? ?????',
		'ConfMoveFilterList' : '????????? ??? ????? ??????? ??? ???? ????? ?????.',
		'ConfNotificationCountInTitle' : '???????? ??? ???? ???????????? ???? ????? ??? ???????.', // 20091025
		'ConfMoveFilterList' : '?????????? ??? ?????? ??????? ???? ?????? ??? ?????? ????????.',
		'ConfMoveHighlights' : '?????????? ??? ?????????? ??? ???? ????? ??? ?????? ????????.',
		'ConfNewTabSearch' : '??????? ?????????? ?? ?????????? ??????? ? ???????? ???? ??????? ?? CTRL + Enter ??? ?????????.',
		'ConfPageTitle' : '???????? ??? "Facebook |" ??? ??? ????? ??? ???? ???????.',
		'ConfPhotoPopup' : '???????? ??????????? ??????????? ?? ?????????? ??????? ???? ?? ??????? ??? ?????????.',
		'ConfPopupAutoClose' : '???????? ??????????? ??????????? ????????.',
		'ConfPopupPosition' : '???? ??????????? ???????????',
		'ConfProfilePicPopup' : '???????? ??????????? ??????????? ?????? ?? ?????????? ??????? ???? ?? ??????? ??? ?????????',
		'ConfProtocolLinks' : '????????? ??? Messenger IDs ??? ?????? ?? ?????????? ???? ?????? ?? ????????? ???????? ?? ?????? (Google Talk, Windows Live etc).',
		'ConfRoundedProfilePics' : '???????? ?????????????????? ??????? ??????.',
		'ConfSecureLinks' : '?????????? ???? ?????????? ??? Facebook ?? ???????? ?? ???????? (HTTPS) ???????.', // 20090830
		'ConfShortcuts' : '???????????? ???????????? ?????????????. (???????? <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">??????</a>)',
		'ConfSign' : '???????? ??? ?????? ??? ?????? ??? ?????? ??? (?????? ???? ????? ??? ?????? ?????????? ????????).',
		'ConfTopBarFixed' : '????? ??? ???? ????? ????? ???? ??????, ????? ??? ?? ? ?????? ?????? ???? ?? ????.',
		'ConfTopBarHoverOpacity' : '???? ?? ??????? ??? ?????????', // 20090830
		'ConfTopBarOpacity' : '????????? ?????? ????? ???????',
		'ConfUpdates' : '??????? Userscripts.org ?????????? ??? ??????????? ??????????? ??? Facebook Fixer ? <a href="#" id="fbfUpdateLink" onclick="return false;">??????? ????</a>.',
		'DownloadVideo' : '???? ??????',
		'ExportICalendarFile' : '??????? ??????? iCalendar',
		'ExportICalendarFileWarning' : '(???? ?? ????? ?????? ??? ?? ????? ??????? ??????)',
		'fullAlbumLoaded' : '? ??????? ??? ??????? ????????????',
		'Left' : '????????',
		'ListeningRestarted' : '?? Facebook Fixer ???????? ?? "??????" ??? ??????? ????.',
		'ListeningStopped' : '?? Facebook Fixer ????????? ?? "??????" ??? ???????.\n??????? ?? L (SHIFT + l) ??? ???????????? ????',
		'LoadingAllPhotos' : '??????? ???? ??? ???????????...',
		'loadingFullAlbum' : '??????? ???? ??? ???????...',
		'LoadingPic' : '??????? ???????...',
		'LoadPhotosWarning' : '? ??????? ???? ??? ??????????? ?????? ?? ????? ?????? ???',
		'Months' : new Array('??????????','???????????','???????','????????','?????','???????','???????','?????????','???????????','?????????','?????????','??????????'),
		'ProtocolSkype' : '????? %s ???? Skype',
		'ProtocolMSN' : '???????? ?? %s ???? Windows Live',
		'ProtocolYahoo' : '???????? ?? %s ???? Yahoo Messenger',
		'ProtocolGoogle' : '???????? ?? %s ???? Google Talk',
		'ReloadErrorPage' : '??????? ??? ?????? ???? ? ?????????? 5 ????????????',
		'Refresh' : '????????', // 20090830
		'Remove' : '????????', // 20090830
		'Right' : '?????',
		'ShowBigPictures' : '???????? ??????????? ???????',
		'Signs' : new Array('?????????','????????','??????','?????','??????','???????','????????','????','????????','?????','????????','???????'),
		'today' : '??????', // this is the lower case version of the text Facebook uses on the home page to mark today's birthdays
		'UpdateAvailable1' : '??????? ?????????? ????????? ?????? ??? Facebook Fixer',
		'UpdateAvailable2' : '?????? ?? ??? ??????????? ????;',
		'UpdateHomepage' : '????????? ???? ?????? ??????',
		'UpdateInstall' : '??????????? ????',
		'UpdateTomorrow' : '?????????? ?????',
		'yearsOld' : '%s ??????'
	},
	
	// Slovak - Contributed by Peter Miksik (20091213)
	sk : {
		'AddToCalendar' : 'Prida? do Kalendára',
		'AddToGoogleCalendar' : 'Prida? do Kalendára Google',
		'all' : 'všetko',
		'All' : 'Všetko',
		'AllPhotosLoaded' : 'Všetky fotografie na?ítané',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narodeniny %s',
		'CreatingFile' : 'Vytvorenie súboru',
		'Close' : 'Zavrie?',
		'ConfigureFacebookManager' : 'Konfigurova? Facebook Fixer',
		'ConfigureInstructions' : 'Všetky zmeny sú ukladané okamžite, ale niektoré zmeny sa nemusia prejavi? na kartách, ktoré sú už otvorené.',
		'ConfAge' : 'Zobrazi? vek ?udí v ich profiloch (ak poskytli celý dátum narodenia)',
		'ConfAutoBigAlbumPictures' : 'Automaticky pri otvorení stránky zobrazi? vä?šie obrázky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky na?íta? miniatúry všetkých obrázkov v albume na jednej stránke',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky na?íta? miniatúry všetkých fotografií s menovkou na jednej stránke (karta Fotky v profiloch ?udí)',
		'ConfAutoReadMore' : 'Automaticky kliknú? na odkazy "?íta? ?alej"',
		'ConfBigAlbumPictures' : 'Prida? odkaz na stránkach albumu na zobrazenie vä?ších verzií všetkých obrázkov na tejto stránke',
		'ConfBlockThirdPartyStreams' : 'Automaticky blokova? streamy aplikácií tretej strany (na odblokovanie použite dole položku \'Upravi? nastavenia\')',
		'ConfBottomBarHoverOpacity' : 'Pri ukázaní myšou',
		'ConfBottomBarOpacity' : 'Prieh?adnos? spodného panela s ponukou',
		'ConfCalendarBirthDate' : 'Zahrnú? narodeniny osoby do podrobností udalosti',
		'ConfCalendarFullName' : 'Použi? celé meno osoby ako názov narodenín (namiesto krstného mena)',
		'ConfChatDifferentiate' : 'Použi? tu?né písmo a kurzívu na rozlíšenie pripojených a ne?inných priate?ov',
		'ConfChatHideIdle' : 'Skry? ne?inných priate?ov',
		'ConfDelayPopupPics' : 'Po?ka? 0,5 sekundy pred na?ítaním obrázkov v kontextovom okne',
		'ConfDelayPopupPicsTimeout' : 'Oneskorenie pred zobrazením obrázkov v kontextovom okne, v milisekundách (predvolené=500):',
		'ConfDownloadVideo' : 'Prida? odkaz na prevzatie videí zo stránok s videom (možno budete potrebova? <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">prehráva? FLV</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundách znova na?íta? chybové stránky aplikácií',
		'ConfExternalPopup' : 'Externé obrázky plnej ve?kosti v kontextovom okne <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jazyk pre Facebook Fixer',
		'ConfFacebookTimestamps' : 'Zobrazi? ?asové zna?ky Facebooku (t. j. "pred 3 hodinami")',
		'ConfFBFTimestamps' : 'Prida? ?asové zna?ky skriptu Facebook Fixer za ?asové zna?ky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'Zobrazi? ?asové zna?ky skriptu Facebook Fixer v 24-hodinovom formáte',
		'ConfGoogleApps' : 'Vytvori? odkazy pre Google Calendar kompatibilné s Google Apps',
		'ConfGoogleAppsDomain' : 'Doména',
		'ConfGoogleCalendar' : 'Prida? odkazy na zaradenie narodenín a udalostí do aplikácie <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pre <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHeaderEvents' : 'Vylepšenia narodenín/udalostí',
		'ConfHeaderHomePage' : 'Prispôsobenie stránky Domov',
		'ConfHeaderMenu' : 'Vylepšenia ponuky a chatu',
		'ConfHeaderOther' : '?alšie možnosti',
		'ConfHeaderPictures' : 'Vylepšenia obrázkov',
		'ConfHideEventStories': 'Skry? v aktualitách príspevky z udalostí',
		'ConfHideFanStories': 'Skry? v aktualitách príspevky o fanúšikoch',
		'ConfHideFriendStories': 'Skry? v aktualitách príspevky priate?ov',
		'ConfHideGroupStories': 'Skry? v aktualitách príspevky o skupinách',
		'ConfHideLinkStories' : 'Skry? príspevky o odkazoch',
		'ConfHidePhotoStories' : 'Skry? príspevky o fotkách',
		'ConfHideProfilePicStories' : 'Skry? príspevky o profilových fotkách',
		'ConfHideRead' : 'Skry? v aktualitách položky, ktoré boli ozna?ené ako pre?ítané',
		'ConfHideRelationshipStories' : 'Skry? v aktualitách prísepvky o vz?ahu',
		'ConfHideTagStories': 'Skry? v aktualitách príspevky o ozna?ení',
		'ConfHideVideoStories' : 'Skry? príespevky o videách',
		'ConfHomeEvents' : 'Zobrazi? ?as? Udalosti',
		'ConfHomeFilterList' : 'Zobrazi? zoznam filtrov',
		'ConfHomeFilterListFixed' : 'Ponecha? zoznam filtrov vidite?ný aj pri posúvaní stránky nadol (k dispozícii len vtedy, ak je zoznam v ?avom st?pci)',
		'ConfHomeFindFriends' : 'Zobrazi? ?as? Spojte sa s priate?mi',
		'ConfHomeLeftAlign' : 'Zarovna? obsah stránky Domov na?avo',
		'ConfHomePeopleYouMayKnow' : 'Zobrazi? ?as? Návrhy',
		'ConfHomePokes' : 'Zobrazi? ?as? Štuchnutia',
		'ConfHomeRequests' : 'Zobrazi? ?as? Žiadosti',
		'ConfHomeRightColumn' : 'Zobrazi? pravý st?pec',
		'ConfHomeStretch' : 'Roztiahnu? úvodnú stránku na šírku okna preh?adáva?a',
		'ConfiCalendar' : 'Prida? odkazy na prevzatie súboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> so všetkými narodeninami',
		'ConfInboxCountInTitle' : 'Zobrazi? v názve stránky po?et nepre?ítaných prijatých správ',
		'ConfProcessInterval' : 'Interval spracovania stránky, v milisekundách (predvolené=1000):',
		'ConfSectionAdvanced' : 'Spresnenie',
		'ConfSectionEvents' : 'Narodeniny/Udalosti',
		'ConfSectionHomePage' : 'Stránka Domov',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'Ponuky/Chat',
		'ConfSectionOther' : '?alšie možnosti',
		'ConfSectionPictures' : 'Obrázky',
		'ConfSectionShortcuts' : 'Klávesové skratky',
		'ConfShortcutList' : '<b>Klávesové skratky</b> (rozlišujú sa malé/ve?ké písmená):<br /><br /><i>Z ?ubovo?nej stránky:</i><br />&nbsp;<b>A</b> – Albumy/fotky<br />&nbsp;<b>B</b> – Prepnú? zoznam priate?ov (online priatelia)<br />&nbsp;<b>C</b> – Konfigurácia skriptu Facebook Fixer<br />&nbsp;<b>D</b> – Narodeniny<br />&nbsp;<b>E</b> – Udalosti<br />&nbsp;<b>F</b> – Priatelia<br />&nbsp;<b>H</b> – Domov<br />&nbsp;<b>I</b> – Prijaté správy<br />&nbsp;<b>L</b> – Vybra? odkaz Odhlási? sa (po odhlásení stla?te Enter)<br />&nbsp;<b>N</b> – Upozornenia<br />&nbsp;<b>P</b> – Váš profil<br />&nbsp;<b>R</b> – Žiadosti<br />&nbsp;<b>S</b> – Presko?i? na pole H?ada?<br />&nbsp;<b>T</b> – Preloži? vybraný text<br />&nbsp;<b>?</b> – Zobrazi? informácie o ladení skriptu Facebook Fixer<br />&nbsp;<b>&lt;Esc&gt;</b> – Zavrie? kontextové okná vytvorené skriptom Facebook Fixer<br /><br /><i>Zo stránky Domov (filtre)</i>:<br />&nbsp;<b>a</b> – Stránky<br />&nbsp;<b>f</b> – Aktuality<br />&nbsp;<b>g</b> – Skupiny<br />&nbsp;<b>l</b> – Odkazy<br />&nbsp;<b>n</b> – Novinky<br />&nbsp;<b>p</b> – Fotky<br />&nbsp;<b>s</b> alebo <b>u</b> – ?o robia ostatní<br />&nbsp;<b>t</b> – Poznámky<br />&nbsp;<b>v</b> – Videá<br /><br /><i>Z profilov</i>:<br />&nbsp;<b>i</b> – Informácie<br />&nbsp;<b>p</b> – Fotky<br />&nbsp;<b>w</b> – Nástenka<br />&nbsp;<b>x</b> – Prie?inky<br /><br /><i>Zo stránok s navigáciou (dozadu, dopredu at?.)</i><br />&nbsp;<b>&lt;šípka do?ava&gt;</b> – Dozadu<br />&nbsp;<b>&lt;šípka doprava&gt;</b> – Dopredu<br />&nbsp;<b>&lt;shift&gt; + &lt;šípka do?ava&gt;</b> – Prvá (ak je k dispozícii)<br />&nbsp;<b>&lt;shift&gt; + &lt;šípka doprava&gt;</b> – Posledná (ak je k dispozícii)<br /><br /><i>Po?as prezerania albumov/fotiek:</i><br />&nbsp;<b>a</b> – Na?íta? všetky miniatúry (ak je k dispozícii)<br />&nbsp;<b>b</b> – Zobrazi? ve?ké obrázky<br />&nbsp;<b>c</b> – Zobrazi? komentáre<br />&nbsp;<b>k</b> – Spä? na album<br />&nbsp;<b>m</b> – Fotky osoby a m?a<br /><br /><i>Po?as prezerania najnovších albumov a nahratých fotiek/fotiek s menovkou:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> – Najnovšie albumy<br />&nbsp;<b>m</b> alebo &nbsp;<b>u</b> – Nahraté z mobilu<br />&nbsp;<b>o</b> – Fotky, na ktorých som ja<br />&nbsp;<b>p</b> – Moje fotky<br />&nbsp;<b>t</b> alebo &nbsp;<b>f</b> Menovky priate?ov',
		'ConfMoveFilterList' : 'Presunú? zoznam filtrov navrch pravého st?pca',
		'ConfNoficationCountInTitle' : 'Zobrazi? v názve stránky po?et nových upozornení',
		'ConfNewTabSearch' : 'Pri vyh?adávaní otvori? stla?ením Ctrl+Enter výsledky h?adania na novej karte/v novom okne',
		'ConfPageTitle' : 'Odstráni? "Facebook |" z názvu všetkých stránok',
		'ConfPhotoPopup' : 'Vä?šie verzie fotiek v kontextovom okne po ukázaní myšou',
		'ConfPopupAutoClose' : 'Automaticky zatvára? kontextové okná s obrázkami',
		'ConfPopupSmartAutoClose' : 'Zabráni? automatickému zatvoreniu kontext. okna s obrázkom ukázaním myšou',
		'ConfPopupPosition' : 'Umiestnenie kontextového okna s obrázkom',
		'ConfProfilePicPopup' : 'Vä?šie verzie profilových fotiek v kontextovom okne po ukázaní myšou',
		'ConfProtocolLinks' : 'Zmeni? ID pre okamžité správy na odkazy spúš?ajúce konverzáciu (Google Talk, Windows Live at?.)',
		'ConfSecureLinks' : 'Presmerova? odkazy Facebooku na stránky HTTPS',
		'ConfShortcuts' : 'Povoli? klávesové skratky',
		'ConfSign' : 'Zobrazi? znamenie ?udí v ich profiloch (ak poskytli svoj dátum narodenia)',
		'ConfTopBarFixed' : 'Vždy zobrazi? vrchný panel s ponukou aj pri posúvaní stránky nadol',
		'ConfTopBarHoverOpacity' : 'Pri ukázaní myšou',
		'ConfTopBarOpacity' : 'Prieh?adnos? vrchného panela s ponukou',
		'ConfUpdates' : 'Denne na Userscripts.org overova? aktualizácie pre Facebook Fixer, prípadne <a href="#" id="fbfUpdateLink" onclick="return false;">skontrolova? teraz</a>.',
		'DownloadVideo' : 'Prevzia? video',
		'ExportICalendarFile' : 'Exportova? súbor iCalendar',
		'ExportICalendarFileWarning' : '(Ak máte mnoho priate?ov, môže to chví?u trva?.)',
		'fullAlbumLoaded' : 'celý album na?ítaný',
		'Left' : 'V?avo',
		'ListeningRestarted' : 'Facebook Fixer spustil znova sledovanie zmien.',
		'ListeningStopped' : 'Facebook Fixer zastavil sledovanie zmien.\nStla?ením klávesu L (Shift+l) sledovanie znova aktivujete.',
		'LoadingAllPhotos' : 'Na?ítavajú sa všetky fotky...',
		'loadingFullAlbum' : 'Na?ítava sa celý album...',
		'LoadingPic' : 'Na?ítava sa obrázok...',
		'LoadPhotosWarning' : 'Na?ítavanie všetkých fotiek môže chví?u trva?',
		'Months' : new Array('Január','Február','Marec','Apríl','Máj','Jún','Júl','August','September','Október','November','December'),
		'ProtocolSkype' : 'Vola? %s pomocou Skype',
		'ProtocolMSN' : 'Chatova? s %s pomocou Windows Live',
		'ProtocolYahoo' : 'Chatova? s %s pomocou Yahoo Messenger',
		'ProtocolGoogle' : 'Chatova? s %s pomocou Google Talk',
		'ReloadErrorPage' : 'Kliknite na Skúsi? znova alebo po?kajte 5 sekúnd',
		'Refresh' : 'Obnovi?',
		'Remove' : 'Odstráni?',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'Zobrazi? ve?ké obrázky',
		'Signs' : new Array('Kozorožec','Vodnár','Ryba','Baran','Býk','Blíženci','Rak','Lev','Panna','Váhy','Škorpión','Strelec'),
		'today' : 'dnes',
		'UpdateAvailable1' : 'K dispozícii je aktualizácia skriptu Facebook Fixer.',
		'UpdateAvailable2' : 'Chcete aktualizova? teraz?',
		'UpdateHomepage' : 'Prejs? na dom. stránku',
		'UpdateInstall' : 'Nainštalova?',
		'UpdateTomorrow' : 'Pripomenú? zajtra',
		'yearsOld' : '%s rokov'
	},
	
	// Dutch - Contributed by Larissa van Sunder (20091107)
	nl : {
		'AddToCalendar' : 'Toevoegen aan kalender',
		'AddToGoogleCalendar' : 'Toevoegen aan Google Calender',
		'all' : 'allemaal',
		'All' : 'Allemaal',
		'AllPhotosLoaded' : 'Alle fotos geladen',
		'Automatic' : 'Automatisch',
		'Birthday' : '%s\'s verjaardag',
		'CreatingFile' : 'Folder crëeren',
		'Close' : 'Sluit',
		'ConfigureFacebookFixer' : 'Configureer Facebook Fixer',
		'ConfigureInstructions' : 'Alle veranderingen worden onmiddelijk opgeslagen, maar sommige veranderingen zullen niet kunnen worden toegepast in vensters die al open zijn',
		'ConfAge' : 'Laat mensen hun leeftijd op hun profiel zien (wanneer zij hun volledige geboortedatum aangeven)',
		'ConfAutoBigAlbumPictures' : 'Laat automatisch grotere album foto\'s zien wanneer de pagina opent.',
		'ConfAutoLoadFullAlbum' : 'Laad automatisch miniaturen voor alle illustraties in een album op een enkele pagina.',
		'ConfAutoLoadTaggedPhotos' : 'Laad automatisch miniaturen voor alle getagde illustraties in een album op een enkele pagina (het foto\'s venster op mensen hun profiel.',
		'ConfAutoReadMore' : 'Klik automatisch op "lees meerdere" links.',
		'ConfBigAlbumPictures' : 'Link toevoegen op album pagina\'s om grotere versies van alle foto\'s op die pagina te laten zien.',
		'ConfBlockThirdPartyStreams' : 'Automatisch nieuwsoverzichten blokkeren van derden toepassingen.',
		'ConfBottomBarHoverOpacity' : 'Bij het overscrollen',
		'ConfBottomBarOpacity' : 'Transparantie menu bar aan het einde van de pagina', 
		'ConfCalendarBirthDate' : 'Includeer de persoon zijn geboortedatum in de evenementen details.',
		'ConfCalendarFullName' : 'Gebruik de persoon zijn volledige naam voor de titel van verjaardagen (in plaats van alleen de voornaam).',
		'ConfChatDifferentiate' : 'Gebruik dikgedrukt en cursief om te differentiëren tussen beschikbaar en niet beschikbaar.', 
		'ConfChatHideIdle' : 'Verberg niet beschikbare vrienden.',
		'ConfDelayPopupPics' : 'Een vertraging toevoegen voor het laten zien van popup foto\'s.',
		'ConfDelayPopupPicsTimeout' : 'Vertraging voor het laten zien van popup foto\'s, in milliseconden (standaard=500):',
		'ConfDownloadVideo' : 'Een link toevoegen voor het downloaden van videos van video pagina\'s. (Je hebt misschien een <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV speler</a> nodig)',
		'ConfErrorPageReload' : 'Automatisch toepassingen error pagina\'s reloaden.', 
		'ConfErrorPageTimeout' : 'Vertraag voor het herladen van de toepassingen error pagina\'s, in seconden (standaard=5)',
		'ConfExternalPopup' : 'Popup versies in volledige grootte van externe illustraties. <sup>experimenteel</sup>',
		'ConfFacebookFixerLanguage' : 'Taal voor Facebook Fixer',
		'ConfFacebookTimestamps' : 'Laat Facebook timestamps zien (bijv. "3 uur geleden").',
		'ConfFBFTimestamps' : 'Facebook Fixer timestamps toevoegen na Facebook timestamps (bijv. "11:45").',
		'ConfFBFTimestamps24' : 'Laat Facebook Fixer timestamps zien in 24-uurs formaat.',
		'ConfGoogleApps' : 'Crëer Google Calendar links die werken met Google Apps.',
		'ConfGoogleAppsDomain' : 'Domein',
		'ConfGoogleCalendar' : 'Links toevoegen om verjaardagen en evenementen toe te voegen aan <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Taal voor <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideEventStories' : 'Verberg evenement overzichten in het live overzicht.',
		'ConfHideFanStories' : 'Verberg fan overzichten in het live overzicht.',
		'ConfHideFriendStories' : 'Verberg vriend overzichten in het live overzicht.',
		'ConfHideGroupStories' : 'Verberg groep overzichten in het live overzicht.',
		'ConfHideRead' : 'Verberg delen in het nieuws overzicht die rood gemarkeerd zijn.',
		'ConfHideRelationshipStories' : 'Verberg relatie overzichten in het live overzicht.',
		'ConfHideTagStories' : 'Verberg tag overzichten in het live overzicht.',
		'ConfHomeFilterList' : 'Laat de filter lijst zien.',
		'ConfHomeFilterListFixed' : 'Behoud de filter lijst op het scherm (wordt alleen toegepast waneer het in de linker kolom is).',
		'ConfHomeFindFriends' : 'Laat de \'In contact komen met vrienden\' sectie zien.',
		'ConfHomeLeftAlign' : 'Links uitlijn de inhoud van de startpagina.',
		'ConfHomePeopleYouMayKnow' : 'Laat de Suggesties sectie zien.',
		'ConfHomePokes' : 'Laat de Porren sectie zien.',
		'ConfHomeRightColumn' : 'Laat de rechter kolom zien.',
		'ConfHomeStretch' : 'Stretch de startpagina naar de wijdte van het venster.',
		'ConfiCalendar' : 'Links toevoegen om een <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> folder met alle verjaardagen te downloaden.',
		'ConfInboxCountInTitle' : 'Laat het aantal ongelezen berichten in je inbox in de titelpagina zien.',
		'ConfProcessInterval' : 'Interval waarop de pagina moet worden verwerkt, in milliseconden (default=1000):',
		'ConfSectionAdvanced' : 'Geavanceerd',
		'ConfSectionEvents' : 'Verjaardagen/Evenementen',
		'ConfSectionHomePage' : 'Startpagina',
		'ConfSectionLiveFeed' : 'Live Overzicht',
		'ConfSectionMenu' : 'Toepassingen/Chat',
		'ConfSectionOther' : 'Andere opties',
		'ConfSectionPictures' : 'Foto\'s',
		'ConfSectionShortcuts' : 'Keyboard Sneltoets',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - Facebook Fixer configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show Facebook Fixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by Facebook Fixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfMoveFilterList' : 'Verplaats de filter lijst naar de top van de rechter kolom.',
		'ConfNotificationCountInTitle' : 'Laat het aantal nieuwe noticicaties in de titelpagina zien.',
		'ConfNewTabSearch' : 'Open zoek resultaten in een nieuw venster/scherm wanneer CTRL + Enter om te zoeken wordt ingetoetst.',
		'ConfPageTitle' : 'Verwijder "Facebook |" van de titel van elke pagina.',
		'ConfPhotoPopup' : 'Grotere popup versies van foto\'s bij overscrollen.',
		'ConfPopupAutoClose' : 'Sluit popup foto\'s automatisch.',
		'ConfPopupPosition' : 'Positie voor popup foto\'s',
		'ConfProfilePicPopup' : 'Grotere popup versies van profiel foto\'s bij overscrollen',
		'ConfProtocolLinks' : 'Verander messenger ID\'s van profielen in links die beginnen met een conversatie met hen (Google Talk, Windows Live etc).',
		'ConfSecureLinks' : 'Dwing Facebook links te linken naar HTTPS pagina\'s.',
		'ConfShortcuts' : 'Toestaan van sneltoetsen.',
		'ConfSign' : 'Laat mensen hun sterrenbeeld op hun profiel zien (wanneer zij hun geboortedatum aangeven).',
		'ConfTopBarFixed' : 'Behoud de top meny bar op het scherm, zelfs bij het naar beneden scrollen.',
		'ConfTopBarHoverOpacity' : 'Bij overscrollen',
		'ConfTopBarOpacity' : 'Top menu bar transparentie',
		'ConfUpdates' : 'Check Userscripts.org dagelijks voor updates naar Facebook Fixer. Of <a href="#" id="fbfUpdateLink" onclick="return false;">check nu</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar folder',
		'ExportICalendarFileWarning' : '(Dit duurt wel even als je veel vrienden hebt)',
		'fullAlbumLoaded' : 'volledige album geladen',
		'Left' : 'Links',
		'LoadingAllPhotos' : 'Laad alle foto\'s...',
		'loadingFullAlbum' : 'Laad hele album...',
		'LoadingPic' : 'Laad foto...',
		'LoadPhotosWarning' : 'Het laden van alle foto\'s kan wel even duren',
		'Months' : new Array('januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'),
		'ProtocolSkype' : 'Bel %s door middel van Skype',
		'ProtocolMSN' : 'Chat met %s door middel van Windows Live',
		'ProtocolYahoo' : 'Chat met %s door middel van Yahoo Messenger',
		'ProtocolGoogle' : 'Chat met %s door middel van Google Talk',
		'Refresh' : 'Vernieuw',
		'ReloadErrorPage' : 'Klik om het nogmaals te proberen, of wacht %s seconden',
		'Remove' : 'Verwijder',
		'Right' : 'Rechts',
		'ShowBigPictures' : 'Laat grote foto\'s zien',
		'Signs' : new Array('Steenbok','Waterman','Vissen','Ram','Stier','Tweelingen','Kreeft','Leeuw','Maagd','Weegschaal','Schorpioen','Boogschutter'),
		'today' : 'vandaag',
		'UpdateAvailable1' : 'Een update is beschikbaar voor Facebook Fixer',
		'UpdateAvailable2' : 'Will je nu updaten?',
		'UpdateHomepage' : 'Ga naar startpagina',
		'UpdateInstall' : 'Nu installeren',
		'UpdateTomorrow' : 'Herinner me morgen',
		'yearsOld' : '%s jaar oud'
	},
	
	// Chinese (Taiwan) - Contributed by By Acedia.Liu (20091127)
	tw : {
		'AddToCalendar' : '????',
		'AddToGoogleCalendar' : '??Google??',
		'all' : '??',
		'All' : '??',
		'AllPhotosLoaded' : '??????',
		'Automatic' : '??',
		'Birthday' : '%s\???',
		'CreatingFile' : '????',
		'Close' : '??',
		'ConfigureFacebookFixer' : '?? Facebook Fixer',
		'ConfigureInstructions' : '?????????????????????????????????',
		'ConfAge' : '?????????\??????????????????',
		'ConfAutoBigAlbumPictures' : '?????????????????',
		'ConfAutoLoadFullAlbum' : '?????????????????',
		'ConfAutoLoadTaggedPhotos' : '??????????????????? (??\????????)?',
		'ConfAutoReadMore' : '????"????"???', // 20091104
		'ConfBigAlbumPictures' : '????????????????????',
		'ConfBlockThirdPartyStreams' : '????????????????(?? \'????\' ??????????)?',
		'ConfBottomBarHoverOpacity' : 'On mouse-over', // 20090830
		'ConfBottomBarOpacity' : '?????????',
		'ConfCalendarBirthDate' : '????\????????',
		'ConfCalendarFullName' : '????\?????????? (?????first name)?',
		'ConfChatDifferentiate' : '??????????????????', // 20090830
		'ConfChatHideIdle' : '????????', // 20090830
		'ConfDelayPopupPics' : '?????????????????????', // 20091117
		'ConfDelayPopupPicsTimeout' : '??????????????????(???=500):',
		'ConfDownloadVideo' : '??????????????? (????? <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '????????5????????',
		'ConfExternalPopup' : '??????????? <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Facebook Fixer?????', // 20090830
		'ConfFacebookTimestamps' : '??Facebook??????? (eg. "3 hours ago").', // 20091025
		'ConfFBFTimestamps' : '??Facebook Fixer??????? (eg. "11:45").', // 20091025
		'ConfFBFTimestamps24' : 'Facebook Fixer???????24????', // 20091025
		'ConfGoogleApps' : '??Google???????Google????????',
		'ConfGoogleAppsDomain' : '??',
		'ConfGoogleCalendar' : '???????????? <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : '?? <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHeaderEvents' : '??/?????', // OBSOLETE
		'ConfHeaderHomePage' : '????', // OBSOLETE
		'ConfHeaderMenu' : '??????????', // OBSOLETE/20090830
		'ConfHeaderOther' : '????', // OBSOLETE
		'ConfHeaderPictures' : '???????', // OBSOLETE
		'ConfHideEventStories' : '???????', // 20091025
		'ConfHideFanStories' : '???????', // 20091025
		'ConfHideFriendStories' : '???????', // 20091025
		'ConfHideGroupStories' : '???????', // 20091025
		'ConfHideLinkStories' : '???????', // 20091117
		'ConfHidePhotoStories' : '???????', // 20091117
		'ConfHideProfilePicStories' : '????????????', // 20091117
		'ConfHideRead' : '??????????????', // 20091104
		'ConfHideRelationshipStories' : '???????', // 20091028
		'ConfHideTagStories' : '???????', // 20091025
		'ConfHideVideoStories' : '???????', // 20091117
		'ConfHomeEvents' : '???????', // 20091117
		'ConfHomeFilterList' : '???????',
		'ConfHomeFilterListFixed' : '??????????? (???????????)?', // 20090830
		'ConfHomeFindFriends' : '???????',
		'ConfHomeLeftAlign' : '???????',
		'ConfHomePeopleYouMayKnow' : '???????',
		'ConfHomePokes' : '?????????',
		'ConfHomeRequests' : '???????', // 20091117
		'ConfHomeRightColumn' : '?????',
		'ConfHomeStretch' : '?????????????',
		'ConfiCalendar' : '???????? <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> file with all birthdays.',
		'ConfInboxCountInTitle' : '??????????????', // 20091025
		'ConfProcessInterval' : '??????????????? (???=1000):',
		'ConfSectionAdvanced' : '??', // 20091102
		'ConfSectionEvents' : '??/??', // 20091102
		'ConfSectionHomePage' : '??', // 20091102
		'ConfSectionLiveFeed' : '????', // 20091102
		'ConfSectionMenu' : '??/??', // 20091102
		'ConfSectionOther' : '????', // 20091102
		'ConfSectionPictures' : '??', // 20091102
		'ConfSectionShortcuts' : '?????', // 20091102
		'ConfShortcutList' : '<b>?????</b> (?????):<br /><br /><i>?????:</i><br />&nbsp;<b>A</b> - ??/??<br />&nbsp;<b>B</b> - ?????? (????)<br />&nbsp;<b>C</b> - Facebook Fixer ??<br />&nbsp;<b>D</b> - ??<br />&nbsp;<b>E</b> - ??<br />&nbsp;<b>F</b> - ??<br />&nbsp;<b>H</b> - ??<br />&nbsp;<b>I</b> - ??<br />&nbsp;<b>L</b> - ?????? (???????)<br />&nbsp;<b>N</b> - ??<br />&nbsp;<b>P</b> - ??????<br />&nbsp;<b>R</b> - ??<br />&nbsp;<b>S</b> - ??????<br />&nbsp;<b>T</b> - ???????<br />&nbsp;<b>?</b> - ??Facebook Fixer????<br />&nbsp;<b>&lt;escape&gt;</b> - ??Facebook Fixer??????<br /><br /><i>??? (??)</i>:<br />&nbsp;<b>a</b> - ??<br />&nbsp;<b>f</b> - ????<br />&nbsp;<b>g</b> - ??<br />&nbsp;<b>l</b> - ??<br />&nbsp;<b>n</b> - ????<br />&nbsp;<b>p</b> - ??<br />&nbsp;<b>s</b> or <b>u</b> - ????<br />&nbsp;<b>t</b> - ??<br />&nbsp;<b>v</b> - ??<br /><br /><i>?????</i>:<br />&nbsp;<b>i</b> - ??<br />&nbsp;<b>p</b> - ??<br />&nbsp;<b>w</b> - ?<br />&nbsp;<b>x</b> - ??<br /><br /><i>?????? (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - ???<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - ?? (?????)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - ?? (?????)<br /><br /><i>?????/??:</i><br />&nbsp;<b>a</b> - ?????? (?????)<br />&nbsp;<b>b</b> - ???????<br />&nbsp;<b>c</b> - ????<br />&nbsp;<b>k</b> - ????<br />&nbsp;<b>m</b> - ?? (??) ??<br /><br /><i>??????/?????:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - ?????<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - ????<br />&nbsp;<b>o</b> - ????<br />&nbsp;<b>p</b> - ????<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - ?????',
		'ConfMoveFilterList' : '?????????????',
		'ConfNotificationCountInTitle' : '????????????', // 20091025
		'ConfNewTabSearch' : '?? CTRL + Enter ????????????????',
		'ConfPageTitle' : '??????? "Facebook |" ???',
		'ConfPhotoPopup' : '?????????????????',
		'ConfPopupAutoClose' : '?????????',
		'ConfPopupPosition' : '??????????',
		'ConfProfilePicPopup' : '????????????????????????',
		'ConfProtocolLinks' : '??????ID?????????????????????? (Google Talk, Windows Live etc).',
		'ConfSecureLinks' : '?? Facebook ??? HTTPS ???', // 20090830
		'ConfShortcuts' : '????????', // 20091104
		'ConfSign' : '??????????\? ???? (?????????)?',
		'ConfTopBarFixed' : '???????????????????',
		'ConfTopBarHoverOpacity' : '??????', // 20090830
		'ConfTopBarOpacity' : '?????????',
		'ConfUpdates' : '?? Userscripts.org For Facebook Fixer ???? ?? <a href="#" id="fbfUpdateLink" onclick="return false;">????</a>.',
		'DownloadVideo' : '????',
		'ExportICalendarFile' : '?? iCalendar ??',
		'ExportICalendarFileWarning' : '(??????????????????)',
		'fullAlbumLoaded' : '??????',
		'Left' : '??',
		'ListeningRestarted' : 'Facebook Fixer has started listening for changes again.',
		'ListeningStopped' : 'Facebook Fixer has stopped listening for changes.\nPress L (SHIFT + l) to enable listening again',
		'LoadingAllPhotos' : '??????...',
		'loadingFullAlbum' : '??????...',
		'LoadingPic' : '?????...',
		'LoadPhotosWarning' : '???????????????',
		'Months' : new Array('??','??','??','??','??','??','??','??','??','??','???','???'),
		'ProtocolSkype' : '?? %s ?? Skype',
		'ProtocolMSN' : '?? %s ?? MSN',
		'ProtocolYahoo' : '?? %s ?? Yahoo ???',
		'ProtocolGoogle' : '?? %s ?? Google Talk',
		'ReloadErrorPage' : '?????, ????5??',
		'Refresh' : '??', // 20090830
		'Remove' : '??', // 20090830
		'Right' : '??',
		'ShowBigPictures' : '??????',
		'Signs' : new Array('???','???','???','???','???','???','???','???','???','???','???','???'),
		'today' : 'today', // this is the lower case version of the text Facebook uses on the home page to mark today's birthdays
		'UpdateAvailable1' : 'Facebook Fixer ???????',
		'UpdateAvailable2' : '????????',
		'UpdateHomepage' : '???',
		'UpdateInstall' : '????',
		'UpdateTomorrow' : '?????',
		'yearsOld' : '%s ?'
	},
	
	// Turkish - Contributed by Gökhan Gurbeto?lu (20091223)
	tr : {
		'AddToCalendar' : 'Takvime Ekle',
		'AddToGoogleCalendar' : 'Google Takvim\'e Ekle',
		'all' : 'tümü', // farkli bir tumu olabilir mi?
		'All' : 'Tümü', // benzer sorun
		'AllPhotosLoaded' : 'Tüm foto?raflar yüklendi',
		'Automatic' : 'Otomatik',
		'Birthday' : '%s\ Do?umgünü', // ingilizcesindeki ayirma isareti burda islevsiz kalmis
		'CreatingFile' : 'Dosya Olu?turuluyor',
		'Close' : 'Kapat',
		'ConfigureFacebookFixer' : 'Facebook Fixer\'? Yap?land?r',
		'ConfigureInstructions' : 'Bütün de?i?iklikler hemen kaydedilir ancak baz? de?i?iklikler halen aç?k olan sekmelerde etkisini göstermeyebilir.',
		'ConfAge' : 'Ki?ilerin ya??n? profillerinde göster (e?er tam do?um tarihlerini belirtmi?lerse).',
		'ConfAutoBigAlbumPictures' : 'Büyük albüm resimlerini sayfa aç?ld???nda otomatik olarak göster.',
		'ConfAutoLoadFullAlbum' : 'Bir albümdeki tüm küçük resimleri otomatik olarak tek sayfada yükle.',
		'ConfAutoLoadTaggedPhotos' : 'Tüm etiketlenmi? foto?raflar için küçük resimleri otomatik olarak tek sayfada yükle (ki?ilerin profilindeki foto?raflar sekmesi)',
		'ConfAutoReadMore' : '"Devam?n? gör" ba?lant?lar?na otomatik olarak t?kla.',
		'ConfBigAlbumPictures' : 'Albüm sayfalar?na bütün resimlerin büyük sürümlerini tek sayfada göstermek için bir ba?lant? ekle.',
		'ConfBlockThirdPartyStreams' : 'Üçüncü parti yaz?l?mlar?n haberlerini otomatik olarak engelle. (haber kayna??n?n alt?ndaki \'seçenekleri düzenle\'ye t?klayarak engellemeyi kald?rabilirsiniz).', // stream = haber yaptim, degisebilir
		'ConfBottomBarHoverOpacity' : 'Fare üstüne geldi?inde',
		'ConfBottomBarOpacity' : 'Alt menü çubu?u ?effafl???',
		'ConfCalendarBirthDate' : 'Etkinlik ayr?nt?lar? ki?inin do?umgününü içersin.',
		'ConfCalendarFullName' : 'Do?umgünleri için ki?inin tam ad?n? kullan (sadece ilk ad?n? kullanmak yerine).',
		'ConfChatDifferentiate' : 'Çevrimiçi ve bo?taki arkada?lar? ay?rt etmek için kal?n ve italik yaz?tipi kullan.', // idle = bosta yaptim, degisebilir
		'ConfChatHideIdle' : 'Bo?taki arkada?lar? gizle.', // benzer sorun
		'ConfDelayPopupPics' : 'Aç?l?r pencerede resimleri göstermeden önce k?sa bir gecikme zaman? ekle.', // popup = acilir pencere yaptim, degisebilir
		'ConfDelayPopupPicsTimeout' : 'Aç?l?r pencerede resimleri göstermeden önceki gecikme, milisaniye olarak (varsay?lan=500):', // benzer sorun
		'ConfDownloadVideo' : 'Video sayfalar?ndaki videolar? indirmek için bir ba?lant? ekle. (Bir <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV oynat?c?</a>\'ya ihtiyac?n?z olabilir)',
		'ConfErrorPageReload' : 'Uygulama hata sayfalar?n? 5 saniye sonra otomatik olarak yenile.',
		'ConfExternalPopup' : 'Harici sitelerdeki foto?raflar?n büyük sürümünü göster. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Facebook Fixer\'?n Dili',
		'ConfFacebookTimestamps' : 'Facebook\'un zaman etiketlerini göster (örn. "3 saat önce").',
		'ConfFBFTimestamps' : 'Facebook\'un zaman etiketlerinin ard?ndan Facebook Fixer zaman etiketlerini ekle (örn. "11:45").',
		'ConfFBFTimestamps24' : 'Facebook Fixer zaman etiketlerini 24-saat biçiminde göster',
		'ConfGoogleApps' : 'Google Apps ile uyumlu Google Takvim ba?lant?lar? olu?tur.',
		'ConfGoogleAppsDomain' : 'Etki Alan?',
		'ConfGoogleCalendar' : '<a href="http://tr.wikipedia.org/wiki/Google_Takvim" target="_blank">Google Takvim</a>\'e do?umgünü ve etkinlikler ekleyebilmek için ba?lant?lar? olu?tur.', // birinci 'add' yerine olustur
		'ConfGoogleLanguage' : '<a href="http://tr.wikipedia.org/wiki/Google_%C3%87eviri" target="_blank">Google Çeviri</a> için dil',
		'ConfHeaderEvents' : 'Do?umgünü/Etkinlik Geli?tirmeleri',
		'ConfHeaderHomePage' : 'Ana Sayfa Ki?iselle?tirmesi',
		'ConfHeaderMenu' : 'Menü ve Sohbet Geli?tirmeleri',
		'ConfHeaderOther' : 'Di?er Seçenekler',
		'ConfHeaderPictures' : 'Resim Geli?tirmeleri',
		'ConfHideEventStories' : 'Etkinlik haberlerini gizle.',
		'ConfHideFanStories' : 'Hayran haberlerini gizle.',
		'ConfHideFriendStories' : 'Arkada?l?k haberlerini gizle.',
		'ConfHideGroupStories' : 'Grup haberlerini gizle.',
		'ConfHideLinkStories' : 'Ba?lant? haberlerini gizle.',
		'ConfHidePhotoStories' : 'Foto?raf haberlerini gizle.',
		'ConfHideProfilePicStories' : 'Profil resmi haberlerini gizle.',
		'ConfHideRead' : 'Canl? haberlerdeki okundu olarak i?aretlenmi? ö?eleri gizle.',
		'ConfHideRelationshipStories' : '?li?ki haberlerini gizle.',
		'ConfHideTagStories' : 'Etiketleme haberlerini gizle.',
		'ConfHideVideoStories' : 'Video haberlerini gizle.',
		'ConfHomeEvents' : 'Etkinlik bölmesini göster.',
		'ConfHomeFilterList' : 'Filtre listesini göster.',
		'ConfHomeFilterListFixed' : 'Filtre listesini ekranda tut (sadece liste sol sütunda oldu?u zaman çal???r).',
		'ConfHomeFindFriends' : 'Arkada?lar?nla Ba?lant? Kur bölmesini göster.', // duzenleme gerekebilir
		'ConfHomeLeftAlign' : 'Ana sayfa içeri?ini sola yasla.',
		'ConfHomePeopleYouMayKnow' : 'Öneriler bölmesini göster.',
		'ConfHomePokes' : 'Dürtme bölmesini göster.', // duzenleme gerekebilir
		'ConfHomeRequests' : '?stekler bölmesini göster.',
		'ConfHomeRightColumn' : 'Sa? sütunu göster.',
		'ConfHomeStretch' : 'Ana sayfay? taray?c?n?n geni?li?ine s??acak ?ekilde uzat.',
		'ConfiCalendar' : 'Bütün do?umgünlerini içeren bir <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> dosyas? indirmek için ba?lant?lar? ekle.',
		'ConfInboxCountInTitle' : 'Sayfa ba?l???nda gelen kutusundaki okunmam?? mesaj say?s?n? göster.',
		'ConfProcessInterval' : 'Sayfay? i?lemek için zaman aral???, milisaniye olarak (varsay?lan=1000):',
		'ConfSectionAdvanced' : 'Geli?mi?',
		'ConfSectionEvents' : 'Do?umgünleri/Etkinlikler',
		'ConfSectionHomePage' : 'Ana Sayfa',
		'ConfSectionLiveFeed' : 'Canl? Haberler',
		'ConfSectionMenu' : 'Menüler/Sohbet',
		'ConfSectionOther' : 'Di?er Seçenekler',
		'ConfSectionPictures' : 'Resimler',
		'ConfSectionShortcuts' : 'Klavye K?sayollar?',
		'ConfShortcutList' : '<b>Klavye K?sayollar?</b> (büyük/küçük harf duyarl?):<br /><br /><i>Herhangi bir sayfadan:</i><br />&nbsp;<b>A</b> - Albümler/foto?raflar<br />&nbsp;<b>B</b> - Arkada? listesini aç/kapa (çevrimiçi arkada?lar)<br />&nbsp;<b>C</b> - Facebook Fixer yap?land?rmas?<br />&nbsp;<b>D</b> - Do?umgünleri<br />&nbsp;<b>E</b> - Etkinlikler<br />&nbsp;<b>F</b> - Arkada?lar<br />&nbsp;<b>H</b> - Ana Sayfa<br />&nbsp;<b>I</b> - Gelen Kutusu<br />&nbsp;<b>L</b> - Ç?k?? ba?lant?s?n? seç (ç?k?? yapmak için bundan sonra Enter\'a bas?n)<br />&nbsp;<b>N</b> - Bildirimler<br />&nbsp;<b>P</b> - Profiliniz<br />&nbsp;<b>R</b> - ?stekler<br />&nbsp;<b>S</b> - Arama alan?na git<br />&nbsp;<b>T</b> - Seçili metni tercüme et<br />&nbsp;<b>?</b> - Facebook Fixer hata ay?klama bilgisini göster<br />&nbsp;<b>&lt;escape&gt;</b> - Facebook Fixer taraf?ndan aç?lm?? pencereleri kapat<br /><br /><i>Ana sayfadan (filtreler):</i><br />&nbsp;<b>a</b> - Sayfalar<br />&nbsp;<b>f</b> - Canl? Haberler<br />&nbsp;<b>g</b> - Gruplar<br />&nbsp;<b>l</b> - Ba?lant?lar<br />&nbsp;<b>n</b> - Haber Kayna??<br />&nbsp;<b>p</b> - Foto?raflar<br />&nbsp;<b>s</b> veya <b>u</b> - Durum güncellemeleri<br />&nbsp;<b>t</b> - Notlar<br />&nbsp;<b>v</b> - Videolar<br /><br /><i>Profil sayfalar?ndan:</i><br />&nbsp;<b>i</b> - Bilgi<br />&nbsp;<b>p</b> - Foto?raflar<br />&nbsp;<b>w</b> - Duvar<br />&nbsp;<b>x</b> - Kutular<br /><br /><i>Numaraland?r?lm?? sayfalardan (önceki, sonraki, vb.):</i><br />&nbsp;<b>&lt;sol ok&gt;</b> - Önceki<br />&nbsp;<b>&lt;sa? ok&gt;</b> - Sonraki<br />&nbsp;<b>&lt;shift&gt; + &lt;sol ok&gt;</b> - ?lk (e?er mevcutsa)<br />&nbsp;<b>&lt;shift&gt; + &lt;sa? ok&gt;</b> - Son (e?er mevcutsa)<br /><br /><i>Albümleri/foto?raflar? görüntülerken:</i><br />&nbsp;<b>a</b> - Tüm küçük resimleri yükle (e?er mevcutsa)<br />&nbsp;<b>b</b> - Büyük resimleri göster<br />&nbsp;<b>c</b> - Yorumlar? göster<br />&nbsp;<b>k</b> - Albüme geri dön<br />&nbsp;<b>m</b> - (Ki?i) ve benim foto?raflar?m<br /><br /><i>Yak?n zamanlardaki albümleri ve yüklenmi?/etiketlenmi? foto?raflar? görüntülerken:</i><br />&nbsp;<b>a</b> veya &nbsp;<b>r</b> - Yak?n Zamandaki Albümler<br />&nbsp;<b>m</b> veya &nbsp;<b>u</b> - Mobil yüklemeler<br />&nbsp;<b>o</b> - Benim oldu?um foto?raflar<br />&nbsp;<b>p</b> - Foto?raflar?m<br />&nbsp;<b>t</b> veya &nbsp;<b>f</b> - Etiketlenmi? arkada?lar',
		'ConfMoveFilterList' : 'Filtre listesini sa? sütunun tepesine ta??.',
		'ConfNotificationCountInTitle' : 'Sayfa ba?l???nda bildirimlerin say?s?n? göster.',
		'ConfNewTabSearch' : 'CTRL + Enter basarak arama yap?ld???nda arama sonuçlar?n? yeni bir sekmede/pencerede aç.',
		'ConfPageTitle' : 'Bütün sayfalar?n ba?l???ndan "Facebook |" yaz?s?n? kald?r.',
		'ConfPhotoPopup' : 'Fareyle üstüne gelindi?inde foto?raflar?n büyük sürümlerini göster.',
		'ConfPopupAutoClose' : 'Aç?lan pencere resimlerini otomatik olarak kapat.',
		'ConfPopupPosition' : 'Aç?lan pencere resimlerinin konumu',
		'ConfProfilePicPopup' : 'Fareyle üstüne gelindi?inde profil resimlerinin büyük sürümlerini göster',
		'ConfProtocolLinks' : 'Profillerdeki anl?k ileti adreslerini an?nda ileti?im kurulabilecek ba?lant?lara dönü?tür (Google Talk, Windows Live, vb.).',
		'ConfSecureLinks' : 'Facebook ba?lant?lar?n? HTTPS sayfalar?n? kullanmaya zorla.', // "point" yerine "use" yaptim
		'ConfShortcuts' : 'Klavye k?sayollar?n? etkinle?tir.',
		'ConfSign' : 'Profillerde ki?ilerin burçlar?n? göster (e?er do?um tarihlerini belirtmi?lerse).',
		'ConfTopBarFixed' : 'Sayfa a?a?? kayd?r?lsa bile üst menü çubu?unu ekranda tut.',
		'ConfTopBarHoverOpacity' : 'Fare üstüne geldi?inde',
		'ConfTopBarOpacity' : 'Üst menü çubu?u ?effafl???',
		'ConfUpdates' : 'Facebook Fixer güncellemeleri için her gün Userscripts.org\'u ziyaret et. Ya da <a href="#" id="fbfUpdateLink" onclick="return false;">?imdi kontrol et</a>.',
		'DownloadVideo' : 'Videoyu ?ndir',
		'ExportICalendarFile' : 'iCalendar dosyas? aktar', // "export" yerine sadece aktar kullandim, degisebilir
		'ExportICalendarFileWarning' : '(E?er çok arkada??n?z varsa bu biraz uzun sürebilir)',
		'fullAlbumLoaded' : 'bütün albüm yüklendi',
		'Left' : 'Sol',
		'ListeningRestarted' : 'Facebook Fixer yeniden de?i?iklikleri izlemeye ba?lad?.',
		'ListeningStopped' : 'Facebook Fixer de?i?iklikleri izlemeyi durdurdu. \nDinlemeyi tekrar ba?latmak için L\'ye (SHIFT + l) bas?n',
		'LoadingAllPhotos' : 'Tüm foto?raflar yükleniyor...',
		'loadingFullAlbum' : 'tüm albüm yükleniyor...',
		'LoadingPic' : 'Resim Yükleniyor...',
		'LoadPhotosWarning' : 'Tüm foto?raflar? yüklemek uzun zaman alabilir',
		'Months' : new Array('Ocak','?ubat','Mart','Nisan','May?s','Haziran','Temmuz','A?ustos','Eylül','Ekim','Kas?m','Aral?k'),
		'ProtocolSkype' : '%s ki?isini Skype kullanarak ara',
		'ProtocolMSN' : '%s ile Windows Live kullanarak sohbet et',
		'ProtocolYahoo' : '%s ile Yahoo Messenger kullanarak sohbet et',
		'ProtocolGoogle' : '%s ile Google Talk kullanarak sohbet et',
		'ReloadErrorPage' : 'Yeniden denemek için t?klay?n, ya da 5 saniye bekleyin',
		'Refresh' : 'Yenile',
		'Remove' : 'Kald?r',
		'Right' : 'Sa?',
		'ShowBigPictures' : 'Büyük Resimleri Göster',
		'Signs' : new Array('O?lak','Koca','Bal?k','Koç','Bo?a','?kizler','Yengeç','Aslan','Ba?ak','Terazi','Akrep','Yay'),
		'today' : 'bugün',
		'UpdateAvailable1' : 'Facebook Fixer için bir güncelleme mevcut',
		'UpdateAvailable2' : '?imdi güncellemek ister misiniz?',
		'UpdateHomepage' : 'Ana sayfaya git',
		'UpdateInstall' : '?imdi kur',
		'UpdateTomorrow' : 'Yar?n hat?rlat',
		'yearsOld' : '%s ya??nda'
	}

}

//
// Greasemonkey functions / cross-browser stuff
//

// Make sure greasemonkey's functions work cause some browsers lie.
// Yes Chrome/Chromium, I'm talking about you...
var GM_getSet = false;
try {
	if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
		GM_setValue('testkey', 'testvalue');
		GM_getSet = GM_getValue('testkey', false) === 'testvalue';
	}
} catch(x) {}

function setValue(key, value) {
	if (GM_getSet) { GM_setValue(id+'-'+key, value); }
	else if (navigator.cookieEnabled) {
		var d = new Date();
		d.setTime(new Date().getTime()+31536000000);
		document.cookie = 'fbf-' + id + '-' + key + "=" + escape(value) + ";expires=" + d.toGMTString() + ';domain=.facebook.com';
	}
	prefs[key] = value;
}

function getValue(key, value) {
	if (GM_getSet) { return GM_getValue(id+'-'+key, value); }
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
	if (typeof GM_log !== 'undefined') { GM_log(str); return true; }
	else if (typeof console !== 'undefined' && console.log) { console.log(str); return true; }
	return false;
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
var buf = 'ProfilePicPopup,PhotoPopup,ExternalPopup,!DelayPopupPics,PopupAutoClose,!PopupSmartAutoClose,BigAlbumPictures,!AutoBigAlbumPictures,!AutoLoadFullAlbum,!AutoLoadTaggedPhotos,Age,Sign,iCalendar,GoogleCalendar,CalendarFullName,CalendarBirthDate,!GoogleApps,ChatDifferentiate,!ChatHideIdle,!HomeLeftAlign,!MoveFilterList,!HomeStretch,HomeFilterList,!HomeFilterListFixed,HomeRightColumn,HomePokes,HomePeopleYouMayKnow,HomeFindFriends,HomeEvents,HomeRequests,!BlockThirdPartyStreams,DownloadVideo,ErrorPageReload,PageTitle,!NotificationCountInTitle,InboxCountInTitle,NewTabSearch,!SecureLinks,Updates,ProtocolLinks,!TopBarFixed,Shortcuts,!FacebookTimestamps,FBFTimestamps,FBFTimestamps24,!HideEventStories,!HideFanStories,!HideFriendStories,!HideGroupStories,!HideLinkStories,!HidePhotoStories,!HideProfilePicStories,!HideRelationshipStories,!HideTagStories,!HideVideoStories,!AutoReadMore';
var booleanOptions = buf.split(',');
var prefs = {
	'FacebookFixerLanguage': getValue('FacebookFixerLanguage', 'auto'),
	'PopupPosition': getValue('PopupPosition', 'Auto'),
	'GoogleAppsDomain': getValue('GoogleAppsDomain', ''),
	'TopBarOpacity': getValue('TopBarOpacity', '1.0'),
	'TopBarHoverOpacity': getValue('TopBarHoverOpacity', '1.0'),
	'BottomBarOpacity': getValue('BottomBarOpacity', '0.9'),
	'BottomBarHoverOpacity': getValue('BottomBarHoverOpacity', '1.0'),
	'GoogleLanguage': getValue('GoogleLanguage', 'en'),
	'ProcessInterval': getValue('ProcessInterval', '1000'),
	'DelayPopupPicsTimeout' : getValue('DelayPopupPicsTimeout', '500')
}
for (var i=0; i<booleanOptions.length; i++) {
	bool = true;
	if (booleanOptions[i].charAt(0)=='!') {
		booleanOptions[i] = booleanOptions[i].replace('!','');
		bool = false;
	}
	prefs[booleanOptions[i]] = getValue(booleanOptions[i], bool)
}
prefs['HideRead'] = false; // This is broken

//
// Figure out what language we should be using
//
if (prefs['FacebookFixerLanguage'] == 'auto') {
	try {
		var facebookLanguage = document.getElementById('locale_selector_dialog_onclick').innerHTML.toLowerCase();
		if (facebookLanguage.indexOf('english')!=-1) { language = 'en'; }
		else if (facebookLanguage.indexOf('español')!=-1) { language = 'es'; }
		else if (facebookLanguage.indexOf('français')!=-1) { language = 'fr'; }
		else if (facebookLanguage.indexOf('?????????')!=-1) { language = 'bg'; }
		else if (facebookLanguage.indexOf('????????')!=-1) { language = 'el'; }
		else if (facebookLanguage.indexOf('sloven?ina')!=-1) { language = 'sk'; }
		else if (facebookLanguage.indexOf('nederlands')!=-1) { language = 'nl'; }
		else if (facebookLanguage.indexOf('??(??)')!=-1) { language = 'tw'; }
		else if (facebookLanguage.indexOf('türkçe')!=-1) { language = 'tr'; }
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
	'#fbfUpdatePopup { max-width:450px; margin:100px auto; padding:10px; }'+
	'.fbfImportant { font-weight:bold; }'+
	'.fbfNote { color:#777777; }'+
	'.fbfRight { text-align:right; }'+
	'.ad_story .social_ad_advert { z-index:0; }'
);

//
// Add div for showing big profile pics
//
var overPopupPic = false;
var div = document.createElement('div');
div.id = 'FBPPdiv';
div.className = 'fbfPopup FBPPdiv' + (prefs['PopupPosition']=='Auto' ? 'Left' : prefs['PopupPosition']);
div.innerHTML = '<div id="FBPPclose" title="' + $l('Close') + '">x</div><div id="FBPPheader">Facebook Fixer</div><div id="FBPPimg"><span></span></div>';
if (prefs['PopupSmartAutoClose']) {
	div.addEventListener('mouseover', function() { overPopupPic = true; log('over div'); }, false);
	div.addEventListener('mouseout', function() { overPopupPic = false; log('out div'); }, false);
}
try {
	document.body.insertBefore(div, document.body.lastChild.nextSibling);
	document.getElementById('FBPPclose').addEventListener('click', function() { document.getElementById('FBPPdiv').style.display='none'; }, false);
} catch(x) {
	var fbppdivAdder = setInterval(function() {
		try {
			document.body.insertBefore(div, document.body.lastChild.nextSibling);
			document.getElementById('FBPPclose').addEventListener('click', function() { document.getElementById('FBPPdiv').style.display='none'; }, false);
			if ($('FBPPdiv')) { clearInterval(fbppdivAdder); }
		} catch(x) {}
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
// Misc. Short Functions
//

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
	if (document.getElementsByClassName) { return root ? root.getElementsByClassName(className)[0] : document.getElementsByClassName(className)[0]; }
	else { return $x1('//*[contains(@class,"'+className+'")][1]',root); }
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
	evt.initEvent('click', true, true);
	elm.dispatchEvent(evt);
}

// Click on an element selected using xpath
function clickX(path) {
	var elm = $x1(path);
	if (!elm) { return false; }
	click(elm);
	return true;
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

// Determine if we're on the home page
function isHomePage() {
	return (page.match(/^home.php/) || ((page=='' || page[0]=='?') && $('home_stream'))) ? true : false;
}

// Log an error
function logError(category, x) {
	msg = "FBF Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber + ' while viewing ' + page;
	log(msg);
	//window.alert(msg); // debug
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
	// Supports: English (UK+US), Spanish, French, German, Dutch, Italian, Portuguese (Brazil+Portugal), Swedish, Greek, Serbian, Bulgarian, Slovak
	str = str.toLowerCase();
	var months = new Array (/^(.*\s)?(jan(uar[iy]?)?|enero|janvier|gennaio|janeiro|??????????|??????|??????|januára)(\s.*)?$/,
							/^(.*\s)?(feb(ruar[iy]?)?|febrero|février|febbraio|fevereiro|???????????|???????|????????|februára)(\s.*)?$/,
							/^(.*\s)?(mar(ch)?|marzo|mars|märz|maart|março|???????|????|marca)(\s.*)?$/,
							/^(.*\s)?(apr(ile?)?|abril|avril|????????|?????|apríla)(\s.*)?$/,
							/^(.*\s)?(ma(yo?|i|j)|mei|maggio|maio|?????|???|???|mája)(\s.*)?$/,
							/^(.*\s)?(june?|junio?|juin|giugno|junho|???????|???|???|júna)(\s.*)?$/,
							/^(.*\s)?(jul[iy]?|julio|juillet|luglio|julho|???????|???|???|júla)(\s.*)?$/,
							/^(.*\s)?(aug(ust(i|us)?)?|agosto|août|?????????|??????|augusta)(\s.*)?$/,
							/^(.*\s)?(sep(tember)?|septiembre|se[pt]tembre|setembro|???????????|?????????|?????????|septembra)(\s.*)?$/,
							/^(.*\s)?(o[ck]t(ober)?|oct[ou]bre|ottobre|outubro|?????????|???????|????????|októbra)(\s.*)?$/,
							/^(.*\s)?(nov(ember)?|noviembre|novembre|novembro|?????????|????????|???????|novembra)(\s.*)?$/,
							/^(.*\s)?(de[cz](ember)?|dici?embre|décembre|dezembro|??????????|????????|????????|decembra)(\s.*)?$/);
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


//
// Keyboard shortcuts
//
if (prefs['Shortcuts']) {
	window.addEventListener('keydown', function(e) {
		//log(String.fromCharCode(e.keyCode) + ' - ' + e.keyCode + ' - ' + e.ctrlKey + ' - ' + e.altKey + ' - ' + e.metaKey); // DEBUG ONLY
		if ((e.target.type && e.target.type!='checkbox' && e.target.type!='select') || (e.target.getAttribute('contenteditable')=='true') || e.ctrlKey || e.altKey || e.metaKey) { return; }
		function clickLink(filter, root) {
			var link;
			if (!root) { root = document; }
			if (filter.charAt(0) == ':') { return clickX("//a[contains(@href,'" + filter.replace(/^./,'') + "')]"); }
			return clickX("//a[contains(string(),'"+filter+"')]");
		}
		function gotoPage(url) {
			if (unsafeWindow && unsafeWindow.Quickling) {
				if (location.href.toLowerCase().match(/^https?:\/\/www\.facebook\.com\//)) { location.hash = url; }
				else if (!clickLink(':' + url)) { location.href = location.protocol + '//www.facebook.com' + url; }
			} else { location.href = location.protocol + '//www.facebook.com' + url; }
		}
		if (e.keyCode==27) {
			if (document.getElementById('fbfPopupContainer')) { document.getElementById('fbfPopupContainer').style.display = 'none'; }
			if (document.getElementById('fbfShadow')) { document.getElementById('fbfShadow').style.display = 'none'; }
			if (prefs['PhotoPopup'] || prefs['ProfilePicPopup']) { document.getElementById('FBPPdiv').style.display='none'; }
		}
		else if (e.keyCode==16 || e.keyCode==17 || e.keyCode==18) {}
		else if (e.keyCode==191) { if (e.shiftKey) { window.alert('Facebook Fixer Debug Info:\n\nversion: ' + version + '\nrelease date: ' + release_date + '\ntimestamp: ' + version_timestamp + '\nid: ' + id + '\npage: ' + page + '\nhomepage: ' + (isHomePage()?'yes':'no') + '\nlanguage: ' + language); } } // ?
		else if (e.shiftKey) {
			switch(e.keyCode) {
				case 37: clickLink('First'); break; // Left Arrow
				case 39: clickLink('Last'); break; // Right Arrow
				case 65: gotoPage('/photos/?ref=sb'); break; // A
				case 66: click(document.getElementById('buddy_list_tab')); break; // B
				case 67: if (isHomePage() || !(page=='' || page.match(/^index.php/) || page.match(/^login.php/) || page.match(/^logout.php/))) { showConfig(); } break; // C
				case 68: gotoPage('/events.php?bday=1'); break; // D
				case 69: gotoPage('/events.php'); break; // E
				case 70: gotoPage('/friends/?filter=afp'); break; // F 
				case 72: gotoPage('/home.php?ref=home'); break; // H
				case 73: gotoPage('/inbox/?ref=mb'); break; // I
				case 76: $x1('//a[contains(@href,"logout.php")]').focus(); break; // L
				case 78: gotoPage('/notifications.php'); break; // N
				case 80: window.location.href = 'http://www.facebook.com/' + (id.match(/^\d+$/) ? 'profile.php?id='+id+'&ref=profile' : id); break // P
				case 82: gotoPage('/reqs.php'); break; // R
				case 83: e.stopPropagation(); e.preventDefault(); document.getElementById('q').focus(); break; // S
				case 84: if (window.getSelection()!='') {
							if (typeof GM_xmlhttpRequest !== 'undefined') {
								handleTranslateRequest();
								xmlhttpRequest({method: "GET", url: "http://translate.google.com/translate_a/t?client=t&text=" + window.getSelection() + "&sl=auto&tl=" + prefs['GoogleLanguage']}, handleTranslateResponse);
							} else {
								window.open('http://translate.google.com/translate_t?hl=en#auto|' + prefs['GoogleLanguage'] + '|' + window.getSelection());
							}
						 } break; // T
			}
		}
		else {
			if (page.indexOf('/photos/')!=-1) {
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
			else if (isHomePage()) {
				switch(e.keyCode) {
					case 65: gotoPage('/home.php?filter=pp'); break; // a
					case 70: gotoPage('/home.php?filter=nf'); break; // f
					case 71: gotoPage('/home.php?filter=app_2361831622'); break; // g
					case 76: gotoPage('/home.php?filter=app_2309869772'); break; // l
					case 78: gotoPage('/home.php?filter=h'); break; // n
					case 80: gotoPage('/home.php?filter=app_2305272732'); break; // p
					case 83: gotoPage('/home.php?filter=app_2915120374'); break; // s
					case 84: gotoPage('/home.php?filter=app_2347471856'); break; // t
					case 85: gotoPage('/home.php?filter=app_2915120374'); break; // u
					case 86: gotoPage('/home.php?filter=app_2392950137'); break; // v
				}
			}
			else {
				switch(e.keyCode) {
					case 66: clickLink('Show Big Pictures'); break; // b
					case 67: if (!clickLink('View Comments')) { if (!clickLink('Photo Comments')) { clickLink('Comments on Photos'); } } break; // c
					case 73: clickX('//a[contains(@href,"v=info")][not(contains(@href,"edit"))]'); break; // i
					case 80: if (!clickLink('s Profile')) { clickLink(':v=photos'); } break; // p
					case 87: clickLink(':v=wall'); break; // w
					case 88: clickLink(':v=box'); break; // x
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
	translated = Array();
	for (var i=0; i<t.sentences.length; i++) { translated.push(t.sentences[i].trans); }
	showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; "><b>Translated Text via Google Translate</b> (from ' + t.src + ' to ' + prefs['GoogleLanguage'] + '):<br /><br />' + translated.join(' ') + '<div style="text-align:right;"><input id="fbfCloseTranslation" type="button" value="' + $l('Close') + '" /></div></div>', true, true);
	onClick('fbfCloseTranslation', function() { hidePopup(); });
}


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
addStyle(
	'#fbfConfigContainer { width:100%; }'+
	'#fbfConfigTabs { width:200px; vertical-align:top; }'+
	'#fbfConfigTabs div { background:white; color:background:#3b5998; padding:10px 0 10px 10px; border:1px solid #cccccc; border-top-width:0; cursor:pointer; }'+
	'#fbfConfigTabs div#fbfConfigTab-0 { border-top-width:1px; }'+
	'#fbfConfigTabs div:hover { font-weight:bold; }'+
	'#fbfConfigTabs div.fbfConfigSelectedTab { background:#3b5998; color:white; font-weight:bold; }'+
	'#fbfConfigControls { background:white; border:1px solid #cccccc; vertical-align:top; }'+
	'#fbfConfigControls div { display:none; padding:5px 5px 5px 23px; }'+
	'#fbfConfigControls div.fbfConfigSelectedControl { display:block; }'+
	'#fbfConfigControls input[type=checkbox] { margin-left:-18px; margin-bottom:8px; }'
);
function showConfig() {
	var opacitySelect = '';
	for (i=100; i>=0; i-=10) { opacitySelect=opacitySelect+'<option value="' + (i==100?'1.0':'0.'+(i/10)) + '">' + (100-i) + '%</option>'; }
	function makeOpacitySelector(id1, id2) { return '<tr><td><span class="fbfLabel">' + $l('Conf'+id1) + '</span></td><td><select id="fbfConf' + id1 + '">' + opacitySelect + '<option value="-1">' + $l('Remove') + '</option></select> &nbsp; &nbsp;<span class="fbfLabel">' + $l('Conf'+id2) + '</span> &nbsp;<select id="fbfConf' + id2 + '">' + opacitySelect + '</select></td></tr>'; }
	function makeCheckBoxes(ids) {
		ids = ids.split(',');
		var buf = '';
		for (var i=0; i<ids.length; i++) { buf = buf + '<input type="checkbox" id="fbfConf' + ids[i] + '" /><label for="fbfConf' + ids[i] + '">' + $l('Conf'+ids[i]) + '</label><br />'; }
		return buf;
	}
	function makeNumberInputs(ids) {
		ids = ids.split(',');
		var buf = '';
		for (var i=0; i<ids.length; i++) { buf = buf + $l('Conf'+ids[i]) + '<br /><input type="text" id="fbfConf' + ids[i] + '" value="' + prefs[ids[i]] + '" /><br />'; }
		return buf;
	}
	showPopup('<div id="FBFConfig" class="fbfPopup">'+
		'<div style="text-align:center;"><span class="fbfImportant">' + $l('ConfigureFacebookFixer') + '</span><br /><span class="fbfNote">(Facebook Fixer ' + version + ' - ' + release_date + ' - ' + id + ')</span></div><br />'+
		$l('ConfigureInstructions') + '<br />'+
		'<br />'+
		'<table id="fbfConfigContainer">'+
			'<tr><td id="fbfConfigTabs">'+
					'<div id="fbfConfigTab-0" class="fbfConfigSelectedTab">' + $l('ConfSectionHomePage') + '</div>'+
					'<div id="fbfConfigTab-1">' + $l('ConfSectionLiveFeed') + '</div>'+
					'<div id="fbfConfigTab-2">' + $l('ConfSectionPictures') + '</div>'+
					'<div id="fbfConfigTab-3">' + $l('ConfSectionEvents') + '</div>'+
					'<div id="fbfConfigTab-4">' + $l('ConfSectionMenu') + '</div>'+
					'<div id="fbfConfigTab-5">' + $l('ConfSectionShortcuts') + '</div>'+
					'<div id="fbfConfigTab-6">' + $l('ConfSectionOther') + '</div>'+
					'<div id="fbfConfigTab-7">' + $l('ConfSectionAdvanced') + '</div>'+
			'</td><td id="fbfConfigControls">'+
				'<div id="fbfConfigControl-0" class="fbfConfigSelectedControl">'+
					makeCheckBoxes('HomeFilterListFixed,MoveFilterList,HomeStretch,HomeLeftAlign,BlockThirdPartyStreams,HomeFilterList,HomeRightColumn') +
					' &nbsp; &nbsp; ' + makeCheckBoxes('HomePokes') +
					' &nbsp; &nbsp; ' + makeCheckBoxes('HomePeopleYouMayKnow') +
					' &nbsp; &nbsp; ' + makeCheckBoxes('HomeFindFriends') +
					' &nbsp; &nbsp; ' + makeCheckBoxes('HomeEvents') +
					' &nbsp; &nbsp; ' + makeCheckBoxes('HomeRequests') +
				'</div>'+
				'<div id="fbfConfigControl-1">'+
					//HideRead
					makeCheckBoxes('HideEventStories,HideFanStories,HideFriendStories,HideGroupStories,HideLinkStories,HidePhotoStories,HideProfilePicStories,HideRelationshipStories,HideTagStories,HideVideoStories') +
				'</div>'+
				'<div id="fbfConfigControl-2">'+
					makeCheckBoxes('ProfilePicPopup,PhotoPopup,ExternalPopup,DelayPopupPics,PopupAutoClose,PopupSmartAutoClose,BigAlbumPictures,AutoBigAlbumPictures,AutoLoadFullAlbum,AutoLoadTaggedPhotos') +
					'<span class="fbfLabel">' + $l('ConfPopupPosition') + ': </span><input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPositionAuto" value="auto" /><label for="fbfConfPopupPositionAuto">' + $l('Automatic') + '</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPositionLeft" value="left" /><label for="fbfConfPopupPositionLeft">' + $l('Left') + '</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPositionRight" value="right" /><label for="fbfConfPopupPositionRight">' + $l('Right') + '</label><br />'+
				'</div>'+
				'<div id="fbfConfigControl-3">'+
					makeCheckBoxes('Age,Sign,iCalendar,GoogleCalendar,CalendarFullName,CalendarBirthDate,GoogleApps') +
					'Domain: <input id="fbfConfGoogleAppsDomain"></input><br />'+
				'</div>'+
				'<div id="fbfConfigControl-4">'+
					makeCheckBoxes('ChatHideIdle,ChatDifferentiate,TopBarFixed') +
					'<table style="margin-left:-3px;">' +
					makeOpacitySelector('TopBarOpacity', 'TopBarHoverOpacity') +
					makeOpacitySelector('BottomBarOpacity', 'BottomBarHoverOpacity') +
					'</table>' +
				'</div>'+
				'<div id="fbfConfigControl-5">'+
					makeCheckBoxes('Shortcuts') + '<br />' + $l('ConfShortcutList')+
				'</div>'+
				'<div id="fbfConfigControl-6">'+
					makeCheckBoxes('DownloadVideo,ProtocolLinks,ErrorPageReload,PageTitle,InboxCountInTitle,NotificationCountInTitle,NewTabSearch,SecureLinks,AutoReadMore,FacebookTimestamps,FBFTimestamps,FBFTimestamps24,Updates') +
					'<table style="margin-left:-3px;">' +
					'<tr><td><span class="fbfLabel">' + $l('ConfFacebookFixerLanguage') + ':</span></td><td><select id="fbfConfFacebookFixerLanguage" style="padding:0; margin-top:3px;"><option value="auto">' + $l('Automatic') + '</option><option value="en">English</option><option value="es">Español (Spanish)</option><option value="fr">Français (French)</option><option value="de">Deutsch (German)</option><option value="it">Italiano (Italian)</option><option value="nl">Nederlands (Dutch)</option><option value="sk">Sloven?ina (Slovak)</option><option value="tr">Türkçe (Turkish)</option><option value="el">???????? (Greek)</option><option value="bg">????????? (Bulgarian)</option><option value="tw">??(??) (Chinese - Taiwan)</option></select></td></tr>'+
					'<tr><td><span class="fbfLabel">' + $l('ConfGoogleLanguage') + ':</span></td><td><select id="fbfConfGoogleLanguage" style="padding:0; margin-top:3px;"><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">Chinese (Simplified)</option><option value="zh-TW">Chinese (Traditional)</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="de">German</option><option value="el">Greek</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="id">Indonesian</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="ko">Korean</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="es">Spanish</option><option value="sv">Swedish</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="vi">Vietnamese</option></select></td></tr>'+
					'</table>' +
				'</div>'+
				'<div id="fbfConfigControl-7">'+
					makeNumberInputs('ProcessInterval,DelayPopupPicsTimeout')+
				'</div>'+
			'</td></tr>'+
		'</table>'+
		'<br /><hr /><div style="text-align:right;"><input type="button" value="' + $l('Refresh') + '" onclick="location.reload();" /> <input type="button" id="fbfCloseConfig" value="' + $l('Close') + '" /></div>'+
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
	onClick('fbfConfigTabs', function(e) {
		var current = e.target;
		if (current.tagName=='DIV' && current.className != 'fbfConfigSelectedTab') {
			var previous = $c('fbfConfigSelectedTab')[0];
			previous.className='';
			$('fbfConfigControl-' + previous.id.match(/-(\d+)/)[1]).className = '';
			current.className = 'fbfConfigSelectedTab';
			$('fbfConfigControl-' + current.id.match(/-(\d+)/)[1]).className = 'fbfConfigSelectedControl';
		}
	});
	$('fbfConfGoogleAppsDomain').addEventListener('keyup', function(e) {
			setValue('GoogleAppsDomain', e.target.value);
			prefs['GoogleAppsDomain'] = e.target.value;
	}, false);
	onClick('fbfUpdateLink', function() { FBFUpdateCheck(true); });
	onClick('fbfCloseConfig', function() { hidePopup(); });
	
	var selects = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity','FacebookFixerLanguage','GoogleLanguage');
	for (var i=0; i<selects.length; i++) {
		$('fbfConf'+selects[i]).addEventListener('change', function(e) {
			setValue(e.target.id.replace(/^fbfConf/,''),e.target.options[e.target.selectedIndex].value);
			e.target.blur();
		}, false);
	}
	
	var numberInputs = new Array('ProcessInterval','DelayPopupPicsTimeout');
	for (var i=0; i<numberInputs.length; i++) {
		$('fbfConf'+numberInputs[i]).addEventListener('keyup', function(e) {
			try {
				var val = parseInt(e.target.value);
				setValue(e.target.id.replace(/^fbfConf/,''), val);
			} catch(x){}
		}, false);
	}
	
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
			for (var i=1; i<totalImagePages+1; i++) {
				if (i!=thisPageNumber) {
					appendPhotos('http://www.facebook.com/' + (page.indexOf('page=')!=-1 ? page.replace(/page=\d+/,'page='+i) : page+'&page='+i) + '&quickling', $l('fullAlbumLoaded'));
				}
			}
		}
	} catch(x) { logError('Load Full Album', x); }
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
				for (var i=0; i<totalImagePages; i++) {
					if (i*15!=thisPhoto) {
						//appendPhotos('http://www.facebook.com/ajax/photos.php?id=' + tid + '&v=photos&so=' + (i*15) + '&action=page&section=photos_of', '<span class="caption">' + $l('AllPhotosLoaded') + '</span>');
						appendPhotos('http://www.facebook.com/' + page.replace(/&so=\d+/,'') + '&so=' + (i*15), '<span class="caption">' + $l('AllPhotosLoaded') + '</span>');
					}
				}
			} else { log('loadTaggedPhotos() Error! => could not get tid'); }
		}
	} catch(x) { logError('Load Tagged Photos', x); }
}

//
// Add thumbnails from the specified URL
//
var photoTableRegex = new RegExp('UIPhotoGrid_Table[^>]+>(.*?)<\?\/table');
function appendPhotos(url, completeMessage) {
	//log('Requesting from ' + url); // DEBUG ONLY
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.send(null);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				albumPagesLoaded++;
				var sub = photoTableRegex.exec(req.responseText)[1];
				var buf = sub.replace(/\\/g,'').split(/<tr>/g);
				var table = document.createElement('table');
				table.className="UIPhotoGrid_Table";
				html = '';
				for (var i=1; i<buf.length; i++) { html = html + '<tr>' + buf[i]; }
				var tbody = $c1('UIPhotoGrid_Table').firstChild;
				tbody.innerHTML = tbody.innerHTML + html;
				if (albumPagesLoaded>=totalAlbumPages) { $('fbf_photo_pagination').innerHTML = completeMessage; }
				if (prefs['AutoBigAlbumPictures']) { click($x1("//a[contains(@class,'fbfbaplink')]")); }
			}
		}
	}
}

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
	addStyle(' #buddy_list_all a.friend { font-weight:bold; }');
	addStyle(' #buddy_list_all a.idle { font-weight:normal; font-style:italic; }');
}

//
// Hide Idle Buddies
//
//if (prefs['ChatHideIdle']) { addStyle(' .presence_menu_opts .list_select li.idle { max-height:0; overflow:hidden; }'); }
if (prefs['ChatHideIdle']) { addStyle('#buddy_list_all a.idle { max-height:0; overflow:hidden; }'); }


style='';
if (!prefs['HomePokes']) { style = style + ' #pagelet_pokebox { display:none; }'; }
if (!prefs['HomePeopleYouMayKnow']) { style = style + ' #pagelet_pymkbox { display:none; }'; }
if (!prefs['HomeFindFriends']) { style = style + ' #pagelet_connectbox { display:none; }'; }
if (!prefs['HomeEvents']) { style = style + ' #pagelet_eventbox { display:none; }'; }
if (!prefs['HomeRequests']) { style = style + ' #pagelet_reqbox { display:none; }'; }
addStyle(style);


//
// Hide Facebook timestamps (x minutes ago)
//
if (!prefs['FacebookTimestamps']) {
	addStyle('abbr.timestamp { display:none; }');
}


//
// Listen for image mouseovers/mouseouts to show/hide popups
//
if (prefs['ProfilePicPopup'] || prefs['PhotoPopup']) {
	picRegex = /:\/\/(profile).*(\/[aqst]\d|_[aqst]\.jpg)/;
	
	picRegex = /(https?:\/\/(profile\.|photos-).*?\.fbcdn\.net.*?(\/[aqst]\d[\d_]+|_[aqst])\.jpg)/;
	picRegex2 = /(src|url)=([^&]+)/;
	
	function showPopupPic(e) {
		try {
			var t = e.target;
			
			var oldSrc;
			var newSrc;
			var title;
			
			if (t.tagName == 'IMG' && picRegex.test(t.src)) { oldSrc = t.src + '#1'; }
			else if (t.parentNode.firstChild.tagName == 'IMG' && (m=picRegex.exec(t.parentNode.firstChild.src))) { oldSrc = m[1] + '#2'; }
			else if (t.parentNode.style && (m=picRegex.exec(t.parentNode.style.backgroundImage))) { oldSrc = m[1] + '#3'; }
			else if (t.src && (t.src.indexOf('app_full_proxy.php')!=-1 || t.src.indexOf('safe_image.php')!=-1) && (m=picRegex2.exec(t.src))) { oldSrc = unescape(m[2]) + '#4'; }
			
			if (oldSrc || newSrc) {
				
				if (!newSrc) {
					if (m = oldSrc.match(/^["']+(.*)["']+$/)) { oldSrc = m[1]; } // Opera needs this, no idea why...
					newSrc = oldSrc.replace(/\/[aqst]([\d_]+)\.jpg/, "/n$1.jpg").replace(/\/([\d_]+)[aqst]\.jpg/, "/$1n.jpg");
				}
				
				if (newSrc.indexOf('.fbcdn.net/')==-1) { newSrc = newSrc + '-external'; }
				else {
					if (newSrc.indexOf('/profile.')!=-1) { newSrc = newSrc + '-profile'; }
					else { newSrc = newSrc + '-photo'; }
				}
				
				if (newSrc.indexOf('fbcdn.net') ? (newSrc.indexOf('profile')!=-1 ? prefs['ProfilePicPopup'] : prefs['PhotoPopup']) : prefs['ExternalPopup']) {
					
					if (m = newSrc.match(/\/n(\d+)_\d+\.jpg/)) { profileLink = 'http://www.facebook.com/profile.php?id=' + m[1]; }
					else if (t.parentNode.href) { profileLink = t.parentNode.href; }
					else if (t.parentNode.parentNode.href) { profileLink = t.parentNode.parentNode.href; }
					
					/*
					if (t.title) { title = '<div>' + t.title + '</div>'; }
					else if (t.alt) { title = '<div>' + t.alt + '</div>'; }
					else title = '';
					*/
					
					$('FBPPimg').innerHTML = '<a href="' + profileLink + '"><img src="' + newSrc + '" alt="' + $l('LoadingPic') + '" /></a>'; // + title;
					$('FBPPdiv').style.display = 'block';
					$('FBPPdiv').className = 'fbfPopup FBPPdiv' + (prefs['PopupPosition'] == 'Auto' ? (e.pageX>document.body.clientWidth/2 ? 'Left' : 'Right') : prefs['PopupPosition']);
					
				}
				
			}
			
		} catch(x) { logError('Popup Pic', x); }
	}
	
	if (prefs['DelayPopupPics']) { 
		window.addEventListener('mouseover', function(e) {
			if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
				popupPicTimeout = setTimeout(function(){showPopupPic(e);}, prefs['DelayPopupPicsTimeout']);
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
			if (!e.shiftKey && !e.ctrlKey && !e.altKey) { 
				if (prefs['PopupSmartAutoClose']) {
					setTimeout(function() {
						if (!overPopupPic) { document.getElementById('FBPPdiv').style.display = 'none'; }
					}, 50);
				} else { document.getElementById('FBPPdiv').style.display = 'none'; }
			}
		}
	}, false);
}


//
// Hide read items in the news feed
//
function hideRead() {
	try {
		mark = getValue('ReadTime');
		var items = $x("//div[contains(@id,'div_story')][contains(@class,'GenericStory')]");
		for (var i=0; i<items.snapshotLength; i++) {
			var timestamps = $x('.//span[@class="GenericStory_Time"]', items.snapshotItem(i));
			for (var j=0; j<timestamps.snapshotLength; j++) {
				timestamps.snapshotItem(j).style.background = 'red';
			}
			var timestamps = $x('.//abbr[@class="timestamp" or @class="timestamp timed"]', items.snapshotItem(i));
			for (var j=0; j<timestamps.snapshotLength; j++) {
				if (timestamps.snapshotItem(j).innerHTML.indexOf('*')==-1) {
					timestamps.snapshotItem(j).innerHTML = timestamps.snapshotItem(j).innerHTML + '<br />* ' + timestamps.snapshotItem(j).title + ' / ' + mark;
				}
				//if (Date.parse(timestamps.snapshotItem(j).title) > mark) { items.snapshotItem(i).style.display = 'block'; break; }
				//else if (j==timestamps.snapshotLength-1) { items.snapshotItem(i).style.display = 'none'; }
			}
		}
	} catch(x) { logError('Hide Read', x); }
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
	albumLink.className = 'fbfbaplink ' + (className!='' ? className : '');
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


Date.prototype.getNextDay=function(){var nextDay=new Date(); nextDay.setTime(this.getTime()+86400000); return nextDay; }
Date.prototype.before=function(date){if(!date)date=new Date(); return this.getTime()<date.getTime();}
Date.prototype.past=function(date){if(!date)date=new Date(); var thisDate=this; thisDate.setHours(0); thisDate.setMinutes(0); thisDate.setSeconds(0); date.setYear(thisDate.getFullYear()); return thisDate.getTime()<date.getTime();}
Date.prototype.getAge=function(){var now=new Date(); return this.past(new Date())?now.getFullYear()-this.getFullYear():now.getFullYear()-this.getFullYear()-1;}
Date.prototype.toISOString=function(includeTime){return ''+this.getFullYear()+$0(this.getMonth()-0+1)+$0(this.getDate())+(includeTime?'T'+$0(this.getHours())+$0(this.getMinutes())+$0(this.getSeconds()):'');}
Date.prototype.getSign=function(){ var signs = $l('Signs'); var endDates=new Array(19,18,20,19,20,21,22,22,22,22,21,21); return signs[this.getDate()>endDates[this.getMonth()]?(this.getMonth()+1)%12:this.getMonth()];}
Date.prototype.format = function() { var monthNames = $l('Months'); return monthNames[this.getMonth()] + ' ' + this.getDate() + ', ' + this.getFullYear(); }
Date.prototype.getFormattedTime = function(use24Hours) { return (use24Hours ? $0(this.getHours()) : (this.getHours()%12==0 ? '12' : this.getHours()%12)) + ':' + $0(this.getMinutes()) + (use24Hours ? '' : (this.getHours()>11 ? 'pm' : 'am')); }


//
// Process the page at regular intervals
//
processing = setInterval(processPage, prefs['ProcessInterval']);
processPage();

function processPage() {

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
	//if (page!=lastPage) { log('Page => "' + page + '"'); }// DEBUG ONLY
	
	if (page != lastPage && prefs['PopupAutoClose'] && $('FBPPdiv')) {
		$('FBPPdiv').style.display = 'none';
		lastPage = page;
	}
	
	//
	// Show date/time of comments and feed items
	//
	if (prefs['FBFTimestamps']) {
		var today = new Date()
		var yesterday = new Date();
		yesterday.setTime(today.getTime()-24*60*60*1000);
		var fTimestamp = new Date();
		var timestamps = $x('//abbr[@class="timestamp"]');
		for (var i=0; i<timestamps.snapshotLength; i++) {
			var t = timestamps.snapshotItem(i);
			fTimestamp.setTime(Date.parse(t.title));
			t.className = t.className + ' timed';
			var fbfTimestamp = document.createElement('span');
			fbfTimestamp.innerHTML = (prefs['FacebookTimestamps']?' (':'') + (fTimestamp.toISOString()==today.toISOString() ? '' : (fTimestamp.toISOString()==yesterday.toISOString() ? 'Yesterday' : fTimestamp.toISOString()) + ' at ') + fTimestamp.getFormattedTime(prefs['FBFTimestamps24']) + (prefs['FacebookTimestamps']?') ':'');
			t.parentNode.insertBefore(fbfTimestamp, t.nextSibling);
		}
	}
	
	
	//
	// Customize Home Page
	//
	if (isHomePage()) {
		try {
			homeStream = $('home_stream');
			if (homeStream && !homeStream.className.match(/\bfbf\b/)) {
				
				try {
					
					try {
						homeStream.className = homeStream.className + (' fbf');
						var style = '';
						var style2 = '';
						if (prefs['MoveFilterList'] || (homePageNotModified && !prefs['HomeFilterList'])) {
							style = style + ' #home_stream { padding-left:0; }';
							try {
								style2 = '#home_stream { width:' + (document.defaultView.getComputedStyle($('home_stream'), null).width.replace('px','')-0+143) + 'px; }';
							} catch(x4) { logError('Home Columns [0][0]', x4); }
						}
					} catch(x3) { logError('Home Columns [0]', x3); }
					
					try {
						if (homePageNotModified) {
							if (!prefs['HomeFilterList']) {
								style = style + '#pagelet_filters { display:none; }';
							}
							if (!prefs['HomeRightColumn']) {
								style = style + '#home_sidebar { display:none; } #home_stream { padding-right:0; }';
								style2 = '#home_stream { width:' + (document.defaultView.getComputedStyle($('home_stream'), null).width.replace('px','')-0+270) + 'px; } #home_left_column { width:100%; }';
							}
							if (!prefs['HomeFilterList'] && !prefs['HomeRightColumn']) { style2 = '#home_left_column, #home_stream { width:100%; }'; }
							if (style) {
								style = style + style2 + ' .UIIntentionalStory_Message { width:96%; }';
								addStyle(style.replace(/;/g,' ! important'));
							}
							homePageNotModified = false;
						}
					} catch(x3) { logError('Home Columns [1]', x3); }
					
					try {
						// Move filter list to the right column
						if (prefs['MoveFilterList']) {
							if (!$('home_sidebar')) { window.alert('home_sidebar does not exist'); } // DEBUG!!!
							else if (!$('pagelet_filters')) { window.alert('pagelet_filters does not exist'); } // DEBUG!!!
							else {
								$('home_sidebar').insertBefore($('pagelet_filters'), $('home_sidebar').firstChild);
								addStyle('#pagelet_filters { width:100% !important; margin-bottom:15px; float:none; clear:none; }');
							}
						}
					} catch(x3) { logError('Home Columns [2]', x3); }
					
				} catch(x2) { logError('Home Columns', x2); }
				
				// Stretch home page to fill entire page, or left align the home page content (stretching has priority)
				try {
					if (prefs['HomeStretch']) {
						addStyle('.UIFullPage_Container, .UIOneOff_Container { margin:0 ! important; width:98%; }');
						addStyle('#fb_menubar { width:100%; }');
						addStyle('#pagefooter { width:98%; }');
						var adjWidth = document.body.clientWidth - 40;
						if ($('home_sidebar').clientWidth) adjWidth -= ($('home_sidebar').clientWidth + 30); 
						addStyle('#home_left_column { width:' + (adjWidth) + 'px ! important; }');
						if ($('home_filter_list').clientWidth && !prefs['MoveFilterList']) adjWidth -= ($('home_filter_list').clientWidth + 25); 
						addStyle('#home_stream { width:' + (adjWidth) + 'px ! important; }');
						addStyle('.commentable_item .ufi_section {width:100% !important; }');
					}
					else if (prefs['HomeLeftAlign']) { addStyle('.UIFullPage_Container, .UIOneOff_Container { margin:0 ! important; }'); }
				} catch(x2) { logError('Home Stretch/Align', x2); }
				
				
				// Make today's events bold
				var eventDays = $c('UIUpcoming_Time');
				for (var i=0; i<eventDays.length; i++) {
					if (eventDays[i].innerHTML.toLowerCase().indexOf($l('today'))!=-1) {
						eventDays[i].parentNode.style.fontWeight = 'bold';
					}
				}
				
				// Block 3rd party streams
				try {
					if (prefs['BlockThirdPartyStreams']) {
						var apps = document.evaluate('//div[contains(@class, "UIFilterList_Item")]/a[contains(@href, "?filter=app_")]', document, null, 6, null), app, i=0;
						while(app=apps.snapshotItem(i++)) {
							if(!/(2361831622|2344061033|2347471856|2392950137|2309869772|2305272732)/.test(app.href)) {
								blockStream(appId=app.href.split('app_')[1]);
								app.parentNode.parentNode.removeChild(app.parentNode);
							}
						}
					}
				} catch(x2) { logError('3rd Party Streams', x2); }
				
				// Fixed positioning for filter list (unless its been moved to the right column)
				try {
					if (prefs['HomeFilterListFixed'] && !prefs['MoveFilterList']) {
						var streamMargin = getPosition($('home_stream'))[0] - getPosition($('home_filter_list'))[0];
						addStyle('#home_filter_list { position:fixed; } #home_stream { margin-left:' + streamMargin + 'px; }');
					}
				} catch(x2) { logError('Fixed Filter List', x2); }
				
			}
			
			// Modify the live feed
			if (prefs['HideRead'] || prefs['HideEventStories'] || prefs['HideFanStories'] || prefs['HideFriendStories'] || prefs['HideGroupStories'] || prefs['HideLinkStories'] || prefs['HidePhotoStories'] || prefs['HideProfilePicStories'] || prefs['HideRelationshipStories'] || prefs['HideTagStories'] || prefs['HideVideoStories']) {
				liveFeed = $x1('//a[@href="/home.php?filter=lf" and contains(@class,"hidden_elem")]');
				if (liveFeed) {
					
					// Hide unwanted feed items
					var contains = Array();
					if (prefs['HideEventStories']) { contains.push("contains(@data-ft,'\"sty\":\"178\"')"); contains.push("contains(@data-ft,'\"sty\":\"38\"')"); }
					if (prefs['HideFriendStories']) { contains.push("contains(@data-ft,'\"sty\":\"8\"')"); }
					if (prefs['HideFanStories']) { contains.push("contains(@data-ft,'\"sty\":\"161\"')"); }
					if (prefs['HideGroupStories']) { contains.push("contains(@data-ft,'\"sty\":\"21\"')"); }
					if (prefs['HideLinkStories']) { contains.push("contains(@data-ft,'\"sty\":\"263\"')"); }
					if (prefs['HidePhotoStories']) { contains.push("contains(@data-ft,'\"sty\":\"247\"')"); }
					if (prefs['HideProfilePicStories']) { contains.push("contains(@data-ft,'\"sty\":\"259\"')"); }
					if (prefs['HideRelationshipStories']) { contains.push("contains(@data-ft,'\"sty\":\"10\"')"); }
					if (prefs['HideTagStories']) { contains.push("contains(@data-ft,'\"sty\":\"65\"')"); }
					if (prefs['HideVideoStories']) { contains.push("contains(@data-ft,'\"sty\":\"130\"')"); }
					if (contains.length>0) {
						var elms = $x('//div[' + contains.join(' or ') + ']');
						for (var i=0; i<elms.snapshotLength; i++) { elms.snapshotItem(i).parentNode.removeChild(elms.snapshotItem(i)); }
					}
					
					// Hide read items
					if (prefs['HideRead']) {
						if (!$('fbfMarkRead')) {
							var markRead = document.createElement('li');
							markRead.id = 'fbfMarkRead';
							markRead.className = 'UIIntentionalStream_Top_Link';
							markRead.innerHTML = '<a onclick="return false">Mark All As Read</a>';
							markRead.style.paddnig = '0';
							markRead.style.cssFloat = 'right';
							markRead.style.styleFloat = 'right';
							var sibling = $x1("//li[@class='UIIntentionalStream_Top_Link'][1]");
							if (sibling) {
								sibling.parentNode.style.display='block';
								sibling.parentNode.insertBefore(markRead, sibling.nextSibling);
								onClick('fbfMarkRead', function() { setValue('ReadTime', (new Date().getTime())+''); });
							}
						}
						hideRead();
					}
					
				}
			}
			
		} catch(x) { logError('Home', x); }
	}
	
	//
	// Replace links with HTTPS versions
	//
	if (prefs['SecureLinks']) {
		var links = $x("//a[contains(@href,'facebook.com')]");
		for (var i=0; i<links.snapshotLength; i++) { links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/^http:\/\/([^\.]*\.)?facebook\.com\//,'https://$1facebook.com/'); }
	}
	
	
	//
	// Auto-click on "read more" links
	//
	if (prefs['AutoReadMore']) {
		var links = $x("//span[@class='text_exposed_link']/a[1]");
		for (var i=0; i<links.snapshotLength; i++) {
			links.snapshotItem(i).parentNode.className = links.snapshotItem(i).parentNode.className + ' fbfHandled';
			click(links.snapshotItem(i));
		}
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
			} catch(x) { logError('Big Album Pictures', x); }
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
			} catch(x) { logError('iCalendar', x); }
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
		} catch(x) { logError('Age/Sign/Calendar', x); }
	}
	
	//
	// Show video download link
	//
	if (prefs['DownloadVideo'] && page.match(/^video\/video.php\?.*v=/)) {
		try {
			var parent = $x1("//div[@id='video_actions']/ul[@class='actionspro'][1]");
			if (!$('fbf-video-link')) {
				var videoSrc;
				var embed = $x1("//embed[contains(@flashvars,'video_src')][1]");
				if (embed) { videoSrc = unescape(embed.getAttribute('flashvars')).match(/video_src=([^&]*)/)[1]; }
				else { videoSrc = unescape($x1("//div[@id='js_buffer']/script").text.match(/addVariable\(\"video_src\", \"(|([^\"]|\\\")*[^\\])\"/)[1]); }
				var link = document.createElement('li');
				link.id = 'fbf-video-link';
				link.className = 'actionspro_li';
				link.innerHTML = '<a class="actionspro_a" href="' + videoSrc + '" title="' + $l('DownloadVideo') + '" />' + $l('DownloadVideo') + '</a>';
				parent.insertBefore(link, parent.lastChild.nextSibling);
			}
		} catch(x) { logError('Download Video', x); }
	}
	
	//
	// Change page title
	//
	if (prefs['PageTitle'] && document.title.indexOf('Facebook | ')!=-1) { document.title = document.title.replace('Facebook | ', ''); }
	if (prefs['NotificationCountInTitle'] || prefs['InboxCountInTitle']) {
		var counts = Array();
		if (prefs['InboxCountInTitle']) {
			var count = $x('//*[@id="fb_menu_inbox_unread_count"]');
			if (count && count.snapshotLength>0 && count.snapshotItem(0).innerHTML>0) { counts.push(count.snapshotItem(0).innerHTML + 'm'); }
		}
		if (prefs['NotificationCountInTitle']) {
			var count = $x('//*[@id="presence_notifications_count"]//*');
			if (count && count.snapshotLength>0 && count.snapshotItem(0).innerHTML>0) { counts.push(count.snapshotItem(0).innerHTML + 'n'); }
		}
		if (counts.length>0) {
			if (document.title.charAt(0) == '(') { document.title = document.title.replace(/^\(.*?\)/, '(' + counts.join(',') + ')'); }
			else { document.title = '(' + counts.join(',') + ') ' + document.title; }
		} else {
			document.title = document.title.replace(/^\(.*?\)/, '');
		}
	}
	
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
		} catch(x) { logError('Protocol Links', x); }
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
		} catch(x) { logError('Album Thumbnails', x); }
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
		} catch(x) { logError('Tagged Photos Thumbnails', x); }
	}
	
}


}) ();

// There are only 10 types of people in the world — those who understand ternary, those who don't, and those who mistake it for binary :)
