// ==UserScript==
// @name           CybozuLocal
// @namespace      http://cybozu.makesoft.local/scripts/cbag
// @description    社内サイボウズ改造
// @include        http://cybozu.makesoft.local/scripts/cbag/*
// ==/UserScript==

(function(d, func) {
    var check = function() {
        if (typeof unsafeWindow.jQuery == 'undefined') return false;
        func(unsafeWindow.jQuery); return true;
    }
    if (check()) return;

    var s = d.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';
    d.getElementsByTagName('head')[0].appendChild(s);

    var s = d.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://web-work/admin/js/tiny_mce/jquery.tinymce.js';
    d.getElementsByTagName('head')[0].appendChild(s);

    (function() {
        if (check()) return;
        setTimeout(arguments.callee, 100);
    })();
})(document, function($) {
    // ここにメインの処理を書く

    // デザイン関係
    initDesign($);


});


/**
 * デザイン関係
 */
function initDesign($) {
    var w = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

    if ($('.seasonHeader').length == 0) {
        $('body').prepend(
            '<table class="layout" width="100%">'
          + '<tr><td class="seasonHeader" height="64">'
          + '<br></td></table>');
    }

    $('.seasonHeader').css({
        backgroundImage: 'url(http://empr.canp.net/image/test/seasonHeader.gif)'
    });


    // 社内メールフォームモード
    if ($('textarea#Data').length) {
        var formTable = $('.formTable');
        $('.formTable #groupSelect').after('&nbsp;<a href="#" class="local-rich-edit">HTML</a>');
        $('.local-rich-edit').click(OpenHtmlForm);
    }

    /**
     * HTML入力フォームモード
     */
    function OpenHtmlForm() {
        var formTable = $('.formTable');

        if ($('#HtmlForm').length) {
            $('#HtmlForm').show();
            return;
        }

        var html = '';
        var params = {
              localTextAreaEditStyle: 'localRichEdit'
            , Data: ''
        };

        var valueSubmit = '';

        // 親編集
        if ($('form[name=MessageModify]').length) {
            valueSubmit = '変更する';
            $(':hidden', 'form[name=MessageModify]').each(function(obj,a,c){ params[a.name] = a.value });
        }
        else {
            valueSubmit = '書き込む';
            $('input:hidden', formTable).each(function(obj,a,c){ params[a.name] = a.value });
        }

        for (field in params) html += '<input type="hidden" name="'
                                    + field + '" value="' + params[field] + '">';

        var subject = '';
        if (formTable.find('input[name=Subject]').length) {
            subject =  '<th>標題</th>'
                    +     '<td>'
                    +         '<input type="text" name="Subject" value="' + formTable.find('input[name=Subject]').val() + '">'
                    +     '</td>'
                    + '</tr>'
        }

        var group = $('#groupSelect', formTable).clone();
        var myName = formTable.find('td:eq(0)').get(0).childNodes[2].textContent;
        var defaultGroup = $(group).find('option:eq(0)').val();

        formTable.hide();

        formTable.before(
            '<div id="HtmlForm">'
          + '<form enctype="multipart/form-data" action="ag.exe?" method="post">'
          + html
          + '<table>'
          + '<tr>'
          + '<th>発言者</th>'
          +     '<td>'
          +         myName
          +         '<input type="text" name="Group" value="' + defaultGroup + '">'
          +     '</td>'
          + '</tr>'
          + subject
          + '<tr>'
          + '<th>ファイル</th>'
          +     '<td>'
          +         '<input type="file" name="File" style="width: 25em">'
          +     '</td>'
          + '</tr>'
          + '<tr>'
          +     '<td colspan="2">'
          +         '<textarea class="tinymce" name="HtmlData" rows="20" cols="80"></textarea>'
          +     '</td>'
          + '</tr>'
          + '<input type="submit" name="Submit" value="' + valueSubmit + '">'
          + '</table>'
          + '</form>'
          + '</div>'
        );

		$('textarea.tinymce').tinymce({
			// Location of TinyMCE script
			script_url : 'http://web-work/admin/js/tiny_mce/tiny_mce.js',

			// General options
			theme : "advanced",
			language : "ja",
			plugins : "pagebreak,style",

			// Theme options
			theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,forecolor,backcolor,|,formatselect,fontselect,fontsizeselect",
			theme_advanced_buttons2 : '',
			theme_advanced_buttons3 : '',
			theme_advanced_buttons4 : '',
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_statusbar_location : "bottom",
			theme_advanced_resizing : true,

			// Example content CSS (should be your site CSS)
			//content_css : "css/content.css",
		});

        return false;
    }


}










