// ==UserScript==
// @name           ilovecinema - torrents.ru
// @namespace      http://userscripts.org/users/28106
// @include        http://ilovecinema.ru/films/*/
// ==/UserScript== 

function init() {
  movie = $('div.header p.eng_name').text();
  if(!movie){
    movie = $('div.header h1').text();
  }
  
  if(movie){
    link  = '<p>';
    link += '<img src="http://static.torrents.ru/favicon.ico" /> '
    link += '<a href="http://torrents.ru/forum/tracker.php?o=10&nm=' + movie + '#results" target="_blank">'
    link += 'Найти на torrents.ru'
    link += '</a>'
    link += '</p>';
  
    $partners = $('div.main div.col1 div.film_partners');
    if($partners.length) {
      $partners.prepend(link);
    }
    else {
      $('div.main div.col1').append('<div class="film_partners">' + link + '</div>');
    }
  }
}


$ = unsafeWindow.jQuery;
if(!$) {
	alert("GM script need page to have jQuery");
}
else {
  init();
}