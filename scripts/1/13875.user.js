// ==UserScript==
// @name           Buzzillions to Amazon link
// @namespace      http://www.buzzillions.com
// @description    Shop at amazon from any buzzillions product page
// @include        http://*buzzillions.com/prd-*
// ==/UserScript==

(function() {

// http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(className, tag, elm){	var testClass = new RegExp("(^|\\\\s)" + className + "(\\\\s|$)");	var tag = tag || "*";	var elm = elm || document;	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);	var returnElements = [];	var current;	var length = elements.length;	for(var i=0; i<length; i++){		current = elements[i];		if(testClass.test(current.className)){			returnElements.push(current);		}	}	return returnElements;}

        var h1 = document.getElementsByTagName('h1')[0];
	var name = h1.innerHTML;

	var div = getElementsByClassName('bzWhereToBuy', 'div')[0];
	var table = div.getElementsByTagName('table')[0];
	
        var tr = document.createElement("tr");
	var td = document.createElement("td");
	var a = document.createElement("a");
	var img = document.createElement("img");

	img.setAttribute("src", "http://images.powerreviews.com/images_merchants/logos/amazon.gif");

	a.setAttribute("href", "http://www.amazon.com/gp/search?ie=UTF8&keywords="+escape(name)+"&tag=buzzillions-20&index=blended&linkCode=ur2&camp=1789&creative=9325");
	
	a.appendChild(img);
	td.appendChild(a);
	tr.appendChild(td);

	tr.appendChild(document.createElement("td"));
	tr.appendChild(document.createElement("td"));
	tr.appendChild(document.createElement("td"));
	tr.appendChild(document.createElement("td"));

	table.appendChild(tr);
})();