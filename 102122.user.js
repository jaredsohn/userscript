// ==UserScript==
// @name           محسن عرض المخزن
// @namespace      Jano1
// @description    اداة صغيرة تقوم بتحسين طريقة عرض امتلاء الموارد
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=storage
// @version        1.00
// ==/UserScript==


	//Zielobjekt:
	var object = document.getElementsByClassName('vis')[0].getElementsByTagName('td');
	
	//document.getElementsByClassName wird ermöglicht.
	getElementsByClassName = function(class_name) {var docList = this.all || this.getElementsByTagName('*');var matchArray = new Array();var re = new RegExp("(?:^|\\s)"+class_name+"(?:\\s|$)");for (var i = 0; i < docList.length; i++) {if (re.test(docList[i].className) ) {matchArray[matchArray.length] = docList[i];}}return matchArray;}

	//Produktion pro Stunde
	var iron, stone, wood;
	 iron = document.getElementById('iron').getAttribute('title'); iron = iron/3600;
	 stone = document.getElementById('stone').getAttribute('title'); stone = stone/3600;
	 wood = document.getElementById('wood').getAttribute('title'); wood = wood/3600;
	
	//Aktueller Speicherstand
	var iron_c, stone_c, wood_c;
   	 iron_c = document.getElementById('iron').innerHTML;
	 stone_c = document.getElementById('stone').innerHTML;
	 wood_c = document.getElementById('wood').innerHTML;
	
	//Dauer bis Ende
	var iron_d, stone_d, wood_d
	 iron_d = object[1].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
	 stone_d = object[3].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
	 wood_d = object[5].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
	
	//Dauer in Sekunden umrechnen:
	var d = new Array();
	 d[1] = (parseInt(iron_d[1]*60*60))+(parseInt(iron_d[2]*60))+parseInt(iron_d[3]);
	 d[2] = (parseInt(stone_d[1]*60*60))+(parseInt(stone_d[2]*60))+parseInt(stone_d[3]);
	 d[3] = (parseInt(wood_d[1]*60*60))+(parseInt(wood_d[2]*60))+parseInt(wood_d[3]);
	
	//Produktion nach Zeit pro Rohstoff
	var pronazeit = new Array(); var wood_p, stone_p, iron_p; var i = 1; var capa = document.getElementById('storage').innerHTML;
	 while(i < 4){
		wood_p = Math.round(wood * d[i])+parseInt(wood_c); if(wood_p >= capa){wood_p = 'ممتلئ';}
		stone_p = Math.round(stone * d[i])+parseInt(stone_c); if(stone_p >= capa){stone_p = 'ممتلئ';}
		iron_p = Math.round(iron * d[i])+parseInt(iron_c); if(iron_p >= capa){iron_p = 'ممتلئ';}
		pronazeit[i] = {'wood':wood_p,'stone':stone_p,'iron':iron_p};
		i++;
	 }  
	
	//Einsetzen der Werte in die Tabelle
	var wood_old_str = object[0].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
	var wood_new_str = '<a title="خشب: ممتلئ | طمي: '+pronazeit[1].stone+' | حديد: '+pronazeit[1].iron+'">'+wood_old_str[0]+'</a>';
	object[0].innerHTML = object[0].innerHTML.replace(wood_old_str[0],wood_new_str);
	 
	var stone_old_str = object[2].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
	var stone_new_str = '<a title="خشب: '+pronazeit[2].wood+' | طمي: ممتلئ | حديد: '+pronazeit[2].iron+'">'+stone_old_str[0]+'</a>';
	object[2].innerHTML = object[2].innerHTML.replace(stone_old_str[0],stone_new_str);

	var iron_old_str = object[4].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
	var iron_new_str = '<a title="خشب: '+pronazeit[3].wood+' | طمي: '+pronazeit[3].stone+' | حديد: ممتلئ">'+iron_old_str[0]+'</a>';
	 object[4].innerHTML = object[4].innerHTML.replace(iron_old_str[0],iron_new_str);
	