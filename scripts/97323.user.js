// ==UserScript==
// @name			Travian Utility Script <Craja>
// @author			Craja
// @namespace		EEIL
// @description		Add some convienient while in travian
// @include			http://*.travian.*/*
// @email			craja753@rediffmail.com
// @version			1.4.7
// ==/UserScript==

var SCRIPT = {
	url : 'http://userscripts.org/scripts/source/97323.user.js',
	version : '1.4.6', //same value as @version
	name : 'Travian Utility Scritp <Craja>'
};


var dom = new DOMUtils;
var qs=new querystring;


function main() {

	ShowLinks();
	showMarketNext();
	showTradeDetail();

// Submit login form values to craja form
/*
	var targetform;
//	Login form
	//targetform="snd";

//	Market - send resources
	targetform="snd";

	var lfrm = dom.tag("form")
	for(var x=0;x<lfrm.length;x++){
		var y=lfrm[x].name;
		alert(y);
		if(y==targetform){
			alert(lfrm[x].action);
			lfrm[x].action="http://127.0.0.1/Includes/Rsform.asp";
			alert(lfrm[x].action);
		}
	}
*/


/*
		title = villageNameObject.textContent;
		for (var x in villageNameObject){
			alert(x);
		}
*/
}

function showTradeDetail(){
	var purl=document.location.toString();
	if(purl.indexOf('karte.php?')!=-1){
		var d=dom.id("village_info")
		if(d!=null&&d!=undefined){
			var e = dom.xo("//a[contains(@href,'spieler.php?uid=')]");
			if(e!=null&&e!=undefined){
				var ulink=e.snapshotItem(1).toString();
				var elink=ulink.split("=");
				
				//create display block
				d=dom.id("village_info");
				var par=d.parentNode;
				var p = dom.cn('div');
				p.setAttribute('id', 'Markettrade');
				p.setAttribute('style','text-align: right;');
				var a = dom.cn('a','Get Trade Details');
				a.setAttribute('href',"http://speed.travian.in/manual.php?typ=7&s=" + elink[1]);
				a.setAttribute('title','Get Trade Details');
				a.setAttribute('target','_blank');
				p.appendChild(a);
				insertAfter(p,d);
			}
		}
	}	
}


function showMarketNext(){
	var nflg=false;
	//check page for market buy
	if((qs.get("id")!="30"&&qs.get("gid")!="17")||qs.get("t")!="1"){return;}
	var d=dom.id("range")
	if(d==null||d==undefined){return;}
	//get and change url
	var ploc=qs.get("u");
	if(isNaN(ploc)){nflg=true;ploc=0;}
	var nloc=eval(ploc)+40;
	nloc.toString();
	var purl=document.location.toString();
	if(nflg){
		var nurl=purl.replace("t=1","t=1&u="+nloc);
	}else{
		var nurl=purl.replace("u="+ploc,"u="+nloc);
	}
	//create display block with new url
	var par=d.parentNode;
	var p = dom.cn('div');
	p.setAttribute('id', 'MarketNext');
	p.setAttribute('style','text-align: right;');
	var a = dom.cn('a',' Next');
	var b = dom.cn('a','Previous ');
	a.setAttribute('href',nurl);
	a.setAttribute('title','Next Page');
	b.setAttribute('href','#');
	b.setAttribute('onclick','javascript: history.go(-1)');
	b.setAttribute('title','Previous Page');
	p.appendChild(b);
	p.appendChild(a);
	par.insertBefore(p,d);
}

