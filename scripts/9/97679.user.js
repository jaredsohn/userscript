// ==UserScript==
// @name  TubeMirror: Watch Youtube Videos not available in your country without a proxy
// @namespace  http://www.tubemirror.com
// @description TubeMirror: Watch Youtube Videos not available in your country without a proxy
// @include http://youtube.com/*v=*
// @include http://www.youtube.com/*v=*

// @homepage http://www.tubemirror.com
// @run-at document-start
// ==/UserScript==

var videoId = getUrlParameter('v')

var tubemirrorLogo = '<img src="http://www.tubemirror.com/siteimages/header.jpg">';
var tubemirrorUrl = 'http://www.tubemirror.com/video/' + videoId;
var tubemirrorTextLink = '<a title="TubeMirror" target="_blank" href="' + tubemirrorUrl + '">Watch on TubeMirror</a>';
var tubemirrorLogoLink = '<div id="tubemirrorLogoLink"><a title="TubeMirror" target="_blank" href="' + tubemirrorUrl + '"><p>YouTube has blocked this video!<br>Watch it on:</p>' + tubemirrorLogo + '</a></div>';

addTubeMirrorBox();

if (document.getElementById("watch-player-unavailable-message")) {
  rewriteUnavailableMessage();
}



function rewriteUnavailableMessage(){
  var styles = [
    '#tubemirrorLogoLink a {font-size:16px;font-weight:bold;color:#60AFFC;display:block;text-decoration:none;outline:none;}',
    '#tubemirrorLogoLink a p {padding:10px;}',
  ];

  GM_addStyle(styles.join("\r\n"));
  
  document.getElementById("watch-player-unavailable-message").innerHTML = tubemirrorLogoLink;
}

function addTubeMirrorBox() {
  var styles = [
    '#tubemirrorBox {position: fixed; right: 5px; bottom: 40px; z-index: 1000;opacity: 0.8;}',
    '#tubemirrorBox a {font-size:11px;font-family:Verdana;font-weight:bold;color:#509FFC !important;text-align:center;outline:none;background-color: #DFF1FD;border:1px solid #B6D9EE;padding:4px;display:block;text-decoration:none;}',
    '#tubemirrorBox a:hover {border:1px solid #AE150E;background-color:#CE1A10;color:#FFFFFF !important;text-decoration:none;}',
    '#tubemirrorBox img, #tubemirrorBox a:hover img {background:none;margin:0px;padding:0px;border:none;vertical-align:middle}'
  ];

  GM_addStyle(styles.join("\r\n"));

  var tubemirrorBox = document.createElement('div');
  document.body.appendChild(tubemirrorBox);
  tubemirrorBox.id = 'tubemirrorBox';
  tubemirrorBox.innerHTML = tubemirrorTextLink;
}

function getUrlParameter(name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}
