// ==UserScript==
// @name          DirtyNamesAndPages
// @namespace     ACTPOHABT (8110), Omen (12643), Zyt from dirty.ru (24177)
// @description   Заменяет скучное "Dirty.ru" на номер страницы или юзернэйм. Based on "LeproNamesAndPages" http://userscripts.org/scripts/show/35853 
// @include       http://dirty.ru/*
// @include       http://www.dirty.ru/*
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////
//Сдесь будут лежать константы.
////////////////////////////////////////////////////////////////////////////
var maleNamePrefix = 'Гражданин';   //'Mr.'; 'Мистер'; 'Господин'; 'Товарищ'; 'Пользователь'; 'User' и т.д. - префикс перед username в профиле для мужчин
var femaleNamePrefix = 'Гражданка'; //'Mrs.' 'Миссис'; 'Госпожа'; 'Товарищ'; 'Пользователь'; 'User' и т.д. префикс перед username в профиле для женщин
var showKarma = false;  //Показывать карму в заголовке после имени пользователя.

var titleTags = 'Метки'; //'Тэги'; 'Tags' - строка в заголовке для меток
var titleBroken = 'Балет'; //'Дохлая лошадь'; 'поломался' - строка в заголовке для страницы с "балетом" или дохлой лошадью.
var titleNewPost = 'Новый пост'; //строка заголовка для нового поста.
////////////////////////////////////////////////////////////////////////////


var baseSiteTitle = 'dirty.ru/';
var newtitle = '';

//Получаем относительный адресс, без якоря, например:
// '/off/index.html' из 'http://dirty.ru/off/index.html#new'
var restOfUrl = location.href.split(location.host)[1].split('#')[0];
if (restOfUrl[restOfUrl.length - 1] != '/') 
  restOfUrl += '/';

function contains(s1, s2)
{
  return s1.indexOf(s2) != -1;
}

