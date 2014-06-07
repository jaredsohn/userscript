// ==UserScript==
// @name       Bulk Gadget Script
// @version    0.1
// @description  Adds a "use all" button next to each gadget in MT
// @match      http://*.minethings.com/gadgets
// @copyright  2013+, Hotrootsoup
// ==/UserScript==

var allInputs;

try {
    allInputs = document.body.getElementsByTagName("input");
}

catch (e) {
    console.log("Problem with finding gadgets. Assuming none exist. Exiting peacefully.");
	return;
}
    
var inputs = [];
var i = 0;

for (i=0; i<allInputs.length; i++) { //We only want the buttons
    if (allInputs[i].type === "submit") {
        inputs.push(allInputs[i]);
    }
}

for (i=0; i<inputs.length; i++) { //Find the associated text. For some weird reason, Japhet doesn't just disable the button when you run out of the gadget.
    try {
    	inputs[i] = [inputs[i], inputs[i].parentNode.parentNode.parentNode.parentNode.getElementsByTagName("div")[0]]; /*Sexy, eh? Use more classes Japhet -.- */
    }
    catch (e) {
        console.log("Worlds longest line of code failed. Please report to Hotrootsoup after making sure no other script modifies this page.");
        return;
    }
}

var interval;

for (i=0; i<inputs.length; i++) {
    (function() { //Anonymous function so we can refer to i without...you know what...I can't explain closures in one sentence.
        var j = i;
    	var newButton = document.createElement("input");
        newButton.type = "button";
        newButton.value = "Use all";
        newButton.addEventListener("click", function() {
            if (interval) {
                window.clearInterval(interval); //No spamming Japhet you lazy bums. One at a time.
            }
                
            inputs[j][0].click(); //Click on first activation so we don't get an annoying delay.
            interval = window.setInterval(function() {
                if (parseInt(inputs[j][1].innerHTML, 10) <= 0) { //Check the (number) that shows how many we have left. See 4 comments up.
                    clearTimeout(interval);
                }
                else if (inputs[j][0].disabled) { //Simply wait until next loop to account for lag if button isn't ready yet
                    return;
                }
                else {
                    inputs[j][0].click();
                }
            }, 500);
        });
        try {
        	inputs[j][0].parentNode.parentNode.parentNode.appendChild(newButton);
        }
        catch (e) {
            console.log("Can't add button for some reason. Exiting.");
            throw (e);
        }
                    
    })();
}