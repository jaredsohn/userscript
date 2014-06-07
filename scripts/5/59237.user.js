// ==UserScript==
// @name           XMenu
// @namespace      Xhodon
// @description    Addon for Xhodon
// @author         nigr(A)ngelus
// @email          nigroangelus@arcor.de
// @license        cc-by-sa
// @homepage       http://www.nigroangelus.de
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://*.xhodon.*
// @exclude        http://forum.xhodon.*
// @exclude        http://wiki*.xhodon.*
// @exclude        http://chat.xhodon.*
// @version        0.13
// @history        0.13 secrets
// @history        0.12 only graphic/optical enhancements
// @history        0.11 Dropdown-Menus (at ur own risk!)
// @history        0.10 Farmlist etc (in progress)
// @history        0.09 BuildTimer (in progress)
// @history        0.08 HeroUpdate (in progress)
// @history        0.07 Implemented Update-Function
// @history        0.06 Removed Sub-Worlds
// @history        0.05 Changed Zwergwelt to Zentaurenwelt
// @history        0.04 Changed Font-Size to 9px for Heroes Info
// @history        0.03 Added Update-Check (not functional yet)
// @history        0.02 Added hiding for world-divs
// @history        0.01 Changes to graphics
// ==/UserScript==


$(document).ready(function() {
	$("body").append("<div id='addon_running'>XMenu läuft...</div>");
});

//********************
// VARIABLE DEFINITION
var server,tmp,result,x,y,d,dx,dy,FIRST=true,drag=false,XVersion="0.13";
var XM=[];
	XM["HeroCt"]=0;
	XM["Heroes"]=new Array();
	XM["Host"]=window.location.host;
	XM["URL"]=document.location.href;
	XAllowedChars='1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:.-';
var bgl_top='background:url(http://'+XM["Host"]+'/xhodon/gfx/side/licht/images/dropdown_top.png);';
var bgl_mid='background:url(http://'+XM["Host"]+'/xhodon/gfx/side/licht/images/dropdown_kachel.png);';
var bgl_btm='background:url(http://'+XM["Host"]+'/xhodon/gfx/side/licht/images/dropdown_bottom.png);';
var bgs_top='background:url(http://'+XM["Host"]+'/xhodon/gfx/side/schatten/images/dropdown_top.png);';
var bgs_mid='background:url(http://'+XM["Host"]+'/xhodon/gfx/side/schatten/images/dropdown_kachel.png);';
var bgs_btm='background:url(http://'+XM["Host"]+'/xhodon/gfx/side/schatten/images/dropdown_bottom.png);';

var XMenu=document.createElement("div");
	XMenu.id="XMenu";
	XMenu.style.position="fixed";
	XMenu.style.display="block";
	XMenu.style.zIndex="999";
	XMenu.style.width="150px";
	XMenu.style.color="#FFF";
	XMenu.style.opacity=".9";
	XMenu.style.margin="0px";
	if (GM_getValue("_LR")) {if (GM_getValue("_LR")<0) {XMenu.style.right=GM_getValue("_LR");} else {XMenu.style.left=GM_getValue("_LR");}} else {XMenu.style.left="0px";}
	if (GM_getValue("_TB")) {if (GM_getValue("_TB")<0) {XMenu.style.bottom=GM_getValue("_TB");} else {XMenu.style.top=GM_getValue("_TB");}} else {XMenu.style.top="0px";}
	document.body.appendChild(XMenu);
	document.getElementById("XMenu").innerHTML='\
	<table width="100%" align="center" border="0">\
	<tr><td align="center" id="xm_mover_1" style="height:27px;padding-top:9px;color:#763434;cursor:move;'+bgl_top+'" onmouseout="nd();" onmouseover="return overlib(\'Maus gedrückt halten, um das Menü zu verschieben.\');">X &middot; M&middot;E&middot;N&middot;U</td></tr>\
	<tr><td align="center" id="xm_line_1" style="'+bgl_mid+'">.. init ..</td></tr>\
	<tr><td align="center" id="xm_bottom_1" style="height:25px;'+bgl_btm+'">-Please Wait-</td></tr>\
	</table>\
	<table width="100%" align="center" border="0">\
	<tr><td align="center" style="height:27px;color:#000000;'+bgs_top+'">FarmList</td></tr>\
	<tr><td align="center" style="'+bgs_mid+'"><textarea id="xm_farm" style="width:126px;height:100px;background:#C7C7C7;font-size:9px;font-family:arial;overflow:hidden;" wrap="off">.. boxed ..</textarea></td></tr>\
	<tr><td align="center" style="'+bgs_mid+'"><input id="xm_unit" style="width:132px;background:#C7C7C7;font-size:9px;font-family:arial;" readonly></td></tr>\
	<tr><td align="center" style="'+bgs_mid+'"><input id="xm_elix" style="width:132px;background:#C7C7C7;font-size:9px;font-family:arial;" readonly></td></tr>\
	<tr><td align="center" style="height:25px;'+bgs_btm+'"></td></tr>\
	</table>';

