// ==UserScript==
// @name          Clan Display and Temperature addon for Planets.nu Starmap
// @description   Add Clan, Temperature, and Ownership display added to Map Tools within Planets.nu map
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://play.planets.nu/*
// @include 	   http://*.planets.nu/*
// @include 	   http://planets.nu/*
// @version 1.7
// ==/UserScript==

// 1. Adds new entry to Map Tools list for Clan display
// 2. Add new Clan display function
// 3. Add new display that makes rings at 100, 250, 500, 1000, and 10,000 
// 0.6 updated so Map Tools list is modified instead of rewritten (thanks Big Beefer!)
// 0.7 Changed colors to Blue,Green, or Red depending on planet temperature (thanks mjs68508 for idea!)
// 0.8 Add small circle for 1-99 clans.
// 0.9 Split out temperature into separate listing
// 1.0 Added ownership options
// 1.1 Use ColorMod colors, if active
// 1.2 Updated to work with new urls
// 1.3 Show total Supplies + Money
// 1.4 Updated for new v3 client
// 1.5 Shows Temp, Supplies+Megacredits for new v3 client
// 1.6 Shows SB building potential on your planets (white=built, green=can be built, yellow=missing 1 requirement, red=missing 2, grey=missing 3 or more)
// 1.7 Shows supply, money, and combined money and supplies generation rate

