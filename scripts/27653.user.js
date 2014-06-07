// ==UserScript==
// @name	torrentsmd.com filter and marker 
// @namespace	http://torrentsmd.com/
// @description	Manage/mark  torrent's list on torrentsmd.com (customize for yourself)
// @include	http:/*torrentsmd.com/*browse*
// @include	http:/*torrentsmd.com/*search*
// @include	http:/*torrentsmd.com/*team.php*section=torrents
// ==/UserScript==

// Author:	eugenga - http://www.torrentsmd.com/userdetails.php?id=20399
// see also	http://www.torrentsmd.com/forum.php?action=viewtopic&topicid=110474
// License: GPL --- You can freely change/modify this script, untill it work )
// Version 0.52
// Примечание - на стр. поиска не сработает, если torrentsmd с рекламой, 
// сам недавно узнал - потом исправлю (может быть :о)


// Переменные, определяют как раскрашивать список - ключевые слова разделяйте  |
// bad torrents paint in gray - эти красятся в серый
var TMD_bad_torrents_types = 'Mobiles\\*|(for mobile)|DVDscr|CAM\\]|' +			
	'(R\&B)|Psychedelic|\\[Techno\\]|\\[Electronic\\]|(Hip-Hop)|\\[Rap\\]|\\[Trance\\]|' +		
	 '\\[Punk\\]|\\[House\\]|Darkwave|(Hard Rock)|\\[Metal\\]|(Death Metal)|(Black Metal)|Metalcore';

var TMD_bad_torrents_keys = '(Comedy Club)|(Наша Russia)|(Папины дочки)|(Сердцеедки)|(Гуманоиды в Королёве)|(Битва экстрасенсов)' +
	'(Школа волшебниц)|(Я лечу)|Aang|(Avatar the Last)';

	// эти вообще удаляются
var TMD_torrents_DELETE = '(Nintendo|XBOX|\\[Mac\\]|\\(PSP\\)|Platformers|Xbox360|\\[PS2\\]|\\[PS\\]|\\[PSP\\]|\\[Wii\\])';		// приставки

// good torrents paint in green, and mark with star *
var TMD_good_torrents = '(For Kids)|Firefox|Maxthon|ивопис|кварель|Смешарик';
var TMD_best_uploaders = 'JAndrew|cojokaru|Regata|Semo4ka|iggy|ALLADIN|moroval|' + 
	'idphone|SnaiperSM|VeryGood|ZendeN|slazer|penia2006|Rif|shurikgao|JIEOH|burg|' + 
	'ven|Neeo|Oygen|BiOM|Eugenga|mariosik|edykmev';

// BEGIN EXECUTION	----------------------------------------------------------------------------
// get DIV with torrents table
var TMD_torrents_div = document.getElementById('torrents');	// for page http://www.torrentsmd.com/*browse*
if  (!TMD_torrents_div) { TMD_torrents_div = $xFirst('./div[2]', document.body); }	// page http://www.torrentsmd.com/*search* - have other structure 

// torrents table body
var TMD_torrents_table = $xFirst("./table/tbody", TMD_torrents_div);

// Поле и кнопка для фильтра - ОТКЛЮЧЕНО !! я не пользуюсь, если надо - уберите комментрий с 3х строчек  
//var TMD_name_header = $xFirst("./tr/td[2]", TMD_torrents_table);		// header of column "torrents name"
//TMD_name_header.innerHTML += '  <input id="TMD_filter_string" type="text" size="14" /> <input id="TMD_do_filter" type="button" value="Filter" onclick="return TMD_filter_torrents()" />';
//$('TMD_filter_string').value = 'DVDRip';


// Здесь всё и раскрашивается - comment functions, if you don't need some marks
TMD_mark_torrents(); // по названию торрентов
TMD_mark_uploaders(); // по имени аплоадера
TMD_mark_size(); //по размеру
TMD_mark_sids(); //количество сидов/пиров

// END EXECUTION	-------------------------------------------------------------------


