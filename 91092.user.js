// ==UserScript==
// @include http://w*.wofh.ru/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @name The way of history interface upgrader
// @namespace evgeniy.ep.scripts
// ==/UserScript==

// Внимание! jQuery 1.4.2 не работает с GreaseMonkey 0.8.6

if (location.hostname.indexOf('wofh.ru') != -1 )
{

jQuery( function(){

	//Страница транспортировки
	transportLink = "?trade&send";
	//Страница снабжения
	supplyLink = "?trade&stream";
	//Страница с информацией о пустой клетке
	mapInfoLink = "?mapinfo";
	//Страница с информацией о городе
	townInfoLink = "?towninfo";
	//Страница с информацией о своей стране
	countryLink = "?country";

	//Вовзращает массив координат города по его имени
	function getTownCoordsByName( name )
	{
		//Имя - например "Буранкиш (158-111)"
		var coords = name.match( /\((\d*\-\d*)\)/ );
		if( coords )
			var coordsAr = coords[1].split( '-' );
		else
			var coordsAr = [ '', '' ];
		return coordsAr;
	}

	// Клиентская сортировка таблицы
	// jRows - набор строчек
	// comparer - callback для сравнения двух строк
	// bInvert - сортировка в обратном порядке
	function sortTableRows( jRows, comparer, bInvert )
	{
		var rowsInPlace = 0;
		var comparerFactor = bInvert ? -1 : 1;

		var res = jQuery( '<div/>' );

		while( jRows.length > 0 )
		{
			var maxRow = jRows.eq( jRows.length - 1 );
			for( var i = jRows.length - 2; i >= rowsInPlace; i-- )
			{
				if( comparerFactor * comparer( maxRow, jRows.eq( i ) ) < 0 )
				{
					maxRow = jRows.eq( i );
				}
			}
			res.append( maxRow.clone() )
			jRows = jRows.not( maxRow );

		}

		return res.children();
	}

	//На странице с транспортировкой добавляем селект для выбора своего города назначения
	if( window.location.search.indexOf( transportLink ) != -1 ||
		window.location.search.indexOf( supplyLink ) != -1 )
	{
		// копируем селект из правого меню
		var selectSrc = jQuery( 'select[name="tid"]' );
		var selectNew = jQuery( '<select>' );

		// Видоизменяем его:
		// Добавляем вариант очистки кооринат
		selectNew.prepend( '<option value="none">' );
		selectNew.append( selectSrc.children().clone() );
		//Выделяем активный город звездочкой
		var activeTownId = selectSrc.children().filter( ':selected' ).attr( 'value' );
		var activeTownOpt = selectNew.children( '*[value="' + activeTownId + '"]' );
		activeTownOpt.text( "* " + activeTownOpt.text() );
		activeTownOpt.removeAttr( 'selected' );

		//Вставка контрола перед полем ввода координат
		selectNew.insertBefore( jQuery( 'input[name="x"]' ).parent() );

		//При изменении парсим текст и проставляем координаты выбранного города
		selectNew.change( function() 
		{
			//Выбранный город
			var optionSelected = selectNew.children ( 'option:selected' );
			var coords = getTownCoordsByName ( optionSelected.text() );
			jQuery( 'input[name="x"]' ).val( coords[0] );
			jQuery( 'input[name="y"]' ).val( coords[1] );
		});
	}

	// На странице с информацеий о клетке показываем расстояние до активного города
	if( window.location.search.indexOf( mapInfoLink ) != -1 || 
		window.location.search.indexOf( townInfoLink ) != -1 )
	{
		//Координаты активного города
		var curTownCoords = getTownCoordsByName( jQuery( 'select[name="tid"] option:selected' ).text() );
		//Координаты текущей клетки
		var curCellCoords = getTownCoordsByName( jQuery( '.pagetitle' ).text() );

		//Расстояние между двумя клетками
		var distance = Math.sqrt(
			Math.pow( curTownCoords[0] - curCellCoords[0] , 2 ) + 
			Math.pow( curTownCoords[1] - curCellCoords[1] , 2 ) );
		//Вывод расстояния
		jQuery( ".pagecont > div" ).prepend( '<div>Расстояние: ' + distance.toFixed( 1 ) + '</div>' );
	}

	
	// На странице с информацеий о клетке показываем расстояние до активного города
	if( window.location.search.indexOf( countryLink ) != -1 ) 
	{
		// В интерфейса казначея выводим количество дней задолженности
		if( jQuery( '.c_players thead td:contains("Долг")' ).length > 0 )
		{
			var debtHeader = jQuery( '.c_players thead td:contains("Долг")' );

			//Номер колонки с долгом
			var columnDebtIndex = 0;
			//Номер колонки с налогом
			var columnTaxIndex = 0;
			// .index() не работает с GreaseMonkey
			var headers = jQuery( '.c_players thead td')
			var curIndex = 0;
			for( var i = 0; i < headers.length ; i++ )
			{
				if( headers.eq( i ).text().indexOf( "Долг" ) != -1 )
					columnDebtIndex = curIndex;
				if( headers.eq( i ).text().indexOf( "Налог" ) != -1 )
					columnTaxIndex = curIndex;
				curIndex += headers.eq( i ).attr( 'colspan' ) ? parseInt( headers.eq( i ).attr( 'colspan' ) ) : 1;
			}

			console.info( columnDebtIndex, columnTaxIndex )
			//Получение времени задолженности по строке в таблице
			var getDebtTime = function( row )
			{
				var tax =  row.children().eq( columnTaxIndex ).text();
				var debt = row.children().eq( columnDebtIndex ).text().match( /\d*/ )[0];
				return debt / tax / 24
			}
			
			//Ссылка на сортировку по времени задержки
			var invertedSort = false;
			var timeLink = jQuery( "<a href='#' style='margin-left:5px'>(Дней)</a>" ).click( function(){
				var sorted = sortTableRows( jQuery( '.c_players tbody tr:not(.result)' ), 
				function( a, b )
				{
					return getDebtTime( a ) - getDebtTime( b );
				}, 
				invertedSort ); 
				
				invertedSort = !invertedSort;
				
				jQuery( '.c_players tbody tr:not(.result)' ).remove();
				jQuery( '.c_players tbody' ).prepend( sorted );

				jQuery( '.c_players tbody tr:not(.result)' ).removeClass( 'tr0' ).removeClass( 'tr1' );
				jQuery( '.c_players tbody tr:even:not(.result)' ).addClass( 'tr0' );
				jQuery( '.c_players tbody tr:odd:not(.result)' ).addClass( 'tr1' );

				return false;
			});
			debtHeader.append( timeLink );
			
			//Перебор каждой строчки таблицы, кроме итога
			jQuery( '.c_players tbody tr:not(.result)' ).each( function(){
				var cellDebt = jQuery ( this ).children().eq( columnDebtIndex );
				cellDebt.text( cellDebt.text() + " (" + getDebtTime ( jQuery ( this ) ).toFixed( 1 ) + ")" );
			});
			
		}
	}
});
}