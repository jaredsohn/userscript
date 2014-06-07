// ==UserScript==
// @name                PornoScope
// @namespace	        http://www.oreilly.com/catalog/greasemonkeyhacks/
// @description	        Beta testing
// @include		http://*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

/*
html2canvas @VERSION@ <http://html2canvas.hertzen.com>
Copyright (c) 2011 Niklas von Hertzen. All rights reserved.
http://www.twitter.com/niklasvh

Released under MIT License
*/

var html2canvas = {};

html2canvas.logging = false;

html2canvas.log = function (a) {
    if (html2canvas.logging && window.console && console.log) {
        console.log(a);
    }
};

html2canvas.Util = {};

html2canvas.Util.backgroundImage = function (src) {

    if (/data:image\/.*;base64,/i.test(src) || /^(-webkit|-moz|linear-gradient|-o-)/.test(src)) {
        return src;
    }

    if (src.toLowerCase().substr(0, 5) === 'url("') {
        src = src.substr(5);
        src = src.substr(0, src.length - 2);
    } else {
        src = src.substr(4);
        src = src.substr(0, src.length - 1);
    }

    return src;
};

html2canvas.Util.Bounds = function getBounds(el) {
    var clientRect,
    bounds = {};

    if (el.getBoundingClientRect) {
        clientRect = el.getBoundingClientRect();

        bounds.top = clientRect.top;
        bounds.bottom = clientRect.bottom || (clientRect.top + clientRect.height);
        bounds.left = clientRect.left;
        bounds.width = clientRect.width;
        bounds.height = clientRect.height;

        return bounds;

    }
}

html2canvas.Util.getCSS = function (el, attribute) {
    return $(el).css(attribute);
};

html2canvas.Util.Extend = function (options, defaults) {
    var key;
    for (key in options) {
        if (options.hasOwnProperty(key)) {
            defaults[key] = options[key];
        }
    }
    return defaults;
};

html2canvas.Util.Children = function (el) {
    var children;
    try {
        children = $(el).contents();
    } catch (ex) {
        html2canvas.log("html2canvas.Util.Children failed with exception: " + ex.message);
        children = [];
    }
    return children;
}

/*
html2canvas @VERSION@ <http://html2canvas.hertzen.com>
Copyright (c) 2011 Niklas von Hertzen. All rights reserved.
http://www.twitter.com/niklasvh

Released under MIT License
*/

html2canvas.Generate = {};



html2canvas.Generate.Gradient = function (src, bounds) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    tmp,
    p0 = 0,
    p1 = 0,
    p2 = 0,
    p3 = 0,
    steps = [],
    position,
    i,
    len,
    lingrad,
    increment,
    p,
    img;

    canvas.width = bounds.width;
    canvas.height = bounds.height;


    function getColors(input) {
        var j = -1,
        color = '',
        chr;

        while (j++ < input.length) {
            chr = input.charAt(j);
            if (chr === ')') {
                color += chr;
                steps.push(color);
                color = '';
                while (j++ < input.length && input.charAt(j) !== ',') {
                }
            } else {
                color += chr;
            }
        }
    }

    if (tmp = src.match(/-webkit-linear-gradient\((.*)\)/)) {

        position = tmp[1].split(",", 1)[0];
        getColors(tmp[1].substr(position.length + 2));
        position = position.split(' ');

        for (p = 0; p < position.length; p += 1) {

            switch (position[p]) {
                case 'top':
                    p3 = bounds.height;
                    break;

                case 'right':
                    p0 = bounds.width;
                    break;

                case 'bottom':
                    p1 = bounds.height;
                    break;

                case 'left':
                    p2 = bounds.width;
                    break;
            }

        }

    } else if (tmp = src.match(/-webkit-gradient\(linear, (\d+)[%]{0,1} (\d+)[%]{0,1}, (\d+)[%]{0,1} (\d+)[%]{0,1}, from\((.*)\), to\((.*)\)\)/)) {

        p0 = (tmp[1] * bounds.width) / 100;
        p1 = (tmp[2] * bounds.height) / 100;
        p2 = (tmp[3] * bounds.width) / 100;
        p3 = (tmp[4] * bounds.height) / 100;

        steps.push(tmp[5]);
        steps.push(tmp[6]);

    } else if (tmp = src.match(/-moz-linear-gradient\((\d+)[%]{0,1} (\d+)[%]{0,1}, (.*)\)/)) {

        p0 = (tmp[1] * bounds.width) / 100;
        p1 = (tmp[2] * bounds.width) / 100;
        p2 = bounds.width - p0;
        p3 = bounds.height - p1;
        getColors(tmp[3]);

    } else {
        return;
    }

    lingrad = ctx.createLinearGradient(p0, p1, p2, p3);
    increment = 1 / (steps.length - 1);

    for (i = 0, len = steps.length; i < len; i += 1) {
        try {
            lingrad.addColorStop(increment * i, steps[i]);
        }
        catch (e) {
            html2canvas.log(['failed to add color stop: ', e, '; tried to add: ', steps[i], '; stop: ', i, '; in: ', src]);
        }
    }

    ctx.fillStyle = lingrad;

    // draw shapes
    ctx.fillRect(0, 0, bounds.width, bounds.height);

    img = new Image();
    img.src = canvas.toDataURL();

    return img;

}

html2canvas.Generate.ListAlpha = function (number) {
    var tmp = "",
    modulus;

    do {
        modulus = number % 26;
        tmp = String.fromCharCode((modulus) + 64) + tmp;
        number = number / 26;
    } while ((number * 26) > 26);

    return tmp;
}

html2canvas.Generate.ListRoman = function (number) {
    var romanArray = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
    decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    roman = "",
    v,
    len = romanArray.length;

    if (number <= 0 || number >= 4000) {
        return number;
    }

    for (v = 0; v < len; v += 1) {
        while (number >= decimal[v]) {
            number -= decimal[v];
            roman += romanArray[v];
        }
    }

    return roman;

}

/*
html2canvas @VERSION@ <http://html2canvas.hertzen.com>
Copyright (c) 2011 Niklas von Hertzen. All rights reserved.
http://www.twitter.com/niklasvh

Released under MIT License
*/

/*
*  New function for traversing elements
*/

