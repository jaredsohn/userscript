// ==UserScript==
// @name           Erepublik draugiem say
// @namespace      ;)
// @author         eSolutions
// @version        0.10b
// @description    Pievieno iespeju erepublik.com rakstus ieteikt draugiem.lv Runa sadala!
// @include        http://ww*.erepublik.com/*/article/*
// ==/UserScript==


var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.innerHTML = 'function DraugiemSay( title, url, titlePrefix ){ window.open(  "http://www.draugiem.lv/say/ext/add.php?title=" + encodeURIComponent( title ) +  "&link=" + encodeURIComponent( url ) +  ( titlePrefix ? "&titlePrefix=" + encodeURIComponent( titlePrefix ) : "" ),  "",  "location=1,status=1,scrollbars=0,resizable=0,width=530,height=400" ); return false; }';
headID.appendChild(newScript);

try
  {  
	var title = document.evaluate("//h2[@class='padded']", document, null, 9, null).singleNodeValue;
	title = title.children.item(0).innerHTML;
	url = window.location;
	var box = document.evaluate("//div[@class='box']", document, null, 9, null).singleNodeValue;
	say = document.createElement("div");
	title.className = "drsay";
	say.innerHTML = '<a title="ieteikt draugiem - draugiem.lv" onclick="DraugiemSay(\''+title+'\', \''+url+'\', \'eRepublik.com\'); return false;" style="margin-left: 0px;" href="#"><img border="0" style="vertical-align: middle;" alt="Ieteikt draugiem - draugiem.lv" src="http://www.apollo.lv/images/draugiem.png"/></a>';
	say.setAttribute("id", "facebook_button");	
	box.appendChild(say);	
  }
catch(err)
  {		
  }

 		