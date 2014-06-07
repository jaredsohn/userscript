/*
    Calculate square footage of the real estate listing at www.mls.ca
    (Canadian Multiple Listing Service), for each listed room, including 
    running totals in both metric (sqare meters) and imperial (square feet).
    Beware that sometimes agents list the same room under different
    names (multiple times) - ie living room and dining room have 
    exact same dimensions. The script tries to be smart and ignore
    multiple rooms with identical dimensions which may not be
    a right thing to do - it's up to you to judge.
    
    A Firefox Greasemonkey script, Version 0.1, created May 31, 2005
    Nash R. Radovanovic <support@bgdsoftware.com>
    for BackGrounD Software (http://www.bgdsoftware.com)

    Original script location: http://www.bgdsoftware.com/freejs/mlscasqft.user.js
    For legal aspect of this distribution please see http://www.bgdsoftware.com/bgdsoftware/disclaim.txt
*/

// ==UserScript==
// @name            MLScaSQFT
// @namespace       http://www.bgdsoftware.com/freejs/
// @description     MLS.ca - calculate square footage for a real estate listing on the fly
// @include         http://www.mls.ca/*
// ==/UserScript==

(function () {

function calcSqFt(p) {
   for (var i = 0; i < p.childNodes.length; ++i){
      var c = p.childNodes[i];
      if (c.childNodes && c.childNodes.length){
         calcSqFt(c);
      }
      if (c.title && c.getAttribute("isMeasurement")){
         var x = c.title;
         var t = getText(c);
         if (x){
            c.title = x;
            var part1 = t.substring(0, (t.indexOf('x') - 1));
            var part2 = t.substring((t.indexOf('x')) + 1);
            sideA[idx] = part1.substring(0,(part1.indexOf('m')));
            sideB[idx] = part2.substring(0,(part2.indexOf('m')));
            var sqm = sideA[idx] * sideB[idx];
            var sqft = parseInt(sqm / 0.09290304); 
            c.innerHTML = t + " = " + sqm.toFixed(2) + "sqm/" + sqft + "sqft<BR>"; 
            if (i == (p.childNodes.length - 1)) { 
               var found = 0;
               for (var i=0;i<idx;i++) {
                  if ((sideA[idx] == sideA[i]) && sideB[idx] == sideB[i]) { found = 1; }
               }
               if (found == 1) {
                  c.innerHTML = c.innerHTML + "<HR><B><FONT COLOR=RED>" + totsqm.toFixed(2) + "sqm/" + parseInt(totsqm / 0.09290304) + "sqft</FONT></B><FONT SIZE=-4>(*) this space probably counted already</FONT><BR><HR>";
               }
               else {
                  totsqm = totsqm + sqm;
                  c.innerHTML = c.innerHTML + "<HR><B>" + totsqm.toFixed(2) + "sqm/" + parseInt(totsqm / 0.09290304) + "sqft</B><BR><HR>";
               }
            }
            idx++;
        }
     }
  }
  
}

	// run the script
        var sideA = new Array(document.childNodes.length - 1);
        var sideB = new Array(document.childNodes.length - 1);
	var totsqm = 0;
        var idx = 0;
	calcSqFt(document);

})();

