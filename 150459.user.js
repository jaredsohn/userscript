// ==UserScript==
// @name        Menghapus Teman Facebook Dengan Cepat
// @description Cara mudah menghapus teman facebook dengan cepat dan memilih yang ingin di hapus dan tidak ingin di hapus
// @namespace   HapusTemanFacebook
// @include      *://www.facebook.com/*
// @exclude      *://www.facebook.com/ai.php*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @version     12.1.0
// ==/UserScript==

// Developed by Cyber Kazuya | Komputer dan Facebook Tutorial - http://www.kazuya.us


var SUC_script_num = 150411; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
    	
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
	$('div.dialog_body').html('Hooray! ' + x + ' friends deleted. Visit us at <a target="_blank" href="http://www.kazuya.us">http://www.kazuya.us</a> for more useful scripts!');
}





$('.uiToolbarContent .rfloat').prepend ('<div id="darktips_container" style="float:right;margin-left:5px;"><label for="darktips" class="_11b uiButton uiButtonConfirm"><input type="submit" id="mass_deleter" value="Delete  Selected Friends"></label>  <div style="display:block">By <a href="http://www.kazuya.us">http://www.kazuya.us</a></div></div>');
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