// START COMPRESSED UPDATE CODE - http://userscripts.org/scripts/show/38788
function meta2object(c){var b={};for(var a;a=/^\/\/\s+@(\S+)\s+(.+)$/gm.exec(c);){if(!(a[1] in b)){b[a[1]]=[]}b[a[1]].push(a[2])}return b}function CheckForUpdate(){const a}CheckForUpdate.CallbackResponse={Error:-1,NoReminder:0,ForcedWaiting:1,Waiting:2,Unchanged:3,Changed:4};CheckForUpdate.changelog=function(oheader,nheader,source){return(oheader["cfu:changelog"]?eval(oheader["cfu:changelog"][0]+"(oheader, nheader, source)"):"")};CheckForUpdate.init=function(header,callback){if(typeof header=="xml"){header=meta2object(header)}if(!header["cfu:url"]||!(header["cfu:timestamp"]||header["cfu:version"])){alert("@cfu:url and @cfu:timestamp/@cfu:version is required.")}else{function update(header,manual,purl){var tint="1 week";var interval=eval((header["cfu:interval"]||tint).toString().replace(/week[s]?/,"* 7 days").replace(/day[s]?/g,"* 24 hours").replace(/hour[s]?/g,"* 60 minutes").replace(/minute[s]?/g,"* 60 seconds").replace(/second[s]?/g,"* 1000").replace(/[^\d*]+/g,""));var lastCheck=parseInt(GM_getValue("lastCheck-"+header.namespace+header.name,"0"),10);var currentDate=new Date().valueOf();var c=CheckForUpdate.CallbackResponse.Waiting;if(currentDate-lastCheck<120000){if(manual&&!callback){alert("You have to wait at least 2 minutes before checking for updates again.")}c=CheckForUpdate.CallbackResponse.ForcedWaiting}else{if((interval>0&&lastCheck+interval<currentDate)||manual){GM_setValue("lastCheck-"+header.namespace+header.name,""+currentDate);purl=parseInt(purl,10)||0;var urls=header["cfu:meta"]||header["cfu:url"]||[];c=CheckForUpdate.CallbackResponse.Error;if(purl<urls.length){var curl=urls[purl].replace("@cfu:id",header["cfu:id"]&&(header[header["cfu:id"][0]][0]||header["cfu:id"][0])||"");c=null;GM_log("Checking for updates... "+curl);GM_xmlhttpRequest({url:curl+(~curl.indexOf("?")?"&":"?")+"rand="+Math.random(),method:"get",headers:{"Cache-Control":"no-store, no-cache, must-revalidate",Pragma:"no-cache",Expires:"0"},onload:function(e){if(/^2/.test(e.status)){var h=meta2object(e.responseText);function compareVersion(newV,oldV){var n=("0."+(newV||"0")).split(".");var o=("0."+(oldV||"0")).split(".");for(var i=(Math.max(n.length,o.length))-1;i;--i){var x=parseInt(n[i],10)||0,y=parseInt(o[i],10)||0;if(x!=y){return[x-y,i]}}return 0}var ltv=[header["cfu:version"]&&(header[header["cfu:version"][0]][0]||header["cfu:version"][0]),header["cfu:timestamp"]&&(header[header["cfu:timestamp"][0]][0]||header["cfu:timestamp"][0])];var rtv=[h["cfu:version"]&&(h[h["cfu:version"][0]][0]||h["cfu:version"][0]),h["cfu:timestamp"]&&(h[h["cfu:timestamp"][0]]||h["cfu:timestamp"][0])];var v=[(ltv[0]&&ltv[1]&&rtv[0]&&rtv[1]?ltv[1]+" ("+ltv[0]+")":ltv[0]||ltv[1]),(rtv[0]&&rtv[1]&&ltv[0]&&ltv[1]?rtv[1]+" ("+rtv[0]+")":rtv[0]||rtv[1])];if((Date.parse(""+rtv[1])||parseInt(rtv[1],10))>(Date.parse(""+ltv[1])||parseInt(ltv[1],10))||compareVersion(""+rtv[0],""+ltv[0])[0]>0){if(!!callback){callback(CheckForUpdate.CallbackResponse.Changed,!!manual,header,h,e.responseText)}else{if(typeof(callback)!="boolean"){if(confirm("[ "+header.name+" ]\n\nCurrent version:\t"+v[0]+"\nLastest version:\t"+v[1]+"\n"+CheckForUpdate.changelog(header,h,e.responseText)+(header.name[0]!=h.name[0]||header.namespace[0]!=h.namespace[0]?"\nName and/or namespace has changed.\nYou should uninstall the current version manually.\n":"")+"\nInstall the lastest version now?")){GM_openInTab(header["cfu:url"][0].replace("@cfu:id",header["cfu:id"]&&(header[header["cfu:id"][0]][0]||header["cfu:id"][0])||""))}else{if(confirm("Would you like to be reminded tomorrow?")){GM_setValue("lastCheck-"+header.namespace+header.name,""+(currentDate-518400000))}else{alert((interval>0?"You will be reminded again in "+(header["cfu:interval"]||tint):"You won't be reminded again."))}}}}}else{if(!!callback){callback(CheckForUpdate.CallbackResponse.Unchanged,!!manual,header,h,e.responseText)}else{if(manual){alert("You are using the lastest version.\n\nInstalled version:\t"+v[0]+"\nPublic version:\t\t"+v[1])}}}}else{update(header,manual,++purl)}},onerror:function(e){update(header,manual,++purl)}})}else{GM_log("An error has occurred while checking for updates.")}}else{if(interval<=0){c=CheckForUpdate.CallbackResponse.NoReminder}}}if(c!==null&&!!callback){callback(c,!!manual,header)}}if(typeof(callback)!="boolean"){GM_registerMenuCommand("["+header.name+"] Check for Updates",function(){update(header,true)})}update(header,false)}return header};
// END COMPRESSED UPDATE CODE


