// ==UserScript==
// @name           R8Request
// @namespace      GLB
// @description    Per R8's request
// @author         DDCUnderground
// @include        http://goallineblitz.com/game/home.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
// 


$(document).ready(function(){

	// functions
	var buildobj = function(a){
		var newobj = document.createElement(arguments[0]);
		for (var varval = 1; varval < arguments.length; varval++) {
			newobj.setAttribute(arguments[varval],arguments[varval+1]);
			varval++;
		};
		return newobj;
	};

	function last10process(){
		//get last account within 10
		$('#tab_last10').hide();
		workingwindow=window.open('',"Working", "width=130,height=120,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
		if (!workingwindow.opener) workingwindow.opener = self;
		workingwindow.document.writeln('Working...');
		var last10 = new Array;
		//get last account within 10
		var curuserid = GM_getValue('last10start','383820');
		curuserid = parseInt(curuserid);
		var nextuserid = curuserid + 10;
		var lastuserid = 0;
		var moveon = 1;
		do {
			
				if (moveon == 1) {
					moveon = 0;
					$.ajax({
					 async: false,
					 type: 'GET',
					 url: "http://goallineblitz.com/game/home.pl?user_id=" + nextuserid,
					 success: function(returned_data) {
						var headinfo = $('div[class="big_head"]:first' , returned_data).text();
						
						if (headinfo == "User Profile") {
							var pulluserid = $('img[src*="/game/user_pic.pl?user_id="]:first', returned_data).attr("src");
							pulluserid = pulluserid.substring(pulluserid.indexOf('=')+1,pulluserid.length);
							moveon = 1;
							curuserid = parseInt(pulluserid);
							nextuserid = curuserid + 10;
						}else{
							lastuserid = curuserid;
						}
					}
					})
				}
		} while (lastuserid == 0);
	
		
		
		//get last account
		var moveon = 1;
		nextuserid = lastuserid + 1;
		for (var i=0;i<10;i++) {
			if (moveon == 1) {
				moveon = 0;
				$.ajax({
				 async: false,
				 type: 'GET',
				 url: "http://goallineblitz.com/game/home.pl?user_id=" + nextuserid,
				 success: function(returned_data) {
					var headinfo = $('div[class="big_head"]:first' , returned_data).text();
					
					if (headinfo == "User Profile") {
						var pulluserid = $('img[src*="/game/user_pic.pl?user_id="]:first', returned_data).attr("src");
						pulluserid = pulluserid.substring(pulluserid.indexOf('=')+1,pulluserid.length);
						moveon = 1;
						curuserid = parseInt(pulluserid);
						nextuserid = curuserid + 1;
					}else{
						lastuserid = curuserid;
					}
				}
				})
			}
		}	

		GM_setValue('last10start',lastuserid);
		//pull last 10 agent names and links
		for (var i=0;i<10;i++) {
			var newuid = lastuserid - i;
			$.ajax({
				 async: false,
				 type: 'GET',
				 url: "http://goallineblitz.com/game/home.pl?user_id=" + newuid,
				 success: function(returned_data) {
					var headinfo = $('div[class="big_head"]:first' , returned_data).text();
					if (headinfo == "User Profile") {
						var pulluserid = $('img[src*="/game/user_pic.pl?user_id="]:first', returned_data).attr("src");
						pulluserid = pulluserid.substring(pulluserid.indexOf('=')+1,pulluserid.length);
						var username = $('td[class="account_value"]:first',returned_data).text();
						var pushstr = '<a href="http://goallineblitz.com/game/home.pl?user_id=' + pulluserid + '" target="_blank">' + username + '</a>';
						last10.push(pushstr);
						
					}
				}
			})
		}
		workingwindow.close();
		var last10window = window.open('',"Last 10 Created Agents", "width=250,height=360,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");
		if (!last10window.opener) last10window.opener = self;
		last10window.document.writeln('<b><font size = 4>Last 10 Created Agents</font><br><br>');
		for (var i=0;i<last10.length;i++) {
			last10window.document.writeln(last10[i] + '<br>');
		}
	
	}


	var loadlast10 = buildobj('div','id', 'tab_last10','class', 'subtab_off');
    var last10click = buildobj('a','href','javascript:;');
    last10textnode = document.createTextNode('Get New Agents');
    last10click.appendChild(last10textnode);
    
    loadlast10.appendChild(last10click);
    $('div[class="tabs"]').append(loadlast10);
    $('#tab_last10').bind('click', last10process, false);

})
