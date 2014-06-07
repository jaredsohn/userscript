// ==UserScript==
// @id             www.youtube.com-028c16b6-24d6-4f9c-a793-4409763b5939@scriptish
// @name           Youtube Layout Fix
// @version        3.1
// @namespace      artyfl.tk
// @author         Arty-fishL
// @description    Make youtube less sore to the eyes
// @include        http://*.youtube.*
// @include        https://*.youtube.*
// @exclude        http://*.youtube.*/embed/*
// @exclude        https://*.youtube.*/embed/*
// @run-at         document-end
// @downloadURL    https://userscripts.org/scripts/source/153751.user.js
// @updateURL      https://userscripts.org/scripts/source/153751.meta.js
// ==/UserScript==


/* LOAD SAVED COLOURS */

/*
UserScript bit
START
*/

// Setup saving for Google Chrome
// http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

// Do the loading
var bgColor = GM_getValue('ytBgColor', '#808080');
var sbColor = GM_getValue('ytSbColor', '#C8C8C8');
var rdMySubs = GM_getValue('ytRdMySubs', false);

/*
END
*/

/* REDIRECTION */

// Redirect to my subs page if setting is true and on root home page
if(rdMySubs && location.pathname == '/') {
	location.pathname = '/feed/subscriptions';
}

/* SETTINGS BUTTON */

function createSettingsButton() {

    var ytlfBoxVis = false;
        
    var newdiv = document.createElement('div');
    newdiv.setAttribute('id', 'ytlfSettings');
    newdiv.style.position = 'fixed';
    newdiv.style.bottom = '10px';
    newdiv.style.right = '10px';
    newdiv.style.direction = 'rtl';
	newdiv.style.backgroundColor = sbColor;
	newdiv.style.padding = '10px';
    
    var link = document.createElement('a');
    link.innerHTML = '&nbsp;YTLF Settings&nbsp;';
    link.onclick = function() { 
            ytlfBoxVis = !(ytlfBoxVis);
            if (ytlfBoxVis) {
                document.getElementById('ytlfSettingsBox').style.display = 'block';
            } else {
                document.getElementById('ytlfSettingsBox').style.display = 'none';
            }
        };
    
    var boxouter = document.createElement('div');
    boxouter.setAttribute('id', 'ytlfSettingsBoxOuter');
    boxouter.style.width = '0px';
    boxouter.style.height = '0px';
    boxouter.style.display = 'block';
    boxouter.style.position = 'absolute';
    boxouter.style.bottom = '213px';
    boxouter.style.left = '0px';
    boxouter.style.direction = 'rtl';
    
    var box = document.createElement('div');
    box.setAttribute('id', 'ytlfSettingsBox');
    box.style.display = 'none';
    box.style.height = '180px';
    box.style.width = '190px';
    box.style.textAlign = 'center';
    box.style.backgroundColor = 'white';
    box.style.color = 'black';
    box.style.fontSize = '12px';
    box.style.overflow = 'visible';
    box.style.border = '1px solid';
    box.style.padding = '15px';
    box.style.direction = 'ltr';
    box.innerHTML = "<h2> Youtube Layout Fix Settings </h2>"
					+ "<br/> Background color: <br/> "
					+ "<input id='ytlfBgColor' type='text' value='" + bgColor + "' style='background-color:" + bgColor + ";text-shadow:0px 0px 6px white;padding-left:2px;'> </input> <br/> "
					+ "<br/> "
					+ "Sidebar color: <br/> "
					+ "<input id='ytlfSbColor' type='text' value='" + sbColor + "' style='background-color:" + sbColor + ";text-shadow:0px 0px 6px white;padding-left:2px;'> </input> <br/> "
					+ "<br/> "
					+ "<label><input id='ytlfRdMySubs' type='checkbox' style=''> </input> Redirect home page to 'My subscriptions' </label> <br/> "
					+ "<br/> "
					+ "<input id='ytlfResetButton' type='button' value='Reset'> </input>";
	
    boxouter.appendChild(box);
    newdiv.appendChild(boxouter);
    newdiv.appendChild(link);
    //document.body.insertBefore(newdiv, document.childNodes[0]);
    document.body.appendChild(newdiv);
	
	// set checkbox checked or not
	document.getElementById('ytlfRdMySubs').checked = rdMySubs;
    
    document.getElementById('ytlfBgColor').onkeyup = function() {
            bgColor = document.getElementById('ytlfBgColor').value;
            document.getElementById('ytlfBgColor').style.backgroundColor = bgColor;
            applyColours();
            doSidebars();
            GM_setValue('ytBgColor', bgColor);
        }
    document.getElementById('ytlfSbColor').onkeyup = function() {
            sbColor = document.getElementById('ytlfSbColor').value;
            document.getElementById('ytlfSbColor').style.backgroundColor = sbColor;
            applyColours();
            doSidebars();
            GM_setValue('ytSbColor', sbColor);
        }
    document.getElementById('ytlfSbColor').onblur = function() {
            // analytics page needs a reload to do sidebar
            // so do it when sidebar text field loses focus
            if (document.URL.indexOf('analytics') != -1)
                location.reload();
        }
    document.getElementById('ytlfRdMySubs').onchange = function() {
            rdMySubs = document.getElementById('ytlfRdMySubs').checked;
            GM_setValue('ytRdMySubs', rdMySubs);
            }
    document.getElementById('ytlfResetButton').onclick = function() {
            bgColor = '#808080';
            sbColor = '#C8C8C8';
			rdMySubs = false;
            document.getElementById('ytlfBgColor').value = bgColor;
            document.getElementById('ytlfBgColor').style.backgroundColor = bgColor;
            document.getElementById('ytlfSbColor').value = sbColor;
            document.getElementById('ytlfSbColor').style.backgroundColor = sbColor;
			document.getElementById('ytlfRdMySubs').checked = rdMySubs;
            applyColours();
            doSidebars();
            GM_setValue('ytBgColor', bgColor);
            GM_setValue('ytSbColor', sbColor);
			GM_setValue('ytRdMySubs', rdMySubs);
            // analytics page needs a reload to do sidebar
            if (document.URL.indexOf('analytics') != -1)
                location.reload();
            }
            
}
createSettingsButton();


