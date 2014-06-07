// gloria.tv-downloader.user.js
//
// ==UserScript==
// @name          gloria.tv downloader
// @description	  Show links of video as text
// @namespace     http://www.google.com
// @include       http://*.gloria.tv/?media=*
// @source        http://userscripts.org/scripts/show/105866
// @author        Alexandre Magno
// @version       0.2
// @date          2011-08-06
// ==/UserScript==
//
// --------------------------------------------------------------------
//
/// Feel free to address comments or improvement suggestions to alexandre.mbm@gmail.com
//
// Changelog:
//
//   2011-08-06, version 0.2
//     Fix: .*hd.mp4&sum.* link format included
// 
//   2011-07-01, version 0.1 
//     First version
//
// --------------------------------------------------------------------
//
// Based on "showlinks" script
// http://userscripts.org/scripts/review/101894
//
// Based on "Download YouTube Videos as MP4 , 3gp OR Flv" script
// http://userscripts.org/scripts/show/39788

// Original function of "showlinks" = today, trash!
function main_OLD()
{
	var anchors = document.getElementsByTagName('A');
	var len = anchors.length;
	for (var i = 0; i < len; i++)
	{
		var anchor = anchors[i];
		var hrefValue = anchor.getAttribute('href');
		var expansion = " [" + hrefValue + "] ";
		anchor.appendChild(document.createTextNode(expansion));
	}
}

// This function source code on Internet (an unknow site) 
function getElementsByClassName(classname, node) {
    if(!node) 
        node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))
            a.push(els[i]);
    return a;
}

// Function source code:
// http://www.herongyang.com/JavaScript/DOM-Specification-Dump-Document-Example.html
function nodeToXML(node, indentation, out) {
   out += indentation+"<"+node.nodeName.toLowerCase();
   if (node.attributes!=null) {
      for (var i=0; i<node.attributes.length; i++) {
         var item = node.attributes.item(i);
         var value = item.nodeValue;
         if (value==null) value = "";
         out += " "+item.nodeName+"=\""+value+"\"";
      }
   }
   out += ">\n";
   for (var i=0; i<node.childNodes.length; i++) {
      var item = node.childNodes.item(i);
      out = nodeToXML(item, indentation+"   ", out);
   }
   if (node.nodeValue!=null) 
      out += indentation+"   "+node.nodeValue+"\n";
   out += indentation+"</"+node.nodeName.toLowerCase()+">\n";
   return out;
}

// Try "Online Regular Expression Tester":
// http://www.pagecolumn.com/tool/regtest.htm

function getLink() {
    var str = nodeToXML(document, '', '');
    var re = new RegExp("\'video\'\:.*\.mp4.*\'", "g");
    var myArray = str.match(re);    
    var re = new RegExp("'video': 'http", "g");
    var myArray = myArray[0].replace(re,"http" );
    var re = new RegExp("'$", "g");
    var myArray = myArray.replace(re,"");
    var myArray = myArray.replace(/\\/g, "");
    return myArray;   
}

function main() {
    var title = getElementsByClassName('title');
    title[0].appendChild(document.createTextNode(' - '));
    var link = document.createElement('a');
    link.setAttribute('href', getLink());
    link.appendChild(document.createTextNode('Download'));
    title[0].appendChild(link);
}

main();

// Curiousity about XmlHttpRequest:
// Open webpage and parse it using JavaScript
// http://stackoverflow.com/questions/597907/open-webpage-and-parse-it-using-javascript
