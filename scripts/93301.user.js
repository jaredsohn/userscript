// JavaScript Document
//
//
// ==UserScript==
//
// @name Ikariam Shippinglinks 
//
// @author DarkViruzz
// @description Send short links for shipping/attacking by CityID and allow HTML (based on krwq)
// @homepage http://userscripts.org/scripts/show/93301
// @require http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require http://userscripts.org/scripts/source/57756.user.js
// @include http://s*.ikariam.*/index.php?view=diplomacyAdvisor*
// @exclude http://board.ikariam.*/*
// @exclude http://support*.ikariam.*/*
// @exclude http://s*.ikariam.*/index.php?view=diplomacyAdvisorAlly*
// @exclude http://s*.ikariam.*/index.php?view=diplomacyAdvisorTreaty*
// @version 1.01
// ==/UserScript==

ScriptUpdater.check(93301, "1.01");

const FORBIDDENINTAG = ["script","onload","onmouse","onkey","onclick","onerror","html"];

Shippinglinks = {
	init:function() {
		$("td.msgText div").each(function() {
			var html = $(this).html();
			html = Shippinglinks.formatContent(html);
			$(this).html(html);
		});
	},
	formatContent:function(html) {

		var newhtml = html.replace(/<br \/>/g,'\n').replace(/&lt;/g,"<").replace(/&gt;/g,">");
		var b = -1;
		while (1) {									// suche nach htmltags <.>
			b = newhtml.indexOf('<',b+1);
			if (b==-1)
				break;
			var b2 = newhtml.indexOf('>',b+1);
			if (b2==-1) {
				newhtml[b] = '?';
				break;
			}
			var tag = newhtml.slice(b+1,b2).toLowerCase().trim();
//			alert(tag);
			for (var i=0; i<FORBIDDENINTAG.length; i++) {
				if (tag.indexOf(FORBIDDENINTAG[i])!=-1)
					return '<b>Blocked because of probably dangerous contents!</b></font>';
			}
		}
		var i=0;
		var a;
		var b2 = -1;
		var str = new Array();
		var leftStr = new Array();
		b = -1;
		while (1) {									// suche nach shippingContainer [.]
			a = b2+1;								// end of str
			b = newhtml.indexOf('[',b+1);
			if (b==-1)
				break;
			b2 = newhtml.indexOf(']',b+1);
			if (b2==-1) {
				newhtml[b] = '?';
				break;
			}
			str[i] = Shippinglinks.edit(newhtml.slice(b+1,b2));  // = inside of [.]
			leftStr[i] = newhtml.slice(a,b);  						// without "[" and "]"
			i++;

		}
		str[i] = "";		
		leftStr[i] = newhtml.slice(a);
		var endText = leftStr[0]+str[0];
		for(j=1;j<str.length;j++) 
			endText += leftStr[j] + str[j];
		return endText;
	},
	edit:function(string) {
		var a,b;
		var action	=	"trade";
		var name	=	"["+string+"]";
		var id;
		a = string.indexOf(',');//Pos. erstes Komma
		b = string.indexOf(',',a+1);//Pos. zweites Komma
	//alert(b)
		if (a==-1 && string.replace(/\s/g,"").match(/\d\d\d\d\d+/)){//alert("case1: "+string + "\n" + id + "\n" + action + "\n" + name);
			return Shippinglinks.makeLink(string,action,name);}
		id = string.slice(0,a).replace(/\s/g,"");
		if (b==-1 && string.replace(/\s/g,"").match(/\d\d\d\d\d+,\w+/)) {
			action	= string.slice(a+1).toLowerCase().replace(/\s/g,"");
			//alert("case2: "+string + "\n" + id + "\n" + action + "\n" + name);
			return Shippinglinks.makeLink(id,action,name);
		}
		name	= string.slice(b+1);
		if((string.length-2-id.length-name.length)>0)
			action	= string.slice(a+1,b).toLowerCase().replace(/\s/g,"");
		if (string.replace(/\s/g,"").match(/\d\d\d\d\d+,\w*,\w+/)){
			//alert("case3: "+string + "\n" + id + "\n" + action + "\n" + name);
			return Shippinglinks.makeLink(id,action,name);}
		else{ 
			//alert("??");
			return "?"+string+"?";}
	},
	makeLink:function(id,action,name2) {
		name = "<u>"+name2+"</u>";
		switch(action){
			case 'trade'		:
			case 'handel'		:
			case 'waren'		:
				return "<a href=\"http://s14.de.ikariam.com/index.php?view=transport&destinationCityId="+ id +"\">"+name+"</a>";
				break;
			case 'vert.hafen'	:
			case 'verteidigenhafen'	:
			case 'hafenverteidigen'	:
			case 'hafenbefreien'	:
			case 'defendport'	:
				return "<a href=\"http://s14.de.ikariam.com/index.php?view=defendPort&destinationCityId="+ id +"\">"+name+"</a>";
				break;
			case 'vert.stadt'	:
			case 'verteidigenstadt'	:
			case 'stadtverteidigen'	:
			case 'stadtbefreien'	:
			case 'defendcity'	:
				return "<a href=\"http://s14.de.ikariam.com/index.php?view=defendCity&destinationCityId="+ id +"\">"+name+"</a>";
				break;
			case 'stationflotte'	:
			case 'stationfleet'	:
			case 'flottestationieren'	:
			case 'deployflotte'	:
			case 'deployfleet'	:
				return "<a href=\"http://s14.de.ikariam.com/index.php?view=deployment&deploymentType=fleet&destinationCityId="+ id +"\">"+name+"</a>";
				break;
			case 'stationarmee'	:
			case 'stationtroops'	:
			case 'station'	:
			case 'stationieren'	:
			case 'truppenstationieren'	:
			case 'armeestationieren'	:
			case 'deploytroop'	:
			case 'deployarmee'	:
				return "<a href=\"http://s14.de.ikariam.com/index.php?view=deployment&deploymentType=army&destinationCityId="+ id +"\">"+name+"</a>";
				break;
			case 'angriff'		:
			case 'plunder'		:
			case 'plündern'		:
			case 'attack'		:
				return "<a href=\"http://s14.de.ikariam.com/index.php?view=plunder&destinationCityId="+ id +"\">"+name+"</a>";
				break;
			case 'blockade'		:
			case 'hafenblockieren'		:
			case 'hafen'		:
			case 'block'		:
				return "<a href=\"http://s14.de.ikariam.com/index.php?view=blockade&destinationCityId="+ id +"\">"+name+"</a>";
				break;
			case 'occupy'		:
			case 'besetzen'		:
			case 'stadtbesetzen'		:
				return "<a href=\"http://s14.de.ikariam.com/index.php?view=occupy&destinationCityId="+ id +"\">"+name+"</a>";
				break;
				
			default: {
				if(name2.toLowerCase() == ("["+id+","+action.toLowerCase()+"]"))
					return "?"+id+","+action+"?";
				return "?"+id+","+action+","+name2+"?";
			}
		}
	}
};

Shippinglinks.init();
