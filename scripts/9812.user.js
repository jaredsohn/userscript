// ==UserScript==
// @name           NewsFix
// @namespace      NewsFix
// @description    Fix newspaper in MS and PM
// @include        http://*punchme.net/newspaper.php*
// @include        http://*mafiastreets.com/newspaper.php*
// @include        http://*mafiastreets.com/profile/*
// ==/UserScript==
// Version 3 - June 17th, 2007

  /* This is a simple string of the user's ID, seperated by the | character
     so this would ignore users 26337 AND 99999, put as many as you'd like here */
  var ignoreIDsPM = "26337|99999";
  /* PM scum list */
  // loaded from http://punchme.andryou.com/scum.php on 6/18/2007 (85 total), you can add more to the end
  var scumIDsPM = "148|2084|2819|4101|5159|10685|15340|15619|15982|16065|16548|16960|17323|17445|17577|17864|18482|18581|18702|19277|19384|19498|19773|19926|20219|20422|21080|21211|21253|21258|21301|21591|21940|22198|22304|22434|22608|22698|22746|22804|22902|23430|23566|24112|24204|24533|24575|24700|24896|25193|25236|25244|25320|25349|25619|25690|25771|25785|25884|25993|26013|26233|26332|26337|26348|26349|26350|26352|26354|26355|26356|26357|26441|26544|26656|26748|26948|26986|26995|27178|27220|27562|28072|28617|28796";
  /* MS ignore list */
  /* CURRENTLY BROKEN */
  var ignoreIDsMS = "904|30248|99999";
  /* MS scum list */
  /* CURRENTLY BROKEN */
  var scumIDsMS = "30248|99999";
    /*MS 30248 TAKING CREDIT FOR THIS WORK, THAT IS NOT HIS */
  /* This is the ignore length, for continuous characters without a string */
  var ignoreLength = 100;
  var tooLongColor = "green";
  var scumColor = "red";
  var ignoreColor = "orange";

  /* DO NOT EDIT BELOW THIS LINE!!! */
  var internalIgnoreList = "";
  var internalScumList = "";
  var ignoreNext = false;
  var scumNext = false;
  var punchMe = true;
  var alerted = false;
  var sanatizeCounter = 0;
function testFit(){
  if (document.body.innerHTML.indexOf('http://www.mafiastreets.com/') != -1)
  {
    punchMe = false;
  }

//document.body.innerHTML += "<script>function showHideSanatized(id){  var curElement = findElementById('sanatized'+id);  if (curElement)  {    if (curElement.style['display'] == 'none')    {      curElement.style['display'] = 'block';    }    else    {      curElement.style['display'] = 'none';}}}</script>";
  if(document.getElementsByClass)
  {
   alert('ok');
  }

  if(document.getElementsByTagName)
  {
    var el = document.getElementsByTagName('tr');
      nextTR = false;
      var curStr = "";
      initIgnoreLists();
      for(var i=0; i<el.length; i++)
      {
       if ((el[i].getElementsByTagName('tr')).length == 0)
       {
        if (el[i].innerHTML == '<td class="contenthead" colspan="2">Signature</td>')
	{
	     nextTR = true;
	}
	else if ((el[i].innerHTML.indexOf('<td width="15%"><b>Poster</b>:</td>') != -1) && (el[i].innerHTML.indexOf('<input name="advert" value="Post" type="submit">') == -1))
	{
	   nextTR = true;
	   ignoreNext = false;
	   scammerNext = false;
	   tempIDStr = "";
	   if (punchMe)
	   {
             var tempIDStr = el[i].innerHTML.substring(el[i].innerHTML.indexOf(' href="http://www.punchme.net/profile/') + 38,el[i].innerHTML.length);
           }
           else
           {
             var tempIDStr = el[i].innerHTML.substring(el[i].innerHTML.indexOf('http://www.mafiastreets.com/profile/') + 36,el[i].innerHTML.length);
           }

           var theIDArray = tempIDStr.split(".");
           var theID = "|" + theIDArray[0] + "|";
           if (internalIgnoreList.indexOf(theID) != -1)
           {
             ignoreNext = true;
           }
           if (internalScumList.indexOf(theID) != -1)
           {
             scumNext = true;
           }
	}
	else
	{
	   if (nextTR)
	   {
	     if (ignoreNext && false) //false put in to skip
	     {
                   //el[i].innerHTML = '<td width="100%" colspan="4"><div style="width: 100%; text-align: left;color: red; font-size:200%;">[DELETED - Ignored]</div></td>';
                   //ignoreNext = false;
	     }
	     else
	     {
	       curStr = "";
	       parseThis = "";
               var inHTMLArray=el[i].innerHTML.split("<"); //split starting HTML tags
               for(var j=0; j<inHTMLArray.length; j++)
               {
                 if (j != 0)
                 {
                   curStr += "<"; //replace the < stripped out...
                 }
                 var secondHTMLArray = inHTMLArray[j].split(">"); //split ending HTML tags
                 //but we really only want the first closer for each HTML tag, the rest is text inside...
                 for(var secondHTMLArrayI=0; secondHTMLArrayI<secondHTMLArray.length; secondHTMLArrayI++)
                 {
                   if (secondHTMLArrayI == 0) //this is the first tag, grab it
                   {
                     curStr += secondHTMLArray[secondHTMLArrayI];
                     if (secondHTMLArrayI == secondHTMLArray.length) //if this is the only one
                     {
                       curStr += '> '; //replace the tag, otherwise will be covered in next statement
                     }
                   }
                   else
                   {
                     curStr += '> ' + sanatizeText(secondHTMLArray[secondHTMLArrayI]);
                   }
                 }
               }
               el[i].innerHTML = curStr;
             }
	   }
	   nextTR = false;
	}
       }	
      }
   }
}

