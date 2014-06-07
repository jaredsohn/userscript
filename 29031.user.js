// ==UserScript==
// @name           Taobao SliderSearch
// @namespace      http://www.quchao.com/entry/taobao-slider-search
// @author         Qu Chao (Chappell.Wat) <Chappell.Wat@Gmail.com>
// @description    SliderShow for Taobao Search Results
// @include        http://search1.taobao.com/browse/*
// @include        http://list.taobao.com/browse/*
// @version        0.2
// ==/UserScript==
// Appreciate to
//  jQuery ThickBox (http://jquery.com/demo/thickbox/)
// ver 0.1 @ 2008-6-22
//  Initialize release
// ver 0.2 @ 2008-6-23
//  Bugfixes - Control bar toggle

/*-----------------------------------------------------------------------------
 * Configuration
 *-------------------------------------------------------------------------- */
// Whether to show the floating bar by default? [true or false] 
var SHOW_CTRLR = true;

/*-----------------------------------------------------------------------------
 * Import jQuery
 *-------------------------------------------------------------------------- */
var gmjq = document.createElement('script');
gmjq.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';
gmjq.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(gmjq);


/*-----------------------------------------------------------------------------
 * gTaobao
 *-------------------------------------------------------------------------- */
var Taobao = window.Taobao || {};


/*-----------------------------------------------------------------------------
 * Taobao Slider Search
 *-------------------------------------------------------------------------- */
