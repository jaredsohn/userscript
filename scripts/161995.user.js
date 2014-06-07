// ==UserScript==
// @name            4chan imgur thumbnail
// @version         0.9.2
// @namespace       anon.4chan.org
// @description     Scans for 4chan posts that contain a specific link but no file and embeds an image as a thumbnail. Supports Imgur, 4chan, YouTube and Derpibooru links as well as direct image links (jpg, png, gif).
// @include         http*://boards.4chan.org/*
// @grant           GM_xmlhttpRequest
// @updateURL       https://bitbucket.org/murkeli/userscripts/raw/master/4chanimgur.user.js
// @downloadURL     https://bitbucket.org/murkeli/userscripts/raw/master/4chanimgur.user.js
// ==/UserScript==

(function() {

    var namespace = '4chanimgur.';
    var version = '0.9.1';
    var home = 'https://userscripts.org/scripts/show/161995';
    var d = document;

    var $ = function(selector, context, forceArray) {
        if ($.null(context)) {
            context = d.body;
        }
        if ($.null(context.querySelectorAll)) return null;
        var nodes = context.querySelectorAll(selector);
        if (!forceArray) {
            if (nodes.length == 1) {
                return nodes[0];
            } else if (nodes.length == 0) {
                return null;
            }
        }
        return nodes;
    };

    $.extend = function(object, properties) {
        var key, val;
        for (key in properties) {
            val = properties[key];
            object[key] = val;
        }
    };

    $.extend($, {
        null: function(value) {
            return (value === undefined || value === null);
        },
        notnull: function(value) {
            return !$.null(value);
        },
        json: function(url, data, callback) {
            if (typeof GM_xmlhttpRequest != 'function') {
                return false;
            }
            GM_xmlhttpRequest({
                method:	'GET',
                url:	url,
                onload:	function(req) {
                    try {
                        var info = JSON.parse(req.responseText);
                        callback.call(self, data, info);
                    } catch(ex) {
                        console.log('JSON data from ' + url + ' could not be parsed: ' + ex + '\nHTTP: ' + req.status + '\nResponse: ' + req.responseText);
                    }
                },
                onerror: function() {
                    console.log('Request to ' + url + ' failed.');
                }
            });
        },
        on: function(elem, events, handler) {
            var arr = events.split(' ');
            for (var i = 0, c = arr.length; i < c; i++) {
                elem.addEventListener(arr[i], handler, false);
            }
        },
        off: function(elem, events, handler) {
            var arr = events.split(' ');
            for (var i = 0, c = arr.length; i < c; i++) {
                elem.removeEventListener(arr[i], handler, false);
            }
        },
        sibling: function(n, elem) {
            var r = [];
            for ( ; n; n = n.nextSibling ) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            return r;
        },
        siblings: function(elem) {
            return this.sibling((elem.parentNode || {}).firstChild, elem);
        },
        each: function(list, callback) {
            if ($.null(list)) return;
            for (var i = 0, c = list.length; i < c; i++) {
                if (callback.call(list[i], list[i], i) === false) {
                    break;
                }
            }
        },
        attr: function(elem, attr, value) {
            if (!elem.getAttribute) return '';
            if (!value) {
                return elem.getAttribute(attr);
            } else {
                return elem.setAttribute(attr, value);
            }
        },
        data: function(elem, key, value) {
            if ($.null(value)) {
                return elem.getAttribute('data-' + key);
            } else {
                return elem.setAttribute('data-' + key, value);
            }
        },
        strip: function(elem) {
            if (elem.innerHTML) {
                return elem.innerHTML.replace(/<wbr>/g, '').replace(/&amp;/g, '&').replace(/<br>/g, ' ');
            }
            return '';
        },
        nodes: function(nodes) {
            var frag, node, _i, _len;
            if (!(nodes instanceof Array)) {
                return nodes;
            }
            frag = d.createDocumentFragment();
            for (_i = 0, _len = nodes.length; _i < _len; _i++) {
                node = nodes[_i];
                frag.appendChild(node);
            }
            return frag;
        },
        append: function(parent, elem) {
            return parent.appendChild($.nodes(elem));
        },
        prepend: function(parent, children) {
            return parent.insertBefore($.nodes(children), parent.firstChild);
        },
        after: function(root, elem) {
            return root.parentNode.insertBefore($.nodes(elem), root.nextSibling);
        },
        before: function(root, elem) {
            return root.parentNode.insertBefore($.nodes(elem), root);
        },
        remove: function(elem) {
            return elem.parentNode.removeChild($.nodes(elem));
        },
        replace: function(root, elem) {
            return root.parentNode.replaceChild($.nodes(elem), root);
        },
        create: function(tag, properties) {
            var elem = d.createElement(tag);
            if (properties) {
                $.extend(elem, properties);
            }
            return elem;
        },
        tn: function(text) {
            return d.createTextNode(text);
        },
        id: function(id) {
            return d.getElementById(id);
        },
        hasClass: function(elem, className) {
            return (' ' + elem.className + ' ').replace(/[\n\t]/g, ' ').indexOf(className) > -1;
        },
        addClass: function(elem, className) {
            return elem.classList.add(className);
        },
        rmClass: function(elem, className) {
            return elem.classList.remove(className);
        },
        addStyle: function(css) {
            var style = $.create('style', {
                type: 'text/css',
                textContent: css
            });
            var f = function() {
                var root;
                if (root = d.head || d.documentElement) {
                    return $.append(root, style);
                } else {
                    return setTimeout(f, 20);
                }
            };
            f();
            return style;
        },
        inArray: function(arr, obj) {
            return arr.indexOf(obj) > -1;
        },
    });
    
    var Hover = {
        limit: 20,
        elapsed: function() {
            var now = Date.now();
            if (!Hover.lastTimestamp || now - Hover.lastTimestamp >= Hover.limit) {
                Hover.lastTimestamp = now;
                return true;
            }
            return false;
        },
        image: {
            set: function(img) {
                var img = $('#imgur-thumbnail-hover');
                if ($.null(img)) {
                    img = $.create('img', { id: 'imgur-thumbnail-hover' });
                    $.append(d.body, img);
                }
                img.style.display = 'block';
                img.src = $.data(this, 'image-url');
            },
            update: function(e) {
                if (!Hover.elapsed()) return;
                var img = $('#imgur-thumbnail-hover');
                if ($.notnull(img)) {
                    var style = img.style;
                    var clientX, clientY, top, height;
                    height = img.offsetHeight;
                    clientX = e.clientX, clientY = e.clientY;
                    _ref = d.documentElement, clientHeight = _ref.clientHeight, clientWidth = _ref.clientWidth;
                    top = clientY - 120;
                    style.top = clientHeight <= height || top <= 0 ? '0px' : top + height >= clientHeight ? clientHeight - height + 'px' : top + 'px';
                    if (clientX <= clientWidth - 400) {
                        style.left = clientX + 45 + 'px';
                        style.right = null;
                    } else {
                        style.left = null;
                        style.right = clientWidth - clientX + 45 + 'px';
                    }
                }
            },
            hide: function() {
                var img = $('#imgur-thumbnail-hover');
                if ($.notnull(img)) {
                    img.style.display = 'none';
                    img.src = '';
                }
            },
        },
        init: function(img) {
            var processor = $.data(img, 'processor');
            if (Config.get([processor, 'hoverExpand'], Options.processors[processor]['hoverExpand'][0]) === true) {
                $.on(img, 'mouseover', Hover.image.set);
                $.on(img, 'mousemove', Hover.image.update);
                $.on(img, 'mouseout', Hover.image.hide);
            }
        },
        suspend: function(img) {
            $.off(img, 'mouseover', Hover.image.set);
            $.off(img, 'mousemove', Hover.image.update);
            $.off(img, 'mouseout', Hover.image.hide);
            Hover.image.hide();
        },
    };
    
    var Resources = {
        placeholderThumb: 'data:image/png;base64,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',
        loadingThumb: 'data:image/gif;base64,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',
        errorThumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAMAAAC4XpwXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF/3p7l4qKlhoahxoa7+7uxMTEZgEB/6e2/ikp/mBgtKKi/3Nz6+vr/42U2+bn5VdXaUFBpCcnxkxMmCUmzNPTyCQk/4KEtxUVpJmZ6YWFxaWljImJ5NjYq2ho19fXrays0tLS/zAwsbGx8yMjuTIyeiQkxRUV+OfnrqmpiiMjjIWFdklJ/VpaygcH/VNTZT09tn19+fj41SQkrKOj5zg40bu711NT5Hd3YUdHnJyc4uzs18bGmVJSrgcHXDU24xsb5EpK/5OT+UpKmGVl+SQkWAIC/4iI09vc1qeneRsb81tb/4WPvElJk0dHrlNT/6yu0EFB04CAwz096R4e/pqb/m1t89XV20RE5ubm3BgY1AkJ8vLy0hUVzDIy+f//sSsr0EpKy5mZgwEBhoSEyFpa2mho/52iiwMDqhMTvSIi9FRUhn5+kwIC4aur/paaoh0d/2pq2RISvCkpwzU1qEVF2Do6bBoa7CIikwgIxpycfAICycXF/6Gm5GNjcgEB/5Gg7GFh4sTEwcHCSgEBnAsLs25uztzc19ra4uTkugICrE1NaygozXR0zc3NclhYYFlZrR0d4Corw9HRsiIiusXG4xIS2d/ftbW14uLiqqiowYiIoRER2ExM/zg4tLOz/f39VyQkPAgIXRAQ/36B92Fh7tHRrzo61BwczMvL3yEhu2xs7PHx8pma1HR0kpOTbA0N6W1t9HFx0dbWmAUFhA0Ns2Fh5MzM0n5+upWV2XV1cj8/oU5OSRsb2n9/+vj4SCoqyb6+x5WV39XVhzw88vX1eQ4OvLq7xK6vsr29Rjg4/v7+jkFB4eHhv7+/////9PT0yMjIurq63NzctLS03Nvb/f///v//1dTUvbu8xMnK6c7Osre3//7++vv7xMfH1tbW5N/f9/z8xLW1wb+/+fn5+/z8/3Bw+Hl5/3Z38mpr/mdnjhAQr11dr66vmHBw//39jGhoim9wyTg4xsTF5g8PtLW1fnl67TU137+//6Swr7Cw5XBxvjAw+Pf3+W9v8SAgfetMUwAACIFJREFUeNrsmAtcU9cdx4EkFCUKAWKAQIhBaIM8ilow8hak1clEkIcUC4MKBMEQRMCsZlYBeQjloVwpLipSBPugRW2rVq1tme0tBAJrbWt1rUupg7LPps2wyubOufcmkI5ScLlx+/T+PnzCufeec77nf8/rd64J8jBlQtEpOkWn6BSdov9v0QUuSx/TU5OLwGj0waVv77h06Tc6Xbq04+2lCiPRBfYvvvLchq0ZGRnPQWVkbMhY98qL9gKj0AX2JxzWrfvhh0cIrcPkcOJB8LOmK+xLHbaGzZs373eEtm4NCwvbsMHB2V5BOn3UtNQ/LPLYsQULfkUoEmhBZFiYf6npKLl0zWOm392LNLG8aWJyDLQAtIEQuAh7/TvTJlLpo6aV/guG8uKGLG8CmYBGaAWuIu9VmrqQSFd4BG62zJszJ2/Yc3hoKG5oaMgSU9zwkGVc3M1vN5/zUJBGH/UI9HujNdtzTnZCTGp23jBQHlDcmtS1h1rjhlv/9a1foMcoOXSNi+n7Nn+xys7O9k4oCD+Xmj2HkGfqufDKQ62ta3btesPmfa4LKXTFlqq1Vlahodkr2ZWOzIDTYm9vT29PT0/v/NMBTMfKTWvWWFnt3LnWLV1BAn00fXHbodCEhNDt7IIddOXXT5weX+YNtGz89BNff0kH+AQrPz8rv7bF6S6Gp4tqog5F39q+fdmmSke6Uql8JsB529jKlWPbnAOeAZdPO/46JjQhNdXPr6BGpDE4nVtTEDM+vu0W28bxghLq8FfODWNj+c5fHcYuL1x+dlN0dEyMTdtiruFj5y62bUtZND4ufvYlJa5v3juRlXXivW+Iy5c2s2/F3IqJYZFCtxayWKyUlIaY8/EETxlQWhrwCZ78Mv58dP628UWLFknOkkE/KxQKbW1ZrKzaffH4y1ZeYzKvaeFnxJz8/BQgcujWQjc32ACJRLL+UeWnh4FQIPj/U+Wj58VicUNDA0vCIonuVlVVCPlmzay3AN7X11d97Zra1/efnwB4PofTUCuRCG2FZiTQB7nWhe8cKSxcTaOZmZ1seCve94OnCX1wIf68OKi2tlZiZkajudHIiN0D0N9pIfAlzfvefJlOZ2J/L7+5jwPgkmYIX11IO+th8Pmu8bBuOXr0aEtLZ2f3qZHikyOPlzOZiUDg9/GRkubm5pGRkVPdnS0t3aT0uw+g79mzZ5W5uVwmkwVeZh4s7zl4sKe8PPHGuVOZxcWZaTK5+apVezqtPTRk0CF7FaCby7sD311R/kdC5SveDTwlS5MBOE4nZcx34mS5XCYP7G9svML7Eybelcae3wbK0kDocsA3J4OuAXSIlgGMPOpyI4/P57dfmT+/qx0k9j55OQrch+HL5d2kxO7TKYNo0L0fz32yq7q9vd9ur5PTXrv+9vbqrrK5H8vScjJBC9K6fciIfXlnJlTOSNRcO7vbt28zrjfeWb/+TuN1Brjg18+NGskBQy8zh5zYl7udBNUX5xTc+Px67+7dn+0uc3o1KOhVpzKQ3P3n65/fKICPi0/SlnMNP+ZFL1SZlRSXlOS0PTW/XvGZYn+Z0xlORYX7Gaey/Yo/KOrnP9WW01xSUmJW9YLI8LG7pC8vBGtKc0mWTS5//90P7Z73d69w96o47v+83Yd39/NzbThBWVlZZoU+6aOGj10j2HLRrTYrixMUFJ3bdbX+zr0kL2lycrJX0ut36q925SZUVHA4HInbxfRBUvy8C/fiajEguHul5q74YqdUmrwRSCqV7vxiRW6ClzuQmBbMddGQQtcI0oNp7OPu7l7JoQ67OpI2hmA6kNSxyyFUmpScfJxNC04n6TSBWfpgW3bI8SVSacj30lidDnwfckDasTGEbRu8hbyTFDxLHbGtC+noCAmJLSq6P6HY2KLY2CWsIx6zPEPP8vzexA2m1bkWFRW5urpG6OR6/75rRJ1ZMJfcEzSC3OVa0+osIiIsIiwmK8KijmbNJfnrARx7r/nY1i20WKgni4V1tj6vDSLk0wWij4RjC3+vr2XCj0TG+GqEIAJRjVtKQ4OYzV6CiS0WjwtrRMb5YoYgV0X/+PvfwsOdtQoP/+sWkQYxEh0ZFDRB6b6TNjUJBhGj0akv5BSdolN0ik7R/6/ovSiK9vSDH/4U2XpQtA9L8EGG/umrhBXxfuIZqAc1KB0WMyQdpgaYqBpQ+H0oqubh9GoUTVThdNUAzNw7ic5g6pg4XdWjzcIDCXo1goDyPTOkQ/VhBbG6eohbPJzehz9XgWKQCij4Y+YEHc+iViGJ+KN+FVHFTOg8GB2iBglQmo7RVTo6iALtVeOx4nSQW80ACYaWDrMwYBYGkRiACVjZjOg8gsfHuhz70dHhs94+or+xNw9q7eslxoyuOJalf3KC3zMLOlYf1tz/pKPoZDpzejqInTl7OhgydPS/oyOIiqdGf5aOTEGHvaeemt6rN+OmoQ/gdTwAXa2dJFPQmTOLHQ42OG8fgK4r8OB07aj7OToINBGbKHp0npb+oxnHAANigCiGvd6fmHEQyoD06WecdmlhInpvXtfvmKrx1YaOLyVY3/dph5TeaqNSE6sNAyX6ffrVBiyFxGo5Qe9Xo0weQadXw2AnrbSJDLwUrBqphg0aUE2sdYxEIgsoz2NiWaZbaSl3QdEpOkWf0g7+oug6X10NF3Em2seYMLwq6H9xIzvJ6xo8du1eAzcW+oThHdAa3slelxS6Gm5VAzw9w8uE2512W9V6XVLomMfgw50O0RlerbXg6XldI9Axt6BHR1Hj0HWG96HQdYZX/82TNt/16TrDC+kMHZ1pvH7HbutmnJHpuOFVgbEHu4Gv53XJf/N4v2tPA3w9r0syXWd44ZKDHVn0vK6xdlhios18gTXs/o4dUgd6kYdDp5wVRafoFJ2iU3SK/iP9W4ABALeyhvlMe5fjAAAAAElFTkSuQmCC',
        externalImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAahJREFUeNpUks9LFVEUxz933sy8nok/HolGpGIgIghCO3XpJty4ENwUImTLaCEh7foDFNqJiJBb2whi6FoUJAoR1FoomlhI8ohX+qZ5b27fmWcNXvie++t8zz3ne67h2TaQFzoEI/DQGNat1apCOuIrh4IbW7i4PmmHyPF9l/z8OHQ2Q/matPcNJhbx3Oo2I/wQAvFatoKg4d30mhl5/wJa6qoet7MyljAmjBFGWaxecH6CdxlR7vGKJZ/fQZrRVVidXbHmultr/PpchlLZ8unzXbrbfVYVvU2lfS3ISVnXZv8RIvvr7XhbvudeLaOzULrPf+dTOQ9OQ9aHV4+UeAaT1HBL9vUKLG/B/kwaeegNfDkJV3C90pMFRqLqY4qq/J4OQJdEmlyCnVNFFnH3UDXldpdwC6NSq19SDyaEQNJ13IG1STiQfL1T8KBJDek6k65/ajDfI4zdlOt2Qsh5yURrI2y8hKlh1fEcGnJSrhJLXhSOEl1d9cv7eHJJWLEJydf94z74cAznxSjuq5P2KVbJMecTi8ch1t78BvHW0cJzrtLmXvBXgAEAaJaDi8YtYjEAAAAASUVORK5CYII=',
    };
        
    var Thumb = function(props) {
        var self = this;
        
        $.extend(self, props);
                
        self.buildFile = function(fileId) {
            var container = $.create('div', { id: fileId, className: 'file imgur-container' });
            var div = $.create('div', { className: 'fileInfo' });
            var span = $.create('span', { className: 'fileText', innerHTML: 'Link: ' });
            var fia = $.create('a', { target: '_BLANK', href: self.link, innerHTML: self.name + ' ' });
            var extImg = $.create('img', { src: Resources.externalImage });
            var fa = $.create('a', { target: '_BLANK', href: self.link, className: 'fileThumb' });
            var img = $.create('img', { className: 'imgur-image thumb' });
            $.data(img, 'processor', self.processor);
            $.data(img, 'thumb-url', self.thumbUrl);
            $.data(img, 'image-url', self.imageUrl);
            $.append(fia, extImg);
            $.append(span, fia);
            $.append(div, span);
            $.append(container, div);
            $.append(fa, img);
            $.append(container, fa);
            return container;
        };
        
        self.initInlineExpand = function(img) {
            if (Config.get([self.processor, 'inlineExpand'], Options.processors[self.processor]['inlineExpand'][0]) === false) return;
            $.on(img, 'click', function(e) {
                e.preventDefault();
                if ($.hasClass(img, 'thumb')) {
                    $.rmClass(img, 'thumb');
                    img.src = self.imageUrl;
                    Hover.suspend(img);
                } else {
                    $.addClass(img, 'thumb');
                    img.src = self.thumbUrl;
                    Hover.init(img);
                }
            });
        };
        
        self.loadImage = function(img) {
            img.src = Resources.loadingThumb;
            var image = new Image();
            image.onload = function() {
                img.src = self.thumbUrl;
                Hover.init(img);
                self.initInlineExpand(img);
            };
            image.onerror = function() {
                console.log("Could not load image: " + self.imageUrl);
                img.src = Resources.errorThumb;
            };
            image.src = self.thumbUrl;
        };
        
        self.placehold = function(post, file) {
            var fileId = 'f' + (/m(\d+)/.exec(post.id))[1];
            var file = file || self.buildFile(fileId);
            var img = $('img.imgur-image', file)
            img.src = Resources.placeholderThumb;
            var handler = function(e) {
                e.preventDefault();
                Thumb.preloaded.push(fileId);
                $.off(img, 'click', handler);
                self.loadImage(img);
            };
            $.on(img, 'click', handler);
            $.before(post, file);
        };
        
        self.plant = function(post, file) {
            var fileId = 'f' + (/m(\d+)/.exec(post.id))[1];
            if (Config.get([self.processor, 'preload'], Options.processors[self.processor]['preload'][0]) === false
                && !Thumb.isPreloaded(fileId)) {
                    return self.placehold(post, file);
            }
            var file = file || self.buildFile(fileId);
            var img = $('img.imgur-image', file)
            $.before(post, file);
            self.loadImage(img);
        };
    };
    
    $.extend(Thumb, {
        preloaded: [],
        isPreloaded: function(id) {
            return $.inArray(Thumb.preloaded, id);
        },
    });

    var Main = {
        processors: [],
        getFile: function(post) {
            var siblings = $.siblings(post);
            var res;
            $.each(siblings, function(sibling) {
                if ($.hasClass(sibling, 'file')) {
                    res = sibling;
                    return false;
                }
            });
            return res;
        },
        qualify: function(post, qualifier) {
            return post.innerHTML.toLowerCase().indexOf(qualifier.toLowerCase()) >= 0;
        },
        sortProcessors: function() {
            Main.processors.sort(function(a, b) {
                if (a.priority < b.priority)
                    return -1;
                else if (a.priority > b.priority)
                    return 1;
                return 0;
            });
        },
        attach: function(processor) {
            var exists = false;
            $.each(Main.processors, function(proc) {
                if (proc.name == processor.name) {
                    exists = true;
                    return false;
                }
            });
            if (!exists) {
                //console.log("attaching " + processor.name);
                Main.processors.push(new processor);
                Main.sortProcessors();
            }
        },
        detach: function(type) {
            $.each(Main.processors, function(proc, index) {
                if (proc.name == type) {
                    //console.log("detaching " + type);
                    Main.processors.splice(index, 1);
                    Main.sortProcessors();
                    return false;
                }
            });
        },
        process: function(target) {
            if (Main.processors.length == 0) return;
            var posts = $('blockquote', target, true);
            $.each(posts, function(post) {
                var file = Main.getFile(post);
                if ($.null(file)) {
                    $.each(Main.processors, function(processor) {
                        if (Main.qualify(post, processor.qualifier)) {
                            return !processor.process(post);
                        }
                    });
                } else if ($.hasClass(file, 'imgur-container')) {
                    var img = $('img.imgur-image', file);
                    var thumb = new Thumb({
                        processor: $.data(img, 'processor'),
                        thumbUrl: $.data(img, 'thumb-url'),
                        imageUrl: $.data(img, 'image-url'),
                    });
                    thumb.plant(post, file);
                }
            });
        },
        init: function() {
            Main.process(d.body);
            
            $.on(d, 'DOMNodeInserted', function(e) {
                Main.process(e.target);
            });
        },
    };
    
    var Processors = {
        'Imgur': function() {
            var self = this;
            
            self.priority = 1;
            self.name = 'Imgur';
            self.regex = /((?:i\.)?imgur.com\/)(\w{4,7})(\.?(?:jpg|png|gif))?/i;
            self.qualifier = 'imgur.com/';
            self.imageBase = 'http://i.imgur.com/';
            
            self.process = function(post) {
                self.regex.lastIndex = 0;
                var match = self.regex.exec($.strip(post));
                if (match && $.notnull(match[2])) {
                    var base = match[1];
                    var filename = match[2];
                    var extension = '';
                    if (match.length >= 3 && $.notnull(match[3])) {
                        extension = match[3];
                    }
                    var name = base + filename + extension;
                    var link = '//' + base + filename + extension;
                    var imageUrl = self.imageBase + filename + (extension.length > 0 ? extension : '.jpg');
                    var thumbUrl;
                    var tinyThumb = Config.get([self.name, 'tinyThumb'], Options.processors[self.name]['tinyThumb'][0]);
                    var autoGif = Config.get([self.name, 'autoGif'], Options.processors[self.name]['autoGif'][0]);
                    if (!tinyThumb && autoGif && extension == '.gif') {
                        thumbUrl = self.imageBase + filename + extension;
                    } else {
                        thumbUrl = self.imageBase + filename + (tinyThumb ? 's.jpg' : 'm.jpg');
                    }
                    var thumb = new Thumb({
                        processor: self.name,
                        name: name,
                        link: link,
                        imageUrl: imageUrl,
                        thumbUrl: thumbUrl
                    });
                    thumb.plant(post);
                    return true;
                }
                return false;
            };
        },
        'Fourchan': function() {
            var self = this;
            
            self.priority = 2;
            self.name = 'Fourchan';
            self.regex = /images\.4chan\.org\/(a|b|c|d|e|f|g|gif|h|hr|k|m|o|p|r|s|t|u|v|vg|w|wg|i|ic|r9k|cm|hm|y|3|adv|an|cgl|ck|co|diy|fa|fit|hc|int|jp|lit|mlp|mu|n|po|pol|sci|soc|sp|tg|toy|trv|tv|vp|wsg|x|rs|q|asp|gd|lgbt|out|vr)\/src\/(\d+?)\.(?:jpg|png|gif)/i;
            self.qualifier = 'images.4chan.org';
            self.url = 'http://thumbs.4chan.org/{board}/thumb/{stamp}s.jpg';
            
            self.process = function(post) {
                self.regex.lastIndex = 0;
                var match = self.regex.exec($.strip(post));
                if (match && $.notnull(match[1]) && $.notnull(match[2])) {
                    var name = match[0];
                    var board = match[1];
                    var stamp = match[2];
                    var link = '//' + name;
                    var thumbUrl = self.url.replace('{board}', board).replace('{stamp}', stamp);
                    var thumb = new Thumb({
                        processor: self.name,
                        name: name,
                        link: link,
                        imageUrl: link,
                        thumbUrl: thumbUrl
                    });
                    thumb.plant(post);
                    return true;
                }
                return false;
            };
        },
        'YouTube': function() {
            var self = this;
            
            self.priority = 3;
            self.name = 'YouTube';
            //self.regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
            self.regex = /(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)(?![?=&+%\w]*(?:['"][^<>]*>|<\/a>))[?=&#+%\w-]*/i;
            self.qualifier = 'youtu';
            self.url = '//i.ytimg.com/vi/{id}/0.jpg';
            
            self.process = function(post) {
                self.regex.lastIndex = 0;
                var match = self.regex.exec($.strip(post));
                if (match && $.notnull(match[1])) {
                    var id = match[1];
                    var name = match[0];
                    var link = '//' + match[0];
                    var imageUrl = self.url.replace('{id}', id);
                    var thumb = new Thumb({
                        processor: self.name,
                        name: name,
                        link: link,
                        imageUrl: imageUrl,
                        thumbUrl: imageUrl
                    });
                    thumb.plant(post);
                    return true;
                }
                return false;
            };
        },
        'Derpibooru': function() {
            var self = this;
            
            self.priority = 5;
            self.name = 'Derpibooru';
            self.regex = /(derpiboo(?:\.ru|ru\.org)\/)(\d+)/i;
            self.qualifier = 'derpiboo';
            self.cache = {};
            
            self.processJSON = function(data, info) {
                if ($.notnull(info)) {
                    self.cache[data.id] = info;
                } else {
                    info = self.cache[data.id];
                }
                var name = data.base + info.id_number;
                var link = data.url;
                var thumb = new Thumb({
                    processor: self.name,
                    name: name,
                    link: link,
                    imageUrl: info.image,
                    thumbUrl: info.image
                });
                thumb.plant(data.post);
            };
            
            self.process = function(post) {
                self.regex.lastIndex = 0;
                var match = self.regex.exec($.strip(post));
                if (match && $.notnull(match[1]) && $.notnull(match[2])) {
                    var data = {
                        post: post,
                        base: match[1],
                        id: match[2],
                    };
                    data.url = '//' + data.base + data.id;
                    if (self.cache[data.id]) {
                        self.processJSON(data);
                    } else {
                        $.json(data.url + '.json', data, self.processJSON);
                    }
                    return true;
                }
                return false;
            };
        },
        'Generic': function() {
            var self = this;
            
            self.priority = 10;
            self.name = 'Generic';
            //self.regex = /https?:\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|]?(?:\.(?:jpe?g|png|gif))/i;
            self.regex = /https?:\/\/([\-A-Z0-9.]+)\/[\-A-Z0-9+&@#\/%=~_|]+\.(?:jpe?g|png|gif)/i;
            self.qualifier = 'http';
            
            self.isAllowedDomain = function(domain) {
                var disallowed = Config.get([self.name, 'disallowedDomains'], Options.processors[self.name]['disallowedDomains'][0]).split(',');
                for (var i = 0, c = disallowed.length; i < c; i++) {
                    var dom = disallowed[i].trim();
                    if (dom.length > 0 && domain.indexOf(dom) > -1) return false;
                }
                if (!Config.get([self.name, 'whitelistOnly'], Options.processors[self.name]['whitelistOnly'][0])) {
                    return true;
                }
                var allowed = Config.get([self.name, 'allowedDomains'], Options.processors[self.name]['allowedDomains'][0]).split(',');
                for (var i = 0, c = allowed.length; i < c; i++) {
                    var dom = allowed[i].trim();
                    if (dom.length > 0 && domain.indexOf(dom) > -1) return true;
                }
                return false;
            };
            
            self.process = function(post) {
                self.regex.lastIndex = 0;
                var match = self.regex.exec($.strip(post));
                if (match && $.notnull(match[0])) {
                    var imageUrl = match[0];
                    var domain = match[1];
                    if (self.isAllowedDomain(domain)) {
                        var thumb = new Thumb({
                            processor: self.name,
                            name: imageUrl,
                            link: imageUrl,
                            imageUrl: imageUrl,
                            thumbUrl: imageUrl
                        });
                        thumb.plant(post);
                        return true;
                    }
                }
                return false;
            };
        },
    };
    
    var Options = {
        processors: {
            'Imgur': {
                enabled: [true, 'Enabled', 'Enable imgur.com link thumbnails'],
                preload: [true, 'Auto-Load', 'Load thumbnail automatically instead of waiting for user action'],
                inlineExpand: [true, 'Inline Expand', 'Click the thumbnail to switch to the full image'],
                hoverExpand: [true, 'Hover Expand', 'Hover the thumbnail to show the full image'],
                autoGif: [true, 'Auto-Gif', 'Use animated gifs instead of non-animated thumbnails'],
                tinyThumb: [false, 'Tiny Thumb', 'Use smallest available thumbnail <span class="info">(overrides auto-gif)</span>'],
            },
            'Fourchan': {
                enabled: [true, 'Enabled', 'Enable 4chan link thumbnails'],
                preload: [true, 'Auto-Load', 'Load thumbnail automatically instead of waiting for user action'],
                inlineExpand: [true, 'Inline Expand', 'Click the thumbnail to switch to the full image'],
                hoverExpand: [true, 'Hover Expand', 'Hover the thumbnail to show the full image'],
            },
            'YouTube': {
                enabled: [true, 'Enabled', 'Enable YouTube link thumbnails'],
                preload: [true, 'Auto-Load', 'Load thumbnail automatically instead of waiting for user action'],
                inlineExpand: [false, 'Inline Expand', 'Click the thumbnail to switch to the full image'],
                hoverExpand: [true, 'Hover Expand', 'Hover the thumbnail to show the full image'],
            },
            'Derpibooru': {
                enabled: [true, 'Enabled', 'Enable <a target="_BLANK" href="//derpibooru.org">derpibooru.org</a> link thumbnails <span class="info warning">(probably doesn\'t work on Opera)</span>'],
                preload: [false, 'Auto-Load', 'Load thumbnail automatically instead of waiting for user action'],
                inlineExpand: [true, 'Inline Expand', 'Click the thumbnail to switch to the full image'],
                hoverExpand: [true, 'Hover Expand', 'Hover the thumbnail to show the full image'],
            },
            'Generic': {
                enabled: [true, 'Enabled', 'Enable other image link thumbnails'],
                whitelistOnly: [false, 'Allowed Only', 'Only enable for whitelisted domains <span class="info">(comma-separated, match-based)</span>'],
                allowedDomains: ['tumblr.com,derpicdn.net', 'Allowed Domains'],
                disallowedDomains: ['', 'Disallowed Domains'],
                preload: [false, 'Auto-Load', 'Load thumbnail automatically instead of waiting for user action <span class="info warning">(not recommended)</span>'],
                inlineExpand: [true, 'Inline Expand', 'Click the thumbnail to switch to the full image'],
                hoverExpand: [true, 'Hover Expand', 'Hover the thumbnail to show the full image'],
            },
        },
    };
    
    var Config = {
        get: function(key, def) {
            if (key instanceof Array) {
                key = key.join('.');
            }
            var val = JSON.parse(localStorage.getItem(namespace + key));
            if ($.null(val)) return def;
            return val;
        },
        set: function(key, value) {
            return localStorage.setItem(namespace + key, JSON.stringify(value));
        },
        remove: function(key) {
            return localStorage.removeItem(namespace + key);
        },
        checkbox: {
            change: function() {
                Config.set(this.name, this.checked);
                var opt = this.name.split('.');
                if (opt[1] == 'enabled') {
                    if (this.checked)
                        Main.attach(Processors[opt[0]]);
                    else
                        Main.detach(opt[0]);
                }
                return this.checked;
            },
        },
        textbox: {
            change: function() {
                Config.set(this.name, this.value);
                return this.value;
            },
        },
    };
    
    var Menu = {
        init: function() {
            var ref = ['boardNavDesktop', 'boardNavDesktopFoot', 'shortcuts'];
            for (var i = 0; i < ref.length; i++) {
                var elem = $.id(ref[i]);
                if ($.null(elem)) continue;
                
                var a = $.create('span', {
                    className: 'imgur-settings-link',
                    innerHTML: '[<a href="javascript:;">Imgur Settings</a>]',
                });
                $.on(a, 'click', Menu.dialog);
                $.append(elem, a);
            }
            if (!Config.get('firstrun')) {
                Config.set('firstrun', true);
                return Menu.dialog();
            }
        },
        dialog: function() {
            var menu = $.create('div', {
                id: 'imgur-menu',
                innerHTML: '\
                    <div class="bar">\
                        <p><a target="_BLANK" href="' + home + '">4chan imgur thumbnail v' + version + '</a></p>\
                    </div>\
                    <hr />\
                    <div class="content">\
                        <div class="processors"></div>\
                    </div>\
                ',
            });
            var label, key, ref, opt, procs, content;
            ref = Options.processors;
            procs = $('.processors', menu);
            content = $('.content', menu);
            for (label in ref) {
                var ul = $.create('ul', { innerHTML: '<strong>' + label + '</strong>' });
                opt = ref[label];
                for (key in opt) {
                    var arr = opt[key];
                    var confKey = [label, key].join('.');
                    var def = arr[0];
                    var text = arr[1];
                    switch (typeof def) {
                        case 'boolean':
                            var checked = Config.get(confKey, arr[0]) ? true : false;
                            var description = arr[2];
                            var li = $.create('li', {
                                innerHTML: '<label><input type="checkbox" name="' + confKey + '"' + (checked ? ' checked="checked"' : '') + '>' + text + '</label><span class="description">: ' + description + '</span>',
                            });
                            $.on($('input', li), 'change', Config.checkbox.change);
                            break;
                        case 'string':
                            var value = Config.get(confKey, arr[0]);
                            var li = $.create('li', {
                                innerHTML: '<label for="' + confKey + '">' + text + '</label>: <input type="text" id="' + confKey + '" name="' + confKey + '" value="' + value + '" />',
                            });
                            $.on($('input', li), 'change', Config.textbox.change);
                            break;
                    }
                    $.append(ul, li);
                }
                $.append(procs, ul);
            }
            
            overlay = $.create('div', {
                id: 'imgur-overlay'
            });
            $.on(overlay, 'click', Menu.close);
            $.on(menu, 'click', function(e) {
                return e.stopPropagation();
            });
            $.append(overlay, menu);
            $.append(d.body, overlay);
        },
        close: function() {
            $.remove(this);
        },
    };
    
    $.addStyle('\
        #imgur-overlay {\
            position: fixed;\
            top: 0;\
            left: 0;\
            width: 100%;\
            height: 100%;\
            text-align: center;\
            background: rgba(0,0,0,.5);\
            z-index: 1;\
        }\
        #imgur-overlay:after {\
            content: "";\
            display: inline-block;\
            height: 100%;\
            vertical-align: middle;\
        }\
        #imgur-menu {\
            background: #D6DAF0;\
            border: 1px solid rgba(0, 0, 0, 0.25);\
            display: inline-block;\
            padding: 5px;\
            position: relative;\
            text-align: left;\
            vertical-align: middle;\
            min-width: 350px;\
            max-width: 100%;\
            max-height: 100%;\
        }\
        #imgur-menu .info {\
            font-size: 10px;\
        }\
        #imgur-menu .warning {\
            font-weight: bold;\
            color: #f00;\
        }\
        #imgur-menu .bar {\
            font-size: 16px;\
            font-weight: bold;\
            margin-left: 5px;\
        }\
        #imgur-menu .bar p {\
            margin: 0 0 5px;\
        }\
        #imgur-menu .content {\
            height: 500px;\
            overflow: auto;\
            padding: 0 10px 10px;\
        }\
        #imgur-menu ul {\
            padding: 0;\
            list-style: none;\
        }\
        #imgur-menu label {\
            text-decoration: underline;\
        }\
        #imgur-menu input[type="text"] {\
            width: 300px;\
            margin-top: 3px;\
        }\
        .imgur-settings-link {\
            float: right;\
            margin-right: .25em;\
        }\
        .imgur-image {\
            border: 1px solid #00a !important;\
            padding: 2px;\
        }\
        .imgur-image.thumb {\
            max-height: 125px !important;\
            max-width: 125px !important;\
        }\
        #imgur-thumbnail-hover {\
            position: fixed;\
            max-height: 97%;\
            max-width: 75%;\
            padding-bottom: 18px;\
        }\
    ');
    
    Menu.init();

    for (label in Options.processors) {
        var opt = Options.processors[label];
        if (Config.get([label, 'enabled'], opt.enabled[0])) {
            Main.attach(Processors[label]);
        }
    }
    
    Main.init();
    
})();