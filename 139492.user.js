// ==UserScript==
// @name          Planets.nu Harvest Flags
// @description   Flag planets with enough resources to be worth harvesting (sending a freighter), and re-calibrate the original's drawMineralValue.
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include	  http://play.planets.nu/*
// @homepage      http://planets.nu/discussion/    or something
// @version 	  0.1
// ==/UserScript==


//	This script has four parts: Circle, Box, Bargraph and Star.


function wrapper () 
{

	var oldLoadControls = vgapMap.prototype.loadControls;

	vgapMap.prototype.loadControls = function () 
	{
	    oldLoadControls.apply(this, arguments);  

	    //$("#MapTools").append("<li class='ShowMinerals' onclick='vgap.map.showClans();'>Clans</li>"); // Can be used to just append to end.  
	    $("#MapTools > li:contains('Measure')").after("<li class='ShowMinerals' onclick='vgap.map.checkHarv(1);'>Harv Bargraph</li>"); // Add after megacredits as desired
	    $("#MapTools > li:contains('Measure')").after("<li class='ShowMinerals' onclick='vgap.map.checkHarv(2);'>Harv Box</li>"); // Add after megacredits as desired
	    $("#MapTools > li:contains('Measure')").after("<li class='ShowMinerals' onclick='vgap.map.checkHarv(3);'>Harv Circ</li>"); // Add after megacredits as desired
	    $("#MapTools > li:contains('Measure')").after("<li class='ShowMinerals' onclick='vgap.map.checkHarv(4);'>Harv Star</li>"); // Add after megacredits as desired

	    var height = this.controls.height() - this.toolsMenu.height();  
	    this.controls.css("marginTop", "-" + this.controls.height() + "px");

	};
	
	

	
	vgapMap.prototype.checkHarv = function (cmd)
	{
		this.draw();
		
		sample = "all";  // "short", "my", "all"
		if (sample == "short")
		{	maxplan = 25;
			planset = vgap.myplanets;
		}
		else if	(sample == "my")
		{	maxplan = vgap.myplanets.length;
			planset = vgap.myplanets;
		}
		else if (sample == "all")
		{	maxplan = vgap.planets.length;
			planset = vgap.planets;
		}

		var colN = "red";
		var colD = "#ff6600";
		var colT = "yellow";
		var colM = "#00ff33";
		var colS = "blue";	
		var colTot = "purple";
		var colMC = "red";
		
		var mcCal = 1; // money usually runs higher
		

		
		
		var colCirc ="orange";
		var colShip = "#222222";
		var colGrid = "#999999";
		

		if (cmd == 1  || cmd == 2 || cmd == 3)	//circles, also bar and boxes
		{
			var pencirc = { stroke: colCirc, "stroke-width": 1 * this.zoom, "stroke-opacity": 1 };
			cal==100;

			for (var i = 0; i < maxplan; i++) 
			{	
				var planet = planset[i];
				var starbase = vgap.getStarbase(planet.id);
				
				var tot = planet.duranium + planet.tritanium + planet.molybdenum + planet.supplies;

				if (tot>190) { this.drawCircle(planet.x, planet.y, 13 * this.zoom, pencirc); };
				if (tot>1150)  { this.drawCircle(planet.x, planet.y, 16 * this.zoom, pencirc); };
				if (tot>2500)  { this.drawCircle(planet.x, planet.y, 19 * this.zoom, pencirc); };
				if ((planet.megacredits + planet.supplies) > 1000) { this.drawCircle(planet.x, planet.y, 16 * this.zoom, pencirc); };
			}
		}

		if (cmd == 1)	// bar graph (lines)
		{

			var pengrid = { stroke: colGrid, "stroke-width": 1 , "stroke-opacity": 1 };
			var penship = { stroke: colShip, "stroke-width": 1 , "stroke-opacity": 1 };
			var penN = { stroke: colN, "stroke-width": 3 * this.zoom, "stroke-opacity": 1 };
			var penD = { stroke: colD, "stroke-width": 3 * this.zoom, "stroke-opacity": 1 };
			var penT = { stroke: colT, "stroke-width": 3 * this.zoom, "stroke-opacity": 1 };
			var penM = { stroke: colM, "stroke-width": 3 * this.zoom, "stroke-opacity": 1 };
			var penS = { stroke: colS, "stroke-width": 3 * this.zoom, "stroke-opacity": 1 };
			var penTot = { stroke: colTot, "stroke-width": 3 * this.zoom, "stroke-opacity": 1 };
			var penMC = { stroke: colMC, "stroke-width": 3 * this.zoom, "stroke-opacity": 1 };

			for (var i=0; i < maxplan; i++)
			{
				var planet = planset[i];
				var starbase = vgap.getStarbase(planet.id);

				if (!starbase) 
				{
					var mc  = (planet.megacredits + planet.supplies);				

					x1 = planet.x-10;
					x2 = x1+18;
					y1 = planet.y-10;

					this.drawLine(x1, y1-1, x2, y1-1, penship);			// base line is just below	
				//	this.drawLine(x1, y1+5, x2, y1+5, pengrid);
				//	this.drawLine(x1, y1+10, x2, y1+10, pengrid);
				//	this.drawLine(x1, y1+15, x2, y1+15, pengrid);
				//	this.drawLine(x1, y1+20, x2, y1+20, pengrid);
				//	this.drawLine(x1, y1+25, x2, y1+25, pengrid);
				//	this.drawLine(x1, y1+30, x2, y1+30, pengrid);

					this.drawLine(x1, y1+2, x2, y1+2, penship);
					this.drawLine(x1, y1+12, x2, y1+12, penship);
					this.drawLine(x1, y1+26, x2, y1+26, penship);

					this.drawLine(x1+ 0, y1, x1+ 0, y1+planet.neutronium /cal, penN);
					this.drawLine(x1+ 3, y1, x1+ 3, y1+planet.duranium   /cal, penD);
					this.drawLine(x1+ 6, y1, x1+ 6, y1+planet.tritanium  /cal, penT);
					this.drawLine(x1+ 9, y1, x1+ 9, y1+planet.molybdenum /cal, penM);
					this.drawLine(x1+12, y1, x1+12, y1+planet.supplies   /cal, penS);
				//	this.drawLine(x1+15, y1, x1+15, y1+tot/cal, penTot);					
					this.drawLine(x1+18, y1, x1+18, y1+mc/cal/mcCal , penMC);

				//	this.drawCircle(planet.x, planet.y, this.zoom * 10, pen1);

				}
			}
		}
	
	
		if (cmd==2)	// box
		{
			z=this.zoom;
		//	z = 4;
			cal = 100 ;	// megatons per dot
			w =8;

			var penerase = { stroke: "black", "stroke-width": (w+2)*z , "stroke-opacity": 1 };
			var pengrid = { stroke: colGrid, "stroke-width": 1 , "stroke-opacity": 1 };
			var penship = { stroke: colShip, "stroke-width": 1 , "stroke-opacity": 1 };

	

			for (var i = 0; i < maxplan; i++) 
			{
				var planet = planset[i];
				var starbase = vgap.getStarbase(planet.id);

				if (!starbase)
				{
					var neu = planet.neutronium;
					var dur = planet.duranium;
					var tri = planet.tritanium;
					var mol = planet.molybdenum;
					var sup = planet.supplies;



					// Erase the blocks, then draw ship-size calibration lines
					y = planet.y -w*z/2;
					y1 = y+(2+w)*z/2;
					y2 = y-(2+w)*z/2;
					x = planet.x;

					xmd = x +200 *z/cal;	// no, it doesn't make sense to do sdsf=70
					xlg = x +1200*z/cal;	// line is just after the ship size
					xst = x +2600*z/cal;

					this.drawLine(x-1, y, xst, y, penerase);			

					this.drawLine(x-1, y1 ,x-1, y2, penship);
					this.drawLine(xmd, y1 ,xmd, y2, penship);
					this.drawLine(xlg, y1 ,xlg, y2, penship);
					this.drawLine(xst, y1 ,xst, y2, penship);

					if (true)
					{
						// Broad strokes -- 1 line = cal megatons
						// better rounding rules ?
						
						xd1 = x  +1 + z*dur/cal;
						xt1 = xd1+1 + z*tri/cal;
						xm1 = xt1+1 + z*mol/cal;						
						xs1 = xm1+1 + z*sup/cal;
						

						this.drawLine(x  +1, y, xd1, y, { stroke: colD, "stroke-width": w*z, "stroke-opacity": 1 });
						this.drawLine(xd1+1, y, xt1, y, { stroke: colT, "stroke-width": w*z, "stroke-opacity": 1 });				
						this.drawLine(xt1+1, y, xm1, y, { stroke: colM, "stroke-width": w*z, "stroke-opacity": 1 });								
						this.drawLine(xm1+1, y, xs1, y, { stroke: colS, "stroke-width": w*z, "stroke-opacity": 1 });	
					}
					
					if (false)	// just drawing over -- rounding issues
					{
						// Broad strokes -- 1 line = cal megatons
						// This way has funny rounding rules
						xs1 = x + z*(dur + tri + mol + sup)/cal;
						xm1 = x + z*(dur + tri + mol)/cal;
						xt1 = x + z*(dur + tri)/cal;
						xd1 = x + z*(dur)/cal;

						this.drawLine(x,y,xs1,y, { stroke: colS, "stroke-width": w*z, "stroke-opacity": 1 });
						this.drawLine(x,y,xm1,y, { stroke: colM, "stroke-width": w*z, "stroke-opacity": 1 });				
						this.drawLine(x,y,xt1,y, { stroke: colT, "stroke-width": w*z, "stroke-opacity": 1 });								
						this.drawLine(x,y,xd1,y, { stroke: colD, "stroke-width": w*z, "stroke-opacity": 1 });	
					}

					if (false)
					{
						// Small strokes -- 1 dot = 10 units, going upwards, to add to the broad ones  -- never got working

						ys2 = sup - xs1;
						ym2 = mol - xm1;
						yt2 = tri - xt1;
						yd2 = dur - xd1;

						// bottom edge of ship 
						yb = y-6*z;

						this.drawLine(xs1, yb, xs1,  ys ,{ stroke: colS, "stroke-width": 10*z, "stroke-opacity": 1 });
					}
				}
			}
		}
	
		if (cmd==4)	// stars
		{
			z=this.zoom;
			cal = 100 ;	// megatons per dot
			w =1*z;		// line width
			
			var penship = { stroke: colShip, "stroke-width": 1 , "stroke-opacity": 1 };	
			var pengrid = { stroke: colGrid, "stroke-width": 1 , "stroke-opacity": 1 };
			var penerase = { stroke: "black", "stroke-width": z*10 , "stroke-opacity": 1 };
			


			for (var i = 0; i < maxplan; i++) 
			{	
				var planet = planset[i];
				var starbase = vgap.getStarbase(planet.id);
			
			//	erase the planet's core (trial and error for size here)
			//	draw the calibration curves
			
			//	todo make the calibration lines same colour as planet owner.
				
			//	this.drawLine(planet.x-5*z, planet.y, planet.x+5*z, planet.y, penerase);	
			//	this.drawCircle(planet.x, planet.y, 5*z, penerase);
				
				var tot = planet.duranium + planet.tritanium + planet.molybdenum + planet.supplies;				
				if (tot>500 || (planet.megacredits + planet.supplies)>1000)
				{	this.drawCircle(planet.x, planet.y, 1200*z/cal, pengrid); // cal line at ldsf
				}
				
			/*	this.drawCircle(planet.x, planet.y, 1000*z/cal, pengrid);
				this.drawCircle(planet.x, planet.y, 2000*z/cal, pengrid);
				this.drawCircle(planet.x, planet.y, 3000*z/cal, pengrid);
				this.drawCircle(planet.x, planet.y, 4000*z/cal, pengrid);
				this.drawCircle(planet.x, planet.y, 5000*z/cal, pengrid);
				this.drawCircle(planet.x, planet.y, 6000*z/cal, pengrid);
			/*

				
				/*	

				if (tot>190)	this.drawCircle(planet.x, planet.y, 200*z/cal, penship);
				else		this.drawCircle(planet.x, planet.y, 200*z/cal, pengrid); 
				
				if (tot>1150)	this.drawCircle(planet.x, planet.y,1200*z/cal, penship);
				else		this.drawCircle(planet.x, planet.y,1200*z/cal, pengrid);
				
				if (tot>2500)	this.drawCircle(planet.x, planet.y,2600*z/cal, penship);
				else		this.drawCircle(planet.x, planet.y,2600*z/cal, pengrid);
				*/
				
				var op = 1;
				
				var penN = { stroke: colN, "stroke-width": w , "stroke-opacity": op };
				var penD = { stroke: colD, "stroke-width": w , "stroke-opacity": op };
				var penT = { stroke: colT, "stroke-width": w , "stroke-opacity": op };
				var penM = { stroke: colM, "stroke-width": w , "stroke-opacity": op };
				var penS = { stroke: colS, "stroke-width": w , "stroke-opacity": op };
				var penTot = { stroke: colTot, "stroke-width": w, "stroke-opacity": op };
				var penMC =  { stroke: "pink", "stroke-width":  w, "stroke-opacity": op };
				
				var tot = planet.duranium + planet.tritanium + planet.molybdenum;

				b = planet.neutronium / cal;
				a = Math.sqrt( b*b / 2 );
				this.drawLine(planet.x, planet.y, planet.x-a, planet.y+a, penN);

				a = planet.supplies / cal;
				this.drawLine(planet.x, planet.y, planet.x, planet.y+a, penS);

				
				b = planet.megacredits / cal/mcCal;
				a = Math.sqrt(b*b/2);
				this.drawLine(planet.x+z, planet.y+z, planet.x+a, planet.y+a, penMC);				

				b = planet.duranium/cal;
				a = Math.sqrt(b*b/2);
				this.drawLine(planet.x-z, planet.y-z, planet.x-a, planet.y-a, penD);

				a = planet.tritanium / cal;
				this.drawLine(planet.x, planet.y-z, planet.x, planet.y-a, penT);

				b = planet.molybdenum/cal;
				a = Math.sqrt(b*b/2);
				this.drawLine(planet.x+z, planet.y-z, planet.x+a, planet.y-a, penM);

				a = tot / cal;
				this.drawLine(planet.x-z, planet.y, planet.x-a, planet.y, penTot);

				a = (tot + planet.supplies) / cal;
				this.drawLine(planet.x+z, planet.y, planet.x+a, planet.y, penS);

				

			}
		}
	}
	

};



var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
