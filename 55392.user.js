 /* ########################################################## Statusbar - Uhr by MK204 ################################################################# */
// ==UserScript==
// @name          Statusbar - clock with day and date display
// @version       1.00
// ==/UserScript==

        function doDatUhr() {
        var days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        var months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        var title = content.document.title;
        window.setTimeout("try{doDatUhr()}catch(ex){}", 1000 );

        var D = new Date();
        var day = days[D.getDay()];
        var month = months[D.getMonth()];
        var year = D.getFullYear();
        var hour = D.getHours();
        var minute = D.getMinutes();
        var second = D.getSeconds();

        var date = day + " - " + (D.getDate() < 10 ? "0" +D.getDate() : D.getDate()) + ". " + month + " - " + year;
        var time = (hour < 10 ? "0" +hour : hour) + ":" + (minute < 10 ? "0" +minute : minute) + ":" + (second < 10 ? "0" +second : second);
        var timestr = date + " - " + time+ " Uhr"   ;
        var status = document.getElementById("statusbar-clock-display");
        status.setAttribute("value", timestr);}

        var ClockStatus = document.getElementById("statusbar-display");
        var ClockLabel = document.createElement("label");
        ClockLabel.setAttribute("id", "statusbar-clock-display");
        ClockLabel.setAttribute("class", "statusbarpanel-text");
        ClockLabel.setAttribute("style", "padding-top: 3px;");
        ClockStatus.parentNode.insertBefore(ClockLabel, ClockStatus.beforeSibling);
        doDatUhr();

 /* ############################################################ Statusbar - Uhr by MK 204 ############################################################### */