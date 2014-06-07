// ==UserScript==
// @name       JIRA Story printer
// @namespace  http://userscripts.org/scripts/show/184524
// @version    1.4
// @description  to print JIRA user story
// @include	   http*://tracker.dev.cba/secure/RapidBoard.jspa?*
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
$(document).ready(function () {

    $.fn.setupAgileCardPrinter = function () {
        return this.each(function () { _agileCardPrinter(this); });
    };

    var _agileCardPrinter = window.agileCardPrinter = function (elm) {
        if (elm.jQuery) {
            return _agileCardPrinter(elm[0]);
        }

        if (elm.agileCardPrinter) {
            return elm.agileCardPrinter;
        }
        else {
            return new _agileCardPrinter.fn.init(elm);
        }
    };

    _agileCardPrinter.fn = _agileCardPrinter.prototype = {
        init: function (elm) {
            this._class_noPrint = 'noprint';
            this._id_printWrapper = 'agileCardPrintWrapper';

            this._mediaQuery = this.getPrintMediaQuery();
            this._printWrapper = this.getPrintWrapper();
            this._printerIcon = this.getPrinterIcon();

            elm.agileCardPrinter = this;

            this.registerAjaxCallback();
        },

        getPrintMediaQuery: function () {
            return $('<style type="text/css"> @media print { .' + this._class_noPrint + ' { display: none; } #' + this._id_printWrapper + ' { display: block; } } </style>');
        },

        getPrintWrapper: function () {
            return $('<div id="' + this._id_printWrapper + '"></div>');
        },

        getPrinterIcon: function () {
            return $('<img style="margin-left:12px;" alt="Agile Card" src="/download/resources/com.spartez.scrumprint.scrumplugin/printer-icon.png" />');
        },

        getPrintButton: function () {
            var printButton = $('<a>', {
                href: 'javascript:void(0)',
                title: 'Print this story card',
                html: this.getPrinterIcon()
            });

            var printProxy = $.proxy(this.print, this);
            printButton.click(function () {
                printProxy();
            });

            return printButton;
        },

        getAgileCardTitleRow: function () {
            return $('<tr><td><span>User Story:</span></td><td></td><td><span>Estimate:</span></td><td></td></tr>');
        },

        getAgileCardSummaryRow: function () {
            return $('<tr><td><span>Summary:</span></td><td colspan="3"></td></tr>');
        },

        getAgileCardDescriptionRow: function () {
            return $('<tr><td><span>Description:</span></td><td colspan="3"></td></tr>');
        },

        hasPrintMediaQuery: function () {
            return $(document).find(this._mediaQuery).length > 0;
        },

        addPrintMediaQuery: function () {
            if (!this.hasPrintMediaQuery()) {
                $(document).find('head').append(this._mediaQuery);
            }
        },

        removePrintMediaQuery: function () {
            if (this.hasPrintMediaQuery()) {
                this._mediaQuery.remove();
            }
        },

        getPageElement: function () {
            return $('div#page');
        },

        setupPrintWrapper: function () {
            this.getPageElement().addClass(this._class_noPrint);
            this._printWrapper.appendTo('body');
        },

        disposePrintWrapper: function () {
            this.getPageElement().removeClass(this._class_noPrint);
            this._printWrapper.remove();
        },

        registerAjaxCallback: function () {
            var renderPrintButtonProxy = $.proxy(this.renderPrintButton, this);
            var xhr = XMLHttpRequest;
            var open = xhr.prototype.open;
            var send = xhr.prototype.send;

            xhr.prototype.open = function (method, url, async, user, pass) {
                this._url = url;
                open.call(this, method, url, async, user, pass);
            };

            xhr.prototype.send = function (data) {
                var self = this;
                var callerOnReadyStateChange;
                var url = this._url;

                function onReadyStateChange() {
                    if (callerOnReadyStateChange) {
                        callerOnReadyStateChange();
                    }

                    if (url.contains('issue/details.json') && self.readyState == 4 /* complete */) {
                        window.setTimeout(function () {
                            renderPrintButtonProxy();
                        }, 200);
                    }
                }

                if (this.addEventListener) {
                    this.addEventListener("readystatechange", onReadyStateChange, false);
                } else {
                    callerOnReadyStateChange = this.onreadystatechange;
                    this.onreadystatechange = onReadyStateChange;
                }

                send.call(this, data);
            };
        },

        renderAgileCard: function () {
            var wrapper = this._printWrapper;
            wrapper.html('');

            var titleRow = this.getAgileCardTitleRow();
            var summaryRow = this.getAgileCardSummaryRow();
            var descriptionRow = this.getAgileCardDescriptionRow();

            titleRow.height(25);

            titleRow.find('td:nth-child(2)').html($('dd[title="issue.key"] a').html());
            titleRow.find('td:nth-child(4)').html($('dd[title="Story Points"]').html());
            summaryRow.find('td:nth-child(2)').html($('dd[title="Summary"]').html());
            descriptionRow.find('td:nth-child(2)').html($('dd[title="Description"]').html());

            var storyTable = $('<table>');

            storyTable.append(titleRow).append(summaryRow).append(descriptionRow);
            storyTable.width(532);
            storyTable.height(288);
            storyTable.css({ 'border': '1px solid', 'border-collapse': 'collapse' });
            storyTable.find('td').css('border', '1px solid');
            storyTable.find('tr > td:first-child').width(100);
            storyTable.find('tr > td > span').css('font-weight', 'bold');

            wrapper.append(storyTable);
        },

        renderPrintButton: function () {
            $('div.ghx-detail-nav-menu ul').append(this.getPrintButton());
        },

        print: function () {
            this.addPrintMediaQuery();
            this.setupPrintWrapper();
            this.renderAgileCard();
            window.print();
            this.dispose();
        },

        dispose: function () {
            this.disposePrintWrapper();
            this.removePrintMediaQuery();
        }
    };

    _agileCardPrinter.fn.init.prototype = _agileCardPrinter.fn;
    $(document).setupAgileCardPrinter();
});