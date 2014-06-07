// ==UserScript==
// @name        YouTubeHTML5
// @namespace   YouTubeHTML5
// @description Change YouTube Flash player into html5 one.
// @include     http://youtube.com*
// @include     http://www.youtube.com*
// @include     https://youtube.com*
// @include     https://www.youtube.com*
// @exclude     *.youtube.com/embed/*
// @version     2013-06-28
// ==/UserScript==

(function() {

// Don't run on frames or iframes
if (location.href != window.parent.window.location) return; //	Empèche l'éxécution du script sur les iframes et assimilés

//Get Video Id
function youtube_parser(url){
	var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/; // regExp from http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
	var match = url.match(regExp);
	if(match != null){return match[1]}else{return false};
	}
if(youtube_parser(location.href)==false) return; // Arrêt script si aucune id de video n'est récupérable

//Node functions
function getById(id){	return document.getElementById(id);}

/* function parent(Node){	return Node.parentNode;}

function appendMyElement(parent,child) {	parent.appendChild(child);}

function removeMyElement(Node) {	parent(Node).removeChild(Node);}

function replaceMyElement(parentNode,NewNode,ReplacedNode) {	parentNode.replaceChild(NewNode,ReplacedNode);} */

//Replace YouTube Flash player
	GM_registerMenuCommand('YouTube to embed iFrame',function(){createNewPlayer("http://www.youtube.com/embed/"+youtube_parser(location.href))},'y');
	window.addEventListener ("load",setTimeout(function(){createNewPlayer("http://www.youtube.com/embed/"+youtube_parser(location.href))},4000) , false);
	GM_registerMenuCommand('YouTubeHTML5 - Resize player',resizePlayer,'r');

	function resizePlayer(){
		var watch7content=document.getElementById('watch7-content');
		var watch7sidebar=document.getElementById('watch7-sidebar');
		var watch7playlisttraycontainer=document.getElementById('watch7-playlist-tray-container');
		(document.getElementById("player-api")).style.overflow="visible";
		if(NewPlayer.style.width.indexOf("640")!=-1){
			NewPlayer.style.width="853px";
			NewPlayer.style.height="480px";
			watch7content.style.marginTop=watch7sidebar.style.marginTop="100px";
			if(watch7playlisttraycontainer!=null){
				watch7playlisttraycontainer.style.cssText="height: 510px;";
				watch7playlisttraycontainer.parentNode.style.cssText="width: 250px; left: 205px; height: 515px;";
			}
		} else {
			NewPlayer.style.width="640px";
			NewPlayer.style.height="390px";
			watch7content.style.marginTop=watch7sidebar.style.marginTop="";
			if(watch7playlisttraycontainer!=null){
				watch7playlisttraycontainer.style.cssText="";
				watch7playlisttraycontainer.parentNode.style.cssText="";
			}
		}
	}

	function createNewPlayer(url){
		NewPlayer = document.createElement("iframe");
		NewPlayer.id = "html5_embed_player"
		NewPlayer.setAttribute("src",url);
		NewPlayer.style.width="640px";
		NewPlayer.style.height="390px";
		NewPlayer.setAttribute('frameborder', '"0"');
		NewPlayer.setAttribute('allowFullScreen', '');
		var api=document.getElementById("player-api");
		if(api == null){return;} else{
			api.removeChild(document.getElementById("movie_player"));
			if((document.getElementById("html5_embed_player"))!=null){
				api.removeChild(document.getElementById("html5_embed_player"));
			}
			api.appendChild(NewPlayer);
		}
		ExtendButton=document.createElement("button");
		ExtendButton.id="fullinterest_extend_player";
		ExtendButton.className="yt-uix-button";
		ExtendButton.type="button";
		ExtendButton.title="Extend/Reduce player";
		ExtendButton.innerHTML='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAARCAYAAAA2cze9AAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAA CXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QYDDBQrdIkobgAAABl0RVh0Q29tbWVudABD cmVhdGVkIHdpdGggR0lNUFeBDhcAAAEgSURBVDjLtZQxboAwDEV%2FQopIhbqxcf8TcAy2XICB E7SokSIn7lAcAQUKKv2LkbCfv36UqL7vX6y1qixLZYxRACD1qoiIpYYQ2HvPAGAEXFWVBoCi KG6BZSbGyLOpBADeezYCbtv2Ew9oHMdXWaDvRnBFOd5tFHVdrxqZeVWVUqsqmqYpR0REPJ%2Fh 2vkwDG8sJAApJU4p8bJHa6201nlOfW96XzonItbSvBxWW1sn2vYKyxij9JWh5fIdx4fS%2BEcd wre5730vew7h2wP7beisV1hExFqu7hn4KPOjGWEaAIgx5p9N03z8JWdhhRB%2BOn9C2XkIgQEk a%2B3uzbuRPQDAOZfkZTTyPDrnqsefXHkeJaeyLBUR8dUFAp4TyKyu6%2FgLcMbPDX4NbAAAAAAA SUVORK5CYII%3D"/>';
		if((document.getElementById("fullinterest_extend_player"))==null){
			(document.getElementById('watch7-secondary-actions')).appendChild(ExtendButton);
		}
		ExtendButton.addEventListener ("click", resizePlayer, false);
	}
})();
