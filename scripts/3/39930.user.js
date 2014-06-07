// ==UserScript==
// @name           Add to UserInfo
// @namespace      a2ui@kwierso.com
// @description    Adds additional links to the userInfo section of RT.
// @include        http://*.roosterteeth.com/*
// @include        https://*.roosterteeth.com/*
// ==/UserScript==

GM_registerMenuCommand( "Toggle RT Sponsor Pref", toggleSpons);

(function () {
    try {
        var lng = 11;
        if (!GM_getValue("roosterteeth.sponsor", false)) {
            lng = 7;
        }
        var userInfo = document.getElementById("userInfo");
        userInfo = userInfo.firstChild.firstChild.firstChild;
        var userLinks = userInfo.getElementsByTagName('a');
        var length = userLinks.length - 6;
        var l0 = userLinks[0];
        var newNames = new Array( l0.innerHTML, "Sign Out", "Comments", "Log", 
            "Journal", "Messages", "Settings", "My Stats", "Mod History", 
            "Friend Journals", "Sponsor");
        if(document.domain == "ah.roosterteeth.com")
            newNames[7] = "Stats";
        var newLinks = new Array( "/members/", "/members/signout.php", 
            "/members/comments/", "/members/log.php", "/members/journal", 
            "/members/messaging/", "/members/settings/", "/members/stats/myStats.php", 
            "/members/modHistory.php", "/members/journal/friendsJournals.php", 
            "/sponsRedir.php");
        var td = "";
        if(length != 0)
        td += "<a class='userInfo' style='opacity: 0.5;' " +
              "href='/members/'>You have new alerts</a>&nbsp;&middot;&nbsp;";
        for(i = 0; i < lng; i++)
        {
            if(i == 2 || i == 7)
                td += "<br\>";
            else
                if(i != 0)
                    td += "&nbsp;&middot;&nbsp;";
                if(i == 7)
                    td += "<img " +
                          "src='/assets/images/subscriberStarSmallTrans.png'" +
                          " style='float: none;'>&nbsp;";
                td += "<a href=" + newLinks[i] + " class=userInfo>" + 
                        newNames[i] + "</a>";
        }
        if(lng==7)
            td += "<br\>" +
                    "<img src='/assets/images/subscriberStarSmallTrans.png' " +
                    "style='float: none;'>&nbsp;<a href=" + newLinks[10] +
                    " class=userInfo>" + newNames[10] + "</a>";
        userInfo.innerHTML = td;
    } 
    catch(e) {
    //    gRTSE.sendReport(e);
        console.log(e);
    }
})();

function toggleSpons() {
    var spons = GM_getValue("roosterteeth.sponsor");

    if(spons == undefined || spons == false)
    {
        GM_setValue("roosterteeth.sponsor", true);
    }
    else
    {
        GM_setValue("roosterteeth.sponsor", false);
    }
    spons = GM_getValue("roosterteeth.sponsor");
    alert("Sponsor Preference Now Set To: " + spons);
}