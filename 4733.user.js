// ==UserScript==
// @name          Yahoo finance message board modification
// @namespace     http://fredbrady.net/userscripts
// @description	  Turn the Yahoo! Finance message board back to the old format. Tested briefly with Firefox with Greasemonkey plugin. Currently Only reverts messages. 
// @include       http://messages.finance.yahoo.com/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, 
// etc.)

// This is a quick fix I did to Turn the new yahoo finance message board back to something like the old one.
//

(function () {
	clearSyslinks();
})();


function clearSyslinks()
{

   var titles = new Array();
  var x;
  x=0;
  var atags = document.getElementsByTagName('a');
  for(var i=0; i < atags.length; i++){
      if(atags[i].className == 'syslink'){
	atags[i].setAttribute('href',atags[i+2].getAttribute('href'));	
	atags[i].setAttribute('title',atags[i+2].getAttribute('title'));

	titles[x]=atags[i+2].getAttribute('title');
	x++;

	i+=3;
	
      }
    }
  

  var y;
  y=0;
  var spans = document.getElementsByTagName('span');
  for(var i=0; i < spans.length; i++){
      if(spans[i].className == 'user-href'){
  	// spans[i].style.display = 'none';
	var span = document.createElement("span");
        spans[i].parentNode.replaceChild(span, spans[i]);
	var a = document.createElement("a");
        a.setAttribute("href", titles[y]);
        a.appendChild(document.createTextNode(titles[y]));
        span.appendChild(a);
	y++;
      }
    }
	
}