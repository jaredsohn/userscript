// ==UserScript==
// @name           [Allocine] Enlève publicité dans les bandes annonces
// @namespace      http://blog.kodono.info/wordpress/greasemonkey/
// @version        20110719
// @description    Enlève l'attente/la publicité lorsqu'on regarde une bande annonce sur Allociné
// @include        http://www.allocine.fr/video/*
// ==/UserScript==

//unsafeWindow.clearInterval(unsafeWindow.ac.adRenderer.preRollInterval);
var $ = unsafeWindow.jQuery.noConflict();

var ID = $('meta[property="og:video"]').attr("content").replace("http://www.allocine.fr/blogvision/","");
var len = $('div.picturezone img[title^="Photo :"][src*="'+ID+'"]').length;
var src = $('div.picturezone img[title^="Photo :"][src*="'+ID+'"]').attr("src");
if (src != undefined) {
  // 1ère méthode
  var video = $('meta[property="og:video"]').attr("content");
  $('.colcontent').prepend('<iframe id="myiframe" src="'+video+'" width="760px" height="464px" style="display:none" />')

  // 2ème méthode
  var path = src.match(/medias\/nmedia(.*)\.jpg/)[1];
  var url = "http://h.fr.mediaplayer.allocine.fr/nmedia" + path + "_h_001.flv";
  /*var mtch = url.match(/\_fa([0-9])\_/);
  if (mtch && mtch.length==2 && mtch[1] == 2 && len == 1)
    url = url.replace(/_fa2_/,"_fa1_");*/
  var params = "flv="+url+"&autoload=1&showstop=1&showvolume=1&showtime=1&showplayer=autohide&showfullscreen=1";
  $('.colcontent').prepend('<object id="monplayer" type="application/x-shockwave-flash" data="http://flv-player.net/medias/player_flv_maxi.swf" width="760px" height="464px"><param name="movie" value="http://flv-player.net/medias/player_flv_maxi.swf" /><param value="true" name="allowFullScreen"><param name="FlashVars" value="'+params+'" /></object><p><a href="#" onclick="jQuery(\'#monplayer,#myiframe\').toggle()">si ça ne fonctionne pas, cliquez ici</a></p>');

  $("#V6_player,#preRoll,.flashvideoplayer").remove();
}