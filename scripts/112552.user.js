// ==UserScript==
// @name           MusicBrainz: Default attributes when adding releases
// @description    Custom defaults for language, script, country, type, status and packaging when adding releases
// @version        2010-03-28
// @author         
// @namespace      01234567-0123-0123-0123-012345678910
//
// @include        http://musicbrainz.org/release/add*

// ==/UserScript==
//**************************************************************************//

select_by_name("id-language_id", "English");
select_by_name("id-script_id", "Latin");
select_by_name("id-country_id", "United Kingdom");
select_by_name("id-type_id", "Album");
select_by_name("id-status_id", "Official");
select_by_name("id-packaging_id", "Jewel Case");

function select_by_name(id, name) {
	var e = document.getElementById(id);
	if (e && e.selectedIndex == 0) {
		for (var i = 0; i < e.options.length; i++) {
			if (e.options[i].text == name) {
				e.selectedIndex = i;
			}
		}
	}
}

