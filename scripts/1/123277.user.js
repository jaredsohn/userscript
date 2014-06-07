// ==UserScript==
// @name           Wybór wzywanych jednostek
// @namespace      Szat.Plemiona
// @include        http://pl*.plemiona.pl/game.php?*screen=place*mode=call*
// ==/UserScript==

var table = document.getElementById("village_troup_list");
var headers = table.getElementsByTagName('tr')[0].getElementsByTagName('th');
var storedSettings = unsafeWindow.localStorage.getItem("Szat.Plemiona.calledUnitsCheckboxesSettings");
var cbSettings;
if (storedSettings)
	cbSettings = JSON.parse(storedSettings);
else
	cbSettings = new Array(12);

for (var i = 2; i < headers.length - 1; i++) {
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.checked = cbSettings[i-2];
	checkbox.index = i-2;
	checkbox.addEventListener("click", function(e){
			cbSettings[e.target.index] = e.target.checked;
			unsafeWindow.localStorage.setItem("Szat.Plemiona.calledUnitsCheckboxesSettings", JSON.stringify(cbSettings));
		}, false);
	headers[i].appendChild(checkbox);
}


unsafeWindow.CallSupport.toggle = function(){
	var CallSupport = unsafeWindow.CallSupport;
	var $ = unsafeWindow.$;

	var row = this.parentNode.parentNode;
	var headers = row.parentNode.parentNode.getElementsByTagName('tr')[0].getElementsByTagName('th');
	var cells = row.getElementsByTagName('td');
	for (var i = 2; i < cells.length - 1; i++) {
		var cell = $(cells[i]);
		var selected = headers[i].getElementsByTagName('input')[0].checked;
		var input = $('<input type="text" size="2" />').val(selected ? cell.text(): 0).attr('name', cell.data('unit'));	   
        input.data('max', cell.text()).change(CallSupport.validate);
        cell.empty().append(input)
	}
	$(this).val('Wezwij');
	$(this).unbind().click(CallSupport.submit);
};



