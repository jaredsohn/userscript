// ==UserScript==
// @name           imdbsearch2leech
// @namespace      http://local.test
// @description    Based on imdb2leech this script does the same but on the search result page.
// @version        0.2
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// Preference window for userscripts:

// @require        http://userscripts.org/scripts/source/107512.user.js

// @require        http://userscripts.org/scripts/source/106223.user.js
// @include        http://*.imdb.com/search/title*
// @include        http://*.imdb.de/search/title*
// @include        http://*.imdb.es/search/title*
// @include        http://*.imdb.fr/search/title*
// @include        http://*.imdb.it/search/title*
// @include        http://*.imdb.pt/search/title*
// @include        http://*.imdb.com/name/*
// @include        http://*.imdb.de/name/*
// @include        http://*.imdb.es/name/*
// @include        http://*.imdb.fr/name/*
// @include        http://*.imdb.it/name/*
// @include        http://*.imdb.pt/name/*
// ==/UserScript==

/** Changelog

    0.1	- Init release
    0.1.2 - Quick bug fix
    0.2 -   Added Update Script Check
            Preferences Window
            Removed XvidME (Dead)
            Removed TVTrackers (By now, I'll add them again later)
            Changed TehC to search by IMDb Id
*/

//update script
var SUC_script_num = 114646; // Change this to the number given to the script by userscripts.org (check the address bar)
try {
    function updateCheck(forced) {
        if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) {
            try {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'http://userscripts.org/scripts/source/' + SUC_script_num + '.meta.js?' + new Date().getTime(),
                    headers: {
                        'Cache-Control': 'no-cache'
                    },
                    onload: function (resp) {
                        var local_version, remote_version, rt, script_name;
                        rt = resp.responseText;
                        GM_setValue('SUC_last_update', new Date().getTime() + '');
                        remote_version = parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
                        local_version = parseInt(GM_getValue('SUC_current_version', '-1'));
                        if (local_version != -1) {
                            script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                            GM_setValue('SUC_target_script_name', script_name);
                            if (remote_version > local_version) {
                                if (confirm('There is an update available for the Greasemonkey script "' + script_name + '."\nWould you like to go to the install page now?')) {
                                    GM_openInTab('http://userscripts.org/scripts/show/' + SUC_script_num);
                                    GM_setValue('SUC_current_version', remote_version);
                                }
                            } else if (forced) alert('No update is available for "' + script_name + '."');
                        } else GM_setValue('SUC_current_version', remote_version + '');
                    }
                });
            } catch (err) {
                if (forced) alert('An error occurred while checking for updates:\n' + err);
            }
        }
    }
    GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function () {
        updateCheck(true);
    });
    updateCheck(false);
} catch (e) {GM_log(e);}

// Default preferences are stored in two places: defaults settings      

// for USP (here) and defaults for GM_getValue (below).  Make sure to   

// change both if you change one.  

