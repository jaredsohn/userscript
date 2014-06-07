// ==UserScript==
// @name          helvetapaper
// @namespace     http://thomd.net/userscript
// @description   A minimalistic theme for Instapaper
// @include       http://instapaper.com/*
// @include       http://*.instapaper.com/*
// @author        Thomas Duerr
// @version       0.4
// @date          2010-08-14
// @change        Fixes for Safari. Read page counts via Ajax-Requests for better performance.
// ==/UserScript==



//
// xpath helper
//
$x = function(p, context){
    var contextNode = context || document;
    var i, arr = [], xpr = document.evaluate(p, contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}


//
// xpath helper for document nodes from ajax requests
//
$xx = function(p, doc){
    var documentNode = doc || document;
    var i, arr = [], xpr = documentNode.evaluate(p, documentNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}


//
// addStyle function for browsers not supporting GM_addStyle
//
if(typeof GM_addStyle === "undefined"){
    GM_addStyle = function(css) {
    	var head = document.getElementsByTagName("head")[0];
    	var style = document.createElement("style");
    	style.type = "text/css";
    	style.appendChild(document.createTextNode(css));
    	head.appendChild(style); 
    }
}



//
// ajax function for browsers not supporting GM_xmlhttpRequest (GreaseKit and hence Fluid.app)
//
// TODO: implement error handling
//
if(typeof GM_xmlhttpRequest === "undefined"){
    GM_xmlhttpRequest = function(options) { 
        var http = new XMLHttpRequest();
        http.open(options.method.toUpperCase() || "GET", options.url, true);
        for(var header in options.headers){
            http.setRequestHeader(header, options.headers[header]);
        }
        http.onreadystatechange = function(){
            if (http.readyState == 4 && http.status == 200){
                options.onload(http);
            }
        }
        http.send();        
    }
}



// ------------------------------------------------------------------------------------------------

//
// DOM MANIPULATION
//
;(function(){

    //
    // SOME HELPER NODES
    //
    var body =              $x('//body')[0];
    var header =            $x('//*[@id="header"]')[0];
    var logo =              $x('//*[@id="logo"]')[0];
    var title =             $x('//*[@id="logo"]/a')[0];
    var navigation =        $x('//*[@id="categoryHeader"]')[0];
    var currentpage_count = $x('//*[@id="bookmark_list"]//div[@class="titleRow"]').length;
    var username =          $x('//div[@id="userpanel"]/b/text()')[0].nodeValue;
    var logout_link =       $x('//div[@id="userpanel"]/a')[2];
    var nav_links =         $x('//h2[@id="categoryHeader"]/a');
    var rss =               $x('//link[@rel="alternate"]')[0];
    var footer =            $x('//div[@id="footer"]/div')[0];



    //
    // SET FOOTER (at bottom of page)
    //

    // remove hints
    var hint = $x('//*[@id="bookmark_list"]/following-sibling::div[position()=1]')[0];
    if(hint != undefined){
        hint.style.display = "none";
    }

    // set new footer
    var bottom = document.createElement("div");
    bottom.setAttribute("id", "bottom");
    bottom.appendChild(footer);

    // extend footer with some promotions
    bottom.firstChild.appendChild(document.createElement("br"));
    bottom.firstChild.appendChild(document.createElement("br"));
    var ad1 = document.createElement("a");
    ad1.setAttribute("href", "http://helvetapaper.thomd.net");
    ad1.setAttribute("class", "gh-page");
    ad1.appendChild(document.createTextNode("Helvetapaper Theme"));
    bottom.firstChild.appendChild(ad1);
    bottom.firstChild.appendChild(document.createTextNode(" 2010. By "));
    var ad2 = document.createElement("a");
    ad2.setAttribute("href", "http://thomd.net");
    ad2.appendChild(document.createTextNode("Thomas Duerr"));
    bottom.firstChild.appendChild(ad2);
    bottom.firstChild.appendChild(document.createTextNode(". Contact: "));
    var ad3 = document.createElement("a");
    ad3.setAttribute("href", "mailto:helvetapaper@thomd.net");
    ad3.appendChild(document.createTextNode("helvetapaper@thomd.net"));
    bottom.firstChild.appendChild(ad3);
    bottom.firstChild.appendChild(document.createTextNode("."));
    body.appendChild(bottom);



    //
    // USERDATA (at top-right of page)
    //
    var userdata = document.createElement("div");
    userdata.setAttribute("id", "userdata");
    var username_span = document.createElement("span");
    username_span.appendChild(document.createTextNode(username));
    userdata.appendChild(username_span);
    logout_link.replaceChild(document.createTextNode("logout"), logout_link.firstChild);
    userdata.appendChild(logout_link);
    header.insertBefore(userdata, logo);



    //
    // CHANGE STRUCTURE OF EVERY PAGE-LINK
    //
    var links = $x('//div[@id="bookmark_list"]//div[starts-with(@id,"tableViewCell")]');
    for(var i = 0, l = links.length; i < l; i++){
        var link = links[i];

        // page URL
        var page = $x('.//*[@class="titleRow"]/a', link)[0];
        if(page == undefined) continue;
        var href = page.getAttribute("href");
        var url = document.createElement("div");
        url.setAttribute("class", "titleUrl");
        url.appendChild(document.createTextNode(href));
        page.parentNode.insertBefore(url, page.nextSibling);

        // host
        var hostname = $x('.//span[@class="host"]/text()', link)[0].nodeValue;
        var host = document.createElement("div");
        host.setAttribute("class", "hostName");
        host.appendChild(document.createTextNode(hostname));
        page.parentNode.insertBefore(host, page.nextSibling);
    
        // action links (archive, edit, delete, ...)
        var controls = $x('.//*[@class="cornerControls"]', link)[0];
        var archive = $x('./a[last()]', controls)[0];
        archive.setAttribute("title", "");
        var edit = $x('.//*[@class="secondaryControls"]/a[position()=1]', link)[0];
        if(edit != undefined){
            edit.setAttribute("title", "");
            controls.appendChild(edit);
        }
        var del = $x('.//*[@class="secondaryControls"]/a[last()]', link)[0];
        if(del != undefined){
            del.setAttribute("title", "");
            controls.appendChild(del);
        }


        // starring
        var unstarred = $x('.//*[@class="starToggleUnstarred"]', link)[0];
        unstarred.setAttribute("title", "");
        unstarred.replaceChild(document.createTextNode("\u2605"), unstarred.firstChild);
        page.parentNode.insertBefore(unstarred, page);

        var starred = $x('.//*[@class="starToggleStarred"]', link)[0];
        starred.setAttribute("title", "");
        starred.replaceChild(document.createTextNode("\u2605"), starred.firstChild);
        page.parentNode.insertBefore(starred, page);

        var progress = $x('.//*[@class="starToggleProgress"]', link)[0];
        page.parentNode.insertBefore(progress, page);
    }



    //
    // CREATE CATEGORY LINKS & ADD PAGE-COUNTER FLAGS
    //

    // helper functions: fetch and parse count-data from category pages by ajax requests
    var setCounts = function(href){
        GM_xmlhttpRequest({
            method: "GET",
            url:    "http://www.instapaper.com" + href.getAttribute("href"),
            onload: function(response){
                parseCounts(response, href);
            }
        });
    }
    var parseCounts = function(response, href){
        var tempNode = document.createElement('div');
        tempNode.innerHTML = response.responseText.replace(/<script(.|\s)*?\/script>/g, '');
        var count = tempNode.getElementsByClassName('titleRow').length;
        if(count > 0){
            var counter = document.createElement("sup");
            counter.appendChild(document.createTextNode(count));
            href.appendChild(counter);
        }
        tempNode = null;
    }
    
    // determine number of links on current page
    if(currentpage_count > 0){
        var counter = document.createElement("sup");
        counter.appendChild(document.createTextNode(currentpage_count));
        navigation.appendChild(counter);
    }

    // category pages
    for(var i = 0, n = nav_links.length; i < n; i++){
        navigation.appendChild((function(){
            var href = nav_links[i];
        	setCounts(href);
            var category = document.createElement("div");
            category.setAttribute("class", "categorylink");
            category.appendChild(nav_links[i]);    
            return category;
        })());
    }



    //
    // NEW-FLAG
    //
    // put a 'New'-flag on new links from within the last three days. 
    // For this the RSS feed is parsed.
    //
	var timeslot = 1000*60*60*24*3;
	
    var parseRssFeed = function(response){
        if (!response.responseXML) {
            response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
        }
        var items = response.responseXML.getElementsByTagName("item");
        var newLinks = [];
        for(var i = 0, l = items.length; i < l; i++){
            var pubDate = items[i].getElementsByTagName("pubDate")[0].textContent;
            if((+new Date()) - (+new Date(pubDate)) < timeslot){
                var link = items[i].getElementsByTagName("link")[0].textContent;
                newLinks.push(link.replace(/^http:\/\/www\.instapaper\.com/, ""));
            }
        }
        for(var n = 0, l = newLinks.length; n < l; n++){
            var node = $x('//a[@href="'+newLinks[n]+'"]')[0];
            var newFlag = document.createElement("span");
            newFlag.setAttribute("class", "new");
            newFlag.appendChild(document.createTextNode("New"));
            node.firstChild.insertData(0, " ");
            node.insertBefore(newFlag, node.firstChild);
        }
    }

    // get RSS feed
    if(rss){
        GM_xmlhttpRequest({
             method: "GET",
                url: rss.getAttribute("href"),
            headers: {"Accept": "text/xml"},
             onload: parseRssFeed
        });
    }



    // BROWSE (FEATURED STORIES)
    var feature_stories = $x('//div[@id="feature_column"]/div[@class="story"]');
    for(var i = 0, l = feature_stories.length; i < l; i++){
        var story = feature_stories[i];

        // parse date
        var byline = $x('.//div[@class="byline"]/text()', story)[1].nodeValue.match(/^\s *(\w+) (\d{1,2}), (\d{4})+.*\s *([\w\.]+) */)
        var date = document.createElement("div");
        date.setAttribute("class", "story-date");
        var day = document.createElement("span");
        day.setAttribute("class", "story-day");
        day.appendChild(document.createTextNode(byline[2]));
        date.appendChild(day);
        var month = document.createElement("span");
        month.setAttribute("class", "story-month");
        month.appendChild(document.createTextNode(byline[1]));
        date.appendChild(month);
        var year = document.createElement("span");
        year.setAttribute("class", "story-year");
        year.appendChild(document.createTextNode(byline[3]));
        date.appendChild(year);
        story.appendChild(date);

        // story host
        var story_host = byline[4];
        
        // read-later link
        var read_later = $x('.//div[@class="byline"]/a', story)[0];

        $x('//div[@id="feature_column"]/div[last()]')[0].setAttribute("class", "story last-story");
    }
    


    //
    // HELVETAPAPER CSS-STYLES
    //
    // used typographic scale [px]: 12, 14, 16, 24, 30, 36, 48, 120
    // used color scheme: #FFFFFF, #F2F2F2, #E2E2E2, #BBBBBB, #444444, #FF2200
    //

    // OS/UA detection
    var os_ua = null;
    if (navigator.appVersion.indexOf('Mac') != -1 && navigator.userAgent.indexOf('Firefox') != -1) os_ua = 'OSX_FF';
    
    // OS/UA specific CSS corrections
    var new_padding =          (os_ua == 'OSX_FF') ? 'padding:5px 10px 1px' : 'padding:2px 10px 1px';
    var sup_padding =          (os_ua == 'OSX_FF') ? 'padding:5px 8px 0' : 'padding:1px 8px';
    var categorylink_padding = (os_ua == 'OSX_FF') ? 'padding:3px 8px' : 'padding:0px 8px 3px';
    var star_size =            (os_ua == 'OSX_FF') ? 'font-size:32px' : 'font-size:28px';

    // center!
    var content_width = 760;  // for 1024 screens
    var gap = ((window.innerWidth - content_width) * 0.5).toFixed(0);

    var css = ''+
    'body{background:#FFF;color:#444;line-height:1.5;font-family:Helvetica,sans-serif;width:100% !important;margin:0;padding:0;border-top:12px solid #F2F2F2;}'+

    'h1#logo{font-weight:bold;font-size:120px;line-height:1;font-family:Helvetica,sans-serif;border:none;letter-spacing:-4px;margin:0;padding:20px 0 20px '+(gap-10)+'px;}'+
    'h1#logo a{color:#F2F2F2;background:#FFF;text-decoration:none;outline:none;text-shadow:0px 1px 0px #BBB;}'+

    '#header{margin-bottom:0;border-top:1px solid #E2E2E2;}'+
    '#header div{display:none;}'+
    '#header div#userdata{display:block;float:right;font-size:16px;margin-top:10px;padding:0;font-weight:bold;}'+
    '#header div#userdata span{margin-right:16px;}'+
    '#header div#userdata a{color:#F20;font-weight:bold;display:inline-block;width:110px;}'+
    '#header div#userdata a:hover{text-decoration:none;background:#F20;color:#FFF;padding:2px 0 2px 8px;margin:-2px 0 -2px -8px;}'+

    '#content{overflow:hidden;padding-top:10px;}'+
    '#content h2#categoryHeader{color:#444;font-weight:bold;font-size:36px;line-height:1.5;font-family:Helvetica,sans-serif;letter-spacing:-1px;margin:0 0 30px '+(gap)+'px;float:none;}'+
    '#content h2#categoryHeader span,h2#categoryHeader a{display:none}'+
    '#content h2#categoryHeader sup{-moz-border-radius:10px;-webkit-border-radius:10px;font-size:28px;background:#BBB;color:#FFF;font-weight:normal;letter-spacing:0;margin-left:-6px;'+(sup_padding)+';}'+
    '#content h2#categoryHeader div{display:inline-block;margin-left:20px;}'+
    '#content h2#categoryHeader div.categorylink a{color:#F20;display:block;font-size:30px;font-family:Helvetica,sans-serif;letter-spacing:0;height:30px;line-height:1.2;'+(categorylink_padding)+';outline:none;}'+
    '#content h2#categoryHeader div.categorylink a:hover{text-decoration:none;background:#F20;color:#FFF;}'+
    '#content h2#categoryHeader div.categorylink a sup{background:#FAA;color:#FFF;font-size:24px;display:inline-block;margin:-14px -2px 0 3px;}'+

    'div#right_column,div#paginationTop{display:none;}'+
    'div#left_column,div#bookmark_list{width:100%;}'+
    'div#left_column{padding-bottom:8px !important;}'+

    'div#bookmark_list .tableViewCell{-moz-border-radius:0;-webkit-border-radius:0;border:none;border-top:8px solid #FFF;border-bottom:1px solid #E2E2E2;background:#F2F2F2;padding:0;}'+
    'div#bookmark_list .cornerControls{margin-top:2px;}'+
    'div#bookmark_list .cornerControls .textButton{display:none;}'+

    'div#bookmark_list .cornerControls a{font-weight:bold;font-size:16px;line-height:1.1;font-family:Helvetica,sans-serif;color:#F20;width:100px;margin:0;background:transparent;border:none;display:inline-block;padding:5px;text-align:left;color:#F2F2F2 !important;outline:none;}'+
    'div#bookmark_list .tableViewCell:hover .cornerControls a:hover{text-decoration:none;background:#F20;color:#FFF !important;padding:7px 13px 5px;margin:-2px -8px 0px;}'+

    'div#bookmark_list .starBox{float:right;display:none;}'+

    'div#bookmark_list .titleUrl{font-weight:bold;font-size:24px;line-height:1.1;font-family:Helvetica,sans-serif;color:#BBB;width:none;margin:0 0 20px '+(2*gap)+'px;display:block;}'+
    'div#bookmark_list .titleUrl{display:none;}'+
    'div#bookmark_list .hostName{font-weight:bold;font-size:21px;line-height:1.2;font-family:Helvetica,sans-serif;color:#BBB;width:none;margin:0 0 14px '+(2*gap)+'px;display:block;}'+
    'div#bookmark_list .tableViewCell:hover .cornerControls a{color:#F20 !important;-moz-border-radius:0;-webkit-border-radius:0;}'+

    'div#bookmark_list #tableViewCell0 div{color:#444;padding-top:6px;font-size:36px;margin-top:0 !important;}'+

    'div#bookmark_list .titleRow{width:100%;margin-left:-'+(gap)+'px;padding:0;position:relative;}'+
    'div#bookmark_list .titleRow div.pagelink{width:none;margin-left:190px;display:inline;}'+
    'div#bookmark_list .titleRow a.starToggleStarred{'+(star_size)+';line-height:1.1;font-family:Helvetica,sans-serif;color:#F20;width:none;display:inline;position:absolute;left:'+(2*gap-50)+'px;top:15px;outline:none;}'+
    'div#bookmark_list .titleRow a.starToggleStarred:hover{text-decoration:none;}'+
    'div#bookmark_list .titleRow a.starToggleUnstarred{'+(star_size)+';line-height:1.1;font-family:Helvetica,sans-serif;color:#BBB;width:none;display:inline;position:absolute;left:'+(2*gap-50)+'px;top:15px;outline:none;}'+
    'div#bookmark_list .titleRow a.starToggleProgress{display:inline;position:absolute;left:'+(2*gap-50)+'px;top:19px;outline:none;}'+
    'div#bookmark_list .titleRow a.starToggleProgress img{display:none;}'+
    'div#bookmark_list .tableViewCell:hover .titleRow a.starToggleUnstarred:hover{text-decoration:none;color:#F20;}'+
    'div#bookmark_list .titleRow a.tableViewCellTitleLink{font-weight:bold;font-size:21px;line-height:1.2;font-family:Helvetica,sans-serif;color:#444;width:none;display:block;margin:21px 0 0 '+(2*gap)+'px;outline:none;}'+
    'div#bookmark_list .titleRow a.tableViewCellTitleLink:hover{text-decoration:none;}'+

    'div#bookmark_list .tableViewCell:hover .titleRow a.tableViewCellTitleLink{text-decoration:none;color:#F20;}'+
    'div#bookmark_list .titleRow a.tableViewCellTitleLink span.new{-moz-border-radius:10px;-webkit-border-radius:10px;background:#444;color:#FFF;'+(new_padding)+';}'+
    'div#bookmark_list .titleRow div.summary{display:none;}'+
    'div#bookmark_list .secondaryControls{display:none;}'+

    'div#footer{display:none;}'+
    'div#bottom{background:#F2F2F2;font-size:12px;}'+
    'div#bottom div{padding:120px 0 40px '+(gap)+'px !important;margin-top:0 !important;}'+
    'div#bottom div a{color:#F20;text-decoration:none;}'+

    '#adlabel, #ad, #deckpromo, #adclear{display:none;}'+

    '#feature_column{float:none;width:100%;margin:0 0 0 '+(gap)+'px;padding:0;}'+
    '#feature_column .section_header, #side_column{display:none;}'+
    '#feature_column .story{margin:0 '+(2*gap)+'px 30px 0;position:relative;border-bottom:12px solid #F2F2F2;padding:0 0 20px;}'+
    '#feature_column .story .story-date{position:absolute;top:1px;right:'+(content_width+10)+'px;background:#FFF;padding:6px 6px 1px;}'+
    '#feature_column .story .story-date .story-day{display:block;font-size:36px;line-height:1;margin:0 21px 0 4px;text-align:right;color:#F20;}'+
    '#feature_column .story .story-date .story-month{display:block;text-transform:uppercase;margin:-3px 22px 0 4px;text-align:right;}'+
    '#feature_column .story .story-date .story-year{-moz-transform:rotate(-90deg);-webkit-transform:rotate(-90deg);position:absolute;top:13px;right:-10px;font-size:21px;}'+
    '#feature_column .story .byline{display:none;}'+
    '#feature_column .story h2 a{font-family:Helvetica,sans-serif;font-size:24px;color:#444;}'+
    '#feature_column .story h2 a:hover{text-decoration:none;color:#F20;}'+
    '#feature_column .story .summary p{font-family:Helvetica,sans-serif;font-size:16px;color:#444;font-style:normal;}'+
    '#feature_column .last-story{border-bottom:none;margin-bottom:0;}'+
    '';

    GM_addStyle(css);

})();



// ----- HISTORY ----------------------------------------------------------------------------------
// 2010-03-23 - 0.1 created
// 2010-05-31 - 0.2 Smaller global font-size.
// 2010-06-07 - 0.3 CSS adjustments for WinOS.
// 2010-08-14 - 0.4 Fixes for Safari. Read page counts via Ajax-Requests for better performance.


//
// ----- USERSCRIPT UPDATER -----------------------------------------------------------------------
//

// run updater only in browsers suporting GM_xmlhttpRequest, GM_setValue, GM_getValue and GM_addStyle
if(typeof GM_xmlhttpRequest == "undefined" || typeof GM_setValue == "undefined" || typeof GM_getValue == "undefined" || typeof GM_addStyle == "undefined") return;

var userscriptUpdater = function(){

    var css = "div.greasemonkey_updater{padding:10px 0 10px 15px;background:#F2F2F2;}" +
              "div.greasemonkey_updater h1{background:#FF2200;color:#FFF;display:inline;font-size:24px !important;font-weight:bold;margin:0 0 5px;padding:6px 10px 2px;}" +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide{color:#FF2200;float:right;font-size:16px;font-weight:bold;padding:0;text-align:right;width:250px;} " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a{color:#FF2200;padding:6px 58px 4px 11px;} " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a:hover{background:#FF2200;color:#FFF;text-decoration:none;} " +
              "div.greasemonkey_updater p{color:#111;font-size:16px !important;margin:0 0 15px;padding:8px 10px;}" +
              "div.greasemonkey_updater p a{color:#FF2200;}" +
              "div.greasemonkey_updater p a:hover{color:#FF2200;}";

    var config      = {
        checkInterval: 604800,                                    // default check interval: check once a week [in seconds]
                                                                  // Please don't set 'checkInterval' to more than once a day to limit unnecessary server load on userscripts.org
        injectInto:    document.getElementsByTagName("body")[0],  // default dom-node for the updater-message to be inserted
        updaterCss:    css                                        // default styles of updater message
    };
    var lastCheck   = GM_getValue("lastCheck", 0);
    var lastVersion = GM_getValue("lastVersion", 0);
    var currentTime = Math.round(new Date().getTime()/1000);
    var meta        = {
        name:       /@name\s+(.*)[\r\n]/,
        version:    /@version\s+([.\d]+)[\r\n]/,
        change:     /@change\s+(.*)[\r\n]/,
        depricated: /@depricated\s+(.*)[\r\n]/
    };
    var updater;


    // check remote userscript for version
    var checkRemoteUserscript = function(){
        GM_xmlhttpRequest({
            method:  "GET",
            url:     "http://userscripts.org/scripts/source/" + config.scriptId + ".meta.js",
            headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
            onload:  function(resp) {
                GM_setValue("lastCheck", currentTime);
                for(m in meta){meta[m] = (meta[m].exec(resp.responseText) ? meta[m].exec(resp.responseText)[1] : null);}
                if(isNewer(meta.version, config.currentVersion) && isNewer(meta.version, lastVersion)) {
                    GM_addStyle(config.updaterCss);
                    updater = build();
                }
            }
        });
    };


    // compare versions based on versioning scheme: major.minor[.bugfix]
    var isNewer = function(o, p){
        /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(o + "|" + p);
        with(RegExp){
            if(parseInt($4 || "0") < parseInt($1 || "0")) return true;
            if(parseInt($5 || "0") < parseInt($2 || "0")) return true;
            if(parseInt($6 || "0") < parseInt($3 || "0")) return true;
        }
        return false;
    };


    // skip current update until next
    var skipUpdate = function(ev){
        ev.preventDefault();
        GM_setValue("lastVersion", meta.version);
        config.injectInto.removeChild(updater);
    };


    // initialization
    var initialize = function(options){

        // merge options into config
        for(prop in options){if(options[prop]){config[prop] = options[prop];}}

        // already checked for an update today?
        if(currentTime > (lastCheck + config.checkInterval)){
            checkRemoteUserscript();
        }
    };


    // build updater message and inject it into DOM
    var build = function(){
        var updater = document.createElement("div");
            updater.className = "greasemonkey_updater";
        var hide = document.createElement("div");
            hide.className = "greasemonkey_updater_link_to_hide";
        if(meta.depricated == null){
            var a_hide = document.createElement("a");
                a_hide.href = "";
                a_hide.addEventListener("click", skipUpdate, false);
            var a_span = document.createElement("span");
                a_span.appendChild(document.createTextNode("Skip until next Update!"));
            a_hide.appendChild(a_span);
            hide.appendChild(a_hide);
        }
        var h1 = document.createElement("h1");
            h1.appendChild(hide);
            h1.appendChild(document.createTextNode(meta.depricated == null ? "Greasemonkey UserScript Update Notification!" : "Depricated Greasemonkey UserScript!"));
        updater.appendChild(h1);
        var p = document.createElement("p");
        if(meta.depricated == null){
            var text = "There is an update available for <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a>.<br>";
                text += meta.change ? "<br><b>Changes:</b> " + meta.change + "<br><br>" : "";
                text += "You are currently running version <b>" + config.currentVersion + "</b>, the newest version on userscripts.org is <b>" + meta.version + "</b>!<br><a href=\"http://userscripts.org/scripts/source/" + config.scriptId + ".user.js\">Update to Version " + meta.version + "</a>";
        } else {
            var text = "The userscript <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a> is now depricated.<br>";
                text += meta.depricated && meta.depricated != "true" ? "<br>" + meta.depricated + "<br><br>" : "";
                text += "Please remove your script! Thanks for using it.";
        }
        p.innerHTML = text;
        updater.appendChild(p);
        var first = config.injectInto && config.injectInto.firstChild;
        (first ? config.injectInto.insertBefore(updater, first) : config.injectInto.appendChild(updater));
        return updater;
    };

    return { init: initialize };
}();


// initialize updater
userscriptUpdater.init({
    scriptId:       "78176",     // insert id of your userscript from userscripts.org!
    currentVersion: "0.4"        // insert current version number based on versioning scheme: major.minor[.bugfix]
});

//
// ----- / USERSCRIPT UPDATER ---------------------------------------------------------------------
//