if (contains(restOfUrl, '/user/')) //страничка с чьим-то профайлом
{
  var userName = document.getElementsByClassName('user_name_inner')[0].getElementsByTagName("h2")[0].getElementsByTagName("a")[0].textContent; // Грузим имярек

  var namePrefix = '';
  
  if ( femaleNamePrefix != maleNamePrefix )
  {//пытаемся найти элемент со строкой "Написал"\"Написала" для определения пола пользователя.
    var stats = document.getElementsByClassName('userstats');//страница с профилем

    if ( !stats || stats.length == 0 )//страница с постами\комментариями в профиля
      stats = document.getElementsByClassName('dd');

    if ( !stats || stats.length == 0 )//страница с пустыми постами\комментариями в профиле
      stats = document.getElementsByClassName('userpage_inner');

    if ( stats && stats.length > 0 )
    {
      if ( contains(stats[0].textContent, 'аписала') )//пропускаем первую букву, чтобы не мучатся с переводом LOWERCASE->UPPERCASE
        namePrefix = femaleNamePrefix + ' ';
      else
        namePrefix = maleNamePrefix + ' ';
    }
  }

  var wannabetitle = baseSiteTitle + namePrefix + userName;
  var titleTail = '';
  var karma = 'не определена';
  if ( contains(restOfUrl, 'comments') )
  {
    titleTail = '/Комментарии'
  }
  else if ( contains(restOfUrl, 'posts') )
  {
    titleTail = '/Посты'
  }
  else if ( showKarma )//if (/^\/user\/\w+(\/)?$/.test(restOfUrl)) //страничка не с постами или комментами
  {
    karma = document.getElementsByClassName('vote_result')[0].textContent; //вычисляем карму
    titleTail = ', Карма: ' + karma;
  }
  
  newtitle = wannabetitle + titleTail;
  //var usernumber = restOfUrl.match(/^\/users\/(\d+)(\/)?/)[1]; //вычисляем номер юзера
}
else if (restOfUrl == "/" || restOfUrl == '/pages/1/' || restOfUrl == '/all/') //страничка с главной
{
  newtitle = baseSiteTitle + 'Главная';
}
else if (contains(restOfUrl, '/pages/')) // страничка dirty, но не главная
{
  var page = restOfUrl.match(/^\/pages\/(\d+)\/$/)[1];
  newtitle = baseSiteTitle + page + '-я страница';
}
else if (restOfUrl == '/pics/') //Выбран фильтр "Фото"
{
  newtitle = baseSiteTitle + 'Фото';
}
else if (contains(restOfUrl, '/pics/')) //Фото n-ая страница
{
  var page = restOfUrl.match(/^\/pics\/(\d+)\/$/)[1];
  newtitle = baseSiteTitle + 'Фото ' + page + '-я страница';
}
else if (restOfUrl == '/audio/' || restOfUrl == '/audio/1/') //Выбран фильтр "Аудио"
{
  newtitle = baseSiteTitle + 'Аудио';
}
else if (contains(restOfUrl, '/audio/')) //Аудио n-ая страница
{
  var page = restOfUrl.match(/^\/audio\/(\d+)\/$/)[1];
  newtitle = baseSiteTitle + 'Аудио ' + page + '-я страница';
}
else if (restOfUrl == '/video/' || restOfUrl == '/video/1/') //Выбран фильтр "Видео"
{
  newtitle = baseSiteTitle + 'Видео';
}
else if (contains(restOfUrl, '/video/')) //Видео n-ая страница
{
  var page = restOfUrl.match(/^\/video\/(\d+)\/$/)[1];
  newtitle = baseSiteTitle + 'Видео ' + page + '-я страница';
}
else if (restOfUrl == '/posts/' || restOfUrl == '/posts/1/') //Выбран фильтр "Посты"
{
  newtitle = baseSiteTitle + 'Посты';
}
else if (contains(restOfUrl, '/posts/')) //Посты n-ая страница
{
  var page = restOfUrl.match(/^\/posts\/(\d+)\/$/)[1];
  newtitle = baseSiteTitle + 'Посты ' + page + '-я страница';
}
else if (restOfUrl == '/banned/') //Банлист
{
  newtitle = baseSiteTitle + 'Список забаненных';
}
else if ((/^\/(votes|comments|my\/inbox|news)\/\d+/.test(restOfUrl))) //страничка с постом
{
  var place = '';
  if (contains(restOfUrl, '/my/inbox/')) 
    place = 'Инбокс/';
  else if (contains(restOfUrl, '/news/')) 
    place = 'Новости/';
  else if (contains(restOfUrl, '/votes/')) 
    place = 'Голоса/';
  
  //Проверяем на аудио-пост
  var embed_player = document.getElementById('t');
  if (embed_player) 
  {
    //Заголовок аудио файла находится в атрибуте 'songname' в закодированном виде.
    newtitle = decodeURIComponent(embed_player.getAttribute('songname'));
  }
  else
  {//Обычный (не аудио-пост)
    var posts = document.getElementsByClassName('dt'); // Грузим посты
    var j = 0;//Индекс поста, из которого будет взято содержимое для заголовка.
    if (posts[j].textContent.length == 0) // Проверка на пустой пост (одна картинка например) 
    {
      j = 1;
    } // Как бы говорим взять первый коментарий, потому что в посте ничерта нет 
    var titleCandidate = posts[j].textContent;
    
    //Убираем из заголовка части добавленные в пост скриптом "Dirty.ru video post enhancer".
    var video_links_container = document.getElementById('video_links_container');
    if (video_links_container) 
    {
      var text_to_remove = video_links_container.textContent;
      titleCandidate = titleCandidate.replace(text_to_remove, '');
    }
    
    var length_title = 98;
    // Есть ли лишние буквы 
    if (titleCandidate.length > length_title) 
    {// Да есть, избавимся от них
      for (var i = 0; i <= length_title; ++i) 
      {
        newtitle = newtitle + titleCandidate[i];
      }
      newtitle = newtitle + '...';
    } // Ставим обрезанный заголовок   
    else 
    {// Или ставим заголовок как есть
      newtitle = titleCandidate;
    }
  }
  newtitle = baseSiteTitle + place + newtitle;
}
else if (restOfUrl == '/my/socialism/') //страничка с социализмом
{
  newtitle = baseSiteTitle + 'Социализм';
}
else if (restOfUrl == '/my/favourites/') //страничка с favourites
{
  newtitle = baseSiteTitle + 'Избранное';
}
else if (restOfUrl == '/my/invite/') //Инвайты
{
  newtitle = baseSiteTitle + 'Инвайты';
}
else if (restOfUrl == '/my/inbox/write/') //Новый пост в инбоксе
{
  newtitle = baseSiteTitle + 'Инбокс/Новый пост';
}
else if (restOfUrl == '/my/inbox/') //страничка с Инбоксом
{
  newtitle = baseSiteTitle + 'Инбокс'
  var count = new String(document.getElementById('js-header_inbox_link').textContent);
  if (/\d+/.test(count)) 
  {
    newtitle = newtitle + ': ' + count.match(/(\d+)/)[0];
  }
}
else if ((/^\/my\/(details|settings|amnesia)\/$/.test(restOfUrl))) //страничка с details
{
  newtitle = baseSiteTitle + 'Личная информация&Настройки';
}
else if (restOfUrl == '/my/') //страничка с моими вещами
{
  newtitle = baseSiteTitle + 'Мои вещи';
}
else if (restOfUrl == '/write/')//Написание нового поста
{
  newtitle = baseSiteTitle + titleNewPost;
}
else if (contains(restOfUrl, '/tag/') || contains(restOfUrl, '/tags/')) //Метки
{
  newtitle = baseSiteTitle + titleTags;
  var tagsEdit = document.getElementById('js-tagname_input');
  if (tagsEdit) 
  {
    newtitle += '/' + tagsEdit.value;
  }
}
else if (restOfUrl == '/off/index.html/') 
{
  newtitle = baseSiteTitle + titleBroken;
}

if (newtitle != '') 
{
  document.title = newtitle; // Ставим заголовок
}
