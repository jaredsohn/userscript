// ==UserScript==
// @name           AddExtraTab
// @namespace      addextratab@kwierso.com
// @description    Adds a tab to Roosterteeth
// @include        http://*.roosterteeth.com/*
// @include        http://roosterteeth.com/*
// @include        http://redvsblue.com/*
// @include        http://strangerhood.com/*
// @include        http://achievementhunter.com/*
// @include        http://roosterteethcomics.com/*
// ==/UserScript==

(function()
{
    //title for new tab's header
    var tabtitle = "<img width='10' height='6' src='http://images.roosterteeth.com/assets/style/flashy/bits/navArrow.png'/>";
    //link for tab's header
    var titlelink = "/members/";

    //tab dropdown entries
        //use relative links to stay with this subdomain! (prevents the switching of your theme)
        //external links work as well!
    var item0 = "Groups";
    var item0link = "/members/groups.php";
    var item1 = "Comments";
    var item1link = "/members/comments/";
    var item2 = "Log";
    var item2link = "/members/log.php";
    var item3 = "Journal";
    var item3link = "/members/journal/";
    var item4 = "Messages";
    var item4link = "/members/messaging/";
    var item5 = "Images";
    var item5link = "/members/images/";

    //DON'T TOUCH ANYTHING BELOW THIS LINE!!!
    //--------------------------------------------------------------------------------------------------------------------------//

    //cuts off the end of the list of tabs, allowing us to directly insert  our new tab
    var tabs = document.getElementById("searchTd").parentNode.getElementsByTagName("td")[0].getElementsByTagName("td")[0];

    var arr = tabs.innerHTML.split("");
    var idx = tabs.innerHTML.length-5;
    arr.splice(idx,5);
    tabs.innerHTML = arr.join("");

    //remove the "href="+titlelink+" portion if you wish for the tab header to do nothing.
    tabs.innerHTML += "<div class='navDivTop' style='pading-right: 0pt;'><a class='navbutton' id='navButton8' href="+titlelink+" onmouseover='navShow(\"8\");' onmouseout='mclosetime();'>"+tabtitle+"</a>"+
            "<div id='navDiv8' class='navDiv' style='top: 15px; visibility: hidden;'>"+
            "<div style='z-index:999;'>"+

            //here's where we put our dropdown items into the tab
                //if you really want more items, just add variables up above named as "item4" and "item4link", 
                //and then copy/paste one of the following lines, changing the digits to match your new dropdown item
            "<a class='navHovLink' href="+item0link+">"+item0+"</a>"+
            "<a class='navHovLink' href="+item1link+">"+item1+"</a>"+
            "<a class='navHovLink' href="+item2link+">"+item2+"</a>"+
            "<a class='navHovLink' href="+item3link+">"+item3+"</a>"+
            "<a class='navHovLink' href="+item4link+">"+item4+"</a>"+
            "<a class='navHovLink' href="+item5link+">"+item5+"</a>"+

            "</div>"+
            "</div>"+
            "</div>";
}
)();