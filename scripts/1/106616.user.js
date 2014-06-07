// ==UserScript==
// @name           Galaxy.Ykt.Ru Helper
// @namespace      Galaxy.Ykt.Ru@Cujoko
// @description    A script for Galaxy.Ykt.Ru.
// @include        http://galaxy.ykt.ru/*
// ==/UserScript==

var galaxy = {
	colorer: function(d) {
		var sets = settings.pages.colorer;

		var colors = sets.colors.slice();
		var optionEls = $$('.//select/option');
		if (optionEls) {
			var optionEl;

			var matchCoord;
			var color;
			var ss = {};
			
			for (var i = 0, len = optionEls.length; i < len; i++) {
				optionEl = optionEls[i];
				
				matchCoord = optionEl.innerHTML.match(sets.regExpCoord);
				if (matchCoord) {
					color = ss[matchCoord[1]];
					if (!color) {
						color = colors.shift();
						ss[matchCoord[1]] = color;
					}
					optionEl.setAttribute('style', 'color: ' + color + ';');
				}
			}
		}
	},
	imperium: function(d) {
		var sets = settings.pages.imperium;
		
		var colors = settings.pages.colorer.colors.slice();
		
		var table	= $$('/html/body/center/center/table/tbody')[0];
		
		var images	= $$('.//tr[2]/th', table);
		var names	= $$('.//tr[3]/th', table);
		var coords	= $$('.//tr[4]/th', table);
		
		var matchCoord;
		var color;
		var ss = {};
		
		var metals				= $$('.//tr[7]/th', table);
		var matchMetal;
		var amountMetalAr		= new Array();
		var rateMetalAr			= new Array();
		
		var crystals			= $$('.//tr[8]/th', table);
		var matchCrystal;
		var amountCrystalAr		= new Array();
		var rateCrystalAr		= new Array();
		
		var deuteriums			= $$('.//tr[9]/th', table);
		var matchDeuterium;
		var amountDeuteriumAr	= new Array();
		var rateDeuteriumAr		= new Array();
		
		var unit;
		var matchUnit;
		
		for (var i = 1, len = metals.length; i < len; i++) {
			images[i].setAttribute('style', 'padding: 10px;');
			matchCoord = $$('.//a', coords[i])[0].innerHTML.match(sets.regExpCoord);
			color = ss[matchCoord[1]];
			if (!color) {
				color = colors.shift();
				ss[matchCoord[1]] = color;
			}
			names[i].setAttribute('style', 'color: ' + color + ';');
			
			matchMetal			= metals[i]		.innerHTML.match(sets.regExpRes);
			if (matchMetal		!= null) {
				amountMetalAr		.push(Number(removeDots(matchMetal[1])));
				rateMetalAr			.push(Number(removeDots(matchMetal[2])));
			}

			matchCrystal		= crystals[i]	.innerHTML.match(sets.regExpRes);
			if (matchCrystal	!= null) {
				amountCrystalAr		.push(Number(removeDots(matchCrystal[1])));
				rateCrystalAr		.push(Number(removeDots(matchCrystal[2])));
			}

			matchDeuterium		= deuteriums[i]	.innerHTML.match(sets.regExpRes);
			if (matchDeuterium	!= null) {
				amountDeuteriumAr	.push(Number(removeDots(matchDeuterium[1])));
				rateDeuteriumAr		.push(Number(removeDots(matchDeuterium[2])));
			}
			
			for (var key in sets.units) {
				unit		= sets.units[key];
				matchUnit	= unit.THs[i].innerHTML.match(sets.regExpUnit);
				if (matchUnit != null) {
					unit.sum += Number(matchUnit[1]);
				}
			}
		}
		
		var amountDEQAr		= new Array();
		var amountSumDEQ	= 0;

		var rateDEQAr		= new Array();
		var rateSumDEQ		= 0;

		var amOfCols = amountMetalAr.length;
		for (var i = 0; i < amOfCols; i++) {
			amountDEQAr[i]	= ultraRound((amountMetalAr[i]	/ 4 + amountCrystalAr[i]	/ 2 + amountDeuteriumAr[i])	/ 1000, 1);
			amountSumDEQ	+= amountDEQAr[i];
			
			rateDEQAr[i]	= ultraRound((rateMetalAr[i]	/ 4 + rateCrystalAr[i]		/ 2 + rateDeuteriumAr[i])	/ 1000, 1);
			rateSumDEQ		+= rateDEQAr[i];
		}

		var s = '<th width="75"><table width="100%"><tr><th width="50%"><font color="orange">' + ultraRound(amountSumDEQ, 1) + '</font></th><th width="50%"><font color="orange">' + ultraRound(rateSumDEQ, 1) + '</font></th></tr></table></th>';
		for (var i = 0; i < amOfCols; i++) {
			s += '<th width="75"><table width="100%"><tr><th width="50%"><font color="orange">' + amountDEQAr[i] + '</font></th><th width="50%"><font color="orange">' + rateDEQAr[i] + '</font></th></tr></table></th>';
		}

		table.insertRow(6);
		table.rows[6].innerHTML = s;

		for (var key in sets.units) {
			unit = sets.units[key];
			unit.THs[0].innerHTML += ' <font color="orange">(' + unit.sum + ')</font>';
		}
	},
	leftMenu: function(d) {
		// var table = d.getElementById('menu').getElementsByTagName('table')[0];
		var table = $$('#menu')[0].getElementsByTagName('table')[0];
		table.rows[13].innerHTML = '\
			<td>\
				<div align="center">\
					<img ilo-full-src="http://galaxy.ykt.ru/images/menu/str.gif" src="images/menu/str.gif" height="7" width="7">\
				</div>\
			</td>\
			<td>\
				<div>\
					<a href="marchand.php" accesskey="o" target="Hauptframe">\
						<font color="red">&nbsp;Скупщик лома</font>\
					</a>\
				</div>\
			</td>'
		;
		   
		table.insertRow(14);
		table.rows[14].innerHTML = '\
			<td>\
				<div align="center">\
					<img ilo-full-src="http://galaxy.ykt.ru/images/menu/str.gif" src="images/menu/str.gif" height="7" width="7">\
				</div>\
			</td>\
			<td>\
				<div>\
					<a href="schrotti.php" accesskey="o" target="Hauptframe">\
						<font color="red">&nbsp;Скупщик флота</font>\
					</a>\
				</div>\
			</td>'
		;   
	},
	marchand: function(d) {
		var sets = settings.pages.marchand;
		
		var centerForm = crEl({
			n: 'center',
		}, d.body);

		var table = $$('/html/body/div[2]/center/table/tbody/tr[2]/td[2]/table')[0];
	
		metal		= toNumber($$('.//tr[3]/td[2]/font/input', table)[0].value) - 100;
		crystal		= toNumber($$('.//tr[3]/td[3]/font/input', table)[0].value) - 100;
		deuterium	= toNumber($$('.//tr[3]/td[4]/font/input', table)[0].value) - 100;
		
		DEQ = metal / 4 + crystal / 2 + deuterium;

		var buyResources	= deserialize('BuyResources', [0, 0]);
		var phase			= deserialize('SellingPhase', 1);
		
		// var errormessageTHs = document.getElementsByClassName('errormessage');
		// if (errormessageTHs.length > 0) {
			// if (errormessageTHs[0].innerHTML == 'Обмен прошёл успешно!' && phase == 1) {
				// location.assign('http://galaxy.ykt.ru/marchand.php');
			// }
		// }

		if (phase == 1) {
			crEl({
				n: 'center',
				c: [
					{
						n: 'a',
						a: {
							innerHTML: 'Всё => Дейт',
						},
						evl: {
							type: 'click',
							f: resToResReturner(0, 0, metal, centerForm),
							bubble: true,
						},
					},
				],
			}, d.body);
			
			var unit;
			var amount;

			var shipTopicShown = false;
			var ships = sets.units.ships;
			for (var key in ships) {
				unit = ships[key];
				amount = Math.floor(DEQ / unit.DEQ);
				if (amount >= 1) {
					if (!shipTopicShown) {
						crEl({
							n: 'center',
							a: {
								innerHTML: '&nbsp;',
							},
						}, d.body);
						
						crEl({
							n: 'center',
							a: {
								innerHTML: 'Корабли',
							},
						}, d.body);
					
						shipTopicShown = true;
					}
					crEl({
						n: 'center',
						c: [
							{
								n: 'a',
								a: {
									innerHTML: unit.name + ': ' + amount,
								},
								evl: {
									type: 'click',
									f: resToResReturner(amount * unit.metal, amount * unit.crystal, metal, centerForm),
									bubble: true,
								},
							},
						],
					}, d.body);
				}
			}

			var defTopicShown = false;
			var defense = sets.units.defense;
			for (var key in defense) {
				unit = defense[key];
				amount = Math.floor(DEQ / unit.DEQ);
				if (amount >= 1) {
					if (!defTopicShown) {
						crEl({
							n: 'center',
							a: {
								innerHTML: '&nbsp;',
							},
						}, d.body);
						
						crEl({
							n: 'center',
							a: {
								innerHTML: 'Оборона',
							},
						}, d.body);
						
						defTopicShown = true;
					}
					crEl({
						n: 'center',
						c: [
							{
								n: 'a',
								a: {
									innerHTML: unit.name + ': ' + amount,
								},
								evl: {
									type: 'click',
									f: resToResReturner(amount * unit.metal, amount * unit.crystal, metal, centerForm),
									bubble: true,
								},
							},
						],
					}, d.body);
				}
			}
		} else if (phase == 2) {
			if (buyResources[0] == 0 && buyResources[1] == 0) {
				phase = 1;
			} else {
				phase = 3;
			}
			serialize('SellingPhase', phase);
			resToRes('c', 0, crystal / 2, centerForm);
		} else if (phase == 3) {
			serialize('BuyResources', [0, 0]);
			serialize('SellingPhase', 1);
			resToRes('d', buyResources[0], buyResources[1], centerForm);
		}
	},
	overview: function(d) {
		var sets = settings.pages.overview;
	
		crEl({
			n: 'a',
			a: {
				innerHTML: 'Test alarm',
				'@style': 'position:fixed;bottom:5px;right:5px;',
			},
			evl: {
				type: 'click',
				f: alarm,
				bubble: true,
			},
		}, d.body);
		var rows = $$('/html/body/center/div[2]/center/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]/div/div/table/tbody/tr');
		
		var infoPath;
		if (sets.debug) {
			infoPatt = sets.yourFleetRegExp; // Свой
		} else {
			infoPatt = sets.alienFleetRegExp; // Чужой
		}
		
		var flightInfo;

		// Тип отслеживаемых полетов:
		var flightType1, flightType2;

		var match;
		
		var player;

		var destName, destCoord;
		var sourceName, sourceCoord;

		var times;
		var timeLeft, timeArrive, timeReturn;

		var key;
		var fleets = new Array();
		var count;

		// Текст письма
		var content = '';

		for (var i = 1, len = rows.length; i < len; i++) {
			flightInfo = $$('.//td[2]/span', rows[i])[0];
			
			if (sets.debug) {
				flightType1 = 'flight owntransport';
				flightType2 = 'flight owndeploy';
			} else {
				flightType1 = 'flight attack';
				flightType2 = 'flight federation';
			}
			
			if (flightInfo.className == flightType1 || flightInfo.className == flightType2) {
				// К нам летит чужой флотик. Аларм! Аларм!
				match = flightInfo.innerHTML.match(infoPatt);
				
				if (sets.debug) {
					// Свой транспорт:
					player = '';
					
					destName = match[3];
					if (destName == 'Луна') {
						destName = 'Moon';
					}
					destCoord = match[4];

					sourceName = match[1];
					if (sourceName == 'Луна') {
						destName = 'Moon';
					}
					sourceCoord = match[2];
				} else {
					// Атака:
					player = match[1];
					
					destName = match[4];
					if (destName == 'Луна') {
						destName = 'Moon';
					}
					destCoord = match[5];

					sourceName = match[2];
					if (sourceName == 'Луна') {
						destName = 'Moon';
					}
					sourceCoord = match[3];
				}
				
				// Время прилета и возврата:
				times = $$('.//td[1]', rows[i])[0];
				timeLeft = $$('.//div', times)[0].innerHTML;
				timeArrive = $$('.//font/span', times)[0].innerHTML;
				timeReturn = $$('.//font/span/font', times)[0].innerHTML;
				
				// Добавляем этот флот в массив текущих флотов:
				key = sourceCoord + '_' + timeArrive + '_' + timeReturn;
				fleets.push(key);
				
				count = GM_getValue(key, 0);
				if (count < sets.quantityOfAlerts) {
					if (sets.debug) {
						content += '"Cujoko" --->' + 
							'\nLeft: ' + timeLeft + 
							'\nTo: "' + destName + '" ' + 
							'\n' + destCoord + ' @ ' + timeArrive + 
							'\nFrom: "' + sourceName + '" ' + 
							'\n' + sourceCoord + ' @ ' + timeReturn +
							'\n\n';
					} else {
						// Добавляем описание флота в текст письма:
						content += '"' + player + '" --->' + 
							'\nLeft: ' + timeLeft + 
							'\nTo: "' + destName + '" ' + 
							'\n' + destCoord + ' @ ' + timeArrive + 
							'\nFrom: "' + sourceName + '" ' + 
							'\n' + sourceCoord + ' @ ' + timeReturn +
							'\n\n';
					}
				}
				count = count + 1;
				GM_setValue(key, count);
			} else {
				continue;
			}
		}
		
		if (content != '') {
			// Звуковая тревога:
			alarm();
			
			// Отправляем письмо:
			// sendEmail(content);
		}

		// Удаляем из настроек лишние флоты:
		var fLen = fleets.length;
		var keys = GM_listValues();
		if (fLen == 0) {
			for (var i = 0, key = null; key = keys[i]; i++) {
				GM_deleteValue(key);
			}
		} else {
			for (var i = 0, key = null; key = keys[i]; i++) {
				for (var j = 0, fleet = null; fleet = fleets[j]; j++) {
					if (key == fleet) {
						// Записанный флот есть в текущих флотах:
						break;
					} else {
						// Записанного флота, может быть, нет в текущих флотах
						if (j == fLen - 1) {
							// Это последний из текущих флотов. Всё указывает
							// на то, что записанного флота нет в текущих флотах.
							// Удаляем его из настроек:
							GM_deleteValue(key);
						}
					}
				}
			}
		}

		function alarm() {
			if (typeof newWin == 'undefined' || newWin == null) {
				var newWin = window.open('', 'AlarmWindow');
			}
			newWin.document.body.innerHTML += '\
				<audio autoplay="autoplay">\
					<source src="data:audio/wav;base64,UklGRuUoAABXQVZFZm10IBAAAAABAAEAdysAAHcrAAABAAgAZGF0YcEoAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgH9/f4CBgYGAf35/gYGAgH9/gIGCgoGAf35/gYKBgH5+gICAgICAgICBgYF/fn5+f4GBgYGBgH9/f4GCgYB/fn9/f39/f4CBgoKCgH9/f3+AgYKCgH5+f4GEg4B+fH6ChIOBfn18foGEhIF+fX5/goOEg397en6Eh4V/e3l8goSDgX9+fn+Bg4KBfnt7f4SHhYF8eHp/hoqGfnZ4gIeIgnx6fIGFhYOAf398e4CFiYV7dXZ9hoqFfnl4f4aIhoF9eHl+goSCgH99fYGHjIqAeHV4f4ODgX57fIGDhIOBfnyAg4SCfXp9gYOGh4R/e3uAgYF/fXx9gIKCgX+AgYGCgX18f4B/f4OIiIN4cnmBhIaCfX6AgIGEg4F/fHqAhYJ+e3t/hIqJh4J5dXd9goV/eXh9hYuJhIB7fYKAfX2Afn19gomJhoB6eYGKiH1zcXeCiYaCfHd9goeIgHl8gomKiIN+enZ5fIeOhHVscX+MkYp9dHZ+hoSAfX1/gIKGiIR9d3yGjYuCd3F0e4GFhIN8dnuChoJ+f4OHi4mBenl/iYmJhHdxc3qAhYJ9fH2BgXx5eX+EiI+QiYF5doCLkYp2a3J3f4KBgoF6fIaFfnh0d4GMjIR6dXqGjpOQg3x7en16c250f4eLj4p5a3KCj5KJeW50f4uSko6DenN7iIZ7b2xzfYqOhnlzeH+EiImEfX2GkpeOf3hzd4GIgHdydHp+f319hY6FdnR9gYR/fY2bmYx8am19goB8dXV2foB4foyLgXV3f4KEgYWRl5CFenJ9h4J2bXF6fIB+e3yBiYuJhX57e4CNoZmHdmxzg4+Fb2xvcX2Gi4V2b3aCj5J+bHKGnaCTgXBseY2RfWtna3J8houAenl8h5CKf3l/jZ6Vg3hxeYuMfHZ5dXd5eHp4fIeBgoF3eYaZoJqMdnB4gpCLdm1vd32Eg3hxfISBfn14eIKQoJmHend7gYB1bHB9hH13cXB+k5iQg3ZxdoSTmpSHe3Z4gYR7b251e3t6d3h/h4uLiomFgoSKjYyFf32BhIJ7c3BydHV2eH2DhoeIjI+Pjo2NjIZ+eHd6fX16dnRxb3B1en2BhYaHio2Pj4+Pi4aAdXN4fIJ+dnJlZXV4eX+FgYWIiY6Smp2Win10d3x/fHdxbnBzdXV2e4KKjIuLjZCTkYqDfn1/goKAeXFvdHp8end5gomMjIyRlJCHfXl5fYCBgoF+dW1sc3d3d3Z5gISHjZebloRzcHiEiYF6fIB9cmhlaneEiIZ6bXyUqbSeeV1iepOZi3Jrfo6FdmBbboSQlYVsboeirJyCZ2Z/j41+cnmNj4VuXGyFlJSAcnaHnKORcWN2goODe295g4OIhXZxe4WPhW1whpGakHdlbnyFhX13hX9ocH98gYiGh4SFf3Z9iouAcnN3e4CEjZOOeWZjcYWSlZCEd4Scmol+aV9qZW5/jp2SeGl6j4yBhI6PhH1/i5qgi2NedXRpWmV7kI93bnyOl5udm5KEfHN5jYp9bl5ibXeAcGZqdIKGfYmhramdjYiWmodyZmdkZG6Cg3lmWGJ1h4iKn6+nkHd5nrSWbk5SbImYhm1aWGFrb3OBkq63oYhzfaO1lnFMUXSWoYVhT1llcW9whJ6sqpR1fJ6tn4BhUmWEnpRzW1ZldXp3eo2go5J3ep62n3ZOUnKUpZh+YVFYcHZ3ipqSh310gJe0qX5QTG6Np5uEcWJeZGdzip6ahm9pfqGzm3ZTTGR/lZyNhHdsbGl1j6OihWpnfJinnH1bVWJ3hYKPlo+EdW5yiKixmXxseJGSfl5RYXJ5enh9i4uFhYuKjJ2rnYR8iJ+dekw/UWd6d2lud3R3hJedn6SgmoqAnqiUdk87TWNzcWBhbG91hZebpKigmJadqayZeVU/S2V4dFtKWG19kZ2XkqGrnpSerbiielU8UXKGh2M7RmmElaCSg5Oek5Sdq7ymflpDVXaCemNBQ2qGoquWf3uEkZqjr6yPdltWcImKaDw2VnSRrqiQfXJ8lKu5rIlhUWOHn5h1TTFEZYKgrqGUhnBzk7K3mG9IVYGepY1lOjZVdZatrKGHb3qWr66RaUNQepqiknZLOlFwjqaroYhweZ66spJrRUZphpuWd086S2uKp7KokHNvi6+/n3VKQmSGmZaAVjNGaYqjqqiRdoKcsLeef2RQXXuCgHtqR0Znh6GmmIF7m7Oxoodxamt6iIhsVkxGV3iWqaGHb32jvraYb11odISMkHdSPUNbepOlpYp1haS+tItdWmR0jZGCdV5GUGuKnJ6ZjYuLn7evjWVTXXiJg15WZFpigJadoZ6VlZuoqJuCYFFjeIVsQ0ZdbX6Ih46arKienqimk3dcXGpuY09HTl5xh5KUkpafqqyqq6CLe2pqfXdKLztUaoWdlYKKlZeqvb+3m4J2aoOMaTobKktpi6CYkYaAkrLJyq+LfnmCjnxUMis3UXGIn6yTdniQtcm8oYt7eYKDZzwyQlNmeYWZoox2fZi6u5+Pg4yWg1UyPUxbdX1/jJGOgHqauLOci4CInJduPi06UnGImp+QfnGBoMC0kHlxiKqec0kxMklphJ2pmY2Cfpy8rYhuZnicm21dUTE4V3aUpZ6Qipa6x62HZ1x4jo5tVlpHQldxhYaMkpi1zMu4lYBycWlfYWhlU05mfYeIeG6KsNHOq5h/doNsV1NYYF5qgIyIbWF4mbS7s56YloR1XT1EYG92d3OChXRvharBsoxvfZqsjGAqLV13laN7YmhrfZm1yLmWfXCDmolkPDJRdI6fjm5jb4ilvbuljIaQoJZpODRScYuPeWtjbIinxL+Yb2iDqLGOWC47Y4WinHxdTGOJrMy3hl9jiq2bZjg+X36VoZWEe2JigKHCsI51Y3qaiFIzU3WRoZWCh5CPinqHkZGXi3ZrZVZOXG2GnZN7h6axrpuHdXCBlJBvSjZCX3GInaN/ZXqjyMGjglxvjJaJWTw8UGBshp2ciXyNpcK6lGdshZGHVEFWYmBof5yNin2Jpr7BpXdkdYWRZDlScmlngZiXjHV6msLDonRhbn1/WkhRcnpziZqRjYl9jLe/oHtlZ3BhSlNSYnZ/nLyujHRrib3Emm5aYnhjQ0NRaXZ+lrPAsZJqeLTRoHJaVmpyWERBUmaQr6+4tJptdKzRsodaOFBzclA+SGCBqre4rJ+UhJOssaRxOkpgVElFUnKKprqUhavGv66DfY5eTWBJQE08TXuZrbKFeKPP0a6AfnRXUUM+T2BlY3WPsLmchZzSzpZma3F1d1AnPmB+iHR5j5u3u7HDvpN6ZGBnWT0sTnOTmo96dJ7Q2selh4mGd25XTTQmUHaUpYhabJ7L1L+YeYeTe1dGQTtJZoGThF9hk7rWypt8kqWYa0s8PFZ1iJyLYklplrvTu4dziaCZaj4/XHeJnZpvYGt2jrbFpoeLjYJpRExpfIyXi3BniJuAg5mKiZqFbW5UQ1d5laKTdGyErrCEdWFroZ9kRkxQVm6IoqSQb4Kzyq+HV1yMm3c4NFVsc4eWmY11jsXRv6Fvb4qMaTguP193hIySh3WTyNjPrX53d4qBW0ApOWd+h4tqYoSzztO+qZlmV2pvZEY8TmFweXh5g6e5t73Cqn1aXmtnWU9VY312bH+OlqO1w7GXck9qfXttTkFvhmt1mJ+UmqeuqJJwXnuLdFNMX36CcnKNoKS0rJOUfGB4j31tT0lneHuBiY+RlqqukX53bYeRf1c+WHRva3+WmZePdpSYfnl5k5iDVD9fdHlwe5qorpBdaXl3lqGNkH9lZ2ZheIiOr8SfbmpmbnyTjoKTjHx4Z11wlKm/uIFaXW12jo1xfZV/c3xiXYabsr+UZVRmb3WBc22Cl5B1WFR0m7C7pXVSU22DjH1cXoCbnmxDXIm51Ld9U0ledIaXb1l+p7ODPUSAn9TOkFxXZ3Jtfndid5W9t3Y+YY/B0qhxTl2Af3RgTmmJqrubY1N4p9K4gWJhbnltW1Fbdo+jmnZng7LHr3tacIKDfVpCUWmDno5vZYK4y6+BZG12eYlmPl9xaYaCXW+Xx8umdGd7fXZ6bFppeoWRcENnlrLGtXhahJd+Z2FzeHJ8m4hTZJextLV/U4KXfmJWbn+Ag4d8a3ihxriifl5xfnluW2d5c3uHeHiOqL7Fnnd7cmhrY2Jea3ZwbWt8oLi0upd6kYdXT1t2eWBgbVxWgbS5s7mFXpefX0FZd457bVtHW4q5urO7gG2djUw4VneejF9PUGWQt8S6r358oJZdM01zlIxaTltskrnLw7aJcpaaZD5PcY98Sj5fhJ+/0cSpk4aFdF5cU2V+a0hJYn+avNrAkp6SgWpKX3hvYlpQTWGApMDIqYmNj5dzTlloZ2lzXUpbgKK/wqaUiYWIc3ZvWVhnfG1WZouwuqONn6F/cHuEaVJdd6N5TGiRvqxpb6ivh210gmJSXYKteFmEuLV4T2igyJp7cFpSYHSSjG51pMiqc0lYl8Odf2hGTWd6g3p3ibbFmWRKaaK4lV5HUGF4aVl7qby/onxVV4Onq5BeSFmHjE1QgbzVp3BSSXCRsLF2RVqCnXZKaJvOvXtLS2uImamPYliAm3BXcJXHxYlSRV2BmJ2DWmaSqm5Cb5nD0Z1cQ1t9kplzUV53pJxOVpG+zrJ9QE1+oJp0TlNrkqJnRnWszr+YWkZunKt8TlRogZFkUnqmx7iOX1Z2maaMUVaKkIBTT3ytyLCBWVhvmq2MU12LknpNWYO4wppmWV1xkpiOcm+Ukn9UXoKwwZNITH59gn1sfo+jqH9JX5O5tpNRPXaRinpVYYiqpnxHYpXHs4dLQGeJp39FWYuqn3RIYZnRtodNNmSFoZZVUI+rnoFQWYnEypxgM1t+mKNqWomrpH5SXIrAy51fOElui4h8gp+wlnxcYYW0w5teOkZuhmZqnLWymXJQZ4qxw5RLOlRqb2ZwjLS7o3pTc5y0qYBSPVNdYm1zgqW8s4leerC4g1hbTU1QUY2Fa5K9vppqfbO+gzpOaFZQUoKSb3+6zqp+irjChkVJVE9TYYqManKp1riEpMyweEdBSlNTYYN8Z4SvxLOas86wbkY8RFlpfndXWIi1sKyusrmecE8vPF95f2xKXZKgnbbBtpx5gmYyP2WSfkhLhaeMjbfHqHJohVY7UXWeekBRo6t8mMrLpVhUYEFTcoyQXERspqSYss7ToV9BPVN1lI91SViNnpimtMzBi1ktOWKFj4loSHCZlaKrusifdkAnTnSCgnhpa46DjrS/0bJ0SDVGbn17dmpqg4+HnKjC0aJsOTVifoR6X11vgXuJoLDFt4xbOFBxhZV5YmpxcHaIsNa5lW4xQXmMj46AdHhjYoaSs9e0jlguVZWafH+SjHNbaIaRtMaidD06YZiZeXGVl3NneImYraaTYjRMe4+SgH6Xg3iAiJuYhX1sX1VkgpGThpCbhX2Mn6JyTlRvdmBmg5yKcounmIuSm35QQlJ2gGpukJl0bZCpvKONd01LTlZ6hHyLooxneZ7L0qNsTlNURlqInJSXn3pmgbTXu3M7XnZPR2WUp5aajmh1o829jD1Je2ROVXmkjoOef3CSwcepWDJndV5ZYpGmcn2Ndou6y7iGOkhxY1Jhd5qOb3J3i7nUvYpVVWtwRlB7joaHb1p/rNTQmFpsbHRmS2+NfoeATWiawdOwZ2R9f3ltbnp9f3lTYIyv0rWAcnaAgXt8cXeCbVNVe56uqaaPc3mDh4Z0cXpqVVltiZuBh6WNfoKPnn5icnJeW2V9jWxwnZCIkpWgjnZ5dW1bVGyTdlRxg5ijmp6agHh/jm1JZIp9ZV5ul7W0m4p+d4Clm2RMXXZ3XWOPrcS2lnVbd7C2jV1NS01gdIyjsrKtklJZlbimemFPMUdtiq+4l5epaUl3mq6hcWpGNF58sMGNf5t8VmGAmayMY0I2XXityZmCjYRnVnWWrJNPNUVkfKvBqI6PjnJecpargT47Wm6ApramlJ6ed1drp65YJ197a3WVrJuKqalwWG2ksmMpV5yHaoGhkYSonGRUcLGpTi5nrZVlhKF7g6iCVVmNt3E3VYqznGhskYqRj2NaeZSSW0Vsp7+XZ2iSlIJtX3OYml8+Yo6+toJceamWdVhdjamGQEN2psathF+FsZBoWWuWnmctU4q0wq6EZpCri2Vae6FyMUF3nry5nnB7qJpuYXKSg0MsVnqZw7GHcoGdh3GHlHZGLEJtfqzHoIBxfI90gKyQQh47coKOxaqFiH15dISvpGUxKlJ/jK++gHuWd2iIubR9PyhIdYmmz517l3RYeLjLlUwbN2mOp8WyiYmDVF6RzbFoIidbgJ29upmMiF9Nda/FkkceRmyFuMKcmph3RFaRyK5iIDBfdKXQrKKdflRKcq7Bhi4jU3CHuc/Bn3ZcV26YwZw/H0lme6jMyq2CWUlxmbGuZB01V3CYtcC3h0RMi6+mm3AwMFJskKKxvqBOPoS5tJdfLzZZho+JoMWwbzpnqsadXSI4VHGZnZSzvpVSVYi4tXojJ1Jmh6mwtLacYF2ItLqKNSRPbIOUqritl2Vah7K5lkwkR3SGiqK2o4FhXHiiuqFdJ0F1iYiYta+BSVJ/oryhZjVDaJGRgqK+ml1KdZ+/pm00Q2aRl3iHuKx5VGeUv7R4MTlnlaF5apurhXFqgbG+hzw3ZpOee2d+i4uTf3yruodCOmuWpX5TYnV5l5GFqrKESjlqmq6KTUtibo2bnKWeeVdFaZSxnVs7WHWIkqW2kVxhYG+dw6hmOU12ipiwqoRcV2N9sNOmaEdJaoqeqaODWklcgrbYpnhTP2GTo5yehUw5Yo28z6iFW0JnmKORk3A4PWqPvcqlgltRdJSblZNlJztqirLKpm1ccI+TjYyNYy04aI63wJpxanmhqo5qY1xUTmuLtLaCX3aUuLiPakY+aGt2lbKrYkR+rcbCnGErOXB4iK23nFY5cqvXyJFPHTdldpq0qptvNV2f2c6MTBw7Z4GlqZaQejlanNXFhj0hVHyXqpuLjno6WZrTw4IwJWaQrayIcYF5QGGe1b14Jzt5o8Cnd157aEF1qNK3ciNFgKnKr3BafGJCeq/XsWYfTIKrx6ZmVX1mUH601adVG1WKucSUUkxvY2uUwc6WQytpmci1ZkJWV16MstO9gTE5earRrVs5QlFqmrrRsXQrQoC+2JhRKi9ckLjOu4lBHFqX0suKSB00b6LJ26dsLydkotbMjkoZQIG43sR+RB9Af7rfvoJHG0+OxOKxZDMlVIzF469wMSVqnNHXkUY2N2SXy+Sray48f7TXsF8pOVuCqdXTm2EnSorB0JI/IUd5nrXGtHs9MW+dybBrKTBsmqrBtIJZMFCEtMqVQSJJhay9w5BWNUd/r86mXSIzbqW2w612PTFqnMy5eC4oWZO7wK+LWixQh7vSnlUiSIS4z7iBWjhHe6XUvXo3NG6hz8uOVEJDaZXG0ZNYLk+MwtWhWTE+Z5S2zaZqOjx8s96xbissX5e4v6xvQzBclMTVm1UhS4W3yadpNTBTibXeuHUvOHOj0bhzMydFe6XX15RPJVWLx9ORRx4pYpfI465oJTx7tN2yZCogSoiz48uIPCJil8/VlEsiL2qYzeSraCc+erPfr2k6IEuEs+DDgj8pZ5nLvntKLj5znMLcqmgqSYi7yo9LLER7orHKtHk5OXWnypxZLD9xqLyyoIBPN2CTwqdrOjVmoMu8k3JKRWyVvKl1Szdgl8vMmG5JSHSbv7F2UTVVjsfYoWVDQXOewb9/UzZGe7Ldsm0+PWqZwMB+VEJAdKfav39HM2GVvcKJTUFHeJ3PyIdHNGOVsb6aSjlSd5W+0JxPLl+Xq66VUzNTfJSzy59bMVeTtql9RjpXgqGwxZ9fNFKErrOJRjJYiKu4wplYOFiFrLKKTzVUg6e7wp9dMlyKqLCEQD1ghKrBwZ9jMFeMtK10KThujrzTro1qMleLt7F5KyRml73huX1ZK12Rvbh9Mh9WmbvdyYZVK0yMt8GVPxxEirja2pVYLkaEtMSeRiA/eKvR36ViMEJ6rcKcQiJKeabO3qtjMUJ2n7qZPh5ZiajQ1qhnOT1niaqaRyVWiLTUx5plVIOtmXcyKFyNvczBlWBJW4SwpHwqH2KSwNzOmVNCZIq2qXEgI2eTw97Hk1NEaJS1nlsTL3GXx+O9hUxJb5ywikMWOHahx9q1eU1Xf6Wtey0RPXmi0N+wbDhgjr29fSYQRX2n0+CoZjJZi77FhCsRPHSiy+CqbTpWi73DgSYYPXGoydysaztgkcC7cR8oS3uqz9mkZDxklsKyYCEwSHeoy9KmakVon76gRy1KT3ikysSXXUtzrbuCKjpoZXyiybyNV1CAurFlHkBzgJe1wZ9yV2WQuKFVKE97rce3m3JGVH+sv5VCIEx4rc/CoWw0THuvxpY8GEt4rNjFmWMtTYG2w4YxIFJ/uN69j1cqVIu7uXQnKl+MyOa3f001Z5O7p1kaQHii1dqnb0hGbpa6n1IjTYCv18ubY0xce6Cuh0QtU4e41sKPTz1sjaiteTAlXpTG17V/PUF8kKunby0tZ57K0apxOkp7j66hajU1aqDJzqluQVF0iaecdU1AbqLGyqdkRmV1kKGKaztFhbHDwJVXXHBwkI57ZEhgmbm7sIRYc3VvhHRzY1F2q7+uonJfgXh8c2ZqV2KHr8CykWJkdXmLcGpaTnGbucC1jmpxa3KCcW1ERnqZr7qohXxtZHNrhYdVWYSltreXhH1wYVFThIJcYn6mvLOnnHlsYzpYhnVxenyQpaiuoXp6VS5hhX6Min58j63CqH94Oytneomjk3Fvlr7KpodgJDxrfJSehmBkm8ezjnI+JkNoiqCdeVRvsdLAl1wuNlR6maWkak2Mxta8gzsyTG2VpqGRVFyjzM6tXCtBW36gnZJ3SXKwzsOLOTNLY4+nkoNfTYO3z710NUhXbJOahG9VbZ3Bx6JRP11kfJSIcV5kjrrJr3VJW3F7h4RrXGeGrcy2glZVd4+IinNOUnuaw8iXX09plpyJfE9Aao2tyKpwVmGBpZd/WTZXh6DBsnxXZH+pq4VfNT90l7q9hEpbe5/EpG4/MVeCrsihVj9sjr3Bik4sSnqhwrF0QleEqMerbzo1Y5C2wI9LR3CcwMKNTzRRgLHAmltBW421w59jN0ZzobyiaUxWfqe1qoBNQGSNrqhxUWB2nq+ihlZJZoynoWxHZH+guJh8XU5ni6ejcERgf5i+p3RRVHWYraR0QVp6kLu4hFFIbp+8o3xFRWqFrMGYX0Vjkbqxhk1AYn6dv6ZuRFiKuruRVT9ZcZC2r4lUSnuvv51aOVpygqytimRKb6m9pmUzWH6CmqyOa1Fqor+qczpRg4qRopFuUGidwrFyOVaNkYuWiWxOY5fAtnpBUoSimId4Yk5mmLuzh0dLe6Ohf2hfVGuXuLyVVU16oqSBYFRWb5azt5deUXehsIVZSUpsnLa0llxRdaK7jVVAQ2eZtLWeY09yo8ObWTlBY5OvsJ5qVWuUwrJwOjZdjrCwmlxOcZDDwH09MFyNsriaVE1zj7/JkUosVoivt5RSSG+QvMiaUi5birK3jUREboiyx6NaLV+Rt7R4NUp0ia+/oFs1Z5m6qGwzS3eNp7GdXzZrnLmoay9GepOjqJxmPGycu611OEd4l6OflG1FaZm9snQ2TYKenpCLZEt7pMOtaTlYiauZe39aTYSqy69rOlSAr6hzaVdRg6rMr2w5UoGvqXpeQFKHrs6vaTpPeKuwg1s7UoKrzrNyP0hvnLGUZz5JeqHLvYBJSGyUqpdqREx2n8i9hlZRbJWijGpQWHecx7x/VWB1lpyBWklqf5zGvYFRZ4SXlXpSQGuJo8S0eVJxkJCReUdGb4ypwq1vSnCQkJeAQTxpi67IsHBHa5GOl4RDO2KGssSobEpvjImShE4+W4GyxKtuTXqNg414TkldgrLDsX9TeZOCi29KUGOGtsOne2R/joWMYkpTYo69vZ2BbneJjYpcQlBmkr63lYNtc4uViWJHUGiWwbGNhXJqhZOGaU9OZ5XGsI+LaWWGkIRxS0hnmL6pm5dnWX6Uh3lORWKTuKGdpW1TepmEb09LZpm5lJujalp4lpNpRFBxpbKKop1jXXWUnm5DUG6jq5CllldefpugcUpUb5+on6+BQl9+k6iIUU5qmKOit4hHUXiQqZNbUWaHmKe5ik5Mb4ylmGlbZ36LqbuOUkptgZ2edWVpeI+yrIdhVGVzl6N+bmtzk7OffmZfY26TmoZ6bnGXr5BvaGlgb5CYjoFobqGphGtlZF1+n5uQf2BxqJ+CbWlbVousopN5WHWploV0b0xVkbaulG1OfaWJi4pvOleRtLSXYEqAm4+LlGYyXZm3sJNXTIeZjoaXWixmmLCwk1VUi5aIiphNMm6XtLOJTl2HlYqWkUU7dpy4toZXVnSUkp98NUuFqcKxgFlObpejn14xXI+2xqFxW1FykaqSRjpxo8O8imZSV3yYrHo9SYGwwbCDXlFnhqSbZEJXiLTDp3VWW3mSpH5KSmiStL6neE9gg5yfYkBScqG0uaN0UGSDo5JLP2CHo6+3o3ZYYoSodDVQdZioqLCXaldplphOO2eJraihn4loXXCXhERMdZmvnZGRiHFrf45eQmaIrrGRhoSAe3yLbT1Gc5a3roh8hoOEj4lXMUp3nbqpgHmLiIuReksxVYCmu5h3iZSJmY5fQD1jiqu1jXWQmJmfdUY/VniXqJ+Bg5yko41TN09qiJaeh3SRqq+ZdEE4YHmLlY9qeaC1q4hcOkdwg4mMfGeFrr2kdE1DW3yIioJobpa4u5NfSVR0ho+NdWF7ocCzfFRWaX6KkH5ncIqnvqBoUGeDhIaEZ2uIlrGyglVcgpOEemZYfpOes5pjVXSUmoJqUV2Km6WogVFeh52XfVZJcJWippVkUXeamoptS1qIo6GYeVVkkaaTelRLeJ2on4hdVX+mooZmSl+MqKmWcFBol6yXdFFQeZ2upIZYUXylrY9gR16Kqaycckpfkq6mgk5Fb560podXS3qmsJllPVWFrrKaa0ddlK+qhUY+baO4poBWSnWjs6JmN1KNuLOPW0Zll6+teTlIgK+4m2JFZJSqrINDQXKmt6B3SFaNr6uMUTVbkLexkFRDfay5m2U5RHiquJ9tQmaetat7SD5hk7erf09YlLKskFpAUX+ls5lnUHqxrpltRUhtk6qofFNrqricdUlBY46hqo9ZXJ3FpHZKQVaCnq2YW1OMxLWBUEVTbpCspG1Nd7HDkVtKXGt9mqmHV2mgw6VmSFxwdoyhj2VmlLyzekxRbnyGlpBxZ4u2uIhSTWt+g4mQdWSFrLiXXUVlhIWGi3phe6S6pW1EWH6JhIh/YG+ftat/TFh+goKIh2FkmbariFZVfYJ/hIRnYJCzqoxfVX6DeYmFZV6Jsq2MY1Z0hXiFimldibWxjGdXaYB9hItwWoS0tpJmUWuDeX6Sf1d6tLqVbE9pfnaCkohaaqfBn3hYYH5xeZGVX1eUv6SHZGCIcWKEn3VQfbSni2xokXVTdpyJW2ympH10d5WDUmSVl2tun6Nya4OVjFtZgZx9cpeodVuAl5FnWnGYinmSqn5ZdZuUbFdqlZB5hqKHYmOQnn5aWYeij3yZjlxajqaKX014oZuEiYZrYH+dkXVVZ5Oilol+b2h9k4p+Z2GAnqOPeG5rfpOCd3FmeZmolXpva3uRf3BubHyXqJh4bm94ioBwb25+mKqadmlyfIt9a29xe5KooXllc4KRgmlpb3SNqKmEYGiCm49pXWt1i6aril5jf6Gfb1Ric4elrIleYX2lpnRVYHCForCOXVl4oax+VFlrgaG2lGBUa5ewj19UZoWstoxaVGiLnZN4XF+ArLeKYFtngZKPgm9neKS6jV5ZZ4GPioF1Z3Scv5tgVWJ6kZeFbWBymb+mZVhYcJKei3NiaZG+sGpZXGeHn5N6YmeJva5vXWViepeaiGhgg72zbFhjZXKKl5lwWoC9tW9bYlhki5yag2Nwrr+EXV1WW4KWnJNubqO1j21eUFqAlpiTgH+PmpKBbE5Te5aYkYKLk4iIjndQTXaTlI5/kp+Feot/UUdyj5GNfJSui3iEflRGbo6PjniPsph+fXJPR22LkY50k7mehH1oS0pti5KOfJGzoot7YUhIaoaVlHuLsqmXhmNHRmWDlJV8iaymnI9jQkxuhZGOeYirpaCWZkRQc4yUf2uIqaWlk19BVnmPlXhih6iorpRePVB3j5h1XX2jrLKXXjpOd5Gcd11/oai1nFo0UHqQnHdhf56nuZxZNlN7kqFyYX+dsbiQVTlYgJSecV6BorKzi088Y4ebnWhWhKK0soRRQ2SIoZlhVoOhuq6AT0JohJ+aXF2Gm7mqeVFFcISXll1mkZy2l2xVUniKjoFZeKWeq45gTl2ImIhvWX6vrql7SEppkJ6XZlF7s7ypaj1McJinmmlOc67ApWM4T3ybqptrTnOqv6JfPFN8m6mWbFR1pbyfY0FSfZynj2padaG5nmI/VIGfpoZiXH6nuJRdRVqDoqV9WmOLq7KOWkJah6alelpnkLOzg05BYIikpXxZaZe6rndHQmWKqKB0XHGev6hqP0hzj6eTamB7osGlZD9Me5enjFxfiK3Fl1lDVoKao3xRa5axvolTQ2KPo5loS3WhurJzTEtrk6STXEl8p7mrdE1HaJOpll5Ieqe6qG9ISW6Uq5VZUIOvvplgSlV5mqiIVVqNsrmRYVBdfJqjf1Rkka2zkGVVYH6YnnpVa5Oqq4dnW2WAkpN0WnOVp6GDa11nhJeQbVt7namYeWRfbImYiGRfhqWmkHJjY3SOloJjZoymoINrZWp4jpR8Y3CVqJd6ampwgJCQeGZ4mKKPdGltdYSOinRqf5mdinNscXqGjYFwb4WbmYFxbnWAiYh8bnSKnJZ+cG53hYyId217kJyQd3BwdoaMhXRvgpOWhnRzc3yGiIF2eIiQi3x1dXh+hYV9eYGLjYR3dXp+goOAfH2FjYt+cnR9hIN+e3uBio+IenF3goiDeXJ5h46PhHh0eISOhHJsfI2RjoN2c3aFkYduZn+XlY13cHh5h5GAZmqMm5KEcHF5fIyNeWZxkZyPfGx1fH+NjHRkeZeYindsfH+CjYZtaoSXkIJzdIGAhoyBbXCKlYl8cHeGhIeJe2l0j5SGdm5/iYWJhXNpe5OQf3VzgoiGin9ubYKTi31ydIaLhod9bXKIk4d1cHiIiYaHd218jpB/cXJ/ioiGhHZxgo+Lem9zgo6JhoFxdIiQh3VrdomPiIV9cHmLjoJxbXyKjYeEe3N/iol+c3N+iYqEgXh4hImEe3R5gYiHg394fIiIgHd0fISIhYF9eICLhnx0d4GGh4OAfHqEjIN6dXqDh4aBf3x9hYmCenZ8hIaEgH99f4aGgHp5foWGgX9/f4GDgX57e4CEg4B+fn+BgoB9e32BgoJ/fn5+gICAfXx+gYKCgH9/gIGAgH5/gIGBgYCBgIGAgICAgIGBgYGBgYGBgYCAgICAgIGBgYGBgICAgIGBgICAgIGBgYB/f4CAgIB/f4CAgYB/f3+AgICAgH9/f4CAf35+f4CAgH9/fn+AgIB/f39/gIB/f39/gICAgICAgICAgICAgICAgICAgICAgIB/f3+AgICAgICAgIB/f39/f39/f35/f39/fn5+fn9/fn5+fn5/f39+fn5+f39+fn5/f39/f39/f39/f39/f3+AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA%3D%3D" type="audio/wav" />\
					Your browser does not support the audio element.\
				</audio>';
			setTimeout(function() {newWin.close();}, 5000);
		}

		function sendEmail(content) {
			if (typeof (newWin) == 'undefined' || newWin == null) {
				var newWin = window.open('', 'EmailerWindow');
			}
			var form = crEl({n: 'form', a: {'@action': sets.emailURL, '@method': 'post', '@target': '_self', '@type': 'hidden',}, c: [
					{n: 'input', a: {'@type': 'text', '@name': 'name', '@value': 'Galaxy Alert',},},
					{n: 'input', a: {'@type': 'text', '@name': 'email', '@value': sets.email,},},
					{n: 'input', a: {'@type': 'text', '@name': 'comments', '@value': content,},},
				],
			}, newWin.document.body);
			crEl({n: 'input', a: {'@type': 'submit', '@value': 'send',},}, form).click();
			
			setTimeout(function() {newWin.close();}, 5000);
		}
	},
	resources: function(d) {
		var sets = settings.pages.resources;
	
		var table = $$('/html/body/center/table[2]')[0];
		
		var match;
		
		var metals			= $$('.//tr[3]/th', table);
		var metalRates		= new Array();
		for (var i = 1, len = metals.length;		i < len; i++) {
			match = metals[i]		.innerHTML.match(sets.resRegExp);
			if (match != null) {
				metalRates		.push(Number(removeDots(match[1])));
			}
		}

		var crystals		= $$('.//tr[4]/th', table);
		var crystalRates	= new Array();
		for (var i = 1, len = crystals.length;		i < len; i++) {
			match = crystals[i]		.innerHTML.match(sets.resRegExp);
			if (match != null) {
				crystalRates	.push(Number(removeDots(match[1])));
			}
		}

		var deuteriums		= $$('.//tr[5]/th', table);
		var deuteriumRates	= new Array();
		for (var i = 1, len = deuteriums.length;	i < len; i++) {
			match = deuteriums[i]	.innerHTML.match(sets.resRegExp);
			if (match != null) {
				deuteriumRates	.push(Number(removeDots(match[1])));
			}
		}

		var uniRates = new Array();

		var amOfCols = metals.length - 1;
		for (var i = 0; i < amOfCols; i++) {
			uniRates[i] = ultraRound((metalRates[i] / 4 + crystalRates[i] / 2 + deuteriumRates[i]) / 1000, 1);
		}

		var s = '<th>Сводно</th>';
		for (var i = 0; i < amOfCols; i++) {
			s += '<th><font color="orange">' + uniRates[i] + '</font></th>';
		}

		table.insertRow(2);
		table.rows[2].innerHTML = s;
	},

	main: function(d) {
		var URL = d.URL;
		var pages = settings.pages;
		
		for (var key in pages) {
			var page = pages[key];
			if (page.regExpURL.test(URL)) {
				page.func(d);
			}
		}
	},
	load: function(e) {
		var self = this;
		
		window.removeEventListener('load', self.load, true);
		window.addEventListener('unload', self.unload, true);
		
		this.main(e.target);
	},
	unload: function() {
		var self = this;
		
		window.removeEventListener('unload', self.unload, true);
	},
};

