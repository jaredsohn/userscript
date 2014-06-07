// ==UserScript==
// @name           Moviefone + GCal or YCal
// @namespace      http://axisofevil.net/~xtina/
// @description    Adds a link to add future movies to GCal or YCal.
// @include        http://www.moviefone.com/movie/*/synopsis
// ==/UserScript==

// Set to true or false depending on which calendars you want.
var withGoogle = true;
var withYahoo = false;
// Don't touch anything else!

// Yahoo! icon.
var ySrc = "data:image/x-icon;base64,AAABAAEAEBACAAEAAQCwAAAAFgAAACgAAAAQAAAAIAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAD9AAAAAAAAAAAAAAAAAAAAAAAAAAAAD9gAAAMAAAADDAAAB44AAA7GAAAcZwAAOP8AAP4AAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD//wAA//8AAPAnAAD8/wAA/PMAAPhxAADxOQAA45gAAMcAAAAB/wAA//8AAP//AAD//wAA+P3/AP/8/wD9/P8A+vz/AP/7/wD/+v8A/vr/APz6/wD4+v8A+/n/APP5/wD/+P8A+vj/AO/4/wDm+P8A2fj/AP/3/wD/9v8A9vb/AP/1/wD69f8A9PT/AO30/wD/8/8A//L/APnx/wD28P8A///+APj//gD2//4A9P/+AOP//gD//f4A6f/9AP///AD2//wA8//8APf9/AD///sA/v/7AOD/+wD/+vsA9/X7APr/+gDv/voA///5AP/9+QD/+/kA+e35AP//+ADm//gA4f/4AP/9+AD0+/gA///3APv/9wDz//cA8f/3AO3/9wD/8fcA//32AP369gDr+vYA8f/1AOv/9QD/+/UA///0APP/9ADq//QA///zAP/18wD///IA/fzyAP//8QD///AA9//wAPjw8AD//+8A8//vAP//7gD9/+4A9v/uAP/u7gD//+0A9v/tAP7/6wD/+eoA///pAP//6AD2/+gA//nnAP/45wD38eYA/fblAP/25AD29uQA7N/hAPzm4AD/690AEhjdAAAa3AAaJdsA//LXAC8g1gANH9YA+dnTAP/n0gDh5dIADyjSABkk0gAdH9EABxDRAP/l0AAAJs4AGRTOAPPczQAAKs0AIi7MAA4UywD56soA8tPKANTSygD/18kA6NLHAAAjxwDj28QA/s7CAP/1wQDw3r8A/9e8APrSrwDCtqoAzamjANmPiQDQj4YA35mBAOmefgDHj3wA1qR6AO+sbwDpmm8A2IVlAKmEYgCvaFoAvHNXAEq2VgA5s1UAPbhQAFWtTwBStU0ARbNNAEGxTQA7tEwAObZIAEq5RwDKdEYAULhDANtuQgBEtTwA1ls3ALhgMQCxNzEA2FsvAEC3LQB0MCkAiyYoANZTJwDLWyYAtjMlALE6JACZNSMAuW4iANlgIgDoWCEAylwgAMUuIAD3Vh8A52gdALRCHQCxWhwAsEkcALU4HACMOBwA0V4bAMYyGgCPJRoA218ZAJM7FwC/PxYA0msVAM9jFQD2XBUAqioVAIAfFQDhYRQAujMTAMUxEwCgLBMAnxIPAMsqDgCkFgsA6GMHALE2BAC9JQAAliIAAFYTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AsbGxsbGxsbGxsbGxsbGxd7IrMg8PDw8PDw8PUBQeJXjQYE9PcKPM2NfP2sWhcg+BzTE7dLjbmG03YWaV4JYye8MPbsLZlEouKRRCg9SXMoW/U53enGRAFzCRtNO7mTiAyliw30gRTg9VbJCKfYs0j9VmuscfLTFbIy8SOhA0Inq5Y77GNBMYIxQUJzM2Vxx2wEmfyCYWMRldXCg5MU0aicRUms58SUVeRkwjPBRSNIfBMkSgvWkyPxVHFIaMSx1/0S9nkq7WdWo1a43Jt2UqgtJERGJ5m6K8y92znpNWIYS1UQ89Mmg5cXNaX0EkGyyI3KSsp6mvpaqosaatq7axsQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

