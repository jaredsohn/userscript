// ==UserScript==
// @name FaithPlus
// @namespace FaithPlus
// @version 1.0
// @author Ator
// @description FaithPlus
// @include http://vkontakte.ru/*
// @include http://*.vkontakte.ru/*
// @include http://*.vk.com/*
// @include http://vk.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

var elem = $("#page_body");
elem.bind('DOMSubtreeModified', handler);

if (elem) {
	for each(var val in GM_listValues()) {
		if(val.match(/var_/) == null) continue;
		name = GM_getValue(val).split(/ /)[1];
		element = "#results a:contains('"+name+"')";
		$(element).css("display", "none");
		
		id = GM_getValue(val).match(/[0-9]+/); //id
		idToHide = '#user_block'+id; //id блока + id пользователя
		$(idToHide).css("display", "none");
	}
}

function handler(event) {
	$(element).css("display", "none");
	$(idToHide).css("display", "none");	
}



/// Интерфейс

/* Добавляем в меню скрипта форму ввода скрываемых в списке друзей ID */
var form = 
"<div id='fp' style='position: fixed; bottom: 0; right: 0; background: #fff; display: none; padding: 10px; border: 1px solid #E0E0E0'"+
"name='fp'>"+
"<div id='doHide' style='background: url(\"/images/pics/statusx_op.gif\") no-repeat scroll 0 0 transparent; height: 17px; width: 17px; position: absolute; right: 5px; opacity: 0.3;'><div></div></div>"+
"<div id='hideList' style='width: 250px'></div><br><b>Новый фильтр:</b> <a href='#' style='font-size: 90%; color: #2b587a' id='tT'>(?)</a><br><input style='margin-top: 1px' type='text' id='addId' name='addId'>"+
"<div class='button_blue' style='margin-left: 5px;;' ><button id='doAdd'>+</button></div>"+
//"<br><center><div class='button_blue' style='margin-top: 10px'><button id='doHide'>Скрыть</button></div></center>"+
"<div id='toolTip' style='position: absolute; bottom: 50px; padding: 5px; background-color: #F7F7F7; border: 1px dashed #D7D7D7; display: none; opacity: 0.01;'>Введите строку формата \"123456 Василий\", где 123456 - id страницы, которую Вы хотите отфильтровать, а Василий - ключевое слово (имя или фамилия из заголовка фильтруемой страницы)</div>" +
"</div>";

$("body").append(form);

GM_registerMenuCommand("Редактирование hide-списка", editList);

function varsExists() {
	var i = 0;

	for each(var val in GM_listValues()) {
		if(val.match(/var_/));
			i++;
	}
	if (i>0)  return i;
	
	return false;
}

function editList() {
	$("#fp").css("display", "block");
	count = varsExists();
	var i = 0;
	if(GM_listValues().length > 0 && count != false) {

		$("#hideList").append('<h2>Фильтруемые страницы:</h2>');
		$("#hideList").append('<table cellpadding="5" cellspacing="0">' +
							  '<tr style="" bgcolor="#e3e3e3"><td align="left"><b>id</b></td><td><b>Ключевое слово</b></td><td></td></tr>');
		for each (var val in GM_listValues()) {
			if(val.match(/var_/) == null) continue;
			id = val;
			i++;
			if ((i % 2) == 0) bgcolor="#F3F3F3"
			else bgcolor="#e3e3e3";
			ID = id.replace(/var_/, '');
			pattern = GM_getValue(val).split(/ /)[1];
			$("#hideList table").append('<tr bgcolor="' + bgcolor +'" id="row_'+id+'"><td align="left" id="'+id+'">'+ ID + '</td>' +
										'<td align="left">' + pattern + '</td>' + 
										'<td align="left"><a style="color: #666; opacity: 0.5" href="#" class="deleteId" id="'+id+'">[ удалить ]</a></td></tr>');			
		}
	if( count > 1)
		$("#hideList table").append('<tr><td></td><td></td><td align="left"><a id="deleteAll" href="#" style="color: #666; opacity: 0.5; position: relative; margin: 0 auto; width: 50px;">[ удалить все ]</a></td></tr>');
	
	$("#hideList a").hover(function() { $(this).animate({ opacity: 1 }, 250)}, function () {$(this).animate({ opacity: 0.5 }, 100) });
	$("#doHide").hover(function() { $(this).animate({ opacity: 0.8 }, 250)}, function () {$(this).animate({ opacity: 0.3 }, 100) });
	$("#hideList").append('<table>');	
	}
	else $("#hideList").append("Hide-лист пуст.<br><br>");
	
	$("#tT").hover(	function () {
							  $("#toolTip").css("display", "block").animate( { opacity: 0.9 }, 100 );
							  
							  },
					function () {
							  $("#toolTip").animate( { opacity: 0 }, 100, function() {$(this).css("display", "none");})
							  });
	
	
	document.getElementById('fp').addEventListener('click', function(event) {
																 
																 if(event.target.getAttribute('class') == 'deleteId') {
																	var toDelete = event.target.getAttribute('id');
																	GM_deleteValue(toDelete);
																	document.getElementById('row_'+toDelete).style.display = 'none';
																	refreshList();
																	return;
																 }
																 
																 switch(event.target.getAttribute('id')) {
																  	case 'doAdd':	
																		doAdd();
																		refreshList();																																															
																		break;
																	case 'deleteAll':
																		for each (var val in GM_listValues())
																			if(val.match(/var_/)) {
																				GM_deleteValue(val);
																				refreshList();		
																			}
																		break;
																	case 'doHide':
																		document.getElementById('fp').style.display = 'none';
																		$("#fp").remove();
																		$("body").append(form);
																		break;
																  	default:
																  		//alert(event.target.getAttribute('id'));
																  	break;																  	
																  	
																 }
																	}, true);
	
	document.getElementById('addId').addEventListener('keydown', function(event) {
																	 if(event.keyCode == 13) {
																		 doAdd(); refreshList();
																	 }
																	 }, false)
																 

}

function doAdd() {
	var varName = 'var_' + document.getElementById('addId').value.split(/ /)[0];
	if(document.getElementById('addId').value.length > 0) {
		GM_setValue(varName, uConvert(document.getElementById('addId').value));
		//document.getElementById('fp').style.display = 'none';
		refreshList();
	} else alert('Введите ID');

}
function refreshList() {
	$("#fp").remove();
	$("body").append(form);
	editList();
}

 function _c(_s,x,y,z) {
    var const208 = String.fromCharCode(x);
    var const896 = x==208 ? 896 : 960;
    for (var i = y, j = y + z; i < j; i++)
      _s = _s.replace(new RegExp(const208 + String.fromCharCode(i), "g"),
                              String.fromCharCode(i+const896));
    return _s;
  }
  
  function uConvert(_s) {
    return _c(_c(_c(_c(_s,
           209,145,1), // yo
           209,128,16),// Cyrillic Small letters
           208,129,1), // YO
           208,144,48);// Cyrillic Capital letters
  }
  



