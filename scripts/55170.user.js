// ==UserScript==
// @name           RapidShare Remote Uploader Booster
// @namespace      http://darkztar/ http://warez-dk.org/ http://nordic-warez.com/
// @description    Helps with remote uploads!
// @include        https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi?remotegets=1
// @include        https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi?urls=&remotegets=1
// @include        https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi?remotegets=1
// @include        https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi?urls=&remotegets=1
// ==/UserScript==

var RefTimer; var USERZONE = (location.href.indexOf('premiumzone') > -1) ? "premiumzone" : "collectorszone"; var UPLINKS = [];

function GSB(Source,Start,End){
	var xStart = Source.indexOf(Start)+Start.length;
	var xEnd = Source.indexOf(End,xStart);
	if(xStart < xEnd && xStart >= Start.length){
		return Source.substr(xStart,(xEnd-xStart));
	}else{
		return "";
	}
}
function GSBA(Source,Start,End){
	var xStart = Source.indexOf(Start)+Start.length;
	var xEnd = Source.indexOf(End,xStart);
	var d = [];
	while(xStart < xEnd && xStart >= Start.length && xEnd > -1){
		d.push(Source.substr(xStart,(xEnd-xStart)));
		xStart = Source.indexOf(Start,xStart)+Start.length;
		xEnd = Source.indexOf(End,xStart);
	}
	return d;
}

document.getElementByName=function(a){
	var b=document.getElementsByTagName('*');
	for(var i=0;i<b.length;i++){
		if(b[i].name==a){
			return b[i];
		}
	}
};

document.getElementByClassName=function(a,b){
	if(typeof b=='undefined'){b='*'}
	var c=document.getElementsByTagName(b);
	for(var i=0;i<c.length;i++){
		if(c[i].className==a){
			return c[i];
		}
	}
};

document.getElementsByClassName=function(a,b){
	if(typeof b=='undefined'){b='*'}
	var c=document.getElementsByTagName(b);
	var d=[];
	for(var i=0;i<c.length;i++){
		if(c[i].className==a){
			d.push(c[i]);
		}
	}
	return d;
};

function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}

function printLinks(){
	LINKS = getLinks();
	return LINKS.join("\n");
}
function getLinks(){
	return eval(GM_getValue("RSUPLINKS",'[""]'));
}
function saveLinks(){
	var TMPLKS = []; var LINKS = [];
	TMPLKS = document.getElementByName('urls').value.split(/\r\n|\r|\n/g);
	for(var i = 0; i < TMPLKS.length; i++){
		if(ValURL(TMPLKS[i])){
			LINKS.push(TMPLKS[i]);
		}
	}
	GM_setValue("RSUPLINKS",uneval(LINKS));
	document.getElementByName('urls').value = LINKS.join('\n');
	alert('Links Saved!');
}
function printBlackList(){
	BLKLZT = getBlackList();
	return BLKLZT.join("\n");
}
function getBlackList(){
	return eval(GM_getValue("RSUPBLK",'[""]'));
}
function saveBlackList(){
	var TMPLKS = []; var BLKNAM = [];
	TMPLKS = document.getElementByName('blkList').value.split(/\r\n|\r|\n/g);
	for(var i = 0; i < TMPLKS.length; i++){
		if(ValURL(TMPLKS[i])){
			BLKNAM.push(TMPLKS[i]);
		}
	}
	GM_setValue("RSUPBLK",uneval(BLKNAM));
	alert('Blacklist Saved!');
}
function addBlackList(blck){
	var curBlk = getBlackList();
	if(curBlk[0].length > 0 && curBlk.length > 0){
		curBlk.push(blck);
	}else{
		curBlk[0] = blck;
	}
	document.getElementById('blkList').value = curBlk.join("\n");
	GM_setValue("RSUPBLK",uneval(curBlk));
}
function DelFromLinks(link){
	var CurLinks = getLinks(); var NewLinks = [];
	for(var i = 0; i < CurLinks.length; i++){
		if(CurLinks[i].toLowerCase() != link.toLowerCase()){
			NewLinks.push(CurLinks[i]);
		}
	}
	GM_setValue("RSUPLINKS",uneval(NewLinks));
}
function setStartStop(){
	if(getStartStop() == "Start"){
		GM_setValue("RSUPSTARTSTOP",true);
		RefPage();
	}else{
		GM_setValue("RSUPSTARTSTOP",false);
		StopRef();
	}
	document.getElementById('StartStop').value = getStartStop();
}
function getStartStop(){
	var SS = GM_getValue("RSUPSTARTSTOP",false);
	if(SS){
		return "Stop";
	}else{
		return "Start";
	}
}

