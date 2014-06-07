// ==UserScript==
// @name        FFixer
// @namespace   http://kehin.blogspot.com/
// @description Enhancements for Facebook: bigger profile pictures and photos, easier viewing of albums, links to download videos, showing people's age and sign, google calendar integration, keyboard shortcuts & more. Compatible with new Facebook and fully customizable!
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @author      ArdikDidianto
// @timestamp   1299644556453
// @version     2.3.1
// ==/UserScript==

// Last edited 2012-02-09

/*

This copyright section and all credits in the script must be included in modifications or redistributions of this script.

FFixer is Copyright (c) 2011, Vaughan Chandler
FFixer is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License
License information is available here: http://creativecommons.org/licenses/by-sa/3.0/

Facebook is a registered trademark of Facebook, Inc.
FFixer is not related to or endorsed by Facebook, Inc. in any way.

*/

/*

Done in 2.3.1
* Added ability to disable Facebook's photo theater.
* Improved link detection for popup pics.
* Clicking outside of FFixer's popups will close them.
* After Facebook changes broke them, fixed ability to:
* 	show big pictures.
* 	show picture titles when using 'show big pictures' in albums.
* 	use popup pictures on the "find friends" page.
* 	show people's age and sign.
* 	add birthdays to Google Calendar.
* 	hide the chat section of the home page (thanks to temperror).
* 	hide idle chat buddies in the chat popup and on the home page (thanks to Dink).
* 	show chat buddies in bold/italics based on their availability in the chat popup and on the home page (thanks to Dink).
* 	show names for chat contacts on the home page.
* 	stretch contents of the home page (thanks to RainyShadow and Texan_POd).
* 	stretch contents of the home page's middle column (previously it would only stretch the comments).
* Fixed bug preventing single quotes from being used in rules for custom feed modification.
* Fixed ability to use Google Translate feature without opening a new tab (Firefox only).
* Added links to instructions for Custom Feed Modification and Custom CSS.
* Added Indonesian translation (thanks to Sindhu Pripamungkas).
* Added Japanese translation (thanks to Masami HIRATA).
* Updated Italian localization (thanks to GorGeouS).
* Updated Slovak localization (thanks to Peter Miksik).
* General code cleanup.

TODO:
* Add ability to block "work stories" - id=318
* 	http://userscripts.org/topics/61624
* Add options for hiding/replacing parts of stories based on arbitrary text. For example:
* 	Facicons - http://userscripts.org/topics/59983
* 	Social Plus - http://www.social-plus.com/en
* Look into iso formatted dates appearing where they shouldn't
* Do some optimization, possibly including conditional advanced loading of functions
* Add option to stretch top menu - http://userscripts.org/topics/34001?page=4#posts-292732
* Some more story types need hiding - http://userscripts.org/topics/59530
* See if exporting birthdays in iCal format is still possible
* Add code to make the invite friends box bigger - I may need to change the pixel values first, possibly to percentages
* 	Yurik
* 	http://userscripts.org/topics/54809
* 	javascript:(function(){var%20o=document.getElementById('friends');var%20d=o.getElementsByClassName('disabled');if(d.length>0)for(var%20i%20in%20d)o.removeChild(d[i]);document.getElementsByClassName('generic_dialog_popup')[0].style.width='922px';document.getElementById('fb_multi_friend_selector').style.width='900px';document.getElementById('friends').style.height='410px';})()
* Check out MysticMetal's code for adding titles to images - http://userscripts.org/topics/55387?page=1
* Add delays for opening/closing the bookmarks menu
* Add option to autoclick on 'older posts' on homepage, profiles, etc
* Add option to immediately go to the popup search result if there is only one
* Increase options for filtering out photos, tags etc
* Where possible, let css changes to the home page be fluid so resizing the browser doesn't screw things up
* 	Also, just double check all the code related to stretching, left aligning etc
* Fix "search reults in new tab" option with CTRL (is the still possible?)
* Fix popup pics - alt text can't handle quotes
* Add ability to manage the lists a friend is in from their profile
* Add ability to download hi-def videos
* Add option to see seconds in fbf timestamps
* Add option to disable news feed / force live feed
* Implement cross-browser XHR
* Add option to show the thumbnail's alt/title text underneath the popup image
* Add option to change bottom menu opacity on events: mouseover, chat seesion, new message etc
* Add option to move all right column stuff on the homepage to the left column
* Add option to show current status in "whats on your mind" on the home page
* Add option to show the number of chats with unread messages to the title bar
* Modify homepage to make a "superhomepage" by moving the left and right column to a top row, with both the news feed and live feed below
* 	http://dl.getdropbox.com/u/927778/facebook%20superhomepage.png
* Show smilies in the chat box

*/


