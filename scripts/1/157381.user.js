// ==UserScript==
// @name        visitad
// @namespace   visitad
// @include     *://*visitad.com/interface/rate.php
// @require     http://userscripts.org/scripts/source/156923.user.js
// @version     1
// ==/UserScript==


$.each($('html frame'),function(k,v){
    if($(v).attr('src').indexOf('/interface/rate.php?do=top')>=0){
		$(v).load(function(){
			
			var inters = setInterval(function(){
				var sec = $( $(v)[0].contentDocument ).find('#seconds').text();
				console.log(sec)
				if(sec == 0){
					clearInterval(inters);
					a = Math.floor((Math.random()*10))+2

					$( $(v)[0].contentDocument ).find('#rating option:nth-child('+a +')').attr('selected',true);
					$(v)[0].contentWindow.DoSubmit();
				}
			},2000);
		})
    }
})