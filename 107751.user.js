// This custom userscript was written by Conrad Dean for Austin Hall
// The website was really clunky and awful to use, so I wanted to make it better!
// CSS injection adapted from this userscript: http://userscripts.org/scripts/show/105887
// Written by Alex35 (http://myjumbledweb.com/)
// ## Greasemonkey Metadata ###########################################
// ==UserScript==
// @name          Custom userscript for Austin!
// @namespace     http://www.conradpdean.com/
// @description   Custom page improvements by Conrad Dean for Austin Hall
// @include       http://cpdean.github.com/cbwork/*
// @include       http://manage.cheezburger.com/*
// @include       file://*
// @exclude       
// @version       1.9.b navigation animated. 
// @history       1.8.b navigation in place. (unstable)
// @history       1.0 Basic CSS modifications
// ==/UserScript==
// ####################################################################

/*

GM_log('Google Cleanup GreaseMonkey Script Loaded');

function log(msg,level) {
    if (typeof(GM_log) == "function")
    {
        GM_msg = '[Google Cleanup]: '+msg;
        
        if (level == 'info') {
            GM_log(GM_msg,0);
        }
        else if (level == 'warn') {
            GM_log(GM_msg,1);
        }
        else if (level == 'error' | level == 'exception') {
            GM_log(GM_msg,2);
        }
        if (typeof(level) == "string") {
            GM_log(level+' '+GM_msg);
        }
        else {GM_log(GM_msg);}
    }
    else if (typeof(console) == "object")
    {
        if (level == 'debug') {
            console.debug(msg);
        }
        else if (level == 'info') {
            console.info(msg);
        }
        else if (level == 'warn') {
            console.warn(msg);
        }
        else if (level == 'error') {
            console.error(msg);
        }
        else if (level == 'exception') {
            console.exception(msg);
        }
        else if (typeof(level) == "string") {
            console.log(level+': '+msg);
        }
        else {console.log(msg);}
    }
}
//*/

function getElementsByClassName(classname,node)
{    if (node == null) {node = document;}
    // use native implementation if available
    if (node.getElementsByClassName)
    {return node.getElementsByClassName(classname);}
    else
    {    return (  // Dustin Diaz method
        function getElementsByClass(searchClass,node)
        {    var classElements = [], // same as: new Array()
                els = node.getElementsByTagName("*"),
                pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
            for (i=0, j=0; i<els.length; i++)
            {
                if (pattern.test(els[i].className))
                {classElements[j] = els[i]; j++;}
            }
            return classElements;
        } )(classname,node);
    }
}

function addStyle(newStyle) {
    if (typeof(GM_addStyle) == "function") {
        GM_addStyle(newStyle); return;
    }
    var styleElement = document.getElementById('style_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'style_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

function nextElem(node) {
    return (node.nextSibling) ? ( (node.nextSibling.nodeType == 3) ? nextElem(node.nextSibling) : node.nextSibling ) : null;
}

function prevElem(node) {
    return (node.previousSibling) ? ( (node.previousSibling.nodeType == 3) ? prevElem(node.previousSibling) : node.previousSibling ) : null;
}

function firstSubElem(node) {
    return (node.firstChild) ? ( (node.firstChild.nodeType == 3) ? nextElem(node.firstChild) : node.firstChild ) : null;
}

// Example: change background to red


// Change 'schedule for front page' link to be huge and actually clickable
var schedule_for_front_page_links = "body div div#schedulerContent div.voteAsset.ui-helper-clearfix ul.votingPerformanceDetails li a" 
addStyle(
    schedule_for_front_page_links
    + "{"
    + "font-size: 3.5em;"
    + "display: inline-block;"
    + "background: #fe2;"
    + "padding: 2px;"
+ "}"
);

addStyle(
    schedule_for_front_page_links+":focus"
+ "{"
    + "border: 5px #f0f solid;"
+ "}"
);

//keyboard scrolly stuff
//I know that the target page imports jquery stuff, so I'm going to use it!
$(document).ready(function(){

//generate the scroll_map so you have an index of important items and their y positions
var element_map = [];

function add_to_map(n,i) {
    var pos = n.position().top;
    element_map.push({element:n,position:pos});
}

$(schedule_for_front_page_links).each(function(i){
    var n = $(this);
    add_to_map(n,i);
});

//if it feels slow every time you move up or down, rewrite
// get_next_element() to do its linear search through
// a forloop on element_map instead. Since all the positions are
// pre-computed, the for loop will probably be quicker than
// the jquery.each() stuff.

});

function get_next_element(next){
    // Divide list into two halves. 
    // You will bisect them at the current screen location.
    // take top half if you want prev, bottom half if you want next
    // top.end() if you want prev
    // bottom.first() if you want next

    var current_position = $(window).scrollTop();
    if(next){
        var everything = $(schedule_for_front_page_links);
        var l = everything.length;
        var bottom_half = everything.filter(function(){
            return $(this).position().top > current_position;
        });
        var h = bottom_half.length;
        return bottom_half.first();
    }
    else{  //previous
        var top_half = $(schedule_for_front_page_links).filter(function(){
            return $(this).position().top < current_position;
        });
        return top_half.last();
    }
};

function go_there(destination){
    /* //add extra slash to this line to toggle instant scroll or animated
    window.scroll(0,destination.position().top);
    /*/
    $("html,body").animate(
        { scrollTop:destination.position().top },
        {duration: 160}
    );
    //*/
}

$(document).keydown(function (eh){
    if(eh.which == 74){ //j
        var destination = get_next_element(true);
        go_there(destination);
        destination.focus();

    }
    else if(eh.which == 75){ //k
        var destination = get_next_element(false);
        go_there(destination);
        destination.focus();
    }

    else if(eh.which == 79){ //o
        //somehow open on background tab
    }

});
// have new getkey on O open it in a new background tab lolz