Taobao.Sldr = function () {
	var sldrArr = {
			link:	[],
			title:	[],
			thumb:	[],
			image:	[],
			sellr:	[],
			price:	[]
		},
		sldrCnt = 0,
		code = 0, // 0: waitting; 1: running; 2: done; -2: ;
		sldrNdx = 0,
		init = function () {
			// data cache
			$X('//div[@class="Item"]//div[@class="Name"]/a[last()]').forEach(function (node) {
				sldrArr['link'].push(node.href);
				sldrArr['title'].push(node.innerHTML.replace(/<[^>].*?>/g,""));
			});
			$X('//div[@class="Pic"]/a/b/img').forEach(function (node) {
				sldrArr['thumb'].push(node.src);
				sldrArr['image'].push(node.src.replace('_sum.jpg', ''));
			});
			$X('//div[@class="Seller"]/a[1]').forEach(function (node) {
				sldrArr['sellr'].push(node.text);
			});
			$X('//div[@class="Price"]//span').forEach(function (node) {
				sldrArr['price'].push(node.innerHTML);
			});

			// update count
			sldrCnt = sldrArr['image'].length;
			if (!sldrCnt) {
				// if no result
				$('#sldrCtnr').remove();
				return false;
			}

			// draw overlay
			$('<div id="sldrOvrl"></div>')
				.css({position: 'fixed', 'z-index': '999996', top: '0', left: '0', height: '100%', width: '100%', 'background-color': '#000000', filter: 'alpha(opacity=75)', '-moz-opacity': '0.75', 'opacity': '0.75', display: 'none'})
				.prependTo('body');

			// draw window
			$('<div id="sldrWndl"></div>')
				.css({position: 'fixed', 'z-index': '999997', 'text-align': 'left', top: '50%', left: '50%', color: '#666666', 'background-color': '#ffffff', border: '4px solid #525252', display: 'none'})
				.prependTo('body')
				.append('<img src="" id="sldrImg" alt="" /><img src="" id="sldrNxt" alt="" /><img src="" id="sldrPrv" alt="" /><div id="sldrInfo"></div>');
			$('#sldrPrv')
				.css({margin: '15px', 'vertical-align': 'bottom', float: 'right', cursor: 'pointer'})
				.click(function () {
					sldrNdx --;
					show();
				});
			$('#sldrImg')
				.css({margin: '0 auto', 'margin-top': '15px', 'border': '1px solid #ccc', cursor: 'pointer', display: 'block'})
				.click(Taobao.Sldr.swch);
			$('#sldrNxt')
				.css({margin: '15px', 'vertical-align': 'bottom', float: 'right', cursor: 'pointer'})
				.click(function () {
					sldrNdx ++;
					show();
				});
			$('#sldrInfo').css({margin: '0 auto', padding: '20px'});

			// draw loader
			$('<div id="sldrLdr"><img src="' + 
			'data:image/gif;base64,R0lGODlh0AANAMQAAPv7%2B%2Ff39%2FPz8%2B%2Fv7%2Brq6ubm5uLi4t7e3tra2tbW1tLS0s7OzsrKysXFxcHBwb29vbm5ubW1tbGxsampqf%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFCgAUACwAAAAA0AANAAAF%2FyDFQFJpnmiqrmzrvnAsz3RtvxAjNk7P%2FIwGBNIr9nKLpHJENB4ZymjT6UBGk0NqFXpdTJ3W69cYlmq3Xe%2B5rMxS2djxMy1%2FBoGNEcPBSCQQBwd3g1B5gYeBC3xLSYaIiYuMjo%2BKXEuTiIqMjQyPkFFcmIeVXVCeB5pJlqKfoAusqA6lsKSSnYEIfgcksgcGBQQEBg0KfsYJCgzBy8HDxcfIyszBBZbQ0tMG1sfYzNXP19PU28bdy9VKx8niBNXQ5eza6cbr4trg3Ozf7wvmwAglOhlglgSQwUAMDAhYyFBAQU8JGzJ8%2BCiiRIe6Kiq8SBGRRYkdD31sGBLhRpAZPf%2BeJLkAkMaLGBNAXDmx5UyYC0ooGMgQ1Sk%2FAYIKDWBgwc8EQ4UWPZo06FJPQJs%2BfRQ16VREVYdePZRVqVGoSKV%2BpRrW6lisZbWe5ZrWq84CA4I6PIWKIYC7AOaeYmAXr15PCwTg9bt2lODBeQsnOjz4LyXGhOnyRZyYbmDKjjNBvpvZ8MLGiut%2Bvhtg7tu4AVJmKtA0tUzArJuqHkUz6OxEBlobA5xb9u0FsZPeRlXb9evVuo9nKj58QW%2FhykcFH6rrNFHFXe8WwN5WO%2Fek3pkODQ8WPIDtRymf564effnx69NTdk%2FWPH207b%2BeJnAL8ObEB3n0HwDYXYZYZwgNWOCHfwgKomCAIjEYmoGgQZggZhNKaCECFBLmkgQQBEIAMqc4J5FtCpT4HHXRmXRiainylpyKusVICXM2LjfjTDtq1KNKP4q0kXA25tAAAYJsqEBrWwWCDJPYLSmWklC6hFaVB1iZpZRmUTnle2b9xKVaXnYJJpkI6TDCDWy26eabcMYpZww5UBACACH5BAUKABQALAEAAQDOAAsAAAX%2FIEVNYrmcEFSKjgM1K4Wqa%2FvGc2zjee3yi5TOBVv1Sjue0HczBmlIohLKkjqXUaroWNVSJNrDgeLgNRgxMZnnQK%2FUZWc7PY6bKGf62pl%2F19luJXBmgSKDfIUUh3d9gn%2BIenZbeEUlYAkrBAQGlSUJCYmaBokUn6QEBTEiCQqhqKoLpqqopLIxm7C2mamqrKejvaC3r72twwWJsca3yDGfyysSCysC1SdpCAwGMdaYfgvb1ALXftrc49Pl4SXddObise7rIu3f8xTW6Y7v7Ojy5%2BT23asn8JYkfAJk0IknTuE3byUCBHDoCAFEehP1GTrwKYZEihsZ9gOp6IBIjCTF%2F5xEmPKARY8Z6XRsqLHkzJE1xbxsCFCVGDQJI47zeYCUNZ8IFgTtl1PlUnpDFz6lECBqualVm5qcehSb0qdd3yTlatVRTQoAyobEtwLAAJg3NzLgFTFA3JL8REi8OwYc3IslF9CFurLvwHGAf97bm1jGwImJTQ7GZ7ex3xWMF07OrK5n3QJNVwIAAHohYAGkm%2B5kF9PP3dGlXQP%2B2PR1apmAYdfOffthDN24f%2Fc2O7s11axElXpUq2gsNeR%2Btnp%2Bk0B5W7U6rTNNDhb6N7Jnf4JHql2E2%2FDS4XH%2FPUBjNQoKNP91t7nyv4bx7Z2Df581X8fcAMBfOZO9l19BmE10oEJcj%2F2XF0sL4rWYfSIQIEBs1NVEm2ncGLdRdecYEB4rAWL4YXEmGrLSeyMWJ6JMEbJIx2p6BZCiIiQmmKIYINIkQggAIfkEBQoAFAAsAQABAM4ACwAABf8gRUmQ5IjoskAQKp5Q41IqO8OyW7eu4%2FC61c0HTK2KFNxsN0TSjs0ls0eJSZ0wKbT3yxltvdJJ1LK6DofF2NhgzNBJqcN9PsSD7bd9LVLN9XdGf3WBfRR5hHxPiChwiiqMIo5ydI17UpEUk0E%2BKBAODYoEBAZeKAkJlSKjBqo0qK4UBAWxCQqxs64LsDOytL22rqy6wb25wKkzo78zxcrMLs4upLW3xtCnyZ4NDXYuAgIqbwgMBjPg4nUL5t%2FhC3rr5%2B565fK78Owo6An49vzq%2BUTs69cunaV6Bf8dDEhhIMAb79rRgKdQoICJ6io2vBjxzD2JHSWl0QgOo6WP%2Bjj%2F6kElz6RIlBZdSoK5USYalt8C2BzZMuRMjaB6oeuFhkHJlD41HTBqjyiCBRcLEl0aFelUpi4ChHMKtSoFrUnRQG06bqxUeF43hn2adijaGRBIBsB5kiE4ui%2FtCsCrNF7WuRrFFvBHEGlgGnr52kGIIgDgwgIfP2ynOI1dyScHf1NU0qdYkiozzgAAoEBYvqRNUzwXQLXonK4toS7t%2BcDs2C9B76TZeTXs2nyPnlXXduvbrMbPsJ0BVs9y5DQPPBdBOlzgNMXXYm2c%2FGR2rmmbH%2BceFnvLvxQU0NObHvJXneonN4bv%2Fm78hczp12Hc0HF7%2BSI4Vplf%2Bsx1X17y2OKeMn8H9pXYXwbUxltrEoIWoW8F4qZUcBRiGBNwDTqm4U0NgnPha%2FOdeAZfIlbYk4cbmRMCACH5BAUKABQALAEAAQDOAAsAAAX%2FICVSkDSeDHmKDtSs1KKu7bvKEFzDS677t9mpxcP9bCcjzcXTUYg84FA6kumgQSrJNKQgR4eFo5lahcfB8ulMhrHTbnHbLIfT0UmHGlzP70VvSRR%2FFIFVenF4IymKg18iBAaPIgqEkZMLlTAUBoQUmjCdm6ArojCkIwQFnqgjpkmtIqujnq8nsaqstYQyjwsMBzACmxQIDAbCFAlxyCvDy3TNJ8%2FMwgvQa8fW2GDaztdu3tPg0cncgOIjAuTZ0ursfO4y5xQCYXH0AgZWa8rC%2B%2Fj%2B8QPjb0UAgGYKTkO4Bp4IfQMBKVTHkGC%2BioAcUjgYsdDEhxg9nvs1wNomBB3r9aVEOezbpgMMWo57uUDmu5cxTYbbtI6mzYcpw%2FxUebKmTjM5Xcax6aBBsG%2F0whTYVg1q1RMBPhZaMNWgVqlUy3mNusDdw69lzV1Vh7brNLRmIRACUKBjMHocA66ga1crX70L%2B160q9GeYBh%2FEw52oxUi48WKYUB4OgJATxgsj57IrHQF55lLNfMZetlzUtB0SAc12nkz68qlG6o%2BeXoEPQAIFIQzWy%2F3WhEBfIudJrydsOLdeAtAjo43bt3DR2SFbtwg80LpHl6HqXx7Wq8GQwajTvGwM%2FFa8yYkD5JwvntmrjteD0N9Q%2FYUEvfDb58g%2Fvn3JRMCACH5BAUKABQALAEAAQDOAAsAAAX%2FICWKECQ1o7gsJZQ6FISma%2FnCLl3nIz6PtZTI4ZAJg0IiD8haUnDHXTL2U7GSymgTa9Q5n0WtLfVlPM2pw%2BGsa6BHajbTLYzDdI63yB7N19d3c3oUfG2DhYJ%2FT1F0aYCMh494kYs0MQopCguDBAQGVSIJCZyegxQJm0KdBaCno6oErFEKpAamFLSwBaaipLtCp6mqv8C5KZ22wKimsbfGI6u8C4GhDAZCAgIrdQjW2NoJfwvXKdnbjt7l2gt%2F6SPm7Ojk7%2Bvt8yLm4Y7j3wv6cBTc4QNnr9%2B%2FPQHvUcjHjcGaUBT8YQsQUdzBhQIq1pFYjmI8OAc40tMIEsHFbCTh%2F5icmJLQAVEsP%2B4JeTKjzD0w1bVUI3Lgzpc1f%2BYM1Q2YOWBqTB1tZ1Qb0gNKnTLthxTBTYxXeTbNanVr1atL93kVtzAFAKlpuo5QMEqhAABDZyYoYPDP3G9xXd7tmJcnXXV9QyoMECDwgr%2Fv4F5cc3iiYbeFF0d0S3AfZcOIYfSkAABAgZtq8nb%2BbBGbZ9AHVupErXok6s2jUYs%2Bbfdi7Nox%2F7T2%2Bdo27X0H8zQgQJVs8bRg0aq8enZz6gUZR3SuDDJ51pDAmi9WK735U%2Bvfx4o9Xh2Yg4fvIhfkK1kgBcIJMDnamz4wfZ%2FyAd7HiMvuYIr57WEVYvhxw08KhPUnDzhe2x1Yn2T7nZLbfDUZIFuFrGFoV4AYWbjhNx7WkVc2IYIUn2mkzcchibJxSFiKJq4oQIkz7SZCCAAh%2BQQFCgAUACwBAAEAzgALAAAF%2FyAFUSTpQFJTkssirtQJqWs7ws4JU%2FZd5jNYDyeilYYr4M62UwoXEJ%2Fp9YzidFVprJi9BmsM6%2B7pYMAOh22N0jCv0OpjzF2Cl9f3d9rxbJ%2F3ZHQkdn2CFIRrfnpxLGyGiHJ5dYB4j5Q%2FFClChgQEBoYUCQmcnoaiCqAEBaCiqas7Cagwna8wsamfsKM7qqa3vLUrCQukucKtwKyys8FHhggIDAYwAgItZ9HTK9ULCX%2FS1NYueuDb4t%2FaJdzjk%2BXq5%2BTpJNzeegvyFPTo4d375v3x%2BNUrgWySKGoBePw5aE6hHobqErIbdADiPIk7DiAYOE%2BAwzcW83mceEgjx3wYH%2F%2BerPaRYkiWJNG8TGlw5ciFHNGQFLkTDagA1jIi2Mkt4wGiQb%2FtKKqUn1CSAAAktbd0arsdQHserdpzKFejE9MkKCDwzz2EIXWSNZf2KL5qbc9uCxB3bcS4b62d9JkXoEG7F%2FHCCEB3L4%2B3hf2FoqDgZNQCMSs6BgAZJ8LK2Gy2HLQx3GaZmiOHfCx6MuaaMEhnnPnZ5OXSx0AxfePVqdmvtwdbpbgz61OPK3zn%2FgcWN1Xbx4PvLtl7uc4VDFDljbUQMMq2Yz0rUEyCMPUz7jp%2B%2F4vWcPjrJxO41c79%2BnZ7099PkvtuPMXz1%2Ba2finAQM8F8nXkn1A2DajSawsFKJIcgaiZw6BLJxF2mksKVvNgSZ05KFqFAUzIGUchAAAh%2BQQFCgAUACwBAAEAzgALAAAF%2FyDVUBJlUk4qjSe1LBDUouTswnYqz28867be7gTkwYamYkv4cyBNvZwziGs%2Bb76W8sTUUq4LxnNBRTFmhwNtKTq30muuGa12GBnuE9zOduRNe3d%2FFIFsDYOFcod0cVBtjHyKiHVGfpA%2FVwlhMwQEBoMmCoOdn0GiNgQFoJqgqaubnKo2CactpIMLtK2yM7qopS0JrJyeuC67LMG1tgXJNm8IDAYzAgIvaNHTLdXXbxTS1NYJ2ODb4uTaJ9xk0OXq1ux62eHdet%2FpJtzj3u755%2Fz4KOhDR2%2FfiQRP0uSiFsAFHWHhHL45ANGcRD0UDeZrGE9PRXUcH2oUKOCix5HVTP8Syhix48qP%2FlSmgUlSJkuLLtXYSAOK284DPa39DJqTpw2fdIj%2BdEmSqcKjQukwRTpxatSqUJ0esOoUgdQC4WiqWQDW3MKJCcq%2BE%2BtC7Ua2ZMOOVBgwQAC4AQXcnUshQd29XxninWF3sDm43mgCAFCgKAKUIdGiLOmUZsrKk21apixyxuLGnVt8LqqYMemRo3dajowR5oFoJc0uzTqbXm3ZUmnntr0bN1bev31jXBDbxOJ%2Fw3UH7ztvG%2BCJ%2FQQ%2Bb%2F2X1sO80wH1dStdLEXsYpuDZBtdL1zu5vkuqK6A4OG54vsqaI8z9DsDpOnfr6zfH377%2Fp0Wzn%2BSDZiTfAYCSBISgW9YZw6DgLw2kl2goaGJCSEAACH5BAUKABQALAEAAQDOAAsAAAX%2FIEU5jiSeIyU1KLUsENSScvvWKGnaMC7qvN7M4RPdirRgbFh0wYZEJbR5ZEqtNsbux0ihXo0u6nDwnsDiE9lspIRbawfvPS7Lv%2B60KD7XU%2Fh4Dn6AZ3lwdn2HbE50aoh4jXtlPgwJgigJmX4EBAZ%2BFAkKm52foZ8EBS2gmqqkqqwtqKqgC6MFLC2wKKilorGumKa%2Ft6%2B1rcS5vrGeCycMCJ9lCwYtAgIvcNDUKNbYdQzbJ93N3%2BEi3QmH09XX6XXr3O2H4OwL7o708fbq5hTj8%2F3%2BlatHToQCCoMO7OMWwMWhTNUaFpQEMZ7DOhXFSTyE4N45ARcddYwYkqJHfyAn%2F%2F45kPFjyZUtUb4kE9PaTJYnBWxEweDON1XdVJH5FFSdqgDXhB4gmnTe0abvgEJVg0AlSqsHqkrFqvApVz8AAEzdUxWkvlkJF6RiGJOMWnZtFa7VGBfeiQAB6s79uNCRXRF49UasGzDvSbd7%2FRlWl1hn3HziBLQtQmakRayWI9%2FMfC5AAZU0T4b9%2FFA0ANJ1OFMYDRpnC9alX59uHRP2O9OoHdWerSib1aJR6ym1ihTzArN3x648LtwoirDKszI%2FAZ3r9MjWZUfv2nxMApXVhSJ42A8vhYMDLaL32y%2FseYCDDyss33A9RfrvMRaOmyCgZPl%2FURAYgPjZt9x%2BAKKAADJLBuqUmySq4fXgcg0KYABtKllz4UMNekYbbh%2B2IGFrfQG2k24VbpjaSSOKl5OFtFEQAgAh%2BQQFCgAUACwBAAEAzgALAAAF%2FyAlUo00no7UnCJDQSzlwPEC0Sh%2B2ro417zYr%2FYS9kRB1pCVzAGPMmhztNzdjLUVK8FwEF2sw8LLpIBPYvLOHEt%2F2%2BN3OF4%2Bj9x1uHq0YM%2F3SH5odGt2IniFbYYHB4B8MQQGWiwKhhSRli2QBZmCIwScNZWQBjEiozGSopkGmagnoKYUryehW7QjtpSWmCycCoqlLAIUfSwIDMInxAlwyiPExmjJMQIL0nfUwwvNYdrL18HV4d7PItbd0%2BYU0eLb6XcL68TAIwbIcPAiAWL5MQEGsB3iVi2gv2EGa%2Bhjl5DJQoACKRygsFBAwzsU%2F10cWHGjxIwII07siC1BvxgIIt%2ByU3lym6mW4EylNGVNpsqacGiyXEDMZc5xL2%2BqnAn0p88RzUQyKPCvmLNxC8XMczpnqtJ1AUCqq0Z1K4usUeVBVcT03dOvWuPNI3hiUoyHHouRNMV2mUcxFQuI7ApNr6yIAvzOybuX8METAAQPmjs4RuKIUGBC26kzaGWjMTFPfpkJ55zLn4uGPnqCKOlDpjOXqfoPQT2vy1yfjf1aLdfah75Bk%2B2t7IkAvGHvxi1xaVPiUo%2BTrRbc9rBZbaJHhCiLMRq%2B5%2B6mzb6XuMW9gLUbDgM9ZHTvcetCi1ve7t4QACH5BAkKABQALAAAAADQAA0AAAX%2FICWOZGmeaKqubOu%2BcCzPNMkwEFQ6lNSUi4Vu55CYgjnikIRcihwOp6ipPAqlUCmFSspak93oFysGXqtm8Cj7sy1OCQSFx6Q0GKXDYW6%2B5%2Fd0I29%2BJHp8dYQjhoFTdniFgECOf4eCk5CVjYkiiyebFJ2Ij4qRoiUICRSjIwUHbSMJsasUBAQGs1OztbclsQq4BAWzsQnAvCSoxSW1wqcJv8vBuLLRxyOo0MvWsMrLzb3ZJNImCUHRB4witebIzwYlAgILqYUIDO8k8fOnqvgj%2BvRI3YMnL6AIOQPzFfyT8N9CSA1FAGToT%2BJDgRUpTISYcSNGgm%2BWCdjyZ59CkpBi%2FxFEScqkQ5acDri0CBPUAZUnQ5LC%2BVJnzJkaR%2Fq0CTReTT08aQ5FajDo0ZtNjQ4tMIDAUj249JnAakIrw67ytsoEe3UsSLFZw5YkK3ZoULd63HqFJFctXRMA7LIakNQmgwIE%2B%2B75G7jpngWAFQI93BGA4C2JHT5GXLhkZIuTMwYIIFjm5aCZS2ye%2FNmjiAQGDsyKGxVAgatAAbiG3VT26z99peZJVsL2VVQrr%2Fb1jbv27JLGb6dsrXxncrcKVLdlu%2FZsdcXTrd%2FV3pL6duzXR%2BRdbBY83ZHmu3NnpYpfRAqbKTRF2FHA4%2Ffx%2BtJfabgff4qBKcBQaSMZphqB9yFoIERhCiW4koAuQNXbcctN2NxPUQlggHAZbogbhA55SFeHHMJDoSLYECSicyoKB6IIm11oE3AkxOhWDTjmqOOOPPboYwshAAA7' 
			+ '" alt="Loading..." /></div>')
				.css({position: 'fixed', 'z-index': '999998', top: '50%', left: '50%', height: '13px', width: '208px', display: 'none', margin: '-6px 0 0 -104px'})
				.prependTo('body');

			// click to hide
			$('#sldrOvrl').click(Taobao.Sldr.swch);

			// update status code
			code ++;
		},
		hide = function () {
			$('#sldrOvrl').fadeOut('slow');
			$('#sldrLdr').hide();
			$('#sldrWndl').hide();
			$('#sldrChk').removeAttr('checked');
		},
		show = function () {
			var nfoArr = {
				link:	sldrArr['link'][sldrNdx],
				title:	sldrArr['title'][sldrNdx],
				thumb:	sldrArr['thumb'][sldrNdx],
				image:	sldrArr['image'][sldrNdx],
				sellr:	sldrArr['sellr'][sldrNdx],
				price:	sldrArr['price'][sldrNdx]
			};
			$('#sldrOvrl').fadeIn('fast');
			$('#sldrWndl').hide();
			$('#sldrLdr').show();
			var preImg = document.createElement('img');
			preImg.src = nfoArr['image'];
			preImg.addEventListener('load', function () {
				// Resize
				var pgSz = getPgSz();
				var x = pgSz[0] - 150;
				var y = pgSz[1] - 150;
				var imgW = preImg.width;
				var imgH = preImg.height;
				if (imgW > x) {
					imgH = imgH * (x / imgW); 
					imgW = x; 
					if (imgH > y) { 
						imgW = imgW * (y / imgH); 
						imgH = y; 
					}
				} else if (imgH > y) { 
					imgW = imgW * (y / imgH); 
					imgH = y; 
					if (imgW > x) { 
						imgH = imgH * (x / imgW); 
						imgW = x;
					}
				}
				
				$('#sldrImg').attr({src: preImg.src, alt: nfoArr['title'], title: nfoArr['title'], width: imgW, height: imgH});
				var wndlW = imgW + 30,
					wndlH = imgH + 135;
				if (wndlW < 300) {
					wndlW = 300;
				}
				$('#sldrWndl').css({marginLeft: '-' + parseInt((wndlW / 2), 10) + 'px', width: wndlW + 'px', marginTop: '-' + parseInt((wndlH / 2), 10) + 'px'});
				var tmpNdx = 0;

				// Info
				$('#sldrInfo').html('<a href="' + nfoArr['link'] + '" title="">' + nfoArr['title'] + '</a><br />&#21334;&#23478;&#65306;' + nfoArr['sellr'] + '<br />&#20215;&#26684;&#65306;' + nfoArr['price'] + '<br />&#24207;&#21495;&#65306;' + (sldrNdx + 1) + '/' + sldrCnt);

				// Prev Thumb
				if (sldrNdx != 0) {
					tmpNdx = sldrNdx - 1;
					$('#sldrPrv').attr({src: sldrArr['thumb'][tmpNdx], alt: sldrArr['title'][tmpNdx], title: '<= ' + sldrArr['title'][tmpNdx]}).show();
				} else {
					$('#sldrPrv').hide();
				}

				// Next Thumb
				if (sldrNdx != (sldrCnt - 1)) {
					tmpNdx = sldrNdx + 1;
					$('#sldrNxt').attr({src: sldrArr['thumb'][tmpNdx], alt: sldrArr['title'][tmpNdx], title: sldrArr['title'][tmpNdx] + ' =>'}).show();
				} else {
					$('#sldrNxt').hide();
				}

				$('#sldrLdr').hide();
				$('#sldrWndl').fadeIn('slow');
			}, false);
		}
	return {
		swch: function () {
			if (2 === Math.abs(code)) {
				(2 === code) ? show() : hide();
				code *= -1;
			} else {
				if (0 === code) {
					init();
					code ++;
				} else if (1 === code) {
					return false;
				}
				window.setTimeout(arguments.callee, 100);
			}
		}
	};
}();


