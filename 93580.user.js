// ==UserScript==
// @name        FFixer
// @namespace   http://code-poet.net/
// @description Enhancements for Facebook: bigger profile pictures and photos, easier viewing of albums, links to download videos, showing people's age and sign, google calendar integration, keyboard shortcuts & more. Compatible with new Facebook and fully customizable!
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @author      Vaughan Chandler
// @timestamp   1287946460036
// @version     2.3.0
// ==/UserScript==

// Last edited 2010-10-24

/*

This copyright section and all credits in the script must be included in modifications or redistributions of this script.

FFixer is Copyright (c) 2010, Vaughan Chandler
FFixer is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License
License information is available here: http://creativecommons.org/licenses/by-sa/3.0/

Facebook is a registered trademark of Facebook, Inc.
FFixer is not related to or endorsed by Facebook, Inc. in any way.

*/

/*

TODO
* Add options for hiding/replacing parts of stories based on arbitrary text. For example:
* 	Facicons - http://userscripts.org/topics/59983
* 	Social Plus - http://www.social-plus.com/en
* Look into iso formatted dates appearing where they shouldn't
* Do some optimization, including conditional advanced loading of functions
* Cleanup code for big album pictures
* Add option to stretch top menu - http://userscripts.org/topics/34001?page=4#posts-292732
* Some more story types need hiding - http://userscripts.org/topics/59530
* See if exporting birthdays in iCal format is still possible
* Add code to make the invite friends box bigger - I may need to change the pixel values first, possibly to percentages
* 	Yurik
* 	http://userscripts.org/topics/54809
* 	javascript:(function(){var%20o=document.getElementById('friends');var%20d=o.getElementsByClassName('disabled');if(d.length>0)for(var%20i%20in%20d)o.removeChild(d[i]);document.getElementsByClassName('generic_dialog_popup')[0].style.width='922px';document.getElementById('fb_multi_friend_selector').style.width='900px';document.getElementById('friends').style.height='410px';})()
* Check out MysticMetal's code for adding titles to images - http://userscripts.org/topics/55387?page=1

Done in 2.2.2:
* Added an option to show names in the chat section of the home page's left column.
* Added an option on the advanced tab to hide all "ego" sections. This should hide pretty much all recommendations from Facebook with a single click, including: the 'requests and 'featured' sections of the home page; photo memories; people you may know. This overrides any other settings you have for hiding stuff.
* Added an option to hide "hovercards" (the popup that appears when you keep the mouse over somebody's name for a second or two).
* Added ability to "show big pictures" on "photo_search" pages and on Facebook's new "media/set" pages.
* Added ability to apply custom CSS (advanced tab of the config screen).
* Added ability to apply custom feed modifications (advanced tab of the config screen).
* Improved ability to block "group" stories.
* Improved ability to block "places" stories.
* Improved ability to block "application" stories.
* Popup pictures no longer appear for images that are being tagged (but there is an option to re-enable this if you want it).
* Fixed ability to hide the chat section of the home page's left-hand column after a Facebook change broke it (thanks to Dink).
* Fixed ability to hide the poke section of the home page's right-hand column after a Facebook change broke it.
* Fixed ability to keep the top menu fixed after a Facebook change broke it.
* Fixed ability to hide the chat, requests and get connections sections on the home page after a Facebook change broke it (thanks to temperror).
* Fixed keyboard shortcut for logging out after a Facebook change broke it - L followed by Enter (shift+l followed by Enter).
* Fixed a bug where a problem making the top menu fixed could prevent other features from working (such as popup pictures).
* Fixed a bug where FFixer's bookmarks would appear underneath other items on the page.
* Fixed a bug where the "show big pictures" link would sometimes not appear in the correct place.
* Fixed a bug where the "show big pictures" link would sometimes not appear in Opera.
* Fixed a bug where hiding certain types of stories in the news feed might also result in other types being hidden also (thanks to domen@cba.si).
* Fixed a bug which cause popup pictures to sometimes appear unexpectedly when editing albums.
* Fixed a bug which prevented proper parsing of dates in certain circumstances (which also caused astrological signs to sometimes be wrong).
* Fixed the AJAX method for using Google translate (Greasemonkey browsers only).
* Removed ability to add a link showing all comments on an album as Facebook has removed the page the link would point to.
* Added Vietnamese localization, thanks to Trần Đức Thịnh.
* Updated Norwegian localization, thanks to Eilif Nordseth.
* Updated Greek localization, thanks to Dimitris DoSMaN Sarlis.
* Added Macedonian and Korean to the drop down menu for FFixer languages (I had forgotten to add them before).
* Added the following languages to the drop down for Google Translate languages: Afrikaans, Armenian, Azerbaijani, Basque, Belarusian, Georgian, Hatian Creole, Icelandic, Gaelic, Latin, Macedonian, Malay, Persian, Swahili, Urdu, Welsh, Yiddish

Done in 2.2.1
* Added option to add a border about images when using the big album pictures feature - this lets you tell when some images still haven't loaded.
* Added option to hide 'Places' stories in the news feed on the home page.
* Fixed ability to block stories in the home page feed, after a Facebook change broke it.
* Fixed bug preventing 'Places' stories from being hidden if it was the only story type set to be hidden.
* Fixed 'popup pictures' and 'show big pictures' features when using HTTPS.
* Added Korean localization - thanks to 박상빈
* Updated localizations:
* 	Czech - thanks to Caken
* 	Greek - thanks to Dimitris DoSMaN Sarlis
* 	Serbian - thanks to Gorštak
* 	Turkish - thanks to Gökhan Gurbetoğlu

TODO:
Add option to autoclick on 'older posts' on homepage, profiles, etc
Add option to immediately go to the popup search result if there is only one
Increase options for filtering out photos, tags etc
Where possible, let css changes to the home page be fluid so resizing the browser doesn't screw things up
	Also, just double check all the code related to stretching, left aligning etc
Fix "search reults in new tab" option with CTRL (is the still possible?)
Fix popup pics - alt text can't handle quotes
Add ability to manage the lists a friend is in from their profile
Add ability to download hi-def videos
Add option to see seconds in fbf timestamps
Add option to disable news feed / force live feed
Implement cross-browser XHR
Add option to show the thumbnail's alt/title text underneath the popup image
Add option to change bottom menu opacity on events: mouseover, chat seesion, new message etc
Add option to move all right column stuff on the homepage to the left column
Add option to show current status in "whats on your mind" on the home page
Add option to show the number of chats with unread messages to the title bar
Modify homepage to make a "superhomepage" by moving the left and right column to a top row, with both the news feed and live feed below
	http://dl.getdropbox.com/u/927778/facebook%20superhomepage.png
Show smilies in the chat box

*/


