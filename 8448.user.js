// Super Kiwi Cloak

// Based on Gina Trapani's Invisibility Cloak

// Modified by Lucy Pigpuppet and Jeremy Freese

// 2007-01-10

// Released to the public domain.
// Modified by Devan Bennett
// 2007-04-11

//

// ==UserScript==

// @name          Super Kiwi Cloak

// @description   Makes specified pages invisible except for specific period at the start of each hour.

// @include       http://*.youtube.com/

// @include       http://mail.google.com/*

// @include       http://www.blogger.com/*

// @include       http://www.bloglines.com/

// @include       http://*.blogspot.com/

// ==/UserScript==

//

// ==RevisionHistory==

// Version 0.1:

// Released: 2006-01-03.

// (Invisibility Cloak) Initial release.
//
// Version 0.2:
// Released: 2006-01-18.
// (Invisibility Cloak) Includes option to not apply cloak on the weekends.
//
// Version 0.3:
// Released: 2007-01-07.
// (Kiwi Cloak) Change of Invisibility Cloak to allow surfing for limited window each hour.
//
// Version 0.4:
// Released: 2007-01-11
// (Kiwi Cloak) More elegant code courtesy of Ed Oskiewicz
//
// Version 0.5:
// Modified Super Kiwi Cloak to allow surfing across the :00 mark (i.e., :55 to :05).  
// Also, will now display correct "minutes left".
//
// Version 0.5.1:
// Corrected sign errors
//
// ==/RevisionHistory==



(function () {
       // EDIT THE NEXT LINES TO SET THE NUMBER OF MINUTES TO BE ALLOWED TO SURF
       var surf_time_begin = 55;
       var surf_time_end = 5;
       // EDIT THESE TWO LINES TO SET THE DAILY WINDOW - USE 24 HOUR TIME (0 & 25 FOR ALWAYS ON)
       var day_begin = 9;
       var day_end = 17;
       // TAKE OFF CLOAK ON WEEKENDS? (true = yes, false = no)
       var cloak_off_weekends = true;
       // END EDIT

       var tstamp = new Date();
       var its_the_weekend = false;
//IF YOUR "WEEKEND" IS NOT SATURDAY AND SUNDAY, EDIT THE FOLLOWING LINE (Sun=0, Mon=1, etc.)
       if (tstamp.getDay() == 6 || tstamp.getDay() == 0)
       {
               its_the_weekend = true;
       }

       if (its_the_weekend == false || cloak_off_weekends == false) {
               
	       var mins = tstamp.getMinutes();
               var hrs = tstamp.getHours();
               if (((surf_time_begin < surf_time_end && (mins < surf_time_begin || mins > surf_time_end)) ||  (mins < surf_time_begin && mins > surf_time_end)) && ((day_begin > day_end && (hrs >= day_begin || hrs < day_end)) || (hrs >= day_begin && hrs < day_end))) {
                       if (surf_time_begin <= mins) {                    
                              var readable_time = 60 + surf_time_begin - mins;
                       }
                       else {
                              var readable_time = surf_time_begin - mins;
                       }
                       var b = (document.getElementsByTagName("body")[0]);
                       b.setAttribute('style', 'display:none!important');
                       alert("You know you are supposed to wait for "+ readable_time + " more minutes!");
               }
       }
})();