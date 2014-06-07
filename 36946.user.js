// ==UserScript==
// @name           RLCuserPicsPublic
// @namespace      myRLCpiclinkerPublic
// @include        http://www.utherverse.com/net/userMedia/MIShowPics.aspx?MemberId=*
// @include        http://www.utherverse.com/net/userMedia/MIShowPics.aspx*
// @include        http://www.utherverse.com/net/home.aspx
// @include        http://www.utherverse.com/net/blog/blog.aspx*
// @include        http://www.utherverse.com/net/profile/edit_personality.aspx
// @include        http://www.utherverse.com/net/blog/view_blog.aspx*
// @include        http://www.utherverse.com/net/settings/mysettings.aspx*
// @include        http://www.utherverse.com/Net/userMedia/MIAlbum.aspx*
// @include        http://www.utherverse.com/net/contacts/EditFriends.aspx*
// @include        http://www.utherverse.com/email*
//@include        http://www.utherverse.com/net/bulletin*
//@include        http://www.utherverse.com/net/profile/all_PComments.aspx*
//@include        http://www.utherverse.com/net/Gifts/MyGifts.aspx*



// ==/UserScript==
//* Form Builder *//

(function (){
document.title = document.title+' - View Profile';
}());
if (mLastUserID==null){var mLastUserID};
var navdivLeft = document.createElement("div");
    navdivLeft.setAttribute('id','navdivLeft');
  navdivLeft.innerHTML = '<a href="http://www.utherverse.com/net/home.aspx">Home</a> | <a href="http://www.utherverse.com/net/logout.aspx">Sign Out</a><hr>'+
  '<style type="text/css" media="all">'+
	'	.TinyField		{font-size: 12pt;}'+
	' .SCMainAdSpace {visibility:hidden;height:0px;}'+
	'</style>'+
'<strong><u>SELECT User:</u></strong><br>'+
'<form name="aspnetFormUSER" id="aspnetFormUSER">'+ //
'<div>'+
'<script type="text/javascript">'+
'function TabSelectUser(){'+
'var diSelect=(document.aspnetFormUSER.ddSelect.selectedIndex);'+
'var dsSelect=(document.aspnetFormUSER.ddSelect.options[diSelect].value);'+
'document.aspnetFormUSER.ddSelected.value=dsSelect;'+
'document.aspnetFormVIEW.ddSelected.value=dsSelect;'+
'document.aspnetFormBLOG.ddSelected.value=dsSelect;'+
'}'+
'function TabUpdateUser(){'+

'var LastUserID='+
mLastUserID  +
';'+

'if (document.aspnetFormUSER.ddSelected.value.length==0){'+
'TabSelectUser();'+
'dsSelect=document.aspnetFormUSER.ddSelected.value;'+
'}'+
'else{'+
'var dsSelect=(document.aspnetFormUSER.ddSelected.value)'+
'};'+

'document.aspnetFormUSER.ddSelected.value=dsSelect;'+
'document.aspnetFormVIEW.ddSelected.value=dsSelect;'+
'document.aspnetFormBLOG.ddSelected.value=dsSelect;'+

