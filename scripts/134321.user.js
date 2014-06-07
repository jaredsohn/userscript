// ==UserScript==
// @name			Search everything
// @namespace		ScriptMonkey.HentaiFoundry
// @description		Adds an option to select everything on the search pages.
// @version			1.2
// @include			*hentai-foundry.com/search.php*
// @include			*hentai-foundry.com/user-*
// @include			*hentai-foundry.com/user_pictures*
// @include			*hentai-foundry.com/cat-* 
// ==/UserScript==

var WriteToConsole = function (message) {
	if (console == undefined)
		return;

	console.debug(message);
};

var SelectAll = function () {
	var checkBoxNames = new Array("filter_male", "filter_female", "filter_yaoi", "filter_shota", "filter_loli", "filter_yuri", "filter_guro", "filter_other", "filter_teen", "filter_beast", "filter_furry", "filter_futa");
	var dropDownNames = ["filter_sex", "filter_violence", "filter_nudity", "filter_profanity", "filter_spoilers", "filter_racism"];

	for (var i = 0; i < checkBoxNames.length; i++) {
		var name = checkBoxNames[i];
		var checkBoxes = document.getElementsByName(name);

		if (checkBoxes == null)
			continue;

		for (var j = 0; j < checkBoxes.length; j++) {
			var checkBox = checkBoxes[j];

			if (checkBox.type != "checkbox")
				continue;

			checkBox.checked = true;
		}
	}

	for (var i = 0; i < dropDownNames.length; i++) {
		var name = dropDownNames[i];
		var dropDowns = document.getElementsByName(name);

		if (dropDowns == null)
			continue;

		for (var j = 0; j < dropDowns.length; j++) {
			var dropDown = dropDowns[j];
			dropDown.value = "3";
		}
	}
};

var search = document.getElementsByName("submit")[0];
var td = search.parentElement;
var searchAll = search.cloneNode(false);
searchAll.onclick = SelectAll;
searchAll.value = "Select all";

td.insertBefore(searchAll, search);
td.insertBefore(document.createElement("br"), search);
td.insertBefore(document.createElement("br"), search);