// ==UserScript==
// @name           Одноклассники.ru Übersetzer
// @author	   ATi
// @namespace      Одноклассники
// @include        http://*odnoklassniki.ru/*
// @version        0.0.2
// @date           2011-08-22

// ==/UserScript==
// set up jQuery variable
//alert("I'm here!");
  var $;
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
    GM_JQ.type = 'text/javascript';
	// Check if jQuery's loaded
  var loadFlag = 0;// a flag to check if the jquery file has been inserted into <head>
  var checker=setInterval(function(){
    $ = unsafeWindow.jQuery;
	if(typeof ($) == "function" ) {
			clearInterval(checker);
          if(loadFlag ==1){
			clearInterval(checker);
			letsJQuery();
			return;
		  }
     } else {
		    if(loadFlag ==0){
				document.getElementsByTagName('head')[0].appendChild(GM_JQ);
				loadFlag = 1;
			}
	 }
   },100);

// All your GM code must be inside this function
    function letsJQuery() {
		$.noConflict();//avoid conflicts with other libraries
		var $login = {
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel2 .sbin h4" : "Sind Sie bereits registriert?",
				"#regsidebar #ctl00_cphSidebar_ucSidebarContent_SideboxPanel2 div.sbin input[name='button_go']" : "eingeben",
				"#regsidebar #ctl00_cphSidebar_ucSidebarContent_SideboxPanel2 label[for='field_remember']" : "Gast",
				"#regsidebar #ctl00_cphSidebar_ucSidebarContent_SideboxPanel2 .sbin a.norm3:first" : "Passwort vergessen?",
				"#regsidebar #ctl00_cphSidebar_ucSidebarContent_SideboxPanel2 div.sbin input[name='button_go']" : "eingeben",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel2_register a:first" : "Anmeldung",
				"#regmainarea div#regcontent div#regheader h1" : "Ich verließ die Schule in ...",
				"#regmainarea #regcontent #regheader h3" : "Wählen Sie Ihre Region, um Ihre Schule finden",
				"#regmainarea #regcontent > h3" : "Russisch",
				"#regsidebar #language form h4" : "Sprache:",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel1 h4" : "Auf Odnoklassniki.ru können Sie:",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel1 ul li:first span" : "Suche nach Hochschulen",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel1 ul li:nth-child(2) span" : "Freunde finden",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel1 ul li:nth-child(3) span" : "mit ihnen zu entsprechen",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel1 ul li:nth-child(4) span" : "Bilder anschauen",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel1 ul li:nth-child(5) span" : "Planung von Meetings",
				"#regmainarea #regcontent > div:nth-child(30) ul li span a" : "Ukraine",
				"#regmainarea #regcontent > div:nth-child(31) ul li span a" : "Weißrussland",
				"#regmainarea #regcontent > div:nth-child(32) ul li span a" : "Kasachstan",
				"#regmainarea #regcontent > div:nth-child(33) ul li span a" : "andere Länder"
				},
			$tboxnavPanel = {
				"#hook_Block_LeftColumnSearch #leftColumnSearchFriendsPanel div.panelRounded_head_header" : "Suche",
				"#hook_Form_sidebar_seach_form #hook_FormButton_button_search" : "finden",
				"#leftColumnSearchFriendsPanel a.actionLink" : "Finden Sie Menschen auf der Seite",
				"#tboxnavPanel div.tboxnav a.actionLink" : "Meine Seite",
				"#hook_Block_Header #header #headerRightColumn #headerTopMenuContainer #topnav ul li:first a" : "Meine Seite",
				"#hook_Block_Header #header #headerRightColumn #headerTopMenuContainer #topnav ul li:nth-child(2) a" : "Meine Nachrichten",
				"#hook_Block_Header #header #headerRightColumn #headerTopMenuContainer #topnav ul li:nth-child(3) a" : "Suche Leute",
				"#hook_Block_Header #header #headerRightColumn #headerTopMenuContainer #topnav ul li:nth-child(4) a" : "Jetzt auf der Seite",
				"#hook_Block_Header #header #headerRightColumn #headerTopMenuContainer #topnav ul li:nth-child(5) a" : "Hilfe",
				"#hook_Block_Header #header #headerRightColumn #headerTopMenuContainer #topnav ul li:nth-child(6) a" : "Abmelden",
				"#hook_Block_ContentColumnContainer #hook_Block_MiddleCardAndMenu #hook_Block_MiddleColumn_TopBoxNavigation #topBoxNavigationContainer ul li:first #hook_NavMenuItem_smUserProfile span" : "Profil",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userAltGroup a" : "Gruppen",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userGroup a" : "Gemeinschaften",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userPersonalPhotos a" : "Persönliche Fotos",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userPhotoAlbums a" : "Foto-Alben",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userPhotopins a" : "Ich auf die Bilder an Freunde",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userPhotoMarks" : "Foto Notizen",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userPhotosComments" : "Kommentare",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-largePhoto a span" : "Bild vergrößern",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-sendMsg a span" : "SMS schreiben",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-messaging a span" : "zeigt die Korrespondenz",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-altGroupInvite a span" : "Gruppe lädt",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-toggleBookmark a span" : "Lesezeichen hinzufügen",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-item a span" : "Angebote Geschenk",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-friends a span" : "Freunde von Freunden",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-personalPhotos a span" : "persönliche Fotos",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-photoalbums a span" : "Fotoalben",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-altGroups a span" : "Gruppen",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-groups a span" : "Meine Gruppen",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-forum a span" : "Forum",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-about a span" : "Über mich",
				"#topPanelContentDiv #topPanelCenterContainer #topnav ul li:first a" : "Suche Leute",
				"#topPanelContentDiv #topPanelCenterContainer #topnav ul li:nth-child(2) a" : "Jetzt auf der Seite",
				"#topPanelContentDiv #topPanelCenterContainer #topnav ul li:nth-child(3) a" : "Hilfe",
				"#topPanelContentDiv #topPanelCenterContainer #topnav ul li:nth-child(4) a" : "Abmelden",
				
				
				"#hook_Block_ContentColumnContainer #hook_Block_MiddleCardAndMenu #hook_Block_MiddleColumn_TopBoxNavigation #topBoxNavigationContainer ul li:nth-child(2) #hook_NavMenuItem_smUserFriends span" : "Freunde",
				"#hook_Block_ContentColumnContainer #hook_Block_MiddleCardAndMenu #hook_Block_MiddleColumn_TopBoxNavigation #topBoxNavigationContainer ul li:nth-child(3) #hook_NavMenuItem_smUserPhotos span" : "Bilder",
				"#hook_Block_ContentColumnContainer #hook_Block_MiddleCardAndMenu #hook_Block_MiddleColumn_TopBoxNavigation #topBoxNavigationContainer ul li:nth-child(4) #hook_NavMenuItem_smUserInterests span" : "Interessantes"
				},
			$hook_JsonCustom_Omni_Original = $('#hook_JsonCustom_Omni')
			//$hook_JsonCustom_Omni_Original = JSON.parse($('#hook_JsonCustom_Omni').text());
		;
		function translate(selector,translation){
			var o = $(selector),
				t = o[0].tagName
			;
			if(o.length > 0){
				switch(t){
					case 'DIV':
					case 'SPAN':
					case 'TD':
					case 'P':
					case 'A':
					case 'B':
					case 'LABEL':
					case 'LEGEND':
					case 'H1':
					case 'H2':
					case 'H3':
					case 'H4': return o.text(translation); break;
					case 'INPUT': 
					default:
						return o.val(translation); break;
				}
			} else { console.log('Element ',selector,' doesn\'t exist!');}
		}
		function getPageTranslation(o){
			for (var key in o) {
				if($(key).length > 0){
					//console.log(key,o[key]);
					translate(key,o[key]);
				}
			}
		}
		getPageTranslation($tboxnavPanel);
		getPageTranslation($login);
    }