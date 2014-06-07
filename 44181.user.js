// ==UserScript==
// @name           Facebook Highlights Remove
// @namespace      http://tech.karbassi.com
// @homepage       http://tech.karbassi.com
// @author         Ali Karbassi
// @description    Removes the annoying hightlights part of the new facebook design. Works in Firefox and Safari.
// @include        http://*.facebook.com/home.php*
// ==/UserScript==

// Comment out the header you don't want removed.
var toRemove = [
   "Today",
   "Tomorrow",
   "Requests",
   "Events",
   "Sponsored",
   // "Pokes",
   "Highlights",
   "People you might know",
   "Connect with friends"
];

    // Do not touch if you have no clue what you're doing :D

// This function is from Dustin Diaz
function getElementsByClass(searchClass,node,tag) {
    var classElements = new Array();
    if ( node == null ) node = document;
    if ( tag == null ) tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp('(^|\\\\s)'+searchClass+'(\\\\s|$)');
    for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

Array.prototype.inArray = function (value) {
    for (var i=0; i < this.length; i++) {
        if (this[i] === value) {
            return true;
        }
    }
    return false;
};

var el = getElementsByClass('UITitledBox_Title');

for( var i = 0; i < el.length; i++ ) {
   var temp = el[i];
   if (toRemove.inArray(temp.innerHTML)) {

      // Let's fine the top level div that holds all of the content
      while ((temp.className != 'UIHomeBox UITitledBox') && (temp.className.indexOf('UIHomeBox UITitledBox') <= 0)){
         temp = temp.parentNode;
      }

      // Remove this box
      var t = temp;
      t.parentNode.removeChild(t);
   }
}   

// Nothing is left, let's remove the sidebar and expand.
el = document.getElementById('home_sidebar');
if (el.childNodes.length == 2) {
   // Remove the sidebar
   el = document.getElementById('home_sidebar');
   el.parentNode.removeChild(el);

   // Expand the main content
   document.getElementById('home_left_column').style.width = '940px';
   document.getElementById('home_stream').style.width = '800px'; 
   
   // Expand the individual messages now. Woot!
   el = getElementsByClass('UIIntentionalStory_Message');
   for (i = el.length - 1; i >= 0; i--){
      el[i].style.width = "730px";
   };
}