// ==UserScript==
// @name           Netflix boximages in queue
// @namespace 
// @description    Display DVD box images in your Netflix queue.
// @include        http://www.netflix.com/Queue*
// @include        http://www.netflix.com/ReturnedRentals*
// @include        https://www.netflix.com/RentalActivity*
// @include        http://www.netflix.com/MoviesYouveSeen*
// @include        http://movies.netflix.com/Queue*
// @include        http://movies.netflix.com/ReturnedRentals*
// @include        https://movies.netflix.com/RentalActivity*
// @include        http://movies.netflix.com/MoviesYouveSeen*
// ==/UserScript==

// $Date: 2009/10/26 22:10:00 $
// $Revision: 1.8 $
// William Skellenger
// skellenger.net@williamj

var DEBUG = 0;

function main() {
   var search_rows = "";
   //list-inactve was added 9/25/2009
   search_rows = "//td[contains(@class, 'tt')]";
   search_rows += " | //td[contains(@class, 'firstcol')]";
   search_rows += " | //td[contains(@class, 'list-inactive')]";

   allResults = document.evaluate(
      search_rows,
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);

   DEBUG ? console.log(allResults.snapshotLength) : {};

   for (var i=0; i< allResults.snapshotLength; i++) {
      var boximg = null;
      thisRow = allResults.snapshotItem(i);

      //in this row, find Movie ID number
      var id = thisRow.innerHTML.match('\/\(\[0-9\]\+\)\\?');
      if (id && id[1]) {
         var id = id[1];
         DEBUG ? console.log(id) : {};

         // create image src
         boximg = "http://cdn-4.nflximg.com/us/boxshots/small/" + id + ".jpg";

         // create img element
         var newImg = document.createElement('img');
         newImg.src = boximg;
         newImg.height = "90";
         newImg.border = "0";
         newImg.width = "65";
         newImg.vspace = "2";
         newImg.hspace = "2";
         newImg.align = "middle";
         newImg.alt = "";

         // finally insert image into document
         var thisHref = thisRow.firstChild.firstChild;
         if (thisHref == null) {
            // this is for the recent returns page
            thisHref = thisRow;
         }
         thisHref.insertBefore(newImg, thisHref.firstChild);
         thisHref.style.textDecoration="none";
      }
   }
}

main();
