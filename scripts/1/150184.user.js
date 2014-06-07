// ==UserScript==
// @name        binger
// @author      
// @description Update
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @include     https://www.facebook.com/dialog/feed*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	    http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     https://apps.facebook.com/inthemafia/*
// @include     https://apps.new.facebook.com/inthemafia/*
// @include     https://www.facebook.com/connect/uiserver*
// @exclude     https://mwfb.zynga.com/mwfb/*#*
// @exclude     https://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     https://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	    https://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @version     
// ==/UserScript==

javascript : (function () {
	var fbids={};
	
	var fql = "SELECT uid,name FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1= me())";
	var f = function () {
		var results = [];
		return {
			getResults: function () {
				return results;
			},
			process: function (fbfr) {
		var html ='&nbsp;Copy all links<textarea id="LinksArea" style="width: 400px; height: 250px"></textarea>';
		$('head').append('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/ui-darkness/jquery-ui.css" type="text/css" />');
		$('#popup_fodder').append("<div id='multiopenlinks' style='height:20px;overflow:auto;'>"+html+"<span id='group_msg_result'><br/></span></div>");

		$('#multiopenlinks').dialog({ 
			title: 'Level-up Bonus Links',
                            //+ScriptLikeButton, 
			close: function(){ stopme = true;$('#multiopenlinks').remove();}, 
			buttons: [ 

			{
			text: 'Copy All Links',
			id: 'process',
			click: function(){
                        
                       
                        }
			}], 
			width: 450,
			height: 450,
			position: ['center',100]
		}); 
				
				if (fbfr) {
					total=fbfr.length;
					
					for (i = 0; i < fbfr.length; i++) {
						fbids[fbfr[i].uid]=fbfr[i].name;
					}
					//showSnapshots();
					
					var temp = "";
					var url = "";
					//for (i in fbids) { $('#LinksArea').val( $('#LinksArea').val() + i + '\n'); }
					for (i in fbids) { 
					url = 'http://apps.facebook.com/inthemafia/track.php?next_controller=index&next_action=levelUpBonusClaim&next_params=%7B%22friend_id%22%3A%22$ID%22%7D'.replace('$ID', i);
			
					temp = temp + url + "\n";  
					
					}
	
					$('#LinksArea').val(temp);
					//alert(temp);
					
				} else {
					alert('Unable to retrieve list. Please close and reload the session!');
				}
			}
		};
	}();
	FB.api({
		method: 'fql.query',
		query: fql
	},
	function (response) {
		f.process(response);
	});
	
	
	
})()
