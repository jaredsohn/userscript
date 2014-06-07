// ==UserScript==
// @name Bypass Canalmail
// @author Jesus Perez (chuso) 
// @namespace http://userjs.org/
// @version 1.0_rc1
// @description  Replaces links that force you to register in Canalmail to replace them by the final URL
// @ujs:category site: enhancements
// @ujs:documentation http://chuso.net/?id=59
// @ujs:download http://chuso.net/software/opera/userjs/bypass_canalmail.js
// ==/UserScript==

/*
 * Bypass Canalmail
 *
 * Looks for links forcing you to register in Canalmail and unencrypts the
 * final URL as an attempt to avoid registering in Canalmail spam delivery
 *
 * Jesus Perez (a) h0m3r
 * http://chuso.net
 *
 * Released to the public domain v. 1.0_rc1 (2007-09-01)
 *
 * Successfully tested with Opera <http://www.opera.com>
 * For Firefox support give a try (I didn't) to Greasemonkey
 * <http://www.greasespot.net/>
 */

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/* The following fuction is widely spread in the Internet with no credited
 * authors, so I expect it's in the public domain */

function base64dec(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
   } while (i < input.length);

   return output;

}

function bcm_main()
{
  for (var i=0; i<document.links.length; i++)
    // Is a Canalmail link?
    if (
	 // Tests if the link url has a domain name, otherwise, the following
	 // condition will throw an error (with hostname-less urls such us
	 // mailto:, ed2k:, secondlife:, about:, ...)
         document.links[i].hostname &&
	 // Does the link point to canalmail.corp?
         document.links[i].hostname.match(/canalmailcorp.com$/) &&
	 // Does this link to canalmailcorp.com have any argument in its URL?
	 document.links[i].search &&
	 // Is this link to canalmailcorp.com hiding the real URL?
	 document.links[i].search.match(/url=/)
       )
    {
      var origurl = document.links[i].href;

      // Extract the final URL from Canalmail URL
      var urlstart = origurl.indexOf('url=');
      if (urlstart != -1)
      {
        newurl = origurl.substr(urlstart+4);
        if (newurl.indexOf("&") != -1)
          newurl = newurl.substr(0, newurl.indexOf("&"));

	// Test if the URL is Base64 encoded
	if (newurl.match(/:\/\//))	// It isn't
          document.links[i].href = newurl;
	else				// It is
          document.links[i].href = base64dec(newurl);
      }
    }
}

window.addEventListener('load', bcm_main, false);
