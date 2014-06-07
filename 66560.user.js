// ==UserScript==
// @name           What.CD :: Post History Catch Up
// @namespace      http://www.what.cd
// @description    Catch up/Mark as read all threads in your post history
// @include        http*://*what.cd/userhistory.php?*action=posts&userid=*
// @version	1.2
// ==/UserScript==

(function() {
	var whatcd_base_url = document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)/)[1];
	var target = document.getElementById('userinfo_username').getElementsByTagName('li');
	var userId = target[0].innerHTML.match(/[0-9]{1,}/);

	function getElementByClassName(theClass) {
		var allTags = document.getElementsByTagName("*");
		for ( i = 0; i < allTags.length; i++ ) {
			if ( allTags[i].className == theClass) {
				return allTags[i];
			}
		}
	} 
	
	function catch_up() {
		var currentPage = 1;
		var lastPage = 1;
		var lastPageExt
		var matches
		var complete = 0
		var total = 0
		
		for ( currentPage = 1; currentPage <= (lastPage + 1); currentPage++ ) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: whatcd_base_url + '/userhistory.php?page=' + currentPage + '&action=posts&userid=' + userId + '&showunread=1&group=1',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {
					if ( responseDetails.status == "200" ) {
						if ( responseDetails.responseText.indexOf("Last &gt;&gt;") > "-1" ) {
							matches = responseDetails.responseText.match(/userhistory\.php\?page\=\d\&amp\;action\=posts\&amp\;userid\=\d{1,}\&amp\;showunread\=1\&amp\;group\=1\"\>\<strong\> Last \&gt\;\&gt\;/gi);
							lastPageExt = matches[0].match(/page\=\d{1,}/gi);
							lastPage = lastPageExt[0].split("=")[1];
						}
						/* matches = responseDetails.responseText.match(/in \<a href\=\"forums\.php\?action\=viewthread\&amp\;threadid\=\d{1,}&amp;page=\d{1,}\#post\d{1,}/gi); */
						matches = responseDetails.responseText.match(/	\<a href\=\"forums\.php\?action\=viewthread\&amp\;threadid\=\d{1,}&amp;page=\d{1,}\#post\d{1,}/gi);
						if ( matches != null ) {
							total = total + matches.length;
							for ( i = 0; i < matches.length; i++ ) {
								matches[i] = matches[i].replace(/amp\;/gi, "");
								/* matches[i] = matches[i].replace("in <a href=\"", "/"); */
								matches[i] = matches[i].replace("	<a href=\"", "/");
								GM_xmlhttpRequest({
									method: 'GET',
									url: whatcd_base_url + matches[i],
									headers: {
										'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
										'Accept': 'application/atom+xml,application/xml,text/xml',
									},
									onload: function(responseDetails) {
										if ( responseDetails.status == "200" ) {
											if ( responseDetails.responseText.indexOf("Last &gt;&gt;") > "-1" ) {
												matches = responseDetails.responseText.match(/forums\.php\?page\=\d{1,}\&amp\;action\=viewthread\&amp\;threadid\=\d{1,}\"\>\<strong\> Last \&gt\;\&gt\;/gi);
												matches[0] = matches[0].replace(/amp\;/gi, "");
												matches[0] = matches[0].replace(/\"\>\<strong\> Last \&gt\;\&gt\;/gi, "");
												GM_xmlhttpRequest({
													method: 'GET',
													url: whatcd_base_url + "/" + matches[0],
													headers: {
														'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
														'Accept': 'application/atom+xml,application/xml,text/xml',
													},
													onload: function(responseDetails) { }
												});
											}
										}
									}
								});
								complete++;
								document.getElementById('catchup').innerHTML = "Catch up (" + complete + " of " + total + " complete)";
							}
						}
					}
				}
			});
		}
	}
	
	if ( (document.URL.indexOf("userhistory.php") > "-1") && (document.URL.indexOf("action=posts") > "-1") && (document.URL.indexOf("userid=" + userId) > "-1") && document.documentElement.innerHTML.match(/id=\"post[0-9]{1,}/gi) && document.documentElement.innerHTML.match(/\<span style\=\"color\: red\;\"\>\(New\!\)\<\/span\>/gi) ) {
		getElementByClassName('linkbox').innerHTML += "&nbsp;&nbsp;&nbsp;<a href=\"#\" id=\"catchup\" onClick=\"catch_up()\">Catch up</a>";
		catch_up_link = document.getElementById('catchup');
		catch_up_link.addEventListener('click', catch_up, false);
	}
	
	/* Script Update Checker from: http://userscripts.org/scripts/show/20145 */
	var SUC_script_num = 66560; // Change this to the number given to the script by userscripts.org (check the address bar)
	try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
	/* Script Update Checker from: http://userscripts.org/scripts/show/20145 */
})();