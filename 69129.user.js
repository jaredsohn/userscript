// ==UserScript==
// @name           the-west shortcut tools
// @namespace      www.the-west.pl
// @description    Skrypt dodaje różne przydatne skróty do the-west.
// @description    Wersja 1.02
// @description    Copyright 2010 Darius II świat 10 mailto:info@jump.net.pl
// @include        http://*.the-west.*/game.php*
// $exclude        http://www.the-west.*
// $exclude        http://forum.the-west.*
// ==/UserScript==
// 
// ---------------------------------------------------------------------------

(function(){
	var doc = document;
	var console = unsafeWindow.console;
	function $(id) { return(doc.getElementById(id)); }
	function xp1(x, p) {
		var r = doc.evaluate(x, p, null, 9, null).singleNodeValue;
		return(r);
	}
	function xp(x, p) {
		var r = doc.evaluate(x, p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var len = r.snapshotLength;
		var ar = new Array(len);
		for(var i=0; i<len; i++) {
			ar[i] = r.snapshotItem(i).textContent;
		}
		return(ar);
	}

	function __tf(template, name) {
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				if (elName == name)
					return(p);
				if (p.children)
				{
					var q = __tf(p.children, name);
					if (q)
						return(q);
				}
			}
		}
		return(null);
	}
	function dc(template, parent)
	{
		// { thead: { el:null, attrs:{}, children: {} } }
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				p.el = doc.createElement(p.tag);
				if (parent)
					parent.appendChild(p.el);
				
				if (p.attrs)
				{
					for(var atName in p.attrs)
					{
						if (p.attrs.hasOwnProperty(atName))
						{
							var atValue = p.attrs[atName];
							if (atName == "text")
								p.el.textContent = atValue;
							else if (atName == "html")
								p.el.innerHTML = atValue;
							else
								p.el.setAttribute(atName, atValue);
						}
					}
				}
				
				if (p.children)
				{
					dc(p.children, p.el);
				}
			}
		}
		template.find = function(name) {
			return(__tf(template, name));
		};
		return(template);
	}
	function trim(str) {
		s = str.replace(/^(\s)*/, '');
		s = s.replace(/(\s)*$/, '');
		return s;
	}
	function whiteSpaceRemove(str) {
		s = str.replace(/\s+/g,' ');
		s = s.replace(/^(\s)*/, '');
		s = s.replace(/(\s)*$/, '');
		return s;
	}
	function antirtrim(str,num) {
		for (istr = str.length; istr<num; istr++)
			str = str + ' ';
		return str;
	}
	
	function hookReport(div) {
		var titleRow = xp1('./table/tbody/tr[2]/td[2]/div/table/tbody/tr', div);
		if (!titleRow) return;

		if (!titleRow.textContent.match(/Pojedynek:/))
			return;
		var t = dc({
			"th": { 
				tag: "th", 
				children: {
					"btn": {
						tag: "button",
						attrs: {
							onclick: "javascript:var remoteScript=new Element('script',{\"type\":\"text/javascript\",\"src\":\"http://www.the-west.com.pl/beta/js/get/duels_small.js\"});document.body.appendChild(remoteScript);void(0);",
							style: "width:25px; height:25px; border:0; margin-left:-40px; background-image: url(http://i513.photobucket.com/albums/t333/tyrazz/notes.jpg)",
							text: " ",
							title: "Konwertowanie raportu"
						}
					}
				}
			}
		});
		titleRow.appendChild(t["th"].el);
	}
	
	//
	// Start up
	//
	var loc = doc.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		hookReport(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
	unsafeWindow.AjaxWindow.setJSHTML = f;
	
})();

function button_exp_duel (duel) {
    var exp_duel = document.getElementById("exp_duel");
	if (!exp_duel) {
		exp_duel = document.createElement('div');
		exp_duel.setAttribute('id','exp_duel');
		exp_duel.setAttribute('onclick','javascript:var remoteScript=new Element("script", {"type": "text/javascript", "src": "http://www.the-west.com.pl/beta/js/get/duel_settings.js"});document.body.appendChild(remoteScript);void(0);');
		exp_duel.setAttribute('style','position:absolute; width:69px; height:78px; text-align:center; top:100px; left:15px; background-image: url(http://i513.photobucket.com/albums/t333/tyrazz/duel.jpg);cursor:pointer');
		duel.appendChild(exp_duel);
	}
	exp_duel.innerHTML = '<span class="skill_value_big" style="font-size:9px!important; left:2px!important; top:13px!important"></span>';
}

