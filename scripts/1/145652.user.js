// ==UserScript==
// @name        youtube music
// @namespace   http://trien.free.fr
// @include     http://www.youtube-mp3.org/
// @include     http://www.youtube.com/watch?*
// @include     https://www.youtube.com/watch?*
// @include     www.youtube.com/watch?*
// @include     http://www.youtube-mp3.org/
// @include     http://www.youtube-mp3.org/fr#youtube-url
// @include     http://www.youtubemp3.fr/
// @include     http://youtubemp3.fr/*
// @include     www.youtubemp3.fr
// @include     *.youtubemp3.fr
// @include     http://www.youtubemp3.fr/index.php 
// @include     http://youtubemp3.fr/ffmpeg_progress.php
// @version     2.4
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @icon        data:image/png;base64,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// @icon                data:image/png;base64,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
// ==/UserScript==

//http://s.ytimg.com/yts/img/favicon-vfldLzJxy.ico
if($('#watch7-user-header').length >0 ){ // on youtube
	//pop
	$('#watch7-user-header').append('<button id="pop" class = "yt-uix-expander-collapsed yt-uix-button yt-uix-button-default yt-uix-button-hh-default" data-tooltip-title="Pop!" >Pop</button> ');
	//y2mp3
	$('#watch7-user-header').append( ' <button id="mp3" class = "yt-uix-expander-collapsed yt-uix-button yt-uix-button-default yt-uix-button-hh-default" data-tooltip-title="Convertir la vidéo en fichier MP3 pour pouvoir l\'Écouter tranquillement :3" >Convertir en Mp3</button> ');
	$('#watch7-user-header').append('<button id="close_mp3" class = "yt-uix-expander-collapsed yt-uix-button yt-uix-button-default hidden yt-uix-button-hh-default" data-tooltip-title="Fermer la fenêtre du convertisseur" >Fermer</button> ');
	$('#__ffYoutube4').remove();
	document.getElementById('close_mp3').style.display = "none";
	iframeContainer = document.createElement("div");
	iframeContainer.setAttribute("id", "iframeContainer");
	iframeContainer.style.width = 0+"px";
	iframeContainer.style.top = "-17px"; iframeContainer.style.right = "3px";
	iframeContainer.style.height = 0+"px";
	//iframeContainer.style.position = "absolute";
	iframeContainer.style.overflow = "hidden";
	//iframeContainer.style.marginBottom = "20px";
	iframeContainer.style.position = "absolute";
	iframeContainer.style.background = "#fff";
	iframeContainer.style.zIndex = 100;
	iframeContainer.style.transition = 'all 1s';
	iframeContainer.style.whiteSpace = 'nowrap';
	iframeContainer.style.boxShadow = '3px 4px 7px #BEBEBE';
	//$('.watch-sidebar-section').prepend(iframeContainer);
    $('#watch7-user-header').append(iframeContainer);
	
	ifrm = document.createElement("IFRAME");
	ifrm.setAttribute("id", "ifm");
	ifrm.setAttribute("scrolling", "no");
	ifrm.style.overflow = "hidden";
	ifrm.style.width = 285+"px"; ifrm.style.height = "228px";
	ifrm.style.display = "block";
	iframeContainer.appendChild(ifrm);
	
	$('#iframeContainer').prepend('Site de conversion '
    	+'<button id="org" class = "yt-uix-subscription-button yt-uix-button yt-uix-button-subscribe-branded yt-uix-button-size-default" data-tooltip-title="On va la convertir" >.org</button>'
    	+'<button id="fr" class = "yt-uix-button-hh-default yt-uix-expander-collapsed yt-uix-button yt-uix-button-default" data-tooltip-title="On va la convertir" >.fr</button>');
	$('#alt').css({ "margin": "0 auto", "width": "275px"});
	$('.hidden').hide();
	$("#mp3").click(function(){
		$('#__ffYoutube4').remove();
        $("#iframeContainer").css({"width":"285px", "height":"258px", "padding":"5px", });
		$('#close_mp3').toggle();
		$('#mp3').toggle();
		$("#ifm").attr("src", "http://www.youtube-mp3.org/fr#youtube-url");
	});
	$("#close_mp3").click(function(){	
		$('#__ffYoutube4').remove();
        $("#iframeContainer").css({"width":"0px", "height":"0px", "padding":"0px"});
		$('#close_mp3').toggle();
		$('#mp3').toggle();
	});
	$("#fr, #org").click(function(){
		$("#fr, #org").removeAttr('css');
		$("#fr, #org").toggleClass('yt-uix-subscription-button  yt-uix-button-subscribe-branded yt-uix-button-size-default');
		if($('#fr').is('.yt-uix-button-subscribe-branded')){
	       $("#ifm").attr("src", "http://youtubemp3.fr");
		}
		else{
	       $("#ifm").attr("src", "http://www.youtube-mp3.org/fr#youtube-url");
		}
	   //$("#ifmAlt, #ifm").toggle();
	});

	$("#pop").click(function(){	
		window.open(window.location.href+"#watch-player",document.title,"menubar=no, status=no, scrollbars=no, resizable=no, left=0, top=0, menubar=no, width=560, height=315");
	});	
	/*
	b = document.getElementsByTagName("body")[0];
	title = document.getElementById("eow-title").innerHTML;
	t = b.innerHTML;	t = t.split("18|");	t=t[1].split(",");	t=t[0]+"&title="+title;	t= t.replace(/\\/gi, "");
	*/
}
if($('#youtube-url').length >0){ // on youtube-mp3.org
	bFrame = false ;
    
	var  url = document.referrer;
	$('#youtube-url')
	   .val(url)
	   .attr({'autocomplete': 'on',
	          'onclick':'return false;'})
	   .css('display','none')
	   .parents('body').css('margin','0');
	/*window.onload = function(){
        $('form').submit();
    }*/
	$('#submit')
	   .css({'border-style':'solid',
	         'border-color':'#CCCCCC #CCCCCC #AAAAAA',
	         'box-shadow':'0 0 1px #FFFFFF inset',
	         'font': '11px Arial',
	         'color':'#555555',
	         'background-image':'linear-gradient(to bottom, #FAFAFA 0px, #DCDCDC 100%)',
	         'height':'33px',
	         'width': '282px',
	         'float': 'left',
	         'font-weight':'bold',
	         'text-shadow':'0 1px 0 #FFFFFF'})
       .removeAttr('disabled')
       .click();
	$("body[onload] #content, body[onload] ").css("width", "230px");
	$('body[onload] h1, #description, #footer, #rad, #sad, #form>div').remove();
	$("body[onload]")
	   .css("background", "none")
	   .removeAttr('onload');
	$('#progress_info')
       .css('width', '274px')
	   .parent().css({
	   'width':'312px',
	   'float':'right'});
	$('#error_text').css('display', 'none !important');
	$('#conversionForm').text('');
	$("#content")
	   .attr('style', '')
	   .css('margin', '0');
   $('#submit').click(function(){
        console.log('dd');
    });
}

