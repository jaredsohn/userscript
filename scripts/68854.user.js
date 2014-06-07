CheckForUpdate.init(<>

// ==UserScript==

// @name           Neoquest I Remote

// @namespace      SkyStar

// @require        http://userscripts.org/scripts/source/63808.user.js

// @include        http://www.neopets.com/games/neoquest/neoquest.phtml*

// @require        http://userscripts.org/scripts/source/38788.user.js

// @cfu:meta       http://userscripts.org/scripts/source/@cfu:id.meta.js

// @cfu:url        http://userscripts.org/scripts/source/@cfu:id.user.js

// @cfu:id         uso:script

// @cfu:version    uso:version

// @uso:script     54819

// @uso:version    1.4
// ==/UserScript==

</>);



try{

	document.getElementById('ban_bottom').style.display="none";

	document.getElementById('ban').style.display="none";

}

catch (ex){}

try

{

    if (GM_getValue("onoff")==undefined)

    {

        GM_setValue("onoff", true);

    }

	if (GM_getValue("stuned")==undefined)

    {

        GM_setValue("stuned", 0);

    }

    if (GM_getValue("toleft")==undefined)

    {

        GM_setValue("toleft", 3);

    }

    if (GM_getValue("toright")==undefined)

    {

        GM_setValue("toright", 4);

    }

    if (GM_getValue("healingitem")==undefined)

    {

        GM_setValue("healingitem", 220000);

    }

    if (GM_getValue("remote")==undefined)

    {

        GM_setValue("remote", true);

    }

    if (GM_getValue("Path")==undefined)

    {

        GM_setValue("Path", 0);

    }

    if (GM_getValue("pathIndex")==undefined)

    {

        GM_setValue("pathIndex", 0);

    }



}



catch (ex) { }



    if (GM_getValue("healingitem")==220000)

    {

    var optselected = 1;

    }

    if (GM_getValue("healingitem")==220001)

    {

    var optselected = 2;

    }

	if (GM_getValue("healingitem")==220002)

    {

    var optselected = 3;

    }

	if (GM_getValue("healingitem")==220003)

    {

    var optselected = 4;

    }	

	if (GM_getValue("healingitem")==220004)

    {

    var optselected = 5;

    }	

	if (GM_getValue("healingitem")==220005)

    {

    var optselected = 6;

    }	

function random(from, to)

{

    return Math.floor(Math.random() * (to-from)) + from;

}



var REFRESHS = Math.floor(Math.random() * parseFloat((GM_getValue("to") - GM_getValue("from")))) + parseFloat(GM_getValue("from"));



function start() {

	GM_setValue("Path", document.getElementById('directions').value);

	GM_setValue("pathIndex", document.getElementById('pathindex').value);

	if(document.getElementById('normal').checked==true)

	{	

		location.href = 'http://www.neopets.com/games/neoquest/neoquest.phtml?movetype=1';

	}

	if(document.getElementById('hunting').checked==true)

	{

		location.href = 'http://www.neopets.com/games/neoquest/neoquest.phtml?movetype=2';

	}

	if(document.getElementById('sneaking').checked==true)

	{

		location.href = 'http://www.neopets.com/games/neoquest/neoquest.phtml?movetype=3';

	}

	if(document.getElementById('enabled').checked==true)

	{

		GM_setValue("remote", false)

		GM_setValue("onoff", false);

	}

	if(document.getElementById('flee').checked==true)

	{

		GM_setValue("flee", false);

	}

	if(document.getElementById('flee').checked==false)

	{

		GM_setValue("flee", true);

	}

	if(document.getElementById('Disabled').checked==true)

	{	

		GM_setValue("remote", true);

		GM_setValue("flee", true);

	}

}

if(xpath("boolean(id('content')/table/tbody/tr/td[2]/div[2]/div/div[2]/table/tbody/tr/td[3]/table/tbody/tr[1]/td/a[1])"))

{

	var link1 = xpath("id('content')/table/tbody/tr/td[2]/div[2]/div/div[2]/table/tbody/tr/td[3]/table/tbody/tr[1]/td/a[1]")[0];

	var a = document.createElement('a');

	a.innerHTML = "<b>Remote control</b><br />"

	a.href = 'http://www.neopets.com/games/neoquest/neoquest.phtml?action=options#2';

	link1.parentNode.insertBefore(a, link1);



}



