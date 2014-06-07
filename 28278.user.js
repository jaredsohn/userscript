// ==UserScript==
// @name  				torrentsmd.com tooltip 
// @namespace		http://torrentsmd.com/
// @description		Pop-up with torent details
// @include				http:/*torrentsmd.com/*browse*
// @include				http:/*torrentsmd.com/*search*
// @include				http:/*torrentsmd.com/team.php*section=torrents
// ==/UserScript==

// Author: 			    eugenga - http://www.torrentsmd.com/userdetails.php?id=20399

// License: GPL
// You can freely change/modify this script, untill it work )
// Version 0.50

// иконка загрузки
var circleIcon = document.createElement('img');
circleIcon.src = 'data:image/gif,GIF89a%16%00%15%00%A2%00%00%FF%FF%FF%F2%F2%F2%D7%E9%FA%E2%E2%E2%C6%DF%F8%CC%CC%CC%89' +
                '%B1%D9x%A1%CB!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%0A%00%00%00%2C%00%00%00%00%16%00%15%00%00%' +
                '03R%08%BA%2Bw%82%C9%B9%8E1%87%CAPJP%16%A68%D0T%0CC1%3E%11%10f%D2%99j%EF%C4y%1A%D9j%BC%DD%7D%BD%06K%' +
                'A6%0A%82.%07%A2%F1%88%B9%01%8D%BA%A5t%BAp%1A%AD%00eP%AB%EDi%B1%3D0%03%2B%D6pQE%2FZ%D1%E5%91%7F%93%0' +
                '4%00!%F9%04%05%0A%00%00%00%2C%09%00%00%00%0C%00%11%00%00%03!%18U%01%FE%AE%8CQ%20%94%D4%3E%C5%B4%FF%' +
                '60(%8Edi%9E%8Fp%1C%C2w%18%C6%E1%C2%B2%A7%B2%09%00!%F9%04%05%0A%00%00%00%2C%0C%00%02%00%07%00%13%00%' +
                '00%03%20%08%1AU%A1%A0%8CQ%A0%A4%909%C8%BB%FF%60(%8E%A4B%1C%07%01%1D%86q%AC%EDk%A2%AA%92%00%00!%F9%0' +
                '4%05%0A%00%00%00%2C%06%00%07%00%10%00%0E%00%00%03%22%08%BA%ACQ%25%B4%09%CA%18%856%8B5%7B%91\'%8Edi%9' +
                'E%24q%1C%04y%18%C6%E1%C2%F2%A8%B2d%02%00!%F9%04%05%0A%00%00%00%2C%00%00%0D%00%15%00%04%00%00%03%1C%' +
                '08tG%F00%BEPJ%00%C7%98%23%3B(%C3P%60%1A%E7E%A0%A80%CE%09QV%02%00!%F9%04%05%0A%00%00%00%2C%00%00%07%' +
                '00%10%00%0E%00%00%03!Hw%04%FE%D0%1DcN%BC%60V%1C%15%E3%60(%8Edi%9EcP%14%C1X%0CC%E1%C2%B2%A8%B2%09%00' +
                '!%F9%04%05%0A%00%00%00%2C%03%00%02%00%07%00%13%00%00%03%1EHw%04~%C6%1C%07%A0%A4%8A%D1%CD%BB%FF%60(%' +
                '8E_P%14%01U%0CC%A1%B2%AEc%A2%09%00!%F9%04%05%0A%00%00%00%2C%00%00%00%00%0D%00%11%00%00%03%23%08%BA%' +
                '2Bw%82%C9c%CC%99%8BZ%C9%1C%E4%60(%8Edi%9E%A8%19%14E%20%16%C3P%BC%F1%1C%AEm%98%00%00!%F9%04%09%0A' +
                '%00%00%00%2C%00%00%00%00%16%00%15%00%00%03%2C%08%BA%DC%FE0J%26%CE%11%F3%1DcNv%5B%F75%D55NAQ%04%E' +
                '7R%0CC%D1*o%3C%03%E9z%EF%7C%EF%FF%C0%A0p%F8I%00%00%3B'	

var  TMD_linkArray, TMD_infoArray, TMD_nameArray, TMD_isInLoading, TMD_commArray;
var TMD_pagesLoaded = 1;   // какая страница грузится (каждая загрузка ++1 )
var TMD_TimerOff, TMD_ShowTimer


// BEGIN EXECUTION	----------------------------------------------------------------------------

// выраснивание таблицы по левому краю :0) не работает )
//var  mainDiv =  $xFirst('./div[2]', document.body);
//mainDiv.align = "left";
//mainDiv.style.width = '1200 px';

// get DIV with torrents table
var TMD_torrents_div = document.getElementById('torrents');					// for page http://www.torrentsmd.com/*browse*
if  (!TMD_torrents_div) { TMD_torrents_div = $xFirst('./div[2]', document.body); }	// page http://www.torrentsmd.com/*search* - have other structure 

// torrents table body
var TMD_torrents_table = $xFirst("./table/tbody", TMD_torrents_div);		
// TMD_torrents_table.parentNode.align = "left";


 TMD_setup_tooltips_v2();  // всплывающая информация о торрентах )

 // END EXECUTION	----------------------------------------------------------------------------