(function() {

if (self != window.top) { return; } // Don't run in frames

var version = '2.3.0';
var version_timestamp = 1287946460036; // javascript:window.alert(new Date().getTime());
var release_date = 20101024;

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
		'ConfHomeStretchComments' : 'Stretch the comments on the home page.',
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
		'ConfigureFacebookFixer' : 'Configuración de FFixer',
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
		'ConfFacebookFixerLanguage' : 'Lenguaje del FFixer',
		'ConfFacebookTimestamps' : 'Mostrar cuanto hace que fue creado (Ejemplo: "Hace 3 horas").',
		'ConfFBFTimestamps24' : 'Mostrar las marcas de tiempo de FFixer en formato 24 horas.',
		'ConfFBFTimestamps' : 'Añadir las marcas de tiempo de FFixer después de las marcas de tiempo de Facebook (Por ejemplo "11:45").',
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
		'ConfSectionAbout' : 'Acerca de FFixer',
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
		'ConfShortcutList' : '<b>Atajos de Teclado</b> (sensible a la diferencia entre minúsculas y mayúsculas):<br /><br /><i>Desde cualquier página:</i><br />&nbsp;<b>A</b> - Álbumes/Fotos<br />&nbsp;<b>B</b> - Activar/Desactivar lista de amigos (Amigos conectados)<br />&nbsp;<b>C</b> - Configuración de FFixer<br />&nbsp;<b>D</b> - Cumpleaños<br />&nbsp;<b>E</b> - Eventos<br />&nbsp;<b>F</b> - Amigos<br />&nbsp;<b>H</b> - Página de Inicio<br />&nbsp;<b>I</b> - Bandeja de Entrada<br />&nbsp;<b>K</b> - Añadir Marcador<br />&nbsp;<b>L</b> - Seleccionar vínculo para terminar la sesión (presione Enter después para terminar la sesión)<br />&nbsp;<b>N</b> - Notificaciones<br />&nbsp;<b>P</b> - Perfil<br />&nbsp;<b>R</b> - Peticiones<br />&nbsp;<b>S</b> - Saltar a el campo de búsqueda<br />&nbsp;<b>T</b> - Traducir el texto seleccionado<br />&nbsp;<b>?</b> - Mostrar la información de depuración de FFixer<br />&nbsp;<b><escape></b> - Cerrar la ventana emergente creada por FFixer<br /><br /><i>Desde la página de inicio (filtros)</i>:<br />&nbsp;<b>a</b> - Páginas<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Grupos<br />&nbsp;<b>l</b> - Vínculos<br />&nbsp;<b>n</b> - Noticias<br />&nbsp;<b>p</b> - fotos<br />&nbsp;<b>s</b> or <b>u</b> - Estatus de las Actualizaciones<br />&nbsp;<b>t</b> - Notas<br />&nbsp;<b>v</b> - Vídeos<br /><br /><i>Desde los perfiles</i>:<br />&nbsp;<b>i</b> - Información<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Muro<br />&nbsp;<b>x</b> - Cajas<br /><br /><i>Desde las páginas con paginación (previo, siguiente, etc)</i><br />&nbsp;<b><left arrow></b> - Previo<br />&nbsp;<b><right arrow></b> - Siguiente<br />&nbsp;<b><shift> + <left arrow></b> - Primera (cuando este disponible)<br />&nbsp;<b><shift> + <right arrow></b> - Ultimo (cuando este disponible)<br /><br /><i>Al ver albumes/fotos:</i><br />&nbsp;<b>a</b> - Ver todas la miniaturas (cuando este disponible)<br />&nbsp;<b>b</b> - Ver fotos grandes<br />&nbsp;<b>c</b> - Ver comentarios<br />&nbsp;<b>k</b> - De vuelta al álbum<br />&nbsp;<b>m</b> - Fotos de (personas) y yo<br /><br /><i>Al ver albumes recientes y fotos subidas/marcadas:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Albumes Recientes<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Fotos de Móviles<br />&nbsp;<b>o</b> - Fotos de mi<br />&nbsp;<b>p</b> - Mis Fotos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Amigos Marcados', 'ConfTopBarHoverOpacity' : 'Al pasar el ratón por encima', 'FacebookFixerConflict' : 'Facebook Fixer ahora se llama FFixer.<br /><br />Por el cambio de nombre es necesario desinstalar Facebook Fixer manualmente de su navegador o los dos programas entraran en conflicto.<br /><br />Si no sabe como desinstalar un userscript, <a %s>haga clic aquí para ver instrucciones</a>.',
		'ConfShortcuts' : 'Abilitar los atajos de teclado.',
		'ConfSign' : 'Mostrar los signos zodiacales de las personas en sus perfiles (Si indican fecha de nacimiento).',
		'ConfTopBarFixed' : 'Mantener la barra superior de menu en la pantalla siempre.',
		'ConfTopBarHoverOpacity' : 'Al pasar el ratón por encima',
		'ConfTopBarOpacity' : 'Transparencia de la barra de menu superior',
		'ConfUpdates' : 'Revisar Userscripts.org diarimente por si hay actualizaciones en FFixer. O <a href="#" id="fbfUpdateLink" onclick="return false;">revisar Ahora</a>.',
		'CreatingFile' : 'Creando Archivo',
		'DownloadVideo' : 'Descargar el Video',
		'ExportICalendarFile' : 'Exportar el archivo de iCalendar',
		'ExportICalendarFileWarning' : '(Esto puede tardar bastante dependiendo de la cantidad de amigos)',
		'FacebookFixerConflict' : 'Facebook Fixer ahora se llama FFixer.<br /><br />Por el cambio de nombre es necesario desinstalar Facebook Fixer manualmente de su navegador o los dos programas entraran en conflicto.<br /><br />Si no sabe como desinstalar un userscript, <a %s>haga clic aquí para ver instrucciones</a>.',
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
		'UpdateAvailable1' : 'Hay una actualización disponible para FFixer',
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
		'ConfProcessInterval' : 'Intervalle à laquelle la page sera trait&eacute;e, en millisecondes (par d&eacute;faut=1000):',
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
		'UpdateAvailable1' : 'Une mise &agrave; jour de FFixer est disponible',
		'UpdateAvailable2' : 'Voulez-vous effectuer la mise &agrave; jour ?',
		'UpdateHomepage' : 'Aller &agrave; la page principale',
		'UpdateInstall' : 'Installer maintenant',
		'UpdateTomorrow' : 'Me le rappeler demain',
		'yearsOld' : '%s ans'
	},

	// Italian - Contributed by Dario Archetti (20100328)
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
		'BookmarkConfirmRemoval' : 'Sei sicuro di voler rimuovere il segnalibro?',
		'BookmarkDoesNotExist' : 'Questa pagina non è tra i segnalibri.\n\nVai alla pagina che vuoi rimuovere e riprova.',
		'BookmarkExists' : 'Questa pagina è già tra i segnalibri.\n\nVai alla pagina che vuoi aggiungere e riprova.',
		'BookmarkNamePrompt' : 'Inserisci un nome per questo segnalibro:\n%s',
		'BookmarkRemove' : 'Rimuovi questo segnalibro',
		'Bookmarks' : 'Segnalibri',
		'BrowserUnsupported' : 'Il tuo browser mom supporta questa funzionalita\'.',
		'CreatingFile' : 'Sto creando il file',
		'Close' : 'Chiudi',
		'ConfigureFacebookFixer' : 'Impostazioni di FFixer',
		'ConfigureInstructions' : 'I cambiamenti vengono salvati immediatamente, ma alcuni possono non avere effetto nelle schede già aperte.',
		'ConfAge' : 'Mostra l\'età nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfAutoBigAlbumPictures' : 'Negli album mostra automaticamente immagini più grandi quando la pagina si apre.',
		'ConfAutoLoadFullAlbum' : 'Carica automaticamente le anteprime di tutte le immagini in un album o in una pagina.',
		'ConfAutoLoadTaggedPhotos' : 'Carica automaticamente le anteprime di tutte le foto taggate in una pagina (nella sezione "Foto" dei profili).',
		'ConfAutoReadMore' : 'Clicca automaticamente sui link "Mostra tutto".',
		'ConfBigAlbumPictures' : 'Aggiungi un link negli album per mostrare una versione più grande di ogni foto nella pagina.',
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
		'ConfHideEventStories' : 'Nascondi i post degli eventi.',
		'ConfHideFanStories' : 'Nascondi le notizie "è diventato fan di..".',
		'ConfHideFriendStories' : 'Nascondi le notizie "ha stretto amicizia con...".',
		'ConfHideGroupStories' : 'Nascondi le notizie "si è iscritto al gruppo...".',
		'ConfHideLinkStories' : 'Nascondi i post riguardanti link.',
		'ConfHidePhotoStories' : 'Nascondi i post riguardanti foto.',
		'ConfHideProfilePicStories' : 'Nascondi i post riguardanti foto del profilo .',
		'ConfHideRead' : 'Nascondi gli elementi del live feed che sono stati segnati come già letti.',
		'ConfHideRelationshipStories' : 'Nascondi le notizie riguardanti relazioni.',
		'ConfHideStatusStories' : 'Nascondi gli aggiornamenti di stato.',
		'ConfHideVideoStories' : 'Nascondi i post di video.',
		'ConfHideWallStories' : 'Nascondi le attività delle bacheche.',
		'ConfHomeChat' : 'Mostra gli amici online.',
		'ConfHomeEvents' : 'Mostra la sezione "Eventi".',
		'ConfHomeFindFriends' : 'Mostra la sezione "Connettiti con i tuoi amici".',
		'ConfHomeLeftAlign' : 'Allinea a sinistra il contenuto della homepage.',
		'ConfHomeLeftColumn' : 'Mostra la colonna di sinistra.',
		'ConfHomeLeftColumnFixed' : 'Mantieni visibile la colonna di sinistra anche dopo lo scroll.',
		'ConfHomeLink' : 'Mostra il link "Home" nella barra superiore.',
		'ConfHomePeopleYouMayKnow' : 'Mostra la sezione "Suggerimenti".',
		'ConfHomeNavigation' : 'Mostra i filtri.',
		'ConfHomePokes' : 'Mostra la sezione "Poke".',
		'ConfHomeProfile' : 'Mostra la propria immagine del profilo.',
		'ConfHomeRequests' : 'Mostra la sezione "Richieste".',
		'ConfHomeRightColumn' : 'Mostra la colonna di destra.',
		'ConfHomeStretch' : 'Allarga la homepage affinché si adatti alla larghezza della finestra del browser.',
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
		'ConfProcessInterval' : 'Intervallo dopo il qualeprocessare la pagina, in millisecondi (default=1000):',
		'ConfProfileLink' : 'Mostra il link "Profilo" nella barra superiore.',
		'ConfProfilePicPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle immagini dei profili.',
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
		'ConfShortcutList' : '<b>Scorciatoie da tasiera</b> (prestare attenzione a maiuscole/minuscole):<br /><br /><i>In ogni pagina</i><br />&nbsp;<b>A</b> - Album/foto<br />&nbsp;<b>B</b> - Apri la lista degli amici online<br />&nbsp;<b>C</b> - Impostazioni di FFixer<br />&nbsp;<b>D</b> - Compleanni<br />&nbsp;<b>E</b> - Eventi<br />&nbsp;<b>F</b> - Amici<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Posta in arrivo<br />&nbsp;<b>K</b> - Aggiungi segnalibro<br />&nbsp;<b>L</b> - Seleziona il link per effettuare il logout (poi premi Invio per effettuare il logout)<br />&nbsp;<b>N</b> - Notifiche<br />&nbsp;<b>P</b> - Il tuo profilo<br />&nbsp;<b>R</b> - Richieste<br />&nbsp;<b>S</b> - Seleziona il campo di ricerca<br />&nbsp;<b>T</b> - Traduci il testo selezionato<br />&nbsp;<b>?</b> - Mostra le informazioni di debug di FFixer<br />&nbsp;<b>&lt;escape&gt;</b> - Chiudi i pop-up creati da FFixer<br /><br /><i>Dalla home page (filtri)</i>:<br />&nbsp;<b>a</b> - Pagine<br />&nbsp;<b>f</b> - Notizie in tempo reale<br />&nbsp;<b>g</b> - Gruppi<br />&nbsp;<b>l</b> - Link<br />&nbsp;<b>n</b> - Notizie<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>s</b> o <b>u</b> - Aggiornamenti di stato<br />&nbsp;<b>t</b> - Note<br />&nbsp;<b>v</b> - Video<br /><br /><i>Dai profili</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>w</b> - Bacheca<br />&nbsp;<b>x</b> - Riquadri<br /><br /><i>Dalle pagine con paginazione (precedente, successivo, etc)</i><br />&nbsp;<b>&lt;freccia sinistra&gt;</b> - Precedente<br />&nbsp;<b>&lt;freccia destra&gt;</b> - Successivo<br />&nbsp;<b>&lt;shift&gt; + &lt;freccia sinistra&gt;</b> - Primo (Quando disponibile)<br />&nbsp;<b>&lt;shift&gt; + &lt;freccia destra&gt;</b> - Ultimo (Quando disponibile)<br /><br /><i>Mentre si guardano album/foto:</i><br />&nbsp;<b>a</b> - Carica tutte le anteprime (quando disponibile)<br />&nbsp;<b>b</b> - Mostra immagini grandi<br />&nbsp;<b>c</b> - Mostra i commenti<br />&nbsp;<b>k</b> - Torna all\' album<br />&nbsp;<b>m</b> - Foto con me<br /><br /><i>Mentre si guardano album recenti e foto appena caricate/taggate:</i><br />&nbsp;<b>a</b> o &nbsp;<b>r</b> - Album recenti<br />&nbsp;<b>m</b> o &nbsp;<b>u</b> - Upload via mobile<br />&nbsp;<b>o</b> - Foto con me<br />&nbsp;<b>p</b> - Le mie foto<br />&nbsp;<b>t</b> o &nbsp;<b>f</b> - Amici taggati',
		'ConfShortcuts' : 'Attiva le scorciatoie da tastiera.',
		'ConfSign' : 'Mostra il segno zodiacale nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfTopBarFixed' : 'Mantieni fissa la posizione della barra superiore.',
		'ConfTopBarHoverOpacity' : 'Al passaggio del mouse',
		'ConfTopBarOpacity' : 'Trasparenza della barra superiore',
		'ConfUpdates' : 'Controlla ogni giorno Userscripts.org per eventuali update, oppure <a href="#" id="fbfUpdateLink" onclick="return false;">controlla adesso!</a>.',
		'DownloadVideo' : 'Scarica il video.',
		'ExportICalendarFile' : 'Esporta file di iCalendar.',
		'ExportICalendarFileWarning' : '(Questo impiegherà un po\' se hai molti amici!)',
		'FacebookFixerConflict' : 'FFixer ha cambiato nome in FFixer. A causa del cambiamento dovrai disinstallare manualmente FFixer dal tuo browser, o i due script andranno in conflitto. Se non sei sicuro di come disinstallare un userscript <a %s>clicca qui per le istruzioni</a>.',
		'fullAlbumLoaded' : 'l\'album completo è stato caricato.',
		'Import' : 'Importa',
		'ImportConfirm' : 'Sei sicuro di voler importare queste impostazioni?\nLe tue impostazioni attuali saranno sovrascritte.',
		'ImportFailure' : 'Un errore è accaduto durante l\'importazione delle impostazioni.',
		'ImportSuccess' : 'Importazione completata. Vuoi ricaricare la pagina?',
		'Left' : 'Sinistra',
		'ListeningRestarted' : 'Registrazione dei cambiamenti da parte di FFixer attivata.',
		'ListeningStopped' : 'Registrazione dei cambiamenti da parte di FFixer disattivata.\nPremi L (SHIFT + l) per riabilitare la registrazione.',
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
		'Refresh' : 'Ricarica',
		'Remove' : 'Rimuovi',
		'ShowBigPictures' : 'Mostra immagini a grandi dimensioni.',
		'Signs' : new Array('Capricorno','Aquario','Pesci','Ariete','Toro','Gemelli','Cancro','Leone','Vergine','Bilancia','Scorpione','Sagittario'),
		'today' : 'oggi',
		'Translators' : 'Traduttori',
		'UpdateAvailable1' : 'È disponibile un update per FFixer.',
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
		'ConfigureFacebookFixer' : 'FFixer konfigurieren',
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
		'ConfFacebookFixerLanguage' : 'Sprache für FFixer',
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
		'ConfShortcutList' : '<b>Tastenkürzel</b> (Groß-/Kleinschreibung beachten!):<br /><br /><i>Auf jeder Seite:</i><br />&nbsp;<b>A</b> - Alben/Fotos<br />&nbsp;<b>B</b> - Chatliste ein-/ausblenden<br />&nbsp;<b>C</b> - FFixer Einstellungen<br />&nbsp;<b>F</b> - Freunde<br />&nbsp;<b>H</b> - Startseite<br />&nbsp;<b>I</b> - Postfach<br />&nbsp;<b>L</b> - Reagieren von FFixer auf Seitenänderung ein-/ausschalten<br />&nbsp;<b>N</b> - Benachrichtigungen<br />&nbsp;<b>P</b> - Mein Profil<br />&nbsp;<b>T</b> - Markierten Text übersetzen<br />&nbsp;<b>&lt;escape&gt;</b> - Von FFixer erstellte Popups schließen<br /><br /><i>Auf der Startseite</i>:<br />&nbsp;<b>f</b> oder <b>l</b> - Live-Feed<br />&nbsp;<b>i</b> - Posted items<br />&nbsp;<b>n</b> - News-Feed<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>s</b> oder <b>u</b> - Status-Updates<br /><br /><i>Auf Profilseiten</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Pinnwand<br />&nbsp;<b>x</b> - Felder<br /><br /><i>Auf Seiten mit Seitenzahlen (zurück, vor, etc)</i><br />&nbsp;<b>&lt;Pfeil-nach-Links&gt;</b> - Zurück<br />&nbsp;<b>&lt;Pfeil-nach-Rechts&gt;</b> - Vor<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Links&gt;</b> - Erste (wenn verfügbar)<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Rechts&gt;</b> - Letzte (wenn verfügbar)<br /><br /><i>Bei der Anzeige von Alben & Fotos:</i><br />&nbsp;<b>a</b> - Alle Vorschaubilder laden (wenn verfügbar)<br />&nbsp;<b>b</b> - Große Bilder anzeigen<br />&nbsp;<b>c</b> - Kommentare anzeigen<br />&nbsp;<b>k</b> - Zurück zum Album<br />&nbsp;<b>m</b> - Fotos der Person und mir<br /><br /><i>Bei neuen Alben und getaggten/hochgeladenen Fotos:</i><br />&nbsp;<b>a</b> oder &nbsp;<b>r</b> - Neue Alben<br />&nbsp;<b>m</b> oder &nbsp;<b>u</b> - Mobile Uploads<br />&nbsp;<b>o</b> - Fotos von mir<br />&nbsp;<b>p</b> - Meine Fotos<br />&nbsp;<b>t</b> oder &nbsp;<b>f</b> - Getaggte Freunde',
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
		'ConfUpdates' : 'UÜberprüfen Sie Userscripts.org täglich auf Updates für FFixer. <a href="#" id="fbfUpdateLink" onclick="return false;">Jetzt überprüfen</a>.',
		'DownloadVideo' : 'Video herunterladen',
		'ExportICalendarFile' : 'iCalendar-Export',
		'ExportICalendarFileWarning' : '(kann bei einer großen Zahl an Freunden eine Weile dauern)',
		'fullAlbumLoaded' : 'Album vollständig geladen',
		'Left' : 'Links',
		'ListeningRestarted' : 'FFixer reagiert wieder auf Änderungen.',
		'ListeningStopped' : 'FFixer reagiert nicht auf Änderungen.\nL (SHIFT + l) drücken, um die Reaktion wieder zu aktvieren.',
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
		'UpdateAvailable1' : 'Es gibt ein Update für FFixer',
		'UpdateAvailable2' : 'Update jetzt herunterladen?',
		'UpdateHomepage' : 'Zur Webseite',
		'UpdateInstall' : 'Jetzt installieren',
		'UpdateTomorrow' : 'Morgen erinnern',
		'yearsOld' : '%s Jahre alt'
	},

	// Bulgarian - Contributed by Svetlozar Mladenoff (20090830)
	bg : {
		'_language' : 'Bulgarian',
		'AddToCalendar' : 'Добавяне към Календар',
		'AddToGoogleCalendar' : 'Добавяне към Google Calendar',
		'all' : 'всички',
		'All' : 'Всички',
		'AllPhotosLoaded' : 'Всички снимки са заредени',
		'Automatic' : 'Автоматично',
		'Birthday' : 'Рождения ден на %s',
		'CreatingFile' : 'Създаване на файл',
		'Close' : 'Затваряне',
		'ConfigureFacebookFixer' : 'Конфигуриране на FFixer',
		'ConfigureInstructions' : 'Всички промени се запаметяват веднага, но някои може да не придобият ефект при вече отворени табове.',
		'ConfAge' : 'Показване на възрастта (ако потребителите са представили пълна рождена дата).',
		'ConfAutoBigAlbumPictures' : 'Автоматично показване на по-големи снимки от албумите, когато страницата се зареди.',
		'ConfAutoLoadFullAlbum' : 'Автоматично зареждане на превюта за всички картини в албум, събиращи се на една страница.',
		'ConfAutoLoadTaggedPhotos' : 'Автоматично зареждане на превюта на всички тагнати снимки, събиращи се на една страница (табът Снимки на профила).',
		'ConfBigAlbumPictures' : 'Добавяне на връзка на страницата с албуми за показване на увеличени версии на всички снимки, съществуващи на тази страница.',
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
		'ConfFacebookFixerLanguage' : 'Език за FFixer',
		'ConfGoogleApps' : 'Създаване на Google Calendar връзки, съвместими с Google Apps.',
		'ConfGoogleAppsDomain' : 'Домейн',
		'ConfGoogleCalendar' : 'Добавяне на връзки за прибавяне на рождени дни и събития в <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Език за <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHomeFindFriends' : 'Показване на Свържете се с приятели секцията.',
		'ConfHomeLeftAlign' : 'Ляво подравняване на съдържанието на главната страница.',
		'ConfHomePeopleYouMayKnow' : 'Показване на секция Предложения.',
		'ConfHomePokes' : 'Показване на секцията за Сръчквания.',
		'ConfHomeRightColumn' : 'Показване на дясната колона.',
		'ConfiCalendar' : 'Добавяне на връзки за изтегляне на <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-файл с всички рождени дни.',
		'ConfShortcutList' : '<b>Бързи бутони</b> (големи/малки чувствителни):<br /><br /><i>От коя да е страница:</i><br />&nbsp;<b>A</b> - Албуми/снимки<br />&nbsp;<b>B</b> - Превключване на списък Приятели на линия<br />&nbsp;<b>C</b> - Конфигуруране на FFixer<br />&nbsp;<b>F</b> - Приятели<br />&nbsp;<b>H</b> - Главна страница<br />&nbsp;<b>I</b> - Входяща кутия<br />&nbsp;<b>L</b> - Разрешаване/Забраняване на FFixer да проверява за промени по страниците<br />&nbsp;<b>N</b> - Известия<br />&nbsp;<b>P</b> - Профил<br />&nbsp;<b>T</b> - Превод на маркирания текст<br />&nbsp;<b>&lt;escape&gt;</b> - Затваряне на изскачащи прозорци, отворени от FFixer<br /><br /><i>На заглавната страница</i>:<br />&nbsp;<b>f</b> or <b>l</b> - Новини на живо<br />&nbsp;<b>i</b> - Публикации<br />&nbsp;<b>n</b> - Новини<br />&nbsp;<b>p</b> - Снимки<br />&nbsp;<b>s</b> или <b>u</b> - Промени в статуса<br /><br /><i>На профилите</i>:<br />&nbsp;<b>i</b> - Инфо<br />&nbsp;<b>p</b> - Снимки<br />&nbsp;<b>w</b> - Стена<br />&nbsp;<b>x</b> - Кутии<br /><br /><i>На страници с навигация (предишна, следваща и т.н.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Предишна<br />&nbsp;<b>&lt;right arrow&gt;</b> - Следваща<br />&nbsp;<b>&lt;Shift&gt; + &lt;left arrow&gt;</b> - Първа (когато е възможно)<br />&nbsp;<b>&lt;Shift&gt; + &lt;right arrow&gt;</b> - Последна (когато е възможно)<br /><br /><i>При разглеждане на албуми/снимки:</i><br />&nbsp;<b>a</b> - Зареждане на всички превюта (когато е възможно)<br />&nbsp;<b>b</b> - Показване на големи снимки<br />&nbsp;<b>c</b> - Преглед на коментарите<br />&nbsp;<b>k</b> - Назад към албума<br />&nbsp;<b>m</b> - Снимки на (някой) и мен<br /><br /><i>При разглеждане на скорошни албуми и качени/тагнати снимки:</i><br />&nbsp;<b>a</b> или &nbsp;<b>r</b> - Скорошни албуми<br />&nbsp;<b>m</b> или &nbsp;<b>u</b> - Качвания от мобилно устройство<br />&nbsp;<b>o</b> - Снимки с мен<br />&nbsp;<b>p</b> - Мои снимки<br />&nbsp;<b>t</b> или &nbsp;<b>f</b> - Тагнати приятели',
		'ConfNewTabSearch' : 'Резултатите от търсения да се отварят в нов таб/прозорец, когато е натиснат Ctrl + Enter при търсене.',
		'ConfPageTitle' : 'Премахване на "Facebook |" от заглавието на всяка страница.',
		'ConfPhotoPopup' : 'Показване на по-големи превюта на снимките при курсор отгоре.',
		'ConfPopupAutoClose' : 'Автоматично затваряне на изскачащите картинки.',
		'ConfPopupPosition' : 'Позиция на изскачащите картинки',
		'ConfProfilePicPopup' : 'Показване на по-големи превюта на профилните снимки при курсор отгоре',
		'ConfProtocolLinks' : 'Превръщане на ID-тата по профилите във връзки, който започват разговор (Google Talk, Windows Live и т.н.).',
		'ConfSecureLinks' : 'Принуждаване на Facebook връзките да водят до HTTPS страници.',
		'ConfShortcuts' : 'Разрешаване на Бързи бутони. (Вижте <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">списъка</a>)',
		'ConfSign' : 'Показване зодията по профилите (ако е въведена рождена дата).',
		'ConfTopBarFixed' : 'Запазване на горното меню на екрана, дори при скролиране.',
		'ConfTopBarHoverOpacity' : 'При курсор отгоре',
		'ConfTopBarOpacity' : 'Прозрачност на горното меню',
		'ConfUpdates' : 'Проверяване на Userscripts.org ежедневно за ъпдейти на FFixer. Или <a href="#" id="fbfUpdateLink" onclick="return false;">проверка сега</a>.',
		'DownloadVideo' : 'Смъкване на видеото',
		'ExportICalendarFile' : 'Експортиране в iCalendar-файл',
		'ExportICalendarFileWarning' : '(Това ще отнеме време, ако имате много приятели)',
		'fullAlbumLoaded' : 'целият албум е зареден',
		'Left' : 'Отляво',
		'ListeningRestarted' : 'FFixer възстанови проверките за промени.',
		'ListeningStopped' : 'FFixer спря проверките за промени.\nНатиснете L (Shift + l) за повторно пускане',
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
		'UpdateAvailable1' : 'Излязло е обновление на FFixer',
		'UpdateAvailable2' : 'Желаете ли да обновите сега?',
		'UpdateHomepage' : 'Към главната страница',
		'UpdateInstall' : 'Инсталиране сега',
		'UpdateTomorrow' : 'Напомняне утре',
		'yearsOld' : 'на %s години'
	},

	// Greek - Contributed by Dimitris DoSMaN Sarlis (20101024)
	el : {
		'_language' : 'Greek',
		'AddToCalendar' : 'Προσθήκη στο Ημερολόγιο',
		'AddToGoogleCalendar' : 'Προσθήκη στο Ημερολόγιο του Google',
		'all' : 'όλα',
		'All' : 'Όλα',
		'AllPhotosLoaded' : 'Όλες οι φωτογραφίες φορτώθηκαν',
		'Automatic' : 'Αυτόματα',
		'Birthday' : 'Γεννέθλια %s',
		'BookmarkAdd' : 'Προσθήκη Νέου Αγαπημένου',
		'BookmarkExists' : 'Υπάρχει ήδη αγαπημένο για αυτήν την σελίδα.\n\nΠηγαίντε στην σελίδα που θέλετε να προσθέσετε και δοκιμάστε ξανά.',
		'BookmarkNamePrompt' : 'Δώστε ένα όνομα για αυτό το αγαπημένο:\n%s',
		'BookmarksConfirmRemoval' : 'Είστε σίγουρος ότι θέλετε να αφαιρέσετε τα παρακάτω αγαπημένα;',
		'BookmarksManage' : 'Διαχείριση Αγαπημένων',
		'BookmarksRemoveSelected' : 'Αφαίρεση Επιλεγμένων Αγαπημένων',
		'Bookmarks' : 'Αγαπημένα',
		'BrowserUnsupported' : 'Ο περιηγητής σας δεν υποστηρίζει αυτήν την δυνατότητα.',
		'CreatingFile' : 'Δημιουργία Αρχείου',
		'Close' : 'Κλείσιμο',
		'ConfigureFacebookFixer' : 'Διαμόρφωση FFixer',
		'ConfigureInstructions' : 'Όλες οι αλλαγές αποθηκεύονται άμεσα, αλλά κάποιες αλλαγές μπορεί να μην εφαρμοστούν σε καρτέλες που είναι ήδη ανοιχτές.',
		'ConfAge' : 'Εμφάνιση της ηλικίας ατόμων στο προφίλ τους (μόνο εφόσον έχουν δηλώσει την πλήρης ημερομηνία).',
		'ConfApplicationWhitelist' : 'Λίστα Επιτρεπτών Εφαρμογών - Εισάγετε τα IDs από τις εφαρμογές που θέλετε να εμφανίζονται. Διαχωρίστε τα IDs με κενό.',
		'ConfAutoBigAlbumPictures' : 'Αυτόματη εμφάνιση μεγάλων εικόνων άλμπουμ όταν η σελίδα ανοίξει.',
		'ConfAutoLoadFullAlbum' : 'Αυτόματη φόρτωση μικρογραφιών για όλες τις εικόνες του άλμπουμ σε μία σελίδα.',
		'ConfAutoLoadTaggedPhotos' : 'Αυτόματη φόρτωση μικρογραφιών για όλες τις "σημαδεμένες" φωτογραφίες σε μία σελίδα (στην καρτέλα φωτογραφιών, στο προφίλ των ανθρώπων).',
		'ConfAutoReadMore' : 'Αυτόματο κλικ στο σύνδεσμο "διαβάστε περισσότερα"',
		'ConfBigAlbumPictures' : 'Προσθήκη συνδέσμου στις σελίδες των άλμπουμ, για εμφάνιση μεγαλύτερων εκδοχών όλων των εικόνων στην συγκεκριμένη σελίδα.',
		'ConfBigAlbumPicturesBorder' : 'Προσθήκη ενός πλαισίου γύρω από τις μεγάλες εκδόσεις των εικόνων.',
		'ConfBookmarks' : 'Προσθήκη ενός υπομενού Αγαπημένων στην πάνω μπάρα.',
		'ConfBottomBarHoverOpacity' : 'Κατά το πέρασμα του ποντικιού',
		'ConfBottomBarOpacity' : 'Διαφάνεια της κάτω γραμμής μενού.',
		'ConfCalendarBirthDate' : 'Να συμπεριληφθεί η ημερομηνία γέννησης του ατόμου στης λεπτομέριες γεγονότων.',
		'ConfCalendarFullName' : 'Χρήση του πλήρες ονόματος του ατόμου σαν τίτλο γενεθλίων (αντί για μόνο το όνομα).',
		'ConfChatDifferentiate' : 'Χρήση έντονων και πλαγίων γραμμάτων για διαφοροποίηση μεταξύ διαθέσιμων και αδρανών φίλων.',
		'ConfChatHideIdle' : 'Απόκρυψη αδρανών φίλων.',
		'ConfDelayPopupPics' : 'Αναμονή 0.5 δευτερολέπτων πριν την εμφάνιση αναδυόμενων εικόνων.',
		'ConfDelayPopupPicsTimeout' : 'Χρονοκαθυστέριση πριν την εμφάνιση των αναδυόμενων εικόνων, σε χιλιοστά του δευτερολέπτου (προεπιλογή=500):',
		'ConfDownloadVideo' : 'Προσθήκη συνδέσμου για λήψη βίντεο από τις σελίδες βίντεο. (Μπορεί να χρειαστείτε το <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Αυτόματη επαναφόρτωση σελίδων εφαρμογών με σφάλματα, μετά από 5 δευτερόλεπτα.',
		'ConfExport' : 'Για να εξάγετε τις ρυθμίσεις σας, αντιγράψτε το κείμενο παρακάτω και σώστε το σε αρχείο.',
		'ConfExternalPopup' : 'Ανάδυση πραγματικού μεγέθους για εξωτερικές εικόνες. <sup>Δοκιμαστικό</sup>',
		'ConfFacebookFixerLanguage' : 'Γλώσσα για το FFixer',
		'ConfFacebookTimestamps' : 'Εμφάνιση της ώρας του Facebook (πχ. "Πριν 3 ώρες").',
		'ConfFBFTimestamps' : 'Προσθήκη της ώρας του FFixer μετά από την ώρα του Facebook (πχ. "11:45").',
		'ConfFBFTimestamps24' : 'Εμφάνιση της ώρας του FFixer σε 24-ωρη μορφή.',
		'ConfFriendRequestCountInTitle' : 'Εμφάνιση του αριθμού των προσκλήσεων φίλων στον τίτλο της σελίδας.',
		'ConfGoogleApps' : 'Δημιουργία Ημερολογίου Google, συμβατό με Εφαρμογές Google.',
		'ConfGoogleAppsDomain' : 'Τομέας:',
		'ConfGoogleCalendar' : 'Προσθήκη συνδέσμων για πρόσθεση γεννεθλίων και γεγονότων στο <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Ημερολόγιο Google</a>.',
		'ConfGoogleLanguage' : 'Γλώσσα για <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Μεταφραστή Google</a>',
		'ConfHideApplicationStories' : 'Απόκρυψη ιστοριών εφαρμογών.',
		'ConfHideEgos' : 'Απόκρυψη όλων των τομέων "εγώ" (θα πρέπει να κρύβει τις περισσότερες προτάσεις του Facebook).',
		'ConfHideEventStories' : 'Απόκρυψη ιστοριών εκδηλώσεων.',
		'ConfHideFacebookCountInTitle' : 'Απόκρυψη του μετρητή νέων εισερχομένων μηνυμάτων του Facebook.',
		'ConfHideFriendStories' : 'Απόκρυψη ιστοριών φίλων.',
		'ConfHideGroupStories' : 'Απόκρυψη ιστοριών ομάδων.',
		'ConfHideHovercards' : 'Απόκρυψη αναδυόμενων καρτών (η κάρτα που εμφανίζεται όταν περνάει το ποντίκι πάνω από κάποιο όνομα).',
		'ConfHideLikeStories' : 'Απόκρυψη των ιστοριών "μου αρέσει".',
		'ConfHideLinkStories' : 'Απόκρυψη ιστοριών συνδέσμων.',
		'ConfHideNoteStories' : 'Απόκρυψη των ιστοριών σημειώσεων.',
		'ConfHidePhotoStories' : 'Απόκρυψη ιστοριών φωτογραφιών.',
		'ConfHidePlaceStories' : 'Απόκρυψη ιστοριών τόπου.',
		'ConfHideProfilePicStories' : 'Απόκρυψη ιστοριών εικόνας προφίλ.',
		'ConfHideRead' : 'Απόκρυψη αντικειμένων από την τροφοδοσία νέων που έχουν σημειωθεί σαν διαβασμένα.',
		'ConfHideRelationshipStories' : 'Απόκρυψη ιστοριών φιλίας.',
		'ConfHideStatusStories' : 'Απόκρυψη ιστοριών κατάστασης.',
		'ConfHideVideoStories' : 'Απόκρυψη ιστοριών Βίντεο.',
		'ConfHideWallStories' : 'Απόκρυψη ιστοριών τοίχου.',
		'ConfHomeBeta' : 'Εμφάνιση του τομέα Δοκιμαστικής Έκδοσης του Facebook.',
		'ConfHomeChat' : 'Εμφάνιση του τομέα Συνομιλίας.',
		'ConfHomeChatNames' : 'Εμφάνιση ονομάτων στον τομέα Συνομιλίας.',
		'ConfHomeEvents' : 'Εμφάνιση της κατηγορίας εκδηλώσεων.',
		'ConfHomeFindFriends' : 'Εμφάνιση του τομέα "Συνδεθείτε με φίλους".',
		'ConfHomeLeftAlign' : 'Αριστερή στοίχιση των περιεχομένων της αρχικής σελίδας.',
		'ConfHomeLeftColumn' : 'Εμφάνιση της αριστερής στήλης.',
		'ConfHomeLeftColumnFixed' : 'Πάγωμα αριστερής στήλης, ακόμα και αν μετακινήστε προς τα κάτω.',
		'ConfHomeLink' : 'Εμφάνιση του συνδέσμου της Αρχικής Σελίδας στην πάνω μπάρα.',
		'ConfHomeNavigation' : 'Εμφάνιση του τομέα Πλοήγησης.',
		'ConfHomePokes' : 'Εμφάνιση των σκουντηγμάτων.',
		'ConfHomeProfile' : 'Εμφάνιση του τομέα Προφίλ.',
		'ConfHomeRecommendations' : 'Εμφάνιση προτάσεων (Άτομα που ίσως γνωρίζεις, Προτεινόμενες Σελίδες κλπ).',
		'ConfHomeRequests' : 'Εμφάνιση της κατηγορίας Αιτημάτων.',
		'ConfHomeRightColumn' : 'Εμφάνιση του δεξιού τμήματος.',
		'ConfHomeStretch' : 'Άνοιγμα της αρχικής σελίδας με βάση το πλάτος του παραθύρου του περιηγητή.',
		'ConfHomeStretchComments' : 'Άνοιγμα του πλάτους των σχολίων στην αρχική σελίδα.',
		'ConfiCalendar' : 'Προσθήκη συνδέσμων για λήψη αρχείου <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> με όλα τα γεννέθλια.',
		'ConfImport' : 'Για να εισάγετε τις ρυθμίσεις σας αργότερα, αντικαταστήστε το κείμενο που αποθηκεύσατε προηγουμένως και πατήστε στο κουμπί "Εισαγωγή".',
		'ConfInboxCountInTitle' : 'Εμφάνιση του πλήθους των αδιάβαστων μηνυμάτων στα εισερχόμενα στον τίτλο της σελίδας.',
		'ConfLogoutLink' : 'Προσθήκη ενός συνδέσμου για αποσύνδεση στην πάνω μπάρα.',
		'ConfNotificationCountInTitle' : 'Εμφάνιση των νέων ειδοποιήσεων στον τίτλο της σελίδας.',
		'ConfNewTabSearch' : 'Άνοιγμα αναζήτησης σε καινούργια καρτέλα ή παράθυρο όταν πιέζετε το CTRL + Enter για αναζήτηση.',
		'ConfPageTitle' : 'Αφαίρεση του "Facebook |" από τον τίτλο της κάθε σελίδας.',
		'ConfPhotoPopup' : 'Εμφάνιση αναδυόμενων φωτογραφιών σε πραγματικό μέγεθος κατά το πέρασμα του ποντικιού.',
		'ConfPopupAutoClose' : 'Κλείσιμο αναδυόμενων φωτογραφιών αυτόματα.',
		'ConfPopupSmartAutoClose' : 'Αποτροπή κλεισίματος αναδυόμενων φωτογραφιών εάν το ποντίκι είναι πάνω τους.',
		'ConfPopupPosition' : 'Θέση αναδυόμενων φωτογραφιών',
		'ConfPopupWhileTagging' : 'Εμφάνιση αναδυόμενων εικόνων ακόμα και στην προσθήκη ετικέτας.',
		'ConfProcessInterval' : 'Διάστημα που απαιτείται για να φορτώσει η σελίδα, σε χιλιοστά του δευτερολέπτου. (προεπιλογή=1000):',
		'ConfProfileLink' : 'Εμφάνιση του συνδέσμου Προφίλ στην πάνω μπάρα.',
		'ConfProfilePicPopup' : 'Εμφάνιση αναδυόμενων φωτογραφιών προφίλ σε πραγματικό μέγεθος κατά το πέρασμα του ποντικιού',
		'ConfProtocolLinks' : 'Μετατροπή του Messenger IDs των προφίλ σε συνδέσμους όπου μπορεί να ξεκινήσει συζήτηση με αυτούς (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Σχετικά με το FFixer',
		'ConfSectionAdvanced' : 'Για προχωρήμένους',
		'ConfSectionEvents' : 'Γεννέθλια/Εκδηλώσεις',
		'ConfSectionImportExport' : 'Εισαγωγή/Εξαγωγή',
		'ConfSectionFeeds' : 'Τροφοδοσίες',
		'ConfSectionHomePage' : 'Αρχική Σελίδα',
		'ConfSectionLiveFeed' : 'Τελευταία Νέα',
		'ConfSectionMenu' : 'Μενού/Συνομιλία',
		'ConfSectionOther' : 'Άλλες Επιλογές',
		'ConfSectionPageTitle' : 'Τίτλος Σελίδας',
		'ConfSectionPictures' : 'Εικόνες',
		'ConfSectionShortcuts' : 'Συντομεύσεις Πληκτρολογίου',
		'ConfSecureLinks' : 'Εξανάγκασε τους συνδέσμους του Facebook να δείχνουν σε ασφαλείς (HTTPS) σελίδες.',
		'ConfShortcutList' : '<b>Συντομεύσεις Πληκτρολογίου</b> (ευαισθησία χαρακτήρων):<br /><br /><i>Από οποιαδήποτε σελίδα:</i><br /> <b>A</b> - Άλμπουμ/Φωτογραφίες<br /> <b>B</b> - Εμφάνιση/Απόκρυψη λίστα φίλων (διαθέσιμοι φίλοι)<br /> <b>C</b> - Επιλογές FFixer<br /> <b>F</b> - Φίλοι<br /> <b>H</b> - Αρχική Σελίδα<br /> <b>I</b> - Εισερχόμενα<br /> <b>K</b> - Προσθήκη Αγαπημένου<br /> <b>L</b> - Επιλογή του συνδέσμου αποσύνδεσης (πατήστε το Enter αμέσως μετά για να αποσυνδεθείτε)<br /> <b>N</b> - Ειδοποιήσεις<br /> <b>P</b> - Το προφίλ σας<br /> <b>T</b> - Μετάφραση επιλεγμένου κειμένου<br /> <b><escape></b> - Κλείσιμο αναδυόμενων δημιουργημένα από το FFixer<br /><br /><i>Από την αρχική σελίδα</i>:<br /> <b>f</b> ή <b>l</b> - Ζωντανές τροφοδοτήσεις<br /> <b>i</b> - Δημοσιευμένα στοιχεία<br /> <b>n</b> - Τροφοδότηση Νέων<br /> <b>p</b> - Φωτογραφίες<br /> <b>s</b> ή <b>u</b> - Ανανεώσεις κατάστασης<br /><br /><i>Από προφίλ</i>:<br /> <b>i</b> - Πληροφορίες<br /> <b>p</b> - Φωτογραφίες<br /> <b>w</b> - Τοίχος<br /> <b>x</b> - Πλαίσια<br /><br /><i>Από σελίδες με πλοήγηση (προηγούμενη, επόμενη, κ.ά.)</i><br /> <b><αριστερό βελάκι></b> - Προηγούμενη<br /> <b><δεξί βελάκι></b> - Επόμενη<br /> <b><shift> + <αριστερό βελάκι></b> - Αρχική (όταν είναι διαθέσιμη)<br /> <b><shift> + <δεξί βελάκι></b> - Τελευταία (όταν είναι διαθέσιμη)<br /><br /><i>Κατά την προβολή άλμπουμ/φωτογραφίες:</i><br /> <b>a</b> - Φόρτωση όλων των μικρογραφιών (όταν είναι διαθέσιμο)<br /> <b>b</b> - Εμφάνιση μεγαλύτερων φωτογραφιών<br /> <b>c</b> - Εμφάνιση παρατηρήσεων<br /> <b>k</b> - Επιστροφή στο Άλμπουμ<br /> <b>m</b> - Φωτογραφίες από (άτομο) και εμένα<br /><br /><i>Κατά την διάρκεια πρόσφατων άλμπουμ και ανεβασμένων/σημειωμένων φωτογραφιών:</i><br /> <b>a</b> ή  <b>r</b> - Πρόσφατα Άλμπουμ<br /> <b>m</b> ή  <b>u</b> - Ανεβασμένα από κινητό<br /> <b>o</b> - Φωτογραφίες με μένα<br /> <b>p</b> - Οι φωτογραφίες μου<br /> <b>t</b> ή  <b>f</b> - Σημειωμένοι φίλοι',
		'ConfShortcuts' : 'Ενεργοποίηση συντομεύσεων πληκτρολογίου.',
		'ConfSign' : 'Εμφάνιση του ζωδίου του ατόμου στο προφίλ του (εφόσων έχει δώσει την πλήρης ημερομηνία γέννησης).',
		'ConfTopBarFixed' : 'Πάγωμα μπάρας μενού, ακόμα και αν η σελίδα κυλάει προς τα κάτω.',
		'ConfTopBarHoverOpacity' : 'Κατά το πέρασμα του ποντικιού',
		'ConfTopBarOpacity' : 'Διαφάνεια μπάρας μενού κορυφής',
		'ConfUpdates' : 'Έλεγχος Userscripts.org καθημερινά για καινούργιες ενημερώσεις του FFixer ή <a href="#" id="fbfUpdateLink" onclick="return false;">έλεγχος τώρα</a>.',
		'DownloadVideo' : 'Λήψη Βίντεο',
		'ExportICalendarFile' : 'Εξαγωγή αρχείου iCalendar',
		'ExportICalendarFileWarning' : '(Αυτό θα πάρει αρκετή ώρα αν έχετε πολλούς φίλους)',
		'FacebookFixerConflict' : 'Το FacebookFixer είναι πλέον γνωστό σαν FFixer. Λόγω της αλλαγής του ονόματος θα πρέπει να απεγκαταστήσετε χειροκίνητα το FFixer από τον περιηγητή σας, διαφορετικά τα δύο προγράμματα θα συγκρούονται μεταξύ τους. Εάν δεν είσαστε σίγουροι για το πως να απεγκαταστήσετε ένα πρόγραμμα userscript, <a %s>πατήστε εδώ για οδηγίες</a>.',
		'fullAlbumLoaded' : 'η φόρτωση του άλμπουμ ολοκληρώθηκε',
		'Import' : 'Εισαγωγή',
		'ImportConfirm' : 'Είστε σίγουρος ότι θέλετε να εισάγετε αυτές τις ρυθμίσεις;\nΟι τρέχουσες ρυθμίσεις θα χαθούν.',
		'ImportFailure' : 'Προέκυψε σφάλμα κατά την εισαγωγή των ρυθμίσεων.',
		'ImportSuccess' : 'Η εισαγωγή ολοκληρώθηκε. Θέλετε να ανανεώσετε την σελίδα;',
		'Left' : 'Αριστερά',
		'LoadingAllPhotos' : 'Φόρτωση όλων των φωτογραφιών...',
		'loadingFullAlbum' : 'Φόρτωση όλου του άλμπουμ...',
		'LoadingPic' : 'Φόρτωση εικόνας...',
		'LoadPhotosWarning' : 'Η φόρτωση όλων των φωτογραφιών μπορεί να πάρει αρκετή ώρα',
		'Months' : new Array('Ιανουάριος','Φεβρουάριος','Μάρτιος','Απρίλιος','Μάιος','Ιούνιος','Ιούλιος','Αύγουστος','Σεπτέμβριος','Οκτώβριος','Νοέμβριος','Δεκέμβριος'),
		'ProtocolSkype' : 'Κλήση %s μέσω Skype',
		'ProtocolMSN' : 'Συζήτηση με %s μέσω Windows Live',
		'ProtocolYahoo' : 'Συζήτηση με %s μέσω Yahoo Messenger',
		'ProtocolGoogle' : 'Συζήτηση με %s μέσω Google Talk',
		'ReloadErrorPage' : 'Πατήστε για δοκιμή ξανά ή περιμένετε 5 δευτερόλεπτα',
		'Refresh' : 'Ανανέωση',
		'Remove' : 'Αφαίρεση',
		'Right' : 'Δεξιά',
		'ShowBigPictures' : 'Εμφάνιση μεγαλύτερων εικόνων',
		'Signs' : new Array('Αιγόκερως','Υδροχόος','Ιχθείς','Κριός','Ταύρος','Δίδυμος','Καρκίνος','Λέων','Παρθένος','Ζυγός','Σκορπιός','Τοξότης'),
		'today' : 'σήμερα',
		'Translators' : 'Μεταφραστές',
		'UpdateAvailable1' : 'Υπάρχει καινούργια διαθέσιμη έκδοση του FFixer',
		'UpdateAvailable2' : 'Θέλετε να την ενημερώσετε τώρα;',
		'UpdateHomepage' : 'Επιστροφή στην Αρχική Σελίδα',
		'UpdateInstall' : 'Εγκατάσταση τώρα',
		'UpdateTomorrow' : 'Υπενθύμιση αύριο',
		'yearsOld' : '%s χρονών'
	},

	// Slovak - Contributed by Peter Miksik (20100817)
	sk : {
		'_language' : 'Slovak',
		'AddToCalendar' : 'Pridať do Kalendára',
		'AddToGoogleCalendar' : 'Pridať do Kalendára Google',
		'all' : 'všetko',
		'All' : 'Všetko',
		'AllPhotosLoaded' : 'Všetky fotografie načítané',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narodeniny %s',
		'BookmarkAdd' : 'Pridať novú záložku',
		'BookmarkExists' : 'Táto stránka už je v záložkách.\n\nPrejdite na stránku, ktorú chcete pridať medzi záložky a skúste to znova.',
		'BookmarkNamePrompt' : 'Zadajte názov tejto záložky:\n%s',
		'BookmarksConfirmRemoval' : 'Naozaj chcete odstrániť nasledujúce záložky?',
		'BookmarksManage' : 'Spravovať záložky',
		'BookmarksRemoveSelected' : 'Odstrániť vybrané záložky',
		'Bookmarks' : 'Záložky',
		'BrowserUnsupported' : 'Váš prehliadač túto funkciu nepodporuje.',
		'CreatingFile' : 'Vytvorenie súboru',
		'Close' : 'Zavrieť',
		'ConfigureFacebookFixer' : 'Konfigurovať FFixer',
		'ConfigureInstructions' : 'Všetky zmeny sú ukladané okamžite, ale niektoré zmeny sa nemusia prejaviť na kartách, ktoré sú už otvorené.',
		'ConfAge' : 'Zobraziť vek ľudí v ich profiloch (ak poskytli celý dátum narodenia)',
		'ConfAlbumComments' : 'Pridať na stránkach albumu odkaz na zobrazenie všetkých komentárov v albume',
		'ConfApplicationWhitelist' : 'Zoznam povolených aplikácií – zadajte ID aplikácií, ktoré chrániť pred skrytím. ID oddeľte medzerou.',
		'ConfAutoBigAlbumPictures' : 'Automaticky pri otvorení stránky zobraziť väčšie obrázky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky načítať miniatúry všetkých obrázkov v albume na jednej stránke',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky načítať miniatúry všetkých fotografií s menovkou na jednej stránke (karta Fotky v profiloch ľudí)',
		'ConfAutoReadMore' : 'Automaticky kliknúť na odkazy "čítať ďalej"',
		'ConfBigAlbumPictures' : 'Pridať odkaz na stránkach albumu na zobrazenie väčších verzií všetkých obrázkov na tejto stránke',
		'ConfBookmarks' : 'Pridať na panel vrchnej ponuky podponuku Záložky',
		'ConfBottomBarHoverOpacity' : 'Pri ukázaní myšou',
		'ConfBottomBarOpacity' : 'Priehľadnosť spodného panela s ponukou',
		'ConfCalendarBirthDate' : 'Zahrnúť narodeniny osoby do podrobností udalosti',
		'ConfCalendarFullName' : 'Použiť celé meno osoby ako názov narodenín (namiesto krstného mena)',
		'ConfChatDifferentiate' : 'Použiť tučné písmo a kurzívu na rozlíšenie pripojených a nečinných priateľov',
		'ConfChatHideIdle' : 'Skryť nečinných priateľov',
		'ConfDelayPopupPics' : 'Počkať 0,5 sekundy pred načítaním obrázkov v kontextovom okne',
		'ConfDelayPopupPicsTimeout' : 'Oneskorenie pred zobrazením obrázkov v kontextovom okne, v milisekundách (predvolené=500):',
		'ConfDownloadVideo' : 'Pridať odkaz na prevzatie videí zo stránok s videom (možno budete potrebovať <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">prehrávač FLV</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundách znova načítať chybové stránky aplikácií',
		'ConfExport' : 'Ak chcete exportovať nastavenia, skopírujte dole uvedený text a uložte ho do súboru.',
		'ConfExternalPopup' : 'Externé obrázky plnej veľkosti v kontextovom okne <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jazyk pre Facebook Fixer',
		'ConfFacebookTimestamps' : 'Zobraziť časové značky Facebooku (t. j. "pred 3 hodinami")',
		'ConfFBFTimestamps' : 'Pridať časové značky skriptu Facebook Fixer za časové značky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'Zobraziť časové značky skriptu Facebook Fixer v 24-hodinovom formáte',
		'ConfFriendRequestCountInTitle' : 'Zobraziť v názve stránky počet nových žiadostí o priateľstvo',
		'ConfGoogleApps' : 'Vytvoriť odkazy pre Google Calendar kompatibilné s Google Apps',
		'ConfGoogleAppsDomain' : 'Doména',
		'ConfGoogleCalendar' : 'Pridať odkazy na zaradenie narodenín a udalostí do aplikácie <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pre <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Skryť príspevky o aplikáciách',
		'ConfHideEventStories' : 'Skryť príspevky o udalostiach',
		'ConfHideFacebookCountInTitle' : 'Skryť počet nových správ na Facebooku',
		'ConfHideFriendStories' : 'Skryť príspevky o priateľoch',
		'ConfHideGroupStories' : 'Skryť príspevky o skupinách',
		'ConfHideLikeStories' : 'Skryť príspevky "Páči sa mi to"',
		'ConfHideLinkStories' : 'Skryť príspevky o odkazoch',
		'ConfHideNoteStories' : 'Skryť príspevky o poznámkach',
		'ConfHidePhotoStories' : 'Skryť príspevky o fotkách',
		'ConfHideProfilePicStories' : 'Skryť príspevky o profilových fotkách',
		'ConfHideRead' : 'Skryť položky, ktoré boli označené ako prečítané',
		'ConfHideRelationshipStories' : 'Skryť príspevky o stave vzťahu',
		'ConfHideStatusStories' : 'Skryť príspevky o statuse',
		'ConfHideVideoStories' : 'Skryť príspevky o videách',
		'ConfHideWallStories' : 'Skryť príspevky o nástenkách',
		'ConfHomeBeta' : 'Zobraziť časť Beta Tester',
		'ConfHomeChat' : 'Zobraziť časť Chat',
		'ConfHomeEvents' : 'Zobraziť časť Udalosti',
		'ConfHomeFindFriends' : 'Zobraziť časť Spojte sa s priateľmi',
		'ConfHomeLeftAlign' : 'Zarovnať obsah úvodnej stránky naľavo',
		'ConfHomeLeftColumn' : 'Zobraziť ľavý stĺpec',
		'ConfHomeLeftColumnFixed' : 'Nechať ľavý stĺpec viditeľný aj pri posúvaní nadol',
		'ConfHomeLink' : 'Zobraziť vo vrchnej ponuke odkaz na úvodnú stránku',
		'ConfHomeNavigation' : 'Zobraziť časť Navigácia',
		'ConfHomePokes' : 'Zobraziť časť Štuchnutia',
		'ConfHomeProfile' : 'Zobraziť časť Profil',
		'ConfHomeRecommendations' : 'Zobraziť odporúčania (Ľudia, ktorých poznáte; Odporúčané stránky atď.)',
		'ConfHomeRequests' : 'Zobraziť časť Žiadosti',
		'ConfHomeRightColumn' : 'Zobraziť pravý stĺpec',
		'ConfHomeStretch' : 'Roztiahnuť úvodnú stránku na šírku okna prehľadávača',
		'ConfHomeStretchComments' : 'Roztiahnuť komentáre na hlavnej stránke',
		'ConfiCalendar' : 'Pridať odkazy na prevzatie súboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> so všetkými narodeninami',
		'ConfImport' : 'Ak chcete neskôr importovať nastavenia, prepíšte dole uvedený text tým, ktorý ste predtým uložili, a kliknite na "Import".',
		'ConfInboxCountInTitle' : 'Zobraziť v názve stránky počet neprečítaných prijatých správ',
		'ConfLogoutLink' : 'Pridať do vrchnej ponuky odkaz na odhlásenie',
		'ConfNotificationCountInTitle' : 'Zobraziť v názve stránky počet nových upozornení',
		'ConfNewTabSearch' : 'Pri vyhľadávaní otvoriť stlačením Ctrl+Enter výsledky hľadania na novej karte/v novom okne',
		'ConfPageTitle' : 'Odstrániť "Facebook |" z názvu všetkých stránok',
		'ConfPhotoPopup' : 'Väčšie verzie fotiek v kontextovom okne po ukázaní myšou',
		'ConfPopupAutoClose' : 'Automaticky zatvárať kontextové okná s obrázkami',
		'ConfPopupSmartAutoClose' : 'Zabrániť autom. zatvoreniu kontextových okien s obrázkom, ak je na nich kurzor myši',
		'ConfPopupPosition' : 'Umiestnenie kontextového okna s obrázkom',
		'ConfProcessInterval' : 'Interval spracovania stránky, v milisekundách (predvolené=1000):',
		'ConfProfileLink' : 'Zobraziť na vrchnom paneli s ponukou odkaz na profil',
		'ConfProfilePicPopup' : 'Väčšie verzie profilových fotiek v kontextovom okne po ukázaní myšou',
		'ConfProtocolLinks' : 'Zmeniť ID pre okamžité správy na odkazy spúšťajúce konverzáciu (Google Talk, Windows Live atď.)',
		'ConfSectionAbout' : 'Čo je Facebook Fixer',
		'ConfSectionAdvanced' : 'Spresnenie',
		'ConfSectionEvents' : 'Narodeniny/Udalosti',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Novinky',
		'ConfSectionHomePage' : 'Úvodná stránka',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'Ponuky/Chat',
		'ConfSectionOther' : 'Ďalšie možnosti',
		'ConfSectionPageTitle' : 'Názov stránky',
		'ConfSectionPictures' : 'Obrázky',
		'ConfSectionShortcuts' : 'Klávesové skratky',
		'ConfSecureLinks' : 'Vynútiť zmenu odkazov Facebooku na stránky HTTPS',
		'ConfShortcutList' : '<b>Klávesové skratky</b> (rozlišujú sa malé/veľké písmená):<br /><br /><i>Z ľubovoľnej stránky:</i><br /> <b>A</b> – Albumy/fotky<br /> <b>B</b> – Prepnúť zoznam priateľov (online priatelia)<br /> <b>C</b> – Konfigurácia skriptu Facebook Fixer<br /> <b>D</b> – Narodeniny<br /> <b>E</b> – Udalosti<br /> <b>F</b> – Priatelia<br /> <b>H</b> – Domov<br /> <b>I</b> – Prijaté správy<br /> <b>L</b> – Vybrať odkaz Odhlásiť sa (po odhlásení stlačte Enter)<br /> <b>N</b> – Upozornenia<br /> <b>P</b> – Váš profil<br /> <b>R</b> – Žiadosti<br /> <b>S</b> – Preskočiť na pole Hľadať<br /> <b>T</b> – Preložiť vybraný text<br /> <b>?</b> – Zobraziť informácie o ladení skriptu Facebook Fixer<br /> <b><Esc></b> – Zavrieť kontextové okná vytvorené skriptom Facebook Fixer<br /><br /><i>Zo stránky Domov (filtre)</i>:<br /> <b>a</b> – Stránky<br /> <b>f</b> – Aktuality<br /> <b>g</b> – Skupiny<br /> <b>l</b> – Odkazy<br /> <b>n</b> – Novinky<br /> <b>p</b> – Fotky<br /> <b>s</b> alebo <b>u</b> – Čo robia ostatní<br /> <b>t</b> – Poznámky<br /> <b>v</b> – Videá<br /><br /><i>Z profilov</i>:<br /> <b>i</b> – Informácie<br /> <b>p</b> – Fotky<br /> <b>w</b> – Nástenka<br /> <b>x</b> – Priečinky<br /><br /><i>Zo stránok s navigáciou (dozadu, dopredu atď.)</i><br /> <b><šípka doľava></b> – Dozadu<br /> <b><šípka doprava></b> – Dopredu<br /> <b><shift> + <šípka doľava></b> – Prvá (ak je k dispozícii)<br /> <b><shift> + <šípka doprava></b> – Posledná (ak je k dispozícii)<br /><br /><i>Počas prezerania albumov/fotiek:</i><br /> <b>a</b> – Načítať všetky miniatúry (ak je k dispozícii)<br /> <b>b</b> – Zobraziť veľké obrázky<br /> <b>c</b> – Zobraziť komentáre<br /> <b>k</b> – Späť na album<br /> <b>m</b> – Fotky osoby a mňa<br /><br /><i>Počas prezerania najnovších albumov a nahratých fotiek/fotiek s menovkou:</i><br /> <b>a</b> or  <b>r</b> – Najnovšie albumy<br /> <b>m</b> alebo  <b>u</b> – Nahraté z mobilu<br /> <b>o</b> – Fotky, na ktorých som ja<br /> <b>p</b> – Moje fotky<br /> <b>t</b> alebo  <b>f</b> Menovky priateľov',
		'ConfShortcuts' : 'Povoliť klávesové skratky',
		'ConfSign' : 'Zobraziť znamenie ľudí v ich profiloch (ak poskytli svoj dátum narodenia)',
		'ConfTopBarFixed' : 'Vždy zobraziť vrchný panel s ponukou aj pri posúvaní stránky nadol',
		'ConfTopBarHoverOpacity' : 'Pri ukázaní myšou',
		'ConfTopBarOpacity' : 'Priehľadnosť vrchného panela s ponukou',
		'ConfUpdates' : 'Denne na Userscripts.org overovať aktualizácie pre Facebook Fixer, prípadne <a href="#" id="fbfUpdateLink" onclick="return false;">skontrolovať teraz</a>.',
		'DownloadVideo' : 'Prevziať video',
		'ExportICalendarFile' : 'Exportovať súbor iCalendar',
		'ExportICalendarFileWarning' : '(Ak máte mnoho priateľov, môže to chvíľu trvať.)',
		'FacebookFixerConflict' : 'Facebook Fixer sa odteraz nazýva FFixer.<br /><br />Pretože sa zmenil názov, je potrebné ručne odinštalovať Facebook Fixer z prehliadača, inak budú v konflikte dva skripty medzi sebou navzájom.<br /><br />Ak neviete, ako skript odinštalovať, <a %s>kliknutím sem otvorte pokyny</a>.',
		'fullAlbumLoaded' : 'celý album načítaný',
		'Import' : 'Import',
		'ImportConfirm' : 'Naozaj chcete importovať tieto nastavenia?\nVaše súčasné nastavenia budú stratené.',
		'ImportFailure' : 'Počas pokusu o import nastavení došlo k chybe.',
		'ImportSuccess' : 'Import dokončený. Chcete obnoviť stránku?',
		'Left' : 'Vľavo',
		'LoadingAllPhotos' : 'Načítavajú sa všetky fotky...',
		'loadingFullAlbum' : 'Načítava sa celý album...',
		'LoadingPic' : 'Načítava sa obrázok...',
		'LoadPhotosWarning' : 'Načítavanie všetkých fotiek môže chvíľu trvať',
		'Months' : new Array('Január','Február','Marec','Apríl','Máj','Jún','Júl','August','September','Október','November','December'),
		'ProtocolSkype' : 'Volať %s pomocou Skype',
		'ProtocolMSN' : 'Chatovať s %s pomocou Windows Live',
		'ProtocolYahoo' : 'Chatovať s %s pomocou Yahoo Messenger',
		'ProtocolGoogle' : 'Chatovať s %s pomocou Google Talk',
		'ReloadErrorPage' : 'Kliknite na Skúsiť znova alebo počkajte 5 sekúnd',
		'Refresh' : 'Obnoviť',
		'Remove' : 'Odstrániť',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'Zobraziť veľké obrázky',
		'Signs' : new Array('Kozorožec','Vodnár','Ryba','Baran','Býk','Blíženci','Rak','Lev','Panna','Váhy','Škorpión','Strelec'),
		'today' : 'dnes',
		'Translators' : 'Prekladatelia',
		'UpdateAvailable1' : 'K dispozícii je aktualizácia skriptu Facebook Fixer.',
		'UpdateAvailable2' : 'Chcete aktualizovať teraz?',
		'UpdateHomepage' : 'Prejsť na dom. stránku',
		'UpdateInstall' : 'Nainštalovať',
		'UpdateTomorrow' : 'Pripomenúť zajtra',
		'ViewAlbumComments' : 'Zobraziť komentáre v albume',
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
		'ConfChatDifferentiate' : 'Gebruik dikgedrukt en cursief om te differentiëren tussen beschikbaar en niet beschikbaar.',
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
		'AddToCalendar' : '加到日曆',
		'AddToGoogleCalendar' : '加到Google日曆',
		'all' : '全部',
		'All' : '全部',
		'AllPhotosLoaded' : '讀取所有相片',
		'Automatic' : '自動',
		'Birthday' : '%s\的生日',
		'BookmarkAdd' : '增加新的書籤',
		'BookmarkConfirmRemoval' : '您確定要移除書籤嗎？ "%s"?',
		'BookmarkDoesNotExist' : '此頁面無法加入書籤。\n\n轉到您要刪除的頁面，然後再試一次。',
		'BookmarkExists' : '此頁已加入書籤。\n\n轉到您要加入書籤的頁面，然後再試一次。',
		'BookmarkNamePrompt' : '輸入新的書籤名稱：\n%s',
		'BookmarkRemove' : '移除書籤',
		'Bookmarks' : '我的最愛',
		'BrowserUnsupported' : '您的瀏覽器尚未支援此功能。',
		'CreatingFile' : '創建文件',
		'Close' : '關閉',
		'ConfigureFacebookFixer' : '設定 FFixer',
		'ConfigureInstructions' : '改變設定都應立即存檔，如遇到部份功能未生效，表示該功能或許已開放。',
		'ConfAge' : '於個人資料顯示朋友\的年齡（如果他們設定正確無誤的話）。',
		'ConfAutoBigAlbumPictures' : '開啟相簿時自動顯示較大的相簿圖片。',
		'ConfAutoLoadFullAlbum' : '於單一頁面中自動顯示所有相片的縮圖',
		'ConfAutoLoadTaggedPhotos' : '於單一頁面中自動顯示所有標記的相片縮圖 (朋友\的個人資料標籤上)。',
		'ConfAutoReadMore' : '自動點選"繼續閱讀"連結。',
		'ConfBigAlbumPictures' : '新增一個顯示較大圖片版本的連結在相本上。',
		'ConfBookmarks' : '在頂端的選單中新增『加入書籤』的選單',
		'ConfBottomBarHoverOpacity' : 'On mouse-over',
		'ConfBottomBarOpacity' : '底部選單的透明度。',
		'ConfCalendarBirthDate' : '包括朋友\的生日活動詳情。',
		'ConfCalendarFullName' : '使用朋友\的全名作為生日的標題 (而不是只有first name)。',
		'ConfChatDifferentiate' : '使用粗體和斜體區分在線及閒置的好友。',
		'ConfChatHideIdle' : '隱藏閒置的朋友。',
		'ConfDelayPopupPics' : '顯示彈出的圖片前，增加一個短暫的緩衝時間。',
		'ConfDelayPopupPicsTimeout' : '顯示彈出的圖片前延遲時間，以毫秒計算(預設值=500):',
		'ConfDownloadVideo' : '在有短片的頁面新增一個下載連結 (你也許需要 <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '應用程式錯誤的後5秒自動重新讀取。',
		'ConfExport' : '匯出您的相關設定，複製下列文字，並另存於一個文件檔案。',
		'ConfExternalPopup' : '彈出全尺寸的外連圖片。 <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'FFixer的語言選項',
		'ConfFacebookTimestamps' : '顯示Facebook原來的時間戳記 (eg. "3 hours ago").',
		'ConfFBFTimestamps' : '新增FFixer的顯示時間戳記 (eg. "11:45").',
		'ConfFBFTimestamps24' : 'FFixer的時間戳記採用24小時制。',
		'ConfFriendRequestCountInTitle' : '在網頁標題顯示新增好友的請求。',
		'ConfGoogleApps' : '創建Google日曆連結使其與Google的應用服務相容。',
		'ConfGoogleAppsDomain' : '域名',
		'ConfGoogleCalendar' : '新增一個生日及活動的連結 <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : '語言 <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : '隱藏應用程式紀錄。',
		'ConfHideEventStories' : '隱藏事件紀錄。',
		'ConfHideFanStories' : '隱藏粉絲紀錄。',
		'ConfHideFriendStories' : '隱藏朋友紀錄。',
		'ConfHideGroupStories' : '隱藏團體紀錄。',
		'ConfHideLinkStories' : '隱藏連結紀錄。',
		'ConfHidePhotoStories' : '隱藏圖片紀錄。',
		'ConfHideProfilePicStories' : '隱藏個人資料的圖片紀錄。',
		'ConfHideRead' : '隱藏標記已讀得即時動態項目。',
		'ConfHideRelationshipStories' : '隱藏關聯紀錄。',
		'ConfHideStatusStories' : '隱藏身份紀錄。',
		'ConfHideVideoStories' : '隱藏短片紀錄。',
		'ConfHideWallStories' : '隱藏塗鴉牆紀錄。',
		'ConfHomeChat' : '顯示聊天部份。',
		'ConfHomeEvents' : '顯示部份活動。',
		'ConfHomeFindFriends' : '顯示朋友連結。',
		'ConfHomeLeftAlign' : '首頁向左對齊。',
		'ConfHomeLeftColumn' : '顯示左側欄位。',
		'ConfHomeLeftColumnFixed' : '向下滾動時，保持左側欄位可見。',
		'ConfHomeLink' : '在頂端的選單中，顯示首頁的連結。',
		'ConfHomePeopleYouMayKnow' : '顯示部份建議。',
		'ConfHomeNavigation' : '顯示導覽部份。',
		'ConfHomePokes' : '顯示戳一下的部份。',
		'ConfHomeProfile' : '顯示個人資料部份。',
		'ConfHomeRequests' : '顯示部份要求。',
		'ConfHomeRightColumn' : '顯示右欄。',
		'ConfHomeStretch' : '在瀏覽器中延伸首頁的寬度。',
		'ConfiCalendar' : '增加一個下載連結 <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> file with all birthdays.',
		'ConfImport' : '如果在將來要匯入舊有設定，直接將之前的保存設定覆蓋底下的文字，然後選擇"Import（匯入）"',
		'ConfInboxCountInTitle' : '在信箱頁面顯示未讀的郵件數量',
		'ConfLogoutLink' : '在頂部的選單中加入『登出』連結。',
		'ConfNotificationCountInTitle' : '在網頁標題顯示新的通知。',
		'ConfNewTabSearch' : '使用 CTRL + Enter 搜索時，在新的頁面顯示搜尋結果。',
		'ConfPageTitle' : '移除每個頁面的 "Facebook |" 字樣。',
		'ConfPhotoPopup' : '滑鼠停於上方，自動彈出較大的圖片。',
		'ConfPopupAutoClose' : '關閉自動彈出圖片。',
		'ConfPopupSmartAutoClose' : '如果滑鼠移動到時，防止彈出圖片自動關閉。',
		'ConfPopupPosition' : '彈出圖片的顯示位置。',
		'ConfProcessInterval' : '頁面連結的間隔時間，以毫秒計算 (預設值=1000):',
		'ConfProfileLink' : '在頂端了選單中，顯示個人資料連結。',
		'ConfProfilePicPopup' : '滑鼠停於個人資料圖片上方時，自動彈出較大的圖片。',
		'ConfProtocolLinks' : '從個人資料的ID上打開聊天視窗，進入連結後即可開始交談對話。 (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : '關於 FFixer',
		'ConfSectionAdvanced' : '進階',
		'ConfSectionEvents' : '生日/活動',
		'ConfSectionFeeds' : '即時動態',
		'ConfSectionHomePage' : '首頁',
		'ConfSectionImportExport' : '匯入/匯出',
		'ConfSectionLiveFeed' : '即時動態',
		'ConfSectionMenu' : '選單/聊天',
		'ConfSectionOther' : '其他選項',
		'ConfSectionPageTitle' : '頁面標題',
		'ConfSectionPictures' : '圖片',
		'ConfSectionShortcuts' : '鍵盤快捷鍵',
		'ConfSecureLinks' : '強迫 Facebook 連結到 HTTPS 頁面。',
		'ConfShortcutList' : '<b>鍵盤快捷鍵</b> (大小寫區分):<br /><br /><i>從任何頁面:</i><br />&nbsp;<b>A</b> - 相本/相片<br />&nbsp;<b>B</b> - 切換好友列表 (在線好友)<br />&nbsp;<b>C</b> - FFixer 設置<br />&nbsp;<b>D</b> - 生日<br />&nbsp;<b>E</b> - 活動<br />&nbsp;<b>F</b> - 朋友<br />&nbsp;<b>H</b> - 首頁<br />&nbsp;<b>I</b> - 信箱<br />&nbsp;<b>L</b> - 選擇登出連結 (按下確定後登出)<br />&nbsp;<b>N</b> - 通知<br />&nbsp;<b>P</b> - 你的個人資料<br />&nbsp;<b>R</b> - 請求<br />&nbsp;<b>S</b> - 跳到搜索欄位<br />&nbsp;<b>T</b> - 翻譯選擇的內容<br />&nbsp;<b>?</b> - 顯示FFixer除錯訊息<br />&nbsp;<b>&lt;escape&gt;</b> - 使用FFixer關閉彈出視窗<br /><br /><i>從首頁 (過濾)</i>:<br />&nbsp;<b>a</b> - 頁面<br />&nbsp;<b>f</b> - 即時動態<br />&nbsp;<b>g</b> - 團體<br />&nbsp;<b>l</b> - 連結<br />&nbsp;<b>n</b> - 新的動態<br />&nbsp;<b>p</b> - 相片<br />&nbsp;<b>s</b> or <b>u</b> - 更新狀態<br />&nbsp;<b>t</b> - 筆記<br />&nbsp;<b>v</b> - 影片<br /><br /><i>從個人資料</i>:<br />&nbsp;<b>i</b> - 信息<br />&nbsp;<b>p</b> - 相片<br />&nbsp;<b>w</b> - 牆<br />&nbsp;<b>x</b> - 盒子<br /><br /><i>從網頁的頁碼 (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - 下一個<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - 首先 (當可以使用)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - 最後 (當可以使用)<br /><br /><i>當瀏覽相本/相片:</i><br />&nbsp;<b>a</b> - 讀取所有縮圖 (當可以使用)<br />&nbsp;<b>b</b> - 顯示大張的圖片<br />&nbsp;<b>c</b> - 查看留言<br />&nbsp;<b>k</b> - 返回相本<br />&nbsp;<b>m</b> - 照片 (個人) 和我<br /><br /><i>查看最近上傳/標記的相片:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - 最新的相本<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - 手機上傳<br />&nbsp;<b>o</b> - 我的相片<br />&nbsp;<b>p</b> - 我的相片<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - 標記的朋友',
		'ConfShortcuts' : '啟用鍵盤快捷鍵。',
		'ConfSign' : '在個人資料中顯示該人\的 生日署名 (如果他們提供了生日)。',
		'ConfTopBarFixed' : '即使向下捲動，一樣保持上方選單在螢幕上',
		'ConfTopBarHoverOpacity' : '滑鼠移至上方',
		'ConfTopBarOpacity' : '頂部選單的透明度。',
		'ConfUpdates' : '檢查 Userscripts.org For FFixer 的更新。 或是 <a href="#" id="fbfUpdateLink" onclick="return false;">立即確認</a>.',
		'DownloadVideo' : '下載影片',
		'ExportICalendarFile' : '輸出 iCalendar 檔案',
		'ExportICalendarFileWarning' : '(如果你有很多的朋友的話，將要一段時間)',
		'FacebookFixerConflict' : 'Facebook Fixer現在更名為FFixer。<br /><br />由於更改名稱，你需要手動從瀏覽器中卸載舊的Facebook Fixer腳本，因為兩個腳本會相互衝突。<br /><br />如果你不確定如何去移除腳本， <a %s>點擊說明部份</a>.',
		'fullAlbumLoaded' : '載入所有相本',
		'Import' : '匯入',
		'ImportConfirm' : '您確定要輸入這些設定嗎？當前的設定將會遺失。',
		'ImportFailure' : '在匯入的過程中發生錯誤。',
		'ImportSuccess' : '匯入成功。您要立即刷新頁面？',
		'Left' : '左邊',
		'LoadingAllPhotos' : '載入所有相片...',
		'loadingFullAlbum' : '載入所有相本...',
		'LoadingPic' : '載入照片中...',
		'LoadPhotosWarning' : '載入所有的照片需要較多的時間。',
		'Months' : new Array('一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'),
		'ProtocolSkype' : '呼叫 %s 使用 Skype',
		'ProtocolMSN' : '聊天 %s 使用 MSN',
		'ProtocolYahoo' : '聊天 %s 使用 Yahoo 即時通',
		'ProtocolGoogle' : '聊天 %s 使用 Google Talk',
		'ReloadErrorPage' : '點擊後重試, 或是等待5秒鐘',
		'Refresh' : '刷新',
		'Remove' : '移除',
		'Right' : '右邊',
		'ShowBigPictures' : '顯示大的圖片',
		'Signs' : new Array('摩羯座','水瓶座','雙魚座','白羊座','金牛座','雙子座','巨蟹座','獅子座','處女座','天秤座','天蠍座','射手座'),
		'today' : 'today',
		'UpdateAvailable1' : 'FFixer 有可用的更新。',
		'UpdateAvailable2' : '你要現在更新嗎？',
		'UpdateHomepage' : '到首頁',
		'UpdateInstall' : '馬上安裝',
		'UpdateTomorrow' : '明天提醒我',
		'yearsOld' : '%s 歲'
	},

	// Turkish - Contributed by Gökhan Gurbetoğlu (20100817)
	tr : {
		'_language' : 'Turkish',
		'AddToCalendar' : 'Takvime Ekle',
		'AddToGoogleCalendar' : 'Google Takvim\'e Ekle',
		'all' : 'tümü',
		'All' : 'Tümü',
		'AllPhotosLoaded' : 'Tüm fotoğraflar yüklendi',
		'Automatic' : 'Otomatik',
		'Birthday' : '%s Doğumgünü',
		'BookmarkAdd' : 'Yeni Yer İmi Ekle',
		'BookmarkExists' : 'Bu sayfa için zaten bir yer imi var. \n\nYer imlerine eklemek istediğiniz sayfaya gidin ve tekrar deneyin.',
		'BookmarkNamePrompt' : 'Bu yer imi için bir isim girin:\n%s',
		'BookmarksConfirmRemoval' : 'Bu yer imlerini kaldırmak istediğinize emin misiniz?',
		'BookmarksManage' : 'Yer İmlerini Yönet',
		'BookmarksRemoveSelected' : 'Seçili Yer İmlerini Kaldır',
		'Bookmarks' : 'Yer İmleri',
		'BrowserUnsupported' : 'Tarayıcınız bu özelliği desteklemiyor.',
		'CreatingFile' : 'Dosya Oluşturuluyor',
		'Close' : 'Kapat',
		'ConfigureFacebookFixer' : 'FFixer\'ı Yapılandır',
		'ConfigureInstructions' : 'Bütün değişiklikler hemen kaydedilir ancak bazı değişiklikler halen açık olan sekmelerde etkisini göstermeyebilir.',
		'ConfAge' : 'Kişilerin yaşını profillerinde göster (eğer tam doğum tarihlerini belirtmişlerse).',
		'ConfAlbumComments' : 'Albümde yapılmış tüm yorumları görmek için albüm sayfalarına bir bağlantı ekle.',
		'ConfApplicationWhitelist' : 'Uygulama Beyaz Listesi - Gizlenmesini istemediğiniz uygulamaların ID numaralarını girin. Birden fazla ID için aralara boşluk bırakın.',
		'ConfAutoBigAlbumPictures' : 'Büyük albüm resimlerini sayfa açıldığında otomatik olarak göster.',
		'ConfAutoLoadFullAlbum' : 'Bir albümdeki tüm küçük resimleri otomatik olarak tek sayfada yükle.',
		'ConfAutoLoadTaggedPhotos' : 'Tüm etiketlenmiş fotoğraflar için küçük resimleri otomatik olarak tek sayfada yükle (kişilerin profilindeki fotoğraflar sekmesi)',
		'ConfAutoReadMore' : '"Devamını gör" bağlantılarına otomatik olarak tıkla.',
		'ConfBigAlbumPictures' : 'Albüm sayfalarına bütün resimlerin büyük sürümlerini tek sayfada göstermek için bir bağlantı ekle.',
		'ConfBookmarks' : 'Üst menü çubuğuna bir Yer İmleri alt menüsü ekle.',
		'ConfBottomBarHoverOpacity' : 'Fare üstüne geldiğinde',
		'ConfBottomBarOpacity' : 'Alt menü çubuğu şeffaflığı',
		'ConfCalendarBirthDate' : 'Etkinlik ayrıntıları kişinin doğumgününü içersin.',
		'ConfCalendarFullName' : 'Doğumgünleri için kişinin tam adını kullan (sadece ilk adını kullanmak yerine).',
		'ConfChatDifferentiate' : 'Çevrimiçi ve boştaki arkadaşları ayırt etmek için kalın ve italik yazıtipi kullan.',
		'ConfChatHideIdle' : 'Boştaki arkadaşları gizle.',
		'ConfDelayPopupPics' : 'Açılır pencerede resimleri göstermeden önce kısa bir gecikme zamanı ekle.',
		'ConfDelayPopupPicsTimeout' : 'Açılır pencerede resimleri göstermeden önceki gecikme, milisaniye olarak (varsayılan=500):',
		'ConfDownloadVideo' : 'Video sayfalarındaki videoları indirmek için bir bağlantı ekle. (Bir <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV oynatıcı</a>\'ya ihtiyacınız olabilir)',
		'ConfErrorPageReload' : 'Uygulama hata sayfalarını 5 saniye sonra otomatik olarak yenile.',
		'ConfExport' : 'Ayarlarınızı dışa aktarmak için aşağıdaki metni kopyalayın ve bir dosyaya kaydedin.',
		'ConfExternalPopup' : 'Harici sitelerdeki fotoğrafların büyük sürümünü göster. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'FFixer\'ın Dili',
		'ConfFacebookTimestamps' : 'Facebook\'un zaman etiketlerini göster (örn. "3 saat önce").',
		'ConfFBFTimestamps' : 'Facebook\'un zaman etiketlerinin ardından FFixer zaman etiketlerini ekle (örn. "11:45").',
		'ConfFBFTimestamps24' : 'FFixer zaman etiketlerini 24-saat biçiminde göster',
		'ConfFriendRequestCountInTitle' : 'Sayfa başlığında yeni arkadaşlık isteklerinin sayısını göster.',
		'ConfGoogleApps' : 'Google Apps ile uyumlu Google Takvim bağlantıları oluştur.',
		'ConfGoogleAppsDomain' : 'Etki Alanı',
		'ConfGoogleCalendar' : '<a href="http://tr.wikipedia.org/wiki/Google_Takvim" target="_blank">Google Takvim</a>\'e doğumgünü ve etkinlikler ekleyebilmek için bağlantıları oluştur.',
		'ConfGoogleLanguage' : '<a href="http://tr.wikipedia.org/wiki/Google_%C3%87eviri" target="_blank">Google Çeviri</a> için dil',
		'ConfHideApplicationStories' : 'Uygulama haberlerini gizle.',
		'ConfHideEventStories' : 'Etkinlik haberlerini gizle.',
		'ConfHideFacebookCountInTitle' : 'Facebook\'un yeni mesaj sayısı gösterimini gizle.',
		'ConfHideFriendStories' : 'Arkadaşlık haberlerini gizle.',
		'ConfHideGroupStories' : 'Grup haberlerini gizle.',
		'ConfHideLikeStories' : 'Beğenme haberlerini gizle.',
		'ConfHideLinkStories' : 'Bağlantı haberlerini gizle.',
		'ConfHideNoteStories' : 'Not haberlerini gizle.',
		'ConfHidePhotoStories' : 'Fotoğraf haberlerini gizle.',
		'ConfHideProfilePicStories' : 'Profil resmi haberlerini gizle.',
		'ConfHideRead' : 'Canlı haberlerdeki okundu olarak işaretlenmiş öğeleri gizle.',
		'ConfHideRelationshipStories' : 'İlişki haberlerini gizle.',
		'ConfHideStatusStories' : 'Durum haberlerini gizle.',
		'ConfHideVideoStories' : 'Video haberlerini gizle.',
		'ConfHideWallStories' : 'Duvar hikayelerini gizle.',
		'ConfHomeBeta' : 'Facebook Ön Gösterim bölmesini göster.',
		'ConfHomeChat' : 'Sohbet bölmesini göster.',
		'ConfHomeEvents' : 'Etkinlik bölmesini göster.',
		'ConfHomeFindFriends' : 'Arkadaşlarınla Bağlantı Kur bölmesini göster.',
		'ConfHomeLeftAlign' : 'Ana sayfa içeriğini sola yasla.',
		'ConfHomeLeftColumn' : 'Sol sütunu göster.',
		'ConfHomeLeftColumnFixed' : 'Sayfa aşağı kaydırılsa bile sol sütunu görünür tut.',
		'ConfHomeLink' : 'Üst menü çubuğunda Ana Sayfa bağlantısını göster.',
		'ConfHomeNavigation' : 'Dolaşma bölmesini göster.',
		'ConfHomePokes' : 'Dürtme bölmesini göster.',
		'ConfHomeProfile' : 'Profil bölmesini göster.',
		'ConfHomeRecommendations' : 'Tavsiyeleri göster (Tanıyor Olabileceğin Kişiler, Tavsiye Edilen Sayfalar, vs.).',
		'ConfHomeRequests' : 'İstekler bölmesini göster.',
		'ConfHomeRightColumn' : 'Sağ sütunu göster.',
		'ConfHomeStretch' : 'Ana sayfayı tarayıcının genişliğine sığacak şekilde uzat.',
		'ConfHomeStretchComments' : 'Ana sayfadaki yorumları uzat.',
		'ConfiCalendar' : 'Bütün doğumgünlerini içeren bir <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> dosyası indirmek için bağlantıları ekle.',
		'ConfImport' : 'İleride ayarlarınızı içe aktarmak için, daha önce kaydettiğiniz metni aşağıdaki metnin yerine yapıştırın ve "İçe Aktar"a tıklayın.',
		'ConfInboxCountInTitle' : 'Sayfa başlığında gelen kutusundaki okunmamış mesaj sayısını göster.',
		'ConfLogoutLink' : 'Üst menü çubuğuna bir çıkış bağlantısı ekle.',
		'ConfNotificationCountInTitle' : 'Sayfa başlığında bildirimlerin sayısını göster.',
		'ConfNewTabSearch' : 'CTRL + Enter basarak arama yapıldığında arama sonuçlarını yeni bir sekmede/pencerede aç.',
		'ConfPageTitle' : 'Bütün sayfaların başlığından "Facebook |" yazısını kaldır.',
		'ConfPhotoPopup' : 'Fareyle üstüne gelindiğinde fotoğrafların büyük sürümlerini göster.',
		'ConfPopupAutoClose' : 'Açılan pencere resimlerini otomatik olarak kapat.',
		'ConfPopupSmartAutoClose' : 'Açılan pencere resimlerinin fare üzerindeyken otomatik olarak kapanmasını engelle.',
		'ConfPopupPosition' : 'Açılan pencere resimlerinin konumu',
		'ConfProcessInterval' : 'Sayfayı işlemek için zaman aralığı, milisaniye olarak (varsayılan=1000):',
		'ConfProfileLink' : 'Üst menü çubuğunda Profil bağlantısını göster.',
		'ConfProfilePicPopup' : 'Fareyle üstüne gelindiğinde profil resimlerinin büyük sürümlerini göster',
		'ConfProtocolLinks' : 'Profillerdeki anlık ileti adreslerini anında iletişim kurulabilecek bağlantılara dönüştür (Google Talk, Windows Live, vb.).',
		'ConfSectionAbout' : 'FFixer Hakkında',
		'ConfSectionAdvanced' : 'Gelişmiş',
		'ConfSectionEvents' : 'Doğumgünleri/Etkinlikler',
		'ConfSectionImportExport' : 'İçe/Dışa Aktar',
		'ConfSectionFeeds' : 'Kaynaklar',
		'ConfSectionHomePage' : 'Ana Sayfa',
		'ConfSectionLiveFeed' : 'Canlı Haberler',
		'ConfSectionMenu' : 'Menüler/Sohbet',
		'ConfSectionOther' : 'Diğer Seçenekler',
		'ConfSectionPageTitle' : 'Sayfa Başlığı',
		'ConfSectionPictures' : 'Resimler',
		'ConfSectionShortcuts' : 'Klavye Kısayolları',
		'ConfSecureLinks' : 'Facebook bağlantılarını HTTPS sayfalarını kullanmaya zorla.',
		'ConfShortcutList' : '<b>Klavye Kısayolları</b> (büyük/küçük harf duyarlı):<br /><br /><i>Herhangi bir sayfadan:</i><br /> <b>A</b> - Albümler/fotoğraflar<br /> <b>B</b> - Arkadaş listesini aç/kapa (çevrimiçi arkadaşlar)<br /> <b>C</b> - FFixer yapılandırması<br /> <b>D</b> - Doğumgünleri<br /> <b>E</b> - Etkinlikler<br /> <b>F</b> - Arkadaşlar<br /> <b>H</b> - Ana Sayfa<br /> <b>I</b> - Gelen Kutusu<br /> <b>L</b> - Çıkış bağlantısını seç (çıkış yapmak için bundan sonra Enter\'a basın)<br /> <b>N</b> - Bildirimler<br /> <b>P</b> - Profiliniz<br /> <b>R</b> - İstekler<br /> <b>S</b> - Arama alanına git<br /> <b>T</b> - Seçili metni tercüme et<br /> <b>?</b> - FFixer hata ayıklama bilgisini göster<br /> <b><escape></b> - FFixer tarafından açılmış pencereleri kapat<br /><br /><i>Ana sayfadan (filtreler):</i><br /> <b>a</b> - Sayfalar<br /> <b>f</b> - Canlı Haberler<br /> <b>g</b> - Gruplar<br /> <b>l</b> - Bağlantılar<br /> <b>n</b> - Haber Kaynağı<br /> <b>p</b> - Fotoğraflar<br /> <b>s</b> veya <b>u</b> - Durum güncellemeleri<br /> <b>t</b> - Notlar<br /> <b>v</b> - Videolar<br /><br /><i>Profil sayfalarından:</i><br /> <b>i</b> - Bilgi<br /> <b>p</b> - Fotoğraflar<br /> <b>w</b> - Duvar<br /> <b>x</b> - Kutular<br /><br /><i>Numaralandırılmış sayfalardan (önceki, sonraki, vb.):</i><br /> <b><sol ok></b> - Önceki<br /> <b><sağ ok></b> - Sonraki<br /> <b><shift> + <sol ok></b> - İlk (eğer mevcutsa)<br /> <b><shift> + <sağ ok></b> - Son (eğer mevcutsa)<br /><br /><i>Albümleri/fotoğrafları görüntülerken:</i><br /> <b>a</b> - Tüm küçük resimleri yükle (eğer mevcutsa)<br /> <b>b</b> - Büyük resimleri göster<br /> <b>c</b> - Yorumları göster<br /> <b>k</b> - Albüme geri dön<br /> <b>m</b> - (Kişi) ve benim fotoğraflarım<br /><br /><i>Yakın zamanlardaki albümleri ve yüklenmiş/etiketlenmiş fotoğrafları görüntülerken:</i><br /> <b>a</b> veya  <b>r</b> - Yakın Zamandaki Albümler<br /> <b>m</b> veya  <b>u</b> - Mobil yüklemeler<br /> <b>o</b> - Benim olduğum fotoğraflar<br /> <b>p</b> - Fotoğraflarım<br /> <b>t</b> veya  <b>f</b> - Etiketlenmiş arkadaşlar',
		'ConfShortcuts' : 'Klavye kısayollarını etkinleştir.',
		'ConfSign' : 'Profillerde kişilerin burçlarını göster (eğer doğum tarihlerini belirtmişlerse).',
		'ConfTopBarFixed' : 'Sayfa aşağı kaydırılsa bile üst menü çubuğunu ekranda tut.',
		'ConfTopBarHoverOpacity' : 'Fare üstüne geldiğinde',
		'ConfTopBarOpacity' : 'Üst menü çubuğu şeffaflığı',
		'ConfUpdates' : 'FFixer güncellemeleri için her gün Userscripts.org\'u ziyaret et. Ya da <a href="#" id="fbfUpdateLink" onclick="return false;">şimdi kontrol et</a>.',
		'DownloadVideo' : 'Videoyu İndir',
		'ExportICalendarFile' : 'iCalendar dosyası aktar',
		'ExportICalendarFileWarning' : '(Eğer çok arkadaşınız varsa bu biraz uzun sürebilir)',
		'FacebookFixerConflict' : 'FFixer\'ın yeni adı artık FFixer. İsim değişikliğinden dolayı FFixer\'ı tarayıcınızdan kaldırmanız gerekiyor, yoksa bu iki script birbiriyle uyuşmazlık sorunları çıkaracaktır. Eğer bir userscript\'i nasıl kaldıracağınızdan emin değilseniz <a %s>buraya tıklayarak öğrenebilirsiniz</a>.',
		'fullAlbumLoaded' : 'bütün albüm yüklendi',
		'Import' : 'İçe Aktar',
		'ImportConfirm' : 'Bu ayarları içe aktarmak istediğinize emin misiniz?\nMevcut ayarlarınız silinecek.',
		'ImportFailure' : 'Ayarlarınızı içe aktarmaya çalışırken bir hata oluştu.',
		'ImportSuccess' : 'İçe aktarma tamamlandı. Sayfayı yenilemek ister misiniz?',
		'Left' : 'Sol',
		'LoadingAllPhotos' : 'Tüm fotoğraflar yükleniyor...',
		'loadingFullAlbum' : 'tüm albüm yükleniyor...',
		'LoadingPic' : 'Resim Yükleniyor...',
		'LoadPhotosWarning' : 'Tüm fotoğrafları yüklemek uzun zaman alabilir',
		'Months' : new Array('Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'),
		'ProtocolSkype' : '%s kişisini Skype kullanarak ara',
		'ProtocolMSN' : '%s ile Windows Live kullanarak sohbet et',
		'ProtocolYahoo' : '%s ile Yahoo Messenger kullanarak sohbet et',
		'ProtocolGoogle' : '%s ile Google Talk kullanarak sohbet et',
		'ReloadErrorPage' : 'Yeniden denemek için tıklayın, ya da 5 saniye bekleyin',
		'Refresh' : 'Yenile',
		'Remove' : 'Kaldır',
		'Right' : 'Sağ',
		'ShowBigPictures' : 'Büyük Resimleri Göster',
		'Signs' : new Array('Oğlak','Kova','Balık','Koç','Boğa','İkizler','Yengeç','Aslan','Başak','Terazi','Akrep','Yay'),
		'today' : 'bugün',
		'Translators' : 'Çevirenler',
		'UpdateAvailable1' : 'FFixer için bir güncelleme mevcut',
		'UpdateAvailable2' : 'Şimdi güncellemek ister misiniz?',
		'UpdateHomepage' : 'Ana sayfaya git',
		'UpdateInstall' : 'Şimdi kur',
		'UpdateTomorrow' : 'Yarın hatırlat',
		'ViewAlbumComments' : 'Albüm Yorumlarını Göster',
		'yearsOld' : '%s yaşında'
	},

	// Serbian (Cyrillic) - Contributed by Горштак (20100817)
	sr_rs : {
		'_language' : 'Serbian (Cyrillic)',
		'AddToCalendar' : 'Додај у календар',
		'AddToGoogleCalendar' : 'Додај у Google календар',
		'all' : 'све',
		'All' : 'Све',
		'AllPhotosLoaded' : 'Све фотографије су учитане',
		'Automatic' : 'Аутоматски',
		'Birthday' : 'Рођендан корисника %s',
		'BookmarkAdd' : 'Додај нову забелешку',
		'BookmarkExists' : 'Ова страница је већ додата у забелешке.\n\nИдите на страницу коју желите да додате и покушајте поново.',
		'BookmarkNamePrompt' : 'Унесите назив ове забелешке:\n%s',
 		'BookmarksConfirmRemoval' : 'Да ли сте сигурни да желите да уклоните ове забелешке?',
 		'BookmarksManage' : 'Уреди забелешке',
 		'BookmarksRemoveSelected' : 'Уклони изабране забелешке',
		'Bookmarks' : 'Забелешке',
		'BrowserUnsupported' : 'Ваш претраживач не подржава ову опцију.',
		'CreatingFile' : 'Датотека се израђује',
		'Close' : 'Затвори',
		'ConfigureFacebookFixer' : 'Подеси FFixer',
		'ConfigureInstructions' : 'Све измене се се одмах памте, али понекад је потребно освежити отворене странице да би измене деловале.',
		'ConfAge' : 'Прикажи узраст особе на профилу (уколико је наведен пун датум пођења).',
 		'ConfAlbumComments' : 'Додај везу на страницу албума којом би се приказали сви коментари албума.',
		'ConfApplicationWhitelist' : 'Списак дозвољених апликација - Унесите ознаку апликације како бисте спречили њено сакривање. Раздвојте ознаке размаком.',
		'ConfAutoBigAlbumPictures' : 'Аутоматски прикажи веће фотографије из албума када се страница отвори.',
		'ConfAutoLoadFullAlbum' : 'Аутоматски, на једној страници, учитај сличице свих фотографија из албума.',
		'ConfAutoLoadTaggedPhotos' : 'Аутоматски, на једној страници, учитај сличице свих означених фотографија (на картици "Фотографије" унутар профила).',
		'ConfAutoReadMore' : 'Аутоматски кликни на везу "старије".',
		'ConfBigAlbumPictures' : 'На страници албума додај везу за приказивање већих сличица свих фотографија са те странице.',
		'ConfBookmarks' : 'Додај подмени "Забелешке" на горњу траку са менијима.',
		'ConfBottomBarHoverOpacity' : 'Приликом преласка мишем',
		'ConfBottomBarOpacity' : 'Провидност доње траке са менијима',
		'ConfCalendarBirthDate' : 'Укључи датум рођења корисника у детаљима догађаја.',
		'ConfCalendarFullName' : 'Додај и презиме корисника у наслову рођендана.',
		'ConfChatDifferentiate' : 'Означи доступне пријатеље подебљаним словима а неактивне косим словима.',
		'ConfChatHideIdle' : 'Сакриј неактивне пријатеље.',
		'ConfDelayPopupPics' : 'Укључи кратак застој пре приказивања увећаних слика.',
		'ConfDelayPopupPicsTimeout' : 'Застој пре приказивања увећаних слика, у милисекундама (подразумевано=500):',
		'ConfDownloadVideo' : 'Додај везу за преузимање видео снимка са странице за видео. (Можда ће вам требати <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Аутоматско поновно учитавање странице након 5 секунди, у случају грешке.',
		'ConfExport' : 'Да бисте извезли своја подешавања, копирајте текст који следи и сачувајте га у датотеку.',
		'ConfExternalPopup' : 'Прикажи увећане слике фотографија са спољашњих страница. <sup>бета</sup>',
		'ConfFacebookFixerLanguage' : 'Језик FFixer-а',
		'ConfFacebookTimestamps' : 'Прикажи Фејсбук време (нпр. "пре 3 сата").',
		'ConfFBFTimestamps' : 'Додај FFixer време после Фејсбук времена (нпр. "11:45").',
		'ConfFBFTimestamps24' : 'Прикажи FFixer времена у 24-часовном облику.',
		'ConfFriendRequestCountInTitle' : 'Прикажи број захтева за пријатељство у наслову странице.',
		'ConfGoogleApps' : 'Направи везе за Google календар, погодне за Google ове апликације.',
		'ConfGoogleAppsDomain' : 'Домен',
		'ConfGoogleCalendar' : 'Додај везе за додавање рођендана и догађаја у <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google календар</a>.',
		'ConfGoogleLanguage' : 'Језик за <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google преводилац</a>',
		'ConfHideApplicationStories' : 'Сакриј обавештења о апликацијама.',
		'ConfHideEventStories' : 'Сакриј обавештења о догађајима.',
 		'ConfHideFacebookCountInTitle' : 'Сакриј Фејсбуков број нових примљених порука.',
		'ConfHideFriendStories' : 'Сакриј обавештења о пријатељствима.',
		'ConfHideGroupStories' : 'Сакриј обавештења о групама.',
 		'ConfHideLikeStories' : 'Сакриј обавештења о "допада ми се" ставкама.',
		'ConfHideLinkStories' : 'Сакриј обавештења о везама.',
		'ConfHideNoteStories' : 'Сакриј обавештења о записима.',
		'ConfHidePhotoStories' : 'Сакриј обавештења о фотографијама.',
		'ConfHideProfilePicStories' : 'Сакриј обавештења о сликама на профилу.',
		'ConfHideRead' : 'У најновијим дешавањима сакриј ставке које су означене као прочитане.',
		'ConfHideRelationshipStories' : 'Сакриј обавештења о статусима везе.',
		'ConfHideStatusStories' : 'Сакриј промене статуса.',
		'ConfHideVideoStories' : 'Сакриј обавештења о видео записима.',
		'ConfHideWallStories' : 'Сакриј обавештења са зида.',
 		'ConfHomeBeta' : 'Прикажи одељак са Фејсбуковим најавама.',
		'ConfHomeChat' : 'Прикажи одељак са ћаскањем.',
		'ConfHomeEvents' : 'Прикажи одељак са догађајима.',
		'ConfHomeFindFriends' : 'Прикажи "Повежи се са" одељак.',
		'ConfHomeLeftAlign' : 'Поравнај садржај почетне странице по левој страни.',
		'ConfHomeLeftColumn' : 'Прикажи леву колону.',
		'ConfHomeLeftColumnFixed' : 'Нека лева колона буде видљива и приликом померања странице на доле.',
		'ConfHomeLink' : 'Прикажи везу за Почетну страницу на горњој траци са менијима.',
		'ConfHomeNavigation' : 'Прикажи одељак за навигацију.',
		'ConfHomePokes' : 'Прикажи "Боцкање" одељак.',
		'ConfHomeProfile' : 'Прикажи "Профил" одељк.',
 		'ConfHomeRecommendations' : 'Прикажи препоруке (Особе које можда познајеш, Препоручене странице итд.).',
		'ConfHomeRequests' : 'Прикажи "Захтеви" одељак.',
		'ConfHomeRightColumn' : 'Прикажи десну колону.',
		'ConfHomeStretch' : 'Рашири почетну страницу на пуну ширину прозора претраживача.',
 		'ConfHomeStretchComments' : 'Рашири коментаре на почетној страници.',
		'ConfiCalendar' : 'Додај везе за преузимање <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> датотеке са свим рођенданима.',
		'ConfImport' : 'Да бисе касније увезли своја подешавања, замените текст који следи са текстом који сте претходно сачували и кликните "Увоз".',
		'ConfInboxCountInTitle' : 'Прикажи број нових порука у наслову странице.',
		'ConfLogoutLink' : 'Додај везу за одјављивање на горњу траку са менијима.',
		'ConfNotificationCountInTitle' : 'Прикажи број нових обавештења у наслову странице.',
		'ConfNewTabSearch' : 'Када притиснем CTRL + Enter за претрагу, отвори резултате претраге у новој картици/прозору.',
		'ConfPageTitle' : 'Уклони "Facebook |" из наслова свих страница.',
		'ConfPhotoPopup' : 'Прикажи веће верзије фотографија приликом преласка мишем.',
		'ConfPopupAutoClose' : 'Аутоматски затвори увећане слике.',
		'ConfPopupSmartAutoClose' : 'Не затварај увећане слике ако је показивач миша на њима.',
		'ConfPopupPosition' : 'Положај увећаних слика',
		'ConfProcessInterval' : 'Интервал за обраду странице, у милисекундама (подразумевано=1000):',
		'ConfProfileLink' : 'Прикажи везу за Профил на горњу траку са менијима.',
		'ConfProfilePicPopup' : 'Прикажи веће верзије слика на профилу приликом преласка мишем',
		'ConfProtocolLinks' : 'Претвори надимке програма за комуникацију (Google Talk, Windows Live и др.) са профила у везе којима ће се започети ћаскање.',
		'ConfSectionAbout' : 'О додатку FFixer',
		'ConfSectionAdvanced' : 'Више опција',
		'ConfSectionEvents' : 'Рођендани/догађаји',
		'ConfSectionImportExport' : 'Увоз/Извоз',
		'ConfSectionFeeds' : 'Новости',
		'ConfSectionHomePage' : 'Почетна страница',
		'ConfSectionLiveFeed' : 'Најновије',
		'ConfSectionMenu' : 'Менији/ћаскање',
		'ConfSectionOther' : 'Остале опције',
		'ConfSectionPageTitle' : 'Наслов странице',
		'ConfSectionPictures' : 'Слике',
		'ConfSectionShortcuts' : 'Пречице са тастатуре',
		'ConfSecureLinks' : 'Присили усмеравање Фејсбук веза на HTTPS странице.',
		'ConfShortcutList' : '<b>Пречице са тастатуре</b> (разликују се мала и велика слова):<br /><br /><i>Са било које странице:</i><br /> <b>A</b> - Албуми/фотографије<br /> <b>B</b> - Списак доступних пријатеља<br /> <b>C</b> - FFixer подешавања<br /> <b>D</b> - Рођендани<br /> <b>E</b> - Догађаји<br /> <b>F</b> - Пријатељи<br /> <b>H</b> - Почетна страница<br /> <b>I</b> - Примљене поруке<br /> <b>K</b> - додај забелешку<br /> <b>L</b> - Означи везу за одјаву (притисните Ентер након тога за одјављивање)<br /> <b>N</b> - Обавештења<br /> <b>P</b> - Профил<br /> <b>R</b> - Захтеви<br /> <b>S</b> - Прелазак на поље за претрагу<br /> <b>T</b> - Преведи одабрани текст<br /> <b>?</b> - Прикажи извештај о грешци FFixer-а<br /> <b><escape></b> - Затвори искачуће прозоре које је направио FFixer<br /><br /><i>Са почетне странице (филтери)</i>:<br /> <b>a</b> - Странице<br /> <b>f</b> - Најновије<br /> <b>g</b> - Групе<br /> <b>l</b> - Везе<br /> <b>n</b> - Новости<br /> <b>p</b> - Фотографије<br /> <b>s</b> или <b>u</b> - Промене статуса<br /> <b>t</b> - Белешке<br /> <b>v</b> - Видео<br /><br /><i>Са профила</i>:<br /> <b>i</b> - Информације<br /> <b>p</b> - Фотографије<br /> <b>w</b> - Зид<br /> <b>x</b> - Оквири<br /><br /><i>Са страница са набрајањем (претходна, следћа, итд.)</i><br /> <b><стрелица лево></b> - Претходна<br /> <b><стрелица десно></b> - Следећа<br /> <b><шифт> + <стрелица лево></b> - Прва (ако је доступно)<br /> <b><шифт> + <стрелица десно></b> - Последња (ако је доступно)<br /><br /><i>Приликом прегледавања албума/фотографија:</i><br /> <b>a</b> - Учитај све сличице (ако је доступно)<br /> <b>b</b> - Прикажи велике слике<br /> <b>c</b> - Прикажи коментаре<br /> <b>k</b> - Назад на албум<br /> <b>m</b> - Фотографије са (корисником) и са мном<br /><br /><i>При прегледавању скорашњих албума и постављених/означених фотографија:</i><br /> <b>a</b> или  <b>r</b> - Скорашњи албуми<br /> <b>m</b> или  <b>u</b> - Постављено преко мобилног телефона<br /> <b>o</b> - Фотографије на којима сам ја<br /> <b>p</b> - Моје фотографије<br /> <b>t</b> или  <b>f</b> - Означени пријатељи',
		'ConfShortcuts' : 'Омогући пречице са тастатуре.',
		'ConfSign' : 'Прикажи корисников хороскопски знак на његовом профилу (уколико је наведен пун датум рођења).',
		'ConfTopBarFixed' : 'Задржи горњу траку са менијима на екрану и приликом померања странице на доле.',
		'ConfTopBarHoverOpacity' : 'Приликом преласка мишем',
		'ConfTopBarOpacity' : 'Провидност Горње траке са менијима',
		'ConfUpdates' : 'Свакодневно проверавај Userscripts.org за надоградње FFixer-а. Или <a href="#" id="fbfUpdateLink" onclick="return false;">провери сада</a>.',
		'DownloadVideo' : 'Преузми видео',
		'ExportICalendarFile' : 'Извези iCalendar датотеку',
		'ExportICalendarFileWarning' : '(Ово може да потраје ако имате много пријатеља)',
		'FacebookFixerConflict' : 'FFixer се сада зове FFixer. Због промене имена мораћете ручно да уклоните FFixer из свог прегледача да не би дошло до ометања између ове две скрипте. Ако нисте сигурни како да уклоните скрипту, <a %s>кликните овде за упутство</a>.',
		'fullAlbumLoaded' : 'цео албум је учитан',
		'Import' : 'Увоз',
		'ImportConfirm' : 'Да ли сте сигурни да желите да увезете ова подешавања?\nВаша тренутна подешавања ће бити поништена.',
		'ImportFailure' : 'Дошло је до грешке приликом увоза ваших подешавања.',
		'ImportSuccess' : 'Увоз је завршен. Да ли желите да освежите страницу?',
		'Left' : 'Лево',
		'LoadingAllPhotos' : 'Учитавање свих фотографија...',
		'loadingFullAlbum' : 'учитавање свих албума...',
		'LoadingPic' : 'Учитавање слике...',
		'LoadPhotosWarning' : 'Учитавање свих фотографија може да потраје неко време',
		'Months' : new Array('Јануар','Фебруар','Март','Април','Мај','Јун','Јул','Август','Септембар','Октобар','Новембар','Децембар'),
		'ProtocolSkype' : 'Позови корисника %s путем програма Skype',
		'ProtocolMSN' : 'Ћаскај са корисником %s путем програма Windows Live',
		'ProtocolYahoo' : 'Ћаскај са корисником %s путем програма Yahoo Messenger',
		'ProtocolGoogle' : 'Ћаскај са корисником %s путем програма Google Talk',
		'ReloadErrorPage' : 'Кликните да покушате поново, или сачекајте 5 секунди',
		'Refresh' : 'Освежи',
		'Remove' : 'Уклони',
		'Right' : 'Десно',
		'ShowBigPictures' : 'Прикажи велике слике',
		'Signs' : new Array('Јарац','Водолија','Рибе','Ован','Бик','Близанци','Рак','Лав','Девица','Вага','Шкорпија','Стрелац'),
		'today' : 'данас',
		'Translators' : 'Преводиоци',
		'UpdateAvailable1' : 'Доступне су надоградње за FFixer',
		'UpdateAvailable2' : 'Желите ли сада да надоградите?',
		'UpdateHomepage' : 'Иди на почетну страницу',
		'UpdateInstall' : 'Инсталирај одмах',
		'UpdateTomorrow' : 'Подсети ме сутра',
 		'ViewAlbumComments' : 'Прикажи коментаре албума',
		'yearsOld' : '%s година'
	},

	// Serbian (Latin) - Contributed by Gorštak (20100817)
	sr : {
		'_language' : 'Serbian (Latin)',
		'AddToCalendar' : 'Dodaj u kalendar',
		'AddToGoogleCalendar' : 'Dodaj u Google kalendar',
		'all' : 'sve',
		'All' : 'Sve',
		'AllPhotosLoaded' : 'Sve fotografije su učitane',
		'Automatic' : 'Automatski',
		'Birthday' : 'Rođendan korisnika %s',
		'BookmarkAdd' : 'Dodaj novu zabelešku',
		'BookmarkExists' : 'Ova stranica je već dodata u zabeleške.\n\nIdite na stranicu koju želite da dodate i pokušajte ponovo.',
		'BookmarkNamePrompt' : 'Unesite naziv ove zabeleške:\n%s',
 		'BookmarksConfirmRemoval' : 'Da li ste sigurni da želite da uklonite ove zabeleške?',
 		'BookmarksManage' : 'Uredi zabeleške',
 		'BookmarksRemoveSelected' : 'Ukloni izabrane zabeleške',
		'Bookmarks' : 'Zabeleške',
		'BrowserUnsupported' : 'Vaš pretraživač ne podržava ovu opciju.',
		'CreatingFile' : 'Datoteka se izrađuje',
		'Close' : 'Zatvori',
		'ConfigureFacebookFixer' : 'Podesi FFixer',
		'ConfigureInstructions' : 'Sve izmene se se odmah pamte, ali ponekad je potrebno osvežiti otvorene stranice da bi izmene delovale.',
		'ConfAge' : 'Prikaži uzrast osobe na profilu (ukoliko je naveden pun datum pođenja).',
 		'ConfAlbumComments' : 'Dodaj vezu na stranici albuma kojom bi se prikazali svi komentari albuma.',
		'ConfApplicationWhitelist' : 'Spisak dozvoljenih aplikacija - Unesite oznaku aplikacije kako biste sprečili njeno sakrivanje. Razdvojte oznake razmakom.',
		'ConfAutoBigAlbumPictures' : 'Automatski prikaži veće fotografije iz albuma kada se stranica otvori.',
		'ConfAutoLoadFullAlbum' : 'Automatski, na jednoj stranici, učitaj sličice svih fotografija iz albuma.',
		'ConfAutoLoadTaggedPhotos' : 'Automatski, na jednoj stranici, učitaj sličice svih označenih fotografija (na kartici "Fotografije" unutar profila).',
		'ConfAutoReadMore' : 'Automatski klikni na vezu "starije".',
		'ConfBigAlbumPictures' : 'Na stranici albuma dodaj vezu za prikazivanje većih sličica svih fotografija sa te stranice.',
		'ConfBookmarks' : 'Dodaj podmeni "Zabeleške" na gornju traku sa menijima.',
		'ConfBottomBarHoverOpacity' : 'Prilikom prelaska mišem',
		'ConfBottomBarOpacity' : 'Providnost donje trake sa menijima',
		'ConfCalendarBirthDate' : 'Uključi datum rođenja korisnika u detaljima događaja.',
		'ConfCalendarFullName' : 'Dodaj i prezime korisnika u naslovu rođendana.',
		'ConfChatDifferentiate' : 'Označi dostupne prijatelje podebljanim slovima a neaktivne kosim slovima.',
		'ConfChatHideIdle' : 'Sakrij neaktivne prijatelje.',
		'ConfDelayPopupPics' : 'Uključi kratak zastoj pre prikazivanja uvećanih slika.',
		'ConfDelayPopupPicsTimeout' : 'Zastoj pre prikazivanja uvećanih slika, u milisekundama (podrazumevano=500):',
		'ConfDownloadVideo' : 'Dodaj vezu za preuzimanje video snimka sa stranice za video. (Možda će vam trebati <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Automatsko ponovno učitavanje stranice nakon 5 sekundi, u slučaju greške.',
		'ConfExport' : 'Da biste izvezli svoja podešavanja, kopirajte tekst koji sledi i sačuvajte ga u datoteku.',
		'ConfExternalPopup' : 'Prikaži uvećane slike fotografija sa spoljašnjih stranica. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jezik FFixer-a',
		'ConfFacebookTimestamps' : 'Prikaži Fejsbuk vreme (npr. "pre 3 sata").',
		'ConfFBFTimestamps' : 'Dodaj FFixer vreme posle Fejsbuk vremena (npr. "11:45").',
		'ConfFBFTimestamps24' : 'Prikaži FFixer vremena u 24-časovnom obliku.',
		'ConfFriendRequestCountInTitle' : 'Prikaži broj zahteva za prijateljstvo u naslovu stranice.',
		'ConfGoogleApps' : 'Napravi veze za Google kalendar, pogodne za Google ove aplikacije.',
		'ConfGoogleAppsDomain' : 'Domen',
		'ConfGoogleCalendar' : 'Dodaj veze za dodavanje rođendana i događaja u <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google kalendar</a>.',
		'ConfGoogleLanguage' : 'Jezik za <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google prevodilac</a>',
		'ConfHideApplicationStories' : 'Sakrij obaveštenja o aplikacijama.',
		'ConfHideEventStories' : 'Sakrij obaveštenja o događajima.',
 		'ConfHideFacebookCountInTitle' : 'Sakrij Fejsbukov broj novih primljenih poruka.',
		'ConfHideFriendStories' : 'Sakrij obaveštenja o prijateljstvima.',
		'ConfHideGroupStories' : 'Sakrij obaveštenja o grupama.',
 		'ConfHideLikeStories' : 'Sakrij obaveštenja o "dopada mi se" stavkama.',
		'ConfHideLinkStories' : 'Sakrij obaveštenja o vezama.',
		'ConfHideNoteStories' : 'Sakrij obaveštenja o zapisima.',
		'ConfHidePhotoStories' : 'Sakrij obaveštenja o fotografijama.',
		'ConfHideProfilePicStories' : 'Sakrij obaveštenja o slikama na profilu.',
		'ConfHideRead' : 'U najnovijim dešavanjima sakrij stavke koje su označene kao pročitane.',
		'ConfHideRelationshipStories' : 'Sakrij obaveštenja o statusima veze.',
		'ConfHideStatusStories' : 'Sakrij promene statusa.',
		'ConfHideVideoStories' : 'Sakrij obaveštenja o video zapisima.',
		'ConfHideWallStories' : 'Sakrij obaveštenja sa zida.',
 		'ConfHomeBeta' : 'Prikaži odeljak sa Fejsbukovim najavama.',
		'ConfHomeChat' : 'Prikaži odeljak sa ćaskanjem.',
		'ConfHomeEvents' : 'Prikaži odeljak sa događajima.',
		'ConfHomeFindFriends' : 'Prikaži "Poveži se sa" odeljak.',
		'ConfHomeLeftAlign' : 'Poravnaj sadržaj početne stranice po levoj strani.',
		'ConfHomeLeftColumn' : 'Prikaži levu kolonu.',
		'ConfHomeLeftColumnFixed' : 'Neka leva kolona bude vidljiva i prilikom pomeranja stranice na dole.',
		'ConfHomeLink' : 'Prikaži vezu za Početnu stranicu na gornjoj traci sa menijima.',
		'ConfHomeNavigation' : 'Prikaži odeljak za navigaciju.',
		'ConfHomePokes' : 'Prikaži "Bockanje" odeljak.',
		'ConfHomeProfile' : 'Prikaži "Profil" odeljk.',
 		'ConfHomeRecommendations' : 'Prikaži preporuke (Osobe koje možda poznaješ, Preporučene stranice itd.).',
		'ConfHomeRequests' : 'Prikaži "Zahtevi" odeljak.',
		'ConfHomeRightColumn' : 'Prikaži desnu kolonu.',
		'ConfHomeStretch' : 'Raširi početnu stranicu na punu širinu prozora pretraživača.',
 		'ConfHomeStretchComments' : 'Raširi komentare na početnoj stranici.',
		'ConfiCalendar' : 'Dodaj veze za preuzimanje <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> datoteke sa svim rođendanima.',
		'ConfImport' : 'Da bise kasnije uvezli svoja podešavanja, zamenite tekst koji sledi sa tekstom koji ste prethodno sačuvali i kliknite "Uvoz".',
		'ConfInboxCountInTitle' : 'Prikaži broj novih poruka u naslovu stranice.',
		'ConfLogoutLink' : 'Dodaj vezu za odjavljivanje na gornju traku sa menijima.',
		'ConfNotificationCountInTitle' : 'Prikaži broj novih obaveštenja u naslovu stranice.',
		'ConfNewTabSearch' : 'Kada pritisnem CTRL + Enter za pretragu, otvori rezultate pretrage u novoj kartici/prozoru.',
		'ConfPageTitle' : 'Ukloni "Facebook |" iz naslova svih stranica.',
		'ConfPhotoPopup' : 'Prikaži veće verzije fotografija prilikom prelaska mišem.',
		'ConfPopupAutoClose' : 'Automatski zatvori uvećane slike.',
		'ConfPopupSmartAutoClose' : 'Ne zatvaraj uvećane slike ako je pokazivač miša na njima.',
		'ConfPopupPosition' : 'Položaj uvećanih slika',
		'ConfProcessInterval' : 'Interval za obradu stranice, u milisekundama (podrazumevano=1000):',
		'ConfProfileLink' : 'Prikaži vezu za Profil na gornju traku sa menijima.',
		'ConfProfilePicPopup' : 'Prikaži veće verzije slika na profilu prilikom prelaska mišem',
		'ConfProtocolLinks' : 'Pretvori nadimke programa za komunikaciju (Google Talk, Windows Live i dr.) sa profila u veze kojima će se započeti ćaskanje.',
		'ConfSectionAbout' : 'O dodatku FFixer',
		'ConfSectionAdvanced' : 'Više opcija',
		'ConfSectionEvents' : 'Rođendani/događaji',
		'ConfSectionImportExport' : 'Uvoz/Izvoz',
		'ConfSectionFeeds' : 'Novosti',
		'ConfSectionHomePage' : 'Početna stranica',
		'ConfSectionLiveFeed' : 'Najnovije',
		'ConfSectionMenu' : 'Meniji/ćaskanje',
		'ConfSectionOther' : 'Ostale opcije',
		'ConfSectionPageTitle' : 'Naslov stranice',
		'ConfSectionPictures' : 'Slike',
		'ConfSectionShortcuts' : 'Prečice sa tastature',
		'ConfSecureLinks' : 'Prisili usmeravanje Fejsbuk veza na HTTPS stranice.',
		'ConfShortcutList' : '<b>Prečice sa tastature</b> (razlikuju se mala i velika slova):<br /><br /><i>Sa bilo koje stranice:</i><br /> <b>A</b> - Albumi/fotografije<br /> <b>B</b> - Spisak dostupnih prijatelja<br /> <b>C</b> - FFixer podešavanja<br /> <b>D</b> - Rođendani<br /> <b>E</b> - Događaji<br /> <b>F</b> - Prijatelji<br /> <b>H</b> - Početna stranica<br /> <b>I</b> - Primljene poruke<br /> <b>K</b> - dodaj zabelešku<br /> <b>L</b> - Označi vezu za odjavu (pritisnite Enter nakon toga za odjavljivanje)<br /> <b>N</b> - Obaveštenja<br /> <b>P</b> - Profil<br /> <b>R</b> - Zahtevi<br /> <b>S</b> - Prelazak na polje za pretragu<br /> <b>T</b> - Prevedi odabrani tekst<br /> <b>?</b> - Prikaži izveštaj o grešci FFixer-a<br /> <b><escape></b> - Zatvori iskačuće prozore koje je napravio FFixer<br /><br /><i>Sa početne stranice (filteri)</i>:<br /> <b>a</b> - Stranice<br /> <b>f</b> - Najnovije<br /> <b>g</b> - Grupe<br /> <b>l</b> - Veze<br /> <b>n</b> - Novosti<br /> <b>p</b> - Fotografije<br /> <b>s</b> ili <b>u</b> - Promene statusa<br /> <b>t</b> - Beleške<br /> <b>v</b> - Video<br /><br /><i>Sa profila</i>:<br /> <b>i</b> - Informacije<br /> <b>p</b> - Fotografije<br /> <b>w</b> - Zid<br /> <b>x</b> - Okviri<br /><br /><i>Sa stranica sa nabrajanjem (prethodna, sledća, itd.)</i><br /> <b><strelica levo></b> - Prethodna<br /> <b><strelica desno></b> - Sledeća<br /> <b><šift> + <strelica levo></b> - Prva (ako je dostupno)<br /> <b><šift> + <strelica desno></b> - Poslednja (ako je dostupno)<br /><br /><i>Prilikom pregledavanja albuma/fotografija:</i><br /> <b>a</b> - Učitaj sve sličice (ako je dostupno)<br /> <b>b</b> - Prikaži velike slike<br /> <b>c</b> - Prikaži komentare<br /> <b>k</b> - Nazad na album<br /> <b>m</b> - Fotografije sa (korisnikom) i sa mnom<br /><br /><i>Pri pregledavanju skorašnjih albuma i postavljenih/označenih fotografija:</i><br /> <b>a</b> ili  <b>r</b> - Skorašnji albumi<br /> <b>m</b> ili  <b>u</b> - Postavljeno preko mobilnog telefona<br /> <b>o</b> - Fotografije na kojima sam ja<br /> <b>p</b> - Moje fotografije<br /> <b>t</b> ili  <b>f</b> - Označeni prijatelji',
		'ConfShortcuts' : 'Omogući prečice sa tastature.',
		'ConfSign' : 'Prikaži korisnikov horoskopski znak na njegovom profilu (ukoliko je naveden pun datum rođenja).',
		'ConfTopBarFixed' : 'Zadrži gornju traku sa menijima na ekranu i prilikom pomeranja stranice na dole.',
		'ConfTopBarHoverOpacity' : 'Prilikom prelaska mišem',
		'ConfTopBarOpacity' : 'Providnost Gornje trake sa menijima',
		'ConfUpdates' : 'Svakodnevno proveravaj Userscripts.org za nadogradnje FFixer-a. Ili <a href="#" id="fbfUpdateLink" onclick="return false;">proveri sada</a>.',
		'DownloadVideo' : 'Preuzmi video',
		'ExportICalendarFile' : 'Izvezi iCalendar datoteku',
		'ExportICalendarFileWarning' : '(Ovo može da potraje ako imate mnogo prijatelja)',
		'FacebookFixerConflict' : 'FFixer se sada zove FFixer. Zbog promene imena moraćete ručno da uklonite FFixer iz svog pregledača da ne bi došlo do ometanja između ove dve skripte. Ako niste sigurni kako da uklonite skriptu, <a %s>kliknite ovde za uputstvo</a>.',
		'fullAlbumLoaded' : 'ceo album je učitan',
		'Import' : 'Uvoz',
		'ImportConfirm' : 'Da li ste sigurni da želite da uvezete ova podešavanja?\nVaša trenutna podešavanja će biti poništena.',
		'ImportFailure' : 'Došlo je do greške prilikom uvoza vaših podešavanja.',
		'ImportSuccess' : 'Uvoz je završen. Da li želite da osvežite stranicu?',
		'Left' : 'Levo',
		'LoadingAllPhotos' : 'Učitavanje svih fotografija...',
		'loadingFullAlbum' : 'učitavanje svih albuma...',
		'LoadingPic' : 'Učitavanje slike...',
		'LoadPhotosWarning' : 'Učitavanje svih fotografija može da potraje neko vreme',
		'Months' : new Array('Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'),
		'ProtocolSkype' : 'Pozovi korisnika %s putem programa Skype',
		'ProtocolMSN' : 'Ćaskaj sa korisnikom %s putem programa Windows Live',
		'ProtocolYahoo' : 'Ćaskaj sa korisnikom %s putem programa Yahoo Messenger',
		'ProtocolGoogle' : 'Ćaskaj sa korisnikom %s putem programa Google Talk',
		'ReloadErrorPage' : 'Kliknite da pokušate ponovo, ili sačekajte 5 sekundi',
		'Refresh' : 'Osveži',
		'Remove' : 'Ukloni',
		'Right' : 'Desno',
		'ShowBigPictures' : 'Prikaži velike slike',
		'Signs' : new Array('Jarac','Vodolija','Ribe','Ovan','Bik','Blizanci','Rak','Lav','Devica','Vaga','Škorpija','Strelac'),
		'today' : 'danas',
		'Translators' : 'Prevodioci',
		'UpdateAvailable1' : 'Dostupne su nadogradnje za FFixer',
		'UpdateAvailable2' : 'Želite li sada da nadogradite?',
		'UpdateHomepage' : 'Idi na početnu stranicu',
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
		'ConfigureFacebookFixer' : 'Konfigurér FFixer',
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
		'ConfFacebookFixerLanguage' : 'Sprog i FFixer',
		'ConfFacebookTimestamps' : 'Vis Facebook tidsstempler (f.eks. "3 timer sider").',
		'ConfFBFTimestamps' : 'Tilføj FFixer tidsstempler efter Facebook tidsstempler (f.eks. "11:45").',
		'ConfFBFTimestamps24' : 'Vis FFixer tidsstempler i 24 timers format.',
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
		'ConfSectionAbout' : 'Omkring FFixer',
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
		'ConfShortcutList' : '<b>Tastatur genveje</b> (forskel på store og små bogstaver):<br /><br /><i>Fra enhver side:</i><br />&nbsp;<b>A</b> - Album/billeder<br />&nbsp;<b>B</b> - Skift venne liste (online venner)<br />&nbsp;<b>C</b> - FFixer konfiguration<br />&nbsp;<b>D</b> - Fødselsdage<br />&nbsp;<b>E</b> - Begivenheder<br />&nbsp;<b>F</b> - Venner<br />&nbsp;<b>H</b> - Forside<br />&nbsp;<b>I</b> - Indbakke<br />&nbsp;<b>K</b> - Tilføj bogmærke<br />&nbsp;<b>L</b> - Vælg Log ud linket (tryk Enter efterfølgende for at logge ud)<br />&nbsp;<b>N</b> - Notifikationer<br />&nbsp;<b>P</b> - Din profil<br />&nbsp;<b>R</b> - Anmodninger<br />&nbsp;<b>S</b> - Hop til søgefeltet<br />&nbsp;<b>T</b> - Oversæt valgte tekst<br />&nbsp;<b>?</b> - Vis FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Luk popops fra FFixer<br /><br /><i>Fra forsiden (filtre)</i>:<br />&nbsp;<b>a</b> - Sider<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Grupper<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - Nyheder<br />&nbsp;<b>p</b> - Billeder<br />&nbsp;<b>s</b> eller <b>u</b> - Status opdateringer<br />&nbsp;<b>t</b> - Noter<br />&nbsp;<b>v</b> - Videoer<br /><br /><i>Fra profiler</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Billeder<br />&nbsp;<b>w</b> - Væg<br />&nbsp;<b>x</b> - Bokse<br /><br /><i>Fra sider med bladrefunktion (frem, tilbage o.s.v.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Forrige<br />&nbsp;<b>&lt;right arrow&gt;</b> - Næste<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - Første (når muligt)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Sidste (når muligt)<br /><br /><i>Under visning af album/billeder:</i><br />&nbsp;<b>a</b> - Hent alle miniaturer (når muligt)<br />&nbsp;<b>b</b> - Vis store billeder<br />&nbsp;<b>c</b> - Se kommentarer<br />&nbsp;<b>k</b> - Tilbage til album<br />&nbsp;<b>m</b> - Billeder af (person) og mig<br /><br /><i>Under visning af nyeste album og uploadede/taggede billeder:</i><br />&nbsp;<b>a</b> eller <b>r</b> - Nyeste Album<br />&nbsp;<b>m</b> eller <b>u</b> - Telefon uploads<br />&nbsp;<b>o</b> - Billeder af mig<br />&nbsp;<b>p</b> - Mine billeder<br />&nbsp;<b>t</b> eller <b>f</b> - Tagged venner',
		'ConfShortcuts' : 'Slå tastaturgenveje til.',
		'ConfSign' : 'Vis folks stjernetegn på deres profil (hvis de har oplyst en fødsesdato).',
		'ConfTopBarFixed' : 'Hold topmenuen synlig på siden, selv efter der er scrollet ned.',
		'ConfTopBarHoverOpacity' : 'Når musen er over',
		'ConfTopBarOpacity' : 'Gennemsigtighed af topmenu linien',
		'ConfUpdates' : 'Undersøg Userscripts.org dagligt for opdateringer til FFixer. Eller <a href="#" id="fbfUpdateLink" onclick="return false;">undersøg nu</a>.',
		'DownloadVideo' : 'Hent video',
		'ExportICalendarFile' : 'Eksportér iCalendar fil',
		'ExportICalendarFileWarning' : '(Dette vil tage lang tid, hvis du har mange venner)',
		'FacebookFixerConflict' : 'FFixer vil fremover hedde FFixer. På grund af navneskiftet, skal du manuelt afinstallere FFixer fra dine browsere, da de to scripts ellers vil komme i konflikt med hinanden. Hvis du er usikker på hvordan man afinstallerer et Userscript, så <a %s>tryk her for instruktioner</a>.',
		'fullAlbumLoaded' : 'Hele albummet hentet',
		'Left' : 'Venstre',
		'ListeningRestarted' : 'FFixer lytter efter ændringer igen.',
		'ListeningStopped' : 'FFixer er stoppet med at lytte efter ændringer.\nTryk L (SHIFT + l) for at starte igen',
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
		'UpdateAvailable1' : 'En opdatering er tilgængelig til FFixer',
		'UpdateAvailable2' : 'Vil du opdatere nu?',
		'UpdateHomepage' : 'Gå til hjemmesiden',
		'UpdateInstall' : 'Installér nu',
		'UpdateTomorrow' : 'Påmind mig i morgen',
		'yearsOld' : '%s år gammel'
	},

	// Czech - Contributed by Caken (20100823)
	cs : {
		'_language' : 'Czech',
		'AddToCalendar' : 'Přidat do kalendáře',
		'AddToGoogleCalendar' : 'Přidat do Google kalendáře',
		'all' : 'vše',
		'All' : 'Vše',
		'AllPhotosLoaded' : 'Všechny fotografie načtené',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narozeniny %s',
		'BookmarkAdd' : 'Přidej záložku',
		'BookmarkExists' : 'Tato stránka už je v záložkách.',
		'BookmarkNamePrompt' : 'Vložte jméno této záložky:\n%s',
		'BookmarksConfirmRemoval' : 'Jste si jistí, že chcete odstranit tuto záložku?',
		'BookmarksManage' : 'Spravuj záložky',
		'BookmarksRemoveSelected' : 'Odstraň vybrané záložky',
		'Bookmarks' : 'Záložky',
		'BrowserUnsupported' : 'Váš prohlížeč nepodporuje tento program.',
		'CreatingFile' : 'Vytvoření souboru',
		'Close' : 'Zavřít',
		'ConfigureFacebookFixer' : 'Nastavení - FFixer',
		'ConfigureInstructions' : 'Všechny změny jsou ukládány okamžitě, ale některé se nemusí projevit na již otevřených kartách.',
		'ConfAge' : 'Zobrazit věk lidí v jejich profilech (pokud poskytli celý datum narození)',
		'ConfAlbumComments' : 'Přidá odkaz na stránku alba a ukáže všechny komentáře k danému albu.',
		'ConfApplicationWhitelist' : 'Seznam povolených aplikací - Vložte ID aplikace, kterou chcete chránit před skrytím. ID oddělujte mezerami.',
		'ConfAutoBigAlbumPictures' : 'Automaticky při otevření stránky zobrazit větší obrázky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky načítat miniatury všech obrázků v albumu na jedné stránce',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky načítat miniatury všech fotograficí s popisem na jedné stránce (karta Fotky v profilech lidí)',
		'ConfAutoReadMore' : 'Automaticky kliknout na odkazy &quot;číst dále&quot;',
		'ConfBigAlbumPictures' : 'Přidat odkaz na stránkách albumu na zobrazení větších verzí všech obrázků na této straně',
		'ConfBookmarks' : 'Přijde menu záložek do vrchní nabídky.',
		'ConfBottomBarHoverOpacity' : 'Při najetí myší',
		'ConfBottomBarOpacity' : 'Průhlednost spodního panelu s nabídkou',
		'ConfCalendarBirthDate' : 'Zahrnout narozeniny osoby do podrobnosti událostí',
		'ConfCalendarFullName' : 'Použít jméno celé jméno osoby jako název narozenin (namístno křestního jména)',
		'ConfChatDifferentiate' : 'Použít tučné písmo a kurzívu na rozlišení připojených a nečinných přátel',
		'ConfChatHideIdle' : 'Skrýt nečinné přátele',
		'ConfDelayPopupPics' : 'Vyčkat 0,5 sekundy před načtením obrázku v kontextovém okně',
		'ConfDelayPopupPicsTimeout' : 'Zpoždění před zobrazením obrázku v kontextovém okně v milisekundách (defaultně=500):',
		'ConfDownloadVideo' : 'Přidat odkaz na převzetí videí ze stránek s videem (možná potřeba <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV přehrávač</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundách znova načíst chybové stránky aplikácí',
		'ConfExport' : 'Pro exportování vašeho nastavení, zkopírujte následující text a uložte ho do souboru.',
		'ConfExternalPopup' : 'Externí obrázky plné velikosti v kontextovém okně <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jazyk pro FFixer',
		'ConfFacebookTimestamps' : 'Zobrazit časové značky Facebooku (t. j. "před 3 hodinami")',
		'ConfFBFTimestamps' : 'Přidat časové značky skriptu FFixer za časové značky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'Zobrazit časové značny skriptu FFixer v 24-hodinovém formátě',
		'ConfFriendRequestCountInTitle' : 'Zobraz počet nových žádostí o přátelství v titulku stránky.',
		'ConfGoogleApps' : 'Vytvořit odkazy pro Google Calendar kompatibilní s Google Apps',
		'ConfGoogleAppsDomain' : 'Doména',
		'ConfGoogleCalendar' : 'Přidat odkazy na zařazení narozenin a událostí do aplikace <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pro <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>.',
		'ConfHideApplicationStories' : 'Skrýt v aktualitách příspěvky o aplikacích.',
		'ConfHideEventStories': 'Skrýt v aktualitách příspěvky z událostí.',
		'ConfHideFacebookCountInTitle' : 'Skrýt počet nových zpráv.',
		'ConfHideFriendStories': 'Skrýt v aktualitách příspěvky přátel.',
		'ConfHideGroupStories': 'Skrýt v aktualitách příspěvky o skupinách.',
		'ConfHideLikeStories' : 'Skrýt příspěvky uživateli xxx se líbí.',
		'ConfHideLinkStories' : 'Skrýt příspěvky o odkazech.',
		'ConfHideNoteStories' : 'Skrýt příspěvky o poznámkách.',
		'ConfHidePhotoStories' : 'Skrýt příspěvky o fotkách.',
		'ConfHideProfilePicStories' : 'Skrýt příspěvky o profilových fotkách.',
		'ConfHideRead' : 'Skrýt v aktualitách položky, které byly označené jako přečtené.',
		'ConfHideRelationshipStories' : 'Skrýt v aktualitách příspěvky o vztahu.',
		'ConfHideStatusStories' : 'Skrýt příspěvky se statusy.',
		'ConfHideVideoStories' : 'Skrýt příspěvky o videích.',
		'ConfHideWallStories' : 'Skryj příspěvky na zdi.',
		'ConfHomeBeta' : 'Zobraz Beta Tester sekci.',
		'ConfHomeChat' : 'Zobrazit část chat.',
		'ConfHomeEvents' : 'Zobrazit část Události',
		'ConfHomeFindFriends' : 'Zobrazit část Spojte se s přáteli',
		'ConfHomeLeftAlign' : 'Zarovat obsah stránky Domů doleva',
		'ConfHomeLeftColumn' : 'Zobraz levý sloupec.',
		'ConfHomeLeftColumnFixed' : 'Nech levý sloupec viditelný i při scrolování dolů.',
		'ConfHomeLink' : 'Zobraz ve vrchní nabídce odkaz na úvodní stránku.',
		'ConfHomeNavigation' : 'Zobrazit část navigace.',
		'ConfHomePokes' : 'Zobrazit část Šťouchnutí',
		'ConfHomeProfile' : 'Zobraz část Profil.',
		'ConfHomeRecommendations' : 'Zobraz doporučení (Mohli byste znát, doporučené stránky, atd.).',
		'ConfHomeRequests' : 'Zobrazit část Žádosti',
		'ConfHomeRightColumn' : 'Zobrazit pravý sloupec',
		'ConfHomeStretch' : 'Roztáhnout úvodní stránku na šířku okna prohlížeče',
		'ConfHomeStretchComments' : 'Roztáhnout komentáře na úvodní stránce.',
		'ConfiCalendar' : 'Přidat odkazy na převzetí souboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> se všemi narozeninami',
		'ConfImport' : 'Pro importování nastavení přepište následující text předem exportovaným a poté klikněte na "Import".',
		'ConfInboxCountInTitle' : 'Zobrazit v názvu stránky počet nepřečtených zpráv',
		'ConfLogoutLink' : 'Přidej odhlašovací odkaz do vrchní nabídky.',
		'ConfNotificationCountInTitle' : 'Zobraz počet nových upozornění v titulku stránky.',
		'ConfNewTabSearch' : 'Při vyhledávání otevřít stisknutím Ctrl+Enter výsledky hledání na nové kartě/v novém okně',
		'ConfPageTitle' : 'Odstranit "Facebook |" z názvu všech stránek',
		'ConfPhotoPopup' : 'Větší verze fotek v kontextovém menu po najetí myší',
		'ConfPopupAutoClose' : 'Automaticky zavírat kontextová okna s obrázkem',
		'ConfPopupSmartAutoClose' : 'Zabránit automatickému uzavření kontextového okna s obrázkem',
		'ConfPopupPosition' : 'Umístění kontextového okna s obrázkem',
		'ConfProcessInterval' : 'Interval zpracování stránky v milisekundách (defaultně=1000):',
		'ConfProfileLink' : 'Zobraz ve vrchní nabídce odkaz na profil.',
		'ConfProfilePicPopup' : 'Větší verze profilových fotek v kontextovém okně po najetí myší',
		'ConfProtocolLinks' : 'Zmenit ID pro okamžitou správu na odkazy spouštějící konverzaci (Google Talk, Windows Live atd.)',
		'ConfSectionAbout' : 'O FFixeru',
		'ConfSectionAdvanced' : 'Upřesnění',
		'ConfSectionEvents' : 'Narozeniny/Události',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Příspěvky',
		'ConfSectionHomePage' : 'Stránka Doma',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'Nabídky/Chat',
		'ConfSectionOther' : 'Další možnosti',
		'ConfSectionPageTitle' : 'Titulek stránky',
		'ConfSectionPictures' : 'Obrázky',
		'ConfSectionShortcuts' : 'Klávesové zkratky',
		'ConfSecureLinks' : 'Přesměrovat odkazy Facebooku na stránky HTTPS',
		'ConfShortcutList' : '<b>Klávesové zkratky</b> (rozlišují se malá/velká písmena):<br /><br /><i>Z libovolné stránky:</i><br />&nbsp;<b>A</b> - Alba/fotky<br />&nbsp;<b>B</b> - Přepnout seznam přátel (online přátel)<br />&nbsp;<b>C</b> - Konfigurace skriptu FFixer<br />&nbsp;<b>D</b> - Narozeniny<br />&nbsp;<b>E</b> - Události<br />&nbsp;<b>F</b> - Přátelé<br />&nbsp;<b>H</b> - Domů<br />&nbsp;<b>I</b> - Přijaté zprávy<br />&nbsp;<b>K</b> - Přidej záložku<br />&nbsp;<b>L</b> - Odhlášení (po odhlášení stiskněte Enter)<br />&nbsp;<b>N</b> - Upozornění<br />&nbsp;<b>P</b> - Váš profil<br />&nbsp;<b>R</b> - Žádosti<br />&nbsp;<b>S</b> - Přeskočit na pole Hledat<br />&nbsp;<b>T</b> - Přeložit vybraný text<br />&nbsp;<b>?</b> - Zobrazit informace o ladění skriptu FFixer<br />&nbsp;<b>&lt;escape&gt;</b> - Zavřít kontextová okna vytvořené skriptem FFixer<br /><br /><i>Ze stránky Domů (filtry)</i>:<br />&nbsp;<b>a</b> - Stránky<br />&nbsp;<b>f</b> - Aktuality<br />&nbsp;<b>g</b> - Skupiny<br />&nbsp;<b>l</b> - Odkazy<br />&nbsp;<b>n</b> - Novinky<br />&nbsp;<b>p</b> - Fotky<br />&nbsp;<b>s</b> nebo <b>u</b> - Co dělají ostatní<br />&nbsp;<b>t</b> - Poznámky<br />&nbsp;<b>v</b> - Videa<br /><br /><i>Z profilů</i>:<br />&nbsp;<b>i</b> - Informace<br />&nbsp;<b>p</b> - Fotky<br />&nbsp;<b>w</b> - Zeď<br />&nbsp;<b>x</b> - Kontejner<br /><br /><i>Ze stránek s navigací (dozadu, dopredu atd.)</i><br />&nbsp;<b>&lt;levá šipka&gt;</b> - Předchozí<br />&nbsp;<b>&lt;pravá šipka&gt;</b> - Následující<br />&nbsp;<b>&lt;shift&gt; + &lt;levá šipka&gt;</b> - První (pokud je dispozici)<br />&nbsp;<b>&lt;shift&gt; + &lt;pravá šipka&gt;</b> - Poslední (pokud je k dispozici)<br /><br /><i>Při prohlížení alb/fotek:</i><br />&nbsp;<b>a</b> - Načítat všechny miniatury (pokud je k dispozici)<br />&nbsp;<b>b</b> - Zobrazit velké obrázky<br />&nbsp;<b>c</b> - Zobrazit komentáře<br />&nbsp;<b>k</b> - Zpět do alba<br />&nbsp;<b>m</b> - Fotky (osoby) a moje<br /><br /><i>Při prohlížení nejnovějších alb a nahraných/označených fotek:</i><br />&nbsp;<b>a</b> nebo &nbsp;<b>r</b> - Nejnovější alba<br />&nbsp;<b>m</b> nebo &nbsp;<b>u</b> - Nahrané z mobilu<br />&nbsp;<b>o</b> - Fotky mé osoby<br />&nbsp;<b>p</b> - Mé fotky<br />&nbsp;<b>t</b> nebo &nbsp;<b>f</b> - Označení přátelé',
		'ConfShortcuts' : 'Povolit klávesové zkratky',
		'ConfSign' : 'Zobrazit znamení lidí v jejich profilu (pokud uvedli svůj datum narození)',
		'ConfTopBarFixed' : 'Vždy zobrazit vrchní panel s nabídkou - i při posouvání stránky',
		'ConfTopBarHoverOpacity' : 'Při najetí myší',
		'ConfTopBarOpacity' : 'Průhlednost vrchního panelu s nabídkou',
		'ConfUpdates' : 'Denně na Userscripts.org ověřovat aktualizace pro FFixer, případně <a href="#" id="fbfUpdateLink" onclick="return false;">zkontrolovat nyní</a>.',
		'DownloadVideo' : 'Stáhnout video',
		'ExportICalendarFile' : 'Exportovat soubor iCalendar',
		'ExportICalendarFileWarning' : '(Pokud máte mnoho přátel, může to chvíli trvat.)',
		'FacebookFixerConflict' : 'Facebook Fifex je nyní znám jako FFixer.<br /><br />Protože se změnilo jméno, musíte manuálně odinstalovat Facebook Fixer z vašeho prohlížeče.<br /><br />Pokud si nevíte jak na to <a %s>pokračujte zde</a>.',
		'fullAlbumLoaded' : 'celý album je načtený',
		'Import' : 'Import',
		'ImportConfirm' : 'Opravdu chcete importovat toto nastavení?\nStávající nastavení bude ztraceno.',
		'ImportFailure' : 'Při importování nastavení došlo k chybě.',
		'ImportSuccess' : 'Import kompletní. Chcete aktualizovat stránku?',
		'Left' : 'Vlevo',
		'LoadingAllPhotos' : 'Načítají sa všechny fotky...',
		'loadingFullAlbum' : 'Načítá se celý album...',
		'LoadingPic' : 'Načítá se obrázek...',
		'LoadPhotosWarning' : 'Načítání všech fotek může chvíli trvat',
		'Months' : new Array('Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec'),
		'ProtocolSkype' : 'Volat %s pomocí Skype',
		'ProtocolMSN' : 'Chatovat s %s pomocí Windows Live',
		'ProtocolYahoo' : 'Chatovat s %s pomocí Yahoo Messenger',
		'ProtocolGoogle' : 'Chatovat s %s pomocí Google Talk',
		'ReloadErrorPage' : 'Klikněte na Zkusit znovu nebo vyčkejte 5 sekund',
		'Refresh' : 'Obnovit',
		'Remove' : 'Odstranit',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'Zobrazit velké obrázky',
		'Signs' : new Array('Kozoroh','Vodnář','Ryba','Beran','Býk','Blíženci','Rak','Lev','Panna','Váhy','Štír','Střelec'),
		'today' : 'dnes',
		'Translators' : 'Překladatelé',
		'UpdateAvailable1' : 'K dispozici je aktualizace skriptu FFixer.',
		'UpdateAvailable2' : 'Chcete aktualizovat nyní?',
		'UpdateHomepage' : 'Přejít na domovskou stránku',
		'UpdateInstall' : 'Nainstalovat',
		'UpdateTomorrow' : 'Připomenout zítra',
		'ViewAlbumComments' : 'Ukaž komentáře k albu',
		'yearsOld' : '%s let'
	},
	
	// Macedonian - Contributed by Goce Manevski (20100628)
	mk : {
		'_language' : 'Macedonian',
		'AddToCalendar' : 'Додади во Калентар',
		'AddToGoogleCalendar' : 'Додади во Google Калентар',
		'all' : 'сите',
		'All' : 'Сите',
		'AllPhotosLoaded' : 'Сите фотографии се вчитани',
		'Automatic' : 'Автоматски',
		'Birthday' : '%s\'s Роденден',
		'BookmarkAdd' : 'ДОдади нов обележувач',
		'BookmarkConfirmRemoval' : 'Дали си сигурен дека сакаш да избришеш обележувач "%s"?',
		'BookmarkDoesNotExist' : 'This page has not been bookmarked.\n\nGo to the page you want removed and try again.',
		'BookmarkExists' : 'Веќе има обележувач за оваа страница.\n\nОди до страницата што сакаш да ја обележиш и обиди се повторно.',
		'BookmarkNamePrompt' : 'Внеси име за овој обележувач:\n%s',
		'BookmarkRemove' : 'Избриши обележувач',
		'Bookmarks' : 'Обележувачи',
		'BrowserUnsupported' : 'Твојот пребарувач не ја поддржува опцијата.',
		'CreatingFile' : 'Креирање Датотека',
		'Close' : 'Затвори',
		'ConfigureFacebookFixer' : 'Конфигурирај го FFixer',
		'ConfigureInstructions' : 'Сите промени се веднаш зачувани, но некои промени нема да работат во веќе отворените табови.',
		'ConfAge' : 'Покажи ги годините на луѓе\-то на нивните профили (ако го имаат објавено целиот датум на раѓање).',
		'ConfApplicationWhitelist' : 'Апликациска белалиста - Внеси сметки од апликациите за да ги покажеш ако биле скриени. Раздели ги сметките со празно место.',
		'ConfAutoBigAlbumPictures' : 'Автоматски прикажувај големи албум слики кога ќе се отвори страницата.',
		'ConfAutoLoadFullAlbum' : 'Автоматски вчитувај мали сликички за сите слики во албумот на една страница.',
		'ConfAutoLoadTaggedPhotos' : 'Автоматски вчитувај мали сликички за сите обележани слики на една страница (Таб од слики на профилите на луѓе\-то).',
		'ConfAutoReadMore' : 'Автоматски кликни на "прочитај повеќе" линковите.',
		'ConfBigAlbumPictures' : 'Додади линк на албум страниците за да се покаже голема верзија на сите фотографии на таа страница.',
		'ConfBookmarks' : 'Додади подмени на горното топ мени.',
		'ConfBottomBarHoverOpacity' : 'На обележување со глувчето',
		'ConfBottomBarOpacity' : 'Проѕирност на долниот мени бар',
		'ConfCalendarBirthDate' : 'Вклучи го роденден\-от на лицето во детали за настапот.',
		'ConfCalendarFullName' : 'Користи го целото име на човек\-от како наслов за родендени (наместо само име).',
		'ConfChatDifferentiate' : 'Користи здебелено и искосено за разлика повеѓу достапните и отсутните контакти.',
		'ConfChatHideIdle' : 'Сокриј ги отсутните контакти.',
		'ConfDelayPopupPics' : 'Додади кратко задоцнување пред покажување скокачки фотографии.',
		'ConfDelayPopupPicsTimeout' : 'Задоцнување пред покажување скокачки фотографии, во милисекунди (стандард=500):',
		'ConfDownloadVideo' : 'Додади линк за превземања на видеата од видео страниците. (Може ќе ти треба <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Автоматски повторно вчитувај ги апликациите на страниците со грешки по 5 секунди.',
		'ConfExport' : 'За да ги изнесеш подесувањата, копирај го текстот предходно и зачувај го во датотека.',
		'ConfExternalPopup' : 'Скокачки целосни верзии на надворешни фотографии. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Јазик за FFixer',
		'ConfFacebookTimestamps' : 'Прикажи Facebook маркер за времето (eg. "3 часа старо").',
		'ConfFBFTimestamps' : 'Додади FFixer маркер за времето по Facebook маркерот за време (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Прикажи FFixer маркер за време во 24-часовен формат.',
		'ConfFriendRequestCountInTitle' : 'Прикажи број од нови барања за пријатели на насловот на страницата.',
		'ConfGoogleApps' : 'Креирај Google Календар линкови компатибилни со Google Апликации.',
		'ConfGoogleAppsDomain' : 'Домен',
		'ConfGoogleCalendar' : 'Дидаду линкови за да додадеш роденден и настани во <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Јазик за <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Сокриј ги приказните за апликациите.',
		'ConfHideEventStories' : 'Сокриј ги приказните за настаните.',
		'ConfHideFriendStories' : 'Сокриј ги приказните за пријателите.',
		'ConfHideGroupStories' : 'Сокриј ги приказните за групите.',
		'ConfHideLikeStories' : 'Сокриј ги приказните за "ми се допаѓа".',
		'ConfHideLinkStories' : 'Сокриј ги приказните за линковите.',
		'ConfHideNoteStories' : 'Сокриј ги приказните за белешките.',
		'ConfHidePhotoStories' : 'Сокриј ги приказните за фотографиите.',
		'ConfHideProfilePicStories' : 'Сокриј ги приказните за профил фотографиите.',
		'ConfHideRead' : 'Сокриј работи во новостите одкако ќе бидат обележани за прочитаните.',
		'ConfHideRelationshipStories' : 'Сокриј ги приказните за статус-от за врска.',
		'ConfHideStatusStories' : 'Сокриј ги приказните за статусите.',
		'ConfHideVideoStories' : 'Сокриј ги приказните за видеата.',
		'ConfHideWallStories' : 'Сокриј ги приказните за ѕидот.',
		'ConfHomeChat' : 'Покажи Разговор секција.',
		'ConfHomeEvents' : 'Покажи Настани секција.',
		'ConfHomeFindFriends' : 'Покажи Поврзан со пријатели секција.',
		'ConfHomeLeftAlign' : 'Left-align the contents of the home page.',
		'ConfHomeLeftColumn' : 'Покажи ја левата колона.',
		'ConfHomeLeftColumnFixed' : 'Задржи ја левата колона видлива, по лизгањето надоле.',
		'ConfHomeLink' : 'Покажи Почетна линк во топ мени барот.',
		'ConfHomePeopleYouMayKnow' : 'Покажи Сугестии секција.',
		'ConfHomeNavigation' : 'Покажи Навигација секција.',
		'ConfHomePokes' : 'Покажи Боцкања секција.',
		'ConfHomeProfile' : 'Покажи Профил секција.',
		'ConfHomeRequests' : 'Покажи Барања секција.',
		'ConfHomeRightColumn' : 'Покажи десна колона.',
		'ConfHomeStretch' : 'Растегни ја Почетната страница на целата ширина на пребарувачот.',
		'ConfiCalendar' : 'Додади линкови за превземање на <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> датотека со сите родендени.',
		'ConfImport' : 'За да ги внесеш твоите прилагодувања подоцна, замени го текстот погоре со текстот кој ти е зачуван предходно и кликни "Внеси".',
		'ConfInboxCountInTitle' : 'Прикажи број на нови пораки во насловот на страницата.',
		'ConfLogoutLink' : 'Додади Одјави се линк во топ мени барот.',
		'ConfNotificationCountInTitle' : 'Прикажи број на нови нотификации во насловот на страницата.',
		'ConfNewTabSearch' : 'Направи ги отворени пребарувањата во нов таб/прозорец кога притискам CTRL + Enter за да барам.',
		'ConfPageTitle' : 'Избриши "Facebook |" од насловот на секоја страница.',
		'ConfPhotoPopup' : 'Скокачки поголеми верзии на фотографии при обележување со глувчето.',
		'ConfPopupAutoClose' : 'Затвори ги скокачките фотографии автоматски.',
		'ConfPopupSmartAutoClose' : 'Спречи автоматски исклучување на скокачките фотографии ако обележувачот на глувчето е над нив',
		'ConfPopupPosition' : 'Позиција за скокачки фотографии',
		'ConfProcessInterval' : 'Интервал за обработување страница, во милисекунди (поставено=1000):',
		'ConfProfileLink' : 'Прикажи Профил линк во топ мени барот.',
		'ConfProfilePicPopup' : 'Скокачки големи верзии на профил фотографии со обележување со глувчето',
		'ConfProtocolLinks' : 'Вклучи месинџер сметки на профилите со линкови за почеток на разговор со нив (Google Talk, Windows Live и тн).',
		'ConfSectionAbout' : 'За FFixer',
		'ConfSectionAdvanced' : 'Напредно',
		'ConfSectionEvents' : 'Родендени/Настани',
		'ConfSectionImportExport' : 'Внеси/Изнеси',
		'ConfSectionFeeds' : 'Извори',
		'ConfSectionHomePage' : 'Почетна страница',
		'ConfSectionLiveFeed' : 'Новости',
		'ConfSectionMenu' : 'Мениа/Разговор',
		'ConfSectionOther' : 'Други Опции',
		'ConfSectionPageTitle' : 'Наслов на страница',
		'ConfSectionPictures' : 'Фотографии',
		'ConfSectionShortcuts' : 'Кратенки за тастатура',
		'ConfSecureLinks' : 'Сила на Facebook линковите до точка до HTTPS страници.',
		'ConfShortcutList' : '<b>Кратенки за тастатура</b> (case sensitive):<br /><br /><i>Од секоја страница:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Вклучи корисници (вклучени пријатели)<br />&nbsp;<b>C</b> - FFixer Конфигурација<br />&nbsp;<b>D</b> - Родендени<br />&nbsp;<b>E</b> - Настани<br />&nbsp;<b>F</b> - Пријатели<br />&nbsp;<b>H</b> - Почетна страница<br />&nbsp;<b>I</b> - Сандаче<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by FFixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Вклучи кратенки за тастатура.',
		'ConfSign' : 'Пркажи хороскопски значи на луѓе\-то на нивните профили (Ако ја објавиле таа информација).',
		'ConfTopBarFixed' : 'Зачувај го горниот мени бар на екранот секогаш, и по лизгањето доле.',
		'ConfTopBarHoverOpacity' : 'При обележување со глувчето',
		'ConfTopBarOpacity' : 'Проѕирност на горниот мени бар',
		'ConfUpdates' : 'Провери Userscripts.org дневно за надоградби во FFixer. Или <a href="#" id="fbfUpdateLink" onclick="return false;">провери сега</a>.',
		'DownloadVideo' : 'Превземи Видео',
		'ExportICalendarFile' : 'Изнеси iCalendar датотека',
		'ExportICalendarFileWarning' : '(Тоа ќе потрае ако имаш многу пријатели)',
		'FacebookFixerConflict' : 'Facebook Fixer е сега FFixer.<br /><br />За промена на име треба сами да го избришете Facebook Fixer од вашиот пребарувач, или двете скрипти ќе создаваат проблем една на друга.<br /><br />Ако не си сигурен како да ја избришеш скриптата, <a %s>кликни тука за инструкции</a>.',
		'fullAlbumLoaded' : 'целиот албум е вчитан',
		'Import' : 'Внеси',
		'ImportConfirm' : 'Дали си сигурен дека сакаш да ги внесеш овие прилагодувања?\nТвоите сегашни прилагодувања ќе бидат изгубени.',
		'ImportFailure' : 'се појави грешка додека ги внесуваше твоите прилагодувања.',
		'ImportSuccess' : 'Внесувањето е завршено. Дали сакаш да ја освежиш страницата?',
		'Left' : 'Лево',
		'LoadingAllPhotos' : 'Се вчитуваат сите фотографии...',
		'loadingFullAlbum' : 'Се вчитува целиот албум...',
		'LoadingPic' : 'Се вчитува фотографијата...',
		'LoadPhotosWarning' : 'Вчитувањето на сите фотографии може да потрае',
		'Months' : Array('Јануари','Фебруари','Март','Април','Мај','Јуни','Јули','Август','Септември','Октомври','Ноември','Декември'),
		'ProtocolSkype' : 'Јави се %s преку Skype',
		'ProtocolMSN' : 'Разговарај со %s преку Windows Live',
		'ProtocolYahoo' : 'Разговарај со %s преку Yahoo Messenger',
		'ProtocolGoogle' : 'Разговарај со %s преку Google Talk',
		'ReloadErrorPage' : 'Пробај повторно, или почекај 5 секунди',
		'Refresh' : 'Освежи',
		'Remove' : 'Избриши',
		'Right' : 'Десно',
		'ShowBigPictures' : 'Покажи големи фотографии',
		'Signs' : Array('Јарец','Водолија','Риби','Овен','Бик','Близнаци','Рак','Лав','Девица','Вага','Скорпија','Стрелец'),
		'today' : 'денес',
		'Translators' : 'Преведувачи',
		'UpdateAvailable1' : 'Достапна е надоградба за FFixer',
		'UpdateAvailable2' : 'Дали сакаш да надоградиш сега?',
		'UpdateHomepage' : 'Оди на почетна',
		'UpdateInstall' : 'Инсталирај сега',
		'UpdateTomorrow' : 'Потсетиме утре',
		'yearsOld' : '%s години'
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
		'ConfigureFacebookFixer' : 'FFixer - Alternativer',
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
		'ConfFacebookFixerLanguage' : 'Språk til FFixer',
		'ConfFacebookTimestamps' : 'Vis Facebook tidsangivelse (eg. "3 timer siden").',
		'ConfFBFTimestamps' : 'Legg til FFixer tidsangivelser etter Facebook tider (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Vis FFixer tidsangivelser i 24-timers format.',
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
		'ConfSectionAbout' : 'Om FFixer',
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
		'ConfShortcutList' : '<b>Tastatur-Snarveier</b> (små/store sensitive):<br /><br /><i>Fra hvilken som helst side:</i><br /> <b>A</b> - Album/bilder<br /> <b>B</b> - Handtere venneliste (nettvenner)<br /> <b>C</b> - FFixer oppsett<br /> <b>D</b> - Fødselsdager<br /> <b>E</b> - Hendelser<br /> <b>F</b> - Venner<br /> <b>H</b> - Hjem side<br /> <b>I</b> - Innboks<br /> <b>K</b> - Legg til Bokmerke<br /> <b>L</b> - Velg Logg ut lenken (trykk Enter etterpå for å logge ut)<br /> <b>N</b> - Varsler<br /> <b>P</b> - Din Profil<br /> <b>R</b> - Forespørsler<br /> <b>S</b> - Hopp til søkefeltet<br /> <b>T</b> - Oversett valgt tekst<br /> <b>?</b> - Vis FFixer\'s feilrette-info<br /> <b><escape></b> - Lukk sprettopp\'er laget av FFixer<br /><br /><i>Fra Hjem siden (filtere)</i>:<br /> <b>a</b> - Sider<br /> <b>f</b> - Aktiv Notis<br /> <b>g</b> - Grupper<br /> <b>l</b> - Lenker<br /> <b>n</b> - Nyhets Notiser<br /> <b>p</b> - Bilder<br /> <b>s</b> eller <b>u</b> - Status-Oppdateringer<br /> <b>t</b> - Notater<br /> <b>v</b> - Videoer<br /><br /><i>Fra profiler</i>:<br /> <b>i</b> - Info<br /> <b>p</b> - Bilder<br /> <b>w</b> - Vegg<br /> <b>x</b> - Bokser<br /><br /><i>Fra sider med nummerering (forrige, neste, etc)</i><br /> <b><venstre pil></b> - Forrige<br /> <b><høyre pil></b> - Neste<br /> <b><shift> + <venstre pil></b> - Første (når tilgjengelig)<br /> <b><shift> + <høyre pil></b> - Siste (når tilgjengelig)<br /><br /><i>Mens man ser på album/bilder:</i><br /> <b>a</b> - Last alle frimerkebilder (når tilgjengelig)<br /> <b>b</b> - Vis store bilder<br /> <b>c</b> - Se på kommentarer<br /> <b>k</b> - Tilbake til album<br /> <b>m</b> - Bilder av (person) og meg<br /><br /><i>Mens man ser på siste album og opplastede/merkede bilder:</i><br /> <b>a</b> eller  <b>r</b> - Siste Album<br /> <b>m</b> eller  <b>u</b> - Mobile opplastinger<br /> <b>o</b> - Bilder av meg<br /> <b>p</b> - Mine bilder<br /> <b>t</b> eller  <b>f</b> - Merkede venner',
		'ConfShortcuts' : 'Aktiver tastatur-snarveier.',
		'ConfSign' : 'Vis en person\'s stjernetegn på profilen (om de oppgir fødselsdatoen sin).',
		'ConfTopBarFixed' : 'Behold alltid toppmeny-linjen på skjermen, til og med etter rulling nedover.',
		'ConfTopBarHoverOpacity' : 'Ved mus-over',
		'ConfTopBarOpacity' : 'Toppmenyens gjennomsiktighet',
		'ConfUpdates' : 'Sjekk Userscripts.org daglig etter oppdateinger til FFixer. Eller <a href="#" id="fbfUpdateLink" onclick="return false;">sjekk nå</a>.',
		'DownloadVideo' : 'Last ned video',
		'ExportICalendarFile' : 'Eksporter iCalendar fil',
		'ExportICalendarFileWarning' : '(Dette vil ta ei stund om du har mange venner)',
		'FacebookFixerConflict' : 'Facebook Fixer er nå kjent som FFixer.<br /><br />På grunn av navnebyttet må du manuelt avinstallere Facebook Fixer fra nettleseren din, ellers vil de to scriptene komme i konflikt med hverandre.<br /><br />Dersom du ikke er sikker på hvordan man avinstallerer et brukerscript, <a %s>klikk her for instruksjoner</a>.',
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
		'UpdateAvailable1' : 'En oppdatering til FFixer er tilgjengelig',
		'UpdateAvailable2' : 'Vil du oppdatere nå?',
		'UpdateHomepage' : 'Gå til hjem siden',
		'UpdateInstall' : 'Installer nå',
		'UpdateTomorrow' : 'Minn meg på om dette i morgen',
		'ViewAlbumComments' : 'Vis album-kommentarer',
		'yearsOld' : '%s år gammel'
	},

	// Korean - Contributed by 박상빈 (20100823)
	ko : {
		'_language' : 'Korean',
		'AddToCalendar' : '달력에 추가',
		'AddToGoogleCalendar' : '구글 캘린더에 추가',
		'all' : '전체',
		'All' : '모든 사진',
		'AllPhotosLoaded' : '모든 사진을 로드했습니다',
		'Automatic' : '자동',
		'Birthday' : '%s\의 생일',
		'BookmarkAdd' : '즐겨찾기에 추가',
		'BookmarkExists' : '이 페이지는 이미 즐겨찾기 되어 있습니다.\n\n즐겨찾기 하실 페이지로 가서 다시 시도하세요.',
		'BookmarkNamePrompt' : '즐겨찾기 이름:\n%s',
		'BookmarksConfirmRemoval' : '다음의 즐겨찾기를 정말로 지우시겠습니까?',
		'BookmarksManage' : '즐겨찾기 관리',
		'BookmarksRemoveSelected' : '선택한 즐겨찾기 삭제',
		'Bookmarks' : '즐겨찾기',
		'BrowserUnsupported' : '이 기능은 현재 브라우저에서는 작동하지 않습니다.',
		'CreatingFile' : '파일 만드는 중',
		'Close' : '닫기',
		'ConfigureFacebookFixer' : 'FFixer 설정',
		'ConfigureInstructions' : '변경사항은 선택즉시 적용됩니다. 다른 열려있는 탭에는 바로 적용되지 않을 수 있습니다.',
		'ConfAge' : '친구의 프로필에 친구의 나이 표시 (생년월일을 공개한 경우).',
		'ConfAlbumComments' : '사진첩 페이지에 "사진첩에 달린 댓글 모두보기" 링크 더하기.',
		'ConfApplicationWhitelist' : '허용된 어플리케이션 - 숨기지 않을 어플리케이션의 ID를 입력하세요. ID 사이는 스페이스로 나눔.',
		'ConfAutoBigAlbumPictures' : '사진 페이지에 큰 사진첩 사진을 보이기.',
		'ConfAutoLoadFullAlbum' : '사진첩 페이지에 모든 사진을 한번에 보이기.',
		'ConfAutoLoadTaggedPhotos' : '사진 페이지에 태그달린 모든 사진을 보이기.',
		'ConfAutoReadMore' : '"지난 게시물" 링크를 자동으로 누르기.',
		'ConfBigAlbumPictures' : '사진첩 페이지에 "큰 사진 보기" 링크 더하기.',
		'ConfBookmarks' : '맨 위 메뉴 표시줄에 즐겨찾기 메뉴를 더하기.',
		'ConfBottomBarHoverOpacity' : '마우스 커서를 올려놨을때',
		'ConfBottomBarOpacity' : '아래 표시줄의 투명도',
		'ConfCalendarBirthDate' : '이벤트의 추가정보에 친구의 생일 보이기.',
		'ConfCalendarFullName' : '생일을 표시할때 성과 이름을 모두 표시하기 (기본은 성을 표시하지 않음).',
		'ConfChatDifferentiate' : '자리비움 상태인 친구와 온라인 상태인 친구를 이탤릭체와 굵은 글씨로 구분하기.',
		'ConfChatHideIdle' : '자리비움 상태의 친구는 숨기기.',
		'ConfDelayPopupPics' : '조금 기다렸다가 팝업 사진 보이기.',
		'ConfDelayPopupPicsTimeout' : '팝업 사진을 보이기 전까지의 대기 시간, 1/1000초 단위 (기본은 500):',
		'ConfDownloadVideo' : '비디오 페이지에 다운로드 링크 더하기. (<a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV 플레이어</a>가 필요할수도 있습니다)',
		'ConfErrorPageReload' : '어플리케이션 오류 페이지를 5초 후에 자동으로 새로고침.',
		'ConfExport' : '설정사항을 내보내고 싶으시면 아래의 텍스트를 복사해서 파일에 저장하십시오.',
		'ConfExternalPopup' : '마우스 커서를 외부 사진에 올리면 을 큰 팝업 사진을 보이기. <sup>베타</sup>',
		'ConfFacebookFixerLanguage' : 'FFixer에 사용할 언어',
		'ConfFacebookTimestamps' : 'Facebook 형식의 타임스탬프 보이기 (예. "약 3시간 전").',
		'ConfFBFTimestamps' : 'FFixer 형식의 타임스탬프를 Facebook 타임스탬프 뒤에 보이기 (예. "11:45").',
		'ConfFBFTimestamps24' : 'FFixer 타임스탬프를 24시간 형식으로 보이기.',
		'ConfFriendRequestCountInTitle' : '페이지 제목에 친구 요청 갯수 보이기.',
		'ConfGoogleApps' : '구글 Apps와 호환되는 구글 캘린더 링크 만들기.',
		'ConfGoogleAppsDomain' : '도메인',
		'ConfGoogleCalendar' : '생일과 이벤트를 <a href="http://www.google.com/support/calendar/bin/topic.py?hl=kr&topic=13732" target="_blank">구글 캘린더</a>에 추가하는 링크 더하기.',
		'ConfGoogleLanguage' : '<a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">구글 번역</a>에 사용할 언어',
		'ConfHideApplicationStories' : '어플리케이션 게시물 숨기기.',
		'ConfHideEventStories' : '이벤트 게시물 숨기기.',
		'ConfHideFacebookCountInTitle' : 'Facebook의 쪽지 갯수 숨기기.',
		'ConfHideFriendStories' : '친구들의 게시물 숨기기.',
		'ConfHideGroupStories' : '그룹 게시물 숨기기.',
		'ConfHideLikeStories' : '"좋아요" 게시물 숨기기.',
		'ConfHideLinkStories' : '링크 게시물 숨기기.',
		'ConfHideNoteStories' : '노트 게시물 숨기기.',
		'ConfHidePhotoStories' : '사진 게시물 숨기기.',
		'ConfHideProfilePicStories' : '프로필 사진 게시물 숨기기.',
		'ConfHideRead' : '최신글 목록에서 읽은 게시물 숨기기.',
		'ConfHideRelationshipStories' : '결혼/연애 게시물 숨기기.',
		'ConfHideStatusStories' : '"내 상태" 게시물 숨기기.',
		'ConfHideVideoStories' : '비디오 게시물 숨기기.',
		'ConfHideWallStories' : '담벼락 게시물 숨기기.',
		'ConfHomeBeta' : 'Facebook Sneak Peek 보이기.',
		'ConfHomeChat' : '채팅 보이기.',
		'ConfHomeEvents' : '이벤트 보이기.',
		'ConfHomeFindFriends' : '연결하기 보이기.',
		'ConfHomeLeftAlign' : '첫 페이지를 왼쪽으로 정렬.',
		'ConfHomeLeftColumn' : '왼쪽 메뉴 보이기.',
		'ConfHomeLeftColumnFixed' : '아래로 스크롤 한 후에도 왼쪽 메뉴 보이기.',
		'ConfHomeLink' : '맨 위 메뉴 표시줄에 "첫 페이지" 링크 보이기.',
		'ConfHomeNavigation' : '네비게이션 메뉴 보이기.',
		'ConfHomePokes' : 'Pokes 보이기.',
		'ConfHomeProfile' : '프로필 보이기.',
		'ConfHomeRecommendations' : '추천 보이기.',
		'ConfHomeRequests' : '요청 보이기.',
		'ConfHomeRightColumn' : '오른쪽 메뉴 보이기.',
		'ConfHomeStretch' : '브라우저의 가로 크게에 맞게 첫 페이지 내용을 늘이기 .',
		'ConfHomeStretchComments' : '브라우저의 가로 크기에 맞게 댓글을 늘이기.',
		'ConfiCalendar' : '모든 생일을 <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> 파일로 받는 링크 더하기.',
		'ConfImport' : '설정사항을 가져오고 싶으시면 저장한 텍스트를 아래에 붙인 후 "가져오기"를 누르십시오.',
		'ConfInboxCountInTitle' : '페이지 제목에 새 쪽지 갯수 보이기.',
		'ConfLogoutLink' : '맨 위 메뉴 표시줄에 로그아웃 링크 더하기.',
		'ConfNotificationCountInTitle' : '페이지 제목에 새 알림 갯수 보이기.',
		'ConfNewTabSearch' : '검색창에서 CTRL+엔터 키를 누르면 새 탭/창에 검색결과를 보이기.',
		'ConfPageTitle' : '"Facebook |"을 페이지 제목에서 없애기.',
		'ConfPhotoPopup' : '마우스 커서를 프로필 사진에 올리면 큰 팝업 사진을 보이기.',
		'ConfPopupAutoClose' : '자동으로 팝업 사진 닫기.',
		'ConfPopupSmartAutoClose' : '마우스 커서를 올리고 있으면 팝업사진을 자동으로 닫지 않기.',
		'ConfPopupPosition' : '팝업 사진 위치',
		'ConfProcessInterval' : '페이지를 처리하는 간격, 1/1000초 단위 (기본은 1000):',
		'ConfProfileLink' : '맨 위 메뉴 표시줄에 프로필 링크 보이기.',
		'ConfProfilePicPopup' : '마우스 커서를 사진에 올리면 큰 팝업 사진을 보이기.',
		'ConfProtocolLinks' : '프로필에 있는 메신저 ID(구글토크, 윈도우 라이브 메신저, 등)를 메신저를 통해 대화를 시작하는 링크로 변환하기.',
		'ConfSectionAbout' : 'FFixer는...',
		'ConfSectionAdvanced' : '고급',
		'ConfSectionEvents' : '생일/이벤트',
		'ConfSectionImportExport' : '가져오기/내보내기',
		'ConfSectionFeeds' : '게시물',
		'ConfSectionHomePage' : '첫 페이지',
		'ConfSectionLiveFeed' : '최신글',
		'ConfSectionMenu' : '메뉴/채팅',
		'ConfSectionOther' : '그 외 설정',
		'ConfSectionPageTitle' : '페이지 제목',
		'ConfSectionPictures' : '사진',
		'ConfSectionShortcuts' : '키보드 단축키',
		'ConfSecureLinks' : '항상 HTTPS를 통해 Facebook을 사용하기.',
		'ConfShortcutList' : '<b>키보드 단축키</b> (대소문자 구분):<br /><br /><i>모든 페이지에서 작동</i>:<br />&nbsp;<b>A</b> - 사진첩/사진<br />&nbsp;<b>B</b> - 접속된 친구 보이기/숨기기<br />&nbsp;<b>C</b> - FFixer 설정<br />&nbsp;<b>D</b> - 생일<br />&nbsp;<b>E</b> - 이벤트<br />&nbsp;<b>F</b> - 친구<br />&nbsp;<b>H</b> - 첫 페이지<br />&nbsp;<b>I</b> - 쪽지<br />&nbsp;<b>K</b> - 즐겨찾기 더하기<br />&nbsp;<b>L</b> - 로그아웃 링크를 선택 (그다음 엔터키를 누르면 로그아웃)<br />&nbsp;<b>N</b> - 알림<br />&nbsp;<b>P</b> - 내 프로필<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - 검색 필드로 커서 이동<br />&nbsp;<b>T</b> - 선택한 텍스트를 번역<br />&nbsp;<b>?</b> - FFixer 디버그 정보 보기<br />&nbsp;<b>&lt;ESC&gt;</b> - FFixer 팝업 사진 닫기<br /><br /><i>홈페이지에서 작동(필터)</i>:<br />&nbsp;<b>a</b> - 페이지<br />&nbsp;<b>f</b> - 최신글<br />&nbsp;<b>g</b> - 그룹<br />&nbsp;<b>l</b> -링크<br />&nbsp;<b>n</b> - 뉴스 피드<br />&nbsp;<b>p</b> - 사진<br />&nbsp;<b>s</b> 또는 <b>u</b> - 상태 업데이트<br />&nbsp;<b>t</b> - 노트<br />&nbsp;<b>v</b> - 비디오<br /><br /><i>프로필 페이지에서 작동</i>:<br />&nbsp;<b>i</b> - 정보<br />&nbsp;<b>p</b> - 사진<br />&nbsp;<b>w</b> - 담벼락<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>이동이 가능한 페이지에서 작동(이전, 다음, 등)</i>:<br />&nbsp;<b>&lt;←&gt;</b> - 이전<br />&nbsp;<b>&lt;→&gt;</b> - 다음<br />&nbsp;<b>&lt;Shift&gt; + &lt;←&gt;</b> - 처음 (가능할때만)<br />&nbsp;<b>&lt;Shift&gt; + &lt;→&gt;</b> - 마지막 (가능할때만)<br /><br /><i>사진첩/사진을 볼때 작동</i>:<br />&nbsp;<b>a</b> - 모든 썸네일 보기 (가능할때만)<br />&nbsp;<b>b</b> - 큰 사진 보이기<br />&nbsp;<b>c</b> - 댓글 보기<br />&nbsp;<b>k</b> - 사진첩으로 돌아가기<br />&nbsp;<b>m</b> - 내가(또는 친구가) 나온 사진<br /><br /><i>최근 사진첩이나 업로드/태그된 사진을 볼때 작동:</i><br />&nbsp;<b>a</b> 또는 &nbsp;<b>r</b> - 최근 사진첩<br />&nbsp;<b>m</b> 또는 <b>u</b> - 모바일 업로드<br />&nbsp;<b>o</b> - 내가 나온 사진<br />&nbsp;<b>p</b> -내 사진<br />&nbsp;<b>t</b> 또는 <b>f</b> - 태그 된 친구들',
		'ConfShortcuts' : '키보드 단축키 사용.',
		'ConfSign' : '친구의 프로필에 친구의 별자리 표시 (생년월일을 공개한 경우).',
		'ConfTopBarFixed' : '맨 위 메뉴 표시줄을 아래로 스크롤 한 후에도 보이기.',
		'ConfTopBarHoverOpacity' : '마우스 커서를 올려놨을때',
		'ConfTopBarOpacity' : '맨 위 메뉴 표시줄의 투명도',
		'ConfUpdates' : '매일 Userscripts.org에서 FFixer 업데이트를 확인하기. <a href="#" id="fbfUpdateLink" onclick="return false;">지금 확인</a>.',
		'DownloadVideo' : '비디오 다운로드',
		'ExportICalendarFile' : 'iCalender 파일로 가져오기',
		'ExportICalendarFileWarning' : '(친구가 많으면 오래 걸릴 수 있습니다)',
		'FacebookFixerConflict' : 'Facebook Fixer의 이름이 FFixer로 바뀌었습니다.<br /><br />Facebook Fixer을 브라우저에서 제거하지 않으면 이름 변경 때문에 충돌이 일어납니다.<br /><br />userscript를 제거하는 방법을 모르겠으면 <a %s>여기를 참조하세요</a>.',
		'fullAlbumLoaded' : '앨범 전체가 로딩됨',
		'Import' : '가져오기',
		'ImportConfirm' : '정말로 설정을 가져오시겠습니까?\n현재 설정은 삭제됩니다.',
		'ImportFailure' : '설정을 가져오는 도중 에러가 났습니다.',
		'ImportSuccess' : '성공적으로 설정을 가져왔습니다. 새로고침 하시겠습니까?',
		'Left' : '왼쪽',
		'LoadingAllPhotos' : '모든 사진을 로딩중...',
		'loadingFullAlbum' : '앨범 전체를 로딩중...',
		'LoadingPic' : '사진 로딩중...',
		'LoadPhotosWarning' : '모든 사진을 로딩하는데 시간이 오래 걸릴 수 있습니다',
		'Months' : new Array('1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'),
		'ProtocolSkype' : 'Skype로 %s와 전화하기',
		'ProtocolMSN' : 'Windows Live로 %s와 채팅하기',
		'ProtocolYahoo' : '야후 메신저로 %s와 채팅하기',
		'ProtocolGoogle' : '구글 토크로  %s와 채팅하기',
		'ReloadErrorPage' : '재시도 하려면 클릭하거나 5초를 기다리세요',
		'Refresh' : '새로고침',
		'Remove' : '제거',
		'Right' : '오른쪽',
		'ShowBigPictures' : '큰 사진 보기',
		'Signs' : new Array('염소자리','물병자리','물고기자리','양자리','황소자리','쌍둥이자리','게자리','사자자리','처녀자리','천칭자리','전갈자리','궁수자리'),
		'today' : '오늘',
		'Translators' : '번역한 사람',
		'UpdateAvailable1' : 'FFixer 업데이트가 나왔습니다',
		'UpdateAvailable2' : '지금 업데이트 할까요?',
		'UpdateHomepage' : '홈페이지로 가기',
		'UpdateInstall' : '지금 인스톨 하기',
		'UpdateTomorrow' : '내일 다시 확인',
		'ViewAlbumComments' : '사진첩에 달린 댓글 모두보기',
		'yearsOld' : '%s살'
	},
	
	// Vietnamese - Contributed by Trần Đức Thịnh (20100104)
	// Hi vọng nhận được góp ý của mọi người về bản dịch, email: tranducthinh4102@gmail.com
	vi : {
		'_language' : 'Tiếng Việt',
		'AddToCalendar' : 'Thêm vào lịch',
		'AddToGoogleCalendar' : 'Thêm vào lịch của Google',
		'all' : 'tất cả',
		'All' : 'Tất cả',
		'AllPhotosLoaded' : 'Tải tất cả các bức ảnh',
		'Automatic' : 'Tự động',
		'Birthday' : 'sinh nhật của %s',
		'BookmarkAdd' : 'Thêm Bookmark mới',
		'BookmarkExists' : 'Trang này đã được đánh dấu.\n\nTruy cập vào trang bạn muốn đánh dấu và thử lại.',
		'BookmarkNamePrompt' : 'Đặt tên cho trang đánh dấu này:\n%s',
		'BookmarksConfirmRemoval' : 'Bạn muốn xóa các bookmark đã chọn?',
		'BookmarksManage' : 'Quản lý Bookmarks',
		'BookmarksRemoveSelected' : 'Xóa các Bookmarks đã chọn',
		'Bookmarks' : 'Bookmarks',
		'BrowserUnsupported' : 'Trình duyệt của bạn không hỗ trợ tính năng này.',
		'CreatingFile' : 'Tạo tập tin',
		'Close' : 'Đóng',
		'ConfigureFacebookFixer' : 'Cài đặt FFixer',
		'ConfigureInstructions' : 'Mọi thiết lập sẽ được lưu ngay lập tức, nhưng một số thay đổi không có tác dụng trong các thẻ đang mở.',
		'ConfAge' : 'Hiển thị tuổi của một người trong thông tin của họ (nếu họ cung cấp ngày sinh đầy đủ).',
		'ConfAlbumComments' : 'Thêm một liên kết để hiển thị tất cả các bình luận về album ở phía trên album',
		'ConfApplicationWhitelist' : 'Danh sách trắng các ứng dụng - Nhập ID của các ứng dụng để nó không bị ẩn. Các ID cách nhau bởi khoảng trắng (dấu cách).',
		'ConfAutoBigAlbumPictures' : 'Tự động hiển thị hình ảnh lớn hơn khi trang web mở ra.',
		'ConfAutoLoadFullAlbum' : 'Tự động tải thumbnails của tất cả hình ảnh của album trong một trang web.',
		'ConfAutoLoadTaggedPhotos' : 'Tự động tải thumbnnails cho tất cả các hình ảnh được tag trong một trang (the photos tab on people\'s profiles).',
		'ConfAutoReadMore' : 'Tự động click vào liên kết "see more".',
		'ConfBigAlbumPictures' : 'Thêm liên kết trên các album để hiển thị các phiên bản lớn hơn của các hình ảnh trên trang đó',
		'ConfBigAlbumPicturesBorder' : 'Thêm viền xung quanh phiên bản lớn hơn của hình ảnh',
		'ConfBookmarks' : 'Thêm menu Bookmarks vào thanh trình đơn trên cùng.',
		'ConfBottomBarHoverOpacity' : 'Khi chuột ở trên',
		'ConfBottomBarOpacity' : 'Độ trong suốt của thanh thực đơn phía dưới',
		'ConfCalendarBirthDate' : 'Bao gồm ngày sinh trong những chi tiết sự kiện.',
		'ConfCalendarFullName' : 'Sử dụng tên đầy đủ như tiêu đề cho ngày sinh (thay vì chỉ là tên).',
		'ConfChatDifferentiate' : 'Sử dụng chữ in đậm và in nghiêng để phân biệt bạn bè đang online và đang rỗi.',
		'ConfChatHideIdle' : 'Ẩn những bạn bè đang rỗi.',
		'ConfDelayPopupPics' : 'Thêm một khoảng trễ trước khi hiển thị hình ảnh bung ra.',
		'ConfDelayPopupPicsTimeout' : 'Thời gian trước khi hiển thị hình ảnh bung ra, trong mili giây (mặc định=500):',
		'ConfDownloadVideo' : 'Thêm một liên kết để tải xuống các video thừ các trang video. (Bạn có thể cần một <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">chương trình chơi FLV</a>)',
		'ConfErrorPageReload' : 'Tự động tải lại những trang ứng dụng lỗi sau 5 giây.',
		'ConfExport' : 'Để trích xuất các thiết lập của bạn, sao chép đoạn văn bản dưới đây và lưu nó trong một tập tin.',
		'ConfExternalPopup' : 'Phiên bản đúng kích cỡ của hình ảnh. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Ngôn ngữ cho FFixer',
		'ConfFacebookTimestamps' : 'Hiện mốc thời gian của facebook (ví dụ: "3 hours ago").',
		'ConfFBFTimestamps' : 'Thêm mốc thời gian của FFixer sau mốc thời gian của Facebook (ví dụ: "11:45").',
		'ConfFBFTimestamps24' : 'Hiển thị mốc thời gian của FFixer dạng 24 giờ.',
		'ConfFriendRequestCountInTitle' : 'Hiển thị số yêu cầu kết bạn trong tiêu đề của trang.',
		'ConfGoogleApps' : 'Tạo Google Calendar tương thích với Google Apps',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Thêm liên kết để thêm ngày sinh và các sự kiện cho <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Language for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Ẩn lịch sử của các ứng dụng.',
		'ConfHideEventStories' : 'Ẩn lịch sử các sự kiện.',
		'ConfHideFacebookCountInTitle' : 'Ẩn số tin nhắn trong hộp thư đến của  Facebook.',
		'ConfHideFriendStories' : 'Ẩn lịch sử của bạn bè.',
		'ConfHideGroupStories' : 'Ẩn lịch sử của nhóm.',
		'ConfHideLikeStories' : 'Ẩn lịch sử "Thích".',
		'ConfHideLinkStories' : 'Ẩn lịch sử của liên kết.',
		'ConfHideNoteStories' : 'Ẩn lịch sử của ghi chú.',
		'ConfHidePhotoStories' : 'Ẩn lịch sử của hình ảnh.',
		'ConfHidePlaceStories' : 'Ẩn lịch sử của địa chỉ.',
		'ConfHideProfilePicStories' : 'Ẩn lịch sử của hình ảnh profile.',
		'ConfHideRead' : 'Ẩn những mục trong feed đã đánh dấu là đã đọc.',
		'ConfHideRelationshipStories' : 'Ẩn lịch sử quan hệ.',
		'ConfHideStatusStories' : 'Ẩn lịch sử trạng thái.',
		'ConfHideVideoStories' : 'Ản lịch sử video.',
		'ConfHideWallStories' : 'Ẩn lịch sử của tường.',
		'ConfHomeBeta' : 'Hiển thị Facebook Sneak Peek.',
		'ConfHomeChat' : 'Hiển thị Chat.',
		'ConfHomeEvents' : 'Hiển thị Events.',
		'ConfHomeFindFriends' : 'Hiển thị Kết Nối.',
		'ConfHomeLeftAlign' : 'Căn trái nội dung của trang chủ.',
		'ConfHomeLeftColumn' : 'Hiển thị cột bên trái.',
		'ConfHomeLeftColumnFixed' : 'Hiển thị cột bên trái, ngay cả khi cuộn xuống.',
		'ConfHomeLink' : 'Hiển thị liên kết "Trang Chủ" trong thanh thực đơn trên cùng.',
		'ConfHomeNavigation' : 'Hiển thị Danh Mục',
		'ConfHomePokes' : 'Hiển thị Pokes',
		'ConfHomeProfile' : 'Hiển thị "Thông tin".',
		'ConfHomeRecommendations' : 'Hiển thị recommendations (People You May Know, Recommended Pages etc).',
		'ConfHomeRequests' : 'Hiển thị Requests.',
		'ConfHomeRightColumn' : 'Hiển thị cột bên phải.',
		'ConfHomeStretch' : 'Hiển thị trang chủ hết chiều rộng của trình duyệt',
		'ConfHomeStretchComments' : 'Kéo căng những bình luận trên trang chủ',
		'ConfiCalendar' : 'Thêm liên kết để tải về một tập tin <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> có tất cả ngày sinh.',
		'ConfImport' : 'Để nhập các thiết lập của bạn, ghi đè lên đoạn văn bản dưới đây bằng các đoạn bạn đã lưu trước đó và kích vào nút "Nhập Vào".',
		'ConfInboxCountInTitle' : 'Hiển thị số tin nhắn trong hộp thư đến trên tiêu đề trang.',
		'ConfLogoutLink' : 'Thêm một liên kết "Đăng xuất" vào thanh trình đơn trên cùng.',
		'ConfNotificationCountInTitle' : 'Hiển thị số thông báo mới trong tiêu đề trang.',
		'ConfNewTabSearch' : 'Để kết quả tìm kiếm mở trong một thẻ/cửa sổ mới khi nhấn Ctrl + Enter khi tìm kiếm',
		'ConfPageTitle' : 'Xóa "Facebook |" khỏi tiêu đề của mọi trang.',
		'ConfPhotoPopup' : 'Bung ra bản lớn hơn của những bức ảnh khi để chuột ở trên hình ảnh.',
		'ConfPopupAutoClose' : 'Tự động đóng hình ảnh bung ra.',
		'ConfPopupSmartAutoClose' : 'Không tự động đóng hình ảnh đã bung ra khi con chuột ở trên nó.',
		'ConfPopupPosition' : 'Vị trí bung hình ảnh',
		'ConfProcessInterval' : 'Khoảng thời gian để xử lý các trang, tính bằng mili giây (mặc định =1000):',
		'ConfProfileLink' : 'Hiển thị liên kết "Trang cá nhân" trên thanh trình đơn trên cùng.',
		'ConfProfilePicPopup' : 'Bung ra hình ảnh của ảnh cá nhân khi để chuột ở trên ảnh',
		'ConfProtocolLinks' : 'Turn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Thông tin về FFixer',
		'ConfSectionAdvanced' : 'Lựa chọn nâng cao',
		'ConfSectionEvents' : 'Sinh nhật/Sự Kiện',
		'ConfSectionImportExport' : 'Nhập Vào/Trích Xuất',
		'ConfSectionFeeds' : 'Feeds',
		'ConfSectionHomePage' : 'Trang Chủ',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menus/Chat',
		'ConfSectionOther' : 'Lựa chọn khác',
		'ConfSectionPageTitle' : 'Tiêu đề trang',
		'ConfSectionPictures' : 'Hình ảnh',
		'ConfSectionShortcuts' : 'Phím tắt',
		'ConfSecureLinks' : 'Bắt buộc các link của facebook sử dụng giao thức https:// .',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - Tùy Chỉnh FFixer<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show FFixer debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by FFixer<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Kích hoạt tính năng phím tắt.',
		'ConfSign' : 'Hiện chòm sao của một người trong thông tin của họ (nếu họ cung cấp đầy đủ ngày sinh).',
		'ConfTopBarFixed' : 'Giữ thanh thực đơn luôn phía trên màn hình, cả khi di chuyển xuống.',
		'ConfTopBarHoverOpacity' : 'Khi chuột ở trên',
		'ConfTopBarOpacity' : 'Độ trong suốt của thanh thực đơn phía trên',
		'ConfUpdates' : 'Hãy truy cập vào Userscripts.org hàng ngày để cập nhật FFixer. hoặc <a href="#" id="fbfUpdateLink" onclick="return false;">kiểm tra ngay</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(Điều này sẽ mất một khoảng thời gian nếu bạn có rất nhiều bạn bè)',
		'FacebookFixerConflict' : 'Facebook Fixer nay được gọi là FFixer.<br /><br />Bởi vì thay đổi tên nên bạn cần phải tự gỡ bỏ Facebook Fixer từ trình duyệt của bạn, hoặc hai kịch bản sẽ xung đột với nhau.<br /><br />Nếu bạn không biết gỡ bỏ một userscript, <a %s>bấm vào đây để được hướng dẫn</a>.',
		'fullAlbumLoaded' : 'tải đầy đủ album',
		'Import' : 'Nhập vào',
		'ImportConfirm' : 'Bạn có chắc chắn muốn nhập các thiết lập này?\nCác cài đặt hiện tại của bạn sẽ bị mất.',
		'ImportFailure' : 'Đã xảy ra lỗi khi nhập các thiết lập của bạn.',
		'ImportSuccess' : 'Quá trình nhập hoàn thành. Bạn có muốn tải lại trang?',
		'Left' : 'Bên trái',
		'LoadingAllPhotos' : 'Đang tải tất cả các ảnh...',
		'loadingFullAlbum' : 'Đang tải tất cả album...',
		'LoadingPic' : 'Đang tải ảnh...',
		'LoadPhotosWarning' : 'Tải tất cả các hình ảnh có thể mất một thời gian dài',
		'Months' : new Array('Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'),
		'ProtocolSkype' : 'Gọi cho %s bằng Skype',
		'ProtocolMSN' : 'Chat với %s bằng Windows Live',
		'ProtocolYahoo' : 'Chat với %s bằng Yahoo Messenger',
		'ProtocolGoogle' : 'Chat với %s bằng Google Talk',
		'ReloadErrorPage' : 'Click để thử lại, hoặc đợi 5 giây',
		'Refresh' : 'Làm Tươi',
		'Remove' : 'Xóa',
		'Right' : 'Bên phải',
		'ShowBigPictures' : 'Hiển thị hình ảnh lớn',
		'Signs' : new Array('Ma Kết','Bảo Bình','Song Ngư','Dương Cưu','Kim Ngưu','Song Tử','Cự Giải','Sư Tử','Xử Nữ','Thiên Bình','Hổ Cáp','Nhân Mã'),
		'today' : 'hôm nay',
		'Translators' : 'Translators',
		'UpdateAvailable1' : 'Đã có bản cập nhật mới cho FFixer',
		'UpdateAvailable2' : 'Bạn có muốn cập nhật ngay?',
		'UpdateHomepage' : 'Đi đến trang chủ',
		'UpdateInstall' : 'Cài đặt ngay',
		'UpdateTomorrow' : 'Nhắc lại sau',
		'ViewAlbumComments' : 'Xem bình luận về album',
		'yearsOld' : '%s tuổi'
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
var buf  =	'ProfilePicPopup,PhotoPopup,ExternalPopup,!DelayPopupPics,PopupAutoClose,!PopupSmartAutoClose,!PopupWhileTagging,BigAlbumPictures,BigAlbumPicturesBorder,!AutoBigAlbumPictures,!AutoLoadFullAlbum,!AutoLoadTaggedPhotos,'+
			'Age,Sign,iCalendar,GoogleCalendar,CalendarFullName,CalendarBirthDate,!GoogleApps,'+
			'!HomeLeftAlign,!HomeStretch,!HomeStretchComments,!HomeLeftColumnFixed,HomeLeftColumn,HomeRightColumn,HomeProfile,HomeNavigation,HomeChat,!HomeChatNames,HomePokes,HomeFindFriends,HomeEvents,HomeRequests,HomeBeta,HomeRecommendations,'+
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
	var months = new Array (/^(.*\s)?(jan(uar[iy]?)?|enero|janvier|gennaio|janeiro|ιανουαρίου|јануар|януари|januára|leden)(\s.*)?$/,
							/^(.*\s)?(feb(ruar[iy]?)?|febrero|février|febbraio|fevereiro|φεβρουαρίου|фебруар|февруари|februára|únor)(\s.*)?$/,
							/^(.*\s)?(mar(ch)?|marzo|mars|märz|maart|março|μαρτίου|март|marca|březen)(\s.*)?$/,
							/^(.*\s)?(apr(ile?)?|abril|avril|απριλίου|април|apríla|duben)(\s.*)?$/,
							/^(.*\s)?(ma(yo?|i|j)|mei|maggio|maio|μαΐου|мај|май|mája|květen)(\s.*)?$/,
							/^(.*\s)?(june?|junio?|juin|giugno|junho|ιουνίου|јун|юни|júna|červen)(\s.*)?$/,
							/^(.*\s)?(jul[iy]?|julio|juillet|luglio|julho|ιουλίου|јул|юли|júla|červenec)(\s.*)?$/,
							/^(.*\s)?(aug(ust(i|us)?)?|agosto|août|αυγούστου|август|augusta|srpen)(\s.*)?$/,
							/^(.*\s)?(sep(tember)?|septiembre|se[pt]tembre|setembro|σεπτεμβρίου|септембар|септември|septembra|září)(\s.*)?$/,
							/^(.*\s)?(o[ck]t(ober)?|oct[ou]bre|ottobre|outubro|οκτωβρίου|октобар|октомври|októbra|říjen)(\s.*)?$/,
							/^(.*\s)?(nov(ember)?|noviembre|novembre|novembro|νοεμβρίου|новембар|ноември|novembra|listopad)(\s.*)?$/,
							/^(.*\s)?(de[cz](ember)?|dici?embre|décembre|dezembro|δεκεμβρίου|децембар|декември|decembra|prosinec)(\s.*)?$/);
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
	t = JSON.parse(r.responseText.replace('],,"', '],"","'));
	translated = Array();
	for (var i=0; i<t[0].length; i++) { translated.push(t[0][i][0]); }
	showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; "><b>Translated Text via Google Translate</b> (from ' + t[2] + ' to ' + prefs['GoogleLanguage'] + '):<br /><br />' + translated.join(' ') + '<div style="text-align:right;"><input id="fbfCloseTranslation" type="button" value="' + $l('Close') + '" /></div></div>', true, true);
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
					makeCheckBoxes('HomeStretch,HomeStretchComments,HomeLeftAlign,HomeLeftColumnFixed,HomeLeftColumn')+
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
					makeCheckBoxes('AutoBigAlbumPictures,AutoLoadFullAlbum,AutoLoadTaggedPhotos') +
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
					'<tr><td><span class="fbfLabel">' + $l('ConfFacebookFixerLanguage') + ':</span></td><td><select id="fbfConfFacebookFixerLanguage" style="padding:0; margin-top:3px;"><option value="auto">' + $l('Automatic') + '</option><option value="cs">Čeština (Czech)</option><option value="sr_rs">Српски (Serbian - Cyrillic)</option><option value="da">Dansk (Danish)</option><option value="el">Ελληνικά (Greek)</option><option value="en">English</option><option value="es">Español (Spanish)</option><option value="fr">Français (French)</option><option value="de">Deutsch (German)</option><option value="it">Italiano (Italian)</option><option value="mk">македонски јазик (Macedonian)</option><option value="nl">Nederlands (Dutch)</option><option value="nb">Norsk (Norwegian)</option><option value="sk">Slovenčina (Slovak)</option><option value="sr">Srpski (Serbian - Latin)</option><option value="vi">Tiếng Việt (Vietnamese)</option><option value="tr">Türkçe (Turkish)</option><option value="bg">Български (Bulgarian)</option><option value="zh_tw">中文(台灣) (Chinese - Taiwan)</option><option value="ko">한국어 (Korean)</option></select></td></tr>'+
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
					'<br /><br />Custom Feed Modification:<br /><textarea id="fbfConfCustomFeedModification" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom Feed Modification" id="SaveCustomFeedModification" />'+
					'<br /><br />Custom CSS:<br /><textarea id="fbfConfCustomCSS" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom CSS" id="SaveCustomCSS" />'+
				'</div>'+
				'<div id="fbfConfigControl-10">'+
					'<span xmlns:dc="http://purl.org/dc/elements/1.1/" property="dc:title"><a href="http://www.code-poet.net/userscripts/facebook-fixer/index.html" target="_blank">FFixer</a></span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Vaughan Chandler</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike 3.0 Unported License</a>.<br /><br />Facebook is a registered trademark of Facebook, Inc.<br />FFixer is not related to or endorsed by Facebook, Inc. in any way.<br /><br /><a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0;" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><br /><b>' + $l('Translators') + ':</b><ul><li>Acedia.Liu - Chinese (Taiwan)</li><li>Caken - Czech</li><li>Connum - German</li><li>dnbace - Bulgarian</li><li>DoSMaN - Greek</li><li>Eilif Nordseth - Norwegian</li><li>Glen Farmer - Spanish</li><li>Goce Manevski - Macedonian</li><li>Gökhan Gurbetoğlu - Turkish</li><li>Gorštak - Serbian (Cyrillic and Latin)</li><li>HeartRipper - Italian</li><li>Larissa van Sunder - Dutch</li><li>Mads Jensen - Danish</li><li>Neo - Spanish</li><li>Peter Miksik - Slovak</li><li><li>Serge Thiry - French</li><li>Trần Đức Thịnh - Vietnamese</li><li>박상빈 - Korean</li></ul>'+
				'</div>'+
			'</td></tr>'+
		'</table>'+
		'<br /><hr /><div style="text-align:right;"><input type="button" value="' + $l('Refresh') + '" onclick="location.reload();" /> <input type="button" id="fbfCloseConfig" value="' + $l('Close') + '" /></div>'+
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
// Make simple CSS changes:
//	Hide/style available/idle buddies
//	Hide ego sections
//	Hide hovercards
//	Automatically show "read more" text
//	Add border to big album pictures
//	Hide Facebook timestamps (x minutes ago)
//	Hide specified sections of the left/right column
//
var style='';
if (prefs['ChatDifferentiate'])			{ style = style + ' .fbChatBuddylist a.friend, #pagelet_chat_home_facepile a.chatOnline { font-weight:bold; } .fbChatBuddylist a.idle, #pagelet_chat_home_facepile a.chatIdle { font-weight:normal; font-style:italic; }'; }
if (prefs['ChatHideIdle'])				{ style = style + ' body .fbChatBuddylist a.idle { max-height:0; overflow:hidden; padding-top:0; padding-bottom:0; }'; }
if (prefs['HideEgos'])					{ style = style + ' .ego_column, .netego_organic, #netego_organic, #pagelet_netego, #pagelet_netego_lower, #pagelet_betabox { display:none; } #pagelet_netego_requests div.ego_column, #pagelet_netego_pokes div.ego_column { display:block; }'; }
if (prefs['HideHovercards'])			{ style = style + ' .HovercardOverlay { display:none; }'; }
if (prefs['AutoReadMore'])				{ style = style + ' .text_exposed_root .text_exposed_hide { display:none; } .text_exposed_root .text_exposed_show { display:inline; }'; }
if (prefs['BigAlbumPicturesBorder'])	{ style = style + ' #FBFBigAlbum a { padding:0 1px 1px 0; } #FBFBigAlbum img { border:1px solid #ccc; background:#fff; min-width:20px; min-height:20px; }'; }
if (!prefs['FacebookTimestamps'])		{ style = style + ' abbr.timestamp { display:none; }'; }
if (!prefs['HomeProfile'])				{ style = style + ' #pagelet_welcome_box { display:none; }'; }
if (!prefs['HomeNavigation'])			{ style = style + ' #pagelet_navigation { display:none; }'; }
if (!prefs['HomeChat'])					{ style = style + ' #pagelet_chat_home_facepile { display:none; }'; }
if (!prefs['HomePokes'])				{ style = style + ' #pagelet_netego_pokes { display:none; }'; }
if (!prefs['HomeRecommendations'])		{ style = style + ' #pagelet_netego, #pagelet_netego_lower { display:none; }'; }
if (!prefs['HomeFindFriends'])			{ style = style + ' #pagelet_netego_lower { display:none; }'; }
if (!prefs['HomeEvents'])				{ style = style + ' #pagelet_eventbox { display:none; }'; }
if (!prefs['HomeRequests'])				{ style = style + ' #pagelet_netego_requests { display:none; }'; }
if (!prefs['HomeBeta'])					{ style = style + ' #pagelet_betabox { display:none; }'; }
if (prefs['HomeChatNames']) {
	style = style+' '+
	'#pagelet_chat_home_facepile .uiListHorizontalItem { float:none; }'+
	'#pagelet_chat_home_facepile .uiTooltip .uiTooltipWrap { background:inherit; display:inline; position:relative; visibility:visible; }'+
	'#pagelet_chat_home_facepile .uiTooltipText { background-position:left center; background-color:inherit; color:inherit !important; border-right:none; display:inline-block; line-height:18px; padding:0 0 0 10px; margin-left:3px; width:130px; overflow:hidden; }'+
	'#pagelet_chat_home_facepile .uiProfilePhotoMedium { height:22px; width:22px; }'+
	'#pagelet_chat_home_facepile .facepileItemOverlay { background-image:none !important; }';
}
if (style!='') { addStyle(style); }


//
// Listen for image mouseovers/mouseouts to show/hide popups
//
if (prefs['ProfilePicPopup'] || prefs['PhotoPopup']) {
	
	picRegex = /(https?:\/\/((profile\.|s-hprofile-|photos-|s-hphotos-|secure-media-).*?\.fbcdn\.net|fbcdn-(photos|profile)-a.akamaihd.net).*?(\/[aqst]\d[\d_]+|_[aqst])\.jpg)/;
	picRegex2 = /(src|url)=([^&]+)/;
	profilePixRegex = /\bfbcdn(.net|-profile-)/;

	function showPopupPic(e) {
		try {
			var t = e.target;
			
			var oldSrc;
			var newSrc;
			var title;

			if (t.tagName == 'IMG' && picRegex.test(t.src)) { oldSrc = t.src + '#1'; }
			else if (t.tagName == 'IMG' && (m=picRegex.exec(t.style.backgroundImage))) { oldSrc = m[1] + '#2'; }
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

function addBigAlbumPicLinks2() {
	if (!$('#fbfbaplink0')) {
		var a = document.createElement('a');
		a.innerHTML = $l('ShowBigPictures');
		a.className = 'fbfbaplink';
		a.id = 'fbfbaplink0';
		if ((container = $('.uiHeaderSubTitle', '#content')) && container[0]) {
			container[0].appendChild(document.createTextNode(' · '));
			container[0].appendChild(a);
		} else if ((container = $('.uiHeaderTitle', '#content')) && container[0]) {
			container[0].containerNode.appendChild(a);
		}
		on('click', a, function(e) {
			var table = $('./following::table[contains(@class,"fbPhotosGrid")]', e.target, true);
			var cells = $('td', table);
			var buf = '';
			for (i=0; i<cells.length; i++) {
				var src = (cells[i].getAttribute('data-src',null) || cells[i].innerHTML).match(/(https?:\/\/[^"]+\.jpg)/);
				if (src) { src=src[0]; }
				else { continue; }
				var href = $('a', cells[i])[0].href;
				var title = $('i', cells[i])[0].getAttribute('title') || '';
				buf+= '<a href="' + href + '">'+
					'<img src="' + src.replace(/\/[as]([\d_]+)\.jpg/, '/n$1.jpg').replace(/\/([\d_]+)[as]\.jpg/, '/$1n.jpg') + '" title="' + title + '" />'+
					'</a>';
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

				try {
					if (homePageNotModified) {
						
						// Fixed positioning for left column
						if (prefs['HomeLeftColumnFixed']) { addStyle('#leftCol { position:fixed; }'); }

						// Hide the left column
						if (!prefs['HomeLeftColumn']) { addStyle('#mainContainer #leftCol { display:none; } #mainContainer #contentCol { margin-left:5px; }'); }

						// Hide the right column
						if (!prefs['HomeRightColumn']) { addStyle('#mainContainer #rightCol { display:none; }'); }
						
						// Stretch comments
						if (prefs['HomeStretchComments']) { addStyle('.fbx .commentable_item .uiUfi { width:auto; } .uiUfiAddComment textarea, .uiUfiAddComment .commentBtn { float:none; margin-right:10px; }'); }
						
						// Stretch the home page
						if (prefs['HomeStretch']) {
							addStyle('.fbx #globalContainer { width:auto; margin:auto 7px; } .fbx #fbf-page-head-container { width:auto; }');
							if (prefs['TopBarFixed']) { addStyle('.fbx #headNavOut { width:' + ($('#contentCol').clientWidth-16) + 'px; }'); }
						}

						// Or left align the home page
						else if (prefs['HomeLeftAlign']) { addStyle('#globalContainer { margin:0 0 0 5px; ! important; }'); }

						homePageNotModified = false;
					}
				} catch(x) { logError('Home CSS', x); }

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
										else if (m = rule.match(/^-\s*(.+)$/)) { blockedStoryXPath.push("contains(string(),'" + m[1] + "')"); }
										else if (m = rule.match(/^\+\s*(\d+)$/)) { highlightedStoryXPath.push("contains(@data-ft,'\"sty\":" + m[1] + ",')"); }
										else if (m = rule.match(/^\+\s*(.+)$/)) { highlightedStoryXPath.push("contains(string(),'" + m[1] + "')"); }
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
	// Show big album pictures
	//
	if (prefs['BigAlbumPictures']) {
		if (page.match(/^album.php/) || page.match(/^photo_search.php/) || page.match(/^media\/set\//) || page.match(/^profile.php\?.*\bv=photos/) || page.match(/^pages\/.*\?.*\bv=photos/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1 && page.indexOf('v=photos')!=-1)) {
			try {
				var parents;
				if (page.indexOf('album.php')!=-1 || page.indexOf('photo_search.php')!=-1 || page.indexOf('media/set/')!=-1) {
					addBigAlbumPicLinks2();
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
							var name = $('#profile_name').innerHTML.split('<span')[0].replace(/^\s*|\s*$/g, '');
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
