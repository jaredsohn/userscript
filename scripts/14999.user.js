// ==UserScript==
// @name           BBC Ad remover
// @namespace      kestas.kuliukas.com
// @description    Make the BBC News media video screen larger, and remove the adverts which play before the content
// @include        http://news.bbc.co.uk/player/*
// ==/UserScript==

// Get the realplayer media link
if ( document.getElementById('embedbbRPImageWindow') != null )
{
	var ram = document.getElementById('embedbbRPImageWindow').src;
}
else if ( document.getElementById('embednbRPImageWindow') != null )
{
	var ram = document.getElementById('embednbRPImageWindow').src;
}
else if ( document.getElementById('embednbRPImageWindow_js') != null )
{
	var ram = document.getElementById('embednbRPImageWindow_js').src;
}
else if ( document.getElementById('embedbbRPImageWindow_js') != null )
{
	var ram = document.getElementById('embedbbRPImageWindow_js').src;
}
else
{
	alert('Error finding media stream data, please send an e-mail to kestas.j.k@gmail.com');
}

ram = ram.replace('ad=1', 'ad=0'); // Remove the ads

if ( ram.substr(0,1) == '/' )
{
	ram = 'http://news.bbc.co.uk'+ram;
}

// Get the title of the news
var title = document.title;
title = title.replace('BBC News Player - ', ''); // Remove the BBC notice

var mediaPlayer = '<object classid="CLSID:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA" border="0" name="mediaPlayerObject"  id="objbbRPImageWindow" height="336" width="600" >'+
'					<param name="autostart" value="true"/>'+
'					<param name="src" value="'+ram+'"/>'+
'					<param name="controls" value="ImageWindow"/>'+
'					<param name="console" value="av"/>'+
'					<embed name="mediaPlayerObject"  id="embedbbRPImageWindow" src="'+ram+'" height="336" width="600"  autostart="true" controls="ImageWindow" console="av" type="audio/x-pn-realaudio-plugin" border="0"/>'+
'				</object>'+
'				<!-- mediaPlayerStatus -->	'+
'				<object classid="CLSID:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA" id="objrpstatus" name="mediaPlayerStatus" height="30" width="600">'+
'					<param name="autostart" value="true"/>'+
'					<param name="src" value="'+ram+'"/>'+
'					<param name="controls" value="StatusBar"/>'+
'					<param name="console" value="av"/>'+
'					<embed name="mediaPlayerStatus" id="embedrpstatus" src="'+ram+'" controls="StatusBar" console="av" type="audio/x-pn-realaudio-plugin" height="30" width="600"/>'+
'				</object>		'+
'				<!-- mediaPlayerControl Active-->'+
'				<div id="activecontrols">'+
'					<embed name="mediaPlayerControl" style="height:30px;width:600px;" id="objrpcontrols" controls="ControlPanel" console="av" type="audio/x-pn-realaudio-plugin" showcontrols="1" showstatusbar="1" />'+
'					<object classid="CLSID:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA" name="activemediaPlayerControl">'+
'						<param name="controls" value="controlpanel" />'+
'						<param name="console" value="av" />'+
'					</object>'+
'				</div>';

// Write a clear link to the page allowing you to access the content
document.write('<html><head><title>'+title+'</title></head>'+
	'<body style="background-color:black;">'+
	'<div id="player" style="width:100%;text-align:center;">'+
	mediaPlayer+'</div>'+
        '</body></html>');