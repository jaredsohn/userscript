// ==UserScript==
// @name           Pemirsa  QR
// @description    add a warning message when a spoiler contains hidden link
// @include        */showthread.php*
// @include        */showpost.php*
// @include        */group.php*
// @version        1.20
// @author         arifhn(Founder Father), Chemical.Iqbal(Pemirsa Editor)
// ==/UserScript==

/**
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Changelog:
 * ==========
 *
 * 1.20
 * add button 'Show All' at top & bottom thread. This button can show/hide all spoiler in current page
 *
 * 1.19
 * - add browser support Firefox 5.x
 * - add html tag id (now easy to identify html tag created by KSA)
 *
 * 1.18
 * fix bug: hidden link not detected if bbcode contains space/text between URL and SPOILER
 * bbcode [URL=http://www.foo.com/#] extra space [SPOILER=bar]lol[/SPOILER][/URL]
 * thanks to tuxie.forte
 *
 * 1.17
 * add new feature: preview URL (title + original link)
 *
 * 1.16
 * add browser support Firefox 4.x
 *
 * 1.15
 * - support any standard vbulletin forum (tested on kaskus.us, indoforum.org)
 * - change all warning messages to english
 * - add script update notification
 *
 * 1.14
 * support google chrome
 *
 * 1.13
 * add http://www.kaskus.us/group.php* to @include and change the script to support it
 *
 * 1.12
 * fix bug: link alert (too sensitive, now only check domain name)
 *
 * 1.11
 * - scroll page to closed spoiler after 'Hide All' clicked
 * - hide button Show/Hide All if post contains 1 spoiler
 * - add new feature: fake link alert (show info if link text not equal to link url)
 *
 * 1.10
 * add http://www.kaskus.us/showpost.php* to @include, thanks to hermawanadhis
 *
 * 1.9
 * revert back to 1.7 design with two button ('Show All' and 'Show') and remove the popup menu
 *
 * 1.8
 * - move 'Show All' and 'Show Children' button into popup menu
 * - fixed bug: button label 'Show'/'Hide'
 *
 * 1.7
 * - change button 'Show All' -> 'Show Children' (open/close child spoiler)
 * - add button 'Show All' (open/close all spoilers)
 *
 * 1.6
 * add button 'Show All' to open/close all child spoiler
 *
 * 1.5
 * exclude kaskus smiley from picture counter
 *
 * 1.4
 * add new feature: show how many picture and spoiler inside spoiler
 *
 * 1.3
 * rewrite link detection
 * thanks to "p1nk3d_books"
 *
 * 1.2
 * fixed bug, hidden link not detected if font color changed
 * thanks to "p1nk3d_books"
 *
 * 1.1
 * remove link from spoiler and show the hidden link
 * thanks to "firo sXe" (kaskusid 650045)
 *
 * 1.0
 * first release
 *
 */

var SCRIPT = {
    scripturl:   'http://userscripts.org/scripts/source/73498.user.js',
    version:     '1.20',
    metaurl:  'http://userscripts.org/scripts/source/73498.meta.js'
};

var SHOW_ALL_IMG = 'http://pemirsa.com/u/images/489reply.gif';
var HIDE_ALL_IMG = 'http://pemirsa.com/u/images/203reply2.gif';

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var is_ff4 = navigator.userAgent.toLowerCase().indexOf('firefox/4.') > -1;
var is_ff5 = navigator.userAgent.toLowerCase().indexOf('firefox/5.') > -1;
var lastUrl = '';


function checkUpdate() {
    var interval = 1000*60*60*12; // 12 hour = (12 hour * 60 * 60 * 1000 ms)
    var lastCheck = parseInt(GM_getValue("KASKUS_SPA_LAST_CHECK", "0"));
    if(lastCheck + interval <= new Date().getTime()) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: SCRIPT.metaurl,
            onload: function(response) {
                if(response.status == 200) {
                    var onlineVersion = response.responseText.match(/@version(?:[^\d]+)([\d\.]+)/)[1];
                    if(parseFloat(onlineVersion) > parseFloat(SCRIPT.version)) {
                        var c = confirm("Kaskus Spoiler Alert released a new version "+onlineVersion+", do you want to update?");
                        if(c) {
                            window.location.href = SCRIPT.scripturl;
                        }
                    }
                }
                GM_setValue("KASKUS_SPA_LAST_CHECK", new Date().getTime() + "");
            }
        });
    }
}

