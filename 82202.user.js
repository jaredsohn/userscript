// ==UserScript==
// @name           Pardus Quick-List Auto-filler
// @namespace      pardus.at
// @description    Automatically fills in a quicklist from an external webpage
// @author         Rhindon
// @version        0.9.1
// @include        http://*.pardus.at/ambush.php*
// 0.9.1 - LM: now removing linebreaks from text
// ==/UserScript==

var url = "http://orion.pardus.at/myalliance.php";
var starttext = "[QL]";
var endtext = "[/QL]";

GM_xmlhttpRequest({
  method:"GET",
  url:url,
  onload:function(details) 
  {
    text = details.responseText;
    //alert(text);    
    text = text.substring(text.indexOf(starttext) + starttext.length);
    text = text.substring(0, text.indexOf(endtext)); 
   //alert(text);

    while (text.indexOf("<br>") > -1)
    {
      text = text.replace("<br>", "");
    }

    while (text.indexOf(/\n/g) > -1)
    {
      text = text.replace(/\n/g, "");
    }

    //alert(text);
    document.getElementsByName("readlist")[0].value = text;

    }
 }
);
