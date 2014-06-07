// ==UserScript==
// @name           fastnessTopAndBottom
// @namespace      http://d.hatena.ne.jp/so_blue/
// @description    ページの先頭、最後へ即座にスクロールさせます。
// @include        http://*
// @include        https://*
// @version        0.2
// ==/UserScript==
(function() {

	if (window === window.parent) {

		var d = document;
		var div = d.createElement('div');
		
		var box = div.cloneNode(true);
		box.id = 'fastnessBox';
		
		var upper = div.cloneNode(true);
		var imgUpper = d.createElement('img');
		imgUpper.id = 'goPageTop';
		imgUpper.src = 'data:image/png;base64,' +
						'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADo0lEQVR4nGJgoDEAAAAA//+iOQIA' +
						'AAD//2JE43NsCWX4Ls2OqoIRXTUjds1PfzIweK1g4GRgYPgBEwMAAAD//2JBUyOAYTDUFBZmBgZO' +
						'Jgj/xz8Ghj//MJ3IxAg34wVMDAAAAP//QneEBAMDgwGURgcs3U7MwQwMDAyl+/6uZWBg+INFzQsG' +
						'BoYLyBYAAAAA//9C98EHqAIOdMMnebFWBbi7ePz//4+Bk3P/i5ytv1qxWPIDagYcAAAAAP//Qrfg' +
						'B7LtMDWLQti7ne0cE4V1XBgY/v1hCGT4nSDIe/JT9IqvxTh8AgcAAAAA//9CDyJ0wLI4lLPH2cY2' +
						'X0jHhYGJ4S8Dw98/DH///WZ4d20fw+Gzl6ZELP1UiM8SAAAAAP//wmcBy5Iwzh5HK6t8YW0nBiaG' +
						'fwwM//8yMPz7y8Dw7zfD339/GN7dPMxw9OKtaWGL3ufjsgQAAAD//8JlAcRwS/N8YU0HBibGfwwM' +
						'/6EW/P/L8P/fHwaGf38Y/v37zfDuzgmG41ceTQ9Z8DYPmyUAAAAA///CZgHL0gjuXntTwzxhdRsG' +
						'ZkYGBgbG/wwM//8x/P//l4GB4S8DA9QChn+/Gf79/c3w7sF5hhPXXswInv8mF90SAAAAAP//QreA' +
						'ZUkEd6+DkU6esJolAxMTTMV/CP7/l4Hx/1+G/z8/Mvz//paB4ccHhv8/PzH8+fWF4f37twxnX/LN' +
						'CpzzMhvZEgAAAAD//0K3QGBrDMN7GW4GBlZmBgYOVgYGcftMBpb/PxgYvjxn+P/lBcP/by8Z/v94' +
						'y8Dw9xfDr38MDJ9+MTD8+gvJeC+/MTDYT2cQZEBKqgAAAAD//0K3QISBgUGHgYFBhoGBgYWBgYHj' +
						'QRHDdHEREYb/P94wMMB8BMVvfzAwyLYyZDJAkvcfBgaGJwwMDFcYGBjewAwEAAAA//9CzwdfGBgY' +
						'bjAwMDyA8iV+/WdAGA61gJERwv4NKS4uMCDyzg+oGXAAAAAA//8inNGghjEwMTAwIlnCwAjlQ9Q/' +
						'YMABAAAAAP//QrcAAzCiG45kARMzId0MDAAAAAD//yJsASOa4TALET7ACwAAAAD//yKohBEpiJAN' +
						'h/uKAAAAAAD//yKsBCnVIBsOZxMAAAAAAP//IuwD5EhF9g2MTQAAAAAA//8iGAfvvkMsYWKG0IxI' +
						'vvj0nbAFAAAAAP//IuRJfDUcAwOWGgwdAAAAAP//ImQBBwOkjkWv4WAAVoP9wCHPAAAAAP//AwCp' +
						'dPLtv0Jl1QAAAABJRU5ErkJggg==';
		imgUpper.alt = 'upper arrow';
		imgUpper.addEventListener('click', fastnessScroll, false);
		upper.appendChild(imgUpper);
		box.appendChild(upper);

		var lower = div.cloneNode(true);
		var imgLower = d.createElement('img');
		imgLower.id = 'goPageBottom';
		imgLower.src = 'data:image/png;base64,' +
						'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADvklEQVR4nGJgoDEAAAAA//9iJCDP' +
						'sTWM4bs0BwMDIyOSakYI89lPBgaPZQycDAwMP3AZAAAAAP//YiFggYA0JwODdu5yBoZ/fxkY/v1m' +
						'YPjzi+H/318MDH9/MjAuLWFgYGAQYGBgeIHLAAAAAAD//2Ii5ANGRgao4X8YGP79Yfj//y8DA8M/' +
						'Bob//xgYIbo58BkAAAAA//8i5ANI0Pz7DbeA4T8UM/yFWYAXAAAAAP//ImgBAyMDA8PfXxCXwyyA' +
						'WkaMBQAAAAD//yLsAyYGSJgz/GNg/PeH4f//PxAf/f9NlAUAAAAA//8iygKGvz8ZGBj+IXzx7zcD' +
						'wz/iLAAAAAD//yIuDqAWMPz/C8W/GRj+ExdEAAAAAP//ImgBBysDA8O/nwwM//8xMDDALIDEAQcb' +
						'YQsAAAAA//9Cz2gcm6IYvstyMTCwMUMMl/CsYGBl+s/A8P8fw3+GvwyMMAv+/2H4/fc3w9sT8xh+' +
						'/WVg+MvAwPDqKwOD7TTUjAcAAAD//0L3Ac+DjxxLjQz0o4XVLBmYmBgYGP79YPj/7z8DA+N/Bkao' +
						'D/7//Mjw/8dbBuafHxhE5TUY/v76wvDxw1uGU8941zMwvOJBtgAAAAD//0K34E/e1h8zPv28IJLI' +
						'+NddSNkUYsnfHwwMX58z/Pv6guH/15cM/3++ZWD4/4uBkZGB4Q8DA8OnnwwMGy4LHsxe/6qPASIE' +
						'BwAAAAD//0K34AsDA8Odmj0/O5iYrjDG/f7sJsDLxcD8+THD/x9vGBiYGBgYmKApiwkSLJ9+MjBs' +
						'vCx4MHv9+wYGBoY7UDPgAAAAAP//wlbYsTAwMIgwMDBodHpwVYVrf3MV4mJgYGHGNPzjLwaGjRcF' +
						'D2ZBDL/BwMDwBt0HAAAAAP//wpbQ/kAV3ijf8a1t7Q2evR9+QgxkQDN802WhQ/gMZ2BgYAAAAAD/' +
						'/8KVkuGWFG/90rL2Ou++D78YGP7+RzU8c+27enyGMzAwMAAAAAD//yKEWBgYGCQYGBgcJvnz73tY' +
						'zfD/UR3D/2mBggcYGBgcoHJ48xIAAAD//yLJkiVhgvuWhgvuI8VwAAAAAP//wshoB5IYvktwQyIT' +
						'hpmYGRiYWaG5momB4c9/BoZ//5HUMELEP39jYNBoRs1oAAAAAP//Qo8DAQZkK5GqyX//GBi+/2Zg' +
						'+PGbgeHvP1Q5BkaUKlUA2UAAAAAA//9C94EEAwODAZQmB7xgYGC4wIBUhQIAAAD//8IIIqgL8FaD' +
						'eMAPBgaGDwxIQQQAAAD//6I5AgAAAP//AwAeCTSvgb9I4gAAAABJRU5ErkJggg==';
		imgLower.alt = 'lower arrow';
		imgLower.addEventListener('click', fastnessScroll, false);
		lower.appendChild(imgLower);
		box.appendChild(lower);
		
		d.body.appendChild(box);

		//ボタンのstyle
		GM_addStyle('' + <><![CDATA[
			#fastnessBox {
				position: fixed;
				bottom: 10px;
				right: 0px;
				width: 24px;
				z-index: 9999;
			}
			#fastnessBox > div {
				height: 24px;
				margin-bottom: 10px;
			}
			#fastnessBox > div img {
				opacity: 0.3;
			}
			#fastnessBox > div img:hover {
				opacity: 1;
				cursor: pointer;
			}
		]]></>);

	}

	//スクロールさせる関数
	function fastnessScroll(e) {
		var p = (e.target.id =='goPageTop') ? 0: (document.documentElement.scrollHeight || document.body.scrollHeight);
		window.scrollTo((document.documentElement.scrollLeft || document.body.scrollLeft), p);
	}

})();