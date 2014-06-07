// ==UserScript==
// @name           CLWhosOn
// @description    Craigslist Forum Recent Posters
// @include        http://*.craigslist.org/forums/?act=DF&forumID=*
// ==/UserScript==

function WithinTime(postTime,minutes)
{
	var now;
	now=new Date();
        now=getDate();
	if(postTime>=now-minutes)
		return true;
	return false;
}

function getHandle(subject)
{
  var 
    pos,
    item,
    handle;

    // look for handle parameter
    pos = subject.indexOf('<a href="?act=su&amp;handle=');
    if (pos < 0) {
      return '';
    }
    handle = subject.substr(pos+28);
    // look for closing "
    pos = handle.indexOf('"');
    if (pos < 0) {
      return '';
    }
    return handle.substr(0, pos);
}

function getTime(subject)
{
	var 
    pos,
    item,
    time;

    // look for handle parameter
    pos = subject.indexOf('<font size="1">');
    if (pos < 0) {
      return '';
    }
    time = subject.substr(pos+28);
    // look for closing "
    pos = time.indexOf('&nbsp;&nbsp;</font>');
    if (pos < 0) {
      return '';
    }
    return time.substr(0, pos);
}

var time,handle,lines,theTable,subjects,minutes,now,whosOn;

//Who has posted in the past X minutes
minutes=5;
minutes=minutes*1000
now=new Date();
now=getDate();

subjects = document.evaluate(
    "//table[@class='fbod threads']/tbody/tr/td",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < subjects.snapshotLength; i++) 
{
	theTable = subjects.snapshotItem(i);
	lines=thisTable.innerHTML.split('\n');
	
	for (var j = 0; j < lines.length; j++) 
	{
		handle=getHandle(line[j]);
		time=getTime(line[j]);
		if(WithinTime(time,minutes))
			whosOn=handle;
	}
}
alert(whosOn);


