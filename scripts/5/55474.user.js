// ==UserScript==
// @name           GBO Favs
// @namespace      gbofavs
// @include        http://german-bash.org/*
// @require        http://code.jquery.com/jquery-latest.pack.js
// ==/UserScript==

if (GM_getValue('index') == undefined)
  GM_setValue('index', '[ ]');

var quoteIds = eval('(' + GM_getValue('index') + ')');

function addQuote(id, body) {
  quoteIds.splice(0, 0, id);
  GM_setValue('index', '[' + quoteIds.join(',') + ']');
  GM_setValue(id, body);
}

function deleteQuote(id) {
  for (var i = 0; i < quoteIds.length; ++i)
    if (quoteIds[i] == id) 
      quoteIds.splice(i, 1);
  
  GM_setValue('index', '[' + quoteIds.join(',') + ']');
  GM_deleteValue(id);
}

GM_addStyle('.quote.fav { background: #C0DD93; }');
var favLink = '<span class="fav"><span class="seperator">|</span><a title="Favorisieren" href="#" onclick="return false;">Favorisieren</a></span>';
var unFavLink = '<span class="unfav"><span class="seperator">|</span><a title="Favorit löschen" href="#" onclick="return false;">Favorit löschen</a></span>';

$('.content > .quote').remove(); //Werbung

$('.header_links form span:eq(9)').after('<span><b><a title="Favoriten" class="nav" href="/fav">Favoriten</a></b></span>'); //Navi

//Favoritenseite
if (document.URL == 'http://german-bash.org/fav') {
  $('h2').text('Favoriten');
  $('.error').remove();
  
  for (var i = 0; i < quoteIds.length; ++i) {
    $('.content').append(
    '<div class="quote">' +
      '<div class="quote_header">' +
        '<span class="id"><a href="/' + quoteIds[i] + '" title="Zeige Zitat #' + quoteIds[i] + '">#' + quoteIds[i] + '</a></span>' + 
        unFavLink + 
      '</div>' + 
      '<div class="zitat">' +
        GM_getValue(quoteIds[i]) +
      '</div>' +
    '</div>');
  }
}

//Andere Seiten
else if (document.URL != 'http://german-bash.org/action/news_archiv' && document.URL != 'http://german-bash.org/')  {
  //Favoriten markieren
  for (var i = 0; i < quoteIds.length; ++i) {
    $("a[name='" + quoteIds[i] + "']").parents('.quotebox').children('.quote').addClass('fav'); }
    
  //Favorisieren-Link
  $('.quote:not(.fav) .quote_header').append(favLink);
  
  //Favorit löschen-Link
  $('.quote.fav .quote_header').append(unFavLink);
}

//Favorisieren-Handler
function favHandler() {
  var id = $(this).parents('.quote_header').children('.id').text().substring(1);
  var body = $(this).parents('.quote').children('.zitat').html();
  
  addQuote(id, body);
  
  $(this).parents('.quote').addClass('fav');
  var header = $(this).parents('.quote_header');
  header.children('.fav').replaceWith(unFavLink);
  header.children('.unfav').children('a').click(unFavHandler);
  
  return false;
}

//Favorit löschen-Handler
function unFavHandler() {
  var id = $(this).parents('.quote_header').children('.id').text().substring(1);
  
  deleteQuote(id);
  
  if (document.URL == 'http://german-bash.org/fav')
    $(this).parents('.quote').slideUp();  
  else {
    $(this).parents('.quote').removeClass('fav');
    var header = $(this).parents('.quote_header');
    header.children('.unfav').replaceWith(favLink);
    header.children('.fav').children('a').click(favHandler);
  }
  return false;
}

$('.quote_header .fav a').click(favHandler);
$('.quote_header .unfav a').click(unFavHandler);