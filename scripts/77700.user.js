// ==UserScript==
// @namespace      userscripts.org/users/socializer
// @name           Socializer
// @version        0.1.3
// @description    1Live Freundeskreis Edition - Socializer enhances various social networking sites
// @copyright      2010 All rights reserved.
// @license        CC Attribution-No Derivative Works 3.0; http://creativecommons.org/licenses/by-nd/3.0/;
// @include        http://www.1live-freundeskreis.de/*
// ==/UserScript==

// GreaseMonkey (UserScript) commented out includes
// @include        http://www.studivz.net/*
// @include        http://www.meinvz.de/*
// @include        http://tonight.rp-online.de/*


// ---- settings ----
var cfg = new Array();

cfg['fk.on']			= 1;
cfg['fk.imageOnMsgIndex']	= 1;
cfg['fk.imageOnMsg']		= 1;
cfg['fk.trackMsgs']		= 1;
cfg['fk.updateButton']		= 1;
cfg['fk.addCtrl']		= 1;
cfg['fk.modTitle']		= 1;
cfg['fk.bigPic']		= 1;
cfg['fk.autoReload']		= 1;
cfg['fk.ageAppendFromUrl']	= 1;
cfg['fk.indicateLikeInLists']	= 1;	// currently depends for performance reasons on 'ageAppendFromUrl' set to 1

cfg['vz.on']			= 0;
cfg['vz.bigImages']		= 1;
cfg['vz.biggerPaginator']	= 1;

cfg['tonight.on']		= 0;
cfg['tonight.photoDLLink']	= 1;

// ---- Globals ----
var currProfileId;

// ---- nothing to change below this line ----

	// append a socializer css style set (green)
	var ourcss = document.createElement("style");
	ourcss.setAttribute("type", "text/css");
	ourcss.setAttribute("media", "screen");
	ourcss.appendChild(document.createTextNode(".ourcss, .ourcss a { text-align: left; font-size: 10pt; color: #008; } .icon { font-size: 18px; line-height: 11px; }"));
	document.getElementsByTagName("head")[0].appendChild(ourcss);

