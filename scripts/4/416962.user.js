// ==UserScript==
// @name          Script Test 3
// @namespace     Kevin
// @author        Kevin Watson
// @version       1.00
// @description	  Creating Button
// @include       https://test4.home-point.info*
// ==/UserScript==

var zNode = document.createElement('div');
zNode.innerHTML = '<button id="myButton" type="button">'
                + 'For Pete\'s sake, don\'t click me!</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {
    /*--- For our dummy action, we'll just add a line of text to the top
        of the screen.
    */
    var zNode       = document.createElement ('p');
    zNode.innerHTML = 'The button was clicked.';
    document.getElementById ("myContainer").appendChild (zNode);
}
 
function doMonkey(){
	//do something
}