// фильтрация по кнопке -- функция отключена выше
unsafeWindow.TMD_filter_torrents = function () {
 	var filter = $('TMD_filter_string').value;
	if (filter) {
	// apply filter
	for (var i=0; i<TMD_torrents_names.snapshotLength;i++){
		var curr_torrent_name  = TMD_torrents_names.snapshotItem(i);
		if (!curr_torrent_name.textContent.match(filter)) {	
			// 3rd parent of namw is whole row
			curr_torrent_name.parentNode.parentNode.parentNode.style.display = 'none';
			// set fictive class, for undo letter
			curr_torrent_name.parentNode.parentNode.parentNode.className = 'TMD_neg_filtered';
			}
		}
	} else {
	// undo filter
		var banned_torrents_row = $x("./tr[@class='TMD_neg_filtered']", TMD_torrents_table);
		for (var i=0; i<banned_torrents_row.snapshotLength; i++){
			var obj = banned_torrents_row.snapshotItem(i);
				obj.style.display = '';
				obj.className = '';
		}
	}
}

function TMD_mark_torrents () {
	var TMD_torrents_names = $x("./tr/td[2]/a/b", TMD_torrents_table);		// get torrents names
	var neg_filter = '('+TMD_bad_torrents_types +'|'+TMD_bad_torrents_keys+')'; 
	var tN = TMD_torrents_names.snapshotLength;
	
	for (var i=0;i<tN;i++){
	var torrent_name  = TMD_torrents_names.snapshotItem(i);
	var torrent_nameT  = torrent_name.textContent;
	 // mark GOOD torrents
	if (torrent_nameT.search(TMD_good_torrents)!=-1) {	
		torrent_name.parentNode.parentNode.parentNode.style.backgroundColor = '#9CFC92';
		torrent_name.innerHTML += '  <img src=pic/starbig.gif title="My favorite" align="right">'; 
		}

	// mark language
	if (torrent_nameT.search('Russian|(Русский)|( Rus )|( rus )|( rusa )')!=-1) { torrent_name.innerHTML += '  <img src=imagestorage/827933_4c5.png title="Russian" align="right">';  }
	if (torrent_nameT.search('(R|r)om(â|a)n')!=-1) { torrent_name.innerHTML += '  <img src=imagestorage/828001_0f6.png title="Roman" align="right">'; }
	if (torrent_nameT.search('(E|e)nglish|(E|e)nglez|нглийск|( eng )| ( Eng )')!=-1) { torrent_name.innerHTML += '  <img src=imagestorage/827935_008.png title="English" align="right">'; }
	if (torrent_nameT.search('(f|F)rancez|francais|Français')!=-1) { torrent_name.innerHTML += '  <img src=imagestorage/827946_99d.png title="France" align="right">'; }
	if (torrent_nameT.search('(j|J)apan')!=-1) { torrent_name.innerHTML += '  <img src=imagestorage/828012_a17.png title="France" align="right">'; }

	// mark Unix
	if (torrent_nameT.search('Linux|Unix|Gnome|KDE|(\\*nix)|buntu')!=-1) 
		{ torrent_name.innerHTML += '  <img src=imagestorage/812070_1f5.png title="*nix" align="right">'; }

	 // mark graphics
	if (torrent_nameT.search('Photoshop|Corel|Fonts|(Ш|ш)рифт|Adobe|(c|C)lipart|(v|V)ector|brush|(I|i)con')!=-1) 
		{	torrent_name.parentNode.parentNode.parentNode.style.backgroundColor = '#9CFC92';
			// torrent_name.innerHTML += '  <img src=imagestorage/812103_848.gif title="graphics" align="right">'; 
			torrent_name.innerHTML += '  <img src=imagestorage/863811_c0b.png title="graphics" align="right">'; 
			
		}

	// Жанры
	if (torrent_nameT.search('Comedy')!=-1) { torrent_name.innerHTML += '  <img src=pic/smilies/laugh.gif title="Comedy" align="right">'; }
	if (torrent_nameT.search('Romance')!=-1) { torrent_name.innerHTML += '  <img src=pic/smilies/love.gif title="Romance" align="right">'; }
	if (torrent_nameT.search('Family')!=-1) { torrent_name.innerHTML += '  <img src=pic/smilies/console.gif title="Family" align="right">'; }
	if (torrent_nameT.search('History')!=-1) { torrent_name.innerHTML += '  <img src=pic/smilies/medieval.gif title="History" align="right">'; }
	if (torrent_nameT.search('Sci-Fi')!=-1) { torrent_name.innerHTML += '  <img src=pic/smilies/nuke.gif title="это фантастика" align="right">'; }
	//if (torrent_nameT.search('Drama')!=-1) { torrent_name.innerHTML += '  <img src=pic/smilies/cry.gif title="DRAAAAMA" align="right">'; }
  	if (torrent_nameT.search('Fantasy')!=-1) { torrent_name.innerHTML += '  <img src=pic/smilies/medieval.gif title="Fantasy" align="right">'; }
 	//if (torrent_nameT.search('Horror|Thriller|Mystical')!=-1) { torrent_name.innerHTML += '  <img src=pic/smilies/axe.gif title="Fantasy" align="right">'; }

	//if (torrent_nameT.search('First-Person Shooters')!=-1) { torrent_name.innerHTML += '  <img src=pic/smilies/shoot2.gif  title="пиф-паф" align="right">'; }
	// RPG v1-лошадь  и v2-рыцарь
	// if (torrent_nameT.search('Role-Playing')!=-1) { torrent_name.innerHTML += '  <img src=pic/smilies/horse.gif  title="Role-Playing" align="right">'; }
	if (torrent_nameT.search('Role-Playing')!=-1) { torrent_name.innerHTML += '  <img src=pic/smilies/medieval.gif  title="Role-Playing" align="right">'; }
	// if (torrent_nameT.search('(on-line)|online')!=-1) { torrent_name.innerHTML += '  <img src=pic/starbig.gif  title="Online" align="right">'; }


	// mark unwanted BAD torrents
	if (torrent_nameT.search(neg_filter)!=-1) { 
		var XX = torrent_nameT.match(neg_filter);		// выделение ключевого слова
		var YY = torrent_name.innerHTML.replace(XX[0], '<font color=black>'+XX[0]+'</font>');
		torrent_name.innerHTML=YY;
		 // закраска серым всей строки
		torrent_name.parentNode.parentNode.parentNode.style.backgroundColor = '#aaaaaa'; 
		 // или полное вырезание 
		//torrent_name.parentNode.parentNode.parentNode.style.display = 'none'; 
	}

	if (torrent_nameT.search(TMD_torrents_DELETE)!=-1) { 
		// var XX = torrent_nameT.match(TMD_torrents_DELETE);		// выделение ключевого слова
		// var YY = torrent_name.innerHTML.replace(XX[0], '<font color=black>'+XX[0]+'</font>');
		// torrent_name.innerHTML=YY;
		// полное вырезание 
		torrent_name.parentNode.parentNode.parentNode.style.display = 'none'; 
	}
		} //for
} //end function TMD_mark_torrents

