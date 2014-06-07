// ==UserScript==
// @name           goushka
// @namespace      escilon
// @description description
// @include        http://escilon.ru/dungeon12/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require  http://static.escilon.ru/js/jquery.blockUI.js
// @require  http://static.escilon.ru/js/jquery-1.5.2.min.js
// @require  http://static.escilon.ru/js/nature.full.js
// ==/UserScript==

var static_images_path='http://static.escilon.ru';
//Ïîäêëþ÷àåì jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

//Ïðîâåðêà, çàãðóæåí ëè jQuery
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

//Âåñü âàø jQuery êîä äîëæåí áûòü â ýòîé ôóíêöèè
function letsJQuery() {

setTimeout(function(){
endPart();
}, 7000);
function endPart()
 { 
  if (document.URL == 'http://escilon.ru/dungeon12/209/'){
  location.href = 'http://escilon.ru/go/dungeon12/210/'
  follow_loc('dungeon12',210)}

  if (document.URL == 'http://escilon.ru/dungeon12/210/'){
  location.href = 'http://escilon.ru/go/dungeon12/209/'
  follow_loc('dungeon12',209)}
}
}


//switch (document.URL){
//case 'http://escilon.ru/dungeon12/209/': location.href = 'http://escilon.ru/go/dungeon12/210/'
//break
//case 'http://escilon.ru/dungeon12/210/': location.href = 'http://escilon.ru/go/dungeon12/209/'
//break
//default: alert('Oops!')} 

	    function follow_loc(type,id){
		$.blockUI({ css:"padding:10px 10px 10px 10px;", message: "<img title='Ð·Ð°Ð³Ñ€ÑƒÐ¶Ð°ÐµÑ‚ÑÑ Ð¿ÐµÑ€ÐµÑ…Ð¾Ð´ Ð¿Ð¾ Ð»Ð¾ÐºÐ°Ñ†Ð¸ÑÐ¼' src=\""+static_images_path+"/design/loading.gif\" border=\"0\">"});
	        $.ajax({
			url:'/ajax/follow_location.php',
			data:{
				type: type,
				id: id
			},
			dataType:'json',
			success:function(data){
				if (data['error']){
					$.unblockUI();
					$.blockUI({ css:"padding:10px 10px 10px 10px;", message: "<br><br>"+data["error"]+"<center><br><input type=\"button\" id=\"close\" value=\"Ð·Ð°ÐºÑ€Ñ‹Ñ‚ÑŒ\" style=\"width: 100px;\"><br><br></center>"});
					$('#close').click(function(){
						$.unblockUI();
                                        });
				}else{
					if (data['timer']==0){
						$.unblockUI();
						reloadlocation();
					}else{
						$.unblockUI();
						$.blockUI({ message: '<div style="background: url(http://static.escilon.ru/images/locations/'+data['follow_image']+'); height: 200px; background-position: center;"><h3 style="color: white; text-shadow: 3px 3px 3px #000;">'+data['follow_text']+'<br><div class="timeleft" id="timeleft">'+data["timer"]+'</div></h3></div>' });
						setTimeout(decTimeout,1000);
						setTimeout(function(){$.unblockUI();follow_loc(type,id);},data['timer']*1000);
						following=1;
					}
				}
			},
			error: function(a,b,c){
				$.unblockUI();
			}
                });
	    }

