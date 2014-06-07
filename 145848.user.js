// ==UserScript==
// @name		Scripts_SpacesWars_debugMode
// @namespace	none
//
// @include		http://spaceswars.fr*
// @include		http://www.spaceswars.fr*
// @include		http://spaceswars.com*
// @include		http://www.spaceswars.com*
// @include		http://niark.spaceswars.fr/userscripts/NiArK_SpacesWars/config.php*
//
// @include		http://spaceswars.com/forum*
// @include		http://www.spaceswars.com/forum*
// @include		http://spaceswars.fr/forum*
// @include		http://www.spaceswars.fr/forum*
//
// ==/UserScript==
// 
// userscript created by NiArK
//						(some scripts by d4rkv3nom, banned for bot using...)
//
// bugs :
// 1- var name 'location' makes Opera bugging
// 2- add innerHTML after addEventListener don't work (Clic&Go, weird, maybe because of my code)

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
var nbScripts		= 8;
var thisVersion		= "4.1";
var user			= "user";
var configLink		= "http://niark.spaceswars.fr/userscripts/NiArK_SpacesWars/config.php";
var versionLink		= "http://niark.spaceswars.fr/userscripts/NiArK_SpacesWars/version.php?user="+user;
var gmicon			= "http://niark.spaceswars.fr/userscripts/NiArK_SpacesWars/images/gm_icon.png";
var infos_version	= eval("("+GM_getValue("infos_version")+")");
var infos_scripts	= eval("("+GM_getValue("infos_scripts")+")");
var L_=[], lang="fr";

var zeroclipboard	= "http://niark.spaceswars.fr/zeroclipboard/";
var scripts_icons	= "http://niark.spaceswars.fr/userscripts/NiArK_SpacesWars/images/";
var scripts_scripts	= "http://niark.spaceswars.fr/userscripts/NiArK_SpacesWars/scripts/";
var carto_link		= "http://niark.spaceswars.fr/userscripts/NiArK_SpacesWars/carto.php";

function can_load_in_page(script)
{
	// type "1" : get all the matching pages
	// type "2" : get all the not matching pages
	var tab = {};
		tab["RConverter"] = {};
			tab["RConverter"]["type"]	= 1;
			tab["RConverter"]["rw"]		= true;
		tab["EasyFarm"] = {};
			tab["EasyFarm"]["type"]		= 1;
			tab["EasyFarm"]["messages"] = true;
		tab["AllinDeut"] = {};
			tab["AllinDeut"]["type"]		= 1;
			tab["AllinDeut"]["buildings"]	= true;
			tab["AllinDeut"]["research"]	= true;
		tab["Carto"] = {};
			tab["Carto"]["type"]	= 1;
			tab["Carto"]["galaxy"]	= true;
		tab["iFly"] = {};
			tab["iFly"]["type"]		= 1;
			tab["iFly"]["overview"] = true;
		tab["TChatty"] = {};
			tab["TChatty"]["type"] = 1;
			tab["TChatty"]["chat"] = true;
		tab["Markit"] = {};
			tab["Markit"]["type"]	= 1;
			tab["Markit"]["galaxy"]	= true;
		tab["ClicNGo"] = {};
			tab["ClicNGo"]["type"]	= 1;
			tab["ClicNGo"]["index"]	= true;
		tab["More_moonsList"] = {};
			tab["More_moonsList"]["type"]	= 2;
			tab["More_moonsList"]["chat"]	= false;
			tab["More_moonsList"]["forum"]	= false;
			tab["More_moonsList"]["index"]	= false;
			tab["More_moonsList"]["niark"]	= false;
			tab["More_moonsList"]["rw"]		= false;
		tab["More_convertDeut"] = {};
			tab["More_convertDeut"]["type"]		= 1;
			tab["More_convertDeut"]["marchand"]	= true;
		tab["More_traductor"] = {};
			tab["More_traductor"]["type"]		= 1;
			tab["More_traductor"]["chat"]		= true;
			tab["More_traductor"]["forum"]		= true;
			tab["More_traductor"]["messages"]	= true;
		tab["More_resources"] = {};
			tab["More_resources"]["type"]		= 1;
			tab["More_resources"]["resources"]	= true;
		tab["More_redirectFleet"] = {};
			tab["More_redirectFleet"]["type"]		= 1;
			tab["More_redirectFleet"]["floten3"]	= true;
		tab["More_arrows"] = {};
			tab["More_arrows"]["type"]	= 2;
			tab["More_arrows"]["chat"]	= false;
			tab["More_arrows"]["forum"]	= false;
			tab["More_arrows"]["index"]	= false;
			tab["More_arrows"]["niark"]	= false;
			tab["More_arrows"]["rw"]	= false;
		tab["More_returns"] = {};
			tab["More_returns"]["type"]		= 1;
			tab["More_returns"]["overview"]	= true;

	if (tab[script]["type"] == 1)
	{
		if (tab[script][page] == undefined) return false;
		else return true;
	}
	if (tab[script]["type"] == 2)
	{
		if (tab[script][page] == undefined) return true;
		else return false;
	}
	
	return false;
}
function get_slashed_nb(nStr)
{
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}
function set_dictionnary()
{
	var tab = [];
	switch (lang)
	{
		case "fr" :	{
					tab["newVersion"]		= "Nouvelle version disponible.\r\nCliquez sur l'icône du menu de gauche pour plus d'informations.";
					tab["cantxml"]			= "Votre navigateur ne vous permet pas d'envoyer des données vers la cartographie";
					tab["ClicNGo_universe"]	= "Univers";
					tab["ClicNGo_username"]	= "Pseudo";
					tab["ClicNGo_number"]	= "Numéro";
					tab["RConverter_HoF"]	= "Cochez si c'est un HoF (afin d'ajouter le lien, obligatoire sur le forum)";
					tab["RConverter_help"]	= "Appuyez sur Ctrl+C pour copier, Ctrl+V pour coller";
					tab["iFly_deutfly"]		= "Deutérium en vol";
					tab["iFly_metal"]		= "Métal";
					tab["Markit_rank"]		= "Place";
					tab["More_allTo"]		= "Tout mettre à...";
					tab["More_convertInto"]	= "Tout convertir en";
					tab["More_crystal"]		= "cristal";
					tab["More_deuterium"]	= "deutérium";
					tab["EasyFarm_attack"] = "Attaquer";
					tab["EasyFarm_looting"] = "Pillage";
					tab["EasyFarm_ruinsField"] = "Champ de ruines";
					tab["EasyFarm_spyReport"] = "Rapport d'espionnage";
					tab["EasyFarm_metal"] = "Métal";
					tab["EasyFarm_deuterium"] = "Deutérium";
					tab["EasyFarm_defenses"] = "Défenses";
					tab["AllinDeut_metal"] = "Métal";
					tab["AllinDeut_crystal"] = "Cristal";
					tab["AllinDeut_deuterium"] = "Deutérium";
					tab["small cargo"] = "Petit transporteur";
					tab["large cargo"] = "Grand transporteur";
					tab["light fighter"] = "Chasseur léger";
					tab["heavy fighter"] = "Chasseur lourd";
					tab["cruiser"] = "Croiseur";
					tab["battleship"] = "Vaisseau de bataille";
					tab["colony ship"] = "Vaisseau de colonisation";
					tab["recycler"] = "Recycleur";
					tab["espionage probe"] = "Sonde espionnage";
					tab["bomber"] = "Bombardier";
					tab["solar satellite"] = "Satellite solaire";
					tab["destroyer"] = "Destructeur";
					tab["deathstar"] = "Étoile de la mort";
					tab["battlecruiser"] = "Traqueur";
					tab["supernova"] = "Supernova";
					tab["massive cargo"] = "Convoyeur";
					tab["collector"] = "Collecteur";
					tab["blast"] = "Foudroyeur";
					tab["extractor"] = "Vaisseau Extracteur";
					tab["alliance"] = "Alliance";
					tab["chat"] = "Chat";
					tab["help / guide"] = "Aide / Guide";
					tab["board"] = "Forum";
					tab["options"] = "Options";
					tab["support"] = "Support";
					tab["available"] = "Disponible";
					tab["all to"] = "Tout mettre à";
					tab["send"] = "Envoyer";
					tab["universe"] = "Univers";
					}
					break;
		case "en" :	{
					tab["newVersion"]		= "New version avaliable.\r\nClick on the left menu icon for more information.";
					tab["cantxml"]			= "Your browser can't send datas to your cartography";
					tab["ClicNGo_universe"]	= "Universe";
					tab["ClicNGo_username"]	= "Username";
					tab["ClicNGo_number"]	= "Number";
					tab["RConverter_HoF"]	= "Check it if it's a HoF (to add the link, mandatory on the board)";
					tab["RConverter_help"]	= "Press Ctrl+C to copy, Ctrl+V to paste";
					tab["iFly_deutfly"]		= "Deuterium flying";
					tab["iFly_metal"]		= "Metal";
					tab["Markit_rank"]		= "Place";
					tab["More_allTo"]		= "Set all to...";
					tab["More_convertInto"]	= "Exchange all in ";
					tab["More_crystal"]		= "crystal";
					tab["More_deuterium"]	= "deuterium";
					tab["EasyFarm_attack"] = "Attack";
					tab["EasyFarm_looting"] = "Looting";
					tab["EasyFarm_ruinsField"] = "Ruins field";
					tab["EasyFarm_spyReport"] = "Spy report";
					tab["EasyFarm_metal"] = "Metal";
					tab["EasyFarm_deuterium"] = "Deuterium";
					tab["EasyFarm_defenses"] = "Defenses";
					tab["AllinDeut_metal"] = "Metal";
					tab["AllinDeut_crystal"] = "Crystal";
					tab["AllinDeut_deuterium"] = "Deuterium";
					tab["small cargo"] = "Small cargo";
					tab["large cargo"] = "Large cargo";
					tab["light fighter"] = "Light Fighter";
					tab["heavy fighter"] = "Heavy Fighter";
					tab["cruiser"] = "Cruiser";
					tab["battleship"] = "Battleship";
					tab["colony ship"] = "Colony Ship";
					tab["recycler"] = "Recycler";
					tab["espionage probe"] = "Espionage Probe";
					tab["bomber"] = "Bomber";
					tab["solar satellite"] = "Solar Satellite";
					tab["destroyer"] = "Destroyer";
					tab["deathstar"] = "Deathstar";
					tab["battlecruiser"] = "Battlecruiser";
					tab["supernova"] = "Supernova";
					tab["massive cargo"] = "Massive cargo";
					tab["collector"] = "Collector";
					tab["blast"] = "Blast";
					tab["extractor"] = "Extractor";
					tab["alliance"] = "Alliance";
					tab["chat"] = "Chat";
					tab["help / guide"] = "Help / Guide";
					tab["board"] = "Board";
					tab["options"] = "Options";
					tab["support"] = "Support";
					tab["available"] = "Available";
					tab["all to"] = "Set all to";
					tab["send"] = "Send";
					tab["universe"] = "Universe";
					}
					break;
		default :	alert("Error with language !");
					return 0;
					break;
	}
	return tab;
}
function check_new_version()
{
/*************************/
insert_in_console("checking new version...");
/*************************/
	if (infos_version.toUp)
	{
		alert(L_["newVersion"]);
		return true;
	}
	
	var date = new Date();
	if (date.getTime() - infos_version.lastCheck >= 86400000)
	{
		GM_xmlhttpRequest({ url:versionLink, method:"get", data:"user="+user, onerror:function(response){alert("error "+response.status);},
							onload:function(response){	if (response.responseText != infos_version.version)
														{
															infos_version.toUp = true;
															alert(L_["newVersion"]);
														}
														infos_version.lastCheck = date.getTime();
														GM_setValue("infos_version", JSON.stringify(infos_version));
						}});
/*************************/
insert_in_console("end of checking");
/*************************/
	}
}
function set_infos_version()
{
	var date = new Date();
	var tab = {};
		tab.version		= "4.1";
		tab.language	= "fr";
		tab.news		= "";
		tab.nbUnis		= 12;
		tab.toUp		= false;
		tab.lastCheck	= date.getTime();
	GM_setValue("infos_version", JSON.stringify(tab));
	return tab[0];
}
function set_infos_scripts()
{
	var list = {};
		list.RConverter = 1;
		list.EasyFarm = 1;
		list.AllinDeut = 1;
		list.Carto = 1;
		list.iFly = 1;
		list.TChatty = 1;
		list.Markit = 1;
		list.More = 1;
	GM_setValue("infos_scripts", JSON.stringify(list));
	return list;
}
function set_config_scripts(uni)
{
	if (uni > infos_version.nbUnis)
	{
		infos_version.nbUnis = uni;
		GM_setValue("infos_version", JSON.stringify(infos_version));
	}
	
	var list = {};
	if (uni != 0) // => ingame
	{
		list.RConverter = {};
			list.RConverter.header		= "";
			list.RConverter.boom		= "";
			list.RConverter.destroyed	= "";
			list.RConverter.result		= "";
			list.RConverter.renta		= "";
		list.EasyFarm = {};
			list.EasyFarm.minPillage= 0;
			list.EasyFarm.colorPill	= "871717";
			list.EasyFarm.minCDR	= 0;
			list.EasyFarm.colorCDR	= "178717";
		list.Carto = "";
		list.TChatty = {};
			list.TChatty.color	= "FFFFFF";
		list.Markit = {};
			list.Markit.color = {};
				list.Markit.color["default"]= "FFFFFF";
				list.Markit.color["fridge"]	= "30A5FF";
				list.Markit.color["bunker"]	= "FF9317";
				list.Markit.color["raidy"]	= "44BA1F";
				list.Markit.color["dont"]	= "FF2626";
			list.Markit.coord = {};
			list.Markit.ranks	= 1;
			list.Markit.topX	= 50;
			list.Markit.topColor= "FF2626";
		list.More = {};
			list.More.moonsList		= 1;
			list.More.convertDeut	= 1;
			list.More.traductor		= 1;
			list.More.resources		= 1;
			list.More.redirectFleet	= 1;
			list.More.arrows		= 1;
			list.More.returns		= 1;
	}
	else // => index / niark / forum
	{
		list.ClicNGo = {};
			list.ClicNGo.universes	= [];
			list.ClicNGo.usernames	= [];
			list.ClicNGo.passwords	= [];
		list.More = {};
			list.More.traductor		= 1;
	}
	GM_setValue("config_scripts_uni_"+uni, JSON.stringify(list));
	return list;
}
function get_infos_from_page()
{
	var list = {};
		if (/spaceswars\.(?:fr|com)/.test(window.location.href))
			list.location = "index";
		if (/spaceswars\.(?:fr|com)\/univers[0-9]{1,2}\/(.*)\.php/.test(window.location.href))
			list.location = /spaceswars\.(?:fr|com)\/univers[0-9]{1,2}\/(.*)\.php/.exec(window.location.href)[1];
		if (/niark/.test(window.location.href))
			list.location = "niark";
		if (/spaceswars\.(?:fr|com)\/forum*/.test(window.location.href))
			list.location = "forum";
		list.universe = (/univers([0-9]{1,2})/.test(window.location.href)) ? /univers([0-9]{1,2})/.exec(window.location.href)[1] : 0;
	return list;
}
function get_dom_xpath(xpath, inDom, row)
{
	var tab = [];
	var alltags = document.evaluate(xpath, inDom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<alltags.snapshotLength; i++)
		tab[i] = alltags.snapshotItem(i);
	if (row == -1)		return tab;
	if (row == -42)		return tab[tab.length-1];
	else				return tab[row];
}
function build_node (type, attr, attrValue, content, event, eventFunc)
{
	var elem = document.createElement(type);
	for (var i=0; i<attr.length; i++)
		elem.setAttribute(attr[i], attrValue[i]);
	if (event)
		elem.addEventListener(event, eventFunc, false);
	elem.innerHTML = content;
	return elem;
}
function sw_to_number_rc(sw_stringnumber) //Spécial pour les RC ( virgules à la place des points)
{
	var sw_number = parseInt(sw_stringnumber.replace(/\,/g,''));
	return sw_number;
}
function get_nb_from_stringtab (tab)
{
	var result="";
	for (k=0; k<tab.length; k++)
		result += tab[k];
	return parseInt(result);
}
function send_datas_to_carto()
{
/*************************/
insert_in_console("user clicked to send datas to carto");
/*************************/
	if (this.GM_xmlhttpRequest.toString().indexOf("not supported")>-1)
		alert(L_["cant_xml"]);
	var infos = encodeURIComponent(config.Carto);
	document.getElementById("loader").style.display = "inline-block";
	document.getElementById("Carto_send").style.display = "none";
/*************************/
insert_in_console("sending datas ...");
/*************************/
	GM_xmlhttpRequest({	method: "POST", url: carto_link,
						data: "univers="+uni+"&data="+infos,
						headers: {"Content-Type": "application/x-www-form-urlencoded"},
						onload: function(response) {		document.getElementById("loader").style.display = "none";
															document.getElementById("Carto_send").style.display = "inline-block";
															if (response.responseText!="") alert(response.responseText);
/*************************/
insert_in_console("got response : '"+response.responseText+"'");
/*************************/
						}});
}
function insert_in_console(line)
{
	document.getElementById("consoleGM").value += line+"\r\n";
}

