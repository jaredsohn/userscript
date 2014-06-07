// ==UserScript==
// @name          Twoosh Spotter
// @namespace     http://euicho.com/greasemonkey
// @author        Thomas Gagnon
// @version       2.0
// @description   Detects twitters of exactly 140 chars and places a twoosh indicator next to the delete icon. Based on parts of Manuel Gonzalez Noriega's Twitter Powertoys script.
// @include       http://twitter.com*
// ==/UserScript==
//
//
// Version 2.0 Notes:
// a) Fixed bug where hitting "more" button didn't mark twooshes on newly loaded tweets.
// b) Fixed bug where "&" was converted to "&amp;" and counted as 4 characters instead of 1.
//
// 2009-07-09
// Copyright (c) 2007-2009 Thomas Gagnon
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//Please direct-message me via twitter (username: euicho) with any bugs/feature requests.
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// --------------------------------------------------------------------

(function()
{

   var d = document;
   var show_count = false; // Set to true to show the character count for twitters.
   var more = document.getElementById('more');
   var start_at = 0; //first check all tweets.  If more button hit, this stops duplicate tagging
   
   // This ugly variable is here to prevent having to get the twoosh icon from some untrusted server.
   // You're more than welcome to create your own icon and go to
   // http : // software.hixie.ch / utilities / cgi / data / data  to create the data URI.
   var img_data = "data:image/gif,GIF89a%16%00%16%00%87%00%00%00%00%00BB9BBBJB9JBBJJ9JJJRJ9RRRZR9ZZZccckZ1kkkskkssksss%7Bk1%7B%7B%7B%84k)%84%84%84%8Cs)%8C%8C%8C%94%7B)%94%94%94%9C%84)%9C%9C%9C%A5%84!%A5%A5%A5%AD%8C!%AD%AD%AD%B5%B5%B5%BD%94%18%BD%94!%BD%BD%BD%C6%C6%C6%CE%CE%CE%D6%A5%18%D6%D6%D6%DE%DE%DE%E7%B5%10%E7%E7%E7%EF%BD%10%EF%EF%EF%F7%F7%F7%FF%C6%08%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%FF%00%2C%00%00%00%00%16%00%16%00%00%08%FF%00%FF%09%14h%E2%83%40%05%18%06jH1%B0aC%12%028%98%10%20%80!%85%8A%0E%07%8AX%F1%0F%A2%80%05%05%04Pp%401%C5%09%0C%23%1Cb%10%20%81%83%80%08%02%12T%10%40%00%E6%02%01%06X8LA%91b%89%0E%40%3B%94%08AS%80%85%87%24H4(0A%40%89%16P%A1%12%9D%E9!)%89%7F%1Az%FA%7C%1A%B5E%89%12Z%23%0A%B4%F02D%D7%B3-B%84%60%20%20%E1%40%09%02%00%C8%9D%1B%15%40%0B%00D%15%98%18%A8T%40%87%BBP%ED%06%BE%1B%E2%00%C5%05%1C%E0%16%C8%F0W%B0%DD%C7%84g%B2%3C%A1%80b%81%C6u%01K%15%D0%E0%C4%40%13%08%FCj%06%EC%98%A8%84%86%17%23%A8-%A1%E2%2C%8A%A1k%8D%0A%CC%AA%F5%EB%D9%AFa5tL%9Au%26%D7%A8D%2F%08%80%60%B5!%84%A2C%83%0E%D5%CA%B1!O%CE%2F)n%20PS%80%87%E3%1C%1C~X%E8%91%C2%02%C3%951%A6%1C%10%91Q%20%C4%84%1EO%C0eX%9E%AFn%81%0E%1E%08%A4%C0%BE%7DF%12%06%ED%07%04%00%3B";
	
	// Listen for when new tweets are loaded (more button is hit)
	var _onPageChange = unsafeWindow.onPageChange;
	unsafeWindow.onPageChange = function(A) {
		TwooshSpotter();
		_onPageChange(A);
	};
	
   function TwooshSpotter()
   {
      var statuses = getElementsByClassName('status-body', 'span');
	  var entrycontent;
      var twittertext;
	  var countspan;
	
      // Itterate through the last tweet and the timeline to find twooshes
      for (var i = start_at; i < statuses.length; i++ )
      {
         entrycontent = statuses[i].getElementsByClassName('entry-content', 'span'); // this span holds entry text/html
         twittertext = entrycontent[0].innerHTML;                                    // get the entry text/html
         twittertext = trimHTML(twittertext);                                  // trim out the html
		 
         if (show_count)                                                             // User has chosen to display character counts for every tweet
         {
            countspan = d.createElement('span');                                     // create an element to hold the character count
            countspan.innerHTML = " (" + twittertext.length + ")";                   // add the character count to it
            countspan.setAttribute('class', 'twooshindicator');                      // give the element a class
            countspan.setAttribute('style', 'font-size:xx-small; margin-left:4px');  // set the font-size of the character count
            entrycontent[0].nextSibling.insertBefore(countspan,entrycontent[0].nextSibling.lastChild); // insert the character count element
         }

         if (twittertext.length >= 140)                                              // 140 characters means it's a twoosh!
         {
            m_ico = d.createElement('img');                                          // create the twoosh icon
            m_ico.src = img_data;                                                    // set the icon data (set what it looks like)
            m_ico.setAttribute('alt', 'twoosh!');                                    // set the alt text
			m_ico.setAttribute('style', 'margin:0 0 -6px 6px');                      // style it
            entrycontent[0].parentNode.insertBefore(m_ico,entrycontent[0].nextSibling); // add the icon to the end of the twoosh
         }
      }
	  start_at = statuses.length; //save place for more button
   }

   // Removes HTML tags
   function trimHTML(inStr)
   {
		inStr = inStr.replace(/<[^>]*>/g, ""); //remove html tags
		return inStr.replace(/&amp;/g, "&");  //replace &amp; with &
	}

   // Finds elements by their class and tag, and returns them in an array
   function getElementsByClassName(className, tagIn, elmIn)
   {
      var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
      var tag = tagIn || "*";
      var elm = elmIn || document;
      var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
      var returnElements = [];
      var current;
      var length = elements.length;
      for(var i = 0; i < length; i ++ )
      {
         current = elements[i];
         if(testClass.test(current.className))
         {
            returnElements.push(current);
         }
      }
      return returnElements;
   }

   //adds a style to the page
   function addGlobalStyle(css)
   {
      var head, style;
      head = document.getElementsByTagName('head')[0];
      if ( ! head)
      {
         return;

      }
      style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      head.appendChild(style);
   }
   
   //run twoosh spotter!
   var twoosh = new TwooshSpotter();

}
)();