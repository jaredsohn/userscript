// ==UserScript==
// @name           hatena storking
// @namespace      http://www.hatena.ne.jp/so_blue/
// @description    はてなーの使っている各種はてなサービスにダイレクトでジャンプします。
// @include        http://*.hatena.ne.jp/*
// @version        0.0.2
// ==/UserScript==
(function(){

	if (window !== window.parent) return;

	var d = document;
	if (!d.contentType.match(/^text\/html/i)) return;
	var services = {
		a: ['アンテナ', 'anntena'],
		b: ['ブックマーク', 'bookmark'],
		b2: ['被ブックマーク', 'bookmark'],
		b3: ['新着ブックマーク', 'bookmark'],
		c: ['ココ', 'coco'],
		counter: ['カウンター', 'counter'],
		d: ['ダイアリー', 'diary'],
		d2: ['about', 'diary'],
		d3: ['archive', 'diary'],
		f: ['フォトライフ', 'fotolife'],
		g: ['グループ', 'group'],
		graph: ['グラフ', 'graph'],
		h: ['ハイク', 'haiku'],
		i: ['アイデア', 'idea'],
		k: ['キーワード', 'keyword'],
		m: ['メッセージ', 'message'],
		mono: ['モノリス', 'monolith'],
		q: ['人力検索', 'question'],
		s: ['スター', 'star'],
		ugomemo: ['うごメモ', 'ugomemo'],
		www: ['プロフィール', 'profile'],
	}
	if (d.cookie.match(/rk=/)) {
		services.my = ['Myはてな', 'profile'];
	}
	var url = location.href;
	var current, user;
	if (url.match(/http:\/\/([^.]+\.)?([abcdfghikrqs]|graph|counter|ugomemo|mono|www)\.hatena\.ne\.jp\/([A-Za-z][A-Za-z0-9_-]+)\//)) {
		current = RegExp.$2;
		user = RegExp.$3;
	} else if (url.match(/http:\/\/www\.hatena\.ne\.jp\/my/)) {
		current = 'my';
		user = d.querySelector('.welcome a').textContent;
	} else if (url.match(/http:\/\/m\.hatena\.ne\.jp\//)) {
		current = 'm';
		user = d.querySelectorAll('h1 a')[1].textContent.replace('のメッセージ', '');
	}

	if (!current || !user) return;
	if (user === 'entry' || user === 'keyword' || user === 'idea' || user === 'feed') return;

	addCSS();
	addStorkingMenu(user);
	d.body.addEventListener('click', toggleMenu, false)

	function addStorkingMenu(hatena_id) {

		var box = d.createElement('div');
		box.id = 'storking_box';
		
		var button = d.createElement('button');
		button.textContent = 'go!';
		button.id = 'storking_button';

		var ul = d.createElement('ul');
		ul.id = 'storking_hatena';
		var li = d.createElement('li');
		var a = d.createElement('a');
		for (var srv in services) {
			var list = li.cloneNode(true);
			var menu = a.cloneNode(true);
			menu.textContent = services[srv][0];
			menu.title = services[srv][0];
			if (srv === 'mono' || srv === 'www' || srv === 'my') {
				menu.className = services[srv][1] + ' adjust';
			} else {
				menu.className = services[srv][1];
			}
			menu.href = makeHref(srv, hatena_id);
			list.appendChild(menu);
			ul.appendChild(list);
		}
		box.appendChild(button);
		box.appendChild(ul);
		d.body.appendChild(box);
		menu = a = null;
	}

	function makeHref(serviceType, hatena_id) {
		var url;
		if (serviceType === 'my') {
			url = 'http://www.hatena.ne.jp/my';
		} else if (serviceType === 'm') {
			url = 'http://m.hatena.ne.jp/';
		} else if (serviceType === 'ugomemo') {
			url = 'http://ugomemo.hatena.ne.jp/' + hatena_id + '/following';
		} else if (serviceType === 'b2') {
			url = 'http://b.hatena.ne.jp/entrylist?sort=eid&url=http%3A%2F%2Fd.hatena.ne.jp%2F' + hatena_id + '%2F';
		} else if (serviceType === 'b3') {
			url = 'http://b.hatena.ne.jp/bookmarklist?url=http%3A%2F%2Fd.hatena.ne.jp%2F' + hatena_id + '%2F';
		} else if (serviceType === 'd2') {
			url = 'http://d.hatena.ne.jp/' + hatena_id + '/about/';
		} else if (serviceType === 'd3') {
			url = 'http://d.hatena.ne.jp/' + hatena_id + '/archive/';
		} else {
			url = 'http://' + serviceType + '.hatena.ne.jp/' + hatena_id + '/';
		}
		return url;
	}

	function toggleMenu(e) {
		var ul = d.getElementById('storking_hatena');
		if (!ul) return;
		var ul_style = ul.style;
		if (e.target.id === 'storking_button') {
			if (ul_style.display === 'none' || ul_style.display === '') {
				ul_style.display = 'block';
			} else {
				ul_style.display = 'none';
			}
		} else {
			ul_style.display = 'none';
		}
	}

	function addCSS() {
		GM_addStyle('' + <><![CDATA[
			#storking_box {
				position: fixed;
				top: 0;
				left: 0;
				z-index: 999;
				text-align: left;
			}
			#storking_button {
				font-size: 14px;
				position: relative;
				background-color: buttonface;
				border: outset 1px buttonface;
				width: 32px;
				text-align: center;
				font-family: 'Meiryo', 'Verdana';
				letter-spacing: 0;
				opacity: 0.7;
			}
			ul#storking_hatena {
				position: relative;
				margin: 0;
				padding: 0;
				display: none;
			}
			ul#storking_hatena a {
				display: block;
				font-size: 14px;
				list-style-type: none;
				background-color: buttonface;;
				background-repeat: no-repeat;
				opacity: 0.5;
				background-position: 3px 3px;
				padding-left: 22px;
				cursor: pointer;
				border: outset 1px buttonface;
				padding-right: 4px;
				text-align: left;
				line-height: 20px;
				text-decoration: none;
				color: navy;
				font-weight: normal;
			}
			ul#storking_hatena a.adjust {
				background-position: 2px 2px;
			}
			ul#storking_hatena a:link, ul#storking_hatena a:visited, ul#storking_hatena a:hover, ul#storking_hatena a:active,{
				color: navy;
			}
			ul#storking_hatena a:hover {
				background-color: #ffec8b !important;
				opacity: 1;
			}
			#storking_hatena .anntena { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGA8zHfoRDTgAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAWUlEQVQoz2NsmfX8PwOJ4Nx9BgYWGIMUcOPZIwYmBjIBCzbBtW0ScHZw1QusGsm2kQmXbTCbkG2njY1kaUR2Fi423lBFDkmq+5GxZdbz//RNOefuQ0wgFQAAfU0i65PUE84AAAAASUVORK5CYII='); }
			#storking_hatena .bookmark { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGA8rKVm+YdQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAW0lEQVQoz2NsXfrrPwOJ4OyVtwwsMAYp4MazRwxMDGQCFnSBtW0SGIqCq15giOG0MbjqBVwDNsOo51R8TibJqbicS7ZTae9H9ChhISbOqOvUs1feMtx49ohkjQBu5SRUnbp8QQAAAABJRU5ErkJggg=='); }
			#storking_hatena .coco { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGBAAHG4HvNMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAqElEQVQoz2O8e6f+PwOJ4NatuwwsDAwMDAoKjiRp3LNnL0Tjrd3TGR4eX4UiKW8ZxqDmmolTMwsDAwPDw+OrGNwb/6FI7KxnIqxR3jKMYWc9E1wQ3RCcGtVcM+Gm725C+BeZje58nH7EZjOy83H6EaYQlyFY/QgDrnX7sToZqx/hkbx7OlYNKBqxAVzOJ6gRm/PlLcMIa8TmfBQbb926y7Bnz15S0zkDAJmIRW4k0LnVAAAAAElFTkSuQmCC'); }
			#storking_hatena .counter { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGBAEKCvfjWIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAXklEQVQoz2NsXfrrPwOJ4OyVtwwsMAYp4MazRwxMMM7aNgmSNLMgc3BpDq56gV8jNgUU2YjNYPrYiGw4bWzEZxDZNjKh20hsQmAhxzYGBgYGlrNX3jLcePaI1HTOAADfxSipcBdSCwAAAABJRU5ErkJggg=='); }
			#storking_hatena .diary { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGA80C0GELq4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAX0lEQVQoz2NsXfrrPwOJ4OyVtwwsMAYp4MazRwxMDGQCFnSBtW0SGIqCq15giOG0MbjqBVwDNsMIOhWXZrL9OAg1wvyGHrIshDTgig4WYuKMqn5kOXvlLcONZ49I1ggAjVEinSwBOOgAAAAASUVORK5CYII='); }
			#storking_hatena .fotolife { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGA82HYdm+X0AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAARklEQVQoz2P8/v37fwYSwaJFixiYGMgEZGtkwSa4b98+FL6TkxNxGvFpoNipeDXu27cPw9mD1Kn0i0d8fqPcxkWLFpGlEQDf5xGcbyF08AAAAABJRU5ErkJggg=='); }
			#storking_hatena .group { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGA80K3rqDmYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAcklEQVQoz2NsXfrrPwOJ4OyVtwwsMAYp4MazRwxMDGQCFmyCa9skMMSCq16g8JlwaQqueoGiGN0wJlyacNmE16mEnEmURmQnIhvARI5tGBphipBtwRbCWG1E1oxLE04/4nIeXhuJTjlnr7xluPHsEckaAV8pLp+5GpwaAAAAAElFTkSuQmCC'); }
			#storking_hatena .graph { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGBAAOSUDaJQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAcElEQVQoz2NsXfrrPwOJ4OyVtwwsMAYp4MazRwxMpGhY2yYBZzMRqxhZE1aNyArQNQVXvcCuEZvpMMXImrDaCFOATTNWjcTYgtNGZIX4NKFoJKSQKKcSw2YhFBXY4hBFI6lOZTl75S3DjWePSE3nDADy5jjz90JRpQAAAABJRU5ErkJggg=='); }
			#storking_hatena .haiku { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGA86AT/S6j4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABaklEQVQoz5WSSy8DURiGnzMzbYUKIXW/xEYitWqMxKps8CvMXxCxlVgjjb9Qti4bqV+ARWtHYtzFUBIR4i4z51hIp1OtRb/Vm+98T/K+b46wl1OKKufKtjEK4t9RCqkUQgiEEADcOw7a3yOlSg1o4QjmzCz1HZ0QeNOCULSzi76JSaTr+rvuZJKm/n7iloX0PP/cKAgpPQYti/ruHp7Oz3g6PQUheL68APBtloECwffrGwB1sZZfEHg8OuJkc5OHwwM0Xa8AahrH62v0jI6Rz+WKWQyD88yWr8szCsHrjcPBahr5/VVSWNuQyehiqpi9BASUlDQPDKCHw/5Oui6tiQSRxoZ/WgX0mlqGpmcYmZsnHI3ifrzTOz5BmznMxXYGEbBqBEHv853DlTTxKYvkwpK/v9vPYW+so4dClUGh69zs7pDPZmk3TWpjMfLZLC/OdQlUBhbaVZ7L7d6uX1qwTR+8sm3uHafaf84PKp6IcDyZs9MAAAAASUVORK5CYII='); }
			#storking_hatena .idea { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGA81AM9NxmcAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAVElEQVQoz2NsXfrrPwOJ4OyVtwwsMAYp4MazRwxMDGQCFmyCa9skUPjBVS8w1GC1EVkhNk04NRIDRqxG5OhAjxq88YgrCqjiVJazV94y3Hj2iGSNABVJGuadyGChAAAAAElFTkSuQmCC'); }
			#storking_hatena .keyword { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGA81HjVC+wQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAZklEQVQoz2NsPfHgPwOJ4MXrNwwsMAYp4OG9uwxMDGQCDI2TfIwZJvkYExQjaCNMQ96Ws8RrxKUJr0Z8mohyKtGBAwMwm9ADhSgb8Wkm6FRcmhlbTzz4T9eUw/Li9RuGh/fukqwRALeAL4snU2yKAAAAAElFTkSuQmCC'); }
			#storking_hatena .message { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGA84NrVZLbMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAYklEQVQoz2NsXfrrPwOJ4OyVtwwsMAYp4MazRwxMDGQCFhhjbZsEXDC46gWKImxyZNuIVSOyDchsvBrRnYlLjPLAwedcov2I7DRszqTIqYytS3/9p2/KOXvlLcONZ49I1ggAX94pNmRFSMQAAAAASUVORK5CYII='); }
			#storking_hatena .monolith { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGBAVORK2joAAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABuklEQVQ4y2WTwW7TQBRFz4wdsStWuwehqFJV8Sv8AttukiVbmt9gSb8Bsc8P8ANFhKQgtbhQx2nruJmZx+LNxDaMZF1rPPfOu/c9m4+LtWSG/9e/e9K9Nl4IQHVzTZ4ZuFjWPaLpBMyQ3LhA2XhC3HC/K3KA7w+uI1kDNgpFAS9Qbh11GyCIPgB1i+2XPDkuIDNMxgWMLJNxwR2Gty8OqIHz00PIDOevj/aV2f7N03EBuWX66jlba5i+PKAE3h8XMMqYnRxCbpidHilHpC8Qy7Va9yqV+SxTHMUDNqGBIFj1afbhLZ98JGRDgTwSs17IjdMQdyL8aoMmm7qQCEkgCZePit9q+PlA3nph2ThCHomPO8Vqq/gn4vpJcet7syHk7n5HWNXdoNw2Ucil5sdwwnCgRGAXsLigqik0Fw9u3VAoWdgLCQiaAV7ARoFdGJaaLLV++D0IiJC9OXs3+3R5p7Faw/zqXvHHBoD51QYE5qsNeGG+rBUXNVRrzIcvN3L2eRFbZCE3ilkaZaPlBgEnasHr7XxdRQtp+QBioqVuNtRvFPEyoORVeQ2bWw0p3dL/nV3Q5CX6TiHH9Re3Euh78myC8gAAAABJRU5ErkJggg=='); }
			#storking_hatena .question { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGA86N/Bof6cAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAbElEQVQoz2NsmfX8PwOJ4Nx9BgYWGIMUcOPZIwYmBjIBCzbBtW0SKPzgqhcYaphwaQquegHXgG4QhkZkTei2oWsm24/U17i2TQKr37BqRPYPut/QQxbDRlyBgc7HGo/Y4o1qgcNy7j4k7ZEKAJCrLLonviIAAAAAAElFTkSuQmCC'); }
			#storking_hatena .rss { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGA87NHB6H1wAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAVklEQVQoz2NsXfrrPwOJ4OyVtwwsMAYp4MazRwxMDGQCFnSBtW0SGIqCq15giOG0MbjqBVwDNsOo51RsTh4cTqW/RsbWpb/+0zflnL3yluHGs0ckawQAa7sn6/7n0QkAAAAASUVORK5CYII='); }
			#storking_hatena .star { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGBAAB+RidT8AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAeElEQVQoz2NsXfrrPwOJ4OyVtwwsMAYp4MazRwxMDGQCFmyCa9skUPjBVS8w1DDh0hRc9QKuAd0gnDYSsg2rjci2YLMJp0ZinIlTIzbbiQocfE6EAcbWpb/+oycAQtFx49kj7KGKKySJ9iPelHP2yluGG88ekawRADOdNoPF+NvpAAAAAElFTkSuQmCC'); }
			#storking_hatena .ugomemo { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGA83AhN1xckAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAiElEQVQoz2M88rXmPwOJ4PXnewwsMAYp4Pn9TwxM6IKHTm9nOHR6O04+DDCha+rzeYehoc/nHYZmJgYyAYbGoi1CDMSIMSE7kxBAVsOCLgnzIyFbmYi1Dd1WyvxoZ+qJUyG6JphaxiNfa/6v3TeVpKhQFbGGBA66jcQkOZbXn+8xPL//ieQEAABYbUSfMojQ8AAAAABJRU5ErkJggg=='); }
			#storking_hatena .profile { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDGBAWEHspRS8AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAvElEQVQ4y2N8/eHnfwYo+PqTkWHNzi8wLsOx6z8ZrDTZUfjr2iUZGZAAC0wjAwMDw/OXrxgYGLgYjl3/ycDAwMBw49kjBitNVRQ+OmBioBCwfP3JCLUZ4Uxkm9D56IARPQy42eFcrHz0MGKCSSC7hBD/2PWfcJdRPwwI8dHDhBHdRFLTBQs2Z5GSLigPA2y2k5IuWHoWvfuPLKkgzsaIGSZCaOkCwWeBacSV1tHDREVOFIVPeRgQSuuE0gUA1sPGCdDS0I0AAAAASUVORK5CYII='); }
		]]></>);
	}

})();