html2canvas.Parse = function (element, images, opts) {
    window.scroll(0, 0);
    opts = opts || {};

    // select body by default
    if (element === undefined) {
        element = document.body;
    }


    var support = {
        rangeBounds: false

    },
    options = {
        iframeDefault: "default",
        ignoreElements: "IFRAME|OBJECT|PARAM",
        useOverflow: true,
        letterRendering: false
    },
    needReorder = false,
    numDraws = 0,
    fontData = {},
    doc = element.ownerDocument,
    ignoreElementsRegExp = new RegExp("(" + options.ignoreElements + ")"),
    body = doc.body,
    r,
    testElement,
    rangeBounds,
    rangeHeight,
    stack,
    ctx,
    docDim,
    i,
    children,
    childrenLen;

    options = html2canvas.Util.Extend(opts, options);

    images = images || {};

    // Test whether we can use ranges to measure bounding boxes
    // Opera doesn't provide valid bounds.height/bottom even though it supports the method.


    if (doc.createRange) {
        r = doc.createRange();
        //this.support.rangeBounds = new Boolean(r.getBoundingClientRect);
        if (r.getBoundingClientRect) {
            testElement = doc.createElement('boundtest');
            testElement.style.height = "123px";
            testElement.style.display = "block";
            body.appendChild(testElement);

            r.selectNode(testElement);
            rangeBounds = r.getBoundingClientRect();
            rangeHeight = rangeBounds.height;

            if (rangeHeight === 123) {
                support.rangeBounds = true;
            }
            body.removeChild(testElement);


        }

    }


    /*
    var rootStack = new this.storageContext($(document).width(),$(document).height());  
    rootStack.opacity = this.getCSS(this.element,"opacity");
    var stack = this.newElement(this.element,rootStack);
        
        
    this.parseElement(this.element,stack);  
    */


    function docSize() {

        return {
            width: Math.max(
                Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
                Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
                Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
                ),
            height: Math.max(
                Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
                Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
                Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
                )
        };

    }

    function getCSS(element, attribute, intOnly) {
        if (intOnly !== undefined && intOnly === true) {
            return parseInt(html2canvas.Util.getCSS(element, attribute), 10);
        } else {
            return html2canvas.Util.getCSS(element, attribute);
        }
    }

    // Drawing a rectangle
    function renderRect(ctx, x, y, w, h, bgcolor) {
        if (bgcolor !== "transparent") {
            ctx.setVariable("fillStyle", bgcolor);
            ctx.fillRect(x, y, w, h);
            numDraws += 1;
        }
    }


    function textTransform(text, transform) {
        switch (transform) {
            case "lowercase":
                return text.toLowerCase();

            case "capitalize":
                return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, function (m, p1, p2) {
                    if (m.length > 0) {
                        return p1 + p2.toUpperCase();
                    }
                });

            case "uppercase":
                return text.toUpperCase();

            default:
                return text;

        }

    }

    function trimText(text) {
        return text.replace(/^\s*/g, "").replace(/\s*$/g, "");
    }

    function fontMetrics(font, fontSize) {

        if (fontData[font + "-" + fontSize] !== undefined) {
            return fontData[font + "-" + fontSize];
        }


        var container = doc.createElement('div'),
        img = doc.createElement('img'),
        span = doc.createElement('span'),
        baseline,
        middle,
        metricsObj;


        container.style.visibility = "hidden";
        container.style.fontFamily = font;
        container.style.fontSize = fontSize;
        container.style.margin = 0;
        container.style.padding = 0;

        body.appendChild(container);



        // http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever (handtinywhite.gif)
        img.src = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=";
        img.width = 1;
        img.height = 1;

        img.style.margin = 0;
        img.style.padding = 0;
        img.style.verticalAlign = "baseline";

        span.style.fontFamily = font;
        span.style.fontSize = fontSize;
        span.style.margin = 0;
        span.style.padding = 0;




        span.appendChild(doc.createTextNode('Hidden Text'));
        container.appendChild(span);
        container.appendChild(img);
        baseline = (img.offsetTop - span.offsetTop) + 1;

        container.removeChild(span);
        container.appendChild(doc.createTextNode('Hidden Text'));

        container.style.lineHeight = "normal";
        img.style.verticalAlign = "super";

        middle = (img.offsetTop - container.offsetTop) + 1;
        metricsObj = {
            baseline: baseline,
            lineWidth: 1,
            middle: middle
        };


        fontData[font + "-" + fontSize] = metricsObj;

        body.removeChild(container);

        return metricsObj;

    }


    function drawText(currentText, x, y, ctx) {
        if (trimText(currentText).length > 0) {
            ctx.fillText(currentText, x, y);
            numDraws += 1;
        }
    }


    function renderText(el, textNode, stack) {
        var ctx = stack.ctx,
        family = getCSS(el, "fontFamily", false),
        size = getCSS(el, "fontSize", false),
        color = getCSS(el, "color", false),
        text_decoration = getCSS(el, "textDecoration", false),
        text_align = getCSS(el, "textAlign", false),
        letter_spacing = getCSS(el, "letterSpacing", false),
        bounds,
        text,
        metrics,
        renderList,
        bold = getCSS(el, "fontWeight", false),
        font_style = getCSS(el, "fontStyle", false),
        font_variant = getCSS(el, "fontVariant", false),
        align = false,
        newTextNode,
        textValue,
        textOffset = 0,
        oldTextNode,
        c,
        range,
        parent,
        wrapElement,
        backupText;

        // apply text-transform:ation to the text



        textNode.nodeValue = textTransform(textNode.nodeValue, getCSS(el, "textTransform", false));
        text = trimText(textNode.nodeValue);

        if (text.length > 0) {

            if (text_decoration !== "none") {
                metrics = fontMetrics(family, size);
            }

            text_align = text_align.replace(["-webkit-auto"], ["auto"]);

            if (options.letterRendering === false && /^(left|right|justify|auto)$/.test(text_align) && /^(normal|none)$/.test(letter_spacing)) {
                // this.setContextVariable(ctx,"textAlign",text_align);  
                renderList = textNode.nodeValue.split(/(\b| )/);

            } else {
                //  this.setContextVariable(ctx,"textAlign","left");
                renderList = textNode.nodeValue.split("");
            }

            switch (parseInt(bold, 10)) {
                case 401:
                    bold = "bold";
                    break;
                case 400:
                    bold = "normal";
                    break;
            }

            ctx.setVariable("fillStyle", color);
            ctx.setVariable("font", font_variant + " " + bold + " " + font_style + " " + size + " " + family);


            if (align) {
                ctx.setVariable("textAlign", "right");
            } else {
                ctx.setVariable("textAlign", "left");
            }


            /*
            if (stack.clip){
            ctx.rect (stack.clip.left, stack.clip.top, stack.clip.width, stack.clip.height);
            ctx.clip();
            }
            */


            oldTextNode = textNode;


            for (c = 0; c < renderList.length; c += 1) {
                textValue = null;



                if (support.rangeBounds) {
                    // getBoundingClientRect is supported for ranges
                    if (text_decoration !== "none" || trimText(renderList[c]).length !== 0) {
                        textValue = renderList[c];
                        if (doc.createRange) {
                            range = doc.createRange();

                            range.setStart(textNode, textOffset);
                            range.setEnd(textNode, textOffset + textValue.length);
                        } else {
                            // TODO add IE support
                            range = body.createTextRange();
                        }

                        if (range.getBoundingClientRect()) {
                            bounds = range.getBoundingClientRect();
                        } else {
                            bounds = {};
                        }

                    }
                } else {
                    // it isn't supported, so let's wrap it inside an element instead and get the bounds there

                    // IE 9 bug
                    if (typeof oldTextNode.nodeValue !== "string") {
                        continue;
                    }

                    newTextNode = oldTextNode.splitText(renderList[c].length);

                    parent = oldTextNode.parentNode;
                    wrapElement = doc.createElement('wrapper');
                    backupText = oldTextNode.cloneNode(true);

                    wrapElement.appendChild(oldTextNode.cloneNode(true));
                    parent.replaceChild(wrapElement, oldTextNode);

                    bounds = html2canvas.Util.Bounds(wrapElement);

                    textValue = oldTextNode.nodeValue;

                    oldTextNode = newTextNode;
                    parent.replaceChild(backupText, wrapElement);


                }

                if (textValue !== null) {
                    drawText(textValue, bounds.left, bounds.bottom, ctx);
                }

                switch (text_decoration) {
                    case "underline":
                        // Draws a line at the baseline of the font
                        // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size         
                        renderRect(ctx, bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, color);
                        break;
                    case "overline":
                        renderRect(ctx, bounds.left, bounds.top, bounds.width, 1, color);
                        break;
                    case "line-through":
                        // TODO try and find exact position for line-through
                        renderRect(ctx, bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, color);
                        break;

                }





                textOffset += renderList[c].length;

            }



        }

    }

    function listPosition(element, val) {
        var boundElement = doc.createElement("boundelement"),
        type,
        bounds;

        boundElement.style.display = "inline";
        //boundElement.style.width = "1px";
        //boundElement.style.height = "1px";

        type = element.style.listStyleType;
        element.style.listStyleType = "none";

        boundElement.appendChild(doc.createTextNode(val));


        element.insertBefore(boundElement, element.firstChild);


        bounds = html2canvas.Util.Bounds(boundElement);
        element.removeChild(boundElement);
        element.style.listStyleType = type;
        return bounds;

    }


    function renderListItem(element, stack, elBounds) {


        var position = getCSS(element, "listStylePosition", false),
        x,
        y,
        type = getCSS(element, "listStyleType", false),
        currentIndex,
        text,
        listBounds,
        bold = getCSS(element, "fontWeight");

        if (/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(type)) {

            // TODO remove jQuery dependency
            currentIndex = $(element).index() + 1;

            switch (type) {
                case "decimal":
                    text = currentIndex;
                    break;
                case "decimal-leading-zero":
                    if (currentIndex.toString().length === 1) {
                        text = currentIndex = "0" + currentIndex.toString();
                    } else {
                        text = currentIndex.toString();
                    }
                    break;
                case "upper-roman":
                    text = html2canvas.Generate.ListRoman(currentIndex);
                    break;
                case "lower-roman":
                    text = html2canvas.Generate.ListRoman(currentIndex).toLowerCase();
                    break;
                case "lower-alpha":
                    text = html2canvas.Generate.ListAlpha(currentIndex).toLowerCase();
                    break;
                case "upper-alpha":
                    text = html2canvas.Generate.ListAlpha(currentIndex);
                    break;
            }


            text += ". ";
            listBounds = listPosition(element, text);



            switch (bold) {
                case 401:
                    bold = "bold";
                    break;
                case 400:
                    bold = "normal";
                    break;
            }




            ctx.setVariable("fillStyle", getCSS(element, "color", false));
            ctx.setVariable("font", getCSS(element, "fontVariant", false) + " " + bold + " " + getCSS(element, "fontStyle", false) + " " + getCSS(element, "fontFize", false) + " " + getCSS(element, "fontFamily", false));


            if (position === "inside") {
                ctx.setVariable("textAlign", "left");
                //   this.setFont(stack.ctx, element, false);     
                x = elBounds.left;

            } else {
                return;
                /* 
                TODO really need to figure out some more accurate way to try and find the position. 
                as defined in http://www.w3.org/TR/CSS21/generate.html#propdef-list-style-position, it does not even have a specified "correct" position, so each browser 
                may display it whatever way it feels like. 
                "The position of the list-item marker adjacent to floats is undefined in CSS 2.1. CSS 2.1 does not specify the precise location of the marker box or its position in the painting order"
                */
                ctx.setVariable("textAlign", "right");
                //  this.setFont(stack.ctx, element, true);
                x = elBounds.left - 10;
            }

            y = listBounds.bottom;

            drawText(text, x, y, ctx)


        }


    }

    function loadImage(src) {
        var img = images[src];
        if (img && img.succeeded === true) {
            return img.img;
        } else {
            return false;
        }
    }






    function clipBounds(src, dst) {

        var x = Math.max(src.left, dst.left),
        y = Math.max(src.top, dst.top),
        x2 = Math.min((src.left + src.width), (dst.left + dst.width)),
        y2 = Math.min((src.top + src.height), (dst.top + dst.height));

        return {
            left: x,
            top: y,
            width: x2 - x,
            height: y2 - y
        };

    }

    function setZ(zIndex, parentZ) {
        // TODO fix static elements overlapping relative/absolute elements under same stack, if they are defined after them

        if (!parentZ) {
            this.zStack = new html2canvas.zContext(0);
            return this.zStack;
        }

        if (zIndex !== "auto") {
            needReorder = true;
            var newContext = new html2canvas.zContext(zIndex);
            parentZ.children.push(newContext);
            return newContext;

        }

        return parentZ;

    }

    function renderBorders(el, ctx, bounds, clip) {

        /*
        *  TODO add support for different border-style's than solid   
        */

        var x = bounds.left,
        y = bounds.top,
        w = bounds.width,
        h = bounds.height,
        borderSide,
        borderData,
        bx,
        by,
        bw,
        bh,
        borderBounds,
        borders = (function (el) {
            var borders = [],
            sides = ["Top", "Right", "Bottom", "Left"],
            s;

            for (s = 0; s < 4; s += 1) {
                borders.push({
                    width: getCSS(el, 'border' + sides[s] + 'Width', true),
                    color: getCSS(el, 'border' + sides[s] + 'Color', false)
                });
            }

            return borders;

        } (el));


        for (borderSide = 0; borderSide < 4; borderSide += 1) {
            borderData = borders[borderSide];

            if (borderData.width > 0) {
                bx = x;
                by = y;
                bw = w;
                bh = h - (borders[2].width);

                switch (borderSide) {
                    case 0:
                        // top border
                        bh = borders[0].width;
                        break;
                    case 1:
                        // right border
                        bx = x + w - (borders[1].width);
                        bw = borders[1].width;
                        break;
                    case 2:
                        // bottom border
                        by = (by + h) - (borders[2].width);
                        bh = borders[2].width;
                        break;
                    case 3:
                        // left border
                        bw = borders[3].width;
                        break;
                }

                borderBounds = {
                    left: bx,
                    top: by,
                    width: bw,
                    height: bh
                };

                if (clip) {
                    borderBounds = clipBounds(borderBounds, clip);
                }


                if (borderBounds.width > 0 && borderBounds.height > 0) {
                    renderRect(ctx, bx, by, borderBounds.width, borderBounds.height, borderData.color);
                }


            }
        }

        return borders;

    }


    function renderFormValue(el, bounds, stack) {

        var valueWrap = doc.createElement('valuewrap'),
        cssArr = ['lineHeight', 'textAlign', 'fontFamily', 'color', 'fontSize', 'paddingLeft', 'paddingTop', 'width', 'height', 'border', 'borderLeftWidth', 'borderTopWidth'],
        i,
        textValue,
        textNode,
        arrLen,
        style;

        for (i = 0, arrLen = cssArr.length; i < arrLen; i += 1) {
            style = cssArr[i];
            valueWrap.style[style] = getCSS(el, style, false);
        }


        valueWrap.style.borderColor = "black";
        valueWrap.style.borderStyle = "solid";
        valueWrap.style.display = "block";
        valueWrap.style.position = "absolute";
        if (/^(submit|reset|button|text|password)$/.test(el.type) || el.nodeName === "SELECT") {
            valueWrap.style.lineHeight = getCSS(el, "height", false);
        }


        valueWrap.style.top = bounds.top + "px";
        valueWrap.style.left = bounds.left + "px";

        if (el.nodeName === "SELECT") {
            // TODO increase accuracy of text position
            textValue = el.options[el.selectedIndex].text;
        } else {
            textValue = el.value;
        }
        textNode = doc.createTextNode(textValue);

        valueWrap.appendChild(textNode);
        body.appendChild(valueWrap);


        renderText(el, textNode, stack);
        body.removeChild(valueWrap);



    }



    function getBackgroundPosition(el, bounds, image) {
        // TODO add support for multi image backgrounds

        var bgpos = getCSS(el, "backgroundPosition").split(",")[0] || "0 0",
        bgposition = bgpos.split(" "),
        topPos,
        left,
        percentage,
        val;

        if (bgposition.length === 1) {
            val = bgposition;

            bgposition = [];

            bgposition[0] = val;
            bgposition[1] = val;
        }



        if (bgposition[0].toString().indexOf("%") !== -1) {
            percentage = (parseFloat(bgposition[0]) / 100);
            left = ((bounds.width * percentage) - (image.width * percentage));

        } else {
            left = parseInt(bgposition[0], 10);
        }

        if (bgposition[1].toString().indexOf("%") !== -1) {

            percentage = (parseFloat(bgposition[1]) / 100);
            topPos = ((bounds.height * percentage) - (image.height * percentage));
        } else {
            topPos = parseInt(bgposition[1], 10);
        }




        return {
            top: topPos,
            left: left
        };

    }

    function renderImage(ctx, image, sx, sy, sw, sh, dx, dy, dw, dh) {
        ctx.drawImage(
            image,
            sx, //sx
            sy, //sy
            sw, //sw
            sh, //sh
            dx, //dx
            dy, // dy
            dw, //dw
            dh //dh      
            );
        numDraws += 1;

    }


    function renderBackgroundRepeat(ctx, image, x, y, width, height, elx, ely) {
        var sourceX = 0,
        sourceY = 0;
        if (elx - x > 0) {
            sourceX = elx - x;
        }

        if (ely - y > 0) {
            sourceY = ely - y;
        }

        renderImage(
            ctx,
            image,
            sourceX, // source X
            sourceY, // source Y 
            width - sourceX, // source Width
            height - sourceY, // source Height
            x + sourceX, // destination X
            y + sourceY, // destination Y
            width - sourceX, // destination width
            height - sourceY // destination height
            );
    }


    function renderBackgroundRepeatY(ctx, image, bgp, x, y, w, h) {

        var height,
        width = Math.min(image.width, w), bgy;

        bgp.top = bgp.top - Math.ceil(bgp.top / image.height) * image.height;


        for (bgy = (y + bgp.top); bgy < h + y; ) {


            if (Math.floor(bgy + image.height) > h + y) {
                height = (h + y) - bgy;
            } else {
                height = image.height;
            }
            renderBackgroundRepeat(ctx, image, x + bgp.left, bgy, width, height, x, y);

            bgy = Math.floor(bgy + image.height);

        }
    }

    function renderBackgroundRepeatX(ctx, image, bgp, x, y, w, h) {

        var height = Math.min(image.height, h),
        width, bgx;


        bgp.left = bgp.left - Math.ceil(bgp.left / image.width) * image.width;


        for (bgx = (x + bgp.left); bgx < w + x; ) {

            if (Math.floor(bgx + image.width) > w + x) {
                width = (w + x) - bgx;
            } else {
                width = image.width;
            }

            renderBackgroundRepeat(ctx, image, bgx, (y + bgp.top), width, height, x, y);

            bgx = Math.floor(bgx + image.width);


        }
    }

    function renderBackground(el, bounds, ctx) {

        // TODO add support for multi background-images
        var background_image = getCSS(el, "backgroundImage", false),
        background_repeat = getCSS(el, "backgroundRepeat", false).split(",")[0],
        image,
        bgp,
        bgy,
        bgw,
        bgsx,
        bgsy,
        bgdx,
        bgdy,
        bgh,
        h,
        height,
        add;

        //   if (typeof background_image !== "undefined" && /^(1|none)$/.test(background_image) === false && /^(-webkit|-moz|linear-gradient|-o-)/.test(background_image)===false){

        if (!/data:image\/.*;base64,/i.test(background_image) && !/^(-webkit|-moz|linear-gradient|-o-)/.test(background_image)) {
            background_image = background_image.split(",")[0];
        }

        if (typeof background_image !== "undefined" && /^(1|none)$/.test(background_image) === false) {
            background_image = html2canvas.Util.backgroundImage(background_image);
            image = loadImage(background_image);


            bgp = getBackgroundPosition(el, bounds, image);


            if (image) {
                switch (background_repeat) {

                    case "repeat-x":
                        renderBackgroundRepeatX(ctx, image, bgp, bounds.left, bounds.top, bounds.width, bounds.height);
                        break;

                    case "repeat-y":
                        renderBackgroundRepeatY(ctx, image, bgp, bounds.left, bounds.top, bounds.width, bounds.height);
                        break;

                    case "no-repeat":
                        /*
                        this.drawBackgroundRepeat(
                        ctx,
                        image,
                        bgp.left+bounds.left, // sx
                        bgp.top+bounds.top, // sy
                        Math.min(bounds.width,image.width),
                        Math.min(bounds.height,image.height),
                        bounds.left,
                        bounds.top
                        );*/


                        // console.log($(el).css('background-image'));
                        bgw = bounds.width - bgp.left;
                        bgh = bounds.height - bgp.top;
                        bgsx = bgp.left;
                        bgsy = bgp.top;
                        bgdx = bgp.left + bounds.left;
                        bgdy = bgp.top + bounds.top;

                        //
                        //     bgw = Math.min(bgw,image.width);
                        //  bgh = Math.min(bgh,image.height);     

                        if (bgsx < 0) {
                            bgsx = Math.abs(bgsx);
                            bgdx += bgsx;
                            bgw = Math.min(bounds.width, image.width - bgsx);
                        } else {
                            bgw = Math.min(bgw, image.width);
                            bgsx = 0;
                        }

                        if (bgsy < 0) {
                            bgsy = Math.abs(bgsy);
                            bgdy += bgsy;
                            // bgh = bgh-bgsy;
                            bgh = Math.min(bounds.height, image.height - bgsy);
                        } else {
                            bgh = Math.min(bgh, image.height);
                            bgsy = 0;
                        }


                        //   bgh = Math.abs(bgh);
                        //   bgw = Math.abs(bgw);
                        if (bgh > 0 && bgw > 0) {
                            renderImage(
                                ctx,
                                image,
                                bgsx, // source X : 0 
                                bgsy, // source Y : 1695
                                bgw, // source Width : 18
                                bgh, // source Height : 1677
                                bgdx, // destination X :906
                                bgdy, // destination Y : 1020
                                bgw, // destination width : 18
                                bgh // destination height : 1677
                                );

                            // ctx.drawImage(image,(bounds.left+bgp.left),(bounds.top+bgp.top));	                      

                        }
                        break;
                    default:



                        bgp.top = bgp.top - Math.ceil(bgp.top / image.height) * image.height;


                        for (bgy = (bounds.top + bgp.top); bgy < bounds.height + bounds.top; ) {



                            h = Math.min(image.height, (bounds.height + bounds.top) - bgy);


                            if (Math.floor(bgy + image.height) > h + bgy) {
                                height = (h + bgy) - bgy;
                            } else {
                                height = image.height;
                            }
                            // console.log(height);

                            if (bgy < bounds.top) {
                                add = bounds.top - bgy;
                                bgy = bounds.top;

                            } else {
                                add = 0;
                            }

                            renderBackgroundRepeatX(ctx, image, bgp, bounds.left, bgy, bounds.width, height);
                            if (add > 0) {
                                bgp.top += add;
                            }
                            bgy = Math.floor(bgy + image.height) - add;
                        }
                        break;


                }
            } else {
                html2canvas.log("html2canvas: Error loading background:" + background_image);
                //console.log(images);
            }

        }
    }



    function renderElement(el, parentStack) {

        var bounds = html2canvas.Util.Bounds(el),
        x = bounds.left,
        y = bounds.top,
        w = bounds.width,
        h = bounds.height,
        image,
        bgcolor = getCSS(el, "backgroundColor", false),
        cssPosition = getCSS(el, "position", false),
        zindex,
        opacity = getCSS(el, "opacity", false),
        stack,
        stackLength,
        borders,
        ctx,
        bgbounds,
        imgSrc,
        paddingLeft,
        paddingTop,
        paddingRight,
        paddingBottom;

        if (parentStack === undefined) {
            docDim = docSize();
            parentStack = {
                opacity: 1
            };
        } else {
            docDim = {};
        }


        //var zindex = this.formatZ(this.getCSS(el,"zIndex"),cssPosition,parentStack.zIndex,el.parentNode);

        zindex = setZ(getCSS(el, "zIndex", false), parentStack.zIndex);



        stack = {
            ctx: new html2canvas.canvasContext(docDim.width || w, docDim.height || h),
            zIndex: zindex,
            opacity: opacity * parentStack.opacity,
            cssPosition: cssPosition
        };



        // TODO correct overflow for absolute content residing under a static position

        if (parentStack.clip) {
            stack.clip = html2canvas.Util.Extend({}, parentStack.clip);
            //stack.clip = parentStack.clip;
            //   stack.clip.height = stack.clip.height - parentStack.borders[2].width;
        }


        if (options.useOverflow === true && /(hidden|scroll|auto)/.test(getCSS(el, "overflow")) === true && /(BODY)/i.test(el.nodeName) === false) {
            if (stack.clip) {
                stack.clip = clipBounds(stack.clip, bounds);
            } else {
                stack.clip = bounds;
            }
        }


        stackLength = zindex.children.push(stack);

        ctx = zindex.children[stackLength - 1].ctx;

        ctx.setVariable("globalAlpha", stack.opacity);

        // draw element borders
        borders = renderBorders(el, ctx, bounds);
        stack.borders = borders;


        // let's modify clip area for child elements, so borders dont get overwritten

        /*
        if (stack.clip){
        stack.clip.width = stack.clip.width-(borders[1].width); 
        stack.clip.height = stack.clip.height-(borders[2].width); 
        }
        */
        if (ignoreElementsRegExp.test(el.nodeName) && options.iframeDefault !== "transparent") {
            if (options.iframeDefault === "default") {
                bgcolor = "#efefef";
            } else {
                bgcolor = options.iframeDefault;
            }
        }

        // draw base element bgcolor   

        bgbounds = {
            left: x + borders[3].width,
            top: y + borders[0].width,
            width: w - (borders[1].width + borders[3].width),
            height: h - (borders[0].width + borders[2].width)
        };

        //if (this.withinBounds(stack.clip,bgbounds)){  

        if (stack.clip) {
            bgbounds = clipBounds(bgbounds, stack.clip);

            //}    

        }


        if (bgbounds.height > 0 && bgbounds.width > 0) {
            renderRect(
                ctx,
                bgbounds.left,
                bgbounds.top,
                bgbounds.width,
                bgbounds.height,
                bgcolor
                );

            renderBackground(el, bgbounds, ctx);
        }

        switch (el.nodeName) {
            case "IMG":
                imgSrc = el.getAttribute('src');
                image = loadImage(imgSrc);
                if (image) {

                    paddingLeft = getCSS(el, 'paddingLeft', true);
                    paddingTop = getCSS(el, 'paddingTop', true);
                    paddingRight = getCSS(el, 'paddingRight', true);
                    paddingBottom = getCSS(el, 'paddingBottom', true);


                    renderImage(
                        ctx,
                        image,
                        0, //sx
                        0, //sy
                        image.width, //sw
                        image.height, //sh
                        x + paddingLeft + borders[3].width, //dx
                        y + paddingTop + borders[0].width, // dy
                        bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight), //dw
                        bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom) //dh       
                        );

                } else {
                    html2canvas.log("html2canvas: Error loading <img>:" + imgSrc);
                }
                break;
            case "INPUT":
                // TODO add all relevant type's, i.e. HTML5 new stuff
                // todo add support for placeholder attribute for browsers which support it
                if (/^(text|url|email|submit|button|reset)$/.test(el.type) && el.value.length > 0) {

                    renderFormValue(el, bounds, stack);


                    /*
                    this just doesn't work well enough
                
                    this.newText(el,{
                    nodeValue:el.value,
                    splitText: function(){
                    return this;
                    },
                    formValue:true
                    },stack);
                    */
                }
                break;
            case "TEXTAREA":
                if (el.value.length > 0) {
                    renderFormValue(el, bounds, stack);
                }
                break;
            case "SELECT":
                if (el.options.length > 0) {
                    renderFormValue(el, bounds, stack);
                }
                break;
            case "LI":
                renderListItem(el, stack, bgbounds);
                break;
            case "CANVAS":
                paddingLeft = getCSS(el, 'paddingLeft', true);
                paddingTop = getCSS(el, 'paddingTop', true);
                paddingRight = getCSS(el, 'paddingRight', true);
                paddingBottom = getCSS(el, 'paddingBottom', true);
                renderImage(
                    ctx,
                    el,
                    0, //sx
                    0, //sy
                    el.width, //sw
                    el.height, //sh
                    x + paddingLeft + borders[3].width, //dx
                    y + paddingTop + borders[0].width, // dy
                    bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight), //dw
                    bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom) //dh
                );
                break;
        }

        return zindex.children[stackLength - 1];
    }



    function parseElement(el, stack) {

        // skip hidden elements and their children
        if (getCSS(el, 'display') !== "none" && getCSS(el, 'visibility') !== "hidden") {

            stack = renderElement(el, stack) || stack;

            ctx = stack.ctx;

            if (!ignoreElementsRegExp.test(el.nodeName)) {
                var elementChildren = html2canvas.Util.Children(el),
                i,
                node,
                childrenLen;
                for (i = 0, childrenLen = elementChildren.length; i < childrenLen; i += 1) {
                    node = elementChildren[i];

                    if (node.nodeType === 1) {
                        parseElement(node, stack);
                    } else if (node.nodeType === 3) {
                        renderText(el, node, stack);
                    }

                }

            }
        }
    }

    stack = renderElement(element);

    // parse every child element
    for (i = 0, children = element.children, childrenLen = children.length; i < childrenLen; i += 1) {
        parseElement(children[i], stack);
    }

    return stack;

};

