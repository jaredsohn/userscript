// ==UserScript==
// @id              com.lespea.google.reader.unreadcount
// @name            Google Reader - Real Unread Count
// @version         2013.01.20
// @namespace       com.lespea
// @author          Adam Lesperance <lespea@gmail.com>
// @description     Google Reader displays 1000+ instead of the actual counts, this fixes that
// @match           *://*.google.com/reader/view/*
// @match           *://*.google.ac.th/reader/view/*
// @match           *://*.google.ac/reader/view/*
// @match           *://*.google.ad/reader/view/*
// @match           *://*.google.ae/reader/view/*
// @match           *://*.google.af/reader/view/*
// @match           *://*.google.ag/reader/view/*
// @match           *://*.google.ai/reader/view/*
// @match           *://*.google.al/reader/view/*
// @match           *://*.google.am/reader/view/*
// @match           *://*.google.an/reader/view/*
// @match           *://*.google.ao/reader/view/*
// @match           *://*.google.aq/reader/view/*
// @match           *://*.google.ar/reader/view/*
// @match           *://*.google.as/reader/view/*
// @match           *://*.google.at/reader/view/*
// @match           *://*.google.au/reader/view/*
// @match           *://*.google.aw/reader/view/*
// @match           *://*.google.az/reader/view/*
// @match           *://*.google.ba/reader/view/*
// @match           *://*.google.bb/reader/view/*
// @match           *://*.google.bd/reader/view/*
// @match           *://*.google.be/reader/view/*
// @match           *://*.google.bf/reader/view/*
// @match           *://*.google.bg/reader/view/*
// @match           *://*.google.bh/reader/view/*
// @match           *://*.google.bi/reader/view/*
// @match           *://*.google.bj/reader/view/*
// @match           *://*.google.bm/reader/view/*
// @match           *://*.google.bn/reader/view/*
// @match           *://*.google.bo/reader/view/*
// @match           *://*.google.br/reader/view/*
// @match           *://*.google.bs/reader/view/*
// @match           *://*.google.bt/reader/view/*
// @match           *://*.google.bv/reader/view/*
// @match           *://*.google.bw/reader/view/*
// @match           *://*.google.by/reader/view/*
// @match           *://*.google.bz/reader/view/*
// @match           *://*.google.ca/reader/view/*
// @match           *://*.google.cc/reader/view/*
// @match           *://*.google.cf/reader/view/*
// @match           *://*.google.cg/reader/view/*
// @match           *://*.google.ch/reader/view/*
// @match           *://*.google.ci/reader/view/*
// @match           *://*.google.ck/reader/view/*
// @match           *://*.google.cl/reader/view/*
// @match           *://*.google.cm/reader/view/*
// @match           *://*.google.cn/reader/view/*
// @match           *://*.google.co.cr/reader/view/*
// @match           *://*.google.co.cz/reader/view/*
// @match           *://*.google.co.id/reader/view/*
// @match           *://*.google.co.il/reader/view/*
// @match           *://*.google.co.jp/reader/view/*
// @match           *://*.google.co.kr/reader/view/*
// @match           *://*.google.co.th/reader/view/*
// @match           *://*.google.co.uk/reader/view/*
// @match           *://*.google.co.uk/reader/view/*
// @match           *://*.google.co/reader/view/*
// @match           *://*.google.com.ar/reader/view/*
// @match           *://*.google.com.au/reader/view/*
// @match           *://*.google.com.bo/reader/view/*
// @match           *://*.google.com.br/reader/view/*
// @match           *://*.google.com.cn/reader/view/*
// @match           *://*.google.com.co/reader/view/*
// @match           *://*.google.com.do/reader/view/*
// @match           *://*.google.com.ec/reader/view/*
// @match           *://*.google.com.fr/reader/view/*
// @match           *://*.google.com.hk/reader/view/*
// @match           *://*.google.com.mx/reader/view/*
// @match           *://*.google.com.my/reader/view/*
// @match           *://*.google.com.pa/reader/view/*
// @match           *://*.google.com.pe/reader/view/*
// @match           *://*.google.com.pk/reader/view/*
// @match           *://*.google.com.pl/reader/view/*
// @match           *://*.google.com.py/reader/view/*
// @match           *://*.google.com.sg/reader/view/*
// @match           *://*.google.com.tr/reader/view/*
// @match           *://*.google.com.tw/reader/view/*
// @match           *://*.google.com.ve/reader/view/*
// @match           *://*.google.com.vl/reader/view/*
// @match           *://*.google.com.vn/reader/view/*
// @match           *://*.google.com.vy/reader/view/*
// @match           *://*.google.con.gr/reader/view/*
// @match           *://*.google.cr/reader/view/*
// @match           *://*.google.cs/reader/view/*
// @match           *://*.google.cu/reader/view/*
// @match           *://*.google.cv/reader/view/*
// @match           *://*.google.cx/reader/view/*
// @match           *://*.google.cy/reader/view/*
// @match           *://*.google.cz/reader/view/*
// @match           *://*.google.de/reader/view/*
// @match           *://*.google.dj/reader/view/*
// @match           *://*.google.dk/reader/view/*
// @match           *://*.google.dm/reader/view/*
// @match           *://*.google.do/reader/view/*
// @match           *://*.google.dz/reader/view/*
// @match           *://*.google.ec/reader/view/*
// @match           *://*.google.edu.pk/reader/*
// @match           *://*.google.edu/reader/view/*
// @match           *://*.google.ee/reader/view/*
// @match           *://*.google.eg/reader/view/*
// @match           *://*.google.eh/reader/view/*
// @match           *://*.google.er/reader/view/*
// @match           *://*.google.es/reader/view/*
// @match           *://*.google.et/reader/view/*
// @match           *://*.google.fi/reader/view/*
// @match           *://*.google.fj/reader/view/*
// @match           *://*.google.fk/reader/view/*
// @match           *://*.google.fm/reader/view/*
// @match           *://*.google.fo/reader/view/*
// @match           *://*.google.fr/reader/view/*
// @match           *://*.google.fx/reader/view/*
// @match           *://*.google.ga/reader/view/*
// @match           *://*.google.gb/reader/view/*
// @match           *://*.google.gd/reader/view/*
// @match           *://*.google.ge/reader/view/*
// @match           *://*.google.gf/reader/view/*
// @match           *://*.google.gh/reader/view/*
// @match           *://*.google.gi/reader/view/*
// @match           *://*.google.gl/reader/view/*
// @match           *://*.google.gm/reader/view/*
// @match           *://*.google.gn/reader/view/*
// @match           *://*.google.gob.mx/reader/view/*
// @match           *://*.google.gov.au/reader/view/*
// @match           *://*.google.gov.br/reader/view/*
// @match           *://*.google.gov.co/reader/view/*
// @match           *://*.google.gov.my/reader/view/*
// @match           *://*.google.gov.ph/reader/view/*
// @match           *://*.google.gov.sg/reader/view/*
// @match           *://*.google.gov.tr/reader/view/*
// @match           *://*.google.gov/reader/view/*
// @match           *://*.google.gp/reader/view/*
// @match           *://*.google.gq/reader/view/*
// @match           *://*.google.gr/reader/view/*
// @match           *://*.google.gs/reader/view/*
// @match           *://*.google.gt/reader/view/*
// @match           *://*.google.gu/reader/view/*
// @match           *://*.google.gw/reader/view/*
// @match           *://*.google.gy/reader/view/*
// @match           *://*.google.hk/reader/view/*
// @match           *://*.google.hm/reader/view/*
// @match           *://*.google.hn/reader/view/*
// @match           *://*.google.hr/reader/view/*
// @match           *://*.google.ht/reader/view/*
// @match           *://*.google.hu/reader/view/*
// @match           *://*.google.id/reader/view/*
// @match           *://*.google.ie/reader/view/*
// @match           *://*.google.il/reader/view/*
// @match           *://*.google.in/reader/view/*
// @match           *://*.google.io/reader/view/*
// @match           *://*.google.iq/reader/view/*
// @match           *://*.google.ir/reader/view/*
// @match           *://*.google.is/reader/view/*
// @match           *://*.google.it/reader/view/*
// @match           *://*.google.jm/reader/view/*
// @match           *://*.google.jo/reader/view/*
// @match           *://*.google.jp/reader/view/*
// @match           *://*.google.ke/reader/view/*
// @match           *://*.google.kg/reader/view/*
// @match           *://*.google.kh/reader/view/*
// @match           *://*.google.ki/reader/view/*
// @match           *://*.google.km/reader/view/*
// @match           *://*.google.kn/reader/view/*
// @match           *://*.google.kp/reader/view/*
// @match           *://*.google.kr/reader/view/*
// @match           *://*.google.kw/reader/view/*
// @match           *://*.google.ky/reader/view/*
// @match           *://*.google.kz/reader/view/*
// @match           *://*.google.la/reader/view/*
// @match           *://*.google.lb/reader/view/*
// @match           *://*.google.lc/reader/view/*
// @match           *://*.google.li/reader/view/*
// @match           *://*.google.lk/reader/view/*
// @match           *://*.google.lr/reader/view/*
// @match           *://*.google.ls/reader/view/*
// @match           *://*.google.lt/reader/view/*
// @match           *://*.google.lu/reader/view/*
// @match           *://*.google.lv/reader/view/*
// @match           *://*.google.ly/reader/view/*
// @match           *://*.google.ma/reader/view/*
// @match           *://*.google.mc/reader/view/*
// @match           *://*.google.md/reader/view/*
// @match           *://*.google.mg/reader/view/*
// @match           *://*.google.mh/reader/view/*
// @match           *://*.google.mil/reader/view/*
// @match           *://*.google.mk/reader/view/*
// @match           *://*.google.ml/reader/view/*
// @match           *://*.google.mm/reader/view/*
// @match           *://*.google.mn/reader/view/*
// @match           *://*.google.mo/reader/view/*
// @match           *://*.google.mp/reader/view/*
// @match           *://*.google.mq/reader/view/*
// @match           *://*.google.mr/reader/view/*
// @match           *://*.google.ms/reader/view/*
// @match           *://*.google.mt/reader/view/*
// @match           *://*.google.mu/reader/view/*
// @match           *://*.google.mv/reader/view/*
// @match           *://*.google.mw/reader/view/*
// @match           *://*.google.mx/reader/view/*
// @match           *://*.google.my/reader/view/*
// @match           *://*.google.mz/reader/view/*
// @match           *://*.google.na/reader/view/*
// @match           *://*.google.nc/reader/view/*
// @match           *://*.google.ne/reader/view/*
// @match           *://*.google.net.au/reader/view/*
// @match           *://*.google.net.tr/reader/view/*
// @match           *://*.google.net/reader/view/*
// @match           *://*.google.nf/reader/view/*
// @match           *://*.google.ng/reader/view/*
// @match           *://*.google.ni/reader/view/*
// @match           *://*.google.nl/reader/view/*
// @match           *://*.google.no/reader/view/*
// @match           *://*.google.np/reader/view/*
// @match           *://*.google.nr/reader/view/*
// @match           *://*.google.nt/reader/view/*
// @match           *://*.google.nu/reader/view/*
// @match           *://*.google.nz/reader/view/*
// @match           *://*.google.om/reader/view/*
// @match           *://*.google.org.br/reader/view/*
// @match           *://*.google.org.mx/reader/view/*
// @match           *://*.google.org.tr/reader/view/*
// @match           *://*.google.org.uk/reader/view/*
// @match           *://*.google.org/reader/view/*
// @match           *://*.google.pa/reader/view/*
// @match           *://*.google.pe/reader/view/*
// @match           *://*.google.pf/reader/view/*
// @match           *://*.google.pg/reader/view/*
// @match           *://*.google.ph/reader/view/*
// @match           *://*.google.pk/reader/view/*
// @match           *://*.google.pl/reader/view/*
// @match           *://*.google.pm/reader/view/*
// @match           *://*.google.pn/reader/view/*
// @match           *://*.google.pr/reader/view/*
// @match           *://*.google.pt/reader/view/*
// @match           *://*.google.pw/reader/view/*
// @match           *://*.google.py/reader/view/*
// @match           *://*.google.qa/reader/view/*
// @match           *://*.google.re/reader/view/*
// @match           *://*.google.ro/reader/view/*
// @match           *://*.google.ru/reader/view/*
// @match           *://*.google.rw/reader/view/*
// @match           *://*.google.sa/reader/view/*
// @match           *://*.google.sb/reader/view/*
// @match           *://*.google.sc/reader/view/*
// @match           *://*.google.sd/reader/view/*
// @match           *://*.google.se/reader/view/*
// @match           *://*.google.sg/reader/view/*
// @match           *://*.google.sh/reader/view/*
// @match           *://*.google.si/reader/view/*
// @match           *://*.google.sj/reader/view/*
// @match           *://*.google.sk/reader/view/*
// @match           *://*.google.sl/reader/view/*
// @match           *://*.google.sm/reader/view/*
// @match           *://*.google.sn/reader/view/*
// @match           *://*.google.so/reader/view/*
// @match           *://*.google.sr/reader/view/*
// @match           *://*.google.st/reader/view/*
// @match           *://*.google.su/reader/view/*
// @match           *://*.google.sv/reader/view/*
// @match           *://*.google.sy/reader/view/*
// @match           *://*.google.sz/reader/view/*
// @match           *://*.google.tc/reader/view/*
// @match           *://*.google.td/reader/view/*
// @match           *://*.google.tf/reader/view/*
// @match           *://*.google.tg/reader/view/*
// @match           *://*.google.th/reader/view/*
// @match           *://*.google.tj/reader/view/*
// @match           *://*.google.tk/reader/view/*
// @match           *://*.google.tm/reader/view/*
// @match           *://*.google.tn/reader/view/*
// @match           *://*.google.to/reader/view/*
// @match           *://*.google.tp/reader/view/*
// @match           *://*.google.tr/reader/view/*
// @match           *://*.google.tt/reader/view/*
// @match           *://*.google.tv/reader/view/*
// @match           *://*.google.tw/reader/view/*
// @match           *://*.google.tz/reader/view/*
// @match           *://*.google.ua/reader/view/*
// @match           *://*.google.ug/reader/view/*
// @match           *://*.google.uk/reader/view/*
// @match           *://*.google.um/reader/view/*
// @match           *://*.google.us/reader/view/*
// @match           *://*.google.uy/reader/view/*
// @match           *://*.google.uz/reader/view/*
// @match           *://*.google.va/reader/view/*
// @match           *://*.google.vc/reader/view/*
// @match           *://*.google.ve/reader/view/*
// @match           *://*.google.vg/reader/view/*
// @match           *://*.google.vi/reader/view/*
// @match           *://*.google.vn/reader/view/*
// @match           *://*.google.vu/reader/view/*
// @match           *://*.google.wf/reader/view/*
// @match           *://*.google.ws/reader/view/*
// @match           *://*.google.ye/reader/view/*
// @match           *://*.google.yt/reader/view/*
// @match           *://*.google.yu/reader/view/*
// @match           *://*.google.za/reader/view/*
// @match           *://*.google.zm/reader/view/*
// @match           *://*.google.zr/reader/view/*
// @match           *://*.google.zw/reader/view/*
// @run-at          document-end
// @priority        -5
// @updateURL       http://userscripts.org/scripts/source/156542.user.js
// ==/UserScript==


