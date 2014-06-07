// IMDb More Photos
// version 0.2.4
// 2010-04-29
// Copyright (c) 2010, Brent Charbonneau
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "IMDb More Photos", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           IMDb More Photos
// @namespace      http://projects.apathyant.com/imdbmorephotos/
// @description    Adds a button to actor pages that opens an inline window with more photos of the actor (from Google Images).
// @include        http://*.imdb.com/name/*
// @include        http://imdb.com/name/*
// ==/UserScript==

var prefix = 'imp-';

var windowWidthPercentage = 0.75;
var windowHeightPercentage = 0.45;
var windowPadding = 6;
var windowTextPadding = 5;
var windowFontSize = 10;
var windowBorderSize = 1;
var windowBorderColor = '#E0E0E0';
var windowButtonHeight = 13;
var windowButtonTextSize = 11;
var windowButtonBorderSize = 1;
var windowButtonBorderColor = windowBorderColor;
var windowButtonTextColor = 'black';
var windowButtonBgColor = '#DDD';
var windowButtonBgColorHover = '#EEE';
var windowButtonMargin = 4;
var windowButtonRadius = 5;
var windowTitleMarginTop = 6;
var windowTitleMarginLeft = 18;
var windowTitleFontSize = 12;
var windowBgColor = '#FFFFE0';
var windowInnerBorderColor = '#E0E0E0';
var windowInnerBorderSize = 1;
var windowInnerBgColor = 'white';
var buttonBgColor = '#F9F9F9';
var buttonBgColorHover = windowBgColor;
var buttonPadding = 4;
var buttonFontSize = 11;
var buttonBorderColor = windowBorderColor;
var buttonBorderSize = 1;
var buttonRadius = 5;
var buttonText = document.createTextNode('More Photos');

function getElementOffset(element,whichCoord) {
        var count = 0
        while (element!=null) {
                count += element['offset' + whichCoord];
                element = element.offsetParent;
        }
        return count;
}

