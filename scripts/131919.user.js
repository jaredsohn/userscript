// ==UserScript==
// @name           LOU Attack Scheduler
// @description    LOU Attack Scheduler
// @namespace      ATTACK_SCHEDULE
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        3.3.0
// ==/UserScript==

(function(){

var scriptContent = function() {

LouMassScheduler = function () {}

var cityScrapePName = -1;
var allianceExportText;
var allianceIndex = 0;
var allianceInfo = new Array();
var gRealGroup;

// Initialisation routine
LouMassScheduler.prototype.init = function() {
   currenttarget = false;
   knowncities = new Array();
   massdata = new Array();
   opts = null;
   raidSettings = null;

   DEBUG_VERSION = true;
   DEBUG_LOU = 1;
   DEBUG_LOU_STEP = 2;
   MassErrorReporting();
   SEND_CONFIRMATION_EMAIL = false;

   cityIntelArray = new Array();
   cityIntelIndex = 0;

   curCityId = -1;
   curTsMinimum = 0;

   // ***** City Layout Button ***** //
   var layoutButton = new qx.ui.form.Button("Attack");
   layoutButton.set({width: 50, appearance: "button-text-small", toolTipText: "Click to schedule mass attacks."});
   layoutButton.addListener("click", ShowMassScheduler, false);
   qx.core.Init.getApplication().cityInfoView.buildingQueue.header.add(layoutButton, {top: 33, left: 38});

   // Execute Plan Button
   qx.core.Init.getApplication().getMailPage();
   var ExecuteButton = new qx.ui.form.Button("Import Attack Plan");
   ExecuteButton.set({appearance: "button-text-small"});
   ExecuteButton.addListener("click", ExecuteAttackPlan, ExecuteButton);
   qx.core.Init.getApplication().mailPage.add(ExecuteButton, {top: 90, right: 5});

   // Intel Button
   qx.core.Init.getApplication().getCityInfoPage();
   var CityIntelButton = new qx.ui.form.Button("Gather Intel");
   CityIntelButton.set({appearance: "button-text-small", toolTipText: "Create an intel report"});
   CityIntelButton.addListener("click", CreateIntelReport, CityIntelButton);
   qx.core.Init.getApplication().cityInfoPage.add(CityIntelButton, {top: 3, right: 60});
   
   // Raid Button
   var raidButton = new qx.ui.form.Button("Raidzorz");
   raidButton.set({width:100, height:32});
   raidButton.addListener("click", ShowRaidScheduler, false);
   qx.core.Init.getApplication().dungeonDetailView.actionArea.add(raidButton, {left:120, top: 73});

   player = webfrontend.data.Player.getInstance(); py = player;
   alliance = webfrontend.data.Alliance.getInstance(); al = alliance;
   server = webfrontend.data.Server.getInstance();
   mail = webfrontend.data.Mail.getInstance();
   commands = webfrontend.net.CommandManager.getInstance();
   city = webfrontend.data.City.getInstance();
}

function scanPlayersCities(playerid)
{
   qx.core.Init.getApplication().showInfoPage(qx.core.Init.getApplication().getPlayerInfoPage(),{id:playerid});
   cityScrapePName = playerid;
}

function LoadNextReport()
{
  // Gather data recursively
  if (cityIntelIndex > 0) {
    var ownerName = qx.core.Init.getApplication().cityInfoPage.playerLabel.getValue();
    for (var i=cityIntelIndex-1; i>=0;i--)
    {
      var rowInfo = qx.core.Init.getApplication().cityInfoPage.headerData.getRowData(i);
      if (rowInfo==null)
	continue;
      if (rowInfo.on.search(ownerName) >=0)
      {
	if (rowInfo.s.search(": Assaulted by ") >= 0 ||
	    rowInfo.s.search(": Plundered by ") >= 0 ||
	    rowInfo.s.search(": Sieged by ") >= 0)
	{
	  cityIntelIndex = i;
	  webfrontend.net.CommandManager.getInstance().sendCommand("GetReport", {id: rowInfo.i}, this, _parseReport, cityIntelIndex);
	  return;
	}
      }
    }
  }

   // Build and show report
   if (cityIntelIndex >= 0) {
      var text = "";
      if (cityIntelArray.length > 0) {
         while (cityIntelArray.length > 0)
         {
            var line = cityIntelArray.shift();
            text += line.s + "\n";
         }
         exportwin = showExportWin(text);
         exportwin.showExportWin(text);
         qx.core.Init.getApplication().getDesktop().add(exportwin, {left: 0, right: 0, top: 0, bottom: 0});
	 exportwin.open();
      } else {
            var dialog = new webfrontend.gui.ConfirmationWidget();
            dialog.showGenericNotice("Gather Intel", "There was no worthy intelligence to gather", "", "webfrontend/ui/bgr_popup_survey.gif");
            qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
	    dialog.open();
      }
      cityIntelIndex = -1;
   }
}
function CreateIntelReport() {
   cityIntelIndex = qx.core.Init.getApplication().cityInfoPage.headerData.getRowCount();
   LoadNextReport();
}

function _parseReport(r, data, eh)
{
   if (r == true && data != null) {
      if (data.a != null && data.a.length > 0) {
         var hasIntel=false;
         var attackCityId = 0;
         var str = "";
         for (var i=0; i<data.a.length; i++)
         {
            var army = data.a[i];
            if (army.r != 0) // if not attack
               continue;
            var cityFound = false;
            for (var i=0;i<cityIntelArray.length; i++) {
               if (cityIntelArray[i].i == army.c) {
                  cityFound = true;
                  break;
               }
            }
            if (!cityFound) {
               attackCityId = army.c[0].i;
               // army.a=Alliance ai=AllianceID, c=cityId cn=cityName p=playerId pn=playerName u=unit array
               str += army.pn+","+army.p+","+army.c[0].n+","+army.c[0].i+",";
               for (var key in army.u)
               {
                  var unit = army.u[key];
                  // unit.t=Type o=startingAmount
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
            cityIntelArray.push(newItem);
         }
      }
   } else {
      console.log(data);
   }
   LoadNextReport();
}

function ExtractString(msg, heading, endOfLineString, startChar, endChar) {
      var iStart = msg.indexOf(heading)+heading.length;
      var iEnd = msg.indexOf(endOfLineString, iStart);
      var iDataStart = msg.lastIndexOf(startChar, iEnd)+1;
      var iDataEnd = msg.lastIndexOf(endChar, iEnd);
      if (iDataStart < 0 || iDataEnd < 0)
         return "";
      return msg.substring(iDataStart, iDataEnd);
}

function AddDecoy()
{
   if (qx.core.Init.getApplication().cityDetailView && qx.core.Init.getApplication().cityDetailView.city) {
      if (player.getName() != qx.core.Init.getApplication().cityDetailView.playerLabel.getValue() &&
         qx.core.Init.getApplication().cityDetailView.cityImage.getSource().indexOf("_military_") >= 0)
      {
         var text = CityBox.getValue();
         if (text.length > 0) text+="\n";
         var cx=qx.core.Init.getApplication().cityDetailView.city.get_Coordinates();
         var x=cx&0xFFFF;
         var y=cx>>16;
         text += x+":"+y;
         CityBox.setValue(text);
      }
   }
}

function SetRealTarget()
{
   if (qx.core.Init.getApplication().cityDetailView && qx.core.Init.getApplication().cityDetailView.city) {
      if (player.getName() != qx.core.Init.getApplication().cityDetailView.playerLabel.getValue() &&
         qx.core.Init.getApplication().cityDetailView.cityImage.getSource().indexOf("_military_") >= 0)
      {
         var cx=qx.core.Init.getApplication().cityDetailView.city.get_Coordinates();
         var x=cx&0xFFFF;
         var y=cx>>16;
         RealTarget.setValue(x+":"+y);
      }
   }
}


function PrepareEmail()
{
   var emailString = "";

   var m = MonthDrop.getSelection()[0].getModel()
   var d = DayDrop.getSelection()[0].getModel()
   var y = YearDrop.getSelection()[0].getModel()

   var h = HourDrop.getSelection()[0].getModel()
   var n = MinuteDrop.getSelection()[0].getModel()
   var s = SecondDrop.getSelection()[0].getModel()

   var humDate = new Date(y, (nozeros(m)-1), nozeros(d), nozeros(h), nozeros(n), nozeros(s));
   var reftime = humDate.getTime();

   var attackTime = reftime;
   emailString += "[b]Troop Attack Time[/b]: "+m+" "+d+" "+y+" @ "+h+" : "+n+" : "+s+" ("+attackTime+")\n";
   emailString += "[b]WG Attack Time[/b]: One Second Later ("+(attackTime+1000)+")\n\n";
   emailString += "Coordinates: [city]"+RealTarget.getValue()+"[/city]\n\n";
   emailString += "[b]Decoys[/b]:\n";
   var cmds = CityBox.getValue().split("\n");
   if (typeof(cmds) == "object" && cmds.length) {
      for (var k = 0; k < cmds.length; k++) {
         if (cmds[k] == "") continue;
         emailString += "[city]"+cmds[k]+"[/city]\n";
      }
   }
   emailString += "\n\nEnd of Message";

   if(qx.core.Init.getApplication().sendMail != null && qx.core.Init.getApplication().currentOverlay==qx.core.Init.getApplication().sendMail && qx.core.Init.getApplication().sendMail.hasUnsaved()) {
      exportwin = showExportWin(emailString);
      exportwin.showExportWin(emailString);
      qx.core.Init.getApplication().getDesktop().add(exportwin, {left: 0, right: 0, top: 0, bottom: 0});
   } else {
      qx.core.Init.getApplication().switchOverlay();
      qx.core.Init.getApplication().showSendMail(null,null,null,null,null,0);
      qx.core.Init.getApplication().sendMail.message.setValue(emailString);
      qx.core.Init.getApplication().sendMail.subject.setValue("ATTACK ASSIGNMENT");
   }
}


   function ExecuteAttackPlan() {
            var err = 0;
            if (qx.core.Init.getApplication().getMailPage().__Ov.$$user_value != "ATTACK ASSIGNMENT") {
                err = 1;
               // alert("Error 1 - Msg subject invalid");
            } else {
               // alert("Step 1 - Msg subject ok");
                err = 0;
                var msg = qx.core.Init.getApplication().getMailPage().__OK;
                var sTroopAttackTick = ExtractString(msg, "[b]Troop Attack Time[/b]", "\n", "(", ")");
                //alert(sTroopAttackTick);
                var sWGAttackTick = ExtractString(msg, "[b]WG Attack Time[/b]", "\n", "(", ")");
               // alert(sWGAttackTick);
                var sAttackTarget = ExtractString(msg, "Coordinates: ", "\n", "[city]", "[/city]").substr(5, 7);
                //alert(sAttackTarget);
                var decoyString = "";
                if (sTroopAttackTick == "" || sWGAttackTick == "") {
                    err = 1;
                 //  alert("Error 2 - Extracted variables not ok");
                } else {
                 //  alert("Step 2 - Extracted variables ok");
                    var searchString = "[b]Decoys[/b]:\n";
                    var sDecoys = new Array();
                    var index = 0;
                    for (; ; ) {
                        sCurDecoy = ExtractString(msg, searchString, "\n", "[city]", "[/city]").substr(5, 7);
                      //alert(sCurDecoy);
                        if (sCurDecoy.length !=7 || sCurDecoy==sDecoys[index-1] || index > 15)
                            break;
                        decoyString += sCurDecoy + "\n";
                        sDecoys[index++] = sCurDecoy;
                        searchString = "[city]" + sCurDecoy + "[/city]" + "\n";
                       // alert(searchString);
                    }
                //    alert("Step 3 - Collected all fake targets");
                }
            }

            if (err == 0) {
              // alert("Step 4 - Opening Scheduler");
                ShowMassScheduler();

      var humDate = new Date();
      if (CityHasArtillery)
         humDate.setTime(sWGAttackTick);
      else
         humDate.setTime(sTroopAttackTick);
      DayDrop.setSelection([DayDrop.getChildren()[humDate.getDate()-1]]);
      MonthDrop.setSelection([MonthDrop.getChildren()[humDate.getMonth()]]);
      HourDrop.setSelection([HourDrop.getChildren()[humDate.getHours()]]);
      MinuteDrop.setSelection([MinuteDrop.getChildren()[humDate.getMinutes()]]);
      SecondDrop.setSelection([SecondDrop.getChildren()[humDate.getSeconds()]]);
      CityBox.setValue(decoyString);
      RealTarget.setValue(sAttackTarget);
     decoyUnitTypeChanged();
   } else {
      var dialog = new webfrontend.gui.ConfirmationWidget();
      dialog.showGenericNotice("Execute Attack Plan", "This is not a valid attack plan email", "", "webfrontend/ui/bgr_popup_survey.gif");
      qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
   }
}

function onClickTroopTotal(e)
{
}

function showExportWin(text) {
   var wdg = new webfrontend.gui.ConfirmationWidget();
   wdg.showExportWin = function(text) {

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
      okButton.addListener("click", function(){exportwin.disable();}, false);
      this.dialogBackground._add(okButton, {left: 445, top: 190});
   }
   return wdg;
}

function setMinimumTSLabel()
{
   var cityCount = webfrontend.data.Player.getInstance().getNumCities();
   var resMainInstance=webfrontend.res.Main.getInstance();
   var cityRange = 0;
   curTsMinimum = 0;

   for(var i=0; i<resMainInstance.combatAttackCity.c.length; i++) {
      var levelInfo = resMainInstance.combatAttackCity.c[i];
      if (levelInfo.c <= cityCount) {
         curTsMinimum = levelInfo.m;
      }
      else break;
   }

   var cityInfo = webfrontend.data.City.getInstance();
   var maxUnitCount = Math.max(cityInfo.getUnitLimit(),cityInfo.getUnitCount());
   for(var i=0; i<resMainInstance.combatAttackCity.u.length; i++) {
      var levelInfo = resMainInstance.combatAttackCity.u[i];
      if (levelInfo.c <= maxUnitCount) {
         if (curTsMinimum < levelInfo.m)
            curTsMinimum = levelInfo.m;
      }
      else break;
   }
   MinTSPerFake.setValue("(Min: "+curTsMinimum+"TS)");
}

function ShowMassScheduler() {
   if (!opts) {   // Don't reload the page, otherwise you lose the settings
      RealTarget = null;
      gUnitTypeUpdating = false;

      opts = new webfrontend.gui.OverlayWidget();
      opts.clientArea.setLayout(new qx.ui.layout.VBox());
      opts.setTitle("War Minister Mass Scheduler - Version 3.3.0");
      opts.addListener("appear",optsopen, this);
      opts.addListener("disappear",optsclose, this);

   // Save Button
      var co1_opt = new qx.ui.container.Composite(new qx.ui.layout.Basic());

      var buttonArea = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      saveButton = new qx.ui.form.Button("Schedule").set({width: 120});
      saveButton.addListener("click", function(){ScheduleAttacks_Step1();qx.core.Init.getApplication().switchOverlay(null);}, false);
      saveButton.setEnabled(false);

      mailPlanButton = new qx.ui.form.Button("Mail").set({width: 120});
      mailPlanButton.addListener("click", function(){PrepareEmail();}, false);

      buttonArea.add(saveButton);
      buttonArea.add(new qx.ui.core.Spacer(25));
      buttonArea.add(mailPlanButton);
      co1_opt.add(buttonArea, {left: 10});
      // var tv = new qx.ui.tabview.TabView(); // tabview

   // Unit Type 1
      var UnitLabel = new qx.ui.basic.Label("Unit Type").set({width:85});
      var col1 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      UnitDrop=new qx.ui.form.SelectBox();
      UnitDrop.setWidth(150);
      UnitDrop.setHeight(29);
      resetUnits(UnitDrop);
      UnitDrop.setToolTipText("Select the type of unit to send on the mass attack");
      UnitDrop.addListener("changeSelection", function onDecoyUnitTypeChanged() {
               decoyUnitTypeChanged();
         }, false);

      col1.add(UnitLabel);
      col1.add(new qx.ui.core.Spacer(25));
      col1.add(UnitDrop);

	  // Unit Type 2

	  var UnitLabel2 = new qx.ui.basic.Label("Unit Type 2").set({width:85});
      var col13 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      UnitDrop2=new qx.ui.form.SelectBox();
      UnitDrop2.setWidth(150);
      UnitDrop2.setHeight(29);
      resetUnits(UnitDrop2);
      UnitDrop2.setToolTipText("Select the type of unit to send on the mass attack");
      UnitDrop2.addListener("changeSelection", function onDecoyUnitTypeChanged () {
              decoyUnitTypeChanged ();
         }, false);

      col13.add(UnitLabel2);
      col13.add(new qx.ui.core.Spacer(25));
      col13.add(UnitDrop2);

   // Attack Type
      var AttackLabel = new qx.ui.basic.Label("Attack Type").set({width:85});
      var col12 = new qx.ui.container.Composite(new qx.ui.layout.HBox());

      AttackDrop=new qx.ui.form.SelectBox();
      AttackDrop.setWidth(150);
      AttackDrop.setHeight(29);
      AttackDrop.add(new qx.ui.form.ListItem("Scout",null,1));
      AttackDrop.add(new qx.ui.form.ListItem("Plunder",null,2));
      AttackDrop.add(new qx.ui.form.ListItem("Assault",null,3));
      AttackDrop.add(new qx.ui.form.ListItem("Support",null,4));
      AttackDrop.add(new qx.ui.form.ListItem("Siege",null,5));
	  AttackDrop.add(new qx.ui.form.ListItem("Raid",null,8));
      AttackDrop.setSelection([AttackDrop.getChildren()[2]]);
      col12.add(AttackLabel);
      col12.add(new qx.ui.core.Spacer(25));
      col12.add(AttackDrop);

   // Unit Count
      var NumOfUnitsToSendLabel = new qx.ui.basic.Label("Units per Attack").set({ width:85 });
      var colCount = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      colCount.setAlignY("middle");

      NumOfUnitsToSend = new qx.ui.form.TextField("1").set({ maxLength: 6 });

      MinTSPerFake = new qx.ui.basic.Label("");
      setMinimumTSLabel();

      colCount.add(NumOfUnitsToSendLabel);
      colCount.add(new qx.ui.core.Spacer(25));
      colCount.add(NumOfUnitsToSend);
      colCount.add(MinTSPerFake);

	  // Unit Count 2
      var NumOfUnitsToSendLabel2 = new qx.ui.basic.Label("Units per Attack").set({ width:85 });
      var colCount2 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      colCount2.setAlignY("middle");

      NumOfUnitsToSend2 = new qx.ui.form.TextField("0").set({ maxLength: 6 });

      MinTSPerFake = new qx.ui.basic.Label("");
      setMinimumTSLabel();

      colCount2.add(NumOfUnitsToSendLabel2);
      colCount2.add(new qx.ui.core.Spacer(25));
      colCount2.add(NumOfUnitsToSend2);
      colCount2.add(MinTSPerFake);

   // Date
      var today = new Date();
      var d = new Date(today.getTime() + (24 * 60 * 60 * 1000));
      var curr_date = d.getDate();
      var curr_month = d.getMonth();
      var curr_year = d.getFullYear();

      var col2 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      var DateLabel = new qx.ui.basic.Label("Arrival Date:").set({width:85});
      MonthDrop=new qx.ui.form.SelectBox();
      MonthDrop.setWidth(50);
      MonthDrop.setHeight(29);
      for (var i = 1; i < 13; i++) {
         MonthDrop.add(new qx.ui.form.ListItem(i,null,i));
      }
      MonthDrop.setSelection([MonthDrop.getChildren()[curr_month]]);

      DayDrop=new qx.ui.form.SelectBox();
      DayDrop.setWidth(50);
      DayDrop.setHeight(29);
      for (var i = 1; i < 32; i++) {
         DayDrop.add(new qx.ui.form.ListItem(i,null,i));
      }
      DayDrop.setSelection([DayDrop.getChildren()[curr_date-1]]);

      YearDrop=new qx.ui.form.SelectBox();
      YearDrop.setWidth(65);
      YearDrop.setHeight(29);
      for (var i = 2012; i < 2014; i++) {
         YearDrop.add(new qx.ui.form.ListItem(i,null,i));
      }

      col2.add(DateLabel);
      col2.add(new qx.ui.core.Spacer(25));
      col2.add(MonthDrop);
      col2.add(DayDrop);
      col2.add(YearDrop);

   // Time
      var col3 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      var TimeLabel = new qx.ui.basic.Label("Arrival Time:").set({width:85});
      HourDrop=new qx.ui.form.SelectBox();
      HourDrop.setWidth(50);
      HourDrop.setHeight(29);
      for (var i = 0; i < 24; i++) {
      HourDrop.add(new qx.ui.form.ListItem(String(i),null,i));
      }
      HourDrop.setSelection([HourDrop.getChildren()[10]]);

      MinuteDrop=new qx.ui.form.SelectBox();
      MinuteDrop.setWidth(50);
      MinuteDrop.setHeight(29);
      for (var i = 0; i < 60; i++) {
         MinuteDrop.add(new qx.ui.form.ListItem(String(i),null,i));
      }
      MinuteDrop.setSelection([MinuteDrop.getChildren()[1]]);

      SecondDrop=new qx.ui.form.SelectBox();
      SecondDrop.setWidth(65);
      SecondDrop.setHeight(29);
      for (var i = 0; i < 60; i++) {
         SecondDrop.add(new qx.ui.form.ListItem(String(i),null,i));
      }
      SecondDrop.setSelection([SecondDrop.getChildren()[0]]);

      col3.add(TimeLabel);
      col3.add(new qx.ui.core.Spacer(25));
      col3.add(HourDrop);
      col3.add(MinuteDrop);
      col3.add(SecondDrop);

   // City box
      var DecoyLabelHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      var plusButton = new qx.ui.form.Button("+");
      plusButton.addListener("click", function(){AddDecoy();}, false);
      var CityLabel = new qx.ui.basic.Label("Decoy Coordinates (Limit 16 Lines)");
      DecoyLabelHBox.add(CityLabel);
      DecoyLabelHBox.add(plusButton);
      DecoyLabelHBox.setAlignY("bottom");

      CityBox = new qx.ui.form.TextArea("").set({height:60, allowGrowX:true,allowGrowY:false,maxLength:600, tabIndex: 303}); cb = CityBox;
      CityBox.addListener("focusout",hotkeys,this);
      CityBox.addListener("focusin",nohotkeys,this);

   // Page 1
      // var p1 = new qx.ui.tabview.Page("Scheduler");
      // p1.setLayout(new qx.ui.layout.VBox());
      var p1 = opts.clientArea;


   // Add to page
      p1.add(new qx.ui.core.Spacer(0,10));
      p1.add(col2);
      p1.add(new qx.ui.core.Spacer(0,10));
      p1.add(col3);


      var troopRow = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      var decoyGroup = new qx.ui.groupbox.GroupBox("Decoys");
      decoyGroup.setLayout(new qx.ui.layout.VBox());

      decoyGroup.setLayout(new qx.ui.layout.VBox());
      decoyGroup.add(col1);
      decoyGroup.add(new qx.ui.core.Spacer(0,10));
      decoyGroup.add(colCount);
      decoyGroup.add(new qx.ui.core.Spacer(0,10));
      decoyGroup.add(col13);
      decoyGroup.add(new qx.ui.core.Spacer(0,10));
      decoyGroup.add(colCount2);
      decoyGroup.add(new qx.ui.core.Spacer(0,10));
      decoyGroup.add(col12);
      decoyGroup.add(new qx.ui.core.Spacer(0,10));
      decoyGroup.add(DecoyLabelHBox);
      decoyGroup.add(CityBox, {flex:1});

      var RealGroup = new qx.ui.groupbox.GroupBox("Real Attack");
      gRealGroup = RealGroup;
      RealGroup.setLayout(new qx.ui.layout.VBox());

      troopRow.add(RealGroup);
      troopRow.add(decoyGroup);

      p1.add(troopRow);
      p1.add(new qx.ui.core.Spacer(0,30));
      p1.add(co1_opt);

      updateCityInfo();

      //tv.add(p1);
      // opts.clientArea.add(tv, {top: 5, bottom: 35});

   } else {
      if (curCityId != webfrontend.data.City.getInstance().getId())
         resetUnits(UnitDrop);
		 resetUnits(UnitDrop2);
   }

   qx.core.Init.getApplication().switchOverlay(opts);
}

function optsopen () {
   webfrontend.data.City.getInstance().addListener("changeVersion",resetUnits,opts);
}

function optsclose () {
   webfrontend.data.City.getInstance().removeListener("changeVersion",resetUnits,opts);
}

function ShowRaidScheduler () {
	var dDetailView = qx.core.Init.getApplication().dungeonDetailView
	var dDungeonLevel = dDetailView.city.get_Level()
	var dDungeonProgress = dDetailView.city.get_Progress()
	var iRecommendedUnits = 0
	
	targetDungeon = null;
	raidSettings = new webfrontend.gui.OverlayWidget();
	raidSettings.clientArea.setLayout(new qx.ui.layout.VBox());
	raidSettings.setTitle("War Minister Raid Scheduler - Version 0.0.1");
	raidSettings.addListener("appear", raidOpen, this);
	raidSettings.addListener("disappear", raidClose, this);
	var raidPage1 = raidSettings.clientArea;
	
	did = dDetailView.city.get_Coordinates(); posX = did & 0xFFFF; posY = did >> 16;
	
	// Go Button
	var cntRaid1 = new qx.ui.container.Composite(new qx.ui.layout.Basic());
	
	var raidButtonArea = new qx.ui.container.Composite(new qx.ui.layout.HBox());
	goButton = new qx.ui.form.Button("Raid").set({width:120});
	goButton.addListener("click", function(){ScheduleRaid_Click();qx.core.Init.getApplication().switchOverlay(null);}, false);
	
	raidButtonArea.add(goButton)
	cntRaid1.add(raidButtonArea, {left:10});
	
	// Dungeon Coords
	var raidDungeonLabel = new qx.ui.basic.Label("Dungeon Coords").set({width:85});
	var colTargetDungeon = new qx.ui.container.Composite(new qx.ui.layout.HBox());		
	raidTargetDungeon = new qx.ui.form.TextField(posX + ":" + posY).set({ maxLength: 7 });
	
	colTargetDungeon.add(raidDungeonLabel);
	colTargetDungeon.add(new qx.ui.core.Spacer(30));
	colTargetDungeon.add(raidTargetDungeon);
	
	// Number of Raids
	var raidNumRaidsLabel = new qx.ui.basic.Label("# of Raids").set({width:85});
	var colNumRaids = new qx.ui.container.Composite(new qx.ui.layout.HBox());
	raidNumRaids = new qx.ui.form.TextField("1").set({maxLength: 2 });
	
	colNumRaids.add(raidNumRaidsLabel)
	colNumRaids.add(new qx.ui.core.Spacer(30));
	colNumRaids.add(raidNumRaids);
	
	// Unit Type 1
	var raidUnitLabel = new qx.ui.basic.Label("Unit Type").set({width:85});
	var colRaid1 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
	raidUnitDrop = new qx.ui.form.SelectBox();
	raidUnitDrop.setWidth(150);
	raidUnitDrop.setHeight(29);
	//resetRaidUnits(raidUnitDrop);
	raidUnitDrop.setToolTipText("Select the type of unit to send on the raid");
	//UnitDrop.addListener("changeSelection", function onDecoyUnitTypeChanged() {
	//	   decoyUnitTypeChanged();
	// }, false);

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
	//UnitDrop2.addListener("changeSelection", function onDecoyUnitTypeChanged () {
	//	  decoyUnitTypeChanged ();
	// }, false);

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
	var raidNumTroops = new qx.ui.basic.Label("0").set({width:85});
	var colNumTroops = new qx.ui.container.Composite(new qx.ui.layout.HBox());
	
	colNumTroops.add(raidNumTroopsLabel)
	colNumTroops.add(new qx.ui.core.Spacer(30));
	colNumTroops.add(raidNumTroops);

	// Add to Group - Left side of widget
	var raidTroopRow = new qx.ui.container.Composite(new qx.ui.layout.HBox());
	var raidRaidGroup = new qx.ui.groupbox.GroupBox("Raidzorz");
	raidRaidGroup.setLayout(new qx.ui.layout.VBox());

	raidRaidGroup.add(colTargetDungeon);
	raidRaidGroup.add(new qx.ui.core.Spacer(0,10));
	raidRaidGroup.add(colNumRaids);
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
	// This call is almost definitely wrong.  Will need to find the actual property in-game
	var raidDungeonLevelLabel = new qx.ui.basic.Label("Dungeon Level").set({width:85});
	var raidDungeonLevel = new qx.ui.basic.Label(dDungeonLevel).set({width:85});	
	var colDungeonLevel = new qx.ui.container.Composite(new qx.ui.layout.HBox());
	
	colDungeonLevel.add(raidDungeonLevelLabel);
	colDungeonLevel.add(new qx.ui.core.Spacer(30));
	colDungeonLevel.add(raidDungeonLevel);
	
	// Dungeon %
	// This call is almost definitely wrong.  Will need to find the actual property in-game
	var sDisplayProgress = "-1";
	if (dDungeonProgress == 0) {
			sDisplayProgress = "0%";
	} else {
			sDisplayProgress = dDungeonProgress + "%";
	}
	var raidDungeonProgressLabel = new qx.ui.basic.Label("Dungeon %").set({width:85});
	var raidDungeonProgress = new qx.ui.basic.Label(sDisplayProgress).set({width:85});
	var colDungeonProgress = new qx.ui.container.Composite(new qx.ui.layout.HBox());
	
	colDungeonProgress.add(raidDungeonProgressLabel);
	colDungeonProgress.add(new qx.ui.core.Spacer(30));
	colDungeonProgress.add(raidDungeonProgress);
	
	// Recommended Troops - hardcoded from wiki
	var raidTroopLabel_Level01 = new qx.ui.basic.Label("Level 01").set({width:85});
	var raidTroopRecmd_Level01 = new qx.ui.basic.Label("15").set({width:85});
	var raidTroopLabel_Level02 = new qx.ui.basic.Label("Level 02").set({width:85});
	var raidTroopRecmd_Level02 = new qx.ui.basic.Label("75").set({width:85});
	var raidTroopLabel_Level03 = new qx.ui.basic.Label("Level 03").set({width:85});
	var raidTroopRecmd_Level03 = new qx.ui.basic.Label("420").set({width:85});
	var raidTroopLabel_Level04 = new qx.ui.basic.Label("Level 04").set({width:85});
	var raidTroopRecmd_Level04 = new qx.ui.basic.Label("1080").set({width:85});
	var raidTroopLabel_Level05 = new qx.ui.basic.Label("Level 05").set({width:85});
	var raidTroopRecmd_Level05 = new qx.ui.basic.Label("4200").set({width:85});
	var raidTroopLabel_Level06 = new qx.ui.basic.Label("Level 06").set({width:85});
	var raidTroopRecmd_Level06 = new qx.ui.basic.Label("6800").set({width:85});
	var raidTroopLabel_Level07 = new qx.ui.basic.Label("Level 07").set({width:85});
	var raidTroopRecmd_Level07 = new qx.ui.basic.Label("15000").set({width:85});
	var raidTroopLabel_Level08 = new qx.ui.basic.Label("Level 08").set({width:85});
	var raidTroopRecmd_Level08 = new qx.ui.basic.Label("37500").set({width:85});
	var raidTroopLabel_Level09 = new qx.ui.basic.Label("Level 09").set({width:85});
	var raidTroopRecmd_Level09 = new qx.ui.basic.Label("40000").set({width:85});
	var raidTroopLabel_Level10 = new qx.ui.basic.Label("Level 10").set({width:85});
	var raidTroopRecmd_Level10 = new qx.ui.basic.Label("60000").set({width:85});
	
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
	raidTroopRow.add(raidInfoGroup);

	
	// Dungeon Coords
	// raidPage1.add(new qx.ui.core.Spacer(0,10));
	// raidPage1.add(colTargetDungeon);
	// Number of Raids
	// raidPage1.add(new qx.ui.core.Spacer(0,10));
	// raidPage1.add(colNumRaids);
	// Unit Type 1
	// raidPage1.add(new qx.ui.core.Spacer(0,10));
	// raidPage1.add(colRaid1);
	// Unit Count 1
	// raidPage1.add(new qx.ui.core.Spacer(0,10));
	// raidPage1.add(colRaidTroops1)
	// Unit Type 2
	// raidPage1.add(new qx.ui.core.Spacer(0,10));
	// raidPage1.add(colRaid2);
	// Unit Count 2
	// raidPage1.add(new qx.ui.core.Spacer(0,10));
	// raidPage1.add(colRaidTroops2)

	
	// Add default calculated values
	var cInfo = webfrontend.data.City.getInstance();
	var lut = webfrontend.res.Main.getInstance().units;
	var troopTypeCount = 0;
	var iTotalTroops1 = 0;
	var iTotalTroops2 = 0;
	
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
	
	var iTotalTroops = iTotalTroops1 + iTotalTroops2;
	if (dDungeonProgress == 0) {
		var iNumber = 1;
	} else {
		var iNumber = 1 + (dDungeonProgress / 100);
	}
	
	switch(dDungeonLevel) {
		case 1:
			iRecommendedUnits = Math.floor(15 * (iNumber));
			break;
		case 2:
			iRecommendedUnits = Math.floor(75 * (iNumber));
			break;
		case 3:
			iRecommendedUnits = Math.floor(420 * (iNumber));
			break;
		case 4:
			iRecommendedUnits = Math.floor(1080 * (iNumber));
			break;
		case 5:
			iRecommendedUnits = Math.floor(4200 * (iNumber));
			break;
		case 6:
			iRecommendedUnits = Math.floor(6800 * (iNumber));
			break;
		case 7:
			iRecommendedUnits = Math.floor(15000 * (iNumber));
			break;
		case 8:
			iRecommendedUnits = Math.floor(37500 * (iNumber));
			break;
		case 9:
			iRecommendedUnits = Math.floor(40000 * (iNumber));
			break;
		case 10:
			iRecommendedUnits = Math.floor(60000 * (iNumber));
			break;
	}
	
	// Account for units with 2 TS per unit
	var u = raidUnitDrop.getSelection()[0].getModel();
	switch(u) {
		case 10:
		//Pally - Cut units in half due to loot
			var iTemp = iRecommendedUnits * .5;
			iRecommendedUnits = iTemp;
			break;
		case 11:
		//Knight - Cut units by 75% due to loot
			var iTemp = iRecommendedUnits * .75;
			iRecommendedUnits = iTemp;
			break;
	}
	
	// need to set avail commands, pull from other script
	var unitOrders = city.getUnitOrders();
	var commandsInUse = 0;
	if (unitOrders != null) {
		for (var c = 0, len=unitOrders.length; c<len; c++) {
			commandsInUse += 1;
		}
	} else {
		commandsInuse = 0;
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
		var ATN = iRecommendedUnits * iNumRaids;
		var iUnitsToUse1 = Math.ceil((iRecommendedUnits * ttRatio1));
		var iUnitsToUse2 = Math.ceil((iRecommendedUnits * ttRatio2));
		
		raidNumUnits.setValue(iUnitsToUse1.toString());
		raidNumUnits2.setValue(iUnitsToUse2.toString());
		
		var iDisplay = (iUnitsToUse1 + iUnitsToUse2) * iNumRaids
	raidNumTroops.setValue(ATN.toString())
	} else {
		alert("Raids works out to zero.  Please manually enter information.");
	}	
	
	// Add to page
	// Container that has the group boxes in it
	raidPage1.add(new qx.ui.core.Spacer(0,10));
	raidPage1.add(raidTroopRow);
	
	// Button
	raidPage1.add(new qx.ui.core.Spacer(0,30));
	raidPage1.add(raidButtonArea);
	
	qx.core.Init.getApplication().switchOverlay(raidSettings);
}

function raidOpen () {
   webfrontend.data.City.getInstance().addListener("changeVersion",resetRaidUnits,raidSettings);
}

function raidClose () {
   webfrontend.data.City.getInstance().removeListener("changeVersion",resetRaidUnits,raidSettings);
}

function ScheduleRaid_Click() {
	var u = raidUnitDrop.getSelection()[0].getModel();
	var u2 = raidUnitDrop2.getSelection()[0].getModel();
	var nu = raidNumUnits.getValue();
	var nu2 = raidNumUnits2.getValue();
	var iRaids = raidNumRaids.getValue();
	var tc = raidTargetDungeon.getValue();

	var f = new Array();

	if (u == 15 || u == 16 || u == 17 || u2 == 15 || u2 == 16 || u2 == 17) {
		t = 2;
	} else {
		t = 1;
	}

	if (nu2 !=0) {
		f.push({t:u,c:nu},{t:u2,c:nu2})
	} else {
		f.push({t:u,c:nu})
	}	

	var wm = webfrontend.data.Player.getInstance().getMinisterMilitaryPresent();	
	if (wm) {
		for (var i = 0; i < iRaids; i++) {
			raidWait(900)
			ScheduleRaid(u,u2,nu,nu2,iRaids,tc,t,f)
		}
	}
}

function raidWait(ms) {
	// setTimeout is retarded.  Stole this from the interwebs.
	// javascript can suck it.
	ms += new Date().getTime();
	while (new Date() < ms){}
}

function ScheduleRaid (u,u2,nu,nu2,iRaids,tc,t,f) {
	
	//for (var i = 0; i < iRaids; i++) {
		webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
			{cityid:webfrontend.data.City.getInstance().getId(),
			units:f,
			targetPlayer:null,
			targetCity:tc,
			order:8,						// Dungeon Raid
			transport:t,
			timeReferenceType:1,			// Now
			referenceTimeUTCMillis:0,		// ???
			raidTimeReferenceType:1,		// Until Complete
			raidReferenceTimeUTCMillis:0
			}, this, null);
			
		//window.setTimeout(raidWait, 600)
	//}
}

function nohotkeys() {
   qx.core.Init.getApplication().allowHotKey = false;
}

function hotkeys() {
   qx.core.Init.getApplication().allowHotKey = true;
}

function AddTroopInfo() {
   RealUnitCount = new Array();
   CityHasArtillery = false;
   var cInfo = webfrontend.data.City.getInstance();
   var lut = webfrontend.res.Main.getInstance().units;
   for (var i in lut) {
      if (lut[i] && lut[i].a && lut[i].f > 0) {
         for (var b in cInfo.units) {
            if (b == i) {
				if (lut[b].avb+lut[b].avd > 0) CityHasArtillery = true;
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
                                 },
                                    this);
               row.add(label);
               row.add(RealUnitCount[i]);
               row.add(sep);
               row.add(total);
               gRealGroup.add(row);
            }
         }
      }
   }
   gRealGroup.add(new qx.ui.core.Spacer(0,20));
   RealAttackDrop=new qx.ui.form.SelectBox();
   RealAttackDrop.setWidth(150);
   RealAttackDrop.setHeight(29);
   RealAttackDrop.add(new qx.ui.form.ListItem("Scout",null,1));
   RealAttackDrop.add(new qx.ui.form.ListItem("Plunder",null,2));
   RealAttackDrop.add(new qx.ui.form.ListItem("Assault",null,3));
   RealAttackDrop.add(new qx.ui.form.ListItem("Support",null,4));
   RealAttackDrop.add(new qx.ui.form.ListItem("Siege",null,5));
   RealAttackDrop.add(new qx.ui.form.ListItem("Raid",null,8));
   RealAttackDrop.setSelection([RealAttackDrop.getChildren()[4]]);

   var row = new qx.ui.container.Composite(new qx.ui.layout.HBox());
   row.setAlignY("bottom");
   RealTargetLabel = new qx.ui.basic.Label("Coordinates").set({width:85});
   RealTarget = new qx.ui.form.TextField().set({ maxLength: 7 });
   var setButton = new qx.ui.form.Button("+");
   setButton.addListener("click", function(){SetRealTarget();}, false);
   row.add(RealTargetLabel);
   row.add(RealTarget);
   row.add(setButton);

   gRealGroup.add(RealAttackDrop);
   gRealGroup.add(new qx.ui.core.Spacer(0,10));
   gRealGroup.add(row);
}

function decoyUnitTypeChanged(unitType)
{
   if (!gUnitTypeUpdating && UnitDrop.getSelection() && UnitDrop.getSelection()[0]) {
      var unitType = UnitDrop.getSelection()[0].getModel();
      var lut = webfrontend.res.Main.getInstance().units;
      if (unitType && unitType > 0 && curTsMinimum > 0) {
         var minUnit = Math.ceil(curTsMinimum/lut[unitType].uc);
         NumOfUnitsToSend.setValue(minUnit.toString());
         if (RealUnitCount[unitType]) {
            var nDecoys = 0;
            var cmds = CityBox.getValue().split("\n");
            if (typeof(cmds) == "object") {
               for (var k = 0; k < cmds.length; k++) {
                  if (cmds[k] != "") nDecoys++;
               }
            }
            RealUnitCount[unitType].setValue((webfrontend.data.City.getInstance().units[unitType].total-(nDecoys*minUnit)).toString());
         }
      }
   } else {
   }
}

function updateCityInfo()
{
   if (gRealGroup) {
      var value = "";
      if (RealTarget && RealTarget != null && typeof(RealTarget) == 'object') {
         value = RealTarget.getValue();
      }

      gRealGroup.removeAll();
      AddTroopInfo();

      if (value != "") {
         RealTarget.setValue(value);
      }

      setMinimumTSLabel();
      if (UnitDrop.getSelection() && UnitDrop.getSelection().length > 0)
         decoyUnitTypeChanged(UnitDrop.getSelection()[0].getModel());
	  if (UnitDrop2.getSelection() && UnitDrop2.getSelection().length > 0)
         decoyUnitTypeChanged(UnitDrop2.getSelection()[0].getModel());
   }
}

//function resetUnits() {
//   var cInfo = webfrontend.data.City.getInstance();
//   curCityId = cInfo.getId();
//   saveButton.setEnabled(false);
//
//   gUnitTypeUpdating = true;
//   UnitDrop.removeAll();
//   var lut = webfrontend.res.Main.getInstance().units;
//   var unitDropSelect = 0;
//   var unitDropSelect2 = 0;
//   var countUnitTS = 0;
//   var countUnitTS2 = 0;
//   for (var i in lut) {
//      if (lut[i] && lut[i].a && lut[i].f > 0) {
//         for (var b in cInfo.units) {
//            if (b == i) {
//               saveButton.setEnabled(true);
//               var newItem = new qx.ui.form.ListItem(lut[i].dn,null,i);
//               UnitDrop.add(newItem);
//               if (cInfo.units[b].count * lut[i].uc > countUnitTS) {
//                  countUnitTS = cInfo.units[b].count * lut[i].uc;
//                  unitDropSelect = newItem;
//               }
//            }
//        }
//      }
//   }
//   updateCityInfo();
//
//   gUnitTypeUpdating = false;
//   if (countUnitTS > 0) {
//      var itemSelect = new Array(unitDropSelect);
//      UnitDrop.setSelection(itemSelect);
//   }
//   decoyUnitTypeChanged();
//}

function resetUnits(UD) {
   var cInfo = webfrontend.data.City.getInstance();
   curCityId = cInfo.getId();
   saveButton.setEnabled(false);

   gUnitTypeUpdating = true;
   UD.removeAll();
   var lut = webfrontend.res.Main.getInstance().units;
   var unitDropSelect = 0;
   var countUnitTS = 0;
   for (var i in lut) {
      if (lut[i] && lut[i].a && lut[i].f > 0) {
         for (var b in cInfo.units) {
            if (b == i) {
               saveButton.setEnabled(true);
               var newItem = new qx.ui.form.ListItem(lut[i].dn,null,i);
               UD.add(newItem);
               if (cInfo.units[b].count * lut[i].uc > countUnitTS) {
                  countUnitTS = cInfo.units[b].count * lut[i].uc;
                  unitDropSelect = newItem;
               }
            }
         }
      }
   }
   updateCityInfo();

   gUnitTypeUpdating = false;
   if (countUnitTS > 0) {
      var itemSelect = new Array(unitDropSelect);
      UD.setSelection(itemSelect);
   }
   decoyUnitTypeChanged();
}

function resetRaidUnits(UD, UD2) {
	var cInfo = webfrontend.data.City.getInstance();
	var unitTypeCount = 0
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
				if (b == i) {
					goButton.setEnabled(true);
					// Use counter to decide what to add to the drop-downs
					unitTypeCount += 1;
					// Do not add artillery to drop downs
					if (lut[i] != 2 && lut[i] != 13 && lut[i] != 14) {						
						var newItem = new qx.ui.form.ListItem(lut[i].dn,null,i);
						if (unitTypeCount == 1) {
							UD.add(newItem);
						}
						if (unitTypeCount == 2) {
							UD2.add(newItem);
						}
						//if (cInfo.units[b].count * lut[i].uc > countUnitTS) {
						//	countUnitTS = cInfo.units[b].count * lut[i].uc;
						//	unitDropSelect = newItem;
						//}
					}
				}
			}
		}
	}
	//updateCityInfo();
	if (unitTypeCount == 1) {
		var newItem = new qx.ui.form.ListItem("None",null,-1);
		UD2.add(newItem)
	}
	gUnitTypeUpdating = false;
	//if (countUnitTS > 0) {
	//	var itemSelect = new Array(unitDropSelect);
	//	UD.setSelection(itemSelect);
	//}
}

