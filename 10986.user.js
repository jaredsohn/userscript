// ==UserScript==
// @name           Ultimate Guitar Tab Page Enhancements
// @namespace      http://fvds.frih.net/
// @description    1. Shows which strings not to play in the chords and 2. Prevents opening the Firefox search box when using search-on-type for the -, + and escape keys, to allow for the autoscroll shortcuts
// @include        http://www.ultimate-guitar.com/tabs/*
// @include        http://ultimate-guitar.com/tabs/*
// ==/UserScript==

unsafeWindow.parse_chords = function(acc) {
	var	code	=	unsafeWindow.chords[acc]?unsafeWindow.chords[acc]:unsafeWindow.chords[unsafeWindow.js_sins[acc]];
	var	fred	=	unsafeWindow.freds[acc]?unsafeWindow.freds[acc]:unsafeWindow.freds[unsafeWindow.js_sins[acc]];
	var	alt		=	unsafeWindow.alts[acc]?unsafeWindow.alts[acc]:unsafeWindow.alts[unsafeWindow.js_sins[acc]];
	var ebgd	=	new Array("E", "A", "D", "G", "B", "e");
	var	s		=	"";
	for(i=0;i<code.length;i++) {
		var s1	=	"<br><b>" + ebgd[i]+"</b> ";
    if(code.charAt(i) == 'x'){
      s1 += 'xxx|xxx|xxx|xxx|xxx|';
    } else {
  		for(j=1;j<=5;j++) {
  			if(j==code.charAt(i)) {
  				s1	+=	"-x-|";
  			} else {
  				if (j==alt.charAt(i))
  				{
  					s1	+=	"-o-|";
  				}
  				else
  				{
  					s1	+=	"---|";
  				}
  			}
  		}
    }
		s	=	s1+s;
	}
	if(unsafeWindow.sk_chords[acc]) acc += " "+unsafeWindow.sk_chords[acc];
	var st	=	"<center>"+acc+"</center>";
	
	if (fred > 1)
	{
	st	+=	"<span style='text-align: left;'>"+fred+" fr.</span>";
	}

	s = st+"<span style='text-align: center;'>"+s+"</span>";
	return	s;
};

unsafeWindow.onkeydown = function(e){
  switch(e.keyCode){
    case 27:
    case 43:
    case 107:
    case 45:
    case 109:
      e.preventDefault();
      return false;
    default:
      return true;
  }
};