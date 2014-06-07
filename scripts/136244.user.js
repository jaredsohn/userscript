// ==UserScript==
// @name           4chan Sound Player
// @namespace      ms11
// @description    Allows to play the posted sounds on 4chan (based on Triangle's 4chan Sound Script dev)
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @include        http://archive.foolz.us/*
// @include        https://archive.foolz.us/*
// @version        0.59
// @updateURL      http://userscripts.org/scripts/source/136244.user.js
// ==/UserScript==
//changes:
//0.59
//  small changes in css 
//  added save overwrite to prevent save issues (tries keep as many things as possible)
//0.58
//  reimplement greentext and spoiler tagging, now hopefully bug-free
//0.57
//  remove greentext and spoiler tagging, to prevent backlink issues
//0.56
//  fix shuffle (and some other things I can't remember)
//0.55
//  long tags no longer break the list, or the title in the header
//0.54
//  fixed inline quotes with Mayhem's 4chanX
//0.53
//  now every sound has proper length
//  line heigth on archive fixed
//0.52
//  new window feature removed until I find a good way to implement
//0.51
//   player now move back into the window if you move it out of it
//0.50
//  fix seeking (it will no longer seek to the beginning of the track when you click the slider)
//0.49
//  fix inline quotes
//0.48
//  fix shuffle script hang
//  fix moving
//  ui changes
//  added forward/backward for sounds without end-time (only revelant in firefox)
//  full image instead of thumbnail
//  some minor fixes
//0.47
//  implement playlist reorder
//0.46
//  added revokeObjectURL
//0.45
//  a bad way to test autoupdate
//0.44
//  added seeking
//0.43
//  added close button
//  fix: removing items from playlist, if never used [NW]
//0.42
//  added volume control
//  added progress display
//0.2-0.41
//	removed players array, and id-s
//	added th variable to xmlhttp, to pass thumbnail link
//	removed some functions related to progressbar
//  THIS IS A BETA VERSION AND I DON'T THINK IT WILL EVER HAVE A RELEASE
//  pull blob url change from tripflags script (remove b64 function)

var chrome = (navigator.userAgent+'').indexOf(' Chrome/') != -1;
var archive = (document.location+'').indexOf('boards.4chan.org') == -1;
var xmlhttp = chrome ? get_chrome:get_grease;

