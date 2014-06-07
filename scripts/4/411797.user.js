// ==UserScript==
// @name        R★ Support Options
// @namespace   http://userscripts.org
// @include     https://support.rockstargames.com/hc/communities/public/questions/*
// @include     https://support.rockstargames.com/hc/communities/public/questions/new
// @version     4.0
// @author      GLiTcH2
// @description Adds extra post formatting options to the support forum
// @grant       none
// ==/UserScript==

//----Start Functions----//

function getCaret(el) {
        if (el.prop("selectionStart")) {
            return el.prop("selectionStart");
        } else if (document.selection) {
            el.focus();

            var r = document.selection.createRange();
            if (r == null) {
                return 0;
            }

            var re = el.createTextRange(),
                    rc = re.duplicate();
            re.moveToBookmark(r.getBookmark());
            rc.setEndPoint('EndToStart', re);

            return rc.text.length;
        }
        return 0;
    };

function appendAtCaret($target, caret, $value) {
        var value = $target.val();
        if (caret != value.length) {
            var startPos = $target.prop("selectionStart");
            var scrollTop = $target.scrollTop;
            $target.val(value.substring(0, caret) + ' ' + $value + '' + value.substring(caret, value.length));
            $target.prop("selectionStart", startPos + $value.length);
            $target.prop("selectionEnd", startPos + $value.length);
            $target.scrollTop = scrollTop;
        } else if (caret == 0)
        {
            $target.val($value + '' + value);
        } else {
            $target.val(value + '' + $value);
        }
    };

//----End Functions----//

//----Start Strikethrough----//

$('.answer-form-controls.clearfix').prepend(
    $('<button id="st-button" title="Strikethough Text" type="button" style="margin-right:5px"><img src="http://i.imgur.com/jjGEbF8.gif"></button>')
);

$( "#st-button" ).click(function() {
    $('#answer_body').each(function() {
    var $this = $(this);
    var caret = getCaret($this);
    appendAtCaret($this, caret, '~~Some Text Here~~');
  });
});

//----End Strikethrough----//

//----Start Italic----//

$('.answer-form-controls.clearfix').prepend(
    $('<button id="it-button" title="Italic Text" type="button" style="margin-right:5px"><img src="http://i.imgur.com/nM01rke.gif"></button>')
);

$( "#it-button" ).click(function() {
    $('#answer_body').each(function() {
    var $this = $(this);
    var caret = getCaret($this);
    appendAtCaret($this, caret, '*Some Text Here*');
  });
});

//----End Italic----//

//----Start Bold----//

$('.answer-form-controls.clearfix').prepend(
    $('<button id="bt-button" title="Bold Text" type="button" style="margin-right:5px"><img src="http://i.imgur.com/3sXeg4R.gif"></button>')
);

$( "#bt-button" ).click(function() {
    $('#answer_body').each(function() {
    var $this = $(this);
    var caret = getCaret($this);
    appendAtCaret($this, caret, '**Some Text Here**');
  });
});

//----End Bold----//

//----Start Link----//

$('.answer-form-controls.clearfix').prepend(
    $('<button id="lt-button" title="Insert Link" type="button" style="margin-right:5px"><img src="http://i.imgur.com/6G0ndb6.gif"></button>')
);

$( "#lt-button" ).click(function() {
    $('#answer_body').each(function() {
    var $this = $(this);
    var caret = getCaret($this);
    appendAtCaret($this, caret, '[Link Text Here](http://www.example.com)');
  });
});

//----End Link----//

//----Start Image----//

$('.answer-form-controls.clearfix').prepend(
    $('<button id="im-button" title="Insert Image" type="button" style="margin-right:5px"><img src="http://i.imgur.com/DnVyVKL.gif"></button>')
);

$( "#im-button" ).click(function() {
    $('#answer_body').each(function() {
    var $this = $(this);
    var caret = getCaret($this);
    appendAtCaret($this, caret, '![](http://www.example.com/pic.png)');
  });
});

//----End Image----//

//----Start List----//

$('.answer-form-controls.clearfix').prepend(
    $('<button id="li-button" title="Insert Unordered List" type="button" style="margin-right:5px"><img src="http://i.imgur.com/CnXspIm.gif"></button>')
);

$( "#li-button" ).click(function() {
    $('#answer_body').each(function() {
    var $this = $(this);
    var caret = getCaret($this);
    appendAtCaret($this, caret, '- Bullet List Item 1');
  });
});

//----End List----//

//----Start Table----//

$('.answer-form-controls.clearfix').prepend(
    $('<button id="tb-button" title="Insert Table" type="button" style="margin-right:5px"><img src="http://i.imgur.com/E3wgw3z.gif"></button>')
);

//----End Table----//

//----Start Emoticons----//

$('.answer-form-controls.clearfix').prepend(
    $('<button id="em-button" title="Insert Emoticons" type="button" style="margin-right:5px"><img src="http://i.imgur.com/HFjxWSe.gif"></button>')
);

//----End Emoticons----//