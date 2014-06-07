// ==UserScript==
// @name        Block Trolls on KickStarter 2.0
// @namespace   http://userscripts.org/users/471507
// @include     http://www.kickstarter.com/projects/*/*/comments*
// @version     1
// ==/UserScript==

// By intelligen

var usersToBlock = {};
// Add copy and paste the line below, replacing the profile URL and username
// for each user you want to block. (Note: username is just a label for your
// own convenience, so it doesn't have to be exact.)
usersToBlock['http://www.kickstarter.com/profile/893368631']='Sixto';
usersToBlock['http://www.kickstarter.com/profile/2089545029']='Christoper Leveck';
usersToBlock['http://www.kickstarter.com/profile/1032619307']='Torbjorn Arvidsson';
usersToBlock['http://www.kickstarter.com/profile/2115792214']='Tom McDonnell';
usersToBlock['http://www.kickstarter.com/profile/keithrome']='Keith Rome';
usersToBlock['http://www.kickstarter.com/profile/athashtag']='Nial Pearce';
usersToBlock['http://www.kickstarter.com/profile/143772989']='Alexander Karl';



var authors;
authors  = document.getElementsByClassName('author');

for (i=authors.length-1; i>=0; i--) {
  var author=authors[i];
  if (usersToBlock.hasOwnProperty(author.href)) {
	var toRemove=author.parentElement.parentElement.parentElement;
	toRemove.parentElement.removeChild(toRemove);
  }
}


/*--- To "refire" our Greasemonkey code on AJAX changes, we wrap it in
    a function and call it on a DOM change event.
*/

var commentSubNode=document.getElementById('comments');



var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;


/*--- Run everything after the document has loaded.  Avoids race-
      conditions and excessive "churn".
*/
window.addEventListener ("load", MainAction, false);


function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;
        commentSubNode.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }

    authors  = document.getElementsByClassName('author');

    for (i=authors.length-1; i>=0; i--) {
      var author=authors[i];
      if (usersToBlock.hasOwnProperty(author.href)) {
	    var toRemove=author.parentElement.parentElement.parentElement;
    	toRemove.parentElement.removeChild(toRemove);
      }
    }
}


function HandleDOM_ChangeWithDelay (zEvent)
{
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 300); 
}

