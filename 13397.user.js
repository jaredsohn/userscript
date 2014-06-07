// ==UserScript==
// @name          EasyNews flashGot page-generator
// @namespace     http://blog.hacker.dk/category/greasemonkey/
// @description   Make a list of files from PARview for easy FlashGotting
// @include       http*://*members.easynews.com/*/allpar.html*
// ==/UserScript==

var filters = [ /\.vol[0-9]+%2B[0-9]+\.PAR2/i ];

var parent = document.getElementsByTagName('body')[0];

function poplinklist()
{

	if (window.poplinkwindow) {
	}

   //Kill existing window
   if (window.poplinkwindow){window.poplinkwindow.close();}

   var generator=window.open('','poplinkwindow','height=100,width=500');
   generator.document.write('<html><head><title>Links</title>');
   generator.document.write('<style>a {display:none}</style>');

   
   
   var dummytext = document.body.innerHTML;
   document.body.innerHTML=document.body.innerHTML.replace(/<h4>Auto UnRAR'ed files[^]+<h4>Parity files/,'-');
   //document.body.innerHTML=dummypage.innerHTML.replace(/<h4>/g,'<h1>');

   
   files = document.evaluate( 
	  "//a[@target='fileTarget']",
      document, 
      null, 
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
      null);

   for (var i=0; i<files.snapshotLength; i++)
   {
    thisfile = files.snapshotItem(i);
    for (var j in filters)
    {
        if (thisfile.href.match(filters[j]) == null)
        {
			generator.document.write('<a href="'+thisfile.href+'">'+thisfile.href+'</a> ');
            break;
		}
    }
   }
   generator.document.write('</head><body><h2>Right click here and choose "FlashGot all"</h2>');
   generator.document.write('</body></html>');
   generator.focus();
   generator.document.close();
   generator.focus();
   document.body.innerHTML = dummytext;
   
   elmLink.addEventListener("click", poplinklist, true);
}

parent.innerHTML=parent.innerHTML.replace (/\| <a href="\/zipmanager.html"/g, '| <a href="#" id="poplinklink" onclick="return false;">FlashGot linklist</a> | <a href="/zipmanager.html"');
var elmLink = document.getElementById('poplinklink');
elmLink.addEventListener("click", poplinklist, true);