// ==ChangeLog==
//
// # 2013.01.14
// -------------
//  * Initial release
//
// # 2013.01.20
// ------------
//  * Update folder counts and properly handle subscriptions that have a count of over 1,000
//
//
// ==/ChangeLog==




//  For chrome
if (typeof GM_addStyle === 'undefined') {
    var GM_addStyle = function(css) {
        var d = document;
        var s = d.createElement('style');
        var a = d.getElementsByTagName('head')[0] || d.documentElement;
        s.textContent = css;
        a.appendChild(s);
    }
}


if (typeof GM_log === 'undefined') {
    GM_log = function(message) {
        console.log(message);
    }
}

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + rem));
};




// Globals
/**
 * The ID that holds the global unread count
 *
 * @const
 * @type {string}
 */
var TOTAL_UNREAD_ID  = 'reading-list-unread-count';

/**
 * The ID for the div holding all hte subscription information.  We monitor this for changes to see
 * if we need to recalc the totals
 *
 * @const
 * @type {string}
 */
var ALL_SUBSCRIPTIONS_ID = 'lhn-subscriptions';

/**
 * XPath to pull the top-level counts for the subscriptions
 *
 * @const
 * @type {string}
 */
var TOP_LEVEL_COUNTS_XPATH = './/li[@id="sub-tree-item-0-main"]/ul/li[contains(@class,"unread")]';