try {

    USP.theScriptName = 'imdbsearch2leech';

    USP.init({

        theName: 'perform_on_start',

        theText: 'Perform on start?:',

        theDefault: false

    }, {

        theName: 'show_strikeout_links',

        theText: 'Show crossed-out search misses?',

        theDefault: false

    }, {

        theName: 'debug_imdb2leech',

        theText: 'Enable debugging code?',

        theDefault: true

    }, {

        theName: 'show_advd',

        theText: 'Show ADVD?',

        theDefault: true

    }, {

        theName: 'show_ahd',

        theText: 'Show AHD?',

        theDefault: true

    }, {

        theName: 'show_bithd',

        theText: 'Show BitHD?',

        theDefault: true

    }, {

        theName: 'show_cc',

        theText: 'Show CC?',

        theDefault: true

    }, {

        theName: 'show_cg',

        theText: 'Show CG?',

        theDefault: true

    }, {

        theName: 'show_chd',

        theText: 'Show CHD?',

        theDefault: true

    }, {

        theName: 'show_demo',

        theText: 'Show Demo?',

        theDefault: true

    }, {

        theName: 'show_dhive',

        theText: 'Show DHive?',

        theDefault: true

    }, {

        theName: 'show_ethor',

        theText: 'Show eThor?',

        theDefault: true

    }, {

        theName: 'show_fss',

        theText: 'Show FSS?',

        theDefault: true

    }, {

        theName: 'show_fy',

        theText: 'Show FY?',

        theDefault: true

    }, {

        theName: 'show_goem',

        theText: 'Show Goem?',

        theDefault: true

    }, {

        theName: 'show_hdme',

        theText: 'Show HDME?',

        theDefault: true

    }, {

        theName: 'show_hdstar',

        theText: 'Show HDStar?',

        theDefault: true

    },{

        theName: 'show_hh',

        theText: 'Show HH?',

        theDefault: true

    },{

        theName: 'show_ilc',

        theText: 'Show ILC?',

        theDefault: true

    }, {

        theName: 'show_iplay',

        theText: 'Show iPlay?',

        theDefault: true

    }, {

        theName: 'show_kara',

        theText: 'Show Kara?',

        theDefault: true

    }, {

        theName: 'show_ll',

        theText: 'Show LL?',

        theDefault: true

    }, {

        theName: 'show_mt',

        theText: 'Show MT?',

        theDefault: true

    }, {

        theName: 'show_ps',

        theText: 'Show PS?',

        theDefault: true

    }, {

        theName: 'show_ptp',

        theText: 'Show PTP?',

        theDefault: true

    },{

        theName: 'show_ptpreq',

        theText: 'Show ptp-req?',

        theDefault: true

    }, {

        theName: 'show_revtt',

        theText: 'Show RevTT?',

        theDefault: true

    }, {

        theName: 'show_scandbits',

        theText: 'Show ScandBits?',

        theDefault: true

    }, {

        theName: 'show_scc',

        theText: 'Show SCC?',

        theDefault: true

    }, {

        theName: 'show_sccarc',

        theText: 'Show SCC-arc?',

        theDefault: true

    }, {

        theName: 'show_sdbits',

        theText: 'Show SDbits?',

        theDefault: true

    }, {

        theName: 'show_sm',

        theText: 'Show SM?',

        theDefault: false

    }, {

        theName: 'show_stf',

        theText: 'Show STF?',

        theDefault: false

    }, {

        theName: 'show_tehc',

        theText: 'Show TehC?',

        theDefault: true

    }, {

        theName: 'show_tik',

        theText: 'Show Tik?',

        theDefault: true

    }, {

        theName: 'show_tb',

        theText: 'Show TB?',

        theDefault: false

    }, {

        theName: 'show_tdc',

        theText: 'Show TDC?',

        theDefault: true

    }, {

        theName: 'show_te',

        theText: 'Show TE?',

        theDefault: true

    }, {

        theName: 'show_tg',

        theText: 'Show TG?',

        theDefault: true

    }, {

        theName: 'show_thc',

        theText: 'Show THC?',

        theDefault: true

    },{

        theName: 'show_tpb',

        theText: 'Show TPB?',

        theDefault: false

    }, {

        theName: 'show_x264',

        theText: 'Show X264?',

        theDefault: true

    });



    GM_registerMenuCommand('Preferences for ~' + USP.theScriptName + '~', USP.invoke);

} catch (e) {GM_log(e);};
// Default preferences are stored in two places: defaults settings for  
// USP (above), and defaults for GM_getValue (below).  Make sure to     
// change both if you change one.                                       
var show_strikeout_links = GM_getValue('show_strikeout_links', false);
var debug_imdb2leech = GM_getValue('debug_imdb2leech', true);
var retard_cant_middle_click = false;
var perform_on_start = GM_getValue('perform_on_start', false);

