
// ==UserScript==
// @name           AUTO LIKE STATUS FACEBOOK POWERED BY: ARD MALANG
// @namespace      AutoLike
// @namespace      http://www.nuansaiklan.com
// @namespace      http://code-poet.net/
// @description    Auto like teman facebook mu hanya satu kali klik
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.facebook.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=46560
// @version        1.5.7
// @run-at         document-start
// @unwrap
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*

// ==/UserScript==

(function() {

if (self != window.top) { return; } // Don't run in frames

var version = '2.3.1';
var version_timestamp = 1299644556453; // javascript:window.alert(new Date().getTime());
var release_date = 20110309;

var loc;
var page = '';
var lastPage = '';
var homePageNotModified = true;
var id = 0;
var language = 'en';
var detectedLanguage = '';
var showPopupPicTimeout;
var hidePopupPicTimeout;
var storage;

var lang = {
	// English - By Vaughan Chandler
	en : {
		'_language' : 'English',
		'AddToCalendar' : 'Add to Calendar',
		'AddToGoogleCalendar' : 'Add to Google Calendar',
		'all' : 'all',
		'All' : 'All',
		'AllPhotosLoaded' : 'All photos loaded',
		'Automatic' : 'Automatic',
		'Birthday' : '%s\'s Birthday',
		'BookmarkAdd' : 'Add New Bookmark',
		'BookmarkExists' : 'There is already a bookmark for this page.\n\nGo to the page you want to bookmark and try again.',
		'BookmarkNamePrompt' : 'Enter a name for this bookmark:\n%s',
		'BookmarksConfirmRemoval' : 'Are you sure you want to remove the following bookmarks?',
		'BookmarksManage' : 'Manage Bookmarks',
		'BookmarksRemoveSelected' : 'Remove Selected Bookmarks',
		'Bookmarks' : 'Bookmarks',
		'BrowserUnsupported' : 'Your browser does not support this feature.',
		'CreatingFile' : 'Creating File',
		'Close' : 'Close',
		'ConfigureFacebookSinar' : 'Configure Sinar Script',
		'ConfigureInstructions' : 'All changes are saved immediately, but some changes might not take effect in tabs that are already open.',
		'ConfAge' : 'Show people\'s age on their profile (if they provide their full birthdate).',
		'ConfApplicationWhitelist' : 'Application Whitelist - Enter the IDs of applications to prevent them from being hidden. Separate IDs with a space.',
		'ConfAutoBigAlbumPictures' : 'Automatically show bigger album pictures when the page opens.',
		'ConfAutoLoadFullAlbum' : 'Automatically load thumbnnails for all images in an album on a single page.',
		'ConfAutoLoadTaggedPhotos' : 'Automatically load thumbnnails for all tagged photos on a single page (the photos tab on people\'s profiles).',
		'ConfAutoReadMore' : 'Automatically click on "see more" links.',
		'ConfBigAlbumPictures' : 'Add a link on album pages to show bigger versions of all pictures on that page.',
		'ConfBigAlbumPicturesBorder' : 'Add a border around bigger versions of pictures.',
		'ConfBookmarks' : 'Add a Bookmarks submenu to the top menu bar.',
		'ConfBottomBarHoverOpacity' : 'On mouse-over',
		'ConfBottomBarOpacity' : 'Bottom menu bar transparency',
		'ConfCalendarBirthDate' : 'Include the person\'s birthdate in the event details.',
		'ConfCalendarFullName' : 'Use the person\'s full name as the title for birthdays (instead of just first name).',
		'ConfChatDifferentiate' : 'Use bold and italics to differentiate between available and idle buddies.',
		'ConfChatHideIdle' : 'Hide idle buddies.',
		'ConfDelayPopupPics' : 'Add a short delay before showing popup pictures.',
		'ConfDelayPopupPicsTimeout' : 'Delay before showing popup pictures, in milliseconds (default=500):',
		'ConfDownloadVideo' : 'Add a link to download the videos from video pages. (You may need an <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfDisableTheater' : 'Disable the photo theater.',
		'ConfErrorPageReload' : 'Automaticaly reload application error pages after 5 seconds.',
		'ConfExport' : 'To export your settings, copy the text below and save it in a file.',
		'ConfExternalPopup' : 'Popup full-sized versions of external images. <sup>beta</sup>',
		'ConfFacebookArdMalangLanguage' : 'Language for ArdMalang Script',
		'ConfFacebookTimestamps' : 'Show Facebook timestamps (eg. "3 hours ago").',
		'ConfFBFTimestamps' : 'Add ArdMalang Script timestamps after Facebook timestamps (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Show ArdMalang Script timestamps in 24-hour format.',
		'ConfFriendRequestCountInTitle' : 'Show the number of new friend requests in the page title.',
		'ConfGoogleApps' : 'Create Google Calendar links compatible with Google Apps.',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Add links to add birthdays and events to <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Language for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Hide application stories.',
		'ConfHideEgos' : 'Hide all "ego" sections (should hide most of Facebook\'s recommendations).',
		'ConfHideEventStories' : 'Hide event stories.',
		'ConfHideFacebookCountInTitle' : 'Hide Facebook\'s count of new inbox messages.',
		'ConfHideFriendStories' : 'Hide friend stories.',
		'ConfHideGroupStories' : 'Hide group stories.',
		'ConfHideHovercards' : 'Hide hovercards (the popup that appears when you mouse-over a name).',
		'ConfHideLikeStories' : 'Hide like stories.',
		'ConfHideLinkStories' : 'Hide link stories.',
		'ConfHideNoteStories' : 'Hide note stories.',
		'ConfHidePhotoStories' : 'Hide photo stories.',
		'ConfHidePlaceStories' : 'Hide place stories.',
		'ConfHideProfilePicStories' : 'Hide profile pic stories.',
		'ConfHideRead' : 'Hide items in the live feed that have been marked as read.',
		'ConfHideRelationshipStories' : 'Hide relationship stories.',
		'ConfHideStatusStories' : 'Hide status stories.',
		'ConfHideVideoStories' : 'Hide video stories.',
		'ConfHideWallStories' : 'Hide wall stories.',
		'ConfHomeBeta' : 'Show the Facebook Sneak Peek section.',
		'ConfHomeChat' : 'Show the Chat section.',
		'ConfHomeChatNames' : 'Show names in the Chat section.',
		'ConfHomeEvents' : 'Show the Events section.',
		'ConfHomeFindFriends' : 'Show the Get Connected section.',
		'ConfHomeLeftAlign' : 'Left-align the contents of the home page.',
		'ConfHomeLeftColumn' : 'Show the left column.',
		'ConfHomeLeftColumnFixed' : 'Keep the left column visible, even after scrolling down.',
		'ConfHomeLink' : 'Show the Home link in the top menu bar.',
		'ConfHomeNavigation' : 'Show the Navigation section.',
		'ConfHomePokes' : 'Show the Pokes section.',
		'ConfHomeProfile' : 'Show the Profile section.',
		'ConfHomeRecommendations' : 'Show recommendations (People You May Know, Recommended Pages etc).',
		'ConfHomeRequests' : 'Show the Requests section.',
		'ConfHomeRightColumn' : 'Show the right column.',
		'ConfHomeStretch' : 'Stretch the home page to the full width of the browser window.',
		'ConfHomeStretchMiddleColumn' : 'Stretch the contents of the middle column of the home page.',
		'ConfiCalendar' : 'Add links to download an <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> file with all birthdays.',
		'ConfImport' : 'To import your settings later, overwrite the text below with the text you saved previously and click "Import".',
		'ConfInboxCountInTitle' : 'Show the number of new inbox messages in the page title.',
		'ConfLogoutLink' : 'Add a logout link to the top menu bar.',
		'ConfNotificationCountInTitle' : 'Show the number of new notifications in the page title.',
		'ConfNewTabSearch' : 'Make search results open in a new tab/window when pressing CTRL + Enter to search.',
		'ConfPageTitle' : 'Remove "Facebook |" from the title of every page.',
		'ConfPhotoPopup' : 'Popup bigger versions of photos on mouse over.',
		'ConfPopupAutoClose' : 'Close popup pictures automatically.',
		'ConfPopupSmartAutoClose' : 'Prevent popup pictures from closing automatically if the mouse is over it.',
		'ConfPopupPosition' : 'Position for popup pictures',
		'ConfPopupWhileTagging' : 'Show popup pictures even when tagging.',
		'ConfProcessInterval' : 'Interval at which to process the page, in milliseconds (default=1000):',
		'ConfProfileLink' : 'Show the Profile link in the top menu bar.',
		'ConfProfilePicPopup' : 'Popup bigger versions of profile pictures on mouse over',
		'ConfProtocolLinks' : 'Turn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'About ArdMalang Script',
		'ConfSectionAdvanced' : 'Advanced',
		'ConfSectionEvents' : 'Birthdays/Events',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Feeds',
		'ConfSectionHomePage' : 'Home Page',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menus/Chat',
		'ConfSectionOther' : 'Other Options',
		'ConfSectionPageTitle' : 'Page Title',
		'ConfSectionPictures' : 'Pictures',
		'ConfSectionShortcuts' : 'Keyboard Shortcuts',
		'ConfSecureLinks' : 'Force Facebook links to point to HTTPS pages.',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - ArdMalang Script configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show ArdMalang Script debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by ArdMalang Script<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Enable keyboard shortcuts.',
		'ConfSign' : 'Show people\'s sign on their profile (if they provide their birthdate).',
		'ConfTopBarFixed' : 'Keep the top menu bar on the screen always, even after scrolling down.',
		'ConfTopBarHoverOpacity' : 'On mouse-over',
		'ConfTopBarOpacity' : 'Top menu bar transparency',
		'ConfUpdates' : 'Check Userscripts.org daily for updates to ArdMalang Script. Or <a href="#" id="fbfUpdateLink" onclick="return false;">check now</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(This will take a while if you have a lot of friends)',
		'FacebookArdMalangConflict' : 'Facebook ArdMalang is now known as ArdMalang Script.<br /><br />Because of the name change you need to manually uninstall Facebook ArdMalang from your browser, or the two scripts will conflict with each other.<br /><br />If you are aren\'t sure how to uninstall a userscript, <a %s>click here for instructions</a>.',
		'fullAlbumLoaded' : 'full album loaded',
		'Import' : 'Import',
		'ImportConfirm' : 'Are you sure you want to import these settings?\nYour current settings will be lost.',
		'ImportFailure' : 'An error occurred while trying to import your settings.',
		'ImportSuccess' : 'Import complete. Would you like to refresh the page?',
		'Left' : 'Left',
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
		'Refresh' : 'Refresh',
		'Remove' : 'Remove',
		'Right' : 'Right',
		'ShowBigPictures' : 'Show Big Pictures',
		'Signs' : new Array('Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius'),
		'today' : 'today', // this is the lower case version of the text Facebook uses on the home page to mark today's birthdays
		'Translators' : 'Translators',
		'UpdateAvailable1' : 'An update is available for ArdMalang Script',
		'UpdateAvailable2' : 'Would you like to update now?',
		'UpdateHomepage' : 'Go to homepage',
		'UpdateInstall' : 'Install now',
		'UpdateTomorrow' : 'Remind me tomorrow',
		'yearsOld' : '%s years old'
	},

	// Spanish - Contributed by Glen Farmer and Neo (20100626)
	es : {
		'_language' : 'Spanish',
		'AddToCalendar' : 'Añadir a Calendario',
		'AddToGoogleCalendar' : 'Añadir a Calendario Google',
		'all' : 'todo',
		'All' : 'Todo',
		'AllPhotosLoaded' : 'Todas las fotos han sido cargadas',
		'Automatic' : 'Automático',
		'Birthday' : 'El cumpleaños de %s',
		'BookmarkAdd' : 'Añadir Un Marcador Nuevo',
		'BookmarkConfirmRemoval' : '¿Está seguro que desea eliminar marcador "%s"?',
		'BookmarkDoesNotExist' : 'Esta página no ha sido marcada,\n\nVaya a la página que desea eliminar e intente de nuevo.',
		'BookmarkExists' : 'Ya existe un marcador para esta página.\n\nVaya a la página que desea marcar e intente de nuevo.',
		'BookmarkNamePrompt' : 'Introduzca un nombre para este el siguiente marcador:\n%s',
		'BookmarkRemove' : 'Eliminar el marcador',
		'Bookmarks' : 'Marcadores',
		'BrowserUnsupported' : 'Su navegador no soporta esta función.',
		'Close' : 'Cerrar',
		'ConfigureFacebookArdMalang' : 'Configuración de ArdMalang Script',
		'ConfigureInstructions' : 'Todos los cambios son guardados inmediatamente, pero algunos cambios tendrán efecto en ventanas que ya estén abiertas.',
		'ConfAge' : 'Mostrar edad de las personas en sus perfiles (Solo si muestran su fecha de nacimiento).',
		'ConfAutoBigAlbumPictures' : 'Mostrar automáticamente las fotos de los álbumes grandes al abrir alguno de ellos.',
		'ConfAutoLoadFullAlbum' : 'Cargar automaticamente las MINIATURAS de todas las imagenes de un álbum en una sola página.',
		'ConfAutoLoadTaggedPhotos' : 'Cargar automaticamente las MINIATURAS de todas las fotos etiquetadas de un usuario en una sola página (La pestaña Fotos de "Usuario").',
		'ConfBigAlbumPictures' : 'Añadir un enlace en la página de los álbumes para mostrar las versiones grandes de todas las fotos.',
		'ConfBookmarks' : 'Añadir el menu de Marcadores a la barra superior de menús',
		'ConfBottomBarHoverOpacity' : 'Al pasar el ratón por encima',
		'ConfBottomBarOpacity' : 'Transparencia de la barra de menu de abajo',
		'ConfCalendarBirthDate' : 'Incluir la fecha de cumpleaños de las personas en los detalles de los eventos.',
		'ConfCalendarFullName' : 'Usar el nombre completo de las personas para el titulo de los cumpleaños (en vez de solo el primer nombre).',
		'ConfChatDifferentiate' : 'Usar negrita y cursiva para diferenciar entre amigos disponibles y ausentes.',
		'ConfChatHideIdle' : 'Ocultar los amigos ausentes.',
		'ConfDelayPopupPics' : 'Esperar 0.5 segundos antes de enseñar ventana emergente de las fotos.',
		'ConfDelayPopupPicsTimeout' : 'Retardo en mili-segundos antes de enseñar las fotos (Por defecto 500 mili-segundos)',
		'ConfDownloadVideo' : 'Añadir un enlace para descargar los videos de las páginas de videos. (Puede que necesites un <a href="http://es.wikipedia.org/wiki/Flash_Video#Reproductores_FLV" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Recargar automáticamente aplicaciones con errores despues de 5 segundos',
		'ConfExport' : 'Para exportar la configuración, copie el siguiente texto y guárdelo en un archivo.',
		'ConfExternalPopup' : 'Crear una ventana emergente con las fotos externas en tamaño real. <sup>beta</sup>',
		'ConfFacebookArdMalangLanguage' : 'Lenguaje del ArdMalang Script',
		'ConfFacebookTimestamps' : 'Mostrar cuanto hace que fue creado (Ejemplo: "Hace 3 horas").',
		'ConfFBFTimestamps24' : 'Mostrar las marcas de tiempo de ArdMalang Script en formato 24 horas.',
		'ConfFBFTimestamps' : 'Añadir las marcas de tiempo de ArdMalang Script después de las marcas de tiempo de Facebook (Por ejemplo "11:45").',
		'ConfFriendRequestCountInTitle' : 'Mostrar el número de personas esperando para ser amigos en el título de la página.',
		'ConfGoogleApps' : 'Crear enlaces de Calendarios de Google compatibles con las Aplicaciones de Google.',
		'ConfGoogleAppsDomain' : 'Dominio',
		'ConfGoogleCalendar' : 'Mostrar enlaces para añadir cumpleaños y eventos a <a href="http://es.wikipedia.org/wiki/Google_Calendar" target="_blank">Calendarios de Google</a>.',
		'ConfGoogleLanguage' : 'Idiomas para <a href="http://es.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Ocultar los mensajes de las aplicaciones.',
		'ConfHideEventStories' : 'Ocultar los mensajes de eventos.',
		'ConfHideFanStories' : 'Ocultar los mensajes de los fan.',
		'ConfHideFriendStories' : 'Ocultar los mensajes de los amigos.',
		'ConfHideGroupStories' : 'Ocultar los mensajes de los grupos.',
		'ConfHideLinkStories' : 'Ocultar los mensajes de los vínculos.',
		'ConfHidePhotoStories' : 'Ocultar los mensajes de las fotos.',
		'ConfHideProfilePicStories' : 'Ocultar los mensajes de las fotos del perfil.',
		'ConfHideRead' : 'Ocultar los mensajes de Live Feed que han sido marcados como leídos.',
		'ConfHideRelationshipStories' : 'Ocultar mensajes de las relaciones.',
		'ConfHideStatusStories' : 'Ocultar mensajes de estado.',
		'ConfHideVideoStories' : 'Ocultar mensajes de los vídeos.',
		'ConfHideWallStories' : 'Ocultar mensajes de los muros.',
		'ConfHomeChat' : 'Mostrar la sección de chat.',
		'ConfHomeEvents' : 'Mostrar la sección de eventos.',
		'ConfHomeFindFriends' : 'Mostrar la sección de "Conecta con tus amigos".',
		'ConfHomeLeftAlign' : 'Alinear a la izquierda el contenido de la pagina de inicio.',
		'ConfHomeLeftAlign' : 'Alinear a la izquierda el contenido de la página principal.',
		'ConfHomeLeftColumn' : 'Mostrar la columna izquierda.',
		'ConfHomeLeftColumnFixed' : 'Mantener la columna izquierda siempre visible.',
		'ConfHomeLink' : 'Mostrar el vínculo de Home en el menú superior.',
		'ConfHomeNavigation' : 'Mostrar la sección de navegación.',
		'ConfHomePeopleYouMayKnow' : 'Mostrar la sección sugerencia de amigos.',
		'ConfHomePokes' : 'Mostrar la sección de Toques.',
		'ConfHomeProfile' : 'Mostrar la sección de perfil.',
		'ConfHomeRequests' : 'Mostrar la sección de Peticiones.',
		'ConfHomeRightColumn' : 'Mostrar la columna derecha.',
		'ConfHomeStretch' : 'Ajustar ancho de la página principal al tamaño del navegador.',
		'ConfiCalendar' : 'Añadir enlaces para descargar un archivo <a href="http://es.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> con todos los cumpleaños.',
		'ConfImport' : 'Para importar la configuración, pegue aquí el texto anteriormente guardado y haga clic en "Importar".',
		'ConfInboxCountInTitle' : 'Mostrar el número de mensajes nuevos de la bandeja de entrada en el título de la página',
		'ConfLogoutLink' : 'Añadir vínculo para cerrar la sesión en el menú superior.',
		'ConfNewTabSearch' : 'Hacer que los resultados de una busqueda se abran en una nueva pestaña al pulsar CTRL + Enter.',
		'ConfNotificationCountInTitle' : 'Mostrar el número de nuevas notificaciones en el título de la página.',
		'ConfPageTitle' : 'Eliminar "Facebook |" del titulo de cada página.',
		'ConfPhotoPopup' : 'Ampliar foto en ventana emergente al pasar el ratón sobre ella.',
		'ConfPopupAutoClose' : 'Cerrar ventana emergente automáticamente.',
		'ConfPopupPosition' : 'Posicion de la ventana emergente',
		'ConfPopupSmartAutoClose' : 'Prevenir que las ventanas emergentes se cierren automáticamente cuando el ratón pase por encima de ellas.',
		'ConfProcessInterval' : 'Intervalo en mili-segundos en el cual se procesa la página (Por defecto 1000):',
		'ConfProfileLink' : 'Mostrar el vínculo del perfil en el menú superior.',
		'ConfProfilePicPopup' : 'Ampliar foto del perfil en una ventana emergente al pasar el ratón sobre ella.',
		'ConfProtocolLinks' : 'Convertir los IDs de los programas de chats de los perfiles en enlaces para comemzar un chat (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Acerca de ArdMalang Script',
		'ConfSectionAdvanced' : 'Avanzado',
		'ConfSectionEvents' : 'Cumpleaños/Eventos',
		'ConfSectionHomePage' : 'Inicio',
		'ConfSectionImportExport' : 'Importar/Exportar',
		'ConfSectionMenu' : 'Menús/Chat',
		'ConfSectionOther' : 'Otras Opciones',
		'ConfSectionPageTitle' : 'Título de la Página',
		'ConfSectionPictures' : 'Fotos',
		'ConfSectionShortcuts' : 'Atajos de Teclado',
		'ConfSecureLinks' : 'Hacer que los links apunten a paginas HTTPS.',
		'ConfShortcutList' : '<b>Atajos de Teclado</b> (sensible a la diferencia entre minúsculas y mayúsculas):<br /><br /><i>Desde cualquier página:</i><br />&nbsp;<b>A</b> - Álbumes/Fotos<br />&nbsp;<b>B</b> - Activar/Desactivar lista de amigos (Amigos conectados)<br />&nbsp;<b>C</b> - Configuración de ArdMalang Script<br />&nbsp;<b>D</b> - Cumpleaños<br />&nbsp;<b>E</b> - Eventos<br />&nbsp;<b>F</b> - Amigos<br />&nbsp;<b>H</b> - Página de Inicio<br />&nbsp;<b>I</b> - Bandeja de Entrada<br />&nbsp;<b>K</b> - Añadir Marcador<br />&nbsp;<b>L</b> - Seleccionar vínculo para terminar la sesión (presione Enter después para terminar la sesión)<br />&nbsp;<b>N</b> - Notificaciones<br />&nbsp;<b>P</b> - Perfil<br />&nbsp;<b>R</b> - Peticiones<br />&nbsp;<b>S</b> - Saltar a el campo de búsqueda<br />&nbsp;<b>T</b> - Traducir el texto seleccionado<br />&nbsp;<b>?</b> - Mostrar la información de depuración de ArdMalang Script<br />&nbsp;<b><escape></b> - Cerrar la ventana emergente creada por ArdMalang Script<br /><br /><i>Desde la página de inicio (filtros)</i>:<br />&nbsp;<b>a</b> - Páginas<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Grupos<br />&nbsp;<b>l</b> - Vínculos<br />&nbsp;<b>n</b> - Noticias<br />&nbsp;<b>p</b> - fotos<br />&nbsp;<b>s</b> or <b>u</b> - Estatus de las Actualizaciones<br />&nbsp;<b>t</b> - Notas<br />&nbsp;<b>v</b> - Vídeos<br /><br /><i>Desde los perfiles</i>:<br />&nbsp;<b>i</b> - Información<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Muro<br />&nbsp;<b>x</b> - Cajas<br /><br /><i>Desde las páginas con paginación (previo, siguiente, etc)</i><br />&nbsp;<b><left arrow></b> - Previo<br />&nbsp;<b><right arrow></b> - Siguiente<br />&nbsp;<b><shift> + <left arrow></b> - Primera (cuando este disponible)<br />&nbsp;<b><shift> + <right arrow></b> - Ultimo (cuando este disponible)<br /><br /><i>Al ver albumes/fotos:</i><br />&nbsp;<b>a</b> - Ver todas la miniaturas (cuando este disponible)<br />&nbsp;<b>b</b> - Ver fotos grandes<br />&nbsp;<b>c</b> - Ver comentarios<br />&nbsp;<b>k</b> - De vuelta al álbum<br />&nbsp;<b>m</b> - Fotos de (personas) y yo<br /><br /><i>Al ver albumes recientes y fotos subidas/marcadas:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Albumes Recientes<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Fotos de Móviles<br />&nbsp;<b>o</b> - Fotos de mi<br />&nbsp;<b>p</b> - Mis Fotos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Amigos Marcados', 'ConfTopBarHoverOpacity' : 'Al pasar el ratón por encima', 'FacebookArdMalangConflict' : 'Facebook ArdMalang ahora se llama ArdMalang Script.<br /><br />Por el cambio de nombre es necesario desinstalar Facebook ArdMalang manualmente de su navegador o los dos programas entraran en conflicto.<br /><br />Si no sabe como desinstalar un userscript, <a %s>haga clic aquí para ver instrucciones</a>.',
		'ConfShortcuts' : 'Abilitar los atajos de teclado.',
		'ConfSign' : 'Mostrar los signos zodiacales de las personas en sus perfiles (Si indican fecha de nacimiento).',
		'ConfTopBarFixed' : 'Mantener la barra superior de menu en la pantalla siempre.',
		'ConfTopBarHoverOpacity' : 'Al pasar el ratón por encima',
		'ConfTopBarOpacity' : 'Transparencia de la barra de menu superior',
		'ConfUpdates' : 'Revisar Userscripts.org diarimente por si hay actualizaciones en ArdMalang Script. O <a href="#" id="fbfUpdateLink" onclick="return false;">revisar Ahora</a>.',
		'CreatingFile' : 'Creando Archivo',
		'DownloadVideo' : 'Descargar el Video',
		'ExportICalendarFile' : 'Exportar el archivo de iCalendar',
		'ExportICalendarFileWarning' : '(Esto puede tardar bastante dependiendo de la cantidad de amigos)',
		'FacebookArdMalangConflict' : 'Facebook ArdMalang ahora se llama ArdMalang Script.<br /><br />Por el cambio de nombre es necesario desinstalar Facebook ArdMalang manualmente de su navegador o los dos programas entraran en conflicto.<br /><br />Si no sabe como desinstalar un userscript, <a %s>haga clic aquí para ver instrucciones</a>.',
		'fullAlbumLoaded' : 'álbum completamente cargado',
		'Import' : 'Importar',
		'ImportConfirm' : '¿Está seguro que desea importar esta configuración?\nPerderá la configuración actual al hacer esto.',
		'ImportFailure' : 'Ha ocurrido un error al tratar de importar la configuración.',
		'ImportSuccess' : 'Se ha importado la configuración. ¿Desea refrescar la página?',
		'Left' : 'Izquierda',
		'LoadingAllPhotos' : 'Cargando todas las fotos...',
		'loadingFullAlbum' : 'Cargando álbumes completos...',
		'LoadingPic' : 'Cargando Foto...',
		'LoadPhotosWarning' : 'Cargar todas las fotos puede tomar mucho tiempo',
		'Months' : new Array('enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'),
		'ProtocolGoogle' : 'Chatear con %s usando Google Talk',
		'ProtocolMSN' : 'Chatear con %s usando Windows Live',
		'ProtocolSkype' : 'Llamar a  %s usando Skype',
		'ProtocolYahoo' : 'Chatear con %s usando Yahoo Messenger',
		'Refresh' : 'Recargar',
		'ReloadErrorPage' : 'Hacer clic para intentar de nuevo o esperar 5 segundos',
		'Remove' : 'Eliminar',
		'Right' : 'Derecha',
		'ShowBigPictures' : 'Mostrar Imágenes Grandes',
		'Signs' : new Array('Capricornio','Acuario','Piscis','Aries','Tauro','Géminis ','Cancer','Leo','Virgo','Libra','Escorpio','Sagitario'),
		'today' : 'hoy',
		'Translators' : 'Tranductores',
		'UpdateAvailable1' : 'Hay una actualización disponible para ArdMalang Script',
		'UpdateAvailable2' : '¿Desea actualizar ahora?',
		'UpdateHomepage' : 'Ir a la página de inicio',
		'UpdateInstall' : 'Instalar ahora',
		'UpdateTomorrow' : 'Recordar mañana',
		'yearsOld' : '%s años'
	},

	// French - Contributed by Serge Thiry (20100329)
	fr : {
		'_language' : 'French',
		'AddToCalendar' : 'Ajouter &agrave; l\'Agenda',
		'AddToGoogleCalendar' : 'Ajouter au Google Agenda',
		'all' : 'tout',
		'All' : 'Tout',
		'AllPhotosLoaded' : 'Toutes les photos sont charg&eacute;es',
		'Automatic' : 'Automatique',
		'Birthday' : 'Anniversaire de %s',
		'BookmarkAdd' : 'Ajout d\'un Marque-Page',
		'BookmarkConfirmRemoval' : 'Etes vous s&ucirc;r de vouloir supprimer le marque-page "%s"?',
		'BookmarkDoesNotExist' : 'Cette page n\'a pas &eacute;t&eacute; marqu&eacute;e.\n\nAllez &agrave; la page que vous souhaitez supprimer et r&eacute;-essayez.',
		'BookmarkExists' : 'Cette page a d&eacute;j&agrave; &eacute;t&eacute; marqu&eacute;e.\n\nAllez &agrave; la page que vous souhaitez marquer et r&eacute;-essayez.',
		'BookmarkNamePrompt' : 'Entrez un nom pour ce marque-page:\n%s',
		'BookmarkRemove' : 'Supprimer le marque-page',
		'Bookmarks' : 'Marque-pages',
		'BrowserUnsupported' : 'Votre navigateur Internet ne supporte pas cette fonction.',
		'CreatingFile' : 'Cr&eacute;ation du fichier',
		'Close' : 'Fermer',
		'ConfigureFacebookArdMalang' : 'Configurer ArdMalang Script',
		'ConfigureInstructions' : 'Tout changement est imm&eacute;diatement sauvegard&eacute;, mais il est possible que certains changements ne s\'actualisent pas dans des onglets d&eacute;j&agrave; ouverts.',
		'ConfAge' : 'Affichage de l\'&acirc;ge des personnes sur leur profil (si la date de naissance ins&eacute;r&eacute;e est compl&egrave;te).',
		'ConfAutoBigAlbumPictures' : 'Affichage automatique des photos agrandies &agrave; l\'ouverture d\'un album.',
		'ConfAutoLoadFullAlbum' : 'Chargement automatique des aper&ccedil;us de toutes les images contenues dans l\'album, sur une seule page.',
		'ConfAutoLoadTaggedPhotos' : 'Chargement automatique des aper&ccedil;us de toutes les photos identifi&eacute;es, sur une seule page (l\'onglet Photos des profils).',
		'ConfAutoReadMore' : 'Clic automatique sur les liens "Afficher d\'avantage".',
		'ConfBigAlbumPictures' : 'Ajout d\'un lien dans les albums permettant d\'afficher une version agrandie de toutes les images de la page.',
		'ConfBookmarks' : 'Ajoute un sous-menu Marque-Pages &agrave; la barre de menu sup&eacute;rieure.',
		'ConfBottomBarHoverOpacity' : 'Au passage de la souris',
		'ConfBottomBarOpacity' : 'Transparence de la barre de menu inf&eacute;rieure',
		'ConfCalendarBirthDate' : 'Ajout de la date d\'anniversaire de la personne dans les d&eacute;tails de l\'&eacute;v&eacute;nement.',
		'ConfCalendarFullName' : 'Utilisation du nom complet de la personne lors de l\'anniversaire de celle-ci (&agrave; la place du pr&eacute;nom uniquement).',
		'ConfChatDifferentiate' : 'Utilisation du gras et de l\'italique pour diff&eacute;rencier les amis connect&eacute;s et d&eacute;connect&eacute;s.',
		'ConfChatHideIdle' : 'Cacher les amis inactifs.',
		'ConfDelayPopupPics' : 'Ajout d\'un court temps d\'attente avant l\'affichage des images en popup.',
		'ConfDelayPopupPicsTimeout' : 'Temps d\'attente avant l\'affichage des images en popup, en millisecondes (par d&eacute;faut=500):',
		'ConfDownloadVideo' : 'Ajout d\'un lien de t&eacute;l&eacute;chargement des vid&eacute;os sur la page des vid&eacute;os. (Il peut s\'av&eacute;rer n&eacute;cessaire d\'installer un <a href="http://fr.wikipedia.org/wiki/Flash_Video#Logiciels_de_lecture_de_ce_format" target="_blank">lecteur de vid&eacute;os Flash</a>)',
		'ConfErrorPageReload' : 'Rechargement automatique de la page apr&egrave;s 5 secondes en cas d\'erreur.',
		'ConfExport' : 'Pour exporter vos param&egrave;tres, copiez le texte suivant et sauvez-le dans un fichier.',
		'ConfExternalPopup' : 'Affichage en taille originale des images externes en popup. <sup>beta</sup>',
		'ConfFacebookArdMalangLanguage' : 'Langue de ArdMalang Script',
		'ConfFacebookTimestamps' : 'Affichage de la datation Facebook (ex. "Il y a 3 heures").',
		'ConfFBFTimestamps' : 'Ajout de la datation ArdMalang Script apr&egrave;s la datation Facebook (ex. "11:45").',
		'ConfFBFTimestamps24' : 'Affichage de la datation ArdMalang Script au format 24 heures.',
		'ConfFriendRequestCountInTitle' : 'Affichage du nombre de demande d\'ajout &agrave; la liste d\'amis dans l\'en-t&ecirc;te de la page.',
		'ConfGoogleApps' : 'Cr&eacute;ation de liens Google Agenda compatibles avec les Google Apps.',
		'ConfGoogleAppsDomain' : 'Nom de domaine',
		'ConfGoogleCalendar' : 'Ajout d\'un lien pour ajouter les anniversaires et les &eacute;v&eacute;nements au <a href="http://fr.wikipedia.org/wiki/Google_Agenda" target="_blank">Google Agenda</a>.',
		'ConfGoogleLanguage' : 'Langue utilis&eacute;e par <a href="http://fr.wikipedia.org/wiki/Google_Traduction" target="_blank">Google Traduction</a>',
		'ConfHideApplicationStories' : 'Cache les publications des applications.',
		'ConfHideEventStories' : 'Cache les publications des &eacute;v&eacute;nements.',
		'ConfHideFanStories' : 'Cache les publications des pages fan.',
		'ConfHideFriendStories' : 'Cache les publications des ajouts &agrave; la liste d\'amis .',
		'ConfHideGroupStories' : 'Cache les publications des groupes.',
		'ConfHideLinkStories' : 'Cache les publications des liens.',
		'ConfHidePhotoStories' : 'Cache les publications des photos.',
		'ConfHideProfilePicStories' : 'Cache les publications des changements de photo de profil.',
		'ConfHideRead' : 'Cache les publications de la page principale qui ont &eacute;t&eacute; marqu&eacute;es comme lues.',
		'ConfHideRelationshipStories' : 'Cache les publications des relations.',
		'ConfHideStatusStories' : 'Cache les publications des status.',
		'ConfHideVideoStories' : 'Cache les publications des vid&eacute;os.',
		'ConfHideWallStories' : 'Cache les publications des messages sur le mur.',
		'ConfHomeChat' : 'Affichage de la section Discussion intantan&eacute;e.',
		'ConfHomeEvents' : 'Affichage de la section Ev&eacute;nements.',
		'ConfHomeFindFriends' : 'Affichage de la section Communiquez avec vos amis.',
		'ConfHomeLeftAlign' : 'Alignement &agrave; gauche du contenu de la page d\'accueil.',
		'ConfHomeLeftColumn' : 'Affichage de la colonne de gauche.',
		'ConfHomeLeftColumnFixed' : 'Maintien l\'affichage de la colonne de gauche &agrave; l\'&eacute;cran, m&ecirc;me apr&egrave;s &ecirc;tre descendu dans la page.',
		'ConfHomeLink' : 'Affichage du lien Accueil dans la barre de menu sup&eacute;rieure.',
		'ConfHomePeopleYouMayKnow' : 'Affichage de la section Suggestions.',
		'ConfHomeNavigation' : 'Affichage de la section Navigation.',
		'ConfHomePokes' : 'Affichage de la section Pokes.',
		'ConfHomeProfile' : 'Affichage de la section Profil.',
		'ConfHomeRequests' : 'Affichage de la section Invitations.',
		'ConfHomeRightColumn' : 'Affichage de la colonne de droite.',
		'ConfHomeStretch' : 'Etirement du contenu de la page d\'accueil jusqu\'&agrave; la largeur compl&egrave;te de la fen&ecirc;tre.',
		'ConfiCalendar' : 'Ajoute un lien de t&eacute;l&eacute;chargement d\'un fichier <a href="http://fr.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> contenant tous les anniversaires.',
		'ConfImport' : 'Pour importer vos param&egrave;tres, remplacez le texte suivant par celui pr&eacute;c&eacute;demment sauvegard&eacute; et cliquez sur "Importer".',
		'ConfInboxCountInTitle' : 'Affichage du nombre de nouveaux messages dans l\'en-t&ecirc;te de la page.',
		'ConfLogoutLink' : 'Ajoute un lien de d&eacute;connection dans la barre de menu sup&eacute;rieure.',
		'ConfNotificationCountInTitle' : 'Affichage du nombre de notifications dans l\'en-t&ecirc;te de la page.',
		'ConfNewTabSearch' : 'Fait appara&icirc;tre les r&eacute;sultats de la recherche dans un nouvel onglet/une nouvelle fen&ecirc;tre lors de l\'utilisation de CTRL + Enter pour valider la recherche.',
		'ConfPageTitle' : 'Suppression du "Facebook |" contenu dans l\'en-t&ecirc;te de chaque page.',
		'ConfPhotoPopup' : 'Affichage de versions plus grandes des photos en popup au passage de la souris.',
		'ConfPopupAutoClose' : 'Fermeture automatique des images en popup.',
		'ConfPopupSmartAutoClose' : 'Emp&ecirc;che la fermeture automatique des images en popup si la souris se trouve dessus.',
		'ConfPopupPosition' : 'Position des images en popup',
		'ConfProcessInterval' : 'Intervalle à laquelle la page sera trait&eacute;e, en millisecondes (par d&eacute;faut=1000):',
		'ConfProfileLink' : 'Affichage du lien Profil dans la barre de menu sup&eacute;rieure.',
		'ConfProfilePicPopup' : 'Affichage de versions plus grandes des photos de profil en popup au passage de la souris',
		'ConfProtocolLinks' : 'Transforme les identifiants de messagerie des profils en liens permettant de commencer une conversation instantan&eacute;e (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'A propos de ArdMalang Script',
		'ConfSectionAdvanced' : 'Avanc&eacute;',
		'ConfSectionEvents' : 'Anniversaires/Ev&eacute;nements',
		'ConfSectionImportExport' : 'Importer/Exporter',
		'ConfSectionFeeds' : 'Publications sur la page d\'accueil',
		'ConfSectionHomePage' : 'Page d\'accueil',
		'ConfSectionLiveFeed' : 'Fil d\'actualit&eacute;',
		'ConfSectionMenu' : 'Menus/Discussion instantan&eacute;e',
		'ConfSectionOther' : 'Autres options',
		'ConfSectionPageTitle' : 'En-t&ecirc;te de la page',
		'ConfSectionPictures' : 'Photos',
		'ConfSectionShortcuts' : 'Raccourcis clavier',
		'ConfSecureLinks' : 'Force les liens Facebook &agrave; pointer vers des pages HTTPS.',
		'ConfShortcutList' : '<b>Raccourcis clavier</b> (sensible &agrave; la casse):<br /><br /><i>Sur toutes les pages:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Affichage de la liste d\'amis (amis en ligne)<br />&nbsp;<b>C</b> - Configuration de ArdMalang Script<br />&nbsp;<b>D</b> - Anniversaires<br />&nbsp;<b>E</b> - Ev&eacute;nements<br />&nbsp;<b>F</b> - Amis<br />&nbsp;<b>H</b> - Page d\'accueil<br />&nbsp;<b>I</b> - Bo&icirc;te de r&eacute;ception<br />&nbsp;<b>K</b> - Ajout d\'un marque-page<br />&nbsp;<b>L</b> - S&eacute;lection du lien de d&eacute;connection (appuyez ensuite sur Enter pour vous d&eacute;connecter)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Votre profil<br />&nbsp;<b>R</b> - Invitations<br />&nbsp;<b>S</b> - Saut au champ de recherche<br />&nbsp;<b>T</b> - Traduction du texte s&eacute;lectionn&eacute;<br />&nbsp;<b>?</b> - Affiche les informations de debug de ArdMalang Script<br />&nbsp;<b>&lt;escape&gt;</b> - Ferme les popups cr&eacute;es par ArdMalang Script<br /><br /><i>Sur la page d\'accueil (filtres)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Fil d\'actualit&eacute;s r&eacute;centes<br />&nbsp;<b>g</b> - Groupes<br />&nbsp;<b>l</b> - Liens<br />&nbsp;<b>n</b> - Fil d\'actualit&eacute;s &agrave; la une<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Changements de status<br />&nbsp;<b>t</b> - Articles<br />&nbsp;<b>v</b> - Vid&eacute;os<br /><br /><i>Sur les profils</i>:<br />&nbsp;<b>i</b> - Infos<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Mur<br />&nbsp;<b>x</b> - Encarts<br /><br /><i>Sur les pages avec pagination (pr&eacute;c&eacute;dent, suivant, etc)</i><br />&nbsp;<b>&lt;fl&egrave;che gauche&gt;</b> - Pr&eacute;c&eacute;dent<br />&nbsp;<b>&lt;fl&egrave;che droite&gt;</b> - Suivant<br />&nbsp;<b>&lt;shift&gt; + &lt;fl&egrave;che gauche&gt;</b> - Premier (si disponible)<br />&nbsp;<b>&lt;shift&gt; + &lt;fl&egrave;che droite&gt;</b> - Dernier (si disponible)<br /><br /><i>Lors de l\'affichage d\'albums/photos:</i><br />&nbsp;<b>a</b> - Chargement de tous les aper&ccedil;us (si disponible)<br />&nbsp;<b>b</b> - Affichage de plus grandes images<br />&nbsp;<b>c</b> - Affichage des commentaires<br />&nbsp;<b>k</b> - Retour &agrave; l\'album<br />&nbsp;<b>m</b> - Photos de (la personne) et de moi<br /><br /><i>Lors de l\'affichage d\'albums r&eacute;cents et de photos ajout&eacute;es/identifi&eacute;es:</i><br />&nbsp;<b>a</b> ou &nbsp;<b>r</b> - Albums r&eacute;cents<br />&nbsp;<b>m</b> ou &nbsp;<b>u</b> - Ajout depuis un mobile<br />&nbsp;<b>o</b> - Photos de moi<br />&nbsp;<b>p</b> - Mes photos<br />&nbsp;<b>t</b> ou &nbsp;<b>f</b> - Amis identifi&eacute;s',
		'ConfShortcuts' : 'Active les raccourcis clavier.',
		'ConfSign' : 'Affiche le signe zodiacal des personnes sur leur profil (si la date de naissance ins&eacute;r&eacute;e est compl&egrave;te).',
		'ConfTopBarFixed' : 'Maintien la barre de menu sup&eacute;rieure &agrave; l\'&eacute;cran, m&ecirc;me apr&egrave;s &ecirc;tre descendu dans la page.',
		'ConfTopBarHoverOpacity' : 'Au passage de la souris',
		'ConfTopBarOpacity' : 'Transparence de la barre de menu sup&eacute;rieure',
		'ConfUpdates' : 'V&eacute;rifie quotidiennement si une mise &agrave; jour de ArdMalang Script est disponible sur Userscripts.org. Ou <a href="#" id="fbfUpdateLink" onclick="return false;">v&eacute;rifier maintenant</a>.',
		'DownloadVideo' : 'T&eacute;l&eacute;charger la vid&eacute;o',
		'ExportICalendarFile' : 'Exporter en fichier iCalendar',
		'ExportICalendarFileWarning' : '(Cette op&eacute;ration prendra un moment si vous avez beaucoup d\'amis)',
		'FacebookArdMalangConflict' : 'ArdMalang Script est maintenant devenu ArdMalang Script. A cause du changement de nom, vous aurez besoin de d&eacute;sinstaller manuellement ArdMalang Script de votre explorateur, ou les deux scripts rentreront en conflit. Si vous n\'&ecirc;tes pas s&ucirc;r de comment faire pour d&eacute;sinstaller un userscript, <a %s>cliquez ici pour la marche &agrave; suivre</a>.',
		'fullAlbumLoaded' : 'l\'album complet est charg&eacute;',
		'Import' : 'Importer',
		'ImportConfirm' : 'Etes-vous s&ucirc;r de vouloir importer ces param&egrave;tres?\nVotre configuration actuelle sera perdue.',
		'ImportFailure' : 'Une erreur est survenue lors de l\'importation de vos param&egrave;tres.',
		'ImportSuccess' : 'Importation r&eacute;ussie. Voulez-vous recharger la page?',
		'Left' : 'Gauche',
		'ListeningRestarted' : 'ArdMalang Script s\'est remit \340 l\'\351coute des changements \351ventuels.',
		'ListeningStopped' : 'ArdMalang Script a arret\351 d\'\352tre \340 l\'\351coute des changements \351ventuels.\nAppuyez sur L (SHIFT + l) pour r\351-activer l\'\351coute',
		'LoadingAllPhotos' : 'Chargement de toutes les photos...',
		'loadingFullAlbum' : 'chargement de l\'album complet...',
		'LoadingPic' : 'Chargement de l\'image...',
		'LoadPhotosWarning' : 'Charger toutes les photos peut prendre un moment',
		'Months' : new Array('janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'),
		'ProtocolSkype' : 'Appeler %s via Skype',
		'ProtocolMSN' : 'Discuter avec %s via Windows Live',
		'ProtocolYahoo' : 'Discuter avec %s via Yahoo Messenger',
		'ProtocolGoogle' : 'Discuter avec %s via Google Talk',
		'ReloadErrorPage' : 'Cliquez ici pour essayer &agrave; nouveau, ou attendez 5 secondes',
		'Refresh' : 'Rafra&icirc;chir',
		'Remove' : 'Enlever',
		'Right' : 'Droite',
		'ShowBigPictures' : 'Afficher les images en plus grand',
		'Signs' : new Array('Capricorne','Verseau','Poissons','Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire'),
		'today' : 'aujourd\'hui',
		'Translators' : 'Traducteurs',
		'UpdateAvailable1' : 'Une mise &agrave; jour de ArdMalang Script est disponible',
		'UpdateAvailable2' : 'Voulez-vous effectuer la mise &agrave; jour ?',
		'UpdateHomepage' : 'Aller &agrave; la page principale',
		'UpdateInstall' : 'Installer maintenant',
		'UpdateTomorrow' : 'Me le rappeler demain',
		'yearsOld' : '%s ans'
	},

	// Italian - Contributed by Dario Archetti and GorGeouS (20101028)
	it : {
		'_language' : 'Italian',
		'AddToCalendar' : 'Aggiungi al calendario',
		'AddToGoogleCalendar' : 'Aggiungi a Google Calendar',
		'all' : 'tutto',
		'All' : 'Tutto',
		'AllPhotosLoaded' : 'Tutte le foto sono state caricate.',
		'Automatic' : 'Automatico',
		'Birthday' : 'Il compleanno di %s',
		'BookmarkAdd' : 'Aggiungi un nuovo segnalibro',
		'BookmarkExists' : 'Questa pagina è già tra i segnalibri.\n\nVai alla pagina che vuoi aggiungere e riprova.',
		'BookmarkNamePrompt' : 'Inserisci un nome per questo segnalibro:\n%s',
		'BookmarksConfirmRemoval' : 'Sei sicuro di voler rimuovere i segnalibri seguenti?',
		'BookmarksManage' : 'Manage Bookmarks',
		'BookmarksRemoveSelected' : 'Rimuovi Segnalibri Selezionati',
		'Bookmarks' : 'Segnalibri',
		'BrowserUnsupported' : 'Il tuo browser mom supporta questa funzionalita\'.',
		'CreatingFile' : 'Sto creando il file',
		'Close' : 'Chiudi',
		'ConfigureFacebookArdMalang' : 'Impostazioni di ArdMalang Script',
		'ConfigureInstructions' : 'I cambiamenti vengono salvati immediatamente, ma alcuni possono non avere effetto nelle schede già aperte.',
		'ConfAge' : 'Mostra l\'età nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfApplicationWhitelist' : 'Whitelist Applicazioni - Inserisci gli ID delle applicazioni che non vuoi che vengano nascoste. Separa gli ID con uno spazio.',
		'ConfAutoBigAlbumPictures' : 'Negli album mostra automaticamente immagini più grandi quando la pagina si apre.',
		'ConfAutoLoadFullAlbum' : 'Carica automaticamente le anteprime di tutte le immagini in un album o in una pagina.',
		'ConfAutoLoadTaggedPhotos' : 'Carica automaticamente le anteprime di tutte le foto taggate in una pagina (nella sezione "Foto" dei profili).',
		'ConfAutoReadMore' : 'Clicca automaticamente sui link "Mostra tutto".',
		'ConfBigAlbumPictures' : 'Aggiungi un link negli album per mostrare una versione più grande di ogni foto nella pagina.',
		'ConfBigAlbumPicturesBorder' : 'Aggiungi un bordo intorno alle foto quando vengono visualizzate in formato grande.',
		'ConfBookmarks' : 'Aggiungi il sotto-menu "Segnalibri" alla barra superiore.',
		'ConfBottomBarHoverOpacity' : 'Al passaggio del mouse',
		'ConfBottomBarOpacity' : 'Trasparenza della barra inferiore',
		'ConfCalendarBirthDate' : 'Includi il compleanno di una persona nei dettagli dell\'evento.',
		'ConfCalendarFullName' : 'Usa il nome completo di una persona come titolo per i compleanni. (invece che soltanto il nome).',
		'ConfChatDifferentiate' : 'Usa il grassetto e l\'italico per differenziare contatti disponibili e inattivi.',
		'ConfChatHideIdle' : 'Nascondi i contatti inattivi.',
		'ConfDelayPopupPics' : 'Mostra i popup con un piccolo ritardo.',
		'ConfDelayPopupPicsTimeout' : 'Ritardo prima di mostrare i popup (default=500):',
		'ConfDownloadVideo' : 'Aggiungi un link per scaricare i video. (Per riprodurli avrai bisogno di un <a href="http://it.wikipedia.org/wiki/Flash_Video" target="_blank">programma esterno</a>)',
		'ConfErrorPageReload' : 'Dopo 5 secondi ricarica automaticamente la pagina di errore di un\'applicazione.',
		'ConfExport' : 'Per esportare le tue impostazioni, copia il testo sotto e salvalo in un file.',
		'ConfExternalPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle immagini esterne. <sup>beta</sup>',
		'ConfFacebookArdMalangLanguage' : 'Lingua di ArdMalang Script',
		'ConfFacebookTimestamps' : 'Mostra l\'orario dei post usando il metodo classico (es. "3 ore fa").',
		'ConfFBFTimestamps' : 'Mostra l\'orario dei post usando l\'ora esatta (es. "11:45").',
		'ConfFBFTimestamps24' : 'Mostra l\'ora dei post nel formato 24 ore.',
		'ConfFriendRequestCountInTitle' : 'Mostra il numero di richieste di amicizia nella barra del titolo.',
		'ConfGoogleApps' : 'Crea un link a Google Calendar compatibile con Google Apps.',
		'ConfGoogleAppsDomain' : 'Dominio',
		'ConfGoogleCalendar' : 'Aggiungi link per inserire compleanni ed eventi a <a href="http://it.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Lingua per <a href="http://it.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Nascondi i post delle applicazioni.',
		'ConfHideEgos' : 'Nascondi tutte le sezioni "personali" (potrebbe nascondere la maggior parte delle raccomandazioni di Facebook).',
		'ConfHideEventStories' : 'Nascondi i post degli eventi.',
		'ConfHideFacebookCountInTitle' : 'Nascondi la visualizzazione del numero di nuovi messaggi da leggere.',
		'ConfHideFriendStories' : 'Nascondi le notizie "ha stretto amicizia con...".',
		'ConfHideGroupStories' : 'Nascondi le notizie "si è iscritto al gruppo...".',
		'ConfHideHovercards' : 'Nascondi hovercard (il popup che appare quando si passa con il mouse sopra il nome di una persona).',
		'ConfHideLikeStories' : 'Nascondi i post riguardanti i "Mi piace".',
		'ConfHideLinkStories' : 'Nascondi i post riguardanti link.',
		'ConfHideNoteStories' : 'Nascondi i post riguardanti le note.',
		'ConfHidePhotoStories' : 'Nascondi i post riguardanti foto.',
		'ConfHidePlaceStories' : 'Nascondi i post riguardanti i luoghi.',
		'ConfHideProfilePicStories' : 'Nascondi i post riguardanti foto del profilo.',
		'ConfHideRead' : 'Nascondi gli elementi del live feed che sono stati segnati come già letti.',
		'ConfHideRelationshipStories' : 'Nascondi le notizie riguardanti relazioni.',
		'ConfHideStatusStories' : 'Nascondi gli aggiornamenti di stato.',
		'ConfHideVideoStories' : 'Nascondi i post di video.',
		'ConfHideWallStories' : 'Nascondi le attività delle bacheche.',
		'ConfHomeBeta' : 'Mostra la sezione Sneak Peek di Facebook.',
		'ConfHomeChat' : 'Mostra gli amici online.',
		'ConfHomeChatNames' : 'Mostra i nomi nella sezione della chat.',
		'ConfHomeEvents' : 'Mostra la sezione "Eventi".',
		'ConfHomeFindFriends' : 'Mostra la sezione "Connettiti con i tuoi amici".',
		'ConfHomeLeftAlign' : 'Allinea a sinistra il contenuto della homepage.',
		'ConfHomeLeftColumn' : 'Mostra la colonna di sinistra.',
		'ConfHomeLeftColumnFixed' : 'Mantieni visibile la colonna di sinistra anche dopo lo scroll.',
		'ConfHomeLink' : 'Mostra il link "Home" nella barra superiore.',
		'ConfHomeNavigation' : 'Mostra i filtri.',
		'ConfHomePokes' : 'Mostra la sezione "Poke".',
		'ConfHomeProfile' : 'Mostra la propria immagine del profilo.',
		'ConfHomeRecommendations' : 'Mostra racommandazioni (Persone che potresti conoscere, Pagine raccomandate, ecc).',
		'ConfHomeRequests' : 'Mostra la sezione "Richieste".',
		'ConfHomeRightColumn' : 'Mostra la colonna di destra.',
		'ConfHomeStretch' : 'Allarga la homepage affinché si adatti alla larghezza della finestra del browser.',
		'ConfHomeStretchComments' : 'Allarga la zona dei commenti sulla homepage.',
		'ConfiCalendar' : 'Aggiungi link per scaricare un file di <a href="http://it.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> con tutti i compleanni.',
		'ConfImport' : 'Successivamente, per importare le tue impostazioni, sovrascrivi il testo sottostante con quello che hai salvato precedentemente e clicca "Importa".',
		'ConfInboxCountInTitle' : 'Mostra il numero di nuovi messaggi nel titolo della pagina.',
		'ConfLogoutLink' : 'Aggiungi un link per il logout alla barra superiore',
		'ConfNotificationCountInTitle' : 'Mostra il numero di notifiche nella barra del titolo.',
		'ConfNewTabSearch' : 'Fai in modo che i risultati delle ricerche si aprano in una nuova scheda quando si preme CTRL + Invio per cercare.',
		'ConfPageTitle' : 'Rimuovi "Facebook |" dal titolo di ciascuna pagina.',
		'ConfPhotoPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle foto.',
		'ConfPopupAutoClose' : 'Chiudi i popup automaticamente.',
		'ConfPopupSmartAutoClose' : 'Non far chiudere i popup se il mouse è sopra di essi.',
		'ConfPopupPosition' : 'Posizione del popup',
		'ConfPopupWhileTagging' : 'Mostra i popup delle immagini anche sui tag.',
		'ConfProcessInterval' : 'Intervallo dopo il qualeprocessare la pagina, in millisecondi (default=1000):',
		'ConfProfileLink' : 'Mostra il link "Profilo" nella barra superiore.',
		'ConfProfilePicPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle immagini dei profili.',
		'ConfProtocolLinks' : 'Converti gli ID di messaggistica nei profili in link che iniziano una conversazione. (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Riguardo di ArdMalang Script',
		'ConfSectionAdvanced' : 'Avanzate',
		'ConfSectionEvents' : 'Compleanni/Eventi',
		'ConfSectionImportExport' : 'Importa/Esporta',
		'ConfSectionFeeds' : 'Notizie',
		'ConfSectionHomePage' : 'Home Page',
		'ConfSectionLiveFeed' : 'Aggiornamenti in tempo reale',
		'ConfSectionMenu' : 'Menu/Chat',
		'ConfSectionOther' : 'Altre opzioni',
		'ConfSectionPageTitle' : 'Titolo della pagina',
		'ConfSectionPictures' : 'Foto',
		'ConfSectionShortcuts' : 'Scorciatoie da tastiera',
		'ConfSecureLinks' : 'Forza i link di Facebook ad aprire pagine HTTPS.',
		'ConfShortcutList' : '<b>Scorciatoie da tasiera</b> (prestare attenzione a maiuscole/minuscole):<br /><br /><i>In ogni pagina</i><br /> <b>A</b> - Album/foto<br /> <b>B</b> - Apri la lista degli amici online<br /> <b>C</b> - Impostazioni di ArdMalang Script<br /> <b>D</b> - Compleanni<br /> <b>E</b> - Eventi<br /> <b>F</b> - Amici<br /> <b>H</b> - Home page<br /> <b>I</b> - Posta in arrivo<br /> <b>K</b> - Aggiungi segnalibro<br /> <b>L</b> - Seleziona il link per effettuare il logout (poi premi Invio per effettuare il logout)<br /> <b>N</b> - Notifiche<br /> <b>P</b> - Il tuo profilo<br /> <b>R</b> - Richieste<br /> <b>S</b> - Seleziona il campo di ricerca<br /> <b>T</b> - Traduci il testo selezionato<br /> <b>?</b> - Mostra le informazioni di debug di ArdMalang Script<br /> <b><escape></b> - Chiudi i pop-up creati da ArdMalang Script<br /><br /><i>Dalla home page (filtri)</i>:<br /> <b>a</b> - Pagine<br /> <b>f</b> - Notizie in tempo reale<br /> <b>g</b> - Gruppi<br /> <b>l</b> - Link<br /> <b>n</b> - Notizie<br /> <b>p</b> - Foto<br /> <b>s</b> o <b>u</b> - Aggiornamenti di stato<br /> <b>t</b> - Note<br /> <b>v</b> - Video<br /><br /><i>Dai profili</i>:<br /> <b>i</b> - Info<br /> <b>p</b> - Foto<br /> <b>w</b> - Bacheca<br /> <b>x</b> - Riquadri<br /><br /><i>Dalle pagine con paginazione (precedente, successivo, etc)</i><br /> <b><freccia sinistra></b> - Precedente<br /> <b><freccia destra></b> - Successivo<br /> <b><shift> + <freccia sinistra></b> - Primo (Quando disponibile)<br /> <b><shift> + <freccia destra></b> - Ultimo (Quando disponibile)<br /><br /><i>Mentre si guardano album/foto:</i><br /> <b>a</b> - Carica tutte le anteprime (quando disponibile)<br /> <b>b</b> - Mostra immagini grandi<br /> <b>c</b> - Mostra i commenti<br /> <b>k</b> - Torna all\' album<br /> <b>m</b> - Foto con me<br /><br /><i>Mentre si guardano album recenti e foto appena caricate/taggate:</i><br /> <b>a</b> o  <b>r</b> - Album recenti<br /> <b>m</b> o  <b>u</b> - Upload via mobile<br /> <b>o</b> - Foto con me<br /> <b>p</b> - Le mie foto<br /> <b>t</b> o  <b>f</b> - Amici taggati',
		'ConfShortcuts' : 'Attiva le scorciatoie da tastiera.',
		'ConfSign' : 'Mostra il segno zodiacale nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfTopBarFixed' : 'Mantieni fissa la posizione della barra superiore.',
		'ConfTopBarHoverOpacity' : 'Al passaggio del mouse',
		'ConfTopBarOpacity' : 'Trasparenza della barra superiore',
		'ConfUpdates' : 'Controlla ogni giorno Userscripts.org per eventuali update, oppure <a href="#" id="fbfUpdateLink" onclick="return false;">controlla adesso!</a>.',
		'DownloadVideo' : 'Scarica il video.',
		'ExportICalendarFile' : 'Esporta file di iCalendar.',
		'ExportICalendarFileWarning' : '(Questo impiegherà un po\' se hai molti amici!)',
		'FacebookArdMalangConflict' : 'ArdMalang Script ha cambiato nome in ArdMalangt dal tuo browser, o i due script andranno in conflitto. Se non sei sicuro di come disinstallare un userscript <a %s>clicca qui per le istruzioni</a>.',
		'fullAlbumLoaded' : 'l\'album completo è stato caricato.',
		'Import' : 'Importa',
		'ImportConfirm' : 'Sei sicuro di voler importare queste impostazioni?\nLe tue impostazioni attuali saranno sovrascritte.',
		'ImportFailure' : 'Un errore è accaduto durante l\'importazione delle impostazioni.',
		'ImportSuccess' : 'Importazione completata. Vuoi ricaricare la pagina?',
		'Left' : 'Sinistra',
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
		'Refresh' : 'Ricarica',
		'Remove' : 'Rimuovi',
		'Right' : 'Destra',
		'ShowBigPictures' : 'Mostra immagini a grandi dimensioni.',
		'Signs' : new Array('Capricorno','Aquario','Pesci','Ariete','Toro','Gemelli','Cancro','Leone','Vergine','Bilancia','Scorpione','Sagittario'),
		'today' : 'oggi',
		'Translators' : 'Traduttori',
		'UpdateAvailable1' : 'È disponibile un update per ArdMalang Script.',
		'UpdateAvailable2' : 'Vuoi scaricare l\'aggiornamento adesso?',
		'UpdateHomepage' : 'Visita la Homepage',
		'UpdateInstall' : 'Installa ora.',
		'UpdateTomorrow' : 'Ricordamelo domani.',
		'yearsOld' : '%s anni.'
	},

	// German - Contributed by Constantin Groß (20090830)
	de : {
		'_language' : 'German',
		'AddToCalendar' : 'Zu Kalender hinzugügen',
		'AddToGoogleCalendar' : 'Zu Google Kalender hinzufügen',
		'all' : 'alle',
		'All' : 'Alle',
		'AllPhotosLoaded' : 'Alle Fotos geladen',
		'Automatic' : 'Automatisch',
		'Birthday' : '%ss Geburtstag',
		'CreatingFile' : 'Erstelle Datei',
		'Close' : 'Schließen',
		'ConfigureFacebookArdMalang' : 'ArdMalang Script konfigurieren',
		'ConfigureInstructions' : 'Alle Änderungen werden sofort gespeichert, aber einige Änderungen können in bereits offenen Tabs nicht angewendet werden.',
		'ConfAge' : 'Alter von Personen im Profil anzeigen (wenn das volle Geburtsdatum angegeben wurde).',
		'ConfAutoBigAlbumPictures' : 'Automatisch größere Albenbilder beim öffnen der Seite anzeigen.',
		'ConfAutoLoadFullAlbum' : 'Vorschaubilder für alle Bilder eines Albums automatisch laden.',
		'ConfAutoLoadTaggedPhotos' : 'Vorschaubilder für alle getaggten Bilder automatisch laden (Fotos-Tab auf der Profilseite).',
		'ConfBigAlbumPictures' : 'Link auf Albumseiten hinzüfügen, über den größere Versionen aller Bilder angezeigt werden können.',
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
		'ConfFacebookArdMalangLanguage' : 'Sprache für ArdMalang Script',
		'ConfGoogleApps' : 'Google Kalender Links kompatibel zu Google Apps erstellen.',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Links hinzufügen, um Geburtstage und Veranstaltungen zu <a href="http://de.wikipedia.org/wiki/Google_Kalender" target="_blank">Google Kalender</a> hinzuzufügen.',
		'ConfGoogleLanguage' : 'Sprache für <a href="http://translate.google.de/#" target="_blank">Google Übersetzer</a>',
		'ConfHomeFindFriends' : '"Mit Freunden in Verbindung treten" anzeigen.',
		'ConfHomeLeftAlign' : 'Startseiteninhalte linksorientiert ausrichten.',
		'ConfHomePeopleYouMayKnow' : '"Vorschläge" anzeigen.',
		'ConfHomePokes' : '"Anstupser" anzeigen.',
		'ConfHomeRightColumn' : 'Rechte Spalte anzeigen.',
		'ConfiCalendar' : 'Link zum herunterladen einer <a href="http://de.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-Datei mit allen Geburtstagen hinzufügen.',
		'ConfShortcutList' : '<b>Tastenkürzel</b> (Groß-/Kleinschreibung beachten!):<br /><br /><i>Auf jeder Seite:</i><br />&nbsp;<b>A</b> - Alben/Fotos<br />&nbsp;<b>B</b> - Chatliste ein-/ausblenden<br />&nbsp;<b>C</b> - ArdMalang Script Einstellungen<br />&nbsp;<b>F</b> - Freunde<br />&nbsp;<b>H</b> - Startseite<br />&nbsp;<b>I</b> - Postfach<br />&nbsp;<b>L</b> - Reagieren von ArdMalang Script auf Seitenänderung ein-/ausschalten<br />&nbsp;<b>N</b> - Benachrichtigungen<br />&nbsp;<b>P</b> - Mein Profil<br />&nbsp;<b>T</b> - Markierten Text übersetzen<br />&nbsp;<b>&lt;escape&gt;</b> - Von ArdMalang Script erstellte Popups schließen<br /><br /><i>Auf der Startseite</i>:<br />&nbsp;<b>f</b> oder <b>l</b> - Live-Feed<br />&nbsp;<b>i</b> - Posted items<br />&nbsp;<b>n</b> - News-Feed<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>s</b> oder <b>u</b> - Status-Updates<br /><br /><i>Auf Profilseiten</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Pinnwand<br />&nbsp;<b>x</b> - Felder<br /><br /><i>Auf Seiten mit Seitenzahlen (zurück, vor, etc)</i><br />&nbsp;<b>&lt;Pfeil-nach-Links&gt;</b> - Zurück<br />&nbsp;<b>&lt;Pfeil-nach-Rechts&gt;</b> - Vor<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Links&gt;</b> - Erste (wenn verfügbar)<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Rechts&gt;</b> - Letzte (wenn verfügbar)<br /><br /><i>Bei der Anzeige von Alben & Fotos:</i><br />&nbsp;<b>a</b> - Alle Vorschaubilder laden (wenn verfügbar)<br />&nbsp;<b>b</b> - Große Bilder anzeigen<br />&nbsp;<b>c</b> - Kommentare anzeigen<br />&nbsp;<b>k</b> - Zurück zum Album<br />&nbsp;<b>m</b> - Fotos der Person und mir<br /><br /><i>Bei neuen Alben und getaggten/hochgeladenen Fotos:</i><br />&nbsp;<b>a</b> oder &nbsp;<b>r</b> - Neue Alben<br />&nbsp;<b>m</b> oder &nbsp;<b>u</b> - Mobile Uploads<br />&nbsp;<b>o</b> - Fotos von mir<br />&nbsp;<b>p</b> - Meine Fotos<br />&nbsp;<b>t</b> oder &nbsp;<b>f</b> - Getaggte Freunde',
		'ConfNewTabSearch' : 'Suchergebnisse in einem neuen Tab/Fenster öffnen, wenn für die Suche STRG + Enter gedrückt wurde.',
		'ConfPageTitle' : '"Facebook |" überall aus dem Seitentitel entfernen.',
		'ConfPhotoPopup' : 'Größere Versionen von Fotos im Popup anzeigen, wenn sie mit der Maus berührt werden.',
		'ConfPopupAutoClose' : 'Bilder-Popup automatisch schließen.',
		'ConfPopupPosition' : 'Position des Bilder-Popups',
		'ConfProfilePicPopup' : 'Größere Profilbilder im Popup anzeigen, wenn sie mit der Maus berührt werden',
		'ConfProtocolLinks' : 'Messenger-IDs der Profile in Links umwandeln, über die eine Kommunikation gestartet werden kann (Google Talk, Windows Live etc).',
		'ConfSecureLinks' : 'HTTPS-Verbindung für alle Facebook-Links verwenden.',
		'ConfShortcuts' : 'Tastenkürzel aktivieren. (<a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">Liste ansehen</a>)',
		'ConfSign' : 'Sternzeichen im Profil anzeigen (wenn das volle Geburtsdatum angegeben wurde).',
		'ConfTopBarFixed' : 'Obere Menüleiste auch beim Scrollen anzeigen.',
		'ConfTopBarHoverOpacity' : 'Bei Mouse-Over',
		'ConfTopBarOpacity' : 'Transparenz der oberen Menüleiste',
		'ConfUpdates' : 'UÜberprüfen Sie Userscripts.org täglich auf Updates für ArdMalang Script. <a href="#" id="fbfUpdateLink" onclick="return false;">Jetzt überprüfen</a>.',
		'DownloadVideo' : 'Video herunterladen',
		'ExportICalendarFile' : 'iCalendar-Export',
		'ExportICalendarFileWarning' : '(kann bei einer großen Zahl an Freunden eine Weile dauern)',
		'fullAlbumLoaded' : 'Album vollständig geladen',
		'Left' : 'Links',
		'ListeningRestarted' : 'ArdMalang Script reagiert wieder auf Änderungen.',
		'ListeningStopped' : 'ArdMalang Script reagiert nicht auf Änderungen.\nL (SHIFT + l) drücken, um die Reaktion wieder zu aktvieren.',
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
		'UpdateAvailable1' : 'Es gibt ein Update für ArdMalang Script',
		'UpdateAvailable2' : 'Update jetzt herunterladen?',
		'UpdateHomepage' : 'Zur Webseite',
		'UpdateInstall' : 'Jetzt installieren',
		'UpdateTomorrow' : 'Morgen erinnern',
		'yearsOld' : '%s Jahre alt'
	},

	// Bulgarian - Contributed by Svetlozar Mladenoff (20090830)
	bg : {
		'_language' : 'Bulgarian',
		'AddToCalendar' : '???????? ??? ????????',
		'AddToGoogleCalendar' : '???????? ??? Google Calendar',
		'all' : '??????',
		'All' : '??????',
		'AllPhotosLoaded' : '?????? ?????? ?? ????????',
		'Automatic' : '???????????',
		'Birthday' : '???????? ??? ?? %s',
		'CreatingFile' : '????????? ?? ????',
		'Close' : '?????????',
		'ConfigureFacebookArdMalang' : '????????????? ?? ArdMalang Script',
		'ConfigureInstructions' : '?????? ??????? ?? ??????????? ???????, ?? ????? ???? ?? ?? ????????? ????? ??? ???? ???????? ??????.',
		'ConfAge' : '????????? ?? ????????? (??? ????????????? ?? ??????????? ????? ??????? ????).',
		'ConfAutoBigAlbumPictures' : '??????????? ????????? ?? ??-?????? ?????? ?? ????????, ?????? ?????????? ?? ??????.',
		'ConfAutoLoadFullAlbum' : '??????????? ????????? ?? ??????? ?? ?????? ??????? ? ?????, ???????? ?? ?? ???? ????????.',
		'ConfAutoLoadTaggedPhotos' : '??????????? ????????? ?? ??????? ?? ?????? ??????? ??????, ???????? ?? ?? ???? ???????? (????? ?????? ?? ???????).',
		'ConfBigAlbumPictures' : '???????? ?? ?????? ?? ?????????? ? ?????? ?? ????????? ?? ????????? ?????? ?? ?????? ??????, ???????????? ?? ???? ????????.',
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
		'ConfFacebookArdMalangLanguage' : '???? ?? ArdMalang Script',
		'ConfGoogleApps' : '????????? ?? Google Calendar ??????, ?????????? ? Google Apps.',
		'ConfGoogleAppsDomain' : '??????',
		'ConfGoogleCalendar' : '???????? ?? ?????? ?? ????????? ?? ??????? ??? ? ??????? ? <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : '???? ?? <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHomeFindFriends' : '????????? ?? ???????? ?? ? ???????? ????????.',
		'ConfHomeLeftAlign' : '???? ???????????? ?? ???????????? ?? ???????? ????????.',
		'ConfHomePeopleYouMayKnow' : '????????? ?? ?????? ???????????.',
		'ConfHomePokes' : '????????? ?? ???????? ?? ??????????.',
		'ConfHomeRightColumn' : '????????? ?? ??????? ??????.',
		'ConfiCalendar' : '???????? ?? ?????? ?? ????????? ?? <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-???? ? ?????? ??????? ???.',
		'ConfShortcutList' : '<b>????? ??????</b> (??????/????? ????????????):<br /><br /><i>?? ??? ?? ? ????????:</i><br />&nbsp;<b>A</b> - ??????/??????<br />&nbsp;<b>B</b> - ???????????? ?? ?????? ???????? ?? ?????<br />&nbsp;<b>C</b> - ????????????? ?? ArdMalang Script<br />&nbsp;<b>F</b> - ????????<br />&nbsp;<b>H</b> - ?????? ????????<br />&nbsp;<b>I</b> - ??????? ?????<br />&nbsp;<b>L</b> - ???????????/??????????? ?? ArdMalang Script ?? ????????? ?? ??????? ?? ??????????<br />&nbsp;<b>N</b> - ????????<br />&nbsp;<b>P</b> - ??????<br />&nbsp;<b>T</b> - ?????? ?? ?????????? ?????<br />&nbsp;<b>&lt;escape&gt;</b> - ????????? ?? ????????? ????????, ???????? ?? ArdMalang Script<br /><br /><i>?? ?????????? ????????</i>:<br />&nbsp;<b>f</b> or <b>l</b> - ?????? ?? ????<br />&nbsp;<b>i</b> - ??????????<br />&nbsp;<b>n</b> - ??????<br />&nbsp;<b>p</b> - ??????<br />&nbsp;<b>s</b> ??? <b>u</b> - ??????? ? ???????<br /><br /><i>?? ?????????</i>:<br />&nbsp;<b>i</b> - ????<br />&nbsp;<b>p</b> - ??????<br />&nbsp;<b>w</b> - ?????<br />&nbsp;<b>x</b> - ?????<br /><br /><i>?? ???????? ? ????????? (????????, ???????? ? ?.?.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - ????????<br />&nbsp;<b>&lt;right arrow&gt;</b> - ????????<br />&nbsp;<b>&lt;Shift&gt; + &lt;left arrow&gt;</b> - ????? (?????? ? ????????)<br />&nbsp;<b>&lt;Shift&gt; + &lt;right arrow&gt;</b> - ???????? (?????? ? ????????)<br /><br /><i>??? ??????????? ?? ??????/??????:</i><br />&nbsp;<b>a</b> - ????????? ?? ?????? ??????? (?????? ? ????????)<br />&nbsp;<b>b</b> - ????????? ?? ?????? ??????<br />&nbsp;<b>c</b> - ??????? ?? ???????????<br />&nbsp;<b>k</b> - ????? ??? ??????<br />&nbsp;<b>m</b> - ?????? ?? (?????) ? ???<br /><br /><i>??? ??????????? ?? ???????? ?????? ? ??????/??????? ??????:</i><br />&nbsp;<b>a</b> ??? &nbsp;<b>r</b> - ???????? ??????<br />&nbsp;<b>m</b> ??? &nbsp;<b>u</b> - ???????? ?? ??????? ??????????<br />&nbsp;<b>o</b> - ?????? ? ???<br />&nbsp;<b>p</b> - ??? ??????<br />&nbsp;<b>t</b> ??? &nbsp;<b>f</b> - ??????? ????????',
		'ConfNewTabSearch' : '??????????? ?? ???????? ?? ?? ??????? ? ??? ???/????????, ?????? ? ???????? Ctrl + Enter ??? ???????.',
		'ConfPageTitle' : '?????????? ?? "Facebook |" ?? ?????????? ?? ????? ????????.',
		'ConfPhotoPopup' : '????????? ?? ??-?????? ??????? ?? ???????? ??? ?????? ??????.',
		'ConfPopupAutoClose' : '??????????? ????????? ?? ??????????? ????????.',
		'ConfPopupPosition' : '??????? ?? ??????????? ????????',
		'ConfProfilePicPopup' : '????????? ?? ??-?????? ??????? ?? ?????????? ?????? ??? ?????? ??????',
		'ConfProtocolLinks' : '?????????? ?? ID-???? ?? ????????? ??? ??????, ????? ???????? ???????? (Google Talk, Windows Live ? ?.?.).',
		'ConfSecureLinks' : '???????????? ?? Facebook ???????? ?? ????? ?? HTTPS ????????.',
		'ConfShortcuts' : '??????????? ?? ????? ??????. (????? <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">???????</a>)',
		'ConfSign' : '????????? ??????? ?? ????????? (??? ? ???????? ??????? ????).',
		'ConfTopBarFixed' : '????????? ?? ??????? ???? ?? ??????, ???? ??? ??????????.',
		'ConfTopBarHoverOpacity' : '??? ?????? ??????',
		'ConfTopBarOpacity' : '??????????? ?? ??????? ????',
		'ConfUpdates' : '??????????? ?? Userscripts.org ????????? ?? ??????? ?? ArdMalang Script. ??? <a href="#" id="fbfUpdateLink" onclick="return false;">???????? ????</a>.',
		'DownloadVideo' : '???????? ?? ???????',
		'ExportICalendarFile' : '???????????? ? iCalendar-????',
		'ExportICalendarFileWarning' : '(???? ?? ?????? ?????, ??? ????? ????? ????????)',
		'fullAlbumLoaded' : '?????? ????? ? ???????',
		'Left' : '??????',
		'ListeningRestarted' : 'ArdMalang Script ?????????? ?????????? ?? ???????.',
		'ListeningStopped' : 'ArdMalang Script ???? ?????????? ?? ???????.\n????????? L (Shift + l) ?? ???????? ???????',
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
		'UpdateAvailable1' : '??????? ? ?????????? ?? ArdMalang Script',
		'UpdateAvailable2' : '??????? ?? ?? ???????? ?????',
		'UpdateHomepage' : '??? ???????? ????????',
		'UpdateInstall' : '??????????? ????',
		'UpdateTomorrow' : '????????? ????',
		'yearsOld' : '?? %s ??????'
	},

	// Greek - Contributed by Dimitris DoSMaN Sarlis (20101024)
	el : {
		'_language' : 'Greek',
		'AddToCalendar' : '???s???? st? ?µe???????',
		'AddToGoogleCalendar' : '???s???? st? ?µe??????? t?? Google',
		'all' : '??a',
		'All' : '??a',
		'AllPhotosLoaded' : '??e? ?? f?t???af?e? f??t????a?',
		'Automatic' : '??t?µata',
		'Birthday' : 'Ge??????a %s',
		'BookmarkAdd' : '???s???? ???? ??ap?µ????',
		'BookmarkExists' : '?p???e? ?d? a?ap?µ??? ??a a?t?? t?? se??da.\n\n???a??te st?? se??da p?? ???ete ?a p??s??sete ?a? d???µ?ste ?a??.',
		'BookmarkNamePrompt' : '??ste ??a ???µa ??a a?t? t? a?ap?µ???:\n%s',
		'BookmarksConfirmRemoval' : '??ste s??????? ?t? ???ete ?a afa???sete ta pa?a??t? a?ap?µ??a;',
		'BookmarksManage' : '??a?e???s? ??ap?µ????',
		'BookmarksRemoveSelected' : '?fa??es? ?p??e?µ???? ??ap?µ????',
		'Bookmarks' : '??ap?µ??a',
		'BrowserUnsupported' : '? pe?????t?? sa? de? ?p?st????e? a?t?? t?? d??at?t?ta.',
		'CreatingFile' : '??µ??????a ???e???',
		'Close' : '??e?s?µ?',
		'ConfigureFacebookArdMalang' : '??aµ??f?s? ArdMalang Script',
		'ConfigureInstructions' : '??e? ?? a??a??? ap????e???ta? ?µesa, a??? ??p??e? a??a??? µp??e? ?a µ?? efa?µ?st??? se ?a?t??e? p?? e??a? ?d? a????t??.',
		'ConfAge' : '?µf???s? t?? ?????a? at?µ?? st? p??f?? t??? (µ??? ef?s?? ????? d???se? t?? p????? ?µe??µ???a).',
		'ConfApplicationWhitelist' : '??sta ?p?t?ept?? ?fa?µ???? - ??s??ete ta IDs ap? t?? efa?µ???? p?? ???ete ?a eµfa?????ta?. ??a????ste ta IDs µe ?e??.',
		'ConfAutoBigAlbumPictures' : '??t?µat? eµf???s? µe????? e?????? ??µp??µ ?ta? ? se??da a????e?.',
		'ConfAutoLoadFullAlbum' : '??t?µat? f??t?s? µ??????af??? ??a ??e? t?? e????e? t?? ??µp??µ se µ?a se??da.',
		'ConfAutoLoadTaggedPhotos' : '??t?µat? f??t?s? µ??????af??? ??a ??e? t?? "s?µadeµ??e?" f?t???af?e? se µ?a se??da (st?? ?a?t??a f?t???af???, st? p??f?? t?? a????p??).',
		'ConfAutoReadMore' : '??t?µat? ???? st? s??desµ? "d?aß?ste pe??ss?te?a"',
		'ConfBigAlbumPictures' : '???s???? s??d?sµ?? st?? se??de? t?? ??µp??µ, ??a eµf???s? µe?a??te??? e?d???? ???? t?? e?????? st?? s???e???µ??? se??da.',
		'ConfBigAlbumPicturesBorder' : '???s???? e??? p?a?s??? ???? ap? t?? µe???e? e?d?se?? t?? e??????.',
		'ConfBookmarks' : '???s???? e??? ?p?µe??? ??ap?µ???? st?? p??? µp??a.',
		'ConfBottomBarHoverOpacity' : '?at? t? p??asµa t?? p??t?????',
		'ConfBottomBarOpacity' : '??af??e?a t?? ??t? ??aµµ?? µe???.',
		'ConfCalendarBirthDate' : '?a s?µpe????f?e? ? ?µe??µ???a ?????s?? t?? at?µ?? st?? ?ept?µ???e? ?e????t??.',
		'ConfCalendarFullName' : '???s? t?? p???e? ???µat?? t?? at?µ?? sa? t?t?? ?e?e????? (a?t? ??a µ??? t? ???µa).',
		'ConfChatDifferentiate' : '???s? ??t???? ?a? p?a???? ??aµµ?t?? ??a d?af???p???s? µeta?? d?a??s?µ?? ?a? ad?a??? f????.',
		'ConfChatHideIdle' : '?p?????? ad?a??? f????.',
		'ConfDelayPopupPics' : '??aµ??? 0.5 de?te????pt?? p??? t?? eµf???s? a?ad??µe??? e??????.',
		'ConfDelayPopupPicsTimeout' : '??????a??st???s? p??? t?? eµf???s? t?? a?ad??µe??? e??????, se ?????st? t?? de?te????pt?? (p??ep?????=500):',
		'ConfDownloadVideo' : '???s???? s??d?sµ?? ??a ???? ß??te? ap? t?? se??de? ß??te?. (?p??e? ?a ??e?aste?te t? <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '??t?µat? epa?af??t?s? se??d?? efa?µ???? µe sf??µata, µet? ap? 5 de?te???epta.',
		'ConfExport' : 'G?a ?a e???ete t?? ???µ?se?? sa?, a?t?????te t? ?e?µe?? pa?a??t? ?a? s?ste t? se a??e??.',
		'ConfExternalPopup' : '???d?s? p?a?µat???? µe?????? ??a e??te????? e????e?. <sup>????µast???</sup>',
		'ConfFacebookArdMalangLanguage' : 'G??ssa ??a t? ArdMalang Script',
		'ConfFacebookTimestamps' : '?µf???s? t?? ??a? t?? Facebook (p?. "???? 3 ??e?").',
		'ConfFBFTimestamps' : '???s???? t?? ??a? t?? ArdMalang Script µet? ap? t?? ??a t?? Facebook (p?. "11:45").',
		'ConfFBFTimestamps24' : '?µf???s? t?? ??a? t?? ArdMalang Script se 24-??? µ??f?.',
		'ConfFriendRequestCountInTitle' : '?µf???s? t?? a???µ?? t?? p??s???se?? f???? st?? t?t?? t?? se??da?.',
		'ConfGoogleApps' : '??µ??????a ?µe???????? Google, s?µßat? µe ?fa?µ???? Google.',
		'ConfGoogleAppsDomain' : '??µ?a?:',
		'ConfGoogleCalendar' : '???s???? s??d?sµ?? ??a p??s?es? ?e??e????? ?a? ?e????t?? st? <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">?µe??????? Google</a>.',
		'ConfGoogleLanguage' : 'G??ssa ??a <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">?etaf?ast? Google</a>',
		'ConfHideApplicationStories' : '?p?????? ?st????? efa?µ????.',
		'ConfHideEgos' : '?p?????? ???? t?? t?µ??? "e??" (?a p??pe? ?a ???ße? t?? pe??ss?te?e? p??t?se?? t?? Facebook).',
		'ConfHideEventStories' : '?p?????? ?st????? e?d???se??.',
		'ConfHideFacebookCountInTitle' : '?p?????? t?? µet??t? ???? e?se???µ???? µ???µ?t?? t?? Facebook.',
		'ConfHideFriendStories' : '?p?????? ?st????? f????.',
		'ConfHideGroupStories' : '?p?????? ?st????? ?µ?d??.',
		'ConfHideHovercards' : '?p?????? a?ad??µe??? ?a?t?? (? ???ta p?? eµfa???eta? ?ta? pe???e? t? p??t??? p??? ap? ??p??? ???µa).',
		'ConfHideLikeStories' : '?p?????? t?? ?st????? "µ?? a??se?".',
		'ConfHideLinkStories' : '?p?????? ?st????? s??d?sµ??.',
		'ConfHideNoteStories' : '?p?????? t?? ?st????? s?µe??se??.',
		'ConfHidePhotoStories' : '?p?????? ?st????? f?t???af???.',
		'ConfHidePlaceStories' : '?p?????? ?st????? t?p??.',
		'ConfHideProfilePicStories' : '?p?????? ?st????? e????a? p??f??.',
		'ConfHideRead' : '?p?????? a?t??e?µ???? ap? t?? t??f?d?s?a ???? p?? ????? s?µe???e? sa? d?aßasµ??a.',
		'ConfHideRelationshipStories' : '?p?????? ?st????? f???a?.',
		'ConfHideStatusStories' : '?p?????? ?st????? ?at?stas??.',
		'ConfHideVideoStories' : '?p?????? ?st????? ???te?.',
		'ConfHideWallStories' : '?p?????? ?st????? t?????.',
		'ConfHomeBeta' : '?µf???s? t?? t?µ?a ????µast???? ??d?s?? t?? Facebook.',
		'ConfHomeChat' : '?µf???s? t?? t?µ?a S???µ???a?.',
		'ConfHomeChatNames' : '?µf???s? ???µ?t?? st?? t?µ?a S???µ???a?.',
		'ConfHomeEvents' : '?µf???s? t?? ?at?????a? e?d???se??.',
		'ConfHomeFindFriends' : '?µf???s? t?? t?µ?a "S??de?e?te µe f?????".',
		'ConfHomeLeftAlign' : '???ste?? st????s? t?? pe??e??µ???? t?? a?????? se??da?.',
		'ConfHomeLeftColumn' : '?µf???s? t?? a??ste??? st????.',
		'ConfHomeLeftColumnFixed' : '????µa a??ste??? st????, a??µa ?a? a? µeta????ste p??? ta ??t?.',
		'ConfHomeLink' : '?µf???s? t?? s??d?sµ?? t?? ??????? Se??da? st?? p??? µp??a.',
		'ConfHomeNavigation' : '?µf???s? t?? t?µ?a ??????s??.',
		'ConfHomePokes' : '?µf???s? t?? s????t??µ?t??.',
		'ConfHomeProfile' : '?µf???s? t?? t?µ?a ???f??.',
		'ConfHomeRecommendations' : '?µf???s? p??t?se?? (?t?µa p?? ?s?? ??????e??, ???te???µe?e? Se??de? ??p).',
		'ConfHomeRequests' : '?µf???s? t?? ?at?????a? ??t?µ?t??.',
		'ConfHomeRightColumn' : '?µf???s? t?? de???? tµ?µat??.',
		'ConfHomeStretch' : '?????µa t?? a?????? se??da? µe ß?s? t? p??t?? t?? pa?a????? t?? pe?????t?.',
		'ConfHomeStretchComments' : '?????µa t?? p??t??? t?? s?????? st?? a????? se??da.',
		'ConfiCalendar' : '???s???? s??d?sµ?? ??a ???? a??e??? <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> µe ??a ta ?e??????a.',
		'ConfImport' : 'G?a ?a e?s??ete t?? ???µ?se?? sa? a???te?a, a?t??atast?ste t? ?e?µe?? p?? ap????e?sate p??????µ???? ?a? pat?ste st? ???µp? "??sa????".',
		'ConfInboxCountInTitle' : '?µf???s? t?? p?????? t?? ad??ßast?? µ???µ?t?? sta e?se???µe?a st?? t?t?? t?? se??da?.',
		'ConfLogoutLink' : '???s???? e??? s??d?sµ?? ??a ap?s??des? st?? p??? µp??a.',
		'ConfNotificationCountInTitle' : '?µf???s? t?? ???? e?d?p???se?? st?? t?t?? t?? se??da?.',
		'ConfNewTabSearch' : '?????µa a?a??t?s?? se ?a???????a ?a?t??a ? pa?????? ?ta? p???ete t? CTRL + Enter ??a a?a??t?s?.',
		'ConfPageTitle' : '?fa??es? t?? "Facebook |" ap? t?? t?t?? t?? ???e se??da?.',
		'ConfPhotoPopup' : '?µf???s? a?ad??µe??? f?t???af??? se p?a?µat??? µ??e??? ?at? t? p??asµa t?? p??t?????.',
		'ConfPopupAutoClose' : '??e?s?µ? a?ad??µe??? f?t???af??? a?t?µata.',
		'ConfPopupSmartAutoClose' : '?p?t??p? ??e?s?µat?? a?ad??µe??? f?t???af??? e?? t? p??t??? e??a? p??? t???.',
		'ConfPopupPosition' : 'T?s? a?ad??µe??? f?t???af???',
		'ConfPopupWhileTagging' : '?µf???s? a?ad??µe??? e?????? a??µa ?a? st?? p??s???? et???ta?.',
		'ConfProcessInterval' : '???st?µa p?? apa?te?ta? ??a ?a f??t?se? ? se??da, se ?????st? t?? de?te????pt??. (p??ep?????=1000):',
		'ConfProfileLink' : '?µf???s? t?? s??d?sµ?? ???f?? st?? p??? µp??a.',
		'ConfProfilePicPopup' : '?µf???s? a?ad??µe??? f?t???af??? p??f?? se p?a?µat??? µ??e??? ?at? t? p??asµa t?? p??t?????',
		'ConfProtocolLinks' : '?etat??p? t?? Messenger IDs t?? p??f?? se s??d?sµ??? ?p?? µp??e? ?a ?e????se? s???t?s? µe a?t??? (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'S?et??? µe t? ArdMalang Script',
		'ConfSectionAdvanced' : 'G?a p??????µ?????',
		'ConfSectionEvents' : 'Ge??????a/??d???se??',
		'ConfSectionImportExport' : '??sa????/??a????',
		'ConfSectionFeeds' : '???f?d?s?e?',
		'ConfSectionHomePage' : '?????? Se??da',
		'ConfSectionLiveFeed' : '?e?e?ta?a ??a',
		'ConfSectionMenu' : '?e???/S???µ???a',
		'ConfSectionOther' : '???e? ?p??????',
		'ConfSectionPageTitle' : '??t??? Se??da?',
		'ConfSectionPictures' : '?????e?',
		'ConfSectionShortcuts' : 'S??t?µe?se?? ????t????????',
		'ConfSecureLinks' : '??a????ase t??? s??d?sµ??? t?? Facebook ?a de?????? se asfa?e?? (HTTPS) se??de?.',
		'ConfShortcutList' : '<b>S??t?µe?se?? ????t????????</b> (e?a?s??s?a ?a?a?t????):<br /><br /><i>?p? ?p??ad?p?te se??da:</i><br /> <b>A</b> - ??µp??µ/F?t???af?e?<br /> <b>B</b> - ?µf???s?/?p?????? ??sta f???? (d?a??s?µ?? f????)<br /> <b>C</b> - ?p?????? ArdMalang Script<br /> <b>F</b> - F????<br /> <b>H</b> - ?????? Se??da<br /> <b>I</b> - ??se???µe?a<br /> <b>K</b> - ???s???? ??ap?µ????<br /> <b>L</b> - ?p????? t?? s??d?sµ?? ap?s??des?? (pat?ste t? Enter aµ?s?? µet? ??a ?a ap?s??de?e?te)<br /> <b>N</b> - ??d?p???se??<br /> <b>P</b> - ?? p??f?? sa?<br /> <b>T</b> - ?et?f?as? ep??e?µ???? ?e?µ????<br /> <b><escape></b> - ??e?s?µ? a?ad??µe??? d?µ??????µ??a ap? t? ArdMalang Script<br /><br /><i>?p? t?? a????? se??da</i>:<br /> <b>f</b> ? <b>l</b> - ???ta??? t??f?d?t?se??<br /> <b>i</b> - ??µ?s?e?µ??a st???e?a<br /> <b>n</b> - ???f?d?t?s? ????<br /> <b>p</b> - F?t???af?e?<br /> <b>s</b> ? <b>u</b> - ??a?e?se?? ?at?stas??<br /><br /><i>?p? p??f??</i>:<br /> <b>i</b> - ?????f???e?<br /> <b>p</b> - F?t???af?e?<br /> <b>w</b> - ??????<br /> <b>x</b> - ??a?s?a<br /><br /><i>?p? se??de? µe p?????s? (p??????µe??, ep?µe??, ?.?.)</i><br /> <b><a??ste?? ße????></b> - ???????µe??<br /> <b><de?? ße????></b> - ?p?µe??<br /> <b><shift> + <a??ste?? ße????></b> - ?????? (?ta? e??a? d?a??s?µ?)<br /> <b><shift> + <de?? ße????></b> - ?e?e?ta?a (?ta? e??a? d?a??s?µ?)<br /><br /><i>?at? t?? p??ß??? ??µp??µ/f?t???af?e?:</i><br /> <b>a</b> - F??t?s? ???? t?? µ??????af??? (?ta? e??a? d?a??s?µ?)<br /> <b>b</b> - ?µf???s? µe?a??te??? f?t???af???<br /> <b>c</b> - ?µf???s? pa?at???se??<br /> <b>k</b> - ?p?st??f? st? ??µp??µ<br /> <b>m</b> - F?t???af?e? ap? (?t?µ?) ?a? eµ??a<br /><br /><i>?at? t?? d????e?a p??sfat?? ??µp??µ ?a? a?eßasµ????/s?µe??µ???? f?t???af???:</i><br /> <b>a</b> ?  <b>r</b> - ???sfata ??µp??µ<br /> <b>m</b> ?  <b>u</b> - ??eßasµ??a ap? ????t?<br /> <b>o</b> - F?t???af?e? µe µ??a<br /> <b>p</b> - ?? f?t???af?e? µ??<br /> <b>t</b> ?  <b>f</b> - S?µe??µ???? f????',
		'ConfShortcuts' : '??e???p???s? s??t?µe?se?? p???t????????.',
		'ConfSign' : '?µf???s? t?? ??d??? t?? at?µ?? st? p??f?? t?? (ef?s?? ??e? d?se? t?? p????? ?µe??µ???a ?????s??).',
		'ConfTopBarFixed' : '????µa µp??a? µe???, a??µa ?a? a? ? se??da ????e? p??? ta ??t?.',
		'ConfTopBarHoverOpacity' : '?at? t? p??asµa t?? p??t?????',
		'ConfTopBarOpacity' : '??af??e?a µp??a? µe??? ????f??',
		'ConfUpdates' : '??e???? Userscripts.org ?a??µe???? ??a ?a???????e? e??µe??se?? t?? ArdMalang Script ? <a href="#" id="fbfUpdateLink" onclick="return false;">??e???? t??a</a>.',
		'DownloadVideo' : '???? ???te?',
		'ExportICalendarFile' : '??a???? a??e??? iCalendar',
		'ExportICalendarFileWarning' : '(??t? ?a p??e? a??et? ??a a? ??ete p?????? f?????)',
		'FacebookArdMalangConflict' : '?? FacebookArdMalang e??a? p???? ???st? sa? ArdMalang Script. ???? t?? a??a??? t?? ???µat?? ?a p??pe? ?a ape??atast?sete ?e???????ta t? ArdMalang Script ap? t?? pe?????t? sa?, d?af??et??? ta d?? p?????µµata ?a s????????ta? µeta?? t???. ??? de? e?saste s??????? ??a t? p?? ?a ape??atast?sete ??a p????aµµa userscript, <a %s>pat?ste ed? ??a ?d???e?</a>.',
		'fullAlbumLoaded' : '? f??t?s? t?? ??µp??µ ???????????e',
		'Import' : '??sa????',
		'ImportConfirm' : '??ste s??????? ?t? ???ete ?a e?s??ete a?t?? t?? ???µ?se??;\n?? t?????se? ???µ?se?? ?a ?a????.',
		'ImportFailure' : '???????e sf??µa ?at? t?? e?sa???? t?? ???µ?se??.',
		'ImportSuccess' : '? e?sa???? ???????????e. T??ete ?a a?a?e?sete t?? se??da;',
		'Left' : '???ste??',
		'LoadingAllPhotos' : 'F??t?s? ???? t?? f?t???af???...',
		'loadingFullAlbum' : 'F??t?s? ???? t?? ??µp??µ...',
		'LoadingPic' : 'F??t?s? e????a?...',
		'LoadPhotosWarning' : '? f??t?s? ???? t?? f?t???af??? µp??e? ?a p??e? a??et? ??a',
		'Months' : new Array('?a????????','Feß????????','???t???','?p??????','?????','???????','???????','?????st??','Sept?µß????','??t?ß????','???µß????','?e??µß????'),
		'ProtocolSkype' : '???s? %s µ?s? Skype',
		'ProtocolMSN' : 'S???t?s? µe %s µ?s? Windows Live',
		'ProtocolYahoo' : 'S???t?s? µe %s µ?s? Yahoo Messenger',
		'ProtocolGoogle' : 'S???t?s? µe %s µ?s? Google Talk',
		'ReloadErrorPage' : '?at?ste ??a d???µ? ?a?? ? pe??µ??ete 5 de?te???epta',
		'Refresh' : '??a???s?',
		'Remove' : '?fa??es?',
		'Right' : '?e???',
		'ShowBigPictures' : '?µf???s? µe?a??te??? e??????',
		'Signs' : new Array('?????e???','?d??????','???e??','?????','?a????','??d?µ??','?a??????','????','?a??????','?????','S???p???','????t??'),
		'today' : 's?µe?a',
		'Translators' : '?etaf?ast??',
		'UpdateAvailable1' : '?p???e? ?a???????a d?a??s?µ? ??d?s? t?? ArdMalang Script',
		'UpdateAvailable2' : 'T??ete ?a t?? e??µe??sete t??a;',
		'UpdateHomepage' : '?p?st??f? st?? ?????? Se??da',
		'UpdateInstall' : '???at?stas? t??a',
		'UpdateTomorrow' : '?pe???µ?s? a????',
		'yearsOld' : '%s ??????'
	},

	// Slovak - Contributed by Peter Miksik (20101028)
	sk : {
		'_language' : 'Slovak',
		'AddToCalendar' : 'Pridat do Kalendára',
		'AddToGoogleCalendar' : 'Pridat do Kalendára Google',
		'all' : 'všetko',
		'All' : 'Všetko',
		'AllPhotosLoaded' : 'Všetky fotografie nacítané',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narodeniny %s',
		'BookmarkAdd' : 'Pridat novú záložku',
		'BookmarkExists' : 'Táto stránka už je v záložkách.\n\nPrejdite na stránku, ktorú chcete pridat medzi záložky a skúste to znova.',
		'BookmarkNamePrompt' : 'Zadajte názov tejto záložky:\n%s',
		'BookmarksConfirmRemoval' : 'Naozaj chcete odstránit nasledujúce záložky?',
		'BookmarksManage' : 'Spravovat záložky',
		'BookmarksRemoveSelected' : 'Odstránit vybrané záložky',
		'Bookmarks' : 'Záložky',
		'BrowserUnsupported' : 'Váš prehliadac túto funkciu nepodporuje.',
		'CreatingFile' : 'Vytvorenie súboru',
		'Close' : 'Zavriet',
		'ConfigureFacebookArdMalang' : 'Konfigurovat ArdMalang Script',
		'ConfigureInstructions' : 'Všetky zmeny sú ukladané okamžite, ale niektoré zmeny sa nemusia prejavit na kartách, ktoré sú už otvorené.',
		'ConfAge' : 'Zobrazit vek ludí v ich profiloch (ak poskytli celý dátum narodenia)',
		'ConfApplicationWhitelist' : 'Zoznam povolených aplikácií – zadajte ID aplikácií, ktoré chránit pred skrytím. ID oddelte medzerou.',
		'ConfAutoBigAlbumPictures' : 'Automaticky pri otvorení stránky zobrazit väcšie obrázky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky nacítat miniatúry všetkých obrázkov v albume na jednej stránke',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky nacítat miniatúry všetkých fotografií s menovkou na jednej stránke (karta Fotky v profiloch ludí)',
		'ConfAutoReadMore' : 'Automaticky kliknút na odkazy "cítat dalej"',
		'ConfBigAlbumPictures' : 'Pridat odkaz na stránkach albumu na zobrazenie väcších verzií všetkých obrázkov na tejto stránke',
		'ConfBigAlbumPicturesBorder' : 'Pridat rámcek okolo väcších verzií obrázkov',
		'ConfBookmarks' : 'Pridat na panel vrchnej ponuky podponuku Záložky',
		'ConfBottomBarHoverOpacity' : 'Pri ukázaní myšou',
		'ConfBottomBarOpacity' : 'Priehladnost spodného panela s ponukou',
		'ConfCalendarBirthDate' : 'Zahrnút narodeniny osoby do podrobností udalosti',
		'ConfCalendarFullName' : 'Použit celé meno osoby ako názov narodenín (namiesto krstného mena)',
		'ConfChatDifferentiate' : 'Použit tucné písmo a kurzívu na rozlíšenie pripojených a necinných priatelov',
		'ConfChatHideIdle' : 'Skryt necinných priatelov',
		'ConfDelayPopupPics' : 'Pockat 0,5 sekundy pred nacítaním obrázkov v kontextovom okne',
		'ConfDelayPopupPicsTimeout' : 'Oneskorenie pred zobrazením obrázkov v kontextovom okne, v milisekundách (predvolené=500):',
		'ConfDownloadVideo' : 'Pridat odkaz na prevzatie videí zo stránok s videom (možno budete potrebovat <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">prehrávac FLV</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundách znova nacítat chybové stránky aplikácií',
		'ConfExport' : 'Ak chcete exportovat nastavenia, skopírujte dole uvedený text a uložte ho do súboru.',
		'ConfExternalPopup' : 'Externé obrázky plnej velkosti v kontextovom okne <sup>beta</sup>',
		'ConfFacebookArdMalangLanguage' : 'Jazyk pre Facebook ArdMalang',
		'ConfFacebookTimestamps' : 'Zobrazit casové znacky Facebooku (t. j. "pred 3 hodinami")',
		'ConfFBFTimestamps' : 'Pridat casové znacky skriptu Facebook ArdMalang za casové znacky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'Zobrazit casové znacky skriptu Facebook ArdMalang v 24-hodinovom formáte',
		'ConfFriendRequestCountInTitle' : 'Zobrazit v názve stránky pocet nových žiadostí o priatelstvo',
		'ConfGoogleApps' : 'Vytvorit odkazy pre Google Calendar kompatibilné s Google Apps',
		'ConfGoogleAppsDomain' : 'Doména',
		'ConfGoogleCalendar' : 'Pridat odkazy na zaradenie narodenín a udalostí do aplikácie <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pre <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Skryt príspevky o aplikáciách',
		'ConfHideEgos' : 'Skryt všetky sekcie "ego" (malo by skryt väcšinu odporúcaní Facebooku)',
		'ConfHideEventStories' : 'Skryt príspevky o udalostiach',
		'ConfHideFacebookCountInTitle' : 'Skryt pocet nových správ na Facebooku',
		'ConfHideFriendStories' : 'Skryt príspevky o priateloch',
		'ConfHideGroupStories' : 'Skryt príspevky o skupinách',
		'ConfHideHovercards' : 'Skryt kontextové okná zobrazujúce sa po ukázaní myšou na mená)',
		'ConfHideLikeStories' : 'Skryt príspevky "Páci sa mi to"',
		'ConfHideLinkStories' : 'Skryt príspevky o odkazoch',
		'ConfHideNoteStories' : 'Skryt príspevky o poznámkach',
		'ConfHidePhotoStories' : 'Skryt príspevky o fotkách',
		'ConfHidePlaceStories' : 'Skryt príspevky o miestach',
		'ConfHideProfilePicStories' : 'Skryt príspevky o profilových fotkách',
		'ConfHideRead' : 'Skryt položky, ktoré boli oznacené ako precítané',
		'ConfHideRelationshipStories' : 'Skryt príspevky o stave vztahu',
		'ConfHideStatusStories' : 'Skryt príspevky o statuse',
		'ConfHideVideoStories' : 'Skryt príspevky o videách',
		'ConfHideWallStories' : 'Skryt príspevky o nástenkách',
		'ConfHomeBeta' : 'Zobrazit cast Beta Tester',
		'ConfHomeChat' : 'Zobrazit cast Chat',
		'ConfHomeChatNames' : 'Zobrazit mená v casti Chat',
		'ConfHomeEvents' : 'Zobrazit cast Udalosti',
		'ConfHomeFindFriends' : 'Zobrazit cast Spojte sa s priatelmi',
		'ConfHomeLeftAlign' : 'Zarovnat obsah úvodnej stránky nalavo',
		'ConfHomeLeftColumn' : 'Zobrazit lavý stlpec',
		'ConfHomeLeftColumnFixed' : 'Nechat lavý stlpec viditelný aj pri posúvaní nadol',
		'ConfHomeLink' : 'Zobrazit vo vrchnej ponuke odkaz na úvodnú stránku',
		'ConfHomeNavigation' : 'Zobrazit cast Navigácia',
		'ConfHomePokes' : 'Zobrazit cast Štuchnutia',
		'ConfHomeProfile' : 'Zobrazit cast Profil',
		'ConfHomeRecommendations' : 'Zobrazit odporúcania (Ludia, ktorých poznáte; Odporúcané stránky atd.)',
		'ConfHomeRequests' : 'Zobrazit cast Žiadosti',
		'ConfHomeRightColumn' : 'Zobrazit pravý stlpec',
		'ConfHomeStretch' : 'Roztiahnut úvodnú stránku na šírku okna prehladávaca',
		'ConfHomeStretchComments' : 'Roztiahnut komentáre na hlavnej stránke',
		'ConfiCalendar' : 'Pridat odkazy na prevzatie súboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> so všetkými narodeninami',
		'ConfImport' : 'Ak chcete neskôr importovat nastavenia, prepíšte dole uvedený text tým, ktorý ste predtým uložili, a kliknite na "Import".',
		'ConfInboxCountInTitle' : 'Zobrazit v názve stránky pocet neprecítaných prijatých správ',
		'ConfLogoutLink' : 'Pridat do vrchnej ponuky odkaz na odhlásenie',
		'ConfNotificationCountInTitle' : 'Zobrazit v názve stránky pocet nových upozornení',
		'ConfNewTabSearch' : 'Pri vyhladávaní otvorit stlacením Ctrl+Enter výsledky hladania na novej karte/v novom okne',
		'ConfPageTitle' : 'Odstránit "Facebook |" z názvu všetkých stránok',
		'ConfPhotoPopup' : 'Väcšie verzie fotiek v kontextovom okne po ukázaní myšou',
		'ConfPopupAutoClose' : 'Automaticky zatvárat kontextové okná s obrázkami',
		'ConfPopupSmartAutoClose' : 'Zabránit autom. zatvoreniu kontextových okien s obrázkom, ak je na nich kurzor myši',
		'ConfPopupPosition' : 'Umiestnenie kontextového okna s obrázkom',
		'ConfPopupWhileTagging' : 'Zobrazit kontextové okná s obrázkami aj pri oznacovaní',
		'ConfProcessInterval' : 'Interval spracovania stránky, v milisekundách (predvolené=1000):',
		'ConfProfileLink' : 'Zobrazit na vrchnom paneli s ponukou odkaz na profil',
		'ConfProfilePicPopup' : 'Väcšie verzie profilových fotiek v kontextovom okne po ukázaní myšou',
		'ConfProtocolLinks' : 'Zmenit ID pre okamžité správy na odkazy spúštajúce konverzáciu (Google Talk, Windows Live atd.)',
		'ConfSectionAbout' : 'Co je Facebook ArdMalang',
		'ConfSectionAdvanced' : 'Spresnenie',
		'ConfSectionEvents' : 'Narodeniny/Udalosti',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Novinky',
		'ConfSectionHomePage' : 'Úvodná stránka',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'Ponuky/Chat',
		'ConfSectionOther' : 'Dalšie možnosti',
		'ConfSectionPageTitle' : 'Názov stránky',
		'ConfSectionPictures' : 'Obrázky',
		'ConfSectionShortcuts' : 'Klávesové skratky',
		'ConfSecureLinks' : 'Vynútit zmenu odkazov Facebooku na stránky HTTPS',
		'ConfShortcutList' : '<b>Klávesové skratky</b> (rozlišujú sa malé/velké písmená):<br /><br /><i>Z lubovolnej stránky:</i><br /> <b>A</b> – Albumy/fotky<br /> <b>B</b> – Prepnút zoznam priatelov (online priatelia)<br /> <b>C</b> – Konfigurácia skriptu Facebook ArdMalang<br /> <b>D</b> – Narodeniny<br /> <b>E</b> – Udalosti<br /> <b>F</b> – Priatelia<br /> <b>H</b> – Domov<br /> <b>I</b> – Prijaté správy<br /> <b>L</b> – Vybrat odkaz Odhlásit sa (po odhlásení stlacte Enter)<br /> <b>N</b> – Upozornenia<br /> <b>P</b> – Váš profil<br /> <b>R</b> – Žiadosti<br /> <b>S</b> – Preskocit na pole Hladat<br /> <b>T</b> – Preložit vybraný text<br /> <b>?</b> – Zobrazit informácie o ladení skriptu Facebook ArdMalang<br /> <b><Esc></b> – Zavriet kontextové okná vytvorené skriptom Facebook ArdMalang<br /><br /><i>Zo stránky Domov (filtre)</i>:<br /> <b>a</b> – Stránky<br /> <b>f</b> – Aktuality<br /> <b>g</b> – Skupiny<br /> <b>l</b> – Odkazy<br /> <b>n</b> – Novinky<br /> <b>p</b> – Fotky<br /> <b>s</b> alebo <b>u</b> – Co robia ostatní<br /> <b>t</b> – Poznámky<br /> <b>v</b> – Videá<br /><br /><i>Z profilov</i>:<br /> <b>i</b> – Informácie<br /> <b>p</b> – Fotky<br /> <b>w</b> – Nástenka<br /> <b>x</b> – Priecinky<br /><br /><i>Zo stránok s navigáciou (dozadu, dopredu atd.)</i><br /> <b><šípka dolava></b> – Dozadu<br /> <b><šípka doprava></b> – Dopredu<br /> <b><shift> + <šípka dolava></b> – Prvá (ak je k dispozícii)<br /> <b><shift> + <šípka doprava></b> – Posledná (ak je k dispozícii)<br /><br /><i>Pocas prezerania albumov/fotiek:</i><br /> <b>a</b> – Nacítat všetky miniatúry (ak je k dispozícii)<br /> <b>b</b> – Zobrazit velké obrázky<br /> <b>c</b> – Zobrazit komentáre<br /> <b>k</b> – Spät na album<br /> <b>m</b> – Fotky osoby a mna<br /><br /><i>Pocas prezerania najnovších albumov a nahratých fotiek/fotiek s menovkou:</i><br /> <b>a</b> or  <b>r</b> – Najnovšie albumy<br /> <b>m</b> alebo  <b>u</b> – Nahraté z mobilu<br /> <b>o</b> – Fotky, na ktorých som ja<br /> <b>p</b> – Moje fotky<br /> <b>t</b> alebo  <b>f</b> Menovky priatelov',
		'ConfShortcuts' : 'Povolit klávesové skratky',
		'ConfSign' : 'Zobrazit znamenie ludí v ich profiloch (ak poskytli svoj dátum narodenia)',
		'ConfTopBarFixed' : 'Vždy zobrazit vrchný panel s ponukou aj pri posúvaní stránky nadol',
		'ConfTopBarHoverOpacity' : 'Pri ukázaní myšou',
		'ConfTopBarOpacity' : 'Priehladnost vrchného panela s ponukou',
		'ConfUpdates' : 'Denne na Userscripts.org overovat aktualizácie pre Facebook ArdMalang, prípadne <a href="#" id="fbfUpdateLink" onclick="return false;">skontrolovat teraz</a>.',
		'DownloadVideo' : 'Prevziat video',
		'ExportICalendarFile' : 'Exportovat súbor iCalendar',
		'ExportICalendarFileWarning' : '(Ak máte mnoho priatelov, môže to chvílu trvat.)',
		'FacebookArdMalangConflict' : 'Facebook ArdMalang sa odteraz nazýva ArdMalang Script.<br /><br />Pretože sa zmenil názov, je potrebné rucne odinštalovat Facebook ArdMalang z prehliadaca, inak budú v konflikte dva skripty medzi sebou navzájom.<br /><br />Ak neviete, ako skript odinštalovat, <a %s>kliknutím sem otvorte pokyny</a>.',
		'fullAlbumLoaded' : 'celý album nacítaný',
		'Import' : 'Import',
		'ImportConfirm' : 'Naozaj chcete importovat tieto nastavenia?\nVaše súcasné nastavenia budú stratené.',
		'ImportFailure' : 'Pocas pokusu o import nastavení došlo k chybe.',
		'ImportSuccess' : 'Import dokoncený. Chcete obnovit stránku?',
		'Left' : 'Vlavo',
		'LoadingAllPhotos' : 'Nacítavajú sa všetky fotky...',
		'loadingFullAlbum' : 'Nacítava sa celý album...',
		'LoadingPic' : 'Nacítava sa obrázok...',
		'LoadPhotosWarning' : 'Nacítavanie všetkých fotiek môže chvílu trvat',
		'Months' : new Array('Január','Február','Marec','Apríl','Máj','Jún','Júl','August','September','Október','November','December'),
		'ProtocolSkype' : 'Volat %s pomocou Skype',
		'ProtocolMSN' : 'Chatovat s %s pomocou Windows Live',
		'ProtocolYahoo' : 'Chatovat s %s pomocou Yahoo Messenger',
		'ProtocolGoogle' : 'Chatovat s %s pomocou Google Talk',
		'ReloadErrorPage' : 'Kliknite na Skúsit znova alebo pockajte 5 sekúnd',
		'Refresh' : 'Obnovit',
		'Remove' : 'Odstránit',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'Zobrazit velké obrázky',
		'Signs' : new Array('Kozorožec','Vodnár','Ryba','Baran','Býk','Blíženci','Rak','Lev','Panna','Váhy','Škorpión','Strelec'),
		'today' : 'dnes',
		'Translators' : 'Prekladatelia',
		'UpdateAvailable1' : 'K dispozícii je aktualizácia skriptu Facebook ArdMalang.',
		'UpdateAvailable2' : 'Chcete aktualizovat teraz?',
		'UpdateHomepage' : 'Prejst na dom. stránku',
		'UpdateInstall' : 'Nainštalovat',
		'UpdateTomorrow' : 'Pripomenút zajtra',
		'yearsOld' : '%s rokov'
	},

	// Dutch - Contributed by Larissa van Sunder (20091107)
	nl : {
		'_language' : 'Dutch',
		'AddToCalendar' : 'Toevoegen aan kalender',
		'AddToGoogleCalendar' : 'Toevoegen aan Google Calender',
		'all' : 'allemaal',
		'All' : 'Allemaal',
		'AllPhotosLoaded' : 'Alle fotos geladen',
		'Automatic' : 'Automatisch',
		'Birthday' : '%s\'s verjaardag',
		'CreatingFile' : 'Folder crëeren',
		'Close' : 'Sluit',
		'ConfigureFacebookArdMalang' : 'Configureer ArdMalang Script',
		'ConfigureInstructions' : 'Alle veranderingen worden onmiddelijk opgeslagen, maar sommige veranderingen zullen niet kunnen worden toegepast in vensters die al open zijn',
		'ConfAge' : 'Laat mensen hun leeftijd op hun profiel zien (wanneer zij hun volledige geboortedatum aangeven)',
		'ConfAutoBigAlbumPictures' : 'Laat automatisch grotere album foto\'s zien wanneer de pagina opent.',
		'ConfAutoLoadFullAlbum' : 'Laad automatisch miniaturen voor alle illustraties in een album op een enkele pagina.',
		'ConfAutoLoadTaggedPhotos' : 'Laad automatisch miniaturen voor alle getagde illustraties in een album op een enkele pagina (het foto\'s venster op mensen hun profiel.',
		'ConfAutoReadMore' : 'Klik automatisch op "lees meerdere" links.',
		'ConfBigAlbumPictures' : 'Link toevoegen op album pagina\'s om grotere versies van alle foto\'s op die pagina te laten zien.',
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
		'ConfExternalPopup' : 'Popup versies in volledige grootte van externe illustraties. <sup>experimenteel</sup>',
		'ConfFacebookArdMalangLanguage' : 'Taal voor ArdMalang Script',
		'ConfFacebookTimestamps' : 'Laat Facebook timestamps zien (bijv. "3 uur geleden").',
		'ConfFBFTimestamps' : 'ArdMalang Script timestamps toevoegen na Facebook timestamps (bijv. "11:45").',
		'ConfFBFTimestamps24' : 'Laat ArdMalang Script timestamps zien in 24-uurs formaat.',
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
		'ConfHomeFindFriends' : 'Laat de \'In contact komen met vrienden\' sectie zien.',
		'ConfHomeLeftAlign' : 'Links uitlijn de inhoud van de startpagina.',
		'ConfHomePeopleYouMayKnow' : 'Laat de Suggesties sectie zien.',
		'ConfHomePokes' : 'Laat de Porren sectie zien.',
		'ConfHomeRightColumn' : 'Laat de rechter kolom zien.',
		'ConfHomeStretch' : 'Stretch de startpagina naar de wijdte van het venster.',
		'ConfiCalendar' : 'Links toevoegen om een <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> folder met alle verjaardagen te downloaden.',
		'ConfInboxCountInTitle' : 'Laat het aantal ongelezen berichten in je inbox in de titelpagina zien.',
		'ConfNotificationCountInTitle' : 'Laat het aantal nieuwe noticicaties in de titelpagina zien.',
		'ConfNewTabSearch' : 'Open zoek resultaten in een nieuw venster/scherm wanneer CTRL + Enter om te zoeken wordt ingetoetst.',
		'ConfPageTitle' : 'Verwijder "Facebook |" van de titel van elke pagina.',
		'ConfPhotoPopup' : 'Grotere popup versies van foto\'s bij overscrollen.',
		'ConfPopupAutoClose' : 'Sluit popup foto\'s automatisch.',
		'ConfPopupPosition' : 'Positie voor popup foto\'s',
		'ConfProcessInterval' : 'Interval waarop de pagina moet worden verwerkt, in milliseconden (default=1000):',
		'ConfProfilePicPopup' : 'Grotere popup versies van profiel foto\'s bij overscrollen',
		'ConfProtocolLinks' : 'Verander messenger ID\'s van profielen in links die beginnen met een conversatie met hen (Google Talk, Windows Live etc).',
		'ConfSectionAdvanced' : 'Geavanceerd',
		'ConfSectionEvents' : 'Verjaardagen/Evenementen',
		'ConfSectionHomePage' : 'Startpagina',
		'ConfSectionLiveFeed' : 'Live Overzicht',
		'ConfSectionMenu' : 'Toepassingen/Chat',
		'ConfSectionOther' : 'Andere opties',
		'ConfSectionPictures' : 'Foto\'s',
		'ConfSectionShortcuts' : 'Keyboard Sneltoets',
		'ConfSecureLinks' : 'Dwing Facebook links te linken naar HTTPS pagina\'s.',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - ArdMalang Script configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show ArdMalang Script debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by ArdMalang Script<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Toestaan van sneltoetsen.',
		'ConfSign' : 'Laat mensen hun sterrenbeeld op hun profiel zien (wanneer zij hun geboortedatum aangeven).',
		'ConfTopBarFixed' : 'Behoud de top meny bar op het scherm, zelfs bij het naar beneden scrollen.',
		'ConfTopBarHoverOpacity' : 'Bij overscrollen',
		'ConfTopBarOpacity' : 'Top menu bar transparentie',
		'ConfUpdates' : 'Check Userscripts.org dagelijks voor updates naar ArdMalang Script. Of <a href="#" id="fbfUpdateLink" onclick="return false;">check nu</a>.',
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
		'UpdateAvailable1' : 'Een update is beschikbaar voor ArdMalang Script',
		'UpdateAvailable2' : 'Will je nu updaten?',
		'UpdateHomepage' : 'Ga naar startpagina',
		'UpdateInstall' : 'Nu installeren',
		'UpdateTomorrow' : 'Herinner me morgen',
		'yearsOld' : '%s jaar oud'
	},

	// Chinese (Taiwan) - Contributed by By Acedia.Liu (20100422)
	zh_tw : {
		'_language' : 'Chinese (Taiwan)',
		'AddToCalendar' : '????',
		'AddToGoogleCalendar' : '??Google??',
		'all' : '??',
		'All' : '??',
		'AllPhotosLoaded' : '??????',
		'Automatic' : '??',
		'Birthday' : '%s\???',
		'BookmarkAdd' : '??????',
		'BookmarkConfirmRemoval' : '?????????? "%s"?',
		'BookmarkDoesNotExist' : '??????????\n\n?????????,???????',
		'BookmarkExists' : '????????\n\n???????????,???????',
		'BookmarkNamePrompt' : '????????:\n%s',
		'BookmarkRemove' : '????',
		'Bookmarks' : '????',
		'BrowserUnsupported' : '?????????????',
		'CreatingFile' : '????',
		'Close' : '??',
		'ConfigureFacebookArdMalang' : '?? ArdMalang Script',
		'ConfigureInstructions' : '??????????,??????????,???????????',
		'ConfAge' : '?????????\???(????????????)?',
		'ConfAutoBigAlbumPictures' : '?????????????????',
		'ConfAutoLoadFullAlbum' : '?????????????????',
		'ConfAutoLoadTaggedPhotos' : '??????????????????? (??\????????)?',
		'ConfAutoReadMore' : '????"????"???',
		'ConfBigAlbumPictures' : '????????????????????',
		'ConfBookmarks' : '??????????????????',
		'ConfBottomBarHoverOpacity' : 'On mouse-over',
		'ConfBottomBarOpacity' : '?????????',
		'ConfCalendarBirthDate' : '????\????????',
		'ConfCalendarFullName' : '????\?????????? (?????first name)?',
		'ConfChatDifferentiate' : '??????????????????',
		'ConfChatHideIdle' : '????????',
		'ConfDelayPopupPics' : '????????,????????????',
		'ConfDelayPopupPicsTimeout' : '????????????,?????(???=500):',
		'ConfDownloadVideo' : '??????????????? (????? <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '????????5????????',
		'ConfExport' : '????????,??????,???????????',
		'ConfExternalPopup' : '??????????? <sup>beta</sup>',
		'ConfFacebookArdMalangLanguage' : 'ArdMalang Script?????',
		'ConfFacebookTimestamps' : '??Facebook??????? (eg. "3 hours ago").',
		'ConfFBFTimestamps' : '??ArdMalang Script??????? (eg. "11:45").',
		'ConfFBFTimestamps24' : 'ArdMalang Script???????24????',
		'ConfFriendRequestCountInTitle' : '???????????????',
		'ConfGoogleApps' : '??Google???????Google????????',
		'ConfGoogleAppsDomain' : '??',
		'ConfGoogleCalendar' : '???????????? <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : '?? <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : '?????????',
		'ConfHideEventStories' : '???????',
		'ConfHideFanStories' : '???????',
		'ConfHideFriendStories' : '???????',
		'ConfHideGroupStories' : '???????',
		'ConfHideLinkStories' : '???????',
		'ConfHidePhotoStories' : '???????',
		'ConfHideProfilePicStories' : '????????????',
		'ConfHideRead' : '??????????????',
		'ConfHideRelationshipStories' : '???????',
		'ConfHideStatusStories' : '???????',
		'ConfHideVideoStories' : '???????',
		'ConfHideWallStories' : '????????',
		'ConfHomeChat' : '???????',
		'ConfHomeEvents' : '???????',
		'ConfHomeFindFriends' : '???????',
		'ConfHomeLeftAlign' : '???????',
		'ConfHomeLeftColumn' : '???????',
		'ConfHomeLeftColumnFixed' : '?????,?????????',
		'ConfHomeLink' : '???????,????????',
		'ConfHomePeopleYouMayKnow' : '???????',
		'ConfHomeNavigation' : '???????',
		'ConfHomePokes' : '?????????',
		'ConfHomeProfile' : '?????????',
		'ConfHomeRequests' : '???????',
		'ConfHomeRightColumn' : '?????',
		'ConfHomeStretch' : '?????????????',
		'ConfiCalendar' : '???????? <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> file with all birthdays.',
		'ConfImport' : '????????????,?????????????????,????"Import(??)"',
		'ConfInboxCountInTitle' : '??????????????',
		'ConfLogoutLink' : '????????????????',
		'ConfNotificationCountInTitle' : '????????????',
		'ConfNewTabSearch' : '?? CTRL + Enter ???,????????????',
		'ConfPageTitle' : '??????? "Facebook |" ???',
		'ConfPhotoPopup' : '??????,??????????',
		'ConfPopupAutoClose' : '?????????',
		'ConfPopupSmartAutoClose' : '????????,???????????',
		'ConfPopupPosition' : '??????????',
		'ConfProcessInterval' : '?????????,????? (???=1000):',
		'ConfProfileLink' : '???????,?????????',
		'ConfProfilePicPopup' : '?????????????,??????????',
		'ConfProtocolLinks' : '??????ID???????,?????????????? (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : '?? ArdMalang Script',
		'ConfSectionAdvanced' : '??',
		'ConfSectionEvents' : '??/??',
		'ConfSectionFeeds' : '????',
		'ConfSectionHomePage' : '??',
		'ConfSectionImportExport' : '??/??',
		'ConfSectionLiveFeed' : '????',
		'ConfSectionMenu' : '??/??',
		'ConfSectionOther' : '????',
		'ConfSectionPageTitle' : '????',
		'ConfSectionPictures' : '??',
		'ConfSectionShortcuts' : '?????',
		'ConfSecureLinks' : '?? Facebook ??? HTTPS ???',
		'ConfShortcutList' : '<b>?????</b> (?????):<br /><br /><i>?????:</i><br />&nbsp;<b>A</b> - ??/??<br />&nbsp;<b>B</b> - ?????? (????)<br />&nbsp;<b>C</b> - ArdMalang Script ??<br />&nbsp;<b>D</b> - ??<br />&nbsp;<b>E</b> - ??<br />&nbsp;<b>F</b> - ??<br />&nbsp;<b>H</b> - ??<br />&nbsp;<b>I</b> - ??<br />&nbsp;<b>L</b> - ?????? (???????)<br />&nbsp;<b>N</b> - ??<br />&nbsp;<b>P</b> - ??????<br />&nbsp;<b>R</b> - ??<br />&nbsp;<b>S</b> - ??????<br />&nbsp;<b>T</b> - ???????<br />&nbsp;<b>?</b> - ??ArdMalang Script????<br />&nbsp;<b>&lt;escape&gt;</b> - ??ArdMalang Script??????<br /><br /><i>??? (??)</i>:<br />&nbsp;<b>a</b> - ??<br />&nbsp;<b>f</b> - ????<br />&nbsp;<b>g</b> - ??<br />&nbsp;<b>l</b> - ??<br />&nbsp;<b>n</b> - ????<br />&nbsp;<b>p</b> - ??<br />&nbsp;<b>s</b> or <b>u</b> - ????<br />&nbsp;<b>t</b> - ??<br />&nbsp;<b>v</b> - ??<br /><br /><i>?????</i>:<br />&nbsp;<b>i</b> - ??<br />&nbsp;<b>p</b> - ??<br />&nbsp;<b>w</b> - ?<br />&nbsp;<b>x</b> - ??<br /><br /><i>?????? (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - ???<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - ?? (?????)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - ?? (?????)<br /><br /><i>?????/??:</i><br />&nbsp;<b>a</b> - ?????? (?????)<br />&nbsp;<b>b</b> - ???????<br />&nbsp;<b>c</b> - ????<br />&nbsp;<b>k</b> - ????<br />&nbsp;<b>m</b> - ?? (??) ??<br /><br /><i>??????/?????:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - ?????<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - ????<br />&nbsp;<b>o</b> - ????<br />&nbsp;<b>p</b> - ????<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - ?????',
		'ConfShortcuts' : '????????',
		'ConfSign' : '??????????\? ???? (?????????)?',
		'ConfTopBarFixed' : '??????,????????????',
		'ConfTopBarHoverOpacity' : '??????',
		'ConfTopBarOpacity' : '?????????',
		'ConfUpdates' : '?? Userscripts.org For ArdMalang Script ???? ?? <a href="#" id="fbfUpdateLink" onclick="return false;">????</a>.',
		'DownloadVideo' : '????',
		'ExportICalendarFile' : '?? iCalendar ??',
		'ExportICalendarFileWarning' : '(???????????,??????)',
		'FacebookArdMalangConflict' : 'Facebook ArdMalang?????ArdMalang Script?<br /><br />??????,??????????????Facebook ArdMalang??,????????????<br /><br />?????????????, <a %s>??????</a>.',
		'fullAlbumLoaded' : '??????',
		'Import' : '??',
		'ImportConfirm' : '??????????????????????',
		'ImportFailure' : '????????????',
		'ImportSuccess' : '??????????????',
		'Left' : '??',
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
		'Refresh' : '??',
		'Remove' : '??',
		'Right' : '??',
		'ShowBigPictures' : '??????',
		'Signs' : new Array('???','???','???','???','???','???','???','???','???','???','???','???'),
		'today' : 'today',
		'UpdateAvailable1' : 'ArdMalang Script ???????',
		'UpdateAvailable2' : '????????',
		'UpdateHomepage' : '???',
		'UpdateInstall' : '????',
		'UpdateTomorrow' : '?????',
		'yearsOld' : '%s ?'
	},

	// Turkish - Contributed by Gökhan Gurbetoglu (20100817)
	tr : {
		'_language' : 'Turkish',
		'AddToCalendar' : 'Takvime Ekle',
		'AddToGoogleCalendar' : 'Google Takvim\'e Ekle',
		'all' : 'tümü',
		'All' : 'Tümü',
		'AllPhotosLoaded' : 'Tüm fotograflar yüklendi',
		'Automatic' : 'Otomatik',
		'Birthday' : '%s Dogumgünü',
		'BookmarkAdd' : 'Yeni Yer Imi Ekle',
		'BookmarkExists' : 'Bu sayfa için zaten bir yer imi var. \n\nYer imlerine eklemek istediginiz sayfaya gidin ve tekrar deneyin.',
		'BookmarkNamePrompt' : 'Bu yer imi için bir isim girin:\n%s',
		'BookmarksConfirmRemoval' : 'Bu yer imlerini kaldirmak istediginize emin misiniz?',
		'BookmarksManage' : 'Yer Imlerini Yönet',
		'BookmarksRemoveSelected' : 'Seçili Yer Imlerini Kaldir',
		'Bookmarks' : 'Yer Imleri',
		'BrowserUnsupported' : 'Tarayiciniz bu özelligi desteklemiyor.',
		'CreatingFile' : 'Dosya Olusturuluyor',
		'Close' : 'Kapat',
		'ConfigureFacebookArdMalang' : 'ArdMalang Script\'i Yapilandir',
		'ConfigureInstructions' : 'Bütün degisiklikler hemen kaydedilir ancak bazi degisiklikler halen açik olan sekmelerde etkisini göstermeyebilir.',
		'ConfAge' : 'Kisilerin yasini profillerinde göster (eger tam dogum tarihlerini belirtmislerse).',
		'ConfAlbumComments' : 'Albümde yapilmis tüm yorumlari görmek için albüm sayfalarina bir baglanti ekle.',
		'ConfApplicationWhitelist' : 'Uygulama Beyaz Listesi - Gizlenmesini istemediginiz uygulamalarin ID numaralarini girin. Birden fazla ID için aralara bosluk birakin.',
		'ConfAutoBigAlbumPictures' : 'Büyük albüm resimlerini sayfa açildiginda otomatik olarak göster.',
		'ConfAutoLoadFullAlbum' : 'Bir albümdeki tüm küçük resimleri otomatik olarak tek sayfada yükle.',
		'ConfAutoLoadTaggedPhotos' : 'Tüm etiketlenmis fotograflar için küçük resimleri otomatik olarak tek sayfada yükle (kisilerin profilindeki fotograflar sekmesi)',
		'ConfAutoReadMore' : '"Devamini gör" baglantilarina otomatik olarak tikla.',
		'ConfBigAlbumPictures' : 'Albüm sayfalarina bütün resimlerin büyük sürümlerini tek sayfada göstermek için bir baglanti ekle.',
		'ConfBookmarks' : 'Üst menü çubuguna bir Yer Imleri alt menüsü ekle.',
		'ConfBottomBarHoverOpacity' : 'Fare üstüne geldiginde',
		'ConfBottomBarOpacity' : 'Alt menü çubugu seffafligi',
		'ConfCalendarBirthDate' : 'Etkinlik ayrintilari kisinin dogumgününü içersin.',
		'ConfCalendarFullName' : 'Dogumgünleri için kisinin tam adini kullan (sadece ilk adini kullanmak yerine).',
		'ConfChatDifferentiate' : 'Çevrimiçi ve bostaki arkadaslari ayirt etmek için kalin ve italik yazitipi kullan.',
		'ConfChatHideIdle' : 'Bostaki arkadaslari gizle.',
		'ConfDelayPopupPics' : 'Açilir pencerede resimleri göstermeden önce kisa bir gecikme zamani ekle.',
		'ConfDelayPopupPicsTimeout' : 'Açilir pencerede resimleri göstermeden önceki gecikme, milisaniye olarak (varsayilan=500):',
		'ConfDownloadVideo' : 'Video sayfalarindaki videolari indirmek için bir baglanti ekle. (Bir <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV oynatici</a>\'ya ihtiyaciniz olabilir)',
		'ConfErrorPageReload' : 'Uygulama hata sayfalarini 5 saniye sonra otomatik olarak yenile.',
		'ConfExport' : 'Ayarlarinizi disa aktarmak için asagidaki metni kopyalayin ve bir dosyaya kaydedin.',
		'ConfExternalPopup' : 'Harici sitelerdeki fotograflarin büyük sürümünü göster. <sup>beta</sup>',
		'ConfFacebookArdMalangLanguage' : 'ArdMalang Script\'in Dili',
		'ConfFacebookTimestamps' : 'Facebook\'un zaman etiketlerini göster (örn. "3 saat önce").',
		'ConfFBFTimestamps' : 'Facebook\'un zaman etiketlerinin ardindan ArdMalang Script zaman etiketlerini ekle (örn. "11:45").',
		'ConfFBFTimestamps24' : 'ArdMalang Script zaman etiketlerini 24-saat biçiminde göster',
		'ConfFriendRequestCountInTitle' : 'Sayfa basliginda yeni arkadaslik isteklerinin sayisini göster.',
		'ConfGoogleApps' : 'Google Apps ile uyumlu Google Takvim baglantilari olustur.',
		'ConfGoogleAppsDomain' : 'Etki Alani',
		'ConfGoogleCalendar' : '<a href="http://tr.wikipedia.org/wiki/Google_Takvim" target="_blank">Google Takvim</a>\'e dogumgünü ve etkinlikler ekleyebilmek için baglantilari olustur.',
		'ConfGoogleLanguage' : '<a href="http://tr.wikipedia.org/wiki/Google_%C3%87eviri" target="_blank">Google Çeviri</a> için dil',
		'ConfHideApplicationStories' : 'Uygulama haberlerini gizle.',
		'ConfHideEventStories' : 'Etkinlik haberlerini gizle.',
		'ConfHideFacebookCountInTitle' : 'Facebook\'un yeni mesaj sayisi gösterimini gizle.',
		'ConfHideFriendStories' : 'Arkadaslik haberlerini gizle.',
		'ConfHideGroupStories' : 'Grup haberlerini gizle.',
		'ConfHideLikeStories' : 'Begenme haberlerini gizle.',
		'ConfHideLinkStories' : 'Baglanti haberlerini gizle.',
		'ConfHideNoteStories' : 'Not haberlerini gizle.',
		'ConfHidePhotoStories' : 'Fotograf haberlerini gizle.',
		'ConfHideProfilePicStories' : 'Profil resmi haberlerini gizle.',
		'ConfHideRead' : 'Canli haberlerdeki okundu olarak isaretlenmis ögeleri gizle.',
		'ConfHideRelationshipStories' : 'Iliski haberlerini gizle.',
		'ConfHideStatusStories' : 'Durum haberlerini gizle.',
		'ConfHideVideoStories' : 'Video haberlerini gizle.',
		'ConfHideWallStories' : 'Duvar hikayelerini gizle.',
		'ConfHomeBeta' : 'Facebook Ön Gösterim bölmesini göster.',
		'ConfHomeChat' : 'Sohbet bölmesini göster.',
		'ConfHomeEvents' : 'Etkinlik bölmesini göster.',
		'ConfHomeFindFriends' : 'Arkadaslarinla Baglanti Kur bölmesini göster.',
		'ConfHomeLeftAlign' : 'Ana sayfa içerigini sola yasla.',
		'ConfHomeLeftColumn' : 'Sol sütunu göster.',
		'ConfHomeLeftColumnFixed' : 'Sayfa asagi kaydirilsa bile sol sütunu görünür tut.',
		'ConfHomeLink' : 'Üst menü çubugunda Ana Sayfa baglantisini göster.',
		'ConfHomeNavigation' : 'Dolasma bölmesini göster.',
		'ConfHomePokes' : 'Dürtme bölmesini göster.',
		'ConfHomeProfile' : 'Profil bölmesini göster.',
		'ConfHomeRecommendations' : 'Tavsiyeleri göster (Taniyor Olabilecegin Kisiler, Tavsiye Edilen Sayfalar, vs.).',
		'ConfHomeRequests' : 'Istekler bölmesini göster.',
		'ConfHomeRightColumn' : 'Sag sütunu göster.',
		'ConfHomeStretch' : 'Ana sayfayi tarayicinin genisligine sigacak sekilde uzat.',
		'ConfHomeStretchComments' : 'Ana sayfadaki yorumlari uzat.',
		'ConfiCalendar' : 'Bütün dogumgünlerini içeren bir <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> dosyasi indirmek için baglantilari ekle.',
		'ConfImport' : 'Ileride ayarlarinizi içe aktarmak için, daha önce kaydettiginiz metni asagidaki metnin yerine yapistirin ve "Içe Aktar"a tiklayin.',
		'ConfInboxCountInTitle' : 'Sayfa basliginda gelen kutusundaki okunmamis mesaj sayisini göster.',
		'ConfLogoutLink' : 'Üst menü çubuguna bir çikis baglantisi ekle.',
		'ConfNotificationCountInTitle' : 'Sayfa basliginda bildirimlerin sayisini göster.',
		'ConfNewTabSearch' : 'CTRL + Enter basarak arama yapildiginda arama sonuçlarini yeni bir sekmede/pencerede aç.',
		'ConfPageTitle' : 'Bütün sayfalarin basligindan "Facebook |" yazisini kaldir.',
		'ConfPhotoPopup' : 'Fareyle üstüne gelindiginde fotograflarin büyük sürümlerini göster.',
		'ConfPopupAutoClose' : 'Açilan pencere resimlerini otomatik olarak kapat.',
		'ConfPopupSmartAutoClose' : 'Açilan pencere resimlerinin fare üzerindeyken otomatik olarak kapanmasini engelle.',
		'ConfPopupPosition' : 'Açilan pencere resimlerinin konumu',
		'ConfProcessInterval' : 'Sayfayi islemek için zaman araligi, milisaniye olarak (varsayilan=1000):',
		'ConfProfileLink' : 'Üst menü çubugunda Profil baglantisini göster.',
		'ConfProfilePicPopup' : 'Fareyle üstüne gelindiginde profil resimlerinin büyük sürümlerini göster',
		'ConfProtocolLinks' : 'Profillerdeki anlik ileti adreslerini aninda iletisim kurulabilecek baglantilara dönüstür (Google Talk, Windows Live, vb.).',
		'ConfSectionAbout' : 'ArdMalang Script Hakkinda',
		'ConfSectionAdvanced' : 'Gelismis',
		'ConfSectionEvents' : 'Dogumgünleri/Etkinlikler',
		'ConfSectionImportExport' : 'Içe/Disa Aktar',
		'ConfSectionFeeds' : 'Kaynaklar',
		'ConfSectionHomePage' : 'Ana Sayfa',
		'ConfSectionLiveFeed' : 'Canli Haberler',
		'ConfSectionMenu' : 'Menüler/Sohbet',
		'ConfSectionOther' : 'Diger Seçenekler',
		'ConfSectionPageTitle' : 'Sayfa Basligi',
		'ConfSectionPictures' : 'Resimler',
		'ConfSectionShortcuts' : 'Klavye Kisayollari',
		'ConfSecureLinks' : 'Facebook baglantilarini HTTPS sayfalarini kullanmaya zorla.',
		'ConfShortcutList' : '<b>Klavye Kisayollari</b> (büyük/küçük harf duyarli):<br /><br /><i>Herhangi bir sayfadan:</i><br /> <b>A</b> - Albümler/fotograflar<br /> <b>B</b> - Arkadas listesini aç/kapa (çevrimiçi arkadaslar)<br /> <b>C</b> - ArdMalang Script yapilandirmasi<br /> <b>D</b> - Dogumgünleri<br /> <b>E</b> - Etkinlikler<br /> <b>F</b> - Arkadaslar<br /> <b>H</b> - Ana Sayfa<br /> <b>I</b> - Gelen Kutusu<br /> <b>L</b> - Çikis baglantisini seç (çikis yapmak için bundan sonra Enter\'a basin)<br /> <b>N</b> - Bildirimler<br /> <b>P</b> - Profiliniz<br /> <b>R</b> - Istekler<br /> <b>S</b> - Arama alanina git<br /> <b>T</b> - Seçili metni tercüme et<br /> <b>?</b> - ArdMalang Script hata ayiklama bilgisini göster<br /> <b><escape></b> - ArdMalang Script tarafindan açilmis pencereleri kapat<br /><br /><i>Ana sayfadan (filtreler):</i><br /> <b>a</b> - Sayfalar<br /> <b>f</b> - Canli Haberler<br /> <b>g</b> - Gruplar<br /> <b>l</b> - Baglantilar<br /> <b>n</b> - Haber Kaynagi<br /> <b>p</b> - Fotograflar<br /> <b>s</b> veya <b>u</b> - Durum güncellemeleri<br /> <b>t</b> - Notlar<br /> <b>v</b> - Videolar<br /><br /><i>Profil sayfalarindan:</i><br /> <b>i</b> - Bilgi<br /> <b>p</b> - Fotograflar<br /> <b>w</b> - Duvar<br /> <b>x</b> - Kutular<br /><br /><i>Numaralandirilmis sayfalardan (önceki, sonraki, vb.):</i><br /> <b><sol ok></b> - Önceki<br /> <b><sag ok></b> - Sonraki<br /> <b><shift> + <sol ok></b> - Ilk (eger mevcutsa)<br /> <b><shift> + <sag ok></b> - Son (eger mevcutsa)<br /><br /><i>Albümleri/fotograflari görüntülerken:</i><br /> <b>a</b> - Tüm küçük resimleri yükle (eger mevcutsa)<br /> <b>b</b> - Büyük resimleri göster<br /> <b>c</b> - Yorumlari göster<br /> <b>k</b> - Albüme geri dön<br /> <b>m</b> - (Kisi) ve benim fotograflarim<br /><br /><i>Yakin zamanlardaki albümleri ve yüklenmis/etiketlenmis fotograflari görüntülerken:</i><br /> <b>a</b> veya  <b>r</b> - Yakin Zamandaki Albümler<br /> <b>m</b> veya  <b>u</b> - Mobil yüklemeler<br /> <b>o</b> - Benim oldugum fotograflar<br /> <b>p</b> - Fotograflarim<br /> <b>t</b> veya  <b>f</b> - Etiketlenmis arkadaslar',
		'ConfShortcuts' : 'Klavye kisayollarini etkinlestir.',
		'ConfSign' : 'Profillerde kisilerin burçlarini göster (eger dogum tarihlerini belirtmislerse).',
		'ConfTopBarFixed' : 'Sayfa asagi kaydirilsa bile üst menü çubugunu ekranda tut.',
		'ConfTopBarHoverOpacity' : 'Fare üstüne geldiginde',
		'ConfTopBarOpacity' : 'Üst menü çubugu seffafligi',
		'ConfUpdates' : 'ArdMalang Script güncellemeleri için her gün Userscripts.org\'u ziyaret et. Ya da <a href="#" id="fbfUpdateLink" onclick="return false;">simdi kontrol et</a>.',
		'DownloadVideo' : 'Videoyu Indir',
		'ExportICalendarFile' : 'iCalendar dosyasi aktar',
		'ExportICalendarFileWarning' : '(Eger çok arkadasiniz varsa bu biraz uzun sürebilir)',
		'FacebookArdMalangConflict' : 'ArdMalang Script\'in yeni adi artik ArdMalang Script. Isim degisikliginden dolayi ArdMalang Script\'i tarayicinizdan kaldirmaniz gerekiyor, yoksa bu iki script birbiriyle uyusmazlik sorunlari çikaracaktir. Eger bir userscript\'i nasil kaldiracaginizdan emin degilseniz <a %s>buraya tiklayarak ögrenebilirsiniz</a>.',
		'fullAlbumLoaded' : 'bütün albüm yüklendi',
		'Import' : 'Içe Aktar',
		'ImportConfirm' : 'Bu ayarlari içe aktarmak istediginize emin misiniz?\nMevcut ayarlariniz silinecek.',
		'ImportFailure' : 'Ayarlarinizi içe aktarmaya çalisirken bir hata olustu.',
		'ImportSuccess' : 'Içe aktarma tamamlandi. Sayfayi yenilemek ister misiniz?',
		'Left' : 'Sol',
		'LoadingAllPhotos' : 'Tüm fotograflar yükleniyor...',
		'loadingFullAlbum' : 'tüm albüm yükleniyor...',
		'LoadingPic' : 'Resim Yükleniyor...',
		'LoadPhotosWarning' : 'Tüm fotograflari yüklemek uzun zaman alabilir',
		'Months' : new Array('Ocak','Subat','Mart','Nisan','Mayis','Haziran','Temmuz','Agustos','Eylül','Ekim','Kasim','Aralik'),
		'ProtocolSkype' : '%s kisisini Skype kullanarak ara',
		'ProtocolMSN' : '%s ile Windows Live kullanarak sohbet et',
		'ProtocolYahoo' : '%s ile Yahoo Messenger kullanarak sohbet et',
		'ProtocolGoogle' : '%s ile Google Talk kullanarak sohbet et',
		'ReloadErrorPage' : 'Yeniden denemek için tiklayin, ya da 5 saniye bekleyin',
		'Refresh' : 'Yenile',
		'Remove' : 'Kaldir',
		'Right' : 'Sag',
		'ShowBigPictures' : 'Büyük Resimleri Göster',
		'Signs' : new Array('Oglak','Kova','Balik','Koç','Boga','Ikizler','Yengeç','Aslan','Basak','Terazi','Akrep','Yay'),
		'today' : 'bugün',
		'Translators' : 'Çevirenler',
		'UpdateAvailable1' : 'ArdMalang Script için bir güncelleme mevcut',
		'UpdateAvailable2' : 'Simdi güncellemek ister misiniz?',
		'UpdateHomepage' : 'Ana sayfaya git',
		'UpdateInstall' : 'Simdi kur',
		'UpdateTomorrow' : 'Yarin hatirlat',
		'ViewAlbumComments' : 'Albüm Yorumlarini Göster',
		'yearsOld' : '%s yasinda'
	},

	// Serbian (Cyrillic) - Contributed by ??????? (20100817)
	sr_rs : {
		'_language' : 'Serbian (Cyrillic)',
		'AddToCalendar' : '????? ? ????????',
		'AddToGoogleCalendar' : '????? ? Google ????????',
		'all' : '???',
		'All' : '???',
		'AllPhotosLoaded' : '??? ??????????? ?? ???????',
		'Automatic' : '??????????',
		'Birthday' : '???????? ????????? %s',
		'BookmarkAdd' : '????? ???? ?????????',
		'BookmarkExists' : '??? ???????? ?? ??? ?????? ? ?????????.\n\n????? ?? ???????? ???? ?????? ?? ?????? ? ????????? ??????.',
		'BookmarkNamePrompt' : '??????? ????? ??? ?????????:\n%s',
 		'BookmarksConfirmRemoval' : '?? ?? ??? ??????? ?? ?????? ?? ???????? ??? ??????????',
 		'BookmarksManage' : '????? ?????????',
 		'BookmarksRemoveSelected' : '?????? ???????? ?????????',
		'Bookmarks' : '?????????',
		'BrowserUnsupported' : '??? ??????????? ?? ???????? ??? ??????.',
		'CreatingFile' : '???????? ?? ????????',
		'Close' : '???????',
		'ConfigureFacebookArdMalang' : '?????? ArdMalang Script',
		'ConfigureInstructions' : '??? ?????? ?? ?? ????? ?????, ??? ??????? ?? ???????? ???????? ???????? ???????? ?? ?? ?????? ????????.',
		'ConfAge' : '??????? ?????? ????? ?? ??????? (??????? ?? ??????? ??? ????? ??????).',
 		'ConfAlbumComments' : '????? ???? ?? ???????? ?????? ????? ?? ?? ????????? ??? ????????? ??????.',
		'ConfApplicationWhitelist' : '?????? ?????????? ?????????? - ??????? ?????? ?????????? ???? ????? ???????? ???? ?????????. ????????? ?????? ????????.',
		'ConfAutoBigAlbumPictures' : '?????????? ??????? ???? ??????????? ?? ?????? ???? ?? ???????? ??????.',
		'ConfAutoLoadFullAlbum' : '??????????, ?? ?????? ????????, ?????? ??????? ???? ??????????? ?? ??????.',
		'ConfAutoLoadTaggedPhotos' : '??????????, ?? ?????? ????????, ?????? ??????? ???? ????????? ??????????? (?? ??????? "???????????" ?????? ???????).',
		'ConfAutoReadMore' : '?????????? ?????? ?? ???? "???????".',
		'ConfBigAlbumPictures' : '?? ???????? ?????? ????? ???? ?? ??????????? ????? ??????? ???? ??????????? ?? ?? ????????.',
		'ConfBookmarks' : '????? ??????? "?????????" ?? ????? ????? ?? ????????.',
		'ConfBottomBarHoverOpacity' : '???????? ???????? ?????',
		'ConfBottomBarOpacity' : '?????????? ???? ????? ?? ????????',
		'ConfCalendarBirthDate' : '?????? ????? ?????? ????????? ? ???????? ????????.',
		'ConfCalendarFullName' : '????? ? ??????? ????????? ? ??????? ?????????.',
		'ConfChatDifferentiate' : '?????? ???????? ????????? ?????????? ??????? ? ????????? ????? ???????.',
		'ConfChatHideIdle' : '?????? ????????? ?????????.',
		'ConfDelayPopupPics' : '?????? ?????? ?????? ??? ??????????? ???????? ?????.',
		'ConfDelayPopupPicsTimeout' : '?????? ??? ??????????? ???????? ?????, ? ????????????? (?????????????=500):',
		'ConfDownloadVideo' : '????? ???? ?? ?????????? ????? ?????? ?? ???????? ?? ?????. (????? ?? ??? ??????? <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '?????????? ??????? ????????? ???????? ????? 5 ???????, ? ??????? ??????.',
		'ConfExport' : '?? ????? ??????? ????? ??????????, ????????? ????? ???? ????? ? ????????? ?? ? ????????.',
		'ConfExternalPopup' : '??????? ??????? ????? ??????????? ?? ????????? ????????. <sup>????</sup>',
		'ConfFacebookArdMalangLanguage' : '????? ArdMalang Script-?',
		'ConfFacebookTimestamps' : '??????? ??????? ????? (???. "??? 3 ????").',
		'ConfFBFTimestamps' : '????? ArdMalang Script ????? ????? ??????? ??????? (???. "11:45").',
		'ConfFBFTimestamps24' : '??????? ArdMalang Script ??????? ? 24-???????? ??????.',
		'ConfFriendRequestCountInTitle' : '??????? ???? ??????? ?? ???????????? ? ??????? ????????.',
		'ConfGoogleApps' : '??????? ???? ?? Google ????????, ??????? ?? Google ??? ??????????.',
		'ConfGoogleAppsDomain' : '?????',
		'ConfGoogleCalendar' : '????? ???? ?? ???????? ????????? ? ???????? ? <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google ????????</a>.',
		'ConfGoogleLanguage' : '????? ?? <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google ??????????</a>',
		'ConfHideApplicationStories' : '?????? ?????????? ? ????????????.',
		'ConfHideEventStories' : '?????? ?????????? ? ??????????.',
 		'ConfHideFacebookCountInTitle' : '?????? ????????? ???? ????? ????????? ??????.',
		'ConfHideFriendStories' : '?????? ?????????? ? ??????????????.',
		'ConfHideGroupStories' : '?????? ?????????? ? ???????.',
 		'ConfHideLikeStories' : '?????? ?????????? ? "?????? ?? ??" ????????.',
		'ConfHideLinkStories' : '?????? ?????????? ? ??????.',
		'ConfHideNoteStories' : '?????? ?????????? ? ????????.',
		'ConfHidePhotoStories' : '?????? ?????????? ? ?????????????.',
		'ConfHideProfilePicStories' : '?????? ?????????? ? ??????? ?? ???????.',
		'ConfHideRead' : '? ?????????? ?????????? ?????? ?????? ???? ?? ???????? ??? ?????????.',
		'ConfHideRelationshipStories' : '?????? ?????????? ? ????????? ????.',
		'ConfHideStatusStories' : '?????? ??????? ???????.',
		'ConfHideVideoStories' : '?????? ?????????? ? ????? ????????.',
		'ConfHideWallStories' : '?????? ?????????? ?? ????.',
 		'ConfHomeBeta' : '??????? ?????? ?? ??????????? ????????.',
		'ConfHomeChat' : '??????? ?????? ?? ????????.',
		'ConfHomeEvents' : '??????? ?????? ?? ??????????.',
		'ConfHomeFindFriends' : '??????? "?????? ?? ??" ??????.',
		'ConfHomeLeftAlign' : '???????? ??????? ??????? ???????? ?? ????? ??????.',
		'ConfHomeLeftColumn' : '??????? ???? ??????.',
		'ConfHomeLeftColumnFixed' : '???? ???? ?????? ???? ??????? ? ???????? ???????? ???????? ?? ????.',
		'ConfHomeLink' : '??????? ???? ?? ??????? ???????? ?? ?????? ????? ?? ????????.',
		'ConfHomeNavigation' : '??????? ?????? ?? ??????????.',
		'ConfHomePokes' : '??????? "???????" ??????.',
		'ConfHomeProfile' : '??????? "??????" ?????.',
 		'ConfHomeRecommendations' : '??????? ????????? (????? ???? ????? ????????, ??????????? ???????? ???.).',
		'ConfHomeRequests' : '??????? "???????" ??????.',
		'ConfHomeRightColumn' : '??????? ????? ??????.',
		'ConfHomeStretch' : '?????? ??????? ???????? ?? ???? ?????? ??????? ????????????.',
 		'ConfHomeStretchComments' : '?????? ????????? ?? ???????? ????????.',
		'ConfiCalendar' : '????? ???? ?? ?????????? <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> ???????? ?? ???? ???????????.',
		'ConfImport' : '?? ???? ??????? ?????? ????? ??????????, ???????? ????? ???? ????? ?? ??????? ???? ??? ????????? ???????? ? ???????? "????".',
		'ConfInboxCountInTitle' : '??????? ???? ????? ?????? ? ??????? ????????.',
		'ConfLogoutLink' : '????? ???? ?? ??????????? ?? ????? ????? ?? ????????.',
		'ConfNotificationCountInTitle' : '??????? ???? ????? ?????????? ? ??????? ????????.',
		'ConfNewTabSearch' : '???? ????????? CTRL + Enter ?? ????????, ?????? ????????? ???????? ? ????? ???????/???????.',
		'ConfPageTitle' : '?????? "Facebook |" ?? ??????? ???? ????????.',
		'ConfPhotoPopup' : '??????? ???? ??????? ??????????? ???????? ???????? ?????.',
		'ConfPopupAutoClose' : '?????????? ??????? ??????? ?????.',
		'ConfPopupSmartAutoClose' : '?? ???????? ??????? ????? ??? ?? ????????? ???? ?? ????.',
		'ConfPopupPosition' : '??????? ???????? ?????',
		'ConfProcessInterval' : '???????? ?? ?????? ????????, ? ????????????? (?????????????=1000):',
		'ConfProfileLink' : '??????? ???? ?? ?????? ?? ????? ????? ?? ????????.',
		'ConfProfilePicPopup' : '??????? ???? ??????? ????? ?? ??????? ???????? ???????? ?????',
		'ConfProtocolLinks' : '???????? ??????? ???????? ?? ???????????? (Google Talk, Windows Live ? ??.) ?? ??????? ? ???? ?????? ?? ?? ???????? ???????.',
		'ConfSectionAbout' : '? ??????? ArdMalang Script',
		'ConfSectionAdvanced' : '???? ??????',
		'ConfSectionEvents' : '?????????/????????',
		'ConfSectionImportExport' : '????/?????',
		'ConfSectionFeeds' : '???????',
		'ConfSectionHomePage' : '??????? ????????',
		'ConfSectionLiveFeed' : '?????????',
		'ConfSectionMenu' : '??????/???????',
		'ConfSectionOther' : '?????? ??????',
		'ConfSectionPageTitle' : '?????? ????????',
		'ConfSectionPictures' : '?????',
		'ConfSectionShortcuts' : '??????? ?? ?????????',
		'ConfSecureLinks' : '??????? ?????????? ??????? ???? ?? HTTPS ????????.',
		'ConfShortcutList' : '<b>??????? ?? ?????????</b> (????????? ?? ???? ? ?????? ?????):<br /><br /><i>?? ???? ???? ????????:</i><br /> <b>A</b> - ??????/???????????<br /> <b>B</b> - ?????? ????????? ?????????<br /> <b>C</b> - ArdMalang Script ??????????<br /> <b>D</b> - ?????????<br /> <b>E</b> - ????????<br /> <b>F</b> - ?????????<br /> <b>H</b> - ??????? ????????<br /> <b>I</b> - ???????? ??????<br /> <b>K</b> - ????? ?????????<br /> <b>L</b> - ?????? ???? ?? ?????? (?????????? ????? ????? ???? ?? ???????????)<br /> <b>N</b> - ??????????<br /> <b>P</b> - ??????<br /> <b>R</b> - ???????<br /> <b>S</b> - ???????? ?? ???? ?? ????????<br /> <b>T</b> - ??????? ???????? ?????<br /> <b>?</b> - ??????? ???????? ? ?????? ArdMalang Script-?<br /> <b><escape></b> - ??????? ???????? ??????? ???? ?? ???????? ArdMalang Script<br /><br /><i>?? ??????? ???????? (???????)</i>:<br /> <b>a</b> - ????????<br /> <b>f</b> - ?????????<br /> <b>g</b> - ?????<br /> <b>l</b> - ????<br /> <b>n</b> - ???????<br /> <b>p</b> - ???????????<br /> <b>s</b> ??? <b>u</b> - ??????? ???????<br /> <b>t</b> - ???????<br /> <b>v</b> - ?????<br /><br /><i>?? ???????</i>:<br /> <b>i</b> - ???????????<br /> <b>p</b> - ???????????<br /> <b>w</b> - ???<br /> <b>x</b> - ??????<br /><br /><i>?? ???????? ?? ?????????? (?????????, ??????, ???.)</i><br /> <b><???????? ????></b> - ?????????<br /> <b><???????? ?????></b> - ???????<br /> <b><????> + <???????? ????></b> - ???? (??? ?? ????????)<br /> <b><????> + <???????? ?????></b> - ???????? (??? ?? ????????)<br /><br /><i>???????? ???????????? ??????/???????????:</i><br /> <b>a</b> - ?????? ??? ??????? (??? ?? ????????)<br /> <b>b</b> - ??????? ?????? ?????<br /> <b>c</b> - ??????? ?????????<br /> <b>k</b> - ????? ?? ?????<br /> <b>m</b> - ??????????? ?? (??????????) ? ?? ????<br /><br /><i>??? ???????????? ????????? ?????? ? ???????????/????????? ???????????:</i><br /> <b>a</b> ???  <b>r</b> - ???????? ??????<br /> <b>m</b> ???  <b>u</b> - ?????????? ????? ???????? ????????<br /> <b>o</b> - ??????????? ?? ?????? ??? ??<br /> <b>p</b> - ???? ???????????<br /> <b>t</b> ???  <b>f</b> - ???????? ?????????',
		'ConfShortcuts' : '??????? ??????? ?? ?????????.',
		'ConfSign' : '??????? ?????????? ??????????? ???? ?? ??????? ??????? (??????? ?? ??????? ??? ????? ??????).',
		'ConfTopBarFixed' : '?????? ????? ????? ?? ???????? ?? ?????? ? ???????? ???????? ???????? ?? ????.',
		'ConfTopBarHoverOpacity' : '???????? ???????? ?????',
		'ConfTopBarOpacity' : '?????????? ????? ????? ?? ????????',
		'ConfUpdates' : '??????????? ?????????? Userscripts.org ?? ?????????? ArdMalang Script-?. ??? <a href="#" id="fbfUpdateLink" onclick="return false;">??????? ????</a>.',
		'DownloadVideo' : '??????? ?????',
		'ExportICalendarFile' : '?????? iCalendar ????????',
		'ExportICalendarFileWarning' : '(??? ???? ?? ??????? ??? ????? ????? ?????????)',
		'FacebookArdMalangConflict' : 'ArdMalang Script ?? ???? ???? ArdMalang Script. ???? ??????? ????? ???????? ????? ?? ???????? ArdMalang Script ?? ???? ?????????? ?? ?? ?? ????? ?? ??????? ?????? ??? ??? ???????. ??? ????? ??????? ???? ?? ???????? ???????, <a %s>???????? ???? ?? ????????</a>.',
		'fullAlbumLoaded' : '??? ????? ?? ??????',
		'Import' : '????',
		'ImportConfirm' : '?? ?? ??? ??????? ?? ?????? ?? ??????? ??? ???????????\n???? ???????? ?????????? ?? ???? ?????????.',
		'ImportFailure' : '????? ?? ?? ?????? ???????? ????? ????? ??????????.',
		'ImportSuccess' : '???? ?? ???????. ?? ?? ?????? ?? ???????? ?????????',
		'Left' : '????',
		'LoadingAllPhotos' : '????????? ???? ???????????...',
		'loadingFullAlbum' : '????????? ???? ??????...',
		'LoadingPic' : '????????? ?????...',
		'LoadPhotosWarning' : '????????? ???? ??????????? ???? ?? ??????? ???? ?????',
		'Months' : new Array('??????','???????','????','?????','???','???','???','??????','?????????','???????','????????','????????'),
		'ProtocolSkype' : '?????? ????????? %s ????? ???????? Skype',
		'ProtocolMSN' : '?????? ?? ?????????? %s ????? ???????? Windows Live',
		'ProtocolYahoo' : '?????? ?? ?????????? %s ????? ???????? Yahoo Messenger',
		'ProtocolGoogle' : '?????? ?? ?????????? %s ????? ???????? Google Talk',
		'ReloadErrorPage' : '???????? ?? ???????? ??????, ??? ????????? 5 ???????',
		'Refresh' : '??????',
		'Remove' : '??????',
		'Right' : '?????',
		'ShowBigPictures' : '??????? ?????? ?????',
		'Signs' : new Array('?????','????????','????','????','???','????????','???','???','??????','????','????????','???????'),
		'today' : '?????',
		'Translators' : '??????????',
		'UpdateAvailable1' : '???????? ?? ?????????? ?? ArdMalang Script',
		'UpdateAvailable2' : '?????? ?? ???? ?? ????????????',
		'UpdateHomepage' : '??? ?? ??????? ????????',
		'UpdateInstall' : '?????????? ?????',
		'UpdateTomorrow' : '??????? ?? ?????',
 		'ViewAlbumComments' : '??????? ????????? ??????',
		'yearsOld' : '%s ??????'
	},

	// Serbian (Latin) - Contributed by Gorštak (20100817)
	sr : {
		'_language' : 'Serbian (Latin)',
		'AddToCalendar' : 'Dodaj u kalendar',
		'AddToGoogleCalendar' : 'Dodaj u Google kalendar',
		'all' : 'sve',
		'All' : 'Sve',
		'AllPhotosLoaded' : 'Sve fotografije su ucitane',
		'Automatic' : 'Automatski',
		'Birthday' : 'Rodendan korisnika %s',
		'BookmarkAdd' : 'Dodaj novu zabelešku',
		'BookmarkExists' : 'Ova stranica je vec dodata u zabeleške.\n\nIdite na stranicu koju želite da dodate i pokušajte ponovo.',
		'BookmarkNamePrompt' : 'Unesite naziv ove zabeleške:\n%s',
 		'BookmarksConfirmRemoval' : 'Da li ste sigurni da želite da uklonite ove zabeleške?',
 		'BookmarksManage' : 'Uredi zabeleške',
 		'BookmarksRemoveSelected' : 'Ukloni izabrane zabeleške',
		'Bookmarks' : 'Zabeleške',
		'BrowserUnsupported' : 'Vaš pretraživac ne podržava ovu opciju.',
		'CreatingFile' : 'Datoteka se izraduje',
		'Close' : 'Zatvori',
		'ConfigureFacebookArdMalang' : 'Podesi ArdMalang Script',
		'ConfigureInstructions' : 'Sve izmene se se odmah pamte, ali ponekad je potrebno osvežiti otvorene stranice da bi izmene delovale.',
		'ConfAge' : 'Prikaži uzrast osobe na profilu (ukoliko je naveden pun datum podenja).',
 		'ConfAlbumComments' : 'Dodaj vezu na stranici albuma kojom bi se prikazali svi komentari albuma.',
		'ConfApplicationWhitelist' : 'Spisak dozvoljenih aplikacija - Unesite oznaku aplikacije kako biste sprecili njeno sakrivanje. Razdvojte oznake razmakom.',
		'ConfAutoBigAlbumPictures' : 'Automatski prikaži vece fotografije iz albuma kada se stranica otvori.',
		'ConfAutoLoadFullAlbum' : 'Automatski, na jednoj stranici, ucitaj slicice svih fotografija iz albuma.',
		'ConfAutoLoadTaggedPhotos' : 'Automatski, na jednoj stranici, ucitaj slicice svih oznacenih fotografija (na kartici "Fotografije" unutar profila).',
		'ConfAutoReadMore' : 'Automatski klikni na vezu "starije".',
		'ConfBigAlbumPictures' : 'Na stranici albuma dodaj vezu za prikazivanje vecih slicica svih fotografija sa te stranice.',
		'ConfBookmarks' : 'Dodaj podmeni "Zabeleške" na gornju traku sa menijima.',
		'ConfBottomBarHoverOpacity' : 'Prilikom prelaska mišem',
		'ConfBottomBarOpacity' : 'Providnost donje trake sa menijima',
		'ConfCalendarBirthDate' : 'Ukljuci datum rodenja korisnika u detaljima dogadaja.',
		'ConfCalendarFullName' : 'Dodaj i prezime korisnika u naslovu rodendana.',
		'ConfChatDifferentiate' : 'Oznaci dostupne prijatelje podebljanim slovima a neaktivne kosim slovima.',
		'ConfChatHideIdle' : 'Sakrij neaktivne prijatelje.',
		'ConfDelayPopupPics' : 'Ukljuci kratak zastoj pre prikazivanja uvecanih slika.',
		'ConfDelayPopupPicsTimeout' : 'Zastoj pre prikazivanja uvecanih slika, u milisekundama (podrazumevano=500):',
		'ConfDownloadVideo' : 'Dodaj vezu za preuzimanje video snimka sa stranice za video. (Možda ce vam trebati <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Automatsko ponovno ucitavanje stranice nakon 5 sekundi, u slucaju greške.',
		'ConfExport' : 'Da biste izvezli svoja podešavanja, kopirajte tekst koji sledi i sacuvajte ga u datoteku.',
		'ConfExternalPopup' : 'Prikaži uvecane slike fotografija sa spoljašnjih stranica. <sup>beta</sup>',
		'ConfFacebookArdMalangLanguage' : 'Jezik ArdMalang Script-a',
		'ConfFacebookTimestamps' : 'Prikaži Fejsbuk vreme (npr. "pre 3 sata").',
		'ConfFBFTimestamps' : 'Dodaj ArdMalang Script vreme posle Fejsbuk vremena (npr. "11:45").',
		'ConfFBFTimestamps24' : 'Prikaži ArdMalang Script vremena u 24-casovnom obliku.',
		'ConfFriendRequestCountInTitle' : 'Prikaži broj zahteva za prijateljstvo u naslovu stranice.',
		'ConfGoogleApps' : 'Napravi veze za Google kalendar, pogodne za Google ove aplikacije.',
		'ConfGoogleAppsDomain' : 'Domen',
		'ConfGoogleCalendar' : 'Dodaj veze za dodavanje rodendana i dogadaja u <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google kalendar</a>.',
		'ConfGoogleLanguage' : 'Jezik za <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google prevodilac</a>',
		'ConfHideApplicationStories' : 'Sakrij obaveštenja o aplikacijama.',
		'ConfHideEventStories' : 'Sakrij obaveštenja o dogadajima.',
 		'ConfHideFacebookCountInTitle' : 'Sakrij Fejsbukov broj novih primljenih poruka.',
		'ConfHideFriendStories' : 'Sakrij obaveštenja o prijateljstvima.',
		'ConfHideGroupStories' : 'Sakrij obaveštenja o grupama.',
 		'ConfHideLikeStories' : 'Sakrij obaveštenja o "dopada mi se" stavkama.',
		'ConfHideLinkStories' : 'Sakrij obaveštenja o vezama.',
		'ConfHideNoteStories' : 'Sakrij obaveštenja o zapisima.',
		'ConfHidePhotoStories' : 'Sakrij obaveštenja o fotografijama.',
		'ConfHideProfilePicStories' : 'Sakrij obaveštenja o slikama na profilu.',
		'ConfHideRead' : 'U najnovijim dešavanjima sakrij stavke koje su oznacene kao procitane.',
		'ConfHideRelationshipStories' : 'Sakrij obaveštenja o statusima veze.',
		'ConfHideStatusStories' : 'Sakrij promene statusa.',
		'ConfHideVideoStories' : 'Sakrij obaveštenja o video zapisima.',
		'ConfHideWallStories' : 'Sakrij obaveštenja sa zida.',
 		'ConfHomeBeta' : 'Prikaži odeljak sa Fejsbukovim najavama.',
		'ConfHomeChat' : 'Prikaži odeljak sa caskanjem.',
		'ConfHomeEvents' : 'Prikaži odeljak sa dogadajima.',
		'ConfHomeFindFriends' : 'Prikaži "Poveži se sa" odeljak.',
		'ConfHomeLeftAlign' : 'Poravnaj sadržaj pocetne stranice po levoj strani.',
		'ConfHomeLeftColumn' : 'Prikaži levu kolonu.',
		'ConfHomeLeftColumnFixed' : 'Neka leva kolona bude vidljiva i prilikom pomeranja stranice na dole.',
		'ConfHomeLink' : 'Prikaži vezu za Pocetnu stranicu na gornjoj traci sa menijima.',
		'ConfHomeNavigation' : 'Prikaži odeljak za navigaciju.',
		'ConfHomePokes' : 'Prikaži "Bockanje" odeljak.',
		'ConfHomeProfile' : 'Prikaži "Profil" odeljk.',
 		'ConfHomeRecommendations' : 'Prikaži preporuke (Osobe koje možda poznaješ, Preporucene stranice itd.).',
		'ConfHomeRequests' : 'Prikaži "Zahtevi" odeljak.',
		'ConfHomeRightColumn' : 'Prikaži desnu kolonu.',
		'ConfHomeStretch' : 'Raširi pocetnu stranicu na punu širinu prozora pretraživaca.',
 		'ConfHomeStretchComments' : 'Raširi komentare na pocetnoj stranici.',
		'ConfiCalendar' : 'Dodaj veze za preuzimanje <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> datoteke sa svim rodendanima.',
		'ConfImport' : 'Da bise kasnije uvezli svoja podešavanja, zamenite tekst koji sledi sa tekstom koji ste prethodno sacuvali i kliknite "Uvoz".',
		'ConfInboxCountInTitle' : 'Prikaži broj novih poruka u naslovu stranice.',
		'ConfLogoutLink' : 'Dodaj vezu za odjavljivanje na gornju traku sa menijima.',
		'ConfNotificationCountInTitle' : 'Prikaži broj novih obaveštenja u naslovu stranice.',
		'ConfNewTabSearch' : 'Kada pritisnem CTRL + Enter za pretragu, otvori rezultate pretrage u novoj kartici/prozoru.',
		'ConfPageTitle' : 'Ukloni "Facebook |" iz naslova svih stranica.',
		'ConfPhotoPopup' : 'Prikaži vece verzije fotografija prilikom prelaska mišem.',
		'ConfPopupAutoClose' : 'Automatski zatvori uvecane slike.',
		'ConfPopupSmartAutoClose' : 'Ne zatvaraj uvecane slike ako je pokazivac miša na njima.',
		'ConfPopupPosition' : 'Položaj uvecanih slika',
		'ConfProcessInterval' : 'Interval za obradu stranice, u milisekundama (podrazumevano=1000):',
		'ConfProfileLink' : 'Prikaži vezu za Profil na gornju traku sa menijima.',
		'ConfProfilePicPopup' : 'Prikaži vece verzije slika na profilu prilikom prelaska mišem',
		'ConfProtocolLinks' : 'Pretvori nadimke programa za komunikaciju (Google Talk, Windows Live i dr.) sa profila u veze kojima ce se zapoceti caskanje.',
		'ConfSectionAbout' : 'O dodatku ArdMalang Script',
		'ConfSectionAdvanced' : 'Više opcija',
		'ConfSectionEvents' : 'Rodendani/dogadaji',
		'ConfSectionImportExport' : 'Uvoz/Izvoz',
		'ConfSectionFeeds' : 'Novosti',
		'ConfSectionHomePage' : 'Pocetna stranica',
		'ConfSectionLiveFeed' : 'Najnovije',
		'ConfSectionMenu' : 'Meniji/caskanje',
		'ConfSectionOther' : 'Ostale opcije',
		'ConfSectionPageTitle' : 'Naslov stranice',
		'ConfSectionPictures' : 'Slike',
		'ConfSectionShortcuts' : 'Precice sa tastature',
		'ConfSecureLinks' : 'Prisili usmeravanje Fejsbuk veza na HTTPS stranice.',
		'ConfShortcutList' : '<b>Precice sa tastature</b> (razlikuju se mala i velika slova):<br /><br /><i>Sa bilo koje stranice:</i><br /> <b>A</b> - Albumi/fotografije<br /> <b>B</b> - Spisak dostupnih prijatelja<br /> <b>C</b> - ArdMalang Script podešavanja<br /> <b>D</b> - Rodendani<br /> <b>E</b> - Dogadaji<br /> <b>F</b> - Prijatelji<br /> <b>H</b> - Pocetna stranica<br /> <b>I</b> - Primljene poruke<br /> <b>K</b> - dodaj zabelešku<br /> <b>L</b> - Oznaci vezu za odjavu (pritisnite Enter nakon toga za odjavljivanje)<br /> <b>N</b> - Obaveštenja<br /> <b>P</b> - Profil<br /> <b>R</b> - Zahtevi<br /> <b>S</b> - Prelazak na polje za pretragu<br /> <b>T</b> - Prevedi odabrani tekst<br /> <b>?</b> - Prikaži izveštaj o grešci ArdMalang Script-a<br /> <b><escape></b> - Zatvori iskacuce prozore koje je napravio ArdMalang Script<br /><br /><i>Sa pocetne stranice (filteri)</i>:<br /> <b>a</b> - Stranice<br /> <b>f</b> - Najnovije<br /> <b>g</b> - Grupe<br /> <b>l</b> - Veze<br /> <b>n</b> - Novosti<br /> <b>p</b> - Fotografije<br /> <b>s</b> ili <b>u</b> - Promene statusa<br /> <b>t</b> - Beleške<br /> <b>v</b> - Video<br /><br /><i>Sa profila</i>:<br /> <b>i</b> - Informacije<br /> <b>p</b> - Fotografije<br /> <b>w</b> - Zid<br /> <b>x</b> - Okviri<br /><br /><i>Sa stranica sa nabrajanjem (prethodna, sledca, itd.)</i><br /> <b><strelica levo></b> - Prethodna<br /> <b><strelica desno></b> - Sledeca<br /> <b><šift> + <strelica levo></b> - Prva (ako je dostupno)<br /> <b><šift> + <strelica desno></b> - Poslednja (ako je dostupno)<br /><br /><i>Prilikom pregledavanja albuma/fotografija:</i><br /> <b>a</b> - Ucitaj sve slicice (ako je dostupno)<br /> <b>b</b> - Prikaži velike slike<br /> <b>c</b> - Prikaži komentare<br /> <b>k</b> - Nazad na album<br /> <b>m</b> - Fotografije sa (korisnikom) i sa mnom<br /><br /><i>Pri pregledavanju skorašnjih albuma i postavljenih/oznacenih fotografija:</i><br /> <b>a</b> ili  <b>r</b> - Skorašnji albumi<br /> <b>m</b> ili  <b>u</b> - Postavljeno preko mobilnog telefona<br /> <b>o</b> - Fotografije na kojima sam ja<br /> <b>p</b> - Moje fotografije<br /> <b>t</b> ili  <b>f</b> - Oznaceni prijatelji',
		'ConfShortcuts' : 'Omoguci precice sa tastature.',
		'ConfSign' : 'Prikaži korisnikov horoskopski znak na njegovom profilu (ukoliko je naveden pun datum rodenja).',
		'ConfTopBarFixed' : 'Zadrži gornju traku sa menijima na ekranu i prilikom pomeranja stranice na dole.',
		'ConfTopBarHoverOpacity' : 'Prilikom prelaska mišem',
		'ConfTopBarOpacity' : 'Providnost Gornje trake sa menijima',
		'ConfUpdates' : 'Svakodnevno proveravaj Userscripts.org za nadogradnje ArdMalang Script-a. Ili <a href="#" id="fbfUpdateLink" onclick="return false;">proveri sada</a>.',
		'DownloadVideo' : 'Preuzmi video',
		'ExportICalendarFile' : 'Izvezi iCalendar datoteku',
		'ExportICalendarFileWarning' : '(Ovo može da potraje ako imate mnogo prijatelja)',
		'FacebookArdMalangConflict' : 'ArdMalang Script se sada zove ArdMalang Script. Zbog promene imena moracete rucno da uklonite ArdMalang Script iz svog pregledaca da ne bi došlo do ometanja izmedu ove dve skripte. Ako niste sigurni kako da uklonite skriptu, <a %s>kliknite ovde za uputstvo</a>.',
		'fullAlbumLoaded' : 'ceo album je ucitan',
		'Import' : 'Uvoz',
		'ImportConfirm' : 'Da li ste sigurni da želite da uvezete ova podešavanja?\nVaša trenutna podešavanja ce biti poništena.',
		'ImportFailure' : 'Došlo je do greške prilikom uvoza vaših podešavanja.',
		'ImportSuccess' : 'Uvoz je završen. Da li želite da osvežite stranicu?',
		'Left' : 'Levo',
		'LoadingAllPhotos' : 'Ucitavanje svih fotografija...',
		'loadingFullAlbum' : 'ucitavanje svih albuma...',
		'LoadingPic' : 'Ucitavanje slike...',
		'LoadPhotosWarning' : 'Ucitavanje svih fotografija može da potraje neko vreme',
		'Months' : new Array('Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'),
		'ProtocolSkype' : 'Pozovi korisnika %s putem programa Skype',
		'ProtocolMSN' : 'Caskaj sa korisnikom %s putem programa Windows Live',
		'ProtocolYahoo' : 'Caskaj sa korisnikom %s putem programa Yahoo Messenger',
		'ProtocolGoogle' : 'Caskaj sa korisnikom %s putem programa Google Talk',
		'ReloadErrorPage' : 'Kliknite da pokušate ponovo, ili sacekajte 5 sekundi',
		'Refresh' : 'Osveži',
		'Remove' : 'Ukloni',
		'Right' : 'Desno',
		'ShowBigPictures' : 'Prikaži velike slike',
		'Signs' : new Array('Jarac','Vodolija','Ribe','Ovan','Bik','Blizanci','Rak','Lav','Devica','Vaga','Škorpija','Strelac'),
		'today' : 'danas',
		'Translators' : 'Prevodioci',
		'UpdateAvailable1' : 'Dostupne su nadogradnje za ArdMalang Script',
		'UpdateAvailable2' : 'Želite li sada da nadogradite?',
		'UpdateHomepage' : 'Idi na pocetnu stranicu',
		'UpdateInstall' : 'Instaliraj odmah',
		'UpdateTomorrow' : 'Podseti me sutra',
 		'ViewAlbumComments' : 'Prikaži komentare albuma',
		'yearsOld' : '%s godina'
	},

	// Danish - Contributed by Mads Jensen (20100210)
	da : {
		'_language' : 'Danish',
		'AddToCalendar' : 'Tilføj til kalender',
		'AddToGoogleCalendar' : 'Tilføj til Google Calendar',
		'all' : 'alle',
		'All' : 'Alle',
		'AllPhotosLoaded' : 'Alle billeder er hentet',
		'Automatic' : 'Automatisk',
		'Birthday' : '%s\'s fødselsdag',
		'BookmarkAdd' : 'Tilføj nyt bogmærke',
		'BookmarkConfirmRemoval' : 'Er du sikker på du vil fjerne bogmærket "%s"?',
		'BookmarkDoesNotExist' : 'Denne side har intet bogmærke.\n\nGå til siden du vil fjerne og prøv igen.',
		'BookmarkExists' : 'Der er allerede et bogmærke til denne side.\n\nGå til siden du vil tilføje et bogmærke for og prøv igen.',
		'BookmarkNamePrompt' : 'Skriv et navn til dette bogmærke:\n%s',
		'BookmarkRemove' : 'Fjern bogmærke',
		'CreatingFile' : 'Opret fil',
		'Close' : 'Luk',
		'ConfigureFacebookArdMalang' : 'Konfigurér ArdMalang Script',
		'ConfigureInstructions' : 'Alle ændringer bliver gemt med det samme, men nogle ændringer vil ikke vises i allerede åbne faneblade.',
		'ConfAge' : 'Vis folks alder på deres profil (hvis de har oplyst fødselsdato).',
		'ConfAutoBigAlbumPictures' : 'Vis automatisk større album billeder, når siden åbnes.',
		'ConfAutoLoadFullAlbum' : 'Hent automatisk miniaturer til alle billeder i et album, på en enkelt side.',
		'ConfAutoLoadTaggedPhotos' : 'Hent automatisk miniaturer til alle taggede billeder i et album, på en enkelt side (Billeder fanebladet på folks profil).',
		'ConfAutoReadMore' : 'Tryk automatisk på  "Vis mere" links.',
		'ConfBigAlbumPictures' : 'Tilføj et link på album sider, til at vise større udgaver af alle billeder på den side.',
		'ConfBookmarks' : 'Tilføj "Bogmærker" til topmenuen.',
		'ConfBottomBarHoverOpacity' : 'Når musen er over',
		'ConfBottomBarOpacity' : 'Gennemsigtighed af menuen nederst på siden',
		'ConfCalendarBirthDate' : 'Inkludér personens fødselsdag i begivenhedens detaljer.',
		'ConfCalendarFullName' : 'Brug personens fulde navn som titlen til fødselsdage (i stedet for kun fornavn).',
		'ConfChatDifferentiate' : 'Brug fed og kursiv for at skelne mellem tilgængelige og optagede venner.',
		'ConfChatHideIdle' : 'Skjul optagede venner.',
		'ConfDelayPopupPics' : 'Tilføj en kort pause før billeder popper op.',
		'ConfDelayPopupPicsTimeout' : 'Pause før billeder popper op, i millisekunder (standard er 500)',
		'ConfDownloadVideo' : 'Tilføj et link til at hente videoer fra "Video" sider. (Du får sikkert brug for en <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV afspiller</a>)',
		'ConfErrorPageReload' : 'Genindlæs applikationsfejl sider efter 5 sekunder.',
		'ConfExternalPopup' : 'Vis eksterne billeder i fuld størrelse. <sup>beta</sup>',
		'ConfFacebookArdMalangLanguage' : 'Sprog i ArdMalang Script',
		'ConfFacebookTimestamps' : 'Vis Facebook tidsstempler (f.eks. "3 timer sider").',
		'ConfFBFTimestamps' : 'Tilføj ArdMalang Script tidsstempler efter Facebook tidsstempler (f.eks. "11:45").',
		'ConfFBFTimestamps24' : 'Vis ArdMalang Script tidsstempler i 24 timers format.',
		'ConfFriendRequestCountInTitle' : 'Vis antallet af anmodninger om venskab i siden titel.',
		'ConfGoogleApps' : 'Lav Google Calendar links kompatible med Google Apps.',
		'ConfGoogleAppsDomain' : 'Domæne',
		'ConfGoogleCalendar' : 'Tilføj links til at tilføje fødselsdage og begivenheder til <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Sprog i <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Skjul applikations beskeder.',
		'ConfHideEventStories' : 'Skjul begivenhed beskeder.',
		'ConfHideFanStories' : 'Skjul fan beskeder.',
		'ConfHideFriendStories' : 'Skjul ven beskeder.',
		'ConfHideGroupStories' : 'Skjul gruppe beskeder.',
		'ConfHideLinkStories' : 'Skjul link beskeder.',
		'ConfHidePhotoStories' : 'Skjul billede beskeder.',
		'ConfHideProfilePicStories' : 'Skjul profilbillede beskeder.',
		'ConfHideRead' : 'Skjul beskeder der er markeret som læst.',
		'ConfHideRelationshipStories' : 'Skjul parforholds beskeder.',
		'ConfHideStatusStories' : 'Skjul status beskeder.',
		'ConfHideVideoStories' : 'Skjul video beskeder.',
		'ConfHideWallStories' : 'Skjul væg beskeder.',
		'ConfHomeChat' : 'Vis Chat sektionen.',
		'ConfHomeEvents' : 'Vis Begivenheder sektionen.',
		'ConfHomeFindFriends' : 'Vis Skab forbindelser til venner sektionen.',
		'ConfHomeLeftAlign' : 'Venstrestil indholdet på forsiden.',
		'ConfHomeLeftColumn' : 'Vis venstre kolonne.',
		'ConfHomeLeftColumnFixed' : 'Hold venstre kolonne synlig, selv efter der er scrollet ned på siden.',
		'ConfHomePeopleYouMayKnow' : 'Vis Forslag sektionen.',
		'ConfHomeNavigation' : 'Vis Navigation sektionen.',
		'ConfHomePokes' : 'Vis Prik sektionen.',
		'ConfHomeProfile' : 'Vis Profil sektionen.',
		'ConfHomeRequests' : 'Vis Anmodninger sektionen.',
		'ConfHomeRightColumn' : 'Vis højre kolonne.',
		'ConfHomeStretch' : 'Stræk forsiden til browser vinduets fulde bredde.',
		'ConfiCalendar' : 'Tilføj links til at hente en <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> fil med alle fødselsdage.',
		'ConfInboxCountInTitle' : 'Vis antallet af nye beskeder i indbakken, i sidens titel.',
		'ConfLogoutLink' : 'Tilføj et "Log ud" link til top menuen.',
		'ConfNotificationCountInTitle' : 'Vis antallet af nye notifikationer i sidens titel.',
		'ConfNewTabSearch' : 'Tving søgeresultater til at åbne i et nyt vindue, når der trykkes CTRL + Enter ved søgning.',
		'ConfPageTitle' : 'Fjern "Facebook |" fra titlen på alle sider.',
		'ConfPhotoPopup' : 'Popop større udgaver af billeder når musen holdes over.',
		'ConfPopupAutoClose' : 'Luk popop billeder automatisk.',
		'ConfPopupSmartAutoClose' : 'Stop popop billeder fra at lukke automatisk hvis musen er over.',
		'ConfPopupPosition' : 'Position for popop billeder',
		'ConfProcessInterval' : 'Interval mellem håndtering af siden, i millisekunder (standard er 1000)',
		'ConfProfilePicPopup' : 'Popop større udgaver af profilbilleder når musen holdes over',
		'ConfProtocolLinks' : 'Lav IMs på profiler til links der starter en samtale (Google Talk, Windows Live o.s.v.).',
		'ConfSectionAbout' : 'Omkring ArdMalang Script',
		'ConfSectionAdvanced' : 'Avanceret',
		'ConfSectionEvents' : 'Fødselsdage/Begivenheder',
		'ConfSectionFeeds' : 'Beskeder',
		'ConfSectionHomePage' : 'Forside',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menu/Chat',
		'ConfSectionOther' : 'Andre indstillinger',
		'ConfSectionPageTitle' : 'Side titel',
		'ConfSectionPictures' : 'Billeder',
		'ConfSectionShortcuts' : 'Tastatur genveje',
		'ConfSecureLinks' : 'Tving Facebook links til at bruge HTTPS.',
		'ConfShortcutList' : '<b>Tastatur genveje</b> (forskel på store og små bogstaver):<br /><br /><i>Fra enhver side:</i><br />&nbsp;<b>A</b> - Album/billeder<br />&nbsp;<b>B</b> - Skift venne liste (online venner)<br />&nbsp;<b>C</b> - ArdMalang Script konfiguration<br />&nbsp;<b>D</b> - Fødselsdage<br />&nbsp;<b>E</b> - Begivenheder<br />&nbsp;<b>F</b> - Venner<br />&nbsp;<b>H</b> - Forside<br />&nbsp;<b>I</b> - Indbakke<br />&nbsp;<b>K</b> - Tilføj bogmærke<br />&nbsp;<b>L</b> - Vælg Log ud linket (tryk Enter efterfølgende for at logge ud)<br />&nbsp;<b>N</b> - Notifikationer<br />&nbsp;<b>P</b> - Din profil<br />&nbsp;<b>R</b> - Anmodninger<br />&nbsp;<b>S</b> - Hop til søgefeltet<br />&nbsp;<b>T</b> - Oversæt valgte tekst<br />&nbsp;<b>?</b> - Vis ArdMalang Script debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Luk popops fra ArdMalang Script<br /><br /><i>Fra forsiden (filtre)</i>:<br />&nbsp;<b>a</b> - Sider<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Grupper<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - Nyheder<br />&nbsp;<b>p</b> - Billeder<br />&nbsp;<b>s</b> eller <b>u</b> - Status opdateringer<br />&nbsp;<b>t</b> - Noter<br />&nbsp;<b>v</b> - Videoer<br /><br /><i>Fra profiler</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Billeder<br />&nbsp;<b>w</b> - Væg<br />&nbsp;<b>x</b> - Bokse<br /><br /><i>Fra sider med bladrefunktion (frem, tilbage o.s.v.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Forrige<br />&nbsp;<b>&lt;right arrow&gt;</b> - Næste<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - Første (når muligt)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Sidste (når muligt)<br /><br /><i>Under visning af album/billeder:</i><br />&nbsp;<b>a</b> - Hent alle miniaturer (når muligt)<br />&nbsp;<b>b</b> - Vis store billeder<br />&nbsp;<b>c</b> - Se kommentarer<br />&nbsp;<b>k</b> - Tilbage til album<br />&nbsp;<b>m</b> - Billeder af (person) og mig<br /><br /><i>Under visning af nyeste album og uploadede/taggede billeder:</i><br />&nbsp;<b>a</b> eller <b>r</b> - Nyeste Album<br />&nbsp;<b>m</b> eller <b>u</b> - Telefon uploads<br />&nbsp;<b>o</b> - Billeder af mig<br />&nbsp;<b>p</b> - Mine billeder<br />&nbsp;<b>t</b> eller <b>f</b> - Tagged venner',
		'ConfShortcuts' : 'Slå tastaturgenveje til.',
		'ConfSign' : 'Vis folks stjernetegn på deres profil (hvis de har oplyst en fødsesdato).',
		'ConfTopBarFixed' : 'Hold topmenuen synlig på siden, selv efter der er scrollet ned.',
		'ConfTopBarHoverOpacity' : 'Når musen er over',
		'ConfTopBarOpacity' : 'Gennemsigtighed af topmenu linien',
		'ConfUpdates' : 'Undersøg Userscripts.org dagligt for opdateringer til ArdMalang Script. Eller <a href="#" id="fbfUpdateLink" onclick="return false;">undersøg nu</a>.',
		'DownloadVideo' : 'Hent video',
		'ExportICalendarFile' : 'Eksportér iCalendar fil',
		'ExportICalendarFileWarning' : '(Dette vil tage lang tid, hvis du har mange venner)',
		'FacebookArdMalangConflict' : 'ArdMalang Script vil fremover hedde ArdMalang Script. På grund af navneskiftet, skal du manuelt afinstallere ArdMalang Script fra dine browsere, da de to scripts ellers vil komme i konflikt med hinanden. Hvis du er usikker på hvordan man afinstallerer et Userscript, så <a %s>tryk her for instruktioner</a>.',
		'fullAlbumLoaded' : 'Hele albummet hentet',
		'Left' : 'Venstre',
		'ListeningRestarted' : 'ArdMalang Script lytter efter ændringer igen.',
		'ListeningStopped' : 'ArdMalang Script er stoppet med at lytte efter ændringer.\nTryk L (SHIFT + l) for at starte igen',
		'LoadingAllPhotos' : 'Henter alla billeder...',
		'loadingFullAlbum' : 'henter helt album...',
		'LoadingPic' : 'Henter billede...',
		'LoadPhotosWarning' : 'Indhentning af alle billeder tager mugligvis lang tid',
		'Months' : new Array('Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December'),
		'ProtocolSkype' : 'Ring til %s med Skype',
		'ProtocolMSN' : 'Chat med %s på Windows Live',
		'ProtocolYahoo' : 'Chat med %s på Yahoo Messenger',
		'ProtocolGoogle' : 'Chat med %s på Google Talk',
		'ReloadErrorPage' : 'Tryk for at prøve igen eller vent 5 sekunder',
		'Refresh' : 'Genindlæs',
		'Remove' : 'Fjern',
		'Right' : 'Højre',
		'ShowBigPictures' : 'Vis store billeder',
		'Signs' : new Array('Stenbukken','Vandbæreren','Fiskene','Vædderen','Tyren','Tvillingerne','Krebsen','Løven','Jomfruen','Vægten','Skorpionen','Skytten'),
		'today' : 'i dag',
		'UpdateAvailable1' : 'En opdatering er tilgængelig til Sinar Script',
		'UpdateAvailable2' : 'Vil du opdatere nu?',
		'UpdateHomepage' : 'Gå til hjemmesiden',
		'UpdateInstall' : 'Installér nu',
		'UpdateTomorrow' : 'Påmind mig i morgen',
		'yearsOld' : '%s år gammel'
	},

	// Czech - Contributed by Caken (20100823)
	cs : {
		'_language' : 'Czech',
		'AddToCalendar' : 'Pridat do kalendáre',
		'AddToGoogleCalendar' : 'Pridat do Google kalendáre',
		'all' : 'vše',
		'All' : 'Vše',
		'AllPhotosLoaded' : 'Všechny fotografie nactené',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narozeniny %s',
		'BookmarkAdd' : 'Pridej záložku',
		'BookmarkExists' : 'Tato stránka už je v záložkách.',
		'BookmarkNamePrompt' : 'Vložte jméno této záložky:\n%s',
		'BookmarksConfirmRemoval' : 'Jste si jistí, že chcete odstranit tuto záložku?',
		'BookmarksManage' : 'Spravuj záložky',
		'BookmarksRemoveSelected' : 'Odstran vybrané záložky',
		'Bookmarks' : 'Záložky',
		'BrowserUnsupported' : 'Váš prohlížec nepodporuje tento program.',
		'CreatingFile' : 'Vytvorení souboru',
		'Close' : 'Zavrít',
		'ConfigureFacebookSinar' : 'Nastavení - Sinar Script',
		'ConfigureInstructions' : 'Všechny zmeny jsou ukládány okamžite, ale nekteré se nemusí projevit na již otevrených kartách.',
		'ConfAge' : 'Zobrazit vek lidí v jejich profilech (pokud poskytli celý datum narození)',
		'ConfAlbumComments' : 'Pridá odkaz na stránku alba a ukáže všechny komentáre k danému albu.',
		'ConfApplicationWhitelist' : 'Seznam povolených aplikací - Vložte ID aplikace, kterou chcete chránit pred skrytím. ID oddelujte mezerami.',
		'ConfAutoBigAlbumPictures' : 'Automaticky pri otevrení stránky zobrazit vetší obrázky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky nacítat miniatury všech obrázku v albumu na jedné stránce',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky nacítat miniatury všech fotograficí s popisem na jedné stránce (karta Fotky v profilech lidí)',
		'ConfAutoReadMore' : 'Automaticky kliknout na odkazy &quot;císt dále&quot;',
		'ConfBigAlbumPictures' : 'Pridat odkaz na stránkách albumu na zobrazení vetších verzí všech obrázku na této strane',
		'ConfBookmarks' : 'Prijde menu záložek do vrchní nabídky.',
		'ConfBottomBarHoverOpacity' : 'Pri najetí myší',
		'ConfBottomBarOpacity' : 'Pruhlednost spodního panelu s nabídkou',
		'ConfCalendarBirthDate' : 'Zahrnout narozeniny osoby do podrobnosti událostí',
		'ConfCalendarFullName' : 'Použít jméno celé jméno osoby jako název narozenin (namístno krestního jména)',
		'ConfChatDifferentiate' : 'Použít tucné písmo a kurzívu na rozlišení pripojených a necinných prátel',
		'ConfChatHideIdle' : 'Skrýt necinné prátele',
		'ConfDelayPopupPics' : 'Vyckat 0,5 sekundy pred nactením obrázku v kontextovém okne',
		'ConfDelayPopupPicsTimeout' : 'Zpoždení pred zobrazením obrázku v kontextovém okne v milisekundách (defaultne=500):',
		'ConfDownloadVideo' : 'Pridat odkaz na prevzetí videí ze stránek s videem (možná potreba <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV prehrávac</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundách znova nacíst chybové stránky aplikácí',
		'ConfExport' : 'Pro exportování vašeho nastavení, zkopírujte následující text a uložte ho do souboru.',
		'ConfExternalPopup' : 'Externí obrázky plné velikosti v kontextovém okne <sup>beta</sup>',
		'ConfFacebookSinarLanguage' : 'Jazyk pro Sinar Script',
		'ConfFacebookTimestamps' : 'Zobrazit casové znacky Facebooku (t. j. "pred 3 hodinami")',
		'ConfFBFTimestamps' : 'Pridat casové znacky skriptu Sinar Script za casové znacky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'Zobrazit casové znacny skriptu Sinar Script v 24-hodinovém formáte',
		'ConfFriendRequestCountInTitle' : 'Zobraz pocet nových žádostí o prátelství v titulku stránky.',
		'ConfGoogleApps' : 'Vytvorit odkazy pro Google Calendar kompatibilní s Google Apps',
		'ConfGoogleAppsDomain' : 'Doména',
		'ConfGoogleCalendar' : 'Pridat odkazy na zarazení narozenin a událostí do aplikace <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pro <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>.',
		'ConfHideApplicationStories' : 'Skrýt v aktualitách príspevky o aplikacích.',
		'ConfHideEventStories': 'Skrýt v aktualitách príspevky z událostí.',
		'ConfHideFacebookCountInTitle' : 'Skrýt pocet nových zpráv.',
		'ConfHideFriendStories': 'Skrýt v aktualitách príspevky prátel.',
		'ConfHideGroupStories': 'Skrýt v aktualitách príspevky o skupinách.',
		'ConfHideLikeStories' : 'Skrýt príspevky uživateli xxx se líbí.',
		'ConfHideLinkStories' : 'Skrýt príspevky o odkazech.',
		'ConfHideNoteStories' : 'Skrýt príspevky o poznámkách.',
		'ConfHidePhotoStories' : 'Skrýt príspevky o fotkách.',
		'ConfHideProfilePicStories' : 'Skrýt príspevky o profilových fotkách.',
		'ConfHideRead' : 'Skrýt v aktualitách položky, které byly oznacené jako prectené.',
		'ConfHideRelationshipStories' : 'Skrýt v aktualitách príspevky o vztahu.',
		'ConfHideStatusStories' : 'Skrýt príspevky se statusy.',
		'ConfHideVideoStories' : 'Skrýt príspevky o videích.',
		'ConfHideWallStories' : 'Skryj príspevky na zdi.',
		'ConfHomeBeta' : 'Zobraz Beta Tester sekci.',
		'ConfHomeChat' : 'Zobrazit cást chat.',
		'ConfHomeEvents' : 'Zobrazit cást Události',
		'ConfHomeFindFriends' : 'Zobrazit cást Spojte se s práteli',
		'ConfHomeLeftAlign' : 'Zarovat obsah stránky Domu doleva',
		'ConfHomeLeftColumn' : 'Zobraz levý sloupec.',
		'ConfHomeLeftColumnFixed' : 'Nech levý sloupec viditelný i pri scrolování dolu.',
		'ConfHomeLink' : 'Zobraz ve vrchní nabídce odkaz na úvodní stránku.',
		'ConfHomeNavigation' : 'Zobrazit cást navigace.',
		'ConfHomePokes' : 'Zobrazit cást Štouchnutí',
		'ConfHomeProfile' : 'Zobraz cást Profil.',
		'ConfHomeRecommendations' : 'Zobraz doporucení (Mohli byste znát, doporucené stránky, atd.).',
		'ConfHomeRequests' : 'Zobrazit cást Žádosti',
		'ConfHomeRightColumn' : 'Zobrazit pravý sloupec',
		'ConfHomeStretch' : 'Roztáhnout úvodní stránku na šírku okna prohlížece',
		'ConfHomeStretchComments' : 'Roztáhnout komentáre na úvodní stránce.',
		'ConfiCalendar' : 'Pridat odkazy na prevzetí souboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> se všemi narozeninami',
		'ConfImport' : 'Pro importování nastavení prepište následující text predem exportovaným a poté kliknete na "Import".',
		'ConfInboxCountInTitle' : 'Zobrazit v názvu stránky pocet neprectených zpráv',
		'ConfLogoutLink' : 'Pridej odhlašovací odkaz do vrchní nabídky.',
		'ConfNotificationCountInTitle' : 'Zobraz pocet nových upozornení v titulku stránky.',
		'ConfNewTabSearch' : 'Pri vyhledávání otevrít stisknutím Ctrl+Enter výsledky hledání na nové karte/v novém okne',
		'ConfPageTitle' : 'Odstranit "Facebook |" z názvu všech stránek',
		'ConfPhotoPopup' : 'Vetší verze fotek v kontextovém menu po najetí myší',
		'ConfPopupAutoClose' : 'Automaticky zavírat kontextová okna s obrázkem',
		'ConfPopupSmartAutoClose' : 'Zabránit automatickému uzavrení kontextového okna s obrázkem',
		'ConfPopupPosition' : 'Umístení kontextového okna s obrázkem',
		'ConfProcessInterval' : 'Interval zpracování stránky v milisekundách (defaultne=1000):',
		'ConfProfileLink' : 'Zobraz ve vrchní nabídce odkaz na profil.',
		'ConfProfilePicPopup' : 'Vetší verze profilových fotek v kontextovém okne po najetí myší',
		'ConfProtocolLinks' : 'Zmenit ID pro okamžitou správu na odkazy spouštející konverzaci (Google Talk, Windows Live atd.)',
		'ConfSectionAbout' : 'O Sinar Scriptu',
		'ConfSectionAdvanced' : 'Upresnení',
		'ConfSectionEvents' : 'Narozeniny/Události',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Príspevky',
		'ConfSectionHomePage' : 'Stránka Doma',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'Nabídky/Chat',
		'ConfSectionOther' : 'Další možnosti',
		'ConfSectionPageTitle' : 'Titulek stránky',
		'ConfSectionPictures' : 'Obrázky',
		'ConfSectionShortcuts' : 'Klávesové zkratky',
		'ConfSecureLinks' : 'Presmerovat odkazy Facebooku na stránky HTTPS',
		'ConfShortcutList' : '<b>Klávesové zkratky</b> (rozlišují se malá/velká písmena):<br /><br /><i>Z libovolné stránky:</i><br />&nbsp;<b>A</b> - Alba/fotky<br />&nbsp;<b>B</b> - Prepnout seznam prátel (online prátel)<br />&nbsp;<b>C</b> - Konfigurace skriptu Sinar Script<br />&nbsp;<b>D</b> - Narozeniny<br />&nbsp;<b>E</b> - Události<br />&nbsp;<b>F</b> - Prátelé<br />&nbsp;<b>H</b> - Domu<br />&nbsp;<b>I</b> - Prijaté zprávy<br />&nbsp;<b>K</b> - Pridej záložku<br />&nbsp;<b>L</b> - Odhlášení (po odhlášení stisknete Enter)<br />&nbsp;<b>N</b> - Upozornení<br />&nbsp;<b>P</b> - Váš profil<br />&nbsp;<b>R</b> - Žádosti<br />&nbsp;<b>S</b> - Preskocit na pole Hledat<br />&nbsp;<b>T</b> - Preložit vybraný text<br />&nbsp;<b>?</b> - Zobrazit informace o ladení skriptu Sinar Script<br />&nbsp;<b>&lt;escape&gt;</b> - Zavrít kontextová okna vytvorené skriptem Sinar Script<br /><br /><i>Ze stránky Domu (filtry)</i>:<br />&nbsp;<b>a</b> - Stránky<br />&nbsp;<b>f</b> - Aktuality<br />&nbsp;<b>g</b> - Skupiny<br />&nbsp;<b>l</b> - Odkazy<br />&nbsp;<b>n</b> - Novinky<br />&nbsp;<b>p</b> - Fotky<br />&nbsp;<b>s</b> nebo <b>u</b> - Co delají ostatní<br />&nbsp;<b>t</b> - Poznámky<br />&nbsp;<b>v</b> - Videa<br /><br /><i>Z profilu</i>:<br />&nbsp;<b>i</b> - Informace<br />&nbsp;<b>p</b> - Fotky<br />&nbsp;<b>w</b> - Zed<br />&nbsp;<b>x</b> - Kontejner<br /><br /><i>Ze stránek s navigací (dozadu, dopredu atd.)</i><br />&nbsp;<b>&lt;levá šipka&gt;</b> - Predchozí<br />&nbsp;<b>&lt;pravá šipka&gt;</b> - Následující<br />&nbsp;<b>&lt;shift&gt; + &lt;levá šipka&gt;</b> - První (pokud je dispozici)<br />&nbsp;<b>&lt;shift&gt; + &lt;pravá šipka&gt;</b> - Poslední (pokud je k dispozici)<br /><br /><i>Pri prohlížení alb/fotek:</i><br />&nbsp;<b>a</b> - Nacítat všechny miniatury (pokud je k dispozici)<br />&nbsp;<b>b</b> - Zobrazit velké obrázky<br />&nbsp;<b>c</b> - Zobrazit komentáre<br />&nbsp;<b>k</b> - Zpet do alba<br />&nbsp;<b>m</b> - Fotky (osoby) a moje<br /><br /><i>Pri prohlížení nejnovejších alb a nahraných/oznacených fotek:</i><br />&nbsp;<b>a</b> nebo &nbsp;<b>r</b> - Nejnovejší alba<br />&nbsp;<b>m</b> nebo &nbsp;<b>u</b> - Nahrané z mobilu<br />&nbsp;<b>o</b> - Fotky mé osoby<br />&nbsp;<b>p</b> - Mé fotky<br />&nbsp;<b>t</b> nebo &nbsp;<b>f</b> - Oznacení prátelé',
		'ConfShortcuts' : 'Povolit klávesové zkratky',
		'ConfSign' : 'Zobrazit znamení lidí v jejich profilu (pokud uvedli svuj datum narození)',
		'ConfTopBarFixed' : 'Vždy zobrazit vrchní panel s nabídkou - i pri posouvání stránky',
		'ConfTopBarHoverOpacity' : 'Pri najetí myší',
		'ConfTopBarOpacity' : 'Pruhlednost vrchního panelu s nabídkou',
		'ConfUpdates' : 'Denne na Userscripts.org overovat aktualizace pro Sinar Script, prípadne <a href="#" id="fbfUpdateLink" onclick="return false;">zkontrolovat nyní</a>.',
		'DownloadVideo' : 'Stáhnout video',
		'ExportICalendarFile' : 'Exportovat soubor iCalendar',
		'ExportICalendarFileWarning' : '(Pokud máte mnoho prátel, muže to chvíli trvat.)',
		'FacebookSinarConflict' : 'Facebook Fifex je nyní znám jako Sinar Script.<br /><br />Protože se zmenilo jméno, musíte manuálne odinstalovat Facebook Sinar z vašeho prohlížece.<br /><br />Pokud si nevíte jak na to <a %s>pokracujte zde</a>.',
		'fullAlbumLoaded' : 'celý album je nactený',
		'Import' : 'Import',
		'ImportConfirm' : 'Opravdu chcete importovat toto nastavení?\nStávající nastavení bude ztraceno.',
		'ImportFailure' : 'Pri importování nastavení došlo k chybe.',
		'ImportSuccess' : 'Import kompletní. Chcete aktualizovat stránku?',
		'Left' : 'Vlevo',
		'LoadingAllPhotos' : 'Nacítají sa všechny fotky...',
		'loadingFullAlbum' : 'Nacítá se celý album...',
		'LoadingPic' : 'Nacítá se obrázek...',
		'LoadPhotosWarning' : 'Nacítání všech fotek muže chvíli trvat',
		'Months' : new Array('Leden','Únor','Brezen','Duben','Kveten','Cerven','Cervenec','Srpen','Zárí','Ríjen','Listopad','Prosinec'),
		'ProtocolSkype' : 'Volat %s pomocí Skype',
		'ProtocolMSN' : 'Chatovat s %s pomocí Windows Live',
		'ProtocolYahoo' : 'Chatovat s %s pomocí Yahoo Messenger',
		'ProtocolGoogle' : 'Chatovat s %s pomocí Google Talk',
		'ReloadErrorPage' : 'Kliknete na Zkusit znovu nebo vyckejte 5 sekund',
		'Refresh' : 'Obnovit',
		'Remove' : 'Odstranit',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'Zobrazit velké obrázky',
		'Signs' : new Array('Kozoroh','Vodnár','Ryba','Beran','Býk','Blíženci','Rak','Lev','Panna','Váhy','Štír','Strelec'),
		'today' : 'dnes',
		'Translators' : 'Prekladatelé',
		'UpdateAvailable1' : 'K dispozici je aktualizace skriptu Sinar Script.',
		'UpdateAvailable2' : 'Chcete aktualizovat nyní?',
		'UpdateHomepage' : 'Prejít na domovskou stránku',
		'UpdateInstall' : 'Nainstalovat',
		'UpdateTomorrow' : 'Pripomenout zítra',
		'ViewAlbumComments' : 'Ukaž komentáre k albu',
		'yearsOld' : '%s let'
	},
	
	// Macedonian - Contributed by Goce Manevski (20100628)
	mk : {
		'_language' : 'Macedonian',
		'AddToCalendar' : '?????? ?? ????????',
		'AddToGoogleCalendar' : '?????? ?? Google ????????',
		'all' : '????',
		'All' : '????',
		'AllPhotosLoaded' : '???? ?????????? ?? ???????',
		'Automatic' : '??????????',
		'Birthday' : '%s\'s ????????',
		'BookmarkAdd' : '?????? ??? ??????????',
		'BookmarkConfirmRemoval' : '???? ?? ??????? ???? ????? ?? ???????? ?????????? "%s"?',
		'BookmarkDoesNotExist' : 'This page has not been bookmarked.\n\nGo to the page you want removed and try again.',
		'BookmarkExists' : '???? ??? ?????????? ?? ???? ????????.\n\n??? ?? ?????????? ??? ????? ?? ?? ???????? ? ????? ?? ????????.',
		'BookmarkNamePrompt' : '????? ??? ?? ???? ??????????:\n%s',
		'BookmarkRemove' : '??????? ??????????',
		'Bookmarks' : '???????????',
		'BrowserUnsupported' : '?????? ?????????? ?? ?? ????????? ????????.',
		'CreatingFile' : '???????? ????????',
		'Close' : '???????',
		'ConfigureFacebookSinar' : '???????????? ?? Sinar Script',
		'ConfigureInstructions' : '???? ??????? ?? ?????? ????????, ?? ????? ??????? ???? ?? ??????? ?? ???? ?????????? ??????.',
		'ConfAge' : '?????? ?? ???????? ?? ????\-?? ?? ??????? ??????? (??? ?? ????? ???????? ?????? ????? ?? ??????).',
		'ConfApplicationWhitelist' : '??????????? ????????? - ????? ?????? ?? ??????????? ?? ?? ?? ??????? ??? ???? ???????. ??????? ?? ???????? ?? ?????? ?????.',
		'ConfAutoBigAlbumPictures' : '?????????? ?????????? ?????? ????? ????? ???? ?? ?? ?????? ??????????.',
		'ConfAutoLoadFullAlbum' : '?????????? ???????? ???? ???????? ?? ???? ????? ?? ??????? ?? ???? ????????.',
		'ConfAutoLoadTaggedPhotos' : '?????????? ???????? ???? ???????? ?? ???? ????????? ????? ?? ???? ???????? (??? ?? ????? ?? ????????? ?? ????\-??).',
		'ConfAutoReadMore' : '?????????? ?????? ?? "???????? ??????" ?????????.',
		'ConfBigAlbumPictures' : '?????? ???? ?? ????? ?????????? ?? ?? ?? ?????? ?????? ??????? ?? ???? ?????????? ?? ??? ????????.',
		'ConfBookmarks' : '?????? ??????? ?? ??????? ??? ????.',
		'ConfBottomBarHoverOpacity' : '?? ??????????? ?? ????????',
		'ConfBottomBarOpacity' : '?????????? ?? ??????? ???? ???',
		'ConfCalendarBirthDate' : '?????? ?? ????????\-?? ?? ?????? ?? ?????? ?? ????????.',
		'ConfCalendarFullName' : '??????? ?? ?????? ??? ?? ?????\-?? ???? ?????? ?? ????????? (??????? ???? ???).',
		'ConfChatDifferentiate' : '??????? ????????? ? ???????? ?? ??????? ?????? ?????????? ? ????????? ????????.',
		'ConfChatHideIdle' : '?????? ?? ????????? ????????.',
		'ConfDelayPopupPics' : '?????? ?????? ??????????? ???? ?????????? ???????? ??????????.',
		'ConfDelayPopupPicsTimeout' : '??????????? ???? ?????????? ???????? ??????????, ?? ??????????? (????????=500):',
		'ConfDownloadVideo' : '?????? ???? ?? ?????????? ?? ??????? ?? ????? ??????????. (???? ?? ?? ????? <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '?????????? ???????? ???????? ?? ??????????? ?? ?????????? ?? ?????? ?? 5 ???????.',
		'ConfExport' : '?? ?? ?? ??????? ????????????, ??????? ?? ??????? ????????? ? ??????? ?? ?? ????????.',
		'ConfExternalPopup' : '???????? ??????? ?????? ?? ?????????? ??????????. <sup>beta</sup>',
		'ConfFacebookSinarLanguage' : '????? ?? Sinar Script',
		'ConfFacebookTimestamps' : '??????? Facebook ?????? ?? ??????? (eg. "3 ???? ?????").',
		'ConfFBFTimestamps' : '?????? Sinar Script ?????? ?? ??????? ?? Facebook ???????? ?? ????? (eg. "11:45").',
		'ConfFBFTimestamps24' : '??????? Sinar Script ?????? ?? ????? ?? 24-??????? ??????.',
		'ConfFriendRequestCountInTitle' : '??????? ???? ?? ???? ?????? ?? ????????? ?? ???????? ?? ??????????.',
		'ConfGoogleApps' : '??????? Google ???????? ??????? ???????????? ?? Google ?????????.',
		'ConfGoogleAppsDomain' : '?????',
		'ConfGoogleCalendar' : '?????? ??????? ?? ?? ??????? ???????? ? ??????? ?? <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : '????? ?? <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : '?????? ?? ?????????? ?? ???????????.',
		'ConfHideEventStories' : '?????? ?? ?????????? ?? ?????????.',
		'ConfHideFriendStories' : '?????? ?? ?????????? ?? ???????????.',
		'ConfHideGroupStories' : '?????? ?? ?????????? ?? ???????.',
		'ConfHideLikeStories' : '?????? ?? ?????????? ?? "?? ?? ??????".',
		'ConfHideLinkStories' : '?????? ?? ?????????? ?? ?????????.',
		'ConfHideNoteStories' : '?????? ?? ?????????? ?? ?????????.',
		'ConfHidePhotoStories' : '?????? ?? ?????????? ?? ????????????.',
		'ConfHideProfilePicStories' : '?????? ?? ?????????? ?? ?????? ????????????.',
		'ConfHideRead' : '?????? ?????? ?? ????????? ?????? ?? ????? ????????? ?? ???????????.',
		'ConfHideRelationshipStories' : '?????? ?? ?????????? ?? ??????-?? ?? ?????.',
		'ConfHideStatusStories' : '?????? ?? ?????????? ?? ?????????.',
		'ConfHideVideoStories' : '?????? ?? ?????????? ?? ???????.',
		'ConfHideWallStories' : '?????? ?? ?????????? ?? ?????.',
		'ConfHomeChat' : '?????? ???????? ???????.',
		'ConfHomeEvents' : '?????? ??????? ???????.',
		'ConfHomeFindFriends' : '?????? ??????? ?? ????????? ???????.',
		'ConfHomeLeftAlign' : 'Left-align the contents of the home page.',
		'ConfHomeLeftColumn' : '?????? ?? ?????? ??????.',
		'ConfHomeLeftColumnFixed' : '?????? ?? ?????? ?????? ???????, ?? ????????? ??????.',
		'ConfHomeLink' : '?????? ??????? ???? ?? ??? ???? ?????.',
		'ConfHomePeopleYouMayKnow' : '?????? ???????? ???????.',
		'ConfHomeNavigation' : '?????? ?????????? ???????.',
		'ConfHomePokes' : '?????? ??????? ???????.',
		'ConfHomeProfile' : '?????? ?????? ???????.',
		'ConfHomeRequests' : '?????? ?????? ???????.',
		'ConfHomeRightColumn' : '?????? ????? ??????.',
		'ConfHomeStretch' : '???????? ?? ????????? ???????? ?? ?????? ?????? ?? ????????????.',
		'ConfiCalendar' : '?????? ??????? ?? ?????????? ?? <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> ???????? ?? ???? ?????????.',
		'ConfImport' : '?? ?? ?? ?????? ?????? ????????????? ???????, ?????? ?? ??????? ?????? ?? ??????? ??? ?? ? ??????? ????????? ? ?????? "?????".',
		'ConfInboxCountInTitle' : '??????? ???? ?? ???? ?????? ?? ???????? ?? ??????????.',
		'ConfLogoutLink' : '?????? ?????? ?? ???? ?? ??? ???? ?????.',
		'ConfNotificationCountInTitle' : '??????? ???? ?? ???? ??????????? ?? ???????? ?? ??????????.',
		'ConfNewTabSearch' : '??????? ?? ???????? ????????????? ?? ??? ???/???????? ???? ????????? CTRL + Enter ?? ?? ?????.',
		'ConfPageTitle' : '??????? "Facebook |" ?? ???????? ?? ?????? ????????.',
		'ConfPhotoPopup' : '???????? ???????? ?????? ?? ?????????? ??? ??????????? ?? ????????.',
		'ConfPopupAutoClose' : '??????? ?? ?????????? ?????????? ??????????.',
		'ConfPopupSmartAutoClose' : '?????? ?????????? ??????????? ?? ?????????? ?????????? ??? ???????????? ?? ???????? ? ??? ???',
		'ConfPopupPosition' : '???????? ?? ???????? ??????????',
		'ConfProcessInterval' : '???????? ?? ???????????? ????????, ?? ??????????? (?????????=1000):',
		'ConfProfileLink' : '??????? ?????? ???? ?? ??? ???? ?????.',
		'ConfProfilePicPopup' : '???????? ?????? ?????? ?? ?????? ?????????? ?? ??????????? ?? ????????',
		'ConfProtocolLinks' : '?????? ???????? ?????? ?? ????????? ?? ??????? ?? ??????? ?? ???????? ?? ??? (Google Talk, Windows Live ? ??).',
		'ConfSectionAbout' : '?? Sinar Script',
		'ConfSectionAdvanced' : '????????',
		'ConfSectionEvents' : '?????????/???????',
		'ConfSectionImportExport' : '?????/??????',
		'ConfSectionFeeds' : '??????',
		'ConfSectionHomePage' : '??????? ????????',
		'ConfSectionLiveFeed' : '???????',
		'ConfSectionMenu' : '?????/????????',
		'ConfSectionOther' : '????? ?????',
		'ConfSectionPageTitle' : '?????? ?? ????????',
		'ConfSectionPictures' : '??????????',
		'ConfSectionShortcuts' : '???????? ?? ?????????',
		'ConfSecureLinks' : '???? ?? Facebook ????????? ?? ????? ?? HTTPS ????????.',
		'ConfShortcutList' : '<b>???????? ?? ?????????</b> (case sensitive):<br /><br /><i>?? ?????? ????????:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - ?????? ????????? (???????? ?????????)<br />&nbsp;<b>C</b> - Sinar Script ?????????????<br />&nbsp;<b>D</b> - ?????????<br />&nbsp;<b>E</b> - ???????<br />&nbsp;<b>F</b> - ?????????<br />&nbsp;<b>H</b> - ??????? ????????<br />&nbsp;<b>I</b> - ???????<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show Sinar Script debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by Sinar Script<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : '?????? ???????? ?? ?????????.',
		'ConfSign' : '?????? ??????????? ????? ?? ????\-?? ?? ??????? ??????? (??? ?? ???????? ??? ???????????).',
		'ConfTopBarFixed' : '??????? ?? ??????? ???? ??? ?? ??????? ???????, ? ?? ????????? ????.',
		'ConfTopBarHoverOpacity' : '??? ??????????? ?? ????????',
		'ConfTopBarOpacity' : '?????????? ?? ??????? ???? ???',
		'ConfUpdates' : '??????? Userscripts.org ?????? ?? ?????????? ?? Sinar Script. ??? <a href="#" id="fbfUpdateLink" onclick="return false;">??????? ????</a>.',
		'DownloadVideo' : '???????? ?????',
		'ExportICalendarFile' : '?????? iCalendar ????????',
		'ExportICalendarFileWarning' : '(??? ?? ?????? ??? ???? ????? ?????????)',
		'FacebookSinarConflict' : 'Facebook Sinar ? ???? Sinar Script.<br /><br />?? ??????? ?? ??? ????? ???? ?? ?? ????????? Facebook Sinar ?? ?????? ??????????, ??? ????? ??????? ?? ????????? ??????? ???? ?? ?????.<br /><br />??? ?? ?? ??????? ???? ?? ?? ???????? ?????????, <a %s>?????? ???? ?? ??????????</a>.',
		'fullAlbumLoaded' : '?????? ????? ? ??????',
		'Import' : '?????',
		'ImportConfirm' : '???? ?? ??????? ???? ????? ?? ?? ?????? ???? ??????????????\n?????? ??????? ????????????? ?? ????? ????????.',
		'ImportFailure' : '?? ?????? ?????? ?????? ?? ????????? ?????? ?????????????.',
		'ImportSuccess' : '??????????? ? ????????. ???? ????? ?? ?? ??????? ???????????',
		'Left' : '????',
		'LoadingAllPhotos' : '?? ????????? ???? ??????????...',
		'loadingFullAlbum' : '?? ??????? ?????? ?????...',
		'LoadingPic' : '?? ??????? ?????????????...',
		'LoadPhotosWarning' : '??????????? ?? ???? ?????????? ???? ?? ??????',
		'Months' : Array('???????','????????','????','?????','???','????','????','??????','?????????','????????','???????','????????'),
		'ProtocolSkype' : '???? ?? %s ????? Skype',
		'ProtocolMSN' : '?????????? ?? %s ????? Windows Live',
		'ProtocolYahoo' : '?????????? ?? %s ????? Yahoo Messenger',
		'ProtocolGoogle' : '?????????? ?? %s ????? Google Talk',
		'ReloadErrorPage' : '?????? ????????, ??? ??????? 5 ???????',
		'Refresh' : '??????',
		'Remove' : '???????',
		'Right' : '?????',
		'ShowBigPictures' : '?????? ?????? ??????????',
		'Signs' : Array('?????','????????','????','????','???','????????','???','???','??????','????','????????','???????'),
		'today' : '?????',
		'Translators' : '???????????',
		'UpdateAvailable1' : '???????? ? ?????????? ?? Sinar Script',
		'UpdateAvailable2' : '???? ????? ?? ?????????? ?????',
		'UpdateHomepage' : '??? ?? ???????',
		'UpdateInstall' : '?????????? ????',
		'UpdateTomorrow' : '????????? ????',
		'yearsOld' : '%s ??????'
	},
	
	// Norwegian - Contributed by Eilif Nordseth (20100819)
	nb : {	
		'_language' : 'Norwegian',
		'AddToCalendar' : 'Legg til kalender',
		'AddToGoogleCalendar' : 'Legg til Google kalendar',
		'all' : 'alle',
		'All' : 'AllE',
		'AllPhotosLoaded' : 'Alle bilder lastet inn',
		'Automatic' : 'Automatisk',
		'Birthday' : '%s\'s fødselsdag',
		'BookmarkAdd' : 'Legg til nytt bokmerke',
		'BookmarkExists' : 'Det er allerede et bokmerke til denne siden.\n\nGå til siden du ønsker å bokmerke og forsøk igjen.',
		'BookmarkNamePrompt' : 'Legg inn et navn til dette bokmerketet:\n%s',
		'BookmarksConfirmRemoval' : 'Er du sikker på at du vil fjerne disse bokmerkene?',
		'BookmarksManage' : 'Behandle bokmerker',
		'BookmarksRemoveSelected' : 'Fjern valgte bokmerker',
		'Bookmarks' : 'Bokmerker',
		'BrowserUnsupported' : 'Nettleseren din støtter ikke dette valget.',                                 
		'CreatingFile' : 'Lager fil',
		'Close' : 'Lukk',
		'ConfigureFacebookSinar' : 'Sinar Script - Alternativer',
		'ConfigureInstructions' : 'Alle endringer lagres umiddelbart, men noen forandringer virker ikke i faner som allerede er åpne.',
		'ConfAge' : 'Vis en person\'s alder på profilen (om de viser hele fødselsdatoen sin).',
		'ConfAlbumComments' : 'Legg til en lenke på album-sider for å vise alle kommentarene til albumet.',
		'ConfApplicationWhitelist' : 'Applikasjoner\'s Hvit-liste - Legg in ID\'ene til applikasjoner for å hindre at de blir skjult. Adskill ID\'er med mellomrom.',
		'ConfAutoBigAlbumPictures' : 'Automatisk vis større albumbilder når siden åpnes.',
		'ConfAutoLoadFullAlbum' : 'Automatisk last inn fimerkebilder for alle bildene i et album på ei enkel side.',
		'ConfAutoLoadTaggedPhotos' : 'Automatisk last inn fimerkebilder for alle merkede bilder på ei enkel side (bildefaner på personer\'s profiler).',
		'ConfAutoReadMore' : 'Automatisk klikk på "les mer"-lenker.',
		'ConfBigAlbumPictures' : 'Legg til ei lenke på album sider for kunne vise større versjoner av alle bildene på den siden.',
		'ConfBigAlbumPicturesBorder' : 'Add a border around bigger versions of pictures.',
		'ConfBookmarks' : 'Legg en bokmerke-undermeny til toppmeny-linjen.',
		'ConfBottomBarHoverOpacity' : 'Ved mus-over',
		'ConfBottomBarOpacity' : 'Bunmeny-linjen\'s gjennomsiktighet',
		'ConfCalendarBirthDate' : 'Inkluder personen\'s fødselsdato i hendelsesdetaljer.',
		'ConfCalendarFullName' : 'Bruke personen\'s fulle navn som tittel til fødselsdager (istedenfor bare fornavn).',
		'ConfChatDifferentiate' : 'Bruke fete typer og kursiv til å skille mellom tilgjengelige og fraværende venner.',
		'ConfChatHideIdle' : 'Skjul frværende venner.',
		'ConfDelayPopupPics' : 'Legg inn en kort pause før sprettopp-bilder vises.',
		'ConfDelayPopupPicsTimeout' : 'Pause før sprettopp-bilder vises, i millisekunder (standard=500):',
		'ConfDownloadVideo' : 'Legg til en lenke for å kunne laste ned videoer fra video-sider. (Du kan få behov for en <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV-spiller</a>)',
		'ConfErrorPageReload' : 'Automatisk laste inn igjen en applikasjon\'s feilsider etter 5 sekunder.',
		'ConfExport' : 'For å eksportere oppsettet ditt, kopier teksten nedenfor og lagre den i en fil.',
		'ConfExternalPopup' : 'Sprettopp versjoner i full-størrelse av eksterne bilder. <sup>beta</sup>',
		'ConfFacebookSinarLanguage' : 'Språk til Sinar Script',
		'ConfFacebookTimestamps' : 'Vis Facebook tidsangivelse (eg. "3 timer siden").',
		'ConfFBFTimestamps' : 'Legg til Sinar Script tidsangivelser etter Facebook tider (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Vis Sinar Script tidsangivelser i 24-timers format.',
		'ConfFriendRequestCountInTitle' : 'Vis antall nye venneforespørsler i sidetittelen.',
		'ConfGoogleApps' : 'Gjør Google kalender-lenker kompatible med Google Apps.',
		'ConfGoogleAppsDomain' : 'Domene',
		'ConfGoogleCalendar' : 'Legg inn lenker til Legg til Fødselsdager og Hendelser for <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google kalender</a>.',
		'ConfGoogleLanguage' : 'Språk for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Oversettelse</a>',
		'ConfHideApplicationStories' : 'Skjul applikasjonsoversikter.',
		'ConfHideEventStories' : 'Skjul hendelseoversikt.',
		'ConfHideFacebookCountInTitle' : 'Skjul Facebook\'s oppsummering av nye innboks-meldiger.',
		'ConfHideFriendStories' : 'Skjul venneoversikt.',
		'ConfHideGroupStories' : 'Skjul gruppeoversikt.',
		'ConfHideLikeStories' : 'Skjul liker-oversikt.',
		'ConfHideLinkStories' : 'Skjul lenke-oversikt.',
		'ConfHideNoteStories' : 'Skjul notat-oversikt.',
		'ConfHidePhotoStories' : 'Skjul bilde-oversikt.',
		'ConfHidePlaceStories' : 'Skjul steds-hendelser.',
		'ConfHideProfilePicStories' : 'Skjul profilbilde-oversikt.',
		'ConfHideRead' : 'Skjul objekter i aktiv Notis som er blitt markert som røde.',
		'ConfHideRelationshipStories' : 'Skjul Forhold-oversikt.',
		'ConfHideStatusStories' : 'Skjul Status-oversikt.',
		'ConfHideVideoStories' : 'Skjul Video-oversikt.',
		'ConfHideWallStories' : 'Skjul Vegg-oversikt.',
		'ConfHomeBeta' : 'Vis Beta Tester seksjonen.',
		'ConfHomeChat' : 'Vis  Chat-seksjonen.',
		'ConfHomeEvents' : 'Vis Hendelse-seksjonen.',
		'ConfHomeFindFriends' : 'Vis Koble til Venner-seksjonen.',
		'ConfHomeLeftAlign' : 'Venstrestill innhold på Hjem-siden.',
		'ConfHomeLeftColumn' : 'Vis venstre kolonne.',
		'ConfHomeLeftColumnFixed' : 'Behold den venstre kolonnen synlig, selv etter rulling nedover.',
		'ConfHomeLink' : 'Vis Hjem-lenken i toppmeny-feltet.',
		'ConfHomeNavigation' : 'Vis Navigasjons-seksjonen.',
		'ConfHomePokes' : 'Vis Pokes-seksjonen.',
		'ConfHomeProfile' : 'Vis Profil-seksjonen.',
		'ConfHomeRecommendations' : 'Vis anbefalinger (Personer du kanskje kjenner, anbefalte sider etc).',
		'ConfHomeRequests' : 'Vi Forespørsel-seksjonen.',
		'ConfHomeRightColumn' : 'Vis høyre kolonne.',
		'ConfHomeStretch' : 'Strekk siden Hjem til netteleserens vidde fullt ut.',
		'ConfHomeStretchComments' : 'Strekk kommentarfeltene på Hjem-sida.',
		'ConfiCalendar' : 'Legg lenke til Laste ned en <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> fil med alle fødselsdagene.',
		'ConfImport' : 'For å kunne importere oppsettet ditt senere, skriver du over teksten nedenfor med teksten du lagret idligere og klikk "Import".',
		'ConfInboxCountInTitle' : 'Vis antall nye innboks-meldinger på tittellinjen til siden.',
		'ConfLogoutLink' : 'Legg til en Logg-ut lenke på topp-meny linjen.',
		'ConfNotificationCountInTitle' : 'Vis antall nye Varsler i sidetittelen.',
		'ConfNewTabSearch' : 'La søkeresultatet åpnes i ny fane/vindu ved søk med trykk av CTRL + Enter.',
		'ConfPageTitle' : 'Fjern "Facebook |" fra tittelen på hver side.',
		'ConfPhotoPopup' : 'Sprettopp større versjoner av bilder ved mus-over.',
		'ConfPopupAutoClose' : 'Lukk sprettopp-bilder automatisk.',
		'ConfPopupSmartAutoClose' : 'Hindre sprettopp-bilder i å lukkes automatisk om musen er over det.',
		'ConfPopupPosition' : 'Posisjon for sprettopp-bilder',
		'ConfProcessInterval' : 'Intervall for å lage siden, i millisekund (standard=1000):',
		'ConfProfileLink' : 'Vis Profil-lenken i toppmeny linjen.',
		'ConfProfilePicPopup' : 'Sprettopp større versjoner av profil-bilder ved musover',
		'ConfProtocolLinks' : 'Endre meldings ID\'er på profiler til lenker som starter en dialog med dem (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Om Sinar Script',
		'ConfSectionAdvanced' : 'Avansert',
		'ConfSectionEvents' : 'Fødselsdager/Hendelser',
		'ConfSectionImportExport' : 'Import/Eksport',
		'ConfSectionFeeds' : 'Notiser',
		'ConfSectionHomePage' : 'Hjem side',
		'ConfSectionLiveFeed' : 'Aktive Notiser',
		'ConfSectionMenu' : 'Menyer/Chat',
		'ConfSectionOther' : 'Andre alternativer',
		'ConfSectionPageTitle' : 'Sidetittel',
		'ConfSectionPictures' : 'Bilder',
		'ConfSectionShortcuts' : 'Tastatur-Snarveier',
		'ConfSecureLinks' : 'La Facebook lenker peke til HTTPS sider.',
		'ConfShortcutList' : '<b>Tastatur-Snarveier</b> (små/store sensitive):<br /><br /><i>Fra hvilken som helst side:</i><br /> <b>A</b> - Album/bilder<br /> <b>B</b> - Handtere venneliste (nettvenner)<br /> <b>C</b> - Sinar Script oppsett<br /> <b>D</b> - Fødselsdager<br /> <b>E</b> - Hendelser<br /> <b>F</b> - Venner<br /> <b>H</b> - Hjem side<br /> <b>I</b> - Innboks<br /> <b>K</b> - Legg til Bokmerke<br /> <b>L</b> - Velg Logg ut lenken (trykk Enter etterpå for å logge ut)<br /> <b>N</b> - Varsler<br /> <b>P</b> - Din Profil<br /> <b>R</b> - Forespørsler<br /> <b>S</b> - Hopp til søkefeltet<br /> <b>T</b> - Oversett valgt tekst<br /> <b>?</b> - Vis Sinar Script\'s feilrette-info<br /> <b><escape></b> - Lukk sprettopp\'er laget av Sinar Script<br /><br /><i>Fra Hjem siden (filtere)</i>:<br /> <b>a</b> - Sider<br /> <b>f</b> - Aktiv Notis<br /> <b>g</b> - Grupper<br /> <b>l</b> - Lenker<br /> <b>n</b> - Nyhets Notiser<br /> <b>p</b> - Bilder<br /> <b>s</b> eller <b>u</b> - Status-Oppdateringer<br /> <b>t</b> - Notater<br /> <b>v</b> - Videoer<br /><br /><i>Fra profiler</i>:<br /> <b>i</b> - Info<br /> <b>p</b> - Bilder<br /> <b>w</b> - Vegg<br /> <b>x</b> - Bokser<br /><br /><i>Fra sider med nummerering (forrige, neste, etc)</i><br /> <b><venstre pil></b> - Forrige<br /> <b><høyre pil></b> - Neste<br /> <b><shift> + <venstre pil></b> - Første (når tilgjengelig)<br /> <b><shift> + <høyre pil></b> - Siste (når tilgjengelig)<br /><br /><i>Mens man ser på album/bilder:</i><br /> <b>a</b> - Last alle frimerkebilder (når tilgjengelig)<br /> <b>b</b> - Vis store bilder<br /> <b>c</b> - Se på kommentarer<br /> <b>k</b> - Tilbake til album<br /> <b>m</b> - Bilder av (person) og meg<br /><br /><i>Mens man ser på siste album og opplastede/merkede bilder:</i><br /> <b>a</b> eller  <b>r</b> - Siste Album<br /> <b>m</b> eller  <b>u</b> - Mobile opplastinger<br /> <b>o</b> - Bilder av meg<br /> <b>p</b> - Mine bilder<br /> <b>t</b> eller  <b>f</b> - Merkede venner',
		'ConfShortcuts' : 'Aktiver tastatur-snarveier.',
		'ConfSign' : 'Vis en person\'s stjernetegn på profilen (om de oppgir fødselsdatoen sin).',
		'ConfTopBarFixed' : 'Behold alltid toppmeny-linjen på skjermen, til og med etter rulling nedover.',
		'ConfTopBarHoverOpacity' : 'Ved mus-over',
		'ConfTopBarOpacity' : 'Toppmenyens gjennomsiktighet',
		'ConfUpdates' : 'Sjekk Userscripts.org daglig etter oppdateinger til Sinar Script. Eller <a href="#" id="fbfUpdateLink" onclick="return false;">sjekk nå</a>.',
		'DownloadVideo' : 'Last ned video',
		'ExportICalendarFile' : 'Eksporter iCalendar fil',
		'ExportICalendarFileWarning' : '(Dette vil ta ei stund om du har mange venner)',
		'FacebookSinarConflict' : 'Facebook Sinar er nå kjent som Sinar Script.<br /><br />På grunn av navnebyttet må du manuelt avinstallere Facebook Sinar fra nettleseren din, ellers vil de to scriptene komme i konflikt med hverandre.<br /><br />Dersom du ikke er sikker på hvordan man avinstallerer et brukerscript, <a %s>klikk her for instruksjoner</a>.',
		'fullAlbumLoaded' : 'hele album lastet',
		'Import' : 'Importer',
		'ImportConfirm' : 'Er du sikker på at du vil importere dette oppsettet?\nDine nåværende valg vil bli tapt.',
		'ImportFailure' : 'En feil oppstod mmens oppsettet ditt ble forsøkt importert.',
		'ImportSuccess' : 'Importering fullført. Ønsker du å oppfriske siden?',
		'Left' : 'Venstre',
		'LoadingAllPhotos' : 'Laster alle bilder...',
		'loadingFullAlbum' : 'Laster hele album...',
		'LoadingPic' : 'Laster bilde...',
		'LoadPhotosWarning' : 'Laste alle bilder kan ta lang tid',
		'Months' : new Array('Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'),
		'ProtocolSkype' : 'Ring %s ved å bruke Skype',
		'ProtocolMSN' : 'Chat med %s ved å bruke Windows Live',
		'ProtocolYahoo' : 'Chat med %s ved å bruke Yahoo Messenger',
		'ProtocolGoogle' : 'Chat med %s ved å bruke Google Talk',
		'ReloadErrorPage' : 'Klikk for å forsøke på nytt, eller vent 5 sekunder',
		'Refresh' : 'Oppfrisk',
		'Remove' : 'Fjern',
		'Right' : 'Høyre',
		'ShowBigPictures' : 'Vis store bilder',
		'Signs' : new Array('Steinbukken','Vannmannen','Fiskene','Væren','Tyren','Tvillingene','Krepsen','Løven','Jomfruen','Vekten','Skorpionen','Skytten'),
		'today' : 'i dag',
		'Translators' : 'Oversettere',
		'UpdateAvailable1' : 'En oppdatering til Sinar Script er tilgjengelig',
		'UpdateAvailable2' : 'Vil du oppdatere nå?',
		'UpdateHomepage' : 'Gå til hjem siden',
		'UpdateInstall' : 'Installer nå',
		'UpdateTomorrow' : 'Minn meg på om dette i morgen',
		'ViewAlbumComments' : 'Vis album-kommentarer',
		'yearsOld' : '%s år gammel'
	},

	// Korean - Contributed by ??? (20100823)
	ko : {
		'_language' : 'Korean',
		'AddToCalendar' : '??? ??',
		'AddToGoogleCalendar' : '?? ???? ??',
		'all' : '??',
		'All' : '?? ??',
		'AllPhotosLoaded' : '?? ??? ??????',
		'Automatic' : '??',
		'Birthday' : '%s\? ??',
		'BookmarkAdd' : '????? ??',
		'BookmarkExists' : '? ???? ?? ???? ?? ????.\n\n???? ?? ???? ?? ?? ?????.',
		'BookmarkNamePrompt' : '???? ??:\n%s',
		'BookmarksConfirmRemoval' : '??? ????? ??? ????????',
		'BookmarksManage' : '???? ??',
		'BookmarksRemoveSelected' : '??? ???? ??',
		'Bookmarks' : '????',
		'BrowserUnsupported' : '? ??? ?? ??????? ???? ????.',
		'CreatingFile' : '?? ??? ?',
		'Close' : '??',
		'ConfigureFacebookSinar' : 'Sinar Script ??',
		'ConfigureInstructions' : '????? ???? ?????. ?? ???? ??? ?? ???? ?? ? ????.',
		'ConfAge' : '??? ???? ??? ?? ?? (????? ??? ??).',
		'ConfAlbumComments' : '??? ???? "???? ?? ?? ????" ?? ???.',
		'ConfApplicationWhitelist' : '??? ?????? - ??? ?? ??????? ID? ?????. ID ??? ????? ??.',
		'ConfAutoBigAlbumPictures' : '?? ???? ? ??? ??? ???.',
		'ConfAutoLoadFullAlbum' : '??? ???? ?? ??? ??? ???.',
		'ConfAutoLoadTaggedPhotos' : '?? ???? ???? ?? ??? ???.',
		'ConfAutoReadMore' : '"?? ???" ??? ???? ???.',
		'ConfBigAlbumPictures' : '??? ???? "? ?? ??" ?? ???.',
		'ConfBookmarks' : '? ? ?? ???? ???? ??? ???.',
		'ConfBottomBarHoverOpacity' : '??? ??? ?????',
		'ConfBottomBarOpacity' : '?? ???? ???',
		'ConfCalendarBirthDate' : '???? ????? ??? ?? ???.',
		'ConfCalendarFullName' : '??? ???? ?? ??? ?? ???? (??? ?? ???? ??).',
		'ConfChatDifferentiate' : '???? ??? ??? ??? ??? ??? ????? ?? ??? ????.',
		'ConfChatHideIdle' : '???? ??? ??? ???.',
		'ConfDelayPopupPics' : '?? ????? ?? ?? ???.',
		'ConfDelayPopupPicsTimeout' : '?? ??? ??? ???? ?? ??, 1/1000? ?? (??? 500):',
		'ConfDownloadVideo' : '??? ???? ???? ?? ???. (<a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV ????</a>? ????? ????)',
		'ConfErrorPageReload' : '?????? ?? ???? 5? ?? ???? ????.',
		'ConfExport' : '????? ???? ???? ??? ???? ???? ??? ??????.',
		'ConfExternalPopup' : '??? ??? ?? ??? ??? ? ? ?? ??? ???. <sup>??</sup>',
		'ConfFacebookSinarLanguage' : 'Sinar Script? ??? ??',
		'ConfFacebookTimestamps' : 'Facebook ??? ????? ??? (?. "? 3?? ?").',
		'ConfFBFTimestamps' : 'Sinar Script ??? ?????? Facebook ????? ?? ??? (?. "11:45").',
		'ConfFBFTimestamps24' : 'Sinar Script ?????? 24?? ???? ???.',
		'ConfFriendRequestCountInTitle' : '??? ??? ?? ?? ?? ???.',
		'ConfGoogleApps' : '?? Apps? ???? ?? ??? ?? ???.',
		'ConfGoogleAppsDomain' : '???',
		'ConfGoogleCalendar' : '??? ???? <a href="http://www.google.com/support/calendar/bin/topic.py?hl=kr&topic=13732" target="_blank">?? ???</a>? ???? ?? ???.',
		'ConfGoogleLanguage' : '<a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">?? ??</a>? ??? ??',
		'ConfHideApplicationStories' : '?????? ??? ???.',
		'ConfHideEventStories' : '??? ??? ???.',
		'ConfHideFacebookCountInTitle' : 'Facebook? ?? ?? ???.',
		'ConfHideFriendStories' : '???? ??? ???.',
		'ConfHideGroupStories' : '?? ??? ???.',
		'ConfHideLikeStories' : '"???" ??? ???.',
		'ConfHideLinkStories' : '?? ??? ???.',
		'ConfHideNoteStories' : '?? ??? ???.',
		'ConfHidePhotoStories' : '?? ??? ???.',
		'ConfHideProfilePicStories' : '??? ?? ??? ???.',
		'ConfHideRead' : '??? ???? ?? ??? ???.',
		'ConfHideRelationshipStories' : '??/?? ??? ???.',
		'ConfHideStatusStories' : '"? ??" ??? ???.',
		'ConfHideVideoStories' : '??? ??? ???.',
		'ConfHideWallStories' : '??? ??? ???.',
		'ConfHomeBeta' : 'Facebook Sneak Peek ???.',
		'ConfHomeChat' : '?? ???.',
		'ConfHomeEvents' : '??? ???.',
		'ConfHomeFindFriends' : '???? ???.',
		'ConfHomeLeftAlign' : '? ???? ???? ??.',
		'ConfHomeLeftColumn' : '?? ?? ???.',
		'ConfHomeLeftColumnFixed' : '??? ??? ? ??? ?? ?? ???.',
		'ConfHomeLink' : '? ? ?? ???? "? ???" ?? ???.',
		'ConfHomeNavigation' : '????? ?? ???.',
		'ConfHomePokes' : 'Pokes ???.',
		'ConfHomeProfile' : '??? ???.',
		'ConfHomeRecommendations' : '?? ???.',
		'ConfHomeRequests' : '?? ???.',
		'ConfHomeRightColumn' : '??? ?? ???.',
		'ConfHomeStretch' : '????? ?? ??? ?? ? ??? ??? ??? .',
		'ConfHomeStretchComments' : '????? ?? ??? ?? ??? ???.',
		'ConfiCalendar' : '?? ??? <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> ??? ?? ?? ???.',
		'ConfImport' : '????? ???? ???? ??? ???? ??? ?? ? "????"? ?????.',
		'ConfInboxCountInTitle' : '??? ??? ? ?? ?? ???.',
		'ConfLogoutLink' : '? ? ?? ???? ???? ?? ???.',
		'ConfNotificationCountInTitle' : '??? ??? ? ?? ?? ???.',
		'ConfNewTabSearch' : '????? CTRL+?? ?? ??? ? ?/?? ????? ???.',
		'ConfPageTitle' : '"Facebook |"? ??? ???? ???.',
		'ConfPhotoPopup' : '??? ??? ??? ??? ??? ? ?? ??? ???.',
		'ConfPopupAutoClose' : '???? ?? ?? ??.',
		'ConfPopupSmartAutoClose' : '??? ??? ??? ??? ????? ???? ?? ??.',
		'ConfPopupPosition' : '?? ?? ??',
		'ConfProcessInterval' : '???? ???? ??, 1/1000? ?? (??? 1000):',
		'ConfProfileLink' : '? ? ?? ???? ??? ?? ???.',
		'ConfProfilePicPopup' : '??? ??? ??? ??? ? ?? ??? ???.',
		'ConfProtocolLinks' : '???? ?? ??? ID(????, ??? ??? ???, ?)? ???? ?? ??? ???? ??? ????.',
		'ConfSectionAbout' : 'Sinar Script?...',
		'ConfSectionAdvanced' : '??',
		'ConfSectionEvents' : '??/???',
		'ConfSectionImportExport' : '????/????',
		'ConfSectionFeeds' : '???',
		'ConfSectionHomePage' : '? ???',
		'ConfSectionLiveFeed' : '???',
		'ConfSectionMenu' : '??/??',
		'ConfSectionOther' : '? ? ??',
		'ConfSectionPageTitle' : '??? ??',
		'ConfSectionPictures' : '??',
		'ConfSectionShortcuts' : '??? ???',
		'ConfSecureLinks' : '?? HTTPS? ?? Facebook? ????.',
		'ConfShortcutList' : '<b>??? ???</b> (???? ??):<br /><br /><i>?? ????? ??</i>:<br />&nbsp;<b>A</b> - ???/??<br />&nbsp;<b>B</b> - ??? ?? ???/???<br />&nbsp;<b>C</b> - Sinar Script ??<br />&nbsp;<b>D</b> - ??<br />&nbsp;<b>E</b> - ???<br />&nbsp;<b>F</b> - ??<br />&nbsp;<b>H</b> - ? ???<br />&nbsp;<b>I</b> - ??<br />&nbsp;<b>K</b> - ???? ???<br />&nbsp;<b>L</b> - ???? ??? ?? (??? ???? ??? ????)<br />&nbsp;<b>N</b> - ??<br />&nbsp;<b>P</b> - ? ???<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - ?? ??? ?? ??<br />&nbsp;<b>T</b> - ??? ???? ??<br />&nbsp;<b>?</b> - Sinar Script ??? ?? ??<br />&nbsp;<b>&lt;ESC&gt;</b> - Sinar Script ?? ?? ??<br /><br /><i>?????? ??(??)</i>:<br />&nbsp;<b>a</b> - ???<br />&nbsp;<b>f</b> - ???<br />&nbsp;<b>g</b> - ??<br />&nbsp;<b>l</b> -??<br />&nbsp;<b>n</b> - ?? ??<br />&nbsp;<b>p</b> - ??<br />&nbsp;<b>s</b> ?? <b>u</b> - ?? ????<br />&nbsp;<b>t</b> - ??<br />&nbsp;<b>v</b> - ???<br /><br /><i>??? ????? ??</i>:<br />&nbsp;<b>i</b> - ??<br />&nbsp;<b>p</b> - ??<br />&nbsp;<b>w</b> - ???<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>??? ??? ????? ??(??, ??, ?)</i>:<br />&nbsp;<b>&lt;?&gt;</b> - ??<br />&nbsp;<b>&lt;?&gt;</b> - ??<br />&nbsp;<b>&lt;Shift&gt; + &lt;?&gt;</b> - ?? (?????)<br />&nbsp;<b>&lt;Shift&gt; + &lt;?&gt;</b> - ??? (?????)<br /><br /><i>???/??? ?? ??</i>:<br />&nbsp;<b>a</b> - ?? ??? ?? (?????)<br />&nbsp;<b>b</b> - ? ?? ???<br />&nbsp;<b>c</b> - ?? ??<br />&nbsp;<b>k</b> - ????? ????<br />&nbsp;<b>m</b> - ??(?? ???) ?? ??<br /><br /><i>?? ????? ???/??? ??? ?? ??:</i><br />&nbsp;<b>a</b> ?? &nbsp;<b>r</b> - ?? ???<br />&nbsp;<b>m</b> ?? <b>u</b> - ??? ???<br />&nbsp;<b>o</b> - ?? ?? ??<br />&nbsp;<b>p</b> -? ??<br />&nbsp;<b>t</b> ?? <b>f</b> - ?? ? ???',
		'ConfShortcuts' : '??? ??? ??.',
		'ConfSign' : '??? ???? ??? ??? ?? (????? ??? ??).',
		'ConfTopBarFixed' : '? ? ?? ???? ??? ??? ? ??? ???.',
		'ConfTopBarHoverOpacity' : '??? ??? ?????',
		'ConfTopBarOpacity' : '? ? ?? ???? ???',
		'ConfUpdates' : '?? Userscripts.org?? Sinar Script ????? ????. <a href="#" id="fbfUpdateLink" onclick="return false;">?? ??</a>.',
		'DownloadVideo' : '??? ????',
		'ExportICalendarFile' : 'iCalender ??? ????',
		'ExportICalendarFileWarning' : '(??? ??? ?? ?? ? ????)',
		'FacebookSinarConflict' : 'Facebook Sinar? ??? Sinar Script? ??????.<br /><br />Facebook Sinar? ?????? ???? ??? ?? ?? ??? ??? ?????.<br /><br />userscript? ???? ??? ????? <a %s>??? ?????</a>.',
		'fullAlbumLoaded' : '?? ??? ???',
		'Import' : '????',
		'ImportConfirm' : '??? ??? ?????????\n?? ??? ?????.',
		'ImportFailure' : '??? ???? ?? ??? ????.',
		'ImportSuccess' : '????? ??? ??????. ???? ???????',
		'Left' : '??',
		'LoadingAllPhotos' : '?? ??? ???...',
		'loadingFullAlbum' : '?? ??? ???...',
		'LoadingPic' : '?? ???...',
		'LoadPhotosWarning' : '?? ??? ????? ??? ?? ?? ? ????',
		'Months' : new Array('1?','2?','3?','4?','5?','6?','7?','8?','9?','10?','11?','12?'),
		'ProtocolSkype' : 'Skype? %s? ????',
		'ProtocolMSN' : 'Windows Live? %s? ????',
		'ProtocolYahoo' : '?? ???? %s? ????',
		'ProtocolGoogle' : '?? ???  %s? ????',
		'ReloadErrorPage' : '??? ??? ????? 5?? ?????',
		'Refresh' : '????',
		'Remove' : '??',
		'Right' : '???',
		'ShowBigPictures' : '? ?? ??',
		'Signs' : new Array('????','????','?????','???','????','?????','???','????','????','????','????','????'),
		'today' : '??',
		'Translators' : '??? ??',
		'UpdateAvailable1' : 'Sinar Script ????? ?????',
		'UpdateAvailable2' : '?? ???? ????',
		'UpdateHomepage' : '????? ??',
		'UpdateInstall' : '?? ??? ??',
		'UpdateTomorrow' : '?? ?? ??',
		'ViewAlbumComments' : '???? ?? ?? ????',
		'yearsOld' : '%s?'
	},
	
	// Vietnamese - Contributed by Tr?n Ð?c Th?nh (20100104)
	// Hi v?ng nh?n du?c góp ý c?a m?i ngu?i v? b?n d?ch, email: tranducthinh4102@gmail.com
	vi : {
		'_language' : 'Ti?ng Vi?t',
		'AddToCalendar' : 'Thêm vào l?ch',
		'AddToGoogleCalendar' : 'Thêm vào l?ch c?a Google',
		'all' : 't?t c?',
		'All' : 'T?t c?',
		'AllPhotosLoaded' : 'T?i t?t c? các b?c ?nh',
		'Automatic' : 'T? d?ng',
		'Birthday' : 'sinh nh?t c?a %s',
		'BookmarkAdd' : 'Thêm Bookmark m?i',
		'BookmarkExists' : 'Trang này dã du?c dánh d?u.\n\nTruy c?p vào trang b?n mu?n dánh d?u và th? l?i.',
		'BookmarkNamePrompt' : 'Ð?t tên cho trang dánh d?u này:\n%s',
		'BookmarksConfirmRemoval' : 'B?n mu?n xóa các bookmark dã ch?n?',
		'BookmarksManage' : 'Qu?n lý Bookmarks',
		'BookmarksRemoveSelected' : 'Xóa các Bookmarks dã ch?n',
		'Bookmarks' : 'Bookmarks',
		'BrowserUnsupported' : 'Trình duy?t c?a b?n không h? tr? tính nang này.',
		'CreatingFile' : 'T?o t?p tin',
		'Close' : 'Ðóng',
		'ConfigureFacebookSinar' : 'Cài d?t Sinar Script',
		'ConfigureInstructions' : 'M?i thi?t l?p s? du?c luu ngay l?p t?c, nhung m?t s? thay d?i không có tác d?ng trong các th? dang m?.',
		'ConfAge' : 'Hi?n th? tu?i c?a m?t ngu?i trong thông tin c?a h? (n?u h? cung c?p ngày sinh d?y d?).',
		'ConfAlbumComments' : 'Thêm m?t liên k?t d? hi?n th? t?t c? các bình lu?n v? album ? phía trên album',
		'ConfApplicationWhitelist' : 'Danh sách tr?ng các ?ng d?ng - Nh?p ID c?a các ?ng d?ng d? nó không b? ?n. Các ID cách nhau b?i kho?ng tr?ng (d?u cách).',
		'ConfAutoBigAlbumPictures' : 'T? d?ng hi?n th? hình ?nh l?n hon khi trang web m? ra.',
		'ConfAutoLoadFullAlbum' : 'T? d?ng t?i thumbnails c?a t?t c? hình ?nh c?a album trong m?t trang web.',
		'ConfAutoLoadTaggedPhotos' : 'T? d?ng t?i thumbnnails cho t?t c? các hình ?nh du?c tag trong m?t trang (the photos tab on people\'s profiles).',
		'ConfAutoReadMore' : 'T? d?ng click vào liên k?t "see more".',
		'ConfBigAlbumPictures' : 'Thêm liên k?t trên các album d? hi?n th? các phiên b?n l?n hon c?a các hình ?nh trên trang dó',
		'ConfBigAlbumPicturesBorder' : 'Thêm vi?n xung quanh phiên b?n l?n hon c?a hình ?nh',
		'ConfBookmarks' : 'Thêm menu Bookmarks vào thanh trình don trên cùng.',
		'ConfBottomBarHoverOpacity' : 'Khi chu?t ? trên',
		'ConfBottomBarOpacity' : 'Ð? trong su?t c?a thanh th?c don phía du?i',
		'ConfCalendarBirthDate' : 'Bao g?m ngày sinh trong nh?ng chi ti?t s? ki?n.',
		'ConfCalendarFullName' : 'S? d?ng tên d?y d? nhu tiêu d? cho ngày sinh (thay vì ch? là tên).',
		'ConfChatDifferentiate' : 'S? d?ng ch? in d?m và in nghiêng d? phân bi?t b?n bè dang online và dang r?i.',
		'ConfChatHideIdle' : '?n nh?ng b?n bè dang r?i.',
		'ConfDelayPopupPics' : 'Thêm m?t kho?ng tr? tru?c khi hi?n th? hình ?nh bung ra.',
		'ConfDelayPopupPicsTimeout' : 'Th?i gian tru?c khi hi?n th? hình ?nh bung ra, trong mili giây (m?c d?nh=500):',
		'ConfDownloadVideo' : 'Thêm m?t liên k?t d? t?i xu?ng các video th? các trang video. (B?n có th? c?n m?t <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">chuong trình choi FLV</a>)',
		'ConfErrorPageReload' : 'T? d?ng t?i l?i nh?ng trang ?ng d?ng l?i sau 5 giây.',
		'ConfExport' : 'Ð? trích xu?t các thi?t l?p c?a b?n, sao chép do?n van b?n du?i dây và luu nó trong m?t t?p tin.',
		'ConfExternalPopup' : 'Phiên b?n dúng kích c? c?a hình ?nh. <sup>beta</sup>',
		'ConfFacebookSinarLanguage' : 'Ngôn ng? cho Sinar Script',
		'ConfFacebookTimestamps' : 'Hi?n m?c th?i gian c?a facebook (ví d?: "3 hours ago").',
		'ConfFBFTimestamps' : 'Thêm m?c th?i gian c?a Sinar Script sau m?c th?i gian c?a Facebook (ví d?: "11:45").',
		'ConfFBFTimestamps24' : 'Hi?n th? m?c th?i gian c?a Sinar Script d?ng 24 gi?.',
		'ConfFriendRequestCountInTitle' : 'Hi?n th? s? yêu c?u k?t b?n trong tiêu d? c?a trang.',
		'ConfGoogleApps' : 'T?o Google Calendar tuong thích v?i Google Apps',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Thêm liên k?t d? thêm ngày sinh và các s? ki?n cho <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Language for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : '?n l?ch s? c?a các ?ng d?ng.',
		'ConfHideEventStories' : '?n l?ch s? các s? ki?n.',
		'ConfHideFacebookCountInTitle' : '?n s? tin nh?n trong h?p thu d?n c?a  Facebook.',
		'ConfHideFriendStories' : '?n l?ch s? c?a b?n bè.',
		'ConfHideGroupStories' : '?n l?ch s? c?a nhóm.',
		'ConfHideLikeStories' : '?n l?ch s? "Thích".',
		'ConfHideLinkStories' : '?n l?ch s? c?a liên k?t.',
		'ConfHideNoteStories' : '?n l?ch s? c?a ghi chú.',
		'ConfHidePhotoStories' : '?n l?ch s? c?a hình ?nh.',
		'ConfHidePlaceStories' : '?n l?ch s? c?a d?a ch?.',
		'ConfHideProfilePicStories' : '?n l?ch s? c?a hình ?nh profile.',
		'ConfHideRead' : '?n nh?ng m?c trong feed dã dánh d?u là dã d?c.',
		'ConfHideRelationshipStories' : '?n l?ch s? quan h?.',
		'ConfHideStatusStories' : '?n l?ch s? tr?ng thái.',
		'ConfHideVideoStories' : '?n l?ch s? video.',
		'ConfHideWallStories' : '?n l?ch s? c?a tu?ng.',
		'ConfHomeBeta' : 'Hi?n th? Facebook Sneak Peek.',
		'ConfHomeChat' : 'Hi?n th? Chat.',
		'ConfHomeEvents' : 'Hi?n th? Events.',
		'ConfHomeFindFriends' : 'Hi?n th? K?t N?i.',
		'ConfHomeLeftAlign' : 'Can trái n?i dung c?a trang ch?.',
		'ConfHomeLeftColumn' : 'Hi?n th? c?t bên trái.',
		'ConfHomeLeftColumnFixed' : 'Hi?n th? c?t bên trái, ngay c? khi cu?n xu?ng.',
		'ConfHomeLink' : 'Hi?n th? liên k?t "Trang Ch?" trong thanh th?c don trên cùng.',
		'ConfHomeNavigation' : 'Hi?n th? Danh M?c',
		'ConfHomePokes' : 'Hi?n th? Pokes',
		'ConfHomeProfile' : 'Hi?n th? "Thông tin".',
		'ConfHomeRecommendations' : 'Hi?n th? recommendations (People You May Know, Recommended Pages etc).',
		'ConfHomeRequests' : 'Hi?n th? Requests.',
		'ConfHomeRightColumn' : 'Hi?n th? c?t bên ph?i.',
		'ConfHomeStretch' : 'Hi?n th? trang ch? h?t chi?u r?ng c?a trình duy?t',
		'ConfHomeStretchComments' : 'Kéo cang nh?ng bình lu?n trên trang ch?',
		'ConfiCalendar' : 'Thêm liên k?t d? t?i v? m?t t?p tin <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> có t?t c? ngày sinh.',
		'ConfImport' : 'Ð? nh?p các thi?t l?p c?a b?n, ghi dè lên do?n van b?n du?i dây b?ng các do?n b?n dã luu tru?c dó và kích vào nút "Nh?p Vào".',
		'ConfInboxCountInTitle' : 'Hi?n th? s? tin nh?n trong h?p thu d?n trên tiêu d? trang.',
		'ConfLogoutLink' : 'Thêm m?t liên k?t "Ðang xu?t" vào thanh trình don trên cùng.',
		'ConfNotificationCountInTitle' : 'Hi?n th? s? thông báo m?i trong tiêu d? trang.',
		'ConfNewTabSearch' : 'Ð? k?t qu? tìm ki?m m? trong m?t th?/c?a s? m?i khi nh?n Ctrl + Enter khi tìm ki?m',
		'ConfPageTitle' : 'Xóa "Facebook |" kh?i tiêu d? c?a m?i trang.',
		'ConfPhotoPopup' : 'Bung ra b?n l?n hon c?a nh?ng b?c ?nh khi d? chu?t ? trên hình ?nh.',
		'ConfPopupAutoClose' : 'T? d?ng dóng hình ?nh bung ra.',
		'ConfPopupSmartAutoClose' : 'Không t? d?ng dóng hình ?nh dã bung ra khi con chu?t ? trên nó.',
		'ConfPopupPosition' : 'V? trí bung hình ?nh',
		'ConfProcessInterval' : 'Kho?ng th?i gian d? x? lý các trang, tính b?ng mili giây (m?c d?nh =1000):',
		'ConfProfileLink' : 'Hi?n th? liên k?t "Trang cá nhân" trên thanh trình don trên cùng.',
		'ConfProfilePicPopup' : 'Bung ra hình ?nh c?a ?nh cá nhân khi d? chu?t ? trên ?nh',
		'ConfProtocolLinks' : 'Turn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Thông tin v? Sinar Script',
		'ConfSectionAdvanced' : 'L?a ch?n nâng cao',
		'ConfSectionEvents' : 'Sinh nh?t/S? Ki?n',
		'ConfSectionImportExport' : 'Nh?p Vào/Trích Xu?t',
		'ConfSectionFeeds' : 'Feeds',
		'ConfSectionHomePage' : 'Trang Ch?',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menus/Chat',
		'ConfSectionOther' : 'L?a ch?n khác',
		'ConfSectionPageTitle' : 'Tiêu d? trang',
		'ConfSectionPictures' : 'Hình ?nh',
		'ConfSectionShortcuts' : 'Phím t?t',
		'ConfSecureLinks' : 'B?t bu?c các link c?a facebook s? d?ng giao th?c https:// .',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - Tùy Ch?nh Sinar Script<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show Sinar Script debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by Sinar Script<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Kích ho?t tính nang phím t?t.',
		'ConfSign' : 'Hi?n chòm sao c?a m?t ngu?i trong thông tin c?a h? (n?u h? cung c?p d?y d? ngày sinh).',
		'ConfTopBarFixed' : 'Gi? thanh th?c don luôn phía trên màn hình, c? khi di chuy?n xu?ng.',
		'ConfTopBarHoverOpacity' : 'Khi chu?t ? trên',
		'ConfTopBarOpacity' : 'Ð? trong su?t c?a thanh th?c don phía trên',
		'ConfUpdates' : 'Hãy truy c?p vào Userscripts.org hàng ngày d? c?p nh?t Sinar Script. ho?c <a href="#" id="fbfUpdateLink" onclick="return false;">ki?m tra ngay</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(Ði?u này s? m?t m?t kho?ng th?i gian n?u b?n có r?t nhi?u b?n bè)',
		'FacebookSinarConflict' : 'Facebook Sinar nay du?c g?i là Sinar Script.<br /><br />B?i vì thay d?i tên nên b?n c?n ph?i t? g? b? Facebook Sinar t? trình duy?t c?a b?n, ho?c hai k?ch b?n s? xung d?t v?i nhau.<br /><br />N?u b?n không bi?t g? b? m?t userscript, <a %s>b?m vào dây d? du?c hu?ng d?n</a>.',
		'fullAlbumLoaded' : 't?i d?y d? album',
		'Import' : 'Nh?p vào',
		'ImportConfirm' : 'B?n có ch?c ch?n mu?n nh?p các thi?t l?p này?\nCác cài d?t hi?n t?i c?a b?n s? b? m?t.',
		'ImportFailure' : 'Ðã x?y ra l?i khi nh?p các thi?t l?p c?a b?n.',
		'ImportSuccess' : 'Quá trình nh?p hoàn thành. B?n có mu?n t?i l?i trang?',
		'Left' : 'Bên trái',
		'LoadingAllPhotos' : 'Ðang t?i t?t c? các ?nh...',
		'loadingFullAlbum' : 'Ðang t?i t?t c? album...',
		'LoadingPic' : 'Ðang t?i ?nh...',
		'LoadPhotosWarning' : 'T?i t?t c? các hình ?nh có th? m?t m?t th?i gian dài',
		'Months' : new Array('Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'),
		'ProtocolSkype' : 'G?i cho %s b?ng Skype',
		'ProtocolMSN' : 'Chat v?i %s b?ng Windows Live',
		'ProtocolYahoo' : 'Chat v?i %s b?ng Yahoo Messenger',
		'ProtocolGoogle' : 'Chat v?i %s b?ng Google Talk',
		'ReloadErrorPage' : 'Click d? th? l?i, ho?c d?i 5 giây',
		'Refresh' : 'Làm Tuoi',
		'Remove' : 'Xóa',
		'Right' : 'Bên ph?i',
		'ShowBigPictures' : 'Hi?n th? hình ?nh l?n',
		'Signs' : new Array('Ma K?t','B?o Bình','Song Ngu','Duong Cuu','Kim Nguu','Song T?','C? Gi?i','Su T?','X? N?','Thiên Bình','H? Cáp','Nhân Mã'),
		'today' : 'hôm nay',
		'Translators' : 'Translators',
		'UpdateAvailable1' : 'Ðã có b?n c?p nh?t m?i cho Sinar Script',
		'UpdateAvailable2' : 'B?n có mu?n c?p nh?t ngay?',
		'UpdateHomepage' : 'Ði d?n trang ch?',
		'UpdateInstall' : 'Cài d?t ngay',
		'UpdateTomorrow' : 'Nh?c l?i sau',
		'ViewAlbumComments' : 'Xem bình lu?n v? album',
		'yearsOld' : '%s tu?i'
	},
	
	// Indonesian - Contributed by Sindhu Pripamungkas (20110222)
	id : {
	   '_language' : 'Bahasa Indonesia',
	   'AddToCalendar' : 'Tambahkan ke kalender',
	   'AddToGoogleCalendar' : 'Tambahkan ke Kalender Google',
	   'all' : 'semua',
	   'All' : 'Semua',
	   'AllPhotosLoaded' : 'Semua foto telah dimuat',
	   'Automatic' : 'Otomatis',
	   'Birthday' : 'Ulang tahun %s',
	   'BookmarkAdd' : 'Tambahkan Bookmark Baru',
	   'BookmarkExists' : 'Sudah ada bookmark tersedia sebelumnya untuk halaman ini.\n\nPergi ke halaman yang Anda ingin bookmark dan coba lagi.',
	   'BookmarkNamePrompt' : 'Masukan nama untuk bookmark ini:\n%s',
	   'BookmarksManage' : 'Atur Bookmarks',
	   'BookmarksRemoveSelected' : 'Hapus Bookmark yang dipilih',
	   'Bookmarks' : 'Bookmark',
	   'BrowserUnsupported' : 'Browser yang Anda gunakan tidak mendukung fitur ini.',
	   'CreatingFile' : 'Membuat File',
	   'Close' : 'Tutup',
	   'ConfigureFacebookSinar' : 'Atur Sinar Script',
	   'ConfigureInstructions' : 'Semua perubahan telah disimpan dengan baik, tapi beberapa perubahan mungkin tidak akan berpengaruh pada tab-tab yang sudah dibuka.',
	   'ConfAge' : 'Tampilkan umur seseorang pada profilnya (apabila mereka menampilkan tanggal ulang tahunnya lengkap).',
	   'ConfApplicationWhitelist' : 'Application Whitelist - Masukan ID applikasi untuk menjaganya dari penyembunyian. Pisahkan dengan spasi.',
	   'ConfAutoBigAlbumPictures' : 'Otomatis tampilkan album gambar lebih besar ketika halaman dibuka.',
	   'ConfAutoLoadFullAlbum' : 'Otomatis memuat penuh semua gambar di dalam album pada satu halaman.',
	   'ConfAutoLoadTaggedPhotos' : 'Otomatis memuat penuh semua foto yang ditandai pada satu halaman. (tab foto pada profil seseorang).',
	   'ConfAutoReadMore' : 'Otomatis klik pada tautan "lihat selengkapnya" .',
	   'ConfBigAlbumPictures' : 'Tambahkan tautan pada halaman album untuk menampilkan versi yang lebih besar dari semua gambar pada halaman tersebut.',
	   'ConfBigAlbumPicturesBorder' : 'Tambahkan border sekitar gambar versi yang lebih besar.',
	   'ConfBookmarks' : 'Tambahkan bookmark submenu ke menu bar atas.',
	   'ConfBottomBarHoverOpacity' : 'Pada mouse-over',
	   'ConfBottomBarOpacity' : 'Menu bar bawah transparan',
	   'ConfCalendarBirthDate' : 'Masukan ulang tahun seseorang pada detail acara.',
	   'ConfCalendarFullName' : 'Gunakan nama lengkap seseorang sebagai judul untuk hari ulang tahun (biasanya hanya nama depan).',
	   'ConfChatDifferentiate' : 'Gunakan huruf tebal dan miring untuk membedakan teman yang tersedia dan diam.',
	   'ConfChatHideIdle' : 'Sembunyikan teman yang diam.',
	   'ConfDelayPopupPics' : 'Tambahkan sebuah penundaan pendek sebelum menampilkan gambar pop-up.',
	   'ConfDelayPopupPicsTimeout' : 'Penundaan sebelum menampilkan gambar popup, dalam millidetik (default=500):',
	   'ConfDownloadVideo' : 'Tambahkan tautan untuk mendownload video dari halaman video. (Anda mungkin membutuhkan <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
	   'ConfErrorPageReload' : 'Otomatis memuat ulang halaman aplikasi error setelah 5 detik.',
	   'ConfExport' : 'Untuk mengexport pengaturan Anda, salinlah teks dibawah dan simpan dalam sebuah file.',
	   'ConfExternalPopup' : 'Versi Popup ukuran penuh untuk gambar luar. <sup>beta</sup>',
	   'ConfFacebookSinarLanguage' : 'Bahasa untuk Sinar Script',
	   'ConfFacebookTimestamps' : 'Tampilkan cap waktu Facebook (contoh "3 jam lalu").',
	   'ConfFBFTimestamps' : 'Tambahkan cap waktu Sinar Script setelah cap waktu Facebook (contoh "11:45").',
	   'ConfFBFTimestamps24' : 'Tampilkan cap waktu Sinar Script dalam format 24 jam.',
	   'ConfFriendRequestCountInTitle' : 'Tampilkan jumlah permintaan teman pada halaman judul.',
	   'ConfGoogleApps' : 'Buat tautan Google Calender kompatibel dengan Google Apps.',
	   'ConfGoogleAppsDomain' : 'Domain',
	   'ConfGoogleCalendar' : 'Tambahkan tautan untuk menambahkan ulang tahun dan acara ke <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
	   'ConfGoogleLanguage' : 'Bahasa untuk for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
	   'ConfHideApplicationStories' : 'Sembunyikan jejak aplikasi.',
	   'ConfHideEgos' : 'Sembunyikan semua bagian "ego" (seharusnya menyembunyikan semua bagian dari rekomendasi Facebook).',
	   'ConfHideEventStories' : 'Sembunyikan jejak acara.',
	   'ConfHideFacebookCountInTitle' : 'Sembunyikan jumlah pesan di kotak masuk.',
	   'ConfHideFriendStories' : 'Sembunyikan jejak teman.',
	   'ConfHideGroupStories' : 'Sembunyikan jejak group.',
	   'ConfHideHovercards' : 'Sembunyikan hovercards (popup yang muncul ketika mouse Anda dia).',
	   'ConfHideLikeStories' : 'Sembunyikan jejak suka.',
	   'ConfHideLinkStories' : 'Sembunyikan jejak tautan.',
	   'ConfHideNoteStories' : 'Sembunyikan jejak catatan.',
	   'ConfHidePhotoStories' : 'Sembunyikan jejak foto.',
	   'ConfHidePlaceStories' : 'Sembunyikan jejak tempat.',
	   'ConfHideProfilePicStories' : 'Sembunyikan jejak foto profil.',
	   'ConfHideRead' : 'Sembunyikan item dalam feed hidup yang sudah dibaca.',
	   'ConfHideRelationshipStories' : 'Hide relationship stories.',
	   'ConfHideStatusStories' : 'Sembunyikan jejak status.',
	   'ConfHideVideoStories' : 'Sembunyikan jejak video.',
	   'ConfHideWallStories' : 'Sembunyikan jejak dinding.',
	   'ConfHomeBeta' : 'Tampilkan bagian Facebook Sneak Peek.',
	   'ConfHomeChat' : 'Tampilkan bagian chat.',
	   'ConfHomeChatNames' : 'Tampilkan nama dalam chat section.',
	   'ConfHomeEvents' : 'Tampilkan bagian event.',
	   'ConfHomeFindFriends' : 'Tampilkan bagian Get Connected.',
	   'ConfHomeLeftAlign' : 'Ratakan kiri konten pada halaman beranda.',
	   'ConfHomeLeftColumn' : 'Tampilkan kolom kiri.',
	   'ConfHomeLeftColumnFixed' : 'Pertahankan agar kolom kiri tetap terlihat, bahkan saat menscroll kebawah.',
	   'ConfHomeLink' : 'Tampilkan tautan Beranda pada menu bara atas.',
	   'ConfHomeNavigation' : 'Tampilkan bagian Navigasi.',
	   'ConfHomePokes' : 'Tampilkan bagian colek.',
	   'ConfHomeProfile' : 'Tampilkan bagian profil.',
	   'ConfHomeRecommendations' : 'Tampilkan rekomendasi (Orang yang mungkin Anda ketahui, Rekomendasi Halaman dll).',
	   'ConfHomeRequests' : 'Tampilkan bagian Permintaan.',
	   'ConfHomeRightColumn' : 'Tampilkan kolom kanan.',
	   'ConfHomeStretch' : 'Regangkan halaman beranda ke ukuran penuh dari browser.',
	   'ConfHomeStretchComments' : 'Regangkan komenter pada halaman beranda.',
	   'ConfiCalendar' : 'Tambahkan tautan unduh pada file <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> dengan semua ulang tahun.',
	   'ConfImport' : 'Untuk mengimport pengaturan Anda nanti, timpa teks di bawah dengan teks yang sudah Anda simpan sebelumnya dan klik "Import".',
	   'ConfInboxCountInTitle' : 'Tampilkan jumlah pesan di kotak masuk pada judul halaman.',
	   'ConfLogoutLink' : 'Tambahkan tautan keluar/logout ke menu bar atas.',
	   'ConfNewTabSearch' : 'Jadikan hasil pencarian terbuka di tab/jendela baru ketika menekan CTRL + Enter untuk mencari.',
	   'ConfPageTitle' : 'Hapus "Facebook |" pada judul halaman pada setiap halaman.',
	   'ConfPhotoPopup' : 'Popup versi lebih besar dari foto pada saat didekatkan mouse.',
	   'ConfPopupAutoClose' : 'Tutup gambar popup otomatis.',
	   'ConfPopupSmartAutoClose' : 'Pertahankan gambar popup dari penutupan otomatis jika mouse meninggalkan popup.',
	   'ConfPopupPosition' : 'Posisi untuk gambar popup',
	   'ConfPopupWhileTagging' : 'Tampilkan gambar popup bahkan saat menandai.',
	   'ConfProcessInterval' : 'Interval untuk memproses halaman, dalam millidetik (default=1000):',
	   'ConfProfileLink' : 'Tampilkan tautan Profil pada menu bar atas.',
	   'ConfProfilePicPopup' : 'Popup versi lebih besar untuk gambar pada saat didekatkan dengan mouse.',
	   'ConfProtocolLinks' : 'Ubah ID messenger dalam profil ke tautan untuk memulai percakapan dengan merekaTurn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
	   'ConfSectionAbout' : 'Tentang Sinar Script',
	   'ConfSectionAdvanced' : 'Lebih Rumit',
	   'ConfSectionEvents' : 'Ulang Tahun/Acara',
	   'ConfSectionImportExport' : 'Import/Export',
	   'ConfSectionFeeds' : 'Feed',
	   'ConfSectionHomePage' : 'Home Page',
	   'ConfSectionLiveFeed' : 'Feed Hidup',
	   'ConfSectionMenu' : 'Menu/Chat',
	   'ConfSectionOther' : 'Pengaturan lain',
	   'ConfSectionPageTitle' : 'Judul halaman',
	   'ConfSectionPictures' : 'Gambar',
	   'ConfSectionShortcuts' : 'Keyboard Shortcuts',
	   'ConfSecureLinks' : 'Perintah tautan Facebook menuju halaman HTTPS.',
	   'ConfShortcutList' : '<b>Keyboard Shortcut</b> (case sensitive):<br /><br /><i>Dari beberapa halaman:</i><br />&nbsp;<b>A</b> - Album/foto<br />&nbsp;<b>B</b> - Daftar teman (teman yang sedang online)<br />&nbsp;<b>C</b> - Pengaturan Sinar Script<br />&nbsp;<b>D</b> - Ulang Tahun<br />&nbsp;<b>E</b> - Acara<br />&nbsp;<b>F</b> - Teman<br />&nbsp;<b>H</b> - Halaman Beranda<br />&nbsp;<b>I</b> - Kotak Masuk<br />&nbsp;<b>K</b> - Tambahkan Bookmark<br />&nbsp;<b>L</b> - Pilih tautan keluar/logout (tekan Enter setelah itu untuk loh out)<br />&nbsp;<b>N</b> - Pemberitahuan<br />&nbsp;<b>P</b> - Profile Anda<br />&nbsp;<b>R</b> - Permintaan<br />&nbsp;<b>S</b> - Pencarian<br />&nbsp;<b>T</b> - Terjemahkan teks terpilih<br />&nbsp;<b>?</b> - Tampilkan info debug Sinar Script<br />&nbsp;<b>&lt;escape&gt;</b> - Tutup popp-up yang dibuat Sinar Script<br /><br /><i>Dari halaman beranda (filter)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - feed hidup<br />&nbsp;<b>g</b> - Group<br />&nbsp;<b>l</b> - Tautan<br />&nbsp;<b>n</b> - feed berita<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>s</b> or <b>u</b> - Status<br />&nbsp;<b>t</b> - Catatan<br />&nbsp;<b>v</b> - Video<br /><br /><i>Dari profil</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>w</b> - Dindinf<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>Dari halaman dengan pagination (previous, next, dll)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (jika tersedia)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (jika tersedia)<br /><br /><i>Ketika melihat album/foto:</i><br />&nbsp;<b>a</b> - Muat semua penuh (jika tersedia)<br />&nbsp;<b>b</b> - Tmapilkan gambar besar<br />&nbsp;<b>c</b> - Lihat komentar<br />&nbsp;<b>k</b> - Kembali ke album<br />&nbsp;<b>m</b> - Foto dari (seseorang) dan saya<br /><br /><i>Ketika melihat album sekarang dan foto yang dipload/tag:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Album sekarang<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Upload dari Hp<br />&nbsp;<b>o</b> - Foto dari saya<br />&nbsp;<b>p</b> - Foto saya<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Teman yang ditandai',
	   'ConfShortcuts' : 'Aktifkan keyboard shortcut.',
	   'ConfSign' : 'Tampilkan zodiak seseorang pada profilnya (apabila mereka menampilkan tanggal ulang tahunnya lengkap).',
	   'ConfTopBarFixed' : 'Selalu pertahankan menu bar atas pada layar, juga saat menggulung layar browser Anda.',
	   'ConfTopBarHoverOpacity' : 'Pada mouse-over',
	   'ConfTopBarOpacity' : 'Menu bar atas transparan',
	   'ConfUpdates' : 'Cek Userscripts.org setiap hari untuk update Sinar Script. Atau <a href="#" id="fbfUpdateLink" onclick="return false;">cek sekarang</a>.',
	   'DownloadVideo' : 'Unduh Video',
	   'ExportICalendarFile' : 'Export file iCalendar',
	   'ExportICalendarFileWarning' : '(Ini akan memakan waktu lama apabila Anda mempunyai banyak teman)',
	   'FacebookSinarConflict' : 'Facebook Sinar sekarang dikenal dengan nama Sinar Script.<br /><br />Karena pergantian nama Anda harus menguninstal Facebook Sinar dari browser Anda, atau dua script ini akan bertentangan satu sama lain.<br /><br />Jika Anda tidak mengetahui cara untuk menguninstal script ini, <a %s>Klick disini untuk tata caranya</a>.',
	   'fullAlbumLoaded' : 'album telah dimuat',
	   'Import' : 'Import',
	   'ImportConfirm' : 'Apakag Anda yakin ingin mengimport peraturan ini?\nPeraturan Anda sekarang akan hilang.',
	   'ImportFailure' : 'Kesalahan terjadi ketika mencoba untuk mengimport peraturan Anda.',
	   'ImportSuccess' : 'Import berhasil. Apakah Anda ingin untuk memuat ulang halaman?',
	   'Left' : 'Kiri',
	   'LoadingAllPhotos' : 'Memuat semua foto...',
	   'loadingFullAlbum' : 'memuat album lengkap...',
	   'LoadingPic' : 'Memuat Gambar...',
	   'LoadPhotosWarning' : 'Pemuatan semua foto mungkin butuh waktu lama',
	   'Months' : new Array('Januari','Februari','Maret','April','May','Junu','Julu','Agustus','September','Oktober','November','Desember'),
	   'ProtocolSkype' : 'Berbicara dengan %s menggunakan Skype',
	   'ProtocolMSN' : 'Chat dengan %s menggunakan Windows Live',
	   'ProtocolYahoo' : 'Chat dengan %s menggunakan Yahoo Messenger',
	   'ProtocolGoogle' : 'Chat dengan %s menggunakan Google Talk',
	   'ReloadErrorPage' : 'Klik untuk mencoba lagi, atau tunggu 5 detik lagi',
	   'Refresh' : 'Muat Ulang',
	   'Remove' : 'Hapus',
	   'Right' : 'Kanan',
	   'ShowBigPictures' : 'Tampilkan Gambar-gambar Besar',
	   'Signs' : new Array('Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius'),
	   'today' : 'hari ini',
	   'Translators' : 'Penerjemah',
	   'UpdateAvailable1' : 'Update tersedia untuk Sinar Script',
	   'UpdateAvailable2' : 'Apakah Anda ingin mengupdate sekarang?',
	   'UpdateHomepage' : 'Pergi ke halaman beranda',
	   'UpdateInstall' : 'Instal sekarang',
	   'UpdateTomorrow' : 'Peringatkan besok',
	   'yearsOld' : '%s tahun'
	},
	
	// Japanese - Contributed by Masami HIRATA (20110306)
	ja : {
		'_language' : '???',
		'AddToCalendar' : '????????',
		'AddToGoogleCalendar' : 'Google????????',
		'all' : '??',
		'All' : '??',
		'AllPhotosLoaded' : '?????????',
		'Automatic' : '??',
		'Birthday' : '%s??????',
		'BookmarkAdd' : '????????????',
		'BookmarkExists' : '????????????????????.\n\n?????????????????????????????.',
		'BookmarkNamePrompt' : '????????????????????:\n%s',
		'BookmarksConfirmRemoval' : '??????????????????????',
		'BookmarksManage' : '?????????',
		'BookmarksRemoveSelected' : '?????????????',
		'Bookmarks' : '???',
		'BrowserUnsupported' : '????????????????????.',
		'CreatingFile' : '????????????',
		'Close' : '???',
		'ConfigureFacebookSinar' : 'Sinar Script??',
		'ConfigureInstructions' : '?????????????,??????????????????????',
		'ConfAge' : '??????????????(?????????????????)',
		'ConfApplicationWhitelist' : '??????????????? - ??????????????????ID?????????.ID?????????????.',
		'ConfAutoBigAlbumPictures' : '???????????????????????????',
		'ConfAutoLoadFullAlbum' : '????????????????????????????????',
		'ConfAutoLoadTaggedPhotos' : '?????(???????????)????????????????????????????',
		'ConfAutoReadMore' : '?????????????????????',
		'ConfBigAlbumPictures' : '????????????????????????????????????????',
		'ConfBigAlbumPicturesBorder' : '??????????????????????',
		'ConfBookmarks' : '??????????????????????????',
		'ConfBottomBarHoverOpacity' : '????????',
		'ConfBottomBarOpacity' : '????????????',
		'ConfCalendarBirthDate' : '???????????????',
		'ConfCalendarFullName' : '?????????(??????????????)????????',
		'ConfChatDifferentiate' : '??????????????????????????????',
		'ConfChatHideIdle' : '????????????',
		'ConfDelayPopupPics' : '??????????????????????????',
		'ConfDelayPopupPicsTimeout' : '???????????????????(?????,??????500???): ',
		'ConfDownloadVideo' : '???????????????????????????(<a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV?????</a>?????)',
		'ConfDisableTheater' : '????????????',
		'ConfErrorPageReload' : '????????????????5?????????',
		'ConfExport' : '??????????????????????????????????????.',
		'ConfExternalPopup' : '???????????????????????? <sup>beta</sup>',
		'ConfFacebookSinarLanguage' : 'Sinar Script???',
		'ConfFacebookTimestamps' : '???Facebook???????(?: "3???")',
		'ConfFBFTimestamps' : 'Facebook????????FFxier??????????(?: "11:45")',
		'ConfFBFTimestamps24' : 'Sinar Script??????24???????',
		'ConfFriendRequestCountInTitle' : '????????????????????????',
		'ConfGoogleApps' : 'Google Apps?Google???????????????',
		'ConfGoogleAppsDomain' : '?????',
		'ConfGoogleCalendar' : '<a href="http://ja.wikipedia.org/wiki/Google%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC" target="_blank">Google?????</a>??????????????????????',
		'ConfGoogleLanguage' : '<a href="http://ja.wikipedia.org/wiki/Google%E7%BF%BB%E8%A8%B3" target="_blank">Google??</a>???',
		'ConfHideApplicationStories' : '??????????????',
		'ConfHideEgos' : 'ego??????????(Facebook???????????????)',
		'ConfHideEventStories' : '??????????',
		'ConfHideFacebookCountInTitle' : 'Facebook?????????????????????',
		'ConfHideFriendStories' : '??????????????',
		'ConfHideGroupStories' : '??????????',
		'ConfHideHovercards' : 'Hovercard(???????????????????????)???',
		'ConfHideLikeStories' : '???!??????',
		'ConfHideLinkStories' : '?????????',
		'ConfHideNoteStories' : '?????????',
		'ConfHidePhotoStories' : '????????',
		'ConfHidePlaceStories' : '??????????',
		'ConfHideProfilePicStories' : '?????????????????????',
		'ConfHideRead' : '???????????????',
		'ConfHideRelationshipStories' : '?????????????',
		'ConfHideStatusStories' : '????????',
		'ConfHideVideoStories' : '????????',
		'ConfHideWallStories' : '??????????',
		'ConfHomeBeta' : 'Facebook Sneak Peek?????',
		'ConfHomeChat' : '?????????',
		'ConfHomeChatNames' : '????????????',
		'ConfHomeEvents' : '?????????',
		'ConfHomeFindFriends' : 'Facebook???????????',
		'ConfHomeLeftAlign' : '?????????????',
		'ConfHomeLeftColumn' : '?????????',
		'ConfHomeLeftColumnFixed' : '?????????????????????????',
		'ConfHomeLink' : '??????????????????????',
		'ConfHomeNavigation' : '??????????',
		'ConfHomePokes' : '?????????',
		'ConfHomeProfile' : '???????????',
		'ConfHomeRecommendations' : '?????????(???????,????????????)',
		'ConfHomeRequests' : '??????????',
		'ConfHomeRightColumn' : '?????????',
		'ConfHomeStretch' : '??????????????????',
		'ConfHomeStretchMiddleColumn' : '??????????????????',
		'ConfiCalendar' : '???????<a href="http://ja.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>?????????????????????',
		'ConfImport' : '???????????????,???????????????????????????????????????????.',
		'ConfInboxCountInTitle' : '?????????????????????????',
		'ConfLogoutLink' : '????????????????????????',
		'ConfNotificationCountInTitle' : '??????????????????????',
		'ConfNewTabSearch' : 'CTRL + Enter???????????????/?????????????',
		'ConfPageTitle' : '?????????????Facebook |??????',
		'ConfPhotoPopup' : '?????????????????????????????',
		'ConfPopupAutoClose' : '????????????????',
		'ConfPopupSmartAutoClose' : '??????????????????????????????',
		'ConfPopupPosition' : '???????????',
		'ConfPopupWhileTagging' : '????????????????????????',
		'ConfProcessInterval' : '??????????(?????,??????1000???): ',
		'ConfProfileLink' : '?????????????????????????',
		'ConfProfilePicPopup' : '???????????????????????????????????',
		'ConfProtocolLinks' : '??????????????ID???????????????(Google???,Windows Live?)',
		'ConfSectionAbout' : 'Sinar Script????',
		'ConfSectionAdvanced' : '??',
		'ConfSectionEvents' : '???/????',
		'ConfSectionImportExport' : '?????/??????',
		'ConfSectionFeeds' : '????',
		'ConfSectionHomePage' : '??????',
		'ConfSectionLiveFeed' : '????????',
		'ConfSectionMenu' : '????/????',
		'ConfSectionOther' : '?????????',
		'ConfSectionPageTitle' : '???????',
		'ConfSectionPictures' : '??',
		'ConfSectionShortcuts' : '????????????',
		'ConfSecureLinks' : 'Facebook??????HTTPS?????????',
		'ConfShortcutList' : '<b>????? ???????</b>(?????????????):<br /><br /><i>?????????:</i><br />&nbsp;<b>A</b> - ????/??<br />&nbsp;<b>B</b> - ??????(????????)????<br />&nbsp;<b>C</b> - Sinar Script??<br />&nbsp;<b>D</b> - ???<br />&nbsp;<b>E</b> - ????<br />&nbsp;<b>F</b> - ??<br />&nbsp;<b>H</b> - ???<br />&nbsp;<b>I</b> - ???<br />&nbsp;<b>K</b> - ?????????<br />&nbsp;<b>L</b> - ????????????? (????Enter????????????)<br />&nbsp;<b>N</b> - ????<br />&nbsp;<b>P</b> - ??????<br />&nbsp;<b>R</b> - ?????<br />&nbsp;<b>S</b> - ???????????<br />&nbsp;<b>T</b> - ????????????<br />&nbsp;<b>?</b> - Sinar Script??????????<br />&nbsp;<b>&lt;escape&gt;</b> - Sinar Script???????????????<br /><br /><i>??????(????)</i>:<br />&nbsp;<b>a</b> - ???<br />&nbsp;<b>f</b> - ????<br />&nbsp;<b>g</b> - ????<br />&nbsp;<b>l</b> - ???<br />&nbsp;<b>n</b> - ????????<br />&nbsp;<b>p</b> - ??<br />&nbsp;<b>s</b> / <b>u</b> - ????????<br />&nbsp;<b>t</b> - ???<br />&nbsp;<b>v</b> - ??<br /><br /><i>?????????</i>:<br />&nbsp;<b>i</b> - ?????<br />&nbsp;<b>p</b> - ??<br />&nbsp;<b>w</b> - ????<br />&nbsp;<b>x</b> - ????<br /><br /><i>?????(??,???)?????????</i><br />&nbsp;<b>?</b> - ??<br />&nbsp;<b>?</b> - ??<br />&nbsp;<b>&lt;shift&gt; + ?</b> - ???(??????)<br />&nbsp;<b>&lt;shift&gt; + ?</b> - ???(??????)<br /><br /><i>????/??????:</i><br />&nbsp;<b>a</b> - ?????????????(??????)<br />&nbsp;<b>b</b> - ????????<br />&nbsp;<b>c</b> - ???????<br />&nbsp;<b>k</b> - ???????<br />&nbsp;<b>m</b> - (???)??????<br /><br /><i>????????????/?????????????:</i><br />&nbsp;<b>a</b> / &nbsp;<b>r</b> - ???????<br />&nbsp;<b>m</b> / &nbsp;<b>u</b> - ????????<br />&nbsp;<b>o</b> - ?????????<br />&nbsp;<b>p</b> - ??????<br />&nbsp;<b>t</b> / &nbsp;<b>f</b> - ???????????',
		'ConfShortcuts' : '??????????????????.',
		'ConfSign' : '??????????????(?????????????)',
		'ConfTopBarFixed' : '????????????????????????????',
		'ConfTopBarHoverOpacity' : '????????',
		'ConfTopBarOpacity' : '????????????',
		'ConfUpdates' : 'Sinar Script???????? Userscripts.org ???????.???<a href="#" id="fbfUpdateLink" onclick="return false;">?????</a>??.',
		'DownloadVideo' : '?????????',
		'ExportICalendarFile' : 'iCalendar?????????????',
		'ExportICalendarFileWarning' : '(??????????????????????)',
		'FacebookSinarConflict' : 'Facebook Sinar?Sinar Script???????????.<br /><br />??????????,??????Facebook Sinar????????????????2????????????????????????.<br /><br />userscript???????????????????????,<a %s>?????????????.(?: ??)</a>',
		'fullAlbumLoaded' : '???????????????',
		'Import' : '?????',
		'ImportConfirm' : '??????????????????????\n???????????',
		'ImportFailure' : '????????????????????.',
		'ImportSuccess' : '????????????.???????????',
		'Left' : '?',
		'LoadingAllPhotos' : '???????????...',
		'loadingFullAlbum' : '?????????????...',
		'LoadingPic' : '????????...',
		'LoadPhotosWarning' : '?????????????????????????',
		'Months' : new Array('1?','2?','3?','4?','5?','6?','7?','8?','9?','10?','11?','12?'),
		'ProtocolSkype' : '%s???Skype?????',
		'ProtocolMSN' : '%s???Windows Live???????',
		'ProtocolYahoo' : '%s???Yahoo!??????????????',
		'ProtocolGoogle' : '%s???Google??????????',
		'ReloadErrorPage' : '???????????5????????',
		'Refresh' : '??',
		'Remove' : '??',
		'Right' : '?',
		'ShowBigPictures' : '????????',
		'Signs' : new Array('???','???','??','???','???','???','??','???','???','???','??','???'),
		'today' : '??',
		'Translators' : '??',
		'UpdateAvailable1' : 'Sinar Script???????????.',
		'UpdateAvailable2' : '??????????????',
		'UpdateHomepage' : '???????',
		'UpdateInstall' : '???????????',
		'UpdateTomorrow' : '????????????',
		'yearsOld' : '%s?'
	}
	
}

//
// Get Elements
//
function $(q, root, single) {
	if (root && typeof root == 'string') {
		root = $(root, null, true);
		if (!root) { return null; }
	}
	root = root || document;
	if (q[0]=='#') { return root.getElementById(q.substr(1)); }
	else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
	return root.getElementsByTagName(q);
}

//
// Greasemonkey functions / cross-browser stuff
//

// Figure out what type of storage should be used
var storage = 'none';
try {
	if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
		// Make sure greasemonkey's functions work cause some browsers lie. Yes Chrome/Chromium, I'm talking about you...
		GM_setValue('testkey', 'testvalue');
		if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
	}
} catch(x) {}
if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

//
// Implement JSON functions if they're not already defined - based on http://www.sitepoint.com/blogs/2009/08/19/javascript-json-serialization/
//
if (!this.JSON) {
	JSON = {};
	JSON.stringify = function (obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			if (t == "string") obj = '"'+obj.replace(/"/g,'\\"')+'"';
			return String(obj);
		} else {
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n]; t = typeof(v);
				if (t == "string") v = '"'+v.replace(/"/g,'\\"')+'"';
				else if (t == "object" && v !== null) v = JSON.stringify(v);
				json.push((arr ? "" : '"' + n + '":') + String(v));
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};
	JSON.parse = function (str) {
		if (str === "") str = '""';
		eval("var p=" + str + ";");
		return p;
	};
}

function setValue(key, value) {
	prefs[key] = value;
	switch (storage) {
		case 'greasemonkey':
			GM_setValue(id+'-'+key, value);
			break;

		case 'localstorage':
			localStorage['fbf-'+id+'-'+key] = value;
			break;
	}
}

function getValue(key, value) {
	switch (storage) {
		case 'greasemonkey':
			return GM_getValue(id+'-'+key, value);

		case 'localstorage':
			var val = localStorage['fbf-'+id+'-'+key];
			if (val=='true') { return true; }
			else if (val=='false') { return false; }
			else if (val) { return val; }
			break;
	}
	return value;
}

function log(str) {
	if (typeof debug !== 'undefined') { debug(str); }
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

function getStyle(elm, prop) {
	return window.getComputedStyle(elm, null).getPropertyValue(prop);
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

function row(cells) { return '<tr><td>' + cells.join('</td><td>') + '</td></tr>'; }


//
// Enable profile-specific settings
//
try {
	var profileLink = $("//ul[@id='pageNav']//a[@accesskey='2']",null,true);
	if (m = profileLink.href.match(/id=(\d+)\b/)) { id = m[1]; }
	else if (m = profileLink.href.match(/\/([^\/]+)$/)) { id = m[1]; }
} catch(x) {}
//log('id = ' + id); // DEBUG ONLY
var buf  =	'ProfilePicPopup,PhotoPopup,ExternalPopup,!DelayPopupPics,PopupAutoClose,!PopupSmartAutoClose,!PopupWhileTagging,BigAlbumPictures,BigAlbumPicturesBorder,!AutoBigAlbumPictures,!AutoLoadFullAlbum,!AutoLoadTaggedPhotos,!DisableTheater,'+
			'Age,Sign,iCalendar,GoogleCalendar,CalendarFullName,CalendarBirthDate,!GoogleApps,'+
			'!HomeLeftAlign,!HomeStretch,!HomeStretchMiddleColumn,!HomeLeftColumnFixed,HomeLeftColumn,HomeRightColumn,HomeProfile,HomeNavigation,HomeChat,!HomeChatNames,HomePokes,HomeFindFriends,HomeEvents,HomeRequests,HomeBeta,HomeRecommendations,'+
			'Bookmarks,HomeLink,ProfileLink,LogoutLink,ChatDifferentiate,!ChatHideIdle,DownloadVideo,ErrorPageReload,PageTitle,HideFacebookCountInTitle,!FriendRequestCountInTitle,!NotificationCountInTitle,InboxCountInTitle,NewTabSearch,!SecureLinks,Updates,ProtocolLinks,!TopBarFixed,Shortcuts,!FacebookTimestamps,FBFTimestamps,FBFTimestamps24,'+
			'!HideApplicationStories,!HideEventStories,!HideFriendStories,!HideGroupStories,!HideLikeStories,!HideLinkStories,!HideNoteStories,!HidePhotoStories,!HidePlaceStories,!HideProfilePicStories,!HideRelationshipStories,!HideStatusStories,!HideVideoStories,!HideWallStories,!AutoReadMore,!HideEgos,!HideHovercards';
var booleanOptions = buf.split(',');
var prefs = {
	'FacebookSinarLanguage': getValue('FacebookSinarLanguage', 'auto'),
	'PopupPosition': getValue('PopupPosition', 'auto'),
	'GoogleAppsDomain': getValue('GoogleAppsDomain', ''),
	'TopBarOpacity': getValue('TopBarOpacity', '1.0'),
	'TopBarHoverOpacity': getValue('TopBarHoverOpacity', '1.0'),
	'BottomBarOpacity': getValue('BottomBarOpacity', '0.9'),
	'BottomBarHoverOpacity': getValue('BottomBarHoverOpacity', '1.0'),
	'GoogleLanguage': getValue('GoogleLanguage', 'en'),
	'ProcessInterval': getValue('ProcessInterval', '1000'),
	'DelayPopupPicsTimeout' : getValue('DelayPopupPicsTimeout', '500'),
	'BookmarkList' : getValue('BookmarkList', '[]'),
	'ApplicationWhitelist' : getValue('ApplicationWhitelist', '[]'),
	'CustomFeedModification' : getValue('CustomFeedModification', ''),
	'CustomCSS' : getValue('CustomCSS', '')
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
// Adjust legacy prefs
//
prefs['PopupPosition'] = prefs['PopupPosition'].toLowerCase().replace(/^-/, ''); // The replace is to handle a bug in 2.1.4
setValue('PopupPosition', prefs['PopupPosition']);

//
// Figure out what language we should be using
//
buffer = document.body.className.match(/locale_([^ ]+)/i);
if (prefs['FacebookSinarLanguage'] == 'auto' && buffer) {
	language = buffer[1].toLowerCase();
	detectedLanguage = language;
	if (!lang[language]) {
		language = language.split('_')[0];
		if (!lang[language]) { language = 'en'; }
	}
} else {
	language = prefs['FacebookSinarLanguage'];
}
//log(language); // DEBUG ONLY

//
// Add styles used by script
//
addStyle(
	'.fbfPopup { padding:10px; background:#f6f6f6; border:3px double #666666; -moz-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px; border-radius:5px; }'+
	'.fbfPopupContainer { display:none; top:0; right:0; bottom:0; left:0; }'+
	'#ff-popup-pic-div { display:none; background:white; border:1px solid #333; position:fixed !important; top:3px !important; padding:4px; min-width:130px; z-index:99999 !important; -moz-border-radius:3px; -webkit-border-radius:3px; -khtml-border-radius:3px; border-radius:3px; }'+
	'.ff-popup-pic-div-left { left:3px !important; right:auto !important; -moz-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:5px 5px 5px rgba(0,0,0,0.6); box-shadow:5px 5px 5px rgba(0,0,0,0.6); }'+
	'.ff-popup-pic-div-right { right:3px !important; left:auto !important; -moz-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); box-shadow:-5px 5px 5px rgba(0,0,0,0.6); }'+
	'#ff-popup-pic-div img { max-height: ' + (window.innerHeight-35) + 'px; }'+
	'#ff-popup-pic-close { display:none; position:absolute; top:4px; right:10px; color:#ff9999; cursor:pointer; font-weight:bold; font-size:14px; }'+
	'#ff-popup-pic-div:hover #ff-popup-pic-close { display:block; }'+
	'#ff-popup-pic-close:hover { color:#aa6666; }'+
	'#ff-popup-pic-image { text-align:center; }'+
	'#ff-popup-pic-image img { color:#999999; display:block; }'+
	'#FBFBigAlbumContainer { padding:0 0 40px; }'+
	'#FBFBigAlbum { padding:15px 3px; margin:10px; text-align:center; position:relative; }'+
	'#FBFBigAlbum a { padding:1px; }'+
	'.FBFBigAlbumClose { color:red; cursor:pointer; font-weight:bold; padding:0 10px; }'+
	'#FBFBigAlbumClose1 { position:absolute; top:0; right:0; }'+
	'#FBFBigAlbumClose2 { position:absolute; bottom:0; right:0; }'+
	'#FBFConfigContainer { z-index:1001; }'+
	'#FBFConfig { width:700px; padding:10px; margin:20px auto 0; }'+
	'#FBFConfig label, #FBFConfig .fbfLabel { color:#666666; font-weight:normal; } '+
	'#FBFConfig .fbfHeader { font-weight:bold; }'+
	'#FBFConfigShadow, #fbfShadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.8; }'+
	'#fbfUpdatePopup { max-width:450px; margin:100px auto; padding:10px; }'+
	'.fbfImportant { font-weight:bold; }'+
	'.fbfNote { color:#777777; }'+
	'.fbfRight { text-align:right; }'+
	'.ad_story .social_ad_advert { z-index:0; }'+
	'.ff-album-page td { background:#aaa; text-align:center; }'+
	'#ff-debug td { vertical-align:top; }'+
	'.Sinar Script-highlighted-story, .Sinar Script-highlighted-story * { font-weight:bold !important; }'
);
if (prefs['CustomCSS'].length>0) { addStyle(prefs['CustomCSS']); }

//
// Add div for showing big profile pics
//
var popupPicDiv = document.createElement('div');
popupPicDiv.id = 'ff-popup-pic-div';
popupPicDiv.className = 'fbfPopup ff-popup-pic-div-' + (prefs['PopupPosition']=='auto' ? 'left' : prefs['PopupPosition']);
popupPicDiv.innerHTML = '<div id="ff-popup-pic-close" title="' + $l('Close') + '">x</div><div id="ff-popup-pic-image"><span></span></div>';
try {
	document.body.insertBefore(popupPicDiv, document.body.lastChild.nextSibling);
	on('click', '#ff-popup-pic-close', function() { document.getElementById('ff-popup-pic-div').style.display='none'; });
} catch(x) {
	var fbppdivAdder = setInterval(function() {
		try {
			document.body.insertBefore(popupPicDiv, document.body.lastChild.nextSibling);
			on('click', '#ff-popup-pic-close', function() { document.getElementById('ff-popup-pic-div').style.display='none'; });
			if ($('#ff-popup-pic-div')) { clearInterval(fbppdivAdder); }
		} catch(x) {}
	}, 100);
}
// Listeners are added by the code for showing the popups

//
// Add div for popups and shadows
//
var popupDiv = document.createElement('div');
popupDiv.id = 'fbfPopupContainer';
popupDiv.className = 'fbfPopupContainer';
document.body.appendChild(popupDiv);
on('click', popupDiv, function(e) { if (e.target.id=='fbfPopupContainer') { hidePopup() } });
var shadowDiv = document.createElement('div');
shadowDiv.id = 'fbfShadow';
document.body.appendChild(shadowDiv);

//
// Misc. Short Functions
//

// Get a string in the current language, or default to english
function $l(key,text) {
	var string, l;
	if (lang[language][key]) { string = lang[language][key]; l = language; }
	else { string = lang['en'][key]; l = 'en'}
	if (text) { string = string.replace('%s', text); }
	return string;
}

// Pad with a 0
function $0(x) { return x<10 ? '0'+x : ''+x; }

// Add event listeners
function on(type, elm, func) {
	if (type instanceof Array) { for (var i=0; i<type.length; i++) { on(type[i], elm, func); } }
	else {
		if (elm instanceof Array) { for (var j=0; j<elm.length; j++) { on(type, elm[j], func); } }
		else { (typeof elm === 'string' ? $(elm) : elm).addEventListener(type, func, false); }
	}
}

// Add 'click' event listener
function onClick(elm, func) { (typeof elm === 'string' ? $('#'+elm) : elm).addEventListener('click', func, false); }

// Click on an element
function click(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initEvent('click', true, true);
	elm.dispatchEvent(evt);
}

// Click on an element selected using xpath
function clickX(path) {
	var elm = $(path, null, true);
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
	return !!(page.match(/^((\?|home\.php).*)?$/));
}

// Log an error
function logError(category, x) {
	msg = "FBF Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber + ' while viewing ' + page;
	log(msg);
}

// Show a popup div with a shadow background
function showPopup(content, onTop, fixedPosition) {
	$('#fbfPopupContainer').innerHTML = content;
	$('#fbfPopupContainer').style.position = fixedPosition ? 'fixed' : 'absolute';
	$('#fbfShadow').style.zIndex = '1000';
	$('#fbfPopupContainer').style.zIndex = '1001';
	$('#fbfShadow').style.display = 'block';
	$('#fbfPopupContainer').style.display = 'block';
	if (!fixedPosition) { window.scroll(0,0); }
}

// Show a popup dialog - similar to showPopup() but more automated
function showDialog(content, controls, opts) {
	if (!opts) { opts=''; }
	if (!controls) { controls=''; }
	if (!opts.match(/\bnocontrols\b/)) { content+= '<div style="border-top:1px solid #ccc; margin-top:10px; padding-top:10px; text-align:right;">' + controls + (opts.match(/\bnoclose\b/) ? '' : '<input type="button" value="' + $l('Close') + '" id="ff-popup-close" />') + '</div>'; }
	showPopup('<div class="fbfPopup" style="' + (opts.match(/\bsmall\b/) ? 'max-width:450px; margin:80px auto;' : 'max-width:700px; margin:30px auto;') + '">' + content + '</div>');
	if (!opts.match(/\b(noclose|nocontrols)\b/)) { onClick($('#ff-popup-close'), hidePopup); }
}

// Hide popups created with showPopup()
function hidePopup() {
	if ($('#fbfPopupContainer')) {
		$('#fbfPopupContainer').style.display = 'none';
		$('#fbfShadow').style.display = 'none';
	}
}

// Figure out the month from a string containing a date
function $m(str) {
	// Supports: English (UK+US), Spanish, French, German, Dutch, Italian, Portuguese (Brazil+Portugal), Swedish, Greek, Serbian, Bulgarian, Slovak, Czech
	str = str.toLowerCase();
	var months = new Array (/^(.*\s)?(jan(uar[iy]?)?|enero|janvier|gennaio|janeiro|?a???a????|??????|??????|januára|leden)(\s.*)?$/,
							/^(.*\s)?(feb(ruar[iy]?)?|febrero|février|febbraio|fevereiro|feß???a????|???????|????????|februára|únor)(\s.*)?$/,
							/^(.*\s)?(mar(ch)?|marzo|mars|märz|maart|março|µa?t???|????|marca|brezen)(\s.*)?$/,
							/^(.*\s)?(apr(ile?)?|abril|avril|ap??????|?????|apríla|duben)(\s.*)?$/,
							/^(.*\s)?(ma(yo?|i|j)|mei|maggio|maio|µa???|???|???|mája|kveten)(\s.*)?$/,
							/^(.*\s)?(june?|junio?|juin|giugno|junho|???????|???|???|júna|cerven)(\s.*)?$/,
							/^(.*\s)?(jul[iy]?|julio|juillet|luglio|julho|???????|???|???|júla|cervenec)(\s.*)?$/,
							/^(.*\s)?(aug(ust(i|us)?)?|agosto|août|a????st??|??????|augusta|srpen)(\s.*)?$/,
							/^(.*\s)?(sep(tember)?|septiembre|se[pt]tembre|setembro|septeµß????|?????????|?????????|septembra|zárí)(\s.*)?$/,
							/^(.*\s)?(o[ck]t(ober)?|oct[ou]bre|ottobre|outubro|??t?ß????|???????|????????|októbra|ríjen)(\s.*)?$/,
							/^(.*\s)?(nov(ember)?|noviembre|novembre|novembro|??eµß????|????????|???????|novembra|listopad)(\s.*)?$/,
							/^(.*\s)?(de[cz](ember)?|dici?embre|décembre|dezembro|de?eµß????|????????|????????|decembra|prosinec)(\s.*)?$/);
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
		var month = $m(str);
		if (month==-1) return null;
		date.setMonth(month);
		if (m = str.match(/\b(\d{4})\b/)) { date.setYear(m[1]); }
		if (m = str.match(/\s(\d\d?\.?)[\s,]/)) { if (m[1]<32) { date.setDate(m[1]); } }
	}
	if (m = str.match(/\b(\d\d?):(\d\d)( (a|p)m)?/i)) {
		date.setHours(m[4]=='p' ? m[1]-0+12 : m[1]);
		date.setMinutes(m[2]);
		date.setSeconds(0);
	}
	return date;
}


//
// Rotate an object
//
function rotate(elm) {
	degrees=((elm.getAttribute('data-ff-degrees') || 0) - 0 + 90 ) % 360;
	elm.setAttribute('data-ff-degrees', degrees);
	elm.style.margin = '25px 0';
	elm.style.transform = 'rotate(' + degrees + 'deg)';
	elm.style.MozTransform = 'rotate(' + degrees + 'deg)';
	elm.style.OTransform = 'rotate(' + degrees + 'deg)';
	elm.style.WebkitTransform = 'rotate(' + degrees + 'deg)';
}


//
// Google Translate functions
//
function handleTranslateRequest() { showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; "><b>Translating...</b> (press escape to close this popup)</div>', true, true); }
function handleTranslateResponse(r) {
	//window.alert(r.responseText);
	//window.alert(r.responseText.match(/^\[(\[.*?\]\])/)[1]);
	//t = JSON.parse(r.responseText.replace('],,"', '],"","'));
	t = JSON.parse(r.responseText.match(/^\[(\[.*?\]\])/)[1]);
	translated = Array();
	for (var i=0; i<t.length; i++) { translated.push(t[i][0]); }
	showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; "><b>Translated Text via Google Translate</b> (automatically translated to ' + prefs['GoogleLanguage'] + '):<br /><br />' + translated.join(' ') + '<div style="text-align:right;"><input id="fbfCloseTranslation" type="button" value="' + $l('Close') + '" /></div></div>', true, true);
	onClick('fbfCloseTranslation', function() { hidePopup(); });
}
function googleTranslate(str) {
	if (typeof GM_xmlhttpRequest !== 'undefined') {
		handleTranslateRequest();
		xmlhttpRequest({method: "GET", url: "http://translate.google.com/translate_a/t?client=t&text=" + window.getSelection() + "&sl=auto&tl=" + prefs['GoogleLanguage']}, handleTranslateResponse);
	} else {
		window.open('http://translate.google.com/?sl=auto&tl=' + prefs['GoogleLanguage'] + '&text=' + window.getSelection());
	}
}


//
// Detect Facebook Sinar
//
if (id!=0) {
	setTimeout(function() {
		if ($('#FBPPdiv') && (true || parseInt(getValue("LastConflictCheck", "0")) + 86400000 <= (new Date().getTime()))) {
			setValue('LastConflictCheck', new Date().getTime() + "");
			showDialog('<div class="fbfImportant">Sinar Script</div><br />' + $l('FacebookSinarConflict', 'href="http://www.code-poet.net/userscripts/Sinar Script/upgrading-from-facebook-Sinar.html" target="_blank"'), '', 'small');
		}
	}, 2000);
}


//
// Debug Info
//
function showDebugInfo() {
	try {
		showDialog(
			'Sinar Script Debug Info:<br /><br />'+
			'<table id="ff-debug">'+
			row(['version: ',version])+
			row(['release date: ',release_date])+
			row(['release timestamp: ',version_timestamp])+
			row(['id: ',id])+
			row(['page: ',page])+
			row(['homepage: ',(isHomePage()?'yes':'no')])+
			row(['language: ',language])+
			row(['detected language: ',detectedLanguage])+
			row(['storage: ',storage])+
			row(['date: ',new Date()])+
			row(['user agent: ',navigator.userAgent])+
			'</table>'
		);
	} catch(x) { logError('Debug Info', x); }
}


//
// Keyboard shortcuts
//
if (prefs['Shortcuts']) {
	window.addEventListener('keydown', function(e) {
		//log(String.fromCharCode(e.keyCode) + ' - ' + e.keyCode + ' - ' + e.shiftKey + ' - ' + e.ctrlKey + ' - ' + e.altKey + ' - ' + e.metaKey); // DEBUG ONLY
		if ((e.target.type && e.target.type!='checkbox' && e.target.type!='select') || (e.target.getAttribute('contenteditable')=='true') || e.ctrlKey || e.altKey || e.metaKey) { return; }
		function clickLink(filter, root) {
			var link;
			if (!root) { root = document; }
			if (filter.charAt(0) == ':') { return clickX("//a[contains(@href,'" + filter.replace(/^./,'') + "')]"); }
			return clickX("//a[contains(string(),'"+filter+"')]");
		}
		function gotoPage(url, preventClick) {
			url = url.replace(/^https?:\/\/www\.facebook\.com/, '');
			if (unsafeWindow && unsafeWindow.Quickling) {
				if (location.href.toLowerCase().match(/^https?:\/\/www\.facebook\.com\//)) { location.hash = '!'+url; }
				else if (preventClick || !clickLink(':' + url)) { location.href = location.protocol + '//www.facebook.com' + url; }
			} else { location.href = location.protocol + '//www.facebook.com' + url; }
		}
		function gotoPageX(path) {
			var xElm = $(path,null,true);
			if (xElm) { gotoPage(xElm.href, true); }
			//else { log('"' + path + '" could not be resolved'); } // debug
		}
		if (e.keyCode==27) {
			if (document.getElementById('fbfPopupContainer')) { document.getElementById('fbfPopupContainer').style.display = 'none'; }
			if (document.getElementById('fbfShadow')) { document.getElementById('fbfShadow').style.display = 'none'; }
			if (prefs['PhotoPopup'] || prefs['ProfilePicPopup']) { document.getElementById('ff-popup-pic-div').style.display='none'; }
		}
		else if (e.keyCode==16 || e.keyCode==17 || e.keyCode==18) {}
		else if (e.keyCode==191) { if (e.shiftKey) { showDebugInfo(); } } // ?
		else if (e.shiftKey) {
			switch(e.keyCode) {
				case 37: clickLink('First'); break; // Left Arrow
				case 39: clickLink('Last'); break; // Right Arrow
				case 65: gotoPage('/?sk=media'); break; // A
				case 66: click($("//*[@id='fbDockChatBuddylistNub']/a",null,true)); break; // B
				case 67: if (isHomePage() || !(page=='' || page.match(/^index.php/) || page.match(/^login.php/) || page.match(/^logout.php/))) { showConfig(); } break; // C
				case 68: gotoPage('/?sk=bd'); break; // D
				case 69: gotoPage('/?sk=events'); break; // E
				case 70: gotoPage('/friends/?filter=afp'); break; // F
				case 72: gotoPage('/home.php'); break; // H
				case 73: gotoPage('/?sk=messages'); break; // I
				case 75: click($('#ff-add-bookmark')); break; // K
				case 76: click($('#navAccountLink')); $('//form[@id="logout_form"]//input[@type="submit"]', null, true).focus(); break; // L
				case 78: gotoPage('/notifications.php'); break; // N
				case 80: window.location.href = 'http://www.facebook.com/' + (id.match(/^\d+$/) ? 'profile.php?id='+id+'&ref=profile' : id); break // P
				case 82: gotoPage('/reqs.php'); break; // R
				case 83: e.stopPropagation(); e.preventDefault(); document.getElementById('q').focus(); break; // S
				case 84: if (window.getSelection()!='') { googleTranslate(window.getSelection()); } break; // T
				case 86: gotoPage('/?sk=video'); break; // V
			}
		}
		else {
			if (page.indexOf('photo.php')==0) {
				switch(e.keyCode) {
					case 82: rotate($('#myphoto')); break; // r
				}
			} else if (page.indexOf('/photos/')!=-1) {
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
					case 66: clickLink($l('ShowBigPictures')); break; // b
					case 67: if (!clickLink('View Comments')) { if (!clickLink('Photo Comments')) { clickLink('Comments on Photos'); } } break; // c
					case 73: gotoPageX('//a[contains(@href,"v=info")][not(contains(@href,"edit"))]'); break; // i
					case 80: gotoPageX("//a[contains(@href,'v=photos')]"); break; // p
					case 87: gotoPageX("//a[contains(@href,'v=wall')]");  break; // w
					case 88: gotoPageX("//a[contains(@href,'v=box')]");  break; // x
				}
			}
			if (page.match(/^profile\.php\?.*photos/) && e.keyCode==77) { clickLink('and Me ('); }
			switch(e.keyCode) {
				case 37: if (clickLink('Prev')==-1) { clickLink('prev'); }  break; // Left Arrow
				case 39: if (clickLink('Next')==-1) { clickLink('next'); } break; // Right Arrow
				case 75: gotoPageX('//a[contains(@href,"album.php")][not(contains(@href,"page="))]'); break; // k
				case 65: click(document.getElementById('FBFLoadAllPhotos')); break; // a
			}
		}
	}, false);
}


//
// Allow script configuration
//
registerMenuCommand($l('ConfigureFacebookSinar'), showConfig);
if (menu = $('//li[@id="navAccount"]/ul',null,true)) {
	var configLink = document.createElement('li');
	configLink.innerHTML = '<a id="fbfConfigMenuLink" href="#" onclick="return false;">' + $l('ConfigureFacebookSinar') + '</a>';
	menu.insertBefore(configLink, menu.childNodes[2]);
	on('click', '#fbfConfigMenuLink', showConfig);
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
	function makeCheckBoxes(ids, prefix) {
		if (!prefix) { prefix = ''; }
		ids = ids.split(',');
		for (var i=0, buf=''; i<ids.length; i++) { buf = buf + prefix + '<input type="checkbox" id="fbfConf' + ids[i] + '" /><label for="fbfConf' + ids[i] + '">' + $l('Conf'+ids[i]) + '</label><br />'; }
		return buf;
	}
	function makeNumberInputs(ids) {
		ids = ids.split(',');
		for (var i=0, buf = ''; i<ids.length; i++) { buf = buf + $l('Conf'+ids[i]) + '<br /><input type="text" id="fbfConf' + ids[i] + '" value="' + prefs[ids[i]] + '" /><br />'; }
		return buf;
	}
	showPopup('<div id="FBFConfig" class="fbfPopup">'+
		'<div style="text-align:center;"><span class="fbfImportant">' + $l('ConfigureFacebookSinar') + '</span><br /><span class="fbfNote">(Sinar Script ' + version + ' - ' + release_date + ' - ' + id + ')</span></div><br />'+
		$l('ConfigureInstructions') + '<br />'+
		'<br />'+
		'<table id="fbfConfigContainer">'+
			'<tr><td id="fbfConfigTabs">'+
					'<div id="fbfConfigTab-0" class="fbfConfigSelectedTab">' + $l('ConfSectionHomePage') + '</div>'+
					'<div id="fbfConfigTab-1">' + $l('ConfSectionFeeds') + '</div>'+
					'<div id="fbfConfigTab-2">' + $l('ConfSectionPictures') + '</div>'+
					'<div id="fbfConfigTab-3">' + $l('ConfSectionEvents') + '</div>'+
					'<div id="fbfConfigTab-4">' + $l('ConfSectionMenu') + '</div>'+
					'<div id="fbfConfigTab-5">' + $l('ConfSectionPageTitle') + '</div>'+
					'<div id="fbfConfigTab-6">' + $l('ConfSectionShortcuts') + '</div>'+
					'<div id="fbfConfigTab-7">' + $l('ConfSectionOther') + '</div>'+
					'<div id="fbfConfigTab-8">' + $l('ConfSectionImportExport') + '</div>'+
					'<div id="fbfConfigTab-9">' + $l('ConfSectionAdvanced') + '</div>'+
					'<div id="fbfConfigTab-10">' + $l('ConfSectionAbout') + '</div>'+
			'</td><td id="fbfConfigControls">'+
				'<div id="fbfConfigControl-0" class="fbfConfigSelectedControl">'+
					makeCheckBoxes('HomeStretch,HomeStretchMiddleColumn,HomeLeftAlign,HomeLeftColumnFixed,HomeLeftColumn')+
					makeCheckBoxes('HomeProfile,HomeNavigation,HomeChat', ' &nbsp; &nbsp; ') +
					makeCheckBoxes('HomeChatNames', ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;') +
					makeCheckBoxes('HomeRightColumn') +
					makeCheckBoxes('HomeEvents,HomeRecommendations,HomeRequests,HomePokes,HomeFindFriends,HomeBeta', ' &nbsp; &nbsp; ') +
				'</div>'+
				'<div id="fbfConfigControl-1">'+
					makeCheckBoxes('HideApplicationStories,HideEventStories,HideFriendStories,HideGroupStories,HideLikeStories,HideLinkStories,HideNoteStories,HidePhotoStories,HidePlaceStories,HideProfilePicStories,HideRelationshipStories,HideStatusStories,HideVideoStories,HideWallStories') +
					'<br />' + $l('ConfApplicationWhitelist') + '<br /><textarea id="fbfConfApplicationWhitelist" style="width:400px; height:150px;"></textarea>' +
				'</div>'+
				'<div id="fbfConfigControl-2">'+
					makeCheckBoxes('ProfilePicPopup,PhotoPopup,ExternalPopup,DelayPopupPics,PopupAutoClose,PopupSmartAutoClose,PopupWhileTagging,BigAlbumPictures')+
					makeCheckBoxes('BigAlbumPicturesBorder', '&nbsp; &nbsp; ')+
					makeCheckBoxes('AutoBigAlbumPictures,AutoLoadFullAlbum,AutoLoadTaggedPhotos,DisableTheater') +
					'<span class="fbfLabel">' + $l('ConfPopupPosition') + ': </span><input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPosition-auto" value="auto" /><label for="fbfConfPopupPosition-auto">' + $l('Automatic') + '</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPosition-left" value="left" /><label for="fbfConfPopupPosition-left">' + $l('Left') + '</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPosition-right" value="right" /><label for="fbfConfPopupPosition-right">' + $l('Right') + '</label><br />'+
				'</div>'+
				'<div id="fbfConfigControl-3">'+
					makeCheckBoxes('Age,Sign,iCalendar,GoogleCalendar,CalendarFullName,CalendarBirthDate,GoogleApps') +
					$l('ConfGoogleAppsDomain') + ': <input id="fbfConfGoogleAppsDomain"></input><br />'+
				'</div>'+
				'<div id="fbfConfigControl-4">'+
					makeCheckBoxes('ChatHideIdle,ChatDifferentiate,Bookmarks,LogoutLink,HomeLink,ProfileLink,TopBarFixed') +
					'<table style="margin-left:-3px;">' +
					makeOpacitySelector('TopBarOpacity', 'TopBarHoverOpacity') +
					makeOpacitySelector('BottomBarOpacity', 'BottomBarHoverOpacity') +
					'</table>' +
				'</div>'+
				'<div id="fbfConfigControl-5">'+
					makeCheckBoxes('PageTitle,HideFacebookCountInTitle,FriendRequestCountInTitle,InboxCountInTitle,NotificationCountInTitle') +
				'</div>'+
				'<div id="fbfConfigControl-6">'+
					makeCheckBoxes('Shortcuts') + '<br />' + $l('ConfShortcutList')+
				'</div>'+
				'<div id="fbfConfigControl-7">'+
					makeCheckBoxes('DownloadVideo,ProtocolLinks,ErrorPageReload,NewTabSearch,SecureLinks,AutoReadMore,HideHovercards,FacebookTimestamps,FBFTimestamps,FBFTimestamps24,Updates') +
					'<table style="margin-left:-3px;">' +
					'<tr><td><span class="fbfLabel">' + $l('ConfFacebookSinarLanguage') + ':</span></td><td><select id="fbfConfFacebookSinarLanguage" style="padding:0; margin-top:3px;"><option value="auto">' + $l('Automatic') + '</option><option value="cs">Ceština (Czech)</option><option value="sr_rs">?????? (Serbian - Cyrillic)</option><option value="da">Dansk (Danish)</option><option value="el">???????? (Greek)</option><option value="en">English</option><option value="es">Español (Spanish)</option><option value="fr">Français (French)</option><option value="de">Deutsch (German)</option><option value="it">Italiano (Italian)</option><option value="id">Bahasa Indonesia (Indonesian)</option><option value="mk">?????????? ????? (Macedonian)</option><option value="nl">Nederlands (Dutch)</option><option value="nb">Norsk (Norwegian)</option><option value="sk">Slovencina (Slovak)</option><option value="sr">Srpski (Serbian - Latin)</option><option value="vi">Ti?ng Vi?t (Vietnamese)</option><option value="tr">Türkçe (Turkish)</option><option value="bg">????????? (Bulgarian)</option><option value="zh_tw">??(??) (Chinese - Taiwan)</option><option value="ko">??? (Korean)</option><option value="ja">??? (Japanese)</option></select></td></tr>'+
					'<tr><td><span class="fbfLabel">' + $l('ConfGoogleLanguage') + ':</span></td><td><select id="fbfConfGoogleLanguage" style="padding:0; margin-top:3px;"><option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">Chinese (Simplified)</option><option value="zh-TW">Chinese (Traditional)</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="ht">Hatian Creole</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="ko">Korean</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mk">Macedonian</option><option value="ms">Malay</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="es">Spanish</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="yi">Yiddish</option></select></td></tr>'+
					'</table>' +
				'</div>'+
				'<div id="fbfConfigControl-8">'+
					(typeof JSON == 'undefined' ? $l('BrowserUnsupported') : $l('ConfExport') + '<br />' + $l('ConfImport') + '<br /><br /><textarea id="fbfPrefsJSON" style="width:425px; height:200px;" onmouseover="this.focus();this.select()">' + JSON.stringify(prefs, null, "\n") + '</textarea><br /><input type="button" id="fbfImport" value="' + $l('Import') + '" />')+
				'</div>'+
				'<div id="fbfConfigControl-9">'+
					makeNumberInputs('ProcessInterval,DelayPopupPicsTimeout')+
					makeCheckBoxes('HideEgos')+
					'<br /><input type="button" id="fbfAnalyzeLocalization" value="Analyze Localization" />'+
					'<br /><br />Custom Feed Modification (<a href="http://www.code-poet.net/userscripts/Sinar Script/Sinar Script-guide.html#custom-feed-modification" target="_blank">instructions</a>):<br /><textarea id="fbfConfCustomFeedModification" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom Feed Modification" id="SaveCustomFeedModification" />'+
					'<br /><br />Custom CSS (<a href="http://www.code-poet.net/userscripts/Sinar Script/Sinar Script-guide.html#custom-css" target="_blank">instructions</a>):<br /><textarea id="fbfConfCustomCSS" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom CSS" id="SaveCustomCSS" />'+
				'</div>'+
				'<div id="fbfConfigControl-10">'+
					'<span xmlns:dc="http://purl.org/dc/elements/1.1/" property="dc:title"><a href="http://www.code-poet.net/userscripts/facebook-Sinar/index.html" target="_blank">Sinar Script</a></span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Vaughan Chandler</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike 3.0 Unported License</a>.<br /><br />Facebook is a registered trademark of Facebook, Inc.<br />Sinar Script is not related to or endorsed by Facebook, Inc. in any way.<br /><br /><a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0;" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><br /><b>' + $l('Translators') + ':</b><ul><li>Acedia.Liu - Chinese (Taiwan)</li><li>Caken - Czech</li><li>Connum - German</li><li>dnbace - Bulgarian</li><li>DoSMaN - Greek</li><li>Eilif Nordseth - Norwegian</li><li>Glen Farmer - Spanish</li><li>Goce Manevski - Macedonian</li><li>Gökhan Gurbetoglu - Turkish</li><li>Gorgeous - Italian</li><li>Gorštak - Serbian (Cyrillic and Latin)</li><li>HeartRipper - Italian</li><li>Larissa van Sunder - Dutch</li><li>Mads Jensen - Danish</li><li>Masami HIRATA - Japanese</li><li>Neo - Spanish</li><li>Peter Miksik - Slovak</li><li><li>Serge Thiry - French</li><li>Sindhu Pripamungkas - Indonesian</li><li>Tr?n Ð?c Th?nh - Vietnamese</li><li>??? - Korean</li></ul>'+
				'</div>'+
			'</td></tr>'+
		'</table>'+
		'<br /><hr /><div style="float:left; padding-top:8px;"><a href="http://www.code-poet.net/userscripts/facebook-Sinar/index.html">' + $l('UpdateHomepage') + '</a></div><div style="text-align:right;"><input type="button" value="' + $l('Refresh') + '" onclick="location.reload();" /> <input type="button" id="fbfCloseConfig" value="' + $l('Close') + '" /></div>'+
		'</div>', true
	);
	// Add the listener for the close button - if nothing else we should be able to close the popup
	onClick('fbfCloseConfig', function() { hidePopup(); });

	try {

		// Update fields to match current settings and listen for changes in checkboxes
		for (var i=0; i<booleanOptions.length; i++) {
			if (prefs[booleanOptions[i]]) { $('#fbfConf'+booleanOptions[i]).checked='checked'; }
			on('click', '#fbfConf'+booleanOptions[i], function(e) {
				setValue(e.target.id.replace('fbfConf',''), e.target.checked);
				prefs[e.target.id.replace('fbfConf','')] = e.target.checked;
			});
		}
		$('#fbfConfPopupPosition-' + prefs['PopupPosition']).checked='checked';
		var positions = new Array('auto','left','right');
		var opacities = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity');
		for (var i=0; i<opacities.length; i++) { $('#fbfConf'+opacities[i]).value = prefs[opacities[i]]; }
		$('#fbfConfGoogleAppsDomain').value = prefs['GoogleAppsDomain'];
		$('#fbfConfGoogleLanguage').value = prefs['GoogleLanguage'];
		$('#fbfConfFacebookSinarLanguage').value = prefs['FacebookSinarLanguage'];
		$('#fbfConfApplicationWhitelist').value = JSON.parse(prefs['ApplicationWhitelist']).sort().join(' ');
		$('#fbfConfCustomFeedModification').value = prefs['CustomFeedModification'];
		$('#fbfConfCustomCSS').value = prefs['CustomCSS'];

		// Listen for changes
		
		on('click', '#fbfConfigTabs', function(e) {
			var current = e.target;
			if (current.tagName=='DIV' && current.className != 'fbfConfigSelectedTab') {
				var previous = $('.fbfConfigSelectedTab')[0];
				previous.className='';
				$('#fbfConfigControl-' + previous.id.match(/-(\d+)/)[1]).className = '';
				current.className = 'fbfConfigSelectedTab';
				$('#fbfConfigControl-' + current.id.match(/-(\d+)/)[1]).className = 'fbfConfigSelectedControl';
			}
		});
		
		for (var i=0; i<positions.length; i++) {
			on('click', '#fbfConfPopupPosition-'+positions[i], function(e) {
				setValue('PopupPosition', e.target.id.replace('fbfConfPopupPosition-',''));
				e.target.blur();
			});
		}
		
		on('keyup', '#fbfConfGoogleAppsDomain', function(e) {
				setValue('GoogleAppsDomain', e.target.value);
				prefs['GoogleAppsDomain'] = e.target.value;
		});
		
		on(Array('blur','keyup'), '#fbfConfApplicationWhitelist', function(e) {
				e.target.value = e.target.value.replace(/^\s+/g, '').replace(/\s*[^\d\s]/g, ' ').replace(/(\s)\s+(\S)/, '$1$2');
				var awl = JSON.stringify(e.target.value.replace(/^\s+|\s+$/g, '').split(/\s+/).sort());
				if (awl == '[""]') { awl = '[]'; }
				setValue('ApplicationWhitelist', awl);
				prefs['ApplicationWhitelist'] = awl;
		});
		
		on('click', '#fbfUpdateLink', function() { FBFUpdateCheck(true); });
		
		on('click', '#fbfImport', function() {
			if (window.confirm($l('ImportConfirm'))) {
				try {
					var importing = JSON.parse($('#fbfPrefsJSON').value);
					for (var key in importing) {
						log(key + ' => ' + importing[key]);
						setValue(key, importing[key]);
					}
					if (window.confirm($l('ImportSuccess'))) { location.reload(); }
				} catch(x) {
					logError('Import/Export', x);
					window.alert($l('ImportFailure'));
				}
			}
		});
		
		on('click', '#SaveCustomFeedModification', function() { setValue('CustomFeedModification', $('#fbfConfCustomFeedModification').value); });
		
		on('click', '#SaveCustomCSS', function() { setValue('CustomCSS', $('#fbfConfCustomCSS').value); });
		
		on('click', '#fbfAnalyzeLocalization', function() {
			var analysis = [];
			for (var key in lang.en) {
				var missing = !lang[language][key];
				var string = missing ? $l(key) : lang[language][key];
				if (typeof string == 'string') { string = "'" + string.toString().replace("'", "\\'").replace(/\n/g, "\\n") + "'"; }
				else {
					var buffer = [];
					for (var i=0; i<string.length; i++) { buffer.push("'" + string[i].replace("'", "\\'").replace(/\n/g, "\\n") + "'"); }
					string = "new Array(" + buffer.join(",") + ")";
				}
				analysis.push((missing ? '/**/' : '') + "		'" + key + "' : " + string);
			}
			showDialog(
				'<div style="margin-bottom:9px;">Below are the strings for the ' + $l('_language') + ' localization.' + (language=='en' ? ' You can use them for starting a new localization.' : '<br />Obsolete strings have been removed, and strings requiring translation have /**/ at the start of the line.') + '</div>'+
				'<textarea style="height:600px; width:694px; padding:2px;" onmouseover="this.focus(); this.select();" wrap="off" readonly="yes">' + analysis.join(',\n') + '</textarea>'
			);
		});
		
		var selects = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity','FacebookSinarLanguage','GoogleLanguage');
		for (var i=0; i<selects.length; i++) {
			on('change', '#fbfConf'+selects[i], function(e) {
				setValue(e.target.id.replace(/^fbfConf/,''),e.target.options[e.target.selectedIndex].value);
				e.target.blur();
			});
		}

		var numberInputs = new Array('ProcessInterval','DelayPopupPicsTimeout');
		for (var i=0; i<numberInputs.length; i++) {
			on('keyup', '#fbfConf'+numberInputs[i], function(e) {
				try {
					var val = parseInt(e.target.value);
					setValue(e.target.id.replace(/^fbfConf/,''), val);
				} catch(x){}
			});
		}

	} catch(x) { logError('Config Popup', x); }

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
	else if (updateForced) { alert("No update is available for Sinar Script."); }
}
if (prefs['Updates']) { FBFUpdateCheck(false); }
function showUpdatePopup() {
	showDialog(
		$l('UpdateAvailable1') + '<br /><br /><div class="fbfNote">' + $l('UpdateAvailable2') + '</div>',
		'<input type="button" value="' + $l('UpdateInstall') + '" id="fbfUpdateInstall" /> '+
		'<input type="button" value="' + $l('UpdateHomepage') + '" id="fbfUpdateHomepage" /> '+
		'<input type="button" value="' + $l('UpdateTomorrow') + '" id="fbfUpdateTomorrow" /></div>',
		'small,noclose'
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
		if (m = $('.summary')[0].textContent.split('|')[0].match(/(\d+)/g)) {
			m = m.sort(function(a,b){return a-b});
			totalImagePages = Math.ceil(m[2]/20);
			if (n=page.match(/page=(\d)/)) { thisPageNumber=n[1]; } else { thisPageNumber=1; }
			albumPagesLoaded = 0;
			totalAlbumPages = totalImagePages-1;
			$('#fbf_photo_pagination').innerHTML = '<span class="caption">' + $l('loadingFullAlbum') + '<span></span></span>';
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
		if (m = $('.caption')[0].textContent.split('|')[0].replace(',','').match(/(\d+)/g)) {
			$('#fbf_photo_pagination').innerHTML = '<span class="caption">' + $l('LoadingAllPhotos') + '<span></span></span>';
			totalImagePages = Math.ceil(m[m.length-1]/15);
			albumPagesLoaded = 0;
			totalAlbumPages = totalImagePages-1;
			var thisPhoto = 0;
			if (m = page.match(/so=(\d+)/)) { thisPhoto = m[1]; }
			for (var i=0; i<totalImagePages; i++) {
				if (i*15!=thisPhoto) {
					appendPhotos('http://www.facebook.com/' + page.replace(/&so=\d+/,'') + '&so=' + (i*15), '<span class="caption">' + $l('AllPhotosLoaded') + '</span>');
				}
			}
		}
	} catch(x) { logError('Load Tagged Photos', x); }
}


//
// Add thumbnails from the specified URL
// (Abilities to show pictures in correct order, with the album page number and link displayed are based heavily on code by MysticMetal)
//
var photoTableRegex = /UIPhotoGrid_Table[^>]+>(.*?)<\\\/table/;
function appendPhotos(url, completeMessage) {
	var pageNum = (m=url.match(/\bso=(\d+)/)) ? m[1]/15+1 : url.match(/\bpage=(\d+)/)[1];
	var albumURL = (url.replace(/&quickling/, '') + '').replace(/&/g,'&amp;');
	var albumPageIdentifier = pageNum + '-' + (new Date().getTime());
	var tbody = $('.UIPhotoGrid_Table')[0]
	tbody.innerHTML = tbody.innerHTML + '<tbody><tr class="ff-album-page"><td colspan="5"><a href="' + albumURL + '"> Album page ' + pageNum + '</a></td></tr></tbody>'+
										'<tbody id="ff-album-page-' + albumPageIdentifier + '"></tbody>';
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.send(null);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				albumPagesLoaded++;
				$('#ff-album-page-'+albumPageIdentifier).innerHTML = photoTableRegex.exec(req.responseText)[1].replace(/\\/g,'');
				if (albumPagesLoaded>=totalAlbumPages) { $('#fbf_photo_pagination').innerHTML = completeMessage; }
				if (prefs['AutoBigAlbumPictures']) { clickX("//a[contains(string(),'"+$l('ShowBigPictures')+"')]"); }
			}
		}
	}
}


//
// Add Bookmarks sub-menu
//
if (prefs['Bookmarks'] && !$('#fbf-bookmarks')) {
	try {

		var bmArray = [];
		var bmString = '';

		function getURL() {
			var url = location.href;
			if (m = location.href.match(/^(.*?facebook\.com\/).*#!?\/?(.*)$/)) { url = m[1]+m[2]; }
			return url.replace(/\?$/, '');
		}

		function getBookmark(url) {
			for (var i=0; i<bmArray.length; i++) {
				// The second condition below is only needed until the script's name or namepsace gets changed
				// It handles a modification to getURL()
				if (bmArray[i].indexOf('|'+url+'|')!=-1 || bmArray[i].indexOf('|'+url+'?|')!=-1) { return i; }
			}
			return false;
		}

		function setBookmarkHTML() {
			var bmHTML = '';
			for (var i=0; i<bmArray.length; i++) {
				buffer = bmArray[i].split('|');
				bmHTML = bmHTML + '<li><a href="' + buffer[1] + '">' + buffer[0] + '</a></li>';
			}
			$('#fbf-bookmark-list').innerHTML = bmHTML+
				'<li><div style="padding:2px 0 0; margin:2px 5px 0; border-top:1px solid #E0E0E0;"></div></li>'+
				'<li><a id="ff-add-bookmark">' + $l('BookmarkAdd') + '</a></li>'+
				'<li><a id="ff-manage-bookmark">' + $l('BookmarksManage') + '</a></li>';
			addBookmarkListeners();
		}

		function reloadBookmarkList() {
			var bmString = getValue('BookmarkList', '');
			if (bmString.match(/^\[.*\]$/)) { bmArray = JSON.parse(bmString).sort(); }
		}

		function updateBookmarkList() {
			bmString = JSON.stringify(bmArray);
			setValue('BookmarkList', bmString);
			prefs['BookmarkList'] = bmString;
			setBookmarkHTML();
		}

		function addBookmarkListeners() {

			on('click', '#ff-add-bookmark', function() {
				var url = getURL();
				if (getBookmark(url)!==false) { window.alert($l('BookmarkExists')); }
				else {
					name = document.title.replace(/^.*[\|\)] /i, '').replace(/ on facebook$/i, '');
					if (name = window.prompt($l('BookmarkNamePrompt', url), name)) {
						bmArray.push(name + '|' + url + '|');
						updateBookmarkList();
					}
				}
			});

			on('click', '#ff-manage-bookmark', function() {
				var removalList = [];
				for (var i=0, url = getURL(); i<bmArray.length; i++) {
					var bookmark = bmArray[i].split('|');
					removalList.push('<label><input type="checkbox" value="' + bmArray[i] + '" ' + (bookmark[1]==url ? 'checked="checked"' : '') + ' />' + bookmark[0] + '</label> - ' + bookmark[1]);
				}
				showDialog(
					'<div style="max-height:500px; overflow:auto; background:white; border:1px solid #ccc; padding:5px 0;">'+
					'<form id="ff-bookmark-removal-list" style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">' + removalList.join('<br />') + '</form>'+
					'</div>',
					'<input type="button" id="ff-remove-bookmark-button" value="' + $l('BookmarksRemoveSelected') + '" /> '
				);
				on('click', '#ff-remove-bookmark-button', function() {
					var urls = Array();
					var names = Array();
					var inputs = $('input', '#ff-bookmark-removal-list');
					for (var i=0; i<inputs.length; i++) {
						if (inputs[i].checked) {
							urls.push(inputs[i].value.split('|')[1]);
							names.push(inputs[i].value.split('|')[0]);
						}
					}
					if (window.confirm($l('BookmarksConfirmRemoval') + '\n' + names.join('\n'))) {
						for (var i=0; i<urls.length; i++) {
							if ((bookmark = getBookmark(urls[i]))!==false) { bmArray.splice(bookmark,1); }
						}
						updateBookmarkList();
						hidePopup();
					}
				});
			});

		}

		var pageNav = $('#pageNav');
		if (pageNav) {

			addStyle(
				'body #fbf-bookmarks { position:relative; display:list-item; z-index:20; }'+
				'body #fbf-bookmarks:hover ul, #fbf-bookmarks:hover li { display:block; }'+
				'body #fbf-bookmarks ul a, #fbf-bookmarks ul a:focus { background:white; }'+
				'body #fbf-bookmarks li { display:block; float:none; }'+
				'body #fbf-bookmark-list { overflow:auto; }'+
				// The following line is based on: #navAccountLink img
				'#fbf-bookmarks img { background:url(/rsrc.php/z8S5R/hash/ez3x5cuc.png) no-repeat -137px 0; height:4px; left:5px; position:relative; top:-2px; width:7px; }'+
				// The following line is based on: #navAccount ul
				'#fbf-bookmarks ul { background:#fff;border:1px solid #333;border-bottom:2px solid #2d4486;display:none;margin-right:-1px;margin-top:-1px;min-width:200px;padding:10px 0 5px;position:absolute;right:0;_right:-1px;top:100%;*width:100%;_width:200px;z-index:1 }'+
				// The following line is based on: #navAccount ul a
				'#fbf-bookmarks ul a {color:#3a579a;display:block;font-weight:normal;height:auto;_margin-right:-25px;padding:4px 10px 5px;white-space:nowrap;*white-space:auto;_white-space:nowrap}'+
				// The following line is based on: #navAccount ul a:hover, #navAccount ul a:focus, #navAccount ul a:active
				'#fbf-bookmarks ul a:hover {background:#6d84b4;border-bottom:1px solid #3b5998;border-top:1px solid #3b5998;color:#fff;padding:3px 10px 4px}'+
				// The following line is based on: .openToggler #navAccountLink
				'#fbf-bookmarks:hover fbf-bookmark-link {background-color:#fff;color:#333;height:22px;position:relative;z-index:3}'
			);

			var bookmarks = document.createElement('li');
			bookmarks.id = 'fbf-bookmarks';
			bookmarks.innerHTML =	'<a href="#" onclick="return false;" id="fbf-bookmark-link" style="padding-right:16px;">' + $l('Bookmarks') + '<img src="' + (location.protocol=='https:' ? 'https://s-' : 'http://') + 'static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" class="img" style="background:url(\'/rsrc.php/z8S5R/hash/ez3x5cuc.png\') no-repeat scroll -137px 0 transparent; height:4px; left:5px; position:relative; top:-2px; width:7px;"></a>'+
									'<ul id="fbf-bookmark-list"></ul>';

			pageNav.insertBefore(bookmarks, pageNav.firstChild);

			on('mouseover', '#fbf-bookmark-link', function() {
				reloadBookmarkList();
				setBookmarkHTML();
				$('#fbf-bookmark-list').style.maxHeight = (window.innerHeight - 65) + 'px';
			});

		}


	} catch(x) { logError('Bookmarks', x); }
}

//
// Add easily accessbile Logout link
//
if (prefs['LogoutLink'] && !$('#ff-logout')) {
	try {
		newLogout = document.createElement('li');
		newLogout.innerHTML = '<a>' + $('//form[@id="logout_form"]//input[@type="submit"]', null, true).value + '</a>';
		onClick(newLogout, function() { $('#logout_form').submit(); });
		$('#pageNav').appendChild(newLogout);
	} catch(x) { logError('Logout Link', x); }
}

//
// Remove the Home link
//
if (!prefs['HomeLink']) {
	try {
		var l = $('.//a[contains(@href,"?ref=home")]', $('#pageNav'), true);
		l.parentNode.removeChild(l);
	} catch(x) { logError('Home Link', x); }
}

//
// Remove the Profile link
//
if (!prefs['ProfileLink']) {
	try {
		var l = $("//ul[@id='pageNav']//a[@accesskey='2']", null, true);
		l.parentNode.removeChild(l);
	} catch(x) { logError('Profile Link', x); }
}

//
// Top Bar Positioning
//
if (prefs['TopBarFixed']) {
	try {
		var div = document.createElement('div');
		div.id = 'fbf-page-head-container';
		$('#pageHead').parentNode.insertBefore(div, $('#pageHead').parentNode.firstChild);
		$('#fbf-page-head-container').insertBefore($('#pageHead'), $('#fbf-page-head-container').firstChild);
		addStyle(
			'#blueBar { position:fixed; z-index:15; }'+
			'#fbf-page-head-container { width:' + $('#pageHead').clientWidth + 'px; margin:0 auto; }'+
			'#pageHead { position:fixed; z-index:16; }'+
			'#headNav { width:' + $('#headNav').clientWidth + 'px; }'+
			'#content { padding-top:' + $('#blueBar').clientHeight + 'px; }'
		);
	} catch(x) { logError('Top Bar Fixed', x); }
}

//
// Top Bar Transparency
//
if ((prefs['TopBarFixed'] || prefs['TopBarOpacity'] < 0) && (prefs['TopBarOpacity']!='1.0' || prefs['TopBarHoverOpacity']!='1.0')) {
	if (prefs['TopBarOpacity'] < 0) { addStyle('#pageHead, #blueBar { display:none; } #content > div { padding-top:10px; }'); }
	else { addStyle('#pageHead, #blueBar { opacity:' + prefs['TopBarOpacity'] + '; } #pageHead #blueBar { opacity:1; } #pageHead:hover, #blueBar:hover { opacity:' + prefs['TopBarHoverOpacity'] + '; } #jewelCase .jewel { border-style:none; }'); }
}

//
// Bottom Bar Transparency
//
if (prefs['BottomBarOpacity']!='1.0' || prefs['BottomBarHoverOpacity']!='1.0') {
	if (prefs['BottomBarOpacity'] < 0) { addStyle(' #pagelet_presence { display:none; }'); }
	else { addStyle(' #pagelet_presence { opacity:' + prefs['BottomBarOpacity'] + '; } #pagelet_presence:hover { opacity:' + prefs['BottomBarHoverOpacity'] + '; }'); }
}

//
// Make CSS changes
//
var style='';
if (prefs['ChatDifferentiate'])			{ style = style + ' .fbChatBuddyList a.friend, #pagelet_friends_online .chatOnline { font-weight:bold; } .fbChatBuddyList a.idle, #pagelet_friends_online .chatIdle { font-weight:normal; font-style:italic; }'; }
if (prefs['ChatHideIdle'])				{ style = style + ' body .fbChatBuddyList a.idle { max-height:0; overflow:hidden; padding-top:0; padding-bottom:0; } #pagelet_friends_online .chatIdle { display:none; }'; }
if (prefs['HideEgos'])					{ style = style + ' .ego_column, .netego_organic, #netego_organic, #pagelet_netego, #pagelet_netego_lower, #pagelet_betabox { display:none; } #pagelet_netego_requests div.ego_column, #pagelet_netego_pokes div.ego_column { display:block; }'; }
if (prefs['HideHovercards'])			{ style = style + ' .HovercardOverlay { display:none; }'; }
if (prefs['AutoReadMore'])				{ style = style + ' .text_exposed_root .text_exposed_hide { display:none; } .text_exposed_root .text_exposed_show { display:inline; }'; }
if (prefs['BigAlbumPicturesBorder'])	{ style = style + ' #FBFBigAlbum a { padding:0 1px 1px 0; } #FBFBigAlbum img { border:1px solid #ccc; background:#fff; min-width:20px; min-height:20px; }'; }
if (prefs['HomeLeftColumnFixed'])		{ style = style + ' .home #leftCol { position:fixed; }'; }
if (prefs['HomeStretchMiddleColumn'])	{ style = style + ' .home li.uiUnifiedStory { padding-right:0; } .home form.commentable_item > ul {width: auto !important;}'; }
if (prefs['HomeStretch'])				{  style = style + ' .home #globalContainer { width:auto; margin:auto 7px; } .home #fbf-page-head-container { width:auto; } .home .hasRightCol { position:relative; } .home #contentCol #contentArea { margin-right:10px; width:auto; } .home #contentCol.hasRightCol #contentArea { margin-right:275px; width:auto; } .home .hasRightCol #rightCol { position:absolute; right:0; } .home .uiStream .hideSelector { margin-right:0; }'; }
else if (prefs['HomeLeftAlign'])		{ style = style + ' .home #globalContainer { margin:0 0 0 5px; ! important; }'; }
if (!prefs['FacebookTimestamps'])		{ style = style + ' abbr.timestamp { display:none; }'; }
if (!prefs['HomeProfile'])				{ style = style + ' #pagelet_welcome_box { display:none; }'; }
if (!prefs['HomeNavigation'])			{ style = style + ' #pagelet_navigation { display:none; }'; }
if (!prefs['HomeChat'])					{ style = style + ' #pagelet_friends_online { display:none; }'; }
if (!prefs['HomePokes'])				{ style = style + ' #pagelet_netego_pokes { display:none; }'; }
if (!prefs['HomeRecommendations'])		{ style = style + ' #pagelet_netego, #pagelet_netego_lower { display:none; }'; }
if (!prefs['HomeFindFriends'])			{ style = style + ' #pagelet_netego_lower { display:none; }'; }
if (!prefs['HomeEvents'])				{ style = style + ' #pagelet_eventbox { display:none; }'; }
if (!prefs['HomeRequests'])				{ style = style + ' #pagelet_netego_requests { display:none; }'; }
if (!prefs['HomeBeta'])					{ style = style + ' #pagelet_betabox { display:none; }'; }
if (!prefs['HomeLeftColumn'])			{ style = style + ' .fbx #mainContainer #leftCol { display:none; } .fbx #mainContainer #contentCol { margin-left:5px; }'; }
if (!prefs['HomeRightColumn'])			{ style = style + ' .fbx #mainContainer #rightCol { display:none; }'; $('#contentCol').className=$('#contentCol').className.replace(/ hasRightCol/,''); }
if (prefs['HomeChatNames']) {
	style = style+' '+
	'.fbx #pagelet_friends_online .uiListHorizontalItem { float:none; }'+
	'.fbx #pagelet_friends_online .uiTooltip .uiTooltipWrap { background:inherit; display:inline; position:relative; visibility:visible; }'+
	'.fbx #pagelet_friends_online .uiTooltipText { background-position:left center; background-color:inherit; color:inherit !important; border-right:none; display:inline-block; line-height:18px; padding:0 0 0 10px; margin-left:3px; width:130px; overflow:hidden; }'+
	'.fbx #pagelet_friends_online .uiProfilePhotoMedium { height:22px; width:22px; }'+
	'.fbx #pagelet_friends_online .chatOverlay { background-image:none !important; }';
}
if (style!='') { addStyle(style); }

try {
	if (prefs['HomeStretch']) { addStyle('.home #headNav { width:' + ($('#contentCol').clientWidth) + 'px; }'); } // must be done after the other "homestretch" css
} catch(x) { logError('Home Stretch CSS', x); }


//
// Listen for image mouseovers/mouseouts to show/hide popups
//
if (prefs['ProfilePicPopup'] || prefs['PhotoPopup']) {
	
	picRegex = /(https?:\/\/((profile\.|s-hprofile-|photos-|s-hphotos-|secure-media-).*?\.fbcdn\.net|fbcdn-(photos|profile)-a.akamaihd.net).*?(\/[aqst]\d[\d_]+|_[aqst])\.jpg)/;
	backgroundRegex = /(https?:\/\/((profile\.|s-hprofile-|photos-|s-hphotos-|secure-media-).*?\.fbcdn\.net|fbcdn-(photos|profile)-a.akamaihd.net).*?(\/[aqst]\d[\d_]+|_[aqnst])\.jpg)/;
	picRegex2 = /(src|url)=([^&]+)/;
	profilePixRegex = /\bfbcdn(.net|-profile-)/;

	function showPopupPic(e) {
		try {
			var t = e.target;
			
			var oldSrc;
			var newSrc;
			var title;

			if (t.tagName == 'IMG' && picRegex.test(t.src)) { oldSrc = t.src + '#1'; }
			else if (t.tagName == 'IMG' && (m=backgroundRegex.exec(t.style.backgroundImage))) { oldSrc = m[1] + '#2'; }
			else if (t.tagName == 'I' && (m=picRegex.exec(t.style.backgroundImage))) { oldSrc = m[1] + '#3'; }
			else if (t.parentNode && t.parentNode.firstChild.tagName == 'IMG' && (m=picRegex.exec(t.parentNode.firstChild.src))) { oldSrc = m[1] + '#4'; }
			else if (t.parentNode && t.parentNode.style && (m=picRegex.exec(t.parentNode.style.backgroundImage))) { oldSrc = m[1] + '#5'; }
			else if (t.src && (t.src.indexOf('app_full_proxy.php')!=-1 || t.src.indexOf('safe_image.php')!=-1) && (m=picRegex2.exec(t.src))) { oldSrc = unescape(m[2]) + '#6'; }
			
			// Facebook's code somtimes triggers the popup incorrectly when tagging (ie, even though the mouse is not actually over the image).
			if (oldSrc && oldSrc.match(/#4$/) && getStyle(t.parentNode.firstChild, 'cursor')=='crosshair') { return; }
			
			// Disable completely when tagging (only on the tagging image itself)
			if (!prefs['PopupWhileTagging'] && t.tagName=='IMG' && getStyle(t, 'cursor')=='crosshair') { return; }
			
			if (oldSrc || newSrc) {

				if (!newSrc) {
					if (m = oldSrc.match(/^["']+(.*)["']+$/)) { oldSrc = m[1]; } // Opera needs this, no idea why...
					newSrc = oldSrc.replace(/\/[aqst]([\d_]+)\.jpg/, "/n$1.jpg").replace(/\/([\d_]+)[aqst]\.jpg/, "/$1n.jpg");
				}

				if (!profilePixRegex.test(newSrc)) { newSrc = newSrc + '-external'; }
				else {
					if (newSrc.indexOf('profile')!=-1) { newSrc = newSrc + '-profile'; }
					else { newSrc = newSrc + '-photo'; }
				}

				if (profilePixRegex.test(newSrc) ? (newSrc.indexOf('profile')!=-1 ? prefs['ProfilePicPopup'] : prefs['PhotoPopup']) : prefs['ExternalPopup']) {

					clearTimeout(hidePopupPicTimeout);
					t.removeEventListener('mouseout', hidePopupPic, false);
					t.addEventListener('mouseout', hidePopupPic, false);
					
					//newSrc = newSrc.replace(/^https:\/\/fbcdn-photos/, 'https://fbcdn-sphotos');
					
					if (m = newSrc.match(/\/n(\d+)_\d+\.jpg/)) { profileLink = 'http://www.facebook.com/profile.php?id=' + m[1]; }
					else if (t.href) { profileLink = t.href; }
					else if (t.parentNode.href) { profileLink = t.parentNode.href; }
					else if (t.parentNode.parentNode.href) { profileLink = t.parentNode.parentNode.href; }

					showPopupPicTimeout = setTimeout(function(){
						$('#ff-popup-pic-image').innerHTML = '<a href="' + profileLink + '"><img src="' + newSrc + '" alt="Sinar Script - ' + $l('LoadingPic') + '" style="max-height:' + (window.innerHeight-35) + 'px;"/></a>';
						$('#ff-popup-pic-div').style.display = 'block';
						$('#ff-popup-pic-div').className = 'fbfPopup ff-popup-pic-div-' + (prefs['PopupPosition'] == 'auto' ? (e.pageX>document.body.clientWidth/2 ? 'left' : 'right') : prefs['PopupPosition']);
					}, prefs['DelayPopupPics'] ? prefs['DelayPopupPicsTimeout'] : 0);

				}

			}

		} catch(x) { logError('Popup Pic', x); }
	}

	$('#ff-popup-pic-div').addEventListener('mouseover', function(e) { clearTimeout(hidePopupPicTimeout); }, false);

	$('#ff-popup-pic-div').addEventListener('mouseout', function(e) {
		var r = e.relatedTarget;
		if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
			while (r.parentNode && r.id!='ff-popup-pic-div') { r = r.parentNode; }
			if (r.id!='ff-popup-pic-div') { document.getElementById('ff-popup-pic-div').style.display = 'none'; }
		}
	}, false);

	window.addEventListener('mouseover', function(e) {
		if (!e.shiftKey && !e.ctrlKey && !e.altKey) { showPopupPic(e); }
	}, false);

	function hidePopupPic(e) {
		if (prefs['DelayPopupPics']) { clearTimeout(showPopupPicTimeout); }
		if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
			hidePopupPicTimeout = setTimeout(function() { document.getElementById('ff-popup-pic-div').style.display = 'none'; }, 30);
		}
	}

}


//
// Modify search form to search results open in a new tab/window
//
if (prefs['NewTabSearch'] && $('#q')) {
	$('#q').addEventListener('keydown', function(e) {
		if (e.keyCode == 13 && e.ctrlKey) { $('#navSearch').target = '_blank'; }
		else { $('#navSearch').target = ''; }
	}, false);
}

//
// Add useful date functions
//
Date.prototype.getNextDay=function(){var nextDay=new Date(); nextDay.setTime(this.getTime()+86400000); return nextDay; }
Date.prototype.before=function(date){if(!date)date=new Date(); return this.getTime()<date.getTime();}
Date.prototype.past=function(date){if(!date)date=new Date(); var thisDate=this; thisDate.setHours(0); thisDate.setMinutes(0); thisDate.setSeconds(0); date.setYear(thisDate.getFullYear()); return thisDate.getTime()<date.getTime();}
Date.prototype.getAge=function(){var now=new Date(); return this.past(new Date())?now.getFullYear()-this.getFullYear():now.getFullYear()-this.getFullYear()-1;}
Date.prototype.toISOString=function(includeTime){return ''+this.getFullYear()+$0(this.getMonth()-0+1)+$0(this.getDate())+(includeTime?'T'+$0(this.getHours())+$0(this.getMinutes())+$0(this.getSeconds()):'');}
Date.prototype.format = function() { var monthNames = $l('Months'); return monthNames[this.getMonth()] + ' ' + this.getDate() + ', ' + this.getFullYear(); }
Date.prototype.getFormattedTime = function(use24Hours) { return (use24Hours ? $0(this.getHours()) : (this.getHours()%12==0 ? '12' : this.getHours()%12)) + ':' + $0(this.getMinutes()) + (use24Hours ? '' : (this.getHours()>11 ? 'pm' : 'am')); }
Date.prototype.getSign=function(){ var signs = $l('Signs'); var endDates=new Array(19,18,20,19,20,21,22,22,22,22,21,21); return signs[this.getDate()>endDates[this.getMonth()]?(this.getMonth()+1)%12:this.getMonth()]; }


//
// Add link for showing full-size album pictures
//
function addBigAlbumPicLinks() {
	
	if (!$('#ff-bap-link')) {
		var a = document.createElement('a');
		a.innerHTML = $l('ShowBigPictures');
		a.id = 'ff-bap-link';
		
		// albums
		if ((container = $('.uiHeaderSubTitle', '#content')) && container[0]) {
			container[0].appendChild(document.createTextNode(' · '));
			container[0].appendChild(a);
		}
		
		// photo tabs on new profiles
		else if ((container = $('.uiHeaderTitle', '#pagelet_photos_of_me')) && container[0]) {
			container[0].appendChild(document.createTextNode(' · '));
			container[0].appendChild(a);
		}
		
		// photo tabs on old profiles
		else if (container = $('//*[@id="photos_of_wrapper"]/preceding-sibling::* //div', null, true)) {
			container.appendChild(document.createTextNode(' · '));
			container.appendChild(a);
		}

		on('click', a, function(e) {
			var tables = $('./following::table[contains(@class,"fbPhotosGrid")]', e.target); // new albums/profiles use this
			if (tables.snapshotLength==0) { tables = $('./following::table[contains(@class,"UIPhotoGrid_Table")]', e.target); } // old albums/profiles use this
			var buf = '';
			for (var t=0; t<tables.snapshotLength; t++) {
				var cells = $('td', tables.snapshotItem(t));
				for (i=0; i<cells.length; i++) {
					var src = (cells[i].getAttribute('data-src',null) || cells[i].innerHTML).match(/(https?:\/\/[^"]+\.jpg)[^&]/);
					if (src) { src=src[1]; }
					else { continue; }
					var link = $('a', cells[i])[0];
					if (link.className.indexOf('uiVideoLink')!=-1) { continue; } // skip video thumbnails
					var title = ($('a', cells[i])[0].getAttribute('title') || '').replace('"', '&quot;');
					buf+=	'<a href="' + link.href + '">'+
							'<img src="' + src.replace(/\/[as]([\d_]+)\.jpg/, '/n$1.jpg').replace(/\/([\d_]+)[as]\.jpg/, '/$1n.jpg') + '" title="' + title + '" />'+
							'</a>';
				}
			}
			hidePopup();
			showPopup('<div id="FBFBigAlbumContainer"><div id="FBFBigAlbum" class="fbfPopup"><div id="FBFBigAlbumClose1" class="FBFBigAlbumClose">' + $l('Close') + '</div>' + buf + '<div id="FBFBigAlbumClose2" class="FBFBigAlbumClose">' + $l('Close') + '</div></div></div>', false);
			on('click', Array('#FBFBigAlbumClose1','#FBFBigAlbumClose2'), hidePopup);
		});
	}
}

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
	page = page.replace(/^!?\//,'');
	//if (page!=lastPage) { log('Page => "' + page + '"'); }// DEBUG ONLY

	if (page != lastPage && prefs['PopupAutoClose'] && $('#ff-popup-pic-div')) {
		$('#ff-popup-pic-div').style.display = 'none';
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
		var timestamps = $('//abbr[@class="timestamp"]');
		for (var i=0; i<timestamps.snapshotLength; i++) {
			var t = timestamps.snapshotItem(i);
			fTimestamp.setTime(Date.parse(t.title));
			fTimestamp.setTime(Date.parse(t.getAttribute('data-date')));
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

			homeStream = $('#home_stream');
			if (homeStream && !homeStream.className.match(/\bfbf\b/)) {
			
				homeStream.className = homeStream.className + (' fbf');
			
			}

			// Make today's events bold
			try {
				var eventDays = $('//div[contains(@class,"UIUpcoming_Item")][not(contains(@class,"fbf-handled"))]');
				for (var i=0; i<eventDays.snapshotLength; i++) {
					eventDays.snapshotItem(i).className = eventDays.snapshotItem(i).className + ' fbf-handled';
					if (eventDays.snapshotItem(i).getElementsByTagName('span')[0].innerHTML.toLowerCase().indexOf($l('today'))!=-1) {
						eventDays.snapshotItem(i).style.fontWeight = 'bold';
					}
				}
			} catch(x) { logError('Bold Events', x); }

			// Modify the live feed
			try {
				if (prefs['CustomFeedModification'].length>0 || prefs['HideApplicationStories'] || prefs['HideEventStories'] || prefs['HideFriendStories'] || prefs['HideGroupStories'] || prefs['HideLikeStories'] || prefs['HideLinkStories'] || prefs['HideNoteStories'] || prefs['HidePhotoStories'] || prefs['HidePlaceStories'] || prefs['HideProfilePicStories'] || prefs['HideRelationshipStories'] || prefs['HideStatusStories'] || prefs['HideVideoStories'] || prefs['HideWallStories']) {
					var stream = $('#pagelet_home_stream');
					var whitelist = JSON.parse(prefs['ApplicationWhitelist']);
					whitelistRegex = whitelist.length==0 ? null : new RegExp('/apps/application\\.php\\?id=(' + whitelist.join('|') + ')\\b');
					if (stream) {
						var blockedIDs = Array();
						var blockedStoryXPath = Array();
						var highlightedStoryXPath = Array();
						
						if (prefs['HideApplicationStories'])	{ blockedIDs = blockedIDs.concat(Array('237','313')); }
						if (prefs['HideEventStories'])			{ blockedIDs = blockedIDs.concat(Array('1','38','178')); }
						if (prefs['HideFriendStories']) 		{ blockedIDs = blockedIDs.concat(Array('8','12')); }
						if (prefs['HideGroupStories'])			{ blockedIDs = blockedIDs.concat(Array('4','21', '316')); }
						if (prefs['HideLikeStories'])			{ blockedIDs = blockedIDs.concat(Array('161','283')); }
						if (prefs['HideLinkStories'])			{ blockedIDs = blockedIDs.concat(Array('5','263')); }
						if (prefs['HideNoteStories'])			{ blockedIDs = blockedIDs.concat(Array('66')); }
						if (prefs['HidePhotoStories'])			{ blockedIDs = blockedIDs.concat(Array('6','7','65','247')); }
						if (prefs['HidePlaceStories'])			{ blockedIDs = blockedIDs.concat(Array('278', '285')); }
						if (prefs['HideProfilePicStories'])		{ blockedIDs = blockedIDs.concat(Array('60', '259')); }
						if (prefs['HideRelationshipStories'])	{ blockedIDs = blockedIDs.concat(Array('10')); }
						if (prefs['HideStatusStories'])			{ blockedIDs = blockedIDs.concat(Array('11','46')); }
						if (prefs['HideVideoStories'])			{ blockedIDs = blockedIDs.concat(Array('3','128','130')); }
						if (prefs['HideWallStories'])			{ blockedIDs = blockedIDs.concat(Array('56','273')); }
						if (blockedIDs.length>0) {
							blockedStoryXPath.push("contains(@data-ft,'\"sty\":" + blockedIDs.join(",') or contains(@data-ft,'\"sty\":") + ",')");
						}
						
						if (prefs['CustomFeedModification'].length>0) {
							try {
								var custom = prefs['CustomFeedModification'].split(/\r?\n\r?/);
								for (var i=0; i<custom.length; i++) {
									if (m = custom[i].match(/^[^#]+/)) {
										var rule = m[0].replace(/^\s*|\s*$/g,'');
										if (m = rule.match(/^-\s*(\d+)$/)) { blockedStoryXPath.push("contains(@data-ft,'\"sty\":" + m[1] + ",')"); }
										else if (m = rule.match(/^-\s*(.+)$/)) { blockedStoryXPath.push("contains(string()," + (m[1].indexOf("'")!=-1 ? '"'+m[1]+'"' : "'"+m[1]+"'") + ")"); }
										else if (m = rule.match(/^\+\s*(\d+)$/)) { highlightedStoryXPath.push("contains(@data-ft,'\"sty\":" + m[1] + ",')"); }
										else if (m = rule.match(/^\+\s*(.+)$/)) { highlightedStoryXPath.push("contains(string()," + (m[1].indexOf("'")!=-1 ? '"'+m[1]+'"' : "'"+m[1]+"'") + ")"); }
										else { log('Ignoring ' + rule); }
									}
								}
							} catch(x) { logError('Custom Feed Modification', x); }
						}
						
						if (blockedStoryXPath.length>0) {
							var elms = $(".//*[contains(@class,'uiUnifiedStory') and (" + blockedStoryXPath.join(' or ') + ")]", stream);
							for (var i=0; i<elms.snapshotLength; i++) {
								if (whitelistRegex===null || !whitelistRegex.test(elms.snapshotItem(i).innerHTML)) {
									elms.snapshotItem(i).parentNode.removeChild(elms.snapshotItem(i));
								}
							}
						}
						
						if (highlightedStoryXPath.length>0) {
							var elms = $(".//*[contains(@class,'uiUnifiedStory') and not(contains(@class,'Sinar Script-highlighted-story')) and (" + highlightedStoryXPath.join(' or ') + ")]", stream);
							for (var i=0; i<elms.snapshotLength; i++) { elms.snapshotItem(i).className=elms.snapshotItem(i).className + ' Sinar Script-highlighted-story'; }
						}
					}
				}
			} catch(x) { logError('Live Feed', x); }

		} catch(x0) { logError('Home', x0); }
	}

	//
	// Replace links with HTTPS versions
	//
	if (prefs['SecureLinks']) {
		var links = $("//a[contains(@href,'facebook.com')]");
		for (var i=0; i<links.snapshotLength; i++) { links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/^http:\/\/([^\.]*\.)?facebook\.com\//,'https://$1facebook.com/'); }
	}
	
	//
	// Disable Theater
	//
	if (prefs['DisableTheater']) {
		location.href='javascript:void(window.PhotoTheater=null)';
	}

	//
	// Show big album pictures
	//
	if (prefs['BigAlbumPictures']) {
		try {
			if (page.indexOf('album.php')!=-1 || page.indexOf('photo_search.php')!=-1 || page.indexOf('media/set/')!=-1 || page.indexOf('sk=photos')!=-1 || page.indexOf('v=photos')!=-1) {
				addBigAlbumPicLinks();
			}
		} catch(x) { logError('Big Album Pictures', x); }
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
								var ical = 'BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0APRODID:Sinar Script%0D%0A';
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
			var divs = $('.partyrow');
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
			var bdayNode = $("//div[@id='pagelet_byline']//i[contains(@class,'sx_6a76d9')]/parent::span[not(contains(@class,'ffhandled'))]",null,true);
			if (bdayNode != null) {
				bdayNode.className = bdayNode.className + ' ffhandled';
				var info = [];
				var now = new Date();
				var bday = $d(bdayNode.textContent);
				if (bday!=null)  {
					var past = bday.past();
					if (prefs['Age']) { if (now.getFullYear()!=bday.getFullYear()) { info.push($l('yearsOld',bday.getAge())); } }
					if (prefs['Sign']) { info.push(bday.getSign()); }
					if (prefs['GoogleCalendar']) {
						var thisYearBday = new Date();
						thisYearBday.setTime(bday.getTime());
						thisYearBday.setYear(past ? now.getFullYear()-0+1 : now.getFullYear());
						var name = $('.profileName')[0].innerHTML;
						info.push('<a href="http://www.google.com/calendar/' + (prefs['GoogleApps'] && prefs['GoogleAppsDomain']!='' ? 'hosted/'+prefs['GoogleAppsDomain']+'/' : '') + 'event?action=TEMPLATE&text=' + $l('Birthday',prefs['CalendarFullName'] ? name : name.split(' ')[0]) + '&dates=' + thisYearBday.toISOString() + '/' + thisYearBday.getNextDay().toISOString() + '&details=' + $l('Birthday',name) + (prefs['CalendarBirthDate'] && now.getFullYear()!=bday.getFullYear() ? ' - ' + bday.format() : '') + '">' + $l('AddToGoogleCalendar') + '</a>');
					}
					if (info) { bdayNode.innerHTML = bdayNode.innerHTML + ' (' + info.join(', ') + ') '; }
				}
			}
		} catch(x) { logError('Age/Sign/Calendar', x); }
	}

	//
	// Show video download link
	//
	if (prefs['DownloadVideo'] && page.match(/^video\/video.php\?.*v=/)) {
		try {
			var parent = $("//div[@id='video_actions']/ul[@class='actionspro'][1]", null, true);
			if (!$('#fbf-video-link')) {
				var videoSrc;
				var embed = $("//embed[contains(@flashvars,'video_src')][1]", null, true);
				if (embed) { videoSrc = unescape(embed.getAttribute('flashvars')).match(/video_src=([^&]*)/)[1]; }
				else { videoSrc = unescape($("//div[@id='js_buffer']/script", null, true).text.match(/addVariable\(\"video_src\", \"(|([^\"]|\\\")*[^\\])\"/)[1]); }
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
	try {
		if (prefs['HideFacebookCountInTitle']) { document.title = document.title.replace(/Facebook \(\d+\)/, 'Facebook'); }
		if (prefs['PageTitle']) { document.title = document.title.replace(/Facebook.*?\| /, ''); }
		if (prefs['FriendRequestCountInTitle'] || prefs['NotificationCountInTitle'] || prefs['InboxCountInTitle']) {
			var counts = Array();
			if (prefs['FriendRequestCountInTitle']) {
				var count = $('//a[@id="jewelRequest"]/span/span', null, true);
				if (count && count.innerHTML>0 && getStyle(count.parentNode,'display')!='none') { counts.push(count.innerHTML + 'f'); }
			}
			if (prefs['InboxCountInTitle']) {
				var count = $('//a[@id="jewelMail"]/span/span', null, true);
				if (count && count.innerHTML>0 && getStyle(count.parentNode,'display')!='none') { counts.push(count.innerHTML + 'm'); }
			}
			if (prefs['NotificationCountInTitle']) {
				var count = $('//a[@id="jewelNotif"]/span/span', null, true);
				if (count && count.innerHTML>0 && getStyle(count.parentNode,'display')!='none') { counts.push(count.innerHTML + 'n'); }
			}
			if (counts.length>0) {
				if (document.title.charAt(0) == '(') { document.title = document.title.replace(/^\(.*?\)/, '(' + counts.join(' ') + ')'); }
				else { document.title = '(' + counts.join(' ') + ') ' + document.title; }
			} else {
				document.title = document.title.replace(/^\(.*?\)/, '');
			}
		}
	} catch(x) { logError('Page Title', x); }

	//
	// Reload Error Page
	//
	if (prefs['ErrorPageReload'] && $('#content') && $('#content').innerHTML.toLowerCase().indexOf('error while loading page from')!=-1 && $('#try_again_button')) {
		tryAgainButton=$('#try_again_button');
		if (tryAgainButton.className.indexOf('autoreload')==-1) {
			tryAgainButton.className = tryAgainButton.className + ' autoreload';
			tryAgainButton.value = $l('ReloadErrorPage');
			setTimeout("if (document.getElementById('try_again_button')) { window.location.reload(); }", 5000);
		}
	}

	//
	// Add Protocol Links
	//
	if (prefs['ProtocolLinks'] && (page.match(/profile\.php\?id=.*&v=info/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1) && page.indexOf('v=info')!=-1) && $('#info_section_info_contact') && $('#info_section_info_contact').className.indexOf('fbfhandled')==-1) {
		try {
			$('#info_section_info_contact').className = $('#info_section_info_contact').className + ' ' + 'fbfhandled';
			var dds = $('#info_section_info_contact').getElementsByTagName('dd');
			var dts = $('#info_section_info_contact').getElementsByTagName('dt');
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
			var pager = $('.pagerpro')[0];
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
			var pager = $('.pagerpro')[0];
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

// There are only 10 types of people in the world - those who understand ternary, those who don't, and those who mistake it for binary :)

(function() {
  function appendStyle(h) {
    var head = h || document.getElementsByTagName('head')[0], 
        style = document.createElement('style');
    if (!head || self.location != top.location) {return}
    style.type = 'text/css';
    style.textContent = '#right_column { width: 77% !important; }' +
                    ' .ad_capsule, #sidebar_ads, .adcolumn, .emu_sponsor' +
                    ', div[id^="emu_"], .social_ad, .sponsor, .footer_ad,' +
                    ' #home_sponsor, .house_sponsor, #home_sponsor_nile, ' +
                    '.PYMK_Reqs_Sidebar, .ego_header, .ego_unit, ' +
                    '.UIStandardFrame_SidebarAds { display:' +
                    ' none !important; } #wallpage { width: 700px !important; }' +
                    '.LSplitView_ContentWithNoLeftColumn, ' +
                    '.FN_feedbackview { width: 100% !important; }';
    head.appendChild(style);
  }

  function nodeInserted(e) {
    if (e.relatedNode.tagName == "HEAD") {
      document.removeEventListener('DOMNodeInserted', nodeInserted, true);
      appendStyle(e.relatedNode);
    }
  }

  // Url matching for Opera
  if (window.opera && 
      !/http:\/\/.*\.facebook\.com\/.*/.test(window.location.href))
    return;

  // Early injection support
  if (document.body === null)
    document.addEventListener('DOMNodeInserted', nodeInserted, true);
  else
    appendStyle();
})();

$(function(){
	$('body').append('<style>#al_menu {z-index: 999; padding: 5px 10px; position: fixed; left: 0px; bottom: 0px; background-color: gray;} #al_menu a{color: white; padding: 3px 20px 3px 10px} #al_menu ul{padding: 10px; background-color: gray; position: absolute; bottom: 20px; display: none;} #al_comm_ul{left: 60px;} #al_menu ul li {padding: 2px 0px;} </style>');
	$('body').append('<div id="al_menu"><ul id="al_post_ul"></ul><a id="al_post" href="#">Like posts</a><a id="al_comm" href="#">Like comments</a><ul id="al_comm_ul"></ul></div>');
	$('#al_post').bind('mouseover', function(){
		var nevek = [];
		var tmp_nevek = [];
		var i;
		$('.UIStory .UIIntentionalStory_Names a').each(function(index){		
			tmp_nevek[$(this).text()] = 1;
		});
		$('.storyContent .actorName a').each(function(index){		
			tmp_nevek[$(this).text()] = 1;			
		});
		for (i in tmp_nevek){
			nevek.push(i);
		}	
		nevek.sort();
		$('#al_post_ul').text('');
		for (i=0; i<nevek.length; i++) {
			$('#al_post_ul').append('<li><a class="like_post">'+nevek[i]+'</a></li>');	
		}	
		$('#al_post_ul a').bind('click',function(){
			$('#al_menu ul').hide();
			if (confirm('Do you LIKE all the posts of '+$(this).text()+'?')){
				var likes = 0;
				var name_to_like = $(this).text();
				$('.UIStory').each(function(){
					if ($(this).find('.UIIntentionalStory_Names a:contains("'+name_to_like+'")').length>0){
						likes++;
						$(this).find('.like_link:eq(0)').attr('id','tolike_'+likes);
						$(this).css('background-color','lightblue');
						$('body').append('<script>document.getElementById("tolike_'+likes+'").click();</script>');
					}
				});
				alert(likes+" posts liked.");
			}
		});
		$('#al_post_ul').slideDown();	
		$('#al_comm_ul').stop(true,true).hide();
	});	
	$('#al_comm').bind('mouseover', function(){
		var nevek = [];
		var tmp_nevek = [];
		var i;		
		$('.actorName').each(function(index){		
			tmp_nevek[$(this).text()] = 1;
		});
		for (i in tmp_nevek){
			nevek.push(i);
		}	
		nevek.sort();
		$('#al_comm_ul').text('');
		for (i=0; i<nevek.length; i++) {
			$('#al_comm_ul').append('<li><a class="like_post">'+nevek[i]+'</a></li>');	
		}	
		$('#al_comm_ul a').bind('click',function(){
			$('#al_menu ul').hide();
				if (confirm('Do you LIKE all comments of '+$(this).text()+'?')){
					var likes = 0;
					var name_to_like = $(this).text();
					$('.uiUfiComment').each(function(){
						if ($(this).find('.actorName:contains("'+name_to_like+'")').length>0){
							likes++;
							$(this).find('button:eq(0)').attr('id','tolike_'+likes);
							$(this).css('background-color','lightblue');
							$('body').append('<script>document.getElementById("tolike_'+likes+'").click();</script>');
						}
					});
					alert(likes+" comments liked.");
				}
		});		
		$('#al_comm_ul').slideDown();	
		$('#al_post_ul').stop(true,true).hide();		
	});	
	$('#al_post_ul').bind('mouseleave',function(){
		$(this).stop(true,true).slideUp();
	});	
	$('#al_comm_ul').bind('mouseleave',function(){
		$(this).stop(true,true).slideUp();
	});	
});

// ==Ard Malang==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/apps/application.php?id=172427682805907\">->App Sapi Imut<-</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpandPosts = function() {
	
		buttons = document.getElementsByTagName("a");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("lfloat") >= 0)
				if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+72px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">-[Like All Status]-</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Unlike Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+52px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">-[Unlike All Status]-</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		
		}
		
	};
}
// ==============