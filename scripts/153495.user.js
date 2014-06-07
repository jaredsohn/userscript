// ==UserScript==
// @name Travian: trav-menu
// @description Travian: hotlinks in left menu (v1.2)
// @version 1.2
// @include http://*.travian.*/*
// ==/UserScript==
// (c) Anton Fedorov aka DataCompBoy, 2006-2009
// Clan S4 <KazakiYuV2>.

(function(){
  getElementsByClass = function (searchClass,node,tag) {
	  var classElements = new Array();
	  if ( node == null )
		  node = document;
	  if ( tag == null )
		  tag = '*';
	  var els = node.getElementsByTagName(tag);
	  var elsLen = els.length;
	  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	  for (i = 0, j = 0; i < elsLen; i++) {
		  if ( pattern.test(els[i].className) ) {
			  classElements[j] = els[i];
			  j++;
		  }
	  }
	  return classElements;
  }

  var menu = document.getElementById('sleft');
  if(!menu) menu = document.getElementById('side_navi');
  if(menu) menu = menu.getElementsByTagName('p')[0];
  if(!menu) {
	menu = getElementsByClass("menu",document.body,"td");
	if (menu) menu=menu[0];
  }
  if (menu) {
	menu.innerHTML += "<br>";
	menu.innerHTML += "<a href='/allianz.php'>Альянс</a>";
//	  menu.innerHTML += "<a href='/allianz.php?s=2'>Форум альянса</a>";
	menu.innerHTML += "<a href='/allianz.php?s=3'>Нападения</a>";
	menu.innerHTML += "<br>";
	menu.innerHTML += "<a href='/build.php?gid=17'>Рынок</a>";
	menu.innerHTML += "<a href='/build.php?gid=17&t=3'>Рынок++</a>";
	menu.innerHTML += "<br>";
	menu.innerHTML += "<a href='/build.php?gid=16'>Пункт сбора</a>";
	menu.innerHTML += "<a href='/build.php?gid=19'>Казарма</a>";
	menu.innerHTML += "<a href='/build.php?gid=20'>Конюшня</a>";
	menu.innerHTML += "<a href='/build.php?gid=21'>Мастерская</a>";
  }
})();