'}'+
'</script>'+
'						<select name="MemberID" id="ddSelect" class="TinyField" size="5"  style="width:100px;"  onclick="TabSelectUser();" >'+
'							<option selected="selected" value=91676054>Lets</option>'+
'							<option value=91766233>justhere999</option>'+
'							<option value=91604279>Sabrina_Fairy</option>'+
'							<option value=91803887>Satrinah</option>'+
'							<option value=91596347>Shader</option>'+
'							<option value=91603425>Topaz</option>'+
'						</select><br>'+
'<br>'+
'<input type="text"  id="ddSelected" size="14" /> '+
'</div></form>'+
'<br>'+
'<form name="aspnetFormVIEW" method="get" action="http://www.utherverse.com/net/profile/view_profile.aspx" id="aspnetFormVIEW">'+ //
'<div>'+
'<input type="hidden"  name="MemberID" id="ddSelected" size="10"  /> '+
'<input type="submit" value="USERS PAGE" id="ddSubmitSelected" src="http://www.utherverse.com/App_Themes/Utherverse/Buttons/BTN-90-Search.png"  style="width:100px;" onclick="TabUpdateUser();"  />'+
'</div></form>'+
'<form name="aspnetFormBLOG" method="get" action="http://www.utherverse.com/net/blog/view_blog.aspx?" id="aspnetFormBLOG">'+ 
'<div>'+
'<input type="hidden" name="viewLogMId" id="ddSelected" size="10" /> '+
'<input type="submit" value="USERS BLOG"  id="ddSubmitSelected" src="http://www.utherverse.com/App_Themes/Utherverse/Buttons/BTN-90-Search.png"   style="width:100px;" onclick="TabUpdateUser();"  />'+
'<br>'+
'</div></form>'+
'<br>'+
'<br>'+
'<br>'+
'<br>'+
'<strong><u>MINE:</u></strong><br>'+
'<script type="text/javascript">'+
'function Checkem(b){'+
'if (document.location.href.match("http://www.utherverse.com/Net/userMedia/MIAlbum.aspx")=="http://www.utherverse.com/Net/userMedia/MIAlbum.aspx"){'+
'var allcheckboxs, thischeckbox;allcheckboxs = document.evaluate("//input[@type=\'checkbox\']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);for (var i = 0; i < allcheckboxs.snapshotLength; i++) {thischeckbox = allcheckboxs.snapshotItem(i);if (b){thischeckbox.checked=true;_Album_SelPicCtr ++;}else{thischeckbox.checked=false;_Album_SelPicCtr --;}}'+
'}else{'+
'alert("Not at Your Own Picture Album")'+
'}'+
'}'+
'</script>'+
'<table cellpadding="0" cellspacing="0" class="PAImageTable"><tr><td align="center" valign="middle"><span style="cursor:pointer" onclick="javascript:GotoMIViewPage(3921521);"><img src="/Media/1/2/9/3/521-100.jpg" width="100" height="75" /></span></td></tr></table>'+
'<center><div ><div ><table cellpadding="0" cellspacing="0" border="0"><tr>'+
'	<td style="cursor:pointer" onclick="AddNewPic();"><img src="/App_Themes/Utherverse/Images/PA-AddPic.gif"></td>'+
'	</tr><tr><td class="SCTabDefault" style="background: url(\'/App_Themes/Utherverse/Images/SCTab-AtAGlance.png\');" id="oTBHome" onmouseover="TabLightup(\'oTBHome\');" onmouseout="TabDarken(\'oTBHome\',false);" onclick="window.location.href=\'/net/home.aspx\';">&nbsp;</td>'+
'	</tr><tr><td class="SCTabDefault" style="background: url(\'/App_Themes/Utherverse/Images/SCTab-MyProfile.png\');" id="oTBProfile" onmouseover="TabLightup(\'oTBProfile\');" onmouseout="TabDarken(\'oTBProfile\',false);" onclick="window.location.href=\'/net/profile/edit_personality.aspx\';">&nbsp;</td>'+
'	</tr><tr><td class="SCTabDefault" style="background: url(\'/App_Themes/Utherverse/Images/SCTab-MyMessages.png\');" id="oTBEmail" onmouseover="TabLightup(\'oTBEmail\');" onmouseout="TabDarken(\'oTBEmail\',false);" onclick="window.location.href=\'/email/Message.aspx\';">&nbsp;</td>'+
'	</tr><tr><td class="SCTabDefault" style="background: url(\'/App_Themes/Utherverse/Images/SCTab-MyFriends.png\');" id="oTBFriends" onmouseover="TabLightup(\'oTBFriends\');" onmouseout="TabDarken(\'oTBFriends\',false);" onclick="window.location.href=\'/net/contacts/EditFriends.aspx\';"></td>'+
'	</tr><tr><td class="SCTabSelected" style="background: url(\'/App_Themes/Utherverse/Images/SCTab-MyPics.png\');" id="oTBPics" onmouseover="TabLightup(\'oTBPics\');" onmouseout="TabDarken(\'oTBPics\',true);" onclick="window.location.href=\'/Net/userMedia/MIAlbum.aspx\';">&nbsp;</td>'+
'	</tr><tr><td class="SCTabDefault" style="background: url(\'/App_Themes/Utherverse/Images/SCTab-MyBlog.png\');" id="oTBBlog" onmouseover="TabLightup(\'oTBBlog\');" onmouseout="TabDarken(\'oTBBlog\',false);" onclick="window.location.href=\'/net/blog/view_blog.aspx\';">&nbsp;</td>'+
'	</tr><tr><td class="SCTabDefault" style="background: url(\'/App_Themes/Utherverse/Images/SCTab-MySettings.png\');" id="oTBSets" onmouseover="TabLightup(\'oTBSets\');" onmouseout="TabDarken(\'oTBSets\',false);" onclick="window.location.href=\'/net/settings/mysettings.aspx\';">&nbsp;</td>'+
'	</tr><tr><td class="SCTabDefault" style="background: url(\'http://www.utherverse.com/Media/8/6/0/4/380-100.jpg\');" id="oTBCheckAll" onmouseover="TabLightup(\'oTBCheckAll\');" onmouseout="TabDarken(\'oTBCheckAll\',false);" onclick="javascript:Checkem(true);">&nbsp;</td>'+
'	</tr><tr><td class="SCTabDefault" style="background: url(\'http://www.utherverse.com/Media/8/6/0/4/383-100.jpg\');" id="oTBCheckAllUndo" onmouseover="TabLightup(\'oTBCheckAllUndo\');" onmouseout="TabDarken(\'oTBCheckAllUndo\',false);" onclick="javascript:Checkem(false);">&nbsp;</td>'+
'	</tr><tr><td class="SCTabDefault" style="background: url(\'http://www.utherverse.com/Media/4/8/0/4/822-100.jpg\');" id="oTBStepThru" onmouseover="TabLightup(\'oTBStepThru\');" onmouseout="TabDarken(\'oTBStepThru\',false);" onclick="RateThemSettings();">&nbsp;</td>'+
'	</tr><tr><td class="SCTabDefault" style="background: url(\'http://www.utherverse.com/Media/4/8/0/4/826-100.jpg\');" id="oTBTest" onmouseover="TabLightup(\'oTBTest\');" onmouseout="TabDarken(\'oTBTest\',false);" onclick="javascript:test();">&nbsp;</td>'+
'</tr></table></div></div></center>'+
'<br>';
  document.body.insertBefore(navdivLeft, document.body.firstChild);

