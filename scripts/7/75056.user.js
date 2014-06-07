// ------------------------------------------------------------------------------------------------------------
// StumbleUpon Notifier
// version 0.1
// ------------------------------------------------------------------------------------------------------------
// ...................................................
// Dirtbagbubble Freeware License
// ...................................................
// Use this script and learn from it as you please,
// under following conditions:
//
// (1) You may use parts of this script in your own
//     work, like functions, classes, components or
//     "namespaces".
//
// (2) Don't claim parts of this script or the whole
//     script as your own work.
//
// (3) Don't use parts of this script or the whole
//     script in order to create another script
//     that essentially does the same like this one.
//     That's pointless and rude.
//
// (4) If you're using larger parts of this script,
//     provide a link to this script, so other
//     people can learn from it, too.
//
// (5) Re-using parts of this script in other scripts
//     for commercial purposes is only allowed with
//     my written consent.
//
// (6) Never ever obfuscate any part of my script.
//     Code obfuscation is evil.
//     However, if you want to compress your script
//     you should add a proper attribution of the
//     origin of my code parts to your script, so
//     people can see the original.
// ------------------------------------------------------------------------------------------------------------
// History:
//      v0.1 Initial version.
// ==UserScript==
// @name          StumbleUpon Notifier
// @description   Notifies you about new reviews about you.
// @include       http://*
// @include       https://*
// @version       0.1
// @author        dirtbagbubble
// @license       Freeware - (c) 2010 by dirtbagbubble (at yahoo dot com). See script for details.
// ==/UserScript==

/**
 * General purpose toolbar class.
 *
 * @param content The toolbar's content (must be a Element node).
 * @param cssBackground A string that denotes a background image or color (CSS-style).
 */
function Toolbar(content, cssBackground) {
    var self = this;
    var closeButton = document.createElement('img');
    closeButton.setAttribute('src', Resources.closeButton);
    closeButton.style.cssFloat = 'right';
    closeButton.style.cursor = 'pointer';
    closeButton.style.border = 'none 0px';
    closeButton.style.outline = 'none 0px';
    closeButton.style.margin = '2px';
    closeButton.style.padding = '0px';

    closeButton.addEventListener('click', function() {
        self.detach();
    }, false);

    this.domNode = document.createElement('div');
    this.domNode.appendChild(closeButton);
    this.domNode.appendChild(content);
    this.domNode.style.fontFamily = 'sans-serif';
    this.domNode.style.fontWeight = 'bold';
    this.domNode.style.color = '#5E4300';
    this.domNode.style.fontSize = '12px';
    this.domNode.style.margin = '0px';
    this.domNode.style.textAlign = 'left';
    this.domNode.style.height = '22px';
    this.domNode.style.borderBottom = '1px solid black';
    this.domNode.style.position = 'fixed';
    this.domNode.style.width = '100%';
    this.domNode.style.background = cssBackground;
    this.domNode.style.zIndex = '2000000001';
    this.domNode.style.top = '0px';
    this.domNode.style.left = '0px';
    this.domNode.style.MozBoxShadow = '1px 1px 4px #000000';
}

/**
 * Attaches the toolbar to the page.
 *
 * @param overlay Boolean that indicates that the toolbar may cover
 *        the top 22 pixels of the document. If set to false, additional
 *        22 pixels space is added to the top, so the toolbar doesn't
 *        cover the document when the window is scrolled to the top.
 */
Toolbar.prototype.attach = function(overlay) {
    if(overlay) {
        document.body.insertBefore(this.domNode, document.body.firstChild);
    } else {
        this.dummyBar = document.createElement('div');
        this.dummyBar.appendChild(this.domNode);
        this.dummyBar.style.height = '22px';
        this.dummyBar.style.margin = '0px';
        this.dummyBar.style.padding = '0px';
        document.body.insertBefore(this.dummyBar, document.body.firstChild);
    }
};

