// ==UserScript==
// @name          Digg.com Story Mirrors
// @author        SpookyET
// @namespace     http://www.studioindustryllc.com
// @description   Adds links to DuggMirror (http://www.duggmirror.com/), DuggBack (http://www.duggback.com), Coral Cache (http://www.coralcdn.org/), and Wayback Machine (http://www.archive.org) to every headline on Digg.com.
// @source        http://userscripts.org/scripts/show/7902
// @identifier    http://userscripts.org/scripts/source/7902.user.js
// @version       1.1.4
// @date          2007-10-26
// @include       http://digg.com/*
// @include       http://*.digg.com/*
// ==/UserScript==

(function(){	
	function addStyle()
	{
		var headElement;
		var styleElement;
		var style =
			'li.digg-it,' +
			'li.undigg-it,' +
			'li.dugg-it,' +
			'li.buried-it' +
			'{' +
				'float: none;' +
				'margin-top: 1px;' +
			'}' + 
					
			'.news-summary' +
			'{' + 
				'margin-bottom: 10px;' +
			'}' +
			
			'li.digg-mirrors-container' +
			'{' +
				'white-space: nowrap;' +
			'}' +
			
			'li.digg-mirrors-container:after' +
			'{' +
			   'content: ".";' +
			   'display: block;' +
			   'height: 0;' +
			   'clear: both;' +
			   'visibility: hidden;' +
			'}' +
					
			'li.digg-mirrors-container a' +
			'{' +
				'display: block;' + 
				'float: left;' +
				'width: 10px;' +
				'height: 10px;' +
			'}' +
						
			'a.digg-mirrors-dugg-back-mirror-icon' +
			'{' + 
				'margin-left: 1px;' +
				'background: no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAABPUlEQVR42j2PsU7CYBgA7//5i61NpUaUgg4OMrRGSePiI7CYuPkUjhDewsTVTRMd7dDd3ZDUxaExxsmEoAJOBpB+Dkanu/FOXRsj3yKgFPwRfh1QSmEg0d8iOM0mWycnUK0yA2bAchhSPz6m8DzmIhiUYi2O2T09pVyr8Xh+jlOpsN/pYAcBb3nObDLBiAivd3eU63WqcYwXhgStFgvg4eKC0fMzXqmEujRGZiIstGYlitg+OmI6GpEnCdPBAEdrbEj0X7DjeWyEIV/DIcqyWN/ZwbVt9O8aGhH8MOTw7IxGu81TmvKRZRx0u7R6PbTrIiJolMKPIuwg4ClNmQ4GjPt93rOM1b098H0KEdSVMVK4LmZzk/HLC0vzORowvo/VaPCZ57iLRaJujLmdi1AUBapU+m8SEQoRtNZYcP8DP4x3gFrOVxsAAAAASUVORK5CYII=) center center !important;' +
			'}' +
			
			'a.digg-mirrors-dugg-mirror-icon' +
			'{' +
				'background: no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAEZ0FNQQAAsY58%2B1GTAAAAIGNIUk0AAHolAACAgwAA%2Bf8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAF%2FSURBVHjaJM6%2Fq9pAAAfwr5cQbQJnBE%2BHJ0UQIVOXgrh0cJJHwalDt46dSvc3dOjWtZtL1%2Fc3FOnQrYqPiNAlYsQKgj8bPHIXzXHXoZ%2B%2F4FMYDofgnD9XSjHf95%2FK5XKhWCz%2B8DyPKqVwu92ibrf73pZSgjH2qVQqtY7H47vL5fInCIJeEASQUiKKopdpmn6x6%2FX642AweOu6Lkaj0c8wDL8xxmStVnvGOcf1esVsNvtcGI%2FHptPpQAiB%2BXwOzjk8zwOlFJvNBkIIEEJAhBCXNE0RxzF2ux0YY6CUYrvdghCCdrsNrfVfe7lcvlmtVh%2FzPK8CiGzbftXv95utVgvGGCwWC0gpYSulRkmSZEqpe9%2F3H4wxX6WUH5IkgTEGp9MJzWYTdp7nL3q93iOl9G4ymfzSWmee52G9XkMIAdd1%2Fz%2B11q%2Br1epdo9GAZVkPaZpW4jjGfr%2FH%2BXzG4XCAZVkV23Gc39PpNHQcR0spvxNCjmEYPmVZBmMMpJSoVCr83wBXhcvVuvlWzQAAAABJRU5ErkJggg%3D%3D) center center !important;' + 
			'}' +
							
			'a.digg-mirrors-coral-cache-icon' +
			'{' +
				'background: no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAEZ0FNQQAAsY58%2B1GTAAAAIGNIUk0AAHolAACAgwAA%2Bf8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAC4SURBVHjajJAxCsJAEEX%2FBg9gYyEodilT7AHEC8TCItVcIidwT2BvnzqFOUByghRpAilsNmBhoZ7gWxjNGkT98BkGHm9gFEmYwjRZk03KUzmGEz3V19APz2ZlfCWp2KRKZvgSCaRVMCD%2BiCeBtL8gCaQFyZjcNiTodndbUu%2F1RVKxJGOQzIdQX%2BYPERcfwWMUsQBYAKylN76ddiEXBslRp8%2BfrUXs0KjI13e8bs4BbACsu%2F0AIL0PALvCrkT4yHQjAAAAAElFTkSuQmCC) center center !important;' +
			'}' +

			'a.digg-mirrors-google-cache-icon' +
			'{' +
				'background: no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAiklEQVQY02MUjfmmFxPFgAuIxnz7jwNcU9BngSjae%2FbDxJUPj1z%2BxMDAYKPLlx8u72wswMDAwASRnrjyIQMDw%2BoW3XfbbfPD5SFchOGCHof2nHmPaTgTpmuEPA8LeR6GsKHSNrp8E1c%2B3Hv2A8QKG10%2BiDjUaRD7Qmsuw51GlMcYnXcE4AqSyRn3Abz4culPbiCuAAAAAElFTkSuQmCC) center center !important;' +
			'}' +
			
			'a.digg-mirrors-wayback-machine-icon' +
			'{' +
				'background: no-repeat url(data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0A%08%02%00%00%00%02PX%EA%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D7%02%11%13!%05%B3%1F%19%E8%00%00%00VIDATx%DAc%BC8y%9A%B8%B9%E9%CB%93%A7!%E4%7B%5D-%07%07%07%06%06%06%06%06%86%03%07%0E0%2CV%D7%B98y%1A%9Cd%60%60hhh%80%93L%0Cx%C1%D0%95f%9E%BE%7D%EB%F1%CA%1A%06%06%86%97%A7N%BB.%9E%CF%23-%ED%E0%E0%A0%A0%A0%00!%01%3FS%20o%11%EC%18%B1%00%00%00%00IEND%AEB%60%82) center center !important;' +
			'}';

		headElement = document.getElementsByTagName('head')[0];
		
		if (!headElement)
		{
			return;
		}
		
		styleElement = document.createElement('style');
		styleElement.setAttribute('type', 'text/css');
		styleElement.setAttribute('media', 'screen, projection');
		styleElement.appendChild(document.createTextNode(style));
		
		headElement.appendChild(styleElement);
	}
	
	function createAnchorElement(href, title, className)
	{
		var anchorElement = document.createElement('a');
		anchorElement.setAttribute('href', href);
		anchorElement.setAttribute('title', title);
		anchorElement.setAttribute('class', className);
		
		return anchorElement;
	}
	
	function getStoryPathname()
	{
		var storyAnchorElement = document.getElementById(
			divElementId.replace('enclosure', 'diggs'))
			
		if (storyAnchorElement && storyAnchorElement.nodeName.toLowerCase() == 'a')
		{
			return storyAnchorElement.pathname;
		}
		else
		{
			return window.location.pathname;
		}
	}
	
	function addMirrors()
	{
		var urlRegex = new RegExp(
			'(https?):\/\/' +                    	   // protocol
				'([-A-Z0-9.]+)' +                      // host
				'(\/[-A-Z0-9+&@#\/%=~_|!:,.;?]*)?',    // pathname
			'i');
		
		var match = urlRegex.exec(headlineAnchorElement.href);
		
		if (!(match.length > 1))
		{
			return;
		}
		
		var protocol = match[1];
		var hostname = match[2];
		var pathname = match[3];
				
		diggMirrorsContainerElement = document.createElement('li');
		diggMirrorsContainerElement.setAttribute(
			'class', 
			'digg-it digg-mirrors-container');
		
		digLinkElement.parentNode.appendChild(diggMirrorsContainerElement);

		diggMirrorsContainerElement.appendChild(
			createAnchorElement(
				'http://www.duggback.com' + 
					getStoryPathname(),
				'DuggBack Mirror',
				'digg-mirrors-dugg-back-mirror-icon'));
					
		diggMirrorsContainerElement.appendChild(
			createAnchorElement(
				'http://www.duggmirror.com' + 
					getStoryPathname(),
				'Dugg Mirror',
				'digg-mirrors-dugg-mirror-icon'));
			
		diggMirrorsContainerElement.appendChild(
			createAnchorElement(
				protocol + '://' + hostname + '.nyud.net:8080' + pathname,
				'Coral - The NYU Distribution Network',
				'digg-mirrors-coral-cache-icon'));
		
		/*diggMirrorsContainerElement.appendChild(
			createAnchorElement(
				'http://www.google.com/search?q=cache:' + headlineAnchorElement.href,
				'Google Cache',
				'digg-mirrors-google-cache-icon'));*/
	
		diggMirrorsContainerElement.appendChild(
			createAnchorElement(
				'http://web.archive.org/web/*/' + headlineAnchorElement.href,
				'Wayback Machine',
				'digg-mirrors-wayback-machine-icon'));
	}

	addStyle();
	
	var divElements = document.getElementsByTagName('div');
	var divElementIdRegex = /enclosure(-?\d*)/;
	var divElementIdMatch;
	var divElementId;
	var headlineElement;
	var headlineAnchorElement;
	var digLinkElement;
	var digLinkElementId;
	
	for (var divElementIndex = 0, divElement;
			divElement = divElements[divElementIndex];
			divElementIndex++)
	{		
		divElementId = divElement.getAttribute('id');
		divElementIdMatch = divElementIdRegex.exec(divElementId);
		
		if (!divElementId || !divElementIdMatch)
		{
			continue;
		}
		
		headlineElement = divElement.getElementsByTagName('h3')[0];
		headlineAnchorElement = divElement.getElementsByTagName('a')[0];
		
		if (!headlineAnchorElement)
		{
			continue;
		}
		
		digLinkElementId = 'diglink' + (divElementIdMatch[1] || '1');
		digLinkElement = document.getElementById(digLinkElementId);
		
		if (!digLinkElement)
		{
			continue;
		}
		
		addMirrors();
	}
})();