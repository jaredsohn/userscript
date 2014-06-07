// ==UserScript==
// @name	Neptun.NET AutoLogin
// @description	Bejelentkezés a Neptun.NET-be egyszerűen
// @version	1.3.2-duf
// @namespace	http://userscripts.org/scripts/show/40510
// @include	https://neptun.bmf.hu/hallgato/*
// @include	https://neptunweb.bmf.hu/hallgato/*
// @include	https://neptun3r.web.uni-corvinus.hu/*
// @include	https://neptun3r.nyme.hu/hallgato/*
// @include	https://neptun.uni-pannon.hu/hallgato/*
// @include	https://netw*.nnet.sze.hu/hallgato*/*
// @include	https://web3.neptun.szie.hu/*
// @include	https://neptunweb.zmne.hu/hallgatoi*/*
// @include	http://neptunweb.zmne.hu/hallgatoi*/*
// @include	https://neptun*.bgf.hu/neptun/*
// @include	http://neptuna.avkf.hu/neptun/*
// @include	http://neptun.kodolanyi.hu/hallgato*/*
// @include	https://neptun*.ppke.hu/hallgato*/*
// @include	https://www*.neptun.unideb.hu/hallgato*/*
// @include	https://193.225.83.196/hallgato*/*
// @include	http://193.225.83.196/hallgato*/*
// @include	http://193.225.83.198/hallgato*/*
// @include	https://193.225.187.180/hallgato*/*
// @include	https://frame*.neptun.bme.hu/hallgatoi*/*
//
//		Készítette:
//			Roncsák Tamás
//

// ==/UserScript==

const loc=String(window.location.href); // teljes cím
const path=String(window.location.pathname); // GET nélkül
const scriptURL="http://userscripts.org/scripts/source/40510.user.js";
const scriptText="http://userscripts.org/scripts/review/40510?format=txt";
if( loc.substr(loc.search("//")+2, 14) == '193.225.83.196' || loc.substr(loc.search("//")+2, 14) == '193.225.83.198' ) {
	suli = "sote";
} else {
	suli=loc.substr(loc.indexOf(".")+1, loc.indexOf(".hu")-loc.indexOf(".")-1);
}
const school = suli;
const version='Neptun.Net AutoLogin v1.3.2-duf (2009.07.31)';
const imp=0;
const REV=40;

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

