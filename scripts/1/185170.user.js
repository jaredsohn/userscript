// ==UserScript==
// @id             baibako.tv-b41fdde9-468e-439a-9e78-1e845700e12a@scriptish
// @name           baibako main page features
// @version        2.0.3
// @history        2.0.3 Адаптация под изменения html сайта.
// @history        2.0.1 Обновил позицию кнопки подгрузки материалов и высоту блока с ними после подгрузки
// @history        2.0.0 Новый дизайн, новые блоки, новое расположение.
// @history        1.0.2(3) Сделал сворачивение блока под стиль сайта, на куках.
// @history        1.0.1 Убрал замену магазинчика и вставил колонку перед ним
// @history        1.0.0 Релиз
// @namespace      http://userscripts.org/scripts/show/185170
// @author         Black_Sunlight (Black_Sun)
// @include        http://baibako.tv/
// @include        http://baibako.tv/index.php?page=*
// @require	http://code.jquery.com/jquery-latest.min.js
// @run-at         document-end
// ==/UserScript==

$(function(){
	$('div.grid_16:nth-child(4)').attr('style','max-height: 550px;overflow: auto;')
	$('.grid_16 table.main').append("<a href='javascript:void(0)' id='loadbutton' onclick='load_content()'>Подгрузить 2 страницы</a>");
	$('head').append("<script src='http://code.jquery.com/jquery-latest.min.js' type='text/javascript'></script><style>#sbair table b:first-child {display:block}#sbair table b:not(:first-child){color:green}#loadbutton{position:relative;left:232px;margin-top:5px;margin-bottom:-5px;padding: 4px;display: block;text-align: center;font-weight: bold;color: #FFF;background-color: #008CFF;border: 1px solid #008CFF;border-radius: 3px;text-decoration:none}#loadbutton:hover{background-color: #0050E0;border: 1px solid #0050E0;}#loadbutton:active{background-color: #003AA8; border: 1px solid #003AA8}</style>");
	append(NewScript1);
});
function NewScript1(){
	function load_when(url){
		$.when($.ajax(typeof(url)!='undefined'?url:'/air.php')).done(function(data){
			if(typeof(url)!='undefined'){
				$('#air').html($('table.table:nth-child(6)',data).html())
				$('#air').find('td').find('br').remove();
				$('#airnav').html($('.main',data).html())
			}
			else if($('.main',data))
{
			$('div.container_24:nth-child(4)').prepend('<div class="grid_24"><h3>Информация о выходе серий <span onclick="toggle()" style="cursor:pointer;float:right"><img id="picbair" border="0" src="pic/minus.png" tooltip="Показать/Скрыть"></img></span></h3><div id="sbair" class="blockcontent" style="display:none">'+$('div.container_24:nth-child(1) > div:nth-child(1)',data).html()+'</div></div>');
				$('#sbair').find('h1').remove();
				$('#sbair').find('p').remove();
				$('#sbair').find('br').remove();
				$('#sbair').find('table').eq(0).remove();
				$('#sbair').find('table').eq(0).attr('id','air');
				$('#sbair').find('table').eq(1).attr('id','airnav');
				$('#sbair').show();
			}
			$('#airnav').find('tbody').eq(-1).attr('style','float:left').find('a').each(function(){
				var href=$(this).attr('href').split('?')[1]
				$(this).attr({
					onclick:"$('div.main').html('Loading...');load_when('/air.php?"+href+"')",
					href:'javascript:void(0)'
				})
			})
			if(getCookie('airtoggle')=='a'){$('#sbair').hide();$('#picbair').attr('src','/pic/plus.png')}
		});
	}
	function toggle(){
		var block=$('#sbair')
		
		if(block.is(':hidden')){
			$('#picbair').attr('src','/pic/minus.png')
			block.slideDown(300);
			$.macaroon("airtoggle",null)
		}
		
		else {
			$('#picbair').attr('src','/pic/plus.png')
			block.slideUp(300);
			$.macaroon("airtoggle", "a",{expires: 3650});
		}
		
	}
	function load_content(){
		$('#loadbutton').attr('disabled',true)
		$.when($.ajax("/index.php?page=1"), $.ajax("/index.php?page=2")).done(function(a1, a2){
			var content=$('div.grid_16:nth-child(4) > table:nth-child(3)',a1[2].responseText).html()+$('div.grid_16:nth-child(4) > table:nth-child(3)',a2[2].responseText).html()
			$('div.grid_16:nth-child(4) > table:nth-child(3)').append(content);
			$('#loadbutton').hide();
		});
	}
	window.addEventListener('load',function(){
		$('head').append("<script src='http://raw.github.com/Black-Sunlight/lib-files/master/jquery.bp.macaroon.min.js' type='text/javascript'></script>");
			load_when();
	},false)
	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	
}

function append(s) {	 
	document.head.appendChild(document.createElement('script'))
	.innerHTML = s.toString().replace(/^function.*{|}$/g, '');
}