var show_cg = GM_getValue('show_cg', true);
var show_tpb = GM_getValue('show_tpb', false);
var show_demo = GM_getValue('show_demo', true);
var show_kara = GM_getValue('show_kara', true);
var show_tik = GM_getValue('show_tik', true);
var show_sm = GM_getValue('show_sm', false);
var show_ilc = GM_getValue('show_ilc', true);
var show_goem = GM_getValue('show_goem', true);
var show_scc = GM_getValue('show_scc', true);
var show_sdbits = GM_getValue('show_sdbits', true);
var show_ethor = GM_getValue('show_ethor', false);
var show_x264 = GM_getValue('show_x264', true);
var show_fss = GM_getValue('show_fss', false);
var show_hdme = GM_getValue('show_hdme', true);
var show_dhive = GM_getValue('show_dhive', false);
var show_chd = GM_getValue('show_chd', false);
var show_ptpreq = GM_getValue('show_ptpreq', true);
var show_advd = GM_getValue('show_advd', true);
var show_sccarc = GM_getValue('show_sccarc', false);
var show_ptp = GM_getValue('show_ptp', true);
var show_bithd = GM_getValue('show_bithd', true);
var show_revtt = GM_getValue('show_revtt', true);
var show_ahd = GM_getValue('show_ahd', true);
var show_iplay = GM_getValue('show_iplay', false);
var show_scandbits = GM_getValue('show_scandbits', false);
var show_te = GM_getValue('show_te', false);
var show_tb = GM_getValue('show_tb', false);
var show_tg = GM_getValue('show_tg', false);
var show_ll = GM_getValue('show_ll', false);
var show_mt = GM_getValue('show_mt', false);
var show_tdc = GM_getValue('show_tdc', false);
var show_fy = GM_getValue('show_fy', false);
var show_tehc = GM_getValue('show_tehc', true);
var show_stf = GM_getValue('show_stf', false);
var show_cc = GM_getValue('show_cc', false);
var show_ps = GM_getValue('show_ps', false);
var show_thc = GM_getValue('show_thc', true);
var show_hh = GM_getValue('show_hh', false);
var show_hdstar = GM_getValue('show_hdstar', false);

//adds links to field
function add_link(elem, search_url, link_text, strikeout)
{
    var a = $('<a />')
        .attr('href',search_url)
        .attr('target','_blank').html(link_text);

    if(!strikeout)
    {
        var result_box = $(elem).find('td.result_box');
        if(result_box.length > 0)
        {
            $(result_box).append(a);
        }
        else
        {
            $(elem).append($('<td />').append(a).addClass('result_box'));
        }
    }
}

function maybe_add_link(elem, link_text, search_urls, search_fail_match) {
    var search_url;
    if (typeof (search_urls) == 'object') {
        search_url = search_urls[0];
        search_urls.shift();
    } else {
        search_url = search_urls;
        search_urls = new Array;
    }
    var google_chrome = /chrome/.test(navigator.userAgent.toLowerCase());
    if (google_chrome) {
        add_link(elem, search_url, link_text, false);
    } else {
        GM_xmlhttpRequest({
            method: 'GET',
            url: search_url,
            onload: function (responseDetails) {
                if (String(responseDetails.responseText).match(search_fail_match)) {
                    if (search_urls.length) {
                        maybe_add_link(elem,link_text, search_urls, search_fail_match);
                    } else {
                        if (show_strikeout_links)
                        {
                            add_link(elem, search_url, link_text, true);
                        }
                        if(link_text == 'PTP')
                        {
                            var box = $(elem).find('td.result_box');
                            if(box.length > 0)
                            {
                                box.css('background-color','green');
                            }
                            else
                            {
                                $(elem).append($('<td />').css('background-color','green').addClass('result_box'));
                            }
                        }
                    }
                } else {
                    add_link(elem,search_url, link_text, false);
                }

                if (debug_imdb2leech) {
                    GM_log([responseDetails.finalUrl + ' => ' + responseDetails.statusText, "", responseDetails.responseHeaders, responseDetails.responseText].join("\n"));
                }
            }
        });
    }
}

