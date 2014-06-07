// ==UserScript==
// @name          Fidel Hider
// @namespace     http://www.science-fiction.com.pl/forum
// @description   A Fidel Hider that hides Fidel
// @include       http://*.science-fiction.com.pl/forum/viewtopic.php*
// ==/UserScript==
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", " http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {
	$('a').each(function() {
		if ($(this).attr('href') =="javascript:em('[b]Fidel-F2[/b], ')" || ($(this).attr('href') =="profile.php?mode=viewprofile&u=443" && $(this).hasClass("gensmall")))
		{
			var row = $(this).closest('tr');
			row.css("display","none");
			row.next().css("display","none");
			row.next().next().css("display","none");
		}
	});
}

addJQuery(main);
