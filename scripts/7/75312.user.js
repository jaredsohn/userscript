// ==UserScript==
// @name           Habra More Posts Autoloader
// @namespace      http://userscripts.org/users/nexis
// @description    подгружает содержимое следующей страницы при просмотре хабры
// @include        http://*habrahabr.ru/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var leftArrow=document.createElement("img");
leftArrow.src = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA1CAYAAABBecueAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA/pJREFUeNqtmLluU0EUhi+vgOjpEUUkoKSJRIsQD0BHnwcIoqOYBokHocme2L5ZJMcOIomI7XhJ4iV2Ehc0eO3M/4/mjMbOnWsncqSjkWPfz/9Z5pwZB6PRKJinBQcHB2p/f1/t7e2p3d1dFYahSqVSS8lk8kMikXizs7Pzent7+9nW1lawubkZbGxsaFtfXw/W1ta0ra6uBisrK9p8QAWgAlABqABUAH4B8CNgT+YFVAAqwJZhL+YJ1AbgwryBCrCFe8BisdihlUqlLu36+rpXqVT+1vBXKpZO0ul0COAPD5D2MhII65bLZQ28uLjocW00Gv3Ly8t+vV5vZ7PZ0ANUAD63wHw+3ykUCp3z83OrkEDAXGAf/xsU8oVfHuCSBeZyOQ30Kby6urJA/G9wenqajgAqwN5boMRQgFBlgdVq1QLxetBsNjvJROJnBHA5EkhXCeSKvGiFXEVhq9Ua4HUVwO8TQNrTwMRPA5HdLhT0oKrH1QXiPaob3NzcEDrMZDJhBPCVTgqNMRQgAD0DHgNSnQDx+k8E8F1gYGMxJBBx0wrdLBvY4Pb2dlir1moRwM/3gCZ2OoYEESgxFCDWIb64HwH8ZuuQMBphNLew6TpdFuDd3R2Bwwig0kmhQUGXJkDGUIBuDAWI96OBzDCBeFADGTsagSZ2Yy4z04yhV6ELZJYJY/ykbNwYAmSTgs/Eu4zy0EBJCGPI2EUB2+22X6F0GzxkgaKSNShArNZlAmNjSCAVMoZYe4uLiyNCXaAbw1iFUKW3HtzTQG47AmkEut1mJoX4oAWyDkWhCzV72gJjywaQWCAtCsj9/GCXXZubyz6Fj3bZF0Ovyy6QdegCue1cIItagOw4Xpe5UySGbP+EcSVQ+uEkcGpS8JBWSBA+zKLmbNFAM6xmU0iX0Vz11uMYkJlMIBXSXCAHFZuDF0iFAuSwFyDLh+oIpMswrU7aV2wMuZcZQ8SyK0OeTYIwfKEGciaLywR6Yyh1yObgAqmQMBpdpkK3wU5VyAwzhoydjFLXZSpkP5wKxENjQFehJIVAJgPZlWHv3ylMigAlKZMuuwqnjlGWDYGcKeb0YLMshc2HJYYyU/B+9KAXIIuaCgk03doCmRTJsiislMvRRxHZy2wM4jKBolA6NoGSZQK9hyUCuZd5FGHZUNk0IF77j3PSHAjEsUQDTclYoLhsktJJJVP+AyfLZlKhaQwW6Cbl+Pdx/JFYgBJDgcnWY1KgSjeH3NmZ99BuL48AWIUukHG0Wa43WpnDw9hrxRjQnG8sEKB/UNTENeLkKHsU4jYVe/GZ5Xo789Vs1vvyTJfHh1zAp15vH3qjj72AP+Yngq8AfgLwrfxEMOtvDv8B3inp07xm4iEAAAAASUVORK5CYII='

function al(msg){unsafeWindow.alert(msg)} //задолбало при тестах каждый раз писать длинную конструкцию. unsafe - ибо использую http://userscripts.ru/js/nice-alert/, красивее.
//al($('#footer').css({'position':'fixed', 'bottom':'0px', 'top':'80%'}));
//al($('#footer')[0].style.innerTEXT);
$("#main-content").append('<div id="pagi"><br/></div>');
var lmpObj = $("#pagi"); //by id name

if ($(".next")) var nextURL = $(".next").attr("href");

var pgNumInc = 0;
if (lmpObj && lmpObj[0] && nextURL)
{
  lmpObj = lmpObj[0];
  var timeout = null;
  window.addEventListener('scroll', function()
  {
    if (lmpObj.className.indexOf('js-loading') == -1 && window.pageYOffset + document.body.clientHeight + 500 > findPos(lmpObj)[1])
    {
      if (pgNumInc==0) //если счетчик не тикает
      {
        if (nextURL.match('page')) 
        {
          d = nextURL.split('/');
          for (i = 0; i < d.length; i += 1) 
          {
            //unsafeWindow.alert(d[i]);
            if (d[i].substring(0,4)=='page') 
            { 
              var pgNum = parseInt(d[i].substring(4));
              //unsafeWindow.alert(pgNum);
              pgNumInc = pgNum;
              
            }
          }
	}
      }
      else //если счетчик тикает
      { 
	nextURL = document.getElementsByClassName("next")[0].href;
        //al("номер подгружаемой страницы! "+pgNumInc+" "+nextURL);
        pgNumInc=pgNumInc+1;
      }

      $('<div id="page'+pgNumInc+'"></div>').insertBefore('#pagi');
      $('#page'+pgNumInc).load(nextURL+' #main-content div.hentry, div.page-nav, div.items, div#people-wrapper');
      $(".next-prev").remove(); //убьем  кусок с туда-сюда, а то это туда-сюда бесит и раздражает
    }  
  }, false);
};

footTopPos=document.body.clientHeight-190;
$('body').append('<div id="foot-clicker" title="развернуть/свернуть подвал"></div>');
$('#foot-clicker').css({'position':'fixed', 'width':'20px', 'height':'53px', 'bottom':'170px','left':'0px','background-image':'url('+leftArrow.src+')', 'background-repeat':'no-repeat'}).click(function () {
if ($("div#footer:first").is(":hidden")) {
$("div#footer").slideDown("slow");
} else {
$("div#footer").hide();
}
});

$('#footer').css({'position':'fixed', 'bottom':'0px', 'top':+footTopPos+'px', 'background-color':'#fff', 'display':'none'});


// (c) ppk, http://www.quirksmode.org/js/findpos.html
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
		  curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
    while (obj = obj.offsetParent);
		return [curleft,curtop];
	}
}