// right bar

   var item = xpath("/html/body/div/div[3]/table/tbody/tr/td[2]/div")[0];

   item.innerHTML = '<div style="height:450px; width:10; border: 4px solid #E4E4E4;" class="contentModule autoplayer">' + 

  		   '<div class="contentModuleHeader"><b>Autoplayer</b></div>' + 

			'<div id="links" style="position: relative; top: 4px;">' +

				'<a style="margin-left: 10%; width:20px;" id="scripton" href="#"><b>Enabled</b></a><a style="margin-left: 8%; width:20px;" id="scriptoff" href="#"><b>Disabled</b></a><br/ >' +

				'<div class="separator"style="height:2px; background-color:Silver; position: relative; top: 5px;"></div>' +

				'<center style="position: relative; top:5px;"><b>Remote Control</b></center><div style="position: relative; top:5px;"><a style="margin-left: 10%; width:20px;" id="remoteON" href="#"><b>Enabled</b></a><a style="margin-left: 8%; width:20px;" id="remoteOFF" href="#"><b>Disabled</b></a></div></div>' +

		   '<div class="separator"style="height:2px; background-color:Silver; position: relative; top: 10px;"></div>' +

		   '<div class="image" STYLE="position:relative; TOP:20px; left:13px;">'+

				'<img src="http://img181.imageshack.us/img181/1636/20090730192237.jpg" width="120" height="120"></div>' +

		   '<div class="separator"style="height:2px; background-color:Silver; position: relative; top: 35px;"></div>' +

		   '<div style="width:150px; height:150px; position: relative; top: 38px;" id="RL">' +

				'<div class="setups" style="width: 100px; height: 90px; position: relative; top: 5px;"><b>Healing item</b> <br/ ><br/ >' +

				'<select><option selected>-Select an option-</option>' +

				'<option value="220000">Weak Healing Pot</option>' +

				'<option value="220001">Standard Heal Pot</option>' + 

				'<option value="220002">Strong Healing Pot</option>' +

				'<option value="220003">Greater Healing Pot</option>' +		

				'<option value="220004">Superior Healing Pot</option>' +

				'<option value="220005">Spirit Healing Pot</option>' +

				'</select>' +

				'<input id="heal" type="text" size="6"></input>' +

			'<div class="separator"style="height:2px;width: 150px; background-color:Silver; position: relative; top: 5px;"></div>' +

			'<br><b>Refreshs </b><div style="font-size: 11px;">(In mileseconds)<b>:</b></div><br><div style="bottom:13px; margin-left:6%; position:relative; width:60px;">From: <br><input value="'+GM_getValue('from', '800')+'" id="from" maxlength="4" size="5" type="text"></div><div style="bottom:53px; margin-left:80%; position:relative; width:60px;">To: <br><input value="'+GM_getValue('to', '2800')+'" id="to" maxlength="4" size="5" type="text"></div>'+

			'<div class="separator"style="height:2px;width: 150px; bottom: 50px; background-color:Silver; position: relative; "></div>' +

			'<input type="button" style="position: relative; bottom: 48px; float: right;" value="save" id="saveconfig"></div>';



	if(GM_getValue('onoff')==false){

		document.getElementById('scripton').style.color="green";

		document.getElementById('scriptoff').style.color="black";

	}else{

		document.getElementById('scripton').style.color="black";

		document.getElementById('scriptoff').style.color="red";	

	}

	if(GM_getValue('remote')==false){

		document.getElementById('remoteON').style.color="green";

		document.getElementById('remoteOFF').style.color="black";

	}else{

		document.getElementById('remoteON').style.color="black";

		document.getElementById('remoteOFF').style.color="red";	

	}	

	//Default value boxes

	document.getElementById("heal").value = GM_getValue('healingitem');



	document.getElementById('links').getElementsByTagName('a')[0].addEventListener('click', function() {GM_setValue('onoff', false); location.href="http://www.neopets.com/games/neoquest/neoquest.phtml"}, false);

	document.getElementById('links').getElementsByTagName('a')[1].addEventListener('click', function() {GM_setValue('onoff', true);  clearTimeout(timeout); location.href ="http://www.neopets.com/games/neoquest/neoquest.phtml"}, false);

	document.getElementById('links').getElementsByTagName('a')[2].addEventListener('click', function() {GM_setValue('remote', false); location.href="http://www.neopets.com/games/neoquest/neoquest.phtml"}, false);

	document.getElementById('links').getElementsByTagName('a')[3].addEventListener('click', function() {GM_setValue('remote', true); clearTimeout(timeout); location.href ="http://www.neopets.com/games/neoquest/neoquest.phtml"}, false);

	document.getElementById('saveconfig').addEventListener('click', function () {

			GM_setValue('from', document.getElementById('from').value); 

			GM_setValue('to', document.getElementById('to').value);

			GM_setValue('healingitem', document.getElementById('heal').value); 

			location.href = "http://www.neopets.com/games/neoquest/neoquest.phtml"

		}, true);



	document.getElementsByTagName("select")[0].addEventListener('change', function(e) {document.getElementById('heal').value = e.currentTarget.value; }, false);

	document.getElementsByTagName("select")[0].selectedIndex = optselected;



