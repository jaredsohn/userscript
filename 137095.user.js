// ==UserScript==
// @name   sc2casts-controlbar-remover 
// @namespace  foo
// @description Remove control-bar on embedded youtube-videos on sc2casts.com and try to set 1080p-Quality (will default to the next lower quality, if unavailable)
// @include  http://sc2casts.com*
// @version     1.1
// ==/UserScript==

var body = document.getElementsByTagName('body')[0];
var onPlayerReadyNode = document.createElement ('script');
onPlayerReadyNode.type = "text/javascript";
var onPlayerReadyJS  = 'onYouTubePlayerReady = function (playerId) {'+
'player = document.getElementById(playerId);'+
'console.log(player);'+
'player.setPlaybackQuality(\'hd1080\');' +
'};';
onPlayerReadyNode.textContent = onPlayerReadyJS;
body.appendChild (onPlayerReadyNode);

var objNodes = document.evaluate('//object[embed]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0;i<objNodes.snapshotLength;i++) {
  var node = objNodes.snapshotItem(i);
  var searchRE = new RegExp('http://www\.youtube\.com/v/(.*?)&hl=en_US','g');
	var childNodes = document.evaluate('./embed[@src]',node,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var j=0; j<childNodes.snapshotLength;j++) {
		var embNode = childNodes.snapshotItem(j);
		if(searchRE.test(embNode.src)) {
			embNode.src = embNode.src.replace(searchRE,'http://www.youtube.com/v/$1&hl=en_US&controls=0&version=3&enablejsapi=1&playerapiid=sc2game' + i);
			embNode.id="sc2game"+i;
			embNode.setAttribute("allowscriptaccess","always");
		}
	}
}

var paramNodes = document.evaluate('//param[starts-with(@value,\"http://www.youtube\")]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0;i<paramNodes.snapshotLength;i++) {
  var node = paramNodes.snapshotItem(i);
  var searchRE = new RegExp('http://www\.youtube\.com/v/(.*?)&hl=en_US','g');
  node.value = node.value.replace(searchRE, 'http://www.youtube.com/v/$1&hl=en_US&controls=0&version=3&enablejsapi=1&playerapiid=sc2game' + i);
}

