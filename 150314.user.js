// ==UserScript==
// @name       Atlas Fixer
// @namespace  http://www.dkc-atlas.com/
// @version    0.19b
// @description  Minor tweaks for the dkc-atlas.com forums.
// @include      http://dkc-atlas.com/forum/*
// @include      http://www.dkc-atlas.com/forum/*
// @include      http://dkca.net/forum/*
// @include      http://www.dkca.net/forum/*
// @updateURL http://userscripts.org/scripts/source/150314.user.js
// @copyright  Kingizor
// ==/UserScript==

function add_style(css) {
    document.documentElement.appendChild(document.createElement('style')).appendChild(document.createTextNode(css));
}

var x = window.location.href;

add_style("body li.header dl.icon dt {font-size: 1em;top:0px;text-shadow:0px 0px;} body li.header dl.icon {font-size:1em; top:0px;} body a.forumtitle {text-shadow:0px 0px; font-size:120%;} body dl dt a.topictitle {font-weight:bold; font-size:120%;} body .signature a {text-decoration:none;} body .postbody h3 a.topic {display: block; padding-bottom:5px;} body p.author a {font-size:100%;} body p.author a + strong a {font-size:100%;} .postlink {border-bottom:0px;} .postprofile .avatar-card{border:none;box-shadow:none;background:transparent;} .avatar-card img{max-width:100%;height:auto} .postbody h3 {display:inline;font-size:1.4em;} .postbody h3.first{display:inline;font-size:1.4em;} #mChatData span .username-coloured{font-size:1.0em;} li.header dd {font-size: 1.0em; margin:4px 0px; padding-top:0px;padding-bottom:0px;} ");

if (x.search("viewtopic.php") != -1) {
    for (var i = 0; i < document.getElementsByClassName('postprofile').length; i++) {
        var ddlength = document.getElementsByClassName('postprofile')[i].getElementsByTagName('dd').length;
        var k = 1;
        if (document.getElementsByClassName('postprofile')[i].getElementsByClassName('web-icon')[0]) {
            document.getElementsByClassName('postprofile')[i].removeChild(document.getElementsByClassName('postprofile')[i].getElementsByClassName('web-icon')[0].parentNode.parentNode);
        } // URL
        if (document.getElementsByClassName('icon-ucp')[0] && document.getElementsByClassName('thanks-icon')[0]) {
            if (document.getElementsByClassName('postprofile')[i].parentNode.getElementsByClassName('postbody')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[2]) {
                document.getElementsByClassName('postprofile')[i].parentNode.getElementsByClassName('postbody')[0].getElementsByTagName('ul')[0].removeChild(document.getElementsByClassName('postprofile')[i].parentNode.getElementsByClassName('postbody')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[2]);
            } // Give Banana
        }
        document.getElementsByClassName('back2top')[i].removeChild(document.getElementsByClassName('back2top')[i].getElementsByClassName('top')[0]);
    }
    for (var i = 0; i < document.getElementsByClassName('postbody').length; i++) {
        if (document.getElementsByClassName('postbody')[i].innerHTML.search('Banana received for this post') != -1) {
            document.getElementsByClassName('postbody')[i].removeChild(document.getElementsByClassName('postbody')[i].getElementsByTagName('div')[document.getElementsByClassName('postbody')[i].getElementsByTagName('div').length - 1]);
        }
    }
}

while(document.getElementsByClassName('banana-tally').length > 0){
 document.getElementsByClassName('banana-tally')[0].parentNode.removeChild(document.getElementsByClassName('banana-tally')[0]);
}

if (document.getElementsByTagName('body')[0].innerHTML.search('<h3>Banana tallies</h3>') != -1) {
    var thlist = document.getElementById('page-body').getElementsByTagName('p')[document.getElementById('page-body').getElementsByTagName('p').length - 2];
    document.getElementById('page-body').removeChild(thlist);
    var thhead = document.getElementById('page-body').getElementsByTagName('h3')[document.getElementById('page-body').getElementsByTagName('h3').length - 2];
    document.getElementById('page-body').removeChild(thhead);
}
if (document.getElementsByClassName('icon-thanks')[0]) {
    document.getElementsByClassName('icon-thanks')[0].parentNode.removeChild(document.getElementsByClassName('icon-thanks')[0]);
}
if (document.getElementById('chat-invite-link')) {
    document.getElementById('chat-invite-link').parentNode.removeChild(document.getElementById('chat-invite-link'));
}
var mL = document.getElementsByClassName('mobile-style-switch mobile-style-switch-header');
if (mL) {
    for (var i = 0; i < mL.length; i++) {
        mL[i].parentNode.removeChild(mL[i]);
    }
}
var mL2 = document.getElementsByClassName('mobile-style-switch mobile-style-switch-footer');
if (mL2) {
    for (var i = 0; i < mL2.length; i++) {
        mL2[i].parentNode.removeChild(mL2[i]);
    }
} // Bloated, clumsy.

function close_search() {
    var sbox = document.getElementById("sbox");
    sbox.parentNode.removeChild(sbox);
}