html2canvas.zContext = function (zindex) {
    return {
        zindex: zindex,
        children: []
    };
};

/*
html2canvas @VERSION@ <http://html2canvas.hertzen.com>
Copyright (c) 2011 Niklas von Hertzen. All rights reserved.
http://www.twitter.com/niklasvh

Released under MIT License
*/

html2canvas.Preload = function (element, opts) {

    var options = {
        proxy: "http://html2canvas.appspot.com/",
        timeout: 0    // no timeout
    },
    images = {
        numLoaded: 0,   // also failed are counted here
        numFailed: 0,
        numTotal: 0,
        cleanupDone: false
    },
    pageOrigin,
    methods,
    i,
    count = 0,
    doc = element.ownerDocument,
    domImages = doc.images, // TODO probably should limit it to images present in the element only
    imgLen = domImages.length,
    link = doc.createElement("a"),
    timeoutTimer;

    link.href = window.location.href;
    pageOrigin = link.protocol + link.host;
    opts = opts || {};

    options = html2canvas.Util.Extend(opts, options);



    element = element || doc.body;

    function isSameOrigin(url) {
        link.href = url;
        var origin = link.protocol + link.host;
        return ":" === origin || (origin === pageOrigin);
    }

    function start() {
        html2canvas.log("html2canvas: start: images: " + images.numLoaded + " / " + images.numTotal + " (failed: " + images.numFailed + ")");
        if (!images.firstRun && images.numLoaded >= images.numTotal) {

            /*
            this.log('Finished loading '+this.imagesLoaded+' images, Started parsing');
            this.bodyOverflow = document.getElementsByTagName('body')[0].style.overflow;
            document.getElementsByTagName('body')[0].style.overflow = "hidden";
            */
            if (typeof options.complete === "function") {
                options.complete(images);
            }

            html2canvas.log("Finished loading images: # " + images.numTotal + " (failed: " + images.numFailed + ")");
        }
    }

    function proxyGetImage(url, img) {
        var callback_name,
            scriptUrl = options.proxy,
            script,
            imgObj = images[url];

        link.href = url;
        url = link.href; // work around for pages with base href="" set - WARNING: this may change the url -> so access imgObj from images map before changing that url!

        callback_name = 'html2canvas_' + count;
        imgObj.callbackname = callback_name;

        if (scriptUrl.indexOf("?") > -1) {
            scriptUrl += "&";
        } else {
            scriptUrl += "?";
        }
        scriptUrl += 'url=' + encodeURIComponent(url) + '&callback=' + callback_name;

        window[callback_name] = function (a) {
            if (a.substring(0, 6) === "error:") {
                imgObj.succeeded = false;
                images.numLoaded++;
                images.numFailed++;
                start();
            } else {
                img.onload = function () {
                    imgObj.succeeded = true;
                    images.numLoaded++;
                    start();
                };
                img.src = a;
            }
            window[callback_name] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
            try {
                delete window[callback_name];  // for all browser that support this
            } catch (ex) { }
            script.parentNode.removeChild(script);
            script = null;
            imgObj.callbackname = undefined;
        };

        count += 1;

        script = doc.createElement("script");
        script.setAttribute("src", scriptUrl);
        script.setAttribute("type", "text/javascript");
        imgObj.script = script;
        window.document.body.appendChild(script);

    }

    function getImages(el) {



        // if (!this.ignoreRe.test(el.nodeName)){
        // 

        var contents = html2canvas.Util.Children(el),
        i,
        contentsLen = contents.length,
        background_image,
        src,
        img,
        elNodeType = false;

        for (i = 0; i < contentsLen; i += 1) {
            // var ignRe = new RegExp("("+this.ignoreElements+")");
            // if (!ignRe.test(element.nodeName)){
            getImages(contents[i]);
            // }
        }

        // }
        try {
            elNodeType = el.nodeType;
        } catch (ex) {
            elNodeType = false;
            html2canvas.log("html2canvas: failed to access some element's nodeType - Exception: " + ex.message);
        }

        if (elNodeType === 1 || elNodeType === undefined) {

            background_image = html2canvas.Util.getCSS(el, 'backgroundImage');

            if (background_image && background_image !== "1" && background_image !== "none") {

                // TODO add multi image background support

                if (background_image.substring(0, 7) === "-webkit" || background_image.substring(0, 3) === "-o-" || background_image.substring(0, 4) === "-moz") {

                    img = html2canvas.Generate.Gradient(background_image, html2canvas.Util.Bounds(el));

                    if (img !== undefined) {
                        images[background_image] = { img: img, succeeded: true };
                        images.numTotal++;
                        images.numLoaded++;
                        start();

                    }

                } else {
                    src = html2canvas.Util.backgroundImage(background_image.match(/data:image\/.*;base64,/i) ? background_image : background_image.split(",")[0]);
                    methods.loadImage(src);
                }

            }
        }
    }

    methods = {
        loadImage: function (src) {
            var img;
            if (src && images[src] === undefined) {
                if (src.match(/data:image\/.*;base64,/i)) {

                    //Base64 src                  
                    img = new Image();
                    img.src = src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, '');
                    images[src] = { img: img, succeeded: true };
                    images.numTotal++;
                    images.numLoaded++;
                    start();

                } else if (isSameOrigin(src)) {

                    img = new Image();
                    images[src] = { img: img };
                    images.numTotal++;

                    img.onload = function () {
                        images.numLoaded++;
                        images[src].succeeded = true;
                        start();
                    };

                    img.onerror = function () {
                        images.numLoaded++;
                        images.numFailed++;
                        images[src].succeeded = false;
                        start();
                    };

                    img.src = src;

                } else if (options.proxy) {
                    //    console.log('b'+src);
                    img = new Image();
                    images[src] = { img: img };
                    images.numTotal++;
                    proxyGetImage(src, img);
                }
            }

        },
        cleanupDOM: function (cause) {
            var img, src;
            if (!images.cleanupDone) {
                if (cause && typeof cause === "string") {
                    html2canvas.log("html2canvas: Cleanup because: " + cause);
                } else {
                    html2canvas.log("html2canvas: Cleanup after timeout: " + options.timeout + " ms.");
                }

                for (src in images) {
                    if (images.hasOwnProperty(src)) {
                        img = images[src];
                        if (typeof img === "object" && img.callbackname && img.succeeded === undefined) {
                            // cancel proxy image request
                            window[img.callbackname] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
                            try {
                                delete window[img.callbackname];  // for all browser that support this
                            } catch (ex) { }
                            if (img.script && img.script.parentNode) {
                                img.script.setAttribute("src", "about:blank");  // try to cancel running request
                                img.script.parentNode.removeChild(img.script);
                            }
                            images.numLoaded++;
                            images.numFailed++;
                            html2canvas.log("html2canvas: Cleaned up failed img: '" + src + "' Steps: " + images.numLoaded + " / " + images.numTotal);
                        }
                    }
                }

                // cancel any pending requests
                if (window.stop !== undefined) {
                    window.stop();
                } else if (document.execCommand !== undefined) {
                    document.execCommand("Stop", false);
                }
                if (document.close !== undefined) {
                    document.close();
                }
                images.cleanupDone = true;
                if (!(cause && typeof cause === "string")) {
                    start();
                }
            }
        },
        renderingDone: function () {
            if (timeoutTimer) {
                window.clearTimeout(timeoutTimer);
            }
        }

    };

    if (options.timeout > 0) {
        timeoutTimer = window.setTimeout(methods.cleanupDOM, options.timeout);
    }
    var startTime = (new Date()).getTime();
    this.log('html2canvas: Preload starts: finding background-images');
    images.firstRun = true;

    getImages(element);

    this.log('html2canvas: Preload: Finding images');
    // load <img> images
    for (i = 0; i < imgLen; i += 1) {
        methods.loadImage(domImages[i].getAttribute("src"));
    }

    images.firstRun = false;
    this.log('html2canvas: Preload: Done.');
    if (images.numTotal === images.numLoaded) {
        start();
    }

    return methods;

};


