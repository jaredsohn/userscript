// ==UserScript==
// @name          C.S.UI
// @description	  Changes the UI
// @author        DIGEC
// @include       https://*.salesforce.com/*    
// ==/UserScript==

(function(){

// Chargement CSS 
  var css = <><![CDATA[

  /*background de la page*/ 
	body.sfdcBody{background:none repeat scroll 0 0 gray;} body .bPageFooter a, body .bPageFooter {color:gray}
	/* barre de menu */ 
  body #AppBodyHeader .phHeader {background-color:gray}";
  /* barre de menu coins gauche et droit*/
  body table.phHeader td.left {background:none no-repeat scroll left bottom transparent;}
  body table.phHeader td.right {background:none no-repeat scroll left bottom transparent;}
  body .tabsNewBar .tabNavigation {background:#88146A;}
  /* Selection du menu*/
  body .tabNavigation .tab .currentTab div {background:gray;}
  /* coins droit et gauche du menu*/ 
  body .tabsNewBar .tabNavigation .tabBarLeft {background:#88146A;}
  body .tabsNewBar .tabNavigation .tabBarRight {background:#88146A;}
  /* menu non selectionné */ 
  body .tabNavigation .tab a  {color:white;} 
  
  /* barre latérale ... */ 
  #sidebarDiv .menuButton {background:#88146A;}
  #sidebarDiv .searchModule .sidebarModuleHeader { background-color:#88146A;color:black;}
  #sidebarDiv .searchModule .sidebarModuleBody {background-color:#88146A;color:black;padding-top:0;}
  #sidebarDiv .sidebarModuleHeader {background-color:#88146A;color:black;}
  #sidebarDiv .recentItemModule .sidebarModuleBody {background-color:#88146A;color:black;}
  #sidebarDiv .nestedModule {background-color:#88146A;color:black;}
  #sidebarDiv .nestedModule .nestedModuleInner {background-color:#88146A;color:black}

]]></>;
    
  // application du css construit précédement ...   
	if(typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	}else if(typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	}else if(typeof addStyle != "undefined") {
		addStyle(css);
	}else{
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	} 
	
})();