// Google icon.
var gSrc = "data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAwMDAAICAgAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8A//3/AP39/wD6/f8A+P3/AP/8/wD9/P8A+vz/AP/7/wD/+v8A/vr/APz6/wD4+v8A+/n/APP5/wD/+P8A+vj/AO/4/wDm+P8A2fj/AP/3/wD/9v8A9vb/AP/1/wD69f8A9PT/AO30/wD/8/8A//L/APnx/wD28P8A///+APj//gD2//4A9P/+AOP//gD//f4A6f/9AP///AD2//wA8//8APf9/AD///sA/v/7AOD/+wD/+vsA9/X7APr/+gDv/voA///5AP/9+QD/+/kA+e35AP//+ADm//gA4f/4AP/9+AD0+/gA///3APv/9wDz//cA8f/3AO3/9wD/8fcA//32AP369gDr+vYA8f/1AOv/9QD/+/UA///0APP/9ADq//QA///zAP/18wD///IA/fzyAP//8QD///AA9//wAPjw8AD//+8A8//vAP//7gD9/+4A9v/uAP/u7gD//+0A9v/tAP7/6wD/+eoA///pAP//6AD2/+gA//nnAP/45wD38eYA/fblAP/25AD29uQA7N/hAPzm4AD/690AEhjdAAAa3AAaJdsA//LXAC8g1gANH9YA+dnTAP/n0gDh5dIADyjSABkk0gAdH9EABxDRAP/l0AAAJs4AGRTOAPPczQAAKs0AIi7MAA4UywD56soA8tPKANTSygD/18kA6NLHAAAjxwDj28QA/s7CAP/1wQDw3r8A/9e8APrSrwDCtqoAzamjANmPiQDQj4YA35mBAOmefgDHj3wA1qR6AO+sbwDpmm8A2IVlAKmEYgCvaFoAvHNXAEq2VgA5s1UAPbhQAFWtTwBStU0ARbNNAEGxTQA7tEwAObZIAEq5RwDKdEYAULhDANtuQgBEtTwA1ls3ALhgMQCxNzEA2FsvAEC3LQB0MCkAiyYoANZTJwDLWyYAtjMlALE6JACZNSMAuW4iANlgIgDoWCEAylwgAMUuIAD3Vh8A52gdALRCHQCxWhwAsEkcALU4HACMOBwA0V4bAMYyGgCPJRoA218ZAJM7FwC/PxYA0msVAM9jFQD2XBUAqioVAIAfFQDhYRQAujMTAMUxEwCgLBMAnxIPAMsqDgCkFgsA6GMHALE2BAC9JQAAliIAAFYTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AsbGxsbGxsbGxsbGxsbGxd7IrMg8PDw8PDw8PUBQeJXjQYE9PcKPM2NfP2sWhcg+BzTE7dLjbmG03YWaV4JYye8MPbsLZlEouKRRCg9SXMoW/U53enGRAFzCRtNO7mTiAyliw30gRTg9VbJCKfYs0j9VmuscfLTFbIy8SOhA0Inq5Y77GNBMYIxQUJzM2Vxx2wEmfyCYWMRldXCg5MU0aicRUms58SUVeRkwjPBRSNIfBMkSgvWkyPxVHFIaMSx1/0S9nkq7WdWo1a43Jt2UqgtJERGJ5m6K8y92znpNWIYS1UQ89Mmg5cXNaX0EkGyyI3KSsp6mvpaqosaatq7axsQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

