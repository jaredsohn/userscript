// ==UserScript==
// @name	BFH Website Tweak
// @namespace	Mofium
// @description	Improves the Homepage environment
// @include        http://www.battlefieldheroes.com/*
// @include        https://www.battlefieldheroes.com/*
// ==/UserScript==
// Credits:
//	Niroko: http://userscripts.org/users/63816
// 	Freeze: http://userscripts.org/users/35267


onload=function(){
if (document.getElementsByClassName == undefined) {
	document.getElementsByClassName = function(className)
	{
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}

		return results;
	}
}}

//Gets current language Results are "en_US" or "de_DE"
var lang = unsafeWindow.s_ea.prop12;

//Shortens German Panel to one line
var site_panel = document.getElementById('panel');
//window.alert(site_panel.innerHTML);
if(lang == "de_DE"){
	if(site_panel!=null){
		site_panel.innerHTML = site_panel.innerHTML.replace("Willkommen zurück, ","");
		site_panel.innerHTML = site_panel.innerHTML.replace("Benutzer","User");
		site_panel.innerHTML = site_panel.innerHTML.replace(" ansehen","");
		site_panel.innerHTML = site_panel.innerHTML.replace(" ansehen","");
		site_panel.innerHTML = site_panel.innerHTML.replace("Private Nachrichten","PN");
		site_panel.innerHTML = site_panel.innerHTML.replace(" ungelesen, ","/");
		site_panel.innerHTML = site_panel.innerHTML.replace(" insgesamt","");
	}

}


// Adds BFH-Wiki to Game
var nav_game = document.getElementById('header').childNodes[1].childNodes[7].childNodes[3].childNodes[1].childNodes[1].childNodes[1];
list_wiki = document.createElement("li");
list_wiki.innerHTML = '<a href="http://battlefieldheroes.wikia.com/" class="sm sm-wiki"><span>BFH-Wiki</span></a>';
var k = [nav_game.childNodes[1], list_wiki];
k[0].parentNode.insertBefore(k[1], k[0]);


// Adds User-CP to MyStuff
var nav_mystuff = document.getElementById('header').childNodes[1].childNodes[9].childNodes[3].childNodes[1].childNodes[1].childNodes[1];
list_cp = document.createElement("li");
list_cp.innerHTML = '<a href="/de/forum/usercp.php" class="sm sm-usercp"><span>User-CP</span></a>';
var l = [nav_mystuff.childNodes[1], list_cp];
l[0].parentNode.insertBefore(l[1], l[0]);



//Extended User-CP Options
var profile = document.getElementById('usercpprofile_e');
if(profile!=null){

//Enable Avatar Menu
profile_pro = profile.childNodes[1].childNodes[0];
profile_pro.innerHTML = profile_pro.innerHTML.replace("<!--","");
profile_pro.innerHTML = profile_pro.innerHTML.replace("-->","");
profile_pro.innerHTML = profile_pro.innerHTML.replace("&lt;!--","");
profile_pro.innerHTML = profile_pro.innerHTML.replace("--&gt;","");



//Arrays
var link = ["/user/updateAccountDetails","/user/updateAccountDetails","/changeName","usercp.php?action=editlists","/friends/manage"];
var class = ["email","password","username","editlists","usergroups"];
var ger = ["E-Mail ändern","Passwort ändern","Namen ändern","Kumpels/Feinde","Freunde"];
var eng = ["Change E-Mail","Change Password","Change Name","Buddies/Enemies","Friends"];


//E-Mail, Password, Change Name
profile_opt = profile.childNodes[3].childNodes[0];
for (i=0; i<3; i++){
		profile_opt.innerHTML += '<a href="' + link[i] + '" class="usercp_nav_item usercp_nav_' + class[i]+ '">' + ((lang == "en_US") ? eng[i] :  ger[i] ) + '</a>';
	};


//Buddies
profile.innerHTML += '<tr><td class="trow1 smalltext"><a href="' + link[3] + '" class="usercp_nav_item usercp_nav_' + class[3]+ '">' + ((lang == "en_US") ? eng[3] :  ger[3] ) + '</a></td></tr>';

//Friends
profile.innerHTML += '<tr><td class="trow1 smalltext"><a href="' + link[4] + '" class="usercp_nav_item usercp_nav_' + class[4]+ '">' + ((lang == "en_US") ? eng[4] :  ger[4] ) + '</a></td></tr>';
}


