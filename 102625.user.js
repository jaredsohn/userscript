// ==UserScript==
// @name           Animated Diversions: Toggle ADSong
// @namespace      http://www.somethingafal.com/
// @description    Toggle The ADSong
// @include        http://adiversions.stalo.com/index.php
// @include        http://adiversions.stalo.com/
// ==/UserScript==

// Ok here's some crap that chrome needs to make this script compatible or something idk
if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }

     GM_registerMenuCommand = function(name, funk) {
    //todo
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}


/*
This is just in case some dick decides to make a nothing.swf at the base of AD
TRY AND GET AROUND THAT ASSHOLES (ok you probably can with rewrite rules but
I'm just going to assume you don't know that)
*/
blankswf = Math.random()+'nothing.swf';

embed = document.getElementsByTagName("embed")[0];
adsong = document.getElementsByTagName("embed")[0].src;
document.getElementsByTagName("embed")[0].src = blankswf;

var ElEm = document.createElement("script");ElEm.src='check_adsong = function(){if(document.getElementById(\'play_adsong\').checked){document.getElementsByTagName("embed")[0].src = '+adsong+';window.setTimeout(function(){GM_setValue(\'autoplay\', true)},0);}else{document.getElementsByTagName(\'embed\')[0].src = '+blankswf+';window.setTimeout(function(){GM_setValue(\'autoplay\', false)},0);}}';document.body.appendChild(ElEm);


document.body.innerHTML += '<div style="width:110px;height:25px;border:1px black solid;padding:5px;float:left;position:fixed;top:150px;right:50px;background-image:url(\'/Themes/green/images/catbg.jpg\');background:#93C088"><input type="checkbox" id="play_adsong" onclick="if(document.getElementById(\'play_adsong\').checked){document.getElementsByTagName(\'embed\')[0].src = \''+adsong+'\';window.setTimeout(function(){GM_setValue(\'autoplay\', true)},0);}else{document.getElementsByTagName(\'embed\')[0].src = \''+blankswf+'\';window.setTimeout(function(){GM_setValue(\'autoplay\', false)},0);}" />Play ADSong</div>';


//Autoplay when page loads
document.getElementById("play_adsong").checked = GM_getValue('autoplay', false);
if(document.getElementById("play_adsong").checked){document.getElementsByTagName("embed")[0].src = adsong;window.setTimeout(function(){GM_setValue("autoplay", true)},0);}else{document.getElementsByTagName("embed")[0].src = blankswf;window.setTimeout(function(){GM_setValue("autoplay", false)},0);}
