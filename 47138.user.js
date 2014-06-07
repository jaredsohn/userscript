// ==UserScript== 
// @name		Do Not Remember Me
// @author     	Jake Kasprzak
// @namespace	http://www.jake.kasprzak.ca
// @version	0.1.2
// @description	Ensures that options to be remembered by websites are not selected by default.
// @include	* 
// ==/UserScript== 

(function() {

//checkboxTest: checks if checkboxes are to have their "checked" attributes changed, given that checkbox and the text next to the checkbox passed to it
//returns true if information associated with checkbox indicates it is for remembering user, false if not, and it also adjusts "checked" attribute if necessary
function checkboxTest(checkbox, nodeValue) {
	
	//set up array of regular expressions used for determining if text near checkbox indicates that checkbox is for remembering users
	var uncheckTextRe = new Array();
	
	uncheckTextRe[0] = new RegExp("remember.*(me|(log|sign)?(in|on))", "i");
	uncheckTextRe[1] = new RegExp("(log|sign).*(in|on).*automatically", "i");
	uncheckTextRe[2] = new RegExp("(keep|stay).*(signed|logged)", "i");
	
	//indicates whether or not one of these checkboxes had been found
	var found = false;
	
	//test the text passed to the function against each regular expressions until match is found, or until text has been tested against all regular expressions
	for (var i=0; (!found) && (i<uncheckTextRe.length); i++) {
		if (uncheckTextRe[i].test(nodeValue)) {
			checkbox.checked = false;
			found = true;
		}
	}
	
	//set up array of regular expressions used for determining if text near checkbox indicates that checkbox is for not remembering users
	var checkTextRe = new Array();
	checkTextRe[0] = new RegExp("public (terminal|computer)", "i");
	
	//test the text passed to the function against each regular expressions until match is found, or until text has been tested against all regular expressions
	for (var i=0; (!found) && (i<checkTextRe.length); i++) {
		if (checkTextRe[i].test(nodeValue)) {
			checkbox.checked = true;
			found = true;
		}
	}
	
	return found;
} //checkboxTest


//checkNodeAndDescendants: given the checkbox element and a node, check that node and search nearby nodes for text indicating the checkbox is for remembering users
//also returns information on whether or not text to be found, or any text at all, was found in passed node or any of its descendant nodes
function checkNodeAndDescendants(checkbox, currentNode) {
	
	//initialize boolean variables for indicating whether or not text to be found or any text was found
	var found = false;
	var foundText = false;
	
	//used for checking if any actual text is in a text node
	var containTextRe = new RegExp("[a-z]+", "i");
	
	//first, check if node passed to this function has text, then see if it is text that must be found
	if ((currentNode.nodeType==3) && (containTextRe.test(currentNode.nodeValue))) {
		foundText = true;
		found = checkboxTest(checkbox, currentNode.nodeValue);
	}

	//go through each child node of the node passed to look for text, if the passed node has child nodes
	for (var i=0; (!found) && (!foundText) && (i < currentNode.childNodes.length); i++) {
		
		//first, if child node is a text node, test to see if may indicate it is for remembering users
		if ((currentNode.childNodes[i].nodeType==3) && (containTextRe.test(currentNode.childNodes[i].nodeValue))) {	
			foundText = true;
			found = checkboxTest(checkbox, currentNode.childNodes[i].nodeValue);
		}
		
		//then check the grandchild nodes
		for (var j=0; (!found) && (!foundText) && (j < currentNode.childNodes[i].childNodes.length); j++) {
			
			if ((currentNode.childNodes[i].childNodes[j].nodeType==3) && (containTextRe.test(currentNode.childNodes[i].childNodes[j].nodeValue))) {		
				foundText = true;
				found = checkboxTest(checkbox, currentNode.childNodes[i].childNodes[j].nodeValue);
			}	
		}
		
	} //for
	
	return [found, foundText];

} //checkNodeAndDescendants 


//init: main function called after page is finished loading 
function init() {

	//boolean value set to true once text it searches for has been found
	var found = false;
	
	//boolean value set to true once any text beside checkbox is found
	var foundText = false;
	
	//contains found and foundText, respectively
	var foundArray = new Array();
	
	//locate all checkboxes on the page
	var checkboxes = document.evaluate(
		"//input[@type='checkbox']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);	
	
	//go through each checkbox until one is found near text for remembering users
	for (var i=0; (!found) && i < checkboxes.snapshotLength; i++) {
	
		//the checkbox element needs to be stored in case it is the one that needs to have its "checked" attribute modified
		var checkbox = checkboxes.snapshotItem(i);
		
		
		//loop through siblings to the right of the checkbox and then to the left of it until text is found
		
		var currentNode = checkbox;
		
		while ((currentNode.nextSibling!=null) && (!foundText) ) {	
			
			currentNode = currentNode.nextSibling;
		
			foundArray = checkNodeAndDescendants(checkbox, currentNode);
			found = foundArray[0];
			foundText = foundArray[1];
			
		} //while	
		
		
		//now check previous sibling nodes for text
		
		//first reset variables
		foundText = false;
		currentNode = checkbox;
		
		while ((!found) && (currentNode.previousSibling!=null) && (!foundText) ) {
			
			currentNode = currentNode.previousSibling;
			
			foundArray = checkNodeAndDescendants(checkbox, currentNode);
			found = foundArray[0];
			foundText = foundArray[1];
		
		} //while	
		
		//text to be located might not be in a sibling node
		//handle situation in which the checkbox and text to be located are in separate sections of a table row 
		
		foundText = false;
		
		if ((!found) && checkbox.parentNode.tagName.toUpperCase()=="TD") {
			
			//locate the next <TD> node, determine if text to be located is there
			currentNode = checkbox.parentNode.nextSibling;
			
			//keep looking through nodes to the right until <TD> found 
			while ((currentNode.tagName==null || currentNode.tagName.toUpperCase()!="TD") && (currentNode.nextSibling != null) ) {
				currentNode = currentNode.nextSibling;
			}
			
			foundArray = checkNodeAndDescendants(checkbox, currentNode);
			found = foundArray[0];
			foundText = foundArray[1];
		
			//check if text to be located is in previous <TD> node
			if (!found) {
				
				currentNode = checkbox.parentNode.previousSibling;
				foundText = false;
				
				//keep looking through nodes to the left until <TD> found 	
				while ((currentNode.tagName==null || currentNode.tagName.toUpperCase()!="TD") && currentNode.previousSibling != null ) {
					currentNode = currentNode.previousSibling;
				}
				foundArray = checkNodeAndDescendants(checkbox, currentNode);
				found = foundArray[0];
				foundText = foundArray[1];
				
			} //if
		} //if
	} //for
} //init

// need to wait for page to be finished loading before beginning. This is for login pages that are generated dynamically (such as Hotmail)
window.addEventListener('load', init, true);
		
})();
