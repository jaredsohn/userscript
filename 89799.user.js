// ==UserScript==
// @name           fakename3gokushi
// @version        3.2.2
// @namespace      http://y3n.net/tag/fakename3gokushi/
// @description    mixi版 ブラウザ三国志の武将の名前を某ゲームのヒロインの名前に置き換えるスクリプトです。
// @include        http://*.3gokushi.jp/*
// @require        http://usocheckup.redirectme.net/89799.js?method=install
// ==/UserScript==

//changelog
//1.0.0: changes busyou names in deck to that of koihime musou
//1.0.1: support for names in files
//1.1.0: support for card backs
//2.0.0: support for supplaments, fixed 賈駆 to 賈詡 and some code cleanup
//2.0.1: support for gousei and busyoudaru history
//2.0.2: fixed 許緒 to 許褚
//3.0.0: support for names in busyou duel reports, syupei reports and some code clean up
//3.1.0: support for names in letters on cards bought and sold
//3.2.0: script auto updater for firefox implementation
//3.2.1: some code cleanup
//3.2.2: bug fix in gousei rireki

	( function(){
		var url = location.href;
		//php file name
		var filename = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
		//create hash map, kanji
		var cardnames = {
			"関羽" : "愛紗",
			"張飛" : "鈴々",
			"公孫瓚" : "白蓮",
			"趙雲" : "星",
			"袁紹" : "麗羽",
			"文醜" : "猪々子",
			"顔良" : "斗詩",
			"曹操" : "華琳",
			"夏侯惇" : "春蘭",
			"馬超" : "翠",
			"荀彧" : "桂花",
			"夏侯淵" : "秋蘭",
			"董卓" : "月",
			"賈詡" : "詠",
			"呂布" : "恋",
			"諸葛亮" : "朱里",
			"許褚" : "季衣",
			"張遼" : "霞",
			"孫尚香" : "小蓮",
			"黄忠" : "紫苑",
			"孫権" : "蓮華",
			"孫策" : "雪蓮",
			"陸遜" : "穏",
			"周瑜" : "冥琳",
			"甘寧" : "思春",
			"劉備" : "桃香",
			"張勲" : "七乃",
			"張角" : "天和",
			"張宝" : "地和",
			"張梁" : "人和",
			"郭嘉" : "稟",
			"程昱" : "風",
			"典韋" : "流琉",
			"袁術" : "美羽",
			"陳宮" : "音々音",
			"于禁" : "沙和",
			"李典" : "真桜",
			"楽進" : "凪",
			"鳳統" : "雛里",
			"馬岱" : "蒲公英",
			"呂蒙" : "亞莎",
			"魏延" : "焔耶",
			"厳顔" : "桔梗",
			"周泰" : "明命",
			"黄蓋" : "祭",
			"孟獲" : "美以",
			"姜維" : "胡花",
			"かんう" : "あいしゃ",
			"ちょうひ" : "りんりん",
			"こうそんさん" : "ぱいれん",
			"ちょううん" : "せい",
			"えんしょう" : "れいは",
			"ぶんしゅう" : "いいしぇ",
			"がんりょう" : "とし",
			"そうそう" : "かりん",
			"かこうとん" : "しゅんらん",
			"ばちょう" : "すい",
			"じゅんいく" : "けいふぁ",
			"かこうえん" : "しゅうらん",
			"とうたく" : "ゆえ",
			"かく" : "えい",
			"りょふ" : "れん",
			"しょかつりょう" : "しゅり",
			"きょちょ" : "きい",
			"ちょうりょう" : "しあ",
			"そんしょうこう" : "しゃおれん",
			"こうちゅう" : "しおん",
			"そんけん" : "れんふぁ",
			"そんさく" : "しぇれん",
			"りくそん" : "のん",
			"しゅうゆ" : "めいりん",
			"かんねい" : "ししゅん",
			"りゅうび" : "とうか",
			"ちょうくん" : "ななの",
			"ちょうかく" : "てんほう",
			"ちょうほう" : "ちーほう",
			"ちょうりょう" : "れんほう",
			"かくか" : "りん",
			"ていいく" : "ふう",
			"てんい" : "るる",
			"えんじゅつ" : "みう",
			"ちんきゅう" : "ねねね",
			"うきん" : "さわ",
			"りてん" : "まおう",
			"がくしん" : "なぎ",
			"ほうとう" : "ひなり",
			"ばたい" : "たんぽぽ",
			"りょもう" : "あーしぇ",
			"ぎえん" : "えんや",
			"げんがん" : "ききょう",
			"しゅうたい" : "みんめい",
			"こうがい" : "さい",
			"もうかく" : "みい",
			"きょうい" : "こはる"
		};
		var cards;
		var front;
		var back1;
		var back2;
		var himeK;
		var himeH;
		var length;
		var i;

		//text to change differs depending on the php file
		front = document.getElementsByClassName("name");
		back1 = document.getElementsByClassName("name1");
		back2 = document.getElementsByClassName("name2");
		length = front.length;
		if(length != 0){
			for(i = 0; i < length; i++){
				//hime kanji
				himeK = cardnames[front[i].innerHTML];
				//hime hiragana
				if(back1[i] != null)
					himeH = cardnames[back2[i].innerHTML];
				else
					himeH = null;
				if(himeK != null)
					front[i].innerHTML = himeK;
				if(himeH != null){
					back1[i].innerHTML = himeK;
					back2[i].innerHTML = himeH;
				}
			}
		}
		
		//file, detail view
		cards = document.getElementsByClassName("statusParameter1");
		length = cards.length;
		if(length != 0){
			for(i = 0; i < length; i++){
				front = cards[i].getElementsByTagName("td");
				himeK = cardnames[front[2].innerHTML];
				if(himeK != null)
					front[2].innerHTML = himeK;
			}
		}
		
		//supplaments, etc.
		front = document.getElementsByClassName("thickbox");
		length = front.length;
		if(length != 0){
			for(i = 0; i < length; i++){
				himeK = cardsnames[front[i].innerHTML];
				if(himeK != null)
					front[i].innerHTML = himeK;
			}
		}
		
		//history
		if(filename == "busyodas_history"){
			//busyoudasu rireki
			front = document.getElementsByClassName("center");
			length = front.length;
			for(i = 0; i < length; i += 6){
				himeK = cardnames[front[i+2].innerHTML];
				if(himeK != null)
					front[i+2].innerHTML = himeK;
			}
		}
		else if(filename == "union_history"){
			//gousei rireki
			front = document.getElementsByClassName("center");
			length = front.length;
			for(i = 0; i < length; i += 6){
				himeK = front[i+3].innerHTML;
				//busyou lvl
				himeH = himeK.substring(himeK.indexOf(" "));
				himeK = cardnames[himeK.substring(0, himeK.indexOf(" "))];
				if(himeK != null)
					front[i+3].innerHTML = himeK + himeH;
			}
		}
		
		//reports
		if(filename == "detail"){
			cards = document.getElementsByClassName("tables")
			length = cards.length;
			if(length == 4 || length == 3){
				//syupei
				cards = cards[1].getElementsByTagName("td");
				length = cards.length - 1;
				himeK = cards[length].innerHTML;
				//find busyou name, himeH as temp var
				himeH = himeK.substring(himeK.indexOf("参戦した武将:") + 7, himeK.indexOf("["));
				himeK = cardnames[himeH];
				if(himeK != null)
					cards[length].innerHTML = cards[length].innerHTML.replace(himeH, himeK);
			}
			else if(length == 6){
				//duel report
				cards = cards[5].getElementsByTagName("td");
				length = cards.length - 1;
				himeK = cards[length].innerHTML;
				//find busyou name, himeH as temp var
				himeH = himeK.substring(himeK.indexOf("デュエルデッキ：") + 8, himeK.indexOf("</p>"));
				himeH = himeH.split("、");
				for(i = 0; i < 5; i++){
					himeH[i] = himeH[i].substring(0, himeH[i].indexOf("("))
					himeK = cardnames[himeH[i]];
					if(himeK != null)
						cards[length].innerHTML = cards[length].innerHTML.replace(himeH[i], himeK);																				
				}
			}
			else{
				//letter from unei
				cards = document.getElementsByClassName("notice");
				if(cards != null){
					cards = document.getElementsByClassName("commonTables");
					cards = cards[0].getElementsByTagName("td");
					himeH = cards[4].innerHTML;
					himeH = himeH.substring(himeH.indexOf("武将名：") + 4, himeH.indexOf("　", himeH.indexOf(":")));
					himeK = cardnames[himeH];
					if(himeK != null)
						cards[4].innerHTML = cards[4].innerHTML.replace(himeH, himeK);
				}
			}
		}
	}) ();
