// ==UserScript==
// @name          GrepoBefehle
// @namespace     
// @description   Erweiterung Verwalter Befehle
// @version       0.4b
// @include       http://*.grepolis.*/game/town_overviews?action=command_overview*
// ==/UserScript==

var ul,divFooter;
ul=document.getElementById("command_overview");
//divFooter=ul.nextSibling.nextSibling;
allDivFooter=document.evaluate(
	"//div[@class='game_list_footer']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
divFooter=allDivFooter.snapshotItem(0);
	
var a,textElement,img,span;

//http://static.grepolis.com/images/game/layout/toolbar_edit.png
allImg=document.evaluate(
	"//span[@class='overview_incoming icon']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
if (allImg.snapshotLength>0)
{
	a=document.createElement("a");
	a.setAttribute("href", "#");
	a.setAttribute("onclick", "gtio_toggle_incoming();");
	divFooter.appendChild(a);
	img=document.createElement("img");
	img.setAttribute("src", "http://static.grepolis.com/images/game/layout/toolbar_edit.png");
	img.setAttribute("width","26");
	a.appendChild(img);
	span=document.createElement("span");
	span.setAttribute("id", "gtio_commands_incoming");
	divFooter.appendChild(span);
	if (document.cookie.indexOf("gtio_commands_incoming=off") == -1)
		textElement=document.createTextNode("on");
	else
		textElement=document.createTextNode("off");
	//textElement=document.createTextNode("on");
	span.appendChild(textElement);
}
	
var attackTypes=new Array("farm_attack", "ask_farm_for_resources", "ask_farm_for_units", "attack_spy", "attack_land", "attack_sea", "support", "breakthrough", "attack_takeover");
for (var i=0; i<attackTypes.length; i++)
{
	allImg=document.evaluate(
		"//img[@class='command_type' and @src='http://static.grepolis.com/images/game/unit_overview/"+attackTypes[i]+".png']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	if (allImg.snapshotLength>0)
	{
		a=document.createElement("a");
		a.setAttribute("href", "#");
		a.setAttribute("onclick", "gtio_toggle_by_img('"+attackTypes[i]+"');");
		divFooter.appendChild(a);
		img=document.createElement("img");
		img.setAttribute("src", "http://static.grepolis.com/images/game/unit_overview/"+attackTypes[i]+".png");
		img.setAttribute("width","26");
		a.appendChild(img);
		span=document.createElement("span");
		span.setAttribute("id", "gtio_commands_"+attackTypes[i]);
		span.setAttribute("style", "allign:right");
		divFooter.appendChild(span);
//		if (attackTypes[i]=="support")
//			alert("sup "+document.cookie.indexOf("gtio_commands_"+attackTypes[i]+"=off"));
		if (document.cookie.indexOf("gtio_commands_"+attackTypes[i]+"=off") == -1)
			textElement=document.createTextNode("on");
		else
			textElement=document.createTextNode("off");
		//textElement=document.createTextNode("on");
		span.appendChild(textElement);
	}
}

var script="\
	function gtio_hide_incoming()\
	{\
		var allSpan;\
		allSpan=document.evaluate(\
				\"//div[@id='tab_classic']/ul/li/div/span/span[@class='overview_incoming icon']\",\
				document,\
				null,\
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
				null);\
		if (allSpan.snapshotLength>0)\
		{\
			var el,sib,script;\
			script=document.getElementById('gtio_commands_container');\
			for (var i=0; i<allSpan.snapshotLength; i++)\
			{\
				el=allSpan.snapshotItem(i);\
				while (el.nodeName!='LI')\
				{\
					el=el.parentNode;\
				}\
				sib=el.nextSibling;\
				script.appendChild(el);\
				dummy_v1_21='script.appendChild(sib)';\
			}\
			gtio_restore_evenodds();\
		}\
	};\
	function gtio_show_incoming()\
	{\
		var allSpan;\
		allSpan=document.evaluate(\
				\"//script[@id='gtio_commands_container']/li/div/span/span[@class='overview_incoming icon']\",\
				document,\
				null,\
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
				null);\
		if (allSpan.snapshotLength>0)\
		{\
			var el,ul,sib;\
			ul=$('div#tab_classic ul')[0];\
			for (var i=0; i<allSpan.snapshotLength; i++)\
			{\
				el=allSpan.snapshotItem(i);\
				while (el.nodeName!='LI')\
				{\
					el=el.parentNode;\
				}\
				sib=el.nextSibling;\
				ul.appendChild(el);\
				dummy_v1_21='ul.appendChild(sib)';\
			}\
			gtio_restore_all_hides();\
			gtio_sort_by_time();\
			gtio_restore_evenodds();\
		}\
	};\
	function gtio_restore_all_hides()\
	{\
		var attackTypes=new Array('farm_attack', 'ask_farm_for_resources', 'ask_farm_for_units', 'attack_spy', 'attack_land', 'attack_sea', 'support', 'breakthrough', 'attack_takeover');\
		for (var i=0; i<attackTypes.length; i++)\
		{\
			if (document.getElementById('gtio_commands_'+attackTypes[i]) && document.getElementById('gtio_commands_'+attackTypes[i]).firstChild.nodeValue=='off')\
				gtio_hide_by_img(attackTypes[i]);\
		}\
		if (document.getElementById('gtio_commands_incoming') && document.getElementById('gtio_commands_incoming').firstChild.nodeValue=='off')\
			gtio_hide_incoming();\
	};\
	function gtio_hide_by_img(attack_type)\
	{\
		var allImg;\
		allImg=document.evaluate(\
		\"//div[@id='tab_classic']/ul/li/div/a/img[@class='command_type' and @src='http://static.grepolis.com/images/game/unit_overview/\"+attack_type+\".png']\",\
		document,\
		null,\
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
		null);\
		if (allImg.snapshotLength>0)\
		{\
			var el,sib,script;\
			script=document.getElementById('gtio_commands_container');\
			for (var i=0; i<allImg.snapshotLength; i++)\
			{\
				el=allImg.snapshotItem(i);\
				while (el.nodeName!='LI')\
				{\
					el=el.parentNode;\
				}\
				sib=el.nextSibling;\
				script.appendChild(el);\
				dummy_v1_21='script.appendChild(sib)';\
			}\
			gtio_restore_evenodds();\
		}\
	};\
	function gtio_show_by_img(attack_type)\
	{\
		var allImg;\
		allImg=document.evaluate(\
				\"//script[@id='gtio_commands_container']/li/div/a/img[@class='command_type' and @src='http://static.grepolis.com/images/game/unit_overview/\"+attack_type+\".png']\",\
				document,\
				null,\
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
				null);\
		if (allImg.snapshotLength>0)\
		{\
			var el,ul,sib;\
			ul=document.getElementById('command_overview');\
			ul=$('div#tab_classic ul')[0];\
			for (var i=0; i<allImg.snapshotLength; i++)\
			{\
				el=allImg.snapshotItem(i);\
				while (el.nodeName!='LI')\
				{\
					el=el.parentNode;\
				}\
				sib=el.nextSibling;\
				ul.appendChild(el);\
				dummy_v1_21='ul.appendChild(sib)';\
			}\
			gtio_restore_all_hides();\
			gtio_sort_by_time();\
			gtio_restore_evenodds();\
		}\
	};\
	function gtio_restore_evenodds()\
	{\
		allTrash=document.evaluate(\
				\"//div[@id='tab_classic']/ul[@class='game_list']/li[contains(@style,'display: none;')]\",\
				document,\
				null,\
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
				null);\
		if (allTrash.snapshotLength==1)\
		{\
			var parent=allTrash.snapshotItem(0).parentNode;\
			parent.removeChild(allTrash.snapshotItem(0));\
		}\
		var allLi;\
		allLi=document.evaluate(\
				\"//div[@id='tab_classic']/ul[@class='game_list']/li\",\
				document,\
				null,\
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
				null);\
		for (var i=0; i<allLi.snapshotLength; i++)\
		{\
			if (i%2)\
				allLi.snapshotItem(i).setAttribute('class', 'even place_command ');\
			else\
				allLi.snapshotItem(i).setAttribute('class', 'odd place_command ');\
		}\
	};\
	function gtio_toggle_incoming()\
	{\
		var status;\
		var span;\
		span=document.getElementById(\"gtio_commands_incoming\");\
		status=span.firstChild.nodeValue;\
		if (status=='on') status='off';\
		else status='on';\
		span.firstChild.nodeValue=status;\
		if (status=='off')\
			gtio_hide_incoming();\
		else\
			gtio_show_incoming();\
		gtio_sort_by_time();\
		gtio_restore_evenodds();\
		var expires=new Date();\
		var oneMonth=expires.getTime()+(30*24*60*60*1000);\
		expires.setTime(oneMonth);\
		document.cookie='gtio_commands_incoming='+status+'; expires='+expires.toGMTString();\
	};\
	function gtio_toggle_by_img(attack_type)\
	{\
		var status;\
		var span;\
		span=document.getElementById(\"gtio_commands_\"+attack_type);\
		status=span.firstChild.nodeValue;\
		if (status=='on') status='off';\
		else status='on';\
		span.firstChild.nodeValue=status;\
		if (status=='off')\
			gtio_hide_by_img(attack_type);\
		else\
			gtio_show_by_img(attack_type);\
		gtio_sort_by_time();\
		gtio_restore_evenodds();\
		var expires=new Date();\
		var oneMonth=expires.getTime()+(30*24*60*60*1000);\
		expires.setTime(oneMonth);\
		document.cookie='gtio_commands_'+attack_type+'='+status+'; expires='+expires.toGMTString();\
	};\
	function gtio_sort_by_time()\
	{\
		var ul=document.getElementById('command_overview');\
		ul=$('div#tab_classic ul')[0];\
		var allSpan;\
		allSpan=document.evaluate(\
			\"//div[@id='tab_classic']/ul[@class='game_list']/li/div/span[@class='countdown']\",\
			document,\
			null,\
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
			null);\
		if (allSpan.snapshotLength<2)\
			return;\
		var processed=new Array(allSpan.snapshotLength+1);\
		for (var i=0; i<allSpan.snapshotLength; i++)\
			processed[i]=0;\
		var maxEta, maxEtaI;\
		var span,el,sib,text,t1,t2,t3,eta,t;\
		for (var j=0; j<allSpan.snapshotLength; j++)\
		{\
			maxEta=0;\
			maxEtaI=0;\
			for (i=0; i<allSpan.snapshotLength; i++)\
			{\
				if (processed[i]==0)\
				{\
					span=allSpan.snapshotItem(i);\
					text=span.firstChild.nodeValue;\
					t=/([0-9]+):([0-9]+):([0-9]+)/.exec(text);\
					eta=parseInt(t[1],10)*3600+parseInt(t[2],10)*60+parseInt(t[3],10);\
					if (eta>maxEta)\
					{\
						maxEta=eta;\
						maxEtaI=i;\
					}\
				}\
			};\
			processed[maxEtaI]=1;\
			el=allSpan.snapshotItem(maxEtaI);\
			while (el.nodeName!='LI')\
				el=el.parentNode;\
			sib=el.nextSibling;\
			dummy_v1_21='ul.insertBefore(sib,ul.firstChild.nextSibling)';\
			ul.insertBefore(el,ul.firstChild);\
		};\
	};\
	function al(){};";
	
var scriptEl = document.createElement("script");
scriptEl.setAttribute("id", "gtio_commands_container");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode(script));
document.body.appendChild(scriptEl);

// einmal ausführen zu beginn
script="(\
	function()\
	{\
		gtio_restore_all_hides();\
		gtio_sort_by_time();\
		gtio_restore_evenodds();\
	})();";
criptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode(script));
document.body.appendChild(scriptEl);