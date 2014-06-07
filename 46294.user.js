// ==UserScript==
// @name           List Scripts and Stylesheets
// @namespace      http://thomas-rosenau.de/
// @include        *
// @description    Creates a list of all stylesheets and scripts used by a web page
// @version        2
// ==/UserScript==


USEGREASEMANDRILL = true;
GREASEMANDRILL_URL = 'http://thomas-rosenau.de/scripts/greasemandrill/greasemandrill.6.user.js';
// set to local file if you have GreaseMandrill installed
// replace MYNAME and SOMERANDOMID; cf. http://kb.mozillazine.org/Profile_folder_-_Firefox
// XP:
// GREASEMANDRILL_URL = 'file:///c:/Documents%20and%20Settings/MYNAME/Application%20Data/Mozilla/Firefox/Profiles/SOMERANDOMID.default/gm_scripts/greasemandrill/greasemandrill.user.js';
// Vista:
// GREASEMANDRILL_URL = 'file:///C:/Users/MYNAME/AppData/Roaming/Mozilla/Firefox/Profiles/SOMERANDOMID.default/gm_scripts/greasemandrill/greasemandrill.user.js';
// Linux:
// GREASEMANDRILL_URL = 'file:///home/MYNAME/.mozilla/firefox/SOMERANDOMID.default/gm_scripts/greasemandrill/greasemandrill.user.js';





var main = function() {

function makeLink(element) {
    var text = element.textContent;
    var cleanedText = text;
    if (type == 'script')
        cleanedText = text.replace(/(?:[^:])\/\/.*/g,'');
    cleanedText = cleanedText.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '').replace(/<!--|-->/g,'').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
    if (!/\S/.test(cleanedText)) return null;
    var type = element.tagName.toLowerCase();
    var title = '<' + type + '>' + cleanedText + '</' + type + '>';
    var url = 'data:text/html;charset=utf-8,'
            + '<!DOCTYPE html><html><title>View Embedded Code from ' + location.href + '</title>'
                + '<base href=\'' + location.href + '\'>'
                + '<pre class=\'GreaseMandrill LANG:' + (type == 'style' ? 'CSS' : 'JS')  + '\'>'
                + encodeURI(text.replace(/&/g, '&amp;').replace(/</g, '&lt;')) + '</pre>'
                + (USEGREASEMANDRILL ? '<script type=\'text/javascript\' src=\'' + GREASEMANDRILL_URL + '\'></script>' : '')
                + '</html>';
    return new Array(title, url);
}

var scriptURLs = new Array();
var stylesheetURLs = new Array();
var links = document.getElementsByTagName('link');

for (var i = 0; i < links.length; i++) {
    var rel = links[i].getAttribute('rel');
    if (!rel) continue;
    var href = links[i].getAttribute('href');
    if (!href) continue;
    if (rel.toLowerCase() == 'stylesheet')
        stylesheetURLs.push([href, links[i].href]);
}
var stylesheets = document.getElementsByTagName('style');
for (var i = 0; i < stylesheets.length; i++) {
    var newLink = makeLink(stylesheets[i]);
    if (!!newLink) stylesheetURLs.push(newLink);
}
var scripts = document.getElementsByTagName('script');
for (var i = 0; i < scripts.length; i++) {
    var url = scripts[i].getAttribute('src');
    if (url)
        scriptURLs.push([url, scripts[i].src]);
    else {
        var newLink = makeLink(scripts[i]);
        if (!!newLink) scriptURLs.push(newLink);
    }
}

if (stylesheetURLs.length > 0) {
    GM_registerMenuCommand('-------------------- Styles: --------------------', new Function());
    for (var i = 0; i < stylesheetURLs.length; i++) {
        GM_registerMenuCommand(stylesheetURLs[i][0], new Function('', 'GM_openInTab(\"' + stylesheetURLs[i][1] + '\");'));
    }
}
if (scriptURLs.length > 0) {
    GM_registerMenuCommand('-------------------- Scripts: -------------------', new Function());
    for (var i = 0; i < scriptURLs.length; i++) {
        GM_registerMenuCommand(scriptURLs[i][0], new Function('', 'GM_openInTab("' + scriptURLs[i][1] + '");'));
    }
}
if (scriptURLs.length > 0 || stylesheetURLs.length > 0) {
    GM_registerMenuCommand('------------------> (refresh) <-------------------', arguments.callee);
}

} // end of main()

window.addEventListener('load', main, false);
