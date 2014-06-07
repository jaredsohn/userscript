// ==UserScript==
// @name           Birthdays Menu
// @namespace      http://solitude12.deviantart.com/
// @description    Creates a menu for deviantART, listing today's birthday!
// @include        http://*.deviantart.com/*
// ==/UserScript==


/* 
 * Author: Solitude12
 * Date: May 22, 2010/June 20, 2010/July 24, 2010
 * Version: 0.4
 *
 * Copyright © Solitude12 - http://solitude12.deviantart.com/
 * Please do not redistribute any part of this code without
 * permission of Solitude12.
*/
	
with(unsafeWindow) {
	if (unsafeWindow.deviantART.deviant.loggedIn && !document.getElementById('birthdaysmenu')){		
			
		function getCookie(c_name)
		{
		if (document.cookie.length>0)
		  {
		  c_start=document.cookie.indexOf(c_name + "=");
		  if (c_start!=-1)
			{ 
			c_start=c_start + c_name.length+1; 
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
			} 
		  }
		return "";
		}
		var ui = getCookie('userinfo');
		
		dAUSERNAME = unsafeWindow.deviantART.deviant.username;
		var mylubimg = "data:image/png;base64,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%3D";
			
		var friends = [];
		// Get list of friends 
		GM_xmlhttpRequest({
			method:'POST',
			url:'http://www.deviantart.com/global/difi.php',
			headers:{"Content-type":"application/x-www-form-urlencoded"},
			data:"c[]=Friends;getFriendsMenu;1&t=xml&ui="+ui,
			onload:function(difiresponseDetails){
				var friendsmenu=difiresponseDetails.responseText;
				friendsmenu = friendsmenu.match(/<username>(.*)<\/username>/g);
				for(var i = 0; i<friendsmenu.length; i++){
					friends[friendsmenu[i].replace('<username>','').replace('</username>', '').toLowerCase()]=true;
				}
				friends[dAUSERNAME.toLowerCase()]=true;
								
				
				var BDayalert = 0;
				var birthday_data='';
				var cool_birthday_data='';
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://birthdays.24bps.com/feed/today',
					onload: function(responseDetails) {
						var data = responseDetails.responseText;
						var whosbday = data.split("</author>")[1];
						whosbday = whosbday.split("</entry>");
						for (var i in whosbday){
							var vars = whosbday[i].split("</title>");					
							var first = vars[0].replace(/<\/?[^>]+>/gi, '').replace(/\s|\n/gi, '');
							if(first!="")
								if(friends[first.toLowerCase()]){
									BDayalert++;
									cool_birthday_data+='<a style="font-size:11px;height:18px;line-height:18px;padding-left:24px;display:block;" href="http://'+first.toLowerCase()+'.deviantart.com/" class="mi iconset-more"><i style="margin-top:-4px;margin-left:-5px;" class="i38"></i><b style="color:#FFF;">'+first+'</b></a>';
								} else {
									birthday_data+='<a style="font-size:11px;height:18px;line-height:18px;padding-left:24px;display:block;" href="http://'+first.toLowerCase()+'.deviantart.com/" class="mi iconset-gruser"><i style="margin-top:-4px;margin-left:-5px;" class="i21"></i>'+first+'</a>';			
								}
							
						}		
						
						
						//var birthdaysmenu = document.createElement("span");
						var birthdaysmenu = document.createElement("div");
						birthdaysmenu.setAttribute("class", "oh-ml");
						birthdaysmenu.setAttribute("onmouseover", "oh_m(this,1,0)");
						birthdaysmenu.setAttribute("onmouseout", "oh_m(this,0,0)");
						//birthdaysmenu.innerHTML = '<a class="oh-darker oh-l" style="" href="#top" id="birthdaysmenu" floater="menu" menuri="birthdaymenu" title="Today\'s Birthdays!"><i class="icon i56" style="display:inline-block;width:22px;vertical-align:middle !important;margin:-3px -5px 0px -5px;position:relative !important;background-image:url(http://st.deviantart.net/minish/gruzecontrol/icons-small-modules.gif);"></i> <img src="http://st.deviantart.net/minish/main/radbelow.png" style="" class="oh-mg" height="11" width="11"></a>';
						//birthdaysmenu.innerHTML = '<div class="oh-menu" onmouseover="oh_m(this,1,1)" style="margin-left:-149px !important;" href="#top" onmouseout="oh_m(this,0,1)"><div style="height:250px; overflow:auto;">'+birthday_data+'</div></div></div><a class="oh-l" id="birthdaysmenu" style="color:#909A8C !important;font-size:8.25pt; href="#top" title="Today\'s Birthdays!"><i class="icon i2" style="display:inline-block !important;margin-left:0px !important;vertical-align:middle !important;background-image:url('+mylubimg+');"></i><span style="display:inline-block !important;font-size:9px;margin-left:21px !important;margin-right:-18px !important;margin-top:-10px !important;vertical-align:top !important;line-height:19px !important;" id="friendscountbday"></span><img src="http://st.deviantart.net/minish/main/radbelow.png" style="vertical-align:middle !important;margin-left:18px !important;" class="oh-mg" height="11" width="11"></a>';
						birthdaysmenu.innerHTML = '<div class="oh-menu" onmouseover="oh_m(this,1,1)" style="margin-left:-149px !important;" href="#top" onmouseout="oh_m(this,0,1)"><div style="height:250px; overflow:auto;">'+cool_birthday_data+birthday_data+'</div></div></div><a class="oh-l" id="birthdaysmenu" style="color:#909A8C !important;font-size:8.25pt; href="#top" title="Today\'s Birthdays!"><i class="icon h-icon i2" style="background-image:url('+mylubimg+') !important;"></i><span style="display:inline-block !important;font-size:9px;margin-left:21px !important;margin-right:-20px !important;margin-top:-10px !important;vertical-align:top !important;line-height:19px !important;" id="friendscountbday"></span><img src="http://st.deviantart.net/minish/main/radbelow.png" style="vertical-align:middle !important;margin-left:20px !important;margin-right:-1px;" class="oh-mg" height="11" width="11"></a>';
						//GM_addStyle("#birthdaysmenu:hover .icon,#birthdaysmenu:focus .icon,#birthdaysmenu .active .icon {height:80px;margin-top:-40px;}");
						document.getElementById("overhead-sc").insertBefore(birthdaysmenu, document.getElementById("friendslink").parentNode);	
										
						if(BDayalert>0){					
							document.getElementById("friendscountbday").innerHTML="("+BDayalert+")";
						} else {
							document.getElementById("friendscountbday").style.display="none";
						}
					}
				});
			}
		});
	}	
}