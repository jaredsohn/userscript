// ==UserScript==
// @name           BvS Party House Hotkey
// @namespace      CampSoup1988
// @description    BvS Party House Hotkey
// @include        http://*animecubed.com/billy/bvs/partyhouse.*
// ==/UserScript==

var key = "A";
	
window.addEventListener('keydown', function(e){
	
	if(key=="A"){	////////////////////////MENU COMMANDS////////////////////////
		if(e.keyCode==78&&e.shiftKey){		// Shift+N for Ninja Lounge
			document.forms.namedItem("minim5").wrappedJSObject.submit();
		}
		
		if(e.keyCode==84&&e.shiftKey){		// Shift+T for Tip Line
			document.forms.namedItem("pminim1").wrappedJSObject.submit();
		}

		if (e.keyCode==74&&e.shiftKey){		// Shift+J for Juice Bar
			document.forms.namedItem("pminim2").wrappedJSObject.submit();
		}

		if (e.keyCode==70&&e.shiftKey){		// Shift+F for First Loser
			document.forms.namedItem("pminim3").wrappedJSObject.submit();
		}

		if (e.keyCode==87&&e.shiftKey){		// Shift+W for Party House Wheel
			document.forms.namedItem("pminim4").wrappedJSObject.submit();
		}

		if (e.keyCode==55&&e.shiftKey){		// Shift+7 for Jackpot
			document.forms.namedItem("pminim5").wrappedJSObject.submit();
		}
		/*			DOES NOT WORK!!!
		if (e.keyCode==103&&e.shiftKey){		// Shift+7 for Jackpot (NUM PAD)
			document.forms.namedItem("pminim5").wrappedJSObject.submit();
		}
		*/
		if (e.keyCode==76&&e.shiftKey){		// Shift+L for Lottery
			document.forms.namedItem("pminim6").wrappedJSObject.submit();
		}

		if (e.keyCode==65&&e.shiftKey){		// Shift+A for AKATsukiiBall
			document.forms.namedItem("pminim7").wrappedJSObject.submit();
		}

		if (e.keyCode==66&&e.shiftKey){		// Shift+B for Big Board
			document.forms.namedItem("pminim8").wrappedJSObject.submit();
		}

		if (e.keyCode==83&&e.shiftKey){		// Shift+S for Scratchies
			document.forms.namedItem("pminim9").wrappedJSObject.submit();
		}

		if (e.keyCode==68&&e.shiftKey){		// Shift+D for Darts
			document.forms.namedItem("pminim10").wrappedJSObject.submit();
		}

		if (e.keyCode==80&&e.shiftKey){		// Shift+P for Party Room
			document.forms.namedItem("pminim11").wrappedJSObject.submit();
		}

		if (e.keyCode==67&&e.shiftKey){		// Shift+C for Crane
			document.forms.namedItem("pminim12").wrappedJSObject.submit();
		}

		if (e.keyCode==79&&e.shiftKey){		// Shift+O for Over11k
			document.forms.namedItem("pminim13").wrappedJSObject.submit();
		}

		if (e.keyCode==77&&e.shiftKey){		// Shift+M for Snakeman
				document.forms.namedItem("pminim14").wrappedJSObject.submit();
			}
	}

	if(key=="A"){	////////////////////////Game COMMANDS////////////////////////
	
		if(key=="A"){	//*************Ninja Lounge COMMANDS*********************
								//**********NO COMMANDS*******
		}
		
		if(document.forms.namedItem("tipline")){	//*****Tip Line COMMANDS*****
			if (e.keyCode==72){			// h to hear tip
				document.forms.namedItem("tipline").wrappedJSObject.submit();
			}
		}
		
		if(document.forms.namedItem("br")){			//*****Juice Bar COMMANDS*****
						
			if (e.keyCode==66){			// B for Bruce Special
				var jutsu=document.forms.namedItem("br").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="adrink"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==84){			// T for Terri Twist
				var jutsu=document.forms.namedItem("br").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="bdrink"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==82){			// R for Rack on the Rocks
				var jutsu=document.forms.namedItem("br").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="cdrink"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==87){			// W for Wallflower Special
				var jutsu=document.forms.namedItem("br").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="ddrink"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==67){			// C for Chaser
				var jutsu=document.forms.namedItem("br").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="edrink"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==70){			// F for The Fullmetal
				var jutsu=document.forms.namedItem("br").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="fdrink"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==65){			// A for Aperitif 
				var jutsu=document.forms.namedItem("br").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="gdrink"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==79){			// O for Doughman Daiquiri
				var jutsu=document.forms.namedItem("br").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="hdrink"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==68){			// D for Drain & Tonic
				var jutsu=document.forms.namedItem("br").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="idrink"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==79){			// O for R00t Beer
				var jutsu=document.forms.namedItem("br").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="jdrink"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==90){			// Z for ZombAway
				var jutsu=document.forms.namedItem("br").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="kdrink"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
		
		}
		
		if(document.forms.namedItem("losers")){		//*****First Loser COMMANDS****
								//**********NO COMMANDS*******
		}
		
		if(document.forms.namedItem("raf")){		//********Wheel COMMANDS*******
			if (e.keyCode==83){			// S to Spin the Wheel
				document.forms.namedItem("raf").wrappedJSObject.submit();
				}
			
			if (e.keyCode==66){			// B to Bribe the Wheel
				var jutsu=document.forms.namedItem("raf").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[4].value=="go"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("raf").wrappedJSObject.submit();
			}
		}
	
		if(document.forms.namedItem("ninrou")){		//******Jackpot COMMANDS*******
				
			if (e.keyCode==80){			// P to pull the handle
				document.forms.namedItem("ninrou").wrappedJSObject.submit();
			}
			
			if (e.keyCode==49){			// 1 for line 1
				var jutsu=document.forms.namedItem("ninrou").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].name=="rowone"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==50){			// 2 for line 2
				var jutsu=document.forms.namedItem("ninrou").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].name=="rowtwo"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==51){			// 3 for line 3
				var jutsu=document.forms.namedItem("ninrou").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].name=="rowthree"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==52){			// 4 for line 4
				var jutsu=document.forms.namedItem("ninrou").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].name=="rowfour"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
			if (e.keyCode==53){			// 5 for line 5
				var jutsu=document.forms.namedItem("ninrou").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].name=="rowfive"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
				
		}
	
		if(document.forms.namedItem("el")){			//******Lottery COMMANDS*******
								//**********NO COMMANDS*******
		}
	
		if(document.forms.namedItem("skib")){		//****AkaTsukiBall COMMANDS****
		
			if (e.keyCode==83){			// S to Start the Game
				document.forms.namedItem("skib").wrappedJSObject.submit();
			}
			
			if (e.keyCode==80){			// P to Play it Safe
				var jutsu=document.forms.namedItem("skib").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="low"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("skib").wrappedJSObject.submit();
			}
			
			if (e.keyCode==65){			// A to Aim High
				var jutsu=document.forms.namedItem("skib").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="mid"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("skib").wrappedJSObject.submit();
			}
			
			if (e.keyCode==66){			// S to Bribe the Wheel
				var jutsu=document.forms.namedItem("skib").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="go"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("skib").wrappedJSObject.submit();
			}
			
			if (e.keyCode==71){			// G to Go For Broke
				var jutsu=document.forms.namedItem("skib").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="high"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("skib").wrappedJSObject.submit();
			}
			
			if (e.keyCode==84){			// T to Throw all TsukiBalls
				var jutsu=document.forms.namedItem("skib").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].name=="doemall"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
		}
		
		if(document.forms.namedItem("skic")){		//**AkaTsukiBall Shop COMMANDS*
			if (e.keyCode==80){			// P to Plastic Ninja Stars 
				var jutsu=document.forms.namedItem("skic").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="plastic"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("skic").wrappedJSObject.submit();
			}
			
			if (e.keyCode==68){			// D to Dessicated Candy 
				var jutsu=document.forms.namedItem("skic").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="candy"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("skic").wrappedJSObject.submit();
			}
			
			if (e.keyCode==90){			// Z to Soothing Zebra Puppet 
				var jutsu=document.forms.namedItem("skic").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="zebra"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("skic").wrappedJSObject.submit();
			}
			
			if (e.keyCode==87){			// W to Stuffed Walrus  
				var jutsu=document.forms.namedItem("skic").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="plastic"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("skic").wrappedJSObject.submit();
			}
		
		
		}
		
		if(document.forms.namedItem("mainform4")){	//*****Big Board COMMANDS******
								//**********NO COMMANDS*******
		}
	
		if(document.forms.namedItem("scratch")){	//******Scratchies COMMANDS*****
			if (e.keyCode==66){			// B to buy a standard ticket
				document.forms.namedItem("scratch").wrappedJSObject.submit();
				}
			
			if (e.keyCode==83){			// S to buy a super ticket
				var jutsu=document.forms.namedItem("scratch").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[4].value=="superticket"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("scratch").wrappedJSObject.submit();
			}
		}
	
		if(document.forms.namedItem("dgame")){		//********Darts COMMANDS********

			if (e.keyCode==75){			// K to Kunai
				var jutsu=document.forms.namedItem("dgame").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="Kunai"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("dgame").wrappedJSObject.submit();
			}
			
			if (e.keyCode==83){			// S to Shuriken
				var jutsu=document.forms.namedItem("dgame").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="Shuriken"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("dgame").wrappedJSObject.submit();
			}
			
			if (e.keyCode==80){			// P to Poison Needles
				var jutsu=document.forms.namedItem("dgame").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="Poison Needles"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("dgame").wrappedJSObject.submit();
			}
			
			if (e.keyCode==72){			// H to Holy Arrow
				var jutsu=document.forms.namedItem("dgame").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="Holy Arrow"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("dgame").wrappedJSObject.submit();
			}
			
			if (e.keyCode==69){			// E to Emo Rock CDs
				var jutsu=document.forms.namedItem("dgame").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].name=="Emo Rock CDs"){
						jutsu[i].wrappedJSObject.click();
					}
				}
			}
			
		}
	
		if(document.forms.namedItem("pr")){			//*****Party Room COMMANDS******

			if (e.keyCode==75){			// K to Karaoke
				var jutsu=document.forms.namedItem("pr").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="Karaoke"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("pr").wrappedJSObject.submit();
			}
			
			if (e.keyCode==82){			// R to 'Research' Expedition
				var jutsu=document.forms.namedItem("pr").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="Research"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("pr").wrappedJSObject.submit();
			}
			
			if (e.keyCode==65){			// A to All-Out Bash
				var jutsu=document.forms.namedItem("pr").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="Bash"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("pr").wrappedJSObject.submit();
			}
			
		}
		
		if(document.forms.namedItem("cgame")){		//*******Crane COMMANDS*********

			if (e.keyCode==83){			// S to Super Hard
				var jutsu=document.forms.namedItem("cgame").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="4"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("cgame").wrappedJSObject.submit();
			}
			
			if (e.keyCode==72){			// H to Hard
				var jutsu=document.forms.namedItem("cgame").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="3"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("cgame").wrappedJSObject.submit();
			}
			
			if (e.keyCode==77){			// M to Medium
				var jutsu=document.forms.namedItem("cgame").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="2"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("cgame").wrappedJSObject.submit();
			}
			
			if (e.keyCode==69){			// E to Easy
				var jutsu=document.forms.namedItem("cgame").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="1"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("cgame").wrappedJSObject.submit();
			}	
			
		}
		
		if(document.forms.namedItem("over11")){		//******Over 11k COMMANDS*******

			if (e.keyCode==79){			// O to buy One Entry
				var jutsu=document.forms.namedItem("over11").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="one"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("over11").wrappedJSObject.submit();
			}
			
			if (e.keyCode==69){			// E to buy Eleven Entries
				var jutsu=document.forms.namedItem("over11").elements;
				for(var i=0; i<jutsu.length; i++){
					if(jutsu[i].value=="eleven"){
						jutsu[i].wrappedJSObject.click();
					}
				}
				document.forms.namedItem("over11").wrappedJSObject.submit();
			}	
		}
		
	}
			
		
	}, false);
	
	window.addEventListener("keydown", process_event, false);