var s='#navdivLeft{background-color:#6698CB;position:fixed;top:0px;left:0px;padding:1px 2px 4px 4px;-moz-border-radius-bottomleft:6px;}'
  + '#navdivLeft a{color:white; font-family:Calibri, Arial; font-size:12px; font-weight:normal;}';
  GM_addStyle(s);
var s2=  document.getElementById("ddSelect").value;
mLastUserID=s2;

//#########################################################################			
	function winList(xArr,xArrRun){
		var txt1 = "This is a new window.";
		var txt2 = "This is a test.";
		var win=window.open('','_blank','fullscreen=yes,status=yes,location=yes','false');//fullscreen=yes//width=1000,height=900
		var i=0;
		var sBody = new String;
		sBody="<html id='myHtmlId' ><head>"
		sBody=sBody+'<base id="myBaseId"  />'
		sBody=sBody+"<style type=\"text/css\">body{position:absolute;right:0px;align:right;} .myTabDefault{width:100px;height:25;align:right; cursor: pointer; onmouseover:null; onmouseout:null;}  .myLinkNumDefault{width:10px;align:center;cursor: pointer; onmouseover:null; onmouseout:null;} .myNumDefault{width:10px;align:center;cursor: pointer; onmouseover:null; onmouseout:null;} .SCMainAdSpace {visibility:hidden;height:0px;} </style>"
		sBody=sBody+'<script type="text/javascript">';
		
		sBody=sBody+"var pgI=0,pgI2=0;var pgArr=new Array();var pgArrRun=new Array();var pgWin=window.self;"
		
		for (i=0;i<xArrRun.length;i++){
			sBody=sBody+"pgArrRun["+i+"]="+xArrRun[i]+";";
		}
		sBody=sBody+"function IncreamentEm(bBack,pgINow){"
		sBody=sBody+'var pgFrameTo=document.getElementById("myUpperFrame");'
		sBody=sBody+"if(!(pgINow==undefined)){  pgI=(pgINow-1);}"
		sBody=sBody+"else if(bBack){       if(pgI>0){             pgI=(pgI-1);}}"
		sBody=sBody+"else{       if(pgI<(pgArrRun.length-1)){    pgI=(pgI+1);}}"
		 
		sBody=sBody+'document.getElementById("myPictureFramer").src= pgArrRun[pgI];'
		sBody=sBody+'var pgTime=setTimeout("window.status=\'Picture [\' + (pgI+1) + \' ] of \' + pgArrRun.length;",1000);';
		sBody=sBody+"window.status='Picture [ ' + (pgI+1) + ' ] of ' + pgArrRun.length;"
		sBody=sBody+"}"

		sBody=sBody+"function ResizeEm(){"
		sBody=sBody+'var pgHeight=window.self.outerHeight-(70+27) ;'
		sBody=sBody+'document.getElementById("myPictureFramer").height=(pgHeight-140);'
		sBody=sBody+"}"		

		
		sBody=sBody+'</script></head>';	
		sBody=sBody+"<body id='myBody' onresize='ResizeEm()' onmouseup='whichElement(event)' onload='IncreamentEm(false,1)' style=\"width:87%; align:middle;\"><div id='myMainDiv' style=\"width:99%;\"  align=\"center\">";		
		sBody=sBody+"<frameset id='myFrameSet' rows='15%,85%'>"
		//this should be the pgTempFile		
		var pgTempFile= new  String;
		pgTempFile=pgTempFile+"<table><tr>"
		for (i=0;i<xArr.length;i++){
			pgTempFile=pgTempFile+"<td class=\"myLinkNumDefault\">"+xArr[i]+"</td>";
		}
		pgTempFile=pgTempFile+"</tr></table>";
		pgTempFile=pgTempFile+"<table><tr>"
		for (i=0;i<xArr.length;i++){
			var newrow=new String;
			pgTempFile=pgTempFile+ newrow +'  <td  class="myNumDefault"  id="oTBNumDefault" onmouseover="TabLightup(\'oTBNumDefault\');" onmouseout="TabDarken(\'oTBNumDefault\',false);"    onclick="javascript:IncreamentEm(false,'+ (i+1) +');" >' +(i+1) + '</td>'
		}
		pgTempFile=pgTempFile+"</tr></table>"
		sBody=sBody+'<pre id="myPreLinks"  style="margin:0px; padding:6px; border:1px inset; width:99%; height:70; overflow:auto">'
		sBody=sBody+pgTempFile
		sBody=sBody+'</pre>'
		pgTempFile='<pre id="myPreCmds"  style="margin:0px; padding:6px; border:1px inset; width:99%; height:27; overflow:auto">'
		pgTempFile=pgTempFile+"<table><tr>"
		pgTempFile=pgTempFile+"<td class=\"myTabDefault\" style=\"background: url('http://www.utherverse.com/Media/4/8/0/4/819-100.jpg');\" id=\"oTBPrev\" onmouseover=\"TabLightup(\'oTBPrev\');\" onmouseout=\"TabDarken(\'oTBPrev\',true);\" onclick=\"javascript:IncreamentEm(true);\">&nbsp;</td>"
		pgTempFile=pgTempFile+"<td class=\"myTabDefault\" style=\"background: url('http://www.utherverse.com/Media/4/8/0/4/817-100.jpg');\" id=\"oTBNext\" onmouseover=\"TabLightup(\'oTBNext\');\" onmouseout=\"TabDarken(\'oTBNext\',false);\" onclick=\"javascript:IncreamentEm(false);\">&nbsp;</td>"
		pgTempFile=pgTempFile+"</tr></table>";
		pgTempFile=pgTempFile+'</pre>'
		
		sBody=sBody+pgTempFile
		sBody=sBody+'<script type="text/javascript">';
		sBody=sBody+'document.getElementById("myUpperFrame").src= pgTempFile;'
		sBody=sBody+'</script>';		

		sBody=sBody +"<iframe id=\"myPictureFramer\" width=\"100%\" height=\"" + (((window.outerHeight/12)*10)-50) +"\" style=\"width:100%;background-color:ffffff\" ></iframe>";
		sBody=sBody+"</frameset>";
		sBody=sBody+"</div>";
		win.document.write(sBody);
		win.document.write("</body></html>");
		win.document.close();	
		}
