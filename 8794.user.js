// ==UserScript==
// @name           live365.com direct streamcast link
// @namespace      http://www.digivill.net/~joykillr
// @description    Get a direct streamcast link and playlist link for the live365 station and enable use without javascript.  Allows listening with winamp or player / program of choice.
// @include        http://*.live365.com/stations/*
// @include        http://live365.com/stations/*
// ==/UserScript==

//v3.0
//Script update for new live365 interface.  Now fully functional again with JS enabled.
//v2.7
//Script update.  Now functional again.
//v 2.6
//updated element id for LIVE365 changes.
//v 2.5
// New "Easy Stream Link" now you don't ned to be logged in anymore.  A usable link will be created anyway.  Always wrap the url in quotes if pasting to a command line.
//v 2.0
// LIVE365 has rendered the "Direct Streamcast Link" pretty-much useless.  
// Now, the "Usable Stream Link" may be used for opening the stream with an external program of your choice.
// However, you must have an account and be logged in for this link to be created.

function getCookie(c_name) {
if (document.cookie.length>0) {
  var c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1) { 
    c_start=c_start + c_name.length+1;
    var c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return "";
}

function getURL(t) {
GM_xmlhttpRequest({
	method:"GET",
	url:t,
	headers:{
		"User-Agent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5",
		"Accept":"text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
	},
	onload:function(details) {
		var ust=new String(details.responseText);
		if (ust){splitData(ust);};
	}
});
}

function specCook(w){
  var r=getCookie(w);
  if (r!=null && r!="")
  return r;
}
	
function sp(j,tte){
  var m=tte.split(j)[1];
  m=m.split('\"'||"\'")[1].split('\"'||"\'")[0];
  return m;
}

function splitData(tex){
if ((tex.indexOf("var\ play_params")!=-1)&&(tex.indexOf("var\ stationID")!=-1)&&(tex.indexOf("var\ token")!=-1)&&(tex.indexOf("var\ streamUrl")!=-1)){
	var tex1=sp("var\ play_params",tex);
	var newLnk="http\:\/\/www.live365.com\/play\/";
	var tex2=sp("var\ stationID",tex);newLnk+=tex2;
	var suprtex1 = sp("var\ nanocaster_params",tex);
	suprtex1 = suprtex1.split("\&tag\=")[1];
	insSuprLnk(newLnk+"\?auth\="+tex1.split("auth\=")[1]+"\&tag\="+suprtex1+"\&ss\=\&sid\=\&lid\=\&from\=pls");
	tex1=tex1.split("\&membername")[0];newLnk+="\?"+tex1;
	var tex3=sp("var\ token",tex);newLnk+="\&token\="+tex3;
	var ss,sid,lid;
	var sec=sp("var\ streamUrl",tex);
	ss=specCook("sessionid");
	sid=specCook("SaneID");
	lid=specCook("LID");
	if ((ss)&&(sid)&&(lid)){
		newLnk+="\&ss\="+ss+"\&sid\="+sid+"\&lid\="+lid+"\&from\=pls";
		insElem(newLnk,sec);
	} else if (((!ss)||(ss==""))||((!sid)||(sid==""))||((!lid)||(lid==""))){
		var lnkAlt=document.createElement("a");
		lnkAlt.href="http\:\/\/www\.live365\.com\/members\/login\.live\?action\=none";
		lnkAlt.textContent="Login";
		lnkAlt.innerHTML=lnkAlt.innerHTML+"\<br\ \/\>";
		naddElem(lnkAlt);
		if ((sec)&&(sec!="")){insElem2(sec);};
	}
}
}

function insElem(nl,nn){
	var lnk2=document.createElement("a");
	lnk2.href=nl;
	lnk2.textContent="Direct\ Playlist\ Link";
	lnk2.innerHTML=lnk2.innerHTML+"\<br\ \/\>";
	naddElem(lnk2);
	insElem3(nl);
	if((nn)&&(nn!="")){insElem2(nn);};
}

function insElem2(su){
	var lnk3=document.createElement("a");
	lnk3.href="http\:\/\/"+su;
	lnk3.textContent="Direct\ StreamCast\ Link \(old\)";
	lnk3.setAttribute("style", "font-size\:88\% \!important\; color\: \#777777 \!important\;");
	naddElem(lnk3);
}

function insElem3(nl){
	var lnk3=document.createElement("a");
	nl = "http://www.live365.com:80/play"+nl.split("/play")[1];
	nl = nl.split("&token")[0] + '&token=&ss=&sid=&lid=&from=pls';
	lnk3.href=nl;
	lnk3.textContent="Usable\ Stream\ Link";
	lnk3.innerHTML=lnk3.innerHTML+"\<br\ \/\>";
	naddElem(lnk3);
}

function insSuprLnk(vv){
	var suprlnk=document.createElement("a");
	//suprlnk.href="http\:\/\/"+vv;
	suprlnk.href=vv;
	suprlnk.textContent="Easy\ Stream\ Link";
	suprlnk.innerHTML=suprlnk.innerHTML+"\<br\ \/\>";
	naddElem(suprlnk);
}

function insLlnnkk(vv){
var llnnkk = document.createElement("a");
	llnnkk.href=vv;
	llnnkk.innerHTML='<img src="http://www.live365.com/scp/live365/images/listen-la-rad-reg.gif" />';
	llnnkk.textContent="Play Stream";
	llnnkk.innerHTML=llnnkk.innerHTML+"\<br\ \/\>";

	if (document.getElementById("station_logo")) {document.getElementById("station_logo").insertBefore(llnnkk,document.getElementById("station_logo").lastChild);}
	else if (document.getElementById("station_info")) {document.getElementById("station_info").insertBefore(llnnkk,document.getElementById("station_info").lastChild);}
	else if (document.getElementById("contentTD")) {document.getElementById("contentTD").insertBefore(llnnkk,document.getElementById("contentTD").firstChild);}
		//else {document.appendChild(llnnkk);}
		else {document.body.insertBefore(llnnkk,document.body.firstChild);}


}

function naddElem(ag1) {
	if (document.getElementById("station_logo")) {document.getElementById("station_logo").appendChild(ag1);}
	else if (document.getElementById("station_info")) {document.getElementById("station_info").appendChild(ag1);}
	else if (document.getElementById("contentTD")) {document.getElementById("contentTD").insertBefore(ag1,document.getElementById("contentTD").firstChild);}
	//else {document.appendChild(ag1);}
	else {document.body.insertBefore(ag1,document.body.firstChild);}

}

var l = window.content.location.href.toString();

if (!l.match(/\/schedule$/i)){
	var ty="0";
	var lsp=l.split("\/");
	var go="http\:\/\/www\.live365\.com\/cgi-bin\/mini\.cgi\?membername\=";
	var ln=lsp.length;
	lspln = lsp[ln-1];
	if (lspln.match(/index.live/gi)) {
		if (document.getElementById("contentFrame")) {lspln = document.getElementById("contentFrame").textContent;
		} else {
			var lspln2 = document.getElementsByTagName("iframe");
			for (lsplx=0; lsplx < lspln2.length; lsplx++) {
				if (lspln2[lsplx].textContent.toString().indexOf("No\ frames\?")!=-1) {
					lspln = lspln2[lsplx].textContent.toString();
					break;
				}	
			}
		}
		if (lspln.indexOf("\/stations\/")!=-1) {lspln = lspln.split("stations\/")[1].split("\?")[0];}
		if (lspln=="index.live") {
		  var jxj = document.getElementsByTagName("script");
		  for (jx1 = 0; jx1 < jxj.length; jx1++) {
			if (jxj[jx1].innerHTML!="") {
				if (jxj[jx1].innerHTML.indexOf("thisStation.set(")!=-1) {
					var lspln2 = jxj[jx1].innerHTML.split('thisStation.set("stationName"')[1];
					lspln = lspln2.split('"')[1].split('"')[0];
					var streamid = jxj[jx1].innerHTML.split('thisStation.set("id"')[1];
					streamid = streamid.split('"')[1].split('"')[0];
					break;
					}
				}
			}
		}					
	}
	go+=lspln;
	go+="\&site\=live365";
	go+="\&source\=\&clientType\="+ty;
	go+="\&playlist\=\&odatrack\=\&odapos\=\&station_status\=OK";
	go+="\&streamid\="+"\&station_name\="+lspln;
	var escURL = encodeURIComponent(go);
	go+="\&url\="+escURL;
	var tm=new Date();
	go+="\&tm\="+tm.getTime();
	go+="\&from=rma";
	if (lspln!="index.live") {
		insLlnnkk(go);
	//	insSuprLnk();
		getURL(go);
	}
}
