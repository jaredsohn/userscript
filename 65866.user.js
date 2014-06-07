// ==UserScript==
// @name           Friend For Sale Utility
// @description    ....
// @include        http://apps.facebook.com/friendsforsale/users/show*
// @include        http://apps.facebook.com/friendsforsale/chores*
// @include        http://apps.facebook.com/friendsforsale/
// @include        http://apps.facebook.com/friendsforsale/?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @implementation Mirak83
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////

var timeout, money, accountCash, maxValForBuy, isMe, value, isMyPet, id;

///////////////////////////////////////////////////////////////////////////////

function removecommas(txt) {
	 return parseInt(txt.substring(1).replace(/,/g,""), 10);
}

function addcommas(num) {
	var txt = String(num);
	var oRegEx = new RegExp('(-?[0-9]+)([0-9]{3})');
	while(oRegEx.test(txt)) {
		txt = txt.replace(oRegEx, '$1,$2');
	}
	return "$"+txt;
}

function performClick(node) {
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, false);
	node.dispatchEvent(evt);
}

function refresh() {
	document.location.reload();
}

function buyTimesFct(accountCash, value, ownerCash){
	if (accountCash >= value*1.111){
		return 0.5 + buyTimesFct(ownerCash+value*1.05, value*1.1, accountCash-value*1.111);
	}else{
		return 0.0;
	}
}

function colorPets(list){
	if(!isMe){
		var pets = list.getElementsByClassName("pets-item");
		var pet;
		for (pet in pets) {
			if (pets[pet].getElementsByClassName) {
				var petvalue = removecommas(pets[pet].getElementsByClassName("money")[0].innerHTML);
				if (petvalue <= maxValForBuy){
					pets[pet].style.backgroundColor = '#CDFFFF';
				}
			}
		}
	}
}

function buyPet(){
	clearTimeout(timeout);
	performClick( $(".action_container > .actions > .buy > .sliding_window_left > .sliding_window_right > .sliding_window_bottom > .sliding_window_corner > a")[0] );
	setTimeout(
		function (){
			performClick( $(".sliding_window_left > .sliding_window_right > .sliding_window_bottom > .sliding_window_corner > a")[1] );
			setTimeout(refresh, 5000);
		},
		5000);
}

///////////////////////////////////////////////////////////////////////////////

function clean(){
	$('div.x_action_link a:contains("report")').remove();
	$('div.green_box').remove();
	$('div.new_tutorial_back_on_track').remove();
	$('#app7019261521_user_selector').remove();
	$('#app7019261521_main_column div:contains("FFS Coins now on sale!")').remove();
	$('div.sliding_window_corner:contains("Ask Friends to Buy You")').remove();
	$('div.welcome div:contains("Featured Gifts")').remove();
	var coin = document.querySelectorAll("#app7019261521_hover_container > [id^=app7019261521_the_coin]");
	if (coin.length == 1){
			performClick(coin[0].firstChild);			
	}
}

