// ==UserScript==
// @author       luckyman, modified by tomasz.frelik (at) enzo.pl ,modified by herrjeanke (at) hotmail.com 
// @namespace    http://userscripts.org/users/64220/scripts
// @name         Herrjeanke's Remaining Time and Planning Tool for Travian Version 1.0
// @description  On build pages, if not enough resources show how much is needed and how much time it will take to produce this quantity. Also a table is generated showing showing you how much resources you'll have in the next 20 hours.
// @include      http://s*.travian*/build.php?id=*
// ==/UserScript==
  
//Language specifications : 
 
//Dutch :
//-------
var timeleft,readyat;
//timeleft = " nog ";-
timeleft = " ";
readyat = "klaar om ";
 
 
function format(maxtime){
            var hrs = Math.floor(maxtime/3600);
            var min = Math.floor(maxtime/60) % 60;
            var sec = maxtime % 60;
            var t = hrs + ":";
            if(min < 10){t += "0";}
            t += min + ":";
            if(sec < 10){t += "0";}
            t += sec;
            return t;
}
 

function mHrs(maxtime){
            var hrs = Math.floor(maxtime/3600);
            return hrs;
}
 
function mMin(maxtime){
            var hrs = Math.floor(maxtime/3600);
            var min = Math.floor(maxtime/60) % 60;
            //if(min < 10){min = "0" + min;}
            return min;
}
 
function mSec(maxtime){
            var hrs = Math.floor(maxtime/3600);
            var min = Math.floor(maxtime/60) % 60;
            var sec = maxtime % 60;           
            //if(sec < 10){sec = "0" + sec;}
            return sec;
}
 
function javaTimeFormat(maxtime){
            var hrs = Math.floor(maxtime/3600);
            var min = Math.floor(maxtime/60) % 60;
            var sec = maxtime % 60;
                        
            var t = new Date();
            t.setHours(hrs); 
            t.setMinutes(min);
            t.setSeconds(sec);
            t.setMilliseconds(0);
                        
            return t;
}
 
function travianTimeFormat(t){
            var hrs = t.getHours();
            var min = t.getMinutes();
            var sec = t.getSeconds();
            var t = hrs + ":";
            if(min < 10){t += "0";}
            t += min + ":";
            if(sec < 10){t += "0";}
            t += sec;
            return t;
}
 
 
function hhmmssTimeFormat(t){
            var hrs = t.getHours();
            var min = t.getMinutes();
            var sec = t.getSeconds();
            var st ="";
            if(hrs < 10){st += "0";}
            st += hrs + ":";
            if(min < 10){st += "0";}
            st += min + ":";
            if(sec < 10){st += "0";}
            st += sec;
            return st;
}
 
function addTime(originalTime, years, months, days, hours, minutes, seconds, milliseconds){
            var t = new Date();
 
            t.setYear( t.getYear() + years );
            t.setMonth( t.getMonth()  + months );
            t.setDate( t.getDate() + days );
            t.setHours( t.getHours() + hours );
            t.setMinutes( t.getMinutes() + minutes );
            t.setSeconds( t.getSeconds() + seconds );
            t.setMilliseconds( t.getMilliseconds() + milliseconds );
 
            return t;
}
 
function prefixNullen(nodig, tekort){
            var nbspCount = (String(nodig).length - String(tekort).length);
            for (i=nbspCount;i>0;i--){
                        tekort = "<font color='white'>0</font>" + tekort;
            }
            return tekort;
}
 
function prefixVisbleNullen(nodig, tekort){
            var nbspCount = (String(nodig).length - String(tekort).length);
            for (i=nbspCount;i>0;i--){
                        tekort = "0" + tekort;
            }
            return tekort;
}
 
 
 
 
 
if ( navigator.appName == 'Opera' ) {
            eventSource = document;
} else {
            eventSource = window;
}
 
