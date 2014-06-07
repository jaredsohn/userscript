// Fishing menu Alpha
// ==UserScript==
// @name		Fishing Menu
// @namespace	Ar1ma.Gaiaonline.Menu.fishing
// @discription	Adds links for the fishing game in gaia's new site menu
// @include 	*gaiaonline.com*
// @exclude		http://www.gaiaonline.com/launch/*
// @exclude		http://www.gaiaonline.com/profiles/*
// ==/UserScript==

/* Icon data */

var fishingIcon ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd%2BUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAEZ0FNQQAAsY58%2B1GTAAAAIGNIUk0AAHolAACAgwAA%2Bf8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAARXSURBVHjavJbLbhxVEIa%2FOqdP93jGdzvEY8JF4SohkADBA7DkDViy5CVArHkHVmzZsGUBS8RNQAKCCBQUiJPYGdtz78s5VSw8TixmEiQI6d706Zbq67%2FqnKpfzIyHeWVnFyLyv9DNTOaAF57q2odffMC01yWO3yC0%2FiSGT6iqMXmxjFvKmQym6GiIxC6t1ltIfg7RBBjOOXKf6B1eRvwmK6tPklKDzIScQrNTZe9%2B%2FA5ffv8Z6pWd7QNC3OHg9gF%2FXL1EeZgoXMCWMjYez9ja3KRt14j9AUkLTIV2kdMuMn6%2B9hNJAruPtaEJCMbb7396B3pH4a2vexwVid2XN1l7%2BjtU4Xy9ROfCM%2Bx9doN6XPLSm8%2BwcXGdujminH6EVp5UenxcJ3OByg1ZjgOOryvF7i8UxTKxgqW0P1%2FDx17c5NVXu%2BTrMJ0I43qK00T32VXWEtz87RZLWxlKRdEuyNsZFqdYnOJUGA3GOJ2w%2B1TO8V5NWVWcfzpQTiLHg5vzwO21LlmvIRxHVD3TPlS9kpFGXBMo4jn2vmnodNtsnQ8UPlDYMuICZVnRrlu47ALOJ8Lhz%2FS%2FKLD2BqtFxvIomwfu77%2FC4PcxJjUuCNpAikI0j1aJFCOhKJjuCUd70C4CwcFkUlM3DR5HUbTROGLvh8s82VH2OxcYrmxzeGuBwmv9xO2hR%2F0m3q%2FgxPAyxJoR9cRQzXAGuTNWOxv0%2B%2BcYTBJ1kxARTBVnDhfaDPJLHE1%2FYHNY8nt5kd7t9jzQ6w5aRpomo6GFFyMUEZ8rYckTa8htyopfIw1XOOx7ylTgSGACDsDh8zWWt19n%2F8q37Bz%2Biu%2B8QqryeeB4vE45qU8OqhiGp2m2ibZB7h3rnUDh4bifGE1ALSEuomaAQRIQRZsheec5Jv5Rbty8Sta9gujugk5jNWoVFj1KIpIIPmO13aLT8tRVyX7fUUdFfcIBkhRjBkQABzpBsw3yrec5vPEj60tXMHduHmiNQTRClmiFQJEHfDDqqubgdkOTTkKC4ESQGQYEEZm1MAWMKA1h5QVS%2F3P65R804WjBsdA9mq0nIE6om5LBQKkrhyKoO1Fx2hBN4RSPgczQdvojzQifdRnkz7O%2Bex05PpgH9uQRejeOSdGIAOLwzhAUVJHZfRc1g3Cm39spekryq%2FjWS6jsEYrDeWBVG01KJwHNMEuonSBO02eLhslZHnr3WRuycJ5q0KK9NpgHaoqkqKfjZEFguZvGexBPSmmYOCTVSLbDaLDJ6vateWBKRox6z3DCP4%2FKk81jIIpQgbSQ1KWeXF%2BwS5Nis5RyXx33fi9%2F%2ByJujHMXGfa%2BWpBSTeh9gPee5meBf0u5lOAeoRyGRTU0UvoXDsPukwcxRAvqamNBp4kGC2r4H90MahUadxYpTGhMDxioJwfFFig0DOVBmzYBU4xskU0UzBziHixULCHkZ9azbSYi9sRr7z1wT%2BqAq1%2B9f8ebytmu8jCMsDxsq%2F%2FXAN1XT51uCWvoAAAAAElFTkSuQmCC";

function AddStyles()
{
	var head = document.getElementsByTagName("head")[0];
	if (!head)
	{
		return;
	}
	var style = document.createElement("style");
	style.type="text/css";
	style.textContent = "#newmenu #nav .main_panel .panel_games_fishing .panel_img" +
					" { background-position: 2px 0 ! important; " +
					"background-image: url("+fishingIcon+") ! important;" +
					"background-repeat: no-repeat ! important;}";
	style.textContent += "#newmenu #nav #games_menu ul#fishing_links li a" +
						"{display: inline ! important;}";
	style.textContent += "#newmenu #nav #games_menu #fishing_links a, " +
						"#newmenu #nav #games_menu #fishing_links a:link" +
						"{font-size: 11px ! important; " +
						" text-decoration:underline ! importnat;}";
	head.appendChild(style);
}

function AddFishing()
{
	var pinball = document.getElementById('gaia_menuitem_gameshell');
	/* check if we got pinball as an element ^^ */
	if (pinball)
	{
		/* check in case the fishing menu is added in future *ninja* */
		var fishingMenu = document.getElementById('gaia_menuitem_fishing');
		if (!fishingMenu)
		{
			/* adding styles first ^^ */
			AddStyles();
			
			var fishing = document.createElement('il');
			fishing.id= "gaia_menuitem_fishing";
			fishing.setAttribute("class", "panel_games_fishing");
			
			var fishingImage = document.createElement('span');
			fishingImage.setAttribute("class", "panel_img");
			
			var fishingLink = document.createElement('a');
			fishingLink.href ="/launch/fishing";
			fishingLink.textContent = "Fishing";
			
			var complexSub = document.createElement ('div');
			complexSub.setAttribute("class", "complex-sublist");
			
			var fishingLakes = document.createElement('ul');
			fishingLakes.id = "fishing_links";
			
			fishingLakes.innerHTML += "<li id=\"gaia_menuitem_fishing_bassken\">- <a target=\"_blank\" href=\"http://www.gaiaonline.com/launch/fishing?l=bassken\">Bass'ken Lake</a></li>";
			fishingLakes.innerHTML += "<li id=\"gaia_menuitem_fishing_gambino\">- <a target=\"_blank\" href=\"http://www.gaiaonline.com/launch/fishing?l=gambino\">Port of Gambino</a></li>";
			fishingLakes.innerHTML += "<li id=\"gaia_menuitem_fishing_durem\">- <a target=\"_blank\" href=\"http://www.gaiaonline.com/launch/fishing?l=durem\">Durem Reclamation Facility</a></li>";
			
			var clearDiv = document.createElement('div');
			clearDiv.setAttribute("class", "clear");
			
			complexSub.appendChild(fishingLakes);
			
			fishing.appendChild(fishingImage);
			fishing.appendChild(fishingLink);
			fishing.appendChild(complexSub);
			fishing.appendChild(clearDiv);
			
			pinball.parentNode.insertBefore(fishing,pinball);
		}
		
	}
}
AddFishing();