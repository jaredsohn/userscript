// ==UserScript==
// @name                RiddleLimiter For Firefox(Larger Ver.)
// @namespace       	hentaiverse.org
// @description      	修改小马选项为单选
// @match               http://hentaiverse.org/?s=Battle*
// @match               http://www.w3school.com.cn/tiy/t.asp?f=xdom_parser
// @icon                http://g.e-hentai.org/favicon.ico
// @version             1
// @author              ggxxsol
// original author    	ChosenUno
// ==/UserScript==
//本脚为ChosenUno的RiddleLimiter修改而来，从而可以应用到火狐浏览器（Firefox）。
function riddleLimit() {
riddleform = document.getElementById('riddlemaster');
form = riddleform.parentElement;
table = document.createElement('table');
table.setAttribute('style', 'margin: 0;padding-left: 160px; float: left;');
table.innerHTML = '<tbody><tr></tr><tr></tr></tbody>';
array = ['A', 'B', 'C', 'D'];
for (i in array) {
tdInput = document.createElement('td1');//圆圈框
tdInput.style.cssText = "padding-right: 13px";
tdLabel = document.createElement('td2');//字母框
element = document.createElement('input');//圆圈
element.setAttribute('name', 'riddlemaster');
element.setAttribute('type', 'radio');
element.setAttribute('value', array[i]);
label = document.createElement('label');//下面的字母
label.innerHTML = array[i];
label.style.cssText = "padding-right: 19px;padding-left:6px;font-weight: bold;font-size:13px";
tdInput.appendChild(element);
tdLabel.appendChild(label);
table.children[0].children[0].appendChild(tdInput);
table.children[0].children[1].appendChild(tdLabel);
	}
	form.insertBefore(table, riddleform);
	form.removeChild(riddleform);
	table.nextElementSibling.setAttribute('style', 'position:relative; top:5px; cursor:pointer;left: -30px;');
	}
if (document.getElementById('riddlemaster')!=undefined)
{
riddleLimit();
}