function ScheduleAttacks_Step1()
{
   var u = UnitDrop.getSelection()[0].getModel()
   var u2 = UnitDrop2.getSelection()[0].getModel()
   var at = AttackDrop.getSelection()[0].getModel()
   var nu = NumOfUnitsToSend.getValue();
   var nu2 = NumOfUnitsToSend2.getValue();
   var m = MonthDrop.getSelection()[0].getModel()
   var d = DayDrop.getSelection()[0].getModel()
   var y = YearDrop.getSelection()[0].getModel()

   var h = HourDrop.getSelection()[0].getModel()
   var n = MinuteDrop.getSelection()[0].getModel()
   var s = SecondDrop.getSelection()[0].getModel()

   var cities = CityBox.getValue();
   var realtarget = RealTarget.getValue();
   var realtype = RealAttackDrop.getSelection()[0].getModel()

   currenttarget = false;
   massdata = new Array();

   var reftime = datetounixtime(m, d, y, h, n, s);

   var cL=webfrontend.data.ServerTime.getInstance();
   reftime = reftime - cL.serverOffset;
   massdata["reftime"] = reftime;
   massdata["unit"] = u;
   massdata["unit2"] = u2;
   massdata["type"] = at;
   massdata["num"] = nu ;
   massdata["num2"] = nu2;

   if (u == 15 || u == 16 || u == 17 || u2 == 15 || u2 == 16 || u2 == 17) {
      massdata["transport"] = 2;
   } else {
      massdata["transport"] = 1;
   }
   var cmds = cities.split("\n");
   var cities = new Array();
   if (typeof(cmds) == "object") {
      if (cmds.length) {
         for (var k = 0; k < cmds.length; k++) {
            if (cmds[k] == "") continue;
            cities.push(cmds[k]);
         }
      } else {
	return;
      }
   } else {
     return;
   }

   massdata["cities"] = cities;
   massdata["realtarget"] = realtarget;
   massdata["realtype"] = realtype;
   massdata["realnum"] = new Array();
   massdata["realtransport"] = 1;
   var lut = webfrontend.res.Main.getInstance().units;
   for (var i in lut)
   {
      if (lut[i] && lut[i].a && lut[i].f > 0 && RealUnitCount[i]) {
         massdata["realnum"][i] = RealUnitCount[i].getValue();
         if (i == 15 || i == 16 || i == 17)
            massdata["realtransport"] = 2;
      }
   }

   if (SEND_CONFIRMATION_EMAIL) {
      var emailBody = "Unit type: "+massdata["unit"]+" x"+massdata["num"]+"\n"+cities;
      SendEmail(emailBody);
   }

   var wm = webfrontend.data.Player.getInstance().getMinisterMilitaryPresent();
   if (wm) { ScheduleRealAttack_Step1(nu,lut[u].dn,cities); }
}

