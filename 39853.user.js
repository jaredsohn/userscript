// ==UserScript==
// @name           Picasaweb Img Direct Links
// @namespace      markus_b
// @include        http://picasaweb.google.de/*/*
// ==/UserScript==

//get all script tags
var scripts=document.getElementsByTagName('script');

//define what to search for (start and end)
var searchFor='\"content\":[{\"url\":\"';
var endFor='\"';

for (var i=0; i<scripts.length; i++) {
  //does the searchstring exists in the script text?
  if (scripts[i].text.indexOf(searchFor)>0) {
     
     var scriptText=scripts[i].text;
     var y=0;

     //cut every text between start and end out of the script text
     while(scriptText.indexOf(searchFor)>0) {
       y=y+1;
       var link=scriptText.substring(scriptText.indexOf(searchFor)+searchFor.length);
       link=link.substring(0,link.indexOf(endFor));
     //alert(link);
    
       //create a new text link with the cutted text
       var a = document.createElement('a');
			a.setAttribute("href", link);
			a.setAttribute("class", "dLink");
			a.setAttribute("title", "Click for image");
			a.appendChild(document.createTextNode('direct link '+y));
       document.getElementById('lhid_album_title').parentNode.appendChild(a);
       a.parentNode.appendChild(document.createElement('br'));
       
       scriptText=scriptText.substring(scriptText.indexOf(searchFor)+searchFor.length+link.length)
    }

  }
}

//"content$src":"