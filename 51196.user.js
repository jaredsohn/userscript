// ==UserScript==
// @name           Orkut Linkifier
// @namespace      Ritvik
// @description    Makes link easily clickable on Orkut
// @include        http://www.orkut.com/*
// ==/UserScript==

/*
 * @author Ritvik Sachdev
 */
			var href = spans[i].getAttribute('href');
			if(href == "javascript:void(0);"){
				var click = spans[i].getAttribute('onclick');
					if(click.indexOf("_linkInterstitial('")){
				}else{
						var jk = click.split("_linkInterstitial('");
						var k = jk[1].split("'); return false;");
						var link = k[0];
						alert(link);
						spans[i].href = link;
						spans[i].onclick = "javascript:void(0);";
							
				}
			}