function wrapper () { // wrapper for injection
  
var activeColorMod=false;//default false
var defaultMyColor=false;//default false

var colorsA2 =["#FFFFFF","#006400","#FF0000","#FF69B4","#00FA9A","#6A5ACD","#FFD700","#9400D3","#808080","#00CED1","#4169E1","#7B68EE","#A0522D","#87CEEB","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];


var oldLoadControls = vgapMap.prototype.loadControls;

vgapMap.prototype.loadControls = function () {

    oldLoadControls.apply(this, arguments);  
    if (vgaPlanets.prototype.version<3)
	{
    //$("#MapTools").append("<li class='ShowMinerals' onclick='vgap.map.showClans();'>Clans</li>"); // Can be used to just append to end.  
    $("#MapTools > li:contains('Megacredits')").after("<li class='ShowMinerals' onclick='vgap.map.showClansTemp();'>Clans with Temp</li>"); // Add after megacredits as desired
    $("#MapTools > li:contains('Megacredits')").after("<li class='ShowMinerals' onclick='vgap.map.showClansOwner();'>Clans w/Owner</li>"); // Add after megacredits as desired
	$("#MapTools > li:contains('Megacredits')").after("<li class='ShowMinerals' onclick='vgap.map.showTemp();'>Temperature</li>"); // Add after megacredits as desired
    $("#MapTools > li:contains('Megacredits')").after("<li class='ShowMinerals' onclick='vgap.map.showOwner();'>Ownership</li>"); // Add after megacredits as desired
    $("#MapTools > li:contains('Megacredits')").after("<li class='ShowMinerals' onclick='vgap.map.showSuppliesMoney();'>Supplies & Money</li>"); // Add after megacredits as desired
    $("#MapTools > li:contains('Megacredits')").after("<li class='ShowMinerals' onclick='vgap.map.showSBPotential();'>Starbase Potential</li>"); // Add after megacredits as desired
	$("#MapTools > li:contains('Megacredits')").after("<li class='ShowMinerals' onclick='vgap.map.showSupplyRate();'>Supply Rate</li>"); // Add after megacredits as desired
	$("#MapTools > li:contains('Megacredits')").after("<li class='ShowMinerals' onclick='vgap.map.showMoneyRate();'>Money Rate</li>"); // Add after megacredits as desired
	$("#MapTools > li:contains('Megacredits')").after("<li class='ShowMinerals' onclick='vgap.map.showCombinedRate();'>Combined Rate</li>"); // Add after megacredits as desired
   	checkColorModSettingsForTools();

    var height = this.controls.height() - this.toolsMenu.height();  
    this.controls.css("marginTop", "-" + this.controls.height() + "px");
	}
	else
	{
	 this.addMapTool("Temperature", "ShowMinerals mapclearable", function () { vgap.map.resourceTool(this); vgap.map.showresources = "temp"; vgap.map.draw(); });
	 this.addMapTool("Supplies & MCs", "ShowMinerals mapclearable", function () { vgap.map.resourceTool(this); vgap.map.showresources = "suppliesAndMCs"; vgap.map.draw(); });
	 this.addMapTool("SB Potential", "ShowMinerals mapclearable", function () { vgap.map.resourceTool(this); vgap.map.showresources = "SB Potential"; vgap.map.draw(); });
	 this.addMapTool("Supply Rate", "ShowMinerals mapclearable", function () { vgap.map.resourceTool(this); vgap.map.showresources = "Supply Rate"; vgap.map.draw(); });
	 this.addMapTool("MC Rate", "ShowMinerals mapclearable", function () { vgap.map.resourceTool(this); vgap.map.showresources = "MC Rate"; vgap.map.draw(); });
	 this.addMapTool("Combined Rate", "ShowMinerals mapclearable", function () { vgap.map.resourceTool(this); vgap.map.showresources = "Combined Rate"; vgap.map.draw(); });
	 //this.addMapTool("Megacredits2", "ShowMinerals mapclearable", function () { vgap.map.test(); });
	}
};

vgapMap.prototype.renderResource =  function(ctx) {
		if (this.showresources == "temp")
		{
		for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
			this.drawTempValue2(ctx,this.screenX(planet.x), this.screenY(planet.y), 100, 40,planet.temp,1);
			//this.drawMineralValue(ctx, this.screenX(planet.x), this.screenY(planet.y), amount, density, surface);
			}
		}
		else if (this.showresources == "Supply Rate")
		{
			for (var i = 0; i < vgap.planets.length; i++) {
				var planet = vgap.planets[i];
				if (planet.nativetype==2)
					this.drawTempValue2(ctx,this.screenX(planet.x), this.screenY(planet.y), planet.factories + (planet.nativeclans/100),40, planet.ownerid, 7);
				else
					this.drawTempValue2(ctx,this.screenX(planet.x), this.screenY(planet.y), planet.factories, 40, planet.ownerid, 7);
			}
		}
		else if (this.showresources == "Combined Rate")
		{
			for (var i = 0; i < vgap.planets.length; i++) {
				var planet = vgap.planets[i];
				if (planet.nativetype==2)
					this.drawTempValue2(ctx,this.screenX(planet.x), this.screenY(planet.y), planet.factories + (planet.nativeclans/100)+tax_amount(planet),40, planet.ownerid, 7);
				else
					this.drawTempValue2(ctx,this.screenX(planet.x), this.screenY(planet.y), planet.factories+tax_amount(planet), 40, planet.ownerid, 7);
			}
		}
		else if (this.showresources == "MC Rate")
		{
			for (var i = 0; i < vgap.planets.length; i++) {
				var planet = vgap.planets[i];
				this.drawTempValue2(ctx,this.screenX(planet.x), this.screenY(planet.y), tax_amount(planet), 40, planet.ownerid, 7);
			}
		}
		else if (this.showresources=="suppliesAndMCs")
    	{
            for (var i = 0; i < vgap.planets.length; i++) 
            {
                var planet = vgap.planets[i];
                 var density = 50;
           		 var surface = 0;
				var amount=planet.supplies +planet.megacredits;
           		this.drawMineralValue(ctx, this.screenX(planet.x), this.screenY(planet.y), amount, density, surface);
            }
 	   	}
		else if (this.showresources=="SB Potential")
		{
			for (var i = 0; i < vgap.planets.length; i++) 
			{
				var planet = vgap.planets[i];
				var count=5;
				if (planet.ownerid == vgap.player.id)		
				{
				var starbase = vgap.getStarbase(planet.id);
				if (starbase != null) 
					this.drawTempValue2(ctx,this.screenX(planet.x), this.screenY(planet.y), 100, 40, 0, 6);
				else 
					{
					if ((planet.megacredits+planet.supplies)>=900) count--;
					if (planet.duranium>=120) count--;
					if (planet.tritanium>=402) count--;
					if (planet.molybdenum>=340) count--;
					this.drawTempValue2(ctx,this.screenX(planet.x), this.screenY(planet.y), 100, 40, count, 6);
					}
				}
			}
		}
		else
        for (var i = 0; i < vgap.planets.length; i++) 
		{
            var planet = vgap.planets[i];
            var density = 50;
            var surface = 0;
            var amount = planet[this.showresources];
			if (this.showresources=="suppliesAndMCs")
				amount=planet.supplies +planet.megacredits;
            if (this.showresources == "nativeclans") 
				{
                amount /= 10;
                density = (planet.nativegovernment * 20) / 2;
				}
            else if (this.showresources != "megacredits" && this.showresources != "supplies" && this.showresources != "clans") 
				{
                amount = planet["ground" + this.showresources];
                density = planet["density" + this.showresources];
                surface = planet[this.showresources];
				}
             this.drawMineralValue(ctx, this.screenX(planet.x), this.screenY(planet.y), amount, density, surface);
        }

    };
	
vgapMap.prototype.drawTempValue2 = function(ctx, x, y, ground, density,temp,type)
{
       var density = Math.floor(density / 10 * this.zoom) + 1;
        var stroke = 10 * this.zoom;
        var color;
        var colors = ["red", "RoyalBlue", "green", "purple", "orange", "yellow", "cyan", "olive", "coral", "deeppink", "white", "mediumslateblue", "sienna", "skyblue", "tomato", "wheat", "lightcoral", "darkslategray", "teal", "firebrick", "olive", "mediumpurple", "lime", "indigo", "tan", "yellowgreen", "goldenrod", "aliceblue", "olivedrab", "orangered"];
		if (type==6)
			{
			color="grey";
			if (temp==0) color="white";
			if (temp==1) color="green";
			if (temp==2) color="yellow";
			if (temp==3) color="red";
			}

        if ((type==1) || (type==2)) 
            color= "green";
    
          
        if ((temp >= 85) && ((type==1) || (type==2))) {
            color = "red";
        }
        if (((temp <= 14)&&(temp>=0)) && ((type==1) || (type==2))) {
            color = "blue";
        }
        if ((type==1)||(type==6))
        //temp only
        if ((temp>=0)&&(temp<=100))
		   this.drawCircle(ctx, x, y, 10 * this.zoom, color, density);
		
	if (type==7)
	{
		if (activeColorMod==true)
			color=colorsA2[temp-1];	
		else
			color = colors[temp-1];
		if  (ground>=100) {
			this.drawCircle(ctx,x, y, 10 * this.zoom, color, density);
		}
		if (ground >= 250) {
			this.drawCircle(ctx,x, y, 20 * this.zoom, color, density);
		}
		if (ground >= 500) {
			this.drawCircle(ctx,x, y, 30 * this.zoom, color, density);
		}
		if (ground >= 1000) {
			this.drawCircle(ctx,x, y, 40 * this.zoom, color, density);
		}
		if (ground >= 2500) {
			this.drawCircle(ctx,x, y, 50 * this.zoom, color, density);
		}
		if (ground >= 5000) {
			this.drawCircle(ctx,x, y, 60 * this.zoom, color, density);
		}
	}
};
	
vgapMap.prototype.test = function()
{
var stroke = 10 * this.zoom;
alert("hi" + stroke);
var ctx = this.ctx;
 for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
			var color="green";
			//var density = Math.floor(density / 10 * this.zoom) + 1
			if (planet.temp >= 85) color = "red";
			if ((planet.temp <= 14)&&(planet.temp>=0)) color = "blue";
      		this.drawCircle(ctx, this.screenX(planet.x), this.screenY(planet.y), 20 * this.zoom, color, stroke);
			// drawMineralValue(ctx, this.screenX(planet.x), this.screenY(planet.y), 10, 20, 20);
			}
};

