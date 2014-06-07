// ==UserScript==
// @name        Kwiatek: srednia ocen
// @namespace   http://kamilb.info
// @description Oblicza srednia ocen w dzienniku internetowym Kwiatka.
// @author      Kamil Burek (Mestiso)
// @version     1.1
// @include     http://kwiatek.edu.pl/dziennik/index.php?action=show&item=grades
// ==/UserScript==

// 2012-02-08 12:30 1.1 kosmetyka
// 2012-01-09 00:40 1.0 pierwszy build

var debug      = false,                                        // nah nah
    tab        = document.getElementsByClassName('grades')[1], // table
    rowsLength = tab.rows.length-1,                            // number of rows
    // cellLength = tab.rows[5].cells.length-1,                // number of cells = 27
    i, cellValue, amount, sum, average;

// cross browser events support
function addEvent(obj, type, fn) {
	if (obj.attachEvent ) {
		obj['e'+type+fn] = fn;
		obj[type+fn] = function(){obj['e'+type+fn](window.event);};
		obj.attachEvent('on'+type, obj[type+fn] );
	}
	else
		obj.addEventListener(type, fn, false);
}
function removeEvent(obj, type, fn) {
	if (obj.detachEvent) {
		obj.detachEvent('on'+type, obj[type+fn]);
		obj[type+fn] = null;
	}
	else
		obj.removeEventListener(type, fn, false);
}

// content editable
function editable(val) { // true or false
	tab.contentEditable = val ? 'true' : 'false';
	if(val) addEvent(tab, 'blur', function(){ magic(); });
	else removeEvent(tab, 'blur', function(){ magic(); });
}

// create new element
function makeDiv() {
	var div = document.createElement('div');
	div.id = "content-mini"; // edk, co to ma byc?
	div.title = "Uzupe\u0142niaj oceny ko\u0144cowe (w czerwonych polach). Wynik od\u015Bwie\u017Cy si\u0119 automatycznie po klikni\u0119ciu poza tabel\u0105.";
	div.style.cssText = "padding: 0; position: relative; top: 7px; left: 38px; width: 151px";
	div.innerHTML =
		'<div id="content-mini-top" style="padding: 7px 0 0 20px; width: 131px">' +
			'<img src="layout/blue/lettersa/s.png">' +
			'<img src="layout/blue/lettersa/r.png">' +
			'<img src="layout/blue/lettersa/e.png">' +
			'<img src="layout/blue/lettersa/d.png">' +
			'<img src="layout/blue/lettersa/n.png">' +
			'<img src="layout/blue/lettersa/i.png">' +
			'<img src="layout/blue/lettersa/a.png">' +
			'&nbsp;' +
			'<img src="layout/blue/lettersa/o.png">' +
			'<img src="layout/blue/lettersa/c.png">' +
			'<img src="layout/blue/lettersa/e.png">' +
		'<img src="layout/blue/lettersa/n.png">' +
		'</div>' +
		'<div id="content-mini-mid" style="padding: 10px; width: 131px">' +
			'<span>' +
				'&#346;rednia: <b id="average"></b>' +
			'</span>' +
			'<span style="float: right">edycja ' +
			'	<input type="checkbox" id="edit" style="margin: 0; position: relative; top: 1px" />' +
			'</span>' +
		'</div>';
	document.getElementsByClassName('grades-all')[0].appendChild(div);

	var edit = document.getElementById('edit');
	if(debug) edit.checked = 'true';
	addEvent(edit, 'click', function(){ editable(edit.checked); });
}

// count grades
function magic() {
	amount = sum = average = i = 0;
	if(debug) console.log('---');
	for (i = 1; i <= rowsLength; i++) {
		cellValue = tab.rows[i].cells[27].innerText.replace(/\D/g,''); // cellLength
		if (cellValue !== '' && cellValue <= 6) {
			amount++;
			sum += parseInt(cellValue,10);
		}
		if(debug) console.log(
			'Ilosc: ' + amount +
			'. Ocena: ' + parseInt(cellValue,10) +
			'. Suma: ' + sum +
			'. Przedmiot: ' + document.getElementsByClassName('grades')[0].rows[i].cells[0].innerText.replace(/\s+$/g, '')
		);
	}
	average = sum/amount;
	average = Math.round(average*100)/100; // rounding to two decimals
	if(debug) alert('Srednia: ' + average);
	if (average >= 4.75) { // strap
		average += ' <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAIAAADQ/GvKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDRCNTYwREMzMjYzMTFFMUI0NUNGM0EwM0NENTc3REQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDRCNTYwREQzMjYzMTFFMUI0NUNGM0EwM0NENTc3REQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMzI3RDc1NTMyNDIxMUUxQjQ1Q0YzQTAzQ0Q1NzdERCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMzI3RDc1NjMyNDIxMUUxQjQ1Q0YzQTAzQ0Q1NzdERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnOAR2gAAADHSURBVHjaPE85DsIwEJz1jeloER/IC/MqurwkL0CiipR0Lrh2GQeJkYvVzrEe2W43E9FS7HrVcXyrmtmrtRByTqeTxmjDYOczWkOt2/3uvHMwA/F42LrqslhrjhA+ApAQ5HiUWqUUBwTv6eEA8x45W85Iidqw67sD3gu3pZCmNjAJf4Lb55Ncd0A898wyBv6icmY4CfwgdKSEThQq97vYWY4xSoxIUVyP6gdYhB91lwtLyKH24/h82JYNdJ4xTaaqFC3LV4ABAMjRQN4kqFZPAAAAAElFTkSuQmCC" alt="&#347;wiadectwo z paskiem" style="position: relative; top: 2px" />';
		if(debug) alert('z paskiem');
	}
	document.getElementById('average').innerHTML = average;
}

// init this little baby!
// editable(true);
makeDiv();
magic();
