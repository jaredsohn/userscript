// ==UserScript==
// @name           Aspect ratio calculator
// @namespace      g
// @description    Calculates aspect ratios. Helps finding a fitting wallpaper.
// @include        *wall*
// @include        *anime*
// @include        *picture*
// @include        *img*
// @include        *oboi*
// ==/UserScript==

function isPositiveInteger(a) {
	try {
		if (a%1==0 && a >0) return true;
	} catch(e) {return false;}
	return false;
}

/**
	Implements Euclidean algorithm
	http://en.wikipedia.org/wiki/Euclidean_algorithm
*/
function euclidean(a, b) {
	if (!isPositiveInteger(a) || !isPositiveInteger(b)) {
		throw "arguments should be positive integers";
	}
	while (b>1) {
		if (a<b) {var temp=a; a=b; b=temp;}
		//a is greater at this point
		if (b <= 0) return a;
		a=a%b;
	}
	return 1;
}

/**
	Finds greatest common divisor for an array of numbers
*/
function gcDivisor(numbers) {
	var divisor=numbers[0];
	for (i in numbers) {
		if (i==0) continue;
		var newDivisor=euclidean(divisor, numbers[i]);
		divisor=newDivisor;
		if (divisor<=1) return 1;
	}
	return divisor;
}

function simplify(arrOfNom) {
	if (arrOfNom.length<2) return arrOfNom;
	var divisor=gcDivisor(arrOfNom);
        var m="("+arrOfNom+") = "+divisor;
	for (i in arrOfNom) {
		arrOfNom[i]=arrOfNom[i]/divisor;
	}	
	return arrOfNom;
}

var allElements = document.getElementsByTagName('*');
for (i in allElements) {
    var thisElement = allElements[i];
    for (var nodeIndex=0; nodeIndex<thisElement.childNodes.length; nodeIndex++) {
        var node=thisElement.childNodes[nodeIndex];
        if (node.nodeName=="#text") {
            var data=node.textContent;
            var re=/(\d{3,4})\s*[x×]\s*(\d{3,4})/i;
            var pos=0;
            var changed=false;
            while ( pos < data.length ) {
                var tail=data.substring(pos);
                var shiftInTail=tail.search(re);
                if (shiftInTail<0) break;
                pos+=shiftInTail;
                tail=tail.substring(shiftInTail);
                var matched=tail.match(re);
                var whole=matched[0];
                var width=parseInt(matched[1]);
                var height=parseInt(matched[2]);
                var simplified=simplify([width, height]);
                var ratio=whole+ " ("+simplified[0]+":"+simplified[1]+")";
                data=data.substring(0, pos)+ratio+tail.substring(whole.length);
                pos+=ratio.length;
                changed=true;
            }
            if (changed) {
                node.textContent=data;
            }
        }
    }
}

allElements = document.getElementsByTagName('IMG');
for (i in allElements) {
    var thisElement = allElements[i];
    var simplified=simplify([thisElement.width, thisElement.height]);
    thisElement.title+=" "+simplified[0]+":"+simplified[1];
}

