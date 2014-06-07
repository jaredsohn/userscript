// ==UserScript==
// @name		FileShareIzOnlineLink
// @description		Check availability of file sharing links/URLs, like from rapidshare.com etc.
// @version		0.1.2a
// @license		GPLv3, see http://www.gnu.org/licenses/gpl-3.0.html for detailed information
// @author		Džen <yvldwt@gmail.com>
// @credits		Icons: http://www.famfamfam.com/lab/icons/silk/; loading icon: http://www.ajaxload.info/
// @website		http://userscripts.org/scripts/show/59468
// @include		*
// ==/UserScript==

var hosts = [
	// rapidshare.com
	{regexp: 'http:\/\/rapidshare\.com\/files\/[0-9]+\/[0-9a-zA-Z_.+-]+[0-9a-zA-Z_+-]', links: [],
	handler: function(links) {
		// http://images.rapidshare.com/apidoc.txt
		for (var i = 0, fileids = [], filenames = [], ll = []; i < links.length; i++) {
			status.isLoading(links[i].link);
			var id = links[i].url.match(/^http:\/\/rapidshare\.com\/files\/([0-9]+)\//)[1];
			ll[id] = links[i];
			fileids.push(id);
			filenames.push(links[i].url.match(/\/([^\/]+)$/)[1]);
		}
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://api.rapidshare.com/cgi-bin/rsapi.cgi',
			data: 'sub=checkfiles_v1&files=' + encodeURI(fileids.join(',')) + '&filenames=' + encodeURI(filenames.join(',')),
			headers: {},
			onload: function(transport) {
				var lines = transport.responseText.replace(/^[\s\n]+|[\s\n]+$/,'').split('\n');
				for (var i = 0; i < lines.length; i++) {
					var response = lines[i].split(',');
					var s = parseInt(response[4]);
					if (s == 1 || s == 2 || s == 6)
						status.isOnline(ll[parseInt(response[0])].link);
					else
						status.isOffline(ll[parseInt(response[0])].link);
				}
			}
		});
	}},

	// megaupload.com
	{regexp: 'http:\/\/www\.megaupload\.com\/(?:[a-z]+\/)?\\?d=[0-9A-Z]+', links: [],
	handler: function(links) {
		for (var i = 0, ll = []; i < links.length; i++) {
			status.isLoading(links[i].link);
			ll[links[i].url.match(/http:\/\/www\.megaupload\.com\/(?:[a-z]+\/)?\?d=([0-9A-Z]+)/)[1]] = links[i];
			GM_xmlhttpRequest({
				method: 'GET',
				url: links[i].url,
				headers: {},
				onload: function(transport) {
					var id = transport.responseText.match(/document\.location = '\?d=([0-9A-Z]+)&/)[1];
					if (transport.responseText.match(/File description:<\/font> <font/))
						status.isOnline(ll[id].link);
					else
						status.isOffline(ll[id].link);
				}
			});
		}
	}},

	// mediafire.com
	{regexp: 'http:\/\/www\.mediafire\.com\/\\?[a-z]+', links: [],
	handler: function(links) {
		for (var i = 0, ll = []; i < links.length; i++) {
			status.isLoading(links[i].link);
			ll[links[i].url.match(/http:\/\/www\.mediafire\.com\/\?([a-z]+)/)[1]] = links[i];
			GM_xmlhttpRequest({
				method: 'GET',
				url: links[i].url,
				headers: {},
				onload: function(transport) {
					var id = transport.responseText.match(/<a href="https:\/\/www\.mediafire\.com\/\?([a-z]+)"/)[1];
					if (id)
						status.isOnline(ll[id].link);
					else
						status.isOffline(ll[id].link);
				}
			});
		}
	}},

	// zippyshare.com
	{regexp: 'http:\/\/www[0-9]?\.zippyshare\.com\/[a-z]\/[0-9]+\/file\.html', links: [],
	handler: function(links) {
		for (var i = 0, ll = []; i < links.length; i++) {
			status.isLoading(links[i].link);
			ll[links[i].url.match(/http:\/\/www[0-9]?\.zippyshare\.com\/[a-z]\/([0-9]+)\/file\.html/)[1]] = links[i];
			GM_xmlhttpRequest({
				method: 'GET',
				url: links[i].url,
				headers: {},
				onload: function(transport) {
					var id = transport.responseText.match(/<a href="\/view.jsp\?locale=en&key=([0-9]+)">/)[1];
					if (id)
						status.isOnline(ll[id].link);
					else
						status.isOffline(ll[id].link);
				}
			});
		}
	}},

	// depositfiles.com
	{regexp: 'http:\/\/depositfiles\.com\/(?:[a-z]{2}\/)?files\/[a-z0-9]+', links: [],
	handler: function(links) {
		for (var i = 0, ll = []; i < links.length; i++) {
			status.isLoading(links[i].link);
			ll[links[i].url.match(/http:\/\/depositfiles\.com\/(?:[a-z]{2}\/)?files\/([a-z0-9]+)/)[1]] = links[i];
			GM_xmlhttpRequest({
				method: 'GET',
				url: links[i].url,
				headers: {},
				onload: function(transport) {
					var id = transport.responseText.match(/<form action="\/(?:[a-z]{2}\/)?files\/([a-z0-9]+)" method="post">/)[1];
					if (id)
						status.isOnline(ll[id].link);
					else
						status.isOffline(ll[id].link);
				}
			});
		}
	}},

	// ifolder.ru
	{regexp: 'http:\/\/ifolder.ru\/[0-9]+', links: [],
	handler: function(links) {
		for (var i = 0, ll = []; i < links.length; i++) {
			status.isLoading(links[i].link);
			ll[links[i].url.match(/http:\/\/ifolder.ru\/([0-9]+)/)[1]] = links[i];
			GM_xmlhttpRequest({
				method: 'GET',
				url: links[i].url,
				headers: {},
				onload: function(transport) {
					var id = transport.responseText.match(/<input type="hidden" name="file_id" value="([0-9]+)">/)[1];
					if (id)
						status.isOnline(ll[id].link);
					else
						status.isOffline(ll[id].link);
				}
			});
		}
	}}
];

