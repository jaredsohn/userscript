// ==UserScript==
// @name           Facebook Mac
// @namespace      http://userscripts.org
// @include        *facebook.com*
// ==/UserScript==

var myProfileURI = document.getElementById('pageNav').getElementsByTagName('li')[1].getElementsByTagName('a')[0].href;//Because everyone's profile is different this gets their profile link so I can use it later. It's first for a obsolute reason.

/**Create the Longbar**/
var longbar = document.createElement('div');//Creates it
longbar.setAttribute('id', 'longbar');//Sets its id

/**Create the menubar**/
var menubar = document.createElement('div');//Creates it
menubar.setAttribute('id', 'menubar');//sets its id

/**Create the list**/
var menuList = document.createElement('ul');//Creates it

/**Create the apple logo**/
var appleList = document.createElement('li');//Creates a list item
appleList.setAttribute('class', 'menu_item');//Sets the li's class
var appleLink = document.createElement('a');//Creates a link
appleLink.setAttribute('class', 'menu_logo');//Sets the link's class
appleLink.setAttribute('href', 'http://www.facebook.com/?ref=logo');//Sets the link's location
appleLink.setAttribute('title', 'Go to Facebook Home');//Sets the title...What apears when you rollover
var appleLogo1 = document.createElement('img');//Creates the image
appleLogo1.setAttribute('src', 'http://sites.google.com/site/skylersdatafiles/home/data/appleLogo1.gif');//Sets the image's location
appleLogo1.setAttribute('class', 'img1');//Sets the image's class
appleLink.appendChild(appleLogo1);//Appends the image to the link
var appleLogo2 = document.createElement('img');//Creates the second image. I use the first for normal and the second for rollover.
appleLogo2.setAttribute('src', 'http://sites.google.com/site/skylersdatafiles/home/data/appleLogo2.gif');//Sets the second image's location
appleLogo2.setAttribute('class', 'img2');//Sets the second image's class
appleLink.appendChild(appleLogo2);//Appends the second image to the link
appleList.appendChild(appleLink);//Appends the link to the list item
menuList.appendChild(appleList);//Appends the list item to the list

/**Create the home tab**/
var homeList = document.createElement('li');//Creates the list
homeList.setAttribute('class', 'menu_item');//Sets the li's class
var homeLink = document.createElement('a');//Creates the link
homeLink.setAttribute('class', 'menu_link');//Sets the link's class
homeLink.setAttribute('href', 'http://www.facebook.com/?ref=home');//Sets the link's location
homeLink.setAttribute('title', 'Home');//Set's the link's title
var homeText = document.createTextNode('Home');//Makes the text
homeLink.appendChild(homeText);//Appends the text to the link
homeList.appendChild(homeLink);//Appends the link to the list item
menuList.appendChild(homeList);//Appends the list item to the list

/**Create the profile tab**/
var profileList = document.createElement('li');
profileList.setAttribute('class', 'menu_item');
var profileLink = document.createElement('a');
profileLink.setAttribute('class', 'menu_link');
profileLink.href = myProfileURI;//This is the only thing that is different from the home tab. I use the link i got in the begining as the location for my profile tab
profileLink.setAttribute('title', 'Profile');
var profileText = document.createTextNode('Profile');
profileLink.appendChild(profileText);
profileList.appendChild(profileLink);
menuList.appendChild(profileList);

/**Creates the Account Tab**/
var accountList = document.createElement('li');
accountList.setAttribute('class', 'menu_item');
var accountLink = document.createElement('a');
accountLink.setAttribute('class', 'menu_link account');
accountLink.href = 'http://www.facebook.com/editaccount.php?ref=mb&drop';
accountLink.setAttribute('title', 'Account');
//Up to here its the same as the home tab
//This sets the link to open the account tab when clicked
accountLink.setAttribute('onclick', 'var toggle = function() {this.onclick = function(e) {e = e || window.event;e && Event.prevent(e);Toggler.toggle(this);}.bind(this);this.onclick();}.bind(this);this.onclick = function() {CSS.toggleClass(this.parentNode, \'openToggler\');return false;}.bind(this);this.onclick();onloadRegister(toggle);return false;');
var accountText = document.createTextNode('Account');
var accountDrop = document.getElementById('navAccount').getElementsByTagName('ul');//Grab the old account dropdown
accountDrop = accountDrop[0];//Removes the array... not really nessassary but it makes things simpler
accountDrop.setAttribute('class', 'jewelBox');//Sets the account dropdown's class
accountLink.appendChild(accountText);//Same as home tab
accountList.appendChild(accountLink);// "
accountList.appendChild(accountDrop);//Adds the dropdown menu to the List
menuList.appendChild(accountList);// "

