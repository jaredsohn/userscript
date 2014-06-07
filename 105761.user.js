// ==UserScript==
// @name           trakt.tv - popup notifications when friends watch something
// @namespace      http://userscripts.org/scripts/show/105761
// @description    Shows notifications whenever a friend starts/stops watching something
// @include        http*://belgarion.com/hublog*
// ==/UserScript==

if(!GM_getValue){alert("You need the newest version of Greasemonkey to run this script. Please upgrade.");return;}
if(GM_getValue("gmTraktUsername")==undefined){setTraktUsername();}
if(GM_getValue("gmTraktAPIKey")==undefined){setTraktAPIKey();}

var bChanged,json,jsonOld,timerTrakt,timerDebug;

var iMinInterval	= GM_getValue("gmMinInterval",3);
var bShowWatching	= GM_getValue("gmShowWatching",true);
var bDebug			= GM_getValue("gmDebug",false);
var sTraktUsername	= GM_getValue("gmTraktUsername","kju");
var sTraktAPIKey	= GM_getValue("gmTraktAPIKey","12345678");

GM_registerMenuCommand("trakt.tv - Set username to check",setTraktUsername);
GM_registerMenuCommand("trakt.tv - Set API key",setTraktAPIKey);


function setTraktUsername(){
	var sTraktUsername=GM_getValue("gmTraktUsername","kju");
	GM_setValue("gmTraktUsername",prompt("Username to check (usually your own)",sTraktUsername)||sTraktUsername);
	reload();
}

function setTraktAPIKey(){
	var sTraktAPIKey=GM_getValue("gmTraktAPIKey","kju");
	GM_setValue("gmTraktAPIKey",prompt("Your API key - find it here http://trakt.tv/api-docs/authentication",sTraktAPIKey)||sTraktAPIKey);
	reload();
}

function main(){
	
	stylePopups();
	updateTrakt();
	timerTrakt=window.setInterval(updateTrakt,iMinInterval*60*1000);
	debugStart();

}

function debugStart(){
	if(bDebug){
		window.setTimeout(function() { removeNotification("debug") }, 3000);
		debug("Notification started for user <b>"+sTraktUsername+"</b>");
	}
}

var updateTrakt=function(){
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://api.trakt.tv/user/friends.json/"+sTraktAPIKey+"/"+sTraktUsername,
		onload: function(x){

			json=eval("("+x.responseText+")");
			if(jsonOld==null)jsonOld=json;

			if(checkResponse()){
				bChanged=false;

				if(bShowWatching)checkWatching();
				checkWatched();

				if(bChanged)jsonOld=json;
			}

		}
	});
}

function reload(){window.location.reload();}

function checkCredentials(){
	return true;
}

function leadingzero(inputS){
	var s=String(inputS);
	if(s.length<2)s="0"+s;
	return s;
}

function time(){
	var d=new Date();
	return leadingzero(d.getHours())+":"+leadingzero(d.getMinutes());
}

function notify(inputID, inputS){
	// Borrowed/modified from to Nikita Vasilyev (http://userscripts.org/scripts/show/43780)
	var s=inputS;
	var popups=document.getElementById("popups")||document.createElement("popups");
	popups.id="popups";
	document.documentElement.appendChild(popups);
	popups.addEventListener("mouseover",function(e){
		var t=getTarget(e.target);
		if(t.tagName=="POPUP"){
			t.firstChild.style.opacity=1;
		};
	},false);
	popups.addEventListener("mouseout",function(e){
		var t=getTarget(e.target);
		if(t.tagName=="POPUP"){
			t.firstChild.style.opacity=0;
		};
	},false);
	popups.addEventListener("click",function(e){
		var t=getTarget(e.target);
		if(t.tagName=="POPUP"){
			deNotify(t);
		}
	},false);
	var elem=document.createElement("POPUP");
	elem.style.opacity=0;
	var popup=elem.cloneNode(false);
	popup.setAttribute("class",inputID);
	popup.title=time();
	popup.innerHTML="<img id=\"button_close\" style=\"opacity:0;position:absolute;margin-top:-19px;right:-20px;border:0\"src=\"http://christianarvidsson.se/icons/button_close_30x30.png\">"+s;
	popups.appendChild(popup);
	var i=1;
	var showing=setInterval(function(){
		popup.style.opacity=i/10;
		i++;
		if(i>9){
			popup.style.opacity=1;
			clearInterval(showing);
		}
	},30);
}

function removeNotification(inputS){
	// var notification = document.evaluate("//popup/text()[contains(.,'"+inputS+"')]",document,null,9,null).singleNodeValue.parentNode;
	var elem = document.getElementsByClassName(inputS);
	for(var i=0;i<elem.length;i++){
		deNotify(elem[i]);
		if(inputS=="debug")break;
	}
}

function deNotify(inputS){
	var t = inputS;
	var i=9;
	var closing = setInterval(function(){
		i--;
		t.style.opacity=i/10;
		if(i<2){
			//t.style.display="none";
			t.parentNode.removeChild(t);
			clearInterval(closing);
		}
	},30);
}

function getTarget(inputS){
	var s=inputS;
	if((s.tagName=="B")||(s.tagName=="SPAN")||(s.tagName=="IMG"))s=s.parentNode;
	return s;
}

