// ==UserScript==
// @name           Check my playlist tracks (Tagoo)
// @namespace      tagoo.ru
// @description    Adds buttons to check all tracks if they are available
// @description    download: http://tagoo.ru/opt/user_scripts/check_my_playlist_tracks_tagoo.user.js
// @include        http://tagoo.ru/*/profile.php?*mode=audio*action=view*
// @include        http://tagoo.ru/*/profile.php?*action=view*mode=audio*
// @include        http://tagoo.ru/profile.php?*mode=audio*action=view*
// @include        http://tagoo.ru/profile.php?*action=view*mode=audio*
// @include        http://*.tagoo.ru/*/profile.php?*mode=audio*action=view*
// @include        http://*.tagoo.ru/*/profile.php?*action=view*mode=audio*
// @include        http://*.tagoo.ru/profile.php?*mode=audio*action=view*
// @include        http://*.tagoo.ru/profile.php?*action=view*mode=audio*
// @include        http://tagoo.ru/*/mp3-playlist-*-*
// @include        http://tagoo.ru/mp3-playlist-*-*
// @include        http://*.tagoo.ru/*/mp3-playlist-*-*
// @include        http://*.tagoo.ru/mp3-playlist-*-*
// @homepage       http://tagoo.ru/webmaster.php?mode=addons#userscripts
// @author         Ihor Polyakov
// @copyright      2009+, Tagoo Team (http://tagoo.ru/profile.php?u=3&mode=blog)
// @version        0.2
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @uso:script     56149
// ==/UserScript==

if (typeof unsafeWindow == 'undefined')
	unsafeWindow = window;
$ = unsafeWindow.jQuery;
GM_ready();
function GM_ready() 
{
	$('#playlist_audio_title').after(html_button());
	$('#tcheckpl').click(check_tracks);
	create_css(css_styles());
}

function html_button()
{
	var btn = '<div id="tcheckpl"><img src="http://tagoo.ru/images/dummy.gif" class="btn check"></div>'
	return btn;
}