//run code to create field and display sites
function perform(elem, movie_id, movie_title) {
        var tt = 'tt' + movie_id;
        var nott = movie_id;
        var title = movie_title;
        var search_string = title.replace(/ +\(.*/, '').replace(/[^a-zA-Z0-9]/g, ' ').replace(/ +/g, '+');
        var search_string = title.replace(/ +\(.*/, '').replace(/ +/g, '+');

            if (show_cg) {
                maybe_add_link(elem,'CG', Array('http://cinemageddon.net/browse.php?search=' + tt, 'http://cinemageddon.net/browse.php?descr=1&search=t' + nott), /<h2>Nothing found!<\/h2>|<h1>Not logged in!<\/h1>/);
            }

            if (show_tpb) {
                maybe_add_link(elem,'TPB', 'https://thepiratebay.org/search/' + tt, /No hits. Try adding an asterisk in you search phrase.<\/h2>/);
            }

            if (show_demo) {
                maybe_add_link(elem,'Demo', 'http://www.demonoid.me/files/?query=' + tt, /<b>No torrents found<\/b>|We are currently performing the daily site maintenance.<br>/);
            }

            if (show_kara) {
                maybe_add_link(elem,'Kara', 'http://www.karagarga.net/browse.php?search_type=imdb&search=' + nott, /<h2>Nothing found!<\/h2>|<h1>Not logged in!<\/h1>/);
            }

            if (show_tik) {
                maybe_add_link(elem,'Tik', 'http://cinematik.net/browse.php?srchdtls=1&incldead=1&search=' + tt, /The page you tried to view can only be used when you're logged in|<h2>Nothing found!<\/h2>/);
            }

            if (show_sm) {
                maybe_add_link(elem,'SM', Array('http://www.surrealmoviez.info/advanced_search.php?simdb=' + tt, 'http://www.surrealmoviez.info/search.php?stext=' + tt), /0 Movies found matching search criteria|You need to be logged in to view this page/);
            }

            if (show_ilc) {
                maybe_add_link(elem,'ILC', 'http://www.iloveclassics.com/browse.php?incldead=1&searchin=2&search=' + tt, /Try again with a refined search string|<h1>Not logged in!<\/h1>/);
            }

            if (show_goem) {
                maybe_add_link(elem,'Goem', 'http://goem.org/browse.php?s_type=2&cat=0&search=' + tt, /Try again with a refined searchstring|<h1>Note: You need cookies enabled to log in.<\/h1>/);
            }

            if (show_scc) {
                maybe_add_link(elem,'SCC', 'http://sceneaccess.org/browse?method=1&search=' + tt, /Try again with a refined search string.|<h1>Note: Three (3) failed login attempts will result in a temporary security lockout.<\/h1>/);
            }

            if (show_sdbits) {
                maybe_add_link(elem,'SDBits', 'http://sdbits.org/browse.php?c6=1&c3=1&c1=1&c4=1&c5=1&c2=1&m1=1&incldead=0&from=&to=&imdbgt=0&imdblt=10&uppedby=&imdb=&search=' + tt, /Nothing found!|<h1>You need cookies enabled to log in.<\/h1>/);
            }

            if (show_ethor) {
                maybe_add_link(elem,'eThor', 'http://ethor.net/browse.php?stype=b&c23=1&c20=1&c42=1&c5=1&c19=1&c25=1&c6=1&c37=1&c43=1&c7=1&c9=1&advcat=0&incldead=0&includedesc=1&search=' + tt, /Try again with a refined search string.|<h1>Note: Vous devez activer vos 'cookies' pour pouvoir vous identifier.<\/h1>/);
            }

            if (show_x264) {
                maybe_add_link(elem,'x264', 'http://x264.me/browse.php?incldead=0&xtype=0&stype=3&search=' + tt, /Try again with a refined search string.|<h1>Forgot your password?<\/h1>/);
            }

            if (show_fss) {
                maybe_add_link(elem,'FSS', 'http://fss.omnilounge.co.uk/browse.php?blah=2&cat=0&incldead=1&search=' + tt, /Try again with a different search string?|<h1>You need cookies enabled to log in.<\/h1>/);
            }

            if (show_hdme) {
                maybe_add_link(elem,'HDME', 'http://hdme.eu/browse.php?blah=2&cat=0&incldead=1&search=' + tt, /Try again with a refined search string.|<h1>You need cookies enabled to log in.<\/h1>/);
            }

            if (show_dhive) {
                maybe_add_link(elem,'DHive', 'http://www.digitalhive.org/browse.php?cat=0&blah=2&search=' + tt, /Try again with a refined search string.|<h1>You need cookies enabled to log in.<\/h1>/);
            }

            if (show_chd) {
                maybe_add_link(elem,'CHD', 'http://chdbits.org/torrents.php?incldead=1&spstate=0&inclbookmarked=0&search_area=4&search_mode=0&search=' + tt, /Nothing found! Try again with a refined search string.|<h1>You need cookies enabled to log in or switch language.<\/h1>/);
            }

            if (show_ptpreq) {
                maybe_add_link(elem,'PTP-Req', 'http://passthepopcorn.me/requests.php?submit=true&search=' + tt, /Nothing found!|<h1>Keep me logged in.<\/h1>/);
            }

            if (show_advd) {
                maybe_add_link(elem,'ADVD', 'http://asiandvdclub.org/browse.php?descr=1&btnSubmit=Submit&search=' + tt, /Your search returned zero results|<h1>You need cookies enabled to log in.<\/h1>/);
            }

            if (show_iplay) {
                maybe_add_link(elem,'iPlay', 'http://www.iplay.ro/browse.php?genre=1&status=0&search=' + tt, /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/);
            }

            if (show_scandbits) {
                maybe_add_link(elem,'ScandBits', 'http://scanbits.org/browse.php?cat=0&incldead=0&mode=0&search=' + tt, /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/);
            }

            if (show_te) {
                maybe_add_link(elem,'TE', 'http://theempire.bz/browse.php?incldead=0&country=&nonboolean=1&search=' + tt, /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/);
            }

            if (show_tb) {
                maybe_add_link(elem,'TB', 'http://thebox.bz/browse.php?incldead=0&country=&nonboolean=1&search=' + tt, /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/);
            }

            if (show_tg) {
                maybe_add_link(elem,'TG', 'http://thegeeks.bz/browse.php?incldead=0&country=&nonboolean=1&search=' + tt, /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/);
            }

            if (show_ll) {
                maybe_add_link(elem,'LL', 'http://www.leecherslair.com/browse.php?blah=1&incldead=0&search=' + tt, /Try again with a refined search string|<h1>This site is under construction<\/h1>/);
            }

            if (show_mt) {
                maybe_add_link(elem,'MT', 'http://www.maroctorrent.net/torrents-search.php?cat=42&incldead=1&search=' + tt, /Aucun torrent|<h1>Les Cookies DOIVENT<\/h1>/);
            }

            if (show_tdc) {
                maybe_add_link(elem,'TDC', 'http://thedvdclub.org/browse.php?cat=0&blah=1&incldead=1&search=' + tt, /Try again with a refined search string|<h1>Cookies must be enabled for you to log in<\/h1>/);
            }

            if (show_fy) {
                maybe_add_link(elem,'FY', 'https://fuckyeahtorrents.com/browse.php?_by=2&cat=0&search=' + tt, /Try again with a refined search string|<h1>You need cookies enabled to log in.<\/h1>/);
            }

            if (show_sccarc) {
                maybe_add_link(elem,'SCC-ARC', 'http://sceneaccess.org/archive?=&method=1&search=' + tt, /Try again with a refined search string.|<h1>Note: Three (3) failed login attempts will result in a temporary security lockout.<\/h1>/);
            }

            if (show_ptp) {
                maybe_add_link(elem,'PTP', 'http://passthepopcorn.me/torrents.php?imdb=' + tt, /<h2>Your search did not match anything.<\/h2>/);
            }

            if (show_bithd) {
                maybe_add_link(elem,'BitHD', 'http://www.bit-hdtv.com/torrents.php?cat=0&description_search=1&search=' + tt, /<h2>No match!<\/h2>/);
            }

            if (show_revtt) {
                maybe_add_link(elem,'RevTT', 'https://www.revolutiontt.net/browse.php?search=' + tt, /<h2>Nothing found!<\/h2>/);
            }

            if (show_ahd) {
                maybe_add_link(elem,'AHD', 'http://awesome-hd.net/torrents.php?id=' + tt, /<h2>Error 404<\/h2>/);
            }

            if (show_tehc) {
                maybe_add_link(elem,'TehC', 'http://tehconnection.eu/torrents.php?searchstr=' + tt, /You will be banned for 6 hours after your login attempts run out.|<h2>No Search Results, try reducing your search options.<\/h2>/);
            }

            if (show_cc) {
                maybe_add_link(elem,'CC', 'http://www.cine-clasico.com/foros/search.php?terms=any&author=&sc=1&sf=all&sr=posts&sk=t&sd=d&st=0&ch=300&t=0&submit=Search&keywords=' + tt, /You will be banned for 6 hours after your login attempts run out.|You must specify at least one word to search for. Each word must consist of at least 3 characters and must not contain more than 14 characters excluding wildcards.|Disculpe, no le está permitido usar el sistema de búsqueda./);
            }

            if (show_stf) {
                maybe_add_link(elem,'STF', 'http://sharethefiles.com/forum/search.php?terms=all&author=&sc=1&sf=all&sk=t&sd=d&sr=topics&st=0&ch=300&t=0&submit=Search&keywords=' + tt, /You will be banned for 6 hours after your login attempts run out.|<h2>No Search Results, try reducing your search options.<\/h2>/);
            }
			
			if (show_ps) {
                maybe_add_link(elem,'PS', 'http://polishsource.org/browse.php?incldead=0&scene=0&pl=0&sub=&search_in=both&free=0&search=' + tt, /Nic nie znaleziono|Musisz|login/);
            }
			
			if (show_thc) {
                maybe_add_link(elem,'THC', 'http://horrorcharnel.kicks-ass.org/browse.php?title=3&search=' + tt, /<h1>Not logged in!<\/h1>|Nothing found!/);
            }
			
			if (show_hh){
				maybe_add_link(elem,'HH', 'http://www.horrorhaven.org/search.php?stype=articles&stext=' + tt,/0 Articles found matching search criteria/);
			}
			
			if (show_hdstar){
				maybe_add_link(elem,'HDStar', 'http://www.hdstar.org/torrents.php?incldead=1&spstate=0&inclbookmarked=0&search_area=1&search_mode=0&search=' + tt,/Try again with a refined search string|You need cookies enabled to log in or switch language/);
			}
}

//------------------------------------------------------------
// Button Code
//-------------------------------------------------------------
// utility fn for button insertion into DOM


function insertAfter(newElement, targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    //if the parents lastchild is the targetElement...
    if (parent.lastchild == targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

//displays button if perform_on_start is false

function display_button() {

    var btn = document.createElement('div');
    btn.id = "imdb2leech_tuned";
    // insert new div into DOM
    insertAfter(btn, document.getElementById('pagecontent'));
    // insert anchor
    var anchor = document.createElement('a')
    anchor.name = 'comment';
    document.getElementById('pagecontent').parentNode.insertBefore(anchor, document.getElementById('pagecontent'))
    btn.innerHTML = '<input id="greasemonkeyButton" value="imdb2leech!" type="button" onclick="alert()">';

    addButtonListener();
}

//runs perform() when button is clicked
function addButtonListener() {
    var button = document.getElementById("greasemonkeyButton");
    button.addEventListener('click', performSearch, true);
}

function testPage()
{
    var page = window.location + '';

    if(page.match('search'))
    {
        performIn = 0;
    }
    else
    {
        performIn = 1;
    }
}

function performSearch(page)
{
    if(performIn == 0)
    {
        //Perform in search page
        
        $('div#main table.results tr.even, div#main table.results tr.odd').each(function(){
            var link = $(this).find('td.image a');
            movie_title = link.html();
            movie_id = link.attr('href').match(/tt([0-9]*)\/?$/)[1];
            elem = $(this);

            $(this).find('span.genre a').each(function(){
                if($(this).html() == "Adult")
                {
                    $(this).parent().parent().parent().css('background-color','red');
                }
            });
            perform(elem, movie_id, movie_title);
        });
    }
    else if(performIn == 1)
    {
    
    }
    
}

function addStyles()
{
    var styles = '.result_box {width: 335px} .result_box a { margin-right: 5px; color: #444;} ';
    styles += ' .result_box a:visited { color: red;}';
    if(performIn == 0)
    {
        styles += ' #imdb2leech_tuned {position: fixed; bottom: 10px; right: 10px; z-index: 1000;} ';
        styles += ' #content-2-wide #main, #content-2-wide .maindetails_center {margin-left: 5px; width: 1001px;} ';
    }
    else if(performIn == 1)
    {
        styles += ' ';
    }
    GM_addStyle(styles);
}
//------------------------------------------------------------
// Code being run (main)
//---------------------------------------------------------

var elem = null;
var movie_id = null;
var movie_title = null;
var performIn = 0;

testPage();
addStyles();

if(perform_on_start)
{
    performSearch();
}
else
{
//adds physical button to page
    display_button();
}

// EOF