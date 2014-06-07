// ==UserScript==
// @name           Maayboli Forum Signature
// @namespace      maayboli.com
// @include        http://maayboli.com/node/*
// @include        http://*.maayboli.com/*
// @author         Kedar1001
// ==/UserScript==

// == Start Of Script ==

//This will place your comment+signature after click on Save button

window.setTimeout( 
	function() {
		var post = document.getElementById('edit-submit');
		post.addEventListener('click', addSignature, false);		
	}, 
	1
);

//This will add signature after the comment.

function addSignature(){
	
	//------------ Start Signature ----------- //
        // Place Your Signature in ""
        var sign = " !!--------- सह्हीच !!------------!! "; 
        //------------ End Signature ------------- //

        var newLine = "---------------------------------------"+ "\n";
	var text = document.getElementById('edit-comment').value;	
	text += "\n\n" + "\n\n" + newLine + sign;
	document.getElementById('edit-comment').value = text;
}

// == End Of Script ==