function debug(inputS){
	if(bDebug)notify("debug","<b>"+time()+"</b> - "+inputS);
}

function checkResponse(){
	if(json.status=="failure"){
		debug("checkResponse - Error ("+json.error+")");	// trakt servers are overloaded hourly :/
	}else{
		return true;
	}
}

function getID(inputS){
	var s=inputS;
	if(s.type=="movie"){
		s=s.movie.title+s.movie.year;
	}else if(s.type=="episode"){
		s=s.show.title+getSeasionEpisode(s);
	}
	return stripValid(s);
}

function getAvatar(inputS){
	var s=inputS;
	return "<img src=\""+s.avatar+"\" width=\"58\" height=\"58\">";
}

function getUsername(inputS){
	var s=inputS;
	return "<a id=\"username\" href=\"http://trakt.tv/user/"+s.username+"\">"+s.username+"</a>";
}

function getUser(inputS){
	var s=inputS;
	return getAvatar(s)+getUsername(s);
}

function getMovie(inputS){
	var s=inputS;
	return "<a id=\"movie\" href=\""+s.movie.url+"\">"+s.movie.title+" ("+s.movie.year+")</a><br><span>"+s.movie.tagline+"</span>";
}

function getShow(inputS){
	var s=inputS;
	return "<a id=\"movie\" href=\""+s.show.url+"\">"+s.show.title+"</a><br><span>"+s.episode.title+" "+getSeasionEpisode(s)+"</span>";
}

function getSeasionEpisode(inputS){
	var s=inputS;
	return "(s"+leadingzero(s.episode.season)+"e"+leadingzero(s.episode.number)+")";
}


function getInfo(inputS){
	var s=inputS;
	if(s.length==0){
		s="n/a";
	}else if(s.type=="movie"){
		s=getMovie(s);
	}else if(s.type=="episode"){
		s=getShow(s);
	}else{
		debug("getInfo - Unknown type ("+s.type+")");
	}
	return s;
}

function getProtected(inputS){
	var s=inputS;
	if(s.protected){
//		debug(s.username+" is protected");
		return true;
	}
}

function stripValid(inputS){
	return inputS.replace(/[^a-z0-9]/ig,"");
}

function stripHTML(inputS){
	return inputS.replace(/<(.|\n)*?>/ig,"");
}

function checkWatching(){
	var s=json;
	var i,u,sAction;
	for(i=0;i<s.length;i++){
		if(!getProtected(s[i])){
			u=s[i].watching;
			sAction="";
			if((u.length==0)&&(jsonOld[i].watching.length!=0)){
				sAction="stopped";
				u=jsonOld[i].watching;
			}else if((u.length!=0)&&(jsonOld[i].watching.length==0)||(getInfo(u)!=getInfo(jsonOld[i].watching))){
				sAction="started";
			}
			if(sAction!=""){
				bChanged=true;
				notify(s[i].username+getID(u),getUser(s[i])+" "+sAction+" watching "+getInfo(u));
			}
		}
	}
}

function checkWatched(inputS){
	var s=json;
	var i,u;
	for(i=0;i<s.length;i++){
		if((!getProtected(s[i]))&&(s[i].watched.length!=0)){
			u=s[i].watched[0];
				if(getInfo(u)!=getInfo(jsonOld[i].watched[0])){
				bChanged=true;
				var sID = s[i].username+getID(u);
//				notify(sID,getUser(s[i])+" watched "+getInfo(u));
				removeNotification(sID);
			}
		}
	}
}

function addGlobalStyle(inputS){
	var sHead,sStyle;
	sHead=document.getElementsByTagName("head")[0];
	if(!sHead)return;
	sStyle=document.createElement("style");
	sStyle.type="text/css";
	sStyle.innerHTML=inputS;
	sHead.appendChild(sStyle);
}

function stylePopups(){
	addGlobalStyle("#popups {\
		font:13px sans-serif;\
		position:absolute;\
		top:0;\
		right:0;\
		margin:5px 10px 0px 0px;\
		padding:0;\
		list-style-type:none;\
		float:left;\
		cursor:pointer;\
		text-align:left;\
		z-index:9999;\
	}\
	#popups popup {\
		background-color:black;\
		background-image:-moz-linear-gradient(black 66%,#333333);\
		color:white;\
		border-bottom:1px solid rgba(0,0,0,0.3);\
		margin:5px 0 0 0;\
		float:right;\
		clear:both;\
		outline:0;\
		white-space:pre;\
		border-radius:7px;\
		box-shadow:0px 0px 20px #888;\
		padding:10px;\
		-moz-user-select:-moz-none;\
		cursor:hand;\
	}\
	#popups img {\
		vertical-align:text-top;\
		float:left;\
		float:left;\
		border:1px solid #D0D0C5;\
		margin-right:10px\
	}\
	#popups a {\
		text-decoration:none;\
		border:none;\
		font-weight:bold;\
	}\
	#popups a:hover {\
		text-decoration:underline;\
	}\
	#popups a#username {\
		color:white;\
	}\
	#popups a#movie {\
		color:#4DBCE9;\
	}\
	#popups span {\
		white-space:normal;\
		color:#777;\
	}");
}

if (checkCredentials) main();