// ==UserScript==
// @name           Mafia Wars Add to Mafia Bookmarklet
// @namespace      MafiaWarsAddToMafia
// @contributor    Rio Lukito
// ==/UserScript==



javascript:function%20get_id_from_game(){try{var%20content=document.getElementById('app10979261223_content_row');var%20as=content.getElementsByTagName('a');for(i=0;i<as.length;i++){if(as[i].innerHTML=='Profile'){match=/[;&]user=(\d+)/.exec(as[i].href);if(match)return%20match[1];}}}catch(err){}try{var%20content=document.getElementById('app_content_16421175101').innerHTML;return/[?;&]opponent_id=(\d+)/.exec(content)[1];}catch(err){}return%20null;}function%20get_id_from_fb(){function%20f(expr){try{return/id=([0-9]+)/.exec(eval(expr))[1];}catch(e){return%20null;}}return%20f("document.getElementById('profileimage').parentNode.innerHTML")||f("document.getElementById('profile_name').parentNode.innerHTML")||null;}var%20id;if(id=get_id_from_game()){location.href='http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=war&xw_action=add&xw_city=1&friend_id='+id;}else%20if(id=get_id_from_fb()){location.href='http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=war&xw_action=add&xw_city=1&friend_id=$ID'.replace('$ID',id);}else{alert('Could%20not%20find%20an%20id!%20You%20need%20to%20be%20on%20a%20profile%20page%20for%20this%20to%20work.');}