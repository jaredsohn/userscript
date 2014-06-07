// ==UserScript==
// @name           xkiv-metro-craft-helper
// @namespace      xKiv
// @include        http://www.metroplexity.com/crafting.php*
// ==/UserScript==

var recipeB = document.evaluate(".//form[@action='crafting.php'][input[@type='radio']]/b",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var rrB = recipeB.snapshotLength;
if (rrB > 0) {
	// copy each recipe name to it's B so that we can filter on it even though we mangle the displayed value later
	var rrBi;
	for (rrBi=0; rrBi < rrB; rrBi++) {
		var rrBcell = recipeB.snapshotItem(rrBi);
		var rrBtext = rrBcell.textContent.toLowerCase().toString();
		rrBcell.setAttribute('recipe',rrBtext.replace(/(.)/g,'$1-'));
	}
	// add filter
		var fforms = document.evaluate(".//form[@action='crafting.php']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
	var fform = fforms.snapshotItem(0);

	var newPane = document.createElement('div');
	newPane.id = 'xKiv-clicker';
	var strHTML = '<center>Recipe filter: <input type="text" name="xkiv-recipefilter" id="xkiv-recipefilter"></input>&nbsp;<button onclick="return false;" id="xkiv-recipeclearbutton" >Clear</button><input type="checkbox" name="xkiv-recipefilter-disabled-toggle" id="xkiv-recipefilter-disabled-toggle">Hide disabled recipes</input</center>';
	newPane.innerHTML = strHTML;

	fform.parentNode.insertBefore(newPane,fform);
	var ifEl = document.getElementById('xkiv-recipefilter');
	var ifClearEl = document.getElementById('xkiv-recipeclearbutton');
	var ifDisabledToggleEl = document.getElementById('xkiv-recipefilter-disabled-toggle');

	var blurFunCallback;
(function() {
	var currentval=ifEl.value.toLowerCase();
	var currentDTval=ifDisabledToggleEl.checked;
	function blurFun() {
		var j;
		var needsToKeep = ifEl.value.toLowerCase();
		var disabledToggle = ifDisabledToggleEl.checked;
		if (currentval == needsToKeep && currentDTval == disabledToggle) {
			// don't bother
			return;
		}
		currentval = needsToKeep;
		currentDTval = disabledToggle;
		var curRE = new RegExp(currentval,'i');
		if (GM_setValue != null) {
			GM_setValue('filterval', currentval);
			GM_setValue('filterval-disabledToggle', disabledToggle);
		}
		for (j = 0; j < rrB; j++) {
			var z = recipeB.snapshotItem(j);
			if (z != null) {
				var y = z.getAttribute('recipe');
				var keepdisabled = true;
				if (disabledToggle) {
					var checkel = z.previousSibling;
					while (checkel.nodeType != 1) { checkel = checkel.previousSibling; }
					if (checkel.disabled) {
						keepdisabled = false;
					}
				}
				if (keepdisabled && curRE.exec(y)) {
					z.parentNode.parentNode.style.display='block';
				} else {
					z.parentNode.parentNode.style.display='none';
				}
			}
		}
	}

	ifEl.addEventListener('keyup', function() { blurFun(); } , false);
	ifClearEl.addEventListener('click', function() { ifEl.value=''; blurFun(); } , false);
	ifDisabledToggleEl.addEventListener('click', function() { blurFun(); } , false);
	blurFunCallback = blurFun;
})();

}

var cells = document.evaluate(".//form[@action='crafting.php']/select/option[@value!='0']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var recipes = document.evaluate(".//form[@action='crafting.php'][input[@type='radio']]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

var ingr = new Object();
var ingrRe = new Object();
var ingrAr = new Array();

var cc = cells.snapshotLength;
var rr = recipes.snapshotLength;

function preg_quote( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: preg_quote("$40");
    // *     returns 1: '\$40'
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: '\*RRRING\* Hello\?'
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

    return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}

function addIngrRe(ingredient, ingrText) {
	ingr[ingredient] = ingrText.replace(/(.)/g,'$1+-+');
	ingrRe[ingredient] = new RegExp(preg_quote(ingredient),'ig');
}

if (cc > 0 && rr > 0) {
	var ingrRe = /^(.*) \(([0-9]*)\)$/;
	var idx;
	for (idx = 0; idx < cc; idx++) {
		var ss = cells.snapshotItem(idx);
		var ingrText = ss.text;
		var reRes = ingrRe.exec(ingrText);
		if (reRes == null)
			continue;
		var ingredient = reRes[1];
		var ingredientAmt = reRes[2];
		addIngrRe(ingredient, '[' + ingredient + '] (' + ingredientAmt + ')');
		addIngrRe('>' + ingredient + '<', '>' + ingrText + '<');
	}

	for (k in ingr)
		if (ingr.hasOwnProperty(k)) {
			ingrAr.push(k);
		}
	ingrAr.sort(function(a,b) {return b.length - a.length;});
	var rIdx;
	for (rIdx = 0; rIdx < rr; rIdx++) {
		var rcell = recipes.snapshotItem(rIdx);
		var rtext = rcell.innerHTML;
		var kidx;
		for (kidx=0; kidx<ingrAr.length; kidx++) {
			var k = ingrAr[kidx];
			rtext	= rtext.replace(ingrRe[k],ingr[k]);
		}
		rtext=rtext.replace(/(<input (?![^>]*type="hidden")(?![^>]*value="Craft!")(?![^>]*name="nummake")(name|type))/gi,'<div><label>$1');
		rtext=rtext.replace(/<br ?\/?>/gi,'</label></div>');
		rtext=rtext.replace(/\+-\+/g,'');
		rcell.innerHTML=rtext;
	}
}

// replace snapshot after the above invalidated it
recipeB = document.evaluate(".//form[@action='crafting.php']/div/label[input[@type='radio']]/b",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
rrB = recipeB.snapshotLength;
// and decode
if (rrB > 0) {
	// copy each recipe name to it's B so that we can filter on it even though we mangle the displayed value later
	var rrBi;
	for (rrBi=0; rrBi < rrB; rrBi++) {
		var rrBcell = recipeB.snapshotItem(rrBi);
		var rrBtext = rrBcell.getAttribute('recipe');
		rrBcell.setAttribute('recipe',rrBtext.replace(/(.)-/g,'$1'));
	}
}


if (GM_getValue != null) {
	var curFilterVal = GM_getValue('filterval');
	var curDisabledToggle = GM_getValue('filterval-disabledToggle', false);

	ifDisabledToggleEl.checked = curDisabledToggle;
	if ((curFilterVal != '' && curFilterVal != null) || curDisabledToggle) {
		ifEl.value = curFilterVal;
		blurFunCallback();
	}
}


