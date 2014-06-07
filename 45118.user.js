// ==UserScript==
// @name        Today's Date Dock Badge for Fluid
// @namespace   http://fluidapp.com
// @description Displays today's month and day on a Fluid site-specific browser's dock icon, e.g. Google Calendar
// @include     *
// @author      Chase Covello <chase@anticypher.net>
// ==/UserScript==

(function () {
    updateDate();
    window.setInterval(updateDate, 60000);
})();

function updateDate() {
    if (window.fluid) {
        var months = new Array(13);
        months[1] = "Jan";
        months[2] = "Feb";
        months[3] = "Mar";
        months[4] = "Apr";
        months[5] = "May";
        months[6] = "Jun";
        months[7] = "Jul";
        months[8] = "Aug";
        months[9] = "Sep";
        months[10] = "Oct";
        months[11] = "Nov";
        months[12] = "Dec";
        
        var time = new Date();
        var month = months[time.getMonth() + 1];
        var date = time.getDate();
        
		window.fluid.dockBadge = month + " " + date;
    }
}