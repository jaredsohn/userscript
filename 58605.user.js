// ==UserScript==
// @name           Readability Interface
// @namespace      http://userscripts.org/users/useridnumber
// @include        *
// @require	   http://jquery-ui.googlecode.com/svn/tags/latest/jquery-1.3.2.js
// @require	   http://fromvega.com/code/easydrag/jquery.easydrag.handler.beta2.js
// @require        http://www.personal.psu.edu/sgd5026/jquery.rightClick.js
// ==/UserScript==

$('body').prepend('<form id="interface" style="display: none;">' + 
    '<div id="moveable"><div id="closeButton"></div></div>' +
    '<div id="selector" style="background-image: url(http://www.personal.psu.edu/sgd5026/Readability_Interface/selector.png);"></div>' +
    '<select id="fontFamily">' +
    '<option>Arial</option>' +
    '<option>Book Antiqua</option>' +
    '<option>Bookman Old Style</option>' +
    '<option>Browallia</option>' +
    '<option>Calibri</option>' +
    '<option>Cambria</option>' +
    '<option>Candara</option>' +
    '<option>Century Gothic</option>' +
    '<option>Consolas</option>' +
    '<option>Constantia</option>' +
    '<option>Corbel</option>' +
    '<option>Cordia</option>' +
    '<option>Courier New</option>' +
    '<option>Garamond</option>' +
    '<option>Georgia</option>' +
    '<option>Impact</option>' +
    '<option>Jasmine</option>' +
    '<option>Jokewood</option>' +
    '<option>Palatino Linotype</option>' +
    '<option>Roman</option>' +
    '<option>Simplified Arabic</option>' +
    '<option>Times New Roman</option>' +
    '<option>Trebuchet MS</option>' +
    '<option>Verdana</option>' +
	'</select>' +
	'<select id="fontSize">' +
	  '<option>10</option>' +
		'<option>12</option>' +
		'<option>14</option>' +
		'<option>16</option>' +
		'<option>18</option>' +
		'<option>20</option>' +
	'</select>' +
	'<div id="increaseFont" style="background-image: url(http://www.personal.psu.edu/sgd5026/Readability_Interface/increaseFont.png);"></div>' +
	'<div id="decreaseFont" style="background-image: url(http://www.personal.psu.edu/sgd5026/Readability_Interface/decreaseFont.png);"></div>' +
	'<div id="bold" style="background-image: url(http://www.personal.psu.edu/sgd5026/Readability_Interface/bold.png);"></div>' +
	'<div id="italic" style="background-image: url(http://www.personal.psu.edu/sgd5026/Readability_Interface/italic.png);"></div>' +
	'<div id="underline" style="background-image: url(http://www.personal.psu.edu/sgd5026/Readability_Interface/underline.png);"></div>' +
	'<div id="fontColor" style="background-image: url(http://www.personal.psu.edu/sgd5026/Readability_Interface/fontColor.png);">' +
	  '<table style = "border-collapse: collapse;">' +
		   '<tr>' +
			   '<td id="red"></td>' +
				 '<td id="green"></td>' +
			 '</tr>' +
			 '<tr>' +
			   '<td id="blue"></td>' +
				 '<td id="orange"></td>' +
			 '</tr>' +
			 '<tr>' +
			   '<td id="purple"></td>' +
				 '<td id="yellow"></td>' +
			 '</tr>' +
			 '<tr>' +
			   '<td id="black"></td>' +
				 '<td id="white"></td>' +
			 '</tr>' +
		'</table>' +
	'</div>' +
	'<div id="backgroundColor" style="background-image: url(http://www.personal.psu.edu/sgd5026/Readability_Interface/backgroundColor.png);">' +
	  '<table style = "border-collapse: collapse;">' +
		   '<tr>' +
			   '<td id="red"></td>' +
				 '<td id="green"></td>' +
			 '</tr>' +
			 '<tr>' +
			   '<td id="blue"></td>' +
				 '<td id="orange"></td>' +
			 '</tr>' +
			 '<tr>' +
			   '<td id="purple"></td>' +
				 '<td id="yellow"></td>' +
			 '</tr>' +
			 '<tr>' +
			   '<td id="black"></td>' +
				 '<td id="white"></td>' +
			 '</tr>' +
		'</table>' +
	'</div>' +
	'<div id="lineSpacing" style="background-image: url(http://www.personal.psu.edu/sgd5026/Readability_Interface/lineSpacing.png);">' +
			'<ul>' +
		    '<li><a href="Single">Single</a></li>' +
				'<li><a href="Double">Double</a></li>' +
				'<li><a href="Triple">Triple</a></li>' +
		  '</ul>' +
	'</div>' +
	'<div id="refreshButton" style="background-image: url(http://www.personal.psu.edu/sgd5026/Readability_Interface/reload.png);"></div>' +
'</form>'
);

  //Makes Interface Draggable
	$('form#interface').easydrag();
        $('form#interface').setHandler('moveable');
    
	//Select Text to Change
  var selector = '*';

  $('div#selector').toggle(function(){
	  $('div#selector').css("background-image","url(http://www.personal.psu.edu/sgd5026/Readability_Interface/selectorClicked.png)");
		$('p').hover(function(){
			$(this).addClass('highlightText');
		},
		function(){
			$(this).removeClass('highlightText');
		});
		$('p').click(function(e){
		  if ($('div#selector').css("background-image") == "url(http://www.personal.psu.edu/sgd5026/Readability_Interface/selectorClicked.png)"){
		    e.stopPropagation();
			}
			$('p').removeClass('selectedText');
			selector = $(this);
			if ($(this).hasClass('selectedText')){
	      $(this).removeClass('selectedText');
			} else {
			  $(this).addClass('selectedText');
			}
    });  
	},
	function(){
	 $('p').hover(function(){
		 $(this).removeClass('highlightText');
	 },
	 function(){
		 $(this).removeClass('highlightText');
	 });
	 selector = '*';
	 $('p').removeClass('selectedText');
	 $(this).css("background-image","url(http://www.personal.psu.edu/sgd5026/Readability_Interface/selector.png)");
	});

	//Refresh Button
  $('#refreshButton').click(function(){
    location.reload();	
	});  
	
	//Select Font Familiy
	$('select#fontFamily').change(function(){
	 	var fontFamily = $('#fontFamily').val();
	  $(selector).css('font-family', fontFamily);
	});
	
	// Select Font Size
	$('select#fontSize').change(function(){
		var sizeOfFont = $('#fontSize').val() + 'px';
		$(selector).css('font-size', sizeOfFont);
	});
	
	// Increase Font Size
  $('#increaseFont').click(function(){
    var currentFontSize = $(selector).css('font-size');
		var currentFontSizeNum = parseFloat(currentFontSize, 10); 
    var newFontSize = currentFontSizeNum*1.2;
    $(selector).css('font-size', newFontSize);		
    return false;
  });
  // Decrease Font Size
  $('#decreaseFont').click(function(){
    var currentFontSize = $(selector).css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum*0.8;
    $(selector).css('font-size', newFontSize);
    return false;
  });
	// Font-Weight Bold	
	$('form#interface #bold').toggle(function(){
	  $(selector).css('font-weight', 'bold');
		$(this).css("background-image","url(http://www.personal.psu.edu/sgd5026/Readability_Interface/boldClicked.png)");
	},
	function(){
	   $(selector).css('font-weight', 'normal');
		 $(this).css("background-image","url(http://www.personal.psu.edu/sgd5026/Readability_Interface/bold.png)");
	});
	
	//Font-Style Italic
	$('form#interface #italic').toggle(function(){
	  $(selector).css('font-style', 'italic');
		$(this).css("background-image","url(http://www.personal.psu.edu/sgd5026/Readability_Interface/italicClicked.png)");
	},
	function(){
	   $(selector).css('font-style', 'normal');
		 $(this).css("background-image","url(http://www.personal.psu.edu/sgd5026/Readability_Interface/italic.png)");
	});
	
	//Text-Decoration Underline
	$('form#interface #underline').toggle(function(){
	  $(selector).css('text-decoration', 'underline');
		$(this).css("background-image","url(http://www.personal.psu.edu/sgd5026/Readability_Interface/underlineClicked.png)");
	},
	function(){
	   $(selector).css('text-decoration', 'none');
		 $(this).css("background-image","url(http://www.personal.psu.edu/sgd5026/Readability_Interface/underline.png)");
	});
	
	//Font Color
	$('#fontColor').click(function(){
	  $('#fontColor table').show();
	  $('#fontColor').hover(function(){
		  $(this).show();
		},
		function(){
		  $('#fontColor table').fadeOut();
		});
	});
	
	$('#fontColor td').click(function(){
	  var color = $(this).attr('id');
		$(selector).css('color', color);
	});
	
	//Background Color
	$('#backgroundColor').click(function(){
	  $('#backgroundColor table').show();
	  $('#backgroundColor').hover(function(){
		  $(this).show();
		},
		function(){
		  $('#backgroundColor table').fadeOut();
		});
	});
	
	$('#backgroundColor td').click(function(){
	  var color = $(this).attr('id');
		$(selector).css('background-color', color);
	});
		
	//Line-Height
	$('#lineSpacing').click(function(){
	  $('#lineSpacing ul').show();
	  $('#lineSpacing').hover(function(){
		  $(this).show();
		},
		function(){
		  $('#lineSpacing ul').fadeOut();
		});
	});
	
	$('#lineSpacing a[href=Single]').click(function(e){
	  e.preventDefault();
	  $(selector).css('line-height', '100%');
	});
	$('#lineSpacing a[href=Double]').click(function(e){
	  e.preventDefault();
	  $(selector).css('line-height', '200%');
	});
	$('#lineSpacing a[href=Triple]').click(function(e){
	  e.preventDefault();
	  $(selector).css('line-height', '300%');
	});
	
	//Interface Positioning
	$(window).rightClick(function(event){
	   		 
		 var posX = event.pageX - 269;
		 var posY = event.pageY + 2;
		 
		 var windowRight = (screen.width - event.screenX);
		 var windowBottom = (screen.height - event.screenY);
		 var windowLeft = event.screenX;
		  
		 if (windowRight < 174 && windowBottom < 271){ 
	       posX = screen.width - 441;
		     posY = event.pageY - 98;
		 } else if (windowRight < 174){
		     posX = screen.width - 441;
			   posY = event.pageY + 2;
		 } else if (windowBottom < 271){
		     posX = event.pageX - 269;
		     posY = event.pageY - 98; 	 
		 }
		 
		 if (windowLeft < 268 && windowBottom < 271){
		     posX = event.pageX + 168;
			   posY = event.pageY - 98;
		 } else if (windowLeft < 268){
		     posX = event.pageX + 168;
			   posY = event.pageY + 2; 
		 }		
		 
		 $('form#interface').css('top', posY);
		 $('form#interface').css('left', posX);
		 $('form#interface').show();
		 $('#closeButton').click(function(){
	     $('form#interface').hide();
			 $('p').removeClass('selectedText');
	   });
	   $('form#interface').click(function(e){
       e.stopPropagation();
	   }); 
  });