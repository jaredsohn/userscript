// ==UserScript==
// @name          Hatena::Diary Old Edit Buttons
// @namespace     http://d.hatena.ne.jp/Yuichirou/
// @description   Replace edit buttons to old ones in the diary edit page in Hatena::Diary
// @include       http://d.hatena.ne.jp/*/edit
// @include       http://d.hatena.ne.jp/*/edit?*
// ==/UserScript==

// Version 1.6 (Released at 2007-02-13)

if (document.getElementById("edit-buttons") != null) {
  document.getElementById("edit-buttons").innerHTML = 
  '<img src="/images/admin/markup_category.gif" alt="\u30AB\u30C6\u30B4\u30EA\u30FC" title="\u30AB\u30C6\u30B4\u30EA\u30FC" style="margin-right:5px;" onmousedown="CategorySelection.onFirstClick(event); return false;">' +

  '<img src="/images/admin/markup_bold.gif" alt="\u5F37\u3044\u5F37\u8ABF" title="\u5F37\u3044\u5F37\u8ABF" onmousedown="markupHtml(\'strong\'); return false;">' +
  '<img src="/images/admin/markup_em.gif" alt="\u5F37\u8ABF" title="\u5F37\u8ABF" onmousedown="markupHtml(\'em\'); return false;">' +
  '<img src="/images/admin/markup_del.gif" alt="\u524A\u9664\u90E8" title="\u524A\u9664\u90E8" onmousedown="markupHtml(\'del\'); return false;">' +
  '<img src="/images/admin/markup_ins.gif" alt="\u633F\u5165\u90E8" title="\u633F\u5165\u90E8" style="margin-right:5px;" onmousedown="markupHtml(\'ins\'); return false;">' +

  '<img src="/images/admin/markup_title.gif" alt="\u898B\u51FA\u3057" title="\u898B\u51FA\u3057" onmousedown="markup(\'\\n*\', \'\\n\'); return false;">' +
  '<img src="/images/admin/markup_ul.gif" alt="\u30EA\u30B9\u30C8" title="\u30EA\u30B9\u30C8" onmousedown="makeList(\'-\'); return false;">' +
  '<img src="/images/admin/markup_ol.gif" alt="\u6570\u5B57\u30EA\u30B9\u30C8" title="\u6570\u5B57\u30EA\u30B9\u30C8" style="margin-right:5px;" onmousedown="makeList(\'+\'); return false;">' +

  '<img src="/images/admin/markup_quote.gif" alt="\u5F15\u7528" title="\u5F15\u7528" onmousedown="markupQuote(); return false;">' +
  '<img src="/images/admin/markup_footnote.gif" alt="\u811A\u6CE8" title="\u811A\u6CE8" style="margin-right:5px;" onmousedown="markupFootnote(); return false;">' +

  '<img src="/images/admin/markup_keyword.gif" alt="\u30AD\u30FC\u30EF\u30FC\u30C9" title="\u30AD\u30FC\u30EF\u30FC\u30C9" onmousedown="markup(\'[[\', \']]\'); return false;">' +
  '<img src="/images/admin/markup_url.gif" alt="\u30EA\u30F3\u30AF" title="\u30EA\u30F3\u30AF" style="margin-right:5px;" onmousedown="markupURL(); return false;">' +

  '<img src="/images/admin/markup_image.gif" alt="\u30D5\u30A9\u30C8\u30E9\u30A4\u30D5" title="\u30D5\u30A9\u30C8\u30E9\u30A4\u30D5" onmousedown="Myfoto.onFirstClick(event); return false;"> ';

  unsafeWindow.Hatena.Diary.EditDetail.Created = false;
  unsafeWindow.Hatena.Diary.EditDetail.create();

  (function() {
    __markup = unsafeWindow.markup;
    unsafeWindow.markup = function (pre, post) {
      var textInput = document.getElementById('textarea-edit');
      var scrollTop = textInput.scrollTop;

      __markup.apply(this, arguments);

      textInput.focus();
      textInput.scrollTop = scrollTop;
    };
  })();
}
