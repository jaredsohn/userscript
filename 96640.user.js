// ==UserScript==
// @name           Bewtones
// @namespace      Doorbellscript
// @description    Save chat commands as buttons in the chat pane
// @include        *kingdomofloathing.com/lchat.php*
// @include        *127.0.0.1:*/lchat.php*
// ==/UserScript==


var bDebug = true;
var AllButtons = new Array();
Init();

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function LoadButtons()
{
  var sData = GM_getValue("Bewtones Data", "");
  //alert("Loading Bewtonds Data: " + sData);
  if(sData == "")
    return;
  var asButtonData = sData.split("^^");
  if(asButtonData.length < 1)
    return;
  //alert("Found " + asButtonData.length + " buttons");
  
  AllButtons.length = 0;
  for(var i=0; i<asButtonData.length; ++i)
  {
    var asButtonParts = asButtonData[i].split("~~");
    //alert("Found " + asButtonParts.length + " button parts in " + asButtonData[i]);
    if(asButtonParts.length < 3)
      continue;
    AllButtons[AllButtons.length] = 
    {
      Text: asButtonParts[0],
      Command: asButtonParts[1],
      Style: asButtonParts[2]
    };
  }
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function SaveButtons()
{
  var sData = "";
  for(var i = 0; i<AllButtons.length; ++i)
  {
    sData += AllButtons[i].Text + "~~" + AllButtons[i].Command + "~~" + AllButtons[i].Style + "^^";
    //alert("Saving buttons. Data so far is " + sData);
  }
  GM_setValue("Bewtones Data", sData);
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function Init()
{
  if(document.getElementById("BewtonesDiv") == null)
  {
    var eBewtonesDiv = document.createElement("div");
    eBewtonesDiv.id = "BewtonesDiv";
    eBewtonesDiv.style.cssText = "margin:1px;position:absolute;top:1px;left:1px;padding:1px;width:95%;background-color:#EEEEEE;";
    
    var eConfigLink = document.createElement("a");
    eConfigLink.href="javascript:";
    eConfigLink.name = "BewtonesConfigLink";
    eConfigLink.id = "BewtonesConfigLink";
    eConfigLink.innerHTML = "<img src='data:image/gif;base64,R0lGODlhEAAQALMPAHNzc7Gxsbq6uoODg4yMjMHBwcrKytHR0ZCQkKampsbGxuXl5d3d3ZmZmWZmZv///yH5BAEAAA8ALAAAAAAQABAAAARd8MkpV7uG6meZdxsVeAWQhRLCHIOxLMipESvxqkRIH8FVbwOGwXDwGAQATVDBbAYcskewQE04rq3FBMAQeK2v8Lb7dWg33IAaHEqrG2aUQxFIwM+6hj2O4gyueCgRADs%3D' />";
    eConfigLink.addEventListener("click", ToggleConfig, true);
    eBewtonesDiv.appendChild(eConfigLink);
    document.body.appendChild(eBewtonesDiv);
  }
  
  LoadButtons();

  for(var i=0; i<AllButtons.length; ++i)
  {
    var btn = document.createElement("a");
    btn.href = "javascript:/*" + AllButtons[i].Command + "*/";
    btn.name = "Bewtone_" + i;
    btn.id = "Bewtone_" + i;
    btn.style.cssText = AllButtons[i].Style;
    if(AllButtons[i].Text == null || AllButtons[i].Text == "")
      btn.innerHTML = AllButtons[i].Command;
    else
      btn.innerHTML = AllButtons[i].Text;

    btn.addEventListener("click", ClickBewtones, true);
    eBewtonesDiv.appendChild(btn);
  }
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function ClickBewtones()
{
  var sMessage = decodeURI(this.href.split("*")[1]);
  var eChatTextbox = document.getElementsByName("graf")[0];
  eChatTextbox.value = sMessage;
  document.location.assign("javascript:submitchat();void(0)");
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function ToggleConfig()
{
  var eConfigDiv = document.getElementById("BewtonesConfigDiv");
  if(eConfigDiv != null)
  {
    document.body.removeChild(eConfigDiv);
    return;
  }
  
  eConfigDiv = document.createElement("div");
  eConfigDiv.id = "BewtonesConfigDiv";

  var eCloseLink = document.createElement("a");
  eCloseLink.id = "CloseConfigLink";
  var sRedXImage = "data:image/gif;base64,"+
  "R0lGODlhEAAQALMAAM+vr+LPz4xAQMWfn7OAgIMwMOzf37yPj6lwcHkgIHAQENm/v/Xv76BgYP//"+
  "/2YAACH5BAAAAAAALAAAAAAQABAAAARg0MlJHXqqMftKW1TzjA/iEOQDSEeqBA6jkApjzOQwoSQh"+
  "pKYJI5FKCSqORXFUQzpERZAzUDw6n0tpRblMbCjD5ahRuZAQhdRKwh0lHAHcwyshkqSDlM4BsAcl"+
  "AA0CDTARADs=";
  eCloseLink.innerHTML = "<img src='" + sRedXImage + "' style='position:absolute; left: 1px; top: 1px;'/>" ;
  eCloseLink.addEventListener("click", ToggleConfig, true);
  eConfigDiv.appendChild(eCloseLink);

  var eNewFieldset = GetButtonConfigFieldset("", "", "", -1);
  eConfigDiv.appendChild(eNewFieldset);
  
  
  for(var i=0; i<AllButtons.length; ++i)
  {
    var eFieldset = GetButtonConfigFieldset(AllButtons[i].Text, AllButtons[i].Command, AllButtons[i].Style, i);
    eConfigDiv.appendChild(eFieldset);
  }
  
  var eSaveLink = document.createElement("a");
  eSaveLink.innerHTML = "<img src='data:image/gif;base64,R0lGODlhIAAgAPcAAAAAAAAxnAA5nAA5pQBCpQBCrQBKtQBStQBSvQBavQBaxgBr1ggxnAg5nAhCpQhKpQhKrQhSrQhStQhavQhz1hA5nBBCexBCpRBKrRBSrRBStRBatRBavRBjvRBjxhBrzhBz1hB71hgxYxhCpRhKhBhSrRhapRhatRhjtRhjvRhrvRhrxhhzxhhzzhiE1iFjpSFrpSFrrSFrtSFrvSFrxiFzxiFzziF7ziGEziljlClrtSlzxilzzilz3il7xil7zimEzimE1jFSczFaezGEzjGE1jGM1jGM3jGU3jlaezlahDljhDlrtTlz1jmM1jmU1jmU3kJjjEJrjEKU50prlEprrUpznEpzrUpztUqEvUqMzlJznFJzvVJ7tVKEtVpznFp7pVqEtVqMtVql52OEtWOMtWOc1nNzc3Nze3OMrXOUrXtzc3uEhHuMpXuMrXuUrXuc53vG3oSMjISUpYSUrYS954yMjIyUlIycrYy954y975SMhJSUlJSUnJScnJSltZycnJycpZylpZytvZy1zqWclKWcnKWlpaWlraWtra2lnK2lpa2tpa2tra2tta21ta21xq3G1rWtpbW1tbW1vbW9vbW9xrXO5721rb21tb29vb29xr3Gxr3W78a9tca9vcbGvcbGxsbGzs7Gvc7Gxs7Ovc7Oxs7OztbOztbWztbW1tbe3t7Wxt7W1t7e1t7e3ufe1ufe3ufn3ufn5+/v5+/v7/fv7/f39//39////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAAALAAAAAAgACAAAAj+AAEIHEiwoMGDCBMqXBgHBIgFWkiFmhiKE6dNmihReuSoUSNEhw55UTBhAxyCIBIICFBF1q1cMGPmunWrls1Zs2SFIlNjh4QMKAUIveLyJc2aN3G+mvXqVagyJl7sgEAwRIMGAojGPEWx60SlTy2Q+IEBZQMHA67EivlKldu3bk+BLSNDxo8LKB04IKD2pcyYNG823VnDhw+8A0Ho5euKZq62cOEyfQWKp+EKefVeaUyTq9dQXJtS5rnDB+bED1JfaVXzFs7Xk9tOrlzYNMoHGB5cSWUTaS3YsZt+smw7MQYMEHbbrOW566nQwomfFggCQwYMV1DhZP68u3fImsj+lP4xHQCIDOivmIKd9LVot5rC3PBBpPz5Ehm6jGrFv//bVKg8ZwoppGBSxg8+AGFfCSdswAQdb0Qo4YQSttFGGm148cMP9aF0wocNbiCiiB2kYKIKKtBAQw0s3oAgER0mBuIJKNRYYwoz5KhjTzuUZhiHMVJno40mFpmjiizWsOGGQMAYpHlDopDCF2BUWeUWW1AhRRRLJJFDDDDAQN+TLeCI4wwojEILLKx4Iokhi2QCCiqx4CKEDDrEYAYRRpTXgo45ooAJJA2UgMIMh0yiySmqzJKLEkUQAUQdTvSJEqA5SjLIABmckIIjizZaSy5JRDpppX5iOoMif0Dg6Qqloc4yai5DmEqppQN9MEMNu/JaCB4b4MjCKa7ImotNpUpKqRPledBBjz3WsMccKhR2Q6Mv/RbLEEYQUUQdTzxR3hQIdOBDtHvg0cINQLgwS7azqIIKt0YYkccTzBbUgwEbGObDHpUQEsklncDk2iunkDIEFOGO8cQDIxjUBAYONBDAGnbwwQcggQTSxx1ysIHGGSII0AADDDRQARcLtezyyzADEBAAADs%3D' />";
  eSaveLink.addEventListener("click", SaveConfig, true);
  eConfigDiv.appendChild(eSaveLink);
  
  eConfigDiv.style.cssText = "position:absolute; background-color:#EEEEEE;top:";

  document.body.appendChild(eConfigDiv);

}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function GetButtonConfigFieldset(sText, sCommand, sStyle, iIndex)
{
    var eFieldset = document.createElement("fieldset");
    var eLegend = document.createElement("legend");
    var eTextTitle = document.createElement("span");
    var eText = document.createElement("input");
    var eCommandTitle = document.createElement("span");
    var eCommand = document.createElement("input");
    var eStyleTitle = document.createElement("span");
    var eStyle = document.createElement("input");
    
    if(iIndex < 0)
      eLegend.innerHTML = "New Button";
    else
      eLegend.innerHTML = "Button " + iIndex;
      
    eLegend.style.cssText = sStyle;

    eFieldset.appendChild(eLegend);
    
    eText.type = "text";
    eText.id = "ConfigText_" + iIndex;
    eText.name = "ConfigText_" + iIndex;
    eText.value = sText;

    eCommand.type = "text";
    eCommand.id = "ConfigCommand_" + iIndex;
    eCommand.name = "ConfigCommand_" + iIndex;
    eCommand.value = sCommand;

    eStyle.type = "text";
    eStyle.id = "ConfigStyle_" + iIndex;
    eStyle.name = "ConfigStyle_" + iIndex;
    eStyle.value = sStyle;

    eTextTitle.innerHTML = "Text: ";
    eCommandTitle.innerHTML = "<br>Cmd: ";
    eStyleTitle.innerHTML = "<br>Style: ";
    
    eFieldset.appendChild(eTextTitle);
    eFieldset.appendChild(eText);
    eFieldset.appendChild(eCommandTitle);
    eFieldset.appendChild(eCommand);
    eFieldset.appendChild(eStyleTitle);
    eFieldset.appendChild(eStyle);
    
    return eFieldset;
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function SaveConfig()
{
  // create a temp AllButtons array that will hold everything that hasn't been deleted
  // Something is deleted by removing the name and command
  var asNewButtons = new Array();


  // first add the new button
  asNewButtons[asNewButtons.length] = 
  {
    Text: document.getElementById("ConfigText_-1").value,
    Command: document.getElementById("ConfigCommand_-1").value,
    Style: document.getElementById("ConfigStyle_-1").value
  };

  // now add the edits to all existing buttons  
  for(var i=0; i<AllButtons.length; ++i)
  {
    asNewButtons[asNewButtons.length] = 
    {
      Text: document.getElementById("ConfigText_" + i).value,
      Command: document.getElementById("ConfigCommand_" + i).value,
      Style: document.getElementById("ConfigStyle_" + i).value
    }
  }

  // Now reset AllButtons and add in only the non-empty commands
  AllButtons.length = 0;
  for(var i=0; i<asNewButtons.length; ++i)
  {
    if(!Empty(asNewButtons[i].Text) || !Empty(asNewButtons[i].Command))
      AllButtons[AllButtons.length] = asNewButtons[i];
  }
  
  SaveButtons();
  ToggleConfig();
  document.body.removeChild( document.getElementById("BewtonesDiv"));
  Init();
  //alert(GM_getValue("Bewtones Data", ""));
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function Empty(sString)
{
  if(sString == null)
    return true;
  if(sString.replace(/^\s*/, "").replace(/\s*$/, "").length <= 0)
    return true;
  return false;
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function Log(sMessage)
{
  if(bDebug)
    GM_log(sMessage);
}
