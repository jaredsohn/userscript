// ==UserScript==
// @name           FWZ: Hi :D
// @namespace      I still have no idea what this is supposed to be
// @description    Says "Hi :D" to everyone on IDC
// @include        http://www.forumwarz.com/idc
// ==/UserScript==

function newPair() {
	for(i=1;i<document.getElementsByTagName("h1").length;i++)
		add_text("Hi "+document.getElementsByTagName("h1")[i].children[0].href.replace(/(.*\/|%20)/g," ")+" :D");
	document.getElementById("get_online_users_hi").click();
}

function add_text(line) {
	document.getElementById("boring_stuff").value = line;
	document.getElementById("HI_COLON_DEE").click();
}

var where, newElement;
where = document.getElementById('idc_form');
if (where) {
	newElement = document.createElement('input');
	newElement.setAttribute("value", "clickpost");
	newElement.setAttribute("id", "get_online_users_hi");
	newElement.setAttribute("onclick", "get_users()");
	newElement.setAttribute("type", "button");
	newElement.setAttribute("style", "visibility:hidden");
	newElement.innerHTML  = "<script>function get_users(){if (CLK.cco('d3c4c62d2471a012')) { CLK.co('d3c4c62d2471a012'); new Ajax.Request('/idc/who_online/1', {asynchronous:true, evalScripts:true, onComplete:function(request){CLK.dc('d3c4c62d2471a012')}, onFailure:function(request){CLK.ec('d3c4c62d2471a012')}, parameters:'authenticity_token=' + encodeURIComponent('H5jrOqBQCi+fIeFyIKZytTukIZx3EsB4vdmLTsmlWcg=')}); };s}</script>";
	where.parentNode.insertBefore(newElement, where.nextSibling);

    newElement = document.createElement('input');
	newElement.setAttribute("value", "clickpost");
	newElement.setAttribute("id", "HI_COLON_DEE");
	newElement.setAttribute("onclick", "javascript: submitform()");
	newElement.setAttribute("type", "button");
	newElement.setAttribute("style", "visibility:hidden");
	newElement.innerHTML  = '<script type="text/javascript">function submitform(){if(document.forms[0].onsubmit()){document.forms[0].submit();}}</script>';
    where.parentNode.insertBefore(newElement, where.nextSibling);
	
	newElement = document.createElement('input');
	newElement.setAttribute("value", "Hi :D");
	newElement.setAttribute("id", "gettem_boyos");
	newElement.setAttribute("type", "button");
	newElement.addEventListener('click', newPair, false)
    where.parentNode.insertBefore(newElement, where.nextSibling);
}

document.getElementById("get_online_users_hi").click();