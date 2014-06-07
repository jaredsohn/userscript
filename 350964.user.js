// ==UserScript==
//
//Displayable Name of your script 
// @name           Better Cam4 
//
// brief description
// @description    Tweaks to lots of stuff.
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://userscripts.com/mh666/
//
// Your name, userscript userid link (optional)   
// @author         mh666
//
// If you want to license out
// @license        MIT (http://opensource.org/licenses/MIT) 
//
//Version Number
// @version        1.3
//
// Urls process this user script on
// @include        http://www.cam4.com/*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
// @require http://code.jquery.com/jquery-1.11.0.min.js
//
// @history        1.0 first version
// @history        1.0b first beta version, who knew!!
//
// ==/UserScript==
function doIt() {
    console.log("here!");
    
    $(document).ready(function() {
        var $dragging = null;
        var $startX, $startY;
        
        $(document.body).on("mousemove", function(e) {
            if ($dragging) {
                $dragging.offset({
                    top: e.pageY - $offsetY,
                    left: e.pageX - $offsetX
                });
                e.stopPropagation();
            }
        });
        
        
        $(document.body).on("mousedown", "div", function (e) {
            if (e.target.className.indexOf('draggable') > -1) {
                $dragging = $(e.target);
                $offsetX = e.offsetX;
                $offsetY = e.offsetY;
                e.stopPropagation();
            }
        });
        
        $(document.body).on("mouseup", function (e) {
            $dragging = null;
        });
    });
    
    //And of course your code!!
    function getById(name) {
        var el = document.getElementById(name);
        return el ? el.style : {};
    }
    
    getById("topHeader").display = "none";
    getById("pageTitle").display = "none";
    getById("right-content").display = "none";
    getById("C4Logo").height = "18px";
    getById("headerBanner").height = "18px";
    getById("headerBanner").minHeight = "18px";
    getById("myAccount").height = "18px";
    getById("optionLinks").float = "right";
    getById("main-content").width = "80%";
    
    function httpGet(theUrl) {
        var xmlHttp = null;
        
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false );
        xmlHttp.send( null );
        console.log("loaded " + theUrl);
        return xmlHttp.responseText;
    }
    
    var nextZ = 100;
    function fixProfileLinks(profile) {
        var link = profile.getElementsByTagName("A")[0];
        var name = link.href.replace(/.*\//, "");
        link.href = "javascript:void(0);";
        $(link).click(function(e) {
            var iframeDiv = $("<div class='cam-holder draggable' style='background: white; align: center; border: 1px solid black; padding: 5px;'><b><a href='/" + name + "' target='_blank'>" + name + "</a></b>&nbsp;&nbsp;&nbsp;&nbsp;<a class='close' href='javascript:void(0)'>close</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class='resize' href='javascript:void(0)'>resize</a><br/><iframe src='http://199.59.88.95:8888/" + name + "' width=320 height=230></iframe></div>")[0];
            iframeDiv.style.position = 'fixed';
            iframeDiv.style.left = e.clientX + "px";
            iframeDiv.style.top = e.clientY + "px";
            $(iframeDiv).click(function(e1) {
                iframeDiv.style.zIndex = nextZ++;
            });
            var close = iframeDiv.getElementsByClassName("close")[0];
            $(close).click(function(e1) {
                document.body.removeChild(iframeDiv);
            });
            var iframe = iframeDiv.getElementsByTagName('iframe')[0];
            var resize = iframeDiv.getElementsByClassName("resize")[0];
            $(resize).click(function(e1) {
                var width = parseInt(iframe.width);
                var height = parseInt(iframe.height);
                if (e1.altKey || width < 250) {
                    iframe.width = (width * 2) + 'px';
                    iframe.height = (height * 2) + 'px';
                } else {
                    iframe.width = (width / 2) + 'px';
                    iframe.height = (height / 2) + 'px';
                }
            });
            document.body.appendChild(iframeDiv);
            /*            $('#draggable').draggable({
                stop: function(event, ui) {
                    console.log("stop!");
                }
            }); */
            e.stopPropagation();
        });
    }
    
    var profiles = document.getElementsByClassName("profileBox");
    for (var i = 0; i < profiles.length; i++) {
        var profile = profiles[i];
        fixProfileLinks(profile);
    }
    
    if (document.getElementById("directoryDiv")) document.body.style.minWidth = "auto";
    
    function doLoad(startPage) {
        var maxPage = 10;
        var match = document.location.toString().match(/^http:\/\/.*\.cam4\.com\/(male|party)$/);
        if (match) {
            var type = match[1];
            var page = startPage;
            var loadNext = function() {
                var two = httpGet("http://www.cam4.com/" + type + "/" + page);
                var div = document.createElement("div");
                div.innerHTML = two;
                var target = document.getElementById("directoryDiv");
                var profiles = div.getElementsByClassName("profileBox");
                for (var i = 0; i < profiles.length; i++) {
                    var profile = profiles[i];
                    profile.parentNode.removeChild(profile);
                    target.appendChild(profile);
                    fixProfileLinks(profile);
                }
                page++;
                if (page < maxPage) {
                    setTimeout(loadNext, 100);
                } else {
                    var more = $("<a href='void(0)'>Load More...</a>");
                    more.click(function() {
                        loadNext(page);
                    });
                    target.appendChild(more[0]);
                }
            };
            setTimeout(loadNext, 100);
        }
    };
    doLoad(2);
    
    
    var camView = document.getElementById("camPaneBig");
    var broadcastView = document.location.pathname.indexOf("broadcast") != -1;
    if (camView) {
        document.getElementById("header").style.display = "none";
        document.getElementById("directoryTabs").style.display = "none";
        document.getElementById("camPaneBig").parentNode.style.margin = "";
    //  document.getElementById("content").style.top = "-31px";
        
        var profileHeader = document.getElementsByClassName("newProfileHeader")[0];
        var newSpot = profileHeader.parentNode.parentNode;
        profileHeader.parentNode.removeChild(profileHeader);
        newSpot.appendChild(profileHeader);
        
        var miniBio = document.getElementsByClassName("miniBio")[0];
        miniBio.parentElement.removeChild(miniBio);
        var leftCol = document.getElementsByClassName("leftCol")[0];
        leftCol.insertBefore(miniBio, leftCol.firstChild);
        
        var bio = document.getElementsByClassName("bio")[0].innerText.replace(/: */g, "</b>: ").replace(/\n/g, " - <b>");
        var h1 = document.getElementsByTagName("h1")[0];
        h1.parentNode.innerHTML = "<b>" + h1.innerText + "</b> - " + bio;
    }
    
    var cam4Logo = $("#C4Logo").attr("style", "height:30px; overflow: hidden;");
    
    var favsButton = $("<li><a><span>Favorites</span></a></li>");
    var fav2Button = $("<li><a><span>Favoritez</span></a></li>");
    var refreshButton = $("<li><a><span>Refresh</span></a></li>");
    if (!camView && !broadcastView) {
        document.querySelector("#header .optionLinks ul").appendChild(fav2Button[0]);
        document.querySelector("#header .optionLinks ul").appendChild(refreshButton[0]);
        
        var searchLine = $("<li></li>");
        var searchInput = document.createElement("input");
        searchInput.id = 'quickSearch';
        searchInput.style.position = 'absolute';
        searchInput.style.left = '600px';
        searchInput.style.top = '10px';
        searchInput.style.zIndex = '100';
        document.body.insertBefore(searchInput, document.body.firstChild);
        searchLine.insertBefore($("li.right.search"));
        
        document.addEventListener("keypress", function(event) {
            if (String.fromCharCode(event.keyCode) == '/') {
                searchInput.focus();
                searchInput.value = 'sf|cali|francisco|bay|ff|fist|huge|big|hu?ng|massive|monster|[0-9](\.5)?(:|in|cm)|party|pnp|cloud|tina|smoke';
                event.preventDefault();
            }
        }, true);
    }
    function doSearch(e) {
        var q = searchInput.value;
        var re = new RegExp(q);
        $(".profileBox").each(function(i, box) {
            if (q == '' || $(box).text().toLowerCase().match(re)) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    }
    $("#quickSearch").keyup(doSearch);
    $("#quickSearch").dblclick(function(e) {
        searchInput.value = 'sf|cali|francisco|bay|ff|fist|huge|big|hu?ng|massive|monster|[0-9](\.5)?(:|in|cm)|party|pnp|cloud|tina|smoke';
        doSearch();
    });

    
    refreshButton.click(function() {
        document.getElementById('directoryDiv').innerHTML = '';
        doLoad(1);
    });
    
    fav2Button.click(function() {
        var keepGoing = true;
        var dir = $("#directoryDiv");
        dir[0].innerHTML = "<div id='online'><h3>Online</h3></div><button id='show-all'>Show all</button><div id='offline' style='display: none;'><h3>Offline</h3></div>";
        
        var onlineDiv = $('div#online');
        var offlineDiv = $('div#offline');
        var showAllButton = $('#show-all');
        showAllButton.click(function() { $(offlineDiv).attr("style", ""); });
        
        var offset = 0;
        function loadFavs() {
            $('#show-all').text("Loading " + offset + "...");
            $.ajax("http://www.cam4.com/profile/favoritesForGolds?_=" + new Date().getTime()
                   + "&favorites.offset=" + offset + "&broadcaster==", {
                       success: function(data) {
                           var favs = data;
                           var div = document.createElement("div");
                           //      favs = favs.replace(/50x37\//g, '');
                           div.innerHTML = favs;
                           var totalThisTime = 0;
                           $(".profileBox", div).each(function() {
                               $(this).attr("style", "float: left"); // remove width
                               onlineDiv[0].appendChild(this);
                               fixProfileLinks(this);
                               totalThisTime++;
                           });
                           offset += totalThisTime;
                           keepGoing = totalThisTime > 0;
                           if (offset > 1000) {
                               keepGoing = false;
                               $('#show-all').text("Show All");
                           }
                           if (keepGoing) setTimeout(loadFavs, 100);
                       }
                   });
        }
        setTimeout(loadFavs, 100);
    });
    
    
    favsButton.click(function() {
        var keepGoing = true;
        var dir = $("#directoryDiv");
        dir[0].innerHTML = "<div id='online'><h3>Online</h3></div><button id='show-all'>Show all</button><div id='offline' style='display: none;'><h3>Offline</h3></div>";
        
        var onlineDiv = $('div#online');
        var offlineDiv = $('div#offline');
        var showAllButton = $('#show-all');
        showAllButton.click(function() { $(offlineDiv).attr("style", ""); });
        
        var offset = 0;
        function loadFavs() {
            $('#show-all').text("Loading " + offset + "...");
            $.ajax("http://www.cam4.com/muscleypunk/edit/friends_favorites?friends.offset=0&favorites.offset=" + offset, {
                success: function(data) {
                    var favs = data;
                    var div = document.createElement("div");
                    //      favs = favs.replace(/50x37\//g, '');
                    div.innerHTML = favs;
                    var totalThisTime = 0;
                    $("#favorites div.ff_thumb", div).each(function() {
                        $(this).attr("style", "float: left"); // remove width
                        
                        if ($("div.online", this).length == 1) {
                            var img = $("img", this);
                            $(img).attr("width", $(img).attr("width") * 2);
                            $(img).attr("height", $(img).attr("height") * 2);
                            //          $(img).attr("src", $(img).attr("src").replace(/50x37\//g, '200x150/'));
                            onlineDiv[0].appendChild(this);
                        } else {
                            //          offlineDiv[0].appendChild(this);
                        }
                        totalThisTime++;
                    });
                    offset += totalThisTime;
                    keepGoing = totalThisTime > 0;
                    keepGoing = (totalThisTime > 0) && ($(".rightNavLinks .ffButton:contains(Next)", div).length > 0);
                    if (offset > 1000) {
                        keepGoing = false;
                        $('#show-all').text("Show All");
                    }
                    if (keepGoing) setTimeout(loadFavs, 100);
                }
            });
        }
        setTimeout(loadFavs, 100);
    });
}

doIt();
