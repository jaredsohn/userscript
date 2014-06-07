// ==UserScript==
// @name           RV simplier
// @namespace      http://userscripts.org/users/65879
// @description    remove roguevampires top image
// @include        http://www.roguevampires.net/* 
// @include        http://roguevampires.net/* 
// ==/UserScript==

var $rvs_hide_logo = GM_getValue('rvs_hide_logo', 1);
var $rvs_tootip_spirits = GM_getValue('rvs_tootip_spirits', 1);

// rvs_hide_logo
if ($rvs_hide_logo) {
	var $doc_tables = document.getElementsByTagName('table');
	// exeption for login page
	if($doc_tables[1].className == "main") {
		$parent = $doc_tables[0].parentNode;
		$parent.removeChild($doc_tables[0]);
		$newBr = document.createElement("br");
		$parent.insertBefore($newBr, $doc_tables[0]); 
	}
}

// rvs_tootip_spirits
if ($rvs_tootip_spirits) {
	var spirit_list = {  
		Adept: "Agility/Strength",
		Controlled: "Defence/Strength",
		Dynamic: "Agility/Accuracy",
		Meticulous: "Accuracy/Agility",
		Mighty: "Strength/Accuracy",
		Potent: "Strength/Defence",
		Powerful: "Accuracy/Strength",
		Resolute: "Accuracy/Defence",
		Rigorous: "Strength/Agility",
		Robust: "Defence/Agility",
		Sturdy: "Defence/Accuracy",
		Versatile: "Agility/Defence"
	};
	var spirit_list_short = {  
		Adept: "agi|str",
		Controlled: "def|str",
		Dynamic: "agi|acc",
		Meticulous: "acc|agi",
		Mighty: "str|acc",
		Potent: "str|def",
		Powerful: "acc|str",
		Resolute: "acc|def",
		Rigorous: "str|agi",
		Robust: "def|agi",
		Sturdy: "def|acc",
		Versatile: "agi|def"
	};

	var $doc_spans = document.getElementsByTagName("span");
	for (ii = 0; ii <$doc_spans.length; ii++){
		if(spirit_list[$doc_spans[ii].innerHTML]) {
			$doc_spans[ii].setAttribute('title', spirit_list[$doc_spans[ii].innerHTML]);
			$doc_spans[ii].innerHTML = $doc_spans[ii].innerHTML + " <font style='font-weight:normal'> (" + spirit_list_short[$doc_spans[ii].innerHTML] + ")</font>";
			$doc_spans[ii].setAttribute('class', "attacktickets");
		}
	}
}
