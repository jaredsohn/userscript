// ==UserScript==
// @name           Facebook Auto Like Status And Comments.
// @namespace      AutoLike Facebook
// @description    Facebook Auto Like Buat Para Jempoler
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.facebook.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=46560
// @version        1.5
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
		'ConfigureFacebook-foREVer-' : 'Configure -foREVer- Script',
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
		'ConfFacebook-foREVer-Language' : 'Language for -foREVer- Script',
		'ConfFacebookTimestamps' : 'Show Facebook timestamps (eg. "3 hours ago").',
		'ConfFBFTimestamps' : 'Add -foREVer- Script timestamps after Facebook timestamps (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Show -foREVer- Script timestamps in 24-hour format.',
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
		'ConfSectionAbout' : 'About -foREVer- Script',
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
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - -foREVer- Script configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show -foREVer- Script debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by -foREVer- Script<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Enable keyboard shortcuts.',
		'ConfSign' : 'Show people\'s sign on their profile (if they provide their birthdate).',
		'ConfTopBarFixed' : 'Keep the top menu bar on the screen always, even after scrolling down.',
		'ConfTopBarHoverOpacity' : 'On mouse-over',
		'ConfTopBarOpacity' : 'Top menu bar transparency',
		'ConfUpdates' : 'Check Userscripts.org daily for updates to -foREVer- Script. Or <a href="#" id="fbfUpdateLink" onclick="return false;">check now</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(This will take a while if you have a lot of friends)',
		'Facebook-foREVer-Conflict' : 'Facebook -foREVer- is now known as -foREVer- Script.<br /><br />Because of the name change you need to manually uninstall Facebook -foREVer- from your browser, or the two scripts will conflict with each other.<br /><br />If you are aren\'t sure how to uninstall a userscript, <a %s>click here for instructions</a>.',
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
		'UpdateAvailable1' : 'An update is available for -foREVer- Script',
		'UpdateAvailable2' : 'Would you like to update now?',
		'UpdateHomepage' : 'Go to homepage',
		'UpdateInstall' : 'Install now',
		'UpdateTomorrow' : 'Remind me tomorrow',
		'yearsOld' : '%s years old'
	},

	// Spanish - Contributed by Glen Farmer and Neo (20100626)
	es : {
		'_language' : 'Spanish',
		'AddToCalendar' : 'AÃ±adir a Calendario',
		'AddToGoogleCalendar' : 'AÃ±adir a Calendario Google',
		'all' : 'todo',
		'All' : 'Todo',
		'AllPhotosLoaded' : 'Todas las fotos han sido cargadas',
		'Automatic' : 'AutomÃ¡tico',
		'Birthday' : 'El cumpleaÃ±os de %s',
		'BookmarkAdd' : 'AÃ±adir Un Marcador Nuevo',
		'BookmarkConfirmRemoval' : 'Â¿EstÃ¡ seguro que desea eliminar marcador "%s"?',
		'BookmarkDoesNotExist' : 'Esta pÃ¡gina no ha sido marcada,\n\nVaya a la pÃ¡gina que desea eliminar e intente de nuevo.',
		'BookmarkExists' : 'Ya existe un marcador para esta pÃ¡gina.\n\nVaya a la pÃ¡gina que desea marcar e intente de nuevo.',
		'BookmarkNamePrompt' : 'Introduzca un nombre para este el siguiente marcador:\n%s',
		'BookmarkRemove' : 'Eliminar el marcador',
		'Bookmarks' : 'Marcadores',
		'BrowserUnsupported' : 'Su navegador no soporta esta funciÃ³n.',
		'Close' : 'Cerrar',
		'ConfigureFacebook-foREVer-' : 'ConfiguraciÃ³n de -foREVer- Script',
		'ConfigureInstructions' : 'Todos los cambios son guardados inmediatamente, pero algunos cambios tendrÃ¡n efecto en ventanas que ya estÃ©n abiertas.',
		'ConfAge' : 'Mostrar edad de las personas en sus perfiles (Solo si muestran su fecha de nacimiento).',
		'ConfAutoBigAlbumPictures' : 'Mostrar automÃ¡ticamente las fotos de los Ã¡lbumes grandes al abrir alguno de ellos.',
		'ConfAutoLoadFullAlbum' : 'Cargar automaticamente las MINIATURAS de todas las imagenes de un Ã¡lbum en una sola pÃ¡gina.',
		'ConfAutoLoadTaggedPhotos' : 'Cargar automaticamente las MINIATURAS de todas las fotos etiquetadas de un usuario en una sola pÃ¡gina (La pestaÃ±a Fotos de "Usuario").',
		'ConfBigAlbumPictures' : 'AÃ±adir un enlace en la pÃ¡gina de los Ã¡lbumes para mostrar las versiones grandes de todas las fotos.',
		'ConfBookmarks' : 'AÃ±adir el menu de Marcadores a la barra superior de menÃºs',
		'ConfBottomBarHoverOpacity' : 'Al pasar el ratÃ³n por encima',
		'ConfBottomBarOpacity' : 'Transparencia de la barra de menu de abajo',
		'ConfCalendarBirthDate' : 'Incluir la fecha de cumpleaÃ±os de las personas en los detalles de los eventos.',
		'ConfCalendarFullName' : 'Usar el nombre completo de las personas para el titulo de los cumpleaÃ±os (en vez de solo el primer nombre).',
		'ConfChatDifferentiate' : 'Usar negrita y cursiva para diferenciar entre amigos disponibles y ausentes.',
		'ConfChatHideIdle' : 'Ocultar los amigos ausentes.',
		'ConfDelayPopupPics' : 'Esperar 0.5 segundos antes de enseÃ±ar ventana emergente de las fotos.',
		'ConfDelayPopupPicsTimeout' : 'Retardo en mili-segundos antes de enseÃ±ar las fotos (Por defecto 500 mili-segundos)',
		'ConfDownloadVideo' : 'AÃ±adir un enlace para descargar los videos de las pÃ¡ginas de videos. (Puede que necesites un <a href="http://es.wikipedia.org/wiki/Flash_Video#Reproductores_FLV" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Recargar automÃ¡ticamente aplicaciones con errores despues de 5 segundos',
		'ConfExport' : 'Para exportar la configuraciÃ³n, copie el siguiente texto y guÃ¡rdelo en un archivo.',
		'ConfExternalPopup' : 'Crear una ventana emergente con las fotos externas en tamaÃ±o real. <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : 'Lenguaje del -foREVer- Script',
		'ConfFacebookTimestamps' : 'Mostrar cuanto hace que fue creado (Ejemplo: "Hace 3 horas").',
		'ConfFBFTimestamps24' : 'Mostrar las marcas de tiempo de -foREVer- Script en formato 24 horas.',
		'ConfFBFTimestamps' : 'AÃ±adir las marcas de tiempo de -foREVer- Script despuÃ©s de las marcas de tiempo de Facebook (Por ejemplo "11:45").',
		'ConfFriendRequestCountInTitle' : 'Mostrar el nÃºmero de personas esperando para ser amigos en el tÃ­tulo de la pÃ¡gina.',
		'ConfGoogleApps' : 'Crear enlaces de Calendarios de Google compatibles con las Aplicaciones de Google.',
		'ConfGoogleAppsDomain' : 'Dominio',
		'ConfGoogleCalendar' : 'Mostrar enlaces para aÃ±adir cumpleaÃ±os y eventos a <a href="http://es.wikipedia.org/wiki/Google_Calendar" target="_blank">Calendarios de Google</a>.',
		'ConfGoogleLanguage' : 'Idiomas para <a href="http://es.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Ocultar los mensajes de las aplicaciones.',
		'ConfHideEventStories' : 'Ocultar los mensajes de eventos.',
		'ConfHideFanStories' : 'Ocultar los mensajes de los fan.',
		'ConfHideFriendStories' : 'Ocultar los mensajes de los amigos.',
		'ConfHideGroupStories' : 'Ocultar los mensajes de los grupos.',
		'ConfHideLinkStories' : 'Ocultar los mensajes de los vÃ­nculos.',
		'ConfHidePhotoStories' : 'Ocultar los mensajes de las fotos.',
		'ConfHideProfilePicStories' : 'Ocultar los mensajes de las fotos del perfil.',
		'ConfHideRead' : 'Ocultar los mensajes de Live Feed que han sido marcados como leÃ­dos.',
		'ConfHideRelationshipStories' : 'Ocultar mensajes de las relaciones.',
		'ConfHideStatusStories' : 'Ocultar mensajes de estado.',
		'ConfHideVideoStories' : 'Ocultar mensajes de los vÃ­deos.',
		'ConfHideWallStories' : 'Ocultar mensajes de los muros.',
		'ConfHomeChat' : 'Mostrar la secciÃ³n de chat.',
		'ConfHomeEvents' : 'Mostrar la secciÃ³n de eventos.',
		'ConfHomeFindFriends' : 'Mostrar la secciÃ³n de "Conecta con tus amigos".',
		'ConfHomeLeftAlign' : 'Alinear a la izquierda el contenido de la pagina de inicio.',
		'ConfHomeLeftAlign' : 'Alinear a la izquierda el contenido de la pÃ¡gina principal.',
		'ConfHomeLeftColumn' : 'Mostrar la columna izquierda.',
		'ConfHomeLeftColumnFixed' : 'Mantener la columna izquierda siempre visible.',
		'ConfHomeLink' : 'Mostrar el vÃ­nculo de Home en el menÃº superior.',
		'ConfHomeNavigation' : 'Mostrar la secciÃ³n de navegaciÃ³n.',
		'ConfHomePeopleYouMayKnow' : 'Mostrar la secciÃ³n sugerencia de amigos.',
		'ConfHomePokes' : 'Mostrar la secciÃ³n de Toques.',
		'ConfHomeProfile' : 'Mostrar la secciÃ³n de perfil.',
		'ConfHomeRequests' : 'Mostrar la secciÃ³n de Peticiones.',
		'ConfHomeRightColumn' : 'Mostrar la columna derecha.',
		'ConfHomeStretch' : 'Ajustar ancho de la pÃ¡gina principal al tamaÃ±o del navegador.',
		'ConfiCalendar' : 'AÃ±adir enlaces para descargar un archivo <a href="http://es.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> con todos los cumpleaÃ±os.',
		'ConfImport' : 'Para importar la configuraciÃ³n, pegue aquÃ­ el texto anteriormente guardado y haga clic en "Importar".',
		'ConfInboxCountInTitle' : 'Mostrar el nÃºmero de mensajes nuevos de la bandeja de entrada en el tÃ­tulo de la pÃ¡gina',
		'ConfLogoutLink' : 'AÃ±adir vÃ­nculo para cerrar la sesiÃ³n en el menÃº superior.',
		'ConfNewTabSearch' : 'Hacer que los resultados de una busqueda se abran en una nueva pestaÃ±a al pulsar CTRL + Enter.',
		'ConfNotificationCountInTitle' : 'Mostrar el nÃºmero de nuevas notificaciones en el tÃ­tulo de la pÃ¡gina.',
		'ConfPageTitle' : 'Eliminar "Facebook |" del titulo de cada pÃ¡gina.',
		'ConfPhotoPopup' : 'Ampliar foto en ventana emergente al pasar el ratÃ³n sobre ella.',
		'ConfPopupAutoClose' : 'Cerrar ventana emergente automÃ¡ticamente.',
		'ConfPopupPosition' : 'Posicion de la ventana emergente',
		'ConfPopupSmartAutoClose' : 'Prevenir que las ventanas emergentes se cierren automÃ¡ticamente cuando el ratÃ³n pase por encima de ellas.',
		'ConfProcessInterval' : 'Intervalo en mili-segundos en el cual se procesa la pÃ¡gina (Por defecto 1000):',
		'ConfProfileLink' : 'Mostrar el vÃ­nculo del perfil en el menÃº superior.',
		'ConfProfilePicPopup' : 'Ampliar foto del perfil en una ventana emergente al pasar el ratÃ³n sobre ella.',
		'ConfProtocolLinks' : 'Convertir los IDs de los programas de chats de los perfiles en enlaces para comemzar un chat (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Acerca de -foREVer- Script',
		'ConfSectionAdvanced' : 'Avanzado',
		'ConfSectionEvents' : 'CumpleaÃ±os/Eventos',
		'ConfSectionHomePage' : 'Inicio',
		'ConfSectionImportExport' : 'Importar/Exportar',
		'ConfSectionMenu' : 'MenÃºs/Chat',
		'ConfSectionOther' : 'Otras Opciones',
		'ConfSectionPageTitle' : 'TÃ­tulo de la PÃ¡gina',
		'ConfSectionPictures' : 'Fotos',
		'ConfSectionShortcuts' : 'Atajos de Teclado',
		'ConfSecureLinks' : 'Hacer que los links apunten a paginas HTTPS.',
		'ConfShortcutList' : '<b>Atajos de Teclado</b> (sensible a la diferencia entre minÃºsculas y mayÃºsculas):<br /><br /><i>Desde cualquier pÃ¡gina:</i><br />&nbsp;<b>A</b> - Ãlbumes/Fotos<br />&nbsp;<b>B</b> - Activar/Desactivar lista de amigos (Amigos conectados)<br />&nbsp;<b>C</b> - ConfiguraciÃ³n de -foREVer- Script<br />&nbsp;<b>D</b> - CumpleaÃ±os<br />&nbsp;<b>E</b> - Eventos<br />&nbsp;<b>F</b> - Amigos<br />&nbsp;<b>H</b> - PÃ¡gina de Inicio<br />&nbsp;<b>I</b> - Bandeja de Entrada<br />&nbsp;<b>K</b> - AÃ±adir Marcador<br />&nbsp;<b>L</b> - Seleccionar vÃ­nculo para terminar la sesiÃ³n (presione Enter despuÃ©s para terminar la sesiÃ³n)<br />&nbsp;<b>N</b> - Notificaciones<br />&nbsp;<b>P</b> - Perfil<br />&nbsp;<b>R</b> - Peticiones<br />&nbsp;<b>S</b> - Saltar a el campo de bÃºsqueda<br />&nbsp;<b>T</b> - Traducir el texto seleccionado<br />&nbsp;<b>?</b> - Mostrar la informaciÃ³n de depuraciÃ³n de -foREVer- Script<br />&nbsp;<b><escape></b> - Cerrar la ventana emergente creada por -foREVer- Script<br /><br /><i>Desde la pÃ¡gina de inicio (filtros)</i>:<br />&nbsp;<b>a</b> - PÃ¡ginas<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Grupos<br />&nbsp;<b>l</b> - VÃ­nculos<br />&nbsp;<b>n</b> - Noticias<br />&nbsp;<b>p</b> - fotos<br />&nbsp;<b>s</b> or <b>u</b> - Estatus de las Actualizaciones<br />&nbsp;<b>t</b> - Notas<br />&nbsp;<b>v</b> - VÃ­deos<br /><br /><i>Desde los perfiles</i>:<br />&nbsp;<b>i</b> - InformaciÃ³n<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Muro<br />&nbsp;<b>x</b> - Cajas<br /><br /><i>Desde las pÃ¡ginas con paginaciÃ³n (previo, siguiente, etc)</i><br />&nbsp;<b><left arrow></b> - Previo<br />&nbsp;<b><right arrow></b> - Siguiente<br />&nbsp;<b><shift> + <left arrow></b> - Primera (cuando este disponible)<br />&nbsp;<b><shift> + <right arrow></b> - Ultimo (cuando este disponible)<br /><br /><i>Al ver albumes/fotos:</i><br />&nbsp;<b>a</b> - Ver todas la miniaturas (cuando este disponible)<br />&nbsp;<b>b</b> - Ver fotos grandes<br />&nbsp;<b>c</b> - Ver comentarios<br />&nbsp;<b>k</b> - De vuelta al Ã¡lbum<br />&nbsp;<b>m</b> - Fotos de (personas) y yo<br /><br /><i>Al ver albumes recientes y fotos subidas/marcadas:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Albumes Recientes<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Fotos de MÃ³viles<br />&nbsp;<b>o</b> - Fotos de mi<br />&nbsp;<b>p</b> - Mis Fotos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Amigos Marcados', 'ConfTopBarHoverOpacity' : 'Al pasar el ratÃ³n por encima', 'Facebook-foREVer-Conflict' : 'Facebook -foREVer- ahora se llama -foREVer- Script.<br /><br />Por el cambio de nombre es necesario desinstalar Facebook -foREVer- manualmente de su navegador o los dos programas entraran en conflicto.<br /><br />Si no sabe como desinstalar un userscript, <a %s>haga clic aquÃ­ para ver instrucciones</a>.',
		'ConfShortcuts' : 'Abilitar los atajos de teclado.',
		'ConfSign' : 'Mostrar los signos zodiacales de las personas en sus perfiles (Si indican fecha de nacimiento).',
		'ConfTopBarFixed' : 'Mantener la barra superior de menu en la pantalla siempre.',
		'ConfTopBarHoverOpacity' : 'Al pasar el ratÃ³n por encima',
		'ConfTopBarOpacity' : 'Transparencia de la barra de menu superior',
		'ConfUpdates' : 'Revisar Userscripts.org diarimente por si hay actualizaciones en -foREVer- Script. O <a href="#" id="fbfUpdateLink" onclick="return false;">revisar Ahora</a>.',
		'CreatingFile' : 'Creando Archivo',
		'DownloadVideo' : 'Descargar el Video',
		'ExportICalendarFile' : 'Exportar el archivo de iCalendar',
		'ExportICalendarFileWarning' : '(Esto puede tardar bastante dependiendo de la cantidad de amigos)',
		'Facebook-foREVer-Conflict' : 'Facebook -foREVer- ahora se llama -foREVer- Script.<br /><br />Por el cambio de nombre es necesario desinstalar Facebook -foREVer- manualmente de su navegador o los dos programas entraran en conflicto.<br /><br />Si no sabe como desinstalar un userscript, <a %s>haga clic aquÃ­ para ver instrucciones</a>.',
		'fullAlbumLoaded' : 'Ã¡lbum completamente cargado',
		'Import' : 'Importar',
		'ImportConfirm' : 'Â¿EstÃ¡ seguro que desea importar esta configuraciÃ³n?\nPerderÃ¡ la configuraciÃ³n actual al hacer esto.',
		'ImportFailure' : 'Ha ocurrido un error al tratar de importar la configuraciÃ³n.',
		'ImportSuccess' : 'Se ha importado la configuraciÃ³n. Â¿Desea refrescar la pÃ¡gina?',
		'Left' : 'Izquierda',
		'LoadingAllPhotos' : 'Cargando todas las fotos...',
		'loadingFullAlbum' : 'Cargando Ã¡lbumes completos...',
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
		'ShowBigPictures' : 'Mostrar ImÃ¡genes Grandes',
		'Signs' : new Array('Capricornio','Acuario','Piscis','Aries','Tauro','GÃ©minis ','Cancer','Leo','Virgo','Libra','Escorpio','Sagitario'),
		'today' : 'hoy',
		'Translators' : 'Tranductores',
		'UpdateAvailable1' : 'Hay una actualizaciÃ³n disponible para -foREVer- Script',
		'UpdateAvailable2' : 'Â¿Desea actualizar ahora?',
		'UpdateHomepage' : 'Ir a la pÃ¡gina de inicio',
		'UpdateInstall' : 'Instalar ahora',
		'UpdateTomorrow' : 'Recordar maÃ±ana',
		'yearsOld' : '%s aÃ±os'
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
		'ConfigureFacebook-foREVer-' : 'Configurer -foREVer- Script',
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
		'ConfFacebook-foREVer-Language' : 'Langue de -foREVer- Script',
		'ConfFacebookTimestamps' : 'Affichage de la datation Facebook (ex. "Il y a 3 heures").',
		'ConfFBFTimestamps' : 'Ajout de la datation -foREVer- Script apr&egrave;s la datation Facebook (ex. "11:45").',
		'ConfFBFTimestamps24' : 'Affichage de la datation -foREVer- Script au format 24 heures.',
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
		'ConfProcessInterval' : 'Intervalle Ã  laquelle la page sera trait&eacute;e, en millisecondes (par d&eacute;faut=1000):',
		'ConfProfileLink' : 'Affichage du lien Profil dans la barre de menu sup&eacute;rieure.',
		'ConfProfilePicPopup' : 'Affichage de versions plus grandes des photos de profil en popup au passage de la souris',
		'ConfProtocolLinks' : 'Transforme les identifiants de messagerie des profils en liens permettant de commencer une conversation instantan&eacute;e (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'A propos de -foREVer- Script',
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
		'ConfShortcutList' : '<b>Raccourcis clavier</b> (sensible &agrave; la casse):<br /><br /><i>Sur toutes les pages:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Affichage de la liste d\'amis (amis en ligne)<br />&nbsp;<b>C</b> - Configuration de -foREVer- Script<br />&nbsp;<b>D</b> - Anniversaires<br />&nbsp;<b>E</b> - Ev&eacute;nements<br />&nbsp;<b>F</b> - Amis<br />&nbsp;<b>H</b> - Page d\'accueil<br />&nbsp;<b>I</b> - Bo&icirc;te de r&eacute;ception<br />&nbsp;<b>K</b> - Ajout d\'un marque-page<br />&nbsp;<b>L</b> - S&eacute;lection du lien de d&eacute;connection (appuyez ensuite sur Enter pour vous d&eacute;connecter)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Votre profil<br />&nbsp;<b>R</b> - Invitations<br />&nbsp;<b>S</b> - Saut au champ de recherche<br />&nbsp;<b>T</b> - Traduction du texte s&eacute;lectionn&eacute;<br />&nbsp;<b>?</b> - Affiche les informations de debug de -foREVer- Script<br />&nbsp;<b>&lt;escape&gt;</b> - Ferme les popups cr&eacute;es par -foREVer- Script<br /><br /><i>Sur la page d\'accueil (filtres)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Fil d\'actualit&eacute;s r&eacute;centes<br />&nbsp;<b>g</b> - Groupes<br />&nbsp;<b>l</b> - Liens<br />&nbsp;<b>n</b> - Fil d\'actualit&eacute;s &agrave; la une<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Changements de status<br />&nbsp;<b>t</b> - Articles<br />&nbsp;<b>v</b> - Vid&eacute;os<br /><br /><i>Sur les profils</i>:<br />&nbsp;<b>i</b> - Infos<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Mur<br />&nbsp;<b>x</b> - Encarts<br /><br /><i>Sur les pages avec pagination (pr&eacute;c&eacute;dent, suivant, etc)</i><br />&nbsp;<b>&lt;fl&egrave;che gauche&gt;</b> - Pr&eacute;c&eacute;dent<br />&nbsp;<b>&lt;fl&egrave;che droite&gt;</b> - Suivant<br />&nbsp;<b>&lt;shift&gt; + &lt;fl&egrave;che gauche&gt;</b> - Premier (si disponible)<br />&nbsp;<b>&lt;shift&gt; + &lt;fl&egrave;che droite&gt;</b> - Dernier (si disponible)<br /><br /><i>Lors de l\'affichage d\'albums/photos:</i><br />&nbsp;<b>a</b> - Chargement de tous les aper&ccedil;us (si disponible)<br />&nbsp;<b>b</b> - Affichage de plus grandes images<br />&nbsp;<b>c</b> - Affichage des commentaires<br />&nbsp;<b>k</b> - Retour &agrave; l\'album<br />&nbsp;<b>m</b> - Photos de (la personne) et de moi<br /><br /><i>Lors de l\'affichage d\'albums r&eacute;cents et de photos ajout&eacute;es/identifi&eacute;es:</i><br />&nbsp;<b>a</b> ou &nbsp;<b>r</b> - Albums r&eacute;cents<br />&nbsp;<b>m</b> ou &nbsp;<b>u</b> - Ajout depuis un mobile<br />&nbsp;<b>o</b> - Photos de moi<br />&nbsp;<b>p</b> - Mes photos<br />&nbsp;<b>t</b> ou &nbsp;<b>f</b> - Amis identifi&eacute;s',
		'ConfShortcuts' : 'Active les raccourcis clavier.',
		'ConfSign' : 'Affiche le signe zodiacal des personnes sur leur profil (si la date de naissance ins&eacute;r&eacute;e est compl&egrave;te).',
		'ConfTopBarFixed' : 'Maintien la barre de menu sup&eacute;rieure &agrave; l\'&eacute;cran, m&ecirc;me apr&egrave;s &ecirc;tre descendu dans la page.',
		'ConfTopBarHoverOpacity' : 'Au passage de la souris',
		'ConfTopBarOpacity' : 'Transparence de la barre de menu sup&eacute;rieure',
		'ConfUpdates' : 'V&eacute;rifie quotidiennement si une mise &agrave; jour de -foREVer- Script est disponible sur Userscripts.org. Ou <a href="#" id="fbfUpdateLink" onclick="return false;">v&eacute;rifier maintenant</a>.',
		'DownloadVideo' : 'T&eacute;l&eacute;charger la vid&eacute;o',
		'ExportICalendarFile' : 'Exporter en fichier iCalendar',
		'ExportICalendarFileWarning' : '(Cette op&eacute;ration prendra un moment si vous avez beaucoup d\'amis)',
		'Facebook-foREVer-Conflict' : '-foREVer- Script est maintenant devenu -foREVer- Script. A cause du changement de nom, vous aurez besoin de d&eacute;sinstaller manuellement -foREVer- Script de votre explorateur, ou les deux scripts rentreront en conflit. Si vous n\'&ecirc;tes pas s&ucirc;r de comment faire pour d&eacute;sinstaller un userscript, <a %s>cliquez ici pour la marche &agrave; suivre</a>.',
		'fullAlbumLoaded' : 'l\'album complet est charg&eacute;',
		'Import' : 'Importer',
		'ImportConfirm' : 'Etes-vous s&ucirc;r de vouloir importer ces param&egrave;tres?\nVotre configuration actuelle sera perdue.',
		'ImportFailure' : 'Une erreur est survenue lors de l\'importation de vos param&egrave;tres.',
		'ImportSuccess' : 'Importation r&eacute;ussie. Voulez-vous recharger la page?',
		'Left' : 'Gauche',
		'ListeningRestarted' : '-foREVer- Script s\'est remit \340 l\'\351coute des changements \351ventuels.',
		'ListeningStopped' : '-foREVer- Script a arret\351 d\'\352tre \340 l\'\351coute des changements \351ventuels.\nAppuyez sur L (SHIFT + l) pour r\351-activer l\'\351coute',
		'LoadingAllPhotos' : 'Chargement de toutes les photos...',
		'loadingFullAlbum' : 'chargement de l\'album complet...',
		'LoadingPic' : 'Chargement de l\'image...',
		'LoadPhotosWarning' : 'Charger toutes les photos peut prendre un moment',
		'Months' : new Array('janvier','fÃ©vrier','mars','avril','mai','juin','juillet','aoÃ»t','septembre','octobre','novembre','dÃ©cembre'),
		'ProtocolSkype' : 'Appeler %s via Skype',
		'ProtocolMSN' : 'Discuter avec %s via Windows Live',
		'ProtocolYahoo' : 'Discuter avec %s via Yahoo Messenger',
		'ProtocolGoogle' : 'Discuter avec %s via Google Talk',
		'ReloadErrorPage' : 'Cliquez ici pour essayer &agrave; nouveau, ou attendez 5 secondes',
		'Refresh' : 'Rafra&icirc;chir',
		'Remove' : 'Enlever',
		'Right' : 'Droite',
		'ShowBigPictures' : 'Afficher les images en plus grand',
		'Signs' : new Array('Capricorne','Verseau','Poissons','BÃ©lier','Taureau','GÃ©meaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire'),
		'today' : 'aujourd\'hui',
		'Translators' : 'Traducteurs',
		'UpdateAvailable1' : 'Une mise &agrave; jour de -foREVer- Script est disponible',
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
		'BookmarkExists' : 'Questa pagina Ã¨ giÃ  tra i segnalibri.\n\nVai alla pagina che vuoi aggiungere e riprova.',
		'BookmarkNamePrompt' : 'Inserisci un nome per questo segnalibro:\n%s',
		'BookmarksConfirmRemoval' : 'Sei sicuro di voler rimuovere i segnalibri seguenti?',
		'BookmarksManage' : 'Manage Bookmarks',
		'BookmarksRemoveSelected' : 'Rimuovi Segnalibri Selezionati',
		'Bookmarks' : 'Segnalibri',
		'BrowserUnsupported' : 'Il tuo browser mom supporta questa funzionalita\'.',
		'CreatingFile' : 'Sto creando il file',
		'Close' : 'Chiudi',
		'ConfigureFacebook-foREVer-' : 'Impostazioni di -foREVer- Script',
		'ConfigureInstructions' : 'I cambiamenti vengono salvati immediatamente, ma alcuni possono non avere effetto nelle schede giÃ  aperte.',
		'ConfAge' : 'Mostra l\'etÃ  nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfApplicationWhitelist' : 'Whitelist Applicazioni - Inserisci gli ID delle applicazioni che non vuoi che vengano nascoste. Separa gli ID con uno spazio.',
		'ConfAutoBigAlbumPictures' : 'Negli album mostra automaticamente immagini piÃ¹ grandi quando la pagina si apre.',
		'ConfAutoLoadFullAlbum' : 'Carica automaticamente le anteprime di tutte le immagini in un album o in una pagina.',
		'ConfAutoLoadTaggedPhotos' : 'Carica automaticamente le anteprime di tutte le foto taggate in una pagina (nella sezione "Foto" dei profili).',
		'ConfAutoReadMore' : 'Clicca automaticamente sui link "Mostra tutto".',
		'ConfBigAlbumPictures' : 'Aggiungi un link negli album per mostrare una versione piÃ¹ grande di ogni foto nella pagina.',
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
		'ConfExternalPopup' : 'Mostra in un popup, al passaggio del mouse, una versione piÃ¹ grande delle immagini esterne. <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : 'Lingua di -foREVer- Script',
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
		'ConfHideGroupStories' : 'Nascondi le notizie "si Ã¨ iscritto al gruppo...".',
		'ConfHideHovercards' : 'Nascondi hovercard (il popup che appare quando si passa con il mouse sopra il nome di una persona).',
		'ConfHideLikeStories' : 'Nascondi i post riguardanti i "Mi piace".',
		'ConfHideLinkStories' : 'Nascondi i post riguardanti link.',
		'ConfHideNoteStories' : 'Nascondi i post riguardanti le note.',
		'ConfHidePhotoStories' : 'Nascondi i post riguardanti foto.',
		'ConfHidePlaceStories' : 'Nascondi i post riguardanti i luoghi.',
		'ConfHideProfilePicStories' : 'Nascondi i post riguardanti foto del profilo.',
		'ConfHideRead' : 'Nascondi gli elementi del live feed che sono stati segnati come giÃ  letti.',
		'ConfHideRelationshipStories' : 'Nascondi le notizie riguardanti relazioni.',
		'ConfHideStatusStories' : 'Nascondi gli aggiornamenti di stato.',
		'ConfHideVideoStories' : 'Nascondi i post di video.',
		'ConfHideWallStories' : 'Nascondi le attivitÃ  delle bacheche.',
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
		'ConfHomeStretch' : 'Allarga la homepage affinchÃ© si adatti alla larghezza della finestra del browser.',
		'ConfHomeStretchComments' : 'Allarga la zona dei commenti sulla homepage.',
		'ConfiCalendar' : 'Aggiungi link per scaricare un file di <a href="http://it.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> con tutti i compleanni.',
		'ConfImport' : 'Successivamente, per importare le tue impostazioni, sovrascrivi il testo sottostante con quello che hai salvato precedentemente e clicca "Importa".',
		'ConfInboxCountInTitle' : 'Mostra il numero di nuovi messaggi nel titolo della pagina.',
		'ConfLogoutLink' : 'Aggiungi un link per il logout alla barra superiore',
		'ConfNotificationCountInTitle' : 'Mostra il numero di notifiche nella barra del titolo.',
		'ConfNewTabSearch' : 'Fai in modo che i risultati delle ricerche si aprano in una nuova scheda quando si preme CTRL + Invio per cercare.',
		'ConfPageTitle' : 'Rimuovi "Facebook |" dal titolo di ciascuna pagina.',
		'ConfPhotoPopup' : 'Mostra in un popup, al passaggio del mouse, una versione piÃ¹ grande delle foto.',
		'ConfPopupAutoClose' : 'Chiudi i popup automaticamente.',
		'ConfPopupSmartAutoClose' : 'Non far chiudere i popup se il mouse Ã¨ sopra di essi.',
		'ConfPopupPosition' : 'Posizione del popup',
		'ConfPopupWhileTagging' : 'Mostra i popup delle immagini anche sui tag.',
		'ConfProcessInterval' : 'Intervallo dopo il qualeprocessare la pagina, in millisecondi (default=1000):',
		'ConfProfileLink' : 'Mostra il link "Profilo" nella barra superiore.',
		'ConfProfilePicPopup' : 'Mostra in un popup, al passaggio del mouse, una versione piÃ¹ grande delle immagini dei profili.',
		'ConfProtocolLinks' : 'Converti gli ID di messaggistica nei profili in link che iniziano una conversazione. (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Riguardo di -foREVer- Script',
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
		'ConfShortcutList' : '<b>Scorciatoie da tasiera</b> (prestare attenzione a maiuscole/minuscole):<br /><br /><i>In ogni pagina</i><br /> <b>A</b> - Album/foto<br /> <b>B</b> - Apri la lista degli amici online<br /> <b>C</b> - Impostazioni di -foREVer- Script<br /> <b>D</b> - Compleanni<br /> <b>E</b> - Eventi<br /> <b>F</b> - Amici<br /> <b>H</b> - Home page<br /> <b>I</b> - Posta in arrivo<br /> <b>K</b> - Aggiungi segnalibro<br /> <b>L</b> - Seleziona il link per effettuare il logout (poi premi Invio per effettuare il logout)<br /> <b>N</b> - Notifiche<br /> <b>P</b> - Il tuo profilo<br /> <b>R</b> - Richieste<br /> <b>S</b> - Seleziona il campo di ricerca<br /> <b>T</b> - Traduci il testo selezionato<br /> <b>?</b> - Mostra le informazioni di debug di -foREVer- Script<br /> <b><escape></b> - Chiudi i pop-up creati da -foREVer- Script<br /><br /><i>Dalla home page (filtri)</i>:<br /> <b>a</b> - Pagine<br /> <b>f</b> - Notizie in tempo reale<br /> <b>g</b> - Gruppi<br /> <b>l</b> - Link<br /> <b>n</b> - Notizie<br /> <b>p</b> - Foto<br /> <b>s</b> o <b>u</b> - Aggiornamenti di stato<br /> <b>t</b> - Note<br /> <b>v</b> - Video<br /><br /><i>Dai profili</i>:<br /> <b>i</b> - Info<br /> <b>p</b> - Foto<br /> <b>w</b> - Bacheca<br /> <b>x</b> - Riquadri<br /><br /><i>Dalle pagine con paginazione (precedente, successivo, etc)</i><br /> <b><freccia sinistra></b> - Precedente<br /> <b><freccia destra></b> - Successivo<br /> <b><shift> + <freccia sinistra></b> - Primo (Quando disponibile)<br /> <b><shift> + <freccia destra></b> - Ultimo (Quando disponibile)<br /><br /><i>Mentre si guardano album/foto:</i><br /> <b>a</b> - Carica tutte le anteprime (quando disponibile)<br /> <b>b</b> - Mostra immagini grandi<br /> <b>c</b> - Mostra i commenti<br /> <b>k</b> - Torna all\' album<br /> <b>m</b> - Foto con me<br /><br /><i>Mentre si guardano album recenti e foto appena caricate/taggate:</i><br /> <b>a</b> o  <b>r</b> - Album recenti<br /> <b>m</b> o  <b>u</b> - Upload via mobile<br /> <b>o</b> - Foto con me<br /> <b>p</b> - Le mie foto<br /> <b>t</b> o  <b>f</b> - Amici taggati',
		'ConfShortcuts' : 'Attiva le scorciatoie da tastiera.',
		'ConfSign' : 'Mostra il segno zodiacale nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfTopBarFixed' : 'Mantieni fissa la posizione della barra superiore.',
		'ConfTopBarHoverOpacity' : 'Al passaggio del mouse',
		'ConfTopBarOpacity' : 'Trasparenza della barra superiore',
		'ConfUpdates' : 'Controlla ogni giorno Userscripts.org per eventuali update, oppure <a href="#" id="fbfUpdateLink" onclick="return false;">controlla adesso!</a>.',
		'DownloadVideo' : 'Scarica il video.',
		'ExportICalendarFile' : 'Esporta file di iCalendar.',
		'ExportICalendarFileWarning' : '(Questo impiegherÃ  un po\' se hai molti amici!)',
		'Facebook-foREVer-Conflict' : '-foREVer- Script ha cambiato nome in -foREVer- Script. A causa del cambiamento dovrai disinstallare manualmente -foREVer- Script dal tuo browser, o i due script andranno in conflitto. Se non sei sicuro di come disinstallare un userscript <a %s>clicca qui per le istruzioni</a>.',
		'fullAlbumLoaded' : 'l\'album completo Ã¨ stato caricato.',
		'Import' : 'Importa',
		'ImportConfirm' : 'Sei sicuro di voler importare queste impostazioni?\nLe tue impostazioni attuali saranno sovrascritte.',
		'ImportFailure' : 'Un errore Ã¨ accaduto durante l\'importazione delle impostazioni.',
		'ImportSuccess' : 'Importazione completata. Vuoi ricaricare la pagina?',
		'Left' : 'Sinistra',
		'LoadingAllPhotos' : 'Sto caricando tutte le foto...',
		'loadingFullAlbum' : 'Sto caricando l\'album completo...',
		'LoadingPic' : 'Sto caricando l\'immagine...',
		'LoadPhotosWarning' : 'Il caricamento di tutte le immagini puÃ² richiedere qualche minuto.',
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
		'UpdateAvailable1' : 'Ãˆ disponibile un update per -foREVer- Script.',
		'UpdateAvailable2' : 'Vuoi scaricare l\'aggiornamento adesso?',
		'UpdateHomepage' : 'Visita la Homepage',
		'UpdateInstall' : 'Installa ora.',
		'UpdateTomorrow' : 'Ricordamelo domani.',
		'yearsOld' : '%s anni.'
	},

	// German - Contributed by Constantin GroÃŸ (20090830)
	de : {
		'_language' : 'German',
		'AddToCalendar' : 'Zu Kalender hinzugÃ¼gen',
		'AddToGoogleCalendar' : 'Zu Google Kalender hinzufÃ¼gen',
		'all' : 'alle',
		'All' : 'Alle',
		'AllPhotosLoaded' : 'Alle Fotos geladen',
		'Automatic' : 'Automatisch',
		'Birthday' : '%ss Geburtstag',
		'CreatingFile' : 'Erstelle Datei',
		'Close' : 'SchlieÃŸen',
		'ConfigureFacebook-foREVer-' : '-foREVer- Script konfigurieren',
		'ConfigureInstructions' : 'Alle Ã„nderungen werden sofort gespeichert, aber einige Ã„nderungen kÃ¶nnen in bereits offenen Tabs nicht angewendet werden.',
		'ConfAge' : 'Alter von Personen im Profil anzeigen (wenn das volle Geburtsdatum angegeben wurde).',
		'ConfAutoBigAlbumPictures' : 'Automatisch grÃ¶ÃŸere Albenbilder beim Ã¶ffnen der Seite anzeigen.',
		'ConfAutoLoadFullAlbum' : 'Vorschaubilder fÃ¼r alle Bilder eines Albums automatisch laden.',
		'ConfAutoLoadTaggedPhotos' : 'Vorschaubilder fÃ¼r alle getaggten Bilder automatisch laden (Fotos-Tab auf der Profilseite).',
		'ConfBigAlbumPictures' : 'Link auf Albumseiten hinzÃ¼fÃ¼gen, Ã¼ber den grÃ¶ÃŸere Versionen aller Bilder angezeigt werden kÃ¶nnen.',
		'ConfBottomBarHoverOpacity' : 'Bei Mouse-Over',
		'ConfBottomBarOpacity' : 'Transparenz der unteren MenÃ¼leiste',
		'ConfCalendarBirthDate' : 'Geburtstage in Event-Details anzeigen.',
		'ConfCalendarFullName' : 'VollstÃ¤ndigen Namen bei Geburtstagen anzeigen (statt nur den Vornamen).',
		'ConfChatDifferentiate' : 'Fett- und Kursiv-Formatierung zur Unterscheidung zwischen online- und offline-Freunden verwenden.',
		'ConfChatHideIdle' : 'Freunde, die offline sind verstecken.',
		'ConfDelayPopupPics' : '0,5 Sekunden warten, bevor die Popup-Bilder gezeigt werden.',
		'ConfDownloadVideo' : 'Link zum Herunterladen von Videos hinzufÃ¼gen. (Es wird evtl. ein <a href="http://de.wikipedia.org/wiki/Flash_Video#Abspielen_im_Videoplayer" target="_blank">FLV-Player</a> benÃ¶tigt)',
		'ConfErrorPageReload' : 'Fehlerseiten von Applikationen automatisch nach 5 Sekunden neu laden.',
		'ConfExternalPopup' : 'Externe Bilder in OriginalgrÃ¶ÃŸe im Popup anzeigen. <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : 'Sprache fÃ¼r -foREVer- Script',
		'ConfGoogleApps' : 'Google Kalender Links kompatibel zu Google Apps erstellen.',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Links hinzufÃ¼gen, um Geburtstage und Veranstaltungen zu <a href="http://de.wikipedia.org/wiki/Google_Kalender" target="_blank">Google Kalender</a> hinzuzufÃ¼gen.',
		'ConfGoogleLanguage' : 'Sprache fÃ¼r <a href="http://translate.google.de/#" target="_blank">Google Ãœbersetzer</a>',
		'ConfHomeFindFriends' : '"Mit Freunden in Verbindung treten" anzeigen.',
		'ConfHomeLeftAlign' : 'Startseiteninhalte linksorientiert ausrichten.',
		'ConfHomePeopleYouMayKnow' : '"VorschlÃ¤ge" anzeigen.',
		'ConfHomePokes' : '"Anstupser" anzeigen.',
		'ConfHomeRightColumn' : 'Rechte Spalte anzeigen.',
		'ConfiCalendar' : 'Link zum herunterladen einer <a href="http://de.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-Datei mit allen Geburtstagen hinzufÃ¼gen.',
		'ConfShortcutList' : '<b>TastenkÃ¼rzel</b> (GroÃŸ-/Kleinschreibung beachten!):<br /><br /><i>Auf jeder Seite:</i><br />&nbsp;<b>A</b> - Alben/Fotos<br />&nbsp;<b>B</b> - Chatliste ein-/ausblenden<br />&nbsp;<b>C</b> - -foREVer- Script Einstellungen<br />&nbsp;<b>F</b> - Freunde<br />&nbsp;<b>H</b> - Startseite<br />&nbsp;<b>I</b> - Postfach<br />&nbsp;<b>L</b> - Reagieren von -foREVer- Script auf SeitenÃ¤nderung ein-/ausschalten<br />&nbsp;<b>N</b> - Benachrichtigungen<br />&nbsp;<b>P</b> - Mein Profil<br />&nbsp;<b>T</b> - Markierten Text Ã¼bersetzen<br />&nbsp;<b>&lt;escape&gt;</b> - Von -foREVer- Script erstellte Popups schlieÃŸen<br /><br /><i>Auf der Startseite</i>:<br />&nbsp;<b>f</b> oder <b>l</b> - Live-Feed<br />&nbsp;<b>i</b> - Posted items<br />&nbsp;<b>n</b> - News-Feed<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>s</b> oder <b>u</b> - Status-Updates<br /><br /><i>Auf Profilseiten</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Pinnwand<br />&nbsp;<b>x</b> - Felder<br /><br /><i>Auf Seiten mit Seitenzahlen (zurÃ¼ck, vor, etc)</i><br />&nbsp;<b>&lt;Pfeil-nach-Links&gt;</b> - ZurÃ¼ck<br />&nbsp;<b>&lt;Pfeil-nach-Rechts&gt;</b> - Vor<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Links&gt;</b> - Erste (wenn verfÃ¼gbar)<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Rechts&gt;</b> - Letzte (wenn verfÃ¼gbar)<br /><br /><i>Bei der Anzeige von Alben & Fotos:</i><br />&nbsp;<b>a</b> - Alle Vorschaubilder laden (wenn verfÃ¼gbar)<br />&nbsp;<b>b</b> - GroÃŸe Bilder anzeigen<br />&nbsp;<b>c</b> - Kommentare anzeigen<br />&nbsp;<b>k</b> - ZurÃ¼ck zum Album<br />&nbsp;<b>m</b> - Fotos der Person und mir<br /><br /><i>Bei neuen Alben und getaggten/hochgeladenen Fotos:</i><br />&nbsp;<b>a</b> oder &nbsp;<b>r</b> - Neue Alben<br />&nbsp;<b>m</b> oder &nbsp;<b>u</b> - Mobile Uploads<br />&nbsp;<b>o</b> - Fotos von mir<br />&nbsp;<b>p</b> - Meine Fotos<br />&nbsp;<b>t</b> oder &nbsp;<b>f</b> - Getaggte Freunde',
		'ConfNewTabSearch' : 'Suchergebnisse in einem neuen Tab/Fenster Ã¶ffnen, wenn fÃ¼r die Suche STRG + Enter gedrÃ¼ckt wurde.',
		'ConfPageTitle' : '"Facebook |" Ã¼berall aus dem Seitentitel entfernen.',
		'ConfPhotoPopup' : 'GrÃ¶ÃŸere Versionen von Fotos im Popup anzeigen, wenn sie mit der Maus berÃ¼hrt werden.',
		'ConfPopupAutoClose' : 'Bilder-Popup automatisch schlieÃŸen.',
		'ConfPopupPosition' : 'Position des Bilder-Popups',
		'ConfProfilePicPopup' : 'GrÃ¶ÃŸere Profilbilder im Popup anzeigen, wenn sie mit der Maus berÃ¼hrt werden',
		'ConfProtocolLinks' : 'Messenger-IDs der Profile in Links umwandeln, Ã¼ber die eine Kommunikation gestartet werden kann (Google Talk, Windows Live etc).',
		'ConfSecureLinks' : 'HTTPS-Verbindung fÃ¼r alle Facebook-Links verwenden.',
		'ConfShortcuts' : 'TastenkÃ¼rzel aktivieren. (<a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">Liste ansehen</a>)',
		'ConfSign' : 'Sternzeichen im Profil anzeigen (wenn das volle Geburtsdatum angegeben wurde).',
		'ConfTopBarFixed' : 'Obere MenÃ¼leiste auch beim Scrollen anzeigen.',
		'ConfTopBarHoverOpacity' : 'Bei Mouse-Over',
		'ConfTopBarOpacity' : 'Transparenz der oberen MenÃ¼leiste',
		'ConfUpdates' : 'UÃœberprÃ¼fen Sie Userscripts.org tÃ¤glich auf Updates fÃ¼r -foREVer- Script. <a href="#" id="fbfUpdateLink" onclick="return false;">Jetzt Ã¼berprÃ¼fen</a>.',
		'DownloadVideo' : 'Video herunterladen',
		'ExportICalendarFile' : 'iCalendar-Export',
		'ExportICalendarFileWarning' : '(kann bei einer groÃŸen Zahl an Freunden eine Weile dauern)',
		'fullAlbumLoaded' : 'Album vollstÃ¤ndig geladen',
		'Left' : 'Links',
		'ListeningRestarted' : '-foREVer- Script reagiert wieder auf Ã„nderungen.',
		'ListeningStopped' : '-foREVer- Script reagiert nicht auf Ã„nderungen.\nL (SHIFT + l) drÃ¼cken, um die Reaktion wieder zu aktvieren.',
		'LoadingAllPhotos' : 'Lade alle Fotos...',
		'loadingFullAlbum' : 'Lade komplettes Album...',
		'LoadingPic' : 'Lade Bild...',
		'LoadPhotosWarning' : 'Das Laden aller Bilder kann lÃ¤ngere Zeit dauern',
		'Months' : new Array('Januar','Februar','MÃ¤rz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'),
		'ProtocolSkype' : '%s per Skype anrufen',
		'ProtocolMSN' : 'Mit %s per Windows Live chatten',
		'ProtocolYahoo' : 'Mit %s per Yahoo Messenger chatten',
		'ProtocolGoogle' : 'Mit %s per Google Talk chatten',
		'ReloadErrorPage' : 'Klicken, um es erneut zu versuchen, oder 5 Sekunden warten',
		'Remove' : 'Entfernen',
		'Right' : 'Rechts',
		'ShowBigPictures' : 'GroÃŸe Bilder anzeigen',
		'Signs' : new Array('Steinbock','Wassermann','Fische','Widder','Stier','Zwillinge','Krebs','LÃ¶we','Jungfrau','Waage','Skorpion','SchÃ¼tze'),
		'today' : 'heute',
		'UpdateAvailable1' : 'Es gibt ein Update fÃ¼r -foREVer- Script',
		'UpdateAvailable2' : 'Update jetzt herunterladen?',
		'UpdateHomepage' : 'Zur Webseite',
		'UpdateInstall' : 'Jetzt installieren',
		'UpdateTomorrow' : 'Morgen erinnern',
		'yearsOld' : '%s Jahre alt'
	},

	// Bulgarian - Contributed by Svetlozar Mladenoff (20090830)
	bg : {
		'_language' : 'Bulgarian',
		'AddToCalendar' : 'Ð”Ð¾Ð±Ð°Ð²ÑÐ½Ðµ ÐºÑŠÐ¼ ÐšÐ°Ð»ÐµÐ½Ð´Ð°Ñ€',
		'AddToGoogleCalendar' : 'Ð”Ð¾Ð±Ð°Ð²ÑÐ½Ðµ ÐºÑŠÐ¼ Google Calendar',
		'all' : 'Ð²ÑÐ¸Ñ‡ÐºÐ¸',
		'All' : 'Ð’ÑÐ¸Ñ‡ÐºÐ¸',
		'AllPhotosLoaded' : 'Ð’ÑÐ¸Ñ‡ÐºÐ¸ ÑÐ½Ð¸Ð¼ÐºÐ¸ ÑÐ° Ð·Ð°Ñ€ÐµÐ´ÐµÐ½Ð¸',
		'Automatic' : 'ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡Ð½Ð¾',
		'Birthday' : 'Ð Ð¾Ð¶Ð´ÐµÐ½Ð¸Ñ Ð´ÐµÐ½ Ð½Ð° %s',
		'CreatingFile' : 'Ð¡ÑŠÐ·Ð´Ð°Ð²Ð°Ð½Ðµ Ð½Ð° Ñ„Ð°Ð¹Ð»',
		'Close' : 'Ð—Ð°Ñ‚Ð²Ð°Ñ€ÑÐ½Ðµ',
		'ConfigureFacebook-foREVer-' : 'ÐšÐ¾Ð½Ñ„Ð¸Ð³ÑƒÑ€Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð° -foREVer- Script',
		'ConfigureInstructions' : 'Ð’ÑÐ¸Ñ‡ÐºÐ¸ Ð¿Ñ€Ð¾Ð¼ÐµÐ½Ð¸ ÑÐµ Ð·Ð°Ð¿Ð°Ð¼ÐµÑ‚ÑÐ²Ð°Ñ‚ Ð²ÐµÐ´Ð½Ð°Ð³Ð°, Ð½Ð¾ Ð½ÑÐºÐ¾Ð¸ Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð½Ðµ Ð¿Ñ€Ð¸Ð´Ð¾Ð±Ð¸ÑÑ‚ ÐµÑ„ÐµÐºÑ‚ Ð¿Ñ€Ð¸ Ð²ÐµÑ‡Ðµ Ð¾Ñ‚Ð²Ð¾Ñ€ÐµÐ½Ð¸ Ñ‚Ð°Ð±Ð¾Ð²Ðµ.',
		'ConfAge' : 'ÐŸÐ¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð²ÑŠÐ·Ñ€Ð°ÑÑ‚Ñ‚Ð° (Ð°ÐºÐ¾ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»Ð¸Ñ‚Ðµ ÑÐ° Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð¸Ð»Ð¸ Ð¿ÑŠÐ»Ð½Ð° Ñ€Ð¾Ð¶Ð´ÐµÐ½Ð° Ð´Ð°Ñ‚Ð°).',
		'ConfAutoBigAlbumPictures' : 'ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡Ð½Ð¾ Ð¿Ð¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð¿Ð¾-Ð³Ð¾Ð»ÐµÐ¼Ð¸ ÑÐ½Ð¸Ð¼ÐºÐ¸ Ð¾Ñ‚ Ð°Ð»Ð±ÑƒÐ¼Ð¸Ñ‚Ðµ, ÐºÐ¾Ð³Ð°Ñ‚Ð¾ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°Ñ‚Ð° ÑÐµ Ð·Ð°Ñ€ÐµÐ´Ð¸.',
		'ConfAutoLoadFullAlbum' : 'ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡Ð½Ð¾ Ð·Ð°Ñ€ÐµÐ¶Ð´Ð°Ð½Ðµ Ð½Ð° Ð¿Ñ€ÐµÐ²ÑŽÑ‚Ð° Ð·Ð° Ð²ÑÐ¸Ñ‡ÐºÐ¸ ÐºÐ°Ñ€Ñ‚Ð¸Ð½Ð¸ Ð² Ð°Ð»Ð±ÑƒÐ¼, ÑÑŠÐ±Ð¸Ñ€Ð°Ñ‰Ð¸ ÑÐµ Ð½Ð° ÐµÐ´Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°.',
		'ConfAutoLoadTaggedPhotos' : 'ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡Ð½Ð¾ Ð·Ð°Ñ€ÐµÐ¶Ð´Ð°Ð½Ðµ Ð½Ð° Ð¿Ñ€ÐµÐ²ÑŽÑ‚Ð° Ð½Ð° Ð²ÑÐ¸Ñ‡ÐºÐ¸ Ñ‚Ð°Ð³Ð½Ð°Ñ‚Ð¸ ÑÐ½Ð¸Ð¼ÐºÐ¸, ÑÑŠÐ±Ð¸Ñ€Ð°Ñ‰Ð¸ ÑÐµ Ð½Ð° ÐµÐ´Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° (Ñ‚Ð°Ð±ÑŠÑ‚ Ð¡Ð½Ð¸Ð¼ÐºÐ¸ Ð½Ð° Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð°).',
		'ConfBigAlbumPictures' : 'Ð”Ð¾Ð±Ð°Ð²ÑÐ½Ðµ Ð½Ð° Ð²Ñ€ÑŠÐ·ÐºÐ° Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°Ñ‚Ð° Ñ Ð°Ð»Ð±ÑƒÐ¼Ð¸ Ð·Ð° Ð¿Ð¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° ÑƒÐ²ÐµÐ»Ð¸Ñ‡ÐµÐ½Ð¸ Ð²ÐµÑ€ÑÐ¸Ð¸ Ð½Ð° Ð²ÑÐ¸Ñ‡ÐºÐ¸ ÑÐ½Ð¸Ð¼ÐºÐ¸, ÑÑŠÑ‰ÐµÑÑ‚Ð²ÑƒÐ²Ð°Ñ‰Ð¸ Ð½Ð° Ñ‚Ð°Ð·Ð¸ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°.',
		'ConfBottomBarHoverOpacity' : 'ÐŸÑ€Ð¸ ÐºÑƒÑ€ÑÐ¾Ñ€ Ð¾Ñ‚Ð³Ð¾Ñ€Ðµ',
		'ConfBottomBarOpacity' : 'ÐŸÑ€Ð¾Ð·Ñ€Ð°Ñ‡Ð½Ð¾ÑÑ‚ Ð½Ð° Ð´Ð¾Ð»Ð½Ð¾Ñ‚Ð¾ Ð¼ÐµÐ½ÑŽ',
		'ConfCalendarBirthDate' : 'Ð’ÐºÐ»ÑŽÑ‡Ð²Ð°Ð½Ðµ Ð½Ð° Ñ€Ð¾Ð¶Ð´ÐµÐ½Ð°Ñ‚Ð° Ð´Ð°Ñ‚Ð° Ð½Ð° Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¸Ñ‚ÐµÐ»Ñ Ð² Ð´ÐµÑ‚Ð°Ð¹Ð»Ð¸Ñ‚Ðµ Ð½Ð° ÑÑŠÐ±Ð¸Ñ‚Ð¸ÐµÑ‚Ð¾.',
		'ConfCalendarFullName' : 'Ð˜Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ñ‚Ñ€Ð¸Ñ‚Ðµ Ð¸Ð¼ÐµÐ½Ð° Ð½Ð° Ñ‡Ð¾Ð²ÐµÐºÐ° ÐºÐ°Ñ‚Ð¾ Ð·Ð°Ð³Ð»Ð°Ð²Ð¸Ðµ Ð·Ð° Ñ€Ð¾Ð¶Ð´ÐµÐ½Ð¸Ñ‚Ðµ Ð´Ð½Ð¸ (Ð² Ð·Ð°Ð¼ÑÐ½Ð° Ð½Ð° ÑÐ°Ð¼Ð¾ Ð¿ÑŠÑ€Ð²Ð¾Ñ‚Ð¾ Ð¸Ð¼Ðµ).',
		'ConfChatDifferentiate' : 'Ð˜Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ð½Ðµ Ð½Ð° ÑƒÐ´ÐµÐ±ÐµÐ»ÐµÐ½ Ð¸ Ð½Ð°ÐºÐ»Ð¾Ð½ÐµÐ½ ÑˆÑ€Ð¸Ñ„Ñ‚ Ð·Ð° Ñ€Ð°Ð·Ð»Ð¸Ñ‡Ð°Ð²Ð°Ð½Ðµ Ð½Ð° Ð¿Ñ€Ð¸ÑÑ‚ÐµÐ»Ð¸ Ð½Ð° Ð»Ð¸Ð½Ð¸Ñ Ð¸ Ð¾Ñ„Ð»Ð°Ð¹Ð½.',
		'ConfChatHideIdle' : 'Ð¡ÐºÑ€Ð¸Ð²Ð°Ð½Ðµ Ð½Ð° Ð¾Ñ„Ð»Ð°Ð¹Ð½-Ð¿Ñ€Ð¸ÑÑ‚ÐµÐ»Ð¸Ñ‚Ðµ.',
		'ConfDelayPopupPics' : 'Ð˜Ð·Ñ‡Ð°ÐºÐ²Ð°Ð½Ðµ Ð¾Ñ‚ Ð¿Ð¾Ð»Ð¾Ð²Ð¸Ð½ ÑÐµÐºÑƒÐ½Ð´Ð° Ð¿Ñ€ÐµÐ´Ð¸ Ð¿Ð¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð¿Ñ€ÐµÐ²ÑŽ Ð½Ð° ÑÐ½Ð¸Ð¼ÐºÐ°.',
		'ConfDownloadVideo' : 'Ð”Ð¾Ð±Ð°Ð²ÑÐ½Ðµ Ð½Ð° Ð²Ñ€ÑŠÐ·ÐºÐ° Ð·Ð° Ñ‚ÐµÐ³Ð»ÐµÐ½Ðµ Ð¾Ñ‚ Ð²Ð¸Ð´ÐµÐ¾ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸Ñ‚Ðµ. (ÐœÐ¾Ð¶Ðµ Ð´Ð° Ð²Ð¸ Ñ‚Ñ€ÑÐ±Ð²Ð° <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV Ð¿Ð»ÐµÐ¹ÑŠÑ€</a>)',
		'ConfErrorPageReload' : 'ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡Ð½Ð¾ Ð¿Ñ€ÐµÐ·Ð°Ñ€ÐµÐ¶Ð´Ð°Ð½Ðµ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸Ñ‚Ðµ Ñ Ð³Ñ€ÐµÑˆÐºÐ¸ Ð¾Ñ‚ Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ ÑÐ»ÐµÐ´ 5 ÑÐµÐºÑƒÐ½Ð´Ð¸.',
		'ConfExternalPopup' : 'ÐŸÑŠÐ»ÐµÐ½ Ñ€Ð°Ð·Ð¼ÐµÑ€ Ð½Ð° Ð²ÑŠÐ½ÑˆÐ½Ð¸Ñ‚Ðµ ÐºÐ°Ñ€Ñ‚Ð¸Ð½ÐºÐ¸ Ð¿Ñ€Ð¸ Ð¿Ñ€ÐµÐ²ÑŽ. <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : 'Ð•Ð·Ð¸Ðº Ð·Ð° -foREVer- Script',
		'ConfGoogleApps' : 'Ð¡ÑŠÐ·Ð´Ð°Ð²Ð°Ð½Ðµ Ð½Ð° Google Calendar Ð²Ñ€ÑŠÐ·ÐºÐ¸, ÑÑŠÐ²Ð¼ÐµÑÑ‚Ð¸Ð¼Ð¸ Ñ Google Apps.',
		'ConfGoogleAppsDomain' : 'Ð”Ð¾Ð¼ÐµÐ¹Ð½',
		'ConfGoogleCalendar' : 'Ð”Ð¾Ð±Ð°Ð²ÑÐ½Ðµ Ð½Ð° Ð²Ñ€ÑŠÐ·ÐºÐ¸ Ð·Ð° Ð¿Ñ€Ð¸Ð±Ð°Ð²ÑÐ½Ðµ Ð½Ð° Ñ€Ð¾Ð¶Ð´ÐµÐ½Ð¸ Ð´Ð½Ð¸ Ð¸ ÑÑŠÐ±Ð¸Ñ‚Ð¸Ñ Ð² <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Ð•Ð·Ð¸Ðº Ð·Ð° <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHomeFindFriends' : 'ÐŸÐ¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð¡Ð²ÑŠÑ€Ð¶ÐµÑ‚Ðµ ÑÐµ Ñ Ð¿Ñ€Ð¸ÑÑ‚ÐµÐ»Ð¸ ÑÐµÐºÑ†Ð¸ÑÑ‚Ð°.',
		'ConfHomeLeftAlign' : 'Ð›ÑÐ²Ð¾ Ð¿Ð¾Ð´Ñ€Ð°Ð²Ð½ÑÐ²Ð°Ð½Ðµ Ð½Ð° ÑÑŠÐ´ÑŠÑ€Ð¶Ð°Ð½Ð¸ÐµÑ‚Ð¾ Ð½Ð° Ð³Ð»Ð°Ð²Ð½Ð°Ñ‚Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°.',
		'ConfHomePeopleYouMayKnow' : 'ÐŸÐ¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° ÑÐµÐºÑ†Ð¸Ñ ÐŸÑ€ÐµÐ´Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ.',
		'ConfHomePokes' : 'ÐŸÐ¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° ÑÐµÐºÑ†Ð¸ÑÑ‚Ð° Ð·Ð° Ð¡Ñ€ÑŠÑ‡ÐºÐ²Ð°Ð½Ð¸Ñ.',
		'ConfHomeRightColumn' : 'ÐŸÐ¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð´ÑÑÐ½Ð°Ñ‚Ð° ÐºÐ¾Ð»Ð¾Ð½Ð°.',
		'ConfiCalendar' : 'Ð”Ð¾Ð±Ð°Ð²ÑÐ½Ðµ Ð½Ð° Ð²Ñ€ÑŠÐ·ÐºÐ¸ Ð·Ð° Ð¸Ð·Ñ‚ÐµÐ³Ð»ÑÐ½Ðµ Ð½Ð° <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-Ñ„Ð°Ð¹Ð» Ñ Ð²ÑÐ¸Ñ‡ÐºÐ¸ Ñ€Ð¾Ð¶Ð´ÐµÐ½Ð¸ Ð´Ð½Ð¸.',
		'ConfShortcutList' : '<b>Ð‘ÑŠÑ€Ð·Ð¸ Ð±ÑƒÑ‚Ð¾Ð½Ð¸</b> (Ð³Ð¾Ð»ÐµÐ¼Ð¸/Ð¼Ð°Ð»ÐºÐ¸ Ñ‡ÑƒÐ²ÑÑ‚Ð²Ð¸Ñ‚ÐµÐ»Ð½Ð¸):<br /><br /><i>ÐžÑ‚ ÐºÐ¾Ñ Ð´Ð° Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°:</i><br />&nbsp;<b>A</b> - ÐÐ»Ð±ÑƒÐ¼Ð¸/ÑÐ½Ð¸Ð¼ÐºÐ¸<br />&nbsp;<b>B</b> - ÐŸÑ€ÐµÐ²ÐºÐ»ÑŽÑ‡Ð²Ð°Ð½Ðµ Ð½Ð° ÑÐ¿Ð¸ÑÑŠÐº ÐŸÑ€Ð¸ÑÑ‚ÐµÐ»Ð¸ Ð½Ð° Ð»Ð¸Ð½Ð¸Ñ<br />&nbsp;<b>C</b> - ÐšÐ¾Ð½Ñ„Ð¸Ð³ÑƒÑ€ÑƒÑ€Ð°Ð½Ðµ Ð½Ð° -foREVer- Script<br />&nbsp;<b>F</b> - ÐŸÑ€Ð¸ÑÑ‚ÐµÐ»Ð¸<br />&nbsp;<b>H</b> - Ð“Ð»Ð°Ð²Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°<br />&nbsp;<b>I</b> - Ð’Ñ…Ð¾Ð´ÑÑ‰Ð° ÐºÑƒÑ‚Ð¸Ñ<br />&nbsp;<b>L</b> - Ð Ð°Ð·Ñ€ÐµÑˆÐ°Ð²Ð°Ð½Ðµ/Ð—Ð°Ð±Ñ€Ð°Ð½ÑÐ²Ð°Ð½Ðµ Ð½Ð° -foREVer- Script Ð´Ð° Ð¿Ñ€Ð¾Ð²ÐµÑ€ÑÐ²Ð° Ð·Ð° Ð¿Ñ€Ð¾Ð¼ÐµÐ½Ð¸ Ð¿Ð¾ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸Ñ‚Ðµ<br />&nbsp;<b>N</b> - Ð˜Ð·Ð²ÐµÑÑ‚Ð¸Ñ<br />&nbsp;<b>P</b> - ÐŸÑ€Ð¾Ñ„Ð¸Ð»<br />&nbsp;<b>T</b> - ÐŸÑ€ÐµÐ²Ð¾Ð´ Ð½Ð° Ð¼Ð°Ñ€ÐºÐ¸Ñ€Ð°Ð½Ð¸Ñ Ñ‚ÐµÐºÑÑ‚<br />&nbsp;<b>&lt;escape&gt;</b> - Ð—Ð°Ñ‚Ð²Ð°Ñ€ÑÐ½Ðµ Ð½Ð° Ð¸Ð·ÑÐºÐ°Ñ‡Ð°Ñ‰Ð¸ Ð¿Ñ€Ð¾Ð·Ð¾Ñ€Ñ†Ð¸, Ð¾Ñ‚Ð²Ð¾Ñ€ÐµÐ½Ð¸ Ð¾Ñ‚ -foREVer- Script<br /><br /><i>ÐÐ° Ð·Ð°Ð³Ð»Ð°Ð²Ð½Ð°Ñ‚Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°</i>:<br />&nbsp;<b>f</b> or <b>l</b> - ÐÐ¾Ð²Ð¸Ð½Ð¸ Ð½Ð° Ð¶Ð¸Ð²Ð¾<br />&nbsp;<b>i</b> - ÐŸÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸Ð¸<br />&nbsp;<b>n</b> - ÐÐ¾Ð²Ð¸Ð½Ð¸<br />&nbsp;<b>p</b> - Ð¡Ð½Ð¸Ð¼ÐºÐ¸<br />&nbsp;<b>s</b> Ð¸Ð»Ð¸ <b>u</b> - ÐŸÑ€Ð¾Ð¼ÐµÐ½Ð¸ Ð² ÑÑ‚Ð°Ñ‚ÑƒÑÐ°<br /><br /><i>ÐÐ° Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð¸Ñ‚Ðµ</i>:<br />&nbsp;<b>i</b> - Ð˜Ð½Ñ„Ð¾<br />&nbsp;<b>p</b> - Ð¡Ð½Ð¸Ð¼ÐºÐ¸<br />&nbsp;<b>w</b> - Ð¡Ñ‚ÐµÐ½Ð°<br />&nbsp;<b>x</b> - ÐšÑƒÑ‚Ð¸Ð¸<br /><br /><i>ÐÐ° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸ Ñ Ð½Ð°Ð²Ð¸Ð³Ð°Ñ†Ð¸Ñ (Ð¿Ñ€ÐµÐ´Ð¸ÑˆÐ½Ð°, ÑÐ»ÐµÐ´Ð²Ð°Ñ‰Ð° Ð¸ Ñ‚.Ð½.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - ÐŸÑ€ÐµÐ´Ð¸ÑˆÐ½Ð°<br />&nbsp;<b>&lt;right arrow&gt;</b> - Ð¡Ð»ÐµÐ´Ð²Ð°Ñ‰Ð°<br />&nbsp;<b>&lt;Shift&gt; + &lt;left arrow&gt;</b> - ÐŸÑŠÑ€Ð²Ð° (ÐºÐ¾Ð³Ð°Ñ‚Ð¾ Ðµ Ð²ÑŠÐ·Ð¼Ð¾Ð¶Ð½Ð¾)<br />&nbsp;<b>&lt;Shift&gt; + &lt;right arrow&gt;</b> - ÐŸÐ¾ÑÐ»ÐµÐ´Ð½Ð° (ÐºÐ¾Ð³Ð°Ñ‚Ð¾ Ðµ Ð²ÑŠÐ·Ð¼Ð¾Ð¶Ð½Ð¾)<br /><br /><i>ÐŸÑ€Ð¸ Ñ€Ð°Ð·Ð³Ð»ÐµÐ¶Ð´Ð°Ð½Ðµ Ð½Ð° Ð°Ð»Ð±ÑƒÐ¼Ð¸/ÑÐ½Ð¸Ð¼ÐºÐ¸:</i><br />&nbsp;<b>a</b> - Ð—Ð°Ñ€ÐµÐ¶Ð´Ð°Ð½Ðµ Ð½Ð° Ð²ÑÐ¸Ñ‡ÐºÐ¸ Ð¿Ñ€ÐµÐ²ÑŽÑ‚Ð° (ÐºÐ¾Ð³Ð°Ñ‚Ð¾ Ðµ Ð²ÑŠÐ·Ð¼Ð¾Ð¶Ð½Ð¾)<br />&nbsp;<b>b</b> - ÐŸÐ¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð³Ð¾Ð»ÐµÐ¼Ð¸ ÑÐ½Ð¸Ð¼ÐºÐ¸<br />&nbsp;<b>c</b> - ÐŸÑ€ÐµÐ³Ð»ÐµÐ´ Ð½Ð° ÐºÐ¾Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸Ñ‚Ðµ<br />&nbsp;<b>k</b> - ÐÐ°Ð·Ð°Ð´ ÐºÑŠÐ¼ Ð°Ð»Ð±ÑƒÐ¼Ð°<br />&nbsp;<b>m</b> - Ð¡Ð½Ð¸Ð¼ÐºÐ¸ Ð½Ð° (Ð½ÑÐºÐ¾Ð¹) Ð¸ Ð¼ÐµÐ½<br /><br /><i>ÐŸÑ€Ð¸ Ñ€Ð°Ð·Ð³Ð»ÐµÐ¶Ð´Ð°Ð½Ðµ Ð½Ð° ÑÐºÐ¾Ñ€Ð¾ÑˆÐ½Ð¸ Ð°Ð»Ð±ÑƒÐ¼Ð¸ Ð¸ ÐºÐ°Ñ‡ÐµÐ½Ð¸/Ñ‚Ð°Ð³Ð½Ð°Ñ‚Ð¸ ÑÐ½Ð¸Ð¼ÐºÐ¸:</i><br />&nbsp;<b>a</b> Ð¸Ð»Ð¸ &nbsp;<b>r</b> - Ð¡ÐºÐ¾Ñ€Ð¾ÑˆÐ½Ð¸ Ð°Ð»Ð±ÑƒÐ¼Ð¸<br />&nbsp;<b>m</b> Ð¸Ð»Ð¸ &nbsp;<b>u</b> - ÐšÐ°Ñ‡Ð²Ð°Ð½Ð¸Ñ Ð¾Ñ‚ Ð¼Ð¾Ð±Ð¸Ð»Ð½Ð¾ ÑƒÑÑ‚Ñ€Ð¾Ð¹ÑÑ‚Ð²Ð¾<br />&nbsp;<b>o</b> - Ð¡Ð½Ð¸Ð¼ÐºÐ¸ Ñ Ð¼ÐµÐ½<br />&nbsp;<b>p</b> - ÐœÐ¾Ð¸ ÑÐ½Ð¸Ð¼ÐºÐ¸<br />&nbsp;<b>t</b> Ð¸Ð»Ð¸ &nbsp;<b>f</b> - Ð¢Ð°Ð³Ð½Ð°Ñ‚Ð¸ Ð¿Ñ€Ð¸ÑÑ‚ÐµÐ»Ð¸',
		'ConfNewTabSearch' : 'Ð ÐµÐ·ÑƒÐ»Ñ‚Ð°Ñ‚Ð¸Ñ‚Ðµ Ð¾Ñ‚ Ñ‚ÑŠÑ€ÑÐµÐ½Ð¸Ñ Ð´Ð° ÑÐµ Ð¾Ñ‚Ð²Ð°Ñ€ÑÑ‚ Ð² Ð½Ð¾Ð² Ñ‚Ð°Ð±/Ð¿Ñ€Ð¾Ð·Ð¾Ñ€ÐµÑ†, ÐºÐ¾Ð³Ð°Ñ‚Ð¾ Ðµ Ð½Ð°Ñ‚Ð¸ÑÐ½Ð°Ñ‚ Ctrl + Enter Ð¿Ñ€Ð¸ Ñ‚ÑŠÑ€ÑÐµÐ½Ðµ.',
		'ConfPageTitle' : 'ÐŸÑ€ÐµÐ¼Ð°Ñ…Ð²Ð°Ð½Ðµ Ð½Ð° "Facebook |" Ð¾Ñ‚ Ð·Ð°Ð³Ð»Ð°Ð²Ð¸ÐµÑ‚Ð¾ Ð½Ð° Ð²ÑÑÐºÐ° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°.',
		'ConfPhotoPopup' : 'ÐŸÐ¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð¿Ð¾-Ð³Ð¾Ð»ÐµÐ¼Ð¸ Ð¿Ñ€ÐµÐ²ÑŽÑ‚Ð° Ð½Ð° ÑÐ½Ð¸Ð¼ÐºÐ¸Ñ‚Ðµ Ð¿Ñ€Ð¸ ÐºÑƒÑ€ÑÐ¾Ñ€ Ð¾Ñ‚Ð³Ð¾Ñ€Ðµ.',
		'ConfPopupAutoClose' : 'ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡Ð½Ð¾ Ð·Ð°Ñ‚Ð²Ð°Ñ€ÑÐ½Ðµ Ð½Ð° Ð¸Ð·ÑÐºÐ°Ñ‡Ð°Ñ‰Ð¸Ñ‚Ðµ ÐºÐ°Ñ€Ñ‚Ð¸Ð½ÐºÐ¸.',
		'ConfPopupPosition' : 'ÐŸÐ¾Ð·Ð¸Ñ†Ð¸Ñ Ð½Ð° Ð¸Ð·ÑÐºÐ°Ñ‡Ð°Ñ‰Ð¸Ñ‚Ðµ ÐºÐ°Ñ€Ñ‚Ð¸Ð½ÐºÐ¸',
		'ConfProfilePicPopup' : 'ÐŸÐ¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð¿Ð¾-Ð³Ð¾Ð»ÐµÐ¼Ð¸ Ð¿Ñ€ÐµÐ²ÑŽÑ‚Ð° Ð½Ð° Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð½Ð¸Ñ‚Ðµ ÑÐ½Ð¸Ð¼ÐºÐ¸ Ð¿Ñ€Ð¸ ÐºÑƒÑ€ÑÐ¾Ñ€ Ð¾Ñ‚Ð³Ð¾Ñ€Ðµ',
		'ConfProtocolLinks' : 'ÐŸÑ€ÐµÐ²Ñ€ÑŠÑ‰Ð°Ð½Ðµ Ð½Ð° ID-Ñ‚Ð°Ñ‚Ð° Ð¿Ð¾ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð¸Ñ‚Ðµ Ð²ÑŠÐ² Ð²Ñ€ÑŠÐ·ÐºÐ¸, ÐºÐ¾Ð¹Ñ‚Ð¾ Ð·Ð°Ð¿Ð¾Ñ‡Ð²Ð°Ñ‚ Ñ€Ð°Ð·Ð³Ð¾Ð²Ð¾Ñ€ (Google Talk, Windows Live Ð¸ Ñ‚.Ð½.).',
		'ConfSecureLinks' : 'ÐŸÑ€Ð¸Ð½ÑƒÐ¶Ð´Ð°Ð²Ð°Ð½Ðµ Ð½Ð° Facebook Ð²Ñ€ÑŠÐ·ÐºÐ¸Ñ‚Ðµ Ð´Ð° Ð²Ð¾Ð´ÑÑ‚ Ð´Ð¾ HTTPS ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸.',
		'ConfShortcuts' : 'Ð Ð°Ð·Ñ€ÐµÑˆÐ°Ð²Ð°Ð½Ðµ Ð½Ð° Ð‘ÑŠÑ€Ð·Ð¸ Ð±ÑƒÑ‚Ð¾Ð½Ð¸. (Ð’Ð¸Ð¶Ñ‚Ðµ <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">ÑÐ¿Ð¸ÑÑŠÐºÐ°</a>)',
		'ConfSign' : 'ÐŸÐ¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð·Ð¾Ð´Ð¸ÑÑ‚Ð° Ð¿Ð¾ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð¸Ñ‚Ðµ (Ð°ÐºÐ¾ Ðµ Ð²ÑŠÐ²ÐµÐ´ÐµÐ½Ð° Ñ€Ð¾Ð¶Ð´ÐµÐ½Ð° Ð´Ð°Ñ‚Ð°).',
		'ConfTopBarFixed' : 'Ð—Ð°Ð¿Ð°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð³Ð¾Ñ€Ð½Ð¾Ñ‚Ð¾ Ð¼ÐµÐ½ÑŽ Ð½Ð° ÐµÐºÑ€Ð°Ð½Ð°, Ð´Ð¾Ñ€Ð¸ Ð¿Ñ€Ð¸ ÑÐºÑ€Ð¾Ð»Ð¸Ñ€Ð°Ð½Ðµ.',
		'ConfTopBarHoverOpacity' : 'ÐŸÑ€Ð¸ ÐºÑƒÑ€ÑÐ¾Ñ€ Ð¾Ñ‚Ð³Ð¾Ñ€Ðµ',
		'ConfTopBarOpacity' : 'ÐŸÑ€Ð¾Ð·Ñ€Ð°Ñ‡Ð½Ð¾ÑÑ‚ Ð½Ð° Ð³Ð¾Ñ€Ð½Ð¾Ñ‚Ð¾ Ð¼ÐµÐ½ÑŽ',
		'ConfUpdates' : 'ÐŸÑ€Ð¾Ð²ÐµÑ€ÑÐ²Ð°Ð½Ðµ Ð½Ð° Userscripts.org ÐµÐ¶ÐµÐ´Ð½ÐµÐ²Ð½Ð¾ Ð·Ð° ÑŠÐ¿Ð´ÐµÐ¹Ñ‚Ð¸ Ð½Ð° -foREVer- Script. Ð˜Ð»Ð¸ <a href="#" id="fbfUpdateLink" onclick="return false;">Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° ÑÐµÐ³Ð°</a>.',
		'DownloadVideo' : 'Ð¡Ð¼ÑŠÐºÐ²Ð°Ð½Ðµ Ð½Ð° Ð²Ð¸Ð´ÐµÐ¾Ñ‚Ð¾',
		'ExportICalendarFile' : 'Ð•ÐºÑÐ¿Ð¾Ñ€Ñ‚Ð¸Ñ€Ð°Ð½Ðµ Ð² iCalendar-Ñ„Ð°Ð¹Ð»',
		'ExportICalendarFileWarning' : '(Ð¢Ð¾Ð²Ð° Ñ‰Ðµ Ð¾Ñ‚Ð½ÐµÐ¼Ðµ Ð²Ñ€ÐµÐ¼Ðµ, Ð°ÐºÐ¾ Ð¸Ð¼Ð°Ñ‚Ðµ Ð¼Ð½Ð¾Ð³Ð¾ Ð¿Ñ€Ð¸ÑÑ‚ÐµÐ»Ð¸)',
		'fullAlbumLoaded' : 'Ñ†ÐµÐ»Ð¸ÑÑ‚ Ð°Ð»Ð±ÑƒÐ¼ Ðµ Ð·Ð°Ñ€ÐµÐ´ÐµÐ½',
		'Left' : 'ÐžÑ‚Ð»ÑÐ²Ð¾',
		'ListeningRestarted' : '-foREVer- Script Ð²ÑŠÐ·ÑÑ‚Ð°Ð½Ð¾Ð²Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸Ñ‚Ðµ Ð·Ð° Ð¿Ñ€Ð¾Ð¼ÐµÐ½Ð¸.',
		'ListeningStopped' : '-foREVer- Script ÑÐ¿Ñ€Ñ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸Ñ‚Ðµ Ð·Ð° Ð¿Ñ€Ð¾Ð¼ÐµÐ½Ð¸.\nÐÐ°Ñ‚Ð¸ÑÐ½ÐµÑ‚Ðµ L (Shift + l) Ð·Ð° Ð¿Ð¾Ð²Ñ‚Ð¾Ñ€Ð½Ð¾ Ð¿ÑƒÑÐºÐ°Ð½Ðµ',
		'LoadingAllPhotos' : 'Ð—Ð°Ñ€ÐµÐ¶Ð´Ð°Ð½Ðµ Ð½Ð° Ð²ÑÐ¸Ñ‡ÐºÐ¸ ÑÐ½Ð¸Ð¼ÐºÐ¸...',
		'loadingFullAlbum' : 'Ð·Ð°Ñ€ÐµÐ¶Ð´Ð°Ð½Ðµ Ð½Ð° Ñ†ÐµÐ»Ð¸Ñ Ð°Ð»Ð±ÑƒÐ¼...',
		'LoadingPic' : 'Ð—Ð°Ñ€ÐµÐ¶Ð´Ð°Ð½Ðµ Ð½Ð° ÑÐ½Ð¸Ð¼ÐºÐ°Ñ‚Ð°...',
		'LoadPhotosWarning' : 'Ð—Ð°Ñ€ÐµÐ¶Ð´Ð°Ð½ÐµÑ‚Ð¾ Ð½Ð° Ð²ÑÐ¸Ñ‡ÐºÐ¸ ÑÐ½Ð¸Ð¼ÐºÐ¸ Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð¾Ñ‚Ð½ÐµÐ¼Ðµ Ð¼Ð½Ð¾Ð³Ð¾ Ð²Ñ€ÐµÐ¼Ðµ',
		'Months' : new Array('Ð¯Ð½ÑƒÐ°Ñ€Ð¸','Ð¤ÐµÐ²Ñ€ÑƒÐ°Ñ€Ð¸','ÐœÐ°Ñ€Ñ‚','ÐÐ¿Ñ€Ð¸Ð»','ÐœÐ°Ð¹','Ð®Ð½Ð¸','Ð®Ð»Ð¸','ÐÐ²Ð³ÑƒÑÑ‚','Ð¡ÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸','ÐžÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸','ÐÐ¾ÐµÐ¼Ð²Ñ€Ð¸','Ð”ÐµÐºÐµÐ¼Ð²Ñ€Ð¸'),
		'ProtocolSkype' : 'ÐžÐ±Ð°Ð¶Ð´Ð°Ð½Ðµ Ð½Ð° %s Ð¿Ð¾ Skype',
		'ProtocolMSN' : 'Ð§Ð°Ñ‚ Ñ %s Ñ‡Ñ€ÐµÐ· Windows Live',
		'ProtocolYahoo' : 'Ð§Ð°Ñ‚ Ñ %s Ñ‡Ñ€ÐµÐ· Yahoo Messenger',
		'ProtocolGoogle' : 'Ð§Ð°Ñ‚ Ñ %s Ñ‡Ñ€ÐµÐ· Google Talk',
		'ReloadErrorPage' : 'ÐšÐ»Ð¸ÐºÐ½ÐµÑ‚Ðµ Ð·Ð° Ð¿Ð¾Ð²Ñ‚Ð¾Ñ€ÐµÐ½ Ð¾Ð¿Ð¸Ñ‚ Ð¸Ð»Ð¸ Ð¸Ð·Ñ‡Ð°ÐºÐ°Ð¹Ñ‚Ðµ 5 ÑÐµÐºÑƒÐ½Ð´Ð¸',
		'Remove' : 'ÐŸÑ€ÐµÐ¼Ð°Ñ…Ð²Ð°Ð½Ðµ',
		'Right' : 'ÐžÑ‚Ð´ÑÑÐ½Ð¾',
		'ShowBigPictures' : 'ÐŸÐ¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð³Ð¾Ð»ÐµÐ¼Ð¸ ÑÐ½Ð¸Ð¼ÐºÐ¸',
		'Signs' : new Array('ÐšÐ¾Ð·Ð¸Ñ€Ð¾Ð³','Ð’Ð¾Ð´Ð¾Ð»ÐµÐ¹','Ð Ð¸Ð±Ð¸','ÐžÐ²ÐµÐ½','Ð¢ÐµÐ»ÐµÑ†','Ð‘Ð»Ð¸Ð·Ð½Ð°Ñ†Ð¸','Ð Ð°Ðº','Ð›ÑŠÐ²','Ð”ÐµÐ²Ð°','Ð’ÐµÐ·Ð½Ð¸','Ð¡ÐºÐ¾Ñ€Ð¿Ð¸Ð¾Ð½','Ð¡Ñ‚Ñ€ÐµÐ»ÐµÑ†'),
		'today' : 'Ð´Ð½ÐµÑ',
		'UpdateAvailable1' : 'Ð˜Ð·Ð»ÑÐ·Ð»Ð¾ Ðµ Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð½Ð° -foREVer- Script',
		'UpdateAvailable2' : 'Ð–ÐµÐ»Ð°ÐµÑ‚Ðµ Ð»Ð¸ Ð´Ð° Ð¾Ð±Ð½Ð¾Ð²Ð¸Ñ‚Ðµ ÑÐµÐ³Ð°?',
		'UpdateHomepage' : 'ÐšÑŠÐ¼ Ð³Ð»Ð°Ð²Ð½Ð°Ñ‚Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°',
		'UpdateInstall' : 'Ð˜Ð½ÑÑ‚Ð°Ð»Ð¸Ñ€Ð°Ð½Ðµ ÑÐµÐ³Ð°',
		'UpdateTomorrow' : 'ÐÐ°Ð¿Ð¾Ð¼Ð½ÑÐ½Ðµ ÑƒÑ‚Ñ€Ðµ',
		'yearsOld' : 'Ð½Ð° %s Ð³Ð¾Ð´Ð¸Ð½Ð¸'
	},

	// Greek - Contributed by Dimitris DoSMaN Sarlis (20101024)
	el : {
		'_language' : 'Greek',
		'AddToCalendar' : 'Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ· ÏƒÏ„Î¿ Î—Î¼ÎµÏÎ¿Î»ÏŒÎ³Î¹Î¿',
		'AddToGoogleCalendar' : 'Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ· ÏƒÏ„Î¿ Î—Î¼ÎµÏÎ¿Î»ÏŒÎ³Î¹Î¿ Ï„Î¿Ï… Google',
		'all' : 'ÏŒÎ»Î±',
		'All' : 'ÎŒÎ»Î±',
		'AllPhotosLoaded' : 'ÎŒÎ»ÎµÏ‚ Î¿Î¹ Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¯ÎµÏ‚ Ï†Î¿ÏÏ„ÏŽÎ¸Î·ÎºÎ±Î½',
		'Automatic' : 'Î‘Ï…Ï„ÏŒÎ¼Î±Ï„Î±',
		'Birthday' : 'Î“ÎµÎ½Î½Î­Î¸Î»Î¹Î± %s',
		'BookmarkAdd' : 'Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ· ÎÎ­Î¿Ï… Î‘Î³Î±Ï€Î·Î¼Î­Î½Î¿Ï…',
		'BookmarkExists' : 'Î¥Ï€Î¬ÏÏ‡ÎµÎ¹ Î®Î´Î· Î±Î³Î±Ï€Î·Î¼Î­Î½Î¿ Î³Î¹Î± Î±Ï…Ï„Î®Î½ Ï„Î·Î½ ÏƒÎµÎ»Î¯Î´Î±.\n\nÎ Î·Î³Î±Î¯Î½Ï„Îµ ÏƒÏ„Î·Î½ ÏƒÎµÎ»Î¯Î´Î± Ï€Î¿Ï… Î¸Î­Î»ÎµÏ„Îµ Î½Î± Ï€ÏÎ¿ÏƒÎ¸Î­ÏƒÎµÏ„Îµ ÎºÎ±Î¹ Î´Î¿ÎºÎ¹Î¼Î¬ÏƒÏ„Îµ Î¾Î±Î½Î¬.',
		'BookmarkNamePrompt' : 'Î”ÏŽÏƒÏ„Îµ Î­Î½Î± ÏŒÎ½Î¿Î¼Î± Î³Î¹Î± Î±Ï…Ï„ÏŒ Ï„Î¿ Î±Î³Î±Ï€Î·Î¼Î­Î½Î¿:\n%s',
		'BookmarksConfirmRemoval' : 'Î•Î¯ÏƒÏ„Îµ ÏƒÎ¯Î³Î¿Ï…ÏÎ¿Ï‚ ÏŒÏ„Î¹ Î¸Î­Î»ÎµÏ„Îµ Î½Î± Î±Ï†Î±Î¹ÏÎ­ÏƒÎµÏ„Îµ Ï„Î± Ï€Î±ÏÎ±ÎºÎ¬Ï„Ï‰ Î±Î³Î±Ï€Î·Î¼Î­Î½Î±;',
		'BookmarksManage' : 'Î”Î¹Î±Ï‡ÎµÎ¯ÏÎ¹ÏƒÎ· Î‘Î³Î±Ï€Î·Î¼Î­Î½Ï‰Î½',
		'BookmarksRemoveSelected' : 'Î‘Ï†Î±Î¯ÏÎµÏƒÎ· Î•Ï€Î¹Î»ÎµÎ³Î¼Î­Î½Ï‰Î½ Î‘Î³Î±Ï€Î·Î¼Î­Î½Ï‰Î½',
		'Bookmarks' : 'Î‘Î³Î±Ï€Î·Î¼Î­Î½Î±',
		'BrowserUnsupported' : 'ÎŸ Ï€ÎµÏÎ¹Î·Î³Î·Ï„Î®Ï‚ ÏƒÎ±Ï‚ Î´ÎµÎ½ Ï…Ï€Î¿ÏƒÏ„Î·ÏÎ¯Î¶ÎµÎ¹ Î±Ï…Ï„Î®Î½ Ï„Î·Î½ Î´Ï…Î½Î±Ï„ÏŒÏ„Î·Ï„Î±.',
		'CreatingFile' : 'Î”Î·Î¼Î¹Î¿Ï…ÏÎ³Î¯Î± Î‘ÏÏ‡ÎµÎ¯Î¿Ï…',
		'Close' : 'ÎšÎ»ÎµÎ¯ÏƒÎ¹Î¼Î¿',
		'ConfigureFacebook-foREVer-' : 'Î”Î¹Î±Î¼ÏŒÏÏ†Ï‰ÏƒÎ· -foREVer- Script',
		'ConfigureInstructions' : 'ÎŒÎ»ÎµÏ‚ Î¿Î¹ Î±Î»Î»Î±Î³Î­Ï‚ Î±Ï€Î¿Î¸Î·ÎºÎµÏÎ¿Î½Ï„Î±Î¹ Î¬Î¼ÎµÏƒÎ±, Î±Î»Î»Î¬ ÎºÎ¬Ï€Î¿Î¹ÎµÏ‚ Î±Î»Î»Î±Î³Î­Ï‚ Î¼Ï€Î¿ÏÎµÎ¯ Î½Î± Î¼Î·Î½ ÎµÏ†Î±ÏÎ¼Î¿ÏƒÏ„Î¿ÏÎ½ ÏƒÎµ ÎºÎ±ÏÏ„Î­Î»ÎµÏ‚ Ï€Î¿Ï… ÎµÎ¯Î½Î±Î¹ Î®Î´Î· Î±Î½Î¿Î¹Ï‡Ï„Î­Ï‚.',
		'ConfAge' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î·Ï‚ Î·Î»Î¹ÎºÎ¯Î±Ï‚ Î±Ï„ÏŒÎ¼Ï‰Î½ ÏƒÏ„Î¿ Ï€ÏÎ¿Ï†Î¯Î» Ï„Î¿Ï…Ï‚ (Î¼ÏŒÎ½Î¿ ÎµÏ†ÏŒÏƒÎ¿Î½ Î­Ï‡Î¿Ï…Î½ Î´Î·Î»ÏŽÏƒÎµÎ¹ Ï„Î·Î½ Ï€Î»Î®ÏÎ·Ï‚ Î·Î¼ÎµÏÎ¿Î¼Î·Î½Î¯Î±).',
		'ConfApplicationWhitelist' : 'Î›Î¯ÏƒÏ„Î± Î•Ï€Î¹Ï„ÏÎµÏ€Ï„ÏŽÎ½ Î•Ï†Î±ÏÎ¼Î¿Î³ÏŽÎ½ - Î•Î¹ÏƒÎ¬Î³ÎµÏ„Îµ Ï„Î± IDs Î±Ï€ÏŒ Ï„Î¹Ï‚ ÎµÏ†Î±ÏÎ¼Î¿Î³Î­Ï‚ Ï€Î¿Ï… Î¸Î­Î»ÎµÏ„Îµ Î½Î± ÎµÎ¼Ï†Î±Î½Î¯Î¶Î¿Î½Ï„Î±Î¹. Î”Î¹Î±Ï‡Ï‰ÏÎ¯ÏƒÏ„Îµ Ï„Î± IDs Î¼Îµ ÎºÎµÎ½ÏŒ.',
		'ConfAutoBigAlbumPictures' : 'Î‘Ï…Ï„ÏŒÎ¼Î±Ï„Î· ÎµÎ¼Ï†Î¬Î½Î¹ÏƒÎ· Î¼ÎµÎ³Î¬Î»Ï‰Î½ ÎµÎ¹ÎºÏŒÎ½Ï‰Î½ Î¬Î»Î¼Ï€Î¿Ï…Î¼ ÏŒÏ„Î±Î½ Î· ÏƒÎµÎ»Î¯Î´Î± Î±Î½Î¿Î¯Î¾ÎµÎ¹.',
		'ConfAutoLoadFullAlbum' : 'Î‘Ï…Ï„ÏŒÎ¼Î±Ï„Î· Ï†ÏŒÏÏ„Ï‰ÏƒÎ· Î¼Î¹ÎºÏÎ¿Î³ÏÎ±Ï†Î¹ÏŽÎ½ Î³Î¹Î± ÏŒÎ»ÎµÏ‚ Ï„Î¹Ï‚ ÎµÎ¹ÎºÏŒÎ½ÎµÏ‚ Ï„Î¿Ï… Î¬Î»Î¼Ï€Î¿Ï…Î¼ ÏƒÎµ Î¼Î¯Î± ÏƒÎµÎ»Î¯Î´Î±.',
		'ConfAutoLoadTaggedPhotos' : 'Î‘Ï…Ï„ÏŒÎ¼Î±Ï„Î· Ï†ÏŒÏÏ„Ï‰ÏƒÎ· Î¼Î¹ÎºÏÎ¿Î³ÏÎ±Ï†Î¹ÏŽÎ½ Î³Î¹Î± ÏŒÎ»ÎµÏ‚ Ï„Î¹Ï‚ "ÏƒÎ·Î¼Î±Î´ÎµÎ¼Î­Î½ÎµÏ‚" Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¯ÎµÏ‚ ÏƒÎµ Î¼Î¯Î± ÏƒÎµÎ»Î¯Î´Î± (ÏƒÏ„Î·Î½ ÎºÎ±ÏÏ„Î­Î»Î± Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¹ÏŽÎ½, ÏƒÏ„Î¿ Ï€ÏÎ¿Ï†Î¯Î» Ï„Ï‰Î½ Î±Î½Î¸ÏÏŽÏ€Ï‰Î½).',
		'ConfAutoReadMore' : 'Î‘Ï…Ï„ÏŒÎ¼Î±Ï„Î¿ ÎºÎ»Î¹Îº ÏƒÏ„Î¿ ÏƒÏÎ½Î´ÎµÏƒÎ¼Î¿ "Î´Î¹Î±Î²Î¬ÏƒÏ„Îµ Ï€ÎµÏÎ¹ÏƒÏƒÏŒÏ„ÎµÏÎ±"',
		'ConfBigAlbumPictures' : 'Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ· ÏƒÏ…Î½Î´Î­ÏƒÎ¼Î¿Ï… ÏƒÏ„Î¹Ï‚ ÏƒÎµÎ»Î¯Î´ÎµÏ‚ Ï„Ï‰Î½ Î¬Î»Î¼Ï€Î¿Ï…Î¼, Î³Î¹Î± ÎµÎ¼Ï†Î¬Î½Î¹ÏƒÎ· Î¼ÎµÎ³Î±Î»ÏÏ„ÎµÏÏ‰Î½ ÎµÎºÎ´Î¿Ï‡ÏŽÎ½ ÏŒÎ»Ï‰Î½ Ï„Ï‰Î½ ÎµÎ¹ÎºÏŒÎ½Ï‰Î½ ÏƒÏ„Î·Î½ ÏƒÏ…Î³ÎºÎµÎºÏÎ¹Î¼Î­Î½Î· ÏƒÎµÎ»Î¯Î´Î±.',
		'ConfBigAlbumPicturesBorder' : 'Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ· ÎµÎ½ÏŒÏ‚ Ï€Î»Î±Î¹ÏƒÎ¯Î¿Ï… Î³ÏÏÏ‰ Î±Ï€ÏŒ Ï„Î¹Ï‚ Î¼ÎµÎ³Î¬Î»ÎµÏ‚ ÎµÎºÎ´ÏŒÏƒÎµÎ¹Ï‚ Ï„Ï‰Î½ ÎµÎ¹ÎºÏŒÎ½Ï‰Î½.',
		'ConfBookmarks' : 'Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ· ÎµÎ½ÏŒÏ‚ Ï…Ï€Î¿Î¼ÎµÎ½Î¿Ï Î‘Î³Î±Ï€Î·Î¼Î­Î½Ï‰Î½ ÏƒÏ„Î·Î½ Ï€Î¬Î½Ï‰ Î¼Ï€Î¬ÏÎ±.',
		'ConfBottomBarHoverOpacity' : 'ÎšÎ±Ï„Î¬ Ï„Î¿ Ï€Î­ÏÎ±ÏƒÎ¼Î± Ï„Î¿Ï… Ï€Î¿Î½Ï„Î¹ÎºÎ¹Î¿Ï',
		'ConfBottomBarOpacity' : 'Î”Î¹Î±Ï†Î¬Î½ÎµÎ¹Î± Ï„Î·Ï‚ ÎºÎ¬Ï„Ï‰ Î³ÏÎ±Î¼Î¼Î®Ï‚ Î¼ÎµÎ½Î¿Ï.',
		'ConfCalendarBirthDate' : 'ÎÎ± ÏƒÏ…Î¼Ï€ÎµÏÎ¹Î»Î·Ï†Î¸ÎµÎ¯ Î· Î·Î¼ÎµÏÎ¿Î¼Î·Î½Î¯Î± Î³Î­Î½Î½Î·ÏƒÎ·Ï‚ Ï„Î¿Ï… Î±Ï„ÏŒÎ¼Î¿Ï… ÏƒÏ„Î·Ï‚ Î»ÎµÏ€Ï„Î¿Î¼Î­ÏÎ¹ÎµÏ‚ Î³ÎµÎ³Î¿Î½ÏŒÏ„Ï‰Î½.',
		'ConfCalendarFullName' : 'Î§ÏÎ®ÏƒÎ· Ï„Î¿Ï… Ï€Î»Î®ÏÎµÏ‚ Î¿Î½ÏŒÎ¼Î±Ï„Î¿Ï‚ Ï„Î¿Ï… Î±Ï„ÏŒÎ¼Î¿Ï… ÏƒÎ±Î½ Ï„Î¯Ï„Î»Î¿ Î³ÎµÎ½ÎµÎ¸Î»Î¯Ï‰Î½ (Î±Î½Ï„Î¯ Î³Î¹Î± Î¼ÏŒÎ½Î¿ Ï„Î¿ ÏŒÎ½Î¿Î¼Î±).',
		'ConfChatDifferentiate' : 'Î§ÏÎ®ÏƒÎ· Î­Î½Ï„Î¿Î½Ï‰Î½ ÎºÎ±Î¹ Ï€Î»Î±Î³Î¯Ï‰Î½ Î³ÏÎ±Î¼Î¼Î¬Ï„Ï‰Î½ Î³Î¹Î± Î´Î¹Î±Ï†Î¿ÏÎ¿Ï€Î¿Î¯Î·ÏƒÎ· Î¼ÎµÏ„Î±Î¾Ï Î´Î¹Î±Î¸Î­ÏƒÎ¹Î¼Ï‰Î½ ÎºÎ±Î¹ Î±Î´ÏÎ±Î½ÏŽÎ½ Ï†Î¯Î»Ï‰Î½.',
		'ConfChatHideIdle' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î±Î´ÏÎ±Î½ÏŽÎ½ Ï†Î¯Î»Ï‰Î½.',
		'ConfDelayPopupPics' : 'Î‘Î½Î±Î¼Î¿Î½Î® 0.5 Î´ÎµÏ…Ï„ÎµÏÎ¿Î»Î­Ï€Ï„Ï‰Î½ Ï€ÏÎ¹Î½ Ï„Î·Î½ ÎµÎ¼Ï†Î¬Î½Î¹ÏƒÎ· Î±Î½Î±Î´Ï…ÏŒÎ¼ÎµÎ½Ï‰Î½ ÎµÎ¹ÎºÏŒÎ½Ï‰Î½.',
		'ConfDelayPopupPicsTimeout' : 'Î§ÏÎ¿Î½Î¿ÎºÎ±Î¸Ï…ÏƒÏ„Î­ÏÎ¹ÏƒÎ· Ï€ÏÎ¹Î½ Ï„Î·Î½ ÎµÎ¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Ï‰Î½ Î±Î½Î±Î´Ï…ÏŒÎ¼ÎµÎ½Ï‰Î½ ÎµÎ¹ÎºÏŒÎ½Ï‰Î½, ÏƒÎµ Ï‡Î¹Î»Î¹Î¿ÏƒÏ„Î¬ Ï„Î¿Ï… Î´ÎµÏ…Ï„ÎµÏÎ¿Î»Î­Ï€Ï„Î¿Ï… (Ï€ÏÎ¿ÎµÏ€Î¹Î»Î¿Î³Î®=500):',
		'ConfDownloadVideo' : 'Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ· ÏƒÏ…Î½Î´Î­ÏƒÎ¼Î¿Ï… Î³Î¹Î± Î»Î®ÏˆÎ· Î²Î¯Î½Ï„ÎµÎ¿ Î±Ï€ÏŒ Ï„Î¹Ï‚ ÏƒÎµÎ»Î¯Î´ÎµÏ‚ Î²Î¯Î½Ï„ÎµÎ¿. (ÎœÏ€Î¿ÏÎµÎ¯ Î½Î± Ï‡ÏÎµÎ¹Î±ÏƒÏ„ÎµÎ¯Ï„Îµ Ï„Î¿ <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Î‘Ï…Ï„ÏŒÎ¼Î±Ï„Î· ÎµÏ€Î±Î½Î±Ï†ÏŒÏÏ„Ï‰ÏƒÎ· ÏƒÎµÎ»Î¯Î´Ï‰Î½ ÎµÏ†Î±ÏÎ¼Î¿Î³ÏŽÎ½ Î¼Îµ ÏƒÏ†Î¬Î»Î¼Î±Ï„Î±, Î¼ÎµÏ„Î¬ Î±Ï€ÏŒ 5 Î´ÎµÏ…Ï„ÎµÏÏŒÎ»ÎµÏ€Ï„Î±.',
		'ConfExport' : 'Î“Î¹Î± Î½Î± ÎµÎ¾Î¬Î³ÎµÏ„Îµ Ï„Î¹Ï‚ ÏÏ…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚ ÏƒÎ±Ï‚, Î±Î½Ï„Î¹Î³ÏÎ¬ÏˆÏ„Îµ Ï„Î¿ ÎºÎµÎ¯Î¼ÎµÎ½Î¿ Ï€Î±ÏÎ±ÎºÎ¬Ï„Ï‰ ÎºÎ±Î¹ ÏƒÏŽÏƒÏ„Îµ Ï„Î¿ ÏƒÎµ Î±ÏÏ‡ÎµÎ¯Î¿.',
		'ConfExternalPopup' : 'Î‘Î½Î¬Î´Ï…ÏƒÎ· Ï€ÏÎ±Î³Î¼Î±Ï„Î¹ÎºÎ¿Ï Î¼ÎµÎ³Î­Î¸Î¿Ï…Ï‚ Î³Î¹Î± ÎµÎ¾Ï‰Ï„ÎµÏÎ¹ÎºÎ­Ï‚ ÎµÎ¹ÎºÏŒÎ½ÎµÏ‚. <sup>Î”Î¿ÎºÎ¹Î¼Î±ÏƒÏ„Î¹ÎºÏŒ</sup>',
		'ConfFacebook-foREVer-Language' : 'Î“Î»ÏŽÏƒÏƒÎ± Î³Î¹Î± Ï„Î¿ -foREVer- Script',
		'ConfFacebookTimestamps' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î·Ï‚ ÏŽÏÎ±Ï‚ Ï„Î¿Ï… Facebook (Ï€Ï‡. "Î ÏÎ¹Î½ 3 ÏŽÏÎµÏ‚").',
		'ConfFBFTimestamps' : 'Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ· Ï„Î·Ï‚ ÏŽÏÎ±Ï‚ Ï„Î¿Ï… -foREVer- Script Î¼ÎµÏ„Î¬ Î±Ï€ÏŒ Ï„Î·Î½ ÏŽÏÎ± Ï„Î¿Ï… Facebook (Ï€Ï‡. "11:45").',
		'ConfFBFTimestamps24' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î·Ï‚ ÏŽÏÎ±Ï‚ Ï„Î¿Ï… -foREVer- Script ÏƒÎµ 24-Ï‰ÏÎ· Î¼Î¿ÏÏ†Î®.',
		'ConfFriendRequestCountInTitle' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î¿Ï… Î±ÏÎ¹Î¸Î¼Î¿Ï Ï„Ï‰Î½ Ï€ÏÎ¿ÏƒÎºÎ»Î®ÏƒÎµÏ‰Î½ Ï†Î¯Î»Ï‰Î½ ÏƒÏ„Î¿Î½ Ï„Î¯Ï„Î»Î¿ Ï„Î·Ï‚ ÏƒÎµÎ»Î¯Î´Î±Ï‚.',
		'ConfGoogleApps' : 'Î”Î·Î¼Î¹Î¿Ï…ÏÎ³Î¯Î± Î—Î¼ÎµÏÎ¿Î»Î¿Î³Î¯Î¿Ï… Google, ÏƒÏ…Î¼Î²Î±Ï„ÏŒ Î¼Îµ Î•Ï†Î±ÏÎ¼Î¿Î³Î­Ï‚ Google.',
		'ConfGoogleAppsDomain' : 'Î¤Î¿Î¼Î­Î±Ï‚:',
		'ConfGoogleCalendar' : 'Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ· ÏƒÏ…Î½Î´Î­ÏƒÎ¼Ï‰Î½ Î³Î¹Î± Ï€ÏÏŒÏƒÎ¸ÎµÏƒÎ· Î³ÎµÎ½Î½ÎµÎ¸Î»Î¯Ï‰Î½ ÎºÎ±Î¹ Î³ÎµÎ³Î¿Î½ÏŒÏ„Ï‰Î½ ÏƒÏ„Î¿ <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Î—Î¼ÎµÏÎ¿Î»ÏŒÎ³Î¹Î¿ Google</a>.',
		'ConfGoogleLanguage' : 'Î“Î»ÏŽÏƒÏƒÎ± Î³Î¹Î± <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">ÎœÎµÏ„Î±Ï†ÏÎ±ÏƒÏ„Î® Google</a>',
		'ConfHideApplicationStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ ÎµÏ†Î±ÏÎ¼Î¿Î³ÏŽÎ½.',
		'ConfHideEgos' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· ÏŒÎ»Ï‰Î½ Ï„Ï‰Î½ Ï„Î¿Î¼Î­Ï‰Î½ "ÎµÎ³ÏŽ" (Î¸Î± Ï€ÏÎ­Ï€ÎµÎ¹ Î½Î± ÎºÏÏÎ²ÎµÎ¹ Ï„Î¹Ï‚ Ï€ÎµÏÎ¹ÏƒÏƒÏŒÏ„ÎµÏÎµÏ‚ Ï€ÏÎ¿Ï„Î¬ÏƒÎµÎ¹Ï‚ Ï„Î¿Ï… Facebook).',
		'ConfHideEventStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ ÎµÎºÎ´Î·Î»ÏŽÏƒÎµÏ‰Î½.',
		'ConfHideFacebookCountInTitle' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Ï„Î¿Ï… Î¼ÎµÏ„ÏÎ·Ï„Î® Î½Î­Ï‰Î½ ÎµÎ¹ÏƒÎµÏÏ‡Î¿Î¼Î­Î½Ï‰Î½ Î¼Î·Î½Ï…Î¼Î¬Ï„Ï‰Î½ Ï„Î¿Ï… Facebook.',
		'ConfHideFriendStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ Ï†Î¯Î»Ï‰Î½.',
		'ConfHideGroupStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ Î¿Î¼Î¬Î´Ï‰Î½.',
		'ConfHideHovercards' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î±Î½Î±Î´Ï…ÏŒÎ¼ÎµÎ½Ï‰Î½ ÎºÎ±ÏÏ„ÏŽÎ½ (Î· ÎºÎ¬ÏÏ„Î± Ï€Î¿Ï… ÎµÎ¼Ï†Î±Î½Î¯Î¶ÎµÏ„Î±Î¹ ÏŒÏ„Î±Î½ Ï€ÎµÏÎ½Î¬ÎµÎ¹ Ï„Î¿ Ï€Î¿Î½Ï„Î¯ÎºÎ¹ Ï€Î¬Î½Ï‰ Î±Ï€ÏŒ ÎºÎ¬Ï€Î¿Î¹Î¿ ÏŒÎ½Î¿Î¼Î±).',
		'ConfHideLikeStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Ï„Ï‰Î½ Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ "Î¼Î¿Ï… Î±ÏÎ­ÏƒÎµÎ¹".',
		'ConfHideLinkStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ ÏƒÏ…Î½Î´Î­ÏƒÎ¼Ï‰Î½.',
		'ConfHideNoteStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Ï„Ï‰Î½ Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ ÏƒÎ·Î¼ÎµÎ¹ÏŽÏƒÎµÏ‰Î½.',
		'ConfHidePhotoStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¹ÏŽÎ½.',
		'ConfHidePlaceStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ Ï„ÏŒÏ€Î¿Ï….',
		'ConfHideProfilePicStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ ÎµÎ¹ÎºÏŒÎ½Î±Ï‚ Ï€ÏÎ¿Ï†Î¯Î».',
		'ConfHideRead' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î±Î½Ï„Î¹ÎºÎµÎ¹Î¼Î­Î½Ï‰Î½ Î±Ï€ÏŒ Ï„Î·Î½ Ï„ÏÎ¿Ï†Î¿Î´Î¿ÏƒÎ¯Î± Î½Î­Ï‰Î½ Ï€Î¿Ï… Î­Ï‡Î¿Ï…Î½ ÏƒÎ·Î¼ÎµÎ¹Ï‰Î¸ÎµÎ¯ ÏƒÎ±Î½ Î´Î¹Î±Î²Î±ÏƒÎ¼Î­Î½Î±.',
		'ConfHideRelationshipStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ Ï†Î¹Î»Î¯Î±Ï‚.',
		'ConfHideStatusStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ ÎºÎ±Ï„Î¬ÏƒÏ„Î±ÏƒÎ·Ï‚.',
		'ConfHideVideoStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ Î’Î¯Î½Ï„ÎµÎ¿.',
		'ConfHideWallStories' : 'Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î¹ÏƒÏ„Î¿ÏÎ¹ÏŽÎ½ Ï„Î¿Î¯Ï‡Î¿Ï….',
		'ConfHomeBeta' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î¿Ï… Ï„Î¿Î¼Î­Î± Î”Î¿ÎºÎ¹Î¼Î±ÏƒÏ„Î¹ÎºÎ®Ï‚ ÎˆÎºÎ´Î¿ÏƒÎ·Ï‚ Ï„Î¿Ï… Facebook.',
		'ConfHomeChat' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î¿Ï… Ï„Î¿Î¼Î­Î± Î£Ï…Î½Î¿Î¼Î¹Î»Î¯Î±Ï‚.',
		'ConfHomeChatNames' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Î¿Î½Î¿Î¼Î¬Ï„Ï‰Î½ ÏƒÏ„Î¿Î½ Ï„Î¿Î¼Î­Î± Î£Ï…Î½Î¿Î¼Î¹Î»Î¯Î±Ï‚.',
		'ConfHomeEvents' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î·Ï‚ ÎºÎ±Ï„Î·Î³Î¿ÏÎ¯Î±Ï‚ ÎµÎºÎ´Î·Î»ÏŽÏƒÎµÏ‰Î½.',
		'ConfHomeFindFriends' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î¿Ï… Ï„Î¿Î¼Î­Î± "Î£Ï…Î½Î´ÎµÎ¸ÎµÎ¯Ï„Îµ Î¼Îµ Ï†Î¯Î»Î¿Ï…Ï‚".',
		'ConfHomeLeftAlign' : 'Î‘ÏÎ¹ÏƒÏ„ÎµÏÎ® ÏƒÏ„Î¿Î¯Ï‡Î¹ÏƒÎ· Ï„Ï‰Î½ Ï€ÎµÏÎ¹ÎµÏ‡Î¿Î¼Î­Î½Ï‰Î½ Ï„Î·Ï‚ Î±ÏÏ‡Î¹ÎºÎ®Ï‚ ÏƒÎµÎ»Î¯Î´Î±Ï‚.',
		'ConfHomeLeftColumn' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î·Ï‚ Î±ÏÎ¹ÏƒÏ„ÎµÏÎ®Ï‚ ÏƒÏ„Î®Î»Î·Ï‚.',
		'ConfHomeLeftColumnFixed' : 'Î Î¬Î³Ï‰Î¼Î± Î±ÏÎ¹ÏƒÏ„ÎµÏÎ®Ï‚ ÏƒÏ„Î®Î»Î·Ï‚, Î±ÎºÏŒÎ¼Î± ÎºÎ±Î¹ Î±Î½ Î¼ÎµÏ„Î±ÎºÎ¹Î½Î®ÏƒÏ„Îµ Ï€ÏÎ¿Ï‚ Ï„Î± ÎºÎ¬Ï„Ï‰.',
		'ConfHomeLink' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î¿Ï… ÏƒÏ…Î½Î´Î­ÏƒÎ¼Î¿Ï… Ï„Î·Ï‚ Î‘ÏÏ‡Î¹ÎºÎ®Ï‚ Î£ÎµÎ»Î¯Î´Î±Ï‚ ÏƒÏ„Î·Î½ Ï€Î¬Î½Ï‰ Î¼Ï€Î¬ÏÎ±.',
		'ConfHomeNavigation' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î¿Ï… Ï„Î¿Î¼Î­Î± Î Î»Î¿Î®Î³Î·ÏƒÎ·Ï‚.',
		'ConfHomePokes' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Ï‰Î½ ÏƒÎºÎ¿Ï…Î½Ï„Î·Î³Î¼Î¬Ï„Ï‰Î½.',
		'ConfHomeProfile' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î¿Ï… Ï„Î¿Î¼Î­Î± Î ÏÎ¿Ï†Î¯Î».',
		'ConfHomeRecommendations' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï€ÏÎ¿Ï„Î¬ÏƒÎµÏ‰Î½ (Î†Ï„Î¿Î¼Î± Ï€Î¿Ï… Î¯ÏƒÏ‰Ï‚ Î³Î½Ï‰ÏÎ¯Î¶ÎµÎ¹Ï‚, Î ÏÎ¿Ï„ÎµÎ¹Î½ÏŒÎ¼ÎµÎ½ÎµÏ‚ Î£ÎµÎ»Î¯Î´ÎµÏ‚ ÎºÎ»Ï€).',
		'ConfHomeRequests' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î·Ï‚ ÎºÎ±Ï„Î·Î³Î¿ÏÎ¯Î±Ï‚ Î‘Î¹Ï„Î·Î¼Î¬Ï„Ï‰Î½.',
		'ConfHomeRightColumn' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î¿Ï… Î´ÎµÎ¾Î¹Î¿Ï Ï„Î¼Î®Î¼Î±Ï„Î¿Ï‚.',
		'ConfHomeStretch' : 'Î†Î½Î¿Î¹Î³Î¼Î± Ï„Î·Ï‚ Î±ÏÏ‡Î¹ÎºÎ®Ï‚ ÏƒÎµÎ»Î¯Î´Î±Ï‚ Î¼Îµ Î²Î¬ÏƒÎ· Ï„Î¿ Ï€Î»Î¬Ï„Î¿Ï‚ Ï„Î¿Ï… Ï€Î±ÏÎ±Î¸ÏÏÎ¿Ï… Ï„Î¿Ï… Ï€ÎµÏÎ¹Î·Î³Î·Ï„Î®.',
		'ConfHomeStretchComments' : 'Î†Î½Î¿Î¹Î³Î¼Î± Ï„Î¿Ï… Ï€Î»Î¬Ï„Î¿Ï…Ï‚ Ï„Ï‰Î½ ÏƒÏ‡Î¿Î»Î¯Ï‰Î½ ÏƒÏ„Î·Î½ Î±ÏÏ‡Î¹ÎºÎ® ÏƒÎµÎ»Î¯Î´Î±.',
		'ConfiCalendar' : 'Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ· ÏƒÏ…Î½Î´Î­ÏƒÎ¼Ï‰Î½ Î³Î¹Î± Î»Î®ÏˆÎ· Î±ÏÏ‡ÎµÎ¯Î¿Ï… <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> Î¼Îµ ÏŒÎ»Î± Ï„Î± Î³ÎµÎ½Î½Î­Î¸Î»Î¹Î±.',
		'ConfImport' : 'Î“Î¹Î± Î½Î± ÎµÎ¹ÏƒÎ¬Î³ÎµÏ„Îµ Ï„Î¹Ï‚ ÏÏ…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚ ÏƒÎ±Ï‚ Î±ÏÎ³ÏŒÏ„ÎµÏÎ±, Î±Î½Ï„Î¹ÎºÎ±Ï„Î±ÏƒÏ„Î®ÏƒÏ„Îµ Ï„Î¿ ÎºÎµÎ¯Î¼ÎµÎ½Î¿ Ï€Î¿Ï… Î±Ï€Î¿Î¸Î·ÎºÎµÏÏƒÎ±Ï„Îµ Ï€ÏÎ¿Î·Î³Î¿Ï…Î¼Î­Î½Ï‰Ï‚ ÎºÎ±Î¹ Ï€Î±Ï„Î®ÏƒÏ„Îµ ÏƒÏ„Î¿ ÎºÎ¿Ï…Î¼Ï€Î¯ "Î•Î¹ÏƒÎ±Î³Ï‰Î³Î®".',
		'ConfInboxCountInTitle' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î¿Ï… Ï€Î»Î®Î¸Î¿Ï…Ï‚ Ï„Ï‰Î½ Î±Î´Î¹Î¬Î²Î±ÏƒÏ„Ï‰Î½ Î¼Î·Î½Ï…Î¼Î¬Ï„Ï‰Î½ ÏƒÏ„Î± ÎµÎ¹ÏƒÎµÏÏ‡ÏŒÎ¼ÎµÎ½Î± ÏƒÏ„Î¿Î½ Ï„Î¯Ï„Î»Î¿ Ï„Î·Ï‚ ÏƒÎµÎ»Î¯Î´Î±Ï‚.',
		'ConfLogoutLink' : 'Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ· ÎµÎ½ÏŒÏ‚ ÏƒÏ…Î½Î´Î­ÏƒÎ¼Î¿Ï… Î³Î¹Î± Î±Ï€Î¿ÏƒÏÎ½Î´ÎµÏƒÎ· ÏƒÏ„Î·Î½ Ï€Î¬Î½Ï‰ Î¼Ï€Î¬ÏÎ±.',
		'ConfNotificationCountInTitle' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Ï‰Î½ Î½Î­Ï‰Î½ ÎµÎ¹Î´Î¿Ï€Î¿Î¹Î®ÏƒÎµÏ‰Î½ ÏƒÏ„Î¿Î½ Ï„Î¯Ï„Î»Î¿ Ï„Î·Ï‚ ÏƒÎµÎ»Î¯Î´Î±Ï‚.',
		'ConfNewTabSearch' : 'Î†Î½Î¿Î¹Î³Î¼Î± Î±Î½Î±Î¶Î®Ï„Î·ÏƒÎ·Ï‚ ÏƒÎµ ÎºÎ±Î¹Î½Î¿ÏÏÎ³Î¹Î± ÎºÎ±ÏÏ„Î­Î»Î± Î® Ï€Î±ÏÎ¬Î¸Ï…ÏÎ¿ ÏŒÏ„Î±Î½ Ï€Î¹Î­Î¶ÎµÏ„Îµ Ï„Î¿ CTRL + Enter Î³Î¹Î± Î±Î½Î±Î¶Î®Ï„Î·ÏƒÎ·.',
		'ConfPageTitle' : 'Î‘Ï†Î±Î¯ÏÎµÏƒÎ· Ï„Î¿Ï… "Facebook |" Î±Ï€ÏŒ Ï„Î¿Î½ Ï„Î¯Ï„Î»Î¿ Ï„Î·Ï‚ ÎºÎ¬Î¸Îµ ÏƒÎµÎ»Î¯Î´Î±Ï‚.',
		'ConfPhotoPopup' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Î±Î½Î±Î´Ï…ÏŒÎ¼ÎµÎ½Ï‰Î½ Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¹ÏŽÎ½ ÏƒÎµ Ï€ÏÎ±Î³Î¼Î±Ï„Î¹ÎºÏŒ Î¼Î­Î³ÎµÎ¸Î¿Ï‚ ÎºÎ±Ï„Î¬ Ï„Î¿ Ï€Î­ÏÎ±ÏƒÎ¼Î± Ï„Î¿Ï… Ï€Î¿Î½Ï„Î¹ÎºÎ¹Î¿Ï.',
		'ConfPopupAutoClose' : 'ÎšÎ»ÎµÎ¯ÏƒÎ¹Î¼Î¿ Î±Î½Î±Î´Ï…ÏŒÎ¼ÎµÎ½Ï‰Î½ Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¹ÏŽÎ½ Î±Ï…Ï„ÏŒÎ¼Î±Ï„Î±.',
		'ConfPopupSmartAutoClose' : 'Î‘Ï€Î¿Ï„ÏÎ¿Ï€Î® ÎºÎ»ÎµÎ¹ÏƒÎ¯Î¼Î±Ï„Î¿Ï‚ Î±Î½Î±Î´Ï…ÏŒÎ¼ÎµÎ½Ï‰Î½ Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¹ÏŽÎ½ ÎµÎ¬Î½ Ï„Î¿ Ï€Î¿Î½Ï„Î¯ÎºÎ¹ ÎµÎ¯Î½Î±Î¹ Ï€Î¬Î½Ï‰ Ï„Î¿Ï…Ï‚.',
		'ConfPopupPosition' : 'Î˜Î­ÏƒÎ· Î±Î½Î±Î´Ï…ÏŒÎ¼ÎµÎ½Ï‰Î½ Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¹ÏŽÎ½',
		'ConfPopupWhileTagging' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Î±Î½Î±Î´Ï…ÏŒÎ¼ÎµÎ½Ï‰Î½ ÎµÎ¹ÎºÏŒÎ½Ï‰Î½ Î±ÎºÏŒÎ¼Î± ÎºÎ±Î¹ ÏƒÏ„Î·Î½ Ï€ÏÎ¿ÏƒÎ¸Î®ÎºÎ· ÎµÏ„Î¹ÎºÎ­Ï„Î±Ï‚.',
		'ConfProcessInterval' : 'Î”Î¹Î¬ÏƒÏ„Î·Î¼Î± Ï€Î¿Ï… Î±Ï€Î±Î¹Ï„ÎµÎ¯Ï„Î±Î¹ Î³Î¹Î± Î½Î± Ï†Î¿ÏÏ„ÏŽÏƒÎµÎ¹ Î· ÏƒÎµÎ»Î¯Î´Î±, ÏƒÎµ Ï‡Î¹Î»Î¹Î¿ÏƒÏ„Î¬ Ï„Î¿Ï… Î´ÎµÏ…Ï„ÎµÏÎ¿Î»Î­Ï€Ï„Î¿Ï…. (Ï€ÏÎ¿ÎµÏ€Î¹Î»Î¿Î³Î®=1000):',
		'ConfProfileLink' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î¿Ï… ÏƒÏ…Î½Î´Î­ÏƒÎ¼Î¿Ï… Î ÏÎ¿Ï†Î¯Î» ÏƒÏ„Î·Î½ Ï€Î¬Î½Ï‰ Î¼Ï€Î¬ÏÎ±.',
		'ConfProfilePicPopup' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Î±Î½Î±Î´Ï…ÏŒÎ¼ÎµÎ½Ï‰Î½ Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¹ÏŽÎ½ Ï€ÏÎ¿Ï†Î¯Î» ÏƒÎµ Ï€ÏÎ±Î³Î¼Î±Ï„Î¹ÎºÏŒ Î¼Î­Î³ÎµÎ¸Î¿Ï‚ ÎºÎ±Ï„Î¬ Ï„Î¿ Ï€Î­ÏÎ±ÏƒÎ¼Î± Ï„Î¿Ï… Ï€Î¿Î½Ï„Î¹ÎºÎ¹Î¿Ï',
		'ConfProtocolLinks' : 'ÎœÎµÏ„Î±Ï„ÏÎ¿Ï€Î® Ï„Î¿Ï… Messenger IDs Ï„Ï‰Î½ Ï€ÏÎ¿Ï†Î¯Î» ÏƒÎµ ÏƒÏ…Î½Î´Î­ÏƒÎ¼Î¿Ï…Ï‚ ÏŒÏ€Î¿Ï… Î¼Ï€Î¿ÏÎµÎ¯ Î½Î± Î¾ÎµÎºÎ¹Î½Î®ÏƒÎµÎ¹ ÏƒÏ…Î¶Î®Ï„Î·ÏƒÎ· Î¼Îµ Î±Ï…Ï„Î¿ÏÏ‚ (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Î£Ï‡ÎµÏ„Î¹ÎºÎ¬ Î¼Îµ Ï„Î¿ -foREVer- Script',
		'ConfSectionAdvanced' : 'Î“Î¹Î± Ï€ÏÎ¿Ï‡Ï‰ÏÎ®Î¼Î­Î½Î¿Ï…Ï‚',
		'ConfSectionEvents' : 'Î“ÎµÎ½Î½Î­Î¸Î»Î¹Î±/Î•ÎºÎ´Î·Î»ÏŽÏƒÎµÎ¹Ï‚',
		'ConfSectionImportExport' : 'Î•Î¹ÏƒÎ±Î³Ï‰Î³Î®/Î•Î¾Î±Î³Ï‰Î³Î®',
		'ConfSectionFeeds' : 'Î¤ÏÎ¿Ï†Î¿Î´Î¿ÏƒÎ¯ÎµÏ‚',
		'ConfSectionHomePage' : 'Î‘ÏÏ‡Î¹ÎºÎ® Î£ÎµÎ»Î¯Î´Î±',
		'ConfSectionLiveFeed' : 'Î¤ÎµÎ»ÎµÏ…Ï„Î±Î¯Î± ÎÎ­Î±',
		'ConfSectionMenu' : 'ÎœÎµÎ½Î¿Ï/Î£Ï…Î½Î¿Î¼Î¹Î»Î¯Î±',
		'ConfSectionOther' : 'Î†Î»Î»ÎµÏ‚ Î•Ï€Î¹Î»Î¿Î³Î­Ï‚',
		'ConfSectionPageTitle' : 'Î¤Î¯Ï„Î»Î¿Ï‚ Î£ÎµÎ»Î¯Î´Î±Ï‚',
		'ConfSectionPictures' : 'Î•Î¹ÎºÏŒÎ½ÎµÏ‚',
		'ConfSectionShortcuts' : 'Î£Ï…Î½Ï„Î¿Î¼ÎµÏÏƒÎµÎ¹Ï‚ Î Î»Î·ÎºÏ„ÏÎ¿Î»Î¿Î³Î¯Î¿Ï…',
		'ConfSecureLinks' : 'Î•Î¾Î±Î½Î¬Î³ÎºÎ±ÏƒÎµ Ï„Î¿Ï…Ï‚ ÏƒÏ…Î½Î´Î­ÏƒÎ¼Î¿Ï…Ï‚ Ï„Î¿Ï… Facebook Î½Î± Î´ÎµÎ¯Ï‡Î½Î¿Ï…Î½ ÏƒÎµ Î±ÏƒÏ†Î±Î»ÎµÎ¯Ï‚ (HTTPS) ÏƒÎµÎ»Î¯Î´ÎµÏ‚.',
		'ConfShortcutList' : '<b>Î£Ï…Î½Ï„Î¿Î¼ÎµÏÏƒÎµÎ¹Ï‚ Î Î»Î·ÎºÏ„ÏÎ¿Î»Î¿Î³Î¯Î¿Ï…</b> (ÎµÏ…Î±Î¹ÏƒÎ¸Î·ÏƒÎ¯Î± Ï‡Î±ÏÎ±ÎºÏ„Î®ÏÏ‰Î½):<br /><br /><i>Î‘Ï€ÏŒ Î¿Ï€Î¿Î¹Î±Î´Î®Ï€Î¿Ï„Îµ ÏƒÎµÎ»Î¯Î´Î±:</i><br /> <b>A</b> - Î†Î»Î¼Ï€Î¿Ï…Î¼/Î¦Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¯ÎµÏ‚<br /> <b>B</b> - Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ·/Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Î»Î¯ÏƒÏ„Î± Ï†Î¯Î»Ï‰Î½ (Î´Î¹Î±Î¸Î­ÏƒÎ¹Î¼Î¿Î¹ Ï†Î¯Î»Î¿Î¹)<br /> <b>C</b> - Î•Ï€Î¹Î»Î¿Î³Î­Ï‚ -foREVer- Script<br /> <b>F</b> - Î¦Î¯Î»Î¿Î¹<br /> <b>H</b> - Î‘ÏÏ‡Î¹ÎºÎ® Î£ÎµÎ»Î¯Î´Î±<br /> <b>I</b> - Î•Î¹ÏƒÎµÏÏ‡ÏŒÎ¼ÎµÎ½Î±<br /> <b>K</b> - Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ· Î‘Î³Î±Ï€Î·Î¼Î­Î½Î¿Ï…<br /> <b>L</b> - Î•Ï€Î¹Î»Î¿Î³Î® Ï„Î¿Ï… ÏƒÏ…Î½Î´Î­ÏƒÎ¼Î¿Ï… Î±Ï€Î¿ÏƒÏÎ½Î´ÎµÏƒÎ·Ï‚ (Ï€Î±Ï„Î®ÏƒÏ„Îµ Ï„Î¿ Enter Î±Î¼Î­ÏƒÏ‰Ï‚ Î¼ÎµÏ„Î¬ Î³Î¹Î± Î½Î± Î±Ï€Î¿ÏƒÏ…Î½Î´ÎµÎ¸ÎµÎ¯Ï„Îµ)<br /> <b>N</b> - Î•Î¹Î´Î¿Ï€Î¿Î¹Î®ÏƒÎµÎ¹Ï‚<br /> <b>P</b> - Î¤Î¿ Ï€ÏÎ¿Ï†Î¯Î» ÏƒÎ±Ï‚<br /> <b>T</b> - ÎœÎµÏ„Î¬Ï†ÏÎ±ÏƒÎ· ÎµÏ€Î¹Î»ÎµÎ³Î¼Î­Î½Î¿Ï… ÎºÎµÎ¹Î¼Î­Î½Î¿Ï…<br /> <b><escape></b> - ÎšÎ»ÎµÎ¯ÏƒÎ¹Î¼Î¿ Î±Î½Î±Î´Ï…ÏŒÎ¼ÎµÎ½Ï‰Î½ Î´Î·Î¼Î¹Î¿Ï…ÏÎ³Î·Î¼Î­Î½Î± Î±Ï€ÏŒ Ï„Î¿ -foREVer- Script<br /><br /><i>Î‘Ï€ÏŒ Ï„Î·Î½ Î±ÏÏ‡Î¹ÎºÎ® ÏƒÎµÎ»Î¯Î´Î±</i>:<br /> <b>f</b> Î® <b>l</b> - Î–Ï‰Î½Ï„Î±Î½Î­Ï‚ Ï„ÏÎ¿Ï†Î¿Î´Î¿Ï„Î®ÏƒÎµÎ¹Ï‚<br /> <b>i</b> - Î”Î·Î¼Î¿ÏƒÎ¹ÎµÏ…Î¼Î­Î½Î± ÏƒÏ„Î¿Î¹Ï‡ÎµÎ¯Î±<br /> <b>n</b> - Î¤ÏÎ¿Ï†Î¿Î´ÏŒÏ„Î·ÏƒÎ· ÎÎ­Ï‰Î½<br /> <b>p</b> - Î¦Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¯ÎµÏ‚<br /> <b>s</b> Î® <b>u</b> - Î‘Î½Î±Î½ÎµÏŽÏƒÎµÎ¹Ï‚ ÎºÎ±Ï„Î¬ÏƒÏ„Î±ÏƒÎ·Ï‚<br /><br /><i>Î‘Ï€ÏŒ Ï€ÏÎ¿Ï†Î¯Î»</i>:<br /> <b>i</b> - Î Î»Î·ÏÎ¿Ï†Î¿ÏÎ¯ÎµÏ‚<br /> <b>p</b> - Î¦Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¯ÎµÏ‚<br /> <b>w</b> - Î¤Î¿Î¯Ï‡Î¿Ï‚<br /> <b>x</b> - Î Î»Î±Î¯ÏƒÎ¹Î±<br /><br /><i>Î‘Ï€ÏŒ ÏƒÎµÎ»Î¯Î´ÎµÏ‚ Î¼Îµ Ï€Î»Î¿Î®Î³Î·ÏƒÎ· (Ï€ÏÎ¿Î·Î³Î¿ÏÎ¼ÎµÎ½Î·, ÎµÏ€ÏŒÎ¼ÎµÎ½Î·, Îº.Î¬.)</i><br /> <b><Î±ÏÎ¹ÏƒÏ„ÎµÏÏŒ Î²ÎµÎ»Î¬ÎºÎ¹></b> - Î ÏÎ¿Î·Î³Î¿ÏÎ¼ÎµÎ½Î·<br /> <b><Î´ÎµÎ¾Î¯ Î²ÎµÎ»Î¬ÎºÎ¹></b> - Î•Ï€ÏŒÎ¼ÎµÎ½Î·<br /> <b><shift> + <Î±ÏÎ¹ÏƒÏ„ÎµÏÏŒ Î²ÎµÎ»Î¬ÎºÎ¹></b> - Î‘ÏÏ‡Î¹ÎºÎ® (ÏŒÏ„Î±Î½ ÎµÎ¯Î½Î±Î¹ Î´Î¹Î±Î¸Î­ÏƒÎ¹Î¼Î·)<br /> <b><shift> + <Î´ÎµÎ¾Î¯ Î²ÎµÎ»Î¬ÎºÎ¹></b> - Î¤ÎµÎ»ÎµÏ…Ï„Î±Î¯Î± (ÏŒÏ„Î±Î½ ÎµÎ¯Î½Î±Î¹ Î´Î¹Î±Î¸Î­ÏƒÎ¹Î¼Î·)<br /><br /><i>ÎšÎ±Ï„Î¬ Ï„Î·Î½ Ï€ÏÎ¿Î²Î¿Î»Î® Î¬Î»Î¼Ï€Î¿Ï…Î¼/Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¯ÎµÏ‚:</i><br /> <b>a</b> - Î¦ÏŒÏÏ„Ï‰ÏƒÎ· ÏŒÎ»Ï‰Î½ Ï„Ï‰Î½ Î¼Î¹ÎºÏÎ¿Î³ÏÎ±Ï†Î¹ÏŽÎ½ (ÏŒÏ„Î±Î½ ÎµÎ¯Î½Î±Î¹ Î´Î¹Î±Î¸Î­ÏƒÎ¹Î¼Î¿)<br /> <b>b</b> - Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Î¼ÎµÎ³Î±Î»ÏÏ„ÎµÏÏ‰Î½ Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¹ÏŽÎ½<br /> <b>c</b> - Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï€Î±ÏÎ±Ï„Î·ÏÎ®ÏƒÎµÏ‰Î½<br /> <b>k</b> - Î•Ï€Î¹ÏƒÏ„ÏÎ¿Ï†Î® ÏƒÏ„Î¿ Î†Î»Î¼Ï€Î¿Ï…Î¼<br /> <b>m</b> - Î¦Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¯ÎµÏ‚ Î±Ï€ÏŒ (Î¬Ï„Î¿Î¼Î¿) ÎºÎ±Î¹ ÎµÎ¼Î­Î½Î±<br /><br /><i>ÎšÎ±Ï„Î¬ Ï„Î·Î½ Î´Î¹Î¬ÏÎºÎµÎ¹Î± Ï€ÏÏŒÏƒÏ†Î±Ï„Ï‰Î½ Î¬Î»Î¼Ï€Î¿Ï…Î¼ ÎºÎ±Î¹ Î±Î½ÎµÎ²Î±ÏƒÎ¼Î­Î½Ï‰Î½/ÏƒÎ·Î¼ÎµÎ¹Ï‰Î¼Î­Î½Ï‰Î½ Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¹ÏŽÎ½:</i><br /> <b>a</b> Î®  <b>r</b> - Î ÏÏŒÏƒÏ†Î±Ï„Î± Î†Î»Î¼Ï€Î¿Ï…Î¼<br /> <b>m</b> Î®  <b>u</b> - Î‘Î½ÎµÎ²Î±ÏƒÎ¼Î­Î½Î± Î±Ï€ÏŒ ÎºÎ¹Î½Î·Ï„ÏŒ<br /> <b>o</b> - Î¦Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¯ÎµÏ‚ Î¼Îµ Î¼Î­Î½Î±<br /> <b>p</b> - ÎŸÎ¹ Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¯ÎµÏ‚ Î¼Î¿Ï…<br /> <b>t</b> Î®  <b>f</b> - Î£Î·Î¼ÎµÎ¹Ï‰Î¼Î­Î½Î¿Î¹ Ï†Î¯Î»Î¿Î¹',
		'ConfShortcuts' : 'Î•Î½ÎµÏÎ³Î¿Ï€Î¿Î¯Î·ÏƒÎ· ÏƒÏ…Î½Ï„Î¿Î¼ÎµÏÏƒÎµÏ‰Î½ Ï€Î»Î·ÎºÏ„ÏÎ¿Î»Î¿Î³Î¯Î¿Ï….',
		'ConfSign' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï„Î¿Ï… Î¶Ï‰Î´Î¯Î¿Ï… Ï„Î¿Ï… Î±Ï„ÏŒÎ¼Î¿Ï… ÏƒÏ„Î¿ Ï€ÏÎ¿Ï†Î¯Î» Ï„Î¿Ï… (ÎµÏ†ÏŒÏƒÏ‰Î½ Î­Ï‡ÎµÎ¹ Î´ÏŽÏƒÎµÎ¹ Ï„Î·Î½ Ï€Î»Î®ÏÎ·Ï‚ Î·Î¼ÎµÏÎ¿Î¼Î·Î½Î¯Î± Î³Î­Î½Î½Î·ÏƒÎ·Ï‚).',
		'ConfTopBarFixed' : 'Î Î¬Î³Ï‰Î¼Î± Î¼Ï€Î¬ÏÎ±Ï‚ Î¼ÎµÎ½Î¿Ï, Î±ÎºÏŒÎ¼Î± ÎºÎ±Î¹ Î±Î½ Î· ÏƒÎµÎ»Î¯Î´Î± ÎºÏ…Î»Î¬ÎµÎ¹ Ï€ÏÎ¿Ï‚ Ï„Î± ÎºÎ¬Ï„Ï‰.',
		'ConfTopBarHoverOpacity' : 'ÎšÎ±Ï„Î¬ Ï„Î¿ Ï€Î­ÏÎ±ÏƒÎ¼Î± Ï„Î¿Ï… Ï€Î¿Î½Ï„Î¹ÎºÎ¹Î¿Ï',
		'ConfTopBarOpacity' : 'Î”Î¹Î±Ï†Î¬Î½ÎµÎ¹Î± Î¼Ï€Î¬ÏÎ±Ï‚ Î¼ÎµÎ½Î¿Ï ÎºÎ¿ÏÏ…Ï†Î®Ï‚',
		'ConfUpdates' : 'ÎˆÎ»ÎµÎ³Ï‡Î¿Ï‚ Userscripts.org ÎºÎ±Î¸Î·Î¼ÎµÏÎ¹Î½Î¬ Î³Î¹Î± ÎºÎ±Î¹Î½Î¿ÏÏÎ³Î¹ÎµÏ‚ ÎµÎ½Î·Î¼ÎµÏÏŽÏƒÎµÎ¹Ï‚ Ï„Î¿Ï… -foREVer- Script Î® <a href="#" id="fbfUpdateLink" onclick="return false;">Î­Î»ÎµÎ³Ï‡Î¿Ï‚ Ï„ÏŽÏÎ±</a>.',
		'DownloadVideo' : 'Î›Î®ÏˆÎ· Î’Î¯Î½Ï„ÎµÎ¿',
		'ExportICalendarFile' : 'Î•Î¾Î±Î³Ï‰Î³Î® Î±ÏÏ‡ÎµÎ¯Î¿Ï… iCalendar',
		'ExportICalendarFileWarning' : '(Î‘Ï…Ï„ÏŒ Î¸Î± Ï€Î¬ÏÎµÎ¹ Î±ÏÎºÎµÏ„Î® ÏŽÏÎ± Î±Î½ Î­Ï‡ÎµÏ„Îµ Ï€Î¿Î»Î»Î¿ÏÏ‚ Ï†Î¯Î»Î¿Ï…Ï‚)',
		'Facebook-foREVer-Conflict' : 'Î¤Î¿ Facebook-foREVer- ÎµÎ¯Î½Î±Î¹ Ï€Î»Î­Î¿Î½ Î³Î½Ï‰ÏƒÏ„ÏŒ ÏƒÎ±Î½ -foREVer- Script. Î›ÏŒÎ³Ï‰ Ï„Î·Ï‚ Î±Î»Î»Î±Î³Î®Ï‚ Ï„Î¿Ï… Î¿Î½ÏŒÎ¼Î±Ï„Î¿Ï‚ Î¸Î± Ï€ÏÎ­Ï€ÎµÎ¹ Î½Î± Î±Ï€ÎµÎ³ÎºÎ±Ï„Î±ÏƒÏ„Î®ÏƒÎµÏ„Îµ Ï‡ÎµÎ¹ÏÎ¿ÎºÎ¯Î½Î·Ï„Î± Ï„Î¿ -foREVer- Script Î±Ï€ÏŒ Ï„Î¿Î½ Ï€ÎµÏÎ¹Î·Î³Î·Ï„Î® ÏƒÎ±Ï‚, Î´Î¹Î±Ï†Î¿ÏÎµÏ„Î¹ÎºÎ¬ Ï„Î± Î´ÏÎ¿ Ï€ÏÎ¿Î³ÏÎ¬Î¼Î¼Î±Ï„Î± Î¸Î± ÏƒÏ…Î³ÎºÏÎ¿ÏÎ¿Î½Ï„Î±Î¹ Î¼ÎµÏ„Î±Î¾Ï Ï„Î¿Ï…Ï‚. Î•Î¬Î½ Î´ÎµÎ½ ÎµÎ¯ÏƒÎ±ÏƒÏ„Îµ ÏƒÎ¯Î³Î¿Ï…ÏÎ¿Î¹ Î³Î¹Î± Ï„Î¿ Ï€Ï‰Ï‚ Î½Î± Î±Ï€ÎµÎ³ÎºÎ±Ï„Î±ÏƒÏ„Î®ÏƒÎµÏ„Îµ Î­Î½Î± Ï€ÏÏŒÎ³ÏÎ±Î¼Î¼Î± userscript, <a %s>Ï€Î±Ï„Î®ÏƒÏ„Îµ ÎµÎ´ÏŽ Î³Î¹Î± Î¿Î´Î·Î³Î¯ÎµÏ‚</a>.',
		'fullAlbumLoaded' : 'Î· Ï†ÏŒÏÏ„Ï‰ÏƒÎ· Ï„Î¿Ï… Î¬Î»Î¼Ï€Î¿Ï…Î¼ Î¿Î»Î¿ÎºÎ»Î·ÏÏŽÎ¸Î·ÎºÎµ',
		'Import' : 'Î•Î¹ÏƒÎ±Î³Ï‰Î³Î®',
		'ImportConfirm' : 'Î•Î¯ÏƒÏ„Îµ ÏƒÎ¯Î³Î¿Ï…ÏÎ¿Ï‚ ÏŒÏ„Î¹ Î¸Î­Î»ÎµÏ„Îµ Î½Î± ÎµÎ¹ÏƒÎ¬Î³ÎµÏ„Îµ Î±Ï…Ï„Î­Ï‚ Ï„Î¹Ï‚ ÏÏ…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚;\nÎŸÎ¹ Ï„ÏÎ­Ï‡Î¿Ï…ÏƒÎµÏ‚ ÏÏ…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚ Î¸Î± Ï‡Î±Î¸Î¿ÏÎ½.',
		'ImportFailure' : 'Î ÏÎ¿Î­ÎºÏ…ÏˆÎµ ÏƒÏ†Î¬Î»Î¼Î± ÎºÎ±Ï„Î¬ Ï„Î·Î½ ÎµÎ¹ÏƒÎ±Î³Ï‰Î³Î® Ï„Ï‰Î½ ÏÏ…Î¸Î¼Î¯ÏƒÎµÏ‰Î½.',
		'ImportSuccess' : 'Î— ÎµÎ¹ÏƒÎ±Î³Ï‰Î³Î® Î¿Î»Î¿ÎºÎ»Î·ÏÏŽÎ¸Î·ÎºÎµ. Î˜Î­Î»ÎµÏ„Îµ Î½Î± Î±Î½Î±Î½ÎµÏŽÏƒÎµÏ„Îµ Ï„Î·Î½ ÏƒÎµÎ»Î¯Î´Î±;',
		'Left' : 'Î‘ÏÎ¹ÏƒÏ„ÎµÏÎ¬',
		'LoadingAllPhotos' : 'Î¦ÏŒÏÏ„Ï‰ÏƒÎ· ÏŒÎ»Ï‰Î½ Ï„Ï‰Î½ Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¹ÏŽÎ½...',
		'loadingFullAlbum' : 'Î¦ÏŒÏÏ„Ï‰ÏƒÎ· ÏŒÎ»Î¿Ï… Ï„Î¿Ï… Î¬Î»Î¼Ï€Î¿Ï…Î¼...',
		'LoadingPic' : 'Î¦ÏŒÏÏ„Ï‰ÏƒÎ· ÎµÎ¹ÎºÏŒÎ½Î±Ï‚...',
		'LoadPhotosWarning' : 'Î— Ï†ÏŒÏÏ„Ï‰ÏƒÎ· ÏŒÎ»Ï‰Î½ Ï„Ï‰Î½ Ï†Ï‰Ï„Î¿Î³ÏÎ±Ï†Î¹ÏŽÎ½ Î¼Ï€Î¿ÏÎµÎ¯ Î½Î± Ï€Î¬ÏÎµÎ¹ Î±ÏÎºÎµÏ„Î® ÏŽÏÎ±',
		'Months' : new Array('Î™Î±Î½Î¿Ï…Î¬ÏÎ¹Î¿Ï‚','Î¦ÎµÎ²ÏÎ¿Ï…Î¬ÏÎ¹Î¿Ï‚','ÎœÎ¬ÏÏ„Î¹Î¿Ï‚','Î‘Ï€ÏÎ¯Î»Î¹Î¿Ï‚','ÎœÎ¬Î¹Î¿Ï‚','Î™Î¿ÏÎ½Î¹Î¿Ï‚','Î™Î¿ÏÎ»Î¹Î¿Ï‚','Î‘ÏÎ³Î¿Ï…ÏƒÏ„Î¿Ï‚','Î£ÎµÏ€Ï„Î­Î¼Î²ÏÎ¹Î¿Ï‚','ÎŸÎºÏ„ÏŽÎ²ÏÎ¹Î¿Ï‚','ÎÎ¿Î­Î¼Î²ÏÎ¹Î¿Ï‚','Î”ÎµÎºÎ­Î¼Î²ÏÎ¹Î¿Ï‚'),
		'ProtocolSkype' : 'ÎšÎ»Î®ÏƒÎ· %s Î¼Î­ÏƒÏ‰ Skype',
		'ProtocolMSN' : 'Î£Ï…Î¶Î®Ï„Î·ÏƒÎ· Î¼Îµ %s Î¼Î­ÏƒÏ‰ Windows Live',
		'ProtocolYahoo' : 'Î£Ï…Î¶Î®Ï„Î·ÏƒÎ· Î¼Îµ %s Î¼Î­ÏƒÏ‰ Yahoo Messenger',
		'ProtocolGoogle' : 'Î£Ï…Î¶Î®Ï„Î·ÏƒÎ· Î¼Îµ %s Î¼Î­ÏƒÏ‰ Google Talk',
		'ReloadErrorPage' : 'Î Î±Ï„Î®ÏƒÏ„Îµ Î³Î¹Î± Î´Î¿ÎºÎ¹Î¼Î® Î¾Î±Î½Î¬ Î® Ï€ÎµÏÎ¹Î¼Î­Î½ÎµÏ„Îµ 5 Î´ÎµÏ…Ï„ÎµÏÏŒÎ»ÎµÏ€Ï„Î±',
		'Refresh' : 'Î‘Î½Î±Î½Î­Ï‰ÏƒÎ·',
		'Remove' : 'Î‘Ï†Î±Î¯ÏÎµÏƒÎ·',
		'Right' : 'Î”ÎµÎ¾Î¹Î¬',
		'ShowBigPictures' : 'Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Î¼ÎµÎ³Î±Î»ÏÏ„ÎµÏÏ‰Î½ ÎµÎ¹ÎºÏŒÎ½Ï‰Î½',
		'Signs' : new Array('Î‘Î¹Î³ÏŒÎºÎµÏÏ‰Ï‚','Î¥Î´ÏÎ¿Ï‡ÏŒÎ¿Ï‚','Î™Ï‡Î¸ÎµÎ¯Ï‚','ÎšÏÎ¹ÏŒÏ‚','Î¤Î±ÏÏÎ¿Ï‚','Î”Î¯Î´Ï…Î¼Î¿Ï‚','ÎšÎ±ÏÎºÎ¯Î½Î¿Ï‚','Î›Î­Ï‰Î½','Î Î±ÏÎ¸Î­Î½Î¿Ï‚','Î–Ï…Î³ÏŒÏ‚','Î£ÎºÎ¿ÏÏ€Î¹ÏŒÏ‚','Î¤Î¿Î¾ÏŒÏ„Î·Ï‚'),
		'today' : 'ÏƒÎ®Î¼ÎµÏÎ±',
		'Translators' : 'ÎœÎµÏ„Î±Ï†ÏÎ±ÏƒÏ„Î­Ï‚',
		'UpdateAvailable1' : 'Î¥Ï€Î¬ÏÏ‡ÎµÎ¹ ÎºÎ±Î¹Î½Î¿ÏÏÎ³Î¹Î± Î´Î¹Î±Î¸Î­ÏƒÎ¹Î¼Î· Î­ÎºÎ´Î¿ÏƒÎ· Ï„Î¿Ï… -foREVer- Script',
		'UpdateAvailable2' : 'Î˜Î­Î»ÎµÏ„Îµ Î½Î± Ï„Î·Î½ ÎµÎ½Î·Î¼ÎµÏÏŽÏƒÎµÏ„Îµ Ï„ÏŽÏÎ±;',
		'UpdateHomepage' : 'Î•Ï€Î¹ÏƒÏ„ÏÎ¿Ï†Î® ÏƒÏ„Î·Î½ Î‘ÏÏ‡Î¹ÎºÎ® Î£ÎµÎ»Î¯Î´Î±',
		'UpdateInstall' : 'Î•Î³ÎºÎ±Ï„Î¬ÏƒÏ„Î±ÏƒÎ· Ï„ÏŽÏÎ±',
		'UpdateTomorrow' : 'Î¥Ï€ÎµÎ½Î¸ÏÎ¼Î¹ÏƒÎ· Î±ÏÏÎ¹Î¿',
		'yearsOld' : '%s Ï‡ÏÎ¿Î½ÏŽÎ½'
	},

	// Slovak - Contributed by Peter Miksik (20101028)
	sk : {
		'_language' : 'Slovak',
		'AddToCalendar' : 'PridaÅ¥ do KalendÃ¡ra',
		'AddToGoogleCalendar' : 'PridaÅ¥ do KalendÃ¡ra Google',
		'all' : 'vÅ¡etko',
		'All' : 'VÅ¡etko',
		'AllPhotosLoaded' : 'VÅ¡etky fotografie naÄÃ­tanÃ©',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narodeniny %s',
		'BookmarkAdd' : 'PridaÅ¥ novÃº zÃ¡loÅ¾ku',
		'BookmarkExists' : 'TÃ¡to strÃ¡nka uÅ¾ je v zÃ¡loÅ¾kÃ¡ch.\n\nPrejdite na strÃ¡nku, ktorÃº chcete pridaÅ¥ medzi zÃ¡loÅ¾ky a skÃºste to znova.',
		'BookmarkNamePrompt' : 'Zadajte nÃ¡zov tejto zÃ¡loÅ¾ky:\n%s',
		'BookmarksConfirmRemoval' : 'Naozaj chcete odstrÃ¡niÅ¥ nasledujÃºce zÃ¡loÅ¾ky?',
		'BookmarksManage' : 'SpravovaÅ¥ zÃ¡loÅ¾ky',
		'BookmarksRemoveSelected' : 'OdstrÃ¡niÅ¥ vybranÃ© zÃ¡loÅ¾ky',
		'Bookmarks' : 'ZÃ¡loÅ¾ky',
		'BrowserUnsupported' : 'VÃ¡Å¡ prehliadaÄ tÃºto funkciu nepodporuje.',
		'CreatingFile' : 'Vytvorenie sÃºboru',
		'Close' : 'ZavrieÅ¥',
		'ConfigureFacebook-foREVer-' : 'KonfigurovaÅ¥ -foREVer- Script',
		'ConfigureInstructions' : 'VÅ¡etky zmeny sÃº ukladanÃ© okamÅ¾ite, ale niektorÃ© zmeny sa nemusia prejaviÅ¥ na kartÃ¡ch, ktorÃ© sÃº uÅ¾ otvorenÃ©.',
		'ConfAge' : 'ZobraziÅ¥ vek Ä¾udÃ­ v ich profiloch (ak poskytli celÃ½ dÃ¡tum narodenia)',
		'ConfApplicationWhitelist' : 'Zoznam povolenÃ½ch aplikÃ¡ciÃ­ â€“ zadajte ID aplikÃ¡ciÃ­, ktorÃ© chrÃ¡niÅ¥ pred skrytÃ­m. ID oddeÄ¾te medzerou.',
		'ConfAutoBigAlbumPictures' : 'Automaticky pri otvorenÃ­ strÃ¡nky zobraziÅ¥ vÃ¤ÄÅ¡ie obrÃ¡zky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky naÄÃ­taÅ¥ miniatÃºry vÅ¡etkÃ½ch obrÃ¡zkov v albume na jednej strÃ¡nke',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky naÄÃ­taÅ¥ miniatÃºry vÅ¡etkÃ½ch fotografiÃ­ s menovkou na jednej strÃ¡nke (karta Fotky v profiloch Ä¾udÃ­)',
		'ConfAutoReadMore' : 'Automaticky kliknÃºÅ¥ na odkazy "ÄÃ­taÅ¥ Äalej"',
		'ConfBigAlbumPictures' : 'PridaÅ¥ odkaz na strÃ¡nkach albumu na zobrazenie vÃ¤ÄÅ¡Ã­ch verziÃ­ vÅ¡etkÃ½ch obrÃ¡zkov na tejto strÃ¡nke',
		'ConfBigAlbumPicturesBorder' : 'PridaÅ¥ rÃ¡mÄek okolo vÃ¤ÄÅ¡Ã­ch verziÃ­ obrÃ¡zkov',
		'ConfBookmarks' : 'PridaÅ¥ na panel vrchnej ponuky podponuku ZÃ¡loÅ¾ky',
		'ConfBottomBarHoverOpacity' : 'Pri ukÃ¡zanÃ­ myÅ¡ou',
		'ConfBottomBarOpacity' : 'PriehÄ¾adnosÅ¥ spodnÃ©ho panela s ponukou',
		'ConfCalendarBirthDate' : 'ZahrnÃºÅ¥ narodeniny osoby do podrobnostÃ­ udalosti',
		'ConfCalendarFullName' : 'PouÅ¾iÅ¥ celÃ© meno osoby ako nÃ¡zov narodenÃ­n (namiesto krstnÃ©ho mena)',
		'ConfChatDifferentiate' : 'PouÅ¾iÅ¥ tuÄnÃ© pÃ­smo a kurzÃ­vu na rozlÃ­Å¡enie pripojenÃ½ch a neÄinnÃ½ch priateÄ¾ov',
		'ConfChatHideIdle' : 'SkryÅ¥ neÄinnÃ½ch priateÄ¾ov',
		'ConfDelayPopupPics' : 'PoÄkaÅ¥ 0,5 sekundy pred naÄÃ­tanÃ­m obrÃ¡zkov v kontextovom okne',
		'ConfDelayPopupPicsTimeout' : 'Oneskorenie pred zobrazenÃ­m obrÃ¡zkov v kontextovom okne, v milisekundÃ¡ch (predvolenÃ©=500):',
		'ConfDownloadVideo' : 'PridaÅ¥ odkaz na prevzatie videÃ­ zo strÃ¡nok s videom (moÅ¾no budete potrebovaÅ¥ <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">prehrÃ¡vaÄ FLV</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundÃ¡ch znova naÄÃ­taÅ¥ chybovÃ© strÃ¡nky aplikÃ¡ciÃ­',
		'ConfExport' : 'Ak chcete exportovaÅ¥ nastavenia, skopÃ­rujte dole uvedenÃ½ text a uloÅ¾te ho do sÃºboru.',
		'ConfExternalPopup' : 'ExternÃ© obrÃ¡zky plnej veÄ¾kosti v kontextovom okne <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : 'Jazyk pre Facebook -foREVer-',
		'ConfFacebookTimestamps' : 'ZobraziÅ¥ ÄasovÃ© znaÄky Facebooku (t. j. "pred 3 hodinami")',
		'ConfFBFTimestamps' : 'PridaÅ¥ ÄasovÃ© znaÄky skriptu Facebook -foREVer- za ÄasovÃ© znaÄky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'ZobraziÅ¥ ÄasovÃ© znaÄky skriptu Facebook -foREVer- v 24-hodinovom formÃ¡te',
		'ConfFriendRequestCountInTitle' : 'ZobraziÅ¥ v nÃ¡zve strÃ¡nky poÄet novÃ½ch Å¾iadostÃ­ o priateÄ¾stvo',
		'ConfGoogleApps' : 'VytvoriÅ¥ odkazy pre Google Calendar kompatibilnÃ© s Google Apps',
		'ConfGoogleAppsDomain' : 'DomÃ©na',
		'ConfGoogleCalendar' : 'PridaÅ¥ odkazy na zaradenie narodenÃ­n a udalostÃ­ do aplikÃ¡cie <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pre <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'SkryÅ¥ prÃ­spevky o aplikÃ¡ciÃ¡ch',
		'ConfHideEgos' : 'SkryÅ¥ vÅ¡etky sekcie "ego" (malo by skryÅ¥ vÃ¤ÄÅ¡inu odporÃºÄanÃ­ Facebooku)',
		'ConfHideEventStories' : 'SkryÅ¥ prÃ­spevky o udalostiach',
		'ConfHideFacebookCountInTitle' : 'SkryÅ¥ poÄet novÃ½ch sprÃ¡v na Facebooku',
		'ConfHideFriendStories' : 'SkryÅ¥ prÃ­spevky o priateÄ¾och',
		'ConfHideGroupStories' : 'SkryÅ¥ prÃ­spevky o skupinÃ¡ch',
		'ConfHideHovercards' : 'SkryÅ¥ kontextovÃ© oknÃ¡ zobrazujÃºce sa po ukÃ¡zanÃ­ myÅ¡ou na menÃ¡)',
		'ConfHideLikeStories' : 'SkryÅ¥ prÃ­spevky "PÃ¡Äi sa mi to"',
		'ConfHideLinkStories' : 'SkryÅ¥ prÃ­spevky o odkazoch',
		'ConfHideNoteStories' : 'SkryÅ¥ prÃ­spevky o poznÃ¡mkach',
		'ConfHidePhotoStories' : 'SkryÅ¥ prÃ­spevky o fotkÃ¡ch',
		'ConfHidePlaceStories' : 'SkryÅ¥ prÃ­spevky o miestach',
		'ConfHideProfilePicStories' : 'SkryÅ¥ prÃ­spevky o profilovÃ½ch fotkÃ¡ch',
		'ConfHideRead' : 'SkryÅ¥ poloÅ¾ky, ktorÃ© boli oznaÄenÃ© ako preÄÃ­tanÃ©',
		'ConfHideRelationshipStories' : 'SkryÅ¥ prÃ­spevky o stave vzÅ¥ahu',
		'ConfHideStatusStories' : 'SkryÅ¥ prÃ­spevky o statuse',
		'ConfHideVideoStories' : 'SkryÅ¥ prÃ­spevky o videÃ¡ch',
		'ConfHideWallStories' : 'SkryÅ¥ prÃ­spevky o nÃ¡stenkÃ¡ch',
		'ConfHomeBeta' : 'ZobraziÅ¥ ÄasÅ¥ Beta Tester',
		'ConfHomeChat' : 'ZobraziÅ¥ ÄasÅ¥ Chat',
		'ConfHomeChatNames' : 'ZobraziÅ¥ menÃ¡ v Äasti Chat',
		'ConfHomeEvents' : 'ZobraziÅ¥ ÄasÅ¥ Udalosti',
		'ConfHomeFindFriends' : 'ZobraziÅ¥ ÄasÅ¥ Spojte sa s priateÄ¾mi',
		'ConfHomeLeftAlign' : 'ZarovnaÅ¥ obsah Ãºvodnej strÃ¡nky naÄ¾avo',
		'ConfHomeLeftColumn' : 'ZobraziÅ¥ Ä¾avÃ½ stÄºpec',
		'ConfHomeLeftColumnFixed' : 'NechaÅ¥ Ä¾avÃ½ stÄºpec viditeÄ¾nÃ½ aj pri posÃºvanÃ­ nadol',
		'ConfHomeLink' : 'ZobraziÅ¥ vo vrchnej ponuke odkaz na ÃºvodnÃº strÃ¡nku',
		'ConfHomeNavigation' : 'ZobraziÅ¥ ÄasÅ¥ NavigÃ¡cia',
		'ConfHomePokes' : 'ZobraziÅ¥ ÄasÅ¥ Å tuchnutia',
		'ConfHomeProfile' : 'ZobraziÅ¥ ÄasÅ¥ Profil',
		'ConfHomeRecommendations' : 'ZobraziÅ¥ odporÃºÄania (Ä½udia, ktorÃ½ch poznÃ¡te; OdporÃºÄanÃ© strÃ¡nky atÄ.)',
		'ConfHomeRequests' : 'ZobraziÅ¥ ÄasÅ¥ Å½iadosti',
		'ConfHomeRightColumn' : 'ZobraziÅ¥ pravÃ½ stÄºpec',
		'ConfHomeStretch' : 'RoztiahnuÅ¥ ÃºvodnÃº strÃ¡nku na Å¡Ã­rku okna prehÄ¾adÃ¡vaÄa',
		'ConfHomeStretchComments' : 'RoztiahnuÅ¥ komentÃ¡re na hlavnej strÃ¡nke',
		'ConfiCalendar' : 'PridaÅ¥ odkazy na prevzatie sÃºboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> so vÅ¡etkÃ½mi narodeninami',
		'ConfImport' : 'Ak chcete neskÃ´r importovaÅ¥ nastavenia, prepÃ­Å¡te dole uvedenÃ½ text tÃ½m, ktorÃ½ ste predtÃ½m uloÅ¾ili, a kliknite na "Import".',
		'ConfInboxCountInTitle' : 'ZobraziÅ¥ v nÃ¡zve strÃ¡nky poÄet nepreÄÃ­tanÃ½ch prijatÃ½ch sprÃ¡v',
		'ConfLogoutLink' : 'PridaÅ¥ do vrchnej ponuky odkaz na odhlÃ¡senie',
		'ConfNotificationCountInTitle' : 'ZobraziÅ¥ v nÃ¡zve strÃ¡nky poÄet novÃ½ch upozornenÃ­',
		'ConfNewTabSearch' : 'Pri vyhÄ¾adÃ¡vanÃ­ otvoriÅ¥ stlaÄenÃ­m Ctrl+Enter vÃ½sledky hÄ¾adania na novej karte/v novom okne',
		'ConfPageTitle' : 'OdstrÃ¡niÅ¥ "Facebook |" z nÃ¡zvu vÅ¡etkÃ½ch strÃ¡nok',
		'ConfPhotoPopup' : 'VÃ¤ÄÅ¡ie verzie fotiek v kontextovom okne po ukÃ¡zanÃ­ myÅ¡ou',
		'ConfPopupAutoClose' : 'Automaticky zatvÃ¡raÅ¥ kontextovÃ© oknÃ¡ s obrÃ¡zkami',
		'ConfPopupSmartAutoClose' : 'ZabrÃ¡niÅ¥ autom. zatvoreniu kontextovÃ½ch okien s obrÃ¡zkom, ak je na nich kurzor myÅ¡i',
		'ConfPopupPosition' : 'Umiestnenie kontextovÃ©ho okna s obrÃ¡zkom',
		'ConfPopupWhileTagging' : 'ZobraziÅ¥ kontextovÃ© oknÃ¡ s obrÃ¡zkami aj pri oznaÄovanÃ­',
		'ConfProcessInterval' : 'Interval spracovania strÃ¡nky, v milisekundÃ¡ch (predvolenÃ©=1000):',
		'ConfProfileLink' : 'ZobraziÅ¥ na vrchnom paneli s ponukou odkaz na profil',
		'ConfProfilePicPopup' : 'VÃ¤ÄÅ¡ie verzie profilovÃ½ch fotiek v kontextovom okne po ukÃ¡zanÃ­ myÅ¡ou',
		'ConfProtocolLinks' : 'ZmeniÅ¥ ID pre okamÅ¾itÃ© sprÃ¡vy na odkazy spÃºÅ¡Å¥ajÃºce konverzÃ¡ciu (Google Talk, Windows Live atÄ.)',
		'ConfSectionAbout' : 'ÄŒo je Facebook -foREVer-',
		'ConfSectionAdvanced' : 'Spresnenie',
		'ConfSectionEvents' : 'Narodeniny/Udalosti',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Novinky',
		'ConfSectionHomePage' : 'ÃšvodnÃ¡ strÃ¡nka',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'Ponuky/Chat',
		'ConfSectionOther' : 'ÄŽalÅ¡ie moÅ¾nosti',
		'ConfSectionPageTitle' : 'NÃ¡zov strÃ¡nky',
		'ConfSectionPictures' : 'ObrÃ¡zky',
		'ConfSectionShortcuts' : 'KlÃ¡vesovÃ© skratky',
		'ConfSecureLinks' : 'VynÃºtiÅ¥ zmenu odkazov Facebooku na strÃ¡nky HTTPS',
		'ConfShortcutList' : '<b>KlÃ¡vesovÃ© skratky</b> (rozliÅ¡ujÃº sa malÃ©/veÄ¾kÃ© pÃ­smenÃ¡):<br /><br /><i>Z Ä¾ubovoÄ¾nej strÃ¡nky:</i><br /> <b>A</b> â€“ Albumy/fotky<br /> <b>B</b> â€“ PrepnÃºÅ¥ zoznam priateÄ¾ov (online priatelia)<br /> <b>C</b> â€“ KonfigurÃ¡cia skriptu Facebook -foREVer-<br /> <b>D</b> â€“ Narodeniny<br /> <b>E</b> â€“ Udalosti<br /> <b>F</b> â€“ Priatelia<br /> <b>H</b> â€“ Domov<br /> <b>I</b> â€“ PrijatÃ© sprÃ¡vy<br /> <b>L</b> â€“ VybraÅ¥ odkaz OdhlÃ¡siÅ¥ sa (po odhlÃ¡senÃ­ stlaÄte Enter)<br /> <b>N</b> â€“ Upozornenia<br /> <b>P</b> â€“ VÃ¡Å¡ profil<br /> <b>R</b> â€“ Å½iadosti<br /> <b>S</b> â€“ PreskoÄiÅ¥ na pole HÄ¾adaÅ¥<br /> <b>T</b> â€“ PreloÅ¾iÅ¥ vybranÃ½ text<br /> <b>?</b> â€“ ZobraziÅ¥ informÃ¡cie o ladenÃ­ skriptu Facebook -foREVer-<br /> <b><Esc></b> â€“ ZavrieÅ¥ kontextovÃ© oknÃ¡ vytvorenÃ© skriptom Facebook -foREVer-<br /><br /><i>Zo strÃ¡nky Domov (filtre)</i>:<br /> <b>a</b> â€“ StrÃ¡nky<br /> <b>f</b> â€“ Aktuality<br /> <b>g</b> â€“ Skupiny<br /> <b>l</b> â€“ Odkazy<br /> <b>n</b> â€“ Novinky<br /> <b>p</b> â€“ Fotky<br /> <b>s</b> alebo <b>u</b> â€“ ÄŒo robia ostatnÃ­<br /> <b>t</b> â€“ PoznÃ¡mky<br /> <b>v</b> â€“ VideÃ¡<br /><br /><i>Z profilov</i>:<br /> <b>i</b> â€“ InformÃ¡cie<br /> <b>p</b> â€“ Fotky<br /> <b>w</b> â€“ NÃ¡stenka<br /> <b>x</b> â€“ PrieÄinky<br /><br /><i>Zo strÃ¡nok s navigÃ¡ciou (dozadu, dopredu atÄ.)</i><br /> <b><Å¡Ã­pka doÄ¾ava></b> â€“ Dozadu<br /> <b><Å¡Ã­pka doprava></b> â€“ Dopredu<br /> <b><shift> + <Å¡Ã­pka doÄ¾ava></b> â€“ PrvÃ¡ (ak je k dispozÃ­cii)<br /> <b><shift> + <Å¡Ã­pka doprava></b> â€“ PoslednÃ¡ (ak je k dispozÃ­cii)<br /><br /><i>PoÄas prezerania albumov/fotiek:</i><br /> <b>a</b> â€“ NaÄÃ­taÅ¥ vÅ¡etky miniatÃºry (ak je k dispozÃ­cii)<br /> <b>b</b> â€“ ZobraziÅ¥ veÄ¾kÃ© obrÃ¡zky<br /> <b>c</b> â€“ ZobraziÅ¥ komentÃ¡re<br /> <b>k</b> â€“ SpÃ¤Å¥ na album<br /> <b>m</b> â€“ Fotky osoby a mÅˆa<br /><br /><i>PoÄas prezerania najnovÅ¡Ã­ch albumov a nahratÃ½ch fotiek/fotiek s menovkou:</i><br /> <b>a</b> or  <b>r</b> â€“ NajnovÅ¡ie albumy<br /> <b>m</b> alebo  <b>u</b> â€“ NahratÃ© z mobilu<br /> <b>o</b> â€“ Fotky, na ktorÃ½ch som ja<br /> <b>p</b> â€“ Moje fotky<br /> <b>t</b> alebo  <b>f</b> Menovky priateÄ¾ov',
		'ConfShortcuts' : 'PovoliÅ¥ klÃ¡vesovÃ© skratky',
		'ConfSign' : 'ZobraziÅ¥ znamenie Ä¾udÃ­ v ich profiloch (ak poskytli svoj dÃ¡tum narodenia)',
		'ConfTopBarFixed' : 'VÅ¾dy zobraziÅ¥ vrchnÃ½ panel s ponukou aj pri posÃºvanÃ­ strÃ¡nky nadol',
		'ConfTopBarHoverOpacity' : 'Pri ukÃ¡zanÃ­ myÅ¡ou',
		'ConfTopBarOpacity' : 'PriehÄ¾adnosÅ¥ vrchnÃ©ho panela s ponukou',
		'ConfUpdates' : 'Denne na Userscripts.org overovaÅ¥ aktualizÃ¡cie pre Facebook -foREVer-, prÃ­padne <a href="#" id="fbfUpdateLink" onclick="return false;">skontrolovaÅ¥ teraz</a>.',
		'DownloadVideo' : 'PrevziaÅ¥ video',
		'ExportICalendarFile' : 'ExportovaÅ¥ sÃºbor iCalendar',
		'ExportICalendarFileWarning' : '(Ak mÃ¡te mnoho priateÄ¾ov, mÃ´Å¾e to chvÃ­Ä¾u trvaÅ¥.)',
		'Facebook-foREVer-Conflict' : 'Facebook -foREVer- sa odteraz nazÃ½va -foREVer- Script.<br /><br />PretoÅ¾e sa zmenil nÃ¡zov, je potrebnÃ© ruÄne odinÅ¡talovaÅ¥ Facebook -foREVer- z prehliadaÄa, inak budÃº v konflikte dva skripty medzi sebou navzÃ¡jom.<br /><br />Ak neviete, ako skript odinÅ¡talovaÅ¥, <a %s>kliknutÃ­m sem otvorte pokyny</a>.',
		'fullAlbumLoaded' : 'celÃ½ album naÄÃ­tanÃ½',
		'Import' : 'Import',
		'ImportConfirm' : 'Naozaj chcete importovaÅ¥ tieto nastavenia?\nVaÅ¡e sÃºÄasnÃ© nastavenia budÃº stratenÃ©.',
		'ImportFailure' : 'PoÄas pokusu o import nastavenÃ­ doÅ¡lo k chybe.',
		'ImportSuccess' : 'Import dokonÄenÃ½. Chcete obnoviÅ¥ strÃ¡nku?',
		'Left' : 'VÄ¾avo',
		'LoadingAllPhotos' : 'NaÄÃ­tavajÃº sa vÅ¡etky fotky...',
		'loadingFullAlbum' : 'NaÄÃ­tava sa celÃ½ album...',
		'LoadingPic' : 'NaÄÃ­tava sa obrÃ¡zok...',
		'LoadPhotosWarning' : 'NaÄÃ­tavanie vÅ¡etkÃ½ch fotiek mÃ´Å¾e chvÃ­Ä¾u trvaÅ¥',
		'Months' : new Array('JanuÃ¡r','FebruÃ¡r','Marec','AprÃ­l','MÃ¡j','JÃºn','JÃºl','August','September','OktÃ³ber','November','December'),
		'ProtocolSkype' : 'VolaÅ¥ %s pomocou Skype',
		'ProtocolMSN' : 'ChatovaÅ¥ s %s pomocou Windows Live',
		'ProtocolYahoo' : 'ChatovaÅ¥ s %s pomocou Yahoo Messenger',
		'ProtocolGoogle' : 'ChatovaÅ¥ s %s pomocou Google Talk',
		'ReloadErrorPage' : 'Kliknite na SkÃºsiÅ¥ znova alebo poÄkajte 5 sekÃºnd',
		'Refresh' : 'ObnoviÅ¥',
		'Remove' : 'OdstrÃ¡niÅ¥',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'ZobraziÅ¥ veÄ¾kÃ© obrÃ¡zky',
		'Signs' : new Array('KozoroÅ¾ec','VodnÃ¡r','Ryba','Baran','BÃ½k','BlÃ­Å¾enci','Rak','Lev','Panna','VÃ¡hy','Å korpiÃ³n','Strelec'),
		'today' : 'dnes',
		'Translators' : 'Prekladatelia',
		'UpdateAvailable1' : 'K dispozÃ­cii je aktualizÃ¡cia skriptu Facebook -foREVer-.',
		'UpdateAvailable2' : 'Chcete aktualizovaÅ¥ teraz?',
		'UpdateHomepage' : 'PrejsÅ¥ na dom. strÃ¡nku',
		'UpdateInstall' : 'NainÅ¡talovaÅ¥',
		'UpdateTomorrow' : 'PripomenÃºÅ¥ zajtra',
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
		'CreatingFile' : 'Folder crÃ«eren',
		'Close' : 'Sluit',
		'ConfigureFacebook-foREVer-' : 'Configureer -foREVer- Script',
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
		'ConfChatDifferentiate' : 'Gebruik dikgedrukt en cursief om te differentiÃ«ren tussen beschikbaar en niet beschikbaar.',
		'ConfChatHideIdle' : 'Verberg niet beschikbare vrienden.',
		'ConfDelayPopupPics' : 'Een vertraging toevoegen voor het laten zien van popup foto\'s.',
		'ConfDelayPopupPicsTimeout' : 'Vertraging voor het laten zien van popup foto\'s, in milliseconden (standaard=500):',
		'ConfDownloadVideo' : 'Een link toevoegen voor het downloaden van videos van video pagina\'s. (Je hebt misschien een <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV speler</a> nodig)',
		'ConfErrorPageReload' : 'Automatisch toepassingen error pagina\'s reloaden.',
		'ConfExternalPopup' : 'Popup versies in volledige grootte van externe illustraties. <sup>experimenteel</sup>',
		'ConfFacebook-foREVer-Language' : 'Taal voor -foREVer- Script',
		'ConfFacebookTimestamps' : 'Laat Facebook timestamps zien (bijv. "3 uur geleden").',
		'ConfFBFTimestamps' : '-foREVer- Script timestamps toevoegen na Facebook timestamps (bijv. "11:45").',
		'ConfFBFTimestamps24' : 'Laat -foREVer- Script timestamps zien in 24-uurs formaat.',
		'ConfGoogleApps' : 'CrÃ«er Google Calendar links die werken met Google Apps.',
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
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - -foREVer- Script configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show -foREVer- Script debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by -foREVer- Script<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Toestaan van sneltoetsen.',
		'ConfSign' : 'Laat mensen hun sterrenbeeld op hun profiel zien (wanneer zij hun geboortedatum aangeven).',
		'ConfTopBarFixed' : 'Behoud de top meny bar op het scherm, zelfs bij het naar beneden scrollen.',
		'ConfTopBarHoverOpacity' : 'Bij overscrollen',
		'ConfTopBarOpacity' : 'Top menu bar transparentie',
		'ConfUpdates' : 'Check Userscripts.org dagelijks voor updates naar -foREVer- Script. Of <a href="#" id="fbfUpdateLink" onclick="return false;">check nu</a>.',
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
		'UpdateAvailable1' : 'Een update is beschikbaar voor -foREVer- Script',
		'UpdateAvailable2' : 'Will je nu updaten?',
		'UpdateHomepage' : 'Ga naar startpagina',
		'UpdateInstall' : 'Nu installeren',
		'UpdateTomorrow' : 'Herinner me morgen',
		'yearsOld' : '%s jaar oud'
	},

	// Chinese (Taiwan) - Contributed by By Acedia.Liu (20100422)
	zh_tw : {
		'_language' : 'Chinese (Taiwan)',
		'AddToCalendar' : 'åŠ åˆ°æ—¥æ›†',
		'AddToGoogleCalendar' : 'åŠ åˆ°Googleæ—¥æ›†',
		'all' : 'å…¨éƒ¨',
		'All' : 'å…¨éƒ¨',
		'AllPhotosLoaded' : 'è®€å–æ‰€æœ‰ç›¸ç‰‡',
		'Automatic' : 'è‡ªå‹•',
		'Birthday' : '%s\çš„ç”Ÿæ—¥',
		'BookmarkAdd' : 'å¢žåŠ æ–°çš„æ›¸ç±¤',
		'BookmarkConfirmRemoval' : 'æ‚¨ç¢ºå®šè¦ç§»é™¤æ›¸ç±¤å—Žï¼Ÿ "%s"?',
		'BookmarkDoesNotExist' : 'æ­¤é é¢ç„¡æ³•åŠ å…¥æ›¸ç±¤ã€‚\n\nè½‰åˆ°æ‚¨è¦åˆªé™¤çš„é é¢ï¼Œç„¶å¾Œå†è©¦ä¸€æ¬¡ã€‚',
		'BookmarkExists' : 'æ­¤é å·²åŠ å…¥æ›¸ç±¤ã€‚\n\nè½‰åˆ°æ‚¨è¦åŠ å…¥æ›¸ç±¤çš„é é¢ï¼Œç„¶å¾Œå†è©¦ä¸€æ¬¡ã€‚',
		'BookmarkNamePrompt' : 'è¼¸å…¥æ–°çš„æ›¸ç±¤åç¨±ï¼š\n%s',
		'BookmarkRemove' : 'ç§»é™¤æ›¸ç±¤',
		'Bookmarks' : 'æˆ‘çš„æœ€æ„›',
		'BrowserUnsupported' : 'æ‚¨çš„ç€è¦½å™¨å°šæœªæ”¯æ´æ­¤åŠŸèƒ½ã€‚',
		'CreatingFile' : 'å‰µå»ºæ–‡ä»¶',
		'Close' : 'é—œé–‰',
		'ConfigureFacebook-foREVer-' : 'è¨­å®š -foREVer- Script',
		'ConfigureInstructions' : 'æ”¹è®Šè¨­å®šéƒ½æ‡‰ç«‹å³å­˜æª”ï¼Œå¦‚é‡åˆ°éƒ¨ä»½åŠŸèƒ½æœªç”Ÿæ•ˆï¼Œè¡¨ç¤ºè©²åŠŸèƒ½æˆ–è¨±å·²é–‹æ”¾ã€‚',
		'ConfAge' : 'æ–¼å€‹äººè³‡æ–™é¡¯ç¤ºæœ‹å‹\çš„å¹´é½¡ï¼ˆå¦‚æžœä»–å€‘è¨­å®šæ­£ç¢ºç„¡èª¤çš„è©±ï¼‰ã€‚',
		'ConfAutoBigAlbumPictures' : 'é–‹å•Ÿç›¸ç°¿æ™‚è‡ªå‹•é¡¯ç¤ºè¼ƒå¤§çš„ç›¸ç°¿åœ–ç‰‡ã€‚',
		'ConfAutoLoadFullAlbum' : 'æ–¼å–®ä¸€é é¢ä¸­è‡ªå‹•é¡¯ç¤ºæ‰€æœ‰ç›¸ç‰‡çš„ç¸®åœ–',
		'ConfAutoLoadTaggedPhotos' : 'æ–¼å–®ä¸€é é¢ä¸­è‡ªå‹•é¡¯ç¤ºæ‰€æœ‰æ¨™è¨˜çš„ç›¸ç‰‡ç¸®åœ– (æœ‹å‹\çš„å€‹äººè³‡æ–™æ¨™ç±¤ä¸Š)ã€‚',
		'ConfAutoReadMore' : 'è‡ªå‹•é»žé¸"ç¹¼çºŒé–±è®€"é€£çµã€‚',
		'ConfBigAlbumPictures' : 'æ–°å¢žä¸€å€‹é¡¯ç¤ºè¼ƒå¤§åœ–ç‰‡ç‰ˆæœ¬çš„é€£çµåœ¨ç›¸æœ¬ä¸Šã€‚',
		'ConfBookmarks' : 'åœ¨é ‚ç«¯çš„é¸å–®ä¸­æ–°å¢žã€ŽåŠ å…¥æ›¸ç±¤ã€çš„é¸å–®',
		'ConfBottomBarHoverOpacity' : 'On mouse-over',
		'ConfBottomBarOpacity' : 'åº•éƒ¨é¸å–®çš„é€æ˜Žåº¦ã€‚',
		'ConfCalendarBirthDate' : 'åŒ…æ‹¬æœ‹å‹\çš„ç”Ÿæ—¥æ´»å‹•è©³æƒ…ã€‚',
		'ConfCalendarFullName' : 'ä½¿ç”¨æœ‹å‹\çš„å…¨åä½œç‚ºç”Ÿæ—¥çš„æ¨™é¡Œ (è€Œä¸æ˜¯åªæœ‰first name)ã€‚',
		'ConfChatDifferentiate' : 'ä½¿ç”¨ç²—é«”å’Œæ–œé«”å€åˆ†åœ¨ç·šåŠé–’ç½®çš„å¥½å‹ã€‚',
		'ConfChatHideIdle' : 'éš±è—é–’ç½®çš„æœ‹å‹ã€‚',
		'ConfDelayPopupPics' : 'é¡¯ç¤ºå½ˆå‡ºçš„åœ–ç‰‡å‰ï¼Œå¢žåŠ ä¸€å€‹çŸ­æš«çš„ç·©è¡æ™‚é–“ã€‚',
		'ConfDelayPopupPicsTimeout' : 'é¡¯ç¤ºå½ˆå‡ºçš„åœ–ç‰‡å‰å»¶é²æ™‚é–“ï¼Œä»¥æ¯«ç§’è¨ˆç®—(é è¨­å€¼=500):',
		'ConfDownloadVideo' : 'åœ¨æœ‰çŸ­ç‰‡çš„é é¢æ–°å¢žä¸€å€‹ä¸‹è¼‰é€£çµ (ä½ ä¹Ÿè¨±éœ€è¦ <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'æ‡‰ç”¨ç¨‹å¼éŒ¯èª¤çš„å¾Œ5ç§’è‡ªå‹•é‡æ–°è®€å–ã€‚',
		'ConfExport' : 'åŒ¯å‡ºæ‚¨çš„ç›¸é—œè¨­å®šï¼Œè¤‡è£½ä¸‹åˆ—æ–‡å­—ï¼Œä¸¦å¦å­˜æ–¼ä¸€å€‹æ–‡ä»¶æª”æ¡ˆã€‚',
		'ConfExternalPopup' : 'å½ˆå‡ºå…¨å°ºå¯¸çš„å¤–é€£åœ–ç‰‡ã€‚ <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : '-foREVer- Scriptçš„èªžè¨€é¸é …',
		'ConfFacebookTimestamps' : 'é¡¯ç¤ºFacebookåŽŸä¾†çš„æ™‚é–“æˆ³è¨˜ (eg. "3 hours ago").',
		'ConfFBFTimestamps' : 'æ–°å¢ž-foREVer- Scriptçš„é¡¯ç¤ºæ™‚é–“æˆ³è¨˜ (eg. "11:45").',
		'ConfFBFTimestamps24' : '-foREVer- Scriptçš„æ™‚é–“æˆ³è¨˜æŽ¡ç”¨24å°æ™‚åˆ¶ã€‚',
		'ConfFriendRequestCountInTitle' : 'åœ¨ç¶²é æ¨™é¡Œé¡¯ç¤ºæ–°å¢žå¥½å‹çš„è«‹æ±‚ã€‚',
		'ConfGoogleApps' : 'å‰µå»ºGoogleæ—¥æ›†é€£çµä½¿å…¶èˆ‡Googleçš„æ‡‰ç”¨æœå‹™ç›¸å®¹ã€‚',
		'ConfGoogleAppsDomain' : 'åŸŸå',
		'ConfGoogleCalendar' : 'æ–°å¢žä¸€å€‹ç”Ÿæ—¥åŠæ´»å‹•çš„é€£çµ <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'èªžè¨€ <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'éš±è—æ‡‰ç”¨ç¨‹å¼ç´€éŒ„ã€‚',
		'ConfHideEventStories' : 'éš±è—äº‹ä»¶ç´€éŒ„ã€‚',
		'ConfHideFanStories' : 'éš±è—ç²‰çµ²ç´€éŒ„ã€‚',
		'ConfHideFriendStories' : 'éš±è—æœ‹å‹ç´€éŒ„ã€‚',
		'ConfHideGroupStories' : 'éš±è—åœ˜é«”ç´€éŒ„ã€‚',
		'ConfHideLinkStories' : 'éš±è—é€£çµç´€éŒ„ã€‚',
		'ConfHidePhotoStories' : 'éš±è—åœ–ç‰‡ç´€éŒ„ã€‚',
		'ConfHideProfilePicStories' : 'éš±è—å€‹äººè³‡æ–™çš„åœ–ç‰‡ç´€éŒ„ã€‚',
		'ConfHideRead' : 'éš±è—æ¨™è¨˜å·²è®€å¾—å³æ™‚å‹•æ…‹é …ç›®ã€‚',
		'ConfHideRelationshipStories' : 'éš±è—é—œè¯ç´€éŒ„ã€‚',
		'ConfHideStatusStories' : 'éš±è—èº«ä»½ç´€éŒ„ã€‚',
		'ConfHideVideoStories' : 'éš±è—çŸ­ç‰‡ç´€éŒ„ã€‚',
		'ConfHideWallStories' : 'éš±è—å¡—é´‰ç‰†ç´€éŒ„ã€‚',
		'ConfHomeChat' : 'é¡¯ç¤ºèŠå¤©éƒ¨ä»½ã€‚',
		'ConfHomeEvents' : 'é¡¯ç¤ºéƒ¨ä»½æ´»å‹•ã€‚',
		'ConfHomeFindFriends' : 'é¡¯ç¤ºæœ‹å‹é€£çµã€‚',
		'ConfHomeLeftAlign' : 'é¦–é å‘å·¦å°é½Šã€‚',
		'ConfHomeLeftColumn' : 'é¡¯ç¤ºå·¦å´æ¬„ä½ã€‚',
		'ConfHomeLeftColumnFixed' : 'å‘ä¸‹æ»¾å‹•æ™‚ï¼Œä¿æŒå·¦å´æ¬„ä½å¯è¦‹ã€‚',
		'ConfHomeLink' : 'åœ¨é ‚ç«¯çš„é¸å–®ä¸­ï¼Œé¡¯ç¤ºé¦–é çš„é€£çµã€‚',
		'ConfHomePeopleYouMayKnow' : 'é¡¯ç¤ºéƒ¨ä»½å»ºè­°ã€‚',
		'ConfHomeNavigation' : 'é¡¯ç¤ºå°Žè¦½éƒ¨ä»½ã€‚',
		'ConfHomePokes' : 'é¡¯ç¤ºæˆ³ä¸€ä¸‹çš„éƒ¨ä»½ã€‚',
		'ConfHomeProfile' : 'é¡¯ç¤ºå€‹äººè³‡æ–™éƒ¨ä»½ã€‚',
		'ConfHomeRequests' : 'é¡¯ç¤ºéƒ¨ä»½è¦æ±‚ã€‚',
		'ConfHomeRightColumn' : 'é¡¯ç¤ºå³æ¬„ã€‚',
		'ConfHomeStretch' : 'åœ¨ç€è¦½å™¨ä¸­å»¶ä¼¸é¦–é çš„å¯¬åº¦ã€‚',
		'ConfiCalendar' : 'å¢žåŠ ä¸€å€‹ä¸‹è¼‰é€£çµ <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> file with all birthdays.',
		'ConfImport' : 'å¦‚æžœåœ¨å°‡ä¾†è¦åŒ¯å…¥èˆŠæœ‰è¨­å®šï¼Œç›´æŽ¥å°‡ä¹‹å‰çš„ä¿å­˜è¨­å®šè¦†è“‹åº•ä¸‹çš„æ–‡å­—ï¼Œç„¶å¾Œé¸æ“‡"Importï¼ˆåŒ¯å…¥ï¼‰"',
		'ConfInboxCountInTitle' : 'åœ¨ä¿¡ç®±é é¢é¡¯ç¤ºæœªè®€çš„éƒµä»¶æ•¸é‡',
		'ConfLogoutLink' : 'åœ¨é ‚éƒ¨çš„é¸å–®ä¸­åŠ å…¥ã€Žç™»å‡ºã€é€£çµã€‚',
		'ConfNotificationCountInTitle' : 'åœ¨ç¶²é æ¨™é¡Œé¡¯ç¤ºæ–°çš„é€šçŸ¥ã€‚',
		'ConfNewTabSearch' : 'ä½¿ç”¨ CTRL + Enter æœç´¢æ™‚ï¼Œåœ¨æ–°çš„é é¢é¡¯ç¤ºæœå°‹çµæžœã€‚',
		'ConfPageTitle' : 'ç§»é™¤æ¯å€‹é é¢çš„ "Facebook |" å­—æ¨£ã€‚',
		'ConfPhotoPopup' : 'æ»‘é¼ åœæ–¼ä¸Šæ–¹ï¼Œè‡ªå‹•å½ˆå‡ºè¼ƒå¤§çš„åœ–ç‰‡ã€‚',
		'ConfPopupAutoClose' : 'é—œé–‰è‡ªå‹•å½ˆå‡ºåœ–ç‰‡ã€‚',
		'ConfPopupSmartAutoClose' : 'å¦‚æžœæ»‘é¼ ç§»å‹•åˆ°æ™‚ï¼Œé˜²æ­¢å½ˆå‡ºåœ–ç‰‡è‡ªå‹•é—œé–‰ã€‚',
		'ConfPopupPosition' : 'å½ˆå‡ºåœ–ç‰‡çš„é¡¯ç¤ºä½ç½®ã€‚',
		'ConfProcessInterval' : 'é é¢é€£çµçš„é–“éš”æ™‚é–“ï¼Œä»¥æ¯«ç§’è¨ˆç®— (é è¨­å€¼=1000):',
		'ConfProfileLink' : 'åœ¨é ‚ç«¯äº†é¸å–®ä¸­ï¼Œé¡¯ç¤ºå€‹äººè³‡æ–™é€£çµã€‚',
		'ConfProfilePicPopup' : 'æ»‘é¼ åœæ–¼å€‹äººè³‡æ–™åœ–ç‰‡ä¸Šæ–¹æ™‚ï¼Œè‡ªå‹•å½ˆå‡ºè¼ƒå¤§çš„åœ–ç‰‡ã€‚',
		'ConfProtocolLinks' : 'å¾žå€‹äººè³‡æ–™çš„IDä¸Šæ‰“é–‹èŠå¤©è¦–çª—ï¼Œé€²å…¥é€£çµå¾Œå³å¯é–‹å§‹äº¤è«‡å°è©±ã€‚ (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'é—œæ–¼ -foREVer- Script',
		'ConfSectionAdvanced' : 'é€²éšŽ',
		'ConfSectionEvents' : 'ç”Ÿæ—¥/æ´»å‹•',
		'ConfSectionFeeds' : 'å³æ™‚å‹•æ…‹',
		'ConfSectionHomePage' : 'é¦–é ',
		'ConfSectionImportExport' : 'åŒ¯å…¥/åŒ¯å‡º',
		'ConfSectionLiveFeed' : 'å³æ™‚å‹•æ…‹',
		'ConfSectionMenu' : 'é¸å–®/èŠå¤©',
		'ConfSectionOther' : 'å…¶ä»–é¸é …',
		'ConfSectionPageTitle' : 'é é¢æ¨™é¡Œ',
		'ConfSectionPictures' : 'åœ–ç‰‡',
		'ConfSectionShortcuts' : 'éµç›¤å¿«æ·éµ',
		'ConfSecureLinks' : 'å¼·è¿« Facebook é€£çµåˆ° HTTPS é é¢ã€‚',
		'ConfShortcutList' : '<b>éµç›¤å¿«æ·éµ</b> (å¤§å°å¯«å€åˆ†):<br /><br /><i>å¾žä»»ä½•é é¢:</i><br />&nbsp;<b>A</b> - ç›¸æœ¬/ç›¸ç‰‡<br />&nbsp;<b>B</b> - åˆ‡æ›å¥½å‹åˆ—è¡¨ (åœ¨ç·šå¥½å‹)<br />&nbsp;<b>C</b> - -foREVer- Script è¨­ç½®<br />&nbsp;<b>D</b> - ç”Ÿæ—¥<br />&nbsp;<b>E</b> - æ´»å‹•<br />&nbsp;<b>F</b> - æœ‹å‹<br />&nbsp;<b>H</b> - é¦–é <br />&nbsp;<b>I</b> - ä¿¡ç®±<br />&nbsp;<b>L</b> - é¸æ“‡ç™»å‡ºé€£çµ (æŒ‰ä¸‹ç¢ºå®šå¾Œç™»å‡º)<br />&nbsp;<b>N</b> - é€šçŸ¥<br />&nbsp;<b>P</b> - ä½ çš„å€‹äººè³‡æ–™<br />&nbsp;<b>R</b> - è«‹æ±‚<br />&nbsp;<b>S</b> - è·³åˆ°æœç´¢æ¬„ä½<br />&nbsp;<b>T</b> - ç¿»è­¯é¸æ“‡çš„å…§å®¹<br />&nbsp;<b>?</b> - é¡¯ç¤º-foREVer- Scripté™¤éŒ¯è¨Šæ¯<br />&nbsp;<b>&lt;escape&gt;</b> - ä½¿ç”¨-foREVer- Scripté—œé–‰å½ˆå‡ºè¦–çª—<br /><br /><i>å¾žé¦–é  (éŽæ¿¾)</i>:<br />&nbsp;<b>a</b> - é é¢<br />&nbsp;<b>f</b> - å³æ™‚å‹•æ…‹<br />&nbsp;<b>g</b> - åœ˜é«”<br />&nbsp;<b>l</b> - é€£çµ<br />&nbsp;<b>n</b> - æ–°çš„å‹•æ…‹<br />&nbsp;<b>p</b> - ç›¸ç‰‡<br />&nbsp;<b>s</b> or <b>u</b> - æ›´æ–°ç‹€æ…‹<br />&nbsp;<b>t</b> - ç­†è¨˜<br />&nbsp;<b>v</b> - å½±ç‰‡<br /><br /><i>å¾žå€‹äººè³‡æ–™</i>:<br />&nbsp;<b>i</b> - ä¿¡æ¯<br />&nbsp;<b>p</b> - ç›¸ç‰‡<br />&nbsp;<b>w</b> - ç‰†<br />&nbsp;<b>x</b> - ç›’å­<br /><br /><i>å¾žç¶²é çš„é ç¢¼ (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - ä¸‹ä¸€å€‹<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - é¦–å…ˆ (ç•¶å¯ä»¥ä½¿ç”¨)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - æœ€å¾Œ (ç•¶å¯ä»¥ä½¿ç”¨)<br /><br /><i>ç•¶ç€è¦½ç›¸æœ¬/ç›¸ç‰‡:</i><br />&nbsp;<b>a</b> - è®€å–æ‰€æœ‰ç¸®åœ– (ç•¶å¯ä»¥ä½¿ç”¨)<br />&nbsp;<b>b</b> - é¡¯ç¤ºå¤§å¼µçš„åœ–ç‰‡<br />&nbsp;<b>c</b> - æŸ¥çœ‹ç•™è¨€<br />&nbsp;<b>k</b> - è¿”å›žç›¸æœ¬<br />&nbsp;<b>m</b> - ç…§ç‰‡ (å€‹äºº) å’Œæˆ‘<br /><br /><i>æŸ¥çœ‹æœ€è¿‘ä¸Šå‚³/æ¨™è¨˜çš„ç›¸ç‰‡:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - æœ€æ–°çš„ç›¸æœ¬<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - æ‰‹æ©Ÿä¸Šå‚³<br />&nbsp;<b>o</b> - æˆ‘çš„ç›¸ç‰‡<br />&nbsp;<b>p</b> - æˆ‘çš„ç›¸ç‰‡<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - æ¨™è¨˜çš„æœ‹å‹',
		'ConfShortcuts' : 'å•Ÿç”¨éµç›¤å¿«æ·éµã€‚',
		'ConfSign' : 'åœ¨å€‹äººè³‡æ–™ä¸­é¡¯ç¤ºè©²äºº\çš„ ç”Ÿæ—¥ç½²å (å¦‚æžœä»–å€‘æä¾›äº†ç”Ÿæ—¥)ã€‚',
		'ConfTopBarFixed' : 'å³ä½¿å‘ä¸‹æ²å‹•ï¼Œä¸€æ¨£ä¿æŒä¸Šæ–¹é¸å–®åœ¨èž¢å¹•ä¸Š',
		'ConfTopBarHoverOpacity' : 'æ»‘é¼ ç§»è‡³ä¸Šæ–¹',
		'ConfTopBarOpacity' : 'é ‚éƒ¨é¸å–®çš„é€æ˜Žåº¦ã€‚',
		'ConfUpdates' : 'æª¢æŸ¥ Userscripts.org For -foREVer- Script çš„æ›´æ–°ã€‚ æˆ–æ˜¯ <a href="#" id="fbfUpdateLink" onclick="return false;">ç«‹å³ç¢ºèª</a>.',
		'DownloadVideo' : 'ä¸‹è¼‰å½±ç‰‡',
		'ExportICalendarFile' : 'è¼¸å‡º iCalendar æª”æ¡ˆ',
		'ExportICalendarFileWarning' : '(å¦‚æžœä½ æœ‰å¾ˆå¤šçš„æœ‹å‹çš„è©±ï¼Œå°‡è¦ä¸€æ®µæ™‚é–“)',
		'Facebook-foREVer-Conflict' : 'Facebook -foREVer-ç¾åœ¨æ›´åç‚º-foREVer- Scriptã€‚<br /><br />ç”±æ–¼æ›´æ”¹åç¨±ï¼Œä½ éœ€è¦æ‰‹å‹•å¾žç€è¦½å™¨ä¸­å¸è¼‰èˆŠçš„Facebook -foREVer-è…³æœ¬ï¼Œå› ç‚ºå…©å€‹è…³æœ¬æœƒç›¸äº’è¡çªã€‚<br /><br />å¦‚æžœä½ ä¸ç¢ºå®šå¦‚ä½•åŽ»ç§»é™¤è…³æœ¬ï¼Œ <a %s>é»žæ“Šèªªæ˜Žéƒ¨ä»½</a>.',
		'fullAlbumLoaded' : 'è¼‰å…¥æ‰€æœ‰ç›¸æœ¬',
		'Import' : 'åŒ¯å…¥',
		'ImportConfirm' : 'æ‚¨ç¢ºå®šè¦è¼¸å…¥é€™äº›è¨­å®šå—Žï¼Ÿç•¶å‰çš„è¨­å®šå°‡æœƒéºå¤±ã€‚',
		'ImportFailure' : 'åœ¨åŒ¯å…¥çš„éŽç¨‹ä¸­ç™¼ç”ŸéŒ¯èª¤ã€‚',
		'ImportSuccess' : 'åŒ¯å…¥æˆåŠŸã€‚æ‚¨è¦ç«‹å³åˆ·æ–°é é¢ï¼Ÿ',
		'Left' : 'å·¦é‚Š',
		'LoadingAllPhotos' : 'è¼‰å…¥æ‰€æœ‰ç›¸ç‰‡...',
		'loadingFullAlbum' : 'è¼‰å…¥æ‰€æœ‰ç›¸æœ¬...',
		'LoadingPic' : 'è¼‰å…¥ç…§ç‰‡ä¸­...',
		'LoadPhotosWarning' : 'è¼‰å…¥æ‰€æœ‰çš„ç…§ç‰‡éœ€è¦è¼ƒå¤šçš„æ™‚é–“ã€‚',
		'Months' : new Array('ä¸€æœˆ','äºŒæœˆ','ä¸‰æœˆ','å››æœˆ','äº”æœˆ','å…­æœˆ','ä¸ƒæœˆ','å…«æœˆ','ä¹æœˆ','åæœˆ','åä¸€æœˆ','åäºŒæœˆ'),
		'ProtocolSkype' : 'å‘¼å« %s ä½¿ç”¨ Skype',
		'ProtocolMSN' : 'èŠå¤© %s ä½¿ç”¨ MSN',
		'ProtocolYahoo' : 'èŠå¤© %s ä½¿ç”¨ Yahoo å³æ™‚é€š',
		'ProtocolGoogle' : 'èŠå¤© %s ä½¿ç”¨ Google Talk',
		'ReloadErrorPage' : 'é»žæ“Šå¾Œé‡è©¦, æˆ–æ˜¯ç­‰å¾…5ç§’é˜',
		'Refresh' : 'åˆ·æ–°',
		'Remove' : 'ç§»é™¤',
		'Right' : 'å³é‚Š',
		'ShowBigPictures' : 'é¡¯ç¤ºå¤§çš„åœ–ç‰‡',
		'Signs' : new Array('æ‘©ç¾¯åº§','æ°´ç“¶åº§','é›™é­šåº§','ç™½ç¾Šåº§','é‡‘ç‰›åº§','é›™å­åº§','å·¨èŸ¹åº§','ç…å­åº§','è™•å¥³åº§','å¤©ç§¤åº§','å¤©è åº§','å°„æ‰‹åº§'),
		'today' : 'today',
		'UpdateAvailable1' : '-foREVer- Script æœ‰å¯ç”¨çš„æ›´æ–°ã€‚',
		'UpdateAvailable2' : 'ä½ è¦ç¾åœ¨æ›´æ–°å—Žï¼Ÿ',
		'UpdateHomepage' : 'åˆ°é¦–é ',
		'UpdateInstall' : 'é¦¬ä¸Šå®‰è£',
		'UpdateTomorrow' : 'æ˜Žå¤©æé†’æˆ‘',
		'yearsOld' : '%s æ­²'
	},

	// Turkish - Contributed by GÃ¶khan GurbetoÄŸlu (20100817)
	tr : {
		'_language' : 'Turkish',
		'AddToCalendar' : 'Takvime Ekle',
		'AddToGoogleCalendar' : 'Google Takvim\'e Ekle',
		'all' : 'tÃ¼mÃ¼',
		'All' : 'TÃ¼mÃ¼',
		'AllPhotosLoaded' : 'TÃ¼m fotoÄŸraflar yÃ¼klendi',
		'Automatic' : 'Otomatik',
		'Birthday' : '%s DoÄŸumgÃ¼nÃ¼',
		'BookmarkAdd' : 'Yeni Yer Ä°mi Ekle',
		'BookmarkExists' : 'Bu sayfa iÃ§in zaten bir yer imi var. \n\nYer imlerine eklemek istediÄŸiniz sayfaya gidin ve tekrar deneyin.',
		'BookmarkNamePrompt' : 'Bu yer imi iÃ§in bir isim girin:\n%s',
		'BookmarksConfirmRemoval' : 'Bu yer imlerini kaldÄ±rmak istediÄŸinize emin misiniz?',
		'BookmarksManage' : 'Yer Ä°mlerini YÃ¶net',
		'BookmarksRemoveSelected' : 'SeÃ§ili Yer Ä°mlerini KaldÄ±r',
		'Bookmarks' : 'Yer Ä°mleri',
		'BrowserUnsupported' : 'TarayÄ±cÄ±nÄ±z bu Ã¶zelliÄŸi desteklemiyor.',
		'CreatingFile' : 'Dosya OluÅŸturuluyor',
		'Close' : 'Kapat',
		'ConfigureFacebook-foREVer-' : '-foREVer- Script\'Ä± YapÄ±landÄ±r',
		'ConfigureInstructions' : 'BÃ¼tÃ¼n deÄŸiÅŸiklikler hemen kaydedilir ancak bazÄ± deÄŸiÅŸiklikler halen aÃ§Ä±k olan sekmelerde etkisini gÃ¶stermeyebilir.',
		'ConfAge' : 'KiÅŸilerin yaÅŸÄ±nÄ± profillerinde gÃ¶ster (eÄŸer tam doÄŸum tarihlerini belirtmiÅŸlerse).',
		'ConfAlbumComments' : 'AlbÃ¼mde yapÄ±lmÄ±ÅŸ tÃ¼m yorumlarÄ± gÃ¶rmek iÃ§in albÃ¼m sayfalarÄ±na bir baÄŸlantÄ± ekle.',
		'ConfApplicationWhitelist' : 'Uygulama Beyaz Listesi - Gizlenmesini istemediÄŸiniz uygulamalarÄ±n ID numaralarÄ±nÄ± girin. Birden fazla ID iÃ§in aralara boÅŸluk bÄ±rakÄ±n.',
		'ConfAutoBigAlbumPictures' : 'BÃ¼yÃ¼k albÃ¼m resimlerini sayfa aÃ§Ä±ldÄ±ÄŸÄ±nda otomatik olarak gÃ¶ster.',
		'ConfAutoLoadFullAlbum' : 'Bir albÃ¼mdeki tÃ¼m kÃ¼Ã§Ã¼k resimleri otomatik olarak tek sayfada yÃ¼kle.',
		'ConfAutoLoadTaggedPhotos' : 'TÃ¼m etiketlenmiÅŸ fotoÄŸraflar iÃ§in kÃ¼Ã§Ã¼k resimleri otomatik olarak tek sayfada yÃ¼kle (kiÅŸilerin profilindeki fotoÄŸraflar sekmesi)',
		'ConfAutoReadMore' : '"DevamÄ±nÄ± gÃ¶r" baÄŸlantÄ±larÄ±na otomatik olarak tÄ±kla.',
		'ConfBigAlbumPictures' : 'AlbÃ¼m sayfalarÄ±na bÃ¼tÃ¼n resimlerin bÃ¼yÃ¼k sÃ¼rÃ¼mlerini tek sayfada gÃ¶stermek iÃ§in bir baÄŸlantÄ± ekle.',
		'ConfBookmarks' : 'Ãœst menÃ¼ Ã§ubuÄŸuna bir Yer Ä°mleri alt menÃ¼sÃ¼ ekle.',
		'ConfBottomBarHoverOpacity' : 'Fare Ã¼stÃ¼ne geldiÄŸinde',
		'ConfBottomBarOpacity' : 'Alt menÃ¼ Ã§ubuÄŸu ÅŸeffaflÄ±ÄŸÄ±',
		'ConfCalendarBirthDate' : 'Etkinlik ayrÄ±ntÄ±larÄ± kiÅŸinin doÄŸumgÃ¼nÃ¼nÃ¼ iÃ§ersin.',
		'ConfCalendarFullName' : 'DoÄŸumgÃ¼nleri iÃ§in kiÅŸinin tam adÄ±nÄ± kullan (sadece ilk adÄ±nÄ± kullanmak yerine).',
		'ConfChatDifferentiate' : 'Ã‡evrimiÃ§i ve boÅŸtaki arkadaÅŸlarÄ± ayÄ±rt etmek iÃ§in kalÄ±n ve italik yazÄ±tipi kullan.',
		'ConfChatHideIdle' : 'BoÅŸtaki arkadaÅŸlarÄ± gizle.',
		'ConfDelayPopupPics' : 'AÃ§Ä±lÄ±r pencerede resimleri gÃ¶stermeden Ã¶nce kÄ±sa bir gecikme zamanÄ± ekle.',
		'ConfDelayPopupPicsTimeout' : 'AÃ§Ä±lÄ±r pencerede resimleri gÃ¶stermeden Ã¶nceki gecikme, milisaniye olarak (varsayÄ±lan=500):',
		'ConfDownloadVideo' : 'Video sayfalarÄ±ndaki videolarÄ± indirmek iÃ§in bir baÄŸlantÄ± ekle. (Bir <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV oynatÄ±cÄ±</a>\'ya ihtiyacÄ±nÄ±z olabilir)',
		'ConfErrorPageReload' : 'Uygulama hata sayfalarÄ±nÄ± 5 saniye sonra otomatik olarak yenile.',
		'ConfExport' : 'AyarlarÄ±nÄ±zÄ± dÄ±ÅŸa aktarmak iÃ§in aÅŸaÄŸÄ±daki metni kopyalayÄ±n ve bir dosyaya kaydedin.',
		'ConfExternalPopup' : 'Harici sitelerdeki fotoÄŸraflarÄ±n bÃ¼yÃ¼k sÃ¼rÃ¼mÃ¼nÃ¼ gÃ¶ster. <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : '-foREVer- Script\'Ä±n Dili',
		'ConfFacebookTimestamps' : 'Facebook\'un zaman etiketlerini gÃ¶ster (Ã¶rn. "3 saat Ã¶nce").',
		'ConfFBFTimestamps' : 'Facebook\'un zaman etiketlerinin ardÄ±ndan -foREVer- Script zaman etiketlerini ekle (Ã¶rn. "11:45").',
		'ConfFBFTimestamps24' : '-foREVer- Script zaman etiketlerini 24-saat biÃ§iminde gÃ¶ster',
		'ConfFriendRequestCountInTitle' : 'Sayfa baÅŸlÄ±ÄŸÄ±nda yeni arkadaÅŸlÄ±k isteklerinin sayÄ±sÄ±nÄ± gÃ¶ster.',
		'ConfGoogleApps' : 'Google Apps ile uyumlu Google Takvim baÄŸlantÄ±larÄ± oluÅŸtur.',
		'ConfGoogleAppsDomain' : 'Etki AlanÄ±',
		'ConfGoogleCalendar' : '<a href="http://tr.wikipedia.org/wiki/Google_Takvim" target="_blank">Google Takvim</a>\'e doÄŸumgÃ¼nÃ¼ ve etkinlikler ekleyebilmek iÃ§in baÄŸlantÄ±larÄ± oluÅŸtur.',
		'ConfGoogleLanguage' : '<a href="http://tr.wikipedia.org/wiki/Google_%C3%87eviri" target="_blank">Google Ã‡eviri</a> iÃ§in dil',
		'ConfHideApplicationStories' : 'Uygulama haberlerini gizle.',
		'ConfHideEventStories' : 'Etkinlik haberlerini gizle.',
		'ConfHideFacebookCountInTitle' : 'Facebook\'un yeni mesaj sayÄ±sÄ± gÃ¶sterimini gizle.',
		'ConfHideFriendStories' : 'ArkadaÅŸlÄ±k haberlerini gizle.',
		'ConfHideGroupStories' : 'Grup haberlerini gizle.',
		'ConfHideLikeStories' : 'BeÄŸenme haberlerini gizle.',
		'ConfHideLinkStories' : 'BaÄŸlantÄ± haberlerini gizle.',
		'ConfHideNoteStories' : 'Not haberlerini gizle.',
		'ConfHidePhotoStories' : 'FotoÄŸraf haberlerini gizle.',
		'ConfHideProfilePicStories' : 'Profil resmi haberlerini gizle.',
		'ConfHideRead' : 'CanlÄ± haberlerdeki okundu olarak iÅŸaretlenmiÅŸ Ã¶ÄŸeleri gizle.',
		'ConfHideRelationshipStories' : 'Ä°liÅŸki haberlerini gizle.',
		'ConfHideStatusStories' : 'Durum haberlerini gizle.',
		'ConfHideVideoStories' : 'Video haberlerini gizle.',
		'ConfHideWallStories' : 'Duvar hikayelerini gizle.',
		'ConfHomeBeta' : 'Facebook Ã–n GÃ¶sterim bÃ¶lmesini gÃ¶ster.',
		'ConfHomeChat' : 'Sohbet bÃ¶lmesini gÃ¶ster.',
		'ConfHomeEvents' : 'Etkinlik bÃ¶lmesini gÃ¶ster.',
		'ConfHomeFindFriends' : 'ArkadaÅŸlarÄ±nla BaÄŸlantÄ± Kur bÃ¶lmesini gÃ¶ster.',
		'ConfHomeLeftAlign' : 'Ana sayfa iÃ§eriÄŸini sola yasla.',
		'ConfHomeLeftColumn' : 'Sol sÃ¼tunu gÃ¶ster.',
		'ConfHomeLeftColumnFixed' : 'Sayfa aÅŸaÄŸÄ± kaydÄ±rÄ±lsa bile sol sÃ¼tunu gÃ¶rÃ¼nÃ¼r tut.',
		'ConfHomeLink' : 'Ãœst menÃ¼ Ã§ubuÄŸunda Ana Sayfa baÄŸlantÄ±sÄ±nÄ± gÃ¶ster.',
		'ConfHomeNavigation' : 'DolaÅŸma bÃ¶lmesini gÃ¶ster.',
		'ConfHomePokes' : 'DÃ¼rtme bÃ¶lmesini gÃ¶ster.',
		'ConfHomeProfile' : 'Profil bÃ¶lmesini gÃ¶ster.',
		'ConfHomeRecommendations' : 'Tavsiyeleri gÃ¶ster (TanÄ±yor OlabileceÄŸin KiÅŸiler, Tavsiye Edilen Sayfalar, vs.).',
		'ConfHomeRequests' : 'Ä°stekler bÃ¶lmesini gÃ¶ster.',
		'ConfHomeRightColumn' : 'SaÄŸ sÃ¼tunu gÃ¶ster.',
		'ConfHomeStretch' : 'Ana sayfayÄ± tarayÄ±cÄ±nÄ±n geniÅŸliÄŸine sÄ±ÄŸacak ÅŸekilde uzat.',
		'ConfHomeStretchComments' : 'Ana sayfadaki yorumlarÄ± uzat.',
		'ConfiCalendar' : 'BÃ¼tÃ¼n doÄŸumgÃ¼nlerini iÃ§eren bir <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> dosyasÄ± indirmek iÃ§in baÄŸlantÄ±larÄ± ekle.',
		'ConfImport' : 'Ä°leride ayarlarÄ±nÄ±zÄ± iÃ§e aktarmak iÃ§in, daha Ã¶nce kaydettiÄŸiniz metni aÅŸaÄŸÄ±daki metnin yerine yapÄ±ÅŸtÄ±rÄ±n ve "Ä°Ã§e Aktar"a tÄ±klayÄ±n.',
		'ConfInboxCountInTitle' : 'Sayfa baÅŸlÄ±ÄŸÄ±nda gelen kutusundaki okunmamÄ±ÅŸ mesaj sayÄ±sÄ±nÄ± gÃ¶ster.',
		'ConfLogoutLink' : 'Ãœst menÃ¼ Ã§ubuÄŸuna bir Ã§Ä±kÄ±ÅŸ baÄŸlantÄ±sÄ± ekle.',
		'ConfNotificationCountInTitle' : 'Sayfa baÅŸlÄ±ÄŸÄ±nda bildirimlerin sayÄ±sÄ±nÄ± gÃ¶ster.',
		'ConfNewTabSearch' : 'CTRL + Enter basarak arama yapÄ±ldÄ±ÄŸÄ±nda arama sonuÃ§larÄ±nÄ± yeni bir sekmede/pencerede aÃ§.',
		'ConfPageTitle' : 'BÃ¼tÃ¼n sayfalarÄ±n baÅŸlÄ±ÄŸÄ±ndan "Facebook |" yazÄ±sÄ±nÄ± kaldÄ±r.',
		'ConfPhotoPopup' : 'Fareyle Ã¼stÃ¼ne gelindiÄŸinde fotoÄŸraflarÄ±n bÃ¼yÃ¼k sÃ¼rÃ¼mlerini gÃ¶ster.',
		'ConfPopupAutoClose' : 'AÃ§Ä±lan pencere resimlerini otomatik olarak kapat.',
		'ConfPopupSmartAutoClose' : 'AÃ§Ä±lan pencere resimlerinin fare Ã¼zerindeyken otomatik olarak kapanmasÄ±nÄ± engelle.',
		'ConfPopupPosition' : 'AÃ§Ä±lan pencere resimlerinin konumu',
		'ConfProcessInterval' : 'SayfayÄ± iÅŸlemek iÃ§in zaman aralÄ±ÄŸÄ±, milisaniye olarak (varsayÄ±lan=1000):',
		'ConfProfileLink' : 'Ãœst menÃ¼ Ã§ubuÄŸunda Profil baÄŸlantÄ±sÄ±nÄ± gÃ¶ster.',
		'ConfProfilePicPopup' : 'Fareyle Ã¼stÃ¼ne gelindiÄŸinde profil resimlerinin bÃ¼yÃ¼k sÃ¼rÃ¼mlerini gÃ¶ster',
		'ConfProtocolLinks' : 'Profillerdeki anlÄ±k ileti adreslerini anÄ±nda iletiÅŸim kurulabilecek baÄŸlantÄ±lara dÃ¶nÃ¼ÅŸtÃ¼r (Google Talk, Windows Live, vb.).',
		'ConfSectionAbout' : '-foREVer- Script HakkÄ±nda',
		'ConfSectionAdvanced' : 'GeliÅŸmiÅŸ',
		'ConfSectionEvents' : 'DoÄŸumgÃ¼nleri/Etkinlikler',
		'ConfSectionImportExport' : 'Ä°Ã§e/DÄ±ÅŸa Aktar',
		'ConfSectionFeeds' : 'Kaynaklar',
		'ConfSectionHomePage' : 'Ana Sayfa',
		'ConfSectionLiveFeed' : 'CanlÄ± Haberler',
		'ConfSectionMenu' : 'MenÃ¼ler/Sohbet',
		'ConfSectionOther' : 'DiÄŸer SeÃ§enekler',
		'ConfSectionPageTitle' : 'Sayfa BaÅŸlÄ±ÄŸÄ±',
		'ConfSectionPictures' : 'Resimler',
		'ConfSectionShortcuts' : 'Klavye KÄ±sayollarÄ±',
		'ConfSecureLinks' : 'Facebook baÄŸlantÄ±larÄ±nÄ± HTTPS sayfalarÄ±nÄ± kullanmaya zorla.',
		'ConfShortcutList' : '<b>Klavye KÄ±sayollarÄ±</b> (bÃ¼yÃ¼k/kÃ¼Ã§Ã¼k harf duyarlÄ±):<br /><br /><i>Herhangi bir sayfadan:</i><br /> <b>A</b> - AlbÃ¼mler/fotoÄŸraflar<br /> <b>B</b> - ArkadaÅŸ listesini aÃ§/kapa (Ã§evrimiÃ§i arkadaÅŸlar)<br /> <b>C</b> - -foREVer- Script yapÄ±landÄ±rmasÄ±<br /> <b>D</b> - DoÄŸumgÃ¼nleri<br /> <b>E</b> - Etkinlikler<br /> <b>F</b> - ArkadaÅŸlar<br /> <b>H</b> - Ana Sayfa<br /> <b>I</b> - Gelen Kutusu<br /> <b>L</b> - Ã‡Ä±kÄ±ÅŸ baÄŸlantÄ±sÄ±nÄ± seÃ§ (Ã§Ä±kÄ±ÅŸ yapmak iÃ§in bundan sonra Enter\'a basÄ±n)<br /> <b>N</b> - Bildirimler<br /> <b>P</b> - Profiliniz<br /> <b>R</b> - Ä°stekler<br /> <b>S</b> - Arama alanÄ±na git<br /> <b>T</b> - SeÃ§ili metni tercÃ¼me et<br /> <b>?</b> - -foREVer- Script hata ayÄ±klama bilgisini gÃ¶ster<br /> <b><escape></b> - -foREVer- Script tarafÄ±ndan aÃ§Ä±lmÄ±ÅŸ pencereleri kapat<br /><br /><i>Ana sayfadan (filtreler):</i><br /> <b>a</b> - Sayfalar<br /> <b>f</b> - CanlÄ± Haberler<br /> <b>g</b> - Gruplar<br /> <b>l</b> - BaÄŸlantÄ±lar<br /> <b>n</b> - Haber KaynaÄŸÄ±<br /> <b>p</b> - FotoÄŸraflar<br /> <b>s</b> veya <b>u</b> - Durum gÃ¼ncellemeleri<br /> <b>t</b> - Notlar<br /> <b>v</b> - Videolar<br /><br /><i>Profil sayfalarÄ±ndan:</i><br /> <b>i</b> - Bilgi<br /> <b>p</b> - FotoÄŸraflar<br /> <b>w</b> - Duvar<br /> <b>x</b> - Kutular<br /><br /><i>NumaralandÄ±rÄ±lmÄ±ÅŸ sayfalardan (Ã¶nceki, sonraki, vb.):</i><br /> <b><sol ok></b> - Ã–nceki<br /> <b><saÄŸ ok></b> - Sonraki<br /> <b><shift> + <sol ok></b> - Ä°lk (eÄŸer mevcutsa)<br /> <b><shift> + <saÄŸ ok></b> - Son (eÄŸer mevcutsa)<br /><br /><i>AlbÃ¼mleri/fotoÄŸraflarÄ± gÃ¶rÃ¼ntÃ¼lerken:</i><br /> <b>a</b> - TÃ¼m kÃ¼Ã§Ã¼k resimleri yÃ¼kle (eÄŸer mevcutsa)<br /> <b>b</b> - BÃ¼yÃ¼k resimleri gÃ¶ster<br /> <b>c</b> - YorumlarÄ± gÃ¶ster<br /> <b>k</b> - AlbÃ¼me geri dÃ¶n<br /> <b>m</b> - (KiÅŸi) ve benim fotoÄŸraflarÄ±m<br /><br /><i>YakÄ±n zamanlardaki albÃ¼mleri ve yÃ¼klenmiÅŸ/etiketlenmiÅŸ fotoÄŸraflarÄ± gÃ¶rÃ¼ntÃ¼lerken:</i><br /> <b>a</b> veya  <b>r</b> - YakÄ±n Zamandaki AlbÃ¼mler<br /> <b>m</b> veya  <b>u</b> - Mobil yÃ¼klemeler<br /> <b>o</b> - Benim olduÄŸum fotoÄŸraflar<br /> <b>p</b> - FotoÄŸraflarÄ±m<br /> <b>t</b> veya  <b>f</b> - EtiketlenmiÅŸ arkadaÅŸlar',
		'ConfShortcuts' : 'Klavye kÄ±sayollarÄ±nÄ± etkinleÅŸtir.',
		'ConfSign' : 'Profillerde kiÅŸilerin burÃ§larÄ±nÄ± gÃ¶ster (eÄŸer doÄŸum tarihlerini belirtmiÅŸlerse).',
		'ConfTopBarFixed' : 'Sayfa aÅŸaÄŸÄ± kaydÄ±rÄ±lsa bile Ã¼st menÃ¼ Ã§ubuÄŸunu ekranda tut.',
		'ConfTopBarHoverOpacity' : 'Fare Ã¼stÃ¼ne geldiÄŸinde',
		'ConfTopBarOpacity' : 'Ãœst menÃ¼ Ã§ubuÄŸu ÅŸeffaflÄ±ÄŸÄ±',
		'ConfUpdates' : '-foREVer- Script gÃ¼ncellemeleri iÃ§in her gÃ¼n Userscripts.org\'u ziyaret et. Ya da <a href="#" id="fbfUpdateLink" onclick="return false;">ÅŸimdi kontrol et</a>.',
		'DownloadVideo' : 'Videoyu Ä°ndir',
		'ExportICalendarFile' : 'iCalendar dosyasÄ± aktar',
		'ExportICalendarFileWarning' : '(EÄŸer Ã§ok arkadaÅŸÄ±nÄ±z varsa bu biraz uzun sÃ¼rebilir)',
		'Facebook-foREVer-Conflict' : '-foREVer- Script\'Ä±n yeni adÄ± artÄ±k -foREVer- Script. Ä°sim deÄŸiÅŸikliÄŸinden dolayÄ± -foREVer- Script\'Ä± tarayÄ±cÄ±nÄ±zdan kaldÄ±rmanÄ±z gerekiyor, yoksa bu iki script birbiriyle uyuÅŸmazlÄ±k sorunlarÄ± Ã§Ä±karacaktÄ±r. EÄŸer bir userscript\'i nasÄ±l kaldÄ±racaÄŸÄ±nÄ±zdan emin deÄŸilseniz <a %s>buraya tÄ±klayarak Ã¶ÄŸrenebilirsiniz</a>.',
		'fullAlbumLoaded' : 'bÃ¼tÃ¼n albÃ¼m yÃ¼klendi',
		'Import' : 'Ä°Ã§e Aktar',
		'ImportConfirm' : 'Bu ayarlarÄ± iÃ§e aktarmak istediÄŸinize emin misiniz?\nMevcut ayarlarÄ±nÄ±z silinecek.',
		'ImportFailure' : 'AyarlarÄ±nÄ±zÄ± iÃ§e aktarmaya Ã§alÄ±ÅŸÄ±rken bir hata oluÅŸtu.',
		'ImportSuccess' : 'Ä°Ã§e aktarma tamamlandÄ±. SayfayÄ± yenilemek ister misiniz?',
		'Left' : 'Sol',
		'LoadingAllPhotos' : 'TÃ¼m fotoÄŸraflar yÃ¼kleniyor...',
		'loadingFullAlbum' : 'tÃ¼m albÃ¼m yÃ¼kleniyor...',
		'LoadingPic' : 'Resim YÃ¼kleniyor...',
		'LoadPhotosWarning' : 'TÃ¼m fotoÄŸraflarÄ± yÃ¼klemek uzun zaman alabilir',
		'Months' : new Array('Ocak','Åžubat','Mart','Nisan','MayÄ±s','Haziran','Temmuz','AÄŸustos','EylÃ¼l','Ekim','KasÄ±m','AralÄ±k'),
		'ProtocolSkype' : '%s kiÅŸisini Skype kullanarak ara',
		'ProtocolMSN' : '%s ile Windows Live kullanarak sohbet et',
		'ProtocolYahoo' : '%s ile Yahoo Messenger kullanarak sohbet et',
		'ProtocolGoogle' : '%s ile Google Talk kullanarak sohbet et',
		'ReloadErrorPage' : 'Yeniden denemek iÃ§in tÄ±klayÄ±n, ya da 5 saniye bekleyin',
		'Refresh' : 'Yenile',
		'Remove' : 'KaldÄ±r',
		'Right' : 'SaÄŸ',
		'ShowBigPictures' : 'BÃ¼yÃ¼k Resimleri GÃ¶ster',
		'Signs' : new Array('OÄŸlak','Kova','BalÄ±k','KoÃ§','BoÄŸa','Ä°kizler','YengeÃ§','Aslan','BaÅŸak','Terazi','Akrep','Yay'),
		'today' : 'bugÃ¼n',
		'Translators' : 'Ã‡evirenler',
		'UpdateAvailable1' : '-foREVer- Script iÃ§in bir gÃ¼ncelleme mevcut',
		'UpdateAvailable2' : 'Åžimdi gÃ¼ncellemek ister misiniz?',
		'UpdateHomepage' : 'Ana sayfaya git',
		'UpdateInstall' : 'Åžimdi kur',
		'UpdateTomorrow' : 'YarÄ±n hatÄ±rlat',
		'ViewAlbumComments' : 'AlbÃ¼m YorumlarÄ±nÄ± GÃ¶ster',
		'yearsOld' : '%s yaÅŸÄ±nda'
	},

	// Serbian (Cyrillic) - Contributed by Ð“Ð¾Ñ€ÑˆÑ‚Ð°Ðº (20100817)
	sr_rs : {
		'_language' : 'Serbian (Cyrillic)',
		'AddToCalendar' : 'Ð”Ð¾Ð´Ð°Ñ˜ Ñƒ ÐºÐ°Ð»ÐµÐ½Ð´Ð°Ñ€',
		'AddToGoogleCalendar' : 'Ð”Ð¾Ð´Ð°Ñ˜ Ñƒ Google ÐºÐ°Ð»ÐµÐ½Ð´Ð°Ñ€',
		'all' : 'ÑÐ²Ðµ',
		'All' : 'Ð¡Ð²Ðµ',
		'AllPhotosLoaded' : 'Ð¡Ð²Ðµ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ðµ ÑÑƒ ÑƒÑ‡Ð¸Ñ‚Ð°Ð½Ðµ',
		'Automatic' : 'ÐÑƒÑ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸',
		'Birthday' : 'Ð Ð¾Ñ’ÐµÐ½Ð´Ð°Ð½ ÐºÐ¾Ñ€Ð¸ÑÐ½Ð¸ÐºÐ° %s',
		'BookmarkAdd' : 'Ð”Ð¾Ð´Ð°Ñ˜ Ð½Ð¾Ð²Ñƒ Ð·Ð°Ð±ÐµÐ»ÐµÑˆÐºÑƒ',
		'BookmarkExists' : 'ÐžÐ²Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ñ˜Ðµ Ð²ÐµÑ› Ð´Ð¾Ð´Ð°Ñ‚Ð° Ñƒ Ð·Ð°Ð±ÐµÐ»ÐµÑˆÐºÐµ.\n\nÐ˜Ð´Ð¸Ñ‚Ðµ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ ÐºÐ¾Ñ˜Ñƒ Ð¶ÐµÐ»Ð¸Ñ‚Ðµ Ð´Ð° Ð´Ð¾Ð´Ð°Ñ‚Ðµ Ð¸ Ð¿Ð¾ÐºÑƒÑˆÐ°Ñ˜Ñ‚Ðµ Ð¿Ð¾Ð½Ð¾Ð²Ð¾.',
		'BookmarkNamePrompt' : 'Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð½Ð°Ð·Ð¸Ð² Ð¾Ð²Ðµ Ð·Ð°Ð±ÐµÐ»ÐµÑˆÐºÐµ:\n%s',
 		'BookmarksConfirmRemoval' : 'Ð”Ð° Ð»Ð¸ ÑÑ‚Ðµ ÑÐ¸Ð³ÑƒÑ€Ð½Ð¸ Ð´Ð° Ð¶ÐµÐ»Ð¸Ñ‚Ðµ Ð´Ð° ÑƒÐºÐ»Ð¾Ð½Ð¸Ñ‚Ðµ Ð¾Ð²Ðµ Ð·Ð°Ð±ÐµÐ»ÐµÑˆÐºÐµ?',
 		'BookmarksManage' : 'Ð£Ñ€ÐµÐ´Ð¸ Ð·Ð°Ð±ÐµÐ»ÐµÑˆÐºÐµ',
 		'BookmarksRemoveSelected' : 'Ð£ÐºÐ»Ð¾Ð½Ð¸ Ð¸Ð·Ð°Ð±Ñ€Ð°Ð½Ðµ Ð·Ð°Ð±ÐµÐ»ÐµÑˆÐºÐµ',
		'Bookmarks' : 'Ð—Ð°Ð±ÐµÐ»ÐµÑˆÐºÐµ',
		'BrowserUnsupported' : 'Ð’Ð°Ñˆ Ð¿Ñ€ÐµÑ‚Ñ€Ð°Ð¶Ð¸Ð²Ð°Ñ‡ Ð½Ðµ Ð¿Ð¾Ð´Ñ€Ð¶Ð°Ð²Ð° Ð¾Ð²Ñƒ Ð¾Ð¿Ñ†Ð¸Ñ˜Ñƒ.',
		'CreatingFile' : 'Ð”Ð°Ñ‚Ð¾Ñ‚ÐµÐºÐ° ÑÐµ Ð¸Ð·Ñ€Ð°Ñ’ÑƒÑ˜Ðµ',
		'Close' : 'Ð—Ð°Ñ‚Ð²Ð¾Ñ€Ð¸',
		'ConfigureFacebook-foREVer-' : 'ÐŸÐ¾Ð´ÐµÑÐ¸ -foREVer- Script',
		'ConfigureInstructions' : 'Ð¡Ð²Ðµ Ð¸Ð·Ð¼ÐµÐ½Ðµ ÑÐµ ÑÐµ Ð¾Ð´Ð¼Ð°Ñ… Ð¿Ð°Ð¼Ñ‚Ðµ, Ð°Ð»Ð¸ Ð¿Ð¾Ð½ÐµÐºÐ°Ð´ Ñ˜Ðµ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð½Ð¾ Ð¾ÑÐ²ÐµÐ¶Ð¸Ñ‚Ð¸ Ð¾Ñ‚Ð²Ð¾Ñ€ÐµÐ½Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ Ð´Ð° Ð±Ð¸ Ð¸Ð·Ð¼ÐµÐ½Ðµ Ð´ÐµÐ»Ð¾Ð²Ð°Ð»Ðµ.',
		'ConfAge' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ ÑƒÐ·Ñ€Ð°ÑÑ‚ Ð¾ÑÐ¾Ð±Ðµ Ð½Ð° Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ñƒ (ÑƒÐºÐ¾Ð»Ð¸ÐºÐ¾ Ñ˜Ðµ Ð½Ð°Ð²ÐµÐ´ÐµÐ½ Ð¿ÑƒÐ½ Ð´Ð°Ñ‚ÑƒÐ¼ Ð¿Ð¾Ñ’ÐµÑšÐ°).',
 		'ConfAlbumComments' : 'Ð”Ð¾Ð´Ð°Ñ˜ Ð²ÐµÐ·Ñƒ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ Ð°Ð»Ð±ÑƒÐ¼Ð° ÐºÐ¾Ñ˜Ð¾Ð¼ Ð±Ð¸ ÑÐµ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð°Ð»Ð¸ ÑÐ²Ð¸ ÐºÐ¾Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ð¸ Ð°Ð»Ð±ÑƒÐ¼Ð°.',
		'ConfApplicationWhitelist' : 'Ð¡Ð¿Ð¸ÑÐ°Ðº Ð´Ð¾Ð·Ð²Ð¾Ñ™ÐµÐ½Ð¸Ñ… Ð°Ð¿Ð»Ð¸ÐºÐ°Ñ†Ð¸Ñ˜Ð° - Ð£Ð½ÐµÑÐ¸Ñ‚Ðµ Ð¾Ð·Ð½Ð°ÐºÑƒ Ð°Ð¿Ð»Ð¸ÐºÐ°Ñ†Ð¸Ñ˜Ðµ ÐºÐ°ÐºÐ¾ Ð±Ð¸ÑÑ‚Ðµ ÑÐ¿Ñ€ÐµÑ‡Ð¸Ð»Ð¸ ÑšÐµÐ½Ð¾ ÑÐ°ÐºÑ€Ð¸Ð²Ð°ÑšÐµ. Ð Ð°Ð·Ð´Ð²Ð¾Ñ˜Ñ‚Ðµ Ð¾Ð·Ð½Ð°ÐºÐµ Ñ€Ð°Ð·Ð¼Ð°ÐºÐ¾Ð¼.',
		'ConfAutoBigAlbumPictures' : 'ÐÑƒÑ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸ Ð¿Ñ€Ð¸ÐºÐ°Ð¶Ð¸ Ð²ÐµÑ›Ðµ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ðµ Ð¸Ð· Ð°Ð»Ð±ÑƒÐ¼Ð° ÐºÐ°Ð´Ð° ÑÐµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ð¾Ñ‚Ð²Ð¾Ñ€Ð¸.',
		'ConfAutoLoadFullAlbum' : 'ÐÑƒÑ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸, Ð½Ð° Ñ˜ÐµÐ´Ð½Ð¾Ñ˜ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸, ÑƒÑ‡Ð¸Ñ‚Ð°Ñ˜ ÑÐ»Ð¸Ñ‡Ð¸Ñ†Ðµ ÑÐ²Ð¸Ñ… Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð° Ð¸Ð· Ð°Ð»Ð±ÑƒÐ¼Ð°.',
		'ConfAutoLoadTaggedPhotos' : 'ÐÑƒÑ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸, Ð½Ð° Ñ˜ÐµÐ´Ð½Ð¾Ñ˜ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸, ÑƒÑ‡Ð¸Ñ‚Ð°Ñ˜ ÑÐ»Ð¸Ñ‡Ð¸Ñ†Ðµ ÑÐ²Ð¸Ñ… Ð¾Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ñ… Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð° (Ð½Ð° ÐºÐ°Ñ€Ñ‚Ð¸Ñ†Ð¸ "Ð¤Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ðµ" ÑƒÐ½ÑƒÑ‚Ð°Ñ€ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð°).',
		'ConfAutoReadMore' : 'ÐÑƒÑ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸ ÐºÐ»Ð¸ÐºÐ½Ð¸ Ð½Ð° Ð²ÐµÐ·Ñƒ "ÑÑ‚Ð°Ñ€Ð¸Ñ˜Ðµ".',
		'ConfBigAlbumPictures' : 'ÐÐ° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸ Ð°Ð»Ð±ÑƒÐ¼Ð° Ð´Ð¾Ð´Ð°Ñ˜ Ð²ÐµÐ·Ñƒ Ð·Ð° Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð¸Ð²Ð°ÑšÐµ Ð²ÐµÑ›Ð¸Ñ… ÑÐ»Ð¸Ñ‡Ð¸Ñ†Ð° ÑÐ²Ð¸Ñ… Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð° ÑÐ° Ñ‚Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ.',
		'ConfBookmarks' : 'Ð”Ð¾Ð´Ð°Ñ˜ Ð¿Ð¾Ð´Ð¼ÐµÐ½Ð¸ "Ð—Ð°Ð±ÐµÐ»ÐµÑˆÐºÐµ" Ð½Ð° Ð³Ð¾Ñ€ÑšÑƒ Ñ‚Ñ€Ð°ÐºÑƒ ÑÐ° Ð¼ÐµÐ½Ð¸Ñ˜Ð¸Ð¼Ð°.',
		'ConfBottomBarHoverOpacity' : 'ÐŸÑ€Ð¸Ð»Ð¸ÐºÐ¾Ð¼ Ð¿Ñ€ÐµÐ»Ð°ÑÐºÐ° Ð¼Ð¸ÑˆÐµÐ¼',
		'ConfBottomBarOpacity' : 'ÐŸÑ€Ð¾Ð²Ð¸Ð´Ð½Ð¾ÑÑ‚ Ð´Ð¾ÑšÐµ Ñ‚Ñ€Ð°ÐºÐµ ÑÐ° Ð¼ÐµÐ½Ð¸Ñ˜Ð¸Ð¼Ð°',
		'ConfCalendarBirthDate' : 'Ð£ÐºÑ™ÑƒÑ‡Ð¸ Ð´Ð°Ñ‚ÑƒÐ¼ Ñ€Ð¾Ñ’ÐµÑšÐ° ÐºÐ¾Ñ€Ð¸ÑÐ½Ð¸ÐºÐ° Ñƒ Ð´ÐµÑ‚Ð°Ñ™Ð¸Ð¼Ð° Ð´Ð¾Ð³Ð°Ñ’Ð°Ñ˜Ð°.',
		'ConfCalendarFullName' : 'Ð”Ð¾Ð´Ð°Ñ˜ Ð¸ Ð¿Ñ€ÐµÐ·Ð¸Ð¼Ðµ ÐºÐ¾Ñ€Ð¸ÑÐ½Ð¸ÐºÐ° Ñƒ Ð½Ð°ÑÐ»Ð¾Ð²Ñƒ Ñ€Ð¾Ñ’ÐµÐ½Ð´Ð°Ð½Ð°.',
		'ConfChatDifferentiate' : 'ÐžÐ·Ð½Ð°Ñ‡Ð¸ Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ðµ Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™Ðµ Ð¿Ð¾Ð´ÐµÐ±Ñ™Ð°Ð½Ð¸Ð¼ ÑÐ»Ð¾Ð²Ð¸Ð¼Ð° Ð° Ð½ÐµÐ°ÐºÑ‚Ð¸Ð²Ð½Ðµ ÐºÐ¾ÑÐ¸Ð¼ ÑÐ»Ð¾Ð²Ð¸Ð¼Ð°.',
		'ConfChatHideIdle' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð½ÐµÐ°ÐºÑ‚Ð¸Ð²Ð½Ðµ Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™Ðµ.',
		'ConfDelayPopupPics' : 'Ð£ÐºÑ™ÑƒÑ‡Ð¸ ÐºÑ€Ð°Ñ‚Ð°Ðº Ð·Ð°ÑÑ‚Ð¾Ñ˜ Ð¿Ñ€Ðµ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð¸Ð²Ð°ÑšÐ° ÑƒÐ²ÐµÑ›Ð°Ð½Ð¸Ñ… ÑÐ»Ð¸ÐºÐ°.',
		'ConfDelayPopupPicsTimeout' : 'Ð—Ð°ÑÑ‚Ð¾Ñ˜ Ð¿Ñ€Ðµ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð¸Ð²Ð°ÑšÐ° ÑƒÐ²ÐµÑ›Ð°Ð½Ð¸Ñ… ÑÐ»Ð¸ÐºÐ°, Ñƒ Ð¼Ð¸Ð»Ð¸ÑÐµÐºÑƒÐ½Ð´Ð°Ð¼Ð° (Ð¿Ð¾Ð´Ñ€Ð°Ð·ÑƒÐ¼ÐµÐ²Ð°Ð½Ð¾=500):',
		'ConfDownloadVideo' : 'Ð”Ð¾Ð´Ð°Ñ˜ Ð²ÐµÐ·Ñƒ Ð·Ð° Ð¿Ñ€ÐµÑƒÐ·Ð¸Ð¼Ð°ÑšÐµ Ð²Ð¸Ð´ÐµÐ¾ ÑÐ½Ð¸Ð¼ÐºÐ° ÑÐ° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ Ð·Ð° Ð²Ð¸Ð´ÐµÐ¾. (ÐœÐ¾Ð¶Ð´Ð° Ñ›Ðµ Ð²Ð°Ð¼ Ñ‚Ñ€ÐµÐ±Ð°Ñ‚Ð¸ <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'ÐÑƒÑ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¾ Ð¿Ð¾Ð½Ð¾Ð²Ð½Ð¾ ÑƒÑ‡Ð¸Ñ‚Ð°Ð²Ð°ÑšÐµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ Ð½Ð°ÐºÐ¾Ð½ 5 ÑÐµÐºÑƒÐ½Ð´Ð¸, Ñƒ ÑÐ»ÑƒÑ‡Ð°Ñ˜Ñƒ Ð³Ñ€ÐµÑˆÐºÐµ.',
		'ConfExport' : 'Ð”Ð° Ð±Ð¸ÑÑ‚Ðµ Ð¸Ð·Ð²ÐµÐ·Ð»Ð¸ ÑÐ²Ð¾Ñ˜Ð° Ð¿Ð¾Ð´ÐµÑˆÐ°Ð²Ð°ÑšÐ°, ÐºÐ¾Ð¿Ð¸Ñ€Ð°Ñ˜Ñ‚Ðµ Ñ‚ÐµÐºÑÑ‚ ÐºÐ¾Ñ˜Ð¸ ÑÐ»ÐµÐ´Ð¸ Ð¸ ÑÐ°Ñ‡ÑƒÐ²Ð°Ñ˜Ñ‚Ðµ Ð³Ð° Ñƒ Ð´Ð°Ñ‚Ð¾Ñ‚ÐµÐºÑƒ.',
		'ConfExternalPopup' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ ÑƒÐ²ÐµÑ›Ð°Ð½Ðµ ÑÐ»Ð¸ÐºÐµ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð° ÑÐ° ÑÐ¿Ð¾Ñ™Ð°ÑˆÑšÐ¸Ñ… ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°. <sup>Ð±ÐµÑ‚Ð°</sup>',
		'ConfFacebook-foREVer-Language' : 'ÐˆÐµÐ·Ð¸Ðº -foREVer- Script-Ð°',
		'ConfFacebookTimestamps' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð¤ÐµÑ˜ÑÐ±ÑƒÐº Ð²Ñ€ÐµÐ¼Ðµ (Ð½Ð¿Ñ€. "Ð¿Ñ€Ðµ 3 ÑÐ°Ñ‚Ð°").',
		'ConfFBFTimestamps' : 'Ð”Ð¾Ð´Ð°Ñ˜ -foREVer- Script Ð²Ñ€ÐµÐ¼Ðµ Ð¿Ð¾ÑÐ»Ðµ Ð¤ÐµÑ˜ÑÐ±ÑƒÐº Ð²Ñ€ÐµÐ¼ÐµÐ½Ð° (Ð½Ð¿Ñ€. "11:45").',
		'ConfFBFTimestamps24' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ -foREVer- Script Ð²Ñ€ÐµÐ¼ÐµÐ½Ð° Ñƒ 24-Ñ‡Ð°ÑÐ¾Ð²Ð½Ð¾Ð¼ Ð¾Ð±Ð»Ð¸ÐºÑƒ.',
		'ConfFriendRequestCountInTitle' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð±Ñ€Ð¾Ñ˜ Ð·Ð°Ñ…Ñ‚ÐµÐ²Ð° Ð·Ð° Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™ÑÑ‚Ð²Ð¾ Ñƒ Ð½Ð°ÑÐ»Ð¾Ð²Ñƒ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ.',
		'ConfGoogleApps' : 'ÐÐ°Ð¿Ñ€Ð°Ð²Ð¸ Ð²ÐµÐ·Ðµ Ð·Ð° Google ÐºÐ°Ð»ÐµÐ½Ð´Ð°Ñ€, Ð¿Ð¾Ð³Ð¾Ð´Ð½Ðµ Ð·Ð° Google Ð¾Ð²Ðµ Ð°Ð¿Ð»Ð¸ÐºÐ°Ñ†Ð¸Ñ˜Ðµ.',
		'ConfGoogleAppsDomain' : 'Ð”Ð¾Ð¼ÐµÐ½',
		'ConfGoogleCalendar' : 'Ð”Ð¾Ð´Ð°Ñ˜ Ð²ÐµÐ·Ðµ Ð·Ð° Ð´Ð¾Ð´Ð°Ð²Ð°ÑšÐµ Ñ€Ð¾Ñ’ÐµÐ½Ð´Ð°Ð½Ð° Ð¸ Ð´Ð¾Ð³Ð°Ñ’Ð°Ñ˜Ð° Ñƒ <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google ÐºÐ°Ð»ÐµÐ½Ð´Ð°Ñ€</a>.',
		'ConfGoogleLanguage' : 'ÐˆÐµÐ·Ð¸Ðº Ð·Ð° <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Ð¿Ñ€ÐµÐ²Ð¾Ð´Ð¸Ð»Ð°Ñ†</a>',
		'ConfHideApplicationStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° Ð¾ Ð°Ð¿Ð»Ð¸ÐºÐ°Ñ†Ð¸Ñ˜Ð°Ð¼Ð°.',
		'ConfHideEventStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° Ð¾ Ð´Ð¾Ð³Ð°Ñ’Ð°Ñ˜Ð¸Ð¼Ð°.',
 		'ConfHideFacebookCountInTitle' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¤ÐµÑ˜ÑÐ±ÑƒÐºÐ¾Ð² Ð±Ñ€Ð¾Ñ˜ Ð½Ð¾Ð²Ð¸Ñ… Ð¿Ñ€Ð¸Ð¼Ñ™ÐµÐ½Ð¸Ñ… Ð¿Ð¾Ñ€ÑƒÐºÐ°.',
		'ConfHideFriendStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° Ð¾ Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™ÑÑ‚Ð²Ð¸Ð¼Ð°.',
		'ConfHideGroupStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° Ð¾ Ð³Ñ€ÑƒÐ¿Ð°Ð¼Ð°.',
 		'ConfHideLikeStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° Ð¾ "Ð´Ð¾Ð¿Ð°Ð´Ð° Ð¼Ð¸ ÑÐµ" ÑÑ‚Ð°Ð²ÐºÐ°Ð¼Ð°.',
		'ConfHideLinkStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° Ð¾ Ð²ÐµÐ·Ð°Ð¼Ð°.',
		'ConfHideNoteStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° Ð¾ Ð·Ð°Ð¿Ð¸ÑÐ¸Ð¼Ð°.',
		'ConfHidePhotoStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° Ð¾ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð°Ð¼Ð°.',
		'ConfHideProfilePicStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° Ð¾ ÑÐ»Ð¸ÐºÐ°Ð¼Ð° Ð½Ð° Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ñƒ.',
		'ConfHideRead' : 'Ð£ Ð½Ð°Ñ˜Ð½Ð¾Ð²Ð¸Ñ˜Ð¸Ð¼ Ð´ÐµÑˆÐ°Ð²Ð°ÑšÐ¸Ð¼Ð° ÑÐ°ÐºÑ€Ð¸Ñ˜ ÑÑ‚Ð°Ð²ÐºÐµ ÐºÐ¾Ñ˜Ðµ ÑÑƒ Ð¾Ð·Ð½Ð°Ñ‡ÐµÐ½Ðµ ÐºÐ°Ð¾ Ð¿Ñ€Ð¾Ñ‡Ð¸Ñ‚Ð°Ð½Ðµ.',
		'ConfHideRelationshipStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° Ð¾ ÑÑ‚Ð°Ñ‚ÑƒÑÐ¸Ð¼Ð° Ð²ÐµÐ·Ðµ.',
		'ConfHideStatusStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¿Ñ€Ð¾Ð¼ÐµÐ½Ðµ ÑÑ‚Ð°Ñ‚ÑƒÑÐ°.',
		'ConfHideVideoStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° Ð¾ Ð²Ð¸Ð´ÐµÐ¾ Ð·Ð°Ð¿Ð¸ÑÐ¸Ð¼Ð°.',
		'ConfHideWallStories' : 'Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° ÑÐ° Ð·Ð¸Ð´Ð°.',
 		'ConfHomeBeta' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð¾Ð´ÐµÑ™Ð°Ðº ÑÐ° Ð¤ÐµÑ˜ÑÐ±ÑƒÐºÐ¾Ð²Ð¸Ð¼ Ð½Ð°Ñ˜Ð°Ð²Ð°Ð¼Ð°.',
		'ConfHomeChat' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð¾Ð´ÐµÑ™Ð°Ðº ÑÐ° Ñ›Ð°ÑÐºÐ°ÑšÐµÐ¼.',
		'ConfHomeEvents' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð¾Ð´ÐµÑ™Ð°Ðº ÑÐ° Ð´Ð¾Ð³Ð°Ñ’Ð°Ñ˜Ð¸Ð¼Ð°.',
		'ConfHomeFindFriends' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ "ÐŸÐ¾Ð²ÐµÐ¶Ð¸ ÑÐµ ÑÐ°" Ð¾Ð´ÐµÑ™Ð°Ðº.',
		'ConfHomeLeftAlign' : 'ÐŸÐ¾Ñ€Ð°Ð²Ð½Ð°Ñ˜ ÑÐ°Ð´Ñ€Ð¶Ð°Ñ˜ Ð¿Ð¾Ñ‡ÐµÑ‚Ð½Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ Ð¿Ð¾ Ð»ÐµÐ²Ð¾Ñ˜ ÑÑ‚Ñ€Ð°Ð½Ð¸.',
		'ConfHomeLeftColumn' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð»ÐµÐ²Ñƒ ÐºÐ¾Ð»Ð¾Ð½Ñƒ.',
		'ConfHomeLeftColumnFixed' : 'ÐÐµÐºÐ° Ð»ÐµÐ²Ð° ÐºÐ¾Ð»Ð¾Ð½Ð° Ð±ÑƒÐ´Ðµ Ð²Ð¸Ð´Ñ™Ð¸Ð²Ð° Ð¸ Ð¿Ñ€Ð¸Ð»Ð¸ÐºÐ¾Ð¼ Ð¿Ð¾Ð¼ÐµÑ€Ð°ÑšÐ° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ Ð½Ð° Ð´Ð¾Ð»Ðµ.',
		'ConfHomeLink' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð²ÐµÐ·Ñƒ Ð·Ð° ÐŸÐ¾Ñ‡ÐµÑ‚Ð½Ñƒ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ Ð½Ð° Ð³Ð¾Ñ€ÑšÐ¾Ñ˜ Ñ‚Ñ€Ð°Ñ†Ð¸ ÑÐ° Ð¼ÐµÐ½Ð¸Ñ˜Ð¸Ð¼Ð°.',
		'ConfHomeNavigation' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð¾Ð´ÐµÑ™Ð°Ðº Ð·Ð° Ð½Ð°Ð²Ð¸Ð³Ð°Ñ†Ð¸Ñ˜Ñƒ.',
		'ConfHomePokes' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ "Ð‘Ð¾Ñ†ÐºÐ°ÑšÐµ" Ð¾Ð´ÐµÑ™Ð°Ðº.',
		'ConfHomeProfile' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ "ÐŸÑ€Ð¾Ñ„Ð¸Ð»" Ð¾Ð´ÐµÑ™Ðº.',
 		'ConfHomeRecommendations' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð¿Ñ€ÐµÐ¿Ð¾Ñ€ÑƒÐºÐµ (ÐžÑÐ¾Ð±Ðµ ÐºÐ¾Ñ˜Ðµ Ð¼Ð¾Ð¶Ð´Ð° Ð¿Ð¾Ð·Ð½Ð°Ñ˜ÐµÑˆ, ÐŸÑ€ÐµÐ¿Ð¾Ñ€ÑƒÑ‡ÐµÐ½Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ Ð¸Ñ‚Ð´.).',
		'ConfHomeRequests' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ "Ð—Ð°Ñ…Ñ‚ÐµÐ²Ð¸" Ð¾Ð´ÐµÑ™Ð°Ðº.',
		'ConfHomeRightColumn' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð´ÐµÑÐ½Ñƒ ÐºÐ¾Ð»Ð¾Ð½Ñƒ.',
		'ConfHomeStretch' : 'Ð Ð°ÑˆÐ¸Ñ€Ð¸ Ð¿Ð¾Ñ‡ÐµÑ‚Ð½Ñƒ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ Ð½Ð° Ð¿ÑƒÐ½Ñƒ ÑˆÐ¸Ñ€Ð¸Ð½Ñƒ Ð¿Ñ€Ð¾Ð·Ð¾Ñ€Ð° Ð¿Ñ€ÐµÑ‚Ñ€Ð°Ð¶Ð¸Ð²Ð°Ñ‡Ð°.',
 		'ConfHomeStretchComments' : 'Ð Ð°ÑˆÐ¸Ñ€Ð¸ ÐºÐ¾Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ðµ Ð½Ð° Ð¿Ð¾Ñ‡ÐµÑ‚Ð½Ð¾Ñ˜ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸.',
		'ConfiCalendar' : 'Ð”Ð¾Ð´Ð°Ñ˜ Ð²ÐµÐ·Ðµ Ð·Ð° Ð¿Ñ€ÐµÑƒÐ·Ð¸Ð¼Ð°ÑšÐµ <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> Ð´Ð°Ñ‚Ð¾Ñ‚ÐµÐºÐµ ÑÐ° ÑÐ²Ð¸Ð¼ Ñ€Ð¾Ñ’ÐµÐ½Ð´Ð°Ð½Ð¸Ð¼Ð°.',
		'ConfImport' : 'Ð”Ð° Ð±Ð¸ÑÐµ ÐºÐ°ÑÐ½Ð¸Ñ˜Ðµ ÑƒÐ²ÐµÐ·Ð»Ð¸ ÑÐ²Ð¾Ñ˜Ð° Ð¿Ð¾Ð´ÐµÑˆÐ°Ð²Ð°ÑšÐ°, Ð·Ð°Ð¼ÐµÐ½Ð¸Ñ‚Ðµ Ñ‚ÐµÐºÑÑ‚ ÐºÐ¾Ñ˜Ð¸ ÑÐ»ÐµÐ´Ð¸ ÑÐ° Ñ‚ÐµÐºÑÑ‚Ð¾Ð¼ ÐºÐ¾Ñ˜Ð¸ ÑÑ‚Ðµ Ð¿Ñ€ÐµÑ‚Ñ…Ð¾Ð´Ð½Ð¾ ÑÐ°Ñ‡ÑƒÐ²Ð°Ð»Ð¸ Ð¸ ÐºÐ»Ð¸ÐºÐ½Ð¸Ñ‚Ðµ "Ð£Ð²Ð¾Ð·".',
		'ConfInboxCountInTitle' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð±Ñ€Ð¾Ñ˜ Ð½Ð¾Ð²Ð¸Ñ… Ð¿Ð¾Ñ€ÑƒÐºÐ° Ñƒ Ð½Ð°ÑÐ»Ð¾Ð²Ñƒ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ.',
		'ConfLogoutLink' : 'Ð”Ð¾Ð´Ð°Ñ˜ Ð²ÐµÐ·Ñƒ Ð·Ð° Ð¾Ð´Ñ˜Ð°Ð²Ñ™Ð¸Ð²Ð°ÑšÐµ Ð½Ð° Ð³Ð¾Ñ€ÑšÑƒ Ñ‚Ñ€Ð°ÐºÑƒ ÑÐ° Ð¼ÐµÐ½Ð¸Ñ˜Ð¸Ð¼Ð°.',
		'ConfNotificationCountInTitle' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð±Ñ€Ð¾Ñ˜ Ð½Ð¾Ð²Ð¸Ñ… Ð¾Ð±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ° Ñƒ Ð½Ð°ÑÐ»Ð¾Ð²Ñƒ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ.',
		'ConfNewTabSearch' : 'ÐšÐ°Ð´Ð° Ð¿Ñ€Ð¸Ñ‚Ð¸ÑÐ½ÐµÐ¼ CTRL + Enter Ð·Ð° Ð¿Ñ€ÐµÑ‚Ñ€Ð°Ð³Ñƒ, Ð¾Ñ‚Ð²Ð¾Ñ€Ð¸ Ñ€ÐµÐ·ÑƒÐ»Ñ‚Ð°Ñ‚Ðµ Ð¿Ñ€ÐµÑ‚Ñ€Ð°Ð³Ðµ Ñƒ Ð½Ð¾Ð²Ð¾Ñ˜ ÐºÐ°Ñ€Ñ‚Ð¸Ñ†Ð¸/Ð¿Ñ€Ð¾Ð·Ð¾Ñ€Ñƒ.',
		'ConfPageTitle' : 'Ð£ÐºÐ»Ð¾Ð½Ð¸ "Facebook |" Ð¸Ð· Ð½Ð°ÑÐ»Ð¾Ð²Ð° ÑÐ²Ð¸Ñ… ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°.',
		'ConfPhotoPopup' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð²ÐµÑ›Ðµ Ð²ÐµÑ€Ð·Ð¸Ñ˜Ðµ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð° Ð¿Ñ€Ð¸Ð»Ð¸ÐºÐ¾Ð¼ Ð¿Ñ€ÐµÐ»Ð°ÑÐºÐ° Ð¼Ð¸ÑˆÐµÐ¼.',
		'ConfPopupAutoClose' : 'ÐÑƒÑ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸ Ð·Ð°Ñ‚Ð²Ð¾Ñ€Ð¸ ÑƒÐ²ÐµÑ›Ð°Ð½Ðµ ÑÐ»Ð¸ÐºÐµ.',
		'ConfPopupSmartAutoClose' : 'ÐÐµ Ð·Ð°Ñ‚Ð²Ð°Ñ€Ð°Ñ˜ ÑƒÐ²ÐµÑ›Ð°Ð½Ðµ ÑÐ»Ð¸ÐºÐµ Ð°ÐºÐ¾ Ñ˜Ðµ Ð¿Ð¾ÐºÐ°Ð·Ð¸Ð²Ð°Ñ‡ Ð¼Ð¸ÑˆÐ° Ð½Ð° ÑšÐ¸Ð¼Ð°.',
		'ConfPopupPosition' : 'ÐŸÐ¾Ð»Ð¾Ð¶Ð°Ñ˜ ÑƒÐ²ÐµÑ›Ð°Ð½Ð¸Ñ… ÑÐ»Ð¸ÐºÐ°',
		'ConfProcessInterval' : 'Ð˜Ð½Ñ‚ÐµÑ€Ð²Ð°Ð» Ð·Ð° Ð¾Ð±Ñ€Ð°Ð´Ñƒ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ, Ñƒ Ð¼Ð¸Ð»Ð¸ÑÐµÐºÑƒÐ½Ð´Ð°Ð¼Ð° (Ð¿Ð¾Ð´Ñ€Ð°Ð·ÑƒÐ¼ÐµÐ²Ð°Ð½Ð¾=1000):',
		'ConfProfileLink' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð²ÐµÐ·Ñƒ Ð·Ð° ÐŸÑ€Ð¾Ñ„Ð¸Ð» Ð½Ð° Ð³Ð¾Ñ€ÑšÑƒ Ñ‚Ñ€Ð°ÐºÑƒ ÑÐ° Ð¼ÐµÐ½Ð¸Ñ˜Ð¸Ð¼Ð°.',
		'ConfProfilePicPopup' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð²ÐµÑ›Ðµ Ð²ÐµÑ€Ð·Ð¸Ñ˜Ðµ ÑÐ»Ð¸ÐºÐ° Ð½Ð° Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ñƒ Ð¿Ñ€Ð¸Ð»Ð¸ÐºÐ¾Ð¼ Ð¿Ñ€ÐµÐ»Ð°ÑÐºÐ° Ð¼Ð¸ÑˆÐµÐ¼',
		'ConfProtocolLinks' : 'ÐŸÑ€ÐµÑ‚Ð²Ð¾Ñ€Ð¸ Ð½Ð°Ð´Ð¸Ð¼ÐºÐµ Ð¿Ñ€Ð¾Ð³Ñ€Ð°Ð¼Ð° Ð·Ð° ÐºÐ¾Ð¼ÑƒÐ½Ð¸ÐºÐ°Ñ†Ð¸Ñ˜Ñƒ (Google Talk, Windows Live Ð¸ Ð´Ñ€.) ÑÐ° Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð° Ñƒ Ð²ÐµÐ·Ðµ ÐºÐ¾Ñ˜Ð¸Ð¼Ð° Ñ›Ðµ ÑÐµ Ð·Ð°Ð¿Ð¾Ñ‡ÐµÑ‚Ð¸ Ñ›Ð°ÑÐºÐ°ÑšÐµ.',
		'ConfSectionAbout' : 'Ðž Ð´Ð¾Ð´Ð°Ñ‚ÐºÑƒ -foREVer- Script',
		'ConfSectionAdvanced' : 'Ð’Ð¸ÑˆÐµ Ð¾Ð¿Ñ†Ð¸Ñ˜Ð°',
		'ConfSectionEvents' : 'Ð Ð¾Ñ’ÐµÐ½Ð´Ð°Ð½Ð¸/Ð´Ð¾Ð³Ð°Ñ’Ð°Ñ˜Ð¸',
		'ConfSectionImportExport' : 'Ð£Ð²Ð¾Ð·/Ð˜Ð·Ð²Ð¾Ð·',
		'ConfSectionFeeds' : 'ÐÐ¾Ð²Ð¾ÑÑ‚Ð¸',
		'ConfSectionHomePage' : 'ÐŸÐ¾Ñ‡ÐµÑ‚Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°',
		'ConfSectionLiveFeed' : 'ÐÐ°Ñ˜Ð½Ð¾Ð²Ð¸Ñ˜Ðµ',
		'ConfSectionMenu' : 'ÐœÐµÐ½Ð¸Ñ˜Ð¸/Ñ›Ð°ÑÐºÐ°ÑšÐµ',
		'ConfSectionOther' : 'ÐžÑÑ‚Ð°Ð»Ðµ Ð¾Ð¿Ñ†Ð¸Ñ˜Ðµ',
		'ConfSectionPageTitle' : 'ÐÐ°ÑÐ»Ð¾Ð² ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ',
		'ConfSectionPictures' : 'Ð¡Ð»Ð¸ÐºÐµ',
		'ConfSectionShortcuts' : 'ÐŸÑ€ÐµÑ‡Ð¸Ñ†Ðµ ÑÐ° Ñ‚Ð°ÑÑ‚Ð°Ñ‚ÑƒÑ€Ðµ',
		'ConfSecureLinks' : 'ÐŸÑ€Ð¸ÑÐ¸Ð»Ð¸ ÑƒÑÐ¼ÐµÑ€Ð°Ð²Ð°ÑšÐµ Ð¤ÐµÑ˜ÑÐ±ÑƒÐº Ð²ÐµÐ·Ð° Ð½Ð° HTTPS ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ.',
		'ConfShortcutList' : '<b>ÐŸÑ€ÐµÑ‡Ð¸Ñ†Ðµ ÑÐ° Ñ‚Ð°ÑÑ‚Ð°Ñ‚ÑƒÑ€Ðµ</b> (Ñ€Ð°Ð·Ð»Ð¸ÐºÑƒÑ˜Ñƒ ÑÐµ Ð¼Ð°Ð»Ð° Ð¸ Ð²ÐµÐ»Ð¸ÐºÐ° ÑÐ»Ð¾Ð²Ð°):<br /><br /><i>Ð¡Ð° Ð±Ð¸Ð»Ð¾ ÐºÐ¾Ñ˜Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ:</i><br /> <b>A</b> - ÐÐ»Ð±ÑƒÐ¼Ð¸/Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ðµ<br /> <b>B</b> - Ð¡Ð¿Ð¸ÑÐ°Ðº Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¸Ñ… Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™Ð°<br /> <b>C</b> - -foREVer- Script Ð¿Ð¾Ð´ÐµÑˆÐ°Ð²Ð°ÑšÐ°<br /> <b>D</b> - Ð Ð¾Ñ’ÐµÐ½Ð´Ð°Ð½Ð¸<br /> <b>E</b> - Ð”Ð¾Ð³Ð°Ñ’Ð°Ñ˜Ð¸<br /> <b>F</b> - ÐŸÑ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™Ð¸<br /> <b>H</b> - ÐŸÐ¾Ñ‡ÐµÑ‚Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°<br /> <b>I</b> - ÐŸÑ€Ð¸Ð¼Ñ™ÐµÐ½Ðµ Ð¿Ð¾Ñ€ÑƒÐºÐµ<br /> <b>K</b> - Ð´Ð¾Ð´Ð°Ñ˜ Ð·Ð°Ð±ÐµÐ»ÐµÑˆÐºÑƒ<br /> <b>L</b> - ÐžÐ·Ð½Ð°Ñ‡Ð¸ Ð²ÐµÐ·Ñƒ Ð·Ð° Ð¾Ð´Ñ˜Ð°Ð²Ñƒ (Ð¿Ñ€Ð¸Ñ‚Ð¸ÑÐ½Ð¸Ñ‚Ðµ Ð•Ð½Ñ‚ÐµÑ€ Ð½Ð°ÐºÐ¾Ð½ Ñ‚Ð¾Ð³Ð° Ð·Ð° Ð¾Ð´Ñ˜Ð°Ð²Ñ™Ð¸Ð²Ð°ÑšÐµ)<br /> <b>N</b> - ÐžÐ±Ð°Ð²ÐµÑˆÑ‚ÐµÑšÐ°<br /> <b>P</b> - ÐŸÑ€Ð¾Ñ„Ð¸Ð»<br /> <b>R</b> - Ð—Ð°Ñ…Ñ‚ÐµÐ²Ð¸<br /> <b>S</b> - ÐŸÑ€ÐµÐ»Ð°Ð·Ð°Ðº Ð½Ð° Ð¿Ð¾Ñ™Ðµ Ð·Ð° Ð¿Ñ€ÐµÑ‚Ñ€Ð°Ð³Ñƒ<br /> <b>T</b> - ÐŸÑ€ÐµÐ²ÐµÐ´Ð¸ Ð¾Ð´Ð°Ð±Ñ€Ð°Ð½Ð¸ Ñ‚ÐµÐºÑÑ‚<br /> <b>?</b> - ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð¸Ð·Ð²ÐµÑˆÑ‚Ð°Ñ˜ Ð¾ Ð³Ñ€ÐµÑˆÑ†Ð¸ -foREVer- Script-Ð°<br /> <b><escape></b> - Ð—Ð°Ñ‚Ð²Ð¾Ñ€Ð¸ Ð¸ÑÐºÐ°Ñ‡ÑƒÑ›Ðµ Ð¿Ñ€Ð¾Ð·Ð¾Ñ€Ðµ ÐºÐ¾Ñ˜Ðµ Ñ˜Ðµ Ð½Ð°Ð¿Ñ€Ð°Ð²Ð¸Ð¾ -foREVer- Script<br /><br /><i>Ð¡Ð° Ð¿Ð¾Ñ‡ÐµÑ‚Ð½Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ (Ñ„Ð¸Ð»Ñ‚ÐµÑ€Ð¸)</i>:<br /> <b>a</b> - Ð¡Ñ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ<br /> <b>f</b> - ÐÐ°Ñ˜Ð½Ð¾Ð²Ð¸Ñ˜Ðµ<br /> <b>g</b> - Ð“Ñ€ÑƒÐ¿Ðµ<br /> <b>l</b> - Ð’ÐµÐ·Ðµ<br /> <b>n</b> - ÐÐ¾Ð²Ð¾ÑÑ‚Ð¸<br /> <b>p</b> - Ð¤Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ðµ<br /> <b>s</b> Ð¸Ð»Ð¸ <b>u</b> - ÐŸÑ€Ð¾Ð¼ÐµÐ½Ðµ ÑÑ‚Ð°Ñ‚ÑƒÑÐ°<br /> <b>t</b> - Ð‘ÐµÐ»ÐµÑˆÐºÐµ<br /> <b>v</b> - Ð’Ð¸Ð´ÐµÐ¾<br /><br /><i>Ð¡Ð° Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð°</i>:<br /> <b>i</b> - Ð˜Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ˜Ðµ<br /> <b>p</b> - Ð¤Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ðµ<br /> <b>w</b> - Ð—Ð¸Ð´<br /> <b>x</b> - ÐžÐºÐ²Ð¸Ñ€Ð¸<br /><br /><i>Ð¡Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° ÑÐ° Ð½Ð°Ð±Ñ€Ð°Ñ˜Ð°ÑšÐµÐ¼ (Ð¿Ñ€ÐµÑ‚Ñ…Ð¾Ð´Ð½Ð°, ÑÐ»ÐµÐ´Ñ›Ð°, Ð¸Ñ‚Ð´.)</i><br /> <b><ÑÑ‚Ñ€ÐµÐ»Ð¸Ñ†Ð° Ð»ÐµÐ²Ð¾></b> - ÐŸÑ€ÐµÑ‚Ñ…Ð¾Ð´Ð½Ð°<br /> <b><ÑÑ‚Ñ€ÐµÐ»Ð¸Ñ†Ð° Ð´ÐµÑÐ½Ð¾></b> - Ð¡Ð»ÐµÐ´ÐµÑ›Ð°<br /> <b><ÑˆÐ¸Ñ„Ñ‚> + <ÑÑ‚Ñ€ÐµÐ»Ð¸Ñ†Ð° Ð»ÐµÐ²Ð¾></b> - ÐŸÑ€Ð²Ð° (Ð°ÐºÐ¾ Ñ˜Ðµ Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾)<br /> <b><ÑˆÐ¸Ñ„Ñ‚> + <ÑÑ‚Ñ€ÐµÐ»Ð¸Ñ†Ð° Ð´ÐµÑÐ½Ð¾></b> - ÐŸÐ¾ÑÐ»ÐµÐ´ÑšÐ° (Ð°ÐºÐ¾ Ñ˜Ðµ Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾)<br /><br /><i>ÐŸÑ€Ð¸Ð»Ð¸ÐºÐ¾Ð¼ Ð¿Ñ€ÐµÐ³Ð»ÐµÐ´Ð°Ð²Ð°ÑšÐ° Ð°Ð»Ð±ÑƒÐ¼Ð°/Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð°:</i><br /> <b>a</b> - Ð£Ñ‡Ð¸Ñ‚Ð°Ñ˜ ÑÐ²Ðµ ÑÐ»Ð¸Ñ‡Ð¸Ñ†Ðµ (Ð°ÐºÐ¾ Ñ˜Ðµ Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾)<br /> <b>b</b> - ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð²ÐµÐ»Ð¸ÐºÐµ ÑÐ»Ð¸ÐºÐµ<br /> <b>c</b> - ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ ÐºÐ¾Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ðµ<br /> <b>k</b> - ÐÐ°Ð·Ð°Ð´ Ð½Ð° Ð°Ð»Ð±ÑƒÐ¼<br /> <b>m</b> - Ð¤Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ðµ ÑÐ° (ÐºÐ¾Ñ€Ð¸ÑÐ½Ð¸ÐºÐ¾Ð¼) Ð¸ ÑÐ° Ð¼Ð½Ð¾Ð¼<br /><br /><i>ÐŸÑ€Ð¸ Ð¿Ñ€ÐµÐ³Ð»ÐµÐ´Ð°Ð²Ð°ÑšÑƒ ÑÐºÐ¾Ñ€Ð°ÑˆÑšÐ¸Ñ… Ð°Ð»Ð±ÑƒÐ¼Ð° Ð¸ Ð¿Ð¾ÑÑ‚Ð°Ð²Ñ™ÐµÐ½Ð¸Ñ…/Ð¾Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ñ… Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð°:</i><br /> <b>a</b> Ð¸Ð»Ð¸  <b>r</b> - Ð¡ÐºÐ¾Ñ€Ð°ÑˆÑšÐ¸ Ð°Ð»Ð±ÑƒÐ¼Ð¸<br /> <b>m</b> Ð¸Ð»Ð¸  <b>u</b> - ÐŸÐ¾ÑÑ‚Ð°Ð²Ñ™ÐµÐ½Ð¾ Ð¿Ñ€ÐµÐºÐ¾ Ð¼Ð¾Ð±Ð¸Ð»Ð½Ð¾Ð³ Ñ‚ÐµÐ»ÐµÑ„Ð¾Ð½Ð°<br /> <b>o</b> - Ð¤Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ðµ Ð½Ð° ÐºÐ¾Ñ˜Ð¸Ð¼Ð° ÑÐ°Ð¼ Ñ˜Ð°<br /> <b>p</b> - ÐœÐ¾Ñ˜Ðµ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ðµ<br /> <b>t</b> Ð¸Ð»Ð¸  <b>f</b> - ÐžÐ·Ð½Ð°Ñ‡ÐµÐ½Ð¸ Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™Ð¸',
		'ConfShortcuts' : 'ÐžÐ¼Ð¾Ð³ÑƒÑ›Ð¸ Ð¿Ñ€ÐµÑ‡Ð¸Ñ†Ðµ ÑÐ° Ñ‚Ð°ÑÑ‚Ð°Ñ‚ÑƒÑ€Ðµ.',
		'ConfSign' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ ÐºÐ¾Ñ€Ð¸ÑÐ½Ð¸ÐºÐ¾Ð² Ñ…Ð¾Ñ€Ð¾ÑÐºÐ¾Ð¿ÑÐºÐ¸ Ð·Ð½Ð°Ðº Ð½Ð° ÑšÐµÐ³Ð¾Ð²Ð¾Ð¼ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ñƒ (ÑƒÐºÐ¾Ð»Ð¸ÐºÐ¾ Ñ˜Ðµ Ð½Ð°Ð²ÐµÐ´ÐµÐ½ Ð¿ÑƒÐ½ Ð´Ð°Ñ‚ÑƒÐ¼ Ñ€Ð¾Ñ’ÐµÑšÐ°).',
		'ConfTopBarFixed' : 'Ð—Ð°Ð´Ñ€Ð¶Ð¸ Ð³Ð¾Ñ€ÑšÑƒ Ñ‚Ñ€Ð°ÐºÑƒ ÑÐ° Ð¼ÐµÐ½Ð¸Ñ˜Ð¸Ð¼Ð° Ð½Ð° ÐµÐºÑ€Ð°Ð½Ñƒ Ð¸ Ð¿Ñ€Ð¸Ð»Ð¸ÐºÐ¾Ð¼ Ð¿Ð¾Ð¼ÐµÑ€Ð°ÑšÐ° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ Ð½Ð° Ð´Ð¾Ð»Ðµ.',
		'ConfTopBarHoverOpacity' : 'ÐŸÑ€Ð¸Ð»Ð¸ÐºÐ¾Ð¼ Ð¿Ñ€ÐµÐ»Ð°ÑÐºÐ° Ð¼Ð¸ÑˆÐµÐ¼',
		'ConfTopBarOpacity' : 'ÐŸÑ€Ð¾Ð²Ð¸Ð´Ð½Ð¾ÑÑ‚ Ð“Ð¾Ñ€ÑšÐµ Ñ‚Ñ€Ð°ÐºÐµ ÑÐ° Ð¼ÐµÐ½Ð¸Ñ˜Ð¸Ð¼Ð°',
		'ConfUpdates' : 'Ð¡Ð²Ð°ÐºÐ¾Ð´Ð½ÐµÐ²Ð½Ð¾ Ð¿Ñ€Ð¾Ð²ÐµÑ€Ð°Ð²Ð°Ñ˜ Userscripts.org Ð·Ð° Ð½Ð°Ð´Ð¾Ð³Ñ€Ð°Ð´ÑšÐµ -foREVer- Script-Ð°. Ð˜Ð»Ð¸ <a href="#" id="fbfUpdateLink" onclick="return false;">Ð¿Ñ€Ð¾Ð²ÐµÑ€Ð¸ ÑÐ°Ð´Ð°</a>.',
		'DownloadVideo' : 'ÐŸÑ€ÐµÑƒÐ·Ð¼Ð¸ Ð²Ð¸Ð´ÐµÐ¾',
		'ExportICalendarFile' : 'Ð˜Ð·Ð²ÐµÐ·Ð¸ iCalendar Ð´Ð°Ñ‚Ð¾Ñ‚ÐµÐºÑƒ',
		'ExportICalendarFileWarning' : '(ÐžÐ²Ð¾ Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð¿Ð¾Ñ‚Ñ€Ð°Ñ˜Ðµ Ð°ÐºÐ¾ Ð¸Ð¼Ð°Ñ‚Ðµ Ð¼Ð½Ð¾Ð³Ð¾ Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™Ð°)',
		'Facebook-foREVer-Conflict' : '-foREVer- Script ÑÐµ ÑÐ°Ð´Ð° Ð·Ð¾Ð²Ðµ -foREVer- Script. Ð—Ð±Ð¾Ð³ Ð¿Ñ€Ð¾Ð¼ÐµÐ½Ðµ Ð¸Ð¼ÐµÐ½Ð° Ð¼Ð¾Ñ€Ð°Ñ›ÐµÑ‚Ðµ Ñ€ÑƒÑ‡Ð½Ð¾ Ð´Ð° ÑƒÐºÐ»Ð¾Ð½Ð¸Ñ‚Ðµ -foREVer- Script Ð¸Ð· ÑÐ²Ð¾Ð³ Ð¿Ñ€ÐµÐ³Ð»ÐµÐ´Ð°Ñ‡Ð° Ð´Ð° Ð½Ðµ Ð±Ð¸ Ð´Ð¾ÑˆÐ»Ð¾ Ð´Ð¾ Ð¾Ð¼ÐµÑ‚Ð°ÑšÐ° Ð¸Ð·Ð¼ÐµÑ’Ñƒ Ð¾Ð²Ðµ Ð´Ð²Ðµ ÑÐºÑ€Ð¸Ð¿Ñ‚Ðµ. ÐÐºÐ¾ Ð½Ð¸ÑÑ‚Ðµ ÑÐ¸Ð³ÑƒÑ€Ð½Ð¸ ÐºÐ°ÐºÐ¾ Ð´Ð° ÑƒÐºÐ»Ð¾Ð½Ð¸Ñ‚Ðµ ÑÐºÑ€Ð¸Ð¿Ñ‚Ñƒ, <a %s>ÐºÐ»Ð¸ÐºÐ½Ð¸Ñ‚Ðµ Ð¾Ð²Ð´Ðµ Ð·Ð° ÑƒÐ¿ÑƒÑ‚ÑÑ‚Ð²Ð¾</a>.',
		'fullAlbumLoaded' : 'Ñ†ÐµÐ¾ Ð°Ð»Ð±ÑƒÐ¼ Ñ˜Ðµ ÑƒÑ‡Ð¸Ñ‚Ð°Ð½',
		'Import' : 'Ð£Ð²Ð¾Ð·',
		'ImportConfirm' : 'Ð”Ð° Ð»Ð¸ ÑÑ‚Ðµ ÑÐ¸Ð³ÑƒÑ€Ð½Ð¸ Ð´Ð° Ð¶ÐµÐ»Ð¸Ñ‚Ðµ Ð´Ð° ÑƒÐ²ÐµÐ·ÐµÑ‚Ðµ Ð¾Ð²Ð° Ð¿Ð¾Ð´ÐµÑˆÐ°Ð²Ð°ÑšÐ°?\nÐ’Ð°ÑˆÐ° Ñ‚Ñ€ÐµÐ½ÑƒÑ‚Ð½Ð° Ð¿Ð¾Ð´ÐµÑˆÐ°Ð²Ð°ÑšÐ° Ñ›Ðµ Ð±Ð¸Ñ‚Ð¸ Ð¿Ð¾Ð½Ð¸ÑˆÑ‚ÐµÐ½Ð°.',
		'ImportFailure' : 'Ð”Ð¾ÑˆÐ»Ð¾ Ñ˜Ðµ Ð´Ð¾ Ð³Ñ€ÐµÑˆÐºÐµ Ð¿Ñ€Ð¸Ð»Ð¸ÐºÐ¾Ð¼ ÑƒÐ²Ð¾Ð·Ð° Ð²Ð°ÑˆÐ¸Ñ… Ð¿Ð¾Ð´ÐµÑˆÐ°Ð²Ð°ÑšÐ°.',
		'ImportSuccess' : 'Ð£Ð²Ð¾Ð· Ñ˜Ðµ Ð·Ð°Ð²Ñ€ÑˆÐµÐ½. Ð”Ð° Ð»Ð¸ Ð¶ÐµÐ»Ð¸Ñ‚Ðµ Ð´Ð° Ð¾ÑÐ²ÐµÐ¶Ð¸Ñ‚Ðµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ?',
		'Left' : 'Ð›ÐµÐ²Ð¾',
		'LoadingAllPhotos' : 'Ð£Ñ‡Ð¸Ñ‚Ð°Ð²Ð°ÑšÐµ ÑÐ²Ð¸Ñ… Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð°...',
		'loadingFullAlbum' : 'ÑƒÑ‡Ð¸Ñ‚Ð°Ð²Ð°ÑšÐµ ÑÐ²Ð¸Ñ… Ð°Ð»Ð±ÑƒÐ¼Ð°...',
		'LoadingPic' : 'Ð£Ñ‡Ð¸Ñ‚Ð°Ð²Ð°ÑšÐµ ÑÐ»Ð¸ÐºÐµ...',
		'LoadPhotosWarning' : 'Ð£Ñ‡Ð¸Ñ‚Ð°Ð²Ð°ÑšÐµ ÑÐ²Ð¸Ñ… Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð° Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð¿Ð¾Ñ‚Ñ€Ð°Ñ˜Ðµ Ð½ÐµÐºÐ¾ Ð²Ñ€ÐµÐ¼Ðµ',
		'Months' : new Array('ÐˆÐ°Ð½ÑƒÐ°Ñ€','Ð¤ÐµÐ±Ñ€ÑƒÐ°Ñ€','ÐœÐ°Ñ€Ñ‚','ÐÐ¿Ñ€Ð¸Ð»','ÐœÐ°Ñ˜','ÐˆÑƒÐ½','ÐˆÑƒÐ»','ÐÐ²Ð³ÑƒÑÑ‚','Ð¡ÐµÐ¿Ñ‚ÐµÐ¼Ð±Ð°Ñ€','ÐžÐºÑ‚Ð¾Ð±Ð°Ñ€','ÐÐ¾Ð²ÐµÐ¼Ð±Ð°Ñ€','Ð”ÐµÑ†ÐµÐ¼Ð±Ð°Ñ€'),
		'ProtocolSkype' : 'ÐŸÐ¾Ð·Ð¾Ð²Ð¸ ÐºÐ¾Ñ€Ð¸ÑÐ½Ð¸ÐºÐ° %s Ð¿ÑƒÑ‚ÐµÐ¼ Ð¿Ñ€Ð¾Ð³Ñ€Ð°Ð¼Ð° Skype',
		'ProtocolMSN' : 'Ð‹Ð°ÑÐºÐ°Ñ˜ ÑÐ° ÐºÐ¾Ñ€Ð¸ÑÐ½Ð¸ÐºÐ¾Ð¼ %s Ð¿ÑƒÑ‚ÐµÐ¼ Ð¿Ñ€Ð¾Ð³Ñ€Ð°Ð¼Ð° Windows Live',
		'ProtocolYahoo' : 'Ð‹Ð°ÑÐºÐ°Ñ˜ ÑÐ° ÐºÐ¾Ñ€Ð¸ÑÐ½Ð¸ÐºÐ¾Ð¼ %s Ð¿ÑƒÑ‚ÐµÐ¼ Ð¿Ñ€Ð¾Ð³Ñ€Ð°Ð¼Ð° Yahoo Messenger',
		'ProtocolGoogle' : 'Ð‹Ð°ÑÐºÐ°Ñ˜ ÑÐ° ÐºÐ¾Ñ€Ð¸ÑÐ½Ð¸ÐºÐ¾Ð¼ %s Ð¿ÑƒÑ‚ÐµÐ¼ Ð¿Ñ€Ð¾Ð³Ñ€Ð°Ð¼Ð° Google Talk',
		'ReloadErrorPage' : 'ÐšÐ»Ð¸ÐºÐ½Ð¸Ñ‚Ðµ Ð´Ð° Ð¿Ð¾ÐºÑƒÑˆÐ°Ñ‚Ðµ Ð¿Ð¾Ð½Ð¾Ð²Ð¾, Ð¸Ð»Ð¸ ÑÐ°Ñ‡ÐµÐºÐ°Ñ˜Ñ‚Ðµ 5 ÑÐµÐºÑƒÐ½Ð´Ð¸',
		'Refresh' : 'ÐžÑÐ²ÐµÐ¶Ð¸',
		'Remove' : 'Ð£ÐºÐ»Ð¾Ð½Ð¸',
		'Right' : 'Ð”ÐµÑÐ½Ð¾',
		'ShowBigPictures' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð²ÐµÐ»Ð¸ÐºÐµ ÑÐ»Ð¸ÐºÐµ',
		'Signs' : new Array('ÐˆÐ°Ñ€Ð°Ñ†','Ð’Ð¾Ð´Ð¾Ð»Ð¸Ñ˜Ð°','Ð Ð¸Ð±Ðµ','ÐžÐ²Ð°Ð½','Ð‘Ð¸Ðº','Ð‘Ð»Ð¸Ð·Ð°Ð½Ñ†Ð¸','Ð Ð°Ðº','Ð›Ð°Ð²','Ð”ÐµÐ²Ð¸Ñ†Ð°','Ð’Ð°Ð³Ð°','Ð¨ÐºÐ¾Ñ€Ð¿Ð¸Ñ˜Ð°','Ð¡Ñ‚Ñ€ÐµÐ»Ð°Ñ†'),
		'today' : 'Ð´Ð°Ð½Ð°Ñ',
		'Translators' : 'ÐŸÑ€ÐµÐ²Ð¾Ð´Ð¸Ð¾Ñ†Ð¸',
		'UpdateAvailable1' : 'Ð”Ð¾ÑÑ‚ÑƒÐ¿Ð½Ðµ ÑÑƒ Ð½Ð°Ð´Ð¾Ð³Ñ€Ð°Ð´ÑšÐµ Ð·Ð° -foREVer- Script',
		'UpdateAvailable2' : 'Ð–ÐµÐ»Ð¸Ñ‚Ðµ Ð»Ð¸ ÑÐ°Ð´Ð° Ð´Ð° Ð½Ð°Ð´Ð¾Ð³Ñ€Ð°Ð´Ð¸Ñ‚Ðµ?',
		'UpdateHomepage' : 'Ð˜Ð´Ð¸ Ð½Ð° Ð¿Ð¾Ñ‡ÐµÑ‚Ð½Ñƒ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ',
		'UpdateInstall' : 'Ð˜Ð½ÑÑ‚Ð°Ð»Ð¸Ñ€Ð°Ñ˜ Ð¾Ð´Ð¼Ð°Ñ…',
		'UpdateTomorrow' : 'ÐŸÐ¾Ð´ÑÐµÑ‚Ð¸ Ð¼Ðµ ÑÑƒÑ‚Ñ€Ð°',
 		'ViewAlbumComments' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ ÐºÐ¾Ð¼ÐµÐ½Ñ‚Ð°Ñ€Ðµ Ð°Ð»Ð±ÑƒÐ¼Ð°',
		'yearsOld' : '%s Ð³Ð¾Ð´Ð¸Ð½Ð°'
	},

	// Serbian (Latin) - Contributed by GorÅ¡tak (20100817)
	sr : {
		'_language' : 'Serbian (Latin)',
		'AddToCalendar' : 'Dodaj u kalendar',
		'AddToGoogleCalendar' : 'Dodaj u Google kalendar',
		'all' : 'sve',
		'All' : 'Sve',
		'AllPhotosLoaded' : 'Sve fotografije su uÄitane',
		'Automatic' : 'Automatski',
		'Birthday' : 'RoÄ‘endan korisnika %s',
		'BookmarkAdd' : 'Dodaj novu zabeleÅ¡ku',
		'BookmarkExists' : 'Ova stranica je veÄ‡ dodata u zabeleÅ¡ke.\n\nIdite na stranicu koju Å¾elite da dodate i pokuÅ¡ajte ponovo.',
		'BookmarkNamePrompt' : 'Unesite naziv ove zabeleÅ¡ke:\n%s',
 		'BookmarksConfirmRemoval' : 'Da li ste sigurni da Å¾elite da uklonite ove zabeleÅ¡ke?',
 		'BookmarksManage' : 'Uredi zabeleÅ¡ke',
 		'BookmarksRemoveSelected' : 'Ukloni izabrane zabeleÅ¡ke',
		'Bookmarks' : 'ZabeleÅ¡ke',
		'BrowserUnsupported' : 'VaÅ¡ pretraÅ¾ivaÄ ne podrÅ¾ava ovu opciju.',
		'CreatingFile' : 'Datoteka se izraÄ‘uje',
		'Close' : 'Zatvori',
		'ConfigureFacebook-foREVer-' : 'Podesi -foREVer- Script',
		'ConfigureInstructions' : 'Sve izmene se se odmah pamte, ali ponekad je potrebno osveÅ¾iti otvorene stranice da bi izmene delovale.',
		'ConfAge' : 'PrikaÅ¾i uzrast osobe na profilu (ukoliko je naveden pun datum poÄ‘enja).',
 		'ConfAlbumComments' : 'Dodaj vezu na stranici albuma kojom bi se prikazali svi komentari albuma.',
		'ConfApplicationWhitelist' : 'Spisak dozvoljenih aplikacija - Unesite oznaku aplikacije kako biste spreÄili njeno sakrivanje. Razdvojte oznake razmakom.',
		'ConfAutoBigAlbumPictures' : 'Automatski prikaÅ¾i veÄ‡e fotografije iz albuma kada se stranica otvori.',
		'ConfAutoLoadFullAlbum' : 'Automatski, na jednoj stranici, uÄitaj sliÄice svih fotografija iz albuma.',
		'ConfAutoLoadTaggedPhotos' : 'Automatski, na jednoj stranici, uÄitaj sliÄice svih oznaÄenih fotografija (na kartici "Fotografije" unutar profila).',
		'ConfAutoReadMore' : 'Automatski klikni na vezu "starije".',
		'ConfBigAlbumPictures' : 'Na stranici albuma dodaj vezu za prikazivanje veÄ‡ih sliÄica svih fotografija sa te stranice.',
		'ConfBookmarks' : 'Dodaj podmeni "ZabeleÅ¡ke" na gornju traku sa menijima.',
		'ConfBottomBarHoverOpacity' : 'Prilikom prelaska miÅ¡em',
		'ConfBottomBarOpacity' : 'Providnost donje trake sa menijima',
		'ConfCalendarBirthDate' : 'UkljuÄi datum roÄ‘enja korisnika u detaljima dogaÄ‘aja.',
		'ConfCalendarFullName' : 'Dodaj i prezime korisnika u naslovu roÄ‘endana.',
		'ConfChatDifferentiate' : 'OznaÄi dostupne prijatelje podebljanim slovima a neaktivne kosim slovima.',
		'ConfChatHideIdle' : 'Sakrij neaktivne prijatelje.',
		'ConfDelayPopupPics' : 'UkljuÄi kratak zastoj pre prikazivanja uveÄ‡anih slika.',
		'ConfDelayPopupPicsTimeout' : 'Zastoj pre prikazivanja uveÄ‡anih slika, u milisekundama (podrazumevano=500):',
		'ConfDownloadVideo' : 'Dodaj vezu za preuzimanje video snimka sa stranice za video. (MoÅ¾da Ä‡e vam trebati <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Automatsko ponovno uÄitavanje stranice nakon 5 sekundi, u sluÄaju greÅ¡ke.',
		'ConfExport' : 'Da biste izvezli svoja podeÅ¡avanja, kopirajte tekst koji sledi i saÄuvajte ga u datoteku.',
		'ConfExternalPopup' : 'PrikaÅ¾i uveÄ‡ane slike fotografija sa spoljaÅ¡njih stranica. <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : 'Jezik -foREVer- Script-a',
		'ConfFacebookTimestamps' : 'PrikaÅ¾i Fejsbuk vreme (npr. "pre 3 sata").',
		'ConfFBFTimestamps' : 'Dodaj -foREVer- Script vreme posle Fejsbuk vremena (npr. "11:45").',
		'ConfFBFTimestamps24' : 'PrikaÅ¾i -foREVer- Script vremena u 24-Äasovnom obliku.',
		'ConfFriendRequestCountInTitle' : 'PrikaÅ¾i broj zahteva za prijateljstvo u naslovu stranice.',
		'ConfGoogleApps' : 'Napravi veze za Google kalendar, pogodne za Google ove aplikacije.',
		'ConfGoogleAppsDomain' : 'Domen',
		'ConfGoogleCalendar' : 'Dodaj veze za dodavanje roÄ‘endana i dogaÄ‘aja u <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google kalendar</a>.',
		'ConfGoogleLanguage' : 'Jezik za <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google prevodilac</a>',
		'ConfHideApplicationStories' : 'Sakrij obaveÅ¡tenja o aplikacijama.',
		'ConfHideEventStories' : 'Sakrij obaveÅ¡tenja o dogaÄ‘ajima.',
 		'ConfHideFacebookCountInTitle' : 'Sakrij Fejsbukov broj novih primljenih poruka.',
		'ConfHideFriendStories' : 'Sakrij obaveÅ¡tenja o prijateljstvima.',
		'ConfHideGroupStories' : 'Sakrij obaveÅ¡tenja o grupama.',
 		'ConfHideLikeStories' : 'Sakrij obaveÅ¡tenja o "dopada mi se" stavkama.',
		'ConfHideLinkStories' : 'Sakrij obaveÅ¡tenja o vezama.',
		'ConfHideNoteStories' : 'Sakrij obaveÅ¡tenja o zapisima.',
		'ConfHidePhotoStories' : 'Sakrij obaveÅ¡tenja o fotografijama.',
		'ConfHideProfilePicStories' : 'Sakrij obaveÅ¡tenja o slikama na profilu.',
		'ConfHideRead' : 'U najnovijim deÅ¡avanjima sakrij stavke koje su oznaÄene kao proÄitane.',
		'ConfHideRelationshipStories' : 'Sakrij obaveÅ¡tenja o statusima veze.',
		'ConfHideStatusStories' : 'Sakrij promene statusa.',
		'ConfHideVideoStories' : 'Sakrij obaveÅ¡tenja o video zapisima.',
		'ConfHideWallStories' : 'Sakrij obaveÅ¡tenja sa zida.',
 		'ConfHomeBeta' : 'PrikaÅ¾i odeljak sa Fejsbukovim najavama.',
		'ConfHomeChat' : 'PrikaÅ¾i odeljak sa Ä‡askanjem.',
		'ConfHomeEvents' : 'PrikaÅ¾i odeljak sa dogaÄ‘ajima.',
		'ConfHomeFindFriends' : 'PrikaÅ¾i "PoveÅ¾i se sa" odeljak.',
		'ConfHomeLeftAlign' : 'Poravnaj sadrÅ¾aj poÄetne stranice po levoj strani.',
		'ConfHomeLeftColumn' : 'PrikaÅ¾i levu kolonu.',
		'ConfHomeLeftColumnFixed' : 'Neka leva kolona bude vidljiva i prilikom pomeranja stranice na dole.',
		'ConfHomeLink' : 'PrikaÅ¾i vezu za PoÄetnu stranicu na gornjoj traci sa menijima.',
		'ConfHomeNavigation' : 'PrikaÅ¾i odeljak za navigaciju.',
		'ConfHomePokes' : 'PrikaÅ¾i "Bockanje" odeljak.',
		'ConfHomeProfile' : 'PrikaÅ¾i "Profil" odeljk.',
 		'ConfHomeRecommendations' : 'PrikaÅ¾i preporuke (Osobe koje moÅ¾da poznajeÅ¡, PreporuÄene stranice itd.).',
		'ConfHomeRequests' : 'PrikaÅ¾i "Zahtevi" odeljak.',
		'ConfHomeRightColumn' : 'PrikaÅ¾i desnu kolonu.',
		'ConfHomeStretch' : 'RaÅ¡iri poÄetnu stranicu na punu Å¡irinu prozora pretraÅ¾ivaÄa.',
 		'ConfHomeStretchComments' : 'RaÅ¡iri komentare na poÄetnoj stranici.',
		'ConfiCalendar' : 'Dodaj veze za preuzimanje <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> datoteke sa svim roÄ‘endanima.',
		'ConfImport' : 'Da bise kasnije uvezli svoja podeÅ¡avanja, zamenite tekst koji sledi sa tekstom koji ste prethodno saÄuvali i kliknite "Uvoz".',
		'ConfInboxCountInTitle' : 'PrikaÅ¾i broj novih poruka u naslovu stranice.',
		'ConfLogoutLink' : 'Dodaj vezu za odjavljivanje na gornju traku sa menijima.',
		'ConfNotificationCountInTitle' : 'PrikaÅ¾i broj novih obaveÅ¡tenja u naslovu stranice.',
		'ConfNewTabSearch' : 'Kada pritisnem CTRL + Enter za pretragu, otvori rezultate pretrage u novoj kartici/prozoru.',
		'ConfPageTitle' : 'Ukloni "Facebook |" iz naslova svih stranica.',
		'ConfPhotoPopup' : 'PrikaÅ¾i veÄ‡e verzije fotografija prilikom prelaska miÅ¡em.',
		'ConfPopupAutoClose' : 'Automatski zatvori uveÄ‡ane slike.',
		'ConfPopupSmartAutoClose' : 'Ne zatvaraj uveÄ‡ane slike ako je pokazivaÄ miÅ¡a na njima.',
		'ConfPopupPosition' : 'PoloÅ¾aj uveÄ‡anih slika',
		'ConfProcessInterval' : 'Interval za obradu stranice, u milisekundama (podrazumevano=1000):',
		'ConfProfileLink' : 'PrikaÅ¾i vezu za Profil na gornju traku sa menijima.',
		'ConfProfilePicPopup' : 'PrikaÅ¾i veÄ‡e verzije slika na profilu prilikom prelaska miÅ¡em',
		'ConfProtocolLinks' : 'Pretvori nadimke programa za komunikaciju (Google Talk, Windows Live i dr.) sa profila u veze kojima Ä‡e se zapoÄeti Ä‡askanje.',
		'ConfSectionAbout' : 'O dodatku -foREVer- Script',
		'ConfSectionAdvanced' : 'ViÅ¡e opcija',
		'ConfSectionEvents' : 'RoÄ‘endani/dogaÄ‘aji',
		'ConfSectionImportExport' : 'Uvoz/Izvoz',
		'ConfSectionFeeds' : 'Novosti',
		'ConfSectionHomePage' : 'PoÄetna stranica',
		'ConfSectionLiveFeed' : 'Najnovije',
		'ConfSectionMenu' : 'Meniji/Ä‡askanje',
		'ConfSectionOther' : 'Ostale opcije',
		'ConfSectionPageTitle' : 'Naslov stranice',
		'ConfSectionPictures' : 'Slike',
		'ConfSectionShortcuts' : 'PreÄice sa tastature',
		'ConfSecureLinks' : 'Prisili usmeravanje Fejsbuk veza na HTTPS stranice.',
		'ConfShortcutList' : '<b>PreÄice sa tastature</b> (razlikuju se mala i velika slova):<br /><br /><i>Sa bilo koje stranice:</i><br /> <b>A</b> - Albumi/fotografije<br /> <b>B</b> - Spisak dostupnih prijatelja<br /> <b>C</b> - -foREVer- Script podeÅ¡avanja<br /> <b>D</b> - RoÄ‘endani<br /> <b>E</b> - DogaÄ‘aji<br /> <b>F</b> - Prijatelji<br /> <b>H</b> - PoÄetna stranica<br /> <b>I</b> - Primljene poruke<br /> <b>K</b> - dodaj zabeleÅ¡ku<br /> <b>L</b> - OznaÄi vezu za odjavu (pritisnite Enter nakon toga za odjavljivanje)<br /> <b>N</b> - ObaveÅ¡tenja<br /> <b>P</b> - Profil<br /> <b>R</b> - Zahtevi<br /> <b>S</b> - Prelazak na polje za pretragu<br /> <b>T</b> - Prevedi odabrani tekst<br /> <b>?</b> - PrikaÅ¾i izveÅ¡taj o greÅ¡ci -foREVer- Script-a<br /> <b><escape></b> - Zatvori iskaÄuÄ‡e prozore koje je napravio -foREVer- Script<br /><br /><i>Sa poÄetne stranice (filteri)</i>:<br /> <b>a</b> - Stranice<br /> <b>f</b> - Najnovije<br /> <b>g</b> - Grupe<br /> <b>l</b> - Veze<br /> <b>n</b> - Novosti<br /> <b>p</b> - Fotografije<br /> <b>s</b> ili <b>u</b> - Promene statusa<br /> <b>t</b> - BeleÅ¡ke<br /> <b>v</b> - Video<br /><br /><i>Sa profila</i>:<br /> <b>i</b> - Informacije<br /> <b>p</b> - Fotografije<br /> <b>w</b> - Zid<br /> <b>x</b> - Okviri<br /><br /><i>Sa stranica sa nabrajanjem (prethodna, sledÄ‡a, itd.)</i><br /> <b><strelica levo></b> - Prethodna<br /> <b><strelica desno></b> - SledeÄ‡a<br /> <b><Å¡ift> + <strelica levo></b> - Prva (ako je dostupno)<br /> <b><Å¡ift> + <strelica desno></b> - Poslednja (ako je dostupno)<br /><br /><i>Prilikom pregledavanja albuma/fotografija:</i><br /> <b>a</b> - UÄitaj sve sliÄice (ako je dostupno)<br /> <b>b</b> - PrikaÅ¾i velike slike<br /> <b>c</b> - PrikaÅ¾i komentare<br /> <b>k</b> - Nazad na album<br /> <b>m</b> - Fotografije sa (korisnikom) i sa mnom<br /><br /><i>Pri pregledavanju skoraÅ¡njih albuma i postavljenih/oznaÄenih fotografija:</i><br /> <b>a</b> ili  <b>r</b> - SkoraÅ¡nji albumi<br /> <b>m</b> ili  <b>u</b> - Postavljeno preko mobilnog telefona<br /> <b>o</b> - Fotografije na kojima sam ja<br /> <b>p</b> - Moje fotografije<br /> <b>t</b> ili  <b>f</b> - OznaÄeni prijatelji',
		'ConfShortcuts' : 'OmoguÄ‡i preÄice sa tastature.',
		'ConfSign' : 'PrikaÅ¾i korisnikov horoskopski znak na njegovom profilu (ukoliko je naveden pun datum roÄ‘enja).',
		'ConfTopBarFixed' : 'ZadrÅ¾i gornju traku sa menijima na ekranu i prilikom pomeranja stranice na dole.',
		'ConfTopBarHoverOpacity' : 'Prilikom prelaska miÅ¡em',
		'ConfTopBarOpacity' : 'Providnost Gornje trake sa menijima',
		'ConfUpdates' : 'Svakodnevno proveravaj Userscripts.org za nadogradnje -foREVer- Script-a. Ili <a href="#" id="fbfUpdateLink" onclick="return false;">proveri sada</a>.',
		'DownloadVideo' : 'Preuzmi video',
		'ExportICalendarFile' : 'Izvezi iCalendar datoteku',
		'ExportICalendarFileWarning' : '(Ovo moÅ¾e da potraje ako imate mnogo prijatelja)',
		'Facebook-foREVer-Conflict' : '-foREVer- Script se sada zove -foREVer- Script. Zbog promene imena moraÄ‡ete ruÄno da uklonite -foREVer- Script iz svog pregledaÄa da ne bi doÅ¡lo do ometanja izmeÄ‘u ove dve skripte. Ako niste sigurni kako da uklonite skriptu, <a %s>kliknite ovde za uputstvo</a>.',
		'fullAlbumLoaded' : 'ceo album je uÄitan',
		'Import' : 'Uvoz',
		'ImportConfirm' : 'Da li ste sigurni da Å¾elite da uvezete ova podeÅ¡avanja?\nVaÅ¡a trenutna podeÅ¡avanja Ä‡e biti poniÅ¡tena.',
		'ImportFailure' : 'DoÅ¡lo je do greÅ¡ke prilikom uvoza vaÅ¡ih podeÅ¡avanja.',
		'ImportSuccess' : 'Uvoz je zavrÅ¡en. Da li Å¾elite da osveÅ¾ite stranicu?',
		'Left' : 'Levo',
		'LoadingAllPhotos' : 'UÄitavanje svih fotografija...',
		'loadingFullAlbum' : 'uÄitavanje svih albuma...',
		'LoadingPic' : 'UÄitavanje slike...',
		'LoadPhotosWarning' : 'UÄitavanje svih fotografija moÅ¾e da potraje neko vreme',
		'Months' : new Array('Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'),
		'ProtocolSkype' : 'Pozovi korisnika %s putem programa Skype',
		'ProtocolMSN' : 'Ä†askaj sa korisnikom %s putem programa Windows Live',
		'ProtocolYahoo' : 'Ä†askaj sa korisnikom %s putem programa Yahoo Messenger',
		'ProtocolGoogle' : 'Ä†askaj sa korisnikom %s putem programa Google Talk',
		'ReloadErrorPage' : 'Kliknite da pokuÅ¡ate ponovo, ili saÄekajte 5 sekundi',
		'Refresh' : 'OsveÅ¾i',
		'Remove' : 'Ukloni',
		'Right' : 'Desno',
		'ShowBigPictures' : 'PrikaÅ¾i velike slike',
		'Signs' : new Array('Jarac','Vodolija','Ribe','Ovan','Bik','Blizanci','Rak','Lav','Devica','Vaga','Å korpija','Strelac'),
		'today' : 'danas',
		'Translators' : 'Prevodioci',
		'UpdateAvailable1' : 'Dostupne su nadogradnje za -foREVer- Script',
		'UpdateAvailable2' : 'Å½elite li sada da nadogradite?',
		'UpdateHomepage' : 'Idi na poÄetnu stranicu',
		'UpdateInstall' : 'Instaliraj odmah',
		'UpdateTomorrow' : 'Podseti me sutra',
 		'ViewAlbumComments' : 'PrikaÅ¾i komentare albuma',
		'yearsOld' : '%s godina'
	},

	// Danish - Contributed by Mads Jensen (20100210)
	da : {
		'_language' : 'Danish',
		'AddToCalendar' : 'TilfÃ¸j til kalender',
		'AddToGoogleCalendar' : 'TilfÃ¸j til Google Calendar',
		'all' : 'alle',
		'All' : 'Alle',
		'AllPhotosLoaded' : 'Alle billeder er hentet',
		'Automatic' : 'Automatisk',
		'Birthday' : '%s\'s fÃ¸dselsdag',
		'BookmarkAdd' : 'TilfÃ¸j nyt bogmÃ¦rke',
		'BookmarkConfirmRemoval' : 'Er du sikker pÃ¥ du vil fjerne bogmÃ¦rket "%s"?',
		'BookmarkDoesNotExist' : 'Denne side har intet bogmÃ¦rke.\n\nGÃ¥ til siden du vil fjerne og prÃ¸v igen.',
		'BookmarkExists' : 'Der er allerede et bogmÃ¦rke til denne side.\n\nGÃ¥ til siden du vil tilfÃ¸je et bogmÃ¦rke for og prÃ¸v igen.',
		'BookmarkNamePrompt' : 'Skriv et navn til dette bogmÃ¦rke:\n%s',
		'BookmarkRemove' : 'Fjern bogmÃ¦rke',
		'CreatingFile' : 'Opret fil',
		'Close' : 'Luk',
		'ConfigureFacebook-foREVer-' : 'KonfigurÃ©r -foREVer- Script',
		'ConfigureInstructions' : 'Alle Ã¦ndringer bliver gemt med det samme, men nogle Ã¦ndringer vil ikke vises i allerede Ã¥bne faneblade.',
		'ConfAge' : 'Vis folks alder pÃ¥ deres profil (hvis de har oplyst fÃ¸dselsdato).',
		'ConfAutoBigAlbumPictures' : 'Vis automatisk stÃ¸rre album billeder, nÃ¥r siden Ã¥bnes.',
		'ConfAutoLoadFullAlbum' : 'Hent automatisk miniaturer til alle billeder i et album, pÃ¥ en enkelt side.',
		'ConfAutoLoadTaggedPhotos' : 'Hent automatisk miniaturer til alle taggede billeder i et album, pÃ¥ en enkelt side (Billeder fanebladet pÃ¥ folks profil).',
		'ConfAutoReadMore' : 'Tryk automatisk pÃ¥  "Vis mere" links.',
		'ConfBigAlbumPictures' : 'TilfÃ¸j et link pÃ¥ album sider, til at vise stÃ¸rre udgaver af alle billeder pÃ¥ den side.',
		'ConfBookmarks' : 'TilfÃ¸j "BogmÃ¦rker" til topmenuen.',
		'ConfBottomBarHoverOpacity' : 'NÃ¥r musen er over',
		'ConfBottomBarOpacity' : 'Gennemsigtighed af menuen nederst pÃ¥ siden',
		'ConfCalendarBirthDate' : 'InkludÃ©r personens fÃ¸dselsdag i begivenhedens detaljer.',
		'ConfCalendarFullName' : 'Brug personens fulde navn som titlen til fÃ¸dselsdage (i stedet for kun fornavn).',
		'ConfChatDifferentiate' : 'Brug fed og kursiv for at skelne mellem tilgÃ¦ngelige og optagede venner.',
		'ConfChatHideIdle' : 'Skjul optagede venner.',
		'ConfDelayPopupPics' : 'TilfÃ¸j en kort pause fÃ¸r billeder popper op.',
		'ConfDelayPopupPicsTimeout' : 'Pause fÃ¸r billeder popper op, i millisekunder (standard er 500)',
		'ConfDownloadVideo' : 'TilfÃ¸j et link til at hente videoer fra "Video" sider. (Du fÃ¥r sikkert brug for en <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV afspiller</a>)',
		'ConfErrorPageReload' : 'GenindlÃ¦s applikationsfejl sider efter 5 sekunder.',
		'ConfExternalPopup' : 'Vis eksterne billeder i fuld stÃ¸rrelse. <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : 'Sprog i -foREVer- Script',
		'ConfFacebookTimestamps' : 'Vis Facebook tidsstempler (f.eks. "3 timer sider").',
		'ConfFBFTimestamps' : 'TilfÃ¸j -foREVer- Script tidsstempler efter Facebook tidsstempler (f.eks. "11:45").',
		'ConfFBFTimestamps24' : 'Vis -foREVer- Script tidsstempler i 24 timers format.',
		'ConfFriendRequestCountInTitle' : 'Vis antallet af anmodninger om venskab i siden titel.',
		'ConfGoogleApps' : 'Lav Google Calendar links kompatible med Google Apps.',
		'ConfGoogleAppsDomain' : 'DomÃ¦ne',
		'ConfGoogleCalendar' : 'TilfÃ¸j links til at tilfÃ¸je fÃ¸dselsdage og begivenheder til <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Sprog i <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Skjul applikations beskeder.',
		'ConfHideEventStories' : 'Skjul begivenhed beskeder.',
		'ConfHideFanStories' : 'Skjul fan beskeder.',
		'ConfHideFriendStories' : 'Skjul ven beskeder.',
		'ConfHideGroupStories' : 'Skjul gruppe beskeder.',
		'ConfHideLinkStories' : 'Skjul link beskeder.',
		'ConfHidePhotoStories' : 'Skjul billede beskeder.',
		'ConfHideProfilePicStories' : 'Skjul profilbillede beskeder.',
		'ConfHideRead' : 'Skjul beskeder der er markeret som lÃ¦st.',
		'ConfHideRelationshipStories' : 'Skjul parforholds beskeder.',
		'ConfHideStatusStories' : 'Skjul status beskeder.',
		'ConfHideVideoStories' : 'Skjul video beskeder.',
		'ConfHideWallStories' : 'Skjul vÃ¦g beskeder.',
		'ConfHomeChat' : 'Vis Chat sektionen.',
		'ConfHomeEvents' : 'Vis Begivenheder sektionen.',
		'ConfHomeFindFriends' : 'Vis Skab forbindelser til venner sektionen.',
		'ConfHomeLeftAlign' : 'Venstrestil indholdet pÃ¥ forsiden.',
		'ConfHomeLeftColumn' : 'Vis venstre kolonne.',
		'ConfHomeLeftColumnFixed' : 'Hold venstre kolonne synlig, selv efter der er scrollet ned pÃ¥ siden.',
		'ConfHomePeopleYouMayKnow' : 'Vis Forslag sektionen.',
		'ConfHomeNavigation' : 'Vis Navigation sektionen.',
		'ConfHomePokes' : 'Vis Prik sektionen.',
		'ConfHomeProfile' : 'Vis Profil sektionen.',
		'ConfHomeRequests' : 'Vis Anmodninger sektionen.',
		'ConfHomeRightColumn' : 'Vis hÃ¸jre kolonne.',
		'ConfHomeStretch' : 'StrÃ¦k forsiden til browser vinduets fulde bredde.',
		'ConfiCalendar' : 'TilfÃ¸j links til at hente en <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> fil med alle fÃ¸dselsdage.',
		'ConfInboxCountInTitle' : 'Vis antallet af nye beskeder i indbakken, i sidens titel.',
		'ConfLogoutLink' : 'TilfÃ¸j et "Log ud" link til top menuen.',
		'ConfNotificationCountInTitle' : 'Vis antallet af nye notifikationer i sidens titel.',
		'ConfNewTabSearch' : 'Tving sÃ¸geresultater til at Ã¥bne i et nyt vindue, nÃ¥r der trykkes CTRL + Enter ved sÃ¸gning.',
		'ConfPageTitle' : 'Fjern "Facebook |" fra titlen pÃ¥ alle sider.',
		'ConfPhotoPopup' : 'Popop stÃ¸rre udgaver af billeder nÃ¥r musen holdes over.',
		'ConfPopupAutoClose' : 'Luk popop billeder automatisk.',
		'ConfPopupSmartAutoClose' : 'Stop popop billeder fra at lukke automatisk hvis musen er over.',
		'ConfPopupPosition' : 'Position for popop billeder',
		'ConfProcessInterval' : 'Interval mellem hÃ¥ndtering af siden, i millisekunder (standard er 1000)',
		'ConfProfilePicPopup' : 'Popop stÃ¸rre udgaver af profilbilleder nÃ¥r musen holdes over',
		'ConfProtocolLinks' : 'Lav IMs pÃ¥ profiler til links der starter en samtale (Google Talk, Windows Live o.s.v.).',
		'ConfSectionAbout' : 'Omkring -foREVer- Script',
		'ConfSectionAdvanced' : 'Avanceret',
		'ConfSectionEvents' : 'FÃ¸dselsdage/Begivenheder',
		'ConfSectionFeeds' : 'Beskeder',
		'ConfSectionHomePage' : 'Forside',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menu/Chat',
		'ConfSectionOther' : 'Andre indstillinger',
		'ConfSectionPageTitle' : 'Side titel',
		'ConfSectionPictures' : 'Billeder',
		'ConfSectionShortcuts' : 'Tastatur genveje',
		'ConfSecureLinks' : 'Tving Facebook links til at bruge HTTPS.',
		'ConfShortcutList' : '<b>Tastatur genveje</b> (forskel pÃ¥ store og smÃ¥ bogstaver):<br /><br /><i>Fra enhver side:</i><br />&nbsp;<b>A</b> - Album/billeder<br />&nbsp;<b>B</b> - Skift venne liste (online venner)<br />&nbsp;<b>C</b> - -foREVer- Script konfiguration<br />&nbsp;<b>D</b> - FÃ¸dselsdage<br />&nbsp;<b>E</b> - Begivenheder<br />&nbsp;<b>F</b> - Venner<br />&nbsp;<b>H</b> - Forside<br />&nbsp;<b>I</b> - Indbakke<br />&nbsp;<b>K</b> - TilfÃ¸j bogmÃ¦rke<br />&nbsp;<b>L</b> - VÃ¦lg Log ud linket (tryk Enter efterfÃ¸lgende for at logge ud)<br />&nbsp;<b>N</b> - Notifikationer<br />&nbsp;<b>P</b> - Din profil<br />&nbsp;<b>R</b> - Anmodninger<br />&nbsp;<b>S</b> - Hop til sÃ¸gefeltet<br />&nbsp;<b>T</b> - OversÃ¦t valgte tekst<br />&nbsp;<b>?</b> - Vis -foREVer- Script debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Luk popops fra -foREVer- Script<br /><br /><i>Fra forsiden (filtre)</i>:<br />&nbsp;<b>a</b> - Sider<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Grupper<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - Nyheder<br />&nbsp;<b>p</b> - Billeder<br />&nbsp;<b>s</b> eller <b>u</b> - Status opdateringer<br />&nbsp;<b>t</b> - Noter<br />&nbsp;<b>v</b> - Videoer<br /><br /><i>Fra profiler</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Billeder<br />&nbsp;<b>w</b> - VÃ¦g<br />&nbsp;<b>x</b> - Bokse<br /><br /><i>Fra sider med bladrefunktion (frem, tilbage o.s.v.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Forrige<br />&nbsp;<b>&lt;right arrow&gt;</b> - NÃ¦ste<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - FÃ¸rste (nÃ¥r muligt)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Sidste (nÃ¥r muligt)<br /><br /><i>Under visning af album/billeder:</i><br />&nbsp;<b>a</b> - Hent alle miniaturer (nÃ¥r muligt)<br />&nbsp;<b>b</b> - Vis store billeder<br />&nbsp;<b>c</b> - Se kommentarer<br />&nbsp;<b>k</b> - Tilbage til album<br />&nbsp;<b>m</b> - Billeder af (person) og mig<br /><br /><i>Under visning af nyeste album og uploadede/taggede billeder:</i><br />&nbsp;<b>a</b> eller <b>r</b> - Nyeste Album<br />&nbsp;<b>m</b> eller <b>u</b> - Telefon uploads<br />&nbsp;<b>o</b> - Billeder af mig<br />&nbsp;<b>p</b> - Mine billeder<br />&nbsp;<b>t</b> eller <b>f</b> - Tagged venner',
		'ConfShortcuts' : 'SlÃ¥ tastaturgenveje til.',
		'ConfSign' : 'Vis folks stjernetegn pÃ¥ deres profil (hvis de har oplyst en fÃ¸dsesdato).',
		'ConfTopBarFixed' : 'Hold topmenuen synlig pÃ¥ siden, selv efter der er scrollet ned.',
		'ConfTopBarHoverOpacity' : 'NÃ¥r musen er over',
		'ConfTopBarOpacity' : 'Gennemsigtighed af topmenu linien',
		'ConfUpdates' : 'UndersÃ¸g Userscripts.org dagligt for opdateringer til -foREVer- Script. Eller <a href="#" id="fbfUpdateLink" onclick="return false;">undersÃ¸g nu</a>.',
		'DownloadVideo' : 'Hent video',
		'ExportICalendarFile' : 'EksportÃ©r iCalendar fil',
		'ExportICalendarFileWarning' : '(Dette vil tage lang tid, hvis du har mange venner)',
		'Facebook-foREVer-Conflict' : '-foREVer- Script vil fremover hedde -foREVer- Script. PÃ¥ grund af navneskiftet, skal du manuelt afinstallere -foREVer- Script fra dine browsere, da de to scripts ellers vil komme i konflikt med hinanden. Hvis du er usikker pÃ¥ hvordan man afinstallerer et Userscript, sÃ¥ <a %s>tryk her for instruktioner</a>.',
		'fullAlbumLoaded' : 'Hele albummet hentet',
		'Left' : 'Venstre',
		'ListeningRestarted' : '-foREVer- Script lytter efter Ã¦ndringer igen.',
		'ListeningStopped' : '-foREVer- Script er stoppet med at lytte efter Ã¦ndringer.\nTryk L (SHIFT + l) for at starte igen',
		'LoadingAllPhotos' : 'Henter alla billeder...',
		'loadingFullAlbum' : 'henter helt album...',
		'LoadingPic' : 'Henter billede...',
		'LoadPhotosWarning' : 'Indhentning af alle billeder tager mugligvis lang tid',
		'Months' : new Array('Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December'),
		'ProtocolSkype' : 'Ring til %s med Skype',
		'ProtocolMSN' : 'Chat med %s pÃ¥ Windows Live',
		'ProtocolYahoo' : 'Chat med %s pÃ¥ Yahoo Messenger',
		'ProtocolGoogle' : 'Chat med %s pÃ¥ Google Talk',
		'ReloadErrorPage' : 'Tryk for at prÃ¸ve igen eller vent 5 sekunder',
		'Refresh' : 'GenindlÃ¦s',
		'Remove' : 'Fjern',
		'Right' : 'HÃ¸jre',
		'ShowBigPictures' : 'Vis store billeder',
		'Signs' : new Array('Stenbukken','VandbÃ¦reren','Fiskene','VÃ¦dderen','Tyren','Tvillingerne','Krebsen','LÃ¸ven','Jomfruen','VÃ¦gten','Skorpionen','Skytten'),
		'today' : 'i dag',
		'UpdateAvailable1' : 'En opdatering er tilgÃ¦ngelig til -foREVer- Script',
		'UpdateAvailable2' : 'Vil du opdatere nu?',
		'UpdateHomepage' : 'GÃ¥ til hjemmesiden',
		'UpdateInstall' : 'InstallÃ©r nu',
		'UpdateTomorrow' : 'PÃ¥mind mig i morgen',
		'yearsOld' : '%s Ã¥r gammel'
	},

	// Czech - Contributed by Caken (20100823)
	cs : {
		'_language' : 'Czech',
		'AddToCalendar' : 'PÅ™idat do kalendÃ¡Å™e',
		'AddToGoogleCalendar' : 'PÅ™idat do Google kalendÃ¡Å™e',
		'all' : 'vÅ¡e',
		'All' : 'VÅ¡e',
		'AllPhotosLoaded' : 'VÅ¡echny fotografie naÄtenÃ©',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narozeniny %s',
		'BookmarkAdd' : 'PÅ™idej zÃ¡loÅ¾ku',
		'BookmarkExists' : 'Tato strÃ¡nka uÅ¾ je v zÃ¡loÅ¾kÃ¡ch.',
		'BookmarkNamePrompt' : 'VloÅ¾te jmÃ©no tÃ©to zÃ¡loÅ¾ky:\n%s',
		'BookmarksConfirmRemoval' : 'Jste si jistÃ­, Å¾e chcete odstranit tuto zÃ¡loÅ¾ku?',
		'BookmarksManage' : 'Spravuj zÃ¡loÅ¾ky',
		'BookmarksRemoveSelected' : 'OdstraÅˆ vybranÃ© zÃ¡loÅ¾ky',
		'Bookmarks' : 'ZÃ¡loÅ¾ky',
		'BrowserUnsupported' : 'VÃ¡Å¡ prohlÃ­Å¾eÄ nepodporuje tento program.',
		'CreatingFile' : 'VytvoÅ™enÃ­ souboru',
		'Close' : 'ZavÅ™Ã­t',
		'ConfigureFacebook-foREVer-' : 'NastavenÃ­ - -foREVer- Script',
		'ConfigureInstructions' : 'VÅ¡echny zmÄ›ny jsou uklÃ¡dÃ¡ny okamÅ¾itÄ›, ale nÄ›kterÃ© se nemusÃ­ projevit na jiÅ¾ otevÅ™enÃ½ch kartÃ¡ch.',
		'ConfAge' : 'Zobrazit vÄ›k lidÃ­ v jejich profilech (pokud poskytli celÃ½ datum narozenÃ­)',
		'ConfAlbumComments' : 'PÅ™idÃ¡ odkaz na strÃ¡nku alba a ukÃ¡Å¾e vÅ¡echny komentÃ¡Å™e k danÃ©mu albu.',
		'ConfApplicationWhitelist' : 'Seznam povolenÃ½ch aplikacÃ­ - VloÅ¾te ID aplikace, kterou chcete chrÃ¡nit pÅ™ed skrytÃ­m. ID oddÄ›lujte mezerami.',
		'ConfAutoBigAlbumPictures' : 'Automaticky pÅ™i otevÅ™enÃ­ strÃ¡nky zobrazit vÄ›tÅ¡Ã­ obrÃ¡zky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky naÄÃ­tat miniatury vÅ¡ech obrÃ¡zkÅ¯ v albumu na jednÃ© strÃ¡nce',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky naÄÃ­tat miniatury vÅ¡ech fotograficÃ­ s popisem na jednÃ© strÃ¡nce (karta Fotky v profilech lidÃ­)',
		'ConfAutoReadMore' : 'Automaticky kliknout na odkazy &quot;ÄÃ­st dÃ¡le&quot;',
		'ConfBigAlbumPictures' : 'PÅ™idat odkaz na strÃ¡nkÃ¡ch albumu na zobrazenÃ­ vÄ›tÅ¡Ã­ch verzÃ­ vÅ¡ech obrÃ¡zkÅ¯ na tÃ©to stranÄ›',
		'ConfBookmarks' : 'PÅ™ijde menu zÃ¡loÅ¾ek do vrchnÃ­ nabÃ­dky.',
		'ConfBottomBarHoverOpacity' : 'PÅ™i najetÃ­ myÅ¡Ã­',
		'ConfBottomBarOpacity' : 'PrÅ¯hlednost spodnÃ­ho panelu s nabÃ­dkou',
		'ConfCalendarBirthDate' : 'Zahrnout narozeniny osoby do podrobnosti udÃ¡lostÃ­',
		'ConfCalendarFullName' : 'PouÅ¾Ã­t jmÃ©no celÃ© jmÃ©no osoby jako nÃ¡zev narozenin (namÃ­stno kÅ™estnÃ­ho jmÃ©na)',
		'ConfChatDifferentiate' : 'PouÅ¾Ã­t tuÄnÃ© pÃ­smo a kurzÃ­vu na rozliÅ¡enÃ­ pÅ™ipojenÃ½ch a neÄinnÃ½ch pÅ™Ã¡tel',
		'ConfChatHideIdle' : 'SkrÃ½t neÄinnÃ© pÅ™Ã¡tele',
		'ConfDelayPopupPics' : 'VyÄkat 0,5 sekundy pÅ™ed naÄtenÃ­m obrÃ¡zku v kontextovÃ©m oknÄ›',
		'ConfDelayPopupPicsTimeout' : 'ZpoÅ¾dÄ›nÃ­ pÅ™ed zobrazenÃ­m obrÃ¡zku v kontextovÃ©m oknÄ› v milisekundÃ¡ch (defaultnÄ›=500):',
		'ConfDownloadVideo' : 'PÅ™idat odkaz na pÅ™evzetÃ­ videÃ­ ze strÃ¡nek s videem (moÅ¾nÃ¡ potÅ™eba <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV pÅ™ehrÃ¡vaÄ</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundÃ¡ch znova naÄÃ­st chybovÃ© strÃ¡nky aplikÃ¡cÃ­',
		'ConfExport' : 'Pro exportovÃ¡nÃ­ vaÅ¡eho nastavenÃ­, zkopÃ­rujte nÃ¡sledujÃ­cÃ­ text a uloÅ¾te ho do souboru.',
		'ConfExternalPopup' : 'ExternÃ­ obrÃ¡zky plnÃ© velikosti v kontextovÃ©m oknÄ› <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : 'Jazyk pro -foREVer- Script',
		'ConfFacebookTimestamps' : 'Zobrazit ÄasovÃ© znaÄky Facebooku (t. j. "pÅ™ed 3 hodinami")',
		'ConfFBFTimestamps' : 'PÅ™idat ÄasovÃ© znaÄky skriptu -foREVer- Script za ÄasovÃ© znaÄky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'Zobrazit ÄasovÃ© znaÄny skriptu -foREVer- Script v 24-hodinovÃ©m formÃ¡tÄ›',
		'ConfFriendRequestCountInTitle' : 'Zobraz poÄet novÃ½ch Å¾Ã¡dostÃ­ o pÅ™Ã¡telstvÃ­ v titulku strÃ¡nky.',
		'ConfGoogleApps' : 'VytvoÅ™it odkazy pro Google Calendar kompatibilnÃ­ s Google Apps',
		'ConfGoogleAppsDomain' : 'DomÃ©na',
		'ConfGoogleCalendar' : 'PÅ™idat odkazy na zaÅ™azenÃ­ narozenin a udÃ¡lostÃ­ do aplikace <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pro <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>.',
		'ConfHideApplicationStories' : 'SkrÃ½t v aktualitÃ¡ch pÅ™Ã­spÄ›vky o aplikacÃ­ch.',
		'ConfHideEventStories': 'SkrÃ½t v aktualitÃ¡ch pÅ™Ã­spÄ›vky z udÃ¡lostÃ­.',
		'ConfHideFacebookCountInTitle' : 'SkrÃ½t poÄet novÃ½ch zprÃ¡v.',
		'ConfHideFriendStories': 'SkrÃ½t v aktualitÃ¡ch pÅ™Ã­spÄ›vky pÅ™Ã¡tel.',
		'ConfHideGroupStories': 'SkrÃ½t v aktualitÃ¡ch pÅ™Ã­spÄ›vky o skupinÃ¡ch.',
		'ConfHideLikeStories' : 'SkrÃ½t pÅ™Ã­spÄ›vky uÅ¾ivateli xxx se lÃ­bÃ­.',
		'ConfHideLinkStories' : 'SkrÃ½t pÅ™Ã­spÄ›vky o odkazech.',
		'ConfHideNoteStories' : 'SkrÃ½t pÅ™Ã­spÄ›vky o poznÃ¡mkÃ¡ch.',
		'ConfHidePhotoStories' : 'SkrÃ½t pÅ™Ã­spÄ›vky o fotkÃ¡ch.',
		'ConfHideProfilePicStories' : 'SkrÃ½t pÅ™Ã­spÄ›vky o profilovÃ½ch fotkÃ¡ch.',
		'ConfHideRead' : 'SkrÃ½t v aktualitÃ¡ch poloÅ¾ky, kterÃ© byly oznaÄenÃ© jako pÅ™eÄtenÃ©.',
		'ConfHideRelationshipStories' : 'SkrÃ½t v aktualitÃ¡ch pÅ™Ã­spÄ›vky o vztahu.',
		'ConfHideStatusStories' : 'SkrÃ½t pÅ™Ã­spÄ›vky se statusy.',
		'ConfHideVideoStories' : 'SkrÃ½t pÅ™Ã­spÄ›vky o videÃ­ch.',
		'ConfHideWallStories' : 'Skryj pÅ™Ã­spÄ›vky na zdi.',
		'ConfHomeBeta' : 'Zobraz Beta Tester sekci.',
		'ConfHomeChat' : 'Zobrazit ÄÃ¡st chat.',
		'ConfHomeEvents' : 'Zobrazit ÄÃ¡st UdÃ¡losti',
		'ConfHomeFindFriends' : 'Zobrazit ÄÃ¡st Spojte se s pÅ™Ã¡teli',
		'ConfHomeLeftAlign' : 'Zarovat obsah strÃ¡nky DomÅ¯ doleva',
		'ConfHomeLeftColumn' : 'Zobraz levÃ½ sloupec.',
		'ConfHomeLeftColumnFixed' : 'Nech levÃ½ sloupec viditelnÃ½ i pÅ™i scrolovÃ¡nÃ­ dolÅ¯.',
		'ConfHomeLink' : 'Zobraz ve vrchnÃ­ nabÃ­dce odkaz na ÃºvodnÃ­ strÃ¡nku.',
		'ConfHomeNavigation' : 'Zobrazit ÄÃ¡st navigace.',
		'ConfHomePokes' : 'Zobrazit ÄÃ¡st Å Å¥ouchnutÃ­',
		'ConfHomeProfile' : 'Zobraz ÄÃ¡st Profil.',
		'ConfHomeRecommendations' : 'Zobraz doporuÄenÃ­ (Mohli byste znÃ¡t, doporuÄenÃ© strÃ¡nky, atd.).',
		'ConfHomeRequests' : 'Zobrazit ÄÃ¡st Å½Ã¡dosti',
		'ConfHomeRightColumn' : 'Zobrazit pravÃ½ sloupec',
		'ConfHomeStretch' : 'RoztÃ¡hnout ÃºvodnÃ­ strÃ¡nku na Å¡Ã­Å™ku okna prohlÃ­Å¾eÄe',
		'ConfHomeStretchComments' : 'RoztÃ¡hnout komentÃ¡Å™e na ÃºvodnÃ­ strÃ¡nce.',
		'ConfiCalendar' : 'PÅ™idat odkazy na pÅ™evzetÃ­ souboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> se vÅ¡emi narozeninami',
		'ConfImport' : 'Pro importovÃ¡nÃ­ nastavenÃ­ pÅ™epiÅ¡te nÃ¡sledujÃ­cÃ­ text pÅ™edem exportovanÃ½m a potÃ© kliknÄ›te na "Import".',
		'ConfInboxCountInTitle' : 'Zobrazit v nÃ¡zvu strÃ¡nky poÄet nepÅ™eÄtenÃ½ch zprÃ¡v',
		'ConfLogoutLink' : 'PÅ™idej odhlaÅ¡ovacÃ­ odkaz do vrchnÃ­ nabÃ­dky.',
		'ConfNotificationCountInTitle' : 'Zobraz poÄet novÃ½ch upozornÄ›nÃ­ v titulku strÃ¡nky.',
		'ConfNewTabSearch' : 'PÅ™i vyhledÃ¡vÃ¡nÃ­ otevÅ™Ã­t stisknutÃ­m Ctrl+Enter vÃ½sledky hledÃ¡nÃ­ na novÃ© kartÄ›/v novÃ©m oknÄ›',
		'ConfPageTitle' : 'Odstranit "Facebook |" z nÃ¡zvu vÅ¡ech strÃ¡nek',
		'ConfPhotoPopup' : 'VÄ›tÅ¡Ã­ verze fotek v kontextovÃ©m menu po najetÃ­ myÅ¡Ã­',
		'ConfPopupAutoClose' : 'Automaticky zavÃ­rat kontextovÃ¡ okna s obrÃ¡zkem',
		'ConfPopupSmartAutoClose' : 'ZabrÃ¡nit automatickÃ©mu uzavÅ™enÃ­ kontextovÃ©ho okna s obrÃ¡zkem',
		'ConfPopupPosition' : 'UmÃ­stÄ›nÃ­ kontextovÃ©ho okna s obrÃ¡zkem',
		'ConfProcessInterval' : 'Interval zpracovÃ¡nÃ­ strÃ¡nky v milisekundÃ¡ch (defaultnÄ›=1000):',
		'ConfProfileLink' : 'Zobraz ve vrchnÃ­ nabÃ­dce odkaz na profil.',
		'ConfProfilePicPopup' : 'VÄ›tÅ¡Ã­ verze profilovÃ½ch fotek v kontextovÃ©m oknÄ› po najetÃ­ myÅ¡Ã­',
		'ConfProtocolLinks' : 'Zmenit ID pro okamÅ¾itou sprÃ¡vu na odkazy spouÅ¡tÄ›jÃ­cÃ­ konverzaci (Google Talk, Windows Live atd.)',
		'ConfSectionAbout' : 'O -foREVer- Scriptu',
		'ConfSectionAdvanced' : 'UpÅ™esnÄ›nÃ­',
		'ConfSectionEvents' : 'Narozeniny/UdÃ¡losti',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'PÅ™Ã­spÄ›vky',
		'ConfSectionHomePage' : 'StrÃ¡nka Doma',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'NabÃ­dky/Chat',
		'ConfSectionOther' : 'DalÅ¡Ã­ moÅ¾nosti',
		'ConfSectionPageTitle' : 'Titulek strÃ¡nky',
		'ConfSectionPictures' : 'ObrÃ¡zky',
		'ConfSectionShortcuts' : 'KlÃ¡vesovÃ© zkratky',
		'ConfSecureLinks' : 'PÅ™esmÄ›rovat odkazy Facebooku na strÃ¡nky HTTPS',
		'ConfShortcutList' : '<b>KlÃ¡vesovÃ© zkratky</b> (rozliÅ¡ujÃ­ se malÃ¡/velkÃ¡ pÃ­smena):<br /><br /><i>Z libovolnÃ© strÃ¡nky:</i><br />&nbsp;<b>A</b> - Alba/fotky<br />&nbsp;<b>B</b> - PÅ™epnout seznam pÅ™Ã¡tel (online pÅ™Ã¡tel)<br />&nbsp;<b>C</b> - Konfigurace skriptu -foREVer- Script<br />&nbsp;<b>D</b> - Narozeniny<br />&nbsp;<b>E</b> - UdÃ¡losti<br />&nbsp;<b>F</b> - PÅ™Ã¡telÃ©<br />&nbsp;<b>H</b> - DomÅ¯<br />&nbsp;<b>I</b> - PÅ™ijatÃ© zprÃ¡vy<br />&nbsp;<b>K</b> - PÅ™idej zÃ¡loÅ¾ku<br />&nbsp;<b>L</b> - OdhlÃ¡Å¡enÃ­ (po odhlÃ¡Å¡enÃ­ stisknÄ›te Enter)<br />&nbsp;<b>N</b> - UpozornÄ›nÃ­<br />&nbsp;<b>P</b> - VÃ¡Å¡ profil<br />&nbsp;<b>R</b> - Å½Ã¡dosti<br />&nbsp;<b>S</b> - PÅ™eskoÄit na pole Hledat<br />&nbsp;<b>T</b> - PÅ™eloÅ¾it vybranÃ½ text<br />&nbsp;<b>?</b> - Zobrazit informace o ladÄ›nÃ­ skriptu -foREVer- Script<br />&nbsp;<b>&lt;escape&gt;</b> - ZavÅ™Ã­t kontextovÃ¡ okna vytvoÅ™enÃ© skriptem -foREVer- Script<br /><br /><i>Ze strÃ¡nky DomÅ¯ (filtry)</i>:<br />&nbsp;<b>a</b> - StrÃ¡nky<br />&nbsp;<b>f</b> - Aktuality<br />&nbsp;<b>g</b> - Skupiny<br />&nbsp;<b>l</b> - Odkazy<br />&nbsp;<b>n</b> - Novinky<br />&nbsp;<b>p</b> - Fotky<br />&nbsp;<b>s</b> nebo <b>u</b> - Co dÄ›lajÃ­ ostatnÃ­<br />&nbsp;<b>t</b> - PoznÃ¡mky<br />&nbsp;<b>v</b> - Videa<br /><br /><i>Z profilÅ¯</i>:<br />&nbsp;<b>i</b> - Informace<br />&nbsp;<b>p</b> - Fotky<br />&nbsp;<b>w</b> - ZeÄ<br />&nbsp;<b>x</b> - Kontejner<br /><br /><i>Ze strÃ¡nek s navigacÃ­ (dozadu, dopredu atd.)</i><br />&nbsp;<b>&lt;levÃ¡ Å¡ipka&gt;</b> - PÅ™edchozÃ­<br />&nbsp;<b>&lt;pravÃ¡ Å¡ipka&gt;</b> - NÃ¡sledujÃ­cÃ­<br />&nbsp;<b>&lt;shift&gt; + &lt;levÃ¡ Å¡ipka&gt;</b> - PrvnÃ­ (pokud je dispozici)<br />&nbsp;<b>&lt;shift&gt; + &lt;pravÃ¡ Å¡ipka&gt;</b> - PoslednÃ­ (pokud je k dispozici)<br /><br /><i>PÅ™i prohlÃ­Å¾enÃ­ alb/fotek:</i><br />&nbsp;<b>a</b> - NaÄÃ­tat vÅ¡echny miniatury (pokud je k dispozici)<br />&nbsp;<b>b</b> - Zobrazit velkÃ© obrÃ¡zky<br />&nbsp;<b>c</b> - Zobrazit komentÃ¡Å™e<br />&nbsp;<b>k</b> - ZpÄ›t do alba<br />&nbsp;<b>m</b> - Fotky (osoby) a moje<br /><br /><i>PÅ™i prohlÃ­Å¾enÃ­ nejnovÄ›jÅ¡Ã­ch alb a nahranÃ½ch/oznaÄenÃ½ch fotek:</i><br />&nbsp;<b>a</b> nebo &nbsp;<b>r</b> - NejnovÄ›jÅ¡Ã­ alba<br />&nbsp;<b>m</b> nebo &nbsp;<b>u</b> - NahranÃ© z mobilu<br />&nbsp;<b>o</b> - Fotky mÃ© osoby<br />&nbsp;<b>p</b> - MÃ© fotky<br />&nbsp;<b>t</b> nebo &nbsp;<b>f</b> - OznaÄenÃ­ pÅ™Ã¡telÃ©',
		'ConfShortcuts' : 'Povolit klÃ¡vesovÃ© zkratky',
		'ConfSign' : 'Zobrazit znamenÃ­ lidÃ­ v jejich profilu (pokud uvedli svÅ¯j datum narozenÃ­)',
		'ConfTopBarFixed' : 'VÅ¾dy zobrazit vrchnÃ­ panel s nabÃ­dkou - i pÅ™i posouvÃ¡nÃ­ strÃ¡nky',
		'ConfTopBarHoverOpacity' : 'PÅ™i najetÃ­ myÅ¡Ã­',
		'ConfTopBarOpacity' : 'PrÅ¯hlednost vrchnÃ­ho panelu s nabÃ­dkou',
		'ConfUpdates' : 'DennÄ› na Userscripts.org ovÄ›Å™ovat aktualizace pro -foREVer- Script, pÅ™Ã­padnÄ› <a href="#" id="fbfUpdateLink" onclick="return false;">zkontrolovat nynÃ­</a>.',
		'DownloadVideo' : 'StÃ¡hnout video',
		'ExportICalendarFile' : 'Exportovat soubor iCalendar',
		'ExportICalendarFileWarning' : '(Pokud mÃ¡te mnoho pÅ™Ã¡tel, mÅ¯Å¾e to chvÃ­li trvat.)',
		'Facebook-foREVer-Conflict' : 'Facebook Fifex je nynÃ­ znÃ¡m jako -foREVer- Script.<br /><br />ProtoÅ¾e se zmÄ›nilo jmÃ©no, musÃ­te manuÃ¡lnÄ› odinstalovat Facebook -foREVer- z vaÅ¡eho prohlÃ­Å¾eÄe.<br /><br />Pokud si nevÃ­te jak na to <a %s>pokraÄujte zde</a>.',
		'fullAlbumLoaded' : 'celÃ½ album je naÄtenÃ½',
		'Import' : 'Import',
		'ImportConfirm' : 'Opravdu chcete importovat toto nastavenÃ­?\nStÃ¡vajÃ­cÃ­ nastavenÃ­ bude ztraceno.',
		'ImportFailure' : 'PÅ™i importovÃ¡nÃ­ nastavenÃ­ doÅ¡lo k chybÄ›.',
		'ImportSuccess' : 'Import kompletnÃ­. Chcete aktualizovat strÃ¡nku?',
		'Left' : 'Vlevo',
		'LoadingAllPhotos' : 'NaÄÃ­tajÃ­ sa vÅ¡echny fotky...',
		'loadingFullAlbum' : 'NaÄÃ­tÃ¡ se celÃ½ album...',
		'LoadingPic' : 'NaÄÃ­tÃ¡ se obrÃ¡zek...',
		'LoadPhotosWarning' : 'NaÄÃ­tÃ¡nÃ­ vÅ¡ech fotek mÅ¯Å¾e chvÃ­li trvat',
		'Months' : new Array('Leden','Ãšnor','BÅ™ezen','Duben','KvÄ›ten','ÄŒerven','ÄŒervenec','Srpen','ZÃ¡Å™Ã­','Å˜Ã­jen','Listopad','Prosinec'),
		'ProtocolSkype' : 'Volat %s pomocÃ­ Skype',
		'ProtocolMSN' : 'Chatovat s %s pomocÃ­ Windows Live',
		'ProtocolYahoo' : 'Chatovat s %s pomocÃ­ Yahoo Messenger',
		'ProtocolGoogle' : 'Chatovat s %s pomocÃ­ Google Talk',
		'ReloadErrorPage' : 'KliknÄ›te na Zkusit znovu nebo vyÄkejte 5 sekund',
		'Refresh' : 'Obnovit',
		'Remove' : 'Odstranit',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'Zobrazit velkÃ© obrÃ¡zky',
		'Signs' : new Array('Kozoroh','VodnÃ¡Å™','Ryba','Beran','BÃ½k','BlÃ­Å¾enci','Rak','Lev','Panna','VÃ¡hy','Å tÃ­r','StÅ™elec'),
		'today' : 'dnes',
		'Translators' : 'PÅ™ekladatelÃ©',
		'UpdateAvailable1' : 'K dispozici je aktualizace skriptu -foREVer- Script.',
		'UpdateAvailable2' : 'Chcete aktualizovat nynÃ­?',
		'UpdateHomepage' : 'PÅ™ejÃ­t na domovskou strÃ¡nku',
		'UpdateInstall' : 'Nainstalovat',
		'UpdateTomorrow' : 'PÅ™ipomenout zÃ­tra',
		'ViewAlbumComments' : 'UkaÅ¾ komentÃ¡Å™e k albu',
		'yearsOld' : '%s let'
	},
	
	// Macedonian - Contributed by Goce Manevski (20100628)
	mk : {
		'_language' : 'Macedonian',
		'AddToCalendar' : 'Ð”Ð¾Ð´Ð°Ð´Ð¸ Ð²Ð¾ ÐšÐ°Ð»ÐµÐ½Ñ‚Ð°Ñ€',
		'AddToGoogleCalendar' : 'Ð”Ð¾Ð´Ð°Ð´Ð¸ Ð²Ð¾ Google ÐšÐ°Ð»ÐµÐ½Ñ‚Ð°Ñ€',
		'all' : 'ÑÐ¸Ñ‚Ðµ',
		'All' : 'Ð¡Ð¸Ñ‚Ðµ',
		'AllPhotosLoaded' : 'Ð¡Ð¸Ñ‚Ðµ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸ ÑÐµ Ð²Ñ‡Ð¸Ñ‚Ð°Ð½Ð¸',
		'Automatic' : 'ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸',
		'Birthday' : '%s\'s Ð Ð¾Ð´ÐµÐ½Ð´ÐµÐ½',
		'BookmarkAdd' : 'Ð”ÐžÐ´Ð°Ð´Ð¸ Ð½Ð¾Ð² Ð¾Ð±ÐµÐ»ÐµÐ¶ÑƒÐ²Ð°Ñ‡',
		'BookmarkConfirmRemoval' : 'Ð”Ð°Ð»Ð¸ ÑÐ¸ ÑÐ¸Ð³ÑƒÑ€ÐµÐ½ Ð´ÐµÐºÐ° ÑÐ°ÐºÐ°Ñˆ Ð´Ð° Ð¸Ð·Ð±Ñ€Ð¸ÑˆÐµÑˆ Ð¾Ð±ÐµÐ»ÐµÐ¶ÑƒÐ²Ð°Ñ‡ "%s"?',
		'BookmarkDoesNotExist' : 'This page has not been bookmarked.\n\nGo to the page you want removed and try again.',
		'BookmarkExists' : 'Ð’ÐµÑœÐµ Ð¸Ð¼Ð° Ð¾Ð±ÐµÐ»ÐµÐ¶ÑƒÐ²Ð°Ñ‡ Ð·Ð° Ð¾Ð²Ð°Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°.\n\nÐžÐ´Ð¸ Ð´Ð¾ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°Ñ‚Ð° ÑˆÑ‚Ð¾ ÑÐ°ÐºÐ°Ñˆ Ð´Ð° Ñ˜Ð° Ð¾Ð±ÐµÐ»ÐµÐ¶Ð¸Ñˆ Ð¸ Ð¾Ð±Ð¸Ð´Ð¸ ÑÐµ Ð¿Ð¾Ð²Ñ‚Ð¾Ñ€Ð½Ð¾.',
		'BookmarkNamePrompt' : 'Ð’Ð½ÐµÑÐ¸ Ð¸Ð¼Ðµ Ð·Ð° Ð¾Ð²Ð¾Ñ˜ Ð¾Ð±ÐµÐ»ÐµÐ¶ÑƒÐ²Ð°Ñ‡:\n%s',
		'BookmarkRemove' : 'Ð˜Ð·Ð±Ñ€Ð¸ÑˆÐ¸ Ð¾Ð±ÐµÐ»ÐµÐ¶ÑƒÐ²Ð°Ñ‡',
		'Bookmarks' : 'ÐžÐ±ÐµÐ»ÐµÐ¶ÑƒÐ²Ð°Ñ‡Ð¸',
		'BrowserUnsupported' : 'Ð¢Ð²Ð¾Ñ˜Ð¾Ñ‚ Ð¿Ñ€ÐµÐ±Ð°Ñ€ÑƒÐ²Ð°Ñ‡ Ð½Ðµ Ñ˜Ð° Ð¿Ð¾Ð´Ð´Ñ€Ð¶ÑƒÐ²Ð° Ð¾Ð¿Ñ†Ð¸Ñ˜Ð°Ñ‚Ð°.',
		'CreatingFile' : 'ÐšÑ€ÐµÐ¸Ñ€Ð°ÑšÐµ Ð”Ð°Ñ‚Ð¾Ñ‚ÐµÐºÐ°',
		'Close' : 'Ð—Ð°Ñ‚Ð²Ð¾Ñ€Ð¸',
		'ConfigureFacebook-foREVer-' : 'ÐšÐ¾Ð½Ñ„Ð¸Ð³ÑƒÑ€Ð¸Ñ€Ð°Ñ˜ Ð³Ð¾ -foREVer- Script',
		'ConfigureInstructions' : 'Ð¡Ð¸Ñ‚Ðµ Ð¿Ñ€Ð¾Ð¼ÐµÐ½Ð¸ ÑÐµ Ð²ÐµÐ´Ð½Ð°Ñˆ Ð·Ð°Ñ‡ÑƒÐ²Ð°Ð½Ð¸, Ð½Ð¾ Ð½ÐµÐºÐ¾Ð¸ Ð¿Ñ€Ð¾Ð¼ÐµÐ½Ð¸ Ð½ÐµÐ¼Ð° Ð´Ð° Ñ€Ð°Ð±Ð¾Ñ‚Ð°Ñ‚ Ð²Ð¾ Ð²ÐµÑœÐµ Ð¾Ñ‚Ð²Ð¾Ñ€ÐµÐ½Ð¸Ñ‚Ðµ Ñ‚Ð°Ð±Ð¾Ð²Ð¸.',
		'ConfAge' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ Ð³Ð¸ Ð³Ð¾Ð´Ð¸Ð½Ð¸Ñ‚Ðµ Ð½Ð° Ð»ÑƒÑ“Ðµ\-Ñ‚Ð¾ Ð½Ð° Ð½Ð¸Ð²Ð½Ð¸Ñ‚Ðµ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð¸ (Ð°ÐºÐ¾ Ð³Ð¾ Ð¸Ð¼Ð°Ð°Ñ‚ Ð¾Ð±Ñ˜Ð°Ð²ÐµÐ½Ð¾ Ñ†ÐµÐ»Ð¸Ð¾Ñ‚ Ð´Ð°Ñ‚ÑƒÐ¼ Ð½Ð° Ñ€Ð°Ñ“Ð°ÑšÐµ).',
		'ConfApplicationWhitelist' : 'ÐÐ¿Ð»Ð¸ÐºÐ°Ñ†Ð¸ÑÐºÐ° Ð±ÐµÐ»Ð°Ð»Ð¸ÑÑ‚Ð° - Ð’Ð½ÐµÑÐ¸ ÑÐ¼ÐµÑ‚ÐºÐ¸ Ð¾Ð´ Ð°Ð¿Ð»Ð¸ÐºÐ°Ñ†Ð¸Ð¸Ñ‚Ðµ Ð·Ð° Ð´Ð° Ð³Ð¸ Ð¿Ð¾ÐºÐ°Ð¶ÐµÑˆ Ð°ÐºÐ¾ Ð±Ð¸Ð»Ðµ ÑÐºÑ€Ð¸ÐµÐ½Ð¸. Ð Ð°Ð·Ð´ÐµÐ»Ð¸ Ð³Ð¸ ÑÐ¼ÐµÑ‚ÐºÐ¸Ñ‚Ðµ ÑÐ¾ Ð¿Ñ€Ð°Ð·Ð½Ð¾ Ð¼ÐµÑÑ‚Ð¾.',
		'ConfAutoBigAlbumPictures' : 'ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸ Ð¿Ñ€Ð¸ÐºÐ°Ð¶ÑƒÐ²Ð°Ñ˜ Ð³Ð¾Ð»ÐµÐ¼Ð¸ Ð°Ð»Ð±ÑƒÐ¼ ÑÐ»Ð¸ÐºÐ¸ ÐºÐ¾Ð³Ð° ÑœÐµ ÑÐµ Ð¾Ñ‚Ð²Ð¾Ñ€Ð¸ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°Ñ‚Ð°.',
		'ConfAutoLoadFullAlbum' : 'ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸ Ð²Ñ‡Ð¸Ñ‚ÑƒÐ²Ð°Ñ˜ Ð¼Ð°Ð»Ð¸ ÑÐ»Ð¸ÐºÐ¸Ñ‡ÐºÐ¸ Ð·Ð° ÑÐ¸Ñ‚Ðµ ÑÐ»Ð¸ÐºÐ¸ Ð²Ð¾ Ð°Ð»Ð±ÑƒÐ¼Ð¾Ñ‚ Ð½Ð° ÐµÐ´Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°.',
		'ConfAutoLoadTaggedPhotos' : 'ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸ Ð²Ñ‡Ð¸Ñ‚ÑƒÐ²Ð°Ñ˜ Ð¼Ð°Ð»Ð¸ ÑÐ»Ð¸ÐºÐ¸Ñ‡ÐºÐ¸ Ð·Ð° ÑÐ¸Ñ‚Ðµ Ð¾Ð±ÐµÐ»ÐµÐ¶Ð°Ð½Ð¸ ÑÐ»Ð¸ÐºÐ¸ Ð½Ð° ÐµÐ´Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° (Ð¢Ð°Ð± Ð¾Ð´ ÑÐ»Ð¸ÐºÐ¸ Ð½Ð° Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð¸Ñ‚Ðµ Ð½Ð° Ð»ÑƒÑ“Ðµ\-Ñ‚Ð¾).',
		'ConfAutoReadMore' : 'ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸ ÐºÐ»Ð¸ÐºÐ½Ð¸ Ð½Ð° "Ð¿Ñ€Ð¾Ñ‡Ð¸Ñ‚Ð°Ñ˜ Ð¿Ð¾Ð²ÐµÑœÐµ" Ð»Ð¸Ð½ÐºÐ¾Ð²Ð¸Ñ‚Ðµ.',
		'ConfBigAlbumPictures' : 'Ð”Ð¾Ð´Ð°Ð´Ð¸ Ð»Ð¸Ð½Ðº Ð½Ð° Ð°Ð»Ð±ÑƒÐ¼ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸Ñ‚Ðµ Ð·Ð° Ð´Ð° ÑÐµ Ð¿Ð¾ÐºÐ°Ð¶Ðµ Ð³Ð¾Ð»ÐµÐ¼Ð° Ð²ÐµÑ€Ð·Ð¸Ñ˜Ð° Ð½Ð° ÑÐ¸Ñ‚Ðµ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸ Ð½Ð° Ñ‚Ð°Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°.',
		'ConfBookmarks' : 'Ð”Ð¾Ð´Ð°Ð´Ð¸ Ð¿Ð¾Ð´Ð¼ÐµÐ½Ð¸ Ð½Ð° Ð³Ð¾Ñ€Ð½Ð¾Ñ‚Ð¾ Ñ‚Ð¾Ð¿ Ð¼ÐµÐ½Ð¸.',
		'ConfBottomBarHoverOpacity' : 'ÐÐ° Ð¾Ð±ÐµÐ»ÐµÐ¶ÑƒÐ²Ð°ÑšÐµ ÑÐ¾ Ð³Ð»ÑƒÐ²Ñ‡ÐµÑ‚Ð¾',
		'ConfBottomBarOpacity' : 'ÐŸÑ€Ð¾Ñ•Ð¸Ñ€Ð½Ð¾ÑÑ‚ Ð½Ð° Ð´Ð¾Ð»Ð½Ð¸Ð¾Ñ‚ Ð¼ÐµÐ½Ð¸ Ð±Ð°Ñ€',
		'ConfCalendarBirthDate' : 'Ð’ÐºÐ»ÑƒÑ‡Ð¸ Ð³Ð¾ Ñ€Ð¾Ð´ÐµÐ½Ð´ÐµÐ½\-Ð¾Ñ‚ Ð½Ð° Ð»Ð¸Ñ†ÐµÑ‚Ð¾ Ð²Ð¾ Ð´ÐµÑ‚Ð°Ð»Ð¸ Ð·Ð° Ð½Ð°ÑÑ‚Ð°Ð¿Ð¾Ñ‚.',
		'ConfCalendarFullName' : 'ÐšÐ¾Ñ€Ð¸ÑÑ‚Ð¸ Ð³Ð¾ Ñ†ÐµÐ»Ð¾Ñ‚Ð¾ Ð¸Ð¼Ðµ Ð½Ð° Ñ‡Ð¾Ð²ÐµÐº\-Ð¾Ñ‚ ÐºÐ°ÐºÐ¾ Ð½Ð°ÑÐ»Ð¾Ð² Ð·Ð° Ñ€Ð¾Ð´ÐµÐ½Ð´ÐµÐ½Ð¸ (Ð½Ð°Ð¼ÐµÑÑ‚Ð¾ ÑÐ°Ð¼Ð¾ Ð¸Ð¼Ðµ).',
		'ConfChatDifferentiate' : 'ÐšÐ¾Ñ€Ð¸ÑÑ‚Ð¸ Ð·Ð´ÐµÐ±ÐµÐ»ÐµÐ½Ð¾ Ð¸ Ð¸ÑÐºÐ¾ÑÐµÐ½Ð¾ Ð·Ð° Ñ€Ð°Ð·Ð»Ð¸ÐºÐ° Ð¿Ð¾Ð²ÐµÑ“Ñƒ Ð´Ð¾ÑÑ‚Ð°Ð¿Ð½Ð¸Ñ‚Ðµ Ð¸ Ð¾Ñ‚ÑÑƒÑ‚Ð½Ð¸Ñ‚Ðµ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð¸.',
		'ConfChatHideIdle' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¾Ñ‚ÑÑƒÑ‚Ð½Ð¸Ñ‚Ðµ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð¸.',
		'ConfDelayPopupPics' : 'Ð”Ð¾Ð´Ð°Ð´Ð¸ ÐºÑ€Ð°Ñ‚ÐºÐ¾ Ð·Ð°Ð´Ð¾Ñ†Ð½ÑƒÐ²Ð°ÑšÐµ Ð¿Ñ€ÐµÐ´ Ð¿Ð¾ÐºÐ°Ð¶ÑƒÐ²Ð°ÑšÐµ ÑÐºÐ¾ÐºÐ°Ñ‡ÐºÐ¸ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸.',
		'ConfDelayPopupPicsTimeout' : 'Ð—Ð°Ð´Ð¾Ñ†Ð½ÑƒÐ²Ð°ÑšÐµ Ð¿Ñ€ÐµÐ´ Ð¿Ð¾ÐºÐ°Ð¶ÑƒÐ²Ð°ÑšÐµ ÑÐºÐ¾ÐºÐ°Ñ‡ÐºÐ¸ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸, Ð²Ð¾ Ð¼Ð¸Ð»Ð¸ÑÐµÐºÑƒÐ½Ð´Ð¸ (ÑÑ‚Ð°Ð½Ð´Ð°Ñ€Ð´=500):',
		'ConfDownloadVideo' : 'Ð”Ð¾Ð´Ð°Ð´Ð¸ Ð»Ð¸Ð½Ðº Ð·Ð° Ð¿Ñ€ÐµÐ²Ð·ÐµÐ¼Ð°ÑšÐ° Ð½Ð° Ð²Ð¸Ð´ÐµÐ°Ñ‚Ð° Ð¾Ð´ Ð²Ð¸Ð´ÐµÐ¾ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸Ñ‚Ðµ. (ÐœÐ¾Ð¶Ðµ ÑœÐµ Ñ‚Ð¸ Ñ‚Ñ€ÐµÐ±Ð° <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'ÐÐ²Ñ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸ Ð¿Ð¾Ð²Ñ‚Ð¾Ñ€Ð½Ð¾ Ð²Ñ‡Ð¸Ñ‚ÑƒÐ²Ð°Ñ˜ Ð³Ð¸ Ð°Ð¿Ð»Ð¸ÐºÐ°Ñ†Ð¸Ð¸Ñ‚Ðµ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸Ñ‚Ðµ ÑÐ¾ Ð³Ñ€ÐµÑˆÐºÐ¸ Ð¿Ð¾ 5 ÑÐµÐºÑƒÐ½Ð´Ð¸.',
		'ConfExport' : 'Ð—Ð° Ð´Ð° Ð³Ð¸ Ð¸Ð·Ð½ÐµÑÐµÑˆ Ð¿Ð¾Ð´ÐµÑÑƒÐ²Ð°ÑšÐ°Ñ‚Ð°, ÐºÐ¾Ð¿Ð¸Ñ€Ð°Ñ˜ Ð³Ð¾ Ñ‚ÐµÐºÑÑ‚Ð¾Ñ‚ Ð¿Ñ€ÐµÐ´Ñ…Ð¾Ð´Ð½Ð¾ Ð¸ Ð·Ð°Ñ‡ÑƒÐ²Ð°Ñ˜ Ð³Ð¾ Ð²Ð¾ Ð´Ð°Ñ‚Ð¾Ñ‚ÐµÐºÐ°.',
		'ConfExternalPopup' : 'Ð¡ÐºÐ¾ÐºÐ°Ñ‡ÐºÐ¸ Ñ†ÐµÐ»Ð¾ÑÐ½Ð¸ Ð²ÐµÑ€Ð·Ð¸Ð¸ Ð½Ð° Ð½Ð°Ð´Ð²Ð¾Ñ€ÐµÑˆÐ½Ð¸ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸. <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : 'ÐˆÐ°Ð·Ð¸Ðº Ð·Ð° -foREVer- Script',
		'ConfFacebookTimestamps' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Facebook Ð¼Ð°Ñ€ÐºÐµÑ€ Ð·Ð° Ð²Ñ€ÐµÐ¼ÐµÑ‚Ð¾ (eg. "3 Ñ‡Ð°ÑÐ° ÑÑ‚Ð°Ñ€Ð¾").',
		'ConfFBFTimestamps' : 'Ð”Ð¾Ð´Ð°Ð´Ð¸ -foREVer- Script Ð¼Ð°Ñ€ÐºÐµÑ€ Ð·Ð° Ð²Ñ€ÐµÐ¼ÐµÑ‚Ð¾ Ð¿Ð¾ Facebook Ð¼Ð°Ñ€ÐºÐµÑ€Ð¾Ñ‚ Ð·Ð° Ð²Ñ€ÐµÐ¼Ðµ (eg. "11:45").',
		'ConfFBFTimestamps24' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ -foREVer- Script Ð¼Ð°Ñ€ÐºÐµÑ€ Ð·Ð° Ð²Ñ€ÐµÐ¼Ðµ Ð²Ð¾ 24-Ñ‡Ð°ÑÐ¾Ð²ÐµÐ½ Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚.',
		'ConfFriendRequestCountInTitle' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð±Ñ€Ð¾Ñ˜ Ð¾Ð´ Ð½Ð¾Ð²Ð¸ Ð±Ð°Ñ€Ð°ÑšÐ° Ð·Ð° Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÐ»Ð¸ Ð½Ð° Ð½Ð°ÑÐ»Ð¾Ð²Ð¾Ñ‚ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°Ñ‚Ð°.',
		'ConfGoogleApps' : 'ÐšÑ€ÐµÐ¸Ñ€Ð°Ñ˜ Google ÐšÐ°Ð»ÐµÐ½Ð´Ð°Ñ€ Ð»Ð¸Ð½ÐºÐ¾Ð²Ð¸ ÐºÐ¾Ð¼Ð¿Ð°Ñ‚Ð¸Ð±Ð¸Ð»Ð½Ð¸ ÑÐ¾ Google ÐÐ¿Ð»Ð¸ÐºÐ°Ñ†Ð¸Ð¸.',
		'ConfGoogleAppsDomain' : 'Ð”Ð¾Ð¼ÐµÐ½',
		'ConfGoogleCalendar' : 'Ð”Ð¸Ð´Ð°Ð´Ñƒ Ð»Ð¸Ð½ÐºÐ¾Ð²Ð¸ Ð·Ð° Ð´Ð° Ð´Ð¾Ð´Ð°Ð´ÐµÑˆ Ñ€Ð¾Ð´ÐµÐ½Ð´ÐµÐ½ Ð¸ Ð½Ð°ÑÑ‚Ð°Ð½Ð¸ Ð²Ð¾ <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'ÐˆÐ°Ð·Ð¸Ðº Ð·Ð° <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° Ð°Ð¿Ð»Ð¸ÐºÐ°Ñ†Ð¸Ð¸Ñ‚Ðµ.',
		'ConfHideEventStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° Ð½Ð°ÑÑ‚Ð°Ð½Ð¸Ñ‚Ðµ.',
		'ConfHideFriendStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÐ»Ð¸Ñ‚Ðµ.',
		'ConfHideGroupStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° Ð³Ñ€ÑƒÐ¿Ð¸Ñ‚Ðµ.',
		'ConfHideLikeStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° "Ð¼Ð¸ ÑÐµ Ð´Ð¾Ð¿Ð°Ñ“Ð°".',
		'ConfHideLinkStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° Ð»Ð¸Ð½ÐºÐ¾Ð²Ð¸Ñ‚Ðµ.',
		'ConfHideNoteStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° Ð±ÐµÐ»ÐµÑˆÐºÐ¸Ñ‚Ðµ.',
		'ConfHidePhotoStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸Ñ‚Ðµ.',
		'ConfHideProfilePicStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° Ð¿Ñ€Ð¾Ñ„Ð¸Ð» Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸Ñ‚Ðµ.',
		'ConfHideRead' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ñ€Ð°Ð±Ð¾Ñ‚Ð¸ Ð²Ð¾ Ð½Ð¾Ð²Ð¾ÑÑ‚Ð¸Ñ‚Ðµ Ð¾Ð´ÐºÐ°ÐºÐ¾ ÑœÐµ Ð±Ð¸Ð´Ð°Ñ‚ Ð¾Ð±ÐµÐ»ÐµÐ¶Ð°Ð½Ð¸ Ð·Ð° Ð¿Ñ€Ð¾Ñ‡Ð¸Ñ‚Ð°Ð½Ð¸Ñ‚Ðµ.',
		'ConfHideRelationshipStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° ÑÑ‚Ð°Ñ‚ÑƒÑ-Ð¾Ñ‚ Ð·Ð° Ð²Ñ€ÑÐºÐ°.',
		'ConfHideStatusStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° ÑÑ‚Ð°Ñ‚ÑƒÑÐ¸Ñ‚Ðµ.',
		'ConfHideVideoStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° Ð²Ð¸Ð´ÐµÐ°Ñ‚Ð°.',
		'ConfHideWallStories' : 'Ð¡Ð¾ÐºÑ€Ð¸Ñ˜ Ð³Ð¸ Ð¿Ñ€Ð¸ÐºÐ°Ð·Ð½Ð¸Ñ‚Ðµ Ð·Ð° Ñ•Ð¸Ð´Ð¾Ñ‚.',
		'ConfHomeChat' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ Ð Ð°Ð·Ð³Ð¾Ð²Ð¾Ñ€ ÑÐµÐºÑ†Ð¸Ñ˜Ð°.',
		'ConfHomeEvents' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ ÐÐ°ÑÑ‚Ð°Ð½Ð¸ ÑÐµÐºÑ†Ð¸Ñ˜Ð°.',
		'ConfHomeFindFriends' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ ÐŸÐ¾Ð²Ñ€Ð·Ð°Ð½ ÑÐ¾ Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÐ»Ð¸ ÑÐµÐºÑ†Ð¸Ñ˜Ð°.',
		'ConfHomeLeftAlign' : 'Left-align the contents of the home page.',
		'ConfHomeLeftColumn' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ Ñ˜Ð° Ð»ÐµÐ²Ð°Ñ‚Ð° ÐºÐ¾Ð»Ð¾Ð½Ð°.',
		'ConfHomeLeftColumnFixed' : 'Ð—Ð°Ð´Ñ€Ð¶Ð¸ Ñ˜Ð° Ð»ÐµÐ²Ð°Ñ‚Ð° ÐºÐ¾Ð»Ð¾Ð½Ð° Ð²Ð¸Ð´Ð»Ð¸Ð²Ð°, Ð¿Ð¾ Ð»Ð¸Ð·Ð³Ð°ÑšÐµÑ‚Ð¾ Ð½Ð°Ð´Ð¾Ð»Ðµ.',
		'ConfHomeLink' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ ÐŸÐ¾Ñ‡ÐµÑ‚Ð½Ð° Ð»Ð¸Ð½Ðº Ð²Ð¾ Ñ‚Ð¾Ð¿ Ð¼ÐµÐ½Ð¸ Ð±Ð°Ñ€Ð¾Ñ‚.',
		'ConfHomePeopleYouMayKnow' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ Ð¡ÑƒÐ³ÐµÑÑ‚Ð¸Ð¸ ÑÐµÐºÑ†Ð¸Ñ˜Ð°.',
		'ConfHomeNavigation' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ ÐÐ°Ð²Ð¸Ð³Ð°Ñ†Ð¸Ñ˜Ð° ÑÐµÐºÑ†Ð¸Ñ˜Ð°.',
		'ConfHomePokes' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ Ð‘Ð¾Ñ†ÐºÐ°ÑšÐ° ÑÐµÐºÑ†Ð¸Ñ˜Ð°.',
		'ConfHomeProfile' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ ÐŸÑ€Ð¾Ñ„Ð¸Ð» ÑÐµÐºÑ†Ð¸Ñ˜Ð°.',
		'ConfHomeRequests' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ Ð‘Ð°Ñ€Ð°ÑšÐ° ÑÐµÐºÑ†Ð¸Ñ˜Ð°.',
		'ConfHomeRightColumn' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ Ð´ÐµÑÐ½Ð° ÐºÐ¾Ð»Ð¾Ð½Ð°.',
		'ConfHomeStretch' : 'Ð Ð°ÑÑ‚ÐµÐ³Ð½Ð¸ Ñ˜Ð° ÐŸÐ¾Ñ‡ÐµÑ‚Ð½Ð°Ñ‚Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ð½Ð° Ñ†ÐµÐ»Ð°Ñ‚Ð° ÑˆÐ¸Ñ€Ð¸Ð½Ð° Ð½Ð° Ð¿Ñ€ÐµÐ±Ð°Ñ€ÑƒÐ²Ð°Ñ‡Ð¾Ñ‚.',
		'ConfiCalendar' : 'Ð”Ð¾Ð´Ð°Ð´Ð¸ Ð»Ð¸Ð½ÐºÐ¾Ð²Ð¸ Ð·Ð° Ð¿Ñ€ÐµÐ²Ð·ÐµÐ¼Ð°ÑšÐµ Ð½Ð° <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> Ð´Ð°Ñ‚Ð¾Ñ‚ÐµÐºÐ° ÑÐ¾ ÑÐ¸Ñ‚Ðµ Ñ€Ð¾Ð´ÐµÐ½Ð´ÐµÐ½Ð¸.',
		'ConfImport' : 'Ð—Ð° Ð´Ð° Ð³Ð¸ Ð²Ð½ÐµÑÐµÑˆ Ñ‚Ð²Ð¾Ð¸Ñ‚Ðµ Ð¿Ñ€Ð¸Ð»Ð°Ð³Ð¾Ð´ÑƒÐ²Ð°ÑšÐ° Ð¿Ð¾Ð´Ð¾Ñ†Ð½Ð°, Ð·Ð°Ð¼ÐµÐ½Ð¸ Ð³Ð¾ Ñ‚ÐµÐºÑÑ‚Ð¾Ñ‚ Ð¿Ð¾Ð³Ð¾Ñ€Ðµ ÑÐ¾ Ñ‚ÐµÐºÑÑ‚Ð¾Ñ‚ ÐºÐ¾Ñ˜ Ñ‚Ð¸ Ðµ Ð·Ð°Ñ‡ÑƒÐ²Ð°Ð½ Ð¿Ñ€ÐµÐ´Ñ…Ð¾Ð´Ð½Ð¾ Ð¸ ÐºÐ»Ð¸ÐºÐ½Ð¸ "Ð’Ð½ÐµÑÐ¸".',
		'ConfInboxCountInTitle' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð±Ñ€Ð¾Ñ˜ Ð½Ð° Ð½Ð¾Ð²Ð¸ Ð¿Ð¾Ñ€Ð°ÐºÐ¸ Ð²Ð¾ Ð½Ð°ÑÐ»Ð¾Ð²Ð¾Ñ‚ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°Ñ‚Ð°.',
		'ConfLogoutLink' : 'Ð”Ð¾Ð´Ð°Ð´Ð¸ ÐžÐ´Ñ˜Ð°Ð²Ð¸ ÑÐµ Ð»Ð¸Ð½Ðº Ð²Ð¾ Ñ‚Ð¾Ð¿ Ð¼ÐµÐ½Ð¸ Ð±Ð°Ñ€Ð¾Ñ‚.',
		'ConfNotificationCountInTitle' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð±Ñ€Ð¾Ñ˜ Ð½Ð° Ð½Ð¾Ð²Ð¸ Ð½Ð¾Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸ Ð²Ð¾ Ð½Ð°ÑÐ»Ð¾Ð²Ð¾Ñ‚ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°Ñ‚Ð°.',
		'ConfNewTabSearch' : 'ÐÐ°Ð¿Ñ€Ð°Ð²Ð¸ Ð³Ð¸ Ð¾Ñ‚Ð²Ð¾Ñ€ÐµÐ½Ð¸ Ð¿Ñ€ÐµÐ±Ð°Ñ€ÑƒÐ²Ð°ÑšÐ°Ñ‚Ð° Ð²Ð¾ Ð½Ð¾Ð² Ñ‚Ð°Ð±/Ð¿Ñ€Ð¾Ð·Ð¾Ñ€ÐµÑ† ÐºÐ¾Ð³Ð° Ð¿Ñ€Ð¸Ñ‚Ð¸ÑÐºÐ°Ð¼ CTRL + Enter Ð·Ð° Ð´Ð° Ð±Ð°Ñ€Ð°Ð¼.',
		'ConfPageTitle' : 'Ð˜Ð·Ð±Ñ€Ð¸ÑˆÐ¸ "Facebook |" Ð¾Ð´ Ð½Ð°ÑÐ»Ð¾Ð²Ð¾Ñ‚ Ð½Ð° ÑÐµÐºÐ¾Ñ˜Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°.',
		'ConfPhotoPopup' : 'Ð¡ÐºÐ¾ÐºÐ°Ñ‡ÐºÐ¸ Ð¿Ð¾Ð³Ð¾Ð»ÐµÐ¼Ð¸ Ð²ÐµÑ€Ð·Ð¸Ð¸ Ð½Ð° Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸ Ð¿Ñ€Ð¸ Ð¾Ð±ÐµÐ»ÐµÐ¶ÑƒÐ²Ð°ÑšÐµ ÑÐ¾ Ð³Ð»ÑƒÐ²Ñ‡ÐµÑ‚Ð¾.',
		'ConfPopupAutoClose' : 'Ð—Ð°Ñ‚Ð²Ð¾Ñ€Ð¸ Ð³Ð¸ ÑÐºÐ¾ÐºÐ°Ñ‡ÐºÐ¸Ñ‚Ðµ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸ Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸.',
		'ConfPopupSmartAutoClose' : 'Ð¡Ð¿Ñ€ÐµÑ‡Ð¸ Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚ÑÐºÐ¸ Ð¸ÑÐºÐ»ÑƒÑ‡ÑƒÐ²Ð°ÑšÐµ Ð½Ð° ÑÐºÐ¾ÐºÐ°Ñ‡ÐºÐ¸Ñ‚Ðµ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸ Ð°ÐºÐ¾ Ð¾Ð±ÐµÐ»ÐµÐ¶ÑƒÐ²Ð°Ñ‡Ð¾Ñ‚ Ð½Ð° Ð³Ð»ÑƒÐ²Ñ‡ÐµÑ‚Ð¾ Ðµ Ð½Ð°Ð´ Ð½Ð¸Ð²',
		'ConfPopupPosition' : 'ÐŸÐ¾Ð·Ð¸Ñ†Ð¸Ñ˜Ð° Ð·Ð° ÑÐºÐ¾ÐºÐ°Ñ‡ÐºÐ¸ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸',
		'ConfProcessInterval' : 'Ð˜Ð½Ñ‚ÐµÑ€Ð²Ð°Ð» Ð·Ð° Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚ÑƒÐ²Ð°ÑšÐµ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°, Ð²Ð¾ Ð¼Ð¸Ð»Ð¸ÑÐµÐºÑƒÐ½Ð´Ð¸ (Ð¿Ð¾ÑÑ‚Ð°Ð²ÐµÐ½Ð¾=1000):',
		'ConfProfileLink' : 'ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ ÐŸÑ€Ð¾Ñ„Ð¸Ð» Ð»Ð¸Ð½Ðº Ð²Ð¾ Ñ‚Ð¾Ð¿ Ð¼ÐµÐ½Ð¸ Ð±Ð°Ñ€Ð¾Ñ‚.',
		'ConfProfilePicPopup' : 'Ð¡ÐºÐ¾ÐºÐ°Ñ‡ÐºÐ¸ Ð³Ð¾Ð»ÐµÐ¼Ð¸ Ð²ÐµÑ€Ð·Ð¸Ð¸ Ð½Ð° Ð¿Ñ€Ð¾Ñ„Ð¸Ð» Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸ ÑÐ¾ Ð¾Ð±ÐµÐ»ÐµÐ¶ÑƒÐ²Ð°ÑšÐµ ÑÐ¾ Ð³Ð»ÑƒÐ²Ñ‡ÐµÑ‚Ð¾',
		'ConfProtocolLinks' : 'Ð’ÐºÐ»ÑƒÑ‡Ð¸ Ð¼ÐµÑÐ¸Ð½ÑŸÐµÑ€ ÑÐ¼ÐµÑ‚ÐºÐ¸ Ð½Ð° Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð¸Ñ‚Ðµ ÑÐ¾ Ð»Ð¸Ð½ÐºÐ¾Ð²Ð¸ Ð·Ð° Ð¿Ð¾Ñ‡ÐµÑ‚Ð¾Ðº Ð½Ð° Ñ€Ð°Ð·Ð³Ð¾Ð²Ð¾Ñ€ ÑÐ¾ Ð½Ð¸Ð² (Google Talk, Windows Live Ð¸ Ñ‚Ð½).',
		'ConfSectionAbout' : 'Ð—Ð° -foREVer- Script',
		'ConfSectionAdvanced' : 'ÐÐ°Ð¿Ñ€ÐµÐ´Ð½Ð¾',
		'ConfSectionEvents' : 'Ð Ð¾Ð´ÐµÐ½Ð´ÐµÐ½Ð¸/ÐÐ°ÑÑ‚Ð°Ð½Ð¸',
		'ConfSectionImportExport' : 'Ð’Ð½ÐµÑÐ¸/Ð˜Ð·Ð½ÐµÑÐ¸',
		'ConfSectionFeeds' : 'Ð˜Ð·Ð²Ð¾Ñ€Ð¸',
		'ConfSectionHomePage' : 'ÐŸÐ¾Ñ‡ÐµÑ‚Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°',
		'ConfSectionLiveFeed' : 'ÐÐ¾Ð²Ð¾ÑÑ‚Ð¸',
		'ConfSectionMenu' : 'ÐœÐµÐ½Ð¸Ð°/Ð Ð°Ð·Ð³Ð¾Ð²Ð¾Ñ€',
		'ConfSectionOther' : 'Ð”Ñ€ÑƒÐ³Ð¸ ÐžÐ¿Ñ†Ð¸Ð¸',
		'ConfSectionPageTitle' : 'ÐÐ°ÑÐ»Ð¾Ð² Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°',
		'ConfSectionPictures' : 'Ð¤Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸',
		'ConfSectionShortcuts' : 'ÐšÑ€Ð°Ñ‚ÐµÐ½ÐºÐ¸ Ð·Ð° Ñ‚Ð°ÑÑ‚Ð°Ñ‚ÑƒÑ€Ð°',
		'ConfSecureLinks' : 'Ð¡Ð¸Ð»Ð° Ð½Ð° Facebook Ð»Ð¸Ð½ÐºÐ¾Ð²Ð¸Ñ‚Ðµ Ð´Ð¾ Ñ‚Ð¾Ñ‡ÐºÐ° Ð´Ð¾ HTTPS ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð¸.',
		'ConfShortcutList' : '<b>ÐšÑ€Ð°Ñ‚ÐµÐ½ÐºÐ¸ Ð·Ð° Ñ‚Ð°ÑÑ‚Ð°Ñ‚ÑƒÑ€Ð°</b> (case sensitive):<br /><br /><i>ÐžÐ´ ÑÐµÐºÐ¾Ñ˜Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Ð’ÐºÐ»ÑƒÑ‡Ð¸ ÐºÐ¾Ñ€Ð¸ÑÐ½Ð¸Ñ†Ð¸ (Ð²ÐºÐ»ÑƒÑ‡ÐµÐ½Ð¸ Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÐ»Ð¸)<br />&nbsp;<b>C</b> - -foREVer- Script ÐšÐ¾Ð½Ñ„Ð¸Ð³ÑƒÑ€Ð°Ñ†Ð¸Ñ˜Ð°<br />&nbsp;<b>D</b> - Ð Ð¾Ð´ÐµÐ½Ð´ÐµÐ½Ð¸<br />&nbsp;<b>E</b> - ÐÐ°ÑÑ‚Ð°Ð½Ð¸<br />&nbsp;<b>F</b> - ÐŸÑ€Ð¸Ñ˜Ð°Ñ‚ÐµÐ»Ð¸<br />&nbsp;<b>H</b> - ÐŸÐ¾Ñ‡ÐµÑ‚Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°<br />&nbsp;<b>I</b> - Ð¡Ð°Ð½Ð´Ð°Ñ‡Ðµ<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show -foREVer- Script debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by -foREVer- Script<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Ð’ÐºÐ»ÑƒÑ‡Ð¸ ÐºÑ€Ð°Ñ‚ÐµÐ½ÐºÐ¸ Ð·Ð° Ñ‚Ð°ÑÑ‚Ð°Ñ‚ÑƒÑ€Ð°.',
		'ConfSign' : 'ÐŸÑ€ÐºÐ°Ð¶Ð¸ Ñ…Ð¾Ñ€Ð¾ÑÐºÐ¾Ð¿ÑÐºÐ¸ Ð·Ð½Ð°Ñ‡Ð¸ Ð½Ð° Ð»ÑƒÑ“Ðµ\-Ñ‚Ð¾ Ð½Ð° Ð½Ð¸Ð²Ð½Ð¸Ñ‚Ðµ Ð¿Ñ€Ð¾Ñ„Ð¸Ð»Ð¸ (ÐÐºÐ¾ Ñ˜Ð° Ð¾Ð±Ñ˜Ð°Ð²Ð¸Ð»Ðµ Ñ‚Ð°Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ˜Ð°).',
		'ConfTopBarFixed' : 'Ð—Ð°Ñ‡ÑƒÐ²Ð°Ñ˜ Ð³Ð¾ Ð³Ð¾Ñ€Ð½Ð¸Ð¾Ñ‚ Ð¼ÐµÐ½Ð¸ Ð±Ð°Ñ€ Ð½Ð° ÐµÐºÑ€Ð°Ð½Ð¾Ñ‚ ÑÐµÐºÐ¾Ð³Ð°Ñˆ, Ð¸ Ð¿Ð¾ Ð»Ð¸Ð·Ð³Ð°ÑšÐµÑ‚Ð¾ Ð´Ð¾Ð»Ðµ.',
		'ConfTopBarHoverOpacity' : 'ÐŸÑ€Ð¸ Ð¾Ð±ÐµÐ»ÐµÐ¶ÑƒÐ²Ð°ÑšÐµ ÑÐ¾ Ð³Ð»ÑƒÐ²Ñ‡ÐµÑ‚Ð¾',
		'ConfTopBarOpacity' : 'ÐŸÑ€Ð¾Ñ•Ð¸Ñ€Ð½Ð¾ÑÑ‚ Ð½Ð° Ð³Ð¾Ñ€Ð½Ð¸Ð¾Ñ‚ Ð¼ÐµÐ½Ð¸ Ð±Ð°Ñ€',
		'ConfUpdates' : 'ÐŸÑ€Ð¾Ð²ÐµÑ€Ð¸ Userscripts.org Ð´Ð½ÐµÐ²Ð½Ð¾ Ð·Ð° Ð½Ð°Ð´Ð¾Ð³Ñ€Ð°Ð´Ð±Ð¸ Ð²Ð¾ -foREVer- Script. Ð˜Ð»Ð¸ <a href="#" id="fbfUpdateLink" onclick="return false;">Ð¿Ñ€Ð¾Ð²ÐµÑ€Ð¸ ÑÐµÐ³Ð°</a>.',
		'DownloadVideo' : 'ÐŸÑ€ÐµÐ²Ð·ÐµÐ¼Ð¸ Ð’Ð¸Ð´ÐµÐ¾',
		'ExportICalendarFile' : 'Ð˜Ð·Ð½ÐµÑÐ¸ iCalendar Ð´Ð°Ñ‚Ð¾Ñ‚ÐµÐºÐ°',
		'ExportICalendarFileWarning' : '(Ð¢Ð¾Ð° ÑœÐµ Ð¿Ð¾Ñ‚Ñ€Ð°Ðµ Ð°ÐºÐ¾ Ð¸Ð¼Ð°Ñˆ Ð¼Ð½Ð¾Ð³Ñƒ Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÐ»Ð¸)',
		'Facebook-foREVer-Conflict' : 'Facebook -foREVer- Ðµ ÑÐµÐ³Ð° -foREVer- Script.<br /><br />Ð—Ð° Ð¿Ñ€Ð¾Ð¼ÐµÐ½Ð° Ð½Ð° Ð¸Ð¼Ðµ Ñ‚Ñ€ÐµÐ±Ð° ÑÐ°Ð¼Ð¸ Ð´Ð° Ð³Ð¾ Ð¸Ð·Ð±Ñ€Ð¸ÑˆÐµÑ‚Ðµ Facebook -foREVer- Ð¾Ð´ Ð²Ð°ÑˆÐ¸Ð¾Ñ‚ Ð¿Ñ€ÐµÐ±Ð°Ñ€ÑƒÐ²Ð°Ñ‡, Ð¸Ð»Ð¸ Ð´Ð²ÐµÑ‚Ðµ ÑÐºÑ€Ð¸Ð¿Ñ‚Ð¸ ÑœÐµ ÑÐ¾Ð·Ð´Ð°Ð²Ð°Ð°Ñ‚ Ð¿Ñ€Ð¾Ð±Ð»ÐµÐ¼ ÐµÐ´Ð½Ð° Ð½Ð° Ð´Ñ€ÑƒÐ³Ð°.<br /><br />ÐÐºÐ¾ Ð½Ðµ ÑÐ¸ ÑÐ¸Ð³ÑƒÑ€ÐµÐ½ ÐºÐ°ÐºÐ¾ Ð´Ð° Ñ˜Ð° Ð¸Ð·Ð±Ñ€Ð¸ÑˆÐµÑˆ ÑÐºÑ€Ð¸Ð¿Ñ‚Ð°Ñ‚Ð°, <a %s>ÐºÐ»Ð¸ÐºÐ½Ð¸ Ñ‚ÑƒÐºÐ° Ð·Ð° Ð¸Ð½ÑÑ‚Ñ€ÑƒÐºÑ†Ð¸Ð¸</a>.',
		'fullAlbumLoaded' : 'Ñ†ÐµÐ»Ð¸Ð¾Ñ‚ Ð°Ð»Ð±ÑƒÐ¼ Ðµ Ð²Ñ‡Ð¸Ñ‚Ð°Ð½',
		'Import' : 'Ð’Ð½ÐµÑÐ¸',
		'ImportConfirm' : 'Ð”Ð°Ð»Ð¸ ÑÐ¸ ÑÐ¸Ð³ÑƒÑ€ÐµÐ½ Ð´ÐµÐºÐ° ÑÐ°ÐºÐ°Ñˆ Ð´Ð° Ð³Ð¸ Ð²Ð½ÐµÑÐµÑˆ Ð¾Ð²Ð¸Ðµ Ð¿Ñ€Ð¸Ð»Ð°Ð³Ð¾Ð´ÑƒÐ²Ð°ÑšÐ°?\nÐ¢Ð²Ð¾Ð¸Ñ‚Ðµ ÑÐµÐ³Ð°ÑˆÐ½Ð¸ Ð¿Ñ€Ð¸Ð»Ð°Ð³Ð¾Ð´ÑƒÐ²Ð°ÑšÐ° ÑœÐµ Ð±Ð¸Ð´Ð°Ñ‚ Ð¸Ð·Ð³ÑƒÐ±ÐµÐ½Ð¸.',
		'ImportFailure' : 'ÑÐµ Ð¿Ð¾Ñ˜Ð°Ð²Ð¸ Ð³Ñ€ÐµÑˆÐºÐ° Ð´Ð¾Ð´ÐµÐºÐ° Ð³Ð¸ Ð²Ð½ÐµÑÑƒÐ²Ð°ÑˆÐµ Ñ‚Ð²Ð¾Ð¸Ñ‚Ðµ Ð¿Ñ€Ð¸Ð»Ð°Ð³Ð¾Ð´ÑƒÐ²Ð°ÑšÐ°.',
		'ImportSuccess' : 'Ð’Ð½ÐµÑÑƒÐ²Ð°ÑšÐµÑ‚Ð¾ Ðµ Ð·Ð°Ð²Ñ€ÑˆÐµÐ½Ð¾. Ð”Ð°Ð»Ð¸ ÑÐ°ÐºÐ°Ñˆ Ð´Ð° Ñ˜Ð° Ð¾ÑÐ²ÐµÐ¶Ð¸Ñˆ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°Ñ‚Ð°?',
		'Left' : 'Ð›ÐµÐ²Ð¾',
		'LoadingAllPhotos' : 'Ð¡Ðµ Ð²Ñ‡Ð¸Ñ‚ÑƒÐ²Ð°Ð°Ñ‚ ÑÐ¸Ñ‚Ðµ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸...',
		'loadingFullAlbum' : 'Ð¡Ðµ Ð²Ñ‡Ð¸Ñ‚ÑƒÐ²Ð° Ñ†ÐµÐ»Ð¸Ð¾Ñ‚ Ð°Ð»Ð±ÑƒÐ¼...',
		'LoadingPic' : 'Ð¡Ðµ Ð²Ñ‡Ð¸Ñ‚ÑƒÐ²Ð° Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ˜Ð°Ñ‚Ð°...',
		'LoadPhotosWarning' : 'Ð’Ñ‡Ð¸Ñ‚ÑƒÐ²Ð°ÑšÐµÑ‚Ð¾ Ð½Ð° ÑÐ¸Ñ‚Ðµ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸ Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð¿Ð¾Ñ‚Ñ€Ð°Ðµ',
		'Months' : Array('ÐˆÐ°Ð½ÑƒÐ°Ñ€Ð¸','Ð¤ÐµÐ±Ñ€ÑƒÐ°Ñ€Ð¸','ÐœÐ°Ñ€Ñ‚','ÐÐ¿Ñ€Ð¸Ð»','ÐœÐ°Ñ˜','ÐˆÑƒÐ½Ð¸','ÐˆÑƒÐ»Ð¸','ÐÐ²Ð³ÑƒÑÑ‚','Ð¡ÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸','ÐžÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸','ÐÐ¾ÐµÐ¼Ð²Ñ€Ð¸','Ð”ÐµÐºÐµÐ¼Ð²Ñ€Ð¸'),
		'ProtocolSkype' : 'ÐˆÐ°Ð²Ð¸ ÑÐµ %s Ð¿Ñ€ÐµÐºÑƒ Skype',
		'ProtocolMSN' : 'Ð Ð°Ð·Ð³Ð¾Ð²Ð°Ñ€Ð°Ñ˜ ÑÐ¾ %s Ð¿Ñ€ÐµÐºÑƒ Windows Live',
		'ProtocolYahoo' : 'Ð Ð°Ð·Ð³Ð¾Ð²Ð°Ñ€Ð°Ñ˜ ÑÐ¾ %s Ð¿Ñ€ÐµÐºÑƒ Yahoo Messenger',
		'ProtocolGoogle' : 'Ð Ð°Ð·Ð³Ð¾Ð²Ð°Ñ€Ð°Ñ˜ ÑÐ¾ %s Ð¿Ñ€ÐµÐºÑƒ Google Talk',
		'ReloadErrorPage' : 'ÐŸÑ€Ð¾Ð±Ð°Ñ˜ Ð¿Ð¾Ð²Ñ‚Ð¾Ñ€Ð½Ð¾, Ð¸Ð»Ð¸ Ð¿Ð¾Ñ‡ÐµÐºÐ°Ñ˜ 5 ÑÐµÐºÑƒÐ½Ð´Ð¸',
		'Refresh' : 'ÐžÑÐ²ÐµÐ¶Ð¸',
		'Remove' : 'Ð˜Ð·Ð±Ñ€Ð¸ÑˆÐ¸',
		'Right' : 'Ð”ÐµÑÐ½Ð¾',
		'ShowBigPictures' : 'ÐŸÐ¾ÐºÐ°Ð¶Ð¸ Ð³Ð¾Ð»ÐµÐ¼Ð¸ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸',
		'Signs' : Array('ÐˆÐ°Ñ€ÐµÑ†','Ð’Ð¾Ð´Ð¾Ð»Ð¸Ñ˜Ð°','Ð Ð¸Ð±Ð¸','ÐžÐ²ÐµÐ½','Ð‘Ð¸Ðº','Ð‘Ð»Ð¸Ð·Ð½Ð°Ñ†Ð¸','Ð Ð°Ðº','Ð›Ð°Ð²','Ð”ÐµÐ²Ð¸Ñ†Ð°','Ð’Ð°Ð³Ð°','Ð¡ÐºÐ¾Ñ€Ð¿Ð¸Ñ˜Ð°','Ð¡Ñ‚Ñ€ÐµÐ»ÐµÑ†'),
		'today' : 'Ð´ÐµÐ½ÐµÑ',
		'Translators' : 'ÐŸÑ€ÐµÐ²ÐµÐ´ÑƒÐ²Ð°Ñ‡Ð¸',
		'UpdateAvailable1' : 'Ð”Ð¾ÑÑ‚Ð°Ð¿Ð½Ð° Ðµ Ð½Ð°Ð´Ð¾Ð³Ñ€Ð°Ð´Ð±Ð° Ð·Ð° -foREVer- Script',
		'UpdateAvailable2' : 'Ð”Ð°Ð»Ð¸ ÑÐ°ÐºÐ°Ñˆ Ð´Ð° Ð½Ð°Ð´Ð¾Ð³Ñ€Ð°Ð´Ð¸Ñˆ ÑÐµÐ³Ð°?',
		'UpdateHomepage' : 'ÐžÐ´Ð¸ Ð½Ð° Ð¿Ð¾Ñ‡ÐµÑ‚Ð½Ð°',
		'UpdateInstall' : 'Ð˜Ð½ÑÑ‚Ð°Ð»Ð¸Ñ€Ð°Ñ˜ ÑÐµÐ³Ð°',
		'UpdateTomorrow' : 'ÐŸÐ¾Ñ‚ÑÐµÑ‚Ð¸Ð¼Ðµ ÑƒÑ‚Ñ€Ðµ',
		'yearsOld' : '%s Ð³Ð¾Ð´Ð¸Ð½Ð¸'
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
		'Birthday' : '%s\'s fÃ¸dselsdag',
		'BookmarkAdd' : 'Legg til nytt bokmerke',
		'BookmarkExists' : 'Det er allerede et bokmerke til denne siden.\n\nGÃ¥ til siden du Ã¸nsker Ã¥ bokmerke og forsÃ¸k igjen.',
		'BookmarkNamePrompt' : 'Legg inn et navn til dette bokmerketet:\n%s',
		'BookmarksConfirmRemoval' : 'Er du sikker pÃ¥ at du vil fjerne disse bokmerkene?',
		'BookmarksManage' : 'Behandle bokmerker',
		'BookmarksRemoveSelected' : 'Fjern valgte bokmerker',
		'Bookmarks' : 'Bokmerker',
		'BrowserUnsupported' : 'Nettleseren din stÃ¸tter ikke dette valget.',                                 
		'CreatingFile' : 'Lager fil',
		'Close' : 'Lukk',
		'ConfigureFacebook-foREVer-' : '-foREVer- Script - Alternativer',
		'ConfigureInstructions' : 'Alle endringer lagres umiddelbart, men noen forandringer virker ikke i faner som allerede er Ã¥pne.',
		'ConfAge' : 'Vis en person\'s alder pÃ¥ profilen (om de viser hele fÃ¸dselsdatoen sin).',
		'ConfAlbumComments' : 'Legg til en lenke pÃ¥ album-sider for Ã¥ vise alle kommentarene til albumet.',
		'ConfApplicationWhitelist' : 'Applikasjoner\'s Hvit-liste - Legg in ID\'ene til applikasjoner for Ã¥ hindre at de blir skjult. Adskill ID\'er med mellomrom.',
		'ConfAutoBigAlbumPictures' : 'Automatisk vis stÃ¸rre albumbilder nÃ¥r siden Ã¥pnes.',
		'ConfAutoLoadFullAlbum' : 'Automatisk last inn fimerkebilder for alle bildene i et album pÃ¥ ei enkel side.',
		'ConfAutoLoadTaggedPhotos' : 'Automatisk last inn fimerkebilder for alle merkede bilder pÃ¥ ei enkel side (bildefaner pÃ¥ personer\'s profiler).',
		'ConfAutoReadMore' : 'Automatisk klikk pÃ¥ "les mer"-lenker.',
		'ConfBigAlbumPictures' : 'Legg til ei lenke pÃ¥ album sider for kunne vise stÃ¸rre versjoner av alle bildene pÃ¥ den siden.',
		'ConfBigAlbumPicturesBorder' : 'Add a border around bigger versions of pictures.',
		'ConfBookmarks' : 'Legg en bokmerke-undermeny til toppmeny-linjen.',
		'ConfBottomBarHoverOpacity' : 'Ved mus-over',
		'ConfBottomBarOpacity' : 'Bunmeny-linjen\'s gjennomsiktighet',
		'ConfCalendarBirthDate' : 'Inkluder personen\'s fÃ¸dselsdato i hendelsesdetaljer.',
		'ConfCalendarFullName' : 'Bruke personen\'s fulle navn som tittel til fÃ¸dselsdager (istedenfor bare fornavn).',
		'ConfChatDifferentiate' : 'Bruke fete typer og kursiv til Ã¥ skille mellom tilgjengelige og fravÃ¦rende venner.',
		'ConfChatHideIdle' : 'Skjul frvÃ¦rende venner.',
		'ConfDelayPopupPics' : 'Legg inn en kort pause fÃ¸r sprettopp-bilder vises.',
		'ConfDelayPopupPicsTimeout' : 'Pause fÃ¸r sprettopp-bilder vises, i millisekunder (standard=500):',
		'ConfDownloadVideo' : 'Legg til en lenke for Ã¥ kunne laste ned videoer fra video-sider. (Du kan fÃ¥ behov for en <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV-spiller</a>)',
		'ConfErrorPageReload' : 'Automatisk laste inn igjen en applikasjon\'s feilsider etter 5 sekunder.',
		'ConfExport' : 'For Ã¥ eksportere oppsettet ditt, kopier teksten nedenfor og lagre den i en fil.',
		'ConfExternalPopup' : 'Sprettopp versjoner i full-stÃ¸rrelse av eksterne bilder. <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : 'SprÃ¥k til -foREVer- Script',
		'ConfFacebookTimestamps' : 'Vis Facebook tidsangivelse (eg. "3 timer siden").',
		'ConfFBFTimestamps' : 'Legg til -foREVer- Script tidsangivelser etter Facebook tider (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Vis -foREVer- Script tidsangivelser i 24-timers format.',
		'ConfFriendRequestCountInTitle' : 'Vis antall nye venneforespÃ¸rsler i sidetittelen.',
		'ConfGoogleApps' : 'GjÃ¸r Google kalender-lenker kompatible med Google Apps.',
		'ConfGoogleAppsDomain' : 'Domene',
		'ConfGoogleCalendar' : 'Legg inn lenker til Legg til FÃ¸dselsdager og Hendelser for <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google kalender</a>.',
		'ConfGoogleLanguage' : 'SprÃ¥k for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Oversettelse</a>',
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
		'ConfHideRead' : 'Skjul objekter i aktiv Notis som er blitt markert som rÃ¸de.',
		'ConfHideRelationshipStories' : 'Skjul Forhold-oversikt.',
		'ConfHideStatusStories' : 'Skjul Status-oversikt.',
		'ConfHideVideoStories' : 'Skjul Video-oversikt.',
		'ConfHideWallStories' : 'Skjul Vegg-oversikt.',
		'ConfHomeBeta' : 'Vis Beta Tester seksjonen.',
		'ConfHomeChat' : 'Vis  Chat-seksjonen.',
		'ConfHomeEvents' : 'Vis Hendelse-seksjonen.',
		'ConfHomeFindFriends' : 'Vis Koble til Venner-seksjonen.',
		'ConfHomeLeftAlign' : 'Venstrestill innhold pÃ¥ Hjem-siden.',
		'ConfHomeLeftColumn' : 'Vis venstre kolonne.',
		'ConfHomeLeftColumnFixed' : 'Behold den venstre kolonnen synlig, selv etter rulling nedover.',
		'ConfHomeLink' : 'Vis Hjem-lenken i toppmeny-feltet.',
		'ConfHomeNavigation' : 'Vis Navigasjons-seksjonen.',
		'ConfHomePokes' : 'Vis Pokes-seksjonen.',
		'ConfHomeProfile' : 'Vis Profil-seksjonen.',
		'ConfHomeRecommendations' : 'Vis anbefalinger (Personer du kanskje kjenner, anbefalte sider etc).',
		'ConfHomeRequests' : 'Vi ForespÃ¸rsel-seksjonen.',
		'ConfHomeRightColumn' : 'Vis hÃ¸yre kolonne.',
		'ConfHomeStretch' : 'Strekk siden Hjem til netteleserens vidde fullt ut.',
		'ConfHomeStretchComments' : 'Strekk kommentarfeltene pÃ¥ Hjem-sida.',
		'ConfiCalendar' : 'Legg lenke til Laste ned en <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> fil med alle fÃ¸dselsdagene.',
		'ConfImport' : 'For Ã¥ kunne importere oppsettet ditt senere, skriver du over teksten nedenfor med teksten du lagret idligere og klikk "Import".',
		'ConfInboxCountInTitle' : 'Vis antall nye innboks-meldinger pÃ¥ tittellinjen til siden.',
		'ConfLogoutLink' : 'Legg til en Logg-ut lenke pÃ¥ topp-meny linjen.',
		'ConfNotificationCountInTitle' : 'Vis antall nye Varsler i sidetittelen.',
		'ConfNewTabSearch' : 'La sÃ¸keresultatet Ã¥pnes i ny fane/vindu ved sÃ¸k med trykk av CTRL + Enter.',
		'ConfPageTitle' : 'Fjern "Facebook |" fra tittelen pÃ¥ hver side.',
		'ConfPhotoPopup' : 'Sprettopp stÃ¸rre versjoner av bilder ved mus-over.',
		'ConfPopupAutoClose' : 'Lukk sprettopp-bilder automatisk.',
		'ConfPopupSmartAutoClose' : 'Hindre sprettopp-bilder i Ã¥ lukkes automatisk om musen er over det.',
		'ConfPopupPosition' : 'Posisjon for sprettopp-bilder',
		'ConfProcessInterval' : 'Intervall for Ã¥ lage siden, i millisekund (standard=1000):',
		'ConfProfileLink' : 'Vis Profil-lenken i toppmeny linjen.',
		'ConfProfilePicPopup' : 'Sprettopp stÃ¸rre versjoner av profil-bilder ved musover',
		'ConfProtocolLinks' : 'Endre meldings ID\'er pÃ¥ profiler til lenker som starter en dialog med dem (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Om -foREVer- Script',
		'ConfSectionAdvanced' : 'Avansert',
		'ConfSectionEvents' : 'FÃ¸dselsdager/Hendelser',
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
		'ConfShortcutList' : '<b>Tastatur-Snarveier</b> (smÃ¥/store sensitive):<br /><br /><i>Fra hvilken som helst side:</i><br /> <b>A</b> - Album/bilder<br /> <b>B</b> - Handtere venneliste (nettvenner)<br /> <b>C</b> - -foREVer- Script oppsett<br /> <b>D</b> - FÃ¸dselsdager<br /> <b>E</b> - Hendelser<br /> <b>F</b> - Venner<br /> <b>H</b> - Hjem side<br /> <b>I</b> - Innboks<br /> <b>K</b> - Legg til Bokmerke<br /> <b>L</b> - Velg Logg ut lenken (trykk Enter etterpÃ¥ for Ã¥ logge ut)<br /> <b>N</b> - Varsler<br /> <b>P</b> - Din Profil<br /> <b>R</b> - ForespÃ¸rsler<br /> <b>S</b> - Hopp til sÃ¸kefeltet<br /> <b>T</b> - Oversett valgt tekst<br /> <b>?</b> - Vis -foREVer- Script\'s feilrette-info<br /> <b><escape></b> - Lukk sprettopp\'er laget av -foREVer- Script<br /><br /><i>Fra Hjem siden (filtere)</i>:<br /> <b>a</b> - Sider<br /> <b>f</b> - Aktiv Notis<br /> <b>g</b> - Grupper<br /> <b>l</b> - Lenker<br /> <b>n</b> - Nyhets Notiser<br /> <b>p</b> - Bilder<br /> <b>s</b> eller <b>u</b> - Status-Oppdateringer<br /> <b>t</b> - Notater<br /> <b>v</b> - Videoer<br /><br /><i>Fra profiler</i>:<br /> <b>i</b> - Info<br /> <b>p</b> - Bilder<br /> <b>w</b> - Vegg<br /> <b>x</b> - Bokser<br /><br /><i>Fra sider med nummerering (forrige, neste, etc)</i><br /> <b><venstre pil></b> - Forrige<br /> <b><hÃ¸yre pil></b> - Neste<br /> <b><shift> + <venstre pil></b> - FÃ¸rste (nÃ¥r tilgjengelig)<br /> <b><shift> + <hÃ¸yre pil></b> - Siste (nÃ¥r tilgjengelig)<br /><br /><i>Mens man ser pÃ¥ album/bilder:</i><br /> <b>a</b> - Last alle frimerkebilder (nÃ¥r tilgjengelig)<br /> <b>b</b> - Vis store bilder<br /> <b>c</b> - Se pÃ¥ kommentarer<br /> <b>k</b> - Tilbake til album<br /> <b>m</b> - Bilder av (person) og meg<br /><br /><i>Mens man ser pÃ¥ siste album og opplastede/merkede bilder:</i><br /> <b>a</b> eller  <b>r</b> - Siste Album<br /> <b>m</b> eller  <b>u</b> - Mobile opplastinger<br /> <b>o</b> - Bilder av meg<br /> <b>p</b> - Mine bilder<br /> <b>t</b> eller  <b>f</b> - Merkede venner',
		'ConfShortcuts' : 'Aktiver tastatur-snarveier.',
		'ConfSign' : 'Vis en person\'s stjernetegn pÃ¥ profilen (om de oppgir fÃ¸dselsdatoen sin).',
		'ConfTopBarFixed' : 'Behold alltid toppmeny-linjen pÃ¥ skjermen, til og med etter rulling nedover.',
		'ConfTopBarHoverOpacity' : 'Ved mus-over',
		'ConfTopBarOpacity' : 'Toppmenyens gjennomsiktighet',
		'ConfUpdates' : 'Sjekk Userscripts.org daglig etter oppdateinger til -foREVer- Script. Eller <a href="#" id="fbfUpdateLink" onclick="return false;">sjekk nÃ¥</a>.',
		'DownloadVideo' : 'Last ned video',
		'ExportICalendarFile' : 'Eksporter iCalendar fil',
		'ExportICalendarFileWarning' : '(Dette vil ta ei stund om du har mange venner)',
		'Facebook-foREVer-Conflict' : 'Facebook -foREVer- er nÃ¥ kjent som -foREVer- Script.<br /><br />PÃ¥ grunn av navnebyttet mÃ¥ du manuelt avinstallere Facebook -foREVer- fra nettleseren din, ellers vil de to scriptene komme i konflikt med hverandre.<br /><br />Dersom du ikke er sikker pÃ¥ hvordan man avinstallerer et brukerscript, <a %s>klikk her for instruksjoner</a>.',
		'fullAlbumLoaded' : 'hele album lastet',
		'Import' : 'Importer',
		'ImportConfirm' : 'Er du sikker pÃ¥ at du vil importere dette oppsettet?\nDine nÃ¥vÃ¦rende valg vil bli tapt.',
		'ImportFailure' : 'En feil oppstod mmens oppsettet ditt ble forsÃ¸kt importert.',
		'ImportSuccess' : 'Importering fullfÃ¸rt. Ã˜nsker du Ã¥ oppfriske siden?',
		'Left' : 'Venstre',
		'LoadingAllPhotos' : 'Laster alle bilder...',
		'loadingFullAlbum' : 'Laster hele album...',
		'LoadingPic' : 'Laster bilde...',
		'LoadPhotosWarning' : 'Laste alle bilder kan ta lang tid',
		'Months' : new Array('Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'),
		'ProtocolSkype' : 'Ring %s ved Ã¥ bruke Skype',
		'ProtocolMSN' : 'Chat med %s ved Ã¥ bruke Windows Live',
		'ProtocolYahoo' : 'Chat med %s ved Ã¥ bruke Yahoo Messenger',
		'ProtocolGoogle' : 'Chat med %s ved Ã¥ bruke Google Talk',
		'ReloadErrorPage' : 'Klikk for Ã¥ forsÃ¸ke pÃ¥ nytt, eller vent 5 sekunder',
		'Refresh' : 'Oppfrisk',
		'Remove' : 'Fjern',
		'Right' : 'HÃ¸yre',
		'ShowBigPictures' : 'Vis store bilder',
		'Signs' : new Array('Steinbukken','Vannmannen','Fiskene','VÃ¦ren','Tyren','Tvillingene','Krepsen','LÃ¸ven','Jomfruen','Vekten','Skorpionen','Skytten'),
		'today' : 'i dag',
		'Translators' : 'Oversettere',
		'UpdateAvailable1' : 'En oppdatering til -foREVer- Script er tilgjengelig',
		'UpdateAvailable2' : 'Vil du oppdatere nÃ¥?',
		'UpdateHomepage' : 'GÃ¥ til hjem siden',
		'UpdateInstall' : 'Installer nÃ¥',
		'UpdateTomorrow' : 'Minn meg pÃ¥ om dette i morgen',
		'ViewAlbumComments' : 'Vis album-kommentarer',
		'yearsOld' : '%s Ã¥r gammel'
	},

	// Korean - Contributed by ë°•ìƒë¹ˆ (20100823)
	ko : {
		'_language' : 'Korean',
		'AddToCalendar' : 'ë‹¬ë ¥ì— ì¶”ê°€',
		'AddToGoogleCalendar' : 'êµ¬ê¸€ ìº˜ë¦°ë”ì— ì¶”ê°€',
		'all' : 'ì „ì²´',
		'All' : 'ëª¨ë“  ì‚¬ì§„',
		'AllPhotosLoaded' : 'ëª¨ë“  ì‚¬ì§„ì„ ë¡œë“œí–ˆìŠµë‹ˆë‹¤',
		'Automatic' : 'ìžë™',
		'Birthday' : '%s\ì˜ ìƒì¼',
		'BookmarkAdd' : 'ì¦ê²¨ì°¾ê¸°ì— ì¶”ê°€',
		'BookmarkExists' : 'ì´ íŽ˜ì´ì§€ëŠ” ì´ë¯¸ ì¦ê²¨ì°¾ê¸° ë˜ì–´ ìžˆìŠµë‹ˆë‹¤.\n\nì¦ê²¨ì°¾ê¸° í•˜ì‹¤ íŽ˜ì´ì§€ë¡œ ê°€ì„œ ë‹¤ì‹œ ì‹œë„í•˜ì„¸ìš”.',
		'BookmarkNamePrompt' : 'ì¦ê²¨ì°¾ê¸° ì´ë¦„:\n%s',
		'BookmarksConfirmRemoval' : 'ë‹¤ìŒì˜ ì¦ê²¨ì°¾ê¸°ë¥¼ ì •ë§ë¡œ ì§€ìš°ì‹œê² ìŠµë‹ˆê¹Œ?',
		'BookmarksManage' : 'ì¦ê²¨ì°¾ê¸° ê´€ë¦¬',
		'BookmarksRemoveSelected' : 'ì„ íƒí•œ ì¦ê²¨ì°¾ê¸° ì‚­ì œ',
		'Bookmarks' : 'ì¦ê²¨ì°¾ê¸°',
		'BrowserUnsupported' : 'ì´ ê¸°ëŠ¥ì€ í˜„ìž¬ ë¸Œë¼ìš°ì €ì—ì„œëŠ” ìž‘ë™í•˜ì§€ ì•ŠìŠµë‹ˆë‹¤.',
		'CreatingFile' : 'íŒŒì¼ ë§Œë“œëŠ” ì¤‘',
		'Close' : 'ë‹«ê¸°',
		'ConfigureFacebook-foREVer-' : '-foREVer- Script ì„¤ì •',
		'ConfigureInstructions' : 'ë³€ê²½ì‚¬í•­ì€ ì„ íƒì¦‰ì‹œ ì ìš©ë©ë‹ˆë‹¤. ë‹¤ë¥¸ ì—´ë ¤ìžˆëŠ” íƒ­ì—ëŠ” ë°”ë¡œ ì ìš©ë˜ì§€ ì•Šì„ ìˆ˜ ìžˆìŠµë‹ˆë‹¤.',
		'ConfAge' : 'ì¹œêµ¬ì˜ í”„ë¡œí•„ì— ì¹œêµ¬ì˜ ë‚˜ì´ í‘œì‹œ (ìƒë…„ì›”ì¼ì„ ê³µê°œí•œ ê²½ìš°).',
		'ConfAlbumComments' : 'ì‚¬ì§„ì²© íŽ˜ì´ì§€ì— "ì‚¬ì§„ì²©ì— ë‹¬ë¦° ëŒ“ê¸€ ëª¨ë‘ë³´ê¸°" ë§í¬ ë”í•˜ê¸°.',
		'ConfApplicationWhitelist' : 'í—ˆìš©ëœ ì–´í”Œë¦¬ì¼€ì´ì…˜ - ìˆ¨ê¸°ì§€ ì•Šì„ ì–´í”Œë¦¬ì¼€ì´ì…˜ì˜ IDë¥¼ ìž…ë ¥í•˜ì„¸ìš”. ID ì‚¬ì´ëŠ” ìŠ¤íŽ˜ì´ìŠ¤ë¡œ ë‚˜ëˆ”.',
		'ConfAutoBigAlbumPictures' : 'ì‚¬ì§„ íŽ˜ì´ì§€ì— í° ì‚¬ì§„ì²© ì‚¬ì§„ì„ ë³´ì´ê¸°.',
		'ConfAutoLoadFullAlbum' : 'ì‚¬ì§„ì²© íŽ˜ì´ì§€ì— ëª¨ë“  ì‚¬ì§„ì„ í•œë²ˆì— ë³´ì´ê¸°.',
		'ConfAutoLoadTaggedPhotos' : 'ì‚¬ì§„ íŽ˜ì´ì§€ì— íƒœê·¸ë‹¬ë¦° ëª¨ë“  ì‚¬ì§„ì„ ë³´ì´ê¸°.',
		'ConfAutoReadMore' : '"ì§€ë‚œ ê²Œì‹œë¬¼" ë§í¬ë¥¼ ìžë™ìœ¼ë¡œ ëˆ„ë¥´ê¸°.',
		'ConfBigAlbumPictures' : 'ì‚¬ì§„ì²© íŽ˜ì´ì§€ì— "í° ì‚¬ì§„ ë³´ê¸°" ë§í¬ ë”í•˜ê¸°.',
		'ConfBookmarks' : 'ë§¨ ìœ„ ë©”ë‰´ í‘œì‹œì¤„ì— ì¦ê²¨ì°¾ê¸° ë©”ë‰´ë¥¼ ë”í•˜ê¸°.',
		'ConfBottomBarHoverOpacity' : 'ë§ˆìš°ìŠ¤ ì»¤ì„œë¥¼ ì˜¬ë ¤ë†¨ì„ë•Œ',
		'ConfBottomBarOpacity' : 'ì•„ëž˜ í‘œì‹œì¤„ì˜ íˆ¬ëª…ë„',
		'ConfCalendarBirthDate' : 'ì´ë²¤íŠ¸ì˜ ì¶”ê°€ì •ë³´ì— ì¹œêµ¬ì˜ ìƒì¼ ë³´ì´ê¸°.',
		'ConfCalendarFullName' : 'ìƒì¼ì„ í‘œì‹œí• ë•Œ ì„±ê³¼ ì´ë¦„ì„ ëª¨ë‘ í‘œì‹œí•˜ê¸° (ê¸°ë³¸ì€ ì„±ì„ í‘œì‹œí•˜ì§€ ì•ŠìŒ).',
		'ConfChatDifferentiate' : 'ìžë¦¬ë¹„ì›€ ìƒíƒœì¸ ì¹œêµ¬ì™€ ì˜¨ë¼ì¸ ìƒíƒœì¸ ì¹œêµ¬ë¥¼ ì´íƒ¤ë¦­ì²´ì™€ êµµì€ ê¸€ì”¨ë¡œ êµ¬ë¶„í•˜ê¸°.',
		'ConfChatHideIdle' : 'ìžë¦¬ë¹„ì›€ ìƒíƒœì˜ ì¹œêµ¬ëŠ” ìˆ¨ê¸°ê¸°.',
		'ConfDelayPopupPics' : 'ì¡°ê¸ˆ ê¸°ë‹¤ë ¸ë‹¤ê°€ íŒì—… ì‚¬ì§„ ë³´ì´ê¸°.',
		'ConfDelayPopupPicsTimeout' : 'íŒì—… ì‚¬ì§„ì„ ë³´ì´ê¸° ì „ê¹Œì§€ì˜ ëŒ€ê¸° ì‹œê°„, 1/1000ì´ˆ ë‹¨ìœ„ (ê¸°ë³¸ì€ 500):',
		'ConfDownloadVideo' : 'ë¹„ë””ì˜¤ íŽ˜ì´ì§€ì— ë‹¤ìš´ë¡œë“œ ë§í¬ ë”í•˜ê¸°. (<a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV í”Œë ˆì´ì–´</a>ê°€ í•„ìš”í• ìˆ˜ë„ ìžˆìŠµë‹ˆë‹¤)',
		'ConfErrorPageReload' : 'ì–´í”Œë¦¬ì¼€ì´ì…˜ ì˜¤ë¥˜ íŽ˜ì´ì§€ë¥¼ 5ì´ˆ í›„ì— ìžë™ìœ¼ë¡œ ìƒˆë¡œê³ ì¹¨.',
		'ConfExport' : 'ì„¤ì •ì‚¬í•­ì„ ë‚´ë³´ë‚´ê³  ì‹¶ìœ¼ì‹œë©´ ì•„ëž˜ì˜ í…ìŠ¤íŠ¸ë¥¼ ë³µì‚¬í•´ì„œ íŒŒì¼ì— ì €ìž¥í•˜ì‹­ì‹œì˜¤.',
		'ConfExternalPopup' : 'ë§ˆìš°ìŠ¤ ì»¤ì„œë¥¼ ì™¸ë¶€ ì‚¬ì§„ì— ì˜¬ë¦¬ë©´ ì„ í° íŒì—… ì‚¬ì§„ì„ ë³´ì´ê¸°. <sup>ë² íƒ€</sup>',
		'ConfFacebook-foREVer-Language' : '-foREVer- Scriptì— ì‚¬ìš©í•  ì–¸ì–´',
		'ConfFacebookTimestamps' : 'Facebook í˜•ì‹ì˜ íƒ€ìž„ìŠ¤íƒ¬í”„ ë³´ì´ê¸° (ì˜ˆ. "ì•½ 3ì‹œê°„ ì „").',
		'ConfFBFTimestamps' : '-foREVer- Script í˜•ì‹ì˜ íƒ€ìž„ìŠ¤íƒ¬í”„ë¥¼ Facebook íƒ€ìž„ìŠ¤íƒ¬í”„ ë’¤ì— ë³´ì´ê¸° (ì˜ˆ. "11:45").',
		'ConfFBFTimestamps24' : '-foREVer- Script íƒ€ìž„ìŠ¤íƒ¬í”„ë¥¼ 24ì‹œê°„ í˜•ì‹ìœ¼ë¡œ ë³´ì´ê¸°.',
		'ConfFriendRequestCountInTitle' : 'íŽ˜ì´ì§€ ì œëª©ì— ì¹œêµ¬ ìš”ì²­ ê°¯ìˆ˜ ë³´ì´ê¸°.',
		'ConfGoogleApps' : 'êµ¬ê¸€ Appsì™€ í˜¸í™˜ë˜ëŠ” êµ¬ê¸€ ìº˜ë¦°ë” ë§í¬ ë§Œë“¤ê¸°.',
		'ConfGoogleAppsDomain' : 'ë„ë©”ì¸',
		'ConfGoogleCalendar' : 'ìƒì¼ê³¼ ì´ë²¤íŠ¸ë¥¼ <a href="http://www.google.com/support/calendar/bin/topic.py?hl=kr&topic=13732" target="_blank">êµ¬ê¸€ ìº˜ë¦°ë”</a>ì— ì¶”ê°€í•˜ëŠ” ë§í¬ ë”í•˜ê¸°.',
		'ConfGoogleLanguage' : '<a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">êµ¬ê¸€ ë²ˆì—­</a>ì— ì‚¬ìš©í•  ì–¸ì–´',
		'ConfHideApplicationStories' : 'ì–´í”Œë¦¬ì¼€ì´ì…˜ ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHideEventStories' : 'ì´ë²¤íŠ¸ ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHideFacebookCountInTitle' : 'Facebookì˜ ìª½ì§€ ê°¯ìˆ˜ ìˆ¨ê¸°ê¸°.',
		'ConfHideFriendStories' : 'ì¹œêµ¬ë“¤ì˜ ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHideGroupStories' : 'ê·¸ë£¹ ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHideLikeStories' : '"ì¢‹ì•„ìš”" ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHideLinkStories' : 'ë§í¬ ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHideNoteStories' : 'ë…¸íŠ¸ ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHidePhotoStories' : 'ì‚¬ì§„ ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHideProfilePicStories' : 'í”„ë¡œí•„ ì‚¬ì§„ ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHideRead' : 'ìµœì‹ ê¸€ ëª©ë¡ì—ì„œ ì½ì€ ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHideRelationshipStories' : 'ê²°í˜¼/ì—°ì•  ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHideStatusStories' : '"ë‚´ ìƒíƒœ" ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHideVideoStories' : 'ë¹„ë””ì˜¤ ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHideWallStories' : 'ë‹´ë²¼ë½ ê²Œì‹œë¬¼ ìˆ¨ê¸°ê¸°.',
		'ConfHomeBeta' : 'Facebook Sneak Peek ë³´ì´ê¸°.',
		'ConfHomeChat' : 'ì±„íŒ… ë³´ì´ê¸°.',
		'ConfHomeEvents' : 'ì´ë²¤íŠ¸ ë³´ì´ê¸°.',
		'ConfHomeFindFriends' : 'ì—°ê²°í•˜ê¸° ë³´ì´ê¸°.',
		'ConfHomeLeftAlign' : 'ì²« íŽ˜ì´ì§€ë¥¼ ì™¼ìª½ìœ¼ë¡œ ì •ë ¬.',
		'ConfHomeLeftColumn' : 'ì™¼ìª½ ë©”ë‰´ ë³´ì´ê¸°.',
		'ConfHomeLeftColumnFixed' : 'ì•„ëž˜ë¡œ ìŠ¤í¬ë¡¤ í•œ í›„ì—ë„ ì™¼ìª½ ë©”ë‰´ ë³´ì´ê¸°.',
		'ConfHomeLink' : 'ë§¨ ìœ„ ë©”ë‰´ í‘œì‹œì¤„ì— "ì²« íŽ˜ì´ì§€" ë§í¬ ë³´ì´ê¸°.',
		'ConfHomeNavigation' : 'ë„¤ë¹„ê²Œì´ì…˜ ë©”ë‰´ ë³´ì´ê¸°.',
		'ConfHomePokes' : 'Pokes ë³´ì´ê¸°.',
		'ConfHomeProfile' : 'í”„ë¡œí•„ ë³´ì´ê¸°.',
		'ConfHomeRecommendations' : 'ì¶”ì²œ ë³´ì´ê¸°.',
		'ConfHomeRequests' : 'ìš”ì²­ ë³´ì´ê¸°.',
		'ConfHomeRightColumn' : 'ì˜¤ë¥¸ìª½ ë©”ë‰´ ë³´ì´ê¸°.',
		'ConfHomeStretch' : 'ë¸Œë¼ìš°ì €ì˜ ê°€ë¡œ í¬ê²Œì— ë§žê²Œ ì²« íŽ˜ì´ì§€ ë‚´ìš©ì„ ëŠ˜ì´ê¸° .',
		'ConfHomeStretchComments' : 'ë¸Œë¼ìš°ì €ì˜ ê°€ë¡œ í¬ê¸°ì— ë§žê²Œ ëŒ“ê¸€ì„ ëŠ˜ì´ê¸°.',
		'ConfiCalendar' : 'ëª¨ë“  ìƒì¼ì„ <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> íŒŒì¼ë¡œ ë°›ëŠ” ë§í¬ ë”í•˜ê¸°.',
		'ConfImport' : 'ì„¤ì •ì‚¬í•­ì„ ê°€ì ¸ì˜¤ê³  ì‹¶ìœ¼ì‹œë©´ ì €ìž¥í•œ í…ìŠ¤íŠ¸ë¥¼ ì•„ëž˜ì— ë¶™ì¸ í›„ "ê°€ì ¸ì˜¤ê¸°"ë¥¼ ëˆ„ë¥´ì‹­ì‹œì˜¤.',
		'ConfInboxCountInTitle' : 'íŽ˜ì´ì§€ ì œëª©ì— ìƒˆ ìª½ì§€ ê°¯ìˆ˜ ë³´ì´ê¸°.',
		'ConfLogoutLink' : 'ë§¨ ìœ„ ë©”ë‰´ í‘œì‹œì¤„ì— ë¡œê·¸ì•„ì›ƒ ë§í¬ ë”í•˜ê¸°.',
		'ConfNotificationCountInTitle' : 'íŽ˜ì´ì§€ ì œëª©ì— ìƒˆ ì•Œë¦¼ ê°¯ìˆ˜ ë³´ì´ê¸°.',
		'ConfNewTabSearch' : 'ê²€ìƒ‰ì°½ì—ì„œ CTRL+ì—”í„° í‚¤ë¥¼ ëˆ„ë¥´ë©´ ìƒˆ íƒ­/ì°½ì— ê²€ìƒ‰ê²°ê³¼ë¥¼ ë³´ì´ê¸°.',
		'ConfPageTitle' : '"Facebook |"ì„ íŽ˜ì´ì§€ ì œëª©ì—ì„œ ì—†ì• ê¸°.',
		'ConfPhotoPopup' : 'ë§ˆìš°ìŠ¤ ì»¤ì„œë¥¼ í”„ë¡œí•„ ì‚¬ì§„ì— ì˜¬ë¦¬ë©´ í° íŒì—… ì‚¬ì§„ì„ ë³´ì´ê¸°.',
		'ConfPopupAutoClose' : 'ìžë™ìœ¼ë¡œ íŒì—… ì‚¬ì§„ ë‹«ê¸°.',
		'ConfPopupSmartAutoClose' : 'ë§ˆìš°ìŠ¤ ì»¤ì„œë¥¼ ì˜¬ë¦¬ê³  ìžˆìœ¼ë©´ íŒì—…ì‚¬ì§„ì„ ìžë™ìœ¼ë¡œ ë‹«ì§€ ì•Šê¸°.',
		'ConfPopupPosition' : 'íŒì—… ì‚¬ì§„ ìœ„ì¹˜',
		'ConfProcessInterval' : 'íŽ˜ì´ì§€ë¥¼ ì²˜ë¦¬í•˜ëŠ” ê°„ê²©, 1/1000ì´ˆ ë‹¨ìœ„ (ê¸°ë³¸ì€ 1000):',
		'ConfProfileLink' : 'ë§¨ ìœ„ ë©”ë‰´ í‘œì‹œì¤„ì— í”„ë¡œí•„ ë§í¬ ë³´ì´ê¸°.',
		'ConfProfilePicPopup' : 'ë§ˆìš°ìŠ¤ ì»¤ì„œë¥¼ ì‚¬ì§„ì— ì˜¬ë¦¬ë©´ í° íŒì—… ì‚¬ì§„ì„ ë³´ì´ê¸°.',
		'ConfProtocolLinks' : 'í”„ë¡œí•„ì— ìžˆëŠ” ë©”ì‹ ì € ID(êµ¬ê¸€í† í¬, ìœˆë„ìš° ë¼ì´ë¸Œ ë©”ì‹ ì €, ë“±)ë¥¼ ë©”ì‹ ì €ë¥¼ í†µí•´ ëŒ€í™”ë¥¼ ì‹œìž‘í•˜ëŠ” ë§í¬ë¡œ ë³€í™˜í•˜ê¸°.',
		'ConfSectionAbout' : '-foREVer- ScriptëŠ”...',
		'ConfSectionAdvanced' : 'ê³ ê¸‰',
		'ConfSectionEvents' : 'ìƒì¼/ì´ë²¤íŠ¸',
		'ConfSectionImportExport' : 'ê°€ì ¸ì˜¤ê¸°/ë‚´ë³´ë‚´ê¸°',
		'ConfSectionFeeds' : 'ê²Œì‹œë¬¼',
		'ConfSectionHomePage' : 'ì²« íŽ˜ì´ì§€',
		'ConfSectionLiveFeed' : 'ìµœì‹ ê¸€',
		'ConfSectionMenu' : 'ë©”ë‰´/ì±„íŒ…',
		'ConfSectionOther' : 'ê·¸ ì™¸ ì„¤ì •',
		'ConfSectionPageTitle' : 'íŽ˜ì´ì§€ ì œëª©',
		'ConfSectionPictures' : 'ì‚¬ì§„',
		'ConfSectionShortcuts' : 'í‚¤ë³´ë“œ ë‹¨ì¶•í‚¤',
		'ConfSecureLinks' : 'í•­ìƒ HTTPSë¥¼ í†µí•´ Facebookì„ ì‚¬ìš©í•˜ê¸°.',
		'ConfShortcutList' : '<b>í‚¤ë³´ë“œ ë‹¨ì¶•í‚¤</b> (ëŒ€ì†Œë¬¸ìž êµ¬ë¶„):<br /><br /><i>ëª¨ë“  íŽ˜ì´ì§€ì—ì„œ ìž‘ë™</i>:<br />&nbsp;<b>A</b> - ì‚¬ì§„ì²©/ì‚¬ì§„<br />&nbsp;<b>B</b> - ì ‘ì†ëœ ì¹œêµ¬ ë³´ì´ê¸°/ìˆ¨ê¸°ê¸°<br />&nbsp;<b>C</b> - -foREVer- Script ì„¤ì •<br />&nbsp;<b>D</b> - ìƒì¼<br />&nbsp;<b>E</b> - ì´ë²¤íŠ¸<br />&nbsp;<b>F</b> - ì¹œêµ¬<br />&nbsp;<b>H</b> - ì²« íŽ˜ì´ì§€<br />&nbsp;<b>I</b> - ìª½ì§€<br />&nbsp;<b>K</b> - ì¦ê²¨ì°¾ê¸° ë”í•˜ê¸°<br />&nbsp;<b>L</b> - ë¡œê·¸ì•„ì›ƒ ë§í¬ë¥¼ ì„ íƒ (ê·¸ë‹¤ìŒ ì—”í„°í‚¤ë¥¼ ëˆ„ë¥´ë©´ ë¡œê·¸ì•„ì›ƒ)<br />&nbsp;<b>N</b> - ì•Œë¦¼<br />&nbsp;<b>P</b> - ë‚´ í”„ë¡œí•„<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - ê²€ìƒ‰ í•„ë“œë¡œ ì»¤ì„œ ì´ë™<br />&nbsp;<b>T</b> - ì„ íƒí•œ í…ìŠ¤íŠ¸ë¥¼ ë²ˆì—­<br />&nbsp;<b>?</b> - -foREVer- Script ë””ë²„ê·¸ ì •ë³´ ë³´ê¸°<br />&nbsp;<b>&lt;ESC&gt;</b> - -foREVer- Script íŒì—… ì‚¬ì§„ ë‹«ê¸°<br /><br /><i>í™ˆíŽ˜ì´ì§€ì—ì„œ ìž‘ë™(í•„í„°)</i>:<br />&nbsp;<b>a</b> - íŽ˜ì´ì§€<br />&nbsp;<b>f</b> - ìµœì‹ ê¸€<br />&nbsp;<b>g</b> - ê·¸ë£¹<br />&nbsp;<b>l</b> -ë§í¬<br />&nbsp;<b>n</b> - ë‰´ìŠ¤ í”¼ë“œ<br />&nbsp;<b>p</b> - ì‚¬ì§„<br />&nbsp;<b>s</b> ë˜ëŠ” <b>u</b> - ìƒíƒœ ì—…ë°ì´íŠ¸<br />&nbsp;<b>t</b> - ë…¸íŠ¸<br />&nbsp;<b>v</b> - ë¹„ë””ì˜¤<br /><br /><i>í”„ë¡œí•„ íŽ˜ì´ì§€ì—ì„œ ìž‘ë™</i>:<br />&nbsp;<b>i</b> - ì •ë³´<br />&nbsp;<b>p</b> - ì‚¬ì§„<br />&nbsp;<b>w</b> - ë‹´ë²¼ë½<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>ì´ë™ì´ ê°€ëŠ¥í•œ íŽ˜ì´ì§€ì—ì„œ ìž‘ë™(ì´ì „, ë‹¤ìŒ, ë“±)</i>:<br />&nbsp;<b>&lt;â†&gt;</b> - ì´ì „<br />&nbsp;<b>&lt;â†’&gt;</b> - ë‹¤ìŒ<br />&nbsp;<b>&lt;Shift&gt; + &lt;â†&gt;</b> - ì²˜ìŒ (ê°€ëŠ¥í• ë•Œë§Œ)<br />&nbsp;<b>&lt;Shift&gt; + &lt;â†’&gt;</b> - ë§ˆì§€ë§‰ (ê°€ëŠ¥í• ë•Œë§Œ)<br /><br /><i>ì‚¬ì§„ì²©/ì‚¬ì§„ì„ ë³¼ë•Œ ìž‘ë™</i>:<br />&nbsp;<b>a</b> - ëª¨ë“  ì¸ë„¤ì¼ ë³´ê¸° (ê°€ëŠ¥í• ë•Œë§Œ)<br />&nbsp;<b>b</b> - í° ì‚¬ì§„ ë³´ì´ê¸°<br />&nbsp;<b>c</b> - ëŒ“ê¸€ ë³´ê¸°<br />&nbsp;<b>k</b> - ì‚¬ì§„ì²©ìœ¼ë¡œ ëŒì•„ê°€ê¸°<br />&nbsp;<b>m</b> - ë‚´ê°€(ë˜ëŠ” ì¹œêµ¬ê°€) ë‚˜ì˜¨ ì‚¬ì§„<br /><br /><i>ìµœê·¼ ì‚¬ì§„ì²©ì´ë‚˜ ì—…ë¡œë“œ/íƒœê·¸ëœ ì‚¬ì§„ì„ ë³¼ë•Œ ìž‘ë™:</i><br />&nbsp;<b>a</b> ë˜ëŠ” &nbsp;<b>r</b> - ìµœê·¼ ì‚¬ì§„ì²©<br />&nbsp;<b>m</b> ë˜ëŠ” <b>u</b> - ëª¨ë°”ì¼ ì—…ë¡œë“œ<br />&nbsp;<b>o</b> - ë‚´ê°€ ë‚˜ì˜¨ ì‚¬ì§„<br />&nbsp;<b>p</b> -ë‚´ ì‚¬ì§„<br />&nbsp;<b>t</b> ë˜ëŠ” <b>f</b> - íƒœê·¸ ëœ ì¹œêµ¬ë“¤',
		'ConfShortcuts' : 'í‚¤ë³´ë“œ ë‹¨ì¶•í‚¤ ì‚¬ìš©.',
		'ConfSign' : 'ì¹œêµ¬ì˜ í”„ë¡œí•„ì— ì¹œêµ¬ì˜ ë³„ìžë¦¬ í‘œì‹œ (ìƒë…„ì›”ì¼ì„ ê³µê°œí•œ ê²½ìš°).',
		'ConfTopBarFixed' : 'ë§¨ ìœ„ ë©”ë‰´ í‘œì‹œì¤„ì„ ì•„ëž˜ë¡œ ìŠ¤í¬ë¡¤ í•œ í›„ì—ë„ ë³´ì´ê¸°.',
		'ConfTopBarHoverOpacity' : 'ë§ˆìš°ìŠ¤ ì»¤ì„œë¥¼ ì˜¬ë ¤ë†¨ì„ë•Œ',
		'ConfTopBarOpacity' : 'ë§¨ ìœ„ ë©”ë‰´ í‘œì‹œì¤„ì˜ íˆ¬ëª…ë„',
		'ConfUpdates' : 'ë§¤ì¼ Userscripts.orgì—ì„œ -foREVer- Script ì—…ë°ì´íŠ¸ë¥¼ í™•ì¸í•˜ê¸°. <a href="#" id="fbfUpdateLink" onclick="return false;">ì§€ê¸ˆ í™•ì¸</a>.',
		'DownloadVideo' : 'ë¹„ë””ì˜¤ ë‹¤ìš´ë¡œë“œ',
		'ExportICalendarFile' : 'iCalender íŒŒì¼ë¡œ ê°€ì ¸ì˜¤ê¸°',
		'ExportICalendarFileWarning' : '(ì¹œêµ¬ê°€ ë§Žìœ¼ë©´ ì˜¤ëž˜ ê±¸ë¦´ ìˆ˜ ìžˆìŠµë‹ˆë‹¤)',
		'Facebook-foREVer-Conflict' : 'Facebook -foREVer-ì˜ ì´ë¦„ì´ -foREVer- Scriptë¡œ ë°”ë€Œì—ˆìŠµë‹ˆë‹¤.<br /><br />Facebook -foREVer-ì„ ë¸Œë¼ìš°ì €ì—ì„œ ì œê±°í•˜ì§€ ì•Šìœ¼ë©´ ì´ë¦„ ë³€ê²½ ë•Œë¬¸ì— ì¶©ëŒì´ ì¼ì–´ë‚©ë‹ˆë‹¤.<br /><br />userscriptë¥¼ ì œê±°í•˜ëŠ” ë°©ë²•ì„ ëª¨ë¥´ê² ìœ¼ë©´ <a %s>ì—¬ê¸°ë¥¼ ì°¸ì¡°í•˜ì„¸ìš”</a>.',
		'fullAlbumLoaded' : 'ì•¨ë²” ì „ì²´ê°€ ë¡œë”©ë¨',
		'Import' : 'ê°€ì ¸ì˜¤ê¸°',
		'ImportConfirm' : 'ì •ë§ë¡œ ì„¤ì •ì„ ê°€ì ¸ì˜¤ì‹œê² ìŠµë‹ˆê¹Œ?\ní˜„ìž¬ ì„¤ì •ì€ ì‚­ì œë©ë‹ˆë‹¤.',
		'ImportFailure' : 'ì„¤ì •ì„ ê°€ì ¸ì˜¤ëŠ” ë„ì¤‘ ì—ëŸ¬ê°€ ë‚¬ìŠµë‹ˆë‹¤.',
		'ImportSuccess' : 'ì„±ê³µì ìœ¼ë¡œ ì„¤ì •ì„ ê°€ì ¸ì™”ìŠµë‹ˆë‹¤. ìƒˆë¡œê³ ì¹¨ í•˜ì‹œê² ìŠµë‹ˆê¹Œ?',
		'Left' : 'ì™¼ìª½',
		'LoadingAllPhotos' : 'ëª¨ë“  ì‚¬ì§„ì„ ë¡œë”©ì¤‘...',
		'loadingFullAlbum' : 'ì•¨ë²” ì „ì²´ë¥¼ ë¡œë”©ì¤‘...',
		'LoadingPic' : 'ì‚¬ì§„ ë¡œë”©ì¤‘...',
		'LoadPhotosWarning' : 'ëª¨ë“  ì‚¬ì§„ì„ ë¡œë”©í•˜ëŠ”ë° ì‹œê°„ì´ ì˜¤ëž˜ ê±¸ë¦´ ìˆ˜ ìžˆìŠµë‹ˆë‹¤',
		'Months' : new Array('1ì›”','2ì›”','3ì›”','4ì›”','5ì›”','6ì›”','7ì›”','8ì›”','9ì›”','10ì›”','11ì›”','12ì›”'),
		'ProtocolSkype' : 'Skypeë¡œ %sì™€ ì „í™”í•˜ê¸°',
		'ProtocolMSN' : 'Windows Liveë¡œ %sì™€ ì±„íŒ…í•˜ê¸°',
		'ProtocolYahoo' : 'ì•¼í›„ ë©”ì‹ ì €ë¡œ %sì™€ ì±„íŒ…í•˜ê¸°',
		'ProtocolGoogle' : 'êµ¬ê¸€ í† í¬ë¡œ  %sì™€ ì±„íŒ…í•˜ê¸°',
		'ReloadErrorPage' : 'ìž¬ì‹œë„ í•˜ë ¤ë©´ í´ë¦­í•˜ê±°ë‚˜ 5ì´ˆë¥¼ ê¸°ë‹¤ë¦¬ì„¸ìš”',
		'Refresh' : 'ìƒˆë¡œê³ ì¹¨',
		'Remove' : 'ì œê±°',
		'Right' : 'ì˜¤ë¥¸ìª½',
		'ShowBigPictures' : 'í° ì‚¬ì§„ ë³´ê¸°',
		'Signs' : new Array('ì—¼ì†Œìžë¦¬','ë¬¼ë³‘ìžë¦¬','ë¬¼ê³ ê¸°ìžë¦¬','ì–‘ìžë¦¬','í™©ì†Œìžë¦¬','ìŒë‘¥ì´ìžë¦¬','ê²Œìžë¦¬','ì‚¬ìžìžë¦¬','ì²˜ë…€ìžë¦¬','ì²œì¹­ìžë¦¬','ì „ê°ˆìžë¦¬','ê¶ìˆ˜ìžë¦¬'),
		'today' : 'ì˜¤ëŠ˜',
		'Translators' : 'ë²ˆì—­í•œ ì‚¬ëžŒ',
		'UpdateAvailable1' : '-foREVer- Script ì—…ë°ì´íŠ¸ê°€ ë‚˜ì™”ìŠµë‹ˆë‹¤',
		'UpdateAvailable2' : 'ì§€ê¸ˆ ì—…ë°ì´íŠ¸ í• ê¹Œìš”?',
		'UpdateHomepage' : 'í™ˆíŽ˜ì´ì§€ë¡œ ê°€ê¸°',
		'UpdateInstall' : 'ì§€ê¸ˆ ì¸ìŠ¤í†¨ í•˜ê¸°',
		'UpdateTomorrow' : 'ë‚´ì¼ ë‹¤ì‹œ í™•ì¸',
		'ViewAlbumComments' : 'ì‚¬ì§„ì²©ì— ë‹¬ë¦° ëŒ“ê¸€ ëª¨ë‘ë³´ê¸°',
		'yearsOld' : '%sì‚´'
	},
	
	// Vietnamese - Contributed by Tráº§n Äá»©c Thá»‹nh (20100104)
	vi : {
		'_language' : 'Tiáº¿ng Viá»‡t',
		'AddToCalendar' : 'ThÃªm vÃ o lá»‹ch',
		'AddToGoogleCalendar' : 'ThÃªm vÃ o lá»‹ch cá»§a Google',
		'all' : 'táº¥t cáº£',
		'All' : 'Táº¥t cáº£',
		'AllPhotosLoaded' : 'Táº£i táº¥t cáº£ cÃ¡c bá»©c áº£nh',
		'Automatic' : 'Tá»± Ä‘á»™ng',
		'Birthday' : 'sinh nháº­t cá»§a %s',
		'BookmarkAdd' : 'ThÃªm Bookmark má»›i',
		'BookmarkExists' : 'Trang nÃ y Ä‘Ã£ Ä‘Æ°á»£c Ä‘Ã¡nh dáº¥u.\n\nTruy cáº­p vÃ o trang báº¡n muá»‘n Ä‘Ã¡nh dáº¥u vÃ  thá»­ láº¡i.',
		'BookmarkNamePrompt' : 'Äáº·t tÃªn cho trang Ä‘Ã¡nh dáº¥u nÃ y:\n%s',
		'BookmarksConfirmRemoval' : 'Báº¡n muá»‘n xÃ³a cÃ¡c bookmark Ä‘Ã£ chá»n?',
		'BookmarksManage' : 'Quáº£n lÃ½ Bookmarks',
		'BookmarksRemoveSelected' : 'XÃ³a cÃ¡c Bookmarks Ä‘Ã£ chá»n',
		'Bookmarks' : 'Bookmarks',
		'BrowserUnsupported' : 'TrÃ¬nh duyá»‡t cá»§a báº¡n khÃ´ng há»— trá»£ tÃ­nh nÄƒng nÃ y.',
		'CreatingFile' : 'Táº¡o táº­p tin',
		'Close' : 'ÄÃ³ng',
		'ConfigureFacebook-foREVer-' : 'CÃ i Ä‘áº·t -foREVer- Script',
		'ConfigureInstructions' : 'Má»i thiáº¿t láº­p sáº½ Ä‘Æ°á»£c lÆ°u ngay láº­p tá»©c, nhÆ°ng má»™t sá»‘ thay Ä‘á»•i khÃ´ng cÃ³ tÃ¡c dá»¥ng trong cÃ¡c tháº» Ä‘ang má»Ÿ.',
		'ConfAge' : 'Hiá»ƒn thá»‹ tuá»•i cá»§a má»™t ngÆ°á»i trong thÃ´ng tin cá»§a há» (náº¿u há» cung cáº¥p ngÃ y sinh Ä‘áº§y Ä‘á»§).',
		'ConfAlbumComments' : 'ThÃªm má»™t liÃªn káº¿t Ä‘á»ƒ hiá»ƒn thá»‹ táº¥t cáº£ cÃ¡c bÃ¬nh luáº­n vá» album á»Ÿ phÃ­a trÃªn album',
		'ConfApplicationWhitelist' : 'Danh sÃ¡ch tráº¯ng cÃ¡c á»©ng dá»¥ng - Nháº­p ID cá»§a cÃ¡c á»©ng dá»¥ng Ä‘á»ƒ nÃ³ khÃ´ng bá»‹ áº©n. CÃ¡c ID cÃ¡ch nhau bá»Ÿi khoáº£ng tráº¯ng (dáº¥u cÃ¡ch).',
		'ConfAutoBigAlbumPictures' : 'Tá»± Ä‘á»™ng hiá»ƒn thá»‹ hÃ¬nh áº£nh lá»›n hÆ¡n khi trang web má»Ÿ ra.',
		'ConfAutoLoadFullAlbum' : 'Tá»± Ä‘á»™ng táº£i thumbnails cá»§a táº¥t cáº£ hÃ¬nh áº£nh cá»§a album trong má»™t trang web.',
		'ConfAutoLoadTaggedPhotos' : 'Tá»± Ä‘á»™ng táº£i thumbnnails cho táº¥t cáº£ cÃ¡c hÃ¬nh áº£nh Ä‘Æ°á»£c tag trong má»™t trang (the photos tab on people\'s profiles).',
		'ConfAutoReadMore' : 'Tá»± Ä‘á»™ng click vÃ o liÃªn káº¿t "see more".',
		'ConfBigAlbumPictures' : 'ThÃªm liÃªn káº¿t trÃªn cÃ¡c album Ä‘á»ƒ hiá»ƒn thá»‹ cÃ¡c phiÃªn báº£n lá»›n hÆ¡n cá»§a cÃ¡c hÃ¬nh áº£nh trÃªn trang Ä‘Ã³',
		'ConfBigAlbumPicturesBorder' : 'ThÃªm viá»n xung quanh phiÃªn báº£n lá»›n hÆ¡n cá»§a hÃ¬nh áº£nh',
		'ConfBookmarks' : 'ThÃªm menu Bookmarks vÃ o thanh trÃ¬nh Ä‘Æ¡n trÃªn cÃ¹ng.',
		'ConfBottomBarHoverOpacity' : 'Khi chuá»™t á»Ÿ trÃªn',
		'ConfBottomBarOpacity' : 'Äá»™ trong suá»‘t cá»§a thanh thá»±c Ä‘Æ¡n phÃ­a dÆ°á»›i',
		'ConfCalendarBirthDate' : 'Bao gá»“m ngÃ y sinh trong nhá»¯ng chi tiáº¿t sá»± kiá»‡n.',
		'ConfCalendarFullName' : 'Sá»­ dá»¥ng tÃªn Ä‘áº§y Ä‘á»§ nhÆ° tiÃªu Ä‘á» cho ngÃ y sinh (thay vÃ¬ chá»‰ lÃ  tÃªn).',
		'ConfChatDifferentiate' : 'Sá»­ dá»¥ng chá»¯ in Ä‘áº­m vÃ  in nghiÃªng Ä‘á»ƒ phÃ¢n biá»‡t báº¡n bÃ¨ Ä‘ang online vÃ  Ä‘ang rá»—i.',
		'ConfChatHideIdle' : 'áº¨n nhá»¯ng báº¡n bÃ¨ Ä‘ang rá»—i.',
		'ConfDelayPopupPics' : 'ThÃªm má»™t khoáº£ng trá»… trÆ°á»›c khi hiá»ƒn thá»‹ hÃ¬nh áº£nh bung ra.',
		'ConfDelayPopupPicsTimeout' : 'Thá»i gian trÆ°á»›c khi hiá»ƒn thá»‹ hÃ¬nh áº£nh bung ra, trong mili giÃ¢y (máº·c Ä‘á»‹nh=500):',
		'ConfDownloadVideo' : 'ThÃªm má»™t liÃªn káº¿t Ä‘á»ƒ táº£i xuá»‘ng cÃ¡c video thá»« cÃ¡c trang video. (Báº¡n cÃ³ thá»ƒ cáº§n má»™t <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">chÆ°Æ¡ng trÃ¬nh chÆ¡i FLV</a>)',
		'ConfErrorPageReload' : 'Tá»± Ä‘á»™ng táº£i láº¡i nhá»¯ng trang á»©ng dá»¥ng lá»—i sau 5 giÃ¢y.',
		'ConfExport' : 'Äá»ƒ trÃ­ch xuáº¥t cÃ¡c thiáº¿t láº­p cá»§a báº¡n, sao chÃ©p Ä‘oáº¡n vÄƒn báº£n dÆ°á»›i Ä‘Ã¢y vÃ  lÆ°u nÃ³ trong má»™t táº­p tin.',
		'ConfExternalPopup' : 'PhiÃªn báº£n Ä‘Ãºng kÃ­ch cá»¡ cá»§a hÃ¬nh áº£nh. <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : 'NgÃ´n ngá»¯ cho -foREVer- Script',
		'ConfFacebookTimestamps' : 'Hiá»‡n má»‘c thá»i gian cá»§a facebook (vÃ­ dá»¥: "3 hours ago").',
		'ConfFBFTimestamps' : 'ThÃªm má»‘c thá»i gian cá»§a -foREVer- Script sau má»‘c thá»i gian cá»§a Facebook (vÃ­ dá»¥: "11:45").',
		'ConfFBFTimestamps24' : 'Hiá»ƒn thá»‹ má»‘c thá»i gian cá»§a -foREVer- Script dáº¡ng 24 giá».',
		'ConfFriendRequestCountInTitle' : 'Hiá»ƒn thá»‹ sá»‘ yÃªu cáº§u káº¿t báº¡n trong tiÃªu Ä‘á» cá»§a trang.',
		'ConfGoogleApps' : 'Táº¡o Google Calendar tÆ°Æ¡ng thÃ­ch vá»›i Google Apps',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'ThÃªm liÃªn káº¿t Ä‘á»ƒ thÃªm ngÃ y sinh vÃ  cÃ¡c sá»± kiá»‡n cho <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Language for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'áº¨n lá»‹ch sá»­ cá»§a cÃ¡c á»©ng dá»¥ng.',
		'ConfHideEventStories' : 'áº¨n lá»‹ch sá»­ cÃ¡c sá»± kiá»‡n.',
		'ConfHideFacebookCountInTitle' : 'áº¨n sá»‘ tin nháº¯n trong há»™p thÆ° Ä‘áº¿n cá»§a  Facebook.',
		'ConfHideFriendStories' : 'áº¨n lá»‹ch sá»­ cá»§a báº¡n bÃ¨.',
		'ConfHideGroupStories' : 'áº¨n lá»‹ch sá»­ cá»§a nhÃ³m.',
		'ConfHideLikeStories' : 'áº¨n lá»‹ch sá»­ "ThÃ­ch".',
		'ConfHideLinkStories' : 'áº¨n lá»‹ch sá»­ cá»§a liÃªn káº¿t.',
		'ConfHideNoteStories' : 'áº¨n lá»‹ch sá»­ cá»§a ghi chÃº.',
		'ConfHidePhotoStories' : 'áº¨n lá»‹ch sá»­ cá»§a hÃ¬nh áº£nh.',
		'ConfHidePlaceStories' : 'áº¨n lá»‹ch sá»­ cá»§a Ä‘á»‹a chá»‰.',
		'ConfHideProfilePicStories' : 'áº¨n lá»‹ch sá»­ cá»§a hÃ¬nh áº£nh profile.',
		'ConfHideRead' : 'áº¨n nhá»¯ng má»¥c trong feed Ä‘Ã£ Ä‘Ã¡nh dáº¥u lÃ  Ä‘Ã£ Ä‘á»c.',
		'ConfHideRelationshipStories' : 'áº¨n lá»‹ch sá»­ quan há»‡.',
		'ConfHideStatusStories' : 'áº¨n lá»‹ch sá»­ tráº¡ng thÃ¡i.',
		'ConfHideVideoStories' : 'áº¢n lá»‹ch sá»­ video.',
		'ConfHideWallStories' : 'áº¨n lá»‹ch sá»­ cá»§a tÆ°á»ng.',
		'ConfHomeBeta' : 'Hiá»ƒn thá»‹ Facebook Sneak Peek.',
		'ConfHomeChat' : 'Hiá»ƒn thá»‹ Chat.',
		'ConfHomeEvents' : 'Hiá»ƒn thá»‹ Events.',
		'ConfHomeFindFriends' : 'Hiá»ƒn thá»‹ Káº¿t Ná»‘i.',
		'ConfHomeLeftAlign' : 'CÄƒn trÃ¡i ná»™i dung cá»§a trang chá»§.',
		'ConfHomeLeftColumn' : 'Hiá»ƒn thá»‹ cá»™t bÃªn trÃ¡i.',
		'ConfHomeLeftColumnFixed' : 'Hiá»ƒn thá»‹ cá»™t bÃªn trÃ¡i, ngay cáº£ khi cuá»™n xuá»‘ng.',
		'ConfHomeLink' : 'Hiá»ƒn thá»‹ liÃªn káº¿t "Trang Chá»§" trong thanh thá»±c Ä‘Æ¡n trÃªn cÃ¹ng.',
		'ConfHomeNavigation' : 'Hiá»ƒn thá»‹ Danh Má»¥c',
		'ConfHomePokes' : 'Hiá»ƒn thá»‹ Pokes',
		'ConfHomeProfile' : 'Hiá»ƒn thá»‹ "ThÃ´ng tin".',
		'ConfHomeRecommendations' : 'Hiá»ƒn thá»‹ recommendations (People You May Know, Recommended Pages etc).',
		'ConfHomeRequests' : 'Hiá»ƒn thá»‹ Requests.',
		'ConfHomeRightColumn' : 'Hiá»ƒn thá»‹ cá»™t bÃªn pháº£i.',
		'ConfHomeStretch' : 'Hiá»ƒn thá»‹ trang chá»§ háº¿t chiá»u rá»™ng cá»§a trÃ¬nh duyá»‡t',
		'ConfHomeStretchComments' : 'KÃ©o cÄƒng nhá»¯ng bÃ¬nh luáº­n trÃªn trang chá»§',
		'ConfiCalendar' : 'ThÃªm liÃªn káº¿t Ä‘á»ƒ táº£i vá» má»™t táº­p tin <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> cÃ³ táº¥t cáº£ ngÃ y sinh.',
		'ConfImport' : 'Äá»ƒ nháº­p cÃ¡c thiáº¿t láº­p cá»§a báº¡n, ghi Ä‘Ã¨ lÃªn Ä‘oáº¡n vÄƒn báº£n dÆ°á»›i Ä‘Ã¢y báº±ng cÃ¡c Ä‘oáº¡n báº¡n Ä‘Ã£ lÆ°u trÆ°á»›c Ä‘Ã³ vÃ  kÃ­ch vÃ o nÃºt "Nháº­p VÃ o".',
		'ConfInboxCountInTitle' : 'Hiá»ƒn thá»‹ sá»‘ tin nháº¯n trong há»™p thÆ° Ä‘áº¿n trÃªn tiÃªu Ä‘á» trang.',
		'ConfLogoutLink' : 'ThÃªm má»™t liÃªn káº¿t "ÄÄƒng xuáº¥t" vÃ o thanh trÃ¬nh Ä‘Æ¡n trÃªn cÃ¹ng.',
		'ConfNotificationCountInTitle' : 'Hiá»ƒn thá»‹ sá»‘ thÃ´ng bÃ¡o má»›i trong tiÃªu Ä‘á» trang.',
		'ConfNewTabSearch' : 'Äá»ƒ káº¿t quáº£ tÃ¬m kiáº¿m má»Ÿ trong má»™t tháº»/cá»­a sá»• má»›i khi nháº¥n Ctrl + Enter khi tÃ¬m kiáº¿m',
		'ConfPageTitle' : 'XÃ³a "Facebook |" khá»i tiÃªu Ä‘á» cá»§a má»i trang.',
		'ConfPhotoPopup' : 'Bung ra báº£n lá»›n hÆ¡n cá»§a nhá»¯ng bá»©c áº£nh khi Ä‘á»ƒ chuá»™t á»Ÿ trÃªn hÃ¬nh áº£nh.',
		'ConfPopupAutoClose' : 'Tá»± Ä‘á»™ng Ä‘Ã³ng hÃ¬nh áº£nh bung ra.',
		'ConfPopupSmartAutoClose' : 'KhÃ´ng tá»± Ä‘á»™ng Ä‘Ã³ng hÃ¬nh áº£nh Ä‘Ã£ bung ra khi con chuá»™t á»Ÿ trÃªn nÃ³.',
		'ConfPopupPosition' : 'Vá»‹ trÃ­ bung hÃ¬nh áº£nh',
		'ConfProcessInterval' : 'Khoáº£ng thá»i gian Ä‘á»ƒ xá»­ lÃ½ cÃ¡c trang, tÃ­nh báº±ng mili giÃ¢y (máº·c Ä‘á»‹nh =1000):',
		'ConfProfileLink' : 'Hiá»ƒn thá»‹ liÃªn káº¿t "Trang cÃ¡ nhÃ¢n" trÃªn thanh trÃ¬nh Ä‘Æ¡n trÃªn cÃ¹ng.',
		'ConfProfilePicPopup' : 'Bung ra hÃ¬nh áº£nh cá»§a áº£nh cÃ¡ nhÃ¢n khi Ä‘á»ƒ chuá»™t á»Ÿ trÃªn áº£nh',
		'ConfProtocolLinks' : 'Turn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'ThÃ´ng tin vá» -foREVer- Script',
		'ConfSectionAdvanced' : 'Lá»±a chá»n nÃ¢ng cao',
		'ConfSectionEvents' : 'Sinh nháº­t/Sá»± Kiá»‡n',
		'ConfSectionImportExport' : 'Nháº­p VÃ o/TrÃ­ch Xuáº¥t',
		'ConfSectionFeeds' : 'Feeds',
		'ConfSectionHomePage' : 'Trang Chá»§',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menus/Chat',
		'ConfSectionOther' : 'Lá»±a chá»n khÃ¡c',
		'ConfSectionPageTitle' : 'TiÃªu Ä‘á» trang',
		'ConfSectionPictures' : 'HÃ¬nh áº£nh',
		'ConfSectionShortcuts' : 'PhÃ­m táº¯t',
		'ConfSecureLinks' : 'Báº¯t buá»™c cÃ¡c link cá»§a facebook sá»­ dá»¥ng giao thá»©c https:// .',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - TÃ¹y Chá»‰nh -foREVer- Script<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show -foREVer- Script debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by -foREVer- Script<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'KÃ­ch hoáº¡t tÃ­nh nÄƒng phÃ­m táº¯t.',
		'ConfSign' : 'Hiá»‡n chÃ²m sao cá»§a má»™t ngÆ°á»i trong thÃ´ng tin cá»§a há» (náº¿u há» cung cáº¥p Ä‘áº§y Ä‘á»§ ngÃ y sinh).',
		'ConfTopBarFixed' : 'Giá»¯ thanh thá»±c Ä‘Æ¡n luÃ´n phÃ­a trÃªn mÃ n hÃ¬nh, cáº£ khi di chuyá»ƒn xuá»‘ng.',
		'ConfTopBarHoverOpacity' : 'Khi chuá»™t á»Ÿ trÃªn',
		'ConfTopBarOpacity' : 'Äá»™ trong suá»‘t cá»§a thanh thá»±c Ä‘Æ¡n phÃ­a trÃªn',
		'ConfUpdates' : 'HÃ£y truy cáº­p vÃ o Userscripts.org hÃ ng ngÃ y Ä‘á»ƒ cáº­p nháº­t -foREVer- Script. hoáº·c <a href="#" id="fbfUpdateLink" onclick="return false;">kiá»ƒm tra ngay</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(Äiá»u nÃ y sáº½ máº¥t má»™t khoáº£ng thá»i gian náº¿u báº¡n cÃ³ ráº¥t nhiá»u báº¡n bÃ¨)',
		'Facebook-foREVer-Conflict' : 'Facebook -foREVer- nay Ä‘Æ°á»£c gá»i lÃ  -foREVer- Script.<br /><br />Bá»Ÿi vÃ¬ thay Ä‘á»•i tÃªn nÃªn báº¡n cáº§n pháº£i tá»± gá»¡ bá» Facebook -foREVer- tá»« trÃ¬nh duyá»‡t cá»§a báº¡n, hoáº·c hai ká»‹ch báº£n sáº½ xung Ä‘á»™t vá»›i nhau.<br /><br />Náº¿u báº¡n khÃ´ng biáº¿t gá»¡ bá» má»™t userscript, <a %s>báº¥m vÃ o Ä‘Ã¢y Ä‘á»ƒ Ä‘Æ°á»£c hÆ°á»›ng dáº«n</a>.',
		'fullAlbumLoaded' : 'táº£i Ä‘áº§y Ä‘á»§ album',
		'Import' : 'Nháº­p vÃ o',
		'ImportConfirm' : 'Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n nháº­p cÃ¡c thiáº¿t láº­p nÃ y?\nCÃ¡c cÃ i Ä‘áº·t hiá»‡n táº¡i cá»§a báº¡n sáº½ bá»‹ máº¥t.',
		'ImportFailure' : 'ÄÃ£ xáº£y ra lá»—i khi nháº­p cÃ¡c thiáº¿t láº­p cá»§a báº¡n.',
		'ImportSuccess' : 'QuÃ¡ trÃ¬nh nháº­p hoÃ n thÃ nh. Báº¡n cÃ³ muá»‘n táº£i láº¡i trang?',
		'Left' : 'BÃªn trÃ¡i',
		'LoadingAllPhotos' : 'Äang táº£i táº¥t cáº£ cÃ¡c áº£nh...',
		'loadingFullAlbum' : 'Äang táº£i táº¥t cáº£ album...',
		'LoadingPic' : 'Äang táº£i áº£nh...',
		'LoadPhotosWarning' : 'Táº£i táº¥t cáº£ cÃ¡c hÃ¬nh áº£nh cÃ³ thá»ƒ máº¥t má»™t thá»i gian dÃ i',
		'Months' : new Array('ThÃ¡ng 1','ThÃ¡ng 2','ThÃ¡ng 3','ThÃ¡ng 4','ThÃ¡ng 5','ThÃ¡ng 6','ThÃ¡ng 7','ThÃ¡ng 8','ThÃ¡ng 9','ThÃ¡ng 10','ThÃ¡ng 11','ThÃ¡ng 12'),
		'ProtocolSkype' : 'Gá»i cho %s báº±ng Skype',
		'ProtocolMSN' : 'Chat vá»›i %s báº±ng Windows Live',
		'ProtocolYahoo' : 'Chat vá»›i %s báº±ng Yahoo Messenger',
		'ProtocolGoogle' : 'Chat vá»›i %s báº±ng Google Talk',
		'ReloadErrorPage' : 'Click Ä‘á»ƒ thá»­ láº¡i, hoáº·c Ä‘á»£i 5 giÃ¢y',
		'Refresh' : 'LÃ m TÆ°Æ¡i',
		'Remove' : 'XÃ³a',
		'Right' : 'BÃªn pháº£i',
		'ShowBigPictures' : 'Hiá»ƒn thá»‹ hÃ¬nh áº£nh lá»›n',
		'Signs' : new Array('Ma Káº¿t','Báº£o BÃ¬nh','Song NgÆ°','DÆ°Æ¡ng CÆ°u','Kim NgÆ°u','Song Tá»­','Cá»± Giáº£i','SÆ° Tá»­','Xá»­ Ná»¯','ThiÃªn BÃ¬nh','Há»• CÃ¡p','NhÃ¢n MÃ£'),
		'today' : 'hÃ´m nay',
		'Translators' : 'Translators',
		'UpdateAvailable1' : 'ÄÃ£ cÃ³ báº£n cáº­p nháº­t má»›i cho -foREVer- Script',
		'UpdateAvailable2' : 'Báº¡n cÃ³ muá»‘n cáº­p nháº­t ngay?',
		'UpdateHomepage' : 'Äi Ä‘áº¿n trang chá»§',
		'UpdateInstall' : 'CÃ i Ä‘áº·t ngay',
		'UpdateTomorrow' : 'Nháº¯c láº¡i sau',
		'ViewAlbumComments' : 'Xem bÃ¬nh luáº­n vá» album',
		'yearsOld' : '%s tuá»•i'
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
	   'ConfigureFacebook-foREVer-' : 'Atur -foREVer- Script',
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
	   'ConfFacebook-foREVer-Language' : 'Bahasa untuk -foREVer- Script',
	   'ConfFacebookTimestamps' : 'Tampilkan cap waktu Facebook (contoh "3 jam lalu").',
	   'ConfFBFTimestamps' : 'Tambahkan cap waktu -foREVer- Script setelah cap waktu Facebook (contoh "11:45").',
	   'ConfFBFTimestamps24' : 'Tampilkan cap waktu -foREVer- Script dalam format 24 jam.',
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
	   'ConfSectionAbout' : 'Tentang -foREVer- Script',
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
	   'ConfShortcutList' : '<b>Keyboard Shortcut</b> (case sensitive):<br /><br /><i>Dari beberapa halaman:</i><br />&nbsp;<b>A</b> - Album/foto<br />&nbsp;<b>B</b> - Daftar teman (teman yang sedang online)<br />&nbsp;<b>C</b> - Pengaturan -foREVer- Script<br />&nbsp;<b>D</b> - Ulang Tahun<br />&nbsp;<b>E</b> - Acara<br />&nbsp;<b>F</b> - Teman<br />&nbsp;<b>H</b> - Halaman Beranda<br />&nbsp;<b>I</b> - Kotak Masuk<br />&nbsp;<b>K</b> - Tambahkan Bookmark<br />&nbsp;<b>L</b> - Pilih tautan keluar/logout (tekan Enter setelah itu untuk loh out)<br />&nbsp;<b>N</b> - Pemberitahuan<br />&nbsp;<b>P</b> - Profile Anda<br />&nbsp;<b>R</b> - Permintaan<br />&nbsp;<b>S</b> - Pencarian<br />&nbsp;<b>T</b> - Terjemahkan teks terpilih<br />&nbsp;<b>?</b> - Tampilkan info debug -foREVer- Script<br />&nbsp;<b>&lt;escape&gt;</b> - Tutup popp-up yang dibuat -foREVer- Script<br /><br /><i>Dari halaman beranda (filter)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - feed hidup<br />&nbsp;<b>g</b> - Group<br />&nbsp;<b>l</b> - Tautan<br />&nbsp;<b>n</b> - feed berita<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>s</b> or <b>u</b> - Status<br />&nbsp;<b>t</b> - Catatan<br />&nbsp;<b>v</b> - Video<br /><br /><i>Dari profil</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>w</b> - Dindinf<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>Dari halaman dengan pagination (previous, next, dll)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (jika tersedia)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (jika tersedia)<br /><br /><i>Ketika melihat album/foto:</i><br />&nbsp;<b>a</b> - Muat semua penuh (jika tersedia)<br />&nbsp;<b>b</b> - Tmapilkan gambar besar<br />&nbsp;<b>c</b> - Lihat komentar<br />&nbsp;<b>k</b> - Kembali ke album<br />&nbsp;<b>m</b> - Foto dari (seseorang) dan saya<br /><br /><i>Ketika melihat album sekarang dan foto yang dipload/tag:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Album sekarang<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Upload dari Hp<br />&nbsp;<b>o</b> - Foto dari saya<br />&nbsp;<b>p</b> - Foto saya<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Teman yang ditandai',
	   'ConfShortcuts' : 'Aktifkan keyboard shortcut.',
	   'ConfSign' : 'Tampilkan zodiak seseorang pada profilnya (apabila mereka menampilkan tanggal ulang tahunnya lengkap).',
	   'ConfTopBarFixed' : 'Selalu pertahankan menu bar atas pada layar, juga saat menggulung layar browser Anda.',
	   'ConfTopBarHoverOpacity' : 'Pada mouse-over',
	   'ConfTopBarOpacity' : 'Menu bar atas transparan',
	   'ConfUpdates' : 'Cek Userscripts.org setiap hari untuk update -foREVer- Script. Atau <a href="#" id="fbfUpdateLink" onclick="return false;">cek sekarang</a>.',
	   'DownloadVideo' : 'Unduh Video',
	   'ExportICalendarFile' : 'Export file iCalendar',
	   'ExportICalendarFileWarning' : '(Ini akan memakan waktu lama apabila Anda mempunyai banyak teman)',
	   'Facebook-foREVer-Conflict' : 'Facebook -foREVer- sekarang dikenal dengan nama -foREVer- Script.<br /><br />Karena pergantian nama Anda harus menguninstal Facebook -foREVer- dari browser Anda, atau dua script ini akan bertentangan satu sama lain.<br /><br />Jika Anda tidak mengetahui cara untuk menguninstal script ini, <a %s>Klick disini untuk tata caranya</a>.',
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
	   'UpdateAvailable1' : 'Update tersedia untuk -foREVer- Script',
	   'UpdateAvailable2' : 'Apakah Anda ingin mengupdate sekarang?',
	   'UpdateHomepage' : 'Pergi ke halaman beranda',
	   'UpdateInstall' : 'Instal sekarang',
	   'UpdateTomorrow' : 'Peringatkan besok',
	   'yearsOld' : '%s tahun'
	},
	
	// Japanese - Contributed by Masami HIRATA (20110306)
	ja : {
		'_language' : 'æ—¥æœ¬èªž',
		'AddToCalendar' : 'ã‚«ãƒ¬ãƒ³ãƒ€ãƒ¼ã«è¿½åŠ ',
		'AddToGoogleCalendar' : 'Googleã‚«ãƒ¬ãƒ³ãƒ€ãƒ¼ã«è¿½åŠ ',
		'all' : 'å…¨ã¦',
		'All' : 'å…¨ã¦',
		'AllPhotosLoaded' : 'å…¨ã¦ã®å†™çœŸã‚’ãƒ­ãƒ¼ãƒ‰',
		'Automatic' : 'è‡ªå‹•',
		'Birthday' : '%sã•ã‚“ã®èª•ç”Ÿæ—¥',
		'BookmarkAdd' : 'æ–°ã—ã„ãƒ–ãƒƒã‚¯ãƒžãƒ¼ã‚¯ã‚’è¿½åŠ ',
		'BookmarkExists' : 'ã“ã®ãƒšãƒ¼ã‚¸ã®ãƒ–ãƒƒã‚¯ãƒžãƒ¼ã‚¯ã¯æ—¢ã«å­˜åœ¨ã—ã¾ã™ï¼Ž\n\nãƒ–ãƒƒã‚¯ãƒžãƒ¼ã‚¯ã—ãŸã„ãƒšãƒ¼ã‚¸ã«ç§»å‹•ã—ã¦ã‚‚ã†ä¸€åº¦å®Ÿè¡Œã—ã¦ãã ã•ã„ï¼Ž',
		'BookmarkNamePrompt' : 'ã“ã®ãƒ–ãƒƒã‚¯ãƒžãƒ¼ã‚¯ã®åå‰ã‚’å…¥åŠ›ã—ã¦ãã ã•ã„:\n%s',
		'BookmarksConfirmRemoval' : 'ä»¥ä¸‹ã®ãƒ–ãƒƒã‚¯ãƒžãƒ¼ã‚¯ã‚’å‰Šé™¤ã—ã¦ã‚ˆã‚ã—ã„ã§ã™ã‹ï¼Ÿ',
		'BookmarksManage' : 'ãƒ–ãƒƒã‚¯ãƒžãƒ¼ã‚¯ã®ç®¡ç†',
		'BookmarksRemoveSelected' : 'é¸æŠžã—ãŸãƒ–ãƒƒã‚¯ãƒžãƒ¼ã‚¯ã‚’å‰Šé™¤',
		'Bookmarks' : 'ãƒ–ã‚¯ãƒž',
		'BrowserUnsupported' : 'ã“ã®æ©Ÿèƒ½ã‚’ã‚µãƒãƒ¼ãƒˆã—ã¦ã„ãªã„ãƒ–ãƒ©ã‚¦ã‚¶ã§ã™ï¼Ž',
		'CreatingFile' : 'ãƒ•ã‚¡ã‚¤ãƒ«ã‚’ä½œæˆã—ã¦ã„ã¾ã™',
		'Close' : 'é–‰ã˜ã‚‹',
		'ConfigureFacebook-foREVer-' : '-foREVer- Scriptè¨­å®š',
		'ConfigureInstructions' : 'å¤‰æ›´ã¯ã™ãã«ä¿å­˜ã•ã‚Œã¾ã™ãŒï¼Œæ—¢ã«é–‹ã‹ã‚ŒãŸã‚¿ãƒ–ã«ã¯å½±éŸ¿ã—ãªã„å ´åˆãŒã‚ã‚Šã¾ã™',
		'ConfAge' : 'ãƒ—ãƒ­ãƒ•ã‚£ãƒ¼ãƒ«ã«å¹´é½¢ã‚’è¡¨ç¤ºã™ã‚‹ï¼ˆç”Ÿå¹´æœˆæ—¥ãŒå®Œå…¨ã«æä¾›ã•ã‚Œã¦ã„ã‚‹å ´åˆï¼‰',
		'ConfApplicationWhitelist' : 'ã‚¢ãƒ—ãƒªã‚±ãƒ¼ã‚·ãƒ§ãƒ³ãƒ›ãƒ¯ã‚¤ãƒˆãƒªã‚¹ãƒˆ - è¨˜äº‹ã‚’éš ã—ãŸããªã„ã‚¢ãƒ—ãƒªã‚±ãƒ¼ã‚·ãƒ§ãƒ³ã®IDã‚’å…¥åŠ›ã—ã¦ãã ã•ã„ï¼ŽIDã®åŒºåˆ‡ã‚Šã¯åŠè§’ã‚¹ãƒšãƒ¼ã‚¹ã§ã™ï¼Ž',
		'ConfAutoBigAlbumPictures' : 'ãƒšãƒ¼ã‚¸ã‚’é–‹ã„ãŸæ™‚ã«å¤§ãã„ã‚¢ãƒ«ãƒãƒ å†™çœŸã‚’è‡ªå‹•çš„ã«è¡¨ç¤ºã™ã‚‹',
		'ConfAutoLoadFullAlbum' : 'å˜ç‹¬ãƒšãƒ¼ã‚¸ã§ã‚¢ãƒ«ãƒãƒ å†…ã®å…¨ã¦ã®ç”»åƒã®ã‚µãƒ ãƒã‚¤ãƒ«ã‚’è‡ªå‹•çš„ã«èª­ã¿è¾¼ã‚€',
		'ConfAutoLoadTaggedPhotos' : 'å˜ç‹¬ãƒšãƒ¼ã‚¸ï¼ˆãƒ—ãƒ­ãƒ•ã‚£ãƒ¼ãƒ«ã®å†™çœŸã‚¿ãƒ–ï¼‰ã§å…¨ã¦ã®ã‚¿ã‚°ä»˜ã‘ã•ã‚ŒãŸå†™çœŸã®ã‚µãƒ ãƒã‚¤ãƒ«ã‚’è‡ªå‹•çš„ã«èª­ã¿è¾¼ã‚€',
		'ConfAutoReadMore' : 'ã€Œã‚‚ã£ã¨è¦‹ã‚‹ã€ãƒªãƒ³ã‚¯ã‚’è‡ªå‹•çš„ã«ã‚¯ãƒªãƒƒã‚¯ã™ã‚‹',
		'ConfBigAlbumPictures' : 'ã‚¢ãƒ«ãƒãƒ ãƒšãƒ¼ã‚¸ã«ãƒšãƒ¼ã‚¸å†…ã®å…¨ã¦ã®ç”»åƒã®å¤§ãã„ãƒãƒ¼ã‚¸ãƒ§ãƒ³ã‚’è¡¨ç¤ºã™ã‚‹ãƒªãƒ³ã‚¯ã‚’è¿½åŠ ã™ã‚‹',
		'ConfBigAlbumPicturesBorder' : 'å¤§ãã„ãƒãƒ¼ã‚¸ãƒ§ãƒ³ã®ç”»åƒã®å‘¨ã‚Šã«æž ç·šã‚’è¿½åŠ ã™ã‚‹',
		'ConfBookmarks' : 'ä¸Šéƒ¨ãƒ¡ãƒ‹ãƒ¥ãƒ¼ãƒãƒ¼ã«ãƒ–ãƒƒã‚¯ãƒžãƒ¼ã‚¯ã‚µãƒ–ãƒ¡ãƒ‹ãƒ¥ãƒ¼ã‚’è¿½åŠ ã™ã‚‹',
		'ConfBottomBarHoverOpacity' : 'ãƒžã‚¦ã‚¹ã‚ªãƒ¼ãƒãƒ¼æ™‚',
		'ConfBottomBarOpacity' : 'ä¸‹éƒ¨ãƒ¡ãƒ‹ãƒ¥ãƒ¼ãƒãƒ¼ã®é€æ˜Žåº¦',
		'ConfCalendarBirthDate' : 'ã‚¤ãƒ™ãƒ³ãƒˆã®è©³ç´°ã«èª•ç”Ÿæ—¥ã‚’å«ã‚ã‚‹',
		'ConfCalendarFullName' : 'èª•ç”Ÿæ—¥ã®ã‚¿ã‚¤ãƒˆãƒ«ã«ï¼ˆãƒ•ã‚¡ãƒ¼ã‚¹ãƒˆãƒãƒ¼ãƒ ã ã‘ã§ã¯ãªãï¼‰ãƒ•ãƒ«ãƒãƒ¼ãƒ ã‚’ä½¿ã†',
		'ConfChatDifferentiate' : 'é€£çµ¡å…ˆã®ãƒãƒ£ãƒƒãƒˆå¯èƒ½ã¨ä¸€æ™‚é€€å¸­ä¸­ã‚’å¤ªå­—ã¨æ–œä½“ã‚’ä½¿ã£ã¦åŒºåˆ¥ã™ã‚‹',
		'ConfChatHideIdle' : 'ä¸€æ™‚é€€å¸­ä¸­ã®é€£çµ¡å…ˆã‚’éš ã™',
		'ConfDelayPopupPics' : 'ãƒãƒƒãƒ—ã‚¢ãƒƒãƒ—ç”»åƒã‚’è¡¨ç¤ºã™ã‚‹å‰ã«çŸ­ã„ãƒ‡ã‚£ãƒ¬ã‚¤ã‚’è¿½åŠ ã™ã‚‹',
		'ConfDelayPopupPicsTimeout' : 'ãƒãƒƒãƒ—ã‚¢ãƒƒãƒ—ç”»åƒã‚’è¡¨ç¤ºã™ã‚‹å‰ã®ãƒ‡ã‚£ãƒ¬ã‚¤ï¼ˆãƒŸãƒªç§’å˜ä½ï¼Œãƒ‡ãƒ•ã‚©ãƒ«ãƒˆã¯500ãƒŸãƒªç§’ï¼‰: ',
		'ConfDownloadVideo' : 'å‹•ç”»ã®ãƒšãƒ¼ã‚¸ã‹ã‚‰å‹•ç”»ã‚’ãƒ€ã‚¦ãƒ³ãƒ­ãƒ¼ãƒ‰ã™ã‚‹ãƒªãƒ³ã‚¯ã‚’è¿½åŠ ã™ã‚‹ï¼ˆ<a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLVå†ç”Ÿã‚½ãƒ•ãƒˆ</a>ãŒå¿…è¦ã§ã™ï¼‰',
		'ConfDisableTheater' : 'å†™çœŸã‚·ã‚¢ã‚¿ãƒ¼ã‚’ç„¡åŠ¹ã«ã™ã‚‹',
		'ConfErrorPageReload' : 'ã‚¢ãƒ—ãƒªã‚±ãƒ¼ã‚·ãƒ§ãƒ³ã‚¨ãƒ©ãƒ¼ã®ãƒšãƒ¼ã‚¸ã¯5ç§’å¾Œã«è‡ªå‹•æ›´æ–°ã™ã‚‹',
		'ConfExport' : 'è¨­å®šã‚’ã‚¨ã‚¯ã‚¹ãƒãƒ¼ãƒˆã™ã‚‹ã«ã¯ä¸‹ã®ãƒ†ã‚­ã‚¹ãƒˆã‚’ã‚³ãƒ”ãƒ¼ã—ã¦ãƒ•ã‚¡ã‚¤ãƒ«ã«ä¿å­˜ã—ã¦ãã ã•ã„ï¼Ž',
		'ConfExternalPopup' : 'å¤–éƒ¨ç”»åƒã®ãƒ•ãƒ«ã‚µã‚¤ã‚ºãƒãƒ¼ã‚¸ãƒ§ãƒ³ã‚’ãƒãƒƒãƒ—ã‚¢ãƒƒãƒ—ã™ã‚‹ <sup>beta</sup>',
		'ConfFacebook-foREVer-Language' : '-foREVer- Scriptã®è¨€èªž',
		'ConfFacebookTimestamps' : 'æ™‚åˆ»ã‚’Facebookæ–¹å¼ã§è¡¨ç¤ºã™ã‚‹ï¼ˆä¾‹: "3æ™‚é–“å‰"ï¼‰',
		'ConfFBFTimestamps' : 'Facebookæ–¹å¼ã®æ™‚åˆ»ã®å¾Œã«FFxieræ–¹å¼ã®æ™‚åˆ»ã‚’è¿½åŠ ã™ã‚‹ï¼ˆä¾‹: "11:45"ï¼‰',
		'ConfFBFTimestamps24' : '-foREVer- Scriptæ–¹å¼ã®æ™‚åˆ»ã‚’24æ™‚é–“è¡¨ç¤ºã«ã™ã‚‹',
		'ConfFriendRequestCountInTitle' : 'ãƒšãƒ¼ã‚¸ã‚¿ã‚¤ãƒˆãƒ«ã«æ–°ç€å‹é”ãƒªã‚¯ã‚¨ã‚¹ãƒˆã®æ•°ã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfGoogleApps' : 'Google Appsã®Googleã‚«ãƒ¬ãƒ³ãƒ€ãƒ¼ã¸ã®ãƒªãƒ³ã‚¯ã‚’ä½œæˆã™ã‚‹',
		'ConfGoogleAppsDomain' : 'ãƒ‰ãƒ¡ã‚¤ãƒ³å',
		'ConfGoogleCalendar' : '<a href="http://ja.wikipedia.org/wiki/Google%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC" target="_blank">Googleã‚«ãƒ¬ãƒ³ãƒ€ãƒ¼</a>ã«èª•ç”Ÿæ—¥ã¨ã‚¤ãƒ™ãƒ³ãƒˆã‚’è¿½åŠ ã™ã‚‹ãƒªãƒ³ã‚¯ã‚’è¿½åŠ ã™ã‚‹',
		'ConfGoogleLanguage' : '<a href="http://ja.wikipedia.org/wiki/Google%E7%BF%BB%E8%A8%B3" target="_blank">Googleç¿»è¨³</a>ã®è¨€èªž',
		'ConfHideApplicationStories' : 'ã‚¢ãƒ—ãƒªã‚±ãƒ¼ã‚·ãƒ§ãƒ³ã®è¨˜äº‹ã‚’éš ã™',
		'ConfHideEgos' : 'egoã‚»ã‚¯ã‚·ãƒ§ãƒ³ã‚’å…¨ã¦éš ã™ï¼ˆFacebookã®ãŠã™ã™ã‚ã‚’ã§ãã‚‹ã ã‘éš ã—ã¾ã™ï¼‰',
		'ConfHideEventStories' : 'ã‚¤ãƒ™ãƒ³ãƒˆã®è¨˜äº‹ã‚’éš ã™',
		'ConfHideFacebookCountInTitle' : 'Facebookã®å—ä¿¡ç®±ã®æ–°ç€ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸æ•°ã®ã‚«ã‚¦ãƒ³ãƒˆã‚’éš ã™',
		'ConfHideFriendStories' : 'å‹é”ã«ãªã‚Šã¾ã—ãŸã®è¨˜äº‹ã‚’éš ã™',
		'ConfHideGroupStories' : 'ã‚°ãƒ«ãƒ¼ãƒ—ã®è¨˜äº‹ã‚’éš ã™',
		'ConfHideHovercards' : 'Hovercardï¼ˆåå‰ã‚’ãƒžã‚¦ã‚¹ã‚ªãƒ¼ãƒãƒ¼ã—ãŸæ™‚ã«ç¾ã‚Œã‚‹ãƒãƒƒãƒ—ã‚¢ãƒƒãƒ—ï¼‰ã‚’éš ã™',
		'ConfHideLikeStories' : 'ã„ã„ã­ï¼ã®è¨˜äº‹ã‚’éš ã™',
		'ConfHideLinkStories' : 'ãƒªãƒ³ã‚¯ã®è¨˜äº‹ã‚’éš ã™',
		'ConfHideNoteStories' : 'ãƒŽãƒ¼ãƒˆã®è¨˜äº‹ã‚’éš ã™',
		'ConfHidePhotoStories' : 'å†™çœŸã®è¨˜äº‹ã‚’éš ã™',
		'ConfHidePlaceStories' : 'ã‚¹ãƒãƒƒãƒˆã®è¨˜äº‹ã‚’éš ã™',
		'ConfHideProfilePicStories' : 'ãƒ—ãƒ­ãƒ•ã‚£ãƒ¼ãƒ«å†™çœŸã‚’æ›´æ–°ã—ãŸå‹é”ã®è¨˜äº‹ã‚’éš ã™',
		'ConfHideRead' : 'æœ€æ–°æƒ…å ±ã§é–²è¦§æ¸ˆã¿ã®é …ç›®ã‚’éš ã™',
		'ConfHideRelationshipStories' : 'äº¤éš›ã‚¹ãƒ†ãƒ¼ã‚¿ã‚¹ã®è¨˜äº‹ã‚’éš ã™',
		'ConfHideStatusStories' : 'è¿‘æ³ã®è¨˜äº‹ã‚’éš ã™',
		'ConfHideVideoStories' : 'å‹•ç”»ã®è¨˜äº‹ã‚’éš ã™',
		'ConfHideWallStories' : 'ã‚¦ã‚©ãƒ¼ãƒ«ã®è¨˜äº‹ã‚’éš ã™',
		'ConfHomeBeta' : 'Facebook Sneak Peekã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfHomeChat' : 'ãƒãƒ£ãƒƒãƒˆã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfHomeChatNames' : 'ãƒãƒ£ãƒƒãƒˆã«åå‰ã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfHomeEvents' : 'ã‚¤ãƒ™ãƒ³ãƒˆã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfHomeFindFriends' : 'Facebookã§ã¤ãªãŒã‚ã†ã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfHomeLeftAlign' : 'ãƒšãƒ¼ã‚¸ã®å†…å®¹ã‚’å·¦å¯„ã›ã«ã™ã‚‹',
		'ConfHomeLeftColumn' : 'å·¦ã‚«ãƒ©ãƒ ã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfHomeLeftColumnFixed' : 'ç”»é¢ã‚’ã‚¹ã‚¯ãƒ­ãƒ¼ãƒ«ã—ã¦ã‚‚å·¦ã‚«ãƒ©ãƒ ã‚’è¡¨ç¤ºã—ãŸã¾ã¾ã«ã™ã‚‹',
		'ConfHomeLink' : 'ä¸Šéƒ¨ãƒ¡ãƒ‹ãƒ¥ãƒ¼ãƒãƒ¼ã«ãƒ›ãƒ¼ãƒ ã¸ã®ãƒªãƒ³ã‚¯ã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfHomeNavigation' : 'ãƒŠãƒ“ã‚²ãƒ¼ãƒˆã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfHomePokes' : 'ã‚ã„ã•ã¤ã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfHomeProfile' : 'ãƒ—ãƒ­ãƒ•ã‚£ãƒ¼ãƒ«ã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfHomeRecommendations' : 'ãŠã™ã™ã‚ã‚’è¡¨ç¤ºã™ã‚‹ï¼ˆçŸ¥ã‚Šåˆã„ã‹ã‚‚ï¼Ÿï¼ŒãŠã™ã™ã‚ã®ãƒ•ã‚¡ãƒ³ãƒšãƒ¼ã‚¸ç­‰ï¼‰',
		'ConfHomeRequests' : 'ãƒªã‚¯ã‚¨ã‚¹ãƒˆã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfHomeRightColumn' : 'å³ã‚«ãƒ©ãƒ ã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfHomeStretch' : 'ãƒšãƒ¼ã‚¸ã®å¹…ã‚’ã‚¦ã‚£ãƒ³ãƒ‰ã‚¦ã®å¹…ã«åˆã‚ã›ã‚‹',
		'ConfHomeStretchMiddleColumn' : 'ãƒšãƒ¼ã‚¸ã®ä¸­å¤®ã‚«ãƒ©ãƒ ã®å¹…ã‚’è‡ªå‹•èª¿æ•´ã™ã‚‹',
		'ConfiCalendar' : 'å…¨ã¦ã®èª•ç”Ÿæ—¥ã«<a href="http://ja.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>ãƒ•ã‚¡ã‚¤ãƒ«ã‚’ãƒ€ã‚¦ãƒ³ãƒ­ãƒ¼ãƒ‰ã™ã‚‹ãƒªãƒ³ã‚¯ã‚’è¿½åŠ ã™ã‚‹',
		'ConfImport' : 'å¾Œã‹ã‚‰è¨­å®šã‚’ã‚¤ãƒ³ãƒãƒ¼ãƒˆã™ã‚‹éš›ã¯ï¼Œä¸‹ã®ãƒ†ã‚­ã‚¹ãƒˆã‚’ä»¥å‰ä¿å­˜ã—ãŸãƒ†ã‚­ã‚¹ãƒˆã§ä¸Šæ›¸ãã—ã¦ã‹ã‚‰ã€Œã‚¤ãƒ³ãƒãƒ¼ãƒˆã€ã‚’ã‚¯ãƒªãƒƒã‚¯ã—ã¦ãã ã•ã„ï¼Ž',
		'ConfInboxCountInTitle' : 'ãƒšãƒ¼ã‚¸ã‚¿ã‚¤ãƒˆãƒ«ã«å—ä¿¡ç®±ã®æ–°ç€ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸æ•°ã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfLogoutLink' : 'ä¸Šéƒ¨ãƒ¡ãƒ‹ãƒ¥ãƒ¼ãƒãƒ¼ã«ãƒ­ã‚°ã‚¢ã‚¦ãƒˆã¸ã®ãƒªãƒ³ã‚¯ã‚’è¿½åŠ ã™ã‚‹',
		'ConfNotificationCountInTitle' : 'ãƒšãƒ¼ã‚¸ã‚¿ã‚¤ãƒˆãƒ«ã«æ–°ã—ã„ãŠçŸ¥ã‚‰ã›ã®æ•°ã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfNewTabSearch' : 'CTRL + Enterã‚’æŠ¼ã—ã¦æ¤œç´¢ã—ãŸæ™‚ã«æ–°ã—ã„ã‚¿ãƒ–/ã‚¦ã‚£ãƒ³ãƒ‰ã‚¦ã§æ¤œç´¢çµæžœã‚’é–‹ã',
		'ConfPageTitle' : 'å…¨ã¦ã®ãƒšãƒ¼ã‚¸ã‚¿ã‚¤ãƒˆãƒ«ã‹ã‚‰ã€ŒFacebook |ã€ã‚’å‰Šé™¤ã™ã‚‹',
		'ConfPhotoPopup' : 'ãƒžã‚¦ã‚¹ã‚ªãƒ¼ãƒãƒ¼æ™‚ã«å†™çœŸã®å¤§ãã„ãƒãƒ¼ã‚¸ãƒ§ãƒ³ã‚’ãƒãƒƒãƒ—ã‚¢ãƒƒãƒ—ã™ã‚‹',
		'ConfPopupAutoClose' : 'ãƒãƒƒãƒ—ã‚¢ãƒƒãƒ—ç”»åƒã‚’è‡ªå‹•çš„ã«é–‰ã˜ã‚‹',
		'ConfPopupSmartAutoClose' : 'ãƒãƒƒãƒ—ã‚¢ãƒƒãƒ—ç”»åƒã‚’ãƒžã‚¦ã‚¹ã‚ªãƒ¼ãƒãƒ¼ã—ã¦ã„ã‚‹é–“ã¯è‡ªå‹•çš„ã«é–‰ã˜ãªã„',
		'ConfPopupPosition' : 'ãƒãƒƒãƒ—ã‚¢ãƒƒãƒ—ç”»åƒã®ä½ç½®',
		'ConfPopupWhileTagging' : 'ã‚¿ã‚°ä»˜ã‘ã—ã¦ã„ã‚‹æ™‚ã§ã‚‚ãƒãƒƒãƒ—ã‚¢ãƒƒãƒ—ç”»åƒã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfProcessInterval' : 'ãƒšãƒ¼ã‚¸ã‚’å‡¦ç†ã™ã‚‹é–“éš”ï¼ˆãƒŸãƒªç§’å˜ä½ï¼Œãƒ‡ãƒ•ã‚©ãƒ«ãƒˆã¯1000ãƒŸãƒªç§’ï¼‰: ',
		'ConfProfileLink' : 'ä¸Šéƒ¨ãƒ¡ãƒ‹ãƒ¥ãƒ¼ãƒãƒ¼ã«ãƒ—ãƒ­ãƒ•ã‚£ãƒ¼ãƒ«ã¸ã®ãƒªãƒ³ã‚¯ã‚’è¡¨ç¤ºã™ã‚‹',
		'ConfProfilePicPopup' : 'ãƒžã‚¦ã‚¹ã‚ªãƒ¼ãƒãƒ¼æ™‚ã«ãƒ—ãƒ­ãƒ•ã‚£ãƒ¼ãƒ«ç”»åƒã®å¤§ãã„ãƒãƒ¼ã‚¸ãƒ§ãƒ³ã‚’ãƒãƒƒãƒ—ã‚¢ãƒƒãƒ—ã™ã‚‹',
		'ConfProtocolLinks' : 'ãƒ—ãƒ­ãƒ•ã‚£ãƒ¼ãƒ«ã®ãƒ¡ãƒƒã‚»ãƒ³ã‚¸ãƒ£ãƒ¼IDã‚’ä¼šè©±ã™ã‚‹ãŸã‚ã®ãƒªãƒ³ã‚¯ã«å¤‰ãˆã‚‹ï¼ˆGoogleãƒˆãƒ¼ã‚¯ï¼ŒWindows Liveç­‰ï¼‰',
		'ConfSectionAbout' : '-foREVer- Scriptã«ã¤ã„ã¦',
		'ConfSectionAdvanced' : 'è©³ç´°',
		'ConfSectionEvents' : 'èª•ç”Ÿæ—¥/ã‚¤ãƒ™ãƒ³ãƒˆ',
		'ConfSectionImportExport' : 'ã‚¤ãƒ³ãƒãƒ¼ãƒˆ/ã‚¨ã‚¯ã‚¹ãƒãƒ¼ãƒˆ',
		'ConfSectionFeeds' : 'ãƒ•ã‚£ãƒ¼ãƒ‰',
		'ConfSectionHomePage' : 'ãƒ›ãƒ¼ãƒ ãƒšãƒ¼ã‚¸',
		'ConfSectionLiveFeed' : 'ãƒ‹ãƒ¥ãƒ¼ã‚¹ãƒ•ã‚£ãƒ¼ãƒ‰',
		'ConfSectionMenu' : 'ãƒ¡ãƒ‹ãƒ¥ãƒ¼/ãƒãƒ£ãƒƒãƒˆ',
		'ConfSectionOther' : 'ãã®ä»–ã®ã‚ªãƒ—ã‚·ãƒ§ãƒ³',
		'ConfSectionPageTitle' : 'ãƒšãƒ¼ã‚¸ã‚¿ã‚¤ãƒˆãƒ«',
		'ConfSectionPictures' : 'ç”»åƒ',
		'ConfSectionShortcuts' : 'ã‚­ãƒ¼ãƒœãƒ¼ãƒ‰ã‚·ãƒ§ãƒ¼ãƒˆã‚«ãƒƒãƒˆ',
		'ConfSecureLinks' : 'Facebookã¸ã®ãƒªãƒ³ã‚¯ã§HTTPSã®ãƒšãƒ¼ã‚¸ã‚’å¼·åˆ¶ã™ã‚‹',
		'ConfShortcutList' : '<b>ã‚­ãƒ¼ãƒœãƒ¼ãƒ‰ ã‚·ãƒ§ãƒ¼ãƒˆã‚«ãƒƒãƒˆ</b>ï¼ˆå¤§æ–‡å­—ã¨å°æ–‡å­—ã§ç•°ãªã‚Šã¾ã™ï¼‰:<br /><br /><i>ã©ã®ãƒšãƒ¼ã‚¸ã§ã‚‚å¯èƒ½:</i><br />&nbsp;<b>A</b> - ã‚¢ãƒ«ãƒãƒ /å†™çœŸ<br />&nbsp;<b>B</b> - é€£çµ¡å…ˆãƒªã‚¹ãƒˆï¼ˆã‚ªãƒ³ãƒ©ã‚¤ãƒ³ã®å‹é”ï¼‰ã®åˆ‡æ›¿ãˆ<br />&nbsp;<b>C</b> - -foREVer- Scriptè¨­å®š<br />&nbsp;<b>D</b> - èª•ç”Ÿæ—¥<br />&nbsp;<b>E</b> - ã‚¤ãƒ™ãƒ³ãƒˆ<br />&nbsp;<b>F</b> - å‹é”<br />&nbsp;<b>H</b> - ãƒ›ãƒ¼ãƒ <br />&nbsp;<b>I</b> - å—ä¿¡ç®±<br />&nbsp;<b>K</b> - ãƒ–ãƒƒã‚¯ãƒžãƒ¼ã‚¯ã«è¿½åŠ <br />&nbsp;<b>L</b> - ãƒ­ã‚°ã‚¢ã‚¦ãƒˆã¸ã®ãƒªãƒ³ã‚¯ã‚’é¸æŠž ï¼ˆãã®å¾Œã§Enterã‚’æŠ¼ã™ã¨ãƒ­ã‚°ã‚¢ã‚¦ãƒˆã—ã¾ã™ï¼‰<br />&nbsp;<b>N</b> - ãŠçŸ¥ã‚‰ã›<br />&nbsp;<b>P</b> - ãƒ—ãƒ­ãƒ•ã‚£ãƒ¼ãƒ«<br />&nbsp;<b>R</b> - ãƒªã‚¯ã‚¨ã‚¹ãƒˆ<br />&nbsp;<b>S</b> - æ¤œç´¢ãƒœãƒƒã‚¯ã‚¹ã«ã‚¸ãƒ£ãƒ³ãƒ—<br />&nbsp;<b>T</b> - é¸æŠžã•ã‚ŒãŸãƒ†ã‚­ã‚¹ãƒˆã‚’ç¿»è¨³<br />&nbsp;<b>?</b> - -foREVer- Scriptã®ãƒ‡ãƒãƒƒã‚°æƒ…å ±ã‚’è¡¨ç¤º<br />&nbsp;<b>&lt;escape&gt;</b> - -foREVer- ScriptãŒä½œæˆã—ãŸãƒãƒƒãƒ—ã‚¢ãƒƒãƒ—ã‚’é–‰ã˜ã‚‹<br /><br /><i>ãƒ›ãƒ¼ãƒ ã§å¯èƒ½ï¼ˆãƒ•ã‚£ãƒ«ã‚¿ï¼‰</i>:<br />&nbsp;<b>a</b> - ãƒšãƒ¼ã‚¸<br />&nbsp;<b>f</b> - æœ€æ–°æƒ…å ±<br />&nbsp;<b>g</b> - ã‚°ãƒ«ãƒ¼ãƒ—<br />&nbsp;<b>l</b> - ãƒªãƒ³ã‚¯<br />&nbsp;<b>n</b> - ãƒ‹ãƒ¥ãƒ¼ã‚¹ãƒ•ã‚£ãƒ¼ãƒ‰<br />&nbsp;<b>p</b> - å†™çœŸ<br />&nbsp;<b>s</b> / <b>u</b> - è¿‘æ³ã‚¢ãƒƒãƒ—ãƒ‡ãƒ¼ãƒˆ<br />&nbsp;<b>t</b> - ãƒŽãƒ¼ãƒˆ<br />&nbsp;<b>v</b> - å‹•ç”»<br /><br /><i>ãƒ—ãƒ­ãƒ•ã‚£ãƒ¼ãƒ«ã§å¯èƒ½</i>:<br />&nbsp;<b>i</b> - åŸºæœ¬ãƒ‡ãƒ¼ã‚¿<br />&nbsp;<b>p</b> - å†™çœŸ<br />&nbsp;<b>w</b> - ã‚¦ã‚©ãƒ¼ãƒ«<br />&nbsp;<b>x</b> - ãƒœãƒƒã‚¯ã‚¹<br /><br /><i>ãƒšãƒ¼ã‚¸ä»˜ã‘ï¼ˆå‰ã¸ï¼Œæ¬¡ã¸ç­‰ï¼‰ãŒã‚ã‚‹ãƒšãƒ¼ã‚¸ã§å¯èƒ½</i><br />&nbsp;<b>â†</b> - å‰ã¸<br />&nbsp;<b>â†’</b> - æ¬¡ã¸<br />&nbsp;<b>&lt;shift&gt; + â†</b> - æœ€åˆã¸ï¼ˆå¯èƒ½ãªæ™‚ã®ã¿ï¼‰<br />&nbsp;<b>&lt;shift&gt; + â†’</b> - æœ€å¾Œã¸ï¼ˆå¯èƒ½ãªæ™‚ã®ã¿ï¼‰<br /><br /><i>ã‚¢ãƒ«ãƒãƒ /å†™çœŸã®é–²è¦§æ™‚:</i><br />&nbsp;<b>a</b> - å…¨ã¦ã®ã‚µãƒ ãƒã‚¤ãƒ«ã‚’èª­ã¿è¾¼ã‚€ï¼ˆå¯èƒ½ãªæ™‚ã®ã¿ï¼‰<br />&nbsp;<b>b</b> - å¤§ãã„ç”»åƒã‚’è¡¨ç¤º<br />&nbsp;<b>c</b> - ã‚³ãƒ¡ãƒ³ãƒˆã‚’è¡¨ç¤º<br />&nbsp;<b>k</b> - ã‚¢ãƒ«ãƒãƒ ã«æˆ»ã‚‹<br />&nbsp;<b>m</b> - ï¼ˆèª°ã‹ã¨ï¼‰ã‚ãªãŸã®å†™çœŸ<br /><br /><i>å‹é”ã®å†™çœŸã‚„ã‚¢ãƒƒãƒ—ãƒ­ãƒ¼ãƒ‰/ã‚¿ã‚°ä»˜ã‘ã•ã‚ŒãŸå†™çœŸã®é–²è¦§æ™‚:</i><br />&nbsp;<b>a</b> / &nbsp;<b>r</b> - å‹é”ã®ã‚¢ãƒ«ãƒãƒ <br />&nbsp;<b>m</b> / &nbsp;<b>u</b> - æºå¸¯ã‚¢ãƒƒãƒ—ãƒ­ãƒ¼ãƒ‰<br />&nbsp;<b>o</b> - ç§ãŒå†™ã£ã¦ã„ã‚‹å†™çœŸ<br />&nbsp;<b>p</b> - ãƒžã‚¤ã‚¢ãƒ«ãƒãƒ <br />&nbsp;<b>t</b> / &nbsp;<b>f</b> - ã‚¿ã‚°ä»˜ã‘ã•ã‚Œã¦ã„ã‚‹å‹é”',
		'ConfShortcuts' : 'ã‚­ãƒ¼ãƒœãƒ¼ãƒ‰ã‚·ãƒ§ãƒ¼ãƒˆã‚«ãƒƒãƒˆã‚’æœ‰åŠ¹ã«ã™ã‚‹ï¼Ž',
		'ConfSign' : 'ãƒ—ãƒ­ãƒ•ã‚£ãƒ¼ãƒ«ã«æ˜Ÿåº§ã‚’è¡¨ç¤ºã™ã‚‹ï¼ˆèª•ç”Ÿæ—¥ãŒæä¾›ã•ã‚Œã¦ã„ã‚‹å ´åˆï¼‰',
		'ConfTopBarFixed' : 'ç”»é¢ã‚’ã‚¹ã‚¯ãƒ­ãƒ¼ãƒ«ã—ã¦ã‚‚ä¸Šéƒ¨ãƒ¡ãƒ‹ãƒ¥ãƒ¼ãƒãƒ¼ã‚’å¸¸ã«è¡¨ç¤ºã—ç¶šã‘ã‚‹',
		'ConfTopBarHoverOpacity' : 'ãƒžã‚¦ã‚¹ã‚ªãƒ¼ãƒãƒ¼æ™‚',
		'ConfTopBarOpacity' : 'ä¸Šéƒ¨ãƒ¡ãƒ‹ãƒ¥ãƒ¼ãƒãƒ¼ã®é€æ˜Žåº¦',
		'ConfUpdates' : '-foREVer- Scriptã®ã‚¢ãƒƒãƒ—ãƒ‡ãƒ¼ãƒˆã‚’ Userscripts.org ã§æ¯Žæ—¥ç¢ºèªã™ã‚‹ï¼Žã¾ãŸã¯<a href="#" id="fbfUpdateLink" onclick="return false;">ä»Šã™ãç¢ºèª</a>ã™ã‚‹ï¼Ž',
		'DownloadVideo' : 'å‹•ç”»ã‚’ãƒ€ã‚¦ãƒ³ãƒ­ãƒ¼ãƒ‰',
		'ExportICalendarFile' : 'iCalendarãƒ•ã‚¡ã‚¤ãƒ«ã‚’ã‚¨ã‚¯ã‚¹ãƒãƒ¼ãƒˆã™ã‚‹',
		'ExportICalendarFileWarning' : 'ï¼ˆå‹é”ãŒãŸãã•ã‚“ã„ã‚‹å ´åˆã¯å¤šå°‘æ™‚é–“ãŒã‹ã‹ã‚Šã¾ã™ï¼‰',
		'Facebook-foREVer-Conflict' : 'Facebook -foREVer-ã¯-foREVer- Scriptã«åå‰ãŒå¤‰æ›´ã•ã‚Œã¾ã—ãŸï¼Ž<br /><br />åå‰ãŒå¤‰ã‚ã£ãŸãŸã‚ã«ï¼Œãƒ–ãƒ©ã‚¦ã‚¶ã‹ã‚‰Facebook -foREVer-ã‚’æ‰‹å‹•ã§ã‚¢ãƒ³ã‚¤ãƒ³ã‚¹ãƒˆãƒ¼ãƒ«ã—ãªã„ã¨2ã¤ã®ã‚¹ã‚¯ãƒªãƒ—ãƒˆãŒäº’ã„ã«ã‚³ãƒ³ãƒ•ãƒªã‚¯ãƒˆã—ã¦ã—ã¾ã„ã¾ã™ï¼Ž<br /><br />userscriptã‚’ã‚¢ãƒ³ã‚¤ãƒ³ã‚¹ãƒˆãƒ¼ãƒ«ã™ã‚‹ã‚„ã‚Šæ–¹ãŒåˆ†ã‹ã‚‰ãªã„å ´åˆã¯ï¼Œ<a %s>ã“ã“ã‚’ã‚¯ãƒªãƒƒã‚¯ã—ã¦ãã ã•ã„ï¼Žï¼ˆæ³¨: è‹±èªžï¼‰</a>',
		'fullAlbumLoaded' : 'ã‚¢ãƒ«ãƒãƒ ãŒå…¨ã¦èª­ã¿è¾¼ã¾ã‚Œã¾ã—ãŸ',
		'Import' : 'ã‚¤ãƒ³ãƒãƒ¼ãƒˆ',
		'ImportConfirm' : 'ã“ã‚Œã‚‰ã®è¨­å®šã‚’ã‚¤ãƒ³ãƒãƒ¼ãƒˆã—ã¦ã‚ˆã‚ã—ã„ã§ã™ã‹ï¼Ÿ\nç¾åœ¨ã®è¨­å®šã¯å¤±ã‚ã‚Œã¾ã™',
		'ImportFailure' : 'è¨­å®šã‚’ã‚¤ãƒ³ãƒãƒ¼ãƒˆä¸­ã«ã‚¨ãƒ©ãƒ¼ãŒç™ºç”Ÿã—ã¾ã—ãŸï¼Ž',
		'ImportSuccess' : 'ã‚¤ãƒ³ãƒãƒ¼ãƒˆãŒå®Œäº†ã—ã¾ã—ãŸï¼Žãƒšãƒ¼ã‚¸ã‚’æ›´æ–°ã—ã¾ã™ã‹ï¼Ÿ',
		'Left' : 'å·¦',
		'LoadingAllPhotos' : 'å…¨ã¦ã®å†™çœŸã‚’èª­ã¿è¾¼ã¿ä¸­...',
		'loadingFullAlbum' : 'å…¨ã¦ã®ã‚¢ãƒ«ãƒãƒ ã‚’èª­ã¿è¾¼ã¿ä¸­...',
		'LoadingPic' : 'ç”»åƒã‚’èª­ã¿è¾¼ã¿ä¸­...',
		'LoadPhotosWarning' : 'å…¨ã¦ã®å†™çœŸã‚’èª­ã¿è¾¼ã‚€ã«ã¯æ™‚é–“ãŒã‹ã‹ã‚‹ã‹ã‚‚ã—ã‚Œã¾ã›ã‚“',
		'Months' : new Array('1æœˆ','2æœˆ','3æœˆ','4æœˆ','5æœˆ','6æœˆ','7æœˆ','8æœˆ','9æœˆ','10æœˆ','11æœˆ','12æœˆ'),
		'ProtocolSkype' : '%sã•ã‚“ã‚’Skypeã§å‘¼ã³å‡ºã™',
		'ProtocolMSN' : '%sã•ã‚“ã¨Windows Liveã§ãƒãƒ£ãƒƒãƒˆã™ã‚‹',
		'ProtocolYahoo' : '%sã•ã‚“ã¨Yahoo!ãƒ¡ãƒƒã‚»ãƒ³ã‚¸ãƒ£ãƒ¼ã§ãƒãƒ£ãƒƒãƒˆã™ã‚‹',
		'ProtocolGoogle' : '%sã•ã‚“ã¨Googleãƒˆãƒ¼ã‚¯ã§ãƒãƒ£ãƒƒãƒˆã™ã‚‹',
		'ReloadErrorPage' : 'ã‚‚ã†ä¸€åº¦ã‚¯ãƒªãƒƒã‚¯ã™ã‚‹ã‹5ç§’ãŠå¾…ã¡ãã ã•ã„',
		'Refresh' : 'æ›´æ–°',
		'Remove' : 'å‰Šé™¤',
		'Right' : 'å³',
		'ShowBigPictures' : 'å¤§ãã„ç”»åƒã‚’è¡¨ç¤º',
		'Signs' : new Array('å±±ç¾Šåº§','æ°´ç“¶åº§','é­šåº§','ç‰¡ç¾Šåº§','ç‰¡ç‰›åº§','åŒå­åº§','èŸ¹åº§','ç…å­åº§','ä¹™å¥³åº§','å¤©ç§¤åº§','è åº§','å°„æ‰‹åº§'),
		'today' : 'ä»Šæ—¥',
		'Translators' : 'ç¿»è¨³',
		'UpdateAvailable1' : '-foREVer- Scriptã‚’ã‚¢ãƒƒãƒ—ãƒ‡ãƒ¼ãƒˆã§ãã¾ã™ï¼Ž',
		'UpdateAvailable2' : 'ä»Šã™ãã‚¢ãƒƒãƒ—ãƒ‡ãƒ¼ãƒˆã—ã¾ã™ã‹ï¼Ÿ',
		'UpdateHomepage' : 'ãƒ›ãƒ¼ãƒ ãƒšãƒ¼ã‚¸ã¸',
		'UpdateInstall' : 'ä»Šã™ãã‚¤ãƒ³ã‚¹ãƒˆãƒ¼ãƒ«ã™ã‚‹',
		'UpdateTomorrow' : 'ã¾ãŸä»Šåº¦ã‚¤ãƒ³ã‚¹ãƒˆãƒ¼ãƒ«ã™ã‚‹',
		'yearsOld' : '%sæ­³'
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
	'Facebook-foREVer-Language': getValue('Facebook-foREVer-Language', 'auto'),
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
if (prefs['Facebook-foREVer-Language'] == 'auto' && buffer) {
	language = buffer[1].toLowerCase();
	detectedLanguage = language;
	if (!lang[language]) {
		language = language.split('_')[0];
		if (!lang[language]) { language = 'en'; }
	}
} else {
	language = prefs['Facebook-foREVer-Language'];
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
	'.-foREVer- Script-highlighted-story, .-foREVer- Script-highlighted-story * { font-weight:bold !important; }'
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
	var months = new Array (/^(.*\s)?(jan(uar[iy]?)?|enero|janvier|gennaio|janeiro|Î¹Î±Î½Î¿Ï…Î±ÏÎ¯Î¿Ï…|Ñ˜Ð°Ð½ÑƒÐ°Ñ€|ÑÐ½ÑƒÐ°Ñ€Ð¸|januÃ¡ra|leden)(\s.*)?$/,
							/^(.*\s)?(feb(ruar[iy]?)?|febrero|fÃ©vrier|febbraio|fevereiro|Ï†ÎµÎ²ÏÎ¿Ï…Î±ÏÎ¯Î¿Ï…|Ñ„ÐµÐ±Ñ€ÑƒÐ°Ñ€|Ñ„ÐµÐ²Ñ€ÑƒÐ°Ñ€Ð¸|februÃ¡ra|Ãºnor)(\s.*)?$/,
							/^(.*\s)?(mar(ch)?|marzo|mars|mÃ¤rz|maart|marÃ§o|Î¼Î±ÏÏ„Î¯Î¿Ï…|Ð¼Ð°Ñ€Ñ‚|marca|bÅ™ezen)(\s.*)?$/,
							/^(.*\s)?(apr(ile?)?|abril|avril|Î±Ï€ÏÎ¹Î»Î¯Î¿Ï…|Ð°Ð¿Ñ€Ð¸Ð»|aprÃ­la|duben)(\s.*)?$/,
							/^(.*\s)?(ma(yo?|i|j)|mei|maggio|maio|Î¼Î±ÎÎ¿Ï…|Ð¼Ð°Ñ˜|Ð¼Ð°Ð¹|mÃ¡ja|kvÄ›ten)(\s.*)?$/,
							/^(.*\s)?(june?|junio?|juin|giugno|junho|Î¹Î¿Ï…Î½Î¯Î¿Ï…|Ñ˜ÑƒÐ½|ÑŽÐ½Ð¸|jÃºna|Äerven)(\s.*)?$/,
							/^(.*\s)?(jul[iy]?|julio|juillet|luglio|julho|Î¹Î¿Ï…Î»Î¯Î¿Ï…|Ñ˜ÑƒÐ»|ÑŽÐ»Ð¸|jÃºla|Äervenec)(\s.*)?$/,
							/^(.*\s)?(aug(ust(i|us)?)?|agosto|aoÃ»t|Î±Ï…Î³Î¿ÏÏƒÏ„Î¿Ï…|Ð°Ð²Ð³ÑƒÑÑ‚|augusta|srpen)(\s.*)?$/,
							/^(.*\s)?(sep(tember)?|septiembre|se[pt]tembre|setembro|ÏƒÎµÏ€Ï„ÎµÎ¼Î²ÏÎ¯Î¿Ï…|ÑÐµÐ¿Ñ‚ÐµÐ¼Ð±Ð°Ñ€|ÑÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸|septembra|zÃ¡Å™Ã­)(\s.*)?$/,
							/^(.*\s)?(o[ck]t(ober)?|oct[ou]bre|ottobre|outubro|Î¿ÎºÏ„Ï‰Î²ÏÎ¯Î¿Ï…|Ð¾ÐºÑ‚Ð¾Ð±Ð°Ñ€|Ð¾ÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸|oktÃ³bra|Å™Ã­jen)(\s.*)?$/,
							/^(.*\s)?(nov(ember)?|noviembre|novembre|novembro|Î½Î¿ÎµÎ¼Î²ÏÎ¯Î¿Ï…|Ð½Ð¾Ð²ÐµÐ¼Ð±Ð°Ñ€|Ð½Ð¾ÐµÐ¼Ð²Ñ€Ð¸|novembra|listopad)(\s.*)?$/,
							/^(.*\s)?(de[cz](ember)?|dici?embre|dÃ©cembre|dezembro|Î´ÎµÎºÎµÎ¼Î²ÏÎ¯Î¿Ï…|Ð´ÐµÑ†ÐµÐ¼Ð±Ð°Ñ€|Ð´ÐµÐºÐµÐ¼Ð²Ñ€Ð¸|decembra|prosinec)(\s.*)?$/);
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
// Detect Facebook -foREVer-
//
if (id!=0) {
	setTimeout(function() {
		if ($('#FBPPdiv') && (true || parseInt(getValue("LastConflictCheck", "0")) + 86400000 <= (new Date().getTime()))) {
			setValue('LastConflictCheck', new Date().getTime() + "");
			showDialog('<div class="fbfImportant">-foREVer- Script</div><br />' + $l('Facebook-foREVer-Conflict', 'href="http://www.code-poet.net/userscripts/-foREVer- Script/upgrading-from-facebook--foREVer-.html" target="_blank"'), '', 'small');
		}
	}, 2000);
}


//
// Debug Info
//
function showDebugInfo() {
	try {
		showDialog(
			'-foREVer- Script Debug Info:<br /><br />'+
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
registerMenuCommand($l('ConfigureFacebook-foREVer-'), showConfig);
if (menu = $('//li[@id="navAccount"]/ul',null,true)) {
	var configLink = document.createElement('li');
	configLink.innerHTML = '<a id="fbfConfigMenuLink" href="#" onclick="return false;">' + $l('ConfigureFacebook-foREVer-') + '</a>';
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
		'<div style="text-align:center;"><span class="fbfImportant">' + $l('ConfigureFacebook-foREVer-') + '</span><br /><span class="fbfNote">(-foREVer- Script ' + version + ' - ' + release_date + ' - ' + id + ')</span></div><br />'+
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
					'<tr><td><span class="fbfLabel">' + $l('ConfFacebook-foREVer-Language') + ':</span></td><td><select id="fbfConfFacebook-foREVer-Language" style="padding:0; margin-top:3px;"><option value="auto">' + $l('Automatic') + '</option><option value="cs">ÄŒeÅ¡tina (Czech)</option><option value="sr_rs">Ð¡Ñ€Ð¿ÑÐºÐ¸ (Serbian - Cyrillic)</option><option value="da">Dansk (Danish)</option><option value="el">Î•Î»Î»Î·Î½Î¹ÎºÎ¬ (Greek)</option><option value="en">English</option><option value="es">EspaÃ±ol (Spanish)</option><option value="fr">FranÃ§ais (French)</option><option value="de">Deutsch (German)</option><option value="it">Italiano (Italian)</option><option value="id">Bahasa Indonesia (Indonesian)</option><option value="mk">Ð¼Ð°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸ Ñ˜Ð°Ð·Ð¸Ðº (Macedonian)</option><option value="nl">Nederlands (Dutch)</option><option value="nb">Norsk (Norwegian)</option><option value="sk">SlovenÄina (Slovak)</option><option value="sr">Srpski (Serbian - Latin)</option><option value="vi">Tiáº¿ng Viá»‡t (Vietnamese)</option><option value="tr">TÃ¼rkÃ§e (Turkish)</option><option value="bg">Ð‘ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸ (Bulgarian)</option><option value="zh_tw">ä¸­æ–‡(å°ç£) (Chinese - Taiwan)</option><option value="ko">í•œêµ­ì–´ (Korean)</option><option value="ja">æ—¥æœ¬èªž (Japanese)</option></select></td></tr>'+
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
					'<br /><br />Custom Feed Modification (<a href="http://www.code-poet.net/userscripts/-foREVer- Script/-foREVer- Script-guide.html#custom-feed-modification" target="_blank">instructions</a>):<br /><textarea id="fbfConfCustomFeedModification" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom Feed Modification" id="SaveCustomFeedModification" />'+
					'<br /><br />Custom CSS (<a href="http://www.code-poet.net/userscripts/-foREVer- Script/-foREVer- Script-guide.html#custom-css" target="_blank">instructions</a>):<br /><textarea id="fbfConfCustomCSS" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom CSS" id="SaveCustomCSS" />'+
				'</div>'+
				'<div id="fbfConfigControl-10">'+
					'<span xmlns:dc="http://purl.org/dc/elements/1.1/" property="dc:title"><a href="http://www.code-poet.net/userscripts/facebook--foREVer-/index.html" target="_blank">-foREVer- Script</a></span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Vaughan Chandler</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike 3.0 Unported License</a>.<br /><br />Facebook is a registered trademark of Facebook, Inc.<br />-foREVer- Script is not related to or endorsed by Facebook, Inc. in any way.<br /><br /><a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0;" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><br /><b>' + $l('Translators') + ':</b><ul><li>Acedia.Liu - Chinese (Taiwan)</li><li>Caken - Czech</li><li>Connum - German</li><li>dnbace - Bulgarian</li><li>DoSMaN - Greek</li><li>Eilif Nordseth - Norwegian</li><li>Glen Farmer - Spanish</li><li>Goce Manevski - Macedonian</li><li>GÃ¶khan GurbetoÄŸlu - Turkish</li><li>Gorgeous - Italian</li><li>GorÅ¡tak - Serbian (Cyrillic and Latin)</li><li>HeartRipper - Italian</li><li>Larissa van Sunder - Dutch</li><li>Mads Jensen - Danish</li><li>Masami HIRATA - Japanese</li><li>Neo - Spanish</li><li>Peter Miksik - Slovak</li><li><li>Serge Thiry - French</li><li>Sindhu Pripamungkas - Indonesian</li><li>Tráº§n Äá»©c Thá»‹nh - Vietnamese</li><li>ë°•ìƒë¹ˆ - Korean</li></ul>'+
				'</div>'+
			'</td></tr>'+
		'</table>'+
		'<br /><hr /><div style="float:left; padding-top:8px;"><a href="http://www.code-poet.net/userscripts/facebook--foREVer-/index.html">' + $l('UpdateHomepage') + '</a></div><div style="text-align:right;"><input type="button" value="' + $l('Refresh') + '" onclick="location.reload();" /> <input type="button" id="fbfCloseConfig" value="' + $l('Close') + '" /></div>'+
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
		$('#fbfConfFacebook-foREVer-Language').value = prefs['Facebook-foREVer-Language'];
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
		
		var selects = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity','Facebook-foREVer-Language','GoogleLanguage');
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
	else if (updateForced) { alert("No update is available for -foREVer- Script."); }
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
						$('#ff-popup-pic-image').innerHTML = '<a href="' + profileLink + '"><img src="' + newSrc + '" alt="-foREVer- Script - ' + $l('LoadingPic') + '" style="max-height:' + (window.innerHeight-35) + 'px;"/></a>';
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
			container[0].appendChild(document.createTextNode(' Â· '));
			container[0].appendChild(a);
		}
		
		// photo tabs on new profiles
		else if ((container = $('.uiHeaderTitle', '#pagelet_photos_of_me')) && container[0]) {
			container[0].appendChild(document.createTextNode(' Â· '));
			container[0].appendChild(a);
		}
		
		// photo tabs on old profiles
		else if (container = $('//*[@id="photos_of_wrapper"]/preceding-sibling::* //div', null, true)) {
			container.appendChild(document.createTextNode(' Â· '));
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
							var elms = $(".//*[contains(@class,'uiUnifiedStory') and not(contains(@class,'-foREVer- Script-highlighted-story')) and (" + highlightedStoryXPath.join(' or ') + ")]", stream);
							for (var i=0; i<elms.snapshotLength; i++) { elms.snapshotItem(i).className=elms.snapshotItem(i).className + ' -foREVer- Script-highlighted-story'; }
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
								var ical = 'BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0APRODID:-foREVer- Script%0D%0A';
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

// ==Aevolution==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#30E80C";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/oyruSikusaB\"> By: Suryo Basuki</a>"
	
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
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">Like All Status</a>"
	
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
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">Unlike All Status</a>"
	
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