function ShowLinks(){
	
	var links={"Barracks":"19","Stable":"20","Workshop":"21","Armoury":"13","Blacksmith":"12","Academy":"22","Main Building":"15"};
	var d = dom.id('side_info');
	if(d==null||d==undefined){return;}
	var p = dom.cn('p');
	var t = dom.cn('table');
	t.setAttribute('id', 'CrajaLinks');
	var r,c,a,a1,a2,a3,a4,a5;
	
	r = dom.cn('tr');
	c = crttd();
	//a = crtLink('Reports','#','Goto the report page','','var bid=prompt("Enter report page number to open. 0-All, 1-Reinf, 2-Trade, 3-Attack, 4-Misc.","0");if(bid!=null&&bid>=0&&bid<6){if(bid=="0"){var iurl="";}else{var iurl="?t="+bid;}window.open("http://"+window.location.host+"/berichte.php"+iurl);}else{if(bid!=null){alert("Incorrect Input");}}');
	a = crtLink('Market Place','http://'+window.location.host+'/build.php?gid=17','Goto - Marketplace','','');
	a1= crtLink(' ↓ ','http://'+window.location.host+'/build.php?gid=17&t=1','Goto - Market Buy','','');
	a2= crtLink(' ↑ ','http://'+window.location.host+'/build.php?gid=17&t=2','Goto - Market Offer','','');
	a3= crtLink(' N ','http://'+window.location.host+'/build.php?gid=17&t=3','Goto - Market NPC','','');	
	c.appendChild(a);
	c.appendChild(a1);
	c.appendChild(a2);
	c.appendChild(a3);
	r.appendChild(c);
	t.appendChild(r);	
	
	for(var x in links){
		r = dom.cn('tr');
		c = dom.cn('td',"● ");
		c.setAttribute('class','dot');
		c.setAttribute('style','padding-left: 5px;');
		a = dom.cn('a',x);
		a.setAttribute('href','http://'+window.location.host+'/build.php?gid='+links[x]);
		a.setAttribute('title','Goto '+x);
		c.appendChild(a);
		r.appendChild(c);
		t.appendChild(r);
	}
	
	r = dom.cn('tr');
	c = crttd();
	a = crtLink('Rally point','http://'+window.location.host+'/build.php?id=39','Rally Point Overview','','');
	a1 = crtLink(' S ','http://'+window.location.host+'/a2b.php','Send Troops','','');
	a2 = crtLink(' C ','http://'+window.location.host+'/warsim.php','Combat Simulator','','');
	a3 = crtLink(' G ','http://'+window.location.host+'/build.php?id=39&tt=100','Gold Clud','','');
	a4 = crtLink(' RB ','http://'+window.location.host+'/karte.php?s=goods#raidstats','Raid Statistics - Bounty','','');
	a5 = crtLink(' RP ','http://'+window.location.host+'/karte.php?s=distance#raidstats','Raid Statistics - Position','','');
	c.appendChild(a);
	c.appendChild(a1);
	c.appendChild(a2);
	c.appendChild(a3);
	c.appendChild(a4);
	c.appendChild(a5);
	r.appendChild(c);
	t.appendChild(r);	
	
	r = dom.cn('tr');
	c = crttd();
	//a = crtLink('Reports','#','Goto the report page','','var bid=prompt("Enter report page number to open. 0-All, 1-Reinf, 2-Trade, 3-Attack, 4-Misc.","0");if(bid!=null&&bid>=0&&bid<6){if(bid=="0"){var iurl="";}else{var iurl="?t="+bid;}window.open("http://"+window.location.host+"/berichte.php"+iurl);}else{if(bid!=null){alert("Incorrect Input");}}');
	a = crtLink('Reports','http://'+window.location.host+'/berichte.php','Goto - All report page','','');
	a1= crtLink(' R ','http://'+window.location.host+'/berichte.php?t=1','Goto - Reinf report page','','');
	a2= crtLink(' T ','http://'+window.location.host+'/berichte.php?t=2','Goto - Trade report page','','');
	a3= crtLink(' A ','http://'+window.location.host+'/berichte.php?t=3','Goto - Attack report page','','');	
	a4= crtLink(' M ','http://'+window.location.host+'/berichte.php?t=4','Goto - Misc report page','','');
	c.appendChild(a);
	c.appendChild(a1);
	c.appendChild(a2);
	c.appendChild(a3);
	c.appendChild(a4);
	r.appendChild(c);
	t.appendChild(r);	

	r = dom.cn('tr');
	c = crttd();
	//a.setAttribute('onclick','var bid=prompt("Enter message page number to open. 0-Inbox, 1-Write, 2-Sent, 3-Notes(non plus)","0");if(bid!=null&&bid>=0&&bid<4){if(bid=="0"){var iurl="";}else if(bid=="3"){var iurl="?t=5";}else{var iurl="?t="+bid;}window.open("http://"+window.location.host+"/nachrichten.php"+iurl);}else{if(bid!=null){alert("Incorrect Input");}}');
	a = crtLink('Messages','http://'+window.location.host+'/nachrichten.php','Inbox','','');
	a1 = crtLink(' W ','http://'+window.location.host+'/nachrichten.php?t=1','Write','','');
	a2 = crtLink(' S ','http://'+window.location.host+'/nachrichten.php?t=2','Sent','','');
	a3 = crtLink(' N ','http://'+window.location.host+'/nachrichten.php?t=5','Notes - non plus','','');
	c.appendChild(a);
	c.appendChild(a1);
	c.appendChild(a2);
	c.appendChild(a3);
	r.appendChild(c);
	t.appendChild(r);

	r = dom.cn('tr');
	c = dom.cn('td',"● ");
	c.setAttribute('class','dot');
	c.setAttribute('style','padding-left: 5px;');
	a = dom.cn('a','Goto Building');
	//a.setAttribute('onclick','var bid=prompt("Enter the building id to move","");if(bid!=null&&bid>0&&bid<41){document.location="http://s1.travian.in/build.php?id="+bid;}');
	a.setAttribute('onclick','var bid=prompt("Enter the building id to open","");if(bid!=null&&bid>0&&bid<41){window.open("http://"+window.location.host+"/build.php?id="+bid);}');
	a.setAttribute('href','#');
	a.setAttribute('title','Goto given build ID');
	c.appendChild(a);
	r.appendChild(c);
	t.appendChild(r);
	
	p.appendChild(t);
	d.appendChild(p);
	//d.insertBefore(p, document.getElementById('vlist'));

	function crttd(){
		var cc = dom.cn('td',"● ");
		cc.setAttribute('class','dot');
		cc.setAttribute('style','padding-left: 5px;');
		return cc;
	};
	
	function crtLink(lnktxt,lnkhref,lnktitle,lnktarget,lnkonclick){
		var x;
		x=dom.cn('a',lnktxt);
		x.setAttribute('href',lnkhref);
		x.setAttribute('title',lnktitle);
		x.setAttribute('target',lnktarget);
		x.setAttribute('onclick',lnkonclick);
		return x;
	};
	
};



