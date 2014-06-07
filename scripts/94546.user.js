// ==UserScript==
// @name           TW-Forum ink to the top by TVE
// @namespace      TVE
// @description    This Script made a link to the to of the forumpage.
// @include        http://forum.the-west.*
// @exclude        http://forum.the-west.*/newreply.php*
// @exclude        http://forum.the-west.*/newthread.php*
// @exclude        http://forum.the-west.*/member.php*
// @exclude        http://forum.the-west.*/private.php?do=newpm*
// @exclude        http://forum.the-west.*/private.php?do=showpm*
// @exclude        http://forum.the-west.*/profile.php?do=editsignature*
// @exclude        http://forum.the-west.*/editpost.php?do=editpost*
// ==/UserScript==

    function addGlobalStyle(css)
    {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {return;}
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle('div.top {left:          0;}');
    addGlobalStyle('div.top {top:           50%;}');
    addGlobalStyle('div.top {border-top:    solid black 1px; border-right: solid black 1px; border-bottom: solid black 1px;}');
    addGlobalStyle('div.top {clear:         both;}');
    addGlobalStyle('div.top {margin:        0;}');
    addGlobalStyle('div.top {padding:       5px 2px 5px 0px;}');
    addGlobalStyle('div.top {position:      fixed;}');
    addGlobalStyle('div.top {background:    none repeat scroll 0 0 #F5B555;}');
    addGlobalStyle('#bild   {border:        0px;}');


    document.getElementsByTagName("body")[0].innerHTML += "<div class='top'><a href='#top'><img id='bild' src='http://de.selfhtml.org/src/up.gif' /></a></div";

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_184', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_184', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=184&version=1.1';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();