if (window.location.href.match('action=options#2'))

{



GM_addStyle(".options {width: 380px; position: relative; top: 7px;}"); 



var item2 = xpath("/html/body/div/div[3]/table/tbody/tr/td[2]/div[2]")[0];

    item2.innerHTML =   '<div style="height:630px; width:100;" class="contentModule autoplayer">' + 

			'<div class="contentModuleHeader"><b>Autoplayer - Remote control</b></div>' +

			'<div id="option" style="position: relative; top: 10px; width: 330px; height:120px;">' +

				'<b style="position: relative; top: 1px;">Select your destination:</b>' +

				'<br /><div id="configchapter" style="position: relative; top:8px; height: 120px;">' +

				'<input name="chapters" type="radio">Chpt 1</input>' + 

				'<input name="chapters" type="radio">Chpt 2</input>' + 

				'<input name="chapters" type="radio">Chpt 3</input>' + 

				'<input name="chapters" type="radio">Chpt 4</input>' + 

				'<input name="chapters" type="radio">Chpt 5</input>' + 

				'<div class="options" style="height: 22px;" id="option89"><b>Select a part</b></div>' +

				'<div id="option1" class="options" style="display:none;"><select>' +

				'<option style="color: red; font-style: italic; border: 1px dashed rgb(47, 111, 171);">Part 1 - Neopia city e xantan</option>' +

					'<option value="55885555522222444664444442222446664477555553522888588555552222244466444447" id="http://i26.tinypic.com/sdodbb.jpg">Neopia City Walk Around</option>' +

					'<option value="00000000000000000000000000000000000000000000000000000000000000000000000000" id="">Don't move</option>' +
					
					'<option value="666666411115555555577776612222333555" id="http://i26.tinypic.com/sdodbb.jpg">Neopia City Walk Around (Southwest)</option>' +

					'<option value="11111444444444488778555555555555888777666444446677855558555555555555877777777777777777785555555553222222222222222221155587777853222235877778532222355877767777876678587776444441114111144464122222223221467777788855558853222222112214444444466677777777858855555555555322322322222211221441114446444444" id="http://i26.tinypic.com/sdodbb.jpg">Neopia City to Xantan.</option>' +

					'<option value="555555555588888" id="http://i29.tinypic.com/10hu746.jpg">Dark cave entrance to Neopia Castle</option>' +

				'</select></div>' + 

				'<div id="option2" class="options" style="display:none;"><select>' +

				'<option style="color: green; font-style: italic; border: 1px dashed rgb(47, 111, 171);">Part 2 - Grall peninsula</option>' +

					'<option value="6667777777777788888555" id="http://i26.tinypic.com/sdodbb.jpg">Neopia City to Grarrl Peninsula</option>' +

					'<option value="223355553223355" id="http://i27.tinypic.com/21b25qx.jpg">Jungle Ruins Entrence to level -1</option>' +

					'<option value="3555555555555555555555555555555587777777777777777775555555555555555555555555522222222222244444444477744422222555555555555222" id="http://i27.tinypic.com/2zjdjds.jpg">Level -1(right of the stairs) to Kreai</option>' +

					'<option value="77777785555555222444422222552224444422444444777747744442222222222555555555555555555555777777777755555275525555555447755552225577755552222222444447552222255775522222222222222222" id="http://i27.tinypic.com/2zjdjds.jpg">Level -1(right of the stairs) to Gors the Mighty</option>' +				

					'<option value="24447444777744444112222227774444447777777777444" id="http://i27.tinypic.com/2zjdjds.jpg">level -1(right of the stairs) to Denethir</option>' +

					'<option value="55532222222235555322778888883223355" id="http://i28.tinypic.com/2116uiv.jpg">Denethir to level -1(right of the stairs)</option>' +

					'<option value="77777757555555555557577777755555777755777577557755555333333333332225555555522255555577777777777776666688887477774777757577777477766644474744444444424444424224444666641111222442224441113222255255558883355757777777555223222552555255577777777" id="http://i27.tinypic.com/2zjdjds.jpg">Level -1(right of the stairs) to Rollay Scaleback</option>' +				

					'<option value="1444444411222224" id="http://i30.tinypic.com/2wmgeg3.jpg">After Rollay Scaleback to stairs</option>' +

					'<option value="4646776444466774411141122222222222333" id="http://i27.tinypic.com/2zjdjds.jpg">Level -1(right of the stairs) to Neopia City</option>' +

					'</select></div>' + 

					'<div id="option3" class="options" style="display:none;"><select>' +

				'<option style="color: blue; font-style: italic; border: 1px dashed rgb(47, 111, 171);">Part 3 - Desert of roo</option>' +

					'<option value="4411111444441444464444444444444444444666664676666778877777777777776666788552" id="http://i26.tinypic.com/sdodbb.jpg">Neopia City to Desert of Roo</option>' +

					'<option value="4641122222222222221221444" id="http://i30.tinypic.com/2bnsx5.jpg">Desert of Roo to Swamp Edge City</option>' +

					'<option value="555877877777777777788555355555555555555555555555555335555585555535535855533323335555885555885553555555333555588777777777777777777664644444414446111444444444664444677777766676444444444444444444667777644444444444133333211111412223333355555535555555555555553333355533555553335558777" id="http://i27.tinypic.com/30tkoqg.jpg">Swamp Edge City to Temple of Roo Key 1</option>' +

					'<option value="2222555555555555555555522222225552" id="http://i27.tinypic.com/nfqnx3.jpg">Key 1 to Key 2</option>' +

					'<option value="774447777777777744447777777777777777777744444442" id="http://i29.tinypic.com/1x4za.jpg">Key 2 to Key 3</option>' +

					'<option value="7555555522222222222222222222222224444444222222224" id="http://i28.tinypic.com/x3wtwo.jpg">Key 3 to Key 4</option>' +

					'<option value="57777777755555555557777775555552" id="http://i28.tinypic.com/2hea39h.jpg">Key 4 to Key 5</option>' +					

					'<option value="77744444444477444444444422225" id="http://i32.tinypic.com/ezlkkh.jpg">Key 5 to Key 6</option>' +

					'<option value="477777555555555552225555555555577777447777444444422222225555577774" id="">Key 6 to Archmagus of Roo</option>' +

					'<option value="555555555555555555555555525525555557744" id="http://i30.tinypic.com/2bnsx5.jpg">Temple of Roo Entrance to Erick</option>' +

					'<option value="55314444466444444444444444444444444444464641122222222222221221444" id="">Erick to Swamp Edge City</option>' +

					'<option value="55558887767777777776885355555555555555555555555555525525555557744" id="http://i27.tinypic.com/30tkoqg.jpg">Swamp Edge City to Erick</option>' +

					'<option value="553144444664444444444444444444444444477777777777" id="">Erick to Techo Caves</option>' +

					'</select></div>' + 

					'<div id="option4" class="options" style="display:none;"><select>' +

				'<option style="color: green; font-style: italic; border: 1px dashed rgb(47, 111, 171);">Part 4 - Techo caves</option>' +

					'<option value="55558887767777777776885355555555555555555555555555525525555557744" id="http://i28.tinypic.com/1zxxtvp.jpg">Techo Cave Level 1 Entrance to Exit</option>' +	

					'<option value="5555522221122222333555585355533222" id="http://i25.tinypic.com/14vtlvs.jpg">Techo Cave Level 1 Exit to Mr. Irgo</option>' +

					'<option value="6446466777766776788888558555" id="">Techo Cave Level 2 Entrance to Exit</option>' +

					'<option value="4477776667777668887778864444664114464166611661166766446785877666444444" id="http://i25.tinypic.com/14vtlvs.jpg">Techo Cave Level 2 Exit to Gali Yoj</option>' +

					'<option value="555555332231412355332338833883338553558833555531122211222322222333225554444111111232332222333355355555888855333883335553555588858777677746888855555535555553553588885555335555855588885764188555555587778777764464166441111111111144166667777777777777767" id="http://i28.tinypic.com/2058lsj.jpg">Sunny City to Mountain Fortress</option>' +

					'<option value="77777777777777777855558587777777755558887" id="http://i29.tinypic.com/11gubdh.jpg">Terror mountain to Fire Magic</option>' +

					'<option value="2222233333332355555555555588788888887777" id="">Guardian of Fire Magic to Life Magic</option>' +

					'<option value="111111122222211444466777777777777777777774444" id="">Life Guardian Spot to Ice Guardian</option>' +

					'<option value="555552222222222222222222221444444466767777777664" id="">Ice Guardian Spot to Fire Guardian</option>' +

					'<option value="33322222333322555555222222222222144446666664" id="">Fire Guardian Spot to Shock Guardian</option>' +

					'<option value="333333355555555555588888587" id="">Shock Guardian Spot to Spectral Guardian</option>' +

					'</select></div>' + 

					'<div id="option5" class="options" style="display:none;"><select>' +

				'<option style="color: green; font-style: italic; border: 1px dashed rgb(47, 111, 171);">Part 5 - Final</option>' +

					'<option value="222222224444444444411222232222222222233322235588888888888885335585353222221221444444441185588887785888877777788555855555855555555855885558877876677777766666685555355555555555555555558888555558555555533553333333333222222222222222223222233355555333335333353322222222222" id="">Spectral Guardian Spot to Faelinn</option>' +

					'<option value="77777666666444664444464122223113" id="http://i32.tinypic.com/33vcimx.jpg">Kal Panning to Gatekeeper</option>' +

					'<option value="3222222222222211222221222222" id="http://i29.tinypic.com/eqxg5c.jpg">Gatekeeper to Two Rings Castle</option>' +

					'<option value="2222222222222222222222222222222233222222222222322333322222235555555555555555555555555555555555552222114858777774444444444444444422221467777776122221144444444444777777778864412214444144644441441111114441466764446644444444444444445555555555555555555" id="http://i26.tinypic.com/2mpk17b.jpg">Two Rings Castle to Final Battle</option>' +

				'</select></div>' +

				'<div style="position: relative; top: 21px;"><b>Directions:</b><br/ >' + 

				'<input id="directions"  type="text" size="48"></div>' +

				'<div style="position: relative; top: 32px;"><b>Path Index:</b>' +

				'<br/ ><input id="pathindex"  type="text" size="5">' +

				'<div style="font-size:9px; width:300px;">(If you starting set 0, else don´t change.)</div></div></div>' +

				'<div class="separator" style="width: 2px; height: 252px; background-color: Silver; position: relative; left: 318px; bottom: 144px;"></diV>' + 

			'<div id="options" style="position: relative; bottom: 213px;">' +

				'<div class="separator" style="height: 2px; background-color: Silver; position: relative; top: 20px; width: 320px;"></diV>' + 

				'<div style="position: relative; top: 23px;"><b> Travel mode:</b><br/ >' + 

				'<input id="normal" name="normalhunting" type="radio">Normal</input>' +

				'<input id="hunting" name="normalhunting" type="radio">Hunting</input>' +

				'<input id="sneaking" name="normalhunting" type="radio">Sneaking</input><br/ >' +

				'<br/ ><input type="checkbox" id="flee">Auto Flee fights</input><br/ ><br/ >' +

				'<input type="radio" name="en" id="enabled">Enabled</input><input type="radio" name="en" id="Disabled">Disabled</input></div>' +

				'<a id="startremote" style=" font-size:19px; position: relative; top: 10px; left:500px;">Start</a>' +

				'<div class="separator" style="height: 2px; background-color: Silver; position: relative; top: 13px; width: 630px;"></diV></div>' + 

			'</div><div id="options" style="position: relative; display: block; left: 325px; bottom: 123px; width: 302px; height: 235px;">' +

				'<div class="separator" style="height: 2px; background-color: Silver; position: relative; top: 254px; width: 315px; right: 7px;"></diV>' + 

				'<center><b>You should stay here:</b></center><img style="display:block" src="http://i30.tinypic.com/351ctbo.jpg"></img><img style="display:block" id="fullimg" src=""></img><img src="http://i32.tinypic.com/140jkuv.jpg" style="display:block"></img></div>' +

			'<a style="position: relative; bottom: 33px;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7473677"><img src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif"></img></a></div></div>';

			

	document.getElementById("configchapter").getElementsByTagName("input")[0].addEventListener('click', function(e) {document.getElementById("option1").style.display="block"; document.getElementById("option89").style.display="none"; document.getElementById("option4").style.display="none"; document.getElementById("option3").style.display="none"; document.getElementById("option2").style.display="none"; document.getElementById("option5").style.display="none"; }, false);

	document.getElementById("configchapter").getElementsByTagName("input")[1].addEventListener('click', function(e) {document.getElementById("option2").style.display="block"; document.getElementById("option89").style.display="none"; document.getElementById("option4").style.display="none"; document.getElementById("option3").style.display="none"; document.getElementById("option5").style.display="none"; document.getElementById("option1").style.display="none";}, false);

	document.getElementById("configchapter").getElementsByTagName("input")[2].addEventListener('click', function(e) {document.getElementById("option3").style.display="block"; document.getElementById("option89").style.display="none"; document.getElementById("option4").style.display="none"; document.getElementById("option5").style.display="none"; document.getElementById("option2").style.display="none"; document.getElementById("option1").style.display="none";}, false);

	document.getElementById("configchapter").getElementsByTagName("input")[3].addEventListener('click', function(e) {document.getElementById("option4").style.display="block"; document.getElementById("option89").style.display="none"; document.getElementById("option5").style.display="none"; document.getElementById("option3").style.display="none"; document.getElementById("option2").style.display="none"; document.getElementById("option1").style.display="none";}, false);   

	document.getElementById("configchapter").getElementsByTagName("input")[4].addEventListener('click', function(e) {document.getElementById("option5").style.display="block"; document.getElementById("option89").style.display="none"; document.getElementById("option4").style.display="none"; document.getElementById("option3").style.display="none"; document.getElementById("option2").style.display="none"; document.getElementById("option1").style.display="none";}, false);



	document.getElementsByTagName("select")[1].addEventListener('change', function(e) {document.getElementById('directions').value = e.currentTarget.value; document.getElementById('pathindex').value = "0";document.getElementById('place').src= this.options[this.selectedIndex].id; document.getElementById('fullimg').src= this.options[this.selectedIndex].lang; document.getElementById('enabled').checked="true";}, false);

	document.getElementsByTagName("select")[2].addEventListener('change', function(e) {document.getElementById('directions').value = e.currentTarget.value; document.getElementById('pathindex').value = "0";document.getElementById('place').src= this.options[this.selectedIndex].id; document.getElementById('fullimg').src= this.options[this.selectedIndex].lang; document.getElementById('enabled').checked="true";}, false);

	document.getElementsByTagName("select")[3].addEventListener('change', function(e) {document.getElementById('directions').value = e.currentTarget.value; document.getElementById('pathindex').value = "0";document.getElementById('place').src= this.options[this.selectedIndex].id; document.getElementById('fullimg').src= this.options[this.selectedIndex].lang; document.getElementById('enabled').checked="true";}, false);

	document.getElementsByTagName("select")[4].addEventListener('change', function(e) {document.getElementById('directions').value = e.currentTarget.value; document.getElementById('pathindex').value = "0";document.getElementById('place').src= this.options[this.selectedIndex].id; document.getElementById('fullimg').src= this.options[this.selectedIndex].lang; document.getElementById('enabled').checked="true";}, false);

	document.getElementsByTagName("select")[5].addEventListener('change', function(e) {document.getElementById('directions').value = e.currentTarget.value; document.getElementById('pathindex').value = "0";document.getElementById('place').src= this.options[this.selectedIndex].id; document.getElementById('fullimg').src= this.options[this.selectedIndex].lang; document.getElementById('enabled').checked="true";}, false);





	document.getElementsByTagName("select")[1].addEventListener('change', function(e) {document.getElementById('directions').value = e.currentTarget.value; document.getElementById('pathindex').value = "0"; document.getElementById('enabled').checked="true"; document.getElementById('fullimg').src = this.options[this.selectedIndex].id}, false);

	document.getElementById('directions').value = GM_getValue('Path');

	document.getElementById('pathindex').value = GM_getValue('pathIndex');

	document.getElementById('normal').checked=true;

	if(GM_getValue('remote')==true)

	{

		document.getElementById('Disabled').checked=true;

	}

	if(GM_getValue('remote')==false)

	{

		document.getElementById('enabled').checked=true;

	}

	document.getElementById('startremote').addEventListener('click', start, true);



   

   if (GM_getValue("flee")==false)

   {

	document.getElementById('flee').checked=true;

   }

}



