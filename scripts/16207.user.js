// dwh v 0.2.1
// last modif: 7.9.2006 10:57:51
//
// ==UserScript==
// @name           dA-watch-hack
// @namespace      http://eldar.cz/myf/pub/firefox/
// @description    this is evil, do not use it
// @include        http://my.deviantart.com/devwatch/
// ==/UserScript==
//

function dA_watch_hack() {
 if ( document.getElementById('message-center') ) {
  document.getElementById('nav-east').style.display = 'none';
  document.getElementById('content').style.width = '100%';
  var Buff = new Array();
  var IDprefix = 'dAwAhA';
  var maxpic = prompt("how many to fetch: (all=100)", "100")-1;
  var devThumbsNr = 0;
  var pendingPicURL = 'http://i.deviantart.com/icons/activity/deviation.gif';
  for (var i=0; i < document.links.length; i++) {
   curlink = document.links[i];
   if (curlink.href.search(/http:\/\/www.deviantart.com\/deviation\/./) != -1 ) { // && devThumbsNr < maxpic
    Buff.push(curlink.href);
    picID = IDprefix+''+devThumbsNr;
    curlink.parentNode.innerHTML += '<img style="display:block;margin-left:24px;" src="'+pendingPicURL+'" id="'+picID+'" title="'+pendingPicURL+'" onclick="a=this.src;this.src=this.title;this.title=a;">';
    devThumbsNr++;
   }
  }

  function addPic(nr) {
   if (maxpic == -1) return;
   innerID = IDprefix+''+nr;
   GM_xmlhttpRequest(
    {
     method: 'GET',
     url: Buff[nr],
     onload: function(xmlhttp) {
      if ( document.getElementById(innerID) ) {
       tmpPic = document.getElementById(innerID);
       // tmpPicSrcUrl = xmlhttp.responseText.match(/http:\/\/(tn|ic)[^"]+/)[0];
       tmpDeviationPage = xmlhttp.responseText;
       tmpPicSrcUrl =  tmpDeviationPage.match(/"src".+"src":"([^"]+)/)[1];
       tmpPicSrcUrl = tmpPicSrcUrl.replace(/\\/g,'');
       tmpPic.src = tmpPicSrcUrl;
       tmpFullPicSrcUrl = tmpDeviationPage.match(/"src":"([^"]+)/)[1];
       tmpFullPicSrcUrl = tmpFullPicSrcUrl.replace(/\\/g,'');
       tmpPic.title = tmpFullPicSrcUrl;
      }
      if ( nr < Buff.length-1 && nr < maxpic ) { //
       nr++;
       addPic(nr);
      } else {
       alert('... support dA guys and get a subscription as soon as you can afford it ; )');
      }
     }
    }
   )
  }

  addPic('0');

 }
}

dA_watch_hack();

