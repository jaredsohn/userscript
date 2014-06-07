// ==UserScript==
// @name        Modifer
// @namespace   moswar
// @include     http://www.moswar.ru/*
// @exclude     http://www.moswar.ru/@/*
// @exclude     http://www.moswar.ru/js/*
// @exclude     http://www.moswar.ru/css/*
// @version     1.04
// ==/UserScript==

if (location.href!=top.location.href) {
	exit;
}

var $;
var Paths;

function GoToFactory(){
	location.href='/factory/';
}

function shop(){
	if (Paths.length>=3){
		if (Paths[2]=='mine'){
			for (var i=0;i<$(".object").length;i++){
			
/*				if ($(".object h2").eq(i).html()=='Кнут «Пряничный»'){
					Debug($(".object").eq(i).attr('rel'));
					
					unsafeWindow.shopSellItem($(".object").eq(i).attr('rel'), '/shop/section/mine/');
					return;
				}
				if ($(".object h2").eq(i).html()=='Отбойный молоток'){
					Debug($(".object").eq(i).attr('rel'));
					
					unsafeWindow.shopSellItem($(".object").eq(i).attr('rel'), '/shop/section/mine/');
					return;
				}
				if ($(".object h2").eq(i).html()=='Титановая каска'){
					Debug($(".object").eq(i).attr('rel'));
					
					unsafeWindow.shopSellItem($(".object").eq(i).attr('rel'), '/shop/section/mine/');
					return;
				}*/
				if ($(".object h2").eq(i).html()=='Серебряная цепочка [3]'){
				//	Debug($(".object").eq(i).attr('rel'));
					
					$("#idMainElement").html('Продаем мод цепочку.');
					unsafeWindow.shopSellItem($(".object").eq(i).attr('rel'), '/shop/section/mine/');
					return;
				}
			}
		}
	}
	$("#idMainElement").html('Ничего для продажи нет.');
}

function factory(){
//alert($(".ruda-block").attr('title').substr(6,5));
	if (parseInt($(".ruda-block").attr('title').substr(6,5))<=300) {
	
		$("#idMainElement").html('Недостаточно руды.');
		return;
	}
	if (Paths.length==4){
		//Debug($(".object-current h2").html().substr(0,18));
		var strCaption = $(".object-current h2").html();
		var strHtml = $(".lc .padding").eq(0).html();
		if (strHtml.indexOf('accessory7.png')<=0){
			$("#idMainElement").html('Не цепочка.');
			return;
		}
		var strMf = $(".lc .padding .mf").eq(0).html().substr(1); 
		var iLevel=parseInt(strMf);
		if (iLevel>=3) {
			setTimeout("document.location.href = '/factory/mf/';",200);
			$("#idMainElement").html('Возвращаемся.');
			return;
		}
		
		$("#idMainElement").html('Модифицируем.');
		$("form").submit();
		return;
	}
	if (Paths.length==3){
		if (Paths[1]=='mf'){
			var j=0;
			for (var i=0;i<$("*[data-type=jewellery]").length;i++){
				var strSrc = $("*[data-type=jewellery]").eq(i).attr('src');
				
				if (strSrc!='/@/images/obj/accessory7.png') continue;
				
				var iDivCount = $("*[data-type=jewellery]").eq(i).parent().children('div').length;
				if (iDivCount==1){
					var strOnClick = $("*[data-type=jewellery]").eq(i).parent().children('div').attr("onclick");
					setTimeout(strOnClick,200);
					return;
				}else{
					var strMLevel = $("*[data-type=jewellery]").eq(i).parent().children('div').eq(0).html().substr(2,2);
					if (parseInt(strMLevel)>=3) continue;
					var strOnClick = $("*[data-type=jewellery]").eq(i).parent().children('div').eq(2).attr("onclick");
					setTimeout(strOnClick,200);
					return;
				}
			}
			$("#idMainElement").html('Цепочек для мод. не найдено.');
		}
	}
}

function base(){
	if (Paths[0]=='factory'){
		//alert(1);
		setTimeout(factory,1000);
	}

	if (Paths[0]=='shop'){
		//alert(1);
		setTimeout(shop,1000);
	}
}


function Start(){
	Paths = location.href.split('/');
	Paths.splice(0,3);
	if ((Paths[0]!='factory') && (Paths[0]!='shop'))return;
	$('body').append('<div id="idMainElement" style="position:absolute;top:0px;right:0px;width:400px;background:#BBBBFF;">&nbsp;</div>');
	base();
}

function Init(){
	if (unsafeWindow.jQuery === undefined) {
		setTimeout(Init,500);
	} else {
	  $ = unsafeWindow.jQuery;
	  Start();
	}	
}

Init();