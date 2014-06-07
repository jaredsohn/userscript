// ==UserScript==
// @name           TV Guide Scrolling Timebar
// @namespace      http://pseudochron.com
// @description    Adds a timebar that scrolls along the TV listings
// @include        http://www.tvguide.com/Listings/*
// ==/UserScript==

GM_addStyle("* { -moz-user-select: text ! important; }");


document.addEventListener("DOMNodeInserted", documentChanged, false);
window.setInterval ( goToNow, 1000 * 60 * 60 ); // 60 minutes
window.addEventListener("resize", updateTimebar, false);

document.getElementById("timeSelect").value=-1;

function documentChanged(event) {
	var grid;
	if ( (grid = document.getElementById("gridTable")) && !(document.getElementById("timebar")) ) {
		document.removeEventListener("DOMNodeInserted", documentChanged, false);
		var timebar = grid.insertBefore(document.createElement('div'),grid.firstChild);
		timebar.setAttribute('style', 'position: absolute; z-index: 100; width: 0px; height: ' + grid.offsetHeight + 'px; opacity: 0.2; -moz-box-shadow: 0px 0px 0px 1px black; -webkit-box-shadow: 0px 0px 0px 1px black; box-shadow: 0px 0px 0px 1px black;');
		timebar.id = "timebar";
				
		updateTimebar();
		window.setInterval ( updateTimebar, 1000 * 15 ); // 15 seconds
		
		document.addEventListener("DOMNodeInserted", documentChanged, false);
	}
	
}


function updateTimebar() {
	var timebar = document.getElementById("timebar");
	var grid = document.getElementById("gridTable");
	timebar.style.height = grid.offsetHeight + 'px';
	
	var d = new Date();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var seconds = d.getSeconds();
		
	var ap = "am";
	if (hour   > 11) { ap = "pm";        }
	if (hour   > 12) { hour = hour - 12; }
	if (hour   == 0) { hour = 12;        }
	
	var thirty;
	if ( thirty = (minute > 30) ) {
		minute -= 30;
	}
	minute += (seconds/60);
		
	snapResults = document.evaluate("//tr[@class='timebarRow']/td[@class='timebarCell']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
		var cell = snapResults.snapshotItem(i);
		if ( (!thirty && cell.textContent == hour + ":00" + ap) || (thirty && cell.textContent == hour + ":30" + ap) ) {	
				
			var x = cell.offsetParent.offsetLeft + cell.offsetLeft;
			
			x += parseInt( (minute/30) * cell.offsetWidth );
							
			timebar.style.left = x + 'px';

// 			GM_log(x);
// 			GM_log(minute);
			break;
		} else {
			timebar.style.left = "-1000px";
		}
	}

}

function goToNow() {
	var loc = 'javascript:void( document.getElementById("timeSelect").value=-1 ); doTimeSelectChange(document.getElementById("timeSelect"));  doGoClick();';
	location.href = loc;
}

