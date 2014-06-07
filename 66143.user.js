// ==UserScript==
// @name           Rhapsody.com Playlist in App
// @namespace      userscripts.org
// @description    make the playlist page play in the rhapsody app
// @include        http://www.rhapsody.com/myrhapsody/playlists*
// @include        http://www.rhapsody.com/playlistcentral/playlistdetail*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js  
// ==/UserScript==

GM_wait();

function do_stuff(){
  var playlistLinks = [];
  var linkArray = [];
  
  $("span.playDiv, div.iconPlay").each(function(){
    trackId = $(this).html().match(/Tra\.(\d+)/i);
    playlistLinks.push(trackId[1]);
  });

  var playlistLength = playlistLinks.length;
  for (var i = 0; i < playlistLength; i++){
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://feeds.rhapsody.com/webservices/rhapprotocol.xml?rcid=Tra.'+ playlistLinks[i] +'',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
      },
      onload: function(responseDetails) {
        var linkRegex = new RegExp(/\/([\d]+)\/\<\/playback\>/);
        var playerLink = responseDetails.responseText;
        playerLink = playerLink.split(linkRegex);
        playerLink = playerLink[1].replace(linkRegex, "$1");
        linkArray.push(playerLink);
        if(linkArray.length == playlistLength){
          writeLinks(linkArray);
        }
      }
    });
  }
}

// Wait for the elements to get loaded
function GM_wait() {
  if($("span.playDiv, div.iconPlay").length < 1) { 
    window.setTimeout(GM_wait,100); 
  }
  else {  
    do_stuff(); 
  }
}

function writeLinks(linkArray){
  var rhapLink = '';
  var playerLink = '';
  for (var i = 0; i < linkArray.length; i++){
    playerLink += linkArray[i] +'+';
  }
  playerLink = playerLink.replace(/\+$/, "");
  rhapLink = rhapLinkFunc(playerLink);
  $('div[class="backgroundeaeaea padding10px"]').append(rhapLink);
  $('table.listBorder').parent().prepend(rhapLink);
};

function rhapLinkFunc(playerLink){
  var imgSrc = "data:image/gif,GIF89a%20%00%1B%00%C4%1F%00222%A9%A9%A98%7B%AB%8C%B3%CE%C7%C7%C7%FF%FF%FF%00%00%00sss%CA%DA%E6%7B%A7%C7%A5%C3%D9J%87%B3%E4%E4%E4%B8%D0%E1%8E%8E%8E%D6%E4%EE%22!!%F3%F3%F3UUUA%81%AF%EB%F1%F4%5B%92%BAf%99%BE%0E%0E%0E%F2%F6%F9%E2%EC%F3%F8%F8%F8%F6%F9%FB%3D~%AD%F9%FA%FC%FC%FC%FD%FF%FF%FF!%F9%04%01%00%00%1F%00%2C%00%00%00%00%20%00%1B%00%00%05%FF%E0\'%8Ed)%16%1D%11%ACl%40x%85)%9B%05a%DC%F8%0Di%F1%EC%7F%05G.w%E8%FD%80%85%A4R%03%18%E2%08F%99%12%F3h(%06%03%0F%C3p%81x%BD%5CJ%94%94%A44%12%0B%8E%60%9D(%04%0C%84%88%3C%C2%B8H%C6%A7%02e%90%E6%F8%17%16%09%0F%05%00%17%3CJ6%01I%25I%0D%7D%02%15%0A%0F%140%05%5BEH%05%07%06%0C%1Eb%23I%0A%02~%15%08%1BJ1npI%1E%1A%1A%10%00z%13%83\'%0D%02%13%1C%09%18%8B%99%05%12%06%11%1A%0E%00%C4%06%0E%05%B6%13%BB%05%18%B8%B90%A0%11%08%04%04v%9AC%08%05%09jY%05%08%B7%02%19F5M8%01%11C%000%C9%15%E2%A2%13%0B%A7\'uC%14%1D%108%00%D9%DE%1C%13%13%D9%DF%FC%7D%02b%83H%12%06%0E%0E%C4I%15p%C1%A0fj%14%2C*%A0%E1%97%01%00%0E%A0%A1%EAQ%60%80%1F%5D%40%02rPP%E9%20%85C3%0A%80%3C%E8%17.%15%B2Q%B9%06mLY%20C%1A%01%D9%40y%AB%003A%83%0C%1D6r%2C%B0%A1%C1%04%01%0B%F61%C2%D0%A0%82%9AQ%15%12(P%D0%00AP%A2M%D9%0C%A4A%14%01%9F%A7%A3%04X%40%D1%C0%82%1A%0BJ%7FLyp%C5B%85%A4%08%CC%DER%20%EF%08%19T%1E%068%E30%40%0C%1E%BB%A0(%DCD%CB%0Bp%CA%01H%1B%045%AC6%83%80%BE%85%19sU%90V2%CD%0C%D0%0C%87%00%00%3B";// Binary Image
  playType = 'track';
  var rhapLink = '<div style="text-align:center; margin:10px auto 0px; padding:5px; background:#fff;"><a href="rhap://play:'+ playType +'/'+ playerLink +'"><img  src="'+ imgSrc +'" border="0" title="Play in Rhapsody" align="absmiddle"\> Play in Rhapsody</a></div>';
  return rhapLink;
}