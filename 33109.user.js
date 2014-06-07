// ==UserScript==
// @name          SeatLocator Link
// @namespace     fiveofoh
// @description   Finds where your seat is on TicketMaster
// @include       https://www.ticketmaster.com/checkout/order*
// ==/UserScript==

/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/	
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};

var boxlist = getElementsByClassName('container-neutralZone');
var seatbox = boxlist[0];
var innerdivs = getElementsByClassName('floatRight','div',seatbox);
var databox = innerdivs[0];
var dataz = databox.innerHTML.split('<br>');

rowregex = /\>(\d+)/;
var sec = parseInt(dataz[0].substr(3));

var rowstr = dataz[1].replace(/^\s+|\s+$/g,"");
var row = 26*(rowstr.length - 1) + rowstr.charCodeAt(0) - 64;

var seatstr = rowregex.exec(dataz[2]);
var seat = parseInt(seatstr[1]);

var centerdiv = document.createElement('div');
centerdiv.style.textAlign = 'center';
centerdiv.style.margin = '5px 0px';
var linkety = document.createElement('a');
var href = 'http://www.ticketmaster.com/seatingchart/122980/4078/?seatnum=' + seat + '&secnum=' + sec + '&rownum=' + row;
if( linkety.attachEvent ){
   linkety.attachEvent('onclick', 'window.open(\'' + href + '\',\'Seat Location\',\'width=800,height=600,toolbar=0,location=0,directories=0,status=0,scrollbars=1,menubar=0,resizable=1\');return false;');
} else {
   linkety.setAttribute('onclick', 'window.open(\'http://www.ticketmaster.com/seatingchart/122980/4078/?seatnum=' + seat + '&secnum=' + sec + '&rownum=' + row + '\',\'Seat Location\',\'width=800,height=600,toolbar=0,location=0,directories=0,status=0,scrollbars=1,menubar=0,resizable=1\');return false;'); 
}
linkety.innerHTML = 'View Seat Location';
linkety.href = 'javascript:void(0);';
centerdiv.appendChild(linkety);
seatbox.appendChild(centerdiv);



