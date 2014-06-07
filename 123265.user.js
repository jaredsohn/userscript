// ==UserScript==
// @name          Tszuk
// @namespace     http://diveintogreasemonkey.org/download/
// @description   (Much needed) TribalWars interface improvements.
// ==/UserScript==


/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Notes	: 
	
	TODO	:
____________________________________________________________

Copyright (C) 2010 Dale McKay, all rights reserved
version 1.0, 18 December 2010

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________

*/

function fnFindFarms(config){
	var radius=0.0;
	var barb_size={min:0,max:0};
	var village_size={min:0,max:500};
	
	if(typeof(config)!="undefined"){
		if(typeof(config.radius)!="undefined"){
			radius=config.radius;
		}

		if(typeof(config.barb)!="undefined"){
			barb_size=config.barb;
		}

		if(typeof(config.player)!="undefined"){
			village_size=config.player;
		}
	}
	
	var author="dalesmckay@gmail.com";
	var scriptVer=2.03;
	var minTWVer=7.0;
	var win=(window.frames.length>0)?window.main:window;



	// Check Permissions.
	if(win.game_data.world=='zz2'){
		if([16467].indexOf(parseInt(win.game_data.player.id,10))<0){
			alert('Hi '+win.game_data.player.name+'!\n\nYour scripts have been disabled by dalesmckay\nSend him a mail if you wish to help with testing');
			return false;
		}
	}



	var ver=win.game_data.version.match(/[\d|\.]+/g);
	if(!ver||(parseFloat(ver[1])<minTWVer)){
		alert("This script requires v"+minTWVer+" or higher.\nYou are running: v"+ver[1]);
	}
	else if(win.game_data.screen=="map"){
		function zeroPad(number,length){var n=number.toString();while(n.length<length){n="0"+n;}return n;}
		
		var coords=[];
		var col,row,coord,village,player,tribe,points;
		var home=win.game_data.village.coord.split("|").map(function(x){return parseInt(x,10);});
		
		for(row=0;row<TWMap.size[1];row++){
			for(col=0;col<TWMap.size[0];col++){
				coord=TWMap.map.coordByPixel(
					TWMap.map.pos[0]+(TWMap.tileSize[0]*col),
					TWMap.map.pos[1]+(TWMap.tileSize[1]*row)
				);
				
				if(coord){
					coord=coord.map(function(e){return zeroPad(e,3);});

					village=TWMap.villages[coord.join("")];
					if(village){
						player=null;
						if(parseInt(village.owner||"0",10)){
							player=TWMap.players[village.owner];
						}
						
						points=parseInt(village.points.replace(".",""),10);
						if(player){
							if(player.id!=win.game_data.player.id){
								if((player.ally>0)&&(player.ally!=win.game_data.ally_id)){
									if((!village_size.min||(points>=village_size.min))&&(!village_size.max||(points<=village_size.max))){
										coords.push(coord.join("|"));
									}
								}
							}
						}
						else{
							if((!barb_size.min||(points>=barb_size.min))&&(!barb_size.max||(points<=barb_size.max))){
								coords.push(coord.join("|"));
							}
						}
					}
				}
			}
		}
		
		if(radius>0.0){
			coords=coords.filter(function(item,index,arr){
				var aa=item.split("|").map(function(x){return parseInt(x,10);});
				return(Math.sqrt(Math.pow(home[0]-aa[0],2)+Math.pow(home[1]-aa[1],2))<=radius);
			});
		}
	
		coords=coords.sort(function(a,b){
			var aa=a.split("|").map(function(x){return parseInt(x,10);});
			bb=b.split("|").map(function(x){return parseInt(x,10);});
			return(Math.sqrt(Math.pow(home[0]-aa[0],2)+Math.pow(home[1]-aa[1],2))-Math.sqrt(Math.pow(home[0]-bb[0],2)+Math.pow(home[1]-bb[1],2)));
		});
	
		alert((coords.length>0)?coords.join(" "):"No villages match the Criteria");
	}
	else{
		alert("Run this script from the Map.\nRedirecting now...");
		self.location=win.game_data.link_base_pure.replace(/screen\=/i,"screen=map");
	}
}