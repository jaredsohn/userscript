// ==UserScript==
// @name        URL Cleaner
// @namespace   AmpliDude
// @include     http://*
// @description Clears, decodes (base64, rot-13, rot-1, other) and replaces links on websites
// @version     1.0.2
// ==/UserScript==

(function() {

	urlCleaner = function() {
		/* Function: decode ROT-13 string */
		//+ Jonas Raoni Soares Silva
		//@ http://jsfromhell.com/string/rot13 [rev. #1]
		String.prototype.rot13 = function() {
			return this.replace(/[a-zA-Z]/g, function(c){
				return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
			});
		};

		/* Based on above prototype, decode ROT-1 */
		/* All chars that are not preceded with an exclamation mark are rotated by 1 */
		String.prototype.rot1 = function() {
			return this.replace(/[^!=\-&_]/g, function(c){
				return String.fromCharCode(c.charCodeAt(0) - 1);
			}).replace(/(![=\-&_Y]|[^!]-)/g, function(c){
			/* Note about this part: "bcd!-234" is "abc-123" but "bcd-234" is "abc,123" */
			/* !Y is Z */
				if (c.charAt(0) == "!")
					return (c.charAt(1)=="Y") ? "Z" : c.charAt(1);
				else
					return c.charAt(0) + String.fromCharCode(c.charCodeAt(1) - 1);
			});
		};	
		

		var reTraffic = /(protraffic|clicksagent|greatdemosite|evrotraff|fpctraffic2|trafficholder|trafficroup|g-traffic|refer\.ccbill|trafficshop)\.(com|net)/g;
		
		var urlCleaner = function() {
			var pattern = {
				"order": "huUTiIQVk4x2BMgt6G9LYPjKpWJDqw8a0AHl7CEsndSRz5obX3eryFOvm1NZcf",
				"a": "apGPHevTgzFoNbrwhEqAY1JZCkdcIsDO2X9fK6MVx8tRQBU3LWj75nyu4S0mil", // aLW8
				"b": "bvH0PCOAJxTKukNzUgE92In643sReq7ZMrw8LVyohjtplDYiWX5SFfcamBGQ1d", // bWXj
				"c": "csgBXVNJmfDuSPt9KlE6ZCa3TH7hnqLo8AWxrUGj5Oi41kb2YwvRQeFdpMyz0I", // cYwO
				"d": "dxAJqfvXWwn0PLkBGj4F1ycb9oiOUpgSTtRsEhZmr6YlQHu3aeK8DN75zIM2VC", // dae6
				"e": "ezK4Dp2mHY9cWZuEsf37oFSa5xMnkCbP8lJUQdgq16iw0VLBNIvGtXjThAyOrR", // eNI6
				"f": "f1JWH2tonLAQxhXSCmTMa39sNv0YiVzFPudypZrB7ljIbwGRkq6gO84KeDcUE5", // fkql
				"g": "gsEPJKLu85X3yvHBtWTZOMIariD6Np7FRGxlQ1mfkjdncqCowbAVe94S2YUzh0", // gwbj
				"i": "i52jJrhAnDImC8F4x9lWPgYLEOUsN6q7TSkKf0Mu1ywzQoeXtpcvdaHVRbG3ZB", // itpy
				"j": "jYPwv2O0qFQb5ZiEn8d6fIJUzGa1N9M73CTtHXmkWS4AyxcpLRDguBrolVsehK", // jLRS
				"k": "ksABZth0aR9UNj1crl3wJ5TiyqPbzQgpx67DFvCEmfo2endLXSVOYHuIGKWM48", // kXSf
				"l": "lnNDQJ3XEseuq0a6z4ZPO1M9fBA2hbSUpCvHrKTgidRGmFtLoy5IWw7VcjkYx8", // loyd
				"m": "mhFHoN1Jrtc5TWzZRlQwduvD9n3k624LX70gKiYABMeVfGOCj8xSaqypIUsPbE", // mj8M
				"n": "ncP9I1Mrx0okmNZvlDfT6zt3hdOWKYjQa8XSbEGse4ygFqiUA2JuCLp5R7BwVH", // nA24
				"o": "omPbXaE2hc76F1sfS5puzM8ygtYHiZkCLIWNQT0enqOvKUxB9rj4RVwAdJlDG3", // o9rq
				"p": "psSBAJrNDk4PcbXhY8ET9zF53IoQKxwvfMtm0ea1ZURud7L62yGlqjOnCHWVig", // p2yU
				"q": "q2dv1myOTiVhEH5alpMnQr0SP68zBe3gLA7o9IZNkUwjJWDuFcXtfRbGYsK4Cx", // qFcU
				"r": "rDdA5yEKz6eQmoZWbc7PgsIpBNFHOlnMjLfXT8x0RGUqYvu1Swt3ai2kh4CV9J", // rSwG
				"s": "sX2Pc5qalA6RWYhFS1w0UTDEbnBp4odHQJkImrGvy3uZOLxKgefMNCV7z9ji8t", // sge3
				"t": "tNSLF4fe1owQnpy6aUH3bAOmiMdjshlvV9rkIT0BzGEDgPZ8R7WcKqJY25xuXC", // tR7G
				"u": "ucdy0L3eN6xqsbD7S8JUkj5QhP4grF2fOI9imZltCATzVpEnBWowav1YGMKHXR", // uBWA
				"v": "vWtBkEI9NPX41M7yCKspDFVUzSqTecAw0m5JnuQ3djiHOZrfhoLgYRl2ba6G8x", // vhoj
				"w": "wfsVBkyjhUXARZL4xeHlSgYrcP6uQmaKo9EWv21iMz078t3D5qFJOCNnTIdbpG", // w5qz
				"x": "xPG1ObRq6E0TogFNBpwijmCdesh8AtXS3MHZDQrYa5f9Jz2WU4vcyKI7klVunL", // xU45
				"y": "ygUleV0C9xYNvGOKFWsjkqfPmt6hH2TZJuRniDrL4cI87z1d3wXBbSEaM5AQop", // y3wc
				"z": "zXZb7ILU10Pi8mhpltcosn3WVMBxujCQFKHASqJYONkaEG9DT4d6wfRegrv5y2", // zT4N
				"A": "AIQljrOW7b9scw6dg2KvNqiF8BME4ftZDPmkXzuVxYHCeSJG31TLy0RaUnoph5", // A31Y
				"B": "Baw9VCNHODbhk42yixnolmvGTqRXt35MPrjISJEWY7f6cQzKdF0UugAZ18pLse", // BdF7
				"C": "C7YB3je1z4EPToOvgxKhyA2a5wVkDnNMHLc8GuWqSJmifU6d9l0rsbQXIZtFRp", // C9lJ
				"D": "DdiGEY8P9eIHnbmFSZkgaXQAhovW3TjruflN2y7BL4MtOJzxpqU60wRK1scC5V", // Dpq4
				"E": "EHAfiIU5L0BxtWznkT7CcP3GJ1Y4KZVb26Xoed8jyraqRuvQwhsmS9FNlOpDMg", // Ewhr
				"F": "FNU3p7aBRVrOshZJyjl6deMK2YzgTbi1P0W4nqmLHktS9cvAGxCwuQIX58oDfE", // FGxk
				"G": "GEY59tKgZPsDiTMmJp0cOfeQRrzVal2SxNIW36kBCj7LU8y14ndHAqvuhboFwX", // G4nj
				"H": "HLA9XJKOdi8v5B0mochZuqa2Eygr7ejU1YDfPbQnWRzxwNtTlsSpFk6CV3G4MI", // HlsR
				"I": "IktWmzfGnBs1vDRLQPaHVMCZKdgYXESNFh52x3A4pw07c9uoqej8OlU6TryJib", // Iqew
				"J": "JAdMYTBIRaueX3kS6HCE4FVhg1Lrl0y8Uno7p5iqWjfmGQvtzsxZDcw9KNPb2O", // Jzsj
				"K": "KLHzE8kmT9qgPvRGp7welFQD5BuVnjr64o2fxYCt3dsIMiyObhScN1XZA0UWJa", // Kbhd
				"L": "LWavE6ZCy579IkqjnQrJ3eUXs1hxgADPwldfNV4cYtiHzmuGRS0Bb2op8FKMOT", // LRSt
				"M": "Mw5iEexyU7VW2BRTKmlcvOou3PLXkpZ0sjnGHdrIDfJY48zQtNq6h91SgAaCFb", // MtNf
				"N": "Nuz2gT8xV5re9jRwKsJWA4pBbSctM7Xy0hlFvqI1nYod6mQCOPUEZ3iGaHLkfD", // NOPY
				"O": "O9dfiPmZbUFBJYC5z4qxtgrj8R7DMeQSy2uoIVXaNvAK1cTwGsl6WnL0E3pkhH", // OGsv
				"P": "PQJumeWLd9nx8jokz6sMc2N05hSfRqZOTAYCVXKaGDU3ti7pgIrHFywEB4bl1v", // PgID
				"Q": "QCe6L8lWS1soiMKOyvUA5ZfB7EDbRzhwJcYItHnFrdkGuV3ap92NmT40xqgjXP", // Qp9d
				"R": "R7B2Chd4kDvc9PKF5tG6HETz8SgufeVnLU3jWZbqoMxiJ1arNlyXpswOQ0IYmA", // RNlM
				"S": "SeDMCPfdo9Ig72uaWzN3kGLp4QBTxFnUA5bOcysqtwh6YVX8vZli1KRJEjHmr0", // SvZw
				"T": "T0KxhcaPZLOleJWAmvXYSEC1RnI93Mdyip8tuNQVqg7frk6BGbs2owFzHj5UD4", // TGbg
				"U": "USKyOztEqVLIRB4km8xis6wWDcXb973nCTeZFNGufg25vJAd1lM0jhaPYHQorp", // U1lg
				"V": "VDt7LwiYFRPZzlqGBm4AK5IuOeS1dWUsCyaMkx3cf68pNbQh2TJo0vEXngjrH9", // V2T6
				"W": "W6CXhu9ylrjpwc7iKe2bFgMtOJSLZsaqHBdP81IT5NfvmxRUAn3YGD4zQoV0Ek", // WAnN
				"X": "X6nGBOqp5ulFhZUzetEcbdNL87S24IQPm3RCADMg9vYwfojsxHKJTayk0rWi1V", // XxHv
				"Y": "YekFo4xREVdpN85Gc3gPJlBf9XHuWizyCnjKm6MD1AST7st0rOqwhZL2aIQvUb", // YrOA
				"Z": "Z4bHQr1hgXncI2FMu0dBzERlm6kxsJqSpL8OjNvV39WGoiwPKY5tfTA7eUyCDa", // ZKY9
				"1": "160WTmRqnyJe49dEfMi2UHDYpcVaz7ObA8QXj3NhGxsw5KBgrvklCZISouFPLt", // 1rvx
				"2": "2kXelCYR4zNiLH8m3UZ1Pg7Kjp9qTfWbcr5D6AvsBhVtInGuwyMS0FdoQxaOEJ", // 2wyh
				"3": "3f10UaWhlriVXgbQqRvKBECwcFykxIzs67mPGHSMoDp845LAJut9YOnNZej2Td", // 3JuD
				"4": "48ztHaU3M0uensEJLpcCwTjq7Wr9OiQ2ADPvhfYx5Bb1VRFoy6mSXlkNKGdgIZ", // 4y6B
				"5": "5uE2L8NMbrdCIsvVKkJYo963PpjBqnF7tDQm4xc1ZShwUWRXeH0fAilyaTGOgz", // 5eHS
				"6": "6WVolOMb3GPhz9riDyXFkZgBJIvEQq8Kma5Lsxc0pfeUwHjS7TtRunCdNA14Y2", // 67Tf
				"7": "7P2msG1BioQwUkTu0VLbYcOve6nrZ8KdpaylxWqMgNH5h3DAICFXtj4RSfJ9zE", // 7ICN
				"8": "8GcezXwSlkg1mhHyCIjNTidvZqAJptfF4KRVEoLsWQ6bDuMaB2U359OP7nY0rx", // 8B2Q
				"9": "9LqPF0eyOXsSazcZMAhgCEY2wpU3Ho8BvQlG5N1nuWi6VbRKJkrT4Dfmtxd7jI", // 9JkW
				"0": "0uJz6VMKTegcGXoBI3iaHP9rZ5qswb4WUxDvCytdnQS8k1jYNf7LOmEhFl2RpA" // 0NfQ
			}
			var chr = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
			var pad = [ 96, 48, 46, 53, 93, 96, 49, 47, 96, 95, 93, 95, 93, 50, 50, 94, 52, 50, 45, 49, 96, 44, 93, 49, 48, 98, 47, 96, 93, 46, 94, 98, 53, 47, 98, 95, 49, 95, 93, 49 ];
			var ord = "0123456789abcdefghijklmnopqrstuvwxyz";
			
			this.fixUrl = function(url) {
				data = {
					originalUrl: url,
					debugData: [],
					urls: []
				};

				// Bizarre fixes
				url = url.toString().replace(/%(s=[^%&]|link=pics|p=0)/g, "").replace(/(=Http|\*\*http)/g, "=http").replace(/\/\*\*\*\/$/, "");
				
				// unescape (urls can be escaped multiple times)
				while (/%u[a-fA-F0-9]{4}/g.test(url) || /%[a-fA-F0-9]{2}/g.test(url)) {
					url = unescape(url);
				}
				url = url.replace(/"|'/g,'');
				data.debugData.push({url:url, f:1}); // 1

				// ROT-13 + Base64 encoding
				re = url.match(/=~?(nUE0[a-zA-Z0-9+\/=]+)/);
				if (re != null) {
					url = deBase64(re[1].rot13());
					data.debugData.push({url:url, f:2}); // 2
				}
				
				// Base64 + ROT-13 encoding (some prefixes)
				re = url.match(/=((?:ampq|dG55|c3V0|Y3Zw|Y2Vi|aXZx|eW9j|Z3Rj|Zmd3|dWd6)[a-zA-Z0-9+\/=]+)/);
				if (re != null) {
					url = "http://" + deBase64(re[1]).rot13();
					data.debugData.push({url:url, f:3}); // 3
				}
				
				// ROT-1 encoding
				if (url.indexOf("iuuq") != -1) {
					url = url.substr(url.indexOf("iuuq"));
					url = url.rot1();
					data.debugData.push({url:url, f:4}); // 4
				}

				// False positive Base64 encoded links
				re = url.match(/\/(v|x)\/cT1[a-zA-Z0-9+\/=]+\/\*\*\*\//);
				if (re != null) {
					url = "http://" + url.substring(url.indexOf("/***/")+5);
					data.debugData.push({url:url, f:5}); // 5
				}
				
				// Base64 encoded links (=aHR0, =~aHR0, =cD0, /cT1, b64aHR0, =bj0)
				re = /=?(?:~*|b64|\/)((?:aHR0|cD0|cT1|bj0|Li4v)[a-zA-Z0-9+\/=]+)/;
				// can be encoded more than once
				while (re.test(url)) {
					rm = url.match(re);
					if (rm != null)
						url = deBase64(rm[1]);
					data.debugData.push({url:url, f:6}); // 6
				}
				
				// Reversed Base64 encoded links
				re = url.match(/g=([a-zA-Z0-9+\/=]+0RHa)/);
				if (re != null) {
					url = deBase64(re[1].split("").reverse().join(""));
					data.debugData.push({url:url, f:6}); // 6
				}

				// Note: there are just couple of regexp's to remove unwanted params
				// Why? Because some of links require params, therefore removing all of them would cause link to be invalid
				// Todo: add more useless / problematic params
				url = url.replace(/amp;/g, '');
				url = url.replace(/\*/g, '&');
				if (url.substring(url.lastIndexOf("http")).indexOf(document.domain) == -1)
					url = url.replace(/&(p|s|c)=\w{0,3}/g, '');
				url = url.replace(/&link=(big|today)/g, '');
				url = url.replace(/(&var(1|2)=(?!http)\w*(=\d+g)?)/g, '');
				url = url.replace(/&gr(oup)?=[A-Za-z\-]+/g, '');

				// Other bizarre fixes
				url = url.replace(/\?http/g, "=http").replace(/php\?path=/g,"php?path=http://");
				if (url.indexOf("|") != -1)
					url = url.substring(0, url.indexOf("|"));
				if (url.indexOf(";") != -1)
					url = url.substring(0, url.indexOf(";"));
				data.debugData.push({url:url, f:7}); // 7
			
				// Pattern encoded links
				patt = url.match(/=(aLW8|bWXj|cYwO|dae6|eNI6|fkql|gwbj|itpy|jLRS|kXSf|loyd|mj8M|nA24|o9rq|p2yU|qFcU|rSwG|sge3|tR7G|uBWA|vhoj|w5qz|xU45|y3wc|zT4N|A31Y|BdF7|C9lJ|Dpq4|Ewhr|FGxk|G4nj|HlsR|Iqew|Jzsj|Kbhd|LRSt|MtNf|NOPY|OGsv|PgID|Qp9d|RNlM|SvZw|TGbg|U1lg|V2T6|WAnN|XxHv|YrOA|ZKY9|1rvx|2wyh|3JuD|4y6B|5eHS|67Tf|7ICN|8B2Q|9JkW|0NfQ)/g);
				if (patt != null) {
					url = dePattern(url.substring(url.indexOf(patt)+1));
					data.debugData.push({url:url, f:8}); // 8
				}
				// Pattern 2
				patt = url.match(/=o5o4/);
				if (patt != null) {
					url = dePattern2(url.substring(url.indexOf(patt)+1, url.indexOf("&")));
					data.debugData.push({url:url, f:9}); // 9
				}

				first_http = url.indexOf("http");
				last_http = url.lastIndexOf("http");
				
				// If the decoded url has some garbage before 'http'
				if (first_http != 0)
					url = url.substr(first_http);
					
				// In case of multiple urls in one link, return only the url with highest rank
				// Todo: improve
				if (first_http != last_http) {
					temp = url.split("http");
					for (i=1; i<temp.length; i++) {
						rank = 0;
						
						// first url
						if (i == 1) rank -= 1;
						
						// traffic type sites
						re = temp[i].match(reTraffic);
						if (re != null) rank -= 2;
						
						// domain at the end of the link (.com, .com/ etc.)
						re = temp[i].match(/\.(com|net|org|biz|coop|info|museum|name|pro|edu|gov|int|mil|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gv|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rw|ru|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|ws|wf|ye|yt|yu|za|zm|zw)\/?$/g);
						if (re != null) rank -= 1;
						
						// bumpers
						re = temp[i].match(/\/(in\d?|g?o(ut)?|x|video)\.(php|cgi)\?/g);
						if (re != null) rank -= 2;
						
						// other
						re = temp[i].match(/url=|\/\?go=/g);
						if (re != null) rank -= 1;
						
						// valid pages
						re = temp[i].match(/index(\d+)?\.(s?html?|php)/g);
						if (re != null) rank += 2;
						
						re = temp[i].match(/\/gallery\//g);
						if (re != null) rank += 1;
						
						data.urls.push({url: "http" + temp[i], rank: rank});
					}
				} else {
					data.urls.push({url: url, rank: 0});
				}
				// Sort by rank
				data.urls.sort(function(a,b){return b.rank-a.rank;});
				
				
				for (i=0; i<data.urls.length; i++) {
					// If theres no q mark, or index of q mark is greater than amp index, there should be no params
					i_qmark = data.urls[i].url.indexOf("?");
					i_amp = data.urls[i].url.indexOf("&"); 
					if ((i_qmark == -1 || i_qmark > i_amp) && i_amp != -1)
						data.urls[i].url = data.urls[i].url.substring(0, i_amp);
					data.debugData.push({url:data.urls[i].url, rank: data.urls[i].rank, f:10}); // 10
				}
				return data;
			}
			
			/* Function: decode Base64 String */
			var deBase64 = function(_str) {
				// Code was written by Tyler Akins and is placed in the public domain
				// It would be nice if you left this header.  http://rumkin.com
				base64_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
				
				// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
				_str = _str.toString().replace(/[^A-Za-z0-9\+\/\=]/g, '');

				var output="";
				var chr1,chr2,chr3;
				var enc1,enc2,enc3,enc4;
				var i=0;

				do {
					enc1 = base64_keyStr.indexOf(_str.charAt(i++));
					enc2 = base64_keyStr.indexOf(_str.charAt(i++));
					enc3 = base64_keyStr.indexOf(_str.charAt(i++));
					enc4 = base64_keyStr.indexOf(_str.charAt(i++));
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					output = output+String.fromCharCode(chr1);
					if (enc3 != 64) {
						output=output+String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output=output+String.fromCharCode(chr3);
					}
				} while (i<_str.length);

				output = unescape(output);
				return output;
			}
			
			/* Function: Decode urls using declared patterns */
			var dePattern = function(_url) {
				var outurl = "";
				for (m=0; m<_url.length; m++) {
					if (/[a-zA-Z0-9]/.test(_url[m])) {
						outurl += pattern.order.charAt((62 - pattern[_url[0]].indexOf(_url[m]) + m%62)%62);
					} else {
						outurl += _url[m];
					}
				}
				return outurl;
			}
			
			var dePattern2 = function(_url) {
				if (_url.length%2 != 0) return "";
				return _url.replace(/[a-z0-9]\d/g, function(c, d) {
					c1 = c.charAt(0);
					c2 = parseInt(c.charAt(1))-1;
					pos = c2*36 + ord.indexOf(c1) - pad[(d/2)%40];
					if (pos > 94) return "*";
					return chr.charAt(pos);
				});
			}
			
		}

		/* **************************************** */
		/*             Link parsing loop            */
		/* **************************************** */

		uc = new urlCleaner();
		
		var links = document.links;
		for (var j=0; j<links.length; j++) {
			if (!/http:/.test(links[j].href)) continue;

			var out = [];
			if (typeof links[j].realurl != "undefined") {
				links[j].onclick = function(){};
				links[j].onmouseup = function(){};
				links[j].onmousedown = function(){};
				links[j].onmouseout = function(){};
				links[j].onblur = function(){};
				out = uc.fixUrl(links[j].realurl);
			} else
				out = uc.fixUrl(links[j].href);

			links[j].ucData = out;
			links[j].href = out.urls[0].url;
			
			// dim all the links with traffic-type sites
			re = links[j].href.match(reTraffic);
			if (re != null) {
				links[j].style.opacity = 0.2;
			}
			// remove the onmouseover action, so it won't change the href value
			omo = links[j].getAttribute('onmouseover');
			if (omo != null) {
				links[j].removeAttribute('onmouseover');
			}
		}
	}
	
	var scr = document.createElement("script");
		scr.type = "text/javascript";
		scr.appendChild(document.createTextNode('('+ urlCleaner +')();'));
		document.getElementsByTagName("head")[0].appendChild(scr);
})();