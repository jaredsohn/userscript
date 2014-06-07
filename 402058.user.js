// ==UserScript==
// @name       Print Elements
// @namespace  http://userscripts.org/scripts/show/402058
// @version    3.1
// @description  To print any div or table element by preserving the same style as it is in screen
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
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (s) {
        return this.length >= s.length && this.substr(this.length - s.length) == s;
    };
}

this.$ = this.jQuery = jQuery.noConflict(true);

; (function ($) {
    var opt;
    $.fn.printThis = function (options) {
        opt = $.extend({}, $.fn.printThis.defaults, options);
        var $element = this instanceof jQuery ? this : $(this);

        var strFrameName = "printThis-" + (new Date()).getTime();

        if (window.location.hostname !== document.domain && navigator.userAgent.match(/msie/i)) {
            // Ugly IE hacks due to IE not inheriting document.domain from parent
            // checks if document.domain is set by comparing the host name against document.domain
            var iframeSrc = "javascript:document.write(\"<head><script>document.domain=\\\"" + document.domain + "\\\";</script></head><body></body>\")";
            var printI = document.createElement('iframe');
            printI.name = "printIframe";
            printI.id = strFrameName;
            printI.className = "MSIE";
            document.body.appendChild(printI);
            printI.src = iframeSrc;

        } else {
            // other browsers inherit document.domain, and IE works if document.domain is not explicitly set
            var $frame = $("<iframe id='" + strFrameName + "' name='printIframe' />");
            $frame.appendTo("body");
        }


        var $iframe = $("#" + strFrameName);

        // show frame if in debug mode
        if (!opt.debug) $iframe.css({
            position: "absolute",
            width: "0px",
            height: "0px",
            left: "-600px",
            top: "-600px"
        });


        // $iframe.ready() and $iframe.load were inconsistent between browsers    
        setTimeout(function () {

            var $doc = $iframe.contents();

            // import page stylesheets
            if (opt.importCSS) $("link[rel=stylesheet]").each(function () {
                var href = $(this).attr("href");
                if (href) {
                    var media = $(this).attr("media") || "all";
                    $doc.find("head").append("<link type='text/css' rel='stylesheet' href='" + href + "' media='" + media + "'>")
                }
            });

            //add title of the page
            if (opt.pageTitle) $doc.find("head").append("<title>" + opt.pageTitle + "</title>");

            // import additional stylesheet
            if (opt.loadCSS) $doc.find("head").append("<link type='text/css' rel='stylesheet' href='" + opt.loadCSS + "'>");

            // print header
            if (opt.header) $doc.find("body").append(opt.header);

            // grab $.selector as container
            if (opt.printContainer) $doc.find("body").append($element.outer());

            // otherwise just print interior elements of container
            else $element.each(function () {
                $doc.find("body").append($(this).html());
            });

            // remove inline styles
            if (opt.removeInline) {
                // $.removeAttr available jQuery 1.7+
                if ($.isFunction($.removeAttr)) {
                    $doc.find("body *").removeAttr("style");
                } else {
                    $doc.find("body *").attr("style", "");
                }
            }

            setTimeout(function () {
                if ($iframe.hasClass("MSIE")) {
                    // check if the iframe was created with the ugly hack
                    // and perform another ugly hack out of neccessity
                    window.frames["printIframe"].focus();
                    $doc.find("head").append("<script>  window.print(); </script>");
                } else {
                    // proper method
                    $iframe[0].contentWindow.focus();
                    $iframe[0].contentWindow.print();
                }

                $element.trigger("done");
                //remove iframe after print
                if (!opt.debug) {
                    setTimeout(function () {
                        $iframe.remove();
                    }, 1000);
                }

            }, opt.printDelay);

        }, 333);

    };

    // defaults
    $.fn.printThis.defaults = {
        debug: false,           // show the iframe for debugging
        importCSS: true,        // import parent page css
        printContainer: true,   // print outer container/$.selector
        loadCSS: "",            // load an additional css file
        pageTitle: "",          // add title to print page
        removeInline: false,    // remove all inline styles
        printDelay: 333,        // variable print delay
        header: null            // prefix to html
    };

    // $.selector container
    jQuery.fn.outer = function () {
        return $($("<div></div>").html(this.clone())).html()
    }
})(jQuery);