function TMD_mark_sids () {   // количество сидов/пиров
	var TMD_torrents_sids = $x("./tr/td[8]", TMD_torrents_table);			// get sids
	var TMD_torrents_peers = $x("./tr/td[9]", TMD_torrents_table);		// get peers
	var tN = TMD_torrents_sids.snapshotLength;
 	for (var i=1; i<tN;i++){
	    var torrent_sids  = TMD_torrents_sids.snapshotItem(i);
		var torrent_sidsV  = parseInt(torrent_sids.textContent);
		var torrent_peers  = TMD_torrents_peers.snapshotItem(i);
		var torrent_peersV  = eval(torrent_peers.textContent);		
		
	    if  (torrent_sidsV ) 
			{	if  (torrent_sidsV>10) 
					{ 	if  (torrent_sidsV<50) {torrent_sids.innerHTML += '  <img src=pic/stars/star_off.gif>'; }
						else {	if  (torrent_sidsV<100) {torrent_sids.innerHTML += '  <img src=pic/stars/star_on.gif>'; } 
										else {	if  (torrent_sidsV<100) {torrent_sids.innerHTML += '  <img src=pic/starbig.gif>'; }
													else {	if  (torrent_sidsV<300) {torrent_sids.innerHTML += '  <img src=pic/smilies/w00t.gif>'; }		
																else {  torrent_sids.innerHTML += '  <img src=pic/smilies/thumbsup.gif>'; 
																		}
															} 
												}	
								}	
					}	
			}
		else {torrent_sids.innerHTML = '  <img src=pic/close_x.gif>'; } // no sids - mark X
				
       if  (torrent_peersV) 
			{  	if  (torrent_peersV>5) 
					{	if  (torrent_peersV<10)  {torrent_peers.innerHTML += '  <img src=pic/stars/star_off.gif>'; }
						else {	if  (torrent_peersV<20) {torrent_peers.innerHTML += '  <img src=pic/stars/star_on.gif>'; }
									 else {  if  (torrent_peersV<50) {torrent_peers.innerHTML += '  <img src=pic/smilies/w00t.gif>'; }
												else {torrent_peers.innerHTML += '  <img src=pic/smilies/thumbsup.gif>'; }
										     }
								}  
					}			
			} 
		else {torrent_peers.innerHTML = '-'; } // no peers

		} //for
}