//Quick Reply
var nav_qr = document.getElementById('quickreply_e');
if(nav_qr!=null){
	if(document.getElementById('top-login-form')) return;
	if (lang=="en_US"){
		var editor_language = 'title_bold: "Insert bold text",title_italic: "Insert italic text",title_underline: "Insert underlined text",title_left: "Align text to the left",title_center: "Align text to the center",title_right: "Align text to the right",title_justify: "Justify text",title_numlist: "Insert numbered list",title_bulletlist: "Insert bulleted list",title_image: "Insert image",title_hyperlink: "Insert hyperlink",title_email: "Insert email address",title_quote: "Insert quoted text",title_code: "Insert formatted code",title_php: "Insert formatted PHP code",title_close_tags: "Close any open MyCode tags that you currently have open",enter_list_item: "Enter a list item. Click cancel or leave blank to end the list.",enter_url: "Please enter the URL of the website.",enter_url_title: "Optionally, you can also enter a title for the URL.",enter_email: "Please enter the email address you wish to insert.",enter_email_title: "Optionally, you may also enter a title for the email address.",enter_image: "Please enter the remote URL of the image you wish to insert.",size_xx_small: "XX Small",size_x_small: "X Small",size_small: "Small",size_medium: "Medium",size_large: "Large",size_x_large: "X Large",size_xx_large: "XX Large",font: "Font",size: "Text Size",color: "Text Color"';
	}else{
		var editor_language = 'title_bold: "Fettgedruckten Text eingeben", title_italic: "Kursiven Text eingeben", title_underline: "Unterstrichenen Text eingeben", title_left: "Linksbündiger Text", title_center: "Zentrierter Text", title_right: "Rechtsbündiger Text", title_justify: "Text im Blocksatz", title_numlist: "Nummerierte Liste einfügen", title_bulletlist: "Ungeordnete Liste einfügen", title_image: "Bild einfügen", title_hyperlink: "Hyperlink einfügen", title_email: "E-Mail-Adresse einfügen", title_quote: "Zitierten Text einfügen", title_code: "Formatierten Code einfügen", title_php: "Formatierten PHP-Code einfügen", title_close_tags: "Alle offenen MyCode-Tags schließen", enter_list_item: "Gib einen Listeneintrag ein. Klicke auf Abbrechen oder lasse das Feld leer, um die Liste zu beenden.", enter_url: "Gib die URL der Webseite ein.", enter_url_title: "Optional kannst du auch einen Namen für die Webseite eingeben.", enter_email: "Gib die einzufügende E-Mail-Adresse ein.", enter_email_title: "Optional kannst du auch einen Namen zur Adresse eingeben.", enter_image: "Gib die URL zum einzufügenden Bild ein.", size_xx_small: "Kleinste", size_x_small: "Kleiner", size_small: "Klein", size_medium: "Mittel", size_large: "Groß", size_x_large: "Größer", size_xx_large: "Größte", font: "Schrift", size: "Schriftgröße", color: "Schriftfarbe"';
	}

	var head = document.getElementsByTagName('head')[0];
	var script = [document.createElement('script'), document.createElement('script')];
	script[0].setAttribute('type', 'text/javascript');
	script[1].setAttribute('type', 'text/javascript');
	script[0].setAttribute('src', 'http://cdn.battlefieldheroes.com/static/20100701135641/modules/forum/js/editor.js');
	script[1].innerHTML = 'new messageEditor("message", {lang: {' + editor_language + '}, rtl: 0, theme: "default", height: "300px"});';
	head.appendChild(script[0]);
	head.appendChild(script[1]);
	var fnc = unsafeWindow.Thread.multiQuotedLoaded;
	unsafeWindow.Thread.multiQuotedLoaded = function(request) {
		var ta = document.getElementById('message_new');
		ta.id = 'message';
		fnc(request);
		ta.id = 'message_new'
		var spinner = document.getElementById('spinner');
		spinner.parentNode.removeChild(spinner);
	}
}

//window.alert("Possible future features: PM Button on player profile");