// ==UserScript==
// @name           Neobux - Short Term Averages on Golden Graphs

// @namespace      http://www.neobux.com/
// @description    This will show your referrals' average clicks in the last 5/7/15 days just below your refs graph. It will be colour coded according to your slider bar settings.
// @version        1.0

// @include        https://www.neobux.com/refstat/?refu=*
// @include        https://www.neobux.com/?u=c&s=r*

// @include        http://www.neobux.com/refstat/?refu=*
// @include        http://www.neobux.com/?u=c&s=r*

// @attribution    kwah ( http://www.neobux.com/forum/?frmid=7&tpcid=60154 ; http://userscripts.org/scripts/show/49989 )
// @attribution    w35l3y - update script ( http://userscripts.org/scripts/review/38788 )
// @attribution    YUI Javascript Compressor 2.4.2 ( http://www.refresh-sf.com/yui/ )

// @license (CC)   Attribution-Noncommercial-Share Alike 2.0; http://creativecommons.org/licenses/by-nc-sa/2.0/

// @cfu:url        http://userscripts.org/scripts/source/49989.user.js
// @cfu:id         uso:script
// @cfu:version    uso:version
// @uso:script     499989
// @cfu:version    1.0
// @cfu:interval   1 day

// ==/UserScript==


/*
Updates/Changelog
  - 05/06/2009 - v1.0
    * Possibly buggy fix to make the script work on non-ssl pages (ie, http and https)
    * Possibly buggy addition of the auto-update script
    --> This release is to be considered as a beta release
*/




if(GM_getValue("FirstUse",1)==1){
GM_setValue("Time_Period_1",5); 
GM_setValue("Time_Period_2",7);
GM_setValue("Time_Period_3",15);
GM_setValue("FirstUse",0);

alert("Welcome and enjoy your use of this greasemonkey script =] \nIt is now completely setup and ready to use.\n\nIf you change your slider bar settings, you may need to refresh the page to notice any changes");

}

var CurrentUrl = document.location.href;

// CHECK WHICH PAGE IS BEING REQUESTED

var RegExp_RefGraph = /^http[s]?:\/\/www\.neobux\.com\/refstat\/\?refu\=.*/;
var RegExp_RentedRefPage = /^http[s]?:\/\/www\.neobux\.com\/\?u\=c\&s\=r.*/;

 var IsMatch = new Array();

