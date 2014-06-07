/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            InHolland TimeTables
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/scripts/show/15463
// @description     Automatic set correct timetables at InHolland
// @description     InHolland TimeTables v1.7.2 Beta
// @copyright       2007 - 2008 Jerone
// @version         v1.7.2 Beta
// @browser         FF3
// @include         https://timetables.inholland.nl/*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////
// ToC:
// - Copyrights
// - History
// - Todo
// - Note
// - Framework Check
// - User Settings
// - User Script
// - Statistics
////////////////////////////////////////////////////////////////////////////
THIS  SCRIPT  IS  PROVIDED BY THE AUTHOR `AS IS' AND ANY EXPRESS OR IMPLIED
WARRANTIES,  INCLUDING, BUT  NOT  LIMITED  TO, THE  IMPLIED  WARRANTIES  OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO
EVENT  SHALL  THE  AUTHOR  BE  LIABLE  FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;  LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER  CAUSED  AND  ON  ANY THEORY OF LIABILITY,
WHETHER  IN  CONTRACT, STRICT  LIABILITY, OR  TORT  (INCLUDING NEGLIGENCE OR
OTHERWISE)  ARISING  IN  ANY  WAY  OUT  OF  THE  USE OF THIS SCRIPT, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////////////////////////////////////////////////////////////////////////////
// History:
// [+] = added; [-] = removed; [/] = fixed; [*] = updated;
// - 03-12-2007 15:00 [v1 Alpha]:
//   [+] initial release;
// - 20-01-2008 22:00 [v1.1 Beta]:
//   [/] problem with auto reload;
//   [+] US_functions;
// - 21-01-2008 18:00 [v1.2 Beta]:
//   [*] explanation;
//   [+] removeLabels;
//   [+] listToMenu;
//   [+] this week calculator;
// - 05-02-2008 15:30 [v1.3 Beta]:
//   [/] problem with correct first day of the week;
// - 05-02-2008 18:30 [v1.4 Beta]:
//   [+] next & previous button;
//   [*] cleaned up code;
// - 04-05-2008 15:30 [v1.5]:
//   [+] framework check;
//   [+] US_language;
//   [+] US_updater;
// - 30-05-2008 19:00 [v1.6 Beta]:
//   [/] framework check;
// - 07-09-2008 20:00 [v1.7 Beta]:
//   [+] settings window;
//   [/] cleaned up code;
//   [/] bug in not visible selecting School department;
// - 07-09-2008 22:15 [v1.7.1 Beta]:
//   [/] bug not correctly selecting department;
// - 15-09-2008 02:00 [v1.7.2 Beta];
//   [*] removed timeout changing next button from department;
//   [*] cleaned up code and minor improvements;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - auto submit();
// - inprove calculatedWeek;
// - add live execute;
////////////////////////////////////////////////////////////////////////////
// Note:
// - This script does NOT work without my other scripts: 
//   - US_functions => http://userscripts.org/scripts/show/16142
//   - US_language => http://userscripts.org/scripts/show/16143
//   - US_options => http://userscripts.org/scripts/show/31458
//   - US_update => http://userscripts.org/scripts/show/16144
/*//////////////////////////////////////////////////////////////////////////



//*** FRAMEWORK CHECK ***//
// Nothing to change here!!!
(function(){
var name          = "InHolland TimeTables";  // current script name;
var US_functionsV = "1.9.5";	// minimum US_functions version;
var US_languageV  = "1.4.2";	// minimum US_language version;
var US_optionsV   = "1.9";		// minimum US_options version;
var US_updateV    = "1.6.4";	// minimum US_update version;
var m1="The following script doesn't exist, is disabled or something went wrong:\n	",m2=name+" only works with a newer version of the following script:\n	",m3="\n\nClick 'OK' to go to the homepage of that script to download the newest version:\n	",l1="http://userscripts.org/scripts/show/16142",l2="http://userscripts.org/scripts/show/16143",l3="http://userscripts.org/scripts/show/31458",l4="http://userscripts.org/scripts/show/16144",USf="US_functions",USl="US_language",USo="US_options",USu="US_update",u="undefined",f=false,t=true,o=null,w=window;if(!(w.US_frameworkOK)){function a(b,c,d){var e=confirm(((d==1)?m1:m2)+b+m3+c);if(e)GM_openInTab(c);if(d==1){w.US_functions=function(){};w.US_language=function(){};w.US_language.localise=function(){};w.US_language.all=function(){};w.US_language.current=function(){};w.US_options=function(){};w.US_update=function(){};w.US_update.all=function(){};w.US_update.names=function(){};}return;}
function g(h,i){var j=k=f,r=/([\d.]+)/i;if(r.test(i)==f)return t;i.match(r);is=RegExp.$1.split(".");h.match(r);hs=RegExp.$1.split(".");for(var x=0;x<Math.max(is.length,hs.length);x++){var hx=hs[x],ix=is[x];if(hx==u||hx==""||hx==o)hx=0;if(ix==u||ix==""||ix==o)ix=0;if(ix<hx&&!k)j=t;if(ix>hx)k=t;}return j;}var fd=ld=od=ud=f;if(typeof US_functionsV!=u){if(!(w.US_functionsOK))a(USf,l1,1);else if(g(US_functionsV,US_functionsOK))a(USf,l1);fd=t;}if(typeof US_languageV!=u){if(!(w.US_languageOK))a(USl,l2,1);else if(g(US_languageV,US_languageOK))a(USl,l2);ld=t;}if(typeof US_optionsV!=u){if(!(w.US_optionsOK))a(USo,l3,1);else if(g(US_optionsV,US_optionsOK))a(USo,l3);od=t;}if(typeof US_updateV!=u){if(!(w.US_updateOK))a(USu,l4,1);else if(g(US_updateV,US_updateOK))a(USu,l4);ud=t;}if(fd&&ld&&od&&ud){w.US_frameworkOK=t;console.log('US_framework correct imported!');}else w.US_frameworkOK=f;}})();

var language=new US_language({langMod:"browser",locals:{
	'en':{
		'INHTT':{
			'display'		: 'Display',
			'list2menu'		: 'Convert multiple selectboxes to menulist.',
			'shownav'		: 'Show navigation buttons beside menu\'s.',
			'showdepart'	: 'Show school department.',
			'showsearch'	: 'Show search student.',
			'showclass'		: 'Show student class.',
			'showweeks'		: 'Show weeks.',
			'showdays'		: 'Show days.',
			'showperiod'	: 'Show start and end time.',
			'showreport'	: 'Show type of report.',
			'info'			: 'Selected = visible and unselected = hidden',

			'sets'			: 'Sets',
			'profiles'		: 'Profiles',
			'active'		: 'Active',
			'newset'		: 'New Set',
			'name'			: 'Set name',
			'depart'		: 'School department',
			'class'			: 'Student class',
			'week'			: 'Week',
			'day'			: 'Day',
			'period'		: 'Start and end time',
			'report'		: 'Report type',

			'resetConfirm'	: "This will reset all settings you\'ve made on all tabs!\n\nAre you sure you want to reset all settings?",
			'pagerefresh'	: 'Changes take only place after a page <a href="javascript:top.window.location.reload(true)">refresh</a>!',
			'help'			: 'Help'}},
	'nl':{'INHTT':{'display':'Weergave','list2menu':'Converteer meerdere selectboxes naar menulijst.','shownav':'Navigatie knoppen naast menu\'s weergeven.','showdepart':'School afdeling weergeven.','showsearch':'Student zoeken weergeven.','showclass':'Student klas weergeven.','showweeks':'Weken weergeven.','showdays':'Dagen weergeven.','showperiod':'Start en eind tijd weergeven.','showreport':'Report type weergeven.','info':'Geselecteerd = zichtbaar en niet geselecteerd = verborgen','sets':'Groepen','profile':'Profielen','active':'Actief','newset':'Nieuwe Groep','name':'Groep naam','depart':'School afdeling','class':'Student klas','week':'Week','day':'Dag','period':'Start en eind tijd','report':'Report type','resetConfirm':"Dit zal alle instellingen op alle tabbladen herstellen!\n\nWeet u zeker dat u alle instellingen wilt herstellen?",'pagerefresh':'Veranderingen zullen alleen plaats vinden na het <a href="javascript:top.window.location.reload(true)">vernieuwen</a> van de pagina!','help':'Help'
}}}});

new US_update({check4Update:true,updateTime:1*60*60*1000,language:"browser",title:"InHolland TimeTables",thisVersion:'v1.7.2 Beta',versionUrl:15463,updateUrl:15463,});

eval(US_functions.prototype({Number:[],String:[],Array:['switch','clone'],Object:['clone']}));



//*** USER SETTINGS ***//
const timeTableSetDefault=[					// [Array [name,department,class,week,day,period,report]] only number, and counting from zero;
	["Set 1",0,0,-1,0,0,0],						// name			[String] name of set;
	["Set 2",0,0,-1,0,0,0],						// department	[Number] school department;
	["Set 3",0,0,-1,0,0,0],						// class		[Number] student class;
	["Set 4",0,0,-1,0,0,0],						// week			[Number] week to show. Number -1 will calculate 'This Week' (Saturday and Sunday are next week);
	["Set 5",0,0,-1,0,0,0],						// day			[Number] days to show;
	["Set 6",0,0,-1,0,0,0],						// period		[Number] start and end time;
	["Set 7",0,0,-1,0,0,0]];					// report		[Number] type of report;
const timeTableActiveDefault	= 0;		// [Number] reflects the timeTableSetDefault above;
const listToMenuDefault			= true;		// [Boolean] change list to menu. Null or nothing for normal situation.
const showNavBtnDefault			= true;		// [Boolean] show a next and previous button beside the weeks;
const showDepartDefault			= true;		// [Boolean] show school department;
const showSearchDefault			= false;	// [Boolean] show search student;
const showClassDefault			= true;		// [Boolean] show student class;
const showWeeksDefault			= true;		// [Boolean] show weeks;
const showDaysDefault			= true;		// [Boolean] show days;
const showPeriodDefault			= true;		// [Boolean] show start and end time;
const showReportDefault			= true;		// [Boolean] show type of report;



//*** USER SCRIPT ***//
$addEvent(window,'load',function(){var INHTT={
	init: function(){
		this.loadSettings();
		this.loadSettingsWindow();
		this.doeStuff();
	},
	doeStuff: function(){
		if($gi("dlFilter")){  // school department;
			if(!(this.showDepart)){$hs($gi('pFilter'),2);}
			$gi("dlFilter").selectedIndex = this.timeTableSet[this.timeTableActive][1];
			if($gi("dlObject").selectedIndex != this.timeTableSet[this.timeTableActive][2]){
				$w.setTimeout('__doPostBack("dlFilter","")',0);
			}
			else{
				$gi("dlFilter").selectedIndex=0;$w.setTimeout(function(){$gi("dlFilter").selectedIndex=INHTT.timeTableSet[INHTT.timeTableActive][1];},1);  // bug fix, not selecting option;
			}
			this.list2Menu($gi("dlFilter"));
			if(this.showNavBtn){this.addBtns($gi("dlFilter"));this.addSbmtBtn($gi("dlFilter"));}
		}
		if($gi("pWildcard")){  // search student;
			if(!(this.showSearch)){$hs($gi('pWildcard'),2);}
			$sa($gi("tWildcard"),"style","width:89%; margin-right:-2px;");
			$sa($gi("bWildcard"),"style","height:22px; width:10%; display:inline; text-align:center; padding:0 0 2px 0; margin:-1px -1px 0 -1px; font-weight:bold;");
		}
		if($gi("dlObject")){  // student class;
			if(!this.showClass){$hs($gi('pObject'),2);}
			$gi("dlObject").selectedIndex = this.timeTableSet[this.timeTableActive][2];
			this.list2Menu($gi("dlObject"));
			if(this.showNavBtn){this.addBtns($gi("dlObject"));}
		}
		if($gi("lbWeeks")){  // weeks;
			if(!this.showWeeks){$hs($gi('pWeeks'),2);}
			if(this.timeTableSet[this.timeTableActive][3]==-1){
				var input=this.startWeek();
				var output=$gi("lbWeeks").options;
				for(var i=0,j=output.length;i<j;i++){
					for(var k=0,l=input.length;k<l;k++){    
						var regExp = new RegExp(input[k],"i");
						if(!output[i].text.match(regExp)) break;
						if(k==(l-1)){
							output[i].selected=true;
			}	}	}	}
			else if(this.timeTableSet[this.timeTableActive][3] > 0){
				$gi("lbWeeks").selectedIndex = this.timeTableSet[this.timeTableActive][3];
			}
			else{  // alterantief
				$gi("lbWeeks").selectedIndex = 0;
			}
			this.list2Menu($gi("lbWeeks"));
			if(this.showNavBtn){this.addBtns($gi("lbWeeks"));}
		}
		if($gi("lbDays")){  // days;
			if(!this.showDays){$hs($gi('pDays'),2);}
			$gi("lbDays").selectedIndex = this.timeTableSet[this.timeTableActive][4];
			this.list2Menu($gi("lbDays"));
			if(this.showNavBtn){this.addBtns($gi("lbDays"));}
		}
		if($gi("dlPeriod")){  // start and end time;
			if(!this.showPeriod){$hs($gi('pPeriod'),2);}
			$gi("dlPeriod").selectedIndex = this.timeTableSet[this.timeTableActive][5];
			this.list2Menu($gi("dlPeriod"));
			if(this.showNavBtn){this.addBtns($gi("dlPeriod"));}
		}
		if($gi("dlType")){  // type of report;
			if(!this.showReport){$hs($gi('pType'),2);}
			$gi("dlType").selectedIndex = this.timeTableSet[this.timeTableActive][6];
			this.list2Menu($gi("dlType"));
			if(this.showNavBtn){this.addBtns($gi("dlType"));}
		}
		if($gi("bGetTimetable")){
			$sa($gi("bGetTimetable"),"style","width:99.7%;");
	}	},
	
	startWeek: function(){
		var d=new Date(),
			dd=d.getDay(),
			day=d.getDate(),
			month=d.getMonth(),
			year=d.getFullYear(),
			startWeekX=[];
		startWeekX[0]=day;
		switch(dd){
			case(0):  // Sunday
				d0=new Date();
				d0.setDate(day+1);  // Next week
				startWeekX[0]=d0.getDate();
			break;
			case(1):
				startWeekX[0]=day;
			break;
			case(2):
				d2=new Date();
				d2.setDate(day-1);
				startWeekX[0]=d2.getDate();
			break;
			case(3):
				d3=new Date();
				d3.setDate(day-2);
				startWeekX[0]=d3.getDate();
			break;
			case(4):
				d4=new Date();
				d4.setDate(day-3);
				startWeekX[0]=d4.getDate();
			break;
			case(5):
				d5=new Date();
				d5.setDate(day-4);
				startWeekX[0]=d5.getDate();
			break;
			case(6):
				d6=new Date();
				d6.setDate(day+2);  // Next week
				startWeekX[0]=d6.getDate();
			break;
		}
		if(Number(startWeekX[0])<10){
			startWeekX[0]="0" + startWeekX[0];
		}
		var monthNamed=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"];
		startWeekX[1]=monthNamed[month];
		startWeekX[2]=year;
		return startWeekX;
	},
	
	list2Menu: function(obj){
		if(this.listToMenu==true){
			obj.removeAttribute("size");
			obj.removeAttribute("multiple");
		}
		if(this.listToMenu==false){
			$sa(obj,"size",4);
			$sa(obj,"multiple",true);
	}	},
	
	addBtns: function(obj){
		$sa(obj,"style","width:80.5%;");
		
		var btnLeft = $ce("INPUT");
		$sa(btnLeft,"type","button");
		$sa(btnLeft,"value","<");
		$sa(btnLeft,"style","width:10%; display:inline; float:left; text-align:center; padding:0 0 2px 0; margin:-1px 0 0 -1px; font-weight:bold;");
		if(obj.size>=2 || obj.multiple==true){
			btnLeft.style.height = "62px";
		}
		else{
			btnLeft.style.height = "20px";
		}
		$ib(obj,btnLeft);
		$addEvent(btnLeft,"click",function(){
			if(obj.selectedIndex!=0){
				obj.selectedIndex=obj.selectedIndex - 1;
			}
			else {
				obj.selectedIndex=(obj.length-1);
			}
		});
		
		var btnRigh = $ce("INPUT");
		$sa(btnRigh,"type","button");
		$sa(btnRigh,"value",">");
		$sa(btnRigh,"id","btnRigh_"+obj.id);
		$sa(btnRigh,"style","width:10%; display:inline; float:right; text-align:center; padding:0 0 2px 0; margin:-1px -1px 0; font-weight:bold;");
		if(obj.size>=2 || obj.multiple==true){
			btnRigh.style.height = "62px";
		}
		else{
			btnRigh.style.height = "20px";
		}
		$ib(obj,btnRigh);
		$addEvent(btnRigh,"click",function(){
			if(!(obj.selectedIndex>=(obj.length-1))){
				obj.selectedIndex=obj.selectedIndex + 1;
			}
			else{
				obj.selectedIndex=0;
	}	});	},
	
	addSbmtBtn: function(obj){
		var sbmtRigh = $ce("BUTTON");
		$sa(sbmtRigh,"type","button");
		$sa(sbmtRigh,"value","");
		$sa(sbmtRigh,"style","width:5%; display:inline; float:right; text-align:center; padding:0 0 2px 0; margin:-1px 0 0 0; font-weight:bold;");
		var test = $ce("IMG");
		$sa(test,"src","data:image/bmp;base64,Qk1aAAAAAAAAADYAAAAoAAAAAwAAAAMAAAABABgAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==");
		$sa(test,"style","width:9px; height:10px; margin-left:-2px;");
		$ac(sbmtRigh,test);
		if(obj.size>=2 || obj.multiple==true){
			sbmtRigh.style.height = "62px";
		}
		else{
			sbmtRigh.style.height = "20px";
		}
		$ib($gi("btnRigh_"+obj.id),sbmtRigh);
		$addEvent(sbmtRigh,"click",function(){
			$w.setTimeout('__doPostBack(\'dlFilter\',\'\')',0)
		});
		$gi("btnRigh_"+obj.id).style.width = "5%";
	},

	// SETTINGS
	settingsWindowName: 'INHTT',
	settingsWindowNode: function(){return $gi('USOwindow_'+this.settingsWindowName,top.document).contentDocument},
	loadSettingsWindow: function(){
		var settingsContent='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /><title>INHTT Settings Window</title>'+
							'<style type="text/css">'+
								'/* common */ body{color:CaptionText;font-family:Tahoma,Verdana,Arial;font-size:10pt;}input[type=checkbox]{margin-bottom:1px;}fieldset{border:1px solid ThreeDShadow;padding:5px 8px 10px 8px;}select option{height:16px;}a{color:#0088FF;}input[type=text],input[type=number]{border:1px solid ThreeDShadow; padding:2px 1px;}.USOinp{}.USObtn{}.required{background:Menu top right no-repeat url("data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAHklEQVQImWP4z8DwHx0DSSDGKogmgRBEkkAVhEoAAKhbO8Uz7uXSAAAAAElFTkSuQmCCAA==")}'+
								'/*   tabs */ #USOtabs{display:table;width:100%;min-width:444px;height:24px;}.USOtab{display:inline;background:none;padding:5px 15px;border:1px solid ThreeDShadow;border-bottom:1px solid ThreeDShadow;margin-right:-1px;margin-bottom:-1px;float:left;font-size:8pt;font-weight:normal;font-style:normal;text-decoration:none;color:CaptionText;cursor:pointer;}.USOtab:hover{background:Highlight;color:HighlightText;}.USOtabActive{background:ActiveCaption;color:CaptionText;border-bottom:1px solid transparent;float:left;font-weight:bold;}'+
								'/* fields */ #USOfields{padding:15px 10px 12px 10px;border:1px solid ThreeDShadow;border-bottom:0px none;min-width:422px;}'+
								'/*   note */ #USOnote{border-left:1px solid ThreeDShadow;border-right:1px solid ThreeDShadow;background:none;padding:0px 11px 11px 11px;}'+
								'/* submit */ #USOsubmit{border:1px solid ThreeDShadow;border-top:0px none;background:none;text-align:right;padding:0px 11px 11px 11px;min-width:420px;}#USOsubmit input{width:67px;font-size:11px;padding:2px;}'+
							'</style>'+
							'</head><body>'+
								'<div id="USOtabs"></div>'+
								'<div id="USOfields">'+
									'<fieldset id="USOfield1"><legend>'+language.localise(['common','options'])+'</legend><table width="400px" border="0" cellspacing="0" cellpadding="2"><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(["INHTT","display"])+':</legend><table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td valign="middle">'+
										'<input name="INHTTlistToMenu" type="checkbox" id="INHTTlistToMenu" class="USOinp" value="INHTTlistToMenu" /></td><td valign="middle"><label for="INHTTlistToMenu">'+language.localise(['INHTT','list2menu'])+'</label></td></tr><tr><td valign="middle">'+
										'<input name="INHTTshowNavBtn" type="checkbox" id="INHTTshowNavBtn" class="USOinp" value="INHTTshowNavBtn" /></td><td valign="middle"><label for="INHTTshowNavBtn">'+language.localise(['INHTT','shownav'])+'</label></td></tr><tr><td colspan="2" valign="middle"><hr /></td></tr><tr><td valign="middle">'+
										'<input name="INHTTshowDepart" type="checkbox" id="INHTTshowDepart" class="USOinp" value="INHTTshowDepart" /></td><td valign="middle"><label for="INHTTshowDepart">'+language.localise(['INHTT','showdepart'])+'</label></td></tr><tr><td valign="middle">'+
										'<input name="INHTTshowSearch" type="checkbox" id="INHTTshowSearch" class="USOinp" value="INHTTshowSearch" /></td><td valign="middle"><label for="INHTTshowSearch">'+language.localise(['INHTT','showsearch'])+'</label></td></tr><tr><td valign="middle">'+
										'<input name="INHTTshowClass" type="checkbox" id="INHTTshowClass" class="USOinp" value="INHTTshowClass" /></td><td valign="middle"><label for="INHTTshowClass">'+language.localise(['INHTT','showclass'])+'</label></td></tr><tr><td valign="middle">'+
										'<input name="INHTTshowWeeks" type="checkbox" id="INHTTshowWeeks" class="USOinp" value="INHTTshowWeeks" /></td><td valign="middle"><label for="INHTTshowWeeks">'+language.localise(['INHTT','showweeks'])+'</label></td></tr><tr><td valign="middle">'+
										'<input name="INHTTshowDays" type="checkbox" id="INHTTshowDays" class="USOinp" value="INHTTshowDays" /></td><td valign="middle"><label for="INHTTshowDays">'+language.localise(['INHTT','showdays'])+'</label></td></tr><tr><td valign="middle">'+
										'<input name="INHTTshowPeriod" type="checkbox" id="INHTTshowPeriod" class="USOinp" value="INHTTshowPeriod" /></td><td valign="middle"><label for="INHTTshowPeriod">'+language.localise(['INHTT','showperiod'])+'</label></td></tr><tr><td valign="middle">'+
										'<input name="INHTTshowReport" type="checkbox" id="INHTTshowReport" class="USOinp" value="INHTTshowReport" /></td><td valign="middle"><label for="INHTTshowReport">'+language.localise(['INHTT','showreport'])+'</label></td></tr><tr><td colspan="2" valign="middle"><hr /></td></tr><tr><td colspan="2" valign="middle"><small>'+language.localise(['INHTT','info'])+'</small></td></tr></table></fieldset></td></tr></table>'+
									'</fieldset>'+
									'<fieldset id="USOfield2"><legend>'+language.localise(["INHTT","sets"])+'</legend><table width="400px" border="0" cellpadding="2" cellspacing="0"><tr><td colspan="2"><fieldset>'+
										'<legend>'+language.localise(["INHTT","profiles"])+':</legend><table border="0" cellspacing="0" cellpadding="0" style="width:100%;"><tr><td style="width:100%;">'+
											'<select name="INHTTsets" size="5" id="INHTTsets" class="USOinp" style="width:100%; height:86px;"><option selected="selected">&nbsp;</option></select></td><td align="right">'+
											'<input name="INHTTsetsUp_btn" title="'+language.localise(["common","up"])+'" type="submit" class="USObtn" id="INHTTsetsUp_btn" style="width:25px; height:29px;" value="&#8593;" /><br />'+
											'<input name="INHTTsetsActive_btn" title="'+language.localise(["INHTT","active"])+'" type="submit" class="USObtn" id="INHTTsetsActive_btn" style="width:25px; height:30px;" value="#" /><br />'+
											'<input name="INHTTsetsDown_btn" title="'+language.localise(["common","down"])+'" type="submit" class="USObtn" id="INHTTsetsDown_btn" style="width:25px; height:29px;" value="&#8595;" /></td><td align="right">'+
											'<input name="INHTTsetsAdd_btn" title="'+language.localise(["common","add"])+'" type="submit" class="USObtn" id="INHTTsetsAdd_btn" style="width:25px; height:44px;" value="+" /><br />'+
											'<input name="INHTTsetsRem_btn" title="'+language.localise(["common","remove"])+'" type="submit" class="USObtn" id="INHTTsetsRem_btn" style="width:25px; height:44px;" value="-" /></td></tr></table></fieldset></td></tr><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(['INHTT','name'])+':</legend><input name="INHTTsetName_inp" type="text" id="INHTTsetName_inp" style="margin-top:1px; width:345px;" class="USOinp" value="&nbsp;" /><input name="INHTTsetName_btn" type="submit" class="USObtn" id="INHTTsetName_btn" style="width:25px; height:24px; vertical-align:top;" value="*" /></fieldset></td></tr><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(['INHTT','depart'])+':</legend><div id="INHTTshowDepart_ctr"></div><input name="INHTTshowDepart_btn" type="submit" class="USObtn" id="INHTTshowDepart_btn" style="width:25px; height:24px; vertical-align:top;" value="*" /></fieldset></td></tr><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(['INHTT','class'])+':</legend><div id="INHTTshowClass_ctr"></div><input name="INHTTshowClass_btn" type="submit" class="USObtn" id="INHTTshowClass_btn" style="width:25px; height:24px; vertical-align:top;" value="*" /></fieldset></td></tr><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(['INHTT','week'])+':</legend><div id="INHTTshowWeeks_ctr"></div><input name="INHTTshowWeeks_btn" type="submit" class="USObtn" id="INHTTshowWeeks_btn" style="width:25px; height:24px; vertical-align:top;" value="*" /></fieldset></td></tr><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(['INHTT','day'])+':</legend><div id="INHTTshowDays_ctr"></div><input name="INHTTshowDays_btn" type="submit" class="USObtn" id="INHTTshowDays_btn" style="width:25px; height:24px; vertical-align:top;" value="*" /></fieldset></td></tr><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(['INHTT','period'])+':</legend><div id="INHTTshowPeriod_ctr"></div><input name="INHTTshowPeriod_btn" type="submit" class="USObtn" id="INHTTshowPeriod_btn" style="width:25px; height:24px; vertical-align:top;" value="*" /></fieldset></td></tr><tr><td colspan="2">'+
										'<fieldset><legend>'+language.localise(['INHTT','report'])+':</legend><div id="INHTTshowReport_ctr"></div><input name="INHTTshowReport_btn" type="submit" class="USObtn" id="INHTTshowReport_btn" style="width:25px; height:24px; vertical-align:top;" value="*" /></fieldset></td></tr></table>'+
									'</fieldset>'+
								'</div>'+
								'<div id="USOnote"><small>'+language.localise(["LA","pagerefresh"])+'</small></div>'+
								'<div id="USOsubmit"><input name="INHTTreset" type="submit" class="USObtn" id="INHTTreset" value="'+language.localise(["common","reset"])+'" title="'+language.localise(["common","reset"])+'" style="float:left;" /><input name="INHTTok" type="submit" class="USObtn" id="INHTTok" value="'+language.localise(["common","ok"])+'" title="'+language.localise(["common","ok"])+'" />&nbsp;&nbsp;&nbsp;<input name="INHTTcancel" type="submit" class="USObtn" id="INHTTcancel" value="'+language.localise(["common","cancel"])+'" title="'+language.localise(["common","cancel"])+' "/>&nbsp;&nbsp;&nbsp;<input name="INHTTapply" type="submit" class="USObtn" id="INHTTapply" value="'+language.localise(["common","apply"])+'"title="'+language.localise(["common","apply"])+'"  /></div>'+
							'</body></html>';
		US_options = new US_options({
				   name : this.settingsWindowName,
				content : settingsContent,
				addFade : true,
				addTabs : true,
			activeTabNr : 0,
			showAtStart : false,
			endFunction : function(){
							INHTT.loadSettingsWindowButtons();
							INHTT.loadSettingsWindowValues();
						  }
		});
	},
	closeSettingsWindow: function(){
		US_options.close();
	},
	loadSettingsWindowButtons: function(){
		$addEvent($gi("INHTTok",    this.settingsWindowNode()),"click",function(){INHTT.applySettings();INHTT.closeSettingsWindow();});
		$addEvent($gi("INHTTapply", this.settingsWindowNode()),"click",function(){INHTT.applySettings();});
		$addEvent($gi("INHTTcancel",this.settingsWindowNode()),"click",function(){INHTT.closeSettingsWindow();INHTT.loadSettings();INHTT.loadSettingsWindowValues();});
		$addEvent($gi("INHTTreset", this.settingsWindowNode()),"click",function(){INHTT.resetSettings();});
		
		if($gi("pLinkPanel")){
			var setinsA=$ce("A");
			$sa(setinsA,"href","javascript:void(0);");
			$sa(setinsA,"class","LinkButton");
			$sa(setinsA,"style","color:#FF6600 !important;");
			$ih(setinsA,language.localise(['common','settings']));
			$ac($ac($gi("pLinkPanel"),$ce("DIV")),setinsA);
			$addEvent(setinsA,'click',function(){US_options.open();});
		};
		
		this.doClone("INHTTshowDepart_ctr","dlFilter");  // school department;
		 $ra($gi("dlFilter",this.settingsWindowNode()),"onchange");
		this.doClone("INHTTshowClass_ctr", "dlObject");  // student class;
		this.doClone("INHTTshowWeeks_ctr", "lbWeeks");   // weeks;
		 $gi("lbWeeks",this.settingsWindowNode()).style.width="324px";
		 var calcWeek = $ce("BUTTON");
		 $ih(calcWeek,'<img alt="Calc" title="Calculate this week" style="margin:-2px 0 0 -2px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJZSURBVDjLjZNfTFJRHMdBmX/m1Pln+qDTNjcmD77oo62trYd667H10nNPvrbWIy+u0FFAOhrMzWZKXaYE8YAx4+Ll8kfL/NPoIuBdmAVjCQQb1LdzLkg2wzrb5557zu/8Pud3/xwZABmFNLlKpbqi1Wr9SqXyKhkr6FwFxejo6EWj0cjRNXSumkcvAuk4QsBuRyKRAG+zSWOhAr3fcDqlWMjhqMYqG8vkdLDV2IhdloUoitgh/dv6eqTq6iQ25XLser1SjK7ZrAgq1ZUF4ZYWMHNziMViYMxmbHR3I97ZiXhbG4LNzWBMpnKM9Ht/E3xtb8fq8DBm+vvhGhxEZGAA0b4+7Pf0YI+I7K2teNjUhJcNDUiQis4IMl1dOBofx+exMRyOjEAksvjQEKJEFCEiobcXH0lVQkcHUgrFnwKe51EqlWpSLBaRz+claKNzNKemIJfLIRAIIJVK4smSA48ZN6YtPPTWEGYsr1HIZ88X0GSr1YoF+xosngjCiSyiyQL4yDFWeBHzK2/g8/nOCmipJxKGYaBn/NgRj+GPfcf6fg5ewtanPHRL3tqCE6hAs+iD8KWA9UgWrJDF6ocMQgcFPHoRBMdx/xbonvPYFjNYC5eTKUGxgPvzrPSY1V+ZCkjSj9MCyuIrDq7QAYKxHLhYHgGyu+1dBtOzC7A/1f0WuFwupNPpb1Ry+mUmjpJwsu9JJRwM5AtonvGYmrUgsGyAffIm7l2/cEMS6PV6uN1ueDyec2HJOWBMU3BobmF7+QGME5dykkCtVrPkGON/mbx7G+Y7134aJi7jF1A6sIfsK39SAAAAAElFTkSuQmCCAA==" />');
		 $sa(calcWeek,"style","height:24px; vertical-align:top; width:25px; padding:0px;");
		 $sa(calcWeek,"title","Calculate this week");
		 $ib($gi("INHTTshowWeeks_btn",this.settingsWindowNode()),calcWeek);
		 $addEvent(calcWeek,'click',function(){
			if(INHTT.curSetIndex()===false)return;
			INHTT.calculatedWeek=true;
			var input=INHTT.startWeek();
			var output=$gi("lbWeeks",INHTT.settingsWindowNode()).options;
			for(var i=0,j=output.length;i<j;i++){
				for(var k=0,l=input.length;k<l;k++){    
					var regExp = new RegExp(input[k],"i");
					if(!output[i].text.match(regExp)) break;
					if(k==(l-1)){
						output[i].selected=true;
		 }	}	}	});
		this.doClone("INHTTshowDays_ctr",  "lbDays");    // days;
		this.doClone("INHTTshowPeriod_ctr","dlPeriod");  // start and end time;
		this.doClone("INHTTshowReport_ctr","dlType");    // type of report;
		
		$addEvent($gi("INHTTsets",this.settingsWindowNode()),'change',function(){
			$gi("INHTTsetName_inp",INHTT.settingsWindowNode()).value = ((x=INHTT.timeTableSetTemp[INHTT.curSetIndex()]) && typeof x!="undefined" && typeof x[0]!="undefined")?x[0]:"";
			$gi("dlFilter",INHTT.settingsWindowNode()).selectedIndex = ((x=INHTT.timeTableSetTemp[INHTT.curSetIndex()]) && typeof x!="undefined" && typeof x[1]!="undefined")?x[1]:0;
			$gi("dlObject",INHTT.settingsWindowNode()).selectedIndex = ((x=INHTT.timeTableSetTemp[INHTT.curSetIndex()]) && typeof x!="undefined" && typeof x[2]!="undefined")?x[2]:0;
			if(INHTT.timeTableSetTemp[INHTT.curSetIndex()][3]==-1){
				var input=INHTT.startWeek();
				var output=$gi("lbWeeks",INHTT.settingsWindowNode()).options;
				for(var i=0,j=output.length;i<j;i++){
					for(var k=0,l=input.length;k<l;k++){    
						var regExp = new RegExp(input[k],"i");
						if(!output[i].text.match(regExp)) break;
						if(k==(l-1)){
							output[i].selected=true;
			}	}	}	}
			else{
				$gi("lbWeeks",INHTT.settingsWindowNode()).selectedIndex = INHTT.timeTableSetTemp[INHTT.curSetIndex()][3];
			}
			$gi("lbDays",  INHTT.settingsWindowNode()).selectedIndex = ((x=INHTT.timeTableSetTemp[INHTT.curSetIndex()]) && typeof x!="undefined" && typeof x[4]!="undefined")?x[4]:0;
			$gi("dlPeriod",INHTT.settingsWindowNode()).selectedIndex = ((x=INHTT.timeTableSetTemp[INHTT.curSetIndex()]) && typeof x!="undefined" && typeof x[5]!="undefined")?x[5]:0;
			$gi("dlType",  INHTT.settingsWindowNode()).selectedIndex = ((x=INHTT.timeTableSetTemp[INHTT.curSetIndex()]) && typeof x!="undefined" && typeof x[6]!="undefined")?x[6]:0;
		});

		$addEvent($gi("INHTTsetsUp_btn",this.settingsWindowNode()),'click',function(){  // up;
			if(INHTT.curSetIndex()===false)return;
			var i = INHTT.curSetIndex();
			if(i>0){
				INHTT.timeTableSetTemp.switch(i,i-1);
				$ib(INHTT.setOptions()[i-1],$re(INHTT.setOptions()[i]));
			}
		});
		$addEvent($gi("INHTTsetsActive_btn",this.settingsWindowNode()),'click',function(){  // active;
			if(INHTT.curSetIndex()===false)return;
			var i = INHTT.curSetIndex();
			for(var ii=0; ii<INHTT.setOptions().length; ii++){
				$ra(INHTT.setOptions()[ii],"style");
			}
			if(i===INHTT.timeTableActiveTemp){
				INHTT.timeTableActiveTemp = false;
			}
			else{
				INHTT.timeTableActiveTemp = i;
				$sa(INHTT.setOptions()[i],"style","font-weight:bold;");
			}
			INHTT.setOptions()[0].selected=true;$w.setTimeout(function(){if(INHTT.setOptions()[i])INHTT.setOptions()[i].selected=true;},0);  // bug fix, not selecting edited index;
		});
		$addEvent($gi("INHTTsetsDown_btn",this.settingsWindowNode()),'click',function(){  // down;
			if(INHTT.curSetIndex()===false)return;
			var i = INHTT.curSetIndex();
			if(i<INHTT.timeTableSetTemp.length-1){
				INHTT.timeTableSetTemp.switch(i,i+1);
				$ia(INHTT.setOptions()[i+1],$re(INHTT.setOptions()[i]));
			}
		});

		$addEvent($gi("INHTTsetsAdd_btn",this.settingsWindowNode()),'click',function(){  // add;
			var i = INHTT.timeTableSetTemp.length;
			INHTT.timeTableSetTemp[i]=new Array(4);
			INHTT.setOptions()[i] = new Option(language.localise(["INHTT","newset"]),i);
			INHTT.setOptions()[i].selected=true;
			$gi("INHTTsetName_inp",INHTT.settingsWindowNode()).value = "";
			$gi("dlFilter",INHTT.settingsWindowNode()).selectedIndex = 0;
			$gi("dlObject",INHTT.settingsWindowNode()).selectedIndex = 0;
			$gi("lbWeeks", INHTT.settingsWindowNode()).selectedIndex = 0;
			$gi("lbDays",  INHTT.settingsWindowNode()).selectedIndex = 0;
			$gi("dlPeriod",INHTT.settingsWindowNode()).selectedIndex = 0;
			$gi("dlType",  INHTT.settingsWindowNode()).selectedIndex = 0;
		
			if(INHTT.setOptions().length>1){
				$gi("INHTTsetsUp_btn",  INHTT.settingsWindowNode()).disabled=false;
				$gi("INHTTsetsDown_btn",INHTT.settingsWindowNode()).disabled=false;
			}
			$gi("INHTTsetsRem_btn",INHTT.settingsWindowNode()).disabled=false;
		});
		$addEvent($gi("INHTTsetsRem_btn",this.settingsWindowNode()),'click',function(){  // remove;
			if(INHTT.curSetIndex()===false)return;
			if(INHTT.setOptions().length>0){
				var i = INHTT.curSetIndex();
				INHTT.timeTableSetTemp.splice(i,1);
				$re(INHTT.setOptions()[i]);
				if(INHTT.setOptions().length>0){
					if(INHTT.setOptions()[i]){
						var curSetIndex=i;
						INHTT.setOptions()[0].selected=true;$w.setTimeout(function(){if(INHTT.setOptions()[i])INHTT.setOptions()[i].selected=true;},0);  // bug fix, not selecting edited index;
					}
					else{
						var curSetIndex=i-1;
						INHTT.setOptions()[0].selected=true;$w.setTimeout(function(){if(INHTT.setOptions()[i-1])INHTT.setOptions()[i-1].selected=true;},0);  // bug fix, not selecting edited index;
					}
					if(i===INHTT.timeTableActiveTemp){
						INHTT.timeTableActiveTemp=false;
					}
					if(INHTT.setOptions().length<=1){
						$gi("INHTTsetsUp_btn",  INHTT.settingsWindowNode()).disabled=true;
						$gi("INHTTsetsDown_btn",INHTT.settingsWindowNode()).disabled=true;
				}	}
				else{
					$gi("INHTTsetsActive_btn",INHTT.settingsWindowNode()).disabled=true;
					$gi("INHTTsetsRem_btn",   INHTT.settingsWindowNode()).disabled=true;
				}
				$gi("INHTTsetName_inp",INHTT.settingsWindowNode()).value = ((x=INHTT.timeTableSetTemp[curSetIndex]) && typeof x!="undefined" && typeof x[0]!="undefined")?x[0]:"";
				$gi("dlFilter",INHTT.settingsWindowNode()).selectedIndex = ((x=INHTT.timeTableSetTemp[curSetIndex]) && typeof x!="undefined" && typeof x[1]!="undefined")?x[1]:0;
				$gi("dlObject",INHTT.settingsWindowNode()).selectedIndex = ((x=INHTT.timeTableSetTemp[curSetIndex]) && typeof x!="undefined" && typeof x[2]!="undefined")?x[2]:0;
				$gi("lbWeeks", INHTT.settingsWindowNode()).selectedIndex = ((x=INHTT.timeTableSetTemp[curSetIndex]) && typeof x!="undefined" && typeof x[3]!="undefined")?x[3]:0;
				if(INHTT.timeTableSetTemp[curSetIndex][3]==-1){
					var input=INHTT.startWeek();
					var output=$gi("lbWeeks",INHTT.settingsWindowNode()).options;
					for(var i=0,j=output.length;i<j;i++){
						for(var k=0,l=input.length;k<l;k++){    
							var regExp = new RegExp(input[k],"i");
							if(!output[i].text.match(regExp)) break;
							if(k==(l-1)){
								output[i].selected=true;
				}	}	}	}
				else{
					$gi("lbWeeks",INHTT.settingsWindowNode()).selectedIndex = INHTT.timeTableSetTemp[curSetIndex][3];
				}
				$gi("lbDays",  INHTT.settingsWindowNode()).selectedIndex = ((x=INHTT.timeTableSetTemp[curSetIndex]) && typeof x!="undefined" && typeof x[4]!="undefined")?x[4]:0;
				$gi("dlPeriod",INHTT.settingsWindowNode()).selectedIndex = ((x=INHTT.timeTableSetTemp[curSetIndex]) && typeof x!="undefined" && typeof x[5]!="undefined")?x[5]:0;
				$gi("dlType",  INHTT.settingsWindowNode()).selectedIndex = ((x=INHTT.timeTableSetTemp[curSetIndex]) && typeof x!="undefined" && typeof x[6]!="undefined")?x[6]:0;
			}
		});

		$addEvent($gi("INHTTsetName_btn",this.settingsWindowNode()),'click',function(){  // set name;
			if(INHTT.curSetIndex()===false)return;
			var i = INHTT.curSetIndex();
			INHTT.timeTableSetTemp[i][0]=$gi("INHTTsetName_inp",INHTT.settingsWindowNode()).value;
			INHTT.setOptions()[i].innerHTML=$gi("INHTTsetName_inp",INHTT.settingsWindowNode()).value;
			INHTT.setOptions()[0].selected=true;$w.setTimeout(function(){if(INHTT.setOptions()[i])INHTT.setOptions()[i].selected=true;},1);  // bug fix, not selecting edited index;
		});
		$addEvent($gi("INHTTshowDepart_btn",this.settingsWindowNode()),'click',function(){  // school department;
			if(INHTT.curSetIndex()===false)return;
			INHTT.timeTableSetTemp[INHTT.curSetIndex()][1]=$gi("dlFilter",INHTT.settingsWindowNode()).selectedIndex;
		});
		$addEvent($gi("INHTTshowClass_btn",this.settingsWindowNode()),'click',function(){  // student class;
			if(INHTT.curSetIndex()===false)return;
			INHTT.timeTableSetTemp[INHTT.curSetIndex()][2]=$gi("dlObject",INHTT.settingsWindowNode()).selectedIndex;
		});
		$addEvent($gi("INHTTshowWeeks_btn",this.settingsWindowNode()),'click',function(){  // weeks;
			if(INHTT.curSetIndex()===false)return;
			INHTT.timeTableSetTemp[INHTT.curSetIndex()][3]=(INHTT.calculatedWeek==true?-1:$gi("lbWeeks",INHTT.settingsWindowNode()).selectedIndex);
			INHTT.calculatedWeek=false;
		});
		$addEvent($gi("INHTTshowDays_btn",this.settingsWindowNode()),'click',function(){  // days;
			if(INHTT.curSetIndex()===false)return;
			INHTT.timeTableSetTemp[INHTT.curSetIndex()][4]=$gi("lbDays",INHTT.settingsWindowNode()).selectedIndex;
		});
		$addEvent($gi("INHTTshowPeriod_btn",this.settingsWindowNode()),'click',function(){  // start and end time;
			if(INHTT.curSetIndex()===false)return;
			INHTT.timeTableSetTemp[INHTT.curSetIndex()][5]=$gi("dlPeriod",INHTT.settingsWindowNode()).selectedIndex;
		});
		$addEvent($gi("INHTTshowReport_btn",this.settingsWindowNode()),'click',function(){  // type of report;
			if(INHTT.curSetIndex()===false)return;
			INHTT.timeTableSetTemp[INHTT.curSetIndex()][6]=$gi("dlType",INHTT.settingsWindowNode()).selectedIndex;
		});
	},
	loadSettingsWindowValues: function(){
		$gi("INHTTlistToMenu",this.settingsWindowNode()).checked = this.listToMenu;
		$gi("INHTTshowNavBtn",this.settingsWindowNode()).checked = this.showNavBtn;
		$gi("INHTTshowDepart",this.settingsWindowNode()).checked = this.showDepart;
		$gi("INHTTshowSearch",this.settingsWindowNode()).checked = this.showSearch;
		$gi("INHTTshowClass", this.settingsWindowNode()).checked = this.showClass;
		$gi("INHTTshowWeeks", this.settingsWindowNode()).checked = this.showWeeks;
		$gi("INHTTshowDays",  this.settingsWindowNode()).checked = this.showDays;
		$gi("INHTTshowPeriod",this.settingsWindowNode()).checked = this.showPeriod;
		$gi("INHTTshowReport",this.settingsWindowNode()).checked = this.showReport;
		
		this.timeTableSetTemp=this.timeTableSet.clone();
		$rc($gi("INHTTsets",this.settingsWindowNode()));
		for(var i=0; i<this.timeTableSetTemp.length; i++){
			this.setOptions()[i] = new Option(this.timeTableSetTemp[i][0],i);
		}
		this.timeTableActiveTemp=this.timeTableActive;
		if((this.timeTableActiveTemp || this.timeTableActiveTemp===0) && this.timeTableSetTemp.length>this.timeTableActiveTemp){
			$sa(this.setOptions()[this.timeTableActiveTemp],"style","font-weight:bold;");
		//	this.setOptions()[this.timeTableActiveTemp].selected=true;
		}
		else{
			this.timeTableActiveTemp=false;
		}
	},

	loadSettings: function(){
		this.listToMenu=(typeof(listToMenuOverRide)=="boolean"?listToMenuOverRide:GM_getValue("INHTT.listToMenu",listToMenuDefault));
		this.showNavBtn=(typeof(showNavBtnOverRide)=="boolean"?showNavBtnOverRide:GM_getValue("INHTT.showNavBtn",showNavBtnDefault));
		this.showDepart=(typeof(showDepartOverRide)=="boolean"?showDepartOverRide:GM_getValue("INHTT.showDepart",showDepartDefault));
		this.showSearch=(typeof(showSearchOverRide)=="boolean"?showSearchOverRide:GM_getValue("INHTT.showSearch",showSearchDefault));
		this.showClass= (typeof(showClassOverRide)=="boolean"? showClassOverRide: GM_getValue("INHTT.showClass", showClassDefault));
		this.showWeeks= (typeof(showWeeksOverRide)=="boolean"? showWeeksOverRide: GM_getValue("INHTT.showWeeks", showWeeksDefault));
		this.showDays=  (typeof(showDaysOverRide)=="boolean"?  showDaysOverRide:  GM_getValue("INHTT.showDays",  showDaysDefault));
		this.showPeriod=(typeof(showPeriodOverRide)=="boolean"?showPeriodOverRide:GM_getValue("INHTT.showPeriod",showPeriodDefault));
		this.showReport=(typeof(showReportOverRide)=="boolean"?showReportOverRide:GM_getValue("INHTT.showReport",showReportDefault));
		this.timeTableSet=(typeof(timeTableSetOverRide)!="undefined"&&what.type.of(timeTableSetOverRide)=="array"?timeTableSetOverRide:eval(GM_getValue("INHTT.timeTableSet",timeTableSetDefault.toSource())));
		this.timeTableActive=(typeof(timeTableActiveOverRide)=="integer"||typeof(timeTableActiveOverRide)=="boolean"?timeTableActiveOverRide:GM_getValue("INHTT.timeTableActive",timeTableActiveDefault));
	},
	applySettings: function(){
		this.listToMenu = $gi("INHTTlistToMenu",this.settingsWindowNode()).checked;
		this.showNavBtn = $gi("INHTTshowNavBtn",this.settingsWindowNode()).checked;
		this.showDepart = $gi("INHTTshowDepart",this.settingsWindowNode()).checked;
		this.showSearch = $gi("INHTTshowSearch",this.settingsWindowNode()).checked;
		this.showClass  = $gi("INHTTshowClass", this.settingsWindowNode()).checked;
		this.showWeeks  = $gi("INHTTshowWeeks", this.settingsWindowNode()).checked;
		this.showDays   = $gi("INHTTshowDays",  this.settingsWindowNode()).checked;
		this.showPeriod = $gi("INHTTshowPeriod",this.settingsWindowNode()).checked;
		this.showReport = $gi("INHTTshowReport",this.settingsWindowNode()).checked;
		this.timeTableSet=this.timeTableSetTemp;
		this.timeTableActive=this.timeTableActiveTemp;
		
		this.saveSettings();

		this.executeSettings();
	},
	resetSettings: function(){
		if(confirm(language.localise(['INHTT','resetConfirm']))===true){
			this.listToMenu=(typeof(listToMenuOverRide)=="boolean"?listToMenuOverRide:listToMenuDefault);
			this.showNavBtn=(typeof(showNavBtnOverRide)=="boolean"?showNavBtnOverRide:showNavBtnDefault);
			this.showDepart=(typeof(showDepartOverRide)=="boolean"?showDepartOverRide:showDepartDefault);
			this.showSearch=(typeof(showSearchOverRide)=="boolean"?showSearchOverRide:showSearchDefault);
			this.showClass= (typeof(showClassOverRide)=="boolean"? showClassOverRide: showClassDefault);
			this.showWeeks= (typeof(showWeeksOverRide)=="boolean"? showWeeksOverRide: showWeeksDefault);
			this.showDays=  (typeof(showDaysOverRide)=="boolean"?  showDaysOverRide:  showDaysDefault);
			this.showPeriod=(typeof(showPeriodOverRide)=="boolean"?showPeriodOverRide:showPeriodDefault);
			this.showReport=(typeof(showReportOverRide)=="boolean"?showReportOverRide:showReportDefault);
			this.timeTableSet=this.timeTableSetTemp=(typeof(timeTableSetOverRide)!="undefined"&&what.type.of(timeTableSetOverRide)=="array"?timeTableSetOverRide:timeTableSetDefault);
			this.timeTableActive=this.timeTableActiveTemp=(typeof(timeTableActiveOverRide)=="integer"||typeof(timeTableActiveOverRide)=="boolean"?timeTableActiveOverRide:timeTableActiveDefault);

			this.saveSettings();

			this.loadSettingsWindowValues();

			this.executeSettings();
	}	},
	saveSettings: function(){
		GM_setValue("INHTT.listToMenu",this.listToMenu);
		GM_setValue("INHTT.showNavBtn",this.showNavBtn);
		GM_setValue("INHTT.showDepart",this.showDepart);
		GM_setValue("INHTT.showSearch",this.showSearch);
		GM_setValue("INHTT.showClass", this.showClass);
		GM_setValue("INHTT.showWeeks", this.showWeeks);
		GM_setValue("INHTT.showDays",  this.showDays);
		GM_setValue("INHTT.showPeriod",this.showPeriod);
		GM_setValue("INHTT.showReport",this.showReport);
		this.timeTableSet=this.timeTableSetTemp.clone();
		GM_setValue("INHTT.timeTableSet",this.timeTableSet.toSource());
		this.timeTableActive=this.timeTableActiveTemp;
		GM_setValue("INHTT.timeTableActive",this.timeTableActive);
	},
	executeSettings: function(){
	//	this.doeStuff();
	},

	doClone: function(nodeStr,nNodeStr){
		if($gi(nodeStr,this.settingsWindowNode()) && $gi(nNodeStr)){
			$ac($gi(nodeStr,this.settingsWindowNode()),$gi(nNodeStr).cloneNode(true));
			$ra($gi(nNodeStr,this.settingsWindowNode()),"size");
			$ra($gi(nNodeStr,this.settingsWindowNode()),"multiple");
			$sa($gi(nNodeStr,this.settingsWindowNode()),"style","padding: 1px 0 1px 0; margin-top:1px; width:349px;");
			$sa($gi(nodeStr,this.settingsWindowNode()),"style","display:inline;");
			$gi(nNodeStr,this.settingsWindowNode()).selectedIndex=0;
	}	},
	curSetIndex: function(){
		return $gi("INHTTsets",this.settingsWindowNode()).selectedIndex>=0?$gi("INHTTsets",this.settingsWindowNode()).selectedIndex:false;
	},
	setOptions: function(){
		return $gi("INHTTsets",this.settingsWindowNode()).options;
}	}

INHTT.init();  // execute;

}, true);



//*** STATISTICS ***//
// Words: 2.471;
// Characters (no spaces): 40.594;
// Characters (with spaces): 44.676;
// Lines: 738;