// ==UserScript==
// @name           killPostOrAuthor
// @namespace      su.gornostaev
// @description    Advanced version of doNotShowThisPost
// @version        0.6b
// @author         Sergey TheDeadOne Gornostaev
// @license        BSD
// @include        http://*leprosorium.ru/*
// @exclude        http://leprosorium.ru/my/*
// @exclude        http://*leprosorium.ru/comments/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//TODO:
//1. Придумать, как распологать элемент управления всего в одном месте
//2. Замена стандартного "Х"
//3. Удаление из банлистов

Array.prototype.hasVal = function(val) {
  for(var i = 0; i < this.length; i++){
    if(this[i] == val) return true;
  }
  return false;
}

var blAuthors = {};
var blPosts = [];

function loadBlackLists() {
  var authorsData = GM_getValue('blAuthors', false);
  if(authorsData) {
    authorsData = authorsData.split(',');
    for(var i = 0; i < authorsData.length; i++) {
      var key = authorsData[i].split(':')[0];
      var val = authorsData[i].split(':')[1];

      blAuthors[key] = val;
    }
  }
  var postsData = GM_getValue('blPosts', false);
  if(postsData) {
    blPosts = postsData.split(',');
  }
}

function saveBlackLists() {
  var authorsData = [];
  for(var uid in blAuthors) {
    authorsData.push(uid + ":" + blAuthors[uid]);
  }
  GM_setValue('blAuthors', authorsData.join(','));
  var postsData = blPosts.join(',');
  GM_setValue('blPosts', postsData);
}

function killPost(event) {
  event.preventDefault();
  var pid = $(event.target).attr('id').split('_')[1];
  
  blPosts.push(pid);
  saveBlackLists();
  fillILists();
  $('#' + pid).hide();
  
  $('#banCtrl').show();
}

function killAuthor(event) {
  event.preventDefault();
  var uid = $(event.target).attr('id').split('_')[1];
  var usrName = $('div.' + uid).children('.dd').children('.p').children('.js-user_login').html();
  
  blAuthors[uid] = usrName;
  saveBlackLists();
  fillILists();
  $('div.' + uid).hide();
  
  $('#banCtrl').show();
}

function addCtrl(target) {
  if(!($(target).hasClass('processed'))) {
    var pid = $(target).attr('id');
    var usrName = $(target).children('.dd').children('.p').children('.js-user_login').html();
    var uid;
    var classList = $(target).attr('class').split(' ');
    for(var classNdx in classList) {
      if(classList[classNdx][0] == 'u')
        uid = classList[classNdx];
    }
        
    $(target).addClass('processed');

    if(blPosts.hasVal(pid)) {
      $(target).hide();
    }
    else if(blAuthors[uid]) {
      $(target).hide();
    }
    else {
      $('<span> | <a id="ctrl_' + pid + '" href="#">Убить пост</a> / <a id="ctrl_' + uid + '" href="#">Убить автора</a></span>')
      .insertAfter($(target).children('div.dd').children('div.p').children('span'));
      $('a#ctrl_' + pid).click(killPost);
      $('a#ctrl_' + uid).click(killAuthor);
    }
  }
}

function parse() {
  $(this).children('div.post').each(function() {
    addCtrl(this);
  });
  $('#js-posts_holder').one('DOMSubtreeModified', parse);
}

function fillILists() {
  $('#blAuthors option').remove();
  $('#blPosts option').remove();

  for(var i = 0; i < blPosts.length; i++) {
    $('#blPosts').append('<option value="' + i + '">' + blPosts[i] + '</option>');
  }
  for(var key in blAuthors) {
    $('#blAuthors').append('<option value="' + key + '">' + blAuthors[key] + '</option>');
  }
}

loadBlackLists();

$('body').append(
  $('<div id="banlist">\
     <table border="0">\
     <tr align="right">\
     <td colspan="2"><a id="blCtrl_Close" href="#"><b>X</b></a></td>\
     </tr>\
     <tr align="center">\
     <th>Авторы</th>\
     <th>Посты</th>\
     </tr>\
     <tr align="center">\
     <td><select name="blAuthors" id="blAuthors" size="10" multiple="multiple" style="width: 150px;"></select></td>\
     <td><select name="blPosts" id="blPosts" size="10" multiple="multiple" style="width: 150px;"></select></td>\
     </tr>\
     <tr align="center">\
     <td><button id="btnRelAuthor">Удалить</button></td>\
     <td><button id="btnRelPost">Удалить</button></td>\
     </tr>\
     </table>\
  </div>').css({
    'position':         'fixed',
    'width':            'auto',
    'border':           '1px #000000 solid',
    'margin':           '5px',
    'padding':          '5px',
    'background-color': '#FFFFFF',
    'z-index':          '999',
}).hide());

$('#blAuthors').css('height', 'inherit');
$('#blPosts').css('height', 'inherit');
$('#blCtrl_Close').click(function(event) {
  event.preventDefault();
  $('#banlist').fadeOut();
});

fillILists();

$('#btnRelAuthor').click(function() {
  $('#blAuthors option:selected').each(function() {
    var uid = $(this).attr('value');
    
    delete blAuthors[uid];
    saveBlackLists();
    fillILists();
    $('div.' + uid).show();    
  });
});

$('#btnRelPost').click(function() {
  $('#blPosts option:selected').each(function() {
    var pid = $(this).attr('value');
    
    $('#' + blPosts[pid]).show();
    blPosts.splice(pid, 1);
    saveBlackLists();
    fillILists();
  });
});

$('<span id="banCtrl"><li>|<a href="#"><span><em>Банлист</em></span></a></li></span>').insertAfter('#fraud-menu').click(function(event) {
  event.preventDefault();
  $('#banlist').css({
      'top':($(window).height() - $('#banlist').height()) / 2 + $(window).scrollTop() + 'px',
      'left':($(window).width() - $('#banlist').width()) / 2 + $(window).scrollLeft() + 'px'
    }).fadeIn();
}).hide();

if(blAuthors.length | blPosts.length) {
  $('#banCtrl').show();
}

$('div.post').each(function() {
  addCtrl(this);
});

$('#js-posts_holder').one('DOMSubtreeModified', parse);
