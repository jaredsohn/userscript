// ==UserScript==
// @name           Make Stamina Pack
// @Author         GuessX
// @version        1.0
// @Note		   Run off unframed MW page
// ==/UserScript==

javascript:(function(){var i=492;if(i){$.post('http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=requests&xw_action=friend_selector&req_controller=freegifts&free_gift_cat=1&free_gift_id='+i,{'sf_xw_user_id':/sf_xw_user_id=([a-z]\|[0-9]+)/.exec(document.body.innerHTML)[1],'sf_xw_sig':local_xw_sig,'ajax':'1','liteload':'1'},function(data){var t=/content="(.+)<fb:req-choice url='(http.+)' label=&quot;(.+)&quot; .>/.exec(data);$.getJSON('http://json-tinyurl.appspot.com/?&callback=?',{url:t[2]},function(data){prompt(t[1],data.tinyurl)});});}})()