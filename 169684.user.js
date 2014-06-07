// ==UserScript==
// @name           Virtonomica: BrokerYard History
// @namespace      virtonomica
// @description    Сохранение и показ информации о прошлом ходе
// @version        0.06
// @include     http://virtonomica.ru/*/main/brokergame/view/*
// @exclude     http://virtonomica.ru/*/main/brokergame/view/*/players
// @exclude     http://virtonomica.ru/*/main/brokergame/view/*/result
// ==/UserScript==
var run = function() {
   var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   $ = win.$;

//---------------------------------------------------------------------
// работа с локальным хранилищем
//---------------------------------------------------------------------
/**
* записать данные в локальнео хранилище, с проверкой ошибок
*/
function ToStorage(name,  val)
{
    try {
       window.localStorage.setItem( name,  JSON.stringify( val ) );
    } catch(e) {
       out = "Ошибка добавления в локальное хранилище";
       console.log(out);
    }
}
/**
* Получить значение предыдущего хода
*/
function getPrevStep( step )
{
    pos = step.indexOf('/') ;
    first = parseInt( step.substr(0,pos) ) -1;
    if (first < 1) return 'no';
    last = parseInt( step.substr(pos+1, step.length) );
    
    return first + "/" + last;
}
/**
* Получить значение предыдущего хода
*/
function getNextStep( t_step )
{
    if (t_step == "no") {
        t_step = step;
        pos = t_step.indexOf('/') ;
        first = 1;
    } else {
        pos = t_step.indexOf('/') ;
        first = parseInt( t_step.substr(0,pos) ) + 1;
    }    

    last = parseInt( t_step.substr(pos+1, t_step.length) );
    if (first > last) return 'no';
    
    return first + "/" + last;
}
/**
* отобразить исторические данные по указанному ходу
*/
function viewStep( step )
{
   if (BrYard[id] == null){
        $("#old_board").html('В локальном хранилище отсутствуют данные по игре с ID = ' + id).css('color', 'red');
        $("#old_list").html('');
        return;
   } 
   
   if (BrYard[id]['hist'] == null) {
        $("#old_board").html('В локальном хранилище отсутствует история ходов по этой игре' ).css('color', 'red');
        $("#old_list").html('');
        return;
   }
   if (BrYard[id]['hist'][step] == null) {
        $("#old_board").html('В локальном хранилище отсутствует ход № ' + step).css('color', 'red');
        $("#old_list").html('');
        return;
   }


   if (BrYard[id]['hist'][step]['board'] == null) {
        $("#old_board").html('В локальном хранилище отсутствует доска в этот ход ').css('color', 'red');
   } else {
    

//console.log( BrYard[id]['hist'][step]['board'].substr(0,80) );        

   
        $("#old_board").html( unpack(BrYard[id]['hist'][step]['board']) ).css('color', 'black');
	$("td", $("#old_board") ).attr('width', '10px') ;
   }

   if (BrYard[id]['hist'][step]['list'] == null) {
        $("#old_list").html('таблицы на этот ход нет').css('color', 'maroon');
   } else {
        $("#old_list").html( BrYard[id]['hist'][step]['list'] ).css('color', 'black');
        span = $("span:not(.moneySmallerZero    )", $("#old_list") ).html('');
   }
}
/**
* Уменьшаем размер сохраняемых данных (доска)
* 
*/
function pack( str ){
    str = str.replace(/<td align="center" width="20">/g,'<td>');
    str = str.replace(/align="center" width="20"/g,'');
    str = str.replace(/\t/g, '');
    str = str.replace(/<\/tr>/g, '');
    str = str.replace(/<\/td>/g, '');
    for(i=10; i<=250; i+=10){
            str = str.replace(new RegExp("<td>" + i,'g'), '<td' + i/10);
    }
    str = str.replace(/<tr><td1<td2<td3<td4<td5<td6<td7<td8<td9<td10<td11<td12<td13<td14<td15<td16<td17<td18<td19<td20<td21<td22<td23<td24<td25/g,"<trh>");

    str = str.replace(/<td class="bk_green"/g,'<tdg');
    str = str.replace(/<td class="bk_yellow"/g,'<tdy');
    str = str.replace(/<td class="bk_red"/g,'<tdr');
    str = str.replace(/<td class="bk_blue"/g,'<tdb');
    
    str = str.replace(/<tdg ><tdg ><tdg >/g,'<tdg3>');
    str = str.replace(/<tdr ><tdr ><tdr >/g,'<tdr3>');
    str = str.replace(/<tdy ><tdy ><tdy >/g,'<tdy3>');
    str = str.replace(/<tdb ><tdb ><tdb >/g,'<tdb3>');
    
    str = str.replace(/<tdg3><tdg3><tdg3>/g,'<tdg9>');
    str = str.replace(/<tdy3><tdy3><tdy3>/g,'<tdy9>');
    str = str.replace(/<tdr3><tdr3><tdr3>/g,'<tdr9>');
    str = str.replace(/<tdb3><tdb3><tdb3>/g,'<tdb9>');
    
    return str;
}
function unpack( str ){
    str = str.replace(/<tdg9>/g,'<tdg3><tdg3><tdg3>');
    str = str.replace(/<tdy9>/g,'<tdy3><tdy3><tdy3>');
    str = str.replace(/<tdr9>/g,'<tdr3><tdr3><tdr3>');
    str = str.replace(/<tdb9>/g,'<tdb3><tdb3><tdb3>');

    str = str.replace(/<tdg3>/g,'<tdg ><tdg ><tdg >');
    str = str.replace(/<tdy3>/g,'<tdy ><tdy ><tdy >');
    str = str.replace(/<tdr3>/g,'<tdr ><tdr ><tdr >');
    str = str.replace(/<tdb3>/g,'<tdb ><tdb ><tdb >');

    str = str.replace(/<tdg/g,'<td class=bk_green');
    str = str.replace(/<tdy/g,'<td class=bk_yellow');
    str = str.replace(/<tdr/g,'<td class=bk_red');
    str = str.replace(/<tdb/g,'<td class=bk_blue');

    str = str.replace(/<trh>/g,'<tr><td1<td2<td3<td4<td5<td6<td7<td8<td9<td10<td11<td12<td13<td14<td15<td16<td17<td18<td19<td20<td21<td22<td23<td24<td25');

    for(i=10; i<=250; i+=10){
            str = str.replace(new RegExp("<td" + i/10 +"<",'g'), '<td>' + i + "<");
    }

    return str;
}

var wc2 = $("<li id=by_history style='cursor:pointer; color: white;'> <img title='Просмотр прошлого хода' alt='Просмотр прошлого хода' src='http://www.iconsearch.ru/uploads/icons/softwaredemo/24x24/hourglass.png' >").click( function() {
   //console.log("wc2 click");
   $("#by_info").toggle();
   //$("#old_list").toggle();
   $("#info_man").toggle();

   // Читаем локальное хранилище
   BrYard = JSON.parse( window.localStorage.getItem('BrYard') );
   if (BrYard == null) BrYard = new Object();
   if (BrYard[id] == null) BrYard[id] = new Object();
   
    if (BrYard[id]['hist'] == null) BrYard[id]['hist'] = new Object();
    if (BrYard[id]['hist'][step] == null) BrYard[id]['hist'][step] = new Object();
   
   //console.log( "step ===" + id );
    if ( $("#info_man").html() != "" ) {
        if ( BrYard[id]['hist'][step]['list'] != null){
            // если ранее уже сохранили что-то 
            return;
        }   
        // если текущие данные уже кем то считаны ранее
        BrYard[id]['hist'][step]['list'] = $("#info_man").html().replace(/\r|\n/g, '').replace('\t', '');
        ToStorage('BrYard', BrYard);
        console.log("save list 1");
    } else {
        if ( BrYard[id]['hist'][step]['list'] != null){
            // если ранее уже считали данные
            $("#info_man").html( BrYard[id]['hist'][step]['list'] );    
            return;
        }   
        // пробуем получить данные сами   
        $("#info_man").html( 'Запрос данных с сервера' );
        url = location.href + "/players";
        $.get(url, function(data) {
            table = $("table.list", data );
            // ищем число участников
            peaple = $("a.popup", table);
            str = "<table>";
            // цикл по игрокам
            for (i=0; i<peaple.length; i++ ){
                str+= "<tr><td>"+ (i+1) +".<td>" + peaple.eq(i).text();
                money = peaple.eq(i).parent().next().next().next().next().next().next();
                str+= "<td align=right>" + money.html().replace("=","");

            }
            str += "</table>";
            $("#info_man").html( str );
            BrYard[id]['hist'][step]['list'] = str.replace(/\r|\n/g, '').replace('\t', '');
            ToStorage('BrYard', BrYard);
            console.log("save list 2");
            console.log("id = " + id + " step = " + step);
            //console.log( str  );
        }); // end запроса данных
   }

});

   console.log('start brokerYard  History');
   // ищем текущий ход
   div = $("div.officePlace");
   tr = $("tr", div).eq(2);
   step = $("td", tr).eq(1).text();
   console.log( step );

   // ищем текущую игровую дату 
   span = $("#calendar_m");
   date = $("span", span).eq(0).text();
   console.log( date );

   var currnet_table = $("table.grid").html();
   //console.log( currnet_table );

   // Идентификатор игры
   var id = /(\d+)/.exec(location.href)[0];
   
   $("table.grid").after("<table id=by_info><tr><td colspan=2><span id=info_control> Ходы: <span id=my_step> </span></span><tr><td><table id=old_board style='float:left;font-size:xx-small;'></table></div><td widt=50%><div id=old_list style='font-size:xx-small'>list</div></table>");

   var BrYard = JSON.parse( window.localStorage.getItem('BrYard') );
   if (BrYard == null) BrYard = new Object();
   if (BrYard[id] == null) BrYard[id] = new Object();
   if (BrYard[id]['hist'] == null) BrYard[id]['hist'] = new Object();

   var old_step = getPrevStep( step );
   console.log( "OLD_STEP = " + old_step );
   //console.log( "list:" + JSON.stringify( BrYard[id]['hist'][step]['list'] ) );
   
   //BrYard[id]['hist'][old_step]['list'] = BrYard[id]['hist'][step]['list'];
   
   // Сборщик мусора
   if (BrYard['gc'] == null) {
      BrYard['gc'] = new Date();
      ToStorage('BrYard', BrYard);
   }
   var today = new Date();
   var gc = new Date( BrYard['gc'] );
   var delta = today - gc;
   console.log("delta  = " + delta );
   // часы
   delta = delta /1000/60/60;
   console.log("delta2  = " + delta );
   if( delta > 4){
        console.log("gc running...." );
        for (t_id in BrYard)   {
            console.log("id = " + t_id + ":");        
            if ( BrYard[t_id]['hist'] ==  null) continue;
            var game_time = new Date( BrYard[t_id]['time'] );
            delta = (today - game_time)/1000/60/60;
            // часы
            console.log("game delta  = " + delta );
            // больше 5 суток
            if (delta > 120) {
                delete BrYard[t_id];
                console.log("game clearing..." );
            }
        }
        ToStorage('BrYard', BrYard);
   }
   

/*   
for (t_id in BrYard)   {
   console.log("id = " + t_id + ":");        
   if ( BrYard[t_id]['hist'] ==  null) continue;

   for (t_step in BrYard[t_id]['hist'] ) {
           console.log(t_step + ":");        
           for ( key in BrYard[t_id]['hist'][t_step] ){
		if ( BrYard[t_id]['hist'][t_step]['board'] == null) continue;
                //console.log("   " + key + " = " + JSON.stringify( BrYard[id]['hist'][t_step][key]).substr(0,30) );        
		//BrYard[t_id]['hist'][t_step]['board'] = BrYard[t_id]['hist'][t_step]['board'].replace(/\r|\n/g, '').replace('\t', '');
        BrYard[t_id]['hist'][t_step]['board'] = pack ( BrYard[t_id]['hist'][t_step]['board'] );

//		if ( BrYard[t_id]['hist'][t_step]['list'] == null) continue;
//		BrYard[t_id]['hist'][t_step]['list'] = BrYard[t_id]['hist'][t_step]['list'].replace(/\r|\n/g, '').replace('\t', '');
                //console.log("   " + key + " = " + JSON.stringify( BrYard[id]['hist'][t_step][key]).substr(0,20) );        
           }
           
   }
}
      ToStorage('BrYard', BrYard);
      console.log("save board short");
*/

    if (BrYard[id]['hist'][old_step] == null) BrYard[id]['hist'][old_step] = new Object();

/*
        if ( BrYard[id]['hist'][old_step]['board'] != null) {
		  $("#old_board").html( old_step + ":<br>" + BrYard[id]['hist'][old_step]['board'] ) ;
	    } else {
		  $("#old_board").html( "данные о прошлом ходе отсуствуют в локальном хранилище" ).css('color', 'red') ;
        }
        if ( BrYard[id]['hist'][old_step]['list'] != null) {
		  $("#old_list").html( old_step + ":<br>" + BrYard[id]['hist'][old_step]['list'] ) ;
	    } else {
		  $("#old_list").html( "данные о прошлом ходе отсуствуют в локальном хранилище" + old_step + " " + id ).css('color', 'red') ;
        }
        */
   //console.log( "OLD_LIST = " + BrYard[id]['hist'][old_step]['list'] );

   if (BrYard[id]['step'] != step ){

      BrYard[id]['step'] = step;
      BrYard[id]['date'] = date;
      today = new Date();
      BrYard[id]['time'] = today;
      
      //BrYard[id]['board'] = currnet_table;
      if (BrYard[id]['hist'] == null) BrYard[id]['hist'] = new Object();
      if (BrYard[id]['hist'][step] == null) BrYard[id]['hist'][step] = new Object();

      //BrYard[id]['hist'][step]['board'] = currnet_table.replace(/\r|\n/g, '').replace('\t', '');
      BrYard[id]['hist'][step]['board'] = pack( currnet_table );

      ToStorage('BrYard', BrYard);
      console.log("save board");
   } else {
	// такой ход у нас уже есть
        if (step  == "10/10"){
            console.log("clearing.....10");
	} else if(step  == "8/8") {
            console.log("clearing.....8");
	} else{
       console.log("skiping.....");
	   //$("#old_board").html( "текущие данные об игре сохранены в локальном хранилище" ).css('color', 'green') ;
	}
   }

    if (old_step == 'no ') viewStep(step)
    else viewStep(old_step);    
   
    var current_step = old_step;
    $("#my_step").html( current_step );
    var wc_back = $("<span id=bt_prev style='cursor:pointer;'> <img width=12px src=http://www.iconsearch.ru/uploads/icons/humano2/32x32/back.png alt='назад' title='назад'></span>");
    var wc_next = $("<span id=bt_next style='cursor:pointer;'> <img width=12px src=http://www.iconsearch.ru/uploads/icons/humano2/32x32/forward.png alt='вперед' title='вперед'></span>");
    
    // http://www.iconsearch.ru/uploads/icons/humano2/32x32/forward.png

   //$("#old_board").html( JSON.stringify( BrYard[id] ) );

   $("#by_info").hide();
   //$("#old_list").hide();

    var container = $("li:last", $("ul.tabu") );
   //console.log( container );
    container.after(wc2) ;

    if ( $("#info_man").length == 0 ){
       $("table.grid").before("<table><tr><td><span id=info_card></span><td><span id=info_man></span></table>");
    }
    $("#info_control").before( wc_back ).after( wc_next );
    
    $("#bt_prev").click(function() {
        new_step = getPrevStep( current_step );
        if (new_step == "no") return;
        
        current_step = new_step;
        console.log( 'click ' + current_step  );
        $("#my_step").html( current_step );
        
        viewStep( current_step );
    
    });

    $("#bt_next").click(function() {
        new_step = getNextStep( current_step );
        if (new_step == "no") return;
        
        current_step = new_step;
        console.log( 'click ' + current_step  );
        $("#my_step").html( current_step );
        
        viewStep( current_step );
    
    });

   console.log('end brokerYard History');
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}