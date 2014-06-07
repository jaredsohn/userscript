// ==UserScript==
// @name           Qidian ads remove
// @namespace      netroby_ads_remove_qidian
// @description    Remove all qidian ads
// @include        http://*.qidian.com/*
// ==/UserScript==
// @author netroby

(function()
 {
	var allI, thisI;
	allI = document.evaluate(
			'//img',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
	if(null != allI)
	{
		for (var i = 0; i < allI.snapshotLength; i++)
        {
			thisI = allI.snapshotItem(i);
			if(null != thisI)
			{
				var ad = new RegExp("http://cj");
				var urlHref = thisI.src;
				if(null != urlHref)
				{
					if(true == ad.test(urlHref))
					{
						thisI.style.display = "none";
					}
				}
			}
		}
	}

	var allI, thisI;
	allI = document.evaluate(
			'//iframe',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
	if(null != allI)
	{
		for (var i = 0; i < allI.snapshotLength; i++)
		{
			thisI = allI.snapshotItem(i);
			if(null != thisI)
			{
				var ad = new RegExp("http://cj");
				var urlHref = thisI.src;
				if(null != urlHref)
				{
					if(true == ad.test(urlHref))
					{
						thisI.style.display = "none";
					}
				}
			}
		}
	}

	var allAds, thisAds;
	allAds = document.evaluate(
			"//div[@class='gg01']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
	if(null != allAds)
	{
		for (var i = 0; i < allAds.snapshotLength; i++) 
		{
			thisAds = allAds.snapshotItem(i);
			if(null != thisAds)
			{
				thisAds.style.display = "none";
			}
		}
	}


	var allAds, thisAds;
	allAds = document.evaluate(
			"//div[@class='gg04']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
	if(null != allAds)
	{
		for (var i = 0; i < allAds.snapshotLength; i++)
		{
			thisAds = allAds.snapshotItem(i);
			if(null != thisAds)
			{
				thisAds.style.display = "none";
			}
		}
	}

	var fad = document.getElementById('fullAD');
	if(null != fad)
	{
		fad.style.display = "none";
	}

	var cadcad = document.getElementById('ad_continer_1');
	if(null != cadcad)
	{
		cadcad.style.display = "none";
	}
 })();
