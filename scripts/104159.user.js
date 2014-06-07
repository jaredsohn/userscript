// ==UserScript==
// @name           MLXAddressOnly
// @namespace      MLXAddressOnly
// @description    Used to generate addresses only from mlx exchange site

var style = "position:absolute;top:216px;height:18px;left:8px;width:213px;font:bold 10pt Tahoma;text-align:left;vertical-align:top;line-height:120%;color:rgb(0,0,128);overflow:hidden;"

function in_array (needle, haystack, argStrict) 
{
    var key = '', strict = !!argStrict;
 
    if (strict)        
    	for (key in haystack)
            if ( (strict && haystack[key] === needle) || ( !strict && strict && haystack[key] == needle ) )
                return true;
 
    return false;
}

var linkNames = new Array();

var heads = document.getElementsByClassName("entries");
for(var j in heads) {
	var links = heads[j].getElementsByTagName("a");
	var br = heads[j].getElementsByTagName("br");
	var hrNodes = heads[j].getElementsByTagName("hr");
	for(var i in links) {
		if(links[i].style.toString()==style){
			try {
				links[i].style.display="none";
				br[i].style.display="none";
				hrNodes[i].style.display = "none";
			} catch(e) {
				
			}
		} else {
			if(!in_array(links[i].innerHTML,linkNames,true)) {
				linkNames.push(links[i].innerHTML);
			}
		}
	}
}

var pc = document.getElementsByClassName("paragraphContainer");
for(var i in linkNames) {
	var myElement = pc.createElement('<div style="width:600; height:200;background-color:blue;">'+linkNames[i]+'</div>');
   pc.appendChild(myElement); 
}
// ==/UserScript==