// ==UserScript==
// @name           klavogonki: hide text
// @namespace      klavogonki
// @include        http://klavogonki.ru/g/*
// @include        http://www.klavogonki.ru/g/*
// @version        1.2
// ==/UserScript==

function init()
{
	var where = $("param_preview").nextSibling.nextSibling.nextSibling;
	var elem = document.createElement("span");
	elem.innerHTML =
		"<" + "input id='param_hidetext' type='checkbox' onclick='param_hidetext_click.call(this)'/>" +
		"<" + "label for='param_hidetext'>Скрывать текст</label><br /" + ">";
	where.parentNode.insertBefore(elem, where);
	$("param_hidetext").checked = getPrefCookie("hidetext") == "true";
	if ($("param_hidetext").checked)
		$("typetext").style.visibility = "hidden";
	document.observe("keydown", function(event)
	{
		if (event.ctrlKey && event.keyCode == 191)
			$("param_hidetext").click();
	});
}

function param_hidetext_click()
{
	setPrefCookie("hidetext", this.checked);
	if (this.checked)
		$("typetext").style.visibility = "hidden";
	else
		$("typetext").style.visibility = "visible";
}

var script = document.createElement("script");
script.innerHTML = param_hidetext_click + "(" + init + ")()";
document.body.appendChild(script);