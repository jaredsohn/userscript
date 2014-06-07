// ==UserScript==
// @name        Castle Age Gift Trading
// @namespace   Gift Trading
// @description Accept friend's gift and resend the same gift back
// @include     https://web3.castleagegame.com/castle_ws/*
// @exclude     https://web3.castleagegame.com/castle_ws/connect_login.php
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version     0.04
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest

// ==/UserScript==

var Eversion = '0.04';
var str;
var acceptLink = [];
var senderID = [];
var senderName = [];
var itemName = [];
var idForGift = [];
var current = 0;
var accepted = "";
var giftNames   = [
            'Alperon Gift!',
			'Corrupted Gift!',
			'Magamapede Gift!',
			'Darkness Gift!',
			'Mystery Slime Gift!',
			'Soulstone Gift!',
			'Legacy Meph Gift!',
			'Legacy Malekus Gift!',
			'Limited Lione Set!',
			'Limited Garlan Relic!',
			'Mystery Artifact!',
			'Dragon Scroll Gift!',
			'Dragon Statue Gift!',
			'Mystery Beast Gift!',
			'Mystery Air Gift!',
			'Mystery Lava Gift!',
			'Mystery Crest Piece!',
			'Volcanic Egg!',
			'Mystery Ice Artifact!',
			'Mystery Earth!',
			'Mystery Shield Gift!',
			'Mystery Amulet!',
			'Mystery Symbol Gift!',
			'Mystery Staff Gift!',
			'Mystery Item!',
			'Mystery Tome!',
			'Mystery Relic!',
			'Mystery Robe Gift!',
			'Mystery Gift!',
			'Limited Cid Gift!',
			'Mystery Faerie Gift!',
			'Mystery Shield Gift!',
			'Mystery Blade Gift!',
			'Bloodblade Shard!',
			'Mystery Life Gift!',
			'Great Fiery Gift!',
			'Mystery Shadow Gift!',
			'Mystery Heirloom!',
			'Serpent Egg!',
			'Mystical Dagger Gift!',
			'Mystery Locket Gift!',
			'Mystery Relic!',
			'Mystery Axe Gift!',
			'Mystery Shield Gift!',
			'Mystery Plate Gift!',
			'Dragon Egg!',
			'Cid Saber Shard!',
			'Mystery Dagger Gift!',
			'Crimson Dagger Gift!',
			'Mystery Light Relic!',
			'Limited Dragan Gift!',
			'Mystery Cloak Gift!',
 		         ];
var giftID = [
 			'2052',
			'2051',
			'2050',
			'2049',
			'2048',
			'2047',
			'2046',
			'2045',
			'2044',
			'2043',
			'2042',
			'2041',
			'2040',
			'2039',
			'2038',
			'2037',
			'2036',
			'2035',
			'2034',
			'2033',
			'2032',
			'2031',
			'2030',
			'2029',
			'2028',
			'2027',
			'2026',
			'2025',
			'2024',
			'2023',
			'2022',
			'2021',
			'2020',
			'2019',
			'2018',
			'2017',
			'2016',
			'2015',
			'2014',
			'2013',
			'2012',
			'2011',
			'2010',
			'2009',
			'2008',
			'2007',
			'2006',
			'2005',
			'2004',
			'2003',
			'2002',
			'2001',
 		      ];

function check(){
    str = "";
    acceptLink = [];
    senderID = [];
    senderName = [];
    itemName = [];
    idForGift = [];
    current = 0;
    accepted = "";
    $.get("https://web3.castleagegame.com/castle_ws/news_feed_view.php?feed=allies", function(data,status){
        if(/You received a Gift!/.test(data)) {
            str = data;
            saveSender();
        }else{
            document.getElementById("results_main_wrapper").innerHTML = '<div class="results" style="background-image: url("https://castleagegame1-a.akamaihd.net/graphics/bg_main_middle.jpg");background-color:#D0B682;width:700px;">'+
					'<div class="result">'+
				'<span class="result_body">				<div style="width:700px;">'+
					'<div style="width:700px;height:20px;background-image:url("https://castleagegame1-a.akamaihd.net/graphics/gift_background.jpg");">'+
					'	<div style="clear:both;"></div>'+
					'	<div style="float:left;width:700px;height:20px;">'+
					'		<div style="width:700px;height:20px;">'+
					'			<div style="font-weight:bolder;color:#000000;">'+
					'				<center>You got no gifts to accept.</center>'+
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
		//alert("No one sent you a gifts.");
        }
    });
}


