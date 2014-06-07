// ==UserScript==
// @name        Facebook Autopoke 2.1
// @author      Michael Soh (based on Lukas Fragodt's Auto-Poke and EZ-Poke)
// @namespace   http://userscripts.org/scripts/show/5200
// @description Automatically pokes back pokers listed on your home page. This script is based on Lukas Fragodt's Auto-Poke and EZ-Poke.  Modified on 10/19/2006, this new version takes into account a new authentication that facebook installed.  A brief changelog is available on the script's userscripts.com website.  This script is licensed under the GNU Public License Version 2.0 and is distributed without warranty.
// @include     http://facebook.com/home.php*
// @include     http://*.facebook.com/home.php*
// ==/UserScript==



var subDomainRegExp = /http:\/\/(.*\.)facebook\.com/;
var subDomain = '';
if (subDomainRegExp.exec(document.location) != 0) {
  subDomain = RegExp.$1;
}

//Check each anchor tag and poke the pokees.
var anchors = document.getElementsByTagName('a');
var pokeRegExp = /poke\.php\?id=(\d*)&pokeback=1/;
for (var i = 0; i < anchors.length; i++) {
  if (pokeRegExp.exec(anchors[i].href)) {
    poke(RegExp.$1, anchors[i]);
  }
}


// =-=-=-=-=- FUNCTIONS -=-=-=-=-= //

function poke(pokee, pokeNode) {
     var postformMatch = /name="post_form_id" value="(\w+)"/;
     var post_form_id = 0;

     GM_xmlhttpRequest({
       method:'GET',
       url:'http://' + subDomain + 'facebook.com/poke.php?id=' + pokee + '&pokeback=1',
       headers:{
	 'User-Agent':window.navigator.userAgent,
	 'Accept':'text/html',
       },
       onload: function(responseDetails) {
	 if (responseDetails.status == 200) {
	   if (responseDetails.responseText.indexOf('You are about to poke') != -1) {
	      pokeNode.innerHTML = 'Reading confirmation page...';
	      postformMatch.exec (responseDetails.responseText);
	      post_form_id = RegExp.$1;
	      DoThePoke(pokeNode, post_form_id, pokee);
	   } else if (responseDetails.responseText.indexOf('has not received your last poke yet') != -1) {
	      pokeNode.removeAttribute('href');
	      pokeNode.innerHTML = 'Already poked!';
	   } else {
	      pokeNode.removeAttribute('href');
	      pokeNode.innerHTML = 'Auto-Poke failed! [1.1]';
	      GM_log("Auto-Poke failed -- Error Code 1.1: While retreaving the poke confirmation page, the script was unable to determine whether the pokee had already been poked or is about to be poked.  This is likely the result of Facebook changing their code again.  Uncomment line 55 to determine what page is being processed.");
	      // GM_log(responseDetails.responseText);
	   }
	 } else {
	   pokeNode.innerHTML = 'Auto-Poke failed because it could not obtain the post_form_id.';
	 }
       }
     }); // end of GM_xmlhttpRequest
}


function DoThePoke(pokeNode, post_form_id, pokee) {
  //Submit the poke.
  GM_xmlhttpRequest({
    method:'POST',
    url:'http://' + subDomain + 'facebook.com/poke.php',
    headers:{
      'User-Agent':window.navigator.userAgent,
      'Accept':'text/xml',
      'Content-Type':'application/x-www-form-urlencoded',
      'Referer':'http://' + subDomain + 'facebook.com/poke.php?id=' + pokee,
    },
    data:'post_form_id=' + post_form_id + '&id=' + pokee + '&confirmed=1&pokeback=1',
    onload: function (responseDetails) {
      if (responseDetails.status == 200) {
        //Poke either already happened, was successful, or failed.
        if (responseDetails.responseText.indexOf('has not received your last poke yet') != -1) {
          pokeNode.removeAttribute('href');
          pokeNode.innerHTML = 'Already poked!';
        } else if (responseDetails.responseText.indexOf('You have poked') != -1) {
          pokeNode.removeAttribute('href');
          pokeNode.innerHTML = 'Auto-Poked!';
        } else {
          pokeNode.removeAttribute('href');
          pokeNode.innerHTML = 'Poke failed! [2.1]';
	  GM_log("Auto-Poke failed -- Error Code 2.1: The confirmation page was retreived and the post_form_id was found (" + post_form_id + ").  However, facebook.com gave a response that did not show whether the poke was processed.  Uncomment line 90 of the script to determine what facebook.com is returning.");
	  GM_log(responseDetails.responseText);
        }
      } else {
        //uncomment for details
        //alert ('Poke failed: ' + responseDetails.status + ': ' + responseDetails.statusText);
        pokeNode.removeAttribute('href');
        pokeNode.innerHTML = 'Poke failed! [2.2]';
	GM_log("Auto-Poke failed -- Error Code 2.2: The confirmation page was retreived and the post_form_id was found (" + post_form_id + ").  However, facebook.com gave a non-200 OK response.\n\nfacebook.com returned: " + responseDetails.status + responseDetails.statusText);
	// GM_log(responseDetails.responseText);
      }
    },
    onerror: function (responseDetails) {
      //uncomment for details
      alert ('Poke failed: ' + responseDetails.status + ': ' + responseDetails.statusText);
      pokeNode.removeAttribute('href');
      pokeNode.innerHTML = 'Poke failed! (2.3)';
      GM_log("Auto-Poke failed -- Error Code 2.3: The confirmation page was retreived and the post_form_id was found (" + post_form_id + ").  However, this script experienced unknown errors while attempting to confirm the poke.");
      // GM_log(responseDetails.responseText);
    }
  });
}