function css_styles()
{
	return [
		['#tcheckpl', 'cursor: pointer; float: right; '],
		['.aplaylist .header #playlist_audio_player_div', 'margin-right:20px; '],
		['#tcheckpl img.btn', 'width: 16px; height: 16px; '],
		['#tcheckpl img.btn.check', 'background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAodJREFUeNqkk0tME0Ecxr/Z3b4ADZRqAqQ2hJJSmhAfxKjUqIlXLujJqAe96NGee+Bi4kE5edHIyRhOcsEY4sGDotGEgxEBCUQpTVqgD0262310dtaZlcL25MFJvs3M7P/37X+y8xHHcfA/QxEP8jwCyIRLLEgvCCb4bIwruleX5/oAB7NwnAJsvrIdODfKfw08Yzyo+DOJvkQ8FomGOwIdQdGfZqonNku59Fph/YrZMKf41lxLB034cODQ5MXUhaQCOUQtCtVSm+/a4t0DbdGuaPe7lfeTNd3dd02kvYLegOTPnB8aS1p1M6SqKgzDaNHLwWegeiN0Jn466Se+jGAODKgzMdgzEDdUI6RpGnRdb9GDgaxbNn98hpvQUCwcjQvGa3Au0h4J12o1mKbpSnSxvbuNO8Hr6Ky0I5/P4+bru1heWQYzWFgwXoNjMuSgbdv4fGkexUoRuZ0cYqQPZ7tGoSgKpjdf4FX5DRpSA4ZlBAXjNQC1KW73X8PS0hLmh2dwMjKCJyMPXfhteQGPC9NACK6oQl3mwKDhbJW1kpH9eh+yLMPn8+Hp0CP4FB/W6z9wbzML1sH4v4Ari5iGYLwdfNwuFatyWEb6+7j71aaurt8COrEPCxm1elUwXoPZ31uVDQlEJ30Ep75dduHUYho40gozZutmUd8QzIEBcwq2Rqcqn4qrDmU6iRGkvnA4hv1zC7EG1dXF6iqr21OCcWMgwkQIz0GMB2FUGpf65Yw/2R73J9rCcpcSFEX2L2pYa/WqtaptsJ8cXmRzyNlw2T0DcaW7uSLolXowjDSOIsXD5d42Hp4CdrGMFSygwHb4TomrzFnaNJA8J1X+kWCRRY2rzln2R4ABABpvPoBuuSpnAAAAAElFTkSuQmCC); '],
		['#tcheckpl img.btn.wait', 'background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAphJREFUeNp8U11LVFEUXfdr7jgf6thMjpYzJubkvBgoSA/10A+IDMInwXdfeor+gT9BCAIhCXppHnsIAxMCDSxLDLUBU8dSZ27jfN977rm3fa4a+YEbFtx79trrrLPPPtKbZ/dAcY0wThgkpAhpnI9Vwg/CImGakBuZnIMqMq7rzkqSlMLlkT7GA+KPEf+WWFQLua0mRZFTHe1+OHIAHD44UOC40r9KRVGg6T4orgWwEnI7f1KcO02UqgsHlsMdyHYJ0VYTmj+ISKwNWiACXzCCQDQJvTkG48BAcXMJO+u/4TiO0OWeA/HhAsm9or7xS0n7wg0bxtfvtLx5yn9boh9VRvSCxVwX6Zawap0IiNjy61LdejiTGexrGk20aecasG3YmF+vZXwzg/dNy2umF/L/JMtiU3OrZaxs11CuM9RMG4dVhsVsBbMrhxmRPyt8SoC/GJqrm2z443p5OrvXQN3kWP5Zw5fN6pTF7CeUf3epgAiHs+6BhH+8rzMATZURb1UQ1t2oZVnxi+5WTg3cBTXE+zl89D4xkAy+Hr7ZAl2VqNsumgMKhnpCjxXJWRB5wTvhn3PgNopP+6+HYNO1VhscpRrDQdGkQXNwuzvk5S88QrznzogkK2HOzAnb5tg16tjNV5Er1LC9X0V2twxNcWHZfELwBP9EQD06N38uxIKNLSxlk+SAgzEHDcZRobmgQhgVC8HGjrfpMT/jCawtz4c0TYne6GqFXpnH2icbe1ovza8GWT4aZ9ELk62i1/6MSEcM2bWFKGM8RKmKcFC3aScjf4A43qKLf4AvEIZ6pRdVqR3hq53wSyZ0Qn7jG7KFfQi+qPMc0C1wcqHmS/JovsTHgFKMQA8llz7zlEWBQXhFeCnqROKvAAMAgzEyqx9pc4oAAAAASUVORK5CYII=); '],
		['#tcheckpl img.btn.oked', 'background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANkE3LLaAgAAAjpJREFUeJy90k1IkwEcx/Hvs2evMt1KJ741Wy0zexMy0US6WHSKgii8pAUZKUEFubSgkjKRQgT1kL0hZNChMpJCi/RQGQll0sBE09wWw5c2c5rbs+fptIgutQ59758//8MP/nNCcsWSm5ajS+8C6qh1con5So+3W3ni6lTiS81XAe1f45QDsXV3JloVT2BC8c57lGZng6LZJVz8+Ub8fpVD0Mri1DVqf8dpZYYLZ6pOOjJi1jDqHyIoS7xwdyMbla1qANNO7fHDx0rrZPV3WufbpOl26iM4/YjuXEXlwdNWvZ3xuY9IssKDT23c6+0l3McjUVfEoe2Vm5vyEwuJ1yVgyRO3jflHfIFBXtvK1dUljt016ZpM/MFJZiUfTyfbed7/Ct9t6hmiRkzeR2Moddo6G5xBJYZJjEkiMUcoIvtrzo7iLeUpOhu+oJcpycPA3DPefXiP6zoN0gAOQBYRyLRslAqmtS7coSF8iguNQVFZs0yrtYIGb2iE0eBb3OFBvMMzOBuk2oV+qgAZQFz8zMvwPGkrc3XZQlyIb4KfsNqPUYhFL6pRqWQMOjULEwJ9l3yXZ/uojmAAEQgFhukKLsq2rLyE9XqTiiTtMuwxWaQb7Cw3ZjDjCtBx1tk41SNX/oojBwBCfiddQUlalVtgX5tqsmHVrWCdKZfxL2M0nXrY4nksnQDCf9pL3IZy/f1m917ljXxD6fCeV+zF2ugWB5gLHcbOFtceZVOZ4RagjwZHSrLkUwHE/guOqh90ld9+870vDgAAAABJRU5ErkJggg==); '],
		['#tcheckpl img.btn.failed', 'background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADSklEQVQ4jV2QS0xcZQCFv//eO3eGeTGDIHQYyqNNWtoi0sZHQjSxSdPU0ocNlVhNF7LvwsSdJhrjwoUmNLFxpYs2xhBgUQxpQkxNGjGxpQVaHg4CIhMeHcrAMHfmzn39Lui4cH3yfTnniD5VASCs+xAliy88WfeVqryTaG68Gqqp7gDIZzan0kvLNz92vcFPFLFq+3W2LZuM6yH+J3j/1ZNv3Dp04SJay0GIhAHAMHAWF5gbGuK3u/d6bb/+fVmgnlEEALqqfnb2g57rTV1dCD2AsbTA0oP7PJ15Ajs5gpEItS93kKyKXph5MhMyXW+0IOV/DU6f7Tp9J3G4FcM0+ePBOMMTj9emjcJwAZxXKkPne08cTzYkk8TqalmenaZ/5JfujOsNajtScqyl/o5P9bGYmuf+1CO+WUhf7gwFBwDuxWNM+gMnZMFIGtks29tZglqAhsb6gcziitCAt17wB5lJzWO5Dn0L6cvAwDlp81EoADBRnahuN3M5Zv0BVmybA1tbNOg6vyrikqbrWs/u6hprwJLjGcDA1eDeL8DElOa1y79SpKsquT6e/iHu2G+f0tTaZs2Hp6lXlB1FtP5tlti0LFZKpZ/bdK0MP0yrsr20u8uyX+fLp9v9wIdxV95el5JnpklAcEjLS+ycIkg5NtKVhEM6OO5DQ3gdwnYoVQS4kTf7EaLnoOuCpobSmkbItdgBTzFd71HCpxJzPOpi0XeB36Ou7MB18RSVH41SP9DT6SmojkQGK65EPY+oqpBxvUnFsN1bnqLSpgiadU2cVNXXk8B+FEaK7k9Az7V99eVZ1w5XBmm3SvhVlTlX3lSAyXHTWn8pUkEi84xwqciLiX2MOsrQ0WjkvTPhWBn+9LWW/X1tm1mO6D7GLNcBRsWbe2Frdzw8c1Hx+Md1cerqSeUM7EJxOqhoIhKLHKkK+glmNqgplRjx4POc2QmMlS+f/XY7f0mLR4bOR0IIz+R4Uz16LHpUqDq2uUthdYNiQGPYdPh61+gFxgDUxucGQzB3t2gNpG33XFUoWFkTjRGIxUHzkc/lGd/KcWN9K/udYZ7yC25bz7nyBDYEFCRIqLWg6YCgO+HzHZPAmmWn5mEwAH8WYSMiIC/3uH8BnK93p318sLgAAAAASUVORK5CYII=); '],
		['#pltable img.show_btn', 'width: 11px; height: 11px; margin-left: 10px; vertical-align: bottom; cursor: help; '],
		['#pltable img.show_btn.oked', 'background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kIFg0XFdxhV+sAAAFcSURBVBjTY2AgBIIYxBnCGETwqpFM4GFgYGAQm3y8927Z5pIzDAwMPBAZNwY2Bj8GTgYGBgb5THaImCMDR+aa6LMPPt/+f+n9uf9aZarLGBgYGBiDFjquCN9of4SBgYEbarBI+m7viztervy/+/Gmfyn7gv6zhzBvZpHLF2g2NTYMF+IUYHi38NmKl+8eBulrGmyx1rTWe/z15v9jb3cwrt127P7P7QyJjDIlDIfkPPhsVfhV/wvwcjI+fnX/iba8vsynHx//v/3xgvHYurvX7zcy+jAw/L/H/O8zw1Fp3X9Rn0Wfcr5jeMwgLSLKz8j46/8fto8M9w68vXd99g+LP28ZnvPlQB3IIsdg679O6H3uQ43/M17F/Nvyrf5/4irjBwwMDCpYg0rahUmn6KDlh9P/5v2v3xb6UMCYQZyBgYHBejM79rCVcGbwrj3mcINBkUGPgSjAzCCASwoAfA1+RXbcQCEAAAAASUVORK5CYII=); '],
		['#pltable img.show_btn.failed', 'background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kIFg0WLnRxj44AAAHpSURBVBjTLctBSFNhAAfw/7f39u3tve1tzjdpocsSFpFl1KFD0bIGIXWJWhLaIdipWgQhGEXeig51KKKLdAoiKbp0kIKJQRRqNKeUy5bMoZTTdMy9t7f33vd1qN/9R4YlilS9gTtAaH9XZzLS0nJFCgZ2GxuVuaXfK4+mcrMjQ8DaQ4mCAMAAsO/y+TOv27qPt7uoG7/WVhEKNkGwbCyOjy3ef/4q+RiYwE3AN5OI56sD19iHnkS9n5CpCDCY8gjzcz0Jrl9Ps8/HDhXSgEqeRcInt0ejb3TG6ncnv5zOAKNc9u38saM1U/UpW5cUBc2VCj4WS2fF9UrlIvJ55GxWygCjn2QqZynPGsWCNK76c2PldaXPQzuWLXZJ6BKFwbJjRQqGOdynoOgFWWDM9r4VxdJQudp9hBC3LpCjNcbg4sCsaDtoC6lp4pCMxWxvlqE0YTRiAJYd1Z9yEYI/jH8TQVxPO6l4QXccuVXyyGbNnLtlOXEDqF8NBvp3yaIW0KuYdwlPiB+gt4PKZC9x9iyoATJt2Do2jffhcPNezQ2tY7XsfmHz/I1N8wD+0x40+XPTUY2b8YOcJ0/xxonDfKZ9C7+nyl8BRAGAxAB8/xekXp83oVF6LkA9sQ3T/LnSsEZe1vR3AGrbAPwFCVfLE2AAzEwAAAAASUVORK5CYII=); '],
		['#pltable img.show_btn.wait', 'background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kIFg0XDc8Nz70AAAG9SURBVBjTVZA9aFNRHMXP/977Ptq8fFljYy2CVKtYoZBBHBSUIoiDiLODonUQB4vg0MlJURA71UFdRFwFJdChgiAtaoUgtgpijcSPmNDal6Qvuc/Xd/8OrYNnONOPw49DT8YPu8aYMTCOASgQsQcQmBkA3gH0hoS4derGi8/Kr1X3ZtLOdWF1I2KFtRhgE0MQs+M6wxb0cP3XSj+A4yrshKFxAvRlNZKZNCeyvdTdsx1efoDq3yoov52G7nRaAEAA8Phs/qk5endHYRvvM5EG2EAQczXa3Ko+u5o4PfleAcB62Y7r7zl5+btsTu8fcCGJMP9D42MteS1HY+PYiAAAlpZ1oUDPf/5u315px6g1IpTKrXuXDtEdMlH4D1YAQGzih4u8cySjr+RSFvtBRCNDqXM3i0vMxQPiv2VpNDcWFh9lExaWGiFV6m00g1AO9eKEUV5u40aomYnRweWvs0fgl+XrTykO2iH5wR+s6ggW8VaXgZmJ0fsAzqv5ualNfbkuuav2AB9eHqTY62eyk1ACtEWXkM57WJibGlx3Zlla9vUZe3X2Yo98lWbZtZuFA9tWX0KzFlSCZhGQkwDwF/EivsKI+oJ5AAAAAElFTkSuQmCC); '],
		['#pltable img.show_btn.warn', 'background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB9kIGQkIJB+P4cUAAAGeSURBVBjTbY9NSFRRHEfPvfe915umpwY2ggh9kIihYiKITYpQtLEoCmnTInCjYAqFqIt2LWwX0yLBjc0iAomsRZAFSRGEtQijIoaIMFEszGZwPpy582+hokFn89scDvxgBxK/BsD4mdYTAHMPJ/kvzwYvbIidLaeXn4/KzYbDjQD3zh/blq4G7kZVBEAnJnpXJHFL3se6PwDMDnX+W63d3OmBjhH7blgyX+7b3JsReXA5emnLedHXhgFYmOpSNclcSfPJ/eO795hS6vq0Mz9l/bB/qOrHavx6V6PtuP0K/enucXadm5SQX7iyL2IPSvanRiyF9LKu9OeORsqWzrbHXsrHXoVen/3OEahsPVV6w/VXwfuDljXxfj9RIf2ZthY7AXjlM4IZe5vkcX/5ndqo32BVWgzfVDEXKJOdRmlkbwSnXRPUz/DUPLroVjVFTcwLrxnjLCrtp0VXNAnp14ICZaUQhFV1c4G4k/+VH5Riyk2tFDMEm9cTo0IeSAFJUC4lkqVHjdVRcaCGkPVAPAQPxDGQsUgWyIFah/mvZP4CY66cIHFtbtgAAAAASUVORK5CYII=); ']
	];
}

