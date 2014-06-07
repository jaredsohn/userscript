// ==UserScript==
// @name          Aktualios LRS dokumentų versijos
// @namespace     http://sokolov.cc/greasemonkey/
// @description   Įspėja, jei peržvelgiama ne pati aktualiausia dokumento versija.
// @include       http://*.lrs.lt/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
	uzuolaida = {
		obj: null,
		objbg: null,
		inited: false,
		init: function(){
			$('<style type="text/css">').text('#uzuolaida {'
				+ 'display:none;'
				+ 'position:fixed;top:0;left:0;right:0;bottom:0;'
				+ 'padding: 25% 20% 5% 20%;'
				+ 'font-size:25px;font-family:Georgia serif;'
				+ 'color:white;background-color:transparent;text-align:center;'
				+ 'z-index:10;'
				+ '} #uzuolaidabg {'
				+ 'position:fixed;top:0;left:0;right:0;bottom:0;'
				+ 'z-index:5;'
				+ 'background-color:black;opacity:0.6;'
				+ '} #uzuolaida .button {'
				+ 'display:inline-block;margin:1em;padding:1ex;'
				+ 'border:1px solid white;'
				+ 'cursor:pointer }').appendTo('head');
			this.obj = $('<div id="uzuolaida"><p class="text"></p><p class="buttons"></p></div>').appendTo('body');
			this.objbg = $('<div id="uzuolaidabg"></div>').appendTo('body');
			var self = this;
			this.obj.add(this.objbg).click(function(){
				if (self.closable)
					self.hide();
			});
		},
		closable: false,
		button: '<div class="button"></div>',
		show: function(){ this.objbg.show(); this.obj.show();},
		hide: function(){ this.obj.hide().children().text(''); this.objbg.hide(); },
		confirm: function(question){
			if (!this.inited) this.init();
			this.obj.children('.text').text(question);
			var effect, label;
			var preparator = function(effect){
				var self = this;
				return function(e){
					if (!effect())
						self.hide();
				}
			}
			for (var i=1;i<arguments.length;i+=2)
			{
				label = arguments[i]
				effect = arguments[i+1]
				$(this.button).text(label).click(preparator.call(this, effect)).appendTo(this.obj.children('.buttons'));
			}
			this.show();
		}
	}

	/*
	var currDate = $('body>table.basic').eq(0).find('tr:first-child').children('td').eq(2).children('b').text();
	currDate = currDate.trim().split('-');
	var date = new Date();
	date.setFullYear(currDate[0])
	date.setMonth(parseInt(currDate[1])-1)
	date.setDate(currDate[2])
	*/

	function actualAvailable(url)
	{
		uzuolaida.confirm('Yra aktualesnių šio dokumento redakcijų.',
			'Peržvelgti',
			function(){
				location.href = url;
				return true;
			},
			'Ignoruoti',
			function(){}
		);
	}

	var aktualios = $('a:contains(Aktualios redakcijos)')[0]
	if (aktualios)
		actualAvailable(aktualios.href);
	else
	{
		$('.ltb').each(function(){
			var t = $(this).text();
			if (t.search('Statusas:') > -1 && t.search('iki') > 0)
				actualAvailable($('a:contains(Susiję dokumentai)')[0].href);
		});
	}
})
