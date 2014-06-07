// ==UserScript==
// @name        Virtonomica: Corporation
// @namespace   virtonomica
// @description Списки участиников корпораций
// @include     http://virtonomic*.*/*/main/corporation/view/*
// @include     http://virtonomic*.*/*/main/company/view/*/corporation
// @include     http://virtonomic*.*/*/main/brokergame/tournament
// @include     http://virtonomic*.*/*/main/brokergame/view/*/players
// @version     0.2
// ==/UserScript==

var run = function() {
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
	       //console.log(out);
	    }
	}

	function getFromStorage(obj, id_shop)
	{
	    if (obj[id_shop] == null) return '';
	    return JSON.stringify(obj[id_shop]);
	}
	//---------------------------------------------------------------------
	// end of работа с локальным хранилищем
	//---------------------------------------------------------------------

	//console.log("Привет!");


	function getCorpList() {
		div = $("div:contains('Количество компаний'):last").prev();
		corp_name = div.text();
		// удалить старые записи
		for( name in Corps ){
			if ( Corps[name] ==  corp_name ) delete Corps[name];
		}

		// перечитать список участиников
		table = $("table.grid").eq(0);
		//console.log("table = " + table.length );
	
		tr = $("tr.odd, tr.even", table);
		//console.log("tr = " + tr.length );
	
		for(i=0; i< tr.length; i++) {
			td = $("td", tr.eq(i));
			//console.log( td.length );

			//----------
			// Фикс для своей илир чужой корпорации
			col = 2;
			check = $("a", td.eq(2));
			if (check.length == 0) col = 3;
			//----------

			td_name = td.eq( col );
			name  = $("a", td_name).text();
			console.log( name );
			if ( Corps[ name ] == null ) Corps[ name ] = new Object();
			Corps[ name ] = corp_name;
		}

		ToStorage("Corps", Corps);
		$("#p_info").html( 'Данные о составе корпорации ' + corp_name + ' обновлены' ).css('color', 'green');
	}

	function BrokerTourn() {
		user = $("a[href*='user']", $("#mainContent") );
		console.log("user = " + user.length );
		for(i=0; i< user.length; i++) {
			name  = user.eq(i).text();
			if ( Corps[ name ] == null) continue;

			user.eq(i).after(' (' + Corps[ name ] +')');
			//if (i > 5) break;
		}

	}

	function BrokerGame() {
		table = $("table.list");
		tr = $("tr.odd, tr.even", table);
		for(i=0; i< tr.length; i++) {
			td = $("td", tr.eq(i)).eq(0);
			name  = $("a", td).text();
			if ( Corps[ name ] == null) continue;
			td.append('<br>(' + Corps[ name ] +')');
		}
	}

	// Считать данные об участниках корпораций
	container = $("table.grid").eq(0); 
	var wc_info = $("<div id=p_info></div>");
	container.before( wc_info );	

	Corps = JSON.parse( window.localStorage.getItem('Corps') );
	if ( Corps == null ) {
		Corps = new Object();
		$("#p_info").html("Не удалось получить список участников корпораций из локального хранилища").css('color', 'red');
	}

	// Проверим ссылку
	var href = location.href;
	if (href.indexOf('corporation') > 0) {
		var  wc_parsing = $("<div id=corp_parsing style='float:left;cursor:pointer;'> <img title='Запомнить Участиников Корпорации' alt='Запомнить Участиников Корпорации' src='http://www.iconsearch.ru/uploads/icons/snowish/32x32/document-save-as.png'> </div>");
		container.before( wc_parsing );	

		$("#corp_parsing").click( function(){ getCorpList(); } );		
	} else {
		// brokergame/tournament
		if (href.indexOf('brokergame/tournament') > 0) BrokerTourn();
		// players
		if (href.indexOf('players') > 0) BrokerGame	();
	}
	
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}