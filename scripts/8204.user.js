// ==UserScript==
// @name           MySpace - Add MP3 Links
// @namespace      http://d.hatena.ne.jp/brazil/
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

// UPDATE 2007/09/03 11:37 include list
// UPDATE 2007/06/14 11:37 purl/durl


if(!getPlayer()) return;

GM_addStyle(<><![CDATA[
	#downloads {
		background-color : white;
		color : #333 !important;
		border : 2px solid #333;
		text-align : left;
		padding : 1em 0;
	}
	#downloads li{
		margin-left : 3em;
	}
	#downloads a{
		color : #555 !important;
		text-decoration : underline !important;
	}
	#downloads h3{
		margin : 0 0 1em 1em !important;
	}
]]></>);

var ID_LINK_ID = 'ctl00_Main_ctl00_UserBasicInformation1_hlDefaultImage';
var XML_BASE_URL = 'http://mediaservices.myspace.com/services/media/musicplayerxml.ashx?b=';

// -- [Application] -------------
var id = getElementById(ID_LINK_ID).href.match(/friendID=(.*)/).pop();
var url = XML_BASE_URL+id;

xhr(url, function(text){
	insertAfter(getPlayer(), createLinks(text));
})

function getPlayer(){
	return getElementById('mp3player') || getElementById('mini');
}

function createLinks(text){
	var profile = convertToXML(text);
	var downloads = <ul id="downloads" />;
	downloads.@style = 'width:' + (getPlayer().offsetWidth || '400px');
	
	downloads.h3 = <h3>Download MP3</h3>
	
	if(profile.playlist.song.length()){
		for each(var song in profile.playlist.song){
			downloads.li += <li><a href={''+song.@durl || song.@purl}>{song.@title}</a></li>
		}
	} else {
		downloads.h3 += <h3>NOT FOUND</h3>
	}
	
	return convertToDOMElement(downloads);
}


// -- [Utility] -------------
function xhr(url, f){
	GM_xmlhttpRequest({
		method : 'GET', 
		url : url, 
		onload : function(res){
			f(res.responseText);
		}
	})
}

function convertToXML(text){
	return new XML(text.replace(/<\?.*\?>/gm,'').replace(/<!.*?>/gm, '').replace(/xmlns=".*?"/,''));
}

function convertToDOMElement(xml){
	var elm = document.createElement('span');
	elm.innerHTML=xml;
	return elm.firstChild;
}

function getElementById(id){
	return document.getElementById(id);
}

function insertAfter(target, node){
	return target.parentNode.insertBefore(node, target.nextSibling)
}
