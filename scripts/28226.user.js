// ==UserScript==
// @name          resize backpack
// @namespace     http://thomd.net/userscript
// @description   inserts a nice resize-button in backpack to toggle the width of backpacks viewport
// @include       http://*.backpackit.com/*
// @include       https://*.backpackit.com/*
// @author        Thomas Duerr
// @version       0.8.1
// @date          2010-05-11
// @change        changed url for script-updater-check and increased check interval to limit unnecessary server load on userscripts.org
// ==/UserScript==



//
// xpath helper
//
function $x(p, context){
  contextNode = context || document;
  var i, arr = [], xpr = document.evaluate(p, contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

//
// firebug-logging helper
//
if(unsafeWindow.console){
  var GM_log = unsafeWindow.console.log;
}

//
// cheap $-function wrapper
//
function $e(element){
  return document.getElementById(element);
}

    

//
// css for resize-button
//
var css_resizer  = ".dynamic_width {margin: 0pt auto; text-align: left; width: none;}";
    css_resizer += ".fix_width {margin: 0pt auto; text-align: left; width: 925px;}";
    css_resizer += ".dynamic_width #Container {width: 100%;}";
    css_resizer += ".dynamic_wrapper {padding: 0px 20px 0px 50px !important;}";
    css_resizer += "div.more-node, div.less-node {padding: 2px 5px 5px; cursor: pointer;}";
    css_resizer += "div.more-node, div.less-node {padding: 2px 5px 5px; cursor: pointer;}";
    GM_addStyle(css_resizer);


//
// show-more event handler
//
var showMore = function(){
    $x("id('Wrapper')/div")[0].className = "dynamic_width";
    $e('Wrapper').className = "dynamic_wrapper";
    var width = document.body.clientWidth;
    $e("main_column").style.width = parseInt(width - 305) + 'px';
    $e("Main").style.width = parseInt(width - 305) + 'px';
    $x("//div[@class='global_header']/div")[0].style.width = parseInt(width - 65) + 'px';
    div_node.replaceChild(less_node, more_node);
    GM_setValue("backpack-viewport", "more");
    if($x("//body[contains(@class, 'newsroom')]").length > 0){
        $x("id('Container')")[0].style.width = parseInt(width - 70) + 'px';
    }
};


//
// show-less event handler
//
var showLess = function(){
    $x("id('Wrapper')/div")[0].className = "";
    $e('Wrapper').className = "fix_width";
    var width = '690px';
    $e("main_column").style.width = width;
    $e("Main").style.width = width;
    $x("//div[@class='global_header']/div")[0].style.width = '925px';
    div_node.replaceChild(more_node, less_node);
    GM_setValue("backpack-viewport", "less");
    if($x("//body[contains(@class, 'newsroom')]").length > 0){
        $e("Main").style.width = '750px';
        $x("id('Container')")[0].style.width = "985px";
    }
}


//
// generate more-width-button
//
var button_more = 'data:image/gif;base64,' +
    'R0lGODlhOQAfAPcAAP///8jIyBeZF+Xl5f7+/ujo6Pz8/Ozs7Onp6evr6+7u7vDw8P39/efn5/Ly8ubm' +
    '5qGhofv7+/T09PX19fr6+tDQ0MvLy/n5+ZzQnM/Pz9/f3+Hh4c7Oztra2tHR0c3NzdjY2NfX197e3uDg' +
    '4OLi4tTr1MnJycjiyO/v7xqaGszMzNzc3MXFxcbGxq6urru7u6ysrCKeItnZ2dTU1O3w7cDAwMPDw3TB' +
    'dMTExOTk5Nvb297v3iSeJMrKyoHEgb29vR+cH9bW1rW1taOjo93d3e3t7ff397+/v/r8+s/jz+Pj40as' +
    'RkCpQMviy53TndLS0uXy5SSfJLq6urrgutrm2iqhKvPz86DUoKnVqdDl0JXPlXrCeuHv4cXhxVW0VaCg' +
    'oNfr1+rq6p+fn4bFhvb29p3SnTSlNI7Njl23Xbm5uabXpqenpyWfJeTq5BybHFCxULe3t2e8Z7a2tprP' +
    'msPgw7LbspzRnNPT00euR/Hx8evt68rhyqWlpdLm0q+vr3rAesDfwMLewr6+vuvx65TNlOjz6MfHx62t' +
    'rVe0V+bz5nK/ctXs1d7u3jalNjmnOfj4+GC5YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'ACH5BAAAAAAALAAAAAA5AB8AAAj/AAcIHDhwRIgKHAIoXMiwocOHDHt4WEGwosUBHTJA3MixY4AMIC5W' +
    '3FBBIQcNKCQQAMCypcuXMGO2jPAgYYAKG0QO0KAiwAcEK2UKHTq0yIcAKjRc1KAQhAGiUKO+JABCoVKC' +
    'JCwEGCG1q9cRASzkHOghgIygXtMSrVphYIcAHJ6qnStUwtEOAjUWIMC3r9+/gAMLHuxXx8cBIuAyIMx3' +
    'CmPCiRY9JhCmp4ggATYQYMC5s2cokNh4Hk2adAk3Z5CU9pynZAiNKAzInk1bTRQBKWjr3r27hAABb3bw' +
    'nv2obAWtRobv8PL79/DntH3/jnEFelkLJgJE2M59u5YYzcOL///tZHuc8egFoCnUvXvC7NopyJcPBk/6' +
    '9GXk37g/vkqd+QBqtRAFFxRYIBeI8DeeHQXup2B4ZjBioIHwKWTEBBhmOAEhQDz42xwYKuLhb1sMomGG' +
    'LTBEhhUStOiiBH0s0RwQGNRoo41ZtAjIjXSc4CMW4TnSxYsvLmCDQlqhsIADTDbJJA0+pCAAD05WaaWV' +
    'TfyWgg80XMlkAzWEpVEDC5Rp5pkLBNIID2i26aaZSQjAxB5vminDDzdhpoMCfPbpJ59t/PHnoIT2ScUY' +
    'ehTqZwBHBBBCYh8UUcABlFZq6aWYZqrpppQSIQQLAYgwgEZE5JDAqaimquqqrLbqagII2KwAx2EYhbUB' +
    'CQjkquuuvPbq66/AZnAIqHgJVNIHIZBQwLLMNuvss9BGC+0dLuDZ1kAbaGVBBRpI6+233jaQAQxy2FoR' +
    'UwG0UMMMJDTg7rvwxivvvPQ2sIIgQ7xg1VJaGZLGp09okMMDBBds8MEIJ0ywEjNIwccaOIR11UUkKdTC' +
    'C37AMAQEHHfs8ccgh8zxF2K4EPFNY+mEkUYetdwySCpbZBBCLte8kEQUiRQQADs=';

var img_more_node = document.createElement('img');
    img_more_node.src = button_more;
var more_node = document.createElement('div');
    more_node.className = "more-node";
    more_node.appendChild(img_more_node);
    more_node.addEventListener("click", showMore, false);



//
// generate less-width-button
//
var button_less = 'data:image/gif;base64,' +
    'R0lGODlhOQAfAPcAAP///8jIyBeZF+Xl5f7+/ujo6Pz8/Ozs7Onp6evr6+7u7vDw8P39/efn5/Ly8ubm' +
    '5qGhofv7+/T09PX19fr6+tDQ0MvLy/n5+ZzQnM/Pz9/f3+Hh4c7Oztra2tHR0c3NzdjY2NfX197e3uDg' +
    '4OLi4tTr1MnJycjiyO/v7xqaGszMzNzc3MXFxcbGxq6urru7u6ysrCKeItnZ2dTU1O3w7cDAwMPDw3TB' +
    'dMTExOTk5Nvb297v3iSeJMrKyoHEgb29vR+cH9bW1rW1taOjo93d3e3t7ff397+/v/r8+s/jz+Pj40as' +
    'RkCpQMviy53TndLS0uXy5SSfJLq6urrgutrm2iqhKvPz86DUoKnVqdDl0JXPlXrCeuHv4cXhxVW0VaCg' +
    'oNfr1+rq6p+fn4bFhvb29p3SnTSlNI7Njl23Xbm5uabXpqenpyWfJeTq5BybHFCxULe3t2e8Z7a2tprP' +
    'msPgw7LbspzRnNPT00euR/Hx8evt68rhyqWlpdLm0q+vr3rAesDfwMLewr6+vuvx65TNlOjz6MfHx62t' +
    'rVe0V+bz5nK/ctXs1d7u3jalNjmnOfj4+GC5YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'ACH5BAAAAAAALAAAAAA5AB8AAAj/AAcIHDhwRIgKHAIoXMiwocOHDHt4WEGwosUBHTJA3MixY4AMIC5W' +
    '3FBBIQcNKCQQAMCypcuXMGO2jPAgYYAKG0QO0KAiwAcEK2UKHTq0yIcAKjRc1KAQhAGiUKO+JABCoVKC' +
    'JCwEGCG1q9cRASzkHOghgIygXtMSrVphYIcAHJ6qnStUwtEOAjUWIMC3r9+/gAMLHuxXx8cBIuAyINw3' +
    '0SLGgadA7hump4ggATYQYMC5s+fOJdycQfK5dGcokNiYXp2nZAiNKAzInk2bdgkBAt7sqM3bgJooAlL0' +
    'Hv6obAWtRobzvo07xhXlO7zgxq28d1kLJgJE2M49zvTv4HGj/ynEnbuWGOHTC3BSfnvC7NopyJd/Q336' +
    'KnXmg8FjP32Z+fNptRAFFxRYYH39gWcGIwVygUiC4NlhoIHwKWTEBBhiqAiE020xSIYYEgIEhwLMASKG' +
    'LTBEhhUStCgBIBjEiAEdJ9SIxXeOdOHijhL0scR0QMgoZIxZ8LiADQpphcICDjTp5JNONoFbCj7QACWU' +
    'NPiQggA8XOllkw3UEJZGDSxg5ploopmEAEzskeabZwbSCA9w1inDDzdhpoMCfPbpp59UjKHHn4T+2cYf' +
    'hSYawBEBhJDYB0UUcMCklFZq6aWYZqrppEQIwUIAIgygERE5JGDqqaimquqqrLaaAAI2wKtxGEZhbUAC' +
    'ArjmquuuvPbq668ZHPIpXgKV9EEIJBSg7LLMNuvss9A+e4cLeLY10AZaWVCBBtF26223DWQAgxy1VsRU' +
    'AC3UMAMJDbTr7rvwxivvvA2sIMgQL1i1lFaGpOHpExrk8MDABBds8MEID6zEDFLwsQYOYV11EUkKtfCC' +
    'HzAMAcHGHHfs8ccgb/yFGC5AfNNYOmGkkUcsswxSyhYZhFDLNC8kEUUiBQQAOw==';

var img_less_node = document.createElement('img');
    img_less_node.src = button_less;
var less_node = document.createElement('div');
    less_node.className = "less-node";
    less_node.appendChild(img_less_node);
    less_node.addEventListener("click", showLess, false);



//
// inject more/less button on the right of new-page-button
//
var button_container = $x("id('Pages')/div[1]")[0];
    button_container.style.overflow = "hidden";

var button = $x("id('button_to_add_new')", button_container)[0];
    button.style.cssFloat = "left";
    button.style.width = "156px";

var div_node = document.createElement('div');
    div_node.style.cssFloat = "left";
    div_node.appendChild(more_node);

button_container.insertBefore(div_node, button.nextSibling);



//
// get viewport state
//
var state = GM_getValue("backpack-viewport", "less");
if(state == "more") showMore();




//
// ChangeLog
// 2008-04-21 - 0.1   - created
// 2008-06-15 - 0.2   - store viewport state
// 2008-06-17 - 0.3   - update metadata
// 2009-01-08 - 0.4   - bugfix due to the new reorderable sidebar links
// 2009-02-09 - 0.5   - bugfix due to new color scheme feature
// 2009-02-11 - 0.6   - integration of userscripts update notification
// 2009-02-11 - 0.7   - bugfix: width was not correct calculated when missing scrollbar
// 2009-03-25 - 0.8   - layout bugfix for newsroom page
// 2010-05-11 - 0.8.1 - changed url for script-updater-check and increased check interval to limit unnecessary server load on userscripts.org.
//




//
// ---------- userscript updater --------------------------------------------------------------------------------------
//
var userscriptUpdater = function(){

    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 125px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }";

    var config      = {
        checkInterval: 604800,                                    // default check interval: check once a day [in seconds]
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
        for(prop in options){if(options[prop]){config[prop] = options[prop];}}
        if(currentTime > (lastCheck + config.checkInterval)){
            checkRemoteUserscript();
        }
    };


    // build updater message and inject into DOM
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
                text += meta.change ? "<br>" + meta.change + "<br><br>" : "";
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
    scriptId:       "28226",
    currentVersion: "0.8.1",
    injectInto:     $e("Main")
});
