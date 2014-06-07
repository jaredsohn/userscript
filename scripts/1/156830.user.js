// ==UserScript==
// @name            Reddit visited link remover
// @version         0.5
// @namespace       sxxe@gmx.de
// @description     hides links you already visited on reddit for a week
// @updateURL       https://userscripts.org/scripts/source/156830.meta.js
// @downloadURL     https://userscripts.org/scripts/source/156830.user.js
// @include         http://*reddit.com/*
// @exclude         http://www.reddit.com/r/*/comments/*
// @exclude         http://www.reddit.com/user/*
// @exclude         http://www.reddit.com/message/*
// @exclude         http://www.reddit.com/reddits/*
// @exclude         http://www.reddit.com/prefs/*

// ==/UserScript==

// Keyboard Shortcuts:
// 
// - h: Open first unread post
// - j: Mark first unread post as read (+minimize)
// - k: Open comments of first unread post
// - u: up vote first unread post
// - m: down vote first unread post
// 
// - shift + h: Open last read post
// - shift + k: Open comments of last read post
// - shift + u: up vote last read post
// - shift + m: down vote last read post
// 
// - f: highlight read posts


var cached_links_time = 60*60*24*2; // Two days - how long should visited links be saved
var cached_links_count = 1000; // Only save this amount of links (due to performance reasons)
var fade_time = 1000; // time it takes until the visited link is completely invisible
var show_footer = true; // show how many links are currently cached at the buttom of reddit.com
var toggle_links_button = true; // show button to show / hide links (hide_links has to be true)
var hide_links = true; // removes links completely (after the next page reload)
var add_manual_hide_link = true; // adds a link to the frontpage to manually hide posts 

// ----------------------------------------------------------

if (toggle_links_button && hide_links) {
    $("body").append ('<center><div id="show_links" class="show_links"><button>Toggle links</button></div> <br></center>');
}

if (add_manual_hide_link) {
    $('ul.flat-list.buttons').append('<li><a class="manHideLink" href="#">mark as read</a></li>');
}

var stateMachine;
window.addEventListener ("load", function () {
        //console.log("Ping");
        stateMachine = new GM_LinkTrack();

        if (show_footer) {
            var numLinks    = stateMachine.GetVisitedLinkCount();
            $("body").append ('<center><p>' + numLinks + ' links cached. (max '+ cached_links_count + ')</p><br></center>');
        }
    },
    false
);

var isBlinking = 0;
document.addEventListener("keypress", function(e) {
    
    if(!e) e=window.event;

    var isShift = e.shiftKey;

    var key = e.keyCode ? e.keyCode : e.which;

    if ( key == 102 ) { // f key

        if (isBlinking === 0) {
            isBlinking = 1;
            blinking($(".shrinked"));
        } else {
            isBlinking = 0;
            clearInterval(timer);
            $(".shrinked").css({'opacity': '0.4'});
        }

    } else if (key == 106) { // j key
        // shrink next unshrinked link
        stateMachine.LinkIsNewPub(getFirstUnreadLink());
    } else if (key == 104) { // h key
        // open next unshrinked link
        var elm = getFirstUnreadLink();
        stateMachine.LinkIsNewPub(elm);
        openLink(elm);
    } else if (key == 117) { // u key
        // up vote next unshrinked link
        upVote(getFirstUnreadLink());
    } else if (key == 109) { // m key
        // down vote next unshrinked link
        downVote(getFirstUnreadLink());
    } else if (key == 107) { // k key
        // open comments of next unshrinked link
        openLinkComments(getFirstUnreadLink());

    } else if ( (key == 72) && isShift ) { // shift + h key
        // open last shrinked link
        openLink(getPreviousUnreadLink());
    }else if ( (key == 85) && isShift ) { // shift + u key
        // up vote last shrinked link
        upVote(getPreviousUnreadLink());
    } else if ( (key == 77) && isShift ) { // shift + m key
        // down vote last shrinked link
        downVote(getPreviousUnreadLink());
    } else if ( (key == 75) && isShift ) { // shift + k key
        // open comments of last shrinked link
        openLinkComments(getPreviousUnreadLink());
    }

}, true);

function blinking(elm) {
    blink();
    timer = setInterval(blink, 1000);
    function blink() {
        elm.animate({opacity:0},300,"linear",function(){
            elm.animate({opacity:1},300);
        });
    }
}

function getFirstUnreadLink() {
    var currentElement;
    $('#siteTable a.title').each(function() {
        if ( ($(this).closest('div.thing').hasClass('shrinked') === false) && ($(this).closest('div.thing').is(":hidden") === false) )  {
            currentElement = $(this);
            return false;
        }
    });
    return currentElement;
}

function getPreviousUnreadLink() {
    var previousElement;
    $('#siteTable a.title').each(function() {
        if ( ($(this).closest('div.thing').hasClass('shrinked') === true) && ($(this).closest('div.thing').is(":hidden") === false) )  {
            previousElement = $(this);
        }
    });
    return previousElement;
}

function openLink(elm) {
    var href = elm.attr('href');
    //window.location = href;
    window.open(href, '_blank');
}

function openLinkComments(elm) {
    var href = elm.closest('div.thing').find("a.comments").attr('href');
    //window.location = href;
    window.open(href, '_blank');
}

function upVote(elm) {
    elm.closest('div.thing').find("div.up, div.upmod").click();
}

function downVote(elm) {
    elm.closest('div.thing').find("div.down, div.downmod").click();
}

