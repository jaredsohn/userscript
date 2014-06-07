// ==UserScript==
// @name           Castle Age Gift English
// @namespace      YACK's Translation
// @include	   https://web3.castleagegame.com/castle_ws/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        1.77
// @description    Castle Age Gift Tool (English)
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// ==/UserScript==

       /*////////////////////////////////////////////////////////*/
      //                    NOTICE:                             //
     /*--------------------------------------------------------*/
    //This script is modified from Neverever's Castle Age Gif //
   //and translated from -Castle Age Gift (YihJie)-          //
  //Thanks to Lord_Fandomar for upkeep                      //
 /*////////////////////////////////////////////////////////*/

var this_url_temp = window.location.href;
var this_url = "https://web3.castleagegame.com/castle_ws/";
var keepGoing= true;
var giftName;
var Eversion = '1.77';

//Send to self gifts
function send(uid, num, gift) {
    if(num && keepGoing) {
        $.post(this_url + "gift_accept.php?act=create&gift=" + gift, {'ids[]': uid}, function() {
            receive(uid, num, gift);
        });
    } else if(!num) {
        document.getElementById("infotastic").innerHTML="<center>Done sending and accepting " + giftName +"!</center>";

    }
}

//Accept own sent gifts
function receive(uid, num, gift) {
    if(num--)
        $.get(this_url + "gift_accept.php?act=acpt&rqtp=gift&uid=" + uid, function() {
            document.getElementById("infotastic").innerHTML="<center>There are <b>" + num + "</b> more " + giftName +" to send...</center>";   
            send(uid, num, gift);
        });
}		
		
		
//button press
function doit(hm){

    var freqs = parseInt(document.getElementById("userFreq").value);
        if(freqs>0 && freqs<81){
            $("<div></div>").load("party.php span.linkwhite a", function() {
                if(/id=(\d+)/.test($(this).children().attr("href"))) {
                    document.getElementById("infotastic").innerHTML="<center>Gathering up " + giftName +"<center>";
                    send(RegExp.$1, freqs,hm);
                } else {
                    document.getElementById("infotastic").innerHTML="<center><b>Cannot find your Castle Age ID</b></center>";
                }
            });
        } else{
            alert("Number of gifts to send from 1 to 80");
        }  
}		
		

