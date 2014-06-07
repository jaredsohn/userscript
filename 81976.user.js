// ==UserScript==
// @name           Unicreatures Component Get
// @namespace      unicreatures
// @description    highlights which creature to click in explore mode for each component
// @version        1.3
// ==/UserScript==
// Written by fluorescent stick with bugfixes by telyni
// Licensed under GPL.

//define index of components
var components = 
["null","watervine","seamelon","bluemaple","riverstone","echoberry","heartwater","watervine","treescent","sunnyseed","echoberry","riverstone","null","auraglass","skypollen","meadowgem","timeshard","timeshard","moonruby","sunnyseed","lifepowder","auraglass","heartwater","seamelon","watervine","bluemaple","whiteroot","skypollen","meadowgem","whiteroot","sunnyseed","lifepowder","whiteroot","echoberry","skypollen","treescent","moonruby","meadowgem","null","null","null","lifepowder","skypollen","sunnyseed","auraglass","whiteroot","echoberry","treescent","lifepowder","riverstone","seamelon","auraglass","moonruby","moonruby","heartwater","lifepowder","echoberry","whiteroot","meadowgem","riverstone","timeshard","moonruby","whiteroot","treescent","bluemaple","meadowgem","moonruby","skypollen","sunnyseed","echoberry","timeshard","whiteroot","bluemaple","auraglass","treescent","moonruby","skypollen","sunnyseed","timeshard","meadowgem","auraglass","skypollen","moonruby","skypollen","treescent","bluemaple","lifepowder","watervine","seamelon","heartwater","riverstone","whiteroot","lifepowder","bluemaple","sunnyseed","meadowgem","echoberry","whiteroot","bluemaple","meadowgem","echoberry","lifepowder","skypollen","timeshard","moonruby","sunnyseed","whiteroot","meadowgem","heartwater","lifepowder","echoberry","auraglass","seamelon","watervine","riverstone","heartwater","riverstone","watervine","seamelon","auraglass","lifepowder","sunnyseed","timeshard","meadowgem","bluemaple","treescent","heartwater","riverstone","watervine","treescent","bluemaple","meadowgem","auraglass","heartwater","skypollen","moonruby","timeshard","skypollen","treescent","timeshard","bluemaple","seamelon","auraglass","skypollen","treescent","sunnyseed","echoberry","auraglass","heartwater","watervine","seamelon","bluemaple","riverstone","timeshard","watervine","skypollen","heartwater","seamelon","watervine","riverstone","seamelon","whiteroot","moonruby","meadowgem","seamelon","watervine","seamelon","echoberry","moonruby","skypollen","bluemaple","whiteroot","heartwater","watervine","seamelon","riverstone","timeshard","moonruby","heartwater","sunnyseed","meadowgem","auraglass","lifepowder","skypollen","treescent","timeshard","watervine","skypollen","echoberry","bluemaple","auraglass","sunnyseed","treescent","bluemaple","echoberry","skypollen","seamelon","riverstone","lifepowder","watervine","riverstone","heartwater","timeshard","whiteroot","treescent","skypollen","moonruby","sunnyseed","treescent","echoberry","lifepowder","heartwater","seamelon","whiteroot","bluemaple","watervine","meadowgem","auraglass","whiteroot","moonruby","sunnyseed","treescent","heartwater","seamelon","timeshard","skypollen","riverstone","lifepowder","echoberry","meadowgem","bluemaple","skypollen","moonruby","auraglass","sunnyseed","whiteroot","echoberry","meadowgem","skypollen","treescent","meadowgem","watervine","moonruby","lifepowder","bluemaple","seamelon","heartwater","watervine","bluemaple","sunnyseed","meadowgem","timeshard","riverstone","treescent","heartwater","echoberry","riverstone","timeshard","moonruby","lifepowder","seamelon","meadowgem","whiteroot","skypollen","watervine","seamelon","riverstone","bluemaple","echoberry","moonruby","lifepowder","sunnyseed","auraglass","whiteroot","auraglass","watervine","riverstone","timeshard","riverstone","heartwater","treescent","sunnyseed","skypollen","timeshard","lifepowder","echoberry","meadowgem","heartwater","watervine","riverstone","seamelon","meadowgem","auraglass","whiteroot","treescent","bluemaple","timeshard","skypollen","sunnyseed","auraglass","moonruby","echoberry","treescent","seamelon","whiteroot","watervine","heartwater","seamelon","moonruby","bluemaple","moonruby","bluemaple","treescent","lifepowder","meadowgem","whiteroot","sunnyseed","timeshard","moonruby","auraglass","echoberry","skypollen","meadowgem","bluemaple","sunnyseed","skypollen","whiteroot","lifepowder","bluemaple","heartwater","auraglass","meadowgem","watervine","bluemaple","echoberry","treescent","lifepowder","watervine","whiteroot","skypollen","treescent","riverstone","echoberry","timeshard","sunnyseed","riverstone","heartwater","watervine","seamelon","heartwater","lifepowder","timeshard","auraglass","moonruby","echoberry","lifepowder","whiteroot","riverstone","sunnyseed","heartwater","bluemaple","meadowgem","skypollen","timeshard","treescent","auraglass","moonruby","bluemaple","whiteroot","echoberry","skypollen","auraglass","heartwater","watervine","seamelon","riverstone","lifepowder","sunnyseed","treescent","meadowgem","treescent","lifepowder","moonruby","meadowgem","riverstone","heartwater","watervine","seamelon"]
var links = document.links;
var strIndex;
var y = 18;
for(y=18;y<document.links.length;y++){
	fullURL = document.links[y].href;
	strIndex = fullURL.search("area");

	if ((strIndex == 36 || strIndex == 40) && fullURL.indexOf("=",45) > 0) {
	//grab the link and extract the id

		var vars = [], hash;
		var hashes = document.links[y].href.slice(document.links[y].href.indexOf('?') + 1).split('&');

		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}

		var thisID = vars["id"];
		var intID = parseInt(thisID);

		if (!(intID > 0)) {
			var thisID = vars["gather"];
			var intID = parseInt(thisID);
			}
		
		//determine which component is dropped by this creature
		var componentText = components[intID];
		
		//determine which element to add the text to and add it
		var changeMe = document.getElementsByTagName("a")[y];
		var componentLabel = document.createElement("div");
		componentLabel.setAttribute('type', 'text/css');
		componentLabel.innerHTML = "<font color=blue>" + String(componentText);
		changeMe.appendChild(componentLabel);
	}
}
