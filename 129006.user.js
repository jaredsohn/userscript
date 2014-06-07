// ==UserScript==
// @name           WM Forms Library
// @namespace      WM Forms Library
// @description    A forms library for javascript
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        1.0.1
// @copyright      Charlie Ewing
// @require        http://userscripts.org/scripts/source/123889.user.js
// ==/UserScript== 

(function() {
	// Enums
	this.baseIcon="http://i1181.photobucket.com/albums/x430/merricksdad/";
	this.whiteIcon=baseIcon+"White%20128/";

	this.TOPLEFT=0;
	this.TOPCENTER=1;
	this.TOPRIGHT=2;
	this.MIDDLELEFT=3;
	this.MIDDLECENTER=4;
	this.MIDDLERIGHT=5;
	this.BOTTOMLEFT=6;
	this.BOTTOMCENTER=7;
	this.BOTTOMRIGHT=8;


	// Set up images array
	this.imgs = {


		logo : "http://i43.tinypic.com/2h660py.png",
		icon : "http://i56.tinypic.com/s46edh.jpg",
		fb : "http://i1212.photobucket.com/albums/cc445/gmbha1/facebook.gif",
		plugin : "http://i52.tinypic.com/jkfxmw.png",
		pluginwm : "http://i52.tinypic.com/28vsw01.png",
		filter : "http://i632.photobucket.com/albums/uu45/kirkshulman/main-icon-filter-normal.png",
		noimage : "http://i230.photobucket.com/albums/ee21/trssdetroit8/noimage.jpg",
		warning : "http://i1200.photobucket.com/albums/bb334/Toby99976/Icons%20Symbols%20Warning%20Caution%20Comment%20Minichan/Farm-Fresh_exclamation.png",
		excluded : "http://i51.tinypic.com/fu2stw.png",
		identified : "http://i53.tinypic.com/2n0j6ds.png",
		grid50 : "http://i43.tinypic.com/11aerk7.png",
		tool : "http://i255.photobucket.com/albums/hh126/roballey/Icons/tool_24x24.png",

		movetotop : this.whiteIcon+"MoveTop.png",
		movetobottom : this.whiteIcon+"MoveBottom.png",

		do : this.whiteIcon+"Do.png",

		markasfailed : this.whiteIcon+"X.png",
		markasaccepted : this.whiteIcon+"Check.png",

		trash : this.whiteIcon+"Trash.png",
		reidentify : this.whiteIcon+"ID.png",
		reidentify2 : "http://i1181.photobucket.com/albums/x430/merricksdad/Image14-2.png",
		tag : this.whiteIcon+"Tag.png",

		pin : this.whiteIcon+"Pin.png",
		pinned : this.whiteIcon+"Pinned.png",

		likepost : this.whiteIcon+"Like.png",
		unlikepost : this.whiteIcon+"Unlike.png",

		stop : this.whiteIcon+"Stop.png",
		pause : this.whiteIcon+"Pause.png",
		play : this.whiteIcon+"Play.png",
		back : this.whiteIcon+"Back.png",
		up : this.whiteIcon+"Collapse.png",
		down : this.whiteIcon+"Expand.png",

		collapse : this.whiteIcon+"Collapse.png",
		expand : this.whiteIcon+"Expand.png",
		collapse2 : this.whiteIcon+"Collapse2.png",
		expand2 : this.whiteIcon+"Expand2.png",
		collapse3 : this.whiteIcon+"Collapse3.png",
		expand3 : this.whiteIcon+"Expand3.png",

		feeds : this.whiteIcon+"Feed.png",
		classic : this.whiteIcon+"Classic.png",
		dev : this.whiteIcon+"Details.png",
		short : this.whiteIcon+"Short.png",
		priority : "priority.png",

		check : this.whiteIcon+"Check.png",
		refresh : this.whiteIcon+"Refresh.png",

		newwindow : this.whiteIcon+"NewWindow.png",

		uplevel : this.whiteIcon+"MoveUp.png",
		downlevel : this.whiteIcon+"MoveDown.png",

		arrowup: this.whiteIcon+"UpArrow.png",
		arrowdown: this.whiteIcon+"DownArrow.png",
		arrowleft: this.whiteIcon+"LeftArrow.png",
		arrowright: this.whiteIcon+"RightArrow.png",

		x : this.whiteIcon+"X.png",
		plus : this.whiteIcon+"Plus.png",
		
		clone: this.whiteIcon+"Clone.png",

		selectall : "http://i55.tinypic.com/6ih93q.png",
		selectnone : "http://i55.tinypic.com/2lk2xyw.png",

		white : "http://i1181.photobucket.com/albums/x430/merricksdad/sheets/white.png",
		black : "http://i1181.photobucket.com/albums/x430/merricksdad/sheets/black.png",

		more : "http://i1181.photobucket.com/albums/x430/merricksdad/more.png",
	};

//***************************************************************************************************************************************
//***** CSS Library and Constructors for Visual Form Elements
//************************************************************************************************************************************

	this.forms = {
		//multiple use tab and section selector for use with coolbars and tabs of various types
		selectTabAndSection: function(id,tabType,sectionType){
			var src=$(tabType+"_"+id), dest=$(sectionType+"_"+id);

			//unselect all pages and tabs
			forNodes(
				".//*[(contains(@id,'"+tabType+"_') or contains(@id,'"+sectionType+"_')) and contains(@class,'selected')]",
				{node:( (tabType=="wmMainItem")?document.documentElement:src.parentNode.parentNode) }, //special case for top level menu
				function(e){e.className=e.className.removeWord("selected");}
			);

			//select specified tab and page
			src.className=src.className.addWord("selected");
			dest.className=dest.className.addWord("selected");
		},

		showFormSection: function(){
			forms.selectTabAndSection(this.id.split("_")[1],"wmCoolItem","wmCoolPage");
		},

		showTabSection: function(){
			forms.selectTabAndSection(this.id.split("_")[1],"wmTabItem","wmTabPage");
		},

		css: (""+
				".forms.wrapper {}\n"+

				//coolbars
				".forms.oldcoolBar {background-color:#FFFFFF; height:64px; border-bottom:1px solid #CCCCDD; border-radius: 3px 3px 0px 0px; overflow:hidden;}\n"+
				".forms.oldcoolBar .item {position:relative; width:64px; height:64px; display:inline-block; }\n"+
				".forms.oldcoolBar .item.selected {background-color:#C1D2EE;}\n"+
				".forms.oldcoolBar .item .icon {position:absolute; width:32px; height:32px; left:16px; top: 4px;}\n"+
				".forms.oldcoolBar .item .title {position:absolute; font-size:10px; line-height:12px; width:64px; text-align:center; top: 40px;}\n"+
				".forms.oldcoolBar .item:hover {background-color:#E0E8F6 !important;}\n"+
				".forms.oldcoolBar .slider {}\n"+
				".forms.oldcoolBar.scrollX {height:81px;}\n"+
				".forms.oldcoolPage {display:none; background-color:#EEEEFF; overflow:hidden;}\n"+
				".forms.oldcoolPage.selected {display:block; }\n"+

				//tabs
				".forms.tabBar {font-size:8pt; position:relative; margin-top:12px; margin-left:6px; margin-right:6px; top:1px; z-index:1;}\n"+
				".forms.tabBar .tabButton {position:relative; background-color:#D2D2D2; border:1px solid #CCCCDD; border-bottom:none; border-radius:3px 3px 0px 0px; padding-top:4px; padding-right:6px; padding-left:6px;}\n"+
				".forms.tabBar .tabButton.selected {background-color:#F0F0F0; padding-bottom:4px; top:-4px;}\n"+					
				".forms.tabPage {position:relative; margin-left:6px; margin-right:6px; background-color:#F0F0F0; border: 1px solid #CCCCDD; border-radius:0px 3px 3px 3px; padding:6px; overflow:hidden; display:none; top:-1px; overflow-x:hidden; overflow-y:scroll;}\n"+
				".forms.tabPage.selected {display:block; }\n"+

				//fatTab tab subtype
				".fat > .forms.tabBar{top:5px;}\n"+
				".fat > .forms.tabBar > .tabButton:last-child {border-radius:0 10px 0 0;}\n"+
				".fat > .forms.tabBar > .tabButton:first-child {border-radius:10px 0 0 0;}\n"+
				".fat > .forms.tabBar > .tabButton {line-height:24px; color: #848484; background-color:#494949; border:none; border-radius:0 0 0 0; padding:3px 12px 0; font-family:Impact; font-size:16px; top:0px;}\n"+
				".fat > .forms.tabBar > .tabButton.selected {color:white; background-color:#848484; border:4px solid #494949; border-bottom:none; border-radius:10px 10px 0px 0px; padding-top:6px; font-size:18px;}\n"+
				".fat > .forms.tabBar > .tabButton:hover {color:white;}\n"+
				".fat > .forms.tabPage {background-color:#848484; border: 4px solid #494949; border-radius:0px 10px 10px 10px; color: white; top:0px; }\n"+

				//frames
				".forms.frame {position:relative; border-radius:3px; border: 1px solid #CCCCDD; padding:6px; background-color:#F0F0F0; margin-top:12px; margin-left:6px; margin-right:6px;}\n"+
				".forms.frame .caption {position:absolute; top:-10px; left:4px; font-size:8pt; line-height:12px; background-color:#F0F0F0; padding:2px;}\n"+

				//fatFrame frame subtype
				".fat > .forms.frame {background-color: #848484; border: 4px solid #494949; border-radius: 10px; color: white; margin-top: 20px; padding: 18px 6px 6px; }\n"+
				".fat > .forms.frame > .caption { background-color: #494949; border-radius: 10px; color: white; font-family: Impact; font-size: 16px; left: 6px; line-height: 20px; padding: 4px 12px; top: -16px;}\n"+

				//treeview
				".forms.treeView.branch {display:block; border: 1px solid #DDDDEE; border-bottom:none; background-color:#DDDDEE; color:#3B5998; font-size:16px; margin-left:6px; margin-right:6px;}\n"+
				".forms.treeView.branch > .handle {width:24px; height:24px; display:inline-block; vertical-align:top;}\n"+
				".forms.treeView.branch > .handle > img {width:24px; height:24px; background-color:#3B5998; border-radius:5px;}\n"+
				".forms.treeView.branch > .title {line-height:24px; vertical-align:top; display:inline-block; margin-left:5px;}\n"+
				".forms.treeView.branch > .kids {display:none; padding-left: 20px;}\n"+
				".forms.treeView.branch:first-child {border-radius:5px 5px 0 0; margin-top:6px;}\n"+
				".forms.treeView.branch:last-child {border-radius:0 0 5px 5px; border-bottom:1px solid #DDDDEE; margin-bottom:6px;}\n"+
				".forms.treeView.branch:only-child {border-radius:5px;}\n"+
				".forms.treeView.branch:hover {color:white !important; background-color:#E0E8F6 !important;}\n"+
				".forms.treeView.branch.selected {color:black !important; background-color:white !important; border-color:white;}\n"+
				".forms.treeView.branch.selected:hover {background-color:#E8ECFB !important; color:gray !important;}\n"+
				".forms.treeView.branch.expanded > .kids {display:block !important;}\n"+

				//fatTree treeView subtype
				".fat > .forms.treeView.branch {border: 4px solid #494949; background-color:#494949; color:#848484; font-family:Impact;}\n"+
				".fat > .forms.treeView.branch > .handle > img {background-color:#494949;}\n"+
				".fat > .forms.treeView.branch:first-child {border-radius:10px 10px 0 0;}\n"+
				".fat > .forms.treeView.branch:last-child {border-radius:0 0 10px 10px; border-bottom:4px solid #494949;}\n"+
				".fat > .forms.treeView.branch:only-child {border-radius:10px;}\n"+
				".fat > .forms.treeView.branch:hover {color:white !important; background-color:#848484 !important;}\n"+
				".fat > .forms.treeView.branch.selected {color:black !important; background-color:white !important; border-color:white;}\n"+
				".fat > .forms.treeView.branch.selected:hover {color:gray !important; background-color:#C0C0C0 !important;}\n"+

				//selectionList
				".forms.selectionList {background-color: ButtonFace; border-radius: 5px; border: 1px solid ActiveBorder; margin-top: 10px; padding: 10px 5px 5px; position: relative; width: 100%;}\n"+
				".forms.selectionList > .title {background-color: ButtonFace; border-radius: 5px; color: ButtonText; line-height: 12px; padding: 5px 10px; position: absolute; top: -12px;}\n"+
				".forms.selectionList > .kids {background-color: Window; border-radius: 5px; border: 1px solid ActiveBorder; overflow-x: hidden ! important; overflow-y: scroll ! important; height:100px;}\n"+
				".forms.selectionList > .kids > .selectionListItem {position:relative; border-bottom: 1px dashed ThreeDShadow; color: WindowText; height:18px;}\n"+
				".forms.selectionList > .kids > .selectionListItem:last-child {border-bottom: none !important;}\n"+
				".forms.selectionList > .kids > .selectionListItem.selected {background-color: Highlight; color: HighlightText;}\n"+
				".forms.selectionList > .kids > .selectionListItem:hover {background-color: Menu; color:MenuText;}\n"+
				".forms.selectionList > .kids > .selectionListItem > .caption {display:inline-block; margin-left:10px;}\n"+
				".forms.selectionList > .kids > .selectionListItem > .tools {display:inline-block; position:absolute; right:5px;}\n"+
				".forms.selectionList > .kids > .selectionListItem > .tools > .tool {background-color:ThreeDShadow ; border-radius: 5px; border: medium none; display: inline-block; height: 16px; vertical-align: top; width: 16px; margin:1px;}\n"+
				".forms.selectionList > .kids > .selectionListItem > .tools > .tool:hover {background-color: Highlight !important;}\n"+
				".forms.selectionList > .kids > .selectionListItem > .tools > .tool > img {height: 16px; width: 16px;}\n"+
				".forms.selectionList > .addNew > .addInput {border: 1px solid ActiveBorder; border-radius: 5px; margin: 6px 6px 0 0; padding: 3px; vertical-align: top; width: 80%;}\n"+
				".forms.selectionList > .addNew > .addButton {background-color: ButtonShadow; border: 1px solid ActiveBorder; border-radius: 5px; height: 16px; margin-top: 6px; padding: 3px; width: 16px;}\n"+
				".forms.selectionList > .addNew > .addButton:hover {background-color: Highlight !important; }\n"+

				//fat selectionList subtype
				".fat > .forms.selectionList {background-color: #848484; border-radius: 10px; border: 4px solid #494949; margin-top: 20px; padding-top: 20px;}\n"+
				".fat > .forms.selectionList > .title {background-color: #848484; border-radius: 10px; border: 4px solid #494949; color: white; font-family: Impact; font-size: 16px; font-weight: normal; line-height: 20px; padding: 4px 12px; top: -20px;}\n"+
				".fat > .forms.selectionList > .kids {border: 4px solid #494949; border-radius:10px; }\n"+
				".fat > .forms.selectionList > .kids > .selectionListItem {background-color: #494949; border-bottom: 2px solid #494949; color: #848484; font-family: Impact; font-size: 14px;}\n"+
				".fat > .forms.selectionList > .kids > .selectionListItem:hover {background-color:#848484; color:white;}\n"+
				".fat > .forms.selectionList > .kids > .selectionListItem.selected {background-color: white; color: black;}\n"+
				".fat > .forms.selectionList > .kids > .selectionListItem.selected:hover {background-color: #CACACA; color:gray;}\n"+
				".fat > .forms.selectionList > .kids > .selectionListItem > .caption {}\n"+
				".fat > .forms.selectionList > .kids > .selectionListItem > .tools {}\n"+
				".fat > .forms.selectionList > .kids > .selectionListItem > .tools > .tool {}\n"+
				".fat > .forms.selectionList > .kids > .selectionListItem > .tools > .tool > img {}\n"+
				".fat > .forms.selectionList > .addNew > .addInput {border: 4px solid #494949 !important; border-radius:10px !important;}\n"+
				".fat > .forms.selectionList > .addNew > .addButton {border: 4px solid #494949; border-radius:10px; background-color: #494949;}\n"+
				".fat > .forms.selectionList > .addNew > .addButton:hover {background-color: #848484 !important;}\n"+

				//tabControl
				".forms.tabControl {}\n"+
				".forms.tabControl > .tabButtons {position:relative; top:1px; z-index:1;}\n"+
				".forms.tabControl > .tabButtons > .tabButton {background-color:ActiveBorder; color:ButtonText; border:1px solid ActiveBorder; border-bottom:none; display:inline-block; vertical-align:bottom; padding:3px 6px 0;}\n"+
				".forms.tabControl > .tabButtons > .tabButton > img {vertical-align:top; position:relative; width:16px; height:16px; display:inline-block; top:-2px; padding-right:3px;}\n"+
				".forms.tabControl > .tabButtons > .tabButton > .title {vertical-align:top; display:inline-block; line-height:16px;}\n"+
				".forms.tabControl > .tabButtons > .tabButton:first-child {border-radius:5px 0 0 0;}\n"+
				".forms.tabControl > .tabButtons > .tabButton:last-child {border-radius:0 5px 0 0;}\n"+
				".forms.tabControl > .tabButtons > .tabButton:only-child {border-radius:5px 5px 0 0;}\n"+
				".forms.tabControl > .tabButtons > .tabButton.selected {background-color:ButtonFace; padding:3px 6px; border-radius:5px 5px 0 0;}\n"+
				".forms.tabControl > .tabPages {z-index:0; border:1px solid ActiveBorder; background-color:ButtonFace; padding:5px; border-radius:0 5px 5px 5px; overflow:hidden;}\n"+
				".forms.tabControl > .tabPages > .tabPage {display:none;}\n"+
				".forms.tabControl > .tabPages > .tabPage.selected {display:block;}\n"+

				//tabControl as coolBar
				".forms.tabControl.coolBar {}\n"+
				".forms.tabControl.coolBar > .tabButtons {background-color: window; border: 1px solid activeborder; border-radius: 5px 5px 0 0; overflow:hidden;}\n"+
				".forms.tabControl.coolBar > .tabButtons > .tabButton {background-color: transparent; border: 0; border-radius: 0; height: 64px; width: 64px; color:windowtext; padding:0;}\n"+
				".forms.tabControl.coolBar > .tabButtons > .tabButton > img {display:block; width:32px; height:32px; top:4px; left:16px;}\n"+
				".forms.tabControl.coolBar > .tabButtons > .tabButton > .title {display:block; font-size: 10px; line-height: 12px; position: absolute; text-align: center; top: 40px; width: 64px;}\n"+
				".forms.tabControl.coolBar > .tabButtons > .tabButton:hover {background-color:#E0E8F6 !important;}\n"+
				".forms.tabControl.coolBar > .tabButtons > .tabButton.selected {padding:0; border:0; background-color:menu;}\n"+
				".forms.tabControl.coolBar > .tabPages {border-radius: 0 0 5px 5px;}\n"+

				//tabControl as coolBar2
				".forms.tabControl.coolBar2 {border:1px solid activeborder; border-radius: 5px 5px 0 0; overflow:hidden; background: -moz-linear-gradient(top, #fbfdff 0%, #dce7f5 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fbfdff), color-stop(100%,#dce7f5)); background: -webkit-linear-gradient(top, #fbfdff 0%, #dce7f5 100%); background: -o-linear-gradient(top, #fbfdff 0%, #dce7f5 100%); background: linear-gradient(top, #fbfdff 0%, #dce7f5 100%); background-color:#white;}\n"+
				".forms.tabControl.coolBar2 > .tabButtons {background-color: transparent; border: 1px solid activeborder; border-radius: 5px 5px 0 0; overflow:hidden;}\n"+
				".forms.tabControl.coolBar2 > .tabButtons > .tabButton {padding:0; border:1px solid transparent; background-color: transparent; border-radius: 0; height: 62px; width: 46px; color:windowtext;}\n"+
				".forms.tabControl.coolBar2 > .tabButtons > .tabButton > img {display:block; width:32px; height:32px; top:3px; left:7px;}\n"+
				".forms.tabControl.coolBar2 > .tabButtons > .tabButton > .title {display:block; font-size: 10px; line-height: 12px; position: absolute; text-align: center; top: 40px; width: 46px;}\n"+
				".forms.tabControl.coolBar2 > .tabButtons > .tabButton:hover {box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.75) inset; border:1px solid transparent; border-radius:3px; background: -moz-linear-gradient(top, #fdecdb 0%, #fddeb8 39%, #ffce68 40%,#fff698 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fdecdb), color-stop(39%,#fddeb8), color-stop(40%,#ffce68), color-stop(100%,#fff698)); background: -webkit-linear-gradient(top, #fdecdb 0%, #fddeb8 39%, #ffce68 40%,#fff698 100%); background: -o-linear-gradient(top, #fdecdb 0%, #fddeb8 39%, #ffce68 40%,#fff698 100%); background: linear-gradient(top, #fdecdb 0%, #fddeb8 39%, #ffce68 40%,#fff698 100%); background-color:#ffce68;}\n"+
				".forms.tabControl.coolBar2 > .tabButtons > .tabButton.selected {box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.75) inset; border:1px solid #ffb700; border-radius:3px; background: -moz-linear-gradient(top, #fdecdb 0%, #fddeb8 39%, #ffce68 40%,#fff698 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fdecdb), color-stop(39%,#fddeb8), color-stop(40%,#ffce68), color-stop(100%,#fff698)); background: -webkit-linear-gradient(top, #fdecdb 0%, #fddeb8 39%, #ffce68 40%,#fff698 100%); background: -o-linear-gradient(top, #fdecdb 0%, #fddeb8 39%, #ffce68 40%,#fff698 100%); background: linear-gradient(top, #fdecdb 0%, #fddeb8 39%, #ffce68 40%,#fff698 100%); background-color:#ffce68;}\n"+
				".forms.tabControl.coolBar2 > .tabPages {border-radius: 0 0 5px 5px;}\n"+


				//accordion
				".forms.accordion {}\n"+
				".forms.accordion > tr > td {vertical-align:top; border:1px solid activeborder; background-color:window; color:windowtext;}\n"+
				".forms.accordion > tr > td.noBorder {border:none !important;}\n"+
				".forms.accordion > tr > td > .header {vertical-align:top; background-color: threedface; border:1px solid window; position:relative;}\n"+
				".forms.accordion > tr > td > .header > * {display:inline-block; vertical-align:top;}\n"+
				".forms.accordion > tr > td > .header > img {width:16px; height:16px; padding:2px;}\n"+
				".forms.accordion > tr > td > .header > .title {line-height:20px; padding:0 3px; color:buttontext;}\n"+
				".forms.accordion > tr > td > .header > .tools {position: absolute; right: 0;}\n"+
				".forms.accordion > tr > td > .header > .tools > .tool {width:16px; height:16px;}\n"+
				".forms.accordion > tr > td > .header > .tools > .tool:hover {}\n"+
				".forms.accordion > tr > td > .content {color:windowtext; vertical-align:top;}\n"+
				".forms.accordion > tr > td.collapsed > .content {display:none !important;}\n"+
				".forms.accordion.ttb > tr > td.collapsed  {height:22px !important;}\n"+
				".forms.accordion.rtl > tr > td > .header {float:left; width:20px;}\n"+
				".forms.accordion.rtl > tr > td > .header > .title {-moz-transform: rotate(-90deg); -moz-transform-origin: 7px 50%; bottom: 16px; left: 3px; padding: 3px; position: absolute;}\n"+
				".forms.accordion.rtl > tr > td > .header > .tools {bottom: 0; left:0; position: absolute;}\n"+
				".forms.accordion.rtl > tr > td > .content {padding:0;}\n"+
				".forms.accordion.rtl > tr > td.collapsed  {width:22px !important;}\n"+


				//stdPanel
				".forms.stdPanel {vertical-align:top; border:1px solid activeborder; background-color:window; color:windowtext;}\n"+
				".forms.stdPanel.noBorder {border:none !important;}\n"+
				".forms.stdPanel > .header {vertical-align:top; background-color: threedface; border:1px solid window; position:relative;}\n"+
				".forms.stdPanel > .header > * {display:inline-block; vertical-align:top;}\n"+
				".forms.stdPanel > .header > img {width:16px; height:16px; padding:2px;}\n"+
				".forms.stdPanel > .header > .title {line-height:20px; padding:0 3px; color:buttontext;}\n"+
				".forms.stdPanel > .header > .tools {position: absolute; right: 0;}\n"+
				".forms.stdPanel > .header > .tools > .tool {width:16px; height:16px;}\n"+
				".forms.stdPanel > .header > .tools > .tool:hover {}\n"+
				".forms.stdPanel > .content {color:windowtext; vertical-align:top;}\n"+
				".forms.stdPanel.collapsed > .content {display:none !important;}\n"+
				".forms.stdPanel.ttb.collapsed {height:22px !important;}\n"+
				".forms.stdPanel.rtl {display:table-cell;}\n"+
				".forms.stdPanel.rtl > .header {float:left; width:20px;}\n"+
				".forms.stdPanel.rtl > .header > .title {-moz-transform: rotate(-90deg); -moz-transform-origin: 7px 50%; bottom: 16px; left: 3px; padding: 3px; position: absolute;}\n"+
				".forms.stdPanel.rtl > .header > .tools {bottom: 0; left:0; position: absolute;}\n"+
				".forms.stdPanel.rtl > .content {padding:1px;}\n"+
				".forms.stdPanel.rtl.collapsed {width:22px !important;}\n"+


				//groupTable
				".forms.table {}\n"+
				".forms.table > .header {}\n"+
				".forms.table > .content {}\n"+
				".forms.table > .content.border {border:1px solid activeborder;}\n"+
				".forms.table > .content > .colGroups {}\n"+
				".forms.table > .content > .colGroups > .colGroup {display:inline-block; vertical-align:top; border:1px solid window; background-color:activeborder; border-bottom:none; border-radius:5px 5px 0 0; font-weight:bold; overflow:hidden;}\n"+
				".forms.table > .content > .colGroups > .colGroup > .tool.whenPinched {position:relative; top:1px; left:1px; margin-bottom:2px;}\n"+
				".forms.table > .content > .colGroups > .colGroup > .header {border:1px solid transparent; background-color:transparent;}\n"+
				".forms.table > .content > .colHeaders {}\n"+
				".forms.table > .content > .colHeaders > .column {display:inline-block; vertical-align:top; border:1px solid window; float:none; background-color:threedface; border-bottom:none; border-radius:5px 5px 0 0; overflow:hidden;}\n"+
				".forms.table > .content > .colHeaders > .column > .tool.whenPinched {position:relative; top:1px; left:1px; margin-bottom:2px;}\n"+
				".forms.table > .content > .colHeaders > .column > .header {border:1px solid transparent; background-color:transparent;}\n"+
				".forms.table > .content > .row {background-color:threedface;}\n"+
				".forms.table > .content > .row > .header {display:inline-block; background-color:transparent;}\n"+
				".forms.table > .content > .row > .cells {display:inline-block;}\n"+
				".forms.table > .content > .row > .cells > .cell {display:inline-block; border: 1px solid activeborder; border-radius:4px; margin-right:-1px;vertical-align:top;}\n"+
				".forms.table > .content > .rowGroup {border:1px solid window; border-radius:5px; overflow:hidden;}\n"+
				".forms.table > .content > .rowGroup > .groupHeaderRow {background-color:activeborder; color:windowtext; font-weight:bold; border-radius:0 0 4px 0;}\n"+
				".forms.table > .content > .rowGroup > .groupHeaderRow > .header {display:inline-block; background-color:transparent;}\n"+
				".forms.table > .content > .rowGroup > .groupHeaderRow > .tools {display:inline-block; text-align:center; border:1px solid transparent; margin-right:-1px; line-height:0px; vertical-align:top; height:20px;}\n"+
				".forms.table > .content > .rowGroup > .groupHeaderRow > .tools > .tool {width:16px; height:16px;}\n"+
				".forms.table > .content > .rowGroup > .content {margin-top:1px;}\n"+
				".forms.table > .content > .rowGroup > .content > .row {background-color:threedface;}\n"+
				".forms.table > .content > .rowGroup > .content > .row > .header {display:inline-block; background-color:transparent;}\n"+
				".forms.table > .content > .rowGroup > .content > .row > .cells {display:inline-block;}\n"+
				".forms.table > .content > .rowGroup > .content > .row > .cells > .cell {display:inline-block; border: 1px solid activeborder; border-radius:4px; margin-right:-1px;vertical-align:top;}\n"+


				//form panel
				".forms.form {box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.75) inset;border:1px solid activeborder;border-radius:7px 7px 0 0;background: -moz-linear-gradient(top, #bbccdd 0%, #ddeeff 30px);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#bbccdd), color-stop(30px,#ddeeff)); background: -webkit-linear-gradient(top, #bbccdd 0%,#ddeeff 30px);background: -o-linear-gradient(top, #bbccdd 0%,#ddeeff 30px); background: linear-gradient(top, #bbccdd 0%,#ddeeff 30px); overflow:hidden;background-color: #bbccdd; }\n"+
				".forms.form > .inner {width:100%;height:100%;}\n"+
				".forms.form > .inner > .header {}\n"+
				".forms.form > .inner > .header > * {vertical-align:top;padding:7px;padding-bottom:0;}\n"+
				".forms.form > .inner > .header > .iconBox {width:16px; height:16px; padding-right:0;}\n"+
				".forms.form > .inner > .header > .iconBox > .icon {}\n"+
				".forms.form > .inner > .header > td > .title {font-family:'Microsoft Sans Serif';font-size:9pt; overflow:hidden; text-overflow:ellipsis;}\n"+
				".forms.form > .inner > .header > .controlBox {text-align:right;}\n"+
				".forms.form > .inner > .header > .controlBox > .control {border:1px solid rgba(0,0,0,0.25);border-radius:3px;box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.75) inset;border:1px solid activeborder;background: -moz-linear-gradient(top, #bbccdd 0%, #ddeeff 50%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#bbccdd), color-stop(50%,#ddeeff));background: -webkit-linear-gradient(top, #bbccdd 0%,#ddeeff 50%);background: -o-linear-gradient(top, #bbccdd 0%,#ddeeff 50%);background: linear-gradient(top, #bbccdd 0%,#ddeeff 50%);height:16px;width:29px;text-align:center;display:inline-block; margin-left:3px; background-color: #bbccdd;}\n"+
				".forms.form > .inner > .header > .controlBox > .control > *{display:inline-block;}\n"+
				".forms.form > .inner > tr > .container {padding:7px;padding-top:0;height:100%;}\n"+
				".forms.form > .inner > tr > .container > .content {background:#f0f0f0;overflow:hidden;width:100%;height:100%;position:relative;top:-1px;left:-1px;border:1px solid transparent;}\n"+
				".forms.form.active {border:1px solid black;background: -moz-linear-gradient(top, #98b4d0 0%, #d6e4f3 40%, #bad2ea 41%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#98b4d0), color-stop(40%,#d6e4f3), color-stop(41%,#bad2ea)); background: -webkit-linear-gradient(top, #98b4d0 0%, #d6e4f3 40%, #bad2ea 41%);background: -o-linear-gradient(top, #98b4d0 0%, #d6e4f3 40%, #bad2ea 41%); background: linear-gradient(top, #98b4d0 0%, #d6e4f3 40%, #bad2ea 41%); background-color: #bad2ea; }\n"+
				".forms.form.active > .inner > .header > .controlBox > .control {border-color:rgba(0,0,0,0.5); background: -moz-linear-gradient(top, #98b4d0 0%, #d6e4f3 50%, #bad2ea 51%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#98b4d0), color-stop(50%,#d6e4f3), color-stop(51%,#bad2ea)); background: -webkit-linear-gradient(top, #98b4d0 0%, #d6e4f3 50%, #bad2ea 51%);background: -o-linear-gradient(top, #98b4d0 0%, #d6e4f3 50%, #bad2ea 51%); background: linear-gradient(top, #98b4d0 0%, #d6e4f3 50%, #bad2ea 51%); background-color: #bad2ea; }\n"+
				".forms.form.active > .inner > tr > .container > .content {border-color:activeborder;}\n"+

				//form panel with win7 control box
				".forms.form > .inner > .header > .controlBox.win7 {padding-top:0;}\n"+
				".forms.form > .inner > .header > .controlBox.win7 > .control {border-radius:0px;margin-left:-1px;position:relative;top:-1px;}\n"+
				".forms.form > .inner > .header > .controlBox.win7 > .control:first-child {border-radius:0 0 0 5px;}\n"+
				".forms.form > .inner > .header > .controlBox.win7 > .control:last-child {border-radius:0 0 5px 0;}\n"+


				//form menustrip
				".forms.menuStrip {height:24px; width:100%; background: -moz-linear-gradient(left, #f0f0f0 0%, #fbfbfb 100%);background: -webkit-gradient(linear, left top, right top, color-stop(0%,#f0f0f0), color-stop(100%,#fbfbfb)); background: -webkit-linear-gradient(left, #f0f0f0 0%,#fbfbfb 100%);background: -o-linear-gradient(left, #f0f0f0 0%, #fbfbfb 100%); background: linear-gradient(left, #f0f0f0 0%, #fbfbfb 100%); background-color: #f0f0f0; position:relative; z-index:0;}\n"+
				".forms.menuStrip > .menuStripItem {border:1px solid transparent; background-color:transparent; z-index:-1; margin-top:2px; position:relative; display:inline-block;}\n"+
				".forms.menuStrip > .menuStripItem:first-child {margin-left:6px;}\n"+
				".forms.menuStrip > .menuStripItem:hover {border:1px solid #808080; border-bottom-color:#fdfdfd; background-color:#fdfdfd; z-index:1; }\n"+
				".forms.menuStrip.collapsed > .menuStripItem:hover {border:1px solid #3399ff; background-color:#c2e0ff;}\n"+
				".forms.menuStrip > .menuStripItem.noKids:hover {border:1px solid #3399ff; background-color:#c2e0ff;}\n"+
				".forms.menuStrip > .menuStripItem > .title {border:1px solid transparent; height:16px; overflow:hidden; text-overflow:ellipsis; font-family:'Microsoft Sans Serif';font-size:9pt; position:relative; z-index:1; padding: 0 6px 2px 6px; background-color:transparent;}\n"+
				".forms.menuStrip > .menuStripItem:hover > .title {border:1px solid #fdfdfd; background-color:#fdfdfd;}\n"+
				".forms.menuStrip.collapsed > .menuStripItem:hover > .title {border:1px solid transparent; background-color:transparent;}\n"+
				".forms.menuStrip > .menuStripItem.noKids:hover > .title {border:1px solid transparent; background-color:transparent;}\n"+
				".forms.menuStrip > .menuStripItem > .flyOut {border:1px solid #808080; position:absolute; top:17px; left:-1px; z-index:0; padding:1px; background: -moz-linear-gradient(left, #fbfbfb 0%, #f1f1f1 22px, #fdfdfd 23px); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#fbfbfb), color-stop(22px,#f1f1f1), color-stop(23px,#fdfdfd)); background: -webkit-linear-gradient(left, #fbfbfb 0%, #f1f1f1 22px, #fdfdfd 23px); background: -o-linear-gradient(left, #fbfbfb 0%, #f1f1f1 22px, #fdfdfd 23px); background: linear-gradient(left, #fbfbfb 0%, #f1f1f1 22px, #fdfdfd 23px); background-color:#fdfdfd; display:none; }\n"+
				".forms.menuStrip > .menuStripItem:hover > .flyOut {display:block;}\n"+
				".forms.menuStrip.collapsed > .menuStripItem > .flyOut {display:none;}\n"+

				".flyOut > .menuStripItem {margin-top:2px; border:1px solid transparent; height:18px; width:147px; display:block; position:relative; left:0; top:0;}\n"+
				".flyOut > .menuStripItem:hover {border:1px solid #3399ff; background-color:#c2e0ff;}\n"+
				".flyOut > .menuStripItem > .title {margin-left:31px; border:1px solid transparent; height:14px; overflow:hidden; text-overflow:ellipsis; font-family:'Microsoft Sans Serif'; font-size:9pt; position:relative; z-index:1;display:block;}\n"+				".flyOut > .menuStripItem > .icon {position:absolute; left:3px; top:1px; width:16px;height:16px; display:block;}\n"+
				".flyOut > .menuStripItem > .more {position:absolute; right:3px; top:1px; width:16px;height:16px; display:block;}\n"+
				".flyOut > .menuStripItem > .flyOut {display:none; border:1px solid #808080; position:absolute; left:149px; top:-2px; z-index:0; padding:1px; background: -moz-linear-gradient(left, #fbfbfb 0%, #f1f1f1 22px, #fdfdfd 23px); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#fbfbfb), color-stop(22px,#f1f1f1), color-stop(23px,#fdfdfd)); background: -webkit-linear-gradient(left, #fbfbfb 0%, #f1f1f1 22px, #fdfdfd 23px); background: -o-linear-gradient(left, #fbfbfb 0%, #f1f1f1 22px, #fdfdfd 23px); background: linear-gradient(left, #fbfbfb 0%, #f1f1f1 22px, #fdfdfd 23px); background-color:#fdfdfd; }\n"+
				".flyOut:hover > .menuStripItem:hover > .flyOut {display:block;}\n"+
				".flyOut:empty {display:none !important;}\n"+

				".forms.checkbox {display:block; border:1px solid transparent; padding:1px solid transparent; background-color:transparent; position:relative; z-index:0;}\n"+
				".forms.checkbox.inline {display:inline-block;}\n"+
				".forms.checkbox > .label {display:inline-block; line-height:18px; position:relative;}\n"+
				".forms.checkbox > .checkContainer {display:inline-block; position:relative;}\n"+
				".forms.checkbox > .checkContainer > .check {position:relative;}\n"+

				//pseudoelement panelHeader
				".panelHeader {vertical-align:top; background-color: threedface; position:relative;}\n"+
				".panelHeader > * {display:inline-block; vertical-align:top;}\n"+
				".panelHeader > .icon, .forms .panelHeader > img {width:16px; height:16px; padding:2px;}\n"+
				".panelHeader > .title {line-height:20px; padding:0 3px; color:buttontext;}\n"+
				".panelHeader > .tools {position:absolute; right:0;}\n"+
				".panelHeader > .tools > .tool {width:16px; height:16px; vertical-align:top;}\n"+

				//reusable form stuff
				".forms.collapsed > .content {display:none;}\n"+ //for elements whose base display is something visible
				".forms.expanded > .content {display:block;}\n"+ //for elements whose base display is none
				
				".pinch:not(.colGroup) {width:22px !important;}\n"+
				".pinch > * {display:none !important;}\n"+
				".whenPinched {display:none !important;}\n"+ //only displays when pinched
				".pinch > .whenPinched:not(.imgbutton) {display:block !important;}\n"+
				".pinch > .whenPinched.imgbutton {display:inline-block !important;}\n"+

				//mods
				".scrollY {overflow-y:scroll !important; overflow-x:hidden !important;}\n"+
				".scrollX {overflow-x:scroll !important; overflow-y:hidden !important;}\n"+
				".scrollXY {overflow:scroll !important;}\n"+

				".disabled {opacity:0.5 !important;}\n"+
				".hidden {display:none !important;}\n"+

				".fitContent {display: inline-block;}\n"+

				".table {display:table;}\n"+
				".tableRow {display:table-row;}\n"+
				".tableCell {display:table-cell;}\n"+

				".hoverRaise {padding:1px; border:1px solid transparent; border-radius:4px;}\n"+
				".hoverRaise:hover {border:1px solid rgba(0,0,0,0.15);}\n"+

				"img.crisp {image-rendering: -moz-crisp-edges;}\n"+
				"img.rotateLeft {-webkit-transform: rotate(-90deg); -moz-transform: rotate(-90deg); -o-transform: rotate(-90deg); -khtml-transform: rotate(-90deg); }\n"+
				"img.rotateRight {-webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -o-transform: rotate(90deg); -khtml-transform: rotate(90deg); }\n"+
				"img.flip {-webkit-transform: rotate(180deg); -moz-transform: rotate(180deg); -o-transform: rotate(180deg); -khtml-transform: rotate(180deg); }\n"+

				".px16 {width:16px; height:16px;}\n"+
				".px32 {width:32px; height:32px;}\n"+
				".px64 {width:64px; height:64px;}\n"+
				
				".imgbutton {border:1px solid transparent; border-radius:4px; overflow:hidden; display:inline-block;}\n"+
				".imgbutton:hover {border:1px solid rgba(0,0,0,0.15);}\n"+
				".imgbutton > div {}\n"+
				".imgbutton > div:hover {border:2px solid white;}\n"+

				".white16 {background-image: url('http://i1181.photobucket.com/albums/x430/merricksdad/sheets/white.png'); background-repeat: no-repeat; height: 12px; width: 12px; border:2px solid transparent;}\n"+
				".black16 {background-image: url('http://i1181.photobucket.com/albums/x430/merricksdad/sheets/black.png'); background-repeat: no-repeat; height: 12px; width: 12px; border:2px solid transparent; opacity:0.25;}\n"+
				".black16:hover {opacity:1}\n"+

				".white16.remove, .black16.remove {background-position:-2px -2px; }\n"+
				".white16.add, .black16.add {background-position:-2px -18px; }\n"+
				".white16.arrowleft, .black16.arrowleft {background-position:-2px -34px; }\n"+
				".white16.rss, .black16.rss {background-position:-2px -50px; }\n"+
				".white16.open, .black16.open {background-position:-2px -66px; }\n"+
				".white16.left, .black16.left {background-position:-2px -82px; }\n"+
				".white16.minleft, .black16.minleft {background-position:-2px -98px; }\n"+
				".white16.identify, .black16.identify {background-position:-2px -114px; }\n"+
				".white16.refresh, .black16.refresh {background-position:-2px -130px; }\n"+
				".white16.selectnone, .black16.selectnone {background-position:-2px -146px; }\n"+
				".white16.viewdev, .black16.viewdev {background-position:-2px -162px; }\n"+
				".white16.trash, .black16.trash {background-position:-2px -178px; }\n"+
				".white16.pinned, .black16.pinned {background-position:-2px -194px; }\n"+

				".white16.movetop, .black16.movetop {background-position:-18px -2px; }\n"+
				".white16.moveuplevel, .black16.moveuplevel {background-position:-18px -18px; }\n"+
				".white16.arrowup, .black16.arrowup {background-position:-18px -34px; }\n"+
				".white16.rss2, .black16.rss2 {background-position:-18px -50px; }\n"+
				".white16.open2, .black16.open2 {background-position:-18px -66px; }\n"+
				".white16.up, .black16.up {background-position:-18px -82px; }\n"+
				".white16.minup, .black16.minup {background-position:-18px -98px; }\n"+
				".white16.earth, .black16.earth {background-position:-18px -114px; }\n"+
				".white16.like, .black16.like {background-position:-18px -130px; }\n"+
				".white16.selectall, .black16.selectall {background-position:-18px -146px; }\n"+
				".white16.viewclassic, .black16.viewclassic {background-position:-18px -162px; }\n"+
				".white16.max, .black16.max {background-position:-18px -178px; }\n"+
				".white16.tag, .black16.tag {background-position:-18px -194px; }\n"+

				".white16.stop, .black16.stop {background-position:-34px -2px; }\n"+
				".white16.pause, .black16.pause {background-position:-34px -18px; }\n"+
				".white16.arrowright, .black16.arrowright {background-position:-34px -34px; }\n"+
				".white16.rss3, .black16.rss3 {background-position:-34px -50px; }\n"+
				".white16.close, .black16.close {background-position:-34px -66px; }\n"+
				".white16.right, .black16.right {background-position:-34px -82px; }\n"+
				".white16.minright, .black16.minright {background-position:-34px -98px; }\n"+
				".white16.new, .black16.new {background-position:-34px -114px; }\n"+
				".white16.openinnewwindow, .black16.openinnewwindow {background-position:-34px -130px; }\n"+

				".white16.viewshort, .black16.viewshort {background-position:-34px -162px; }\n"+
				".white16.plugin, .black16.plugin {background-position:-34px -178px; }\n"+
				".white16.pin3d, .black16.pin3d {background-position:-34px -194px; }\n"+

				".white16.movebottom, .black16.movebottom {background-position:-50px -2px; }\n"+
				".white16.movedownlevel, .black16.movedownlevel {background-position:-50px -18px; }\n"+
				".white16.arrowdown, .black16.arrowdown {background-position:-50px -34px; }\n"+
				".white16.rss4, .black16.rss4 {background-position:-50px -50px; }\n"+
				".white16.close2, .black16.close2 {background-position:-50px -66px; }\n"+
				".white16.down, .black16.down {background-position:-50px -82px; }\n"+
				".white16.mindown, .black16.mindown {background-position:-50px -98px; }\n"+
				".white16.check, .black16.check {background-position:-50px -114px; }\n"+
				".white16.unlike, .black16.unlike {background-position:-50px -130px; }\n"+

				".white16.min, .black16.min {background-position:-50px -178px; }\n"+
				".white16.pin, .black16.pin {background-position:-50px -194px; }\n"+

				"#tabPage_menustriptest {height:400px !important; }\n"+

				""
		),

		init: function(){
			addGlobalStyle(forms.css,"styleForms");
			forms.initialized=true;
		},
















// ***** SHARED *****

		//toggle expand/collapse an object
		toggle : function(){
			try{
				if (this.collapsed) this.expand(); else this.collapse();
			} catch (e) {debug.print(this.nameSpace+".toggle():"+e);}
		},

		//expand an object
		expand : function(){
			try{
				if (!this.collapsed) return;
				this.collapsed=false;
				this.node.className=this.node.className.removeWord("collapsed");
				if (this.toggleNode){
					if (this.toggleNode.className.containsWord("imgbutton")) {
						node=this.toggleNode.firstChild;
						node.className=node.className.replaceWord("open","close");
						node.className=node.className.replaceWord("open2","close2");
					}
					else this.toggleNode.src=this.collapseImage;
				}
			} catch (e) {debug.print(this.nameSpace+".expand():"+e);}
		}, 

		//collapse the passed object
		collapse : function(){
			try{
				if (this.collapsed) return;
				this.collapsed=true;
				this.node.className=this.node.className.addWord("collapsed");
				if (this.toggleNode){
					if (this.toggleNode.className.containsWord("imgbutton")) {
						node=this.toggleNode.firstChild;
						node.className=node.className.replaceWord("close","open");
						node.className=node.className.replaceWord("close2","open2");
					}
					else this.toggleNode.src=this.expandImage;
				}
			} catch (e) {debug.print(this.nameSpace+".collapse():"+e);}
		},

		//hides the treeview from the user
		hide : function(){
			try{
				if (!this.visible) return;
				this.visible=false;
				this.node.className=this.node.className.addWord("hidden");
			} catch (e) {debug.print(this.nameSpace+".hide():"+e);}
		},

		//makes the treeview visible to the user
		show : function(){
			try{
				if (this.visible) return;
				this.visible=true;
				this.node.className=this.node.className.removeWord("hidden");
			} catch (e) {debug.print(this.nameSpace+".show():"+e);}
		},

		//makes the treeview visible to the user
		addReusableFunctions : function(o){
			try{
				o.toggle=forms.toggle;
				o.expand=forms.expand;
				o.collapse=forms.collapse;
				o.hide=forms.hide;
				o.show=forms.show;
			} catch (e) {debug.print(o.nameSpace+".addReusableFunctions():"+e);}
		},

		//Generic constructor based on namespaces
		constructElement : function(o,nameSpace,passed){
			try{
				passed=passed||{};
				var params=forms[nameSpace+"_params"].concat(forms["shared_params"]), defaults=forms[nameSpace+"_defaultValues"];
				for (var p=0,len=params.length;p<len;p++) {
					var pvar = params[p];
					o[pvar]=passed[pvar]||defaults[pvar]||null;;
				}
			} catch (e) {debug.print(o.nameSpace+".constructElement():"+e);}
		},

		shared_params : [
			"css","className",
			"toolTip","tag","title",
			"enabled","visible","locked","collapsed",
			"name","id",
			"location",
			"onClick",
			"parent",
			"icon",
		],


// ***** FORM *****

		form_defaultValues : {
			startPosition:"centerParent",windowState:"normal",
			controlBox:true,showIcon:true,visible:true,
			enabled:true,
			style:"border:1px solid activeborder; border-radius:5px 5px 0 0; ",
		},

		form_params : [
			"autoScroll","autoSize",
			"startPosition",
			"maxSize","minSize","size",
			"modal","windowState","topMost",
			"controlBox","allowMaximize","allowMinimize","showIcon",
			"menuStrip","toolTip",
			"onControlAdded","onControlRemoved","onFormClosed","onFormClosing",
			"onLoad","onResize","active","controlBoxStyle",
		],

		FORM: function(params){
			params=params||{};
			this.nameSpace="form"; 
			var passableObject=this;
			forms.addReusableFunctions(this);
			
			//init
			try{
				this.id=params.id||unique();
				forms.constructElement(this,this.nameSpace,params);

				//create basic layout
				this.node=createElement("div",{className:"forms form",title:this.title,style:this.css},[
					createElement("table",{className:"inner",cellPadding:0, cellSpacing:0, border:0},[
						this.headerNode=createElement("tr",{className:"header"},[
							this.iconNode=(this.showIcon && this.icon)?createElement("td",{className:"iconBox"},[
								createElement("img",{className:"icon",src:(this.icon)}),
							]):null,
							createElement("td",{},[
								this.titleNode=createElement("div",{className:"title",textContent:this.title||this.name||"&nbsp;"}),
							]),
							this.controlsNode=(this.controlBox)?createElement("td",{className:"controlBox"},[
								this.minNode=createElement("div",{className:"control"},[
									createElement("div",{className:"black16 min"}),
								]),
								this.maxNode=createElement("div",{className:"control"},[
									createElement("div",{className:"black16 max"}),
								]),
								this.closeNode=createElement("div",{className:"control"},[
									createElement("div",{className:"black16 remove"}),
								]),
							]):null,
						]),
						createElement("tr",{},[
							createElement("td",{className:"container",colSpan:"99"},[
								this.contentNode=createElement("div",{className:"content",textContent:params.textContent})
							])
						])
					])
				]);

				//add special classes to elements
				if (this.className) this.headerNode.className+=" "+this.className;
				if (this.active) this.headerNode.className+=" active";
				if (this.controlsNode && this.controlBoxStyle) this.controlsNode.className+=" "+this.controlBoxStyle;

				this.node.style.backgroundColor=this.backgroundColor;
			} catch (e) {debug.print(this.nameSpace+".init():"+e);}
		}, 


// ***** MENU STRIP *****

		menuStripItem_defaultValues : {
		},

		menuStripItem_params : [
			"menuStrip",
		],

		MENUSTRIPITEM: function(params){
			params=params||{};
			this.nameSpace="menuStripItem"; 
			var passableObject=this;
			forms.addReusableFunctions(this);
			
			//wrapper for all onclick events
			this.clickWrapper=function(){
				try{
					//toggle parent menuStrip object
					if (this.parent==this.menuStrip) {this.menuStrip.toggle();}

				} catch (e) {debug.print(this.nameSpace+".clickWrapper():"+e);}
			};

			//init
			try{
				this.id=params.id||unique();
				forms.constructElement(this,this.nameSpace,params);

				//create basic layout
				this.node=createElement("div",{className:"menuStripItem",onclick:function(){passableObject.clickWrapper();} },[
					this.titleNode=createElement("div",{className:"title",textContent:this.title||this.name||"&nbsp;"}),
				]);

				if (this.parent!=this.menuStrip) this.node.appendChild(this.iconNode=createElement("img",{src:this.icon, className:"icon"}));

				this.node.style=this.css;

				//add kids
				if (params.kids) {
					this.node.appendChild(this.kidsNode=createElement("div",{className:"flyOut"}));
					if (this.parent!=this.menuStrip) this.node.appendChild(this.moreNode=createElement("img",{src:imgs.more, className:"more"}));
					this.kids=[];
					for (var k=0,klen=params.kids.length;k<klen;k++) {
						var kidCode=params.kids[k];
						kidCode.parent=this;
						kidCode.menuStrip=this.menuStrip;

						var kid = new forms.MENUSTRIPITEM(kidCode);
						if (kid) {
							this.kidsNode.appendChild(kid.node);
							this.kids.push(kid);
						}
					}
				} else {
					this.node.className+=" noKids";
				}
			} catch (e) {debug.print(this.nameSpace+".init():"+e);}
		}, 		



		menuStrip_defaultValues : {
			collapsed:true,
		},

		menuStrip_params : [
		],

		MENUSTRIP: function(params){
			params=params||{};
			this.nameSpace="menuStrip"; 
			var passableObject=this;
			forms.addReusableFunctions(this);

			//init
			try{
				this.id=params.id||unique();
				forms.constructElement(this,this.nameSpace,params);

				//create basic layout
				this.node=createElement("div",{className:"forms menuStrip"+((this.collapsed)?" collapsed":"")});

				this.node.style=this.css;

				//add kids
				if (params.kids) {
					this.kids=[];
					for (var k=0,klen=params.kids.length;k<klen;k++) {
						var kidCode=params.kids[k];
						kidCode.parent=this;
						kidCode.menuStrip=this;
						
						var kid = new forms.MENUSTRIPITEM(kidCode);
						if (kid) {
							this.node.appendChild(kid.node);
							this.kids.push(kid);
						}
					}
				}
			} catch (e) {debug.print(this.nameSpace+".init():"+e);}
		}, 








		createTreeViewBranch: function(source){
			try{
				return createElement("div",{className:"forms treeView branch"+((source.selected)?" "+source.tree.selectedClass:"")+((source.expanded)?" "+source.tree.expandedClass:""),id:source.id},[
					createElement("div",{className:"handle",onclick:function(){source.toggle();} },[
						createElement("img",{src:((source.kids)?source.tree.collapsedImage:"")}),
					]),
					createElement("div",{className:"title",textContent:(source.data.label||"<no title>"),onclick:function(){source.select();} }),
					createElement("div",{className:"kids"}),
				]);
			} catch(e){debug.print("forms.createTreeViewBranch():"+e);}
		},

		//requires at least id and title, icon is optional, selected is optional, func is optional
		createCoolBarButton: function(params){
			return createElement("div",{id:"wmCoolItem_"+params["id"],className:"item"+(params["selected"]?" selected":""),onclick:params["func"]||(forms.showFormSection)},[
				createElement("img",{className:"icon crisp",src:params["icon"]||imgs.plugin}),
				createElement("span",{className:"title",textContent:params["title"]}),
			]);							
		},

		//requires at least buttons and pages
		createCoolBar: function(params){
			return createElement("div",{},(function(){
				//create a bar and fill it dynamically
				var ret=[];
				ret.push(
					createElement("div",{className:"forms oldcoolBar"},[
						createElement("div",{className:"slider"},
							(function(){
								//create buttons dynamically
								var btn=[];
								if (params["tabs"]) for (var i=0,button;(button=params["tabs"][i]);i++) {
									btn.push(forms.createCoolBarButton(button));
								}
								return btn;
							})()
						)
					]) 
				);
				//create pages dynamically
				if (params["tabs"]) for (var i=0,page;(page=params["tabs"][i]);i++){
					ret.push(
						createElement("div",{id:"wmCoolPage_"+page["id"],className:"forms oldcoolPage"+(page["selected"]?" selected":""),textContent:(page["textContent"]||null)},page["kids"])
					);
				}
				return ret;
			})() );
		},

		//requires at least id and caption, kids are optional, textContent is optional
		createFrame: function(params){
			return createElement("div",{className:"forms wrapper"+((params.subType)?" "+params.subType:"")},[
				createElement("div",{id:(params["id"]||null), className:"forms frame"},(function(){
					var ret=[];
					if (params["caption"]) ret.push(createElement("span",{className:"caption",textContent:params["caption"]}));
					if (params["textContent"]!="undefined") ret.push(createElement("span",{textContent:params["textContent"]}));
					if (params["kids"]) ret.concat(params["kids"]);
					return ret;
				})() )
			]);
		},



		//requires at least tabs and pages
		createTabs: function(params){
			return createElement("div",{className:"forms wrapper"+((params.subType)?" "+params.subType:"")},(function(){
				//create contents dynamically
				var ret=[];
				ret.push(createElement("div",{className:"forms tabBar"},(function(){
					//create tabs dynamically
					var btn=[];
					if (params["tabs"]) for (var i=0,tab;(tab=params["tabs"][i]);i++) {
						var tabID=tab["id"];
						btn.push(
							createElement("span",{id:"wmTabItem_"+tab["id"],className:"tabButton"+(tab["selected"]?" selected":""),textContent:tab["caption"],onclick:forms.showTabSection })
						);
					}
					return btn;
				})() ) );
				//create pages dynamically
				if (params["tabs"]) for (var i=0,page;(page=params["tabs"][i]);i++) {
					ret.push(
						createElement("div",{id:"wmTabPage_"+page["id"],className:"forms tabPage"+(page["selected"]?" selected":""), textContent:(page["textContent"]||null),style:((params.height)?"height:"+params.height+"px;":"")+((params.width)?"width:"+params.width+"px;":"")},page["kids"])
					);
				}
				return ret;
			})() );
		},


		createTabControl : function(params){
			params=params||{};
			return createElement("div",{className:"forms wrapper"+(params.subType||"")},[(new forms.TABCONTROL(params)).node]);
		},


// ***** Tabs *****

		tab_defaultValues : {},
		
		tab_params : [
			"name","tag","node","caption","id","scrollMode","parent","selected","icon",
		],

		TAB : function(params){
			params=params||{};
			forms.addReusableFunctions(this);

			//select this tab
			this.setScrollMode=function(newMode){
				try{
					this.node.className=this.node.className.replaceWord(this.scrollMode, newMode);
					this.scrollMode=newMode;
				} catch (e) {debug.print("TAB.setScrollMode():"+e);}
			};
			

			//the index of this tab in relation to its parent
			this.index=function(){
				try{
					return this.parent.tabs.inArrayWhere(this);
				} catch (e) {debug.print("TAB.setScrollMode():"+e);}
			};

			//select this tab
			this.select=function(){
				try{
					this.parent.selectTab(this);
				} catch (e) {debug.print("TAB.select():"+e);}
			};

			//unselect this tab, forcing the next tab in the list to become the selected tab
			this.unSelect=function(){
				try{
					this.parent.unSelectTab(this);
				} catch (e) {debug.print("TAB.unSelect():"+e);}
			};

			//remove this tab
			this.remove=function(){
				try{
					this.parent.remove(this);
				} catch (e) {debug.print("TAB.remove():"+e);}
			};

			//initialize
			try{
				//initialize with params or default values
				for (var p=0,len=forms.tab_params.length;p<len;p++) {
					var pvar = forms.tab_params[p];
					var def = forms.tab_defaultValues[pvar]||null;
					this[pvar]=params[pvar]||def;
				}
			} catch (e) {debug.print("TAB.init()[Part 1]:"+e);}

			//create the node object
			try{
				this.id=params.id||unique();
				var passableObject=this;
				this.pageNode=createElement("div",{textContent:(params.textContent||""),className:"tabPage"+((this.selected)?" selected":"")+((this.scrollMode)?" "+this.scrollMode:""),style:(this.parent.height?"height:"+this.parent.height+";":"")},(params.kids||null));
				this.tabNode=createElement("div",{className:"tabButton"+((this.selected)?" selected":""),onclick:function(){passableObject.select();}},[
					(params.icon)?createElement("img",{src:params.icon}):null,
					createElement("div",{className:"title",textContent:params.caption||""}),
				]);

				this.parent.tabsNode.appendChild(this.tabNode);
				this.parent.pagesNode.appendChild(this.pageNode);
			} catch (e) {debug.print("TAB.init()[buildnode]:"+e);}
		},

		tabControl_defaultValues : {},
		
		tabControl_params : [
			"height","width","name","tag","multiLine","tabsPerLine",
			"onUnSelect","onSelect","subtype"
		],

		TABCONTROL : function(params){
			params=params||{};
			forms.addReusableFunctions(this);

			//container for tab objects
			this.tabs=[];

			//add a tab
			this.addTab=function(params){
				params.parent=this;
				try{
					return this.tabs.push(new forms.TAB(params));
				} catch (e) {debug.print("TABCONTROL.addTab():"+e);}
			};

			//get the selected tab index
			this.selectedIndex=function(){
				try{
					return this.getTab().index();
				} catch (e) {debug.print("TABCONTROL.selectedIndex():"+e);}
			};

			//get the selected tab item
			this.selectedTab=function(){
				try{
					return this.getTab();
				} catch (e) {debug.print("TABCONTROL.selectedTab():"+e);}
			};
			
			//get the number of tabs in this control
			this.tabCount=function(){
				try{
					return this.tabs.length;
				} catch (e) {debug.print("TABCONTROL.tabCount():"+e);}
			};

			//selects a tab by index, id or passed object
			this.selectTab=function(tab){
				try{
					if (this.tabCount()<2) return; //cannot unselect any tab when only one tab exists
					tab=this.getTab(tab);
					if (tab.selected) return;
					var selectedTab=this.selectedTab();
					
					selectedTab.selected=false;
					selectedTab.pageNode.className=selectedTab.pageNode.className.removeWord("selected");
					selectedTab.tabNode.className=selectedTab.tabNode.className.removeWord("selected");

					tab.selected=true;
					tab.pageNode.className=tab.pageNode.className.addWord("selected");
					tab.tabNode.className=tab.tabNode.className.addWord("selected");

					if (this.onUnSelect) this.onUnSelect(selectedTab);
					if (this.onSelect) this.onSelect(tab);
				} catch (e) {debug.print("TABCONTROL.selectTab():"+e);}
			};

			//selects the tab directly following the current tab
			this.unSelectTab=function(tab){
				try{
					if (this.tabCount()<2) return; //cannot unselect any tab when only one tab exists
					tab=this.getTab(tab);
					if (!tab.selected) return;
					var index=tab.index, nextTab;
					if (index < (this.tabsCount()-1)) nextTab=this.tabs[index+1];
					else nextTab=this.tabs[0];

					tab.selected=false;
					tab.pageNode.className=tab.pageNode.className.removeWord("selected");
					tab.tabNode.className=tab.tabNode.className.removeWord("selected");

					nextTab.selected=true;
					nextTab.pageNode.className=nextTab.pageNode.className.addWord("selected");
					nextTab.tabNode.className=nextTab.tabNode.className.addWord("selected");

					if (this.onUnSelect) this.onUnSelect(tab);
					if (this.onSelect) this.onSelect(nextTab);
				} catch (e) {debug.print("TABCONTROL.unSelectTab():"+e);}
			};

			//return the first tab that matches the search function
			this.findTab=function(fx){
				for (var t=0,len=this.tabs.length;t<len;t++){
					if (fx(this.tabs[t])) return this.tabs[t];
				}
			};

			//selects the tab directly following the current tab
			this.getTab=function(tab){
				try{
					if (tab==null) return matchByParam(this.tabs,"selected",true)[0];
					else if ((typeof tab)=="string") return matchByParam(this.tabs,"id",tab)[0];
					else if ((typeof tab)=="object") return tab;
					else if ((typeof tab)=="number") return this.tabs[tab];
				} catch (e) {debug.print("TABCONTROL.getTab():"+e);}
			};			

			//initialize
			try{
				//initialize with params or default values
				for (var p=0,len=forms.tabControl_params.length;p<len;p++) {
					var pvar = forms.tabControl_params[p];
					var def = forms.tabControl_defaultValues[pvar]||null;
					this[pvar]=params[pvar]||def;
				}
			} catch (e) {debug.print("TABCONTROL.init()[Part 1]:"+e);}

			//create the node object
			try{
				this.id=params.id||unique();
				var passableObject=this;
				this.node=createElement("div",{className:"forms tabControl "+((this.subtype)?this.subtype:""),style:(this.width?"width:"+this.width+";":"")},[
					this.tabsNode=createElement("div",{className:"tabButtons"}),
					this.pagesNode=createElement("div",{className:"tabPages"}),
				]);
			} catch (e) {debug.print("TABCONTROL.init()[buildnode]:"+e);}

			try{
				//add passed tabs
				if (params.tabs||null) for (var t=0,tlen=params.tabs.length;t<tlen;t++) {
					this.addTab(params.tabs[t]);
				}
			} catch (e) {debug.print("TABCONTROL.init()[Part 2]:"+e);}
		},





		createSelectionList : function(params){
			params=params||{};
			return createElement("div",{className:"forms wrapper "+(params.subType||"")},[(new forms.SELECTIONLIST(params)).node]);
		},

		SELECTIONLISTITEM : function(params) {
			params=params||{};
			
			var passableObject=this;

			//select this item
			this.select=function(suppressEvent){
				try{
					if (!this.parent.allowSelect) return;
					this.selected=true;
					this.node.className=this.node.className.addWord("selected");
	
					if (!suppressEvent) if (this.parent.onSelect) this.parent.onSelect(this);
					if (!suppressEvent) if (this.parent.onChange) this.parent.onChange(this.parent);
				} catch (e) {debug.print("SELECTIONLISTITEM.select():"+e);}
			};

			//select this item
			this.unSelect=function(){
				try{
					if (!this.parent.allowSelect) return;
					this.selected=false;
					this.node.className=this.node.className.removeWord("selected");

					if (this.parent.onUnSelect) this.parent.onUnSelect(this);
					if (this.parent.onChange) this.parent.onChange(this.parent);
				} catch (e) {debug.print("SELECTIONLISTITEM.select():"+e);}
			};

			//toggle selection of this item
			this.toggle=function(){
				try{
					if (this.selected) this.unSelect(); else this.select();
				} catch (e) {debug.print("SELECTIONLISTITEM.toggle():"+e);}
			};

			//move this item up one
			this.moveUp=function(suppressEvent){
				try{
					var newList={};
					var index1=0;
					var sibling;
					for (k in this.parent.kids) {
						index1++;
						if (this.parent.kids[k]==this) break;
					}
					if (index1==1) return; //already on top
					delete this.parent.kids[this.id];
					var index2=0;
					for (k in this.parent.kids) {
						index2++;
						if (index2==(index1-1)) {
							inserted=true;
							newList[this.id]=this;
							sibling=this.parent.kids[k].node;
						}
						newList[k]=this.parent.kids[k];
					}
					this.parent.kids=newList;
					this.parent.kidsNode().insertBefore(this.node,sibling);

					if (!suppressEvent) if (this.parent.onNodeMoved) this.parent.onNodeMoved(this);
					if (!suppressEvent) if (this.parent.onChange) this.parent.onChange(this.parent);
				} catch (e) {debug.print("SELECTIONLISTITEM.moveUp():"+e);}
			};

			//move this item down one
			this.moveDown=function(){
				try{
					var newList={};
					var index1=0;
					var sibling;
					for (k in this.parent.kids) {
						index1++;
						if (this.parent.kids[k]==this) break;
					}
					delete this.parent.kids[this.id];
					var index2=0, inserted=false;
					for (k in this.parent.kids) {
						index2++;
						newList[k]=this.parent.kids[k];
						if (inserted && !sibling) sibling=this.parent.kids[k].node;
						if (index2==index1) {
							inserted=true;
							newList[this.id]=this;
						}
					}
					if (!inserted) newList[this.id]=this; //got moved to bottom
					this.parent.kids=newList;
					if (sibling) this.parent.kidsNode().insertBefore(this.node,sibling);
					else this.parent.kidsNode().appendChild(this.node);

					if (this.parent.onNodeMoved) this.parent.onNodeMoved(this);
					if (this.parent.onChange) this.parent.onChange(this.parent);
				} catch (e) {debug.print("SELECTIONLISTITEM.moveDown():"+e);}
			};
			
			//move this item to the top of the list
			this.moveTop=function(suppressEvent){
				try{
					delete this.parent.kids[this.id];
					var newList={}; newList[this.id]=this;
					var newList=mergeJSON(newList,this.parent.kids);
					this.parent.kids=newList;
					this.parent.kidsNode().insertBefore(this.node,this.parent.kidsNode().firstChild);

					if (!suppressEvent) if (this.parent.onNodeMoved) this.parent.onNodeMoved(this);
					if (!suppressEvent) if (this.parent.onChange) this.parent.onChange(this.parent);
				} catch (e) {debug.print("SELECTIONLISTITEM.moveTop():"+e);}
			};

			//move this item to the bottom of the list
			this.moveBottom=function(){
				try{
					delete this.parent.kids[this.id];
					this.parent.kids[this.id]=this;
					this.parent.kidsNode().appendChild(this.node);

					if (this.parent.onNodeMoved) this.parent.onNodeMoved(this);
					if (this.parent.onChange) this.parent.onChange(this.parent);
				} catch (e) {debug.print("SELECTIONLISTITEM.movebottom():"+e);}
			};

			//remove this from its parent
			this.remove=function(){
				try{
					this.parent.remove(this.id);
				} catch (e) {debug.print("SELECTIONLISTITEM.remove():"+e);}
			};

			//init
			try{
				this.parent=params.parent||null;
				this.value=params.value||"";
				this.selected=params.selected||false;
				this.id=params.id||unique();
			} catch (e) {debug.print("SELECTIONLISTITEM.init():"+e);}

			try{
				this.node=createElement("div",{className:"selectionListItem"+(this.selected?" selected":"")},[
					createElement("div",{className:"caption",textContent:this.value,onclick:function(){passableObject.toggle();}}),
					createElement("div",{className:"tools"},[
						(this.parent.allowRemove)?createElement("div",{className:"tool",title:"Remove",onclick:function(){passableObject.remove();}},[
							createElement("img",{src:this.parent.removeImage})
						]):null,
						(this.parent.allowMove)?createElement("div",{className:"tool",title:"Move Up",onclick:function(){passableObject.moveUp();}},[
							createElement("img",{src:this.parent.moveUpImage})
						]):null,
						(this.parent.allowMove)?createElement("div",{className:"tool",title:"Move Down",onclick:function(){passableObject.moveDown();}},[
							createElement("img",{src:this.parent.moveDownImage})
						]):null,
						(this.parent.allowMove)?createElement("div",{className:"tool",title:"Move Top",onclick:function(){passableObject.moveTop();}},[
							createElement("img",{src:this.parent.moveTopImage})
						]):null,
						(this.parent.allowMove)?createElement("div",{className:"tool",title:"Move Bottom",onclick:function(){passableObject.moveBottom();}},[
							createElement("img",{src:this.parent.moveBottomImage})
						]):null,
					]),
				]);
			} catch (e) {debug.print("SELECTIONLISTITEM.init()[buildnode]:"+e);}
		},

		selectionList_defaultValues : {"requireUnique":true},
		
		selectionList_params : [
			"height","title","width","moveUpImage","moveDownImage","removeImage","addImage","allowAdd","allowRemove","selectOnAdd","allowSelect",
			"allowMove","onSelect","onUnSelect","onChange","onNodeAdded","onNodeRemoved","onNodeMoved","moveTopImage","moveBottomImage",
			"requireUnique","name","tag","allowEmptyString"
		],

		SELECTIONLIST : function(params) {
			params=params||{};

			this.kids={};
			
			//return the visual kids node of this element
			this.kidsNode=function(){
				return selectSingleNode("./div[contains(@class,'kids')]",{node:this.node})||null;
			};

			//return the selected elements as a comma delimted list
			this.toString=function(all,asJSON){
				try{
					if (asJSON) return JSON.stringify(this.toArray(all));
					else return this.toArray(all).toString();
				} catch (e) {debug.print("SELECTIONLIST.toString():"+e);}
			};
			
			//return the selected elements as an array
			this.toArray=function(all){
				try{
					var ret=[];
					for (k in this.kids){
						if (all) ret.push(this.kids[k].value);
						else if (!this.allowSelect || (this.allowSelect && this.kids[k].selected)) ret.push(this.kids[k].value);
					}
					return ret;
				} catch (e) {debug.print("SELECTIONLIST.toArray():"+e);}
			};

			//add a new element to the list
			this.add=function(item,selectOnAdd,suppressEvent){
				try{
					if (!this.allowEmptyString && item=="") return; //prevent empty strings
					if (this.requireUnique && this.find(item)) return; //prevent duplicates
					var newID=unique();
					var newChild=new forms.SELECTIONLISTITEM({value:item,selected:(selectOnAdd||this.selectOnAdd),parent:this,id:newID});
					this.kids[newID]=newChild;
					this.kidsNode().appendChild(newChild.node);

					if (!suppressEvent) if (this.onNodeAdded) this.onNodeAdded(newChild);
					if (!suppressEvent) if (this.onChange) this.onChange(this);
				} catch (e) {debug.print("SELECTIONLIST.add():"+e);}
			};

			this.remove=function(itemOrID,all){
				try{
					var was;
					for (k in this.kids) if (this.kids[k].id==itemOrID || this.kids[k].value==itemOrID) {
						was=this.kids[k];
						remove(this.kids[k].node);
						delete this.kids[k];
						if (!all) break;
					}

					if (this.onNodeRemoved) this.onNodeRemoved(was);
					if (this.onChange) this.onChange(this);
				} catch (e) {debug.print("SELECTIONLIST.remove():"+e);}
			};
	
			this.find=function(itemOrID){
				try{
					for (k in this.kids) if (this.kids[k].id==itemOrID || this.kids[k].value==itemOrID) {
						return this.kids[k];
					}

				} catch (e) {debug.print("SELECTIONLIST.find():"+e);}
			};

			//initialize
			try{
				//initialize with params or default values
				for (var p=0,len=forms.selectionList_params.length;p<len;p++) {
					var pvar = forms.selectionList_params[p];
					var def = forms.selectionList_defaultValues[pvar]||null;
					this[pvar]=params[pvar]||def;
				}
			} catch (e) {debug.print("SELECTIONLIST.init()[Part 1]:"+e);}

			//create the node object
			try{
				this.id=params.id||unique();
				var passableObject=this;
				this.node=createElement("div",{id:this.id,className:"forms selectionList",style:(this.width?"width:"+this.width+";":"")},[
					(this.title||null)?createElement("div",{className:"title",textContent:(this.title)}):null,
					createElement("div",{className:"kids",style:(this.height?"height:"+this.height+";":"")}),
					(this.allowAdd)?createElement("div",{className:"addNew"},[
						createElement("input",{className:"addInput",type:"text"}),
						createElement("img",{className:"addButton",src:this.addImage,onclick:function(){passableObject.add(this.previousSibling.value);this.previousSibling.value="";}})
					]):null,
				]);
			} catch (e) {debug.print("SELECTIONLIST.init()[buildnode]:"+e);}

			//add any passed data to list
			try{
				if (params.kids||null) {
					for (k in params.kids) this.add(params.kids[k].value,params.kids[k].selected, true);
				} else {
					if (params.selected||null) {for (var s=0,slen=params.selected.length;s<slen;s++) {if ( (!this.allowAdd && params.data.inArray(params.selected[s])) || this.allowAdd) this.add(params.selected[s],true,true);}}
					if (params.data||null) {for (var d=0,dlen=params.data.length;d<dlen;d++) {this.add(params.data[d],false,true);}}
				}
			} catch (e) {debug.print("SELECTIONLIST.init()[Part 2]:"+e);}
			
			return this;
		},


		treeView_defaultValues : {
			"kidsName":"kids", "selectExpands":true, "selectedClass":"selected", "expandedClass":"expanded", "focusOnNew":true,
		},
	
		treeView_params : [
			"kids","tag","data","node","kidsName","onCollapse","onExpand","onSelect","onSelectedIndexChange","onClick","onNodeAdded","onNodeRemoved",
			"selectExpands","selectMulti","expandedClass","selectedClass","selectedNode","expandedImage","collapsedImage","onNodeMoved",
			"focusOnNew", "unSelectCollapses"
		],

		//an actual treeView object
		TREEVIEW : function(params) {
			params=params||{};
			this.selected=[];
		
			//attach reusable functions
			forms.addReusableFunctions(this);

			//adds a new branch to the end of the treeview object, or to the param.node
			this.add=function(params,suppressEvent){
				try{
					params=params||{};
					dontInsertData=params.dontInsertData||null; //flag for preventing duplication during initial load
					this.kids=this.kids||[];
					this.data=this.data||[];
					var id=((params.data)?params.data.id:null)||params.id||unique();
					var data=params.data||{}; data.id=id;
					//insert the data
					if (!dontInsertData) this.data.push(data); //make a sibling not a child
					//create the new child treenode
					var newChild;
					this.kids.push(newChild=new forms.TREENODE({
						parent:this,
						id:id,
						tree:this,
						data:data, //create a new entry in the source
					}));

					if (!suppressEvent) {
						if (this.onNodeAdded) this.onNodeAdded(newChild);
						if (this.focusOnNew) newChild.select();
					}
				} catch (e) {debug.print("TREEVIEW.add():"+e);}
			};

			//collapses all child nodes
			this.collapseAll=function(){
				try{
					if (!(this.kids)) return;
					for (var k=0,len=this.kids.length;k<len;k++){
						this.kids[k].collapse();
					}
				} catch (e) {debug.print("TREEVIEW.collapseAll():"+e);}
			};

			//expand all child nodes
			this.expandAll=function(){
				try{
					if (!(this.kids)) return;
					for (var k=0,len=this.kids.length;k<len;k++){
						this.kids[k].expand();
					}
				} catch (e) {debug.print("TREEVIEW.expandAll():"+e);}
			};

			//select all of this node's children
			this.selectAll=function(){
				try{
					if (!(this.kids)) return;
					for (var k=0,len=this.kids.length;k<len;k++){
						this.kids[k].select();
					}
				} catch (e) {debug.print("TREEVIEW.selectAll():"+e);}
			};

			//unselect all of this node's childen
			this.unSelectAll=function(){
				try{
					if (!(this.selected)) return;
					if (!this.selected.length) return;
					if (!(this.kids)) return;
					for (var k=0,len=this.kids.length;k<len;k++){
						this.kids[k].unSelect();
					}
				} catch (e) {debug.print("TREEVIEW.unSelectAll():"+e);}

			};

			//unselect all of this node's childen
			this.clearSelection=function(){
				try{
					if (!this.selected.length) return;
					for (var k=this.selected.length-1;k>=0;k--){
						this.selected[k].unSelect();
					}
				} catch (e) {debug.print("TREEVIEW.clearSelection():"+e);}
			};

			//returns the treeview object as a string
			this.toString=function(){
				try{
					return JSON.stringify(this);
				} catch (e) {debug.print("TREEVIEW.toString():"+e);}
			};

			//returns the top level id for this path
			this.fullPath=function(){
				try{
					return "top";
				} catch (e) {debug.print("TREEVIEW.fullPath():"+e);}

			};

			//initialize
			try{
				//initialize with params or default values
				for (var p=0,len=forms.treeView_params.length;p<len;p++) {
					var pvar = forms.treeView_params[p];
					var def = forms.treeView_defaultValues[pvar]||null;
					this[pvar]=params[pvar]||def;
				}
			} catch (e) {debug.print("TREEVIEW.init()[Part 1]:"+e);}

			try{
				if (this.data.length){
					//this child node is being created and already has data to build deeper children
					for (var k=0,len=this.data.length;k<len;k++){
						this.add({data:this.data[k],dontInsertData:true},true);
					}
				}
			} catch (e) {debug.print("TREEVIEW.init()[Part 2]:"+e);}
		},

		treeNode_defaultValues : {
			"visible":true,
		},
	
		treeNode_params : [
			"id","selected","expanded","tag","visible","kids","parent","tree","data","node",
		],
		
		//an actual treeNode object
		TREENODE : function(params) {
			params=params||{};

			//adds a child node to this node
			this.addChild=function(params,suppressEvent){
				try{
					params=params||{};
					dontInsertData=params.dontInsertData||null; //flag for preventing duplication during initial load
					this.kids=this.kids||[];
					this.data=this.data||{}; this.data.kids=this.data.kids||[];
					var id=((params.data)?params.data.id:null)||params.id||unique();
					var data=params.data||{}; data.id=data.id||id;
					//insert the data
					if (!dontInsertData) this.data[this.tree.kidsName].push(data);
					//create the new child treenode
					var newChild;
					this.kids.push(newChild=new forms.TREENODE({
						parent:this,
						id:id,
						tree:this.tree,
						data:data, //create a new entry in the source
					}));
					//make sure it has a toggle handle
					this.handleImageNode().src=(this.expanded)?this.tree.expandedImage:this.tree.collapsedImage;
					if (!suppressEvent) {
						this.expand();
						if (this.tree.onNodeAdded) this.tree.onNodeAdded(newChild);
						if (this.tree.focusOnNew) newChild.select();
					}
				} catch (e) {debug.print("TREENODE.addChild():"+e);}
			};

			this.handleNode=function(){
				try{
					return selectSingleNode("./div[contains(@class,'handle')]",{node:this.node})||null;
				} catch(e) {debug.print("TREENODE.handleNode():"+e);}
			};

			this.handleImageNode=function(){
				try{
					return selectSingleNode("./div[contains(@class,'handle')]/img",{node:this.node})||null;				
				} catch(e) {debug.print("TREENODE.handleImageNode():"+e);}
			};

			this.kidsNode=function(){
				try{
					return selectSingleNode("./div[contains(@class,'kids')]",{node:this.node})||null;				
				} catch(e) {debug.print("TREENODE.kidsNode():"+e);}
			};

			//removes this node from its parent
			this.remove=function(suppressEvent){
				try{
					var index=this.index();
					remove(this.node);
					this.parent.kids.remove(index);
					if (this.parent==this.tree) this.tree.data.remove(index);
					else this.parent.data[this.tree.kidsName].remove(index);
					if (this.parent!=this.tree) if (!this.parent.hasKids()) this.parent.handleImageNode().src="";
					if (!suppressEvent) if (this.tree.onNodeRemoved) this.tree.onNodeRemoved(this);
				} catch (e) {debug.print("TREENODE.remove():"+e);}
			};

			//gets this objects's next sibling
			this.nextSibling=function(){
				try {return this.parent.kids[this.index()+1]||null;} catch(e) {return null;}
			};

			//gets this objects's previous sibling
			this.previousSibling=function(){
				try {return this.parent.kids[this.index()-1]||null;} catch(e) {return null;}
			};

			this.index=function(){
				try{
					return this.parent.kids.inArrayWhere(this);
				} catch (e) {debug.print("TREENODE.index():"+e);}
			};

			this.isLastChild=function(){
				return (this==this.parent.kids.last());
			};

			//swaps this object with its previous sibling
			this.moveUp=function(){
				try{
					var sibling=this.previousSibling();
					if (!sibling) return; //nothing to do
					//swap the order on the visible tree object
					if (this.parent==this.tree) this.parent.node.insertBefore(this.node,sibling.node);
					else this.parent.kidsNode().insertBefore(this.node,sibling.node);
					//swap the order inside the parent node
					this.parent.kids.swap(this.index(),sibling.index());
					//swap the order inside the data object
					if (this.parent==this.tree) this.parent.data.swap(this.index(),sibling.index());
					else this.parent.data[this.tree.kidsName].swap(this.index(),sibling.index());
					if (this.tree.onNodeMoved) this.tree.onNodeMoved(this);
				} catch (e) {debug.print("TREENODE.moveUp():"+e);}
			};

			//swaps this object with its next sibling
			this.moveDown=function(){
				try{
					var sibling=this.nextSibling();
					if (!sibling) return; //nothing to do
					//swap the order on the visible tree object
					if (this.parent==this.tree) this.parent.node.insertBefore(sibling.node,this.node);
					else this.parent.kidsNode().insertBefore(sibling.node,this.node);
					//swap the order inside the parent node
					this.parent.kids.swap(this.index(),sibling.index());
					//swap the order inside the data object
					if (this.parent==this.tree) this.parent.data.swap(this.index(),sibling.index());
					else this.parent.data[this.tree.kidsName].swap(this.index(),sibling.index());
					if (this.tree.onNodeMoved) this.tree.onNodeMoved(this);
				} catch (e) {debug.print("TREENODE.moveDown():"+e);}
			};

			//moves this object up one level in the tree hierarchy
			this.moveUpLevel=function(){
				try{
					if (this.parent==this.tree) return;
					if (this.parent.parent==this.tree) {this.moveToTop(); return;}
					var index=this.index();
					//move this object
					this.parent.kids.remove(index);
					this.parent.parent.kids.push(this);
					//move its data
					this.parent.data[this.tree.kidsName].remove(index);
					this.parent.parent.data[this.tree.kidsName].push(this.data);
					//move its visible node
					this.parent.parent.kidsNode().appendChild(this.node);
					this.parent=this.parent.parent;
					if (this.tree.onNodeMoved) this.tree.onNodeMoved(this);
				} catch (e) {debug.print("TREENODE.moveUpLevel():"+e);}
			};

			//moves this object up to the top level of the tree hierarchy
			this.moveToTop=function(){
				try{
					if (this.parent==this.tree) return;
					var index=this.index();
					//move this object
					this.parent.kids.remove(index);
					this.tree.kids.push(this);
					//move its data
					this.parent.data[this.tree.kidsName].remove(index);
					this.tree.data.push(this.data);
					//move its visible node
					this.tree.node.appendChild(this.node);
					this.parent=this.tree;
					if (this.tree.onNodeMoved) this.tree.onNodeMoved(this);
				} catch (e) {debug.print("TREENODE.moveToTop():"+e);}
			};

			//returns the full path from the top level down to the current node as a string
			this.fullPath=function(){
				try{
					return this.parent.fullPath()+"/"+this.id;
				} catch (e) {debug.print("TREENODE.fullPath():"+e);}
			};

			//hides the branch from the user
			this.hide=function(){
				try{
					this.visible=false;
					this.node.style.display="none !important";
				} catch (e) {debug.print("TREENODE.hide():"+e);}
			};

			//makes the branch visible to the user
			this.show=function(){
				try{
					this.visible=true;
					this.node.style.display="";
				} catch (e) {debug.print("TREENODE.show():"+e);}
			};

			this.hasKids=function(){
				return (this.kids)?((this.kids.length)?true:false):false;
			};

			//collapses this node
			this.collapse=function(){
				try{
					if (!this.expanded) return;
					if (!this.hasKids()) return;
					this.expanded=false;
					this.node.className=this.node.className.removeWord(this.tree.expandedClass||"");
					this.handleImageNode().src=this.tree.collapsedImage;
					if (this.tree.onCollapse) this.tree.onCollapse(this);
				} catch (e) {debug.print("TREENODE.collapse():"+e);}
			};

			//expand this node
			this.expand=function(){
				try{
					if (this.expanded) return;
					if (!this.hasKids()) return;
					this.expanded=true;
					this.node.className=this.node.className.addWord(this.tree.expandedClass||"");
					this.handleImageNode().src=this.tree.expandedImage;
					if (this.tree.onExpand) this.tree.onExpand(this);
				} catch (e) {debug.print("TREENODE.expand():"+e);}
			};

			//expand/collapse this node
			this.toggle=function(){
				try{
					if (this.expanded) this.collapse(); else this.expand();
				} catch (e) {debug.print("TREENODE.toggle():"+e);}
			};

			//expands this node and makes sure it is visible by moving scrolling devices
			this.ensureVisible=function(){
				try{
					this.expand();
					if (this.parent != this.tree) this.parent.ensureVisible();
					this.node.scrollIntoView();
				} catch (e) {debug.print("TREENODE.ensureVisible():"+e);}
			};

			//collapses all child nodes
			this.collapseAll=function(){
				try{
					if (!(this.kids)) return;
					for (var k=0,len=this.kids.length;k<len;k++){
						this.kids[k].collapse();
					}
				} catch (e) {debug.print("TREENODE.collapseAll():"+e);}
			};

			//expand all child nodes
			this.expandAll=function(){
				try{
					if (!(this.kids)) return;
					for (var k=0,len=this.kids.length;k<len;k++){
						this.kids[k].expand();
					}
				} catch (e) {debug.print("TREENODE.expandAll():"+e);}
			};

			//returns the this node and its children as a string
			this.toString=function(){
				try{
					return JSON.stringify(this);
				} catch (e) {debug.print("TREENODE.toString():"+e);}
			};

			//select this node
			this.select=function(){
				try{
					if (this.tree.selectExpands) this.expand();
					if (this.selected) return;
					if (!this.tree.selectMulti) this.tree.clearSelection();
					this.tree.selected.push(this);
					this.node.className=this.node.className.addWord(this.tree.selectedClass||"");
					this.selected=true;
					if (!this.tree.selectMulti) if (this.tree.onSelectedIndexChange) this.tree.onSelectedIndexChange(this);
					if (this.tree.onSelect) this.tree.onSelect(this);
				} catch (e) {debug.print("TREENODE.select():"+e);}
			};

			//unselect this node
			this.unSelect=function(){
				try{
					if (this.tree.unSelectCollapses) this.collapse();
					if (!this.selected) return;
					this.selected=false;
					this.node.className=this.node.className.removeWord(this.tree.selectedClass||"");
					this.tree.selected.removeByValue(this);
					if (this.tree.onUnSelect) this.tree.onUnSelect(this);
				} catch (e) {debug.print("TREENODE.unSelect():"+e);}
			};

			//select all of this node's children
			this.selectAll=function(){
				try{
					if (!(this.kids)) return;
					for (var k=0,len=this.kids.length;k<len;k++){
						this.kids[k].select();
					}
				} catch (e) {debug.print("TREENODE.selectAll():"+e);}
			};

			//unselect all of this node's childen
			this.unSelectAll=function(){
				try{
					if (!this.tree.selected) return;
					if (!(this.kids)) return;
					for (var k=0,len=this.kids.length;k<len;k++){
						this.kids[k].unSelect();
					}
				} catch (e) {debug.print("TREENODE.unSelectAll():"+e);}
			};
			
			//initialize
			try{
				//initialize with params or default values
				for (var p=0,len=forms.treeNode_params.length;p<len;p++) {
					var pvar = forms.treeNode_params[p];
					var def = forms.treeNode_defaultValues[pvar]||null;
					this[pvar]=params[pvar]||def;
				}

			} catch (e) {debug.print("TREENODE.init()[Part 1]:"+e);}

			try{
				if (!this.node) {
					var node=forms.createTreeViewBranch(this);
					if (this.parent==this.tree) this.node=this.tree.node.appendChild(node);
					else this.node=this.parent.kidsNode().appendChild(node);
				}
			} catch (e) {debug.print("TREENODE.init()[buildnode]:"+e);}

			try{
				if (this.data[this.tree.kidsName]) if (this.data[this.tree.kidsName].length){
					//this child node is being created and already has data to build deeper children
					for (var k=0,len=this.data[this.tree.kidsName].length;k<len;k++){
						this.addChild({data:this.data[this.tree.kidsName][k],dontInsertData:true},true);
					}
				}
			} catch (e) {debug.print("TREENODE.init()[Part 2]:"+e);}
		},


		stdPanel_defaultValues : {direction:"ttb",scrollMode:"scrollY",collapseImage:imgs.collapse,expandImage:imgs.expand,allowCollapse:true,
			contentHeight:"na"
		},
		stdPanel_params : ["width","height","allowCollapse","title","icon","collapsed","direction","scrollMode","collapseImage","expandImage",
			"contentHeight","contentWidth","noHeader","fitToContents",
		],

		PANEL: function(params){
			params=params||{};
			this.nameSpace="stdPanel";
			var passableObject=this;
			
			//attach reusable functions
			forms.addReusableFunctions(this);

			//stdPanel.init
			try{
				this.id=params.id||unique();
				forms.constructElement(this,this.nameSpace,params);

				var calcTitle=(val(this.contentHeight)-50)+"px";

				//create DOM
				this.node=createElement("div",{id:this.id,className:"forms stdPanel "+(this.direction||"")+((this.noHeader)?" noBorder":"")+((this.fitToContents)?" fitContents":""),style:(this.width?"width:"+this.width+";":"")+(this.height?"height:"+this.height+";":"")},[
					this.headerNode=(this.noHeader)?null:createElement("div",{className:"header",style:((this.direction=="rtl")?"height:"+(this.contentHeight)+";":"")},[
						this.iconNode=(this.icon)?createElement("img",{className:"icon", src:this.icon}):null,
						this.titleNode=createElement("div",{className:"title", textContent:(this.title||""),style:((this.direction=="rtl")?"width:"+(calcTitle)+";":"")}),
						this.toolsNode=createElement("div",{className:"tools"},[
							this.toggleNode=(!this.allowCollapse)?null:createElement("img",{src:this.collapseImage,className:"tool hoverRaise",title:"Toggle",onclick:function(){passableObject.toggle();} }),
						]),
					]),
					this.contentNode=createElement("div",{className:"content "+this.scrollMode,textContent:params.textContent||"",style:"height:"+(this.contentHeight||"")+"; width:"+(this.contentWidth||"")+";"},[params.content||null]),
				]);
				this.titleNode.style.marginRight=(this.toolsNode.childNodes.length*20)+"px";
			} catch (e) {debug.print(this.nameSpace+".init():"+e);}

		},

		accordion_defaultValues : {direction:"ttb",expandImage:imgs.expand,collapseImage:imgs.collapse},
		accordion_params : ["width","height","direction","expandImage","collapseImage"],

		ACCORDION: function(params){
			params=params||{};
			this.nameSpace="accordion";
			this.panels=[];

			//select this node
			this.toggle=function(k){
				try{
					if (this.panels[k].collapsed) this.expand(k); else this.collapse(k);
				} catch (e) {debug.print(this.nameSpace+".toggle():"+e);}
			};

			//select this node
			this.expand=function(k){
				try{
					if (!this.panels[k].collapsed) return;
					this.panels[k].collapsed=false;
					this.panels[k].node.className=this.panels[k].node.className.removeWord("collapsed");
					this.panels[k].toggleNode.src=this.collapseImage;
				} catch (e) {debug.print(this.nameSpace+".expand():"+e);}
			};

			//select this node
			this.collapse=function(k){
				try{
					if (this.panels[k].collapsed) return;
					this.panels[k].collapsed=true;
					this.panels[k].node.className=this.panels[k].node.className.addWord("collapsed");
					this.panels[k].toggleNode.src=this.expandImage;
				} catch (e) {debug.print(this.nameSpace+".collapse():"+e);}
			};

			//add a new panel (wrapper)
			this.addPanel=function(panel){
				try{
					var index=(this.direction=="rtl")?this.addPanel_rtl(panel):this.addPanel_ttb(panel);
				} catch (e) {debug.print(this.nameSpace+".addPanel():"+e);}
			};

			//add a new panel top to bottom
			this.addPanel_ttb=function(panel){
				try{
					var passableObject=this;
					this.panels.push({});
					var index=this.panels.length-1;
					this.node.appendChild(createElement("tr",{},[
						this.panels[index].node=createElement("td",{className:"panel"+((panel.noHeader)?" noBorder":""),style:"height:"+(panel.height)+";"},[
							(panel.noHeader)?null:createElement("div",{className:"header"},[
								(panel.icon)?createElement("img",{className:"icon",src:panel.icon}):null,
								createElement("div",{className:"title",textContent:panel.title||""}),
								createElement("div",{className:"tools"},[
									this.panels[index].toggleNode=createElement("img",{className:"tool hoverRaise",title:"Toggle",src:this.collapseImage,onclick:function(){passableObject.toggle(index);} }),
								]),
							]),
							createElement("div",{className:"content "+panel.scrollMode,textContent:panel.textContent||"",style:"height:"+(panel.contentHeight||"")+";"},[panel.content||null]),
						]),
					]));
					return index;
				} catch (e) {debug.print(this.nameSpace+".addPanel_ttb():"+e);}
			};

			//add a new panel right to left
			this.addPanel_rtl=function(panel){
				try{
					var passableObject=this;
					panel.contentHeight=panel.contentHeight||"200px";
					var calcTitle=(val(panel.contentHeight)-50)+"px";
					if (!this.row) return; //no parent row to use
					this.panels.push({});
					var index=this.panels.length-1;
					this.panels[index].node=this.row.appendChild(createElement("td",{className:"panel"+((panel.noHeader)?" noBorder":""),style:"width:"+(panel.width)+";"},[
						(panel.noHeader)?null:createElement("div",{className:"header",style:"height:"+(panel.contentHeight)+";"},[
							(panel.icon)?createElement("img",{className:"icon",src:panel.icon}):null,
							createElement("div",{className:"title",textContent:panel.title||"",style:"width:"+(calcTitle)+";"}),
							createElement("div",{className:"tools"},[
								this.panels[index].toggleNode=createElement("img",{className:"tool hoverRaise",title:"Toggle",src:this.collapseImage,onclick:function(){passableObject.toggle(index);} }),
							]),
						]),
						createElement("div",{className:"content "+panel.scrollMode,textContent:panel.textContent||"",style:"height:"+(panel.contentHeight||"")+";"},[panel.content||null]),
					]));
					return index;
				} catch (e) {debug.print(this.nameSpace+".addPanel_rtl():"+e);}
			};

			//accordion.init
			try{
				this.id=params.id||unique();
				forms.constructElement(this,this.nameSpace,params);

				//create basic panel layout
				this.node=createElement("table",{id:this.id,className:"forms accordion "+this.direction, border:"0", cellPadding:"0", cellSpacing:"0",style:"width:"+(this.width)+"; height:"+(this.height)+";"});
				if (this.direction=="rtl") this.row=this.node.appendChild(createElement("tr"));

				//create panels from passed kids
				if (params.kids) for (var k=0,klen=params.kids.length;k<klen;k++) {this.addPanel(params.kids[k]);}

			} catch (e) {debug.print(this.nameSpace+".init():"+e);}
		},



		toolButton_defaultValues : {
			size:16,color:"white",backgroundColor:"transparent",
		},

		toolButton_params : [
			"size","color","backgroundColor","title","name","toolName","onclick",
		],

		TOOLBUTTON: function(params){
			params=params||{};
			this.nameSpace="toolButton"; 
			var passableObject=this;
			
			//init
			try{
				this.id=params.id||unique();
				forms.constructElement(this,this.nameSpace,params);

				//create basic layout
				this.node=createElement("div",{className:"imgbutton",title:this.title},[
					this.imageNode=createElement("div",{className:this.color+this.size+" "+this.toolName, onclick:this.onclick, name:this.name})
				]);
				this.node.style.backgroundColor=this.backgroundColor;
			} catch (e) {debug.print(this.nameSpace+".init():"+e);}
		}, 


		tableRow_defaultValues : {
			height:"20",align:"top",
			selectAllImage:imgs.selectall, selectNoneImage:imgs.selectnone,			
			fontColor:"transparent", background:"transparent",
		},

		tableRow_params : [
			"height","title","name",
			"selectAllImage","selectNoneImage",
			"rowGroup","table",
			"fontColor","background",
		],

		TABLEROW: function(params){
			params=params||{};
			this.nameSpace="tableRow"; 
			var passableObject=this;
			
			//attach reusable functions
			forms.addReusableFunctions(this);

			//select every checkbox in this group
			this.selectAll=function(){
				try{
					for (c in this.table.columns) {
						this.table.cells[this.name][c].setValue(true);
					}
				} catch (e) {debug.print(this.nameSpace+".selectAll():"+e);}
			};			

			//unselect every checkbox in this group
			this.selectNone=function(){
				try{
					for (c in this.table.columns) {
						this.table.cells[this.name][c].setValue(false);
					}
				} catch (e) {debug.print(this.nameSpace+".selectNone():"+e);}
			};			

			//init
			try{
				this.id=params.id||unique();
				forms.constructElement(this,this.nameSpace,params);

				//create basic layout
				this.node=createElement("div",{className:"row",style:"vertical-align:"+this.align+";"},[
					this.headerNode=createElement("div",{className:"header panelHeader", style:"width:"+this.table.headerColumnWidth+"px;"},[
						this.titleNode=createElement("div",{className:"title",textContent:this.title}),
						this.toolsNode=createElement("div",{className:"tools"},[
							(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.selectNone();},title:"Select None",toolName:"selectnone"})).node,
							(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.selectAll();},title:"Select All",toolName:"selectall"})).node,
						]),
					]),
					this.cellsNode=createElement("div",{className:"cells"}),
				]);

				//add a blank cell for each possible column
				for (c in this.table.columns){
					var cell=new forms.TABLECELL({
						row:this,
						column:this.table.columns[c],
						table:this.table,
					});
					//link to all parents
					if (!this.table.cells[this.name]) this.table.cells[this.name]={};
					this.table.cells[this.name][c]=cell;
				}

				//append to bottom of parent table
				this.table.contentNode.appendChild(this.node);

			} catch (e) {debug.print(this.nameSpace+".init():"+e);}
		}, 

		tableRowGroup_defaultValues : {
			collapseImage:imgs.collapse2,expandImage:imgs.expand2, selectAllImage:imgs.selectall, selectNoneImage:imgs.selectnone,
		},

		tableRowGroup_params : [
			"title","name",
			"collapseImage","expandImage","selectAllImage","selectNoneImage",
			"table",
		],

		TABLEROWGROUP: function(params){
			params=params||{};
			this.nameSpace="tableRowGroup"; 
			var passableObject=this;
			this.rows={}; //just an array of rows
			this.toolBoxNodes={}; //[col]:toolbox node
			
			//attach reusable functions
			forms.addReusableFunctions(this);

			//add a toolbox
			this.addColumnTools=function(c){
				try{
					var column=this.table.columns[c];
					this.headerRow.appendChild(
						this.toolBoxNodes[c]=createElement("div",{className:"tools",style:"width:"+column.width+"px;"},[
							(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.selectNoneSubCol(c);},title:"Select None",toolName:"selectnone"})).node,
							(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.selectAllSubCol(c);},title:"Select All",toolName:"selectall"})).node,
						])
					);

				} catch (e) {debug.print(this.nameSpace+".addColumnTools():"+e);}
			};

			//add a row to this group
			this.addRow=function(row){
				try{
					//get row by name
					if (isString(row)) row=this.table.rows[row]; //otherwise assume row is the row object

					this.rows[row.name]=row;
					row.rowGroup=this;
					this.contentNode.appendChild(row.node);
				} catch (e) {debug.print(this.nameSpace+".addRow():"+e);}
			};			


			//select every checkbox in this group
			this.selectAll=function(){
				try{
					for (r in this.rows) for (c in this.table.columns){
						this.table.cells[r][c].setValue(true);
					}
				} catch (e) {debug.print(this.nameSpace+".selectAll():"+e);}
			};			

			//unselect every checkbox in this group
			this.selectNone=function(){
				try{
					for (r in this.rows) for (c in this.table.columns){
						this.table.cells[r][c].setValue(false);
					}
				} catch (e) {debug.print(this.nameSpace+".selectNone():"+e);}
			};			

			//select every checkbox in this group in column #c
			this.selectAllSubCol=function(c){
				try{
					for (r in this.rows) {
						this.table.cells[r][c].setValue(true);
					}
				} catch (e) {debug.print(this.nameSpace+".selectAllSubCol():"+e);}
			};			

			//unselect every checkbox in this group in column #c
			this.selectNoneSubCol=function(c){
				try{
					for (r in this.rows) {
						this.table.cells[r][c].setValue(false);
					}
				} catch (e) {debug.print(this.nameSpace+".selectNoneSubCol():"+e);}
			};			

			//init
			try{
				this.id=params.id||unique();
				forms.constructElement(this,this.nameSpace,params);

				//create basic layout
				this.node=createElement("div",{className:"forms rowGroup"},[ //the forms keyword activates the collase and expand functions for the content node
					this.headerRow=createElement("div",{className:"groupHeaderRow"},[
						this.headerNode=createElement("div",{className:"header panelHeader", style:"width:"+this.table.headerColumnWidth+"px;"},[
							this.titleNode=createElement("div",{className:"title",textContent:this.title}),
							this.toolsNode=createElement("div",{className:"tools"},[
								(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.selectNone();},title:"Select None",toolName:"selectnone"})).node,
								(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.selectAll();},title:"Select All",toolName:"selectall"})).node,
								this.toggleNode=(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.toggle();},title:"Toggle",toolName:"close2"})).node,
							]),
						]),
					]),
					this.contentNode=createElement("div",{className:"content"}),
				]);

				//append rows
				if (params.rows) for (var r=0,rlen=params.rows.length;r<rlen;r++) this.addRow(params.rows[r]);

				//make a toolbox for each column
				for (c in this.table.columns) this.addColumnTools(c);

				//append to parent table
				this.table.contentNode.appendChild(this.node);

			} catch (e) {debug.print(this.nameSpace+".init():"+e);}
		}, 

		tableColumnGroup_defaultValues : {
			collapseImage:imgs.collapse3,expandImage:imgs.expand3, selectAllImage:imgs.selectall, selectNoneImage:imgs.selectnone,			
		},

		tableColumnGroup_params : [
			"title","name",
			"collapseImage","expandImage","selectAllImage","selectNoneImage",
			"table",
		],

		TABLECOLUMNGROUP: function(params){
			params=params||{};
			this.nameSpace="tableColumnGroup"; 
			var passableObject=this;
			this.columns={};
			this.width=0;
			
			//attach reusable functions
			forms.addReusableFunctions(this);

			//expand this group
			this.expand=function(){
				try{
					if (!this.collapsed) return;
					this.node.className=this.node.className.removeWord("pinch");
					for (c in this.columns) this.table.columns[c].expand();
					this.collapsed=false;
				} catch (e) {debug.print(this.nameSpace+".expand():"+e);}
			};

			//collapse this group
			this.collapse=function(){
				try{
					if (this.collapsed) return;
					this.node.className=this.node.className.addWord("pinch");
					for (c in this.columns) this.table.columns[c].collapse();
					this.collapsed=true;
				} catch (e) {debug.print(this.nameSpace+".collapse():"+e);}
			};

			//select every checkbox in this group
			this.selectAll=function(){
				try{
					for (r in this.table.rows) for (c in this.columns){
						this.table.cells[r][c].setValue(true);
					}
				} catch (e) {debug.print(this.nameSpace+".selectAll():"+e);}
			};

			//unselect every checkbox in this group
			this.selectNone=function(){
				try{
					for (r in this.table.rows) for (c in this.columns){
						this.table.cells[r][c].setValue(false);
					}
				} catch (e) {debug.print(this.nameSpace+".selectNone():"+e);}
			};

			this.negotiateWidth=function(){
				//resize group header
				var w=0,count=0, column, c, countopen=0;
				for (c in this.columns){
					column=this.columns[c];
					w+=((column.collapsed)?22:column.width)+((count)?2:0);
					count++;
					countopen+=((column.collapsed)?0:1);
				}
				this.width=w;
				this.node.style.width=w+"px";

				if (countopen && this.collapsed) {
					this.node.className=this.node.className.removeWord("pinch");
					this.collapsed=false;					
				}
				else if (!countopen && !this.collapsed) {
					this.node.className=this.node.className.addWord("pinch");
					this.collapsed=true;
				}
			};

			//add a column to this group
			this.addColumn=function(column){
				try{
					//get row by name
					if (isString(column)) column=this.table.columns[column]; //otherwise assume column is the column object

					this.columns[column.name]=column;
					column.colGroup=this;

					this.negotiateWidth();

				} catch (e) {debug.print(this.nameSpace+".addColumn():"+e);}
			};			

			//init
			try{
				this.id=params.id||unique();
				forms.constructElement(this,this.nameSpace,params);

				//create basic layout
				this.node=createElement("div",{className:"colGroup"},[
					this.unPinchNode=(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.toggle();},title:"Toggle",toolName:"open"})).node,

					this.headerNode=createElement("div",{className:"header panelHeader"},[
						this.titleNode=createElement("div",{className:"title",textContent:this.title}),
						this.toolsNode=createElement("div",{className:"tools"},[
							(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.selectNone();},title:"Select None",toolName:"selectnone"})).node,
							(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.selectAll();},title:"Select All",toolName:"selectall"})).node,
							this.toggleNode=(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.toggle();},title:"Toggle",toolName:"close"})).node,
						]),
					]),
				]);
				this.node.style.textAlign="center";
				this.unPinchNode.className+=" whenPinched";

				//append columns
				if (params.cols) for (var col=0,clen=params.cols.length;col<clen;col++) this.addColumn(params.cols[col]);

				//append to parent table
				this.table.colGroupsNode.appendChild(this.node);

			} catch (e) {debug.print(this.nameSpace+".init():"+e);}
		}, 

		tableColumn_defaultValues : {
			width:160,align:"left",type:"textbox",defaultValue:"",
			collapseImage:imgs.collapse3,expandImage:imgs.expand3, selectAllImage:imgs.selectall, selectNoneImage:imgs.selectnone,
			fontColor:"transparent", background:"transparent",
		},

		tableColumn_params : [
			"width","align","title","name","type","defaultValue",
			"collapseImage","expandImage","selectAllImage","selectNoneImage",
			"colGroup","table",
			"prefix","suffix",
			"fontColor","background",
		],

		TABLECOLUMN: function(params){
			params=params||{};
			this.nameSpace="tableColumn"; 
			var passableObject=this;
			
			//attach reusable functions
			forms.addReusableFunctions(this);

			//expand this group
			this.expand=function(){
				try{
					if (!this.collapsed) return;
					this.node.className=this.node.className.removeWord("pinch");
					for (r in this.table.rows) this.table.cells[r][this.name].expand();
					for (r in this.table.rowGroups) {
						var toolbox = this.table.rowGroups[r].toolBoxNodes[this.name];
						toolbox.className=toolbox.className.removeWord("pinch");
					}
					this.collapsed=false;

					if (this.colGroup) this.colGroup.negotiateWidth();
				} catch (e) {debug.print(this.nameSpace+".expand():"+e);}
			};			

			//collapse this group
			this.collapse=function(){
				try{
					if (this.collapsed) return;
					this.node.className=this.node.className.addWord("pinch");
					for (r in this.table.rows) this.table.cells[r][this.name].collapse();
					for (r in this.table.rowGroups) {
						var toolbox = this.table.rowGroups[r].toolBoxNodes[this.name];
						toolbox.className=toolbox.className.addWord("pinch");
					}
					this.collapsed=true;
					if (this.colGroup) this.colGroup.negotiateWidth();
				} catch (e) {debug.print(this.nameSpace+".collapse():"+e);}
			};			

			//select every checkbox in this group
			this.selectAll=function(){
				try{
					for (r in this.table.rows) {
						this.table.cells[r][this.name].setValue(true);
					}
				} catch (e) {debug.print(this.nameSpace+".selectAll():"+e);}
			};			

			//unselect every checkbox in this group
			this.selectNone=function(){
				try{
					for (r in this.table.rows) {
						this.table.cells[r][this.name].setValue(false);
					}
				} catch (e) {debug.print(this.nameSpace+".selectNone():"+e);}
			};			

			//init
			try{
				this.id=params.id||unique();
				forms.constructElement(this,this.nameSpace,params);

				//create basic layout
				this.node=createElement("div",{className:"column"},[
					this.unPinchNode=(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.toggle();},title:"Select None",toolName:"open"})).node,

					this.headerNode=createElement("div",{className:"header panelHeader"},[
						this.titleNode=createElement("div",{className:"title",textContent:this.title}),
						this.toolsNode=createElement("div",{className:"tools"},[
							(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.selectNone();},title:"Select None",toolName:"selectnone"})).node,
							(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.selectAll();},title:"Select All",toolName:"selectall"})).node,
							this.toggleNode=(new forms.TOOLBUTTON({color:"black",onclick:function(){passableObject.toggle();},title:"Toggle",toolName:"close"})).node,
						]),
					]),
				]);
				this.node.style.width=this.width+"px";
				this.node.style.textAlign=this.align;
				this.unPinchNode.className+=" whenPinched";

				//add a cell for each possible row
				for (r in this.table.rows){
					var cell=new forms.TABLECELL({
						row:this.table.rows[r],
						column:this,
						table:this.table,
						background:this.background,
						fontColor:this.fontColor,
					});
					//link to all parents
					this.table.cells[r][this.name]=cell;
				}

				//append to parent table
				this.table.colHeadersNode.appendChild(this.node);

			} catch (e) {debug.print(this.nameSpace+".init():"+e);}
		}, 

		tableCell_defaultValues : {
		},

		tableCell_params : [
			"locked","defaultValue","value","checked",
			"onChange",
			"column","row","table",
		],

		TABLECELL: function(params){
			params=params||{};
			this.nameSpace="tableCell"; 
			var passableObject=this;
			
			//attach reusable functions
			forms.addReusableFunctions(this);

			//change the cell value
			this.setValue=function(value){
				try{
					this.value=value;

					switch(this.type){
					case "textbox":
						this.dataNode.value=value;
						break;
					case "checkbox":
						this.dataNode.checked=value;
						break;
					}
				} catch (e) {debug.print(this.nameSpace+".setValue():"+e);}
			};

			//expand this cell
			this.expand=function(){
				try{
					if (!this.collapsed) return;
					this.node.className=this.node.className.removeWord("pinch");
					this.collapsed=false;
				} catch (e) {debug.print(this.nameSpace+".expand():"+e);}
			};			

			//collapse this cell
			this.collapse=function(){
				try{
					if (this.collapsed) return;
					this.node.className=this.node.className.addWord("pinch");
					this.collapsed=true;
				} catch (e) {debug.print(this.nameSpace+".collapse():"+e);}
			};			

			//init
			try{
				this.id=params.id||unique();
				forms.constructElement(this,this.nameSpace,params);

				//create basic layout
				this.type=this.column.type;
				this.defaultValue=this.defaultValue||this.column.defaultValue;

				this.node=createElement("div",{className:"cell"});
				this.node.style.width=this.column.width+"px";
				this.node.style.height=this.row.height+"px";
				this.node.style.textAlign=this.column.align;
				this.node.style.verticalAlign=this.row.align;

				//calculate cell name
				this.name=(this.column.prefix||"")+(this.row.name||"")+(this.column.suffix||"");

				//calculate value
				this.value=params.value||this.defaultValue;

				//determine what input type this cell is
				switch(this.type){
					case "textbox":
						this.dataNode=createElement("input",{type:"text", name:this.name, value:this.value, onchange:function(){passableObject.value=this.value;} });
						break;
					case "checkbox":
						this.dataNode=createElement("input",{type:"checkbox", name:this.name, checked:this.value, onchange:function(){passableObject.value=this.checked;} });
						break;
					case "updown":
						//create an updown control for this
						break;
				}
				//insert the data object in the cell
				this.node.appendChild(this.dataNode);

				//append cell to parent row
				this.row.cellsNode.appendChild(this.node);

			} catch (e) {debug.print(this.nameSpace+".init():"+e);}
		}, 

		table_defaultValues : {
			panelize:true,
			scrollMode:"ScrollXY",
			collapseImage:imgs.collapse,expandImage:imgs.expand, selectAllImage:imgs.selectall, selectNoneImage:imgs.selectnone,
			allowCollapseTable:true, allowCollapseGroups:true, allowCollapseColumns:true,
			allowSelectGroups:true, allowSelectColumns:true, allowSelectGroupColumns:true,
			headerColumnWidth:"160",
		},
		table_params : [
			"width","height","title","icon","scrollMode","panelize",
			"collapseImage","expandImage","selectAllImage","selectNoneImage",
			"allowCollapseGroups","allowCollapseTable","allowCollapseColumns",
			"allowSelectColumns","allowSelectGroupColumns","allowSelectGroups",
			"cellWidth","cellAlignment",
			"headerColumnWidth",
		],

		TABLE: function(params){
			params=params||{};
			this.nameSpace="table";
			var passableObject=this;
			
			this.colGroups={};
			this.rowGroups={};
			this.columns={}; //[col]:col data
			this.rows={}; //[row]:row data
			this.cells={}; //[row][col]:[cell]

			//attach reusable functions
			forms.addReusableFunctions(this);

			//add a new row
			this.addRow=function(data){
				try{
					data.table=this;
					this.rows[data.name]=new forms.TABLEROW(data);
				} catch (e) {debug.print(this.nameSpace+".addRow():"+e);}
			};

			//add a new column 
			this.addColumn=function(data){
				try{
					data.table=this;
					this.columns[data.name]=new forms.TABLECOLUMN(data);
				} catch (e) {debug.print(this.nameSpace+".addColumn():"+e);}
			};

			//add a new column group
			this.addColGroup=function(data){
				try{
					data.table=this;
					this.colGroups[data.name]=new forms.TABLECOLUMNGROUP(data);
				} catch (e) {debug.print(this.nameSpace+".addColGroup():"+e);}
			};

			//add a new row group
			this.addRowGroup=function(data){
				try{
					data.table=this;
					this.rowGroups[data.name]=new forms.TABLEROWGROUP(data);
				} catch (e) {debug.print(this.nameSpace+".addRowGroup():"+e);}
			};

			//init
			try{
				this.id=params.id||unique();
				forms.constructElement(this,this.nameSpace,params);

				//create table DOM
				if (this.panelize) {
					//wrap this table in a panel object
					this.panel=new forms.PANEL({
						icon:this.icon, title:this.title, collapseImage:this.collapseImage, 
						expandImage:this.expandImage, scrollMode:this.scrollMode, contentHeight:this.height||"na",
						contentWidth:this.width||"na",
					});
					//match the panel up to this element's controls
					this.node=this.panel.node;
					this.contentNode=this.panel.contentNode;
					this.headerNode=this.panel.headerNode;
					this.iconNode=this.panel.iconNode;
					this.titleNode=this.panel.titleNode;
					this.toolsNode=this.panel.toolsNode;
					this.toggleNode=this.panel.toggleNode;
					this.node.className+=" table";
				} else {
					//create a generic wrapper
					this.contentNode=createElement("div",{className:"content border"+this.scrollMode,style:"height:"+(this.height||"")+"; width:"+(this.width||"")+";"});
				}

				//add the colgroup container
				this.colGroupsNode=createElement("div",{className:"colGroups",style:"margin-left:"+this.headerColumnWidth+"px;"});
				this.contentNode.appendChild(this.colGroupsNode);

				//add the column header container
				this.colHeadersNode=createElement("div",{className:"colHeaders",style:"margin-left:"+this.headerColumnWidth+"px;"});
				this.contentNode.appendChild(this.colHeadersNode);

				//add columns
				if (params.cols) {
					for (var c=0,clen=params.cols.length;c<clen;c++){
						this.addColumn(params.cols[c]);
					}
				}

				//add rows
				if (params.rows) {
					for (var r=0,rlen=params.rows.length;r<rlen;r++){
						this.addRow(params.rows[r]);
					}
				}

				//add col groups
				if (params.colGroups) {
					for (var cg=0,cglen=params.colGroups.length;cg<cglen;cg++){
						this.addColGroup(params.colGroups[cg]);

						//column groups loaded from a data packet should contain the columns that are in the group
					}
				}
				
				//add row groups
				if (params.rowGroups) {
					for (var rg=0,rglen=params.rowGroups.length;rg<rglen;rg++){
						this.addRowGroup(params.rowGroups[rg]);

						//row groups loaded from a data packet should contain the rows that are in the group
					}
				}

				//add data to cells
				if (params.data) {
					//[row1:[col1,col2,col3,...],row2...]
					for (r in this.rows) for (c in this.columns) {
						this.cells[r][c].setValue(params.data[r][c]);
					}
				}

			} catch (e) {debug.print(this.nameSpace+".init():"+e);}
		},

		FRAME: function(params){
			try{
				this.node=createElement("div",{id:(params.id||null), className:"forms frame"},[
					this.titleNode=createElement("span",{className:"caption",textContent:params.caption}),
					this.contentNode=createElement("div",{className:"content"}),
				]);
				if (params.textContent||null) this.contentNode.appendChild(createElement("span",{textContent:params.textContent}));
				if (params.kids||null) for (var k=0,klen=params.kids.length;k<klen;k++) this.contentNode.appendchild(params.kids[k]);
			} catch(e) {debug.print("frame.init():" +e);}
		},


		CHECKBOX: function(params){
			try{
				this.node=createElement("div",{className:"forms checkbox"},[
					this.titleNode=createElement("label",{className:"label",textContent:params.caption,for:params.id}),
					this.checkContainerNode=createElement("div",{className:"checkContainer"},[
						this.checkNode=createElement("input",{className:"check",type:"checkbox",value:params.value,id:(params.id||null)}),
					]),
				]);
				if (exists(params.checkAlign)){
					var a=params.checkAlign;

					//check comes before label
					if (a==TOPLEFT || a== MIDDLELEFT || a==BOTTOMLEFT || a==TOPCENTER){
						this.node.insertBefore(this.checkContainerNode,this.titleNode);
					}

					//check is not inline
					if (a==TOPCENTER || a==BOTTOMCENTER || a==MIDDLECENTER){
						this.checkContainerNode.style.display="block";
						this.checkContainerNode.style.left="50%";
						this.checkNode.style.left="-10px";
					}

					//check is behind label
					if (a==MIDDLECENTER){
						this.checkContainerNode.style.position="absolute";
						this.checkContainerNode.style.top="0px";
						this.checkcontainerNode.style.zIndex="-1";
					}

					//check is aligned in relation to label
					if (a==TOPLEFT || a== TOPCENTER || a==TOPRIGHT){
						this.checkContainerNode.style.verticalAlign="top";
					} else if (a==MIDDLELEFT || a== MIDDLECENTER || a==MIDDLERIGHT){
						this.checkContainerNode.style.verticalAlign="middle";
					} else if (a==BOTTOMLEFT || a== BOTTOMCENTER || a==BOTTOMRIGHT){
						this.checkContainerNode.style.verticalAlign="bottom";
					}
				}
			} catch(e) {debug.print("checkBox.init():" +e);}
		},


	};

})(); // anonymous function wrapper end



