// ==UserScript==

// @name           Add Links to Groups

// @namespace      al2g@kwierso.com

// @include        http://*.roosterteeth.com/groups/*
// @include        http://roosterteeth.com/groups/*

// ==/UserScript==



(function() {

//setup some basic variables for everything

    var url = document.URL;

    var groupNum;

    var newLink = document.createElement("a");



//run on the group homepage, adding links for news AND forum

    if(url.search("profile.php") != -1) {

        var linksTable = document.getElementById("pageContent").getElementsByTagName("table")[0].getElementsByTagName("table")[0].getElementsByTagName("table")[0].getElementsByTagName("b")[0].parentNode.parentNode;

        groupNum = url.split("?id=")[1];

        

        newLink.innerHTML = "<b>Jump to Group News</b>";

        newLink.setAttribute("href", url.split("/profile")[0] + "/news/?id=" + groupNum);

        newLink.setAttribute("class", "small");

        linksTable.innerHTML += " &middot ";

        linksTable.appendChild(newLink);

        

        var newLink2 = newLink.cloneNode(false);

        

        newLink2.innerHTML = "<b>Jump to Group Forum</b>";

        newLink2.setAttribute("href", url.split("/profile")[0] + "/forum/?id=" + groupNum);

        newLink2.setAttribute("class", "small");

        linksTable.innerHTML += " &middot ";

        linksTable.appendChild(newLink2);

    }



//run on group news pages, adding a link for the forum

    if(url.search("news/") != -1) {

        var linksTable = document.getElementById("pageContent").getElementsByTagName("table")[0].getElementsByTagName("table")[0].getElementsByTagName("table")[0].getElementsByTagName("b")[0].parentNode.parentNode;

        groupNum = linksTable.getElementsByTagName("a")[0].href.split("?id=")[1];

        

        newLink.innerHTML = "<b>Jump to Group Forum</b>";

        newLink.setAttribute("href", url.split("/news")[0] + "/forum/?id=" + groupNum);

        newLink.setAttribute("class", "small");

        linksTable.innerHTML += " &middot ";

        linksTable.appendChild(newLink);

    }



//run on group forum pages, adding a link for the news

    if(url.search("forum/") != -1) {

        var linksTable = document.getElementById("Group Forum").parentNode.getElementsByTagName("table")[0].getElementsByTagName("b")[0].parentNode.parentNode;

        groupNum = linksTable.getElementsByTagName("a")[0].href.split("?id=")[1];

        var length = linksTable.getElementsByTagName("a").length;

        

        newLink.innerHTML = "<b>Jump to Group News</b>";

        newLink.setAttribute("href", url.split("/forum")[0] + "/news/?id=" + groupNum);

        newLink.setAttribute("class", "small");

        

        if(length == 2) {

            linksTable.insertBefore(newLink, linksTable.getElementsByTagName("a")[1]);

            linksTable.innerHTML += " &middot ";

            linksTable.appendChild(linksTable.getElementsByTagName("a")[1]);

        } else {

            linksTable.innerHTML += " &middot ";

            linksTable.appendChild(newLink);

        }

    }

})();