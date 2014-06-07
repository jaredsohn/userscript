// ==UserScript== 
// @name           Mintakép betöltése + youtube embed kód megjelenítése https protokoll mellett
// @namespace      by gala PROBLEM?
// @description    Mintakép betöltése + youtube embed kód megjelenítése https protokoll mellett
// @include        http://ncore.cc/*
// @include        http://ncore.nu/*
// @include        https://ncore.cc/*
// @include        https://ncore.nu/*
// ==/UserScript== 
function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}
exec(function() {
$.getScript("https://raw.github.com/brandonaaron/livequery/master/jquery.livequery.js", function() {
		$("object").livequery(function() {
		var url = $(this).children("embed").attr("src");
		var newurl = url.replace("http", "https");
		$(this).children("param[name=\"movie\"]").val(newurl);
		$(this).children("embed").attr("src",newurl);
		var ht = $(this).html();
		$(this).html(ht);
		 });

		$("a.fancy_groups").livequery(function() {
		$("td.kepmeret_txt").css("padding-top","50px");
		$("td.kepmeret_txt").each(function() {
		$(this).children("em").css("padding-left", "95px")
		});
		$(".kepmeret_ico").css("margin-right","4px").css("margin-left","4px").css("width","140px").css("height","80px");//css("width","140px").css("height","80px")
		$("a.fancy_groups").each(function() {
		$(this).children("img.attached_link").attr("src",(this)).css("width","140px").css("height","80px");
				});
		 });
 
 
 });
 });