function addGlobalStyle(css) {
    var head, style;  head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}



function followmouse(){
   var e=arguments[0]?arguments[0]:event;
   var loadingDiv = document.getElementById("loadingDiv");
   loadingDiv.style.left=(e.pageX + 25) +'px';
   loadingDiv.style.top=(e.pageY - 10)+'px';
   
   document.getElementById("torrentDetail").style.left=(e.pageX + 35) +"px";
   document.getElementById("torrentDetail").style.top=(document.body.scrollTop + 5)+"px";
}




  
 // ----------------------------------------------------- new version
 

 function showTorrentDetail (torrNom){
	window.clearTimeout(TMD_TimerOff);
	window.clearTimeout(TMD_ShowTimer);
	
	// показывать - только если есть информация
	if  (TMD_infoArray[torrNom]) { 
						window.clearTimeout(TMD_ShowTimer);
						var torrInfoWin = document.getElementById("torrentDetail");
/*						torrInfoWin.innerHTML = '<input id="TMD_OpenInTabBtn" type="button" value="Открыть страницу во вкладке" onclick=' +
						'"function(){alert (' не реализовано');}" >' +
						'    <input id="TMD_LoadBtn" type="button" value="Загрузить" onclick=' +
						'"function(){alert (' не реализовано');}" >' +
						'    <input id="TMD_SayThankBtn" type="button" value="Спасибо" onclick=' +
						'"function(){alert (' не реализовано');}" >' + 
						'<br>' +  TMD_infoArray[torrNom];
*/
						torrInfoWin.innerHTML =  TMD_infoArray[torrNom];
						torrInfoWin.style.display="inline";
						hideLoadingWin;
						
						return;
	}
	// информации нет - загрузить 
	if  (TMD_isInLoading[torrNom]==1) 	{ 	TMD_isInLoading[torrNom]+=1;
																	loadTorrentDetail(torrNom);
																	return;
	}
	// уже загружается , максимум 5 попыток через 3 сек
	if  (TMD_isInLoading[torrNom]) 	{ if  (TMD_isInLoading[torrNom]<5) {
															window.setTimeout(function() {	if  (TMD_infoArray[torrNom]) {showTorrentDetail (torrNom); 
																																								return; }
																													 loadTorrentDetail (torrNom);},4000); }
																 return;
	}
}	

function loadTorrentDetail (torrNom) {
	if  (TMD_infoArray[torrNom]) { return; } // уже загружено
	// счётчик попыток
	TMD_isInLoading[torrNom]+=1;
	
	var torrLink 	= TMD_linkArray[torrNom];
	var torrName 	= TMD_nameArray[torrNom];
	
	// показ процесса загрузки		
	showLoadingWin(('Загрузка ' + TMD_pagesLoaded), torrName);
	// запрос информации
	GM_xmlhttpRequest({
            method: 'GET',
            url: torrLink,
            headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.8) Gecko/20071008 Firefox/2.0.0.8'},
            onload: function(responseDetails) {
				var htmlResult = responseDetails.responseText;
								
				// сохранить инфо для повторного показа
				TMD_infoArray[torrNom] = '<div style="padding: 5px; background-color: #dddddd; border: 1px solid #888;" onmouseclick: hideDetailWin>' + 
									сutTorrentInfo (htmlResult) + '</div>';  	
			    // комментарии к торренту (только со страницы описания)
				TMD_commArray[torrNom] = '<div style="padding: 5px; background-color: #dddddd; border: 1px solid #888;">' + 
									cutCommentaries (htmlResult, torrNom) + '</div>';  	
				
				TMD_pagesLoaded += 1;					// кол-во удачных загрузок
				// показать информацию	
				TMD_ShowTimer=window.setTimeout(function() {showTorrentDetail (torrNom);},100);
				hideLoadingWin;									
				markTorrAsLoaded(torrNom);
				},
				 onerror: function(responseDetails) {
				 // декорация - показать на время, что ошибка 
				var errorResponse = 'Status :  ' + responseDetails.status + ' -- ' + responseDetails.statusText +
													'<br>Details : ' + responseDetails.responseHeaders  + ' -- ' + responseDetails.responseText;
				showLoadingWin(('Ошибка <br>' + errorResponse), torrName);
				//  TMD_isInLoading[torrNom]=0;
				TMD_TimerOff = window.setTimeout(function() { hideLoadingWin; }, 3000);
				}
        });
  }

function showLoadingWin(inDiv, inFooter) {
	var 	loadingDiv = document.getElementById("loadingDiv");
			loadingDiv.innerHTML = '<div style="padding: 5px; background-color: #ddeebb; border: 1px solid #888;">' +
											'<img src="' + circleIcon.src + '" border="0"> ' + inDiv + '</div> ' + inFooter;
			loadingDiv.style.display="inline";
}

function hideLoadingWin() { document.getElementById("loadingDiv").style.display="none"; }

function hideDetailWin() { document.getElementById("torrentDetail").style.display="none"; }