IsMatch[0] = RegExp_RefGraph.test(CurrentUrl);
IsMatch[1] = RegExp_RentedRefPage.test(CurrentUrl);


  if(IsMatch[0]){
  // This code is run when a user is viewing a referral's graph
  // It checks which time periods have been set and displays both the total
  // number of clicks and also the average numbers of clicks during those days.


  var Period1 = GM_getValue("Time_Period_1",5); 
  var Period2 = GM_getValue("Time_Period_2",7);
  var Period3 = GM_getValue("Time_Period_3",15);


  var Total_Clicks = new Array();
  Total_Clicks[Period1] = 0;
  Total_Clicks[Period2] = 0;
  Total_Clicks[Period3] = 0;


  // The data for the graphs are contained within a <div> with the id="ch2Div"
  // The actual click data etc is contained in the flash variables ('flashvars')

  var Rental_Stats = document.getElementById('ch2Div');
  var vars = Rental_Stats.childNodes[0].getAttribute('flashvars');

  nvars=vars.split("<dataset seriesName");

  // nvars=nvars[0].split("<set value='"); // An array containing Dates of clicks
  nvars = nvars[1].split("<set value='"); // An array containing Actual clicks
  // nvars=nvars[2].split("<set value='"); // An array containing Credited clicks


  for(a=1;a<nvars.length;a++){
  // I don't understand why 8/11 exist there but I will be looking into it
    data = nvars[a].split("'");
    value = data[0];
    
    Total_Clicks[Period3]+=parseInt(value);
    
    if (a>8){
      Total_Clicks[Period2]+=parseInt(value);
    }
    if (a>10){
      Total_Clicks[Period1]+=parseInt(value);
    }
  }

  // Calculate the average number of clicks for each Time Period

  var Average_Clicks = new Array();

  Average_Clicks[Period1] = Total_Clicks[Period1]/Period1;
  Average_Clicks[Period2] = Total_Clicks[Period2]/Period2;
  Average_Clicks[Period3] = Total_Clicks[Period3]/Period3;


  // Set the colours that the sum/average clicks will be displayed in (below the graph)
  var Colours = new Array();
  Colours[0] = '#00BB00'; // 'Good' average (Green) / ROW colour = #66FF66
  Colours[1] = '#FF9900'; // 'Medium' average (Yellow) /  ROW colour = #FFDD00
  Colours[2] = '#FF3333'; // 'Low' average (Red) / ROW colour = #FF8888
  Colours[3] = '#000000'; // Default colour (Black)


  // Retrieve the 'Limit' values that will have been set/retrieved when the user first visits 
  // their referral listing page. These 'Limits' are set according to your slider bar settings.

  var Upper_Limit = GM_getValue('UpperLimit',2.2);
  var Lower_Limit = GM_getValue('LowerLimit',1.8);



  // Set the colours that each time period will be displayed in. 

  if(Average_Clicks[Period1]<Lower_Limit){
    Period1_Colour = Colours[2];
  } else if(Average_Clicks[Period1]>=Upper_Limit){
    Period1_Colour = Colours[0];
  } else if(Lower_Limit<= Average_Clicks[Period1] && Average_Clicks[Period1]<Upper_Limit){
    Period1_Colour = Colours[1];
  } else {
    Period1_Colour = Colours[3];
  }
  if(Average_Clicks[Period2]<Lower_Limit){
    Period2_Colour = Colours[2];
  } else if(Average_Clicks[Period2]>=Upper_Limit){
    Period2_Colour = Colours[0];
  } else if(Lower_Limit<= Average_Clicks[Period2] && Average_Clicks[Period2]<Upper_Limit){
    Period2_Colour = Colours[1];
  } else {
    Period2_Colour = Colours[3];
  }
  if(Average_Clicks[Period3]<Lower_Limit){
    Period3_Colour = Colours[2];
  } else if(Average_Clicks[Period3]>=Upper_Limit){
    Period3_Colour = Colours[0];
  } else if(Lower_Limit<= Average_Clicks[Period3] && Average_Clicks[Period3]<Upper_Limit){
    Period3_Colour = Colours[1];
  } else {
    Period3_Colour = Colours[3];
  }


  // Create the HTML for each time period and set the colouring.

  var HTML_Period1 = Period1 + 'days: [<b style="color:'+Period1_Colour+'">'+Total_Clicks[Period1]+'/'+Average_Clicks[Period1].toFixed(2)+'</b>]';
  var HTML_Period2 = Period2 + 'days: [<b style="color:'+Period2_Colour+'">'+Total_Clicks[Period2]+'/'+Average_Clicks[Period2].toFixed(2)+'</b>]';
  var HTML_Period3 = Period3 + 'days: [<b style="color:'+Period3_Colour+'">'+Total_Clicks[Period3]+'/'+Average_Clicks[Period3].toFixed(2)+'</b>]';


  // Concatenate it all together with some extra text to format it nicely

  Rental_Stats.innerHTML = Rental_Stats.innerHTML+"<span style='font-family:Verdana; font-size:8pt; margin-top:4px;'><br>Clicks - "+ HTML_Period3+" - "+HTML_Period2+" - "+HTML_Period1+"</span>";



} else if(IsMatch[1]){
  // This loads whenever the referral listing page is loaded / refreshed / resorted.
  // It fetches the slider bar settings and store them locally because they cannot 
  // be reached easily otherwise.



  // When Javascript is available, the settings are stored inside two hidden form fields.
  // Limits[1] = document.getElementById('l_ap2');
  // Limits[1] = document.getElementById('l_ap2');


  // Fortunately, the settings are also stored somewhere on the page that is accessible
  var Slider_innerHTML = document.getElementById('dateSlider');
  var MoreHTML = Slider_innerHTML.childNodes[0].innerHTML

  // Narrow down to exactly where they are stored:
  var RegExp_Narrowing = /toFixed\(1\)\=\=\[[0-9]\.[0-9],[0-9]\.[0-9]\]/;
  var x = MoreHTML.match(RegExp_Narrowing); // outputs "toFixed(1)==[1.8,2.2]" (minus the quotes) where 1.8 and 2.2 are your limits

  // Fetch the actual limits
  var RegExp_Limits = /[0-9]\.[0-9]/g;
  var Limits = x[0].match(RegExp_Limits);


  // Store the Upper and Lower limits accordingly (in the code above, the limits appear in order)
  GM_setValue('LowerLimit',Limits[0]);
  GM_setValue('UpperLimit',Limits[1]);

}
