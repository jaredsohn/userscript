// ==UserScript==
// @name			TechnoProxy
// @namespace		http://www.allpeers.com/blog/greasemonkey
// @description		Adds Technorati links to webpages
// @include			http://*
// @exclude			*.google.*
// @exclude			*.bloglines.com*

// ==/UserScript==

// original version by Matthew Gertner
// web service by Stefan Magdalinski

(function() {
	var requestPrefix = "http://wikiproxy.whitelabel.org/technorati.php?url=";
	var technoPrefix = "http://www.technorati.com/cosmos/search.html?url=";
	var technoIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167%2B3t%2B9f7vOec5%2FzOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP%2FwBr28AAgBw1S4kEsfh%2F4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv%2BCpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH%2BOD%2BQ5%2Bbk4eZm52zv9MWi%2FmvwbyI%2BIfHf%2FryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3%2FldM9sJoFoK0Hr5i3k4%2FEAenqFQyDwdHAoLC%2B0lYqG9MOOLPv8z4W%2Fgi372%2FEAe%2Ftt68ABxmkCZrcCjg%2F1xYW52rlKO58sEQjFu9%2Bcj%2FseFf%2F2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R%2BW%2FQmTdw0ArIZPwE62B7XLbMB%2B7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv%2FmPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5%2BASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1%2BTSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q%2B0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw%2BS3FDrFiOJMCaIkUqSUEko1ZT%2FlBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC%2FpdLoJ3YMeRZfQl9Jr6Afp5%2BmD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA%2BYb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV%2Bjvl%2F9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1%2BrTfaetq%2B2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z%2Bo%2B02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y%2FDMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS%2BKc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw%2BlXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r%2B00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle%2B70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l%2Bs7pAz7GPgKfep%2BHvqa%2BIt89viN%2B1n6Zfgf8nvs7%2Bsv9j%2Fi%2F4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww%2BFUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX%2BX0UKSoyqi7qUbRTdHF09yzWrORZ%2B2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY%2BybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP%2BWDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D%2BmiGT0Z1xjMJT1IreZEZkrkj801WRNberM%2FZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c%2FPbFWyFTNGjtFKuUA4WTC%2BoK3hbGFt4uEi9SFrUM99m%2Fur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl%2FVfPV5bdra3kq3yu3rSOuk626s91m%2Fr0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e%2B2Sba1r%2Fdd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q%2F5n7duEd3T8Wej3ulewf2Re%2FranRvbNyvv7%2ByCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9%2BmfHvjUOihzsPcw83fmX%2B39QjrSHkr0jq%2Fdawto22gPaG97%2BiMo50dXh1Hvrf%2Ffu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1%2F3yfPe549d8Lxw9CL3Ytslt0utPa49R35w%2FeFIr1tv62X3y%2B1XPK509E3rO9Hv03%2F6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r%2Fy%2B2v3qB%2FoP6n%2B0%2FrFlwG3g%2BGDAYM%2FDWQ%2FvDgmHnv6U%2F9OH4dJHzEfVI0YjjY%2BdHx8bDRq98mTOk%2BGnsqcTz8p%2BVv9563Or59%2F94vtLz1j82PAL%2BYvPv655qfNy76uprzrHI8cfvM55PfGm%2FK3O233vuO%2B638e9H5ko%2FED%2BUPPR%2BmPHp9BP9z7nfP78L%2FeE8%2Fsl0p8zAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn%2FAACA6QAAdTAAAOpgAAA6mAAAF2%2BSX8VGAAAA%2FUlEQVR42pzTvUoDQRQF4G83eRGxsLJJYZqkWrEwpLPKA6QS7MRqIakkranyALGxC3bZaosQhCBYWfkkYWxmJUjAdQ8MzOWec%2B%2Fcn0lCCJqgXV2mRb%2BFITJ0cRZdn9iiwCrPyj0kIQTTon%2BOW4z%2FSLTAPM%2FKj2Sy7p1ghhvssYrRt5Hcja8YooUX3LcxiqIvPOZZufiV5Q3zadEf4yFy31MMImF5RPSD6FtGc5CiE43XGs2sOJ0UuypKDWHF2aUHUUaxjqOIvlGVuXFXqzle4Q7XdedYbc4pLvGEpM7mtA%2BK3uA5z8pNrWUNIZisexchBP85SdPfkWqIxsLvAQDif3vTtm3tHQAAAABJRU5ErkJggg%3D%3D";
	var closeIcon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0F%08%06%00%00%00%3B%D6%95J%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D5%07%05%0B%1B%04%A9%D7%EB%7C%00%00%00%1DtEXtComment%00Created%20with%20The%20GIMP%EFd%25n%00%00%00%B6IDAT%28%CF%9D%D3%3BnB1%10%85%E1%CFW%20H%AA4%B4%B0%01%9A%AC%C1%EB%F6%1A%B2%85%40OA%22%24%1E%22%A4%C0%89%AC%8B%7D%03%99%F2%CC%F9%8F%3D%D68%40b%81w%F7%D7Kd%1B%12c%1C%3D%5E%AF%A3%02%9Cb%14%D9%B5%DC%89%E7%EC%3F%E1%AD%2Bz%27L%12%97%06x%C1%19_%3F%DA%2F%1C%AF%E2%A60%F6A%D8%C7%1A%9C%03B%1F%28%83%CA%FE%0D%DC%0A%A8%81U%B8f%AC%81Mx%60%E6a%B8u%D5Z%40%F7%178%14%10%0Aa%96%17%60%5B%9B1%FB%C6x%C2G%FF%E4O%9C%5B%8F%93%F5N%B1%81%211%C7%EA%1F%BB%3D%ED%22k%D7_%F5H-%23%87od-9%C2L%10%A8%1A%00%00%00%00IEND%AEB%60%82";
	var background = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D5%07%05%0C%0C%2C%9C%AE%D1%95%00%00%00%1DtEXtComment%00Created%20with%20The%20GIMP%EFd%25n%00%00%00-IDATH%C7%ED%CD1%01%000%08%030%98%7FoH%2A%12v%F2%24%06%D2I%A6%0E%BC%3A%22%16%8B%C5b%B1X%2C%16%8B%C5%E2%BF%05%88%3D%04%08%29%DD%FEc%00%00%00%00IEND%AEB%60%82";

	if (document.documentElement.tagName == "HTML")
	{
		var href = document.location.href;
		if (href.substring(0, 7) == "http://")
		{
			// Remove the HTTP scheme
			href = href.substring(7);
			var requestUrl = encodeURI(requestPrefix + href);
			requestUrl = requestUrl.replace(/&/g, "%27");

			GM_xmlhttpRequest({
			    method: 'GET',
			    url: requestUrl,
			    headers: {
			        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
			    },
			    onload: function(responseDetails) {
					// Don't know why we need this, but sometimes the Greasemonkey function() gets called twice with the same HTML document
					if (frames["TechnoProxy"] != undefined)
						return;

			    	var parser = new DOMParser();
					var responseXML = parser.parseFromString(responseDetails.responseText, "text/xml");
					var results = responseXML.evaluate("/technorati/result", responseXML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					var style = "<style type=\"text/css\" media=\"screen\">";
					style += "	body : { background:url(" + background + "); color: black; font-family: sans-serif; font-size: 8pt }";
					style += "	ul : { list-style-type: none; margin: 0; padding: 0; }";
					style += "	a.link : { text-decoration: none; color: #000066; }";
					style += "	a.link:hover : { border-bottom: 1px dotted #000066; }";
					style += "	a.link:active : { border-bottom: 1px dotted #000066; }";
					style += "</style>";
					var html = "<html><head>" + style + "</head><body>";
					html += "<ul>";
					html += "<li style='float: left; width: 10em;'>";
					html += "<img src='" + technoIcon + "'>";
					html += "<br />Pages linking here (courtesy of Technorati): ";
					html += "<li style='float: right; width: 1em;'>";
					html += "<a style='cursor: pointer; position: fixed; right: 5px; top: 5px;' onclick=\"parent.document.body.firstChild.style['display'] = 'none';\"><img src=\"" + closeIcon + "\" border=\"none\" /></a>";
					html += "</ul>";
					var processed = new Array();
					if (results.snapshotLength == 0)
						return;
					for (var i=0; i<results.snapshotLength; i++)
					{
						var result = results.snapshotItem(i);
						var domain = responseXML.evaluate("domain", result, null, XPathResult.STRING_TYPE, null).stringValue;
						var permalink = responseXML.evaluate("permalink", result, null, XPathResult.STRING_TYPE, null).stringValue;
						var title = responseXML.evaluate("title", result, null, XPathResult.STRING_TYPE, null).stringValue;
						var age = responseXML.evaluate("age", result, null, XPathResult.NUMBER_TYPE, null).numberValue;
						var ageUnit = responseXML.evaluate("age/@unit", result, null, XPathResult.STRING_TYPE, null).stringValue;

						var link = permalink;
						if (link.length == 0)
							// Oh well, just link to the domain
							link = domain;

						if (processed[link] != undefined)
							// No duplicates, please
							continue;
						processed[link] = 1;

						html += "<a class=\"link\" target='_blank' href='" + link + "'>";

						var labelText = title + " (" + age;
						if (age == 1)
							// Remove the trailing "s" cause we are anal
							// Interested in internationalizing this? Good luck. ;-) Vive l'anglais !
							ageUnit = ageUnit.substring(0, ageUnit.length);
						labelText += " " + ageUnit + ")";

						html += labelText + "</a>&nbsp;&nbsp;";
					}
					html += "<a class=\"link\" href='" + technoPrefix + href + "' target='_blank'>more...</a>";
					html += "</body></html>";
					var img = document.createElement("img");
					img.src = technoIcon;
					img.onclick = function()
					{
						var iframe = document.createElement("iframe");
						iframe.src = "data:text/html," + encodeURI(html);
						iframe.setAttribute("name", "TechnoProxy");
						iframe.setAttribute("height", "80");
						iframe.setAttribute("width", "100%");
						iframe.setAttribute("scrolling", "no");
						iframe.setAttribute("style", "position: fixed; left: 0; top: 0; border: none; border-bottom: 1px solid black; z-Index: 999;");
						document.body.insertBefore(iframe, document.body.firstChild);
					}
					img.setAttribute("style", "position: fixed; left: 0; top: 0;");
					document.body.insertBefore(img, document.body.firstChild);
			    }
			});
		}
	}
})();