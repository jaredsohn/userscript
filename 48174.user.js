// ==UserScript==
// @name           LUEser Avatar Script
// @namespace      CriticalToast@gamefaqs.com
// @include        http://www.gamefaqs.com/boards/genmessage.php?board=402&topic=*
// @include        http://www.gamefaqs.com/boards/gentopic.php?board=402*
// @version        1.4.1
// ==/UserScript==
//
//   LUEser Avatar Script
//   Author: Critical Toast
//
//   A simple modification of The Amazing One's LUEser Photo Album Script to 
//   display avatars instead of pics from the LUE Photo Album. Credit for the
//   original script, of course, goes to The Amazing One.
//
//
//   To access the settings, find the appropriate option under User Script
//   Commands. A dialog will pop up with the settings that can be controlled.
//
//
//   Version 1.4.1 notes
//
//   - This is a hasty update in response to the changes that GameFAQs made
//     to its layout today (4/28).
//   - There was a bug with quoting. I fixed that in version 1.4.1
// __________________________________________________________________________


var alignSetting = getAlignSetting();
var silhouetteSetting = GM_getValue("Silhouette",0);
var maxWidthSetting = GM_getValue("MaxWidth",200);
var maxHeightSetting = GM_getValue("MaxHeight",200);
if(GM_getValue("SettingsFlag",false))
   makeSettingsDialog();
GM_setValue("SettingsFlag",false);

function getAlignSetting()
{
   return GM_getValue("Align",
      GM_getValue("DisplayPhotosOnHover",false)?
         3:
         (GM_getValue("AlignImagesOnLeft",false)?
            1:0));   
}

function openSettings()
{
   GM_setValue("SettingsFlag",true);
   window.location.reload();
}

