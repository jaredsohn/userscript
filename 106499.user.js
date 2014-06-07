//
//  (C) Copyright 2011-2012 Luis Cabral.
//
// ==UserScript==
// @name        GC Profile Stats Builder
// @description Generates a profile with statistics that you can past into your profile
// @include http://www.geocaching.com/*
// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @version 0.74
// @require http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @require http://userscripts.org/scripts/source/50018.user.js
// ==/UserScript==


/*

 CHANGE LOG

 --- version 0.74
 * Added the ability to display stats regardless of the date format selected on geocaching.com.
 * Added a prefs dialogue to allow the user to select the data format expected by
the script.
NOte: All credits on this version go go to Cryo99

 --- version 0.73
 * Fix region map to appears
 * Fix a lot of typos (Thanks to Cryo99)
 * Fix some icons not showing

 --- version 0.72
 * fix us states being represented as countries both in the map (not showing) and the achievments table (Thanks to Cryo99)
 * now counts "Attended" logs as well
 * clean up commented code
 * verify if multiple founds of the same cache
 * achievements images full url allow you not to copy you profile into a page outside geocaching
 * spell check
 * clean up source

 --- version 0.71
 * Added one new challenge ('Freedom is greater than fear', You have until today to achieve this. You got to go find something in Oslo)
 * fix the Jquery in the page
 * restrict stats by found (if you want to keep your big number then don't upgrade :) )
 * fix the alpha chalenge Q letter

 --- version 0.7
 * Added Achievements
 * Enabled the Statists buider from all over the geocaching pages
   website allowing to generate the page at anywhere in the geocaching site
 * More code optimization
 * placed some headers for each part
 * HTML block have been separated so it is easier to reorder then (or delete)
 * Fixed image button for Chrome

 --- version 0.62
 3rd day, major changes namelly
 * Added an side widget button to....
 * Generate the profile statistics page and show preview on click of button
 * Preview pagea now floats over the page
 * Preview page hides back on button click
 * Added Alpha challenges for countries and cities
 * Moved the copy & paste area onto the top for easier access
 * Fixed bug emtpy names of cache
 * better error handling and a few refactoring
 * Fix bug with parsing leading zero strings into months

 --- version 0.51
 * fixed bug with a early div close

 -- version 0.5
 * Added the change log :)
 * Fixed images inheriting gc classes that srink all images within table cells
 * Added function check for updates (thanks to http://userscripts.org/scripts/review/20145)
 * Fix earthcache icon (and any non numeric icon)
 * A bit of code clean up
 * Added a title on the alpha challenge

 --- version 0.4
 * Added a cache types pie graph
 * Added a table with cache types
 * Added odd/even table rows

 --- version 0.3b
 * monthly and accumulated graph,
 * monthly table

 --- version 0.2b
 * added a complete list of iso3166 countries

 --- version 0.1  first version
 * world map graph
 * countries tables
 ---
*/


var version= "0.74";
var SUC_script_num = 106499;

// Configuration dialogue.
var configStyle = <><![CDATA[
 .config_var {text-align: center; padding-top: 5px;}
 .field_label {padding-left: 5px;}
 .reset {display: none;}
 #GM_config_Current_var {padding-top: 15px;}
 #GM_config_field_Current {display: none;}
 #currentFmt {font-weight: normal; color: red;}
]]></>.toString();

// Date formats available on geocaching.com.
var dateFormats = ['yyyy-mm-dd', 'yyyy/mm/dd', 'mm/dd/yyyy', 'dd/mm/yyyy', 'dd/mmm/yyyy', 'mmm/dd/yyyy', 'dd mmm yy'];
var prefDate = GM_getValue("GCS_date_format");
// Default to mm/dd/yyyy if the pref is not yet set.
var dateFormat = prefDate ? prefDate : 2;

GM_config.init('GC Profile Stats Builder',
 /* Fields object */
 {
       'DateFormat':
       {
     'section': ['Date Format Setting', 'Set the date format to match that set in your account preferences.'],
               'label': 'Date Format', // Appears next to field
       'type': 'select', // A drop-down select type
       'options': [dateFormats[0], dateFormats[1], dateFormats[2], dateFormats[3], dateFormats[4], dateFormats[5], dateFormats[6]], // List of possible options
       'default': 'mm/dd/yyyy'
       },
       'Current':
       {
               'label': 'Current Format: <span id="currentFmt">' + dateFormats[dateFormat] + '</span>',
               'type': 'text',
               'default': ''
       }
 },
 configStyle,
 {
   open: function() {
     GM_config.addBorder(); // add a fancy border
     GM_config.resizeFrame('400px','230px'); // resize the config window
     GM_config.center();
   },
   save: function() {
     GM_setValue('GCS_date_format', GM_config.get('DateFormat'));
     location.reload();
   } // reload the page when configuration was changed
 }
);

GM_registerMenuCommand("GC Profile Stats Builder", function() {
 GM_config.open()
}, 'p');

// First run, no pref. set, prompt.
if(!prefDate){
 GM_config.open();
}


