// ==UserScript==
// @name            Grepolis Shortcut
// @version	    4.1.4
// @description     Grepolis Shortcut
// @namespace       Doc Marco & die PC-Helfer <http://www.sdm-scholz.de>
// @author	    Đð¢ M@rco PC-Ŧræk
// @include         http://*.grepolis.*

// @copyright	    © Đð¢ M@rco PC-Ŧræk & die PC-Helfer

// @source          http://userscripts.org/scripts/show/62989

// @license         GNU General Public License GPLv3
// ==/UserScript==
/**
* This script is licensed  under:
* GNU General Public License GPLv3
* To view a copy of this license, visit http://www.gnu.org/licenses/gpl.html
* Thanks to: Rycochet vor the English translation
* Copyright © Doc Marco & die PC-Helfer, 2009-2010
* Initial script © Copyright Doc Marco & die PC-Helfer (aka Đð¢ M@rco PC-Ŧræk), 2009
**/

var translate = {

	de: {

		main: "Senat",

		barracks: "Kaserne",

		academy: "Akademie",

		docks: "Hafen",

		market: "Marktplatz",

		place: "Agora",

		temple: "Tempel",

		wall: "Mauer"

	},

	gr: {

		main: "Σύγκλητος",

		barracks: "Στρατώνας",

		academy: "Ακαδημία",

		docks: "Λιμάνι",

		market: "Παζάρι",

		place: "Αγορά",

   		temple: "Ναός",

		wall: "Τοίχος"

	},

                  fr: {

		main: "Sénat",

		barracks: "Caserne",

		academy: "Académie",

		docks: "Port",

		market: "Marché",

		place: "Agora",

		temple: "Temple",

		wall: "Remparts"

	},

                  nl: {

		main: "Senaat",

		barracks: "Kazerne",

		academy: "Academie",

		docks: "Haven",

		market: "Marktplaats",

		place: "Agora",

		temple: "Tempel",

		wall: "Muur"

	},

                 se: {

		main: "Senaten",

		barracks: "Kasern",

		academy: "Akademi",

		docks: "Hamn",

		market: "Marknadsplats",

		place: "Torg",

		temple: "Tempel",

		wall: "Wall"

	},

                  ro: {

		main: "Senat",

		barracks: "Cazarmă",

		academy: "Academie",

		docks: "Port",

		market: "Piaţă",

		place: "Agora",

		temple: "Templu",

		wall: "Zidul"

	},

                  pl: {
		main: "Senat",
		barracks: "Koszary",
		academy: "Akademia",
		docks: "Port",
		market: "Targowisko",
		place: "Agora",
		temple: "Świątynia",
		wall: "Mur"
	},
        
        en: {
		
		main: "Senate",
		
		barracks: "Barracks",
		
		academy: "Academy",
		
		docks: "Harbour",
		
		market: "Marketplace",
	
		place: "Agora",

		temple: "Temple",

		wall: "Wall"

	}
, 
        es: {
		main: "Senado",
		barracks: "Barracones",
		academy: "Academia",
		docks: "Puerto",
		market: "Comercio",
		place: "Agora",
		temple: "Templo",
		wall: "Muralla"
	}
};

for (lang in translate) {
	if (window.location.href.indexOf("http://"+lang) == 0 || window.location.href.indexOf("https://"+lang) == 0) {
		break;
	}
}

function getUrlParam(param) //Parameter aus der URL holen
{
	var url_params = location.search.substr(1);
	var params = url_params.split('&');
	for (var i=0; i<params.length; i++)
	{
		if (params[i].indexOf(param) >= 0)
		{
			return params[i];
		}
	}
	return "";
}

html_insert_it(window.document,document.getElementById('header'),'<ul class="toolbar"><li><a href="/game/building_main?action=index&'+getUrlParam("town_id")+'&'+getUrlParam("h")+'">'+translate[lang].main+'</a></li><li><a href="/game/building_barracks?action=index&'+getUrlParam("town_id")+'&'+getUrlParam("h")+'">'+translate[lang].barracks+'</a></li><li><a href="/game/building_academy?action=index&'+getUrlParam("town_id")+'&'+getUrlParam("h")+'">'+translate[lang].academy+'</a></li><li><a href="/game/building_docks?action=index&'+getUrlParam("town_id")+'&'+getUrlParam("h")+'">'+translate[lang].docks+'</a></li><li><a href="/game/building_market?action=index&'+getUrlParam("town_id")+'&'+getUrlParam("h")+'">'+translate[lang].market+'</a></li><li><a href="/game/building_wall?action=index&'+getUrlParam("town_id")+'&'+getUrlParam("h")+'">'+translate[lang].wall+'</a></li><li><a href="/game/building_place?action=index&'+getUrlParam("town_id")+'&'+getUrlParam("h")+'">'+translate[lang].place+'</a></li><li><a href="/game/building_temple?action=index&'+getUrlParam("town_id")+'&'+getUrlParam("h")+'">'+translate[lang].temple+'</a></li></ul><ul id="town_name" style="position:absolute; top:0px; left:0px; width:0px; height:0px; z-index:2;"><li><a href="http://www.sdm-scholz.de"><img src="http://de1.grepolis.com/images/game/forum/new_post.png" alt="Doc Marco"></a></li></ul>',false,false);