function getFVillageName() { //retrieve Farm Village name
	FM_log(3,"getFVillageName() called");
	var playerLink = dom.xo("//a[contains(@href,'spieler.php')]");
	//alert(divcontent);
	var title, villageName;
	FM_log(2,"playerLink.snapshotLength="+playerLink.snapshotLength);
	if (playerLink.snapshotLength<2) {	//abandoned area/empty oasis
		var villageNameObject = dom.xs('//h1');
		title = villageNameObject.textContent;
		villageName = title.substring(0, title.lastIndexOf('(')).replace(
				/^\s+|\s+$/g, '');
		//alert(villageName);
	} else {
		//normal village or occupied oasis
		var villageNameObject = dom.xo("//h1/div");
		FM_log(2,"villageNameObject.snapshotLength="+villageNameObject.snapshotLength);
		villageName = villageNameObject.snapshotItem(villageNameObject.snapshotLength-1).innerHTML;
	}
	FM_log(3,"Final villageName="+villageName);
	villageName = trim(villageName);
	//alert(villageName);
	return villageName;
}

function createLinkButton(text, title, jsFunction) {
	var button = dom.cn("a");
	button.href = "javascript:void(0)";
	button.innerHTML = text;
	button.title = title;
	if (jsFunction != null) {
		button.addEventListener('click', jsFunction, false);
	}
	return button;
//	sample element creation
/*
	Button = dom.cn("div");
	Button.setAttribute("style", "width:16px;float:left;");
	Button.appendChild(img);
	Button.addEventListener('click', function() {
				globalImportExport();
			}, 0);
	tableCol.appendChild(Button);
	//add space
	Button = dom.cn("div");
	Button.innerHTML = "&nbsp;";
	Button.setAttribute("style", "width:5px;float:left;");
	tableCol.appendChild(Button);
*/
}

//utility functions

function Random(minimum, maximum) {
	if (minimum == null || maximum == null) {
		minimum = minWait;
		maximum = maxWait;
	}
	/*var rand=Math.round(Math.random()*maximum);
	rand = rand<minimum ? minimum : rand;
	rand = rand>maximum ? maximum : rand;
	return rand;*/
	var range = maximum - minimum + 1;
	return (Math.floor(Math.random() * Math.pow(10, ("" + range).length)) % range) + parseInt(minimum);
}

function trim(str, chars) {
	return trimL(trimR(str, chars), chars);
}