function TMD_setup_tooltips_v2 () {
	
	// создание стиля для torrentDetail и loadingDiv
	addGlobalStyle('#torrentDetail {color: black !important; background-color: #eeeeee; font-family:verdana,arial,helvetica,sans-serif; font-size: 10px !important; position: absolute; text-align: left !important; ' +
            'display: inline; width: auto; z-index: 2000 !important;}' + 
			'.searchImg {border: 1px solid #E0E0E0;}')
	addGlobalStyle('#loadingDiv {color: black !important; background-color: #eeeeee; font-family:verdana,arial,helvetica,sans-serif; font-size: 10px !important; position: absolute; text-align: left !important; ' +
            'display: inline; width: auto; z-index: 2001 !important;}' + 
			'.searchImg {border: 1px solid #E0E0E0;}')			

	// создание окошек torrentDetail и loadingDiv
	var newDiv2 = document.createElement('div');
		newDiv2.id = 'torrentDetail';
		document.body.appendChild(newDiv2);
		newDiv2.addEventListener(	'mousedown',	hideDetailWin , true);
				
		var  newDiv3 = document.createElement('div');
		newDiv3.id = 'loadingDiv';
		newDiv3.innerHTML = '<div style="padding: 5px; background-color: #ddeebb; border: 1px solid #888;">' +
											'<img src="' + circleIcon.src + '" border="0"> Загрузка описания </div>' ;
		document.body.appendChild(newDiv3);
		newDiv3.addEventListener(	'mousedown',	hideLoadingWin , true);

	var TMD_torrents_names = $x("./tr/td[2]/a/b", TMD_torrents_table);		// get torrents names
	var tN = TMD_torrents_names.snapshotLength;	
	// запоминать уже загруженные описания
	TMD_linkArray = new Array (tN);
	TMD_infoArray = new Array (tN);
	TMD_nameArray = new Array (tN);
	TMD_isInLoading = new Array (tN);
	TMD_commArray = new Array (tN);
	
	for (var i=0; i<tN;i++){
		var torrent_name  = TMD_torrents_names.snapshotItem(i);
		var torrent_link = torrent_name.parentNode;

		TMD_linkArray[i] = torrent_link.href;
		TMD_nameArray[i] = torrent_name.textContent;
		TMD_isInLoading[i]=0;
		torrent_link.id ='torrNom-' + i;
		
		// set the mouseover and mouseout event listeners (на ссылку)
		torrent_link.addEventListener(
			'mouseover',
			function(event) { 
				var torrId = this.id; 
				var torrNom=torrId.substr(8); 
				if ((TMD_isInLoading[torrNom]++)==1) {  
						loadTorrentDetail(torrNom);}
				else {TMD_ShowTimer = window.setTimeout(function() {showTorrentDetail (torrNom);},300); }
				this.onmousemove=followmouse;
				window.clearTimeout(TMD_TimerOff);
				},	true	);
 
		// реакция на заход в клетку торрента, а не только на ссылку
		
		var torrCell = torrent_link.parentNode;
		torrCell.id = 'torCell-' +i;
		
		torrCell.addEventListener(
			'mouseover',
			function(event) { 
				var torrId = this.id; 
				var torrNom=torrId.substr(8); 
				if ((TMD_isInLoading[torrNom]++)==1) {  //TMD_isInLoading[torrNom]=1;
						loadTorrentDetail(torrNom);}
				else {TMD_ShowTimer = window.setTimeout(function() {showTorrentDetail (torrNom);},300); }		
				 window.clearTimeout(TMD_TimerOff);
				this.onmousemove=followmouse;
		},	true);
 
		torrCell.addEventListener(
			'mouseout',
			hideLoadingWin,	
			true	);
		
		}  //main for 
}

// помечает, что информация о торренту уже загружена (только для контроля работы скрипта)
function markTorrAsLoaded(torrNom) {
var 	loadedTorrCell = document.getElementById(('torCell-' +torrNom));
if  (loadedTorrCell) {loadedTorrCell.innerHTML += ' <img src=imagestorage/824409_777.gif>';}

}

// вырезает комментарии к торенту - не реализовано
function cutCommentaries (htmlResult, torrNom) {

}
function сutTorrentInfo (htmlResult) {
	var tStart = htmlResult.indexOf('Description')+16;
	var tEnd = htmlResult.indexOf('<td class="heading" valign="top" align="right">Type');
	var torrInfo = htmlResult.substring(tStart, tEnd);
			tStart = torrInfo.indexOf('>')+1;
			tEnd = torrInfo.indexOf('</td>');
			torrInfo.substring(tStart, tEnd)
			return (torrInfo);
}				








//
function $(id) { 	return document.getElementById(id);  }
function $x(xpath, contextNode, resultType) {
	contextNode = contextNode || document.body;
	resultType = resultType || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	return document.evaluate(xpath, contextNode, null, resultType, null);
}

function $xFirst(xpath, contextNode) {
	var xpr = $x(xpath, contextNode, XPathResult.FIRST_ORDERED_NODE_TYPE);
	return xpr.singleNodeValue;
}


