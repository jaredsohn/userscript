// ==UserScript==
// @name            Simplepedia
// @version         1.2
// @namespace       http://userscripts.org/scripts/show/42312
// @description     MediaWiki beautification
// @author          Grant Stavely http://grantstavely.com/
// @copyright       2009+ Grant Stavely
// @license         (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include         http://*
// @include         https://*
// @exclude         *google.*
// @exclude         *userscripts.org/*
// @contributor     http://userscripts.org/users/auscompgeek
// @contributor     http://userscripts.org/users/sizzle
// @contributor     http://userscripts.org/users/67105
// @contributor     http://www.howtocreate.co.uk/bio.html
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
// GreaseKit, Opera users: This version does not have any dependancies.
////////////////////////////////////////////////////////////////////////////////
(function () {
    // User Options are below. If you are using Firefox, please use about:config to change these
    // For Greasekit users, skip down to the next section
    if (typeof GM_getValue == "function" && typeof GM_setValue == "function") {
        // Heading font?
        if (GM_getValue("headingFont") == undefined) {
            // Use the full name of the font you would like
            // I suggest 'Helvetica Neue' or 'Hoeflter Text'
            //GM_setValue("headingFont", "'Helvetica Neue', Helvetica, 'MgOpen Moderna', sans-serif");
            GM_setValue("headingFont", "'Hoefler Text', 'Times New Roman', Times, serif");
        }
        // Here you can set the font that most of the site will use
        if (GM_getValue("bodyFont") == undefined) {
            //GM_setValue("bodyFont", "'Helvetica Neue', Helvetica, 'MgOpen Moderna', sans-serif");
            GM_setValue("bodyFont", "'Times New Roman', Georgia, Times, serif");
        }
        // Show login, edit-page, and other metadata tabs
        if (GM_getValue("user") == undefined) {
            // boolean true/false
            GM_setValue("user", false);
        }
        // Link color!
        if (GM_getValue("color") == undefined) {
            // use a css compatible value "#ff0000", "#f00", "red", and so on...
            GM_setValue("color", "#0892D0");
        }
        // Stub link color!
        if (GM_getValue("stubColor") == undefined) {
            GM_setValue("stubColor", "pink");
        }
        // Red (unwritten articles) link color!
        if (GM_getValue("newColor") == undefined) {
            GM_setValue("newColor", "red")
        }
        // Language settings are persistent, but you can give it a default if you like
        if (GM_getValue("default_language") == undefined) {
            // string value of wikipedia subdomains: http://meta.wikimedia.org/wiki/List_of_Wikipedias
            // "en", "fr", "gr", etc...
            GM_setValue("default_language", "en");
        }
        // Show a selection list of all alternate language versions of any document
        // Wikipedia specific
        if (GM_getValue("international") == undefined) {
            // boolean true/false
            GM_setValue("international", true);
        }
        // Now throw all our prefs into an object
        var prefs = {
            headingFont: GM_getValue("headingFont"),
            bodyFont: GM_getValue("bodyFont"),
            user: GM_getValue("user"),
            color: GM_getValue("color"),
            stubColor: GM_getValue("stubColor"),
            newColor: GM_getValue("newColor"),
            defaultLanguage: GM_getValue("default_language"),
            international: GM_getValue("international")
        }
    } else {
        // Omniweb, Safari, etc users:
        var prefs = {
            headingFont: "'Helvetica Neue', Helvetica, 'MgOpen Moderna', sans-serif",
            //headingFont: "'Hoefler Text', 'Times New Roman', Times, serif",
            bodyFont: "'Helvetica Neue', Helvetica, 'MgOpen Moderna', sans-serif",
            //bodyFont: "'Times New Roman', Georgia, Times, serif",
            user: true,
            color: "#0892D0",
            stubColor: "pink",
            newColor: "red",
            defaultLanguage: "en",
            international: true
        }
    }
    // hard code preference overrides
    // prefs.international = true;
    ////////////////////////////////////////////////////////////////////////////////
    // If the site has a monobook css link, it's a witch
    // If the site imports monobook css using a hack, it's Wikipedia
    //alert(navigator.userAgent);
    var wiki = false,
        cssLinks = document.getElementsByTagName("link"),
        inlineStyle = document.getElementsByTagName("style");
    if (location.href.match(/wiki/i) || location.href.match(/http:\/\/?(www\.|)wikipedia\.org\//i) ) { // The site says that we're in a wiki
        wiki = true;
    } else { // We're not sure yet, we have to figure it out
        for (var i = cssLinks.length -1; i >= 0; i--) {
            var cssLink = cssLinks[i].getAttribute("href");
            if (cssLink.match(/monobook/i)) {
                wiki = true;
            }
        }
        for (var i = inlineStyle.length -1; i >= 0; i--) {
            var style = inlineStyle[i].childNodes[0].data;
            if (style.match(/monobook|wiki/i)) {
                wiki = true;
            }
        }
    }
    if (!wiki) return; // Make sure we only run on wikis
    ////////////////////////////////////////////////////////////////////////////////
    // Make sure that we can style everything properly.
    if (typeof GM_addStyle != "function") {
        function GM_addStyle(css) {
            if (typeof addStyle == "function") {
                addStyle(css);
            } else if (typeof PRO_addStyle == "function") {
                PRO_addStyle(css);
            } else {
                var heads = document.getElementsByTagName("head");
                if (heads.length > 0) {
                    var node = document.createElement("style");
                    node.type = "text/css";
                    node.appendChild(document.createTextNode(css));
                    heads[0].appendChild(node);
                }
            }
        }
    }
    ////////////////////////////////////////////////////////////////////////////////
    // Away we go
    try {
        GM_addStyle("html,body{background:#FFF;background:-webkit-gradient(linear,lefttop,leftbottom,from(#FFF),to(#DDD));margin-bottom:0px!important;padding:0px!important;padding-left:10px!important;height:100%;font-family:inherit;font-size:13px;}p{color:#000!important;font-size:13px;line-height:18px;background-image:none;}span,div{border:none!important;/*background-color:inherit!important;*//*color:#000!important;*/font-size:inherit!important;line-height:inherit!important;}.toctext:hover,toclevel-1:hover,.toclinks:hover,a:hover{color:#000!important;}a:active{color:#000!important;}b{color:#000;}big,h1,h2,h3,h4,h5{background-image:none!important;background-color:transparent!important;-webkit-background-clip:none!important;-webkit-background-origin:none!important;font-weight:bold!important;color:#000!important;border-bottom:#eee1pxsolid!important;border-top:none!important;border-left:none!important;border-right:none!important;}h1{font-size:24px!important;}h2{font-size:150%!important;}h3{font-size:120%!important;}li,p,ul,blockquote{padding:5px!important;color:#000!important;background-color:inherit;}ul,ulli{list-style-image:none!important;list-style-type:disc!important;list-style-position:outside!important;}table{margin:0px!important;padding:3px!important;color:#000;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;border:1pxsolid#eaeaea!important;border-collapse:inherit!important;}th,tr,td,.thumbinner,.image{color:#000!important;border:none!important;padding:0px!important;margin:0px!important;border-collapse:inherit!important;}ol{list-style-type:decimal!important;list-style-position:outside!important;}.selected,pre{-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;border:1pxsolid#eaeaea!important;}fieldset{-moz-border-radius:px;-webkit-border-radius:6px;border-radius:3px;border:1pxsolid#eaeaea!important;}.logotype,a.logotype:link,a.logotype:visited,a.logotype:active{font-weight:bold!important;}#logotype{margin-top:180px;}#logotype,#globeLogo,#front_search_bar{width:100%;text-align:center;}#frontlogo{font-size:24px!important;color:#000!important;font-weight:bold!important;underline:none!important;padding-bottom:5px;}#frontsearchInput{width:240px;}#frontsearchbar{z-index:10000;height:100%;background-color:inherit!important;color:black;text-align:center;}#front-search,#random-article{display:inline!important;}#globalWrapper{position:absolute;left:0px;top:0px;z-index:50;border:none;margin:0px!important;padding:0px!important;}#content{margin:0px!important;padding:0px!important;top:0px!important;position:absolute!important;background-image:none!important;}#bodyContent{width:auto!important;margin:10px!important;}#column-one,#column-content{margin:0px!important;}#contentSub{margin-top:30px!important;margin-left:0px!important;}#firstHeading{margin-top:15px!important;margin-left:15px!important;margin-bottom:0px!important;}#mp-topbanner,#mp-topbannertable,#mp-topbannertr,#mp-topbannertd,#mp-topbannerth,#mp-topbannertbody{background-color:#fff!important;}h2.edisection,.editsection,.editsectiona:link,.editsectiona:visited,.editsectiona:active{font-size:9px!important;color:#ddd!important;font-weight:normal!important;}h2.editsection:hover,.editsectiona:hover{color:#000!important;}.smallcaps{font-variant:small-caps!important;font-size:70%;color:#0892D0!important;}span,.noprint,.plainlinks,.navbar,.relarticle,.mainarticle{color:#000!important;background-color:inherit!important;}.toclevel-1,.toclevel-2,.toclevel-3,.toclevel-4{list-style:none!important;}.topicon,#featured-star,#protected-icon,#protected-icondiv,#speak-icon,#spoken-icon,#spoken-icondiv{display:none!important;}.dablink{padding-top:0px!important;padding-left:10px!important;}.printfooter{padding-top:10px!important;}#edit-ul{position:relative;float:right;margin:0px;}#p-cactcions,#ca-nstab-citations,#ca-nstab-citationsa,#ca-move,#ca-movea,#ca-nstab-portal,#ca-nstab-portala,#ca-nstab-main,#ca-nstab-maina,#ca-nstab-special,#ca-nstab-speciala,#ca-nstab-category,#ca-nstab-categorya,#ca-nstab-help,#ca-nstab-helpa,#ca-nstab-user,#ca-nstab-usera,#ca-talk,#ca-talka,#ca-edit,#ca-history,#ca-historya,#ca-addsection,#ca-addsectiona,#ca-watch,#ca-watcha,#ca-viewsource,#ca-viewsourcea,#ca-nstab-project,#ca-nstab-projecta,#ca-nstab-image,#ca-nstab-imagea{font-size:smaller!important;z-index:1500;color:#ddd!important;border:none!important;text-align:left!important;margin:0px!important;position:relative!important;background-color:transparent!important;font-weight:normal!important;padding-top:0px!important;}#ca-nstab-maina:hover,#ca-nstab-speciala:hover,#ca-nstab-categorya:hover,#ca-nstab-helpa:hover,#ca-nstab-usera:hover,#ca-talka:hover,#ca-historya:hover,#ca-addsectiona:hover,#ca-watcha:hover,#ca-viewsourcea:hover,#ca-nstab-projecta:hover{color:#000!important;}#p-cactionslia,#p-cactionsli.selected,#contentdiv.thumb{background-color:transparent!important;}#p-cactions{left:inherit!important;top:55px!important;right:5px!important;}.portlet{padding:0px!important;margin:0px!important;}#p-personal{position:absolute!important;top:0px;right:20px;font-size:smaller!important;margin-right:20px!important;z-index:1500;}#pt-login,#pt-logina{font-size:smaller!important;color:#ddd!important;position:relative;float:right;margin-right:10px;}#pt-logina:hover{color:#000!important;}#pt-userpagea:link,#pt-mytalka:link,#pt-preferencesa:link,#pt-watchlista:link,#pt-mycontrisa:link,#pt-logouta:link{color:#ddd!important;}#pt-userpagea:hover,#pt-mytalka:hover,#pt-preferencesa:hover,#pt-watchlista:hover,#pt-mycontrisa:hover,#pt-logouta:hover{color:#000!important;}/*wikipediabeta*/#pt-betafeedbacka:link,#pt-acaibetaa:link{color#ddd!important;}#pt-betafeedbacka:hover,#pt-acaibetaa:hover{color:#000!important;}.pBody{padding-right:20px!important;}.pBody{}#p-personalli{background-image:none!important;}#preftocli{border-right:none!important;list-style-type:none!important;background-color:transparent!important;}.toccolours,.navbox-abovebelow,.navbox-group,#toc,.nowraplinks,.collapsible,.autocollapse,#catlinks,.printfooter,.ambox,.ambox-content,.infobox,.geography,.vcard,.thumb,.tright,.mbox-text{margin:5px!important;color:#000;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;border:1pxsolid#eaeaea!important;}tr,th,td,tbody,.toclevel-1,.toclevel-2,.toclevel-3{-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;border:1pxsolid#f6f6f6!important;border-collapse:inherit!important;margin:0px!important;}.toc:link,#toc:link,th:link,td:link,tbody:link{border-color:#ddd!important;}th:hover,td:hover,tbody:hover{background-color:#eee!important;border-color:#ddd!important;}.thumb:hover,.thumbcaption:hover,.thumbinner:hover{background-color:#eee!important;border-color:#ddd!important;}th:hover,td:hover,tbody:hover,.thumb:hover,.thumbcaption:hover,.thumbinner:hover{background-color:#eee!important;border-color:#ddd!important;}#tocul:hoverli,#tocul:hover,#tocli:hover,.toclevel-1:hover,.toclevel-2:hover,.toclevel-3:hover{background-color:#eee!important;border-color:#eee!important;}.wikitable,.prettytable{margin:0px0px0px0px;color:#000;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;border:1pxsolid#eaeaea!important;}tdtable{width:auto!important;background-color:transparent!important;}#p-search{display:block!important;position:absolute;top:20px;right:10px;visibility:visible;z-index:1000;background-color:inherit;height:500px;color:#000;}#langJump{z-index:100;position:absolute;top:20px;right:220px;}#floatingsearch{z-index:100;border:none;position:absolute;top:20px;right:20px;}#mp-upper,#mp-uppertable,#mp-uppertd,#mp-uppertr,#mp-upperth,#mp-uppertbody{z-index:0!important;margin-top:100px;background-color:#fff!important;border:none!important;}#mp-newhead{margin-top:10px;margin-bottom:0.1em;line-height:2.0em;}#mpheader{z-index:100!important;width:500px!important;height:100px;}.mp-header{font-weight:normal!important;font-size:200%!important;}tbody,.MainPageBG,#mp-left,#mp-tfa-h2,#mp-tfa,#mp-dyk-h2,#mp-dyk,#mp-right,#mp-itn-h2,mp-itn,#mp-otd-h2,#mp-otd,#mp-tfp,#mp-tfp-h2,#mp-other,#mp-sister,#mp-lang,#jump-to-nav,#mp-strapline,#mp-banner,#mp-upper{background-image:none!important;background-color:inherit!important;color:#000!important;border:none!important;}#mp-left,#mp-right{margin-top:80px;}#mp-upperimg,#mp-tfaimg,#mp-leftimg,#mp-rightimg{color:#000!important;border:none!important;padding:10px!important;margin:10px!important;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;border:1pxsolid#eaeaea!important;}#mp-upperimg:hover,#mp-tfaimg:hover,#mp-leftimg:hover,#mp-rightimg:hover{background-color:#eee!important;border-color:#ddd!important;}#mp-tfp-h2,.mw-headline{color:#000!important;background-color:inherit!important;font-weight:bold!important;}.mp-left.image{border:1pxsolid#f00;}.MainPageBG,.MainPageBGtbody,.MainPageBGtable,.MainPageBGtd,.MainPageBGtr,.MainPageBGth{background-color:#fff!important;color:#000!important;border:none!important;}.mergedrow,.floatnone,#searchBody{border:none!important;text-align:left!important;}h5#p-search{display:inline;}#artikelstadium{position:absolute!important;left:30px!important;top:60px!important;background-color:inherit!important;width:15px;display:inline!important;}#mw-panel,#mw-head,#mw-page-base,#mw-head-base,.portleth5,.hiddeninputs,.metadata,.centralauth-login-box,.generated-sidebar,.mbox-image,.floatleft,.floatright{display:none!important;}#coordinates,#p-gigyaapplet,#p-sharethis,#p-,#p-navigation,#p-interaction,#p-feedback,#p-search,#donate,#p-lang,#anontip,#anon-banner,#mp-banner,#filetoc,#No_article_title_matches,#msg-noexactmatch,#mp-strapline,#footer,#siteSub,#p-search,#p-navigation,#p-logo,#p-interaction,#p-tb,#p-lang,#p-scholarpedia,#p-encyclopedias,#f-list,#f-poweredbyico,#f-copyrightico,#mw_header,#siteNotice,#mr_banner,#mr_banner_topad,#mr_header,#guides,#background_strip,#wikia_header,#widget_sidebar,#monaco_footer,#LEFT_SKYSCRAPER_2_load,#LEFT_SKYSCRAPER_3_load,#LEFT_SKYSCRAPER_1_load,#TOP_RIGHT_BOXAD_load,#page_bar,#google_ads_div_LEFT_SPOTLIGHT_1,#ads{display:none!important;}/*betawikipediastuff*/#vectorTabs,#p-coll-create_a_book{dislay:none;}");
    }
    catch(err) {}

    // Add font option styles
    if (prefs.headingFont && prefs.bodyFont) {
        try {
            GM_addStyle("h1,h2,h3,h4,h5#mp-tfp-h2,.mp-header,#mp-tfp-h2,.mw-headline{font-family:" + prefs.headingFont + "!important;}html,p,body,#globalWrapper{font-family:" + prefs.bodyFont + "!important;}");
        }
        catch(err) {}
    }

    // Add link colors
    if (prefs.color) {
        try {
            GM_addStyle(".toctext,.toclinks,.toclevel-1,a:link,a:visited,a:active{font-weight:normal;text-decoration:none;color:" + prefs.color + "!important;}");
        }
        catch(err) {}
    }
    // Add link colors for unrwritten articles
    if (prefs.newColor) {
        try {
            GM_addStyle("a:link.new,a:active.new,a:visited.new{color:" + prefs.newColor + "!important;}");
        }
        catch(err) {}
    }

    // Hide all logged in user commands
    if (!prefs.user) {
        try {
            GM_addStyle("#login,#pt-login,#edit-ul,#login-ul,#user-ul,.editsection{display:none!important;}");
        }
        catch(err) {}
    }

    // Give the article editing ul an id
    try {
        var editNav = document.getElementById("ca-nstab-main");
        editNav.parentNode.setAttribute("id", "edit-ul");
    }
    catch(err) {}

    // Front-page specific change for WikipediA only
    if (location.href.match(/http:\/\/?(www\.|)wikipedia\.org\//i)) {
    //if (location.href.match(/http:\/\/?(www\.)?wikipedia\.org\//i)) { //which one is more efficient?
        var newFrontPage = document.createElement("div");
        newFrontPage.innerHTML='\
            <div id="logotype">\
                <a href="http://' + prefs.defaultLanguage + '.wikipedia.org/">\
                    <div id="frontlogo">Wikipedia</div>\
                </a>\
            </div>\
            <div id="globeLogo">\
                <div id="front_search_bar">\
                    <form id="front-search" action="/w/index.php" method="get">\
                        <input name="title" type="hidden" value="Special:Search" />\
                        <input name="ns0" type="hidden" value="1" />\
                        <input id="frontsearchInput" name="search" type="text" tabindex="1" title="Search Wikipedia [f]" accesskey="f" value="" />\
                        <br />\
                        <input type="submit" name="submit" value="Search Wikipedia" />\
                    </form>\
                    <form id="random-article" action="/wiki/Special:Random">\
                        <input type="submit" name="random" value="I\'m Feeling Lucky" />\
                    </form>\
                </div>\
            </div>';
        try {
            newFrontPage.setAttribute('id','NewFront');
            var oldFrontPage = document.getElementById("bodyContent");
            oldFrontPage.parentNode.replaceChild(newFrontPage, oldFrontPage);
        }
        catch(err) {}
    }
    // Add a new favicon if it is wikipedia
    if (location.href.match(/http:\/\/?(\w*\.|)wikipedia\.org\//i)) {
    //if (location.href.match(/http:\/\/?(\w*\.)?wikipedia\.org\//i)) { //which one is more efficient?
        var icon = document.createElement("link");
        icon.setAttribute("type", "image/x-icon");
        icon.setAttribute("rel", "shortcut icon");
        icon.setAttribute('href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALpJREFUeNrEU1ENhTAMHDjAwiw8C7PwLGABLWhAAlhAwpAwJAyaXJdbs7z3wQdNmjVlbe96o8s5uyfWu4f2fgOHHUQJbx/p04xcpJxHTtxLrSLYcH7ocqAib3IHvDTYfxRxXgcslkIFDVQkTjhnXFeqodTSO+A9KP+J9uCpaRnOKiwEM1DuQPHX0K0oKE+GHY0aiVA1EYgS5+2DUUYnDv8QiK20zLGhfbK19iVujbhoXskH617/Gy8BBgDHv1uI+O2cEwAAAABJRU5ErkJggg======');
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(icon);
    }
    // Replace the main page header
    var newHeaderContent = document.createElement("h1");
    newHeaderContent.innerHTML="\
        Wikipedia\
            ";
    try {
        newHeaderContent.setAttribute("id","firstHeading")
        var oldheader = document.getElementById("mp-topbanner");
        oldheader.parentNode.replaceChild(newHeaderContent,oldheader);
    }
    catch(err) {}

    // Create a floating search and language jump nav element
    // Search using whatever search form the page already has
    try {
        var searchform = document.getElementById("searchform").getAttribute("action");
            var searchbar = document.createElement("div");
            searchbar.innerHTML='\
                    <form id="search" action="' + searchform + '" method="get">\
                            <div id="search_bar">\
                                <input name="title" type="hidden" value="Special:Search" />\
                                <input name="ns0" type="hidden" value="1" />\
                                <input id="searchInput" name="search" type="text" title="Search Wikipedia [f]" accesskey="f" value="" />\
                            </div>\
                    </form>';
            searchbar.id="floatingsearch";
            document.getElementById("content").appendChild(searchbar);
    }
    catch(err) {}

    // Jump to the same article in other languages
    // This mostly works but doesn't jump on change,so I'm not using it yet
    if (prefs.international) {
        try {
            var langList = document.getElementById("p-lang").getElementsByTagName("a");
            if (langList.length > 0) {
                var langJump = document.createElement("select");
                langJump.id = "langJump";
                langJump.name = "langJump";
                var langList = document.getElementById("p-lang").getElementsByTagName("a");
                var langTitle = document.createElement("option");
                // snag 'in another language' in the local translation
                langTitle.text = document.getElementById("p-lang").getElementsByTagName('h5')[0].innerHTML;
                langJump.add(langTitle,null);
                for (var i = 0; i <= langList.length -1; i++) {
                    var langOpt = document.createElement("option");
                    langOpt.text = langList[i].innerHTML;
                    langOpt.value = langList[i];
                    try {
                        langJump.add(langOpt,null);
                    }
                catch(err) {}
                }
                langJump.addEventListener("change", function() {
                    window.location.href = this.options[this.selectedIndex].value;
                }, false);
                try {
                    document.getElementById("content").appendChild(langJump);
                }
                catch(err) {}
            }
        }
        catch(err) {}
    }

    try {
        // pt-userpage is only there if already logged in
        var userNav = document.getElementById("pt-userpage");
        userNav.parentNode.setAttribute("id","user-ul");
        // when not, use pt-login
        var userLogin = document.getElementById("pt-login");
        userLogin.parentNode.parentNode.setAttribute("id","login");
        userLogin.parentNode.parentNode.setAttribute("class","");
    }
    catch(err) {}
    ////////////////////////////////////////////////////////////////////////////////
    // Auto-updating for Firefox users
    CheckScriptForUpdate = {
        days: 7, // Days to wait between update checks
        id: "42312",
        time: new Date().getTime() | 0,
        name: "Simplepedia",
        call: function(response) {
            GM_xmlhttpRequest({
                method: "GET",
                    url: "https://userscripts.org/scripts/source/" + this.id + ".meta.js",
                    onload: function(xpr) {CheckScriptForUpdate.compare(xpr, response)}
            });
        },
        compare: function(xpr, response) {
            this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
            this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
            if (this.xversion && this.xname[1] == this.name) {
                this.xversion = this.xversion[1];
                this.xname = this.xname[1];
            } else {
                if (xpr.responseText.match("Uh-oh! The page could not be found!") || (this.xname[1] != this.name)) GM_setValue("updated", "off");
                return false;
            }
            this.xversionParts = this.xversion.split(".");
            this.versionParts = this.version.split(".");
            while ((this.xversionParts.length > 0) && (this.versionParts.length > 0))
            {
                if (this.xversionParts[0] < this.versionParts[0])
                    this.newerVersion = -1;
                if (this.xversionParts[0] > this.versionParts[0])
                    this.newerVersion = 1;
                this.xversionParts.shift();
                this.versionParts.shift();
            }
            if (this.xversionParts.length > 0)
                this.newerVersion = -1;
            if (this.versionParts.length > 0)
                this.newerVersion = 1;
            this.newerVersion = 0;
            if (this.newerVersion == 1 && confirm("A new version of the " + this.xname + " user script is available. Do you want to update?")) {
                GM_setValue("updated", this.time);
                GM_openInTab("http://userscripts.org/scripts/source/" + this.id + ".user.js");
            } else if (this.newerVersion == 1) {
                if (confirm("Do you want to turn off auto updating for this script?")) {
                    GM_setValue("updated", "off");
                    GM_registerMenuCommand("Auto Update " + this.name, function() {GM_setValue("updated",new Date().getTime() | 0); CheckScriptForUpdate.call("return")});
                    alert("Automatic updates can be re-enabled for this script from the User Script Commands submenu.");
                } else {
                    GM_setValue("updated", this.time);
                }
            } else {
                if (response) alert("No updates available for " + this.name);
                GM_setValue("updated", this.time);
            }
        },
        check: function() {
            if (GM_getValue("updated", 0) == 0) GM_setValue("updated", this.time);
            if (GM_getValue("updated", 0) != "off" && +this.time > (+GM_getValue("updated", 0) + (1000*60*60*24*this.days))) {
                this.call();
            } else if (GM_getValue("updated", 0) == "off") {
                GM_registerMenuCommand("Enable " + this.name + " updates", function() {GM_setValue("updated", new Date().getTime() | 0); CheckScriptForUpdate.call(true)});
            } else {
                GM_registerMenuCommand("Check " + this.name + " for updates", function() {GM_setValue("updated", new Date().getTime() | 0); CheckScriptForUpdate.call(true)});
            }
        },
    };
    if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();
})();
/** Change Log
 * Version 1.1.5 July 12, 2010
    - Integrated auscompgeeks 1.1 branch with minor compatibility changes
    - Updated css to work with Wikipedia's current theme
    - Browser detection currently borked
    - Prefs currently slightly borked

 * Version 1.1 June 30, 2010
    - Split the version number and compare each individually, instead of
        stripping dots out of the version in the update check
    - Embed the favicon into the script instead of fetching it from a server

 * Version 1.0 May 6, 2010
    - Automatically detect non-Gecko browsers and act accordingly
    - Attempt GM_getValue() and GM_setValue() before checking for wikis only on Gecko browsers
    - Store prefs in an object
    - Removed extraneous whitespace in CSS
    - Improved readability of auto-update code, sorry sizzlemctwizzle...
    - Squashed a few pref bugs
    - Add new prefs: newColor (new article links), stubColor (stub article links)

 * Version .992 September 11, 2009
    - Enclosed all of Simplepedia in an unnamed function
    - Don't execute on Google
    - Don't attempt GM_getValue() or GM_setValue() if the site isn't a wiki
      (for Opera/GreaseKit users who are lazy)

 * Version .991 July 17, 2009
    - Added a W favicon for wikipedia only
    - Cleaned preference handling a bit, please reset and reload to use
    - Fixed display of international language selection to use a localized title
    - Darkened the darks a bit
    - Misc. CSS tweaking
    - Updated wikipedia discovery to regex better

 * Version .99 July 15, 2009
    - Fixed the alternate language select drop-down and made it an option

 * Version .983 July 10, 2009
    - Miscelaneous small CSS fixes adapting to changes made at Wikipedia
    - Simplified front page further
    - Made en.wikipedia closer resemble artile pages
    - Embracing helvetica, possibly renaming to helvetipedia soon

 * Version .982 June 22, 2009
    - Tweaked thumbnail picture padding to correct a hover issue (thanks sdfghrr)
    - Tweaked Encyclopedia Dramatica again

 * Version .98 June 2, 2009
    - Added a new about:config / cookie option to make customizing link colors more discoverable

 * Version .97 June 2, 2009
    - Resolved issues with preference handling in webkit
    - Added disabled preference to dynamically create jump-list of all alternate
      language versions of a given document on wikipedia

 * Version .96
    - Generic wiki export has been expanded to specifically support wikia.com,
      while generically supporting any other site with 'wiki' in the CSS @import

 * Version .95 May 18, 2009
    - Improved font selection changes and examples
    - Updated namespace
    - Fixed Auto-updating menu selection controls

 * Version .94 May 16, 2009
    - Reset font selection to allow greater user control
    - Tweaked JavaScript style, thanks iandalton
    - Updated CSS for multiple fixes

 * Version .93 May 14, 2009
    - Added checks to leave user configured items alone, thanks iandalton
    - Updated CSS for multiple fixes

 * Version .92 May 10, 2009
    - Complete rewrite
    - Removed document title adjustment
    - Removed specific site support
    - Added generic MediaWiki detection
    - Added proper search form submission detection
    - Began using GreaseMonkey API - Mac users will need secondary scripts now

 * Version .9.1 April 30, 2009
    - Fixed front page WikipediA logo (Wikipedia moved it)
    - Dumped Firefox specific auto-updater in favor of pure JS version by Jarett
      http://userscripts.org/scripts/show/20145
    - Fixed http/https mixup when browsing secure sites, Simplepedia will now
      also use https to grab external CSS
    - Updated front page bookshelves to link to random pages because it makes more sense to me

 * Version .9 April 29, 2009
    - Added auto-updating via Another Auto Update Script by sizzlemctwizzle
      http://userscripts.org/scripts/show/38017
    - Restored TOC toggle for auscompgeek

 * Version .8.1.51 April 13, 2009
    - Added support for http://*.intelink.gov/wiki/*, just in case

 * Version .8.1 April 11, 2009
    - Added a simple wikipedia graphic anchor for / by the search bar
    - Swapped the same out on wikipedia.org/
    - Added support for http://wiki.greasespot.net/*
    - Improved user/editor display option

 * Version .8 April 5, 2009
    - Added preliminary support for many more wikis http://en.wikipedia.org/wiki/List_of_wikis
      with main page bugs calling them all WikipediA

 * Version .7.5 March 30, 2009
    - Reintroduced edit links, page and user login tabs, ++

 * Version .7.2.1 March 25, 2009
    - Added helper functions, basic error checking

 * Version .7.2 March 18, 2009
    - Added basic support for wikileaks.org
    - Added support for secure WikiMedia sites

 * Version .7.1 March 17, 2009
    - Fixed front page form elements in Firefox
    - Added default language links to the front page

 * Version .7 March 17, 2009
    - Added 'I'm feeling lucky' and 'Search' buttons to the front portal
    - Reintroduced .noprint content for the main pages
    - Fixed center td border display
*/