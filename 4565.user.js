// Blogger Commments
// version 1.0 BETA
// 2006-07-04
//
// SEE BELOW FOR INSTALLATION INSTRUCTIONS
//
// BSD Licence
// Copyright (c) 2006, Thom Shannon
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
// 
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of the "Thom Shannon" nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// Firefox:
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Blogger Commments", and click Uninstall.
//
// Internet Explorer:
// You will need GreaseMonkIE:
// http://www.daishar.com/blog/archives/2005/03/greasemonkey_fo.html
// Follow the latest installation instructions.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Blogger Comment Feeds
// @namespace     http://ts0.com/
// @description   Subscribe to feeds of comments on blogger blogs with any reader via a HTML to RSS proxy
// @include       http://www.blogger.com/comment.g*
// @include       http://blogger.com/comment.g*
// @include       https://www.blogger.com/comment.g*
// @include       https://blogger.com/comment.g*
// ==/UserScript==
              
var eleInfo, eleChkBox;
eleInfo = document.getElementById('content');

var aryServices = new Array('RSS File','Bloglines','My Yahoo!','Newsgator','My MSN','Google Reader')

var qs = new Querystring()
strFeedURL = 'http://www.ts0.com/bloggercomments/get.asp?blogID='+qs.get('blogID')+'&postID='+qs.get('postID');


dataIcon = 'data:image/gif,GIF89a%10%00%10%00%D5%20%00%EA%87%0A%FC%92%0C%ECY%00%E4q%00%E0j%19%D6%D6%D6%F0%ADF%E2%AE%81%EC%C5%85%E6e%00%E8%97Q%D5%A5d%C9%8DC%BEx%3A%C8%7C8%E6m%24%FE%9B%11%FB%86%05%DCa%00%F6%E2%CC%EE%D8%C6%E7%ACm%F1%ED%EA%DAX%00%F6x%02%FE%A7%19%DCj%00%FBc%00%E9%900%DCM%00%D2%D2%D2%FF%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%20%00%2C%00%00%00%00%10%00%10%00%00%06%A7%40%90pH%2C%0E9%03%8Dr%A9%1Cp%2CB%0E%C0%80%A8%1A2X%2C%E0%09%D2d%16%9F%F0gr%CDj%0A%20%09%84%C3%60%2C%26%E1%0Ad.%F1%A4!%01%00%20_%B1%7C*%01%10uiyad%11O%1F%1C%01%83%17%11%18%14%14a%07%11%15%1F%14%11%17v%8E%8F%03%0D~%0A%03%92%1C%9A%20%17%18%18%03%A8%0Ec%18%96%15%A5%A7p%13%18%09%92%09%1C%1F%07%B1%04b%09%1B%92%17%B9%15%1Dv%1D%02%92%13%1B%1B%04%1C%1B%18%07%0A%C5%20%0F%02%02%C7%CB%D9%CB%02%04v%16%04%1D%E1%E2%E3%DDh%20%16%05%1E%EA%EB%EChA%00%3B'

if (eleInfo) {
    eleSubLink = document.createElement('div');
    eleSubLink.id = 'divSubLink';
    eleInfo.insertBefore(eleSubLink, eleInfo.firstChild);
 		setupLink();
}

function setPlaceHolder(strHTML)
{
	document.getElementById('divSubLink').innerHTML = '<div style="padding:0.8em;">'+strHTML+'</div>'
}

function setupLink()
{
		if (GM_getValue("reader",'') == '')
    {
			strHTML = generateFeedButton()+'Choose your subscription type <select id="selectReader"><option>-</option>'
	  	for(x=0;x<aryServices.length;x++)
	  	{
	  		strHTML+='<option value="'+x+'">'+aryServices[x]+'</option>'
	  	}
	  	strHTML+='</select>'
    }
    else
    {
    	strHTML = generateLinkHTML();
    }
    setPlaceHolder(strHTML);

		if (GM_getValue("reader",'') == '')
    {
			document.getElementById('selectReader').addEventListener('change', function(e) {
				readers = document.getElementById('selectReader');
				GM_setValue("reader",readers[readers.selectedIndex].value);
				setupLink();
			},true);
		}
		else
		{
			document.getElementById('chngReader').addEventListener('click', function(e) {
				GM_setValue("reader",'');
				setupLink();
				return false;
			},true);
		}
}

function generateLinkHTML()
{
	switch(GM_getValue("reader",''))
	{
	case '1':
		strSubscriberURL = 'http://www.bloglines.com/sub/'+strFeedURL;
		break
	case '2':
		strSubscriberURL = 'http://add.my.yahoo.com/content?url='+escape(strFeedURL);
		break
	case '3':
		strSubscriberURL = 'http://www.newsgator.com/ngs/subscriber/subext.aspx?url='+escape(strFeedURL);
		break
	case '4':
		strSubscriberURL = 'http://my.msn.com/addtomymsn.armx?id=rss&ut='+escape(strFeedURL);
		break
	case '5':
		strSubscriberURL = 'http://www.google.com/reader/preview/*/feed/'+escape(strFeedURL);
		break
	default:
		strSubscriberURL = strFeedURL;
	}
	strHTML = generateFeedButton()+'Subscribe with <a target="_blank" href="'+strSubscriberURL+'" title="Subscribe with '+aryServices[GM_getValue("reader",'')]+'">'+aryServices[GM_getValue("reader",'')]+'</a> <a title="Change Reader" onclick="return false;" style="font-size:0.7em" href="#" id="chngReader>change</a>'
	return strHTML;
}
function generateFeedButton()
{
	strHTML = '<a href="'+strFeedURL+'" title="RSS Feed" style="border:0;"><img hspace="2" src="'+dataIcon+'" alt="Feed" style="margin-top:0.1em;" align="top" border="0"/></a>'
	return strHTML;
}





/* Client-side access to querystring name=value pairs
	Version 1.2.3
	22 Jun 2005
	Adam Vandenberg
*/
function Querystring(qs) { // optionally pass a querystring to parse
	this.params = new Object()
	this.get=Querystring_get
	
	if (qs == null)
		qs=location.search.substring(1,location.search.length)

	if (qs.length == 0) return

// Turn <plus> back to <space>
// See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
	qs = qs.replace(/\+/g, ' ')
	var args = qs.split('&') // parse out name/value pairs separated via &
	
// split out each name=value pair
	for (var i=0;i<args.length;i++) {
		var value;
		var pair = args[i].split('=')
		var name = unescape(pair[0])

		if (pair.length == 2)
			value = unescape(pair[1])
		else
			value = name
		
		this.params[name] = value
	}
}

function Querystring_get(key, default_) {
	// This silly looking line changes UNDEFINED to NULL
	if (default_ == null) default_ = null;
	
	var value=this.params[key]
	if (value==null) value=default_;
	
	return value
}
