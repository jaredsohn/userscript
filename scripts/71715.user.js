// ==UserScript==
// @name           ek$iaio
// @namespace      http://userscripts.org/users/134635/scripts
// @description    ek$inaap ve ek$iue ikisi bir arada
// @author         dandikos
// @version        0.1
// @include        http://sozluk.sourtimes.org/show.asp?*
// @include        http://www.eksisozluk.com/show.asp?*
// ==/UserScript==

var eksi_stats = function ustats(uname,id){	
	var url = "http://www.eksistats.com/index.php?page=tek&nick="+uname;
	var el = document.createElement("iframe");
	el.setAttribute('src', url);
	el.setAttribute('width', '250');
	el.setAttribute('height', '12');
	el.setAttribute('frameborder', '0');
	el.setAttribute('scrolling', 'no');
	prnt = document.getElementById("m"+id).parentNode;
	prnt.insertBefore(el,prnt.firstChild);
	tr = document.getElementById("vst"+id).parentNode;
	tr.removeChild(tr.firstChild);
};

function js_append(script){
	var head = document.getElementsByTagName('head')[0];
	var new_script = document.createElement('script');
	new_script.setAttribute('type', 'text/javascript');
	new_script.innerHTML = script;
	head.appendChild(new_script);
}
document.onLoad = js_append(eksi_stats);

window.addEventListener(
	'load',
	function() {
		var authors = document.evaluate("//div[@class='aul']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
		for (var i = 0; i < authors.snapshotLength; i++) {
			author = authors.snapshotItem(i);
			injection = author.getElementsByTagName('tr')[0];
			id = injection.childNodes[1].firstChild.innerHTML.substr(1);			
			athrst = '<td><a onmousedown="md(this)" onmouseup="bn(this)" '
					 +'onmouseover="ov(this)" onmouseout="bn(this)" '
					 +'class="but" href="javascript:ustats(\''
					 + author.childNodes[1].innerHTML 
					 +'\',\''+id+'\')">&nbsp;cinsi ne ki bunun?&nbsp;</a></td>';			
			athrbtn = '<td><a target="_blank" onmousedown="md(this)" onmouseup="bn(this)" '
					  +'onmouseover="ov(this)" onmouseout="bn(this)" class="but" '
					  +'title="yazarın bu başlıktaki tüm yazıları"'
					  +'href="http://sozluk.sourtimes.org/show.asp?t='
					  +document.getElementsByName('t').item(0).value
					  +'/@'+author.childNodes[1].innerHTML+'">&nbsp;'+'/@'+'&nbsp;</a></td>';			
			injection.innerHTML = athrst + injection.innerHTML + athrbtn;
		}
	},
false);