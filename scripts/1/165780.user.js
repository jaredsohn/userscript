// ==UserScript==
// @name       Column reordering for SharePoint-Views
// @namespace  http://js.unsou.de/spcolumnreordering
// @version    0.3
// @description  enables dynamic column reordering in the edit view dialog on sharepoint sites
// @match      http*://*/_layouts/ViewEdit.aspx*
// @copyright  2013+, Max Nowack (base functionality used from John Liu (http://johnliu.net/blog/2011/5/9/sharepoint-improve-editview-column-reordering-with-jquery.html)
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// ==/UserScript==

(function(){
    function viewColumnsReorder(b) {
        var a = $("option:selected", b).text();
        var d = b.parents("tr:first");
        if (a == 1) {
            var c = $("tr:has( td.ms-authoringcontrols select option:selected[value^=2_] )", d.parents("table:first"));
            c.before(d);
        } else {
            var c = $("tr:has( td.ms-authoringcontrols select option:selected[value^=" + (a - 1) + "_] )", d.parents("table:first"));
            c.after(d);
        }
    }
    $(window).load(function () {
        if ($("#tbodyViewColumns").length == 0 || typeof (unsafeWindow.Reorder) != "function") {
            return;
        }
        
        var alertText = 'Dynamic column reordering activated!';
        if(typeof(unsafeWindow.SP)=="object") { // >= SP2010
            setTimeout(function(){unsafeWindow.SP.UI.Notify.addNotification(alertText, false);},500);
        } else { // < SP2010
			alert(alertText);
        }
        var a = unsafeWindow.Reorder;
        unsafeWindow.Reorder = function (c, b, d) {
            a(c, b, d);
            viewColumnsReorder($(c));
        };
    });
}());