// ==UserScript==
// @name textSelection.length
// @namespace tslc_225258
// @version 0.02
// @require http://code.jquery.com/jquery-latest.js
// @source http://userscripts.org/scripts/source/147224.user.js
// @description textSelection.length
// @include http://userscripts.org/scripts/*/147224*
// ==/UserScript==

(function($){

	$=$.noConflict();

	id ='tslc_counter_225258';//(new Date()).getTime()

	counter=$('#'+id);

	//counter.remove();

	$('form').submit(function(){counter.remove();});

	key=function(e){

		Length=0;

		//if (!e.ctrlKey) return
		if (!counter.length)
			$('body').append('<div style=\'position:absolute; display:none; height:30px; width:38px; line-height:29px; text-align:center; opacity:10.5; z-index:1200000000000; color:black; background:#f5f5f5; -background:rgba(255,255,255,0.95); background-opacity:0.5; \' id=\''+id+'\'></div>');

		counter=$('#'+id);

		try
			{
			obj=document.activeElement
			if ((obj.tagName=='INPUT' && obj.type=='text') || obj.tagName=='TEXTAREA' )
				Length=obj.selectionEnd-obj.selectionStart;
			}
		catch(e){}
			
		if (!Length)
			Length=document.getSelection().toString().length;


		if (Length)
			{
			counter.html(0+Length);
			counter.show();
			}
		else 
			{
			counter.hide();
			counter.remove();
			}
	}



	$(window).blur(function(){counter.remove();});
	$('body').mouseout(function(){counter.remove();}); //Мигает
	$('body').keydown(key).keyup(key).click(key).dblclick(function(){setTimeout(key,10)})
	//.mousedown(function(){setTimeout(key,10)}).;
		
	$('body').mousemove(function(e){
		key(e);
		
		left=(e.pageX+12+38)<$(window).width()?e.pageX+12:e.pageX-38;
		_top=(e.pageY-30)<0?e.pageY+30:e.pageY-30;
		counter.css({'left':left, 'top':_top});	
		
	});
})(jQuery);