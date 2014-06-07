// ==UserScript==
// @name           pornbb code2link
// @namespace      all
// @description    Changes links in Code-blocks in bornbb to clickable links anonymized bei anonym.to
// @include        http://www.pornbb.org/viewtopic.php*
// ==/UserScript==

(function() {
	
   window.addEventListener("load", function(e) {
    	var tdList = document.getElementsByTagName('td');
		for( i=0; i < tdList.length; i++) {	
			var tdName = tdList[i].className;
				if (tdName.match("code") == "code" && tdList[i].innerHTML.match("http") == "http" ) {
					var tdtextarray = new Array();
					tdtextarray=tdList[i].innerHTML.split('<br>');
					tdList[i].innerHTML = "";
					for( j=0; j < tdtextarray.length; j++) {
						  if (tdtextarray[j].match("http") == "http" ){
				 					tdList[i].innerHTML+="<a target=\"_blank\" href=\"http://anonym.to/?"+tdtextarray[j]+"\">"+tdtextarray[j]+"</a><br>";
				 			}
				 			else
				 				{
				 					tdList[i].innerHTML+=tdtextarray[j]+"<br>";
				 				}
				}
		}
	}
	return;
  }, false);
})();