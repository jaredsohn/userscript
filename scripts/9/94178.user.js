// ==UserScript==
// @name           Yahoo TV Listings Scrolling Timebar
// @namespace      http://pseudochron.com
// @description    Adds a timebar that scrolls along the TV listings
// @include        http://tv.yahoo.com/listings*
// ==/UserScript==


var grid = document.getElementById("grid_page");

var snapResults = document.evaluate("//iframe", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
	var ad = snapResults.snapshotItem(i);
// 	GM_log (ad.id);	
	ad.parentNode.removeChild(ad);
}





var timebar = grid.insertBefore(document.createElement('div'),grid.firstChild);

timebar.setAttribute('style', 'position: absolute; z-index: 100; width: 0px; height: ' + grid.offsetHeight + 'px; opacity: 0.2; -moz-box-shadow: 0px 0px 0px 1px darkblue; -webkit-box-shadow: 0px 0px 0px 1px darkblue; box-shadow: 0px 0px 0px 1px darkblue;');
timebar.id = "timebar";

updateTimebar();
window.setInterval ( updateTimebar, 1000 * 15 ); // 15 seconds



function updateTimebar() {
	var timebar = document.getElementById("timebar");
	var grid = document.getElementById("grid_page");
	timebar.style.height = grid.offsetHeight + 'px';
	
	var d = new Date();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var seconds = d.getSeconds();
		
	var ap = "am";
	if (hour   > 11) { ap = "pm";        }
	if (hour   > 12) { hour = hour - 12; }
	if (hour   == 0) { hour = 12;        }
	
	if (hour < 10) { hour = " " + hour; }
	
	minute += (seconds/60);
		
	var snapResults = document.evaluate("//ul[@class='times']/li[@class='time']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
// 	GM_log(snapResults.snapshotLength);
	for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
		var cell = snapResults.snapshotItem(i);
// 		GM_log(cell.textContent);
		if ( cell.textContent == (hour + ":00" + ap) ) {	
				
			var x = cell.offsetParent.offsetLeft + cell.offsetLeft;
			
			x += parseInt( (minute/60) * cell.offsetWidth );
							
			timebar.style.left = x + 'px';

// 			GM_log(x);
// 			GM_log(minute);
			break;
		} else {
			timebar.style.left = "-1000px";
		}
	}

}
		