// ==UserScript==
// @name           Investools Timestamp
// @namespace      Namespace
// @description    Correct web page stamp for local time
// @include        *investools.com/*
// ==/UserScript==

function GetTimeCode(hour,min)
{
  return ( (60 * hour) + min );
}

/* Time Zone Conversion Factor. Uncomment the zone you are in. ***************/

    // Pacific
    //TZ_Conversion = -3; TZ_Name = "PST";  

    // Mountain
    //TZ_Conversion = -2; TZ_Name = "MST";  

    // Central
    TZ_Conversion = -1; TZ_Name = "CST";  

    // Eastern
    //TZ_Conversion = 0;  TZ_Name = "EST";  

/****************************************************************************/

CurrentTimestampNode = document.getElementById('completionTimestamp');
CurrentTimestamp = CurrentTimestampNode.innerHTML;
SplitPos = CurrentTimestamp.indexOf(':');
TimeEnding = CurrentTimestamp.substr(SplitPos+3,2); // AM or PM
TimeZone = CurrentTimestamp.substr(SplitPos+6,3); // EDT
MarketOpenTimeCode = 570;   //  9:30 AM
MarketCloseTimeCode = 240;  //  4:00 PM
MarketNoonTimeCode = 720;   // 12:00 PM

CurrentMinutes = eval(CurrentTimestamp.substr(SplitPos+1,2));

// Get the Displayed Hour
if(CurrentTimestamp.charCodeAt(SplitPos-2) == 32) // Single Digit Hour
{
  CurrentHour = eval(CurrentTimestamp.substr(SplitPos-1,1));
}
else // Double Digit Hour
{
  CurrentHour = eval(CurrentTimestamp.substr(SplitPos-2,2));
}

if(TimeEnding == "AM" && GetTimeCode(CurrentHour,CurrentMinutes) >= MarketOpenTimeCode)
{ // After 9:30am
  SpanTagStart = "<span title=\"US Markets are open\" style=\"color:#008000;\">";
  SpanTagEnd = "</span>";
}
else if(TimeEnding == "PM" && ( GetTimeCode(CurrentHour,CurrentMinutes) <= MarketCloseTimeCode || GetTimeCode(CurrentHour,CurrentMinutes) >= MarketNoonTimeCode ))
{ // After 12:00pm or Before 4:00pm
  SpanTagStart = "<span title=\"US Markets are open\" style=\"color:#008000;\">";
  SpanTagEnd = "</span>";
}
else
{
  SpanTagStart = "<span title=\"US Markets are closed\" style=\"color:#CC0000;\">";
  SpanTagEnd = "</span>";
}

// Change the Current Hour
if(CurrentHour == 1)
{
  NewHour = 12;
  NewTimeEnding = TimeEnding;
}
else if(CurrentHour == 12)
{
  NewHour = CurrentHour + TZ_Conversion;
  if(TimeEnding =="AM")
    NewTimeEnding = "PM";
  else
    NewTimeEnding = "AM";
}
else
{
  NewHour = CurrentHour + TZ_Conversion;
  NewTimeEnding = TimeEnding;
}
  
// Replace hour and time ending in the time stamp string
CurrentTimestamp = CurrentTimestamp.replace(CurrentHour+":",NewHour+":");
CurrentTimestamp = CurrentTimestamp.replace(TimeEnding,NewTimeEnding);
CurrentTimestamp = CurrentTimestamp.replace(TimeZone,TZ_Name);

// Replace the html in the page
CurrentTimestampNode.innerHTML = SpanTagStart+CurrentTimestamp+SpanTagEnd;