function showStats() {
	
	var infosNet = $('div.general div.holder dl.info dt span.label:contains("Network:")').parent();
	var infosPetsB = $('div.general div.holder dl.info dt span.label:contains("Pets:")').parent();
	var infosPetsA = $('div.general div.holder dl.info dd span.pets_count').parent();
	var pets = document.getElementsByClassName("pets-item");

	var cash = removecommas(money[2].innerHTML);
	var ownerName = $('div.owner div.clearbox div div.text p a').text();
	var accountName = $('#fb_menu_account').text();
	var petName = $('div.general div.headline h2 a').html();
	isMyPet = (ownerName == accountName);
	isMe = (accountName == petName);

	var pet, sum = 0, sumW = 0;
	for (pet in pets) {
		if (pets[pet].getElementsByClassName) {
			var petvalue = removecommas(pets[pet].getElementsByClassName("money")[0].innerHTML);
			if (petvalue <= maxValForBuy && !isMe){
					pets[pet].style.backgroundColor = '#CDFFFF';
			}
			sum += petvalue;
			sumW += 100 * Math.sqrt(petvalue);
		}
	}
	var assets = addcommas(sum + cash);
	var pctInv = 100*(1-(cash/(sum + cash)));

	if (infosNet.length == 1 && infosPetsB.length == 1 && infosPetsA.length == 1) {
		infosNet.before("<dt><span class=\"label\">Pets value:</span></dt>");	
		infosNet.before("<dd><span class=\"money\">" + addcommas(sum) +"</span></dd>");	
		infosPetsB.before("<dt><span class=\"label\">Assets:</span></dt>");	
		infosPetsB.before("<dd><span class=\"money\">" + assets + "</span></dd>");
		if(isMyPet){
			infosPetsA.after("<dd><span class=\"money\"> + "+addcommas(Math.round(value*0.05))+"</span></dd>");	
			infosPetsA.after("<dt><span class=\"label\">If Sold:</span></dt>");	
			var buyTimes = buyTimesFct(Number.MAX_VALUE, value, accountCash);
			if (Math.floor(buyTimes) > 0){
				infosPetsA.after("<dd>&nbsp;</dd><dt>&nbsp;</dt>");
				infosPetsA.after("<dd><span class=\"money\">"+addcommas(Math.round(value*Math.pow(1.1, 2*Math.floor(buyTimes))))+"</span></dd>");	
				infosPetsA.after("<dt><span class=\"label\">Boucing to:</span></dt>");	
			}
		}else if (!isMe) {
			if (accountCash >= value*1.111){
				var ownerCash = removecommas($('div.owner span.money:eq(1)').text());
				var ownerLink = $('div.owner div.text p:eq(0)').html()
				var buyTimes = buyTimesFct(accountCash, value, ownerCash);
				infosPetsA.after("<div style=\"width:auto\"><span class=\"label\">You can buy it <span class=\"admirers\">"+Math.ceil(buyTimes)+"</span> times and "+((ownerLink==null)?"someone":ownerLink)+" <span class=\"admirers\">"+Math.floor(buyTimes)+"</span> times.</div>");
				infosPetsA.after("<dd>&nbsp;</dd>");
				infosPetsA.after("<dt>&nbsp;</dt>");
				infosPetsA.after("<dd>&nbsp;</dd>");
				infosPetsA.after("<dt>&nbsp;</dt>");
			}else{
				infosPetsA.after("<dd><span class=\"money\" style=\"color:#602C31\">"+addcommas(Math.round(value*1.111 - accountCash))+"</span></dd>");	
				infosPetsA.after("<dt><span class=\"label\">To buy:</span></dt>");				
			}
			
		}
		infosPetsA.after("<dd><span class=\"admirers\">"+pctInv.toFixed(2)+"%</span></dd>");	
		infosPetsA.after("<dt><span class=\"label\">Invested:</span></dt>");
		infosPetsA.after("<dd><span class=\"money\">"+addcommas(Math.round(sumW))+"</span></dd>");	
		infosPetsA.after("<dt><span class=\"label\">Chores:</span></dt>");			
	}

	var status, color;
	var header = $('div.general div.headline h2 a');
	if (sum == 0 || pctInv == 0) {
		status = "Inactive";
		color = "#969696";
	}
	else if (pctInv > 85) {
		status = "Hot";
		color = "#FF0000";
	}
	else if (pctInv > 60) {
		status = "Profit";
		color = "#FF9900";
	}
	else {
		status = "Active";
		color = "#FF9999";
	}

	header.html("<span>"+ header.text() + "</span> (<span style=\"color:"+color+"\">" + status + "</span>)");
}