// Get the release date.
var movieDate = getElementsByClassName(document, "div", "label");
for (var x = 0; x < movieDate.length; x++) {
	if (movieDate[x].innerHTML == "Theatrical Release Date:") {
		var dateBit = movieDate[x].nextSibling.nextSibling;
		var tmp = dateBit.innerHTML;
		break;
	}
}
movieDate = new Date();
movieDate.setFullYear(tmp.split("/")[2], tmp.split("/")[0], tmp.split("/")[1]);
var todaysDate = new Date();

// Only if it's tomorrow.
if (movieDate > todaysDate) {
// Get the title.
	var movieTitle = getElementsByClassName(document, "div", "productheader")[0].childNodes[1].childNodes[0].nodeValue;

// Get synopsis and lose the HTMLing.
	var movieOpsis = getElementsByClassName(document, "div", "synopsis")[0].childNodes[3].childNodes[1].innerHTML;
	movieOpsis = movieOpsis.replace(/<\/a>/gi, "");
	movieOpsis = movieOpsis.replace(/<strong>/gi, "");
	movieOpsis = movieOpsis.replace(/<\/strong>/gi, "");
	movieOpsis = movieOpsis.replace(/<a href=\"[-0-9a-z\/]*\">/gi, "");

// Get the URL.
	var movieURL = window.location.href;

// Calendarise - Yahoo.
	if (withYahoo) {
		var ycalThis = "http://calendar.yahoo.com/?v=60&TYPE=23&TITLE=";

// Add the title bit.
		ycalThis += escape(trim(movieTitle)) + "&ST=";

// Add the dates.
		ycalThis += movieDate.getFullYear() + '' + Right('0' + movieDate.getMonth(), 2) + '' + Right('0' + movieDate.getDate(), 2) + '&DESC=';

// Add the description as a whole.
		ycalThis += escape(movieURL + "\n\n" + movieOpsis) + "&URL=" + movieURL;

// And finally, put this as a link, next to the date.
		var ycalBit = document.createElement("a");
		ycalBit.setAttribute("href", ycalThis);
		ycalBit.setAttribute("target", "_blank");

		var tmp = document.createElement("img");
		tmp.setAttribute("src", ySrc);
		tmp.setAttribute("style", "vertical-align: middle;");
		ycalBit.appendChild(tmp);

		dateBit.innerHTML += " ";
		dateBit.appendChild(ycalBit);
	}

// Calendarise - Google.
	if (withGoogle) {
		var gcalThis = "http://www.google.com/calendar/event?action=TEMPLATE&text=Movie%3A%20";

// Add the title bit.
		gcalThis += escape(trim(movieTitle)) + "&dates=";

// Add the dates.
		gcalThis += movieDate.getFullYear() + '' + Right('0' + movieDate.getMonth(), 2) + '' + Right('0' + movieDate.getDate(), 2) + '/';
		gcalThis += movieDate.getFullYear() + '' + Right('0' + movieDate.getMonth(), 2) + '' + Right('0' + (movieDate.getDate() + 1), 2) + '&details=';

// Add the description as a whole.
		gcalThis += escape(movieURL + "\n\n" + movieOpsis);

// And finally, put this as a link, next to the date.
		var gcalBit = document.createElement("a");
		gcalBit.setAttribute("href", gcalThis);
		gcalBit.setAttribute("target", "_blank");

		var tmp = document.createElement("img");
		tmp.setAttribute("src", gSrc);
		tmp.setAttribute("style", "vertical-align: middle;");
		gcalBit.appendChild(tmp);

		dateBit.innerHTML += " ";
		dateBit.appendChild(gcalBit);
	}
}


/* *** Useful Functions *** */


// Code from: http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all :
        oElm.getElementsByTagName(strTagName);

    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];     
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

// Code from: http://snipplr.com/view.php?codeview&id=8329
function trim(str) {
    while('' + str.charAt(0) == ' ') {
        str = str.substring(1, str.length);
    }
    while('' + str.charAt(str.length-1)==' ') {
        str = str.substring(0, str.length-1);
    }
    return str;
}

// Code from: http://www.expertsforge.com/Web-Development/Tutorial-218.asp
function Right(str, n) {
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}
