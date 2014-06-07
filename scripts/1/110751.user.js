// ==UserScript==
// @name           Notched - Indicate if Notch has replied to a topic on /r/minecraft comments
// @namespace      http://omgmog.net
// @description    Indicates if xNotch (notch) has replied to a topic on /r/minecraft comments
// @include        http://*.reddit.com/r/minecraft/comments/*
// @include        http://*.reddit.com/r/Minecraft/comments/*
// @version        1.2
// ==/UserScript==
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
  
}

function main(){
	jQuery.noConflict();
// notch
	var nc = jQuery(".author.id-t2_4ctjh").not(".gray").size();
	if(nc>0){
		jQuery("div.menuarea").prepend('<div class="notched"><p>Notch has replied!</p></div>');
		
		jQuery(".notched").css({
			'display':'block',
			'width':'100%',
			'line-height':'30px',
			'text-align':'center',
			'font-size':'20px',
			'background':'#ffff99',
			'color':'#000',
			'font-size':'14px'
		});
		
		jQuery(".notched").append('<ul />');
		jQuery(".author.id-t2_4ctjh").not(".gray").each(function(i){
			var time = jQuery(this).parent().find("time").text();
			var message = jQuery(this).parent().parent().parent().find(".usertext-body").text();
				message = message.replace(/['"]/g,"'");
			jQuery(this).attr("id","notch-"+i);
			jQuery(".notched ul").append('<li class="notch-'+i+'"><a href="#notch-'+i+'" title="'+message+'">'+time+' ago.</a></li>');			
$(this).parent().parent().css({'background':'#ffff99'});				
		});
		jQuery(".notched ul li:not(:eq(0))").prepend(' - ');
		jQuery(".notched ul li").css({
			'display':'inline',
			'font-size':'12px'
		});
	}
// mollstam
	var mc = jQuery(".author.id-t2_4rqu2").not(".gray").size();
	if(mc>0){
		jQuery("div.menuarea").prepend('<div class="mollstamed"><p>Mollstam has replied!</p></div>');
		
		jQuery(".mollstamed").css({
			'display':'block',
			'width':'100%',
			'line-height':'30px',
			'text-align':'center',
			'font-size':'20px',
			'background':'#ff99ff',
			'color':'#000',
			'font-size':'14px'
		});
		
		jQuery(".mollstamed").append('<ul />');
		jQuery(".author.id-t2_4rqu2").not(".gray").each(function(i){
			var time = jQuery(this).parent().find("time").text();
			var message = jQuery(this).parent().parent().parent().find(".usertext-body").text();
				message = message.replace(/['"]/g,"'");
			jQuery(this).attr("id","mollstam-"+i);
			jQuery(".mollstamed ul").append('<li class="mollstam-'+i+'"><a href="#mollstam-'+i+'" title="'+message+'">'+time+' ago.</a></li>');		

$(this).parent().parent().css({'background':'#ff99ff'});					
		});
		jQuery(".mollstamed ul li:not(:eq(0))").prepend(' - ');
		jQuery(".mollstamed ul li").css({
			'display':'inline',
			'font-size':'12px'
		});
	}
// jeb
	var jc = jQuery(".author.id-t2_3sp7p").not(".gray").size();
	if(jc>0){
		jQuery("div.menuarea").prepend('<div class="jebed"><p>Jeb has replied!</p></div>');
		
		jQuery(".jebed").css({
			'display':'block',
			'width':'100%',
			'line-height':'30px',
			'text-align':'center',
			'font-size':'20px',
			'background':'#99ffff',
			'color':'#000',
			'font-size':'14px'
		});
		
		jQuery(".jebed").append('<ul />');
		jQuery(".author.id-t2_3sp7p").not(".gray").each(function(i){
			var time = jQuery(this).parent().find("time").text();
			var message = jQuery(this).parent().parent().parent().find(".usertext-body").text();
				message = message.replace(/['"]/g,"'");
			jQuery(this).attr("id","jeb-"+i);
			jQuery(".jebed ul").append('<li class="jeb-'+i+'"><a href="#jeb-'+i+'" title="'+message+'">'+time+' ago.</a></li>');		

$(this).parent().parent().css({'background':'#99ffff'});					
		});
		jQuery(".jebed ul li:not(:eq(0))").prepend(' - ');
		jQuery(".jebed ul li").css({
			'display':'inline',
			'font-size':'12px'
		});
	}
};
addJQuery(main);