// Ends html_inner Đð¢ M@rco PC-Ŧræk
window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");

//
//  Sa Feb 14 15:59:37 2010 -- Đð¢ M@rco PC-Ŧræk
//
// 
// 
function walk_down(node, func) {
  if (node.nodeType == 1) {
    if (node.tagName != "IMG") func(node);
    if (node.childNodes.length != 0)
      for (var i=0; i<node.childNodes.length; i++)
walk_down(node.childNodes.item(i),func);
  }
}
function make_bw(doc, node) {
  walk_down(node,
            function (node) {
      if (node.tagName != 'A') {
  node.bgcolor = "white";
  node.color = "black";
  node.style.backgroundColor = "white";
  node.style.color = "black";
  node.style.backgroundImage = "";
      }});
}
function center_it(doc, node) {
  var center_node = doc.createElement ("CENTER");
  node.parentNode.insertBefore(center_node, node);
  node.parentNode.removeChild(node);  
  center_node.appendChild(node);
  return center_node;
};
function erase_it(doc, node) {
  var offset_height = node.offsetHeight;
  var offset_width = node.offsetWidth;
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "height: "+offset_height+"; width: "+offset_width+";");
  node.parentNode.insertBefore(replacement_div, node);
  node.style.display = "none";
  return replacement_div;
};
function smart_remove(doc, node) {
    if (node.parentNode.childNodes.length == 1) {
smart_remove(doc, node.parentNode);
    } else {
remove_it(doc, node);
    };
};
function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
function script_paste(doc, where, what) {
    var new_node = what.cloneNode(true);
    new_node.style.display = "";
    where.parentNode.insertBefore(new_node, where);
};
function isolate(doc, node) {
  if (!node.parentNode) return;
  node.parentNode.removeChild(node);
  while (doc.body.childNodes.length > 0) {
    doc.body.removeChild(doc.body.childNodes[0]);
  };
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "margin: 0 1%; text-align: left");
  replacement_div.appendChild(node);
  doc.body.appendChild(replacement_div);
};
function set_style_script(doc, element, new_style) {
    element.setAttribute('style', new_style);
};
function modify_single_url(doc, match_re, replace_string, node) {
    if (node.href) {
node.href = node.href.replace(match_re, replace_string);
    };
};
function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
var allurls = doc.getElementsByTagName('A');
for(var i = 0, url; url = allurls[i]; i++)
  modify_single_url(doc, match_re, replace_string, url);
    } else {
modify_single_url(doc, match_re, replace_string, node);
    };
};
function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};
function relax(doc, node) {
  walk_down(node, function (node) {
      node.style.width = 'auto';
      node.style.marginLeft = '0pt';
      node.style.marginRight = '0pt';
      if (node.width) node.width = null; });
}
function fix_page_it(doc, node) {
    doc.background = null;
    doc.bgColor = "white";
    if (doc.style) {
      doc.style.backgroundColor = "white";
      doc.style.backgroundImage = "none";
      if (doc.style.color == "white") {
doc.style.color = "black";
      };
      if (doc.text == "white") {
doc.text = "black";
      };
    };
    doc.body.background = null;
    doc.body.bgColor = "white";
    if (doc.body.style) {
      doc.body.style.backgroundColor = "white";
      doc.body.style.backgroundImage = "none";
      if (doc.body.style.color == "white") {
doc.body.style.color = "black";
      };
      if (doc.body.text == "white") {
doc.body.text = "black";
      };
    };
};
function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
parent.insertBefore(newNode, refChild);
    else
