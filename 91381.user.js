// ==UserScript==
// @name           Wprost.pl - usuniecie wszystkich smieci, zostaje sam sformatowany tekst
// @namespace      localhost
// @description    Usuwa smieci z Wprost.pl i zostawia sam tekst, do addblocka nalezy dodac filtr: ||wprost.pl^
// @reuquire        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.wprost.pl/ar/*
// ==/UserScript==

    var CssTitle = {
      'font-size' : '1.9em',
	  'margin-left' : '30%',
	  'width' : '40%',
	  'font-weight' : 'bolder'};
    var CssDate = {
      'font-size' : '1em',
	  'margin-left' : '30%',
	  'width' : '40%',	  
      'color' : '#1f1f1f'};
    var CssHeader = {
      'font-size' : '1.4em',
      'font-weight' : 'bold',
	  'margin-left' : '30%',
	  'width' : '40%',
      'margin-bottom' : '30px'};	  
    var CssText = {
      'font-size' : '1.2em',
      'margin' : '5px',
	  'margin-left' : '30%',
	  'width' : '40%',
	  'font-familly': 'arial,helvetica,sans-serif'};	  

	// document.title = jQuery.fn.jquery;
  var article = $("#content-main-column-element-content").clone(true);
  var title = $(article).find("h2:first").clone(true).attr('class', 'title').css(CssTitle);
  var date = $(article).find(".element-date:first").clone(true).attr('class', 'date').css(CssDate);
  var header = $(article).find(".div-header:first").clone(true).attr('class', 'header').css(CssHeader);
  var articleText = $(article).find(".div-content:first").clone(true).attr('class', 'text');
  var author = $(article).find(".element-autor:first a");

  $(articleText).append("<p style=\"font-size:1em;color:#0e0e0e;text-align:right;\">" + $(author).text() + "</p>");

$(articleText).contents().filter(function() {
  return this.nodeType == 3;
})
  .wrap("<p></p>")
.end()
.filter('br')
  .remove();
  
  $(articleText).children(":not(p)").remove();
  
$(articleText).children().each(function(i) {
   if ($(this).text().length < 4){
		// console.log(i,": ", $(this).text().length);
		$(this).remove();
		} else $(this).css(CssText);
  });
  
  
  $("body").children().remove();
  $("head").remove();

  $("body").append($(title));
  $("body").append($(date));
  $("body").append($(header));
  $("body").append($(articleText));

