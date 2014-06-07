// ==UserScript==
// @name           Virtonomica: управление предприятиями v.2
// @namespace      virtonomica
// @version 2.1
// @description    Добавление нового функционала к управлению предприятиями
// @include        http://*virtonomic*.*/*/main/company/view/*/unit_list
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

	// поиск эффективности
	$("td.u-f").each(function() {
		// эффективность
		ef = parseInt( $(this).text() );
		if (ef < 100) {
			$(this).css("color", 'red');
		}
	});

	var url = /^http:\/\/virtonomic[as]\.(\w+)\/\w+\//.exec(location.href)[0];

	// Список с ячейками, содержащими названия подразделений
	var list = $('td[class^=u-c]');

	var input_ef = $('<select>')
			.append('<option value=-1>Все</option>')
			.append('<option value=10>< 100%</option>')
			.append('<option value=100>100%</option>')
			.append('<option value=0>0%</option>').change(function() {
		var find_count = 0;
		list.each(function() {
        		var needle = input_ef.val();
			// поиск эффективности
			var ef = parseInt ( $(this).next().next().next().next().text() );

			var find =  -1;	
			switch( needle ) {
				case '10': {
					if ( (ef >0)  && (ef != 100) ) find = 1;
					break;
				}
				case '100':  {
					if (ef == 100) find = 1;
					break;
				}
				case '0': {
					if (ef == 0) find = 1;
					break;
				}
				case '-1': find = 1; break;
			}

			// заметки
			var find_notes = 0;
			if ( ( $(this).parent().next().prop("class") == "u-z") ||
			     ( $(this).parent().next().prop("class") == "u-z ozz")
			   ) {
				find_notes = 1;
			}
            		if ( find ==  -1) {
	                	$(this).parent().hide();
				if ( find_notes == 1 ) $(this).parent().next().hide();
			} else {
	                	$(this).parent().show();
				find_count++
				if ( find_notes == 1 ) $(this).parent().next().show();
			}


		});
		if ( find_count == 0) $("#ef_info").html ("&nbsp;");
		else $("#ef_info").html ("(" + find_count + ")");
	});


	// Клик по эффективности
	$(list).next().next().next().next().css('cursor', 'pointer').prop('title', 'Узнать прогноз эффективности').click(function() {
		var td = $(this);
        	td.empty().append($('<img>').attr({'src': 'http://s3.devels.info/load.gif', 'height': 16, 'width': 16}).css('padding-right', '20px'));

		var el = $("td.u-f", $(this).parent() );
		var id  = el.text() ;
        	$.get(url + 'window/unit/productivity_info/' + id, function(data) {
            		var percent = $('td:contains(Эффективность работы) + td td:eq(1)', data).text().replace('%', '').trim();
            		var color = (percent == '100.00' ? 'green' : 'red');
            		var html = percent + '<i>%</i>';

            		td.css('color', color).html(html);
        	});
	});

	var container = $("td.u-l").parent().parent();

	var input2 = $('<input>').prop('id','i_name').attr({type: 'text', value: ''}).change( function() {

		//alert( list.length );
//        	var needle = new RegExp('^\\s*' + input.val(), 'i');
        	var needle2 = new RegExp(input2.val(), 'i');

		var find_count = 0;
		list.each(function() {
			// если фильтр не задан, то показать все что есть
			if (needle2.length == 0) {
                		$(this).parent().show();
                		return;
            		}
			// заметки
			var find_notes = 0;
			if ( ( $(this).parent().next().prop("class") == "u-z") ||
			     ( $(this).parent().next().prop("class") == "u-z ozz")
			   ) {
				find_notes = 1;
			}
			// применить фильтр
			var fff=$(this).text().trim()
//			alert(fff)
//			alert(needle)
            		if (fff.search(needle2) == -1) {
                		$(this).parent().hide();
				if ( find_notes == 1 ) $(this).parent().next().hide();
            		} else {
                		$(this).parent().show();
				find_count++;
				if ( find_notes == 1 ) $(this).parent().next().show();
            		}

        	});
		if ( find_count == 0) $("#find_info").html ("&nbsp;");
		else $("#find_info").html ("(" + find_count + ")");
    	});
	
	var list1 = $('td[class^=u-a]');
	var input1 = $('<input>').prop('id','i_city').attr({type: 'text', value: '', style: 'width: 18%' }).change( function() {

		//alert( list.length );
//        	var needle = new RegExp('^\\s*' + input.val(), 'i');
        	var needle1 = new RegExp(input1.val(), 'i');

		var find_count = 0;
		list1.each(function() {
			// если фильтр не задан, то показать все что есть
			if (needle1.length == 0) {
                		$(this).parent().show();
                		return;
            		}
			// заметки
			var find_notes = 0;
			if ( ( $(this).parent().next().prop("class") == "u-z") ||
			     ( $(this).parent().next().prop("class") == "u-z ozz")
			   ) {
				find_notes = 1;
			}
			// применить фильтр
			var fff=$(this).text().trim()
//			alert(fff)
//			alert(needle1)
            		if (fff.search(needle1) == -1) {
                		$(this).parent().hide();
				if ( find_notes == 1 ) $(this).parent().next().hide();
            		} else {
                		$(this).parent().show();
				find_count++;
				if ( find_notes == 1 ) $(this).parent().next().show();
            		}

        	});
		if ( find_count == 0) $("#find_city").html ("&nbsp;");
		else $("#find_city").html ("(" + find_count + ")");
    	});
	var list3 = $('td[class^=u-d]');
	var input3 = $('<input>').prop('id','i_val').attr({type: 'text', value: '', style: 'width: 18%' }).change( function() {

		//alert( list.length );
//        	var needle = new RegExp('^\\s*' + input.val(), 'i');
        	var needle3 = new RegExp(input3.val(), 'i');

		var find_count = 0;
		list3.each(function() {
			// если фильтр не задан, то показать все что есть
			if (needle3.length == 0) {
                		$(this).parent().show();
                		return;
            		}
			// заметки
			var find_notes = 0;
			if ( ( $(this).parent().next().prop("class") == "u-z") ||
			     ( $(this).parent().next().prop("class") == "u-z ozz")
			   ) {
				find_notes = 1;
			}
			// применить фильтр
			var fff=$(this).text().trim()
//			alert(fff)
//			alert(needle3)
            		if (fff.search(needle3) == -1) {
                		$(this).parent().hide();
				if ( find_notes == 1 ) $(this).parent().next().hide();
            		} else {
                		$(this).parent().show();
				find_count++;
				if ( find_notes == 1 ) $(this).parent().next().show();
            		}

        	});
		if ( find_count == 0) $("#find_val").html ("&nbsp;");
		else $("#find_val").html ("(" + find_count + ")");
    	});

	var list4 = $('td[class^=u-e]');
	var input4 = $('<input>').prop('id','i_prod').attr({type: 'text', value: '', style: 'width: 30%' }).change( function() {

		//alert( list.length );
//        	var needle = new RegExp('^\\s*' + input.val(), 'i');
        	var needle4 = new RegExp(input4.val(), 'i');

		var find_count = 0;
		list4.each(function() {
			// если фильтр не задан, то показать все что есть
			if (needle4.length == 0) {
                		$(this).parent().show();
                		return;
            		}
			// заметки
			var find_notes = 0;
			if ( ( $(this).parent().next().prop("class") == "u-z") ||
			     ( $(this).parent().next().prop("class") == "u-z ozz")
			   ) {
				find_notes = 1;
			}
			// применить фильтр
			var fff=$(this).text().trim()
			var t_text=""
			var ftat2=this.getElementsByTagName('img')
			if (ftat2.length!=0) {
			  for (var x=0; x<ftat2.length; x++) {
			  t_text=t_text+ftat2[x].title.toLowerCase()
			}
			}
// 			alert(needle4)
// 			alert(t_text)
// 			alert(t_text.indexOf(input4.val().trim()))
            		if (fff.search(needle4) == -1 && t_text.indexOf(input4.val().trim().toLowerCase())== -1) {
                		$(this).parent().hide();
				if ( find_notes == 1 ) $(this).parent().next().hide();
            		} else {
                		$(this).parent().show();
				find_count++;
				if ( find_notes == 1 ) $(this).parent().next().show();
            		}

        	});
		if ( find_count == 0) $("#find_prod").html ("&nbsp;");
		else $("#find_prod").html ("(" + find_count + ")");
    	});

	var ext_panel = $("#extension_panel1");
	if ( ext_panel.length  == 0 ) {
		// если панели еще нет, то доабвить её
		var panel1 = "<div style='padding: 2px; border: 1px solid #0184D0;  border-right-style: none; border-radius: 4px 0px 0px 4px; float:left; white-space:nowrap; color:#0184D0; width: 100% '  id=extension_panel1></div>";
		var panel2 = "<div style='padding: 2px; border: 1px solid #0184D0; border-left-style: none; border-radius: 0px 4px 4px 0px; float:right; white-space:nowrap; color:#0184D0; width: 100% '  id=extension_panel2></div>";
//		var select_unittype = $("select.unittype");
//		alert (select_unittype)
//		if ( select_unittype.length  == 0 ) { container.append( "<tr><td></td><td>" +panel );}
		container.append( "<tr><td>" +panel1 );
		container1=$("#extension_panel1").parent().parent()
//		alert(container1)
		container1.append( "<td>" +panel2);
	}
	$("#extension_panel1").append(  " Город: " ).append("<span id=find_city>&nbsp;</span> ").append( input1).append( "&nbsp;")
	$("#extension_panel1").append(  " Название: " ).append("<span id=find_info>&nbsp;</span> ").append( input2).append( "&nbsp;")
	$("#extension_panel1").append(  " Размер: " ).append("<span id=find_val>&nbsp;</span> ").append( input3).append( "&nbsp;")
	$("#extension_panel2").append(  " Продукция: " ).append("<span id=find_prod>&nbsp;</span> ").append( input4).append( "&nbsp;")
	$("#extension_panel2").append( "Эфф.: ").append("<span id=ef_info>&nbsp;</span> ").append(input_ef);
	// Не забыть убрать
//	$("#extension_panel").append("&nbsp;").append(input_id);
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}