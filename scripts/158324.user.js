// ==UserScript==
// @name ETI - SIG
// @namespace e
// @description Adds links from Soitgoes to Menu Bar
// @require http://code.jquery.com/jquery-1.9.0.min.js
// @include http://endoftheinter.net/*
// @include http://*.endoftheinter.net/*
// @include https://endoftheinter.net/*
// @include https://*.endoftheinter.net/*
// ==/UserScript==

//$('body').append("Testing");

var pathname = $(location).attr('href');
//alert(pathname);
var home = "<a href=\"//endoftheinter.net/main.php\">Home</a>";
var archives = "<a href=\"//boards.endoftheinter.net/topics/Archived\">Archives</a>";
var addalink = "<a href=\"//links.endoftheinter.net/add.php\">Add a link</a>";
var random = "<a href=\"//links.endoftheinter.net/linkme.php?l=random\">Random Link</a>";
var toprated = "<a href=\"//links.endoftheinter.net/links.php?mode=top\">Top rated links</a>";
var topweek = "<a href=\"//links.endoftheinter.net/links.php?mode=topweek\">Links of the week</a>";
var alllinks = "<a href=\"//links.endoftheinter.net/links.php?mode=all\">All links</a>";
var newlinks = "<a href=\"//links.endoftheinter.net/links.php\">New Links</a>";

var boards = "<a href=\"//boards.endoftheinter.net/topics/LUE\">Boards</a>";
var wiki = "<a href=\"//wiki.endoftheinter.net/index.php/Main_Page\">Wiki</a>";

var stats = "<a href=\"//endoftheinter.net/stats.php\">Stats</a>";
var userlist = "<a href=\"//endoftheinter.net/userlist.php\">User List</a>";
var help = "<a href=\"//wiki.endoftheinter.net/index.php/Help:Rules\">Help</a>";
var logout = "<a href=\"//endoftheinter.net/logout.php\">Logout</a>";

var menubarHtml = "<div class=\"menubar\">" + home + " | " + archives + " | " + random + " | " + toprated + " | " + topweek + " | " + newlinks + "<br />" + wiki + " | " + alllinks + " | " + boards + " | " + userlist + " | " + logout + " | " + help;
   