menubar.appendChild(menuList);//Appends the list to the bar

/**Creates the other list**/
var auxList = document.createElement('ul');//Creates it

/**Creates the spotlight icon**/
//This is a default set for all of the right icons
var spotList = document.createElement('li');//Creates the list item
spotList.setAttribute('class', 'aux_item');//Sets the list's class
var spotLink = document.createElement('a');//Creates the link
spotLink.setAttribute('class', 'menu_link');//Sets the link's class
spotLink.setAttribute('href', 'http://www.facebook.com/?ref=logo');//Sets the link's location
spotLink.setAttribute('title', 'Search');//Sets the link's title
//Open the tab
spotLink.setAttribute('onclick', 'var toggle = function() {this.onclick = function(e) {e = e || window.event;e && Event.prevent(e);Toggler.toggle(this);}.bind(this);this.onclick();}.bind(this);this.onclick = function() {CSS.toggleClass(this.parentNode, \'openToggler\');return false;}.bind(this);this.onclick();onloadRegister(toggle);return false;document.getElementByName(\'q\').focus();');
var spotLogo1 = document.createElement('img');//Creates the image
spotLogo1.setAttribute('src', 'http://sites.google.com/site/skylersdatafiles/home/data/glass1.gif');//Sets the image's location
spotLogo1.setAttribute('class', 'img1');//Sets the image's class
var spotLogo2 = document.createElement('img');//Creates the roleover image
spotLogo2.setAttribute('src', 'http://sites.google.com/site/skylersdatafiles/home/data/glass2.gif');//Sets that image's location
spotLogo2.setAttribute('class', 'img2');//Sets that image's class
spotLink.appendChild(spotLogo1);//Appends the first image to the link
spotLink.appendChild(spotLogo2);//Appends the second image to the link
spotList.appendChild(spotLink);//Appends the link to the list item
auxList.appendChild(spotList);//Appends the list item to the list