Toolbar.prototype.detach = function() {
    if(this.dummyBar) {
        document.body.removeChild(this.dummyBar);
        this.dummyBar = null;
    } else {
        document.body.removeChild(this.domNode);
    }

    if(this.onClose) this.onClose();
};

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
    this.onClose = false;

    /**
     * Adds an update notification bar to the top of the current page.
     *
     * @param overlay If set to true, the notification bar will overlay the top
     *                of the page without creating an additional gap.
     */
    this.onUpdateAvailable = function(infos, overlay) {
        var noti = document.createElement('div');
        noti.style.margin = '2px';
        noti.innerHTML = '<img style="padding:0px;border:none 0px;margin:0px;background:none;vertical-align:middle" src="' +
                         Resources.warningSign + '"> An update is available for <i><a style="font-decoration:underline;color:black" target="_blank" href="' +
                         infos.infoPageUrl + '">' +
                         infos.scriptName + '</a></i>: ';

        var installButton = document.createElement('a');
        installButton.innerHTML = 'Install version ' + infos.version;
        installButton.style.padding = '2px';
        installButton.style.MozBorderRadius = '5px';
        installButton.style.border = 'solid 1px black';
        installButton.style.backgroundColor = 'white';
        installButton.style.color = 'black';
        installButton.setAttribute('href', infos.url);

        installButton.addEventListener('click', function() {
            tb.detach();
        }, false);

        noti.appendChild(installButton);

        var tb = new Toolbar(noti, Resources.toBackgoundImage(Resources.yellowToolbarGradient));
        tb.onClose = this.onClose;
        tb.attach(overlay);
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
    this.onClose = false;

    /**
     * Adds an update notification bar to the top of the current page.
     *
     * @param overlay If set to true, the notification bar will overlay the top
     *                of the page without creating an additional gap.
     */
    this.onUpdateAvailable = function(infos, overlay) {
        var noti = document.createElement('div');
        noti.style.margin = '2px';
        noti.innerHTML = '<img style="padding:0px;border:none 0px;margin:0px;background:none;vertical-align:middle" src="' +
                         Resources.warningSign + '"> An update is available for <i><a style="font-decoration:underline;color:black" target="_blank" href="' +
                         infos.infoPageUrl + '">' +
                         infos.scriptName + '</a></i>: ';

        var installButton = document.createElement('a');
        installButton.innerHTML = 'Install version ' + infos.version;
        installButton.style.padding = '2px';
        installButton.style.MozBorderRadius = '5px';
        installButton.style.border = 'solid 1px black';
        installButton.style.backgroundColor = 'white';
        installButton.style.color = 'black';
        installButton.setAttribute('href', infos.url);

        installButton.addEventListener('click', function() {
            tb.detach();
        }, false);

        noti.appendChild(installButton);

        var tb = new Toolbar(noti, Resources.toBackgoundImage(Resources.yellowToolbarGradient));
        tb.onClose = this.onClose;
        tb.attach(overlay);
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

/**
 * Namespace for CSS style-related functions.
 */
var StyleTools = {
    normalizeAnchor : function(a) {
        this.normalizeElement(a);
        a.style.textDecoration = 'underline';
    },

    normalizeImage : function(img) {
        this.normalizeElement(img);
        img.style.verticalAlign = 'top';
        img.style.display = 'inline';
    },

    normalizeDiv : function(div) {
        this.normalizeElement(div);
        div.style.display = 'block';
    },

    normalizeLabel : function(label) {
        this.normalizeElement(label);
        label.style.color = 'white';
        label.style.fontFamily = 'sans-serif';
        label.style.fontSize = '12px';
    },

    normalizeInput : function(input) {
        this.normalizeElement(input);
        input.style.background = 'url(' + Resources.lightBlueGradient + ')';
        input.style.border = 'solid 1px grey';
        input.style.color = 'black';
        input.style.fontFamily = 'sans-serif';
        input.style.fontSize = '12px';
    },

    normalizeElement : function(el) {
        el.style.color = 'white';
        el.style.fontWeight = 'normal';
        el.style.fontFamily = 'sans-serif';
        el.style.fontSize = '12px';
        el.style.fontStyle = 'normal';
        el.style.textTransform = 'none';
        el.style.border = 'none 0px';
        el.style.outline = 'none 0px';
        el.style.margin = '0px';
        el.style.padding = '0px';
        el.style.textAlign = 'left';
        el.style.width = 'auto';
        el.style.height = 'auto';
        el.style.cssFloat = 'none';
        el.style.lineHeight = '100%';
    }
};

/**
 * Namespace for reusable resources like image data strings.
 */
var Resources = {
    deepBlueGradient : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAEsCAIAAACNMk6CAAAAfklEQVQ4jbWSQQrAMAgEZ7223+n/v9ZDhGJqjJfcRgRxl+G+HgMMZCCTckaYMgaTPkbyXcHI55zB76/YfwC/ueEx4zciz/+vePSx55Cl22Hgf84Vp5mT3rf5G72X+eeuOw5VXZ9yqNth4Dxn6drCu6OuTd71XKu9Oe5Qt8OPX1adBB8w6GDzAAAAAElFTkSuQmCC',
    lightBlueGradient : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAH0CAIAAABzX9DAAAAAYklEQVQ4jWM4su8FEwMDA8WYkRGbOCOVzCHdbOLNwW82Zeagu4f08CDeX8SbTbqfsJtNnbBhpHIYkx4epPuLOLPJ8xem2dQIH0ZGytMebreM5nNUc0bzOTazR/M5frOpED4AP1UGnCLWesEAAAAASUVORK5CYII=',
    greenToolbarGradient : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAWCAIAAACOpGH9AAAAHUlEQVQImWPQq+ViYmFlRmA2ZiZWXHw2hDgrfj4Ab10B5c7u62AAAAAASUVORK5CYII=',
    blueToolbarGradient : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAWCAIAAACOpGH9AAAAHUlEQVQImWPg4TZlYmHhRMWsyHwuND6yGi4cejgBXAYB4perdjIAAAAASUVORK5CYII=',
    yellowToolbarGradient : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAWCAIAAACOpGH9AAAAMUlEQVQImWN4vJqBiZGJnYmRmZ2JkZmDiZGJnYkJxmZmh/I5UOQZmaFiSPqYoGqh+gC0LgKl8uVdXwAAAABJRU5ErkJggg==',
    // Close button from http://www.clker.com/clipart-24890.html
    closeButton : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAUCAYAAACTQC2+AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAGYwAABmMBTYgavAAAAAd0SU1FB9oDChInJK4ILvcAAASkSURBVEjHtZVfaBRXFMZ/c++dmd1NNrttJPEvJhQVLNimjYWKvlSovlQEn2qJPihEREpFfLBPfSo+WF8E31sJthRRqVD/tBZsBEFN1tQYCfivRhM2ZpPJ7mR3Z+bO7cMmmxho+9JeODDD+ea7597zfXOs66dOFdszGQdj+F+WZfHE8wK1Kp122sAhisCy5gGLN16YW7j+CWcM2DZROo2KwtCEvs80YAkxmzegNVKI2jMQC4G1aDNjDCKOMQvekbKOM3FMExA1NBgVhSH+1BQztj1fTRTRpBSNLS08z+dpBV5Vq+A48xhjIAhodl0KSrFy6VK8kRGKWmOkrGNkGBI5DioKAvxSiYptgxA1gigiu2IFn/b2kmxu5uulS1GFAqViEVy3XkyjMRQaGvhydBT7yRO+amvDKpWozF1hHCPCkCibRegwpOJ5BL5PWCoR+D56ZoZ8scjHO3bw7YkTfJ9OM+W6KN+nWihQLRRQnsek6/JDUxPfnTzJ5u3buTk4SFCtEpRKda6K56HDEBGGIb7nUSmX6zHj+5QfPeKTly+5cvs2R7q7udLezoRtE4+NEY+NMeE4/NLezpHubq7fucPb/f10JhKUPI9KpVLn8j2PMAxROgyZ8TxCpV5rYrFapXT1KqvGx7kcx3yxbx+nz5xh/eQkAA82buTzPXv49e5d3J4e5LNnjEmJse3XRGXPnkhFYYhlDEKIOgApkVISVir4fX0sCwKuK8XBri5+b2sDKTm4aRO/DQyQOncO5+lTykohEolan+dUGMfExhCFIcr3PPK5HO7KlVhzaplVjIljoulpxK1bpG7f5t7p02zZsgWA/uFhCocPU71/H53Nohoba4UusIDRmurICC3r1qG88XFu5vPY+Tz2Yi8CM0AMrLhxgzat6zkJDPT28iIIMPk8KUAs+j6cjY/Gx1FSCJYDKSkRC/Rv4phQawSQXr+ezgsX6Fizhj+Gh9HAu2vXUh4epn/nTqZyOSLAkfK1U8VaMzNrfCWlJAUkEgmEUvNXViphA8mODt4/f56Nq1fz8/37PNm6lVhr/rx2jR0dHdiXL9O/axf+zZsEWuMkErUWWBZxFIHvI6VEKCFwAFcpHClxlCJhDM1AdvNmOi9dYuPq1VwaGmK8q4tqPk91YoLJzz7jfC7He62tdF68SMu2bWQBJ45rPFLWOAElBEJJSRpIuW4tHIcGpXi+YQPLzp6lc/lyfhocpLJ7NzqXI60UGdtGDw0R7d3Lj319vNPczLKeHnRnJ0nHmedyXdKAkhIlpCQBWK6LkBJjDE4Y0mFZPMzlePjiBWuPHiW4dw+RyeBmMrVGT0+jBwZIHzrEN8ePY4KAD7Rm1LbRrotlWcRakwCElChbCFKzHhKWhbEs4mQSPTLCh8eO8UpK9OPHOM3NpBoa5s2YyRDZNubBA946cIA3bZvJ589RqRSuEFizf3wjBPacGBKuC3NNNAZcF51MMl4s1kZBayupRYrCGJxEArTG9X2mLQu1ZAnOrBCwLIzW4LpIKVFSCCtbLlMdHZ037N9N28XD719wRmvccplICEtNJpPBG/v3IxaY8T+b4kAkJZPJZPAXzkw52AmAg6MAAAAASUVORK5CYII=',
    // Warning sign from http://www.psdgraphics.com/icons/psd-red-and-yellow-warning-signs/
    warningSign : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oDChIOI3QqJL8AAARhSURBVDjLlZVtaJVlGMd/9/M852Vn5+yc7TidkebbtNbUmToxSlCTIExCCURDZZYp4QfRyAyiMPxiaSVkvn3Ioi+RJIUEZmJWZlqUoY45X5Yva7PNnXO2Pa/3ffVhIkED8//l+nN9+HHx57q4FP9DnUfnxt2OM8tj6f4pQSn9bcWwqQeq5hwyIqAU96YLe8YBIPsaM+HJ8kNScETCatHtGQlO5N/r3Fgb516l+1vvePmt+nUp5Iy0zRHTvNTIjbkSXR8byukHFgGYrquDMpzBmi27JgxAj418mBprBW6NEm+UKMdW0lsjdqXtUNbxihy1Dp/fP7o4GMMarPnQOk3hzXzCZMqX49SMpjgUZbnguCgrgmISyddOL5RSi+vWRbQdWHh3cOtHMwGoeKZmrJvMr8fNgeNByleUB5D0FLoLZefIjh23XY4+ln5g4QFa9k2+e8Z/7NiMd6z+oJSaxP/5ESPuPBk5PCGADM/HRIK54p5oMOK+K3Jk+u67RtGyuw6A+pHvz49NmLkgbP8b8YqKhM2jk3MANE7KQiyBBJ0qavsFZjQ9L5/QCND8Yd3g4PGrzvEE2NTP+cDK1OJfOSVWIg06SWV2YLsqMnGQOE6qGu/PLwXyihkvbQN4cPW5/4LP7RgDwOHDdW8xZvGI4qnPxYrbythlIEmqKssByGbKQFIYyrFTWdVzfDOMWzZFDtW+8G+OBXD6Zahbe4mujYylcdVKfeMC0c2TyorlgBhIjMpcGQC5igQoB0UMsdJI1IrffDDFtDUr29cxtG7tJU6tB6t5/zymbR2Yuuq5FZuoaMjf/G4LdnoI2ihAQBuy6QQA6XQcNGgEtI3lZCie3QdWorFm2cIlANPfAYurhweO4etJsxk/f/6tH/ZYBD1oiaODkMj3oVBCJALA6AgKvUjgEYUBkbaJ/G4pNn+lqBy2Ro40jAJQAC2ryNRueHWnztUuvfbFahJphZ2swEmmscrSZKtzkE/DTQ/ySSj0U2jvJvJ6idxewt4SWse4f/ZThG03Np/55tc37BVA066lj1Nd/3bnTx8TdF8W5SQVSiECGCFVabFl6yVmrTxD6a8+npwdo7ejhPY8Ii8kDDT93X0SSxpl59QsqNprbdrTUF7SsllH3fS0fi8CSkca7QYYz8fvc0F6eW3ndQC2fdoOPQWiPpfI9Qk9HxMYbMtSV0+cl9RwX1lW5zbLjsXmpkeMmtn+42cSlEShHHQgRKHG9wK01wc3CuzbkKO60mL7ixko9uG7LoEboENDGERggfFR149flPyo/mcdOxEuUtmQrrO/o31weyIsFaEcULaFZTtc6Q1YMjVO0+wK3KJwuaWE5xkkNJhQiLRBCegArp3q576JIU7kuW1Y1xj/9AxuXbwmyhEFBoUgSrDEILZQNELB10jcUDZckRKFGEHkNlQZJESG1KJ0GKJa9k7MJtPB/vJqWWCp8PZaaSAC0SgMoBHRcNsPVANy5x0ACqUEE9mm0FG+8x9dLyrYdNncpgAAAABJRU5ErkJggg==',

    toBackgoundImage : function(data) {
        return 'url(' + data + ')';
    }
};

function notifyReviews(amount) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.stumbleupon.com/url/' + GM_getValue('user_name') + '.stumbleupon.com/',

        onload: function(response) {
            if(match = (/<li class="listLi first">(.|\s)*?<a href="(\/stumbler\/([^\/]+)\/review\/\d+\/)">([^<]+)<\/a>/).exec(response.responseText)) {
                var container = document.createElement('div');
                var message = document.createElement('div');
                var warning = document.createElement('img');
                container.appendChild(warning);
                container.appendChild(message);
                warning.setAttribute('src', Resources.warningSign);
                warning.style.verticalAlign = 'middle';
                StyleTools.normalizeDiv(message);
                message.style.display = 'inline-block';
                message.style.color = 'black';
                message.style.padding = '3px';
                message.style.fontWeight = 'bold';
                message.innerHTML = '<a style="color:blue;background:none" href="http://www.stumbleupon.com' + match[2] +
                    '" target="_blank">' + match[3] + ' wrote a review about you on ' + match[4] + '</a>';

                if(amount > 1) {
                    message.innerHTML += ' ... and there are ' + (amount - 1)  + ' further new reviews about you';
                }

                GM_setValue('new_reviews', amount);
                var toolbar = new Toolbar(container, Resources.toBackgoundImage(Resources.yellowToolbarGradient));
                toolbar.attach();
                toolbar.domNode.addEventListener('click', function() {
                    GM_deleteValue('new_reviews');
                }, false);
            }
        }
    });
}

