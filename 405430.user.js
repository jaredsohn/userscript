// ==UserScript==
// @name       Big Textbox
// @namespace  http://userscripts.org/scripts/show/405430
// @version    1.1
// @description  change settings of big text box
// @include	   http*://bigtextbox.com*
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

    $.fn.setupBigTextBox = function () {
        return this.each(function () { _bigTextBox(this); });
    };

    var _bigTextBox = window.bigTextBox = function (elm) {
        if (elm.jQuery) {
            return _bigTextBox(elm[0]);
        }

        if (elm.bigTextBox) {
            return elm.bigTextBox;
        }
        else {
            return new _bigTextBox.fn.init(elm);
        }
    };

    _bigTextBox.fn = _bigTextBox.prototype = {
        init: function (elm) {
            this._css_textArea = 'bigTextArea';
            this._textAreaStyle = this.getTextAreaStyle();

            elm.bigTextBox = this;

            this.applyNewStyles();
        },

        getTextAreaStyle: function () {
            return $('<style type="text/css"> textarea.' + this._css_textArea + ' {text-align: left !important; font-size: 14px !important; padding: 0px !important;} </style>');
        },

        hasTextAreaStyle: function () {
            return $(document).find(this._textAreaStyle).length > 0;
        },

        addTextAreaStyle: function () {
            if (!this.hasTextAreaStyle()) {
                $(document).find('head').append(this._textAreaStyle);
            }
        },

        applyNewStyles: function () {
            this.addTextAreaStyle();
            $('textarea').addClass(this._css_textArea);
        }
    };

    _bigTextBox.fn.init.prototype = _bigTextBox.fn;
    $(document).setupBigTextBox();
});