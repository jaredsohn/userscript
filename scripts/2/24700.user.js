// ==UserScript==
// @name           Beem
// @namespace      docmittens.org
// @description	   Put a placeholder anywhere on any page
// @include        http*://*
// @author         Ashur Albertson grease@docmittens.org
// ==/UserScript==

	/**
	 * Stored bookmark detection
	 * {{
	 */
		var re = new RegExp('http[^#]*','i');
		var this_URL = window.location.href.match(re);

		// if coordinates stored
		var this_BM = GM_getValue('url['+this_URL+']',false);
		if(this_BM != undefined && this_BM != false && this_BM.indexOf(',') > -1){
			var this_X = this_BM.split(',')[0];
			var this_Y = this_BM.split(',')[1];

			setCoords(this_X,this_Y);
			window.scroll(this_X-50,this_Y-25);
		}
	/*
	 * }}
	 */

	/**
	 * Set coordinates
	 * {{
	 */
		// coordinates
		var bm_X = 0;
		var bm_Y = 0;
	/*
	 * }}
	 */

	/**
	 * CSS injection
	 * {{
	 */
		var bm_CSS = "data:text/css,%23dcm_BM_pin%20%7B%20padding%3A%2010px%20!important%3B%20position%3A%20absolute%3B%20z-index%3A%20100%3B%20-moz-opacity%3A%201.0%3B%20%7D%0D%0A%0D%0A%23dcm_BM_pin%20img%20%7B%20border%3A%20none%20%7D%0D%0A%0D%0A%23dcm_BM_pin%20a%2C%20%23dcm_BM_pin%20a%3Ahover%2C%20%23dcm_BM_pin%20a%3Aactive%2C%20%23dcm_BM_pin%20a%3Avisited%20%7B%20background%3A%20none%20!important%3B%20border%3A%20none%20!important%3B%20text-decoration%3A%20none%20!important%3B%20%7D";
		var CSS = document.createElement('link');
			CSS.setAttribute('rel','stylesheet');
			CSS.setAttribute('href',bm_CSS);
			CSS.setAttribute('type','text/css');

		var coll = document.getElementsByTagName('head');
		coll[0].appendChild(CSS);
	/*
	 * }}
	 */

	/**
	 * Event listeners
	 * {{
	 */
		document.addEventListener('keydown',perkUp,true);

		function perkUp(e)
		{
			if(e.altKey){
				document.addEventListener('click',getCoords,false);
				document.addEventListener('keyup',perkDown,false);
			}
		}
		function perkDown()
		{
			document.removeEventListener('click',getCoords,false);
			document.removeEventListener('keyup',perkDown,false);
		}
	/*
	 * }}
	 */

	/**
	 * Pin functions
	 * {{
	 */
		/**
		 * Coordinate functions
		 * {{
		 */
			function getCoords(e)
			{
				// Position-sniffing code from quirksmode.org
				// http://www.quirksmode.org/js/events_properties.html#position
					var posx = 0;
					var posy = 0;
					if (!e) var e = window.event;
					if (e.pageX || e.pageY) {
						posx = e.pageX;
						posy = e.pageY;
					}
					else if (e.clientX || e.clientY) {
						posx = e.clientX + document.body.scrollLeft
							+ document.documentElement.scrollLeft;
						posy = e.clientY + document.body.scrollTop
							+ document.documentElement.scrollTop;
					}

				bm_X = posx; bm_Y = posy;
				dropPin(true);
			}

			function setCoords(bm_newX,bm_newY)
			{
				bm_X = bm_newX; bm_Y = bm_newY;
				dropPin(false);
			}
		/*
		 * }}
		 */

		function dropPin(saveCoords)
		{
			// store coordinates
			if(saveCoords)
				GM_setValue('url['+this_URL+']',bm_X+','+bm_Y);

			bm_X = bm_X - 70;
			bm_Y = bm_Y - 25;

			// build image
			var bm_IconTag = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%04%BDIDATx%DA%AC%97%5DL%23U%14%C7%FF3-%C8W%A1-b%97o%B0%95%8F%B2%B2.%B8%EC%22.%89%9A%18c%B2%BA%C6%F8%AE%0F%B8%F1Y%F7%CD%07%12%7D%DC%7D6%BB%FB%60%E2%AB%0F%26%9A%18c%D4%5DQAv%0B%146%85%A5i%09.%02%5D%DA%AD5%7CX%DA%D2z%CE%9Di%99%B6SZ%B2%9C%E4%DF%99%E9%CC%3D%BF%7B%EF%9C%7B%EE%19%E93W%0A%25X%13i%944D%EA'9H6%F5%DE%23%92%8F%B4%40%BAK%9A%20m%14sh%2Cr%BF%8F%F4%1E%E9%1D%15%A8g%ED%AA%5ES%AF%B9%03%DF%90%BE%26y%8A%82%3F%1D%3C%FC%F3%F3%19Ht%B8B%1A%23%0D%F0%7F%1D%26%A0%B9%1A8U%05X%2B%80%9A2%E5%D9%9D8%10%8E%02%81%3D%60%7D%17X%DD%16%1Dd%5D%22%DD%22%DD%20%DF)%8Do%FD%11%D3%8DSt%F8%84%F41_%F7%98I%16%A0%ABN%BF%E7%96rE%F6Z%E5%DA%FB%2F%F0%E0%1FRDt%F8%0B~-%E4%F3%1A%C1%03%DAv%B2%0Et%9C%A1fr%F6j3%F0f%7Ba%A8%9E%F1%B3%DC%86%DB%B2%0Fu%00%E3%AA%EF%8CI%14%5C%97%D2%E7%A4%0FH%97%9F%A9%04%86)t%BA%CDx%22%5B%8E%00S%14z%5B%FF%89%CB%EB%A4%AB%A4T%EE%88%DF%60(%F7%F2%24%A0l%EC%83%7DiF~%25w%AA%DBH%AF%F3%C9%40%C3%C9%40%B5p%F6%A9%DA%98%BAR2%C15B%B2s%20%BD%F0tvC%DF%F2%22R%A9%14%92%C9%A48j%CF%7B%FA%FAa4%1A%8B%C2%D9%E7%C6n%26%E0xyz%B8%95%954%2C%22%98%A2%D7(e7b%88%D3%E9%CCs%B6%B9%B9%89%07%9E%05%82%3FO%F0%B2%A3%93%85%A4%F8%260%D4%9CpSV%87%DE%C1%EBT%2Fzydl%EB%EB%EB%98%9F%9F%C7%DA%DA%9A%B8nllDCC%03%16%EF%CF%23%11%8F%97%14%ED%CCP%D7%F8(%83%BB%F8%8A%93%83%9E%F1%88%D9%82%C1%20%FA%FA%CFb%7Bg%07%7B%7B%7B%E2%FF%E6%E6f%01_p%CF%20%5E%02%5C%C3%18bp%07%9FqF%3A%0A%5C__%8F%859%17%E2%B1%98x%AF%8F)%5B%DD%A1%8C%DC%DA%DA%0A%9B%CD%869%D7tQ%B8%86%D1%CF%EF%B8%91%CF8%0D%EAYz%AA%19%D0%D2%D2%22%9Co'%CB%F1%95O%C2%FE%81D%F7%93x%A5%BD%5Dt%D05%3D%89%17%87%86QV%5E%AE%EBK%C3p%F0%88%C5%E2%A99%22%3E%C2%E1pf%F4%91%84%11_.K%F4%BC%04%1B%25%9A%B9%C72n%AF%03%9D%9D%9Dhjj%C2%F4%D4%EF%88%D1%AC%E8%99%86a%93%8B%BD%97N%FBsXYYA(%14%82%C1%60%40%88%A68%96%94D%020%D2%8F%F9%A9C%B8%DDn%17%B32%F9%DB%9D%82pm%02%89%A4w%19%3D%AB%AE1%C1%D1%D5%0B%9F%CF'%02%CCi%95%F1nG%02%91%FD%24u%000H%0A%7C%26%24%E3%E7%BFi%0E%1D%0E%B4%B5%B5a%E2%F6O%04%DF%CF%F2%A5a%3Cb%F0%A6%98%CEh%E1%DE%D5%98L%E8%EE%3D%0D%AF%D7%8B%AD%AD-t%5Bd%BC%D5N%D3%1EU%E0%BC%F4%CB%C8%D3%FD%60%0CI%0A%09Y%96%85%0E%12%07%D9%AF%EC%90%E1c%F0*%9F%F1~z%94%99jk%D1K%99jii%09%81%40%20%03%0F%13%3CB%03%AB%94%E2%F8%B0O%C6%8A%DF'%5E%CD%85%91%8B%A8%AC%CA%5E*%1A%C6%02%83%BD%22A%EC%16%CF%BB%B5uu8%7D%E6%2C%3C%9EE%91%B9%18%FE6%C1%AB%0DI%BC%EF4%60%E3%E1j%06ZU%95%9F%184%8C%BBF%B5%3CY%A5%CA%A1%837%F1b%7Bo%5D%9D%19g%06%061soZDy%0F%25%11N%87%1C%03~%BF%1F%C3%2F%8F%EAB%D971%D2%A5%D1%04%83y%ADLq%22%E1%CA%E1%D9%DA%FC%7C%9Dkf%B3%05%83%E7%CE%E3%DE%9F%93%02%1E%8DF%C5H%0BA%13)%A5*Q%8D%EB%B1%8D%F4r%FA%83%E4%E7%24%EE%0E%95%B6%DD1%FC%DC%F9a%B8%DDn%05%3A%A2%0Fec%9F%EA%061%AB%16%81%99m%F1!%E9G%D2G%B3A%0A%A4%B2%D2%F6d%B3%C5%8A%0B%2F%5DDEEE%5E%20i%AB%10%F6%A9%DA%ADt%E5%A9%DDL%7F%E0%F4%19%89%E12%97%2B%E9M%BC%98Y%AC%D6%A2%A5O%24%96)%7Dnh%13%C8w%2C%AA%02%BF%E5%11%F3M%AE%91~%A5%0D%C0%15T%DE%CFq%8D%DBp%5B%F6%A1%D6%5B%0C%BC%A6-s%B3R%A6Z%82r%95y%9D%7B%F9%0B%A5%C1%EF%FFR%22%B2T%E3g%B9%0D%B7%D5%8Ct%3C%B7%BC%CD%AB%5B%F8%01*E%AF%AA%9F%25c%5C%AEp%60%1C%A3%A0O%DB%AC%5EA%AF-o%9F%F4%13%26%D7%8E%F7%09S%C0%3C%AAn%9E%F4G%DB%FF%02%0C%00)%ED%E5%03%18o%C4b%00%00%00%00IEND%AEB%60%82";
			var bm_IconDel = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%1E%08%06%00%00%00%2C%12%3Ek%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00ZIDATx%DAb%FC%FF%FF%3F%035%01%13%03%95%C1%084%90%A5%E5%2C%83%EF%08%F322%A7%C6%98a%13.%85%8C%8C%B8%0Di%3E%C3%E07%9A%0EGl%B2a%C4%936%EE%DE%BD%8BSn%D9%7B%A5%D1H%19%B9%C9%A6%F9%CC%7F%3F%DCIc%B8x%99q%B4%A2%1F%7C%06%02%04%18%00R%FC%13%5D%22g%5C%06%00%00%00%00IEND%AEB%60%82";

			var bm_Style  = 'top: '+bm_Y+'px; left: '+bm_X+'px;';
			var bm_diURL  = "javascript:location.href='http://del.icio.us/post?v=4&noui&jump=close&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title)";
			var bm_HTML   = '<a href="'+bm_diURL+'"><img src="'+bm_IconDel+'" /></a><a id="dcm_BM_delete" href="javascript:void(0);"><img class="dcm_BM_icon" src="'+bm_IconTag+'" /></a>';

			var pin = document.getElementById('dcm_BM_pin');
			if(pin == null){
				var DIV_Pin = document.createElement('div');
					DIV_Pin.setAttribute('id','dcm_BM_pin');
					DIV_Pin.setAttribute('style',bm_Style);
					DIV_Pin.innerHTML = bm_HTML;

					document.body.insertBefore(DIV_Pin,document.body.firstChild);
			} else {
				pin.setAttribute('style',bm_Style);
				pin.innerHTML = bm_HTML;
			}

			var bm_Delete = document.getElementById('dcm_BM_delete');
			bm_Delete.addEventListener("click", function(){
				document.getElementById('dcm_BM_pin').style.display = 'none';
				GM_setValue('url['+this_URL+']',"");
			}, true);

			document.removeEventListener('click',dropPin,false);
		}
	/*
	 * }}
	 */