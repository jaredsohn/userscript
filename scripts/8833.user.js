/* vim: ts=4 noet ai :
   -*- coding: utf-8 -*-

   Grazr LASER - Displays an expandable Grazr minibrowser when you hover over a link
   $Revision: 1.79 $
   $Date: 2007/05/01 16:47:00 $
   Copyright 2007  Benjamin C. Wiley Sittler

   NOTE: By using the Grazr service you may be bound by the Grazr Corp. Terms of Service.
   URL: http://www.grazr.com/info/tos.html

   This program is free software; you can redistribute it and/or
   modify it under the terms of the GNU General Public License
   as published by the Free Software Foundation; either version 2
   of the License, or (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA

   Contact Information:

   Benjamin C. Wiley Sittler
   E-mail: bsittler@gmail.com
   5919 Central Ave
   El Cerrito, CA 94530
   U.S.A.

*/

// ==UserScript==
// @name                  Grazr LASER
// @namespace    http://zoehep.xent.com/~bsittler/grazr_laser.user.js
// @description    Displays an expandable Grazr minibrowser when you hover over a link. By using this you may be bound by Grazr terms of service: http://www.grazr.com/info/tos.html
// @include        http://*
// @exclude        http://grazr.com/gzpanel.html?*
// ==/UserScript==