function insertAfter(referenceNode, newNode)
{
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function byClass(items, cl)
{
	for (var i = 0; i < items.length; i++)
	{
		if (items[i].classList.contains(cl))
		{
			return items[i];
		}
	}
	return null;
}

function s2ab(text)
{
	var dicks = new ArrayBuffer(text.length);
	var docks = new Uint8Array(dicks);
	for (var a = 0; a < text.length; a++)
	{
		docks[a] = text.charCodeAt(a);
	}
	return dicks;
}
function get_chrome(uri, tag, callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', uri, true);
	xhr.overrideMimeType('text/plain; charset=x-user-defined');
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(e)
	{
		if (this.status == 200)
		{
			callback(findOgg(this.response, tag), tag, uri);
		}
	}
	xhr.send();
}
//modified to be able to pass thumbnail link
function get_grease(uri, tag, callback)
{
	GM_xmlhttpRequest({
		method: "GET",
		url: uri,
		overrideMimeType: 'text/plain; charset=x-user-defined',
		onload: function(e)
		{
			if (e.status == 200)
			{
				var text = e.responseText;
				var dicks = s2ab(text);
				callback(findOgg(dicks, tag), tag, uri);
			}
		}
	});
}
function findOgg(raw, tag)
{
	var tagU = s2ab('[' + tag + ']');
	var skip = s2ab(' "\r\n');
	var oggU = s2ab('OggSxx');
	var tag8 = new Uint8Array(tagU);
	var skp8 = new Uint8Array(skip);
	var ogg8 = new Uint8Array(oggU);
	ogg8[4] = 0;
	ogg8[5] = 2;
	var data = new Uint8Array(raw);
	var eof = skp8.byteLength + 12;
	var ptr = -1;
	
	// keep comparing data to [tag] until match
	for (var i = 0; i < data.byteLength - eof; i++)
	{
		var match = true;
		// match the tag and brackets
		for (var j = 0; j < tag8.byteLength; j++)
		{
			if (data[i+j] != tag8[j])
			{
				match = false;
				break;
			}
		}
		if (!match)
		{
			continue;
		}
		i += tagU.byteLength;
		// skip whitespace and newline
		for (var j = 0; j < skp8.byteLength; j++)
		{
			if (data[i] == skp8[j])
			{
				j = -1;
				i++;
			}
		}
		// match against ogg header
		for (var j = 0; j < ogg8.byteLength; j++)
		{
			if (data[i+j] != ogg8[j])
			{
				match = false;
				break;
			}
		}
		if (!match)
		{
			continue;
		}
		ptr = i;
		break;
	}
	if (ptr < 0)
	{
		// matching against tag failed, try just the ogg header
		for (var i = 0; i < data.byteLength - eof; i++)
		{
			var match = true;
			for (var j = 0; j < ogg8.byteLength; j++)
			{
				if (data[i+j] != ogg8[j])
				{
					match = false;
					break;
				}
			}
			if (match)
			{
				ptr = i;
				break;
			}
		}
		if (ptr > 0)
		{
			var ofs = [-1,-1];
			var find = s2ab('[]');
			var fin8 = new Uint8Array(find);
			for (var j = ptr; j > ptr - 100; j--)
			{
				if (data[j] == fin8[0] && ofs[1] > 0)
				{
					ofs[0] = j;
					break;
				}
				else if (data[j] == fin8[1] && ofs[0] < 0)
				{
					ofs[1] = j;
				}
			}
			if (ofs[0] > 0 && ofs[1] > 0)
			{
				var newtag = '';
				for (var j = ofs[0]; j <= ofs[1]; j++)
				{
					newtag += String.fromCharCode(data[j]);
				}
				tag = newtag;
			}
		}
	}
	if (ptr > 0)
	{
		//find next ogg header
		//ogg8
		var end = -1;
		for (var i = (ptr+1); i < data.byteLength - eof; i++)
		{
			var match = true;
			for (var j = 0; j < ogg8.byteLength; j++)
			{
				if (data[i+j] != ogg8[j])
				{
					match = false;
					break;
				}
			}
			if (match) //find the tag before
			{
				var ofs = [-1,-1];
				var find = s2ab('[]');
				var fin8 = new Uint8Array(find);
				for (var j = i; j > i - 100; j--)
				{
					if (data[j] == fin8[0] && ofs[1] > 0)
					{
						ofs[0] = j;
						break;
					}
					else if (data[j] == fin8[1] && ofs[0] < 0)
					{
						ofs[1] = j;
					}
				}
				if(ofs[0] > 0) {
					i = ofs[0];
				}
				
				
				end = i;
				break;
			}
		}
		if(end>0) 
		return raw.slice(ptr,end);
		else
		return raw.slice(ptr);
	}
}
function getPostID(o)
{
	var o = o.getAttribute('id');
	if (!archive)
	{
		o = o.substr(1);
	}
	return parseInt(o);
}
function create(type, parent, attributes)
{
    var element = document.createElement(type);
    for (attr in attributes)
    {
        element.setAttribute(attr, attributes[attr]);
    }
    if (parent != undefined)
    {
        parent.appendChild(element);
    }
    return element;
} 
function sectos(sec) {
	var m = Math.floor(sec/60);
	var s = +(sec-m*60);
	return m+(s<10?":0":":")+s;
}
function fixFFbug() {
	if (!chrome && !playerPlayer.paused) { 
		// Workaround for Firefox bug #583444
		var interval = setInterval(function() {
			try { playerCurrentDuration = playerPlayer.buffered.end(0); }
			catch(ex) { playerCurrentDuration = 0; }
			/*if (playerCurrentDuration != 0)	{
				clearInterval(interval);
			}*/
		}, 200);
	}
}

var lastPost = null;	// last post that was hyperlink()ed
var lastHyper = 0;		// unixtime*1000 for last hyperlink()
var isPlayer = false;
var playerDiv = null;
var playerList = null;
var playerTitle = null;
var playerTime = null;
var playerPlayer = null;
var newWindow = null;
var playerCompact = false;
var playerCurrentDuration = 0;
var playerMovingListItem = null;
var playerSaveData = null;
var playerSettings = null;
var playerStyle = null;
var playerSettingsCSS = null;
var playerDefault = {saveVer:1,right:0,bottom:0,shuffle:0,repeat:0,volume:1,
			css:'#playerList {margin-top: 15px; width: 180px; height: 200px; overflow: auto; position: relative; right: 0px; bottom: 0px; margin-left:auto; margin-right:auto;}'+
			'#playerDiv {line-height:15px; color: darkgrey;  width: 200px; background: #e7e7e7; position: fixed; z-index: 20;}'+
			'#playerHeader {width: 200px; height: 30px; cursor: move; text-align:center; position: relative; right: 0px; top: 0px;}'+
			'#playerControls {display: block; text-align: center;}'+
			'.playerListItem {cursor:pointer;, padding-top: 1px;}'+
			'.playerListItem:hover {color: black}'+
			'.playerListItemMoveTarget {width:180px; height: 10px; font-size: 10px !important; text-align: center; margin-top: -2px;}'+
			'#playerImage {max-height: 120px; max-width: 180px; display: block; margin-left: auto; margin-right: auto;}'+
			'#playerClose {top: 0px; right: 0px; position: absolute; font-size: 10px; display: block; text-align: right; z-index: 10;}'+
			'#playerToggleSet {top: 0px; left: 0px; position: absolute; font-size: 10px; display: block; text-align: right; z-index: 10;}'+
			'#playerChangeMode, .playerListItemDelete, .playerListItemMove {float:right;}'+
			'#playerDiv a {color: darkgray !important; text-decoration: none !important;} #playerDiv a:visited {color: darkgray !important;} #playerDiv a:hover {color: black !important;}'+
			'#playerVolume {height: 14px; width: 60px; display:block; margin-left:10px; position: absolute;}'+
			'#playerVolumeSeekHeader {margin-left: 10px; height:7px; width:180px; background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAHCAYAAAChk2fpAAAAAXNSR0IArs4c6QAAAJpJREFUWMPtV0kKACEMq4N/7Bv7SudUKOKCjo5UkpvWrTGGGkQkERExc6BFEJFk18vb2lfatzR25blW53oCmkeei+0fjWl7J/9/cBJPbe6dwJMX1+JrNnbLXTw7FmXmoC8GggXcCxrYBzWLvISwLjsbu8F4IiTiU9Q1EX4pR1ByDHxeAMC1Q7devK2xS/HaLx7oc9OK9+be4NIvFNCOIPRVVS4AAAAASUVORK5CYII=")}'+
			'#playerCurrentVolume {height: 14px; width: 5px; position:relative; display:block; background: darkgrey;}'+
			'#playerSeekbar {height: 14px; width: 120px; display:block; margin-left:70px; position: absolute;}'+
			'#playerSeekbarCurrent {height: 14px; width: 5px; position:relative; display:block; background: darkgrey;}'+
			'.playerControlLink {margin-left: 2px; margin-right:2px;}'+
			'.playerListItemTag {width: 140px; height: 13px; overflow: hidden; display: inline-block;}'+
			'#playerTitle {width: 160px; height:15px; overflow:hidden; margin-left:auto; margin-right:auto;}'+
			'#playerTime {width:160px; height:15px; overflow:hidden; margin-left:auto; margin-right:auto;}'+
			'#playerSettings {width:200px; height:500px; position: absolute; top: 0px; left: -210px;}'
};

function documentMouseDown(e) {
	if(e.target == playerTitle || e.target==playerTime || e.target==playerHeader){
	e.preventDefault();
	playerHeader.down = true;
	playerHeader.oldx = e.clientX;
	playerHeader.oldy = e.clientY;
	}
}
function documentMouseUp(e) {
	if(playerHeader.down){
	e.preventDefault();
	playerHeader.down = false;
	putInsidePage();
	}
}
function documentMouseMove(e) {
	if(e.target == playerHeader){
	e.preventDefault();
	}
	if(playerHeader.down) {
		var cr = Number(playerDiv.style.right.replace("px",""))
		var cb = Number(playerDiv.style.bottom.replace("px",""))
		playerDiv.style.right = (cr + playerHeader.oldx - e.clientX) + "px";
		playerDiv.style.bottom = (cb + playerHeader.oldy - e.clientY) + "px";
		playerHeader.oldx = e.clientX;
		playerHeader.oldy = e.clientY;
	}
}
function putInsidePage() {
	if(playerDiv.clientHeight + Number(playerDiv.style.bottom.replace("px","")) > window.innerHeight) {
		playerDiv.style.bottom = (window.innerHeight - playerDiv.clientHeight) + "px";
	}else if(Number(playerDiv.style.bottom.replace("px","")) < 0) {
		playerDiv.style.bottom = "0px";
	}
	if(playerDiv.clientWidth + Number(playerDiv.style.right.replace("px","")) > window.innerWidth) {
		playerDiv.style.right = (window.innerWidth - playerDiv.clientWidth) + "px";
	}else if(Number(playerDiv.style.right.replace("px","")) < 0) {
		playerDiv.style.right = "0px";
	}
}
function loadConf() {
playerSaveData = JSON.parse(localStorage.getItem("4chanSP"))
		if(!playerSaveData) {
			playerSaveData = playerDefault;
		}else if(!playerSaveData.saveVer) {		
			playerSaveData.css = playerDefault.css;
		}
}
function showPlayer() {
	if(!isPlayer) {
		
		loadConf();
		playerDiv = create('div', undefined, {"id":"playerDiv"});
		
		playerDiv.style.right = playerSaveData.right+'px';
		playerDiv.style.bottom = playerSaveData.bottom+'px';
		
		
		playerHeader = create('div', playerDiv, {"id": "playerHeader"});
		playerTitle = create('div', playerHeader, {"id": "playerTitle"});
		playerTime = create('div', playerHeader, {"id": "playerTime"});
		playerImage = create('img', playerDiv, {"id": "playerImage"});
		playerControls = create('div', playerDiv, {"id": "playerControls"});
		playerVolumeSeekHeader = create('div', playerDiv, {"id": "playerVolumeSeekHeader"});
		playerVolume = create('div', playerDiv, {"id": "playerVolume"});
		playerCurrentVolume = create('div',playerVolume, {"id": "playerCurrentVolume"});
		playerVolume.addEventListener('click', function(e) {
		var n=Math.round((e.layerX-5)/5)*5;
		if(n < 0 || n > 55)return;
		playerCurrentVolume.style.left = n +"px";
		playerPlayer.volume=n/55;
		});
		playerVolume.addEventListener("DOMMouseScroll",function(e) {
			e.preventDefault();
			var n = Number(playerCurrentVolume.style.left.replace("px",""));
			if(e.detail<0) {
				n+=5;
			}else if(e.detail>0) {
				n-=5;
			}
			n=Math.round(n/5)*5;
			if(n < 0 || n > 55)return;
			playerCurrentVolume.style.left = n +"px";
			playerPlayer.volume=n/55;
		});
		
		playerSeekbar = create('div', playerDiv, {"id":"playerSeekbar"});
		playerSeekbarCurrent = create('div', playerSeekbar, {"id":"playerSeekbarCurrent"});
		
		playerSeekbar.addEventListener('click', function(e) {
			if(e.target == playerSeekbar) {
				e.preventDefault();
				if(e.layerX < 0 || e.layerX > 120) return;
				var n = e.layerX/120;
				if ((chrome?this.duration:playerCurrentDuration) != 0) {
					playerPlayer.currentTime = (chrome?this.duration:playerCurrentDuration) * n;
				}
			}
		});
		
		playerList = create('div', playerDiv, {"id":"playerList"});
		playerControls2 = create('div',playerDiv, {"id": "playerControls2"});
		playerPlayer = create('audio', playerDiv, {"id": "playerPlayer"});
		//playerCurrentVolume.style.left = (playerPlayer.volume*170) + "px";
		playerPlayer.addEventListener('ended', function() {playerPlayPause.innerHTML = ">"; nextMusic(true);});
		playerPlayer.volume = playerSaveData.volume;
		//copy from Triangle's script
		playerPlayer.addEventListener('play', function(e) {
			fixFFbug();
		});
		//end
		fixFFbug();
		playerPlayer.addEventListener('timeupdate', function(e) {
			if(this.currentTime > 0){
				var x = (this.currentTime/(chrome?this.duration:playerCurrentDuration)) * 115;
				if(x > 115) {
					fixFFbug();
					playerSeekbarCurrent.style.left = "0px";
					return;
				}
				playerSeekbarCurrent.style.left = x + "px";
				playerTime.innerHTML = sectos(Math.round(this.currentTime)) + "/" + sectos(Math.round(chrome?this.duration:playerCurrentDuration)) || "[unknown]";
			}
		});
		
		playerPlayer.addEventListener('play', function() {playerPlayPause.innerHTML="| |";});
		playerPlayer.addEventListener('pause', function() {playerPlayPause.innerHTML=">";});
		playerRepeat = create('a', playerControls2, {"href": "#"});
		switch(playerSaveData.repeat){
			case 1: playerRepeat.innerHTML = "[RA]"; playerRepeat.title = "Repeat all"; break;
			case 2: playerRepeat.innerHTML = "[R1]"; playerRepeat.title = "Repeat one"; break;
			case 0: playerRepeat.innerHTML = "[RO]"; playerRepeat.title = "Repeat off"; break;
		}
		playerRepeat.addEventListener('click', function(e) {
			e.preventDefault();
			switch(playerSaveData.repeat){
				case 0: playerSaveData.repeat=1; playerRepeat.innerHTML = "[RA]"; playerRepeat.title = "Repeat all"; break;
				case 1: playerSaveData.repeat=2; playerRepeat.innerHTML = "[R1]"; playerRepeat.title = "Repeat one"; break;
				case 2: playerSaveData.repeat=0; playerRepeat.innerHTML = "[RO]"; playerRepeat.title = "Repeat off"; break;
			}
		});
		
		
		playerShuffle = create('a', playerControls2, {"href": "#"});
		playerShuffle.title = playerSaveData.shuffle ? "Shuffle" : "By order";
		playerShuffle.innerHTML = playerSaveData.shuffle ? "[SH]" : "[BO]";
		playerShuffle.addEventListener('click', function(e) {
			e.preventDefault();
			playerSaveData.shuffle = !playerSaveData.shuffle;
			if(playerSaveData.shuffle) {
				playerShuffle.title = "Shuffle";
				playerShuffle.innerHTML = "[SH]";
			}else{
				playerShuffle.title = "By order";
				playerShuffle.innerHTML = "[BO]";
			}
		});
		
		
		playerClose = create('a', playerDiv, {"id":"playerClose","href":"#"});
		playerClose.innerHTML="[X]";
		playerClose.addEventListener('click', function(e) {
			e.preventDefault();
			playerSaveData.right = playerDiv.style.right.replace("px","");
			playerSaveData.bottom = playerDiv.style.bottom.replace("px","");
			playerSaveData.volume = playerPlayer.volume;
			
			localStorage.setItem('4chanSP', JSON.stringify(playerSaveData));
					
			document.body.removeChild(playerDiv);
			playerDiv = null;
			isPlayer = false;
		});
		
		
	
		
		playerChangeMode = create('a', playerControls2, {"id": "playerChangeMode", "href": "#"});
		playerChangeMode.innerHTML = "[M]";
		playerChangeMode.title = "Change view";
		playerChangeMode.addEventListener('click', function(e) {e.preventDefault(); swmode();});

		
		
		playerPrev = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
		playerPrev.innerHTML = "|<<";
		playerPrev.addEventListener('click', function(e) {
			e.preventDefault();
			prevMusic();
		});
		playerBackward = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
		playerBackward.innerHTML = "<<";
		playerBackward.addEventListener('click', function(e) {
			e.preventDefault();
			playerPlayer.currentTime -= 5;
		}); 
		playerPlayPause = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
		playerPlayPause.innerHTML = ">";
		playerPlayPause.addEventListener('click', function(e) {
			e.preventDefault();
			/*if(playerPlayPause.innerHTML == "PLAY"){
				playerPlayer.play();
				playerPlayPause.innerHTML = "PAUSE";
			}else{
				playerPlayer.pause();
				playerPlayPause.innerHTML = "PLAY";
			}*/
			if(playerPlayer.paused)
				playerPlayer.play();
			else
				playerPlayer.pause();
		});
		playerForward = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
		playerForward.innerHTML = ">>";
		playerForward.addEventListener('click', function(e) {
			e.preventDefault();
			playerPlayer.currentTime += 5;
		}); 
		playerNext = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
		playerNext.innerHTML = ">>|";
		playerNext.addEventListener('click', function(e) {
			e.preventDefault();
			nextMusic(false);
		});
		
		
		playerHeader.down = false;
		
		document.addEventListener('mousedown',documentMouseDown);
		document.addEventListener('mouseup',documentMouseUp);
		document.addEventListener('mousemove',documentMouseMove);
		
		
		isPlayer = true;
		document.body.appendChild(playerDiv);
		addCss();
		
	}else{
		//display: ??
	}
}

function swmode(tocompact) {
	if(tocompact === undefined) {
		tocompact = !playerCompact;
		playerCompact = !playerCompact;
	}
	var s = tocompact ? "none" : "block";
	playerImage.style.display = s;
	playerList.style.display = s;
	playerControls2.style.marginTop = tocompact ? "15px" : "0px";
	putInsidePage();
}
function showMoverTargets(show) {
	if(show === undefined) {
		show = true;
	}
	var mvs = document.getElementsByClassName('playerListItemMoveTarget');
	for(var i = 0; i < mvs.length;i++) {
		if(show && mvs[i].parentNode == playerMovingListItem) continue;
		mvs[i].style.display = (show ? "block" : "none");
	}
}

function addMusic(data,tag,url) {
	var list = playerList;
	var item = create('li',list, {"class":"playerListItem"});
	//item.innerHTML = tag;
	var tagelem = create('span',item,{"class":"playerListItemTag"});
	
	tagelem.innerHTML = tag;
	tagelem.title = tag;
	var del = create('a', item, {"href":"#","class":"playerListItemDelete"});
	del.innerHTML="[X]";
	del.addEventListener('click', function(e) {
		e.preventDefault();
		var li = e.target.parentNode;
		(window.webkitURL || window.URL).revokeObjectURL(li.blobulr);
		li.parentNode.removeChild(li);
	});
	var move = create('a', item, {"href":"#","class":"playerListItemMove"});
	move.innerHTML="[M]";
	move.addEventListener('click', function(e) {
		e.preventDefault();
		playerMovingListItem = e.target.parentNode;
		showMoverTargets(false);
		showMoverTargets();
	});
	var mover = create('div', item, {"class":"playerListItemMoveTarget"});
	mover.style.display = "none";
	var mvl = create('a', mover, {"href":"#"});
	mvl.addEventListener('click',function(e) {
		e.preventDefault();
		var li = e.target.parentNode.parentNode;
		playerMovingListItem.parentNode.removeChild(playerMovingListItem);
		insertAfter(li,playerMovingListItem);
		showMoverTargets(false);
	});
	mvl.innerHTML = "[here]";
	var BlobBuilder = (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder);
    var bb = new BlobBuilder();
    bb.append(data);
    var blob = bb.getBlob('audio/ogg');
	item.blobulr = (window.webkitURL || window.URL).createObjectURL(blob);
	item.tag = tag;
	item.uri = url;
	item.tagelem = tagelem;
	tagelem.addEventListener('click', function(e) {
		if(e.target.parentNode.blobulr){
			var items = list.getElementsByTagName('li');
			for(var i in items) {
				if(items[i].setAttribute)
				items[i].setAttribute("playing",false);
			}
			e.target.parentNode.setAttribute("playing",true);
			
            playerPlayer.src = e.target.parentNode.blobulr;
			playerTitle.innerHTML = e.target.parentNode.tag;
			playerTitle.title = e.target.parentNode.tag;
			playerPlayer.play();
			playerCurrentVolume.style.left = (playerPlayer.volume * 55)+"px";
			playerImage.src = e.target.parentNode.uri;
			
		}
	});
	if(playerPlayer.paused) { tagelem.click(); }
}
	
function prevMusic() {
	var items = playerList.getElementsByTagName('li');
	for(var i = 0; i < items.length;i++)
	{
		if(items[i].getAttribute("playing") == "true")
		{
			if(i == 0)
				items[items.length-1].tagelem.click();
			else
				items[i-1].tagelem.click();
			return;
		}
	}
	if(items.length > 0) items[0].tagelem.click();
}

function nextMusic(auto) {
	var items = playerList.getElementsByTagName('li');
	for(var i = 0; i < items.length;i++)
	{
		if(items[i].getAttribute("playing") == "true")
		{
			if(auto && playerSaveData.repeat == 2){ items[i].tagelem.click(); return;}
			
			if(playerSaveData.shuffle && items.length > 1) {
			var rnd = Math.floor(Math.random()*items.length);
			while(rnd == i) {
				rnd = Math.floor(Math.random()*items.length);
			}
			items[rnd].tagelem.click(); return;
			}
			if(i == (items.length - 1)) {
				if(auto && playerSaveData.repeat == 0){ return;}
				items[0].tagelem.click();
			}
			else
				items[i+1].tagelem.click();
			return;
		}
	}
	if(items.length > 0) items[0].tagelem.click();
}

function hyperlinkone(target,second) {

	var links = target.getElementsByClassName('soundlink');
	if(links.length < 1) {
		if(second) return;
		else
		setTimeout(function() {hyperlinkone(target, true); },200);
	};
	var post = target.getElementsByTagName(archive ? 'article':'blockquote')[0];
	var a = null;
	var p = null;
	if (!archive) {
		p = post;
		a = byClass(target.getElementsByTagName('a'), 'fileThumb');
		if (!a) return;
	}else{
		a = byClass(post.getElementsByTagName('a'), 'thread_image_link');
		p = byClass(post.getElementsByTagName('div'), 'text');		
		if (!a || !p) return;
	}
	for(var i = 0;i < links.length;i++){
		var link = links[i];
		link.realhref = a.href;
		link.tag = link.innerHTML.replace("[","").replace("]","");
		link.addEventListener('click', function(e) {
			e.preventDefault();
			this.innerHTML = '[loading]';
            xmlhttp(this.realhref, this.tag, function(music, tag, href) {   
				showPlayer(false);
				addMusic(music,tag,href);
				try{
				e.target.innerHTML = '[' + tag + ']';
				}catch(e) {}
            });
		});
	}
}

function hyperlink() {
	var tmpDate = (new Date()).getTime();
	if (tmpDate < lastHyper + 2000) {
		return;
	}
	lastHyper = tmpDate;
	var newLastPost = null;
	var posts = archive? 'article':'blockquote';
	posts = document.getElementsByTagName(posts);
	newLastPost = getPostID(posts[posts.length-1]);
	if (newLastPost == lastPost) {
		return;
	}
	for (var i = 0; i < posts.length; i++) {
		// dom-insertion listener lags the fuck out on longer threads
		if (lastPost && getPostID(posts[i]) <= lastPost) {
			// fixed (somewhat)
			continue;
		}
		var repeat = true;
		while (repeat) {
			repeat = false;
			var a = null;
			var p = null;
			if (!archive) {
				p = posts[i];
				a = byClass(posts[i].parentNode.getElementsByTagName('a'), 'fileThumb');
				if (!a) continue;
			}else{
				a = byClass(posts[i].getElementsByTagName('a'), 'thread_image_link');
				p = byClass(posts[i].getElementsByTagName('div'), 'text');
				
				if (!a || !p) continue;
			}
			for (var j = 0; j < p.childNodes.length; j++){
				var match = null;
				var node = p.childNodes[j];
				if (node.nodeType != 3) {
					if(node.className != "spoiler" && node.className != 'quote') {
						continue;
					}else{
						for(var k = 0; k < node.childNodes.length; k++) {
							
							var subnode = node.childNodes[k];
							if(subnode.nodeType != 3) {continue;}
							if (!(match = subnode.nodeValue.match(/(.*)\[([^\]]+)\](.*)/))) {
								continue;
							}
							repeat = true;
							var href = a.href;
							var code = match[2];
							var link = document.createElement('a');
							link.innerHTML = '[' + code + ']';
							link.className = 'soundlink';
							//link.href = href;
							link.href = "javascript:void(0)";
							link.realhref = href;
							link.tag = code;
							link.addEventListener('click', function(e) {
								e.preventDefault();
								this.innerHTML = '[loading]';
								xmlhttp(this.realhref, this.tag, function(music, tag, href) {   
									showPlayer(false);
									addMusic(music,tag,href);
									e.target.innerHTML = '[' + tag + ']';
								});
							});
							subnode.nodeValue = match[1];
							insertAfter(subnode, link);
							var text = document.createTextNode(match[3]);
							insertAfter(link, text);
						}
					}
				}else{
				
				if (!(match = node.nodeValue.match(/(.*)\[([^\]]+)\](.*)/))) {
					continue;
				}
				repeat = true;
				var href = a.href;
				var code = match[2];
				var link = document.createElement('a');
				link.innerHTML = '[' + code + ']';
				link.className = 'soundlink';

				link.href = "javascript:void(0)";
				link.realhref = href;
				link.tag = code;
				link.addEventListener('click', function(e) {
					e.preventDefault();
					this.innerHTML = '[loading]';
                    xmlhttp(this.realhref, this.tag, function(music, tag, href) {   
						showPlayer(false);
						addMusic(music,tag,href);
                        e.target.innerHTML = '[' + tag + ']';
                    });
				});
				node.nodeValue = match[1];
				insertAfter(node, link);
				var text = document.createTextNode(match[3]);
				insertAfter(link, text);
				}
			}
		}
	}
	lastPost = newLastPost;
}


	hyperlink();
	document.body.addEventListener('DOMNodeInserted', function(e)
	{
		hyperlink(); // I am a strong void hyperlink who dont need no e
	});
	document.addEventListener('DOMNodeInserted', function(e) {
		if(e.target.classList.contains('inline')){
			hyperlinkone(e.target);
		}
	});

function addCss() {
	if(!playerStyle){
	if(!playerSaveData.css)
		playerSaveData.css = playerDefault.css;
	playerStyle = document.createElement('style');
	playerStyle.setAttribute('type', 'text/css');
	playerStyle.innerHTML = playerSaveData.css;
	
	document.getElementsByTagName('head')[0].appendChild(playerStyle);
	}
}

