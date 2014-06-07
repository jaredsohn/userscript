// Copyright (C) 2011-2012 by LOK-Soft Lars-Olof Krause http://lok-soft.net
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// ==UserScript==
// @name           GC - TB-Bulk-Discover
// @namespace      LOK-Soft.net/GC
// @description    This scripts helps to discover several TBs automatically
// @include        http://www.geocaching.com/track*
// @include        http://www.geocaching.com*
// @version        0.7
// ==/UserScript==


function GCTBBDrem(){
  GM_setValue('tbcodes', "");
  GM_setValue('tbwrongcodes', "");
  GM_setValue('tbtext', "");
  GM_setValue('logyear',"");
  GM_setValue('logmonth',"");
  GM_setValue('logday',"");
  GM_setValue('tblogjob', 0);
  GM_log("job stopped");
}

  var job = GM_getValue('tblogjob');
  var loc = String(document.location);
  
  function createLogPage(){
    GM_log("CreateLogPage");
    document.getElementsByTagName("html")[0].innerHTML = '';
    document.getElementsByTagName("head")[0].innerHTML = ''
      +'  <title>TB-LOG-Helper</title>'
      +'  <style type="text/css">'
      +'    *{margin:0;padding:0;}'
      +'    #control{position:absolute;height:100%;width: 220px;overflow:auto;background-color:grey;}'
      +'    #gc{position:absolute;left:220px;height:100%;width:800px;}'
      +'    #tbcodes{height: 300px;margin-left: 10px;margin-right: 10px;width: 160px;}'
      +'    #logtext{margin-left: 10px;width:180px;height:200px;}'
      +'    #go{position:relative;left:140px;top:10px;}'
      +'  </style>';
    document.getElementsByTagName("body")[0].innerHTML = ''     
      +'  <div id="control">'
      +'    <h1>TB-Bulk-Discover</h1>'
      +'    <lable for="tbcodes">TB-Codes (line-by-line)</lable>'
      +'    <textarea id="tbcodes" name="tbcodes"></textarea><br /><br />'
      +'    <span id="Date">'
      +'      <select id="Date_Year" name="Date_Year">'
      +'        <option value="2010">2010</option>'
      +'        <option value="2011">2011</option>'
      +'        <option value="2012">2012</option>'
      +'        <option value="2013">2013</option>'
      +'      </select>'
      +'      <select id="Date_Month" name="Date_Month"><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>'
      +'      <select id="Date_Day" name="Date_Day"><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select>'
      +'    </span><br /><br />'
      +'    <lable for="logtext">Logtext</lable>'
      +'    <textarea id="logtext" name="logtext"></textarea>'
      +'    <input type="button" id="go" value="log!" />'
      +'  </div>'
      +'  <iframe src="https://www.geocaching.com/login/" id="gc"></iframe>';    document.getElementsByTagName("head")[0].innerHTML = ''
      +'  <title>TB-LOG-Helper</title>'
      +'  <style type="text/css">'
      +'    *{margin:0;padding:0;}'
      +'    #control{position:absolute;height:100%;width: 220px;overflow:auto;background-color:grey;}'
      +'    #gc{position:absolute;left:220px;height:100%;width:800px;}'
      +'    #tbcodes{height: 300px;margin-left: 10px;margin-right: 10px;width: 160px;}'
      +'    #logtext{margin-left: 10px;width:180px;height:200px;}'
      +'    #go{position:relative;left:140px;top:10px;}'
      +'  </style>';
     document.getElementsByTagName("body")[0].innerHTML = ''     
      +'  <div id="control">'
      +'    <h1>TB-Bulk-Discover</h1>'
      +'    <lable for="tbcodes">TB-Codes (line-by-line)</lable>'
      +'    <textarea id="tbcodes" name="tbcodes"></textarea><br /><br />'
      +'    <span id="Date">'
      +'      <select id="Date_Year" name="Date_Year">'
      +'        <option value="2010">2010</option>'
      +'        <option value="2011">2011</option>'
      +'        <option value="2012">2012</option>'
      +'        <option value="2013">2013</option>'
      +'      </select>'
      +'      <select id="Date_Month" name="Date_Month"><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>'
      +'      <select id="Date_Day" name="Date_Day"><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select>'
      +'    </span><br /><br />'
      +'    <lable for="logtext">Logtext</lable>'
      +'    <textarea id="logtext" name="logtext"></textarea>'
      +'    <input type="button" id="go" value="log!" />'
      +'  </div>'
      +'  <iframe src="https://www.geocaching.com/login/" id="gc"></iframe>';
  
    GM_log("tblogpage");

    var d = new Date();
    document.getElementById('Date_Year').selectedIndex = (d.getFullYear()-2010);
    document.getElementById('Date_Month').selectedIndex = d.getMonth();
    document.getElementById("Date_Day").selectedIndex = (d.getDate()-1);

    var element = document.getElementById("go");
    if( element.addEventListener )
      element.addEventListener( 'click', processbatch, false );
    else if( element.attachEvent )
      element.attachEvent( 'onclick', processbatch );
    else
      document.onClick = processbatch;
    GM_log("eventlistener set");
}
  
  //register GM-Menu
  if(job != 0)GM_registerMenuCommand('GC TB-Bulk-Discover - Clear Job', GCTBBDrem);
  GM_registerMenuCommand('GC TB-Bulk-Discover - Open Logpage', createLogPage);

  if(loc.indexOf("geocaching.com/#tblogfin") != -1){ //LOG-Page Onsite
    GM_log("tblogfinpage onsite");
    document.getElementsByTagName("html")[0].innerHTML = '';
    document.getElementsByTagName("html")[0].innerHTML = '<html><head><title>TB-Bulk-Log Finished</title></head><body><h2>TB-Bulk-Log Finished</h2><br />Errors in following codes:<div id="codeerror"></div></body></html>';
    var tbwrongcodes = GM_getValue('tbwrongcodes').split(" ,");
    GM_log("tbwrongcodes "+ tbwrongcodes);
    var errorcodes = "<ul>";
    for(var i = 0;i < tbwrongcodes.length; i++){
      if(tbwrongcodes[i].length > 1)
        errorcodes += "<li>" + tbwrongcodes[i]+ "</li>";
    }
    errorcodes += "</ul>";
    var errdiv = document.getElementById("codeerror");
    errdiv.innerHTML = errorcodes;
    GCTBBDrem();
  }else if(job == 1){
    gcsite();
  }else if(loc.indexOf("my/default.aspx") != -1){
    GM_log("on profile site");
      var side = document.getElementById("ctl00_ContentBody_WidgetMiniProfile1_LoggedInPanel");
	  var header = document.createElement("h3");
	  header.setAttribute("class","WidgetHeader");
	  header.appendChild(document.createTextNode(" TB-Bulk-Discover"));
	
	  var div = document.createElement("div");
	  div.setAttribute("class","WidgetBody ProfileWidget");
	
	  var ul = document.createElement("ul");
	  
	  var asite = document.createElement("a");
	  if( asite.addEventListener )
        asite.addEventListener( 'click', createLogPage, false );
      else if( asite.attachEvent )
        asite.attachEvent( 'onclick', createLogPage );
      else
        asite.onClick = createLogPage;
	  asite.appendChild(document.createTextNode("Open TB-Bulk-Discover Page"));
	   
	  var lisite = document.createElement("li");
	  lisite.appendChild(asite);
	  ul.appendChild(lisite);
	  
	  var aupd = document.createElement("a");
	  aupd.appendChild(document.createTextNode("Check for Updates"));
	  if( aupd.addEventListener )
        aupd.addEventListener( 'click', function(){window.setTimeout(updateCheck(true), 100);}, false );
      else if( asite.attachEvent )
        aupd.attachEvent( 'onclick',function(){window.setTimeout(updateCheck(true), 100);} );
      else
        aupd.onClick = function(){window.setTimeout(updateCheck(true), 100);};
	  var liupd = document.createElement("li");
	  liupd.appendChild(aupd);
	  ul.appendChild(liupd);

	  div.appendChild(ul);
	  side.appendChild(header);
	  side.appendChild(div);
  }