var settings = {
	pages: {
		colorer: {
			regExpURL: /.+\/.+\.php/,
			func: galaxy.colorer,
			regExpCoord: new RegExp('(\\d:\\d{1,3}):\\d{1,2}'),
			colors: [
				'Yellow', 'Violet', 'Turquoise', 'Tomato', 'SpringGreen',
				'SkyBlue', 'SandyBrown', 'Red', 'Plum', 'Peru',
				'Orchid', 'Orange', 'Olive', 'Magenta', 'Lime',
				'LightSteelBlue', 'LightSeaGreen', 'GreenYellow', 'DarkTurquoise', 'YellowGreen',
			],
		},
		imperium: {
			regExpURL: /.+\/imperium\.php/,
			func: galaxy.imperium,
			regExpCoord:	new RegExp('(\\d:\\d{1,3}):\\d{1,2}'),
			regExpRes:		new RegExp('>(.+)<\\/a> \\/ (.+)'),
			regExpUnit:		new RegExp('>(\\d+)<'),
			units: {
				MT	:	new UnitImperium(50),
				BT	:	new UnitImperium(51),
				LI	:	new UnitImperium(52),
				TI	:	new UnitImperium(53),
				Kr	:	new UnitImperium(54),
				Lin	:	new UnitImperium(55),
				Lin	:	new UnitImperium(56),
				Per	:	new UnitImperium(57),
				SHZ	:	new UnitImperium(58),
				Bom	:	new UnitImperium(59),
				SS	:	new UnitImperium(60),
				Uni	:	new UnitImperium(61),
				ZS	:	new UnitImperium(62),
				LK	:	new UnitImperium(63),
				SNZ	:	new UnitImperium(64),
				Gig	:	new UnitImperium(65),
				
				Pl	:	new UnitImperium(67),
				Gau	:	new UnitImperium(68),
				Ion	:	new UnitImperium(69),
				TL	:	new UnitImperium(70),
				LL	:	new UnitImperium(71),
				RU	:	new UnitImperium(72),
			},
		},
		leftMenu: {
			regExpURL: /.+\/leftmenu\.php/,
			func: galaxy.leftMenu,
		},		
		marchand: {
			regExpURL: /.+\/marchand\.php/,
			func: function(d) {setTimeout(galaxy.marchand, 1000, d);},
			units: {
				ships: {
					ZS	:	new UnitMarchand('Звезда смерти'      , 4250000, 5000000, 4000000, 1000000),
					SNZ	:	new UnitMarchand('Сверхновая звезда'  , 2125000, 2500000, 2000000,  500000),
					Gig	:	new UnitMarchand('Гигант'             ,  125000,  200000,  100000,   25000),
					Uni	:	new UnitMarchand('Уничтожитель'       ,   55000,   60000,   50000,	 15000),
					LK	:	new UnitMarchand('Линейный крейсер'   ,   42500,   30000,   40000,	 15000),
					Bom	:	new UnitMarchand('Бомбардировщик'     ,   40000,   50000,   25000,	 15000),
					Lin	:	new UnitMarchand('Линкор'             ,   18750,   45000,   15000,	     0),
					Kr	:	new UnitMarchand('Крейсер'            ,   10500,   20000,    7000,    2000),
					Per	:	new UnitMarchand('Переработчик'       ,    7500,   10000,    6000,    2000),
					BT	:	new UnitMarchand('Большой транспорт'  ,    4500,    6000,    6000,       0),
					TI	:	new UnitMarchand('Тяжелый истребитель',    3500,    6000,    4000,       0),
					MT	:	new UnitMarchand('Малый транспорт'    ,    1500,    2000,    2000,       0),
					SS	:	new UnitMarchand('Солнечный спутник'  ,    1500,       0,    2000,     500),
					LI	:	new UnitMarchand('Легкий истребитель' ,    1250,    3000,    1000,       0),
					SHZ	:	new UnitMarchand('Шпионский зонд'     ,     500,       0,    1000,       0),
				},
				defense: {
					Pl	:	new UnitMarchand('Плазменное орудие'  ,   67500,   50000,   50000,   30000),
					Gau	:	new UnitMarchand('Пушка Гаусса'       ,   14500,   20000,   15000,    2000),
					MR	:	new UnitMarchand('Межпланетная ракета',   14375,   12500,    2500,   10000),
					Ion	:	new UnitMarchand('Ионное орудие'      ,    3500,    2000,    6000,       0),
					RP	:	new UnitMarchand('Ракета-перехватчик' ,    3000,    8000,    2000,       0),
					TL	:	new UnitMarchand('Тяжелый лазер'      ,    2500,    6000,    2000,       0),
					LL	:	new UnitMarchand('Легкий лазер'       ,     625,    1500,     500,       0),
					RU	:	new UnitMarchand('Ракетная установка' ,     500,    2000,       0,       0),
				},
			},
		},
		overview: {
			regExpURL: /.+\/overview\.php/,
			func: galaxy.overview,
			debug: false,
			quantityOfAlerts: 6,
			emailURL: '',
			email: 'cjkgalax@sms.megafondv.ru',
			yourFleetRegExp: new RegExp('.+ отправлен с (?:планеты|луны) (.+) <a.+>(\\[\\d:\\d{1,3}:\\d{1,2}\\]).+ на (?:планету|луну) (.+) <a.+>(\\[\\d:\\d{1,3}:\\d{1,2}\\]).+'),
			alienFleetRegExp: new RegExp('.+ игрока (.+) <a.+> отправлен с (?:планеты|луны) (.+) <a.+>(\\[\\d:\\d{1,3}:\\d{1,2}\\]).+ на (?:планету|луну) (.+) <a.+>(\\[\\d:\\d{1,3}:\\d{1,2}\\]).+'),
		},
		resources: {
			regExpURL: /.+\/resources\.php/,
			func: galaxy.resources,
			resRegExp: new RegExp('<font color="#00ff00">(.+)</font>'),
		},
	},
};

