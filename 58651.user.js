var GMSU_meta_58651 = <><![CDATA[
// ==UserScript==
	// @name          Userscript_menu_extender
	// @namespace     Userscript_menu_extender
	// @author        full_interest
	// @source        http://userscripts.org/scripts/show/
	// @identifier		http://userscripts.org/scripts/source/58651.user.js
	// @description	  Userscript menu extender (2.0.2)
	// @version       2.0.2
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://userscripts.org/scripts/source/50018.user.js
// @require        http://userscripts.org/scripts/source/51513.user.js
// @require        http://userscripts.org/scripts/source/55848.user.js
// 55848 -> Fonctions diverses (full_interest)
	// @include       http://userscripts.org/scripts/*
// @uso:script     58651
// ==/UserScript==
]]></>;

//			Mise à jours				
GMSU.setCheckInterval(2);	//Usage GMSU.setLang(string lang)
GMSU.init(58651);			//Usage GMSU.init(int scriptID, optional boolean force, optional boolean depForce)
GMSU.setLang("fr");			//Usage setCheckInterval(int days)
//			Fin mise à jour				

var Userscriptaddmenus = {
editsrc : {typepage:"edit_src",title:"Edit source"},
edit : {typepage:"edit",title:"Edit"},
}

var menu = getIdCtrl.$('script-nav');
if (menu && typeof menu.innerHTML == "string") {
	var regID = /(?:.*href=\"\/scripts\/.*\/(\d{0,5})" .*>.*<\/a><\/li>.*)/;
	var scriptID = regID.exec(getIdCtrl.$('script-nav').innerHTML);
	if (VarCtrl.type_de(scriptID)=="array") {
		if (/(?:admin)/ig.test(menu.innerHTML) == true) {
			for (name in Userscriptaddmenus) {
				if (Userscriptaddmenus.hasOwnProperty(name) === true) {
					var editlink="http://userscripts.org/scripts/"+Userscriptaddmenus[name].typepage+"/"+scriptID[1];
					if (menu.innerHTML.indexOf(editlink)==-1){
						var li_class = (location.href==editlink) ? 'menu current' : 'menu';
						menu.innerHTML=/(.*Admin.*\n)/i.exec(menu.innerHTML)[1]+"            <li class='"+li_class+"'><a href='"+editlink+"'  class=\"admin\">"+Userscriptaddmenus[name].title+"</a></li>\n"+RegExp.rightContext;
					}
				}
			}
		}
	}
}
