// ==UserScript==
// @name          SeatLocator
// @namespace     fiveofoh
// @description   Finds where your seat is on TicketMaster
// @include       http://www.ticketmaster.com/seatingchart/*
// ==/UserScript==

// Original script by: Joel Bradshaw

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

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function logbase(a, b) {
	return Math.log(a)/Math.log(b);
}

var secnum = gup('secnum');
var rownum = gup('rownum');
var seatnum = gup('seatnum');

if(secnum && rownum && seatnum) {
	var divlist = getElementsByClassName('container-empty');
	var imgdiv = divlist[0];
	//alert(imgdiv.innerHTML);
	imglist = imgdiv.getElementsByTagName('img');
	seatmap = imglist[0];

	var centery = -13;
	var centerx = 201;
	var startrad = 90;
	var numseats = 14;
	var pxperseat = 5.5;

	var row = parseInt(rownum);
	var sec = parseInt(secnum);
	var seat = parseInt(seatnum);
	if(sec == 1 || sec == 4) {
		//adjust for aisles
		seat += 18;
	}

	var lefttheta = (3.61 * Math.pow(0.97,row))*Math.PI/180;
	var righttheta = (-.0005312398*row*row*row + .0446754619*row*row - 1.507 * row + 31)*Math.PI/180;
	var thetaperseat = (righttheta-lefttheta)/numseats;
	var theta = lefttheta + thetaperseat * seat;
	var flipper=1;
	if(sec > 2) { flipper = -1 }
	var radius = startrad+row*pxperseat;
	var offx = Math.abs(radius * Math.sin(theta));
	var offy = Math.abs(radius * Math.cos(theta));
	var boxx = centerx + flipper*offx;
	var boxy = centery + offy;

	var pointer = document.createElement('div');
	pointer.style.width = "5px";
	pointer.style.height = "5px";
	pointer.style.background="#0000FF";
	pointer.style.position="absolute";
	pointer.style.top = (seatmap.offsetTop + boxy - 2) + "px";
	pointer.style.left = (seatmap.offsetLeft + boxx - 2) + "px";

	imgdiv.appendChild(pointer);
}
