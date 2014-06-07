// ==UserScript==

// @name           CSS saver

// @namespace      http://userscript.org

// @description    CSS saver

// @include        http*://*what.cd/user.php?action=edit&userid=*

// ==/UserScript==



//config start

var boxes = "4";

//config end





function getSaves(num) {

	var save = GM_getValue('css_saves'+num);



	if (save == "undefined" || !save) { return ""; }

	else { return save; }

}

function cssUpdate() {

	var e = "13";

	for (var i = 0; i < boxes; i++) {

		var newcss = document.getElementsByTagName("input")[e].value;

		GM_setValue('css_saves'+i, newcss);

		e++;

	}

}

function start() {

	var cssBox = document.getElementsByTagName("tr")[1];



	var add = 'type="text"><br />';

	for (var i = 0; i < boxes; i++) {

		add += "<input type=\"text\" class=\"addcss"+i;

		add += "\" value=\""+getSaves(i)+"\" size=\"40\"";
		add += "onclick='document.getElementsByTagName(\"input\")[12].value = this.value;'><br />";

	}

	submitButton = document.getElementsByTagName("input")[40];

	submitButton.addEventListener('click', cssUpdate, true);



	cssBox.innerHTML = cssBox.innerHTML.replace("type=\"text\">", add);

}



start();

