// ==UserScript==
// @name           sundor-patches
// @namespace      http://maximk//sundor-patches
// @description    Pathing sundor site to work with Firefox correctly 
// @include        http://www.sundor.co.il/sundor/init.do
// ==/UserScript==

//Fix scripts bugs start
depYearEl = document.getElementById('departYear');
if( depYearEl != null ) { depYearEl.name = 'departYear';}

retYearSelelectEl = document.getElementById('retYearSelect');
if( retYearSelelectEl!= null ) { retYearSelelectEl.name = 'retYearSelect' }

//-- Re-run page scripts--
unsafeWindow.updateReturn( 'departMonth', 'departDay',
			   'departYear','returnMonth',
			   'retDaySelect', 'retYearSelect' );
unsafeWindow.initpage();
//Fix scripts bugs ended


//Select preferred dates and destination
//document.getElementById('departYear').value = '2009';
//document.getElementById('retYearSelect').value = '2009';
//document.getElementById('departMonth').selectedIndex = 1;
//document.getElementById('retMonthSelect').selectedIndex = 1;
//document.getElementById('departDay').value = 24;
//document.getElementById('retDaySelect').value = 30;
//document.getElementById('destinations').selectedIndex = 6; //MUC
