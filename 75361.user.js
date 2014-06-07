// ==UserScript==
// @name           LinkSize
// @namespace      ariyanster[at]gmail.com
// @description    Shows Size of target file of a link
// @include        *
// @version        0.1.2
// ==/UserScript==

var CONFIG; 	// MAIN CONFIGURATION
var DONE=false; // Once run per page flag
var CurrentVersion="0.1.2";
var CONFIG_ELEMENTS={'gray':null,'conf':null};

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
function toTwoLetter (number) {
		return ("" + (number + 100)).substring(1,3);
}

String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}

linksize={
	JSON :{
	  encode : function(input) {
	    if (!input) return null
	    switch (input.constructor) {
	      case String: return '"' + input + '"'
	      case Number: return input.toString()
	      case Array :
		var buf = []
		for (i in input)
		  buf.push(linksize.JSON.encode(input[i]))
		    return '[' + buf.join(', ') + ']'
	      case Object:
		var buf = []
		for (k in input)
		    buf.push('"'+k+'"' + ' : ' + linksize.JSON.encode(input[k]))
		    return '{ ' + buf.join(', ') + '} '
	      default:
		return 'null'
	    }
	  },
	  decode : function(input){
		if (!input) return 'null';
		return eval("(" + input + ")");
	  }
	},
	in_array : function (needle, haystack, argStrict) {
	    var key = '', strict = !!argStrict;

	    if (strict) {
		for (key in haystack) {
		    if (haystack[key] === needle) {
		        return true;
		    }
		}
	    } else {
		for (key in haystack) {
		    if (haystack[key] == needle) {
		        return true;
		    }
		}
	    }

	    return false;
	},
	firstTimeConfigure : function (){
		var ftc = {
			'extlist': new Array("rar","jpg","png","gif","zip","tar.gz"),
			'exclude_domains': new Array("rapidshare.com","www.rapidshare.com")
		}
		linksize.saveConfig(ftc);
		return ftc;
	},
	preload : function (){
		CONFIG = linksize.loadConfig();
		if(CONFIG=='null')
			CONFIG=linksize.firstTimeConfigure();
	},
	loadConfig : function (){
		return linksize.JSON.decode(GM_getValue("linksize_config"));
	},
	saveConfig : function (VALUES){
		if(VALUES){
			GM_setValue("linksize_config",linksize.JSON.encode(VALUES));
		}else{
			GM_setValue("linksize_config",linksize.JSON.encode(CONFIG));
		}
	},
	getext: function(link){
		pp=link.lastIndexOf(".");
		if(pp>-1)
			return link.substr(pp+1).toLowerCase();
		else
			return null;
	},
	Byte2KMG: function(bytes){
		return (bytes >= (1024 * 1024 * 1024 * 1024)) ? (Math.round((bytes / (1024 * 1024 * 1024 * 1024))*100)/100)+" TB" : ((bytes >= (1024 * 1024 * 1024)) ? (Math.round((bytes / (1024 * 1024 * 1024))*100)/100) +" GB" : ((bytes >= (1024 * 1024)) ? (Math.round((bytes / (1024 * 1024))*100 )/100) +" MB" : (Math.round((bytes / 1024)*100)/100)+" KB"));
	},
	showConfig:function(){
		CONFIG_ELEMENTS.gray = document.createElement("div");
		CONFIG_ELEMENTS.gray.id = "linksize_graypane";
		CONFIG_ELEMENTS.gray.style.position='fixed';
		CONFIG_ELEMENTS.gray.style.backgroundColor='#555555';
		CONFIG_ELEMENTS.gray.style.left='0px';
		CONFIG_ELEMENTS.gray.style.top='0px';
		CONFIG_ELEMENTS.gray.style.width='100%';
		CONFIG_ELEMENTS.gray.style.height='100%';
		CONFIG_ELEMENTS.gray.style.opacity= '0.7';
		CONFIG_ELEMENTS.gray.style.zIndex="1000";
		document.body.appendChild(CONFIG_ELEMENTS.gray);
		CONFIG_ELEMENTS.gray.style.visibility='visible';
		
		CONFIG_ELEMENTS.conf = document.createElement("div");
		CONFIG_ELEMENTS.conf.id = "linksize_confpane";
		CONFIG_ELEMENTS.conf.style.position='fixed';
		CONFIG_ELEMENTS.conf.style.backgroundColor='#FFFFFF';
		CONFIG_ELEMENTS.conf.style.width='500px';
		CONFIG_ELEMENTS.conf.style.height='400px';
		CONFIG_ELEMENTS.conf.style.left='30%';
		CONFIG_ELEMENTS.conf.style.top='15%';
		CONFIG_ELEMENTS.conf.style.MozBorderRadiusBottomleft='10px';
		CONFIG_ELEMENTS.conf.style.MozBorderRadiusBottomright='10px';
		CONFIG_ELEMENTS.conf.style.MozBorderRadiusTopleft='10px';
		CONFIG_ELEMENTS.conf.style.MozBorderRadiusTopright='10px';
		CONFIG_ELEMENTS.conf.style.zIndex="1100";
		CONFIG_ELEMENTS.conf.innerHTML="<a href='#' id='linksizeCloseI'><img border='0' src='data:image/png;base64,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%3D%3D' style='position:absolute;right:-14px;top:-15px;'/></a>" +
				"<div style='margin:15px;border:#FFFFFF 3px solid;'>" +
				"<b>Included Extensions:</b><br/><small style='color:#BBBBBB'>Comma Separated list</small></b><br/><textarea cols='60' rows='3' style='height:60px;width:450px;border:1px solid #BBBBBB;' id='linksize_inc_ext'>"+CONFIG.extlist+"</textarea><br/>" +
				"<hr/>" +
				"<b>Excluded Domains:</b><br/><small style='color:#BBBBBB'>Comma Separated list</small><br/><textarea cols='60' rows='3' style='height:60px;width:450px;border:1px solid #BBBBBB;' id='linksize_exc_domains'>"+CONFIG.exclude_domains+"</textarea><br/>" +
				"<br/><input type='button' id='linksizeSave' value='Save'/> <input type='button' id='linksizeClose' value='Cancel'/>" +
				"</div>";			
		
		document.body.appendChild(CONFIG_ELEMENTS.conf);
		document.getElementById('linksizeSave').addEventListener("click", linksize.closeConfig, false);
		document.getElementById('linksizeClose').addEventListener("click", linksize.closeConfig, false);
		document.getElementById('linksizeCloseI').addEventListener("click", linksize.closeConfig, false);
		CONFIG_ELEMENTS.conf.style.visibility='visible';
	},
	closeConfig:function(e){
		if(e.target.id=="linksizeSave"){
			CONFIG.extlist=document.getElementById('linksize_inc_ext').value.split(",");
			CONFIG.exclude_domains=document.getElementById('linksize_exc_domains').value.split(",");
			linksize.saveConfig(CONFIG);
		}
		CONFIG_ELEMENTS.gray.parentNode.removeChild(CONFIG_ELEMENTS.gray);
		CONFIG_ELEMENTS.conf.parentNode.removeChild(CONFIG_ELEMENTS.conf);		
	},
	updateCheck: function(){
		var d = new Date();
		var ss = ("" + d.getFullYear()) + toTwoLetter(d.getMonth() + 1) + toTwoLetter(d.getDate());
		var ys = parseFloat(ss);

		var upd = GM_getValue("lastUpdateCheck", 0);
		if(ys > upd){
		  GM_setValue("lastUpdateCheck", ys);	
		  GM_xmlhttpRequest({
			method: "GET",
			url: 'http://userscripts.org/scripts/review/75361',
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data:'',
			onload:function(result) {
				var res = result.responseText;
				var re = /@version[ ]+([0-9.]+)/gm;
				var ar = re.exec(res);			
				gotVersion = ar[1] + "";
				if (gotVersion > CurrentVersion){
					versionPanel = document.createElement("div");
					versionPanel.id = "linksize_version";
					versionPanel.style.position='fixed';
					versionPanel.style.backgroundColor='#1057AE';
					versionPanel.style.color='#FFFFFF';	
					versionPanel.style.width='97%';
					versionPanel.style.left='1.5%';
					versionPanel.style.top='3px';
					versionPanel.style.padding='4px';
					versionPanel.style.MozBorderRadiusBottomleft='10px';
					versionPanel.style.MozBorderRadiusBottomright='10px';
					versionPanel.style.MozBorderRadiusTopleft='10px';
					versionPanel.style.MozBorderRadiusTopright='10px';
					versionPanel.style.zIndex="1500";
					versionPanel.innerHTML= "<span style='float:left;'>A new version of LinkSize ("+gotVersion+") is available! "+
								"<a style='color: #FFFFFF;font-weight:bold;' href=\"http://userscripts.org/scripts/show/75361\" target=\"_blank\">Download</a></span>"+
								"<span style='float:right;'><small><a href='#' style='color: #FFFFFF;' onclick='javascript:var linksize_vp=document.getElementById(\"linksize_version\");linksize_vp.parentNode.removeChild(linksize_vp);'>Cancel</a></small></span>";

					document.body.appendChild(versionPanel);
					versionPanel.style.visibility='visible';					
				}
			}
		  });
		}
	}
}

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;
	while (i--) uri[o.key[i]] = m[i] || "";
	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});
	return uri;
};

