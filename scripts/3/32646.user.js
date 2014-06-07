// ==UserScript==
// @name OT - NWS Hide/Show
// @namespace http://sixdot.net/OT/
// @description Add the following to the address bar: "&nws=0" for no nws, "&nws=1" for only nws. This only applies to the main forum and will probably break if the forum layout is changed in any way.  
// @include http://forums.offtopic.com/*
// ==/UserScript==
//GRAB ALL ROWS
var trs = document.getElementsByTagName("tr");
var curRow;
var hiddenRows = new Array();
function hideTag(tagType, inverse)
{
  for(var i =0;i < trs.length;i++)
  {
    curRow = trs[i];
    //HACKERY to find the tag cell and check it for a specific tag
    if(curRow.childNodes.length > 3)
    {
      if(curRow.childNodes[3].className == "alt2")
      {
        if((!inverse && curRow.childNodes[3].childNodes[0].alt == tagType) ||(inverse && curRow.childNodes[3].childNodes[0].alt != tagType) )
        {
          if(curRow.childNodes[1].childNodes.length > 1&& curRow.childNodes[1].childNodes[1].src != "" && curRow.childNodes.length >= 12 )
          {
            curRow.style.display="none";
            hiddenRows.push(curRow);
          }
        }
      }
    }
  }
}
function hideStickyRows()
{
  for(var i =0;i < trs.length;i++)
  {
    curRow = trs[i];
    //document.getElementsByTagName("tr")[45].childNodes[5].childNodes[1].childNodes[1].childNodes[1].alt
    //:ugh:
    if(curRow.childNodes.length > 5)
    {
      if(curRow.childNodes[5].childNodes.length > 1 && curRow.childNodes[5].childNodes[1].childNodes.length > 1 && curRow.childNodes[5].childNodes[1].childNodes[1].childNodes.length > 1 )
      {
        if(curRow.childNodes[5].childNodes[1].childNodes[1].childNodes[1].alt == "Sticky Thread")
        {
          curRow.style.display="none";
          hiddenRows.push(curRow);
        }
      }
    }
  }
}
function showHidden()
{
  for(var i =0;i < hiddenRows.length;i++)
  {
    hiddenRows[i].style.display = "";
  }
  hiddenRows = new Array();
}
//grab query string values
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null ) return "";
  else return results[1];
}

function appendParam(param, value){

//all internal OT links
  var anchors = document.getElementsByTagName('a');
  var a;
  for(var i = 0;i < anchors.length;i++)
  {
    a = anchors[i];
    if(a.href.indexOf('forums.offtopic.com') != -1){
      if (a.href.match(/\?/i))
      {
        a.href += '&'+param+'='+value;
      }
      else
      {
        a.href += '?'+param+'='+value;
      }
    }
  }
  
//the jump bar
  var forms = document.getElementsByTagName("form")
  var curForm;
  for(var i =0; i < forms.length; i++){
    curForm = forms[i];
    if(curForm.action == "http://forums.offtopic.com/forumdisplay.php"){
      var newHidden = document.createElement("input");
      newHidden.type="hidden";
      newHidden.name=param;
      newHidden.value = value;
      curForm.appendChild(newHidden);
    }
  
  }
  
  
}

function hideNWS(inverse)
{
  hideTag("Nws", inverse);
}

///NWS PROCESSING
var nwsParam = gup("nws");
if(nwsParam == "0")
{
  hideNWS(0);
}
else if(nwsParam == "1")
{
  hideNWS(1);
}

if(nwsParam == "0" || nwsParam == "1")
{
  appendParam("nws", nwsParam);
}


var stickParam = gup("nostick");
if(stickParam == "1")
{
  hideStickyRows();
  appendParam("nostick", stickParam);
}