// ==UserScript==
// @name        Cyberrepublik Diamond
// @namespace   CyberrepublikGB
// @include     http://www.cyberrepublik.com/*
// @homepage    http://userscripts.org/users/Mertcane
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright   2012, Mertcane (mertcane@gmail.com)
// @version       1
// ==/UserScript==
var battle_id;
var regexi_battle = /var BattleLoopID=(\d*);/;
$('head').html().match(regexi_battle);
battle_id = RegExp.$1;
$('body').prepend('<br /><a onclick="ammo_bas();" id="ammo-bas" href="javascript:void(0)">***ammo Bas!***</a><br />');
document.getElementById('ammo-bas').addEventListener('click', ammo_bas, false);
function ammo_bas(){
function ekle1(){
var arr = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
jQuery.each(arr, function(index, value) {
       console.log(this);
	   	GM_xmlhttpRequest({
  method: "POST",
  url: "http://www.cyberrepublik.com/en/company-marketupdate",
  data: "action=new&license=7242&stock=300&price=50",
  headers: {
					"Content-Type": "application/x-www-form-urlencoded",
                    "Referer": "http://www.cyberrepublik.com/en/company/5536"
                  },
  	onload: function(e) {  }
    
});
       
   });
}
function ekle2(){
var arr = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
jQuery.each(arr, function(index, value) {
       console.log(this);
	   	GM_xmlhttpRequest({
  method: "POST",
  url: "http://www.cyberrepublik.com/en/company-marketupdate",
  data: "action=new&license=7249&stock=20&price=70",
  headers: {
					"Content-Type": "application/x-www-form-urlencoded",
                    "Referer": "http://www.cyberrepublik.com/en/company/5536"
                  },
  	onload: function(e) {  }
    
});
       
   });
}
    
	
	function sil1(){
var arr = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
jQuery.each(arr, function(index, value) {
       console.log(this);
	   	GM_xmlhttpRequest({
  method: "POST",
  url: "http://www.cyberrepublik.com/en/company-marketupdate",
  data: "action=delete&license=7242",
  headers: {
					"Content-Type": "application/x-www-form-urlencoded",
                    "Referer": "http://www.cyberrepublik.com/en/company/5536"
                  },
  	onload: function(e) {  }
    
});
       
   });
}
function sil2(){
var arr = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
jQuery.each(arr, function(index, value) {
       console.log(this);
	   	GM_xmlhttpRequest({
  method: "POST",
  url: "http://www.cyberrepublik.com/en/company-marketupdate",
  data: "action=delete&license=7249",
  headers: {
					"Content-Type": "application/x-www-form-urlencoded",
                    "Referer": "http://www.cyberrepublik.com/en/company/5536
                  },
  	onload: function(e) {  }
    
});
       
   });
}
    
ekle1();
ekle2();
sil1();
sil2();
}