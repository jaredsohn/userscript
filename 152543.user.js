// ==UserScript==
// @name       	Getspocklink
// @namespace   Mafiawars
// @description tmp drone hosting
// @version     1.3
// ==/UserScript==

javascript:(function (){
	var rev=/,v \d+\.(\d+)\s201/.exec("$Id: getpromo.js,v 1.3 2012-07-10 14:03:40 eike Exp $")[1],
	version='Get Spock Link v0.'+rev;
	var spocklet='getpromo';
	var shortener_url="http://spockon.me/api.php";
	var mybonusurl;
	
	try {
		mybonusurl=window.localStorage.getItem(spocklet+'_bonuslink_'+User.trackId);
	} catch(e) {}

	
	
	function start(){
		$('#'+spocklet+'_reply').remove();
		$('#popup_fodder').append('<div id="'+spocklet+'_reply"><div id="'+spocklet+'_inner">Click Grab to try and get link made</div></div>');
		$('#'+spocklet+'_reply').dialog({ title: version, buttons: { 
			'Grab':function(){
				grab_bonus();
			},
			'Cancel':function(){
				//clearInterval(intval);
				$('#'+spocklet+'_reply').remove();
			},
		}, width: 500, position: ['center',100]
		} );
	}
	$('head').append('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/ui-darkness/jquery-ui.css" type="text/css" />');
	start();

	function grab_bonus() {
	var whatlinktomake = prompt('insert link to have made');
		//		$('#'+spocklet+'_sh').click(function(){
					var link = ''+whatlinktomake+'';
					shorten(link,function(shortlink){
						$('#'+spocklet+'_sh').html(shortlink).attr('href',shortlink).unbind('click');
						window.localStorage.setItem(spocklet+'_bonuslink_'+User.trackId,shortlink);
					});
				$('#'+spocklet+'_inner').html('Link: <a id="'+spocklet+'_sh">Please Wait...</a>');
		//		});

	};
	
	function shorten(url, handler) {
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			url: shortener_url+'?action=shorturl&format=jsonp&url='+escape(url),
			crossDomain: true,
			success: function (msg){
				handler(msg.shorturl);
			}
		});
	}
	

})()
