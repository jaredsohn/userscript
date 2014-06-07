// ==UserScript==
// @name           salon.com - print news wires v1.0
// @namespace      http://earlh.com
// @description    Allows stripping of the side bars / header / footer of the salon news wires to allow for easier printing / saving
// @include        http://www.salon.com/wire/ap/*
// ==/UserScript==


/*
 * NB: this works as of 10 Mar, 2007.  If / when salon changes their site this script will break
 *
 * Thanks to the author of "Download Video" -- 1024k.de -- for the notification idea and liberal code borrowing
 *
 * problems?  contact me at scripts at pantsearlh.com (take off my pants before emailing)
 *
 */
 
 
 insertNotice();
 
 /*
  *
  * inserts a notice at the top of the screen to allow the user to decide if he/she wants to prepare for printing
  * ps -- borrowed and modified a tiny bit from the author of download video.  Hope (s)he doesn't mind.
  */
function insertNotice() {
	document.getElementsByTagName('html')[0].setAttribute('style','margin-top:22px;');

	var myDiv = document.createElement('div');
	myDiv.setAttribute('id','elhDiv');
	myDiv.setAttribute('style', 'cursor:pointer;position:fixed;top:0;right:0;width:100%;height:21px;padding:0 3px;background-color:#FFFA2F;border-bottom:1px solid #8C8C8C');

	var p = document.createElement('p');
	p.setAttribute('style','margin:0;padding:3px;font-family:arial,helvetica,sans-serif;color:#666666;font-size:12px;text-align:center;');
	p.setAttribute('id','elhDiv-p');

	var text = document.createTextNode('Clean page for printing');

	document.getElementsByTagName('body')[0].appendChild(myDiv);
	myDiv.appendChild(p);
	p.appendChild(text);

	document.getElementById('elhDiv').addEventListener('click',cleanPage,false);
}

 
 
 
 
 
/*
 * when the user clicks the notification, delete all the elements but the text and a surrounding div 
 * to facilitate clean printing / saving
 *
 * list of elements to delete
 *		member_options, site_header are both headers
 *		footer is the footer
 *		side_column is the left side navigation bar -- with links to other AP articles
 *		elhDiv -- my notification bar
 */
function cleanPage() { 
 
	var namesToDelete = ['elhDiv', 'member_options', 'site_header', 'footer', 'side_column'];

	for(i=0; i < namesToDelete.length; i++)
		removeElement( namesToDelete[ i ] );
 
 
	/*
	 * now we want to move the div named main_column out of outer_container and make it a top level div
	 * thus add the main_column to the parent of outer_container and delete outer_container
	 */

	var outerDiv 		= document.getElementById('outer_container');
	var innerDiv 		= document.getElementById('main_column');
	var outerDivParent	= null;
	if ( outerDiv && innerDiv ) {
		var outerDivParent = outerDiv.parentNode;

		if ( outerDivParent ) {
			outerDivParent.appendChild( innerDiv );
			outerDivParent.removeChild( outerDiv );
		}
	}
 
} 
 
 
/*
 * function to remove an element by name
 *
 */
function removeElement( elementName )
{
	var ref;
	ref = document.getElementById( elementName );
	if (ref && ref.parentNode )
		ref.parentNode.removeChild( ref );
}
