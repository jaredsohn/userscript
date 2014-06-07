// ==UserScript==
// @name           Snopes.com Antispoil
// @namespace      http://mhoecker.blog.uni-heidelberg.de/
// @description    Removes the rumor-truth-header...
// @include        http://snopes.com/*
// @include        http://www.snopes.com/*
// ==/UserScript==

// We want to catch all spoilers and hide them behind buttons.
// Unfortunately, snopes.com uses at least two different styles of HTML-pages to deliver its content.
// So for some of the stuff we have to define two if clauses, that check for spoiler items.
// (I was too lazy to write a function that alerts the user when both if clauses catch something (because that would be an error))

// There are two types of spoilers: 
// "Main Spoilers" that are displayed on each rumor-page near the top
// "List Spoilers" that are little gifs in the lists that categorize rumors.

// I left some "error-checking" code inside the script, so when something goes wrong, you can look what the variables are by
// uncommenting the alert(variable) lines.

// A: REMOVE MAIN SPOILERS
// The Main spoiler is always within (non standard!) noindex tags.
// I use document.evaluate to get all noindex tags. 
// The tag-specification is given by an "XPath"-expression, then the object, that should be searched is passed,
// the third argument says it should be in order (duh!) and I have no idea, what the fourth arg does.
var possible_spoilers = document.evaluate( '//noindex', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
var spoiler, spoiler_content;

// Unfortunately, snopes.com uses the noindex tag pretty excessively. So we have to check, which ones actually contain the spoiler.
// This loop checks for a main spoiler and, if it finds one, sets the variable "spoiler" onto the spoiler's node.
for (var i = 0; i < possible_spoilers.snapshotLength; i++)
{	
	// I found that the "newer style" pages have only one childnote in the interesting noindex tags. That never happens anywhere else on snopes.com
	if (possible_spoilers.snapshotItem(i).childNodes.length == 1)
	{
		spoiler = possible_spoilers.snapshotItem(i);
		//alert(spoiler.innerHTML);
	}
	// The "old style" pages have the word "status" right in front of the spoiler. 
	// Finding it with possible_spoilers.snapshotItem(i).someNode.nodeValue would have been prettier, but harder to code.
	if (possible_spoilers.snapshotItem(i).innerHTML.search(/Status:/) != -1)
	{
		spoiler = possible_spoilers.snapshotItem(i);
		//alert(spoiler.innerHTML);
	} 
		//alert(possible_spoilers.snapshotItem(i).childNodes.length + ' text' + possible_spoilers.snapshotItem(i).innerHTML);
}

//If a main spoiler was found, the spoiler is != 0 and we can manipulate the spoiler's node.
if (spoiler)
{
	//We create a button (inside a div for alignment) that will go inside the spoiler instead of the spoilertext
	//When the button is clicked, the spoiler.innerHTML gets restored to its original contents.
	// First: BackUp and erase the spoiler
	spoiler_content = spoiler.innerHTML 
	spoiler.innerHTML = ''
	// Second: Create new element
	var div = document.createElement("div");
	div.setAttribute("align", "center");
	var button = document.createElement("button");
	button.setAttribute('align', 'center');
	button.innerHTML = 'Click to reveal!';
	//On a click the butoon should replace itself with the original content
	button.addEventListener("click", function(e) { spoiler.innerHTML = spoiler_content; }, false);
	//put button inside div
	div.appendChild(button);
	//and then the div into the spoiler.
	spoiler.appendChild(div); 

}





//B: REMOVE LIST SPOILERS

//Because there are either zero or more than one list-spoilers (which are gif's), we have to use loops.

// Get all images, that are known to be used as spoilers.
// I tacidly assume, these gif's are used as spoilers only and nowhere else on the site. That might be wrong, though...
// Note the "or" in the XPath and how the string is concatenated before it is passed.
var image_spoilers = document.evaluate( "//IMG[contains(@SRC,'/common/green.gif')"
	+ " or contains(@SRC,'/common/red.gif') or contains(@SRC,'/common/multi.gif')"
	+ " or contains(@SRC,'/common/yellow.gif') or contains(@SRC,'/common/white.gif')]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
var image_spoilers_ori = new Array(image_spoilers.snapshotLength);
var image_buttons = new Array(image_spoilers.snapshotLength);


// We know, all nodes in image_spoilers are actually spoilers, so we do the button-replacement loop for all of them:
for (var i = 0; i<image_spoilers.snapshotLength; i++)
{	
	image_spoilers_ori[i] = image_spoilers.snapshotItem(i);
	image_buttons[i] = document.createElement("button");
	image_buttons[i].setAttribute('align', 'center');
	image_buttons[i].innerHTML = '?';
	// The function that restores the button-node to its original is sort of tricky, because by the time that the function
	// is called, "i" has the value of snapshotLength + 1 and the array reference will be erroneus.
	// We can circumentvent that using the JScript pseudo-node "this" and by giving each node an extra
	// Atrribute "id", which is a indexing number that can be used to retrieve the original node from the 
	// image_spoilers_ori array!
	image_buttons[i].setAttribute('id', i);
	image_buttons[i].addEventListener("click", function(e) { this.parentNode.replaceChild(image_spoilers_ori[this.getAttribute('id')],this); }, false);
	// Replace the node (.innerHTML does not work here, because we are changing an img-tag to a button-tag!)
	image_spoilers.snapshotItem(i).parentNode.replaceChild(image_buttons[i],image_spoilers.snapshotItem(i));

}