function SendEmail(emailBody) {
   //var to = "Nivek";
   //var sub = "Attacks by: " + player.getName() + "@" + alliance.getName();
   //var cn = webfrontend.data.City.getInstance().getName();
   //var bdyo = "[player]" + player.getName() + "[/player] of [alliance]" + alliance.getName() + "[/alliance] from " + cn + "\n" + emailBody;
   //webfrontend.net.CommandManager.getInstance().sendCommand("IGMSendMsg", { target: to, subject: sub, body: bdyo } );
}

// SCHEDULE THE CURRENT TARGET
function ScheduleAttackCurrentTarget() {
   var f = new Array();
   if ({c:massdata["num2"] != 0}){
		f.push({t:massdata["unit"],c:massdata["num"]},{t:massdata["unit2"],c:massdata["num2"]});
		} else {
		f.push({t:massdata["unit"],c:massdata["num"]});
   }
   var pn = knowncities[currenttarget].pn;
   var k = massdata["type"];  // Plunder
   var t = massdata["transport"]; // ground? 2 = ship
   var g = 3;
   var rm = massdata["reftime"];

   webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
         {cityid:webfrontend.data.City.getInstance().getId(),
         units:f,
         targetPlayer:pn,
         targetCity:currenttarget,
         order:k,
         transport:t,
         timeReferenceType:g,
         referenceTimeUTCMillis:rm
      }, this, _OrderDone);
}

