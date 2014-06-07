// ==UserScript==
// @name        FB Mafia Gift 中文化
// @description 接受黑手黨戰爭禮物領取 在 FB
// @namespace   Mw 黑幫
// @include     http://www.facebook.com/reqs/*
// @exclude     http://apps.facebook.com/*
// @exclude     http://www.facebook.com/extern/*
// @exclude     http://www.facebook.com/connect/*
// @exclude     http://www.facebook.com/plugins/*
// @exclude     http://www.facebook.com/login.php*
// @exclude     http://facebook.mafiawars.com/mwfb/*
// @version     JGrabAllGifts v1.20(2011/08/11)
// @author       
// @contributor  
// ==/UserScript==
/*   JGrabAllGifts - Sept 2009 - Josh Miller - http://www.facebook.com/Dudge669

v1.18 - Minor change to FB reqs page pane
v1.17 - Facebook changed reqs page layout a little bit + minor changes
v1.16 - FIXED: Post call to Facebook to tell it that you picked up the gift was not being generated correctly.
        Mod/fix: Changed button detection code to find buttons regardless of Facebook page language.
v1.15 - Facebook changed requests page layout 2010-09-21 - Major rewrites

 TODO:
 Fix "from" names/links - FB changed, now uses names as well as profile.php?id= syntax
 Check functionality in Mozilla Flock and Opera browsers
 For complete revision history and comments, please view: http://joshmiller.com/JGrabAllGiftsHistory.txt
*/