/**Creates the Spotlight Dropmenu**/
var spotBox = document.createElement('div');//Creates the container
spotBox.setAttribute('id', 'spotBox');//Sets the id
spotBox.setAttribute('class', 'jewelBox');//Sets the class
var spotBoxList = document.createElement('ul');//Creates a list
spotBoxList.setAttribute('class', 'spotBoxList');//Sets the class
var spotBoxTextItem = document.createElement('li');//Creates the list item that holds the Text
spotBoxTextItem.setAttribute('class', 'spotBoxItem');//Sets the class
var spotBoxText = document.createElement('span');//Creates a text span
spotBoxText.setAttribute('class', 'spotBoxText');//Sets the class
var spotBoxTextNode = document.createTextNode('Spotlight');//Creates the text
spotBoxText.appendChild(spotBoxTextNode);//Appends the text to the span
var spotBoxInputItem = document.createElement('li');//Creates the list item for the input item
spotBoxInputItem.setAttribute('class', 'spotBoxItem');//Sets the class
var spotBoxForm = document.createElement('form');//Creates a form to hold the search
spotBoxForm.setAttribute('action', 'http://www.facebook.com/search/?ref=search');//Sets the action of the form
spotBoxForm.setAttribute('method', 'get');//Sets the method of the form
var spotBoxInputDiv = document.createElement('div');//Creates a div to hold the input item...This is what is rounded
spotBoxInputDiv.setAttribute('class', 'spotBoxInputDiv');//Sets the class
var spotBoxInput = document.createElement('input');//Creates the input box
//Sets attributes of the input box
spotBoxInput.setAttribute('class', 'spotBoxInput');
spotBoxInput.setAttribute('type', 'text');
spotBoxInput.setAttribute('autocomplete', 'off');
spotBoxInput.setAttribute('title', 'Search');
spotBoxInput.setAttribute('value', '');
spotBoxInput.setAttribute('onfocus', 'Bootloader.loadComponents(["search-friend-source","search-typeaheadpro"], function() {var ts = new search_friend_source("1419458905-1265907334-3&u=1419458905"); ts.udata={"u":"1419458905","src":"search_friend_source","abt":"A"};var ta = new search_typeaheadpro($("q"), ts, {"udata":"{\"u\":\"1419458905\",\"src\":\"search_friend_source\",\"abt\":\"A\"}","max_results":5,"is_fbx":1});ta.onselect = search_typeahead_onselect;ta.onsubmit = search_typeahead_onsubmit;$("q").onfocus();});');
spotBoxInput.setAttribute('size', '26');
spotBoxInput.setAttribute('maxlength', '100');
spotBoxInput.setAttribute('required', 'true');
spotBoxInput.setAttribute('tabindex', '1');
spotBoxInput.setAttribute('results', '0');
spotBoxInput.setAttribute('name', 'q');
//Appends all the stuff
spotBoxInputDiv.appendChild(spotBoxInput);
spotBoxForm.appendChild(spotBoxInputDiv);
spotBoxInputItem.appendChild(spotBoxForm);
spotBoxTextItem.appendChild(spotBoxText);
spotBoxList.appendChild(spotBoxInputItem);
spotBoxList.appendChild(spotBoxTextItem);
spotBox.appendChild(spotBoxList);
spotList.appendChild(spotBox);

/**Creates the Clock**/
var macClockItem = document.createElement('li');
macClockItem.setAttribute('class', 'aux_item macClockItem');
var macClock = document.createElement('a');
macClock.setAttribute('id', 'macClock');
macClock.setAttribute('class', 'menu_link');
macClock.setAttribute('href', 'javascript://This will link to the script\'s home page');
macClock.setAttribute('onclick', 'var toggle = function() {this.onclick = function(e) {e = e || window.event;e && Event.prevent(e);Toggler.toggle(this);}.bind(this);this.onclick();}.bind(this);this.onclick = function() {CSS.toggleClass(this.parentNode, \'openToggler\');return false;}.bind(this);this.onclick();onloadRegister(toggle);return false;');
macClockItem.appendChild(macClock);
auxList.appendChild(macClockItem);

/**Creates the Messages icon**/
//See the spotlight icon
var mailList = document.createElement('li');
mailList.setAttribute('class', 'aux_item');
var mailLink = document.createElement('a');
mailLink.setAttribute('class', 'menu_link');
mailLink.setAttribute('href', 'http://www.facebook.com/?sk=messages&ref=mb');
mailLink.setAttribute('title', 'Messages');
mailLink.setAttribute('onclick', 'var toggle = function() {this.onclick = function(e) {e = e || window.event;e && Event.prevent(e);Toggler.toggle(this);}.bind(this);this.onclick();}.bind(this);this.onclick = function() {CSS.toggleClass(this.parentNode, \'openToggler\');return false;}.bind(this);this.onclick();onloadRegister(toggle);return false;');
var mailLogo1 = document.createElement('img');
mailLogo1.setAttribute('src', 'http://sites.google.com/site/skylersdatafiles/home/data/mail1.gif');
mailLogo1.setAttribute('class', 'img1');
var mailLogo2 = document.createElement('img');
mailLogo2.setAttribute('src', 'http://sites.google.com/site/skylersdatafiles/home/data/mail2.gif');
mailLogo2.setAttribute('class', 'img2');
var mailDrop = document.getElementById('jewelBoxMail');
mailLink.appendChild(mailLogo1);
mailLink.appendChild(mailLogo2);
mailList.appendChild(mailLink);
mailList.appendChild(mailDrop);
auxList.appendChild(mailList);

