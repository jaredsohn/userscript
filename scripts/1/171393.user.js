// ==UserScript==
// @name        SO Hide Questions
// @namespace   cubitworx.com
// @description Hide questions on StackOverflow
// @include     http://stackoverflow.com*
// @include     http://meta.stackoverflow.com*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.0
// ==/UserScript==

var id, hiddenQuestions = [], $ = unsafeWindow.jQuery;

try {
  if(!(hiddenQuestions=JSON.parse(GM_getValue('so-hidden-questions','[]'))))
    throw 'Invalid store questions: '+hiddenQuestions;
  console.log(hiddenQuestions);
} catch(e) {
  console.log(e);
  GM_setValue('so-hidden-questions',JSON.stringify([]));
}

if( $('#question').length ) {

  $('#hmenus .mainnavs ul').append('<li><a href="#" id="nav-hidden-hide">Hide</a></li>');
  $('#nav-hidden-hide').click(function(){
    hiddenQuestions.push($('#question').attr('data-questionid'));
    setTimeout(function(){GM_setValue('so-hidden-questions',JSON.stringify(hiddenQuestions))},0);
    window.location = document.referrer;
    return false;
  });

} else if( $('#questions,#question-mini-list').length ) {

  $('#hmenus .mainnavs ul').append('<li><a href="#" id="nav-hidden">H</a></li>');
  $('.question-summary').each(function(){
    if( $.inArray( id = $(this).attr('id').split('-')[2], hiddenQuestions ) == -1 ) {
      $(this).find('.tags').prepend( '<a class="so-hide-question post-tag" title="hide this question" style="color:#9a4444;font-weight:bold;" data-question-id="'+id+'">hide</a>' );
    } else {
      $(this).addClass('hidden-question').fadeOut();
    }
  });
  $('#nav-hidden').click(function(){
    if( !$('#nav-hidden-clear').length )
      $(this).closest('ul').append($('<li><a href="#" id="nav-hidden-clear">Clear</a></li>').fadeIn());
    else
      $('#nav-hidden-clear').fadeOut(function(){$(this).remove()});
    return false;
  });
  $('#hmenus').on('click','#nav-hidden-clear',function(){
    setTimeout(function(){GM_setValue('so-hidden-questions','[]')},0);
    $('.hidden-question').removeClass('hidden-question').fadeIn();
    $(this).fadeOut(function(){$(this).remove()});
    return false;
  });
  $('#questions,#question-mini-list').on('click','a.so-hide-question',function(){
    hiddenQuestions.push($(this).attr('data-question-id'));
    setTimeout(function(){GM_setValue('so-hidden-questions',JSON.stringify(hiddenQuestions))},0);
    $(this).closest('.question-summary').addClass('hidden-question').fadeOut();
    return false;
  });

}
