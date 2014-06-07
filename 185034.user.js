// ==UserScript==
// @name        ggfix
// @namespace   slonyashka
// @include     http://goodgame.ru/*
// @updateURL   http://userscripts.org/scripts/source/185034.meta.js 
// @downloadURL https://userscripts.org/scripts/source/185034.user.js
// @version     2.0
// @grant       none
// ==/UserScript==

var enablePekaMode = false;
function init(){
	function initPekaMode(){
		var style = ".smiles.cool {background: url('http://i.imgur.com/4qHvjIt.png') no-repeat top left !important; background-position: 0px 0px !important; width: 30px !important; height: 30px !important;  } .smiles.crazy {background: url('http://i.imgur.com/4qHvjIt.png') no-repeat top left !important; background-position: 0px -40px !important; width: 31px !important; height: 25px !important;  } .smiles.cry {background: url('http://i.imgur.com/4qHvjIt.png') no-repeat top left !important; background-position: 0px -75px !important; width: 30px !important; height: 30px !important;  } .smiles.frown {background: url('http://i.imgur.com/4qHvjIt.png') no-repeat top left !important; background-position: 0px -115px !important; width: 30px !important; height: 30px !important;  } .smiles.grin {background: url('http://i.imgur.com/4qHvjIt.png') no-repeat top left !important; background-position: 0px -155px !important; width: 30px !important; height: 30px !important;  } .smiles.peka {background: url('http://i.imgur.com/4qHvjIt.png') no-repeat top left !important; background-position: 0px -195px !important; width: 30px !important; height: 30px !important;  } .smiles.rage {background: url('http://i.imgur.com/4qHvjIt.png') no-repeat top left !important; background-position: 0px -235px !important; width: 30px !important; height: 30px !important;  } .smiles.shoked {background: url('http://i.imgur.com/4qHvjIt.png') no-repeat top left !important; background-position: 0px -275px !important; width: 30px !important; height: 30px !important;  } .smiles.sick {background: url('http://i.imgur.com/4qHvjIt.png') no-repeat top left !important; background-position: 0px -315px !important; width: 28px !important; height: 30px !important;  } .smiles.smile {background: url('http://i.imgur.com/4qHvjIt.png') no-repeat top left !important; background-position: 0px -355px !important; width: 30px !important; height: 30px !important;  } .smiles.thdwn {background: url('http://i.imgur.com/4qHvjIt.png') no-repeat top left !important; background-position: 0px -395px !important; width: 34px !important; height: 30px !important;  } .smiles.thup {background: url('http://i.imgur.com/4qHvjIt.png') no-repeat top left !important; background-position: 0px -435px !important; width: 38px !important; height: 30px !important;  } #smiles-panel{width:auto !important;}";

		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = style;
		document.head.appendChild(css);
	}
	if(enablePekaMode) initPekaMode();

	function addToStorage(key,item){
		var items = storageGet(key);
		items[item] = 1;
		localStorage[key] = JSON.stringify(items);
	}
	function removeFromStorage(key,item){
		var items = storageGet(key);
		delete items[item];
		localStorage[key] = JSON.stringify(items);
	}
	function storageGet(key){
		var x = localStorage[key];
		if(x) return JSON.parse(x);
		return {};
	}
	var topicsKey = "ggfix-ignored-topics";
	var channelsKey = "ggfix-ignored-channels";

	function tag(name, attrs){
		return $("<" + name + ">", attrs);
	}
	function initIgnoredTopics(){
		var ignoredTopics = storageGet(topicsKey);
		$("#block-forum div.title a").each(function(){
			var id = parseInt(this.id.replace("topic-",""),10);
			var $row = $(this).parents("div.row");
			var link = tag("a", {href:"#", text:" x"});
			link.click(function(e){
				e.preventDefault();
				addToStorage(topicsKey, id);
				$row.fadeOut();
			});
			$("div.info", $row).append(link);
			if(ignoredTopics.hasOwnProperty(id)){
				$row.hide();
			}
		});
	}
	initIgnoredTopics();
	function initIgnoredChannels(){
		var ignoredChannels = storageGet(channelsKey);
		var isChannelPage = document.location.href.indexOf("/channel/") >= 0;
		var isMainPage = document.location.href == "http://goodgame.ru/";
		function getId(url){
			var r = (/channel\/(.*?)\//).exec(url);
			if(r && r.length > 1) return r[1];
			return "";
		}
		if(isMainPage){
			var firstIsIgnored = false;
			var lis = $("#streams-inner-list li:not(.clone) div.streams-list li").filter(function(i){
				var x = $(this).attr("data-link");
				var id = getId(x);
				if(id){ 
					var isIgnored = ignoredChannels.hasOwnProperty(id);
					if(i === 0 && isIgnored){
						firstIsIgnored = true;
					}
					return !isIgnored;
				}
				return false;
			});

			for(var i=0;i<=3;i++){
				var ul = $("div.streams-list:eq("+(i + 1)+") ul");
				ul.empty();
				var ul2 = null;
				if(i===0){
					ul2 = $("div.streams-list:eq(5) ul");
					ul2.empty();
				}
				if(i===3){
					ul2 = $("div.streams-list:eq(0) ul");
					ul2.empty();
				}
				for(var j = 0;j<=7;j++){
					ul.append(lis[i*7+j]);
					if(ul2){
						ul2.append($(lis[i*7+j]).clone());
					}
				}
			}
			if(firstIsIgnored){
				$("#streams-inner-list li:not(.clone) div.streams-list li:first").trigger("click");
			}
		}
		if(isChannelPage){
			var checkBox = tag("input", {type:"checkbox"});
			var channelId = getId(document.location.href);
			var isIgnored = ignoredChannels.hasOwnProperty(channelId);
			checkBox.click(function(){
				if(isIgnored){
					removeFromStorage(channelsKey, channelId);
				}else{
					addToStorage(channelsKey, channelId);
				}
				isIgnored = !isIgnored;
			});
			if(isIgnored){
				checkBox.attr("checked","checked");
			}
			$("#player--tabs").append(tag("li", {title:"Не отображать на главной", text:"Black list "}).append(checkBox));
		}
	}
	initIgnoredChannels();
}
$(init);










