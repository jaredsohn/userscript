// ==UserScript==
// @name           Runescape Advanced Search Bar
// @namespace      http://www.hellboundhackers.org/profile/Simbanafsi.html
// @description    Adds extra search options to the bar above the Runescape game window
// @include        http://world*.runescape.com/*
// ==/UserScript==


allElements = document.getElementsByTagName('div');

for (var i = 0; i < allElements.length; i++) {

	thisElement = allElements[i];

	result = thisElement.innerHTML.search(/id="menu"/);

	if (result !== -1)

	{

	defaultSearch = '<img src="http://www.runescape.com/img/playgame/kb.png" alt="" id="searchSwitcher">'+
'<input type="hidden" id="runetips" name="" value=""/>'+
'<input type="hidden" name="levels" value="All"/>'+
'<input type="hidden" name="submit" value="Simple Search"/>'+
'<input type="hidden" name="players" value="All"/>';

		
thisElement.innerHTML = '<div id="menu">'+
'<div>'+
'<a id="home" onclick="return cm()" href="http://www.runescape.com/" target="_parent">'+
'Home'+
'</a>'+
'<input id="searchType" type="hidden" value="0"/>'+
'<form id="search" action="http://www.runescape.com/kbase/search.ws" method="post" target="_blank">'+
'<span id="customSearch">'+
'<img src="http://www.runescape.com/img/playgame/kb.png" alt="" id="searchSwitcher">'+
'<text id="searchWhat">Search RuneScape.com</text>'+
'</span>'+
'<input id="i1" type="hidden"/>'+
'<input id="i2" type="hidden"/>'+
'<input id="i3" type="hidden"/>'+
'<input id="i4" type="hidden"/>'+
'<input id="i5" type="hidden"/>'+
'<input id="i6" type="hidden"/>'+
'<input id="i7" type="hidden"/>'+
'<input id="i8" type="hidden"/>'+
'<input id="i9" type="hidden"/>'+
'<input id="i10" type="hidden"/>'+
'<input name="q" id="q">'+
'<input id="t" value="Go" type="submit">'+
'</form>'+
'</div>'+
'<a id="jagex" href="http://www.jagex.com/" target="_blank">'+
'<img src="http://www.runescape.com/img/playgame/jagex.png" alt="Jagex">'+
'</a>'+
'</div>'

	}

}

i1 = document.getElementById('i1');
i2 = document.getElementById('i2');
i3 = document.getElementById('i3');
i4 = document.getElementById('i4');
i5 = document.getElementById('i5');
i6 = document.getElementById('i6');
i7 = document.getElementById('i7');
i8 = document.getElementById('i8');
i9 = document.getElementById('i9');
i10 = document.getElementById('i10');
q = document.getElementById('q');

function clearNames(){
	i1.removeAttribute("name");
	i2.removeAttribute("name");
	i3.removeAttribute("name");
	i4.removeAttribute("name");
	i5.removeAttribute("name");
	i6.removeAttribute("name");
	i7.removeAttribute("name");
	i8.removeAttribute("name");
	i9.removeAttribute("name");
	i10.removeAttribute("name");
}

function nextSearch(){

switch(document.getElementById('searchType').value){

	case '0':
	clearNames();
	document.getElementById('searchType').value = parseFloat(document.getElementById('searchType').value) + 1;
	document.getElementById('searchWhat').innerHTML='Search RuneScape Forums';
	document.getElementById('q').name='srcstr';
	document.getElementById('search').action='http://forum.runescape.com/searchthreads.ws';
	document.getElementById('search').method='post';
	q.name = 'srcstr';
	i1.name = 'show_adv_opts';
	i1.value = 1;
	i2.name = 'srcfrm';
	i2.value = -1;
	i3.name = 'created_within';
	i3.value = 'At+any+time';
	i4.name = 'updated_within';
	i4.value = 'At+any+time';
	i5.name = 'inc_sticky';
	i5.value = 1;
	i6.name = 'inc_locked';
	i6.value = 1;
	i7.name = 'inc_escalated';
	i7.value = 1;
	i8.name = 'inc_hidden';
	i8.value = 1;
	i9.name = 'serch';
	i9.value = 'Search';
	i10.name = 'search';
	i10.value = 'search';
	break;
	
	case '1':
	clearNames()
	document.getElementById('searchType').value = parseFloat(document.getElementById('searchType').value) + 1;
	document.getElementById('searchWhat').innerHTML='Search RuneScape Grand Exchange';
	document.getElementById('q').name='query';
	document.getElementById('search').action='http://itemdb-rs.runescape.com/results.ws';
	document.getElementById('search').method='post';
	i1.name = 'price';
	i1.value = 'all';
	break;

	case '2':
	clearNames()
	document.getElementById('searchType').value = parseFloat(document.getElementById('searchType').value) + 1;
	document.getElementById('searchWhat').innerHTML='Search Runetips Bestiary';
	document.getElementById('q').name='keywords';
	document.getElementById('search').action='http://www.tip.it/runescape/index.php';
	document.getElementById('search').method='get';
	i1.name = 'rs2monster';
	i1.value = '';
	i2.name = 'levels';
	i2.value = 'All';
	i3.name = 'race';
	i3.value = 0;
	break;
	
	case '3':
	clearNames()
	document.getElementById('searchType').value = parseFloat(document.getElementById('searchType').value) + 1;
	document.getElementById('searchWhat').innerHTML='Search Runetips Items Database';
	document.getElementById('q').name='keywords';
	document.getElementById('search').action='http://www.tip.it/runescape/index.php';
	document.getElementById('search').method='get';
	i1.name = 'rs2item';
	i1.value = '';
	i2.name = 'orderby';
	i2.value = 0;
	i3.name = 'Players';
	i3.value = 'all';
	i4.name = 'category';
	i4.value = 0;
	i5.name = 'subcategory'
	i5.value = 0;
	i6.name = 'cmd';
	i6.value = 8;
	i7.name = 'action';
	i7.value = 'Manage_Items';
	i8.name = 'search';
	i8.value = 1;
	i9.name = 'submit';
	i9.value = 'Simple+Search';
	break;
	
	case '4':
	document.getElementById('searchType').value = parseFloat(document.getElementById('searchType').value) + 1;
	document.getElementById('searchWhat').innerHTML='Search Runetips Shops Database';
	document.getElementById('q').name='keywords';
	document.getElementById('search').action='http://www.tip.it/runescape/index.php';
	document.getElementById('search').method='get';
	i1.name = 'rs2shops';
	i1.value = '';
	i2.name = 'Search';
	i2.value = 1;
	i3.name = 'Players';
	i3.value = 'all';
	i4.name = 'submit';
	i4.value = 'Simple+Search';
	break;
	
	case '5':
	clearNames();
	document.getElementById('searchType').value = 0;
	document.getElementById('searchWhat').innerHTML='Search RuneScape.com';
	document.getElementById('q').name='q';
	document.getElementById('search').action='http://www.runescape.com/kbase/search.ws';
	document.getElementById('search').method='post';
	break;

	
	}
}

document.getElementById('searchSwitcher').addEventListener("click", nextSearch, true);