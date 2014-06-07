// ==UserScript==
// @name           imdb2leech
// @namespace      http://userscripts.org/users/183236
// @description    Add links from IMDB movie pages to torrent sites -- easy downloading from IMDB
//
// Preference window for userscripts:
// @require 	http://userscripts.org/scripts/source/107512.user.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
//
// @version		2.16
// @include		http://*.imdb.com/title/tt*
// @include		http://*.imdb.de/title/tt*
// @include		http://*.imdb.es/title/tt*
// @include		http://*.imdb.fr/title/tt*
// @include		http://*.imdb.it/title/tt*
// @include		http://*.imdb.pt/title/tt*
// @include		http://*.imdb.com/search/title*
// @include		http://*.imdb.de/search/title*
// @include		http://*.imdb.es/search/title*
// @include		http://*.imdb.fr/search/title*
// @include		http://*.imdb.it/search/title*
// @include		http://*.imdb.pt/search/title*
//
// @grant		GM_getValue
// @grant		GM_xmlhttpRequest
// @grant		GM_setValue
// @grant		GM_openInTab
// @grant		GM_registerMenuCommand
// @grant		GM_log
// @grant		GM_addStyle
//
// ==/UserScript==
/*---------------------Version History--------------------
1.00	-	Initial public release, everything works on barebones greasemonkey

1.50	-	Added the ability to select which sites to load from the GM script commands
		-	Moved the required method to userscripts
		- 	Removed FH, NZB, Avax
		
1.60	-	Added style elements and shading to display on imdb

1.62	-	Fixed bug:SCC-ARC not removing when unchecked
		-	Alphabetized list

1.70	-	Cleaned up code
		-	Added option to not run script on page load
		
1.71	-	Deprecated action-box field

1.80	-	Added icons that link to OpenSubs, Criticker, RT, YT

1.81	-	Added support for tv, only displays on shows listed as 'tv series'
		-	Added support for icheckmovies at top bar.
		
1.82	-	Fixed title parsing for tv shows.

1.83	-	Fixed dhive not working properly

1.90	-	Set height of preference window to 450px, added scroll bar

1.91	-	Added another 11 torrent sites

2.00	-	Added auto updater

2.01	-	Added TC, FreshOn, TVT, STF, CC
		-	Cleaned up code (tabbing)
		-	Removed THR
		-	Added TV-Rage to top bar
		
2.02	-	Added PS, THC, HH, HDStar
		-	Fixed CC false positive
		
2.03	-	TehC now uses tt
		-	Added Raymoz mod for AT
		
2.04	-	Added HDbits
		-	Added TL

2.10	-	Added genre page search functionality

2.11	-	Fixed ICM because Nuked was whining

2.12	-	Removed tvrage
		-	Fixed iCM (added tt)
		-	Added HDVNbits
		-	Changed RevTT to .me
		-	Added HDT
		-	removed autoupdate

2.13	-	removed xvidme
		-	reinstated autoupdate
		-	removed google chrome code
		-	fixed hdvn and hdt issues

2.14	-	Added @grant entries for API access
		-	Fixed tt parser to work on imdb pages with referral info in url

2.15   -  Fixed Kara (thanks SJ)
2.16   -  Fixed syntax that I broke in 2.15 (Again -> SJ)
--------------------------------------------------------*/

/*
//update script
var SUC_script_num = 107544; 

// Change this to the number given to the script by userscripts.org (check the address bar)



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
} catch (err) {}
*/



// Default preferences are stored in two places: defaults settings      
// for USP (here) and defaults for GM_getValue (below).  Make sure to   
// change both if you change one.  

