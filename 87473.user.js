// ==UserScript==
// @name           Fark Wamplifier
// @namespace      Fark
// @include        http://*.fark.com/*
// @include        http://*.totalfark.com/*
// ==/UserScript==

//Replace greenlit examiner.com articles submitted by Wampler with a custom
//image and Fark tag:
if (document.location.href.match(/http:\/\/.*\.f[oa][or][bk].*\.com/)) //fark or foobies
{
   var headlines = document.evaluate('//tr[@class="headlineRow"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var theLink, imgTag, spanTag;
	for (var i = 0; i < headlines.snapshotLength; i++) {
		if (headlines.snapshotItem(i).getElementsByTagName('a').item(0)) {
			theLink = headlines.snapshotItem(i).getElementsByTagName('a').item(0);

                        if (theLink.href.match(/examiner\.com\/comedy/) || theLink.href.match(/examiner\.com\/film/))
                        {
							//alert('wampler');
                            imgTag = theLink.getElementsByTagName('img')[0];
							imgTag.src = "http://oi51.tinypic.com/1roysp.jpg";
							imgTag.title = "Wampler";
							imgTag.alt = "(Wampler}";
							
                            spanTag = headlines.snapshotItem(i).getElementsByTagName('td').item(1).getElementsByTagName('span');
							if (spanTag[0])
							{
								spanTag[0].style.backgroundImage="url('http://i52.tinypic.com/2s18vbp.gif')";
							}
							
							// fark uses an <img> tag for video links, so replace that if Wampler sbmitted a video...
                            imgTag = headlines.snapshotItem(i).getElementsByTagName('td').item(1).getElementsByTagName('img');							
							if (imgTag[0])
							{
								imgTag[0].src="http://i52.tinypic.com/2s18vbp.gif'";
							}
                        }
                }
        }
}