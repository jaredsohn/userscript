// ==UserScript==

// @name           9lala

// @author         liangguohuan

// @email	   liangguohuan@gmail.com

// @description    9lala.com 优化浏览，详细页面自动加载图片

// @mod_date       2011-11-21

// @version        1.1

// @namespace      http://www.9lala.com/

// @include        http://www.9lala.com/*

// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js

// ==/UserScript==

var currUrl = document.location.href;

var reg = /html/;

var regDetial = /[\d]{1,}_[\d]{1,}\.html/



if ((!reg.test(currUrl)))

{

    //the home page handdle

    var add_css = '\

    #myfavarite {\n\

        clear:both;\n\

        border:1px #ccc solid;\n\

        -moz-border-radius: 0.25em;\n\

    }\n\

    #myfavarite ul {\n\

        display: inline-block;\n\

        padding-left:9px;\n\

    }\n\

    #myfavarite ul li {\n\

        border-bottom: 1px dotted #C0C0C0;\n\

        float: left;\n\

        height: 25px;\n\

        line-height: 25px;\n\

        overflow: hidden;\n\

        padding: 5px 10px;\n\

        width: 214px;\n\

        font-size: 14px;\n\

    }\

    ';

    var style = document.createElement('style');

    style.type = 'text/css';

    style.innerHTML = add_css;

    $('head:eq(0)').append(style);

	

	$('#main').prepend('<div id="myfavarite"><ul></ul></div>');
	/*
	* jquery 1.5.1 start, the attribute mimeType has support for overrideMimeType
	*/

	$.each(['Naruto','hzw','Bleach'], function(i, item){
		$.ajax({ 

	        url: 'http://www.9lala.com/html/' + item + '/',
	        mimeType:"text/html; charset=" + document.characterSet,

	        success: function(data){

                $('#myfavarite > ul').append( $(data).find('#viewlist_1 li:lt(4)') );

            }

        });
        /*

		GM_xmlhttpRequest({

	        method: 'GET',

	        url: 'http://www.9lala.com/html/' + item + '/',

	        overrideMimeType: 'text/html; charset=' + document.characterSet,

	        onload: function(responseDetails) {

		        $('#myfavarite > ul').append( $(responseDetails.responseText).find('#viewlist_1 li:lt(4)') );

	        }

	    });*/

	});

}

else

{

	var leftWidth = $('#left').outerWidth();

	$('body').css('background-image', 'none');

	$('#header_scroll').remove();

	$('#site').remove();

	$('#left').remove();

	$('#right > #detail').remove();

	$('#right > #copyurl').remove();

	$('#right > .comicnotice').remove();

	$('#right').css('margin-right', leftWidth/2 + 'px');



	var page = 2;



	if(regDetial.test(currUrl)) {

		var total = $('#selectpage1 > select > option').size();

		var imageslist = unsafeWindow.imageslist;

		$('.page,#viewpage2').remove();

		$('#footer').remove();



		while ((page <= total))

		{

			var imgurl = "http://mh2.9lala.com" + imageslist[page];

			var img = $('<img src="' + imgurl + '" />').bind('load', function(){

				if($('#viewimages').outerWidth() < $(this).outerWidth()) {

					$('#viewimages').css('width', $(this).outerWidth() + 'px');

				}

			});

			$('#viewimages').append(img);

			page++;

		}

	}

}