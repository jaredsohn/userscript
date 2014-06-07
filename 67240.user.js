// ==UserScript==
// @name           Ogame cleaner
// @namespace      Laymain
// @description    Ogame cleaner with advanced jump gate (All languages)
// @include        http://*/game/index.php*
// ==/UserScript==

var sid = location.search.split('&')[1].split('=')[1];
// Begin of Configuration
var darkmatter = true;
var jump_gate_text = 'Sprungtor';
var advanced_jump_gate = true;
var external_links = false;
var internal_links = new Array(
	{name:'Rundmail', url:'index.php?page=allianzen&session='+sid+'&a=17', color:'red'},
	{name:'Member Verwalten', url:'index.php?page=allianzen&session='+sid+'&a=7&sort1=5&sort2=1'},
	{name:'Alliance Member List', url:'index.php?page=allianzen&session='+sid+'&a=4&sort1=3&sort2=0'}
	);
var elems = new Array();
var elems = ['page=commander', 'page=offiziere', 'page=micropayment', 'board.', 'tutorial.', 'regeln.', 'impressum.', 'go=about'];
// End of Configuration
if (!darkmatter)
	elems.push('page=trader');

if (advanced_jump_gate && location.search.indexOf('gid=43', 0) >= 0)
{
	var tables = document.getElementById('content').getElementsByTagName('table');
	if (tables.length >= 5)
	{
		var regexp = /(\([0-9]+)/;
		var trs = tables[3].getElementsByTagName('tr');
		for (var i = 1; i < (trs.length - 1); i++)
		{
			var ths = trs[i].getElementsByTagName('th');
			ths[1].innerHTML += '<input id="buttonMax'+i+'" type="button" value="max" onclick="this.previousSibling.value='+ths[0].innerHTML.match(regexp)[0].substr(1)+'">';
		}
		trs[i].getElementsByTagName('th')[0].innerHTML += '&nbsp;<input type="button" value="All" onclick="for (var i = 1; i < '+(trs.length - 1)+'; i++)document.getElementById(\'buttonMax\'+i).click();">&nbsp;<input type="reset">';
	}
}
var obj = document.getElementById('darkmatter2');
if (obj) obj.parentNode.removeChild(obj);
var obj = document.getElementById('combox_container');
if (obj) obj.parentNode.removeChild(obj);
var td = document.getElementById('menu').getElementsByTagName('td');
for (var i = 0; i < td.length; i++)
	for (var elem in elems)
		if (td[i].innerHTML.indexOf(elems[elem], 0) >= 0)
		{
			if (elems[elem] == 'tutorial.' && jump_gate_text)
				td[i].innerHTML = '<div style="text-align:center;"><a href="index.php?page=infos&session='+sid+'&gid=43">'+jump_gate_text+'</a></div>';
			else
				td[i].setAttribute('style', 'display:none;');
		}
var last_item = td[i - 1].parentNode;
if (external_links || internal_links)
{
	if (external_links)
		for (var key in external_links)
		{
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.innerHTML = '<div style="text-align:center;"><a target="_blank" href="'+external_links[key].url+'" style="color:'+external_links[key].color+';">'+external_links[key].name+'</a></div>';
			tr.appendChild(td);
			last_item.parentNode.insertBefore(tr, last_item);
		}
	if (internal_links)
		for (var key in internal_links)
		{
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.innerHTML = '<div style="text-align:center;"><a href="'+internal_links[key].url+'" style="color:'+internal_links[key].color+';">'+internal_links[key].name+'</a></div>';
			tr.appendChild(td);
			last_item.parentNode.insertBefore(tr, last_item);


		}
	last_item.parentNode.removeChild(last_item);
}
var resources = document.getElementById('resources');
if (resources && !darkmatter)
{
	var td = resources.getElementsByTagName('td');
	td[13].parentNode.removeChild(td[13]);
	td[8].parentNode.removeChild(td[8]);
	td[3].parentNode.removeChild(td[3]);
}
var header_top = document.getElementById('header_top');
if (header_top)
{
	var img = header_top.getElementsByTagName('img');
	for (var i = img.length - 1; i > 4; i--)
		if (img[i].src.indexOf('ikon_un.gif', 0) >= 0)
			img[i].setAttribute('style', 'display:none;');
}
if (obj = document.getElementById('content'))
	obj.style.height = 'auto';
document.getElementsByTagName('body')[0].setAttribute('style', 'overflow:auto;');

