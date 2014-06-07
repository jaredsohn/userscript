// ------------------------------------------------------------------------------------------------------------
// StumbleUpon Review Formatter
// version 0.8
// ------------------------------------------------------------------------------------------------------------
// History:
//      v0.1 Initial version.
//      v0.2 URLs are converted to links.
//      v0.3 Introduced the "full restore mode" that completely restores each post
//      v0.4 Fixed a minor issue with the "Twitter" links.
//      v0.5 Added automatic update checker.
//      v0.5.1 Minor bugfix
//      v0.6 UTF-8 character set fix implemented. [SUA] tags are removed from reviews.
//      v0.6.1 Optimized SUA-tag filtering.
//      v0.6.2 Bugfix. Better support for FlashBlock (only on own blog pages!)
//      v0.6.3 Bugfix for the previous bugfix. I'm sorry :-(
//      v0.7 - 2010-03-19
//              Added support for filtering the new SUA scribble tags
//      v0.8 - 2010-04-08
//              Bugfix: Formatter didn't work on a few pages and on the own profile's review page
//
// ==UserScript==
// @author        dirtbagbubble
// @name          StumbleUpon Review Formatter
// @description   Adds line breaks to the posts on the review pages. An additional option restores the original posts on the review pages, including images, colors, fonts etc.
// @include       http://www.stumbleupon.com/*
// @version       0.8
// @license       Freeware - (c) 2010 by dirtbagbubble (at yahoo dot com). Use it and learn from it as you please. I'd appreciate some credits if you're going to use larger portions of this script in your own work :-)
// ==/UserScript==

var suaRegex = /\[[ ]*S[ ]*U[ ]*A([ ]*S|)[^\]]*\](.|\s)*?\[[ ]*\/[ ]*S[ ]*U[ ]*A([ ]*S|)[ ]*\]/g;

/**
 * Component for checking for a new version of this script.
 * Must be instantiated as a new object.
 *
 * @param scriptId This script's userscripts.org id
 * @param thisVersion This script's current version.
 */
