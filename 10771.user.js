// ==UserScript==
// @name          Myspace - Custom Layout Dis/Enable
// @namespace     http://userscripts.org/people/774
// @homepage      http://userscripts.org/scripts/show/10771
// @description   2008/07/03 - Disable or Re-Enable custom myspace layouts/apps at the click of a button. Author: InsaneNinja.
// @include       http://myspace.com/*
// @include       http://www.myspace.com/*
// @include       http://profile.myspace.tld/*
// @exclude       http://*myspace.tld/
// @exclude       http://*myspace.tld/?*
// @exclude       http://myspace.tld/*fuseaction*
// @exclude       http://www.myspace.tld/*fuseaction*
// ==/UserScript==

// Adjust to either true or false

var load_profile_theme = true  // when page displays
var shrink_flash_files = false // youtube, music players, slideshows
var destroy_app_tables = true

//////////////////////////////////////
//
    if (document.getElementById('ctl00_Main_cvCelebrity') || document.getElementById('secretstandup_previous_CMS'))
        { load_profile_theme == true && shrink_flash_files == false}
//
//////////////////////////////////////
// Create Code Container
//////////////////////////////////////

//if (document.getElementById('profileV1main')) {    }


    if (load_profile_theme) // this really needs to be done better on the next release
    {
        style_ON = document.createElement('div');
        style_ON.setAttribute('id','gm_StyleDisEnable_OFF')
        style_ON.style.display='none';

        style_OFF = document.createElement('style');
        style_OFF.setAttribute('id','gm_StyleDisEnable_ON')
    }
    else
    {
        style_OFF = document.createElement('div');
        style_OFF.setAttribute('id','gm_StyleDisEnable_OFF')
        style_OFF.style.display='none';

        style_ON = document.createElement('style');
        style_ON.setAttribute('id','gm_StyleDisEnable_ON')
    }

//////////////////////////////////////
// Grab Styles
//////////////////////////////////////

    // grabs style made by "official" layout generator

    var linkers = document.getElementsByTagName("link")

    for (var i=0;i<linkers.length;i++) {
        if (linkers[i].title == "UserStyle" && linkers[i].href.indexOf('/static/') == -1) {
            style_OFF.innerHTML = "@import url('"+linkers[i].href+"');\n";
            linkers[i].parentNode.removeChild(linkers[i]);
        }
    }


    // set to loop 5 times, because on some profiles, broken style tags
    // would join to form new commands after the legit styles were scraped

    var a=1; while (a++<10) {

        var stylers = document.getElementsByTagName("style")

        for (var i=0;i<stylers.length;i++) {
            // this is to ignore official css, they censor the # sign normally, BUT not on band profiles
            if (stylers[i].innerHTML.indexOf('#google') !== -1) continue;
            style_OFF.innerHTML += stylers[i].innerHTML.replace(/\;\s*$/,';}').replace(/<[^>]*>/,' ');
            stylers[i].innerHTML = '';
            stylers[i].parentNode.removeChild(stylers[i]);
        }
    }

    style_OFF.innerHTML += "\n .DisEnableRealStyle {}";

//////////////////////////////////////
// Create New Style, Reformat Page
//////////////////////////////////////

    var s=''
        + 'a,img,div,table,span,marquee, div {position:relative!important; top:auto!important; left:auto!important; '
            +'right:auto!important; bottom:auto!important; overflow:visible!important; height:auto!important; }\n'

        + 'table {display:table!important; }\n'

        + 'img {height:auto!important; max-width:320px!important; }\n'

        + 'big big, small small {font-size:1em !important; }\n'

        + '.profileInfo img {max-width:170px!important; }\n'

        + '.interestsAndDetails img, .interestsAndDetails td {max-width:200px!important; }\n'

        + '.interestsAndDetails td table,\n'
        + '.blurbs table table table,\n'
        + '.blurbs table table div {width:auto!important; }\n'

        + '.blurbs td {max-width:400px!important; }\n'

        + '.friendSpace table table td {width:25%!important; }, .friendSpace table table table td,.friendsComments td {width:auto!important; }\n'

        + 'td, div, span {text-wrap:normal; word-wrap:break-word; }\n'

        + 'font {color:black; }\n'

        + '#Table2 td {width:auto!important; }\n'

        + '#ctl00_Main_ctl00_Img2 {display:none; }'; // no clue what this thing is, there's no SRC

        if (shrink_flash_files && !document.getElementById('mp3player')) s+= 'object, embed{max-width: 320px!important;}\n #Table2 embed, #Table2 object {max-width:100%!important;}\n'

        if (destroy_app_tables)
            s+='.userProfileApp {display:none!important;}\n'
             + '#appchrome_100261, #appchrome_107266 {apps:Flickr,RSS; display:table!important;}'


    style_ON.innerHTML = s;


    if (document.getElementById("Table1"))
    document.getElementById("Table1").innerHTML =
    document.getElementById("Table1").innerHTML.replace(/([>\s][\w\.~]{20})([\w\.~]{20})/g,'$1 $2').replace(/([>\s][\w\.~]{20})([\w\.~]{15})/g,'$1 $2');

//////////////////////////////////////
// Add the new elements to the page
//////////////////////////////////////

    document.body.appendChild(style_ON);
    document.body.appendChild(style_OFF);

//////////////////////////////////////
// Create the Dis/Enable button
//////////////////////////////////////

    var DisEnableStyle = document.createElement("div");
    DisEnableStyle.setAttribute('id','DisEnableStyle');
//  DisEnableStyle.setAttribute('style','');
    DisEnableStyle.innerHTML =
        '<button style="background-color:#C00!important; border: 1px solid #900; border-width:0px 0px 1px 1px!important; -moz-border-radius-bottomleft:8px;'
        +'color:white!important; font-size:10px!important; font-family:arial!important; text-transform: none!important; font-weight:normal!important;'
        +'z-index:999!important;position:fixed!important; top:0px!important;right:0px!important; padding:2px 1px 4px 4px!important; height: 20px!important;" onclick="'
        +'var temp = document.getElementById(\'gm_StyleDisEnable_OFF\').innerHTML;'
        +'document.getElementById(\'gm_StyleDisEnable_OFF\').innerHTML = document.getElementById(\'gm_StyleDisEnable_ON\').innerHTML; '
        +'document.getElementById(\'gm_StyleDisEnable_ON\').innerHTML = temp; document.getElementById(\'gm_StyleDisEnable_OFF\').style.display=\'none\';'
//      +'this.innerHTML = (document.getElementById(\'gm_StyleDisEnable_ON\').innerHTML.match(\'DisEnableRealStyle\') ? \'Disable Style\': \'Enable Style\')">Enable Style</button>';
        +'">Dis/Enable Style</button>';
    document.body.insertBefore(DisEnableStyle, document.body.firstChild);

