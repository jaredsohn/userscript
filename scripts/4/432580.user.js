// ==UserScript==
// @name        Google Button Fixer
// @namespace   googlebuttonfixer
// @match       https://www.google.tld/*
// @include     https://www.google.tld/*
// @exclude     https://www.google.tld/maps/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     2
// @grant       none
// @run-at      document-start
// ==/UserScript==
// Made with love for /r/Google
// Like the script? Support further development : 19X3FEyYtBF8CoDv1SyJ12UDqSvzfj95xH


// Prmitive settings menu. (Don't use an option twice)
// Options: web, images, maps, videos, news, books, apps, discussions
newMainLinks = ["web", "discussions", "images", "maps", "videos", "news"]
newMenu = ["books","apps"]

function changeLayout(){
    var url = window.location.href;
    var isPrimary = false;
    if(url.indexOf("tbm=") < 0)
        url += "&tbm=dsc"
    else{
        var urlArray = url.split("&")
        for (var i = 0; i < urlArray.length; i++) {
            if(urlArray[i].indexOf("tbm=dsc") >= 0)
                isPrimary = true;
            if(urlArray[i].indexOf("tbm=") >= 0)
                urlArray[i] = "tbm=dsc";
        };
        url = urlArray.join("&");
    }

    var discussionsLink = $('<a />', {
        "class": 'q qs',
        "text": 'Discussions',
        "href": url
    })

    var discussions = $('<div />', {
        "class": 'hdtb_mitem'
    }).append(discussionsLink);

    if(isPrimary)
        discussions.addClass("hdtb_msel")

    $("#hdtb_msb").append(discussions);

    var mainLinks = $("#hdtb_msb .hdtb_mitem").detach();
    var moreMenu = $("#hdtb_more").detach();
    var searchTools = $("#hdtb_tls").detach();

    placeLinks(newMainLinks, $("#hdtb_msb"), mainLinks);
    placeLinks(newMenu, $("#hdtb_more_mn"), mainLinks);
    $("#hdtb_msb").eq(0).css("margin-left", "130px");
    if(newMenu.length > 0)
        moreMenu.appendTo($("#hdtb_msb"));
    searchTools.appendTo($("#hdtb_msb"));
}

function placeLinks( linkArray, target, mainLinks){
 i = 0;

 while(linkArray.length > 0){
    var href = $("a", mainLinks.eq(i)).attr("href");
    var testParam = href;
    if(href === undefined)
        testParam = window.location.href;
    if(testParam.indexOf("tbm=isch") >= 0 && linkArray[0] === "images"){
        mainLinks.eq(i).appendTo(target);
        linkArray.splice(0, 1);
        i = 0;
    }
    else if(testParam.indexOf("tbm=vid") >= 0 && linkArray[0] === "videos"){
        mainLinks.eq(i).appendTo(target);
        linkArray.splice(0, 1);
        i = 0;
    }
    else if(testParam.indexOf("tbm=nws") >= 0 && linkArray[0] === "news"){
        mainLinks.eq(i).appendTo(target);
        linkArray.splice(0, 1);
        i = 0;
    }
    else if(testParam.indexOf("tbm=bks") >= 0 && linkArray[0] === "books"){
        mainLinks.eq(i).appendTo(target);
        linkArray.splice(0, 1);
        i = 0;
    }
    else if(testParam.indexOf("tbm=dsc") >= 0 && linkArray[0] === "discussions"){
        mainLinks.eq(i).appendTo(target);
        linkArray.splice(0, 1);
        i = 0;
    }
    else if(testParam.indexOf("maps.google") >= 0 && linkArray[0] === "maps"){
        mainLinks.eq(i).appendTo(target);
        linkArray.splice(0, 1);
        i = 0;
    }
    else if(testParam.indexOf("tbm=app") >= 0 && linkArray[0] === "apps"){
        mainLinks.eq(i).appendTo(target);
        linkArray.splice(0, 1);
        i = 0;
    }
    else if(linkArray[0] === "web") {
        mainLinks.eq(0).appendTo(target);
        linkArray.splice(0, 1);
        i = 0;
    }

    i++;
}
}

//do not run in frames or iframes
if(window.top == window.self) {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver
    if(MutationObserver) {
        var observerAll = new MutationObserver(function(mutations) {
            //#hdtb_msb is the container of all buttons
            if($('#hdtb_msb').length) {
                observerAll.disconnect();
                changeLayout();
            }
        });
        //wait until #hdtb_msb exists
        observerAll.observe(document, {
            attributes: true, 
            subtree: true
        });
    }
}