var icons = {
	loading:	'data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPj4+Dg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbGxkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==',
	online:		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKfSURBVDjLpZPrS1NhHMf9O3bOdmwDCWREIYKEUHsVJBI7mg3FvCxL09290jZj2EyLMnJexkgpLbPUanNOberU5taUMnHZUULMvelCtWF0sW/n7MVMEiN64AsPD8/n83uucQDi/id/DBT4Dolypw/qsz0pTMbj/WHpiDgsdSUyUmeiPt2+V7SrIM+bSss8ySGdR4abQQv6lrui6VxsRonrGCS9VEjSQ9E7CtiqdOZ4UuTqnBHO1X7YXl6Daa4yGq7vWO1D40wVDtj4kWQbn94myPGkCDPdSesczE2sCZShwl8CzcwZ6NiUs6n2nYX99T1cnKqA2EKui6+TwphA5k4yqMayopU5mANV3lNQTBdCMVUA9VQh3GuDMHiVcLCS3J4jSLhCGmKCjBEx0xlshjXYhApfMZRP5CyYD+UkG08+xt+4wLVQZA1tzxthm2tEfD3JxARH7QkbD1ZuozaggdZbxK5kAIsf5qGaKMTY2lAU/rH5HW3PLsEwUYy+YCcERmIjJpDcpzb6l7th9KtQ69fi09ePUej9l7cx2DJbD7UrG3r3afQHOyCo+V3QQzE35pvQvnAZukk5zL5qRL59jsKbPzdheXoBZc4saFhBS6AO7V4zqCpiawuptwQG+UAa7Ct3UT0hh9p9EnXT5Vh6t4C22QaUDh6HwnECOmcO7K+6kW49DKqS2DrEZCtfuI+9GrNHg4fMHVSO5kE7nAPVkAxKBxcOzsajpS4Yh4ohUPPWKTUh3PaQEptIOr6BiJjcZXCwktaAGfrRIpwblqOV3YKdhfXOIvBLeREWpnd8ynsaSJoyESFphwTtfjN6X1jRO2+FxWtCWksqBApeiFIR9K6fiTpPiigDoadqCEag5YUFKl6Yrciw0VOlhOivv/Ff8wtn0KzlebrUYwAAAABJRU5ErkJggg==',
	offline:	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg==',
	tempUnavail:	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AQJDBgxYO68rwAAAZNJREFUeNptkr9LW1EcxT/3GhOTKIG8QTpm8B8IIoJTFkFwsXVyUaxFJHYoFzJYUVFHn4sKtoidCoKtIigWOtQOhRKowaFzJwcF0VeJ+fFe7nUwP57R7/S9nO+595z7PQJfGUgAsWqPaUBOC/yrHQI+QjKTXc7GQq4EhP+uKzdUcbtnelvhDzXQQHL2bCkbxhOA5GmZ24LUC73zPWE4lQYSmexynaCmjh5Nq9FdANER1uL9j7nfeUhIIFaVJNXEPrguKvPzgfD2G0iBGt8DkPG4CGiIyapZAWBvDUEoBOfnqPQxaANxC3v7Ze1hoQFpmsTbGwMQicLNNeTz2HaKYuO/4DnTauwLeC6i8wW4ZdSbA9rw/GtB6kaPmjyESATKZVZWUxAMQqnI9MTXOqdGcvRFoSw8o+0Pg1DxsD+PcFcJYH8aphSNsr71CkAH/17danAEQAGSa98zv7x4W9AIpGkRzap18cKU3vUv9lmQq6N5SH7cSZ8Uuqx205SI1rPL/6/HN1MW5GiKC84z2at6dixf9u4B/PqUtJuX27QAAAAASUVORK5CYII=',
	error:		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIsSURBVDjLpVNLSJQBEP7+h6uu62vLVAJDW1KQTMrINQ1vPQzq1GOpa9EppGOHLh0kCEKL7JBEhVCHihAsESyJiE4FWShGRmauu7KYiv6Pma+DGoFrBQ7MzGFmPr5vmDFIYj1mr1WYfrHPovA9VVOqbC7e/1rS9ZlrAVDYHig5WB0oPtBI0TNrUiC5yhP9jeF4X8NPcWfopoY48XT39PjjXeF0vWkZqOjd7LJYrmGasHPCCJbHwhS9/F8M4s8baid764Xi0Ilfp5voorpJfn2wwx/r3l77TwZUvR+qajXVn8PnvocYfXYH6k2ioOaCpaIdf11ivDcayyiMVudsOYqFb60gARJYHG9DbqQFmSVNjaO3K2NpAeK90ZCqtgcrjkP9aUCXp0moetDFEeRXnYCKXhm+uTW0CkBFu4JlxzZkFlbASz4CQGQVBFeEwZm8geyiMuRVntzsL3oXV+YMkvjRsydC1U+lhwZsWXgHb+oWVAEzIwvzyVlk5igsi7DymmHlHsFQR50rjl+981Jy1Fw6Gu0ObTtnU+cgs28AKgDiy+Awpj5OACBAhZ/qh2HOo6i+NeA73jUAML4/qWux8mt6NjW1w599CS9xb0mSEqQBEDAtwqALUmBaG5FV3oYPnTHMjAwetlWksyByaukxQg2wQ9FlccaK/OXA3/uAEUDp3rNIDQ1ctSk6kHh1/jRFoaL4M4snEMeD73gQx4M4PsT1IZ5AfYH68tZY7zv/ApRMY9mnuVMvAAAAAElFTkSuQmCC',
	unknown:	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKkSURBVDjLpZPdT5JhGMb9W+BPaK3matVqndXWOOigA6fmJ9DUcrUMlrN0mNMsKTUznQpq6pyKAm8CIogmypcg8GIiX8rHRHjhVbPt6o01nMvZWge/k3vP9duuZ/edAyDnf/hjoCMP2Vr3gUDj3CdV6zT1xZ6iFDaKnLEkBFOmPfaZArWT5sw60iFP+BAbOzTcQSqDZzsNRyCNkcVoaGghzDlVQKylOHJrMrUZ2Yf52y6kc36IxpyoH1lHF7EBgyMKV4jCJ5U/1UVscU4IZOYEa3I1HtwI01hwxlDLhDoJD/wxGr5YGmOLAdRIrVCuhmD3JdA6SQabx12srGB0KSpc86ew4olDOGjH4x4z0gdHDD9+c4TaQQtq+k2Yt0egXYugTmoVZgV9cyHSxXTtJjZR3WNCVfcK/NE0ppYDUNu2QTMCtS0IbrsOrVMOWL27eNJtJLOCDoWXdgeTEEosqPxoBK/TwDzWY9rowy51gJ1dGr2zLpS2aVH5QQ+Hbw88sZ7OClrGXbQrkMTTAQu4HXqUv9eh7J0OSfo7tiIU+GItilpUuM/AF2tg98eR36Q+FryQ2kjbVhximQu8dgPKxPMoeTuH4tfqDIWvCBQ2KlDQKEe9dBlGTwR36+THFZg+QoUxAL0jgsoOQzYYS+wjskcjTzSToVAkA7Hqg4Spc6tm4vgT+eIFVvmb+eCSMwLlih/cNg0KmpRoGzdl+BXOb5jAsMYNjSWAm9VjwesPR1knFilPNMu510CkdPZtqK1BvJQsoaRZjqLGaTzv1UNp9EJl9uNqxefU5QdDnFNX+Y5Qxrn9bDLUR6zjqzsMizeWYdG5gy6ZDbk8aehiuYRz5jHdeDTKvlY1IrhSMUxe4g9SuVwpdaFsgDxf2i84V9zH/us1/is/AdevBaK9Tb3EAAAAAElFTkSuQmCC'
};

