// ==UserScript==
// @name        Reddit.com - Extract links from comments
// @author      aminulz@gmail.com
// @version     2011-12-07
// @namespace   http://userscripts.org/scripts/show/119758
// @description Extracts links from the comments and places them on top of the comment page
// @include     http://www.reddit.com/r/*/comments/*
// ==/UserScript==

// Main script function
function main() {
	var noFavIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAaVJREFUeNq8lLtLA0EQxr9bLgnEQyNeIYIWiqKliiLYCNoIiiCK2IaAAUUELfwbjGAREcRHEbCwSGHhAwsJsRGCIlgIISCC5QmBBMTzuLWYTczDeJeX0/zYY27mm9mZlTjnnHOUtHdN0zQtc5qcgAEDRvCF2JWACRPmRwfccMMduoYOHbq/D0444QRaVFVV1dLxZdiy8Tjxopv4dkicaxZhZomhNjAwsCVOAiXJKjKzJ2BrIf/cuUMMJ4mnx0RXU77f+qZVZJsdOFomJiNE6QYyZMhopZYX+kc8xBFPjQTs+QR/PhkwYJTyHxOd8btqdAVWpgwQzZRQt0rc16sXkKn014pHE8TUPfEqSnQE7UqXK6t4fltUeEIcbifGvOVGYjYkypBzCABYCRP7G7KJGVglF1rmL9ID8WyG+LqRTZxGGum6C+Bi2G7Fw4OenEgk5M+ZqWQGCvecgYHFMvsYr3Z/rDsg3vQsAQCDYtgW1+ovIM8Onol3Q2ILHMSnwD8J8PWKPf8kNorE51NFriZMmDV/B7yXxOgX8XGXGJguSqxAgWId8XsAN2V4uAHSRRUAAAAASUVORK5CYII%3D';
	var linkCount = 0;

	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '#extracted-links { margin-bottom: 0.5em } #extracted-links-title { cursor: pointer } #extracted-links td { padding: 2px 1em 2px 0 } #extracted-links tr:hover { background: lightyellow } #extracted-links tr:hover i a { color: #336699 } #extracted-links tr:hover i { color: gray } #extracted-links i { color: lightgray } #extracted-links i a { color: #98BBDF }';
	head.appendChild(style);

	var div = document.createElement('div');
	div.id = 'extracted-links';

	var title = document.createElement('div');
	title.id = 'extracted-links-title';
	title.className = 'title';

	var table = document.createElement('table');

	// Find all links in all loaded comments
	$('p.tagline').each(function() {
		var author = $(this).children('a.author').text();
		var score = $(this).children('span.score.unvoted').text().split(' ')[0];
		$(this).siblings('form.usertext').each(function() {
			var commentId = $(this).attr('id');
			$(this).children('div.usertext-body').each(function() {
				$(this).children('div.md').each(function() {
					$(this).children('p').each(function() {
						$(this).children('a').each(function() {
							var tr = document.createElement('tr');
							if ($(this).prop('host')) {
								var favIconSrc = 'http://' + $(this).prop('host') + '/favicon.ico';
							} else {
								var favIconSrc = noFavIcon;
							}
							var favIcon = '<img width="16" height="16" src="' + favIconSrc + '">';
							tr.innerHTML = '<td><a href="#' + commentId + '">#</a></td><td>' + favIcon + '</td><td><a href="' + $(this).attr('href') + '">' + $(this).text() + '</a></td><td><i>' + score + '</i></td><td><i>(<a href="http://www.reddit.com/user/' + author + '">' + author  + '</a>)</i></td>';
							table.appendChild(tr);
							linkCount += 1;
						});
					});
				});
			});
		});
	});

	title.innerHTML = 'comment links (' + linkCount + ') [-]';
	div.appendChild(title);
	div.appendChild(table);

	panestackTitle = document.getElementsByClassName('panestack-title')[0];
	panestackTitle.insertBefore(div, null);

	// Handle show/hide comment links
	$('#extracted-links-title').click(function() {
		if ($('#extracted-links table').is(':visible')) {
			$(this).text('comment links (' + linkCount + ') [+]');
			$('#extracted-links table').hide();
		} else {
			$(this).text('comment links (' + linkCount + ') [-]');
			$('#extracted-links table').show();
		}
	});
}

// Inserts code into document as script element. This allows the code
// to access jQuery already used in the document.
function addScript(callback) {
	var script = document.createElement('script');
	script.textContent = '(' + callback.toString() + ')();';
	document.body.appendChild(script);
}

// Different ways to access jQuery depending on browser being used
if (undefined === unsafeWindow.$) { // Chrome
	addScript(main);
} else { // Firefox
	var $ = unsafeWindow.$
	main();
}
