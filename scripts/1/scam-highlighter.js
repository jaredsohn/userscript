// ==UserScript==
// @name           Scam Highlighter (Facebook)
// @namespace      http://userscripts.org/users/304644
// @description    Highlights all official Zynga game posts in green and all known scam posts in red.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @copyright      Matt
// @version        2.0.0.3
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @require        http://sizzlemctwizzle.com/updater.php?id=99840&days=1
// @require        http://userscripts.org/scripts/source/29910.user.js
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://userscripts.org/scripts/source/50018.user.js
// @run-at         document-end
// ==/UserScript==

GM_config.init('Scam Highlighter Settings', {
    highlightStyle: {label: 'Style', type: 'radio', options: ['Left', 'Whole', 'Right'], default: 'Whole'}
//for later use
  //  hidePost: {label: 'Hide scam Posts?', type: 'checkbox', default: 'false'}
    //commentText: {label: 'Text to cemmont with?', type: 'textarea', default: 'text'}
    },
    GM_config.eCSS, {
        open: function() {
            GM_config.localizeButtons();
            GM_config.addBorder();
            GM_config.resizeFrame('75%','500px');
            adjustPurgeButton();
        },
    }
);
    
function showConfig() {
  GM_config.open();
}

function openSettings(){
        var container = document.getElementsByClassName('uiSideNav')[0];
        var settingsLink = document.createElement('li');
        settingsLink.innerHTML = "<a class='item' onclick='showConfig();'><span class='imgWrap'><img src='http://farmvillion.com/favicon.png' /></span><span class='linkWrap'>Open Settings</span></a>";
        container.insertBefore(settingsLink, container.nextSibling);
    }
setTimeout(openSettings,2000); 

// Variables
var x,stories=document.getElementsByClassName("uiStreamStory"); 
var x,linkCheck=document.getElementsByClassName("uiAttachmentTitle");
var x,actionCheck=document.getElementsByClassName("UIActionLinks_bottom");
var x,appCheck=document.getElementsByClassName("uiStreamSource");

function highlight() { 
    for(x=0;x<stories.length;x++){ 
        if(linkCheck[x].innerHTML.indexOf(match3) && actionCheck[x].innerHTML.match(match3) && appCheck[x].innerHTML.match(match1)){ 
            stories[x].style.borderLeft='10px solid #90FF90';
        }
        else if (appCheck[x].innerHTML.match(match2)){
            stories[x].style.background='#FF7070';
        }
    }
}

function log(){
	GM_log("stories.length="+stories.length+"; linkCheck.length="+linkCheck.length+" appCheck.length"+appCheck.length);
}

//This grabs the file with the scam ID numbers inside.
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://farmvillion.com/scamlist.txt',
    headers: { 'Cache-Control': 'no-cache' },
    onload: function(resp) {
        var lists = JSON.parse(resp.responseText);
        scamId = lists.scamId;
        legitId = lists.legitId;
        gameUrl = lists.gameUrl;
        match1=new RegExp("apps/application\\.php\\?id=("+legitId.join('|')+")");
        match2=new RegExp("apps/application\\.php\\?id=("+scamId.join('|')+")");
        match3=new RegExp("apps\\.facebook\\.com/("+gameUrl.join('|')+")");
        setInterval(highlight,5000); //runs highlight every half second
		setInterval(log,1000);
    }
});