try {
    USP.theScriptName = 'imdb2leech';
    USP.init({
        theName: 'pirate_header_text',
        theText: 'Header text:',
        theDefault: 'Pirate this film'
    }, {
        theName: 'perform_on_start',
        theText: 'Perform on start?:',
        theDefault: true
    }, {
        theName: 'show_strikeout_links',
        theText: 'Show crossed-out search misses?',
        theDefault: true
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
		theName: 'show_at',
        theText: 'Show AT?',
        theDefault: true
    }, {
        theName: 'show_bithd',
        theText: 'Show BitHD?',
        theDefault: true
    }, {
        theName: 'show_bmtv',
        theText: 'Show BMTV?',
        theDefault: true
    }, {
        theName: 'show_btn',
        theText: 'Show BTN?',
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
        theName: 'show_fresh',
        theText: 'Show Fresh?',
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
        theName: 'show_hdbits',
        theText: 'Show HDbits?',
        theDefault: true
    }, {
        theName: 'show_hdme',
        theText: 'Show HDME?',
        theDefault: true
    }, {
        theName: 'show_hdstar',
        theText: 'Show HDStar?',
        theDefault: true
	}, {
        theName: 'show_hdt',
        theText: 'Show HDT?',
        theDefault: true
	}, {
        theName: 'show_hdvnbits',
        theText: 'Show HDVNbits?',
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
        theDefault: true
    }, {
        theName: 'show_stf',
        theText: 'Show STF?',
        theDefault: true
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
        theDefault: true
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
	}, {
        theName: 'show_tl',
        theText: 'Show TL?',
        theDefault: true
    },{
        theName: 'show_tpb',
        theText: 'Show TPB?',
        theDefault: true
    }, {
        theName: 'show_tvv',
        theText: 'Show TVV?',
        theDefault: true
    }, {
        theName: 'show_tvt',
        theText: 'Show TvT?',
        theDefault: true
    }, {
        theName: 'show_x264',
        theText: 'Show X264?',
        theDefault: true
    });

    GM_registerMenuCommand('Preferences for ~' + USP.theScriptName + '~', USP.invoke);
} catch (e) {};


// Default preferences are stored in two places: defaults settings for  
// USP (above), and defaults for GM_getValue (below).  Make sure to     
// change both if you change one.                                       
var show_strikeout_links = GM_getValue('show_strikeout_links', true);
var pirate_header_text = GM_getValue('pirate_header_text', 'Pirate this film') + ': ';
var debug_imdb2leech = GM_getValue('debug_imdb2leech', true);
var retard_cant_middle_click = false;
var perform_on_start = GM_getValue('perform_on_start', true);

var show_cg = GM_getValue('show_cg', true);
var show_tpb = GM_getValue('show_tpb', true);
var show_demo = GM_getValue('show_demo', true);
var show_kara = GM_getValue('show_kara', true);
var show_tik = GM_getValue('show_tik', true);
var show_sm = GM_getValue('show_sm', true);
var show_ilc = GM_getValue('show_ilc', true);
var show_goem = GM_getValue('show_goem', true);
var show_scc = GM_getValue('show_scc', true);
var show_sdbits = GM_getValue('show_sdbits', true);
var show_ethor = GM_getValue('show_ethor', true);
var show_x264 = GM_getValue('show_x264', true);
var show_fss = GM_getValue('show_fss', true);
var show_hdme = GM_getValue('show_hdme', true);
var show_dhive = GM_getValue('show_dhive', true);
var show_chd = GM_getValue('show_chd', true);
var show_ptpreq = GM_getValue('show_ptpreq', true);
var show_advd = GM_getValue('show_advd', true);
var show_sccarc = GM_getValue('show_sccarc', true);
var show_ptp = GM_getValue('show_ptp', true);
var show_bithd = GM_getValue('show_bithd', true);
var show_revtt = GM_getValue('show_revtt', true);
var show_ahd = GM_getValue('show_ahd', true);
var show_btn = GM_getValue('show_btn', true);
var show_tvv = GM_getValue('show_tvv', true);
var show_bmtv = GM_getValue('show_bmtv', true);
var show_iplay = GM_getValue('show_iplay', true);
var show_scandbits = GM_getValue('show_scandbits', true);
var show_te = GM_getValue('show_te', true);
var show_tb = GM_getValue('show_tb', true);
var show_tg = GM_getValue('show_tg', true);
var show_ll = GM_getValue('show_ll', true);
var show_mt = GM_getValue('show_mt', true);
var show_tdc = GM_getValue('show_tdc', true);
var show_fy = GM_getValue('show_fy', true);
var show_tehc = GM_getValue('show_tehc', true);
var show_stf = GM_getValue('show_stf', true);
var show_cc = GM_getValue('show_cc', true);
var show_fresh = GM_getValue('show_fresh', true);
var show_tvt = GM_getValue('show_tvt', true);
var show_ps = GM_getValue('show_ps', true);
var show_thc = GM_getValue('show_thc', true);
var show_hh = GM_getValue('show_hh', true);
var show_hdstar = GM_getValue('show_hdstar', true);
var show_at = GM_getValue('show_at', true);
var show_hdbits = GM_getValue('show_hdbits', true);
var show_tl = GM_getValue('show_tl', true);
var show_hdvnbits = GM_getValue('show_hdvnbits', true);
var show_hdt = GM_getValue('show_hdt', true);