/**Creates the Reqs icon**/
//See the spotlight icon
var reqList = document.createElement('li');
reqList.setAttribute('class', 'aux_item');
var reqLink = document.createElement('a');
reqLink.setAttribute('class', 'menu_link');
reqLink.setAttribute('href', 'http://www.facebook.com/reqs.php');
reqLink.setAttribute('title', 'Friend Requests');
reqLink.setAttribute('onclick', 'var toggle = function() {this.onclick = function(e) {e = e || window.event;e && Event.prevent(e);Toggler.toggle(this);}.bind(this);this.onclick();}.bind(this);this.onclick = function() {CSS.toggleClass(this.parentNode, \'openToggler\');return false;}.bind(this);this.onclick();onloadRegister(toggle);return false;if(this.class == clicked){CSS.removeClass(this, \'clicked\')}else{CSS.addClass(this, \'clicked\')}');
var reqLogo1 = document.createElement('img');
reqLogo1.setAttribute('src', 'http://sites.google.com/site/skylersdatafiles/home/data/reqs1.gif');
reqLogo1.setAttribute('class', 'img1');
var reqLogo2 = document.createElement('img');
reqLogo2.setAttribute('src', 'http://sites.google.com/site/skylersdatafiles/home/data/reqs2.gif');
reqLogo2.setAttribute('class', 'img2');
var reqDrop = document.getElementById('jewelBoxRequest');
reqLink.appendChild(reqLogo1);
reqLink.appendChild(reqLogo2);
reqList.appendChild(reqLink);
reqList.appendChild(reqDrop);
auxList.appendChild(reqList);

/**Creates the Notifications icon**/
//See the spotlight icon
var noteList = document.createElement('li');
noteList.setAttribute('class', 'aux_item');
var noteLink = document.createElement('a');
noteLink.setAttribute('class', 'menu_link');
noteLink.setAttribute('href', 'http://www.facebook.com/reqs.php');
noteLink.setAttribute('title', 'Notifications');
noteLink.setAttribute('onclick', 'var toggle = function() {this.onclick = function(e) {e = e || window.event;e && Event.prevent(e);Toggler.toggle(this);}.bind(this);this.onclick();}.bind(this);this.onclick = function() {CSS.toggleClass(this.parentNode, \'openToggler\');return false;}.bind(this);this.onclick();onloadRegister(toggle);return false;if(this.class == clicked){CSS.removeClass(this, \'clicked\')}else{CSS.addClass(this, \'clicked\')}');
var noteLogo1 = document.createElement('img');
noteLogo1.setAttribute('src', 'http://sites.google.com/site/skylersdatafiles/home/data/note1.gif');
noteLogo1.setAttribute('class', 'img1');
var noteLogo2 = document.createElement('img');
noteLogo2.setAttribute('src', 'http://sites.google.com/site/skylersdatafiles/home/data/note2.gif');
noteLogo2.setAttribute('class', 'img2');
var noteDrop = document.getElementById('jewelBoxAlert');
noteLink.appendChild(noteLogo1);
noteLink.appendChild(noteLogo2);
noteList.appendChild(noteLink);
noteList.appendChild(noteDrop);
auxList.appendChild(noteList);


menubar.appendChild(auxList);//Appends the right list to the menubar
longbar.appendChild(menubar);//Appends the menubar to the longbar
var oldBar = document.getElementById('bluebar');//Hmmm...
document.body.appendChild(longbar);//Appends the longbar to the page

