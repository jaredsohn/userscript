// ==UserScript==
// @name           BumRush
// @namespace      BumRush
// @description    BumRush
// @include        http://*.hobowars.com/game/*
// @include        http://hobowars.com/game/*
// ==/UserScript==


	CheckVars();
    //Global Vars
	var args = getArgs(), HoboVersion = CheckGameVersion(), RPSLSSolutionL, RPSLSSolutionT, layout = null, whiteBox, whiteBoxHTML = "", menuBox, configActive = false, respectLevels = [[25000, "Homeless", "Lowlife"], [50000, "Bum", "Delinquent"], [100000, "Freeloader", "Thug"], [200000, "Drifter", "Outcast"], [400000, "Showered", "Addict"], [800000, "Citizen", "Tramp"], [1600000, "Worker", "Criminal"], [3200000, "Medic", "Mental Patient"], [5000000, "Preacher", "Murderer"], [8000000, "Actor", "Hit Man"], [14000000, "Officer", "Mass Murderer"], [20000000, "Peacemaker", "Politician"], [30000000, "John McClane", "Freddy Kreuger"]], uniPuzzle = Array(Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array(1, 1, 1, 1), Array(1, 1, 1, 1));
	var BackButton = "<br><br><center>[<a href=\"#\" onClick=\"history.go(-1)\">Back</a>]</center>";
	//Script Start
	if (setupLayout()) {
        setupConfig();
        if (args.cmd == null || args.cmd == "") {
			if (HoboVersion ==  0) {
				FixMainMenu();
				showNextRespectLevelInfo();
			}
            if (GM_getValue("enable_lockringthrow",true)) {
                lockRingThrow();
            }
            if (GM_getValue("enable_grailprompt",true)) {
                setupGrailPrompt();
            }
        } else if (args.cmd == "food") {
            if (GM_getValue("enable_foodprompt",true)) {
                setupFoodPrompts();
            }
        } else if (args.cmd == "hospital" && args.do == null) {
            if (GM_getValue("enable_hospitalautoheal",false)) {
                doHospitalAutoheal();
            }
		} else if (args.cmd == "hospital" && args.do == "heal") {
			if (GM_getValue("enable_widthdraw")) {
				checkForMoney();
			}
        } else if (args.cmd == "hill") {
            if (args.do == "greg" && GM_getValue("enable_hillautosignup",false)) {
                doSuicideHillAutoSignup();
            } else if (GM_getValue("enable_garageautoback")) {
                doGarageAutoback();
            }
        } else if (args.cmd == "explore" && args.do == "move") {
            if (GM_getValue("enable_cityautoexplore",false)) {
                doCityAutoExplore();
            }
        } else if (args.cmd == "uni") {
		    setupUniversity();
			if (GM_getValue("enable_widthdraw") && args.do != "col" && args.do != null) {
				checkForMoney();
			}
        } else if (args.cmd == "club" && args.do == "buy_food") {
		    //addBackButton1();
		} else if (args.cmd == "bank") {
		    CheckWithdraw();
		} else if (args.cmd == "mart") {
		    SetUpMart();
		} else if (args.cmd == "city_hall" && args.action == "rpsls") {
		    SetUpRPSLS();
		}		
		CheckForRefresh();		
    }	

	function CheckVars() {
		if (GM_getValue("enable_lockringthrow") == null) {
			GM_setValue("enable_lockringthrow", true);
		}
		if (GM_getValue("enable_grailprompt") == null) {
			GM_setValue("enable_grailprompt", true);
		}
		if (GM_getValue("enable_foodprompt") == null) {
			GM_setValue("enable_foodprompt", false);
		}
		if (GM_getValue("enable_hillautosignup") == null) {
			GM_setValue("enable_hillautosignup", false);
		}
		if (GM_getValue("enable_garageautoback") == null) {
			GM_setValue("enable_garageautoback", true);
		}
		if (GM_getValue("enable_hospitalautoheal") == null) {
			GM_setValue("enable_hospitalautoheal", false);
		}
		if (GM_getValue("hospitalautoheal_choice") == null) {
			GM_setValue("hospitalautoheal_choice", 0);
		}
		if (GM_getValue("enable_cityautoexplore") == null) {
			GM_setValue("enable_cityautoexplore", false);
		}
		if (GM_getValue("enable_universitylocktrain") == null) {
			GM_setValue("enable_universitylocktrain", false);
		}
		if (GM_getValue("universitylocktrain_choice") == null) {
			GM_setValue("universitylocktrain_choice", 0);
		}
		if (GM_getValue("university_solved") == null) {
			GM_setValue("university_solved", false);
		}
		if (GM_getValue("university_solving") == null) {
			GM_setValue("university_solving", false);
		}		
		if (GM_getValue("enable_refresh") == null) {
			GM_setValue("enable_refresh",false);
		}
		if (GM_getValue("enable_throwoutrats") == null) {
			GM_setValue("enable_throwoutrats",true);
		}
		if (GM_getValue("value_rattofind") == null) {
			GM_setValue("value_rattofind","Ballerina Rat");
		}
		if (GM_getValue("enable_widthdraw") == null) {
			GM_setValue("enable_widthdraw",false);
		}
		if (GM_getValue("value_lastUrl") == null) {
			GM_setValue("value_lastUrl","");
		}		
		if (GM_getValue("value_explorepath") == null) {
			GM_setValue("value_explorepath","[]");
		}
		if (GM_getValue("value_turnsleft") == null) {
			GM_setValue("value_turnsleft",0);
		}
		if (GM_getValue("enable_removeconfirm") == null) {
			GM_setValue("enable_removeconfirm",false);
		}		
        if (GM_getValue("enable_martwidthdraw") == null) {
			GM_setValue("enable_martwidthdraw",false);
		}
		
		if (GM_getValue("TONGUECHOOSE") == null) {
			GM_setValue("TONGUECHOOSE",0);
		}
		if (GM_getValue("FEETCHOOSE") == null) {
			GM_setValue("FEETCHOOSE",1);
		}
		if (GM_getValue("THUMBCHOOSE") == null) {
			GM_setValue("THUMBCHOOSE",2);
		}
		if (GM_getValue("EARCHOOSE") == null) {
			GM_setValue("EARCHOOSE",3);
		}
		if (GM_getValue("EYESCHOOSE") == null) {
			GM_setValue("EYESCHOOSE",4);
		}
		if (GM_getValue("NOCHOOSE") == null) {
			GM_setValue("NOCHOOSE",5);
		}

		// Rock = 0
		// Paper = 1
		// Scissors = 2
		// Lizard = 3
		// Spock = 4
		// Repeat Last = 5
		// Start Over = 6

	}
	
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
			RPSLSSolutionL = MoveArrayL[GM_getValue("EARCHOOSE")];
			RPSLSSolutionT = MoveArrayT[GM_getValue("EARCHOOSE")];
		}else if(html.indexOf('ground') != -1){
			RPSLSSolutionL = MoveArrayL[GM_getValue("FEETCHOOSE")];
			RPSLSSolutionT = MoveArrayT[GM_getValue("FEETCHOOSE")];
		}else if(html.indexOf('his eyes') != -1){
			RPSLSSolutionL = MoveArrayL[GM_getValue("EYESCHOOSE")];
			RPSLSSolutionT = MoveArrayT[GM_getValue("EYESCHOOSE")];
		}else if(html.indexOf('thumb inside') != -1){
			RPSLSSolutionL = MoveArrayL[GM_getValue("THUMBCHOOSE")];
			RPSLSSolutionT = MoveArrayT[GM_getValue("THUMBCHOOSE")];
		}else if(html.indexOf('his tongue') != -1){
			RPSLSSolutionL = MoveArrayL[GM_getValue("TONGUECHOOSE")];
			RPSLSSolutionT = MoveArrayT[GM_getValue("TONGUECHOOSE")];
		}else {
			if (args.move == null) {
				RPSLSSolutionL = '&action=rpsls';
				RPSLSSolutionT = "Start Over"
			} else {
				RPSLSSolutionL = MoveArrayL[GM_getValue("NOCHOOSE")];
				RPSLSSolutionT = MoveArrayT[GM_getValue("NOCHOOSE")];
			}
		}
		whiteBox.innerHTML = InsertTextAfter(html,"<b>City Hall</b>","<br><br><b>Your best Solution is to " + RPSLSSolutionT + "</b><br><button id=\"RPSLSButton\">Auto Solve</button><br>");
		document.getElementById("RPSLSButton").addEventListener("click", RPSLSClick, false);
	}
	
	function RPSLSClick() {
		GotoCMD("city_hall" + RPSLSSolutionL);
	}
	
	function CheckGameVersion() {
		var Host = window.location.hostname
		if (Host.indexOf("hobowars.com") != -1){
			return 0;
		} else if (Host.indexOf("hobowars.com") != -1){
			return 1;
		}
	}
		
		
	function SetUpMart() {
		if (macroCheck()) {
            return;
        }
		var Widthdraw = GM_getValue("enable_martwidthdraw"),Confirm = GM_getValue("enable_removeconfirm");		
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
		GM_setValue("value_WithdrawAmount",WithdrawAmount);
		lastUrl = window.location.href.replace("?sr=" + args.sr,"?sr=***");
		GM_setValue("value_lastUrl",lastUrl);
		GotoCMD("bank");
	}	
	
	
	function CheckWithdraw() {
		var WithdrawAmount = GM_getValue("value_WithdrawAmount");
		var lastUrl = GM_getValue("value_lastUrl");
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
				GM_setValue("value_WithdrawAmount",0);
				GM_setValue("value_lastUrl","");
			} else {
				if (lastUrl.length > 0) {
					var src = GetCurrentSrc();
					var GotoLoc = lastUrl.replace("?sr=***","?sr=" + src);
					GM_setValue("value_WithdrawAmount",0);
					GM_setValue("value_lastUrl","");
					location.href = GotoLoc;
				}
			}
		}
	}
	
	
	function CheckForRefresh() {
		if (macroCheck()) {
            return;
        }
		if (!GM_getValue("enable_refresh",false)) {
			return;
		}
		var html = document.body.innerHTML;
		if (html.indexOf("This error will continue to appear if you try to refresh.") != -1) {
			var src = GetCurrentSrc();
			location.href = window.location.href.replace("?sr=" + args.sr,"?sr=" + src);
		}
	}

	
	function GotoCMD(CMD) {
		var src = GetCurrentSrc();
		var GotoPath = "http://" + window.location.hostname + window.location.pathname + "?game.php?sr=" + src + "&cmd=" + CMD;
		location.href = GotoPath;
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
	
	
	function addBackButton1() {
		var text = document.body.innerHTML;
		if (text.indexOf("trolly is full") == -1 && text.indexOf("You do not have enough money to buy this") == -1 ) {
			document.body.innerHTML = InsertTextAfter(text,"your trolly.",BackButton);	
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
	
	
    function setupConfig() {
        var a = menuBox.innerHTML.indexOf("</li>");
        if (a == -1) {
            return;
        }
        menuBox.innerHTML = menuBox.innerHTML.substring(0, a + 5) + "<li> <a id=\"BRConfigLink\" href=\"javascript:void(0);\">BumRush</a></li>" + menuBox.innerHTML.substring(a + 5);
        document.getElementById("BRConfigLink").addEventListener("click", displayBRConfiguration, false);
    }


    function displayBRConfiguration() {
        if (configActive) {
            return;
        }
        configActive = true;
        whiteBoxHTML = whiteBox.innerHTML;
		whiteBox.innerHTML = "<span style=\"font-size:30px;color:#0066cc;\">BumRush&nbsp;</span><span style=\"color:#888888;\">Version 2.0</span><br> Original by <a href=\"http://userscripts.org/users/63615/scripts\">qContinuum</a><br>Maintained by Glitchy<br><div align=\"right\">Check <a href=\"http://userscripts.org/scripts/show/51480\">here</a> for the latest version</div><hr style=\"color:#888888;border:2px;border-style:dashed\" /><br class=\"clear\"><h1>Configuration</h1><br class=\"clear\"><br class=\"clear\"><h2>Miscellaneous</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_refresh\"" + ((GM_getValue("enable_refresh") == true) ? " checked=\"checked\"" : "") + ">Anti-Refresh(Revisits Page if you accidentally refresh)</input><br class=\"clear\"><input type=\"checkbox\" id=\"enable_widthdraw\"" + ((GM_getValue("enable_widthdraw") == true) ? " checked=\"checked\"" : "") + ">Auto-withdraw money from bank if you try to train or heal with 0$</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>SuperGlobalHyperMart</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_martwidthdraw\"" + ((GM_getValue("enable_martwidthdraw") == true) ? " checked=\"checked\"" : "") + ">Auto widthdraw money from bank if you dont have enough on hand</input><br class=\"clear\"><input type=\"checkbox\" id=\"enable_removeconfirm\"" + ((GM_getValue("enable_removeconfirm") == true) ? " checked=\"checked\"" : "") + ">Remove confirm box on item buy(Danger of buying the wrong item)</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>Cart</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_foodprompt\"" + ((GM_getValue("enable_foodprompt") == true) ? " checked=\"checked\"" : "") + ">Ask before eating food</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>Exploring</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_cityautoexplore\"" + ((GM_getValue("enable_cityautoexplore") == true) ? " checked=\"checked\"" : "") + ">Automatically Explore City</input><br><input type=\"checkbox\" id=\"enable_throwoutrats\"" + ((GM_getValue("enable_throwoutrats") == true) ? " checked=\"checked\"" : "") + ">Automatically Throw out rats while Auto Exploring</input><br>Keep This rat while auto exploring: <input type=\"text\" id=\"value_rattofind\"/ value=\""+ GM_getValue("value_rattofind") +"\"><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>Hospital</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_hospitalautoheal\"" + ((GM_getValue("enable_hospitalautoheal") == true) ? " checked=\"checked\"" : "") + ">Automatically heal from</input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"radio\" name=\"hospitalautohealchoice\" value=\"0\"" + ((GM_getValue("hospitalautoheal_choice") == 0) ? " checked=\"checked\"" : "") + ">Personal Funds</input>&nbsp;&nbsp;&nbsp;<input type=\"radio\" name=\"hospitalautohealchoice\" value=\"1\"" + ((GM_getValue("hospitalautoheal_choice") == 1) ? " checked=\"checked\"" : "") + ">Gang Funds</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>Living Area</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_lockringthrow\"" + ((GM_getValue("enable_lockringthrow") == true) ? " checked=\"checked\"" : "") + ">Lock ring throw away link</input><br class=\"clear\"><input type=\"checkbox\" id=\"enable_grailprompt\"" + ((GM_getValue("enable_grailprompt") == true) ? " checked=\"checked\"" : "") + ">Ask before using Hobo Grail</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>Suicide Hill</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_hillautosignup\"" + ((GM_getValue("enable_hillautosignup") == true) ? " checked=\"checked\"" : "") + ">Automatically sign up for race when visiting Greg</input><br class=\"clear\"><input type=\"checkbox\" id=\"enable_garageautoback\"" + ((GM_getValue("enable_garageautoback") == true) ? " checked=\"checked\"" : "") + ">Return to garage when modifying/selling and there is no back link</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>University</h2><br class=\"clear\"><input type=\"checkbox\" id=\"enable_universitylocktrain\"" + ((GM_getValue("enable_universitylocktrain") == true) ? " checked=\"checked\"" : "") + ">Lock training to only </input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"radio\" name=\"universitylocktrainchoice\" value=\"0\"" + ((GM_getValue("universitylocktrain_choice") == 0) ? " checked=\"checked\"" : "") + ">Strength</input>&nbsp;&nbsp;&nbsp;<input type=\"radio\" name=\"universitylocktrainchoice\" value=\"1\"" + ((GM_getValue("universitylocktrain_choice") == 1) ? " checked=\"checked\"" : "") + ">Power</input>&nbsp;&nbsp;&nbsp;<input type=\"radio\" name=\"universitylocktrainchoice\" value=\"2\"" + ((GM_getValue("universitylocktrain_choice") == 2) ? " checked=\"checked\"" : "") + ">Intelligence</input>&nbsp;&nbsp;&nbsp;<input type=\"radio\" name=\"universitylocktrainchoice\" value=\"3\"" + ((GM_getValue("universitylocktrain_choice") == 3) ? " checked=\"checked\"" : "") + ">Speed</input><br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>RPSLS</h2><br class=\"clear\"><b>Strategy to use for RPSLS</b><br class=\"clear\"><br class=\"clear\">Choose for TONGUE<br>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"0\"" + ((GM_getValue("TONGUECHOOSE") == 0) ? " checked=\"checked\"" : "") + ">Rock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"1\"" + ((GM_getValue("TONGUECHOOSE") == 1) ? " checked=\"checked\"" : "") + ">Paper</input>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"2\"" + ((GM_getValue("TONGUECHOOSE") == 2) ? " checked=\"checked\"" : "") + ">Scissors</input>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"3\"" + ((GM_getValue("TONGUECHOOSE") == 3) ? " checked=\"checked\"" : "") + ">Lizard</input>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"4\"" + ((GM_getValue("TONGUECHOOSE") == 4) ? " checked=\"checked\"" : "") + ">Spock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"5\"" + ((GM_getValue("TONGUECHOOSE") == 5) ? " checked=\"checked\"" : "") + ">Repeat Last</input>&nbsp;&nbsp;<input type=\"radio\" name=\"TONGUECHOOSE\" value=\"6\"" + ((GM_getValue("TONGUECHOOSE") == 6) ? " checked=\"checked\"" : "") + ">Start Over</input><br class=\"clear\"><br class=\"clear\">Choose for FEET<br class=\"clear\">&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"0\"" + ((GM_getValue("FEETCHOOSE") == 0) ? " checked=\"checked\"" : "") + ">Rock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"1\"" + ((GM_getValue("FEETCHOOSE") == 1) ? " checked=\"checked\"" : "") + ">Paper</input>&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"2\"" + ((GM_getValue("FEETCHOOSE") == 2) ? " checked=\"checked\"" : "") + ">Scissors</input>&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"3\"" + ((GM_getValue("FEETCHOOSE") == 3) ? " checked=\"checked\"" : "") + ">Lizard</input>&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"4\"" + ((GM_getValue("FEETCHOOSE") == 4) ? " checked=\"checked\"" : "") + ">Spock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"5\"" + ((GM_getValue("FEETCHOOSE") == 5) ? " checked=\"checked\"" : "") + ">Repeat Last</input>&nbsp;&nbsp;<input type=\"radio\" name=\"FEETCHOOSE\" value=\"6\"" + ((GM_getValue("FEETCHOOSE") == 6) ? " checked=\"checked\"" : "") + ">Start Over</input><br class=\"clear\"><br class=\"clear\">Choose for THUMB<br class=\"clear\">&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"0\"" + ((GM_getValue("THUMBCHOOSE") == 0) ? " checked=\"checked\"" : "") + ">Rock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"1\"" + ((GM_getValue("THUMBCHOOSE") == 1) ? " checked=\"checked\"" : "") + ">Paper</input>&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"2\"" + ((GM_getValue("THUMBCHOOSE") == 2) ? " checked=\"checked\"" : "") + ">Scissors</input>&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"3\"" + ((GM_getValue("THUMBCHOOSE") == 3) ? " checked=\"checked\"" : "") + ">Lizard</input>&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"4\"" + ((GM_getValue("THUMBCHOOSE") == 4) ? " checked=\"checked\"" : "") + ">Spock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"5\"" + ((GM_getValue("THUMBCHOOSE") == 5) ? " checked=\"checked\"" : "") + ">Repeat Last</input>&nbsp;&nbsp;<input type=\"radio\" name=\"THUMBCHOOSE\" value=\"6\"" + ((GM_getValue("THUMBCHOOSE") == 6) ? " checked=\"checked\"" : "") + ">Start Over</input><br class=\"clear\"><br class=\"clear\">Choose for EAR<br class=\"clear\">&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"0\"" + ((GM_getValue("EARCHOOSE") == 0) ? " checked=\"checked\"" : "") + ">Rock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"1\"" + ((GM_getValue("EARCHOOSE") == 1) ? " checked=\"checked\"" : "") + ">Paper</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"2\"" + ((GM_getValue("EARCHOOSE") == 2) ? " checked=\"checked\"" : "") + ">Scissors</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"3\"" + ((GM_getValue("EARCHOOSE") == 3) ? " checked=\"checked\"" : "") + ">Lizard</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"4\"" + ((GM_getValue("EARCHOOSE") == 4) ? " checked=\"checked\"" : "") + ">Spock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"5\"" + ((GM_getValue("EARCHOOSE") == 5) ? " checked=\"checked\"" : "") + ">Repeat Last</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EARCHOOSE\" value=\"6\"" + ((GM_getValue("EARCHOOSE") == 6) ? " checked=\"checked\"" : "") + ">Start Over</input><br class=\"clear\"><br class=\"clear\">Choose for EYES<br class=\"clear\">&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"0\"" + ((GM_getValue("EYESCHOOSE") == 0) ? " checked=\"checked\"" : "") + ">Rock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"1\"" + ((GM_getValue("EYESCHOOSE") == 1) ? " checked=\"checked\"" : "") + ">Paper</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"2\"" + ((GM_getValue("EYESCHOOSE") == 2) ? " checked=\"checked\"" : "") + ">Scissors</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"3\"" + ((GM_getValue("EYESCHOOSE") == 3) ? " checked=\"checked\"" : "") + ">Lizard</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"4\"" + ((GM_getValue("EYESCHOOSE") == 4) ? " checked=\"checked\"" : "") + ">Spock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"5\"" + ((GM_getValue("EYESCHOOSE") == 5) ? " checked=\"checked\"" : "") + ">Repeat Last</input>&nbsp;&nbsp;<input type=\"radio\" name=\"EYESCHOOSE\" value=\"6\"" + ((GM_getValue("EYESCHOOSE") == 6) ? " checked=\"checked\"" : "") + ">Start Over</input><br class=\"clear\"><br class=\"clear\">		Choose for no hint<br class=\"clear\">&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"0\"" + ((GM_getValue("NOCHOOSE") == 0) ? " checked=\"checked\"" : "") + ">Rock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"1\"" + ((GM_getValue("NOCHOOSE") == 1) ? " checked=\"checked\"" : "") + ">Paper</input>&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"2\"" + ((GM_getValue("NOCHOOSE") == 2) ? " checked=\"checked\"" : "") + ">Scissors</input>&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"3\"" + ((GM_getValue("NOCHOOSE") == 3) ? " checked=\"checked\"" : "") + ">Lizard</input>&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"4\"" + ((GM_getValue("NOCHOOSE") == 4) ? " checked=\"checked\"" : "") + ">Spock</input>&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"5\"" + ((GM_getValue("NOCHOOSE") == 5) ? " checked=\"checked\"" : "") + ">Repeat Last</input>&nbsp;&nbsp;<input type=\"radio\" name=\"NOCHOOSE\" value=\"6\"" + ((GM_getValue("NOCHOOSE") == 6) ? " checked=\"checked\"" : "") + ">Start Over</input><br class=\"clear\"><br class=\"clear\"><center><button id=\"BRConfigOKButton\">Save</button><button id=\"BRConfigCancelButton\">Cancel</button></center><br class=\"clear\"><h1>Other Features</h1><br class=\"clear\"><br class=\"clear\"><h2>Living Area:</h2><br class=\"clear\">- Next respect level and points needed until that level are shown<br class=\"clear\"><br class=\"clear\"><br class=\"clear\"><h2>University:</h2><br class=\"clear\">- Auto-calculation of highest points for current puzzle<br class=\"clear\">- Puzzle solver<br class=\"clear\"><br class=\"clear\"><h1>Updates</h1><br class=\"clear\"><h2>Version 2.0:</h2><br class=\"clear\">- Bug Fixes<br class=\"clear\">- Better Auto Explore<br class=\"clear\">- Anti Refresh Added<br class=\"clear\">- More Exploring Options<br class=\"clear\">- Auto bank withdraw options";
		document.getElementById("BRConfigOKButton").addEventListener("click", saveBRConfiguration, false);
        document.getElementById("BRConfigCancelButton").addEventListener("click", closeBRConfiguration, false);
    }


    function saveBRConfiguration() {
        inputs = whiteBox.getElementsByTagName("input");
        for (var a = 0; a < inputs.length; a++) {
            if (inputs[a].type == "checkbox") {
                GM_setValue(inputs[a].id, inputs[a].checked);
            }
			if (inputs[a].type == "text") {
                GM_setValue(inputs[a].id, inputs[a].value);
            }
        }		
		GM_setValue("hospitalautoheal_choice", getSelectedRadio(document.getElementsByName("hospitalautohealchoice")));
		GM_setValue("universitylocktrain_choice", getSelectedRadio(document.getElementsByName("universitylocktrainchoice")));		
		GM_setValue("TONGUECHOOSE", getSelectedRadio(document.getElementsByName("TONGUECHOOSE")));
		GM_setValue("FEETCHOOSE", getSelectedRadio(document.getElementsByName("FEETCHOOSE")));
		GM_setValue("THUMBCHOOSE", getSelectedRadio(document.getElementsByName("THUMBCHOOSE")));
		GM_setValue("EARCHOOSE", getSelectedRadio(document.getElementsByName("EARCHOOSE")));
		GM_setValue("EYESCHOOSE", getSelectedRadio(document.getElementsByName("EYESCHOOSE")));
		GM_setValue("NOCHOOSE", getSelectedRadio(document.getElementsByName("NOCHOOSE")));				
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
		var lTurns = GM_getValue("value_turnsleft");
		var cTurns = GetTextBetween(text,"left: ","<br>");
		var ExploreArray;
		if (cTurns > lTurns) {
			//This means its a new day
			ExploreArray=new Array();
		} else {
			ExploreArray = eval(GM_getValue("value_explorepath"))
		}
		GM_setValue("value_turnsleft",cTurns);
		
		//Set Current Space As Occuipied
		var ArrayVal = (args.x * 100) + args.y
		ExploreArray[ExploreArray.length] = ArrayVal;
		GM_setValue('value_explorepath', uneval(ExploreArray));	
		
		//time to check if we got any rats
		if (GM_getValue("enable_throwoutrats")) {
			if (text.indexOf("Do you want to keep it?") != -1) {
				//we got a rat
				var FindRat = GM_getValue("value_rattofind")
				if (FindRat.length > 0 && text.toLowerCase().indexOf(FindRat.toLowerCase()) != -1) {
					//This is the rat we want to keep
				} else {
					//Trash Rat Get rid of it
					setTimeout(function () {location.href = DeleteRat;}, Math.floor(Math.random() * 1000));	
					return;
				}
			}	
		}	

		//Do exploreing
		var occupied = 1, Count = 0, rnd;
		while (occupied == 1 && Count < 20)
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
			alert("Something went wrong while trying to auto-explore...");
			return;
		}		
		setTimeout(function () {location.href = rnd;}, Math.floor(Math.random() * 1000));		       
    }


    function doHospitalAutoheal() {
        if (macroCheck()) {
            return;
        }
        var a = document.getElementsByTagName("a");
        for (var b = 0; b < a.length; b++) {
            if (a[b].text == "I need a good healing, heal me to full health..." &&
                GM_getValue("hospitalautoheal_choice",0) == 0) {
                var c = a[b].href;
                setTimeout(function () {location.href = c;}, Math.floor(Math.random() * 1000));
            } else if (a[b].text == "Let my gang cover part of the cost" &&
                GM_getValue("hospitalautoheal_choice",0) == 1) {
                var c = a[b].href;
                setTimeout(function () {location.href = c;}, Math.floor(Math.random() * 1000));
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
            setTimeout(function () {location.href = a + "?sr=" + args.sr + "&cl=" + ((args.cl == "9") ? "1" : parseInt(args.cl) + 1) + "&cmd=hill&do=garage";}, Math.floor(Math.random() * 1000));
        }
    }


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
        var b = whiteBox.innerHTML.indexOf("Respect:") + 4 + whiteBox.innerHTML.substring(whiteBox.innerHTML.indexOf("Respect:")).indexOf("<br>");
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
        whiteBox.innerHTML = whiteBox.innerHTML.substring(0, b) + c + whiteBox.innerHTML.substring(b);
    }


    function addCommas(a) {
        a += "";
        var b = /(\d+)(\d{3})/;
        while (b.test(a)) {
            a = a.replace(b, "$1,$2");
        }
        return a;
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


    function setupUniversity() {
        if (macroCheck()) {
            return;
        }
        loadUniversityPuzzle();
        if (GM_getValue("university_currentpuzzle") != puzzleToString(uniPuzzle)) {
            solveUniversityPuzzle();
        }
        if (GM_getValue("enable_universitylocktrain",false)) {
            lockUniversityTrainLinks();
        }
        showUniversityScore();
        if (whiteBox.innerHTML.indexOf("<center><b><font color=\"red\">you do not have $50 on you.</font></b></center>") != -1 || whiteBox.innerHTML.indexOf("<center><b><font color=\"red\">you do not have 10 t.</font></b></center>") != -1) {
            return;
        }
        if (GM_getValue("university_solving",false) == true) {
            doNextUniversityMove();
        } else {
            showUniversitySolveButton();
        }
    }


    function showUniversityScore() {
        var a = whiteBox.innerHTML.indexOf("Gain: <font");
        if (a == -1 || GM_getValue("university_maxscore") == null) {
            return;
        }
        whiteBox.innerHTML = whiteBox.innerHTML.substring(0, a) + "Max Points: <font size=\"2\" color=\"#006600\">" + GM_getValue("university_maxscore") + "</font><br>" + whiteBox.innerHTML.substring(a);
    }


    function showUniversitySolveButton() {
        var a = whiteBox.innerHTML.indexOf("<br><br>NB! Training costs");
        if (a == -1 || GM_getValue("university_maxscore") == null) {
            return;
        }
        if (getUniversityPuzzleScore() < GM_getValue("university_maxscore")) {
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
                GM_getValue("universitylocktrain_choice",0) != 0) {
                a[b].style.visibility = "hidden";
            }
            if (a[b].href.indexOf("&cmd=uni&do=pow") != -1 &&
                GM_getValue("universitylocktrain_choice",0) != 1) {
                a[b].style.visibility = "hidden";
            }
            if (a[b].href.indexOf("&cmd=uni&do=int") != -1 &&
                GM_getValue("universitylocktrain_choice",0) != 2) {
                a[b].style.visibility = "hidden";
            }
            if (a[b].href.indexOf("&cmd=uni&do=spd") != -1 &&
                GM_getValue("universitylocktrain_choice",0) != 3) {
                a[b].style.visibility = "hidden";
            }
        }
    }


    function universityStartSolve() {
	    GM_setValue("university_solving", true);
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
        if (GM_getValue("university_solution").length == 0) {
            solveUniversityPuzzle();
            showUniversitySolveButton();
            return;
        }
        var d = c[GM_getValue("university_solution").substring(0, 1)];
        if (d.length < 1) {
            solveUniversityPuzzle();
            showUniversitySolveButton();
            return;
        }
        setNextPuzzle(GM_getValue("university_solution").substring(0, 1));
        GM_setValue("university_solution", GM_getValue("university_solution").substring(1));
        setTimeout(function () {location.href = d;}, Math.floor(Math.random() * 1000));
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
        GM_setValue("university_currentpuzzle", puzzleToString(uniPuzzle));
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
        GM_setValue("university_maxscore", bestScore);
        GM_setValue("university_solution", moveString);
        GM_setValue("university_currentpuzzle", puzzleToString(uniPuzzle));
        GM_setValue("university_solving", false);
    }


    function setupLayout() {
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


    function macroCheck() {
        var a = document.getElementsByTagName("img");
        for (var b = 0; b < a.length; b++) {
		    if (a[b].src.indexOf("/captcha.php?") != -1) {
                return true;
            }
        }
        return false;
    }
	
	