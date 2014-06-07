// ==UserScript==
// @name        Netflix Randomize Queue Fixed
// @namespace   http://www.arantius.com/misc/greasemonkey/
// @description	This script was originally written by someone else.  However, using checkboxes to narrow the randomization was not working.  Here is the original description: When viewing your NetFlix queue, check the boxes for some movies and then the randomize button to put them in a random order.
// @include     http://www.netflix.com/Queue*
// @version     1.2
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

// Combines well with http://www.squarefree.com/2005/04/13/checkrange/

//
// Version History
//
// 1.2 - Match Netflix's new visual style.
//
// 1.1 - When no movies are selected, user is presented with the option
//       to randomize them all.
//

(function(){
function randomize(event) {
	// important: prevent the default action of clicking this button,
	// the form submission on non-update button
	event.preventDefault();

	var res = document.evaluate("//form[@name='MainQueueForm']//input[@type='checkbox']", 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	var i, el;
	var inputs=new Array();
	var cboxes=new Array();
	var values=new Array();

	for (i=0; el=res.snapshotItem(i); i++) {
		if (!el.checked) continue;
		if ('MainQueueForm'!=el.form.name) continue;
		
		cboxes[cboxes.length]=el;
			
		inputs[inputs.length]=
			el.parentNode.parentNode.firstChild.childNodes[1];
			
		values[values.length]=inputs[inputs.length-1].value;
	}

	if (inputs.length < 2) {
		if (confirm('You must select at least two movies in your queue!\nClick OK to randomize all movies, or cancel to do nothing.')) {
			for (i=0; el=res.snapshotItem(i); i++) {
				el.checked=true;
			}
		} else {
			return;
		}
	}

	//randomize the values by a lot of splicing
	//(select random element and move it to the end)
	for (var i=0; i<inputs.length; i++ ) {
		values.push(values.splice(Math.floor(Math.random()*values.length), 1));
	}

	//asign new values, uncheck checkboxes (else we delete from queue!)
	for (var i=0; i<inputs.length; i++) {
		inputs[i].value=values[i];
		cboxes[i].checked=false;
	}

	//submit form by "clicking" the right button
	var res = document.evaluate("//input[@type='submit'][@name='updateQueueBtn']", 
		document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	var el=res.snapshotItem(0);
	el.click();
}

//find 'update' buttons and add 'randomize' buttons
var res = document.evaluate("//input[@type='submit']", 
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var i, el;
for (i=0; el=res.snapshotItem(i); i++) {
	//we only want to do the first two
	if (2==i) break;
	
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

	//take off original update button's handler that looks weird now
	el=el.wrappedJSObject||el;
	el.onmouseover='';
	el.onmouseout='';
}

})()
