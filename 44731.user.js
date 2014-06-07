// ==UserScript==
// @name           RadioVZ
// @namespace      Radio
// @description    Zum Radio hörn auf SVZ
// @include        *schuelervz*
// ==/UserScript==

var navbar, newElement;
navbar = document.getElementById('Logo');
if (navbar) {
    newElement = document.createElement('object');

newElement.innerHTML = '<img src="http://img27.imageshack.us/img27/5379/logowsv.png" /><div id="WindowsPlayer">'+
        '<OBJECT ID=NSPlay1 WIDTH="295" HEIGHT="53" CLASSID=CLSID:22D6f312-B0F6-11D0-94AB-0080C74C7E95 CODEBASE="http://www.microsoft.com/ntserver/netshow/download/en/nsmp2inf.cab#Version=5,1,51,415" standby="Loading Microsoft Media Player components..." type="application/x-oleobject">'+
   	'<PARAM NAME=FileName VALUE="http://www.harderbase.fm/streams_192/hardstream_listen.pls">'+
   	'<PARAM NAME=Autostart VALUE=true>'+
	'<PARAM NAME=ControlType VALUE=2>'+
	'<PARAM NAME=AnimationAtStart VALUE=FALSE>'+
	'<PARAM NAME=TransparentAtStart VALUE=FALSE>'+
	'<PARAM NAME=ShowControls VALUE=true>'+
	'<PARAM NAME=ShowDisplay VALUE=false>'+
	'<PARAM NAME=ShowStatusbar VALUE=true>'+
	'<PARAM NAME=autosize VALUE=FALSE>'+
	'<PARAM NAME=ShowPositionControls VALUE=FALSE>'+
	'<PARAM NAME=ShowAudioControls VALUE=true>'+
   	'<EMBED Type=application/x-mplayer2 pluginspage="http://www.microsoft.com/windows/windowsmedia/players.asp" '+
        'width="123" '+
  	'height="50" '+
  	'src="http://www.harderbase.fm/streams_192/hardstream_listen.pls" '+
   	'name="nsplay" '+
        'Autostart=1  ControlType=1  AnimationAtStart=0  TransparentAtStart=0  ShowControls=1  ShowDisplay=0  ShowStatusbar=1 autosize=0  	ShowPositionControls=0 ShowAudioControls=1 ></EMBED>'+
        '</OBJECT>'+
        '</div>';

   navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}


var adSidebar = document.getElementById('Logo');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}