function checkForReviews() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.stumbleupon.com/favorites/reviews/',

        onload: function(response) {
            if(match = (/<dd title="([\d,]+) reviews of you">/).exec(response.responseText)) {
                var oldCount = GM_getValue('review_count');
                var newCount = parseInt(match[1]);

                if(oldCount != newCount) {
                    GM_setValue('review_count', newCount);
                    notifyReviews(newCount - oldCount);
                }
            }
        }
    });
}

function start() {
    var current = GM_getValue('review_check_counter');
    var newReviews = GM_getValue('new_reviews');

    if(!current) {
        current = 0
    }

    ++current;

    if(current >= 10) {
        checkForReviews();
        current = 0;
    }

    if(newReviews) {
        notifyReviews(newReviews);
    }

    GM_setValue('review_check_counter', current);
}

// Retrieves user name and permanently stores it
function setup() {
    if(!GM_getValue('user_name')) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://www.stumbleupon.com/favorites/reviews/',

            onload: function(response) {
                if(match = (/<a href="\/favorites\/">Hi ([^<]+)<\/a>/i).exec(response.responseText)) {
                    GM_setValue('user_name', match[1]);

                    if(match = (/<dd title="([\d,]+) reviews of you">/).exec(response.responseText)) {
                        GM_setValue('review_count', parseInt(match[1]));
                    }

                    start();
                }
            }
        });
    } else {
        start();
    }
}

if(document.body && top && (window.location.href == top.location.href)) {
    var updateChecker = new UpdateChecker(75056, '0.1');

    updateChecker.onClose = function() {
        setup();
    };

    updateChecker.start(false, function(updateAvailable) {
        if(!updateAvailable) {
            setup();
        }
    });
}