// ==UserScript==
// @name           Quiz Jungle Auto randomfill + submit
// @namespace      http://schoolsux.tz/
// @description    Does the first two pages of quiz jungle and clicks submit for you instantly.
// @include           http://www.eltpath.com/*
// @include           http://*.smileymedia.com/*
// @include           http://lgn*.coolsavings.com/*
// @include           http://lnktrckr.com/*
// @include           http://*quizjungle.com/?act_id=*
// @include           http://www.quizjumper.com/*
// @include           http://www.modpath.com/*
// @include           http://www.tnmtechnology.com/*
// @include           http://www.brandarama.com/*
// @include           http://www.topconsumergifts.com/*
// @include           http://offers.slwpath.com/*
// @include           http://us.quizrocket.com/*
// @include           http://www*.recipe4living.com/default*
// @include           http://www.premiumproductsonline.com/*
// @include           https://mysmokingrewards.com/*
// @include           http://www.eversave.com/*
// @include           http://www.thelaptopsaver.com/*
// ==/UserScript==



function randomFill() {
    

    //Menus
    var selectMenus = document.getElementsByTagName('select');

    // The menu section.
    if (selectMenus.length) {
	// if there is atleast one menu on the page
	// then change the value of all of them.
	for (var i = 0; i < selectMenus.length; i++) {
	    // Number of choices in the menu
	    var choiceNum = selectMenus[i].length;
	    // Select a random number between 0 and the (number of choices - 1)
	    var newIndex = Math.round( ( Math.random() * ( choiceNum - 1) ) );
	    if (newIndex == 0) {
		// Lets make sure the menu doesn't stay on the default value
		// which is usually 0.
		newIndex = newIndex + 1;
	    }

	    // Change the selection.
	    selectMenus[i].selectedIndex = newIndex;
	}
    }


    // The Checkbox/Radio Section
    var inputElements = document.getElementsByTagName('input');
    var groupCount = 0;
    var groupStart = 0;

    if ( inputElements.length ) {
	// if there is atleast one input element on the page
	// then change the value of all of them.
	for (var i = 0; i < inputElements.length; i++) {
		 
	    var formName = inputElements[i].form.name;
	    var groupName = inputElements[i].name;
	    //var currentGroup = document.forms[formName].elements[groupName];

	    var form = document.forms.namedItem(formName);
	
	    // radio boxes
	    if ( inputElements[i].type == 'radio' ) {

		if ( i == 0 || groupCount == 0 || groupName == previousName ) {
		    // then add one to the count.
		    groupCount = groupCount + 1;
		    var previousName = groupName;

		    ////// this could potentially cause a problem
		    ////// if there is no i + 1:
		    if ( inputElements[i + 1].name != groupName ) {
			// if the next element is a different group
			// select a value for this group, and reset
			// the count.
		    
			// the lowest numbered element we can select in this group
			var minRange = ((i + 1) - groupCount);
		    
			// randomize the selection
			var selection = Math.round( ( Math.random() * ( groupCount - 1) ) );
		    
			//select a value anywhere from minRange to minRange + selection.
			inputElements[minRange + selection].checked = true;
		    
			groupCount = 0;
		    }
		}
	    }
	    // checkboxes
	    else if ( inputElements[i].type == 'checkbox' ) {
		// either select a checkbox or don't.  randomize.		    
		var selectDecision = Math.round ( ( Math.random() * 1 ) );
		if ( selectDecision == 1 ) {
		    // if random number is 1 then select box.
		    if ( inputElements[i].checked ) {
			// if the box is already checked, uncheck it.
			inputElements[i].checked = false;
		    }
		    else {
			// otherwise check the box.
			inputElements[i].checked = true;
		    }
		}
	    }
	    // submit button
	    else if ( inputElements[i].type == 'image' ) {
		// this is the submit button, save it's position and focus it at end of loop.
		var submitButton = inputElements[i];
	    }
	} 
	// focus the submit button
	submitButton.focus();
        submitButton.click();
    }
}



//randomfill on pageload

window.addEventListener('load', randomFill, false);


