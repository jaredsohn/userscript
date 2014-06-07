// ==UserScript==
// @name           Compare Bookmarks Onliner.by
// @namespace      Compare_Bookmarks_Onliner.by
// @description    Adds Compare button to bookmarks page on Onliner.by
// @version        0.1
// @author         Morgen
// @include        http://profile.onliner.by/bookmarks/catalog*
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", function() {
	$('head').append('<script type="text/javascript">function compareBookmarks() { var compareLink = $("#bookmarksList input:checked").map(function(){return $(this).val();}).get().join("+"); if (compareLink.length > 0) document.location.href = "http://catalog.onliner.by/compare/"+compareLink; }</script>');
	$('div.b-pmfilter').after('<div class="pcompbtn" style="float: left; margin-left: 10px;"><a href="javascript:compareBookmarks()"><img height="27" border="0" width="56" alt="Сравнить модели" src="http://catalog.onliner.by/pic/btn_compare.gif"></a></div>');
});