/**
* Get the unread count text from a root element
*
* @const
* @type {string}
*/
var GET_COUNT_XPATH = './a[contains(@class, "link")]/div[contains(@class, "unread-count")]';

/**
 * Get the unread counts for a folder
 *
 * @const
 * @type {string}
 */
var GET_FOLDER_COUNTS_XPATH = './ul/li[contains(@class, "unread")]/' + GET_COUNT_XPATH;



/**
 * Function that extracts the real count from google's text
 *
 * @return {number|boolean} The second item in the array is a boolean indicating an overflow (unknown count)
 */
function extract_count_info(text) {
    var num_start = 1;
    var overflow = false;

    if (text.charAt(1) === '~') {
        num_start = 3;
        overflow = true;
    }

    var num = text.slice(num_start, -1);

    if (!overflow && num.charAt(num.length - 1) === '+') {
        num = 1000;
        overflow = true;
    }

    return [parseInt(num), overflow];
}


/**
 * Function that properly formats a number to be inserted into the page after I've change it
 *
 * @param {number} num The number to format
 * @param {boolean} overflow If the number is an approximation because we can't get the real count
 * @return {string} The final, formatted count
 */
function formatNum(num, overflow) {
    var txt = num.toString();
    if (num >= 1000)
        txt.splice( txt.length - 3, 0, ',' );
    if (overflow)
        txt = '~ ' + txt;
    return '(' + txt + ')';
}