var XConfig=document.createElement("div");
	XConfig.id="XConfig";
	XConfig.style.position="fixed";
	XConfig.style.display="block";
	XConfig.style.color="#FFE1A8";
	XConfig.style.fontSize="9px";
	XConfig.style.margin="2px";
	XConfig.style.left="0px";
	XConfig.style.top="0px";
	document.body.appendChild(XConfig);

//********************
// Apply Sub-Menus
var XAlly=document.createElement("ul");
	XAlly.id="XAlly";
	document.getElementById("menu-allys").appendChild(XAlly);
	document.getElementById("XAlly").innerHTML='\
	<li class="submenu-first"><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/ally.php?page=main&showwhat=myth">Mythos</a></li>\
	<li class=""><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/ally.php?page=main&showwhat=magicans">Magier</a></li>\
	<li class=""><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/ally.php?typ=ally&page=altar">Altar</a></li>\
	<li class=""><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/ally.php?typ=ally&page=pedigrees">Stammbäume</a></li>\
	<li class=""><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/diplomatie.php?typ=ally">Diplomatie</a></li>\
	<li class=""><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/ally.php?page=hero">Helden</a></li>\
	<li class=""><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/ally.php?page=mail">Gildennachricht</a></li>\
	<li class="submenu-last"><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/ally.php?page=setup">Mythos</a></li>';
var XProfil=document.createElement("ul");
	XProfil.id="XProfil";
	document.getElementById("menu-profil").appendChild(XProfil);
	document.getElementById("XProfil").innerHTML='\
	<li class="submenu-first"><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/profile/profile_meditation.php">Meditation</a></li>\
	<li class=""><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/profile/profile_abilities.php">Fähigkeiten-Baum</a></li>\
	<li class=""><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/diplomatie.php">Diplomatie</a></li>\
	<li class=""><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/profile/profile_reservation.php">Freunde / Einladen</a></li>\
	<li class=""><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/profile/profile_statistics.php">Statistiken</a></li>\
	<li class=""><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/profile/profile_edit.php">Profil bearbeiten</a></li>\
	<li class="submenu-last"><a onclick="return ajax_link(this.href);" href="http://'+XM["Host"]+'/xhodon/profile/profile_settings.php">Account-Einstellungen</a></li>';
var XBasar=document.createElement("ul");
	XBasar.id="XBasar";
	document.getElementById("menu-bazar").appendChild(XBasar);
	document.getElementById("XBasar").innerHTML='\
	<li class="submenu-first"><a href="http://'+XM["Host"]+'/xhodon/basar.php?search_detail=items&basar_input_items_action=search&addtab=items&tab=auctions&basar_show_limit=30">Items</a></li>\
	<li class=""><a href="http://'+XM["Host"]+'/xhodon/basar.php?search_detail=eggs&basar_input_dragoneggs_action=search&addtab=dragoneggs&basar_show_limit=30">Dracheneier</a></li>\
	<li class=""><a href="http://'+XM["Host"]+'/xhodon/basar.php?tab=center&basar_show_limit=30">Beobachtungsliste</a></li>\
	<li class="submenu-last"><a href="http://'+XM["Host"]+'/xhodon/basar.php?search_detail=items&basar_input_items_action=search&addtab=items&tab=create">Auktion eröffnen</a></li>';

