// ==UserScript==
// @name          Amazon to Buzzillions link
// @namespace     http://www.buzzillions.com
// @description   Read buzzillions.com reviews from any amazon product page
// @include       http://*amazon.*
// ==/UserScript==

(function() {

// http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\\\s)" + className + "(\\\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}

        var element = document.getElementById('jumpbar');
        var tr = element.getElementsByTagName("tr")[1];
	var td = tr.getElementsByTagName("td")[1];
	var div = td.getElementsByTagName("div")[0];
	var nobrs = div.getElementsByTagName("nobr");
	var nobr = nobrs[nobrs.length-1];

	var b = getElementsByClassName('sans', 'b', document.getElementById('handleBuy'))[0];

	var name = b.innerHTML;
	name = name.replace(/<!--.*-->/, "");

	if (nobr) {
		var n = document.createElement("nobr");
		var a = document.createElement("a");
		a.setAttribute("href", "http://www.buzzillions.com/x/s?N=0&D=x&Ntt=" + escape(name));
		a.className = "tiny";
		a.innerHTML = "Buzzillions reviews";
		n.appendChild(document.createTextNode(" "));
		n.appendChild(a);
		nobr.parentNode.insertBefore(n, nobr.nextSibling);
	}
  
})();