// ==UserScript==
// @name         Life of German BlueDesign
// @version      1.0
// @description  LoG Blue Design
// @copyright    2014, Dezor
// @include      http://forum.life-of-german.org/*
// @include      https://forum.life-of-german.org/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}



//83868B = blau
//Schriftzug 
addGlobalStyle('h2, h2 a, h2 a:hover { color: #83868B; }');
addGlobalStyle('.userPanel a, body, legend { color: #83868B; }');
//Main
addGlobalStyle('#main { background: url("http://files.life-of-german.org/forenplugin/blau-grau/main.png") repeat-y left top; }');
addGlobalStyle('#mainContainer { background: url("http://files.life-of-german.org/forenplugin/blau-grau/background_forum.png"); }');
addGlobalStyle('.containerHead, .inlineCalendarFooter td, .inlineCalendarHeader td { background-image: url("http://files.life-of-german.org/forenplugin/blau-grau/containerHead.png"); }');
addGlobalStyle('.containerHead { border-top: 0px solid #505050 !important; padding: 7px; background-position: center; }');
addGlobalStyle('.boardTitle a { font-size: 14px; color: #83868B; }');
addGlobalStyle('.userPanel a, body, legend { color: #83868B; }');
addGlobalStyle('a, div.pageMenu .twoRows a span { color: #83868B; }');
//Inner Tabmenu
addGlobalStyle('.subTabMenu ul .activeSubTabMenu a, .subTabMenu ul li a { border-color: rgba(255, 255, 255, 0); }'); //border #6B788D
addGlobalStyle('.subTabMenu ul .activeSubTabMenu a { background-color: rgba(255, 255, 255, 0); }'); //background #6B788D
addGlobalStyle('.subTabMenu ul:hover .activeSubTabMenu a:hover, .subTabMenu ul:hover li:hover a:hover { border-color: rgba(255, 255, 255, 0); }'); // hover
addGlobalStyle('.subTabMenu ul li a:hover { background-color: rgba(255, 255, 255, 0);}'); //anderer Tab hover
addGlobalStyle('.subTabMenu ul:hover .activeSubTabMenu a:hover { background-color: rgba(255, 255, 255, 0); }'); //hover
//ContentBox | Neuigkeiten
addGlobalStyle('a:hover, div.pageMenu .twoRows a:hover span { color: #2F3E57; }') //links vor thread 
addGlobalStyle('.mainMenu a:hover { color: #2F3E57; }') //links zB user
addGlobalStyle('.boardTitle a:hover, .boardRecentList .new a:hover {color: #2F3E57; }'); // Nicht gelesene Links + hover
addGlobalStyle('.formFieldDesc, .light { color: #83868B; }'); 

//outer Tabmenu
addGlobalStyle('li.activeTabMenu a, .tabMenu li.activeTabMenu a {background-color: #5C778F; }'); //aktiver Tab
addGlobalStyle('li.activeTabMenu a, .tabMenu li.activeTabMenu a:hover { background-color: #5C778F; }'); //aktiver Tab + hover
addGlobalStyle('.tabMenu li a, .tabMenu li.disabled a:hover {background-color: #6E899B; }'); //inaktive Tabs
addGlobalStyle('.tabMenu li a:hover, .tabMenu li.disabled a {background-color: #6E899B; }'); //inaktive Tabs + hover