function makeSettingsDialog()
{
   var alignSetting = getAlignSetting();
   var silhouetteSetting = GM_getValue("Silhouette",0);

   var dialog = document.createElement('div');
   dialog.style.position="fixed";
   dialog.style.zIndex="100";
   dialog.style.top="50px";
   dialog.style.left="50px";
   dialog.style.backgroundColor="#DDDDDD";
   dialog.style.border="solid 1px black";

   var div1 = document.createElement('div');
   div1.style.width="300px";
   div1.style.backgroundColor="#3366BB";
   div1.style.display="block";
   div1.style.padding="2px";

   var header = document.createElement('span');
   header.style.fontSize="12px";
   header.style.fontFamily="arial, sans-serif";
   header.style.color="white";
   write(header,"Settings");
   
   div1.appendChild(header);
   dialog.appendChild(div1);
   
   var div2 = document.createElement('div');
   div2.style.width="294px";
   div2.style.display="block";
   div2.style.padding="5px";
   div2.style.fontSize="12px";
   div2.style.color="black";
   div2.style.fontFamily="arial, sans-serif";

   var alignRadio1 = document.createElement("input");
   alignRadio1.type="radio";
   alignRadio1.name="alignImages";
   
   var alignRadio2 = document.createElement("input");
   alignRadio2.type="radio";
   alignRadio2.name="alignImages";
   
   var alignRadio3 = document.createElement("input");
   alignRadio3.type="radio";
   alignRadio3.name="alignImages";
   
   var alignRadio4 = document.createElement("input");
   alignRadio4.type="radio";
   alignRadio4.name="alignImages";
   
   switch(alignSetting)
   {
      case 0: alignRadio1.checked = true; break;
      case 1: alignRadio2.checked = true; break;
      case 2: alignRadio3.checked = true; break;
      case 3: alignRadio4.checked = true; break;
   }

   write(div2,"Display photos");
   addTag(div2,"br");
   div2.appendChild(alignRadio1);
   write(div2,"on the right");
   addTag(div2,"br");
   div2.appendChild(alignRadio2);
   write(div2,"on the left");
   addTag(div2,"br");
   div2.appendChild(alignRadio3);
   write(div2,"under the username");
   addTag(div2,"br");
   div2.appendChild(alignRadio4);
   write(div2,"only on hover");
   addTag(div2,"br");
   addTag(div2,"hr");

   var silhouetteRadio1 = document.createElement("input");
   silhouetteRadio1.type="radio";
   silhouetteRadio1.name="displaySilhouette";
   
   var silhouetteRadio2 = document.createElement("input");
   silhouetteRadio2.type="radio";
   silhouetteRadio2.name="displaySilhouette";
   
   var silhouetteRadio3 = document.createElement("input");
   silhouetteRadio3.type="radio";
   silhouetteRadio3.name="displaySilhouette";
   
   switch(silhouetteSetting)
   {
      case 0: silhouetteRadio1.checked = true; break;
      case 1: silhouetteRadio2.checked = true; break;
      case 2: silhouetteRadio3.checked = true; break;
   }
   
   write(div2,"Show default photos");
   addTag(div2,"br");
   div2.appendChild(silhouetteRadio1);
   write(div2,"in color");
   addTag(div2,"br");
   div2.appendChild(silhouetteRadio2);
   write(div2,"in black and white");
   addTag(div2,"br");
   div2.appendChild(silhouetteRadio3);
   write(div2,"never");
   addTag(div2,"br");
   addTag(div2,"hr");
   
   var maxWidth = document.createElement("input");
   maxWidth.type="text";
   maxWidth.style.width="30px";
   
   var maxHeight = document.createElement("input");
   maxHeight.type="text";
   maxHeight.style.width="30px";
   
   maxWidth.value = GM_getValue("MaxWidth",200);
   maxHeight.value = GM_getValue("MaxHeight",200);

   write(div2,"Maximum size of photos:");
   addTag(div2,"br");
   div2.appendChild(maxWidth);
   write(div2,"px width");
   addTag(div2,"br");
   div2.appendChild(maxHeight);
   write(div2,"px height");
   addTag(div2,"br");
   addTag(div2,"hr");
   
   var cancelButton = makeButton("Cancel","right",
      function(event)
      {
         dialog.parentNode.removeChild(dialog);
         dialog = null;
      });
   
   var saveButton = makeButton("Save","right",
      function(event)
      {
         alignSetting = alignRadio1.checked?0:
            (alignRadio2.checked?1:
               (alignRadio3.checked?2:3));
         silhouetteSetting = silhouetteRadio1.checked?0:
            (silhouetteRadio2.checked?1:2);
         GM_setValue("Align",alignSetting);
         GM_setValue("Silhouette",silhouetteSetting);
         GM_setValue("MaxWidth",maxWidth.value/1);
         GM_setValue("MaxHeight",maxHeight.value/1);
         window.location.reload(true);
      });
   var defaultButton = makeButton("Defaults","left",function(event)
      {
         alignRadio1.checked = true;
         silhouetteRadio1.checked = true;
         maxWidth.value=200;
         maxHeight.value=200;
      });
   
   div2.appendChild(defaultButton);
   div2.appendChild(cancelButton);
   div2.appendChild(saveButton);
   
   dialog.appendChild(div2);
   document.body.appendChild(dialog);
}

function write(obj,text)
{
   obj.appendChild(document.createTextNode(text));
}
function addTag(obj,tag)
{
   obj.appendChild(document.createElement(tag));
}
function makeButton(text,align,action)
{
   var result = document.createElement("input");
   result.type="button";
   result.style.lineHeight="27px";
   result.style.height="27px";
   result.style.width="60px";
   result.style.fontSize="12px";
   result.style.fontFamily="arial, sans-serif";
   result.style.cssFloat=align;
   result.value=text;
   result.addEventListener("click",action,true);

   return result;
}
   
GM_registerMenuCommand("LUEser Photo Album script - Settings",openSettings);

