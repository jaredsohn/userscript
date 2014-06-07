// ==UserScript==
// @name        Facebook EZ Poke -- Version 2.0
// @namespace   http://userscripts.org/scripts/show/6026
// @description Pokes don't require confirmation and don't load a new page. Based on Lukas Fragodt's EZ-Poke.  Updated October 19, 2006.  A brief changelog is available on the script's userscripts.com website.  This script is licensed under the GNU Public License Version 2.0 and is distributed without warranty.
// @include     http://facebook.com/home.php*
// @include     http://*.facebook.com/home.php*
// @include     http://*.facebook.com/friends.php*
// @include     http://*.facebook.com/profile.php*
// @include     http://*.facebook.com/s.php*
// ==/UserScript==

// this function is called to do the actual poking, instead of just bringing up a confirmation page.
function PokeSomeone(pokeNode, post_form_id, pokee){
  pokeNode.innerHTML = 'Poking...';
  GM_xmlhttpRequest({
    method:'POST',
    url:'http://' + subDomain + 'facebook.com/poke.php',
    headers:{
      'User-Agent':window.navigator.userAgent,
      'Accept':'text/*',
      'Content-type':'application/x-www-form-urlencoded'
    },
    data:'post_form_id=' + post_form_id + '&id=' + pokee + '&confirmed=1',
    onload: function (responseDetails) {
      // Poke is either already done, successful, or failed.
      if (responseDetails.status == 200) {
        if (responseDetails.responseText.indexOf('has not received your last poke yet') != -1) {
          pokeNode.innerHTML = 'Already poked!';
        } else if (responseDetails.responseText.indexOf('You have poked') != -1) {
          pokeNode.innerHTML = 'EZ Poked!';
        } else {
          var GetErrorMessage = /<div id="error">(.*)<\/div>/;
          if (GetErrorMessage.exec(responseDetails.responseText)) {
            pokeNode.innerHTML = "EZ Poke failed - " + RegExp.$1;
          } else {
            pokeNode.innerHTML = 'Confirming the Poke failed for an unknown reason!';
	  }
        }
      } else {
        pokeNode.removeAttribute('href');
        pokeNode.innerHTML = 'Confirming the Poke Failed! [1.1]';
	GM_log("EZ Poke failed -- Error Code 1.1: While retreaving the poke confirmation page, the script was unable to determine whether the pokee had already been poked or is about to be poked.  This is likely the result of Facebook changing their code again.  Uncomment line 43 to determine what page is being processed.");
	//GM_log(responseDetails.responseText);
      }
    },
    onerror: function (responseDetails) {
      //uncomment for details
      //alert ('Poke failed: ' + responseDetails.status + ': ' + responseDetails.statusText);
      pokeNode.innerHTMl = 'Confirming the Poke failed!';
    }
  });
}


//AJAXify poke links.
var anchors = document.getElementsByTagName('a');
var pokeMatch = /poke\.php\?id=(\d*)(&pokeback=1)?/;
var postformMatch = /name="post_form_id" value="(\w+)"/;

var subDomainRegExp = /http:\/\/(.*\.)facebook\.com/;
var subDomain = '';
if (subDomainRegExp.exec(document.location) != 0) {
  subDomain = RegExp.$1;
}

var elems = document.getElementsByTagName('a');
var displayed = 0;
for(i = 0; i < elems.length; i++) {
  if (pokeMatch.exec(elems[i].getAttribute("href")))
    elems[i].firstChild.data = 'EZ' + elems[i].firstChild.data;
}

for (var i = 0; i < anchors.length; i++) {
  if (pokeMatch.exec(anchors[i].href)) {
    anchors[i].addEventListener('click', function(event) {
      var pokeNode = this;
      pokeMatch.exec(event.target);
      var pokee = RegExp.$1;
      var pokeback = RegExp.$2;
  
      pokeNode.removeAttribute('href');
      pokeNode.removeAttribute('a');
      pokeNode.innerHTML = 'Getting confirmation page...';

      /* get the confirmation page so we can grab the poke_form_id */    
      GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + subDomain + 'facebook.com/poke.php',
        headers:{
          'User-Agent':window.navigator.userAgent,
          'Accept':'text/*',
          'Content-type':'application/x-www-form-urlencoded'
        },
        data:'id=' + pokee + pokeback,
        onload: function (responseDetails) {
          if (responseDetails.status == 200) {
            if (responseDetails.responseText.indexOf('You are about to poke ') != -1) {
              pokeNode.innerHTML = 'Reading confirmation page...';
              postformMatch.exec (responseDetails.responseText);
              var post_form_id = RegExp.$1; // grab the post_form_id from the confirmation page
	      
              PokeSomeone(pokeNode, post_form_id, pokee);
            } else if (responseDetails.responseText.indexOf('has not received your last poke yet') != -1) {
              pokeNode.innerHTML = 'Already Poked!';
            } else {
              var GetErrorMessage = /<div id="error">(.*)<\/div>/;
              if (GetErrorMessage.exec(responseDetails.responseText))
                pokeNode.innerHTML = "Poke failed - " + RegExp.$1;
              else {
                pokeNode.innerHTML = 'Poke failed! [2.1]';
		GM_log("EZ Poke failed -- Error Code 2.1: While attempting to access the confirmation page, EZ Poke received an error that it did not recignize.  Uncomment line 112 of the script to determine what facebook returned.")
		//GM_log(responseDetails.responseText);
	      }
            }
          } else { // error, status was not 200
            //uncomment for details
            //alert ('Poke failed: ' + responseDetails.status + ': ' + responseDetails.statusText);
            pokeNode.removeAttribute('href');
            pokeNode.innerHTML = 'Poke Failed! (1)';
          }
        },
        onerror: function (responseDetails) {
          //uncomment for details
          //alert ('Poke failed: ' + responseDetails.status + ': ' + responseDetails.statusText);
          pokeNode.removeAttribute('href');
          var GetErrorMessage = /<div id="error">(.*)<\/div>/;
          if (GetErrorMessage.exec(responseDetails.responseText))
            pokeNode.innerHTML = "Poke failed - " + RegExp.$1;
          else
            pokeNode.innerHTMl = 'Poke failed! (2)';
        }
      });
      event.stopPropagation();
      event.preventDefault();
    }, true);
  }
}