/*
html2canvas @VERSION@ <http://html2canvas.hertzen.com>
Copyright (c) 2011 Niklas von Hertzen. All rights reserved.
http://www.twitter.com/niklasvh

Released under MIT License
*/
html2canvas.canvasContext = function (width, height) {
    this.storage = [];
    this.width = width;
    this.height = height;
    //this.zIndex;

    this.fillRect = function () {
        this.storage.push(
        {
            type: "function",
            name: "fillRect",
            'arguments': arguments
        });

    };


    this.drawImage = function () {
        this.storage.push(
        {
            type: "function",
            name: "drawImage",
            'arguments': arguments
        });
    };


    this.fillText = function () {

        this.storage.push(
        {
            type: "function",
            name: "fillText",
            'arguments': arguments
        });
    };


    this.setVariable = function (variable, value) {
        this.storage.push(
            {
                type: "variable",
                name: variable,
                'arguments': value
            });
    };

    return this;

};

/*
html2canvas @VERSION@ <http://html2canvas.hertzen.com>
Copyright (c) 2011 Niklas von Hertzen. All rights reserved.
http://www.twitter.com/niklasvh

Released under MIT License
*/
html2canvas.Renderer = function (parseQueue, opts) {


    var options = {
        "width": null,
        "height": null,
        "renderer": "canvas"
    },
    queue = [],
    canvas,
    doc = document;

    options = html2canvas.Util.Extend(opts, options);



    function sortZ(zStack) {
        var subStacks = [],
        stackValues = [],
        zStackChildren = zStack.children,
        s,
        i,
        stackLen,
        zValue,
        zLen,
        stackChild,
        b,
        subStackLen;


        for (s = 0, zLen = zStackChildren.length; s < zLen; s += 1) {

            stackChild = zStackChildren[s];

            if (stackChild.children && stackChild.children.length > 0) {
                subStacks.push(stackChild);
                stackValues.push(stackChild.zindex);
            } else {
                queue.push(stackChild);
            }

        }

        stackValues.sort(function (a, b) {
            return a - b;
        });

        for (i = 0, stackLen = stackValues.length; i < stackLen; i += 1) {
            zValue = stackValues[i];
            for (b = 0, subStackLen = subStacks.length; b <= subStackLen; b += 1) {

                if (subStacks[b].zindex === zValue) {
                    stackChild = subStacks.splice(b, 1);
                    sortZ(stackChild[0]);
                    break;

                }
            }
        }

    }

    function canvasRenderer(zStack) {

        sortZ(zStack.zIndex);


        var ctx = canvas.getContext("2d"),
        storageContext,
        i,
        queueLen,
        a,
        storageLen,
        renderItem,
        fstyle;

        canvas.width = options.width || zStack.ctx.width;
        canvas.height = options.height || zStack.ctx.height;

        fstyle = ctx.fillStyle;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = fstyle;

        for (i = 0, queueLen = queue.length; i < queueLen; i += 1) {

            storageContext = queue.splice(0, 1)[0];
            storageContext.canvasPosition = storageContext.canvasPosition || {};

            //this.canvasRenderContext(storageContext,parentctx);           

            // set common settings for canvas
            ctx.textBaseline = "bottom";

            if (storageContext.clip) {
                ctx.save();
                ctx.beginPath();
                // console.log(storageContext);
                ctx.rect(storageContext.clip.left, storageContext.clip.top, storageContext.clip.width, storageContext.clip.height);
                ctx.clip();

            }

            if (storageContext.ctx.storage) {

                for (a = 0, storageLen = storageContext.ctx.storage.length; a < storageLen; a += 1) {

                    renderItem = storageContext.ctx.storage[a];



                    switch (renderItem.type) {
                        case "variable":
                            ctx[renderItem.name] = renderItem['arguments'];
                            break;
                        case "function":
                            if (renderItem.name === "fillRect") {

                                ctx.fillRect(
                                    renderItem['arguments'][0],
                                    renderItem['arguments'][1],
                                    renderItem['arguments'][2],
                                    renderItem['arguments'][3]
                                    );
                            } else if (renderItem.name === "fillText") {
                                // console.log(renderItem.arguments[0]);
                                ctx.fillText(renderItem['arguments'][0], renderItem['arguments'][1], renderItem['arguments'][2]);

                            } else if (renderItem.name === "drawImage") {
                                //  console.log(renderItem);
                                // console.log(renderItem.arguments[0].width);    
                                if (renderItem['arguments'][8] > 0 && renderItem['arguments'][7]) {
                                    ctx.drawImage(
                                        renderItem['arguments'][0],
                                        renderItem['arguments'][1],
                                        renderItem['arguments'][2],
                                        renderItem['arguments'][3],
                                        renderItem['arguments'][4],
                                        renderItem['arguments'][5],
                                        renderItem['arguments'][6],
                                        renderItem['arguments'][7],
                                        renderItem['arguments'][8]
                                        );
                                }
                            }


                            break;
                        default:

                    }

                }

            }
            if (storageContext.clip) {
                ctx.restore();
            }




        }
        html2canvas.log("html2canvas: Renderer: Canvas renderer done - returning canvas obj");

        // this.canvasRenderStorage(queue,this.ctx);
        return canvas;
    }

    function svgRenderer(zStack) {
        sortZ(zStack.zIndex);

        var svgNS = "http://www.w3.org/2000/svg",
        svg = doc.createElementNS(svgNS, "svg"),
        xlinkNS = "http://www.w3.org/1999/xlink",
        defs = doc.createElementNS(svgNS, "defs"),
        i,
        a,
        queueLen,
        storageLen,
        storageContext,
        renderItem,
        el,
        settings = {},
        text,
        fontStyle,
        clipId = 0;

        svg.setAttribute("version", "1.1");
        svg.setAttribute("baseProfile", "full");

        svg.setAttribute("viewBox", "0 0 " + Math.max(zStack.ctx.width, options.width) + " " + Math.max(zStack.ctx.height, options.height));
        svg.setAttribute("width", Math.max(zStack.ctx.width, options.width) + "px");
        svg.setAttribute("height", Math.max(zStack.ctx.height, options.height) + "px");
        svg.setAttribute("preserveAspectRatio", "none");
        svg.appendChild(defs);



        for (i = 0, queueLen = queue.length; i < queueLen; i += 1) {

            storageContext = queue.splice(0, 1)[0];
            storageContext.canvasPosition = storageContext.canvasPosition || {};

            //this.canvasRenderContext(storageContext,parentctx);           


            /*
            if (storageContext.clip){
            ctx.save();
            ctx.beginPath();
            // console.log(storageContext);
            ctx.rect(storageContext.clip.left, storageContext.clip.top, storageContext.clip.width, storageContext.clip.height);
            ctx.clip();
        
            }*/

            if (storageContext.ctx.storage) {

                for (a = 0, storageLen = storageContext.ctx.storage.length; a < storageLen; a += 1) {

                    renderItem = storageContext.ctx.storage[a];



                    switch (renderItem.type) {
                        case "variable":
                            settings[renderItem.name] = renderItem['arguments'];
                            break;
                        case "function":
                            if (renderItem.name === "fillRect") {

                                el = doc.createElementNS(svgNS, "rect");
                                el.setAttribute("x", renderItem['arguments'][0]);
                                el.setAttribute("y", renderItem['arguments'][1]);
                                el.setAttribute("width", renderItem['arguments'][2]);
                                el.setAttribute("height", renderItem['arguments'][3]);
                                el.setAttribute("fill", settings.fillStyle);
                                svg.appendChild(el);

                            } else if (renderItem.name === "fillText") {
                                el = doc.createElementNS(svgNS, "text");

                                fontStyle = settings.font.split(" ");

                                el.style.fontVariant = fontStyle.splice(0, 1)[0];
                                el.style.fontWeight = fontStyle.splice(0, 1)[0];
                                el.style.fontStyle = fontStyle.splice(0, 1)[0];
                                el.style.fontSize = fontStyle.splice(0, 1)[0];

                                el.setAttribute("x", renderItem['arguments'][1]);
                                el.setAttribute("y", renderItem['arguments'][2] - (parseInt(el.style.fontSize, 10) + 3));

                                el.setAttribute("fill", settings.fillStyle);




                                // TODO get proper baseline
                                el.style.dominantBaseline = "text-before-edge";
                                el.style.fontFamily = fontStyle.join(" ");

                                text = doc.createTextNode(renderItem['arguments'][0]);
                                el.appendChild(text);


                                svg.appendChild(el);



                            } else if (renderItem.name === "drawImage") {

                                if (renderItem['arguments'][8] > 0 && renderItem['arguments'][7]) {

                                    // TODO check whether even any clipping is necessary for this particular image
                                    el = doc.createElementNS(svgNS, "clipPath");
                                    el.setAttribute("id", "clipId" + clipId);

                                    text = doc.createElementNS(svgNS, "rect");
                                    text.setAttribute("x", renderItem['arguments'][5]);
                                    text.setAttribute("y", renderItem['arguments'][6]);

                                    text.setAttribute("width", renderItem['arguments'][3]);
                                    text.setAttribute("height", renderItem['arguments'][4]);
                                    el.appendChild(text);
                                    defs.appendChild(el);

                                    el = doc.createElementNS(svgNS, "image");
                                    el.setAttributeNS(xlinkNS, "xlink:href", renderItem['arguments'][0].src);
                                    el.setAttribute("width", renderItem['arguments'][0].width);
                                    el.setAttribute("height", renderItem['arguments'][0].height);
                                    el.setAttribute("x", renderItem['arguments'][5] - renderItem['arguments'][1]);
                                    el.setAttribute("y", renderItem['arguments'][6] - renderItem['arguments'][2]);
                                    el.setAttribute("clip-path", "url(#clipId" + clipId + ")");
                                    // el.setAttribute("xlink:href", );


                                    el.setAttribute("preserveAspectRatio", "none");

                                    svg.appendChild(el);


                                    clipId += 1;
                                    /*
                                    ctx.drawImage(
                                    renderItem['arguments'][0],
                                    renderItem['arguments'][1],
                                    renderItem['arguments'][2],
                                    renderItem['arguments'][3],
                                    renderItem['arguments'][4],
                                    renderItem['arguments'][5],
                                    renderItem['arguments'][6],
                                    renderItem['arguments'][7],
                                    renderItem['arguments'][8]
                                    );
                                    */
                                }
                            }



                            break;
                        default:

                    }

                }

            }
            /*
            if (storageContext.clip){
            ctx.restore();
            }
            */



        }

        html2canvas.log("html2canvas: Renderer: SVG Renderer done - returning SVG DOM obj");

        return svg;

    }


    //this.each(this.opts.renderOrder.split(" "),function(i,renderer){

    //options.renderer = "svg";

    switch (options.renderer.toLowerCase()) {
        case "canvas":
            canvas = doc.createElement('canvas');
            if (canvas.getContext) {
                this.log("html2canvas: Renderer: using canvas renderer");
                return canvasRenderer(parseQueue);
            }
            break;
        case "svg":
            if (doc.createElementNS) {
                this.log("html2canvas: Renderer: using SVG renderer");
                return svgRenderer(parseQueue);
            }
            break;

    }



    //});

    return this;



};

