// ==UserScript==
// @name          Improved Coppermines Albums
// @version       2.3.2
// @date          25-12-2011
// @description   Improves Coppermine by providing Rollover Images,Fullscreen Slideshow, Direct Full Image Links, Custom Borders, Autoload all pages, Downthemall Supported!!!
// @namespace     http://www.Google.com/
// @require 	  http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require 	  http://sizzlemctwizzle.com/updater.php?id=76351&days=1&show
// @include       http://*
// ==/UserScript==

//	MAKE SURE THAT ALL THE VARIABLES HAVE PROPER VALUES				//

//						SETTINGS									//
var preview_postion='left'	//	left/right Rollover preview position
var close_delay = 50		//	millisecond to wait before closing the preview after mouse
							//	leaves the image (MINIMUM 50).
var background_opacity=0.6	//	0-1 0=Transparent, 1=Opaque Black
var menu_postion='right'	//	left/right side of screen
//	Add the parameters that you want to add below the images.
//	ONLY THOSE PARAMETERS WILL WORK WHICH ARE DISPLAYED IN THE IMAGE (TITLE) TOOLTIP.
var image_info=['filesize','dimensions'];
var remove_tootips=true		//	Remove the annoying Tooltips.


//	Add custom borders to the images according to image size.
//	IT WILL ONLY WORK IF SIZE IS PROVIDED IN THE IMAGE (TITLE) TOOLTIP

//	FORMAT:			{size: your size here, color: color for images above this size}
//	NOTE:			Put the SIZES in INCREASING ORDER, or else the coloring will be incorect.
//	#567, #010101 	Hexadecimal values for color are also accepted
var bcolor=[{size: 200, color: '#129704'},{size: 400, color: 'red'},{size: 500, color: '#000'}];
var bsize=3					//	Border size ONLY NUMBER

//					USER SETTINGS END HERE							//

//	DO NOT EDIT BELOW THIS LINE IF YOU DO NOT WHAT YOU ARE DOING	//

