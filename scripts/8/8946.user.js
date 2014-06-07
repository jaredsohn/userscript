// ==UserScript==
// @name        Yahoo! Answers Watchlist Status Colors
// @version     1.0
// @author      Lukas Fragodt
// @namespace   lukas.fragodt.yahoo.answers
// @description Flags "Open", "In Voting", and "Resolved" with colors.
// @include     http://answers.yahoo.com/my/*
// ==/UserScript==

function getElementsByClassRegExp ( element, className, root ) {
//Returns an array of all elements of a particular class.
//element   - string element name
//classname - regular expression for class
//root      - root element of DOM branch to search - defaults to document root

  var root = (root == null) ? document : root;
  var elements = root.getElementsByTagName(element);
  var retVal = new Array();

  for (var i = 0; i < elements.length; i++) {
    if (className.exec(elements[i].className)) {
      retVal.push(elements[i]);
    }
  }
  return retVal;
}

//Get all the "metainfo_qtext" elements containing the status.
var questions = getElementsByClassRegExp( 'div', /metainfo_qtext/, document.getElementById( 'ks-user-profile-watchlist' ) );

//For each item, color code it appropriately:
//Resolved = Red
//In Voting = Yellow
//Open = Green
for ( var i = 0; i < questions.length; i++ ) {
        var s = questions[i].innerHTML;
        if ( s.indexOf( "- Resolved" ) != -1 ) {
                //Red
                questions[i].parentNode.firstChild.style.color = 'red';
        } else if ( s.indexOf( "- In&nbsp;Voting" ) != -1 ) {
                //Yellow (simulating with orange)
                questions[i].parentNode.firstChild.style.color = 'orange';
        } else if ( s.indexOf( "- Open" ) != -1 ) {
                //Green
                questions[i].parentNode.firstChild.style.color = 'green';
        } else {
                GM_log( "Could not identify status." );
        }
}
