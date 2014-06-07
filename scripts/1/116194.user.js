// ==UserScript==
// @name           NU TV Gids Fixer
// @namespace      NU TV Gids Fixer
// @description    NU TV Gids Fixer
// @version        1.6
// @include        http://www.nu.nl/tvgids/
// ==/UserScript==

(function(win, Uwin){

	var _slice = Array.prototype.slice;

	/* Fix channels */
	// Fixed by NU.nl --> document.getElementById("chan_veronicajetix").name = "veronicadisney-xd";
	// Fixed by NU.nl --> document.getElementById("chan_een").name = "en";
	
	document.getElementById("chan_comedy-central").name = "comedy-ceentral";
	document.getElementsByClassName("comedy-ceentral")[0].classList.add("comedy-central");
	document.getElementsByClassName("comedy-central")[0].classList.remove("comedy-ceentral");
	
	document.getElementById("chan_wdr-fernsehen").name = "wdr-fernseheen";
	document.getElementsByClassName("wdr-fernseheen")[0].classList.add("wdr-fernsehen");
	document.getElementsByClassName("wdr-fernsehen")[0].classList.remove("wdr-fernseheen");

	document.getElementById("chan_13th-street").name = "thirteeenthstreet";
	document.getElementsByClassName("thirteeenthstreet")[0].classList.add("thirteenthstreet");
	document.getElementsByClassName("thirteenthstreet")[0].classList.remove("thirteeenthstreet");



	/* Add Select all/none canals */
	var selectAll = document.createElement("li");
	selectAll.className = "all";

	var selectAllA = document.createElement("a");
	selectAllA.innerHTML = "Selecteer alles";
	selectAllA.style.paddingRight = "10px";
	selectAllA.addEventListener("click", function(){ changeInputs(true); });
	selectAll.appendChild(selectAllA);

	var selectAllB = document.createElement("a");
	selectAllB.innerHTML = "Selecteer niets";
	selectAllB.style.paddingRight = "10px";
	selectAllB.addEventListener("click", function(){ changeInputs(false); });
	selectAll.appendChild(selectAllB);

	document.getElementById("chan_all").parentNode.parentNode.insertBefore(selectAll, document.getElementById("chan_all").parentNode.nextSibling);

	function changeInputs(checked){
		// http://www.nu.nl/tvgids/static/javascripts/application.js Line 766
		Uwin.$('#prog_selection').find('ul:last').find(':checkbox').not(':last').attr('checked', checked);
		Uwin.parseChannelSelection();
	}


	/* Remove empty whitespace at top */
	var pageheader = document.getElementById("pageheader");
	pageheader.parentNode.removeChild(pageheader);


	/* Remove timebars */
	function removeTimebars(){
		win.setTimeout(function(){
			_slice.call(document.getElementsByClassName("timeline"), 1).forEach(function(item){
				item.parentNode.removeChild(item);
			});
		}, 14);
	}
	
	removeTimebars();
	
	// Also after changing canals;
	_slice.call(document.getElementsByTagName("input"), 0).forEach(function(item){
		item.addEventListener("click", function(){ removeTimebars(); });
	});
	
	
	/* Add Channel Numbers */
	var channels = [
		["veronicadisney-xd", 8],
		["net-5", 9],
		["rtl-8", 10],
		["een", 21],
		["ketnet-canvas", 22],
		["discovery-channel", 61],
		["animal-planet", 71],
		["tlc", 71],
		["national-geographic", 81],
		["comedy-central", 185],
		["mtv", 211]
	];
		
	win.setTimeout(function(){
		_slice.call(channels, 0).forEach(function(item){
			var elm = document.getElementsByClassName(item[0])[0];
			if(elm){
				var div = document.createElement("div");
				div.style.width = "25px";
				div.style.backgroundColor = "#FFFFFF";
				div.style.border = "1px solid #B7C9E5";
				div.style.height = "100%";
				div.style.left = "-38px";
				div.style.position = "absolute";
				div.style.top = "-1px";
				div.style.width = "36px";
				var div2 = document.createElement("div");
				div2.appendChild(document.createTextNode(item[1]));
				div2.style.backgroundColor = "#FF9900";
				div2.style.margin = "2px 3px";
				div2.style.height = "26px";
				div2.style.padding = "2px 5px";
				div.appendChild(div2);
				elm.insertBefore(div, elm.firstChild.nextSibling);
			}
		});
	}, 14);


	/* Scroll to interesting part */
	function findPos(obj) {
		var pos = { x: 0, y: 0 };
		if (obj.offsetParent) {
			do {
				pos.x += obj.offsetLeft;
				pos.y += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return pos;
	}
	
	win.setTimeout(function(){
		win.scrollTo(0, findPos(document.getElementById('listing')).y + 15);
	}, 14);
	
	
	/* Reload page every 55 minutes */
	win.setTimeout(function(){
		win.location.reload();
	}, 55 * 60 * 1000);

})(window, unsafeWindow || window);



//*** STATISTICS ***//
// Chars (exclude spaces): 3.927
// Chars (include spaces): 4.402
// Chars (Chinese): 0
// Words: 348
// Lines: 150