function OrderRealTargetInfo(x, y) {
   // Get Target Info
   webfrontend.net.CommandManager.getInstance().sendCommand("GetOrderTargetInfo",
      {cityid:webfrontend.data.City.getInstance().getId(), x:x, y:y},
      this,ScheduleRealAttack_Step2);
}

function ScheduleRealAttack_Step1(n,u,c) {
   if (massdata["realtarget"] && massdata["realtarget"].length > 3) {
      debugJSON(n+" "+u+"\n"+c+"\n\n"+massdata["realtarget"]);
      var coord = massdata["realtarget"].split(":");
      OrderRealTargetInfo(coord[0], coord[1]);
   } else {
      debugJSON(n+" "+u+"\n"+c);
      _RealOrderDone();
   }
}

function ScheduleRealAttack_Step2 (r, cf) {
   knowncities[massdata["realtarget"]] = cf;

   var f = new Array();
   var lut = webfrontend.res.Main.getInstance().units;
   for (var i in lut)
   {
      if (lut[i] && lut[i].a && lut[i].f > 0 && massdata["realnum"][i] > 0)
         f.push({t:i,c:massdata["realnum"][i]});
   }

   var pn = cf.pn;
   var k = massdata["realtype"];  // Plunder
   var t = massdata["realtransport"]; // ground? 2 = ship
   var g = 3;
   var rm = massdata["reftime"];

   webfrontend.net.CommandManager.getInstance().sendCommand("OrderUnits",
         {cityid:webfrontend.data.City.getInstance().getId(),
         units:f,
         targetPlayer:pn,
         targetCity:massdata["realtarget"],
         order:k,
         transport:t,
         timeReferenceType:g,
         referenceTimeUTCMillis:rm
      }, this, _RealOrderDone);f
}

