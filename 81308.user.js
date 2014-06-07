// ==UserScript==
// @name           2-ch
// @namespace      http://2-ch.ru/*
// @include        http://2-ch.ru/*
// ==/UserScript==

function main()
{
  var stylelist =
    "<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/burichan.css\" title=\"Burichan\">"+
    "<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/futaba.css\" title=\"Futaba\">"+
    "<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/photon.css\" title=\"Photon\">"+
    "<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/not4chan.css\" title=\"Not4chan\">"+
    "<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/nigrachan.css\" title=\"Nigrachan\">"+
    "<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/lolichan.css\" title=\"Lolichan\">"+
    "<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/gurochan.css\" title=\"Gurochan\">"+
    "<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/rainbow.css\" title=\"Rainbow\">"+
    //"<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/fuhrerchan.css\" title=\"Fuhrerchan\>"+
    //"<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/55chan.css\" title=\"55chan\">"+
    //"<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/partyhard.css\" title=\"Partyhard\">"+
    "<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/ycrc.css\" title=\"Ycrc\">"+
    "<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/mftbnigra.css\" title=\"Mftbnigra\">"+
    "<link rel=\"alternate stylesheet\" type=\"text/css\" href=\"http://www.99chan.in/css/paisley.css\" title=\"Paisley\">";

  var switcher=
    "<select name=\"switcher\">"+
    "<option onclick=\"javascript:set_stylesheet('Burichan');return false;\" value=\"Burichan\">Burichan</option>"+
    "<option onclick=\"javascript:set_stylesheet('Futaba');return false;\" value=\"Futaba\">Futaba</option>"+
    "<option onclick=\"javascript:set_stylesheet('Photon');return false;\" value=\"Photon\">Photon</option>"+
    "<option onclick=\"javascript:set_stylesheet('Not4chan');return false;\" value=\"Not4chan\">Not4chan</option>"+
    "<option onclick=\"javascript:set_stylesheet('Nigrachan');return false;\" value=\"Nigrachan\">Nigrachan</option>"+
    "<option onclick=\"javascript:set_stylesheet('Lolichan');return false;\" value=\"Lolichan\">Lolichan</option>"+
    "<option onclick=\"javascript:set_stylesheet('Gurochan');return false;\" value=\"Gurochan\">Gurochan</option>"+
    //"<option onclick=\"javascript:set_stylesheet('Fuhrerchan');return false;\" value=\"Fuhrerchan\">Fuhrerchan</option>"+
    //"<option onclick=\"javascript:set_stylesheet('55chan');return false;\" value=\"55chan\">55chan</option>"+
    //"<option onclick=\"javascript:set_stylesheet('Partyhard');return false;\" value=\"Partyhard\">Partyhard</option>"+
    "<option onclick=\"javascript:set_stylesheet('Rainbow');return false;\" value=\"Rainbow\">Rainbow</option>"+
    "<option onclick=\"javascript:set_stylesheet('Ycrc');return false;\" value=\"Ycrc\">Ycrc</option>"+
    "<option onclick=\"javascript:set_stylesheet('Mftbnigra');return false;\" value=\"Mftbnigra\">Mftbnigra</option>"+
    "<option onclick=\"javascript:set_stylesheet('Paisley');return false;\" value=\"Paisley\">Paisley</option>"+
    "</select>";

  $('link[rel="stylesheet"]').remove();
  $('head').append(stylelist);
  $('.adminbar').prepend(switcher);
  set_stylesheet(get_cookie("wakabastyle"));

  var board = location.href.toString().match(/.ru(\/[a-z]+\/)/)[1];
  var r = $('.reply').length;
  var i = $('img').length;
  var ri = '('+r+'/'+i+') ';

  if(location.href.toString().match(/res/))
    {
      var это_тред=true;
      if ( $('.filetitle').text() )
	$('title').text(board+" — "+ri+$('.filetitle').text());
      else
	$('title').text(board+" — "+ri+$('p:first').text())
	  }
  else
    $('title').text(board);

  $('#SForm, .thumbnailmsg, .theader, .rules').remove();
  $('.doubledash').css({
			 'display': 'inline',
			 'width': '20pt',
});
			 //$('.filesize').hide();
  //$('.thumb').mouseover(function() {$(this).parent().parent().find('.filesize').show().css('float','left')}).mouseleave(function(){$(this).parent().parent().find('.filesize').delay(3000).hide(1)});
  //$('input[name=delete]').hide();
  $('td.reply').css('width', '100%');
  $('.reply label').css(
			{
			'float' : 'right',
			'font-size': '80%'
			});
  $('blockquote').css(
    {
      'max-height': null,
      'overflow': 'auto'
      });
  show_captcha();
  $('input[name=nabiki]').after('  ', $('<b>').text('SAGE').attr('class','sage').css('color', 'gray'));
  $('.sage').toggle(function(){
		      $('input[name=nabiki]').val('sage');
		      $(this).css('color', 'red');
		    },
		    function(){
		      $('input[name=nabiki]').val('');
		      $(this).css('color', 'gray');
		    });

  $('#captchadiv').append($('#imgcaptcha').clone().attr('id', 'imgcaptcha2').attr('alt',''))
    .append($('#imgcaptcha').clone().attr('id', 'imgcaptcha3').attr('alt',''))
    .children().css('margin', '2px').click();
  setInterval("$('#captchadiv').children().click()", 20000);
  $('input[name=captcha]').attr('onfocus','');


  $('.commentpostername, .postername')
    .each(
	  function()
	  {
	    if($(this).html()=="Аноним" && !$(this).attr("href"))
	      $(this).html('');
	    else
	      $(this).css("font-style", "italic");
	      }
    );
  $('.reply .reflink')
    .css('float','left')
    .children()
    .each(
      function ()
	{
	  this.innerHTML= this.innerHTML.replace(/.*?([0-9]+)/, '$1')
	}
	  );
  $('[onclick]')
    .each(
	  function()
	  {
	    var номер=$(this).attr('onclick').toString().match(/[0-9]+/);
	    if(номер)
	      {
		var ответ= $(this).parent().parent().parent().attr('id').replace(/reply/,'');
		$(this).attr('class', 'to');
		if(ответ)
		  $('#reply'+номер+' .reflink')
		    .append($('<a>').text('>'+ответ)
			    .attr('onclick','highlight('+ответ+')')
			    .attr('href', location.href+'#'+ответ)
			    //.css('color','red')
			    , ' ');
	      }
	  }
	  );


  // $('br').each(
  // 	function()
  // 	{
  // 	    //
  // 	    var f = $(this).next().clone();
  // 	    //$(this).next().remove();
  // 	    $(this).after($('<h2>').text($(this).next().text()));
  // 	}

  // );
  $('.reply :checkbox').hide();
  // $("p br").parent().contents().each(function(i) {
  // 				       if(this.nodeName == "#text")
  // 					 {
  // 					   var text = this.textContent.toString().replace(/^ /g,'').split(/(.*?[\.?!] )/).reverse();
  // 					   for (var k in text)
  // 					     {
  // 					       var sen = text[k];
  // 					       if(sen.length) $(this).after($('<p>').text(sen+'\n'));
  // 					     }
  // 					   $(this).before($('<br>'));
  // 					   $(this).remove();
  // 					 }
  // 				     });
  // $("p br").remove();
  //$('p').css('margin',0);
  $('p, hui').filter(
		     function()
		     {
		       if($(this).children().length==0) return true;
		     }
		     ).click(
		       function()
			     {
			       var t = $(this).clone();
			       //t.children().remove();
			       insert('>'+t.text()+'\n');
			     }
			     );
  $('.doubledash').html('<a class="hidepost">⊟</a>'
			+ '<br>'
			+ '<a class="checkit">⊙</a>');
  $('.hidepost').toggle(function ()
			{
			  $(this).parent().next().hide();
			  $(this).parent().children(':not(:first)').hide();
			  $(this).html('⊞');
			}
			,
			function (){
			  $(this).parent().next().show();
			  $(this).parent().children(':not(:first)').show();
			  $(this).html('⊟');
			});
  $('.checkit').toggle(function(){
			 $(this).parent().next().find(':checkbox').click();
			 $(this).html('⊗');
		       },
		       function(){
			 $(this).parent().next().find(':checkbox').click();
			 $(this).html('⊙');
		       }
		      );
  var i = 0;
  if(это_тред)
  $('.doubledash').each(
    function()
      {
	$(this).append($('<h5>').text(++i));
      }
  );


}
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-1.4.2.min.js");
  script.addEventListener('load', function()
			  {
			    var script = document.createElement("script");
			    script.textContent = "(" + callback.toString() + ")();";
			    document.body.appendChild(script);
			  }, false);
  document.body.appendChild(script);
}

addJQuery(main);
