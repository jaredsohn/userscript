// ==UserScript==
// @name           RestylePM
// @namespace      RestylePM
// @description    Restyle profile links (names) in PM
// @include        http://*punchme.net/*
// ==/UserScript==
// Version 4 - June 27th, 2007

  //comment this next line out (two / marks before var, like the start of this line) to leave the chat room link there
  var hideChatRoom = true;
  
  //this is a list of CSS styles, then the styles below should be the same order to set the values
    
  var styleTags = "color|background" 

  /* This is a simple string of the user's ID, seperated by the | character */
  var experienceIDs = "99997|99998|99999";
  var experienceNotes = "99998-Test1|99999-Test2"; // notes, not required
  var experienceStyle = "orange|green"; //must be valid CSS code, don't forget the ; marks

  var enemyIDs = "99996|99999";
  var enemyNotes = "99996-Scammed Me|99999-Attacked My Gang"; // notes, not required
  var enemyStyle = "black|orange"; //must be valid CSS code, don't forget the ; marks

  var friendIDs = "99995|99999";
  var friendNotes = "99995-Protecting Me"; // notes, not required
  var friendStyle = "black|#00CCFF"; //must be valid CSS code, don't forget the ; marks

  var gang1IDs = "0000"; // you get the idea by now...
  var gang1Notes = "0000-[TAG] Kickass bastards!";
  var gang1Style = "yellow|black";

  var gang2IDs = "00000"; // you get the idea by now...
  var gang2Notes = "00000-[SUX] GRRRR!";
  var gang2Style = "black|inherit";

  var gang3IDs = "000000"; // you get the idea by now...
  var gang3Notes = "000000-[abc] Protected gang";
  var gang3Style = "black|yellow";

  // defaults, keep these to revert back to if they get messed up:
//  var styleTags = "color|background" 
//  var experienceStyle = "orange|green"; //must be valid CSS code, don't forget the ; marks
//  var enemyStyle = "red|orange"; //must be valid CSS code, don't forget the ; marks


  /* DO NOT EDIT BELOW THIS LINE!!! */
 var testAlertMax = 0;
 var testAlertCount = 0;
  
  var styleTagsArray = styleTags.split('|');
  var experienceStyleArray = experienceStyle.split('|');
  var enemyStyleArray = enemyStyle.split('|');
  var friendStyleArray = friendStyle.split('|');

  var gang1StyleArray = gang1Style.split('|');
  var gang2StyleArray = gang2Style.split('|');
  var gang3StyleArray = gang3Style.split('|');
  
  var experienceIDsArray = experienceIDs.split('|');
  var enemyIDsArray = enemyIDs.split('|');
  var friendIDsArray = friendIDs.split('|');
 
function changeColorsPM()
{
  experienceIDs = "|" + experienceIDs + "|";
  enemyIDs = "|" + enemyIDs + "|";
  friendIDs = "|" + friendIDs + "|";
  
  gang1IDs = "|" + gang1IDs + "|";
  gang2IDs = "|" + gang2IDs + "|";
  gang3IDs = "|" + gang3IDs + "|";
  
  if ((styleTagsArray.length != experienceStyleArray.length))
  {
    alert('RestylePM Configuration Error: Styles do not match (experience).');
    return 0;
  }
  
  if ((styleTagsArray.length != enemyStyleArray.length))
  {
    alert('RestylePM Configuration Error: Styles do not match (enemy).');
    return 0;
  }

  if ((styleTagsArray.length != friendStyleArray.length))
  {
    alert('RestylePM Configuration Error: Styles do not match (friend).');
    return 0;
  }
  var curStyle=0
  testAlertCount = 0;
  if(document.getElementsByTagName)
  {
    var el = document.getElementsByTagName('a');
      for(var i=0; i<el.length; i++)
      {
       if (el[i].href.indexOf('http://www.punchme.net/profile/') != -1) //profile link found
       {
	   tempIDStr = "";
           var tempIDStr = el[i].href.substring(el[i].href.indexOf('http://www.punchme.net/profile/') + 31,el[i].href.length);
           var theIDArray = tempIDStr.split(".");
           var theID = "|" + theIDArray[0] + "|";
           if (experienceIDs.indexOf(theID) != -1)
           {
             for(curStyle=0; curStyle<styleTagsArray.length; curStyle++)
             {
             	el[i].style[styleTagsArray[curStyle]] = experienceStyleArray[curStyle];
             	el[i].title = getNotes(theIDArray[0],experienceNotes,el[i].title);
             }
           }
           if (enemyIDs.indexOf(theID) != -1)
           {
             for(curStyle=0; curStyle<styleTagsArray.length; curStyle++)
             {
             	el[i].style[styleTagsArray[curStyle]] = enemyStyleArray[curStyle];
             	el[i].title = getNotes(theIDArray[0],enemyNotes,el[i].title);
             }
           }
           if (friendIDs.indexOf(theID) != -1)
           {
             for(curStyle=0; curStyle<styleTagsArray.length; curStyle++)
             {
             	el[i].style[styleTagsArray[curStyle]] = friendStyleArray[curStyle];
             	el[i].title = getNotes(theIDArray[0],friendNotes,el[i].title);
             }
           }
        }
       else if (el[i].href.indexOf('http://www.punchme.net/gang/') != -1) //profile link found
       {
	   tempIDStr = "";
           var tempIDStr = el[i].href.substring(el[i].href.indexOf('http://www.punchme.net/gang/') + 28,el[i].href.length);
           var theIDArray = tempIDStr.split(".");
           var theID = "|" + theIDArray[0] + "|";

           if (gang1IDs.indexOf(theID) != -1)
           {
             for(curStyle=0; curStyle<styleTagsArray.length; curStyle++)
             {
             	el[i].style[styleTagsArray[curStyle]] = gang1StyleArray[curStyle];
             	el[i].title = getNotes(theIDArray[0],gang1Notes,el[i].title);
             }
           }
           if (gang2IDs.indexOf(theID) != -1)
           {
             for(curStyle=0; curStyle<styleTagsArray.length; curStyle++)
             {
             	el[i].style[styleTagsArray[curStyle]] = gang2StyleArray[curStyle];
             	el[i].title = getNotes(theIDArray[0],gang2Notes,el[i].title);
             }
           }
           if (gang3IDs.indexOf(theID) != -1)
           {
             for(curStyle=0; curStyle<styleTagsArray.length; curStyle++)
             {
             	el[i].style[styleTagsArray[curStyle]] = gang3StyleArray[curStyle];
             	el[i].title = getNotes(theIDArray[0],gang3Notes,el[i].title);
             }
           }
        }
        else
        {
          if (hideChatRoom && (el[i].href.indexOf('http://www.punchme.net/chat.php') != -1))
          {
		el[i].href='#';
		el[i].style['display']='none';
          }
        }
     }
  }
}

function getNotes(lookForID,stringToSearch,defaultRtn)
{
  var idLenHolder = lookForID.length;
  if (stringToSearch.indexOf(lookForID + '-') != -1);
  {
    var searchingArray = stringToSearch.split('|');
    for (var curPlace = 0;curPlace < searchingArray.length;curPlace++)
    {
      if (searchingArray[curPlace].substring(0,idLenHolder) == lookForID)
      {
         return searchingArray[curPlace].substring(idLenHolder + 1,searchingArray[curPlace].length);
      }
    }
  }
  return defaultRtn;
}

function testAlert(textToAlert)
{
 if (testAlertCount < testAlertMax)
 {
  testAlertCount++;
  alert(textToAlert);
 }
}


changeColorsPM();