if (GM_getValue("_Vars")) {XM=unserialize(GM_getValue("_Vars"));}
document.getElementById('xm_farm').value=XM["FarmList"];

//********************
// Function INITIALIZE
function startScript() {
	var runTime=new Date();
	XM["FarmList"]=document.getElementById('xm_farm').value;
	XM["Time"]=document.getElementById('servertimer').textContent.split(":");
	XM["Secs"]=((XM["Time"][0]*3600)+(XM["Time"][1]*60)+(XM["Time"][2]*1));
//  Get Unit Building List
	//document.getElementById('xm_unit').value=getUnits();
// Check for Elixiers
	//document.getElementById('xm_elix').value=getElixirs();
//  Check for Heroes
	getHeroes();
	chkHeroes();
//  Create overview
	XM["Output"]='<table id="xm_content_1" width="100%" align="center">';
	for (i=0; i<XM["HeroCt"]; i++) {
		var now=XM["Heroes"][i]["Time"];
		var sec=XM["Heroes"][i]["Secs"]||"folgt";
		var nam=XM["Heroes"][i]["Name"];
		var pos=XM["Heroes"][i]["Posi"];
		var KL="<font color=#76FFFF>[KL]</font>";
		var bgh='background:url(http://'+XM["Host"]+'/xhodon/gfx/side/licht/images/dropdown_kachel.png);opacity:1;">';
		var bgd='background:url(http://'+XM["Host"]+'/xhodon/gfx/side/schatten/images/dropdown_kachel.png);">';
		XM["Output"]+='<tr><td align="center" style="font:bold 9px Arial;letter-spacing:1px;padding-left:7px;padding-right:7px;';
		if (pos.substr(pos.length-2,2)!=":0") {
			XM["Output"]+=bgh+'<table width=94%>\
			<tr><td align=center colspan=2>'+(now=="Kriegslager"?KL:"")+'<font color=#000000>'+nam+'</font></td></tr>\
			<tr><td align=left nowrap><font color=#474747>Pos '+pos+'</font></td><td align=right><font color=#474776>steht</font></td></tr>\
			</table>';}
		else {
			XM["Output"]+=bgh+'<table width=94%>\
			<tr><td align=center colspan=2>'+(now=="Kriegslager"?KL:"")+'<font color=#340000>'+nam+'</font></td></tr>\
			<tr><td align=left nowrap><font color=#000076>Pos '+pos+'</font></td><td align=right><font color='+(sec=="folgt"?"#C7C7F7>folgt":(sec=="steht"?"#F7C7C7>steht":"#FFFFFF>"+sec))+'</font></td></tr>\
			</table>';}
		XM["Output"]+='</td></tr>';
	}
	XM["Output"]+='</table>';
	document.getElementById("xm_bottom_1").innerHTML='<a onmouseout="nd();" onmouseover="return overlib(\'Prüfe alle Helden in Bewegung.\');" onclick="return ajax_link(this.href)" href="http://'+XM["Host"]+'/xhodon/ajax/moving_heros.php?order_inc=3&amp;display=all&amp;page=0&amp;d=ASC">check</a>';
	document.getElementById("xm_line_1").innerHTML=XM["Output"];
	document.getElementById("xm_line_1").style.display=(XM["List"]=="none"?'none':'block');
//  Set WindowTitle
	var tmpt="";
	var counth=0;
	//tmp=document.getElementById("std_alone_build_queue_timer_0");
	//if (tmp&&tmp!="") {tmpt=((tmp.innerHTML.substring(0,5)=="<span")?"?":tmp.innerHTML);}
	//tmpt=((tmpt=="")?"":tmpt+")");
	for (i=0;i<XM["HeroCt"];i++) {
		if (XM["Heroes"][i]["Time"]!="steht"&&XM["Heroes"][i]["Time"]!="Kriegslager") {
			tmpt+=(counth>0?" - ":"")+"["+i+"] "+XM["Heroes"][i]["Secs"];counth+=1;
		}
	}
	document.title=tmpt+(counth<1?"- alles steht!":"");
//  Set values and restart
	GM_setValue("_Vars",serialize(XM));
	var endTime=new Date();
	var difTime=(endTime.getTime()-runTime.getTime());
	if (document.getElementById("XConfig")) {
		document.getElementById("XConfig").innerHTML='<a style="cursor:pointer;">X&middot;CONFIG</a> <font color=#000000>['+difTime+'ms]</font>';
	}
	if (FIRST) {
		document.getElementById("advert").style.display="none";
		XHideElement("deactivateAdvert");
		FIRST=false;
	}
	window.setTimeout(function() {startScript();},999);
}

