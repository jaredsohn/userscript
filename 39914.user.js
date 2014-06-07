// ==UserScript==
// @author         rikuo
// @name           filter for tweet of favotter
// @namespace      http://d.hatena.ne.jp/rikuo/
// @description    the tweet of favotter is selected by using the name, regular expression, and the XPath.
// @include        http://favotter.matope.com/*
// @include        http://favotter.net/*
// @include        http://en.favotter.net/*
// @exclude        http://favotter.matope.com/status.php*
// @exclude        http://favotter.matope.com/en/status.php*
// @exclude        http://favotter.net/status.php?id=*
// @exclude        http://en.favotter.net/status.php?id=*
// ==/UserScript==
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//


// username 
// example:: 'foo bar baz'
var users = '';


// regexp or plain text
var filter = [
// example::
//	/foo(bar)/i,
//	'baz',

];


//------ for the experienced----------------------------------------------//
// XPath
var context = [

];
//------------------------------------------------------------------------//

var _doc = document;

if(!e('timeline'))return;

var alpha = '0.5';

var btnText = [];

btnText[0] = ['\u975E\u8868\u793A','\u5E0C\u8584\u5316','\u5f37\u8abf'];
btnText[1] = ['hide','translucent','accent'];

var imgData = 'data:image/gif;base64,'+
    'R0lGODlhDgAdAPEDAP//3f9PFsDAwAAAACH5BAEAAAIALAAAAAAOAB0AAAI1lI+py+1/AgzS0cou'+
    'VnqjDixgmIxkpAHqKZjqd60rHMtlOt81i9ZZ2uhYLg9i0ZOBKJdMQwEAOw==';

var l;
var btnID = 'tweetshowhidebtn';

(location.href.match(/\/en\//i))?l=1:l=0;

var showhide = GM_getValue( 'favmode', 1);


var select_tweet = function(doc){
	var usernames = xpath(doc,'descendant::div[contains(concat(" ",@class," "),"info")]/strong/a');
	if(usernames.snapshotLength){
		for(var i=0,ul = usernames.snapshotLength; i < ul; ++i){
			var user = usernames.snapshotItem(i);
			for(var n=0,al=users.length; n < al; ++n){
				if(users[n] == user.textContent){
					var entry = user.parentNode.parentNode.parentNode;
					setCheck(entry);
					break;
				}
			}
		}
	}
	if(filter.length){
		var text = xpath(doc,'descendant::div[contains(concat(" ",@class," "),"bubble") and not(parent::div[contains(concat(" ",@class," "), "chkFaventry")])]/span');
		if(text.snapshotLength){
			for(var j=0,tl=text.snapshotLength; j<tl ; ++j){
				var status = text.snapshotItem(j);
				var statustext = status.textContent;
				for(var m=0,fl=filter.length; m<fl ; ++m){
					var re = filter[m];
					if(statustext.match(re)){
						var REentry = status.parentNode.parentNode;
						setCheck(REentry);
						break;
					}
				}
			}
		}
	}
	if(context.length){
		var xpath_entries = xpath(doc,'descendant::div[contains(concat(" ",@class," "),"bubble") and not(parent::div[contains(concat(" ",@class," "), "chkFaventry")])]');

		if(xpath_entries.snapshotLength){
			for(var k=0,xl=xpath_entries.snapshotLength; k<xl ; ++k){
				var tweet = xpath_entries.snapshotItem(k).parentNode;
				for(var o=0,cl=context.length; o<cl ; ++o){
					var chkxpath = xpath(tweet, context[o]);
					if(chkxpath.snapshotLength){
						setCheck(tweet);
						break;
					}

				}
			}
		}
	}
}


users = users.split(/\s+/);
filter = checkRegExp(filter);
setBtn();

select_tweet(_doc);
setCount();



function setBtn(){
	var body = _doc.body;
	var df = _doc.createDocumentFragment();
	GM_addStyle(
		'#'+btnID+'{position:fixed;top:0;left:0;background:white;-moz-border-radius:0 0 8px 0;display:block;width:7em;color:#333;text-decoration:none;cursor:pointer;padding:5px;opacity:0.8;-moz-opacity:0.8;}'+
		'#'+btnID+':link,'+'#'+btnID+':visited,'+'#'+btnID+':hover{color:#333;text-decoration:none;}'
	);

	var btn = c('a');
	df.appendChild(btn);
	btn.id = btnID;
	btn.textContent = btnText[l][showhide];
	btn.addEventListener('click',chengeShowHide,false);
	var span = c('span');
	btn.appendChild(span);
	span.id = 'showhidenum';
	span.textContent = ':0';
	body.appendChild(df);
	addCss(showhide);
}

function chengeShowHide(){
	if(showhide == 2){
		showhide=0;
	}else if(showhide == 1){
		++showhide;
	}else{
		 ++showhide;
	}
	addCss(showhide);
	GM_setValue('favmode', showhide);
	e(btnID).firstChild.nodeValue = btnText[l][showhide];
}

function addCss(num){
	if(num == 1){		// translucent
		GM_addStyle('div.chkFaventry{display: block; opacity :'+alpha+'; -moz-opacity:'+alpha+';}');
	}else if(num == 2){	// accent
		GM_addStyle('div.chkFaventry{display: block; opacity: 1;-moz-opacity: 1;} div.chkFaventry div.thumb{background-image:url('+imgData+');} div.chkFaventry div.entry-content{background-color: #ffffdd; border:3px solid #ff4f16;}');
	}else{			// hide
		GM_addStyle('div.chkFaventry{display: none;} div.chkFaventry div.thumb{background-image: url("http://favotter.matope.com/tip-rounded.gif");} div.chkFaventry div.entry-content{background-color: #eeeeff; border:3px solid #cccccc;}');
	}
}

function setCount(){
	var count = xpath(e('timeline'),'descendant::div[contains(concat(" ",@class," "), "chkFaventry")]').snapshotLength;
	e('showhidenum').firstChild.nodeValue = ':'+count;
}

function setCheck(entry){
	entry.className += ' chkFaventry';
}

function checkRegExp(array){
	if(array.length){
		for(var i=0,al=array.length; i<al ; ++i){
			var type = typeof array[i];
			if( type == 'string') array[i] = _r(array[i]);
		}
	}
	return array;
}


function _r(str){
	var r = new RegExp( (str + '').replace(/([\/()[\]{}|*+-.,^$?\\])/g, "\\$1") , 'i');
	return r;
}

function c(tag_name){
	return _doc.createElement(tag_name);
}
function e(id){
	return _doc.getElementById(id);
}

function xpath(context, query){
	return _doc.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	)
}

if(window.AutoPagerize) {
	boot();
}else{
	window.addEventListener('GM_AutoPagerizeLoaded',boot,false);
}

function boot(){
	window.AutoPagerize.addFilter(function(docs){
		docs.forEach(select_tweet);
		setCount();
	});
}