//Begin the fight

var walk = false;

if(GM_getValue("toleft")==0)

{

	var walk = true; 

}

var scriptonoff = GM_getValue("onoff");

if (new RegExp(/http\:\/\/w{3}\.neopets\.(com|com\.br)\/games\/neoquest\/neoquest\.phtml\?action=/i).test(location.href))

{

	scriptonoff = true;

}

if (new RegExp(/http\:\/\/w{3}\.neopets\.(com|com\.br)\/games\/neoquest\/neoquest\.phtml\?action=move/i).test(location.href))

{

	scriptonoff = GM_getValue("onoff");

}

if(!scriptonoff)

{

	if(btnSubmit=document.evaluate("/html/body/div/div[3]/table/tbody/tr/td[2]/div[2]/div/div[2]/center[2]/form",document,null,8,null).singleNodeValue) 

	{

		var inputs = btnSubmit.getElementsByTagName('input').length;

		if(inputs==2)

		{

			var timeout = setTimeout(function(){location.href="http://www.neopets.com/games/neoquest/neoquest.phtml?end_fight=1";}, REFRESHS);

		}

		if(inputs==1)

		{

			var timeout = setTimeout(function(){location.href="http://www.neopets.com/games/neoquest/neoquest.phtml";}, REFRESHS);

		}

	}

	if(btnSubmit2=document.evaluate("/html/body/div/div[3]/table/tbody/tr/td[2]/div[2]/div/div[2]/center/form",document,null,8,null).singleNodeValue) 

	{

		var inputs = btnSubmit2.getElementsByTagName('input').length;

		if(inputs==2)

		{

			GM_setValue('stuned', '0');

			var timeout = setTimeout(function(){location.href="http://www.neopets.com/games/neoquest/neoquest.phtml?end_fight=1";}, REFRESHS);

		}

		if(inputs==1)

		{

			GM_setValue('stuned', '0');

			var timeout = setTimeout(function(){location.href="http://www.neopets.com/games/neoquest/neoquest.phtml";}, REFRESHS);

		}

	}



	var disabledthis = false;

	if((location.href.match('move&movelink')) || (location.href.match('end_fight=1')) || (location.href.match('movetype')))

	{

		var disabledthis = true;

	}

	var donotwalkinremote = false;

	if(!disabledthis)

	{

		if(aurl=document.evaluate("/html/body/div/div[3]/table/tbody/tr/td[2]/div[2]/div/div[2]/table/tbody/tr/td[3]/table/tbody/tr[2]/td/a",document,null,9,null).singleNodeValue)

		{

			if(aurl.innerHTML.match('Go!'))

			{

				location.href= aurl.href;

				donotwalkinremote = true;

			}

		}

	}

	var i = 0;

	var elements = document.getElementsByTagName('img');

	for(i=0;i<elements.length;i++)

	{

		switch(elements[i].src)

		{

			case "http://images.neopets.com/nq/n/navarrows.gif":

			if(!donotwalkinremote)

			{

				if (GM_getValue("remote")==false) 

				{

					if((GM_getValue("Path").length) != GM_getValue("pathIndex"))

					{

						var timeout = setTimeout(function(){location.href="http://www.neopets.com/games/neoquest/neoquest.phtml?action=move&movedir=" + GM_getValue("Path")[GM_getValue("pathIndex")]; }, REFRESHS);

						GM_setValue("pathIndex",parseFloat(GM_getValue("pathIndex"))+1);

					}

			

					else

					{

						alert("You have arrived at your destination.");

						GM_setValue("pathIndex",0)

						GM_setValue("toleft",0)

						GM_setValue("remote", true)

						GM_setValue("onoff2", true)

					}

			

				}

			}

		}

	}



	var attack = false;

	var items = window.document.evaluate("id('content')/table/tbody/tr/td[2]/div[2]/div/div[2]/table/tbody/tr",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	for ( var ai = 0 , at = items.snapshotLength ; ai < at ; ++ai )

	{

		var line = items.snapshotItem(ai);

		var cell = line.getElementsByTagName('td')[0];

		if((cell.innerHTML.search(/to see what you found!/)) != -1)

		{

			var timeout = setTimeout(function(){location.href="http://www.neopets.com/games/neoquest/neoquest.phtml";}, REFRESHS);

			var attack = true;

		}

		if((cell.innerHTML.search(/stuns you for <b>1<\/b>/)) != -1)

		{

			GM_setValue("stuned", "1");

		}

		if((cell.innerHTML.search(/stuns you for <b>2<\/b> /)) != -1)

		{

			GM_setValue("stuned", "2");

		}

		if((cell.innerHTML.search(/stuns you for <b>3<\/b> /)) != -1)

		{

			GM_setValue("stuned", "3");

		}

		if((cell.innerHTML.search(/stuns you for <b>4<\/b> /)) != -1)

		{

			GM_setValue("stuned", "4");

		}

		var itensavalaibe = true;

		if((cell.innerHTML.search(/Cast <i>Spirit of Growth<\/i>/)) != -1)

		{

			var itensavalaibe = false;

		}

	}

	if(!attack)

	{

		if(GM_getValue("stuned")>0)

		{

			var timeout = setTimeout(function(){GM_setValue("stuned", parseInt(GM_getValue("stuned", "0"))-1); location.href="http://www.neopets.com/games/neoquest/neoquest.phtml?fact=noop" }, REFRESHS);

			GM_log('hmm, diminuido de' + GM_getValue("stuned") + 'para' + parseInt(GM_getValue("stuned", "0"))-1)	;

		}

		if((GM_getValue("stuned")<0) || (GM_getValue("stuned")>5) || (GM_getValue("stuned")==0))

		{

				GM_setValue("stuned", "0")

				var imgpath = document.evaluate("id('content')/table/tbody/tr/td[2]/div[2]/div/div[2]/table/tbody/tr[4]/td[1]/img[1]", document, null, 8, null).singleNodeValue;

				if(imgpath.src=="http://images.neopets.com/nq/n/exp_green.gif")

				{

					if (GM_getValue("flee")==true)

					{

						var timeout = setTimeout(function(){location.href="http://www.neopets.com/games/neoquest/neoquest.phtml?fact=attack" }, REFRESHS);

					}

					if (GM_getValue("flee")==false)

					{

						var timeout = setTimeout(function(){location.href="http://www.neopets.com/games/neoquest/neoquest.phtml?fact=flee" }, REFRESHS);

					}

				}

				if((imgpath.src=="http://images.neopets.com/nq/n/exp_yellow.gif") || (imgpath.src=="http://images.neopets.com/nq/n/exp_red.gif"))

				{

					if(!itensavalaibe)

					{

						var timeout = setTimeout(function(){location.href="http://www.neopets.com/games/neoquest/neoquest.phtml?fact=special&type=200019";}, REFRESHS);

					}

					else

					{

						var timeout = setTimeout(function(){location.href="http://www.neopets.com/games/neoquest/neoquest.phtml?fact=item&type=" + GM_getValue('healingitem') }, REFRESHS);

					}

				}

		}

    }

}