function UpdateChecker(scriptId, thisVersion) {
    this.scriptId = scriptId;
    this.thisVersion = thisVersion;
    // Warning sign from http://www.psdgraphics.com/icons/psd-red-and-yellow-warning-signs/
    this.warningSign = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oDChIOI3QqJL8AAARhSURBVDjLlZVtaJVlGMd/9/M852Vn5+yc7TidkebbtNbUmToxSlCTIExCCURDZZYp4QfRyAyiMPxiaSVkvn3Ioi+RJIUEZmJWZlqUoY45X5Yva7PNnXO2Pa/3ffVhIkED8//l+nN9+HHx57q4FP9DnUfnxt2OM8tj6f4pQSn9bcWwqQeq5hwyIqAU96YLe8YBIPsaM+HJ8kNScETCatHtGQlO5N/r3Fgb516l+1vvePmt+nUp5Iy0zRHTvNTIjbkSXR8byukHFgGYrquDMpzBmi27JgxAj418mBprBW6NEm+UKMdW0lsjdqXtUNbxihy1Dp/fP7o4GMMarPnQOk3hzXzCZMqX49SMpjgUZbnguCgrgmISyddOL5RSi+vWRbQdWHh3cOtHMwGoeKZmrJvMr8fNgeNByleUB5D0FLoLZefIjh23XY4+ln5g4QFa9k2+e8Z/7NiMd6z+oJSaxP/5ESPuPBk5PCGADM/HRIK54p5oMOK+K3Jk+u67RtGyuw6A+pHvz49NmLkgbP8b8YqKhM2jk3MANE7KQiyBBJ0qavsFZjQ9L5/QCND8Yd3g4PGrzvEE2NTP+cDK1OJfOSVWIg06SWV2YLsqMnGQOE6qGu/PLwXyihkvbQN4cPW5/4LP7RgDwOHDdW8xZvGI4qnPxYrbythlIEmqKssByGbKQFIYyrFTWdVzfDOMWzZFDtW+8G+OBXD6Zahbe4mujYylcdVKfeMC0c2TyorlgBhIjMpcGQC5igQoB0UMsdJI1IrffDDFtDUr29cxtG7tJU6tB6t5/zymbR2Yuuq5FZuoaMjf/G4LdnoI2ihAQBuy6QQA6XQcNGgEtI3lZCie3QdWorFm2cIlANPfAYurhweO4etJsxk/f/6tH/ZYBD1oiaODkMj3oVBCJALA6AgKvUjgEYUBkbaJ/G4pNn+lqBy2Ro40jAJQAC2ryNRueHWnztUuvfbFahJphZ2swEmmscrSZKtzkE/DTQ/ySSj0U2jvJvJ6idxewt4SWse4f/ZThG03Np/55tc37BVA066lj1Nd/3bnTx8TdF8W5SQVSiECGCFVabFl6yVmrTxD6a8+npwdo7ejhPY8Ii8kDDT93X0SSxpl59QsqNprbdrTUF7SsllH3fS0fi8CSkca7QYYz8fvc0F6eW3ndQC2fdoOPQWiPpfI9Qk9HxMYbMtSV0+cl9RwX1lW5zbLjsXmpkeMmtn+42cSlEShHHQgRKHG9wK01wc3CuzbkKO60mL7ixko9uG7LoEboENDGERggfFR149flPyo/mcdOxEuUtmQrrO/o31weyIsFaEcULaFZTtc6Q1YMjVO0+wK3KJwuaWE5xkkNJhQiLRBCegArp3q576JIU7kuW1Y1xj/9AxuXbwmyhEFBoUgSrDEILZQNELB10jcUDZckRKFGEHkNlQZJESG1KJ0GKJa9k7MJtPB/vJqWWCp8PZaaSAC0SgMoBHRcNsPVANy5x0ACqUEE9mm0FG+8x9dLyrYdNncpgAAAABJRU5ErkJggg==';
    // Close button from http://www.clker.com/clipart-24890.html
    this.closeButton = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAUCAYAAACTQC2+AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAGYwAABmMBTYgavAAAAAd0SU1FB9oDChInJK4ILvcAAASkSURBVEjHtZVfaBRXFMZ/c++dmd1NNrttJPEvJhQVLNimjYWKvlSovlQEn2qJPihEREpFfLBPfSo+WF8E31sJthRRqVD/tBZsBEFN1tQYCfivRhM2ZpPJ7mR3Z+bO7cMmmxho+9JeODDD+ea7597zfXOs66dOFdszGQdj+F+WZfHE8wK1Kp122sAhisCy5gGLN16YW7j+CWcM2DZROo2KwtCEvs80YAkxmzegNVKI2jMQC4G1aDNjDCKOMQvekbKOM3FMExA1NBgVhSH+1BQztj1fTRTRpBSNLS08z+dpBV5Vq+A48xhjIAhodl0KSrFy6VK8kRGKWmOkrGNkGBI5DioKAvxSiYptgxA1gigiu2IFn/b2kmxu5uulS1GFAqViEVy3XkyjMRQaGvhydBT7yRO+amvDKpWozF1hHCPCkCibRegwpOJ5BL5PWCoR+D56ZoZ8scjHO3bw7YkTfJ9OM+W6KN+nWihQLRRQnsek6/JDUxPfnTzJ5u3buTk4SFCtEpRKda6K56HDEBGGIb7nUSmX6zHj+5QfPeKTly+5cvs2R7q7udLezoRtE4+NEY+NMeE4/NLezpHubq7fucPb/f10JhKUPI9KpVLn8j2PMAxROgyZ8TxCpV5rYrFapXT1KqvGx7kcx3yxbx+nz5xh/eQkAA82buTzPXv49e5d3J4e5LNnjEmJse3XRGXPnkhFYYhlDEKIOgApkVISVir4fX0sCwKuK8XBri5+b2sDKTm4aRO/DQyQOncO5+lTykohEolan+dUGMfExhCFIcr3PPK5HO7KlVhzaplVjIljoulpxK1bpG7f5t7p02zZsgWA/uFhCocPU71/H53Nohoba4UusIDRmurICC3r1qG88XFu5vPY+Tz2Yi8CM0AMrLhxgzat6zkJDPT28iIIMPk8KUAs+j6cjY/Gx1FSCJYDKSkRC/Rv4phQawSQXr+ezgsX6Fizhj+Gh9HAu2vXUh4epn/nTqZyOSLAkfK1U8VaMzNrfCWlJAUkEgmEUvNXViphA8mODt4/f56Nq1fz8/37PNm6lVhr/rx2jR0dHdiXL9O/axf+zZsEWuMkErUWWBZxFIHvI6VEKCFwAFcpHClxlCJhDM1AdvNmOi9dYuPq1VwaGmK8q4tqPk91YoLJzz7jfC7He62tdF68SMu2bWQBJ45rPFLWOAElBEJJSRpIuW4tHIcGpXi+YQPLzp6lc/lyfhocpLJ7NzqXI60UGdtGDw0R7d3Lj319vNPczLKeHnRnJ0nHmedyXdKAkhIlpCQBWK6LkBJjDE4Y0mFZPMzlePjiBWuPHiW4dw+RyeBmMrVGT0+jBwZIHzrEN8ePY4KAD7Rm1LbRrotlWcRakwCElChbCFKzHhKWhbEs4mQSPTLCh8eO8UpK9OPHOM3NpBoa5s2YyRDZNubBA946cIA3bZvJ589RqRSuEFizf3wjBPacGBKuC3NNNAZcF51MMl4s1kZBayupRYrCGJxEArTG9X2mLQu1ZAnOrBCwLIzW4LpIKVFSCCtbLlMdHZ037N9N28XD719wRmvccplICEtNJpPBG/v3IxaY8T+b4kAkJZPJZPAXzkw52AmAg6MAAAAASUVORK5CYII=';

    this.onClose = false;

    /**
     * Adds an update notification bar to the top of the current page.
     *
     * @param overlay If set to true, the notification bar will overlay the top
     *                of the page without creating an additional gap.
     */
    this.onUpdateAvailable = function(infos, overlay) {
        var self = this;
        var updateBar = document.createElement('div');

        if(overlay) {
            var dummyBar = updateBar;
        } else {
            var dummyBar = document.createElement('div');
        }

        var noti = document.createElement('div');
        var installButton = document.createElement('a');
        var closeButton = document.createElement('img');

        noti.innerHTML = '<img style="padding:0px;border:none 0px;margin:0px;background:none;vertical-align:middle" src="' +
                         this.warningSign + '"> An update is available for <i><a style="font-decoration:underline;color:black" target="_blank" href="' +
                         infos.infoPageUrl + '">' +
                         infos.scriptName + '</a></i>: ';

        installButton.innerHTML = 'Install version ' + infos.version;
        installButton.style.padding = '2px';
        installButton.style.MozBorderRadius = '5px';
        installButton.style.border = 'solid 1px black';
        installButton.style.backgroundColor = 'white';
        installButton.style.color = 'black';
        installButton.setAttribute('href', infos.url);
        installButton.addEventListener('click', function() {
            document.body.removeChild(dummyBar);
        }, false);

        closeButton.setAttribute('src', this.closeButton);
        closeButton.style.cssFloat = 'right';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', function() {
            document.body.removeChild(dummyBar);
            if(self.onClose) self.onClose();
        }, false);
        closeButton.style.border = 'none 0px';
        closeButton.style.outline = 'none 0px';
        closeButton.style.margin = '2px';
        closeButton.style.padding = '0px';

        if(!overlay) dummyBar.appendChild(updateBar);
        updateBar.appendChild(closeButton);
        updateBar.appendChild(noti);
        noti.appendChild(installButton);

        noti.style.margin = '2px';
        dummyBar.style.height = '22px';
        dummyBar.style.margin = '0px';
        dummyBar.style.padding = '0px';

        updateBar.style.fontFamily = 'sans-serif';
        updateBar.style.fontWeight = 'bold';
        updateBar.style.color = '#5E4300';
        updateBar.style.fontSize = '12px';
        updateBar.style.margin = '0px';
        updateBar.style.textAlign = 'left';
        updateBar.style.height = '22px';
        updateBar.style.borderBottom = '1px solid black';
        updateBar.style.position = 'fixed';
        updateBar.style.width = '100%';
        updateBar.style.background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAWCAIAAACOpGH9AAAAMUlEQVQImWN4vJqBiZGJnYmRmZ2JkZmDiZGJnYkJxmZmh/I5UOQZmaFiSPqYoGqh+gC0LgKl8uVdXwAAAABJRU5ErkJggg==)';
        updateBar.style.zIndex = '200000001';
        updateBar.style.top = '0px';
        updateBar.style.left = '0px';
        updateBar.style.MozBoxShadow = '1px 1px 4px #000000';

        if(overlay) {
            document.body.insertBefore(updateBar, document.body.firstChild);
        } else {
            document.body.insertBefore(dummyBar, document.body.firstChild);
            document.body.marginTop = '22px';
        }
    };

    /**
     * Checks for an update on userscripts.org
     * If available, the according event handler this.onUpdateAvailable is called.
     *
     * @param overlay If set to true, the notification bar will overlay the top
     *                of the page without creating an additional gap.
     * @param callback An optional function that is called after the update check has occurred.
     *                The availability of an update is passed to it as a boolean value.
     */
    this.checkForUpdate = function(overlay, callback) {
        var self = this;
        var infoPageUrl = 'http://userscripts.org/scripts/show/' + this.scriptId;

        GM_xmlhttpRequest({
            method: "GET",
            url: infoPageUrl,

            onload: function(response) {
                var currentVersion = (/<div\s+id=["']summary["']>(.|\s)+?<b>\s*Version:\s*<\/b>\s*([^<\n]+)/i).exec(response.responseText)[2];
                var scriptName = (/<h1\s+class=["']title["']>([^<]+)<\/h1>/i).exec(response.responseText)[1];

                if(currentVersion != self.thisVersion) {
                    self.onUpdateAvailable({version : currentVersion,
                                            url : 'http://userscripts.org/scripts/source/'
                                                  + self.scriptId + '.user.js',
                                            'scriptName' : scriptName,
                                            'infoPageUrl' : infoPageUrl}, overlay);
                    if(callback) callback(true);
                } else {
                    if(callback) callback(false);
                }
            }
        });
    };

    /**
     * Starts the automatic update checking routine.
     * Every 10th time this script is executed, an update check will be done.
     *
     * @param overlay If set to true, the notification bar will overlay the top
     *                of the page without creating an additional gap.
     * @param callback An optional function that is called after the update check has occurred.
     *                The availability of an update is passed to it as a boolean value.
     */
    this.start = function(overlay, callback) {
        var current = GM_getValue('update_counter');

        if(!current) {
            current = 0
        }

        ++current;

        if(current >= 10) {
            this.checkForUpdate(overlay, callback);
            current = 0;
        } else {
            if(callback) callback(false);
        }

        GM_setValue('update_counter', current);
    };
}

// TQuery ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Tiny Query class.
 */
function TQuery() {
    this.nodes;
}

TQuery.prototype.query = function(xpath, context) {
    if(!context) context = document;
    var result = document.evaluate(xpath, context, null, XPathResult.ANY_TYPE, null);
    this.nodes = new Array;

    while(element = result.iterateNext()) {
        this.nodes.push(element);
    }

    return this;
};

TQuery.prototype.each = function(func) {
    for(var i = 0; i < this.nodes.length; ++i) {
        func(this.nodes[i]);
    }

    return this;
};

TQuery.prototype.setInnerHTML = function(html) {
    return this.each(function(node) {
        node.innerHTML = html;
    });
};

var $ = function(a, b) {
    var tq = new TQuery;
    return tq.query(a, b);
};

// PROTOTYPE EXTENSIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * [Array prototype function]
 * Searches an array.
 *
 * @param needle The element to search in the array.
 * @return The index position of the element if found, otherwise -1.
 */
Array.prototype.search = function(needle) {
    for(var i = Math.ceil(this.length / 2), j = this.length - 1; i--; j--) {
        if(this[i] == needle) return i;
        if(this[j] == needle) return j;
    }

    return -1;
};

/**
 * A filter for transforming URLs into anchor tags.
 */
var UrlFilter = {
    /**
     * List of all available top level domains. This is used to identify a
     * valid URL
     * Source: "http://en.wikipedia.org/wiki/List_of_Internet_top-level_domains"
     */
    topLevel : [
        "aero", "asia", "biz", "cat", "com", "coop", "edu", "gov",
        "info", "int", "jobs", "mil", "mobi", "museum", "name", "net",
        "org", "pro", "tel", "travel", "ac", "ad", "ae", "af", "ag",
        "ai", "al", "am", "an", "ao", "aq", "ar", "as", "at", "au",
        "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh",
        "bi", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw",
        "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck",
        "cl", "cm", "cn", "co", "cr", "cu", "cv", "cx", "cy", "cz",
        "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "er",
        "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga",
        "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn",
        "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm",
        "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io",
        "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg",
        "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la",
        "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly",
        "ma", "mc", "md", "me", "mg", "mh", "mk", "ml", "mm", "mn",
        "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx",
        "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no",
        "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph",
        "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa",
        "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se",
        "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr",
        "st", "su", "sv", "sy", "sz", "tc", "td", "tf", "tg", "th",
        "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "tt", "tv",
        "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "va", "vc",
        "ve", "vg", "vi", "vn", "vu", "wf", "ws", "ye", "yt", "yu",
        "za", "zm", "zw", "xn--0zwm56d", "xn--11b5bs3a9aj6g",
        "xn--80akhbyknj4f", "xn--9t4b11yi5a", "xn--deba0ad", "xn--g6w251d",
        "xn--hgbk6aj7f53bba", "xn--hlcj6aya9esc7a", "xn--jxalpdlp",
        "xn--kgbechtv", "xn--zckzah", "arpa"
    ],

    /**
     * Tranforms URLs into anchor tags.
     *
     * @param value The string to filter.
     * @return Filtered string
     */
    filter : function(value) {
        /**
        * Callback function for filter method.
        */
        function filterCallback(matched, a, b, c, d, e, f, g, h) {
            // If http, https or ftp are not given, we need to prepend
            // http:// - otherwise the URL will be handled as a relative URL by the
            // web browser
            var prep = c ? '' : 'http://';

            // Only allow domain names with a valid top level domain
            if(UrlFilter.topLevel.search(h.toLowerCase()) != -1) {
                return '<a href="' + prep + matched +
                       '" target="_blank">' + matched + '</a>';
            } else {
                return matched;
            }
        }

        // Regex matches valid RFC 1738 URLs whereas the protocol is omittable
        // and if specified it is constrained to either http, https or ftp
        return value.replace(/\b(((http|https|ftp):\/\/|)([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|(www\.[A-Z0-9\-]+\.|)(([A-Z0-9\-]+\.)+([A-Z0-9\-]+)))(:[0-9]+|)((\/[A-Z0-9\$\-_\.\+!\*\'\(\),%]+)*|)(\/|)(\?[A-Z0-9\$\-_\.\+!\*\'\(\),%\[\]=&]*|)(\#[A-Z0-9\$\-_\.\+!\*\'\(\),%\[\]=&]*|))/ig,
            filterCallback);
    }
};

/**
 * Checks a string for UTF-8 encoded characters.
 *
 * @param txt The text to check.
 * @return Boolean
 */
function detectUTF8(txt) {
    if(txt) return txt.match(/([\xC2-\xDF][\x80-\xBF]|\xE0[\xA0-\xBF][\x80-\xBF]|[\xE1-\xEF][\x80-\xBF][\x80-\xBF]|\xF0[\x90-\xBF][\x80-\xBF][\x80-\xBF]|[\xF1-\xF7][\x80-\xBF][\x80-\xBF][\x80-\xBF]|\xF8[\x88-\xBF][\x80-\xBF][\x80-\xBF][\x80-\xBF]|[\xF9-\xFB][\x80-\xBF][\x80-\xBF][\x80-\xBF][\x80-\xBF]|\xFC[\x84-\xBF][\x80-\xBF][\x80-\xBF][\x80-\xBF][\x80-\xBF]|\xFD[\x80-\xBF][\x80-\xBF][\x80-\xBF][\x80-\xBF][\x80-\xBF])/) != null;
    return false;
}

/**
 * Transforms user name references into links.
 *
 * @param txt The text to filter.
 * @return The filtered text.
 */
function twitterize(txt) {
    return txt.replace(/([^\w\d])@([\w\d_-]+)/g, '$1<a href="http://www.stumbleupon.com/stumbler/$2/">@$2</a>');
}

/**
 * Returns true if we're currently on a stumble's review page.
 *
 * @return boolean
 */
function isReviewPage() {
    return window.location.href.match(/^(http|https):\/\/www.stumbleupon.com\/url/i);
}

/**
 * Relabels the add site button.
 */
function fixAddButton() {
    $('//li[@class="addSite"]/a').setInnerHTML('New Post');
}

/**
 * Updates some navigation elements.
 */
function fixNavigation() {
    var navBar = document.getElementById('navMain');
    var group = document.createElement('li');
    group.setAttribute('class', 'groups');
    var groupLink = document.createElement('a');
    groupLink.href = '/groups';
    groupLink.innerHTML = 'Groups';
    group.appendChild(groupLink);
    navBar.insertBefore(group, navBar.lastChild);

    if(isReviewPage()) {
        $('//div[@class="colMain"]/div[@class="filter"]').each(function(bar) {
            var restore = GM_getValue('restore');
            var button = document.createElement('a');
            button.setAttribute('class', 'btnGreen');
            button.addEventListener('click', function() {
                if(GM_getValue('restore')) {
                    GM_deleteValue('restore');
                } else {
                    GM_setValue('restore', 1);
                }

                window.location.reload();
            }, false);

            if(restore) {
                button.innerHTML = 'Don\'t restore original reviews';
            } else {
                button.innerHTML = 'Restore original reviews';
            }

            bar.insertBefore(button, bar.firstChild);
        });
    }
}

/**
 * Loads a single review for restoration.
 *
 * @param url The review's url (without the http://www.stumbleupon.com part)
 * @param target The review's DOM node.
 * @param altCharset An optional alternative character set.
 */
function loadReview(url, target, altCharset) {
    var reviewNumber = (/\/stumbler\/[^\/]+\/review\/(\d+)\//i).exec(url)[1];
    var data = {
        method: "GET",
        url: 'http://www.stumbleupon.com' + url,

        onload: function(response) {
            eval('regex = /<var\\s+id="' + reviewNumber +
                 '"[^>]*>(.|\\s)+?<div\\s+class="review">((.|\\s)*?)<\\/div>/i');
            match = regex.exec(response.responseText)[2];
            match = twitterize(match.replace(/<object[^>]*>(.|\s)*?<\/object>/i, ''));
            target.innerHTML = match.replace(suaRegex, '');
        }
    };

    if(altCharset) {
        data.overrideMimeType = "text/html; charset=" + altCharset;
    }

    GM_xmlhttpRequest(data);
}

/**
 * Formats or restores the reviews (depending on setting)
 */
function formatReviews() {
    var restore = GM_getValue('restore');

    $('//div[@class="review"]').each(function(review) {
        if(isReviewPage()) {
            if(restore) {
                $('./preceding-sibling::p', review).each(function(p) {
                    var revUrl = p.innerHTML.match(/\/stumbler\/[^\/]+\/review\/\d+\//i);

                    if(revUrl) {
                        revUrl = revUrl[0];

                        if(detectUTF8(review.innerHTML)) {
                            loadReview(revUrl, review, 'UTF-8');
                        } else {
                            loadReview(revUrl, review);
                        }
                    }
                });
            } else {
                review.innerHTML = UrlFilter.filter(review.innerHTML.replace(/\s+<span>/i,'<span>').replace(/\n/g, '<br />'));
            }
        }

        // This is a workaround for making the crude Firefox extension FlashBlock work.
        // It essentially protects instances of embedded widgets.
        var wIdx = 0;
        var widgets = $('.//li[contains(@class, "embedded_object")]', review).each(function(node) {
            var div = document.createElement('div');
            div.setAttribute('SUF_widget', wIdx++);
            var parent = node.parentNode;
            parent.replaceChild(div, node);
        });

        review.innerHTML = twitterize(review.innerHTML).replace(suaRegex, '');

        $('.//div[boolean(@SUF_widget)]', review).each(function(node) {
            var parent = node.parentNode;
            parent.replaceChild(widgets.nodes[parseInt(node.getAttribute('SUF_widget'))], node);
        });
    });
}

// Start...
var updateChecker = new UpdateChecker(70863, '0.8');
updateChecker.start();
fixNavigation();
fixAddButton();
formatReviews();