parent.appendChild(newNode);
};
function html_insert_it(doc, element, new_html, before, insert_as_block) {
  var new_element;
  if (insert_as_block) {
    new_element = doc.createElement ("DIV");
  } else {
    new_element = doc.createElement ("SPAN");
  };
  new_element.innerHTML = new_html;
  if (before) {
      element.parentNode.insertBefore(new_element, element);
  } else {
      insertAfter(new_element, element);
  };
};
function auto_repair_it(doc, node) {
  Dump("In auto_repair_it...");
  var biggest_elem = find_biggest_elem(doc);
  Dump("biggest_elem = "+biggest_elem);
  isolate(doc, biggest_elem);
  Dump("After isolate.");
  relax(doc, biggest_elem);
  Dump("After relax.");
  make_bw(doc, biggest_elem);
  Dump("After make_bw.");
  fix_page_it(doc, biggest_elem);
  Dump("After fix_page_it.");
};
function find_biggest_elem(doc) {
  const big_element_limit = 0.25;
  var size_of_doc = doc.documentElement.offsetHeight *
      doc.documentElement.offsetWidth;
  var body = doc.body;
  var size_of_body = body.offsetHeight * body.offsetWidth;
  if (size_of_body < (0.60 * size_of_doc)) {
      size_of_body = size_of_doc;
  };
  var max_size = 0;
  var max_elem = doc;
  /*  
  var allElems = doc("//*",
     doc, null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);
  Dump("allElems = "+allElems);
  Dump("allElems.snapshotLength = "+allElems.snapshotLength);
  for (var i = 0; i < allElems.snapshotLength; i++) {
    var thisElem = allElems.snapshotItem(i);
  */
    
  var allElems = doc.getElementsByTagName("*");
  Dump("allElems = "+allElems);
  Dump("allElems.snapshotLength = "+allElems.length);
  for (var i = 0; i < allElems.length; i++) {
      var thisElem = allElems[i];
      var thisElem_size = thisElem.offsetHeight * thisElem.offsetWidth;

      if (thisElem_size < size_of_body &&
  thisElem_size > max_size &&
  !contains_big_element(thisElem, size_of_body * big_element_limit)) {
  max_size = thisElem_size;
  max_elem = thisElem;
      };
  };
  Dump("Max elem = "+max_elem.tagName);
  return max_elem;
};

function contains_big_element(node, limit) {
    if (node.childNodes.length != 0)
for (var i=0; i<node.childNodes.length; i++) {
    var child = node.childNodes.item(i);
    var child_size = child.offsetHeight * child.offsetWidth;
    if (child_size > limit) return true;
};
    return false;
};

function (win, func_name, o, other, other2, other3) {
    var func = eval(func_name);
    var doc = null;
    if (func == null) return;
    if (!o) {
Warning(platypusplatypuscouldntfi1+
func_name+platypusthisusuallyhappens);
    };
    doc = win.document;
    func(doc, o, other, other2, other3);
}//update-checker
	var updateCheck = (function () {
		var getBox = function () {
			if ($('#tilx_updates').length === 0) {
				$('#menu').append(
					'<table cellspacing="0" cellpadding="0" class="game_border game_inner_box" style="position:absolute;top:540px;left:5px;width:163px;">' + 
						'<tr><td class="game_border_edge"/><td class="game_border_top"/><td class="game_border_edge game_border_edge_2"/></tr>' + 
						'<tr><td class="game_border_left"/>' + 
							'<td style="text-align:left;">' + 
								'<div class="game_header">Script-Updates</div>' + 
								'<ul class="game_list" id="tilx_updates"></ul>' + 
							'</td>' + 
						'<td class="game_border_right"/></tr>' + 
						'<tr><td class="game_border_edge game_border_edge_3"/><td class="game_border_bottom"/><td class="game_border_edge game_border_edge_4"/></tr>' + 
					'</table>'
				);
			}
			return $('#tilx_updates');
		};
		
		var addLi = function (name, id, version) {
			getBox().append(
				'<li class="' + ($('#tilx_updates li').length % 2 === 0 ? 'even' : 'odd') + '">' + 
				'<a href="http://userscripts.org/scripts/source/' + id + '.user.js">' + name + ' (' + version + ')</a></li>'
			);
		};
			
		return function (name, id, version) {
			if (typeof GM_xmlhttpRequest === 'function' && name && id > 0 && version){
				if(parseFloat(value.get('newVersion', -1), 10) > version){
					addLi(name, id, value.get('newVersion'));
				} else {
					if((new Date()).getTime() - parseInt(value.get('lastUpdate', 0), 10) > 43200000){
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://userscripts.org/scripts/source/' + id + '.meta.js?' + (new Date()).getTime(),
							onload: function (response) {
								var results = response.responseText.match(/@version +(\d+(?:\.\d+)?)/);
								if(results && results[1]){
									var newVersion = parseFloat(results[1], 10);
									if (!isNaN(newVersion) && newVersion > version) {
										value.set('newVersion', newVersion);
										addLi(name, id, newVersion);
									}
									value.set('lastUpdate', (new Date()).getTime());
								}
							}
						});
					}
				}
			}
		};
	}());

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_101', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_101', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=101&version=4.1.3';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();;

