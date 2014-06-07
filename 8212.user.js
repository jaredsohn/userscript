// ==UserScript==
// @name          Cipher's Gmail Beautifier 2.31
// @description   Hides/Shows ads in Gmail, widens email body, removes beta from Gmail logo (disabled by default), & gives buttons a better look.
// @author        Cipher
// @version       2.31
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==



//////////////// fixing buttons looks

var headTag = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';

styleCode="button {border-style:solid; border-width:1px; border-color:#999999; background-color:#FFFFFF; color:#1B1B1B; cursor:pointer; height:20px; -moz-border-radius-topleft:4px; -moz-border-radius-topright:4px; -moz-border-radius-bottomleft:4px; -moz-border-radius-bottomright:4px;}";
styleCode+="button:hover {border-style:outset;}";
styleCode+="button:active {border-style:inset;}";
//for show/hide ads pane button
styleCode+=".showHideButton {color:#003399; font-family:Arial, Helvetica, sans-serif; font-weight:bold; font-size:18px; cursor:pointer; position:absolute; right:0px}";

cssNode.innerHTML=styleCode;

headTag.appendChild(cssNode);





// parsing the showHideAdsPane() function into the head of the page
var scriptNode = document.createElement('script');
scriptNode.type = 'text/javascript';

scriptCode="function showHideAdsPane(){";
scriptCode+="if(document.getElementById('showHideAdsPaneButton').title=='Hide Ads Pane'){";
scriptCode+="document.getElementById('showHideAdsPaneButton').title='Show Ads Pane';";
scriptCode+="document.getElementById('showHideAdsPaneButton').innerHTML='&lt;&lt;';";
scriptCode+="if(document.getElementById('GB_adsPane')!=null) document.getElementById('GB_adsPane').style.display='none';";
scriptCode+="}";
scriptCode+="else{";
scriptCode+="document.getElementById('showHideAdsPaneButton').title='Hide Ads Pane';";
scriptCode+="document.getElementById('showHideAdsPaneButton').innerHTML='&gt;&gt;';";
scriptCode+="if(document.getElementById('GB_adsPane')!=null) document.getElementById('GB_adsPane').style.display='block';";
scriptCode+="}";
scriptCode+="}";

scriptNode.innerHTML=scriptCode;
headTag.appendChild(scriptNode);





//////////////// replacing the beta logo with a normal one.
//////////////// the code is commented by default, remove the comment characters to enable it.


