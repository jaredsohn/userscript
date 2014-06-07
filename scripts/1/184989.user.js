// ==UserScript==
// @name       Hover Image
// @namespace  http://userscripts.org/scripts/show/184989
// @version    1.6
// @description  to show a actual size image of the thumbnail on popup on mouse hover
// @include	   *
// @require	   http://code.jquery.com/jquery-latest.min.js
// @copyright  2013+, You
// ==/UserScript==

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (s) {
        return this.slice(0, s.length) == s;
    };
}

if (typeof String.prototype.contains != 'function') {
    String.prototype.contains = function (s) {
        return this.indexOf(s) != -1;
    };
}

if (typeof String.prototype.containsAny != 'function') {
    String.prototype.containsAny = function (sA) {
        for (var i = 0; i < sA.length; i++) {
            if (this.indexOf(sA[i]) != -1) return true;
        }

        return false;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (s) {
        return this.length >= s.length && this.substr(this.length - s.length) == s;
    };
}

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function () {

    $.fn.setupImagePopupEngine = function () {
        return this.each(function () { _imagePopupEngine(this); });
    };

    var _imagePopupEngine = window.imagePopupEngine = function (elm) {
        if (elm.jQuery) {
            return _imagePopupEngine(elm[0]);
        }

        if (elm.imagePopupEngine) {
            return elm.imagePopupEngine;
        }
        else {
            return new _imagePopupEngine.fn.init(elm);
        }
    };

    _imagePopupEngine.fn = _imagePopupEngine.prototype = {
        init: function (elm) {
            this._class_popupWrapper = 'imgPopupWrapper';
            this._element = $(elm);
            this._popupStyles = this.getPopupStyle();

            elm.imagePopupEngine = this;

            this.setup();
        },

        getPopupStyle: function () {
            return $('<style type="text/css"> .' + this._class_popupWrapper + ' { position:absolute;z-index:2005;color:#000;font-size:10px;background-color:transparent;border: 1px solid gray;min-height:50px;min-width:50px;-webkit-border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;border-radius:3px;-ms-border-radius:3px; } </style>');
        },

        getPopupWrapper: function () {
            var popupWrapper = $('<div>');
            popupWrapper.addClass(this._class_popupWrapper);

            return popupWrapper;
        },

        isElementInParent: function (elm, parent) {
            var container = parent || $(document);
            return container.find(elm).length > 0;
        },

        hasPopupStyle: function () {
            return this.isElementInParent(this._popupStyles);
        },

        addPopupStyle: function () {
            if (!this.hasPopupStyle()) {
                $(document).find('head').append(this._popupStyles);
            }
        },

        setup: function () {
            this.addPopupStyle();
            this.registerImageHover();
        },

        registerImageHover: function () {
            var imageLinks = this._element.find('a img');
            var imgExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
            var calculateViewPortSizeProxy = $.proxy(this.calculateViewPortSize, this);
            var getPopupWrapperProxy = $.proxy(this.getPopupWrapper, this); debugger;

            imageLinks.each(function (i) {
                var href = $(this).parent().attr('href');
                if (!href.startsWith('#') && href.containsAny(imgExtensions)) {
                    $(this).mouseover(function (e) {

                        var source = $(this);
                        var xOffset = 20;
                        var viewPort = calculateViewPortSizeProxy();
                        var winWidth = viewPort[0];
                        var winHeight = viewPort[1];

                        var popupWrapper = getPopupWrapperProxy();
                        //popupWrapper.find('img').attr('src', source.parent().attr('href'));
                        source.parent().append(popupWrapper);

                        var image = $('<img border="0" src="' + source.parent().attr('href') + '" />');
                        image.one('load', function () {
                            var left = e.pageX + xOffset;
                            var top = e.pageY - (popupWrapper.height() / 2);

                            source.bind('mousemove', function (e) {
                                var posX = Math.max((e.pageX - $(document).scrollLeft()), 2);
                                var posY = Math.max((e.pageY - $(document).scrollTop()), 2);

                                if (popupWrapper.width() + e.pageX + xOffset > winWidth) {
                                    popupWrapper.css('left', e.pageX - xOffset - popupWrapper.width());
                                }
                                else {
                                    popupWrapper.css('left', e.pageX + xOffset);
                                }

                                if ((popupWrapper.height() / 2) + posY > winHeight) {
                                    if (posY - popupWrapper.height() > 0) {
                                        popupWrapper.css('top', e.pageY - popupWrapper.height());
                                    }
                                    else {
                                        popupWrapper.css('top', 2);
                                    }
                                }
                                else {
                                    if (posY - (popupWrapper.height() / 2) > 0) {
                                        popupWrapper.css('top', e.pageY - (popupWrapper.height() / 2));
                                    }
                                    else {
                                        popupWrapper.css('top', $(document).scrollTop() + 2);
                                    }
                                }
                            });

                            source.bind('mouseout', function (e) {
                                popupWrapper.remove();
                                source.unbind('mousemove');
                                source.unbind('mouseout');
                            });

                            popupWrapper.css('top', top);
                            popupWrapper.css('left', left);
                        }).each(function () {
                            if (this.complete) $(this).load();
                        });

                        popupWrapper.append(image);
                    });
                }
            });
        },

        calculateViewPortSize: function () {
            var width = 0;
            var height = 0;

            if ("number" == typeof (window.innerWidth)) {
                /* non-IE */

                width = window.innerWidth;
                height = window.innerHeight;
            }
            else if (document.documentElement &&
				 (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                /* IE 6+ in 'standards compliant mode' */

                width = document.documentElement.clientWidth;
                height = document.documentElement.clientHeight;
            }
            else if (document.body &&
				 (document.body.clientWidth || document.body.clientHeight)) {
                /* IE 4 compatible */

                width = document.body.clientWidth;
                height = document.body.clientHeight;
            }
            return [width, height];
        }
    };

    _imagePopupEngine.fn.init.prototype = _imagePopupEngine.fn;
    $(document).setupImagePopupEngine();
});