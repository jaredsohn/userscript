// ==UserScript==
// @name         ДоброПоиск
// @namespace    udp://insomnia/*
// @version      0.0.5
// @description  Ооооочень медленно и не взде ищет по Доброчану.
// @match        http://dobrochan.com/*/*
// @match        http://dobrochan.ru/*/*
// @include      http://dobrochan.com/*/*
// @include      http://dobrochan.ru/*/*
// @copyright    2013+, tranquility.yuki
// @grant        none
// ==/UserScript==

ParseUrl = function(url){
    m = (url || document.location.href).match( /https?:\/\/([^\/]+)\/([^\/]+)\/((\d+)|res\/(\d+)|\w+)(\.x?html)?(#i?(\d+))?/)
    return m?{host:m[1], board:m[2], page:m[4], thread:m[5], pointer:m[8]}:{};
};

var Hanabira_URL = ParseUrl();

var searchWords = [],
    searchInTopic = false,
    searchInOp = false,
    searchInLastPosts = false,
    searchInAllPosts = false,
    currentPage = 0,
    posts = {},
    found = 0,
    searchNumPosts = 0,
    proceedSearch = false;

var buildLink = function(value, refs){
  var TID = value.display_id;

  var link = '<div style="border-left: 1px solid #ccc; border-bottom: 1px solid #ccc;" class="sonarLink" id="sonar'+value.display_id+'">'
        + '[' + currentPage + '] '+value.last_modified + ' '
        +'<a href="/'+Hanabira_URL.board+'/res/'+TID+'.xhtml#i'+value.display_id+'" onmouseover="ShowRefPost(event,\''+Hanabira_URL.board+'\', '+TID+', '+value.display_id+')">&gt;&gt;'+value.display_id+'</a> ' +value.title + ' [ ' + value.files_count+ ' / ' + value.posts_count+ ' ] ';

  for (var i = 0; i < refs.length; i++) {
    link += '<a href="/'+Hanabira_URL.board+'/res/'+TID+'.xhtml#i'+refs[i]+'" onmouseover="ShowRefPost(event,\''+Hanabira_URL.board+'\', '+TID+', '+refs[i]+')">&gt;&gt;'+refs[i]+'</a> ';
  };

  return link +'</div>';
}

var testPost = function(post, fullScan){
  var text = '', result = true;

  if(searchInTopic || fullScan) text += post.subject.toLowerCase();
  if(searchInOp || fullScan) text += post.message.toLowerCase();

  $.each(searchWords, function(key, value){
    if(text.indexOf(value) == -1) result = false;
  });

  return result;
}

var processReply = function(data){
  $.each( data["boards"][Hanabira_URL.board]["threads"], function( key, value ) {
    posts['sonar'+value.display_id] = value.last_modified;

    var postMatch = [];

    if(searchInLastPosts){
      for (var i = 1; i < value.posts.length; i++) {
        if (testPost(value.posts[i], true)) {
          postMatch.push(value.posts[i].display_id);
        };        
      };
    }

    if(value.posts_count >= searchNumPosts)
    if((!searchInTopic && !searchInOp && !searchInLastPosts ) || testPost(value.posts[0]) || postMatch.length != 0){

      if($('#sonarResults .sonarLink').length ==0){
        $('#sonarResults').append(buildLink(value, postMatch));
        found++;

      }else{
        var inserted = false;
        $('#sonarResults .sonarLink').each(function(){
          if(!inserted && posts[$(this).attr('id')] < value.last_modified){
            $(this).before(buildLink(value, postMatch));
            inserted = true;
            found++;
          }
        });

        if(!inserted){
          $('#sonarResults').append(buildLink(value, postMatch));
          found++;
        }

        /*if(found > 100){
          $('#sonarResults .sonarLink').last().remove();
          found--;

        }*/

      }
    }
  });

  if((!data["boards"][Hanabira_URL.board]["page"] || parseInt(data["boards"][Hanabira_URL.board]["page"]) < (parseInt(data["boards"][Hanabira_URL.board]["pages"]) - 1)) && proceedSearch) {
    currentPage++;
    setTimeout(function(){$.get('/'+Hanabira_URL.board+'/'+currentPage+'.json', {}, processReply,'json');}, 5000);
    $('#sonarProgress').text('Прогресс: ' + currentPage + '/' + parseInt(data["boards"][Hanabira_URL.board]["pages"]));
  }else{
    $('#sonarButton').replaceWith('<input value="Медленно и неторопливо показать все треды" type="button" id="sonarButton">');
    $('#sonarButton').click(doSonarSearch);
    $('#sonarProgress').remove();
  }
}


var doSonarSearch = function(){
  searchWords = $('#sonarSearchWords').val().toLowerCase().split(' ');
  searchNumPosts = parseInt($('#sonarSearchNumPosts').val());
  searchInTopic = $('#sonarInTopic').attr('checked') == "checked" ? true : false;
  searchInOp = $('#sonarInOP').attr('checked') == "checked" ? true : false;
  searchInLastPosts = $('#sonarInLastPosts').attr('checked') == "checked" ? true : false;
  searchInAllPosts = $('#sonarInAllPosts').attr('checked') == "checked" ? true : false;

  currentPage = 0;
  posts = {};
  found = 0;
  proceedSearch = false;

  $('#sonarButton').replaceWith('<input value="ГОРШОЧЕК!!! НЕ ВАРИ!!!" type="button" id="sonarButton"><span id="sonarProgress">&nbsp;&nbsp;Прогресс: 0/???</span>');
  $('#sonarButton').click(stopSonarSearch);

  proceedSearch = true;
  $('#sonarResults').empty();

  $.get('/'+Hanabira_URL.board+'/'+currentPage+'.json', {}, processReply,'json');
}

var stopSonarSearch = function(){
  proceedSearch = false;
  $('#sonarButton').replaceWith('<input value="Медленно и неторопливо показать все треды" type="button" id="sonarButton">');
  $('#sonarButton').click(doSonarSearch);
  $('#sonarProgress').remove();  
}


var showSonarForm = function(){
  if($('#SonarSearch').length ==0){
    $('div.logo').before('<div id="SonarSearch" style="clear: both; border: 1px solid #ccc; background: #ddd; border-radius: 5px; padding: 10px; margin: 5px;"><form id="sonarForm">'
      +'<input value="Медленно и неторопливо показать все треды" type="button" id="sonarButton"><br>'
      +'<label>Содержащие минимум <input type="text" id="sonarSearchNumPosts" size="5" value="0"> постов</label><br>'
      +'<label>Содержащие слова: <input type="text" id="sonarSearchWords" size="35"></label><br>'
      +'<label>в теме треда <input type="checkbox" id="sonarInTopic"></label><br>'
      +'<label>в ОП-посте <input type="checkbox" id="sonarInOP"></label><br>'
      +'<label>в последних десяти постах <input type="checkbox" id="sonarInLastPosts"></label><br>'
      +'</form><hr><div id="sonarResults"></div></div>');
      
      $('#sonarButton').click(doSonarSearch);
  }else{
    $('#SonarSearch').remove();
  }
}


$('div.adminbar').append($('<input value="Sonar" type="button">').click(showSonarForm));