// ==UserScript==
// @name        Facebook Autopoke
// @author      Michael Soh
// @namespace   autopoke_5200
// @description Automatically pokes back pokers listed on your home page. This script is based on Lukas Fragodt's Auto-Poke and EZ-Poke.
// @version     2.4.2--debug
// @include     http*://facebook.com/home.php*
// @include     http*://*.facebook.com/home.php*
// @include     http*://*.facebook.com/
// @include     http*://*.facebook.com/?*
// @include     http*://*.facebook.com/#*
// 
// @require     http://usocheckup.dune.net/5200.js
//
// ==/UserScript==


var subDomainRegExp = /http[s]?:\/\/(.*\.)facebook\.com/;
var subDomain = '';
if (subDomainRegExp.exec(document.location) != 0) {
     subDomain = RegExp.$1;
}

GM_log('Current Location: ' + document.location);

// Retrieve poke links via XPath
var anchors = document.evaluate('.//a[contains(.,"\u0160tuchn\u00fa\u0165 sp\u00e4\u0165")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (anchors.snapshotLength > 0) {
     GM_log('Odkazy na \u0161tuchnutie sp\u00E4\u0165 n\u00E1jden\u00E9: ' + anchors.snapshotLength)
     var pokeRegExp = /id=(\d*)/;
     for (var i = 0; i < anchors.snapshotLength; i++) {
	  pokeRegExp.exec(anchors.snapshotItem(i).href);
	  poke(RegExp.$1, anchors.snapshotItem(i)); 
     }
} else {
     GM_log('No pokes found');
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
	   if (responseDetails.responseText.indexOf('Chyst') != -1) {
	      pokeNode.innerHTML = '\u010C\u00EDta sa potvrdzovacia str\u00E1nka...';
	      postformMatch.exec (responseDetails.responseText);
	      post_form_id = RegExp.$1;
	      DoThePoke(pokeNode, post_form_id, pokee);
	   } else if (responseDetails.responseText.indexOf('zatia') != -1) {
	      pokeNode.removeAttribute('href');
	      pokeNode.innerHTML = 'U\u017E \u0161tuchnut\u00E9!';
	   } else {
	      pokeNode.removeAttribute('href');
	      pokeNode.innerHTML = 'Autom. \u0161tuchnutie ne\u00FAspe\u0161n\u00E9! [1.1]';
	      GM_log("Autom. \u0161tuchnutie ne\u00FAspe\u0161n\u00E9 -- K\u00F3d chyby 1.1: Pri z\u00EDskavan\u00ED potvrdzovacej str\u00E1nky \u0161tuchnutia nemohol skript ur\u010Di\u0165, \u010Di u\u017E bolo \u0161tuchnut\u00E9 alebo sa chyst\u00E1 \u0161tuchnutie. V\u00E4\u010D\u0161inou je to z d\u00F4vodu toho, \u017Ee Facebook znova zmenil k\u00F3d.");
	      GM_log(responseDetails.responseText);
	   }
	 } else {
	   pokeNode.innerHTML = 'Autom. \u0161tuchnutie ne\u00FAspe\u0161n\u00E9, preto\u017Ee sa nedalo z\u00EDska\u0165 post_form_id.';
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
        if (responseDetails.responseText.indexOf('zatia') != -1) {
          pokeNode.removeAttribute('href');
          pokeNode.innerHTML = 'U\u017E \u0161tuchnut\u00E9!';
        } else if (responseDetails.responseText.indexOf('ste') != -1) {
          pokeNode.removeAttribute('href');
          pokeNode.innerHTML = 'Autom. \u0161tuchnut\u00E9!';
        } else {
          pokeNode.removeAttribute('href');
          pokeNode.innerHTML = 'Autom. \u0161tuchnutie ne\u00FAspe\u0161n\u00E9! [2.1]';
	  GM_log("Autom. \u0161tuchnutie ne\u00FAspe\u0161n\u00E9 -- K\u00F3d chyby 2.1: Potvrdzovacia str\u00E1nka bola z\u00EDskan\u00E1 a post_form_id sa na\u0161lo (" + post_form_id + "). Facebook.com v\u0161ak poslal odpove\u010F, ktor\u00E1 neukazuje, \u010Di bolo \u0161tuchnutie spracovan\u00E9.");
	  GM_log(responseDetails.responseText);
        }
      } else {
        //uncomment for details
        //alert ('Poke failed: ' + responseDetails.status + ': ' + responseDetails.statusText);
        pokeNode.removeAttribute('href');
        pokeNode.innerHTML = 'Autom. \u0161tuchnutie ne\u00FAspe\u0161n\u00E9! [2.2]';
	GM_log("Autom. \u0161tuchnutie ne\u00FAspe\u0161n\u00E9 -- K\u00F3d chyby 2.2: Potvrdzovacia str\u00E1nka bola z\u00EDskan\u00E1 a post_form_id sa na\u0161lo (" + post_form_id + "). Facebook.com v\u0161ak poslal odpove\u010F non-200 OK.\n\nFacebook.com vr\u00E1til: " + responseDetails.status + responseDetails.statusText);
	GM_log(responseDetails.responseText);
      }
    },
    onerror: function (responseDetails) {
      //uncomment for details
      alert ('Poke failed: ' + responseDetails.status + ': ' + responseDetails.statusText);
      pokeNode.removeAttribute('href');
      pokeNode.innerHTML = 'Poke failed! (2.3)';
      GM_log("Autom. \u0161tuchnutie ne\u00FAspe\u0161n\u00E9 -- K\u00F3d chyby 2.3: Potvrdzovacia str\u00E1nka bola z\u00EDskan\u00E1 a post_form_id sa na\u0161lo (" + post_form_id + "). Skript v\u0161ak pri pokuse o potvrdenie \u0161tuchnutia zaznamenal nezn\u00E1me chyby.");
      GM_log(responseDetails.responseText);
    }
  });
}