(function(self){
    var ua = self.navigator && self.navigator.userAgent || '';
    var isKHTML = ua.indexOf('KHTML') != -1;
    var isOpera = (typeof (self.opera) != 'undefined') && ! isKHTML;
    var isAppleWebKit = ua.indexOf('AppleWebKit') != -1;
    var isOmniWeb = ua.indexOf('OmniWeb') != -1;
    var isMSIE = ua.indexOf('MSIE') != -1;
    var isGecko = (ua.indexOf('Gecko') != -1) && ! isKHTML && ! isOpera;
    var bugEventListenersAreBroken = isOpera || (isAppleWebKit && isOmniWeb);
    var bugAttachEventIsBroken = isAppleWebKit && isOmniWeb;
    var document = self.document;
    var width = 200;
    var height = 320;
    var collapsedWidth = 12;
    var collapsedHeight = 12;
    var tooQuick = 0.5e3;
    var reOpenDelay = 3e3;
    var defaultTheme = 'sateen_red';
    var themes = {
        'default': {
            'expandButton': {
                'color': '#000',
                'backgroundColor': '#fff',
                'border': '1px solid #ddd'
            },
            'closeButton': {
                'color': '#222',
                'backgroundColor': '#ddd',
                'borderColor': '#aaa'
            }
        },
        'default_big_title': null,
        'gloss_black': {
            'expandButton': {
                'borderRadius': '0px',
                'MozBorderRadius': '0px',
                'color': '#000',
                'backgroundColor': '#fff',
                'border': '1px solid #ddd'
            },
            'closeButton': {
                'backgroundImage': "url('http://grazr.com/theme/gloss_black/images/gztitlebar_gloss.png')",
                'backgroundPosition': '0px -2px',
                'backgroundRepeat': 'repeat-x',
                'color': '#fff',
                'backgroundColor': '#444',
                'borderTop': '1px solid #888',
                'borderLeft': '1px solid #444',
                'borderRight': '1px solid #444',
                'borderBottom': '1px solid #000'
            }
        },
        'gloss_blue': {
            'expandButton': {
                'borderRadius': '0px',
                'MozBorderRadius': '0px',
                'color': '#000',
                'backgroundColor': '#fff',
                'border': '1px solid #7ad'
            },
            'closeButton': {
                'backgroundImage': "url('http://grazr.com/theme/gloss_blue/images/gztitlebar_gloss.png')",
                'backgroundPosition': '0px -2px',
                'backgroundRepeat': 'repeat-x',
                'color': '#fff',
                'backgroundColor': '#7af',
                'borderTop': '1px solid #9cf',
                'borderLeft': '1px solid #7af',
                'borderRight': '1px solid #7af',
                'borderBottom': '1px solid #39f'
            }
        },
        'gloss_red': {
            'expandButton': {
                'borderRadius': '0px',
                'MozBorderRadius': '0px',
                'color': '#000',
                'backgroundColor': '#fff',
                'border': '1px solid #d77'
            },
            'closeButton': {
                'backgroundImage': "url('http://grazr.com/theme/gloss_red/images/gztitlebar_gloss.png')",
                'backgroundPosition': '0px -2px',
                'backgroundRepeat': 'repeat-x',
                'color': '#fff',
                'backgroundColor': '#b00',
                'borderTop': '1px solid #f99',
                'borderLeft': '1px solid #b00',
                'borderRight': '1px solid #b00',
                'borderBottom': '1px solid #900'
            }
        },
        'gloss_silver': {
            'expandButton': {
                'borderRadius': '0px',
                'MozBorderRadius': '0px',
                'color': '#000',
                'backgroundColor': '#fff',
                'border': '1px solid #ddd'
            },
            'closeButton': {
                'backgroundImage': "url('http://grazr.com/theme/gloss_silver/images/gztitlebar_gloss.png')",
                'backgroundPosition': '0px -2px',
                'backgroundRepeat': 'repeat-x',
                'color': '#555',
                'backgroundColor': '#fff',
                'borderTop': '1px solid #fff',
                'borderLeft': '1px solid #fff',
                'borderRight': '1px solid #fff',
                'borderBottom': '1px solid #ccc'
            }
        },
        'milk_coco': {
            'expandButton': {
                'borderRadius': '0px',
                'MozBorderRadius': '0px',
                'color': '#000',
                'backgroundColor': '#fff',
                'border': '1px solid #ddd'
            },
            'closeButton': {
                'color': '#98734d',
                'backgroundColor': '#eeead5',
                'borderColor': '#993'
            }
        },
        'milk_pink': {
            'expandButton': {
                'borderRadius': '0px',
                'MozBorderRadius': '0px',
                'color': '#000',
                'backgroundColor': '#fff',
                'border': '1px solid #ddd'
            },
            'closeButton': {
                'color': '#954d98',
                'backgroundColor': '#fbecf9',
                'borderColor': '#993'
            }
        },
        'milk_white': {
            'expandButton': {
                'borderRadius': '0px',
                'MozBorderRadius': '0px',
                'color': '#000',
                'backgroundColor': '#fff',
                'border': '1px solid #ddd'
            },
            'closeButton': {
                'color': '#555',
                'backgroundColor': '#fff',
                'borderTop': '1px solid #fff',
                'borderLeft': '1px solid #fff',
                'borderRight': '1px solid #fff',
                'borderBottom': '1px solid #ccc'
            }
        },
        'sateen_black': {
            'expandButton': {
                'color': '#000',
                'backgroundColor': '#fff',
                'border': '1px solid #777'
            },
            'closeButton': {
                'color': '#fff',
                'backgroundColor': '#3a4454',
                'borderColor': '#333'
            }
        },
        'sateen_blue': {
            'expandButton': {
                'color': '#000',
                'backgroundColor': '#fff',
                'border': '1px solid #77d'
            },
            'closeButton': {
                'color': '#fff',
                'backgroundColor': '#3d5a8b',
                'borderColor': '#aaf'
            }
        },
        'sateen_green': {
            'expandButton': {
                'color': '#000',
                'backgroundColor': '#fff',
                'border': '1px solid #7d7'
            },
            'closeButton': {
                'color': '#fff',
                'backgroundColor': '#696',
                'borderColor': '#898'
            }
        },
        'sateen_red': {
            'expandButton': {
                'color': '#000',
                'backgroundColor': '#fff',
                'border': '1px solid #d77'
            },
            'closeButton': {
                'color': '#fff',
                'backgroundColor': '#900',
                'borderColor': '#b00'
            }
        }
    };
    var getValue = (function(key, defvalue) {
        if (typeof(GM_getValue) != 'undefined')
        {
            return GM_getValue(key, defvalue);
        }
        return defvalue;
    });
    var setValue = (function(key, value) {
        if (typeof(GM_setValue) != 'undefined')
        {
            return GM_setValue(key, value);
        }
    });
    var applyTheme = (function (node, nodeType) {
        var theme = getValue('theme', defaultTheme);
        var styles = (themes[theme] || themes[defaultTheme] || {})[nodeType] || {};
        for (var k in styles)
        {
            if (typeof(node.style[k]) != 'undefined')
            {
                node.style[k] = styles[k];
            }
        }
    });
    var GrazrLASERversion = '$Revision: 1.79 $'.replace(/[^0-9.]/g, '');
    var minibrowserPrefixURI = (function (theme)
        {
            return ('http://grazr.com/gzpanel.html?title='
                    +
                    encodeURIComponent('Grazr LASER ' + GrazrLASERversion)
                    +
                    '&theme=' + encodeURIComponent(theme) + '&font='
                    +
                    encodeURIComponent('Arial Narrow, Helvetica, sans-serif')
                    +
                    '&fontsize=8pt&file=');
        });
    var panel = null;
    var panelLink = null;
    var iframe = null;
    var lastAction = new Date;
    var currentGeneration = 0;
    var addListener = (function (node, event, fn) {
        if (node.addEventListener && ! bugEventListenersAreBroken)
        {
            node.addEventListener(event, fn, true);
        }
        else if (node.attachEvent && ! bugAttachEventIsBroken)
        {
            node.attachEvent('on' + event, fn);
        }
        else
        {
            fn['on' + event + '.orig'] = node['on' + event];
            node['on' + event] = fn;
        }
    });
    var removeListener = (function (node, event, fn) {
        if (node.removeEventListener && ! bugEventListenersAreBroken)
        {
            node.removeEventListener(event, fn, true);
        }
        else if (node.detachEvent && ! bugAttachEventIsBroken)
        {
            node.detachEvent('on' + event, fn);
        }
        else
        {
            node['on' + event] = fn['on' + event + '.orig'];
        }
    });
    var rescan = (function () {
        currentGeneration ++;
        for (var i = 0; i < document.links.length; i ++)
        {
            var link = document.links[i];
            if (link.href
                &&
                (link.href.match(/^http:/i)
                 ||
                 (link.href.indexOf(':') == -1))
                &&
                (! link.href.match(/\.user\.js$/))
                &&
                (link.tagName.toLowerCase() == 'a'))
            {
                addListener(link,
                    'mouseover',
                    (function (link, generation) {
                        var onmouseout;
                        var onmouseover = function () {
                            if (generation != currentGeneration)
                            {
                                removeListener(link,
                                    'mouseover',
                                    onmouseover);
                                if (onmouseout)
                                {
                                    removeListener(link,
                                        'mouseout',
                                        onmouseout);
                                }
                                return;
                            }
                            var now = new Date;
                            if (iframe != null) return;
                            if (panelLink == link)
                            {
                                if ((panel != null)
                                    ||
                                    ((now - lastAction) <= reOpenDelay))
                                {
                                    return;
                                }
                            }
                            lastAction = now;
                            addListener(link,
                                'mouseout',
                                (onmouseout = (
                                    function () {
                                        var now = new Date;
                                        if ((now - lastAction) <= tooQuick)
                                        {
                                            lastAction = now;
                                            if (panelLink == link)
                                            {
                                                if (panel) panel.parentNode.removeChild(panel);
                                                iframe = null;
                                                panel = null;
                                                panelLink = null;
                                            }
                                        }
                                    })));
                            panelLink = link;
                            if (panel)
                            {
                                panel.parentNode.removeChild(panel);
                                iframe = null;
                                panel = null;
                            }
                            if (! panel)
                            {
                                panel = document.createElement('span');
                                panel.style.position = 'absolute';
                                panel.style.zIndex = '32760';
                                panel.style.width = '' + collapsedWidth + 'px';
                                panel.style.height = '' + collapsedHeight + 'px';
                                var closeButton = document.createElement('div');
                                closeButton.style.cursor = 'pointer';
                                closeButton.style.fontFamily = 'sans-serif';
                                closeButton.style.fontSize = '8px';
                                closeButton.style.fontWeight = 'bold';
                                closeButton.style.lineHeight = '10px';
                                closeButton.style.textAlign = 'center';
                                closeButton.style.opacity = '0.85';
                                closeButton.style.position = 'absolute';
                                closeButton.style.left = '2px';
                                closeButton.style.top = '2px';
                                closeButton.style.width = '10px';
                                closeButton.style.height = '10px';
                                closeButton.style.borderRadius = '50%';
                                closeButton.style.MozBorderRadius = '50%';
                                closeButton.appendChild(document.createTextNode('\u2026'));
                                closeButton.setAttribute('title', 'Show Grazr LASER for ' + panelLink);
                                applyTheme(closeButton, 'expandButton');
                                applyTheme(closeButton, 'closeButton');
                                panel.appendChild(closeButton);
                                addListener(closeButton,
                                    'click',
                                    (function (event) {
                                        if (! event) event = self.event;
                                        if (! panel)
                                        {
                                            return true;
                                        }
                                        if (typeof(event.stopPropagation) != 'undefined') event.stopPropagation();
                                        else if (typeof(event.cancelBubble) != 'undefined') event.cancelBubble = true;
                                        if (typeof(event.preventDefault) != 'undefined') event.preventDefault();
                                        if (! iframe)
                                        {
                                            iframe = document.createElement('iframe');
                                            iframe.setAttribute('width', '' + (parseInt(width) - 10));
                                            iframe.setAttribute('height', '' + height);
                                            iframe.setAttribute('frameBorder', '0');
                                            iframe.setAttribute('allowTransparency', 'true');
                                            iframe.setAttribute('scrolling', 'no');
                                            iframe.style.position = 'absolute';
                                            iframe.style.top = '0px';
                                            iframe.style.left = '10px';
                                            iframe.style.backgroundColor = 'transparent';
                                            panel.style.width = '' + width + 'px';
                                            panel.style.height = '' + height + 'px';
                                            panel.insertBefore(iframe, panel.firstChild);
                                            iframe.setAttribute('src',
                                                                (minibrowserPrefixURI(getValue('theme', defaultTheme))
                                                                 +
                                                                 link.href));
                                            closeButton.removeChild(closeButton.firstChild);
                                            closeButton.appendChild(document.createTextNode('x'));
                                            closeButton.setAttribute('title', 'Close Grazr LASER');
                                            closeButton.style.opacity = '1.0';
                                            applyTheme(closeButton, 'closeButton');
                                        }
                                        else
                                        {
                                            lastAction = new Date;
                                            panel.parentNode.removeChild(panel);
                                            iframe = null;
                                            panel = null;
                                        }
                                    }));
                                link.parentNode.insertBefore(panel, link.nextSibling);
                            }
                            return false;
                        };
                        return onmouseover;
                    })(link, currentGeneration));
            }
        }
    });
    self.setTimeout(rescan, reOpenDelay);
    var registerMenuCommand = (function (title, fn, accel, accelMod, access) {
        var e;
        try {
            return GM_registerMenuCommand(title, fn, accel, accelMod, access);
        } catch (e) {
        }
        try {
            return GM_registerMenuCommand(title, fn, accel, accelMod);
        } catch (e) {
        }
        try {
            return GM_registerMenuCommand(title, fn, accel);
        } catch (e) {
        }
        try {
            return GM_registerMenuCommand(title, fn);
        } catch (e) {
        }
    });
    registerMenuCommand("Grazr LASER Refresh", rescan, void(null), void(null), 'f');
    // NOTE: must keep references to these from being gc'ed because turnabout is buggy!
    var themefn = {};
    for (var theme in themes)
    {
        registerMenuCommand(
            "Grazr LASER Theme " + theme,
            (themefn[theme] = (function (theme) {
                return (function () {
                    defaultTheme = theme;
                    setValue('theme', theme);
                });
            })(theme)),
            void(null), void(null), void(null));
    }
    var notice = function() {
        self.alert(
            'Grazr LASER v' + GrazrLASERversion + ' - Displays a Grazr minibrowser when you hover over a link\n'
            + ('$Date: 2007/05/01 16:47:00 $\n'.split('/').join('-'))
            + 'Copyright \xa9 2007  Benjamin C. Wiley Sittler\n'
            + '\n'
            + 'NOTE: By using the Grazr service you may be bound by the Grazr Corp. Terms of Service.\n'
            + 'URL: http://www.grazr.com/info/tos.html\n'
            + '\n'
            + 'This program is free software; you can redistribute it and/or\n'
            + 'modify it under the terms of the GNU General Public License\n'
            + 'as published by the Free Software Foundation; either version 2\n'
            + 'of the License, or (at your option) any later version.\n'
            + '\n'
            + 'This program is distributed in the hope that it will be useful,\n'
            + 'but WITHOUT ANY WARRANTY; without even the implied warranty of\n'
            + 'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n'
            + 'GNU General Public License for more details.\n'
            + '\n'
            + 'You should have received a copy of the GNU General Public License\n'
            + 'along with this program; if not, write to the Free Software\n'
            + 'Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA\n'
            + '\n'
            + 'Contact Information:\n'
            + '\n'
            + 'Benjamin C. Wiley Sittler <' + 'bsittler@gmail.com>\n'
            + '5919 Central Ave\n'
            + 'El Cerrito, CA 94530\n'
            + 'U.S.A.\n');
    };
    registerMenuCommand("About Grazr LASER", notice, void(null), void(null), 'z');
})((typeof(window)!='undefined')?window:((typeof(self)!='undefined')?self:this));

