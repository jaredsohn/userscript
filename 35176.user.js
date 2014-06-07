// ==UserScript==
// @name           YouTube - Previews, click-to-play, download, no flash
// @namespace      http://khopis.com/scripts
// @description    No autoplay; buttons to play w/ movie plugin, flash, or d/l
// @include        http://*.youtube.com/watch*
// @include        http://youtube.com/watch*
// @author         Adam Katz <scriptsATkhopiscom>
// @copyright      2008 by Adam Katz
// @license        AGPL v3+
// @version        0.5
// @lastupdated    2008-10-13
// ==/UserScript==
/*
 * Very loosely inspired by http://userscripts.org/scripts/show/30454
 *
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */

// EMBED:   true: use MP4 plug-in.  false: use the youtube flash player.
var embed = true;

// PREVIEWS:  true:  extra screen captures.  false:  only the main capture.
var previews = true;

// HIDE COMMENTS:  true:  hide youtube comments.  false:  show them.
var hideComments = true;


/////////////////////////////////////////////////////////

var video_player = document.getElementById('watch-player-div');

if (video_player) {

  GM_addStyle( ("" // styles come first so things aren't ugly while loading
  + "#play_btn { position:absolute; top:150px; left:0;"
  +            " width:66px; padding:120px 223px; opacity:0.75; }"
  + "#play_btn:hover { opacity:1; cursor:pointer; }"
  + "#no_play_btn { display:none; }"
  + "#still0 { height:290px; }"
  + ".stilli { display:inline; border:solid white; border-width:0 0 1px 1px; }"
  + "#play_video_link { display:block; margin:0 -32px 0 -6px; }"
  + "#watch-player-div { height:385px; width:480px; }"
  + "#control_table a.action-button { margin:0 5px; }"
  + "#control_table td { vertical-align:top; text-align:center; }"
  ).replace(/}/g,"}\n") ); // wrap generated CSS for debugging and tweaking

  // Not sure why "display:none" and other CSS tricks couldn't kill this ad...
  var ad = document.getElementById("watch-channel-brand-div");
  if (ad) ad.parentNode.removeChild(ad);

  var video_id = location.search.replace(/.*v=/,'').replace(/&.*/,'');
  var video_t = document.getElementById("movie_player").
                getAttribute("flashvars").replace(/.*&t=/,'').replace(/&.*/,'');
  var video_src = location.protocol + '//' + location.host
                + '/get_video?video_id=' + video_id + '&t=' + video_t
                + '&fmt=18';
  var old_player = video_player.innerHTML;
  var new_player = '<embed type="video/mp4" src="'
        + video_src.replace(/&/g,"&amp;") + '" '
        + 'height="385" width="480" scale="aspect"></embed>';

  function renderPlayer(player) {
    return "javascript:void("
           + "document.getElementById('watch-player-div').innerHTML='"
           + player + "')";
  }

  video_player.innerHTML = '';

  var stills = document.createElement("div");
  stills.onClick = "alert('yay?'); replacePlayer()";

  var play_btn = document.createElement("img");
  play_btn.id = "play_btn";
  play_btn.src = "http://www.youtube.com/img/btn_play_quicklist_16x16.gif";
  stills.appendChild(play_btn);

  var still0 = document.createElement("img");
  still0.src = "http://i3.ytimg.com/vi/" + video_id + "/0.jpg";
  still0.style.cssFloat = "left";
  still0.id = "still0";
  stills.appendChild(still0);
  if (previews) {
    for (var i=1; i<=3; i++) { // three more stills on the side
      var stilli = document.createElement("img");
      stilli.src = still0.src.replace(/0.jpg/, i + ".jpg");
      stilli.className = "stilli";
      stills.appendChild(stilli);
    }
  } else {
    still0.style.width="480px";
    still0.style.height="320px";
  }

  var play_video_link = document.createElement("a");
  play_video_link.id = "play_video_link";
  play_video_link.href = renderPlayer( embed ? new_player : old_player );

  play_video_link.appendChild(stills);
  video_player.appendChild(play_video_link);


  function playLink(player, text, id) {
    var play_link = document.createElement("a");
    play_link.href = player;
    if (id != null) { play_link.id = id; }
    play_link.className = "action-button";
    play_link.innerHTML = '<span class="action-button-leftcap"></span>'
                        + '<span class="action-button-text">' + text + '</span>'
                        + '<span class="action-button-rightcap"></span>';
    var play_node = document.createElement("td");
    play_node.appendChild(play_link);

    return play_node;
  }

  var control_row = document.createElement("tr");
  control_row.appendChild( playLink(renderPlayer(new_player),
                           "Play with MP4 plug-in", "mp4play") );
  control_row.appendChild( playLink(renderPlayer(old_player),
                           "Play with Flash") );
  control_row.appendChild( // tricky re-insertion of quoted quotes in href...
    playLink( renderPlayer(video_player.innerHTML.replace(/href="[^"]*./,''))
                + '; void(document.getElementById("play_video_link").href'
                + '=document.getElementById("mp4play").href)',
              "Stop") );
  control_row.appendChild(playLink(video_src, "Download MP4"));

  var control_table = document.createElement("table");
  control_table.id = "control_table";
  control_table.appendChild(control_row);

  video_player.parentNode.insertBefore(control_table, video_player.nextSibling);

  if (hideComments) {
    var com = document.getElementById("watch-comment-post-comment").parentNode;
    if (com) { com.className = com.className.replace(/(^| )expanded\b/g,''); }
  }

}
