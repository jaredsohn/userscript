// ==UserScript==
// @name       Otaku-Streamers Episode Helper
// @namespace  http://userscripts.org/users/500138/
// @description  Automates addition and removal of anime episodes on http://otaku-streamers.com
// @version    0.1
// @date       2013-01-14
// @author     forknbeans
// @match      http://otaku-streamers.com/info/*
// ==/UserScript== 
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	// store anime id and episode selection id
	var $userid = $('#user').val(),
		$osid = $('#aid').val(),
		$selectedEpisode = 1;

	// customize interface
	$("#vote").closest("tr").after("<tr><td align='left' width='120px' nowrap='nowrap' valign='middle' class='str_alt'>Edit Episodes</td><td align='left' width='10px' class='str_alt'>&nbsp;&nbsp;&nbsp;</td><td align='left' width='100%' class='str_alt'><form><select id='massEpisodes' style='width: 80%';></select></form></td></tr>");
	$('#massEpisodes').after("<br /><input type='button' id='btnAdd' value='Add' style='width: 40%';/><input type='button' id='btnRemove' value='Remove' style='width: 40%';/></p>");

	// remove 'preview' episode if found then populate episode list
	if ($('#wlog_ep0').length === 0) {
		$("[name^='wlog_ep']").each(function (i) {
			$('#massEpisodes').append("<option value='" + (i + 1) + "'>Episode " + (i + 1) + "</option>");
		});
	} else {
		$("[name^='wlog_ep']").slice(0, -1).each(function (i) {
			$('#massEpisodes').append("<option value='" + (i + 1) + "'>Episode " + (i + 1) + "</option>");
		});
	}

	// update $selectedEpisode when user changes episode selection
	$('#massEpisodes').change(function () {
		$selectedEpisode = $('#massEpisodes option:selected').val();
	});

	// add episodes when user clicks Add button
	$('#btnAdd').click(function () {
		for (var i = 0; i < $selectedEpisode; i++) {
			addwatchlog($userid, $osid, i + 1);
		}
		$('html, body').animate({
			scrollTop: $("#wlog_ep" + i).offset().top
		}, 1000);
	});

	// remove episodes when user clicks Remove button
	$('#btnRemove').click(function () {
		for (var i = 0; i < $selectedEpisode; i++) {
			revwatchlog($userid, $osid, i + 1);
		}
		$('html, body').animate({
			scrollTop: $("#wlog_ep" + i).offset().top
		}, 1000);
	});
}
 
// load jQuery and execute the main function
addJQuery(main);