function processbatch(){
  GM_log("processbatch");
  var tbcodes = document.getElementById("tbcodes").value;
  var logtext = document.getElementById("logtext").value;
  GM_log("codes "+tbcodes);
  GM_log("text "+logtext);

  var tbcodes = tbcodes.split("\n");
  tbcodes.push(" ");
  GM_log("codesarr "+tbcodes);
  if(tbcodes.length > 0 && logtext.length > 0){
    GM_log("codes/text present");
    GM_setValue('tbcodes', tbcodes.join(" ,"));
    GM_setValue('tbtext', logtext);
    GM_log("codes/text saved");
    GM_setValue('logyear',document.getElementById("Date_Year").value);
    GM_setValue('logmonth',document.getElementById("Date_Month").value);
    GM_setValue('logday',document.getElementById("Date_Day").value);
    GM_log("date saved");
    GM_setValue('tbwrongcodes',"  ,");
    GM_setValue('tblogjob', 1);
    document.getElementById('gc').src = "http://www.geocaching.com/track/details.aspx?tracker=" + tbcodes.shift(); 
  }

}


function gcsite(){
  GM_log("job!");
  
//Check if signed in
  if(document.getElementById('ctl00_divNotSignedIn')){
    GM_log("not logdin");
    GM_setValue('tblogjob', 0);
    alert("Please Login to use this service!");
    document.location = "http://geocaching.com/login"
    return 0;
  }

  if(loc.indexOf("track/details.aspx?tracker=") != -1){

    GM_log("tbpage");
    var matches = document.location.href.match(/tracker=(.*)/);
    if(matches){
      var trackcode = decodeURIComponent(matches[1]);
      if(GM_getValue('tbcodes').indexOf(trackcode + " ") != -1){
        GM_log("trackcode submitted");
        if(document.getElementById("ctl00_ContentBody_LogLink")){
          GM_log("trackcode valide");
          document.location = document.getElementById("ctl00_ContentBody_LogLink").href + "&tbcode=" + trackcode;
        }else{
          wrongtbcode(trackcode);
        }
      }else{
        GM_log("trackcode not valid");
        alert("trackcode not valid - strange error");
        return 0;
      }
    }else{
      GM_setValue('tblogjob', 0);
      alert("Error TB-Code not found");
      return 0;
    }

  }else if(loc.indexOf("track/log.aspx?wid=") != -1){

    if(!document.getElementById('ctl00_ContentBody_LogBookPanel1_LogImage')){
      GM_log("logpage");
      
      var trcode = "";
      var matches = document.location.href.match(/&tbcode=(.*)/);
      if(matches){
        trcode = decodeURIComponent(matches[1]);
        if(GM_getValue('tbcodes').indexOf(trcode + " ") == -1){
          GM_log("trackcode not valid");
          return 0;
        }
      }else{
        GM_setValue('tblogjob', 0);
        alert("Error TB-Code not found");
        return 0;
      }


      var changeelement = document.getElementById('ctl00_ContentBody_LogBookPanel1_ddLogType');
      var childs = changeelement.childNodes;
      for(var i=0; i<childs.length; i++){
        if(childs[i].value == 48){
          childs[i].setAttribute("selected","selected");
        }
      }
      GM_log("type selected");

      GM_log("logyear" + GM_getValue('logyear'));
      
      changeelement = document.getElementById('ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Year');
      childs = changeelement.childNodes;
      for(var i=0; i<childs.length; i++){
        GM_log("logyear - " + childs[i].value);
        if(childs[i].value == GM_getValue('logyear')){
          GM_log("selected");
          childs[i].setAttribute("selected","selected");
        }
      }

      GM_log("logmonth" + GM_getValue('logmonth'));

      changeelement = document.getElementById('ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Month');
      childs = changeelement.childNodes;
      for(var i=0; i<childs.length; i++){
        GM_log("logmonth - " + childs[i].value);
        if(childs[i].value == GM_getValue('logmonth')){
          GM_log("selected");
          childs[i].setAttribute("selected","selected");
        }
      }
      changeelement = document.getElementById('ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Day');
      childs = changeelement.childNodes;
      for(var i=0; i<childs.length; i++){
        GM_log("logday - " + childs[i].value);
        if(childs[i].value == GM_getValue('logday')){
          GM_log("selected");
          childs[i].setAttribute("selected","selected");
        }
      }

      GM_log("date selected");

      delete(childs);
      delete(changeelement);

      document.getElementById('ctl00_ContentBody_LogBookPanel1_tbCode').value = trcode;
      GM_log("tbcode entered");

      document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo').value = GM_getValue('tbtext');
      GM_log("logtext entered");
      GM_log("will log "+ trcode + " now");
      simulateClick(document.getElementById('ctl00_ContentBody_LogBookPanel1_LogButton'));
  GM_log("after Simulate Click");

      return 0;
    }else{
      GM_log("logready");
      var sitecode = "";
      var matches = document.location.href.match(/&tbcode=(.*)/);
      if(matches){
        sitecode = decodeURIComponent(matches[1]);
      }else{
        GM_setValue('tblogjob', 0);
        alert("Error TB-Code not found");
        return 0;
      }
      GM_log("sitecode "+ sitecode);

      var tbcodes = GM_getValue('tbcodes').split(" ,");
      GM_log("tbcodes "+ tbcodes);

      for(var i=0;i<tbcodes.length;i++){
        GM_log("comp-"+tbcodes[i]+"-"+sitecode+"-");
        if(tbcodes[i] == sitecode){
          tbcodes.splice(i,1);
          GM_log("splice"+ i);
          i--;
        }
      }

      GM_log("tbcodes afer remove"+ tbcodes);
      GM_setValue('tbcodes', tbcodes.join(" ,"));

      if(tbcodes.length <= 1){
        GM_setValue('tblogjob', 0);
        document.location = "http://geocaching.com/#tblogfin";
        alert("job finished");
      }else{
         GM_log("logged "+ sitecode);
         document.location = "http://www.geocaching.com/track/details.aspx?tracker=" + tbcodes.shift(); 
      }
    }
  }
}