if($('#conversionForm').length > 0){ // http://youtubemp3.fr
	$('#banner-wrapper').css('background', 'none');
	$('#banner-wrapper>center').css('text-align', 'left');
	$('#banner-wrapper>center>p').remove();
	$('#conversionForm').parents('body')
        .css({'margin':'0',
	         'width':'285px',
	         'background':'none'})
        .find('#fb-root, iframe, #header, .fb-comments').remove();
	$('#conversionForm').parent().find('h2, h3, center, .menuBarContent').remove();
	$('#conversion-status').parent().find('h2, h3').remove();
	$('#conversionForm')
	   .css({'font-size':'0',
	         'padding':'0',
             'margin':'0',
             'border':'0'});
	$('#conversionForm').find('p')
	   .css({'width':'285px',
             'margin':'0'});
	$('#conversionForm').find('#videoURL')
	   .val(document.referrer)
       .css('display','none');
	$('#conversionForm').find('[type=radio]')
	   .css('opacity','0')
	   .not(':checked').remove();
	$('#conversionForm').find('[type=radio]').parent()
	   .css({'height':'0',
             'font-size':'0'});
	$('#conversionForm').find('p:not(:has(*)), i, .fb-like-box, #toggleOptionsDisplay').remove();
	$('#conversionForm').find('[type=submit],#videoURL').css('border-color','#CCCCCC #CCCCCC #AAAAAA');
	$('#conversionForm').find('[type=submit]')
	   .css({'background-color':'#E0E0E0',
	         'background-image':'linear-gradient(to bottom, #FAFAFA 0px, #DCDCDC 100%)',
	         'border-width':'1px',
	         'box-shadow':'0 0 1px #FFFFFF inset',
	         'text-shadow':'0 1px 0 #FFFFFF',
	         'color':'#555555',
	         'border-style':'solid',
	         'font-family':'arial',
	         'font-size':'11px',
	         'outline':'none',
	         'height':'33px',
	         'width':'282px',
	         'font-weight':'bold',
	         'margin-top':'3px'})
	     .val('Convertir la vidéo');
	$('#banner-wrapper').find('a').css('display', 'block');
	$('#banner-wrapper').parents('body').append('<style>#header {display:none; }</style>');
	$('#conversionSuccess a')
	   .css({'font-size':'12px!important',
             'color':'#000000',
             'display':'block' });
    if($('#conversion-status').length==0){
        $('#conversionForm').find('[type=submit]').click();
    }
    if($('#conversionSuccess').length==0){
        $('#conversionSuccess').find('a')[0].click();
    }
}