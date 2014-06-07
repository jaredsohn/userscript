// ==UserScript==
// @name           Megavideo Unlimited
// @description    Replaces the original megavideo player with the megaporn in order to bypass the time limit :3
// @include        http://www.megavideo.com/?v=*
// ==/UserScript==

function updatePlayer() {
    video_id = location.href.split('v=')[1];
    player_obj = document.getElementById('mvplayer');
    player = '<object id="mvplayer" width="' + player_obj.width + '" height="' + player_obj.height + '" type="application/x-shockwave-flash"' +
    'data="http://www.megaporn.com/v/mv_player.swf?userid=cookie&v=' + video_id + '+++">' +
    '<param value="true" name="allowFullScreen"/>' +
    '<param value="transparent" name="wmode"/>' +
    '<param value="never" name="allowscriptaccess"/>' +
    '<param value="internal" name="allownetworking"/>' +
    '<param value="http://www.megaporn.com/v/mv_player.swf?userid=cookie&v=' + video_id + '+++" name="movie"/>' +
    '</object>';
    player_div = document.getElementById('playerdiv');
    player_div.innerHTML = player;
    document.getElementById('switch_div').style.visibility = 'hidden';
}

function addButton() {
    div = document.createElement("div");
    div.id = "switch_div";
    button = document.createElement("a");
    button.className = "switch_button";
    button.innerHTML = "Switch to unlimited player"; 
    button.addEventListener("click", function() { updatePlayer(); }, false);
    div.appendChild(button);
    document.body.appendChild(div);
    addStyle();
}

function addStyle() {
    var styles = [
        '#switch_div {position: fixed;bottom: 5px; right: 5px; z-index: 2512;opacity: 0.8;color:#333;font-size:11px;font-family:Verdana;font-weight:bold; cursor:pointer}',
        '.switch_button { border:1px solid #B6D9EE;background-color: #DFF1FD;padding:4px; font-size:11px;font-family:Verdana;color:#1F85C1 !important;text-decoration:none; display: block; }',
        '#switch_div a:hover { border:1px solid #AE150E;background-color:#CE1A10;color:#FFFFFF !important;}'
    ];
    GM_addStyle(styles.join("\r\n"));
}

addButton();
