//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ForumThread Script", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         ForumThread Script
// @namspace     http://userscripts.org/
// @description  Fórumok szálasítására szolgáló JavaScript
// @version      1.1
// @include      *


// ==/UserScript==

var forumKeys= new Array("post-user","postData","postbody","author","author_info",
"post","art_h","avatar","msg","content_txt","useragent","thread","uzenet","forumhsz","message","comment","comment-text","user_id","bigusername","forum");

var loc = location.href;
var site = loc.substring(0,loc.lastIndexOf("/")+1);
var host = window.location.protocol+'//'+window.location.host;
var FORUM = false; //IGAZ HA FORUM OLDALON VAGYUNK
var fullTags = new Array(); //TAGEK RENDEZTLEN TÖMBBJE
var orderedFullTags = new Array(); //TAGEK TÖMBBJE RENDEZVE
var commentTags = new Array(); //HOZZÁSZÓLÁS TAGEK TÖMBBJE
var tagsStart =  new Array();   //fulltags tömbben hol kezdődik a tag
var fullTagsValues = new Array(); //TAGEK ÉS ÉRTÉKEINEK TÖMBBJE RENDEZETLENUL
var orderedFullTagsValues = new Array(); //TAGEK ÉS ÉRTÉKEINEK TÖMBBJE RENDEZVE
var WRONG=false; //ha nem jól adta meg a felhasználó a kódot
var SUCCESS=true; //igaz ha sikerült a szálasítás
var max = 0; //legtöbb 3nél több tagsorozat
var maxPos = 0; // maxnak a helye a tömbben
var lines=""; //felhasználó által megadott kód sorok


//ESEMENY KEZELO
  function addEventHandler(obj, eventType, handler) {
     if (obj.addEventListener) {
         obj.addEventListener(eventType, handler, true);
         return true;
     } else if (obj.attachEvent) {
         var r = obj.attachEvent("on"+eventType, handler);
         return r;
     } else {
         return false;
     }
  }

