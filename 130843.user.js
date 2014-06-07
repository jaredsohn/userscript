// ==UserScript==
// @name           Convert Jenkins tabs to a select
// @namespace      http://userscripts.org/users/445576
// @include        http://buildserverurl/*
// ==/UserScript==
document.querySelector("#viewList").style.display = "none";
var arr = document.querySelectorAll("#viewList td a"),
	viewList = document.querySelector("#viewList"),
	activeCell = document.querySelector("#viewList td.active"),
	dashboard = viewList.parentNode,
	select = document.createElement('select'),
	option;
select.style.padding = '2px';
select.style.marginBottom = '3px';
dashboard.insertBefore(select, dashboard.firstChild);
document.querySelector("#projectstatus").style.borderTop = '1px solid #BBBBBB';

option = document.createElement('option');
option.innerHTML = activeCell.innerHTML;
select.appendChild(option);

for(var i = 0; i < arr.length; i++) {
	var a = arr[i];
	var option = document.createElement('option');
	option.innerHTML = a.innerHTML;
	option.setAttribute('data-href', a.href);
	
	select.appendChild(option);
}

select.onchange = function() {
	window.location.href = this.options[this.selectedIndex].getAttribute('data-href');
};