function wrongtbcode(trackcode){
  GM_log("tbwrongcode "+ trackcode);
  var tbwrongcodes = GM_getValue('tbwrongcodes')
  GM_log("tbwrongcodes "+ tbwrongcodes);
  GM_setValue('tbwrongcodes', tbwrongcodes + " ," + trackcode);
  
  var tbcodes = GM_getValue('tbcodes').split(" ,");
  GM_log("tbcodes "+ tbcodes);

  for(var i=0;i<tbcodes.length;i++){
    GM_log("comp-"+tbcodes[i]+"-"+trackcode+"-");
    if(tbcodes[i] == trackcode){
      tbcodes.splice(i,1);
      GM_log("splice"+ i);
      i--;
    }
  }

  GM_log("tbcodes afer remove"+ tbcodes);
  GM_setValue('tbcodes', tbcodes.join(" ,"));

  if(tbcodes.length <= 1){
    GM_setValue('tblogjob', 0);
    document.location = "http://geocaching.com/#tblogfin";
    alert("job finished");
  }else{
    GM_log("error "+ trackcode);
    document.location = "http://www.geocaching.com/track/details.aspx?tracker=" + tbcodes.shift(); 
  }

}


function simulateClick(button) {
  GM_log("Simulate Click");
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  button.dispatchEvent(evt);
  GM_log("Simulate Click2");
  return 0;
}


//Update Check by Jarett (http://userscripts.org/scripts/show/20145)
var SUC_script_num = 106442; // Change this to the number given to the script by userscripts.org (check the address bar)

 GM_registerMenuCommand('GC TB-Bulk-Discover - Check for Updates', function(){updateCheck(true);});


try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}

	updateCheck(false);
}
catch(err)
{}