var textarea = build_node("textarea", ["onclick", "ondblclick", "id", "cols", "rows", "style", "readonly"], ["this.select();this.parentNode.getElementsByTagName('body')[0].style.opacity='0.2';", "this.parentNode.getElementsByTagName('body')[0].style.opacity = '1';", "consoleGM", 100, 5, "position:absolute;top:0;left:0;text-align:center;border-radius:5px;border:1px solid #545454;background-color:black;color:#CDD7F8;font:12px Times New Roman normal;", "readonly"], "Debug Console\r\n");
if (get_infos_from_page().location != "frames")		document.body.style.opacity = "0.2";
if (get_infos_from_page().location == "leftmenu"){	document.body.style.marginTop = "100px"; textarea.cols = "27";	}
if (get_infos_from_page().location != "frames")		document.body.parentNode.appendChild(textarea);
/*************************/
insert_in_console("vars and functions loaded. page: "+get_infos_from_page().location+", uni:"+get_infos_from_page().universe);
/*************************/


// checking...
if (infos_version == undefined || infos_version.version != thisVersion)
{
/*************************/
insert_in_console("checking new version...");
/*************************/
	// ... 1st install ?
	if (infos_version == undefined)
	{
/*************************/
insert_in_console("infos_version not defined");
/*************************/
		infos_version	= set_infos_version();
		infos_scripts	= set_infos_scripts();
		
		// get a message if can't have the gm icon without F5 refresh (frames)
		var page = get_infos_from_page().location;
		if (infos_version.version == thisVersion && page != "niark" && page != "index" && page != "forum" && page != "leftmenu" && page != "frames")
			alert("Script installé. Appuyez sur F5.\n\nScript installed. Press F5.");
/*************************/
insert_in_console("infos_version now defined : "+infos_version.version);
/*************************/
	}
	
	// ... just as updating ?
	if (infos_version.version != thisVersion)
	{
/*************************/
insert_in_console("version is not the 4.1");
/*************************/
		if (infos_version.version == undefined) // 3.8 version
		{
/*************************/
insert_in_console("infos_version.version not defined : "+infos_version[0]);
/*************************/
			GM_deleteValue("infos_version");
			GM_deleteValue("infos_scripts");
			GM_deleteValue("options_script0");
			GM_deleteValue("options_script1");
			GM_deleteValue("options_script2");
			GM_deleteValue("options_script3");
			GM_deleteValue("options_script4");
			GM_deleteValue("options_script5");
			GM_deleteValue("options_script6");
			GM_deleteValue("options_script7");
			GM_deleteValue("options_script8");
/*************************/
insert_in_console("infos_version + infos_scripts + options_script0-8 deleted");
/*************************/
			infos_version	= set_infos_version();
			infos_scripts	= set_infos_scripts();
/*************************/
insert_in_console("infos_version + infos_scripts set. version is now : "+infos_version.version);
/*************************/
			// get a message if can't have the gm icon without F5 refresh (frames)
			var page = get_infos_from_page().location;
			if (page != "niark" && page != "index" && page != "forum" && page != "leftmenu" && page != "frames")
				alert("Script installé. Appuyez sur F5.\n\nScript installed. Press F5.");
/*************************/
insert_in_console("script now installed");
/*************************/
		}
		if (infos_version.version == "4.0")
		{
/*************************/
insert_in_console("version is the 4.0");
/*************************/
			var config;
			GM_deleteValue("config_scripts_uni_0");
			set_config_scripts(0);
/*************************/
insert_in_console("config_scripts_uni_0 redefined");
/*************************/
			for (var i=1; i<=12; i++)
			{
				config	= eval("("+GM_getValue("config_scripts_uni_"+i)+")");
				if (config != undefined)
				{
					config.Markit.topX				= 50;
					config.Markit.topColor			= "FF2626";
					config.More.returns				= 1;
					config.EasyFarm.colorPill		= "871717";
					config.EasyFarm.colorCDR		= "178717";
					config.TChatty.color			= "FFFFFF";
					config.Markit.color["default"]	= "FFFFFF";
					config.Markit.color["fridge"]	= "30A5FF";
					config.Markit.color["bunker"]	= "FF9317";
					config.Markit.color["raidy"]	= "44BA1F";
					config.Markit.color["dont"]		= "FF2626";
					GM_setValue("config_scripts_uni_"+i, JSON.stringify(config));
				}
			}
			infos_version = set_infos_version();
/*************************/
insert_in_console("config_scripts_uni_1-12 modifyed (color bug fixed, adding topX+topColor+returns");
/*************************/
			// get a message if can't have the gm icon without F5 refresh (frames)
			var page = get_infos_from_page().location;
			if (page != "niark" && page != "index" && page != "forum" && page != "leftmenu" && page != "frames")
				alert("Script mis à jour.\n\nScript updated.");
/*************************/
insert_in_console("script updated");
/*************************/
		}
	}
}

