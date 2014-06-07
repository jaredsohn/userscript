// ==UserScript==
// @name           Toodledo Navigation fix
// @description    Return old style navigation to Toodledo
// @namespace      tddld
// @include        http*://www.toodledo.com/*

// ==/UserScript==
if (typeof(unsafeWindow) != 'undefined') {
    w = unsafeWindow;
}
else {
    w = window;
}

if(navigator.userAgent.indexOf('iP') === -1 && (navigator.userAgent.indexOf('WebKit') || navigator.userAgent.indexOf('Chrom'))) {
    /* from http://wiki.greasespot.net/Content_Scope_Runner with few hacks */
    if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
        (function page_scope_runner() {
            var my_src = "var __PAGE_SCOPE_RUN__ = true; unsafeWindow = window; (" + page_scope_runner.caller.toString() + ")();";
            var script = document.createElement('script');
            script.setAttribute("type", "application/javascript");
            script.textContent = my_src;
            document.body.appendChild(script);
        })();
        return;
    }
}


/* http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/ */
/* in preparation for porting to chrome */
if(navigator.userAgent.indexOf('WebKit') || navigator.userAgent.indexOf('Chrom')) {
    if (!w.GM_getValue || (w.GM_getValue.toString && w.GM_getValue.toString().indexOf("not supported")>-1)) {
        w.GM_getValue=function (key,def) {
            return localStorage[key] || def;
        };
        w.GM_setValue=function (key,value) {
            return localStorage[key]=value;
        };
        w.GM_deleteValue=function (key) {
            return delete localStorage[key];
        };
    }
}

if (w.location.pathname != '/tasks/' && window.location.pathname != '/tasks/index.php') {
    return;
}



/* from http://diveintogreasemonkey.org/patterns/add-css.html */
addGlobalStyle = function(css) {
    var head, style;
    head = document.getElementsByTagName('body')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.insertBefore(style, head.firstChild);
}

showSidebar = function(persist) {
    var srpl = document.getElementById('sidebar_replacement');
    srpl.innerHTML = '&laquo;';
    srpl.className = 'full';
    srpl.removeEventListener('click',showSidebar, true);
    srpl.addEventListener('click',hideSidebar, true);

    document.getElementById('main').style.background='';
    document.getElementById('left_side').style.display = '';
    document.getElementById('top_oldnav').style.paddingLeft ='';

    if (persist !== 'no') {
        setTimeout(function() {
            GM_setValue('isTDSidebarActive',true);
        }, 0);
    }
}

hideSidebar = function() {
    var srpl = document.getElementById('sidebar_replacement');
    srpl.innerHTML = '&raquo;';
    srpl.className = 'shrunk';
    srpl.removeEventListener('click',hideSidebar, true);
    srpl.addEventListener('click',showSidebar, true);

    document.getElementById('main').style.background='#ffffff';
    document.getElementById('left_side').style.display = 'none';
    document.getElementById('top_oldnav').style.paddingLeft ='15px';
    setTimeout(function() {
        GM_setValue('isTDSidebarActive',false);
    }, 0);

}



manageSidebar = function() {
    var sidebar_active = GM_getValue('isTDSidebarActive',true);
    if (sidebar_active !== 'false' && sidebar_active !== false) {
        showSidebar();
    }
    else {
        hideSidebar();
    }

}

fixBlueWidth = function() {
    document.getElementById('rchunktop').style.width = Math.min(parseInt(document.getElementById('rchunk').style.width,10), 946)+'px' ;
}




function copyViews() {
    var viewsCont = document.getElementById('viewby').cloneNode(true);
    var al = viewsCont.getElementsByTagName('a');
    if (al && al.length > 0) {
        for(var i = 0; i < al.length; i++) {
            al[i].id = al[i].id+'_old';
        }
    }

    var old = document.getElementById('views_oldnav');
    if (old) {
        old.innerHTML = viewsCont.innerHTML;
    }
    else {
        viewsCont.id = 'views_oldnav';
        var nav = document.getElementById('top_oldnav');
        if (nav && nav.appendChild) {
            nav.appendChild(viewsCont);
        }
    }
}

function copyTabs(){
    var subViewsCont = document.getElementById('tabs').cloneNode(true);

    var al = subViewsCont.getElementsByTagName('div');
    if (al && al.length > 0) {
        for(var i = 0; i < al.length; i++) {
            al[i].id = al[i].id+'_old';
        }
    }

    if (w.currentHash == 'folder' || w.currentHash == 'goal' || w.currentHash == 'context') {
        var items = new Array();
        var al = subViewsCont.getElementsByTagName('br');
        if (al && al.length > 0) {
            for (var i = 0; i < al.length; i++) {
                items.push(al[i]);
            }
        }
        var al2 = subViewsCont.getElementsByTagName('input');
        if (al2 && al2.length > 0) {
            for (var i = 0; i < al2.length; i++) {
                items.push(al2[i]);
            }
        }

        var al3 = subViewsCont.getElementsByClassName('onthefly');
        if (al3 && al3.length > 0) {
            for (var i = 0; i < al3.length; i++) {
                items.push(al3[i]);
            }
        }

        if (items.length > 0) {
            for(var i = 0; i < items.length; i++) {
                if (items[i].parentNode){
                    items[i].parentNode.removeChild(items[i]);
                }
            }
        }
    }
    else if (w.currentHash == 'calendar') {
        subViewsCont.innerHTML = '';
        showSidebar('no');
    }


    if (w.currentHash != 'calendar') {
        setTimeout(function() {
            manageSidebar();
        }, 0);
    }
    var old = document.getElementById('subviews_oldnav');
    if (old) {
        old.innerHTML = subViewsCont.innerHTML;
    }
    else {
        subViewsCont.id = 'subviews_oldnav';
        var nav = document.getElementById('top_oldnav');
        if (nav && nav.appendChild) {
            nav.appendChild(subViewsCont);
        }
    }
}




