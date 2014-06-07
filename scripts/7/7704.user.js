// ==UserScript==
// @name            Pitchfork/Rhapsody Mashup
// @namespace       userscripts.org
// @version         1.3.1
// @description     Adds a Rhapsody play button to the Pitchfork page you're reading or a few links to make it easy to search.
// @include         http://www.pitchforkmedia.com/*
// @include         http://pitchforkmedia.com/*
// @include         http://pitchfork.com/*
// @include         http://www.pitchfork.com/*
// @require         http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @grant           GM_xmlhttpRequest
// ==/UserScript==

var debugmode = false,
    GM_log = (unsafeWindow.console && debugmode === true) ? unsafeWindow.console.log : function(){},
    initloc = window.location.href,
    firstrun = true;

$(document).ready(function(){
  // Loop over the location check
  var loccheck = setInterval(checkLoc, 300);
});

// Custom Mash up function incorportating Rhapsody Elements
function get_url(element) {

  if (element.length > 0) {
      GM_log(element.length);
      var rhapURL = ""
      // Remove punctuation but leave the accented chars
      , match_re2 = new RegExp(/_|[^\w\dáÁâÂàÀåÅãÃäÄæÆçÇðÐéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖßþÞúÚûÛùÙüÜýÝÿ\s]+/g)
      // Below is a list of special cases where accented characters become anglicized
      // Unfortunately Rhapsody.com is not always consistent when dealing with some chars 
      // especially the & sign. Sometimes it's removed and sometimes changed to "and".
      , match_re4 = new RegExp(/ñ/g)
      , match_re5 = new RegExp(/à|á|a|â|ã|ä|å/g)
      , match_re6 = new RegExp(/&amp|\band\b/g)
      , match_re7 = new RegExp(/é|è|ê|ë/g)
      , match_re8 = new RegExp(/ó|ó|ô|õ|ö|ø/g)
      , match_re9 = new RegExp(/ì|í|î|ï/g)
      , match_re10 = new RegExp(/ù|ú|û|ü/g)
      , match_re11 = new RegExp(/ç/g);
	  
    artist = $.trim($(element).find('a[href*="/artists"]')
                       .html()
                       .toLowerCase()
                       .replace(/\bep\b$|\bost\b$/, "")
                       .replace(/&amp;/, " and ")
                       .replace(match_re4, "n")
                       .replace(match_re5, "a")
                       .replace(match_re7, "e")
                       .replace(match_re8, "o")
                       .replace(match_re9, "i")
                       .replace(match_re10, "u")
                       .replace(match_re11, "c")
                       .replace(match_re2, "")).replace(/\s/g, '-');

    title = $.trim($(element).find('h2')
                      .html()
                      .toLowerCase()
                      .replace(/\bep\b$|\bost\b$/, "")
                      .replace(/&amp;/, " and ")
                      .replace(match_re4, "n")
                      .replace(match_re5, "a")
                      .replace(match_re7, "e")
                      .replace(match_re8, "o")
                      .replace(match_re9, "i")
                      .replace(match_re10, "u")
                      .replace(match_re11, "c")
                      .replace(match_re2, "")).replace(/\s/g, '-');

    var artSrchNm = 'http://www.rhapsody.com/search/artist/?query='+ artist.replace(/[\-]+/g, '+');
    var albSrchNm = 'http://www.rhapsody.com/search/album/?query='+ title.replace(/[\-]+/g, '+');

    rhapURL = 'http://www.rhapsody.com/artist/' + artist +'/album/'+ title;

    GM_log(" Artist: " + artist + "\n Title: " + title + "\n URL: " + rhapURL);

    GM_xmlhttpRequest({
      method: 'GET',
      url: rhapURL,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
      },
      
      onload: function(responseDetails) {
        var testArray = new Array();
        //GM_log(responseDetails.responseText);
        var testLen = testArray.length - 1;
        var testRe = new RegExp(/\<meta content="music\.album"/); // Check the loaded response for album availability
        var testString = responseDetails.responseText;
        GM_log(testString.search(testRe));
        
        if (testString.search(testRe) != -1  && testArray[testLen] != "success") {
          tryConnecting(testString, rhapURL);
          testArray.pop();
          testArray.push("success");
          GM_log(testArray[0]);
        } else if (testArray[0] != "success"){
          failFunc(artSrchNm, albSrchNm, rhapURL, testArray);
        }
      }
    });
  }
}
function tryConnecting(testString, rhapURL){
  var rhapLink = '';
  testString = testString.match(/Alb\.(\d+)/)[1];
  var leftPos = screen.width - 270;
  rhapLink += '<div style="padding:10px 10px 0 10px;" id="there"><a href = "http://www.rhapsody.com/'+ rhapURL +
              '" onclick="window.open(\'http://www.rhapsody.com/player?type=album&id=alb.'+ testString +
              '&remote=true&page=&pageregion=&guid=&from=&hasrhapx=true\',\'rhapwin\',\'width=270,height=570,left='+ leftPos +
              ',top=0\'); return false;">' +
              '<img src="http://static.realone.com/rotw/images/buttons/playbig.gif" border="0" style="margin: 0 20px 0 -15px;" \>' +
              '</a>';
  
  
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://feeds.rhapsody.com/webservices/rhapprotocol.xml?rcid=alb.'+ testString +'',
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'text/html',
    },
    onload: function(responseDetails) {
      var linkRegex = new RegExp(/\<playback\>rhap:\/\/play:album\/([\d]+)\/\<\/playback\>/);
      var playerLink = responseDetails.responseText;
      var imgSrc = "data:image/gif,GIF89a%20%00%1B%00%C4%1F%00222%A9%A9%A98%7B%AB%8C%B3%CE%C7%C7%C7%FF%FF%FF%00%00%00sss%CA%DA%E6%7B%A7%C7%A5%C3%D9J%87%B3%E4%E4%E4%B8%D0%E1%8E%8E%8E%D6%E4%EE%22!!%F3%F3%F3UUUA%81%AF%EB%F1%F4%5B%92%BAf%99%BE%0E%0E%0E%F2%F6%F9%E2%EC%F3%F8%F8%F8%F6%F9%FB%3D~%AD%F9%FA%FC%FC%FC%FD%FF%FF%FF!%F9%04%01%00%00%1F%00%2C%00%00%00%00%20%00%1B%00%00%05%FF%E0\'%8Ed)%16%1D%11%ACl%40x%85)%9B%05a%DC%F8%0Di%F1%EC%7F%05G.w%E8%FD%80%85%A4R%03%18%E2%08F%99%12%F3h(%06%03%0F%C3p%81x%BD%5CJ%94%94%A44%12%0B%8E%60%9D(%04%0C%84%88%3C%C2%B8H%C6%A7%02e%90%E6%F8%17%16%09%0F%05%00%17%3CJ6%01I%25I%0D%7D%02%15%0A%0F%140%05%5BEH%05%07%06%0C%1Eb%23I%0A%02~%15%08%1BJ1npI%1E%1A%1A%10%00z%13%83\'%0D%02%13%1C%09%18%8B%99%05%12%06%11%1A%0E%00%C4%06%0E%05%B6%13%BB%05%18%B8%B90%A0%11%08%04%04v%9AC%08%05%09jY%05%08%B7%02%19F5M8%01%11C%000%C9%15%E2%A2%13%0B%A7\'uC%14%1D%108%00%D9%DE%1C%13%13%D9%DF%FC%7D%02b%83H%12%06%0E%0E%C4I%15p%C1%A0fj%14%2C*%A0%E1%97%01%00%0E%A0%A1%EAQ%60%80%1F%5D%40%02rPP%E9%20%85C3%0A%80%3C%E8%17.%15%B2Q%B9%06mLY%20C%1A%01%D9%40y%AB%003A%83%0C%1D6r%2C%B0%A1%C1%04%01%0B%F61%C2%D0%A0%82%9AQ%15%12(P%D0%00AP%A2M%D9%0C%A4A%14%01%9F%A7%A3%04X%40%D1%C0%82%1A%0BJ%7FLyp%C5B%85%A4%08%CC%DER%20%EF%08%19T%1E%068%E30%40%0C%1E%BB%A0(%DCD%CB%0Bp%CA%01H%1B%045%AC6%83%80%BE%85%19sU%90V2%CD%0C%D0%0C%87%00%00%3B";
      GM_log(playerLink);
      playerLink = playerLink.split(linkRegex);
      playerLink = playerLink[1].replace(linkRegex, "$1");
      rhapLink += '<a href="rhap://play:album/'+ playerLink +'/"><img src="'+ imgSrc +'" border="0" title="Play in Application"  style="margin: 0 20px 0 -15px;" \></a></div>';
      $('div.editorial').prepend(rhapLink);
    }
  });
     
}
function failFunc(artSrchNm, albSrchNm, rhapURL, testArray){
  $('div.editorial').prepend(
    '<div style="color:#FF6600; text-align:center; '+
    'padding:10px 10px 0; clear:both; font-size:12px;" id="notThere">This album doesn\'t seem to be available on Rhapsody yet.'+
    '<div style="text-align:center; padding:5px 5px 0px 5px;"><a href="'+ artSrchNm +'" target="_blank">Search for the artist</a> | '+
    '<a href="'+ albSrchNm +'" target="_blank">Search for the album</a> | <a href="'+ rhapURL +'" '+
    'target="_blank">Try the provided link</a></div></div>'
  );
  testArray.pop();
  testArray.push("fail");
  //GM_log(testArray[0]);
}

function checkLoc() {
  if (loc = window.location.href) {
    // Only do something if the location has changed and it is an album review listing
    if ((firstrun || loc != initloc) && (document.location.href.match(/reviews\/albums\/[\w\d]+/) || document.location.href.match(/\/node\//))) {
      //GM_log("Location: " + loc + '\n' + "Initial loc: " + initloc + '\n' + "First run: " + firstrun);
      firstrun = false;
      // Need a slight delay to allow for the reviews to get into the DOM
      setTimeout(function(){
          get_url($('ul.review-meta'));
      }, 2000);
    }
  }
  initloc = window.location.href
}