// ==UserScript==
// @name           БЧБ Сцяг еБеларусі
// @namespace      БЧБ
// @author         JanLysy
// @description    Скрыпт, які змяняе сцяг еБеларусі з чырвона-зялёнага на Бел-Чырвона-Белы!
// @version        1.1
// @match          http://*.erepublik.com/*
// @include        http://*.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        https://raw.github.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.min.js
// ==/UserScript==

var GMTransport = function(url, onDone){
    setTimeout(function(){GM_xmlhttpRequest({
        method : "GET",
        url : url,
        onload : function(x) {
          var o = x.responseText;
          if (onDone) {
            onDone(o);
          }
        }
      });},0);
};

GMTransport('http://erep.byethost10.com/banner.php', function(data){
   data = $.parseJSON(data);
   
if (data.status == "show"){
     $(".header_info").before('<div class="hip" style="float: left; display: none; widht: 425; height: 25; padding-left: 40px; padding-top: 10px;"><a href="" target="_blank"><img src=""></a></div>');


		$(".facebook_like").css("display","none");
		$(".hip a").attr("href",data.url);
		$(".hip a img").attr("src",data.img);
		$(".hip").css("display","block");		
	};
});


$('div#header > div#logo > a').css('background-image','url(\"http://img252.imageshack.us/img252/3186/55183228.png\")');

