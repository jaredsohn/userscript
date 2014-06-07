// ==UserScript==
// @name          Netflix Q Status
// @namespace     http://www.pantz.org/
// @description   Show Netflix queue status on popular movie websites with the ability to add to queue.
// @version       1.35
// @include       http://www.rottentomatoes.com/*
// @include       http://www.imdb.com/*
// @include       http://www.metacritic.com/*
// @include       http://www.fandango.com/*
// ==/UserScript==

GM_addStyle('#popuptopnqs { height:auto; width:350; background:#b9090b; text-align:left; padding:1px 1px 3px 1px; margin:0px 0px 3px 0px; font-weight:bold; color:#fff;} a.lh:link {color:#fff;} a.lh:visited {color:#fff;} a.lh:active {color:#fff;} #bpright {float:right; padding:6px;} #bpleft {float:left; padding:3px;}');

//frame detection. detects top frame. needed to stop multiple code exec in all (i)frames
var frameless = (window === window.top)?true:false;

if (typeof(sessionStorage) == 'undefined' ) { //check html5 storage support
  var sStorage = 1; //html5 session storage not supported. set var
  addIcons(); //add the default red icon and be done. no queue icons.
} else {
  if (sessionStorage.getItem("nqsSessionStatus") != null) { // if key is there execute
    if (frameless) { //if frameless is true we only execute code in the top frame
      var currentTime = unixTime(); //get current time
      var sessionTime = sessionStorage.getItem("nqsSessionStatus"); //get session time
      var deltaTime = currentTime - sessionTime; //get delta of times
      if (deltaTime > 360) { //update movie cache if greater than set # of secs
        getQueue(); //cache expired. get new netflix queue info
      } 
      addIcons(); //add icons to page
    }
  } else { //session key was not there
    if (frameless) { //if frameless is true we only execute code in the top frame
      getQueue(); //load netflix queue into cache. 
      //set timer and see if getQueue returns faster than timer. if not add icons. if so getQueue clears timer
      var queueTimer = setTimeout(function(){addIcons(); queueTimer = undefined;}, 8000);
    }
  }
}