//UserPanel
addGlobalStyle('#userPanelMenu .new a, #userPanelMenu .new a span { color: #2F3E57 !important; }');
addGlobalStyle('#userPanelDropdown { position: absolute; margin-top: 40px; margin-left: -35px; min-width: 320px; max-width: 380px; padding: 15px; background: #EEEEEE; border-radius: 7px; z-index: 999; border-top: 1px solid #fbf8f8; border-bottom: 1px solid #fbf8f8; box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5); }');
addGlobalStyle('#userPanelDropdown:after { border-bottom: 7px solid #EEEEEE;');
//logedin
addGlobalStyle('#userNote a { color: #83868B !important; }') //name
addGlobalStyle('#userNote a:hover { color: #FFFFFF !important; }') //name hover
//Content
addGlobalStyle('#headerContainer { background: url("http://files.life-of-german.org/forenplugin/blau-grau/headerContainer.png") repeat-x center top; height: 477px; }');
addGlobalStyle('#mainMenu { background: url("http://files.life-of-german.org/forenplugin/blau-grau/mainMenu.png") no-repeat left top; width: 1163px; height: 84px; padding: 0px 50px; font-size: 12px; }');
addGlobalStyle('#mainMenu a { font-family: NimbusSansBeckerP, Arial; line-height: 53px; color: #D9DFE9; text-shadow: 0px 1px 1px #2E2E2E; font-size: 15px; }');
addGlobalStyle('#search { top: 311px; width: 166px; height: 30px; background: url("http://files.life-of-german.org/forenplugin/blau-grau/searchInput.png") no-repeat left top; padding: 0px !important; margin: 0px !important; right: 10px; }');
addGlobalStyle('#searchInput { background: none !important; border: none !important; width: 110px; padding-left: 10px !important; padding-right: 10px; padding-top: 5px; color: #D9DFE9; }');
addGlobalStyle('.new  a, .pageMenu .active a { color: #6F8892; }');
addGlobalStyle('.options a:hover, .smallButtons ul li a:hover, .pageNavigation ul li a:hover, .pageNavigation ul li span, #footer .extraButton a:hover { color: #2E2E2E !important; }');
addGlobalStyle('.activeContainer, .mainMenu div.pageMenu .active a, .markedDayField a, .pageNavigation .active span, div.pageMenu li.active a { color: #83868B; }');

//Mainmenu 
addGlobalStyle('#mainMenu .popupMenu a:hover {color: #2F3E57 !important; background: #D9DFE9 !important; }'); // popupa:hover
addGlobalStyle('#mainMenu .popupMenu a { color: #83868B !important; background: #D9DFE9 !important; }'); //a 
addGlobalStyle('#mainMenu a:hover { color: #2F3E57; text-shadow: 0px 1px 1px #2E2E2E; } ');
addGlobalStyle('#mainMenu .popupMenu { background: #2F3E57; }');
addGlobalStyle('#main .options a, .smallButtons ul li a, .pageNavigation ul li a, .pageNavigation ul li span, #footer .extraButton a {color: #2E2E2E !important; }');

//UserProfile
//Website etc.
addGlobalStyle('.mainMenu div.pageMenu a, .pageNavigation a, .pageNavigation li.children span, .tableList tr div.pageMenu a, div.messageInner div.pageMenu a, div.messageInner div.smallButtons div.pageMenu a, div.pageMenu a, div.smallButtons div.pageMenu a { color: #83868B; }');
addGlobalStyle('.mainMenu div.pageMenu a:hover, .pageNavigation a:hover, .pageNavigation li.children span, .tableList tr div.pageMenu a:hover, div.messageInner div.pageMenu a:hover, div.messageInner div.smallButtons div.pageMenu a:hover, div.pageMenu a:hover, div.smallButtons div.pageMenu a:hover { color: #83868B; }');


//Thread Auswahl - Sortierung
addGlobalStyle('.tableHead .active .emptyHead, .tableHead .active a {background-color: #D9DFE9; }');
addGlobalStyle('.tableHead .active .emptyHead, .tableHead .active a:hover {background-color: #D9DFE9; }');
//addGlobalStyle('.tableHead .emptyHead, .tableHead a { background-color: #D9DFE9; }');
addGlobalStyle('.tableHead a:hover {background-color: #D9DFE9; }');
addGlobalStyle('.tableHead a {background-color: #D9DFE9; }');
addGlobalStyle('.tableHead .emptyHead, .tableHead a { background-color: #D9DFE9; }');



//InThread

//Antworten button
addGlobalStyle('.largeButtons a span { background-image: url("http://files.life-of-german.org/forenplugin/blau-grau/largeButtons-ltr.png"); }');
addGlobalStyle('.largeButtons a { background-image: url("http://files.life-of-german.org/forenplugin/blau-grau/largeButtons-ltr.png"); }');
//User im Thread | message
addGlobalStyle('.message .container-3 { background-color: #D9DFE9; }');
//Verlinkungen im Thread
addGlobalStyle('.messageContent a { color: #83868B; }');
addGlobalStyle('.messageContent a:hover { color: #2F3E57; }');
//TextArea focus (beim Antworten)
addGlobalStyle('.inputText:focus, select:focus, textarea:focus { background-color: #E9E9E9; border-color: #6B788D;}');


