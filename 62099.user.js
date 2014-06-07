// ==UserScript==
// @name          Achievement Timestamps.
// @namespace     http://www.geocities.com/snapdragon64
// @description   Replaces dates on Xbox Live achievement pages with timestamps.
// @include       http://live.xbox.tld/*/ViewAchievementDetails*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

// This function is a conglomeration of _xbcDisplayDate and _xbcDisplayTime
// from the relevant achievement pages.
function ReplaceWithDateAndTime(str, month, date, year, hours, minutes, offset, s)
{
var currentDate = new Date();
currentDate.setUTCMonth(month);
currentDate.setUTCDate(date);
currentDate.setUTCFullYear(year);
currentDate.setUTCHours(hours);
currentDate.setUTCMinutes(minutes);
var currentMonth = currentDate.getMonth() + 1;
var currentDay = currentDate.getDate();
var currentYear = currentDate.getYear();
if (currentYear<1000) currentYear+=1900;
var timeDesignator = '';
var is24HourClock = false;
var leadingZeroOnHour = false;
var leadingZeroOnMinute = true;
var currentHour = currentDate.getHours();
if (!is24HourClock)
{
    currentHour = currentHour % 12;
    if (currentHour == 0) currentHour = 12;
    if (currentDate.getHours() < 12)
    {
        timeDesignator = ' AM';
    }
    else
    {
        timeDesignator = ' PM';
    }
}
if (leadingZeroOnHour && currentHour < 10) currentHour = '0' + currentHour;
var currentMinute = currentDate.getMinutes();
if (leadingZeroOnMinute && currentMinute <10) currentMinute = '0' + currentMinute;
return str + "--></script>" +
       currentMonth + '/' + currentDay + '/' + currentYear + ' ' +
       currentHour + ':' + currentMinute + timeDesignator +
       "<script><!--";
}

document.body.innerHTML = document.body.innerHTML.replace(
/_xbcDisplayDate\(([0-9]*), ([0-9]*), ([0-9]*), ([0-9]*), ([0-9]*)\);/g,
ReplaceWithDateAndTime);
document.body.innerHTML = document.body.innerHTML.replace(
/<\/script>([0-9]*\/[0-9]*\/[0-9]*)<noscript>/g,
"</script><noscript>");
