// ==UserScript==

// @name           search twitter link

// @namespace      http://

// @description    Adds a button on Twitter profile pages to follow users' conversations with Search Twitter

// @include        http://twitter.com/*
// @include        http*://twitter.com/*

// ==/UserScript==

window.addEventListener('load', function()

	{

	if(document.body.id=='profile')

	{

	h2s = document.getElementsByTagName("h2");

	loc = window.location;

	tmparr = loc.toString().split("/");

	uName=tmparr[3];

	for(i=0;i<h2s.length;i++)

		{

		if(h2s[i].className=='thumb')

			{

			thumb = h2s[i];

			break;

			}

		}

		img = document.createElement("img");

		img.setAttribute("src", "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%001%00%00%001%08%02%00%00%00%FC%FE%D6K%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%09vpAg%00%00%001%00%00%001%00%1C%A9n%B3%00%00%04YIDATX%C3%ED%99Ml%1BE%14%80%DF%FE%D9%5E%3Bf%13'%C4e%FBC%944rK%0A.%04%A4%14UB%02!%24%C4%A9%1C*P%2F%9C%E1%80%84D%0Bg%0E%1C%B8U%BD%F4%C0%85C%5B%09!Um%A9%8A%A8U%A9%ADTE%E5%C7m%9C%B8u%13%8A%0Bn%93%B4%8EW%CEz%FFw8T%D4k%EF%CC%EE%CE%02J%2B%F1N%D6%CC%9B7%DF%BC%7D%F3%E6%CD%98A%08%C1c%26%ECF%03%3C!L%FC%06%CDk8%F7%AB%F6%DA%3D%E4%00%40%9A%DB%F4%820(%3D%EAc%A2%C4%93%FB%E7%E9N%AD%0A%D0vM%1D%B4%06%F3%EC%A1%EC%EE%A9%B84%B6U%3B%AE%CD%9F%EB%9B%95%95%3F%1Cxe%86%89%EC%A7%07%DA%2F'%1C%C7%CB%18%DB%3D%0F%B4%F3%1F%9B%EB%B8e7%8E%B4%7F%1Dzjw%01%A2%C4%13Z%3Eo%3B%A1ZQ%C4%D0%2F~%86%05%EA%93P%26C%9F%3B%D5%D7%C4IC1%88%9C%C5%A3FS%23%F7%8F%8B%3B%0B%D1%98Z%97%FD%2Bc%A5aj%22wQ%9B%9B%0D%F2%CD%F8%FBB2%9A%9F%8C%F9%E3%BE%B6%A2%90K%02%AD%B0%23l%22%A0%BB(N%15%BA%BAA%86%D4%2B%FA%AA%CF%DB%D2K%7C%9C%A4%26%F1y%99%D4%C7%17%3F%F0%DA%0C2o%CE%1F%C3%8C%DF%BA%23%06%11%000l%0A%DF1%B0%3F%3D%D6%13%0Cd%26%ED%AA%DEh%FAZs%82L%5Cn%B0%20%AB%85k%96%C5W%DFaz%9B%88L%E6%DC7%98d%3A%F0%A6%20%C6CR%ED5%FF%0A%81%2F~%92%F0%19%240%A9WpN%02~b%0F%03%F1DA%FE%3C0%B0%2F%3D6%EAW%C53%19%E5%AFq'%CExb%0B%7D%16x(%EDE%DB%D7%96(%BE%8D%5D!%8E%A9%5D%C2l7%00%90%5E%13%E2%1E%D9f%F5%DB%FE%26q_j%04%9FS0LF%E5%24V%95%1F%DB%15%93%C8%AD%9B%BEH%10%A6%5E'%85%81%8F%C9%A8%18%CBM%9C%A6%2C%E4G!%96%B8%F5%B3%BE%03S%16%F2%12I%BF%9F%C9%A9%9F%C5%D7.%89i%3E%E6%8ES%F4%85K~k%1C9%0C%FA%98T%E3%B72V%8F%C9%17%E2%95%A4h%F9%9Ce%FAZ9%08%D8%BF%BD%13%A9%3F%5B%A4%93%9B%94%85%C3%9C%A4%95O%D1%8E%E9a%B2%97~%24%E91%5C%1C%22%B7%FE%1D~%91%DAr%40I%E6eR%AD%95%25%92%1E%B2l%A0%96%15%EDZ%89%D0u%CB%BE%AFD%F2%13%22%C3%A3%3B%25%9B%B2%E4u%EBg%C8%05j%D3%B8%FC%91r%F2%60%A7v%23%90%C9%BE%ED%04%94%810%AB%5D%AB%D0%20%A9z%B5%14%A6%D3%B0%E6%BFP.%9C%EE%BF%2Ft%7F%3A%10%7C%83q%7F%FFr%FDz%19%22J%F3%92%A5E%D3TNtn%AF%10%98%84%2C%17%16%C8%CE%D2W%CA%0F%87%CD%A6%02ab%DE%FC%3E*%3D%80%3Dw%C6%FB%91%3D%99%CBm%3BQ%EE'%DA%ACvqV%13%8B%C2%B6%BD%C9%ED3%F8%D4gTt%FCa%40Zk%D51%80%C3%D6%E3%14u%88V%B6n%1C1V%F1%0EC%AD%0A%ED%C3%88wj%8Ax%C2%08%8B%3F%20%9C%B5%3A%A5%A1%86%D5TqL%C9M%7C%82%CA%90%2C%0Cf%F0~%D2%DB%B4%AB%03%E8%E6%3F%0F%93q%CF6%A9%ACla%04%7C%07%93%1A%A1g%EA%CA%3Fx%EB%11%F3%1Ca4%D2%FF%A07%D7%0D%03%BA%5C%D0%E3%8C%A1%02iO0%9CDa%08%00%40%E6s%DD0%F00E%CC%05%7F%0B%97%7B%86%D85%BA%9D%D6K%C4%7DG%23%227%9C%23N%F0%F4t%AC2%C2%CF%94%1C%A214-%0C%06T%8A%13%A9%C9%9D%FF%06%13%C8%7C%3E%17q%18%B3uo%F0%02%F8%1D%07b%BB%AAg%E7%24%9F%7F%2F%DA(11Y%08Qa%B7%A5_~%2B%1ES%AF%FF33%99%C9%92Z%5B%08%19%24%BD%9B%CC%86%DF%F4%D8%CD%07%B2%E2%1E%17DF%E0%018%86%05%00%07Y62%DA%AE%B1%E2*w%9D%F6-gu%E1%E1%E1%E1%3DB%FAM%F3%CF%7D%9E%86%C3%9DZ%C0%FB%95%98%9A~%23%E2%C9%C8%E6%26%08)%EC%91%9B%0D%E7%EE%05%ED%FAM%D6%F3%A5%F1%EF%BE%A8u%B5%F3%D3Q%7B%DDW%01qr%E2%C5O%C5%CDqo%E8%D1%24%E8-%1A%A9%0D%BB%B5%8A%1C%00%8Eg%92Y63%CC%89%19%1A%E3%FF%01%D3F%C9%E3%F8%DF%C6%FFLO.%D3_%0A~%7Fv%B3v%96%8D%00%00%00%00IEND%AEB%60%82");

		img.setAttribute("width", "20");

		img.setAttribute("height", "20");

		an = document.createElement("a");

		an.href="http://search.twitter.com/search?q=%40"+uName;

		an.appendChild(img);

		an.innerHTML+=" ˀ✉twtr";

		thumb.parentNode.insertBefore(an, thumb.nextSibling);

	}

		}, true);