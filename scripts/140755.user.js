// ==UserScript==
// @name           free-lance.ru blog filter
// @namespace      https://www.free-lance.ru/
// @description    blablabla
// @include        http://www.free-lance.ru/blogs/*
// @include        https://www.free-lance.ru/blogs/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

var banlist;

$('div.b-footer__col_help > ul').append('<li class="b-footer__item"><a href="#" class="b-footer__link" id="hiddenbloggers">Скрытые блоггеры</a></li>');

var banlistelement = $('<div id="banlistelement"><a href="#" id="hidelist" style="float: right; text-decoration: none;">×</a>Не показывать записи от: <p style="font-size: 11px;">(клик удаляет пользователя из бан-листа)<br/><br/></p><ul></ul></div>').css({
  position: 'fixed',
  zIndex: '9999',
  width: '300px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 5px 10px rgba(0,0,0,0.2), 0 0 2px rgba(0,0,0,0.2)',
  left: '50%',
  top: '50%',
  margin: '-200px 0 0 -150px',
  padding: '16px',
  fontSize: '12px',
  display: 'none',
  color: '#888'
});

function loadList() {
  banlist = GM_listValues();
  var element = banlistelement.find('ul');
  element.children().remove();
  for (id = 0; id < banlist.length; id++) {
    element.css({
      listStyle: 'none'
    }).append('<li><a href="#" class="blremove" title="Вернуть записи этого пользователя" data-name="' + banlist[id] + '">' + GM_getValue(banlist[id]) + ' [' + banlist[id] + ']</a></li>');
  }
}
loadList();

$('body').append(banlistelement);

banlistelement.on('click', '#hidelist', function(){
  banlistelement.fadeOut(500);
  return false;
});

banlistelement.on('click', '.blremove', function(){
  var name = $(this).data('name');
  $('.' + name).slideDown(500);
  GM_deleteValue(name);
  loadList();
  return false;
});

$('div.b-footer__col_help > ul').on('click', '#hiddenbloggers', function(){
  banlistelement.fadeIn(500);
  return false;
});

$('div.blog, td.box2').on('click', '.hidethisblogger', function(){
  var name = $(this).data('name');
  var fullname = $(this).data('fullname');
  GM_setValue(name, fullname);
  $('.' + name).slideUp(500);
  loadList();
  return false;
});

//  удаляем блоги
$('div.blog').each(function(){
  var name = $(this).find('div.frllogin > a:not(.ac-pro, a[href="/about/team/"]):eq(1), div.emplogin > a:not(.ac-epro, a[href="/about/team/"]):eq(1)');
  var fullname = name.prev('a').html();
  var button = $('<a href="#hidethisblogger" class="hidethisblogger" title="Скрывать блоги и комментарии этого пользователя">Игнорировать</a>');
  button.data('name', name.attr('title')).data('fullname', fullname).css('padding-right', '10px');
  name.closest('.blog').find('.footer > .commline').prepend(button, " ");
  $(this).addClass(name.attr('title'));
  for (id = 0; id < banlist.length; id++) {
    if (name.attr('title') == banlist[id]) {
      $(this).hide();
    } 
  }
});

//  удаляем комменты
$('span.empname11, span.frlname11').each(function(){
  var name = $(this).find('a:eq(1)');
  var fullname = name.parent().children('a:first-child').html();
  var button = $('<a href="#hidethisblogger" class="hidethisblogger" title="Скрывать блоги и комментарии этого пользователя">Игнорировать</a>');
  button.data('name', name.html()).data('fullname', fullname).css({ color: '#f33'});
  var place = name.closest('td').find('table td:first-child');
  if (place.length != 1) { 
    place = name.closest('table').closest('tr').next().find('.commline');
    place.prepend(button, " | ");
  } 
  else {
    place.append(" | ", button);
  }
  $(this).closest('table').css('display', 'block').addClass(name.html());
  for (id = 0; id < banlist.length; id++) {
    if (name.html() == banlist[id]) {
      $(this).closest('table').hide();
    }  
  }
});