/**
 * Determine if we should manually count up the counts.  This happens if the "all items" count length
 * is greater than 5 (indication the number is >= 1000.
 *
 * @return {boolean} True if we need to recalculate the total
 */
function needsCalculation() {
    return document.getElementById( TOTAL_UNREAD_ID ).textContent.length > 5;
}



/**
 * Update the counts for each folder + total counts
 */
function updateTotals() {
    /** const */ var t_list = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
    /** const */ var t_one  = XPathResult.ANY_UNORDERED_NODE_TYPE;

    var total = 0, overflow = false;
    var folders = document.evaluate(TOP_LEVEL_COUNTS_XPATH, document.getElementById( ALL_SUBSCRIPTIONS_ID ), null, t_list, null);

    var folder_updates = [];

    try {
        var folder = folders.iterateNext();

        while (folder) {
            var count_node = document.evaluate(GET_COUNT_XPATH, folder, null, t_one, null).singleNodeValue;
            var info = extract_count_info( count_node.textContent );

            if (info[1]) {
                if (count_node.className.contains("folder")) {
                    var f_total = 0, f_overflow = false;

                    var sub_counts = document.evaluate(GET_FOLDER_COUNTS_XPATH, folder, null, t_list, null);
                    var sub_count = sub_counts.iterateNext();

                    while (sub_count) {
                        var c_info = extract_count_info( sub_count.textContent );

                        f_total += c_info[0];
                        if (c_info[1]) {
                            f_overflow = true;
                        }

                        sub_count = sub_counts.iterateNext();
                    }

                    if (f_overflow)
                        overflow = true;

                    total += f_total;
                    folder_updates.push([count_node.id, formatNum( f_total, f_overflow )]);
                } else {
                    overflow = true;
                    total += info[0];
                }
            } else {
                total += info[0];
            }

            folder = folders.iterateNext();
        }

        document.getElementById( TOTAL_UNREAD_ID ).textContent = formatNum( total, overflow );

        for (var i = 0, l = folder_updates.length; i < l; i++) {
            var info = folder_updates[i];
            document.getElementById(info[0]).textContent = info[1];
        }
    } catch (e) {
        GM_log(e);
        return;
    }
    GM_log("Updated the unread count successfully");
}


/**
 * Update the counts if necessary
 */
function updateCounts() {
    if (needsCalculation()) {
        updateTotals();
    }
}



/**
 * Get notified if the total count text changes.  It would be awesome if we could add watchers on
 * all the numbers but it creates a severe performance hit.
 */
function setupWatcher() {
    document.getElementById( TOTAL_UNREAD_ID ).addEventListener('DOMSubtreeModified', updateCounts, false);
}



/**
 * Run the initial update function then setup the watcher to automatically perform it when necessary
 */
function go() {
    updateCounts();
    setupWatcher();
}


// Let's get this party started!
go();