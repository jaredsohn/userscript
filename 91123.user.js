
// ==UserScript==
// @name           BUX PTC Automatic Add Browser
// @namespace      BUX
// @description    Automatically Browses Ads Of Major Bux Sites

// @include        http*://*/surf.php
// @include        http*://*/viewads.php
// @include        http*://*/?p=surf
// @include        http*://*/browse.php
// @include        http*://*/surfadz.php
// @include        http*://*/index.php?page=surf-ads
// @include        http*://*/surf_ads_think.php
// @include        http*://*/bannersurf.php
// @include        http*://*/index.php?option=surf
// @exclude        http*://*/register.php

// ==/UserScript==

var w = document.createElement('div');
w.setAttribute('style','position:fixed; bottom:0px; right:0px; background-color:#000; font-weight:bold; color:#FFF; display:block; padding:4px;');

var close = document.createElement('span');
close.setAttribute('title', 'Close');
close.setAttribute('style', 'cursor:pointer; margin-left:2px; padding:0px 5px 0px 4px; background-color:#FF0000; display:block; float:right; width:10px;');
close.textContent = '×';
close.addEventListener('click', function(e)
{
	with (e.target)
	{
		if (textContent == "×")
		{
			textContent = "+";
			setAttribute("title", "Open");
			parentNode.childNodes[1].style.display = "none";
		}
		else
		{
			textContent = "×";
			setAttribute("title", "Close");
			parentNode.childNodes[1].style.display = "inline";
		}
	}
}, false);
w.appendChild(close);

var msg = document.createElement('span');
msg.setAttribute('style', 'margin-right:2px;');
w.appendChild(msg);

document.body.appendChild(w);

function surfAds(info, n)
{
	var ad;

	if (ad = info.ads.snapshotItem(n))
	{
		var tmp = ad;
		var postData = '';
		if (ad.tagName=='INPUT')	// gambiarra temporária
		{
			postData = 'ad='+ad.value;
			tmp = document.createElement('a');
			tmp.setAttribute('href', '/view.php?ad='+ad.value);
		}

		tmp.href = tmp.href.replace(/^http:\/\/ucash\.in\/\w+?/i,'');

		var remain = " ("+(info.ads.snapshotLength-n)+")";
		var t = info.time;
		msg.textContent = tmp.href+"... "+t+remain;
		var d = location.href.replace(location.pathname+location.search+location.hash,'');

		var h = {
			'Referer':d+(typeof(info.referer[0])=='function' && info.referer[0](tmp.href) || info.referer[0])
		};

		if (postData)
		{
			h['Content-Type'] = 'application/x-www-form-urlencoded';
		}

		GM_xmlhttpRequest({
			'url':tmp.href,
			'method':( postData ? 'post' : 'get' ),
			'headers':h,
			'data':postData,
			'onload':function(e)
			{
				if (/^2/.test(e.status))
				{
					var secs = setInterval( function()
					{
						msg.textContent = e.finalUrl + "... " + (--t) + remain;
					}, 1000);

					setTimeout(function()
					{
						clearInterval(secs);
						msg.textContent = e.finalUrl + "... 0" + remain;

						var url = info.referer[1](e);
						if (!!url)
						{
							var force_reload = setTimeout(function()
							{
								location.reload();
							}, Math.max(info.time * 500, 10000));

							GM_xmlhttpRequest({
								'url':d+url,
								'method':'get',
								'headers':{
									'Referer':e.finalUrl
								},
								'onload':function(e)
								{
									clearTimeout(force_reload);
									force_reload = null;

									if (/^2/.test(e.status))
										info.callback(ad);

									if (!this.falseNegative)
										surfAds(info, ++n);
								},
								'onerror':function(e)
								{
									clearTimeout(force_reload);
									force_reload = null;

									if (!this.falseNegative)
										surfAds(info, ++n);
								},
								'onreadystatechange':function(e)
								{
									if (e.readyState == 2) // Sent
									{
										clearTimeout(force_reload);
										force_reload = null;

										this.waiting = setTimeout(function(e)
										{
											surfAds(info, ++n);
											this.falseNegative = true;
										}, Math.max(info.time * 500, 10000), e);
									}
									else if (e.readyState == 4) // Received
									{
										clearTimeout(this.waiting);
										this.waiting = null;
										delete this.waiting;
									}
								}
							});
						}
						else if (!this.falseNegative)
						{
							surfAds(info, ++n);
						}
					}, t * 1000);
				}
				else if (!this.falseNegative)
				{
					surfAds(info, ++n);
				}
			},
			'onerror':function(e)
			{
				if (!this.falseNegative)
				{
					surfAds(info, ++n);
				}
			},
			'onreadystatechange':function(e)
			{
				if (e.readyState == 2) // Sent
					this.waiting = setTimeout(function(e)
					{
						surfAds(info, ++n);
						this.falseNegative = true;
					}, Math.max(info.time * 500, 10000), e);
				else if (e.readyState == 4) // Received
				{
					clearTimeout(this.waiting);
					this.waiting = null;
					delete this.waiting;
				}
			}
		});
	}
	else if (n)
	{
		msg.textContent = "Reloading... (0)";
		location.reload();
	}
	else
	{
		msg.textContent = "Done! (0)";
	}
}

