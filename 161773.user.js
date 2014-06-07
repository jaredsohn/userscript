// ==UserScript==
// @name        Chevah GitHub Pull Request
// @namespace   http://userscripts.org/users/cracknel
// @description Autocompletes the pull request text on GitHub with the templated used by Chevah project.
// @include     https://github.com/*
// @version     1
// @grant       none
// @license     GPL version 3 or any later version: http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==


/* Adding chapters to the pull request" */
var txtDesc = document.getElementById("pull_request_body");

if (txtDesc) {
    txtDesc.textContent =  "Problem description\n\
===================\n\
\n\
Describe the problem that these changes wants to solve.\n\
This content should be created when a ticket is submitted and just link\n\
the ticket or copy paste the ticket description... or find a way for\n\
linking this review to a ticket.\n\
\n\
\n\
Why we got into this (5 whys)\n\
=============================\n\
\n\
Mainly used for bugs.\n\
Describe why we got this problem in the first place. What went wrong.\n\
Repeatedly ask the question **Why** (up to 5 times) to determine to\n\
cause of this problem.\n\
\n\
\n\
Changes description\n\
===================\n\
\n\
Describe how the problem was fixed.\n\
What changes were done.\n\
What actions were performed.\n\
What was not done yet and link to the ticket for the still to do work.\n\
\n\
\n\
How to try and test the changes\n\
===============================\n\
\n\
reviewers @example-dude @another-dude\n\
\n\
What code / repositories were affected. Where is the code.\n\
If the code in only on a single feature branch, no need to say something\n\
about the code.\n\
\n\
How the changes can be tested and verified as an end user.\n\
A list of steps to follow for checking that everything is OK\n";
    
}

/* Adding title to the pull request. */
var txtTitle = document.getElementById("pull_request_title");

if (txtTitle) {
    txtTitle.value = "[#TICKET_ID] "  + txtTitle.value;
}
