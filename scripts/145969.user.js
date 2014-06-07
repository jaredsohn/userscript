// ==UserScript==
// @name           JFARMBOT bb and lc
// @version        2.5.2
// @namespace      (fuckyou)
// @homepage       https://userscripts.org/
// @delay 1000
// @include        *.tribalwars.nl/game.php*
// ==/UserScript==
var farm = false;
var nummer = 2;
var maxafstand = 15; //change value of maxafstand to change the max distance
function filter() {
	start = true;
	var page = 0;
    if (!document.URL.match(/screen=am_farm/)) { location.href = document.URL.split("&",1) + '&screen=am_farm&order=distance&dir=asc&Farm_page=' + page; }
    var div = document.getElementById('am_widget_Farm');
    var td = div.getElementsByTagName('td');
    td[0].innerHTML += '<br>Dorpen waarop al een aanval liep, werd gefilterd.';
	var tr = div.getElementsByTagName('tr');
	

    for (var i = 1; i < td.length; i++) {
        if (td[i].innerHTML.indexOf('<img src="http://cdn2.tribalwars.net/graphic/command/attack.png?901ab') != -1) {
            td[i].parentNode.style.display = 'none';
        }
    } 
	/*farm*/
	
	
	
			function farm(){
				var randomnumber=Math.floor(Math.random()*100)+150;
				var int = this.setInterval(function(){
					while(tr[nummer].style.display == 'none'){
						if(nummer>=27){
							this.clearInterval(int);
							nextPage();
						}
						nummer++;	
					}
					var recordFarm = tr[nummer];
					if(checkTroepen()){
						this.clearInterval(int);
						nextVilla();	
					}
					nummer = nummer + 1;
					if(nummer>=27){
						this.clearInterval(int);
						nextPage();
					}
					if(recordFarm.style.display != 'none'){
            			var farmTD = recordFarm.getElementsByTagName('td');
							
							var afstandtest = farmTD[7].innerHTML.split('.');
							
							if(parseInt(afstandtest) > maxafstand){
								nextVilla();
							}
							var farmknop = farmTD[10].getElementsByTagName('a');
							if(farmknop.length >= 1){
								farmknop[0].click();
							}
							else {
								farmknop = farmTD[9].getElementsByTagName('a');
								farmknop[0].click();	
							}

					}
					}, randomnumber);

			} 
			
			farm();
			
			function nextVilla(){
				var knop = document.getElementById("village_switch_right");
				var link=knop.getAttribute("href");
				var naar = link.lastIndexOf("F");
				link=link.substring(0,naar) + 'Farm_page=0';
				knop.setAttribute("href", link);
				knop.click();
			}
			

			
			
			function nextPage(){
				
				page = parseInt(document.URL.substring(document.URL.length - 1, document.URL.length)) + 1;
				location.href = document.URL.split("&",1) + '&screen=am_farm&order=distance&dir=asc&Farm_page=' + page;	
				
				
				
			}
			/*
			function nextPage() {
				checkTroepen();
       			c = p(location.href.split("=").pop());
				location.href = location.href.replace("page=" + c++, "page=" + c);
			}*/

			
			function checkTroepen(){
				var lc = parseInt(document.getElementById('light').innerHTML);
				var bb = parseInt(document.getElementById('marcher').innerHTML);
				var spy = parseInt(document.getElementById('spy').innerHTML);	
				
				var som = lc + bb;
				if(som<20){
					return true;	
				}
				else if(spy<1){
					return true;	
				}
				else {
					return false;	
				}
			}
} 
			function botProtection(){
				var boteen = document.getElementById('bot_check_error');
				var bottwee = document.getElementById('bot_check_image');
				var botdrie = document.getElementById('bot_check_form');
				var botvier = document.getElementById('bot_check');	
				
				if(boteen == null){
					if(bottwee==null){
						if(botdrie == null){
							if(botvier == null){
							}
							else {botBeschermLiedje();}	
						}
						else {botBeschermLiedje();}
					}
					else {botBeschermLiedje();}
				}
				else {
					botBeschermLiedje();	
				}	
			}
			
			function botBeschermLiedje(){
				location.href = 'http://www.youtube.com/watch?v=D3-vBBQKOYU';
			}
window.onload = function(){
	botProtection();
	filter();    
}