if(/genmessage.php/.test(window.location.href))
{
   // Only change this value if the URL of the photo album changes for some reason.
   var PhotoAlbumURL = [
      "http://s291.photobucket.com/albums/ll312/CriticalToast/userpics/*.jpg"
   ];

   var silhouetteMan = "data:image/gif;base64,R0lGODlheABzAPAAAAAAAAAAACH5BAEAAAE"
   +"ALAAAAAB4AHMAAAL+jI+py+0Po5y0VoAX3rb7DyLbKI5AiKaqwZmuu8ay89Y2fHDzbt3+nzHxhhG"
   +"g8UhMKo5Mo/LZjDqfO6l1SlVdt78sigvuenvh8m1MMatt6OL6jWs34HSSnFHP3zV5/T7X5/cX2Pc"
   +"XQBi4h5h4t1jY6FinGEk3SQkn98j3lokpsdZp9iHaRjoaVlqWgoqmqsUVeiUDm7o1axsb9ZkBQVs"
   +"r9VDTK5vbFPwybAWpPMdGQ1yM1Cz8zByNtYlcDWzJOM3dLYiHG155bF3OeY6+bL4OPui+DR+v/k6"
   +"fDpbsa3iotk+unz9X3/QJZEFwnKmDCbOxOjiQn8OHAhsmkGfIYgnUe4MiXoJW76PEayJ1ZSxpMCT"
   +"FJZ5OagTEMR+7iy1VjtwIqt+/gi9JmlS4s2JPj0NbDa3pMuXElTZBsswpFCU+mVJ9QCRaVQzDrNI"
   +"gcu269avWsGLPXMVaVsfZtHbO8qzq9p7UuPPg0gWa9S5eu3ppfu37lCtgv4IH4+RrGK3IxIdRMoa"
   +"JmHHhx4opUYZc8jLCuZorL+rsGRHoyI9JS+asOW9q1aX/ni5rmG2Lu7LjrK0t5DZubUl3O/Ppu+2"
   +"Y4FOrEHe64sRxpiGWL/Sg3HnMCdL9FAAAOw==";

   function getColor(userID)
   {   
      var color = (3548023*userID+11066021)%16777216;
      var colorString = color.toString(16);
      colorString = "000000".substr(0,6-colorString.length)+colorString;
      return "#"+colorString;
   }
   
   function getFilter(url)
   {
      return RegExp.escape(url).replace("\\*","[^\\. ]+");
   }
   
   function getFilter2(url)
   {
      return RegExp.escape(url).replace("\\*","([^\\. ]+)");
   }
   
   function getFilter3(urlArray)
   {
      var result = getFilter(urlArray[0]);
      for(i=1; i<urlArray.length; i++)
         result += "|"+getFilter(urlArray[i]);
      return result;
   }

   var allLinks, thisLink;
   allLinks = document.evaluate(
       '//table[@class="board message"]//a[@href]',
       document,
       null,
       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
       null);
   for (var x = 0; x < allLinks.snapshotLength; x++) {
       thisLink = allLinks.snapshotItem(x);

      if(!thisLink.href.match(/user\.php.*user=/))
         continue;

      var username = thisLink.textContent;
      var usernameWords = username.split(" ");
      username="";
      for(i in usernameWords)
         username+=usernameWords[i];
      var userID = /user=([0-9]+)/.exec(thisLink.href)[1]/1;

      var userImg = document.createElement('img');
      userImg.src=PhotoAlbumURL[0].replace("*",username);
      userImg.style.maxWidth=maxWidthSetting+"px";
      userImg.style.maxHeight=maxHeightSetting+"px";

      userImg.addEventListener("error",function(event)
      {
         for(i=0; i<PhotoAlbumURL.length; i++)
         {
            var result = new RegExp(getFilter2(PhotoAlbumURL[i])).exec(this.src);
            if(result != null)
            {
               if(result.length>1 && i+1<PhotoAlbumURL.length)
                  this.src = PhotoAlbumURL[i+1].replace("*",result[1]);
               else
                  this.src = silhouetteMan;
               return;
            }
         }
         this.src = silhouetteMan;
      },true);
            
      if(alignSetting!=3)
      {
         userImg.style.display="none";
         userImg.style.border="outset";
         userImg.align=(alignSetting==1||alignSetting==2?"left":"right");
         userImg.hspace="5";
         userImg.vspace="5";
         if(silhouetteSetting!=1) userImg.style.backgroundColor=getColor(userID);
         userImg.addEventListener("load",function(event)
         {
            if(silhouetteSetting!=2 || this.src!=silhouetteMan)
               this.style.display="inline";
         },true);
         if(alignSetting!=2) // photos in message
         {
            var msg;
            if(thisLink.parentNode.parentNode.childNodes.length==2) // username left of message
               msg = thisLink.parentNode.nextSibling;
            else // username above message
               msg = thisLink.parentNode.parentNode.parentNode.nextSibling.firstChild.firstChild;
            msg.insertBefore(userImg,msg.firstChild);
         }
         else // photos under the username
         {
            var msg = thisLink.parentNode;
            msg.appendChild(document.createElement("br"));
            msg.appendChild(userImg);
         }
      }
      else
      {
         var tmp = document.createElement('div');
         tmp.style.border="outset";
         tmp.style.backgroundColor="white";
         tmp.appendChild(userImg);
         userImg.style.display="none";
         userImg.addEventListener("load",function(event)
         {
            if(this.src != silhouetteMan)
            {
               this.style.display="inline";
               this.nextSibling.style.display="none";
               this.parentNode.previousSibling.style.border="1px solid";
            }
         },true);
         var divText = document.createElement('div');
         divText.style.padding="5px";
         divText.appendChild(document.createTextNode("=Photo is not available="));
         tmp.appendChild(divText);
         tmp.style.visibility="hidden";
         tmp.style.position="absolute";
         thisLink.parentNode.insertBefore(tmp,thisLink.nextSibling);
         thisLink.addEventListener("mouseover",function(event)
         {
            this.nextSibling.style.visibility="visible";
         },true);
         thisLink.addEventListener("mouseout",function(event)
         {
            this.nextSibling.style.visibility="hidden";
         },true);
      }
   }

   function initFixTextarea()
   {
      var allTextareas;
      allTextareas = document.evaluate(
       '//textarea',
       document,
       null,
       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
       null);
      if(allTextareas.snapshotLength!=0)
      {
         quickpostBox = allTextareas.snapshotItem(0);
         var timedValidate = function(event)
         {
       setTimeout(validateFunction,10);
         };
         var validateFunction = function()
         {
       var selStart = quickpostBox.selectionStart;
       var myRegExp = (alignSetting==3?
          /=Photo is not available=/g:
          new RegExp("([^\\n])\\n((?:<.>)*)(?:"+getFilter3(PhotoAlbumURL)+"|"+
          RegExp.escape(silhouetteMan)+")","g") );
       var rep = (alignSetting==3?"":"$1\n$2");
       var newText1 = quickpostBox.value.substring(0,selStart).replace(myRegExp,rep);
       var newText2 = quickpostBox.value.substring(selStart).replace(myRegExp,rep);
       if(newText1+newText2!=this.value)
       {
          quickpostBox.value=newText1+newText2;
          quickpostBox.setSelectionRange(newText1.length,newText1.length);
       }
         };
         var blurValidate = function(event)
         {
       var myRegExp = (alignSetting==3?
          /=Photo is not available=/g:
          new RegExp("([^\\n])\\n((?:<.>)*)(?:"+getFilter3(PhotoAlbumURL)+"|"+
          RegExp.escape(silhouetteMan)+")","g") );
       var rep = (alignSetting==3?"":"$1\n$2");
       quickpostBox.value = quickpostBox.value.replace(myRegExp,rep);
         }
         quickpostBox.addEventListener("focus",timedValidate,true);
         quickpostBox.addEventListener("blur",blurValidate,true);
      }
      else
         setTimeout(initFixTextarea,1000);
   }
   initFixTextarea();
}

// Code snippet from http://simonwillison.net/2006/Jan/20/escape/
RegExp.escape = function(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}
   
//---------------------------------------------------------------------------
// Check for updates
// 
// Much thanks to Jarett - http://userscripts.org/users/38602 - for the code
//---------------------------------------------------------------------------
var version_scriptNum = 37350; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1240968189197; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/&#x000A;/g,"\n").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);