if( location.href.match(/1live-freundeskreis\.de/) && cfg['fk.on']){
	if( cfg['fk.ageAppendFromUrl'] ){
		var items = document.getElementById("onlineliste").getElementsByTagName("a");
		for(var i=0;i<items.length;i++){
			var age = items[i].innerHTML.substr(0,3);
			items[i].href += "&age="+age;

			var thisProfileId = items[i].href.match(/\/profile\/\d+\/([^\.]+)\.phtml/)[1];
			if( cfg['fk.indicateLikeInLists'] ){
				var likeval = GM_getValue("fk.like."+thisProfileId);
				if (likeval == 1){
					items[i].style.color = "#0a0";
					items[i].style.fontWeight = 900;
				}else if (likeval == 0){
					items[i].style.color = "#a00";
					items[i].style.textDecoration = "line-through";
				}else{
					items[i].style.color = "#aaa";
				}
			}

			if( cfg['fk.trackMsgs'] ){
				var msgCnt = GM_getValue("fk.msgCnt."+thisProfileId);
				if (msgCnt){
					items[i].parentNode.innerHTML += "<span class='ourcss' style='font-size: 7pt;'> ("+msgCnt+")</span>";
				}
			}
		}
		if(document.getElementById("rechts") && document.getElementById("rechts").firstElementChild.children[1].firstElementChild.className == 'onlineliste2'){
			var items = document.getElementById("rechts").firstElementChild.children[1].firstElementChild.getElementsByTagName("a");
			for(var i=0;i<items.length;i++){
				var age1 = items[i].innerHTML.substr(0,1);
				var age2 = items[i].innerHTML.substr(2,2);
				items[i].href += "&age="+age1+age2;

				var thisProfileId = items[i].href.match(/\/profile\/\d+\/([^\.]+)\.phtml/)[1];
				if( cfg['fk.indicateLikeInLists'] ){
					var likeval = GM_getValue("fk.like."+thisProfileId);
					if (likeval == 1){
						items[i].style.color = "#0a0";
						items[i].style.fontWeight = 900;
					}else if (likeval == 0){
						items[i].style.color = "#a00";
						items[i].style.textDecoration = "line-through";
					}else{
						items[i].style.color = "#aaa";
					}
				}

				if( cfg['fk.trackMsgs'] ){
					var msgCnt = GM_getValue("fk.msgCnt."+thisProfileId);
					if (msgCnt){
						items[i].parentNode.innerHTML += "<span class='ourcss' style='font-size: 7pt;'> ("+msgCnt+")</span>";
					}
				}
			}
		}
	}
	if( location.href.match(/member\/msg/) ){
		if( cfg['fk.imageOnMsgIndex'] ){
			var items = document.getElementsByClassName("spalte");
			for(var i=0;i<items.length;i++){
				if( items[i].innerHTML.match(/\/profile/) ){
					var elem = items[i].innerHTML.match(/\/profile\/([^\.]+)\.phtml/);
					items[i].children[0].innerHTML += '<br><img src="http://images.popdata.de/la/image/'+ elem[1] +'.jpg" width="50" height="65">';
				}
			}
		}
		if( cfg['fk.imageOnMsg'] ){
			if( location.href.match(/newmsg|inmsg/) ){
				var items = document.getElementsByTagName("input");
				for(var i=0;i<items.length;i++){
					if( items[i].getAttribute('name') == 'mruid' ){
					var urlId = items[i].getAttribute('value').substr(5,3) +'/'+ items[i].getAttribute('value');
				items[i].parentNode.parentNode.parentNode.innerHTML = '<div style="float: right; padding-left: 10px;">'
						+'<a href="http://www.1live-freundeskreis.de/profile/'+urlId+'.phtml">'
						+'<img src="http://images.popdata.de/la/image/'+ urlId +'.jpg" width="100" height="120"></a>'
						+'</div>'
						+ items[i].parentNode.parentNode.parentNode.innerHTML;
					}
				}
			}
		}
		if( cfg['fk.trackMsgs'] ){
			if( location.href.match(/newmsg|inmsg/) ){
				currProfileId = document.forms[0].elements[3].value;
				document.forms[0].addEventListener("submit", fkTrackMsg, false);
			}
		}
		if( cfg['fk.updateButton'] ){
			if( location.href.match(/inbox|outbox/) ){
				document.getElementById("profil").firstElementChild.firstElementChild.innerHTML = '<div style="float: right; padding: 3px; padding-right: 3px; background-color: #fff;"><a href="'+ location.href +'">aktualisieren</a></div>'+document.getElementById("profil").firstElementChild.firstElementChild.innerHTML
			}
		}
		if( cfg['fk.autoReload'] ){
			if( location.href.match(/inbox|outbox/) ){
				// not Auto-Reload in HTTPS pages
				var url = document.URL;
				var https = url.indexOf("https");
				if(https != -1){
					return;
				}

				// appends a timer to the page
				var script = document.createElement("script");
				script.setAttribute("id", "great-reload-script");
				script.setAttribute("language", "JAVASCRIPT");
				script.setAttribute("type", "text/javascript");
				script.innerHTML= "setTimeout(\"location.reload(true);\",12*60*1*1000);"; // reload every 12 minutes
				var head=document.getElementsByTagName("head")[0];
				head.appendChild(script);
			}
		}
	}else if( location.href.match(/\/profile/) ){
		if( cfg['fk.modTitle'] ){
			if( document.getElementById("profil") ){
				document.title = document.getElementById("profil").firstElementChild.firstElementChild.firstElementChild.innerHTML +' '+ document.title;
			}
		}
		if( cfg['fk.addCtrl'] ){
			// current page member id
			var elem = location.href.match(/\/profile\/\d+\/([^\.]+)\.phtml/);
			var memberId = elem[1];
			currProfileId = memberId; // set our global var
			var prevMemberId = zeroPad((parseFloat(elem[1]) - 1),8);
			var nextMemberId = zeroPad((parseFloat(elem[1]) + 1),8);

			// insert our controls: prev/next
			document.getElementById("main").innerHTML = '<div class="ourcss" style="margin-left: 160px; margin-right: 10px;">'
				+'<div style="float: right;">'
				+'<a href="http://www.1live-freundeskreis.de/profile/'+nextMemberId.substr(5,3)+'/'+nextMemberId+'.phtml">Nächstes Mitglied</a><br><br>'
				+'</div>'
				+'<a href="http://www.1live-freundeskreis.de/profile/'+prevMemberId.substr(5,3)+'/'+prevMemberId+'.phtml">Vorheriges Mitglied</a>'
				+'</div>' + document.getElementById("main").innerHTML;

			// insert our controls: like/dislike
			if( document.getElementById("profil") ){	// some members are banned/nonexistant ("Dieses Mitglied ist gesperrt oder nicht bekannt")
				var likeval = GM_getValue("fk.like."+currProfileId);
				var like = new Array();
				if (likeval == 1){
					like[1] = '<span id="icon_like" class="icon" style="color: #0a0;">&diams;</span> ';
					like[2] = '<span id="icon_neutral" class="icon" style="color: #fff;">&diams;</span> ';
					like[3] = '<span id="icon_dislike" class="icon" style="color: #fff;">&diams;</span> ';
				}else if (likeval == 0){
					like[1] = '<span id="icon_like" class="icon" style="color: #fff;">&diams;</span> ';
					like[2] = '<span id="icon_neutral" class="icon" style="color: #fff;">&diams;</span> ';
					like[3] = '<span id="icon_dislike" class="icon" style="color: #a00;">&diams;</span> ';
				}else{
					like[1] = '<span id="icon_like" class="icon" style="color: #fff;">&diams;</span> ';
					like[2] = '<span id="icon_neutral" class="icon" style="color: #aaa;">&diams;</span> ';
					like[3] = '<span id="icon_dislike" class="icon" style="color: #fff;">&diams;</span> ';
				}

				var newdiv = document.createElement('div');
				document.getElementById("profil").insertBefore(newdiv,document.getElementById("profil").children[2]);
				document.getElementById("profil").children[2].innerHTML = '<div class="ourcss" style="float: right; margin-right: 15px;">'
					+ like[1] +'<a id="like" href="javascript:void(0)">Gefällt mir</a><br>'
					+ like[2] +'<a id="neutral" href="javascript:void(0)">Neutral</a><br>'
					+ like[3] +'<a id="dislike" href="javascript:void(0)">Nicht mein Typ</a></div><div style="clear: right;">'
					+'</div>';
				document.getElementById("profil").removeChild(document.getElementById("profil").children[3]);
				document.getElementById("profil").removeChild(document.getElementById("profil").children[3]);

				// hook up events
				document.getElementById("like").addEventListener('click', fkLike, false);
				document.getElementById("neutral").addEventListener('click', fkNeutral, false);
				document.getElementById("dislike").addEventListener('click', fkDislike, false);
			}
		}
		if( cfg['fk.trackMsgs'] ){
			var msgCnt = GM_getValue("fk.msgCnt."+currProfileId);
			if(msgCnt){
				if(document.getElementById("profil").children[6].children[1]){	// not all profile feature all entries...
					document.getElementById("profil").children[6].children[1].innerHTML += "<div class='ourcss'>schon "+ msgCnt +"x geschrieben</div>";
				}else{
					document.getElementById("profil").children[5].children[1].innerHTML += "<div class='ourcss'>schon "+ msgCnt +"x geschrieben</div>";
				}
			}
		}
		if( cfg['fk.ageAppendFromUrl'] ){
			if( location.href.match(/age=/) ){
				var age = getParam(location.search,"age");

				var items = document.getElementById("profil").getElementsByTagName("h1");
				items[0].innerHTML += " ("+ age +")";
			}
		}
		if( cfg['fk.bigPic'] ){
			//thanks zas-kar! 1live BigPic
			var i=document.getElementsByTagName('img');
			for (var j=i.length-1; j>1; j--) {
				var linkdata =  i[j].getAttribute("src");
				if (linkdata.match("image") == "image" ) {
					linkdata=linkdata.replace(/image/,'image');
					var newi = document.createElement ('img');
					newi.src = linkdata;
					newi.style.height = "400px";
					i[j].parentNode.replaceChild( newi ,i[j]);
				}
 			}
		}
	}
}else if( location.href.match(/studivz\.net|meinvz\.net/) && cfg['vz.on']){
	if( location.href.match(/\/Search\/|\/Friends\/|\/Groups\/Memberlist\//) ){
		if( cfg['vz.bigImages'] ){
			var img = document.getElementsByTagName("img");
			for(var i=0;i<img.length;i++){
				if(img[i].src.match(/-m\./)){
					link = img[i].src;
					img[i].src = link.replace("-m.jpg", ".jpg");
					img[i].parentNode.parentNode.className = null;
				}
			}
		}
		if( cfg['vz.biggerPaginator'] ){
			document.body.innerHTML += '<STYLE type="text/css">.pager {font-size: 18pt; padding: 5px;}</STYLE>';
		}
	}
}else if( location.href.match(/tonight\.rp-online\.de\//) && cfg['tonight.on']){
	if( location.href.match(/tonightNightflash\/albums\//) ){
		if( cfg['tonight.photoDLLink'] ){
			var img = document.getElementById("Grid-Page-Center-Content").getElementsByTagName("img");

			// this has performance problems! todo
			for(var i=0;i<img.length;i++){
				if(img[i].width == 640){
					link = img[i].src;
					link = link.replace(".nf-vga", "");
					div = img[i].parentNode.parentNode;

			//		alert(link);
					div.innerHTML += '<a href="' + link + '">download</a>';
				}
			}
		}
	}
}else{

}


// ---- functions ----

function fkLike() {
	SetValue("fk.like."+currProfileId,1);
	document.getElementById("icon_like").style.color = '#0a0';
	document.getElementById("icon_neutral").style.color = '#fff';
	document.getElementById("icon_dislike").style.color = '#fff';
}
function fkNeutral() {

	DelValue("fk.like."+currProfileId);
	document.getElementById("icon_like").style.color = '#fff';
	document.getElementById("icon_neutral").style.color = '#aaa';
	document.getElementById("icon_dislike").style.color = '#fff';
}
function fkDislike() {
	SetValue("fk.like."+currProfileId,0);
	document.getElementById("icon_like").style.color = '#fff';
	document.getElementById("icon_neutral").style.color = '#fff';
	document.getElementById("icon_dislike").style.color = '#a00';
}

function fkTrackMsg() {
	var msgCnt = GM_getValue("fk.msgCnt."+currProfileId, 0);
	msgCnt = msgCnt + 1;
	SetValue("fk.msgCnt."+currProfileId, msgCnt);
	// alert('msgCnt: '+ msgCnt);
}

function SetValue(key,val) {
	GM_setValue(key, val);
	// alert('Set: '+ key +', '+ val);
}
function DelValue(key) {
	if(typeof GM_deleteValue == 'function'){
		GM_deleteValue(key);
	}else{
		SetValue(key, -99);
	}
}



// ---- utils ----

function zeroPad(num,count){
	var numZeropad = num + '';
	while(numZeropad.length < count) {
		numZeropad = "0" + numZeropad;
	}
 return numZeropad;
}

function getParam(q,arg) {
	if (q.indexOf(arg) >= 0) {
		var pntr = q.indexOf(arg) + arg.length + 1;
		if (q.indexOf("&", pntr) >= 0) {
			return q.substring(pntr, q.indexOf("&", pntr));
		} else {
			return q.substring(pntr, q.length);
		}
	} else {
		return null;
	}
}