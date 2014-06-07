// ==UserScript==
// @name           PaB
// @namespace      com.lego
// @include        http://shop.lego.com/pab/PabPage.aspx
// ==/UserScript==

// Greasemonkey can listen to the shopping bag on update events 
window.addEventListener('DOMSubtreeModified', function () 
{
	/* replacing addbrick with myaddbrick was not needed
	var allLinks, thisLink;
	allLinks = document.evaluate(
	    '//a[@href]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
	    thisLink = allLinks.snapshotItem(i);
	    if (thisLink.href.indexOf("addBrick") != -1)
	    { 
	    	thisLink.href = thisLink.href.replace("addBrick", "myAddBrick");
	    }
	}*/
	
	if (document.getElementById('livecheckbox').checked == 1)
	{
		updateList();
	}
	
}, false);

// Most of the script is just inserted inline with the page and contains
//  our own floating object with part list and buttons
// and the injected javascript that will handle and call the local functions
// ( i.e not in the scope of greasemonkey )

var variables = "var bricks = new Array();\n "

function brickObject(brickid, number)
{
	this.brickid = brickid;
	this.number =   parseInt(number);
}

/* Addbrick was not needed since we get the updated bag in return instead
function myAddBrick(brickid, number)
{
    myBrickAction = 0;
    myBricks = brickid + ("," + number);
    getBag();
	// addBrick(brickid, number);
} */

function live() {
	alert('Check the \'live\' box to update the list while adding bricks in the shop');
}

function traverseBag(element) {
	if (element.tagName == "INPUT")
	{
		bricks[bricks.length] = new brickObject(element.getAttribute('id').substring(10), element.value);
	}

	var i = 0;
	while (child = element.childNodes[i++]) {
		traverseBag(child);
	}
}

function updateList() {
	bricks = new Array(); // reset bricks array
			      // May be more memory gentle to just set quantity to 0 for all....
	
	traverseBag(document.getElementById("pnlBagContent")); // document.getElementById("pnlBagContent");
	
	var s = '';
	for (var i=0; i<bricks.length; i++) {
		s += bricks[i].brickid + ': ' + bricks[i].number + '\n';
	}
	document.getElementById('bricktextarea').value = s;
}

function addList() {
	
	if (document.getElementById('livecheckbox').checked == 1)
	{
		alert('This will add all items in the above list to the bag\n Since you have a \"Live\" list this will multiply the list by two\n Please uncheck \"Live\" and press \"Add\" again if this is what you intended');
		return;
	}
	
	// Update internal list but don't touch the textbox
	bricks = new Array(); // reset bricks array
			      // May be more memory gentle to just set quantity to 0 for all....
	
	traverseBag(document.getElementById("pnlBagContent")); // document.getElementById("pnlBagContent");
	
	// Add each bricks from the textbox
	var newbricks = document.getElementById('bricktextarea').value.split('\n');
	
	for (var i=0; i<newbricks.length; i++)
	{ 	
		var mark = newbricks[i].indexOf(':');
		if ( mark != -1)
		{
			var brickid = newbricks[i].substring(0, mark);
			var j;
			for (j=0; j<bricks.length; j++)
			{
				if (bricks[j].brickid == brickid)
				{
					bricks[j].number += parseInt( newbricks[i].substring(mark + 1) );
					break;
				}
			}
			if (j == bricks.length)
			{
				bricks[j] = new brickObject(brickid, newbricks[i].substring(mark + 1));
			}
			
		}
	}
	
	myBrickAction = 2;
	myBricks = "";
	
	if ( bricks )	{
		for (var i=0; i<bricks.length; i++) {
			myBricks += bricks[i].brickid + ("|" + bricks[i].number + ',');	
		}
		getBag();
	}
}

var script = document.createElement('script');
script.innerHTML = variables + brickObject + live + updateList + traverseBag + addList;
document.getElementsByTagName('head')[0].appendChild(script); 

	

var extraMenu = document.createElement("div");
extraMenu.innerHTML = '<style type="text/css">'
+'<!--'
+'#extralayer #table1 a {'
+'text-decoration: none !important;'
+'color: #000000 !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 10px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+'}'
+'#extralayer #table1 a:hover {'
+'color: #0000FF !important;'
+'}'
+'#extralayer #table1 {'
+'background-color: #CCCCCC !important;'
+'}'
+'textarea.CommentBox {'
+'width:150px;'
+'height:50px;'
+'padding:5px;'
+'font-size:8pt;'
+'font-family:Verdana;'
+'border-color:#959385;'
+'border-style:solid;'
+'}'
+'-->'
+'</style>'
+'<div style="position: fixed; width: 100px; height: 100px; z-index: 100; right; top: 0pt; left: 0pt" id="extralayer">'
+'<table border="0" width="100%" id="table1" bgcolor="#C0C0C0">'
+'<tr><td><p align="left">'
+'<form>'
+'<textarea class="CommentBox" id="bricktextarea" name="f_comments" cols="10" rows="3"></textarea><br>'
+'<a href="javascript:live()">Live:</a> <input type="checkbox" checked="true" id="livecheckbox" name="live" value="true" /> '
+'<a href="javascript:updateList()">Update</a> '
+'<a href="javascript:addList()">Add</a> '
+'</form>'
+'</font></td></tr></table></div>'
document.body.insertBefore(extraMenu, document.body.firstChild);