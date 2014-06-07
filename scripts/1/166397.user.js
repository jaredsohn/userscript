// ==UserScript==
// @name           YouTube: Love button
// @namespace      Ayashii
// @description    Adds a "Love" button.
// @include        http://*youtube.*/*watch*
// @include        https://*youtube.*/*watch*
// @grant          GM_getValue
// @grant          GM_setValue
// @version        1.00
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
	localStorage.setItem("meow", 1);
	jQ("head").append('<style type="text/css"> \
		.actionable #loveit.yt-uix-button-toggled .yt-uix-button-content{color:#DB3030} \
		.yt-uix-button-panel:hover #watch-love-button .yt-uix-button-text.yt-uix-button-toggled{border-color:#c6c6c6;background-color:#e9e9e9;-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,.20);-ms-box-shadow:inset 0 1px 1px rgba(0,0,0,.20);-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.20);box-shadow:inset 0 1px 1px rgba(0,0,0,.20);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#fff8f8f8,EndColorStr=#ffeeeeee);background-image:-moz-linear-gradient(top,#f8f8f8 0,#eee 100%);background-image:-ms-linear-gradient(top,#f8f8f8 0,#eee 100%);background-image:-o-linear-gradient(top,#f8f8f8 0,#eee 100%);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#f8f8f8),color-stop(100%,#eee));background-image:-webkit-linear-gradient(top,#f8f8f8 0,#eee 100%);background-image:linear-gradient(to bottom,#f8f8f8 0,#eee 100%)} \
	');
	jQ("#watch7-sentiment-actions").append(' \
		<span id="watch-love-button" class="yt-uix-button-group actionable" data-button-toggle-group="optional"> \
		<span> \
<button type="button" id="loveit" class=" yt-uix-button yt-uix-button-text yt-uix-tooltip" id="watch-love" title="I love this" data-like-tooltip="I love this" data-button-toggle="true" data-orientation="vertical" data-unlike-tooltip="Unlove" data-position="bottomright" role="button" data-tooltip-text="I love this"> \
<span class="yt-uix-button-icon-wrapper"> \
<img class="yt-uix-button-icon yt-uix-button-icon-watch-love" id="iconLove" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUBDzk3r00izAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAB9UlEQVQ4y9WUv2/TQBTHn8/OXdOqkrEYEKqQRV1FIvLQgcEUhQGJBRUJ223EH0DmlqpbpOyooiLJgLJ2cFSBVZeOTHQtDI08IJHKA1KH0sSJcZxLQ8yAQA4Y0h8LfMd7p4/efb/vHcC/LubXg+ziI6FLuzzDMJBMkoZhGK4sy1Cr1b7Xs1me0hMhDENmfHysaRhGQxRFcBwHAADQD9De3ntG07TNttc67vVondJu3XVbTV1ffB6BrbXbXpPSbr3Xox9dt3WsqnrVcRyQJGm4Q03Tdzudzu24Z2CMNwghnz3PW46rJxKJt9vb1h0AACaXy0Gj0ZR939//izWD6GviJEnXp0ul8gGqVCqAELo5wms0KozDw6PH0Yv+hdNlkA8AgPL5PIRhuH8xGAMzM9deDIUyP//gS7/fnzgPkGXZg52d19ND3giCMHfeDicnJ5YURfl9sFVVfxMEnbtngWGMX1rW1kJselNTV+9xXMI9A+yDZW0tiKIYPw7FYnEwOytf5jjuaDSMfFpZeXIDAH6uXex8VaubX0ulp1cwxu/+BCOE7CrKLTGTyQxGfg4AAOl0GmzbBlXV1oMgWIrWksmxNdM0VwkhQCk93QbYtg2FQgFM89Uyz/P3WZYNEGJPeP7SQ9M0V1OpVCzs1CqXn3EAAFHz/199A7AGtLSRjJD+AAAAAElFTkSuQmCC" alt="I love this" title=""> \
<img class="yt-uix-button-icon yt-uix-button-icon-watch-love" id="iconLove2" style="display: none;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUBEwsJlmAxAgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAB20lEQVQ4y9VUTUsbURQ978XhJRGCaCldFB3MwGBDFiKzyBgZhkLBrtz4E8xaF4UuAhHcCsWdZGkX1tKfEAgqCEGyMQQpZIZZFBdt9RmM40ztvOmiWJJ2avxatHf57uVw7jnnXeBfL/L7g20Yw8LzhgghIInEyXi1eprNZtFoNH72TXMovLgYDsOQ0GSSj1erJ7Isw3EcAAC9AupsbxNL198H7fZx6PuW8Dwr4JzbMzNrXWCrAedceJ4V+n4r4PzY0vV3juNAUZRehlY+vys6nXzkGoy9pfH416DdXorsS9KOsr9vAAApFAp4fXiYDc7ODq6RRnRvE1VMVdOjW1s2LZfLAKVaH61pPzO+Hx0tdA+eP4DB5wBAi8UiIMTBfdHYxMR6jyktTeuEl5eDd8peLGYr9Xq6R5vYyMj0XdnRVGoxl8v9GWxL1yvCdZ/fih1jH5RabT7SPWls7AWRpNNbgH1UarV5WZaj4zC6uSkSmvaISNKXG4B9ery8/AzAr28XmS+zUgmebmw8IYzV/6pZPL47aBhyanZW9D0OAJDJZNBsNmHp+hvhuos9YMnkanpv7xVjDL7v31zsUql0dRBetqam3Nbk5DfbNOcAQFXV+4X288rKAAB0i///1g8K7qzsa8B0GgAAAABJRU5ErkJggg==" alt="I love this" title=""> \
<span class="yt-uix-button-valign"></span> \
</span> \
<span class="yt-uix-button-content">Love </span></button></span> \
	</span>');
	var video_id = jQ(jQ("input[name='video_id']")[0]).val();
	if (localStorage.getItem("love_"+video_id) == 1)
	{
		jQ("#loveit").addClass("yt-uix-button-toggled");
		jQ("#iconLove2").css("display", "");
		jQ("#iconLove").css("display", "none");
	}
	jQ("#loveit").click(function (event)
	{
		if (localStorage.getItem("love_"+video_id) == 1)
		{
			jQ("#iconLove").css("display", "");
			jQ("#iconLove2").css("display", "none");
			jQ("#loveit").addClass("yt-uix-button-toggled");
			localStorage.removeItem("love_"+video_id);
		} else {
			jQ("#iconLove2").css("display", "");
			jQ("#iconLove").css("display", "none");
			jQ("#loveit").removeClass("yt-uix-button-toggled");
			localStorage.setItem("love_"+video_id, 1);
		}
		event.preventDefault();
	});
}
addJQuery(main);