// the variable name 'location' makes Opera bugging
var page			= get_infos_from_page().location;
var lang			= infos_version.language;
var L_				= set_dictionnary();
var nbUnis			= infos_version.nbUnis;
/*************************/
insert_in_console("vars page + lang + L_ + nbUnis defined");
/*************************/


	if (page != "forum" && page != "niark" && page != "index")
	{
		var uni				= get_infos_from_page().universe;
		var config			= eval("("+GM_getValue("config_scripts_uni_"+uni)+")");
							if (config == undefined) config = set_config_scripts(uni);
/*************************/
insert_in_console("got config_scripts_uni_"+uni);
/*************************/
	}
	
	
	if (page == "forum" || page == "index")
	{
		var config			= eval("("+GM_getValue("config_scripts_uni_0")+")");
							if (config == undefined) config = set_config_scripts(0);
/*************************/
insert_in_console("got config_scripts_uni_0 (in page : "+page+")");
/*************************/
	}
	
	
	if (page == "leftmenu")
	{
/*************************/
insert_in_console("in leftmenu : check NV for SW & GMscript + get and set lang");
/*************************/
		// NV for SW ?
		if (document.getElementsByClassName("lm_lang")[0] == undefined)
		{
			alert("Post on the forum (http://spaceswars.com/forum/viewforum.php?f=219)\r\nwith this message :\t'lang_box problem'\r\nThanks.\r\nNiArK");
			return 0;
		}
		// get lang
		var logout_box = get_dom_xpath("//a[@href='logout.php']", document, 0);
		if (logout_box.innerHTML == "Logout") infos_version.language = "en";
		else infos_version.language = "fr";
		GM_setValue("infos_version", JSON.stringify(infos_version));
		lang = infos_version.language;
/*************************/
insert_in_console("got lang, set to : "+lang);
/*************************/
		// gm_icon
		var lang_box = get_dom_xpath("//div[@class='lm_lang']", document, 0);
		var gm_icon = build_node(	"div", ["class", "style"], ["lm_lang", "float:right; margin-right:5px;"],
									"<a href='"+configLink+"?lang="+lang+"&uni="+get_infos_from_page().universe+"' target='Hauptframe' title='Scripts_SpacesWars'>"
										+"<img src='"+gmicon+"' alt='GM'/></a>");
		lang_box.appendChild(gm_icon);
/*************************/
insert_in_console("gm icon added in lang box");
/*************************/
		// NV for script ?
		check_new_version();
	}
	
	
	if (page == "niark")
	{
/*************************/
insert_in_console("in niark page. displaying version 4.1 blocks");
/*************************/
		var versionClass = get_dom_xpath("//div[@class='version4.1']", document, -1);
		for (var i=0; i<versionClass.length; i++)
		{
/*************************/
insert_in_console("block #"+i);
/*************************/
			versionClass[i].style.display = "block";
		}
/*************************/
insert_in_console("version 4.1 blocks shown");
/*************************/
		document.getElementById("no_userscript").setAttribute("class", "hidden");
		document.getElementById("userscript").setAttribute("class", "");
/*************************/
insert_in_console("userscript block displayed, no_userscript block hidden");
/*************************/
		var uni				= parseInt(document.getElementById("uni").innerHTML);
		var config			= eval("("+GM_getValue("config_scripts_uni_"+uni)+")");
		var actives 		= get_dom_xpath("//div[@class='script_active']/input[1]", document, -1), script;
		var options			= get_dom_xpath("//div[@class='script_options']", document, -1), inputs;
/*************************/
insert_in_console("config vars loaded. setting config in all inputs");
/*************************/
		for (var i=0; i<nbScripts; i++)
		{
			script = /(.*)_activate/.exec(actives[i].id)[1];
			(infos_scripts[script]) ? actives[i].checked = true : actives[i].parentNode.getElementsByTagName("input")[1].checked = "false";
/*************************/
insert_in_console("setting inputs for script #"+i+", name:"+script+", active?"+infos_scripts[script]);
/*************************/
			switch(script)
			{
				case "RConverter" :	inputs = options[0].getElementsByTagName("input");
									inputs[0].value = config.RConverter.header;
/*************************/
insert_in_console(".header:"+config.RConverter.header);
/*************************/
									inputs[1].value = config.RConverter.boom;
/*************************/
insert_in_console(".boom:"+config.RConverter.boom);
/*************************/
									inputs[2].value = config.RConverter.destroyed;
/*************************/
insert_in_console(".destroyed:"+config.RConverter.destroyed);
/*************************/
									inputs[3].value = config.RConverter.result;
/*************************/
insert_in_console(".result:"+config.RConverter.result);
/*************************/
									inputs[4].value = config.RConverter.renta;
/*************************/
insert_in_console(".renta:"+config.RConverter.renta);
/*************************/
									break;
				case "EasyFarm" :	inputs = options[1].getElementsByTagName("input");
									inputs[0].value = config.EasyFarm.minPillage;
/*************************/
insert_in_console(".minPillage:"+config.EasyFarm.minPillage);
/*************************/
									inputs[1].value = config.EasyFarm.colorPill;
/*************************/
insert_in_console(".colorPill:"+config.EasyFarm.colorPill);
/*************************/
									inputs[2].value = config.EasyFarm.minCDR;
/*************************/
insert_in_console(".minCDR:"+config.EasyFarm.minCDR);
/*************************/
									inputs[3].value = config.EasyFarm.colorCDR;
/*************************/
insert_in_console(".colorCDR:"+config.EasyFarm.colorCDR);
/*************************/
									break;
				case "Carto" :		inputs = options[2].getElementsByTagName("input");
									inputs[0].addEventListener("click", function(){send_datas_to_carto();}, false);
									inputs[1].addEventListener("click", function(){
/*************************/
insert_in_console("user clicked on 'Consult' input");
/*************************/
									alert(config.Carto);}, false);
									inputs[2].addEventListener("click", function(){if(confirm("Reset ?")){
/*************************/
insert_in_console("user confirmed to reset carto datas saved");
/*************************/
									config.Carto="";GM_setValue("config_scripts_uni_"+uni, JSON.stringify(config));}}, false);
									break;
				case "Markit" :		inputs = options[3].getElementsByTagName("input");
									inputs[0].value = config.Markit.color.fridge;
/*************************/
insert_in_console(".color.fridge:"+config.Markit.color.fridge);
/*************************/
									inputs[1].value = config.Markit.color.bunker;
/*************************/
insert_in_console(".color.bunker:"+config.Markit.color.bunker);
/*************************/
									inputs[2].value = config.Markit.color.raidy;
/*************************/
insert_in_console(".color.raidy:"+config.Markit.color.raidy);
/*************************/
									inputs[3].value = config.Markit.color.dont;
/*************************/
insert_in_console(".color.dont:"+config.Markit.color.dont);
/*************************/
									inputs[4].addEventListener("click", function(){if(confirm("Reset ?")){
/*************************/
insert_in_console("user confirmed to reset markit coord saved");
/*************************/
									config.Markit.coord={};GM_setValue("config_scripts_uni_"+uni, JSON.stringify(config));}}, false);
									if (config.Markit.ranks) inputs[5].checked = true;
/*************************/
insert_in_console(".ranks:"+config.Markit.ranks);
/*************************/
									inputs[7].value	= config.Markit.topX;
/*************************/
insert_in_console(".topX:"+config.Markit.topX);
/*************************/
									inputs[8].value	= config.Markit.topColor;
/*************************/
insert_in_console(".topColor:"+config.Markit.topColor);
/*************************/
									break;
				case "More" :		inputs = options[4].getElementsByTagName("input");
									if (config.More.moonsList) inputs[0].checked=true;
/*************************/
insert_in_console(".moonsList:"+config.More.moonsList);
/*************************/
									if (config.More.convertDeut) inputs[2].checked=true;
/*************************/
insert_in_console(".convertDeut:"+config.More.convertDeut);
/*************************/
									if (config.More.traductor) inputs[4].checked=true;
/*************************/
insert_in_console(".traductor:"+config.More.traductor);
/*************************/
									if (config.More.resources) inputs[6].checked=true;
/*************************/
insert_in_console(".resources:"+config.More.resources);
/*************************/
									if (config.More.redirectFleet) inputs[8].checked=true;
/*************************/
insert_in_console(".redirectFleet:"+config.More.redirectFleet);
/*************************/
									if (config.More.arrows) inputs[10].checked=true;
/*************************/
insert_in_console(".arrows:"+config.More.arrows);
/*************************/
									if (config.More.returns) inputs[12].checked=true;
/*************************/
insert_in_console(".returns:"+config.More.returns);
/*************************/
									break;
			}
/*************************/
insert_in_console("inputs set for the script #"+i);
/*************************/
		}
		
		get_dom_xpath("id('tooltip_0')/img", document, 0).addEventListener("click", function(){
/*************************/
insert_in_console("user clicked on 'save config' image");
/*************************/
						this.src = scripts_icons+"loading.gif";
						for (var i=0; i<nbScripts; i++)
						{
							script = /(.*)_activate/.exec(actives[i].id)[1];
/*************************/
insert_in_console("get inputs value for script #"+i+", name : "+script);
/*************************/
							infos_scripts[script] = actives[i].checked;
/*************************/
insert_in_console("infos_scripts : "+actives[i].checked);
/*************************/
							switch(script)
							{
								case "RConverter" :	inputs = options[0].getElementsByTagName("input");
													config.RConverter.header = inputs[0].value;
/*************************/
insert_in_console(".header:"+inputs[0].value);
/*************************/
													config.RConverter.boom = inputs[1].value;
/*************************/
insert_in_console(".boom:"+inputs[1].value);
/*************************/
													config.RConverter.destroyed = inputs[2].value;
/*************************/
insert_in_console(".destroyed:"+inputs[2].value);
/*************************/
													config.RConverter.result = inputs[3].value;
/*************************/
insert_in_console(".result:"+inputs[3].value);
/*************************/
													config.RConverter.renta = inputs[4].value;
/*************************/
insert_in_console(".renta:"+inputs[4].value);
/*************************/
													break;
								case "EasyFarm" :	inputs = options[1].getElementsByTagName("input");
													config.EasyFarm.minPillage = parseInt(inputs[0].value);
/*************************/
insert_in_console(".minPillage:"+parseInt(inputs[0].value));
/*************************/
													config.EasyFarm.colorPill = inputs[1].value;
/*************************/
insert_in_console(".colorPill:"+inputs[1].value);
/*************************/
													config.EasyFarm.minCDR = parseInt(inputs[2].value);
/*************************/
insert_in_console(".minCDR:"+inputs[2].value);
/*************************/
													config.EasyFarm.colorCDR = inputs[3].value;
/*************************/
insert_in_console(".colorCDR:"+inputs[3].value);
/*************************/
													break;
								case "Markit" :		inputs = options[3].getElementsByTagName("input");
													config.Markit.color.fridge = inputs[0].value;
/*************************/
insert_in_console(".color.fridge:"+inputs[0].value);
/*************************/
													config.Markit.color.bunker = inputs[1].value;
/*************************/
insert_in_console(".color.bunker:"+inputs[1].value);
/*************************/
													config.Markit.color.raidy = inputs[2].value;
/*************************/
insert_in_console(".color.raidy:"+inputs[2].value);
/*************************/
													config.Markit.color.dont = inputs[3].value;
/*************************/
insert_in_console(".color.dont:"+inputs[3].value);
/*************************/
													config.Markit.ranks = inputs[5].checked;
/*************************/
insert_in_console(".ranks:"+inputs[5].checked);
/*************************/
													config.Markit.topX = parseInt(inputs[7].value);
/*************************/
insert_in_console(".topX:"+parseInt(inputs[7].value));
/*************************/
													config.Markit.topColor = inputs[8].value;
/*************************/
insert_in_console(".topColor:"+inputs[8].value);
/*************************/
													break;
								case "More" :		inputs = options[4].getElementsByTagName("input");
													config.More.moonsList = inputs[0].checked;
/*************************/
insert_in_console(".moonsList:"+inputs[0].checked);
/*************************/
													config.More.convertDeut = inputs[2].checked;
/*************************/
insert_in_console(".convertDeut:"+inputs[2].checked);
/*************************/
													config.More.traductor = inputs[4].checked;
/*************************/
insert_in_console(".traductor:"+inputs[4].checked);
/*************************/
													config.More.resources = inputs[6].checked;
/*************************/
insert_in_console(".resources:"+inputs[6].checked);
/*************************/
													config.More.redirectFleet = inputs[8].checked;
/*************************/
insert_in_console(".redirectFleet:"+inputs[8].checked);
/*************************/
													config.More.arrows = inputs[10].checked;
/*************************/
insert_in_console(".arrows:"+inputs[10].checked);
/*************************/
													config.More.returns = inputs[12].checked;
/*************************/
insert_in_console(".returns:"+inputs[12].checked);
/*************************/
													break;
							}
						}
						GM_setValue("config_scripts_uni_"+uni, JSON.stringify(config));
						GM_setValue("infos_scripts", JSON.stringify(infos_scripts));
/*************************/
insert_in_console("config_scripts_uni_"+uni+" and infos_scripts redefined");
/*************************/
						this.src = scripts_icons+"done.png";
						setTimeout(function(){get_dom_xpath("id('tooltip_0')/img", document, 0).src = scripts_icons+"save_config.png";}, 1000);
						}, false);
	}
	
	
	if (can_load_in_page("ClicNGo")) // doesn't count as a script (no option to deactivate it)
	{
/*************************/
insert_in_console("in Clic&Go");
/*************************/
		document.getElementsByTagName("body")[0].appendChild(build_node("script", ["type"], ["text/javascript"], function putLogs(uni, pseudo, pass) {document.getElementById("login_univers").value=uni;document.getElementById("login_pseudo").value=pseudo;document.getElementById("login_password").value=pass;document.getElementById("login_submit").disabled="";document.getElementById("form_login").submit();}));
		var clicngo	= build_node("div", ["style", "id"], ["float:right;cursor:pointer;padding:4px 0 0 4px;", "clicngo"], "<img src='"+scripts_icons+"Clic&Go/connecting_people.png'></img>");
		var script	= build_node("script", ["type"], ["text/javascript"], "$('#clicngo').click(function(){$('#clicngo_contents').css('display','block');$('body').css('opacity', '0.2');});");
		var div		= build_node("div", ["style", "id"], ["padding:5px;font:12px Times New Roman normal;width:40%;display:none;background-color:black;color:white;border-radius:5px 5px 5px 5px;border:1px solid white;position:absolute;top:10%;left:30%;", "clicngo_contents"], "");
		document.body.parentNode.appendChild(div);
		clicngo.appendChild(script);
		get_dom_xpath("id('top_login_div')/div", document, 0).appendChild(clicngo);
/*************************/
insert_in_console("image to show clic&go contents added");
/*************************/
		var clicngo_contents = document.getElementById("clicngo_contents");
		var html  = "<div onclick='$(\"#clicngo_contents\").css(\"display\",\"none\");$(\"body\").css(\"opacity\", \"1\");' style='padding-bottom:5px;cursor:pointer;text-align:center;color:#A6FF94;border-bottom:1px solid white;font-weight:bold;'>Clic & Go !</div>";
			html += "<div id='clicngo_id'></div>";
			html += "<div style='width:50%;border-bottom:1px solid white;margin:10px 0 10px 0;'></div>";
			html += "<div><input id='remove_nb' onclick='this.value=\"\";' type='text' value='#' style='width:20px;border:1px solid #545454;height:15px;padding:1px;vertical-align:middle;background-color:black;border-radius:5px 5px 5px 5px;color:#CDD7F8;font:13px Times New Roman normal;margin:5px 5px 1px 2px;text-align:center;'/>";
			html += "<img id='remove_submit' style='cursor:pointer;position:relative;top:7px;' src='"+scripts_icons+"Clic&Go/remove.png' alt='remove'/></div>";
			html += "<div><select id='add_universe' type='text' style='border:1px solid #545454;height:20px;padding:1px;vertical-align:middle;background-color:black;border-radius:5px 5px 5px 5px;color:#CDD7F8;font:13px Times New Roman normal;margin:5px 0 1px 2px;text-align:center;'>";
		for (var i=0; i<nbUnis; i++)
			html += "<option value="+(i+1)+">"+L_["ClicNGo_universe"]+" "+(i+1)+"</option>";
			html += "<input id='add_username' onclick='this.value=\"\";'  type='text' value='"+L_["ClicNGo_username"]+"' style='border:1px solid #545454;height:15px;padding:1px;vertical-align:middle;background-color:black;border-radius:5px 5px 5px 5px;color:#CDD7F8;font:13px Times New Roman normal;margin:5px 0 1px 2px;text-align:center;'/>";
			html += "<input id='add_password' onclick='this.value=\"\";'  type='password' value='password' style='border:1px solid #545454;height:15px;padding:1px;vertical-align:middle;background-color:black;border-radius:5px 5px 5px 5px;color:#CDD7F8;font:13px Times New Roman normal;margin:5px 0 1px 2px;text-align:center;'/>";
			html += "<img id='add_submit' style='cursor:pointer;position:absolute;'src='"+scripts_icons+"Clic&Go/add.png' alt='add'/></div>";
		clicngo_contents.innerHTML += html;
/*************************/
insert_in_console("main clic&go contents added");
/*************************/
		function insert_clicngo_contents()
		{
/*************************/
insert_in_console("in insert_clicngo_contents function");
/*************************/
			for (var i=0; i<config.ClicNGo.universes.length; i++)
			{
				div = build_node("div", ["id", "name", "style"], ["clicngo_"+i, "clicngo_"+i, "margin:5px;"], "#"+(i+1)+": "+config.ClicNGo.usernames[i]+" ("+L_["ClicNGo_universe"]+" "+config.ClicNGo.universes[i]+")");
				document.getElementById("clicngo_id").appendChild(div);
/*************************/
insert_in_console("account infos #"+(i+1)+" added");
/*************************/
			}
			for (var i=0; i<config.ClicNGo.universes.length; i++)
			{
				var img = build_node("img", ["name", "src", "alt", "style"], ["clicngo_"+i, scripts_icons+"Clic&Go/login.png", "go", "margin-left:5px;cursor:pointer;position:absolute;"], "");
				img.addEventListener("click", function(){	var index = /clicngo_(\d*)/.exec(this.name)[1];
/*************************/
insert_in_console("user clicked on image connection #"+(index+1));
/*************************/
															document.getElementById("login_univers").value	= config.ClicNGo.universes[index];
															document.getElementById("login_pseudo").value	= config.ClicNGo.usernames[index];
															document.getElementById("login_password").value	= config.ClicNGo.passwords[index];
															document.getElementById("login_submit").click();	}, false);
				document.getElementById("clicngo_"+i).appendChild(img);
/*************************/
insert_in_console("image connection #"+(i+1)+"added");
/*************************/
			}
		}
		insert_clicngo_contents();
		document.getElementById("add_submit").addEventListener("click", function(){
/*************************/
insert_in_console("user clicked on the add button : '"+parseInt(document.getElementById("add_universe").value)+" "+document.getElementById("add_username").value+" <password>'");
/*************************/
							var index = config.ClicNGo.universes.length;
							if (isNaN(parseInt(document.getElementById("add_universe").value))) return false;
							config.ClicNGo.universes[index] = parseInt(document.getElementById("add_universe").value);
							config.ClicNGo.usernames[index] = document.getElementById("add_username").value;
							config.ClicNGo.passwords[index] = document.getElementById("add_password").value;
							GM_setValue("config_scripts_uni_0", JSON.stringify(config));
							document.getElementById("clicngo_id").innerHTML = "";
							insert_clicngo_contents();}, false);
		document.getElementById("remove_submit").addEventListener("click", function(){
/*************************/
insert_in_console("user clicked on the remove button : '#"+parseInt(document.getElementById("remove_nb").value)+"'");
/*************************/
							if (isNaN(parseInt(document.getElementById("add_universe").value))) return false;
							var nb = parseInt(document.getElementById("remove_nb").value);
							config.ClicNGo.universes.splice(nb-1, 1);
							config.ClicNGo.usernames.splice(nb-1, 1);
							config.ClicNGo.passwords.splice(nb-1, 1);
							GM_setValue("config_scripts_uni_0", JSON.stringify(config));
							document.getElementById("clicngo_id").innerHTML = "";
							insert_clicngo_contents();}, false);
/*************************/
insert_in_console("out of Clic&Go");
/*************************/
	}
	
	
	if (can_load_in_page("RConverter") && infos_scripts.RConverter )
	{
/*************************/
insert_in_console("in RConverter");
/*************************/
		var couleurs_rc	= {0:"#0000FF",1:"#8A2BE2",2:"#A52A2A",3:"#D2691E",4:"#6495ED",5:"#DC143C",6:"#00008B",7:"#008B8B",8:"#006400",9:"#8B008B",10:"#8B0000",11:"#1E90FF",12:"#B22222",13:"#008000",14:"#4B0082",15:"#800000",16:"#800080",17:"#FF4500",18:"#000",19:"#2E8B57",20:"#4682B4",21:"#8B4513",22:"#FA8072",23:"#FF0000",24:"#DA70D6",25:"#7B68EE",26:"#3CB371",27:"#0000CD"};	
		var rapport = document.getElementById('rc_main').getElementsByClassName('rc_contain curvedtot');
		var nb_tours=((rapport.length==3)?1:2); //nb_tours = 2 lorsqu'il y a au moins deux tours
		
		var rapport_tour1 = rapport[0];
		if(nb_tours!=1){
			var rapport_tour2 = rapport[rapport.length-3];
		}

		var date_rc = document.getElementById('rc_main').getElementsByClassName('divtop curvedtot')[0].innerHTML;
		var participants = [];
		participants[0]=[]; // Pseudos et techs
		participants[1]=[]; // Flottes Avant
		participants[2]=[]; // Flottes Après
		//Noms des joueurs et technos
		for(var i=0; i<rapport_tour1.getElementsByClassName('divtop curvedtot').length; i++){
			participants[0][i] = rapport_tour1.getElementsByClassName('divtop curvedtot')[i].innerHTML.replace(/(?:Attaquant|Attacker) ([a-zA-Z0-9_]*)/g,'Attaquant [b][size=128][color=#FF0040]$1[/color][/size][/b]').replace(/(?:Défenseur|Defender) ([a-zA-Z0-9_]*)/g,'Défenseur [b][size=128][color=#008040]$1[/color][/size][/b]').replace(/\(/g,'\n').replace(/\)/g,'\n').replace(/\[\d:\d{1,3}:\d{1,2}\]/g, '').replace(/<font color=\"#7BE654\">/g,'[b]').replace(/<\/font>/g,'[/b]');
		}
		
		var flotte_joueur_tmp, nom_vaisseau, quantite_vaisseau;

		var flottes = rapport_tour1.getElementsByClassName('rc_space curvedtot');
		for(var i=0; i<flottes.length; i++){
			flotte_joueur_tmp = flottes[i].getElementsByClassName('rc_rows');
			participants[1][i]=[];
				for(var j=0; j<flotte_joueur_tmp.length; j++){
						nom_vaisseau = flotte_joueur_tmp[j].getElementsByClassName('rc_rows1')[0].innerHTML;
						quantite_vaisseau = flotte_joueur_tmp[j].getElementsByTagName('font')[0].innerHTML;
						participants[1][i][j]= [nom_vaisseau,quantite_vaisseau];
				}
		}
		
		if(nb_tours!=1){
			var flottes = rapport_tour2.getElementsByClassName('rc_space curvedtot');
			for(var i=0; i<flottes.length; i++){
				flotte_joueur_tmp = flottes[i].getElementsByClassName('rc_rows');
				participants[2][i]=[];
					for(var j=0; j<flotte_joueur_tmp.length; j++){
							nom_vaisseau = flotte_joueur_tmp[j].getElementsByClassName('rc_rows1')[0].innerHTML;
							quantite_vaisseau = flotte_joueur_tmp[j].getElementsByTagName('font')[0].innerHTML;
							participants[2][i][j]= [nom_vaisseau,quantite_vaisseau];
					}
			}
		}
		
		var resultat_combat = rapport[rapport.length-2].getElementsByClassName('divtop curvedtot')[0].innerHTML;
		if(rapport[rapport.length-2].getElementsByClassName('space0')[0]!=null){
			resultat_combat+="  "+rapport[rapport.length-2].getElementsByClassName('space0')[0].innerHTML.replace(/<font color=\"#7BE654\">/g,'[b][size=120][color=#C03000]').replace(/<\/font>/g,'[/b][/size][/color]')
		}
		var resultat_CDR = rapport[rapport.length-1].getElementsByClassName('space0')[2].innerHTML.replace(/<font color=\"#7BE654\">/g,'[b][size=120][color=#7BE654]').replace(/<\/font>/g,'[/b][/size][/color]');
		var renta_attaquant = rapport[rapport.length-1].getElementsByClassName('space0')[3].innerHTML.replace(/<font color=\"#7BE654\">/g,'[b][size=120][color=#7BE654]').replace(/<\/font>/g,'[/b][/size][/color]').replace(/<font color=\"#DB5656\">/g,'[b][size=120][color=#DB5656]').replace(/<\/font>/g,'[/b][/size][/color]').replace(/<br>/g,'\n');
		var renta_defenseur = rapport[rapport.length-1].getElementsByClassName('space0')[4].innerHTML.replace(/<font color=\"#7BE654\">/g,'[b][size=120][color=#7BE654]').replace(/<\/font>/g,'[/b][/size][/color]').replace(/<font color=\"#DB5656\">/g,'[b][size=120][color=#DB5656]').replace(/<\/font>/g,'[/b][/size][/color]').replace(/<br>/g,'\n');;
		
		var rapport_converti = "";
		rapport_converti+="[center][b][img]"+((config.RConverter.header=='')?scripts_icons+'RConverter/header.png':config.RConverter.header)+"[/img]\n\n";
		rapport_converti+=date_rc+"[/b]\n";	
		rapport_converti+="_________________________________________________\n\n";
		for(var i=0; i<participants[0].length; i++){
			rapport_converti+=participants[0][i] ;
			if (participants[1][i].length==0){
				rapport_converti+="[img]"+((config.RConverter.destroyed=='')?scripts_icons+'RConverter/destroyed.png':config.RConverter.destroyed)+"[/img]\n" ;
			}
			for(var j=0; j<participants[1][i].length; j++){
				rapport_converti+="[color="+couleurs_rc[j]+"]"+participants[1][i][j][0]+" "+participants[1][i][j][1]+"[/color]\n";
			}
			rapport_converti+="\n\n";
		}
		
		if (nb_tours!=1){
			var difference;
			rapport_converti+="[img]"+((config.RConverter.boom=='')?scripts_icons+'RConverter/boom.png':config.RConverter.boom)+"[/img]";
			rapport_converti+="\n\n";
			
			for(var i=0; i<participants[0].length; i++){
				rapport_converti+=participants[0][i] ;
				if (participants[2][i].length==0){
					rapport_converti+="[img]"+((config.RConverter.destroyed=='')?scripts_icons+'RConverter/destroyed.png':config.RConverter.destroyed)+"[/img]\n" ;
				}
				for(var j=0; j<participants[2][i].length; j++){
					for(var k=0; k<participants[1][i].length; k++){
						if(participants[2][i][j][0]==participants[1][i][k][0]){
							difference=sw_to_number_rc(participants[1][i][k][1])-sw_to_number_rc(participants[2][i][j][1]);
							break;
						}
					}
					rapport_converti+="[color="+couleurs_rc[j]+"]"+participants[2][i][j][0]+" "+participants[2][i][j][1]+"[/color][color=#FF0040]         -"+get_slashed_nb(difference)+"[/color]\n";
				}
				rapport_converti+="\n\n\n";
			}
		}
		rapport_converti+="[img]"+((config.RConverter.result=='')?scripts_icons+'RConverter/result.png':config.RConverter.result)+"[/img]\n";
		rapport_converti+=resultat_combat+"\n\n";
		rapport_converti+=resultat_CDR+"\n\n";
		rapport_converti+="[img]"+((config.RConverter.renta=='')?scripts_icons+'RConverter/renta.png':config.RConverter.renta)+"[/img]\n";
		rapport_converti+=renta_attaquant+"\n\n";
		rapport_converti+=renta_defenseur+"\n\n";
		rapport_converti+="[/center]";
		
		var html	 = "<textarea id='RConverter' cols=50 rows=9 onclick='this.select()'>"+rapport_converti+"</textarea><div>"+L_["RConverter_help"]+"</div>";
			html	+= "<input type='radio' onclick='document.getElementById(\"RConverter\").value+=\"[spoiler=lien][url]\"+window.location.href+\"[/url][/spoiler]\"; document.getElementById(\"RConverter\").select();'/>"+L_["RConverter_HoF"];
		get_dom_xpath("//body", document, 0).appendChild(build_node("center", ["class", "style"], ["space1 curvedtot", "position:absolute; right:0; top:30px;"], html));
		document.getElementById("RConverter").select();
/*************************/
insert_in_console("out of RConverter");
/*************************/
	}
	
	
	if (can_load_in_page("EasyFarm") && infos_scripts.EasyFarm )
	{
/*************************/
insert_in_console("in EasyFarm");
/*************************/
		var fleet_names = [L_["small cargo"], L_["large cargo"], L_["light fighter"], L_["heavy fighter"], L_["cruiser"], L_["battleship"], L_["colony ship"], L_["recycler"], L_["espionage probe"], L_["bomber"], L_["solar satellite"], L_["destroyer"], L_["deathstar"], L_["battlecruiser"], L_["supernova"], L_["massive cargo"], L_["collector"], L_["blast"], L_["extractor"]];
		var fleet_deut = [1500,4500,1250,3500,8500,18750,12500,5500,500,25000,1000,40000,3250000,27500,12500000,3750000,55000,71500,37500];
		var messages = get_dom_xpath("//div[@class='message_space0 curvedtot'][contains(.,\""+L_["EasyFarm_spyReport"]+"\")][contains(.,\""+L_["EasyFarm_metal"]+"\")]", document, -1);
		get_dom_xpath("//body", document, 0).appendChild(build_node("script", ["type"], ["text/javascript"], "$(document).ready(function(){\nsetTimeout(function(){\n$('.tooltip').tooltip({width: 'auto', height: 'auto', fontcolor: '#FFF', bordercolor: '#666',padding: '5px', bgcolor: '#111', fontsize: '10px'});\n}, 10);\n}); "));
		for (i=0; i<messages.length; i++)
		{
/*************************/
insert_in_console("for message #"+(i+1)+":");
/*************************/
				messages[i].getElementsByClassName("checkbox")[0].checked = "checked";
				var regNb = /\s([0-9,.]{1,})/;
				// get metal crystal and deut
				var metal = get_nb_from_stringtab(regNb.exec(messages[i].getElementsByClassName("half_left")[0].innerHTML)[1].split("."));
				var crystal = get_nb_from_stringtab(regNb.exec(messages[i].getElementsByClassName("half_left")[1].innerHTML)[1].split("."));
				var deut = get_nb_from_stringtab(regNb.exec(messages[i].getElementsByClassName("half_left")[2].innerHTML)[1].split("."));
				if ((metal/4+crystal/2+deut)/2 >= config.EasyFarm.minPillage)
				{
/*************************/
insert_in_console("is more than config.EasyFarm.minPillage");
/*************************/
					messages[i].setAttribute("style", "background-color:#"+config.EasyFarm.colorPill);
					messages[i].getElementsByClassName("checkbox")[0].checked = false;
				}
				html = "<div><font color='#FFCC33'>"+L_["EasyFarm_looting"]+" :</font><ul style='margin-top:0'>";
				html += "<li>"+L_["massive cargo"]+" : "+get_slashed_nb(Math.ceil(((metal+crystal+deut)/2*1/10000000)));
				html += "<li>"+L_["supernova"]+" : "+get_slashed_nb(Math.ceil(((metal+crystal+deut)/2*1/2000000)));
				html += "<li>"+L_["blast"]+" : "+get_slashed_nb(Math.ceil(((metal+crystal+deut)/2*1/8000)))+"</ul>";
				var classRank=4, total=0, nbTab, nbString="";
				for (j=0; j<fleet_names.length; j++)
					if (messages[i].innerHTML.indexOf(fleet_names[j]+" : ") != -1)
					{
						// get deut value of ship j
						total += get_nb_from_stringtab(regNb.exec(messages[i].getElementsByClassName("half_left")[classRank].innerHTML)[1].split(","))*fleet_deut[j];
						classRank++;
					}
				if (total*0.6 >= config.EasyFarm.minCDR)
				{
/*************************/
insert_in_console("is more than config.EasyFarm.minCDR");
/*************************/
					messages[i].setAttribute("style", "background-color:#"+config.EasyFarm.colorCDR);
					messages[i].getElementsByClassName("checkbox")[0].checked = false;
				}
				html += "<div><font color='#7BE654'>"+L_["EasyFarm_ruinsField"]+" :</font> "+get_slashed_nb(Math.floor(total*0.6))+" "+L_["EasyFarm_deuterium"]+"</div>";
				if (messages[i].innerHTML.indexOf(L_["EasyFarm_defenses"]) != -1)
				{
					html += "<br/><div><font color='#55BBFF'>"+L_["EasyFarm_defenses"]+" :</font>";
					for (j=0; j<messages[i].getElementsByClassName("message_space0")[2].getElementsByClassName("half_left").length; j++)
						html += "<br/>"+messages[i].getElementsByClassName("message_space0")[2].getElementsByClassName("half_left")[j].innerHTML;
					html += "</div>";
				}
				div = build_node("div", [], [], L_["massive cargo"]+" : "+get_slashed_nb(Math.ceil(((metal+crystal+deut)/2*1/10000000))));
				messages[i].getElementsByClassName("message_space0")[0].parentNode.appendChild(div);
				div = build_node("div", ["style", "id"], ["display:none", "divToolTip"], "");
				document.getElementsByTagName("body")[0].appendChild(div);
				div = build_node("div", ["style", "id"], ["display:none", "data_tooltip_"+i], html);
				document.getElementsByTagName("body")[0].appendChild(div);
				var xpath = document.evaluate("//a[text()='"+L_["EasyFarm_attack"]+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				xpath = xpath.snapshotItem(i);
				div = build_node("a", ["class", "id", "href", "style"], ["tooltip", "tooltip_"+i, xpath.href, "float:right; width:0;"], "<img src='"+scripts_icons+"EasyFarm/or.gif' alt='pillage'/>");
				messages[i].getElementsByClassName("donthide")[0].getElementsByTagName("div")[0].appendChild(div);
		}
/*************************/
insert_in_console("out of EasyFarm");
/*************************/
	}
	
	
	if (can_load_in_page("AllinDeut") && infos_scripts.AllinDeut )
	{
/*************************/
insert_in_console("in AllinDeut");
/*************************/
		var xpath_pages			= {	"buildings":"//div[@class='buildings_1b']/div[@class='buildings_1b1'][3]",
									"research":"//div[@class='research_1b']/div[@class='research_1b1'][3]"};
		var regMetal_pages		= {	"buildings":new RegExp(L_["AllinDeut_metal"]+"\\s:\\s<font\\s.{15}>([^<]*)</font>"),
									"research":new RegExp(L_["AllinDeut_metal"]+"\\s:\\s<font\\s.{15}>([^<]*)</font>")};
		var regCrystal_pages	= {	"buildings":new RegExp(L_["AllinDeut_crystal"]+"\\s:\\s<font\\s.{15}>([^<]*)</font>"),
									"research":new RegExp(L_["AllinDeut_crystal"]+"\\s:\\s<font\\s.{15}>([^<]*)</font>")};
		var regDeut_pages		= {	"buildings":new RegExp(L_["AllinDeut_deuterium"]+"\\s:\\s<font\\s.{15}>([^<]*)</font>"),
									"research":new RegExp(L_["AllinDeut_deuterium"]+"\\s:\\s<font\\s.{15}>([^<]*)</font>")};
		var separator_pages		= {	"buildings":".",
									"research":"."};
		
		var doms = get_dom_xpath(xpath_pages[page], document, -1);
		var inDeut = 0;
		
		for (var i=0; i<doms.length; i++)
		{
/*************************/
insert_in_console("for dom #"+i);
/*************************/
			inDeut = 0;
			if (regMetal_pages[page].test(doms[i].innerHTML)) inDeut += get_nb_from_stringtab(regMetal_pages[page].exec(doms[i].innerHTML)[1].split(separator_pages[page]))/4;
			if (regCrystal_pages[page].test(doms[i].innerHTML)) inDeut += get_nb_from_stringtab(regCrystal_pages[page].exec(doms[i].innerHTML)[1].split(separator_pages[page]))/2;
			if (regDeut_pages[page].test(doms[i].innerHTML)) inDeut += get_nb_from_stringtab(regDeut_pages[page].exec(doms[i].innerHTML)[1].split(separator_pages[page]));
			doms[i].appendChild(build_node("div", [], [], "<font color='lime'>AllinDeut</font> : "+get_slashed_nb(""+parseInt(inDeut))));
		}
/*************************/
insert_in_console("out of AllinDeut");
/*************************/
	}
	
	
	if (can_load_in_page("iFly") && infos_scripts.iFly )
	{
/*************************/
insert_in_console("in iFly");
/*************************/
		var i = 1, ressources, metal, cristal, deut, metal_total=0, cristal_total=0, deut_total=0, equivalent_deut_total=0,chaine_total="";
		while(document.getElementById("data_tooltip_"+i)!=null)
		{
/*************************/
insert_in_console("for data_tooltip_"+i);
/*************************/
			ressources = document.getElementById("data_tooltip_"+i).getElementsByTagName("div");
			if(ressources[0].innerHTML.indexOf(L_["iFly_metal"]) != -1)
			{
/*************************/
insert_in_console("there is resources (metal at least)");
/*************************/
				metal = ressources[0].innerHTML.replace(/[^0-9]/g,'');
				cristal = ressources[1].innerHTML.replace(/[^0-9]/g,'');
				deut = ressources[2].innerHTML.replace(/[^0-9]/g,'');
				if ( chaine_total.indexOf(metal)==-1 || chaine_total.indexOf(cristal)==-1 || chaine_total.indexOf(deut)==-1)
				{
					metal_total += parseInt(metal);
					cristal_total += parseInt(cristal);
					deut_total += parseInt(deut);
					chaine_total += metal+cristal+deut;
				}
			}
			i=i+1;
		}
		equivalent_deut_total=parseInt(metal_total/4)+parseInt(cristal_total/2)+deut_total;
		
		var html	= "<div class='padding5 linkgreen'>iFly :</div>";
			html	+="<div class='default_space padding5 curvedot'>"+L_["iFly_deutfly"]+" : "+get_slashed_nb(equivalent_deut_total)+"</div>";
		document.getElementById("data_tooltip_10000").appendChild(build_node("div", [], [], html));
/*************************/
insert_in_console("out of iFly");
/*************************/
	}
	
	
	if (can_load_in_page("TChatty") && infos_scripts.TChatty )
	{
/*************************/
insert_in_console("in TChatty");
/*************************/
		var color	= config.TChatty.color;
		var toolbar	= get_dom_xpath("//div[@class='toolbar']", document, 0);
		var send	= document.getElementById("send");
		var message	= document.getElementById("message");
		toolbar.removeChild(document.getElementById("chat_couleur"));
		document.getElementsByTagName("head")[0].appendChild(build_node("script", ["src", "type"], [scripts_scripts+"jscolor/jscolor.js", "text/javascript"], ""));
/*************************/
insert_in_console("script jscolor added in head");
/*************************/
		toolbar.innerHTML = '<input class="color" id="jscolorid" value="'+color+'">' + toolbar.innerHTML;
		message.cols=90; message.id ="message2";
		toolbar.innerHTML+=' <textarea  id="message" style="display:none" name="message"></textarea>';
/*************************/
insert_in_console("toolbar modified (id textarea + input jscolor)");
/*************************/
		//Correction ToolBar
		toolbar.innerHTML = toolbar.innerHTML.replace(/'message'/g,"'message2'"); 
		//Correction Smileys
		var smileys = document.getElementById('smiley').getElementsByTagName('img');
		for(var i=0; i<smileys.length;i++)
		{
/*************************/
insert_in_console("smiley #"+(i+1)+" modifyed");
/*************************/
			smileys[i].addEventListener('click', function(e) {
								document.getElementById("message2").value+=this.alt;
								document.getElementById("message").value="[color=#"+document.getElementById('jscolorid').value+"]"+document.getElementById("message2").value+"[/color]";
/*************************/
insert_in_console("user clicked on smiley '"+this.alt+"'");
/*************************/
			}, false);
		}
		var jscolorid = document.getElementById("jscolorid");
		jscolorid.addEventListener("click", function(){
/*************************/
insert_in_console("user clicked on jscolorid");
/*************************/
		document.getElementById("jscolor_box").addEventListener("mouseout", function(){
/*************************/
insert_in_console("user 'mouseout' of jscolorid");
/*************************/
		config.TChatty.color = 	document.getElementById("jscolorid").value;GM_setValue("config_scripts_uni_"+uni, JSON.stringify(config));}, false);	}, false);
		
		var textarea = document.getElementById("message2");
		textarea.addEventListener('keyup', function(e) {
								reg=new RegExp("\[[0-9]+\:[0-9]+\:[0-9]+\]", "gi" );
								this.value= this.value.replace(reg,"[x:xxx:x]");
								if(this.value.length>232) this.value=this.value.substring(0,232); //¨La limite de 255 - la place que les balises colors prennent
								if(this.value.charAt(0)!="/" && this.value!=""){
									document.getElementById("message").value="[color=#"+document.getElementById('jscolorid').value+"]"+this.value+"[/color]";
								}else{
									document.getElementById("message").value=this.value;
								}
								if (e.keyCode == 13){
/*************************/
insert_in_console("user pressed 'enter'");
/*************************/
										this.value="";
										if (navigator.userAgent.indexOf("Firefox")!=-1){
											document.getElementById("send").click();
										}
								}
								}, false);
		send.addEventListener('click', function(e) {
								document.getElementById("message2").value="";
/*************************/
insert_in_console("message2 value reset to ''");
/*************************/
								}, false);
/*************************/
insert_in_console("out of Tchatty");
/*************************/
	}
	
	
	if (can_load_in_page("Markit") && infos_scripts.Markit  || can_load_in_page("Carto") && infos_scripts.Carto )
	{
/*************************/
insert_in_console("in Markit");
/*************************/
		document.getElementById("main").style.width = "640px";
		var SS = document.getElementById("galaxy_form").getElementsByTagName("input")[7].value;
		var G = document.getElementById("galaxy").value;
		var POS, id;
		
		var regName	 = /(.*)\(<?/;
		var regName2 = /(?:<span class="vacation">)?([^<]*)/;
		var regClic  = /onclick="gal_show\('(d[0-9]{1,})/;
		var regRank  = new RegExp(L_["Markit_rank"]+"\\s:\\s([0-9]{1,})");
		var players_list = [];
			players_list[0] = get_dom_xpath("//div[@class='space curvedtot']/div[@class='galaxy_float150']/a[1]", document.getElementById("main"), -1);
			players_list[1] = get_dom_xpath("//div[@class='space1 curvedtot']/div[@class='galaxy_float150']/a[1]", document.getElementById("main"), -1);
		for (var i=0; i<2; i++)
		{
			for (var j=0; j<players_list[i].length; j++)
			{
/*************************/
insert_in_console("for players_list["+i+"]["+j+"]");
/*************************/
				players_list[i][j].parentNode.parentNode.getElementsByClassName("galaxy_float80")[1].style.width = "120px";
				PSEUDO	= (regName.test(players_list[i][j].innerHTML)) ? regName.exec(players_list[i][j].innerHTML)[1] : players_list[i][j].innerHTML;
				POS		= parseInt(players_list[i][j].parentNode.parentNode.getElementsByTagName("a")[0].innerHTML);
				ALLY	= players_list[i][j].parentNode.parentNode.getElementsByClassName("galaxy_float80")[0];
						ALLY = (ALLY.innerHTML == "&nbsp;") ? "NO ALLY" : ALLY.getElementsByTagName("a")[0].innerHTML;
/*************************/
insert_in_console("pseudo: "+PSEUDO+" pos: "+POS+" ally: "+ALLY);
/*************************/
				var div = build_node("div", ["style"], ["display:inline-block; float:right;"], "");
				if (infos_scripts.Carto)
				{
					div.appendChild(build_node("img", ["src", "alt", "style"], [""+scripts_icons+"Carto/carto.png", "C", "float:right; padding:2px 4px 2px 0;"], "", "click", function(){
										var players_listIJ = this.parentNode.parentNode.parentNode.getElementsByClassName("galaxy_float150")[1].getElementsByTagName("a")[0];
										PSEUDO	= (regName.test(players_listIJ.innerHTML)) ? regName.exec(players_listIJ.innerHTML)[1] : players_listIJ.innerHTML;
										POS		= parseInt(players_listIJ.parentNode.parentNode.getElementsByTagName("a")[0].innerHTML);
										ALLY	= players_listIJ.parentNode.parentNode.getElementsByClassName("galaxy_float80")[0];
												ALLY = (ALLY.innerHTML == "&nbsp;") ? "NO ALLY" : regName2.exec(ALLY.getElementsByTagName("a")[0].innerHTML)[1];
										config.Carto += "["+G+":"+SS+":"+POS+"] "+PSEUDO+" ("+ALLY+")\r\n";
										GM_setValue("config_scripts_uni_"+uni, JSON.stringify(config));
										this.parentNode.removeChild(this);
/*************************/
insert_in_console("user clicked on carto img (pseudo,pos,ally):("+PSEUDO+","+POS+","+ALLY+")");
/*************************/
										}));
/*************************/
insert_in_console("carto img added");
/*************************/
				}
				if (infos_scripts.Markit && !/Bot_/.test(PSEUDO))
				{
					var img = build_node("img", ["src", "alt", "style"], ["", "", "float:right; padding:2px 4px 2px 0;"], "", "click", function(){
										switch (this.alt)
										{	case "default" :	this.src = ""+scripts_icons+"Markit/fridge.png";	this.alt = "fridge";break
											case "fridge" :		this.src = ""+scripts_icons+"Markit/bunker.png";	this.alt = "bunker";break
											case "bunker" :		this.src = ""+scripts_icons+"Markit/raidy.png";		this.alt = "raidy";break;
											case "raidy" :		this.src = ""+scripts_icons+"Markit/dont.png";		this.alt = "dont";break
											case "dont" :		this.src = ""+scripts_icons+"Markit/default.png";	this.alt = "default";break; }
										this.parentNode.parentNode.style.backgroundColor = (this.alt=="default") ? "" : "#"+config.Markit.color[""+this.alt];
										POS = parseInt(this.parentNode.parentNode.parentNode.getElementsByTagName("a")[0].innerHTML);
										config.Markit.coord[""+G+":"+SS+":"+POS] = this.alt;
										GM_setValue("config_scripts_uni_"+uni, JSON.stringify(config));
/*************************/
insert_in_console("user clicked on markit img (pos,mark):("+POS+","+this.alt+")");
/*************************/
										});
					if (config.Markit.coord[""+G+":"+SS+":"+POS] != undefined)
					{
						players_list[i][j].parentNode.parentNode.getElementsByClassName("galaxy_float80")[1].style.backgroundColor = (config.Markit.coord[""+G+":"+SS+":"+POS]=="default") ? "" : "#"+config.Markit.color[config.Markit.coord[""+G+":"+SS+":"+POS]];
						img.src = ""+scripts_icons+"Markit/"+config.Markit.coord[""+G+":"+SS+":"+POS]+".png";
						img.alt = ""+config.Markit.coord[""+G+":"+SS+":"+POS];
/*************************/
insert_in_console("mark added for pos:"+POS);
/*************************/
					}
					else
					{
						img.src = ""+scripts_icons+"Markit/default.png";
						img.alt = "default";
					}
					div.appendChild(img);
					if (config.Markit.ranks)
					{
						id = regClic.exec(players_list[i][j].parentNode.parentNode.innerHTML)[1];
						rank = parseInt(regRank.exec(document.getElementById(id).innerHTML)[1]);
						if (rank <= config.Markit.topX)
							div.appendChild(build_node("span", ["style"], ["color:#"+config.Markit.topColor+"; float:right; padding:2px 4px 2px 0;"], "#"+rank));
						else
							div.appendChild(build_node("span", ["style"], ["float:right; padding:2px 4px 2px 0;"], "#"+rank));
/*************************/
insert_in_console("rank added : #"+rank);
/*************************/
					}
				}
				players_list[i][j].parentNode.parentNode.getElementsByClassName("galaxy_float80")[1].appendChild(div);
			}
		}
/*************************/
insert_in_console("out of Markit");
/*************************/
	}
	
	
	if (infos_scripts.More)
	{
	
		if (can_load_in_page("More_moonsList") && config.More.moonsList)
		{
			var options = document.getElementById("changeplanet").getElementsByTagName("option");
			for (i=0; i<options.length; i++)
				if (/(\(M\))|(\(L\))/.test(options[i].innerHTML)) options[i].style.color = "SteelBlue";
/*************************/
insert_in_console("More_moonsList executed");
/*************************/
		}
		
		
		if (can_load_in_page("More_convertDeut") && config.More.convertDeut )
		{
			var a = document.getElementById("marchand_suba").getElementsByTagName("a")
			var script = "";
			for (i=0; i<a.length; i++)
				script += a[i].getAttribute("onclick");
			div = build_node("div", [], [], L_["More_convertInto"]+' : <a style="color:#55BBFF" href="javascript:" onclick="'+script+'document.getElementById(\'cristal2\').checked=\'checked\'; calcul();">'+L_["More_crystal"]+'</a> | <a style="color:#7BE654" href="javascript:" onclick="'+script+'document.getElementById(\'deut2\').checked=\'checked\'; calcul();">'+L_["More_deuterium"]+'</a>');
			document.getElementById("marchand_suba").parentNode.insertBefore(div, document.getElementById("marchand_suba"));
/*************************/
insert_in_console("More_convertDeut executed");
/*************************/
		}
		
		
		if (can_load_in_page("More_traductor") && config.More.traductor )
		{
			function to_translate(word, lang1, lang2)
			{
				GM_xmlhttpRequest({ url: "http://www.wordreference.com/"+lang1+lang2+"/"+word, method: "GET", onload: function (response) {gettraduction(response.responseText);	}});
				function gettraduction(text)
				{
					text = (/<div class=id>IDIOMS:/.test(text)) ? /<div class=se id=se[0-9]{2,5}>([\s\S]*)<div class=id>IDIOMS:/.exec(text)[1] : /<div class=se id=se[0-9]{2,5}>([\s\S]*)<div id='FTintro'/.exec(text)[1];
					text += "</div>";
					//text = text.replace(/<span class=b>(.*)<\/span>/g, "<b>$1</b>"); text = text.replace(/<span class=u>(.*)<\/span>/g, "<u>$1</u>"); text = text.replace(/<span class=i>(.*)<\/span>/g, "<em>$1</em>");
					html = "<div style='background-color:black; opacity:0.8; border:1px solid white; font-color:white; padding:5px;'>"+text+"</div>";
					document.getElementById("gm_traductionofword").innerHTML = html;
					return;
				}
				return;
			}
			html1 = "<option style='background:url(\""+scripts_icons+"Traductor/FR.png\") no-repeat; text-align:right;' value='fr'>FR</option>";
			html2 = "<option style='background:url(\""+scripts_icons+"Traductor/EN.png\") no-repeat; text-align:right;' value='en'>EN</option>";
			html = "<option style='background:url(\""+scripts_icons+"Traductor/DE.png\") no-repeat; text-align:right;' value='de'>DE</option>";
			html += "<option style='background:url(\""+scripts_icons+"Traductor/ES.png\") no-repeat; text-align:right;' value='es'>ES</option>";
			html += "<option style='background:url(\""+scripts_icons+"Traductor/IT.png\") no-repeat; text-align:right;' value='it'>IT</option>";
			if (lang=="en")
			{	select1 = build_node("select", ["id", "style"], ["gm_lang1", "height:18px;"], html1+html2);
				select2 = build_node("select", ["id", "style"], ["gm_lang2", "height:18px;"], html2+html1);		}
			else
			{	select1 = build_node("select", ["id", "style"], ["gm_lang1", "height:18px;"], html2+html1);
				select2 = build_node("select", ["id", "style"], ["gm_lang2", "height:18px;"], html1+html2);		}
			input = build_node("img", ["type", "src", "style"], ["submit", scripts_icons+"Traductor/GO.png", "float:right;height:18px;cursor:pointer"], "", "click", function(){to_translate(document.getElementById("gm_wordtotranslate").value, document.getElementById("gm_lang1").value, document.getElementById("gm_lang2").value);});
			div = build_node("div", ["id", "style"], ["gm_traduction", "background-color:black; padding:0 0 1px 2px; position:fixed; bottom:1px; right:1px; "], "<input id='gm_wordtotranslate' type='text' style='width:80px;height:9px;'/>");
			div.appendChild(select1); div.appendChild(select2);
			div2 = build_node("div", ["id"], ["gm_traductionofword"], "");
			div.appendChild(input);
			document.getElementsByTagName("body")[0].appendChild(div2);
			document.getElementsByTagName("body")[0].appendChild(div);
/*************************/
insert_in_console("More_traductor executed");
/*************************/
		}
		
		
		if (can_load_in_page("More_resources") && config.More.resources )
		{
			html  = "<div class='ressources_sub1a' style='float:left'>"+L_["More_allTo"]+"</div>";
			html += '<div class="ressources_sub1c" style="float:right; padding-right:12px; overflow:hidden;"><select size="1" style="border:none;" onchange="var selects = document.getElementById(\'main\').getElementsByTagName(\'select\'); for (var i=0; i<selects.length; i++) { selects[i].value=this.value; } document.ressources.submit();"><option value="100">100%</option><option value="90">90%</option><option value="80">80%</option><option value="70">70%</option><option value="60">60%</option><option value="50">50%</option><option value="40">40%</option><option value="30">30%</option><option value="20">20%</option><option value="10">10%</option><option value="0">0%</option><option selected="selected">?</option></select></div>';
			var div = build_node("div", ["class"], ["space0 ressources_font_little ressources_bordert"], html);
			document.getElementById("main").insertBefore(div, document.getElementsByClassName("space0 ressources_font_little ressources_bordert")[0]);
/*************************/
insert_in_console("More_resources executed");
/*************************/
		}
		
		
		if (can_load_in_page("More_redirectFleet") && config.More.redirectFleet )
		{
/*************************/
insert_in_console("More_redirectFleet would have been executed if not in debugMode");
/*************************/
			//window.onload = function(){window.location.href = "fleet.php";};
		}
		
		
		if (can_load_in_page("More_arrows") && config.More.arrows )
		{
			document.getElementById("previousplanet").value	= "<<<<";
			document.getElementById("nextplanet").value		= ">>>>";
/*************************/
insert_in_console("More_arrows executed");
/*************************/
		}
		
		
		if (can_load_in_page("More_returns") && config.More.returns )
		{
			var returns = document.getElementsByClassName('curvedtot return');
			for(i=0;i<returns.length;i++)
				returns[i].style.opacity="0.6";
/*************************/
insert_in_console("More_returns executed");
/*************************/
		}
		
	}
	
	
	/*if (config.More.cartoButton && can_load_in_page("More_cartoButton"))
	{
		var script = build_node("script", ["type", "src"], ["text/javascript", zeroclipboard+"ZeroClipboard.js"], "");
		document.getElementById("content").appendChild(script);
		var script = build_node("script", ["type"], ["text/javascript"], function init(){	ZeroClipboard.setMoviePath( 'http://niark.spaceswars.fr/zeroclipboard/ZeroClipboard.swf' );
																							document.getElementById("galaxy").select();
																							var clip = new ZeroClipboard.Client();
																							clip.glue( 'gm_test_content' , 'gm_test' );
																							clip.setHandCursor( true );
																							clip.addEventListener('mouseOver', function (client) {
																								clip.setText( document.getElementById("content").textContent );
																							});
																							clip.addEventListener('complete', function (client, text) {
																								alert('copied');
																							});});
		document.getElementById("content").appendChild(script);
		
		var div = build_node("div", ["id"], ["gm_test"], "<div onclick='init()'>here first</div><div id='gm_test_content'>copy ?</div><object style='display:none'><embed src='"+zeroclipboard+"ZeroClipboard.swf' ></embed></object>");
		document.getElementById("content").appendChild(div);
	}
	*/