function saveSender(){
    if(/You received a Gift!/.test(str)){
        var accLink = str.substring(str.indexOf("index.php?feed=allies&news_feed_accept=1&sender_id="));
        acceptLink.push("https://web3.castleagegame.com/castle_ws/" + accLink.substring(0,accLink.indexOf('" onclick=')))
        str = str.substring(str.indexOf("index.php?feed=allies&news_feed_accept=1&sender_id=")+51);
        senderID.push(str.substring(0, str.indexOf("&")));
        str = str.substring(str.indexOf('<div style="width:275px;text-align:center;">'));
        senderName.push($.trim(str.substring(44, str.indexOf("has sent you a"))));
        str = str.substring(str.indexOf("has sent you a ")+15);
        itemName.push($.trim(str.substring(0, str.indexOf("</div>"))));
        saveSender();
    }else{
        acceptGift();
    }
}

function acceptGift(){
    if(current < senderID.length){
        document.getElementById("results_main_wrapper").innerHTML = '<div class="results" style="background-image: url("https://castleagegame1-a.akamaihd.net/graphics/bg_main_middle.jpg");background-color:#D0B682;width:700px;">'+
					'<div class="result">'+
				'<span class="result_body">				<div style="width:700px;">'+
					'<div style="width:700px;height:20px;background-image:url("https://castleagegame1-a.akamaihd.net/graphics/gift_background.jpg");">'+
					'	<div style="clear:both;"></div>'+
					'	<div style="float:left;width:700px;height:20px;">'+
					'		<div style="width:700px;height:20px;">'+
					'			<div style="color:#000000;">'+
					'				<center>Accepting <b>' + itemName[current] + '</b> from ' + senderName[current] +'...</center>'+
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
        $.post(acceptLink[current], function(data,status){
            if(/You have accepted the gift:/.test(data)) {
                var gift = data.substring(data.indexOf("You have accepted the gift:")+27);
                gift = $.trim(gift.substring(0,gift.indexOf(".<br/>")));
                accepted += "You got <b>" + itemName[current] + "</b> - " + gift + " - from " + senderName[current] +".<br/>";
                setTimeout( function() { current++; acceptGift();}, 3000); 
            }
        });
    }else{
        current = 0;
        findGiftID();
    }
}

                
function findGiftID(){
    for(var i = 0; i < itemName.length; i++){
        for(var k = 0; k < giftNames.length; k++){
            if(itemName[i] == giftNames[k]) 
                idForGift[i] = k;
        }
    }
    giftBack();
}

function giftBack(){
    if(current < itemName.length){
        document.getElementById("results_main_wrapper").innerHTML = '<div class="results" style="background-image: url("https://castleagegame1-a.akamaihd.net/graphics/bg_main_middle.jpg");background-color:#D0B682;width:700px;">'+
					'<div class="result">'+
				'<span class="result_body">				<div style="width:700px;">'+
					'<div style="width:700px;height:20px;background-image:url("https://castleagegame1-a.akamaihd.net/graphics/gift_background.jpg");">'+
					'	<div style="clear:both;"></div>'+
					'	<div style="float:left;width:700px;height:20px;">'+
					'		<div style="width:700px;height:20px;">'+
					'			<div style="color:#000000;">'+
					'				<center>Returning the favor to ' + senderName[current] + ' with <b>' + itemName[current] + '</b>....</center>'+
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
        $.post('https://web3.castleagegame.com/castle_ws/gift.php?selected_army%5B%5D=' + senderID[current] + '&action=send_non_facebook_gift&giftSelection=' + giftID[idForGift[current]], function(data,status){   
            if(/You have sent /.test(data)) {
                accepted += "You sent <b>" + itemName[current] + "</b> to " + senderName[current] +".<br/>";
                setTimeout( function() { current++; giftBack();}, 3000); 
            }
        });
    }
    else {
        document.getElementById("results_main_wrapper").innerHTML = '<div class="results" style="background-image: url("https://castleagegame1-a.akamaihd.net/graphics/bg_main_middle.jpg");background-color:#D0B682;width:700px;">'+
					'<div class="result">'+
				'<span class="result_body">				<div style="width:700px;">'+
					'<div style="width:700px;height:'+40*senderID.length+'px;background-image:url("https://castleagegame1-a.akamaihd.net/graphics/gift_background.jpg");">'+
					'	<div style="clear:both;"></div>'+
					'	<div style="float:left;width:700px;height:'+40*senderID.length+'px;">'+
					'		<div style="width:700px;height:'+40*senderID.length+'px;">'+
					'			<div style="color:#000000;">'+
					'				<center>'+ accepted +'</center>'+
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
        //alert(accepted);
    }
    
}

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
                alert('No Updates for CA - Gift Trading');
            }
    }
    });
}


function update_Check() {
    checkUpdate(187386, Eversion);
}

GM_registerMenuCommand('Accept and Return Gifts', check);
GM_registerMenuCommand('CA Gift Trade - Check for Updates', update_Check );