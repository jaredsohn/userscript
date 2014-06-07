// ==UserScript==
// @name           LoU Attack
// @description    LoU Attack Scheduler
// @namespace      http://*.lordofultima.com/*/index.aspx
// @include        http://*.lordofultima.com/*/index.aspx
// @version        2.1.6
// ==/UserScript==

(function(){

	var scriptContent = function() {
	
		LoUAttack = function () {}

		var bossSettings = null;
		var attackSettings = null;
		var curCityId = -1;
		var atkRealGroup;
		var atkFakeGroup;
		var attackArray = new Array();
		var attackCounter = null;
		var tPlayer = new Array();
		intelOsCityArray = new Array();
		RealUnitCount = new Array();
		
		// Raidzorz objects
		raidProgressionToUse = null;
		var raidUnitDrop = null;
		var raidUnitDrop2 = null;
		var raidDungeonLoot = null;
		var raidNumRaids = null;
		var raidNumUnits = null;
		var raidNumUnits2 = null;
		var raidNumTroops = null;
		
		// Initialisation routine
		LoUAttack.prototype.init = function() {		
			var warMin = webfrontend.data.Player.getInstance().getMinisterMilitaryPresent();
			if (warMin) {				
				// Raid Button
				var raidButton = new qx.ui.form.Button("Raidzorz");
				raidButton.set({width:100, height:32});
				raidButton.addListener("click", ShowRaidScheduler, false);
				qx.core.Init.getApplication().dungeonDetailView.actionArea.add(raidButton, {left:115, top: 74});
				
				// Attack Button
				var attackButton = new qx.ui.form.Button("Kill");
				attackButton.set({width: 25, appearance: "button-text-small", toolTipText: "Click to schedule attacks."});
				attackButton.addListener("click", ShowAttackScheduler, false);
				qx.core.Init.getApplication().cityInfoView.buildingQueue.header.add(attackButton, {top: 33, left: 38});
			}
			
			// Intel Button
			qx.core.Init.getApplication().getCityInfoPage();
			var intelOsButton = new qx.ui.form.Button("Os It!");
			intelOsButton.set({appearance: "button-text-small", toolTipText: "Create an intel report"});
			intelOsButton.addListener("click", intelCreateOsReport, intelOsButton);
			qx.core.Init.getApplication().cityInfoPage.add(intelOsButton, {top: 3, right: 60});
			
			player = webfrontend.data.Player.getInstance(); py = player;
			server = webfrontend.data.Server.getInstance();
			commands = webfrontend.net.CommandManager.getInstance();
			city = webfrontend.data.City.getInstance();
		   
			} // init
		
		function ShowRaidScheduler () {
			var dDetailView = qx.core.Init.getApplication().dungeonDetailView;
			var dDungeonLevel = dDetailView.city.get_Level();
			var dDungeonProgress = dDetailView.city.get_Progress();
			var dDungeonType = dDetailView.city.get_Type();
			var iRecommendedUnits = 0;
			var iDungeonLoot = 0;
			
			targetDungeon = null;
			raidSettings = new webfrontend.gui.OverlayWidget();
			raidSettings.clientArea.setLayout(new qx.ui.layout.VBox());
			raidSettings.setTitle("War Minister Raid Scheduler - Version 2.1.6");
			raidSettings.addListener("appear", raidOpen, this);
			raidSettings.addListener("disappear", raidClose, this);
			var raidPage1 = raidSettings.clientArea;
			
			did = dDetailView.city.get_Coordinates(); posX = did & 0xFFFF; posY = did >> 16;
			
			// Go Button
			var cntRaid1 = new qx.ui.container.Composite(new qx.ui.layout.Basic());
			
			var raidButtonArea = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			goButton = new qx.ui.form.Button("Raid").set({width:120});
			goButton.addListener("click", function(){ScheduleRaid_Click();qx.core.Init.getApplication().switchOverlay(null);}, false);
			
			// Calculate Button
			raidCalculateButton = new qx.ui.form.Button("Calculate").set({width:120});
			raidCalculateButton.addListener("click", SetCalculatedValues, false);
			
			raidButtonArea.add(goButton)
			raidButtonArea.add(new qx.ui.core.Spacer(30));
			raidButtonArea.add(raidCalculateButton);
			cntRaid1.add(raidButtonArea, {left:10});			
			
			// Dungeon Loot
			var raidDungeonLootLabel = new qx.ui.basic.Label("Calculated Loot").set({width:85});
			var colDungeonLoot = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			raidDungeonLoot = new qx.ui.basic.Label("").set({width:85});
			
			colDungeonLoot.add(raidDungeonLootLabel);
			colDungeonLoot.add(new qx.ui.core.Spacer(30));
			colDungeonLoot.add(raidDungeonLoot);
			
			// Dungeon Coords
			var raidDungeonLabel = new qx.ui.basic.Label("Dungeon Coords").set({width:85});
			var colTargetDungeon = new qx.ui.container.Composite(new qx.ui.layout.HBox());		
			raidTargetDungeon = new qx.ui.form.TextField(posX + ":" + posY).set({ maxLength: 7 });
			
			colTargetDungeon.add(raidDungeonLabel);
			colTargetDungeon.add(new qx.ui.core.Spacer(30));
			colTargetDungeon.add(raidTargetDungeon);
			
			// Progression To and Distribution
			var raidProgressionToUseLabel = new qx.ui.basic.Label("Progression To").set({width:85});
			var colProgressionToUse = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			raidProgressionToUse = new qx.ui.form.TextField("50").set({maxLength: 3 });
			
			var raidDistributionLabel = new qx.ui.basic.Label("Even Dist").set({width:65});
			raidDistribution = new qx.ui.form.SelectBox();
			raidDistribution.setWidth(60);
			raidDistribution.setHeight(25);
			raidDistribution.setToolTipText("Choose whether or not to evenly distribute troops.");
			raidDistribution.add(new qx.ui.form.ListItem("Yes",null,0));
			raidDistribution.add(new qx.ui.form.ListItem("No",null,1));
			
			colProgressionToUse.add(raidProgressionToUseLabel);
			colProgressionToUse.add(new qx.ui.core.Spacer(30));
			colProgressionToUse.add(raidProgressionToUse);
			colProgressionToUse.add(new qx.ui.core.Spacer(30));
			colProgressionToUse.add(raidDistributionLabel);
			//colProgressionToUse.add(new qx.ui.core.Spacer(10));
			colProgressionToUse.add(raidDistribution);
			
			// Number of Raids
			var raidNumRaidsLabel = new qx.ui.basic.Label("# of Raids").set({width:85});
			var colNumRaids = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			raidNumRaids = new qx.ui.form.TextField("1").set({maxLength: 2 });
			
			colNumRaids.add(raidNumRaidsLabel);
			colNumRaids.add(new qx.ui.core.Spacer(30));
			colNumRaids.add(raidNumRaids);
			
			// Time offset
			var raidTimeOffsetLabel = new qx.ui.basic.Label("Offset Minutes").set({width:85});
			var colRaidOffset = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			raidTimeOffsetDrop = new qx.ui.form.SelectBox();
			raidTimeOffsetDrop.setWidth(50);
			raidTimeOffsetDrop.setHeight(29);
			raidTimeOffsetDrop.setToolTipText("Select the amount of time between raids. 0 sends all now.");
			
			raidTimeOffsetDrop.add(new qx.ui.form.ListItem("0",null,0));
			raidTimeOffsetDrop.add(new qx.ui.form.ListItem("15",null,15));
			raidTimeOffsetDrop.add(new qx.ui.form.ListItem("30",null,30));
			raidTimeOffsetDrop.add(new qx.ui.form.ListItem("45",null,45));
			raidTimeOffsetDrop.add(new qx.ui.form.ListItem("60",null,60));
			raidTimeOffsetDrop.add(new qx.ui.form.ListItem("75",null,75));
			raidTimeOffsetDrop.add(new qx.ui.form.ListItem("90",null,90));
			
			colRaidOffset.add(raidTimeOffsetLabel);
			colRaidOffset.add(new qx.ui.core.Spacer(30));
			colRaidOffset.add(raidTimeOffsetDrop);
			
			// Unit Type 1
			var raidUnitLabel = new qx.ui.basic.Label("Unit Type").set({width:85});
			var colRaid1 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			raidUnitDrop = new qx.ui.form.SelectBox();
			raidUnitDrop.setWidth(150);
			raidUnitDrop.setHeight(29);
			raidUnitDrop.setToolTipText("Select the type of unit to send on the raid");

			colRaid1.add(raidUnitLabel);
			colRaid1.add(new qx.ui.core.Spacer(25));
			colRaid1.add(raidUnitDrop);

			// Unit Type 2
			var raidUnitLabel2 = new qx.ui.basic.Label("Unit Type 2").set({width:85});
			var colRaid2 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			raidUnitDrop2 = new qx.ui.form.SelectBox();
			raidUnitDrop2.setWidth(150);
			raidUnitDrop2.setHeight(29);
			resetRaidUnits(raidUnitDrop, raidUnitDrop2);
			raidUnitDrop2.setToolTipText("Select the type of unit to send on the raid");

			colRaid2.add(raidUnitLabel2);
			colRaid2.add(new qx.ui.core.Spacer(25));
			colRaid2.add(raidUnitDrop2);
			
			// Unit Count
			var raidNumUnitsLabel1 = new qx.ui.basic.Label("Units per Raid").set({ width:85});
			var colRaidTroops1 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			colRaidTroops1.setAlignY("middle");

			raidNumUnits = new qx.ui.form.TextField("0").set({ maxLength: 6});

			colRaidTroops1.add(raidNumUnitsLabel1);
			colRaidTroops1.add(new qx.ui.core.Spacer(25));
			colRaidTroops1.add(raidNumUnits);

			// Unit Count 2
			var raidNumUnitsLabel2 = new qx.ui.basic.Label("Units per Raid").set({ width:85});
			var colRaidTroops2 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			colRaidTroops2.setAlignY("middle");

			raidNumUnits2 = new qx.ui.form.TextField("0").set({ maxLength:6});

			colRaidTroops2.add(raidNumUnitsLabel2);
			colRaidTroops2.add(new qx.ui.core.Spacer(25));
			colRaidTroops2.add(raidNumUnits2);
			
			// Number of troops
			var raidNumTroopsLabel = new qx.ui.basic.Label("Total # of Troops").set({width:85});
			raidNumTroops = new qx.ui.basic.Label("0").set({width:85});
			var colNumTroops = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			
			colNumTroops.add(raidNumTroopsLabel)
			colNumTroops.add(new qx.ui.core.Spacer(30));
			colNumTroops.add(raidNumTroops);

			// Add to Group - Left side of widget
			var raidTroopRow = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			var raidRaidGroup = new qx.ui.groupbox.GroupBox("Raidzorz");
			raidRaidGroup.setLayout(new qx.ui.layout.VBox());

			raidRaidGroup.add(colDungeonLoot);
			raidRaidGroup.add(new qx.ui.core.Spacer(0,10));
			raidRaidGroup.add(colTargetDungeon);
			raidRaidGroup.add(new qx.ui.core.Spacer(0,10));
			raidRaidGroup.add(colProgressionToUse);
			raidRaidGroup.add(new qx.ui.core.Spacer(0,10));
			raidRaidGroup.add(colNumRaids);
			raidRaidGroup.add(new qx.ui.core.Spacer(0,10));
			raidRaidGroup.add(colRaidOffset);
			raidRaidGroup.add(new qx.ui.core.Spacer(0,10));
			raidRaidGroup.add(colRaid1);
			raidRaidGroup.add(new qx.ui.core.Spacer(0,10));
			raidRaidGroup.add(colRaidTroops1);
			raidRaidGroup.add(new qx.ui.core.Spacer(0,10));
			raidRaidGroup.add(colRaid2);
			raidRaidGroup.add(new qx.ui.core.Spacer(0,10));
			raidRaidGroup.add(colRaidTroops2);
			raidRaidGroup.add(new qx.ui.core.Spacer(0,30));
			raidRaidGroup.add(colNumTroops);
			
			// Dungeon Level
			var raidDungeonLevelLabel = new qx.ui.basic.Label("Dungeon Level").set({width:85});
			var raidDungeonLevel = new qx.ui.basic.Label(dDungeonLevel).set({width:85});	
			var colDungeonLevel = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			
			colDungeonLevel.add(raidDungeonLevelLabel);
			colDungeonLevel.add(new qx.ui.core.Spacer(30));
			colDungeonLevel.add(raidDungeonLevel);
			
			// Dungeon %
			var sDisplayProgress = "-1";
			if (dDungeonProgress == 0) {
					sDisplayProgress = "0%";
			} else {
					sDisplayProgress = dDungeonProgress + "%";
			}
			raidProgressionToUse.setValue(dDungeonProgress.toString());
			var raidDungeonProgressLabel = new qx.ui.basic.Label("Dungeon %").set({width:85});
			var raidDungeonProgress = new qx.ui.basic.Label(sDisplayProgress).set({width:85});
			var colDungeonProgress = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			
			colDungeonProgress.add(raidDungeonProgressLabel);
			colDungeonProgress.add(new qx.ui.core.Spacer(30));
			colDungeonProgress.add(raidDungeonProgress);
			
			// Recommended Troops - hardcoded from wiki
			const aryTroopCount = [15,75,420,1080,4200,6800,15000,37500,40000,60000];
			
			var raidTroopLabel_Level01 = new qx.ui.basic.Label("Level 01").set({width:85});
			var raidTroopRecmd_Level01 = new qx.ui.basic.Label(aryTroopCount[0]).set({width:85});
			var raidTroopLabel_Level02 = new qx.ui.basic.Label("Level 02").set({width:85});
			var raidTroopRecmd_Level02 = new qx.ui.basic.Label(aryTroopCount[1]).set({width:85});
			var raidTroopLabel_Level03 = new qx.ui.basic.Label("Level 03").set({width:85});
			var raidTroopRecmd_Level03 = new qx.ui.basic.Label(aryTroopCount[2]).set({width:85});
			var raidTroopLabel_Level04 = new qx.ui.basic.Label("Level 04").set({width:85});
			var raidTroopRecmd_Level04 = new qx.ui.basic.Label(aryTroopCount[3]).set({width:85});
			var raidTroopLabel_Level05 = new qx.ui.basic.Label("Level 05").set({width:85});
			var raidTroopRecmd_Level05 = new qx.ui.basic.Label(aryTroopCount[4]).set({width:85});
			var raidTroopLabel_Level06 = new qx.ui.basic.Label("Level 06").set({width:85});
			var raidTroopRecmd_Level06 = new qx.ui.basic.Label(aryTroopCount[5]).set({width:85});
			var raidTroopLabel_Level07 = new qx.ui.basic.Label("Level 07").set({width:85});
			var raidTroopRecmd_Level07 = new qx.ui.basic.Label(aryTroopCount[6]).set({width:85});
			var raidTroopLabel_Level08 = new qx.ui.basic.Label("Level 08").set({width:85});
			var raidTroopRecmd_Level08 = new qx.ui.basic.Label(aryTroopCount[7]).set({width:85});
			var raidTroopLabel_Level09 = new qx.ui.basic.Label("Level 09").set({width:85});
			var raidTroopRecmd_Level09 = new qx.ui.basic.Label(aryTroopCount[8]).set({width:85});
			var raidTroopLabel_Level10 = new qx.ui.basic.Label("Level 10").set({width:85});
			var raidTroopRecmd_Level10 = new qx.ui.basic.Label(aryTroopCount[9]).set({width:85});
			
			var colTroopsLevel01 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			var colTroopsLevel02 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			var colTroopsLevel03 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			var colTroopsLevel04 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			var colTroopsLevel05 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			var colTroopsLevel06 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			var colTroopsLevel07 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			var colTroopsLevel08 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			var colTroopsLevel09 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			var colTroopsLevel10 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			
			colTroopsLevel01.add(raidTroopLabel_Level01);
			colTroopsLevel01.add(new qx.ui.core.Spacer(30));
			colTroopsLevel01.add(raidTroopRecmd_Level01);
			
			colTroopsLevel02.add(raidTroopLabel_Level02);
			colTroopsLevel02.add(new qx.ui.core.Spacer(30));
			colTroopsLevel02.add(raidTroopRecmd_Level02);
			
			colTroopsLevel03.add(raidTroopLabel_Level03);
			colTroopsLevel03.add(new qx.ui.core.Spacer(30));
			colTroopsLevel03.add(raidTroopRecmd_Level03);
			
			colTroopsLevel04.add(raidTroopLabel_Level04);
			colTroopsLevel04.add(new qx.ui.core.Spacer(30));
			colTroopsLevel04.add(raidTroopRecmd_Level04);
			
			colTroopsLevel05.add(raidTroopLabel_Level05);
			colTroopsLevel05.add(new qx.ui.core.Spacer(30));
			colTroopsLevel05.add(raidTroopRecmd_Level05);
			
			colTroopsLevel06.add(raidTroopLabel_Level06);
			colTroopsLevel06.add(new qx.ui.core.Spacer(30));
			colTroopsLevel06.add(raidTroopRecmd_Level06);
			
			colTroopsLevel07.add(raidTroopLabel_Level07);
			colTroopsLevel07.add(new qx.ui.core.Spacer(30));
			colTroopsLevel07.add(raidTroopRecmd_Level07);
			
			colTroopsLevel08.add(raidTroopLabel_Level08);
			colTroopsLevel08.add(new qx.ui.core.Spacer(30));
			colTroopsLevel08.add(raidTroopRecmd_Level08);
			
			colTroopsLevel09.add(raidTroopLabel_Level09);
			colTroopsLevel09.add(new qx.ui.core.Spacer(30));
			colTroopsLevel09.add(raidTroopRecmd_Level09);
			
			colTroopsLevel10.add(raidTroopLabel_Level10);
			colTroopsLevel10.add(new qx.ui.core.Spacer(30));
			colTroopsLevel10.add(raidTroopRecmd_Level10);
			
			// Add to Group - Right side of widget
			var raidInfoRow = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			var raidInfoGroup = new qx.ui.groupbox.GroupBox("Inforz");
			raidInfoGroup.setLayout(new qx.ui.layout.VBox());
			
			raidInfoGroup.add(colDungeonLevel);
			raidInfoGroup.add(new qx.ui.core.Spacer(0,10));
			raidInfoGroup.add(colDungeonProgress);
			raidInfoGroup.add(new qx.ui.core.Spacer(0,10));
			raidInfoGroup.add(colTroopsLevel01);
			raidInfoGroup.add(new qx.ui.core.Spacer(0,10));
			raidInfoGroup.add(colTroopsLevel02);
			raidInfoGroup.add(new qx.ui.core.Spacer(0,10));
			raidInfoGroup.add(colTroopsLevel03);
			raidInfoGroup.add(new qx.ui.core.Spacer(0,10));
			raidInfoGroup.add(colTroopsLevel04);
			raidInfoGroup.add(new qx.ui.core.Spacer(0,10));
			raidInfoGroup.add(colTroopsLevel05);
			raidInfoGroup.add(new qx.ui.core.Spacer(0,10));
			raidInfoGroup.add(colTroopsLevel06);
			raidInfoGroup.add(new qx.ui.core.Spacer(0,10));
			raidInfoGroup.add(colTroopsLevel07);
			raidInfoGroup.add(new qx.ui.core.Spacer(0,10));
			raidInfoGroup.add(colTroopsLevel08);
			raidInfoGroup.add(new qx.ui.core.Spacer(0,10));
			raidInfoGroup.add(colTroopsLevel09);
			raidInfoGroup.add(new qx.ui.core.Spacer(0,10));
			raidInfoGroup.add(colTroopsLevel10);
			raidInfoGroup.add(new qx.ui.core.Spacer(0,10));
			
			raidTroopRow.add(raidRaidGroup);
			//Inforz is not really accurate, make it go away and use the space for other things
			//raidTroopRow.add(raidInfoGroup);
			
			SetCalculatedValues();
			
			// Add to page
			// Container that has the group boxes in it
			raidPage1.add(new qx.ui.core.Spacer(0,10));
			raidPage1.add(raidTroopRow);
			
			// Button
			raidPage1.add(new qx.ui.core.Spacer(0,30));
			raidPage1.add(raidButtonArea);
			
			qx.core.Init.getApplication().switchOverlay(raidSettings);
		} // ShowRaidScheduler
		
		function SetCalculatedValues() {
			if (raidProgressionToUse) {
				//CalculateLoot();
				//CalculateTroops();
				var dDetailView = qx.core.Init.getApplication().dungeonDetailView;
				var dDungeonLevel = dDetailView.city.get_Level();
				var dDungeonProgress = dDetailView.city.get_Progress();
				var dDungeonType = dDetailView.city.get_Type();
				var iDungeonLoot = 0;
				var bEvenlyDistribute = true;
				var iEvenlyDistribute = raidDistribution.getSelection()[0].getModel();
				
				// Add default calculated values
				var cInfo = webfrontend.data.City.getInstance();
				var lut = webfrontend.res.Main.getInstance().units;
				var troopTypeCount = 0;
				var iTotalTroops1 = 0;
				var iTotalTroops2 = 0;
				var iUseProgression = raidProgressionToUse.getValue();
				
				for (var i in lut) {
					if (lut[i] && lut[i].a && lut[i].f > 0) {
						for (var b in cInfo.units) {
							if (b == i) {
								troopTypeCount += 1;
								if (raidUnitDrop.getSelection()[0].getModel() == b) {
									iTotalTroops1 = cInfo.units[b].count;
								}
								if (troopTypeCount == 2) {
									if (raidUnitDrop2.getSelection()[0].getModel() == b) {
										if (raidUnitDrop2.getSelection()[0].getModel() == raidUnitDrop.getSelection()[0].getModel()) {
											iTotalTroops2 = 0;
										} else {
											iTotalTroops2 = cInfo.units[b].count;
										}
									}
								}
							}
						}
					}
				}
				
				// Decide whether or not to evenly distribute troops
				if (iEvenlyDistribute == 1) {
					bEvenlyDistribute = false;
				}
				
				// Added this to hijack the current dungeon progression with what was set manually
				dDungeonProgress = iUseProgression;
				var iTotalTroops = iTotalTroops1 + iTotalTroops2;
				if (dDungeonProgress == 0) {
					var iNumber = 1;
				} else {
					var iNumber = 1 + (dDungeonProgress / 100);
				}
				
				// Pulled out the original hard-coded set of recommended troops
				// in order to try to use Os's calculations for efficiency.
				// I don't know where she got the base loot numbers, so I made
				// up the missing numbers, but still used her formula.			
				const aryMountainLoot1 = [240,1100,3000,10000,54150,108780,160310,325000,494150,944450];
				const aryMountainLoot2 = [150,720,2500,7500,24690,60570,136350,210000,329410,520320];
				
				const aryForestLoot1 = [200,900,2700,9000,54280,124621,241940,428575,494500,912100];
				const aryForestLoot2 = [120,600,2200,7000,17800,40409,110150,171925,305850,421900];
				
				const aryHillLoot1 = [200,900,2700,9000,26730,102090,66797,200000,370000,500000];
				const aryHillLoot2 = [120,600,2200,7000,22700,47600,97275,198205,296975,438375];
				
				const aryLootCapacity = [-1,-1,-1,10,20,10,10,5,15,15,20,15,-1,-1,-1,-1,-1,-1,-1];
				
				var u = raidUnitDrop.getSelection()[0].getModel();
				var troopModifier = 1.4;
				switch(dDungeonType) {
					case 4: //Mountain
						iDungeonLoot = Math.floor((dDungeonProgress/100)*aryMountainLoot1[dDungeonLevel -1]+aryMountainLoot2[dDungeonLevel -1]);
						switch(true) {
							case (u == 3): //Ranger
								troopModifier = 1.15;
								break;
							case (u == 4): //Guardian
								troopModifier = 2.8;
								break;
							case (u == 5): //Templar
								troopModifier = 1.23;
								break;
							case (u == 6): //Zerk
								troopModifier = 1.1;
								break;
						}
						break;
					case 5: //Forest
						iDungeonLoot = Math.floor((dDungeonProgress/100)*aryForestLoot1[dDungeonLevel -1]+aryForestLoot2[dDungeonLevel -1]);
						switch(true) {
							case (u == 3): //Ranger
								troopModifier = 1.15;
								break;
							case (u == 4): //Guardian
								troopModifier = 3.2;
								break;
							case (u == 6): //Zerk
								troopModifier = 1.1;
								break;
							case (u == 10): //Pally
								troopModifier = 1.2;
								break;
							case (u == 11): //Knights
								troopModifier = 1.1;
								break;
						}
						break;
					case 3: //Hill
						iDungeonLoot = Math.floor((dDungeonProgress/100)*aryHillLoot1[dDungeonLevel -1]+aryHillLoot2[dDungeonLevel -1]);
						switch(true) {
							case (u == 3): //Ranger
								troopModifier = 1.5;
								break;
							case (u == 4): //Guardian
								troopModifier = 3.8;
								break;
							case (u == 6): //Zerk
								troopModifier = 1.4;
								break;
							case (u == 10): //Pally
								troopModifier = 1.4;
								break;
							case (u == 11): //Knights
								troopModifier = 1.4;
								break;
							case (u == 12): //Lock
								troopModifier = 1.3;
								break;
						}
						break;
				}
				
				raidDungeonLoot.setValue(iDungeonLoot.toString());
				iRecommendedUnits = Math.floor((iDungeonLoot/aryLootCapacity[u]) * troopModifier);

				var unitOrders = city.getUnitOrders();
				var commandsInUse = 0;
				if (unitOrders != null) {
					for (var c = 0, len=unitOrders.length; c<len; c++) {
						commandsInUse += 1;
					}
				} else {
					commandsInUse = 0;
				}
				
				var iAvailCommands = city.getOrderLimit() - commandsInUse;
				var iNumRaids = Math.floor(iTotalTroops / iRecommendedUnits);

				if (iNumRaids > 0) {
					if (iNumRaids > iAvailCommands) {
						iNumRaids = iAvailCommands;
					}		
					raidNumRaids.setValue(iNumRaids.toString());
					
					var ttRatio1 = iTotalTroops1 / iTotalTroops;
					var ttRatio2 = 0;
					
					if (iTotalTroops2 > 0) {
						ttRatio2 = iTotalTroops2 / iTotalTroops;
					}
					//var ATN = iRecommendedUnits * iNumRaids;
					var iUnitsToUse1 = Math.ceil((iRecommendedUnits * ttRatio1));
					var iUnitsToUse2 = Math.ceil((iRecommendedUnits * ttRatio2));
					
					if (bEvenlyDistribute) {
						var iLeftOverTroops1 = iTotalTroops1 - (iUnitsToUse1 * iNumRaids)
						var iLeftOverTroops2 = iTotalTroops2 - (iUnitsToUse2 * iNumRaids)
						
						iUnitsToUse1 += Math.floor(iLeftOverTroops1 / iNumRaids);
						iUnitsToUse2 += Math.floor(iLeftOverTroops2 / iNumRaids);
					}
					var ATN = (iUnitsToUse1 + iUnitsToUse2) * iNumRaids;
					
					raidNumUnits.setValue(iUnitsToUse1.toString());
					raidNumUnits2.setValue(iUnitsToUse2.toString());
					
					var iDisplay = (iUnitsToUse1 + iUnitsToUse2) * iNumRaids
					raidNumTroops.setValue(ATN.toString())
				} else {
					alert("Raids works out to zero.  Please manually enter information.");
				}
			}
		}
		
		function CalculateLoot () {
		
		}
		
		function CalculateTroops () {
		
		}
		
		function raidOpen () {
			webfrontend.data.City.getInstance().addListener("changeVersion",resetRaidUnits,raidSettings);
		}

		function raidClose () {
			webfrontend.data.City.getInstance().removeListener("changeVersion",resetRaidUnits,raidSettings);
		}
		
		function ScheduleRaid_Click() {
			var iRaids = raidNumRaids.getValue();

			var wm = webfrontend.data.Player.getInstance().getMinisterMilitaryPresent();	
			if (wm) {
				var dCurDate = new Date();
				for (var i = 0; i < iRaids; i++) {
					raidWait(100)
					//var t = setTimeout(ScheduleRaid(u,u2,nu,nu2,iRaids,tc,t,f));
					//var t = setTimeout("ScheduleRaid()", 1000);
					ScheduleRaid(i);
				}
			}
		}

		function raidWait(ms) {
			// setTimeout is retarded.  Stole this from the interwebs.
			// javascript can suck it.
			ms += new Date().getTime();
			while (new Date() < ms){}
		}
		
		function ShowAttackScheduler() {
			// I'm sure there are better ways to do this, but I don't know what it is.
			// So, here we do not reset the date, then we always reset the troops,
			// then we don't reset the fakes list and stuff.
			var attackDoThisStuff = false;
			if (!attackSettings) {
				attackDoThisStuff = true;
				attackSettings = new webfrontend.gui.OverlayWidget();
				attackSettings.clientArea.setLayout(new qx.ui.layout.VBox());
				attackSettings.setTitle("War Minister Attack Scheduler - Version 2.1.6");
				var attackPage = attackSettings.clientArea;
				
				// Date
				var today = new Date();
				var d = new Date(today.getTime() + (24 * 60 * 60 * 1000));
				var curr_date = d.getDate();
				var curr_month = d.getMonth();
				var curr_year = d.getFullYear();

				var attackDateDropDowns = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				var attackDateLabel = new qx.ui.basic.Label("Arrival Date:").set({width:85});
				attackMonthDrop = new qx.ui.form.SelectBox();
				attackMonthDrop.setWidth(50);
				attackMonthDrop.setHeight(29);
				for (var i = 1; i < 13; i++) {
					attackMonthDrop.add(new qx.ui.form.ListItem(i,null,i));
				}
				attackMonthDrop.setSelection([attackMonthDrop.getChildren()[curr_month]]);

				attackDayDrop = new qx.ui.form.SelectBox();
				attackDayDrop.setWidth(50);
				attackDayDrop.setHeight(29);
				for (var i = 1; i < 32; i++) {
					attackDayDrop.add(new qx.ui.form.ListItem(i,null,i));
				}
				attackDayDrop.setSelection([attackDayDrop.getChildren()[curr_date-1]]);

				attackYearDrop = new qx.ui.form.SelectBox();
				attackYearDrop.setWidth(65);
				attackYearDrop.setHeight(29);
				for (var i = 2013; i < 2016; i++) {
					attackYearDrop.add(new qx.ui.form.ListItem(i,null,i));
				}

				attackDateDropDowns.add(attackDateLabel);
				attackDateDropDowns.add(new qx.ui.core.Spacer(25));
				attackDateDropDowns.add(attackMonthDrop);
				attackDateDropDowns.add(attackDayDrop);
				attackDateDropDowns.add(attackYearDrop);

				// Time
				var attackTimeDropDowns = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				var attackTimeLabel = new qx.ui.basic.Label("Arrival Time:").set({width:85});
				attackHourDrop = new qx.ui.form.SelectBox();
				attackHourDrop.setWidth(50);
				attackHourDrop.setHeight(29);
				for (var i = 0; i < 24; i++) {
					attackHourDrop.add(new qx.ui.form.ListItem(String(i),null,i));
				}
				attackHourDrop.setSelection([attackHourDrop.getChildren()[10]]);

				attackMinuteDrop = new qx.ui.form.SelectBox();
				attackMinuteDrop.setWidth(50);
				attackMinuteDrop.setHeight(29);
				for (var i = 0; i < 60; i++) {
					attackMinuteDrop.add(new qx.ui.form.ListItem(String(i),null,i));
				}
				attackMinuteDrop.setSelection([attackMinuteDrop.getChildren()[1]]);

				attackSecondDrop = new qx.ui.form.SelectBox();
				attackSecondDrop.setWidth(65);
				attackSecondDrop.setHeight(29);
				for (var i = 0; i < 60; i++) {
					attackSecondDrop.add(new qx.ui.form.ListItem(String(i),null,i));
				}
				attackSecondDrop.setSelection([attackSecondDrop.getChildren()[0]]);

				attackTimeDropDowns.add(attackTimeLabel);
				attackTimeDropDowns.add(new qx.ui.core.Spacer(25));
				attackTimeDropDowns.add(attackHourDrop);
				attackTimeDropDowns.add(attackMinuteDrop);
				attackTimeDropDowns.add(attackSecondDrop);
				
				// Timing
				var attackTimingDropDown = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				var attackTimingLabel = new qx.ui.basic.Label("Timing:").set({width:85});
				attackTiming = new qx.ui.form.SelectBox();
				attackTiming.setWidth(200);
				attackTiming.setHeight(29);
				attackTiming.add(new qx.ui.form.ListItem("Arrival",null,3));
				attackTiming.add(new qx.ui.form.ListItem("Departure",null,2));
				attackTiming.add(new qx.ui.form.ListItem("Now",null,1));
				attackTimingDropDown.add(attackTimingLabel);
				attackTimingDropDown.add(new qx.ui.core.Spacer(25));
				attackTimingDropDown.add(attackTiming);
				
				attackPage.add(attackDateDropDowns);
				attackPage.add(new qx.ui.core.Spacer(0,10));
				attackPage.add(attackTimeDropDowns);
				attackPage.add(new qx.ui.core.Spacer(0,10));
				attackPage.add(attackTimingDropDown);

				// HBox for troops
				var cntAttackTroopGroups = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				
				// Create Groups
				// Left side of widget
				var attackRealTroopsGroup = new qx.ui.groupbox.GroupBox("Real Attack");
				atkRealGroup = attackRealTroopsGroup;
				attackRealTroopsGroup.setLayout(new qx.ui.layout.VBox());
				
				// Right side of widget
				var attackFakeTroopsGroup = new qx.ui.groupbox.GroupBox("Fake Attacks");
				atkFakeGroup = attackFakeTroopsGroup;
				attackFakeTroopsGroup.setLayout(new qx.ui.layout.VBox());

				cntAttackTroopGroups.add(attackRealTroopsGroup);
				cntAttackTroopGroups.add(attackFakeTroopsGroup);			
				attackPage.add(cntAttackTroopGroups);
				
				// HBox that will contain the two group boxes
				var cntAttackTroops = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				
				// Attack Button
				var cntAttackButton = new qx.ui.container.Composite(new qx.ui.layout.Basic());
				
				var attackButtonArea = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				attackButton = new qx.ui.form.Button("Killin").set({width:120});
				attackButton.setAlignY("bottom");
				attackButton.addListener("click", function(){ScheduleAttack_Click();qx.core.Init.getApplication().switchOverlay(null);}, false);
				
				// Calculate Button
				var attackCalculateButton = new qx.ui.form.Button("Calculate Real Troops").set({width:150});
				attackCalculateButton.setAlignY("bottom");
				attackCalculateButton.addListener("click", function(){SetRealTroopCount();}, false);
				
				// Reload Button
				var attackReloadButton = new qx.ui.form.Button("Reload Troops").set({width:120});
				attackReloadButton.setAlignY("bottom");
				attackReloadButton.addListener("click", function(){ReloadTroops();}, false);
				
				attackButtonArea.add(attackButton);
				attackButtonArea.add(new qx.ui.core.Spacer(150,0));
				attackButtonArea.add(attackCalculateButton);
				attackButtonArea.add(new qx.ui.core.Spacer(20,0));
				attackButtonArea.add(attackReloadButton);
				cntAttackButton.add(attackButtonArea, {left:10});
				
				// Create Groups
				// Left side of widget
				var attackRealGroup = new qx.ui.groupbox.GroupBox("Real Attack");
				attackRealGroup.setLayout(new qx.ui.layout.VBox());
				
				// Right side of widget
				var attackFakeGroup = new qx.ui.groupbox.GroupBox("Fake Attacks");
				attackFakeGroup.setLayout(new qx.ui.layout.VBox());
				
				// Add real target
				var attackRealBox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				var attackRealBoxLabel = new qx.ui.basic.Label("Real Target");
				attackRealBox.add(attackRealBoxLabel);
				attackRealTarget = new qx.ui.form.TextField().set({ maxLength: 7 });
				
				// Add fake targets box
				var attackFakeBox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				var attackFakeBoxLabel = new qx.ui.basic.Label("Fake Coords (Limit 15 Lines)");
				//var plusButton = new qx.ui.form.Button("+");
				//plusButton.addListener("click", function(){AddDecoy();}, false);
				attackFakeBox.add(attackFakeBoxLabel);
				attackFakeBox.setAlignY("bottom");
				//attackFakeBox.add(plusButton);
				attackCityBox = new qx.ui.form.TextArea("").set({height:60, allowGrowX:true,allowGrowY:false,maxLength:200, tabIndex: 303}); cb = attackCityBox;
				
				// Add attack drop downs
				attackRealAttackTypeDrop = new qx.ui.form.SelectBox();
				attackRealAttackTypeDrop.setWidth(210);
				attackRealAttackTypeDrop.setHeight(29);
				attackRealAttackTypeDrop.add(new qx.ui.form.ListItem("Scout",null,1));
				attackRealAttackTypeDrop.add(new qx.ui.form.ListItem("Plunder",null,2));
				attackRealAttackTypeDrop.add(new qx.ui.form.ListItem("Assault",null,3));
				attackRealAttackTypeDrop.add(new qx.ui.form.ListItem("Support",null,4));
				attackRealAttackTypeDrop.add(new qx.ui.form.ListItem("Siege",null,5));
				
				attackFakeAttackTypeDrop = new qx.ui.form.SelectBox();
				attackFakeAttackTypeDrop.setWidth(250);
				attackFakeAttackTypeDrop.setHeight(29);
				attackFakeAttackTypeDrop.add(new qx.ui.form.ListItem("Scout",null,1));
				attackFakeAttackTypeDrop.add(new qx.ui.form.ListItem("Plunder",null,2));
				attackFakeAttackTypeDrop.add(new qx.ui.form.ListItem("Assault",null,3));
				attackFakeAttackTypeDrop.add(new qx.ui.form.ListItem("Support",null,4));
				attackFakeAttackTypeDrop.add(new qx.ui.form.ListItem("Siege",null,5));

				// Add stuff to groups
				attackRealGroup.add(attackRealAttackTypeDrop);
				attackRealGroup.add(attackRealBox);
				attackRealGroup.add(attackRealTarget);
				
				attackFakeGroup.add(attackFakeAttackTypeDrop);
				attackFakeGroup.add(attackFakeBox);
				attackFakeGroup.add(attackCityBox);
				
				// Add groups to container
				cntAttackTroops.add(attackRealGroup);
				cntAttackTroops.add(attackFakeGroup);
				
				// Add to page				
				// Container that has the group boxes in it
				attackPage.add(new qx.ui.core.Spacer(0,10));
				attackPage.add(cntAttackTroops);
				
				// Button
				attackPage.add(new qx.ui.core.Spacer(0,30));
				attackPage.add(cntAttackButton);
			} // if attackDoThisStuff
			
			if (curCityId != webfrontend.data.City.getInstance().getId()) {
				if (atkRealGroup) {
					atkRealGroup.removeAll();
				}
				
				if (atkFakeGroup) {
					atkFakeGroup.removeAll();
				}
				
				// Add Troops
				AddRealTroops();
				AddFakeTroops();
			}
			
			SetRealTroopCount();
			qx.core.Init.getApplication().switchOverlay(attackSettings);
		} // ShowAttackScheduler
		
		function ReloadTroops() {
			if (atkRealGroup) {
				atkRealGroup.removeAll();
			}
			
			if (atkFakeGroup) {
				atkFakeGroup.removeAll();
			}
			
			// Add Troops
			AddRealTroops();
			AddFakeTroops();
			
			SetRealTroopCount();
		}
		
		function ScheduleAttack_Click() {
			var lut = webfrontend.res.Main.getInstance().units;
			var cInfo = webfrontend.data.City.getInstance();
			var attackRealTroopsArray = new Array();
			var attackFakeTroopsArray = new Array();
			var realPlayer = null;
			var realType = null;
			var fakePlayers = new Array();
			var fakeType = null;
			var transport = 1;
			var aryRealUnits = new Array();
			var aryFakeUnits = new Array();
			var vPlayer = null;
			var m = attackMonthDrop.getSelection()[0].getModel();
			var d = attackDayDrop.getSelection()[0].getModel();
			var y = attackYearDrop.getSelection()[0].getModel();
			var h = attackHourDrop.getSelection()[0].getModel();
			var n = attackMinuteDrop.getSelection()[0].getModel();
			var s = attackSecondDrop.getSelection()[0].getModel();
			var reftime = ConvertToUnixTime(m, d, y, h, n, s);
			var cL=webfrontend.data.ServerTime.getInstance();
			var maxq = webfrontend.data.City.getInstance().getOrderLimit();
			var cq = 0;
			if (webfrontend.data.City.getInstance().getUnitOrders()!=null&&typeof(webfrontend.data.City.getInstance().getUnitOrders()) == 'object') {
				cq = webfrontend.data.City.getInstance().getUnitOrders().length;
			}

			if (maxq == cq) {
				return;
			}
			
			reftime = reftime - cL.serverOffset;
			fakeCoords = attackCityBox.getValue().split("\n");
			realCoords = attackRealTarget.getValue();
			
			realType = attackRealAttackTypeDrop.getSelection()[0].getModel();
			fakeType = attackFakeAttackTypeDrop.getSelection()[0].getModel();
			
			for (var i in lut) {
				if (lut[i] && lut[i].a && lut[i].f > 0) {
					for (var b in cInfo.units) {
						if (b == i) {
							//alert("real: " + i + "|" + RealUnitCount[i].getValue());
							//alert("fake: " + i + "|" + FakeUnitCount[i].getValue());
							attackRealTroopsArray.push(i + "|" + RealUnitCount[i].getValue());
							attackFakeTroopsArray.push(i + "|" + FakeUnitCount[i].getValue());
						}
					}
				}
			}
			
			for (var i = 0;i < attackRealTroopsArray.length;i++) {
				var aryTmp = attackRealTroopsArray[i].split("|");
				if (aryTmp[1] != "0") {
					//alert("{t:" + aryTmp[0] + ",c:" + aryTmp[1] + "}");
					aryRealUnits.push({t:aryTmp[0],c:aryTmp[1]});
					if (aryTmp[0] == 15 || aryTmp[0] == 16 || aryTmp[0] == 17) {
						transport = 2;
					}
				}
			}
			// aryUnits|Coords|Type|transport|reftime
			attackArray.push([aryRealUnits,realCoords,realType,transport,reftime])
			
			for (var i = 0;i < attackFakeTroopsArray.length;i++) {
				var aryTmp = attackFakeTroopsArray[i].split("|");
				if (aryTmp[1] != "0") {
					//alert("{t:" + aryTmp[0] + ",c:" + aryTmp[1] + "}");
					aryFakeUnits.push({t:aryTmp[0],c:aryTmp[1]});
					if (aryTmp[0] == 15 || aryTmp[0] == 16 || aryTmp[0] == 17) {
						transport = 2;
					}
				}
			}
			
			if (typeof(fakeCoords) == "object") {
				for (var k = 0; k < fakeCoords.length; k++) {
					cq += 1;
					if (fakeCoords[k] != "" && cq <= maxq) {
						attackArray.push([aryFakeUnits,fakeCoords[k],fakeType,transport,reftime])
					}
				}
			}			
			
			for (attackCounter = 0; attackCounter < attackArray.length; attackCounter++) {
				vPlayer = null;
				var h = attackCounter;
				var pnCoords = attackArray[h][1].split(":");
				attackCurrentCoords = pnCoords;
				var xC = pnCoords[0];
				var yC = pnCoords[1];
				
				attackWait(200);
				webfrontend.net.CommandManager.getInstance().sendCommand("GetOrderTargetInfo",
					{cityid:webfrontend.data.City.getInstance().getId(),
					x:xC,
					y:yC},this,_onReceivedTargetInfo);
			}
		} //ScheduleAttack_Click
		
		function _onReceivedTargetInfo (r, cf) {
		   //vPlayer = cf;
		   tPlayer.push(cf);
		   window.setTimeout("SetupAttack()", 300);
		}
		
		function setPlayerArray() {
			tPlayer.push(vPlayer);
		}

		function SetupAttack() {
			var vTiming = attackTiming.getSelection()[0].getModel();
			for (i = 0; i < attackArray.length; i++) {
				//var i = attackCounter;
				attackWait(200);
				//alert("aryUnits: " + attackArray[i][0] + "|vPlayer: " + tPlayer[i].pn + "|Coords: " + attackArray[i][1] + "|Type: " + attackArray[i][2] + "|transport: " + attackArray[i][3] + "|reftime: " + attackArray[i][4]);
				ScheduleAttack(attackArray[i][0],tPlayer[i].pn,attackArray[i][1],attackArray[i][2],attackArray[i][3],vTiming,attackArray[i][4]);
			}
			
			attackArray = new Array();
			tPlayer = new Array();
		}
		
		function GetPlayerInfo(plCoords) {			
			return tPlayer;
		}
		
		function attackWait(ms) {
			// setTimeout is retarded.  Stole this from the interwebs.
			// javascript can suck it.
			ms += new Date().getTime();
			while (new Date() < ms){}
		}
		
		function AddRealTroops() {
			RealUnitCount = new Array();
			CityHasArtillery = false;
			var cInfo = webfrontend.data.City.getInstance();
			var lut = webfrontend.res.Main.getInstance().units;
			curCityId = cInfo.getId();

			for (var i in lut) {
				if (lut[i] && lut[i].a && lut[i].f > 0) {
					for (var b in cInfo.units) {
						if (b == i) {
							if (lut[b].avb+lut[b].avd > 0) {
								CityHasArtillery = true;
							}

							var row = new qx.ui.container.Composite(new qx.ui.layout.HBox());
							row.setAlignY("bottom");
							var label = new qx.ui.basic.Label(lut[i].dn).set({width:85});
							RealUnitCount[i] = new qx.ui.form.TextField(cInfo.units[b].total.toString()).set({ maxLength: 6 });
							var sep = new qx.ui.basic.Label(" / ");
							var total = new qx.ui.basic.Label(cInfo.units[b].total);
							total.setBuddy(RealUnitCount[i]);
							total.addListener("click", function(e) {
								var tot = e.getTarget();
								tot.getBuddy().setValue(tot.getValue().toString());
							},this);
							
							row.add(label);
							row.add(RealUnitCount[i]);
							row.add(sep);
							row.add(total);
							atkRealGroup.add(row);
						}
					}
				}
			}
			atkRealGroup.add(new qx.ui.core.Spacer(0,20));
		}
		
		function AddFakeTroops() {
			FakeUnitCount = new Array();
			CityHasArtillery = false;
			var bHasWarGalleons = false;
			var cInfo = webfrontend.data.City.getInstance();
			var lut = webfrontend.res.Main.getInstance().units;
			var minTS = setMinimumTS();
			var minTSString = "(Min: " + minTS + "TS)";
			var atkType = 0; // 0 = land; 1 = artillery; 2 = naval; -1 = manual;
			var atkTroopTypes = 0 // 0 = ???; 1 = cav; 2 = wg;
			
			for (var i in lut) {
				if (lut[i] && lut[i].a && lut[i].f > 0) {
					for (var b in cInfo.units) {
						if (b == i) {
							if (lut[b].avb+lut[b].avd > 0) {
								CityHasArtillery = true;
							}
							if (b == 10 || b == 11) { // Knights/Pallies
								atkTroopTypes = 1;
							}
							if (b == 13 || b == 14) { // Rams/Cats
								if (atkType == 2 || atkType == -1) { // Ships + Arty, force manual
									atkType = -1
								} else {
									atkType = 1;
								}
							}
							if (b == 15 || b == 16 || b == 17) { // Ships
								if (atkType == 1 || atkType == -1) { // Arty + Ships, force manual
									atkType = -1
								} else {
									atkType = 2;
								}
								if (b == 17) {
									bHasWarGalleons = true;
									atkTroopTypes = 2;
								}
							}
							var row = new qx.ui.container.Composite(new qx.ui.layout.HBox());
							row.setAlignY("bottom");
							var label = new qx.ui.basic.Label(lut[i].dn).set({width:85});
							FakeUnitCount[i] = new qx.ui.form.TextField("0").set({ maxLength: 6 });
							var tsLabel = new qx.ui.basic.Label(minTSString).set({width:85});
							
							row.add(label);
							row.add(FakeUnitCount[i]);
							row.add(tsLabel);

							atkFakeGroup.add(row);
						}
					}
				}
			}

			var i = 0;
			var aryTroops = new Array();
			aryTroops = SetMinFakes(atkType, atkTroopTypes, minTS);
			for (var j in FakeUnitCount) {
				FakeUnitCount[j].setValue(aryTroops[i].toString());
				i += 1;
			}
			atkFakeGroup.add(new qx.ui.core.Spacer(0,20));
		}
		
		function SetMinFakes(atkType, atkTroopTypes, minTS) {
			//var minTS = setMinimumTS();
			var atkTroopCount = new Array();
			atkTroopCount = [0,0,0];
			
			switch (atkType) {
				case 0:
					if (atkTroopTypes == 1) {
						atkTroopCount = [(minTS / 2),0,0];
					} else {
						atkTroopCount = [minTS,0,0];
					}
					break;
				case 1:
					atkTroopCount = [(minTS / 10),0,0];
					break;
				case 2:
					if (atkTroopTypes == 2) {
						atkTroopCount = [Math.round((minTS / 400)),0,0];
					} else {
						//atkTroopCount = [2000,5,0];
						if (atkTroopTypes ==1) {
							atkTroopCount = [((minTS - 500) / 2),5,0];
						} else {
							atkTroopCount = [(minTS - 500),5,0];
						}
					}
					break;
			}
			
			return atkTroopCount;
		}
		
		function SetRealTroopCount() {
			var cInfo = webfrontend.data.City.getInstance();
			var lut = webfrontend.res.Main.getInstance().units;
			var minTS = setMinimumTS();
			var checkFrig = false;
			var frigCount = 0;
			//var troopArray = new [];
			
			var nDecoys = 0;
			var cmds = attackCityBox.getValue().split("\n");
			if (typeof(cmds) == "object") {
				for (var k = 0; k < cmds.length; k++) {
					if (cmds[k] != "") nDecoys++;
				}
			}
			
			for (var i in lut) {
				if (lut[i] && lut[i].a && lut[i].f > 0) {
					for (var b in cInfo.units) {
						if (b == i) {
							if (RealUnitCount[b] && FakeUnitCount[b]) {
								//troopArry.push(b);
								var minUnit = FakeUnitCount[i].getValue();
								var realCount = (webfrontend.data.City.getInstance().units[i].total-(nDecoys*minUnit)).toString();
								if (b == 15) {
									checkFrig = true;
									frigCount = realCount;
								}
								RealUnitCount[i].setValue(realCount);
							}
						}
					}
				}
			}
			
			if (checkFrig == true) {
				// I feel that this is overly stupid, but it was late, and it works, so whatever.
				var bReset = false;
				var frigCap = frigCount * 500;
				//alert("You have frigs, your TS capacity is " + frigCap);
				for (var i in lut) {
					if (lut[i] && lut[i].a && lut[i].f > 0) {
						for (var b in cInfo.units) {
							if (b == i) {
								if (RealUnitCount[b] && FakeUnitCount[b]) { // 8 9 10 11 (cav)
									//var realCount = (webfrontend.data.City.getInstance().units[i].total-(nDecoys*minUnit)).toString();
									var realCount = RealUnitCount[b].getValue();
									if (b == 8 || b == 9 || b == 10 || b == 11) {
										var ts = realCount * 2;
									} else {
										var ts = realCount;
									}
									if (ts > frigCap) {
										bReset = true;
									}
									
									if (bReset = true) {
										//if (b == 8 || b == 9 || b == 10 || b == 11) {
										//	var newRealCount = frigCap / 2;
										//} else {
											var newRealCount = frigCap;
										//}

										if (b != 15 && b != 16 && b != 17 && ts >= newRealCount) {
											RealUnitCount[i].setValue(newRealCount.toString());
											bReset = false;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		function SetRealTroopCount_LKG() {
			var cInfo = webfrontend.data.City.getInstance();
			var lut = webfrontend.res.Main.getInstance().units;
			var minTS = setMinimumTS();
			
			for (var i in lut) {
				if (lut[i] && lut[i].a && lut[i].f > 0) {
					for (var b in cInfo.units) {
						if (b == i) {
							var minUnit = Math.ceil(minTS/lut[i].uc);
							if (RealUnitCount[b]) {
								var nDecoys = 0;
								var cmds = attackCityBox.getValue().split("\n");
								if (typeof(cmds) == "object") {
									for (var k = 0; k < cmds.length; k++) {
										if (cmds[k] != "") nDecoys++;
									}
								}
								RealUnitCount[i].setValue((webfrontend.data.City.getInstance().units[i].total-(nDecoys*minUnit)).toString());
								return;
							}
						}
					}
				}
			}
		}
		
		function setMinimumTS() {
			var cityCount = webfrontend.data.Player.getInstance().getNumCities();
			var resMainInstance = webfrontend.res.Main.getInstance();
			var cityRange = 0;
			var curTsMinimum = 0;
			
			for(var i=0; i<resMainInstance.combatAttackCity.c.length; i++) {
				var levelInfo = resMainInstance.combatAttackCity.c[i];
				if (levelInfo.c <= cityCount) {
					curTsMinimum = levelInfo.m;
				} else {
					break;
				}
			}
			
			var cityInfo = webfrontend.data.City.getInstance();
			var maxUnitCount = Math.max(cityInfo.getUnitLimit(),cityInfo.getUnitCount());
			for(var i=0; i<resMainInstance.combatAttackCity.u.length; i++) {
				var levelInfo = resMainInstance.combatAttackCity.u[i];
				if (levelInfo.c <= maxUnitCount) {
					if (curTsMinimum < levelInfo.m)
					curTsMinimum = levelInfo.m;
					} else {
						break;
					}
			}
			return curTsMinimum;
		}

		function ScheduleRaid (curRaid) {	
			var u = raidUnitDrop.getSelection()[0].getModel();
			var u2 = raidUnitDrop2.getSelection()[0].getModel();
			var nu = raidNumUnits.getValue();
			var nu2 = raidNumUnits2.getValue();
			var vTimeRef = 1;	//Default to Now
			var tOffset = 0; //Default to Now
			var cL = webfrontend.data.ServerTime.getInstance();
			var dDate = new Date();
			var m = 0;
			var d = 0;
			var y = 0;
			var h = 0;
			var n = 0;
			var s = 0;
			
			tOffset = raidTimeOffsetDrop.getSelection()[0].getModel();
			if (tOffset == 0 || curRaid == 0) {
				vTimeRef = 1;
				vTime = dDate.getTime();
				vTime = vTime - cL.serverOffset;
			} else {
				vTimeRef = 2;
				vDateTime = dDate.add("mi", tOffset * curRaid);
				vTime = webfrontend.Util.getDateTimeString(vDateTime);
				var aryTmp = vTime.split(":");
				
				m = vDateTime.getMonth() + 1;
				d = vDateTime.getDate();
				y = vDateTime.getFullYear();
				h = aryTmp[0];
				n = aryTmp[1];
				s = aryTmp[2];
				
				// if the schedule goes into tomorrow, the string "Tomorrow" is part of the hour
				h = parseInt(h.replace("Tomorrow ", ""));
				//alert(m + "|" + d + "|" + y + "|" + h + "|" + n + "|" + s);
				vTime = ConvertToUnixTime(m, d, y, h, n, s);
				vTime = vTime - cL.serverOffset;
			}
			
			var tc = raidTargetDungeon.getValue();
			var f = new Array();

			// if the troop type is water, and the count is not zero, set transport to water
			if (((u == 15 || u == 16 || u == 17) && nu != 0) || ((u2 == 15 || u2 == 16 || u2 == 17) && nu2 != 0)) {
				t = 2;
			} else {
				t = 1;
			}

			if (nu != 0) {
				f.push({t:u,c:nu});
			}
			if (nu2 !=0) {
				f.push({t:u2,c:nu2});
			}
			
			//alert("f: " + f + "|tc: " + tc + "|t: " + t);
			webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
				{cityid:webfrontend.data.City.getInstance().getId(),
				units:f,
				targetPlayer:null,
				targetCity:tc,
				order:8,						// Dungeon Raid
				transport:t,
				timeReferenceType:vTimeRef,		// Now = 1; Departure = 2; Arrival = 3;
				referenceTimeUTCMillis:vTime,	// Attack Time
				raidTimeReferenceType:1,		// Until Complete
				raidReferenceTimeUTCMillis:0
				}, this, _RaidDone);
		}
		
		function ScheduleAttack(aryUnits,vPlayer,vCoords,vAttack,vTransport,vTiming,vTime) {
			//alert("aryUnits: " + aryUnits + "|vPlayer: " + vPlayer + "|vCoords: " + vCoords + "|vAttack: " + vAttack + "|vTransport: " + vTransport + "|vTiming: " + vTiming + "|vTime: " + vTime);
			var createCity = "";
			webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
				{cityid:webfrontend.data.City.getInstance().getId(),
				units:aryUnits,					// Unit Array
				targetPlayer:vPlayer,			// Player Name
				targetCity:vCoords,				// Target Coords
				order:vAttack,					// Attack Type
				transport:vTransport,			// Ground or Water
				createCity:createCity,			// ???
				timeReferenceType:vTiming,		// Now (1); Departure (2); Arrival (3);
				referenceTimeUTCMillis:vTime,	// Attack Time
				iUnitOrderOptions:0,			// ???
				}, this, _AttackDone);
		}
		
		function resetRaidUnits(UD, UD2) {
			var cInfo = webfrontend.data.City.getInstance();
			var unitTypeCount = 0;
			var bHasRaidUnits = false;
			curCityId = cInfo.getId();
			goButton.setEnabled(false);

			gUnitTypeUpdating = true;
			UD.removeAll();
			UD2.removeAll();
			var lut = webfrontend.res.Main.getInstance().units;
			var unitDropSelect = 0;
			var countUnitTS = 0;
			for (var i in lut) {
				if (lut[i] && lut[i].a && lut[i].f > 0) {
					for (var b in cInfo.units) {
						// Do not add cg, scouts, rams, cats, frigates or barons
						if (b == i && b != 1 && b != 2 && b != 8 && b != 13 && b != 14 && b != 15 && b != 18) {
							goButton.setEnabled(true);
							bHasRaidUnits = true;
							// Use counter to decide what to add to the drop-downs
							unitTypeCount += 1;
							var newItem = new qx.ui.form.ListItem(lut[i].dn,null,i);
							if (unitTypeCount == 1) {
								UD.add(newItem);
							}
							if (unitTypeCount == 2) {
								UD2.add(newItem);
							}
						}
					}
				}
			}
			if (!bHasRaidUnits) {
				alert("No raidable units found.");
				var newItem = new qx.ui.form.ListItem("None",null,-1);
				UD.add(newItem)
				var newItem = new qx.ui.form.ListItem("None",null,-2);
				UD2.add(newItem)
			}
			if (unitTypeCount == 1) {
				var newItem = new qx.ui.form.ListItem("None",null,-1);
				UD2.add(newItem)
			}
			gUnitTypeUpdating = false;
		}
		
		function intelCreateOsReport() {
			intelOsIndex = qx.core.Init.getApplication().cityInfoPage.headerData.getRowCount();
			intelLoadNextOsReport();
		}
		
		function intelLoadNextOsReport() {
			// Gather data recursively
			if (intelOsIndex > 0) {
				var ownerName = qx.core.Init.getApplication().cityInfoPage.playerLabel.getValue();
				for (var i=intelOsIndex-1; i>=0;i--) {
					var rowInfo = qx.core.Init.getApplication().cityInfoPage.headerData.getRowData(i);
					if (rowInfo == null)
						continue;
					if (rowInfo.on.search(ownerName) >=0) {
						if (rowInfo.s.search(": Assaulted by ") >= 0 || rowInfo.s.search(": Plundered by ") >= 0 || rowInfo.s.search(": Sieged by ") >= 0) {
							intelOsIndex = i;
							webfrontend.net.CommandManager.getInstance().sendCommand("GetReport", {id: rowInfo.i}, this, _parseIntelReport, intelOsIndex);
							return;
						}
					}
				}
			}

			// Build and show report
			if (intelOsIndex >= 0) {
				var text = "";
				if (intelOsCityArray.length > 0) {
					while (intelOsCityArray.length > 0) {
						var line = intelOsCityArray.shift();
						text += line.s + "\n";
					}
					intelExportWindow = intelShowExportWindow(text);
					intelExportWindow.intelShowExportWindow(text);
					qx.core.Init.getApplication().getDesktop().add(intelExportWindow, {left: 0, right: 0, top: 0, bottom: 0});
					intelExportWindow.show();
				} else {
					var dialog = new webfrontend.gui.ConfirmationWidget();
					dialog.showGenericNotice("Gather Intel", "There was no worthy intelligence to gather", "", "webfrontend/ui/bgr_popup_survey.gif");
					qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
					dialog.show();
				}
				intelOsIndex = -1;
			}
		}
		
		function intelShowExportWindow(text) {
			var wdg = new webfrontend.gui.ConfirmationWidget();
			wdg.intelShowExportWindow = function() {

				var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_survey.gif");
				this.dialogBackground._add(bgImg, {left: 0, top: 0});

				var la = new qx.ui.basic.Label("Intel Gathered");
				la.setFont("font_subheadline_sidewindow");
				la.setTextColor("text-gold");
				la.setTextAlign("left");
				this.dialogBackground._add(la, {left: 17, top: 5});

				var shrStr = new qx.ui.form.TextArea(text).set({allowGrowY: true, tabIndex: 303});
				this.dialogBackground._add(shrStr, {left: 30, top: 50, width: 90, height: 45});
				shrStr.selectAllText();

				var shwStr = function(type) {
					shrStr.setValue(text);
					shrStr.selectAllText();
				}

				var okButton = new qx.ui.form.Button("OK");
				okButton.setWidth(120);
				okButton.addListener("click", function(){intelExportWindow.disable();}, false);
				this.dialogBackground._add(okButton, {left: 445, top: 190});
			}
			return wdg;
		}
		
		function _parseIntelReport(r, data, eh) {
			if (r == true && data != null) {
				if (data.a != null && data.a.length > 0) {
					var hasIntel=false;
					var attackCityId = 0;
					var str = "";
					for (var i=0; i<data.a.length; i++) {
						var army = data.a[i];
						if (army.r != 0) // if not attack
							continue;
						var cityFound = false;
						for (var i=0;i<intelOsCityArray.length; i++) {
							if (intelOsCityArray[i].i == army.c) {
								cityFound = true;
								break;
							}
						}
						if (!cityFound) {
							attackCityId = army.c[0].i;
							var cityCoords = cityIdToCoodrinates(attackCityId);
							
							//str += army.pn+","+army.p+","+army.c[0].n+","+army.c[0].i+",";
							str += cityCoords + "," + army.pn + ",";
							for (var key in army.u)  {
								var unit = army.u[key];

								if (unit.o > 1) {
									var res = webfrontend.res.Main.getInstance();
									var unitInfo = res.units[unit.t];
									var unitName = "UNKNOWN_" + unit.t;
									if (unitInfo != null) unitName = unitInfo.dn;
									hasIntel = true;
									str += unit.o+" "+unitName+"("+unit.t+"); ";
								}
							}
						}
					}
					if (hasIntel && attackCityId != 0) {
						var newItem = {i:attackCityId, s: str};
						intelOsCityArray.push(newItem);
					}
				}
			} else {
				console.log(data);
			}
			intelLoadNextOsReport();
		}
		
		function _RaidDone() {
			var x = 1;
			// don't really need to do anything, but need to pass something....
		}
		
		function _AttackDone() {
			var x = 1;
		}
		
		function ConvertToUnixTime(m, d, y, h, n, s) {
			var cDate = new Date(Date.UTC(y, (TrimZeros(m)-1), TrimZeros(d), TrimZeros(h), TrimZeros(n), TrimZeros(s)));
			return (cDate.getTime()+1000);
		}
		
		function TrimZeros(vInput) {
			if((vInput.length > 1) && (vInput.substr(0,1) == "0")) {
				return vInput.substr(1);
			} else {
				return vInput;
			}
		}
		
		Date.prototype.add = function (sInterval, iNum){
			var dTemp = this;
			if (!sInterval || iNum == 0) return dTemp;
			switch (sInterval.toLowerCase()){
				case "ms":
					dTemp.setMilliseconds(dTemp.getMilliseconds() + iNum);
					break;
				case "s":
					dTemp.setSeconds(dTemp.getSeconds() + iNum);
					break;
				case "mi":
					dTemp.setMinutes(dTemp.getMinutes() + iNum);
					break;
				case "h":
					dTemp.setHours(dTemp.getHours() + iNum);
					break;
				case "d":
					dTemp.setDate(dTemp.getDate() + iNum);
					break;
				case "mo":
					dTemp.setMonth(dTemp.getMonth() + iNum);
					break;
				case "y":
					dTemp.setFullYear(dTemp.getFullYear() + iNum);
					break;
			}
			return dTemp;
		}
		
		function cityCoordinatesToId (x, y) {
			var id = parseInt(x, 10) | (parseInt(y, 10) << 16);
			return id;
		}
		
		function cityIdToCoodrinates (id) {
			var o = this.cityIdToCoordsObject(id);
			return o.xPos + ":" + o.yPos;
		}
		
		function cityIdToCoordsObject(id) {
			var o = {
				xPos: (id & 0xFFFF),
				yPos: (id >> 16),				
			}
			o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
			return o;
		}
		
		window.setTimeout(checkIfLoULoads_Atk, 15000);

	// ***** Check if the app has loaded ***** //
	function checkIfLoULoads_Atk() {
		var loadingScreen = document.getElementById("loadingscreen");
		if (loadingScreen) {
			if (loadingScreen.style.display == "block") {
				window.setTimeout(checkIfLoULoads_Atk, 15000);
			} else {
				LoUAttack = new LoUAttack();
				window.setTimeout("LoUAttack.init();", 15000);
			}
		} else {
			LoUAttack = new LoUAttack();
			window.setTimeout("LoUAttack.init();", 15000);
		}
	}

	function MassErrorReporting() {
		if (DEBUG_VERSION) {
			qx.event.GlobalError.setErrorHandler(MasshandleError, this);
		}
	}

	function MasshandleError(dp) {
		try {
			var dq = dp.toString();
			var cx = " ";
			if (dp.hasOwnProperty("fileName")) dq += cx + dp.fileName;
			if (dp.getUri != null) dq += cx + dp.getUri();
			if (dp.hasOwnProperty("lineNumber")) dq += cx + dp.lineNumber;
			if (dp.getLineNumber != null) dq += cx + dp.getLineNumber();
			if (dp.hasOwnProperty("stack")) dq += cx + dp.stack;
			dq = qx.util.Json.stringify(dq);
			var msg = "{error:" + dq + "}";
			console.log(msg);
			} catch (e) {
				console.log("Error in error handler " + e);
			}
	}
	
	}; // mainFunc
	
   var script = document.createElement("script");
   var cont = scriptContent.toString();
   cont = cont.slice(13, -1);
   cont = cont.substring(0, cont.length-1);
   script.innerHTML = cont;
   script.type = "text/javascript";
   document.getElementsByTagName("head")[0].appendChild(script);

})(); // outer shell