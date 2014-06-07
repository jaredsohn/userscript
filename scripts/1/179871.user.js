// ==UserScript==
// @name           Saori MUDO list
// @namespace      http://userscripts.org/users/Spawacz
// @description    Show Saori's MUDO list ond main page.
// @include        http://www.erepublik.com/en
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement('script');
    script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
    script.addEventListener('load', function() {
        var script = document.createElement('script');
        script.textContent = 'window.jQ=jQuery.noConflict(true);(' + callback.toString() + ')();';
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {
	var mudo = [];
	var succeeded = false;
	var url="http://80.53.102.6:8080/saori/mudo.json";
	$.ajax({
		url: url,
		type: 'GET',
		dataType: "jsonp",
		success: function(data) { mudo = data.mudo_list; succeeded = true; },
		error: function() { alert('nie'); },
	});

	if (true/*succeeded*/) {
		var list = [];
		var battle_link = 'http://www.erepublik.com/en/military/battlefield/';
		for (i = 0; i < mudo.length; i++) {
			list.push('<li><a href="' + battle_link + mudo[i].battle_id + '">' + mudo[i].battle_region + '</a></li>');
		}
		var header = '<h1 class="noborder" style="float:left">Saori MUDO battles</h1>';
		$('#mission_reward').after(header + '<ul>' + list.join('') + '</ul>');
	}
};

addJQuery(main);