//creates field for site links
function add_link_areas() {
    var h1_list = document.getElementsByTagName('h1');
    if (h1_list) {
        var p = document.createElement('p');
        p.setAttribute('id', 'pirateheader');
        p.setAttribute('style', 'font-weight:bold; color:black; background-color: lightgray;');
        h1_list[0].parentNode.appendChild(p);
    }
}

//adds links to field
function add_link(elem,search_url, link_text, strikeout) {
	if(performIn == 1)
	{
		var text = document.createTextNode(link_text);
		var a = document.createElement('a');
		a.setAttribute('href', search_url);

		if (retard_cant_middle_click) a.setAttribute('target', '_blank');

		if (strikeout) {
			var s = document.createElement('s');
			s.appendChild(text);
			a.appendChild(s);
		} else {
			a.appendChild(text);
		}

		var piratebox = document.getElementById('piratebox');
		if (piratebox) {
			if (!piratebox.hasChildNodes()) {
				piratebox.appendChild(document.createTextNode(pirate_header_text));
			}
			piratebox.appendChild(a.cloneNode(true));
			piratebox.appendChild(document.createTextNode(' '));
		}
		var pirateheader = document.getElementById('pirateheader');
		if (pirateheader) {
			if (!pirateheader.hasChildNodes()) {
				pirateheader.appendChild(document.createTextNode(pirate_header_text));
			}
			pirateheader.appendChild(a);
			pirateheader.appendChild(document.createTextNode(' '));
		}
	}
	else
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
}