/*	
if(window.parent!=null && window.parent.parent!=null && window.parent.parent.document.getElementById("canvas_frame")!=null)
{
	frmDocument= window.parent.parent.document.getElementById("canvas_frame").contentDocument;


	var gLogo=frmDocument.getElementById("1fbl");
	
	if(gLogo!=null)
		gLogo.style.setProperty("background-image","url(data:image/gif;base64,R0lGODlhjwA7APcAAP7%2B%2FgBste%2Fx8eDg4MMUAkSXzPj5%2BbEQAPP09CetUKOjo%2F39%2FQFzvNzb25OTk%2B3v7i2MyPr7%2FPC4Devr6wFlrMglFejo6M03KOLj4xiCxdpxZs3MzIuymOvj6Qh6wc5IO36gtezl4d5%2BdP3DENTT0yt4q75vZ%2F3TT9NWSv7ijdXQzXix1fn08v3LLObm5ddjV12l0uCGffPq5%2FHQzUqzapGls3HKjP7ZZrm5ulzBe9KyT96sE7DR5ampqb6%2BwJjE4NPg6vXry87S2RZ3tuWhm7GysdmoqjmGt%2FX5%2FB%2BfRoOCgtiSkuzo5oe621iJqeHHc%2FL2%2BcXFxIqJibhBNgBfpue4tv%2FgebGqk%2BTs9PX19dzc3OKZkUZ%2FpPf396PYs8nJydrU0dXV1fz59%2F%2F8%2Bfn5%2BbbN3ProsZmZmZCQkDBzn87IxPnz5KKhoevETc7OzmWYuLq5uePY1%2Bfn562trcXb6eTk5MXKz4WZpnKRpc%2BoL9TLxcjN08zMzPr6%2Bvz8%2FJi1xwBbnb29vczFw%2B%2FWh%2Fb29vDw8Pbw8dDQ0MPDw%2B3t7bCwsLSzs7qmZ%2Bnp6fLy8vv7%2B869iqKttNfW1tm%2BwtTFmsbFxcvDvYeGhum6LBNsqKWlpZiXl%2Brq6tjY2JuamtHR0bOyss3NzdLU2tTr2pubm%2Bbm5qenp%2BLi4pSUlJmYmJ%2Bfn9TU1IGAgLe2ts21cJ6dneXl5cDAwN%2Ff39LS0p2cnPj4%2BOPj4%2Bzs7MHBwRNon5aVlfPz8%2Fr9%2B9rZ2ZaWlv%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAjwA7AAAI%2FwB%2FCRxIsKBBggAMIBDAUAAUAwsOSpxIsaLFixgzasyIhcePFTAKiBQJY0WTH3SwQNnIsqXLlzANGuCxAoIHBgECMNi504OHDBAgFICBckzMo0iTukTCo0AGnEO4OLlTo6oCEE6ODPmZoWuGAjwQKB1LtuwvIDCeBiiBp4cPPWAaDBjQoIEKHzWcDGHgE2eAAmWQADBLuDBGAz8gZPAwxEkRNQ0mIDAQoXJlAwJcgIl0JKdfChT%2BiBlsuLRpgVBqLi5xx1IDAREoLjAgY8ObnDkppCnygPRp0wB8K00d1EOJGnomxL64gMUAEJlAp1EARsBv07xGedk%2BSjjMCE2KD%2F9RoAK2RgBiQhyhMl3Fg%2BXXYyKhwwPIGOEIvNiwkcOLoV8bBLgBgC01pRgDd%2BghgHcY%2FUBBCT2Ux2B8LCHRxEhlsOBbfvvlwAETgw0oIEtAiAQBA074MEFELEVQxh84VDchhRvRMdJQDcAngH420MBBByESOKBGqRVg0xA15OhSczIwgcCMNGrUlIkF2MHCQBzm4COQMU15ohOCWOcSAAtUFiVSJXr1xgZiCbRjDjkk8COUFyGwgpEeBHBHAwac6SdBLPhQwBGOKekmfzTIyeVLNhrJQAlFgPjnpBHUhkMUDTyJZY%2BJzvnSAj%2BIlEEAXKhx5aSUsvCAAAbg12MCitL%2FWRECIdkUgBNg9InqWMH1Kuusr8b6Uol4BoDHACzuGhMAEayxRhDQQsuCYBIBIAAW2EIh3AM2wCqsS17iBEIIyZpVBRHopovuFuxuscS7S8QQgwj0amCvBi%2B8gAIKH%2FT7gK6%2FALCGGSkUbLDBZsiAxEEWwhBSGWIQxK23nrqUmFPiSloYEfJ2LO8WcUwgssgWlFyyCy5gYMQFLFdQAQEwExDFBAIBEMQNN1ihs8E6W3HCDUGsVJCdJv4hg28Tw1pxS%2BEdGAAIGhO2hcf0Vj3DyBOYfLILK7f8cswE9ICBQAsEccLZTzwBCSRp43z2CQMsTJAAdxpZQwhId6v0oiyN%2F9G0WuP%2BCtMWVRd%2BbxUNMfTA4g90fYHLYMOswAADufCEK1dcUQQOnBcBydstPIGFcHSbWIMLeVPM90YL1OT0G8gaRnjV99a%2BhSEG5K57FV5%2FDfYBk2MJhg92NGBBQxYIQckJLbTQhgpyu1k3BHenvrfgBy3QBFCLBXBEA%2BWWtUTtRNSe7wsiyEAQEb3DTMQHBBwQf%2FACRbAQAvAJhEQDbTTfAiUPmNv0TucbAcTpei%2F5gVfyVAI7RKww47vXDGSAr3zta18zEEgMvAazChAhAvCTH%2FAoN5DgSEQAg2jeCJ6AgWQJAAZBoR7eBmJA1WHvIGVYIE7%2B8J%2FCxKCCL8igDP9EcMF%2B9asKIngc5AhQgRlEwAAfEOEIKRKcykAhhS0YgQ4M9YsXBiUDgaPhAb%2FVEiAsZjE4eYMMwoeRBbjxjXBEArVicL4gCoQFMTDiB1imRN9dYAa5Q0AURUi%2FgjQnCASzwg2YN4JG6kAUABNAAfoSRjeNcWkskSRfbhKAIZDggRmBgkd%2BQEpSNqEJIIEBD4xCxAtmcCAb5KPLlkiAC8ggkIKUYiEFIoYgpGCRKmykMLUohEgWYCdPm6ElbfgSMawgAH3ByQpOdREB8ACGNxqJYry3Bw21kl%2BvrBnvZuk7AqDglghIpwAGOT8SCmQNvwRdIyVAzxHQUwfFpGEBdJL%2FzAJecnWsK0OeeBIACIDvIlD4AQze8AYQOBQEIcHTEHqQqV9oQI%2FhZBYCxhm5F0xgVep8wBR0SUKB%2FdJtbWBE5q7QAx3ME5%2FG5Gclu%2FjPGx7EEPvkiTSpSREDPMAuagiqHnxQq6eUwAe9sWi%2FWPbK2SwkDksopwbAgIGSffQBExjpAbZKPxYUTJFPYKkP9iCKBgDhCS%2FNp5ty2k8xMvMlYygDTgg6hDIYpSJOZUg6xVCi4qyFTQLRAB%2F%2F%2BIu8QnWCF3AfVCchFxdYQGRa5SrlFpDIGzxBAT4YgADwV6ZBpBVgD4CATJVJ07e%2BRAb71Akyj%2BDOjWDAKZwsgQp09QKv%2F83AqQ%2BYhBFk8EQDaGAG6WSCEYxQlwFgwAWRnaJXFXmCK%2FhAAOWKwCDoKQGYDuQBnREXaQWQKATCZAx7GAJukFkAJpTxRDh50GwF8gJyzoAFCBBuFViAS3UKYHGTWAIJipvc4N1skW0oAga8I13qWlcgocXNTB9wwCRgsiUAYMEfcOOZv7iARKPKjWx1hYIlIo5rgFRIOhdyX6xmDaqC2G9%2FkWU25mECBwEsSATaYGC1%2FgK7CibtA7rrYIC2ZAEyAAEFKJyTI9BhI0AQb06osGGBoABsVYjDbkVM4vuObGsqM4IQVmwz%2F42AElgwiBmoW10bY3fIbUUwDZKQgB7bdP8iYwiBkNGMmyE0oU0XAUIJQEMBQKRhvb%2BAX8yWUAVDjFhxJjZZyjCAgblsYAkr%2FoUMsmjPNgABPgAYM5kPfOMjoHnBa27zg18SgRDUIDp0zgkEeCCmiiQZNFTwM6AFDTMjWDlrJ2N0o%2BdSl17XhQSRhsITyNyGIDjLDDeg5w6WvQNOC8DTAaAAqNnsZqUYgAk44AIFqEDkgq6AB1iI3kCQ0JECwBoQstYVrQ9ghEXz2tcNIIG85z3vDdgh0hFoACbILIF9U3cHjGC2s9cDmmmL2sffeYAKQLBnKqRaJ0IpySlBUoAhbJsCuUgDF%2FAQCUOFUH7E9TW95S2gkgcoClH%2FiHQX9ZAHfis7D5pjdh42ANoSAIIKVJh2Eqo9lgUgIARRyMue%2BZwb0OCGz5kowVRqUARLqAAD0BVIFON3ABSY4OpYz7rWt26CrXqdfgvAQhRckQdm7wDmPdjDAJ6gA0YwQgV4RkANuED3SETNAByggd4j9WaMRIAFIVABDmqABydwoQSIT7xU8ECVzakhLkzYbASSNYEo9EABmM%2B85jfP%2Bc5jHgcWGMgCBNCAKBSBpZuzwwAmY4E9EA8DAIsAE1QQBUG8xjcRsMAGal%2FRl5gwYAZhlk9DYBdB%2BIBzOPCBDyyhBhXUxQUTYFUEJmSACex6LtjPvva3z%2F0BWABgAsGM%2FwXmggHJTF%2Bjm21VCRWS%2Fumv%2F3746%2FtBoEQm%2By3ExItLP2XYaJY3Co5MbqQsR9EHWvAJfBAGXeASdXAJXyCADkgRFjAHYTABsNAKaJAILdEHSqAFD9iBBZEFqHAKA%2BEHkuAHAtEHWSAchEAICEEaWaAEsiAQhEAGv%2FAIZPAIHngdcoAGEhEIbCARYfAFX6AJdfALZPAFhwAHilALv8AJbrAItOAGhaAEIsgHoTAHX8AJkmALOfgbAyAFEkEKi3AQnzAHAoEISkAIc8AHAvEKmpAFqtAFu8CAZKAEFoAIiPALsyAFWQB8XWgaX8gGZzAAaFAInfCDtKAJBNEHg3EGef%2F4C12gBHAgBY0gEGHACpXgAAKhCD1Qh3WwCW6wCrPQh3%2FohVLQBYeABooQC4rQgLHACo4gEI7AB6oQCqkwhgLhAKCwgQJhAUrQCUqwCr8wB5IQiXWACnBQihTyhah4Bp1wBlJQCL%2BQBVLABiYoEGjgBpUgBTTYBQ7ACanQA5ZICr%2BgBXDgCWzoCErQCIGgBNIYgMpYGnIgiGcgB79wBskoELewCb7wBQOgBZvQC8PYA7IQCGHwC4ngCbhgjhg4jdXoB4lwCZVABqYgBa3gBjgYjzqIBvYoenUQBlpQCjQoEBNQB6RYg7AgB33wC6WwCCDpAK%2FgB4TgCAsAAI0wAAk1qJHX0QOHcBQA4AAcCIm6II06WZTzhwaBIBCNAAryZ5QOaAGmwAaB4AYn6ZRWeZVYmZWFERAAOw%3D%3D)","important");
		
}
*/	