function GM_LinkTrack () {
    var visitedLinkArry = [];
    var numVisitedLinks = 0;
    var link_count = 0;
    var current_timestamp = new Date().getTime();

    var sortedLocalStorage = SortLocalStorage();

    // Get visited link-list from storage.
    for (var J = sortedLocalStorage.length - 1;  J >= 0;  --J) {

        var item = sortedLocalStorage[J];

        var four_weeks = cached_links_time*1000;

        // Get saved links
        if (/^Visited_\d+.*/i.test (item) ) {
            
            var regex = /^Visited_(\d+).*/;
            var old_timestamp = regex.exec(item)[1];

            var regex2 = /^Visited_\d+_(.*)/;
            var value = regex2.exec(item)[1];

            var regex3 = /^(Visited_\d+)_.*/;
            var itemName = regex3.exec(item)[1];

            //console.log(numVisitedLinks + " " + item+ " t: " + old_timestamp + " v: " + value + " n: " + itemName);

            if (value == '#') {
                localStorage.removeItem (itemName);
                break;
            }

            if (link_count >= cached_links_count) {
                localStorage.removeItem (itemName);
                //console.log(numVisitedLinks + " " + value + "t: " + timeConverter(old_timestamp));
            }
            link_count++;

            // check link age
            if ( (current_timestamp - old_timestamp) < four_weeks ) {
                visitedLinkArry.push (value);
                numVisitedLinks++;

                //console.log(numVisitedLinks + " " + localStorage[itemName] + "t: " +old_timestamp[1]);

                if (hide_links) {
                    $('a[href="' + value + '"]').closest('div.thing').fadeOut(fade_time);
                } else {
                    //$('a[href="' + localStorage[itemName] + '"]').closest('div').fadeOut(fade_time);
                    shrinkLinks($('a[href="' + value + '"]'));
                }

            } else {
                // too old, remove from storage 
                localStorage.removeItem (itemName);
            }
        }
    }

    function SortLocalStorage() {

        var localStorageArray = [];

        if(localStorage.length > 0) {
            for (i=0; i<localStorage.length; i++){
                localStorageArray[i] = localStorage.key(i)+ "_" +localStorage.getItem(localStorage.key(i));
            }
        }

        return localStorageArray.sort();
    }

    function timeConverter(UNIX_timestamp) {
     var a = new Date(UNIX_timestamp*1000);
     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
         var year = a.getFullYear();
         var month = months[a.getMonth()];
         var date = a.getDate();
         var hour = a.getHours();
         var min = a.getMinutes();
         var sec = a.getSeconds();
         var time = date+','+month+' '+year+' '+hour+':'+min+':'+sec ;
         return time;
    }

    function ShowLinks () {
        for (var J = localStorage.length - 1;  J >= 0;  --J) {
            var itemName    = localStorage.key (J);
            //console.log("Ping");
       
            // Get saved links
            if (/^Visited_\d+$/i.test (itemName) ) {
                
                $('a[href="' + localStorage[itemName] + '"]').closest('div.thing').fadeToggle(fade_time);
            
            }
        }
    }

    this.LinkIsNewPub = function (linkObj) {
        LinkIsNew(linkObj);
    };

    function LinkIsNew (linkObj) {
        var href = linkObj.attr('href');

        if (visitedLinkArry.indexOf (href) == -1) {
            visitedLinkArry.push (href);
        
            var timestamp = new Date().getTime();

            var itemName    = 'Visited_' + timestamp;
            localStorage.setItem (itemName, href);
            numVisitedLinks++;
            
            // Hide links imideately after klicked. Makes it impossible to see commenst afterward.
            //$('a[href="' + href + '"]').closest('div').fadeOut(fade_time);

            shrinkLinks(linkObj);

            return true;
        } else {
            console.log(visitedLinkArry.indexOf (href));
        }
        return false;
    }

    function shrinkLinks (linkObj) {

        // Alter the look of clicked links imideately
        var mainLinkElement = linkObj.closest('div.thing');

        // Remove elements that are nor needed in the smll view
        mainLinkElement.find('p.tagline').remove();
        mainLinkElement.find('a.thumbnail').hide(fade_time, function () {
            $(this).remove();
        });
        mainLinkElement.find('span.domain').remove();
        mainLinkElement.find('div.expando-button').remove();

        mainLinkElement.find('li a.manHideLink').remove();


        // Realign elements for the small view
        var animObj = {"queue": false, "duration": fade_time};

        mainLinkElement.find('p.title').css({'float': 'left', 'font-size': '9px', 'margin-left': '10px', 'font-weight': 'normal', 'margin-top': '4px'});

        mainLinkElement.find('a.title').animate({'font-size': '9px'}, animObj);
        mainLinkElement.find('ul.flat-list.buttons').animate({'margin-left': '10px', 'font-size': '9px', 'margin-top': '3px'}, animObj);
        mainLinkElement.find('span.rank').animate({'margin-top': '1px', 'font-size': '10px'}, animObj);

        mainLinkElement.find('div.midcol').animate({'width': '90px'}, animObj);
        mainLinkElement.find('div.arrow').css({'float': 'left'});

        mainLinkElement.find('div.score').css({'float': 'left'});
        mainLinkElement.find('div.score').animate({'font-size': '10px', 'padding-left': '10px', 'padding-right': '10px', 'margin-top': '3px', 'width': '30px'}, animObj);

        mainLinkElement.css({'padding-left': '50px', 'opacity': '0.4', 'margin': '2px'});

        mainLinkElement.addClass('shrinked');

        return true;
    }
    
    this.GetVisitedLinkCount = function () {
        return numVisitedLinks;
    };
    
    $('a.title').click(function() {
        LinkIsNew($(this));
    });
    
    if (toggle_links_button && hide_links) {
        $('#show_links button').click (function() {
            ShowLinks();
        });
    }

    if (add_manual_hide_link) {
        $('a.manHideLink').click (function(event) {
            event.preventDefault();
            var $titleLink = $(this).closest('div.thing').find('a.title');

            LinkIsNew($titleLink);
        });
    }
}
