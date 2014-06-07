// ==UserScript==
// @name           MLGPro.com Ad Kill / Video Viewer
// @namespace      All
// @include        http://gameroom.mlgpro.com/view/*
// ==/UserScript==
function explode(inputstring, separators, includeEmpties) {
   inputstring = new String(inputstring);
   separators = new String(separators);

   if(separators == "undefined") { 
      separators = " :;";
   }

   fixedExplode = new Array(1);
   currentElement = "";
   count = 0;

   for(x=0; x < inputstring.length; x++) {
      char = inputstring.charAt(x);
      if(separators.indexOf(char) != -1) {
         if ( ( (includeEmpties <= 0) || (includeEmpties == false)) && (currentElement == "")) { }
         else {
            fixedExplode[count] = currentElement;
            count++;
            currentElement = ""; } }
      else { currentElement += char; }
   }

  if (( ! (includeEmpties <= 0) && (includeEmpties != false)) || (currentElement != "")) {
      fixedExplode[count] = currentElement; }
   return fixedExplode;
}


var url = document.location;

var str2 = explode(url, "/", 1);

var final = str2[4].replace(".html", "");




document.getElementById('ad-wrap').innerHTML="<center><a name='vid'><embed src='" + "http://gameroom.mlgpro.com/p.swf?video_id=" + final + "' height=530 width=600></embed></a>";

