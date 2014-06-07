// ==UserScript==
// @name           SSW Make Brown Pills
// @namespace      http://homeworlds.secretsocietywars.com/falcotron
// @description    Make Brown Pill the default recipe, if you know it
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=combine*
// ==/UserScript==

function fixup() {
	var frms = document.evaluate('//form[contains(@action,"a=recipes")]', 
								 document, null, 
								 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
								 null);
	if (frms.snapshotLength <= 0) return "no form";
	var recipe_form = frms.snapshotItem(0);
	if (!recipe_form.hasChildNodes()) return "no children";
	var children = recipe_form.childNodes;
	for (var i = 0; i != children.length; ++i) {
		if (children[i].nodeName.toLowerCase() == 'select') {
			var recipe_select = children[i];
			if (recipe_select.hasChildNodes()) {
				var options = recipe_select.options;
				for (var j = 0; j != options.length; ++j) {
					if (options[j].textContent == 'Brown Pill') {
						recipe_select.selectedIndex = j;
						var brown_option = options[j];
						//recipe_select.removeChild(brown_option);
						//recipe_select.insertBefore(brown_option, options[0]);
						return;
					}
				}
			}
			return "no options?";
		}
	}
	return "no select?";
}

s = fixup();
//if (s) { alert(s); }