function check_tracks()
{
	checking_start();
	var dels = $('.sp_plitem_drop').parent();
	var show_img = $('<img src="/images/dummy.gif" class="show_btn wait">');
	if (dels.length)
	{
		$('#pltable colgroup col:last').width(40);
		show_img.insertAfter(dels);
	}
	else if (!$('#tcheckpl td.url img.show_btn').length)
	{
		$('#pltable colgroup col:first').width(40);
		show_img.insertAfter($('#pltable td.url img'));
	}
	$('#pltable td.url a').each(function(i){
		var el = $(this);
		check_track(el.parents('tr:first').find('.show_btn'), el.attr('href'));
	});
	CHECK_INTERVAL = setInterval(function(){
		if ($('#pltable img.show_btn.wait').length)
			return;
		if ($('#pltable img.show_btn.failed').length)
		{
			$('#tcheckpl img.btn').attr('class', 'btn').addClass('failed');
			checking_end();
			return;
		}
		if ($('#pltable img.show_btn.oked').length == $('#pltable img.show_btn').length)
		{
			$('#tcheckpl img.btn').attr('class', 'btn').addClass('oked');
			checking_end();
			return;
		}
		$('#tcheckpl img.btn').attr('class', 'btn').addClass('check');
		checking_end();
	}, 15000);
	
	return false;
}

