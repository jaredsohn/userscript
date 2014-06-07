// ==UserScript==
// @name           TD "New" Torrents
// @namespace      http://userscripts.org/users/74722
// @description    "New" text for TDv2 like TDv1
// @include        http://torrent-damage.net/torrents.php*
// @include        http://www.torrent-damage.net/torrents.php*
// ==/UserScript==

if(!GM_getValue) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}

const G_NEW_TEXT = '>>NEW<<';
const G_NEW_TEXT_STYLE = 'span.new_text { font-weight: bold; color: red; }';
const G_TIMING = 0;
const G_DEBUG = 1;

var re_day  = /(\d+) day/;
var re_hour = /(\d+) hour/;
var re_min  = /(\d+) minute/;
var re_url  = /\?id=\d+/;

if(re_url.exec(document.URL) != null) { return; }

var last_visited = GM_getValue('last_visited', 0);
var date = new Date();
GM_setValue('last_visited', date.getTime() + '');
var minutes_since = Math.round((date.getTime() - last_visited) / 60000);
check_torrents();
apply_style();

if(G_DEBUG) {
    var footer = document.evaluate(
        "//div[@class='footer_content']",
        document,
        null,
        XPathResult.ANY_UNORDERED_NODE_TYPE,
        null);
    var timing_text = document.createElement('p');
    timing_text.textContent = minutes_since + ' minute(s) since last visit.';
    footer.singleNodeValue.appendChild(timing_text);
}

if(G_TIMING) {
    var footer = document.evaluate(
        "//div[@class='footer_content']",
        document,
        null,
        XPathResult.ANY_UNORDERED_NODE_TYPE,
        null);
    var timing_text = document.createElement('p');
    var later_date = new Date();
    timing_text.innerHTML = '"New" script finished in ' + (later_date.getTime() - date.getTime()) / 1000 + ' second(s).';
    footer.singleNodeValue.appendChild(timing_text);
}

function apply_style() {
    var head = document.getElementsByTagName('head')[0];
    if(!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = G_NEW_TEXT_STYLE;
    head.appendChild(style);
}

function check_torrents() {
    var torrents = document.evaluate(
        "//li[@class='torrent_name']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
        
    for(var i = 0; i < torrents.snapshotLength; ++i) {
        var torrent = torrents.snapshotItem(i);
        var index = torrent.textContent.indexOf('Uploaded');
        if(index < 0) { continue; }
        var update_text = torrent.textContent.substr(index);
        var minutes = parse_uploaded_string(update_text);
        if(minutes < minutes_since) {
            newify_listing(torrent);
        }
    }
}

function newify_listing(torrent) {
    var children = torrent.childNodes;
    var new_text = document.createElement('span');
    new_text.className = 'new_text';
    new_text.textContent = ' ' + G_NEW_TEXT;
    children[1].appendChild(new_text);
}

function parse_uploaded_string(text) {
    var minutes_past = 0;
    
    var arr;
    if((arr = re_day.exec(text)) != null) {
        minutes_past += parseInt(arr[1] * 1440);
    }
    if((arr = re_hour.exec(text)) != null) {
        minutes_past += parseInt(arr[1] * 60);
    }
    if((arr = re_min.exec(text)) != null) {
        minutes_past += parseInt(arr[1]);
    }
    
    return minutes_past;
}