/*CSS References*/
/*
1. rounded borders: 
	-moz-border-radius-bottomleft: 4px;	-moz-border-radius-bottomright: 4px;	-moz-border-radius-topleft: 4px;	-moz-border-radius-topright: 4px;	-webkit-border-radius-bottomleft: 4px;	-webkit-border-radius-bottomright: 4px;	-webkit-border-radius-bottomleft: 4px;	-webkit-border-radius-bottomright: 4px;
2. shadow:
 	-moz-box-shadow: 1px 4px 5px;
*/

	//This does most of the work. It changes the style of everything
	var css = '#longbar{background-color: #a8a8a8;display: block;visibility: visible;width: 100%;height: 24px;position: absolute;top: 0px;z-index: 16;border-bottom: solid 1px transparent;-moz-box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);}\
	#menubar{margin: 0 auto;width: 980px;}\
	.menu_item{float: left;}\
	.account{	width: 55px;}\
	.menu_link{display: block;padding: 5px;font-weight: bold;font-family: "lucida grande",tahoma,verdana,arial,sans-serif;height: 15px;color: #000000;text-align: center;}\
	.menu_logo{	display: block;	padding: 1px 5px 1px;	font-weight: bold;	font-family: "lucida grande",tahoma,verdana,arial,sans-serif;	color: #000000;	text-align: center;}\
	.menu_link:hover, .openToggler .menu_link, .menu_logo:hover{background-color: #336af1;text-decoration: none;color: #FFFFFF;}\
	.aux_item{float: right;width: 30px;}\
	#jewelCase li, #jewelCase .empty {	padding: 0;}\
	body{	width: 100%;}\
	.jewelBox{	display: none;	background-color: #ffffff;	width: 300px;	border: solid 1px #a6a6a6;	-moz-border-radius-bottomleft: 4px;	-moz-border-radius-bottomright: 4px;	-webkit-border-radius-bottomleft: 4px;	-webkit-border-radius-bottomright: 4px;	-moz-box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.5);	float: right;	padding: 5px;}\
	.account .jewelBox{	float: left;}\
	.openToggler .jewelBox{	display: block;}\
	a:hover .img1, .img2, .openToggler .img1{	display: none;}\
	a:hover .img2, .img1, .openToggler .img2{	display: block;}\
	#spotBox{	background-color: #3875d7;	-moz-border-radius-bottomleft: 0px;	-moz-border-radius-bottomright: 0px;	-webkit-border-radius-bottomleft: 0px;	-webkit-border-radius-bottomright: 0px;	padding: 1px 5px 5px;	border: none;}\
	.spotBoxList{	}\
	.spotBoxItem{	float: right;}\
	.spotBoxText{	color: #ffffff;	margin: 10px 5px 0px;	font-size: 11px;	font-family: "lucida grande",tahoma,verdana,arial,sans-serif;	font-weight: bold;	padding: 5px;}\
	.spotBoxInputDiv{	-moz-border-radius-bottomleft: 15px;	-moz-border-radius-bottomright: 15px;	-moz-border-radius-topleft: 15px;	-moz-border-radius-topright: 15px;	-webkit-border-radius-bottomleft: 15px;	-webkit-border-radius-bottomright: 15px;	-webkit-border-radius-bottomleft: 15px;	-webkit-border-radius-bottomright: 15px;	width: 200px;	background-color: #ffffff;}\
	.spotBoxInput{	border: none;	margin: 0 5px;}\
	.jewelBox a, .actionspro .actionspro_a{	color: #000000;	display: block;	padding: 1px 5px 1px;	text-decoration: none;}\
	.jewelBox a:hover, .actionspro .actionspro_a:hover{	background-color: #336af1;	color: #ffffff;}\
	#blueBar{	background-color: #edeff4;}\
	#pageHead{	visibility: hidden;}\
	#jewelCase{	position: static;	top: auto;	left: auto;}\
	#jewelBoxMail li a:hover, #jewelBoxMail li a:active, #jewelBoxMail li a:focus{	background-color: #336af1;}\
	#presence_ui, #presence .presence_bar_button .inner_button, #presence .presence_bar_button.focused .inner_button {	border: none;}\
	#presence.fbx_bar .presence_section, #presence.fbx_bar #chat .tab_handle, #presence.fbx_bar #presence_gk_tab, #presence.fbx_bar#presence_translations_tab, #presence.fbx_bar #presence_ui #presence_bar .focused	{	border: 2px solid rgba(150, 150, 150, 0.8);	-moz-border-radius-topleft: 5px;	-moz-border-radius-topright: 5px;	-webkit-border-radius-topleft: 5px;	-webkit-border-radius-topright: 5px;	background: rgba(0, 0, 0, 0.9);	color: #ffffff;margin-right: 10px; !important}\
	#presence #presence_bar_right .hover, #presence #presence_bar_left .hover{	background-color: rgba(0, 0, 0, 0.9);	color: #ffffff;}\
	#presence.fbx_bar #buddy_list_tab {	width: auto;}\
	#presence.fbx_bar #presence_ui #presence_bar .focused {	background: rgba(0, 0, 0, 0.9) none repeat scroll 0 0;	border: 2px solid rgba(150, 150, 150, 0.8);}\
	#presence_bar .presence_menu_opts h2, #chat_tab_bar .chat_info, #chat_tab_bar img.chat_info_pic{	display: none !important;}\
	#presence.fbx_bar #buddy_list .presence_menu_opts, #chat_tab_bar .tab_handle.focused .chat_window{	margin-bottom: 20px !important;	border: 2px solid rgba(200, 200, 200, 0.5) !important;	-moz-border-radius-topleft: 4px !important;	-moz-border-radius-topright: 4px !important;-webkit-border-radius-topleft: 4px !important;-webkit-border-radius-topright: 4px !important;-moz-border-radius-bottomleft: 4px !important;-moz-border-radius-bottomright: 4px !important;-webkit-border-radius-bottomleft: 4px !important;-webkit-border-radius-bottomright: 4px !important;-moz-box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.7) !important;padding: 5px !important;background: rgba(0, 0, 0, 0.9) none repeat scroll 0 0 !important;}\
	.buddy_list .friend_list{background: transparent;}\
	#presence .presence_menu_opts{background: transparent;}\
	.buddy_list a.friend span, #presence #buddy_list_tab #buddy_count strong{color: #ffffff;}\
	.buddy_list a.friend:hover, .buddy_list s.selected, .buddy_list a.drag{background-color: #3875d7 !important;}\
	.buddy_list a.friend img{width: 15px !important;height: 15px !important;}\
	#presence.fbx_bar .presence_section:hover, #presence.fbx_bar #presence_translations_tab:hover, #presence.fbx_bar #presence_gk_tab:hover, #presence.fbx_bar #chat .tab_handle:hover{border-top: 2px solid rgba(150, 150, 150, 0.8);background: rgba(0, 0, 0, 0.9) none repeat scroll 0 0;margin-right: 10px;}\
	.buddy_list .friendlist_name, .buddy_list span.title a, .buddy_list span.title a:hover{background-color: transparent;color: #ffffff;font-weight: bold;}\
	.buddy_list a.friend{height: auto !important;background-color: transparent !important;background-image: url(http://pro.local/status.png);}\
	#chat_tab_bar .chat_header_name{margin-left: 0px;}\
	#chat_tab_bar .chat_header, #buddy_list_panel{background: transparent none;border: none;}\
	#chat_tab_bar .chat_header .header_buttons .minimize{background: transparent url(http://static.ak.fbcdn.net/rsrc.php/z14M5/hash/a657viny.png) no-repeat scroll -728px -58px !important;}\
	#chat_tab_bar .chat_header .header_buttons .close{background: transparent url(http://static.ak.fbcdn.net/rsrc.php/z14M5/hash/a657viny.png) no-repeat scroll -855px -63px !important;}\
	#rightCol .UITitledBox_Top{background-color: #a8a8a8;-moz-border-radius-topleft: 4px !important;-moz-border-radius-topright: 4px !important;-webkit-border-radius-topleft: 4px !important;-webkit-border-radius-topright: 4px !important;}\
	.UIHomeBox .UITitledBox_Top{padding: 1px 5px 4px;border: 1px solid #bcbcbc;border-bottom: none;}\
	.UIHomeBox .UITitledBox_Content{background-color: #ffffff; padding: 6px 1px;border: 1px solid; border-color: #515151 #777777;margin-top: 0px; -moz-box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);}\
	.UITitledBox{-moz-box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);}\
	.commentable_item .ufi_section, .GenericStory, .UIIntentionalStory{background-color: #000000; border: 2px solid #aaaaaa; -moz-box-shadow: 1px 4px 5px;-moz-border-radius-bottomleft: 4px;	-moz-border-radius-bottomright: 4px;	-moz-border-radius-topleft: 4px;	-moz-border-radius-topright: 4px;	-webkit-border-radius-bottomleft: 4px;	-webkit-border-radius-bottomright: 4px;	-webkit-border-radius-bottomleft: 4px;	-webkit-border-radius-bottomright: 4px; -moz-box-shadow: 1px 4px 5px; color:#ffffff;}\
	.GenericStory_Body .commentable_item{color: #ffffff; !important}\
	.GenericStory_Body{border: none;}\
	.macClockItem{width: auto;}\
	.UIStory:first-child {border-top: 2px solid #AAAAAA}\
	h1, h2, h3, h4, h5 {color: #ffffff;}\
/*******Use to remove white color*********/.profile .top_bar h1, .profile .box .box_header, .single_photo_header h2, .single_photo_header h4{color: #000000;}\
	.uiSideNav .selected .item, .uiSideNav ul .selected .subitem, .uiSideNav .selected .item:hover, .uiSideNav ul .selected .subitem:hover{background-color: #a8a8a8; -moz-border-radius-bottomleft: 5px; -moz-border-radius-topleft: 5px;}\
	.uiSideNav .item:hover, .uiSideNav .subitem:hover{background-color: #336af1;color: #ffffff;}\
	.hasLeftCol #contentCol{border: none; !important}\
	.profile .box{-moz-border-radius-topleft: 4px;	-moz-border-radius-topright: 4px;}\
	.UIIntentionalStreamSearch .highlight, .UIIntentionalStreamSearch .inserted {color: #ffffff;}\
	.UIIntentionalStory_Pic{display: block;}\
	.pop_content h2.dialog_title{background-color: #a8a8a8;-moz-border-radius-topleft: 4px !important;-moz-border-radius-topright: 4px !important;-webkit-border-radius-topleft: 4px !important;-webkit-border-radius-topright: 4px !important;color: #000000 !important; border: 1px solid #bcbcbc;border-bottom: none;}\
	.pop_container_advanced{background: transparent; }\
	.pop_content{-moz-box-shadow: 1px 4px 5px;}';
	//This runs the clock
	var jscript = 'function startTime(){var today=new Date();var h=today.getHours();var m=today.getMinutes();var s=today.getSeconds();m=checkTime(m);s=checkTime(s);document.getElementById(\'macClock\').innerHTML=h+":"+m+":"+s;t=setTimeout(\'startTime()\',500);}function checkTime(i){if (i<10){i="0" + i;}return i;}';
	//This calls that^^ to run the clock
	var jscript2 = 'startTime()';
	var jq1 = document.createElement('script');
	jq1.setAttribute('type', 'text/javascript');
	jq1.setAttribute('src', 'http://jqueryui.com/latest/jquery-1.3.2.js');
	
	var jq2 = document.createElement('script');
	jq2.setAttribute('type', 'text/javascript');
	jq2.setAttribute('src', 'http://jquery-ui.googlecode.com/svn/tags/1.8rc1/jquery-1.4.1.js');
	
	var jq3 = document.createElement('script');
	jq3.setAttribute('type', 'text/javascript');
	jq3.setAttribute('src', 'http://jquery-ui.googlecode.com/svn/tags/1.8rc1/ui/jquery-ui.js');
	
	var dragScript = document.createElement('script');
	dragScript.setAttribute('type', 'text/javascript');
	dragScript.appendChild(document.createTextNode('$(document).ready(function(){$("#draggable").draggable();});'));
	
	//Appends the style and scripts to the head and body respectivly
	var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node);
			var node1 = document.createElement("script");
			node1.type = "text/javascript";
			node1.appendChild(document.createTextNode(jscript));
			heads[0].appendChild(node1);
			var node2 = document.createElement("script");
			node2.type = "text/javascript";
			node2.appendChild(document.createTextNode(jscript2));
			var bodies = document.getElementsByTagName('body');
			bodies[0].appendChild(node2);
	}