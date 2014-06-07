// ==UserScript==
// @name        Blaze Score Sender Functions
// @namespace   Made by Heya on Neofriends.net
// @version     1
// ==/UserScript==

function newgetbetween(strSource, strStart, strEnd, intPos)
	{
		var begin = strSource.indexOf(strStart, (intPos === undefined ? 0 : intPos));
		if (begin < 0) return '';

		var end = strSource.indexOf(strEnd, begin);
		if (end < 0) return '';

		return strSource.substring(begin + strStart.length, end);
	}

	function proccess_list(number) {
		list = GM_getValue('list', '').split('\n');
		return list[number];
	}
	
	function get_time(time) {
		if(time.match("-")) {
			var split_time = time.split("-");
			return randomNumber(split_time[0], split_time[1]);
		} else {
			return time;
		}
	}
	
	function get_score(id) {
		if(id[1].match("-")) {
			var split_score = id[1].split("-");
			if(id.length == 4) {
				return randomNumberWithMod(split_score[0], split_score[1], id[3]);
			}else {
				return randomNumber(split_score[0], split_score[1]);
			}
		} else {
			return id[1];
		}
	}

	function randomNumber(min, max) {
		return (Math.round((parseInt (max) - parseInt (min)) * Math.random()))+parseInt (min);
	}
	
	function randomNumberWithMod(min, max, mod) {	
		return (Math.round(((parseInt (max) - parseInt (min)) * Math.random())/mod)*mod)+parseInt (min);
	}
	
	function send_score_request(url, id, encrypt_name) {
		GM_setValue('last_url', url);
		GM_setValue('last_id', id);
		GM_setValue('last_encrypt_name', encrypt_name);
		
		setstatus("Sending Score...");
		
		http_request.post(url, "onData=%5Btype%20Function%5D", "http://images.neopets.com/games/gaming_system/"+encrypt_name+".swf", function(source) {
			if(source.match('success=1')) {
				var new_nps = parseInt(getbetween(source, '&np=', '&success=').replace(",", ""));
				var difference = new_nps - parseInt(GM_getValue('nps', 0));
				GM_setValue('nps', new_nps);
				dom.name('log', 0).value = dom.name('log', 0).value+GM_getValue('last_id', id)+": Score Sent Sucessfully! +"+difference+" nps\n";
			} else if(source.match('errcode=17')) {
				dom.name('log', 0).value = dom.name('log', 0).value+GM_getValue('last_id', id)+": Encryption Error 17!\n";
			} else if(source.match('errcode=15')) {
				dom.name('log', 0).value = dom.name('log', 0).value+GM_getValue('last_id', id)+": Score Reviewed!\n";
			} else if(source.match('errcode=1060')) {
				dom.name('log', 0).value = dom.name('log', 0).value+GM_getValue('last_id', id)+": Encryption Error 1060!\n";
			} else if(source.match('errcode=11')) {
				dom.name('log', 0).value = dom.name('log', 0).value+GM_getValue('last_id', id)+": Max number of sends has been reached!\n";
			} else {
				dom.name('log', 0).value = dom.name('log', 0).value+source+'\n';
			}
			
			var ttl_game = parseInt(GM_getValue('total_games', "1"));
			var cur_game = parseInt(GM_getValue('current_game', "0"))+1;
			GM_setValue('current_game', cur_game);
			
			if(cur_game < ttl_game) {
				var cg = parseInt(GM_getValue('current_game', '0'))+1;
				dom.id('game_num').innerHTML = "Game "+cg+" out of "+GM_getValue('total_games', '0');
			
				var id = proccess_list(cur_game).split('|');
						
				send_score(id[0], get_score(id), get_time(id[2]));
			} else {
				setstatus("Done Score Sending!");
			}
		});
	}

	function count_down_to_send_score(wait_time, url, id, encrypt_name) {
		var time_left = Math.round(wait_time/1000);
		var wait = 0;
		while(time_left > 0) {
				setTimeout('document.getElementById("status").innerHTML = "Waiting: '+time_left+' seconds";', wait);
				time_left = time_left-1;
				wait = wait+1000;										
		}
		setTimeout(function() { send_score_request(url, id, encrypt_name) }, wait_time);
	}

	function send_score(id, score, wait_time) {
		
		setstatus("Going to game page");

		http_request.get('http://www.neopets.com/games/game.phtml?game_id='+id,function(uesless_code) {
			setstatus("Starting game");
			http_request.get('http://www.neopets.com/games/play_flash.phtml?va=&game_id='+id,function(game_code) {
				var flash_link = getbetween(game_code, 'gameURL', 'ccard=');
				var username = getbetween(flash_link, "&username=", "&lang=");
				var sh_g = getbetween(flash_link, "&sh=", "&sk=");
				var sk_g = getbetween(flash_link, "&sk=", "&baseurl=");
				var encrypt_name = newgetbetween(game_code, '%2Fgaming_system%2F', '.swf"');
				if (encrypt_name == '') {
					encrypt_name = newgetbetween(game_code, 'gameURL":"', '.swf');
				}
					
				if(encryptor.hasEncryption(encrypt_name) == false) {
					GM_xmlhttpRequest({ 
						method: "GET",
						url: "http://www.neofriends.net/thunder_update.php?enc="+encrypt_name,
						headers: {
							"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
							"Accept-Language": "en-US,en;q=0.5",
						},
						onload: function(e) {
							decimal = e.responseText.split('<br>');
							for(var i=0;i<decimal.length;i++) {
								decimal[i] = decimal[i].replace(";", "");
							}
							encryptor.setEncryption(encrypt_name, decimal);
							var sendURL = encryptor.getURL(encrypt_name, username, sh_g, sk_g, id, wait_time, score);
								
							count_down_to_send_score(wait_time, sendURL, id, encrypt_name);
						}
					});
				} else {
					var sendURL = encryptor.getURL(encrypt_name, username, sh_g, sk_g, id, wait_time, score);
						
					count_down_to_send_score(wait_time, sendURL, id, encrypt_name);
				}
			});
		});
	}