function checking_start()
{
	$('#tcheckpl img.btn').attr('class', 'btn').addClass('check');

	$('img.show_btn').remove();
}

function checking_end()
{
	clearInterval(CHECK_INTERVAL);
}

function check_track(el, url)
{
	GM_log(url);
	window.setTimeout(function() {
		GM_xmlhttpRequest({
			method: "HEAD",
			url: url,
			headers: {
				"User-Agent": navigator.userAgent,
				"Referer": ""
			},
			onload: function(response){check_response(el, response);},
			onerror: function(response){check_response(el, response);}
		});
		window.setTimeout(function() {
			if (el.hasClass('wait'))
				check_response(el, {'status': 408, 'responseHeaders': ''});
		}, 12000);
	}, 0);
}

function check_response(dest, response)
{
	var header = response.responseHeaders;
	//alert(header);// for debugging
	var result = true;
	if (response.status != 200 && response.status != 206)
		result = false;
	else if (!header.match(/Content-Type: \"?audio\//i) 
		&& !header.match(/Content-Type: mp3/i)
		&& !header.match(/Content-Type: application\//i)
		&& !header.match(/Content-Type: unknown/i))
		result = false;
	else if (!header.match(/Content-Length: (\d+)/i) && header.match(/Content-Length: (\d+)/i)[1] <= 512)
		result = false;
	if (result)
		dest.attr('class', 'show_btn oked').attr('title', 'OK');
	else if (response.status == 408)
		dest.attr('class', 'show_btn warn').attr('title', 'Timeout');
	else
		dest.attr('class', 'show_btn failed').attr('title', response.status + ' ' + header);
}

function create_css(arr) 
{
	var css = '';
	for (var i = 0; i < arr.length; ++i)
		css += arr[i][0] + ' { ' + arr[i][1] + ' }';
	$('<style></style>').attr('type', 'text/css').text(css).appendTo('head');
}

//
// ChangeLog
// 2009-08-25 - 0.2 - Added new type of mistake: warning, if track can't be loaded by the riasons of timeout limit.
//								Changed places displaing of the icons (more useable position, when you watching your playlist).
//								Added loggin to console current processing url.
//
// 2009-08-22 - 0.1 - Congratulations! We have started