//
// $Log: grazr_laser.user.js,v $
// Revision 1.79  2007/05/01 16:47:00  bsittler
// remove revision from description;  add an exclusion to avoid mise en abyme
//
// Revision 1.78  2007/04/29 06:21:48  bsittler
// now more Operatic
//
// Revision 1.77  2007/04/29 06:04:21  bsittler
// no excluded sites
//
// Revision 1.76  2007/04/29 06:03:50  bsittler
// more readable desc?
//
// Revision 1.75  2007/04/29 06:02:35  bsittler
// *** empty log message ***
//
// Revision 1.74  2007/04/29 05:59:32  bsittler
// better description?
//
// Revision 1.73  2007/04/29 05:57:27  bsittler
// missing var
//
// Revision 1.72  2007/04/29 05:56:22  bsittler
// workaround for turnabout gc problem
//
// Revision 1.71  2007/04/29 05:27:15  bsittler
// missing self
//
// Revision 1.70  2007/04/28 23:18:23  bsittler
// less greasemonkey-dependant
//
// Revision 1.69  2007/04/28 03:25:02  bsittler
// use closeButton theme for expandButton, too
//
// Revision 1.68  2007/04/28 02:53:52  bsittler
// typo
//
// Revision 1.67  2007/04/28 02:51:46  bsittler
// more binding
//
// Revision 1.66  2007/04/28 02:46:49  bsittler
// Grazr Corp. binds you all
//
// Revision 1.65  2007/04/28 02:46:06  bsittler
// *** empty log message ***
//
// Revision 1.64  2007/04/28 02:26:01  bsittler
// fix color typos in sateen_* themes
//
// Revision 1.63  2007/04/28 02:17:11  bsittler
// clicking the closebutton expands/collapses
//
// Revision 1.62  2007/04/28 02:12:30  bsittler
// fix bug in previous change
//
// Revision 1.61  2007/04/28 01:29:42  bsittler
// css now parses in ff1.5
//
// Revision 1.60  2007/04/28 00:29:58  bsittler
// default theme -> sateen_red
//
// Revision 1.59  2007/04/28 00:27:47  bsittler
// all themes
//
// Revision 1.58  2007/04/28 00:22:20  bsittler
// most themes are present, and title includes revision
//
// Revision 1.56  2007/04/27 22:31:26  bsittler
// themes!
//
// Revision 1.55  2007/04/27 22:02:39  bsittler
// better error-handling, and a bit of css refactoring
//
// Revision 1.54  2007/04/27 19:59:52  bsittler
// better border
//
// Revision 1.53  2007/04/27 19:57:45  bsittler
// red border
//
// Revision 1.52  2007/04/27 19:56:25  bsittler
// non-opaque close button once the grazr has been expanded.
//
// Revision 1.51  2007/04/27 17:35:32  bsittler
// workaround for noscript interaction
//
// Revision 1.50  2007/04/27 17:29:57  bsittler
// show url in tooltip
//
// Revision 1.48  2007/04/27 17:08:09  bsittler
// rescan reOpenDelay seconds after startup
//
// Revision 1.47  2007/04/27 16:58:18  bsittler
// trimmed out empty log messages
//
// Revision 1.44  2007/04/27 16:54:59  bsittler
// more in keeping with the grazr theme
//
// Revision 1.43  2007/04/27 16:52:40  bsittler
// narrow before click, wide after click
//
// Revision 1.42  2007/04/27 16:50:58  bsittler
// reorganize css a bit
//
// Revision 1.36  2007/04/27 16:39:18  bsittler
// support rescanning
//
// Revision 1.35  2007/04/27 16:25:25  bsittler
// do not destroy when expanded
//
// Revision 1.34  2007/04/27 16:13:08  bsittler
// typo!
//
// Revision 1.33  2007/04/27 16:12:26  bsittler
// specifically avoid userscripts; switch to regexes for some of the url handling
//
// Revision 1.31  2007/04/27 16:08:20  bsittler
// work on relative urls
//
// Revision 1.30  2007/04/27 16:03:50  bsittler
// remove iframe ref when destroying panel
//
// Revision 1.27  2007/04/27 15:59:40  bsittler
// use Revision instead of Id
//
// Revision 1.24  2007/04/27 15:53:13  bsittler
// added rcs keywords; now there's a button to click before the microbrowser is actually loaded
//
//
