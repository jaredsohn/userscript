// ==UserScript==
// @name           IMDB - MovieLens rating
// @namespace      none
// @description    Adds the MovieLens rating for a film (with autologin) 
// @include        http://imdb.com/title/tt*
// @include        http://*.imdb.com/title/tt*
// @version        20080818  
// ==/UserScript==

// basted on IMDB - MovieLens rating http://userscripts.org/scripts/show/83740
// change the following lines with your password and login name at MovieLens

Login = 'your%40mail.com'; // instead of '@' use '%40'
Password = 'yourpassword';

window.addEventListener('load', loadMovieLensScript, false);

var globalStrSearchURL;
var globalStrImdbNum;
var STATE_LOADING = 0;
var STATE_SUCCESS = 1;
var STATE_FAILED  = 2;

// This function will call for MovieLens to give the HTML source of the search page
function loadMovieLensScript() {
  
  // Regex to get this film's imdb number
  var regexImdbNum = /\/title\/(tt\d{7})\//;
  var arrImdbNum = regexImdbNum.exec(document.location);
  
  // Check that we got valid results from regex
  if (arrImdbNum && arrImdbNum.length == 2) {
    
    // Get imdb film number and store at global
    globalStrImdbNum = arrImdbNum[1];
    
    // Finally, attempt to get the direct link to MovieLens
    getMovieLensLink();
    
  } else {
    GM_log("Fatal Error: Could not get the film's IMDB number.");
  }
}

function getMovieLensLink() {
  
  // This script is meaningless without GreaseMonkey's support for XMLHTTP requests, so check for it
  if (GM_xmlhttpRequest) {
    
    // Regex to get the English title and the release year
    var regexTitle = /(?!".+")^(.+?) \(\d{4}(?:\/[IV]+)?\)/;
    var strTitle = document.getElementsByTagName("title")[0].textContent;
    var arrResult = regexTitle.exec(strTitle);
    
    // Check if the film's title was found
    if (arrResult && arrResult.length == 2) {
      
      // Create the URL that will be used in the XMLHTTP request later
      globalStrSearchURL = "http://movielens.umn.edu/search?action=newSearch&searchPhrase=" + escape(arrResult[1].replace(/ /g, '+'));
      
      // Create a placeholder for the link
      if (!(document.getElementById("GM_MovieLensLinkPlaceholder"))){
      	createPlaceholder();
      }
      
      
      // Request the search page
      GM_xmlhttpRequest({method:"GET", url:globalStrSearchURL, overrideMimeType:"text/plain; charset=ISO-8859-1", onload:handleAJAX});
      
    } else {
      GM_log("This is probably a TV series. Will not link to MovieLens.");
    }
    
  }
  
}

// This function creates a placeholder with the tiny ml image to be changed later
function createPlaceholdero() {
  
  var nodeHeader1 = document.getElementsByTagName("h1")[0];
  var nodePlaceholder = document.createElement("a");
  nodePlaceholder.setAttribute("id", "GM_MovieLensLinkPlaceholder");
  
  var nodeImgPlaceholder = document.createElement("img");
  nodeImgPlaceholder.style.width = 84;
  nodeImgPlaceholder.style.height = 17;
  //nodeImgPlaceholder.setAttribute("alt", "MovieLens");
  nodeImgPlaceholder.style.border = 0;
  nodeImgPlaceholder.style.marginLeft = "5px";
  
  nodePlaceholder.appendChild(nodeImgPlaceholder);
  nodeHeader1.appendChild(nodePlaceholder);
  
  changeMovieLensLink(STATE_LOADING, globalStrSearchURL, '');
  
}
// This function creates a placeholder with the tiny ml image to be changed later
function createPlaceholder() {
  
  var nodeHeader1 = document.getElementById("quicklinks_select").parentNode;
//nodeHeader1.appendChild(nodebr);
  var nodebr = document.createElement("br");
  var nodePlaceholder = document.createElement("a");

  nodePlaceholder.setAttribute("id", "GM_MovieLensLinkPlaceholder");
  
  var nodeImgPlaceholder = document.createElement("img");
  nodeImgPlaceholder.style.width = 84;
  nodeImgPlaceholder.style.height = 17;
  //nodeImgPlaceholder.setAttribute("alt", "MovieLens");
  nodeImgPlaceholder.style.border = 0;
  nodeImgPlaceholder.style.marginLeft = "5px";
  nodePlaceholder.style.verticalAlign = "middle";
  
  nodePlaceholder.appendChild(nodeImgPlaceholder);

  
 nodeHeader1.insertBefore(nodeHeader1.appendChild(nodePlaceholder), nodePlaceholder);
//nodeHeader1.nextSibling.nextSibling.appendChild(nodePlaceholder);
  //document.getElementById("tn15crumbs").insertBefore(nodeHeader1, nodePlaceholder);

//<div id="tn15lhs">
//<div id='kevin">Kevin Lin: Main system administrator</div> 
//<div id="tn15main">George Doe: Human resources department</div> 
//</div>

//var oldemployee=document.getElementById("tn15main");  
//var newemployee=document.createElement("div");
//
//newemployee.setAttribute("id", "kevin");
//newemployee.innerHTML="Kevin Lin: Main system administrator";
//document.getElementById("tn15lhs").insertBefore(newemployee, oldemployee);

  //document.getElementById("employees").insertBefore(newemployee, oldemployee);
  changeMovieLensLink(STATE_LOADING, globalStrSearchURL, '');
  
}

