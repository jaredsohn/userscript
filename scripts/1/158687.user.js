// ==UserScript==
// @name           Letterpress Bloknote
// @description    Скрипт добавляет блокнот куда можно записывать найденные слова. Слова хранятся в localStorage. После перезагрузки не потеряются 
// @match http://xn--e1aaavwfbjada.xn--p1ai/game/play/*
// @version 1.02
// ==/UserScript==

(function(){
	function Premoves(){
		var el;
		var premoves;
		var gameNumber;
		var gameStorage;
		var role;

		function setHandler(){
			$('#guestmoves').after('<div id="premovesContainer" class="'+role+'Premoves"><div class="premoves"></div><div class="addPremove"><input id="premovesInput" type="text"> <span class="addPremoveButton">Добавить<span><div><div>');

			el = $('#premovesContainer');
			arrangeEl();
			$('#'+role+'moves').bind("DOMNodeInserted DOMNodeRemoved", function(){
				arrangeEl();
			});

			var data = localStorage[gameStorage];

			if(data === undefined){
				localStorage[gameStorage] = JSON.stringify([]);
			}

			premoves = JSON.parse(localStorage[gameStorage]);

			$(el).find('.addPremove').click(function(){
				addPremove();
			});

			$(el).find('#premovesInput').keypress(function(e){
				if (e.which == 13) {
					$(el).find('.addPremove').click();
				}
			});

			$(el).find('.premove').live("click", function(){
				deletePremove($(this).text());
			});
		}

		function addPremove(){
			text = $(el).find('#premovesInput').val();
			if(text != ""){
				if(jQuery.inArray(text, premoves) == -1){
					premoves.push(text);
					localStorage[gameStorage] = JSON.stringify(premoves);
					getPremoves();
				}
				$(el).find('#premovesInput').val("");
			};
		}

		function getPremoves(){
			prHtml = "";

			premoves.sort(function(a,b){
				return a.length - b.length;
			});

			premoves.reverse();

			for(i = 0; i < premoves.length; i++){
				prHtml += '<span class="premove">'+premoves[i]+'</span> ';
			};
			$(el).find(".premoves").html(prHtml);
		}

		function deletePremove(word){
			Array.prototype.remove = function() {
				var what, a = arguments, L = a.length, ax;
				while (L && this.length) {
					what = a[--L];
					while ((ax = this.indexOf(what)) !== -1) {
						this.splice(ax, 1);
					}
				}
			};

			premoves.remove(word);
			localStorage[gameStorage] = JSON.stringify(premoves);
			getPremoves();
		}

		function arrangeEl(){
			target = $('#'+role+'moves');
			topPos = $(target).position().top + $(target).height() - 60;
			leftPos = (function(){
				var offset = [];
				offset['host'] = 76;
				offset['guest'] =  662;
				return offset[role];
			})();

			el.css('top', topPos+'px');
			el.css('left', leftPos+'px');
		}

		function setRole(){
			role = $('#game').data('role');
			if(role == 'h'){
				role = 'host';
			} else if (role == 'g'){
				role = 'guest';
			};
		}

		function setGameNumber(){
			gameNumber = $('#game').data('id');
			gameStorage = 'premoves'+gameNumber;
		}

		function addStyle(){
			style = 
				"#premovesContainer{\
					display:inline-block;\
					position:absolute;\
					width:240px;\
					font-size:12px;\
				}\
				#premovesContainer.hostPremoves{\
					text-align:right;\
				}\
				#premovesContainer.guestPremoves{\
					text-align:left;\
				}\
				\
				#premovesContainer .addPremove {\
					display:inline-block;\
					margin-top:2px;\
					color:#999;\
				}\
				#premovesContainer .addPremove input{\
					font-size:12px;\
					background:rgba(255,255,255,0.8);\
					border-radius:2px;\
					border:1px solid #ddd;\
					line-height:100%;\
				}\
				#premovesContainer .addPremove .addPremoveButton{\
					border-bottom:1px dashed #999;\
					cursor:pointer;\
				}\
				#premovesContainer .addPremove .addPremoveButton:hover{\
					opacity:0.8;\
				}\
				#premovesContainer .premoves .premove{\
					cursor:crosshair;\
					color:#999;\
					padding: 2px;\
					border-radius: 2px;\
					margin-right:-1px;\
				}\
				#premovesContainer .premoves .premove:hover{\
					opacity:0.8;\
				}\
			";

			var handler = document.createElement('style');
			handler.type = 'text/css';
			if (style.styleSheet){
				handler.styleSheet.cssText = style;
			} else {
				handler.appendChild(document.createTextNode(style));
			}
			handler.innerHtml = style;
			document.getElementsByTagName("head")[0].appendChild(handler);
		}

		setRole();
		setGameNumber();
		addStyle();
		setHandler();
		getPremoves();
	}

	var script = document.createElement("script");
	script.textContent = "(function(){" + Premoves.toString() + " var jhgjhgjljhvljhvljhvljhljfdddddfuckyeah = new Premoves;})()";
	document.body.appendChild(script);

})();