$(function(){

	if($('a[href*=coppermine]').size()==0)
		return;
		
	var load_preview=GM_getValue("load_preview", true);
	var load_delay=GM_getValue("load_delay", 500);
	var keep_open=GM_getValue("keep_open", false);
	var auto_load_pages=GM_getValue("auto_load_pages", false);
	
	if(close_delay=="undefined" || close_delay<50)
		close_delay=50;
		
		
	var auto_sup=/album=(\d+)/.test(location.search)
	if(auto_sup){
		var image_no=0,m_over=false;
		var pgs = $('td.navmenu>a:not(:has(img)):last').text();
		var album_no=/album=(\d+)/.exec(location.search)[1]
		if(/page=(\d+)/.test(location.search))
			var load_pgno=/page=(\d+)/.exec(location.search)[1]
		else var load_pgno=1
	}
	
	istyle();
	
	$(window).resize(function(){
		$('#istyle').remove();
		istyle();
	}).keydown(function(e){
		switch(e.keyCode){
			case 65:	load_pages(++load_pgno,true);
						break;
			case 75:	if(keep_open)
							$('#mkopen').prop('checked',false);
						else $('#mkopen').prop('checked',true);
						change_keep_open();
						break;
			case 78:	load_pages(++load_pgno);
						break;
			//case 80:	load_pages(--load_pgno,true);
			//			break;
			case 82:	if(load_preview)
							$('#mroll').prop('checked',false);
						else $('#mroll').prop('checked',true);
						change_load_preview();
						break;
			case 83:	slide_show();
						break;
			case 27:	iend();
		}
	});
	
	var imgs=cdirect();
	$('#pview>.ipview').live('click',function(e){
		if(!e.shiftKey)	$(this).css({'max-height':1500});
		else $(this).css({'max-height':$(window).height()});
	})
	
	
	$('<div id="imenu" class="sshow"/>')
		.hover(function(){
			$(this).children('#mmenu').fadeIn();
		},function(){
			$(this).children('#mmenu').fadeOut();
		})
		.append('<h2 id="moptions">Options</h2>').find('#moptions')
			.show().end()
		.append('<div id="mmenu"/>').find('#mmenu')
		.append('<em id="sslide" class="mbutton">SlideShow</em>').find('#sslide').click(slide_show).end()
		.append('<label id="loadonce" class="mbutton">Load All Pages</label>')
			.find('#loadonce').click(function() {
				load_pages(++load_pgno,true)
			}).end()
		.append('<input type="checkbox"'+((load_preview)?'checked="checked"':'')+'id="mroll" value="roll"/><label for="mroll">Roll Over</label><br>').find('#mroll').change(change_load_preview).end()
		.append('<input type="checkbox"'+((keep_open)?'checked="checked"':'')+'id="mkopen" value="roll"/><label for="mkopen">Keep Open</label><br>')
			.find('#mkopen').change(change_keep_open).end()
		.append('<input type="checkbox"'+((auto_load_pages)?'checked="checked"':'')+'id="auto_load" value="roll"/><label for="auto_load">Always Autoload</label><br>')
			.find('#auto_load').change(change_auto_load).end()
		.append('<input type="text" id="mdelay" value="'+load_delay+'" size="4"/><em>Delay</em>')
			.find('#mdelay').change(function(){
				load_delay=$(this).val();
				GM_setValue("load_delay", load_delay);
		}).closest('#imenu')
	.appendTo('body');
	

	$('<div id="pview" class="pview"/>').appendTo('body').hide().mouseover(function(){
		m_over=true;
	}).mouseleave(function(){
		m_over = false;
		close_pview(0);
	});

	if(auto_load_pages)
		load_pages(++load_pgno);
		
	function cdirect(){
		return $('a[href*="displayimage"]:not(a[href*=thumbnails]):has(img),a[href*="javascript"]:has(img)')
		.parent().each(function(i,e){
			var a=$('a:has(img)',e);
			var im=$(this).find('img');
			
			if(im[0].title!=""){
				for(var i=0;i<bcolor.length;i++){
					var s=/filesize=(\d+)/i.exec(im[0].title);
					try{
						if(s[1]>=bcolor[i].size)
							im.css('border',bsize+'px solid '+bcolor[i].color);
					}catch(e){
						console.log("Error in borders:"+bcolor[i]);
					}
				}
				
				for(var i=0;i<image_info.length;i++){
					var r=new RegExp(image_info[i]+'=(.*)','i');
					var s=r.exec(im[0].title);
					try{
						$(this).append("<span>"+s[1]+"</span><br>");
					}catch(e){
						console.log("Info parameter:"+image_info[i]+" is Invalid for some images");
					}
				}
			}
			
			if(remove_tootips) im.attr('title','');
			
			if($(e).find('span').length>0)
				$(e).find('span').wrap('<a id="cpo"/>').parent().attr({'href':a[0].href,"onclick":a.attr('onclick')});
			else $(e).append('<span>Original</span>').find('span').wrap('<a id="cpo"/>').parent().attr({'href':a[0].href,"onclick":a.attr('onclick')});
				
			a.attr({'href':im[0].src.replace(/thumb_/,"")}).removeAttr("onclick")
			.hover(function(e){
				setTimeout(function(){
					m_over = false;
					
						if(load_preview || e.shiftKey){
							close_pview(1);
							$('#pview').append('<img src="'+a[0].href+'" class="ipview"/>').show();
						}
						
					}, load_delay)
				},
				function(){
					setTimeout(function(){if(!m_over) close_pview(0);}, close_delay)
				}
			);
		}).end().toArray();
	}


	function slide_show(){
		image_no=0;
		$('#pview').addClass('spview')
		.append('<div id="darkb" class="pview spview"/>')
		.append('<div id="iprev" class="nav"/>').find('#iprev').click(iprev).end()
		.append('<div id="inext" class="nav"/>').find('#inext').click(inext).end()
		.append('<h2 id="iend" class="sshow iend">Close</h2>').find('#iend').click(iend).end()
		.append('<h2 id="ninfo" class="sshow iend"></h2>').find('#ninfo').css('top',50).end()
		.append('<div id="sview" class="sview"/>').fadeIn("slow").find('#sview')
		.append('<img class="ipview"/>')
		.append('<img id="nbuff" class="inone"/>')
		.append('<img id="pbuff" class="inone"/>');
		
		$('.ipview').attr('src',imgs[image_no])
		$('#nbuff').attr('src',imgs[image_no+1]);
		update_ninfo();
		$(document).keydown(function(e){
			switch(e.keyCode){
			case 39:	inext();
						break;
			case 37:	iprev();
						break;
			case 27:	iend();
			}
		});
	}
	
	function inext(){
		if(image_no >= imgs.length-1)
			return;
		$('.ipview').attr('src',"").attr('src',imgs[++image_no])
		$('#nbuff').attr('src',imgs[image_no+1]);
		update_ninfo();
	}
	
	function iprev(){
		if(image_no <= 0)
			return;
		if(image_no>=imgs.length)
			image_no--;
		$('.ipview').attr('src',"").attr('src',imgs[--image_no])
		$('#pbuff').attr('src',imgs[image_no-1]);
		update_ninfo();
	}
	
	function iend(){
		$(document).unbind('keydown');
		$('#pview').fadeOut('slow',function(){
			$(this).removeClass('spview').empty();
		})
	}
	
	function update_ninfo(){
		$('#ninfo').text((image_no+1)+'/'+imgs.length);
	}
	
	function close_pview(f){
		if(keep_open && f==0)
			return;
		$('#pview>img').load(function(e){
			$(e.target).remove()
		}).detach();
	}
	
	function change_load_preview(){
		load_preview=$('#mroll').prop('checked');
		if(!load_preview)	$('#pview>img').remove();
		GM_setValue("load_preview", load_preview);
	}
	
	function change_keep_open(){
		keep_open=$('#mkopen').prop('checked');
		if(!keep_open)	$('#pview>img').remove();
		GM_setValue("keep_open", keep_open);
	}
	
	function change_auto_load(){
		if(!auto_sup) return;
		auto_load_pages=$('#auto_load').prop('checked');
		if(auto_load_pages) load_pages(++load_pgno);
		GM_setValue("auto_load_pages", auto_load_pages);
	}
	
	function istyle(){
		var style='<style type="text/css" id="istyle">\n';
		style+='.ipview {max-height:'+$(window).height()+'px;max-width:'+$(window).width()+'px;}\n';
		style+='.sshow {float:left; position:fixed; top:10px;'+menu_postion+':10px; width:120px; height:200px;padding-top:10px;c ursor:pointer;}\n';
		style+='.sshow #mmenu {margin-top:20px;display:none;}\n'
		style+='.sshow #moptions {font:italic bold 1.4em/1.6 arial,serif;cursor:default}\n'
		style+='.sshow #mmenu * {font:italic bold 1.2em/1.4em arial,serif; margin:10px 5px 0 0; cursor:pointer;}\n'
		style+='.mbutton {display:block;}'
		style+='.pview {'+preview_postion+':0px; position:fixed; top:0px;z-index:100;overflow: auto;max-height:'+$(window).height()+'px;max-width:'+$(window).width()+'px;}\n';
		style+='.spview {height:'+$(window).height()+'px;width:'+$(window).width()+'px;}';
		style+='#darkb {background-color:black;opacity:'+background_opacity+';}';
		style+='.nav {position:fixed;width:40%;height:100%;z-index:104;}';
		style+='#inext {right:0px;}';
		style+='.iend {background-color:#0a0a0a;color:#a0a0a0;z-index:104;width:100px;height:30px; text-align:center;line-height:30px;cursor:default}';
		style+='.sview {text-align:center;z-index:103;position:relative}';
		style+='.inone {display:none;}';
		style+='</style>';
		
		$(style).appendTo('head');
	}
	
	function load_pages(lpage,lall){
		if(!auto_sup) return;
		if(lpage<=pgs){
			$.get(location.pathname,{album:album_no,page:lpage},
			function(data){
				$('.thumbnails').parent(':last').after('<h1 class="tableh1">Page '+(lpage)+'</h1>').next().after($('.thumbnails',data).parent());

				$.merge(imgs,cdirect());
				if(auto_load_pages || lall)
					load_pages(++lpage,lall);
			});
		}
	}
});