//#########################################################################			
function RateThemSettings(){
	var  x0=document.getElementById('ctl00_lblScreenName').innerHTML;
	var txt1=GM_getValue('RLCPICRCNAME')
	if (!(txt1==x0)){
		var  x0a = new String;
		var  x0apic = new String;
		var win0=window.open('','','width=100,height=100');
		
		win0.location = "http://www.utherverse.com/net/blog/view_blog.aspx";
		alert("Got Current User ID which is required by RLC to view.")
		var x0b=win0.document.getElementById('ctl00_oCPH1_hlnkBack');
		var x0bpic=win0.document.getElementById('ctl00_oCPH1_imgProfilePic');
		x0a=x0b.href;
		x0b=x0a.valueOf();
		var CUID=x0b.substring(x0b.indexOf("=")+1).valueOf();
		var CUPIC=x0bpic.src;
		win0.close();		
		GM_setValue('RLCPICRCNAME',x0)
		GM_setValue('RLCPICRCUID',CUID)
		GM_setValue('RLCPICRCNAMEPIC',CUPIC)
	}else{
		CUID=GM_getValue('RLCPICRCUID');
		CUPIC=GM_getValue('RLCPICRCNAMEPIC');
	}
	var b=0;	
	var xHostSrc="http://www.utherverse.com/net/userMedia/";
	var xHost="http://www.utherverse.com/";
	var xRateAB="/net/ratingmgr.aspx?a=Rate&t=1&i=";
	var xRateBB="&r=10&k=";
	var xArr=new Array();
	var xArrRun=new Array();
	var xInc=-1;

	var  x1=document.getElementById("ID_MI_picArea");//('ctl00_oCPH1_tblAlbum');
	var vTags=x1.getElementsByTagName("table");
	var x1picframes=vTags[0].getElementsByClassName("MI_picFrame");//MI_picFrame;
	for (i=0;i<x1picframes.length;i++){
		if (x1picframes[i].getElementsByClassName("MI_emptyPicBox").length<1){
				var xPic=x1picframes[i]
				var xmatch = xPic.innerHTML;
				var xReplacementPre=xmatch.substring(0,xmatch.indexOf("<span")+5).valueOf();
				var xReplace=xmatch.substring(xmatch.indexOf("<span")+5,xmatch.indexOf("<img src")).valueOf();
				var xReplacementPost=xmatch.substring(xmatch.indexOf("<img src")).valueOf();
				var xGot=xmatch.substring(xmatch.indexOf("GotoMIViewPage(")+15,xmatch.indexOf(");\" style")).valueOf();
				var xReplacementPost1=xReplacementPost.substring(0,xReplacementPost.indexOf("</span>")).valueOf();
				var xReplacementPost2=xReplacementPost.substring(xReplacementPost.indexOf("</span>")).valueOf();
				if (!(xGot.match("&nbsp"))){
					var VPID = xGot.substring(xGot.indexOf("=")+1);
				}else{
					var VPID="";
				}
				var xmatchDec=xHost+xGot;
				var xReplacement="\""+ xHost+xRateAB+VPID+xRateBB+CUID+"\""
				if (!(VPID=="")){//we got a value
					xInc=++xInc;
					xPic.innerHTML=xReplacementPre+"><a href="+xReplacement+">"+xReplacementPost1+"</a>"+xReplacementPost2;
					xArrRun[xInc]=xReplacement;
					xArr[xInc]="<a href="+xReplacement+">"+(xInc+1)+"</a>";
					}//we got a value

		}
	}
	
	



			
	
	 if((xInc>-1)&&window.confirm("Step Thru")){
		winList(xArr,xArrRun);
	}
}		
///////////////////////////////
//*Drag N' Resize Textareas*//
/////////////////////////////
//*This  puts a little "+"-shaped resizer icon next to
//*every textarea; clicking and dragging that icon will resize its textarea.

