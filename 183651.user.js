// ==UserScript==
// @name        OEsoft-Fulltono
// @namespace   OEsoft-Fulltono
// @description Escuchar musica online sin publicidad en mp3.
// @include     *fulltono.com*
// @version     1.2
// @grant       none
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

$(document).ready(function() {  
$("div").hide();
//css

$("body").html("<center><input name='q' id='q' type='text'><input onclick='document.location=&quot;http://www.fulltono.com/e/&quot;+$(&quot;#q&quot;).val()' name='buscar' type='button' value='Buscar'><div id='main'></div><div id='listDownload'></div></center>");
var mp3s="";
var titles="";
var listD="";
var count=1;
   $.each(myPlaylist, function (i, music) {
    mp3s=mp3s+music.mp3+"|";  
    titles=titles+music.title+"|";  
    listD=listD+"<tr style='background:#404040;color:#fff;'><td class='tblBorder' style='border-left: 1px solid #555;border-top: 1px solid #555;padding: 10px;text-align: left;'>"+count+"</td><td class='tblBorder' style='border-left: 1px solid #555;border-top: 1px solid #555;padding: 10px;text-align: left;'>"+music.title+"</td><td class='tblBorder' style='border-left: 1px solid #555;border-top: 1px solid #555;padding: 10px;text-align: left;'><a href='"+music.mp3+"' target='_blank'><img src='http://www.iconhot.com/icon/png/hp-dock/512/hp-music-folder-dock.png' width='36px' height='36px'/> </a></td></tr>";
    count=count+1;
    }); 
    mp3s=mp3s.substring(0,mp3s.length-1);
    titles=titles.substring(0,titles.length-1);
$("#main").html("<br><br><object type='application/x-shockwave-flash' data='http://flash-mp3-player.net/medias/player_mp3_multi.swf' width='160' height='100' id='dewplayer' name='dewplayer'><param name='wmode' value='transparent'> <param name='movie' value='http://flash-mp3-player.net/medias/player_mp3_multi.swf' /> <param name='flashvars' value='mp3="+mp3s+"&title="+titles+"&autostart=1&autoreplay=1&showtime=1&randomplay=0&nopointer=1&bgcolor=FFFFFF'/></object>");

$("#listDownload").html("<table class='zebra' style='border: 1px solid #555;border-collapse: collapse;border-spacing: 0;width:50%;-webkit-box-shadow:  0px 2px 1px 5px rgba(242, 242, 242, 0.1);box-shadow:  0px 2px 1px 5px rgba(242, 242, 242, 0.1);'><thead><tr style='background:#404040;color:#fff;'><th class='tblTitle' style='border-left: 1px solid #555;border-bottom: 1px solid #828282;padding: 20px; background-color:#151515 !important;background-image: -webkit-gradient(linear, left top, left bottom, from(#151515), to(#404040)) !important;background-image: -webkit-linear-gradient(top, #151515, #404040) !important;background-image:    -moz-linear-gradient(top, #151515, #404040) !important;background-image:     -ms-linear-gradient(top, #151515, #404040) !important;background-image:      -o-linear-gradient(top, #151515, #404040) !important;background-image:         linear-gradient(top, #151515, #404040) !important;color:#fff !important;font-weight:normal;'>#</th><th class='tblTitle' style='border-left: 1px solid #555;border-bottom: 1px solid #828282;padding: 20px; background-color:#151515 !important;background-image: -webkit-gradient(linear, left top, left bottom, from(#151515), to(#404040)) !important;background-image: -webkit-linear-gradient(top, #151515, #404040) !important;background-image:    -moz-linear-gradient(top, #151515, #404040) !important;background-image:     -ms-linear-gradient(top, #151515, #404040) !important;background-image:      -o-linear-gradient(top, #151515, #404040) !important;background-image:         linear-gradient(top, #151515, #404040) !important;color:#fff !important;font-weight:normal;'>Title</th><th class='tblTitle' style='border-left: 1px solid #555;border-bottom: 1px solid #828282;padding: 20px; background-color:#151515 !important;background-image: -webkit-gradient(linear, left top, left bottom, from(#151515), to(#404040)) !important;background-image: -webkit-linear-gradient(top, #151515, #404040) !important;background-image:    -moz-linear-gradient(top, #151515, #404040) !important;background-image:     -ms-linear-gradient(top, #151515, #404040) !important;background-image:      -o-linear-gradient(top, #151515, #404040) !important;background-image:         linear-gradient(top, #151515, #404040) !important;color:#fff !important;font-weight:normal;'>Download</th></tr></thead><tbody>"+listD+"</tbody></table>");

});