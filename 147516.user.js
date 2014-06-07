// ==UserScript==
// @name            Auto Pokes
// @namespace       Facebook Auto Pokes
// @description      One click to return back Pokes
// @icon            http://www.freeimagehosting.net/newuploads/yeoes.jpg
// @include         http://www.facebook.com/*
// @include         https://www.facebook.com/*
// @exclude         htt*://developers.facebook.com/*
// @exclude         http://www.facebook.com/plugins/*
// @exclude         http://www.facebook.com/dialog/feed*
// @exclude         https://www.facebook.com/plugins/*
// @exclude         https://www.facebook.com/dialog/feed*
// @exclude         http://www.facebook.com/dialog/oauth?*
// @exclude         https://www.facebook.com/dialog/oauth?*
// @exclude         http://www.facebook.com/dialog/apprequests/*
// @exclude         https://www.facebook.com/dialog/apprequests/*
// @exclude         http://www.facebook.com/l.php?u=*
// @exclude         https://www.facebook.com/l.php?*
// @copyright       https://www.facebook.com/mutiarailiya
// @version         Mutiara Iliya
// ==/UserScript==


function fb_ap_lw(){if(typeof Arbiter=="undefined"){window.setTimeout(fb_ap_lw,100)}else{function a(){console.log("Facebook Autopoke Lightweight - Finding Pokes");var a=document.getElementsByClassName("pokesDashboard")[0].getElementsByClassName("uiIconText"),b;console.log(a);for(i in a){if(a.hasOwnProperty(i)){try{a[i].click()}catch(c){try{b=document.createEvent("MouseEvents");b.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);a[i].dispatchEvent(b)}catch(d){if(d.message!="Object 1 has no method 'dispatchEvent'"){console.error(c.message);console.error(d.message)}}}}}}Arbiter.subscribe("channel/message:live_poke",function(){window.setTimeout(a,500)});a();console.log("Facebook Autopoke Lightweight - Successful Load");window.setTimeout(function(){window.location.reload()},6e5)}}function fb_ap_lw_dt(){if(typeof DocumentTitle=="undefined"){window.setTimeout(fb_ap_lw_dt,100)}else{DocumentTitle.set(DocumentTitle.get()+" (Automatic)")}}body=document.body;if(body!=null){var twsis="";div=document.createElement("div");div.style.position="fixed";div.style.bottom="+50px";div.style.left="+12px";div.style.padding="2px";div.innerHTML="<a style=\"font-weight:bold;color:#000000\" target='_blank' href='http://www.facebook.com/pokes/' title='Auto Pokes'><img src='http://s18.postimage.org/otx68vjbp/135065293122861_3523898772.gif' height='50' width='50'></img></a>";div2=document.createElement("div");div2.style.position="fixed";div2.style.bottom="+20px";div2.style.left="+15px";div2.style.padding="2px";div2.innerHTML="<a style=\"font-weight:bold;color:#FFFFFF\" target='_blank' href=\"http://twitter.com/mutiarailiya\"><img src=http://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/592245_278029242253904_673519547_q.jpg height=20 width=20 alt='Like Comment' title='follow @mutiarailiya'</img></a>";div3=document.createElement("div");div3.style.position="fixed";div3.style.bottom="+20px";div3.style.left="+45px";div3.style.padding="2px";div3.innerHTML="<a style=\"font-weight:bold;color:#FFFFFF\" target='_blank' href=\"http://www.facebook.com/mutiarailiya\"><img src=http://fbcdn-photos-a.akamaihd.net/photos-ak-snc7/v85006/195/6628568379/app_1_6628568379_830094696.gif height=20 width=20 alt='Like Comment' title='Like Mutiara Iliya'</img></a>";body.appendChild(div);body.appendChild(div2);body.appendChild(div3)}console.log("Facebook Autopoke Lightweight - Loading");var s=document.createElement("script");s.textContent=String(fb_ap_lw)+"\n"+String(fb_ap_lw_dt)+"\nfb_ap_lw();fb_ap_lw_dt();";document.head.appendChild(s);document.head.removeChild(s)