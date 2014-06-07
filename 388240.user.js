// ==UserScript==
// @name        CMB Ponies
// @namespace   http://localhost/
// @version     0.02
// @description cmblist,
// @include     https://*bagel.com/bagels/ten/
// ==/UserScript==

$(document).ready(function(){
  $('body').prepend('<input id="ponies" type="button" value="Ponies"/>');
  $('#ponies').on('click', function(){
    var ponies = $('.slide.pager');
    ponies.each(function(){
      var image = $(this).find('img').attr('src');
      var deets = $(this).find('.slide-inner-right');
      var age = deets.find('> table > tbody > tr:eq(2) > td:eq(0)').text();
      var height = deets.find('> table > tbody > tr:eq(2) > td:eq(1)').text();
      var location = deets.find('> table > tbody > tr:eq(5) > td:eq(0)').text();
      var religion = deets.find('> table > tbody > tr:eq(5) > td:eq(1)').text();
      var occupation = deets.find('> table > tbody > tr:eq(11)').text();
 	  $('body').prepend('<div class="pony"><img src="' + image + '" height="5%" width="5%">' + image + ' ' + age + ' ' + height + ' ' + occupation + ' ' + location + ' ' + religion + '</div>\n');
    });
    $('.pony').each(function(){
      this.addEventListener('click', function(){this.parentNode.removeChild(this)}, false);
    });
  });
});