// ==UserScript==
// @name       CodeCollab Reviewer Highlight
// @namespace  
// @version    1.0
// @description  Highlights the reviewer row in orange.
// @match      http://c*collab/*
// @copyright  2013+, Peter Bottomley
// ==/UserScript==

function processResults (elements)
{
	var length = elements.length, element = null, i, role, child;
    for (i = 0; i < length; i++) {
        element = elements[i];
        role = element.getElementsByClassName("column-role");
        if(role!=null)
        {
            if(role.length>0)
            {
                child = role[0];
                if(child!=null)
                {
                    if(child.textContent=="Reviewer")
                    {
                        element.style.backgroundColor = '#FF8E2B';	// Orange
                    }
                    else if(child.textContent=="Observer")
                    {
                        element.style.backgroundColor = '#FFFF6D';	// Pale Yellow
                    }
                    else if(child.textContent=="Author")
                    {
                        element.style.backgroundColor = '#99FF8C';	// Pale Green
                    }
                }
            }
        }
    }
}

function checkForResultsLinks ()
{
    var evens = document.getElementsByClassName("evenRow"), odds = document.getElementsByClassName("oddRow");
    if(evens)
    {
	    processResults(evens);
    }
    if(odds)
    {
	    processResults(odds);
    }
}

setInterval(function() { checkForResultsLinks(); }, 1000);
