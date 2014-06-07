// ==UserScript==
// @name           GLB Test Forums To Live Server
// @namespace      GLB
// @version			1.1
// @description   Brings all the test server forums to the live server forums
// @include        http://goallineblitz.com/game/forum_main.pl
// @require        http://userscripts.org/scripts/source/74204.user.js
// ==/UserScript==

var USERNAME = 'Enter a name here';
var PASSWORD = 'Enter a password here';

function init(){
	gatherTestForumData();
}

function gatherTestForumData(){
	GM_xmlhttpRequest(
	{
	    method: 'GET',
	    url: 'http://test.goallineblitz.com/game/forum_main.pl',
	    headers: 
		{
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml'
	    },
	    onload: function(response)
		{
			// response from other page
			var data = response.responseText;
			
			postGatherData(data);
		},
		onerror: function(response){
			alert('Error connecting to the test server \n\n Error: ' + response.status); // could get here when the server is offline
		}
	});
}

function postGatherData(data){
	if(data.indexOf('/game/login.pl') > 0){
		if(USERNAME == 'Enter a name here' || PASSWORD == 'Enter a password here'){
			alert('Testserver login timed out and you did not provide login credentials to the script');
			return;
		}
		GM_xmlhttpRequest(
		{
			method: 'POST',
			url: 'http://test.goallineblitz.com/game/login.pl',
			data:'user_name=' + USERNAME + '&password=' + PASSWORD + '&action=Submit',
			headers: 
			{
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			onload: function(response)
			{
				var data2 = response.responseText;
				if(data2.indexOf('/game/login.pl') > 0){
					alert('Error attempting to log into the test server'); // should never get here
				}else{
					gatherTestForumData();
				}
			},
			onerror: function(response){
				alert('Error connecting to the test server \n\n Error: ' + response.status); // should never get here
			}
		});
		return;
	}
	
	processData(data);
}

function processData(data){
	var beforeSection;
	var isChecked = GM_getValue('forum_chkBox',0);
	$('DIV#content DIV.medium_head').each(function(){
		if($(this).text().indexOf('Regional Forums') >= 0){
			beforeSection = this;
		}
	});

	var holder = '<div class="medium_head">Test Server Forums<div style="background-color:#EEEEEE;float:right;padding:3px;border:1px solid lightgray;color:black;font-size:7pt;"><input type="checkbox" id="gmShowForums" /> Show Team Forums</div></div><table cellspacing="0" cellpadding="0" class="forums" id="gmTestTable"><tr class="nonalternating_color forum_head"><td class="status_head">&nbsp;</td><td class="title_head">Forum</td><td class="last_post_head">Last Post</td><td class="thread_count_head">Threads</td></tr></table>';
	$(beforeSection).before(holder);
	$('TABLE.forums',data).each(function(){
		if(!(isChecked == 0 && $(this).prev().html().indexOf('Private Team Forums') >= 0))
		$('TR.forum',this).each(function(){
			$('TABLE#gmTestTable').append(this);
		});
	});
	
	// figure checkbox
	var chkBox = $('INPUT#gmShowForums');
	if(isChecked == 1){
		$(chkBox).attr('checked',true);
	}
	$(chkBox).click(function(){
		if($(chkBox).attr('checked')){
			GM_setValue('forum_chkBox',1);
		}else{
			GM_setValue('forum_chkBox',0);
		}
		$(beforeSection).prev().remove(); // remove table
		$(beforeSection).prev().remove(); // remove header
		gatherTestForumData();
	});
	
	// fix the links
	$('TABLE#gmTestTable TR.forum TD.title A').each(function(){
		$(this).attr('href','http://test.goallineblitz.com' + $(this).attr('href'));
	});
}


init();