function parseHTML(data){
 var rows=data.split("<tr class");
 var guids=[];
 for(var i=1; i<rows.length; i++){
   var row = rows[i].split("<td>");
   row.shift();
   // LOG ACTION (found/log/...)
   try{
     var log = logicon[row[LOG].match(/([^\/\"]+).gif/)[1]];
      stats[LOG][log] = stats[LOG][log] ? 1 : stats[LOG][log]+1;
      if (log != 'Found' && log != 'Attended') continue;

      // verify this log has not been  revisited
      var guid = row[NAME].match(/guid=([\w-]+)/)[1];
      if(typeof(guids[guid])=='undefined') continue;
      guids[guid] = true;

   }catch(e){}
   try{//DATE
     var date;
     switch(dateFormat){
       case '0':   // yyyy-mm-dd
         date = row[DATE].match(/(\d+-\d+-\d+)/)[1];
         break;
       case '1':   // yyyy/mm/dd
       case '2':   // mm/dd/yyyy
       case '3':   // dd/mm/yyyy
         date = row[DATE].match(/(\d+\/\d+\/\d+)/)[1];
         break;
       case '4':   // dd/mmm/yyyy
         date = row[DATE].match(/(\d\d\/\w\w\w\/\d\d\d\d)/)[1];
         break;
       case '5':   // mmm/dd/yyyy
         date = row[DATE].match(/(\w\w\w\/\d\d\/\d\d\d\d)/)[1];
         break;
       case '6':   // dd mmm yy
         date = row[DATE].match(/(\d\d \w\w\w \d\d)/)[1];
         break;
     }
     stats[DATE][date] = stats[DATE][date] ? stats[DATE][date] + 1 : 1;
   }catch(e){}
   try{ //TYPE
     var type_img =  row[TYPE].match(/wpttypes[^\"]+.gif/);
     var type = row[TYPE].match(/title=\"([^\"]+)/)[1];
     stats[TYPE][type] = stats[TYPE][type] ? stats[TYPE][type] +1 : 1;
     stats[IMG][type] = type_img;
   }catch(e){}
   try{//NAME
     var name = row[TYPE].match(/>([^ \<]+[^\<]+)</)[1];
     stats[NAME][caches]= name;
   }catch(e){}
   try{//LOCATION (region, country)
     var c = row[COUNTRY].substring(0, row[COUNTRY].indexOf("</td>"));
     var region = c.replace(/^ |\&nbsp\;|\n|\t/g,' ').replace(/^\s+|\s+$/g,'');
     var country = c.substring(row[COUNTRY].indexOf(", ")+2).replace(/^ |\&nbsp\;|\n|\t/g,' ').replace(/^\s+|\s+$/g,'');
     // Fix for US States, that are placed in the countries should be
     if(usStates.indexOf(country) != -1){
       // US states are listed without a country, so the code above pulls the state name as the country name.
       // In that case, set the country manually.
       region = country;
       country = 'United States';
     }

     stats[COUNTRY][country] = stats[COUNTRY][country] ? stats[COUNTRY][country] + 1 : 1;
     stats[REGION][region]  = stats[REGION][region] ? stats[REGION][region] + 1 : 1;
   }catch(e){}

   // special medals
   if(region == 'Oslo, Norway'){
     var d = new Date(date);
     var d2 = new Date('7/22/2011');
     var d3 = new Date('7/29/2011');
     if(d>=d2 && d<=d3){
       top['oslo220711'] = true;
     }
   }
   caches++;
 }

 top[TOTAL_CACHES]=caches;
 parsed=true;
}

function drawRegionsMap(){
 var link = "http://chart.apis.google.com/chart?chf=bg,s,EAF7FE&chs=600x300&cht=map&chtm=world";
 var chld ='';
 var chd ='';
 var chm ='';
 var marker='f';
 var dbg='';
 var i=0;
 var textdata = '<tr style="background-color:#D8D8D8"><th>Country</th><th>#</th></tr>';
 var locations=[];
 for (i in stats[COUNTRY]) {locations.push({v: i, c: stats[COUNTRY][i]});}
 locations.sort(function (x, y) {return y.c - x.c;});

 for(var i in locations){
   var key = locations[i].v;
   var val = locations[i].c;
   var label = marker+ + val+",000000,0,"+i+",9";
   var odd = i%2 ? "style='background-color:#D8D8D8'":'';
   textdata +="<tr "+odd+"><td style='white-space: nowrap'>"+key+"("+country2iso3166[key]+")</td><td>"+val+"</td></tr>"
   if(chd ==''){
     chld=country2iso3166[key];
     chd=val;
     chm=label;
   }else{
     chld+='|'+country2iso3166[key];
     chd+=','+val;
     chm+='|'+label;
   }
  i++;
 }
 link+= "&chld="+chld +"&chd=t:"+chd+"&chm="+chm;
 html[REGIONM]='<h3>Region Map</h3><table><tr><td style="vertical-align:top"><div><img src="'+link+'"></div></td><td style="vertical-align:top"><table>'+textdata+'</table></td></table>';
}

function drawDates(){
 today(); // needed for dates
 var dates = [];
 var first_year = year ;
 top[MONTH] =0;
 top[DAY] =0;
 top[YEAR] =0;
 var color_class = ['ccccff', 'ccffff', 'ccffcc', '66cc33'];
 var chd='';

 // Get date format.
 var m, y;
 var splitChar = '/';
 switch(dateFormat){
   case '0':   // yyyy-mm-dd
     m = 1;
     y = 0;
     splitChar = '-';
     break;
   case '1':   // yyyy/mm/dd
     m = 1;
     y = 0;
     break;
   case '3':   // dd/mm/yyyy
     m = 1;
     y = 2;
     break;
   case '4':   // dd/mmm/yyyy
     m = 1;
     y = 2;
     break;
   case '5':   // mmm/dd/yyyy
     m = 0;
     y = 2;
     break;
   case '6':   // dd mmm yy
     m = 1;
     y = 2;
     splitChar = ' ';
     break;
   default:    // mm/dd/yyyy
     m = 0;
     y = 2;
     break;
 }

 var c=0;
 for( var i in stats[DATE]){
   var v = stats[DATE][i];

   if(top[DAY]<v) top[DAY]=v;

   var d = i.split (splitChar);
   // Convert 3 char month abbreviations to numbers.
   if(dateFormat >= 4){
     // TODO: We probably need to localize this.
     d[m] = months.indexOf(d[m]);
     // Change 2-digit years to 4 digits.
     if(dateFormat == 6){
       d[y] = parseInt(d[y], 10) + 2000;
     }
   }
   d[m] = parseInt(d[m],10);
   dates[d[y]] = dates[d[y]] ? dates[d[y]] +v :v;
   var my =d[m]+'.'+d[y]; // temp var for month.year
   dates[my] = dates[my] ? dates[my] +v :v;

   if(first_year > d[y]) first_year = d[y];
   if(dates[my] > top[MONTH]) top[MONTH] = dates[my];
   if(dates[d[y]] > top[YEAR]) top[YEAR] = dates[d[y]];
 }

 var chxl='0:';
 var chm='';
 var chd_sum=0;
 var t="<br><center><b>Monthly Progress</b></center><br>";
 var table="<table><tr><th>Year</th>";
 for(var j=1; j<=12; j++){ table+= "<th>"+ months[j]+"</th>"}
 table+="<th>Total</th></tr>";

 for (var i =first_year; i<= year; i++ ){
   table += "<tr><th>"+i+"</th>";
   for(var j = 1; j<=12; j++){
     var v = dates[j+'.'+i] ? dates[j+'.'+i]:'0';
     var cl = parseInt(v/top[MONTH] * (color_class.length-1));
     cl = v==0 ? 'cccccc' : color_class[cl];
     table+= "<td style='background-color:#"+cl+"'>"+v+"</td>";
     //skip graph input until start of progress / until today
     if(v==0 && chd=='') continue;
     if(i == year && j > month) continue;
     chd += (chd=='' ? '': ',' ) + parseInt(v/top[MONTH]*100);
     if(v>0) chd_sum += v;
     chm += (chm=='' ? '': ',' ) + (chd_sum);
     chxl += '|' + (j==1? i: months[j].charAt(0));
   }
   table+= "<th>"+(dates[i] ? dates[i] :'0') + "</th></tr>";
 }

 table+="</table>";
 var img_months = "https://chart.googleapis.com/chart?cht=bvs&chbh=a&chs=600x150&chxp=0&chxt=x,y&chd=t:"+chd+"&chxl="+chxl + "&chxr=1,0,"+top[MONTH];
 var img_sum =  'https://chart.googleapis.com/chart?cht=lc&chbh=a&chs=600x150&chxp=0&chxt=x,y&chm=B,76A4FB,0,0,0&chd=t:'+chm +"&chxl="+chxl + "&chxr=1,0,"+chd_sum;

 t+=table+"<div><img src='"+img_months+"'></div><br>";
 t+="<center><b>Accumulated Progress</b></center><br><img src='"+img_sum+"'>";
 html[DATES]="<h3> Monthly Progress</h3>"+t;
}

function drawTypes(){
 var chd ='';
 var chl ='';
 var table= "<table>";
 var c = 0;
 for (var i in stats[TYPE]){
   var odd = c%2 ? "style='background-color:#D8D8D8'":'';
   var v = stats[TYPE][i];

   chl += chd=='' ? escape(i)  : '|'+escape(i);
   chd += chd=='' ? v : ','+v;
   table +="<tr "+odd+"><td><img src="+image_site+stats[IMG][i]+"><td>"+i+"<td>"+v+"</tr>";
   c++;
 }
 table+="</table>";

 var img = "https://chart.googleapis.com/chart?cht=p&chco=0000FF&chs=400x200&chl="+chl+"&chd=t:"+chd;
 html[TYPES]="<table><tr><td><img src="+img+"></td><td>"+table+"</td></tr></table>";
}

function drawAlphaChallenge(){
 var challenge= []; var challenge_region= [];var challenge_country= [];
 challenge_country['X']='<font color="#FF0000"><b>Know Any?<b></font>';
 var alphanum="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');

 top[NAME]=0;
 top[REGION]=0;
 top[COUNTRY]=0;

 var t="<br><h3>Alphanumeric Challenge</h3>";
 t+="<table><tr><th>Alpha</th><th>Latest Cache</th><th><span title='District/State/Region' >LatestRegion</span></th><th>Latest Country</th></tr>";
 for (var i in stats[NAME]){
   var a = stats[NAME][i] ? stats[NAME][i].charAt(0).toUpperCase():'';
   if ( ( alphanum.indexOf(a) >= 0 ) && !challenge[a]) {
     challenge[a] = stats[NAME][i];
     top[NAME]++;
   }
 }

 for (var i in stats[REGION]){
   var a =i ? i.charAt(0).toUpperCase() :'';
   if(!challenge_region[a]) {
     challenge_region[a] = i;
     top[REGION]++;

   }
 }

 for (var i in stats[COUNTRY]){
   var a =i ? i.charAt(0).toUpperCase() :'';
   if(!challenge_country[a]) {
     challenge_country[a] = i;
     top[COUNTRY]++;
   }
 }

 for(var a in alphanum){
   var odd = a%2 ? "style='background-color:#D8D8D8'":'';
   var k = alphanum[a];
   var v = challenge[k] ? "000099'>" + challenge[k] : "CC3366'> - ";
   var v2 = challenge_region[k] ? "000099'>" + challenge_region[k] : "CC3366'> " + (isNaN(k)? ' - ' : '' );
   var v3 = challenge_country[k] ? "000099'>" + challenge_country[k] : "CC3366'> " + (isNaN(k)? '-' : '' );
   t+="<tr "+odd+"><th>"+k+"</th><td style='color:#"+v+"</td><td style='color:#"+v2+"</td><td style='color:#"+v3+"</td></tr>";
 }
 html[ALPHA]=t+"</table>";
}

function drawAchievements(){
 var te =0;
 var t='';
 var all=true; // or only latest
 var ta=0; // total achievments


 // special achievments
 te++;
 if(top['oslo220711']){
   ta++;
   t+="<img src='"+image['achievement_oslo220711']+"' title='"+text['achievement_oslo220711']+"'><br>";
 }
 // total caches
 var tc='';
 te+=8;
 for each(var i in [100,250,500,1000,2000,3000,4000,5000,10000]){
   if (i <= top[TOTAL_CACHES]){
     if (!all) tc='';
     ta++;
     tc+= "<img src='"+image['achievement_'+i]+"' title='"+i+" caches found'>";
   }
   if (i > top[TOTAL_CACHES]) break;
 }
 t += "Total caches found: <b>" + top[TOTAL_CACHES] + "</b> "+tc+"<br>";

//monthly caches
 var mc='';
 te+=6;
 for each(var i in [25,50,100,250,500,1000]){
   if (i <= top[MONTH]){
     if (!all) mc='';
     ta++;
     mc+= "<img src='"+image['achievement_s_'+i]+"' title='"+i+"' caches found in one month'>";
   }
   if (i > top[MONTH]) break;
 }
 t+= "Top monthly caches: <b>" + top[MONTH] + "</b> "+mc+"<br>";

//monthly caches
 var dc='';
 te+=6;
 for each(var i in [10,25,50,100,250,500]){
   if (i <= top[DAY]){
     if (!all) dc='';
     ta++;
     dc+= "<img src='"+image['achievement_s_'+i]+"' title='"+i+"' caches found in one day'>";
   }
   if (i > top[DAY]) break;
 }
 t+= "Top daily caches: <b>" + top[DAY] + "</b> "+dc+"<br>";

// regions caches
 t+="<b>Alpha Challenges</b><br>";
 te+=3;

 t+="Cache names: <img src='"+starImg(top[NAME],36)+"' title='Found "+top[NAME]+" letters out of 36'><br>";
 t+="<span title='District/State/Region'>Regions</span>: <img src='"+starImg(top[REGION],26)+"' title='Found "+top[REGION]+" letters out of 26'><br>";
 t+="Countries: <img src='"+starImg(top[COUNTRY],25)+"' title='Found "+top[COUNTRY]+" letters out of 25'><br>";

// total stars ;  % of achievements
 t="<h3>Achievements <img src='"+starImg(ta,te)+"' title='"+ta+" achievements out of "+te+"'>  ("+ta+"/"+te+")</h3>"+t;

html[ACHIEVEMENTS] = t;
}

function starImg(q,d){
 var s = (parseInt(q/d*10)/2 +".gif").replace('.5',"_5");
 return  image_site + "stars/stars"+(s == "0_5.gif" ? '0.gif' : s) ;
}

function today(){
 var currentTime=new Date();
 month=currentTime.getMonth()+1;
 var day=currentTime.getDate();
 year=currentTime.getFullYear();
 return day+', '+months[month]+' '+year;
}

//Only places on the log page
function setPlacer(divName, divStyle){
 if (!divStyle) divStyle = 'width:60%;position:absolute;left:100px;top:100px;border:3px solid #CCCCCC;background-color:#FFFFFF;padding:10px;margin:20px;display:none';

 placer = document.createElement('div');
 placer.setAttribute('id',divName);
 placer.setAttribute('style',divStyle);
 document.getElementsByTagName("body")[0].appendChild(placer);
}

function printOut(divName){
 var t="<center><h3>Page generated "+today()+"</h3></center>";
 for(var i in html){
   t+="<div style='border:5px none'>";
   t+=html[i];
   t+="</div><br>\n\n";
 }
 t+="<br>"+credits;

 var t2 = "<div id='gcs_container'>"+t+'</div>';
 var text = t2.replace('<','&lt;').replace('>','&gt;');

 placer.innerHTML = "<div id='gcs_source_div'>Copy & paste to your profile: <br><textarea id='ctl00_ContentBody_uxProfileDetails' name='ctl00$ContentBody$uxProfileDetails' rows=3 cols=60 style='width:100%'>"+text+"</textarea>"+
"<input type='hidden' id='ctl00_ContentBody_uxSave' name='ctl00$ContentBody$uxSave' value='Save into profile'></div>"+
"<br><h3>Preview Page</h3><br><hr>"+t;
}

function drawStats(){
 try{
 drawRegionsMap();
 drawTypes();
 drawDates()
 drawAlphaChallenge();
 drawAchievements();
 printOut(placer_div);
}catch(e){
   var msg ="Oops! Something appears to be broken again.\n";
   msg += "\n\tLine "+e.lineNumber+": "+ e.message + "\n\n";
   msg += "This has never happen before.\nIf you could notify my developer, he might be able to fix me.\n Thanks for your help!";
   alert(msg);
 }
}

function runStats(){
 try{
   if(!parsed){
     $.get('/my/logs.aspx', function(data){
       data = data.substring(data.indexOf('<table'), data.indexOf('</table>'));
       parseHTML(data);
       drawStats();
       $('#'+placer_div).toggle();
       working=false;
       $("#gcs_button0i").attr('src',image['gcs_button0']);
     });
   }else{
     if(!placer_visible) drawStats();
     $('#'+placer_div).toggle();
     $("#gcs_button0i").attr('src',image['gcs_button0']);
     working=false;
   }
 placer_visible = !placer_visible;
}catch(e){
   var msg ="Oops! Something appears to be broken again.\n";
   msg += "\n\tLine "+e.lineNumber+": "+ e.message + "\n\n";
   msg += "This has never happen before.\nIf you could notify my developer, he might be able to fix me.\n Thanks for your help!";
   alert(msg);
 }
}

var isover=false;
function GCStatBt0MOver(){
 if(isover) return false;
 isover=true;
 $('#gcs_control_panel1').show('slow');
 setTimeout("GCStatCP0MOut()",3000);
}

function GCStatCP0MOut(){
 isover=false;
 $('#gcs_control_panel1').hide('slow');
}

function GCStatBt0Click(){
 if(working) return 0;
 working=true;
 $("#gcs_button0i").attr('src',image['gcs_button01']);
 runStats();
}


function drawControls(){

 var cp = document.createElement('div');
 cp.setAttribute('id','gcs_control_panel0');
 cp.setAttribute('style','position:fixed;top:30%;left:0;border:1px solid #DDDDDD;background-color:#FF0000');
 cp.innerHTML='<span>';

 var bt = document.createElement('div');
 bt.setAttribute('id','gcs_button0');
 bt.innerHTML='<img id="gcs_button0i" src="'+image['gcs_button0']+'">';

 // bind the click action to the button to show & hide the Preview
 bt.addEventListener('click',GCStatBt0Click,false);
 bt.setAttribute('style','position:absolute;top:0;width:22px;height:22px;border:2px solid #CCCCCC;background-color:#FF0000');

 cp.appendChild(bt);
 document.getElementsByTagName("body")[0].appendChild(cp);
}

// taken from http://userscripts.org/scripts/review/20145
// but with some minor alterations
function updateCheck(forced) {
 // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
 if ((forced) || (parseInt(GM_getValue('GCS_last_update', '0')) + 86400000 <= (new Date().getTime()))) {
   try{
     GM_xmlhttpRequest(
       {method: 'GET',
       url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
       headers: {'Cache-Control': 'no-cache'},
       onload: function(resp)  {
         var local_version, remote_version, rt, script_name;
         rt=resp.responseText;
         GM_setValue('GCS_last_update', new Date().getTime()+'');

         remote_version=/\@version\s*([\w\.]+)/m.exec(rt)[1];
         local_version=version;
         if(local_version!=-1){
           script_name = (/\@name\s*(.*?)\s*$/m.exec(rt))[1];
           GM_setValue('SUC_target_script_name', script_name);
           if (remote_version > local_version){
             GM_setValue('GCS_remote_version', remote_version);
             var index = rt.indexOf('---')+3;
             var changes = rt.substr(index, rt.indexOf('---', index)-index);
             if(confirm('There is an update available for the Greasemonkey script "'+script_name+'"('+remote_version+'). \n\n'+changes+'\n\nWould you like to go to the install page now?')) {
               GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
             }
           }else if (forced) {
             alert('No update is available for "'+script_name+'". ('+local_version+' >'+remote_version+') ');
           }
         }
       }
     });
   } catch (e){
     if (forced) alert('An error occurred while checking for updates:\n'+e);
   }
 }
}

function initStats(){
 drawControls();
 setPlacer( placer_div,'');
}

//===================
// Variable declaration stays at the bottom
// this is mainly to help me develop since there are a few bulky variables such as images and the ISO3166

// debug variable to force specific actions and print outs if = true
var forced = false;

var placer_div="gcs_main_div";
var placer=null;var placer_visible=false;var parsed=false;var working=false;

//Indexes for the data
var LOG=0;var NAME=1;var DATE=2;var TYPE=3;var COUNTRY=4;var IMG=5;var REGION=6;var MONTH=7; var YEAR=8;var DAY=9;var TOTAL_CACHES=0;
var ACHIEVEMENTS=0;var REGIONM=1; var TYPES=2;var DATES=3;var ALPHA=4;
var stats=new Array();stats[COUNTRY]=new Array();stats[DATE]=new Array();stats[TYPE]=new Array();stats[NAME]=new Array();stats[IMG]=new Array();stats[REGION]=new Array();stats[LOG]=new Array();
var top=[];
var year; var month; var caches=0;var realTarget=null;
var html=new Array();

var months =['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var credits = "<center>Statistics generated using <a href='http://userscripts.org/scripts/show/106499'>GC Profile Stats Builder</a></center>";

//LOG action
var logicon=[];
logicon['icon_smile']='Found';
logicon['icon_sad']='Not Found';
logicon['icon_attended']='Attended';

var text=[];
//===================
// images_array
var image= [];
image['gcs_button0'] = "data:image/png;base64,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";
image['gcs_button01']="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAQAAABuvaSwAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wcQDBEZaLy/dwAAAqtJREFUKM8t0ttrFQQAB+DvHM929EwnOYmyrLQVBF1UKCNTJLpBPUhDQREtqR7qoSC6EASBZNRLQtCFEInAILuMLoIhlUpMpQxrZVo5M+bQHd10Z7eznf16qD/ge/sKjRQxoWGv9/QpiSZHjZruHistd4WKcWUYTjKZ5KnckiezP39mPGfyVV7KssxJIe15I8l46rkQSVLLC9mQb9P4H15MPUk923JnKinmruxOLYmkL53ZmD05mM8ylbV5NvU0Us9kJjORT3J95MrsSV/U81PW5Ld051C2ZDjrckl+z8fZky8zlVpGciSLIh1JiqN2uUbDBSU1Zbe56JwHrTBgUrOihZ7TYSNKffZ622nzlLUpWOEmB81R06JPlxn6PWStMyjt1G6Bw67SYsywm92t1+UGHdfjDj1q3veXQWuUumzQ0KpoTFmLYeu8LMacs9s+JzWra3XRAqVeY+omzFR1tS+UDeAJh1S0ekCLZlPm+sYPSqMWqaiZodNCR3Sp6HXKDsctdt6IAzaraPO6UlUNRc/4SNV1HrXYQpscVlIzpmbKNA0VVcX5+h2w2VviNR9qVzVhiXdM6tOsaNyEYUNGlJqcdp9VluoQZ501XSyz1Y3+NuG8ZmVNBkTxdp2a3epN35nmvLKom+syn5ppyGwFMabLLMX1uu1TNKTkH1VHTSq4YJ7jqgpOKdrqhF/coLjUI7aoazOl3x/Wa7bdr+51TFXVlLVGfO+Y1QrjOWaT5VZrR5uaioYBJx1xv5rY5THLRadCws+e1mO7A+pmGFNQ0W+26YZMedHDdvjaEsaT1LI/HSlkfY5mMEkykZEkgxlNTx5PU15N/stfTzKSZEfm59o8n3fzY5LedOeDvJLWyLYko2mkkAwrqGDILDt97oRJ8/QpuFTDKu1WGlbGvzJMoIF0Oj0ZAAAAAElFTkSuQmCC";



var image_site = "http://www.geocaching.com/images/";

image['achievement_s_10']=image_site + 'wpttypes/sm/1155.gif';
image['achievement_s_25']=image_site + 'wpttypes/sm/1156.gif';
image['achievement_s_50']=image_site + 'wpttypes/sm/1157.gif';
image['achievement_s_100']=image_site + 'wpttypes/sm/1158.gif';
image['achievement_s_250']=image_site + 'wpttypes/sm/278.gif';
image['achievement_s_500']=image_site + 'wpttypes/sm/279.gif';
image['achievement_s_1000']=image_site + 'wpttypes/sm/280.gif';

image['achievement_100']=image_site + 'wpttypes/sm/277.gif';
image['achievement_250']=image_site + 'wpttypes/sm/278.gif';
image['achievement_500']=image_site + 'wpttypes/sm/279.gif';
image['achievement_1000']=image_site + 'wpttypes/sm/280.gif';
image['achievement_2000']=image_site + 'wpttypes/sm/281.gif';
image['achievement_3000']=image_site + 'wpttypes/sm/282.gif';
image['achievement_4000']=image_site + 'wpttypes/sm/283.gif';
image['achievement_5000']=image_site + 'wpttypes/sm/284.gif';
image['achievement_10000']=image_site + 'wpttypes/sm/3192.gif';

image['achievement_oslo220711']=image_site + 'wpttypes/sm/692.gif';
text['achievement_oslo220711']="Freedom is greater than fear (Oslo, 22/Jul/11).";

var country2iso3166=new Array();

country2iso3166["Afghanistan"]="AF";country2iso3166["Aland Islands"]="AX";country2iso3166["Albania"]="AL";country2iso3166["Algeria"]="DZ";country2iso3166["American Samoa"]="AS";country2iso3166["Andorra"]="AD";country2iso3166["Angola"]="AO";country2iso3166["Anguilla"]="AI";country2iso3166["Antarctica"]="AQ";country2iso3166["Antigua and Barbuda"]="AG";country2iso3166["Argentina"]="AR";country2iso3166["Armenia"]="AM";country2iso3166["Aruba"]="AW";country2iso3166["Australia"]="AU";country2iso3166["Austria"]="AT";country2iso3166["Azerbaijan"]="AZ";country2iso3166["Bahamas"]="BS";country2iso3166["Bahrain"]="BH";country2iso3166["Bangladesh"]="BD";country2iso3166["Barbados"]="BB";country2iso3166["Belarus"]="BY";country2iso3166["Belgium"]="BE";country2iso3166["Belize"]="BZ";country2iso3166["Benin"]="BJ";country2iso3166["Bermuda"]="BM";country2iso3166["Bhutan"]="BT";country2iso3166["Bolivia, Plurinational State of"]="BO";country2iso3166["Bonaire, Sint Eustatius and Saba"]="BQ";country2iso3166["Bosnia and Herzegovina"]="BA";country2iso3166["Botswana"]="BW";country2iso3166["Bouvet Island"]="BV";country2iso3166["Brazil"]="BR";country2iso3166["British Indian Ocean Territory"]="IO";country2iso3166["Brunei Darussalam"]="BN";country2iso3166["Bulgaria"]="BG";country2iso3166["Burkina Faso"]="BF";country2iso3166["Burundi"]="BI";country2iso3166["Cambodia"]="KH";country2iso3166["Cameroon"]="CM";country2iso3166["Canada"]="CA";country2iso3166["Cape Verde"]="CV";country2iso3166["Cayman Islands"]="KY";country2iso3166["Central African Republic"]="CF";country2iso3166["Chad"]="TD";country2iso3166["Chile"]="CL";country2iso3166["China"]="CN";country2iso3166["Christmas Island"]="CX";country2iso3166["Cocos (Keeling) Islands"]="CC";country2iso3166["Colombia"]="CO";country2iso3166["Comoros"]="KM";country2iso3166["Congo"]="CG";country2iso3166["Congo, The Democratic Republic of the"]="CD";country2iso3166["Cook Islands"]="CK";country2iso3166["Costa Rica"]="CR";country2iso3166["Cote D'ivoire"]="CI";country2iso3166["Croatia"]="HR";country2iso3166["Cuba"]="CU";country2iso3166["Curacao"]="CW";country2iso3166["Cyprus"]="CY";country2iso3166["Czech Republic"]="CZ";country2iso3166["Denmark"]="DK";country2iso3166["Djibouti"]="DJ";country2iso3166["Dominica"]="DM";country2iso3166["Dominican Republic"]="DO";country2iso3166["Ecuador"]="EC";country2iso3166["Egypt"]="EG";country2iso3166["El Salvador"]="SV";country2iso3166["Equatorial Guinea"]="GQ";country2iso3166["Eritrea"]="ER";country2iso3166["Estonia"]="EE";country2iso3166["Ethiopia"]="ET";country2iso3166["Falkland Islands (Malvinas)"]="FK";country2iso3166["Faroe Islands"]="FO";country2iso3166["Fiji"]="FJ";country2iso3166["Finland"]="FI";country2iso3166["France"]="FR";country2iso3166["French Guiana"]="GF";country2iso3166["French Polynesia"]="PF";country2iso3166["French Southern Territories"]="TF";country2iso3166["Gabon"]="GA";country2iso3166["Gambia"]="GM";country2iso3166["Georgia"]="GE";country2iso3166["Germany"]="DE";country2iso3166["Ghana"]="GH";country2iso3166["Gibraltar"]="GI";country2iso3166["Greece"]="GR";country2iso3166["Greenland"]="GL";country2iso3166["Grenada"]="GD";country2iso3166["Guadeloupe"]="GP";country2iso3166["Guam"]="GU";country2iso3166["Guatemala"]="GT";country2iso3166["Guernsey"]="GG";country2iso3166["Guinea"]="GN";country2iso3166["Guinea-Bissau"]="GW";country2iso3166["Guyana"]="GY";country2iso3166["Haiti"]="HT";country2iso3166["Heard Island and McDonald Islands"]="HM";country2iso3166["Holy See (Vatican City State)"]="VA";country2iso3166["Honduras"]="HN";country2iso3166["Hong Kong"]="HK";country2iso3166["Hungary"]="HU";country2iso3166["Iceland"]="IS";country2iso3166["India"]="IN";country2iso3166["Indonesia"]="ID";country2iso3166["Iran, Islamic Republic of"]="IR";country2iso3166["Iraq"]="IQ";country2iso3166["Ireland"]="IE";country2iso3166["Isle of Man"]="IM";country2iso3166["Israel"]="IL";country2iso3166["Italy"]="IT";country2iso3166["Jamaica"]="JM";country2iso3166["Japan"]="JP";country2iso3166["Jersey"]="JE";country2iso3166["Jordan"]="JO";country2iso3166["Kazakhstan"]="KZ";country2iso3166["Kenya"]="KE";country2iso3166["Kiribati"]="KI";country2iso3166["Korea, Democratic People's Republic of"]="KP";country2iso3166["Korea, Republic of"]="KR";country2iso3166["Kuwait"]="KW";country2iso3166["Kyrgyzstan"]="KG";country2iso3166["Lao People's Democratic Republic"]="LA";country2iso3166["Latvia"]="LV";country2iso3166["Lebanon"]="LB";country2iso3166["Lesotho"]="LS";country2iso3166["Liberia"]="LR";country2iso3166["Libyan Arab Jamahiriya"]="LY";country2iso3166["Liechtenstein"]="LI";country2iso3166["Lithuania"]="LT";country2iso3166["Luxembourg"]="LU";country2iso3166["Macao"]="MO";country2iso3166["Macedonia, The Former Yugoslav Republic of"]="MK";country2iso3166["Madagascar"]="MG";country2iso3166["Malawi"]="MW";country2iso3166["Malaysia"]="MY";country2iso3166["Maldives"]="MV";country2iso3166["Mali"]="ML";country2iso3166["Malta"]="MT";country2iso3166["Marshall Islands"]="MH";country2iso3166["Martinique"]="MQ";country2iso3166["Mauritania"]="MR";country2iso3166["Mauritius"]="MU";country2iso3166["Mayotte"]="YT";country2iso3166["Mexico"]="MX";country2iso3166["Micronesia, Federated States of"]="FM";country2iso3166["Moldova, Republic of"]="MD";country2iso3166["Monaco"]="MC";country2iso3166["Mongolia"]="MN";country2iso3166["Montenegro"]="ME";country2iso3166["Montserrat"]="MS";country2iso3166["Morocco"]="MA";country2iso3166["Mozambique"]="MZ";country2iso3166["Myanmar"]="MM";country2iso3166["Namibia"]="NA";country2iso3166["Nauru"]="NR";country2iso3166["Nepal"]="NP";country2iso3166["Netherlands"]="NL";country2iso3166["New Caledonia"]="NC";country2iso3166["New Zealand"]="NZ";country2iso3166["Nicaragua"]="NI";country2iso3166["Niger"]="NE";country2iso3166["Nigeria"]="NG";country2iso3166["Niue"]="NU";country2iso3166["Norfolk Island"]="NF";country2iso3166["Northern Mariana Islands"]="MP";country2iso3166["Norway"]="NO";country2iso3166["Oman"]="OM";country2iso3166["Pakistan"]="PK";country2iso3166["Palau"]="PW";country2iso3166["Palestinian Territory, Occupied"]="PS";country2iso3166["Panama"]="PA";country2iso3166["Papua New Guinea"]="PG";country2iso3166["Paraguay"]="PY";country2iso3166["Peru"]="PE";country2iso3166["Philippines"]="PH";country2iso3166["Pitcairn"]="PN";country2iso3166["Poland"]="PL";country2iso3166["Portugal"]="PT";country2iso3166["Puerto Rico"]="PR";country2iso3166["Qatar"]="QA";country2iso3166["Reunion"]="RE";country2iso3166["Romania"]="RO";country2iso3166["Russian Federation"]="RU";country2iso3166["Rwanda"]="RW";country2iso3166["Saint Barthelemy"]="BL";country2iso3166["Saint Helena, Ascension and Tristan Da Cunha"]="SH";country2iso3166["Saint Kitts and Nevis"]="KN";country2iso3166["Saint Lucia"]="LC";country2iso3166["Saint Martin (French Part)"]="MF";country2iso3166["Saint Pierre and Miquelon"]="PM";country2iso3166["Saint Vincent and the Grenadines"]="VC";country2iso3166["Samoa"]="WS";country2iso3166["San Marino"]="SM";country2iso3166["Sao Tome and Principe"]="ST";country2iso3166["Saudi Arabia"]="SA";country2iso3166["Senegal"]="SN";country2iso3166["Serbia"]="RS";country2iso3166["Seychelles"]="SC";country2iso3166["Sierra Leone"]="SL";country2iso3166["Singapore"]="SG";country2iso3166["Sint Maarten (Dutch Part)"]="SX";country2iso3166["Slovakia"]="SK";country2iso3166["Slovenia"]="SI";country2iso3166["Solomon Islands"]="SB";country2iso3166["Somalia"]="SO";country2iso3166["South Africa"]="ZA";country2iso3166["South Georgia and the South Sandwich Islands"]="GS";country2iso3166["Spain"]="ES";country2iso3166["Sri Lanka"]="LK";country2iso3166["Sudan"]="SD";country2iso3166["Suriname"]="SR";country2iso3166["Svalbard and Jan Mayen"]="SJ";country2iso3166["Swaziland"]="SZ";country2iso3166["Sweden"]="SE";country2iso3166["Switzerland"]="CH";country2iso3166["Syrian Arab Republic"]="SY";country2iso3166["Taiwan, Province of China"]="TW";country2iso3166["Tajikistan"]="TJ";country2iso3166["Tanzania, United Republic of"]="TZ";country2iso3166["Thailand"]="TH";country2iso3166["Timor-Leste"]="TL";country2iso3166["Togo"]="TG";country2iso3166["Tokelau"]="TK";country2iso3166["Tonga"]="TO";country2iso3166["Trinidad and Tobago"]="TT";country2iso3166["Tunisia"]="TN";country2iso3166["Turkey"]="TR";country2iso3166["Turkmenistan"]="TM";country2iso3166["Turks and Caicos Islands"]="TC";country2iso3166["Tuvalu"]="TV";country2iso3166["Uganda"]="UG";country2iso3166["Ukraine"]="UA";country2iso3166["United Arab Emirates"]="AE";country2iso3166["United Kingdom"]="GB";country2iso3166["United States"]="US";country2iso3166["United States Minor Outlying Islands"]="UM";country2iso3166["Uruguay"]="UY";country2iso3166["Uzbekistan"]="UZ";country2iso3166["Vanuatu"]="VU";country2iso3166["Venezuela, Bolivarian Republic of"]="VE";country2iso3166["Viet Nam"]="VN";country2iso3166["Virgin Islands, British"]="VG";country2iso3166["Virgin Islands, U.S."]="VI";country2iso3166["Wallis and Futuna"]="WF";country2iso3166["Western Sahara"]="EH";country2iso3166["Yemen"]="YE";country2iso3166["Zambia"]="ZM";country2iso3166["Zimbabwe"]="ZW";

//fix for us states that are shown as countries
var usStates = new Array('Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming');

var dateFmt;

//=============================
// finally the execution starts
//=============================
//Enable jQuery from the page itself since it is already loaded in the native document
try{

$ = unsafeWindow.jQuery;

initStats();
}catch(e){
 alert(e)
}
updateCheck(forced);