addGlobalStyle(
"\
#banner { display: none; }\
#left_side { padding-top: 0; float: left; }\
#rchunktop {position: static; top: 0; left:0; float: left; padding-left: 10px;}\
#rchunk {padding-top: 10px !important;}\
#top_oldnav {overflow:hidden; background: #ffffff; padding-bottom: 10px; padding-left:190px; position: relative; min-width: 900px;}\
#views_oldnav {padding-top: 5px; padding-bottom: 8px;height: 15px; background: #ffffff;}\
#views_oldnav * {font-size: 0.9em; text-decoration: none; }\
#views_oldnav h3 { display: inline; padding: 0; margin: 0 10px 0 0;}\
#views_oldnav a { margin-right: 15px; padding: 1px 3px;}\
#views_oldnav a:hover { color: black; border-bottom: 1px solid black;}\
#views_oldnav a.selected { color: black; border-bottom: 1px solid black;}\
#subviews_oldnav {padding-top: 5px; background: #ffffff; border-bottom: 1px solid black;}\
#subviews_oldnav .tab, #subviews_oldnav .tabon {display:inline-block; width: auto; font-size: 12px; border-radius: 5px 5px 0 0; padding: 3px; border: 1px solid black; margin-left: 3px; margin-right: 3px; margin-bottom: -1px;} \
#subviews_oldnav .tab a, #subviews_oldnav .tabon a {font-weight: bold;}\
#subviews_oldnav .tabon {border-bottom: 1px solid #ffffff;background: #ffffff;}\
#sidebar_replacement {float: left; display:block; width: 10px; height: 10px; line-height:8px; padding: 5px; margin-left: -23px;  cursor: pointer; background: #DDDDD8; z-index: 1000000; color: #000; border:1px solid #000000; text-align: center; }\
#sidebar_replacement.shrunk {margin-left: -7px; padding-right: 0; height: 300px;}\
#banner {position: static;}\
#origHb {position: absolute; top: -2px; right: 20px; font-size: 14px; color: #000000; padding:1px 5px 5px 5px; cursor:pointer; border-right:1px solid black;border-bottom:1px solid black;border-top:1px solid black;   -webkit-transform:rotate(90deg);-moz-transform:rotate(90deg);}\
#userstylewarning, #footpad, #bottom {display:none;}\
\
"
);


if(navigator.userAgent.indexOf('WebKit') !== -1 || navigator.userAgent.indexOf('Chrom') !== -1) {
addGlobalStyle(
"\
#sidebar_replacement { position: absolute; left: 180px;}\
#sidebar_replacement.shrunk {position: static; left: 0;}\
#main {position: relative;}\
"
);
}


var main_div = document.getElementById('main');

// insert main container
var newCont = document.createElement('div');
newCont.id = 'top_oldnav';
document.body.insertBefore(newCont, main_div);

// create sidebar replacement
var sideBarReplacement = document.createElement('a');
sideBarReplacement.id = 'sidebar_replacement';
sideBarReplacement.innerHTML = '/!\\';

main_div.insertBefore(sideBarReplacement, document.getElementById('left_side').nextSibling);


// button to toggle the original header on/off
var origHb = document.createElement('a');
origHb.id = 'origHb';
origHb.innerHTML = '&raquo;'
origHb.addEventListener('click', function() {
    var banner = document.getElementById('banner');

    if (banner.style.display == 'none' || banner.style.display == '') {
        banner.style.display = 'block';
        this.innerHTML = '&laquo;'
    }
    else {
        banner.style.display = 'none';
        this.innerHTML = '&raquo;'
    }
}, false);

document.getElementById('top_oldnav').appendChild(origHb);


// generate views and tab containers
copyViews();
copyTabs();

/* override views and tab loading function */
// backup the original functions
w.viewByGot_old = w.viewByGot;
w.swap_tabs_old = w.swap_tabs;

// override them with new functions, calling the old ones
w.viewByGot = function(a,b,c) {
    w.viewByGot_old(a,b,c);
    copyViews();
}
w.swap_tabs = function(a) {
    w.swap_tabs_old(a);
    copyTabs();

	var divs = document.getElementById('subviews_oldnav').getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		if (!divs[i] || !divs[i].id || divs[i].id.indexOf('_old') == -1) { continue; }
		divs[i].onclick = function(ev){
			var id = this.id.replace(/_old/,'');
			var el = document.getElementById(id);
			if (el) {
				var evt = document.createEvent("HTMLEvents");
			    evt.initEvent('click', true, true );
			    el.dispatchEvent(evt);
			}
		};
	}
}

if (navigator.userAgent.indexOf('iP') != -1) { // we need to reinit the page for iPhone, strange bugs ... :)
	copyViews();
	copyTabs();
	w.viewByClick();
}
// reset scroll to top when clicking on Main
w.addEventListener("hashchange",function(){
    if (w.currentHash == 'main') {
        w.scrollTo(0,0); // ugly hack ..
    }
    var a=location.href.indexOf("#"),a=(a==-1?"":location.href.substr(a+1)).split("_");w.currentHash!=a[0]&&w.viewByClick();w.currentHash=a[0];
    return false;
},true);


// reset scroll to top when loading #main
w.addEventListener('load', function() {
    var a=location.href.indexOf("#"),a=(a==-1?"":location.href.substr(a+1)).split("_");
    if (a[0] == 'main') {
        setTimeout(function() {w.scrollTo(0,0);}, 100);

    }
}, false);

manageSidebar();

// manage the blue bar width, because it drops when the window is too narrow
w.addEventListener('resize', fixBlueWidth,false);
setInterval(fixBlueWidth, 160);