function inlineViewClickHandler(event) {
        // Event handler which takes clicks from our injected inline view icon links...
        var href, link;

        // Create the new dhtml frame
        if ( event.target.tagName.toLowerCase() == 'a' ) {
                // user managed to click the actual anchor and not the icon
                href = event.target.href;
                link = event.target;
        } else if ( event.target.tagName.toLowerCase() == 'img' ) {
                // user clicked the icon
                href = event.target.parentNode.href;
                link = event.target.parentNode;
        }else{
                // No idea how this function was launched, so we cannot proceed.
                GM_log('inlineViewClickHandler triggered from unknown element. Cannot proceed.');
                return false;
        }

        // check to see if the window is open and if so close it, otherwise pop a new window
        var openWindow = document.getElementById(prefix + 'giInlineWindow');
        if(openWindow) {
                openWindow.parentNode.removeChild(openWindow);
        } else {
                inlineWindow = newInlineWindow(event, href, link);
        }

        event.preventDefault();
        return true;
}
function newInlineWindow(event, href, link){
        // Setup some constants for use in creating the inline window...
        var windowWidth = Math.round(document.width * windowWidthPercentage);
        var windowHeight = Math.round(window.innerHeight * windowHeightPercentage);
        var windowFullID = prefix + 'giInlineWindow';

        // stop the window before getting this close to the left/right/top/bottom of the screen
        var pageBoundPadding = 10;

        var xpos, ypos;

        // get the position of the element that was clicked on...
        var elementTop = getElementOffset(link,'Top');
        var elementLeft = getElementOffset(link,'Left');
        var linkLineHeight = window.getComputedStyle(link,"").getPropertyValue('line-height')

        var elementHeight;
        if(linkLineHeight == 'normal') {
                elementHeight = 12;
        } else {
                elementHeight = parseInt(window.getComputedStyle(link,"").getPropertyValue('line-height'));
        }


        // setup the x-position of the inline window...
        /*
        // check to see if the left 1/3 of the window will overlap the left page bound..
        if ( elementLeft - (windowWidth/3) < pageBoundPadding ) {
                xpos = pageBoundPadding;
        }
        // check to see if the right 2/3 of the window will overlap the right page bound...
        else if ( elementLeft + (windowWidth*2/3) > document.width - pageBoundPadding ) {
                xpos = document.width - pageBoundPadding - windowWidth;
        }
        else {
                // if we're not going to hit either wall, set the window to be offset
                // by 1/3 to the left of where we clicked (looks better than centering
                xpos = elementLeft - (windowWidth/3);
        }
*/
        if(elementLeft + windowWidth > document.width - pageBoundPadding) {
                xpos = document.width - pageBoundPadding - windowWidth;
        } else {
                xpos = elementLeft;
        }
        // setup the y-positioning of the inline window...

        // check to see if the window goes beyond the bottom of the viewport...
        if ( elementTop + windowHeight + pageBoundPadding > window.pageYOffset + window.innerHeight ) {
                ypos = elementTop - windowHeight;
        } else {
                ypos = elementTop + elementHeight;
        }


        var cssBoxWidth = Math.round((windowWidth - (windowPadding+windowBorderSize)*2)/document.width*100);
        var cssBoxHeight = windowHeight - windowBorderSize*2 - windowPadding;

        var frame = document.createElement('div');
        frame.id = windowFullID;
        frame.className = prefix + 'frame';

        frame.style.marginTop = ypos + 'px';
        frame.style.marginLeft = xpos + 'px';
        frame.style.width = cssBoxWidth + '%'
        frame.style.height = cssBoxHeight + 'px';

        var closeButton = document.createElement('a');
        closeButton.className = 'button';
        closeButton.addEventListener('click', function(event) {
                frame = event.target.parentNode; frame.parentNode.removeChild(frame); return false;
                }, true);
        closeButton.href = '#';
        closeButton.appendChild(document.createTextNode('x'));
        frame.appendChild(closeButton);

        var linkButton = document.createElement('a');
        linkButton.className = 'button';
        linkButton.href = giFullLink;
        linkButton.appendChild(document.createTextNode('more...'));
        frame.appendChild(linkButton);

        var title = document.createElement('h1');
        title.appendChild(document.createTextNode('More Photos From Google Images...'));
        frame.appendChild(title);

        var contents = document.createElement('div');
        contents.className = 'contents clearfix';
        contents.id = prefix + 'content';
        contents.style.height = (windowHeight  - (windowButtonMargin + windowButtonHeight + windowButtonBorderSize*2) - ((windowBorderSize + windowPadding +
windowInnerBorderSize + windowTextPadding)*2) ) + 'px';
        contents.appendChild(document.createTextNode('Loading'));
        contents.setAttribute('loading','true');

        var loadIndicator = document.createElement('span');
        loadIndicator.style.textDecoration = 'blink';
        loadIndicator.appendChild(document.createTextNode('...'));
        contents.appendChild(loadIndicator);


        frame.appendChild(contents);

        document.body.insertBefore(frame, document.body.firstChild);

        populateContents(href,contents);
}