function addIcons () {
  var hostName = window.location.hostname; //get website hostname

  /***** begin rottentomatoes.com *****/
  if (hostName.match(/rottentomatoes\.com/i)) { //only run if hostname matches
    var Snap1 = document.evaluate(" \
    (//td|//table)[@class[contains(.,'middle_col') or contains(.,'left')]]//a | \
    (//h2|//h1)//a[@class]"
    ,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

    for (var i = 0; i < Snap1.snapshotLength; i++) {
      var elm1 = Snap1.snapshotItem(i);
      var moviename = elm1.innerHTML;
      elm1.parentNode.insertBefore(CreateLink(moviename), elm1);
    }
  }
  /***** end rottentomatoes.com *****/

  /***** begin imdb.com *****/
  if (hostName.match(/imdb\.com/i)) { //only run if hostname matches
    var Snap1 = document.evaluate("//a[contains(@href,'/title')]"
    ,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

    for (var i = 0; i < Snap1.snapshotLength; i++) {
      var elm1 = Snap1.snapshotItem(i);
      var urlRegex = /^(?:http\:\/\/www\.imdb|\/).*title\/tt\d+(\?ref|\/\?ref|\/$)/i; //filter only urls that match regex
      if (!urlRegex.test(elm1)) { continue; } //if no match go to next link
      var moviename = elm1.innerHTML; //suck out movie name
      if (moviename.match('<')) { continue; } //get rid bad titles
      elm1.parentNode.insertBefore(CreateLink(moviename), elm1);
    }
  }
  /***** end imdb.com *****/

  /***** begin metacritic.com *****/
  if (hostName.match(/metacritic\.com/i)) { //only run if hostname matches
    var Snap1 = document.evaluate("//*[contains(@class,'_title') or contains(@class,'releases')] \
    //a[contains(@href,'/movie/') or contains(@href,'/tv/')]"
    ,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

    for (var i = 0; i < Snap1.snapshotLength; i++) {
      var elm1 = Snap1.snapshotItem(i);
      var moviename = elm1.innerHTML;
      elm1.parentNode.insertBefore(CreateLink(moviename), elm1);
    }
  }
  /***** end metacritic.com *****/

  /***** begin fandango.com *****/
  if (hostName.match(/fandango\.com/i)) { //only run if hostname matches
    var Snap1 = document.evaluate(" \
    (//li | //h4 | //td)//a[contains(@href,'movieoverview') and (contains(@name,'Movie') \
    or contains(@name,'MOVIE'))]"
    ,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

    for (var i = 0; i < Snap1.snapshotLength; i++) {
      var elm1 = Snap1.snapshotItem(i);
      var moviename = elm1.innerHTML;
      elm1.parentNode.insertBefore(CreateLink(moviename), elm1);
    }
  }
  /***** end fandango.com *****/
}


function CreateLink(moviename) {
  var newLink = document.createElement("span"); //create span tag
  var NfxImg = document.createElement("IMG"); //create image tag
  var NfxImgIcoN = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA'+
  'CXRFWHRYLUluZGV4ADC0w5xiAAAA90lEQVQ4jaWTsU7DMBRFT1GkpK1ikDriFRBZWIoov5IB/gqJtV0rhkQMfEH'+
  'djcndOpkFNrOglDYMFVWJiyMld3tXusd+T+91Xrr9kj0993scklx9c1UUjn9UNZbXQ9I8I80zXi/OCe/vSPOMx5'+
  'NjZlHoAIKqIYTgZjTaviolUspdPRGC268P/w/29Rv0yQuIhWgHSJKkOUBrzWUbwJsxiDYtLLQG6gfpbQHgVMpmg'+
  'E9rge0uNAIAzJXyhmsBxphagLPK1lrmSmGt5Wk6ZaH1bqCH1Kle4ziOUd3o38DD+99bcAAAsyjEBAG9suSsWAEw'+
  'WK8ZbDYO8AdN/UvYu2+1+AAAAABJRU5ErkJggg=='; //the not in Queue icon
  var NfxImgIcoQ ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAC'+
  'XRFWHRYLUluZGV4ADC0w5xiAAAAeklEQVQ4jWM8fPjwfwYKAAsDAwODjY0NWZqPHDkCMQAb2MXFg8J3+/YFqzom'+
  'YjTjEsNqAC6FuOSY8Clw+/YFw+noarB6AaYZGxuvC8gBg9gA5MDCFzMoBmALcUIJCsMF+EIcmxxWL+AyBOYiZFf'+
  'hzAvIhuALA0ZKszMAFkgt9SJ1+CYAAAAASUVORK5CYII='; //the In Queue icon
  if (sStorage == 1) { //html5 storage not supported use default icon
    NfxImg.setAttribute("src",NfxImgIcoN); //use default icon
  } else {
    if ( sessionStorage.getItem(normMovieName(moviename)) == null ) { //is supported. check if in queue.
      NfxImg.setAttribute("src",NfxImgIcoN); //not in queue use default icon
    } else {
      NfxImg.setAttribute("src",NfxImgIcoQ); //exists! use Q icon
    }
  }  
  newLink.appendChild(NfxImg); //place image in span tag
  //attach a listener to our image. on click run popup box function. 
  //use anon function. pass movie name and page event status 
  newLink.addEventListener("click", function(event){getMovie(event,moviename)}, false);
  newLink.appendChild(document.createTextNode(" ")); //add space after image
  return newLink; //return our image with our listener attached to be placed after anchor tag
}

function EncodeMovieName(str) {
  str = str.replace(/\&quot\;/g,"\"");
  str = str.replace(/\&amp\;/g,"&");
  str = str.replace(/\&lt\;/g,"<");
  str = str.replace(/\&gt\;/g,">");
  str = str.replace(/\$/g,"%24");
  str = str.replace(/\%/g,"%25");
  str = str.replace(/&/g,"%26");
  str = str.replace(/\'/g,"%27");
  str = str.replace(/\+/g,"%2B");
  str = str.replace(/\//g,"%2F");
  str = str.replace(/\?/g,"%3F");
  str = str.replace(/\:/g,"%3A");
  str = str.replace(/\;/g,"%3B");
  str = str.replace(/=/g,"%3D");
  str = str.replace(/\[/g,"%5B");
  str = str.replace(/\]/g,"%5D");
  str = str.replace(/@/g,"%40");
  str = str.replace(/\,/g,"%2C");
  str = str.replace(/ /g,"+");
  return str;
} 

function normMovieName(str) { //normailize all movie names for better in queue detection
  str = str.toLowerCase(); //lowercase movie name
  //replace punctuation.symbols,newlines,linefeeds,html tags, spaces, etc with a blank 
  str = str.replace(/[ :\'\"\.\?\!\$\+\#@&-]|the |and |<[^>]*>|\([^\)]*\)|\f|\v|\r|\n|\t|\u0085|\u000C|\u2028|\u2029/g,"");
  return str;
}

function unixTime () { //generate unix time for session value
  var unixTime = Math.round(new Date().getTime() / 1000); //get unix time
  return unixTime;
}

function getMovie(event,moviename) {
  //Set our own connect error timeout because GM_xmlhttpRequest takes waaaaay to long to timeout with onerror
  var errorTimer = setTimeout(function(){return errorTimeout(event,moviename)}, 10000); 
  var movieUrl = "http://dvd.netflix.com/Search?v1=" + EncodeMovieName(moviename); //make movie url
  
  //make the http request to netflix. if it fails in any way show an error
  GM_xmlhttpRequest({
    method: "GET",
    url: movieUrl,
    onerror: function(response) {
      var boxBody = '<div id="popuptopnqs"><b>ERROR</b></div>'+
      '<div style="padding:7px;">Could not connect/load info from Netflix.'+
      'Here is a manual link to your movie search.'+
      '<a href="' + movieUrl + '">' + moviename + '</a><hr>';
      showBox(event,boxBody); //show the error popup
    },
   
    onload: function(response) {
      clearTimeout(errorTimer); //clear our timer because onload returned fast enough

      if (response.statusText == "OK") { //if we recieved a page back OK then parse and show it 
        var pat = response.responseText.match(/Member Sign In/); //check for sign in text

        if (pat != null) { //if the pattern worked then we are not signed in. Send error and stop.
          var boxBody = '<div id="popuptopnqs"><b>ERROR</b></div>'+
          '<div style="padding:7px;">You are not signed into Netflix.'+
          'This script only works for Netflix members. Please sign in and try again.<hr>';
          showBox(event,boxBody); //throw error box for login
          return false;        
        }

        //normalize netflix page. strip newlines, returns, etc. makes it easy to parse        
        var normMovieHtml = response.responseText; //copy response obj as FF won't let us  modify it
        normMovieHtml = normMovieHtml.replace(/\f|\v|\r|\n|\t|\0|\s+|\u0085|\u000C|\u2028|\u2029/g," ");

        //grab first movie result. sometimes first results are not movies
        var matchPat = normMovieHtml.match(/<div class="agMovie" (.*?)<\/span><\/div>/); 

        if (matchPat != null) { //if the pattern worked then show movie info box else throw error box

          var movieHtml = matchPat[1]; //surely have movie info so put it in a var

          //parse filtered and normailized Netflix page with regex's. Suck out movie info.
          var patMovieNameM = movieHtml.match(/alt="(.*?)"/); //regex for movie name
          var patImgLinkM = movieHtml.match(/src="(.*?)"/); //regex for movie box image
          var patAddLinkM = movieHtml.match(/_0" href="(.*?)"><span/); //regex for add to queue link
          var patQueueStatM = movieHtml.match(/inr">(.*?)<\/span>/); //regex for queue status
          var patRatM = movieHtml.match(/You rated this movie: (.*?)</); //regex for rating
          var patSynposisM = movieHtml.match(/"synopsis">(.*?)<\/p>/); //regex for movie synopsis

          //if our matches are not null then the regex worked so show box. else show error box.
          if ((patMovieNameM != null) && (patImgLinkM != null) && (patAddLinkM != null) &&
              (patQueueStatM != null) && (patSynposisM != null)) {

            var patMovieName = patMovieNameM[1]; //movie name
            var patImgLink = patImgLinkM[1]; //box image
            var patAddLink = patAddLinkM[1]; //add to queue link
            var patQueueStat = patQueueStatM[1]; //queue status
            if (patRatM != null) { var patRat = patRatM[1]; } //if rating is there set var
            var patSynposis = patSynposisM[1]; //movie synposis

            var status = "Unknown"; //set status state
            if (patQueueStat.match('(In Q|In DVD)')) {
              status = '<span id="nonqsstatus" title="' + patAddLink + '" style="text-decoration:none; border:1px solid black; padding:5px; background:#f6f5f4;'+
              'color:#b9090b; font-size:13px;font-weight:bold;">In Queue</span>'; //in Q if match
            } else if (patQueueStat.match('Add')) {
              status = '<span id="nqsstatus" title="' + patAddLink + '" style="text-decoration:none; border:1px solid black; padding:5px; background:#b9090b;'+
              'color:#fff; font-size:13px;font-weight:bold;">Add</span>'; //add link if match
            } else if (patQueueStat.match('Save')) {
              status = '<span id="nqsstatus"  title="' + patAddLink + '" style="text-decoration:none; border:1px solid black; padding:5px; background:#8bb109;'+
              'color:#fff; font-size:13px;font-weight:bold;">Save</span>'; //save link if match
            } else if (patQueueStat.match('Home')) {
              status = '<span id="nonqsstatus"  title="' + patAddLink + '" style="text-decoration:none; border:1px solid black; padding:5px; background:#f6f5f4;'+
              'color:#333; font-size:13px;font-weight:bold;">At Home</span>'; //home link if match
            } else if (patQueueStat.match('Choose Discs')) {
              status = '<span id="nonqsstatus" title="' + patMovieName + '" style="text-decoration:none; border:1px solid black; padding:5px; background:#fff;'+
              'color:#000; font-size:13px;font-weight:bold;"><a href="' + patAddLink + '" target="new">Choose Discs</a></span>'; //Discs link if match
            }

            var rating = "Rating Unknown"; //set rating state
            if (patRatM != null) { //if word is "movie" then person rated it
              rating = 'You rated this a: ' + patRat;
            } else { // person has not rated
              rating = 'You have not rated this';
            }
    
            //put the majority of our code into a var for an innerHTML insert later.
            var boxBody = '<div id="popuptopnqs">'+
            '<a class="lh" href="' + movieUrl + '"> ' + patMovieName + '</a></div>'+
            '<img style="margin:0px 3px 0px 1px;" align="left" width="110" height="150" src="' + patImgLink + '">'+
            '<div style="padding:3px;">' + patSynposis + '<br><br>'+
            '<b>' + rating + '</b></div><hr><br>'+
            '<span id="bpleft">' + status + '</span>';
            showBox(event,boxBody); //show our movie box
          } else {
              var regexErrorMessage = "movie parts of the";
              regexError(regexErrorMessage); //show error for failed move parts match
          }
        } else {
            var regexErrorMessage = "movie block part of the"; 
            regexError(regexErrorMessage); //show error for failed movie block match
        }
      } else { //We did not get an OK response from the server. Show error.
          var boxBody = '<div id="popuptopnqs"><b>ERROR</b></div>'+
          '<div style="padding:7px;">There was a problem connecting to the Nexflix'+
          '  search page. Try this manual link to your movie search.'+
          ' <a href="' + movieUrl + '">' + moviename + '</a><hr>';
          showBox(event,boxBody); //show popup with error
      }
      function regexError(regErrorM) { //our regular expression failed to match. Show error message.
        var boxBody = '<div id="popuptopnqs"><b>ERROR</b></div>'+
        '<div style="padding:7px;">There was a problem matching the info on the'+
        ' Nexflix search page. The ' + regErrorM + ' regular expression needs to be updated. '+
        'Please go <a href="http://userscripts.org/scripts/show/87029">here</a> to install the update.'+
        ' Here is a manual link to your movie search. <a href="' + movieUrl + '">' + moviename + '</a><hr>';
        showBox(event,boxBody); //show popup with error
      } 
    }
  });
} 

function getQueue() {
  //make the http request to netflix.
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://dvd.netflix.com/Queue",
    onerror: function(response) {
      GM_log("We got an error response from Netflix queue page"); //log error
    },
    onload: function(response) {
      if (response.statusText == "OK") { //if we recieved a page back OK then parse and show it
        //parse Netflix queue page with regex. Suck out movie(s) names.

        var websiteRegex = /<td class="tt"><span class="title"><a.*?">.*?<\/a>/g; //get movie section
           
	var responseTxt = response.responseText; //copy response obj as FF won't let us  modify it
        responseTxt = responseTxt.replace(/\f|\v|\r|\n|\t/g," "); //normalize chars
        responseTxt = responseTxt.replace(/ {2,}/g," "); //clean spaces

        movieLinePat = responseTxt.match(websiteRegex); //run regex. put matched values in array  

        if (movieLinePat != null) { //if regex worked store movie names, else log error and just add icons
          for (var i = 0; i < movieLinePat.length; i++) { //loop through regex array. set as session vars
            var websiteRegex = /<td class="tt"><span class="title"><a.*">(.*?)<\/a>/; //movie name regex
            movieNamePat = movieLinePat[i].match(websiteRegex); //suck out movie name from matched line
            sessionStorage.setItem(normMovieName(movieNamePat[1]), "null"); //put normalized movie name in session store
          }

          sessionStorage.setItem("nqsSessionStatus",unixTime()); //set last connection time

          if ( queueTimer != undefined ) { //if queue req beats timer clear it and add icons
            clearTimeout(queueTimer); //clear timer
            addIcons(); //add icons
          }

        } else { //regex failed to get movie title log error 
            GM_log("The Netflix queue RegEx is broken");
        }

      } else { //We did not get an OK response from the server. Log error.
            GM_log("Something other than OK response from Netflix server for queue info");
      }
    }
  });
}

function hideBox() {
  var PopUpId = document.getElementById('popupnqs'); //get popup box element id
  PopUpId.style.visibility = "hidden"; //hide the popup box
  PopUpId.parentNode.removeChild(PopUpId); //remove the div from the DOM
}

function showBox(event,boxBody) {
  if (document.getElementById('popupnqs')) { hideBox(); } //if popup exists close it

  var popupWrapper = document.createElement("div"); //start div for popup
  popupWrapper.setAttribute("id",'popupnqs'); //give div our id for the popup
  popupWrapper.style.position = 'absolute'; //set box position absolute
  popupWrapper.style.visibility = 'hidden'; //hide it while it's being generated
  popupWrapper.style.textAlign = 'left'; //make sure we left align some sites override
  popupWrapper.style.width = '350px'; //make it only so wide
  popupWrapper.style.height = 'auto'; //it can be a tall as it needs
  popupWrapper.style.border = '3px solid black'; //add a nice border
  popupWrapper.style.color = '#000'; //make sure text is specific color
  popupWrapper.style.backgroundColor = 'white'; //make sure background is specific color
  popupWrapper.style.zIndex = '9999999'; //make sure our popup is always on top

  popupWrapper.innerHTML = boxBody; //put our html we were passed in the box

  var closeLink = document.createElement("span"); //make span for close listener
  closeLink.setAttribute("id",'bpright'); //set id so we can add style
  closeLink.appendChild(document.createTextNode("Close")); //insert close text
  closeLink.addEventListener("click", hideBox, false); //add listener to span
  popupWrapper.appendChild(closeLink); //add close link span to div
  var bod = document.getElementsByTagName("BODY")[0]; //get page body element
  bod.appendChild(popupWrapper); //add div to page body

  if (document.getElementById('nqsstatus') != null) { //if correct button id exists attach listener
    document.getElementById('nqsstatus').addEventListener("click", function(event){addToQueue(event)}, false);
  }

  var mX = event.pageX; //get mouse X coordinate
  var mY = event.pageY; //get mouse Y coordinate
  var dX = popupWrapper.clientWidth; //get div (box) width X
  var dY = popupWrapper.clientHeight; //get div (box) height Y
  var sY = window.innerHeight; //window size Y
  var sX = window.innerWidth; //window size X
  var oY = self.pageYOffset; //get scrolled page Y offset
  var oX = self.pageXOffset; //get scrolled page X offset

  var qW = (sX/2)+oX; qH=(sY/2)+oY; //get half of each on screen area with scroll comp

  if ( mX<=qW && mY<=qH ) { pX = mX; pY = mY; } //pop down and right from cursor
  if ( mX<=qW && mY>=qH ) { pX = mX; pY = mY-dY; } //pop up and right from cursor
  if ( mX>=qW && mY>=qH ) { pX = mX-dX; pY = mY-dY; } //pop up and left from cursor
  if ( mX>=qW && mY<=qH ) { pX = mX-dX; pY = mY; } //pop down and left from cursor

  //if we can't get mouse chords then default to popup in center of screen
  if (typeof pX === 'undefined' && typeof pY === 'undefined') {
    pX = sX/2-dX/2+oX; pY = sY/2-dY/2+oY; //center box
  }

  popupWrapper.style.top = pY + 'px'; //set box Y chord relative to cursor with css
  popupWrapper.style.left = pX + 'px'; //set box X cord relative to cursor with css
  popupWrapper.style.visibility = "visible"; //finally! make our box visible
}

function errorTimeout (event,moviename) { //called if connection to netflix takes to long
  var boxBody = '<div id="popuptopnqs"><b>ERROR</b></div>'+
  '<div style="padding:7px;">It is taking to long to connect to the Nexflix search page.'+
  '  Try this manual link to your movie search: <a href="' + movieUrl + '">' + moviename + '</a><hr>';
  showBox(event,boxBody); //show popup with error
}

function addToQueue (event) {
  //grab add to queue url from title property and put it in a var
  var addToQueueUrl = document.getElementById('nqsstatus').title;

  //make the http request to netflix. if it fails in any way show an error
  GM_xmlhttpRequest({
    method: "GET",
    url: addToQueueUrl,
    onerror: function(response) {
      var boxBody = '<div id="popuptopnqs"><b>ERROR</b></div>'+
      '<div style="padding:7px;">Could not connect to Netflix. Connection issue?.<hr>';
      showBox(event,boxBody); //show the error popup
    },

    onload: function(response) {
      if (response.statusText == "OK") { //if we recieved a page back OK then parse and show it
        document.getElementById('bpleft').innerHTML = ''; //blank out current button
        document.getElementById('bpleft').innerHTML = '<span id="nqsstatus"'+
        'style="text-decoration:none; border:1px solid black; padding:5px; background:#f6f5f4;'+
        'color:#b9090b; font-size:13px;font-weight:bold;">Added to Queue</span>'; //put in added to queue button
      } else { //We did not get an OK response from the server. Show error.
          var boxBody = '<div id="popuptopnqs"><b>ERROR</b></div>'+
          '<div style="padding:7px;">There was a problem connecting to Netflix. Invalid server response.<hr>';
          showBox(event,boxBody); //show popup with error
      }
    }
  });
}
