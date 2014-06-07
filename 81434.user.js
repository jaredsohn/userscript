// ==UserScript==
// @name         Apptrackr Links Checker
// @namespace    http://userscripts.org/scripts/show/81434
// @version      16.12
// @description  Checks for dead links and color codes the links.
// @include      http://*apptrackr.org/*
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////////////////////////////
//      Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////
var all = [];
var color_red_link = "lightPink";
var color_green_link = "paleGreen";
var hosts = [];
var imgs = [];
var other_alive = [];
var other_dead = [];
var other_link_qty = 0;
var other_links = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////
//      Hosts
// [0] name to categorize links
// [1] search string to hit on
// [2] file_is_alive search string
// [3] file_is_dead search string
////////////////////////////////////////////////////////////////////////////////////////////////////////

hosts.push (["appscene.org",
                        /APPSCENE\.ORG\/DOWNLOAD\.PHP|APPSCENE\.ORG\/FILES\/|APPSCENE\.ORG\/DOWNLOAD\//gi,
                        /Enter CAPTCHA/,
                        /The file you\'ve requested doesn\'t exist/gi
                        ]);
hosts.push (["badongo.com",
                         "BADONGO\.COM\/FILE\/",
                         /This file has been stored on the publisher\'s virtual drive on/gi,
                         /找不到檔案!/
                         ]);
hosts.push (["fileape.com",
                        /FILEAPE\.COM\/?|FILEAPE\.COM\/DL\//gi,
                        /Awesomeness/,
                        /This file is either temporarily unavailable or does not exist/gi
                        ]);
hosts.push (["filedude.com",
                        /FILEDUDE\.COM\/DOWNLOAD\//gi,
                        /Enter CAPTCHA/,
                        /The file you\'ve requested doesn\'t exist/gi
                        ]);
hosts.push (["filefactory.com",
                         "HTTP:\/\/WWW\.FILEFACTORY\.COM\/FILE\/",
                         /Click here to skip directly to the download link|Forum \(BBCode\)/,
                         /Sorry, this file is no longer available|This file has been deleted/
                         ]);
hosts.push (["fileflyer.com",
                         "HTTP:\/\/WWW\.FILEFLYER\.COM",
                         /Download your files here/,
                         /To report a bug ,press this link/
                         ]);
hosts.push (["hotfile.com",
                         "HOTFILE\.COM\/DL\/",
                         /Premium/,
                         /404 - Not Found/
                         ]);                    
hosts.push (["ifile.it",
                         "IFILE\.IT\/",
                         /short link/gi,
                         /no such file/
                         ]);                     
hosts.push (["mediafire.com",
                         /WWW\.MEDIAFIRE\.COM\/?|WWW\.MEDIAFIRE\.COM\/download\.php?/gi,
                         /Share this file/gi,
                         /Invalid or Deleted File/
                         ]);                                    
hosts.push (["zshare.net",
                         "WWW\.ZSHARE\.NET\/DOWNLOAD\/",
                         /Last download/gi,
                         /Error 404 - File Not Found/
                         ]);
hosts.push (["2shared.com",
                         "WWW\.2SHARED\.COM\/FILE\/",
                         /Last downloaded/gi,
                         /The file link that you requested is not valid/gi
                         ]);
hosts.push (["4shared.com",
                         "4SHARED\.COM\/FILE\/",
                         /Rate this file/gi,
                         /The file link that you requested is not valid/gi
                         ]);

////////////////////////////////////////////////////////////////////////////////////////////////////////
//      Inline Images + GM Styles
////////////////////////////////////////////////////////////////////////////////////////////////////////
alive_link_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hYFAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vyIKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSsL2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13ZpdyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaYehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQRj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk146BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noHXccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';
adead_link_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQCY6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVksDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2NsLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmRQHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';


