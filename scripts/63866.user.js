// ==UserScript==
// @name           GLADIATUS Harpy's Toolbox
// @version        0.7
// @update         10/12/2009
// @namespace      http://wikiwiki.jp/gladiatus_9z/
// @description    剣闘士ライフを便利にするかもしれないスクリプト集
// @include        http://s1.gladiatus.jp/game/index.php?mod=*
// @exclude        http://s1.gladiatus.jp/game/index.php?mod=signup*
// @exclude        http://s1.gladiatus.jp/game/index.php?mod=login*
// @exclude        http://s1.gladiatus.jp/game/index.php?mod=logout*
// @exclude        http://s1.gladiatus.jp/game/index.php?mod=stuff*
// ==/UserScript==

(function(){

//==(( trueで使用、falseで不使用 ))===================================//
   
	// 常にパッケージへのリンク画像を表示
	PackagesLink(true);
	
	// いもげ剣闘士Wikiへのリンクを表示
	ImgWikiLink(true);
	
	// パッケージ画面にメニューリンクを追加
	PackagesMenuLink(true);
	
	// 表示時間を日本時間に直す
	JapanTime(true);
	
//===================================================================//

//======================== 使用する関数の定義 ========================//
	
	function $(id){
		return document.getElementById(id);
	}
	
	function $C(className){
		return document.getElementsByClassName(className);
	}
	
	function getURLQuery(query){
		return location.search.match(query);
	}
	
	function getURLMyQuery(){
		getURLQuery(/(sh=\w+)\W*/);
		return RegExp.$1;
	}
	
	function xPath(query){
		return document.evaluate(query,
		                         document,
		                         null,
		                         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		                         null);
	}
	
	// ジャンプするページへのアドレスを生成
	function JumpPage(number){
		var query = getURLQuery(/(\S+)(&sh=\w+)/);
		if(query[0].match(/&p=/) == null){
			return 'index.php' + query[1] + '&p=' + (number + 1) + query[2];
		}else{
			return 'index.php' + query[0].replace(/&p=\d+/, '&p=' + (number + 1));
		}
	}
   
   // 曜日を取得
	function getDay(day){
		switch(day){
		   case 1  : return "Mon"; break;
		   case 2  : return "Tue"; break;
		   case 3  : return "Wed"; break;
		   case 4  : return "Thu"; break;
		   case 5  : return "Fri"; break;
		   case 6  : return "Sat"; break;
		   default : return "Sun"; break
		}
	}
	
	function overDigit(number){
		if(number > 9) return String(number);
		else return "0" + String(number);
	}
	
	// Gladiatus用の日付時刻フォーマットに変換
	function getDateString(date){
		var newDate = new Date(date[3] + "/" +
		                       date[2] + "/" +
		                       date[1] + " " +
		                       date[4] + ":" +
		                       date[5] + ":" +
		                       date[6]);
		newDate.setHours(parseInt(date[4]) + 8);
		return getDay(newDate.getDay()) + ", " +
				 overDigit(newDate.getDate()) + "." +
				 overDigit((newDate.getMonth()+1)) + "." +
				 overDigit(newDate.getFullYear()) + " - " +
				 overDigit(newDate.getHours()) + ":" +
				 overDigit(newDate.getMinutes()) + ":" +
				 overDigit(newDate.getSeconds());
	}

//===================================================================//

//========== 常にパッケージへのリンク画像を表示するスクリプト ========//

	function PackagesLink(Enabled){
		if(!Enabled) return;
		var current = $C('packages')[0];
		if(current == null) return;
		if(current.childElementCount == 0){
			current = current.appendChild(document.createElement('a'));
			with(current){
				title = 'パッケージ';
				href = 'index.php?mod=packages&' + getURLMyQuery();
			}
			current = current.appendChild(document.createElement('img'));
			with(current){
				height = 24;
				border = 0;
				width = 24;
				src = 'img/interface/packages.gif';
			}
		}else{
			current = current.children[0].appendChild(document.createElement('div'));
			current.textContent = 'new';
			with(current.style){
					position = 'absolute';
					top = '11px';
					left = '6px';
					color = 'orange';
					textShadow = '0px 0px 3px black';
			}
		}
	}

//====================================================================//

//======== いもげ剣闘士Wikiへのリンクを上部に表示するスクリプト ======//

	function ImgWikiLink(Enabled){
		if(!Enabled) return;
		var current = $('header').appendChild(document.createElement('span'));
		current.className = 'topmenuitem';
		current = current.appendChild(document.createElement('a'));
		with(current){
			textContent = 'いもげ剣闘士Wiki';
			href = 'http://wikiwiki.jp/gladiatus_9z/';
			target = '_blank';
			style.textShadow = '0px 0px 3px black';
		}
	}

//====================================================================//

//========= パッケージ画面にメニューリンクを追加するスクリプト =======//

	function PackagesMenuLink(Enabled){
		if(!Enabled) return;
		if(getURLQuery('packages') == null || $C('title_box')[0] == null) return;
		var insert = xPath('//td[@id="content"]//td[a]').snapshotItem(0);
		var page = insert.textContent.match(/(\d+)\D+(\d+)/);
		insert = insert.appendChild(document.createElement('select'));
		with(insert){
			name = 'MenuLink';
			setAttribute('onChange', 'location.href = this.value');
			options.length = parseInt(page[2]);
		}
		for(var i = 0; i < insert.options.length; i++){
      	insert.options[i] = new Option(String(i + 1), JumpPage(i));
   	}
   	with(insert){
   		selectedIndex = parseInt(page[1]) - 1;
			style.position = 'relative';
			style.left = '10px';
			style.width = '40px'
		}
	}
	
//====================================================================//
//========================= 日本時間に直す関数 =======================//

	function JapanTime(Enabled){
	   if(!Enabled) return;
	   if(getURLQuery(/message..submod=show/) != null){
			var oldDate = xPath('//td[@class="tdn"][position() mod 2 = 1][not(@colspan)]');
			for(var i = 0; i < oldDate.snapshotLength; i++){
				var date = oldDate.snapshotItem(i).textContent.match(/(\w+)/g);
				oldDate.snapshotItem(i).textContent = getDateString(date);
			}
		}else if(getURLQuery('packages') != null && $C('title_box')[0] != null){
			var oldDate = xPath('//td/span');
			for(var i = 0; i < oldDate.snapshotLength; i++){
				var date = oldDate.snapshotItem(i).textContent.match(/(\w+)/g);
				with(oldDate.snapshotItem(i)){
					childNodes[2].replaceWholeText(getDateString(date.slice(0,7)));
					childNodes[7].replaceWholeText(getDateString(date.slice(7,14)));
				}
			}
		}else{ return; }
	}

//====================================================================//

})();