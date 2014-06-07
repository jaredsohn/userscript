// ==UserScript==
// @name				AMALL
// @namespace			AMALL
// @description			makes giving back Llamas on deviantart.com way easer
// @match				*://*.deviantart.com/messages/*
// @match             	*://*.deviantart.com/modal/badge/give?badgetype=llama&*
// @author				http://dediggefedde.deviantart.com ,http://nuckchorris0.deviantart.com
// @downloadURL			http://userscripts.org/scripts/source/180137.user.js
// @updateURL			http://userscripts.org/scripts/source/180137.user.js
// @version				1.01
// ==/UserScript==
(function(){
try {

	var statuses="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAPCAYAAACshzKQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAAB1xJREFUeNrsmM2LJGcdxz%2FVXd3V1dXTMz3vmdmd1UnMG%2BLFNxA0JOQiBF08qBchqygigjGXaAY2uDBCCKwgovEgBnIxF1kkJw9ZRT0EPekpSEiWkN7Z7Z2u7up6e17LQ03XbKd7X%2F4AH2i6u6o%2FVV2f%2Bj7P83vKKYqCj7ZXX3xibuP3f%2F5Xh%2Ftob7x%2BeY79xreevy%2F27asX5tjPP%2Fn7%2B2JfvnIwx75w%2FvC%2B2CsH8%2Bz5w3nWuV3WVNLuZkDQXUeJhLrrEU9Cjm6ld5U2lbS5fZbVtS3yLKXptQiPbzC4%2BeFdpU0ldXuPEix9HCXHuG5AMnmfyfi%2Fd5U2lbS3vs%2F2yi6JiGk1WhyN%2Bnw4vHZXaVNJ6%2Fv7rOzuIuKYRqvFqN9neO3anLRK1qsvPlHsbgb4wQoqj8iERmkLQMOt0fY9klQwCLM5YW%2B8frnY3D7LSm%2BDeDJC5BlaS%2BLJmJXeBn47IIkjwuHNOWFvX71QdHuP0g7OIvIBSkYYIxD5gHZwhqbXQ%2BTHJJP354S9fOWg2FvfZ6O7xSgNSUWC1IJxGrLR3abTWiJKR9wY9%2BeEXTk4KNb39%2BlubZGGISJJ0EKQhiHd7W1aS0ukoxHjfr8S5hRFUYlqej5JkqCNrQ6qTYFUBqksnXYDt%2B4wHItK2FRUu73EJArRWgFQFBZrLVpLlJS0%2FDau22Q8ulUJm4pqeqvk6RHWTllDURiMzjAmp9Fcpl5vkcYfVMKmopb8ZYbxLbQpWWMNtrAIlaOMJPA6NF2PQXRUCZuK8peXiW%2FdwqiStcZQWIvKc4yUeJ0OrucRHR1x%2FvDQqU2l%2BMHKnKivv%2FDn6rO1BYMwY8EQx0pvY6GooiiPZYxmFA6q77e3dnB2oajCmpMLkKTxNYrCzLEb3a2FouwJq43iaNTH2Hm2u7W1UJQ15W%2BNUoz6%2Feo7gPObn36p2N0McOs1JqlcKOp3F58kl4Y4VbS8OttrbcJI0Hvsq2xun8V1GyRxVIn68leerdg%2F%2FuFXCJGRpTFNr8Xa%2BgNE4yEfO%2FMfur1HqddbiPy4EvWpzx1W7L%2F%2B9gO0ipFiiNsI6HQfIkv6%2FGW8w976Pg23SZSOKlHfffq5iv3Fm5fIZEqUjWk1fHZX9xjGAx75ZzlGuc0m6WhUiXr6uVP2zUuXkGlKNh7T8H1W9%2FaIBwNq01Slua5Sc7sogO9cuoo2FqUtw7FAKjOTqiyNsdbMiQL42jd%2FiDEapSTReFilb5oqKUZYq%2BZEAXzmi7%2FGWoE1gnhyE6PzmVTFWYS2ek4UwI%2BfuYjUEqUlYXSMMnImVVkUYbWeEwXwzMWLaCnRUhIdH2NkydYAtEzJhMbYYk7UtP3olb%2BjtCWXhkl6esFZGiNlTlEUWGsXskpKjNHkeUYSj0%2B3qzFaxUCxsJsBGJ0jlSaONVIcV9sTEZPJtDxvcYfzGolWGpHKKoEAIo6RackWd%2FjPRkqU1qRSVgl0AZxaHWsLtLG89rOnAHj2pbcq8JXnvlDNjo4D7ZZLLsqLq9fdk%2FFJ37GOkTJDK4njOPjtDnlWliGO41IUBqvlHVklJ%2BS5wXGg0VxGybK712sutrAope7IpiJBSQ0OtL0OmUzKhLhuOZDfhRVJgtQaB%2FA6HWSSlMmK44RazSEXpnrd3jKhyYVBKEPHb9Bs1Kt90fiYWq1GnqXkWcobr1%2BeYX%2F7y58g8oxcSNrtDvW6e3rc5DqOU0fJCCUj3r56YYZ9609PESeaNDP0VlrU6l6173hyk5pTI5MJmUx4%2BcrBbDd87QIilchMEXTbNN1mtW9y8yZOrYZMEmSScOVgln3twgVSKcmUottu4zabzJQO2%2Bttrl2fYEw5cD1%2F%2BR8V%2FOK3P404GaceObeCtcVM6bC%2BscP1%2FnunM8nJe5bFaCXJRZmc%2FQcfwxg9UzosLT%2FEaPjv09nvZFbMsog8N6RZuf3Bhz6JNXKmdNhZ3ePdo3eqWVbbMt1xMkFJjczKYz328ONoo2ZKh9W9PY7eeafqhlaXbDKZILUmO0ndw48%2FjlGK84eHTnWbpTL4nssgzJDK8tL3PovSFnPSPQEeWG%2FTaTeI4tluo5Sk1QoIhzdQqtynlUQbg9blxW5uPkDLb1ezZjU2GEGjuUIaX0MIAUCeG7QukKo875ndTRrNZUQ2mD2vliz5XW6M%2BhWrpMZqiz65uds7WwReh3EazrBaSvxul1H%2FlJVao61Fndzsna0tvE6HNAznK%2Fhe10NIw41hRhgJhDK49RqB77K9dipqUQXfXV5FKcnx4DqTaEguJK5bJwg6rK3vVKIWVfB%2BsIPRGXH0LmEYkmaGZqPGynKDpZVPVKIWVfCrnQ2kFvTDDwjDEJkp3EYdv9vizNq5StSiCr6zsYEWgvCDks2UolGv0221WDt3rhI1U8F%2FdG3Y7TSRypDmGt9z8Zr1Kk33WhsGnS7GaLI0puUHMzXYvdaGnr%2BBNaJcGzaWqLt%2BlaZ7rQ2X2z2klqQixvcCPNer0nSvtWG710NLiYhjvCDA9bwqTQvXhv9%2F6nDvpw7%2FGwBsFTy4%2FVM01wAAAABJRU5ErkJggg%3D%3D";
	

	if (unsafeWindow.location.href.indexOf('messages') !== -1) {
		var contentEval = function(source) {
			if ('function' == typeof source) {
				source = '(' + source + ')();'
			}
			var script = document.createElement('script');
			script.setAttribute("type", "application/javascript");
			script.textContent = source;
			document.body.appendChild(script);
			document.body.removeChild(script);
		}
		var sty=document.createElement("style");
		sty.type="text/css";
		sty.innerHTML='span.amall-give { background-image: url(' + statuses + ') !important; background-position: 0 0 !important; } span.amall-working { background-position: -15px 0 !important; } span.amall-already { background-position: -30px 0 !important; } span.amall-success { background-position: -45px 0 !important; } span.amall-error { background-position: -60px 0 !important; }';		
		document.head.appendChild(sty);
		
		contentEval(function(){
			
			DWait.ready(["jms/pages/messagebox.js"], function () {
			
				var Llamacheckall= function(){
					$(".amall-give:not([pruf])").each(function(){
						if(typeof $(this).attr("pruf")!="undefined")return;
						
						var u=$(this).parent().find("a.u").html();		
						if(u==null)return;
						$(this).attr("pruf",u);
						
						DiFi.pushPost("User","getGiveMenu",[u],function (success, data) {
							if (success&&data.response.content.html.indexOf("Give a <span>Llama Badge")===-1)
								$(".amall-give[pruf="+u+"]").addClass('amall-already').removeClass('amall-working');
						});
					})					
					DiFi.send();
				};
				setInterval(function(){
					if ($('.mcbox.mcbox-list.mcbox-list-generic .mcdx:hidden:not([amall])').length > 0){
						$('.mcbox.mcbox-list.mcbox-list-generic .mcdx:hidden:not([amall])').each(function(){
							$(this).attr("amall","1");
							$(this).addClass('amall-give').css({
								'display': 'block',
								'background-position': '0 -15px'
							}).attr('onclick','').unbind('click').bind('click',function(e){
								Llama($(this).parent().find("a.u").html(),$(this));
								return false;
							}).bind('mousedown',function(){
								return false;
							});
						});
						Llamacheckall();
					}
				},1000);
				var Llama = function(u,s){
					if(u==null)return;
					s.addClass('amall-working');					
					DiFi.pushPost("User","getGiveMenu",[u],function (success, data) {					
						if (success) {
							var clicky = $('a:contains(Llama Badge)', data.response.content.html).attr('onclick');									
							if (data.response.content.html.indexOf("Give a <span>Llama Badge")===-1){
								// [STATUS] ALREADY GAVE A LLAMA
								s.addClass('amall-already').removeClass('amall-working');
							} else if(data.response.content.html.indexOf("give Llama")==-1){
								var userNum = /Badges\.buildModal\(\'llama\', (\d+)\)/.exec(clicky)[1];
								$('<iframe>').attr('src',
								'https://www.deviantart.com/modal/badge/give?badgetype=llama&to_user='+userNum+'&referrer=http://my.deviantart.com&amall=1').css({'display': 'none', 'height': 0, 'width': 0}).appendTo('body').load(function(){
									s.addClass('amall-success').removeClass('amall-working');
									// DOUBLE CHECK THAT IT SENT
									DiFi.pushPost("User","getGiveMenu",[u],function (success, data){
										if (success) {
											if (data.response.content.html.indexOf("Give a <span>Llama Badge")!==-1){
												s.addClass('amall-error').removeClass('amall-working');
												console.log("Llama not given\n"+data.response.content.html);											
											}
										};
									});
									DiFi.send();
									$(this).remove();
								});
							}else{						
								console.log(data);
								s.addClass('amall-error').removeClass('amall-working');
							}
						} else {
							// [STATUS] ERROR	
							console.log(success,data);
							s.addClass('amall-error').removeClass('amall-working');
						}
					});
					DiFi.send();
				};
			});
		});
	} else if (unsafeWindow.location.href.indexOf('badgetype=llama') !== -1 && unsafeWindow.location.href.indexOf('amall=1') !== -1) {
		document.getElementsByTagName('form')[0].submit();
	}
} catch (e){
	console.log('ERROR! '+e);
}
})();