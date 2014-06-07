// ==UserScript==
// @name           Youtube Wider Watching
// @namespace      rkm
// @description    Widens the view so you can get better video
// @include        http://*.youtube.com/watch*
// ==/UserScript==

// Note: This version is 100% rewritten because HD broke it
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { alert("There was a problem with YouTube Wider Watching!");return }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#watch-other-vids { margin-top: 510px; } #movie_player{ width: 960px !important; height: 504px !important; } #watch-this-vid.watch-wide-mode #watch-player-div { padding-left: 0px !important; } #watch-video-quality-setting.low #watch-high-quality-link, #watch-video-quality-setting.high #watch-low-quality-link { display:inline; float:right; left:830px; position:absolute; top:80px; z-index:999999; }');

/*
<div class="clear" id="showcommunity"><br/><a href="#" onclick="document.getElementById('watch-other-vids').display = '';javascript:document.getElementById('watch-this-vid-info').display = '';javascript:document.getElementById('showcommunity').display = ''">Show Community Section</a></div>
*/
document.getElementById("footer").previousSibling.previousSibling.setAttribute("id","showcommunity");
//document.getElementById("showcommunity").innerHTML = '<br/><a href="#" onclick="document.getElementById(\'watch-other-vids\').style.display = \'inline\';document.getElementById(\'watch-this-vid-info\').style.display = \'inline\';document.getElementById(\'showcommunity\').style.display = \'none\'">Show Community Section</a>';
document.getElementById("watch-vid-title").getElementsByTagName("h1")[0].innerHTML += ' <small style="font-size:75%;font-weight: light !important;">posted by <a href="'+document.getElementById("watch-channel-stats").getElementsByTagName("a")[0].href+'">'+document.getElementById("watch-channel-stats").getElementsByTagName("a")[0].innerHTML+'</a></small>';
document.getElementById("copyright").innerHTML += " | YouTube Wider Watching by <a href='http://www.therkm.net'>kennydude</a>";