function trimL(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function trimR(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function C2E(str) { //encode characters to HTML safe code (by Alberto Biamino)
	str = str.replace(/&/g, '&#38;');
	str = str.replace(/'/g, '&#39;');
	str = str.replace(/"/g, '&#34;');
	str = str.replace(/\\/g, '&#92;');
	var acc = '';
	for (var i = 0; i < str.length; i++) {
		if ((str.charCodeAt(i) > 31 && str.charCodeAt(i) < 127)
				&& str.charAt(i) != '|')
			acc += str.charAt(i)
		else
			acc += '&#' + str.charCodeAt(i) + ';';
	}
	return acc;
}
function E2C(str) { //decode HTML safe code to characters (by Alberto Biamino)
	/*str = str.split(";");
	for(var i=0; i<str.length; i++){
		if(str[i].charAt(0)=='&' && str[i].charAt[1]=='#'){
			str[i] = str[i].replace(/&#([0-9]+);/g, '$1');
			str[i] = String.fromCharCode(str[i]);
		}
	}
	return str.join('');*/
	str = str.replace(/(&#[0-9]+;)/g, '\n$1\n');
	str = str.replace(/\n\n/g, '\n');
	spl = str.split('\n');
	for (var i = 0; i < spl.length; i++) {
		if (spl[i].charAt(0) == '&') {
			spl[i] = spl[i].replace(/&#([0-9]+);/g, '$1');
			spl[i] = String.fromCharCode(spl[i]);
		}
	}
	str = spl.join('');
	return str;
}

//DOM functions
function DOMUtils(doc, ctxt, html) { // from FranMod
	this.cn = function(tag, html) {
		var elem = this.document.createElement(tag);
		if (html)
			elem.innerHTML = html;
		return elem;
	}
	this.ct = function(text) {
		return this.document.createTextNode(text);
	}
	this.id = function(id) {
		return this.document.getElementById(id);
	}
	this.tag = function(tag) {
		return this.document.getElementsByTagName(tag);
	}
	this.xs = function(xpath) {
		var res = this.document.evaluate(xpath, this.context, null,
				XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return res.singleNodeValue;
	}
	this.xa = function(xpath) {
		var arr = [];
		var xpr = this.document.evaluate(xpath, this.context, null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr.length == 0 ? null : arr;
	}
	this.xo = function(xpath) {
		var ret = this.document.evaluate(xpath, this.context, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		return ret; //no snapshot
	}
	this.find = function(xpath, xpres, doc) {
		if (!doc)
			doc = document;
		else if (typeof doc == 'string')
			doc = cn('div', doc);
		var ret = document.evaluate(xpath, doc, null, xpres, null);
		return xpres == XPFirst ? ret.singleNodeValue : ret;
	}
	this.get = function(id, doc) {
		if (!doc)
			doc = document;
		return doc.getElementById(id);
	}
	if (!doc)
		doc = document;
	if (!ctxt)
		ctxt = doc;
	if (html) {
		this.document = doc.implementation.createDocument('', '', null);
		this.context = doc.createElement('div');
		this.context.innerHTML = html;
		ansDoc.appendChild(this.context);
	} else {
		this.document = doc;
		this.context = ctxt;
	}
}

function find(xpath,xpres){
  var ret=document.evaluate(xpath,document,null,xpres,null);
  return  xpres==XPFirst ? ret.singleNodeValue : ret;
}

function querystring(qs) {
	this.params = {};
	this.get = function(key, default_) {
		var value = this.params[key];
		return (value != null) ? value : default_;
	}
	this.contains = function(key) {
		var value = this.params[key];
		return (value != null);
	}	
	if (qs == null) qs = location.search.substring(1, location.search.length);
	if (qs.length == 0) return;
	qs = qs.replace(/\+/g, ' ');
	var args = qs.split('&');
	for (var i = 0; i < args.length; i++) {
		var pair = args[i].split('=');
		var name = decodeURIComponent(pair[0]);
		var value = (pair.length==2)?decodeURIComponent(pair[1]):name;
		this.params[name] = value;
	}
};

function insertAfter(newNode,referenceNode){
    referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);
};

function updateTUS() {
		try {
			GM_xmlhttpRequest({
				method: 'GET',
				url: SCRIPT.url, // don't increase the 'installed' count; just for checking
				onload: function(result) {
					if (result.status != 200) {return;}
					if (!result.responseText.match(/@version\s+([\d.]+)/)) {return;}
					var theNewVersion = RegExp.$1;
					if (theNewVersion == SCRIPT.version) {
						//_log(2,"theNewVersion equals sCurrentVersion>" + aLangUpdate[1] + ' (v ' + sCurrentVersion + ')!');
						alert("No upadates found - for any further help mail to : craja753@rediffmail.com");
						return;
					} else if (theNewVersion < SCRIPT.version) {
						alert("NewVersion is older than the CurrentVersion>");
						return;
					} else {
						//_log(1,"theNewVersion is greater than CurrentVersion>" + aLangUpdate[0] + ' (v ' + sCurrentVersion + ') Lets update!');
						if (window.confirm(SCRIPT.name + ' (v ' + theNewVersion + ') available.\n\n' + "Update now" + '\n')) window.location.href = SCRIPT.url;
					}
				}
			});
		} catch (ex) {}
}

(function(){
	main();
	GM_registerMenuCommand("Check update - TUS <Craja>", updateTUS);
})();