function populateContents(href, contents, start) {
        if(!start) start = 0;
        //GM_log('Fetching ' + href + '...');
        GM_xmlhttpRequest
           ({
           method:'GET',
           url: href,
           onload:function(response) {
                        var results, content, result, resultLinks, resultImgs;
                        var doc;

                        if (typeof(XPCNativeWrapper) == "function") {
                                var dp = new XPCNativeWrapper(window, "DOMParser()");
                                var parser = new dp.DOMParser();
                                //var src = new String(response.responseText).replace(/<html[^>]+>/,'<html>');
                                xmlDoc = parser.parseFromString(response.responseText, "application/xhtml+xml");
                        }

                        if(contents.getAttribute('loading')=='true') {
                                while(contents.hasChildNodes()) contents.removeChild(contents.childNodes[0]);
                                contents.setAttribute('loading', 'false');
                        }
                        if(!xmlDoc) {
                                if (contents) contents.appendChild(document.createTextNode('Error loading page (no parsed document).'));
                                return;
                        }

                        function resolver() {
                                return 'http://www.w3.org/1999/xhtml';
                        }

                        results = xmlDoc.evaluate('//myns:a/myns:img/..', xmlDoc, resolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

                        if(!results.snapshotLength) {
                                if (contents) contents.appendChild(document.createTextNode('Error loading page (no results found).'));
                                return;
                        }

                        for ( var i=0 ; i < results.snapshotLength; i++ ) {
                                result = results.snapshotItem(i);
                                result.className = 'result';
                                result.style.float = 'left';
                                result.style.paddingRight = '10px';
                                result.href = unescape(result.getAttribute('href').match(/&imgurl=(.*?)&/)[1]);

                                resultImgs = result.getElementsByTagName('img');
                                for(var j=0; j < resultImgs.length; j++) {
                                        resultImgs[j].removeAttribute('width');
                                        resultImgs[j].removeAttribute('height');
                                        resultImgs[j].src = resultImgs[j].getAttribute('src').replace(/&(amp;)?[hw]=\d+/g, '');
                                }


                                contents.appendChild(result);
                        }

                }});
                if(start < (14*5)) {
                        start += 14;

                        populateContents(new String(href).replace(/&start=[0-9]+&/,'&start=' + start + '&'), contents, start);
                }

}


var headshot =  document.evaluate('//div[@id="tn15lhs"]//div[@class="photo"]', document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(!headshot) return;

var actorName = document.evaluate('//div[@id="tn15title"]//h1/child::text()', document, null,XPathResult.STRING_TYPE, null).stringValue;;
if(actorName) actorName = actorName.replace(/^\s+|\s+$/g,"");
if(!actorName) {
	// maybe this is a sub-page
	actorName = document.evaluate('//div[@id="tn15title"]//h1/a/child::text()', document, null,XPathResult.STRING_TYPE, null).stringValue;;
	if(actorName) actorName = actorName.replace(/^\s+|\s+$/g,"");
	if(!actorName) return;
}

var popIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAABGdBTUEAAK%2' +
                                        'FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACSSURBVHjaYvz%2F%2Fz8DDK' +
                                        'xfvx7BQQMs6AKBgScxFK1fb87AhE03SOLMGWEUMbDCM2fO%2FEdWJCt7h0FaWg9FMRPMXTAapMjE5C3D06eX' +
                                        'GB4%2FVkF1o4mJCZS7H6wIZBJIEbJ74Z6BKDYBKuqGmwRyBk5fMzA4AvFjoGmBjBieQQYgk2VlZVE8CDcR6B' +
                                        'EGzPBENREgwADlWjkepo9xFwAAAABJRU5ErkJggg%3D%3D';

var giIcon = 'data:image/gif;base64,R0lGODlhEAAQAOYAAAdj6AD%2F%2FwD8%2FAD7%2BwDv7wDg4ADe3gD' +
        'CwgCengCNjQt2dhz%2F%2FwxfXxdhYRhgYEr%2F%2Fyt5eWb%2F%2FypmZlvDwy5dXTRnZylQUDBZWZ%2F' +
        '%2F%2Fyk3N9X%2F%2FzI7O0VOTjtBQWlzcz5CQlRVVTy1RIODgt0YEkY3N0o%2BPklAQG9nZ2tkZKienmV' +
        'fX7atrZSNjWZhYWxnZ3BsbImFhYB8fGxpaW9tbW1ra4qIiP%2F%2F%2F%2FLy8vHx8fDw8Onp6eLi4tra2' +
        'ri4uLe3t7Ozs7Gxsa6urpycnJmZmZWVlZKSkpCQkIyMjIuLi4iIiIODg4KCgoGBgXx8fHZ2dnR0dHNzc3J' +
        'ycnFxcW9vb21tbWhoaGdnZ2FhYV9fX15eXlhYWFdXV05OTk1NTUNDQ0BAQD09PTs7Ozc3NwAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAHnYAAIYOEhYYANomKi4sjiIyQiY42NzthUDpFRz05nTg2k' +
        '1NJTiAyKyksXVRNIqCITjw%2FMR4SEBUuQT5ArjZaSDAcCBEaExk0QlG8XksnFAUBDxgOJkNXvF9MKBcGA' +
        'wELDSVEWLxgUjUfCQQCBxsvRlu8YlhLMx0MChYqSlVcvE9WWZzUKEGiBZUpWJJNigRpIcNGjx4qGmGoYqE' +
        'RgQAAOw%3D%3D';

var giLink = 'http://www.google.com/m/search?output=xhtml&site=images&sa=X&oi=image&start=0&q=' + encodeURI('"' + actorName + '"');
var giFullLink = 'http://images.google.com/images?q=' + encodeURI('"' + actorName + '"');

var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.media = 'screen';
cssNode.title = 'dynamicSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);

var styleNode = document.createElement("style");
  
document.body.appendChild(styleNode);

var sheet = document.styleSheets[document.styleSheets.length-1]
sheet.insertRule('.' + prefix + 'more-pictures { font-size: 12px; text-align: center; padding:'+ buttonPadding +'px; ' +
                'padding-left: ' + (20+buttonPadding) + 'px; margin: 3px 0 10px; ' +
                'line-height: 16px; background: ' + buttonBgColor + ' url(' + giIcon + ') '+ buttonPadding +'px center no-repeat; ' +
                'border: ' + buttonBorderSize + 'px solid '+ buttonBorderColor + '; ' +
                '-moz-border-radius: ' + buttonRadius + 'px; '+
                '}', sheet.cssRules.length);
sheet.insertRule('div.' + prefix + 'more-pictures:hover { background-color: '+ buttonBgColorHover +'; }', sheet.cssRules.length);
sheet.insertRule('.' + prefix + 'more-pictures a.pop { padding-right: 13px; ' +
                'font-size:'+ buttonFontSize +'px; font-weight: bold; ' +
                '}', sheet.cssRules.length);
sheet.insertRule('div.' + prefix + 'more-pictures:hover a.pop { background: url(' + popIcon + ') center right no-repeat; }', sheet.cssRules.length);
sheet.insertRule('.' + prefix + 'frame { font-family: Arial,Helvetica,sans-serif; position: absolute; ' +
                'background: ' + windowBgColor + ' url(' + giIcon + ') ' + windowPadding + 'px ' + windowPadding + 'px  no-repeat; '+
                'border: ' + windowBorderSize + 'px solid '+ windowBorderColor + '; ' +
                /*'padding: ' + Math.round((windowPadding-windowButtonHeight)/2) +'px ' + windowPadding + 'px ' + windowPadding + 'px; ' +*/
                'padding: ' + windowPadding + 'px; ' +
                'padding-top: 0; ' +
                '-moz-border-radius: 5px; '+
                'z-index: 999; '+
                'opacity: 0.95; '+
                'font-size: ' + windowFontSize + 'pt; ' + '}', sheet.cssRules.length);
sheet.insertRule('.' + prefix + 'frame .button { float: right; text-decoration: none; display: block; '+
                'border: ' + windowButtonBorderSize + 'px solid ' + windowButtonBorderColor + ';' +
                'background-color: '+ windowButtonBgColor + ';' +
/*              'margin: 0 3px ' + Math.round((windowPadding-windowButtonHeight)/2) +'px; '+*/
                'margin: ' + windowButtonMargin + 'px ' + windowButtonMargin + 'px ' + windowPadding + 'px; ' +
                'padding: 0 3px; '+
                '-moz-border-radius: ' + windowButtonRadius + 'px; '+
                'height: ' + windowButtonHeight + 'px; '+
                'font-size: ' + windowButtonTextSize + 'px; '+
                'line-height: ' + windowButtonTextSize + 'px; '+
                'color: ' + windowButtonTextColor + '; ' +
                'font-weight: bold' + '}', sheet.cssRules.length);
sheet.insertRule('.' + prefix + 'frame .button:hover { background-color: ' + windowButtonBgColorHover +  ' }', sheet.cssRules.length);
sheet.insertRule('.' + prefix + 'frame h1 { margin: ' + (windowTitleMarginTop) + 'px 0 0 ' + (windowTitleMarginLeft) + 'px; font-size: ' +  windowTitleFontSize + 'px; }',
sheet.cssRules.length);

sheet.insertRule('.' + prefix + 'frame .contents { border: ' + windowInnerBorderSize + 'px solid '+ windowInnerBorderColor + ';' +
                'background: '+windowInnerBgColor+'; '+
                'padding: ' + windowTextPadding + 'px; '+
                'overflow: auto; '+
                'clear: both; '+ '}', sheet.cssRules.length);
sheet.insertRule('.' + prefix + 'frame .contents .result { width: 150px; float: left; margin-right: 10px; height: 175px; overflow: hidden; }', sheet.cssRules.length);
sheet.insertRule('.' + prefix + 'frame .clearfix:after { clear:both; content:"."; display:block; height:0pt; line-height:0pt; visibility:hidden; }', sheet.cssRules.length);

var morePicturesLink = document.createElement('a');
morePicturesLink.href = giLink;
morePicturesLink.className = 'pop';
morePicturesLink.appendChild(buttonText);
morePicturesLink.addEventListener('click', inlineViewClickHandler, true);

var morePictures = document.createElement('div');
morePictures.className = prefix + 'more-pictures';
morePictures.appendChild(morePicturesLink);

headshot.parentNode.insertBefore(morePictures, headshot.nextSibling);