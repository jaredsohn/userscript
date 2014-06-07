// ==UserScript==
// @name           goushka22
// @namespace      escilon
// @description description
// @include        http://escilon.ru/dungeon1*
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



//follow_loc('dungeon12',210)

	    function follow_loc(type,id){
		$.blockUI({ css:"padding:10px 10px 10px 10px;", message: "<img title='\u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0435\u0445\u043E\u0434 \u043F\u043E \u043B\u043E\u043A\u0430\u0446\u0438\u0438' src=\""+static_images_path+"/design/loading.gif\" border=\"0\">"});
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
					$.blockUI({ css:"padding:10px 10px 10px 10px;", message: "<br><br>"+data["error"]+"<center><br><input type=\"button\" id=\"close\" value=\"\u0437\u0430\u043A\u0440\u044B\u0442\u044C\" style=\"width: 100px;\"><br><br></center>"});
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

setTimeout(function(){endPart();}, 5000);
function endPart()
 { 
  if (document.URL == 'http://escilon.ru/dungeon12/181/'){follow_loc('dungeon12',182)}
  if (document.URL == 'http://escilon.ru/dungeon12/182/'){follow_loc('dungeon12',183)}
  if (document.URL == 'http://escilon.ru/dungeon12/183/'){follow_loc('dungeon12',184)}
  if (document.URL == 'http://escilon.ru/dungeon12/184/'){follow_loc('dungeon12',185)}
  if (document.URL == 'http://escilon.ru/dungeon12/185/'){follow_loc('dungeon12',186)}
  if (document.URL == 'http://escilon.ru/dungeon12/186/'){follow_loc('dungeon12',156)}
  if (document.URL == 'http://escilon.ru/dungeon12/156/'){follow_loc('dungeon12',126)}
  if (document.URL == 'http://escilon.ru/dungeon12/126/'){follow_loc('dungeon12',127)}
  if (document.URL == 'http://escilon.ru/dungeon12/127/'){follow_loc('dungeon12',128)}
  if (document.URL == 'http://escilon.ru/dungeon12/128/'){follow_loc('dungeon12',129)}
  if (document.URL == 'http://escilon.ru/dungeon12/129/'){follow_loc('dungeon12',130)}
  if (document.URL == 'http://escilon.ru/dungeon12/130/'){follow_loc('dungeon12',160)}
  if (document.URL == 'http://escilon.ru/dungeon12/160/'){follow_loc('dungeon12',190)}
  if (document.URL == 'http://escilon.ru/dungeon12/190/'){follow_loc('dungeon12',191)}
  if (document.URL == 'http://escilon.ru/dungeon12/191/'){follow_loc('dungeon12',161)}
  if (document.URL == 'http://escilon.ru/dungeon12/161/'){follow_loc('dungeon12',162)}
  if (document.URL == 'http://escilon.ru/dungeon12/162/'){follow_loc('dungeon12',163)}
  if (document.URL == 'http://escilon.ru/dungeon12/163/'){follow_loc('dungeon12',133)}
  if (document.URL == 'http://escilon.ru/dungeon12/133/'){follow_loc('dungeon12',103)}
  if (document.URL == 'http://escilon.ru/dungeon12/103/'){follow_loc('dungeon12',73)}
  if (document.URL == 'http://escilon.ru/dungeon12/73/'){follow_loc('dungeon12',43)}
  if (document.URL == 'http://escilon.ru/dungeon12/43/'){follow_loc('dungeon12',13)}
  if (document.URL == 'http://escilon.ru/dungeon12/13/'){follow_loc('dungeon12',14)}
  if (document.URL == 'http://escilon.ru/dungeon12/14/'){follow_loc('dungeon12',15)}
  if (document.URL == 'http://escilon.ru/dungeon12/15/'){follow_loc('dungeon12',16)}
  if (document.URL == 'http://escilon.ru/dungeon12/16/'){follow_loc('dungeon12',46)}
  if (document.URL == 'http://escilon.ru/dungeon12/46/'){follow_loc('dungeon12',76)}
  if (document.URL == 'http://escilon.ru/dungeon12/76/'){follow_loc('dungeon12',106)}
  if (document.URL == 'http://escilon.ru/dungeon12/106/'){follow_loc('dungeon12',107)}
  if (document.URL == 'http://escilon.ru/dungeon12/107/'){follow_loc('dungeon12',108)}
  if (document.URL == 'http://escilon.ru/dungeon12/108/'){follow_loc('dungeon12',78)}
  if (document.URL == 'http://escilon.ru/dungeon12/78/'){follow_loc('dungeon12',48)}
  if (document.URL == 'http://escilon.ru/dungeon12/48/'){follow_loc('dungeon12',49)}
  if (document.URL == 'http://escilon.ru/dungeon12/49/'){follow_loc('dungeon12',50)}
  if (document.URL == 'http://escilon.ru/dungeon12/50/'){follow_loc('dungeon12',51)}
  if (document.URL == 'http://escilon.ru/dungeon12/51/'){follow_loc('dungeon12',52)}
  if (document.URL == 'http://escilon.ru/dungeon12/52/'){follow_loc('dungeon12',53)}
  if (document.URL == 'http://escilon.ru/dungeon12/53/'){follow_loc('dungeon12',54)}
  if (document.URL == 'http://escilon.ru/dungeon12/54/'){follow_loc('dungeon12',84)}
  if (document.URL == 'http://escilon.ru/dungeon12/84/'){follow_loc('dungeon12',114)}
  if (document.URL == 'http://escilon.ru/dungeon12/114/'){follow_loc('dungeon12',115)}
  if (document.URL == 'http://escilon.ru/dungeon12/115/'){follow_loc('dungeon12',116)}
  if (document.URL == 'http://escilon.ru/dungeon12/116/'){follow_loc('dungeon12',117)}
  if (document.URL == 'http://escilon.ru/dungeon12/117/'){follow_loc('dungeon12',87)}
  if (document.URL == 'http://escilon.ru/dungeon12/87/'){follow_loc('dungeon12',57)}
  if (document.URL == 'http://escilon.ru/dungeon12/57/'){follow_loc('dungeon12',58)}
  if (document.URL == 'http://escilon.ru/dungeon12/58/'){follow_loc('dungeon12',59)}
  if (document.URL == 'http://escilon.ru/dungeon12/59/'){follow_loc('dungeon12',89)}
  if (document.URL == 'http://escilon.ru/dungeon12/89/'){follow_loc('dungeon12',119)}
  if (document.URL == 'http://escilon.ru/dungeon12/119/'){follow_loc('dungeon12',149)}
  if (document.URL == 'http://escilon.ru/dungeon12/149/'){follow_loc('dungeon12',179)}
  if (document.URL == 'http://escilon.ru/dungeon12/179/'){follow_loc('dungeon12',209)}
  
if (document.URL == 'http://escilon.ru/dungeon13/181/'){follow_loc('dungeon13',182)}
if (document.URL == 'http://escilon.ru/dungeon13/182/'){follow_loc('dungeon13',152)}
if (document.URL == 'http://escilon.ru/dungeon13/152/'){follow_loc('dungeon13',122)}
if (document.URL == 'http://escilon.ru/dungeon13/122/'){follow_loc('dungeon13',123)}
if (document.URL == 'http://escilon.ru/dungeon13/123/'){follow_loc('dungeon13',124)}
if (document.URL == 'http://escilon.ru/dungeon13/124/'){follow_loc('dungeon13',94)}
if (document.URL == 'http://escilon.ru/dungeon13/94/'){follow_loc('dungeon13',95)}
if (document.URL == 'http://escilon.ru/dungeon13/95/'){follow_loc('dungeon13',96)}
if (document.URL == 'http://escilon.ru/dungeon13/96/'){follow_loc('dungeon13',97)}
if (document.URL == 'http://escilon.ru/dungeon13/97/'){follow_loc('dungeon13',98)}
if (document.URL == 'http://escilon.ru/dungeon13/98/'){follow_loc('dungeon13',68)}
if (document.URL == 'http://escilon.ru/dungeon13/68/'){follow_loc('dungeon13',69)}
if (document.URL == 'http://escilon.ru/dungeon13/69/'){follow_loc('dungeon13',70)}
if (document.URL == 'http://escilon.ru/dungeon13/70/'){follow_loc('dungeon13',71)}
if (document.URL == 'http://escilon.ru/dungeon13/71/'){follow_loc('dungeon13',72)}
if (document.URL == 'http://escilon.ru/dungeon13/72/'){follow_loc('dungeon13',102)}
if (document.URL == 'http://escilon.ru/dungeon13/102/'){follow_loc('dungeon13',103)}
if (document.URL == 'http://escilon.ru/dungeon13/103/'){follow_loc('dungeon13',104)}
if (document.URL == 'http://escilon.ru/dungeon13/104/'){follow_loc('dungeon13',105)}
if (document.URL == 'http://escilon.ru/dungeon13/105/'){follow_loc('dungeon13',76)}
if (document.URL == 'http://escilon.ru/dungeon13/76/'){follow_loc('dungeon13',77)}
if (document.URL == 'http://escilon.ru/dungeon13/77/'){follow_loc('dungeon13',78)}
if (document.URL == 'http://escilon.ru/dungeon13/78/'){follow_loc('dungeon13',79)}
if (document.URL == 'http://escilon.ru/dungeon13/79/'){follow_loc('dungeon13',80)}
if (document.URL == 'http://escilon.ru/dungeon13/80/'){follow_loc('dungeon13',110)}
if (document.URL == 'http://escilon.ru/dungeon13/110/'){follow_loc('dungeon13',111)}
if (document.URL == 'http://escilon.ru/dungeon13/111/'){follow_loc('dungeon13',112)}
if (document.URL == 'http://escilon.ru/dungeon13/112/'){follow_loc('dungeon13',113)}
if (document.URL == 'http://escilon.ru/dungeon13/113/'){follow_loc('dungeon13',143)}
if (document.URL == 'http://escilon.ru/dungeon13/143/'){follow_loc('dungeon13',173)}
if (document.URL == 'http://escilon.ru/dungeon13/173/'){follow_loc('dungeon13',203)}
if (document.URL == 'http://escilon.ru/dungeon13/203/'){follow_loc('dungeon13',204)}
if (document.URL == 'http://escilon.ru/dungeon13/204/'){follow_loc('dungeon13',205)}
if (document.URL == 'http://escilon.ru/dungeon13/205/'){follow_loc('dungeon13',206)}
if (document.URL == 'http://escilon.ru/dungeon13/206/'){follow_loc('dungeon13',176)}
if (document.URL == 'http://escilon.ru/dungeon13/176/'){follow_loc('dungeon13',175)}
if (document.URL == 'http://escilon.ru/dungeon13/175/'){follow_loc('dungeon13',145)}
if (document.URL == 'http://escilon.ru/dungeon13/145/'){follow_loc('dungeon13',115)}
if (document.URL == 'http://escilon.ru/dungeon13/115/'){follow_loc('dungeon13',85)}
if (document.URL == 'http://escilon.ru/dungeon13/85/'){follow_loc('dungeon13',55)}
if (document.URL == 'http://escilon.ru/dungeon13/55/'){follow_loc('dungeon13',56)}
if (document.URL == 'http://escilon.ru/dungeon13/56/'){follow_loc('dungeon13',57)}
if (document.URL == 'http://escilon.ru/dungeon13/57/'){follow_loc('dungeon13',87)}
if (document.URL == 'http://escilon.ru/dungeon13/87/'){follow_loc('dungeon13',88)}
if (document.URL == 'http://escilon.ru/dungeon13/88/'){follow_loc('dungeon13',89)}
if (document.URL == 'http://escilon.ru/dungeon13/89/'){follow_loc('dungeon13',119)}
if (document.URL == 'http://escilon.ru/dungeon13/119/'){follow_loc('dungeon13',149)}
if (document.URL == 'http://escilon.ru/dungeon13/149/'){follow_loc('dungeon13',179)}
if (document.URL == 'http://escilon.ru/dungeon13/179/'){follow_loc('dungeon13',209)}
if (document.URL == 'http://escilon.ru/dungeon13/209/'){follow_loc('dungeon13',210)}
}
}