/* CENTRE CONTENT */

// search results page specific
if (document.URL.indexOf('/results') != -1) {// || document.URL.indexOf('/channel/') != -1) {
    
    // fix left align so it is centred
    document.body.className = document.body.className.replace('site-left-align', 'site-center-align');
    
    // get page element
    var page = document.getElementById('page');
    
    // modify width to make content centred
    page.style.width = '50%';
    
} 

// new watch page fix
else if (document.URL.indexOf('/watch') != -1 && !(document.URL.indexOf('/feed/') != -1)) {

    // get page element
    var content = document.getElementById('content');
    
    // modify margin value to make content centred
    content.style.marginLeft = 'auto';
    content.style.marginRight = 'auto';
    content.style.width = '955px';
    
    // remove excess padding
    document.getElementById('player').style.paddingLeft = "0px";
    document.getElementById('watch7-main-container').style.paddingLeft = "0px";
}

// inbox pages specific
else if ( document.URL.indexOf('/inbox') != -1) {

    // get page element
    var content = document.getElementById('yt-admin');
    
    // modify margin value to make content centred
    content.style.marginLeft = 'auto';
    content.style.marginRight = 'auto';
    content.style.width = '100%';
} 

// address book page specific
else if (document.URL.indexOf('/address_book') != -1 ) {

    // get page element
    var content = document.getElementById('baseDiv');
    
    // modify margin value to make content centred
    content.style.marginLeft = 'auto';
    content.style.marginRight = 'auto';
    content.style.width = '100%';
} 

// video manager and dashboard pages specific
else if ( document.URL.indexOf('my_subscriptions') == -1 && document.URL.indexOf('my_videos_upload') == -1 && (document.URL.indexOf('my_') != -1 || document.URL.indexOf('dashboard') != -1 || document.URL.indexOf('view_all_playlists') != -1 || document.URL.indexOf('inbox') != -1 || document.URL.indexOf('/tags') != -1) ) {

    // get page element
    var content = document.getElementById('content');
    
    // modify margin value to make content centred
    content.style.marginLeft = 'auto';
    content.style.marginRight = 'auto';
    content.style.width = '50%';
}

