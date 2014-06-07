// ==UserScript==
// @name              PTchanBar0
// @include		http://ptchan.net/*
// @include   http://www.ptchan.net/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==



function addMasterBar() {
  var mbar = $('<div id="_mbar"></div>');
  var dheader = $('<div id="_dheader"></div>');
  var btitle = $('.logo').text();

  mbar.css({ 
    'position': 'fixed',
    'left': 'auto',
    'width': '25%',
    'top': '0em',
    'right':'0em',
    'height': '100%',
    'background': 'black',
    'padding-top': '10px'
  });

  dheader.css({
    'text-align':'center',
    'margin-bottom':'10px'
  });
  mbar.append(dheader);

  $('.logo img').css({'width':'90%','height':'auto'});
  $('.logo').css({'font-size':'90%'});
  dheader.append($('.logo img'));
  dheader.append($('<b>' + btitle + '</b>'));
  $('.logo').hide();
  $('hr').hide();

  $('.postblock').css({'display':'none'});
  mbar.append($('.postarea'));

  $('#delform').css({'width':'70%'});
  $('body').append(mbar);
  $('#watchedthreads').hide();
  mbar.find('ul').hide();
}

$(function(){
  addMasterBar();
});