/*-----------------------------------------------------------------------------
 * Taobao Control Bar
 *-------------------------------------------------------------------------- */
Taobao.Ctrlr = function () {
	var defCss = {color: '#FF4500', font: 'bold 12px Verdana', position: 'fixed', border: '0', right: '10px', bottom: '10px', 'z-index': '999999'};
	return {
		init: function () {
			if (false === SHOW_CTRLR) {
				defCss['display'] = 'none';
			}
			$('<div id="sldrCtnr"><input type="checkbox" id="sldrChk" />&nbsp;<label for="sldrChk" title="SliderShow for Taobao Search Results">SliderShow</a></div>')
			.css(defCss)
			.prependTo('body');
			$('#sldrChk').click(Taobao.Sldr.swch);
			GM_registerMenuCommand('Taobao SliderSearch - Hide/Show Control Bar', this.swch);
		},
		swch: function () {
			$('#sldrCtnr').slideToggle('slow');
		}
	};
}();


/*-----------------------------------------------------------------------------
 * Initialization
 *-------------------------------------------------------------------------- */
(function () {
	if ('undefined' === typeof unsafeWindow.jQuery) {
		window.setTimeout(arguments.callee, 100);
	} else {
		$ = unsafeWindow.jQuery;
		Taobao.Ctrlr.init();
	}
})();


/*-----------------------------------------------------------------------------
 * Functions
 *-------------------------------------------------------------------------- */
function $X (exp) {
	exp = document.createExpression(exp, function (prefix) {
		return document.createNSResolver(document).lookupNamespaceURI(prefix) || document.documentElement.namespaceURI;
	});
	result = exp.evaluate(document, 7, null);
	res = [];
	resLen = result.snapshotLength;
	for (i = 0, j = resLen; i < j; ++i) {
		res[res.length] = result.snapshotItem(i);
	}
	return res;
}

function getPgSz() {
	var de = document.documentElement;
	var w = window.innerWidth || Taobao.Sldr.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || Taobao.Sldr.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
	pgSzArr = [w, h];
	return pgSzArr;
}