function saveSpeed(){
	GM_setValue("RSUPREFRESH",Math.abs(document.getElementById('RefSpeed').value) > 0 ? Math.abs(document.getElementById('RefSpeed').value) : '2');
}

function getSpeed(){
	return GM_getValue("RSUPREFRESH",'30');
}

function StopRef(){
	clearTimeout(RefTimer);
}

function UpdCurJobs(sourc){
	if(sourc.indexOf('You have currently saved <b>') > -1){
		var ret = GSB(sourc,' saved <b>','</b>');
		document.getElementById('CURJOBS').innerHTML = ret;
		return ret;
	}
}

function FindMatch(sFind, aCont){
	if(isArray(aCont)){
		for(i = 0; i < aCont.length; i++){
			if(sFind.toLowerCase() == aCont[i].toLowerCase()){
				return true;
			}
		}
		return false;
	}else{
		if(sFind.toLowerCase() == aCont.toLowerCase()){
			return true;
		}else{
			return false;
		}
	}
}

function ValURL(x){
	var prts = x.split('/'); var blkLzt = getBlackList();
	if(!FindMatch(prts[prts.length-1], blkLzt)){
		return x.match(/^(ht|f)tps?:\/\/[a-zA-Z0-9]*:?[a-zA-Z0-9]*\@?[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
	}else{
		return false;
	}
}


function RefPage(x){
	GM_xmlhttpRequest({
		method:'GET',
		headers: {'User-Agent': 'Mozilla/5.0','Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'},
		overrideMimeType: 'text/html; charset=UTF-8',
		url:'https://ssl.rapidshare.com/cgi-bin/'+USERZONE+'.cgi?remotegets=1',
		onload:function(a){
			HTML = a.responseText;
			if(HTML.indexOf('<table class="dtabelle" width="100%">') > -1){
				PrepTBL(HTML);
				curJobs = UpdCurJobs(HTML);
				DelLinks();
				AddUploads();
				document.getElementById('blkList').value = printBlackList();
			}
		}
	});
	if(getStartStop() == "Stop"){
		StopRef();
		RefTimer = setTimeout(RefPage,getSpeed() * 1000);
	}
}

function AddUploads(){
	var addString = ""; LINKS = getLinks(); cCount = -1;
	for(var i = curJobs; i < 30; i++){
		while(cCount < LINKS.length - 1){
			cCount++;
			if(FindMatch(LINKS[cCount], UPLINKS) == false){
				addString += escape(LINKS[cCount]) + '%0D%0A';
				break;
			}
		}
	}
	if(addString.length > 0){
		addString = addString.substr(0,addString.length - 6).replace(/%0D%0Aundefined/g,'');
		var DATA = "remotegets=1&urls="+addString;
		GM_xmlhttpRequest({
			method:'POST',
			headers: {'User-Agent': 'Mozilla/5.0','Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': DATA.length},
			data: DATA,
			overrideMimeType: 'text/html; charset=UTF-8',
			url:'https://ssl.rapidshare.com/cgi-bin/'+USERZONE+'.cgi?remotegets=1',
			onload:function(a){
				HTML = a.responseText;
				if(HTML.indexOf('<table class="dtabelle" width="100%">') > -1){
					PrepTBL(HTML);
					curJobs = UpdCurJobs(HTML);
					if(curJobs < 30) AddUploads();
				}
			}
		});
	}
}

function DelLinks(){
	var UPLS = GSBA(document.getElementByClassName('dtabelle').innerHTML,'<tr valign="top">','</tr>'); var DelString = "";
	for(var i = 0; i < UPLS.length; i++){
		if(UPLS[i].indexOf('Upload to RapidShare finished.') > -1 || UPLS[i].indexOf('Download error! File not found?') > -1 || UPLS[i].indexOf('This file is black listed.') > -1 ){
			var lInk = GSB(UPLS[i],"<td>","</td>");
			if(UPLS[i].indexOf('This file is black listed.') > -1){
				var prts = lInk.split('/');
				addBlackList(prts[prts.length-1]);
			}
			DelString += "&killjob-"+GSB(UPLS[i],"loeschfragen('","'")+"=1";
			DelFromLinks(lInk);
		}
	}
	if(DelString.length > 0){
		var DATA = "remotegets=1&killjobs=1"+DelString;
		GM_xmlhttpRequest({
			method:'POST',
			headers: {'User-Agent': 'Mozilla/5.0','Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': DATA.length},
			data: DATA,
			overrideMimeType: 'text/html; charset=UTF-8',
			url:'https://ssl.rapidshare.com/cgi-bin/'+USERZONE+'.cgi?remotegets=1',
			onload:function(a){
				HTML = a.responseText;
				if(HTML.indexOf('<table class="dtabelle" width="100%">') > -1){
					PrepTBL(HTML);
					curJobs = UpdCurJobs(HTML);
					if(curJobs < 30) AddUploads();
				}
			}
		});
		document.getElementByName('urls').value = printLinks();
	}
}

function PrepTBL(x){
	TBL = GSB(x,'<table class="dtabelle" width="100%">','</table>');
	document.getElementByClassName('dtabelle').innerHTML = TBL;
	UPLINKS = GSBA(TBL,'<td>','</td>');
}

var MainDiv = document.getElementByClassName('klappbox');
var butAdd = '<input value="Add" type="submit">';
var butReplace = '<table style="width:100%;border:0px;margin:0;" cellpadding="0" cellspacing="0"><tr><td align="left"><input type="button" id="StartStop" value="'+getStartStop()+'">&nbsp;<input type="button" value="Save Links To Upload Queue" id="SaveLinks">&nbsp;<b>Refresh speed (secs):</b>&nbsp;<input type="text" value="'+getSpeed()+'" id="RefSpeed" size="4">&nbsp;<input type="button" id="RefNow" value="Refresh Now"></td><td align="right">'+butAdd+'</td></tr></table>';
var jobNum = 'You have currently saved <b>';
var jobReplace = "You have currently saved <b id='CURJOBS'>";
var blkLst = "<h2>Note</h2>";
var blkReplace = "<br><h2>Blacklist</h2><textarea id='blkList' rows='20' cols='135'>"+printBlackList()+"</textarea><br><input type='button' id='blkSave' value='Save Blacklist'><br><h2>Note</h2>";
MainDiv.innerHTML = MainDiv.innerHTML.replace(butAdd,butReplace).replace(jobNum,jobReplace).replace(blkLst,blkReplace);
document.getElementById('StartStop').addEventListener('click',setStartStop,false);
document.getElementById('SaveLinks').addEventListener('click',saveLinks,false);
document.getElementById('RefSpeed').addEventListener('change',saveSpeed,false);
document.getElementById('RefNow').addEventListener('click',RefPage,false);
document.getElementById('blkSave').addEventListener('click',saveBlackList,false);
var txtLinks = document.getElementByName('urls'); txtLinks.rows = '20'; txtLinks.cols = '135'; txtLinks.value = printLinks();
var curJobs = GSB(MainDiv.innerHTML,' saved <b>','</b>');

//Launch the shit :D
if(getStartStop() == "Stop"){
	RefPage();
}