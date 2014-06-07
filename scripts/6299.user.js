// ==UserScript==
// @namespace     http://www.tweaksthelimbs.org/greasemonkey
// @name          Pandora convert purchase links
// @description   Changes the Amazon purchase links on a profile page to point to LaLa.com
// @include       http://www.pandora.com/people/*
// ==/UserScript==

var list = document.getElementsByTagName('table')[2];
var rows = list.getElementsByTagName('tr');
for(i=1;i<rows.length;i++){
   artist = rows[i].getElementsByTagName('a')[3].innerHTML;
   amazon = rows[i].getElementsByTagName('a')[4];
   amazon.setAttribute('href','http://www.lala.com/frontend/action/artist?Q='+escape(artist)+'&uQ='+escape(artist)+'&eQ='+escape(artist));
   amazon.innerHTML = '<img border="0" title="Search for artist on LaLa.com" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAKdJREFUOE9j/P//PwMDw/+f34AkELwJF4Aw4EBk5QcIm5GdC0QBNfz78RWIXvmzAtHPtY1oCCIOUQMyHU31p1QlNATUj6wHpAFuNqZqiAiyHqgGoBBcNbKTkAUhDmOAuBtNAmInVikUDXCrgZ4DAjQ9EFksGiCq4Xrg9lNPA9BeYp2EHII4PQ2JBxKClZyIw68HPWmQnPggAQJJgnCr4DENT6eQpAoEANJ6ywSSyDQYAAAAAElFTkSuQmCC">';
}

//.user.js