window.addEventListener('load', function()
{										 
    if (unsafeWindow.gmonkey)
	{
        unsafeWindow.gmonkey.load('1.0', function(gmail)
		{
            
			//removing ads pane by default, creating the show/hide ads pane button
			function manageAds()
			{
                if (gmail.getActiveViewType()=='cv')
				{
                    var rhsDiv = gmail.getConvRhsElement();
                    if (rhsDiv != null)
					{
                        rhsDiv.parentNode.id="GB_adsPane";
						rhsDiv.parentNode.parentNode.firstChild.style.width="100%";
						rhsDiv.parentNode.style.display="none";
						if(rhsDiv.parentNode.parentNode.firstChild.childNodes[1].firstChild.firstChild.lastChild.className=="LV4T4d")
							rhsDiv.parentNode.parentNode.firstChild.childNodes[1].firstChild.firstChild.removeChild(rhsDiv.parentNode.parentNode.firstChild.childNodes[1].firstChild.firstChild.lastChild);
						
						rhsDiv.parentNode.parentNode.firstChild.childNodes[1].firstChild.firstChild.innerHTML+="<span id='showHideAdsPaneButton' class='showHideButton' title='Show Ads Pane' onclick='showHideAdsPane()' onmouseover='this.style.color=\"#FF6600\"' onmouseout='this.style.color=\"#003399\"'>&lt;&lt;</span>";
                    }
                }
            }
			
			
            gmail.registerViewChangeCallback(manageAds);
        });
    }
}, true);