GM_addStyle("#alive_link {background:transparent url("+alive_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#adead_link {background:transparent url("+adead_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");

////////////////////////////////////////////////////////////////////////////////////////////////////////
//      Process links
////////////////////////////////////////////////////////////////////////////////////////////////////////
linkify();
var links = document.getElementsByTagName('a');
var bad_images = [];
var good_images = [];
for (var i = 0; i < links.length; i++){
        var urll = links[i].href;
        // New Link identifier and categorizer
        urll = urll.replace(/%2F/gi,'/');
        urll = urll.replace(/%3A/gi,':');
                                //Check for a valid image link
                                //Host file links
                                        for (var ii = 0; ii < hosts.length; ii++){
                                                if (links[i].href.toUpperCase().search(hosts[ii][1]) != -1) {
                                                        other_links.push(urll);
                                                        other_link_qty = other_link_qty + 1;
                                                        other_alive.push(hosts[ii][2]);
                                                        other_dead.push(hosts[ii][3]);
                                                }
                                        }
}
all = all.join();
all = all.replace(/,/gi,'\n');
var all=all.split("xxxczxczxcsasdasdasdx4234");

other_link_check(other_links);

////////////////////////////////////////////////////////////////////////////////////////////////////////
//      Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////

function DiplayTheDeletedLinks(fotfoundlinks){
        var xpathoffotfoundlinks = "//a[contains(@href,\'" + fotfoundlinks.join('\') or contains(@href,\'') +"\')]";
        var allLinks, thisLink;
        allLinks = document.evaluate( xpathoffotfoundlinks, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i = 0; i < allLinks.snapshotLength; i++) {
                var thisLink = allLinks.snapshotItem(i);
                display_flag(thisLink.href,"DEL");
        }
}

function DiplayTheLiveLinks(livelinklinks){
        var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') +"\')]";
        var allliveLinks, thisLink;
        allliveLinks = document.evaluate( xpathoflivelinklinks, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i = 0; i < allliveLinks.snapshotLength; i++) {
                var thisLink = allliveLinks.snapshotItem(i);
                display_flag(thisLink.href,"LIVE");
        }
}

function other_link_check(other_links){
        for (var i = 0; i < other_links.length; i++){
                var file_is_alive = other_alive[i];
                var file_is_dead = other_dead[i];
                var URL = other_links[i];
                var ret = other_get_url(URL, file_is_alive, file_is_dead);
        }
}

function other_get_url(URL, file_is_alive, file_is_dead){
        GM_xmlhttpRequest({
                method: 'GET',
                url: URL,
                headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', }, 
                onload: function(responseDetails) {
                        if (responseDetails.responseText.search(file_is_dead) != -1 && file_is_dead != ""){
                                display_flag(URL, "DEL");
                        } else {
                                if (responseDetails.responseText.search(file_is_alive) == -1) {
                                        display_flag(URL, "DEL");
                                } else {
                                        display_flag(URL, "LIVE");
                                }
                        }
                }
        });
}

function display_flag(URL, uType){
        var bgc = "";
        var lnk = "";
        var dec = "";
        switch(uType){
                case "DEL":
                        bgc = color_red_link;
                        lnk = 'adead_link';
                        dec = '';
                        break;
                case "LIVE":
                        bgc = color_green_link;
                        dec = "";
                        lnk = 'alive_link';
                        break;
                default:
                        break;
        }
        var xpathotherlinks = "//a[contains(@href,\'"+URL+"\')]";
        var allLinks, thisLink;
        allLinks = document.evaluate( xpathotherlinks,  document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i = 0; i < allLinks.snapshotLength; i++) {
                var thisLink = allLinks.snapshotItem(i);
                thisLink.id = lnk;
                thisLink.style.backgroundColor = bgc;
                thisLink.style.textDecoration = dec;
        }
}

function linkify(){
        try{
                //var regex = /((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;
                var regex = /(?:https?|ftp):\/\/[^\s'"'<>()]*/gi;
                var regex_exclude_html_trunc = /http:\/\/uploading\.com|http:\/\/letitbit.net|http:\/\/www.gshare\.com/gi;
                var regex_ends = /\.rar\.html\b/gi;
                var altText, tekst, muligtLink;
                var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option', 'pre', 'code'];
                var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";
                altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                for(var i=0;i<altText.snapshotLength;i++){
                        tekst = altText.snapshotItem(i);
                        muligtLink = tekst.nodeValue;
                        if(regex.test(muligtLink)){
                                var span = document.createElement('span');
                                var lastLastIndex = 0;
                                regex.lastIndex = 0;
                                for(myArray = null; myArray = regex.exec(muligtLink); ){
                                        var link = myArray[0];
                                        span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));
                                        var href = link;
                                        var prefix = '';
                                        if(href.length > 7){
                                                prefix = href.substring(0,7);
                                        }
                                        /*if(prefix.toLowerCase() != 'http://'){
                                                href = 'http://' + href;
                                        }*/
                                        
                                        //Fix links that end in .rar.html
                                        if (href.search(regex_exclude_html_trunc) == -1){
                                                if (href.search(regex_ends) != -1){
                                                        href = href.substr(0, href.length - 5);
                                                }
                                        }
                                        var a = document.createElement('a');
                                        a.setAttribute('href', href);
                                        a.appendChild(document.createTextNode(href));
                                        span.appendChild(a);
                                        lastLastIndex = regex.lastIndex;
                                }                               
                                span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
                                tekst.parentNode.replaceChild(span, tekst);
                        }
                }
        } catch(e){alert(e);}
}