function SafeHTML(S) {
    return S.replace(/&/g, "&amp;").
    replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function get(p, c) {
    var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    while ((i = x.iterateNext())) r.push(i);
    return r;
}

function getSpoilers(parent) {
    var spoilers;
    if(is_chrome || is_ff4 || is_ff5) {
        spoilers = get('.//div[@style="margin:20px; margin-top:5px"]//div[@class="alt2"]', parent);
    }else {
        spoilers = get('.//div[@style="margin: 5px 20px 20px;"]//div[@class="alt2"]', parent);
    }
    return spoilers;
}

function openAllSpoiler() {
    var display, showHide;
    if(this.getAttribute('ksa-action') == 'show'){
        for(var i = 0; i < 2; ++i) { // top and bottom showall
            var img = document.getElementById('KSA-showall-' + i);
            if(img) {
                img.setAttribute('ksa-action', 'hide');
                img.src = HIDE_ALL_IMG;
            }
        }
        display = '';
        showHide = 'Hide';
    }else {
        for(var i = 0; i < 2; ++i) { // top and bottom showall
            var img = document.getElementById('KSA-showall-' + i);
            if(img) {
                img.setAttribute('ksa-action', 'show');
                img.src = SHOW_ALL_IMG;
            }
        }

        display = 'none';
        showHide = 'Show';
    }
    var locurl = '/' + basename(location.href, null, "\\?");
    if(locurl == '/group.php') {
        allpost = get('.//div[contains(@id,"gmessage_text_")]');
    }else {
        allpost = get('.//td[contains(@id,"td_post_")]');
    }
    for(var i = 0; i < allpost.length; ++i) { //loop for each post
        var tdpost = allpost[i];
        var spoilers = getSpoilers(tdpost);
        for(var j = 0; j < spoilers.length; ++j) {
            var sp = spoilers[j];
            sp.getElementsByTagName('div')[0].style.display = display;
            sp.parentNode.getElementsByTagName('input')[0].value = showHide + ' All';
            sp.parentNode.getElementsByTagName('input')[1].value = showHide;
        }
    }
    this.scrollIntoView(true);
    window.scrollBy(0, -100);
}

function openSpoiler(evt) {
    var obj;
    var showHide = '';
    var display = 'none';
    if(this.value.substr(0, 4) == 'Show') {
        showHide = 'Hide';
        display = '';
    }else {
        showHide = 'Show';
        display = 'none';
    }

    if(this.getAttribute('spoiler-id')) {
        // button show
        obj = document.getElementById(this.getAttribute('spoiler-id'));

        obj.getElementsByTagName('div')[0].style.display = display;
        obj.parentNode.getElementsByTagName('input')[0].value = showHide + ' All';
        obj.parentNode.getElementsByTagName('input')[1].value = showHide;
    }else {
        obj = document.getElementById(this.getAttribute('tdpost-id'));
    }

    var spoilers = getSpoilers(obj);//get('.//div[@style="margin: 5px 20px 20px;"]//div[@class="alt2"]', obj);
    for(var i = 0; i < spoilers.length; ++i) {
        var sp = spoilers[i];
        sp.getElementsByTagName('div')[0].style.display = display;
        sp.parentNode.getElementsByTagName('input')[0].value = showHide + ' All';
        sp.parentNode.getElementsByTagName('input')[1].value = showHide;
    }

    if(this.getAttribute('tdpost-id') && display == 'none') { // btn 'hide all' clicked
        var prnt = this.parentNode;
        var objParent = this;
        // dapetin spoiler paling atas
        while(prnt != obj) { // loop sampai tdpost
            if(prnt.id && prnt.id.substr(0, 11) == 'KSA-spoiler') {
                objParent = prnt;
            }
            prnt = prnt.parentNode;
        }
        // scroll to spoiler plg atas
        objParent.scrollIntoView(true);
        window.scrollBy(0, -50);
    }
}

function basename(path, suffix, tailcut) {
    // Returns the filename component of the path
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: basename('/www/site/home.htm', '.htm');    // *     returns 1: 'home'
    // *     example 2: basename('ecra.php?p=1');
    var b = path.replace(/^.*[\/\\]/g, '');
    if(typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix)
        b = b.substr(0, b.length-suffix.length);
    if(typeof(tailcut) == 'string')
        b = b.replace(new RegExp(tailcut+".*$", "g"), '');
    return b;
}

function showPreview(e) {
    var url = this.href;
    var ext = url.substr(url.length - 4).toLowerCase();
    if(ext == ".exe" || ext == ".rar" || ext == ".zip" || ext == ".7z" || ext == ".mp3") {
        return;
    }
    if (e.pageX || e.pageY)     {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY)    {
        posx = e.clientX + document.body.scrollLeft
        + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop
        + document.documentElement.scrollTop;
    }
    var popdiv = document.getElementById("KSA-popupdiv");
    popdiv.style.top = (posy+20)+'px';
    popdiv.style.left = (posx-50)+'px';

    if(lastUrl == '' || lastUrl != this.href) {
        lastUrl = this.href;
        popdiv.style.display = 'block';
        popdiv.innerHTML = 'Loading preview...';
        GM_xmlhttpRequest({
            method: 'GET',
            url: lastUrl,
            onerror: function(rsp) {
                popdiv.innerHTML = 'Error loading preview, maybe invalid URL';
            },
            onload: function(rsp) {
                //alert('ok');
                if(rsp.status == 200) {
                    var strTitle = rsp.finalUrl;
                    var strUrl = rsp.finalUrl;
                    var patt=new RegExp("<title>([^<]*)</title>", "i");
                    var title = patt.exec(rsp.responseText);
                    if(title) {
                        strTitle = title[1];
                    }

                    popdiv.innerHTML = '<table cellspacing="1" width="350px"><tr><td class="thead"><b>'+strTitle+'</b></td></tr><tr><td class="vbmenu_option vbmenu_option_alink">'+strUrl+'</td></tr></table>';
                }
            }
        });
    }else {
        popdiv.style.display = 'block';
    }

}

function hidePreview(e) {
    var a = this;

    var current_mouse_target = null;
    if(e.toElement) {
        current_mouse_target = e.toElement;
    }else if(e.relatedTarget) {
        current_mouse_target = e.relatedTarget;
    }
    // Code inside this if is executed when leaving the link and it's children, for good
    if(a != current_mouse_target && !isChildOf(a, current_mouse_target)){
        var popdiv = document.getElementById("KSA-popupdiv");
        popdiv.style.display = 'none';
    }
}

function isChildOf(parent, child) {// Utility function for mouseout listener
    if(child != null){
        while(child.parentNode) {
            if((child = child.parentNode) == parent) {
                return true;
            }
        }
    }
    return false;
}

function main() {
    var allpost;

    var locurl = '/' + basename(location.href, null, "\\?");
    if(locurl == '/group.php') {
        allpost = get('.//div[contains(@id,"gmessage_text_")]');
    }else {
        allpost = get('.//td[contains(@id,"td_post_")]');
    }
    for(var i = 0; i < allpost.length; ++i) { //loop for each post
        var tdpost = allpost[i];

        // remove spoiler jebakan
        //----------------------------
        var links = get('.//a', tdpost);
        for(var j = 0; j < links.length; ++j) { //loop for each link
            var a = links[j];
            var btn = get('.//input[@type="button" and @value="Show"]', a);
            if(btn && btn.length > 0) { // kalau ada button 'Show' berarti spoiler jebakan
                // move children element of the link to its parent node
                var achildren = a.childNodes;
                var n = achildren.length;
                for(var k = 0; k < n; ++k) {
                    a.parentNode.insertBefore(achildren[0], a);
                }
                // change link title to another text
                a.innerHTML = '&nbsp;&nbsp;Hidden Link >> ' + SafeHTML(a.href);
                a.style.color = 'red';
                a.style.textDecoration = 'none';
                a.id = 'KSA-trap-' + tdpost.id + '-' + j;
                btn[0].parentNode.appendChild(a);
            }else {
                // cek link jebakan
                var patt=new RegExp("^\s*http:\/\/[^?\/]+", "i");
                var title = patt.exec(a.innerHTML.trim());

                var url = patt.exec(a.href);
                if(title && url && title.toString() != url.toString()) { // kalo innerHTML starts with http dan gak sama dgn href
                    // buat info link jebakan
                    var info = document.createElement('span');
                    info.id = 'KSA-info1-' + tdpost.id + '-' + j;
                    info.className = 'smallfont';
                    info.style.color = 'red';
                    info.innerHTML = '&nbsp;&nbsp;Original Link >> ' + a.href;
                    if(a.nextSibling) {
                        a.parentNode.insertBefore(info, a.nextSibling); // add info to page
                    }else {
                        a.parentNode.appendChild(info);
                    }

                }
                a.addEventListener('mouseover', showPreview, false);
                a.addEventListener('mouseout', hidePreview, false);
            }
        }
        //----------------------------
        // cek tiap spoiler dalam 1 post
        //----------------------------
        var spoilers = getSpoilers(tdpost); //get('.//div[@style="margin: 5px 20px 20px;"]//div[@class="alt2"]', tdpost);
        for(var j = 0; j < spoilers.length; ++j) {
            var sp = spoilers[j];
            // set spoiler id
            sp.id = 'KSA-spoiler-' + tdpost.id + '-' + j;

            // change event handler for spoiler button
            var btnsp = sp.parentNode.getElementsByTagName('input')[0];
            //btnsp.id = 'btnsp-' + sp.id;
            btnsp.removeAttribute('onclick');
            btnsp.setAttribute('spoiler-id', sp.id);
            //btnsp.setAttribute('tdpost-id', tdpost.id);
            btnsp.addEventListener('click', openSpoiler, true);

            var btnspall = document.createElement('input');
            btnspall.value = "Show All";
            btnspall.type = 'button';
            btnspall.title = 'Show/Hide all spoilers';
            btnspall.style.margin = '2px';
            btnspall.style.fontSize = '10px';//; margin: 0px; padding: 0px;';
            btnspall.setAttribute('tdpost-id', tdpost.id);
            //btnspall.setAttribute('parent-spoiler', parentSpoiler);
            btnspall.addEventListener('click', openSpoiler, true);
            btnsp.parentNode.insertBefore(btnspall, btnsp);

            var infoMsg = '';
            // cek jumlah gambar dalam spoiler
            var imgs = get('.//img', sp);
            if(imgs.length > 0) {
                var maxSize = 0;
                var idx = -1;
                var totalGambar = 0;
                for(var k = 0; k < imgs.length; ++k) {
                    if(imgs[k].src.indexOf('http://static.kaskus.us/images/smilies') == -1) { // ignore kaskus smiley
                        var size = imgs[k].width * imgs[k].height;
                        if(size > 3000) { //ignore icon < 50x50
                            if(maxSize < size) {
                                maxSize = size;
                                idx = k;
                            }
                            ++totalGambar;
                        }
                    }
                }
                if(totalGambar > 0) {
                    infoMsg = totalGambar + ' pics inside (max: ' + imgs[idx].width + 'x' + imgs[idx].height + ') ';
                }
            }
            // cek jumlah inner spoiler
            var innerSpoilers = getSpoilers(sp);
            if(innerSpoilers.length > 0) {
                if(infoMsg.length > 0) {
                    infoMsg += ', ';
                }
                infoMsg += innerSpoilers.length + ' spoiler(s)';
            }
            if(spoilers.length == 1) {
                // hide btn 'show all' if there is only 1 spoiler
                btnspall.style.display = 'none';
            }

            // tampilkan info
            if(infoMsg.length > 0) {
                var info = document.createElement('span');
                info.id = 'KSA-info2-'+ tdpost.id + '-' + j;
                info.className = 'smallfont';
                info.style.color = 'darkblue';
                info.innerHTML = infoMsg;
                sp.parentNode.insertBefore(info, sp);
            }
        }
    }

    // popup div for preview url
    var popdiv = document.createElement('div');
    popdiv.id = 'KSA-popupdiv';
    popdiv.setAttribute('class', 'vbmenu_popup');
    popdiv.style.display='none';
    popdiv.style.position='absolute';
    popdiv.style.top = '50px';
    popdiv.style.left = '50px';
    popdiv.style.backgroundColor='#ffffff';
    document.getElementsByTagName("body")[0].appendChild(popdiv);

    // button for show all spoiler in one page
    var tdShowAll = get('.//img[@alt="Reply" and @title="Reply"]');
    for(var i = 0; i < tdShowAll.length; ++i) {
        var showAll = document.createElement('img');
        showAll.id = 'KSA-showall-'+i;
        showAll.setAttribute('ksa-action', 'show');
        showAll.src = SHOW_ALL_IMG;
        showAll.addEventListener('click', openAllSpoiler, true);

        //document.getElementsByTagName("body")[0].appendChild(logo);
        tdShowAll[i].parentNode.parentNode.appendChild(showAll);
    }
}
checkUpdate();
main();