(function() {

if (self != window.top) { return; } // Don't run in frames

var version = '2.3.1';
var version_timestamp = 1299644556453; // javascript:window.alert(new Date().getTime());
var release_date = 20110209;

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
	// English - By Ardik Didianto
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
		'ConfigureFacebookFixer' : 'Configure FFixer',
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
		'ConfFacebookFixerLanguage' : 'Language for FFixer',
		'ConfFacebookTimestamps' : 'Show Facebook timestamps (eg. "3 hours ago").',
		'ConfFBFTimestamps' : 'Add FFixer timestamps after Facebook timestamps (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Show FFixer timestamps in 24-hour format.',
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
		'ConfSectionAbout' : 'About FFixer',
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
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - FFixer configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by FFixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Enable keyboard shortcuts.',
		'ConfSign' : 'Show people\'s sign on their profile (if they provide their birthdate).',
		'ConfTopBarFixed' : 'Keep the top menu bar on the screen always, even after scrolling down.',
		'ConfTopBarHoverOpacity' : 'On mouse-over',
		'ConfTopBarOpacity' : 'Top menu bar transparency',
		'ConfUpdates' : 'Check Userscripts.org daily for updates to FFixer. Or <a href="#" id="fbfUpdateLink" onclick="return false;">check now</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(This will take a while if you have a lot of friends)',
		'FacebookFixerConflict' : 'Facebook Fixer is now known as FFixer.<br /><br />Because of the name change you need to manually uninstall Facebook Fixer from your browser, or the two scripts will conflict with each other.<br /><br />If you are aren\'t sure how to uninstall a userscript, <a %s>click here for instructions</a>.',
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
		'UpdateAvailable1' : 'An update is available for FFixer',
		'UpdateAvailable2' : 'Would you like to update now?',
		'UpdateHomepage' : 'Go to homepage',
		'UpdateInstall' : 'Install now',
		'UpdateTomorrow' : 'Remind me tomorrow',
		'yearsOld' : '%s years old'
	},

	// Spanish - Contributed by Glen Farmer and Neo (20100626)
	es : {
		'_language' : 'Spanish',
		'AddToCalendar' : 'Aadir a Calendario',
		'AddToGoogleCalendar' : 'Aadir a Calendario Google',
		'all' : 'todo',
		'All' : 'Todo',
		'AllPhotosLoaded' : 'Todas las fotos han sido cargadas',
		'Automatic' : 'Automtico',
		'Birthday' : 'El cumpleaos de %s',
		'BookmarkAdd' : 'Aadir Un Marcador Nuevo',
		'BookmarkConfirmRemoval' : 'Est seguro que desea eliminar marcador "%s"?',
		'BookmarkDoesNotExist' : 'Esta pgina no ha sido marcada,\n\nVaya a la pgina que desea eliminar e intente de nuevo.',
		'BookmarkExists' : 'Ya existe un marcador para esta pgina.\n\nVaya a la pgina que desea marcar e intente de nuevo.',
		'BookmarkNamePrompt' : 'Introduzca un nombre para este el siguiente marcador:\n%s',
		'BookmarkRemove' : 'Eliminar el marcador',
		'Bookmarks' : 'Marcadores',
		'BrowserUnsupported' : 'Su navegador no soporta esta funcin.',
		'Close' : 'Cerrar',
		'ConfigureFacebookFixer' : 'Configuracin de FFixer',
		'ConfigureInstructions' : 'Todos los cambios son guardados inmediatamente, pero algunos cambios tendrn efecto en ventanas que ya estn abiertas.',
		'ConfAge' : 'Mostrar edad de las personas en sus perfiles (Solo si muestran su fecha de nacimiento).',
		'ConfAutoBigAlbumPictures' : 'Mostrar automticamente las fotos de los lbumes grandes al abrir alguno de ellos.',
		'ConfAutoLoadFullAlbum' : 'Cargar automaticamente las MINIATURAS de todas las imagenes de un lbum en una sola pgina.',
		'ConfAutoLoadTaggedPhotos' : 'Cargar automaticamente las MINIATURAS de todas las fotos etiquetadas de un usuario en una sola pgina (La pestaa Fotos de "Usuario").',
		'ConfBigAlbumPictures' : 'Aadir un enlace en la pgina de los lbumes para mostrar las versiones grandes de todas las fotos.',
		'ConfBookmarks' : 'Aadir el menu de Marcadores a la barra superior de mens',
		'ConfBottomBarHoverOpacity' : 'Al pasar el ratn por encima',
		'ConfBottomBarOpacity' : 'Transparencia de la barra de menu de abajo',
		'ConfCalendarBirthDate' : 'Incluir la fecha de cumpleaos de las personas en los detalles de los eventos.',
		'ConfCalendarFullName' : 'Usar el nombre completo de las personas para el titulo de los cumpleaos (en vez de solo el primer nombre).',
		'ConfChatDifferentiate' : 'Usar negrita y cursiva para diferenciar entre amigos disponibles y ausentes.',
		'ConfChatHideIdle' : 'Ocultar los amigos ausentes.',
		'ConfDelayPopupPics' : 'Esperar 0.5 segundos antes de ensear ventana emergente de las fotos.',
		'ConfDelayPopupPicsTimeout' : 'Retardo en mili-segundos antes de ensear las fotos (Por defecto 500 mili-segundos)',
		'ConfDownloadVideo' : 'Aadir un enlace para descargar los videos de las pginas de videos. (Puede que necesites un <a href="http://es.wikipedia.org/wiki/Flash_Video#Reproductores_FLV" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Recargar automticamente aplicaciones con errores despues de 5 segundos',
		'ConfExport' : 'Para exportar la configuracin, copie el siguiente texto y gurdelo en un archivo.',
		'ConfExternalPopup' : 'Crear una ventana emergente con las fotos externas en tamao real. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Lenguaje del FFixer',
		'ConfFacebookTimestamps' : 'Mostrar cuanto hace que fue creado (Ejemplo: "Hace 3 horas").',
		'ConfFBFTimestamps24' : 'Mostrar las marcas de tiempo de FFixer en formato 24 horas.',
		'ConfFBFTimestamps' : 'Aadir las marcas de tiempo de FFixer despus de las marcas de tiempo de Facebook (Por ejemplo "11:45").',
		'ConfFriendRequestCountInTitle' : 'Mostrar el nmero de personas esperando para ser amigos en el ttulo de la pgina.',
		'ConfGoogleApps' : 'Crear enlaces de Calendarios de Google compatibles con las Aplicaciones de Google.',
		'ConfGoogleAppsDomain' : 'Dominio',
		'ConfGoogleCalendar' : 'Mostrar enlaces para aadir cumpleaos y eventos a <a href="http://es.wikipedia.org/wiki/Google_Calendar" target="_blank">Calendarios de Google</a>.',
		'ConfGoogleLanguage' : 'Idiomas para <a href="http://es.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Ocultar los mensajes de las aplicaciones.',
		'ConfHideEventStories' : 'Ocultar los mensajes de eventos.',
		'ConfHideFanStories' : 'Ocultar los mensajes de los fan.',
		'ConfHideFriendStories' : 'Ocultar los mensajes de los amigos.',
		'ConfHideGroupStories' : 'Ocultar los mensajes de los grupos.',
		'ConfHideLinkStories' : 'Ocultar los mensajes de los vnculos.',
		'ConfHidePhotoStories' : 'Ocultar los mensajes de las fotos.',
		'ConfHideProfilePicStories' : 'Ocultar los mensajes de las fotos del perfil.',
		'ConfHideRead' : 'Ocultar los mensajes de Live Feed que han sido marcados como ledos.',
		'ConfHideRelationshipStories' : 'Ocultar mensajes de las relaciones.',
		'ConfHideStatusStories' : 'Ocultar mensajes de estado.',
		'ConfHideVideoStories' : 'Ocultar mensajes de los vdeos.',
		'ConfHideWallStories' : 'Ocultar mensajes de los muros.',
		'ConfHomeChat' : 'Mostrar la seccin de chat.',
		'ConfHomeEvents' : 'Mostrar la seccin de eventos.',
		'ConfHomeFindFriends' : 'Mostrar la seccin de "Conecta con tus amigos".',
		'ConfHomeLeftAlign' : 'Alinear a la izquierda el contenido de la pagina de inicio.',
		'ConfHomeLeftAlign' : 'Alinear a la izquierda el contenido de la pgina principal.',
		'ConfHomeLeftColumn' : 'Mostrar la columna izquierda.',
		'ConfHomeLeftColumnFixed' : 'Mantener la columna izquierda siempre visible.',
		'ConfHomeLink' : 'Mostrar el vnculo de Home en el men superior.',
		'ConfHomeNavigation' : 'Mostrar la seccin de navegacin.',
		'ConfHomePeopleYouMayKnow' : 'Mostrar la seccin sugerencia de amigos.',
		'ConfHomePokes' : 'Mostrar la seccin de Toques.',
		'ConfHomeProfile' : 'Mostrar la seccin de perfil.',
		'ConfHomeRequests' : 'Mostrar la seccin de Peticiones.',
		'ConfHomeRightColumn' : 'Mostrar la columna derecha.',
		'ConfHomeStretch' : 'Ajustar ancho de la pgina principal al tamao del navegador.',
		'ConfiCalendar' : 'Aadir enlaces para descargar un archivo <a href="http://es.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> con todos los cumpleaos.',
		'ConfImport' : 'Para importar la configuracin, pegue aqu el texto anteriormente guardado y haga clic en "Importar".',
		'ConfInboxCountInTitle' : 'Mostrar el nmero de mensajes nuevos de la bandeja de entrada en el ttulo de la pgina',
		'ConfLogoutLink' : 'Aadir vnculo para cerrar la sesin en el men superior.',
		'ConfNewTabSearch' : 'Hacer que los resultados de una busqueda se abran en una nueva pestaa al pulsar CTRL + Enter.',
		'ConfNotificationCountInTitle' : 'Mostrar el nmero de nuevas notificaciones en el ttulo de la pgina.',
		'ConfPageTitle' : 'Eliminar "Facebook |" del titulo de cada pgina.',
		'ConfPhotoPopup' : 'Ampliar foto en ventana emergente al pasar el ratn sobre ella.',
		'ConfPopupAutoClose' : 'Cerrar ventana emergente automticamente.',
		'ConfPopupPosition' : 'Posicion de la ventana emergente',
		'ConfPopupSmartAutoClose' : 'Prevenir que las ventanas emergentes se cierren automticamente cuando el ratn pase por encima de ellas.',
		'ConfProcessInterval' : 'Intervalo en mili-segundos en el cual se procesa la pgina (Por defecto 1000):',
		'ConfProfileLink' : 'Mostrar el vnculo del perfil en el men superior.',
		'ConfProfilePicPopup' : 'Ampliar foto del perfil en una ventana emergente al pasar el ratn sobre ella.',
		'ConfProtocolLinks' : 'Convertir los IDs de los programas de chats de los perfiles en enlaces para comemzar un chat (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Acerca de FFixer',
		'ConfSectionAdvanced' : 'Avanzado',
		'ConfSectionEvents' : 'Cumpleaos/Eventos',
		'ConfSectionHomePage' : 'Inicio',
		'ConfSectionImportExport' : 'Importar/Exportar',
		'ConfSectionMenu' : 'Mens/Chat',
		'ConfSectionOther' : 'Otras Opciones',
		'ConfSectionPageTitle' : 'Ttulo de la Pgina',
		'ConfSectionPictures' : 'Fotos',
		'ConfSectionShortcuts' : 'Atajos de Teclado',
		'ConfSecureLinks' : 'Hacer que los links apunten a paginas HTTPS.',
		'ConfShortcutList' : '<b>Atajos de Teclado</b> (sensible a la diferencia entre minsculas y maysculas):<br /><br /><i>Desde cualquier pgina:</i><br />&nbsp;<b>A</b> - lbumes/Fotos<br />&nbsp;<b>B</b> - Activar/Desactivar lista de amigos (Amigos conectados)<br />&nbsp;<b>C</b> - Configuracin de FFixer<br />&nbsp;<b>D</b> - Cumpleaos<br />&nbsp;<b>E</b> - Eventos<br />&nbsp;<b>F</b> - Amigos<br />&nbsp;<b>H</b> - Pgina de Inicio<br />&nbsp;<b>I</b> - Bandeja de Entrada<br />&nbsp;<b>K</b> - Aadir Marcador<br />&nbsp;<b>L</b> - Seleccionar vnculo para terminar la sesin (presione Enter despus para terminar la sesin)<br />&nbsp;<b>N</b> - Notificaciones<br />&nbsp;<b>P</b> - Perfil<br />&nbsp;<b>R</b> - Peticiones<br />&nbsp;<b>S</b> - Saltar a el campo de bsqueda<br />&nbsp;<b>T</b> - Traducir el texto seleccionado<br />&nbsp;<b>?</b> - Mostrar la informacin de depuracin de FFixer<br />&nbsp;<b><escape></b> - Cerrar la ventana emergente creada por FFixer<br /><br /><i>Desde la pgina de inicio (filtros)</i>:<br />&nbsp;<b>a</b> - Pginas<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Grupos<br />&nbsp;<b>l</b> - Vnculos<br />&nbsp;<b>n</b> - Noticias<br />&nbsp;<b>p</b> - fotos<br />&nbsp;<b>s</b> or <b>u</b> - Estatus de las Actualizaciones<br />&nbsp;<b>t</b> - Notas<br />&nbsp;<b>v</b> - Vdeos<br /><br /><i>Desde los perfiles</i>:<br />&nbsp;<b>i</b> - Informacin<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Muro<br />&nbsp;<b>x</b> - Cajas<br /><br /><i>Desde las pginas con paginacin (previo, siguiente, etc)</i><br />&nbsp;<b><left arrow></b> - Previo<br />&nbsp;<b><right arrow></b> - Siguiente<br />&nbsp;<b><shift> + <left arrow></b> - Primera (cuando este disponible)<br />&nbsp;<b><shift> + <right arrow></b> - Ultimo (cuando este disponible)<br /><br /><i>Al ver albumes/fotos:</i><br />&nbsp;<b>a</b> - Ver todas la miniaturas (cuando este disponible)<br />&nbsp;<b>b</b> - Ver fotos grandes<br />&nbsp;<b>c</b> - Ver comentarios<br />&nbsp;<b>k</b> - De vuelta al lbum<br />&nbsp;<b>m</b> - Fotos de (personas) y yo<br /><br /><i>Al ver albumes recientes y fotos subidas/marcadas:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Albumes Recientes<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Fotos de Mviles<br />&nbsp;<b>o</b> - Fotos de mi<br />&nbsp;<b>p</b> - Mis Fotos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Amigos Marcados', 'ConfTopBarHoverOpacity' : 'Al pasar el ratn por encima', 'FacebookFixerConflict' : 'Facebook Fixer ahora se llama FFixer.<br /><br />Por el cambio de nombre es necesario desinstalar Facebook Fixer manualmente de su navegador o los dos programas entraran en conflicto.<br /><br />Si no sabe como desinstalar un userscript, <a %s>haga clic aqu para ver instrucciones</a>.',
		'ConfShortcuts' : 'Abilitar los atajos de teclado.',
		'ConfSign' : 'Mostrar los signos zodiacales de las personas en sus perfiles (Si indican fecha de nacimiento).',
		'ConfTopBarFixed' : 'Mantener la barra superior de menu en la pantalla siempre.',
		'ConfTopBarHoverOpacity' : 'Al pasar el ratn por encima',
		'ConfTopBarOpacity' : 'Transparencia de la barra de menu superior',
		'ConfUpdates' : 'Revisar Userscripts.org diarimente por si hay actualizaciones en FFixer. O <a href="#" id="fbfUpdateLink" onclick="return false;">revisar Ahora</a>.',
		'CreatingFile' : 'Creando Archivo',
		'DownloadVideo' : 'Descargar el Video',
		'ExportICalendarFile' : 'Exportar el archivo de iCalendar',
		'ExportICalendarFileWarning' : '(Esto puede tardar bastante dependiendo de la cantidad de amigos)',
		'FacebookFixerConflict' : 'Facebook Fixer ahora se llama FFixer.<br /><br />Por el cambio de nombre es necesario desinstalar Facebook Fixer manualmente de su navegador o los dos programas entraran en conflicto.<br /><br />Si no sabe como desinstalar un userscript, <a %s>haga clic aqu para ver instrucciones</a>.',
		'fullAlbumLoaded' : 'lbum completamente cargado',
		'Import' : 'Importar',
		'ImportConfirm' : 'Est seguro que desea importar esta configuracin?\nPerder la configuracin actual al hacer esto.',
		'ImportFailure' : 'Ha ocurrido un error al tratar de importar la configuracin.',
		'ImportSuccess' : 'Se ha importado la configuracin. Desea refrescar la pgina?',
		'Left' : 'Izquierda',
		'LoadingAllPhotos' : 'Cargando todas las fotos...',
		'loadingFullAlbum' : 'Cargando lbumes completos...',
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
		'ShowBigPictures' : 'Mostrar Imgenes Grandes',
		'Signs' : new Array('Capricornio','Acuario','Piscis','Aries','Tauro','Gminis ','Cancer','Leo','Virgo','Libra','Escorpio','Sagitario'),
		'today' : 'hoy',
		'Translators' : 'Tranductores',
		'UpdateAvailable1' : 'Hay una actualizacin disponible para FFixer',
		'UpdateAvailable2' : 'Desea actualizar ahora?',
		'UpdateHomepage' : 'Ir a la pgina de inicio',
		'UpdateInstall' : 'Instalar ahora',
		'UpdateTomorrow' : 'Recordar maana',
		'yearsOld' : '%s aos'
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
		'ConfigureFacebookFixer' : 'Configurer FFixer',
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
		'ConfFacebookFixerLanguage' : 'Langue de FFixer',
		'ConfFacebookTimestamps' : 'Affichage de la datation Facebook (ex. "Il y a 3 heures").',
		'ConfFBFTimestamps' : 'Ajout de la datation FFixer apr&egrave;s la datation Facebook (ex. "11:45").',
		'ConfFBFTimestamps24' : 'Affichage de la datation FFixer au format 24 heures.',
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
		'ConfProcessInterval' : 'Intervalle  laquelle la page sera trait&eacute;e, en millisecondes (par d&eacute;faut=1000):',
		'ConfProfileLink' : 'Affichage du lien Profil dans la barre de menu sup&eacute;rieure.',
		'ConfProfilePicPopup' : 'Affichage de versions plus grandes des photos de profil en popup au passage de la souris',
		'ConfProtocolLinks' : 'Transforme les identifiants de messagerie des profils en liens permettant de commencer une conversation instantan&eacute;e (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'A propos de FFixer',
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
		'ConfShortcutList' : '<b>Raccourcis clavier</b> (sensible &agrave; la casse):<br /><br /><i>Sur toutes les pages:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Affichage de la liste d\'amis (amis en ligne)<br />&nbsp;<b>C</b> - Configuration de FFixer<br />&nbsp;<b>D</b> - Anniversaires<br />&nbsp;<b>E</b> - Ev&eacute;nements<br />&nbsp;<b>F</b> - Amis<br />&nbsp;<b>H</b> - Page d\'accueil<br />&nbsp;<b>I</b> - Bo&icirc;te de r&eacute;ception<br />&nbsp;<b>K</b> - Ajout d\'un marque-page<br />&nbsp;<b>L</b> - S&eacute;lection du lien de d&eacute;connection (appuyez ensuite sur Enter pour vous d&eacute;connecter)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Votre profil<br />&nbsp;<b>R</b> - Invitations<br />&nbsp;<b>S</b> - Saut au champ de recherche<br />&nbsp;<b>T</b> - Traduction du texte s&eacute;lectionn&eacute;<br />&nbsp;<b>?</b> - Affiche les informations de debug de FFixer<br />&nbsp;<b>&lt;escape&gt;</b> - Ferme les popups cr&eacute;es par FFixer<br /><br /><i>Sur la page d\'accueil (filtres)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Fil d\'actualit&eacute;s r&eacute;centes<br />&nbsp;<b>g</b> - Groupes<br />&nbsp;<b>l</b> - Liens<br />&nbsp;<b>n</b> - Fil d\'actualit&eacute;s &agrave; la une<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Changements de status<br />&nbsp;<b>t</b> - Articles<br />&nbsp;<b>v</b> - Vid&eacute;os<br /><br /><i>Sur les profils</i>:<br />&nbsp;<b>i</b> - Infos<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Mur<br />&nbsp;<b>x</b> - Encarts<br /><br /><i>Sur les pages avec pagination (pr&eacute;c&eacute;dent, suivant, etc)</i><br />&nbsp;<b>&lt;fl&egrave;che gauche&gt;</b> - Pr&eacute;c&eacute;dent<br />&nbsp;<b>&lt;fl&egrave;che droite&gt;</b> - Suivant<br />&nbsp;<b>&lt;shift&gt; + &lt;fl&egrave;che gauche&gt;</b> - Premier (si disponible)<br />&nbsp;<b>&lt;shift&gt; + &lt;fl&egrave;che droite&gt;</b> - Dernier (si disponible)<br /><br /><i>Lors de l\'affichage d\'albums/photos:</i><br />&nbsp;<b>a</b> - Chargement de tous les aper&ccedil;us (si disponible)<br />&nbsp;<b>b</b> - Affichage de plus grandes images<br />&nbsp;<b>c</b> - Affichage des commentaires<br />&nbsp;<b>k</b> - Retour &agrave; l\'album<br />&nbsp;<b>m</b> - Photos de (la personne) et de moi<br /><br /><i>Lors de l\'affichage d\'albums r&eacute;cents et de photos ajout&eacute;es/identifi&eacute;es:</i><br />&nbsp;<b>a</b> ou &nbsp;<b>r</b> - Albums r&eacute;cents<br />&nbsp;<b>m</b> ou &nbsp;<b>u</b> - Ajout depuis un mobile<br />&nbsp;<b>o</b> - Photos de moi<br />&nbsp;<b>p</b> - Mes photos<br />&nbsp;<b>t</b> ou &nbsp;<b>f</b> - Amis identifi&eacute;s',
		'ConfShortcuts' : 'Active les raccourcis clavier.',
		'ConfSign' : 'Affiche le signe zodiacal des personnes sur leur profil (si la date de naissance ins&eacute;r&eacute;e est compl&egrave;te).',
		'ConfTopBarFixed' : 'Maintien la barre de menu sup&eacute;rieure &agrave; l\'&eacute;cran, m&ecirc;me apr&egrave;s &ecirc;tre descendu dans la page.',
		'ConfTopBarHoverOpacity' : 'Au passage de la souris',
		'ConfTopBarOpacity' : 'Transparence de la barre de menu sup&eacute;rieure',
		'ConfUpdates' : 'V&eacute;rifie quotidiennement si une mise &agrave; jour de FFixer est disponible sur Userscripts.org. Ou <a href="#" id="fbfUpdateLink" onclick="return false;">v&eacute;rifier maintenant</a>.',
		'DownloadVideo' : 'T&eacute;l&eacute;charger la vid&eacute;o',
		'ExportICalendarFile' : 'Exporter en fichier iCalendar',
		'ExportICalendarFileWarning' : '(Cette op&eacute;ration prendra un moment si vous avez beaucoup d\'amis)',
		'FacebookFixerConflict' : 'FFixer est maintenant devenu FFixer. A cause du changement de nom, vous aurez besoin de d&eacute;sinstaller manuellement FFixer de votre explorateur, ou les deux scripts rentreront en conflit. Si vous n\'&ecirc;tes pas s&ucirc;r de comment faire pour d&eacute;sinstaller un userscript, <a %s>cliquez ici pour la marche &agrave; suivre</a>.',
		'fullAlbumLoaded' : 'l\'album complet est charg&eacute;',
		'Import' : 'Importer',
		'ImportConfirm' : 'Etes-vous s&ucirc;r de vouloir importer ces param&egrave;tres?\nVotre configuration actuelle sera perdue.',
		'ImportFailure' : 'Une erreur est survenue lors de l\'importation de vos param&egrave;tres.',
		'ImportSuccess' : 'Importation r&eacute;ussie. Voulez-vous recharger la page?',
		'Left' : 'Gauche',
		'ListeningRestarted' : 'FFixer s\'est remit \340 l\'\351coute des changements \351ventuels.',
		'ListeningStopped' : 'FFixer a arret\351 d\'\352tre \340 l\'\351coute des changements \351ventuels.\nAppuyez sur L (SHIFT + l) pour r\351-activer l\'\351coute',
		'LoadingAllPhotos' : 'Chargement de toutes les photos...',
		'loadingFullAlbum' : 'chargement de l\'album complet...',
		'LoadingPic' : 'Chargement de l\'image...',
		'LoadPhotosWarning' : 'Charger toutes les photos peut prendre un moment',
		'Months' : new Array('janvier','fvrier','mars','avril','mai','juin','juillet','aot','septembre','octobre','novembre','dcembre'),
		'ProtocolSkype' : 'Appeler %s via Skype',
		'ProtocolMSN' : 'Discuter avec %s via Windows Live',
		'ProtocolYahoo' : 'Discuter avec %s via Yahoo Messenger',
		'ProtocolGoogle' : 'Discuter avec %s via Google Talk',
		'ReloadErrorPage' : 'Cliquez ici pour essayer &agrave; nouveau, ou attendez 5 secondes',
		'Refresh' : 'Rafra&icirc;chir',
		'Remove' : 'Enlever',
		'Right' : 'Droite',
		'ShowBigPictures' : 'Afficher les images en plus grand',
		'Signs' : new Array('Capricorne','Verseau','Poissons','Blier','Taureau','Gmeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire'),
		'today' : 'aujourd\'hui',
		'Translators' : 'Traducteurs',
		'UpdateAvailable1' : 'Une mise &agrave; jour de FFixer est disponible',
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
		'BookmarkExists' : 'Questa pagina  gi tra i segnalibri.\n\nVai alla pagina che vuoi aggiungere e riprova.',
		'BookmarkNamePrompt' : 'Inserisci un nome per questo segnalibro:\n%s',
		'BookmarksConfirmRemoval' : 'Sei sicuro di voler rimuovere i segnalibri seguenti?',
		'BookmarksManage' : 'Manage Bookmarks',
		'BookmarksRemoveSelected' : 'Rimuovi Segnalibri Selezionati',
		'Bookmarks' : 'Segnalibri',
		'BrowserUnsupported' : 'Il tuo browser mom supporta questa funzionalita\'.',
		'CreatingFile' : 'Sto creando il file',
		'Close' : 'Chiudi',
		'ConfigureFacebookFixer' : 'Impostazioni di FFixer',
		'ConfigureInstructions' : 'I cambiamenti vengono salvati immediatamente, ma alcuni possono non avere effetto nelle schede gi aperte.',
		'ConfAge' : 'Mostra l\'et nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfApplicationWhitelist' : 'Whitelist Applicazioni - Inserisci gli ID delle applicazioni che non vuoi che vengano nascoste. Separa gli ID con uno spazio.',
		'ConfAutoBigAlbumPictures' : 'Negli album mostra automaticamente immagini pi grandi quando la pagina si apre.',
		'ConfAutoLoadFullAlbum' : 'Carica automaticamente le anteprime di tutte le immagini in un album o in una pagina.',
		'ConfAutoLoadTaggedPhotos' : 'Carica automaticamente le anteprime di tutte le foto taggate in una pagina (nella sezione "Foto" dei profili).',
		'ConfAutoReadMore' : 'Clicca automaticamente sui link "Mostra tutto".',
		'ConfBigAlbumPictures' : 'Aggiungi un link negli album per mostrare una versione pi grande di ogni foto nella pagina.',
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
		'ConfExternalPopup' : 'Mostra in un popup, al passaggio del mouse, una versione pi grande delle immagini esterne. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Lingua di FFixer',
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
		'ConfHideGroupStories' : 'Nascondi le notizie "si  iscritto al gruppo...".',
		'ConfHideHovercards' : 'Nascondi hovercard (il popup che appare quando si passa con il mouse sopra il nome di una persona).',
		'ConfHideLikeStories' : 'Nascondi i post riguardanti i "Mi piace".',
		'ConfHideLinkStories' : 'Nascondi i post riguardanti link.',
		'ConfHideNoteStories' : 'Nascondi i post riguardanti le note.',
		'ConfHidePhotoStories' : 'Nascondi i post riguardanti foto.',
		'ConfHidePlaceStories' : 'Nascondi i post riguardanti i luoghi.',
		'ConfHideProfilePicStories' : 'Nascondi i post riguardanti foto del profilo.',
		'ConfHideRead' : 'Nascondi gli elementi del live feed che sono stati segnati come gi letti.',
		'ConfHideRelationshipStories' : 'Nascondi le notizie riguardanti relazioni.',
		'ConfHideStatusStories' : 'Nascondi gli aggiornamenti di stato.',
		'ConfHideVideoStories' : 'Nascondi i post di video.',
		'ConfHideWallStories' : 'Nascondi le attivit delle bacheche.',
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
		'ConfHomeStretch' : 'Allarga la homepage affinch si adatti alla larghezza della finestra del browser.',
		'ConfHomeStretchComments' : 'Allarga la zona dei commenti sulla homepage.',
		'ConfiCalendar' : 'Aggiungi link per scaricare un file di <a href="http://it.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> con tutti i compleanni.',
		'ConfImport' : 'Successivamente, per importare le tue impostazioni, sovrascrivi il testo sottostante con quello che hai salvato precedentemente e clicca "Importa".',
		'ConfInboxCountInTitle' : 'Mostra il numero di nuovi messaggi nel titolo della pagina.',
		'ConfLogoutLink' : 'Aggiungi un link per il logout alla barra superiore',
		'ConfNotificationCountInTitle' : 'Mostra il numero di notifiche nella barra del titolo.',
		'ConfNewTabSearch' : 'Fai in modo che i risultati delle ricerche si aprano in una nuova scheda quando si preme CTRL + Invio per cercare.',
		'ConfPageTitle' : 'Rimuovi "Facebook |" dal titolo di ciascuna pagina.',
		'ConfPhotoPopup' : 'Mostra in un popup, al passaggio del mouse, una versione pi grande delle foto.',
		'ConfPopupAutoClose' : 'Chiudi i popup automaticamente.',
		'ConfPopupSmartAutoClose' : 'Non far chiudere i popup se il mouse  sopra di essi.',
		'ConfPopupPosition' : 'Posizione del popup',
		'ConfPopupWhileTagging' : 'Mostra i popup delle immagini anche sui tag.',
		'ConfProcessInterval' : 'Intervallo dopo il qualeprocessare la pagina, in millisecondi (default=1000):',
		'ConfProfileLink' : 'Mostra il link "Profilo" nella barra superiore.',
		'ConfProfilePicPopup' : 'Mostra in un popup, al passaggio del mouse, una versione pi grande delle immagini dei profili.',
		'ConfProtocolLinks' : 'Converti gli ID di messaggistica nei profili in link che iniziano una conversazione. (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Riguardo di FFixer',
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
		'ConfShortcutList' : '<b>Scorciatoie da tasiera</b> (prestare attenzione a maiuscole/minuscole):<br /><br /><i>In ogni pagina</i><br /> <b>A</b> - Album/foto<br /> <b>B</b> - Apri la lista degli amici online<br /> <b>C</b> - Impostazioni di FFixer<br /> <b>D</b> - Compleanni<br /> <b>E</b> - Eventi<br /> <b>F</b> - Amici<br /> <b>H</b> - Home page<br /> <b>I</b> - Posta in arrivo<br /> <b>K</b> - Aggiungi segnalibro<br /> <b>L</b> - Seleziona il link per effettuare il logout (poi premi Invio per effettuare il logout)<br /> <b>N</b> - Notifiche<br /> <b>P</b> - Il tuo profilo<br /> <b>R</b> - Richieste<br /> <b>S</b> - Seleziona il campo di ricerca<br /> <b>T</b> - Traduci il testo selezionato<br /> <b>?</b> - Mostra le informazioni di debug di FFixer<br /> <b><escape></b> - Chiudi i pop-up creati da FFixer<br /><br /><i>Dalla home page (filtri)</i>:<br /> <b>a</b> - Pagine<br /> <b>f</b> - Notizie in tempo reale<br /> <b>g</b> - Gruppi<br /> <b>l</b> - Link<br /> <b>n</b> - Notizie<br /> <b>p</b> - Foto<br /> <b>s</b> o <b>u</b> - Aggiornamenti di stato<br /> <b>t</b> - Note<br /> <b>v</b> - Video<br /><br /><i>Dai profili</i>:<br /> <b>i</b> - Info<br /> <b>p</b> - Foto<br /> <b>w</b> - Bacheca<br /> <b>x</b> - Riquadri<br /><br /><i>Dalle pagine con paginazione (precedente, successivo, etc)</i><br /> <b><freccia sinistra></b> - Precedente<br /> <b><freccia destra></b> - Successivo<br /> <b><shift> + <freccia sinistra></b> - Primo (Quando disponibile)<br /> <b><shift> + <freccia destra></b> - Ultimo (Quando disponibile)<br /><br /><i>Mentre si guardano album/foto:</i><br /> <b>a</b> - Carica tutte le anteprime (quando disponibile)<br /> <b>b</b> - Mostra immagini grandi<br /> <b>c</b> - Mostra i commenti<br /> <b>k</b> - Torna all\' album<br /> <b>m</b> - Foto con me<br /><br /><i>Mentre si guardano album recenti e foto appena caricate/taggate:</i><br /> <b>a</b> o  <b>r</b> - Album recenti<br /> <b>m</b> o  <b>u</b> - Upload via mobile<br /> <b>o</b> - Foto con me<br /> <b>p</b> - Le mie foto<br /> <b>t</b> o  <b>f</b> - Amici taggati',
		'ConfShortcuts' : 'Attiva le scorciatoie da tastiera.',
		'ConfSign' : 'Mostra il segno zodiacale nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfTopBarFixed' : 'Mantieni fissa la posizione della barra superiore.',
		'ConfTopBarHoverOpacity' : 'Al passaggio del mouse',
		'ConfTopBarOpacity' : 'Trasparenza della barra superiore',
		'ConfUpdates' : 'Controlla ogni giorno Userscripts.org per eventuali update, oppure <a href="#" id="fbfUpdateLink" onclick="return false;">controlla adesso!</a>.',
		'DownloadVideo' : 'Scarica il video.',
		'ExportICalendarFile' : 'Esporta file di iCalendar.',
		'ExportICalendarFileWarning' : '(Questo impiegher un po\' se hai molti amici!)',
		'FacebookFixerConflict' : 'FFixer ha cambiato nome in FFixer. A causa del cambiamento dovrai disinstallare manualmente FFixer dal tuo browser, o i due script andranno in conflitto. Se non sei sicuro di come disinstallare un userscript <a %s>clicca qui per le istruzioni</a>.',
		'fullAlbumLoaded' : 'l\'album completo  stato caricato.',
		'Import' : 'Importa',
		'ImportConfirm' : 'Sei sicuro di voler importare queste impostazioni?\nLe tue impostazioni attuali saranno sovrascritte.',
		'ImportFailure' : 'Un errore  accaduto durante l\'importazione delle impostazioni.',
		'ImportSuccess' : 'Importazione completata. Vuoi ricaricare la pagina?',
		'Left' : 'Sinistra',
		'LoadingAllPhotos' : 'Sto caricando tutte le foto...',
		'loadingFullAlbum' : 'Sto caricando l\'album completo...',
		'LoadingPic' : 'Sto caricando l\'immagine...',
		'LoadPhotosWarning' : 'Il caricamento di tutte le immagini pu richiedere qualche minuto.',
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
		'UpdateAvailable1' : ' disponibile un update per FFixer.',
		'UpdateAvailable2' : 'Vuoi scaricare l\'aggiornamento adesso?',
		'UpdateHomepage' : 'Visita la Homepage',
		'UpdateInstall' : 'Installa ora.',
		'UpdateTomorrow' : 'Ricordamelo domani.',
		'yearsOld' : '%s anni.'
	},

	// German - Contributed by Constantin Gro (20090830)
	de : {
		'_language' : 'German',
		'AddToCalendar' : 'Zu Kalender hinzuggen',
		'AddToGoogleCalendar' : 'Zu Google Kalender hinzufgen',
		'all' : 'alle',
		'All' : 'Alle',
		'AllPhotosLoaded' : 'Alle Fotos geladen',
		'Automatic' : 'Automatisch',
		'Birthday' : '%ss Geburtstag',
		'CreatingFile' : 'Erstelle Datei',
		'Close' : 'Schlieen',
		'ConfigureFacebookFixer' : 'FFixer konfigurieren',
		'ConfigureInstructions' : 'Alle nderungen werden sofort gespeichert, aber einige nderungen knnen in bereits offenen Tabs nicht angewendet werden.',
		'ConfAge' : 'Alter von Personen im Profil anzeigen (wenn das volle Geburtsdatum angegeben wurde).',
		'ConfAutoBigAlbumPictures' : 'Automatisch grere Albenbilder beim ffnen der Seite anzeigen.',
		'ConfAutoLoadFullAlbum' : 'Vorschaubilder fr alle Bilder eines Albums automatisch laden.',
		'ConfAutoLoadTaggedPhotos' : 'Vorschaubilder fr alle getaggten Bilder automatisch laden (Fotos-Tab auf der Profilseite).',
		'ConfBigAlbumPictures' : 'Link auf Albumseiten hinzfgen, ber den grere Versionen aller Bilder angezeigt werden knnen.',
		'ConfBottomBarHoverOpacity' : 'Bei Mouse-Over',
		'ConfBottomBarOpacity' : 'Transparenz der unteren Menleiste',
		'ConfCalendarBirthDate' : 'Geburtstage in Event-Details anzeigen.',
		'ConfCalendarFullName' : 'Vollstndigen Namen bei Geburtstagen anzeigen (statt nur den Vornamen).',
		'ConfChatDifferentiate' : 'Fett- und Kursiv-Formatierung zur Unterscheidung zwischen online- und offline-Freunden verwenden.',
		'ConfChatHideIdle' : 'Freunde, die offline sind verstecken.',
		'ConfDelayPopupPics' : '0,5 Sekunden warten, bevor die Popup-Bilder gezeigt werden.',
		'ConfDownloadVideo' : 'Link zum Herunterladen von Videos hinzufgen. (Es wird evtl. ein <a href="http://de.wikipedia.org/wiki/Flash_Video#Abspielen_im_Videoplayer" target="_blank">FLV-Player</a> bentigt)',
		'ConfErrorPageReload' : 'Fehlerseiten von Applikationen automatisch nach 5 Sekunden neu laden.',
		'ConfExternalPopup' : 'Externe Bilder in Originalgre im Popup anzeigen. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Sprache fr FFixer',
		'ConfGoogleApps' : 'Google Kalender Links kompatibel zu Google Apps erstellen.',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Links hinzufgen, um Geburtstage und Veranstaltungen zu <a href="http://de.wikipedia.org/wiki/Google_Kalender" target="_blank">Google Kalender</a> hinzuzufgen.',
		'ConfGoogleLanguage' : 'Sprache fr <a href="http://translate.google.de/#" target="_blank">Google bersetzer</a>',
		'ConfHomeFindFriends' : '"Mit Freunden in Verbindung treten" anzeigen.',
		'ConfHomeLeftAlign' : 'Startseiteninhalte linksorientiert ausrichten.',
		'ConfHomePeopleYouMayKnow' : '"Vorschlge" anzeigen.',
		'ConfHomePokes' : '"Anstupser" anzeigen.',
		'ConfHomeRightColumn' : 'Rechte Spalte anzeigen.',
		'ConfiCalendar' : 'Link zum herunterladen einer <a href="http://de.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-Datei mit allen Geburtstagen hinzufgen.',
		'ConfShortcutList' : '<b>Tastenkrzel</b> (Gro-/Kleinschreibung beachten!):<br /><br /><i>Auf jeder Seite:</i><br />&nbsp;<b>A</b> - Alben/Fotos<br />&nbsp;<b>B</b> - Chatliste ein-/ausblenden<br />&nbsp;<b>C</b> - FFixer Einstellungen<br />&nbsp;<b>F</b> - Freunde<br />&nbsp;<b>H</b> - Startseite<br />&nbsp;<b>I</b> - Postfach<br />&nbsp;<b>L</b> - Reagieren von FFixer auf Seitennderung ein-/ausschalten<br />&nbsp;<b>N</b> - Benachrichtigungen<br />&nbsp;<b>P</b> - Mein Profil<br />&nbsp;<b>T</b> - Markierten Text bersetzen<br />&nbsp;<b>&lt;escape&gt;</b> - Von FFixer erstellte Popups schlieen<br /><br /><i>Auf der Startseite</i>:<br />&nbsp;<b>f</b> oder <b>l</b> - Live-Feed<br />&nbsp;<b>i</b> - Posted items<br />&nbsp;<b>n</b> - News-Feed<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>s</b> oder <b>u</b> - Status-Updates<br /><br /><i>Auf Profilseiten</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Pinnwand<br />&nbsp;<b>x</b> - Felder<br /><br /><i>Auf Seiten mit Seitenzahlen (zurck, vor, etc)</i><br />&nbsp;<b>&lt;Pfeil-nach-Links&gt;</b> - Zurck<br />&nbsp;<b>&lt;Pfeil-nach-Rechts&gt;</b> - Vor<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Links&gt;</b> - Erste (wenn verfgbar)<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Rechts&gt;</b> - Letzte (wenn verfgbar)<br /><br /><i>Bei der Anzeige von Alben & Fotos:</i><br />&nbsp;<b>a</b> - Alle Vorschaubilder laden (wenn verfgbar)<br />&nbsp;<b>b</b> - Groe Bilder anzeigen<br />&nbsp;<b>c</b> - Kommentare anzeigen<br />&nbsp;<b>k</b> - Zurck zum Album<br />&nbsp;<b>m</b> - Fotos der Person und mir<br /><br /><i>Bei neuen Alben und getaggten/hochgeladenen Fotos:</i><br />&nbsp;<b>a</b> oder &nbsp;<b>r</b> - Neue Alben<br />&nbsp;<b>m</b> oder &nbsp;<b>u</b> - Mobile Uploads<br />&nbsp;<b>o</b> - Fotos von mir<br />&nbsp;<b>p</b> - Meine Fotos<br />&nbsp;<b>t</b> oder &nbsp;<b>f</b> - Getaggte Freunde',
		'ConfNewTabSearch' : 'Suchergebnisse in einem neuen Tab/Fenster ffnen, wenn fr die Suche STRG + Enter gedrckt wurde.',
		'ConfPageTitle' : '"Facebook |" berall aus dem Seitentitel entfernen.',
		'ConfPhotoPopup' : 'Grere Versionen von Fotos im Popup anzeigen, wenn sie mit der Maus berhrt werden.',
		'ConfPopupAutoClose' : 'Bilder-Popup automatisch schlieen.',
		'ConfPopupPosition' : 'Position des Bilder-Popups',
		'ConfProfilePicPopup' : 'Grere Profilbilder im Popup anzeigen, wenn sie mit der Maus berhrt werden',
		'ConfProtocolLinks' : 'Messenger-IDs der Profile in Links umwandeln, ber die eine Kommunikation gestartet werden kann (Google Talk, Windows Live etc).',
		'ConfSecureLinks' : 'HTTPS-Verbindung fr alle Facebook-Links verwenden.',
		'ConfShortcuts' : 'Tastenkrzel aktivieren. (<a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">Liste ansehen</a>)',
		'ConfSign' : 'Sternzeichen im Profil anzeigen (wenn das volle Geburtsdatum angegeben wurde).',
		'ConfTopBarFixed' : 'Obere Menleiste auch beim Scrollen anzeigen.',
		'ConfTopBarHoverOpacity' : 'Bei Mouse-Over',
		'ConfTopBarOpacity' : 'Transparenz der oberen Menleiste',
		'ConfUpdates' : 'Uberprfen Sie Userscripts.org tglich auf Updates fr FFixer. <a href="#" id="fbfUpdateLink" onclick="return false;">Jetzt berprfen</a>.',
		'DownloadVideo' : 'Video herunterladen',
		'ExportICalendarFile' : 'iCalendar-Export',
		'ExportICalendarFileWarning' : '(kann bei einer groen Zahl an Freunden eine Weile dauern)',
		'fullAlbumLoaded' : 'Album vollstndig geladen',
		'Left' : 'Links',
		'ListeningRestarted' : 'FFixer reagiert wieder auf nderungen.',
		'ListeningStopped' : 'FFixer reagiert nicht auf nderungen.\nL (SHIFT + l) drcken, um die Reaktion wieder zu aktvieren.',
		'LoadingAllPhotos' : 'Lade alle Fotos...',
		'loadingFullAlbum' : 'Lade komplettes Album...',
		'LoadingPic' : 'Lade Bild...',
		'LoadPhotosWarning' : 'Das Laden aller Bilder kann lngere Zeit dauern',
		'Months' : new Array('Januar','Februar','Mrz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'),
		'ProtocolSkype' : '%s per Skype anrufen',
		'ProtocolMSN' : 'Mit %s per Windows Live chatten',
		'ProtocolYahoo' : 'Mit %s per Yahoo Messenger chatten',
		'ProtocolGoogle' : 'Mit %s per Google Talk chatten',
		'ReloadErrorPage' : 'Klicken, um es erneut zu versuchen, oder 5 Sekunden warten',
		'Remove' : 'Entfernen',
		'Right' : 'Rechts',
		'ShowBigPictures' : 'Groe Bilder anzeigen',
		'Signs' : new Array('Steinbock','Wassermann','Fische','Widder','Stier','Zwillinge','Krebs','Lwe','Jungfrau','Waage','Skorpion','Schtze'),
		'today' : 'heute',
		'UpdateAvailable1' : 'Es gibt ein Update fr FFixer',
		'UpdateAvailable2' : 'Update jetzt herunterladen?',
		'UpdateHomepage' : 'Zur Webseite',
		'UpdateInstall' : 'Jetzt installieren',
		'UpdateTomorrow' : 'Morgen erinnern',
		'yearsOld' : '%s Jahre alt'
	},

	// Bulgarian - Contributed by Svetlozar Mladenoff (20090830)
	bg : {
		'_language' : 'Bulgarian',
		'AddToCalendar' : '  ',
		'AddToGoogleCalendar' : '  Google Calendar',
		'all' : '',
		'All' : '',
		'AllPhotosLoaded' : '   ',
		'Automatic' : '',
		'Birthday' : '   %s',
		'CreatingFile' : '  ',
		'Close' : '',
		'ConfigureFacebookFixer' : '  FFixer',
		'ConfigureInstructions' : '    ,           .',
		'ConfAge' : '   (      ).',
		'ConfAutoBigAlbumPictures' : '   -   ,    .',
		'ConfAutoLoadFullAlbum' : '        ,     .',
		'ConfAutoLoadTaggedPhotos' : '       ,      (   ).',
		'ConfBigAlbumPictures' : '              ,    .',
		'ConfBottomBarHoverOpacity' : '  ',
		'ConfBottomBarOpacity' : '   ',
		'ConfCalendarBirthDate' : '         .',
		'ConfCalendarFullName' : '           (     ).',
		'ConfChatDifferentiate' : '             .',
		'ConfChatHideIdle' : '  -.',
		'ConfDelayPopupPics' : '         .',
		'ConfDownloadVideo' : '       . (    <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV </a>)',
		'ConfErrorPageReload' : '         5 .',
		'ConfExternalPopup' : '      . <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : '  FFixer',
		'ConfGoogleApps' : '  Google Calendar ,   Google Apps.',
		'ConfGoogleAppsDomain' : '',
		'ConfGoogleCalendar' : '           <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : '  <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHomeFindFriends' : '      .',
		'ConfHomeLeftAlign' : '      .',
		'ConfHomePeopleYouMayKnow' : '   .',
		'ConfHomePokes' : '    .',
		'ConfHomeRightColumn' : '   .',
		'ConfiCalendar' : '      <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-    .',
		'ConfShortcutList' : '<b> </b> (/ ):<br /><br /><i>    :</i><br />&nbsp;<b>A</b> - /<br />&nbsp;<b>B</b> -      <br />&nbsp;<b>C</b> -   FFixer<br />&nbsp;<b>F</b> - <br />&nbsp;<b>H</b> -  <br />&nbsp;<b>I</b> -  <br />&nbsp;<b>L</b> - /  FFixer      <br />&nbsp;<b>N</b> - <br />&nbsp;<b>P</b> - <br />&nbsp;<b>T</b> -    <br />&nbsp;<b>&lt;escape&gt;</b> -    ,   FFixer<br /><br /><i>  </i>:<br />&nbsp;<b>f</b> or <b>l</b> -   <br />&nbsp;<b>i</b> - <br />&nbsp;<b>n</b> - <br />&nbsp;<b>p</b> - <br />&nbsp;<b>s</b>  <b>u</b> -   <br /><br /><i> </i>:<br />&nbsp;<b>i</b> - <br />&nbsp;<b>p</b> - <br />&nbsp;<b>w</b> - <br />&nbsp;<b>x</b> - <br /><br /><i>    (,   ..)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - <br />&nbsp;<b>&lt;right arrow&gt;</b> - <br />&nbsp;<b>&lt;Shift&gt; + &lt;left arrow&gt;</b> -  (  )<br />&nbsp;<b>&lt;Shift&gt; + &lt;right arrow&gt;</b> -  (  )<br /><br /><i>   /:</i><br />&nbsp;<b>a</b> -     (  )<br />&nbsp;<b>b</b> -    <br />&nbsp;<b>c</b> -   <br />&nbsp;<b>k</b> -   <br />&nbsp;<b>m</b> -   ()  <br /><br /><i>      / :</i><br />&nbsp;<b>a</b>  &nbsp;<b>r</b> -  <br />&nbsp;<b>m</b>  &nbsp;<b>u</b> -    <br />&nbsp;<b>o</b> -   <br />&nbsp;<b>p</b> -  <br />&nbsp;<b>t</b>  &nbsp;<b>f</b> -  ',
		'ConfNewTabSearch' : '        /,    Ctrl + Enter  .',
		'ConfPageTitle' : '  "Facebook |"     .',
		'ConfPhotoPopup' : '  -      .',
		'ConfPopupAutoClose' : '    .',
		'ConfPopupPosition' : '   ',
		'ConfProfilePicPopup' : '  -       ',
		'ConfProtocolLinks' : '  ID-    ,    (Google Talk, Windows Live  ..).',
		'ConfSecureLinks' : '  Facebook     HTTPS .',
		'ConfShortcuts' : '   . ( <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;"></a>)',
		'ConfSign' : '    (    ).',
		'ConfTopBarFixed' : '     ,   .',
		'ConfTopBarHoverOpacity' : '  ',
		'ConfTopBarOpacity' : '   ',
		'ConfUpdates' : '  Userscripts.org     FFixer.  <a href="#" id="fbfUpdateLink" onclick="return false;"> </a>.',
		'DownloadVideo' : '  ',
		'ExportICalendarFile' : '  iCalendar-',
		'ExportICalendarFileWarning' : '(   ,    )',
		'fullAlbumLoaded' : '   ',
		'Left' : '',
		'ListeningRestarted' : 'FFixer    .',
		'ListeningStopped' : 'FFixer    .\n L (Shift + l)   ',
		'LoadingAllPhotos' : '   ...',
		'loadingFullAlbum' : '   ...',
		'LoadingPic' : '  ...',
		'LoadPhotosWarning' : '        ',
		'Months' : new Array('','','','','','','','','','','',''),
		'ProtocolSkype' : '  %s  Skype',
		'ProtocolMSN' : '  %s  Windows Live',
		'ProtocolYahoo' : '  %s  Yahoo Messenger',
		'ProtocolGoogle' : '  %s  Google Talk',
		'ReloadErrorPage' : '      5 ',
		'Remove' : '',
		'Right' : '',
		'ShowBigPictures' : '   ',
		'Signs' : new Array('','','','','','','','','','','',''),
		'today' : '',
		'UpdateAvailable1' : '    FFixer',
		'UpdateAvailable2' : '    ?',
		'UpdateHomepage' : '  ',
		'UpdateInstall' : ' ',
		'UpdateTomorrow' : ' ',
		'yearsOld' : ' %s '
	},

	// Greek - Contributed by Dimitris DoSMaN Sarlis (20101024)
	el : {
		'_language' : 'Greek',
		'AddToCalendar' : '  ',
		'AddToGoogleCalendar' : '    Google',
		'all' : '',
		'All' : '',
		'AllPhotosLoaded' : '   ',
		'Automatic' : '',
		'Birthday' : ' %s',
		'BookmarkAdd' : '  ',
		'BookmarkExists' : '      .\n\n         .',
		'BookmarkNamePrompt' : '      :\n%s',
		'BookmarksConfirmRemoval' : '        ;',
		'BookmarksManage' : ' ',
		'BookmarksRemoveSelected' : '  ',
		'Bookmarks' : '',
		'BrowserUnsupported' : '       .',
		'CreatingFile' : ' ',
		'Close' : '',
		'ConfigureFacebookFixer' : ' FFixer',
		'ConfigureInstructions' : '    ,             .',
		'ConfAge' : '       (      ).',
		'ConfApplicationWhitelist' : '   -   IDs       .   IDs  .',
		'ConfAutoBigAlbumPictures' : '        .',
		'ConfAutoLoadFullAlbum' : '           .',
		'ConfAutoLoadTaggedPhotos' : '      ""     (  ,    ).',
		'ConfAutoReadMore' : '    " "',
		'ConfBigAlbumPictures' : '     ,          .',
		'ConfBigAlbumPicturesBorder' : '         .',
		'ConfBookmarks' : '      .',
		'ConfBottomBarHoverOpacity' : '    ',
		'ConfBottomBarOpacity' : '    .',
		'ConfCalendarBirthDate' : '         .',
		'ConfCalendarFullName' : '         (    ).',
		'ConfChatDifferentiate' : '           .',
		'ConfChatHideIdle' : '  .',
		'ConfDelayPopupPics' : ' 0.5      .',
		'ConfDelayPopupPicsTimeout' : '      ,     (=500):',
		'ConfDownloadVideo' : '        . (    <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '     ,   5 .',
		'ConfExport' : '     ,         .',
		'ConfExternalPopup' : '     . <sup></sup>',
		'ConfFacebookFixerLanguage' : '   FFixer',
		'ConfFacebookTimestamps' : '    Facebook (. " 3 ").',
		'ConfFBFTimestamps' : '    FFixer      Facebook (. "11:45").',
		'ConfFBFTimestamps24' : '    FFixer  24- .',
		'ConfFriendRequestCountInTitle' : '         .',
		'ConfGoogleApps' : '  Google,    Google.',
		'ConfGoogleAppsDomain' : ':',
		'ConfGoogleCalendar' : '        <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank"> Google</a>.',
		'ConfGoogleLanguage' : '  <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank"> Google</a>',
		'ConfHideApplicationStories' : '  .',
		'ConfHideEgos' : '    "" (        Facebook).',
		'ConfHideEventStories' : '  .',
		'ConfHideFacebookCountInTitle' : '       Facebook.',
		'ConfHideFriendStories' : '  .',
		'ConfHideGroupStories' : '  .',
		'ConfHideHovercards' : '   (           ).',
		'ConfHideLikeStories' : '   " ".',
		'ConfHideLinkStories' : '  .',
		'ConfHideNoteStories' : '   .',
		'ConfHidePhotoStories' : '  .',
		'ConfHidePlaceStories' : '  .',
		'ConfHideProfilePicStories' : '   .',
		'ConfHideRead' : '          .',
		'ConfHideRelationshipStories' : '  .',
		'ConfHideStatusStories' : '  .',
		'ConfHideVideoStories' : '  .',
		'ConfHideWallStories' : '  .',
		'ConfHomeBeta' : '      Facebook.',
		'ConfHomeChat' : '   .',
		'ConfHomeChatNames' : '    .',
		'ConfHomeEvents' : '   .',
		'ConfHomeFindFriends' : '   "  ".',
		'ConfHomeLeftAlign' : '      .',
		'ConfHomeLeftColumn' : '   .',
		'ConfHomeLeftColumnFixed' : '  ,       .',
		'ConfHomeLink' : '        .',
		'ConfHomeNavigation' : '   .',
		'ConfHomePokes' : '  .',
		'ConfHomeProfile' : '   .',
		'ConfHomeRecommendations' : '  (   ,   ).',
		'ConfHomeRequests' : '   .',
		'ConfHomeRightColumn' : '   .',
		'ConfHomeStretch' : '           .',
		'ConfHomeStretchComments' : '       .',
		'ConfiCalendar' : '     <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>    .',
		'ConfImport' : '      ,           "".',
		'ConfInboxCountInTitle' : '           .',
		'ConfLogoutLink' : '       .',
		'ConfNotificationCountInTitle' : '       .',
		'ConfNewTabSearch' : '          CTRL + Enter  .',
		'ConfPageTitle' : '  "Facebook |"      .',
		'ConfPhotoPopup' : '          .',
		'ConfPopupAutoClose' : '   .',
		'ConfPopupSmartAutoClose' : '         .',
		'ConfPopupPosition' : '  ',
		'ConfPopupWhileTagging' : '       .',
		'ConfProcessInterval' : '       ,    . (=1000):',
		'ConfProfileLink' : '      .',
		'ConfProfilePicPopup' : '           ',
		'ConfProtocolLinks' : '  Messenger IDs            (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : '   FFixer',
		'ConfSectionAdvanced' : ' ',
		'ConfSectionEvents' : '/',
		'ConfSectionImportExport' : '/',
		'ConfSectionFeeds' : '',
		'ConfSectionHomePage' : ' ',
		'ConfSectionLiveFeed' : ' ',
		'ConfSectionMenu' : '/',
		'ConfSectionOther' : ' ',
		'ConfSectionPageTitle' : ' ',
		'ConfSectionPictures' : '',
		'ConfSectionShortcuts' : ' ',
		'ConfSecureLinks' : '    Facebook     (HTTPS) .',
		'ConfShortcutList' : '<b> </b> ( ):<br /><br /><i>  :</i><br /> <b>A</b> - /<br /> <b>B</b> - /   ( )<br /> <b>C</b> -  FFixer<br /> <b>F</b> - <br /> <b>H</b> -  <br /> <b>I</b> - <br /> <b>K</b> -  <br /> <b>L</b> -     (  Enter     )<br /> <b>N</b> - <br /> <b>P</b> -   <br /> <b>T</b> -   <br /> <b><escape></b> -      FFixer<br /><br /><i>   </i>:<br /> <b>f</b>  <b>l</b> -  <br /> <b>i</b> -  <br /> <b>n</b> -  <br /> <b>p</b> - <br /> <b>s</b>  <b>u</b> -  <br /><br /><i> </i>:<br /> <b>i</b> - <br /> <b>p</b> - <br /> <b>w</b> - <br /> <b>x</b> - <br /><br /><i>    (, , ..)</i><br /> <b>< ></b> - <br /> <b>< ></b> - <br /> <b><shift> + < ></b> -  (  )<br /> <b><shift> + < ></b> -  (  )<br /><br /><i>   /:</i><br /> <b>a</b> -     (  )<br /> <b>b</b> -   <br /> <b>c</b> -  <br /> <b>k</b> -   <br /> <b>m</b> -   ()  <br /><br /><i>      / :</i><br /> <b>a</b>   <b>r</b> -  <br /> <b>m</b>   <b>u</b> -   <br /> <b>o</b> -   <br /> <b>p</b> -   <br /> <b>t</b>   <b>f</b> -  ',
		'ConfShortcuts' : '  .',
		'ConfSign' : '        (      ).',
		'ConfTopBarFixed' : '  ,         .',
		'ConfTopBarHoverOpacity' : '    ',
		'ConfTopBarOpacity' : '   ',
		'ConfUpdates' : ' Userscripts.org      FFixer  <a href="#" id="fbfUpdateLink" onclick="return false;"> </a>.',
		'DownloadVideo' : ' ',
		'ExportICalendarFile' : '  iCalendar',
		'ExportICalendarFileWarning' : '(        )',
		'FacebookFixerConflict' : ' FacebookFixer     FFixer.            FFixer    ,        .            userscript, <a %s>   </a>.',
		'fullAlbumLoaded' : '    ',
		'Import' : '',
		'ImportConfirm' : '        ;\n    .',
		'ImportFailure' : '      .',
		'ImportSuccess' : '  .     ;',
		'Left' : '',
		'LoadingAllPhotos' : '   ...',
		'loadingFullAlbum' : '   ...',
		'LoadingPic' : ' ...',
		'LoadPhotosWarning' : '         ',
		'Months' : new Array('','','','','','','','','','','',''),
		'ProtocolSkype' : ' %s  Skype',
		'ProtocolMSN' : '  %s  Windows Live',
		'ProtocolYahoo' : '  %s  Yahoo Messenger',
		'ProtocolGoogle' : '  %s  Google Talk',
		'ReloadErrorPage' : '      5 ',
		'Refresh' : '',
		'Remove' : '',
		'Right' : '',
		'ShowBigPictures' : '  ',
		'Signs' : new Array('','','','','','','','','','','',''),
		'today' : '',
		'Translators' : '',
		'UpdateAvailable1' : '     FFixer',
		'UpdateAvailable2' : '    ;',
		'UpdateHomepage' : '   ',
		'UpdateInstall' : ' ',
		'UpdateTomorrow' : ' ',
		'yearsOld' : '%s '
	},

	// Slovak - Contributed by Peter Miksik (20101028)
	sk : {
		'_language' : 'Slovak',
		'AddToCalendar' : 'Prida do Kalendra',
		'AddToGoogleCalendar' : 'Prida do Kalendra Google',
		'all' : 'vetko',
		'All' : 'Vetko',
		'AllPhotosLoaded' : 'Vetky fotografie natan',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narodeniny %s',
		'BookmarkAdd' : 'Prida nov zloku',
		'BookmarkExists' : 'Tto strnka u je v zlokch.\n\nPrejdite na strnku, ktor chcete prida medzi zloky a skste to znova.',
		'BookmarkNamePrompt' : 'Zadajte nzov tejto zloky:\n%s',
		'BookmarksConfirmRemoval' : 'Naozaj chcete odstrni nasledujce zloky?',
		'BookmarksManage' : 'Spravova zloky',
		'BookmarksRemoveSelected' : 'Odstrni vybran zloky',
		'Bookmarks' : 'Zloky',
		'BrowserUnsupported' : 'V prehliada tto funkciu nepodporuje.',
		'CreatingFile' : 'Vytvorenie sboru',
		'Close' : 'Zavrie',
		'ConfigureFacebookFixer' : 'Konfigurova FFixer',
		'ConfigureInstructions' : 'Vetky zmeny s ukladan okamite, ale niektor zmeny sa nemusia prejavi na kartch, ktor s u otvoren.',
		'ConfAge' : 'Zobrazi vek ud v ich profiloch (ak poskytli cel dtum narodenia)',
		'ConfApplicationWhitelist' : 'Zoznam povolench aplikci  zadajte ID aplikci, ktor chrni pred skrytm. ID oddete medzerou.',
		'ConfAutoBigAlbumPictures' : 'Automaticky pri otvoren strnky zobrazi vie obrzky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky nata miniatry vetkch obrzkov v albume na jednej strnke',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky nata miniatry vetkch fotografi s menovkou na jednej strnke (karta Fotky v profiloch ud)',
		'ConfAutoReadMore' : 'Automaticky klikn na odkazy "ta alej"',
		'ConfBigAlbumPictures' : 'Prida odkaz na strnkach albumu na zobrazenie vch verzi vetkch obrzkov na tejto strnke',
		'ConfBigAlbumPicturesBorder' : 'Prida rmek okolo vch verzi obrzkov',
		'ConfBookmarks' : 'Prida na panel vrchnej ponuky podponuku Zloky',
		'ConfBottomBarHoverOpacity' : 'Pri ukzan myou',
		'ConfBottomBarOpacity' : 'Priehadnos spodnho panela s ponukou',
		'ConfCalendarBirthDate' : 'Zahrn narodeniny osoby do podrobnost udalosti',
		'ConfCalendarFullName' : 'Poui cel meno osoby ako nzov narodenn (namiesto krstnho mena)',
		'ConfChatDifferentiate' : 'Poui tun psmo a kurzvu na rozlenie pripojench a neinnch priateov',
		'ConfChatHideIdle' : 'Skry neinnch priateov',
		'ConfDelayPopupPics' : 'Poka 0,5 sekundy pred natanm obrzkov v kontextovom okne',
		'ConfDelayPopupPicsTimeout' : 'Oneskorenie pred zobrazenm obrzkov v kontextovom okne, v milisekundch (predvolen=500):',
		'ConfDownloadVideo' : 'Prida odkaz na prevzatie vide zo strnok s videom (mono budete potrebova <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">prehrva FLV</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundch znova nata chybov strnky aplikci',
		'ConfExport' : 'Ak chcete exportova nastavenia, skoprujte dole uveden text a ulote ho do sboru.',
		'ConfExternalPopup' : 'Extern obrzky plnej vekosti v kontextovom okne <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jazyk pre Facebook Fixer',
		'ConfFacebookTimestamps' : 'Zobrazi asov znaky Facebooku (t. j. "pred 3 hodinami")',
		'ConfFBFTimestamps' : 'Prida asov znaky skriptu Facebook Fixer za asov znaky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'Zobrazi asov znaky skriptu Facebook Fixer v 24-hodinovom formte',
		'ConfFriendRequestCountInTitle' : 'Zobrazi v nzve strnky poet novch iadost o priatestvo',
		'ConfGoogleApps' : 'Vytvori odkazy pre Google Calendar kompatibiln s Google Apps',
		'ConfGoogleAppsDomain' : 'Domna',
		'ConfGoogleCalendar' : 'Prida odkazy na zaradenie narodenn a udalost do aplikcie <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pre <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Skry prspevky o aplikcich',
		'ConfHideEgos' : 'Skry vetky sekcie "ego" (malo by skry vinu odporan Facebooku)',
		'ConfHideEventStories' : 'Skry prspevky o udalostiach',
		'ConfHideFacebookCountInTitle' : 'Skry poet novch sprv na Facebooku',
		'ConfHideFriendStories' : 'Skry prspevky o priateoch',
		'ConfHideGroupStories' : 'Skry prspevky o skupinch',
		'ConfHideHovercards' : 'Skry kontextov okn zobrazujce sa po ukzan myou na men)',
		'ConfHideLikeStories' : 'Skry prspevky "Pi sa mi to"',
		'ConfHideLinkStories' : 'Skry prspevky o odkazoch',
		'ConfHideNoteStories' : 'Skry prspevky o poznmkach',
		'ConfHidePhotoStories' : 'Skry prspevky o fotkch',
		'ConfHidePlaceStories' : 'Skry prspevky o miestach',
		'ConfHideProfilePicStories' : 'Skry prspevky o profilovch fotkch',
		'ConfHideRead' : 'Skry poloky, ktor boli oznaen ako pretan',
		'ConfHideRelationshipStories' : 'Skry prspevky o stave vzahu',
		'ConfHideStatusStories' : 'Skry prspevky o statuse',
		'ConfHideVideoStories' : 'Skry prspevky o videch',
		'ConfHideWallStories' : 'Skry prspevky o nstenkch',
		'ConfHomeBeta' : 'Zobrazi as Beta Tester',
		'ConfHomeChat' : 'Zobrazi as Chat',
		'ConfHomeChatNames' : 'Zobrazi men v asti Chat',
		'ConfHomeEvents' : 'Zobrazi as Udalosti',
		'ConfHomeFindFriends' : 'Zobrazi as Spojte sa s priatemi',
		'ConfHomeLeftAlign' : 'Zarovna obsah vodnej strnky naavo',
		'ConfHomeLeftColumn' : 'Zobrazi av stpec',
		'ConfHomeLeftColumnFixed' : 'Necha av stpec viditen aj pri posvan nadol',
		'ConfHomeLink' : 'Zobrazi vo vrchnej ponuke odkaz na vodn strnku',
		'ConfHomeNavigation' : 'Zobrazi as Navigcia',
		'ConfHomePokes' : 'Zobrazi as tuchnutia',
		'ConfHomeProfile' : 'Zobrazi as Profil',
		'ConfHomeRecommendations' : 'Zobrazi odporania (udia, ktorch poznte; Odporan strnky at.)',
		'ConfHomeRequests' : 'Zobrazi as iadosti',
		'ConfHomeRightColumn' : 'Zobrazi prav stpec',
		'ConfHomeStretch' : 'Roztiahnu vodn strnku na rku okna prehadvaa',
		'ConfHomeStretchComments' : 'Roztiahnu komentre na hlavnej strnke',
		'ConfiCalendar' : 'Prida odkazy na prevzatie sboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> so vetkmi narodeninami',
		'ConfImport' : 'Ak chcete neskr importova nastavenia, prepte dole uveden text tm, ktor ste predtm uloili, a kliknite na "Import".',
		'ConfInboxCountInTitle' : 'Zobrazi v nzve strnky poet nepretanch prijatch sprv',
		'ConfLogoutLink' : 'Prida do vrchnej ponuky odkaz na odhlsenie',
		'ConfNotificationCountInTitle' : 'Zobrazi v nzve strnky poet novch upozornen',
		'ConfNewTabSearch' : 'Pri vyhadvan otvori stlaenm Ctrl+Enter vsledky hadania na novej karte/v novom okne',
		'ConfPageTitle' : 'Odstrni "Facebook |" z nzvu vetkch strnok',
		'ConfPhotoPopup' : 'Vie verzie fotiek v kontextovom okne po ukzan myou',
		'ConfPopupAutoClose' : 'Automaticky zatvra kontextov okn s obrzkami',
		'ConfPopupSmartAutoClose' : 'Zabrni autom. zatvoreniu kontextovch okien s obrzkom, ak je na nich kurzor myi',
		'ConfPopupPosition' : 'Umiestnenie kontextovho okna s obrzkom',
		'ConfPopupWhileTagging' : 'Zobrazi kontextov okn s obrzkami aj pri oznaovan',
		'ConfProcessInterval' : 'Interval spracovania strnky, v milisekundch (predvolen=1000):',
		'ConfProfileLink' : 'Zobrazi na vrchnom paneli s ponukou odkaz na profil',
		'ConfProfilePicPopup' : 'Vie verzie profilovch fotiek v kontextovom okne po ukzan myou',
		'ConfProtocolLinks' : 'Zmeni ID pre okamit sprvy na odkazy spajce konverzciu (Google Talk, Windows Live at.)',
		'ConfSectionAbout' : 'o je Facebook Fixer',
		'ConfSectionAdvanced' : 'Spresnenie',
		'ConfSectionEvents' : 'Narodeniny/Udalosti',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Novinky',
		'ConfSectionHomePage' : 'vodn strnka',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'Ponuky/Chat',
		'ConfSectionOther' : 'alie monosti',
		'ConfSectionPageTitle' : 'Nzov strnky',
		'ConfSectionPictures' : 'Obrzky',
		'ConfSectionShortcuts' : 'Klvesov skratky',
		'ConfSecureLinks' : 'Vynti zmenu odkazov Facebooku na strnky HTTPS',
		'ConfShortcutList' : '<b>Klvesov skratky</b> (rozliuj sa mal/vek psmen):<br /><br /><i>Z ubovonej strnky:</i><br /> <b>A</b>  Albumy/fotky<br /> <b>B</b>  Prepn zoznam priateov (online priatelia)<br /> <b>C</b>  Konfigurcia skriptu Facebook Fixer<br /> <b>D</b>  Narodeniny<br /> <b>E</b>  Udalosti<br /> <b>F</b>  Priatelia<br /> <b>H</b>  Domov<br /> <b>I</b>  Prijat sprvy<br /> <b>L</b>  Vybra odkaz Odhlsi sa (po odhlsen stlate Enter)<br /> <b>N</b>  Upozornenia<br /> <b>P</b>  V profil<br /> <b>R</b>  iadosti<br /> <b>S</b>  Preskoi na pole Hada<br /> <b>T</b>  Preloi vybran text<br /> <b>?</b>  Zobrazi informcie o laden skriptu Facebook Fixer<br /> <b><Esc></b>  Zavrie kontextov okn vytvoren skriptom Facebook Fixer<br /><br /><i>Zo strnky Domov (filtre)</i>:<br /> <b>a</b>  Strnky<br /> <b>f</b>  Aktuality<br /> <b>g</b>  Skupiny<br /> <b>l</b>  Odkazy<br /> <b>n</b>  Novinky<br /> <b>p</b>  Fotky<br /> <b>s</b> alebo <b>u</b>  o robia ostatn<br /> <b>t</b>  Poznmky<br /> <b>v</b>  Vide<br /><br /><i>Z profilov</i>:<br /> <b>i</b>  Informcie<br /> <b>p</b>  Fotky<br /> <b>w</b>  Nstenka<br /> <b>x</b>  Prieinky<br /><br /><i>Zo strnok s navigciou (dozadu, dopredu at.)</i><br /> <b><pka doava></b>  Dozadu<br /> <b><pka doprava></b>  Dopredu<br /> <b><shift> + <pka doava></b>  Prv (ak je k dispozcii)<br /> <b><shift> + <pka doprava></b>  Posledn (ak je k dispozcii)<br /><br /><i>Poas prezerania albumov/fotiek:</i><br /> <b>a</b>  Nata vetky miniatry (ak je k dispozcii)<br /> <b>b</b>  Zobrazi vek obrzky<br /> <b>c</b>  Zobrazi komentre<br /> <b>k</b>  Sp na album<br /> <b>m</b>  Fotky osoby a ma<br /><br /><i>Poas prezerania najnovch albumov a nahratch fotiek/fotiek s menovkou:</i><br /> <b>a</b> or  <b>r</b>  Najnovie albumy<br /> <b>m</b> alebo  <b>u</b>  Nahrat z mobilu<br /> <b>o</b>  Fotky, na ktorch som ja<br /> <b>p</b>  Moje fotky<br /> <b>t</b> alebo  <b>f</b> Menovky priateov',
		'ConfShortcuts' : 'Povoli klvesov skratky',
		'ConfSign' : 'Zobrazi znamenie ud v ich profiloch (ak poskytli svoj dtum narodenia)',
		'ConfTopBarFixed' : 'Vdy zobrazi vrchn panel s ponukou aj pri posvan strnky nadol',
		'ConfTopBarHoverOpacity' : 'Pri ukzan myou',
		'ConfTopBarOpacity' : 'Priehadnos vrchnho panela s ponukou',
		'ConfUpdates' : 'Denne na Userscripts.org overova aktualizcie pre Facebook Fixer, prpadne <a href="#" id="fbfUpdateLink" onclick="return false;">skontrolova teraz</a>.',
		'DownloadVideo' : 'Prevzia video',
		'ExportICalendarFile' : 'Exportova sbor iCalendar',
		'ExportICalendarFileWarning' : '(Ak mte mnoho priateov, me to chvu trva.)',
		'FacebookFixerConflict' : 'Facebook Fixer sa odteraz nazva FFixer.<br /><br />Pretoe sa zmenil nzov, je potrebn rune odintalova Facebook Fixer z prehliadaa, inak bud v konflikte dva skripty medzi sebou navzjom.<br /><br />Ak neviete, ako skript odintalova, <a %s>kliknutm sem otvorte pokyny</a>.',
		'fullAlbumLoaded' : 'cel album natan',
		'Import' : 'Import',
		'ImportConfirm' : 'Naozaj chcete importova tieto nastavenia?\nVae sasn nastavenia bud straten.',
		'ImportFailure' : 'Poas pokusu o import nastaven dolo k chybe.',
		'ImportSuccess' : 'Import dokonen. Chcete obnovi strnku?',
		'Left' : 'Vavo',
		'LoadingAllPhotos' : 'Natavaj sa vetky fotky...',
		'loadingFullAlbum' : 'Natava sa cel album...',
		'LoadingPic' : 'Natava sa obrzok...',
		'LoadPhotosWarning' : 'Natavanie vetkch fotiek me chvu trva',
		'Months' : new Array('Janur','Februr','Marec','Aprl','Mj','Jn','Jl','August','September','Oktber','November','December'),
		'ProtocolSkype' : 'Vola %s pomocou Skype',
		'ProtocolMSN' : 'Chatova s %s pomocou Windows Live',
		'ProtocolYahoo' : 'Chatova s %s pomocou Yahoo Messenger',
		'ProtocolGoogle' : 'Chatova s %s pomocou Google Talk',
		'ReloadErrorPage' : 'Kliknite na Sksi znova alebo pokajte 5 seknd',
		'Refresh' : 'Obnovi',
		'Remove' : 'Odstrni',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'Zobrazi vek obrzky',
		'Signs' : new Array('Kozoroec','Vodnr','Ryba','Baran','Bk','Blenci','Rak','Lev','Panna','Vhy','korpin','Strelec'),
		'today' : 'dnes',
		'Translators' : 'Prekladatelia',
		'UpdateAvailable1' : 'K dispozcii je aktualizcia skriptu Facebook Fixer.',
		'UpdateAvailable2' : 'Chcete aktualizova teraz?',
		'UpdateHomepage' : 'Prejs na dom. strnku',
		'UpdateInstall' : 'Naintalova',
		'UpdateTomorrow' : 'Pripomen zajtra',
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
		'CreatingFile' : 'Folder creren',
		'Close' : 'Sluit',
		'ConfigureFacebookFixer' : 'Configureer FFixer',
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
		'ConfChatDifferentiate' : 'Gebruik dikgedrukt en cursief om te differentiren tussen beschikbaar en niet beschikbaar.',
		'ConfChatHideIdle' : 'Verberg niet beschikbare vrienden.',
		'ConfDelayPopupPics' : 'Een vertraging toevoegen voor het laten zien van popup foto\'s.',
		'ConfDelayPopupPicsTimeout' : 'Vertraging voor het laten zien van popup foto\'s, in milliseconden (standaard=500):',
		'ConfDownloadVideo' : 'Een link toevoegen voor het downloaden van videos van video pagina\'s. (Je hebt misschien een <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV speler</a> nodig)',
		'ConfErrorPageReload' : 'Automatisch toepassingen error pagina\'s reloaden.',
		'ConfExternalPopup' : 'Popup versies in volledige grootte van externe illustraties. <sup>experimenteel</sup>',
		'ConfFacebookFixerLanguage' : 'Taal voor FFixer',
		'ConfFacebookTimestamps' : 'Laat Facebook timestamps zien (bijv. "3 uur geleden").',
		'ConfFBFTimestamps' : 'FFixer timestamps toevoegen na Facebook timestamps (bijv. "11:45").',
		'ConfFBFTimestamps24' : 'Laat FFixer timestamps zien in 24-uurs formaat.',
		'ConfGoogleApps' : 'Crer Google Calendar links die werken met Google Apps.',
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
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - FFixer configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by FFixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Toestaan van sneltoetsen.',
		'ConfSign' : 'Laat mensen hun sterrenbeeld op hun profiel zien (wanneer zij hun geboortedatum aangeven).',
		'ConfTopBarFixed' : 'Behoud de top meny bar op het scherm, zelfs bij het naar beneden scrollen.',
		'ConfTopBarHoverOpacity' : 'Bij overscrollen',
		'ConfTopBarOpacity' : 'Top menu bar transparentie',
		'ConfUpdates' : 'Check Userscripts.org dagelijks voor updates naar FFixer. Of <a href="#" id="fbfUpdateLink" onclick="return false;">check nu</a>.',
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
		'UpdateAvailable1' : 'Een update is beschikbaar voor FFixer',
		'UpdateAvailable2' : 'Will je nu updaten?',
		'UpdateHomepage' : 'Ga naar startpagina',
		'UpdateInstall' : 'Nu installeren',
		'UpdateTomorrow' : 'Herinner me morgen',
		'yearsOld' : '%s jaar oud'
	},

	// Chinese (Taiwan) - Contributed by By Acedia.Liu (20100422)
	zh_tw : {
		'_language' : 'Chinese (Taiwan)',
		'AddToCalendar' : '',
		'AddToGoogleCalendar' : 'Google',
		'all' : '',
		'All' : '',
		'AllPhotosLoaded' : '',
		'Automatic' : '',
		'Birthday' : '%s\',
		'BookmarkAdd' : '',
		'BookmarkConfirmRemoval' : ' "%s"?',
		'BookmarkDoesNotExist' : '\n\n',
		'BookmarkExists' : '\n\n',
		'BookmarkNamePrompt' : '\n%s',
		'BookmarkRemove' : '',
		'Bookmarks' : '',
		'BrowserUnsupported' : '',
		'CreatingFile' : '',
		'Close' : '',
		'ConfigureFacebookFixer' : ' FFixer',
		'ConfigureInstructions' : '',
		'ConfAge' : '\',
		'ConfAutoBigAlbumPictures' : '',
		'ConfAutoLoadFullAlbum' : '',
		'ConfAutoLoadTaggedPhotos' : ' (\)',
		'ConfAutoReadMore' : '""',
		'ConfBigAlbumPictures' : '',
		'ConfBookmarks' : '',
		'ConfBottomBarHoverOpacity' : 'On mouse-over',
		'ConfBottomBarOpacity' : '',
		'ConfCalendarBirthDate' : '\',
		'ConfCalendarFullName' : '\ (first name)',
		'ConfChatDifferentiate' : '',
		'ConfChatHideIdle' : '',
		'ConfDelayPopupPics' : '',
		'ConfDelayPopupPicsTimeout' : '(=500):',
		'ConfDownloadVideo' : ' ( <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '5',
		'ConfExport' : '',
		'ConfExternalPopup' : ' <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'FFixer',
		'ConfFacebookTimestamps' : 'Facebook (eg. "3 hours ago").',
		'ConfFBFTimestamps' : 'FFixer (eg. "11:45").',
		'ConfFBFTimestamps24' : 'FFixer24',
		'ConfFriendRequestCountInTitle' : '',
		'ConfGoogleApps' : 'GoogleGoogle',
		'ConfGoogleAppsDomain' : '',
		'ConfGoogleCalendar' : ' <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : ' <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : '',
		'ConfHideEventStories' : '',
		'ConfHideFanStories' : '',
		'ConfHideFriendStories' : '',
		'ConfHideGroupStories' : '',
		'ConfHideLinkStories' : '',
		'ConfHidePhotoStories' : '',
		'ConfHideProfilePicStories' : '',
		'ConfHideRead' : '',
		'ConfHideRelationshipStories' : '',
		'ConfHideStatusStories' : '',
		'ConfHideVideoStories' : '',
		'ConfHideWallStories' : '',
		'ConfHomeChat' : '',
		'ConfHomeEvents' : '',
		'ConfHomeFindFriends' : '',
		'ConfHomeLeftAlign' : '',
		'ConfHomeLeftColumn' : '',
		'ConfHomeLeftColumnFixed' : '',
		'ConfHomeLink' : '',
		'ConfHomePeopleYouMayKnow' : '',
		'ConfHomeNavigation' : '',
		'ConfHomePokes' : '',
		'ConfHomeProfile' : '',
		'ConfHomeRequests' : '',
		'ConfHomeRightColumn' : '',
		'ConfHomeStretch' : '',
		'ConfiCalendar' : ' <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> file with all birthdays.',
		'ConfImport' : '"Import"',
		'ConfInboxCountInTitle' : '',
		'ConfLogoutLink' : '',
		'ConfNotificationCountInTitle' : '',
		'ConfNewTabSearch' : ' CTRL + Enter ',
		'ConfPageTitle' : ' "Facebook |" ',
		'ConfPhotoPopup' : '',
		'ConfPopupAutoClose' : '',
		'ConfPopupSmartAutoClose' : '',
		'ConfPopupPosition' : '',
		'ConfProcessInterval' : ' (=1000):',
		'ConfProfileLink' : '',
		'ConfProfilePicPopup' : '',
		'ConfProtocolLinks' : 'ID (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : ' FFixer',
		'ConfSectionAdvanced' : '',
		'ConfSectionEvents' : '/',
		'ConfSectionFeeds' : '',
		'ConfSectionHomePage' : '',
		'ConfSectionImportExport' : '/',
		'ConfSectionLiveFeed' : '',
		'ConfSectionMenu' : '/',
		'ConfSectionOther' : '',
		'ConfSectionPageTitle' : '',
		'ConfSectionPictures' : '',
		'ConfSectionShortcuts' : '',
		'ConfSecureLinks' : ' Facebook  HTTPS ',
		'ConfShortcutList' : '<b></b> ():<br /><br /><i>:</i><br />&nbsp;<b>A</b> - /<br />&nbsp;<b>B</b> -  ()<br />&nbsp;<b>C</b> - FFixer <br />&nbsp;<b>D</b> - <br />&nbsp;<b>E</b> - <br />&nbsp;<b>F</b> - <br />&nbsp;<b>H</b> - <br />&nbsp;<b>I</b> - <br />&nbsp;<b>L</b> -  ()<br />&nbsp;<b>N</b> - <br />&nbsp;<b>P</b> - <br />&nbsp;<b>R</b> - <br />&nbsp;<b>S</b> - <br />&nbsp;<b>T</b> - <br />&nbsp;<b>?</b> - FFixer<br />&nbsp;<b>&lt;escape&gt;</b> - FFixer<br /><br /><i> ()</i>:<br />&nbsp;<b>a</b> - <br />&nbsp;<b>f</b> - <br />&nbsp;<b>g</b> - <br />&nbsp;<b>l</b> - <br />&nbsp;<b>n</b> - <br />&nbsp;<b>p</b> - <br />&nbsp;<b>s</b> or <b>u</b> - <br />&nbsp;<b>t</b> - <br />&nbsp;<b>v</b> - <br /><br /><i></i>:<br />&nbsp;<b>i</b> - <br />&nbsp;<b>p</b> - <br />&nbsp;<b>w</b> - <br />&nbsp;<b>x</b> - <br /><br /><i> (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - <br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> -  ()<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> -  ()<br /><br /><i>/:</i><br />&nbsp;<b>a</b> -  ()<br />&nbsp;<b>b</b> - <br />&nbsp;<b>c</b> - <br />&nbsp;<b>k</b> - <br />&nbsp;<b>m</b> -  () <br /><br /><i>/:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - <br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - <br />&nbsp;<b>o</b> - <br />&nbsp;<b>p</b> - <br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - ',
		'ConfShortcuts' : '',
		'ConfSign' : '\  ()',
		'ConfTopBarFixed' : '',
		'ConfTopBarHoverOpacity' : '',
		'ConfTopBarOpacity' : '',
		'ConfUpdates' : ' Userscripts.org For FFixer   <a href="#" id="fbfUpdateLink" onclick="return false;"></a>.',
		'DownloadVideo' : '',
		'ExportICalendarFile' : ' iCalendar ',
		'ExportICalendarFileWarning' : '()',
		'FacebookFixerConflict' : 'Facebook FixerFFixer<br /><br />Facebook Fixer<br /><br /> <a %s></a>.',
		'fullAlbumLoaded' : '',
		'Import' : '',
		'ImportConfirm' : '',
		'ImportFailure' : '',
		'ImportSuccess' : '',
		'Left' : '',
		'LoadingAllPhotos' : '...',
		'loadingFullAlbum' : '...',
		'LoadingPic' : '...',
		'LoadPhotosWarning' : '',
		'Months' : new Array('','','','','','','','','','','',''),
		'ProtocolSkype' : ' %s  Skype',
		'ProtocolMSN' : ' %s  MSN',
		'ProtocolYahoo' : ' %s  Yahoo ',
		'ProtocolGoogle' : ' %s  Google Talk',
		'ReloadErrorPage' : ', 5',
		'Refresh' : '',
		'Remove' : '',
		'Right' : '',
		'ShowBigPictures' : '',
		'Signs' : new Array('','','','','','','','','','','',''),
		'today' : 'today',
		'UpdateAvailable1' : 'FFixer ',
		'UpdateAvailable2' : '',
		'UpdateHomepage' : '',
		'UpdateInstall' : '',
		'UpdateTomorrow' : '',
		'yearsOld' : '%s '
	},

	// Turkish - Contributed by Gkhan Gurbetolu (20100817)
	tr : {
		'_language' : 'Turkish',
		'AddToCalendar' : 'Takvime Ekle',
		'AddToGoogleCalendar' : 'Google Takvim\'e Ekle',
		'all' : 'tm',
		'All' : 'Tm',
		'AllPhotosLoaded' : 'Tm fotoraflar yklendi',
		'Automatic' : 'Otomatik',
		'Birthday' : '%s Doumgn',
		'BookmarkAdd' : 'Yeni Yer mi Ekle',
		'BookmarkExists' : 'Bu sayfa iin zaten bir yer imi var. \n\nYer imlerine eklemek istediiniz sayfaya gidin ve tekrar deneyin.',
		'BookmarkNamePrompt' : 'Bu yer imi iin bir isim girin:\n%s',
		'BookmarksConfirmRemoval' : 'Bu yer imlerini kaldrmak istediinize emin misiniz?',
		'BookmarksManage' : 'Yer mlerini Ynet',
		'BookmarksRemoveSelected' : 'Seili Yer mlerini Kaldr',
		'Bookmarks' : 'Yer mleri',
		'BrowserUnsupported' : 'Taraycnz bu zellii desteklemiyor.',
		'CreatingFile' : 'Dosya Oluturuluyor',
		'Close' : 'Kapat',
		'ConfigureFacebookFixer' : 'FFixer\' Yaplandr',
		'ConfigureInstructions' : 'Btn deiiklikler hemen kaydedilir ancak baz deiiklikler halen ak olan sekmelerde etkisini gstermeyebilir.',
		'ConfAge' : 'Kiilerin yan profillerinde gster (eer tam doum tarihlerini belirtmilerse).',
		'ConfAlbumComments' : 'Albmde yaplm tm yorumlar grmek iin albm sayfalarna bir balant ekle.',
		'ConfApplicationWhitelist' : 'Uygulama Beyaz Listesi - Gizlenmesini istemediiniz uygulamalarn ID numaralarn girin. Birden fazla ID iin aralara boluk brakn.',
		'ConfAutoBigAlbumPictures' : 'Byk albm resimlerini sayfa aldnda otomatik olarak gster.',
		'ConfAutoLoadFullAlbum' : 'Bir albmdeki tm kk resimleri otomatik olarak tek sayfada ykle.',
		'ConfAutoLoadTaggedPhotos' : 'Tm etiketlenmi fotoraflar iin kk resimleri otomatik olarak tek sayfada ykle (kiilerin profilindeki fotoraflar sekmesi)',
		'ConfAutoReadMore' : '"Devamn gr" balantlarna otomatik olarak tkla.',
		'ConfBigAlbumPictures' : 'Albm sayfalarna btn resimlerin byk srmlerini tek sayfada gstermek iin bir balant ekle.',
		'ConfBookmarks' : 'st men ubuuna bir Yer mleri alt mens ekle.',
		'ConfBottomBarHoverOpacity' : 'Fare stne geldiinde',
		'ConfBottomBarOpacity' : 'Alt men ubuu effafl',
		'ConfCalendarBirthDate' : 'Etkinlik ayrntlar kiinin doumgnn iersin.',
		'ConfCalendarFullName' : 'Doumgnleri iin kiinin tam adn kullan (sadece ilk adn kullanmak yerine).',
		'ConfChatDifferentiate' : 'evrimii ve botaki arkadalar ayrt etmek iin kaln ve italik yaztipi kullan.',
		'ConfChatHideIdle' : 'Botaki arkadalar gizle.',
		'ConfDelayPopupPics' : 'Alr pencerede resimleri gstermeden nce ksa bir gecikme zaman ekle.',
		'ConfDelayPopupPicsTimeout' : 'Alr pencerede resimleri gstermeden nceki gecikme, milisaniye olarak (varsaylan=500):',
		'ConfDownloadVideo' : 'Video sayfalarndaki videolar indirmek iin bir balant ekle. (Bir <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV oynatc</a>\'ya ihtiyacnz olabilir)',
		'ConfErrorPageReload' : 'Uygulama hata sayfalarn 5 saniye sonra otomatik olarak yenile.',
		'ConfExport' : 'Ayarlarnz da aktarmak iin aadaki metni kopyalayn ve bir dosyaya kaydedin.',
		'ConfExternalPopup' : 'Harici sitelerdeki fotoraflarn byk srmn gster. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'FFixer\'n Dili',
		'ConfFacebookTimestamps' : 'Facebook\'un zaman etiketlerini gster (rn. "3 saat nce").',
		'ConfFBFTimestamps' : 'Facebook\'un zaman etiketlerinin ardndan FFixer zaman etiketlerini ekle (rn. "11:45").',
		'ConfFBFTimestamps24' : 'FFixer zaman etiketlerini 24-saat biiminde gster',
		'ConfFriendRequestCountInTitle' : 'Sayfa balnda yeni arkadalk isteklerinin saysn gster.',
		'ConfGoogleApps' : 'Google Apps ile uyumlu Google Takvim balantlar olutur.',
		'ConfGoogleAppsDomain' : 'Etki Alan',
		'ConfGoogleCalendar' : '<a href="http://tr.wikipedia.org/wiki/Google_Takvim" target="_blank">Google Takvim</a>\'e doumgn ve etkinlikler ekleyebilmek iin balantlar olutur.',
		'ConfGoogleLanguage' : '<a href="http://tr.wikipedia.org/wiki/Google_%C3%87eviri" target="_blank">Google eviri</a> iin dil',
		'ConfHideApplicationStories' : 'Uygulama haberlerini gizle.',
		'ConfHideEventStories' : 'Etkinlik haberlerini gizle.',
		'ConfHideFacebookCountInTitle' : 'Facebook\'un yeni mesaj says gsterimini gizle.',
		'ConfHideFriendStories' : 'Arkadalk haberlerini gizle.',
		'ConfHideGroupStories' : 'Grup haberlerini gizle.',
		'ConfHideLikeStories' : 'Beenme haberlerini gizle.',
		'ConfHideLinkStories' : 'Balant haberlerini gizle.',
		'ConfHideNoteStories' : 'Not haberlerini gizle.',
		'ConfHidePhotoStories' : 'Fotoraf haberlerini gizle.',
		'ConfHideProfilePicStories' : 'Profil resmi haberlerini gizle.',
		'ConfHideRead' : 'Canl haberlerdeki okundu olarak iaretlenmi eleri gizle.',
		'ConfHideRelationshipStories' : 'liki haberlerini gizle.',
		'ConfHideStatusStories' : 'Durum haberlerini gizle.',
		'ConfHideVideoStories' : 'Video haberlerini gizle.',
		'ConfHideWallStories' : 'Duvar hikayelerini gizle.',
		'ConfHomeBeta' : 'Facebook n Gsterim blmesini gster.',
		'ConfHomeChat' : 'Sohbet blmesini gster.',
		'ConfHomeEvents' : 'Etkinlik blmesini gster.',
		'ConfHomeFindFriends' : 'Arkadalarnla Balant Kur blmesini gster.',
		'ConfHomeLeftAlign' : 'Ana sayfa ieriini sola yasla.',
		'ConfHomeLeftColumn' : 'Sol stunu gster.',
		'ConfHomeLeftColumnFixed' : 'Sayfa aa kaydrlsa bile sol stunu grnr tut.',
		'ConfHomeLink' : 'st men ubuunda Ana Sayfa balantsn gster.',
		'ConfHomeNavigation' : 'Dolama blmesini gster.',
		'ConfHomePokes' : 'Drtme blmesini gster.',
		'ConfHomeProfile' : 'Profil blmesini gster.',
		'ConfHomeRecommendations' : 'Tavsiyeleri gster (Tanyor Olabilecein Kiiler, Tavsiye Edilen Sayfalar, vs.).',
		'ConfHomeRequests' : 'stekler blmesini gster.',
		'ConfHomeRightColumn' : 'Sa stunu gster.',
		'ConfHomeStretch' : 'Ana sayfay taraycnn geniliine sacak ekilde uzat.',
		'ConfHomeStretchComments' : 'Ana sayfadaki yorumlar uzat.',
		'ConfiCalendar' : 'Btn doumgnlerini ieren bir <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> dosyas indirmek iin balantlar ekle.',
		'ConfImport' : 'leride ayarlarnz ie aktarmak iin, daha nce kaydettiiniz metni aadaki metnin yerine yaptrn ve "e Aktar"a tklayn.',
		'ConfInboxCountInTitle' : 'Sayfa balnda gelen kutusundaki okunmam mesaj saysn gster.',
		'ConfLogoutLink' : 'st men ubuuna bir k balants ekle.',
		'ConfNotificationCountInTitle' : 'Sayfa balnda bildirimlerin saysn gster.',
		'ConfNewTabSearch' : 'CTRL + Enter basarak arama yapldnda arama sonularn yeni bir sekmede/pencerede a.',
		'ConfPageTitle' : 'Btn sayfalarn balndan "Facebook |" yazsn kaldr.',
		'ConfPhotoPopup' : 'Fareyle stne gelindiinde fotoraflarn byk srmlerini gster.',
		'ConfPopupAutoClose' : 'Alan pencere resimlerini otomatik olarak kapat.',
		'ConfPopupSmartAutoClose' : 'Alan pencere resimlerinin fare zerindeyken otomatik olarak kapanmasn engelle.',
		'ConfPopupPosition' : 'Alan pencere resimlerinin konumu',
		'ConfProcessInterval' : 'Sayfay ilemek iin zaman aral, milisaniye olarak (varsaylan=1000):',
		'ConfProfileLink' : 'st men ubuunda Profil balantsn gster.',
		'ConfProfilePicPopup' : 'Fareyle stne gelindiinde profil resimlerinin byk srmlerini gster',
		'ConfProtocolLinks' : 'Profillerdeki anlk ileti adreslerini annda iletiim kurulabilecek balantlara dntr (Google Talk, Windows Live, vb.).',
		'ConfSectionAbout' : 'FFixer Hakknda',
		'ConfSectionAdvanced' : 'Gelimi',
		'ConfSectionEvents' : 'Doumgnleri/Etkinlikler',
		'ConfSectionImportExport' : 'e/Da Aktar',
		'ConfSectionFeeds' : 'Kaynaklar',
		'ConfSectionHomePage' : 'Ana Sayfa',
		'ConfSectionLiveFeed' : 'Canl Haberler',
		'ConfSectionMenu' : 'Menler/Sohbet',
		'ConfSectionOther' : 'Dier Seenekler',
		'ConfSectionPageTitle' : 'Sayfa Bal',
		'ConfSectionPictures' : 'Resimler',
		'ConfSectionShortcuts' : 'Klavye Ksayollar',
		'ConfSecureLinks' : 'Facebook balantlarn HTTPS sayfalarn kullanmaya zorla.',
		'ConfShortcutList' : '<b>Klavye Ksayollar</b> (byk/kk harf duyarl):<br /><br /><i>Herhangi bir sayfadan:</i><br /> <b>A</b> - Albmler/fotoraflar<br /> <b>B</b> - Arkada listesini a/kapa (evrimii arkadalar)<br /> <b>C</b> - FFixer yaplandrmas<br /> <b>D</b> - Doumgnleri<br /> <b>E</b> - Etkinlikler<br /> <b>F</b> - Arkadalar<br /> <b>H</b> - Ana Sayfa<br /> <b>I</b> - Gelen Kutusu<br /> <b>L</b> - k balantsn se (k yapmak iin bundan sonra Enter\'a basn)<br /> <b>N</b> - Bildirimler<br /> <b>P</b> - Profiliniz<br /> <b>R</b> - stekler<br /> <b>S</b> - Arama alanna git<br /> <b>T</b> - Seili metni tercme et<br /> <b>?</b> - FFixer hata ayklama bilgisini gster<br /> <b><escape></b> - FFixer tarafndan alm pencereleri kapat<br /><br /><i>Ana sayfadan (filtreler):</i><br /> <b>a</b> - Sayfalar<br /> <b>f</b> - Canl Haberler<br /> <b>g</b> - Gruplar<br /> <b>l</b> - Balantlar<br /> <b>n</b> - Haber Kayna<br /> <b>p</b> - Fotoraflar<br /> <b>s</b> veya <b>u</b> - Durum gncellemeleri<br /> <b>t</b> - Notlar<br /> <b>v</b> - Videolar<br /><br /><i>Profil sayfalarndan:</i><br /> <b>i</b> - Bilgi<br /> <b>p</b> - Fotoraflar<br /> <b>w</b> - Duvar<br /> <b>x</b> - Kutular<br /><br /><i>Numaralandrlm sayfalardan (nceki, sonraki, vb.):</i><br /> <b><sol ok></b> - nceki<br /> <b><sa ok></b> - Sonraki<br /> <b><shift> + <sol ok></b> - lk (eer mevcutsa)<br /> <b><shift> + <sa ok></b> - Son (eer mevcutsa)<br /><br /><i>Albmleri/fotoraflar grntlerken:</i><br /> <b>a</b> - Tm kk resimleri ykle (eer mevcutsa)<br /> <b>b</b> - Byk resimleri gster<br /> <b>c</b> - Yorumlar gster<br /> <b>k</b> - Albme geri dn<br /> <b>m</b> - (Kii) ve benim fotoraflarm<br /><br /><i>Yakn zamanlardaki albmleri ve yklenmi/etiketlenmi fotoraflar grntlerken:</i><br /> <b>a</b> veya  <b>r</b> - Yakn Zamandaki Albmler<br /> <b>m</b> veya  <b>u</b> - Mobil yklemeler<br /> <b>o</b> - Benim olduum fotoraflar<br /> <b>p</b> - Fotoraflarm<br /> <b>t</b> veya  <b>f</b> - Etiketlenmi arkadalar',
		'ConfShortcuts' : 'Klavye ksayollarn etkinletir.',
		'ConfSign' : 'Profillerde kiilerin burlarn gster (eer doum tarihlerini belirtmilerse).',
		'ConfTopBarFixed' : 'Sayfa aa kaydrlsa bile st men ubuunu ekranda tut.',
		'ConfTopBarHoverOpacity' : 'Fare stne geldiinde',
		'ConfTopBarOpacity' : 'st men ubuu effafl',
		'ConfUpdates' : 'FFixer gncellemeleri iin her gn Userscripts.org\'u ziyaret et. Ya da <a href="#" id="fbfUpdateLink" onclick="return false;">imdi kontrol et</a>.',
		'DownloadVideo' : 'Videoyu ndir',
		'ExportICalendarFile' : 'iCalendar dosyas aktar',
		'ExportICalendarFileWarning' : '(Eer ok arkadanz varsa bu biraz uzun srebilir)',
		'FacebookFixerConflict' : 'FFixer\'n yeni ad artk FFixer. sim deiikliinden dolay FFixer\' taraycnzdan kaldrmanz gerekiyor, yoksa bu iki script birbiriyle uyumazlk sorunlar karacaktr. Eer bir userscript\'i nasl kaldracanzdan emin deilseniz <a %s>buraya tklayarak renebilirsiniz</a>.',
		'fullAlbumLoaded' : 'btn albm yklendi',
		'Import' : 'e Aktar',
		'ImportConfirm' : 'Bu ayarlar ie aktarmak istediinize emin misiniz?\nMevcut ayarlarnz silinecek.',
		'ImportFailure' : 'Ayarlarnz ie aktarmaya alrken bir hata olutu.',
		'ImportSuccess' : 'e aktarma tamamland. Sayfay yenilemek ister misiniz?',
		'Left' : 'Sol',
		'LoadingAllPhotos' : 'Tm fotoraflar ykleniyor...',
		'loadingFullAlbum' : 'tm albm ykleniyor...',
		'LoadingPic' : 'Resim Ykleniyor...',
		'LoadPhotosWarning' : 'Tm fotoraflar yklemek uzun zaman alabilir',
		'Months' : new Array('Ocak','ubat','Mart','Nisan','Mays','Haziran','Temmuz','Austos','Eyll','Ekim','Kasm','Aralk'),
		'ProtocolSkype' : '%s kiisini Skype kullanarak ara',
		'ProtocolMSN' : '%s ile Windows Live kullanarak sohbet et',
		'ProtocolYahoo' : '%s ile Yahoo Messenger kullanarak sohbet et',
		'ProtocolGoogle' : '%s ile Google Talk kullanarak sohbet et',
		'ReloadErrorPage' : 'Yeniden denemek iin tklayn, ya da 5 saniye bekleyin',
		'Refresh' : 'Yenile',
		'Remove' : 'Kaldr',
		'Right' : 'Sa',
		'ShowBigPictures' : 'Byk Resimleri Gster',
		'Signs' : new Array('Olak','Kova','Balk','Ko','Boa','kizler','Yenge','Aslan','Baak','Terazi','Akrep','Yay'),
		'today' : 'bugn',
		'Translators' : 'evirenler',
		'UpdateAvailable1' : 'FFixer iin bir gncelleme mevcut',
		'UpdateAvailable2' : 'imdi gncellemek ister misiniz?',
		'UpdateHomepage' : 'Ana sayfaya git',
		'UpdateInstall' : 'imdi kur',
		'UpdateTomorrow' : 'Yarn hatrlat',
		'ViewAlbumComments' : 'Albm Yorumlarn Gster',
		'yearsOld' : '%s yanda'
	},

	// Serbian (Cyrillic) - Contributed by  (20100817)
	sr_rs : {
		'_language' : 'Serbian (Cyrillic)',
		'AddToCalendar' : '  ',
		'AddToGoogleCalendar' : '  Google ',
		'all' : '',
		'All' : '',
		'AllPhotosLoaded' : '   ',
		'Automatic' : '',
		'Birthday' : '  %s',
		'BookmarkAdd' : '  ',
		'BookmarkExists' : '      .\n\n         .',
		'BookmarkNamePrompt' : '   :\n%s',
 		'BookmarksConfirmRemoval' : '         ?',
 		'BookmarksManage' : ' ',
 		'BookmarksRemoveSelected' : '  ',
		'Bookmarks' : '',
		'BrowserUnsupported' : '     .',
		'CreatingFile' : '  ',
		'Close' : '',
		'ConfigureFacebookFixer' : ' FFixer',
		'ConfigureInstructions' : '     ,           .',
		'ConfAge' : '     (     ).',
 		'ConfAlbumComments' : '           .',
		'ConfApplicationWhitelist' : '   -        .   .',
		'ConfAutoBigAlbumPictures' : '         .',
		'ConfAutoLoadFullAlbum' : ',   ,      .',
		'ConfAutoLoadTaggedPhotos' : ',   ,      (  ""  ).',
		'ConfAutoReadMore' : '    "".',
		'ConfBigAlbumPictures' : '             .',
		'ConfBookmarks' : '  ""     .',
		'ConfBottomBarHoverOpacity' : '  ',
		'ConfBottomBarOpacity' : '    ',
		'ConfCalendarBirthDate' : '      .',
		'ConfCalendarFullName' : '      .',
		'ConfChatDifferentiate' : '        .',
		'ConfChatHideIdle' : '  .',
		'ConfDelayPopupPics' : '      .',
		'ConfDelayPopupPicsTimeout' : '    ,   (=500):',
		'ConfDownloadVideo' : '         . (    <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '     5 ,   .',
		'ConfExport' : '    ,         .',
		'ConfExternalPopup' : '      . <sup></sup>',
		'ConfFacebookFixerLanguage' : ' FFixer-',
		'ConfFacebookTimestamps' : '   (. " 3 ").',
		'ConfFBFTimestamps' : ' FFixer     (. "11:45").',
		'ConfFBFTimestamps24' : ' FFixer   24- .',
		'ConfFriendRequestCountInTitle' : '       .',
		'ConfGoogleApps' : '   Google ,   Google  .',
		'ConfGoogleAppsDomain' : '',
		'ConfGoogleCalendar' : '        <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google </a>.',
		'ConfGoogleLanguage' : '  <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google </a>',
		'ConfHideApplicationStories' : '   .',
		'ConfHideEventStories' : '   .',
 		'ConfHideFacebookCountInTitle' : '     .',
		'ConfHideFriendStories' : '   .',
		'ConfHideGroupStories' : '   .',
 		'ConfHideLikeStories' : '   "  " .',
		'ConfHideLinkStories' : '   .',
		'ConfHideNoteStories' : '   .',
		'ConfHidePhotoStories' : '   .',
		'ConfHideProfilePicStories' : '     .',
		'ConfHideRead' : '         .',
		'ConfHideRelationshipStories' : '    .',
		'ConfHideStatusStories' : '  .',
		'ConfHideVideoStories' : '    .',
		'ConfHideWallStories' : '   .',
 		'ConfHomeBeta' : '    .',
		'ConfHomeChat' : '   .',
		'ConfHomeEvents' : '   .',
		'ConfHomeFindFriends' : ' "  " .',
		'ConfHomeLeftAlign' : '      .',
		'ConfHomeLeftColumn' : '  .',
		'ConfHomeLeftColumnFixed' : '          .',
		'ConfHomeLink' : '         .',
		'ConfHomeNavigation' : '   .',
		'ConfHomePokes' : ' "" .',
		'ConfHomeProfile' : ' "" .',
 		'ConfHomeRecommendations' : '  (   ,   .).',
		'ConfHomeRequests' : ' "" .',
		'ConfHomeRightColumn' : '  .',
		'ConfHomeStretch' : '       .',
 		'ConfHomeStretchComments' : '    .',
		'ConfiCalendar' : '    <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>    .',
		'ConfImport' : '     ,             "".',
		'ConfInboxCountInTitle' : '      .',
		'ConfLogoutLink' : '        .',
		'ConfNotificationCountInTitle' : '      .',
		'ConfNewTabSearch' : '  CTRL + Enter  ,      /.',
		'ConfPageTitle' : ' "Facebook |"    .',
		'ConfPhotoPopup' : '      .',
		'ConfPopupAutoClose' : '   .',
		'ConfPopupSmartAutoClose' : '         .',
		'ConfPopupPosition' : '  ',
		'ConfProcessInterval' : '   ,   (=1000):',
		'ConfProfileLink' : '        .',
		'ConfProfilePicPopup' : '        ',
		'ConfProtocolLinks' : '     (Google Talk, Windows Live  .)         .',
		'ConfSectionAbout' : '  FFixer',
		'ConfSectionAdvanced' : ' ',
		'ConfSectionEvents' : '/',
		'ConfSectionImportExport' : '/',
		'ConfSectionFeeds' : '',
		'ConfSectionHomePage' : ' ',
		'ConfSectionLiveFeed' : '',
		'ConfSectionMenu' : '/',
		'ConfSectionOther' : ' ',
		'ConfSectionPageTitle' : ' ',
		'ConfSectionPictures' : '',
		'ConfSectionShortcuts' : '  ',
		'ConfSecureLinks' : '     HTTPS .',
		'ConfShortcutList' : '<b>  </b> (     ):<br /><br /><i>   :</i><br /> <b>A</b> - /<br /> <b>B</b> -   <br /> <b>C</b> - FFixer <br /> <b>D</b> - <br /> <b>E</b> - <br /> <b>F</b> - <br /> <b>H</b> -  <br /> <b>I</b> -  <br /> <b>K</b> -  <br /> <b>L</b> -     (     )<br /> <b>N</b> - <br /> <b>P</b> - <br /> <b>R</b> - <br /> <b>S</b> -     <br /> <b>T</b> -   <br /> <b>?</b> -     FFixer-<br /> <b><escape></b> -       FFixer<br /><br /><i>   ()</i>:<br /> <b>a</b> - <br /> <b>f</b> - <br /> <b>g</b> - <br /> <b>l</b> - <br /> <b>n</b> - <br /> <b>p</b> - <br /> <b>s</b>  <b>u</b> -  <br /> <b>t</b> - <br /> <b>v</b> - <br /><br /><i> </i>:<br /> <b>i</b> - <br /> <b>p</b> - <br /> <b>w</b> - <br /> <b>x</b> - <br /><br /><i>    (, , .)</i><br /> <b>< ></b> - <br /> <b>< ></b> - <br /> <b><> + < ></b> -  (  )<br /> <b><> + < ></b> -  (  )<br /><br /><i>  /:</i><br /> <b>a</b> -    (  )<br /> <b>b</b> -   <br /> <b>c</b> -  <br /> <b>k</b> -   <br /> <b>m</b> -   ()   <br /><br /><i>     / :</i><br /> <b>a</b>   <b>r</b> -  <br /> <b>m</b>   <b>u</b> -    <br /> <b>o</b> -     <br /> <b>p</b> -  <br /> <b>t</b>   <b>f</b> -  ',
		'ConfShortcuts' : '   .',
		'ConfSign' : '       (     ).',
		'ConfTopBarFixed' : '            .',
		'ConfTopBarHoverOpacity' : '  ',
		'ConfTopBarOpacity' : '    ',
		'ConfUpdates' : '  Userscripts.org   FFixer-.  <a href="#" id="fbfUpdateLink" onclick="return false;"> </a>.',
		'DownloadVideo' : ' ',
		'ExportICalendarFile' : ' iCalendar ',
		'ExportICalendarFileWarning' : '(       )',
		'FacebookFixerConflict' : 'FFixer    FFixer.        FFixer             .       , <a %s>   </a>.',
		'fullAlbumLoaded' : '   ',
		'Import' : '',
		'ImportConfirm' : '         ?\n     .',
		'ImportFailure' : '       .',
		'ImportSuccess' : '  .      ?',
		'Left' : '',
		'LoadingAllPhotos' : '  ...',
		'loadingFullAlbum' : '  ...',
		'LoadingPic' : ' ...',
		'LoadPhotosWarning' : '       ',
		'Months' : new Array('','','','','','','','','','','',''),
		'ProtocolSkype' : '  %s   Skype',
		'ProtocolMSN' : '   %s   Windows Live',
		'ProtocolYahoo' : '   %s   Yahoo Messenger',
		'ProtocolGoogle' : '   %s   Google Talk',
		'ReloadErrorPage' : '   ,   5 ',
		'Refresh' : '',
		'Remove' : '',
		'Right' : '',
		'ShowBigPictures' : '  ',
		'Signs' : new Array('','','','','','','','','','','',''),
		'today' : '',
		'Translators' : '',
		'UpdateAvailable1' : '    FFixer',
		'UpdateAvailable2' : '    ?',
		'UpdateHomepage' : '   ',
		'UpdateInstall' : ' ',
		'UpdateTomorrow' : '  ',
 		'ViewAlbumComments' : '  ',
		'yearsOld' : '%s '
	},

	// Serbian (Latin) - Contributed by Gortak (20100817)
	sr : {
		'_language' : 'Serbian (Latin)',
		'AddToCalendar' : 'Dodaj u kalendar',
		'AddToGoogleCalendar' : 'Dodaj u Google kalendar',
		'all' : 'sve',
		'All' : 'Sve',
		'AllPhotosLoaded' : 'Sve fotografije su uitane',
		'Automatic' : 'Automatski',
		'Birthday' : 'Roendan korisnika %s',
		'BookmarkAdd' : 'Dodaj novu zabeleku',
		'BookmarkExists' : 'Ova stranica je ve dodata u zabeleke.\n\nIdite na stranicu koju elite da dodate i pokuajte ponovo.',
		'BookmarkNamePrompt' : 'Unesite naziv ove zabeleke:\n%s',
 		'BookmarksConfirmRemoval' : 'Da li ste sigurni da elite da uklonite ove zabeleke?',
 		'BookmarksManage' : 'Uredi zabeleke',
 		'BookmarksRemoveSelected' : 'Ukloni izabrane zabeleke',
		'Bookmarks' : 'Zabeleke',
		'BrowserUnsupported' : 'Va pretraiva ne podrava ovu opciju.',
		'CreatingFile' : 'Datoteka se izrauje',
		'Close' : 'Zatvori',
		'ConfigureFacebookFixer' : 'Podesi FFixer',
		'ConfigureInstructions' : 'Sve izmene se se odmah pamte, ali ponekad je potrebno osveiti otvorene stranice da bi izmene delovale.',
		'ConfAge' : 'Prikai uzrast osobe na profilu (ukoliko je naveden pun datum poenja).',
 		'ConfAlbumComments' : 'Dodaj vezu na stranici albuma kojom bi se prikazali svi komentari albuma.',
		'ConfApplicationWhitelist' : 'Spisak dozvoljenih aplikacija - Unesite oznaku aplikacije kako biste spreili njeno sakrivanje. Razdvojte oznake razmakom.',
		'ConfAutoBigAlbumPictures' : 'Automatski prikai vee fotografije iz albuma kada se stranica otvori.',
		'ConfAutoLoadFullAlbum' : 'Automatski, na jednoj stranici, uitaj sliice svih fotografija iz albuma.',
		'ConfAutoLoadTaggedPhotos' : 'Automatski, na jednoj stranici, uitaj sliice svih oznaenih fotografija (na kartici "Fotografije" unutar profila).',
		'ConfAutoReadMore' : 'Automatski klikni na vezu "starije".',
		'ConfBigAlbumPictures' : 'Na stranici albuma dodaj vezu za prikazivanje veih sliica svih fotografija sa te stranice.',
		'ConfBookmarks' : 'Dodaj podmeni "Zabeleke" na gornju traku sa menijima.',
		'ConfBottomBarHoverOpacity' : 'Prilikom prelaska miem',
		'ConfBottomBarOpacity' : 'Providnost donje trake sa menijima',
		'ConfCalendarBirthDate' : 'Ukljui datum roenja korisnika u detaljima dogaaja.',
		'ConfCalendarFullName' : 'Dodaj i prezime korisnika u naslovu roendana.',
		'ConfChatDifferentiate' : 'Oznai dostupne prijatelje podebljanim slovima a neaktivne kosim slovima.',
		'ConfChatHideIdle' : 'Sakrij neaktivne prijatelje.',
		'ConfDelayPopupPics' : 'Ukljui kratak zastoj pre prikazivanja uveanih slika.',
		'ConfDelayPopupPicsTimeout' : 'Zastoj pre prikazivanja uveanih slika, u milisekundama (podrazumevano=500):',
		'ConfDownloadVideo' : 'Dodaj vezu za preuzimanje video snimka sa stranice za video. (Moda e vam trebati <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Automatsko ponovno uitavanje stranice nakon 5 sekundi, u sluaju greke.',
		'ConfExport' : 'Da biste izvezli svoja podeavanja, kopirajte tekst koji sledi i sauvajte ga u datoteku.',
		'ConfExternalPopup' : 'Prikai uveane slike fotografija sa spoljanjih stranica. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jezik FFixer-a',
		'ConfFacebookTimestamps' : 'Prikai Fejsbuk vreme (npr. "pre 3 sata").',
		'ConfFBFTimestamps' : 'Dodaj FFixer vreme posle Fejsbuk vremena (npr. "11:45").',
		'ConfFBFTimestamps24' : 'Prikai FFixer vremena u 24-asovnom obliku.',
		'ConfFriendRequestCountInTitle' : 'Prikai broj zahteva za prijateljstvo u naslovu stranice.',
		'ConfGoogleApps' : 'Napravi veze za Google kalendar, pogodne za Google ove aplikacije.',
		'ConfGoogleAppsDomain' : 'Domen',
		'ConfGoogleCalendar' : 'Dodaj veze za dodavanje roendana i dogaaja u <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google kalendar</a>.',
		'ConfGoogleLanguage' : 'Jezik za <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google prevodilac</a>',
		'ConfHideApplicationStories' : 'Sakrij obavetenja o aplikacijama.',
		'ConfHideEventStories' : 'Sakrij obavetenja o dogaajima.',
 		'ConfHideFacebookCountInTitle' : 'Sakrij Fejsbukov broj novih primljenih poruka.',
		'ConfHideFriendStories' : 'Sakrij obavetenja o prijateljstvima.',
		'ConfHideGroupStories' : 'Sakrij obavetenja o grupama.',
 		'ConfHideLikeStories' : 'Sakrij obavetenja o "dopada mi se" stavkama.',
		'ConfHideLinkStories' : 'Sakrij obavetenja o vezama.',
		'ConfHideNoteStories' : 'Sakrij obavetenja o zapisima.',
		'ConfHidePhotoStories' : 'Sakrij obavetenja o fotografijama.',
		'ConfHideProfilePicStories' : 'Sakrij obavetenja o slikama na profilu.',
		'ConfHideRead' : 'U najnovijim deavanjima sakrij stavke koje su oznaene kao proitane.',
		'ConfHideRelationshipStories' : 'Sakrij obavetenja o statusima veze.',
		'ConfHideStatusStories' : 'Sakrij promene statusa.',
		'ConfHideVideoStories' : 'Sakrij obavetenja o video zapisima.',
		'ConfHideWallStories' : 'Sakrij obavetenja sa zida.',
 		'ConfHomeBeta' : 'Prikai odeljak sa Fejsbukovim najavama.',
		'ConfHomeChat' : 'Prikai odeljak sa askanjem.',
		'ConfHomeEvents' : 'Prikai odeljak sa dogaajima.',
		'ConfHomeFindFriends' : 'Prikai "Povei se sa" odeljak.',
		'ConfHomeLeftAlign' : 'Poravnaj sadraj poetne stranice po levoj strani.',
		'ConfHomeLeftColumn' : 'Prikai levu kolonu.',
		'ConfHomeLeftColumnFixed' : 'Neka leva kolona bude vidljiva i prilikom pomeranja stranice na dole.',
		'ConfHomeLink' : 'Prikai vezu za Poetnu stranicu na gornjoj traci sa menijima.',
		'ConfHomeNavigation' : 'Prikai odeljak za navigaciju.',
		'ConfHomePokes' : 'Prikai "Bockanje" odeljak.',
		'ConfHomeProfile' : 'Prikai "Profil" odeljk.',
 		'ConfHomeRecommendations' : 'Prikai preporuke (Osobe koje moda poznaje, Preporuene stranice itd.).',
		'ConfHomeRequests' : 'Prikai "Zahtevi" odeljak.',
		'ConfHomeRightColumn' : 'Prikai desnu kolonu.',
		'ConfHomeStretch' : 'Rairi poetnu stranicu na punu irinu prozora pretraivaa.',
 		'ConfHomeStretchComments' : 'Rairi komentare na poetnoj stranici.',
		'ConfiCalendar' : 'Dodaj veze za preuzimanje <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> datoteke sa svim roendanima.',
		'ConfImport' : 'Da bise kasnije uvezli svoja podeavanja, zamenite tekst koji sledi sa tekstom koji ste prethodno sauvali i kliknite "Uvoz".',
		'ConfInboxCountInTitle' : 'Prikai broj novih poruka u naslovu stranice.',
		'ConfLogoutLink' : 'Dodaj vezu za odjavljivanje na gornju traku sa menijima.',
		'ConfNotificationCountInTitle' : 'Prikai broj novih obavetenja u naslovu stranice.',
		'ConfNewTabSearch' : 'Kada pritisnem CTRL + Enter za pretragu, otvori rezultate pretrage u novoj kartici/prozoru.',
		'ConfPageTitle' : 'Ukloni "Facebook |" iz naslova svih stranica.',
		'ConfPhotoPopup' : 'Prikai vee verzije fotografija prilikom prelaska miem.',
		'ConfPopupAutoClose' : 'Automatski zatvori uveane slike.',
		'ConfPopupSmartAutoClose' : 'Ne zatvaraj uveane slike ako je pokaziva mia na njima.',
		'ConfPopupPosition' : 'Poloaj uveanih slika',
		'ConfProcessInterval' : 'Interval za obradu stranice, u milisekundama (podrazumevano=1000):',
		'ConfProfileLink' : 'Prikai vezu za Profil na gornju traku sa menijima.',
		'ConfProfilePicPopup' : 'Prikai vee verzije slika na profilu prilikom prelaska miem',
		'ConfProtocolLinks' : 'Pretvori nadimke programa za komunikaciju (Google Talk, Windows Live i dr.) sa profila u veze kojima e se zapoeti askanje.',
		'ConfSectionAbout' : 'O dodatku FFixer',
		'ConfSectionAdvanced' : 'Vie opcija',
		'ConfSectionEvents' : 'Roendani/dogaaji',
		'ConfSectionImportExport' : 'Uvoz/Izvoz',
		'ConfSectionFeeds' : 'Novosti',
		'ConfSectionHomePage' : 'Poetna stranica',
		'ConfSectionLiveFeed' : 'Najnovije',
		'ConfSectionMenu' : 'Meniji/askanje',
		'ConfSectionOther' : 'Ostale opcije',
		'ConfSectionPageTitle' : 'Naslov stranice',
		'ConfSectionPictures' : 'Slike',
		'ConfSectionShortcuts' : 'Preice sa tastature',
		'ConfSecureLinks' : 'Prisili usmeravanje Fejsbuk veza na HTTPS stranice.',
		'ConfShortcutList' : '<b>Preice sa tastature</b> (razlikuju se mala i velika slova):<br /><br /><i>Sa bilo koje stranice:</i><br /> <b>A</b> - Albumi/fotografije<br /> <b>B</b> - Spisak dostupnih prijatelja<br /> <b>C</b> - FFixer podeavanja<br /> <b>D</b> - Roendani<br /> <b>E</b> - Dogaaji<br /> <b>F</b> - Prijatelji<br /> <b>H</b> - Poetna stranica<br /> <b>I</b> - Primljene poruke<br /> <b>K</b> - dodaj zabeleku<br /> <b>L</b> - Oznai vezu za odjavu (pritisnite Enter nakon toga za odjavljivanje)<br /> <b>N</b> - Obavetenja<br /> <b>P</b> - Profil<br /> <b>R</b> - Zahtevi<br /> <b>S</b> - Prelazak na polje za pretragu<br /> <b>T</b> - Prevedi odabrani tekst<br /> <b>?</b> - Prikai izvetaj o greci FFixer-a<br /> <b><escape></b> - Zatvori iskaue prozore koje je napravio FFixer<br /><br /><i>Sa poetne stranice (filteri)</i>:<br /> <b>a</b> - Stranice<br /> <b>f</b> - Najnovije<br /> <b>g</b> - Grupe<br /> <b>l</b> - Veze<br /> <b>n</b> - Novosti<br /> <b>p</b> - Fotografije<br /> <b>s</b> ili <b>u</b> - Promene statusa<br /> <b>t</b> - Beleke<br /> <b>v</b> - Video<br /><br /><i>Sa profila</i>:<br /> <b>i</b> - Informacije<br /> <b>p</b> - Fotografije<br /> <b>w</b> - Zid<br /> <b>x</b> - Okviri<br /><br /><i>Sa stranica sa nabrajanjem (prethodna, sleda, itd.)</i><br /> <b><strelica levo></b> - Prethodna<br /> <b><strelica desno></b> - Sledea<br /> <b><ift> + <strelica levo></b> - Prva (ako je dostupno)<br /> <b><ift> + <strelica desno></b> - Poslednja (ako je dostupno)<br /><br /><i>Prilikom pregledavanja albuma/fotografija:</i><br /> <b>a</b> - Uitaj sve sliice (ako je dostupno)<br /> <b>b</b> - Prikai velike slike<br /> <b>c</b> - Prikai komentare<br /> <b>k</b> - Nazad na album<br /> <b>m</b> - Fotografije sa (korisnikom) i sa mnom<br /><br /><i>Pri pregledavanju skoranjih albuma i postavljenih/oznaenih fotografija:</i><br /> <b>a</b> ili  <b>r</b> - Skoranji albumi<br /> <b>m</b> ili  <b>u</b> - Postavljeno preko mobilnog telefona<br /> <b>o</b> - Fotografije na kojima sam ja<br /> <b>p</b> - Moje fotografije<br /> <b>t</b> ili  <b>f</b> - Oznaeni prijatelji',
		'ConfShortcuts' : 'Omogui preice sa tastature.',
		'ConfSign' : 'Prikai korisnikov horoskopski znak na njegovom profilu (ukoliko je naveden pun datum roenja).',
		'ConfTopBarFixed' : 'Zadri gornju traku sa menijima na ekranu i prilikom pomeranja stranice na dole.',
		'ConfTopBarHoverOpacity' : 'Prilikom prelaska miem',
		'ConfTopBarOpacity' : 'Providnost Gornje trake sa menijima',
		'ConfUpdates' : 'Svakodnevno proveravaj Userscripts.org za nadogradnje FFixer-a. Ili <a href="#" id="fbfUpdateLink" onclick="return false;">proveri sada</a>.',
		'DownloadVideo' : 'Preuzmi video',
		'ExportICalendarFile' : 'Izvezi iCalendar datoteku',
		'ExportICalendarFileWarning' : '(Ovo moe da potraje ako imate mnogo prijatelja)',
		'FacebookFixerConflict' : 'FFixer se sada zove FFixer. Zbog promene imena moraete runo da uklonite FFixer iz svog pregledaa da ne bi dolo do ometanja izmeu ove dve skripte. Ako niste sigurni kako da uklonite skriptu, <a %s>kliknite ovde za uputstvo</a>.',
		'fullAlbumLoaded' : 'ceo album je uitan',
		'Import' : 'Uvoz',
		'ImportConfirm' : 'Da li ste sigurni da elite da uvezete ova podeavanja?\nVaa trenutna podeavanja e biti ponitena.',
		'ImportFailure' : 'Dolo je do greke prilikom uvoza vaih podeavanja.',
		'ImportSuccess' : 'Uvoz je zavren. Da li elite da osveite stranicu?',
		'Left' : 'Levo',
		'LoadingAllPhotos' : 'Uitavanje svih fotografija...',
		'loadingFullAlbum' : 'uitavanje svih albuma...',
		'LoadingPic' : 'Uitavanje slike...',
		'LoadPhotosWarning' : 'Uitavanje svih fotografija moe da potraje neko vreme',
		'Months' : new Array('Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'),
		'ProtocolSkype' : 'Pozovi korisnika %s putem programa Skype',
		'ProtocolMSN' : 'askaj sa korisnikom %s putem programa Windows Live',
		'ProtocolYahoo' : 'askaj sa korisnikom %s putem programa Yahoo Messenger',
		'ProtocolGoogle' : 'askaj sa korisnikom %s putem programa Google Talk',
		'ReloadErrorPage' : 'Kliknite da pokuate ponovo, ili saekajte 5 sekundi',
		'Refresh' : 'Osvei',
		'Remove' : 'Ukloni',
		'Right' : 'Desno',
		'ShowBigPictures' : 'Prikai velike slike',
		'Signs' : new Array('Jarac','Vodolija','Ribe','Ovan','Bik','Blizanci','Rak','Lav','Devica','Vaga','korpija','Strelac'),
		'today' : 'danas',
		'Translators' : 'Prevodioci',
		'UpdateAvailable1' : 'Dostupne su nadogradnje za FFixer',
		'UpdateAvailable2' : 'elite li sada da nadogradite?',
		'UpdateHomepage' : 'Idi na poetnu stranicu',
		'UpdateInstall' : 'Instaliraj odmah',
		'UpdateTomorrow' : 'Podseti me sutra',
 		'ViewAlbumComments' : 'Prikai komentare albuma',
		'yearsOld' : '%s godina'
	},

	// Danish - Contributed by Mads Jensen (20100210)
	da : {
		'_language' : 'Danish',
		'AddToCalendar' : 'Tilfj til kalender',
		'AddToGoogleCalendar' : 'Tilfj til Google Calendar',
		'all' : 'alle',
		'All' : 'Alle',
		'AllPhotosLoaded' : 'Alle billeder er hentet',
		'Automatic' : 'Automatisk',
		'Birthday' : '%s\'s fdselsdag',
		'BookmarkAdd' : 'Tilfj nyt bogmrke',
		'BookmarkConfirmRemoval' : 'Er du sikker p du vil fjerne bogmrket "%s"?',
		'BookmarkDoesNotExist' : 'Denne side har intet bogmrke.\n\nG til siden du vil fjerne og prv igen.',
		'BookmarkExists' : 'Der er allerede et bogmrke til denne side.\n\nG til siden du vil tilfje et bogmrke for og prv igen.',
		'BookmarkNamePrompt' : 'Skriv et navn til dette bogmrke:\n%s',
		'BookmarkRemove' : 'Fjern bogmrke',
		'CreatingFile' : 'Opret fil',
		'Close' : 'Luk',
		'ConfigureFacebookFixer' : 'Konfigurr FFixer',
		'ConfigureInstructions' : 'Alle ndringer bliver gemt med det samme, men nogle ndringer vil ikke vises i allerede bne faneblade.',
		'ConfAge' : 'Vis folks alder p deres profil (hvis de har oplyst fdselsdato).',
		'ConfAutoBigAlbumPictures' : 'Vis automatisk strre album billeder, nr siden bnes.',
		'ConfAutoLoadFullAlbum' : 'Hent automatisk miniaturer til alle billeder i et album, p en enkelt side.',
		'ConfAutoLoadTaggedPhotos' : 'Hent automatisk miniaturer til alle taggede billeder i et album, p en enkelt side (Billeder fanebladet p folks profil).',
		'ConfAutoReadMore' : 'Tryk automatisk p  "Vis mere" links.',
		'ConfBigAlbumPictures' : 'Tilfj et link p album sider, til at vise strre udgaver af alle billeder p den side.',
		'ConfBookmarks' : 'Tilfj "Bogmrker" til topmenuen.',
		'ConfBottomBarHoverOpacity' : 'Nr musen er over',
		'ConfBottomBarOpacity' : 'Gennemsigtighed af menuen nederst p siden',
		'ConfCalendarBirthDate' : 'Inkludr personens fdselsdag i begivenhedens detaljer.',
		'ConfCalendarFullName' : 'Brug personens fulde navn som titlen til fdselsdage (i stedet for kun fornavn).',
		'ConfChatDifferentiate' : 'Brug fed og kursiv for at skelne mellem tilgngelige og optagede venner.',
		'ConfChatHideIdle' : 'Skjul optagede venner.',
		'ConfDelayPopupPics' : 'Tilfj en kort pause fr billeder popper op.',
		'ConfDelayPopupPicsTimeout' : 'Pause fr billeder popper op, i millisekunder (standard er 500)',
		'ConfDownloadVideo' : 'Tilfj et link til at hente videoer fra "Video" sider. (Du fr sikkert brug for en <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV afspiller</a>)',
		'ConfErrorPageReload' : 'Genindls applikationsfejl sider efter 5 sekunder.',
		'ConfExternalPopup' : 'Vis eksterne billeder i fuld strrelse. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Sprog i FFixer',
		'ConfFacebookTimestamps' : 'Vis Facebook tidsstempler (f.eks. "3 timer sider").',
		'ConfFBFTimestamps' : 'Tilfj FFixer tidsstempler efter Facebook tidsstempler (f.eks. "11:45").',
		'ConfFBFTimestamps24' : 'Vis FFixer tidsstempler i 24 timers format.',
		'ConfFriendRequestCountInTitle' : 'Vis antallet af anmodninger om venskab i siden titel.',
		'ConfGoogleApps' : 'Lav Google Calendar links kompatible med Google Apps.',
		'ConfGoogleAppsDomain' : 'Domne',
		'ConfGoogleCalendar' : 'Tilfj links til at tilfje fdselsdage og begivenheder til <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Sprog i <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Skjul applikations beskeder.',
		'ConfHideEventStories' : 'Skjul begivenhed beskeder.',
		'ConfHideFanStories' : 'Skjul fan beskeder.',
		'ConfHideFriendStories' : 'Skjul ven beskeder.',
		'ConfHideGroupStories' : 'Skjul gruppe beskeder.',
		'ConfHideLinkStories' : 'Skjul link beskeder.',
		'ConfHidePhotoStories' : 'Skjul billede beskeder.',
		'ConfHideProfilePicStories' : 'Skjul profilbillede beskeder.',
		'ConfHideRead' : 'Skjul beskeder der er markeret som lst.',
		'ConfHideRelationshipStories' : 'Skjul parforholds beskeder.',
		'ConfHideStatusStories' : 'Skjul status beskeder.',
		'ConfHideVideoStories' : 'Skjul video beskeder.',
		'ConfHideWallStories' : 'Skjul vg beskeder.',
		'ConfHomeChat' : 'Vis Chat sektionen.',
		'ConfHomeEvents' : 'Vis Begivenheder sektionen.',
		'ConfHomeFindFriends' : 'Vis Skab forbindelser til venner sektionen.',
		'ConfHomeLeftAlign' : 'Venstrestil indholdet p forsiden.',
		'ConfHomeLeftColumn' : 'Vis venstre kolonne.',
		'ConfHomeLeftColumnFixed' : 'Hold venstre kolonne synlig, selv efter der er scrollet ned p siden.',
		'ConfHomePeopleYouMayKnow' : 'Vis Forslag sektionen.',
		'ConfHomeNavigation' : 'Vis Navigation sektionen.',
		'ConfHomePokes' : 'Vis Prik sektionen.',
		'ConfHomeProfile' : 'Vis Profil sektionen.',
		'ConfHomeRequests' : 'Vis Anmodninger sektionen.',
		'ConfHomeRightColumn' : 'Vis hjre kolonne.',
		'ConfHomeStretch' : 'Strk forsiden til browser vinduets fulde bredde.',
		'ConfiCalendar' : 'Tilfj links til at hente en <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> fil med alle fdselsdage.',
		'ConfInboxCountInTitle' : 'Vis antallet af nye beskeder i indbakken, i sidens titel.',
		'ConfLogoutLink' : 'Tilfj et "Log ud" link til top menuen.',
		'ConfNotificationCountInTitle' : 'Vis antallet af nye notifikationer i sidens titel.',
		'ConfNewTabSearch' : 'Tving sgeresultater til at bne i et nyt vindue, nr der trykkes CTRL + Enter ved sgning.',
		'ConfPageTitle' : 'Fjern "Facebook |" fra titlen p alle sider.',
		'ConfPhotoPopup' : 'Popop strre udgaver af billeder nr musen holdes over.',
		'ConfPopupAutoClose' : 'Luk popop billeder automatisk.',
		'ConfPopupSmartAutoClose' : 'Stop popop billeder fra at lukke automatisk hvis musen er over.',
		'ConfPopupPosition' : 'Position for popop billeder',
		'ConfProcessInterval' : 'Interval mellem hndtering af siden, i millisekunder (standard er 1000)',
		'ConfProfilePicPopup' : 'Popop strre udgaver af profilbilleder nr musen holdes over',
		'ConfProtocolLinks' : 'Lav IMs p profiler til links der starter en samtale (Google Talk, Windows Live o.s.v.).',
		'ConfSectionAbout' : 'Omkring FFixer',
		'ConfSectionAdvanced' : 'Avanceret',
		'ConfSectionEvents' : 'Fdselsdage/Begivenheder',
		'ConfSectionFeeds' : 'Beskeder',
		'ConfSectionHomePage' : 'Forside',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menu/Chat',
		'ConfSectionOther' : 'Andre indstillinger',
		'ConfSectionPageTitle' : 'Side titel',
		'ConfSectionPictures' : 'Billeder',
		'ConfSectionShortcuts' : 'Tastatur genveje',
		'ConfSecureLinks' : 'Tving Facebook links til at bruge HTTPS.',
		'ConfShortcutList' : '<b>Tastatur genveje</b> (forskel p store og sm bogstaver):<br /><br /><i>Fra enhver side:</i><br />&nbsp;<b>A</b> - Album/billeder<br />&nbsp;<b>B</b> - Skift venne liste (online venner)<br />&nbsp;<b>C</b> - FFixer konfiguration<br />&nbsp;<b>D</b> - Fdselsdage<br />&nbsp;<b>E</b> - Begivenheder<br />&nbsp;<b>F</b> - Venner<br />&nbsp;<b>H</b> - Forside<br />&nbsp;<b>I</b> - Indbakke<br />&nbsp;<b>K</b> - Tilfj bogmrke<br />&nbsp;<b>L</b> - Vlg Log ud linket (tryk Enter efterflgende for at logge ud)<br />&nbsp;<b>N</b> - Notifikationer<br />&nbsp;<b>P</b> - Din profil<br />&nbsp;<b>R</b> - Anmodninger<br />&nbsp;<b>S</b> - Hop til sgefeltet<br />&nbsp;<b>T</b> - Overst valgte tekst<br />&nbsp;<b>?</b> - Vis FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Luk popops fra FFixer<br /><br /><i>Fra forsiden (filtre)</i>:<br />&nbsp;<b>a</b> - Sider<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Grupper<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - Nyheder<br />&nbsp;<b>p</b> - Billeder<br />&nbsp;<b>s</b> eller <b>u</b> - Status opdateringer<br />&nbsp;<b>t</b> - Noter<br />&nbsp;<b>v</b> - Videoer<br /><br /><i>Fra profiler</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Billeder<br />&nbsp;<b>w</b> - Vg<br />&nbsp;<b>x</b> - Bokse<br /><br /><i>Fra sider med bladrefunktion (frem, tilbage o.s.v.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Forrige<br />&nbsp;<b>&lt;right arrow&gt;</b> - Nste<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - Frste (nr muligt)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Sidste (nr muligt)<br /><br /><i>Under visning af album/billeder:</i><br />&nbsp;<b>a</b> - Hent alle miniaturer (nr muligt)<br />&nbsp;<b>b</b> - Vis store billeder<br />&nbsp;<b>c</b> - Se kommentarer<br />&nbsp;<b>k</b> - Tilbage til album<br />&nbsp;<b>m</b> - Billeder af (person) og mig<br /><br /><i>Under visning af nyeste album og uploadede/taggede billeder:</i><br />&nbsp;<b>a</b> eller <b>r</b> - Nyeste Album<br />&nbsp;<b>m</b> eller <b>u</b> - Telefon uploads<br />&nbsp;<b>o</b> - Billeder af mig<br />&nbsp;<b>p</b> - Mine billeder<br />&nbsp;<b>t</b> eller <b>f</b> - Tagged venner',
		'ConfShortcuts' : 'Sl tastaturgenveje til.',
		'ConfSign' : 'Vis folks stjernetegn p deres profil (hvis de har oplyst en fdsesdato).',
		'ConfTopBarFixed' : 'Hold topmenuen synlig p siden, selv efter der er scrollet ned.',
		'ConfTopBarHoverOpacity' : 'Nr musen er over',
		'ConfTopBarOpacity' : 'Gennemsigtighed af topmenu linien',
		'ConfUpdates' : 'Undersg Userscripts.org dagligt for opdateringer til FFixer. Eller <a href="#" id="fbfUpdateLink" onclick="return false;">undersg nu</a>.',
		'DownloadVideo' : 'Hent video',
		'ExportICalendarFile' : 'Eksportr iCalendar fil',
		'ExportICalendarFileWarning' : '(Dette vil tage lang tid, hvis du har mange venner)',
		'FacebookFixerConflict' : 'FFixer vil fremover hedde FFixer. P grund af navneskiftet, skal du manuelt afinstallere FFixer fra dine browsere, da de to scripts ellers vil komme i konflikt med hinanden. Hvis du er usikker p hvordan man afinstallerer et Userscript, s <a %s>tryk her for instruktioner</a>.',
		'fullAlbumLoaded' : 'Hele albummet hentet',
		'Left' : 'Venstre',
		'ListeningRestarted' : 'FFixer lytter efter ndringer igen.',
		'ListeningStopped' : 'FFixer er stoppet med at lytte efter ndringer.\nTryk L (SHIFT + l) for at starte igen',
		'LoadingAllPhotos' : 'Henter alla billeder...',
		'loadingFullAlbum' : 'henter helt album...',
		'LoadingPic' : 'Henter billede...',
		'LoadPhotosWarning' : 'Indhentning af alle billeder tager mugligvis lang tid',
		'Months' : new Array('Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December'),
		'ProtocolSkype' : 'Ring til %s med Skype',
		'ProtocolMSN' : 'Chat med %s p Windows Live',
		'ProtocolYahoo' : 'Chat med %s p Yahoo Messenger',
		'ProtocolGoogle' : 'Chat med %s p Google Talk',
		'ReloadErrorPage' : 'Tryk for at prve igen eller vent 5 sekunder',
		'Refresh' : 'Genindls',
		'Remove' : 'Fjern',
		'Right' : 'Hjre',
		'ShowBigPictures' : 'Vis store billeder',
		'Signs' : new Array('Stenbukken','Vandbreren','Fiskene','Vdderen','Tyren','Tvillingerne','Krebsen','Lven','Jomfruen','Vgten','Skorpionen','Skytten'),
		'today' : 'i dag',
		'UpdateAvailable1' : 'En opdatering er tilgngelig til FFixer',
		'UpdateAvailable2' : 'Vil du opdatere nu?',
		'UpdateHomepage' : 'G til hjemmesiden',
		'UpdateInstall' : 'Installr nu',
		'UpdateTomorrow' : 'Pmind mig i morgen',
		'yearsOld' : '%s r gammel'
	},

	// Czech - Contributed by Caken (20100823)
	cs : {
		'_language' : 'Czech',
		'AddToCalendar' : 'Pidat do kalende',
		'AddToGoogleCalendar' : 'Pidat do Google kalende',
		'all' : 've',
		'All' : 'Ve',
		'AllPhotosLoaded' : 'Vechny fotografie naten',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narozeniny %s',
		'BookmarkAdd' : 'Pidej zloku',
		'BookmarkExists' : 'Tato strnka u je v zlokch.',
		'BookmarkNamePrompt' : 'Vlote jmno tto zloky:\n%s',
		'BookmarksConfirmRemoval' : 'Jste si jist, e chcete odstranit tuto zloku?',
		'BookmarksManage' : 'Spravuj zloky',
		'BookmarksRemoveSelected' : 'Odstra vybran zloky',
		'Bookmarks' : 'Zloky',
		'BrowserUnsupported' : 'V prohle nepodporuje tento program.',
		'CreatingFile' : 'Vytvoen souboru',
		'Close' : 'Zavt',
		'ConfigureFacebookFixer' : 'Nastaven - FFixer',
		'ConfigureInstructions' : 'Vechny zmny jsou ukldny okamit, ale nkter se nemus projevit na ji otevench kartch.',
		'ConfAge' : 'Zobrazit vk lid v jejich profilech (pokud poskytli cel datum narozen)',
		'ConfAlbumComments' : 'Pid odkaz na strnku alba a uke vechny komente k danmu albu.',
		'ConfApplicationWhitelist' : 'Seznam povolench aplikac - Vlote ID aplikace, kterou chcete chrnit ped skrytm. ID oddlujte mezerami.',
		'ConfAutoBigAlbumPictures' : 'Automaticky pi oteven strnky zobrazit vt obrzky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky natat miniatury vech obrzk v albumu na jedn strnce',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky natat miniatury vech fotografic s popisem na jedn strnce (karta Fotky v profilech lid)',
		'ConfAutoReadMore' : 'Automaticky kliknout na odkazy &quot;st dle&quot;',
		'ConfBigAlbumPictures' : 'Pidat odkaz na strnkch albumu na zobrazen vtch verz vech obrzk na tto stran',
		'ConfBookmarks' : 'Pijde menu zloek do vrchn nabdky.',
		'ConfBottomBarHoverOpacity' : 'Pi najet my',
		'ConfBottomBarOpacity' : 'Prhlednost spodnho panelu s nabdkou',
		'ConfCalendarBirthDate' : 'Zahrnout narozeniny osoby do podrobnosti udlost',
		'ConfCalendarFullName' : 'Pout jmno cel jmno osoby jako nzev narozenin (namstno kestnho jmna)',
		'ConfChatDifferentiate' : 'Pout tun psmo a kurzvu na rozlien pipojench a neinnch ptel',
		'ConfChatHideIdle' : 'Skrt neinn ptele',
		'ConfDelayPopupPics' : 'Vykat 0,5 sekundy ped natenm obrzku v kontextovm okn',
		'ConfDelayPopupPicsTimeout' : 'Zpodn ped zobrazenm obrzku v kontextovm okn v milisekundch (defaultn=500):',
		'ConfDownloadVideo' : 'Pidat odkaz na pevzet vide ze strnek s videem (mon poteba <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV pehrva</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundch znova nast chybov strnky aplikc',
		'ConfExport' : 'Pro exportovn vaeho nastaven, zkoprujte nsledujc text a ulote ho do souboru.',
		'ConfExternalPopup' : 'Extern obrzky pln velikosti v kontextovm okn <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jazyk pro FFixer',
		'ConfFacebookTimestamps' : 'Zobrazit asov znaky Facebooku (t. j. "ped 3 hodinami")',
		'ConfFBFTimestamps' : 'Pidat asov znaky skriptu FFixer za asov znaky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'Zobrazit asov znany skriptu FFixer v 24-hodinovm formt',
		'ConfFriendRequestCountInTitle' : 'Zobraz poet novch dost o ptelstv v titulku strnky.',
		'ConfGoogleApps' : 'Vytvoit odkazy pro Google Calendar kompatibiln s Google Apps',
		'ConfGoogleAppsDomain' : 'Domna',
		'ConfGoogleCalendar' : 'Pidat odkazy na zaazen narozenin a udlost do aplikace <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pro <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>.',
		'ConfHideApplicationStories' : 'Skrt v aktualitch pspvky o aplikacch.',
		'ConfHideEventStories': 'Skrt v aktualitch pspvky z udlost.',
		'ConfHideFacebookCountInTitle' : 'Skrt poet novch zprv.',
		'ConfHideFriendStories': 'Skrt v aktualitch pspvky ptel.',
		'ConfHideGroupStories': 'Skrt v aktualitch pspvky o skupinch.',
		'ConfHideLikeStories' : 'Skrt pspvky uivateli xxx se lb.',
		'ConfHideLinkStories' : 'Skrt pspvky o odkazech.',
		'ConfHideNoteStories' : 'Skrt pspvky o poznmkch.',
		'ConfHidePhotoStories' : 'Skrt pspvky o fotkch.',
		'ConfHideProfilePicStories' : 'Skrt pspvky o profilovch fotkch.',
		'ConfHideRead' : 'Skrt v aktualitch poloky, kter byly oznaen jako peten.',
		'ConfHideRelationshipStories' : 'Skrt v aktualitch pspvky o vztahu.',
		'ConfHideStatusStories' : 'Skrt pspvky se statusy.',
		'ConfHideVideoStories' : 'Skrt pspvky o videch.',
		'ConfHideWallStories' : 'Skryj pspvky na zdi.',
		'ConfHomeBeta' : 'Zobraz Beta Tester sekci.',
		'ConfHomeChat' : 'Zobrazit st chat.',
		'ConfHomeEvents' : 'Zobrazit st Udlosti',
		'ConfHomeFindFriends' : 'Zobrazit st Spojte se s pteli',
		'ConfHomeLeftAlign' : 'Zarovat obsah strnky Dom doleva',
		'ConfHomeLeftColumn' : 'Zobraz lev sloupec.',
		'ConfHomeLeftColumnFixed' : 'Nech lev sloupec viditeln i pi scrolovn dol.',
		'ConfHomeLink' : 'Zobraz ve vrchn nabdce odkaz na vodn strnku.',
		'ConfHomeNavigation' : 'Zobrazit st navigace.',
		'ConfHomePokes' : 'Zobrazit st ouchnut',
		'ConfHomeProfile' : 'Zobraz st Profil.',
		'ConfHomeRecommendations' : 'Zobraz doporuen (Mohli byste znt, doporuen strnky, atd.).',
		'ConfHomeRequests' : 'Zobrazit st dosti',
		'ConfHomeRightColumn' : 'Zobrazit prav sloupec',
		'ConfHomeStretch' : 'Rozthnout vodn strnku na ku okna prohlee',
		'ConfHomeStretchComments' : 'Rozthnout komente na vodn strnce.',
		'ConfiCalendar' : 'Pidat odkazy na pevzet souboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> se vemi narozeninami',
		'ConfImport' : 'Pro importovn nastaven pepite nsledujc text pedem exportovanm a pot kliknte na "Import".',
		'ConfInboxCountInTitle' : 'Zobrazit v nzvu strnky poet nepetench zprv',
		'ConfLogoutLink' : 'Pidej odhlaovac odkaz do vrchn nabdky.',
		'ConfNotificationCountInTitle' : 'Zobraz poet novch upozornn v titulku strnky.',
		'ConfNewTabSearch' : 'Pi vyhledvn otevt stisknutm Ctrl+Enter vsledky hledn na nov kart/v novm okn',
		'ConfPageTitle' : 'Odstranit "Facebook |" z nzvu vech strnek',
		'ConfPhotoPopup' : 'Vt verze fotek v kontextovm menu po najet my',
		'ConfPopupAutoClose' : 'Automaticky zavrat kontextov okna s obrzkem',
		'ConfPopupSmartAutoClose' : 'Zabrnit automatickmu uzaven kontextovho okna s obrzkem',
		'ConfPopupPosition' : 'Umstn kontextovho okna s obrzkem',
		'ConfProcessInterval' : 'Interval zpracovn strnky v milisekundch (defaultn=1000):',
		'ConfProfileLink' : 'Zobraz ve vrchn nabdce odkaz na profil.',
		'ConfProfilePicPopup' : 'Vt verze profilovch fotek v kontextovm okn po najet my',
		'ConfProtocolLinks' : 'Zmenit ID pro okamitou sprvu na odkazy spoutjc konverzaci (Google Talk, Windows Live atd.)',
		'ConfSectionAbout' : 'O FFixeru',
		'ConfSectionAdvanced' : 'Upesnn',
		'ConfSectionEvents' : 'Narozeniny/Udlosti',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Pspvky',
		'ConfSectionHomePage' : 'Strnka Doma',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'Nabdky/Chat',
		'ConfSectionOther' : 'Dal monosti',
		'ConfSectionPageTitle' : 'Titulek strnky',
		'ConfSectionPictures' : 'Obrzky',
		'ConfSectionShortcuts' : 'Klvesov zkratky',
		'ConfSecureLinks' : 'Pesmrovat odkazy Facebooku na strnky HTTPS',
		'ConfShortcutList' : '<b>Klvesov zkratky</b> (rozliuj se mal/velk psmena):<br /><br /><i>Z libovoln strnky:</i><br />&nbsp;<b>A</b> - Alba/fotky<br />&nbsp;<b>B</b> - Pepnout seznam ptel (online ptel)<br />&nbsp;<b>C</b> - Konfigurace skriptu FFixer<br />&nbsp;<b>D</b> - Narozeniny<br />&nbsp;<b>E</b> - Udlosti<br />&nbsp;<b>F</b> - Ptel<br />&nbsp;<b>H</b> - Dom<br />&nbsp;<b>I</b> - Pijat zprvy<br />&nbsp;<b>K</b> - Pidej zloku<br />&nbsp;<b>L</b> - Odhlen (po odhlen stisknte Enter)<br />&nbsp;<b>N</b> - Upozornn<br />&nbsp;<b>P</b> - V profil<br />&nbsp;<b>R</b> - dosti<br />&nbsp;<b>S</b> - Peskoit na pole Hledat<br />&nbsp;<b>T</b> - Peloit vybran text<br />&nbsp;<b>?</b> - Zobrazit informace o ladn skriptu FFixer<br />&nbsp;<b>&lt;escape&gt;</b> - Zavt kontextov okna vytvoen skriptem FFixer<br /><br /><i>Ze strnky Dom (filtry)</i>:<br />&nbsp;<b>a</b> - Strnky<br />&nbsp;<b>f</b> - Aktuality<br />&nbsp;<b>g</b> - Skupiny<br />&nbsp;<b>l</b> - Odkazy<br />&nbsp;<b>n</b> - Novinky<br />&nbsp;<b>p</b> - Fotky<br />&nbsp;<b>s</b> nebo <b>u</b> - Co dlaj ostatn<br />&nbsp;<b>t</b> - Poznmky<br />&nbsp;<b>v</b> - Videa<br /><br /><i>Z profil</i>:<br />&nbsp;<b>i</b> - Informace<br />&nbsp;<b>p</b> - Fotky<br />&nbsp;<b>w</b> - Ze<br />&nbsp;<b>x</b> - Kontejner<br /><br /><i>Ze strnek s navigac (dozadu, dopredu atd.)</i><br />&nbsp;<b>&lt;lev ipka&gt;</b> - Pedchoz<br />&nbsp;<b>&lt;prav ipka&gt;</b> - Nsledujc<br />&nbsp;<b>&lt;shift&gt; + &lt;lev ipka&gt;</b> - Prvn (pokud je dispozici)<br />&nbsp;<b>&lt;shift&gt; + &lt;prav ipka&gt;</b> - Posledn (pokud je k dispozici)<br /><br /><i>Pi prohlen alb/fotek:</i><br />&nbsp;<b>a</b> - Natat vechny miniatury (pokud je k dispozici)<br />&nbsp;<b>b</b> - Zobrazit velk obrzky<br />&nbsp;<b>c</b> - Zobrazit komente<br />&nbsp;<b>k</b> - Zpt do alba<br />&nbsp;<b>m</b> - Fotky (osoby) a moje<br /><br /><i>Pi prohlen nejnovjch alb a nahranch/oznaench fotek:</i><br />&nbsp;<b>a</b> nebo &nbsp;<b>r</b> - Nejnovj alba<br />&nbsp;<b>m</b> nebo &nbsp;<b>u</b> - Nahran z mobilu<br />&nbsp;<b>o</b> - Fotky m osoby<br />&nbsp;<b>p</b> - M fotky<br />&nbsp;<b>t</b> nebo &nbsp;<b>f</b> - Oznaen ptel',
		'ConfShortcuts' : 'Povolit klvesov zkratky',
		'ConfSign' : 'Zobrazit znamen lid v jejich profilu (pokud uvedli svj datum narozen)',
		'ConfTopBarFixed' : 'Vdy zobrazit vrchn panel s nabdkou - i pi posouvn strnky',
		'ConfTopBarHoverOpacity' : 'Pi najet my',
		'ConfTopBarOpacity' : 'Prhlednost vrchnho panelu s nabdkou',
		'ConfUpdates' : 'Denn na Userscripts.org ovovat aktualizace pro FFixer, ppadn <a href="#" id="fbfUpdateLink" onclick="return false;">zkontrolovat nyn</a>.',
		'DownloadVideo' : 'Sthnout video',
		'ExportICalendarFile' : 'Exportovat soubor iCalendar',
		'ExportICalendarFileWarning' : '(Pokud mte mnoho ptel, me to chvli trvat.)',
		'FacebookFixerConflict' : 'Facebook Fifex je nyn znm jako FFixer.<br /><br />Protoe se zmnilo jmno, muste manuln odinstalovat Facebook Fixer z vaeho prohlee.<br /><br />Pokud si nevte jak na to <a %s>pokraujte zde</a>.',
		'fullAlbumLoaded' : 'cel album je naten',
		'Import' : 'Import',
		'ImportConfirm' : 'Opravdu chcete importovat toto nastaven?\nStvajc nastaven bude ztraceno.',
		'ImportFailure' : 'Pi importovn nastaven dolo k chyb.',
		'ImportSuccess' : 'Import kompletn. Chcete aktualizovat strnku?',
		'Left' : 'Vlevo',
		'LoadingAllPhotos' : 'Nataj sa vechny fotky...',
		'loadingFullAlbum' : 'Nat se cel album...',
		'LoadingPic' : 'Nat se obrzek...',
		'LoadPhotosWarning' : 'Natn vech fotek me chvli trvat',
		'Months' : new Array('Leden','nor','Bezen','Duben','Kvten','erven','ervenec','Srpen','Z','jen','Listopad','Prosinec'),
		'ProtocolSkype' : 'Volat %s pomoc Skype',
		'ProtocolMSN' : 'Chatovat s %s pomoc Windows Live',
		'ProtocolYahoo' : 'Chatovat s %s pomoc Yahoo Messenger',
		'ProtocolGoogle' : 'Chatovat s %s pomoc Google Talk',
		'ReloadErrorPage' : 'Kliknte na Zkusit znovu nebo vykejte 5 sekund',
		'Refresh' : 'Obnovit',
		'Remove' : 'Odstranit',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'Zobrazit velk obrzky',
		'Signs' : new Array('Kozoroh','Vodn','Ryba','Beran','Bk','Blenci','Rak','Lev','Panna','Vhy','tr','Stelec'),
		'today' : 'dnes',
		'Translators' : 'Pekladatel',
		'UpdateAvailable1' : 'K dispozici je aktualizace skriptu FFixer.',
		'UpdateAvailable2' : 'Chcete aktualizovat nyn?',
		'UpdateHomepage' : 'Pejt na domovskou strnku',
		'UpdateInstall' : 'Nainstalovat',
		'UpdateTomorrow' : 'Pipomenout ztra',
		'ViewAlbumComments' : 'Uka komente k albu',
		'yearsOld' : '%s let'
	},
	
	// Macedonian - Contributed by Goce Manevski (20100628)
	mk : {
		'_language' : 'Macedonian',
		'AddToCalendar' : '  ',
		'AddToGoogleCalendar' : '  Google ',
		'all' : '',
		'All' : '',
		'AllPhotosLoaded' : '   ',
		'Automatic' : '',
		'Birthday' : '%s\'s ',
		'BookmarkAdd' : '  ',
		'BookmarkConfirmRemoval' : '        "%s"?',
		'BookmarkDoesNotExist' : 'This page has not been bookmarked.\n\nGo to the page you want removed and try again.',
		'BookmarkExists' : '     .\n\n           .',
		'BookmarkNamePrompt' : '    :\n%s',
		'BookmarkRemove' : ' ',
		'Bookmarks' : '',
		'BrowserUnsupported' : '     .',
		'CreatingFile' : ' ',
		'Close' : '',
		'ConfigureFacebookFixer' : '  FFixer',
		'ConfigureInstructions' : '    ,          .',
		'ConfAge' : '    \-    (       ).',
		'ConfApplicationWhitelist' : '  -           .      .',
		'ConfAutoBigAlbumPictures' : '         .',
		'ConfAutoLoadFullAlbum' : '           .',
		'ConfAutoLoadTaggedPhotos' : '           (      \-).',
		'ConfAutoReadMore' : '   " " .',
		'ConfBigAlbumPictures' : '                .',
		'ConfBookmarks' : '     .',
		'ConfBottomBarHoverOpacity' : '   ',
		'ConfBottomBarOpacity' : '    ',
		'ConfCalendarBirthDate' : '  \-      .',
		'ConfCalendarFullName' : '     \-     (  ).',
		'ConfChatDifferentiate' : '          .',
		'ConfChatHideIdle' : '   .',
		'ConfDelayPopupPics' : '      .',
		'ConfDelayPopupPicsTimeout' : '    ,   (=500):',
		'ConfDownloadVideo' : '        . (    <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '          5 .',
		'ConfExport' : '    ,         .',
		'ConfExternalPopup' : '     . <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : '  FFixer',
		'ConfFacebookTimestamps' : ' Facebook    (eg. "3  ").',
		'ConfFBFTimestamps' : ' FFixer     Facebook    (eg. "11:45").',
		'ConfFBFTimestamps24' : ' FFixer     24- .',
		'ConfFriendRequestCountInTitle' : '          .',
		'ConfGoogleApps' : ' Google     Google .',
		'ConfGoogleAppsDomain' : '',
		'ConfGoogleCalendar' : '         <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : '  <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : '    .',
		'ConfHideEventStories' : '    .',
		'ConfHideFriendStories' : '    .',
		'ConfHideGroupStories' : '    .',
		'ConfHideLikeStories' : '    "  ".',
		'ConfHideLinkStories' : '    .',
		'ConfHideNoteStories' : '    .',
		'ConfHidePhotoStories' : '    .',
		'ConfHideProfilePicStories' : '     .',
		'ConfHideRead' : '         .',
		'ConfHideRelationshipStories' : '    -  .',
		'ConfHideStatusStories' : '    .',
		'ConfHideVideoStories' : '    .',
		'ConfHideWallStories' : '    .',
		'ConfHomeChat' : '  .',
		'ConfHomeEvents' : '  .',
		'ConfHomeFindFriends' : '    .',
		'ConfHomeLeftAlign' : 'Left-align the contents of the home page.',
		'ConfHomeLeftColumn' : '   .',
		'ConfHomeLeftColumnFixed' : '    ,   .',
		'ConfHomeLink' : '      .',
		'ConfHomePeopleYouMayKnow' : '  .',
		'ConfHomeNavigation' : '  .',
		'ConfHomePokes' : '  .',
		'ConfHomeProfile' : '  .',
		'ConfHomeRequests' : '  .',
		'ConfHomeRightColumn' : '  .',
		'ConfHomeStretch' : '        .',
		'ConfiCalendar' : '     <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>    .',
		'ConfImport' : '      ,              "".',
		'ConfInboxCountInTitle' : '        .',
		'ConfLogoutLink' : '       .',
		'ConfNotificationCountInTitle' : '        .',
		'ConfNewTabSearch' : '      /   CTRL + Enter   .',
		'ConfPageTitle' : ' "Facebook |"     .',
		'ConfPhotoPopup' : '        .',
		'ConfPopupAutoClose' : '    .',
		'ConfPopupSmartAutoClose' : '            ',
		'ConfPopupPosition' : '   ',
		'ConfProcessInterval' : '   ,   (=1000):',
		'ConfProfileLink' : '      .',
		'ConfProfilePicPopup' : '         ',
		'ConfProtocolLinks' : '             (Google Talk, Windows Live  ).',
		'ConfSectionAbout' : ' FFixer',
		'ConfSectionAdvanced' : '',
		'ConfSectionEvents' : '/',
		'ConfSectionImportExport' : '/',
		'ConfSectionFeeds' : '',
		'ConfSectionHomePage' : ' ',
		'ConfSectionLiveFeed' : '',
		'ConfSectionMenu' : '/',
		'ConfSectionOther' : ' ',
		'ConfSectionPageTitle' : '  ',
		'ConfSectionPictures' : '',
		'ConfSectionShortcuts' : '  ',
		'ConfSecureLinks' : '  Facebook     HTTPS .',
		'ConfShortcutList' : '<b>  </b> (case sensitive):<br /><br /><i>  :</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> -   ( )<br />&nbsp;<b>C</b> - FFixer <br />&nbsp;<b>D</b> - <br />&nbsp;<b>E</b> - <br />&nbsp;<b>F</b> - <br />&nbsp;<b>H</b> -  <br />&nbsp;<b>I</b> - <br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by FFixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : '   .',
		'ConfSign' : '    \-    (    ).',
		'ConfTopBarFixed' : '       ,    .',
		'ConfTopBarHoverOpacity' : '   ',
		'ConfTopBarOpacity' : '    ',
		'ConfUpdates' : ' Userscripts.org     FFixer.  <a href="#" id="fbfUpdateLink" onclick="return false;"> </a>.',
		'DownloadVideo' : ' ',
		'ExportICalendarFile' : ' iCalendar ',
		'ExportICalendarFileWarning' : '(      )',
		'FacebookFixerConflict' : 'Facebook Fixer   FFixer.<br /><br />         Facebook Fixer   ,         .<br /><br />        , <a %s>   </a>.',
		'fullAlbumLoaded' : '   ',
		'Import' : '',
		'ImportConfirm' : '         ?\n     .',
		'ImportFailure' : '       .',
		'ImportSuccess' : '  .      ?',
		'Left' : '',
		'LoadingAllPhotos' : '   ...',
		'loadingFullAlbum' : '   ...',
		'LoadingPic' : '  ...',
		'LoadPhotosWarning' : '      ',
		'Months' : Array('','','','','','','','','','','',''),
		'ProtocolSkype' : '  %s  Skype',
		'ProtocolMSN' : '  %s  Windows Live',
		'ProtocolYahoo' : '  %s  Yahoo Messenger',
		'ProtocolGoogle' : '  %s  Google Talk',
		'ReloadErrorPage' : ' ,   5 ',
		'Refresh' : '',
		'Remove' : '',
		'Right' : '',
		'ShowBigPictures' : '  ',
		'Signs' : Array('','','','','','','','','','','',''),
		'today' : '',
		'Translators' : '',
		'UpdateAvailable1' : '    FFixer',
		'UpdateAvailable2' : '    ?',
		'UpdateHomepage' : '  ',
		'UpdateInstall' : ' ',
		'UpdateTomorrow' : ' ',
		'yearsOld' : '%s '
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
		'Birthday' : '%s\'s fdselsdag',
		'BookmarkAdd' : 'Legg til nytt bokmerke',
		'BookmarkExists' : 'Det er allerede et bokmerke til denne siden.\n\nG til siden du nsker  bokmerke og forsk igjen.',
		'BookmarkNamePrompt' : 'Legg inn et navn til dette bokmerketet:\n%s',
		'BookmarksConfirmRemoval' : 'Er du sikker p at du vil fjerne disse bokmerkene?',
		'BookmarksManage' : 'Behandle bokmerker',
		'BookmarksRemoveSelected' : 'Fjern valgte bokmerker',
		'Bookmarks' : 'Bokmerker',
		'BrowserUnsupported' : 'Nettleseren din sttter ikke dette valget.',                                 
		'CreatingFile' : 'Lager fil',
		'Close' : 'Lukk',
		'ConfigureFacebookFixer' : 'FFixer - Alternativer',
		'ConfigureInstructions' : 'Alle endringer lagres umiddelbart, men noen forandringer virker ikke i faner som allerede er pne.',
		'ConfAge' : 'Vis en person\'s alder p profilen (om de viser hele fdselsdatoen sin).',
		'ConfAlbumComments' : 'Legg til en lenke p album-sider for  vise alle kommentarene til albumet.',
		'ConfApplicationWhitelist' : 'Applikasjoner\'s Hvit-liste - Legg in ID\'ene til applikasjoner for  hindre at de blir skjult. Adskill ID\'er med mellomrom.',
		'ConfAutoBigAlbumPictures' : 'Automatisk vis strre albumbilder nr siden pnes.',
		'ConfAutoLoadFullAlbum' : 'Automatisk last inn fimerkebilder for alle bildene i et album p ei enkel side.',
		'ConfAutoLoadTaggedPhotos' : 'Automatisk last inn fimerkebilder for alle merkede bilder p ei enkel side (bildefaner p personer\'s profiler).',
		'ConfAutoReadMore' : 'Automatisk klikk p "les mer"-lenker.',
		'ConfBigAlbumPictures' : 'Legg til ei lenke p album sider for kunne vise strre versjoner av alle bildene p den siden.',
		'ConfBigAlbumPicturesBorder' : 'Add a border around bigger versions of pictures.',
		'ConfBookmarks' : 'Legg en bokmerke-undermeny til toppmeny-linjen.',
		'ConfBottomBarHoverOpacity' : 'Ved mus-over',
		'ConfBottomBarOpacity' : 'Bunmeny-linjen\'s gjennomsiktighet',
		'ConfCalendarBirthDate' : 'Inkluder personen\'s fdselsdato i hendelsesdetaljer.',
		'ConfCalendarFullName' : 'Bruke personen\'s fulle navn som tittel til fdselsdager (istedenfor bare fornavn).',
		'ConfChatDifferentiate' : 'Bruke fete typer og kursiv til  skille mellom tilgjengelige og fravrende venner.',
		'ConfChatHideIdle' : 'Skjul frvrende venner.',
		'ConfDelayPopupPics' : 'Legg inn en kort pause fr sprettopp-bilder vises.',
		'ConfDelayPopupPicsTimeout' : 'Pause fr sprettopp-bilder vises, i millisekunder (standard=500):',
		'ConfDownloadVideo' : 'Legg til en lenke for  kunne laste ned videoer fra video-sider. (Du kan f behov for en <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV-spiller</a>)',
		'ConfErrorPageReload' : 'Automatisk laste inn igjen en applikasjon\'s feilsider etter 5 sekunder.',
		'ConfExport' : 'For  eksportere oppsettet ditt, kopier teksten nedenfor og lagre den i en fil.',
		'ConfExternalPopup' : 'Sprettopp versjoner i full-strrelse av eksterne bilder. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Sprk til FFixer',
		'ConfFacebookTimestamps' : 'Vis Facebook tidsangivelse (eg. "3 timer siden").',
		'ConfFBFTimestamps' : 'Legg til FFixer tidsangivelser etter Facebook tider (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Vis FFixer tidsangivelser i 24-timers format.',
		'ConfFriendRequestCountInTitle' : 'Vis antall nye venneforesprsler i sidetittelen.',
		'ConfGoogleApps' : 'Gjr Google kalender-lenker kompatible med Google Apps.',
		'ConfGoogleAppsDomain' : 'Domene',
		'ConfGoogleCalendar' : 'Legg inn lenker til Legg til Fdselsdager og Hendelser for <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google kalender</a>.',
		'ConfGoogleLanguage' : 'Sprk for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Oversettelse</a>',
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
		'ConfHideRead' : 'Skjul objekter i aktiv Notis som er blitt markert som rde.',
		'ConfHideRelationshipStories' : 'Skjul Forhold-oversikt.',
		'ConfHideStatusStories' : 'Skjul Status-oversikt.',
		'ConfHideVideoStories' : 'Skjul Video-oversikt.',
		'ConfHideWallStories' : 'Skjul Vegg-oversikt.',
		'ConfHomeBeta' : 'Vis Beta Tester seksjonen.',
		'ConfHomeChat' : 'Vis  Chat-seksjonen.',
		'ConfHomeEvents' : 'Vis Hendelse-seksjonen.',
		'ConfHomeFindFriends' : 'Vis Koble til Venner-seksjonen.',
		'ConfHomeLeftAlign' : 'Venstrestill innhold p Hjem-siden.',
		'ConfHomeLeftColumn' : 'Vis venstre kolonne.',
		'ConfHomeLeftColumnFixed' : 'Behold den venstre kolonnen synlig, selv etter rulling nedover.',
		'ConfHomeLink' : 'Vis Hjem-lenken i toppmeny-feltet.',
		'ConfHomeNavigation' : 'Vis Navigasjons-seksjonen.',
		'ConfHomePokes' : 'Vis Pokes-seksjonen.',
		'ConfHomeProfile' : 'Vis Profil-seksjonen.',
		'ConfHomeRecommendations' : 'Vis anbefalinger (Personer du kanskje kjenner, anbefalte sider etc).',
		'ConfHomeRequests' : 'Vi Foresprsel-seksjonen.',
		'ConfHomeRightColumn' : 'Vis hyre kolonne.',
		'ConfHomeStretch' : 'Strekk siden Hjem til netteleserens vidde fullt ut.',
		'ConfHomeStretchComments' : 'Strekk kommentarfeltene p Hjem-sida.',
		'ConfiCalendar' : 'Legg lenke til Laste ned en <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> fil med alle fdselsdagene.',
		'ConfImport' : 'For  kunne importere oppsettet ditt senere, skriver du over teksten nedenfor med teksten du lagret idligere og klikk "Import".',
		'ConfInboxCountInTitle' : 'Vis antall nye innboks-meldinger p tittellinjen til siden.',
		'ConfLogoutLink' : 'Legg til en Logg-ut lenke p topp-meny linjen.',
		'ConfNotificationCountInTitle' : 'Vis antall nye Varsler i sidetittelen.',
		'ConfNewTabSearch' : 'La skeresultatet pnes i ny fane/vindu ved sk med trykk av CTRL + Enter.',
		'ConfPageTitle' : 'Fjern "Facebook |" fra tittelen p hver side.',
		'ConfPhotoPopup' : 'Sprettopp strre versjoner av bilder ved mus-over.',
		'ConfPopupAutoClose' : 'Lukk sprettopp-bilder automatisk.',
		'ConfPopupSmartAutoClose' : 'Hindre sprettopp-bilder i  lukkes automatisk om musen er over det.',
		'ConfPopupPosition' : 'Posisjon for sprettopp-bilder',
		'ConfProcessInterval' : 'Intervall for  lage siden, i millisekund (standard=1000):',
		'ConfProfileLink' : 'Vis Profil-lenken i toppmeny linjen.',
		'ConfProfilePicPopup' : 'Sprettopp strre versjoner av profil-bilder ved musover',
		'ConfProtocolLinks' : 'Endre meldings ID\'er p profiler til lenker som starter en dialog med dem (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Om FFixer',
		'ConfSectionAdvanced' : 'Avansert',
		'ConfSectionEvents' : 'Fdselsdager/Hendelser',
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
		'ConfShortcutList' : '<b>Tastatur-Snarveier</b> (sm/store sensitive):<br /><br /><i>Fra hvilken som helst side:</i><br /> <b>A</b> - Album/bilder<br /> <b>B</b> - Handtere venneliste (nettvenner)<br /> <b>C</b> - FFixer oppsett<br /> <b>D</b> - Fdselsdager<br /> <b>E</b> - Hendelser<br /> <b>F</b> - Venner<br /> <b>H</b> - Hjem side<br /> <b>I</b> - Innboks<br /> <b>K</b> - Legg til Bokmerke<br /> <b>L</b> - Velg Logg ut lenken (trykk Enter etterp for  logge ut)<br /> <b>N</b> - Varsler<br /> <b>P</b> - Din Profil<br /> <b>R</b> - Foresprsler<br /> <b>S</b> - Hopp til skefeltet<br /> <b>T</b> - Oversett valgt tekst<br /> <b>?</b> - Vis FFixer\'s feilrette-info<br /> <b><escape></b> - Lukk sprettopp\'er laget av FFixer<br /><br /><i>Fra Hjem siden (filtere)</i>:<br /> <b>a</b> - Sider<br /> <b>f</b> - Aktiv Notis<br /> <b>g</b> - Grupper<br /> <b>l</b> - Lenker<br /> <b>n</b> - Nyhets Notiser<br /> <b>p</b> - Bilder<br /> <b>s</b> eller <b>u</b> - Status-Oppdateringer<br /> <b>t</b> - Notater<br /> <b>v</b> - Videoer<br /><br /><i>Fra profiler</i>:<br /> <b>i</b> - Info<br /> <b>p</b> - Bilder<br /> <b>w</b> - Vegg<br /> <b>x</b> - Bokser<br /><br /><i>Fra sider med nummerering (forrige, neste, etc)</i><br /> <b><venstre pil></b> - Forrige<br /> <b><hyre pil></b> - Neste<br /> <b><shift> + <venstre pil></b> - Frste (nr tilgjengelig)<br /> <b><shift> + <hyre pil></b> - Siste (nr tilgjengelig)<br /><br /><i>Mens man ser p album/bilder:</i><br /> <b>a</b> - Last alle frimerkebilder (nr tilgjengelig)<br /> <b>b</b> - Vis store bilder<br /> <b>c</b> - Se p kommentarer<br /> <b>k</b> - Tilbake til album<br /> <b>m</b> - Bilder av (person) og meg<br /><br /><i>Mens man ser p siste album og opplastede/merkede bilder:</i><br /> <b>a</b> eller  <b>r</b> - Siste Album<br /> <b>m</b> eller  <b>u</b> - Mobile opplastinger<br /> <b>o</b> - Bilder av meg<br /> <b>p</b> - Mine bilder<br /> <b>t</b> eller  <b>f</b> - Merkede venner',
		'ConfShortcuts' : 'Aktiver tastatur-snarveier.',
		'ConfSign' : 'Vis en person\'s stjernetegn p profilen (om de oppgir fdselsdatoen sin).',
		'ConfTopBarFixed' : 'Behold alltid toppmeny-linjen p skjermen, til og med etter rulling nedover.',
		'ConfTopBarHoverOpacity' : 'Ved mus-over',
		'ConfTopBarOpacity' : 'Toppmenyens gjennomsiktighet',
		'ConfUpdates' : 'Sjekk Userscripts.org daglig etter oppdateinger til FFixer. Eller <a href="#" id="fbfUpdateLink" onclick="return false;">sjekk n</a>.',
		'DownloadVideo' : 'Last ned video',
		'ExportICalendarFile' : 'Eksporter iCalendar fil',
		'ExportICalendarFileWarning' : '(Dette vil ta ei stund om du har mange venner)',
		'FacebookFixerConflict' : 'Facebook Fixer er n kjent som FFixer.<br /><br />P grunn av navnebyttet m du manuelt avinstallere Facebook Fixer fra nettleseren din, ellers vil de to scriptene komme i konflikt med hverandre.<br /><br />Dersom du ikke er sikker p hvordan man avinstallerer et brukerscript, <a %s>klikk her for instruksjoner</a>.',
		'fullAlbumLoaded' : 'hele album lastet',
		'Import' : 'Importer',
		'ImportConfirm' : 'Er du sikker p at du vil importere dette oppsettet?\nDine nvrende valg vil bli tapt.',
		'ImportFailure' : 'En feil oppstod mmens oppsettet ditt ble forskt importert.',
		'ImportSuccess' : 'Importering fullfrt. nsker du  oppfriske siden?',
		'Left' : 'Venstre',
		'LoadingAllPhotos' : 'Laster alle bilder...',
		'loadingFullAlbum' : 'Laster hele album...',
		'LoadingPic' : 'Laster bilde...',
		'LoadPhotosWarning' : 'Laste alle bilder kan ta lang tid',
		'Months' : new Array('Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'),
		'ProtocolSkype' : 'Ring %s ved  bruke Skype',
		'ProtocolMSN' : 'Chat med %s ved  bruke Windows Live',
		'ProtocolYahoo' : 'Chat med %s ved  bruke Yahoo Messenger',
		'ProtocolGoogle' : 'Chat med %s ved  bruke Google Talk',
		'ReloadErrorPage' : 'Klikk for  forske p nytt, eller vent 5 sekunder',
		'Refresh' : 'Oppfrisk',
		'Remove' : 'Fjern',
		'Right' : 'Hyre',
		'ShowBigPictures' : 'Vis store bilder',
		'Signs' : new Array('Steinbukken','Vannmannen','Fiskene','Vren','Tyren','Tvillingene','Krepsen','Lven','Jomfruen','Vekten','Skorpionen','Skytten'),
		'today' : 'i dag',
		'Translators' : 'Oversettere',
		'UpdateAvailable1' : 'En oppdatering til FFixer er tilgjengelig',
		'UpdateAvailable2' : 'Vil du oppdatere n?',
		'UpdateHomepage' : 'G til hjem siden',
		'UpdateInstall' : 'Installer n',
		'UpdateTomorrow' : 'Minn meg p om dette i morgen',
		'ViewAlbumComments' : 'Vis album-kommentarer',
		'yearsOld' : '%s r gammel'
	},

	// Korean - Contributed by  (20100823)
	ko : {
		'_language' : 'Korean',
		'AddToCalendar' : ' ',
		'AddToGoogleCalendar' : '  ',
		'all' : '',
		'All' : ' ',
		'AllPhotosLoaded' : '  ',
		'Automatic' : '',
		'Birthday' : '%s\ ',
		'BookmarkAdd' : ' ',
		'BookmarkExists' : '     .\n\n     .',
		'BookmarkNamePrompt' : ' :\n%s',
		'BookmarksConfirmRemoval' : '   ?',
		'BookmarksManage' : ' ',
		'BookmarksRemoveSelected' : '  ',
		'Bookmarks' : '',
		'BrowserUnsupported' : '     .',
		'CreatingFile' : '  ',
		'Close' : '',
		'ConfigureFacebookFixer' : 'FFixer ',
		'ConfigureInstructions' : '  .        .',
		'ConfAge' : '     (  ).',
		'ConfAlbumComments' : '  "   "  .',
		'ConfApplicationWhitelist' : '  -    ID . ID   .',
		'ConfAutoBigAlbumPictures' : '     .',
		'ConfAutoLoadFullAlbum' : '     .',
		'ConfAutoLoadTaggedPhotos' : '     .',
		'ConfAutoReadMore' : '" "   .',
		'ConfBigAlbumPictures' : '  "  "  .',
		'ConfBookmarks' : '      .',
		'ConfBottomBarHoverOpacity' : '  ',
		'ConfBottomBarOpacity' : '  ',
		'ConfCalendarBirthDate' : '    .',
		'ConfCalendarFullName' : '      (   ).',
		'ConfChatDifferentiate' : '         .',
		'ConfChatHideIdle' : '   .',
		'ConfDelayPopupPics' : '    .',
		'ConfDelayPopupPicsTimeout' : '     , 1/1000  ( 500):',
		'ConfDownloadVideo' : '    . (<a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV </a>  )',
		'ConfErrorPageReload' : '   5   .',
		'ConfExport' : '       .',
		'ConfExternalPopup' : '         . <sup></sup>',
		'ConfFacebookFixerLanguage' : 'FFixer  ',
		'ConfFacebookTimestamps' : 'Facebook    (. " 3 ").',
		'ConfFBFTimestamps' : 'FFixer   Facebook    (. "11:45").',
		'ConfFBFTimestamps24' : 'FFixer  24  .',
		'ConfFriendRequestCountInTitle' : '     .',
		'ConfGoogleApps' : ' Apps     .',
		'ConfGoogleAppsDomain' : '',
		'ConfGoogleCalendar' : '  <a href="http://www.google.com/support/calendar/bin/topic.py?hl=kr&topic=13732" target="_blank"> </a>   .',
		'ConfGoogleLanguage' : '<a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank"> </a>  ',
		'ConfHideApplicationStories' : '  .',
		'ConfHideEventStories' : '  .',
		'ConfHideFacebookCountInTitle' : 'Facebook   .',
		'ConfHideFriendStories' : '  .',
		'ConfHideGroupStories' : '  .',
		'ConfHideLikeStories' : '""  .',
		'ConfHideLinkStories' : '  .',
		'ConfHideNoteStories' : '  .',
		'ConfHidePhotoStories' : '  .',
		'ConfHideProfilePicStories' : '   .',
		'ConfHideRead' : '    .',
		'ConfHideRelationshipStories' : '/  .',
		'ConfHideStatusStories' : '" "  .',
		'ConfHideVideoStories' : '  .',
		'ConfHideWallStories' : '  .',
		'ConfHomeBeta' : 'Facebook Sneak Peek .',
		'ConfHomeChat' : ' .',
		'ConfHomeEvents' : ' .',
		'ConfHomeFindFriends' : ' .',
		'ConfHomeLeftAlign' : '   .',
		'ConfHomeLeftColumn' : '  .',
		'ConfHomeLeftColumnFixed' : '      .',
		'ConfHomeLink' : '    " "  .',
		'ConfHomeNavigation' : '  .',
		'ConfHomePokes' : 'Pokes .',
		'ConfHomeProfile' : ' .',
		'ConfHomeRecommendations' : ' .',
		'ConfHomeRequests' : ' .',
		'ConfHomeRightColumn' : '  .',
		'ConfHomeStretch' : '        .',
		'ConfHomeStretchComments' : '     .',
		'ConfiCalendar' : '  <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>    .',
		'ConfImport' : '        "" .',
		'ConfInboxCountInTitle' : '     .',
		'ConfLogoutLink' : '      .',
		'ConfNotificationCountInTitle' : '     .',
		'ConfNewTabSearch' : ' CTRL+    /  .',
		'ConfPageTitle' : '"Facebook |"   .',
		'ConfPhotoPopup' : '        .',
		'ConfPopupAutoClose' : '   .',
		'ConfPopupSmartAutoClose' : '       .',
		'ConfPopupPosition' : '  ',
		'ConfProcessInterval' : '  , 1/1000  ( 1000):',
		'ConfProfileLink' : '      .',
		'ConfProfilePicPopup' : '       .',
		'ConfProtocolLinks' : '   ID(,   , )      .',
		'ConfSectionAbout' : 'FFixer...',
		'ConfSectionAdvanced' : '',
		'ConfSectionEvents' : '/',
		'ConfSectionImportExport' : '/',
		'ConfSectionFeeds' : '',
		'ConfSectionHomePage' : ' ',
		'ConfSectionLiveFeed' : '',
		'ConfSectionMenu' : '/',
		'ConfSectionOther' : '  ',
		'ConfSectionPageTitle' : ' ',
		'ConfSectionPictures' : '',
		'ConfSectionShortcuts' : ' ',
		'ConfSecureLinks' : ' HTTPS  Facebook .',
		'ConfShortcutList' : '<b> </b> ( ):<br /><br /><i>  </i>:<br />&nbsp;<b>A</b> - /<br />&nbsp;<b>B</b> -   /<br />&nbsp;<b>C</b> - FFixer <br />&nbsp;<b>D</b> - <br />&nbsp;<b>E</b> - <br />&nbsp;<b>F</b> - <br />&nbsp;<b>H</b> -  <br />&nbsp;<b>I</b> - <br />&nbsp;<b>K</b> -  <br />&nbsp;<b>L</b> -    (   )<br />&nbsp;<b>N</b> - <br />&nbsp;<b>P</b> -  <br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> -    <br />&nbsp;<b>T</b> -   <br />&nbsp;<b>?</b> - FFixer   <br />&nbsp;<b>&lt;ESC&gt;</b> - FFixer   <br /><br /><i> ()</i>:<br />&nbsp;<b>a</b> - <br />&nbsp;<b>f</b> - <br />&nbsp;<b>g</b> - <br />&nbsp;<b>l</b> -<br />&nbsp;<b>n</b> -  <br />&nbsp;<b>p</b> - <br />&nbsp;<b>s</b>  <b>u</b> -  <br />&nbsp;<b>t</b> - <br />&nbsp;<b>v</b> - <br /><br /><i>  </i>:<br />&nbsp;<b>i</b> - <br />&nbsp;<b>p</b> - <br />&nbsp;<b>w</b> - <br />&nbsp;<b>x</b> - Boxes<br /><br /><i>   (, , )</i>:<br />&nbsp;<b>&lt;&gt;</b> - <br />&nbsp;<b>&lt;&gt;</b> - <br />&nbsp;<b>&lt;Shift&gt; + &lt;&gt;</b> -  ()<br />&nbsp;<b>&lt;Shift&gt; + &lt;&gt;</b> -  ()<br /><br /><i>/  </i>:<br />&nbsp;<b>a</b> -    ()<br />&nbsp;<b>b</b> -   <br />&nbsp;<b>c</b> -  <br />&nbsp;<b>k</b> -  <br />&nbsp;<b>m</b> - ( )  <br /><br /><i>  /   :</i><br />&nbsp;<b>a</b>  &nbsp;<b>r</b> -  <br />&nbsp;<b>m</b>  <b>u</b> -  <br />&nbsp;<b>o</b> -   <br />&nbsp;<b>p</b> - <br />&nbsp;<b>t</b>  <b>f</b> -   ',
		'ConfShortcuts' : '  .',
		'ConfSign' : '     (  ).',
		'ConfTopBarFixed' : '        .',
		'ConfTopBarHoverOpacity' : '  ',
		'ConfTopBarOpacity' : '    ',
		'ConfUpdates' : ' Userscripts.org FFixer  . <a href="#" id="fbfUpdateLink" onclick="return false;"> </a>.',
		'DownloadVideo' : ' ',
		'ExportICalendarFile' : 'iCalender  ',
		'ExportICalendarFileWarning' : '(     )',
		'FacebookFixerConflict' : 'Facebook Fixer  FFixer .<br /><br />Facebook Fixer        .<br /><br />userscript    <a %s> </a>.',
		'fullAlbumLoaded' : '  ',
		'Import' : '',
		'ImportConfirm' : '  ?\n  .',
		'ImportFailure' : '    .',
		'ImportSuccess' : '  .  ?',
		'Left' : '',
		'LoadingAllPhotos' : '  ...',
		'loadingFullAlbum' : '  ...',
		'LoadingPic' : ' ...',
		'LoadPhotosWarning' : '       ',
		'Months' : new Array('1','2','3','4','5','6','7','8','9','10','11','12'),
		'ProtocolSkype' : 'Skype %s ',
		'ProtocolMSN' : 'Windows Live %s ',
		'ProtocolYahoo' : '  %s ',
		'ProtocolGoogle' : '   %s ',
		'ReloadErrorPage' : '   5 ',
		'Refresh' : '',
		'Remove' : '',
		'Right' : '',
		'ShowBigPictures' : '  ',
		'Signs' : new Array('','','','','','','','','','','',''),
		'today' : '',
		'Translators' : ' ',
		'UpdateAvailable1' : 'FFixer  ',
		'UpdateAvailable2' : '  ?',
		'UpdateHomepage' : ' ',
		'UpdateInstall' : '  ',
		'UpdateTomorrow' : '  ',
		'ViewAlbumComments' : '   ',
		'yearsOld' : '%s'
	},
	
	// Vietnamese - Contributed by Trn c Thnh (20100104)
	// Hi vng nhn c gp  ca mi ngi v bn dch, email: tranducthinh4102@gmail.com
	vi : {
		'_language' : 'Ting Vit',
		'AddToCalendar' : 'Thm vo lch',
		'AddToGoogleCalendar' : 'Thm vo lch ca Google',
		'all' : 'tt c',
		'All' : 'Tt c',
		'AllPhotosLoaded' : 'Ti tt c cc bc nh',
		'Automatic' : 'T ng',
		'Birthday' : 'sinh nht ca %s',
		'BookmarkAdd' : 'Thm Bookmark mi',
		'BookmarkExists' : 'Trang ny  c nh du.\n\nTruy cp vo trang bn mun nh du v th li.',
		'BookmarkNamePrompt' : 't tn cho trang nh du ny:\n%s',
		'BookmarksConfirmRemoval' : 'Bn mun xa cc bookmark  chn?',
		'BookmarksManage' : 'Qun l Bookmarks',
		'BookmarksRemoveSelected' : 'Xa cc Bookmarks  chn',
		'Bookmarks' : 'Bookmarks',
		'BrowserUnsupported' : 'Trnh duyt ca bn khng h tr tnh nng ny.',
		'CreatingFile' : 'To tp tin',
		'Close' : 'ng',
		'ConfigureFacebookFixer' : 'Ci t FFixer',
		'ConfigureInstructions' : 'Mi thit lp s c lu ngay lp tc, nhng mt s thay i khng c tc dng trong cc th ang m.',
		'ConfAge' : 'Hin th tui ca mt ngi trong thng tin ca h (nu h cung cp ngy sinh y ).',
		'ConfAlbumComments' : 'Thm mt lin kt  hin th tt c cc bnh lun v album  pha trn album',
		'ConfApplicationWhitelist' : 'Danh sch trng cc ng dng - Nhp ID ca cc ng dng  n khng b n. Cc ID cch nhau bi khong trng (du cch).',
		'ConfAutoBigAlbumPictures' : 'T ng hin th hnh nh ln hn khi trang web m ra.',
		'ConfAutoLoadFullAlbum' : 'T ng ti thumbnails ca tt c hnh nh ca album trong mt trang web.',
		'ConfAutoLoadTaggedPhotos' : 'T ng ti thumbnnails cho tt c cc hnh nh c tag trong mt trang (the photos tab on people\'s profiles).',
		'ConfAutoReadMore' : 'T ng click vo lin kt "see more".',
		'ConfBigAlbumPictures' : 'Thm lin kt trn cc album  hin th cc phin bn ln hn ca cc hnh nh trn trang ',
		'ConfBigAlbumPicturesBorder' : 'Thm vin xung quanh phin bn ln hn ca hnh nh',
		'ConfBookmarks' : 'Thm menu Bookmarks vo thanh trnh n trn cng.',
		'ConfBottomBarHoverOpacity' : 'Khi chut  trn',
		'ConfBottomBarOpacity' : ' trong sut ca thanh thc n pha di',
		'ConfCalendarBirthDate' : 'Bao gm ngy sinh trong nhng chi tit s kin.',
		'ConfCalendarFullName' : 'S dng tn y  nh tiu  cho ngy sinh (thay v ch l tn).',
		'ConfChatDifferentiate' : 'S dng ch in m v in nghing  phn bit bn b ang online v ang ri.',
		'ConfChatHideIdle' : 'n nhng bn b ang ri.',
		'ConfDelayPopupPics' : 'Thm mt khong tr trc khi hin th hnh nh bung ra.',
		'ConfDelayPopupPicsTimeout' : 'Thi gian trc khi hin th hnh nh bung ra, trong mili giy (mc nh=500):',
		'ConfDownloadVideo' : 'Thm mt lin kt  ti xung cc video th cc trang video. (Bn c th cn mt <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">chng trnh chi FLV</a>)',
		'ConfErrorPageReload' : 'T ng ti li nhng trang ng dng li sau 5 giy.',
		'ConfExport' : ' trch xut cc thit lp ca bn, sao chp on vn bn di y v lu n trong mt tp tin.',
		'ConfExternalPopup' : 'Phin bn ng kch c ca hnh nh. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Ngn ng cho FFixer',
		'ConfFacebookTimestamps' : 'Hin mc thi gian ca facebook (v d: "3 hours ago").',
		'ConfFBFTimestamps' : 'Thm mc thi gian ca FFixer sau mc thi gian ca Facebook (v d: "11:45").',
		'ConfFBFTimestamps24' : 'Hin th mc thi gian ca FFixer dng 24 gi.',
		'ConfFriendRequestCountInTitle' : 'Hin th s yu cu kt bn trong tiu  ca trang.',
		'ConfGoogleApps' : 'To Google Calendar tng thch vi Google Apps',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Thm lin kt  thm ngy sinh v cc s kin cho <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Language for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'n lch s ca cc ng dng.',
		'ConfHideEventStories' : 'n lch s cc s kin.',
		'ConfHideFacebookCountInTitle' : 'n s tin nhn trong hp th n ca  Facebook.',
		'ConfHideFriendStories' : 'n lch s ca bn b.',
		'ConfHideGroupStories' : 'n lch s ca nhm.',
		'ConfHideLikeStories' : 'n lch s "Thch".',
		'ConfHideLinkStories' : 'n lch s ca lin kt.',
		'ConfHideNoteStories' : 'n lch s ca ghi ch.',
		'ConfHidePhotoStories' : 'n lch s ca hnh nh.',
		'ConfHidePlaceStories' : 'n lch s ca a ch.',
		'ConfHideProfilePicStories' : 'n lch s ca hnh nh profile.',
		'ConfHideRead' : 'n nhng mc trong feed  nh du l  c.',
		'ConfHideRelationshipStories' : 'n lch s quan h.',
		'ConfHideStatusStories' : 'n lch s trng thi.',
		'ConfHideVideoStories' : 'n lch s video.',
		'ConfHideWallStories' : 'n lch s ca tng.',
		'ConfHomeBeta' : 'Hin th Facebook Sneak Peek.',
		'ConfHomeChat' : 'Hin th Chat.',
		'ConfHomeEvents' : 'Hin th Events.',
		'ConfHomeFindFriends' : 'Hin th Kt Ni.',
		'ConfHomeLeftAlign' : 'Cn tri ni dung ca trang ch.',
		'ConfHomeLeftColumn' : 'Hin th ct bn tri.',
		'ConfHomeLeftColumnFixed' : 'Hin th ct bn tri, ngay c khi cun xung.',
		'ConfHomeLink' : 'Hin th lin kt "Trang Ch" trong thanh thc n trn cng.',
		'ConfHomeNavigation' : 'Hin th Danh Mc',
		'ConfHomePokes' : 'Hin th Pokes',
		'ConfHomeProfile' : 'Hin th "Thng tin".',
		'ConfHomeRecommendations' : 'Hin th recommendations (People You May Know, Recommended Pages etc).',
		'ConfHomeRequests' : 'Hin th Requests.',
		'ConfHomeRightColumn' : 'Hin th ct bn phi.',
		'ConfHomeStretch' : 'Hin th trang ch ht chiu rng ca trnh duyt',
		'ConfHomeStretchComments' : 'Ko cng nhng bnh lun trn trang ch',
		'ConfiCalendar' : 'Thm lin kt  ti v mt tp tin <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> c tt c ngy sinh.',
		'ConfImport' : ' nhp cc thit lp ca bn, ghi  ln on vn bn di y bng cc on bn  lu trc  v kch vo nt "Nhp Vo".',
		'ConfInboxCountInTitle' : 'Hin th s tin nhn trong hp th n trn tiu  trang.',
		'ConfLogoutLink' : 'Thm mt lin kt "ng xut" vo thanh trnh n trn cng.',
		'ConfNotificationCountInTitle' : 'Hin th s thng bo mi trong tiu  trang.',
		'ConfNewTabSearch' : ' kt qu tm kim m trong mt th/ca s mi khi nhn Ctrl + Enter khi tm kim',
		'ConfPageTitle' : 'Xa "Facebook |" khi tiu  ca mi trang.',
		'ConfPhotoPopup' : 'Bung ra bn ln hn ca nhng bc nh khi  chut  trn hnh nh.',
		'ConfPopupAutoClose' : 'T ng ng hnh nh bung ra.',
		'ConfPopupSmartAutoClose' : 'Khng t ng ng hnh nh  bung ra khi con chut  trn n.',
		'ConfPopupPosition' : 'V tr bung hnh nh',
		'ConfProcessInterval' : 'Khong thi gian  x l cc trang, tnh bng mili giy (mc nh =1000):',
		'ConfProfileLink' : 'Hin th lin kt "Trang c nhn" trn thanh trnh n trn cng.',
		'ConfProfilePicPopup' : 'Bung ra hnh nh ca nh c nhn khi  chut  trn nh',
		'ConfProtocolLinks' : 'Turn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Thng tin v FFixer',
		'ConfSectionAdvanced' : 'La chn nng cao',
		'ConfSectionEvents' : 'Sinh nht/S Kin',
		'ConfSectionImportExport' : 'Nhp Vo/Trch Xut',
		'ConfSectionFeeds' : 'Feeds',
		'ConfSectionHomePage' : 'Trang Ch',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menus/Chat',
		'ConfSectionOther' : 'La chn khc',
		'ConfSectionPageTitle' : 'Tiu  trang',
		'ConfSectionPictures' : 'Hnh nh',
		'ConfSectionShortcuts' : 'Phm tt',
		'ConfSecureLinks' : 'Bt buc cc link ca facebook s dng giao thc https:// .',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - Ty Chnh FFixer<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by FFixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Kch hot tnh nng phm tt.',
		'ConfSign' : 'Hin chm sao ca mt ngi trong thng tin ca h (nu h cung cp y  ngy sinh).',
		'ConfTopBarFixed' : 'Gi thanh thc n lun pha trn mn hnh, c khi di chuyn xung.',
		'ConfTopBarHoverOpacity' : 'Khi chut  trn',
		'ConfTopBarOpacity' : ' trong sut ca thanh thc n pha trn',
		'ConfUpdates' : 'Hy truy cp vo Userscripts.org hng ngy  cp nht FFixer. hoc <a href="#" id="fbfUpdateLink" onclick="return false;">kim tra ngay</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(iu ny s mt mt khong thi gian nu bn c rt nhiu bn b)',
		'FacebookFixerConflict' : 'Facebook Fixer nay c gi l FFixer.<br /><br />Bi v thay i tn nn bn cn phi t g b Facebook Fixer t trnh duyt ca bn, hoc hai kch bn s xung t vi nhau.<br /><br />Nu bn khng bit g b mt userscript, <a %s>bm vo y  c hng dn</a>.',
		'fullAlbumLoaded' : 'ti y  album',
		'Import' : 'Nhp vo',
		'ImportConfirm' : 'Bn c chc chn mun nhp cc thit lp ny?\nCc ci t hin ti ca bn s b mt.',
		'ImportFailure' : ' xy ra li khi nhp cc thit lp ca bn.',
		'ImportSuccess' : 'Qu trnh nhp hon thnh. Bn c mun ti li trang?',
		'Left' : 'Bn tri',
		'LoadingAllPhotos' : 'ang ti tt c cc nh...',
		'loadingFullAlbum' : 'ang ti tt c album...',
		'LoadingPic' : 'ang ti nh...',
		'LoadPhotosWarning' : 'Ti tt c cc hnh nh c th mt mt thi gian di',
		'Months' : new Array('Thng 1','Thng 2','Thng 3','Thng 4','Thng 5','Thng 6','Thng 7','Thng 8','Thng 9','Thng 10','Thng 11','Thng 12'),
		'ProtocolSkype' : 'Gi cho %s bng Skype',
		'ProtocolMSN' : 'Chat vi %s bng Windows Live',
		'ProtocolYahoo' : 'Chat vi %s bng Yahoo Messenger',
		'ProtocolGoogle' : 'Chat vi %s bng Google Talk',
		'ReloadErrorPage' : 'Click  th li, hoc i 5 giy',
		'Refresh' : 'Lm Ti',
		'Remove' : 'Xa',
		'Right' : 'Bn phi',
		'ShowBigPictures' : 'Hin th hnh nh ln',
		'Signs' : new Array('Ma Kt','Bo Bnh','Song Ng','Dng Cu','Kim Ngu','Song T','C Gii','S T','X N','Thin Bnh','H Cp','Nhn M'),
		'today' : 'hm nay',
		'Translators' : 'Translators',
		'UpdateAvailable1' : ' c bn cp nht mi cho FFixer',
		'UpdateAvailable2' : 'Bn c mun cp nht ngay?',
		'UpdateHomepage' : 'i n trang ch',
		'UpdateInstall' : 'Ci t ngay',
		'UpdateTomorrow' : 'Nhc li sau',
		'ViewAlbumComments' : 'Xem bnh lun v album',
		'yearsOld' : '%s tui'
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
	   'ConfigureFacebookFixer' : 'Atur FFixer',
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
	   'ConfFacebookFixerLanguage' : 'Bahasa untuk FFixer',
	   'ConfFacebookTimestamps' : 'Tampilkan cap waktu Facebook (contoh "3 jam lalu").',
	   'ConfFBFTimestamps' : 'Tambahkan cap waktu FFixer setelah cap waktu Facebook (contoh "11:45").',
	   'ConfFBFTimestamps24' : 'Tampilkan cap waktu FFixer dalam format 24 jam.',
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
	   'ConfSectionAbout' : 'Tentang FFixer',
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
	   'ConfShortcutList' : '<b>Keyboard Shortcut</b> (case sensitive):<br /><br /><i>Dari beberapa halaman:</i><br />&nbsp;<b>A</b> - Album/foto<br />&nbsp;<b>B</b> - Daftar teman (teman yang sedang online)<br />&nbsp;<b>C</b> - Pengaturan FFixer<br />&nbsp;<b>D</b> - Ulang Tahun<br />&nbsp;<b>E</b> - Acara<br />&nbsp;<b>F</b> - Teman<br />&nbsp;<b>H</b> - Halaman Beranda<br />&nbsp;<b>I</b> - Kotak Masuk<br />&nbsp;<b>K</b> - Tambahkan Bookmark<br />&nbsp;<b>L</b> - Pilih tautan keluar/logout (tekan Enter setelah itu untuk loh out)<br />&nbsp;<b>N</b> - Pemberitahuan<br />&nbsp;<b>P</b> - Profile Anda<br />&nbsp;<b>R</b> - Permintaan<br />&nbsp;<b>S</b> - Pencarian<br />&nbsp;<b>T</b> - Terjemahkan teks terpilih<br />&nbsp;<b>?</b> - Tampilkan info debug FFixer<br />&nbsp;<b>&lt;escape&gt;</b> - Tutup popp-up yang dibuat FFixer<br /><br /><i>Dari halaman beranda (filter)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - feed hidup<br />&nbsp;<b>g</b> - Group<br />&nbsp;<b>l</b> - Tautan<br />&nbsp;<b>n</b> - feed berita<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>s</b> or <b>u</b> - Status<br />&nbsp;<b>t</b> - Catatan<br />&nbsp;<b>v</b> - Video<br /><br /><i>Dari profil</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>w</b> - Dindinf<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>Dari halaman dengan pagination (previous, next, dll)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (jika tersedia)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (jika tersedia)<br /><br /><i>Ketika melihat album/foto:</i><br />&nbsp;<b>a</b> - Muat semua penuh (jika tersedia)<br />&nbsp;<b>b</b> - Tmapilkan gambar besar<br />&nbsp;<b>c</b> - Lihat komentar<br />&nbsp;<b>k</b> - Kembali ke album<br />&nbsp;<b>m</b> - Foto dari (seseorang) dan saya<br /><br /><i>Ketika melihat album sekarang dan foto yang dipload/tag:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Album sekarang<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Upload dari Hp<br />&nbsp;<b>o</b> - Foto dari saya<br />&nbsp;<b>p</b> - Foto saya<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Teman yang ditandai',
	   'ConfShortcuts' : 'Aktifkan keyboard shortcut.',
	   'ConfSign' : 'Tampilkan zodiak seseorang pada profilnya (apabila mereka menampilkan tanggal ulang tahunnya lengkap).',
	   'ConfTopBarFixed' : 'Selalu pertahankan menu bar atas pada layar, juga saat menggulung layar browser Anda.',
	   'ConfTopBarHoverOpacity' : 'Pada mouse-over',
	   'ConfTopBarOpacity' : 'Menu bar atas transparan',
	   'ConfUpdates' : 'Cek Userscripts.org setiap hari untuk update FFixer. Atau <a href="#" id="fbfUpdateLink" onclick="return false;">cek sekarang</a>.',
	   'DownloadVideo' : 'Unduh Video',
	   'ExportICalendarFile' : 'Export file iCalendar',
	   'ExportICalendarFileWarning' : '(Ini akan memakan waktu lama apabila Anda mempunyai banyak teman)',
	   'FacebookFixerConflict' : 'Facebook Fixer sekarang dikenal dengan nama FFixer.<br /><br />Karena pergantian nama Anda harus menguninstal Facebook Fixer dari browser Anda, atau dua script ini akan bertentangan satu sama lain.<br /><br />Jika Anda tidak mengetahui cara untuk menguninstal script ini, <a %s>Klick disini untuk tata caranya</a>.',
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
	   'UpdateAvailable1' : 'Update tersedia untuk FFixer',
	   'UpdateAvailable2' : 'Apakah Anda ingin mengupdate sekarang?',
	   'UpdateHomepage' : 'Pergi ke halaman beranda',
	   'UpdateInstall' : 'Instal sekarang',
	   'UpdateTomorrow' : 'Peringatkan besok',
	   'yearsOld' : '%s tahun'
	},
	
	// Japanese - Contributed by Masami HIRATA (20110306)
	ja : {
		'_language' : '',
		'AddToCalendar' : '',
		'AddToGoogleCalendar' : 'Google',
		'all' : '',
		'All' : '',
		'AllPhotosLoaded' : '',
		'Automatic' : '',
		'Birthday' : '%s',
		'BookmarkAdd' : '',
		'BookmarkExists' : '\n\n',
		'BookmarkNamePrompt' : ':\n%s',
		'BookmarksConfirmRemoval' : '',
		'BookmarksManage' : '',
		'BookmarksRemoveSelected' : '',
		'Bookmarks' : '',
		'BrowserUnsupported' : '',
		'CreatingFile' : '',
		'Close' : '',
		'ConfigureFacebookFixer' : 'FFixer',
		'ConfigureInstructions' : '',
		'ConfAge' : '',
		'ConfApplicationWhitelist' : ' - IDID',
		'ConfAutoBigAlbumPictures' : '',
		'ConfAutoLoadFullAlbum' : '',
		'ConfAutoLoadTaggedPhotos' : '',
		'ConfAutoReadMore' : '',
		'ConfBigAlbumPictures' : '',
		'ConfBigAlbumPicturesBorder' : '',
		'ConfBookmarks' : '',
		'ConfBottomBarHoverOpacity' : '',
		'ConfBottomBarOpacity' : '',
		'ConfCalendarBirthDate' : '',
		'ConfCalendarFullName' : '',
		'ConfChatDifferentiate' : '',
		'ConfChatHideIdle' : '',
		'ConfDelayPopupPics' : '',
		'ConfDelayPopupPicsTimeout' : '500: ',
		'ConfDownloadVideo' : '<a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV</a>',
		'ConfDisableTheater' : '',
		'ConfErrorPageReload' : '5',
		'ConfExport' : '',
		'ConfExternalPopup' : ' <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'FFixer',
		'ConfFacebookTimestamps' : 'Facebook: "3"',
		'ConfFBFTimestamps' : 'FacebookFFxier: "11:45"',
		'ConfFBFTimestamps24' : 'FFixer24',
		'ConfFriendRequestCountInTitle' : '',
		'ConfGoogleApps' : 'Google AppsGoogle',
		'ConfGoogleAppsDomain' : '',
		'ConfGoogleCalendar' : '<a href="http://ja.wikipedia.org/wiki/Google%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC" target="_blank">Google</a>',
		'ConfGoogleLanguage' : '<a href="http://ja.wikipedia.org/wiki/Google%E7%BF%BB%E8%A8%B3" target="_blank">Google</a>',
		'ConfHideApplicationStories' : '',
		'ConfHideEgos' : 'egoFacebook',
		'ConfHideEventStories' : '',
		'ConfHideFacebookCountInTitle' : 'Facebook',
		'ConfHideFriendStories' : '',
		'ConfHideGroupStories' : '',
		'ConfHideHovercards' : 'Hovercard',
		'ConfHideLikeStories' : '',
		'ConfHideLinkStories' : '',
		'ConfHideNoteStories' : '',
		'ConfHidePhotoStories' : '',
		'ConfHidePlaceStories' : '',
		'ConfHideProfilePicStories' : '',
		'ConfHideRead' : '',
		'ConfHideRelationshipStories' : '',
		'ConfHideStatusStories' : '',
		'ConfHideVideoStories' : '',
		'ConfHideWallStories' : '',
		'ConfHomeBeta' : 'Facebook Sneak Peek',
		'ConfHomeChat' : '',
		'ConfHomeChatNames' : '',
		'ConfHomeEvents' : '',
		'ConfHomeFindFriends' : 'Facebook',
		'ConfHomeLeftAlign' : '',
		'ConfHomeLeftColumn' : '',
		'ConfHomeLeftColumnFixed' : '',
		'ConfHomeLink' : '',
		'ConfHomeNavigation' : '',
		'ConfHomePokes' : '',
		'ConfHomeProfile' : '',
		'ConfHomeRecommendations' : '',
		'ConfHomeRequests' : '',
		'ConfHomeRightColumn' : '',
		'ConfHomeStretch' : '',
		'ConfHomeStretchMiddleColumn' : '',
		'ConfiCalendar' : '<a href="http://ja.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>',
		'ConfImport' : '',
		'ConfInboxCountInTitle' : '',
		'ConfLogoutLink' : '',
		'ConfNotificationCountInTitle' : '',
		'ConfNewTabSearch' : 'CTRL + Enter/',
		'ConfPageTitle' : 'Facebook |',
		'ConfPhotoPopup' : '',
		'ConfPopupAutoClose' : '',
		'ConfPopupSmartAutoClose' : '',
		'ConfPopupPosition' : '',
		'ConfPopupWhileTagging' : '',
		'ConfProcessInterval' : '1000: ',
		'ConfProfileLink' : '',
		'ConfProfilePicPopup' : '',
		'ConfProtocolLinks' : 'IDGoogleWindows Live',
		'ConfSectionAbout' : 'FFixer',
		'ConfSectionAdvanced' : '',
		'ConfSectionEvents' : '/',
		'ConfSectionImportExport' : '/',
		'ConfSectionFeeds' : '',
		'ConfSectionHomePage' : '',
		'ConfSectionLiveFeed' : '',
		'ConfSectionMenu' : '/',
		'ConfSectionOther' : '',
		'ConfSectionPageTitle' : '',
		'ConfSectionPictures' : '',
		'ConfSectionShortcuts' : '',
		'ConfSecureLinks' : 'FacebookHTTPS',
		'ConfShortcutList' : '<b> </b>:<br /><br /><i>:</i><br />&nbsp;<b>A</b> - /<br />&nbsp;<b>B</b> - <br />&nbsp;<b>C</b> - FFixer<br />&nbsp;<b>D</b> - <br />&nbsp;<b>E</b> - <br />&nbsp;<b>F</b> - <br />&nbsp;<b>H</b> - <br />&nbsp;<b>I</b> - <br />&nbsp;<b>K</b> - <br />&nbsp;<b>L</b> -  Enter<br />&nbsp;<b>N</b> - <br />&nbsp;<b>P</b> - <br />&nbsp;<b>R</b> - <br />&nbsp;<b>S</b> - <br />&nbsp;<b>T</b> - <br />&nbsp;<b>?</b> - FFixer<br />&nbsp;<b>&lt;escape&gt;</b> - FFixer<br /><br /><i></i>:<br />&nbsp;<b>a</b> - <br />&nbsp;<b>f</b> - <br />&nbsp;<b>g</b> - <br />&nbsp;<b>l</b> - <br />&nbsp;<b>n</b> - <br />&nbsp;<b>p</b> - <br />&nbsp;<b>s</b> / <b>u</b> - <br />&nbsp;<b>t</b> - <br />&nbsp;<b>v</b> - <br /><br /><i></i>:<br />&nbsp;<b>i</b> - <br />&nbsp;<b>p</b> - <br />&nbsp;<b>w</b> - <br />&nbsp;<b>x</b> - <br /><br /><i></i><br />&nbsp;<b></b> - <br />&nbsp;<b></b> - <br />&nbsp;<b>&lt;shift&gt; + </b> - <br />&nbsp;<b>&lt;shift&gt; + </b> - <br /><br /><i>/:</i><br />&nbsp;<b>a</b> - <br />&nbsp;<b>b</b> - <br />&nbsp;<b>c</b> - <br />&nbsp;<b>k</b> - <br />&nbsp;<b>m</b> - <br /><br /><i>/:</i><br />&nbsp;<b>a</b> / &nbsp;<b>r</b> - <br />&nbsp;<b>m</b> / &nbsp;<b>u</b> - <br />&nbsp;<b>o</b> - <br />&nbsp;<b>p</b> - <br />&nbsp;<b>t</b> / &nbsp;<b>f</b> - ',
		'ConfShortcuts' : '',
		'ConfSign' : '',
		'ConfTopBarFixed' : '',
		'ConfTopBarHoverOpacity' : '',
		'ConfTopBarOpacity' : '',
		'ConfUpdates' : 'FFixer Userscripts.org <a href="#" id="fbfUpdateLink" onclick="return false;"></a>',
		'DownloadVideo' : '',
		'ExportICalendarFile' : 'iCalendar',
		'ExportICalendarFileWarning' : '',
		'FacebookFixerConflict' : 'Facebook FixerFFixer<br /><br />Facebook Fixer2<br /><br />userscript<a %s>: </a>',
		'fullAlbumLoaded' : '',
		'Import' : '',
		'ImportConfirm' : '\n',
		'ImportFailure' : '',
		'ImportSuccess' : '',
		'Left' : '',
		'LoadingAllPhotos' : '...',
		'loadingFullAlbum' : '...',
		'LoadingPic' : '...',
		'LoadPhotosWarning' : '',
		'Months' : new Array('1','2','3','4','5','6','7','8','9','10','11','12'),
		'ProtocolSkype' : '%sSkype',
		'ProtocolMSN' : '%sWindows Live',
		'ProtocolYahoo' : '%sYahoo!',
		'ProtocolGoogle' : '%sGoogle',
		'ReloadErrorPage' : '5',
		'Refresh' : '',
		'Remove' : '',
		'Right' : '',
		'ShowBigPictures' : '',
		'Signs' : new Array('','','','','','','','','','','',''),
		'today' : '',
		'Translators' : '',
		'UpdateAvailable1' : 'FFixer',
		'UpdateAvailable2' : '',
		'UpdateHomepage' : '',
		'UpdateInstall' : '',
		'UpdateTomorrow' : '',
		'yearsOld' : '%s'
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
	'FacebookFixerLanguage': getValue('FacebookFixerLanguage', 'auto'),
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
if (prefs['FacebookFixerLanguage'] == 'auto' && buffer) {
	language = buffer[1].toLowerCase();
	detectedLanguage = language;
	if (!lang[language]) {
		language = language.split('_')[0];
		if (!lang[language]) { language = 'en'; }
	}
} else {
	language = prefs['FacebookFixerLanguage'];
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
	'.ffixer-highlighted-story, .ffixer-highlighted-story * { font-weight:bold !important; }'
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
	var months = new Array (/^(.*\s)?(jan(uar[iy]?)?|enero|janvier|gennaio|janeiro||||janura|leden)(\s.*)?$/,
							/^(.*\s)?(feb(ruar[iy]?)?|febrero|fvrier|febbraio|fevereiro||||februra|nor)(\s.*)?$/,
							/^(.*\s)?(mar(ch)?|marzo|mars|mrz|maart|maro|||marca|bezen)(\s.*)?$/,
							/^(.*\s)?(apr(ile?)?|abril|avril|||aprla|duben)(\s.*)?$/,
							/^(.*\s)?(ma(yo?|i|j)|mei|maggio|maio||||mja|kvten)(\s.*)?$/,
							/^(.*\s)?(june?|junio?|juin|giugno|junho||||jna|erven)(\s.*)?$/,
							/^(.*\s)?(jul[iy]?|julio|juillet|luglio|julho||||jla|ervenec)(\s.*)?$/,
							/^(.*\s)?(aug(ust(i|us)?)?|agosto|aot|||augusta|srpen)(\s.*)?$/,
							/^(.*\s)?(sep(tember)?|septiembre|se[pt]tembre|setembro||||septembra|z)(\s.*)?$/,
							/^(.*\s)?(o[ck]t(ober)?|oct[ou]bre|ottobre|outubro||||oktbra|jen)(\s.*)?$/,
							/^(.*\s)?(nov(ember)?|noviembre|novembre|novembro||||novembra|listopad)(\s.*)?$/,
							/^(.*\s)?(de[cz](ember)?|dici?embre|dcembre|dezembro||||decembra|prosinec)(\s.*)?$/);
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
// Detect Facebook Fixer
//
if (id!=0) {
	setTimeout(function() {
		if ($('#FBPPdiv') && (true || parseInt(getValue("LastConflictCheck", "0")) + 86400000 <= (new Date().getTime()))) {
			setValue('LastConflictCheck', new Date().getTime() + "");
			showDialog('<div class="fbfImportant">FFixer</div><br />' + $l('FacebookFixerConflict', 'href="http://www.code-poet.net/userscripts/ffixer/upgrading-from-facebook-fixer.html" target="_blank"'), '', 'small');
		}
	}, 2000);
}


//
// Debug Info
//
function showDebugInfo() {
	try {
		showDialog(
			'FFixer Debug Info:<br /><br />'+
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
registerMenuCommand($l('ConfigureFacebookFixer'), showConfig);
if (menu = $('//li[@id="navAccount"]/ul',null,true)) {
	var configLink = document.createElement('li');
	configLink.innerHTML = '<a id="fbfConfigMenuLink" href="#" onclick="return false;">' + $l('ConfigureFacebookFixer') + '</a>';
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
		'<div style="text-align:center;"><span class="fbfImportant">' + $l('ConfigureFacebookFixer') + '</span><br /><span class="fbfNote">(FFixer ' + version + ' - ' + release_date + ' - ' + id + ')</span></div><br />'+
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
					'<tr><td><span class="fbfLabel">' + $l('ConfFacebookFixerLanguage') + ':</span></td><td><select id="fbfConfFacebookFixerLanguage" style="padding:0; margin-top:3px;"><option value="auto">' + $l('Automatic') + '</option><option value="cs">etina (Czech)</option><option value="sr_rs"> (Serbian - Cyrillic)</option><option value="da">Dansk (Danish)</option><option value="el"> (Greek)</option><option value="en">English</option><option value="es">Espaol (Spanish)</option><option value="fr">Franais (French)</option><option value="de">Deutsch (German)</option><option value="it">Italiano (Italian)</option><option value="id">Bahasa Indonesia (Indonesian)</option><option value="mk">  (Macedonian)</option><option value="nl">Nederlands (Dutch)</option><option value="nb">Norsk (Norwegian)</option><option value="sk">Slovenina (Slovak)</option><option value="sr">Srpski (Serbian - Latin)</option><option value="vi">Ting Vit (Vietnamese)</option><option value="tr">Trke (Turkish)</option><option value="bg"> (Bulgarian)</option><option value="zh_tw">() (Chinese - Taiwan)</option><option value="ko"> (Korean)</option><option value="ja"> (Japanese)</option></select></td></tr>'+
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
					'<br /><br />Custom Feed Modification (<a href="http://www.code-poet.net/userscripts/ffixer/ffixer-guide.html#custom-feed-modification" target="_blank">instructions</a>):<br /><textarea id="fbfConfCustomFeedModification" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom Feed Modification" id="SaveCustomFeedModification" />'+
					'<br /><br />Custom CSS (<a href="http://www.code-poet.net/userscripts/ffixer/ffixer-guide.html#custom-css" target="_blank">instructions</a>):<br /><textarea id="fbfConfCustomCSS" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom CSS" id="SaveCustomCSS" />'+
				'</div>'+
				'<div id="fbfConfigControl-10">'+
					'<span xmlns:dc="http://purl.org/dc/elements/1.1/" property="dc:title"><a href="http://www.code-poet.net/userscripts/facebook-fixer/index.html" target="_blank">FFixer</a></span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Vaughan Chandler</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike 3.0 Unported License</a>.<br /><br />Facebook is a registered trademark of Facebook, Inc.<br />FFixer is not related to or endorsed by Facebook, Inc. in any way.<br /><br /><a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0;" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><br /><b>' + $l('Translators') + ':</b><ul><li>Acedia.Liu - Chinese (Taiwan)</li><li>Caken - Czech</li><li>Connum - German</li><li>dnbace - Bulgarian</li><li>DoSMaN - Greek</li><li>Eilif Nordseth - Norwegian</li><li>Glen Farmer - Spanish</li><li>Goce Manevski - Macedonian</li><li>Gkhan Gurbetolu - Turkish</li><li>Gorgeous - Italian</li><li>Gortak - Serbian (Cyrillic and Latin)</li><li>HeartRipper - Italian</li><li>Larissa van Sunder - Dutch</li><li>Mads Jensen - Danish</li><li>Masami HIRATA - Japanese</li><li>Neo - Spanish</li><li>Peter Miksik - Slovak</li><li><li>Serge Thiry - French</li><li>Sindhu Pripamungkas - Indonesian</li><li>Trn c Thnh - Vietnamese</li><li> - Korean</li></ul>'+
				'</div>'+
			'</td></tr>'+
		'</table>'+
		'<br /><hr /><div style="float:left; padding-top:8px;"><a href="http://www.code-poet.net/userscripts/facebook-fixer/index.html">' + $l('UpdateHomepage') + '</a></div><div style="text-align:right;"><input type="button" value="' + $l('Refresh') + '" onclick="location.reload();" /> <input type="button" id="fbfCloseConfig" value="' + $l('Close') + '" /></div>'+
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
		$('#fbfConfFacebookFixerLanguage').value = prefs['FacebookFixerLanguage'];
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
		
		var selects = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity','FacebookFixerLanguage','GoogleLanguage');
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
	else if (updateForced) { alert("No update is available for FFixer."); }
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
						$('#ff-popup-pic-image').innerHTML = '<a href="' + profileLink + '"><img src="' + newSrc + '" alt="FFixer - ' + $l('LoadingPic') + '" style="max-height:' + (window.innerHeight-35) + 'px;"/></a>';
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
			container[0].appendChild(document.createTextNode('  '));
			container[0].appendChild(a);
		}
		
		// photo tabs on new profiles
		else if ((container = $('.uiHeaderTitle', '#pagelet_photos_of_me')) && container[0]) {
			container[0].appendChild(document.createTextNode('  '));
			container[0].appendChild(a);
		}
		
		// photo tabs on old profiles
		else if (container = $('//*[@id="photos_of_wrapper"]/preceding-sibling::* //div', null, true)) {
			container.appendChild(document.createTextNode('  '));
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
							var elms = $(".//*[contains(@class,'uiUnifiedStory') and not(contains(@class,'ffixer-highlighted-story')) and (" + highlightedStoryXPath.join(' or ') + ")]", stream);
							for (var i=0; i<elms.snapshotLength; i++) { elms.snapshotItem(i).className=elms.snapshotItem(i).className + ' ffixer-highlighted-story'; }
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
								var ical = 'BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0APRODID:FFixer%0D%0A';
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