function work() {
	var firstPets = $('span.pet_container:eq(0) a');
	if (firstPets.length) {
		
		var name = $('span.name', firstPets[0]).html();
		var energy = $('span.energy', firstPets[0]).html();
		var point = parseInt(energy.match(/([0-9]+)/i)[1]);
		
		var chore;			
		if (point == 100)		chore = 0;
		else if (point >= 75)	chore = 4;
		else if (point >= 65)	chore = 9;
		else if (point >= 50)	chore = 6;
		else if (point >= 40)	chore = 11;
		else if (point >= 35)	chore = 2;
		else if (point >= 30)	chore = 7;		
		else if (point >= 25)	chore = 5;
		else if (point >= 15)	chore = 1;
		else if (point >= 10)	chore = 3;

		if (point >= document.getElementById('chores_autovalue').value && point >= 10) {
			performClick(firstPets[0]);

			var work = $('span.chore_container:eq(' + chore + ') a');
			performClick(work[0]);
							
			var friend = $('span.friend_container:eq(0) a');
			performClick(friend[0]);

			var action = $('div.buy a:eq(1)');
			performClick(action[0]);
		}else{
			GM_setValue("chores_start_running", false);
			document.getElementById('chores_start').value = 'Start';
			$('#loading').hide();
			window.setTimeout(refresh, (100-point)*600000);	
		}
	}
}

///////////////////////////////////////////////////////////////////////////////

function addUIChores(){
	var chores_autostart = GM_getValue('chores_autostart', false);
	var chores_autovalue = GM_getValue('chores_autovalue', "100");
	
	$('#app7019261521_pet_box').append('<div id="energy" style="padding:5px;margin-top:2ex;border:1px solid #b4b4b4;font-family:lucida grande,tahoma,verdana,arial,sans-serif;color:#666666"></div>');
	$('#energy').append('<center><span>Energy min</span> <input style="margin-right:1em" type="text" value="'+chores_autovalue+'" size="3" id="chores_autovalue"></input><input type="button" class="inputsubmit" style="margin-right:2em;padding:2px 10px 1px 10px;" id="chores_start" value="'+(GM_getValue('chores_start_running', false)?'Stop':'Start')+'"><input type="checkbox" id="chores_autostart" '+ ((chores_autostart)?'checked="checked" ':'') + '>Autostart</input><img id="loading" style="float:right; visibility: hidden; width:20px; margin-right:10px;" src="http://www.minervacars.com/public/images/loading.gif"/></center>');

	if (GM_getValue('chores_start_running', false)){
		$('#loading').css('visibility', 'visible');
		var point = parseInt($('span.pet_container:eq(0) a:eq(0) span.energy').html().match(/([0-9]+)/i)[1]);
		if ((point >= document.getElementById('chores_autovalue').value) && (point >= 10)) {
			timeout = window.setTimeout(work, (Math.random()*3000)+10000);	
		}else{
			performClick(document.getElementById('chores_start'));
		}
	}else if (chores_autostart) {
		 performClick(document.getElementById('chores_start'));
	}
}

function addUIPet(){
	var autobuy_maxvalue = GM_getValue('autobuy_maxvalue', 0);
	var autobuy_autostart = GM_getValue('autobuy_autostart', false);

	$('div.narrow_main_column div:eq(0)').before('<div id="buy" style="padding:5px;margin-top:2ex;border:1px solid #b4b4b4;font-family:lucida grande,tahoma,verdana,arial,sans-serif;color:#666666"></div>');
	$('#buy').append('<center><span>Max value</span> <input type="text" id="autobuy_maxvalue" size="13" value="'+autobuy_maxvalue+'" style="margin-right: 1em;"/><input type="button" class="inputsubmit" style="padding: 2px 10px 1px; margin-right: 2em;" id="autobuy_start" value="'+(GM_getValue('autobuy_start_' + id +'_running', false)?'Stop':'Start')+'"/><input type="checkbox" id="autobuy_autostart"/>Autostart<img src="http://www.minervacars.com/public/images/loading.gif" style="float: right; visibility: hidden; width: 20px; margin-right: 10px;" id="loading"/></center>');
	
	if (GM_getValue('autobuy_start_'+id+'_running', false)){
		$('#loading').css('visibility', 'visible');
		if ((!isMe) && (!isMyPet) && (accountCash >= value*1.111) && (document.getElementById('autobuy_maxvalue').value > value)) {
			buyPet();
		}else{
			timeout = window.setTimeout(refresh, 5*60000);
		}
	}else if (autobuy_autostart) {
		 performClick(document.getElementById('start'));
	}	
}

