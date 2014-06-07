// ==UserScript==
// @name        Clean Myspace Junk
// @description Cleans the heap of junk and ads on myspace
// @namespace   117504
// @include     http://*.myspace.com/*
// @include     http://myspace.com/*
// @require     http://sizzlemctwizzle.com/updater.php?id=61948
// ==/UserScript==
//version 0.7
removeContent('marketing');
removeContent('todayOnMySpace');
removeContent('googlead2');
removeContent('celebrity2');
removeContent('gafc');
removeContent('splashlinks');
removeContent('googleLogo_Header');
removeContent('friendspace');
removeContent('bulletins');
removeContent('friendUpdate');
removeContent('findFriends');
removeContent('msbeacon');
removeContent('today'); //front page
removeContent('DCF218161762');
removeContent('CMS_ViewFriends_Gads_ABCDE');
removeContent('narrow_ad');
removeContent('module-2'); //friends page
removeContent('karaoke'); 
removeContent('whatsHot');
removeContent('SponseredLinks');
removeContent('Programs');
removeContent('marketingUnit');
removeContent('inthenews');
removeContent('artistsactivity');
removeContent('featuredPlaylist');
removeContent('heroUnit');
removeContent('MusicAndVideoPicks');
removeContent('CelePromoMedRecAd');
removeContent('msaaUpdatesDiv'); 
removeContent('ctlAd');
removeContent('msmphTitle');
removeContent('PlaylistStats');
removeContent('msmpSendAdd');
removeContent('ProfilePlaylists');
removeContent('ShowsEvents');//music
removeContent('tv_spl_jmb'); 
removeContent('topvids');
removeContent('tv_spl_jmb_wrp');
removeContent('popChannels');
removeContent('marketingPromo');
removeContent('WatchedVideosModule'); //Myspace video cleanups
removeContent('home-feature-events'); //events cleanup
removeContent('topad');
removeContent('topmidad'); //games cleanup
removeContent('tkn_skyscraper'); 
removeContent('ctl00_ctl00_cpMain_Google_Ad');
removeContent('tkn_medrec');
removeContent('tkn_leaderboard');
removeContent('tkn_leaderboardDiv');
removeContent('ad-hdr');
removeContent('tkn_googleads');
removeContent('tkn_adspecial2');
removeContent('birthday');
removeContent('marketingbox');
removeContent('home-local-photos');
removeContent('home-medrec');
removeContent('sp-logo');
removeContent('SponseredLinks');
removeContent('sponsoredLinks');
removeContent('squareAd');
removeContent('tkn_adspecial1');
removeContent('ctl00_ctl00_ctl00_cpMain_cpMain_rcr_CMS_Forums');
removeContent('ctl00_ctl00_ctl00_ctl09_ctl00_ctl01_ctl00_ctl01'); //cleaning up ads everywhere
var elmModify = document.getElementById('col1');
elmModify.style.cssFloat = 'left';//style login
var foot = document.getElementById('footer');
foot.setAttribute("style", "font-size: 9px; padding-bottom: 3px; background-color: #FFFFFF;"); //style footer
now = location.href;
if (now.match('http://comment.myspace.com/\*')) {
  var good = document.getElementsByClassName('name');
  for (i=0;i<=good.length-1;i++) {
    good[i].setAttribute("style", "background-color: #FFFFFF; border-color: #000000;");
  }
  good = document.getElementsByClassName('check');
  for (i=0;i<=good.length-1;i++) {
    good[i].setAttribute("style", "background-color: #FFFFFF; border-color: #000000;");
  }
  good = document.getElementsByClassName('comment');
  for (i=0;i<=good.length-1;i++) {
    good[i].setAttribute("style", "background-color: #FFFFFF; border-color: #000000;");
  }
  good = document.getElementsByClassName('commentCommands');
  for (i=0;i<=good.length-1;i++) {
    good[i].setAttribute("style", "background-color: #FFFFFF; border-color: #000000;");
  }
}  //get rid of comments eyesore color

function removeContent(id) {

  var node = document.getElementById(id);

  if (node) {
	  node.parentNode.removeChild(node);
	  node = null;
  }
}

document.getElementsByClassName = function(clsName){
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for(var i = 0;i < elements.length;i++){
        if(elements[i].className.indexOf(" ") >= 0){
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++){
                if(classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if(elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}