function button_exp_skillset (skill) {
    var exp_skillset = document.getElementById("exp_skillset");
	if (!exp_skillset) {
		exp_skillset = document.createElement('div');
		exp_skillset.setAttribute('id','exp_skillset');
		exp_skillset.setAttribute('style','position:absolute; width:50px; height:50px; text-align:center; top:75px; left:15px; background-image: url(../images/skill_points/skill_points.png);cursor:pointer');
		exp_skillset.setAttribute('onclick','javascript:var wsurl = \'http://pl.weststats.com/incoming.php?type=public&data=\';var collectedinfo = \'\';for(var p in Character.attributes){collectedinfo += Character.attributes[p] + \',\';}for(var s in Character.skills){collectedinfo += Character.skills[s] + \',\';}try {var charname = $(\'avatar\').textContent.replace(Character.level, \'\');}catch (e){var charname = $(\'avatar\').innerText.replace(Character.level, \'\');}collectedinfo += charname; wsurl += collectedinfo;wsurl += "&w=" + encodeURIComponent(location.href);document.location.replace(wsurl);end();');
		skill.appendChild(exp_skillset);
	}
	exp_skillset.innerHTML = '<span class="skill_value_big" style="font-size:9px!important; left:2px!important; top:13px!important">EXPORT</span>';
}

function button_exp_inventory (inventory) {
    var exp_inventory = document.getElementById("exp_inventory");
	if (!exp_inventory) {
		exp_inventory = document.createElement('div');
		exp_inventory.setAttribute('id','exp_inventory');
		exp_inventory.setAttribute('style','position:absolute; width:50px; height:50px; text-align:center; top:75px; left:250px; background-image: url(../images/skill_points/skill_points.png);cursor:pointer');
		exp_inventory.setAttribute('onclick','javascript:wsurl = \'http://pl.weststats.com/incoming.php?type=invent&ui=234120&up=a7fff874ebabd7b2f803461474bfe8846256480b&i=11&data=\';co = \'\';count = 0;x = Bag.getInstance().items;for(var p in x) {var s = x[p].get_short();var t = x[p].get_type();var c = x[p].get_count_value();if(c > 1) {for (o=0;o<c;o++) {co += t.substring(0, 1) + \':\' + s + \',\';}count = count + c;}else{co += t.substring(0, 1) + \':\' + s + \',\';count = count + 1;}}if(count < 1) {new HumanMessage(\'This script must be ran after the inventory has been opened!\');end();}w = Wear.wear;try {co += \'a!:\' + w.animal.get_short() + \',\';} catch (e) {}try {co += \'b!:\' + w.body.get_short() + \',\';} catch (e) {}try {co += \'f!:\' + w.foot.get_short() + \',\';} catch (e) {}try {co += \'h!:\' + w.head.get_short() + \',\';} catch (e) {}try {co += \'n!:\' + w.neck.get_short() + \',\';} catch (e) {}try {co += \'r!:\' + w.right_arm.get_short() + \',\';} catch (e) {}try {co += \'l!:\' + w.left_arm.get_short() + \',\';} catch (e) {}try {co += \'y!:\' + w.yield.get_short() + \',\';} catch (e) {}try {var cn = $(\"avatar\").textContent.replace(Character.level, \"\");}catch (e){var cn = $(\"avatar\").innerText.replace(Character.level, \"\");}wsurl += co;wsurl += \"&w=\" + encodeURIComponent(location.href) + \"&n=\" + cn;n = new Element(\'iframe\', {\'src\': wsurl, \'style\': \'display:none\'});n.style.display=\'none\';document.body.appendChild(n);void(0);');
		inventory.appendChild(exp_inventory);
	}
	exp_inventory.innerHTML = '<span class="skill_value_big" style="font-size:9px!important; left:2px!important; top:13px!important">EXPORT</span>';
}

function checkWindows_ToAddFeatures ( ) {
	var duel = document.getElementById("window_duel_content");
	var skill = document.getElementById("window_skill_content");
	var inventory = document.getElementById("window_inventory_content");
	if (duel) { button_exp_duel (duel);	}
	if (skill) { button_exp_skillset (skill); }
	if (inventory) { button_exp_inventory (inventory); }
	
	setTimeout ( checkWindows_ToAddFeatures, 2000 );
}

//start up
setTimeout ( checkWindows_ToAddFeatures, 2000 );


/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_106', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_106', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=106&version=1.02';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();