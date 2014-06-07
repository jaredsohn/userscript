// ==UserScript==
// @name           OWA Search
// @namespace      http://kode.lurtgjort.no/
// @description    Adds search functionality to Outlook Web Access
// @author         havard@gulldahl.no
// @include        https://*/exchange/*,DanaInfo=*
// @include        https://*/exchange/*/,DanaInfo=*?cmd=Contents*
// @include        http://*/exchange/*?Cmd=contents*
// ==/UserScript==

var buttonbar, contentpane;


// image data for search logo
var _search_ui_img = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%E0w%3D%F8%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%19tEXtSoftware%00www.inkscape.org%9B%EE%3C%1A%00%00%03%B6IDATH%89%B5%95KH%9Cg%14%86%DF%EF6%FF%CC%EF%EF%CC%C4V%93%B6R%A5%89%91DA%14%17%85%2C%24AP%07JKA%9AE%12j%A1P%02%05%DDu%17%5C5%3B%25%8B%84%D2%856%EDB%B0%D0%D2%8B%C4%20%B5I%17!%B4%08%12%87%12%2C%25%86ihGcF%E7%F2_%BE%5B%17%ADYX%A9%7F%9A%E6%5D~%7C%BC%0F%E7%BC%87s%88%B5%16%CFR%F4%99%BA%03%E0%7B%3D%B6%E5%C6%D3%86%A5%C6%04g%FDJ%EB.%00%E0%8C-K%A5%17%A8%F6'V%E7.l%C7%05%90%DD-j%CD%5D%3C%25%04%9F%19%EC%EB%CC%F6t%B4%88%E6%A6%0C%00%A0P%DC%C2R~M%5E%BB%B1R%92R%9D%BE7%F7%C1wO%0Ch%CD%5D%3C%F5%7C%83%F7%F5%E8%C8%80%9B%CD%B8xX%0E%01%AB%E1%08%8A%04gp%9D%046%1EU195_%DB%D8%AC%BC%16%07%F28%83%B6%DCxZ%08%3E3%3A2%E0%82%0B%FC%F2%60%0BA%24A%60%C1%09%90%A0%16%0C%11%B2%E9%24FG%06%5C!%F8L%5Bn%3C%1D%1B%60Xjl%B0%AF3%9BM%BBP2%C2%E1%83I4%D6s%08%C6%C0(%01g%14%0E%A78%90%02%9A%1A%3C%0C%F6uf%0DK%8D%C5%06%08%CE%FA%7B%3AZD5%08%91%AD%E3%60%94%20%9D%E4%C8%B8%14%DA%00%16%06%DA%00%CAXD2BOG%8B%10%9C%F5%C7%06(%AD%BB%9A%9B2%A0%04%B0%160%06%B0%D6%C2%E1%14%DAZ%84%D2%22%90%06%B5%C8%C0X%83%E6%A6%0Cv%26%EC%DF%F4%8F1-%F9%0A%0D.%87%B1%16%DA%00%95%D0%20%92%06%00%852%1A%B0%04%16%04%A9%C4~%D6%BB*%E0%8C-%17%8A%5B%08%22%60%BD%1C!T%06%0F%AB%0A%C5%AD%08%A1%B2%F0%23%0D%3F4%F0%A5%86%B6%16%85%E2%168c%CB%B1%01R%E9%85%A5%FC%9A%7C%B9%B1%0E%F7%D6%03%AC%14%7C%ACm%84%A8%84%06%BE4%A8E%165i%E0G%06i7%89%A5%FC%9A%94J%2F%C4%06P%EDO%5C%BB%B1R*%97kh%7B1%8DHj%84%EA%AF%BE%FB%91%81%1Fj%F8%A1%86%E7%3A%D8%2CU1%7F%F3%CE6%D5%FEDl%C0%EA%DC%85m)%D5%E9%C9%A9%F9%9A%03%8DW%DB%1B%D1%E09%B0%84%C0X%C0M%0A%1C~!%03%13I%5C%9A%9AC%2B%BB%5B%EC%F6%F2d%3F%C0%13%AF%8A%F9%9Bw%B6%5B%D9%DD%E2A%A5%8E%B9%95%AC%02%C8o%B5J%E5%EC%A7%B7%3F%FE!%16%00%D8%7F%D9u%7By%92%D98%B4%FE%D6%7B%AF%8B0%88%F0%D5%F4%F5%C8%AF%86g%AE%DE%BE%3C%1B%0B%10G%EF%F6%BD%BF%3A8%7C%F2%C8%F1%9E%A3%D8%F8%E3%11%3E%BB%F4y%E8%D7%E4%D9%DD%90%FF%7C%0F%82%20xg~%F6%7B%FF%FE%CF%05%24)%C7%9Bg%86%9CdR%7Cr%AE%F7%FC%F0%FFR%01%00%9C%EB%3D%3F%EC%A4%D8t%EE%8D%93n6%5B%8FR%A9%8Co%BF%5C%AC%85Q0%B8%93%C9S%5D%B4%AB%3F%5D%9E%0D%7D%FD%F67_%2CV%1F%FC%FA%3B%B8%04%BA%BB%8E%B9%82%25%3E%DA%F9%B3%E7E%23%84%B0%F6%13'%5C%A1%94%CBC%922%5C9%C60%87%12%C5%AD%E5%84%10e%8D%E5%8AR%1DR%CD%7F%7C%258%3Az%7D%F1%D6dwg%7B%9D%C3%05%2Cp%E0%B1%D7%EE%16%F5%F6%F6%8A(%95%F2l%18z%09%CD%3C%C3%B4g4%A9%075%9E%B5%D4%03%25%1E%8C%AD%10b*0%B4B%99-S%CD*%87%C4K%C7%1B%E8s%1F2%D04%2C%C6%A7o%5D%B9%B2'%E0%EF%0A%C8%91%A1%A1%0467%1D%D7gI%C6%90R4L%19J%93%DCZ%02B%22%A5y%C8%84%09%84RA%10%D4%07%C0z%94%CF%E7%A5%DDe%F8T!%C7%D1%9F%DB%15%F2J%F6%E59f%00%00%00%00IEND%AEB%60%82";
var _search_href = '.';

// Template for search box UI that goes into navbar
var _search_ui = '<TD class="nbButton"><FORM action="." STYLE="height:26px;" TARGET="top" OnSubmit="return false;"><IMG src="' +
_search_ui_img +
'" width="24" height="24" alt="" border="0"><INPUT type="text" id="GM_OWA_SEARCH" name="GM_OWA_SEARCH" size="10" value="Search..." OnFocus="if(this.value==this.defaultValue)this.value=String();" OnBlur="if(this.value==String())this.value=this.defaultValue;"><INPUT type="button" value="Go" OnClick="top.viewer.location=\'%s&amp;GM_OWA_SEARCH=\'+this.form[\'GM_OWA_SEARCH\'].value;"></FORM></TD>';


function parse_search(search_url)
{
    // parse the search string (?var=val&morevar=moreval) into array
    // thank you, lazyweb + googoool
    var urlObj = new Object();
    search_url.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            urlObj[$1] = $3;
        }
    );
    return urlObj;
}