if (pathname.match(/endoftheinter.net\/links.php/i)) {
    // Links Page
    $("title").html("End of the Internet - Links");
    $("body").removeAttr("style");
    var style = "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://static.endoftheinter.net/style/nblue.css?22\" /><script type=\"text/javascript\" src=\"http://static.endoftheinter.net/base.js?40\"></script>";
    $("body").html(style + menubarHtml + "</div>");
    if (pathname.match(/top/i)) {
        if (pathname.match(/topweek/i)) {
            // Links of the Week
            var title = "<h1>Links of the Week</h1>";
            $("body").append(title);
            
        } else {
            // Top Rated Links
            var title = "<h1>Top Rated Links</h1>";
            $("body").append(title);
        } 
    } else if (pathname.match(/all/i)) {
        // All Links
        var title = "<h1>All Links</h1>";
        $("body").append(title);
        $("body").append("<table class=\"grid\"></table>");
        $(".grid").append("<tr><th>Title</th><th>Upload Time</th></tr>");
        var retobj = 0;
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://soitgo.es/main.php",
            onload: function(data) {
                
                var htmlString = data.response;
                var headStartIndex = htmlString.toLowerCase().indexOf("<head>") + "<head>".length;
                var headEndIndex = htmlString.toLowerCase().indexOf("</head>");
                var newHead = htmlString.substring(headStartIndex, headEndIndex);
            
                var bodyStartIndex = htmlString.toLowerCase().indexOf("<div class=\"header\">") + "<body>".length;
                var bodyEndIndex = htmlString.toLowerCase().indexOf("</body>");
                var newBody = htmlString.substring(bodyStartIndex, bodyEndIndex);
                newBody = "<div c" + newBody;
                
                $(".block-head", $(newBody)).each(function(i) {
                    //console.log("%o", $(this));
                    if(i > 1) {
                        var uptime = $("h5", $(this)).html();
                        //var href = "//soitgo.es/" + $(".p-title", $(this)).attr('href');
                        var adult = $(".c-adult", $(this)).html();
                        var child = $(".c-child", $(this)).html();
                        var myRe = new RegExp("[0-9]+");
                        var href = myRe.exec($(".p-title", $(this)).attr('href'));
                        $(".grid").append("<tr><td><a href=\"//links.endoftheinter.net/linkme.php?l=" + href +"\">[" + adult + "] [" + child + "] " + $(".p-title", $(this)).text() + "</a></td><td>" + uptime + "</td></tr>");
                    }
                    
                    
                });
            }
        });
        
    } else {
        // New Links
        var title = "<h1>New Links</h1>";
        $("body").append(title);
    }
} else if (pathname.match(/endoftheinter.net\/linkme.php/i)) {
    //linkme page 
    
    $("body").removeAttr("style");
    var style = "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://static.endoftheinter.net/style/nblue.css?22\" /><script type=\"text/javascript\" src=\"http://static.endoftheinter.net/base.js?40\"></script>";
    $("body").html(style + menubarHtml + "</div>");
    var myRe = new RegExp("[0-9]+");
    var href = myRe.exec(pathname);
    var url = "http://soitgo.es/link.php?linkid=" + href;
    //alert(href);
    GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(data) {
                
                var htmlString = data.response;
                var headStartIndex = htmlString.toLowerCase().indexOf("<head>") + "<head>".length;
                var headEndIndex = htmlString.toLowerCase().indexOf("</head>");
                var newHead = htmlString.substring(headStartIndex, headEndIndex);
            
                var bodyStartIndex = htmlString.toLowerCase().indexOf("<div class=\"header\">") + "<body>".length;
                var bodyEndIndex = htmlString.toLowerCase().indexOf("</body>");
                var newBody2 = htmlString.substring(bodyStartIndex, bodyEndIndex);
                newBody2 = "<div c" + newBody2;
                
                /*$(".block-head", $(newBody)).each(function(i) {
                    //console.log("%o", $(this));
                    if(i > 1) {
                        var uptime = $("h5", $(this)).html();
                        //var href = "//soitgo.es/" + $(".p-title", $(this)).attr('href');
                        var myRe = new RegExp("[0-9]+");
                        var href = myRe.exec($(".p-title", $(this)).attr('href'));
                        $(".grid").append("<tr><td><a href=\"//links.endoftheinter.net/linkme.php?l=" + href +"\">" + $(".p-title", $(this)).text() + "</a></td><td>" + uptime + "</td></tr>");
                    }
                    
                    
                });
                */
                
                //console.log("%s", $(newBody2).html());
                var linkTitle = $(".p-title", $(newBody2)).html();
                var adult = "";
                var child = "";
                var user = "";
                var links = [];
                $("title").html("End of the Internet - " + linkTitle);
                $("a", $(newBody2)).each(function(i) {
                    if (i == 35) {
                        adult = $(this).html();
                    } else if (i == 36 ) {
                        child = $(this).html();
                    } else if (i == 39 ) {
                     	user = $(this).html();   
                    }
                    
                    if ($(this).html().match(/mega.co.nz/)) {
                     	links.push($(this).html());
                    }
                    
                    //console.log("%i %s", i, $(this).html());
                });
                var description = $("pre", $(newBody2)).html();
                var date = $("h5", $(newBody2)).html();
                console.log("%s %s %s %o", adult, child, user, links);
                var title = "[" + adult + "] [" + child + "] " + linkTitle;
                $("body").append("<h1>" + title + "</h1>");
                $("body").append("<b>Added by:</b> " + user + "<br />");
                $("body").append("<b>Date:</b> " + date + "<br />");
                $("body").append("<b>Categories:</b> " + adult + ", " + child + "<br />");
                $("body").append("<b>Links:</b><br />");
                var length = links.length, element = null;
                for (var i = 0; i < length; i++) {
                	element = links[i];
                	// Do something with element i.
                	$("body").append("<a href=\"" + element + "\">" + element + "</a><br />");
                }
            }
        });

} else {
    // Not on Links Page
    var menubarHtml = menubarHtml + "<br /><div id=\"bookmarks\">" + $("#bookmarks").html() + "</div>";
    $(".menubar").html(menubarHtml);
}