$(document).ready(function () {

    $.fn.setupDivPrinter = function () {
        return this.each(function () { _divPrinter(this); });
    };

    var _divPrinter = window.divPrinter = function (elm) {
        if (elm.jQuery) {
            return _divPrinter(elm[0]);
        }

        if (elm.divPrinter) {
            return elm.divPrinter;
        }
        else {
            return new _divPrinter.fn.init(elm);
        }
    };

    _divPrinter.fn = _divPrinter.prototype = {
        init: function (elm) {
            this._data_printEnabled = 'printEnabled';
            this._css_printArea = 'printArea';
            this._printWrapper = 'divPrintWrapper';
            this._printAreaStyle = this.getPrintAreaStyle();
            this._element = $(elm);

            elm.divPrinter = this;

            this.renderPrintButton();
        },

        getPrintAreaStyle: function () {
            return $('<style type="text/css"> @media screen { div.' + this._css_printArea + ',table.' + this._css_printArea + '  {border: ' + this.getDottedBorder() +
                            ' !important; cursor: pointer !important;} } @media print { div#divPrintWrapper {display:none;} }</style>');
        },

        getPrinterIcon: function () {
            return $('<img style="-webkit-user-select: none;width: 32px;" src="data:image/png;base64,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" alt="Click to select & print element"/>');
        },

        getPrintButton: function () {
            return $('div#' + this._printWrapper + ' a');
        },

        getPrintableElements: function () {
            return $(document).find('div, table');
        },

        getDottedBorder: function () {
            return '3px dashed #DC143C';
        },

        isDarkColor: function (color) {
            var match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(color);
            return (match[1] & 255)
                     + (match[2] & 255)
                     + (match[3] & 255)
                       < 3 * 256 / 2;
        },

        hasPrintAreaStyle: function () {
            return $(document).find(this._printAreaStyle).length > 0;
        },

        addPrintAreaStyle: function () {
            if (!this.hasPrintAreaStyle()) {
                $(document).find('head').append(this._printAreaStyle);
            }
        },

        createPrintButton: function () {
            var printButton = $('<a>', {
                href: 'javascript:void(0)',
                title: 'Click to select & print element',
                html: this.getPrinterIcon()
            });

            var setupPrintAreaProxy = $.proxy(this.setupPrintArea, this);
            var stopEventProxy = $.proxy(this.stopEvent, this);
            var printEnabled = this._data_printEnabled;

            printButton.click(function (e) {
                stopEventProxy(e);
                if ($(this).data(printEnabled)) {
                    $(this).removeData(printEnabled);
                    setupPrintAreaProxy(true);
                }
                else {
                    $(this).data(printEnabled, '1');
                    setupPrintAreaProxy(false);
                }
            });

            return printButton;
        },

        stopEvent: function (e) {
            e.preventDefault();
            e.stopPropagation();
        },

        setupPrintArea: function (dispose) {
            var class_printArea = this._css_printArea;
            var printEnabled = this._data_printEnabled;
            var elements = this.getPrintableElements();
            var parentElement = this._element;

            var resetStyle = function () {
                elements.each(function (i) {
                    if ($(this).hasClass(class_printArea)) {
                        $(this).removeClass(class_printArea);
                    }
                });
            };

            var getPrintButtonProxy = $.proxy(this.getPrintButton, this);
            var disposePrintArea = function () {
                elements.unbind('mouseover.divPrinter');
                elements.unbind('mouseout.divPrinter');
                elements.unbind('mousedown.divPrinter');
                elements.unbind('click.divPrinter');
                parentElement.unbind('keyup.divPrinter');

                resetStyle();

                if (getPrintButtonProxy().data(printEnabled)) {
                    getPrintButtonProxy().removeData(printEnabled);
                }
            };

            if (dispose) {
                disposePrintArea();
            }
            else {
                var getDottedBorderProxy = $.proxy(this.getDottedBorder, this);
                var stopEventProxy = $.proxy(this.stopEvent, this);

                elements.bind('mouseover.divPrinter', function (e) {
                    resetStyle();
                    $(this).addClass(class_printArea);
                    stopEventProxy(e);
                });

                elements.bind('mouseout.divPrinter', function (e) {
                    resetStyle();
                    stopEventProxy(e);
                });

                elements.bind('mousedown.divPrinter', function (e) {
                    if (e.button == 2) {
                        stopEventProxy(e);
                        disposePrintArea();
                    }
                });

                elements.bind('click.divPrinter', function (e) {
                    stopEventProxy(e);
                    disposePrintArea();
                    $(this).printThis();
                });

                parentElement.bind('keyup.divPrinter', function (e) {
                    if (e.keyCode == 27 /*escape*/) {
                        stopEventProxy(e);
                        disposePrintArea();
                    }
                });
            }
        },

        renderPrintButton: function () {
            this.addPrintAreaStyle();

            var wrapper = $('<div>',
            {
                id: this._printWrapper,
                style: 'position:fixed;top:1px;right:8px;z-index:9999;'
            });

            wrapper.append(this.createPrintButton()).appendTo('body');
        }
    };

    _divPrinter.fn.init.prototype = _divPrinter.fn;
    $(document).setupDivPrinter();
});