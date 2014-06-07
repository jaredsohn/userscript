// ==UserScript==
// @name           Remove CSS
// @description    Removes CSS from Page
// @date           2011-10-20
// @author         EVIL TW33TY
// @namespace      
// @include        *
// ==/UserScript==

function removejscssfile(filename, filetype){
 var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
 var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
 var allsuspects=document.getElementsByTagName(targetelement)
 for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
   allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
 }
}

removejscssfile("somescript.js", "js") //remove all occurences of "somescript.js" on page
removejscssfile("*.css", "css") //remove all occurences "somestyle.css" on page

//End