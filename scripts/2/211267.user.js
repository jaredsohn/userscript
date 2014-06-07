// ==UserScript==
// @name govnokod: new comments
// @namespace govnokod
// @description Enables user to move between new comments.
// @include http://govnokod.ru/*
// @include http://www.govnokod.ru/*
// @version 2.0.4
// @updateURL http://userscripts.org/scripts/source/211267.meta.js
// @downloadURL http://userscripts.org/scripts/source/211267.user.js
// @grant unsafeWindow
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_registerMenuCommand
// ==/UserScript==

/*
  Используемые кнопки:
  h j k l - перемещение по новым комментариям
                  (j-k - вниз-вверх, h-l - первый-последний)
  u i o p - перемещение по всем комментариям
                  (i-o - вниз-вверх, u-p - первый-последний)
  m - переход к комментарию-родителю с записью позиции в стек
  n - возврат на одну позицию из стека
  , - возврат на последнюю позицию из стека
  [ ] - перемещение на комментарии того же уровня
  Ctrl+/ - включение/отключение зелёного фона
  
  Скрипт имеет некоторые параметры, которые можно настроить
        (см. "Настройки комментариев" в меню расширения)
*/

(function(){
var $ = unsafeWindow.jQuery;
var $html = $('html');
var $body = $('body');
var $page = $('body, html');

// управление настройками скрипта ----------------------------------------------
function Option(defval){
  this.defaultValue = defval;
  this.value = defval;
}

Option.prototype.setDefault = function(){
  this.value = this.defaultValue;
};

Option.prototype.set = function(value){
  this.value = value;
};

Option.prototype.get = function(){
  return this.value == null ? this.defaultValue : this.value;
};

var options = {
  animation: new Option(0),
  expand:    new Option(false)
}, optionString = loadOptions();

// установка опций по строке optstr
function applyOptions(optstr){
  optionString = optstr;
  for(var name in options) options[name].setDefault();
  optstr.split(/[^a-z=0-9]+/).forEach(function(o){
    var option = o.split('='), oname = option[0];
    if(!(oname in options)) return;
    options[oname].set(option.length > 1 ? +option[1] : true);
  });
}

// загрузка строки опций из хранилища
function loadOptions(){
  var opts = GM_getValue('options', 'animation=50, expand=0')
  applyOptions(opts);
  return opts;
}

// обработка пользовательской строки опций: применение и сохранение
function changeOptions(){
  var options = prompt(
    'Введите строку опций в формате <option>, <option>, ...\n' +
    'Если какой-то опции не будет в списке, она будет отключена\n' +
    'Возможные варианты:\n' +
    '  animation=<ms> - время анимации (0 - отключить)\n' +
    '  expand - расширять ли страницу с комментариями\n' +
    'Примеры:\n' +
    '  animation=0, expand - отключить анимацию, расширять страницу\n' +
    '  animation=0 - отключить анимацию, не расширять страницу'
    , optionString
  );
  if(options == null) return;
  applyOptions(options);
  GM_setValue('options', optionString);
}

applyOptions(optionString);

// управление CSS страницы (расширение) ----------------------------------------

// уровень вложенности комментария
function level(comm){
  var lvl = 0;
  var children = $(comm).children('ul').children();
  children.each(function(){
    var l = level(this);
    if(l > lvl) lvl = l;
  });
  return lvl + (children.length && 1);
}

var COMMENT_MARGIN = 20;

// "расширение" страницы: все комментарии - 75% старой ширины поста, включение
// иерархии, расчёт и увеличение ширины страницы
function expandPage(){
  var
    POST_WIDTH     = $('div.entry-content').width(),
    COMMENT_WIDTH  = 0.75 * POST_WIDTH | 0;

  var $hentry = $('li.hentry');
  var CONTENT_WIDTH = Math.max(
    $hentry.width(),
    COMMENT_WIDTH + COMMENT_MARGIN * level($('div.entry-comments').get(0))
  );

  $hentry.width(CONTENT_WIDTH + 'px');
  
  $hentry.find('h2, div.entry-content, p.description, p.author')
    .width(POST_WIDTH + 'px');
    
  $hentry.children('div:last').prev('div') // кнопки социальных сетей
    .css('margin-right', (CONTENT_WIDTH - POST_WIDTH) + 'px');
    
  $('div.entry-comments ul .hcomment ul')
    .css('margin-left', COMMENT_MARGIN + 'px');
    
  $('.entry-comment-wrapper')
    .width(COMMENT_WIDTH+'px')
    .css('box-shadow', '0 0 3px #888');
    
  $('span.comment-vote')
    .css('position', 'inherit')
    .css('float', 'right');
    
  $('p.vote').each(function(){
    var p = $(this);
    p.css('left', POST_WIDTH - p.width()).css('padding-left', '2em');
  });
  
  $('form dl dd textarea').css('max-width', COMMENT_WIDTH + 'px');
  
  $('form dl dd select').css('width', COMMENT_WIDTH + 'px');
}

// позиционирование ------------------------------------------------------------

// позиция: какая-то (x, y) или позиция конкретного элемента (x,y, элемент)
function Position(x, y, element){
  this.x = x | 0;
  this.y = y | 0;
  if(element){
    element = $(element);
    this.width = element.width();
    this.element = element;
  }
}

Position.prototype.compare = function(p){
  return this.y - p.y;
};

// простая прокрутка до (x|null, y), возможно с анимацией
function _scroll(x, y){
  var delay = options.animation.get();
  if(!delay){
    $page.scrollTop(y);
    if(x != null) $page.scrollLeft(x);
  }else{
    if(x == null) $page.animate({ scrollTop: y }, delay);
    else $page.animate({ scrollTop: y, scrollLeft: x }, delay);
  }
}

// умная прокрутка до позиции: двумерная, если есть элемент и он не влезает,
// одномерная, если элемент влезает, или позиция не относится к элементу
function _smartScroll(pos){
  if(!(pos instanceof Position)) throw 1;
    
  var scrollLeft = null;
  if(pos.element){
    var winPos = position();
    var winW = $('body').innerWidth();
    var elW = pos.width;
    var edge = 2 * COMMENT_MARGIN;
    //if(winW >= elW + 2 * edge && // эта фича вызвала баг
    if(pos.x - edge < winPos.x || pos.x + elW + edge > winPos.x + winW){
        scrollLeft = pos.x - edge;
    }
  }else{
    scrollLeft = pos.x;
  }
  _scroll(scrollLeft, pos.y);
  return;
}

// прокрутка до позиции/DOM-объекта
function scrollTo(pos){
  if(pos == null) return;
  if(pos instanceof Position){
    if(options.expand.get()) _smartScroll(pos);
    else _scroll(null, pos.y);
    return;
  }
  return scrollTo(position(pos));
}

// текущая позиция/позиция объекта x
function position(x){
  if(x){
    var offset = $(x).offset();
    return new Position(offset.left | 0, offset.top | 0, x);
  }
  return new Position(
    Math.max($body.scrollLeft(), $html.scrollLeft()) | 0,
    Math.max($body.scrollTop(), $html.scrollTop()) | 0
  );
}

// ближайшая позиция из arr к позиции value
function nearest(arr, value){
  if(!arr.length) return 0;
  for(var i=0; i<arr.length; ++i) if(arr[i].y > value.y) return i - 1;
  return arr.length - 1;
}

// элемент номер id массива arr с автокоррекцией диапазона
function elementAt(arr, id){
  if(!arr.length) return;
  if(id < 0) id = 0;
  if(id >= arr.length) id = arr.length - 1;
  return arr[id];
}

// позиция из positions, которая ближе всего к текущей позиции
function nearestPosition(positions){
  var id = nearest(positions, position());
  return elementAt(positions, id);
}

// перехож к одной из позиций в массиве
function moveTo(positions, id){
  scrollTo(elementAt(positions, id)); 
}

// сдвинуться на delta элементов
function moveOn(positions, delta){
  moveTo(positions, nearest(positions, position()) + delta); 
}

// родительский комментарий/пост для данного элемента
function parent(element){
  if(!element) return;
  var $element = $(element);
  var parent = $element.parents('li.hcomment:first')
                       .find('.entry-comment-wrapper:first');
  if(!parent.length) parent = $element.parents('li.hentry:first');
  return parent;
}

// комментарии одного уровня для данного комментария (.entry-comment-wrapper)
function siblings(comment){
  if(!comment) return;
  return $(comment).closest('ul').children().children('.entry-comment-wrapper');
}

// список отсортированных позиций 
function positions(sel){
  return $.makeArray($(sel))
    .map(position)
    .sort(function(a,b){ return a.compare(b); });
}

// список позиций постов и всех комментариев
function allComments(){
  return positions('.entry-comment-wrapper, li.hentry');
}

// список позиций постов и новых комментариев
function newComments(){
  return positions('.entry-comment-wrapper.new, li.hentry');
}

// список позициий комментариев одного уровня с текущим комментарием
function allSiblings(){
  var pos = nearestPosition(allComments());
  if(!pos) return [];
  return positions(siblings(pos.element));
}

// int main(){ -----------------------------------------------------------------

// увеличиваем страницу по вертикали
// для верного отображения последних комментариев
$('#content')
  .after('<div style="height: ' + window.screen.height + 'px;">&nbsp;</div>');

// увеличиваем страницу по горизонтали
if(unsafeWindow.location.pathname !== '/comments' && options.expand.get())
  expandPage();

GM_registerMenuCommand('Настройки комментариев', changeOptions, 's', 'ы');

var highlighted = false;
$(unsafeWindow).keydown(function(event){
  if(event.which == 191 && event.ctrlKey){
    highlighted = !highlighted; // подсветка зелёным по Ctrl + /
    $('li.hentry, .entry-comment-wrapper').css('background-color', highlighted ? '#4f4' : '#fff');
  }
});

var children = []; // стек позиций комментариев-детей, от которых перешли
// к родительским комментариям

$body.keypress(function(event){

  // ничего не делать, если пользователь печатает комментарий
  if(event.target.type === 'textarea') return;
  
  switch(String.fromCharCode(event.charCode).toLowerCase()){
  
    // перемещение на один комментарий/пост среди постов и всех комментариев:
    case 'ш': case 'i': moveOn(allComments(),         +1); break; // ниже
    case 'щ': case 'o': moveOn(allComments(),         -1); break; // выше
    
    // перемещение на первый/последний комментарий/пост среди постов и
    // всех комментариев:
    case 'г': case 'u': moveTo(allComments(),          0); break; // первый
    case 'з': case 'p': var comments = allComments();
                        moveTo(comments, comments.length); break; // последний
                        
    // перемещение на один комментарий/пост среди постов и новых комментариев:
    case 'о': case 'j': moveOn(newComments(),         +1); break; // ниже
    case 'л': case 'k': moveOn(newComments(),         -1); break; // выше
    
    // перемещение на первый/последний комментарий/пост среди постов и
    //  новых комментариев:
    case 'р': case 'h': moveTo(newComments(),          0); break; // первый
    case 'д': case 'l': var comments = newComments();
                        moveTo(comments, comments.length); break; // последний
    
    // перемещение на комментарии того же уровня:
    case '[': case 'х': moveOn(allSiblings(),         +1); break; // ниже
    case ']': case 'ъ': moveOn(allSiblings(),         -1); break; // выше
    
    // перемещение на родительский комментарий с запоминанием текущей позиции
    case 'ь': case 'm':
      var current = nearestPosition(positions('li.hcomment, li.hentry'));
      var par = parent(current && current.element);
      if(par.length){
        children.push(current);
        scrollTo(par);
      }
      break;
    // перемещение на последнюю сохранённую позицию с удалением информации о ней
    case 'т': case 'n':
      scrollTo(children.pop());
      break;
    // перемещение на первую сохранённую позицию с удалением всей информации о
    // сохранённух позициях
    case 'б': case ',':
      scrollTo(children[0]);
      children = [];
      break;
  }
});

})();
