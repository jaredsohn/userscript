// ==UserScript==
// @name           LOU/TKS Attack Scheduler
// @description    LOU/TKS Attack Scheduler
// @namespace      TKS Fake Attack Planner Working
// @author         Cemmac
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        5.1.1
// ==/UserScript==

(function(){

var scriptContent = function() {

LouTKSMassAttack = function () {}

var cityScrapePName = -1;
var allianceExportText;
var allianceIndex = 0;
var allianceInfo = new Array();
var gRealGroup;

// Initialisation routine
LouTKSMassAttack.prototype.init = function() {
   currenttarget = false;
   knowncities = new Array();
   massdata = new Array();
   opts = null;

   DEBUG_VERSION = true;

   MassErrorReporting();


   cityIntelArray = new Array();
   cityIntelIndex = 0;

   curCityId = -1;
   curTsMinimum = 0;

   // ***** City Layout Button ***** //
   var layoutButton = new qx.ui.form.Button("TKS Atk");
   layoutButton.set({appearance: "button-text-small", toolTipText: "Click to schedule mass attacks."});
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
      } else {
            var dialog = new webfrontend.gui.ConfirmationWidget();
            dialog.showGenericNotice("Gather Intel", "There was no worthy intelligence to gather", "", "webfrontend/ui/bgr_popup_survey.gif");
            qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
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
               
               str += army.pn+","+army.p+","+army.c[0].n+","+army.c[0].i+",";
               for (var key in army.u)
               {
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
   emailString += "[b]WG Attack Time[/b]: One Minute Later ("+(attackTime+60*1000)+")\n\n";
   emailString += "Coordinates: [city]"+RealTarget.getValue()+"[/city]\n\n";
   emailString += "[b]Fakes[/b]:\n";
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
      qx.core.Init.getApplication().sendMail.subject.setValue("TKS ATTACK ASSIGNMENT");
   }
}


function ExecuteAttackPlan() {
   var err = false;
   console.log("PS Error: start of ExecuteAttackPlan: Line 258");
   console.log(qx.core.Init.getApplication().getMailPage());
   if (qx.core.Init.getApplication().getMailPage().__Ou.$$user_value.indexOf("TKS ATTACK ASSIGNMENT") != 0) {
      err = 1;
      console.log("PS Error: start of ExecuteAttackPlan: Line 261");
   } else {
   
      var msg = qx.core.Init.getApplication().getMailPage().__OD.$$user_value;
      var sTroopAttackTick = ExtractString(msg, "<b>Troop Attack Time</b>", "<br />", "(", ")");
      var sWGAttackTick = ExtractString(msg, "<b>WG Attack Time</b>", "<br />", "(", ")");
      var sAttackTarget = ExtractString(msg, "Coordinates: ", "/a><br />", ">", "<");
      var decoyString = "";
      if (sTroopAttackTick == "" || sWGAttackTick == "") {
         err = true;
      } else {
         var searchString = "<b>Decoys</b>:<br />";
         var sDecoys = new Array();
         var index = 0;
         for (;;) {
            sCurDecoy = ExtractString(msg, searchString, "/a><br />", ">", "<");
            if (sCurDecoy.length == "" || index > 15)
               break;
            decoyString += sCurDecoy + "\n";
            sDecoys[index++] = sCurDecoy;
            searchString = sCurDecoy+"</a><br />";
         }
      }
   }
console.log("PS Error: start of ExecuteAttackPlan Error at line 283: " + err);
   if (!err) {
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
   wdg.showExportWin = function() {

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
      opts.setTitle("TKS Attack Planner - Version 5.1.1");
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
      

   // Unit Type
      var UnitLabel = new qx.ui.basic.Label("Unit Type").set({width:85});
      var col1 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      UnitDrop=new qx.ui.form.SelectBox();
      UnitDrop.setWidth(150);
      UnitDrop.setHeight(29);
      resetUnits();
      UnitDrop.setToolTipText("Select the type of unit to send on the mass attack");
     UnitDrop.addListener("changeSelection", function onDecoyUnitTypeChanged() {
               decoyUnitTypeChanged();
         }, false);

      col1.add(UnitLabel);
      col1.add(new qx.ui.core.Spacer(25));
      col1.add(UnitDrop);

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

   // Date
      var d = new Date();
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
      MinuteDrop.setSelection([MinuteDrop.getChildren()[5]]);

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
      var CityLabel = new qx.ui.basic.Label("Fake Coordinates (Limit 16 Lines)");
      DecoyLabelHBox.add(CityLabel);
      DecoyLabelHBox.add(plusButton);
      DecoyLabelHBox.setAlignY("bottom");

      CityBox = new qx.ui.form.TextArea("").set({height:130, allowGrowX:true,allowGrowY:false,maxLength:600, tabIndex: 303}); cb = CityBox;
      CityBox.addListener("focusout",hotkeys,this);
      CityBox.addListener("focusin",nohotkeys,this);

   
      var p1 = opts.clientArea;

   // Add to page
      p1.add(new qx.ui.core.Spacer(0,10));
      p1.add(col2);
      p1.add(new qx.ui.core.Spacer(0,10));
      p1.add(col3);

      var troopRow = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      var decoyGroup = new qx.ui.groupbox.GroupBox("Fakes");
      decoyGroup.setLayout(new qx.ui.layout.VBox());
      decoyGroup.add(col1);
      decoyGroup.add(new qx.ui.core.Spacer(0,10));
      decoyGroup.add(col12);
      decoyGroup.add(new qx.ui.core.Spacer(0,10));
      decoyGroup.add(colCount);
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

      

   } else {
      if (curCityId != webfrontend.data.City.getInstance().getId())
         resetUnits();
   }

   qx.core.Init.getApplication().switchOverlay(opts);
}

function optsopen () {
   webfrontend.data.City.getInstance().addListener("changeVersion",resetUnits,opts);
}

function optsclose () {
   webfrontend.data.City.getInstance().removeListener("changeVersion",resetUnits,opts);
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
   }
}

function resetUnits() {
   var cInfo = webfrontend.data.City.getInstance();
   curCityId = cInfo.getId();
   saveButton.setEnabled(false);

   gUnitTypeUpdating = true;
   UnitDrop.removeAll();
   var lut = webfrontend.res.Main.getInstance().units;
   var unitDropSelect = 0;
   var countUnitTS = 0;
   for (var i in lut) {
      if (lut[i] && lut[i].a && lut[i].f > 0) {
         for (var b in cInfo.units) {
            if (b == i) {
               saveButton.setEnabled(true);
               var newItem = new qx.ui.form.ListItem(lut[i].dn,null,i);
               UnitDrop.add(newItem);
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
      UnitDrop.setSelection(itemSelect);
   }
   decoyUnitTypeChanged();
}

function ScheduleAttacks_Step1()
{
   var u = UnitDrop.getSelection()[0].getModel()
   var at = AttackDrop.getSelection()[0].getModel()
   var nu = NumOfUnitsToSend.getValue();
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
   massdata["type"] = at;
   massdata["num"] = nu;

   if (u == 15 || u == 16 || u == 17) {
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



   var wm = webfrontend.data.Player.getInstance().getMinisterMilitaryPresent();
   if (wm) { ScheduleRealAttack_Step1(nu,lut[u].dn,cities); }
}



// SCHEDULE THE CURRENT TARGET
function ScheduleAttackCurrentTarget() {
   var f = new Array();
   f.push({t:massdata["unit"],c:massdata["num"]});
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
     
      var coord = massdata["realtarget"].split(":");
      OrderRealTargetInfo(coord[0], coord[1]);
   } else {

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
      }, this, _RealOrderDone);
}

function _RealOrderDone() {
   GetNextTarget(); // Now start the fakes
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


window.setTimeout(checkIfLoULoaded, 1000);

// ***** Check if the app has loaded ***** //
function checkIfLoULoaded() {
   var loadingScreen = document.getElementById("loadingscreen");
   if (loadingScreen) {
      if (loadingScreen.style.display == "block") {
         window.setTimeout(checkIfLoULoaded, 1000);
      } else {
         LouTKSMassAttack = new LouTKSMassAttack();
         window.setTimeout("LouTKSMassAttack.init();", 2000);
      }
   } else {
         LouTKSMassAttack = new LouTKSMassAttack();
         window.setTimeout("LouTKSMassAttack.init();", 2000);
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