function Resizer(sExtraSizeMe){
	var main = "ctl00_oCPH1_";
	//* Remove Annoyances *//
//	s = "#header, #footer, div.vert, div.alignL, span#ctl00_ctl00_cpHeader_Header1_topNav_Span6, div.saveButtons , input#"+main+"-btnSave, img#"+main+"-Image1, #topnav, #details_tabs, hr.separator {display:none;}\n";
//	s+= "body {font-family:Calibri, Arial; font-size:12px;}\n";
	
	//* Interests & Personality Page *//
	s+= "input#"+main+"txtQuote {font-family:Calibri, Arial; font-size:12px;width: 700px;}\n"; 
	s+= "input#"+main+"txtQuote:hover {font-family:Calibri, Arial; font-size:11px; width: 700px;}\n";
	s+= "textarea#"+main+"txtAboutMe {font-family:Calibri, Arial; font-size:12px; width: 700px; height: 600px;}\n";//
	s+= "textarea#"+main+"txtWhoILikeToMeet, #"+main+"txtLinks, #"+main+"txtInterests, #"+main+"txtWebsites, #"+main+"txtMusic, #"+main+"txtMovies, #"+main+"txtBooks {font-family:Calibri, Arial; font-size:12px; width: 700px; height: 100px;}\n";
	s+= "input#"+main+"btnSave {width:100px;height:25px;position:fixed;right:100px;top:5px;}\n";
	s+= "img#"+main+"Image1 {width:100px;height:25px;position:fixed;right:205px;top:5px;}\n";
	
	//* Blog Edit Page *//
//style="width: 430px; height: 220px;" hardcoded in HTML source likely to be the cause of the stopage	
	s+= "textarea#"+main+"txtBody {font-family:Calibri, Arial; font-size:12px; width: 700px; height: 800px;}\n";
	s+= "input#"+main+"btnAddMyBlog {width:100px;height:25px;position:fixed;right:100px;top:5px;}\n";
		
	//* Names Page *//
	
//	s+= "span#"+main+"editName_MySpaceNameLit, #"+main+"editName_MySpaceURlLit, #"+main+"editName_NameMsgLit {font-family:Calibri, Arial; font-size:13px; width: 500px;}\n";
//	s+= "input#"+main+"editName_DisplayNameTextBox, #"+main+"editName_FirstNameTextBox, #"+main+"editName_LastNameTextBox {font-family:Calibri, Arial; font-size:12px; width: 500px;}\n";
	
	//* Basic Information Page *//
	
//	s+= "input#"+main+"editBasicInfo_occupationTextBox, #"+main+"editBasicInfo_cityTextBox {font-family:Calibri, Arial; font-size:12px; width: 325px;}\n";
//	s+= "input#"+main+"editBasicInfo_postalCodeTextBox, select#ddMonth, #ddDay, #ddYear, #"+main+"editBasicInfo_GeoLocation1_ddlCountry, #"+main+"editBasicInfo_GeoLocation1_ddlRegion, #"+main+"editBasicInfo_ethnicityDropDownList, #"+main+"editBasicInfo_bodyTypeDropDownList, #"+main+"editBasicInfo_feetDropDownList, #"+main+"editBasicInfo_inchesDropDownList {font-family:Calibri, Arial; font-size:12px;}\n";
	
	//*  Background and Lifestyle *//
	
//	s+= "input#"+main+"editLifestyle_HometownText {font-family:Calibri, Arial; font-size:12px; width: 325px;}\n";
//	s+= "select#"+main+"editLifestyle_ReligionDropDown, #"+main+"editLifestyle_IncomeDropDown {font-family:Calibri, Arial; font-size:12px;}\n";
	
	//* Schools Page *//
	
//	s+= "input#"+main+"schoolEditor_schoolFinder_schoolNameTextBox {font-family:Calibri, Arial; font-size:12px; width: 325px;}\n";
//	s+= "select#"+main+"schoolEditor_schoolFinder_countryDropDownList, #"+main+"schoolEditor_schoolFinder_regionDropDownList {font-family:Calibri, Arial; font-size:12px;}\n";
	
	//* Companies Page *//
	
//	s+= "div.bgGrey {display:none;}\n";
//	s+= "input#"+main+"companyEditor_companyNameTextBox, #"+main+"companyEditor_cityTextBox, #"+main+"companyEditor_regionTextBox, #"+main+"companyEditor_titleTextBox, #"+main+"companyEditor_divisionTextBox, #"+main+"companyEditor_datesEmployedTextBox {font-family:Calibri, Arial; font-size:12px; width: 325px;}\n";
//	s+= "select#"+main+"companyEditor_countryDropDownList {font-family:Calibri, Arial; font-size:12px;}\n";
	
	//* Networking Page *//
	
//	s+= "textarea#"+main+"networkEditor_descriptionTextBox {font-family:Calibri, Arial; font-size:12px; width: 400px; height:150px;}\n";
//	s+= "select#"+main+"networkEditor_categoryDropDownList, #"+main+"networkEditor_skillDropDownList, #"+main+"networkEditor_roleDropDownList {font-family:Calibri, Arial; font-size:12px;}\n";
	
	 GM_addStyle(s);
	 
	var DEBUG = 1;
	function trace (level,msg) { if(DEBUG >= level) GM_log(msg); return; }
	
	if (
	 document.documentElement.tagName == "HTML"
	 && document.contentType == "text/html"
	 && document.body    // Basic sanity
	) {
	  trace(11, "Starting");
	  run();
	}
	
	function run () {
	  var them = document.getElementsByTagName("textarea");
	  var themInputs = document.getElementsByTagName("input");
	  if(!(them && them.length)) { trace(11, "No textareas."); return; }
	  inits();
	  for(var i = them.length - 1; i >= 0; i--) {
	    tweak_textarea(them[i]);
	  }

	  trace(5, them.length.toString() + " textareas");
	  
	  if(!(themInputs && themInputs.length)) { trace(11, "No Inputs."); return; }
	  for(var i = themInputs.length - 1; i >= 0; i--) {
	    tweak_input(themInputs[i]);
	  }	  
	  return;
	}
	
	//  - - - - - - - - -
	
	function get_pref (prefname, defaulty) {
	  var gotten = GM_getValue(prefname, null);
	  if(gotten == null) {
	    GM_setValue(prefname, defaulty);
	    return defaulty;
	  } else {
	    return gotten;
	  }
	}
	
	var Drag_increments, Min_Height, Min_Width, Max_Height, Max_Width;
	
	function inits () {
	  // Number of pixels that we grow by at a time:
	  Drag_increments = get_pref('drag_increment_size', 15);
	
	  // Constraints (in pixels) on draggable dimensions of textareas:
	  Min_Height = get_pref('min_height', 30);
	  Min_Width  = get_pref('min_width' , 30);
	  Max_Height = get_pref('max_height', 1400);
	  Max_Width  = get_pref('max_width' , 1400);
	  
	  return;
	}
	function tweak_input (t) {
		  if (t.id=="ctl00_oCPH1_txtTitle"){
			//alert(t.id+" : " + t.style.width +" : "  + t.style.height);
			//t.style=undefined;
		 	t.style.width="550px";
		  	t.style.height=null;
		}		
	}
	function tweak_textarea (t) {
	  var d   = t.ownerDocument;
	  var p   = t.parentNode;
	  var n   = t.nextSibling;
	  if (t.id=="ctl00_oCPH1_txtBody"){
		//alert(t.id+" : " + t.style.width +" : "  + t.style.height);
		//t.style=undefined;
	 	t.style.width="550px";
	  	t.style.height=null;
	}
	  var s  = getComputedStyle(t, "" );
	  var
	    oh = num(s.height),
	    ow = num(s.width ),
	    br = d.createElement('br');
	    button = d.createElement('img');
	
	  button.setAttribute('src','resource://gre/res/grabber.gif');
	  button.setAttribute('height',12);
	  button.setAttribute('width' ,12);
	  button.setAttribute('alt','grabby');
	
	  // don't wrap button
	  p.style.whiteSpace="nowrap";
	
	  // insert linebreak
	  p.insertBefore(br, t);
	  
	  // insert after textarea
	  if (n) p.insertBefore(button, n);
	  else p.appendChild(button);
	
	  button.title = "Click and drag me to change the textarea's size";
	
	  button.addEventListener('mousedown', function(event) {
	      // Yes, I think we really do need this as a closure here-- otherwise
	      // there's no (easy) way to work back from the event target to the textarea.
	      start_dragging( event, t, button );
	      event.preventDefault();
	      return;
	    },
	    true
	  );
	
	  if(ow && oh) {
	    t.style.height = oh.toString() + "px";
	    t.style.width  = ow.toString() + "px";
	  }
	
	  return;
	}
	
	var Orig_width, Orig_height, Cursor_start_x, Cursor_start_y;
	
	function start_dragging (event, textarea, button) {
	  Textarea = textarea;
	  Cursor_start_x = event.clientX;
	  Cursor_start_y = event.clientY;
	  var s = getComputedStyle(textarea, "" );
	  Orig_width   = num( s.width  );
	  Orig_height  = num( s.height );
	
	  trace(4, "Starting dimensions of textarea: h=" + s.height.toString() +
	    " by w=" + s.width.toString());
	  textarea.ownerDocument.addEventListener("mousemove", ev_drag_move, true);
	  textarea.ownerDocument.addEventListener("mouseup",   ev_drag_stop, true);
	
	  trace(5,"Starting dragging");
	  return;
	}
	
	function num (i) {
	  var m;
	  if(typeof(i) == "string") {
	    m = i.match( /(\d+)(\.\d+)*px/ );
	    // nota bene: yes, the computed style can be fractional, like "123.56px"!!
	    if(m) {
	      i = parseInt(m[1], 10);
	    } else {
	      trace(1, "Weird pseudonumerical value: \"" + i + "\"!");
	    }
	  } else if(typeof(i) == "number") {
	    // just fall thru
	  } else {
	    trace(1, "Weird nonnumerical value: \"" + i + "\"!");
	  }
	  //trace( typeof(i) + ": " + i.toString() );
	  return i;
	}
	
	
	function ev_drag_move (event) {
	  var
	   new_width  = event.clientX - Cursor_start_x + Orig_width ,
	   new_height = event.clientY - Cursor_start_y + Orig_height;
	
	  new_width  = px_between(Min_Width ,new_width , Max_Width,  Drag_increments);;
	  new_height = px_between(Min_Height,new_height, Max_Height, Drag_increments);;
	
	  trace(10, "Setting dimensions to h=" + new_height.toString() +
	  " w=" + new_width.toString() );
	
	  Textarea.style.width  = new_width;
	  Textarea.style.height = new_height;
	
	  event.preventDefault();
	  return;
	}
	
	function ev_drag_stop (event) {
	  // Stop capturing the mousemove and mouseup events.
	  document.removeEventListener("mousemove", ev_drag_move, true);
	  document.removeEventListener("mouseup",   ev_drag_stop, true);
	  event.preventDefault();
	  return;
	}
	
	function px_between (min, i, max, incr) {
	  if(incr)  i = Math.floor(i/incr) * incr;
	  return(
	    (
	   (i > max) ? max
	  :(i < min) ? min
	  : i
	    ).toString() + "px"
	  );
	}
	
}

	if (document.location.href.match("http://www.utherverse.com/net/profile/edit_personality.aspx")=="http://www.utherverse.com/net/profile/edit_personality.aspx"){
		Resizer("txtAboutMe");//"ctl00_oCPH1_txtAboutMe"
	}else if (document.location.href.match("http://www.utherverse.com/net/blog/blog.aspx")=="http://www.utherverse.com/net/blog/blog.aspx"){
		Resizer("txtBody");//"ctl00$oCPH1$txtBody" "ctl00_oCPH1_txtBody"
	}else if (document.location.href.match("http://www.utherverse.com/net/userMedia/MIShowPics.aspx")=="http://www.utherverse.com/net/userMedia/MIShowPics.aspx"){
		RateThemSettings();
		
	}

