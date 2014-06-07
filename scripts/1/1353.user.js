// ==UserScript==
// @name        Netflix Randomize Queue
// @namespace   http://www.arantius.com/misc/greasemonkey/
// @description	Shuffle all the movies in your netflix queue into a random order.
// @include     http://www.netflix.com/Queue*
// @version     1.3
// ==/UserScript==

//
// Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
//
// If possible, please contact me regarding new features, bugfixes
// or changes that I could integrate into the existing code instead of
// creating a different script.  Thank you
//

//
// Version History
//
// 1.3 - March 15, 2008
//       Simplify, no delete-checkbox overloading.  Improve shuffle algorithm.
// 1.2 - Match Netflix's new visual style.
//
// 1.1 - When no movies are selected, user is presented with the option
//       to randomize them all.
//

(function(){
function $x(p, context) {
	if (!context) context=document;
	var arr=[];
	var xpr=document.evaluate(
		p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);
	for(i=0;item=xpr.snapshotItem(i);i++){ arr.push(item); }
	return arr;
}

function randomize(event) {
	var boxes=$x("//form[@name='MainQueueForm']//input[@class='o' and @value]");
	
	// Pick all the values out of the boxes.
	var values=[];
	for (var i=0, box=null; box=boxes[i]; i++) {
		values[values.length]=box.value;
	}

	console.log(boxes, values);

	// Fill the boxes with random values.
	for (var i=0, box=null; box=boxes[i]; i++) {
		var j=Math.floor(values.length*Math.random());
		boxes[i].value=values[j];
		values.splice(j, 1);
	}

	//submit form by "clicking" the right button
	updateButtons[0].click();
}

//find 'update' buttons and add 'randomize' buttons
var updateButtons=$x("//input[@type='submit' and starts-with(@name, 'update')]");
for (var i=0, el=null; el=updateButtons[i]; i++) {
	var row=el.parentNode.parentNode;
	var cell;

	//insert left edge
	cell=document.createElement('td');
	cell.className='cb_rt';
	row.insertBefore(cell, row.firstChild);

	//build button
	var b=document.createElement('input');
	b.type='button';
	b.className='bsub_primary';
	b.value='Randomize Your Queue';
	b.addEventListener('click', randomize, true);
	
	//insert button
	cell=document.createElement('td');
	cell.className='cb_m';
	cell.appendChild(b);
	row.insertBefore(cell, row.firstChild);

	//insert right edge
	cell=document.createElement('td');
	cell.className='cb_lf';
	row.insertBefore(cell, row.firstChild);
}

})()