javascript:(function(){
if(navigator.appName=='Microsoft Internet Explorer'){
  alert('You are using Microsoft Internet Explorer - this bookmarklet will not work. You should give Google Chrome or Firefox a try. Download and installation instructions are on my website at http://joshmiller.com/marklets/');}
if(window.location.href.indexOf('reqs.php')==-1 || $('pagelet_ego_pane')==null) {
  if(confirm('你似乎不正確的頁面上使用這個腳本。請按OK進入你的Facebook禮物領取頁面。（你必須重新按一下這個腳本書籤以便執行')) {
    window.location.href='http://www.facebook.com/reqs.php'; return;
  } else return;
}
if(jxpath("//ul[@class='uiList requests']").snapshotLength>0) {
	alert("This account still has the old style gifts requests page layout.\nPlease SEND ME A NOTE IN FACEBOOK to let me know that there are still accounts out there using the old style layout. The old version of this script that works with the old layout is linked on my website under the section that says -Old Versions-. You want the link that says JGAG118. It will work with your page."); return;
}

jWin=new Array();
jWinNum=0, jNumGifts=0, jMaxWin=null, jWinRecyc=0;
var version="JGrabAllGifts v1.20",
  testonly=0,
  note="&lt;Click here to help me out. Thanks! ",
  jdiv=$('jdiv'),
  winopts="width=750,height=500,toolbar=0,directories=0,menubar=0,scrollbars=1,resizable=1",
  content, wait, show, applist, otherapps, max,thisgnum=0;
content=$('pagelet_ego_pane');
//if(!content) content=document.getElementsByClassName('sidebar_item requests')[0];
//if(!content) content=document.getElementsByClassName('PYMK_Reqs_Sidebar')[0];
//if(!content) content=$('netego_organic');
applist=readCookie('jmwtgag_applist','app_10979261223 (Mafia Wars)\n');
applist=applist.replace(/\\n/g,"\n"); applist=applist.replace(/app_/g,""); //Just app #s now
skip=readCookie('jmwtgag_skip','boxer\\nscissors\\n');
skip=skip.replace(/\\n/g,"\n");
removefr=readCookie('jmwtgag_removefr','checked');
bypasspt=readCookie('jmwtgag_bypasspt','');
fftabs=readCookie('jmwtgag_fftabs','');
igpages=readCookie('jmwtgag_igpages','');
iggroups=readCookie('jmwtgag_iggroups','');
igevents=readCookie('jmwtgag_igevents','');
evtopt=readCookie('jgagevtopt',0);
igmafinv=readCookie('jmwtgag_igmafinv','');
igcnt=readCookie('jgagigcnt',0);
gftcnt=readCookie('jgaggftcnt',0);
jMaxWin=readCookie('jgagmaxw',5);
acceptfr=readCookie('jgagafr','');
acceptsug=readCookie('jgagasug','');
igfr=""; // Not saving this option
skipyn=readCookie('jmwtgag_skipyn','');
wait=readCookie('jmwtgag_wait',8);
max=readCookie('jmwtgag_max','');
maxc=readCookie('jgagmaxc','100');
frlist=readCookie('jgagflist','Mafia Wars');
jwarn2=readCookie('jwarn2',0);
if(max=='') {
  if(navigator.userAgent.indexOf("Firefox")!=-1) {
    max=1;fftabs="checked";
    alert('感謝您試用 JGrabAllGifts。你似乎是使用Firefox。GOOGLE瀏覽器是使用這個腳本最好的瀏覽器 但Firefox的，您需要或者禁用彈出窗口阻止程序或是一定要允許“www.facebook.com”這個腳本的工作。試著接受一個禮物作為測試，確保您看到一個彈出窗口的地方，檢查彈出窗口，以確保您收到您的禮物才做一個以上的禮物，謝謝！');
  } else {
    max=25;
  }
}
if(!jdiv) {
  jdiv=document.createElement('div');
  jdiv.setAttribute('id','jdiv'); jdiv.setAttribute('style','clear:both');
  //if(content) content.appendChild(jdiv);
  if(content) content.parentNode.insertBefore(jdiv,content);
}
if(!content) {alert('Error finding sidebar!');return;}
// Greys #D0D0D0 #D8D8D8 #E8E8E8
// Purple  #FF4EFF #FF7AFF #FFA6FF
jdiv.innerHTML=
  '<hr style="background-color:#bbd;color:#bbd;border:solid 1px #bbd;margin:0 5px 4px"/>'+
  '<div class="sidebar_item_header clearfix" style="background-color:#FF66FF">'+
    '<h2 class="withoption">&nbsp;'+version+'</h2>'+
    '<div class="option" style="color:#3B59BB background-color:#FF7AFF">'+
      '&nbsp;<a href="http://joshmiller.com/JMWTools.html" target="_blank">Miller Marklets</a> '+note+'</div>'+
    '<form name="jz"><input type="hidden" name="proceed" id="proceed" value="1"></form>'+
  '</div>'+
  '<div class="sidebar_item_body clearfix" id="jmain" style="background-color:#FFA6FF;position:relative;overflow:hidden;padding:2px;">'+
    '<form name="jform" onsubmit="return false">'+
    '<table width=240px>'+
      '<tr>'+
        '<td width=150px>Max number of gifts to grab:</td>'+
        '<td><input type="text" name="max" value="'+max+'" size="2"/></td>'+
      '</tr><tr>'+
        '<td>Seconds between:</td>'+
        '<td><input type="text" name="wait" value="'+wait+'" size="1"/> <a href="#" title="You really should not set this lower than 5-8 (depending on game server speed) or you may not get all of your gifts. You have to give the pop-up windows time to fully load or the app you are accepting gifts for won\'t be notified that you are collecting your gifts." onclick="return false;"><img src="http://joshmiller.com/images/QMk.png"></a></td>'+
      '</tr><tr>'+
        '<td colspan="2">Apps to accept gifts for:</td>'+
      '</tr><tr>'+
        '<td colspan="2"><textarea name="applist" id="applist" rows="4" cols="39">'+applist+'</textarea>'+
        '<br/><center><span id="scan" class="inputbutton" style="padding:1px 7px 3px 7px;font-size:.9em;cursor:pointer;" title="Game you play not listed above? Click the \'Scan\' button to scan for your app id numbers">Scan page for apps I use</span></center></td>'+
      '</tr><tr>'+
        '<td colspan="2"><div id="otherappsarea" style="display:none"><textarea name="otherapps" id="otherapps" rows="3" cols="36" style="color:yellow;background-color:red">'+otherapps+'</textarea></div></td>'+
      '</tr><tr>'+
        '<td><span id="showJMWOptions" class="inputbutton" style="padding:3px 7px 3px 7px;font-size:.8em;cursor:pointer;">[options]</span> <b>&lt;&lt; NEW</b></td>'+
        '<td><input type="button" name="start" id="start" value="Start" class="inputbutton" style="cursor:pointer;"/></td>'+
      '</tr><tr>'+
        '<td colspan="2"><div style="display:none" id="optionsarea"><hr><b>NOTE:</b> Options saved when you click [Start]<br/>'+
        'Max pop-up windows/tabs: <input type="text" name="maxwin" value="'+jMaxWin+'" size="1"/> <a href="#" title="Used to internally hard code this option to 5 windows but had requests to make it changeable. If you set this and the \'Max # gifts to collect\' option to the same number you can use a short wait time but you might have some gift pages that don\'t load because you may be going too quickly. You should leave this set to 5 if you don\'t know what you are doing." onclick="return false;"><img src="http://joshmiller.com/images/QMk.png"></a><br/>'+
        '<input type="checkbox" name="removefr" id="removefr" '+removefr+'/>Hide friend requests area?<br/>'+
        '<input type="checkbox" name="iggroups" id="iggroups" '+iggroups+'/>Ignore group requests?<br/>'+
        '<input type="checkbox" name="igpages" id="igpages" '+igpages+'/>Ignore page requests?<br/>'+
        '<input type="checkbox" name="igevents" id="igevents" '+igevents+'/>Process event reqs:'+
        '<select name="evtopt" id="evtopt" title="How do you want to respond to event requests?">'+
          '<option selected>reject</option><option>accept</option><option>maybe</option>'+
        '</select><br/>'+
        '<input type="checkbox" name="igmafinv" id="igmafinv" '+igmafinv+'/>Ignore mafia invites? <a href="#" title="Why ignore? Because you don\'t need to accept mafia invites from here. It\'s much easier to just \'accept all\' requests from within the game." onclick="return false;"><img src="http://joshmiller.com/images/QMk.png"></a> <br/>'+
        '<input type="checkbox" name="acceptfr" id="acceptfr" '+acceptfr+'/>Accept friend invites?<br/>'+
          '<table id="fropts" style="display:none;"><tr><td width=10px></td><td>'+
//		        '<input type="checkbox" name="acceptsug" id="acceptsug" '+acceptsug+'/>Accept friend suggestions?<br/>'+
		        'Max friend confirms:<input type="text" name="maxc" value="'+maxc+'" size="2"/><br/>'+
  		        'Add to friend list:'+
		          '<span id="testFrList" class="inputbutton" style="position:absolute;right:50px;padding:1px 6px 1px 6px;font-size:.8em;cursor:pointer;">[test]</span>'+
		        '<input type="text" name="frlist" value="'+frlist+'" size="26"/>'+
          '</td></tr></table>'+
        '<input type="checkbox" name="fftabs" id="fftabs" '+fftabs+'/>Alternate pop-up code (Tabs in Firefox)?<br/>'+
        '<input type="checkbox" name="bypasspt" id="bypasspt" '+bypasspt+'/>Bypass pop-up check?<br/>'+
        '<input type="checkbox" name="skipyn" id="skipyn" '+skipyn+'/>Skip gifts that contain:<br/>'+
        '<textarea name="skip" id="skip" rows="2" style="display:none; width:90%">'+skip+'</textarea><br/>'+
        '<input type="checkbox" name="igfr" id="igfr" '+igfr+'/>Ignore friend requests? <a href="#" title="Don\'t want any more Facebook friends? THIS OPTION WILL CLICK THE IGNORE BUTTON on all friend requests. NOTE: This option does not save between sessions." onclick="return false;"><img src="http://joshmiller.com/images/QMk.png"></a> <br/>'+
        '</td></tr>'+
      '<tr><td><hr></td></tr>'+
      '</tr>'+
      '<tr>'+
        '<td colspan="2">Total gifts accepted: '+gftcnt+'<br/>Annoying junk ignored: '+igcnt+'</td>'+
      '</tr>'+
      '</div></td></tr>'+
    '</table>'+
    '</form>'+
  '</div>'+
  '<div style="background-color:#33EE99;padding:6px;">'+
    '<b>Has my script saved you time?</b> If you appreciate my work and want to help out, please SPREAD THE WORD! Tell your friends about JGAG. Bookmark and visit often my<br/><a href="http://joshmiller.com/JMWTools.html#donate" target="_blank">webpage<img src="http://en.wikipedia.org/skins-1.5/monobook/external.png"/></a> and/or my <a href="http://joshmiller.com/JSponsors.html" target="_blank">sponsors<img src="http://en.wikipedia.org/skins-1.5/monobook/external.png"/></a> page.<br/><center><b>Thank you!</b></center>'+
    '<hr>Please add some of my supporters to your friends list. They\'re great and would love to make new friends. (Links will open in new windows)'+
    '<div id="jda">'+
    '</div>'+
    '<center>Tell them Josh sent you!<br/>'+
    '<div class="connect_top" style="width:90%;align:center;padding:15px;"><a href="http://www.facebook.com/MillerMarklets" target="_blank"><img src="http://photos-b.ak.fbcdn.net/hphotos-ak-snc3/hs192.snc3/19955_283368091424_250237391424_4933501_3282145_s.jpg" alt="Miller Marklets"><br/>Join my FAN page!</a></div>'+
    '</center>'+
  '</div>';
window.scroll(0,0);
showHideFriends();
showHideSkip();
showHideAcceptFr();
document.jform.evtopt.selectedIndex=evtopt;
loadJDa();
if(jwarn2<2) if(document.jform.applist.value.indexOf("10979261223")>-1) {createCookie('jwarn2',++jwarn2); alert('NOTE: If you have any "Send so-n-so a mafia wars gift" or "MYSTERY BAG" or "CLAIM REWARD" gift requests, you should go through your page here and accept at least 5 of them manually so that you can get your 5 return gifts for the day or so that you can send respect to your mafia. JGAG processes these "Send" buttons but you obviously won\'t have the ability to get your return gifts or click things in these windows to send respect if you let my script automate them all. For now, you need to accept mystery bags manually if you want to click in the gift acceptance windows to send respect. You can accept 5 gifts at a time and go into each window and click what you need to before closing the popups and then repeat.');}
$("testFrList").onclick=function(){
  frlist=document.jform.frlist.value; createCookie("jgagflist",frlist); setFrList();}
$("removefr").onclick=showHideFriends;
$("skipyn").onclick=showHideSkip;
$("acceptfr").onclick=showHideAcceptFr;
$("igfr").onclick=function(){
	if(prompt("This option REMOVES (clicks IGNORE) all friend requests from your requests page. Facebook only shows the most recent 200 friend requests so if you have more, you will have to repeat.\n\nAre you sure you wish to REMOVE all friend requests from your requests page?\nType DELETE (uppercase) in the box below to continue...")!="DELETE") $("igfr").checked="";
}
$("showJMWOptions").onclick=showJMWOptions;
$("scan").onclick=function(e){
  if($("scan").innerHTML.substring(0,4)=="Scan") {
    // App names (text of A tag): //div[@class='UIImageBlock_Content UIImageBlock_ICON_Content']/span/a
	  //xpath = "//span[contains(@id,'_label') and not(starts-with(@id,'friend_')) and contains(.,'You have') and not(contains(.,' group invitation')) and not(contains(.,' event invitation')) and not(contains(.,' Page suggestion')) and not(contains(.,' no more'))]";
	  //xpath="//div[@id='content']//div[@class='mbl'][//h3[@class='uiHeaderTitle'][following::ul/li[1]/form/input[@id='status_div_id']]]";
	  doc=jxpath("//ul[@class='uiList']/li/div[2]");
	  doc2=jxpath("//ul[@class='uiList']/li/div[2]/div/div/a");
	  otherapps=''; appcount=doc.snapshotLength;
	  if(appcount!=doc2.snapshotLength) {alert("Error grabbing app list. Facebook changed something?"); return;}
	  for(i=0;i<appcount;i++){
	    try {
	      aid=doc.snapshotItem(i).id;
	      aid=aid.match(/confirm_(\d+)/)[1];
	      aht=doc2.snapshotItem(i).innerHTML;
	      aht=aht.match(/>([^<]*)</)[1];
			} catch(err) {}
	    if(aid==null) {continue; }
	    if(otherapps.indexOf(aid)>-1) {appcount--;continue;}
      otherapps+=aid+' ('+aht+')\n';
	  }
	  if(appcount>0) {
	  	$("otherappsarea").style.display="inline";
	    $("otherapps").innerHTML=otherapps;
	    $("scan").innerHTML="^^^ Grab all apps ^^^";
	    $("scan").title="Click here to put all apps/games on this page into the 'apps to accept gifts for' box above.";
	    if(document.jform.applist.value.substring(document.jform.applist.value.length-1)!='\n')
	      document.jform.applist.value+="\n";
	    alert(appcount+" app(s) found. Copy and paste the app ids you want to grab gifts for from the red textbox into the 'Apps to accept gifts for' box above it or just click the 'Grab all apps' button.");
	    document.jform.applist.scrollTop=document.jform.applist.scrollHeight; // Scroll applist to bottom
	  } else {
	    alert("No apps found.");
	  }
  } else { //Now the scan button is the Grab all apps button
    applist=otherapps; document.jform.applist.value=applist;
    $("scan").style.display="none";
    $("otherapps").style.display="none";
  }
}
$("start").onclick=function(e){
  applist=document.jform.applist.value.replace(/^\s+/,"").replace(/[\n\r]+/g,"\\n");
  createCookie("jmwtgag_applist",applist);
  wait=document.jform.wait.value;
  max=document.jform.max.value; createCookie("jmwtgag_max" ,max);
  jMaxWin=document.jform.maxwin.value; createCookie('jgagmaxw',jMaxWin);
  if((parseInt(wait)<7) && (parseInt(max)>parseInt(jMaxWin))) if(confirm('NOTE:  Because the pop-up windows get reused, you may not receive all of your gifts (and Zynga or whatever company makes your app is more likely to detect the fact that you\'re automating things) if you set your wait time too low.  Press OK to run with a safer wait time of 7 or Cancel to run with your requested wait time of '+wait+'.')) wait=7;
  createCookie("jmwtgag_wait",wait);
  removefr=document.jform.removefr.checked?"checked":""; createCookie("jmwtgag_removefr",removefr);
  fftabs=document.jform.fftabs.checked?"checked":""; createCookie("jmwtgag_fftabs",fftabs);
  bypasspt=document.jform.bypasspt.checked?"checked":""; createCookie("jmwtgag_bypasspt",bypasspt);
  igpages=document.jform.igpages.checked?"checked":""; createCookie("jmwtgag_igpages",igpages);
  iggroups=document.jform.iggroups.checked?"checked":""; createCookie("jmwtgag_iggroups",iggroups);
  igevents=document.jform.igevents.checked?"checked":""; createCookie("jmwtgag_igevents",igevents);
  evtopt=document.jform.evtopt.value; createCookie("jgagevtopt",document.jform.evtopt.selectedIndex);
  igmafinv=document.jform.igmafinv.checked?"checked":""; createCookie("jmwtgag_igmafinv",igmafinv);
  igfr=document.jform.igfr.checked?"checked":""; // Not saving this option
  skipyn=document.jform.skipyn.checked?"checked":""; createCookie("jmwtgag_skipyn",skipyn);
  skip=document.jform.skip.value.replace(/[\n\r]+/g,"\\n"); createCookie("jmwtgag_skip",skip);
  acceptfr=document.jform.acceptfr.checked?"checked":""; createCookie('jgagafr',acceptfr);
  //acceptsug=document.jform.acceptsug.checked?"checked":""; createCookie('jgagasug',acceptsug);
  maxc=document.jform.maxc.value; createCookie("jgagmaxc",maxc);
  frlist=document.jform.frlist.value; createCookie("jgagflist",frlist);

  $("jmain").innerHTML="";
  if(acceptfr!=""&&maxc>0)
    if(i=doAcceptFr()) return;
	acceptFrDone(); // Rest of script (acceptFrDone) called after friend requests are done from doAcceptFr
}

function acceptFrDone(){
  if(iggroups!="") if(i=ignorestuff("group_invite")) log(i+' group invites ignored');
  if(igpages!="") if(i=ignorestuff("fbpage_fan")) log(i+' page invites ignored');
  if(igevents!="") if(i=procevents()) log(i+' events ignored');
  if(igmafinv!="") if(i=ignoremafinvites()) log(i+' mafia invites ignored');
  if(igfr!="") if(i=ignorefriends()) log(i+' friend requests ignored');
  if(fftabs!="") winopts="";
  appsxpath="//div[@class='UIImageBlock clearfix mbl pbs appRequestGroup'][";
  for(i=0; i<applist.split("\\n").length; i++) {
    if(m=/^.*?(\d+)/.exec(applist.split("\\n")[i])) {
      if(i>0) appsxpath+=" or ";
      appsxpath+="contains(@id,'confirm_"+m[1]+"')";
    }
  }
  appsxpath+="]//li/form[input]";
  //appsxpath+="]//ul[@class='uiList pts requests']";
  //jforms=jxpath(appsxpath+"/div[@class='clearfix mtm']//input");
  jforms=jxpath(appsxpath); // "/.//form[input]"
  jfaction="http://www.facebook.com/ajax/reqs.php" //jforms.snapshotItem(0).action;
  $("jmain").innerHTML+="Accepting Gifts..."+
    "<a style='background:url(http://joshmiller.com/images/RedX.png) no-repeat;width:16px;height:17px;float:right;position:absolute;right:0px;top:0;' href='#' title='STOP' onclick='document.jz.proceed.value=0;return false;'> </a>"+
    "<a style='background:url(http://joshmiller.com/images/RedX.png) no-repeat;width:16px;height:17px;float:right;position:absolute;right:0;bottom:0' href='#' title='STOP' onclick='document.jz.proceed.value=0;return false;'> </a>";
  setTimeout(getnextgift,500); // windows launched funny just calling it for some reason, so short timeout for first iteration
}

function getnextgift() {
  var gotone=false;
  while(!gotone&&jforms.snapshotItem(thisgnum)!=null&&jNumGifts<max&&document.jz.proceed.value==1) {
	  var thisgift=jforms.snapshotItem(thisgnum);
	  var jfinputs=jxpath(".//input",thisgift); // //div[@class='clearfix mtm']//input
	  var skipthis=0,jreq='',jgift='',jfrom='',jparms=''
    for(i=0;i<jfinputs.snapshotLength;i++) {
      var ji=jfinputs.snapshotItem(i);
      if(ji.type=='hidden') jparms+="&"+ji.name+"="+ji.value;
      if(ji.type=='submit' && (ji.name.match(/^actions\[http/i)!=null)) {
        jreq=/actions\[([^\]]+)\]/.exec(ji.name)[1];
      }
    }
    if(jreq=='') skipthis=1;
    else {
      //var tih=jxpath(".//div[@class='pts requestBody']/span[@class='fb_protected_wrapper']",thisgift);
      var tih=jxpath(".//span[@class='fb_protected_wrapper']",thisgift);
      if(tih==null) {
        tih=thisgift.innerHTML.toString();
      } else {
        tih=tih.snapshotItem(0).innerHTML.toString();
      }
      if(new RegExp(/neighbor|invited you/i).test(tih) && !(new RegExp(/Hey, neighbor/i).test(tih))) jgift='Neighbor invite';
      else {
      	try{
          jgift=/(?:Here[' i]+s|Have|sent you|Bust open|I need|I could use|could really use|by sending|gift:)\s?(?:an?|are|some|the)?\s?(.*?)\s?(?:\.|!|for your|for my|you can use|to use|to help|as a thank|to use|that)/.exec(tih)[1];
        }catch(e){}
      	try{
          if(jgift=='') jgift=/gift of (.*?) in /.exec(tih)[1];
        }catch(e){}
      }
      jgift=jgift.replace('!','');
      jgift=jgift.trim();
      if(jgift=='') jgift='Gift';
      if(skipyn) {
        for(i=0; i<skip.split("\\n").length; i++) {
          var thisskip=skip.split("\\n")[i].toLowerCase().trim();
          if(thisskip=="") continue;
          if(jgift=='Gift') {
            if(tih.toLowerCase().indexOf(thisskip)>-1) {log('Skipping: '+thisskip); skipthis=1;}
          } else {
            if(jgift.toLowerCase().indexOf(thisskip)>-1) {log('Skipping: '+thisskip); skipthis=1;}
          }
        }
      }
    }
    if(skipthis!=1) {
      createCookie("jgaggftcnt",++gftcnt);
      var fbfr=jxpath(".//a[contains(@href,'profile.php?id=')][text()]",thisgift);
      var frhref='',frname='',fbid='';
      if(fbfr.snapshotLength>0) {
      	try{
      		fbfr=fbfr.snapshotItem(0); fbid=fbfr.href.match(/\d+/);
      		frhref=fbfr.href;frname=fbfr.innerHTML;
      	} catch(e){log('Error getting friend profile link\nhr:'+frhref+'\nnm:'+frname)}
      }
      jfrom=" from <a href='"+frhref+"' target='_blank'>"+frname+"</a>";
      log("Grabbing gift: "+jgift);
      if(thisgift.innerHTML.indexOf('Mafia Wars')>0) {
        jfrom+=" (<a target='_blank' href='http://apps.facebook.com/inthemafia/profile.php?id={%22user%22:%22"+fbid+"%22}' title='Open MW profile in new window'>MW Profile</a>)";
      }
      thisgift.innerHTML='Accepting <b>'+jgift+'</b>'+jfrom+' in new window/tab... (<a href="'+jreq+'" target="_blank" title="If your pop-up windows don\'t show up, you can click here to open the gift">GiftUrl<img src="http://en.wikipedia.org/skins-1.5/monobook/external.png"/></a>)';
      gotone=true;
  		if(testonly) break;
      if(loadNewWin(jreq)==0) {document.jz.proceed.value=0;break;}
      if(document.jz.proceed.value==1) jNumGifts++;
      jparms=jparms.substring(1);//remove first &
      jPost(jfaction,jparms);
    }
    thisgnum++;
  } //while loop
  if((jforms.snapshotItem(thisgnum)==null)||(jNumGifts>=max)||(document.jz.proceed.value!=1)) {
    document.jz.proceed.value=0; // clearTimeout(timer);
    log("JGrabAllGifts done. "+jNumGifts+" gift"+(jNumGifts==1?"":"s")+" grabbed.");
		log("Total gifts accepted: "+gftcnt+"<br/>Annoying junk ignored: "+igcnt);
		if(jNumGifts>0)
		  setTimeout(function(){log("<a href='#' onclick='for(w=0;w<(jNumGifts>jMaxWin?jMaxWin:jNumGifts);w++){jWin[w].close();} return false;'>Click here to close pop-ups</a><br/> (Be sure they're done loading first!)<br/><br/><center><b><a href='http://joshmiller.com/JMWTools.html#donate' target='_blank'>Donate? :)</a></b></center>");},5000);
  } else {
    setTimeout(getnextgift,wait*1000);
  }
} // getnextgift

String.prototype.trim=function(){
  return this.replace(/^\s*|\s*$/g,"");
}

// 'click' for evt to click a link, etc  fireEvent(document.getElementById('linkid'),'click');
function fireEvent(fireOnObj,evtText){
  if(document.createEvent){
    var evObj=document.createEvent('MouseEvents');
    evObj.initEvent(evtText,true,false); // true, true
    fireOnObj.dispatchEvent(evObj);
  } else if(document.createEventObject){
    fireOnObj.fireEvent('on'+evtText);
  }
}

function loadNewWin(url){
  if(jWinRecyc>0) jWin[jWinNum].close();
  jWin[jWinNum]=null;
  jWin[jWinNum]=window.open(url,"jWin"+jWinNum,winopts);
  if(bypasspt=='') if(!jWin[jWinNum]) {document.jz.proceed.value=2;alert('Pop-up blocked! This script will not work properly if your browser blocks pop-ups from www.facebook.com. Click the -URL- link where your gift invite used to be to claim your gift, fix your pop-up blocker and then try again.');return(0);}
  if(++jWinNum>=jMaxWin){ jWinNum=0; jWinRecyc=1;}
}

function doAcceptFr() {
  var fri=0;
  //var afrxp="//div[starts-with(@id,'friend_connect_')]//input[@type='submit' and @value='Confirm']";
  var afrxp="//ul[@class='uiList pbm']//div//form//input[@type='submit' and @value='Confirm']";
  if(!acceptsug=="") afrxp="//div[starts-with(@id,'friend_connect_') or starts-with(@id,'friend_suggestion_')]//input[@type='submit' and (@value='Confirm' or @name='actions[accept]')]";
  afrreq=jxpath(afrxp);
  if(afrreq.snapshotLength==0) return false;
  if(!setFrList()) {log("<hr>");return false;}
  log('Confirming friends (max:'+maxc+')...');
  var frtimer=setInterval(function(){
    if((afrreq.snapshotItem(fri)==null)||(fri>=maxc)){
      clearInterval(frtimer);
      log("Done confirming new friends.<br/>"+fri+" friend request"+(fri==1?"":"s")+" confirmed.<hr>");
      acceptFrDone();
    }
    else {
      afrreq.snapshotItem(fri).click();
    }
    fri++;
  },1000);
  return true; // Finish normally, stop script. Script will resume with acceptFrDone() above after fr reqs confirmed
}

function setFrList() {
  alert("The set friends list function of JGAG is not currently working. Please check back to my fan page for updates."); return true;
  if((frlist=frlist.trim())=="") return true; //No error, just don't set list if blank
  var friendlist,frlistfound=false;
  var lreq=jxpath("//span[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'add to list') or contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),' selected list')]");
  var frlistnum=lreq.snapshotLength*(frlist.split('|').length);
  if(lreq.snapshotLength>0){
    log("Setting "+lreq.snapshotLength+" friend lists:<br/>"+frlist);
    frlist2=frlist.replace(/\|/g,"$\|");frlist2=frlist2.replace(/\-/g,"\\-");frlist2=frlist2+"$";frlist2=frlist2.replace(/\$\$+/g,"$");
    frlistRegEx=new RegExp(frlist2,'i');
    // These next two for loops and/or the xpath needs to be simplified.
    // Lots of repetition here as each 'click' in the first loop exposes more labels for the second loop
    for(var i=0;i<lreq.snapshotLength;i++){
      fireEvent(lreq.snapshotItem(i),'click'); //load/expose all friend lists
    }
    friendlist=jxpath("//a[@class='UISelectList_Label']");
    if(friendlist.snapshotLength>0){
      //alert('frlnm:'+frlistnum+' snl:'+friendlist.snapshotLength);
      for(var j=0;j<friendlist.snapshotLength;j++) { // j<frlistnum
        jthislist=friendlist.snapshotItem(j);
        if(frlistRegEx.test(jthislist.innerHTML)){
          fireEvent(jthislist,'click');
          frlistfound=true;
          //break;
        }
      }
      if(!frlistfound) {
        if(confirm("Warning: You have no unchecked friends list that matches '"+frlist+"'.\nCreate the list first and retry. Press OK to skip friend confirmation process.\nPress Cancel to go ahead and confirm new friends without adding to a friends list.")){
          log("Skipping friend confirmation process because no friend list matches '"+frlist+"'.");
          return false;
        }
      }
    } else {
      if(confirm("Warning: You have no existing friends lists. This means you can't easily filter your friends into different categories. It is a good idea to have a 'Mafia' friend list to add Mafia Wars, etc people to.\nCreate a friend list and retry. Press OK to skip friend confirmation process.\nPress Cancel to go ahead and confirm new friends without adding to a friends list.\n\n*IF YOU CLICKED TEST* You may be getting this message because all friend lists are already set. Just press Cancel below to continue adding friends.")){
        log("No friend lists - Skipping friend confirmation process.");
        return false;
      }
    }
  } else {
    log("Warning: 'Add to List' dropdown buttons not found. Maybe you already selected a friend list for all new friends?");
  }
  return true;
}

function showHideFriends() {
  //xpath = "//div[@id='friend_suggestion' or @id='friend_connect']";
  xpath="//ul[@class='uiList pbm']"; // "//ul[@class='uiList mbl pbm']";
  doc=jxpath(xpath);
  for(i=0;i<doc.snapshotLength;i++){
    doc.snapshotItem(i).style.display=document.jform.removefr.checked?"none":"inline";
  }
  xpath="//div[@id='friend_suggestion' or @class='fbRequestList mbl']";
  doc=jxpath(xpath);
  for(i=0;i<doc.snapshotLength;i++){
    doc.snapshotItem(i).style.display=document.jform.removefr.checked?"none":"inline";
  }
}

function showHideAcceptFr(){
  $("fropts").style.display=document.jform.acceptfr.checked?"inline":"none";
}

function showHideSkip() {
  $("skip").style.display=document.jform.skipyn.checked?"inline":"none";
}

function showJMWOptions() {
  $("showJMWOptions").innerHTML=($("showJMWOptions").innerHTML=="[options]")?"[close options]":"[options]";
  $("optionsarea").style.display=$("optionsarea").style.display=="none"?"inline":"none";
  return false;
}

function createCookie(cknm,val) {
  var ex=new Date();ex.setDate(ex.getDate()+30);
  document.cookie=cknm+"="+val+";expires="+ex.toGMTString()+";path=/";
}

function readCookie(cknm,def) {
  var c,cret,e=cknm+"=",ca=document.cookie.split(';');
  for(var i=0;i<ca.length;i++){
    c=ca[i].replace(/^\s+/,'');
    if(c.indexOf(e)==0){cret=c.substring(e.length);break;}
  }
  if(cret==null) cret=(def==undefined)?null:def;
  return cret;
}

function log(line) {
  var log_p=document.createElement('p');
  log_p.innerHTML=line;
  $("jmain").appendChild(log_p);
}

function jxpath(query,node) {
  return document.evaluate(query,(node===undefined?document:node),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}

function procevents() {
  var xpath = "//div[substring(@id,1,12)='event_invite']//input[contains(@name,'"+evtopt+"')]";
  var doc=jxpath(xpath);
  for(i=0;i<doc.snapshotLength;i++){
    fireEvent(doc.snapshotItem(i),'click');
  }
  igcnt=parseInt(igcnt)+parseInt(doc.snapshotLength);
  createCookie("jgagigcnt",igcnt);
  return(doc.snapshotLength);
}

function ignorestuff(type) {
  var xpath = "//div[substring(@id,1,"+type.length+")='"+type+"']//input[contains(@name,'reject')]";
  var doc=jxpath(xpath);
  for(i=0;i<doc.snapshotLength;i++){
    fireEvent(doc.snapshotItem(i),'click');
  }
  igcnt=parseInt(igcnt)+parseInt(doc.snapshotLength);
  createCookie("jgagigcnt",igcnt);
  return(doc.snapshotLength);
}

function ignoremafinvites(){
  if(confirm("Because of the recent changes Facebook and Zynga have made, mafia invites show up along with your gift requests and I don't yet know how the ignore mafia invites function will work. Press OK to use at own risk.")) {
  } else { return; }
  xpath = "//div[contains(@id,'confirm_10979261223_')]//input[contains(@name,'next_controller=recruit')]/following-sibling::input[@value='Ignore']";
  doc=jxpath(xpath);
  for(var i=0;i<doc.snapshotLength;i++){
    fireEvent(doc.snapshotItem(i),'click');
  }
  igcnt=parseInt(igcnt)+parseInt(doc.snapshotLength);
  createCookie("jgagigcnt",igcnt);
  return(doc.snapshotLength);}

function ignorefriends(){
  xpath = "//div[@id='friend_connect']//input[@value='Ignore']";
  doc=jxpath(xpath);
  for(var i=0;i<doc.snapshotLength;i++){
    fireEvent(doc.snapshotItem(i),'click');
  }
  igcnt+=parseInt(doc.snapshotLength);
  createCookie("jgagigcnt",igcnt);
  return(doc.snapshotLength);}
 
function loadJDa(){
  // <IFRAME ELEMENT>.contentWindow.document.body.innerHTML
  //cross-domain auto frame sizing:
  //http://geekswithblogs.net/rashid/archive/2007/01/13/103518.aspx
  $("jda").innerHTML='<iframe src="http://joshmiller.com/JAd.php?rnd='+Math.random()+'" width="100%" height="420px" frameborder="0"></iframe>';
  $("jda").innerHTML+='<hr><center><a href="" id="jdabtn">Click here to see more great supporters!</a></center>';
  $("jdabtn").onclick=function(e){
    $("jda").innerHTML='<iframe src="http://joshmiller.com/JAd.php?jall&rnd='+Math.random()+'" width="100%" height="1200px" frameborder="0"></iframe>';
    return false;
  }
}
 ////////// 暫時移除廣告部分////////// ////////// ////////// ////////// ////////// ////////// ////////// ////////// ////////// 
function getAjaxReqObj(){
  try {req=new XMLHttpRequest();}
  catch(err){
    try {req=new ActiveXObject("Msxml2.XMLHTTP");}
    catch(err){
      try {req=new ActiveXObject("Microsoft.XMLHTTP");}
      catch(err){req=false;}
    }
  }
return req;
}

function jPost(url,postStr,onResp) {
  var req=getAjaxReqObj();
  req.open("POST",url,true);
  //req.onreadystatechange = onResp;
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //req.setRequestHeader("Content-length", postStr.length);
  //req.setRequestHeader("Connection", "close");
  req.send(postStr);
}

// end bookmarklet
})();