//Footer
//Images
addGlobalStyle('#footerContainer {background: url("http://files.life-of-german.org/forenplugin/blau-grau/footer.png") no-repeat left top;}');
addGlobalStyle('body, html { background: url("http://files.life-of-german.org/forenplugin/blau-grau/background_forum.png"); }');
//Links
addGlobalStyle('#footer a { color: #D9DFE9; }');
addGlobalStyle('#footer a:hover { color: #EEEEEE; }');


//------------------imgs------------------
//Logo
var imgs = document.getElementById("logo").getElementsByTagName("img");  
for (var i = 0, l = imgs.length; i < l; i++) { 
    imgs[i].src ="http://files.life-of-german.org/forenplugin/blau-grau/logo.png"; //img[i].src is the reference to the image. 
}  

//Searchbar1
var imgs = document.getElementById("search").getElementsByTagName("input"); 
for (var i = 0, l = imgs.length; i < l; i++) { 
    imgs[i].src ="http://files.life-of-german.org/forenplugin/blau-grau/LoGsearchSubmit.png"; //img[i].src is the reference to the image. 
}  

//Dropdown1
var imgs = document.getElementById("openDropdown").getElementsByTagName("img"); 
for (var i = 0, l = imgs.length; i < l; i++) { 
    imgs[i].src ="http://files.life-of-german.org/forenplugin/blau-grau/LoGDropDownHover.png"; //img[i].src is the reference to the image. 
}  

//Dropdown2
var imgs = document.getElementById("openDropdown").getElementsByTagName("img"); 
for (var i = 0, l = imgs.length; i < l; i++) { 
    imgs[i].src ="http://files.life-of-german.org/forenplugin/blau-grau/LoGDropDownHover.png"; //img[i].src is the reference to the image. 
}  



//Ranggrafiken etc.

// This fetches all of the <img> tags and stores them in "tags".
var tags = document.getElementsByTagName('img');
// This loops over all of the <img> tags.
for (var i = 0; i < tags.length; i++) {
    // This replaces the src attribute of the tag with the modified one
    tags[i].src = tags[i].src.replace('http://forum.life-of-german.org/icon/vCollectionLoG/indexL.png', 'http://files.life-of-german.org/forenplugin/blau-grau/indexL.png'); //LoG Mini-Logo
    tags[i].src = tags[i].src.replace('http://files.life-of-german.org/Forum/Ranggrafiken/Administration.png', 'http://files.life-of-german.org/forenplugin/blau-grau/Administration.png'); //Admin
    tags[i].src = tags[i].src.replace('http://files.life-of-german.org/Forum/Ranggrafiken/Management.png', 'http://files.life-of-german.org/forenplugin/blau-grau/Management.png'); //Management
    tags[i].src = tags[i].src.replace('http://files.life-of-german.org/Forum/Ranggrafiken/Support.png', 'http://files.life-of-german.org/forenplugin/blau-grau/Support.png'); //Support
    tags[i].src = tags[i].src.replace('http://files.life-of-german.org/Forum/Ranggrafiken/Moderation.png', 'http://files.life-of-german.org/forenplugin/blau-grau/Moderation.png'); //Moderation
    tags[i].src = tags[i].src.replace('http://files.life-of-german.org/Forum/Ranggrafiken/Mapping.png', 'http://files.life-of-german.org/forenplugin/blau-grau/Mapping.png'); //Mapping
    tags[i].src = tags[i].src.replace('http://files.life-of-german.org/Forum/Ranggrafiken/Leitung.png', 'http://files.life-of-german.org/forenplugin/blau-grau/Leitung.png'); //Leitung
    tags[i].src = tags[i].src.replace('http://files.life-of-german.org/Forum/Ranggrafiken/scripter.png', 'http://files.life-of-german.org/forenplugin/blau-grau/scripter.png'); //scripter
    tags[i].src = tags[i].src.replace('http://files.life-of-german.org/Forum/Ranggrafiken/Forenverwaltung.png', 'http://files.life-of-german.org/forenplugin/blau-grau/Forenverwaltung.png'); //Forenverwaltung
}








//--></script>