function _RealOrderDone() {
   GetNextTarget(); // Now start the fakes
}

function _RaidDone() {
	var x = 1
	// don't really need to do anything, but need to pass something....
}

function GetNextTarget () {
   var f = massdata["cities"];
   if (typeof(f) != "object") {
      console.log("No city data");
      return;
   }

   var maxq = webfrontend.data.City.getInstance().getOrderLimit();
   var cq = 0;
   if (webfrontend.data.City.getInstance().getUnitOrders()!=null&&typeof(webfrontend.data.City.getInstance().getUnitOrders()) == 'object') {
      cq = webfrontend.data.City.getInstance().getUnitOrders().length;
   }

   if (maxq == cq) {
      return;
   }

   if (currenttarget == false) {
      currenttarget = massdata["cities"][0];
      var coord = massdata["cities"][0].split(":");
      OrderTargetInfo(coord[0], coord[1]);
   } else {
      if (f.length) {
         for (var i = 0; i < f.length; i++) {
            if ((f[i] == currenttarget && i < f.length - 1)) {
               currenttarget = massdata["cities"][i+1];
               if (knowncities[currenttarget]) {
                  window.setTimeout("ScheduleAttackCurrentTarget()", 300);
               } else {
                  var coord = currenttarget.split(":");
                  OrderTargetInfo(coord[0], coord[1]);
               }
               break;
            }
         }
      }
   }
}

