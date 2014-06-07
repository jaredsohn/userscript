// ==UserScript==
// @name                RiddleLimiter For Firefox
// @namespace           hentaiverse.org
// @description         修改小马选项为单选
// @match               http://hentaiverse.org/?s=Battle*
// @icon                http://g.e-hentai.org/favicon.ico
// @version             1
// @author              ggxxsol
// original author      ChosenUno   
// ==/UserScript==
//本脚为ChosenUno的RiddleLimiter修改而来，从而可以应用到火狐（Firefox）或者谷歌浏览器（Google Chrome）。
function riddleLimit() {
	riddleform = document.getElementById('riddlemaster');
	form = riddleform.parentElement;
	table = document.createElement('table');
	table.setAttribute('style', 'margin: 0;padding-left: 160px; float: left;');
	table.innerHTML = '<tbody><tr></tr><tr></tr></tbody>';
	array = ['A', 'B', 'C', 'D'];
	for (i in array) {
		tdInput = document.createElement('td');
		tdLabel = document.createElement('td');
		element = document.createElement('input');
		label = document.createElement('label');
		label.innerHTML = array[i];
		element.setAttribute('name', 'riddlemaster');
		element.setAttribute('type', 'radio');
		element.setAttribute('value', array[i]);
		tdInput.appendChild(element);
		tdLabel.appendChild(label);
		table.children[0].children[0].appendChild(tdInput);
		table.children[0].children[1].appendChild(tdLabel);
	}
	form.insertBefore(table, riddleform);
	form.removeChild(riddleform);
	table.nextElementSibling.setAttribute('style', 'position:relative; top:3px; cursor:pointer;left: -50px;');
	}
if (document.getElementById('riddlemaster')!=undefined)
{
riddleLimit();
}