vgapMap.prototype.showSBPotential = function () 
 {
	this.draw();
		for (var i = 0; i < vgap.planets.length; i++) {
		   	var count=5;
			var planet = vgap.planets[i];
			if (planet.ownerid == vgap.player.id)
			{
			var starbase = vgap.getStarbase(planet.id);
            if (starbase != null) 
				this.drawTempValue(planet.x, planet.y, 100, 40, 0, 6);
            else 
				{
				if ((planet.megacredits+planet.supplies)>=900) count--;
				if (planet.duranium>=120) count--;
				if (planet.tritanium>=402) count--;
				if (planet.molybdenum>=340) count--;
				this.drawTempValue(planet.x, planet.y, 100, 40, count, 6);
				}
			}
        }//for loops
 };//showSBPotential

 vgapMap.prototype.showSupplyRate = function () 
 {
 this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
			if (planet.nativetype==2)
				this.drawTempValue(planet.x, planet.y, planet.factories + (planet.nativeclans/100),40, planet.ownerid, 7);
			else
				this.drawTempValue(planet.x, planet.y, planet.factories, 40, planet.ownerid, 7);
        }
 };//showSupplyRate
 
 vgapMap.prototype.showMoneyRate = function () 
 {
 this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
			this.drawTempValue(planet.x, planet.y, tax_amount(planet), 40, planet.ownerid, 7);
        }
 };//showSupplyRate
 
  vgapMap.prototype.showCombinedRate = function () 
 {
 this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
			if (planet.nativetype==2)
				this.drawTempValue(planet.x, planet.y, planet.factories + (planet.nativeclans/100)+tax_amount(planet),40, planet.ownerid, 7);
			else
				this.drawTempValue(planet.x, planet.y, tax_amount(planet)+planet.factories, 40, planet.ownerid, 7);
        }
 };//showSupplyRate
 