function UnitImperium(num) {
	this.THs = $$('/html/body/center/center/table/tbody/tr[' + num + ']/th');
	this.sum = 0;
}

function UnitMarchand(name, DEQ, metal, crystal, deuterium) {
	this.name		= name;
	this.DEQ		= DEQ;
	this.metal		= metal;
	this.crystal	= crystal;
	this.deuterium	= deuterium;
}

// function Unit(name, metal, crystal, deuterium, numRow) {
	// this.name = name;
	
	// this.costs = {
		// metal: metal,
		// crystal: crystal,
		// deuterium: deuterium,
	// };
	// costs.DEQ = this.costs.metal / 4 + this.costs.crystal / 2 + this.costs.deuterium;
	
	// this.imperiumTHs = $$('/html/body/center/center/table/tbody/tr[' + numRow + ']/th');
	// this.amount = 0;
// }

function resToRes(res, amount1, amount2, parent) {
	var resFrom = '';
	var resTo1 = '';
	var resTo2 = '';
	if (res == 'm') {
		resFrom = 'metal';
		resTo1 = 'cristal';
		resTo2 = 'deut';
	} else if (res == 'c') {
		resFrom = 'cristal';
		resTo1 = 'metal';
		resTo2 = 'deut';
	} else if (res == 'd') {
		resFrom = 'deuterium';
		resTo1 = 'metal';
		resTo2 = 'cristal';
	}

	var form = crEl({n: 'form', a: {'@action': 'marchand.php', '@method': 'post', '@type': 'hidden',}, c: [
			{n: 'input', a: {'@type': 'hidden', '@name': 'ress', '@value': resFrom,},},
			{n: 'input', a: {'@type': 'text', '@name': resTo1, '@value': amount1,},},
			{n: 'input', a: {'@type': 'text', '@name': resTo2, '@value': amount2,},},
		],
	}, parent);
	crEl({n: 'input', a: {'@type': 'submit', '@value': 'Обменять',},}, form).click();
}

