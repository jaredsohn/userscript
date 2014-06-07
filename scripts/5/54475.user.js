// ==UserScript==
// @name           Minimal EtherPad
// @description    Greatly simplifies the `EtherPad' web interface.
// @version        0.1
// @author         KIKAWA Hihariiro
// @manage         http://etherpad.com/*
// @manage         http://*.etherpad.com/*
// @manage         https://etherpad.com/*
// @manage         https://*.etherpad.com/*
// ==/UserScript==

(function () {

// Removes The `EtherPad' Banner
document.getElementById('padtop').style.display = 'none';

// Removes The Editting Toolbar
// document.getElementById('editbar').style.display = 'none';

// Removes The Sidebar
document.getElementById('padsidebar').style.display = 'none';

// Sets the `Editor' Width to 100%
document.getElementById('padeditor').style.width="100%"

// Removes The Footer Buttons
// document.getElementById('bottomarea').style.display = 'none';

// Removes the `Zoom' Drop-Down Box in the Footer *UNNECESSARY IF REMOVING THE FOOTER BUTTONS*
// document.getElementById('viewzoomtitle').style.display = 'none';

// Removes the `Feedback' Button in the Footer *UNNECESSARY IF REMOVING THE FOOTER BUTTONS*
document.getElementById('feedbackbutton').style.display = 'none';

// Removes the `Sidebar' Button in the Footer *UNNECESSARY IF REMOVING THE FOOTER BUTTONS*
document.getElementById('sidebarcheck').style.display = 'none';

// Removes the `Full Window' Button in the Footer *UNNECESSARY IF REMOVING THE FOOTER BUTTONS*
document.getElementById('widthprefcheck').style.display = 'none';

} () );