//List of gifts
function gift() {
    document.getElementById("results_main_wrapper").innerHTML = '<div class="results" style="background-image: url("https://castleagegame1-a.akamaihd.net/graphics/bg_main_middle.jpg");background-color:#D0B682;width:700px;">'+
					'<div class="result">'+
				'<span class="result_body">				<div style="width:700px;">'+
					'<div style="width:700px;height:25px;background-image:url("https://castleagegame1-a.akamaihd.net/graphics/gift_background.jpg");">'+
					'	<div style="clear:both;"></div>'+
					'	<div style="float:left;width:700px;height:25px;">'+
					'		<div style="width:700px;height:25px;">'+
					'			<div id="infotastic" style="color:#000000;">'+
					               '<center><select id="gift">'+
									   '<option value="0">Gift 0 (Gift Soldiers)</option>'+
					                   '<option value="1">Gift 1 (Magmapede)</option>'+
					                   '<option value="2">Gift 2 (Darkness)</option>'+
					                   '<option value="3">Gift 3 (Mystery Slime)</option>'+
					                   '<option value="4">Gift 4 (Legacy Malekus)</option>'+
					                   '<option value="5">Gift 5 (Legacy Meph)</option>'+
					                   '<option value="6">Gift 6 (Soulstone)</option>'+
					                   '<option value="7">Gift 7 (Dragon Statue)</option>'+
					                   '<option value="8">Gift 8 (Dragon Scroll)</option>'+
					                   '<option value="9">Gift 9 (Mystery Tome)</option>'+
					                   '<option value="10">Gift 10 (Mystery Beast)</option>'+
					                   '<option value="11">Gift 11 (Mystery Symbol)</option>'+
					                   '<option value="12">Gift 12 (Dragon Egg)</option>'+
					                   '<option value="13">Gift 13 (Kilgore)</option>'+
					                   '<option value="14">Gift 14 (Serpent Egg)</option>'+
					                   '<option value="15">Gift 15 (Mystery Air)</option>'+
					                   '<option value="16">Gift 16 (Mystery Cloak)</option>'+
					                   '<option value="17">Gift 17 (Mystery Dagger)</option>'+
					                   '<option value="18">Gift 18 (Mystery Axe)</option>'+
					                   '<option value="19">Gift 19 (Mystery Heirloom)</option>'+
					                   '<option value="20">Gift 20 (Mystery Staff)</option>'+
					                   '<option value="21">Gift 21 (Mystery Shield)</option>'+
					                   '<option value="22">Gift 22 (Mystery Lava)</option>'+
					                   '<option value="23">Gift 23 (Mystery Crest)</option>'+
					                   '<option value="24">Gift 24 (Mystery Plate)</option>'+
					                   '<option value="25">Gift 25 (Great Fiery)</option>'+
					                   '<option value="26">Gift 26 (Volcanic Egg)</option>'+
					                   '<option value="27">Gift 27 (Mystery Ice)</option>'+
					                   '<option value="28">Gift 28 (Mystery Earth)</option>'+
					                   '<option value="29">Gift 29 (Mystery Relic)</option>'+
					                   '<option value="30">Gift 30 (Mystery Item)</option>'+
					                   '<option value="31">Gift 31 (Limited Dragan)</option>'+
					                   '<option value="32">Gift 32 (Mystery Relic)</option>'+
					                   '<option value="33">Gift 33 (Mystery Treasure)</option>'+
					                   '<option value="34">Gift 34 (Mystery Frost)</option>'+
					                   '<option value="35">Gift 35 (Mystery Fire Relic)</option>'+
					                   '<option value="36">Gift 36 (Mystery Heirloom)</option>'+
					                   '<option value="37">Gift 37 (Mystery Blade)</option>'+
					                   '<option value="38">Gift 38 (Mystery Locket)</option>'+
					                   '<option value="39">Gift 39 (Mystery Protection)</option>'+
					                   '<option value="40">Gift 40 (Mystery Relic Terra)</option>'+
					               '</select>'+
					               '&nbsp&nbsp&nbsp&nbsp<input type=\"number\" id=\"userFreq\" min=\"1\" max=\"80\" step=\"1\" value=\"1\" size=\"4\" maxlength=\"2\">'+
					               '&nbsp&nbsp&nbsp&nbsp<button id=\'sendo\'>Send & Accept</button></center>'+
					'			</div>'+
					'		</div>'+
					'	</div>'+
					'	<div style="clear:both;"></div>'+
					'</div>'+
			'	</div>'+
			'	</span>'+
			'</div>'+
			'	</div>'+
		'<br />';

$( "#sendo" ).click(function() {
    var hm =document.getElementById("gift").value;
    var t = document.getElementById('gift');
    giftName = t[t.selectedIndex].innerHTML;
    giftName = "<b>" + giftName.substring(giftName.indexOf("(")+1,giftName.indexOf(")")) + "</b>";
    doit(hm);
});

}

GM_registerMenuCommand('CA Send Gift', gift);
GM_registerMenuCommand('CA Gift EN - Check for update', update_Check );

//Updation of script
function checkUpdate( num, currentVersion ) {
    GM_xmlhttpRequest({
        method : 'GET',
        url    : 'http://userscripts.org/scripts/source/' + num + '.meta.js',
        onload : function( response ) {
            var remoteVersion = response.responseText.match(/^\/\/\s\@version\s+(\d+\.\d+)/m)[1];
            if( currentVersion < remoteVersion ) {
                if( confirm( 'There is a newer version available.' + '\nClick OK to update' ) ) {
                    setTimeout( function() { unsafeWindow.location.href = 'http://userscripts.org/scripts/source/' + num + '.user.js'; }, 3000 );
                }
            }
            else {
                alert('No Updates for Castle Age Gift English');
            }
    }
    });
}


function update_Check() {
    checkUpdate(90873, Eversion);
}