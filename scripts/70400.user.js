// ==UserScript==
// @name           X-Menue add By N_8_11
// @namespace WEBSITE
// @description    Modification of Xhodon
// @include        http://*.xhodon.de/*
// @exclude        http://forum.xhodon.de/*
// @version        0.08
// @changes        Changed Zwergwelt to Zentaurenwelt
// @changes        Changed Font-Size to 9px for Heroes Info
// @changes        Added Update-Check (not functional yet)
// @changes        Added hiding for world-divs
// @changes        Changes to graphics
// @license        cc-by-sa
// ==/UserScript==

document.getElementById("advert").style.width="1px";
document.getElementById("advert").style.height="1px";
document.getElementById("advert").style.visibility="hidden";

var XConfig=document.createElement("div");
	XConfig.id="XConfig";
//	alert (document.getElementById("naviTop").childNodes.length);
	document.getElementById("naviTop").insertBefore(XConfig,document.getElementById("naviTop").lastChild);
	document.getElementById("XConfig").innerHtml='<a target="_blank" href="http://wikide.xhodon.de">X&middot;Config</a>';

var XMenu=document.createElement("div");
	XMenu.id="XMenu";
	document.body.appendChild(XMenu);
	document.getElementById("XMenu").style.position="fixed";
	document.getElementById("XMenu").style.display="block";
	document.getElementById("XMenu").style.zIndex="999";
	document.getElementById("XMenu").style.left="0px";
	if (GM_getValue("pos")) {document.getElementById("XMenu").style.top=GM_getValue("pos");} else {document.getElementById("XMenu").style.top="0px";}
	document.getElementById("XMenu").style.width="150px";
	document.getElementById("XMenu").style.height="500px";
	document.getElementById("XMenu").style.color="#FFF";
	document.getElementById("XMenu").style.margin="0px";
	document.getElementById("XMenu").style.marginTop="70px";
	document.getElementById("XMenu").innerHTML='<table width="100%" align="center" border="0">'+
	'<tr><td align="center">'+
		'<table width="100%" align="center" border="0" style="cursor:move;" id="XMover">'+
		'<tr><td style="text-align:center;padding-top:9px;font-weight:bold;color:grey;height:21px;background:url(http://xhodon.de/xhodon/gfx/side/schatten/images/dropdown_top.png);" onmouseout="nd();" onmouseover="return overlib(\'Maus gedrückt halten, um das Menü vertikal zu verschieben.\');">X &middot; M&middot;E&middot;N&middot;U</td></tr>'+
		'<tr><td align="center" style="height:15px;background:url(http://xhodon.de/xhodon/gfx/side/schatten/images/dropdown_bottom.png) 0px -10px;"></td></tr>'+
		'</table>'+
	'</td></tr>'+
	'<tr><td align="center">'+
		'<table width="100%" align="center" border="0">'+
		'<tr><td align="center" style="height:27px;background:url(http://xhodon.de/xhodon/gfx/side/licht/images/dropdown_top.png);">'+
			'<table width="100%" border="0"><tr>'+
			'<td style="width:27px;">&nbsp;</td>'+
			'<td align="center"><a href="http://troll.xhodon.de/xhodon/heros.php#http://troll.xhodon.de/xhodon/heros.php" onmouseout="nd();" onmouseover="return overlib(\'Hier klicken um zur Trollwelt zu wechseln.\');">Troll</a></td>'+
			'<td align="left" style="width:27px;vertical-align:bottom;"><div id="xm_hider_1" style="position:relative;top:6px;"><img src="http://xhodon.de/xhodon/gfx/icons/down.png" border="0" onmouseout="nd();" onmouseover="return overlib(\'Anzeige ein-/ausblenden.\');"></div></td>'+
			'</tr></table>'+
		'</td></tr>'+
		'<tr><td align="center" id="xm_line_1" style="background:url(http://xhodon.de/xhodon/gfx/side/licht/images/dropdown_kachel.png);visibility:visible;">.. init ..</td></tr>'+
		'<tr><td align="center" id="xm_bottom_1" style="height:25px;background:url(http://xhodon.de/xhodon/gfx/side/licht/images/dropdown_bottom.png);"></td></tr>'+
		'</table>'+
	'</td></tr>'+
	'<tr><td align="center">'+
		'<table width="100%" align="center" border="0">'+
		'<tr><td align="center" style="height:27px;background:url(http://xhodon.de/xhodon/gfx/side/licht/images/dropdown_top.png);">'+
			'<table width="100%" border="0"><tr>'+
			'<td style="width:27px;">&nbsp;</td>'+
			'<td align="center"><a href="http://zentauren.xhodon.de/xhodon/heros.php#http://zentauren.xhodon.de/xhodon/heros.php" onmouseout="nd();" onmouseover="return overlib(\'Hier klicken um zur Zentaurenwelt zu wechseln.\');">Zentaur</a></td>'+
			'<td align="left" style="width:27px;vertical-align:bottom;"><div id="xm_hider_2" style="position:relative;top:6px;"><img src="http://xhodon.de/xhodon/gfx/icons/down.png" border="0" onmouseout="nd();" onmouseover="return overlib(\'Anzeige ein-/ausblenden.\');"></div></td>'+
			'</tr></table>'+
		'</td></tr>'+
		'<tr><td align="center" id="xm_line_2" style="background:url(http://xhodon.de/xhodon/gfx/side/licht/images/dropdown_kachel.png);">.. init ..</td></tr>'+
		'<tr><td align="center" id="xm_bottom_2" style="height:25px;background:url(http://xhodon.de/xhodon/gfx/side/licht/images/dropdown_bottom.png);"></td></tr>'+
		'</table>'+
	'</td></tr>'+
	'<tr><td align="center">'+
		'<table width="100%" align="center" border="0">'+
		'<tr><td align="center" style="height:27px;background:url(http://xhodon.de/xhodon/gfx/side/licht/images/dropdown_top.png);">'+
			'<table width="100%" border="0"><tr>'+
			'<td style="width:27px;">&nbsp;</td>'+
			'<td align="center"><a href="http://elf.xhodon.de/xhodon/heros.php#http://elf.xhodon.de/xhodon/heros.php" onmouseout="nd();" onmouseover="return overlib(\'Hier klicken um zur Elfwelt zu wechseln.\');">Elf</a></td>'+
			'<td align="left" style="width:27px;vertical-align:bottom;"><div id="xm_hider_3" style="position:relative;top:6px;"><img src="http://xhodon.de/xhodon/gfx/icons/down.png" border="0" onmouseout="nd();" onmouseover="return overlib(\'Anzeige ein-/ausblenden.\');"></div></td>'+
			'</tr></table>'+
		'</td></tr>'+
		'<tr><td align="center" id="xm_line_3" style="background:url(http://xhodon.de/xhodon/gfx/side/licht/images/dropdown_kachel.png);">.. init ..</td></tr>'+
		'<tr><td align="center" id="xm_bottom_3" style="height:25px;background:url(http://xhodon.de/xhodon/gfx/side/licht/images/dropdown_bottom.png);"></td></tr>'+
		'</table><br/>'+
	'</td></tr></table>';