function resToResReturner(amount1, amount2, metal, parent) {
	return function() {
		serialize('BuyResources', [amount1, amount2]);
		serialize('SellingPhase', 2);
		resToRes('m', 0, metal / 4, parent);
	};
}

function removeDots(s) {
	while (s.indexOf('.') != -1) {
		s = s.replace('.', '');
	}
	return s;
}

function toNumber(str) {
	var str2 = str.replace(/\./g, '');
	str2 = str2.replace(/\,/g, '.');
	return Math.round(Number(str2));
}

function ultraRound(n, d) {
	var m = Math.pow(10, d);
	var res_num = Math.round(n * m) / m;
	return res_num;
}

function $$(xpath, root) {
	xpath = xpath
		.replace(/((^|\|)\s*)([^/|\s]+)/g, '$2.//$3')
		.replace(/\.([\w- ]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
		.replace(/#([\w-]+)/g, '[@id="$1"]')
		.replace(/\/\[/g, '/*[');
	str = '(@\\w+|"[^"]*"|\'[^\']*\')';
	xpath = xpath
		.replace(new RegExp(str + '\\s*~=\\s*' + str, 'g'), 'contains($1,$2)')
		.replace(new RegExp(str + '\\s*\\^=\\s*' + str, 'g'), 'starts-with($1,$2)')
		.replace(new RegExp(str + '\\s*\\$=\\s*' + str, 'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
	var got = document.evaluate(xpath, root || document, null, 5, null);
	var result = [];
	while (next = got.iterateNext()) {
		result.push(next);
	}
	return result;
}

function crEl(elObj, parent) {
	var el;
	if (typeof elObj == 'string') {
		el = document.createTextNode(elObj);
	} else {
		el = document.createElement(elObj.n);
		if (elObj.a) {
			attributes = elObj.a;
			for (var key in attributes) {
				if (attributes.hasOwnProperty(key)) {
					if (key.charAt(0) == '@') {
						el.setAttribute(key.substring(1), attributes[key]);
					} else {
						el[key] = attributes[key];
					}
				}
			}
		}
		if (elObj.evl) {
			el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
		}
		if (elObj.c) {
			elObj.c.forEach(function(v, i, a) {crEl(v, el);});
		}
	}
	if (parent) {
		parent.appendChild(el);
	}
	return el;
}

function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
  GM_setValue(name, uneval(val));
}

window.addEventListener('load', function(e) {galaxy.load(e);}, true);