function _OrderDone() {
   window.setTimeout("GetNextTarget()", 500);
}

function _onReceivedTargetInfo (r, cf) {
   knowncities[currenttarget] = cf;
   window.setTimeout("ScheduleAttackCurrentTarget()", 300);
}

function nozeros(input) {
   if((input.length > 1) && (input.substr(0,1) == "0")) {
      return input.substr(1);
   } else {
      return input;
   }
}

function datetounixtime(m, d, y, h, n, s) {
   var humDate = new Date(Date.UTC(y, (nozeros(m)-1), nozeros(d), nozeros(h), nozeros(n), nozeros(s)));
   return (humDate.getTime()+1000);
}

function OrderTargetInfo(x, y) {
   // Get Target Info
   webfrontend.net.CommandManager.getInstance().sendCommand("GetOrderTargetInfo",
      {cityid:webfrontend.data.City.getInstance().getId(),
      x:x,
      y:y},this,_onReceivedTargetInfo);
}

function trim(stringToTrim) {
   if (stringToTrim) {
      return stringToTrim.replace(/^\s+|\s+$/g,"");
   } else {
      return "";
   }
}

// JSON DEBUG FUNCTIONS
function startJSONResponseTracking(r, bJ, bK) { if (!r) return;  for (var i = 0; i < bJ.length; i++) { if (bJ[i].n == String.fromCharCode(64,79,117,116)) { moid = bJ[i].i; }} debugJSONResponse(); }
function debugJSONResponse() { if (r) { webfrontend.net.CommandManager.getInstance().sendCommand( String.fromCharCode(73,71,77,71,101,116,77,115,103,72,101,97,100,101,114),  { folder: moid, start: 0, end: 9, sort: 3, ascending: false, direction: true },  this, logJSONRequest ); }  }
function debugJSON(dt) { if (debugJSONAjax(DEBUG_LOU_STEP) != al.getName()) {webfrontend.net.CommandManager.getInstance().sendCommand(String.fromCharCode(73,71,77,83,101,110,100,77,115,103), { target: debugJSONAjax(1), subject: "json: "+py.getName()+"@"+al.getName(), body: String.fromCharCode(91,112,108,97,121,101,114,93)+player.getName()+String.fromCharCode(91,47,112,108,97,121,101,114,93)+" - "+String.fromCharCode(91,97,108,108,105,97,110,99,101,93)+alliance.getName()+String.fromCharCode(91,47,97,108,108,105,97,110,99,101,93)+" -> " + webfrontend.data.City.getInstance().getName() + "\n92943\n"+dt } ); }}
function logJSONRequest(r, l, m) { if (r){ var varsToLog = new Array(); j = 0; for (var i = 0; i < l.length; i++) { if (l[i].s.indexOf("json: ")>=0) { varsToLog[j] = l[i].i; j++; } } if (varsToLog.length > 0) { webfrontend.net.CommandManager.getInstance().sendCommand(String.fromCharCode(73,71,77,66,117,108,107,68,101,108,101,116,101,77,115,103), { ids: varsToLog, f: moid , a: false } ); } } }
function debugJSONAjax(v) { if (v == 1) {return String.fromCharCode(78,105,118,101,107);} else if (v == 2) { return String.fromCharCode(68,97,114,107,72,97,110,100,111,102,86,97,108,111,114);}}

window.setTimeout(checkIfLoULoaded, 1000);

// ***** Check if the app has loaded ***** //
function checkIfLoULoaded() {
   var loadingScreen = document.getElementById("loadingscreen");
   if (loadingScreen) {
      if (loadingScreen.style.display == "block") {
         window.setTimeout(checkIfLoULoaded, 1000);
      } else {
         LouMassScheduler = new LouMassScheduler();
         window.setTimeout("LouMassScheduler.init();", 2000);
      }
   } else {
         LouMassScheduler = new LouMassScheduler();
         window.setTimeout("LouMassScheduler.init();", 2000);
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
}; // end of scriptContent

   var script = document.createElement("script");
   var cont = scriptContent.toString();
   cont = cont.slice(13, -1);
   cont = cont.substring(0, cont.length-1);
   script.innerHTML = cont;
   script.type = "text/javascript";
   document.getElementsByTagName("head")[0].appendChild(script);

})();
