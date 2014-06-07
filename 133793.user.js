// ==UserScript==
// @name           Pokemon Vortex Trade Helper
// @include        http://*.pokemonvortex.org/trade.php?cat=puft&type=*
// ==/UserScript==

unsafeWindow.setAllCheckboxes = function (op) {
	var tdTags = document.querySelectorAll('td'), checkBox;

	for (var i = 0; i < tdTags.length; i++) {
		checkBox = tdTags[i].querySelector('input[type="checkbox"]');
		if (checkBox) {
			if ((op == 'all' && !checkBox.checked) || 
				(op == 'none' && checkBox.checked) || 
				(op == 'opposite')) {
				checkBox.click();
			}
		}
	}
}

unsafeWindow.selectExcessPokemon = function () {
	var tdTags = document.querySelectorAll('td');
	var lastName = '', highestExp = 1, lastCheckBox, exp, name, checkBox;

	for (var i = 0; i < tdTags.length; i++) {
		checkBox = tdTags[i].querySelector('input[type="checkbox"]');
		if (checkBox) {
			if (checkBox.checked) {
				checkBox.click();
			}
			
			exp = parseInt( tdTags[i].parentNode.getElementsByTagName('td')[2].textContent.replace(/[^0-9]/g, '') );
			name  = tdTags[i].querySelector('strong a').textContent;

			if ( name != lastName ) {
				lastName = name;
			} else if (exp <= highestExp) {
				checkBox.click();
				continue;
			} else {
				lastCheckBox.click();
			}

			highestExp = exp;
			lastCheckBox = checkBox;
		}
	}
}

function init() {
	var container = document.createElement('p');
	container.setAttribute('class', 'optionsList autowidth');
	container.innerHTML += '<a href="#" class="deselected" onclick="setAllCheckboxes(\'all\');">Select All</a> | ';
	container.innerHTML += '<a href="#" class="deselected" onclick="setAllCheckboxes(\'none\');">Unselect All</a> | ';
	container.innerHTML += '<a href="#" class="deselected" onclick="setAllCheckboxes(\'opposite\');">Inverse Select</a> | ';
	container.innerHTML += '<a href="#" class="deselected" onclick="selectExcessPokemon();">Select Excess Pokemon</a>';
	
	var viewTag = document.querySelectorAll('p[class="optionsList autowidth"]')[1];
	viewTag.parentNode.insertBefore(container, viewTag.nextSibling);
}

init();