// This function handles the result of the XMLHTTP request
function handleAJAX(details) {
  //GM_log(details.responseText);
  	var loginreg = new RegExp(/Log Out/);  
  if (details.status == 200 && details.readyState == 4 && (details.responseText.match(loginreg)) ) {
    // If the result is satisfactory, parse the link
    parseMovieLensLink(details.responseText);
    
  }else if (!details.responseText.match(loginreg)){
  	go_login_and_start_again();

  	}else {
    //GM_log("MovieLens unresponsive. Linking to search page instead.");
    changeMovieLensLink(STATE_FAILED, globalStrSearchURL, '');
  }
  
}

function go_login_and_start_again(){

loginurl = 'http://movielens.umn.edu/login?userName='+Login+'&userPasswd='+Password+'&action=login&submit=Log+into+MovieLens';
	
	  GM_xmlhttpRequest({method:"GET", url:loginurl, 
  		overrideMimeType:"text/plain; charset=ISO-8859-1", onload:function(loginResponseDetails){
  			//GM_log(loginResponseDetails.responseText);
  			var loginreg = new RegExp(/Log Out/);  
  			if (loginResponseDetails.responseText.match(loginreg)){
  				 getMovieLensLink();
  				}
  			}});
	}

// This function attempts to add the direct link to MovieLens, otherwise, a generic search link
function parseMovieLensLink(strResponseHTML) {
  
  // Regex to get the direct link from the HTML source that was recieved from MovieLens
var regexDirectLink = new RegExp("src=\"/images/stars/([\\w\\.]+).gif\" .+<a href=\"/movieDetail\\?movieId=(\\d+)\" class=\"movieTitleL\">.+</a>.+<a href=\"http://akas\\.imdb\\.com/title/" + globalStrImdbNum + "\" TARGET=\"_imdb\">", "");
//var regexDirectLink = new RegExp("src=\"/images/stars/([\\w\\.]+).gif\" width=\"84\" height=\"17\" .+<a href=\"/movieDetail\\?movieId=(\\d+)\" class=\"movieTitleL\">.+</a>.+<a href=\"http://akas\\.imdb\\.com/title/" + globalStrImdbNum + "\" TARGET=\"_imdb\">", "");
  var arrResult = regexDirectLink.exec(strResponseHTML);
  
  if (arrResult && arrResult.length == 3) {
    changeMovieLensLink(STATE_SUCCESS, "http://movielens.umn.edu/movieDetail?movieId=" + arrResult[2], arrResult[1]);
  } else {
    //GM_log("Could not find direct link to film in MovieLens. Linking to search page instead.");
    changeMovieLensLink(STATE_FAILED, globalStrSearchURL, '');
  }
  
}

function changeMovieLensLink(nState, strURL, strRate) {
  
  var nodeLink = document.getElementById("GM_MovieLensLinkPlaceholder");
  nodeLink.setAttribute("href", strURL);
  
  switch (nState) {
    case STATE_LOADING :
      nodeLink.firstChild.setAttribute("src", "data:image/gif;base64,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");
      break;
    case STATE_SUCCESS :
      nodeLink.firstChild.setAttribute("src", "http://movielens.umn.edu/images/stars/" + strRate + ".gif");
      break;
    case STATE_FAILED :
      nodeLink.firstChild.setAttribute("src", "data:image/gif;base64,R0lGODlhVAARAOZRAP+Vlv63sf+Wl/6pp/+Zmf+Ulfjn3f+Rk/6yrfrh1fvNxP+Wlv6bnfjNzfjJyf26tfylp/qytf+ZmPrg0/+QkvbZ2fmztvjMzffc1vfe2fHw8fymqP6opvurrvrVyfrg0vTq6PyqrP+Ulv+fnfjHyPfo4O72//6fn/3NxO/z+f6koffPz/+Qk/y1s/6mpPykpv6dnPvBvffQ0Pvg0v7Ct/Pu7f2urfrQyP3Hvf27tvjNzP6lo/fh3+/0+vfr4fqxtPvDv/62sPzMw/6fnv+amvLm6v+qpvzVyPm2uffQ0fvKxvDy9v+SlP6cnffX0fjMzPzMwv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFEALAAAAABUABEAAAe4gFGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaKGTQel5ydiSQsCJ6jlEsagj01gg4LAaSvjUAtRwgqGCAPI0opFwCusMCIOwICBQUwQxQFREVJvsHQhQMLKBUuTDg8RgdOK8/R4AMSPlEhIgkmMQdQOt/g0AMEBlEQAh9RFgAKDe7vwPHzNgiYECWCPn6//AHjIC/KCwEzovwAIOQJgCAKg9k4USJKhyYJoiBhcEMGgxwZU6pcybKlS1KBAAA7");
      break;
  }
  
}