else
    // fix left align so it is centred
    document.body.className = document.body.className.replace('site-left-align', 'site-center-align');


/* BACKGROUND COLOURS */

function applyColours() {
    
    // fix colours
    document.bgColor = sbColor;
    if (document.URL.indexOf('analytics') == -1 && document.URL.indexOf('my_subscriptions') == -1 && document.URL.indexOf('inbox') == -1 && document.URL.indexOf('address_book') == -1) {
        // normal page
        document.getElementById('page-container').style.backgroundColor = bgColor;
        
    } else {
        // annoying settings pages
        document.getElementById('body-container').style.backgroundColor = bgColor;
        
    }
	document.getElementById('ytlfSettings').style.backgroundColor = sbColor;
}

applyColours();


/* VIDEO EDITOR PAGE FIXES */

// video editor page specific
if (document.URL.indexOf('editor') != -1) {
    
    // give it a white bg colour
    document.getElementById('video-media-list').style.backgroundColor = 'white';
    
}


/* MAIN SIDEBAR/GUIDE FIXES */

// get elements
var sidebars = [];

if (document.URL.indexOf('/watch') != -1 && !(document.URL.indexOf('/feed/') != -1)) {
    // watch page
    sidebars.push( document.getElementById('watch7-sidebar') );
    sidebars.push( document.getElementById('guide-container') );
    
} else if (document.URL.indexOf('my_videos_upload') != -1) {
    // upload page
    sidebars.push( document.getElementById('upload-sidebar') );
    
} else if (document.URL.indexOf('my_') != -1 || document.URL.indexOf('dashboard') != -1 || document.URL.indexOf('view_all_playlists') != -1 || document.URL.indexOf('inbox') != -1 || document.URL.indexOf('/tags') != -1) {
    // video managers page
    sidebars.push( document.getElementById('yt-admin-sidebar-hh') );
    sidebars.push( document.getElementById('improved-dashboard-promo') );
    
} else if (document.URL.indexOf('/account') != -1) {
    // settings pages
    sidebars.push( document.getElementById('creator-sidebar') );
    sidebars.push( document.getElementsByClassName('account-sidebar')[0] );
    
} else if (document.URL.indexOf('/address_book') != -1) {
    // address book page
    sidebars.push( document.getElementById('ab-leftpane') );
    sidebars.push( document.getElementById('ab-main') );
    sidebars.push( document.getElementById('ab-pagination-top') );
    sidebars.push( document.getElementById('ab-current-group-title') );
    
    //sidebars.push( document.getElementsByClassName('account-sidebar')[0] );
    
} else if (document.URL.indexOf('analytics') != -1) {
    // analytics settings page
    // no sidebars as have to do it the special way (below)
    
} else {
    // home page
    sidebars.push( document.getElementById('guide') );
    sidebars.push( document.getElementsByClassName('branded-page-v2-secondary-col')[0] );
    
}

// fix each sidebar type element
function doSidebars() {
    for (var i=0; i < sidebars.length; i++) {
        if(sidebars[i] != null) {
        
            // fix colours
            sidebars[i].style.backgroundColor = sbColor;
            sidebars[i].style.color = 'black';
            
            // give white edge to sidebar text
            sidebars[i].style.textShadow = "0px 0px 6px white";
            
            // make sidebar text bold
            sidebars[i].style.fontWeight = 'bold';
            
        }    
    }
}

doSidebars();


/* PAGE SPECIFIC FIXES */

// watch page specific
if (document.URL.indexOf('/watch') != -1 && !(document.URL.indexOf('/feed/') != -1)) {
    
    // get guide element
    var guide = document.getElementById('guide-container');
    
    // move guide button
    //guide.style.left = '-95px';
    guide.style.top = '0px';
    
    // remove excess padding on playlist bar if it exists
    var plbar = document.getElementById('watch7-playlist-data');
    if(plbar != null)
        plbar.style.paddingLeft = "0px";
        
    // centre and widen search bar
    var sbar = document.getElementById('yt-masthead-content');
    sbar.style.marginLeft = "auto";
    sbar.style.marginRight = "auto";
    sbar.style.width = "auto";
    sbar.style.maxWidth = "100%";
    
}