//MENÜ FELÉPÍTÉSE
function menuBuild() {
   //ARROW
   var btnThread = document.createElement("img");
   btnThread.src='http://nrdzsi.uw.hu/buttfr1.png';
   btnThread.setAttribute('id', 'btnThread0');
   btnThread.setAttribute('style','position:fixed; cursor:pointer; z-index:999; width:100px;  top:3px; right:55px;');
   function buttonClick() {
         main();
   }
   function mouseOverf() {
         button.src='http://nrdzsi.uw.hu/buttfr2.png';
         btnThread.src='http://nrdzsi.uw.hu/buttfr2.png';
   }
   function mouseOutf() {
         button.src='http://nrdzsi.uw.hu/buttfr1.png';
         btnThread.src='http://nrdzsi.uw.hu/buttfr1.png';
   }
   addEventHandler(btnThread, 'mouseover', mouseOverf);
   addEventHandler(btnThread, 'mouseout', mouseOutf);
   addEventHandler(btnThread, 'click', buttonClick);
   if (host=="http://forum.androidhungary.com" || host=="http://forum.yox.hu" || host=="http://forum.index.hu" || host=="http://sgforum.hu" || host=="http://forum.netmania.hu" )
       btnThread.style.visibility='visible';
   else
       btnThread.style.visibility='hidden';
   document.body.insertBefore(btnThread, document.body.firstChild);
   var img2= document.createElement("img");
   img2.src='http://nrdzsi.uw.hu/arrow_down.png';
   img2.setAttribute('style','position:fixed; cursor:pointer; z-index:999; width:50px; height:50px; top:3px; right:3px;');
   img2.setAttribute('id', 'downArrow');
   document.body.insertBefore(img2, document.body.firstChild);
   function showButton() {
    if (host=="http://forum.androidhungary.com" || host=="http://forum.yox.hu" || host=="http://forum.index.hu" || host=="http://sgforum.hu" || host=="http://forum.netmania.hu" )
       btnThread.style.visibility='visible';
   } 
   function downClick() {
              document.getElementById('myForm').style.visibility='visible';
              document.getElementById('downArrow').style.visibility='hidden';
              document.getElementById('btnThread0').style.visibility='hidden';    
              document.getElementById('rdHand').checked=true;
              document.getElementById('rdAuto').checked=false;
              textEnable();
   }
   function leftClick() {
              document.getElementById('myForm').style.visibility='hidden';
              document.getElementById('downArrow').style.visibility='visible';
              showButton();
              document.getElementById('rdAuto').checked=true;
              document.getElementById('rdHand').checked=false;
   }
   addEventHandler(img2, 'click', downClick);
   //DIV
   var form = document.createElement('DIV');
   form.setAttribute('Name', 'form');
   form.setAttribute('id', 'myForm');
   form.setAttribute('style','position:fixed;  z-index:999;  top:0; bottom:0; left:0; right:0; height:100px; width:100%;');
   form.style.visibility='hidden';
   //TABLE
   var tbl     = document.createElement("table");
   var tblBody = document.createElement("tbody");
   tbl.setAttribute('style','float: left; background-color: #ffedaf;  border-style:double; -moz-border-radius: 15px; border-radius: 15px;');
   //ROW1
   var rowTitle = document.createElement("tr");
   var tdTitle0 = document.createElement("td");
   var tdTitle1 = document.createElement("td");
   var tdTitle2 = document.createElement("td");
   var tdTitle3 = document.createElement("td");
   tdTitle0.setAttribute("Colspan", "3");
   tdTitle0.setAttribute("align", "right");
   var title = document.createElement('label');
   title.setAttribute('style','font-size:28px; font-family:arial; font-color:black; font-weight:bold;');
   var text = document.createTextNode(site+' szálasítása');
   title.appendChild(text);
   tdTitle0.appendChild(title);
   tdTitle3.setAttribute('style','width:10%;');
   tdTitle3.setAttribute("align", "right");
   var img0 = document.createElement("img");
   img0.src='http://nrdzsi.uw.hu/arrow_left.png';
   img0.setAttribute('style','cursor:pointer; width:50px; height:50px ;');
   addEventHandler(img0, 'click', leftClick);
   tdTitle3.appendChild(img0);
   rowTitle.appendChild(tdTitle0);
   rowTitle.appendChild(tdTitle1);
   rowTitle.appendChild(tdTitle2);
   rowTitle.appendChild(tdTitle3);
   tblBody.appendChild(rowTitle);
   //ROW2
   var rowMain = document.createElement("tr");
   var tdLeft = document.createElement("td");
   var tdAuto = document.createElement("td");
   var tdHand = document.createElement("td");
   var tdButton = document.createElement("td");
   tdLeft.setAttribute('style','width:20%; border-style:double;');
   tdAuto.setAttribute('style','width:20%; border-style:double;');
   tdHand.setAttribute('style','width:30%; border-style:double;');
   tdButton.setAttribute('style','width:30%; border-style:double; ');
   //TD1
   tdLeft.setAttribute("valign", "middle");
   tdLeft.setAttribute("align", "center");
   var img1 = document.createElement("img");
   img1.src='http://nrdzsi.uw.hu/gombolyag.png';
   img1.setAttribute('style','width:200px; height:150px ;');
   tdLeft.appendChild(img1);
   rowMain.appendChild(tdLeft);
   //TD2
   var lbl1 = document.createElement('label');
   lbl1.setAttribute('style','font-size:14px; font-family:times new roman; font-color:black font-style:italic; text-decoration:underline; margin-left : 5px;');
   text = document.createTextNode('szálasítás típusa:');
   lbl1.appendChild(text);
   tdAuto.appendChild(lbl1);
   tdAuto.appendChild(document.createElement('BR'));
   tdAuto.setAttribute("align", "left");
   //RADIOBUTTON
   radioField = document.createElement('INPUT');
   radioField.type = 'radio';
   radioField.value = 'true';
   radioField.setAttribute('Checked', 'true');
   radioField.setAttribute('Name', 'myRadio');
   radioField.setAttribute('id', 'rdAuto');
   addEventHandler(radioField, 'click', rbClick);
   function textEnable() {
           document.getElementById('preCommentIdText').disabled=false;
           document.getElementById('preCommentIdText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:white;');
           document.getElementById('commentIdText').disabled=false;
           document.getElementById('commentIdText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:white;');
           document.getElementById('mainText').disabled=false;
           document.getElementById('mainText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:white;');
           document.getElementById('userGroupText').disabled=false;
           document.getElementById('userGroupText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:white;');
           document.getElementById('otherText').disabled=false;
           document.getElementById('otherText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:white;');
           document.getElementById('signatureText').disabled=false;
           document.getElementById('signatureText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:white;');
           document.getElementById('avatarText').disabled=false;
           document.getElementById('avatarText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:white;');
   }
   function rbClick() {
       if (document.getElementById('rdAuto').checked) {
           document.getElementById('preCommentIdText').disabled=true;
           document.getElementById('preCommentIdText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:#CCCCCC;');
           document.getElementById('commentIdText').disabled=true;
           document.getElementById('commentIdText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:#CCCCCC;');
           document.getElementById('mainText').disabled=true;
           document.getElementById('mainText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:#CCCCCC;');
           document.getElementById('userGroupText').disabled=true;
           document.getElementById('userGroupText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:#CCCCCC;');
           document.getElementById('otherText').disabled=true;
           document.getElementById('otherText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:#CCCCCC;');
           document.getElementById('signatureText').disabled=true;
           document.getElementById('signatureText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:#CCCCCC;');
           document.getElementById('avatarText').disabled=true;
           document.getElementById('avatarText').setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px; background-color:#CCCCCC;');
       }
       else
           textEnable();
   }
   tdAuto.appendChild(radioField);
   tdAuto.appendChild(document.createTextNode('automatikus'));
   tdAuto.appendChild(document.createElement('BR'));
   radioField2 = document.createElement('INPUT');
   radioField2.type = 'radio';
   radioField2.setAttribute('Name', 'myRadio');
   radioField2.setAttribute('id', 'rdHand');
   radioField2.setAttribute('Checked', 'false');
   addEventHandler(radioField2, 'click', rbClick);
   tdAuto.appendChild(radioField2);
   tdAuto.appendChild(document.createTextNode('kézi'));
   tdAuto.appendChild(document.createElement('BR'));
   tdAuto.appendChild(document.createElement('HR'));
   //TD1 checkbox
   var lbl2 = document.createElement('label');
   lbl2.setAttribute('style','font-size:14px; font-family:times new roman; font-color:black font-style:italic; text-decoration:underline; margin-left : 5px;');
   text = document.createTextNode('sz\u0171rés:');
   lbl2.appendChild(text);
   tdAuto.appendChild(lbl2);
   tdAuto.appendChild(document.createElement('BR'));
   checkbox = document.createElement('INPUT');
   checkbox.type = 'checkbox';
   checkbox.setAttribute('Name', 'myCheckbox');
   checkbox.setAttribute('id', 'cbAvatar');
   tdAuto.appendChild(checkbox);
   tdAuto.appendChild(document.createTextNode('Avatár'));
   tdAuto.appendChild(document.createElement('BR'));
   checkbox = document.createElement('INPUT');
   checkbox.type = 'checkbox';
   checkbox.setAttribute('Name', 'myCheckbox');
   checkbox.setAttribute('id', 'cbSignature');
   tdAuto.appendChild(checkbox);
   tdAuto.appendChild(document.createTextNode('Aláírás'));
   tdAuto.appendChild(document.createElement('BR'));
   checkbox = document.createElement('INPUT');
   checkbox.type = 'checkbox';
   checkbox.setAttribute('Name', 'myCheckbox');
   checkbox.setAttribute('id', 'cbUserGroup');
   tdAuto.appendChild(checkbox);
   tdAuto.appendChild(document.createTextNode('Felhasználó típusa'));
   tdAuto.appendChild(document.createElement('BR'));
   checkbox = document.createElement('INPUT');
   checkbox.type = 'checkbox';
   checkbox.setAttribute('Name', 'myCheckbox');
   checkbox.setAttribute('id', 'cbOther');
   tdAuto.appendChild(checkbox);
   tdAuto.appendChild(document.createTextNode('Egyéb (pl.regisztráció ideje)'));
   tdAuto.appendChild(document.createElement('BR'));
   rowMain.appendChild(tdAuto);
   //TD2
   tdHand.setAttribute("valign", "bottom");
   tdHand.setAttribute("align", "left");
   var lbl3 = document.createElement('label');
   lbl3.setAttribute('style','font-size:12px; font-family:times new roman;    font-color:black font-style:bold; text-decoration:underline; margin-left : 50px;');
   text = document.createTextNode('Írja be a fórum bels\u0151 kódját (pl.: DIV class="author" )');
   lbl3.appendChild(text);
   tdHand.appendChild(lbl3);
   tdHand.appendChild(document.createElement('BR'));
   tdHand.appendChild(document.createElement('BR'));
   //TEXTFIELDS
   text = document.createTextNode('F\u0151 Tag:     ');
   var lblMainTag = document.createElement('label');
   lblMainTag.setAttribute('style','font-size:12px; font-family:times new roman;     font-color:black font-style:bold; margin-left : 10px;');
   lblMainTag.appendChild(text);
   tdHand.appendChild(lblMainTag);
   tfMain=document.createElement('INPUT');
   tfMain.type= 'textfield';
   tfMain.setAttribute('id', 'mainText');
   tfMain.setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px');
   tfMain.setAttribute('value', 'Nincs kitöltve'); 
   tdHand.appendChild(tfMain);
   tdHand.appendChild(document.createElement('BR'));
   //---
   text = document.createTextNode('Hozzászólás ID Tag: ');
   var lblCommentId = document.createElement('label');
   lblCommentId.setAttribute('style','font-size:12px; font-family:times new roman;     font-color:black font-style:bold; margin-left : 10px;');
   lblCommentId.appendChild(text);
   tdHand.appendChild(lblCommentId);
   tfCommentId=document.createElement('INPUT');
   tfCommentId.type= 'textfield';
   tfCommentId.setAttribute('id', 'commentIdText');
   tfCommentId.setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px');
   tfCommentId.setAttribute('value', 'Nincs kitöltve');
   tdHand.appendChild(tfCommentId);
   tdHand.appendChild(document.createElement('BR'));
   //---
   text = document.createTextNode('El\u0151zmény ID Tag:    ');
   var lblPreCommentId = document.createElement('label');
   lblPreCommentId.setAttribute('style','font-size:12px; font-family:times new roman;     font-color:black font-style:bold; margin-left : 10px;');
   lblPreCommentId.appendChild(text);
   tdHand.appendChild(lblPreCommentId);
   tfPreCommentId=document.createElement('INPUT');
   tfPreCommentId.type= 'textfield';
   tfPreCommentId.setAttribute('id', 'preCommentIdText');
   tfPreCommentId.setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px');
   tfPreCommentId.setAttribute('value', 'Nincs kitöltve');
   tdHand.appendChild(tfPreCommentId);
   tdHand.appendChild(document.createElement('BR'));
   //---
   text = document.createTextNode('Avatár Tag:    ');
   var lblAvatar = document.createElement('label');
   lblAvatar.setAttribute('style','font-size:12px; font-family:times new roman;     font-color:black font-style:bold; margin-left : 10px;');
   lblAvatar.appendChild(text);
   tdHand.appendChild(lblAvatar);
   tfAvatar=document.createElement('INPUT');
   tfAvatar.type= 'textfield';
   tfAvatar.setAttribute('id', 'avatarText');
   tfAvatar.setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px');
   tfAvatar.setAttribute('value', 'Nincs kitöltve');
   tdHand.appendChild(tfAvatar);
   tdHand.appendChild(document.createElement('BR'));
   //---
   text = document.createTextNode('Aláírás Tag:    ');
   var lblSignature = document.createElement('label');
   lblSignature.setAttribute('style','font-size:12px; font-family:times new roman;     font-color:black font-style:bold; margin-left : 10px;');
   lblSignature.appendChild(text);
   tdHand.appendChild(lblSignature);
   tfSignature=document.createElement('INPUT');
   tfSignature.type= 'textfield';
   tfSignature.setAttribute('id', 'signatureText');
   tfSignature.setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px');
   tfSignature.setAttribute('value', 'Nincs kitöltve');
   tdHand.appendChild(tfSignature);
   tdHand.appendChild(document.createElement('BR'));
   //---
   text = document.createTextNode('Felhasználó típusa Tag:    ');
   var lblUserGroup = document.createElement('label');
   lblUserGroup.setAttribute('style','font-size:12px; font-family:times new roman;     font-color:black font-style:bold; margin-left : 10px;');
   lblUserGroup.appendChild(text);
   tdHand.appendChild(lblUserGroup);
   tfUserGroup=document.createElement('INPUT');
   tfUserGroup.type= 'textfield';
   tfUserGroup.setAttribute('id', 'userGroupText');
   tfUserGroup.setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px');
   tfUserGroup.setAttribute('value', 'Nincs kitöltve');
   tdHand.appendChild(tfUserGroup);
   tdHand.appendChild(document.createElement('BR'));
   //---
   text = document.createTextNode('Egyéb infók Tag:  ');
   var lblOther = document.createElement('label');
   lblOther.setAttribute('style','font-size:12px; font-family:times new roman;     font-color:black font-style:bold; margin-left : 10px;');
   lblOther.appendChild(text);
   tdHand.appendChild(lblOther);
   tfOther=document.createElement('INPUT');
   tfOther.type= 'textfield';
   tfOther.setAttribute('id', 'otherText');
   tfOther.setAttribute('style','float : right; margin-right : 20px; width:200px; height:10px');
   tfOther.setAttribute('value', 'Nincs kitöltve');
   tdHand.appendChild(tfOther);
   tdHand.appendChild(document.createElement('BR'));
   rowMain.appendChild(tdHand);
   //TD3
   tdButton.setAttribute("align", "center");
   tdButton.setAttribute("valign", "middle");
   var button=document.createElement('img');
   button.src='http://nrdzsi.uw.hu/buttfr1.png';
   button.setAttribute('style','width:101%; cursor:pointer;');
   button.setAttribute('id', 'btnThread');
   addEventHandler(button, 'mouseover', mouseOverf);
   addEventHandler(button, 'mouseout', mouseOutf);
   addEventHandler(button, 'click', buttonClick);
   var button2=document.createElement('img');
   button2.src='http://nrdzsi.uw.hu/buttli1.png';
   button2.setAttribute('style','cursor:pointer;');
   function button2Click() {
         getPageTag();
   }
   function mouseOverli() {
         button2.src='http://nrdzsi.uw.hu/buttli2.png';
   }
   function mouseOutli() {
         button2.src='http://nrdzsi.uw.hu/buttli1.png';
   }
   addEventHandler(button2, 'mouseover', mouseOverli);
   addEventHandler(button2, 'mouseout', mouseOutli);
   addEventHandler(button2, 'click', button2Click);
   var rowButton = document.createElement("tr");
   var rowButton2 = document.createElement("tr");
   rowButton.appendChild(button);
   rowButton2.appendChild(button2);
   tdButton.appendChild(rowButton);
   tdButton.appendChild(rowButton2);
   rowMain.appendChild(tdButton);
   tblBody.appendChild(rowMain);
   tbl.appendChild(tblBody);
   form.appendChild(tbl);
   document.body.insertBefore(form, document.body.firstChild);
   if (host=="http://forum.androidhungary.com" || host=="http://forum.yox.hu" || host=="http://forum.index.hu" || host=="http://sgforum.hu" || host=="http://forum.netmania.hu" ) {
         document.getElementById('rdAuto').checked=true;
         document.getElementById('rdHand').checked=false;
    }
 } //END MENUBUILD


 //ÖSSZES ELEM FELKUTATÁSA
 function getAllElements() {
   var elements = document.getElementsByTagName("body")[0].getElementsByTagName("*");
      var valueElement="";
      var element="";
      for (var x=0;x<elements.length;x++) {
        elementAttrb = elements[x].attributes;
        element =elements[x].tagName.toLowerCase();
        valueElement =elements[x].tagName.toLowerCase();
        for (var k = 0; k < elementAttrb.length; k++) {
             element +=" " + elementAttrb[k].name.toLowerCase()+ "=\"";
             valueElement +=" " + elementAttrb[k].name.toLowerCase()+ "=\""+elementAttrb[k].value.toLowerCase()+"\"";
             if (elementAttrb[k].name.toLowerCase()=="href")
             element +="href";
             else if (elementAttrb[k].name.toLowerCase()=="src")
             element +="src";
             else if (elementAttrb[k].name.toLowerCase()=="name")
             element +="name";
             else if (elementAttrb[k].name.toLowerCase()=="title")
             element +="title";
             else if (elementAttrb[k].name.toLowerCase()=="alt")
             element +="alt";
             else if (elementAttrb[k].name.toLowerCase()=="id")
             element +="id";
             else
             element +=elementAttrb[k].value.toLowerCase();
             element +="\"";
        }
       fullTagsValues.push(valueElement);
       fullTags.push(element);
       orderedFullTags.push(element);
       orderedFullTagsValues.push(valueElement);
     }
  }

   //TAG KERESÉS
   function commentTagsSearch() {
         orderedFullTags.sort();
         orderedFullTagsValues.sort();
         var actElem = orderedFullTags[0];
         var elemCount = 1;  //egyes tagek száma
         var actTagsCount= new Array();  //tagek számainak tömbbje
         var nextElem  = new String(String);
         var index = 0;                  //hányadik új Tag
         tagsStart[index]=0;
         for (var i = 0; i < orderedFullTags.length; i++) {
             actElem= orderedFullTags[i];
             if (i < orderedFullTags.length-1)
                nextElem = orderedFullTags[i+1];
             else
                nextElem = "";
             if (actElem == nextElem){
                elemCount++;
                actTagsCount[index]= elemCount;
             }
             else {
               index++;
               tagsStart[index]=i+1;
               elemCount=1;
               actTagsCount[index]= elemCount;
             }
         }
         actTagsCount.sort();

         var lotTag= new Array(); //háromnál több tagek tömbje, segitségével kiszürhető a sok  tag ami nem komment
         var actElemCount=parseInt(actTagsCount[0]);
         var elemsCount=1; //tagek összegeinek a száma
         var nextElemCount=0;
         for (j = 0; j < actTagsCount.length; j++) {
           actElemCount=parseInt(actTagsCount[j]);
           if (j < actTagsCount.length-1) nextElemCount = parseInt(actTagsCount[j+1]);
           else nextElemCount = 0;
           if (actElemCount == nextElemCount) {
              if (actElemCount>4) {
                 elemsCount++;
              }
           }
           else {
             if (actElemCount>4) {
                 if (elemsCount>3)
                     lotTag.push(actElemCount);
                 if (elemsCount>max) {
                     max=elemsCount;
                     maxPos= parseInt(actTagsCount[j]);
                 }
                 elemsCount=1;
             }
          }
        }
        var notCommentTags = new Array(); //még nem biztos h ezek a kommentek ld. Youtube
        var newMax=0; //ha nem az eddigi max a komment
        var firstMax=false;
        var smallForum=false; //ha 7nél kevesebb a tagek száma de mégis forum
        if (lotTag.length>0) {
         if (maxPos>7) {
                   notCommentTags.length=0;
                   for (var m = 0; m < tagsStart.length; m++) {
                    if (tagsStart[m+1]-tagsStart[m]==maxPos)
                        notCommentTags.push(orderedFullTagsValues[tagsStart[m]]);
                   }
                   for (var b = 0; b < notCommentTags.length; b++) {
                     for (var n = 0; n < forumKeys.length; n++) {
                        if (notCommentTags[b].search(forumKeys[n])>-1)
                             firstMax=true;
                     }
                  }
             }
         if (!firstMax) {
           for (var x = 0; x < lotTag.length; x++) {
               if ((lotTag[x]>7) && (lotTag[x]!=maxPos)) {
                   notCommentTags.length=0;
                   for (m = 0; m < tagsStart.length; m++) {
                    if (tagsStart[m+1]-tagsStart[m]==lotTag[x])
                        notCommentTags.push(orderedFullTagsValues[tagsStart[m]]);
                   }

                   for (b = 0; b < notCommentTags.length; b++) {
                     for (n = 0; n < forumKeys.length; n++) {
                        if (notCommentTags[b].search(forumKeys[n])>-1)
                             newMax=lotTag[x];
                     }
                  }
                  if (newMax>0)
                     smallForum=true;
               }
               else if ((lotTag[x]<=7) && (maxPos<=7)) {
                   notCommentTags.length=0;
                   for ( m = 0; m < tagsStart.length; m++) {
                     if (tagsStart[m+1]-tagsStart[m]==lotTag[x])
                        notCommentTags.push(orderedFullTagsValues[tagsStart[m]]);
                   }
                   for ( b = 0; b < notCommentTags.length; b++) {
                     for ( n = 0; n < forumKeys.length; n++) {
                       if (notCommentTags[b].search(forumKeys[n])>-1) {
                            newMax=lotTag[x];
                            smallForum=true;
                       }
                     }
                   }
              }
              else newMax=maxPos;
              if (newMax>0)
                maxPos=newMax;
           }
         } else FORUM=true;
        } else smallForum=false;
       if (smallForum==true)
            FORUM=true;
     if ((FORUM) && (loc.search("forum")==-1))
          FORUM=false;
    } //end commentTagsSearch()


    //KOMMENTEK RENDEZÉSE
    function commentTagsSort() {

      for (var i = 0; i < commentTags.length-1; i++) {
         for (var j = i+1; j < commentTags.length; j++) {
             var a = fullTagsValues.indexOf(commentTags[i]);
             var b = fullTagsValues.indexOf(commentTags[j]);

             if (a>b){
              var temp=commentTags[j];
                commentTags[j]=commentTags[i];
                commentTags[i]=temp;
             }
         }
     }
   } //end commentTagsSort()


   //MÉGSEM KOMMENTTAGOK SZŰRÉSE
   function notCommentTagFilter() {
     tagDistance = new Array();
     orderedTagDistance = new Array();
     var firstTag = fullTagsValues.indexOf(commentTags[0]);
     var nextSameTag="";
     var step = firstTag;
     for (var z = 0; z < commentTags.length; z++) {
      firstTag = fullTagsValues.indexOf(commentTags[z]);
      nextSameTag="";
      step = firstTag;
      while ((nextSameTag!=fullTagsValues[firstTag]) && (nextSameTag!=fullTagsValues[fullTagsValues.length-1])) {
        step++;
        nextSameTag= fullTagsValues[step];
      }
      if (nextSameTag==fullTagsValues[firstTag]) {
        tagDistance[z]=step-firstTag;
        orderedTagDistance[z]=step-firstTag;
      }
      else {
        tagDistance[z]=0;
        orderedTagDistance[z]=0;
      }
   }

    orderedTagDistance.sort();
    var distanceCount=0; //hány tag távolság két tag között
    var maxDistance=0;  //legtöbb egyenlő tag távolság
    var distance=0;    //távolság hossza
    for (var y = 0; y < orderedTagDistance.length; y++) {
         if (y<orderedTagDistance.length-1) {
            if ((orderedTagDistance[y]>0) && (orderedTagDistance[y+1]>0)) {
                        if  ((orderedTagDistance[y])==(orderedTagDistance[y+1])) {
                           distanceCount++;
                           if (distanceCount>maxDistance) {
                                maxDistance=distanceCount;
                                distance=orderedTagDistance[y];
                           }
                        }
                        else distanceCount=0;
             }
         }
     }
     var ind=0;
     var actInd = 0;
     var step2 = 0;
     var actFirst ="";
     var firstFound= false; // igaz ha egyből az első taget találtuk meg
     var fstep=0;
     for (var k = 0; k < tagDistance.length; k++) {
          if (tagDistance[k]==0) {
                    ind=fullTagsValues.indexOf(commentTags[k]);
                    firstTag=fullTags[ind];
                    step2=0;
                    step=0;
                    nextSameTag="";
                    while ((nextSameTag!=firstTag)&& (nextSameTag!=fullTags[fullTags.length-1])) {
                        if (step2==ind-1) {
                            step2+=2;
                            firstFound=true;
                        }
                        else step2++;
                        if (firstFound)
                          step++;
                          nextSameTag= fullTags[step2];
                    }
                    if (nextSameTag==firstTag) {
                       vmi = actInd;
                       actFirst = firstTag;
                       if (firstFound) {
                            var foundDistance=step2-step;
                            fstep= foundDistance+distance;
                            if ((fstep==distance)|| fstep==distance+1)
                                tagDistance[k]=distance;
                            else
                                commentTags.splice(k,1);
                       }
                       else {
                            fstep=actInd-distance;
                            if (fullTags[fstep]==actFirst)
                                tagDistance[k]=fstep;
                            else
                                commentTags.splice(k,1);
                       }
                   }
                   else  commentTags.splice(k,1);
       }
     }
   } //end notCommentTagFilter()


   //ÁTALAKITJA A COMMENTTAGOKAT REGEXP-RE
   var expression="";
   function makeExpression(commTag) {
        var first=commTag;
      function countWords(str){
         var count = 0;
         words = str.split(" ");
         for (i=0 ; i < words.length ; i++){
           if (words[i] != "")
             count += 1;
         }
         return count;
      }
      var tag = first.split(" ",1);
      var spaces= countWords(first);
      var firstValueWithComma="";
      var firstValue= new Array();
      var firstName=new Array();
      var values = first.split("=",spaces);
      for (j=0 ; j < values.length-1 ; j++){
          var wordNames = values[j].split("\" ",2);
          if (j==0) {
            var separateWordNames= wordNames[0].split(" ",2);
            wordNames[1]=separateWordNames[1];
          }
          firstName.push(wordNames[1]);
          firstValueWithComma=values[j+1].split("\" ",1);
          firstValue.push(firstValueWithComma[0].substring(1,firstValueWithComma[0].length));
      }
      expression="//"+tag+"[";
      for (i=0 ; i < firstValue.length ; i++){
         if ((firstValue[i].toString().lastIndexOf("\""))!=-1)
             firstValue[i]=firstValue[i].toString().substring(0,firstValue[i].toString().length-1);
         if (i<firstValue.length-1)
            expression+="@"+firstName[i]+"='"+firstValue[i]+"' and "
         else
            expression+="@"+firstName[i]+"='"+firstValue[i]+"']"
      }
      if (firstValue.length==0)
        expression="//"+tag;
    } //end function MakeExpression



    //TEGEKET TARTALMAZÓ TÖMB FELTÖLTÉSE
    function fillCommentTags() {
        for (var k = 0; k < tagsStart.length; k++) {
           if (tagsStart[k+1]-tagsStart[k]==maxPos)
               commentTags.push(orderedFullTagsValues[tagsStart[k]]);
        }
    }



 //ELEM SZŰRŐ ELJÁRÁS
 function removeElement(ElemName) {
       if (ElemName!="") {
            makeExpression(ElemName);
            var allSameElem = document.evaluate(expression, document,null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
              for (i=0 ; i < allSameElem.snapshotLength ; i++){
                var sameElem = allSameElem.snapshotItem(i);
                 sameElem.parentNode.removeChild(sameElem);
              }
       }
       else alert("Nincs ilyen sz\u0171rendő elem!");
 }

 var mainTag="";
 var userNameTag="";
 var commentTextTag="";
 var userAvatarTag="";
 var postDateTag="";
 var otherTag="";
 var commentIdTag="";
 var signatureTag="";
 var userGroupTag="";
 var preCommentIdTag="";
 var rankTag="";
 var answerTag="";
 var famousTag="";
 var topicNameTag="";

 function getMainCommentTags() { //a szükséges tagek magadása
   if (document.getElementById('rdAuto').checked) {
             WRONG=false;
             if (host=="http://forum.index.hu") {
                    mainTag="table class=\"art\" cellspacing=\"0\" width=\"100%\"";
                    userNameTag="td class=\"art_h_l\"";
                    answerTag="td class=\"art_h_m\"";
                    postDateTag="td class=\"art_h_r\"";
                    commentTextTag="div class=\"art_t\"";
                    commentIdTag="td class=\"art_h_r\"";
                    preCommentIdTag="tr class=\"art_f\"";
                    pageName="forumindex";
             }
             else if (host=="http://sgforum.hu") {
                    mainTag="TABLE WIDTH=\"98%\" CELLSPACING=\"0\" CELLPADDING=\"0\" BORDER=\"0\"";
                    commentIdTag="TD ALIGN=\"RIGHT\" WIDTH=\"60%\" CLASS=\"msgtopic\"";
                    pageName="sgforum";
                    postDateTag="TD ALIGN=\"RIGHT\" WIDTH=\"60%\" CLASS=\"msgtopic\"";
                    preCommentIdTag="SMALL";
             }
             else if (host=="http://forum.netmania.hu") {
                    mainTag="div class=\"uzenet\"";
                    commentIdTag="TD align=\"left\" class=\"nevdatum\"";
                    preCommentIdTag="TD class=\"nevdatum\" ALIGN=\"RIGHT\"";
                    postDateTag="TD class=\"nevdatum\" ALIGN=\"RIGHT\"";
                    answerTag="a class=\"valasz\"";
                    pageName="netmania";
             }
             else if (host=="http://forum.androidhungary.com" || host=="http://forum.yox.hu") {
                    mainTag="li class=\"postbitlegacy postbitim postcontainer\"";
                    rankTag="span class=\"postbit_reputation\"";
                    userAvatarTag="a class=\"postuseravatar\"";
                    postDateTag="span class=\"date\"";
                    topicNameTag="h2 class=\"title icon\"";
                    otherTag="dl class=\"userinfo_extra\"";
                    commentIdTag="span class=\"nodecontrols\"";
                    userGroupTag="span class=\"usertitle\"";
                    preCommentIdTag="div class=\"bbcode_container\"";
                    if (host=="http://forum.androidhungary.com")
                    famousTag="dl class=\"user_rep\"";
                    answerTag="div class=\"postfoot\"";
                    if (host=="http://forum.yox.hu")
                      pageName="forumyox";
                    else if (host=="http://forum.androidhungary.com")
                      pageName="forumandroid";
             }
   }
   else {
       WRONG=false;
       mainTag= document.getElementById('mainText').value;
       userAvatarTag= document.getElementById('avatarText').value;
       userGroupTag= document.getElementById('userGroupText').value;
       otherTag= document.getElementById('otherText').value;
       commentIdTag= document.getElementById('commentIdText').value;
       preCommentIdTag= document.getElementById('preCommentIdText').value;
       signatureTag= document.getElementById('signatureText').value;
       pageName="userpage";
       if ((mainTag=="") || (commentIdTag=="") || (preCommentIdTag==""))
           WRONG=true;
   }
}

 var commentIds=new Array();  //kommentek azonosítói
 var preCommentIds=new Array(); //előzmények azonosítói

 function getCommentsId(pageName) { //azonosító tömb feltöltése
              makeExpression(commentIdTag);
              allCommentId = document.evaluate(expression,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
              if (pageName=="forumindex") {
                for (i=0 ; i < allCommentId.snapshotLength ; i++){
                    actCommentId = allCommentId.snapshotItem(i);
                    commentIdText= actCommentId.getElementsByTagName( "strong" );
                    commentIds.push(commentIdText[ 0 ].innerHTML);
                }
              }
              else if (pageName=="forumyox" || pageName=="forumandroid") {
                for (i=allCommentId.snapshotLength-1 ; i > -1 ; i--){
                    actCommentId = allCommentId.snapshotItem(i);
                    commentIdText=actCommentId.getElementsByTagName( "a" );
                    commentIdAttrb = commentIdText[0].attributes;
                    for (var j = 0; j < commentIdAttrb.length; j++) {
                        if (commentIdAttrb[j].name.toLowerCase()=="href")
                        commentIdValue=commentIdAttrb[j].value.toLowerCase();
                    }
                    commIdReg=commentIdValue.match(/\post\d+/);
                    commId=commIdReg.toString();
                    commId=commId.substring(4,commId.length);
                    commentIds.push(commId);
                }
              }
              else if (pageName=="sgforum") {
                for (i=0 ; i < allCommentId.snapshotLength ; i++){
                    actCommentId = allCommentId.snapshotItem(i);
                    commentIdText=actCommentId.textContent;
                    commIdReg=commentIdText.match(/\#\d+/);
                    commId=commIdReg.toString();
                    commId=commId.substring(1,commId.length);
                    commentIds.push(commId);
                }
              }
              else if (pageName=="netmania") {
                for (i=0 ; i < allCommentId.snapshotLength ; i++){
                    actCommentId = allCommentId.snapshotItem(i);
                    commentIdText=actCommentId.textContent;
                    commIdReg=commentIdText.match(/\(\d+\)/);
                    commId=commIdReg.toString();
                    commId=commId.substring(1,commId.length-1);
                    commentIds.push(commId);
                }
              }
 }


function getPreCommentsId(pageName) { //előzmény tömb feltöltése
               var preId="";
               if (pageName=="forumindex") {
                     makeExpression(preCommentIdTag);
                     allPreCommentId = document.evaluate(expression,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
                     for (i=0 ; i < allPreCommentId.snapshotLength ; i++){
                        actPreCommentId = allPreCommentId.snapshotItem(i);
                        preText=actPreCommentId.textContent;
                        preIdReg=preText.match(/\(\d+\)/);
                        if (preIdReg==null)
                            preId="-1"
                        else {
                            preId=preIdReg.toString();
                            preId=preId.substring(1,preId.length-1);
                        }
                        preCommentIds.push(preId);
                    }
               }
               else if (pageName=="forumyox" || pageName=="forumandroid") {
                    hasPreComment=false;
                    makeExpression(mainTag);
                    allPreCommentId = document.evaluate(expression,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
                    for (i=allPreCommentId.snapshotLength-1 ; i > -1  ; i--){
                        actPreCommentId = allPreCommentId.snapshotItem(i);
                        hasPreComment=false;
                        preLines= actPreCommentId.getElementsByTagName( "div" );
                        preLinesIdAttrb = preLines[10].attributes;
                        for (var k = 0; k < preLinesIdAttrb.length; k++) {
                            if (preLinesIdAttrb[k].value.toLowerCase()=="bbcode_container")
                            hasPreComment=true;
                        }
                        if (hasPreComment) {
                            preText=actPreCommentId.getElementsByTagName( "a" );
                            if (pageName=="forumyox")
                                preCommentIdAttrb = preText[4].attributes;
                            else if (pageName=="forumandroid")
                                preCommentIdAttrb = preText[7].attributes;
                            for (var j = 0; j < preCommentIdAttrb.length; j++) {
                                if (preCommentIdAttrb[j].name.toLowerCase()=="href")
                                    preCommentIdValue=preCommentIdAttrb[j].value.toLowerCase();
                            }
                            preIdReg=preCommentIdValue.match(/\post\d+/);
                            preId=preIdReg.toString();
                            preId=preId.substring(4,preId.length);
                        }
                        else
                            preId="-1";
                        preCommentIds.push(preId);
                   }
               }
               else if (pageName=="sgforum") {
                     makeExpression(mainTag);
                     allPreCommentId = document.evaluate(expression,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
                     for (i=0 ; i < allPreCommentId.snapshotLength ; i++){
                        actPreCommentId = allPreCommentId.snapshotItem(i);
                        preLines= actPreCommentId.getElementsByTagName( "tr" );
                        if (preLines.length<4)
                            preId="-1";
                        else {
                            preText=preLines[3].textContent;
                            preIdReg=preText.match(/\(#\d+\)/);
                            preId=preIdReg.toString();
                            preId=preId.substring(2,preId.length-1);
                        }
                        preCommentIds.push(preId);
                    }
               }
               else if (pageName=="netmania") {
                     makeExpression(preCommentIdTag);
                     allPreCommentId = document.evaluate(expression,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
                     for (i=0 ; i < allPreCommentId.snapshotLength ; i++){
                        actPreCommentId = allPreCommentId.snapshotItem(i);
                        preText=actPreCommentId.textContent;
                        preIdReg=preText.match(/\(\d+\)/);
                        if (preIdReg==null)
                            preId="-1";
                        else {
                            preId=preIdReg.toString();
                            preId=preId.substring(1,preId.length-1);
                        }
                        preCommentIds.push(preId);
                    }
               }
 }

 function doThread(pageName) { //szálasító függvény
  if (pageName=="userpage")
   SUCCESS=false;
  else{
   getCommentsId(pageName);
   getPreCommentsId(pageName);
   var forest = new Array(); //hozzászólásokat erdőként reprezentáló tömb
   var hasPreComment= false;
   for (j=commentIds.length-1 ; j > -1 ; j--){
       firstCommentId = commentIds[j];
       hasPreComment= false;
       if (preCommentIds[j]>-1) {
           secondCommentId= preCommentIds[j];
           preCommentFound=false;
           for (k=commentIds.length-1 ; k > -1 ; k--){
              if (secondCommentId==commentIds[k])
                  preCommentFound=true;
           }
           if (preCommentFound)
              hasPreComment= true;
           else
              forest.push(firstCommentId);
       }
       else
         forest.push(firstCommentId)
       if (hasPreComment)
         forest.push(firstCommentId+"."+secondCommentId);
   }

   for (y=0 ; y<forest.length  ; y++){
        actCommString=forest[y];
        var actComm =actCommString.split(".");
        actCommId=actComm[0];
        if (actComm.length==2)
            actCommPreId=actComm[1];
        makeExpression(mainTag);
        allComment = document.evaluate(expression,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (i=0 ; i < allComment.snapshotLength ; i++) {
            comment = allComment.snapshotItem(i);
            if (pageName=="forumindex") {
                    strongTag= comment.getElementsByTagName( "strong" );
                    actId = strongTag[ 1 ].textContent;
            }
            else if (pageName=="sgforum") {
                    tdTag= comment.getElementsByTagName("td");
                    actText = tdTag[1].textContent;
                    actReg=actText.match(/\#\d+/);
                    actId=actReg.toString();
                    actId=actId.substring(1,actId.length);
            }
            else if (pageName=="netmania") {
                    tdTag= comment.getElementsByTagName("td");
                    actText = tdTag[0].textContent;
                    actReg=actText.match(/\(\d+\)/);
                    actId=actReg.toString();
                    actId=actId.substring(1,actId.length-1);
            }
            else if (pageName=="forumyox" || pageName=="forumandroid") {
                    revComment= allComment.snapshotItem(allComment.snapshotLength-1-i);
                    nextComment= allComment.snapshotItem(allComment.snapshotLength-i-1);
                    commentIdText=revComment.getElementsByTagName( "a" );
                    commentIdAttrb = commentIdText[0].attributes;
                    for (j = 0; j < commentIdAttrb.length; j++) {
                        if (commentIdAttrb[j].name.toLowerCase()=="href")
                            commentIdValue=commentIdAttrb[j].value.toLowerCase();
                    }
                    commIdReg=commentIdValue.match(/\post\d+/);
                    actId=commIdReg.toString();
                    actId=actId.substring(4,actId.length);
            }
            if (pageName=="forumyox" || pageName=="forumandroid") {
                if (actId==actCommId)
                    actComment=revComment;
                if (actComm.length==2) {
                    if (actId==actCommPreId)
                        actPreComment=revComment;
                }

            }
            else if (pageName=="forumindex" || pageName=="netmania" || pageName=="sgforum") {
                if (actId==actCommId)
                    actComment=comment;
                if (actComm.length==2) {
                    if (actId==actCommPreId)
                        actPreComment=comment;
                }
            }
      }
      if (pageName=="forumyox" || pageName=="forumandroid") {
          if (actComm.length==1)
            nextComment.parentNode.insertBefore(actComment, nextComment); //megfordítjuk a sorrendet
          else
            actPreComment.parentNode.insertBefore(actComment, actPreComment.nextSibling); //választ az előzmény alá szúrjuk
      }
      else if (pageName=="forumindex" || pageName=="netmania" || pageName=="sgforum") {
          if (actComm.length==2) { //ha volt előzmény
            actPreComment.parentNode.insertBefore(actComment, actPreComment.nextSibling); //választ az előzmény alá szúrjuk
          }
      }
      if (actComm.length==2) {
        var computedStyle = document.defaultView.getComputedStyle(actPreComment,null);
        var preWidth=parseInt(computedStyle.getPropertyValue("width"));
        var preMargin=parseInt(computedStyle.getPropertyValue("margin-left"));
        var inc=preMargin+20;
        var dec=preWidth-20;
        eval("actComment.setAttribute('style', ' clear: both; width: "+ dec +"px ; margin-left :  " + inc + "px; '); ");
      }
    }
  }
 } //end doThread()


  function getPageTag() {
       var newWin = window.open("", "hw3", "menubar=yes,scrollbars=yes,resizable=yes" + "width=200,height=250"); //megnyitjuk az új ablakot
       newWin.document.writeln("<p/>LEHETSÉGES HOZZÁSZÓLÁS TEGEK (SORRENDBEN)<br/> ");
       fillCommentTags();
       commentTagsSort();
       notCommentTagFilter();
       for (var i = 0; i < commentTags.length; i++) {
          newWin.document.writeln((i+1)+": "+commentTags[i]+"<br/>");
       }
       newWin.document.close();
  }


  function main() {
            document.getElementById('btnThread').disabled=true;
            document.getElementById('btnThread0').disabled=true;            
            getMainCommentTags();
           // document.getElementById('mainText').defaultValue="Nincs kitöltve";  
            if (WRONG)
                alert("Rosszul adta meg az oldal bels\u0151 kódját, a szálasítás nem sikerült!");
            else {
                doThread(pageName);
                removeElement(preCommentIdTag);
                if (SUCCESS)
                    alert ("Az oldal szálasítása véget ért!");
            }
            if (document.getElementById('cbAvatar').checked)
                removeElement(userAvatarTag);
            if (document.getElementById('cbSignature').checked)
                removeElement(signatureTag);
            if (document.getElementById('cbOther').checked)
                removeElement(otherTag);
            if (document.getElementById('cbUserGroup').checked)
                removeElement(userGroupTag);
            if (postDateTag!="")  
            removeElement(postDateTag);
            if (answerTag!="")
              removeElement(answerTag);
            if (famousTag!="")
              removeElement(famousTag);
            if (rankTag!="")
              removeElement(rankTag);
            if (topicNameTag!="")
              removeElement(topicNameTag);
            document.getElementById('btnThread').disabled=false;
            document.getElementById('btnThread0').disabled=false;
    }

  //THE PROGRAM START
  getAllElements();
  commentTagsSearch();
  if (FORUM)
     addEventHandler(window, 'load', menuBuild);