/* JSON2 */ eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2(!6.G){G=5(){5 f(n){3 n<10?\'0\'+n:n}Q.C.q=5(){3 6.K()+\'-\'+f(6.I()+1)+\'-\'+f(6.1d())+\'T\'+f(6.Y())+\':\'+f(6.V())+\':\'+f(6.R())+\'Z\'};9 m={\'\\b\':\'\\\\b\',\'\\t\':\'\\\\t\',\'\\n\':\'\\\\n\',\'\\f\':\'\\\\f\',\'\\r\':\'\\\\r\',\'"\':\'\\\\"\',\'\\\\\':\'\\\\\\\\\'};5 4(b,d){9 a,i,k,l,r=/["\\\\\\1b-\\15\\12-\\11]/g,v;U(7 b){e\'u\':3 r.E(b)?\'"\'+b.o(r,5(a){9 c=m[a];2(c){3 c}c=a.P();3\'\\\\O\'+N.M(c/16).B(16)+(c%16).B(16)})+\'"\':\'"\'+b+\'"\';e\'D\':3 L(b)?A(b):\'8\';e\'J\':e\'8\':3 A(b);e\'z\':2(!b){3\'8\'}2(7 b.q===\'5\'){3 4(b.q())}a=[];2(7 b.p===\'D\'&&!(b.H(\'p\'))){l=b.p;h(i=0;i<l;i+=1){a.x(4(b[i],d)||\'8\')}3\'[\'+a.y(\',\')+\']\'}2(d){l=d.p;h(i=0;i<l;i+=1){k=d[i];2(7 k===\'u\'){v=4(b[k],d);2(v){a.x(4(k)+\':\'+v)}}}}1g{h(k F b){2(7 k===\'u\'){v=4(b[k],d);2(v){a.x(4(k)+\':\'+v)}}}}3\'{\'+a.y(\',\')+\'}\'}}3{4:4,1f:5(a,b){9 j;5 w(k,v){9 i,n;2(v&&7 v===\'z\'){h(i F v){2(18.C.14.13(v,[i])){n=w(i,v[i]);2(n!==17){v[i]=n}}}}3 b(k,v)}2(/^[\\],:{}\\s]*$/.E(a.o(/\\\\./g,\'@\').o(/"[^"\\\\\\n\\r]*"|19|1a|8|-?\\d+(?:\\.\\d*)?(:?[X][+\\-]?\\d+)?/g,\']\').o(/(?:^|:|,)(?:\\s*\\[)+/g,\'\'))){j=1c(\'(\'+a+\')\');3 7 b===\'5\'?w(\'\',j):j}W 1e S(\'1h\');}}}()}',62,80,'||if|return|stringify|function|this|typeof|null|var|||||case|||for|||||||replace|length|toJSON||||string||walk|push|join|object|String|toString|prototype|number|test|in|JSON|propertyIsEnumerable|getUTCMonth|boolean|getUTCFullYear|isFinite|floor|Math|u00|charCodeAt|Date|getUTCSeconds|SyntaxError||switch|getUTCMinutes|throw|eE|getUTCHours|||x9f|x7f|apply|hasOwnProperty|x1f||undefined|Object|true|false|x00|eval|getUTCDate|new|parse|else|parseJSON'.split('|'),0,{}));

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
//  Kilépés kezelése
	if( (path.search('hallgato')!=-1 || path.search('HALLGATO')!=-1 || path.search('neptun')!=-1) && path.search('main.aspx') != -1 ) {
	// Túlterhelés esetén
		if(		$('body' > 'h1').text() == 'Service Unavailable'
			 || $('body' > 'h1').text() == 'Bad Request (Invalid Hostname)'
			 || $('body').text() == 'A Neptun szerver nem elérhető!'
			 || $('body').text() == 'A rendszer üzemeltető számítógépek túlterheltek.<br>A szerverek száma a jelenlegi terhelés lekezelésére nem elégségesek!<br>Kérem próbálkozzon később.'
			 || $('title').text().match('hiba')
			 || $('title').text() == 'Temporary down'
			 || !$('title').text().match('Neptun.Net')	) {
			setTimeout("window.location.reload()",100);
	//  Kilépés gomb
		} else {
			var opt={ user: '', pass: '', logout: 0, autologin: 0, feed1: '', feed2: '' };
			var arr = GM_getValue(school, 'na');
			$.extend(opt, JSON.parse(arr));
			$('#btnQuit').click(function() {
				opt["logout"] = 1;
				var ertek=JSON.stringify(opt);
				setTimeout(function(){GM_setValue(school, ertek);}, 0);
			});
		}
	}
// Belépés kezelése
	if( (path.search('hallgato')!=-1 || path.search('HALLGATO')!=-1 || path.search('neptun')!=-1) && (path.search('login.aspx') != -1 || path.search('login2.aspx') != -1 ) ) {
	//Túlterhelés esetén
		if(		$('body' > 'h1').text() == 'Service Unavailable'
			|| $('body' > 'h1').text() == 'Bad Request (Invalid Hostname)'
			|| $('body').text() == 'A Neptun szerver nem elérhető!'
			|| $('body').text() == 'A rendszer üzemeltető számítógépek túlterheltek.<br>A szerverek száma a jelenlegi terhelés lekezelésére nem elégségesek!<br>Kérem próbálkozzon később.'
			|| $('title').text().match('hiba')
			|| $('title').text() == 'Temporary down') {
			setTimeout("window.location.reload()",100);
	//Login képernyő
		} else {
			submitval = $('#Submit').val();
			usdiv = '<div id="userscript">'+version+'</div>';
			$('#imgLogo').parent().parent().before(usdiv);
			checkUpdate();
			$('#userscript').css({
				'font-size'	: '12px',
				'position'	: 'absolute',
				'margin-left':'10px'
			});
			$('#Form1').css({
				'margin-bottom' : '5px'
			});
			var opt={ user: '', pass: '', logout: 0, autologin: 0, feed1: '', feed2: '' };
			var arr = GM_getValue(school, 'na');
			if( arr == 'na' ) {
				var ertek=JSON.stringify(opt);
				setTimeout(function(){GM_setValue(school, ertek);}, 0);
				arr = ertek;
			}
			$.extend(opt, JSON.parse(arr));
			if( opt["user"] != 'na' ) {
				$('#user').val(opt["user"]);
				$('#pwd').val(opt["pass"]);
			}
			trs = $('#user').parent().parent().parent().children(':last').prev().prev().prev();
			trs.after(trs.clone());
			trs.next().next().remove();
			trs.next().attr('id', 'autologin');
			$('#autologin').children().eq(0).text('AutoLogin:');
			$('#autologin').children().eq(1).attr('align', 'left');
			$('#autologin').children().eq(1).html('<input id="ALbox" name="Albox" type="checkbox" />');
			if( opt["autologin"] == 1 ) {
				$('#ALbox').attr('checked', true);
				if( opt["logout"] == 0 ) {
					if( $('#user').val() != "" && $('#pwd').val() != "" ) {
						time = 0;
						$('#Submit').val( submitval + " (" + time/1000 + ")" );
						inter = setInterval(function(){interval_btn("set", submitval);}, 0);
						t = setTimeout("$('#Submit').click();",time);
					}
				} else {
					opt["logout"] = 0;
					var ertek=JSON.stringify(opt);
					setTimeout(function(){GM_setValue(school, ertek);}, 0);
				}
			}

			$('#ALbox').change(function() {
				opt["autologin"] = $('input:checked').length;
				var ertek=JSON.stringify(opt);
				setTimeout(function(){GM_setValue(school, ertek);}, 0);
				if( $('input:checked').length == 0 && t ) {
					if(t) clearTimeout(t);
					interval_btn("del", submitval);
					$('#Submit').val(submitval);
				}
			});
			$('#Submit').click(function() {
				if( $('#user').val() != "" && $('#pwd').val() != "" ) {
					opt["user"] = $('#user').val();
					opt["pass"] = $('#pwd').val();
					var ertek=JSON.stringify(opt);
					setTimeout(function(){GM_setValue(school, ertek);}, 0);
				}
			});
			if( opt["feed1"] == '' ) {
				opt["feed1"] = 'http://userscripts.org/feeds/scripts/40510/comments';
				if( school == 'web.uni-corvinus' ) {
					opt["feed1"] = 'http://portal.uni-corvinus.hu/index.php?id=23151&type=100';
					opt["feed2"] = 'http://userscripts.org/feeds/scripts/40510/comments';
				} else if( school == 'bmf' ) {
					opt["feed1"] = 'https://neptun.bmf.hu/rss.xml';
					opt["feed2"] = 'http://groups.google.hu/group/bmf-kando/feed/rss_v2_0_msgs.xml';
				} else if( school == 'uni-pannon' ) {
					opt["feed1"] = 'http://web.uni-pannon.hu/index.php?option=com_rss&feed=RSS2.0&no_html=1';
					opt["feed2"] = 'http://userscripts.org/feeds/scripts/40510/comments';
				} else if( school == 'nnet.sze' ) {
					opt["feed1"] = 'http://uni.sze.hu/index.php?option=com_rss&feed=RSS2.0&no_html=1';
					opt["feed2"] = 'http://userscripts.org/feeds/scripts/40510/comments';
				} else if( school == 'neptun.szie' ) {
					opt["feed1"] = 'http://www.szie.hu/node/feed';
					opt["feed2"] = 'http://neptun.szie.hu/rss.xml';
				} else if( school == 'neptun.unideb' ) {
					opt["feed1"] = 'http://www.unideb.hu/portal/hirek.xml';
					opt["feed2"] = 'http://userscripts.org/feeds/scripts/40510/comments';
				} else if( school == 'sote' ) {
					opt["feed1"] = 'http://www.sote.hu/media/feed.php';
					opt["feed2"] = 'http://userscripts.org/feeds/scripts/40510/comments';
				}
				delete opt["feed"];
				var ertek=JSON.stringify(opt);
				setTimeout(function(){GM_setValue(school, ertek);}, 0);
			}
			if( opt["feed1"] != '' ) {
				$('#Form1').after('<div id="feeds"><div id="group"></div><div id="feed"></div></div>');
				$('#feeds').css({
					'font' : '10px Verdana, Arial, Helvetica, sans-serif',
					'margin': '0 auto',
					'padding' : '0',
					'width' : '600px'
					});
				$('#feed').css({
					'width' : '295px',
					'height': '135px',
					'overflow': 'hidden',
					'padding-bottom' : '2px'
				});
				$('#group').css({
					'float' : 'right',
					'width' : '295px',
					'height': '135px',
					'overflow': 'hidden',
					'padding-bottom' : '2px'
				});
				loadFeed( 'feed' , opt['feed1'], opt );
				loadFeed( 'group', opt['feed2'], opt );
			}
		}
	}
}
function interval_btn(set, val) {
	if( $('input:checked').length == 0) {
		$('#Submit').val(val);
	} else if(set=="set" && parseInt($('#Submit').val().substr(val.length+2)) != 0) {
		$('#Submit').val( val + ' (' + (parseInt($('#Submit').val().substr(val.length+2)) - 1 ) + ')' );
	} else if(set=='del' || parseInt($('#Submit').val().substr(val.length+2)) == 0) {
		clearInterval(inter);
	}
}
function checkUpdate() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: scriptText,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			script = responseDetails.responseText;
			ver = parseInt(script.match(/const REV=([0-9]+);/)[1]);
			tmp = script.substr(script.search("const imp=")+10);
			tmp = tmp.substr(0, tmp.search("const REV=")-3 );
			if( tmp.substr(0,1) == '{' ) {
				var pmi={"avkf":0, "bgf":0, "bmf":0, "kodolanyi":0, "neptun.szie":0, "neptun.unideb":0, "nnet.sze":0, "nyme":0, "ppke":0, "uni-pannon":0, "web.uni-corvinus":0, "zmne":0};
				$.extend(pmi, JSON.parse(tmp));
			} else {
				pmi = tmp;
			}
			if( REV != ver && ( pmi==1 || pmi[school]==1 ) ) {
				addtext = ' - <a href="'+scriptURL+'">Újabb verzió érhető el!</a>';
				$('#userscript').append(addtext);
			}
		}
	});
}
function loadFeed( type, url, opt ) {
	$('#'+type).html('<div class="feedTitle"></div><div class="feedContent"></div>');
	if( isUrl(url) ) {	
		$('#'+type+' .feedContent').html('Hírforrás betöltése folyamatban...');
		$('#'+type+' .feedTitle').html('&nbsp;');
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				xml = responseDetails.responseText;
				if( xml.substr(0, 5) == '<?xml' ) {
					feedTitle = (url=='http://userscripts.org/feeds/scripts/40510/comments')? 'Discussion on Neptun.NET AutoLogin':$(xml).find("title").eq(0).text();
					feedTitle = (feedTitle.substr(0,9) != '<![CDATA[')? feedTitle : feedTitle.substr(9-feedTitle.length, feedTitle.length-12);
					feedLink  = xml.substr(xml.search("link")+5, (xml.substr(xml.search("link")+5)).search("</link") );
					$('#'+type+' .feedContent').html('');
					$('#'+type+' > .feedTitle').html( '<div class="feedEdit">csere</div><a href="'+feedLink+'" target="_blank">'+feedTitle+'</a>' );
					tmp = xml.substr(xml.search("<item"));
					monthnum = {'Jan':'01', 'jan.':'01', 'Feb':'02', 'febr.':'02', 'Mar':'03', 'márc.':'03', 'Apr':'04', 'ápr.':'04', 'May':'05', 'máj.':'05', 'Jun':'06', 'jún.':'06', 'Jul':'07', 'júl.':'07', 'Aug':'08', 'aug.':'08', 'Sep':'09', 'szept.':'09', 'Okt':'10', 'okt.':'10', 'Nov':'11', 'nov.':'11', 'Dec':'12', 'dec.':'12'};
					$(xml).find("item").each(function() {
						tmp = (tmp.substr(6)).substr(tmp.search("<item"));
						itemTitle= (url=='http://userscripts.org/feeds/scripts/40510/comments')? $(this).find("title").text().substr(0, $(this).find("title").text().search(', replied by')): $(this).find("title").text();
						itemTitle= (itemTitle.substr(0,9) != '<![CDATA[')? itemTitle : itemTitle.substr(9-itemTitle.length, itemTitle.length-12);
						if(itemTitle.length == 0) itemTitle = "<i>nincs tárgy</i>";
						itemLink = tmp.substr(tmp.search("<link")+6, (tmp.substr(tmp.search("<link")+6)).search("</link") );
						date = $(this).find("pubDate").text();
						if( date != '' ) {
							day = date.substr(date.search(",")+2, 2);
							month = date.substr(date.search(",")+5, date.substr(date.search(",")+5).search(" "));
							year = date.substr(date.search(",")+6 + month.length, 4);
							time = date.substr(date.search(year+" ") + year.length + 1, 5);
//						if(type=='group')alert(time);
							itemDate = monthnum[month]+'.'+day+'.';
							if(type=='group') itemDate += ' '+time;
							$('#'+type+' > .feedContent').append( '<div class="feedDate">'+itemDate+'</div><div class="feedItem"><a href="'+itemLink+'" target="_blank">'+itemTitle+'</a></div>');
						} else {
							$('#'+type+' > .feedContent').append( '<div class="feedItem"><a href="'+itemLink+'" target="_blank">'+itemTitle+'</a></div>');
						}
					});
				} else {
					$('#'+type+' .feedTitle').html('<div class="feedEdit">csere</div>Hírforrás beállítása:');
					$('#'+type+' .feedContent').html('&nbsp;');
					edit(opt);
				}
				styling( type, opt );
			}
		});
	} else {
		$('#'+type+' .feedTitle').html('<div class="feedEdit">csere</div>Hírforrás beállítása');
		$('#'+type+' .feedContent').html('<p>A hírforrások segítségével nem kell felesleges időt eltöltened egy weboldalon a hasznos informácók keresésével!</p><p>A technológia neve: <a href="http://hu.wikipedia.org/wiki/RSS_(f%C3%A1jlform%C3%A1tum)" target="_blank">RSS</a> !</p>');
		styling( type, opt );
		edit(opt);
	}
}
function edit(opt) {
	$('#group .feedContent').hide();
	if( $('.editArea').size() == 0 ) {
		$('#group').append('<div class="editArea"><p>Adj meg egy RSS hírforrást:</p><input id="newfeed" type="text" name="newfeed" size="60" /><p><span>Mentés</span> <span>Mégsem</span></p></div>');
	}
	$('#feeds span').css({
		'cursor':'pointer'
	});
	$('#feeds .editArea').css({
		'margin-top': '20px',
		'text-align' : 'center'
	});
	$('#feeds input').css({
		'margin' : '0 auto',
		'font-size' : '10px'
	});
	$('#group span').eq(0).click(function() {
		if(isUrl($('#newfeed').val())) {
			opt["feed2"] = $('#newfeed').val();
			var ertek=JSON.stringify(opt);
			setTimeout(function(){GM_setValue(school, ertek);}, 0);
			$('#group .editArea').html('<p>Az új rss forrás mentése sikeres!</p><p>(Megtekinthető a következő alkalommal!)</p>');
			setTimeout(function() {
				$('#group .editArea').remove();
				$('#group .feedContent').show();
			}, 3500);
		} else {
			alert('A bevitelő mező üres volt,\nvagy nem megfelelő a cím!');
		}
	});
	$('#group span').eq(1).click(function() {
		$('#group .editArea').remove();
		$('#group .feedContent').show();
	});
}
function styling( type, opt ) {
	if( school=='zmne' ) {
		FTcolor = '#FFFFFF'; //feedtitle
		FTbg = '#C39E6A';	//feedTitle background
		Fbg = '#FFFFFF';	//feed background
		color= '#493928';	
		border = '1px solid #FFFFFF';
	} else if( school=='nyme' ) {
		FTcolor = '#FFFFFF';
		FTbg = '#CDC89E';
		Fbg = '#FFFFFF';
		color= '#978A00';
		border = 'none';
	} else if( school=='uni-pannon' ) {
		FTcolor = '#FDFFFE';
		FTbg = '#2F3448';
		color= '#2F3448';
		Fbg = '#FFFFFF';
		border = 'none';
	} else if( school=='kodolanyi' ) {
		FTcolor = '#FFFFFF';
		FTbg = '#051D7D';
		color= '#06157C';
		Fbg = '#FFFFFF';
		border = '1px solid #7995C7';
	} else if( school=='neptun.bme' ) {
		FTcolor = '#FFFFFF',
		FTbg = '#C39E6A';
		Fbg = '#F9F5ED';
		color= '#493928';	
		border = '1px solid #FFFFFF';
	} else {
		FTcolor = '017DC5';
		FTbg = '#BFDEF0';
		color= '#017DC5';
		Fbg = 'auto';
		border = '1px solid #BFDEF0';
	}
	$('#feed').css({
		'color' : color,
		'background' : Fbg,
		'border' : border
	});
	$('#group').css({
		'color' : color,
		'background' : Fbg,
		'border' : border
	});
	$('.feedTitle').css({
		'background' : FTbg,
		'padding' : '2px'
	});
	$('.feedTitle').css({
		'color' : FTcolor,
		'font-weight' : 'bold',
		'text-decoration' : 'none'
	});
	$('.feedTitle a').css({
		'color' : FTcolor,
		'font-weight' : 'bold',
		'text-decoration' : 'none'
	});
	$('#feed .feedItem').css({
		'margin-left' : '40px'
	});
	$('#group .feedItem').css({
		'margin-left' : '76px'
	});
	$('.feedItem a').css({
		'color' : color,
		'text-decoration' : 'none',
		'font-weight' : 'normal'
	});
	$('#feed .feedDate').css({
		'float' : 'left',
		'width' : '40px'
	});
	$('#group .feedDate').css({
		'float' : 'left',
		'width' : '75px'
	});
	$('.feedEdit').css({
		'float':'right',
		'display':'none',
		'cursor':'pointer'
	});
	$('.feedItem a').mouseover(function() {
		$(this).css({
			'text-decoration' : 'underline'
		});
	}).mouseout(function() {
		$(this).css({
			'text-decoration' : 'none'
		});
	});
	if( type == 'group' ) {
		$('#group .feedTitle').mouseover(function() {
			$('#group .feedEdit').show();
		}).mouseout(function() {
			$('#group .feedEdit').hide();
		});
		$('#group .feedEdit').click(function() {
			edit(opt);
		});
	}
}
function isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(s);
}