// upload page specific
else if (document.URL.indexOf('my_videos_upload') != -1) {
    
    // get guide element
    var guide = document.getElementById('upload-sidebar');
    
    // add left padding
    guide.style.paddingLeft = '10px';
    
}

// analytics page specific
else if (document.URL.indexOf('analytics') != -1) {
        
    // run timeout, will run in context of page
    setTimeout(function() {
    
        document.getElementById('yt-admin-sidebar-hh').style.backgroundColor = sbColor;
        document.getElementById('yt-admin-sidebar-hh').style.textShadow = '0px 0px 6px white';
        
        // Arrows are off edge of box, add border to catch them
        document.getElementById('yt-admin-sidebar-hh').style.borderLeft = '20px solid ' + sbColor;
        // Add bottom border
        document.getElementById('yt-admin-sidebar-hh').style.borderBottom = '10px solid ' + sbColor;
        
         // Add borders to content
        document.getElementById('content').style.borderRight = '15px solid white';
        document.getElementById('yt-admin-content').style.backgroundColor = 'white';
    
    }, 2000);
    
}

// my subscriptions settings page (not feed version) page specific
else if (document.URL.indexOf('/my_subscriptions') != -1) {
    
    // Fix alignment of content vs top button bar
    document.getElementById('yt-admin').style.marginLeft = '0px';
    
    // Fix width of top button bar
    document.getElementById('masthead-subnav').style.width = '945px';
    document.getElementById('masthead-subnav').style.borderRight = '25px solid ' + bgColor;
    
}

// video manager page specific
else if (document.URL.indexOf('my_') != -1 || document.URL.indexOf('dashboard') != -1 || document.URL.indexOf('view_all_playlists') != -1 || document.URL.indexOf('inbox') != -1 || document.URL.indexOf('/tags') != -1) {
    
    // Arrows are off edge of box, add border to catch them
    document.getElementById('yt-admin-sidebar-hh').style.borderLeft = '20px solid ' + sbColor;
    // Add bottom border
    document.getElementById('yt-admin-sidebar-hh').style.borderBottom = '10px solid ' + sbColor;
    
    // set background and border on dashboard
    document.getElementById('yt-admin-content').style.backgroundColor = sbColor;
    if(document.URL.indexOf('dashboard') != -1) {
        document.getElementById('yt-admin-content').style.borderRight = '15px solid ' + sbColor;
    }
    
}

// account pages specific
else if (document.URL.indexOf('/account') != -1) {
    
    // Arrows are off edge of box, add border to catch them
    document.getElementById('creator-sidebar').style.borderLeft = '20px solid ' + sbColor;
    // Add bottom border
    document.getElementById('creator-sidebar').style.borderBottom = '10px solid ' + sbColor;
    // Remove gap at top of sidebar
    document.getElementById('creator-sidebar').style.marginTop = '0px';
    
}

// address book page specific
else if (document.URL.indexOf('/address_book') != -1) {
    
    // give it a white bg colour
    document.getElementById('ab-rightcontainer').style.backgroundColor = 'white';
    
    // correct padding around group title
    document.getElementById('ab-current-group-title').style.padding = '12px';
    
}

// home page specific
else {
    // find out if it is definately the home page
    if(document.getElementById('page') != null) {
        if(document.getElementById('page').className.indexOf('home') != -1) {
            // is the home page
            
            // add margin to top of guide to make aligned
            //document.getElementById('guide').style.marginTop = '20px';
            
            
        }
    }
}


/*

LATEST CHANGES v3.1
- Made work on all youtube tld extensions, not just .com
- Added settings option to redirect home page to 'My subscriptions'
- Properly centred watch page
- Fixed top margin of guide on watch and home page

STILL TO DO:
- Make following pages centred:
    all '/inbox' pages
    /address_book (inbox)
    /my_videos_edit (edit video)
    /my_videos_annotate (edit video)
    /my_videos_timedtext (edit video)
    topic pages such as '/music'
- Fix following pages colours:
    /enhance (edit video)
    /audio (edit video)

*/

