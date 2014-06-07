// ==UserScript==
// @name           University of Innsbruck: quick quicklinks
// @description    Permanently displays quicklinks for quick access
// @match          http://www.uibk.ac.at/*
// @match          http://orawww.uibk.ac.at/*
// ==/UserScript==

function run (f) {
  var s = document.createElement('script');
  s.textContent = '(' + f.toString() + ')()';
  document.body.appendChild(s);
}

run(function () {

  if (typeof $ !== 'function') return;

  var ql = $('#quicklinks .quicklinks_items')
      .clone()
      .removeClass('quicklinks_items')
      .addClass('generic_ul')
      .css('background', '#ebedf3')
      .css('padding', '5px 21px 5px 5px')
      .css('margin-top', '10px')
      .appendTo($('#generic'));

  if (ql) {
    ql.find('li').addClass('generic_li');
    $('#header').css('height', '250px');
    $('#generic').css('padding-left', '0');
  }

});