vgapMap.prototype.showSuppliesMoney = function () 
 {
 this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            this.drawMineralValue(planet.x, planet.y, planet.megacredits+planet.supplies, 50, 0);
        }
 };//showSuppliesMoney
  

vgapMap.prototype.showClansTemp = function () 
 {
     this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            this.drawTempValue(planet.x, planet.y, planet.clans, 40, planet.temp, 2);
        }//for loops
 };//showClans
  
 vgapMap.prototype.showTemp = function () 
 {
     this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            this.drawTempValue(planet.x, planet.y, 100, 40, planet.temp, 1); //reuse for all planets
        }//for loops
 };//showTemp

    
vgapMap.prototype.showClansOwner = function () 
 {
     this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
                this.drawTempValue(planet.x, planet.y, planet.clans, 40, planet.ownerid, 4);
        }//for loops
 };//showClans

vgapMap.prototype.showOwner = function () 
 {
     this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
                this.drawTempValue(planet.x, planet.y, planet.clans, 40, planet.ownerid, 3);
        }//for loops
 };//showClans
 
vgapMap.prototype.drawTempValue = function (x, y, ground, density, temp, type) {
        var density = Math.floor(density / 10 * this.zoom) + 1;
        var stroke = 10 * this.zoom;
        var color;
        var colors = ["red", "RoyalBlue", "green", "purple", "orange", "yellow", "cyan", "olive", "coral", "deeppink", "white", "mediumslateblue", "sienna", "skyblue", "tomato", "wheat", "lightcoral", "darkslategray", "teal", "firebrick", "olive", "mediumpurple", "lime", "indigo", "tan", "yellowgreen", "goldenrod", "aliceblue", "olivedrab", "orangered"];

		if (type==6)
			{
			color="grey";
			if (temp==0) color="white";
			if (temp==1) color="green";
			if (temp==2) color="yellow";
			if (temp==3) color="red";
			}
        if ((type==1) || (type==2)) 
            color= "green";
    
        if ((type==3)||(type==4)||(type==7))
	{	
	   
	  if (activeColorMod==true)
		color=colorsA2[temp-1];	
	   else
           	color = colors[temp-1];
	}
          
        if ((temp >= 85) && ((type==1) || (type==2))) {
            color = "red";
        }
        if (((temp <= 14)&&(temp>0)) && ((type==1) || (type==2))) {
            color = "blue";
        }
        if (type==1)
        //temp only
        if ((temp>0)&&(temp<100))
        {
           this.drawCircle(x, y, 10 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
        }
    
        if ((type==3)||(type==6))
        //temp only
            this.drawCircle(x, y, 10 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
   
    
    
        if ((type==2) || (type==4))
        //clans and temp
        {
            if  (ground>=0) {
                this.drawCircle(x, y, 10 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
            }
    
            if (ground >= 100) {
                this.drawCircle(x, y, 20 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
            }
            if (ground >= 250) {
                this.drawCircle(x, y, 30 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
            }
            if (ground >= 500) {
                this.drawCircle(x, y, 40 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
            }
            if (ground >= 1000) {
                this.drawCircle(x, y, 50 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
            }
            if (ground >= 10000) {
                this.drawCircle(x, y, 60 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
            }
		}
		if ((type==7))
        //Supply/money rate
        {
            if  (ground>=100) {
                this.drawCircle(x, y, 10 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
            }
    
            if (ground >= 250) {
                this.drawCircle(x, y, 20 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
            }
            if (ground >= 500) {
                this.drawCircle(x, y, 30 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
            }
            if (ground >= 1000) {
                this.drawCircle(x, y, 40 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
            }
            if (ground >= 2500) {
                this.drawCircle(x, y, 50 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
            }
            if (ground >= 5000) {
                this.drawCircle(x, y, 60 * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "1" });
            }
        }
		
};//drawTempValue

tax_amount=function(planet)
{
        var colTax = Math.round(planet.colonisttaxrate * planet.clans / 1000);
		var nativetaxrate = planet.nativetaxrate;
        var player = vgap.getPlayer(planet.ownerid);
        //player tax rate (fed bonus)
        var taxbonus = 1;
        if (vgap.advActive(2)) {
            taxbonus = 2;
        }

        colTax = colTax * taxbonus;

        if (colTax > 5000)
            colTax = colTax;
    
        if (player != null) {
            if (player.raceid == 6 && nativetaxrate > 20)
                nativetaxrate = 20;
        }

        var val = Math.round(nativetaxrate * planet.nativetaxvalue / 100 * planet.nativeclans / 1000);
		var flag=0;//replaces possible
		if (val == planet.clans && vgap.player.raceid != 1 && planet.nativetype != 6)
             flag=1;

        if (((planet.nativetype == 6 && vgap.player.raceid != 1) || (planet.nativetype != 6 && vgap.player.raceid == 1)) && val == (planet.clans * 2))
             flag=1;

        if ((planet.nativetype == 6 && vgap.player.raceid == 1) && val == (planet.clans * 4))
             flag=1;

		
        if (val > planet.clans && (flag==1))
            val = planet.clans;

        //player tax rate (fed bonus)
        var taxbonus = 1;
        if (vgap.advActive(2))
            taxbonus = 2;
        val = val * taxbonus;

        //insectoid bonus
        if (planet.nativetype == 6)
            val = val * 2;

        if (val > 5000)
            val = 5000;

        return (val+colTax);

};

get_cookie =function( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
};


checkColorModSettingsForTools = function(){

	var checkActive=null;
	checkActive=get_cookie("activeColorMod");
	if (checkActive==null)
		{
		activeColorMod=false;//no cookie,  set to default
		}
	else if (checkActive==1)
		{
		activeColorMod=true;
		}
	else 
		{
		activeColorMod=false;
		}

    
	var checkColor=null;
	checkColor=get_cookie("defaultMyColor");
	if (checkColor==null)
		{
		defaultMyColor=true;//no cookie,  set to default
		}
	else if (checkColor==1)
		{
		defaultMyColor=true;
		}
	else 
		{
		defaultMyColor=false;
		}
	

    if (activeColorMod==true)
	//have not checked cookies yet
	{
	var i;
	var checkColor2=null;
	for (i=0;i<30;i++)
		{
		var String="Race"+(i+1);
		checkColor2=get_cookie(String+"A");
		if (checkColor2) colorsA2[i]=checkColor2;
		checkColor2=null;
		}
	} 
};
    
}
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);