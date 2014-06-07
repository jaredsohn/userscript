// ==UserScript==
// @name           VU Add FillEOM and FillALL to trade page
// @namespace      http://userscripts.org/users/125692
// @description    Adds links to auto fill trade transports.
// @include        http://www.humugus.com/ds.php/c/spaceport/index/*
// @include        http://www.humugus.com/ds.php/c/spaceport/treasury/*
// ==/UserScript==
(function() {
/*

var iOrganic,iMineral,iEnergy,iMonetary;
var iAvailable;
var iCapacity;
var elementE,elementO,elementM,elementMon;
var elementAvail,elementCap;
var shareEOM,shareALL;
var shareEOMMAX,shareALLMAX;
var iOsend,iEsend,iMsend,iMonsend;


elementE = document.getElementById('colene');
if (elementE) {
    var iEnergy=elementE.title
}

elementO = document.getElementById('colorg');
if (elementO) {
    var iOrganic=elementO.title
}

elementM = document.getElementById('colmin');
if (elementM) {
    var iMineral=elementM.title
}

elementMon = document.getElementById('colmon');
if (elementMon) {
    var iMonetary=elementMon.title
}

elementAvail = document.getElementById('avail');
if (elementAvail) {
    var iAvailable=elementAvail.title
}

elementCap = document.getElementById('rcap');
if (elementCap) {
    var iCapacity=elementCap.title
}

//now we have the info needed



//this shares E O M evenly up to 1/3 of combined load
//ie  EOM each set to min(ammountavailable,1/3 total capacity)
function shareEOMMax2(){  
    //get amounts to set
    
    shareEOM=(iAvailable*iCapacity);
    shareEOM=Math.floor(shareEOM/3);
    iEsend=Math.min(iEnergy,shareEOM);
    iOsend=Math.min(iOrganic,shareEOM);
    iMsend=Math.min(iMineral,shareEOM);
    //set text boxes
    
   //Share Max should share evenly and then if there is more room share more of those available
   //eg  if shareEOM=cap*avail/3=5000
   //and    e=4500
   //       o=5250
   //       m=5350
   //then
   //can take 15000 resources.
   //take   min(4500,5000) e for   4500 e
   //take   min(5250,5000) o for    5000 o
    //take   min(5350,5000) m for    5000 m
    //then
    //have 500 space free.
    //so add min(eleft,250) for 0 e more
    //   add min(oleft,250) for 250 e more
    //   add min(mleft,250) for 250 m more

    //and the shareEOM=0 soo all space used up
    //thus as a while loop
    
    eleft=iEnergy ;
    oleft=iOrganic;
    mleft=iMineral;
    var spaceleft=(cap*avail);
    var spaceeach=spaceleft/3;
    while(spaceleft>2 && (eleft>0||oleft>0||mleft>0))//2 to avoid where 1 or 2 left and the /3 gives 0 
        {
          spaceeach=spaceleft/3;
          
          temp=min(eleft,spaceeach)
          spaceleft=-temp
          eleft=-temp
          esend+=temp        
          
          temp=min(oleft,spaceeach)
          spaceleft=-temp
          oleft=-temp
          osend+=temp
          
          temp=min(mleft,spaceeach)
          spaceleft=-temp
          mleft=-temp
          msend+=temp  
    }
    while(spaceleft>0 && (eleft>0||oleft>0||mleft>0) ){                  //get rid of the last 1-2 space avail if exist.
        if (eleft>1){
                esend++;
                eleft--;
                spaceleft--;
            }
        else if (oleft>0){
            osend++;
            oleft--;
            spaceleft--;
            }
        else if (mleft>0){
            msend++;
            mleft--;
            spaceleft--;
            }
    }
    
    var allFields, thisField;
    allFields = document.evaluate(
      "//input[@type=\
      'text'\
      ]",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);

    for (var i = 0; i < allFields.snapshotLength; i++) {
       thisField = allFields.snapshotItem(i);
    
       if(thisField.name == 'energy' ) {
         thisField.value = iEsend;
       }
       else if(thisField.name == 'organic' ) {
         thisField.value = iOsend;
       }
       else if(thisField.name == 'mineral' ) {
         thisField.value = iMsend;
       }
    }
}
*/

if (!window.addEventListener) {

    window.addEventListener = function (type, listener, useCapture) {

        attachEvent('on' + type, function() { listener(event) });

    }

}



//the next bit is a cludge as I couldn't work out how to escape the nested quotes properly
//var fubar= '   allFields = document.evaluate('+'"'+'//input[@type='+"'text'"
//           +']'+'"'+',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);';

   var scriptCode = new Array();   // this is where we are going to build our new script
   
    // here's the build of the new script, one line at a time
    scriptCode.push('function shareEOM(){                                    ');
    scriptCode.push('   var iOrganic,iMineral,iEnergy,iMonetary;                   ');
    scriptCode.push('   var iAvailable;                                            ');
    scriptCode.push('   var iCapacity;                                             ');
    scriptCode.push('   var elementE,elementO,elementM,elementMon;                 ');
    scriptCode.push('   var elementAvail,elementCap;                               ');
    scriptCode.push('   var shareEOM,shareALL;                                     ');
    scriptCode.push('   var shareEOMMAX,shareALLMAX;                               ');
    scriptCode.push('   var iOsend=0,iEsend=0,iMsend=0,iMonsend=0;                 ');
    scriptCode.push('   elementE = document.getElementById("colene");              ');
    scriptCode.push('   if (elementE) {                                            ');
    scriptCode.push('       iEnergy=elementE.title;                             ');
    scriptCode.push('   }                                                          ');
    scriptCode.push('   elementO = document.getElementById("colorg");              ');
    scriptCode.push('   if (elementO) {                                            ');
    scriptCode.push('       iOrganic=elementO.title;                            ');
    scriptCode.push('   }                                                          ');
    scriptCode.push('   elementM = document.getElementById("colmin");              ');
    scriptCode.push('   if (elementM) {                                            ');
    scriptCode.push('       iMineral=elementM.title;                            ');
    scriptCode.push('   }                                                          ');
    scriptCode.push('   elementMon = document.getElementById("colmon");            ');
    scriptCode.push('   if (elementMon) {                                          ');
    scriptCode.push('       iMonetary=elementMon.title;                         ');
    scriptCode.push('   }                                                          ');
    scriptCode.push('   elementAvail = document.getElementById("avail");           ');
    scriptCode.push('   if (elementAvail) {                                        ');
    scriptCode.push('       iAvailable=elementAvail.title;                      ');
    scriptCode.push('   }                                                          ');
    scriptCode.push('   elementCap = document.getElementById("rcap");              ');
    scriptCode.push('   if (elementCap) {                                          ');
    scriptCode.push('       iCapacity=elementCap.title;                         ');
    scriptCode.push('   }                                                           ');
    scriptCode.push('   shareEOM=(iAvailable*iCapacity);                          ');
    scriptCode.push('   shareEOM=Math.floor(shareEOM/3);                          ');
    scriptCode.push('   iEsend=Math.min(iEnergy,shareEOM);                        ');
    scriptCode.push('   iOsend=Math.min(iOrganic,shareEOM);                       ');
    scriptCode.push('   iMsend=Math.min(iMineral,shareEOM);                      ');
    scriptCode.push('   var allFields, thisField;'                                 );
    scriptCode.push('   allFields = document.evaluate('                            );
    scriptCode.push('       "//input[@type=\'text\']",'                            );
    scriptCode.push('       document,'                                             );
    scriptCode.push('       null,'                                                 );
    scriptCode.push('       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,'             );
    scriptCode.push('       null);'                                                );
    scriptCode.push('    for (var i = 0; i < allFields.snapshotLength; i++) {     ');
    scriptCode.push('        thisField = allFields.snapshotItem(i);               ');
    scriptCode.push("        if(thisField.name == 'energy' ) {                    ");
    scriptCode.push('           thisField.value = iEsend;}                        ');
    scriptCode.push("        else if(thisField.name == 'organic' ) {              ");
    scriptCode.push('           thisField.value = iOsend;}                        ');
    scriptCode.push("        else if(thisField.name == 'mineral' ) {              ");
    scriptCode.push('           thisField.value = iMsend;}                        ');
    scriptCode.push("        else if(thisField.name == 'monetary' ) {             ");
    scriptCode.push('           thisField.value = iMonsend;}                      ');
    scriptCode.push('    }                                                        ');
    scriptCode.push('  check_spaceport()  ');
    scriptCode.push('}                                                            ');
    
    // now, we put the script in a new script element in the DOM
    var script = document.createElement('script');    // create the script element
    script.innerHTML = scriptCode.join('\n');         // add the script code to it
    scriptCode.length = 0;                            // recover the memory we used to build the script
   // this is sort of hard to read, because it's doing 2 things:
    // 1. finds the first <head> tag on the page
    // 2. adds the new script just before the </head> tag
    document.getElementsByTagName('head')[0].appendChild(script); 


    var scriptCode2 = new Array();   // this is where we are going to build our new script
    // here's the build of the new script, one line at a time
    scriptCode2.push('function shareEOMMax(){                                    ');
    scriptCode2.push('   var iOrganic,iMineral,iEnergy,iMonetary;                   ');
    scriptCode2.push('   var eleft,oleft,mleft;'                                     );
    scriptCode2.push('   var iAvailable;                                            ');
    scriptCode2.push('   var iCapacity;                                             ');
    scriptCode2.push('   var elementE,elementO,elementM,elementMon;                 ');
    scriptCode2.push('   var spaceleft,spaceeach,temp;'                              );
    scriptCode2.push('   var elementAvail,elementCap;                               ');
    scriptCode2.push('   var iOsend=0,iEsend=0,iMsend=0,iMonsend=0;'                 );
    scriptCode2.push('   elementE = document.getElementById("colene");              ');
    scriptCode2.push('   if (elementE) {                                            ');
    scriptCode2.push('       iEnergy=elementE.title;                             ');
    scriptCode2.push('   }                                                          ');
    scriptCode2.push('   elementO = document.getElementById("colorg");              ');
    scriptCode2.push('   if (elementO) {                                            ');
    scriptCode2.push('       iOrganic=elementO.title;                            ');
    scriptCode2.push('   }                                                          ');
    scriptCode2.push('   elementM = document.getElementById("colmin");              ');
    scriptCode2.push('   if (elementM) {                                            ');
    scriptCode2.push('       iMineral=elementM.title;                            ');
    scriptCode2.push('   }                                                          ');
    scriptCode2.push('   elementMon = document.getElementById("colmon");            ');
    scriptCode2.push('   if (elementMon) {                                          ');
    scriptCode2.push('       iMonetary=elementMon.title;                         ');
    scriptCode2.push('   }                                                          ');
    scriptCode2.push('   elementAvail = document.getElementById("avail");           ');
    scriptCode2.push('   if (elementAvail) {                                        ');
    scriptCode2.push('       iAvailable=elementAvail.title;                      ');
    scriptCode2.push('   }                                                          ');
    scriptCode2.push('   elementCap = document.getElementById("rcap");              ');
    scriptCode2.push('   if (elementCap) {                                          ');
    scriptCode2.push('       iCapacity=elementCap.title;                         ');
    scriptCode2.push('   }                                                           ');
    scriptCode2.push('    eleft=iEnergy ;   ');
    scriptCode2.push('    oleft=iOrganic;   ');
    scriptCode2.push('    mleft=iMineral;   ');
    scriptCode2.push('    spaceleft=(iCapacity*iAvailable);   ');
    scriptCode2.push('    spaceeach=Math.floor(spaceleft/3);   ');
    scriptCode2.push('    while(spaceleft>2 && (eleft>0||oleft>0||mleft>0)){    ');
    scriptCode2.push('          spaceeach=Math.floor(spaceleft/3);   ');
    scriptCode2.push('          temp=Math.min(eleft,spaceeach)   ');
    scriptCode2.push('          spaceleft-=temp   ');
    scriptCode2.push('          eleft-=temp   ');
    scriptCode2.push('          iEsend+=temp           ');
    scriptCode2.push('          temp=Math.min(oleft,spaceeach)   ');
    scriptCode2.push('          spaceleft-=temp   ');
    scriptCode2.push('          oleft-=temp   ');
    scriptCode2.push('          iOsend+=temp   ');
    scriptCode2.push('          temp=Math.min(mleft,spaceeach)   ');
    scriptCode2.push('          spaceleft-=temp   ');
    scriptCode2.push('          mleft-=temp   ');
    scriptCode2.push('          iMsend+=temp     ');
    scriptCode2.push('    }   ');
    scriptCode2.push('    while(spaceleft>0 && (eleft>0||oleft>0||mleft>0) ){   ');
    scriptCode2.push('        if (eleft>1){   ');
    scriptCode2.push('                iEsend++;   ');
    scriptCode2.push('                eleft--;   ');
    scriptCode2.push('                spaceleft--;   ');
    scriptCode2.push('            }   ');
    scriptCode2.push('        if (spaceleft>0 && oleft>0){   ');
    scriptCode2.push('            iOsend++;   ');
    scriptCode2.push('            oleft--;   ');
    scriptCode2.push('            spaceleft--;   ');
    scriptCode2.push('            }   ');
    scriptCode2.push('        if (spaceleft>0 && mleft>0){   ');
    scriptCode2.push('            iMsend++;   ');
    scriptCode2.push('            mleft--;   ');
    scriptCode2.push('            spaceleft--;   ');
    scriptCode2.push('            }   ');
    scriptCode2.push('    }   ');
    scriptCode2.push('   var allFields, thisField;'                                 );
    scriptCode2.push('   allFields = document.evaluate('                            );
    scriptCode2.push('       "//input[@type=\'text\']",'                            );
    scriptCode2.push('       document,'                                             );
    scriptCode2.push('       null,'                                                 );
    scriptCode2.push('       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,'             );
    scriptCode2.push('       null);'                                                );
    scriptCode2.push('    for (var i = 0; i < allFields.snapshotLength; i++) {     ');
    scriptCode2.push('        thisField = allFields.snapshotItem(i);               ');
    scriptCode2.push("        if(thisField.name == 'energy' ) {                    ");
    scriptCode2.push('           thisField.value = iEsend;}                        ');
    scriptCode2.push("        else if(thisField.name == 'organic' ) {              ");
    scriptCode2.push('           thisField.value = iOsend;}                        ');
    scriptCode2.push("        else if(thisField.name == 'mineral' ) {              ");
    scriptCode2.push('           thisField.value = iMsend;}                        ');
    scriptCode2.push("        else if(thisField.name == 'monetary' ) {             ");
    scriptCode2.push('           thisField.value = iMonsend;}                      ');
    scriptCode2.push('    }                                                        ');
    scriptCode2.push('  check_spaceport()  ');
    scriptCode2.push('}                                                            ');
    
    // now, we put the script in a new script element in the DOM
    var script2 = document.createElement('script');    // create the script element
    script2.innerHTML = scriptCode2.join('\n');         // add the script code to it
    scriptCode2.length = 0;                            // recover the memory we used to build the script
    document.getElementsByTagName('head')[0].appendChild(script2); 

   var scriptCode3 = new Array();   // this is where we are going to build our new script
   
    // here's the build of the new script, one line at a time
    scriptCode3.push('function shareAll(){                                    ');
    scriptCode3.push('   var iOrganic,iMineral,iEnergy,iMonetary;                   ');
    scriptCode3.push('   var iAvailable;                                            ');
    scriptCode3.push('   var iCapacity;                                             ');
    scriptCode3.push('   var elementE,elementO,elementM,elementMon;                 ');
    scriptCode3.push('   var elementAvail,elementCap;                               ');
    scriptCode3.push('   var shareEOM,shareALL;                                     ');
    scriptCode3.push('   var shareEOMMAX,shareALLMAX;                               ');
    scriptCode3.push('   var iOsend=0,iEsend=0,iMsend=0,iMonsend=0;                         ');
    scriptCode3.push('   elementE = document.getElementById("colene");              ');
    scriptCode3.push('   if (elementE) {                                            ');
    scriptCode3.push('       iEnergy=elementE.title;                             ');
    scriptCode3.push('   }                                                          ');
    scriptCode3.push('   elementO = document.getElementById("colorg");              ');
    scriptCode3.push('   if (elementO) {                                            ');
    scriptCode3.push('       iOrganic=elementO.title;                            ');
    scriptCode3.push('   }                                                          ');
    scriptCode3.push('   elementM = document.getElementById("colmin");              ');
    scriptCode3.push('   if (elementM) {                                            ');
    scriptCode3.push('       iMineral=elementM.title;                            ');
    scriptCode3.push('   }                                                          ');
    scriptCode3.push('   elementMon = document.getElementById("colmon");            ');
    scriptCode3.push('   if (elementMon) {                                          ');
    scriptCode3.push('       iMonetary=elementMon.title;                         ');
    scriptCode3.push('   }                                                          ');
    scriptCode3.push('   elementAvail = document.getElementById("avail");           ');
    scriptCode3.push('   if (elementAvail) {                                        ');
    scriptCode3.push('       iAvailable=elementAvail.title;                      ');
    scriptCode3.push('   }                                                          ');
    scriptCode3.push('   elementCap = document.getElementById("rcap");              ');
    scriptCode3.push('   if (elementCap) {                                          ');
    scriptCode3.push('       iCapacity=elementCap.title;                         ');
    scriptCode3.push('   }                                                           ');
    scriptCode3.push('   shareEOM=(iAvailable*iCapacity);                          ');
    scriptCode3.push('   shareEOM=Math.floor(shareEOM/4);                          ');
    scriptCode3.push('   iEsend=Math.min(iEnergy,shareEOM);                        ');
    scriptCode3.push('   iOsend=Math.min(iOrganic,shareEOM);                       ');
    scriptCode3.push('   iMsend=Math.min(iMineral,shareEOM);                      ');
    scriptCode3.push('   iMonsend=Math.min(iMonetary,shareEOM);                      ');
    scriptCode3.push('   var allFields, thisField;'                                 );
    scriptCode3.push('   allFields = document.evaluate('                            );
    scriptCode3.push('       "//input[@type=\'text\']",'                            );
    scriptCode3.push('       document,'                                             );
    scriptCode3.push('       null,'                                                 );
    scriptCode3.push('       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,'             );
    scriptCode3.push('       null);'                                                );
    scriptCode3.push('    for (var i = 0; i < allFields.snapshotLength; i++) {     ');
    scriptCode3.push('        thisField = allFields.snapshotItem(i);               ');
    scriptCode3.push("        if(thisField.name == 'energy' ) {                    ");
    scriptCode3.push('           thisField.value = iEsend;}                        ');
    scriptCode3.push("        else if(thisField.name == 'organic' ) {              ");
    scriptCode3.push('           thisField.value = iOsend;}                        ');
    scriptCode3.push("        else if(thisField.name == 'mineral' ) {              ");
    scriptCode3.push('           thisField.value = iMsend;}                        ');
    scriptCode3.push("        else if(thisField.name == 'monetary' ) {             ");
    scriptCode3.push('           thisField.value = iMonsend;}                      ');
    scriptCode3.push('    }                                                        ');
    scriptCode3.push('  check_spaceport()  ');
    scriptCode3.push('}                                                            ');
    
    // now, we put the script in a new script element in the DOM
    var script3 = document.createElement('script');    // create the script element
    script3.innerHTML = scriptCode3.join('\n');         // add the script code to it
    scriptCode3.length = 0;                            // recover the memory we used to build the script
    document.getElementsByTagName('head')[0].appendChild(script3); 


    var scriptCode4 = new Array();   // this is where we are going to build our new script
    // here's the build of the new script, one line at a time
    scriptCode4.push('function shareMax(){                                    ');
    scriptCode4.push('   var iOrganic,iMineral,iEnergy,iMonetary;                   ');
    scriptCode4.push('   var eleft,oleft,mleft,monleft;'                             );
    scriptCode4.push('   var iAvailable;                                            ');
    scriptCode4.push('   var iCapacity;                                             ');
    scriptCode4.push('   var elementE,elementO,elementM,elementMon;                 ');
    scriptCode4.push('   var spaceleft,spaceeach,temp;'                              );
    scriptCode4.push('   var elementAvail,elementCap;                               ');
    scriptCode4.push('   var iOsend=0,iEsend=0,iMsend=0,iMonsend=0;'                 );
    scriptCode4.push('   elementE = document.getElementById("colene");              ');
    scriptCode4.push('   if (elementE) {                                            ');
    scriptCode4.push('       iEnergy=elementE.title;                             ');
    scriptCode4.push('   }                                                          ');
    scriptCode4.push('   elementO = document.getElementById("colorg");              ');
    scriptCode4.push('   if (elementO) {                                            ');
    scriptCode4.push('       iOrganic=elementO.title;                            ');
    scriptCode4.push('   }                                                          ');
    scriptCode4.push('   elementM = document.getElementById("colmin");              ');
    scriptCode4.push('   if (elementM) {                                            ');
    scriptCode4.push('       iMineral=elementM.title;                            ');
    scriptCode4.push('   }                                                          ');
    scriptCode4.push('   elementMon = document.getElementById("colmon");            ');
    scriptCode4.push('   if (elementMon) {                                          ');
    scriptCode4.push('       iMonetary=elementMon.title;                         ');
    scriptCode4.push('   }                                                          ');
    scriptCode4.push('   elementAvail = document.getElementById("avail");           ');
    scriptCode4.push('   if (elementAvail) {                                        ');
    scriptCode4.push('       iAvailable=elementAvail.title;                      ');
    scriptCode4.push('   }                                                          ');
    scriptCode4.push('   elementCap = document.getElementById("rcap");              ');
    scriptCode4.push('   if (elementCap) {                                          ');
    scriptCode4.push('       iCapacity=elementCap.title;                         ');
    scriptCode4.push('   }                                                           ');
    scriptCode4.push('    eleft=iEnergy ;   ');
    scriptCode4.push('    oleft=iOrganic;   ');
    scriptCode4.push('    mleft=iMineral;   ');
    scriptCode4.push('    monleft=iMonetary;   ');
    scriptCode4.push('    spaceleft=(iCapacity*iAvailable);   ');
    scriptCode4.push('    while(spaceleft>3 && (eleft>0||oleft>0||mleft>0||monleft>0)){    ');
    scriptCode4.push('          spaceeach=Math.floor(spaceleft/4);   ');
    scriptCode4.push('          temp=Math.min(eleft,spaceeach)   ');
    scriptCode4.push('          spaceleft-=temp   ');
    scriptCode4.push('          eleft-=temp   ');
    scriptCode4.push('          iEsend+=temp           ');
    scriptCode4.push('          temp=Math.min(oleft,spaceeach)   ');
    scriptCode4.push('          spaceleft-=temp   ');
    scriptCode4.push('          oleft-=temp   ');
    scriptCode4.push('          iOsend+=temp   ');
    scriptCode4.push('          temp=Math.min(mleft,spaceeach)   ');
    scriptCode4.push('          spaceleft-=temp   ');
    scriptCode4.push('          mleft-=temp   ');
    scriptCode4.push('          iMsend+=temp     ');
    scriptCode4.push('          temp=Math.min(monleft,spaceeach)   ');
    scriptCode4.push('          spaceleft-=temp   ');
    scriptCode4.push('          monleft-=temp   ');
    scriptCode4.push('          iMonsend+=temp     ');
    scriptCode4.push('    }   ');
    scriptCode4.push('    while(spaceleft>0 && (eleft>0||oleft>0||mleft>0||monleft>0)){   ');
    scriptCode4.push('        if (eleft>1){   ');
    scriptCode4.push('                iEsend++;   ');
    scriptCode4.push('                eleft--;   ');
    scriptCode4.push('                spaceleft--;   ');
    scriptCode4.push('            }   ');
    scriptCode4.push('        if (spaceleft>0 && oleft>0){   ');
    scriptCode4.push('            iOsend++;   ');
    scriptCode4.push('            oleft--;   ');
    scriptCode4.push('            spaceleft--;   ');
    scriptCode4.push('            }   ');
    scriptCode4.push('        if (spaceleft>0 && mleft>0){   ');
    scriptCode4.push('            iMsend++;   ');
    scriptCode4.push('            mleft--;   ');
    scriptCode4.push('            spaceleft--;   ');
    scriptCode4.push('            }   ');
    scriptCode4.push('        if (spaceleft>0 && monleft>0){   ');
    scriptCode4.push('            iMonsend++;   ');
    scriptCode4.push('            monleft--;   ');
    scriptCode4.push('            spaceleft--;   ');
    scriptCode4.push('            }   ');
    scriptCode4.push('    }   ');
    scriptCode4.push('   var allFields, thisField;'                                 );
    scriptCode4.push('   allFields = document.evaluate('                            );
    scriptCode4.push('       "//input[@type=\'text\']",'                            );
    scriptCode4.push('       document,'                                             );
    scriptCode4.push('       null,'                                                 );
    scriptCode4.push('       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,'             );
    scriptCode4.push('       null);'                                                );
    scriptCode4.push('    for (var i = 0; i < allFields.snapshotLength; i++) {     ');
    scriptCode4.push('        thisField = allFields.snapshotItem(i);               ');
    scriptCode4.push("        if(thisField.name == 'energy' ) {                    ");
    scriptCode4.push('           thisField.value = iEsend;}                        ');
    scriptCode4.push("        else if(thisField.name == 'organic' ) {              ");
    scriptCode4.push('           thisField.value = iOsend;}                        ');
    scriptCode4.push("        else if(thisField.name == 'mineral' ) {              ");
    scriptCode4.push('           thisField.value = iMsend;}                        ');
    scriptCode4.push("        else if(thisField.name == 'monetary' ) {             ");
    scriptCode4.push('           thisField.value = iMonsend;}                      ');
    scriptCode4.push('    }                                                        ');
     scriptCode4.push('  check_spaceport()  ');
    scriptCode4.push('}                                                            ');
    
    // now, we put the script in a new script element in the DOM
    var script4 = document.createElement('script');    // create the script element
    script4.innerHTML = scriptCode4.join('\n');         // add the script code to it
    scriptCode4.length = 0;                            // recover the memory we used to build the script
    document.getElementsByTagName('head')[0].appendChild(script4); 

var scriptCode5 = new Array();   // this is where we are going to build our new script
    // here's the build of the new script, one line at a time
  
 
    scriptCode5.push('    function addsuboneship(resource,updn){              ');
    scriptCode5.push('       var elementE,elementO,elementM,elementMon;                     ');
    scriptCode5.push('       var iOrganic,iMineral,iEnergy,iMonetary;   ');
    scriptCode5.push('       var eleft,oleft,mleft,monleft;//resource left to send      ');
    scriptCode5.push('       var esend,osend,msend,monsend;//resources being sent      ');
    scriptCode5.push('       var iAvailable;               //total ships avail                   ');
    scriptCode5.push('       var iCapacity;                //capacity of each ship                ');
    scriptCode5.push('       var spaceleft,spaceeach,temp;       ');
    scriptCode5.push('       var elementAvail,elementCap;  //the elements for iavail and icap      ');
    scriptCode5.push('       var totalsending;             //total being sent      ');
    scriptCode5.push('       var ebox,obox,mbox,monbox;    //the textboxs      ');
    scriptCode5.push('       var usedcap,unusedcap;       //how much left to fill on current filling ship      ');
    scriptCode5.push('       var toloadship;       ');
    scriptCode5.push('       var toemptyship;    ');
    scriptCode5.push('       var amounttoadd;              //how much to add(or subtract)         ');
    scriptCode5.push('       elementE = document.getElementById("colene");   ');
    scriptCode5.push('        if (elementE) {   ');
    scriptCode5.push('         iEnergy=Number(elementE.title);   ');
    scriptCode5.push('        }   ');
    scriptCode5.push('        elementO = document.getElementById("colorg");   ');
    scriptCode5.push('        if (elementO) {   ');
    scriptCode5.push('            iOrganic=Number(elementO.title);   ');
    scriptCode5.push('        }   ');
    scriptCode5.push('        elementM = document.getElementById("colmin");   ');
    scriptCode5.push('        if (elementM) {   ');
    scriptCode5.push('            iMineral=Number(elementM.title);   ');
    scriptCode5.push('        }   ');
    scriptCode5.push('        elementMon = document.getElementById("colmon");   ');
    scriptCode5.push('        if (elementMon) {   ');
    scriptCode5.push('            iMonetary=Number(elementMon.title);   ');
    scriptCode5.push('        }   ');
    scriptCode5.push('       elementAvail = document.getElementById("avail");                 ');
    scriptCode5.push('       if (elementAvail) {                                              ');
    scriptCode5.push('           iAvailable=Number(elementAvail.title);                            ');
    scriptCode5.push('       }                                                                ');
    scriptCode5.push('       elementCap = document.getElementById("rcap");                    ');
    scriptCode5.push('       if (elementCap) {                                                ');
    scriptCode5.push('           iCapacity=Number(elementCap.title);                               ');
    scriptCode5.push('       }      ');
    scriptCode5.push('       ebox= document.getElementById("energy");       ');
    scriptCode5.push('       obox= document.getElementById("organic");       ');
    scriptCode5.push('       mbox= document.getElementById("mineral");       ');
    scriptCode5.push('       monbox= document.getElementById("monetary");       ');
    scriptCode5.push('       esend=Number(ebox.value)      ');
    scriptCode5.push('       osend=Number(obox.value)      ');
    scriptCode5.push('       msend=Number(mbox.value)      ');
    scriptCode5.push('       monsend=Number(monbox.value)      ');
    scriptCode5.push('       totalsending= esend+osend+msend+monsend;      ');
    scriptCode5.push('       unusedcap= iCapacity - totalsending%iCapacity      ');
    scriptCode5.push('       usedcap=iCapacity-unusedcap;   ');
    scriptCode5.push('       eleft=iEnergy-esend;         ');
    scriptCode5.push('       oleft=iOrganic-esend;         ');
    scriptCode5.push('       mleft=iMineral-esend;         ');
    scriptCode5.push('       monleft=iMonetary-esend;      ');
    scriptCode5.push('       spaceleft=(iCapacity*iAvailable)-totalsending;//cansend-sending         ');
    scriptCode5.push('       amounttoadd=Math.min(spaceleft,eleft);      ');
    scriptCode5.push('       addtrue=updn>0;   ');
    scriptCode5.push('       if (unusedcap==0){   ');
    scriptCode5.push('            toloadship=iCapacity;   ');
    scriptCode5.push('       }      ');
    scriptCode5.push('       else{   ');
    scriptCode5.push('            toloadship=unusedcap;   ');
    scriptCode5.push('       }   ');
    scriptCode5.push('       if (usedcap==0){   ');
    scriptCode5.push('            toemptyship=iCapacity;   ');
    scriptCode5.push('       }      ');
    scriptCode5.push('       else{   ');
    scriptCode5.push('            toemptyship=usedcap;   ');
    scriptCode5.push('       }    ');
    scriptCode5.push('       if (resource==="energy"){      ');
    scriptCode5.push('          if (addtrue){//up    ');
    scriptCode5.push('            amounttoadd=Math.min(spaceleft,toloadship,eleft);      ');
    scriptCode5.push('            ebox.value=esend+amounttoadd;//add the value      ');
    scriptCode5.push('          }      ');
    scriptCode5.push('          else{    ');
    scriptCode5.push('             amounttoadd=Math.min(toemptyship,iCapacity,esend);      ');
    scriptCode5.push('             ebox.value=esend-amounttoadd;      ');
    scriptCode5.push('          }      ');
    scriptCode5.push('       }      ');
    scriptCode5.push('       else if (resource==="organic")      ');
    scriptCode5.push('       {      ');
    scriptCode5.push('          if (addtrue){//up      ');
    scriptCode5.push('            amounttoadd=Math.min(spaceleft,toloadship,oleft);      ');
    scriptCode5.push('            obox.value=osend+ amounttoadd;//add the value      ');
    scriptCode5.push('          }      ');
    scriptCode5.push('          else{      ');
    scriptCode5.push('             amounttoadd=Math.min(toemptyship,iCapacity,osend);      ');
    scriptCode5.push('             obox.value=osend-amounttoadd;      ');
    scriptCode5.push('            }      ');
    scriptCode5.push('       }      ');
    scriptCode5.push('       else if (resource==="mineral"){      ');
    scriptCode5.push('          if (addtrue){//up      ');
    scriptCode5.push('            amounttoadd=Math.min(spaceleft,toloadship,mleft);      ');
    scriptCode5.push('            mbox.value=msend+amounttoadd;//add the value      ');
    scriptCode5.push('          }      ');
    scriptCode5.push('          else{      ');
    scriptCode5.push('             amounttoadd=Math.min(toemptyship,iCapacity,msend);      ');
    scriptCode5.push('             mbox.value=msend-amounttoadd;      ');
    scriptCode5.push('            }      ');
    scriptCode5.push('       }      ');
    scriptCode5.push('       else if (resource==="monetary"){      ');
    scriptCode5.push('              if (addtrue){//up      ');
    scriptCode5.push('            amounttoadd=Math.min(spaceleft,toloadship,monleft);      ');
    scriptCode5.push('            monbox.value=monsend+amounttoadd;//add the value      ');
    scriptCode5.push('          }      ');
    scriptCode5.push('          else{      ');
    scriptCode5.push('             amounttoadd=Math.min(toemptyship,iCapacity,monsend);      ');
    scriptCode5.push('             monbox.value=monsend-amounttoadd;      ');
    scriptCode5.push('            }      ');
    scriptCode5.push('       }      ');
    scriptCode5.push('check_spaceport()}   ');
    
    // now, we put the script in a new script element in the DOM
    var script5 = document.createElement('script');    // create the script element
    script5.innerHTML = scriptCode5.join('\n');         // add the script code to it
    scriptCode5.length = 0;                            // recover the memory we used to build the script
    document.getElementsByTagName('head')[0].appendChild(script5); 



//addlinks

/*
var elementClear = document.getElementsByClassName('orange');//works becasue clear link is only orange on page
var elementTargetRow;
if (elementClear[0]) {//test to be sure
    elementTargetCell=elementClear[0].parentNode.parentNode
    elementTargetCell.colSpan=1 //seting the clear link to 1 span
    var newElement = document.createElement("td");
    elementTargetCell.parentNode.insertBefore(newElement, elementTargetCell.nextSibling);
    elementTargetCell.nextSibling.innerHTML= '<td align="center" colspan="1"><a href="javascript:shareEOMMax();"><span class="orange"><b>FillEOMMax</b></span></a></td>';
}*/

var elementClear = document.getElementsByClassName('orange');//works becasue clear link is only orange on page
var elementTargetRow;
if (elementClear[0]) {//test to be sure
    elementTargetCell=elementClear[0].parentNode.parentNode
 //   elementTargetCell.colSpan=1 //seting the clear link to 1 span
    
    elementTargetRow=elementTargetCell.parentNode;
    var newElement = document.createElement("tr");
    elementTargetRow.parentNode.insertBefore(newElement, elementTargetRow);//insert a row before current one

    elementTargetRow=elementTargetRow.previousSibling; //shift to newly created row
    var newElement2 = document.createElement("td");//make a cell
    var newElement3 = document.createElement("td");//make a cell
    var newElement4 = document.createElement("td");//make a cell
    var newElement5 = document.createElement("td");//make a cell
    var newElement6 = document.createElement("td");//make a cell
    
 elementTargetRow.insertBefore(newElement5, elementTargetRow.firstChild);
    elementTargetCell=elementTargetRow.firstChild;   //shift to newly created cell
    elementTargetCell.colSpan=1
    elementTargetCell.align='center'
    elementTargetCell.innerHTML= '<a href="javascript:shareMax();"><span class="orange"><b>Fill MAX</b></span></a>';
   
    elementTargetRow.insertBefore(newElement4, elementTargetRow.firstChild);
    elementTargetCell=elementTargetRow.firstChild;   //shift to newly created cell
    elementTargetCell.colSpan=1
    elementTargetCell.align='center'
    elementTargetCell.innerHTML= '<a href="javascript:shareAll();"><span class="orange"><b>Fill All</b></span></a>';
   
     elementTargetRow.insertBefore(newElement2, elementTargetRow.firstChild);
    elementTargetCell=elementTargetRow.firstChild;   //shift to newly created cell
    elementTargetCell.colSpan=1
    elementTargetCell.align='center'
    elementTargetCell.innerHTML= '<a href="javascript:shareEOMMax();"><span class="orange"><b>Fill Max EOM</b></span></a>';
 
    elementTargetRow.insertBefore(newElement3, elementTargetRow.firstChild);
    elementTargetCell=elementTargetRow.firstChild;   //shift to newly created cell
    elementTargetCell.colSpan=1
    elementTargetCell.align='center'
    elementTargetCell.innerHTML= '<a href="javascript:shareEOM();"><span class="orange"><b>Fill EOM</b></span></a>';
}

//add the + and -
var Ecell=document.getElementById("energy").parentNode;
var Ocell=document.getElementById("organic").parentNode;
var Mcell=document.getElementById("mineral").parentNode;
var Moncell=document.getElementById("monetary").parentNode;

Edn='<a href="javascript:addsuboneship(\'energy\',-1);"><span class="orange"><b>-</b></span></a>';
Eup='<a href="javascript:addsuboneship(\'energy\',1);"><span class="orange"><b>+</b></span></a>';

Odn='<a href="javascript:addsuboneship(\'organic\',-1);"><span class="orange"><b>-</b></span></a>';
Oup='<a href="javascript:addsuboneship(\'organic\',1);"><span class="orange"><b>+</b></span></a>';

Mdn='<a href="javascript:addsuboneship(\'mineral\',-1);"><span class="orange"><b>-</b></span></a>';
Mup='<a href="javascript:addsuboneship(\'mineral\',1);"><span class="orange"><b>+</b></span></a>';

Mondn='<a href="javascript:addsuboneship(\'monetary\',-1);"><span class="orange"><b>-</b></span></a>';
Monup='<a href="javascript:addsuboneship(\'monetary\',1);"><span class="orange"><b>+</b></span></a>';


Ecell.innerHTML = Edn + Ecell.innerHTML + Eup;
Ocell.innerHTML = Odn + Ocell.innerHTML + Oup;
Mcell.innerHTML = Mdn + Mcell.innerHTML + Mup;
Moncell.innerHTML = Mondn + Moncell.innerHTML + Monup;


})();