//tests whether to strikeout
function maybe_add_link(elem,link_text, search_urls, search_fail_match, success_match) {
    if(performIn==1)
	{
		if(typeof(success_match)==='undefined') success_match = false;
		
		var search_url;

		if (typeof (search_urls) == 'object') {
			search_url = search_urls[0];
			search_urls.shift();
		} else {
			search_url = search_urls;
			search_urls = new Array;
		}

		
			GM_xmlhttpRequest({
				method: 'GET',
				url: search_url,
				onload: function (responseDetails) {
					if (String(responseDetails.responseText).match(search_fail_match) ? !(success_match) : success_match) {		if (search_urls.length) {
							maybe_add_link(link_text, search_urls, search_fail_match);
						} else {
							if (show_strikeout_links) add_link(elem,search_url, link_text, true);
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
	else
	{
		var search_url;
		if (typeof (search_urls) == 'object') {
			search_url = search_urls[0];
			search_urls.shift();
		} else {
			search_url = search_urls;
			search_urls = new Array;
		}
		
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
function perform() {
    if (match) {
        var tt = 'tt' + match[1];
        var nott = match[1];
        var title = document.title;
	}
	else
	{
		var tt = 'tt' + movie_id;
        var nott = movie_id;
        var title = movie_title;
	}
	
	var search_string = title.replace(/ +\(.*/, '').replace(/[^a-zA-Z0-9]/g, ' ').replace(/ +/g, '+');
	var search_string = title.replace(/ +\(.*/, '').replace(/ +/g, '+');
	
	if(performIn == 1){
        add_link_areas();
	}
		
	var title = document.title;
	var search_string = title.replace(/ +\(.*/, '').replace(/[^a-zA-Z0-9]/g, ' ').replace(/ +/g, '+');
	var search_string = title.replace(/ +\(.*/, '').replace(/ +/g, '+');

	if ((document.getElementsByTagName("title")[0].innerHTML.match("TV Series"))) {

		if (show_btn) {

			maybe_add_link(elem,'BTN', 'https://broadcasthe.net/torrents.php?searchstr=' + search_string, /Whatchoo talkin' bout willis?.<\/h2>/);
		}

		if (show_tvv) {
			maybe_add_link(elem,'TVV', 'http://tv-vault.me/torrents.php?searchstr=' + search_string, /Nothing found<\/h2>/);
		}

		if (show_bmtv) {
			maybe_add_link(elem,'BMTV', 'https://www.bitmetv.org/browse.php?search=' + search_string, /Nothing found!<\/h2>/);
		}

		if (show_fresh) {
			maybe_add_link(elem,'Fresh', 'http://freshon.tv/browse.php?search=' + search_string, /Nothing found!<\/h2>/);
		}

		if (show_tvt) {
			maybe_add_link(elem,'TvT', 'http://www.tvtorrents.com/loggedin/search.do?search=' + search_string, /Nothing found!<\/h2>/);
		}
	} else {
		if (show_at) {
			maybe_add_link(elem,'AT', 'http://www.asiatorrents.com/index.php?page=torrents&options=3&search=' + tt, /torrent_history/, true);
		}
		if (show_hdvnbits) {
			maybe_add_link(elem,'HDVN', 'http://hdvnbits.org/torrents.php?search='+tt+'&search_area=4&search_mode=0', /Nothing found! Try again with a refined search string/);
		}
		if (show_hdt) {
			maybe_add_link(elem,'HDT', 'http://hd-torrents.org/torrents.php?active=0&options=2&search=' +tt, /No torrents here.../);
		}
		if (show_tl) {
			maybe_add_link(elem,'TL', 'http://www.torrentleech.org/torrents/browse/index/query/' + search_string, /Signup With Invite|Please refine your search./);
		}
		if (show_hdbits) {
			maybe_add_link(elem,'HDb', 'http://hdbits.org/browse2.php#film/dir=null&searchtype=film&actorfilm=film&search=' + tt, /<p>Note: You need cookies enabled to log in.<\/p>/);
		}
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
			maybe_add_link(elem,'Kara', 'http://www.karagarga.net/browse.php?search_type=imdb&search=' + nott, /<h2>No torrents found<\/h2>|<h1>If you want the love<\/h1>/);
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
			maybe_add_link(elem,'RevTT', 'https://www.revolutiontt.me/browse.php?search=' + tt, /<h2>Nothing found!<\/h2>/);
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
    btn.id = "imdb2leech";
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
    button.addEventListener('click', perform, true);
}

//------------------------------------------------------------
// Icons at top bar
//---------------------------------------------------------

function xpath(query, context) {
    context = context ? context : document;

    return document.evaluate(query, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function SearchEngine(shortname, searchurl, usesIMDBID, icon) {
    this.shortname = shortname;
    this.searchurl = searchurl;
    this.usesIMDBID = usesIMDBID;
    this.icon = icon;

    this.getHTML = function (title, id) {
        var html = "<a href=\"" + this.getSearchUrl(title, id) + "\"><img class=\"img\" style=\"-moz-opacity: 0.4;\" border=\"0\" src=\"" + this.icon + "\" title=\"" + this.shortname + "\"><\/a>&nbsp;";
        return html;
    }

    this.getSearchUrl = function (title, id) {
        var searchUrl = this.searchurl;
        if (this.usesIMDBID) {
            searchUrl = searchUrl.replace(/%imdb\-id/, id);
        } else {
            searchUrl = searchUrl.replace(/%title/, encodeURIComponent(title));
        }

        return searchUrl;
    }
}

function openAllInTabs(title, id, inclIMDBID) {
    for (var i = 0; i < top_bar_icons.length; i++) {
        if (top_bar_icons[i].usesIMDBID && !inclIMDBID) continue;
        else GM_openInTab(top_bar_icons[i].getSearchUrl(title, id));
    }
}

function getTitle() {
    var title = document.title;
    title = title.match(/^(.*) \(/)[1];
    return title;
}

function getId() {
    with(location.href) {
        var id = match(/title\/tt(.*?)\//i)[1];
    }
    return id;
}

function addIconBarIcons(title, id, top_bar_icons) {
    var iconbar = xpath("//h1", document);
    if (!iconbar || iconbar.snapshotLength != 1) {
        GM_log("Error! Couldn't find icon bar. Quitting!");
        return;
    }

    iconbar = iconbar.snapshotItem(0);
    iconbar.id = "iconbar";

    var tdimg;
    for (var i = 0; i < top_bar_icons.length; i++) {
        tdimg = document.createElement("span");
        tdimg.innerHTML = top_bar_icons[i].getHTML(title, id);
        iconbar.appendChild(tdimg);
    }


    if (GM_openInTab) {
        var tdopenall = document.createElement("a");
        var aopenall = document.createElement("a");
        aopenall.innerHTML = "Open All";
        aopenall.href = "javascript:;";
        aopenall.setAttribute('style', 'font-weight:bold;font-size:10px;font-family: Calibri, Verdana, Arial, Helvetica, sans-serif;');
        //aopenall.setAttribute("class", "openall");
        aopenall.addEventListener("click", function () {
            openAllInTabs(title, id, true);
        }, false);
        tdopenall.appendChild(aopenall);

        iconbar.appendChild(tdopenall);
    }
}

function findRefSites() {

    var top_bar_icons = new Array();

    //opensubtitles.org  via IMDb-ID
    top_bar_icons.push(new SearchEngine("opensubtitles via IMDb-ID", "http://www.opensubtitles.org/en/search/imdbid-%imdb-id", true, "data:application/octet-stream;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqqqr///////+qqqoAAAAAAADMzMzu7u7///////9VVVUAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACZmZmIiIgAAACIiIgAAAAAAABERETd3d0AAAAAAAAAAAAAAADu7u4REREAAAAAAAARERHu7u4AAABERET////////d3d0zMzMAAAAAAAAAAAAAAADd3d0iIiIAAAAAAAARERHd3d0AAADd3d1EREQAAAAAAAAAAAAAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACqqqp3d3cAAADMzMxEREQAAAARERHd3d0AAAAAAAAAAAAAAAAAAACZmZn///////+qqqoAAAAAAAAiIiLu7u7////////u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"));

    //Rotten Tomatoes via IMDb-ID
    top_bar_icons.push(new SearchEngine("Rotten Tomatoes via IMDb-ID", "http://www.rottentomatoes.com/alias?type=imdbid&s=%imdb-id", true, "data:image/x-icon;base64,AAABAAEAEBAAAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ51AAMjQ1AAAAAAAAAAAABC+AAAs8BIAzO8SAD+61QAYXEAAsgYIABC+AAABALIAsgYIAAEAAACyBggAAAAAERAAAAAAAAEREQAAAAAAARERAAEQERAAERAAEREREQAREBEREAEREBEREREAAAEREREQAAAAABEREQAAAAAREBEREQAAAREAEREREAABEQARABEREAERAREAEREQAAAREQABEQAAABERAAAAAAAAEREAAAAAAAAREAAAAAD8f3cA+D93hfg5AAAccADwDEF3rIQDAADgH3eA8D8AAMQPAJyMBwAAjMF3aIjBAALw43dQ8P93//D//2nx/3ei"));

    //Criticker
    top_bar_icons.push(new SearchEngine("Criticker", "http://www.criticker.com/?st=movies&h=%title&g=Go", false, "http://www.criticker.com/favicon.ico"));

    //Youtube
    top_bar_icons.push(new SearchEngine("Youtube", "http://www.youtube.com/results?search_query=%22%title%22&search=Search", false, "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAD//////////4OD//9paf//bm7//2Fh//9ZWf//Wlr//1pa//9WVv//ZGT//3Bw//9jY///goL//////////////////11d//8sLP//QUH//ygo//84OP//RET//y4u//8xMf//UVH//y4u//8PD///ZWX//x0d//9aWv////////////88PP//Cgr///////8zM///1NT///////+lpf//ubn///////+urv//fHz////////g4P//Fhb/////////////MzP//woK////////NDT//8vL//9ycv//paX//7Cw//9jY///s7P//8nJ//9XV///eXn//yIi/////////////zMz//8LC///+/v//zMz///Gxv//hYX//6Ki//+srP//W1v//6ys//+3t///2tr//93d//8PD/////////////80NP//AgL///b2//8nJ///5ub//56e//+5uf//oaH//+/v//+5uf//oKD//+Li///f3///AgL/////////////MzP//wUF////////Skr//0pK//9NTf//NTX//97e//+ysv//Nzf//xIS//+mpv//Kyv//z09/////////////xkZ///Y2P////////////8nJ///EBD//wAA///y8v//Ly///wAA//8mJv//Hh7//6mp//92dv////////////+vr///Jib//xMS//8eIP//MzP//zY2//84OP//Hh///y4u//9XV///hoj//8LC///R0f//qqr/////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAA/8zMzP/u7u7/IiIi/wAAAP8iIiL//////zMzM/8AAAD/AAAA/////////////////////////////////wAAAP/MzMz//////yIiIv/u7u7/ERER/7u7u/8AAAD/iIiI/xEREf///////////////////////////+7u7v8AAAD/zMzM//////8iIiL/7u7u/xEREf+7u7v/AAAA/8zMzP8RERH///////////////////////////93d3f/AAAA/1VVVf/u7u7/IiIi/wAAAP8iIiL//////wAAAP/MzMz/ERER///////////////////////d3d3/AAAA/4iIiP8AAAD/3d3d/////////////////////////////////////////////////////////////////wAAAP//////AAAA////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D%3D"));

    //iCheckMovies
    top_bar_icons.push(new SearchEngine("iCheckMovies via IMDb-ID", "http://www.icheckmovies.com/search/movies/?query=tt%imdb-id", true, "http://i.imgur.com/UYmcH.png"));
	
	//TVrage
	/*top_bar_icons.push(new SearchEngine("TV-Rage", "http://www.tvrage.com/search.php?jumpMenu=All&search=%title%", true, "http://i.imgur.com/sUL7m.png"));*/

    return top_bar_icons;
}

//------------------------------------------------------------
// Genre page code
//---------------------------------------------------------
function testPage(){
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

function performSearch(page){
   
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

function addStyles(){
    var styles = '.result_box {width: 335px} .result_box a { margin-right: 5px; color: #444;} ';
    styles += ' .result_box a:visited { color: red;}';
    styles += ' #imdb2leech_tuned {position: fixed; bottom: 10px; right: 10px; z-index: 1000;} ';
	styles += ' #content-2-wide #main, #content-2-wide .maindetails_center {margin-left: 5px; width: 1001px;} ';
    
    GM_addStyle(styles);
}

//------------------------------------------------------------
// Code being run (main)
//---------------------------------------------------------

//genre page stuff
var elem = null;
var movie_id = null;
var movie_title = null;
var performIn = 0;
testPage();

//search page is 0, movie page is 1
if(performIn == 1)
{
	GM_addStyle('#imdb2leech {position: fixed; bottom: 10px; right: 10px; z-index: 1000;}');
	var title = getTitle();
	var id = getId();
	var tob_bar_fullArray = findRefSites();
	var tempMatch = String(document.URL).match(/tt[0-9]*\/.*/);
	var tempMatchStr = new String(tempMatch);
	var match = tempMatchStr.substring(0,tempMatchStr.indexOf('/')).split("tt");
	//checks perform_on_start variable
	//creates button if false
	if (perform_on_start) {
		perform();
	} else {
		display_button();
	}
	addIconBarIcons(title, id, tob_bar_fullArray);
}
else if(performIn == 0)
{
	if (perform_on_start) {
		addStyles();
		performSearch();
	} else {
		display_button();
	}
	
}

	
	
	
	// EOF