/*
* jQuery helper plugin for examples and tests
*/
(function ($) {
    $.fn.html2canvas = function (options) {
        var date = new Date(),
        $message = null,
        timeoutTimer = false,
        timer = date.getTime();
        html2canvas.logging = options && options.logging;
        html2canvas.Preload(this[0], $.extend({
            complete: function (images) {
                var queue = html2canvas.Parse(this[0], images, options),
                $canvas = $(html2canvas.Renderer(queue, options)),
                finishTime = new Date();

                $canvas.css({ position: 'absolute', left: 0, top: 0 }).appendTo(document.body);
                $canvas.siblings().toggle();

                $(window).click(function () {
                    if (!$canvas.is(':visible')) {
                        $canvas.toggle().siblings().toggle();
                        throwMessage("Canvas Render visible");
                    } else {
                        $canvas.siblings().toggle();
                        $canvas.toggle();
                        throwMessage("Canvas Render hidden");
                    }
                });
                throwMessage('Screenshot created in ' + ((finishTime.getTime() - timer) / 1000) + " seconds<br />", 4000);
            }
        }, options));

        function throwMessage(msg, duration) {
            window.clearTimeout(timeoutTimer);
            timeoutTimer = window.setTimeout(function () {
                $message.fadeOut(function () {
                    $message.remove();
                });
            }, duration || 2000);
            if ($message)
                $message.remove();
            $message = $('<div />').html(msg).css({
                margin: 0,
                padding: 10,
                background: "#000",
                opacity: 0.7,
                position: "fixed",
                top: 10,
                right: 10,
                fontFamily: 'Tahoma',
                color: '#fff',
                fontSize: 12,
                borderRadius: 12,
                width: 'auto',
                height: 'auto',
                textAlign: 'center',
                textDecoration: 'none'
            }).hide().fadeIn().appendTo('body');
        }
    };
})(jQuery);

