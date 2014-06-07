/// Qwikify Extended
// version 0.2
// 2005-12-04
// John Goering (Original Author of Qwikify)
// Dave (polyphenol) - Author of Qwikify Extended
// Frank (DesertFox) (Author of DesertFox Edition)
//
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name          Qwikify Extended
// @namespace     http://userscripts.org
// @description   Simple script to show the chosen article for whatever term has been highlighted if any of the 26 letters are pressed. Pressing 'a' for example, will show the answers.com results for the term. Please un-install older version before installing this new version.
// @include       *
// ==/UserScript==

// 2005-12-04: Modified and fixed code so it doesn't run when ctrl, alt, or shift are pressed.
// 
// List of keys:
// (You can add or modify your own keys too!)
// Keycodes: a = 65, b = 66, ... z = 90

document.addEventListener("keydown", function(event) {					
	var selectedText = window.getSelection();
	
	if (selectedText != '' && !event.altKey && !event.ctrlKey && !event.shiftKey){

 switch (1==1){
 	/* a */  case event.keyCode==65: GM_openInTab('http://www.answers.com/'+selectedText); break;  
    /* b */  case event.keyCode==66: GM_openInTab('http://buy.ebay.com/'+selectedText); break;
    /* c */  case event.keyCode==67: GM_openInTab('http://www.metacrawler.com/info.metac/search/web/'+selectedText); break;
    /* d */  case event.keyCode==68: GM_openInTab('http://www.thefreedictionary.com/'+selectedText); break;
    /* e */  case event.keyCode==69: GM_openInTab('http://everything2.com/?node='+selectedText); break;
    /* f */  case event.keyCode==70: GM_openInTab('http://www.feedster.com/search.php?q='+selectedText); break;
    /* g */  case event.keyCode==71: GM_openInTab('http://www.google.com/search?hl=en&q='+selectedText); break;
    /* h */  case event.keyCode==72: GM_openInTab('http://www.howstuffworks.com/search.php?search='+selectedText); break;
    /* i */  case event.keyCode==73: GM_openInTab('http://www.google.com/search?hl=en&btnI=Im+Feeling+Lucky&q='+selectedText); break;
    /* j */  case event.keyCode==74: GM_openInTab('http://web.ask.com/web?q='+selectedText); break;
    /* k */  case event.keyCode==75: GM_openInTab('http://www.flickr.com/photos/tags/'+selectedText); break;
    /* l */  case event.keyCode==76: GM_openInTab('http://www.bloglines.com/search?t=1&q='+selectedText+'&FORM=QBRE'); break;
    /* m */  case event.keyCode==77: GM_openInTab('http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?CMD=search&DB=pubmed&term='+selectedText); break;
    /* n */  case event.keyCode==78: GM_openInTab('http://news.google.com/news?hl=en&ned=&btnG=Search+News&q='+selectedText); break;
    /* o */  case event.keyCode==79: GM_openInTab('http://sourceforge.net/search/?type_rch=soft&exact=1&Search=Search&words='+selectedText); break;
    /* p */  case event.keyCode==80: GM_openInTab('http://www.alltheweb.com/search?cat=img&cs=iso88591&rys=0&itag=crv&q='+selectedText); break;
    /* q */  case event.keyCode==81: GM_openInTab('http://search.about.com/fullsearch.htm?terms='+selectedText); break;
    /* r */  case event.keyCode==82: GM_openInTab('http://search.wired.com/wnews/default.asp?query='+selectedText); break;
    /* s */  case event.keyCode==83: GM_openInTab('http://slashdot.org/search.pl?tid=&query='+selectedText); break;
    /* t */  case event.keyCode==84: GM_openInTab('http://www.technorati.com/tag/'+selectedText); break;
    /* u */  case event.keyCode==85: GM_openInTab('http://groups.google.com/groups?hl=en&qt_s=Search&q='+selectedText); break;
    /* v */  case event.keyCode==86: GM_openInTab('http://imdb.com/find?q='+selectedText); break;
    /* w */  case event.keyCode==87: GM_openInTab('http://en.wikipedia.org/wiki/'+selectedText); break;
    /* x */  case event.keyCode==88: GM_openInTab('http://del.icio.us/tag/'+selectedText); break;
    /* y */  case event.keyCode==89: GM_openInTab('http://search.yahoo.com/search/dir?y=d&p='+selectedText); break;
    /* z */  case event.keyCode==90: GM_openInTab('http://a9.com/'+selectedText); break;
    
    /* = */  case event.keyCode==61: GM_openInTab('http://userscripts.org/tag/'+selectedText); break;
    
  
    
//     switch (1==1){
//  		/* a */  case event.keyCode==65: window.location.href = 'http://www.answers.com/'+selectedText; break;
//     /* b */  case event.keyCode==66: window.location.href = 'http://buy.ebay.com/'+selectedText; break;
//     /* c */  case event.keyCode==67: window.location.href = 'http://www.metacrawler.com/info.metac/search/web/'+selectedText; break;
//     /* d */  case event.keyCode==68: window.location.href = 'http://www.thefreedictionary.com/'+selectedText; break;
//     /* e */  case event.keyCode==69: window.location.href = 'http://everything2.com/?node='+selectedText; break;
//     /* f */  case event.keyCode==70: window.location.href = 'http://www.feedster.com/search.php?q='+selectedText; break;
//     /* g */  case event.keyCode==71: window.location.href = 'http://www.google.com/search?hl=en&q='+selectedText; break;
//     /* h */  case event.keyCode==72: window.location.href = 'http://www.howstuffworks.com/search.php?search='+selectedText; break;
//     /* i */  case event.keyCode==73: window.location.href = 'http://www.google.com/search?hl=en&btnI=Im+Feeling+Lucky&q='+selectedText; break;
//     /* j */  case event.keyCode==74: window.location.href = 'http://web.ask.com/web?q='+selectedText; break;
//     /* k */  case event.keyCode==75: window.location.href = 'http://www.flickr.com/photos/tags/'+selectedText; break;
//     /* l */  case event.keyCode==76: window.location.href = 'http://www.bloglines.com/search?t=1&q='+selectedText+'&FORM=QBRE'; break;
//     /* m */  case event.keyCode==77: window.location.href = 'http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?CMD=search&DB=pubmed&term='+selectedText; break;
//     /* n */  case event.keyCode==78: window.location.href = 'http://news.google.com/news?hl=en&ned=&btnG=Search+News&q='+selectedText; break;
//     /* o */  case event.keyCode==79: window.location.href = 'http://sourceforge.net/search/?type_rch=soft&exact=1&Search=Search&words='+selectedText; break;
//     /* p */  case event.keyCode==80: window.location.href = 'http://www.alltheweb.com/search?cat=img&cs=iso88591&rys=0&itag=crv&q='+selectedText; break;
//     /* q */  case event.keyCode==81: window.location.href = 'http://search.about.com/fullsearch.htm?terms='+selectedText; break;
//     /* r */  case event.keyCode==82: window.location.href = 'http://search.wired.com/wnews/default.asp?query='+selectedText; break;
//     /* s */  case event.keyCode==83: window.location.href = 'http://slashdot.org/search.pl?tid=&query='+selectedText; break;
//     /* t */  case event.keyCode==84: window.location.href = 'http://www.technorati.com/tag/'+selectedText; break;
//     /* u */  case event.keyCode==85: window.location.href = 'http://groups.google.com/groups?hl=en&qt_s=Search&q='+selectedText; break;
//     /* v */  case event.keyCode==86: window.location.href = 'http://imdb.com/find?q='+selectedText; break;
//     /* w */  case event.keyCode==87: window.location.href = 'http://en.wikipedia.org/wiki/'+selectedText; break;
//     /* x */  case event.keyCode==88: window.location.href = 'http://del.icio.us/tag/'+selectedText; break;
//     /* y */  case event.keyCode==89: window.location.href = 'http://search.yahoo.com/search/dir?y=d&p='+selectedText; break;
//     /* z */  case event.keyCode==90: window.location.href = 'http://a9.com/'+selectedText; break;
//     
//     /* = */  case event.keyCode==61: window.location.href = 'http://userscripts.org/tag/'+selectedText; break;
//      }
    
 //todo 0-9 language translations
 
//http://babelfish.altavista.com/babelfish/tr?doit=done&text=hello&lp=en_ko' target=translate  //not working

    default: break;
 		
}	
}
	
}, false);