var allImages = document.getElementsByTagName("img");
for(var v=0;v<allImages.length;v++){
	var src = allImages[v].getAttribute("src");

	//---Name
	//1. -,flags
	//2. e,flags
	//3. s,flags
	//4. -,flags_png
	//5. e,flags_png
	//6. s,flags_png

	//---S

	//1
	if(src.match("/images/flags/S/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("/images/flags/S/Belarus.gif","http://img823.imageshack.us/img823/1680/84987538.gif"));
	}
	//2
	if(src.match("http://www.erepublik.net/images/flags/S/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("http://www.erepublik.com/images/flags/S/Belarus.gif","http://img823.imageshack.us/img823/1680/84987538.gif"));
	}
	//3
	if(src.match("http://static.erepublik.net/images/flags/S/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("http://static.erepublik.net/images/flags/S/Belarus.gif","http://img823.imageshack.us/img823/1680/84987538.gif"));
	}
	//4
	if(src.match("/images/flags_png/S/Belarus.png")){
		allImages[v].setAttribute("src",src.replace("/images/flags_png/S/Belarus.png","http://img585.imageshack.us/img585/7874/94746907.png"));
	}
	//5
	if(src.match("http://s2.www.erepublik.net/images/flags_png/S/Belarus.png")){
		allImages[v].setAttribute("src",src.replace("http://s2.www.erepublik.net/images/flags_png/S/Belarus.png","http://img585.imageshack.us/img585/7874/94746907.png"));
	}
	//6
	if(src.match("http://static.erepublik.net/images/flags_png/S/Belarus.png")){
		allImages[v].setAttribute("src",src.replace("http://static.erepublik.net/images/flags_png/S/Belarus.png","http://img585.imageshack.us/img585/7874/94746907.png"));
	}
	//7
	if(src.match("http://www.erepublik.net/images/flags_png/S/Belarus.png")){
		allImages[v].setAttribute("src",src.replace("http://www.erepublik.net/images/flags_png/S/Belarus.png","http://img585.imageshack.us/img585/7874/94746907.png"));
	}

	//---M

	//1
	if(src.match("/images/flags/M/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("/images/flags/M/Belarus.gif","http://img38.imageshack.us/img38/9062/89072402.gif"));
	}
	//2
	if(src.match("http://www.erepublik.net/images/flags/M/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("http://www.erepublik.net/images/flags/M/Belarus.gif","http://img38.imageshack.us/img38/9062/89072402.gif"));
	}
	//3
	if(src.match("http://static.erepublik.net/images/flags/M/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("http://static.erepublik.net/images/flags/M/Belarus.gif","http://img38.imageshack.us/img38/9062/89072402.gif"));
	}
	//4
	if(src.match("/images/flags_png/M/Belarus.png")){
		allImages[v].setAttribute("src",src.replace("/images/flags_png/M/Belarus.png","http://img846.imageshack.us/img846/8687/46434461.png"));
	}
	//5
	if(src.match("http://s2.www.erepublik.net/images/flags_png/M/Belarus.png")){
		allImages[v].setAttribute("src",src.replace("http://s2.www.erepublik.net/images/flags_png/M/Belarus.png","http://img846.imageshack.us/img846/8687/46434461.png"));
	}
	//6
	if(src.match("http://static.erepublik.net/images/flags_png/M/Belarus.png")){
		allImages[v].setAttribute("src",src.replace("http://static.erepublik.net/images/flags_png/M/Belarus.png","http://img846.imageshack.us/img846/8687/46434461.png"));
	}

	//---L

	//1
	if(src.match("/images/flags/L/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("/images/flags/L/Belarus.gif","http://img801.imageshack.us/img801/3830/61539021.gif"));
	}
	//2
	if(src.match("http://www.erepublik.net/images/flags/L/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("http://www.erepublik.net/images/flags/L/Belarus.gif","http://img801.imageshack.us/img801/3830/61539021.gif"));
	}
	//3
	if(src.match("http://static.erepublik.net/images/flags/L/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("http://static.erepublik.net/images/flags/L/Belarus.gif","http://img801.imageshack.us/img801/3830/61539021.gif"));
	}
	//4
	if(src.match("/images/flags_png/L/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("/images/flags_png/L/Belarus.gif","http://img38.imageshack.us/img38/6130/15913888.png"));
	}
	//5
	if(src.match("http://www.erepublik.net/images/flags_png/L/Belarus.png")){
		allImages[v].setAttribute("src",src.replace("http://www.erepublik.net/images/flags_png/L/Belarus.png","http://img38.imageshack.us/img38/6130/15913888.png"));
	}
	//6
	if(src.match("http://static.erepublik.net/images/flags_png/L/Belarus.png")){
		allImages[v].setAttribute("src",src.replace("http://static.erepublik.net/images/flags_png/L/Belarus.png","http://img38.imageshack.us/img38/6130/15913888.png"));
	}

	//---XL

	//1
	if(src.match("/images/flags/XL/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("/images/flags/XL/Belarus.gif","http://img690.imageshack.us/img690/1693/41563146.gif"));
	}
	//2
	if(src.match("http://www.erepublik.net/images/flags/XL/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("http://www.erepublik.net/images/flags/XL/Belarus.gif","http://img690.imageshack.us/img690/1693/41563146.gif"));
	}
	//3
	if(src.match("http://static.erepublik.net/images/flags/XL/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("http://static.erepublik.net/images/flags/XL/Belarus.gif","http://img690.imageshack.us/img690/1693/41563146.gif"));
	}
	//4
	if(src.match("/images/flags_png/XL/Belarus.gif")){
		allImages[v].setAttribute("src",src.replace("/images/flags_png/XL/Belarus.gif","http://img269.imageshack.us/img269/5273/56439927.png"));
	}
	//5
	if(src.match("http://www.erepublik.net/images/flags_png/XL/Belarus.png")){
		allImages[v].setAttribute("src",src.replace("http://www.erepublik.net/images/flags_png/XL/Belarus.png","http://img269.imageshack.us/img269/5273/56439927.png"));
	}
	//6
	if(src.match("http://static.erepublik.net/images/flags_png/XL/Belarus.png")){
		allImages[v].setAttribute("src",src.replace("http://static.erepublik.net/images/flags_png/XL/Belarus.png","http://img269.imageshack.us/img269/5273/56439927.png"));
	}
}

//(c) Lysy Jan 27-29.05.2012
//(c) edited by EJII 05.05.2013