function TMD_mark_size () { // размер торрента - в удобную форму
	var TMD_torrents_sizes = $x("./tr/td[6]", TMD_torrents_table);			// get torrent sizes
	var tN=TMD_torrents_sizes.snapshotLength;
 	for (var i=1; i<tN; i++)
	{	var torrent_size  = TMD_torrents_sizes.snapshotItem(i);
		var torrent_sizeT  = torrent_size.textContent;
		var size_range = torrent_sizeT.slice(-2,-1);
		var size_value;
		// don't round for GigaBytes 
		if  (size_range=='G') {size_value = torrent_sizeT.slice(0,-3);}
			else {size_value = parseInt(torrent_sizeT.slice(0,-3)); }
		torrent_size.innerHTML = size_value+ ' ' + size_range + 'B' ;  
		// ~ volume in CD/DVD media
		var disk_eval =''; // примерный размер в CD/DVD дисках
		if  (size_range=='G') 
		{ if  (size_value < 1.5) { disk_eval = '<br>~ 2 CD'; }
			else { 	if  (size_value < 2.2) { disk_eval = '<br>~ 3 CD'; }
						else {	if  (size_value < 2.9) { disk_eval = '<br>~ 4 CD'; }
									else {	if  (size_value < 4.6) { disk_eval = '<br>~ DVD'; }
												else { disk_eval = '<br>> DVD'; }
											}
								}
					}
		  }
		 else  	{	if  (size_range=='M')	
						{ if  (size_value > 400 && size_value<710) { disk_eval = '<br>~ 1 CD'; }
									else { if  (size_value > 710) { disk_eval = ' <br>> 1 CD'; } }
												
						}
					else { if 	(size_range=='k')	{ torrent_size.innerHTML += ' <img src=imagestorage/824409_777.gif>'; } }
					}
		// write ~ CD/DVD disk volume for torrent
		if (disk_eval) {torrent_size.innerHTML += '<font color="#999999">'+ disk_eval + '</font>'; }
	} //for
}

function TMD_mark_uploaders () {  
    var TMD_uploaders_names = $x("./tr/td[10]/b/a", TMD_torrents_table);		// get uploders names  
	var filter = TMD_best_uploaders; 
	var tN = TMD_uploaders_names.snapshotLength;
	for (var i=0; i<tN;i++){
		var  uploader_name  = TMD_uploaders_names.snapshotItem(i);
		var 	uploader_nameT = uploader_name.textContent
		if (uploader_nameT.search(filter)!=-1) 
			{	uploader_name.innerHTML += '  <img src=pic/starbig.gif title="My favorite" border=0>';
				uploader_name.parentNode.parentNode.parentNode.style.backgroundColor = '#9CFC92';
			}

		// example of mark seedteam - replace by banner )
		if (uploader_nameT=='LST') { uploader_name.innerHTML = '<img src=imagestorage/470753_c1f.gif title="LST"><br>';	}
		if (uploader_nameT=='RST') { uploader_name.innerHTML = '<img src=imagestorage/35807_9e0.gif title="RST"><br>';	}
		if (uploader_nameT=='TUT') { uploader_name.innerHTML = '<img src=imagestorage/579564_049.gif title="TUT"><br>';	}

		}
}

// вспомогательные функции - поиск элемента страницы
function $(id) {return document.getElementById(id);}
function $x(xpath, contextNode, resultType) {
	contextNode = contextNode || document.body;
	resultType = resultType || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	return document.evaluate(xpath, contextNode, null, resultType, null);
}
function $xFirst(xpath, contextNode) {
	var xpr = $x(xpath, contextNode, XPathResult.FIRST_ORDERED_NODE_TYPE);
	return xpr.singleNodeValue;
}
