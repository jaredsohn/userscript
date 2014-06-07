// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CentSport Remove Unbettable Lines
// @namespace     http://www.centsports.com
// @description   Removes non-bettable lines from the centsports website
// @include       http://*.centsports.com/new_bet*
// @exclude       http://*.centsports.com/forum/*
// ==/UserScript==


// declare a variable/holder for the bet table
var betContainer;
// find all of the not open bets.  
betContainer = document.evaluate( "//div[@class='white_table_header'][@id='div2']",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


/*****************************************************************************
 *
 *  The main part of this script that will do the showing/hiding of lines
 *  The variable 'what' that gets passed in a reference to the checkbox the
 *    user just clicked on
 *    
 *  There are two different styles we will need to restore - but only one 
 *     used in hiding.  The DIV that we come across need to be set to block
 *     while the tables need to be set to the 'table' display type
 *  When we restore line we have to add back in the 3 <br> tags 
 *     for spacing between the tables.  
*****************************************************************************/ 
function hideEm(what){
  // get our users preference - well actually last click
  GM_setValue('hideLines', what.checked)

  // is the box checked or not
  var showHide = what.checked
  var style1 = 'none'
  var style2 = 'none'    
  // if we want to display everything set the 2 default styles
  if (! showHide ){
      style1 = 'block';
      style2 = 'table'
  }
 
  /*********************************************************************
   *  Welcome to ugly land
      
      Here is where we loop through each div that matched the criterea set above.  
        For each div we are turning on we will 
            1.  set the display style back to block
            2.  set the table underneath it display style back to table
            3.  add three br tags to keep the space
        For each div we are hiding we will 
            1.  set the display style none
            2.  set the table underneath it display style none
            3.  remove the 3 br tags that keep the space 
   *
   *********************************************************************/        
    
    for (var i = 0; i < betContainer.snapshotLength; i++) {
      var el1 = betContainer.snapshotItem(i)
      el1.style.display = style1
      var el2 = betContainer.snapshotItem(i).nextSibling.nextSibling
      el2.style.display = style2
      if (! showHide){
        el2.parentNode.insertBefore(document.createElement('br'), el2.nextSibling);
        el2.parentNode.insertBefore(document.createElement('br'), el2.nextSibling);
        el2.parentNode.insertBefore(document.createElement('br'), el2.nextSibling);        
      }
      else {
        while (el2.nextSibling.nextSibling.tagName == 'BR'){
          var p = el2.parentNode
          //alert(p)
          p.removeChild(el2.nextSibling.nextSibling)
            // skips the "text" node
          if (el2.nextSibling.nextSibling.nodeType == 3){
            el2 = el2.nextSibling
          }
        }
     }     
  }
}

/*****************************************************************************
 *    Here we find the betting table header
 *    we are looking for a div with the class = white_table_header and an id = div6
 *    If the layout of the betpage should ever change this 
 *      will be a good place to start looking for why this script is broken  
 ****************************************************************************/ 
startOfBetTable = document.evaluate( "//div[@class='white_table_header'][@id='div6']",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var container = startOfBetTable.snapshotItem(0)

//  Cheate the checkbox
var cbx     = document.createElement('input')
cbx.id      = 'cbx'
cbx.type    = "checkbox";
cbx.name    = "openOnly"

// add the text first and then add the checkbox
container.insertBefore(document.createTextNode('Show Only Open Lines'), container.firstChild)
container.insertBefore(cbx, container.firstChild)

// add the on click listener
cbx.addEventListener('click', function () { hideEm(cbx) }, false);

var checkedByDefault = false;
if (GM_getValue('hideLines')  && GM_getValue('hideLines') != false){
  document.getElementById('cbx').click()
}

/******************************************************************************
 *   Normal self plug header
******************************************************************************/ 
if( ! document.getElementById('poweredBy')) {
    var poweredBy = document.createElement('div')
    poweredBy.style.position = 'fixed'
    poweredBy.id = 'poweredBy'
    poweredBy.style.backgroundColor = 'transparent'
    poweredBy.innerHTML = 'Like my scripts?  Become my  <a href="http://www.centsports.com/crony_invite_action.php?master_id=19322"> cronie.</a> - Puttzy'
    document.body.insertBefore(poweredBy, document.body.firstChild);
}
