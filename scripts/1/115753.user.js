// ==UserScript==
// @name           Virtonomica:Notes
// @namespace      Virtonomica
// @description    Система добавления и показа оповещений
// @version        0.16
// @include        http://*virtonomic*.*/*/main/unit/view/*
// @include        http://*virtonomic*.*/*/main/company/view/*/unit_list
// ==/UserScript==
var run = function() {
   var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   $ = win.$;

   /**
   * записать данные в локальнео хранилище, с проверкой ошибок
   */
   function ToStorage(name,  val)
   {
       try {
           window.localStorage.setItem( name,  JSON.stringify( val ) );
       } catch(e) {
           out = "Ошибка добавления в локальное хранилище";
           //console.log(out);
       }
   }

   function getFromStorage(obj, id_shop)
   {
       if (obj[id_shop] == null) return '';
       return JSON.stringify(obj[id_shop]);
   }

/**
* Добавить заметку к текущему предприятию
* следует вызывать на страницах где одно подраздление, ИД которого виден в url
*
* @param msg текст сообщения, можно использовать html теги
*/
function addNotes( msg ){
    // объект для хранения сообщений
    notes = JSON.parse( window.localStorage.getItem('notes') );
    if ( notes == null ) notes = new Object();

    // Идентификатор подразделения
    var id = /(\d+)/.exec(location.href)[0];
     
    var head = $("#headerInfo");
    var title = $("h1", head).text();

    head = $("div.officePlace");
    var type = head.text();
    var nn = type.indexOf("компании");
    if (nn > 0){
     type = type.substring(0, nn);
     var ptrn = /\s*((\S+\s*)*)/;
     type = type.replace(ptrn, "$1");
     ptrn = /((\s*\S+)*)\s*/;
     type = type.replace(ptrn, "$1");
    } else {
     type = '';
    }

    if ( notes[id] == null ) notes[id] = new Object();

    var d = new Date();

    if ( notes[id]['text'] != null) {
      // сообщение для этого подраздления уже есть
      msg = notes[id]['text'] + "<br>" + msg;
    }

    notes[id]['text'] = msg;
    // Количество миллисекунд
    notes[id]['time'] = d.getTime();
    notes[id]['name'] = title;
    notes[id]['type'] = type;

    ToStorage('notes', notes);
}

   var txt = "<table><tr><td><td><table width=100%><tr><td align=rigth id=notes_title><td align=center><h3>Напоминания</h3></table><td>&nbsp;"
   +"<tr><td>&nbsp;<td align=center id=notes_form>&nbsp;<td>&nbsp;"
   +"<tr><td colspan=3></table>";
   var div_form = "<div id=notes style='background: none repeat scroll 0% 0% rgb(223, 223, 223); z-index: 1002; position: absolute; border: 1px solid rgb(0, 0, 0); display: none;'>" + txt + "</div>";

   var div_export = "<div id=notes_export style='background: none repeat scroll 0% 0% rgb(223, 223, 223); z-index: 1003; position: absolute; border: 1px solid rgb(0, 0, 0); display: none;'>"
   + "<h3>Данные экспорта</h3>"
   + "<table><tr><td>&nbsp;<td>"
   + "<textarea name=export_text id=export_text rows=10 cols=64></textarea>"
   + "<br><center><span id=export_load></span></center>"
   + "</table>";
   + "</div>";

   var tu = $("table.unit-list");
   if (tu.length == 1) {
       // Это у нас список подразделений - рисуем кнопку отображения отчета со сылками
       // Оповещения
       notes = JSON.parse( window.localStorage.getItem('notes') );
       if ( notes == null ) notes = new Object();
       var len = 0;

       // проверить, какие оповещения отразить как актуальные
       for (key in notes){
           len++;
       }

// http://cdn1.iconfinder.com/data/icons/Upojenie_by_SoundForge/Icons/Notes.png
// http://www.iconsearch.ru/uploads/icons/crystalclear/24x24/kedit.png

       var wc = $("<li><div id=main_notes style='float:left;cursor:pointer; color: white;'> <img alt='Список напоминаний' src=http://cdn1.iconfinder.com/data/icons/humano2/32x32/apps/gnome-sticky-notes-applet.png> <span id=all_notes> ("+ len+")</span></div>").click( function() {
           $("#notes").toggle();
           if( $('#notes').is(':visible') ) {
                   // код для visible
               // Оповещения
               notes = JSON.parse( window.localStorage.getItem('notes') );
               if ( notes == null ) notes = new Object();

               // Формируем ссылку на торговый зал
               var url = /^http:\/\/virtonomic[as]\.(\w+)\/\w+\//.exec(location.href)[0];
               console.log(url);

               var all_count = 0;
               $("#notes_form").html('');
               var out = $("<table>");
               for (key in notes){
                   if (notes[key] == null) continue;
                   if (notes[key]['time'] == null) continue;

                   // подсчитываем сколько у нас оповещениий
                   // TODO - учитывать только акутальные
                   all_count++;

                   var d = new Date();
                   d.setTime(notes[key]['time']);

                   link = "<a href=" + url + "main/unit/view/" + key + ">" + notes[key]['name'] + "</a>";
                   span = $("<span name=" + key + " style='cursor:pointer;' title='del'><font color=red><b>Х</b></font></span>").click(
                   function(){
                       idp = $(this).attr('name');
                       //alert('del = ' + idp);
                       delete notes[idp];
                       ToStorage('notes', notes);
                       $("#main_notes").click().click();
                   });

                   out_tr = $("<tr>");
                   out_tr.append("<td>" + d.toLocaleDateString())
                   .append("<td>" + link)
                   .append("<td>(" + notes[key]['type'] + ")")
                   .append("<td style='border: 1px solid gray; border-radius: 4px 4px 4px 4px; box-shadow: 0 1px 3px 0 #999999; display: block; float: left; margin-top: 4px; overflow: hidden; padding: 2px 4px;  text-align:left'>" + notes[key]['text'])
                   .append("<td>").append(span);
                   out.append(out_tr);
                   str = "(" + all_count +")";
                   if (all_count == 0)  str = '';
                   $("#all_notes").html("(" + all_count +")");
               }
               $("#notes_form").html( out );

           }
       });

// http://cdn1.iconfinder.com/data/icons/basicset/save_32.png
// http://www.iconsearch.ru/uploads/icons/ultimategnome/48x48/stock_export.png
       var wc_export = $("<span id=main_notes_export style='cursor:pointer; color: white;'><img src=http://cdn1.iconfinder.com/data/icons/basicset/save_32.png title='Окно экспорта/импорта' alt='Окно экспорта/импорта'></span>").click( function() {
           $("#export_text").val( JSON.stringify( notes ) );
           $("#notes_export").toggle();
       });

// http://cdn1.iconfinder.com/data/icons/freeapplication/png/24x24/Load.png
// http://www.iconsearch.ru/uploads/icons/freeapplication/24x24/load.png
       var wc_load = $("<img src=http://cdn1.iconfinder.com/data/icons/freeapplication/png/24x24/Load.png title='Импортировать данные из окна' alt='Импортировать данные из окна'>").click( function() {
           //alert("Load");
           var text =  $("#export_text").val() ;
           try {
               notes = JSON.parse( text );
               ToStorage('notes', notes);
		$("#notes_export").hide();
               $("#main_notes").click().click();
           } catch(e) {
               alert("Неверные данным для импорта");
           }
       });

	       	var container = $('ul.tabu');
		container.append( wc );

		$("table.unit-top").before ( div_form);
	       	//container.append( div_form );
       //var container = $('#topblock');
       //container.append( $('<table><tr><td>').append(wc) );
       //container.append( div_form );
       $("#notes_title").append(wc_export).append( div_export );
       $("#export_load").append(wc_load);


       return;
   }

   // Идентификатор подразделения
   var id = /(\d+)/.exec(location.href)[0];

   var head = $("#headerInfo");
   var title = $("h1", head).text();

   head = $("div.officePlace");
   var type = head.text();
   var nn = type.indexOf("компании");
   if (nn > 0){
       type = type.substring(0, nn);
       var ptrn = /\s*((\S+\s*)*)/;
       type = type.replace(ptrn, "$1");
       ptrn = /((\s*\S+)*)\s*/;
       type = type.replace(ptrn, "$1");
   } else {
       type = '';
   }
   // Оповещения
   notes = JSON.parse( window.localStorage.getItem('notes') );
   if ( notes == null ) notes = new Object();
   if ( notes[id] == null) notes[id] = new Object();

   notes_html = "";
   if ( notes[id]['text'] != null) notes_html = notes[id]['text'];

   var form = "";
   form += "<span id=notes_error style='color:red;'></span><br>";
   form+= ("<div id=notes_preview style='border: 1px solid gray; border-radius: 4px 4px 4px 4px; box-shadow: 0 1px 3px 0 #999999; display: block; float: left; margin-top: 4px; overflow: hidden; padding: 2px 4px; text-align:left'>" + notes_html +"</div>");
   form += " <textarea name=notes_txt id=notes_txt rows=5 cols=48>";
   form += notes_html;
   form+= "</textarea><br>";

   var form_button = $("<button id=notes_btn>сохранить</button>").click( function() {
       $("#notes_error").text('');
       var text =  $("#notes_txt").val() ;
       $("#notes_preview").html( text );	
       if (text == '') {
           $("#notes_error").text('Ошибка - нет описания');
           return;
       }

       var d = new Date();
       // Оповещения
       notes = JSON.parse( window.localStorage.getItem('notes') );
       if ( notes == null ) notes = new Object();

       if ( notes[id] == null) notes[id] = new Object();

       notes[id]['text'] = text;
       notes[id]['time'] = d.getTime();
       notes[id]['name'] = title;
       notes[id]['type'] = type;

       ToStorage('notes', notes);
       $("#notes").toggle();
   });

   var form_button_del = $(" <button>Удалить</button>").click( function() {
       // Оповещения
       notes = JSON.parse( window.localStorage.getItem('notes') );
       if ( notes == null ) notes = new Object();

       if ( notes[id] == null) notes[id] = new Object();

       $("#notes_txt").val("");
       $("#notes_preview").html( "" );
       delete  notes[id];
       ToStorage('notes', notes);
   });

// http://cdn1.iconfinder.com/data/icons/oxygen/32x32/actions/document-new.png
// http://www.iconsearch.ru/uploads/icons/ull_icons/24x24/message_add.png
   var wc = $("<li style='cursor:pointer; color: white;'><img alt='Добавить напоминание' src=http://cdn1.iconfinder.com/data/icons/oxygen/32x32/actions/document-new.png title='Добавить напоминание'> </li>").click( function() {
       $("#notes").toggle();
       // Обновить зампетку
       notes = JSON.parse( window.localStorage.getItem('notes') );
       if ( notes == null ) notes = new Object();
       if ( notes[id] == null) notes[id] = new Object();

       if ( notes[id]['text'] == null ) return;
       $("#notes_txt").val( notes[id]['text'] );
       $("#notes_preview").html( notes[id]['text'] );
   });

   //var container = $('#topblock');
   var container = $('#topblock').next();

   if (tu.length == 0) {
       container = $("li:last", container).prev().parent();
       container.append(wc) ;
       //container.append( $('<table><tr><td>').append(wc) );
       $("#childMenu").before ( div_form);

       $("#notes_form").append(form).append(form_button).append(form_button_del);
   }
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}