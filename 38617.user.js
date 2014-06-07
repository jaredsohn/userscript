// ==UserScript==
// @name				bluh
// @version				1.9
// @date				25-11-2008
// @author				bluh
// @description				Omerta Beyond 1.9 (The greatest addon for Omerta available!)
// @include				http://www.omertabeyond.com/*
// @include				http://*barafranca.*/*
// @require				http://www.omertabeyond.com/gm/libs.js
// @require				http://www.omertabeyond.com/gm/lang.js
// @resource	colorpicker		http://www.omertabeyond.com/gm/colorpicker.gif
// @resource	beyondLogo		http://www.omertabeyond.com/gm/logo.png
// @resource	buttonMenu		http://www.omertabeyond.com/gm/menu.png
// @resource	buttonKey		http://www.omertabeyond.com/gm/key.png
// @resource	buttonReset		http://www.omertabeyond.com/gm/reset.png
// @resource	favoriteIco		http://www.omertabeyond.com/images/favicon.png
// @resource	color			http://www.omertabeyond.com/gm/color.js
// @resource	menu			http://www.omertabeyond.com/gm/menu.js
// ==/UserScript==

//beyond menu descriptions
var descr = [
	lang.prefsname,
	"OB Poll",
	"B/N Prices",
	"Calculators",
	"Fingon's Daily Famstats"
];
//beyond menu links
var qlinks = [
	PrefsLink,
	SiteLink+'/html/poll/poll.php',
	'/hacking.php',
	SiteLink+'/gm/calc.php',
	FingonUrl+'/latestpicture.php'
];
//---------------- Cocaine Prices ----------------
if(dlp == '/marquee.php'){
	document.addEventListener('dblclick', function() { window.location.reload(); }, true);
	if(prefs[1]){
		GM_xmlhttpRequest({
			method: 'GET',
			url: SiteLink+'/gm/prices'+lang.version+'.xml.php',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'application/xml,text/xml'},
			onload: function(resp){
				var marquee = $X('//div');
				marquee.innerHTML = "";

				var parser = new DOMParser();
				var dom = parser.parseFromString(resp.responseText, "application/xml");

				function getPrice(drug, city) dom.getElementsByTagName(drug)[0].getElementsByTagName(city.replace(' ', ''))[0].textContent;

				var p = new Array;
				var q = new Array;
				var p_C = ["Baltimore","Chicago","New York","Philadelphia","Detroit","Las Vegas","Corleone","Palermo"];
				var p_id = ["6","1","3","5","nul","4","7","2"];
				for(i=0;i<=7;i++){ p[i]=getPrice('Cocaine',p_C[i]); q[i]=p[i]; }

				var max = p.sort(function(a,b){return b-a})[0];
				var min = p[(p.length-1)];

				i=0; q.forEach(function($n){
					if($n==min) q[i]='<span style="color:#' + getValue('low', '00ff00') + ';">' + $n + '</span>';
					if($n==max) q[i]='<span style="color:#' + getValue('high', 'ff0000') + ';">' + $n + '</span>';
				i++; });
				var time = dom.getElementsByTagName('Time')[0].textContent;
				var pb, pc, pn, pp, pd, pl, pco, ppa;

				pb='Baltimore: '+q[0];
				pc='Chicago: '+q[1];
				pn='New York: '+q[2];
				pp='Philadelphia: '+q[3];
				pd='Detroit: '+q[4];
				pl='Las Vegas: '+q[5];
				pco='Corleone: '+q[6];
				ppa='Palermo: '+q[7];

				var hoverdiv = cEL('div');
				hoverdiv.id = 'hiddenbox';
				hoverdiv.style.display = 'none';
				hoverdiv.style.position = 'absolute';
				hoverdiv.style.backgroundColor = '#000000';
				hoverdiv.style.border = 'solid white 1px';
				hoverdiv.style.fontSize = "9px";
				hoverdiv.style.top = "2px";
				hoverdiv.style.width = "520px";
				hoverdiv.style.textAlign = "center";
				marquee.appendChild(hoverdiv);

				function hoverlink(city, priceStr){
					var link = cEL('a');
					link.href = "#";
					link.style.color = '#' + getValue('colour', 'ffffff');
					link.style.fontSize = '10px';
					if(city == "Palermo" || city == "Corleone" || city == "Las Vegas" || city == "Detroit") link.addEventListener('mouseover', function(event){ hovermenu(city, event.clientX - 525) }, true);
					else link.addEventListener('mouseover', function(event){ hovermenu(city, event.clientX + 25) }, true);
					link.addEventListener('mouseout', function(event){ hovermenuout() }, true);
					link.innerHTML = priceStr;
					return link;
				}

				function hovermenu(city, x){
					var hoverdiv = getID('hiddenbox');
					hoverdiv.style.display = 'inline';
					hoverdiv.style.left = x + "px";
					hoverdiv.innerHTML = 'Morphine: ' + getPrice("Morphine", city) + ' || ' + 'Heroin: ' + getPrice("Heroin", city) + ' || ' + 'Opium: ' + getPrice("Opium", city) + ' || ' + 'Whiskey: ' + getPrice("Whiskey", city) + ' || ' + 'Amaretto: ' + getPrice("Amaretto", city) + ' || ' + 'Rum: ' + getPrice("Rum", city);
				}

				function flytolink(city, priceStr, priceToFly, cityId){
					var link = cEL('a');
					link.href = "#";
					link.id = city;
					link.style.color = '#' + getValue('colour', 'ffffff');
					link.style.fontSize = '10px';
					link.addEventListener('click',function(){flyto(city, priceToFly, cityId)},true);

					if(prefs[17]){
						if(city == "Palermo" || city == "Corleone" || city == "Las Vegas" || city == "Detroit"){ link.addEventListener('mouseover', function(event){ hovermenu(city, event.clientX - 525); this.style.textDecoration='underline' }, true);}
						else { link.addEventListener('mouseover', function(event){ hovermenu(city, event.clientX + 25); this.style.textDecoration='underline' }, true);}
						link.addEventListener('mouseout', function(event){ getID('hiddenbox').style.display = 'none'; this.style.textDecoration='none' }, true);
					}
					else {
						link.addEventListener('mouseover', function(){ this.style.textDecoration='underline' }, true);
						link.addEventListener('mouseout', function(){ this.style.textDecoration='none' }, true);
					}
					link.innerHTML = priceStr;
					return link;
				}

				function flyto(city, costs, cityid){
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://' + dlh + '/travel.php',
						onload: function(resp){
							var html = resp.responseText;

							if(html.indexOf('body') == -1) {//if you can NOT travel
								var msg = html.slice(html.indexOf('</head>')+9);
								var msg = msg.replace(/<\S[^><]*>/g,'');
								alert((msg == '') ? (lang.marquee[6] + city + "...Poker?") : msg );
							}
							else {//if you CAN travel
								var costs = arr;
								var parts = html.split('<span');//get costs msg
								parts.forEach(function($n){
									if($n.indexOf('"nd();"') != -1) costs.push($n.slice($n.indexOf('", "')+4,$n.indexOf('")')));
								});
								var msg = costs[(cityid.replace('nul',0))];
								if(msg.indexOf('<br>') == -1) alert(msg);
								else var del = confirm(msg.replace('<br>','\n').replace('<br>','\n') + '\n\n' + lang.marquee[0] + city);

								if(del){//if user wants to travel
									if(resp.responseText.match("<script ") != null){
										GM_xmlhttpRequest({
											method: 'GET',
											url: 'http://' + dlh + '/travel.php?whereto=' + cityid,
											onload: function(resp){
												try {
													if(resp.responseText.match(lang.marquee[4])) alert(lang.marquee[5]);
													else {
														var msg = resp.responseText.slice((resp.responseText.indexOf('</head>'))+7).replace(/<\S[^><]*>/g,'');
														if(msg == '') msg = lang.marquee[6] + city + "...Poker?";
														else {
															var where = 0;
															where = parseInt(cityid.replace('nul','0'))+4;
															if(where) setPow('bninfo',2,where); //if a city is stored
														}
														alert(msg);
														top.frames[2].location = top.frames[2].location;
														window.location.reload();
													}
												}
												catch(e){ alert(lang.marquee[6] + city + "...");}
											}
										});
									}
									else {
										var msg = resp.responseText.slice((resp.responseText.indexOf('</head>'))+7).replace(/<\S[^><]*>/g,'');
										alert((msg == '') ? (lang.marquee[6] + city + "...Poker?") : msg );
									}
								}
							}
						}
					});
				}

				var span = cEL('span');
				var priceandtime = cEL('span');

				span.appendChild(priceandtime);
				i=0; p.forEach(function($n){
					span.appendChild(flytolink(p_C[i], p_C[i]+': '+q[i], 500, p_id[i]));
					var separator = cEL('span');
					separator.innerHTML = ' | ';
					span.appendChild(separator);
				i++; });

				var link = cEL('a');
				link.href = "hacking.php";
				link.target = 'main';
				link.innerHTML = lang.marquee[2];
				if(getValue('bold', '0') == '1') link.style.fontWeight = 'bold';
				link.style.color = '#' + getValue('colour', 'ffffff');
				link.style.fontSize = '10px';
				link.addEventListener('mouseover',function(){this.style.textDecoration='underline' }, true);
				link.addEventListener('mouseout',function(){this.style.textDecoration='none' }, true);
				span.appendChild(link);
				priceandtime.innerHTML = lang.marquee[3] + time + ' | ';
				span.style.color = '#' + getValue('colour', 'ffffff');
				span.style.fontSize = '10px';
				marquee.appendChild(span);

				city = getPow('bninfo',2,-1)
				if(city > 0) {
					switch(city) {
						case 0: city = "NOWHERE"; break;
						case 4: city = "Detroit"; break;
						case 5: city = "Chicago"; break;
						case 6: city = "Palermo"; break;
						case 7: city = "New York"; break;
						case 8: city = "Las Vegas"; break;
						case 9: city = "Philadelphia"; break;
						case 10: city = "Baltimore"; break;
						case 11: city = "Corleone"; break;
					}
					getID(city).setAttribute('style',getID(city).getAttribute('style')+'font-style: italic;');
				}
				window.onload = setTimeout("window.location.reload()", 60000);
			}
		});
	}
}
//---------------------- sell ws ----------------
if(dlp == '/obay.php' && dls.indexOf('type=10') != -1 && prefs[8] && db.innerHTML.indexOf('<table') != -1){ 
	if(getValue('wsID') == 'undefined') { $x('//input')[2].value = ''}
	else { $x('//input')[2].value = getValue('wsID'); }
	$x('//input')[3].checked = true;
	$x('//input')[5].focus();
}
//---------------- Smuggling ----------------
if(prefs[8] && dlp == '/smuggling.php' && db.innerHTML.indexOf('table') != -1){
	var sold = '/html/body/center';//check if you just sold something which causes another <center> tag to appear
	var html = $I('/html/body').replace('<center>','');
	if(html.indexOf('<center>') != -1){ sold = '/html/body/center[2]'; html = html.replace('<center>',''); }
	if(html.indexOf('<center>') != -1) sold = '/html/body/center[3]';

	var inputs = $x('//input');
	inputs[(inputs.length-2)].value = '';
	var attr = (prefs[15]) ? 'accessKey' : 'name';

	var bn_xp = sold+'/form/table/tbody/tr[1]/td';
	var bn_text = $X(bn_xp).innerHTML.split("<br>");

	var booze = parseInt(bn_text[1].replace(/[^0-9.]/g,''));
	var narcs = parseInt(bn_text[2].replace(/[^0-9.]/g,''));

	var carry_b = 0;
	var carry_n = 0;

	var xpb = sold+'/form/table/tbody/tr[2]/td/table/tbody/tr[2]/td/table/tbody/tr[';
	var xpn = sold+'/form/table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]/table/tbody/tr[';

	var b_amount = [0,0,0,0,0,0];
	var n_amount = [0,0,0,0,0,0];
	for(i=0;i<=15;i++){
		if(i<7){
			var x = i + 4;
			var carry_b = carry_b + parseInt($X(xpb+x+']/td[3]').innerHTML);
			b_amount[i] = parseInt($X(xpb+x+']/td[3]').innerHTML)
			$x('//input')[i].value = b_amount[i];
			$I(xpb+x+']/td',"<a "+attr+"='"+(i+1)+"' onFocus='this.blur()' href='javascript:tmp = document.getElementsByTagName(\"input\")[" + i + "].value;for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value =0;}document.getElementsByTagName(\"input\")[" + i + "].value=" + booze + "-tmp;document.getElementsByTagName(\"input\")[18].focus();'>"+(prefs[15]?(i+1):'')+" " + $I(xpb+x+']/td') + "</a>");
		}
		if(i>8){
			var x = i - 5;
			var carry_n = carry_n + parseInt($I(xpn+x+']/td[3]'));
			n_amount[(i-9)] = parseInt($I(xpn+x+']/td[3]'));
			inputs[i].value = parseInt($I(xpn+x+']/td[3]'));
			$I(xpn+x+']/td',"<a onFocus='this.blur()' href='javascript:tmp = document.getElementsByTagName(\"input\")[" + i + "].value;for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value =0;}document.getElementsByTagName(\"input\")[" + i + "].value = " + narcs + "-tmp;document.getElementsByTagName(\"input\")[18].focus();'>" + $I(xpn+x+']/td') + "</a>");
		}
	}
	var b_amounts = '';
	for(i=0;i<=6;i++){
		var b_amounts = b_amounts + b_amount[i];
		if(i!=6) var b_amounts = b_amounts + ",";
	}
	var n_amounts = '';
	for(i=0;i<=6;i++){
		var n_amounts = n_amounts + n_amount[i];
		if(i!=6) var n_amounts = n_amounts + ",";
	}
	var notempty = false;
	if(carry_n != 0){ var notempty = true; }
	var info_xp = sold+'/form/table/tbody/tr/td';
	var part = $I(info_xp).split("<br>");

	var str = '<table border="0"><tr>'
	str += '<td>'+lang.smuggling[0] + part[0].slice(part[0].indexOf("$ "),part[0].indexOf(" i")) + " | </td>";
	str += '<td>'+"Max "+lang.smuggling[1]+": " + part[1].replace(/[^0-9.]/g,'') + " | </td>";
	str += '<td>'+"Max "+lang.smuggling[2]+": " + part[2].replace(/[^0-9.]/g,'') + "</td></tr>";
	str += '</table>';
	if(prefs[15]){
		str += "<hr><a "+attr+"='[' onFocus='this.blur()' href='javascript:for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value=0;}for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=0;}if("+notempty+"){var n_amount = ["+n_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[(i+9)].value=n_amount[i];}}else{document.getElementsByTagName(\"input\")[12].value = "+narcs+";}document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[2]+" ([)</a>";
		str += " - <a "+attr+"=']' onFocus='this.blur()' href='javascript:for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value=0;}var b_amount = ["+b_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=b_amount[i];}document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[1]+" (])</a>";
		str += " - <a "+attr+"='=' onFocus='this.blur()' href='javascript:for(i=9;i<=15;i++){document.getElementsByTagName(\"input\")[i].value=0;}var b_amount = ["+b_amounts+"];for(i=0;i<=6;i++){document.getElementsByTagName(\"input\")[i].value=b_amount[i];} document.getElementsByTagName(\"input\")[12].value = "+ ((narcs - carry_n) == 0 ? narcs : narcs - carry_n) +";document.getElementsByTagName(\"input\")[18].focus();'>"+lang.smuggling[5]+" (=)</a><br>";
	}
	$X(bn_xp).innerHTML = str;
	if(carry_b==booze) inputs[7].checked = 1;
	if(carry_n==narcs) inputs[16].checked = 1;
	inputs[18].focus();
}
//---------------- BRC INFO GATHER ----------------
if(dlp == '/information.php'){ //Get user info
	var xp, nick, rank, booze, narc, city, cityCode, ride, plane, fam;
	xp = '/html/body/center/table/tbody/tr/td/table/tbody/tr[3]/td[2]';
	nick = getTXT(xp);
	setValue('nick',nick);
	
	//get stored value for family position or default to 'normal member'
	fam = getPow('bninfo',4,100000000);
	setPow('bninfo',4,fam);
	
	//get rank/carrying capacity
	xp = '/html/body/center/table/tbody/tr/td/table/tbody/tr[8]/td[2]';
	rank = getTXT(xp);
	switch(rank) {
		case 'Empty-suit': booze = 1; narc = 0; break;
		case 'Delivery Boy': booze = 2; narc = 0; break;
		case 'Delivery Girl': booze = 2; narc = 0; break;
		case 'Picciotto': booze = 5; narc = 1; break;
		case 'Shoplifter': booze = 7; narc = 2; break;
		case 'Pickpocket': booze = 10; narc = 4; break;
		case 'Thief': booze = 15; narc = 5; break;
		case 'Associate': booze = 20; narc = 7; break;
		case 'Mobster': booze = 25; narc = 8; break;
		case 'Soldier': booze = 30; narc = 10; break;
		case 'Swindler': booze = 35; narc = 11; break;
		case 'Assassin': booze = 40; narc = 13; break;
		case 'Local Chief': booze = 45; narc = 14; break;
		case 'Chief': booze = 50; narc = 16; break;
		case 'Bruglione': booze = 60; narc = 17; break;
		case 'Capodecina': booze = 70; narc = 20; break;
		case 'Godfather': booze = 70; narc = 20; break;
		case 'First Lady': booze = 70; narc = 20; break;
	}
	setPow('bninfo',0,narc);
	setPow('bninfo',1,booze);
	
	//get city info
	xp = '/html/body/center/table/tbody/tr/td/table/tbody/tr[11]/td[2]';
	city = getTXT(xp);
	cityCode = 0;
	switch(city) {
		case 'Detroit': cityCode=4; break;
		case 'Chicago': cityCode=5; break;
		case 'Palermo': cityCode=6; break;
		case 'New York': cityCode=7; break;
		case 'Las Vegas': cityCode=8; break;
		case 'Philadelphia': cityCode=9; break;
		case 'Baltimore': cityCode=10; break;
		case 'Corleone': cityCode=11; break;
	}
	setPow('bninfo',2,cityCode);
	
	//get plane info
	xp = '/html/body/center/table/tbody/tr/td[3]/table[2]/tbody/tr[3]/td[2]';
	ride = getTXT(xp);
	switch(ride) {
		case 'None': plane=0; break;
		case 'Geen': plane=0; break;
		case 'Fokker DR-1': plane=1; break;
		case 'Havilland DH 82A': plane=2; break;
		case 'Fleet 7': plane=3; break;
		case 'Douglas DC-3': plane=4; break;
	}
	setPow('bninfo',3,plane);
}
if(dlp == '/user.php'){ //Get family position
	var nick, query, xp, xp1, text, fam, family, f, info;
	nick = getValue('nick');
	//check if profile is own user's (case sensitive!)
	query = '?nick='+nick;
	if(dls.toUpperCase() == query.toUpperCase()) {
		//xpath for family (assuming sex is not hidden)
		xp1 = '/html/body/center/table/tbody/tr[';
		xp = xp1 + '8]/td';
		text = getTXT(xp);

		//if user has sex hidden (getX missed, need to change xpath, redo getTXT)
		if(text == 'Wealth' || text =='Vermogen:') {
			xp = xp1 + '7]/td';
			text = getTXT(xp);
		}

		fam=1; //initialize default to 'normal member' in case of accident
		//famless = 0; normal = 1; capo = 2; top3 = 3
		switch(text) {
			case '\n			Family:			\n		':				fam=1; break
			case '\n			Familie:			\n		':			fam=1; break
			case '\n			Capo of:			\n		':			fam=2; break
			case '\n			Capo van:			\n		':			fam=2; break
			case '\n			Sottocapo of:			\n		':		fam=3; break
			case '\n			Sottocapo van:			\n		':		fam=3; break
			case '\n			Consiglieri of:			\n		':		fam=3; break
			case '\n			Consiglieri van:			\n		':	fam=3; break
			case '\n			Don of:			\n		':				fam=3; break
			case '\n			Don van:			\n		':			fam=3; break
		}

		//check if famless
		family = getTXT(xp+'[2]');
		if(family=='None	 '||family=='Geen	 ') fam=0;

		//store info
		setPow('bninfo',4,fam);
	}
}
if(dlp == '/travel.php') { //Get city when traveling
	city = 0; //initialize to default for anything else
	text = db.textContent;
	text = text.split(' ')[2];
	citys = ["Detroit","Chicago","Palermo","New","Las","Philadelphia","Baltimore","Corleone"];
	for(i=0;i<citys.length;i++) if(citys[i] == text) city = (i+4);
	if(city) setPow('bninfo',2,city); //if traveled, save new city
}
// ------ THE BRC (use botprices, display on prices & smuggling pages, includes price highlighter inline) --------
if(dlp == '/prices.php' || dlp == '/smuggling.php'||dlp=='/hacking.php'){
	if(dlp=='/hacking.php') db.innerHTML=''; //keeps users from seeing actual hacking page flash
	
	// INFO GATHERER ON FIRST RUN (ADDS 2 CLICKS :X)
	info = getValue('bninfo',-1); //check for saved info
	count = getValue('bncounter',-1); // check if bninfo needs to be re-checked
	if(info < 0 || count < 0) {
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://"+dlh+"/information.php",
			onload:function(response) {
	
				a = response.responseText.split('<tbody')
				if(a[2]){ // fails on clicklimit or other error
					nick = a[2].split('<td>')[2].split('<')[0];
					rank = a[2].split('<td>')[12].split('<')[0];
					city = a[2].split('<td>')[18].split('>')[1].split('<')[0];
					ride = a[5].split('<td>')[2].split('<')[0];
				
					// set nick
					setValue('nick',nick);
					// get family position
					GM_xmlhttpRequest({
						method:"GET",
						url:"http://"+dlh+"/user.php?nick="+nick,
						onload:function(resp) {
							a = resp.responseText.split('<tr');
							fam=1; //initialize default to 'normal member' in case of accident
							if(a[8]){ // fails on clicklimit or other error
								pos = a[8].split('			');
								if(!pos[1]) pos = a[7].split('			'); //if user has sex hidden
								switch(pos[1]) { //famless = 0; normal = 1; capo = 2; top3 = 3
									case 'Family:':				fam=1; break
									case 'Familie:':			fam=1; break
									case 'Capo of:':			fam=2; break
									case 'Capo van:':			fam=2; break
									case 'Sottocapo of:':		fam=3; break
									case 'Sottocapo van:':		fam=3; break
									case 'Consiglieri of:':		fam=3; break
									case 'Consiglieri van:':	fam=3; break
									case 'Don of:':				fam=3; break
									case 'Don van:':			fam=3; break
								}
								// check if famless
								famless = pos[2].split('>')[2].split('	 ')[0];
								if(famless=='None'||famless=='Geen') fam=0;
							}
							setPow('bninfo',4,fam); //store info
						}
					});
					
					booze = narc = cityCode = plane = 0;
					switch(rank) {
					case 'Empty-suit': booze = 1; narc = 0; break;
					case 'Delivery Boy': booze = 2; narc = 0; break;
					case 'Delivery Girl': booze = 2; narc = 0; break;
					case 'Picciotto': booze = 5; narc = 1; break;
					case 'Shoplifter': booze = 7; narc = 2; break;
					case 'Pickpocket': booze = 10; narc = 4; break;
					case 'Thief': booze = 15; narc = 5; break;
					case 'Associate': booze = 20; narc = 7; break;
					case 'Mobster': booze = 25; narc = 8; break;
					case 'Soldier': booze = 30; narc = 10; break;
					case 'Swindler': booze = 35; narc = 11; break;
					case 'Assassin': booze = 40; narc = 13; break;
					case 'Local Chief': booze = 45; narc = 14; break;
					case 'Chief': booze = 50; narc = 16; break;
					case 'Bruglione': booze = 60; narc = 17; break;
					case 'Capodecina': booze = 70; narc = 20; break;
					case 'Godfather': booze = 70; narc = 20; break;
					case 'First Lady': booze = 70; narc = 20; break;
				}
					setPow('bninfo',0,narc);
					setPow('bninfo',1,booze);
					
					switch(city) {
					case 'Detroit': cityCode = 4; break;
					case 'Chicago': cityCode = 5; break;
					case 'Palermo': cityCode = 6; break;
					case 'New York': cityCode = 7; break;
					case 'Las Vegas': cityCode = 8; break;
					case 'Philadelphia': cityCode = 9; break;
					case 'Baltimore': cityCode = 10; break;
					case 'Corleone': cityCode = 11; break;
				}
					setPow('bninfo',2,cityCode);
	
					switch(ride) {
					case 'None': plane=0; break;
					case 'Geen': plane=0; break;
					case 'Fokker DR-1': plane=1; break;
					case 'Havilland DH 82A': plane=2; break;
					case 'Fleet 7': plane=3; break;
					case 'Douglas DC-3': plane=4; break;
				}
					setPow('bninfo',3,plane);
					
					setValue('bncounter',201);
				}
			}
		});
	}
	// END INFO GATHER
	
	// MEAT OF THE BRC
	GM_xmlhttpRequest({
		method:"GET",
		url:"http://"+dlh+"/botprices.php",
		onload:function(response) {
			// grab text from botprices and start dividing
			contraband = response.responseText.split('\n');

			// 2D ARRAY CODES for botprices retrieval (Cocaine is 1 on retrieval, gets moved to 6)
			// Detroit 1, Chicago 2, Palermo 3, New York 4, Las Vegas 5, Philadelphia 6, Baltimore 7, Corleone 8
			// Morphine 1, Marjuana 2, Glue 3, Heroin 4, Opium 5, Cocaine 6, Tobacco 7
			// Wine 8, Beer 9, Rum 10, Cognac 11, Whiskey 12, Amaretto 13, Port 14

			// 2-D price array -> price[contraband][city]
			price = new Array(15);
			for(i=1;i<15;i++) price[i] = contraband[i].split('|');

			// need to adjust coke index to 6, shift others down
			for(i=1;i<9;i++) {
				tmp = price[1][i];
				for(j=1; j<6; j++) price[j][i] = price[j+1][i];
				price[6][i] = tmp;
			}

			// build B/N table from botprices, w/ hl
			if(dlp == '/hacking.php'||dlp=='/prices.php') {
			
				// static HTML stuff for B/N price table
				NarcTitle = '<tr><td class="tableheader" colspan="9">DRUG PRICES</td></tr>';
				NarcHeader = '<tr bgcolor="white"><td> City </td><td> Morphine </td><td> Marjuana </td><td> Glue </td><td> Heroin </td><td> Opium </td><td> Cocaine </td><td> Tobacco </td></tr>';
				BzTitle = '<tr><td class="tableheader" colspan="9">BOOZE PRICES</td></tr>';
				BzHeader = '<tr bgcolor="white"><td> City </td><td> Wine </td><td> Beer </td><td> Rum </td><td> Cognac </td><td> Whiskey </td><td> Amaretto </td><td> Port </td></tr>';
				TblStart = '<center><table cellspacing="0" cellpadding="2" width="500" rules="rows" class="thinline"><tbody align="center">';
				bar = '<tr><td colspan="9" bgcolor="black"></td></tr>';
				TblEnd = '</tbody></table></center>';
				cities = ['','Detroit','Chicago','Palermo','New York','Las Vegas','Philadelphia','Baltimore','Corleone'];

				// change price ints into text with $ and thousands separator
				function toTXT(price) {
					if(price.length < 4) return '$'+price;
					return '$' + price.substr(0,price.length-3) + ',' + price.substr(price.length-3,3);
				}
				
				hl = prefs[21];
				if(hl){ // find max/min for hl
					high = new Array(15);
					low = new Array(15);
					for(i=1;i<15;i++) { // loop through items
						tmph = tmphj = tmplj = 0;
						tmpl = 1000000;
						for(j=1;j<9;j++) { // loop through cities
							if( price[i][j] - tmph > 0 ) {tmph = price[i][j];	tmphj = j;}
							if( price[i][j] - tmpl < 0 ) {tmpl = price[i][j];	tmplj = j;}
						}
						// put city index of highest price	
						high[i] = tmphj;
						low[i] = tmplj;
					}
				}
				NarcInfo = ''; // build narc price rows (w/ hl)
				for(i=1; i<9; i++){
					NarcInfo += '<tr><td>' + cities[i] + '</td>';
					for(j=1;j<8;j++) {
						NarcInfo += '<td' + ( hl && j%2 ? ' bgcolor=#8D8D8D ' : '') + '><span';
						NarcInfo += hl ? (i==high[j] ? ' style="color: #ff0000"' : (i==low[j] ? ' style="color: #00ff00"' : '')) : ''
						NarcInfo +='>'+ (hl && j==6 ? '<b>' :'') + toTXT(price[j][i]) + (hl && j==6 ? '</b>' :'') +'</span></td>'
					}
					NarcInfo +='</tr>';
				}
				BzInfo = ''; // build booze price rows (w/ hl)
				for(i=1; i<9; i++){
					BzInfo += '<tr><td>' + cities[i] + '</td>';
					for(j=8;j<15;j++) {
						BzInfo += '<td' + ( hl && !(j%2) ? ' bgcolor=#8D8D8D ' : '') + '><span'
						BzInfo += hl ? (i==high[j] ? ' style="color: #ff0000"' : (i==low[j] ? ' style="color: #00ff00"' : '')) : ''
						BzInfo +='>' + toTXT(price[j][i]) + '</span></td>'
					}
					BzInfo +='</tr>';
				}
				// put it all together
				NarcTable = TblStart + NarcTitle + bar + NarcHeader + NarcInfo + TblEnd;
				BzTable = TblStart + BzTitle + bar + BzHeader + BzInfo + TblEnd;
				db.innerHTML = NarcTable + '<br><br>' + BzTable;
			}
			
			// INITIALIZE 3-D PRICE ARRAY FOR BRC
			//Price3D[B or N][ItemCode][CityCode]
			Price3D = new Array(13);
			for(i=0;i<13;i++) {
				Price3D[i] = new Array(13);
				for(j=0; j<13; j++) Price3D[i][j] = new Array(13);
			}

			// TRANSLATE 2D price array to 3D Price array
			// NARCS
			for(i=1;i<9;i++) for(j=1;j<8;j++) Price3D[1][j+1][i+3] = price[j][i];
			// BOOZE
			for(i=1;i<9;i++) for(j=8;j<15;j++) Price3D[2][j-6][i+3] = price[j][i];

			// 3D CODES for BRC
			// Narc 1, Booze 2
			// Det 4; Chi 5; Pal 6; NY 7; LV 8; Phi 9; Bal 10; Cor 11
			// Morphine 2; Marijuana 3; Glue 4; Heroin 5; Opium 6; Cocaine 7; Tobacco 8
			// Wine 2; Beer 3; Rum 4; Cognac 5; Whiskey 6; Amaretto 7; Port 8
			// Price3D[B or N][ItemCode][CityCode]

			info = getValue('bninfo',-1); //grab saved info
			if(info < 0) alert(lang.BR[0]);
			
			narc = getPow('bninfo',0,-1);
			booze = getPow('bninfo',1,-1);
			city = getPow('bninfo',2,-1);
			plane = getPow('bninfo',3,-1);
			fam = getPow('bninfo',4,-1);

			function flyCost(c1,c2,p) { //determine travel cost (city1, city2, plane)
				if(c1==c2) return 0; //not going anywhere
				if(c1>c2) return flyCost(c2,c1,p); //traveling C1 -> C2 is the same as C2 -> C1
				switch(p) { //determine cost multipler (based on planeCode)
					case 0: m = 1.2; break	// take the train!
					case 1: m = 1.5; break	// Fokker DR-1 (???)
					case 2: m = 1.8; break	// Havilland DH 82A (???)
					case 3: m = 2.1; break	// Fleet 7 (???)
					case 4: m = 2.4; break	// Douglas DC-3
				}
				travel = 1000000;

				switch(c1) { //determine flight cost
					case 4: switch(c2) {
						case 5: travel = 239*m; break   // DET-CHI (4 ,5 ) -> 239
						case 6: travel = 3850*m; break  // DET-PAL (4 ,6 ) -> 3850
						case 7: travel = 487*m; break   // DET-NY  (4 ,7 ) -> 487
						case 8: travel = 1758*m; break  // DET-LV  (4 ,8 ) -> 1758
						case 9: travel = 454*m; break   // DET-PHI (4 ,9 ) -> 454
						case 10: travel = 409*m; break  // DET-BAL (4 ,10) -> 409
						case 11: travel = 3900*m; break // DET-COR (4 ,11) -> 3900
					}; break
					case 5: switch(c2) {
						case 6: travel = 4300*m; break  // CHI-PAL (5 ,6 ) -> 4300
						case 7: travel = 718*m; break   // CHI-NY  (5 ,7 ) -> 718
						case 8: travel = 1520*m; break  // CHI-LV  (5 ,8 ) -> 1520
						case 9: travel = 678*m; break   // CHI-PHI (5 ,9 ) -> 678
						case 10: travel = 622*m; break  // CHI-BAL (5 ,10) -> 622
						case 11: travel = 4350*m; break // CHI-COR (5 ,11) -> 4350
					}; break
					case 6: switch(c2) {
						case 7: travel = 3700*m; break  // PAL-NY  (6 ,7 ) -> 3700
						case 8: travel = 5500*m; break  // PAL-LV  (6 ,8 ) -> 5500
						case 9: travel = 3900*m; break  // PAL-PHI (6 ,9 ) -> 3900
						case 10: travel = 4000*m; break // PAL-BAL (6 ,10) -> 4000
						case 11: travel = 50*m; break   // PAL-COR (6 ,11) -> 50
					}; break
					case 7: switch(c2) {
						case 8: travel = 2232*m; break  // NY -LV  (7 ,8 ) -> 2232
						case 9: travel = 94*m; break	// NY -PHI (7 ,9 ) -> 94
						case 10: travel = 184*m; break  // NY -BAL (7 ,10) -> 184
						case 11: travel = 3750*m; break // NY -COR (7 ,11) -> 3750
					}; break
					case 8: switch(c2) {
						case 9: travel = 2177*m; break  // LV -PHI (8 ,9 ) -> 2177
						case 10: travel = 2106*m; break // LV -BAL (8 ,10) -> 2106
						case 11: travel = 5500*m; break // LV -COR (8 ,11) -> 5500
					}; break
						case 9: switch(c2) {
						case 10: travel = 90*m; break   // PHI-BAL (9 ,10) -> 90
						case 11: travel = 3950*m; break // PHI-COR (9 ,11) -> 3950
					}; break
						case 10: switch(c2) {
						case 11: travel = 4050*m; break	// BAL-COR (10,11) -> 4050
					}; break
				}

				// train can't travel between continents ($1mil travel cost >> possible profit)
				if(p==0 && travel > 3000) return 1000000;
				return travel
			}
			cut=0.12;
			switch(fam) { //determine cut -> paying percentage (based on famCode)
				case 0: cut = 0; break		// fam=0 -> famless
				case 1: cut = 0.12; break	// fam=1 -> normal member
				case 2: cut = 0.1; break	// fam=2 -> capos
				case 3: cut = 0; break		// fam=3 -> top3
			}

			//setup profit comparator variables
			tmpProfit = cityProfit = maxProfit = tmpbestnarc = tmpbestbooze = bestnarc = bestbooze = bestcity = 0;
			tmpHi = lowNarc = lowBooze = hiNarc = hiBooze = 0;
			tmpLow = 1000000

			//loop through all prices looking for best profit scenario
			for(k=4;k<12;k++) { //k is city
				for(i=1;i<3;i++) { //i is b/n
					for(j=2;j<9;j++) { //j is item
						currentPrice = Price3D[i][j][k];
						profit = (1-cut)*currentPrice-Price3D[i][j][city];
						if(profit > tmpProfit) {
							if(i==1) tmpbestnarc = j;
							if(i==2) tmpbestbooze = j;
							tmpProfit = profit;
						}
						if(k==city){
							if( (currentPrice-tmpHi) > 0){
								if(i==1) hiNarc = j;
								if(i==2) hiBooze = j;
								tmpHi = currentPrice
							}
							if( (currentPrice-tmpLow) < 0){
								if(i==1) lowNarc = j;
								if(i==2) lowBooze = j;
								tmpLow = currentPrice
							}
						}
					}
					if(i==1) m=narc;
					if(i==2) m=booze;
					cityProfit += m*tmpProfit;
					tmpProfit=0;
					tmpHi=0;
					tmpLow=1000000;
				}
				totProfit = cityProfit - flyCost(city,k,plane);
				if(totProfit > maxProfit) {
					maxProfit = totProfit;
					bestcity = k;
					bestnarc=tmpbestnarc;
					bestbooze=tmpbestbooze;
				}
				cityProfit=0;
			}

			
			// TRANSLATE THE NUMBERS
			function transNarc(narc) {
				switch(narc) {
					case 0: return lang.narcs[0];
					case 2: return lang.narcs[1];
					case 3: return lang.narcs[2];
					case 4: return lang.narcs[3];
					case 5: return lang.narcs[4];
					case 6: return lang.narcs[5];
					case 7: return lang.narcs[6];
					case 8: return lang.narcs[7];
				}
			}
			function transBooze(booze) {
				switch(booze) {
					case 0: return lang.booze[0];
					case 2: return lang.booze[1];
					case 3: return lang.booze[2];
					case 4: return lang.booze[3];
					case 5: return lang.booze[4];
					case 6: return lang.booze[5];
					case 7: return lang.booze[6];
					case 8: return lang.booze[7];
				}
			}
			function transNarcElem(narc) {
				switch(narc) {
					case 0: return langs.en.narcs[0];
					case 2: return langs.en.narcs[1];
					case 3: return "marihuana";
					case 4: return langs.en.narcs[3];
					case 5: return langs.en.narcs[4];
					case 6: return langs.en.narcs[5];
					case 7: return langs.en.narcs[6];
					case 8: return langs.en.narcs[7];
				}
			}
			function transBoozeElem(booze) {
				switch(booze) {
					case 0: return langs.en.booze[0];
					case 2: return langs.en.booze[1];
					case 3: return langs.en.booze[2];
					case 4: return langs.en.booze[3];
					case 5: return langs.en.booze[4];
					case 6: return langs.en.booze[5];
					case 7: return langs.en.booze[6];
					case 8: return langs.en.booze[7];
				}
			}
			function transCity(city) {
				switch(city) {
					case 0: return "NOWHERE";
					case 4: return "Detroit";
					case 5: return "Chicago";
					case 6: return "Palermo";
					case 7: return "New York";
					case 8: return "Las Vegas";
					case 9: return "Philadelphia";
					case 10: return "Baltimore";
					case 11: return "Corleone";
				}
			}

			//THE OUTPUT TABLE
			BRCTableStart = '<br/><br/><center><table cellspacing="0" cellpadding="2" width="500" rules="none" class="thinline"><tbody align="center"><tr><td class="tableheader">Best B/N Run!</td></tr><tr><td colspan="3" bgcolor="black" height="1"></td></tr>';
			BRCTableEnd = '</tbody></table></center>';
			// city/carry info
			infoRow = '<tr><td>' + lang.BR[1] + transCity(city) + lang.BR[2] + booze + lang.BR[3] + narc + lang.BR[4] + '</td></tr>';

			// AF links on smuggling
			if(dlp == '/smuggling.php') {
				ak = ak8 = ak9 = ak0 = akc = ''
				if(prefs[15]){ ak = ' accessKey='; ak8 = '8'; ak9 = '9'; ak0 = '0'; akc = '\\';}
				tblStart = '<br/><br/><center><table cellspacing="0" cellpadding="2" width="500" rules="none" class="thinline"><tbody align="center"><tr><td class="tableheader">Auto-Fill Links!</td></tr><tr><td colspan="3" bgcolor="black" height="1"></td></tr>';
				tblEnd = '</tbody></table></center>'
				noFocus = 'onFocus="this.blur()" ';
				startRes = '<tr><td><a ' + noFocus + ak + ak8 + ' href="javascript:';
				startLow = '<tr><td><a ' + noFocus + ak + ak9 + ' href="javascript:';
				startHi = '<tr><td><a ' + noFocus + ak + ak0 + ' href="javascript:';
				startClr = '<tr><td><a ' + noFocus + ak + akc + ' href="javascript:';
				getInput = 'document.getElementsByTagName(' + "'" + 'input' + "'" + ')';
				clrNarc = 'for(i=0;i<7;i++){' + getInput + '[i].value=0};';
				clrBz = 'for(i=9;i<16;i++){' + getInput + '[i].value=0};';
				checkBz = 'if('+inputs[8].checked+"){document.getElementsByName('"
				checkNarc = 'if('+inputs[17].checked+"){document.getElementsByName('"
				setNarc = "')[0].value=" + narc + ';}';
				setBz = "')[0].value=" + booze + ';}';
				checkBestB = checkBz + transBoozeElem(bestbooze).toLowerCase() + setBz;
				checkBestN = checkNarc + transNarcElem(bestnarc).toLowerCase() + setNarc;
				checkLowB = checkBz + transBoozeElem(lowBooze).toLowerCase() + setBz;
				checkLowN = checkNarc + transNarcElem(lowNarc).toLowerCase() + setNarc;
				checkHiB = checkBz + transBoozeElem(hiBooze).toLowerCase() + setBz;
				checkHiN = checkNarc + transNarcElem(hiNarc).toLowerCase() + setNarc;
				focus = getInput + '[18].focus();';
				endRes = '">' + ak8 + ' - Use best-run results</a></td></tr>';
				endLow = '">' + ak9 + ' - Use lowest prices (rp mode)</a></td></tr>';
				endHi = '">' + ak0 + ' - Use highest prices (CD-run mode)</a></td></tr>';
				endClr = '">' + akc + ' - Reset all fields (Clear)</a></td></tr>';
				clickResults = startRes + clrNarc + clrBz + checkBestB + checkBestN + focus + endRes;
				clickLowest = startLow + clrNarc + clrBz + checkLowB + checkLowN + focus + endLow;
				clickHighest = startHi + clrNarc + clrBz + checkHiB + checkHiN + focus + endHi;
				clickClear = startClr + clrNarc + clrBz + focus + endClr;
				LinkTbl = (info>=0 ? tblStart + clickResults + clickLowest + clickHighest + clickClear + tblEnd : '');
			}
			
			if(bestcity){ // display profit results
				bestRow = '<tr><td>' + lang.BR[5] + transNarc(bestnarc) + lang.BR[6] + transBooze(bestbooze) + lang.BR[7] + transCity(bestcity) + '.</td></tr>';
				profitRow = '<tr><td>' + lang.BR[8] + Math.floor(maxProfit) +'.</td></tr>';
				buyStr = transNarc(bestnarc) + ',' + narc + ',' + transBooze(bestbooze) + ',' + booze;
				// make link to smuggling page and display BRC table, if not first-run
				if(info>=0 && (dlp == '/hacking.php'||dlp=='/prices.php') ) {
					clickToBuy = '<tr><td>' + lang.BR[9] + '<a href="smuggling.php?a,' + buyStr + lang.BR[10];
					db.innerHTML = db.innerHTML + BRCTableStart + infoRow + bestRow + profitRow + '<br>' + clickToBuy + BRCTableEnd;
				}
				// smuggling page -> save current fields and display BRC (if not first run) and links table
				if(dlp == '/smuggling.php') {
					inputs = document.getElementsByTagName('input');
					BRC = (info>=0 ? BRCTableStart + infoRow + bestRow + profitRow + BRCTableEnd : '')
					forms = new Array(16);
					for(i=0; i<16; i++) forms[i] = inputs[i].value;
					db.innerHTML = db.innerHTML + BRC + LinkTbl;
					for(i=0; i<16;i++) inputs[i].value = forms[i];
					inputs[18].focus();
				}
			}
			else { // no profit results to show!
				lameRow = '<tr><td><br>' + lang.BR[11] + '</td></tr>';
				BRC = (info>0 ? BRCTableStart + infoRow + lameRow + BRCTableEnd : '');
				//display BRC table (if not first-run) and links on smuggling
				if(dlp == '/prices.php'||dlp=='/hacking.php') db.innerHTML = db.innerHTML + BRC;
				if(dlp == '/smuggling.php') {
					forms = new Array(16);
					inputs = document.getElementsByTagName('input');
					for(i=0; i<16; i++) forms[i] = inputs[i].value;
					db.innerHTML = db.innerHTML + BRC + LinkTbl;
					for(i=0; i<16;i++) inputs[i].value = forms[i];
					inputs[18].focus();
				}
			}
			counter = getValue('bncounter',1)
			setValue('bncounter',--counter)
		} // end callback function
	}); // end xmlhttpRequest
} // end BRC
// --- AF SMUGGLING WITH BRC RESULTS (FROM PRICES.PHP) ----------------
if(dlp == '/smuggling.php' && dls) { //check if B/N calc left info
	info = dls.split(','); //get bestRun info
	narc = info[2];
	booze = info[4];
	//get input elements for bestRun stuff
	narcForm = getELNAME(info[1].toLowerCase());
	boozeForm = getELNAME(info[3].toLowerCase());
	inputs = document.getElementsByTagName('input');
	// check if user is buying, then AF
	if(inputs[8].checked) {
		for(i=0;i<7;i++) inputs[i].value=0;
		boozeForm[0].value = ''+booze;
	}
	if(inputs[17].checked) {
		for(i=9;i<16;i++) inputs[i].value=0;
		narcForm[0].value = ''+narc;
	}
	inputs[18].focus();
}