function locate(event){
	var posx, posy;
	var d = find_window();
	posx = event.clientX + window.pageXOffset;
	posy = event.clientY + window.pageYOffset;
	d.style.top = (posy - 28) + "px";
	d.style.left = (posx + 7) + "px";
}
function find_window(){
	return document.getElementById("link_tt");
}	

function create_window(event){
	var bg_color = "#EAEAEA";
	var border_color = "#D5D5D5";
	var font_color = "#000000";
	var font_face = "tahoma";
	var font_size = "11px";		
	var tt_div = document.createElement("div");
		tt_div.setAttribute("id", "link_tt");
		tt_div.setAttribute("style", "background:" + bg_color + ";-moz-border-radius:4px; opacity:0.86; border:1px solid " + border_color + ";padding:2px;color:" + font_color + ";font-family:" + font_face + ";font-size:" + font_size + ";position:absolute;z-index:1000;");
	var tt_url = document.createElement("div");
		tt_url.innerHTML = event.currentTarget.getAttribute('dll_info');
		tt_div.appendChild(tt_url);
	document.body.appendChild(tt_div);
}		
function kill_window(){
	if (find_window()) find_window().parentNode.removeChild(find_window());
}

function loadSize(link){
	var target=link.href;
	GM_xmlhttpRequest({
		url: target,
		method: "HEAD",
		onload: function(response) {
			if(response.status==200){
				var lch=response.responseHeaders.toLowerCase();
				var cntln=lch.indexOf("content-length:")+15;
				var size=linksize.Byte2KMG(parseInt(lch.substring(cntln,lch.indexOf("\n",cntln)).trim()));
				//link.style.backgroundColor="#FF0000";
				
				var title = "Size: " + size;
				link.setAttribute("dll_info", title);
				link.addEventListener("mouseover", create_window, false);
				link.addEventListener("mouseout", function() { kill_window(); }, false);
				link.addEventListener("mousemove", function(event) { locate(event); }, true);
			}
		}
	});
}

function registerConfigMenu(){
	GM_registerMenuCommand("LinkSize Configuration",linksize.showConfig);
}

if(!DONE){
	var link,URL,COUNT;
	linksize.preload();
	COUNT=0;

	registerConfigMenu();
	linksize.updateCheck();
	
	for(i=0;i<document.links.length;i++){
		link=document.links[i];
		URL=parseUri(link.href);
		if((linksize.in_array(linksize.getext(URL.file),CONFIG.extlist)==true) && ((linksize.in_array(URL.host,CONFIG.exclude_domains)==false))){
			COUNT++;
			loadSize(link);
		}
	}
	GM_log(COUNT+" link(s) matched.");
}
DONE=true;