eventSource.addEventListener( 'load', function( e ) {
                                   
            var results = document.evaluate('//td[@id]/text()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            //alert(results.snapshotLength);
            if (results.snapshotLength == 0) {return;}
                        
            var wood = parseInt(results.snapshotItem(0).data.split('/'));
            var clay = parseInt(results.snapshotItem(1).data.split('/'));
            var iron = parseInt(results.snapshotItem(2).data.split('/'));
            var crop = parseInt(results.snapshotItem(3).data.split('/'));
            
            var woodp = parseInt(results.snapshotItem(0).parentNode.title);
            var clayp = parseInt(results.snapshotItem(1).parentNode.title);
            var ironp = parseInt(results.snapshotItem(2).parentNode.title);
            var cropp = parseInt(results.snapshotItem(3).parentNode.title);
            
            var woodstock = parseInt(results.snapshotItem(0).data.split('/')[1]);
            var claystock = parseInt(results.snapshotItem(1).data.split('/')[1]);
            var ironstock = parseInt(results.snapshotItem(2).data.split('/')[1]);
            var cropstock = parseInt(results.snapshotItem(3).data.split('/')[1]);
            
            //var need = document.evaluate('/html/body/table/tbody/tr/td[3]/table[last()]/tbody/tr//td/text()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            var need = document.evaluate('//table[@class="f10"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            //alert(need.snapshotLength);
            //need.snapshotLength
            for (var i=0;i<need.snapshotLength;i++){
                        //wood | clay | iron | crop | upkeep | time
                        //alert(need.snapshotItem(i).textContent);
                        if (need.snapshotItem(i).textContent.indexOf("|")==-1||need.snapshotItem(i).textContent.charAt(0)=="\n") continue;
                        var needs = need.snapshotItem(i).textContent.split(" | ");
                        //for (var j=0;j<needs.length;j++) alert(needs[j]);
                        
                        var woodneed = parseInt(needs[0]);
                        var clayneed = parseInt(needs[1]);
                        var ironneed = parseInt(needs[2]);
                        var cropneed = parseInt(needs[3]);
                        if (wood>=woodneed&&clay>=clayneed&&iron>=ironneed&&crop>=cropneed) continue;
                        //alert("Not enough resources");
                                               
                        var resourcesneed = woodneed + clayneed + ironneed + cropneed;
                        
                        var woodsn=0,claysn=0,ironsn=0,cropsn=0;
                        if (wood<woodneed) woodsn=woodneed-wood;
                        if (clay<clayneed) claysn=clayneed-clay;
                        if (iron<ironneed) ironsn=ironneed-iron;
                        if (crop<cropneed) cropsn=cropneed-crop;
                        
                        
                        var woodvs=0,clayvs=0,ironvs=0,cropvs=0;
                        woodvs=wood-woodneed;
                        clayvs=clay-clayneed;
                        ironvs=iron-ironneed;
                        cropvs=crop-cropneed;
                        
                        var maxtime=0,time,t,tClient,tClientString;
                        time = woodsn/woodp*3600;
                        if (maxtime<time) maxtime=time;
                        time = claysn/clayp*3600;
                        if (maxtime<time) maxtime=time;
                        time = ironsn/ironp*3600;
                        if (maxtime<time) maxtime=time;
                        time = cropsn/cropp*3600;
                        if (maxtime<time) maxtime=time;
                        maxtime=parseInt(maxtime);                 
                        t=format(maxtime);        
                        
                        tClient=javaTimeFormat(maxtime);  
               tClient=addTime(tClient,0,0,0,mHrs(maxtime),mMin(maxtime),mSec(maxtime),0);
               tClientString=travianTimeFormat(tClient);
            
                        // create presentation
                        // in Firefox the total is in a new line, even though the div is floated
                        var resource_div = document.createElement( 'div' );
                        resource_div.style.cssFloat = "left";
                        //resource_div.style.paddingRight = 4;
                        //resource_div.innerHTML = "<img src=\"img/un/r/1.gif\" width=\"18\" height=\"12\">"+woodsn
                                             +" | <img src=\"img/un/r/2.gif\" width=\"18\" height=\"12\">"+claysn
                                             +" | <img src=\"img/un/r/3.gif\" width=\"18\" height=\"12\">"+ironsn
                                             +" | <img src=\"img/un/r/4.gif\" width=\"18\" height=\"12\">"+cropsn
                                             +"<br><img class='clock' src='img/un/a/clock.gif' width='18' height='12'>Enough resources in: <font id='timer0' style='font-size:smaller;'>*<span id=timer0 style>-"+t+"-</span>*"
                                             + "";
                                             
                        resource_div.innerHTML = "<img src=\"img/un/r/1.gif\" width=\"18\" height=\"12\">"
										 +"<font color='" + ((woodvs < 0)?"red":"green") + "'>" + ((woodvs >= 0)?prefixNullen(woodneed,woodvs):prefixNullen(woodneed,woodsn)) + "</font>"
										 +" | <img src=\"img/un/r/2.gif\" width=\"18\" height=\"12\">"
										 +"<font color='" + ((clayvs < 0)?"red":"green") + "'>" + ((clayvs >= 0)?prefixNullen(clayneed,clayvs):prefixNullen(clayneed,claysn)) + "</font>"
										 +" | <img src=\"img/un/r/3.gif\" width=\"18\" height=\"12\">"
										 +"<font color='" + ((ironvs < 0)?"red":"green") + "'>" + ((ironvs >= 0)?prefixNullen(ironneed,ironvs):prefixNullen(ironneed,ironsn)) + "</font>"
										 +" | <img src=\"img/un/r/4.gif\" width=\"18\" height=\"12\">"
										 +"<font color='" + ((cropvs < 0)?"red":"green") + "'>" + ((cropvs >= 0)?prefixNullen(cropneed,cropvs):prefixNullen(cropneed,cropsn)) + "</font>"
										 +" | "
										 +" " 
										 +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img class='clock' src='img/un/a/clock.gif' width='18' height='12'>" + timeleft
										 +"<span id='timer0'></span>"
										 //+"<p>Welcome to the site <b id='boldStuff'>dude</b> </p>"
										 //+"<font style='font-size:smaller;'> (" + readyat + tClientString + ")</font>"
										 +"<br>"
										 +"<br>"
										 +"";


										 //+"" + wood + clay + iron + crop + "<br>"
										 //+"" + woodp + clayp + ironp + cropp + "<br>"
										 //+"" + woodsn + claysn + ironsn + cropsn + "<br>"
										 //+"" + woodneed + clayneed + ironneed + cropneed + "<br>"
										 //+"" + woodvs + clayvs + ironvs + cropvs + "<br>"
										 //+"tijd1<br>"
										 //+"tijd1<br>"
										 //+"tijd1<br>"
										 //+"tijd1<br>"
										 //+"<br>"
										 //+"<br>"
										 //+"<br>"
										 //+"<br>"
										 //+"<br>"
										 //+"<br>"
										 //+"<br>"                                              

                                                                                                          
            //  prefixVisbleNullen("99",currentTime.getHours()) + ":" + prefixVisbleNullen("99",currentTime.getMinutes()) + ":" + prefixVisbleNullen("99",currentTime.getSeconds())
                        
                                                                                                          
                                                                                                          
                        var resourceTable = "";   
                        var resources;
                        var currentTime = new Date();
                        var teller = 0;
                        var stockValue = 0;
                        var vlagtClient = 0;
                        
                        
                        
                        resourceTable += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                        resourceTable += "<img src='img/un/r/1.gif' width='18' height='12'>"
                        resourceTable += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                        resourceTable += "<img src='img/un/r/2.gif' width='18' height='12'>"                         
                        resourceTable += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                        resourceTable += "<img src='img/un/r/3.gif' width='18' height='12'>" 
                        resourceTable += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                        resourceTable += "<img src='img/un/r/4.gif' width='18' height='12'>"                     
                        resourceTable += "<br>"    
                        for(vlag=1;vlag<=20;vlag++){                   
                                   if(vlagtClient!=0){
                                               resourceTable += "<font style='font-size:smaller;'><b>" + hhmmssTimeFormat(tClient) + "&nbsp;&nbsp;&nbsp;</b></font>";
                                   }else{
                                               resourceTable += hhmmssTimeFormat(addTime(currentTime,0,0,0,teller,0,0,0));
                                   }
                                   
                                   
                                   resourceTable += " | <!--<img src='img/un/r/1.gif' width='18' height='12'>-->";
                                   stockValue = Math.floor(wood + teller * woodp);
                                   if(stockValue < woodneed){
                                               resourceTable += "<font color='OrangeRed'>" + prefixNullen("99999",stockValue) + "</font>";
                                   }else{
                                               if(stockValue >= woodstock){
                                                           resourceTable += "<font color='blue'>" + prefixNullen("99999",woodstock) + "</font>";
                                               }else{
                                                           resourceTable += "<font color='black'>" + prefixNullen("99999",stockValue) + "</font>";
                                               }                                                          
                                   }                       
                                   resourceTable += " | <!--<img src='img/un/r/2.gif' width='18' height='12'>-->"; 
                                   stockValue = Math.floor(clay + teller * clayp);
                                   if(stockValue < clayneed){
                                               resourceTable += "<font color='OrangeRed'>" + prefixNullen("99999",stockValue) + "</font>";
                                   }else{
                                               if(stockValue >= claystock){
                                                           resourceTable += "<font color='blue'>" + prefixNullen("99999",claystock) + "</font>";
                                               }else{
                                                           resourceTable += "<font color='black'>" + prefixNullen("99999",stockValue) + "</font>";
                                               }                                                          
                                   }
                                   resourceTable += " | <!--<img src='img/un/r/3.gif' width='18' height='12'>-->";
                                   stockValue = Math.floor(iron + teller * ironp);
                                   if(stockValue < ironneed){
                                               resourceTable += "<font color='OrangeRed'>" + prefixNullen("99999",stockValue) + "</font>";
                                   }else{
                                               if(stockValue >= ironstock){
                                                           resourceTable += "<font color='blue'>" + prefixNullen("99999",ironstock) + "</font>";
                                               }else{
                                                           resourceTable += "<font color='black'>" + prefixNullen("99999",stockValue) + "</font>";
                                               }                                                          
                                   }
                                   resourceTable += " | <!--<img src='img/un/r/4.gif' width='18' height='12'>-->";
                                   stockValue = Math.floor(crop + teller * cropp);
                                   if(stockValue < cropneed){
                                               resourceTable += "<font color='OrangeRed'>" + prefixNullen("99999",stockValue) + "</font>";
                                   }else{
                                               if(stockValue >= cropstock){
                                                           resourceTable += "<font color='blue'>" + prefixNullen("99999",cropstock) + "</font>";
                                               }else{
                                                           resourceTable += "<font color='black'>" + prefixNullen("99999",stockValue) + "</font>";
                                               }                                                          
                                   }           
                                   resources = (wood + teller * woodp) + (clay + teller * clayp) + (iron + teller * ironp) + (crop + teller * cropp);
                                   if(resources <= resourcesneed){
                                               resourceTable += " <font style='font-size:smaller;'>(" + prefixNullen("99999",resources) + ")</font>";
                                   }else{
                                               resourceTable += "";
                                   }                       
                                   resourceTable += "<br>"; 
                                   
                                   
                                   
                                                           
                                   
                                   
                                   if(tClient > addTime(currentTime,0,0,0,teller,0,0,0) && tClient < addTime(currentTime,0,0,0,teller+1,0,0,0) && vlagtClient==0 ){
                                               vlagtClient = teller + 1;
                                               //resourceTable += "<hr style='height:1px;border:1px solid #000;background-color:#000'>";
                                               teller = mHrs(maxtime) + Math.max((mMin(maxtime)+1) * 1.6666667) / 100;                                            
                                   }else{
                                               if(vlagtClient!=0){
                                                           //resourceTable += "</font></b>"; 
                                                           teller = vlagtClient;
                                                           vlagtClient=0;
                                               }else{
                                                           teller += 1;
                                               }           
                                   }                                  
                                   
                        }  
                                 
              
               resource_div.innerHTML += resourceTable + "<br>"; 
               //"<b>" + woodvs + "#" + clayvs + "#" + ironvs + "#" + cropvs + "</b><br>"
               
               
               
               if(woodvs||0 && clayvs||0 && ironvs||0 && cropvs||0){
			need.snapshotItem(i).appendChild(resource_div);

			var myscript;

			myscript = document.createElement("script");
			myscript.text = "";
			myscript.text += "h=" + mHrs(maxtime) + ";";
			myscript.text += "m=" + mMin(maxtime) + ";";
			myscript.text += "s=" + mSec(maxtime) + ";";
			myscript.text += "";
			document.body.appendChild(myscript);                

			myscript = document.createElement('script'); 					
			myscript.setAttribute('src', 'http://userscripts.org/scripts/source/32532.user.js');
			document.body.appendChild(myscript); 
               }
               
                           
               
            }
},false);