switch (document.domain.replace(/^www\d*\./,''))
{
	case 'bux.to':  // tested

		surfAds({
			ads:document.evaluate('//a[contains(@href,"view.php?ad=") and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:['/surf.php',function(e)
			{
				return '/success.php'
			}],
			time:30, 	// 30
			callback:function(ad)
			{
				ad.parentNode.innerHTML = '<font style="font-weight: normal;" color="#660000"><strike>'+ad.innerHTML+'</strike></font>';
			}
		}, 0);
		break;

	case 'paid-bux.info':	// tested
	case 'cashnbux.com':	  // tested	
	case 'monkeybux.com':  // untested
	case 'buxclicks.net':	// untested
	case 'unclebux.com':  // tested
		surfAds({
			ads:document.evaluate('//a[contains(@href,"view.php?ad=") and not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:['/surf.php',function(e)
			{
				var ad = e.finalUrl.match(/ad=(\d+)/)[1];
				var code = e.responseText.match(/var code\s*=\s*"(\w+)";/)[1];

				return '/success.php?ad='+ad+'&code='+code+'&verify=1';
			}],
			time:0, 	// 30
			callback:function(ad)
			{
				ad.parentNode.innerHTML = '<font style="font-weight: normal;" color="#660000"><strike>'+ad.innerHTML+'</strike></font>';
			}
		}, 0);
		break;

	case 'ads2getrefs.com': // untested
	case '10ads.info':	// untested
	case 'stablebux.info':	// untested
	case 'trafficbux.info':	// untested
	case 'beanybux.com':	// untested
	case 'bux3.com':  // tested
	case 'pandabux.com':	// time untested
	case 'world-clix.com':	// time untested
	case 'max-ptc.com':  // tested
		surfAds({
			ads:document.evaluate('//a[contains(@href,"view.php?ad=") and ((not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()) or (img/@src and not(contains(translate(img/@src,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat"))))]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:[function(u)
			{
				if (/stablebux|trafficbux|ads2getrefs/i.test(u))
					return '/index.php?option=surf';
				else if (/beanybux/i.test(u))
					return '/bannersurf.php';
				else if (/10ads/i.test(u))
					return '/index.php/surf.php';
				else
					return '/surf.php';
			},function(e)
			{
				var ad = e.finalUrl.match(/ad=(\d+)/)[1];
				var code = e.responseText.match(/var code\s*=\s*"(\w+)";/)[1];

				return '/success.php?ad='+ad+'&code='+code+'&verify=1';
			}],
			time:0, 	// 30
			callback:function(ad)
			{
				ad.parentNode.innerHTML = '<font style="font-weight:normal;" color="#660000"><strike>'+ad.innerHTML+'</strike></font>';
			}
		}, 0);
		break;
	case 'clickmybux.com':   // untested
	case 'makemybux.com':  // tested
	case 'cashmybux.com':  // tested
		surfAds({
			ads:document.evaluate('//a[contains(@href,"view.php?ad=") and not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:['/surf.php',function(e)
			{
				var ad = e.finalUrl.match(/ad=(\d+)/)[1];
				var code = e.responseText.match(/var code\s*=\s*"(\w+)";/)[1];

				return '/success.php?ad='+ad+'&code='+code+'&verify=1';
			}],
			time:30, 	// 30
			callback:function(ad)
			{
				ad.parentNode.innerHTML = '<font style="font-weight:normal;" color="#660000"><strike>'+ad.innerHTML+'</strike></font>';
			}
		}, 0);
		break;

	case 'casadelclick.info':  // tested
	case 'sakul.cz':	// untested
	case 'alterbux.org':	// untested
	case 'superbux.info':  // tested
		surfAds({
			ads:document.evaluate('//a[contains(@href,"view.php?ad=") and not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:[function(u)
			{
				if (/sakul/i.test(u))
					return '/bux/surf.php';
				else
					return '/surf.php';
			},function(e)
			{
				var ad = e.finalUrl.match(/ad=(\d+)/)[1];
				var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\w+)">/)[1];

				return '/success.php?ad='+ad+'&verify='+verify;
			}],
			time:30, 	// 30
			callback:function(ad)
			{
				ad.parentNode.innerHTML = '<del><font color="blue">'+ad.innerHTML+'</font></del>';
			}
		}, 0);
		break;

	case 'buxup.com':	// time untested
		surfAds({
			ads:document.evaluate('//a[contains(@href,"viewpaid.php?ad=") and not(contains(translate(center/b/text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and center/b/text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:['/viewads.php',function(e)
			{
				var ad = e.finalUrl.match(/ad=(\d+)/)[1];
				var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\w+)">/)[1];

				return '/success.php?ad='+ad+'&verify='+verify;
			}],
			time:30,	// 30
			callback:function(ad)
			{
				ad.parentNode.parentNode.parentNode.parentNode.setAttribute('class','buxuplinks2');
				ad.setAttribute('href','#');
				ad.firstChild.innerHTML = '<del>'+ad.firstChild.innerHTML+'</del>';
			}
		}, 0);
		break;
	case 'buxdotcom.com':	// time untested
		surfAds({
			ads:document.evaluate('//a[contains(@href,"viehw.php?ad=") and not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:['/surf.php',function(e)
			{
				var ad = e.finalUrl.match(/ad=(\d+)/)[1];
				var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\w+)">/)[1];

				return '/success.php?ad='+ad+'&verify='+verify;
			}],
			time:30, 	// 30
			callback:function(ad)
			{
				ad.parentNode.parentNode.innerHTML = '<del>'+ad.innerHTML+'</del>';
			}
		}, 0);
		break;
	case 'isabelmarco.com':  // tested
		surfAds({
			ads:document.evaluate('//a[contains(@href,"?p=view&ad=") and not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:['/?p=surf',function(e)
			{
				var ad = e.finalUrl.match(/ad=(\d+)/)[1];
				var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\w+)">/)[1];

				return '/?p=success&ad='+ad+'&verify='+verify;
			}],
			time:30,	 // 30
			callback:function(ad)
			{
				ad.parentNode.innerHTML = '<del>'+ad.innerHTML+'</del>';
			}
		}, 0);
		break;
	case 'eurovisits.org':	// time untested
		surfAds({
			ads:document.evaluate('//a[contains(@href,"adclick.php?ID=") and not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:['/surfadz.php',function(e)
			{
				return '/'+e.responseText.match(/finished\.php\?ad=\d+&code=\w+/);
			}],
			time:30,	// 30
			callback:function(ad)
			{
				ad.parentNode.innerHTML = '<s>'+ad.innerHTML+'</s>';
			}
		}, 0);
		break;
	case 'osoclick.com':  // tested
		surfAds({
			ads:document.evaluate('//a[contains(@href,"view.php?ad=") and not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:['/surf.php',function(e)
			{
				var ad = e.finalUrl.match(/ad=(\d+)/)[1];
				var code = e.responseText.match(/var code\s*=\s*"(\w+)";/)[1];

				return '/success.php?ad='+ad+'&code='+code+'&verify=1';
			}],
			time:30,	 // 30
			callback:function(ad)
			{
				ad.parentNode.parentNode.innerHTML = '<span style="margin-left: 3px; text-decoration:none; color: #ffffff;"><strike>'+ad.innerHTML+'</strike></span>';
			}
		}, 0);
		break;
	case 'buyas.info':  // tested
		surfAds({
			ads:document.evaluate('//a[contains(@href,"view.php?ad=") and not(contains(@href,"?ad=11421")) and b[not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:['/surf.php',function(e)
			{
				var ad = e.finalUrl.match(/ad=(\d+)/)[1];
				var code = e.responseText.match(/var code\s*=\s*"(\w+)";/)[1];

				return '/success.php?ad='+ad+'&code='+code+'&verify=1';
			}],
			time:21, 	// 21
			callback:function(ad)
			{
				var row = ad.parentNode;
				while (!row.cells)
					row = row.parentNode;
				row.cells[0].innerHTML = row.cells[0].innerHTML.replace('newad.png','oldad.png');

				ad.parentNode.innerHTML = '<font color="#111111">'+ad.firstChild.innerHTML+'</font>';
			}
		}, 0);
		break;
	case 'perfectbux.com':  // tested
		surfAds({
			ads:document.evaluate('//a[contains(@href,"&ad_id=") and not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:['/index.php?page=surf-ads',function(e)
			{
				return e.responseText.match(/success\.location\.href = '(?:https?:\/\/(?:www\d*\.)?perfectbux\.com)?(.+?)';/)[1];
			}],
			time:30, 	// 30
			callback:function(ad)
			{
				ad.parentNode.innerHTML = '<strike>'+ad.innerHTML+'</strike>';
			}
		}, 0);
		break;
	case 'thinkbux.com':  // tested
		surfAds({
			ads:document.evaluate('//form[@action="view.php"]/input[@name="ad"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
			referer:['/surf_ads_think.php',function(e)
			{
				var ad = e.responseText.match(/<input type="hidden" name="id" value="(\d+)">/)[1];
				var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\w+)">/)[1];

				return '/success.php?ad='+ad+'&verify='+verify;
			}],
			time:25,	 // 25
			callback:function(ad)
			{
				ad.form.parentNode.innerHTML = ' &nbsp; <del>'+ad.form.textContent+'</del>';
			}
		}, 0);
		break;
}
