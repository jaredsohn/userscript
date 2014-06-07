// ==UserScript==
// @name           Smilie Search
// @namespace      something_awful
// @description    Search the big fat list of smilies on SA
// @include        http://forums.somethingawful.com/misc.php?s=&action=showsmilies
// ==/UserScript==

var id=0;

function update_filter()
{
	if(id)
		clearTimeout(id);
	id = setTimeout(filter_smilies,500);
}

function filter_smilies()
{
	var smilies = document.getElementsByClassName('smilie');

	var query = search.value;
	regex = new RegExp(query);
	for(var i=0; i<smilies.length; i++)
	{
		if(regex.test(smilies[i].childNodes[1].textContent))
			smilies[i].style.display = '';
		else
			smilies[i].style.display = 'none';
	}
}

function clear_text()
{
	search.value = '';
	search.removeEventListener('focus', clear_text, false);
}

list = document.getElementsByTagName('h3')[0];

search = document.createElement('input');
search.value = 'Filter smilies...';
search.addEventListener('focus', clear_text, false);
search.addEventListener('keyup', update_filter, false);

list.parentNode.insertBefore(search,list);