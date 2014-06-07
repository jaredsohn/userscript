// ==UserScript==
// @name          Achievement Timestamps with Milliseconds.
// @description   Replaces dates on Xbox Live achievement pages with timestamps.
// @include       http://live.xbox.*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

window.addEventListener("load", function(e) {

function zeroPad(num,count) {
  var numZeropad = num + '';
  while(numZeropad.length < count) {
    numZeropad = "0" + numZeropad;
  }
  return numZeropad;
}

var dateMap = {};
var datere = new RegExp(/"EarnedOn":"\\\/Date\([0-9]*\)\\\/","IsOffline":false/g);
while (true) {
  var match = datere.exec(document.body.innerHTML);
  if (match == null) break;
  var nameidx = document.body.innerHTML.substr(0, match.index).lastIndexOf('"Name":');
  if (nameidx == -1) continue;

  var name = document.body.innerHTML.substr(nameidx, match.index-nameidx);
  name = name.replace(/"Name":"(.*?)","Description"[^]*/, "$1");
  // Remove various junk characters from the name.
  // This may not be sufficient for all achievements...
  name = name.replace("\\r", "");
  name = name.replace("\\n", "");
  name = name.replace("'", "\u0027");
  name = eval("'"+name+"'");
  
  var timestamp = match[0].replace(/.*\(([0-9]*)\).*/, "$1");
  var date = new Date(parseInt(timestamp));
  // For some reason the timestamp isn't absolute; it's already
  // "corrected" for the local timezone.  Hopefully outputing it
  // like this and chopping off the GMT will do the right thing
  // for most people.
  var datestr = date.toUTCString() + "." + zeroPad(date.getUTCMilliseconds(),3);
  datestr = datestr.replace(" GMT", "");  
  
  if (dateMap[name] == null) dateMap[name] = [];
  dateMap[name].push(datestr);
}

var re = /<span class="earnedOn">Unlocked on [^$<]*<\/span>/g;
while (true) {
  var match = re.exec(document.body.innerHTML);
  if (match == null) break;
  var nameidx = document.body.innerHTML.substr(0, match.index).lastIndexOf('<div class="name">');
  if (nameidx == -1) continue;

  var name = document.body.innerHTML.substr(nameidx, match.index-nameidx);
  name = name.replace(/<div class="name">([^<]*)<\/div>[^]*/, "$1");
  name = name.replace("\r", "");
  name = name.replace("\n", "");

  if (dateMap[name] == null) {
    // This method doesn't work for secret achievements you don't have.
    // Not much I can do to fix it...
    // if (name != "Secret Achievement") alert("Missing achievement '" + name + "'!");
    continue;
  }

  document.body.innerHTML = document.body.innerHTML.substr(0, match.index) +
    '<span class="earnedOn">Unlocked on ' + dateMap[name].shift() + '</span>' +
    document.body.innerHTML.substr(match.index + match[0].length);
}

}, false);