var server,count,tmp,result,x,y,d,dx,dy;
var drag=false;
var Update={};
var XHR={};
var XVar=new Array();

function startScript() {
	XVar["Server"]=new Array("Troll","Zentauren","Elf");
	XVar["Allowd"]='1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:.';
	XVar["Values"]=new Array(3); for (var i=0; i<XVar["Values"].length; ++i) {XVar["Values"][i]=new Array();}
	XVar["Output"]=new Array(3); for (var i=0; i<XVar["Output"].length; i++) {XVar["Output"][i]="";}
	XVar["Count"]=new Array(3); for (var i=0; i<XVar["Count"].length; ++i) {XVar["Count"][i]=new Array();}
	if (GM_getValue("xvars")) {XVar=unserialize(GM_getValue('xvars'));}
	XVar["Time"]=document.getElementById('servertimer').textContent.split(":");
	XVar["Secs"]=((XVar["Time"][0]*3600)+(XVar["Time"][1]*60)+(XVar["Time"][2]*1));
	XVar["Host"]=window.location.host;
		switch (XVar["Host"]) {
			case "troll.xhodon.de": server=0; break;
			case "zentauren.xhodon.de": server=1; break;
			case   "elf.xhodon.de": server=2; break;
			default:                server=0; break;
		}
	if (result=chkUrl()) {getHeroes();}
	for (_server=0; _server<=2; _server++) {
		for (_count in XVar["Values"][_server]) {
			if (XVar["Values"][_server][_count]["Time"]=="00:00:00") {XVar["Values"][_server][_count]["Time"]="steht";}
			_time=XVar["Values"][_server][_count]["Time"];
			if (_time!="steht") {
				_time=_time.split(":");
				_time=((_time[0]*3600)+(_time[1]*60)+(_time[2]*1));
				XVar["Values"][_server][_count]["Secs"]=calcTime(XVar["Secs"],_time);
			}
		}
		XVar["Output"][_server]='<table id="xm_content_1" width="100%" align="center">';
		for (i=0; i<XVar["Count"][_server]; i++) {
			XVar["Output"][_server]+='<tr onmouseout="nd();" onmouseover="return overlib(\''+XVar["Values"][_server][i]["Posi"]+'\');">'+
			'<td align="center" style="font-family:verdana,sans-serif;font-size:9px;letter-spacing:0.3em;';
			if (XVar["Values"][_server][i]["Time"]=="steht") {XVar["Output"][_server]+='background:url(http://xhodon.de/xhodon/gfx/side/licht/images/dropdown_kachel.png);';}
			else {XVar["Output"][_server]+='background:url(http://xhodon.de/xhodon/gfx/side/schatten/images/dropdown_kachel.png);';}
			XVar["Output"][_server]+='">'+XVar["Values"][_server][i]["Name"]+'<br/>';
			if (XVar["Values"][_server][i]["Time"]=="steht") {XVar["Output"][_server]+="steht";}
			else {XVar["Output"][_server]+=XVar["Values"][_server][i]["Secs"];}
			XVar["Output"][_server]+='</td></tr>';
		}
		XVar["Output"][_server]+='</table>';
		document.getElementById("xm_bottom_"+(server+1)).innerHTML='<a onmouseout="nd();" onmouseover="return overlib(\'Prüfe alle Helden in Bewegung.\');" href="http://'+XVar["Host"]+'/xhodon/main.php?display=all#http://'+XVar["Host"]+'/xhodon/ajax/moving_heros.php?order_inc=3&display=all&page=0&d=ASC">check</a>';
	}
	document.getElementById("xm_hider_1").addEventListener("click",xhide,false);
	document.getElementById("xm_hider_2").addEventListener("click",xhide,false);
	document.getElementById("xm_hider_3").addEventListener("click",xhide,false);
	GM_setValue('xvars',serialize(XVar));
	document.getElementById("xm_line_1").innerHTML=XVar["Output"][0];
	document.getElementById("xm_line_2").innerHTML=XVar["Output"][1];
	document.getElementById("xm_line_3").innerHTML=XVar["Output"][2];
	window.setTimeout(function() {startScript();},999);
}

