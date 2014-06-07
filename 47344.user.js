// ==UserScript==
// @name           notame
// @namespace      www.notame.es
// @description    notame
// @include        http://meneame.net/notame/
// ==/UserScript==


// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; init(); }
    }
    GM_wait();


function init(){
	citaGente()
}

function citaGente(){
        $('a[href$=.jpg],a[href$=.png],a[href$=.gif]').each(function(){
		var url = $(this).attr('href');
		var html = "<img src=\""+url+"\" style=\"max-height:400px;\" />";
		$(this).before(html);
		$(this).remove();		
	});
        $('a[href^=http://www.youtube]').each(function(){
		var params = $(this).attr('href').toString().match(/http:\/\/www.youtube\.(com|es)\/watch\?v=(.*[^&#])/);
		var html = "<object type=\"application/x-shockwave-flash\" style=\"width:425px; height:350px;\""+
                           "data=\"http://www.youtube.com/v/"+params[2]+"\">"+
            		   "<param name=\"movie\" value=\"http://www.youtube.com/v/"+params[2]+"\" />"+
                           "</object>";

		$(this).before(html);
		$(this).remove();
	});
	$('a[href^=http://meneame.net/notame/]').each(function(i,el){
	    var cont = $(el).parent();
	    var href = $(el).attr('href');
	    var params = href.match(/http:\/\/meneame.net\/notame\/(.*)\/(.*)/);
	    var user = params[1];
	    var id = params[2];
	    
	    $.get("http://meneame.net/notame/"+user+"/"+id,function(data){
	       $(cont).append('<br /><br />En referencia a : <div class="cita"></div>').find('.cita').css({
		  width:"100%",
		  clear:"both"
	       })
	       var arr = data.match(/<li id="pcontainer-[0-9]*">([\s\S]*)<\/li>\s/img)
	       $(cont).find('.cita').html(arr[0]);
	    })	
	    $(el).remove()
	})
}

GM_registerMenuCommand('Cita la gente', citaGente);