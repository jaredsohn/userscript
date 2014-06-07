// ==UserScript==
// @name           odnoklassniki translator
// @author	KullDox
// @namespace      odnoklassniki
// @include        http://*odnoklassniki.ru/*
// @version        0.0.1
// @date           2009-11-02

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
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel2 .sbin h4" : "Sunteţi înregistrat deja?",
				"#regsidebar #ctl00_cphSidebar_ucSidebarContent_SideboxPanel2 div.sbin input[name='button_go']" : "Intră",
				"#regsidebar #ctl00_cphSidebar_ucSidebarContent_SideboxPanel2 label[for='field_remember']" : "ţine minte",
				"#regsidebar #ctl00_cphSidebar_ucSidebarContent_SideboxPanel2 .sbin a.norm3:first" : "Aţi uitat parola?",
				"#regsidebar #ctl00_cphSidebar_ucSidebarContent_SideboxPanel2 div.sbin input[name='button_go']" : "Intră",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel2_register a:first" : "Înregistrare",
				"#regmainarea div#regcontent div#regheader h1" : "Am absolvit şcoala în...",
				"#regmainarea #regcontent #regheader h3" : "Alegeţi regiunea pentru a găsi şcoala Dvs",
				"#regmainarea #regcontent > h3" : "RUSSIA",
				"#regsidebar #language form h4" : "Limba:",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel1 h4" : "Pe Odnoklassniki.ru \n puteţi să:",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel1 ul li:first span" : "căutaţi colegii",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel1 ul li:nth-child(2) span" : "găsiţi prieteni",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel1 ul li:nth-child(3) span" : "să corespondaţi cu ei",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel1 ul li:nth-child(4) span" : "priviţi pozele",
				"#ctl00_cphSidebar_ucSidebarContent_SideboxPanel1 ul li:nth-child(5) span" : "planifica întâlniri",
				"#regmainarea #regcontent > div:nth-child(30) ul li span a" : "Ucraina",
				"#regmainarea #regcontent > div:nth-child(31) ul li span a" : "Belarus",
				"#regmainarea #regcontent > div:nth-child(32) ul li span a" : "Kazahstan",
				"#regmainarea #regcontent > div:nth-child(33) ul li span a" : "Alte ţări"
				},
			$tboxnavPanel = {
				"#hook_Block_LeftColumnSearch #leftColumnSearchFriendsPanel div.panelRounded_head_header" : "Căutare",
				"#hook_Form_sidebar_seach_form #hook_FormButton_button_search" : "Caută",
				"#leftColumnSearchFriendsPanel a.actionLink" : "Caută oameni pe site",
				"#tboxnavPanel div.tboxnav a.actionLink" : "Pagina mea",
				"#hook_Block_Header #header #headerRightColumn #headerTopMenuContainer #topnav ul li:first a" : "Pagina mea",
				"#hook_Block_Header #header #headerRightColumn #headerTopMenuContainer #topnav ul li:nth-child(2) a" : "Mesajele mele",
				"#hook_Block_Header #header #headerRightColumn #headerTopMenuContainer #topnav ul li:nth-child(3) a" : "Căutarea oamenilor",
				"#hook_Block_Header #header #headerRightColumn #headerTopMenuContainer #topnav ul li:nth-child(4) a" : "Acum pe site",
				"#hook_Block_Header #header #headerRightColumn #headerTopMenuContainer #topnav ul li:nth-child(5) a" : "Ajutor",
				"#hook_Block_Header #header #headerRightColumn #headerTopMenuContainer #topnav ul li:nth-child(6) a" : "Ieşire",
				"#hook_Block_ContentColumnContainer #hook_Block_MiddleCardAndMenu #hook_Block_MiddleColumn_TopBoxNavigation #topBoxNavigationContainer ul li:first #hook_NavMenuItem_smUserProfile span" : "Profil",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userAltGroup a" : "Grupe",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userGroup a" : "Comunităţi",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userPersonalPhotos a" : "Poze personale",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userPhotoAlbums a" : "Albume foto",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userPhotopins a" : "Eu pe pozele prietenilor",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userPhotoMarks" : "Notele pozelor",
				".gwt-navMenu ul li.gwt-navMenu-iconlink-userPhotosComments" : "Comentarii",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-largePhoto a span" : "măreşte poza",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-sendMsg a span" : "scrie mesaj",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-messaging a span" : "arată corespondenţa",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-altGroupInvite a span" : "invită în grup",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-toggleBookmark a span" : "adaugă bookmark",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-item a span" : "oferă cadou",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-friends a span" : "prietenii prietenului",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-personalPhotos a span" : "poze personale",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-photoalbums a span" : "albume foto",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-altGroups a span" : "grupe",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-groups a span" : "comunităţi",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-forum a span" : "forum",
				".gwt-shortcutMenu div.gwt-shortcutMenu-content ul li.gwt-shortcutMenu-iconlink-about a span" : "despre mine",
				"#topPanelContentDiv #topPanelCenterContainer #topnav ul li:first a" : "Căutarea oamenilor",
				"#topPanelContentDiv #topPanelCenterContainer #topnav ul li:nth-child(2) a" : "Acum pe site",
				"#topPanelContentDiv #topPanelCenterContainer #topnav ul li:nth-child(3) a" : "Ajutor",
				"#topPanelContentDiv #topPanelCenterContainer #topnav ul li:nth-child(4) a" : "Ieşire",
				
				
				"#hook_Block_ContentColumnContainer #hook_Block_MiddleCardAndMenu #hook_Block_MiddleColumn_TopBoxNavigation #topBoxNavigationContainer ul li:nth-child(2) #hook_NavMenuItem_smUserFriends span" : "Prieteni",
				"#hook_Block_ContentColumnContainer #hook_Block_MiddleCardAndMenu #hook_Block_MiddleColumn_TopBoxNavigation #topBoxNavigationContainer ul li:nth-child(3) #hook_NavMenuItem_smUserPhotos span" : "Poze",
				"#hook_Block_ContentColumnContainer #hook_Block_MiddleCardAndMenu #hook_Block_MiddleColumn_TopBoxNavigation #topBoxNavigationContainer ul li:nth-child(4) #hook_NavMenuItem_smUserInterests span" : "Interese"
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