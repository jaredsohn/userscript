// ==UserScript==
// @name        gplus-morecol.js
// @namespace   NoNameSpace
// @include     https://plus.google.com/*
// @require     http://code.jquery.com/jquery-1.11.0.min.js
// @grant       none
// ==/UserScript==

/*
* Author: tengattack
* License: GPLv3
* Depend: jquery
*/

var SET_COL_COUNT = 4;
var ROW_HTML = '<div class="Ypa jw Yc am"></div>';

var origCol = 0;
var newWidth = 0;

function quickSortById(arr) {
	if (arr.length <= 1) { return arr; }
	var pivotIndex = Math.floor(arr.length / 2);
	var pivot = arr.splice(pivotIndex, 1)[0];
	var left = [];
	var right = [];
	for (var i = 0; i < arr.length; i++){
		if (arr[i].id < pivot.id) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return quickSortById(left).concat([pivot], quickSortById(right));
};

function insertRows(lastRow) {
	$(lastRow).after(ROW_HTML);
}

function initVar(container) {
	var layout = $(container).find('.ona');
	var width = layout.width();
	//get current rows
	var divs = layout.children("div");
	var currentRows = 0;
	for (var i = 0; i < divs.length; i++) {
		if ($(divs[i]).hasClass("Ypa")) {
			currentRows++;
		} else {
			break;
		}
	}
	
	origCol = currentRows;
	newWidth = (width - (origCol - 1) * 20) / origCol * SET_COL_COUNT
				+ (SET_COL_COUNT - 1) * 20;
}

function rearrangeLayout(layout) {
	layout = $(layout);
	var divs = layout.children("div");
	var posts = [];
	var coldivrange = [];
	var needrabefore = false;
	var colStart = -1;
	var row = 0;
	var i, j, k;
	for (i = 0; i <= divs.length; i++) {
		if (i < divs.length && $(divs[i]).hasClass("Ypa")) {
			if (!needrabefore) {
				colStart = i;
				posts.push([]);
			}
			var po = $(divs[i]).children(".Yp");
			for (j = 0; j < po.length; j++) {
				posts[row].push(po[j]);
			}
			needrabefore = true;
		} else if (needrabefore) {
			coldivrange.push([colStart, i]);
			needrabefore = false;
			rowsStart = -1;
			row++;
		}
	}
	
	//sort
	for (i = 0; i < posts.length; i++) {
		posts[i] = quickSortById(posts[i]);
	}
	
	divs.find(".Ypa .Yp").remove();
	
	for (i = 0; i < coldivrange.length; i++) {
		for (j = 0; j < posts[i].length; j++) {
			var height = 0;
			var addRowIndex = 0;
			//get the minium height
			for (k = coldivrange[i][0]; k < coldivrange[i][1]; k++) {
				var theight = $(divs[k]).height();
				if (k == coldivrange[i][0] || height > theight) {
					height = theight;
					addRowIndex = k;
				}
			}
			$(divs[addRowIndex]).append(posts[i][j]);
		}
	}
}

function resetLayout(layout) {
	if (resetting) {
		return;
	}
	resetting = true;
	layout = $(layout);
	layout.css("width", newWidth + "px");
	
	var divs = layout.children("div");

	var addRows = [];
	var rowCount = 0;
	var i = 0;
	for (i = 0; i <= divs.length; i++) {
		if (i < divs.length && $(divs[i]).hasClass("Ypa")) {
			rowCount++;
		} else {
			while (rowCount < SET_COL_COUNT) {
				addRows.push(i - 1);
				rowCount++;
			}
			rowCount = 0;
		}
	}
	for (i = 0; i < addRows.length; i++) {
		insertRows(divs[addRows[i]]);
	}
	//re arrange
	rearrangeLayout(layout);
	resetting = false;
}

function resetContainer(container) {
	console.log('resetContainer');
	var sidebar = $(container).find('.tna');
	var layout = $(container).find('.ona');
	sidebar.css("width", (newWidth + 134) + "px");
	resetLayout(layout);
}

function insertPostFinish() {
	console.log("insertPostFinish");
	resetContainer(container);
}

function resetInsertPostTimeout() {
	if (insTimeID) {
		clearTimeout(insTimeID);
	}
	insTimeID = setTimeout(insertPostFinish, 500);
}

var insTimeID = 0;
var resetting = false;
//.tna.UMa set width
var container = $(".Dh");
var containerel = container.get(0);

initVar(container);
resetContainer(container);

containerel.addEventListener("DOMNodeInserted", function(e) {
	// Notify of change!
	if (e.relatedNode) {
		var node = $(e.relatedNode);
		//node.hasClass("VW") || node.hasClass("CF") || node.hasClass("pga")
		if (node.hasClass("Dh")) {
			console.warn("layout Inserted!", e);
			resetContainer(e.target);
			//resetInsertPostTimeout();
		} else if (node.hasClass("ona")) {
			//need check before el class
			//var el = $(e.target).prev();
			//if (el.hasClass("Ypa"))
			resetInsertPostTimeout();
		} else if (node.hasClass("Ypa")) {
			if (resetting) return;
			resetInsertPostTimeout();
		}
		//rows.preend(e.target);
	}
}, false);