///////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMNodeInserted',
	function (event) {
		if (event.target.innerHTML && (event.target.tagName == "UL")){
			colorPets(event.target);
		}
	},
false);

document.addEventListener('click',
	function (event) {
		if (event.target.id == 'chores_autostart' || event.target.id == 'autobuy_autostart'){
			GM_setValue(event.target.id, event.target.checked);
		}else if (event.target.id == 'chores_start'){
			if (GM_getValue('chores_start_running', false)) {
				GM_setValue('chores_start_running', false);
				$('#loading').css('visibility', 'hidden');
				event.target.value = 'Start';
				clearTimeout(timeout);
			}else{
				var point = parseInt($('span.pet_container:eq(0) a:eq(0) span.energy').html().match(/([0-9]+)/i)[1]);
				if (point >= document.getElementById('chores_autovalue').value && point >= 10) {
					GM_setValue('chores_start_running', true);
					$('#loading').css('visibility', 'visible');
					timeout = window.setTimeout(work, (Math.random()*3000)+10000);
					event.target.value = 'Stop';
				}else{
					window.setTimeout(document.getElementById(event.target.id).click, (100-point)*600000);	
				}
			}		
		}else if (event.target.id == 'autobuy_start'){
			if (GM_getValue('autobuy_start_' + id + '_running', false)) {
				GM_setValue('autobuy_start_' + id + '_running', false);
				$('#loading').css('visibility', 'hidden');
				event.target.value = 'Start';
				clearTimeout(timeout);
			}else{
				GM_setValue('autobuy_start_' + id + '_running', true);
				$('#loading').css('visibility', 'visible');
				event.target.value = 'Stop';
				if ((!isMe) && (!isMyPet) && (accountCash >= value*1.111) && (document.getElementById('autobuy_maxvalue').value > value)) {
					buyPet();
				}else{
					timeout = window.setTimeout(refresh, 5*60000);
				}
			}
		}
	},
false);

document.addEventListener('change',
	function (event) {
		if (event.target.id == 'chores_autovalue' || event.target.id == 'autobuy_maxvalue'){
			var chkZ = 1;
			for(i=0;i< event.target.value.length;++i)
				if( event.target.value.charAt(i) < "0" ||  event.target.value.charAt(i) > "9")
					chkZ = -1;
			if (chkZ==1) GM_setValue(event.target.id, event.target.value);
		}
	},
false);

///////////////////////////////////////////////////////////////////////////////

function start(){
	if (window.location.href.indexOf('chores') !== -1) {
		addUIChores();
	}else{
		clean();
		money = document.getElementsByClassName("money");
		accountCash = removecommas(money[0].innerHTML);
		value = removecommas(money[1].innerHTML);
		maxValForBuy = accountCash/1.111;
		$('#app7019261521_my_monies a').append('<br>');
		$('#app7019261521_my_monies a span').clone().appendTo('#app7019261521_my_monies');
		$('#app7019261521_my_monies span:eq(1)').text('(Pet '+addcommas(Math.floor(accountCash/1.111))+')');
		$('#app7019261521_my_monies span:eq(1)').toggleClass("money");
		$('#app7019261521_my_monies span:eq(1)').attr("style", "color:#602C31;font-weight:bold;opacity:0.4;position:relative;left:-0ex;");	
		$('#app7019261521_my_monies span:eq(0)').attr("style", "position:absolute;right:0ex;");
		showStats();
		if (window.location.href.indexOf('users/show/') !== -1) {
			id = window.location.href.substr(window.location.href.indexOf('show/')+5);
			if (id.indexOf("?") != -1) id = id.substr(0, id.indexOf("?"));
			addUIPet();
		}
	}
}

///////////////////////////////////////////////////////////////////////////////

window.setTimeout(start, 500);