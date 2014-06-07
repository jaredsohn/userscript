// ==UserScript==
// @name        Hide signout
// @namespace   gmailHide
// @grant       metadata
// @grant       GM_getValue
// @grant       GM_setValue
// @description hiding gmail signout
// @include     https://mail.google.com/mail/u/0/?shva=1#inbox
// @include     https://mail.google.com/mail/?shva
// @include     https://mail.google.com/mail/u/0/#inbox
// @include     https://mail.google.com/mail/?shva=1#inbox
// @include     https://mail.google.com/mail/u/0/
// @include     https://mail.google.com/
// @include     https://gmail.com/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1
// ==/UserScript==

var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;


/*--- Run everything after the document has loaded.  Avoids race-
      conditions and excessive "churn".
*/
window.addEventListener ("load", emlDel, false);


var waitTohide = setInterval(function(){emlDel()},500);

function emlDel()
{


if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;

        /*--- Notes:
                (1) If the ajax loads to a specific node, add this
                    listener to that, instead of the whole body.
                (2) iFrames may require different handling.
        */
        document.addEventListener ("click","DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }

/* 
Hiding all the areas described bellow in the comments using the class names. 
Example ".ar4" is the class that refers to the email area as a whole. 
*/

$(".ar4").hide(); //email area
$(".aiw").hide();  //Black bar at the top of gmail including search and Name and signout 
$(".aki").hide(); //Gmail button to select contacts and Tasks
$(".z0").hide(); //compose email button
$(".ajl").hide(); //email labels on top of chat area


}




function HandleDOM_ChangeWithDelay (zEvent)
{
    /*--- DOM changes will come hundreds at a time, we wait a fraction
          of a second after the LAST change in a batch.
    */
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 2); //-- 2 milliseconds
}