function search_box() {
    var get_search = new XMLHttpRequest();
    get_search.open("GET", "search.php", true);
    get_search.send();
    get_search.onreadystatechange = function () {

        if (get_search.readyState == 4 && get_search.status == 200) {
            var sbox = document.createElement('div');
            sbox.setAttribute("id", "sbox");
            add_style("#sbox {position:fixed; top:10px;right:10px;display:block;border:1px solid black;width:640px; height:480px;overflow-y:scroll;background-color:#FFFFFF;}");
            var sdata = get_search.responseText;
            var sdatb = sdata.search('<form method="get"');
            var sdatc = sdata.search('</form>') + 7;
            sdata = sdata.substring(sdatb, sdatc);
            sbox.innerHTML = sdata;
            var close = document.createElement('input');
            close.addEventListener("click", close_search, false);
            close.setAttribute("type", "button");
            close.setAttribute("value", "Close");
            close.setAttribute("class", "button2");
            sbox.getElementsByTagName('fieldset')[2].appendChild(close);
            document.body.appendChild(sbox);
        }
    };
}

function styleme(a, b, c, d, e, f, g, h, i, j) {
    add_style("body .forabg, body .forumbg{background-color:" + a + ";background-image:" + b + ";} body ul.forums, body .panel{background-color:" + c + ";background-image:" + d + ";} body li.row{border-bottom-color:" + e + ";} body a:visited, body a:link, body h3, body .postprofile a:link, body .postprofile a:visited, body .postprofile dt.author a, body .content h2, body .panel h2{color:" + f + ";} body table.table1 tbody tr:hover{background-color:" + g + ";} body .pagination span strong{background-color:" + h + ";border-color:" + h + ";} body .bg1 {background-color:" + i + ";} body .bg2 {background-color:" + j + ";}");
}

// Default

function stylecookie() {

    var cookieposition = document.cookie.search("style=");
    var cookiecrop = document.cookie.substr(cookieposition + 6, 1);

    switch (cookiecrop) {

        case "0":
            styleme('#0076B1', 'url("./styles/atlas1/theme/images/bg_list.gif")', '#EEF5F9', 'url("./styles/atlas1/theme/images/gradient.gif")', '#00608F', '#105289', '#CFE1F6', '#4692BF', '#ECF3F7', '#E1EBF2');
            break;

        case "1":
            styleme('#B17600', 'none', '#F9F5EE', 'none', '#8F6000', '#895210', '#D6D4B0', '#895210', '#F7F3EC', '#F2EBE1');
            break;

        case "2":
            styleme('#76B100', 'none', '#F5F9EE', 'none', '#608F00', '#528910', '#D4D6B0', '#528910', '#F3F7EC', '#EBF2E1');
            break;

        case "3":
            styleme('#00B176', 'none', '#EEF9F5', 'none', '#008F60', '#108952', '#B0D6D4', '#108952', '#ECF7F3', '#E1F2EB');
            break;

        case "4":
            styleme('#7600B1', 'none', '#F5EEF9', 'none', '#60008F', '#521089', '#D4B0D6', '#521089', '#F3ECF7', '#EBE1F2');
            break;

        case "5":
            styleme('#B10076', 'none', '#F9EEF5', 'none', '#8F0060', '#891052', '#D6B0D4', '#891052', '#F7ECF3', '#F2E1EB');
            break;

        case "6":
            styleme('#444444', 'none', '#EEEEEE', 'none', '#777777', '#555555', '#CCCCCC', '#555555', '#EEEEEE', '#E1E1E1');
            break;

        default:
            defaultstyle();
            break;

    }

    if (document.getElementById("styler")) {
        var styler = document.getElementById("styler");
        styler.selectedIndex = cookiecrop;
    }
}

if (document.getElementById("search")) {
    document.getElementById("search").getElementsByTagName('a')[0].href = '#';
    add_style("#search a{cursor:pointer;}");
    document.getElementById("search").getElementsByTagName('a')[0].addEventListener("click", search_box, false);
}

if (x.search("ucp.php") == -1 && x.search("mcp.php") == -1 && x.search("/adm/") == -1) {

    if (document.getElementById("page-footer").getElementsByClassName('inner')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[1]) {

        var styler = document.createElement('select');
        var option1 = document.createElement('option');
        var option2 = document.createElement('option');
        var option3 = document.createElement('option');
        var option4 = document.createElement('option');
        var option5 = document.createElement('option');
        var option6 = document.createElement('option');
        var option7 = document.createElement('option');
        option1.value = "Default";
        option2.value = "Desert";
        option3.value = "Autumn";
        option4.value = "Forest";
        option5.value = "Amethyst";
        option6.value = "Rose";
        option7.value = "City";
        option1.innerHTML = "Default";
        option2.innerHTML = "Desert";
        option3.innerHTML = "Autumn";
        option4.innerHTML = "Forest";
        option5.innerHTML = "Amethyst";
        option6.innerHTML = "Rose";
        option7.innerHTML = "City";
        styler.options.add(option1);
        styler.options.add(option2);
        styler.options.add(option3);
        styler.options.add(option4);
        styler.options.add(option5);
        styler.options.add(option6);
        styler.options.add(option7);
        styler.setAttribute('id', "styler");
        var sp = document.getElementById("page-footer").getElementsByClassName('inner')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[1];
        var bll = document.createElement('span');
        bll.innerHTML = " &bull; ";
        sp.insertBefore(bll, sp.firstChild);
        sp.insertBefore(styler, sp.firstChild);

        styler.addEventListener("change", function () {
            var index = styler.selectedIndex;
            var expiredate = new Date();
            expiredate.setMonth(expiredate.getMonth() + 12);
            document.cookie = "style=" + index + "; expires=" + expiredate.toGMTString() + ";";
            stylecookie();
        });

        if (document.cookie.search("style=") == -1) {
            var expiredate = new Date();
            expiredate.setMonth(expiredate.getMonth() + 12);
            document.cookie = "style=0; expires=" + expiredate.toGMTString() + ";";
        }
    }
    stylecookie();
}