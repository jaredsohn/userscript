// ==UserScript==
// @name          PoFo Annoying People Blocker
// @namespace     http://www.politicsforum.org/forum/viewtopic.php*
// @description   delete posts of people you don't like
// @include       *
// ==/UserScript==


   // Get stored hidden users from array
    var users = new Array("SpiderMonkey","Mercutio","NoRapture");
 


window.addEventListener(
    'load',
    deletePosts(),
    true);


   
function deletePosts() {
   var rows;
   rows = document.evaluate(
    "//*[@class='genmed']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
   for (var i = 0; i < rows.snapshotLength; i++) {
              var row = rows.snapshotItem(i);
      var text = row.innerHTML;
      
      for (x in users) {
         
                 if (text.search(users[x].toString()) > -1) {

                   row.parentNode.parentNode.parentNode.parentNode.removeChild(row.parentNode.parentNode.parentNode);
                }
   }

}
}