//********************
// Check for Heroes
function getHeroes() {
	REG_search=/(#http:\/\/\S*\.xhodon\.de\/xhodon\/heros.php)/;
	REG_result=REG_search.test(window.location);
	if (REG_result) {
		var tmp="";
		var x=0;
		var Xname=document.evaluate('//ul[@class="sbInnerContainer heroSidebar"]/li/a/table/tbody/tr[1]/td/strong/text()',document,null,XPathResult.ANY_TYPE,null);
		while (tmp=Xname.iterateNext()) {
			if (!XM["Heroes"][x]) {XM["Heroes"][x]=new Array();}
			XM["Heroes"][x]["Name"]=tmp.textContent;
			x++;
		}
		XM["HeroCt"]=x;
		x=0;
		var Xposi=document.evaluate('//ul[@class="sbInnerContainer heroSidebar"]/li/a/table/tbody/tr[2]/td/text()',document,null,XPathResult.ANY_TYPE,null);
		while (tmp=Xposi.iterateNext()) {
			XM["Heroes"][x]["Posi"]=tmp.textContent;
			if (XM["Heroes"][x]["Posi"].substr(0,9)=="Position ") XM["Heroes"][x]["Posi"]=XM["Heroes"][x]["Posi"].substr(9);
			x++;
		}
		x=0;
		var Xtime=document.evaluate('//ul[@class="sbInnerContainer heroSidebar"]/li/a/table/tbody/tr[3]/td[1]/text()',document,null,XPathResult.ANY_TYPE,null);
		while (tmp=Xtime.iterateNext()) {
			var s=tmp.textContent;//10.11.2010 00:00:00 							
			var rs="";
			for (i=0;i<=s.length;i++) {
				var c=s.charAt(i);
				if (XAllowedChars.indexOf(c)!=-1) rs+=c;
			}
			if (rs!="") {
				if (rs=="nichtunterwegs") {XM["Heroes"][x]["Time"]="steht";XM["Heroes"][x]["Secs"]=false;}
				else if (rs=="imKriegslager") {XM["Heroes"][x]["Time"]="Kriegslager";XM["Heroes"][x]["Secs"]=false;}
				else if (rs.substr(2,1)==".") {
					XM["Heroes"][x]["Date"]=rs.substr(0,9);
					XM["Heroes"][x]["Time"]=rs.substr(10,8);
				}
				else {
					XM["Heroes"][x]["Time"]=rs;
					XM["Heroes"][x]["Date"]=false;
				}
				x++;
			}
		}
	return (true);
	}
	return (false);
}
function chkHeroes() {
	for (var _hero in XM["Heroes"]) {
		var _time=XM["Heroes"][_hero]["Time"];
		if (_time) if (_time!="steht" && _time!="Kriegslager") {
			_time=_time.split(":");
			_time=((_time[0]*3600)+(_time[1]*60)+(_time[2]*1)+((XM["Heroes"][_hero]["Date"])?86400:0));
			XM["Heroes"][_hero]["Secs"]=calcTime(XM["Secs"],_time);
			if (XM["Heroes"][_hero]["Secs"]=="steht") XM["Heroes"][_hero]["Time"]="steht";
		}
	}
}
function calcTime(now,fin) {
	var _Dif=fin-now;
	if (_Dif<=0) {return ("steht");}
	var _H=Math.floor(_Dif/3600); _Dif=(_Dif-(_H*3600)); _H=(_H<10?"0"+_H:_H);
	var _M=Math.floor(_Dif/60); _Dif=(_Dif-(_M*60)); _M=(_M<10?"0"+_M:_M);
	var _S=Math.floor(_Dif%60); _Dif=(_Dif-(_S*1)); _S=(_S<10?"0"+_S:_S);
	return ((_H==0?"":_H+":")+(_M==0?(_H>0?_M+":":"> "):_M+":")+(_S==0?((_H>0||_M>0)?_S:""):_S));
}

//********************
// Check for UnitBuilds
function getUnits() {
	REG_search=/(#http:\/\/\S*\.xhodon\.de\/xhodon\/building.php\?numeric\[building_id\]\=6)/;
	REG_result=REG_search.test(window.location);
	if (REG_result) {
		var XUnits=document.evaluate('//div[@id="current_unit_prduction"]/table/tbody/tr/td[6]/text()',document,null,XPathResult.ANY_TYPE,null);
		var tmp=XUnits.iterateNext();
		if (!XM["UnitTime"]) XM["UnitTime"]="nothing";
		XM["UnitTime"]=(tmp?tmp.textContent:XM["UnitTime"]);
		}
	return(XM["UnitTime"]);
}

//********************
// Check for Elixiers
function getElixirs() {
	XM["ElixTime"]=(XM["ElixTime"]?XM["ElixTime"]="nothing":"nothing");
	REG_search=/(#http:\/\/\S*\.xhodon\.de\/xhodon\/elixir.php\?tab\=2)/;
	REG_result=REG_search.test(window.location);
	if (REG_result) {
		var Xelix=document.evaluate('/html/body/div[3]/div/div[2]/div[4]/div[4]/div/div[3]/table/tbody/tr[2]/td[5]/text()',document,null,XPathResult.ANY_TYPE,null);
		var tmp=Xelix.iterateNext();
		XM["ElixTime"]=(tmp!=""?tmp.textContent:XM["ElixTime"]);
	}
	return (XM["ElixTime"]);
}

//********************
// Control MouseEvents
function mmv(e) {
	if (!e) {e=window.event;}
	if (drag) {
		d.style.top=dy+e.clientY-y+"px";
		d.style.left=dx+e.clientX-x+"px";
	}
	return false;
}
function mdn(e) {
	if (!e) {e=window.event;}
	var obj=document.getElementById("XMenu");
	if (obj) {
		drag=true;
		d=obj;
		dy=parseInt(obj.style.top+0);
		dx=parseInt(obj.style.left+0);
		y=e.clientY;
		x=e.clientX;
		document.addEventListener('mousemove',mmv,false);
		return false;
	}
}
function mup() {
	drag=false;
	document.removeEventListener('mousemove',mmv,false);
	if (d) {
		if (parseInt(d.style.top)<0) {d.style.top="0px";}
		if (parseInt(d.style.left)<0) {d.style.left="0px";}
		GM_setValue("_TB",d.style.top);
		GM_setValue("_LR",d.style.left);
	}
}

//********************
// Hide Elements by Class
function XHideElement(name) {
	var a=document.getElementsByTagName('*');
	for (i=0;i<a.length;i++) {
		var t=a[i];
		if (t.className && t.className==name) {t.style.display='none';}
	}
}

//********************
// Save/Load DataStack
function serialize(mixed_value) {
	var _getType=function (inp) {
		var type=typeof inp,match;
		var key;
		if (type=='object' && !inp) return 'null';
		if (type=="object") {
			if (!inp.constructor) return 'object';
			var cons=inp.constructor.toString();
			if (match=cons.match(/(\w+)\(/)) cons=match[1].toLowerCase();
			var types=["boolean","number","string","array"];
			for (key in types) {if (cons==types[key]) {type=types[key]; break;}}
		}
		return type;
	};
	var type=_getType(mixed_value);
	var val,ktype='';
	switch (type) {
	case "function": val=""; break;
	case "undefined": val="N"; break;
	case "boolean": val="b:"+(mixed_value?"1":"0"); break;
	case "number": val=(Math.round(mixed_value)==mixed_value?"i":"d")+":"+mixed_value; break;
	case "string": val="s:"+mixed_value.length+":\""+mixed_value+"\""; break;
	case "array":
	case "object":
		val="a";
		var count=0;
		var vals="";
		var okey;
		var key;
		for (key in mixed_value) {
			ktype=_getType(mixed_value[key]);
			if (ktype=="function") continue;
			okey=(key.toString().match(/^[0-9]+$/) ? parseInt(key) : key);
			vals+=serialize(okey)+serialize(mixed_value[key]);
			count++;
		}
		val+=":"+count+":{"+vals+"}"; break;
	}
	if (type!="object"&&type!="array") val+=";";
	return val;
}
function unserialize(data) {
	var error=function(type,msg,filename,line) {throw new window[type](msg,filename,line);};
	var read_until=function (data,offset,stopchr) {
		var buf=[];
		var chr=data.slice(offset,offset+1);
		var i=2;
		var datalength=data.length;
		while(chr!=stopchr) {
			if ((i+offset)>datalength) error('Error','Invalid');
			buf.push(chr);
			chr=data.slice(offset+(i-1),offset+i);
			i+=1;
		}
		return [buf.length,buf.join('')];
	};
	var read_chrs=function(data,offset,length) {
		buf=[];
		for (var i=0; i<length; i++) {
			var chr=data.slice(offset+(i-1),offset+i);
			buf.push(chr);
		}
		return [buf.length,buf.join('')];
	};
	var _unserialize=function(data,offset) {
		if (!offset) offset=0;
		var buf=[];
		var dtype=(data.slice(offset,offset+1)).toLowerCase();
		var dataoffset=offset+2;
		var typeconvert=new Function('x','return x');
		var chrs=0;
		var datalength=0;

		switch (dtype) {
		case "i":
			typeconvert=new Function('x','return parseInt(x)');
			var readData=read_until(data,dataoffset,';');
			var chrs=readData[0];
			var readdata=readData[1];
			dataoffset+=chrs+1;
			break;
		case "b":
			typeconvert=new Function('x','return (parseInt(x)==1)');
			var readData=read_until(data,dataoffset,';');
			var chrs=readData[0];
			var readdata=readData[1];
			dataoffset+=chrs+1;
			break;
		case "d":
			typeconvert=new Function('x','return parseFloat(x)');
			var readData=read_until(data,dataoffset,';');
			var chrs=readData[0];
			var readdata=readData[1];
			dataoffset+=chrs+1;
			break;
		case "n":
			readdata=null;
			break;
		case "s":
			var ccount=read_until(data,dataoffset,':');
			var chrs=ccount[0];
			var stringlength=ccount[1];
			dataoffset+=chrs+2;
			var readData=read_chrs(data,dataoffset+1,parseInt(stringlength));
			var chrs=readData[0];
			var readdata=readData[1];
			dataoffset+=chrs+2;
			if (chrs!=parseInt(stringlength) && chrs!=readdata.length) {error('SyntaxError','String length mismatch');}
			break;
		case "a":
			var readdata={};
			var keyandchrs=read_until(data,dataoffset,':');
			var chrs=keyandchrs[0];
			var keys=keyandchrs[1];
			dataoffset+=chrs+2;
			for (var i=0; i<parseInt(keys); i++) {
				var kprops=_unserialize(data,dataoffset);
				var kchrs=kprops[1];
				var key=kprops[2];
				dataoffset+=kchrs;
				var vprops=_unserialize(data,dataoffset);
				var vchrs=vprops[1];
				var value=vprops[2];
				dataoffset+=vchrs;
				readdata[key]=value;
			}
			dataoffset+=1;
			break;
		default:
			error('SyntaxError','Unknown / Unhandled data type(s): '+dtype);
			break;
		}
		return [dtype,dataoffset-offset,typeconvert(readdata)];
	};
	return _unserialize(data,0)[2];
}

//********************
// Script get Version
function XGetVer(v) {
	if (v!=XVersion) ScriptUpdater.forceNotice(59237,XVersion);
}

//********************
// Script initializing
document.getElementById("xm_mover_1").addEventListener('mousedown',mdn,false);
document.getElementById("xm_mover_1").addEventListener('mouseup',mup,false);
window.addEventListener("load", function(e) {startScript();},false);
ScriptUpdater.forceCheck(59237,XVersion,XGetVer);