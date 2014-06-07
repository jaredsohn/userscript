// ==UserScript==
// @name          Google Calendar Textwrap Events
// @description   Fix Google Calendar so that long event names will text wrap on the calendar.
// @include       http*://www.google.com/calendar/render*
// ==/UserScript==

//////////////////////////////////////////////////////////////////////////////
// Version 1.2     
// -Enhanced funtionality between all day events and specific time events
//  to keep them from overlapping each other.
//
// Version 1.1
// -Enabled all day events to wrap text the same as specific time events.
//
// Version 1.0
// -Initial version - Allow specific time events to wrap if they are too long.
//////////////////////////////////////////////////////////////////////////////

function buildStyle()
{
	var st = "span, nobr { white-space: normal; }";
	var dochead = document.getElementsByTagName("head")[0];
	var stEl = document.createElement("style");
	stEl.setAttribute("type", "text/css");
	stEl.innerHTML = st;
	dochead.appendChild(stEl);
}

window.loopThroughDivs1 = function() {
	var isLongNobr = false;
	var isLongerNobr = false;
	var countme = 0;
	var nobrleft = 0;

	var allDivs = document.getElementsByTagName("div");

	for (var n = 0; n < allDivs.length; n++){
		if (allDivs[n].getAttribute("id")){
			if (allDivs[n].getAttribute("id").indexOf("reldiv") == 0){
				if (allDivs[n].style.height == "17px"){
					if (allDivs[n].childNodes){
						var txtLn = allDivs[n].getElementsByTagName("span")[1].innerHTML.length;
						if (txtLn > 16 && txtLn < 30){
							allDivs[n].style.height = "28px";
						}
						else if (txtLn >= 30){ allDivs[n].style.height = "42px"; }
					}
					
					if (allDivs[n-1].style.left == allDivs[n].style.left && ((parseInt(allDivs[n].style.top) == (parseInt(allDivs[n-1].style.top) + 17) || parseInt(allDivs[n].style.top) == (parseInt(allDivs[n-1].style.top) + 28) || parseInt(allDivs[n].style.top) == (parseInt(allDivs[n-1].style.top) + 42)) || (parseInt(allDivs[n].style.top) - parseInt(allDivs[n-1].style.top)) < 17)){
						allDivs[n].style.top = (parseInt(allDivs[n-1].style.top) + parseInt(allDivs[n-1].style.height)) + "px";
					}

					var temp = parseInt(allDivs[n].style.left);
					if (isLongNobr && (nobrleft == temp || (nobrleft-1) == temp || (nobrleft+1) == temp)){
						allDivs[n].style.top = (parseInt(allDivs[n].style.top) + 11) + "px";
					}
					else if (isLongerNobr && (nobrleft == temp || (nobrleft-1) == temp || (nobrleft+1) == temp)){
						allDivs[n].style.top = (parseInt(allDivs[n].style.top) + 25) + "px";
					}

					isLongNobr = false;
					isLongerNobr = false;
				}
			}
		}
		else if (allDivs[n].className == "noleft"){
			if (!allDivs[n].id){
				allDivs[n].id = "test" + countme;
				countme++;
			if (allDivs[n].innerHTML.indexOf("moreright") < 0){
				var inobr = allDivs[n].innerHTML.indexOf("nobr");
				if (inobr >= 0){
					var inobrInner = allDivs[n].innerHTML.substring(inobr, (allDivs[n].innerHTML.length-1));
					var inobrInner2 = inobrInner.substring((inobrInner.indexOf(">")+1), inobrInner.indexOf("</nobr>"));
					if (inobrInner2.length > 16 && inobrInner2.length < 25){
						isLongNobr = true;
						nobrleft = parseInt(allDivs[n].parentNode.style.left);
					}
					else if (inobrInner2.length >= 25){
						isLongerNobr = true;
						nobrleft = parseInt(allDivs[n].parentNode.style.left);
					}
				}
			}
			else if (isLongNobr || isLongerNobr){
				var temp1 = parseInt(allDivs[n].parentNode.style.left);
				if (isLongNobr && (nobrleft == temp1 || (nobrleft-1) == temp1 || (nobrleft+1) == temp1)){
					allDivs[n].parentNode.style.top = (parseInt(allDivs[n].parentNode.style.top) + 11) + "px";
				}
				else if (isLongerNobr && (nobrleft == temp1 || (nobrleft-1) == temp1 || (nobrleft+1) == temp1)){
					allDivs[n].parentNode.style.top = (parseInt(allDivs[n].parentNode.style.top) + 25) + "px";
				}
			}
			}
		}
	}
	isLongNobr = false;
	isLongerNobr = false;
	window.setTimeout(loopThroughDivs1, 500);
}

window.addEventListener("load", function(e) {
	buildStyle();
}, false);

window.addEventListener("load", loopThroughDivs1, false);