PlanktonViewer = function () {

    var proxyUrl = "http://html2canvas.appspot.com";
    var scriptEnabled = false;
    var viewportOpacity = 0;
    var viewportWidth = 380;
    var viewportHeight = 240;
    var currentX = 0;
    var currentY = 0;
    this.lastState = new Object();

    this.init = function () {
        var self = this;

        this.createDOM();
        $('#content-PlanktonViewer').dblclick(function (e) { self.switchVisibleState(e); });
        $('#getScreenShot-PlanktonViewer').click(function (e) {
            self.loadPage(e);
        });

        $('canvas').live('mousemove', function (e) { self.moveViewport(e); });
    }

    this.createDOM = function () {
        console.log('Creating DOM elements');
        $("body").append('<div id="content-PlanktonViewer"></div><form id="controlForm-PlanktonViewer"><input id="iframeSrc-PlanktonViewer" type="text" value="http://www.cnn.com" /><input id="getScreenShot-PlanktonViewer" type="button" value="Get Screen" /></form>');
        $('#controlForm-PlanktonViewer').css('position', 'fixed').css('top', '0px');
        $('#content-PlanktonViewer').css('position', 'absolute').css('left', '0px').css('top', '0px');
        //$('#loader-PlanktonViewer').css('width', '319px').css('height', '305px').css('display', 'none').css('margin', '0 auto');
        console.log('DOM elements and CSS rules created');
    }

    this.switchVisibleState = function (e) {
        if (e.which == 1) $('#content-PlanktonViewer').toggle();
    }

    this.moveViewport = function (e) {
        var context = $('canvas').get(0).getContext('2d');
        currentX = e.layerX - viewportWidth / 2 - e.currentTarget.offsetLeft;
        currentY = e.layerY - viewportHeight / 2 - e.currentTarget.offsetTop;
        var j = 1;
        for (i = 0; i < this.lastState.data.width * this.lastState.data.height * 4; i++) {
            if (j == 4) {
                this.lastState.data.data[i] = 255;
                j = 1;
            } else j++;
        }

        context.putImageData(this.lastState.data, this.lastState.x, this.lastState.y)
        this.drawViewport(currentX, currentY, viewportWidth, viewportHeight);
    }

    this.drawViewport = function (x, y, w, h) {
        var context = $('canvas').get(0).getContext('2d');
        context.globalAlpha = 1;
        context.globalCompositeOperation = 'source-over';
        var myImageData = context.getImageData(x, y, w, h);
        this.lastState.data = myImageData;
        this.lastState.x = x;
        this.lastState.y = y;
        var j = 1;
        for (i = 0; i < w * h * 4; i++) {
            if (j == 4) {
                myImageData.data[i] = viewportOpacity;
                j = 1;
            } else j++;
        }
        context.putImageData(myImageData, x, y);

    }

    this.loadPage = function (e) {

        console.log('Page Loading Started');
        $(e.currentTarget).attr('disabled', 'true');
        // $('#loader-PlanktonViewer').toggle();
        var url = $('#iframeSrc-PlanktonViewer').val();
        var urlParts = document.createElement('a');
        var self = this;
        urlParts.href = url;

        $.ajax({
            data: {
                xhr2: false,
                url: urlParts.href

            },
            url: proxyUrl,
            dataType: "jsonp",
            error: function (xhr) {
                console.log('AJAX error text: ' + xhr.responseText);
                console.log('AJAX error state:' + xhr.readyState);
                console.log('AJAX status: ' + xhr.status);
                console.log('AJAX error status text: ' + xhr.statusText);
                console.log('AJAX error XML response: ' + xhr.responseXML);
            },
            complete: function (request, exception, errorText) {
                console.log('Exception: ' + exception);
            },
            success: function (html) {
                console.log('Proxy return answer OK')
                iframe = document.createElement('iframe');
                $(iframe).attr('id', 'fakePage-PlanktonViewer');
                $(iframe).css({
                    'visibility': 'hidden'
                }).width($(window).width()).height($(window).height());
                $('#content-PlanktonViewer').append(iframe);
                d = iframe.contentWindow.document;
                console.log('Open IFrame')
                d.open();
                console.log('IFrame opened')
                $(iframe.contentWindow).load(function () {

                    var date = new Date();
                    var message,
                                timeoutTimer,
                                timer = date.getTime();
                    var body = $(iframe).contents().find('body')[0];
                    var preload = html2canvas.Preload(body, {
                        "complete": function (images) {
                            console.log('Preload images completed')
                            var queue = html2canvas.Parse(body, images);
                            console.log('Parse completed')

                            var canvas = $(html2canvas.Renderer(queue));
                            var finishTime = new Date();
                            $(e.currentTarget).removeAttr('disabled');
                            $("#content-PlanktonViewer").empty().append(canvas);
                            self.drawViewport(0, 0, viewportWidth, viewportHeight);
                            //  $('#loader-PlanktonViewer').toggle();
                        },
                        timeout: 10000,
                        logging: true
                    });
                });

                $('base').attr('href', urlParts.protocol + "//" + urlParts.hostname + "/");
                var base = "<base href='" + urlParts.protocol + "//" + urlParts.hostname + "/' />";
                var headIdx = html.indexOf('<head');
                var endHeadIdx = html.indexOf('>', headIdx);
                html = html.substring(0, endHeadIdx + 1) + base + html.substring(endHeadIdx + 1);
                if (!scriptEnabled) {
                    html = html.replace(/\<script/gi, "<!--<script");
                    html = html.replace(/\<\/script\>/gi, "<\/script>-->");
                }
                d.write(html);

                d.close();
            }
        });
    }

    this.init();
}

$(window).load(function () {
    if (parent.location.href != self.location.href) {
        console.log('IFrame detected. Stop loading App');
        return
    } else {
        console.log('Loading App...');
        var PlanktonViewerApp = new PlanktonViewer();
    }
})