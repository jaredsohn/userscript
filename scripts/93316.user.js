// ==UserScript==
// @name           CSS something
// @namespace      http://userscipts.org
// @description    CSS something
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// ==/UserScript==

function createOption(oName) {
	var t = document.createElement('option');
	t.innerHTML = oName;
	return t;
}
function createElement(type,el) {
	var x = document.createElement(type);
	el = el.split('|');
	for (var e = 0; e < el.length; e++) {
		x.setAttribute(el[e].split('=')[0],el[e].split('=')[1]);
	}
	return x;
}
function update(one, two, three) {
	document.getElementById('newForm').setAttribute('action', one);
	document.getElementById('firstSearch').setAttribute('value', two);
	document.getElementById('secondSearch').setAttribute('name', three);
	if (two == '') document.getElementById('firstSearch').removeAttribute('name');
}

var searchbars = document.getElementById('searchbars');

var li = searchbars.getElementsByTagName('li');
for (var e = 0; e < li.length; e++) li[e].style.display = 'none'

var dropdown = document.createElement('select');

dropdown.addEventListener('click', function () {
	setting = this.options[this.selectedIndex].text;
	if (setting == 'Torrents') update('torrents.php', 'advanced', 'groupname');
	if (setting == 'Artist') update('artist.php', '', 'artistname');
	if (setting == 'Requests') update('requests.php', '', 'search');
	if (setting == 'Forums') update('forums.php', 'search', 'search');
	if (setting == 'Log') update('log.php', '', 'search');
	if (setting == 'Users') update('user.php', 'search', 'search');
	if (setting == 'Wiki') update('wiki.php', 'search', 'search');
}, false);

var options = ['torrents', 'artist', 'requests', 'forums', 'log', 'users', 'wiki'];
for (var i = 0; i < options.length; i++)
	dropdown.appendChild(createOption(options[i].substr(0,1).toUpperCase() + options[i].substr(1)));

newForm = createElement('form', 'method=get|action=torrents.php|id=newForm');
newForm.appendChild(createElement('input', 'type=hidden|value=advanced|name=action|id=firstSearch'));
newForm.appendChild(createElement('input', 'type=text|size=17|name=groupname|id=secondSearch'));

var newSearch = document.createElement('li');
newSearch.appendChild(newForm);

searchbars.getElementsByTagName('ul')[0].appendChild(dropdown);
searchbars.getElementsByTagName('ul')[0].appendChild(newSearch);