function xhide(w) {
	if(!w) w=window.event;
	div=w.currentTarget.id;
	switch (div) {
		case "xm_hider_1": div=1; break;
		case "xm_hider_2": div=2; break;
		case "xm_hider_3": div=3; break;
	}
	divstil=document.getElementById("xm_line_"+div).style.visibility;
	document.getElementById("xm_line_"+div).style.visibility=(divstil=="visible"?'collapse':'visible');
	GM_setValue('divstil'+div,(divstil=="visible"?'collapse':'visible'));
}

function mmv(e) {
	if (!e) {e=window.event;}
	if (drag) {d.style.top=dy+e.clientY-y+"px";}
	return false;
}

function mdn(e) {
	if (!e) {e=window.event;}
	var obj=document.getElementById("XMenu");
	if (obj) {
		drag=true;
		d=obj;
		dy=parseInt(obj.style.top+0);
		y=e.clientY;
		document.addEventListener('mousemove',mmv,false);
		return false;
	}
}

function mup() {
	drag=false;
	document.removeEventListener('mousemove',mmv,false);
	if (d) {
		if (parseInt(d.style.top)<0) {d.style.top="0px";}
		GM_setValue("pos",d.style.top);
	}
}

function chkUrl() {
	REG_search=/(#http:\/\/\S*\.xhodon\.de\/xhodon\/heros.php)/;
	REG_result=REG_search.test(window.location);
	return (REG_result);
}

function getHeroes() {
	count=0;
	var Xname=document.evaluate('//ul[@class="sbInnerContainer heroSidebar"]/li/a/table/tbody/tr[1]/td/strong/text()',document,null,XPathResult.ANY_TYPE,null);
	while (tmp=Xname.iterateNext()) {
		if (!XVar["Values"][server][count]) {XVar["Values"][server][count]=new Array();}
		XVar["Values"][server][count]["Name"]=tmp.textContent;
		count++;
	}
	XVar["Count"][server]=count;
	count=0;
	var Xposi=document.evaluate('//ul[@class="sbInnerContainer heroSidebar"]/li/a/table/tbody/tr[2]/td/text()',document,null,XPathResult.ANY_TYPE,null);
	while (tmp=Xposi.iterateNext()) {
		XVar["Values"][server][count]["Posi"]=tmp.textContent;
		count++;
	}
	count=0;
	var Xtime=document.evaluate('//ul[@class="sbInnerContainer heroSidebar"]/li/a/table/tbody/tr[3]/td[1]/text()',document,null,XPathResult.ANY_TYPE,null);
	while (tmp=Xtime.iterateNext()) {
		var s=tmp.textContent;
		var rs="";
		for (i=0; i<=s.length; i++) {var c=s.charAt(i); if (XVar["Allowd"].indexOf(c)!=-1) {rs+=c;}}
		if (rs!="") {
			if (rs=="nichtunterwegs") {XVar["Values"][server][count]["Time"]="steht";}
			else if (rs.substr(2,1)==".") {
				XVar["Values"][server][count]["Date"]=rs.substr(0,9);
				XVar["Values"][server][count]["Time"]=rs.substr(10,8);
			}
			else {XVar["Values"][server][count]["Time"]=rs;}
			count++;
		}
	}
	return;
}

function calcTime(now,fin) {
	var _Dif=fin-now;
	if (_Dif<=0) {_Dif+=86400;}
	var _H=Math.floor(_Dif/3600); _Dif=(_Dif-(_H*3600));
	var _M=Math.floor(_Dif/60); _Dif=(_Dif-(_M*60));
	var _S=Math.floor(_Dif%60); _Dif=(_Dif-(_S*1));
	if (_H<10) _H="0"+_H;
	if (_M<10) _M="0"+_M;
	if (_S<10) _S="0"+_S;
	return (_H+":"+_M+":"+_S);
}

function serialize(mixed_value) {
	var _getType=function(inp) {
		var type=typeof inp,match;
		var key;
		if (type=='object' && !inp) {return 'null';}
		if (type=="object") {
			if (!inp.constructor) {return 'object';}
			var cons=inp.constructor.toString();
			if (match=cons.match(/(\w+)\(/)) {cons=match[1].toLowerCase();}
			var types=["boolean","number","string","array"];
			for (key in types) {
				if (cons==types[key]) {
					type=types[key];
					break;
				}
			}
		}
		return type;
	};
	var type=_getType(mixed_value);
	var val,ktype='';
	switch (type) {
	case "function": 
		val=""; 
		break;
	case "undefined":
		val="N";
		break;
	case "boolean":
		val="b:"+(mixed_value ? "1" : "0");
		break;
	case "number":
		val=(Math.round(mixed_value)==mixed_value ? "i" : "d") + ":"+mixed_value;
		break;
	case "string":
		val="s:"+mixed_value.length+":\""+mixed_value+"\"";
		break;
	case "array":
	case "object":
		val="a";
		var count=0;
		var vals="";
		var okey;
		var key;
		for (key in mixed_value) {
			ktype=_getType(mixed_value[key]);
			if (ktype=="function") {continue;}
			okey=(key.toString().match(/^[0-9]+$/) ? parseInt(key) : key);
			vals+=serialize(okey)+serialize(mixed_value[key]);
			count++;
		}
		val+=":"+count+":{"+vals+"}";
		break;
	}
	if (type!="object" && type!="array") val+=";";
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
			if ((i+offset)>datalength) {error('Error','Invalid');}
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

Update.id=59237;
Update.curVersion=0.03;
Update.callback=function() {
	alert ("test");
}

Update.check=function() {
	if (!Update.id) {return;}
	if (!Update.curVersion) {return;}
	if (Update.keys && Update.keys['version']) {Update.callback();}
	var url='http://userscripts.org/scripts/source/'+Update.id+'.meta.js';
	XHR.get(url,Update.onXHR);
}

Update.onXHR=function(response) {
	var splat=response.responseText.split(/[\r\n]/),
	keys={};
	for (var i in splat) {
		if (!splat[i]) continue;
		var matches=splat[i].match(/@([\w:]+)\s+(.+)/);
		if (!matches) continue;
		keys[matches[1]]=matches[2];
	}
	Update.keys=keys;
	Update.url='http://userscripts.org/scripts/source/'+Update.id +'.user.js';
	if (keys['version'] && (keys['version']!=Update.curVersion)) {Update.callback();}
};

XHR.createQueryString=function(obj) {
	var ret=[];
	for (var i in obj) {ret.push([i,encodeURIComponent(obj[i])].join('='));}
	return ret.join('&');
}

XHR.createDoc=function(r,callback) {
	var doc=document.implementation.createDocument('','',null);
	var html=document.createElement('html');
	html.innerHTML=r.responseText;
	doc.appendChild(html);
	r.doc=doc;
	callback(r);
}

XHR.post=function(url,callback,data) {
	GM_xmlhttpRequest({
		method:'POST',url:url,
		headers:{'User-Agent':navigator.userAgent,'Content-Type':'application/x-www-form-urlencoded','Content-Length':XHR.createQueryString(data).length,},
		data:XHR.createQueryString(data),
		onload:function(r) {XHR.createDoc(r,callback)}
	});
}

XHR.get=function(url,callback) {
	GM_xmlhttpRequest({
		method:'GET',url:url,
		headers:{'User-Agent': navigator.userAgent,'Content-Type': 'application/x-www-form-urlencoded',},
		onload:function(r) {XHR.createDoc(r,callback)}
	});
}

document.getElementById("XMover").addEventListener('mousedown',mdn,false);
document.getElementById("XMover").addEventListener('mouseup',mup,false); 
//window.addEventListener("load", function(e) {startScript(); Update.check();},false);
window.addEventListener("load", function(e) {startScript();},false);
