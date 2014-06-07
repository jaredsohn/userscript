// ==UserScript==
// @name         What.CD Status checker Test
// @namespace    http://what.cd/
// @include      http://what.cd/index.php*
// @include      https://ssl.what.cd/index.php*
// @author       BloodPhilia
// @description  Normal script displays warning when What.cd Tracker and/or IRC are down. This Test version shows how the warning would look with your settings.
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main(){
$('body').append('<div id="statusWarning" style="line-height: 1.3; position: absolute; top: 0; right: 25px; z-index: 99; background: #fff; padding: 15px 20px 15px 20px; display: none; cursor: pointer;"><img style="float: left; padding: 0 20px 15px 0;" alt="Warning" src="http://i.imgur.com/adBTD.png"><div><span style="color: #000; font-size: 80%; float: right;">More information and statistics can be found on <a href="http://whatstatus.info/stats.php" target="_blank">Whatstatus.info</a></div></div>');
$('div#statusWarning').click(function(){ 
	$('div#statusWarning').fadeToggle();
});
	url = "https://whatstatus.info/json.php?callback=?";
	$.getJSON("https://whatstatus.info/json.php?callback=?",
		function(data){
			var i = 0;
			if(data['status']['tracker'] == "up"){
				$('div#statusWarning div').prepend('<span style="color: #f00; font-weight: bold;">The Tracker currently seems to be down so you may be experiencing some issues!</stong><br />');
				i++;
			}
			if(data['status']['irc'] != "up"){
				$('div#statusWarning div').prepend('<span style="color: #f00; font-weight: bold;">The IRC-server currently seems to be down so you may be experiencing some issues!</stong><br />');
				i++;
			}
			if(i>0){
				$('div#statusWarning').fadeToggle();
			}
		});
}

addJQuery(main);