function first_inner_text(node)
{
    // go down the tree, looking for text nodes
    // works well for deeply nested information, like
    // <tr><td><font><a><b>TEXT
    if(! node.hasChildren && node.nodeType == node.TEXT_NODE)
        return node.nodeValue;
    return first_inner_text(node.firstChild);
}

function get_page_url(current_location, page)
{
    // return the url of the next page, given the current one
    // FIXME: get rid of regexps
    var ret = new String();
    current_location.search.replace(
        new RegExp('Page=([0-9]+)(&GM_OWA_SEARCH=.+)?'),
        function ($0, $1) {
            if(page == undefined) //get next page
                page = parseInt($1)+1;
            ret = current_location.protocol + '//' +
                  current_location.hostname +
                  current_location.pathname+'?Cmd=contents&Page='+page;
        }
    );
//     GM_log("get_page_url: "+page);
    return ret;
}

window.addEventListener(
    'load',
    function() {

        // is this the top frameset? if so, there's no ?Cmd=... in the url
        if(document.location.search.indexOf('?Cmd') == -1) {
          try {
            var _frames = document.getElementsByTagName('frame');
            buttonbar = _frames[0].contentDocument;
            contentpane = _frames[1].contentDocument;
            // Add Search box UI to FRAMES['name'] == 'navbar'
            // Get the href of inbox, which is the first button
            _search_href = buttonbar.body.firstChild.getElementsByTagName('a')[0]['href']
            var row = buttonbar.body.firstChild.insertRow(-1);
            row.innerHTML = _search_ui.replace('%s', _search_href);
          } catch(e) {alert(e)}; // not the frameset document
        } else if(document.location.search.toUpperCase().indexOf('GM_OWA_SEARCH') != -1) {
          // do search
            GM_log(document.location.pathname + document.location.search);
            var params = parse_search(document.location.search);

            // a hack: create element to communicate with running script
            // FIXME
            var stop_search = document.createElement('div');
            stop_search.style.visibility = 'hidden';
            stop_search.id = 'GM_OWA_STOP_SEARCH';
            stop_search.innerHTML = 'false';
            document.body.appendChild(stop_search);

            //get header bar
            xp_headerbar = document.evaluate(
                "//table[@class='tblFolderBar']",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
//             alert(headerbar);
            table = xp_headerbar.snapshotItem(0);
            // get url of next page from flipper
            nexturl = table.rows[0].cells[1].getElementsByTagName('a')[1]['href'];
            lasttext = table.rows[0].cells[1].getElementsByTagName('b')[1].innerHTML;
            lastpage = parseInt(lasttext.replace(/[^\d]/g, ''));
            // delete page flipper
            table.rows[0].deleteCell(1);
            // write nice text in header
            var headcell = table.rows[0].cells[0];
            headcell.getElementsByTagName('b')[1].innerHTML = " : Searching for %s... <span id=\'GM_OWA_SEARCH_PROGRESS\'>(0 %)</span> ".replace('%s', params['GM_OWA_SEARCH']);
            // a button to stop the search
            var stopbutn = document.createElement('span');
            stopbutn.innerHTML = '<INPUT type="button" id="GM_OWA_STOPBUTTON" value="Stop search" OnClick="document.getElementById(\'GM_OWA_STOP_SEARCH\').innerHTML = \'true\'">';
            headcell.appendChild(stopbutn);
            // get all mails
            var re = new RegExp(params['GM_OWA_SEARCH'], 'i');

            allmails = document.evaluate(
                "//table//table[not(@class)]//tr",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
            // for each one, look for the regexp `owa_search'
            for (var i = 1; i < allmails.snapshotLength; i++) {
                thismail = allmails.snapshotItem(i);
                _from = first_inner_text(thismail.cells[5]);
                _subject = first_inner_text(thismail.cells[6]);
                if((_from.search(re) == -1) && (_subject.search(re) == -1)) {
                    // not a hit, hiding row
                    thismail.style.display = 'none';
                }
            }
            // add iframe cache to store all email pages we loop thru
            allmailtable = document.getElementsByTagName('table')[3];

            var cache = document.createElement('iframe');
            cache.id='GM_OWA_CACHE';
            cache.style.visibility = 'hidden';
            cache.style.position = 'absolute';
            document.body.appendChild(cache);
            document.addEventListener('DOMFrameContentLoaded',
                function() {
                treemails = cache.contentDocument.evaluate(
                    "//table//table[not(@class)]//tr",
                    cache.contentDocument,
                    null,
                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                    null);
                // for each one, look for the regexp `owa_search'

                for (var i = 2; i < treemails.snapshotLength; i++) {
                    thismail = treemails.snapshotItem(i);
                    _from = first_inner_text(thismail.cells[5]);
                    _subject = first_inner_text(thismail.cells[6]);
                    if((_from.search(re) != -1) || (_subject.search(re) != -1)) {
                        // a hit, adding row to table
                        row = allmailtable.insertRow(-1);
                        row.innerHTML = thismail.innerHTML;
                    }
                }

                // get next document
                GM_log('current cache: '+cache.contentWindow.location.search);
                cacheparams = parse_search(cache.contentWindow.location.search);
                GM_log('stopping search: '+stop_search.innerHTML);
                if(stop_search.innerHTML == 'false' && parseInt(cacheparams['Page']) < lastpage) {
                    cache.contentWindow.location.href =
                         get_page_url(cache.contentWindow.location);
                    document.getElementById('GM_OWA_SEARCH_PROGRESS').innerHTML = '(%s %)'.replace('%s', Math.round(parseInt(cacheparams['Page']) / lastpage * 100));
                }
            }, false);


            //start searching thru pages
            cache.contentWindow.location.href = get_page_url(window.location, 2);

        }

    },
    true);


