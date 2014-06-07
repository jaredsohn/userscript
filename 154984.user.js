// ==UserScript==
// @name        FO messages
// @namespace   Founders Online [Fields messages]
// @include     http://founders.icedice.org/g.php?m=diplomacy&a=inbox*
// @include     http://founders.icedice.org/g.php?m=diplomacy
// @version     1.2
// ==/UserScript==
//Получим все таблички
var Tables = document.getElementsByTagName('table');
var i;
//Найдем табличку с сообщениями
	for(i = 0; i < Tables.length; i++) {
		if(Tables[i].firstChild.firstChild.firstChild.textContent=='Сообщения') {
			break;
		}
	}
	//Нашли табличку
	if(i < Tables.length) {
		//Пойдем по строкам
		var Rows = Tables[i].firstChild.firstChild;
		var Text;
		var NewText;
		var IdxStr;
		var Star, Planet;
		var Polon;
		var UsrNm;
		var IsCyber;
		while(Rows!=undefined) {
			if(Rows.firstChild.textContent.substr(0, 18)=='Отправлено: System') {
				if((Rows.firstChild.textContent.indexOf('Сканирование флотов')+1)||(Rows.firstChild.textContent.indexOf('Поиск флотов')+1)) {
					Text = Rows.firstChild.innerHTML;
					IdxStr = Text.indexOf('находясь по координатам')+1;
					if(IdxStr) { //Сканировали флотом
						IdxStr+= 23;
						NewText = Text.substr(0, IdxStr);
						Text = Text.substr(IdxStr);
						IdxStr = Text.indexOf(':');
						Star = Text.substr(0, IdxStr);
						Text = Text.substr(IdxStr+1);
						IdxStr = Text.indexOf('.');
						Polon = Text.substr(0, IdxStr);
						Text = Text.substr(IdxStr+1);
						NewText = NewText+'<a href="g.php?m=starmap&id='+Star+'&p='+Polon+'">'+Star+':'+Polon+'</a>';
					} else {	 //Сканировали с планеты
						IdxStr = Text.indexOf('система №')+9;
						NewText = Text.substr(0, IdxStr);
						Text = Text.substr(IdxStr);
						IdxStr = Text.indexOf(')');
						Star = Text.substr(0, IdxStr);
						Text = Text.substr(IdxStr);
						NewText = NewText+'<a href="g.php?m=starmap&id='+Star+'">'+Star+'</a>';
					}
						IdxStr = Text.indexOf('Цивилизации')+1;
						while(IdxStr) {
							NewText+= Text.substr(0, IdxStr+11);
							Text = Text.substr(IdxStr+11);
							IdxStr = Text.indexOf(', Рейтинг флота');
							UsrNm = Text.substr(0, IdxStr);
							if(UsrNm!='Cybernoids'&&UsrNm!='Parasite') {
								UsrNm = '<a href="http://founders.icedice.org/g.php?m=info&a=ul&d='+UsrNm+'">'+UsrNm+'</a>';
								NewText+= UsrNm;
							} else {
								IsCyber = (UsrNm=='Cybernoids');
								UsrNm = '<b style="color: red">'+UsrNm+'</b>';
								UsrNm = NewText.substr(NewText.length-14)+UsrNm;
								NewText = NewText.substr(0, NewText.length-14);
								for(i = NewText.length; i>= 0; i--) {
									if(NewText[i]==':') {
										break;
									}
								}
								i+=2;
								if(IsCyber) {
									UsrNm = '<a href="http://www.founders.mcdir.ru/kiber_flot.php">'+NewText.substr(i)+'</a>'+UsrNm;
								} else {
									UsrNm = '<a href="http://www.founders.mcdir.ru/parazite_flot.php">'+NewText.substr(i)+'</a>'+UsrNm;
								}
								NewText = NewText.substr(0, i)+UsrNm;
	                        }
							Text = Text.substr(IdxStr);
							IdxStr = Text.indexOf('Орбита: ');
                            NewText+= Text.substr(0, IdxStr);
							Text = Text.substr(IdxStr+8);
							IdxStr = Text.indexOf(',');
                            Planet = Text.substr(0, IdxStr);
							Text = Text.substr(IdxStr+1);
                            NewText+= '<a href="g.php?m=starmap&id='+Star+'&p='+Planet+'">Орбита '+Planet+'</a>,';
							IdxStr = Text.indexOf('Цивилизации')+1;
						}
						NewText+= Text;
						Rows.firstChild.innerHTML = NewText;
				}
				if(Rows.firstChild.textContent.indexOf('Тема: Астероидные поля')+1) {
					Text = Rows.firstChild.innerHTML;
					IdxStr = Text.indexOf('видимости радаров')+18;
					NewText = Text.substr(0, IdxStr);
					Text = Text.substr(IdxStr);
					IdxStr = Text.indexOf('<br')-2;
					UsrNm = Text.substr(0, IdxStr);
					Text = Text.substr(IdxStr+1);
					for(i = UsrNm.length-1; i >= 0; i--) {
						if(UsrNm[i] == ':') {
							break;
						}
					}
					Polon = UsrNm.substr(i+1);
					Star = UsrNm.substr(0, i);
					for(i = Star.length-1; i >= 0; i--) {
						if(Star[i] == '(') {
							break;
						}
					}
					Star = Star.substr(i+1);
					NewText+= '<a href="g.php?m=starmap&id='+Star+'&p='+Polon+'">'+UsrNm+')</a>';
					IdxStr = Text.indexOf('<b>')+1;
					while(IdxStr) {
						NewText+= Text.substr(0, IdxStr+2);
						Text = Text.substr(IdxStr+2);
						IdxStr = Text.indexOf('</b>');
						Star = Text.substr(0, IdxStr);
						Text = Text.substr(IdxStr);
						IdxStr = Star.indexOf(':');
						Polon = Star.substr(IdxStr+1);
						Star = Star.substr(0, IdxStr);
						NewText+= '<a href="g.php?m=starmap&id='+Star+'&p='+Polon+'">'+Star+':'+Polon+'</a>';
						IdxStr = Text.indexOf('<b>')+1;
					}

					NewText+= Text;
					Rows.firstChild.innerHTML = NewText;
				}
				if(Rows.firstChild.textContent.indexOf(' - Поиск аномалий')+1) {
                    if(Rows.firstChild.textContent.indexOf('обнаружил следующие флоты')+1) {
	                    Text = Rows.firstChild.innerHTML;
						IdxStr = Text.indexOf('находясь по координатам')+23;
						NewText = Text.substr(0, IdxStr);
						Text = Text.substr(IdxStr);
						IdxStr = Text.indexOf('(')+1;
						NewText+= Text.substr(0, IdxStr);
						Text = Text.substr(IdxStr);
						IdxStr = Text.indexOf(':');
						Star = Text.substr(0, IdxStr);
						Text = Text.substr(IdxStr+1);
						IdxStr = Text.indexOf(')');
	                    Planet = Text.substr(0, IdxStr);
						Text = Text.substr(IdxStr+1);
						NewText+= '<a href="g.php?m=starmap&id='+Star+'&p='+Planet+'">'+Star+':'+Planet+'</a>)';
						IdxStr = Text.indexOf('Система №')+1;
						while(IdxStr) {
							NewText+= Text.substr(0, IdxStr+8);
							Text = Text.substr(IdxStr+8);
							IdxStr = Text.indexOf(',');
							Star = Text.substr(0, IdxStr);
							Text = Text.substr(IdxStr+1);
							NewText+= '<a href="g.php?m=starmap&id='+Star+'">'+Star+'</a>,';
							IdxStr = Text.indexOf('Система №')+1;
						}
						NewText+= Text;
						Rows.firstChild.innerHTML = NewText;
                    }
				}
			}
			Rows = Rows.nextSibling;
		}
	}