var status = {
	isLoading: function(el) {
		el.style.paddingRight = '18px';
		el.style.background = 'url(' + icons.loading + ') no-repeat right center';
	},
	isOnline: function(el) {
		el.style.paddingRight = '18px';
		el.style.background = 'url(' + icons.online + ') no-repeat right center';
	},
	isOffline: function(el) {
		el.style.paddingRight = '18px';
		el.style.background = 'url(' + icons.offline + ') no-repeat right center';
	},
	isTempUnavail: function(el) {
		el.style.paddingRight = '18px';
		el.style.background = 'url(' + icons.tempUnavail + ') no-repeat right center';
	}
}

/*
// grep URLs in the document and convert them to HTML-links
for (var i = 0, html = document.getElementsByTagName('body')[0].innerHTML; i < hosts.length; i++)
	html = html.replace(new RegExp('(' + hosts[i].regexp + ')','g'),'<a href="$1">$1</a>');
document.getElementsByTagName('body')[0].innerHTML = html;
//*/

// find supported file share links
var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
	var link = links[i], url = link.getAttribute('href') || '', match = false;
	if (url.match(/^\s*$/)) continue;

	for (var j = 0; j < hosts.length; j++) {
		if (url.match(new RegExp('^' + hosts[j].regexp + '$'))) {
			hosts[j].links.push({ link: link, url: url });
			break;
		}
	}
}

// run link check for all hosts
for (var i = 0; i < hosts.length; i++)
	if (hosts[i].links.length > 0)
		hosts[i].handler(hosts[i].links);