function sanatizeText(sanatizeThis)
{
  sanatizedText = "";
  if (sanatizeThis == " ") { return " "; }
  var parseThisArray = sanatizeThis.split(" "); //split into words
  for(var parseThisI=0; parseThisI<parseThisArray.length; parseThisI++)
  if (parseThisArray[parseThisI].length > ignoreLength)
  {
    tempStr = "";
    for (var splitter = 0;splitter < parseThisArray[parseThisI].length;splitter++)
    {
      if (splitter != 0 && splitter % 40 == 0)
      {
        tempStr += sanatizeThis.substring(splitter - 40,splitter) + '<br />';
      }
    }
    sanatizedText = '<div style="color: ' + tooLongColor + '; font-size:150%" onclick="var curElement = document.getElementById(\'sanatized'+sanatizeCounter+'\');  if (curElement)  {    if (curElement.style[\'display\'] == \'none\')    {      curElement.style[\'display\'] = \'block\';    }    else    {      curElement.style[\'display\'] = \'none\';}}" alt="showHideSanatized(' + sanatizeCounter + ')">[Too Long - Click to Show/Hide]</div><span id="sanatized' + sanatizeCounter + '" style="display: none;">'  + tempStr + '</span>';
    sanatizeCounter++;
  }
  else
  {
    sanatizedText += ' ' + parseThisArray[parseThisI];
  }
  
  if (ignoreNext && sanatizeThis != '')
  {
    sanatizedText = '<div style="color: ' + ignoreColor + '; font-size:150%" onclick="var curElement = document.getElementById(\'sanatized'+sanatizeCounter+'\');  if (curElement)  {    if (curElement.style[\'display\'] == \'none\')    {      curElement.style[\'display\'] = \'block\';    }    else    {      curElement.style[\'display\'] = \'none\';}}" alt="showHideSanatized(' + sanatizeCounter + ')">[Ignored - Click to Show/Hide]</div><span id="sanatized' + sanatizeCounter + '" style="display: none;">'  + sanatizedText + '</span>';
    sanatizeCounter++;
    ignoreNext = false;
  }

  if (scumNext && sanatizeThis != '')
  {
    sanatizedText = '<div style="color: ' + ignoreColor + '; font-size:150%" onclick="var curElement = document.getElementById(\'sanatized'+sanatizeCounter+'\');  if (curElement)  {    if (curElement.style[\'display\'] == \'none\')    {      curElement.style[\'display\'] = \'block\';    }    else    {      curElement.style[\'display\'] = \'none\';}}" alt="showHideSanatized(' + sanatizeCounter + ')">[Scum - Click to Show/Hide]</div><span id="sanatized' + sanatizeCounter + '" style="display: none;">'  + sanatizedText + '</span>';
    sanatizeCounter++;
    scumNext = false;
  }

  return sanatizedText;
}

function initIgnoreLists()
{  
  if (punchMe)
  {
    internalIgnoreList = ignoreIDsPM;
    internalScumList = scumIDsPM;
  }
  else
  {
    internalIgnoreList = ignoreIDsMS;
    internalScumList = scumIDsMS;
  }
  internalIgnoreList = "|" + internalIgnoreList + "|";
  internalScumList = "|" + internalScumList + "|";
}
testFit();