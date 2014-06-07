// ==UserScript==
// @name           Current Date Setter
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// @require        http://stevenlevithan.com/assets/misc/date.format.js
// @include        *
// ==/UserScript==

$('input').keydown(function(e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode==77) {
        var date = new Date().format("yyyy-mm-dd HH:MM");
		var input = $(this);
        input.val(input.val().substring(0,input.val().indexOf("_Copy("))+" "+ date);
    }
});