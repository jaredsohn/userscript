// ==UserScript==
// @name        Netflix My List Enabler
// @namespace   http://tvkdevelopment.com
// @include     http://*.netflix.com/*
// @version     2
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// ==/UserScript==

$(function() {
    // Add CSS styles
    addGlobalStyle(".myListButtons {\
        width:100%;\
        position:absolute;\
        bottom:0px;\
        background:rgba(0,0,0,0.8);\
        z-index:9999;\
        display:none;\
    }");
    addGlobalStyle(".agMovie:hover .myListButtons, .displayPagePlayable:hover .myListButtons {\
        display:block;\
    }");
    addGlobalStyle(".myListButtons a {\
        width:50%;\
        position:block;\
        text-align:center;\
        color:#a00;\
        font-size:13px;\
        padding:7px 0px;\
        float:left;\
    }");
    addGlobalStyle(".myListButtons a:hover, #displaypage-body .myListButtons a:hover {\
        color:#d00;\
        background-color:#000;\
        text-decoration:none;\
    }");
    addGlobalStyle(".myListButtons a:focus {\
        color:#400;\
    }");
    
    // Add buttons to each movie
    addMyListButtons();
    $(window).scroll(function() {
        console.log("-");
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
        console.log("UPDATE");
            addMyListButtons();
        }, 250));
    });
    
    //Add link to My List in main menu
    $("#global-header").append('<li class="nav-item">\
        <span class="i-b content"><a href="/MyList">My List</a></span>\
        <span class="i-b shim"></span>\
    </li>');
});

unsafeWindow.getMyListAddLink = function(movieid, authUrl) {
    return "/AddToQueue?movieid=" + movieid + 
            "&qtype=INSTANT" + 
            "&authURL=" + authUrl + 
            "&section=WATCHNOW";
}

unsafeWindow.getMyListDeleteLink = function(movieid, authUrl) {
    return "/QueueDelete?authURL=" + authUrl + 
            "&qtype=ED&movieid=" + movieid;
}

unsafeWindow.getAuthUrl = function() {
    var key = "authURL=";
    var url = $("#signout").children("a").attr("href");
    return url.substring(url.indexOf(key) + key.length);
}

unsafeWindow.addMyListButtons = function() {
    var authUrl = getAuthUrl();
    
    $(".agMovie, .displayPagePlayable").each(function() {
        var movie = $(this);
        if (movie.has(".myListButtons").length) {
            return;
        }
        
        var movieid;
        if (movie.find("[data-uitrack]").length) {
            var uitrack = movie.find("[data-uitrack]").attr("data-uitrack").split(",");
            movieid = uitrack[0];
        } else if (movie.find("[data-movieid]").length) {
            movieid = movie.find("[data-movieid]").attr("data-movieid");
        } else {
            return;
        }
        
        var addLink = getMyListAddLink(movieid, authUrl);
        var deleteLink = getMyListDeleteLink(movieid, authUrl);
        var myListButtons = '<div class="myListButtons">\
            <a href="' + addLink + '" \
                    onclick="$.ajax({type:\'get\',url:\'' + addLink + '\',});return false;">ADD</a>\
            <a href="' + deleteLink + '" \
                    onclick="$.ajax({type:\'get\',url:\'' + deleteLink + '\',});return false;">DELETE</a>\
        </div>';
        
        if (movie.has(".hoverPlay").length) {
            movie.children(".hoverPlay").append(myListButtons);
        } else {
            movie.append(myListButtons);
        }
    });
}

unsafeWindow.addGlobalStyle = function(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}








