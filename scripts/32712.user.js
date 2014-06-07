// ==UserScript==
// @name           SA Places
// @namespace      something_awful
// @description    Adds a more convenient "Places" box to go to SA subforums
// @include        http://forums.somethingawful.com/*
// ==/UserScript==

function create_styles()
{
    document.styleSheets[0].insertRule(
         "div.places_wrapper {"
            +"margin:.5em 0 0 1em;"
            +"position:relative;"
         +"}",0);
    document.styleSheets[0].insertRule(
         "a.places_link {"
            +"font-weight:bold;"
            +"text-decoration:underline;"
            +"cursor:pointer;"
         +"}",0);
    document.styleSheets[0].insertRule(
         "div.places {"
            +"position:absolute;"
            +"display:none;"
            +"background-color:#F1F1F1;"
            +"border:1px solid black;"
            +"padding:.5em;"
            +"-moz-column-count:2;"
            +"z-index:2;"
            +"font-weight:normal;"
         +"}",0);
    document.styleSheets[0].insertRule(
         "div.places_top {"
            +"top:1em;"
         +"}",0);
    document.styleSheets[0].insertRule(
         "div.places_bottom {"
            +"bottom:1em;"
         +"}",0);
    document.styleSheets[0].insertRule(
         "div.places ul {"
            +"margin:0;"
            +"padding:0;"
            +"list-style-type:none;"
         +"}",0);
    document.styleSheets[0].insertRule(
         "div.places ul h1 {"
            +"margin:0 0 0 0;"
            +"font-size:1em;"
            +"font-weight:bold;"
            +"border-bottom:1px solid black;"
            +"display:block;"
         +"}",0);
    document.styleSheets[0].insertRule(
         "div.places ul ul {"
            +"margin:0 0 .5em 0;"
            +"padding-left:1em;"
            +"list-style-type:none;"
         +"}",0);
}

function forum_list()
{
    return '<ul>'
        +'<li><h1>Main</h1><ul>'
            +'<li><a href="forumdisplay.php?forumid=1">General Bullshit</a></li>'
            +'<li><a href="forumdisplay.php?forumid=26">FYAD</a></li>'
            +'<li><a href="forumdisplay.php?forumid=208">BYOB</a></li>'
        +'</ul></li>'
        +'<li><h1>Discussion</h1><ul>'
            +'<li><a href="forumdisplay.php?forumid=44">Games</a></li>'
            +'<li><a href="forumdisplay.php?forumid=158">Ask / Tell</a></li>'
            +'<li><a href="forumdisplay.php?forumid=46">Debate &amp; Discussion</a></li>'
            +'<li><a href="forumdisplay.php?forumid=22">Serious Hardware / Software Crap</a></li>'
            +'<li><a href="forumdisplay.php?forumid=122">Sports Argument Stadium</a></li>'
            +'<li><a href="forumdisplay.php?forumid=179">Watch and Weight</a></li>'
            +'<li><a href="forumdisplay.php?forumid=161">Goons With Spoons</a></li>'
            +'<li><a href="forumdisplay.php?forumid=167">Post Your Favorite (or Request)</a></li>'
            +'<li><a href="forumdisplay.php?forumid=91">Automotive Insanity</a></li>'
            +'<li><a href="forumdisplay.php?forumid=190">The A/V Arena</a></li>'
            +'<li><a href="forumdisplay.php?forumid=124">Pet Island</a></li>'
            +'<li><a href="forumdisplay.php?forumid=132">The Firing Range</a></li>'
            +'<li><a href="forumdisplay.php?forumid=90">The Crackhead Clubhouse</a></li>'
        +'</ul></li>'
        +'<li><h1>The Finer Arts</h1><ul>'
            +'<li><a href="forumdisplay.php?forumid=151">Cinema Discusso</a></li>'
            +'<li><a href="forumdisplay.php?forumid=182">The Book Barn</a></li>'
            +'<li><a href="forumdisplay.php?forumid=150">No Music Discussion</a></li>'
            +'<li><a href="forumdisplay.php?forumid=130">The TV IV</a></li>'
            +'<li><a href="forumdisplay.php?forumid=144">Batman\'s Shameful Secret</a></li>'
            +'<li><a href="forumdisplay.php?forumid=27">ADTRW</a></li>'
            +'<li><a href="forumdisplay.php?forumid=31">Creative Convention</a></li>'
        +'</ul></li>'
        +'<li><h1>The Community</h1><ul>'
            +'<li><a href="forumdisplay.php?forumid=61">SA-Mart</a></li>'
            +'<li><a href="forumdisplay.php?forumid=43">Goon Meets</a></li>'
            +'<li><a href="forumdisplay.php?forumid=193">Helldump 2000</a></li>'
            +'<li><a href="forumdisplay.php?forumid=188">Questions, Comments, Suggestions?</a></li>'
        +'</ul></li>'
        +'<li><h1>Archives</h1><ul>'
            +'<li><a href="forumdisplay.php?forumid=21">Comedy Goldmine</a></li>'
            +'<li><a href="forumdisplay.php?forumid=25">Comedy Gas Chamber</a></li>'
            +'<li><a href="forumdisplay.php?forumid=204">Helldump Success Stories</a></li>'
        +'</ul></li>'
    +'</ul>';
}

function make_places(top)
{
    var wrapper = document.createElement("div");
    var link = document.createElement("a");
    var places = document.createElement("div");
    
    places.innerHTML = forum_list();
    places.className = "places"+((top)?" places_top":" places_bottom");
    
    link.innerHTML = "Places";
    link.className = "places_link";
    
    wrapper.appendChild(link);
    wrapper.appendChild(places);
    wrapper.className = "places_wrapper";
    
    link.addEventListener("click",function(e) {
        places.style.display="block";
        places.addEventListener("click",function(e) {
            e.cancelBubble = true;
        },false);
        
        document.body.addEventListener("click",function() {
            places.style.display="";
            document.body.removeEventListener("click",arguments.callee,false);
        },false);
        
        e.cancelBubble=true;
    },false);
    
    return wrapper;
}

var tags = document.getElementsByName("forumid");
if(tags.length == 1 && tags[0].tagName == "SELECT")
{
    create_styles();

    var form = tags[0].parentNode;

    document.getElementsByClassName("breadcrumbs")[0].appendChild(make_places(true));    
    form.parentNode.replaceChild(make_places(false),form);

}