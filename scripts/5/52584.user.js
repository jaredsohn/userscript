// <![CDATA[
// ==UserScript==
// @name LongURL
// @description LongURL replace shortened links using LongURL API !
// @author TiTi
// @version 1.5
// @date 2009-07-14
// @licence WTFPL; http://sam.zoy.org/wtfpl/
// @namespace http://userscripts.org/scripts/show/52584
// @include http://*
// @include https://*
// @exclude http://longurl.org/*
// @exclude http://userscripts.org/scripts/show/52584
// ==/UserScript==

/*
This script is using the LongURL API : http://longurl.org/api

By default, this script replace the href="" attribute of the link with the long url.
->This means your browser won't call the url shortener website when you'll click the link.
This is voluntary, because thoses services are useless and dangerous : obfuscation act like a third DNS resolver.
See : http://www.codinghorror.com/blog/archives/001276.html
By default this script also replace the content of the a tag (visible text) with the title of the page.

I think the expand function - as seen in twitter search results for instance - is boring and useless for the user.
Plus there's the security problem with the shortened links.
Several possibilities :
-Call the API each time needed (onmouseover) ; but user have to wait & can rapidly click (before xhr return the long-url)
-Request at page load if there is a/some link(s) in the page, in order to process tiny url
	-In that case don't forget to take car of new data (ajax)
=> This script is using the second possibility.

Another problem : Opera XML Store only works with Widgets... so we cannot store the list of supported services.
I know we can emulate GM functions, see http://www.howtocreate.co.uk/operaStuff/userJavaScript.html
But: using cookies is not cool. It's a workaround for a domain for sure, but it is not clean.
Therefore two possibilities :
-Request a list of know services each time this user script is called (=> for each web page you visit!) ; downside = network call (cost time + load[for longurl.org])
-Write the list in plain text in the code ; downside = not updated, but js callback simply won't work if long url return an error [not dramatic]
=> That second solution is not too bad.

I'm using the JSON syntax for objects (aka 'Literal Object', recommended by experts like Douglas Crockford).
I'm using unintrusive dynamic script nodes [not anymore for GreaseMonkey users] : http://tech.bluesmoon.info/2006/10/unintrusive-dynamic-script-nodes.html

This script is mainly targetted for Opera users.
It seems user scripts also work with others browsers than Opera & GreaseMonkey, like Safari, Chrome or IE.
I'll be happy to take a look... if I've got enough time! If the script doesn't work, please send me a message.

To send me comments or questions : anth.ibug at gmail.

------------------
TODO:

-que faire si le site détruit ma div :-( possible ?
-make it work for cloned nodes, see checkLink function
-Problems with the tooltip on the borders of the screen (not visible)
-GM_* functions for GreaseMonkey users
-Mozilla Jetpack / JQuery plugin (standalone?)
-update services list...

------------------
CHANGELOG:

1.5 :
-Prevent memory leak, see http://ajaxian.com/archives/dynamic-script-generation-and-memory-leaks
-zIndex & wordWrap style for tooltip
-Services list updated (235)

1.4 :
-optimize showTooltip function -> 10x faster with ff \o/ (mouse over -> tooltip time to appear)
-remove processRequest & showTooltip useless parameter (json), using LongURL.storedRequests[url] instead
-added GM_xmlhttpRequest for FF users ; remove use of unsafeWindow :) ; use of JSON.parse if supported
-added try-catch block

-Still don't understand why it's not working with 'Twitter Sidebar Replies', processRequest is called, and modify DOM ! But no repercusion on the screen, W.T.F. ?
-tweetbe.at is working with Opera, not with Firefox, why ? +really slow with FF

1.3 :
-added option storedRequests
-reduce number of requests by storing results
-Tried to make the script work with 'Twitter Sidebar Replies' userscript - http://userscripts.org/scripts/show/36635
-> Concerning GreaseMonkey user only, because this script doesn't work with Opera.
But somehow firefox refuse to create the network request after script injection : with firebug check html->head->scripts...
Thoses scripts which stay indicate 'Failed to load source for'. Really weird = clic edit, add a character and remove it rapidly, clic edit(stop) -> ff load the script and execute it perfectly, url is replaced ! WTF ?! (first comment line 145 to avoid js error)

1.2 :
-added ajax support :) - Examples : 'more' button on twitter, tweetbe.at, twitter100.com, ...
-added option : showPopup
-added option : forceVisibleHref
-reduce 'Media type' font size in the tooltip
-exclude http://longurl.org/*
-exclude the userscript.org tutorial itself ^^

1.1 :
-added https support (concern only GreaseMonkey users)
-reduce alpha transparency of the popup

1.0 : Initial release
------------------
*/

var LongURL = 
{
    options:
    {
		showPopup: true, // Show a tooltip when the mouse is over the link
        replaceHref: true, // For security and rapidity, true is more than recommended ; Replace the link your browser will hit if you click the link
        replaceVisibleHref: 1, // 0: no, 1: title, 2: link ; default=1 as recommended by W3C : http://www.w3.org/TR/WCAG10-HTML-TECHS/#link-text ; http://www.w3.org/TR/WCAG20-HTML-TECHS/
		forceVisibleHref: false, // Force change of the link text even if it's not the target - Example: <a href="http://is.gd/w">Home page of Google</a>
        logHeader: '[LongURL]'
    },
	
    callbacks : [], // The global callbacks array that stores a reference to all active callbacks
	
	preparedRequests : 0, // Total number of requests to LongURL API (for the current page)
	
	storedRequests : {},
	
	prepareRequest: function(a)
	{
		if(LongURL.storedRequests[a.href])
		{
			if(LongURL.storedRequests[a.href].data == null) // Does the result exist for now ?
			{
				var t = LongURL.storedRequests[a.href].waitingItems;
				t[t.length] = a; // Add the link the the waitingItems list for future processing
			}
			else // Parse the link with the data previously stored
			{
				LongURL.processRequest(a);
			}
			return; // This tinyurl has already been listed, stop here!
		}
		
		LongURL.storedRequests[a.href] = {data: null, waitingItems: []}; // We store the url, and get the data
		
		// We create the script element first so that it will be available to the closure, same for `i` - the current position
		var s = document.createElement('script');
		var i = LongURL.callbacks.length;
		
		// Now add our custom callback to the callback array so that the added script node can access it
		LongURL.callbacks[i] = function(json)
		{
			var tinyurl = a.href; // Convenient variable, especially for use after processRequest call
			console.log(LongURL.options.logHeader + ' Getting ' + tinyurl);
			
			// Store the data
			LongURL.storedRequests[tinyurl].data = json;
			
			// Process :)
			LongURL.processRequest(a); // Don't use 'a' after this line, especially a.href (changed in processRequest)
			
			// Also process waiting items with the same url
			var WItems = LongURL.storedRequests[tinyurl].waitingItems;
			for(var j = 0; j < WItems.length; j++)
			{
				// Process waiting item
				LongURL.processRequest(WItems[j]);
				
				// Clear out
				WItems[j] = null;
				delete WItems[j];
			}
			
			// Clear out our entry in the callback array since we don't need it anymore
			LongURL.callbacks[i] = null;
			delete LongURL.callbacks[i];
			
			if(typeof(GM_addStyle) === 'undefined')
			{
				// Remove the script node since we no longer need it
				//document.getElementsByTagName('head')[0].removeChild(s);				
				var script;
				while(script = document.getElementById('LongURL_callback' + i))
				{
					script.parentNode.removeChild(script);
					// Browsers won't garbage collect this object.
					// So castrate it to avoid a major memory leak.
					for(var prop in script)
					{
						delete script[prop];
					}
				}
			}
			
			// Clear out all outer variables referenced in the closure to prevent memory leaks in some browsers (Opera & FF not concerned?)
			i = s = null;
		};
		
		var apiurl = 'http://api.longurl.org/v2/expand?';
		var request = 'url=' + encodeURIComponent(a.href) +
		'&all-redirects=1' +
		'&content-type=1' +
		'&response-code=1' +
		'&title=1' +
		'&rel-canonical=1' +
		'&meta-keywords=1' +
		'&meta-description=1' +
		'&format=json';
		
		if(typeof(GM_addStyle) !== 'undefined') // Using GreaseMonkey
		{
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: apiurl + request,
				headers:
				{
					'User-Agent': window.navigator.userAgent + ' GreaseMonkey LongURL'
				},
				onload: function(response)
				{
					if(typeof(JSON) !== 'undefined')
					{
						LongURL.callbacks[i](JSON.parse(response.responseText)); // FF 3.5 JSON.parse
					}
					else
					{
						LongURL.callbacks[i](eval('(' + response.responseText + ')')); // old FF (noobs)
					}
				}
			});
		}
		else // Using Opera for instance
		{
			var jsonp = '&callback=' + encodeURIComponent('LongURL.callbacks[' + i + ']');
			
			s.src = apiurl + request + jsonp;
			s.id = 'LongURL_callback' + i;
			s.type = 'text/javascript';
			
			document.getElementsByTagName('head')[0].appendChild(s); // Work only if there is a head tag (websites without head => noobs)
		}
		
		LongURL.preparedRequests++;
	},
	
	processRequest: function(a)
	{
		try
		{
			if(typeof(a) != 'object') // asynchronous -> a could have been destroyed
			{
				throw('Current element is not and object');
			}
			
			var json = LongURL.storedRequests[a.href].data;
			
            if(json['response-code'] != 200) // Will never get into the if with LongURL API 2.0 ...
			{
                if(json['messages'])
                {
                    for(var j = 0; j < json['messages'].length; j++)
                    {
                        throw('Server Response - ' + json['messages'][j]['type'] + ': ' + json['messages'][j]['message'] + ' For ' + a.href);
                    }
                }
                else
                {
                    throw('Server Response Error ' + json['response-code'] + ', for ' + a.href);
                }
			}
			else
			{
				// Copy the data, first 'if' may change the value ^^
				var tinyurl = a.href;
				
                if(LongURL.options.replaceHref && json['long-url'])
                {
					// Whatever the content of the link is, we change the href attribute
                    a.href = json['long-url'];
                }
				
				if(LongURL.options.replaceVisibleHref > 0)
                {
					if(tinyurl == a.innerHTML || LongURL.options.forceVisibleHref)
					{
						if(LongURL.options.replaceVisibleHref == 1 && json['title'])
							a.innerHTML = json['title'];
						else if(json['long-url'])
							a.innerHTML = json['long-url'];
					}
                }
				
				if(LongURL.options.showPopup)
				{
					a.addEventListener(
						'mouseover',
						function(e)
						{
							LongURL.showTooltip(tinyurl);
						},
						false
					);
					a.addEventListener(
						'mouseout',
						function(e)
						{
							// Mouseout is fired when moving to another element, even if the mouse stay inside the <a> :-(
							// We have to check if this event is really a mouseout for our <a> element						
							
							var current_mouse_target = null;
							if(e.toElement)
							{				
								current_mouse_target = e.toElement;
							}
							else if(e.relatedTarget)
							{				
								current_mouse_target = e.relatedTarget;
							}
							
							// Code inside this if is executed when leaving the link and it's children, for good
							if(a != current_mouse_target && !LongURL.is_child_of(a, current_mouse_target))
							{
								LongURL.hideTooltip();
							}
						},
						false
					);
				}
			}
		}
		catch(err)
		{
			console.log(LongURL.options.logHeader + '[ERROR] ' + err);
		}
	},
	
	is_child_of: function(parent, child) // Utility function for mouseout listener
	{
		if(child != null)
		{			
			while(child.parentNode)
			{
				if((child = child.parentNode) == parent)
				{
					return true;
				}
			}
		}
		return false;
	},
	
	tooltip: null, // Tooltip div element

    showTooltip: function(tinyurl)
    {
		var json = LongURL.storedRequests[tinyurl].data;
		
		var temp = '<b>LongURL:</b> <a href="' + json['long-url'] + '" style="font-size:15px">' + json['long-url'] + '</a><br />';
		if(json['title'])
			temp += '<b>Title:</b> <span style="font-size:20px;color:#2200CC">'+json['title'] + '</span><br />';
		temp += '<br />';
		temp += '<b>ShortURL:</b> <span style="color:#008000">' + tinyurl + '</span><br />';
		if(json['meta-description'])
			temp += '<b>Description:</b> <span style="font-size:13px;color:#2200CC">'+json['meta-description'] + '</span><br />';
		if(json['all-redirects'] || json['content-type'] || json['rel-canonical'] || json['meta-keywords'])
			temp += '<br />';
		if(json['all-redirects'])
		{
			for(var m = 0; m < json['all-redirects'].length; m++)
			{
				temp += '<b>HTTP redirect:</b> <span style="color:#008000">' + json['all-redirects'][m] + '</span><br />';
			}
		}
		if(json['content-type'])
			temp += '<span style="font-size:9px;color:#2200CC"><b>Media type:</b> '+json['content-type'] + '</span><br />';
		if(json['rel-canonical'] || json['meta-keywords'])
			temp += '<br />';
		if(json['rel-canonical'])
			temp += '<b>Canonical URL:</b> '+json['rel-canonical'] + '<br />';
		if(json['meta-keywords'])
			temp +='<b>Keywords:</b> '+json['meta-keywords'] + '<br />';
		// Not shown : response-code (always 200 here)
		
		LongURL.tooltip.innerHTML = temp; // Only one .innerHTML :D
        LongURL.tooltip.style.display = 'block';
    },

    hideTooltip: function()
    {
        LongURL.tooltip.style.display = 'none';
    }
};

//--------------------------------------------------

if(window.opera)
{
	// Firebug <-> Opera
	window.console =
	{
		log: window.opera.postError,
		debug: window.opera.postError,
		info: window.opera.postError,
		warn: window.opera.postError,
		error: window.opera.postError,
		trace: window.opera.postError
	};
	GM_log = window.opera.postError;
}

(function() // GraseMonkey => "executed when the page completes loading, after creating the DOM for the page, but before running any onload handlers that have been defined." ; Opera handle this code too because filename ends with ".user.js"
{
	try
	{
		// 235 known services in plain text, for now (perf boost but not up to date)
		var known_services = {'0rz.tw':{'domain':'0rz.tw','regex':null},'2tu.us':{'domain':'2tu.us','regex':null},'3.ly':{'domain':'3.ly','regex':null},'307.to':{'domain':'307.to','regex':null},'6url.com':{'domain':'6url.com','regex':null},'7.ly':{'domain':'7.ly','regex':null},'a.gg':{'domain':'a.gg','regex':null},'a.nf':{'domain':'a.nf','regex':null},'a2n.eu':{'domain':'a2n.eu','regex':null},'ad.vu':{'domain':'ad.vu','regex':null},'adf.ly':{'domain':'adf.ly','regex':null},'adjix.com':{'domain':'adjix.com','regex':null},'afx.cc':{'domain':'afx.cc','regex':null},'alturl.com':{'domain':'alturl.com','regex':null},'atu.ca':{'domain':'atu.ca','regex':null},'azqq.com':{'domain':'azqq.com','regex':null},'b23.ru':{'domain':'b23.ru','regex':null},'b65.com':{'domain':'b65.com','regex':null},'bacn.me':{'domain':'bacn.me','regex':null},'bit.ly':{'domain':'bit.ly','regex':null},'bloat.me':{'domain':'bloat.me','regex':null},'bon.no':{'domain':'bon.no','regex':null},'bsa.ly':{'domain':'bsa.ly','regex':null},'budurl.com':{'domain':'budurl.com','regex':null},'buk.me':{'domain':'buk.me','regex':null},'canurl.com':{'domain':'canurl.com','regex':null},'chilp.it':{'domain':'chilp.it','regex':null},'cl.lk':{'domain':'cl.lk','regex':null},'cl.ly':{'domain':'cl.ly','regex':null},'clck.ru':{'domain':'clck.ru','regex':null},'cli.gs':{'domain':'cli.gs','regex':null},'cliccami.info':{'domain':'cliccami.info','regex':null},'clipurl.us':{'domain':'clipurl.us','regex':null},'clop.in':{'domain':'clop.in','regex':null},'cort.as':{'domain':'cort.as','regex':null},'crks.me':{'domain':'crks.me','regex':null},'cutt.us':{'domain':'cutt.us','regex':null},'cuturls.com':{'domain':'cuturls.com','regex':null},'decenturl.com':{'domain':'decenturl.com','regex':null},'digg.com':{'domain':'digg.com','regex':'http:\/\/digg\.com\/[^\/]+$'},'doiop.com':{'domain':'doiop.com','regex':null},'dwarfurl.com':{'domain':'dwarfurl.com','regex':null},'easyurl.net':{'domain':'easyurl.net','regex':null},'eepurl.com':{'domain':'eepurl.com','regex':null},'ewerl.com':{'domain':'ewerl.com','regex':null},'ff.im':{'domain':'ff.im','regex':null},'fff.to':{'domain':'fff.to','regex':null},'fhurl.com':{'domain':'fhurl.com','regex':null},'flic.kr':{'domain':'flic.kr','regex':null},'flingk.com':{'domain':'flingk.com','regex':null},'flq.us':{'domain':'flq.us','regex':null},'fly2.ws':{'domain':'fly2.ws','regex':null},'fwd4.me':{'domain':'fwd4.me','regex':null},'fwdurl.net':{'domain':'fwdurl.net','regex':null},'fwib.net':{'domain':'fwib.net','regex':null},'g8l.us':{'domain':'g8l.us','regex':null},'gl.am':{'domain':'gl.am','regex':null},'go.9nl.com':{'domain':'go.9nl.com','regex':null},'goo.gl':{'domain':'goo.gl','regex':null},'goshrink.com':{'domain':'goshrink.com','regex':null},'hex.io':{'domain':'hex.io','regex':null},'hiderefer.com':{'domain':'hiderefer.com','regex':null},'href.in':{'domain':'href.in','regex':null},'htxt.it':{'domain':'htxt.it','regex':null},'hugeurl.com':{'domain':'hugeurl.com','regex':null},'hurl.ws':{'domain':'hurl.ws','regex':null},'icanhaz.com':{'domain':'icanhaz.com','regex':null},'idek.net':{'domain':'idek.net','regex':null},'is.gd':{'domain':'is.gd','regex':null},'j.mp':{'domain':'j.mp','regex':null},'jijr.com':{'domain':'jijr.com','regex':null},'kissa.be':{'domain':'kissa.be','regex':null},'kl.am':{'domain':'kl.am','regex':null},'klck.me':{'domain':'klck.me','regex':null},'korta.nu':{'domain':'korta.nu','regex':null},'l9k.net':{'domain':'l9k.net','regex':null},'liip.to':{'domain':'liip.to','regex':null},'liltext.com':{'domain':'liltext.com','regex':null},'lin.cr':{'domain':'lin.cr','regex':null},'linkgap.com':{'domain':'linkgap.com','regex':null},'liurl.cn':{'domain':'liurl.cn','regex':null},'ln-s.net':{'domain':'ln-s.net','regex':null},'ln-s.ru':{'domain':'ln-s.ru','regex':null},'lnkurl.com':{'domain':'lnkurl.com','regex':null},'lru.jp':{'domain':'lru.jp','regex':null},'lu.to':{'domain':'lu.to','regex':null},'lurl.no':{'domain':'lurl.no','regex':null},'macte.ch':{'domain':'macte.ch','regex':null},'memurl.com':{'domain':'memurl.com','regex':null},'merky.de':{'domain':'merky.de','regex':null},'migre.me':{'domain':'migre.me','regex':null},'minilien.com':{'domain':'minilien.com','regex':null},'moourl.com':{'domain':'moourl.com','regex':null},'myurl.in':{'domain':'myurl.in','regex':null},'nanoref.com':{'domain':'nanoref.com','regex':null},'nanourl.se':{'domain':'nanourl.se','regex':null},'netnet.me':{'domain':'netnet.me','regex':null},'ni.to':{'domain':'ni.to','regex':null},'nn.nf':{'domain':'nn.nf','regex':null},'notlong.com':{'domain':'notlong.com','regex':null},'nutshellurl.com':{'domain':'nutshellurl.com','regex':null},'nyti.ms':{'domain':'nyti.ms','regex':null},'o-x.fr':{'domain':'o-x.fr','regex':null},'offur.com':{'domain':'offur.com','regex':null},'om.ly':{'domain':'om.ly','regex':null},'omf.gd':{'domain':'omf.gd','regex':null},'on.cnn.com':{'domain':'on.cnn.com','regex':null},'onsaas.info':{'domain':'onsaas.info','regex':null},'ow.ly':{'domain':'ow.ly','regex':null},'parv.us':{'domain':'parv.us','regex':null},'peaurl.com':{'domain':'peaurl.com','regex':null},'ping.fm':{'domain':'ping.fm','regex':null},'piurl.com':{'domain':'piurl.com','regex':null},'plumurl.com':{'domain':'plumurl.com','regex':null},'pnt.me':{'domain':'pnt.me','regex':null},'post.ly':{'domain':'post.ly','regex':null},'ptiturl.com':{'domain':'ptiturl.com','regex':null},'qlnk.net':{'domain':'qlnk.net','regex':null},'qurlyq.com':{'domain':'qurlyq.com','regex':null},'r.im':{'domain':'r.im','regex':null},'rb6.me':{'domain':'rb6.me','regex':null},'rde.me':{'domain':'rde.me','regex':null},'reallytinyurl.com':{'domain':'reallytinyurl.com','regex':null},'redir.ec':{'domain':'redir.ec','regex':null},'redirects.ca':{'domain':'redirects.ca','regex':null},'redirx.com':{'domain':'redirx.com','regex':null},'ri.ms':{'domain':'ri.ms','regex':null},'rickroll.it':{'domain':'rickroll.it','regex':null},'rubyurl.com':{'domain':'rubyurl.com','regex':null},'s3nt.com':{'domain':'s3nt.com','regex':null},'s7y.us':{'domain':'s7y.us','regex':null},'shar.es':{'domain':'shar.es','regex':null},'shink.de':{'domain':'shink.de','regex':null},'short.ie':{'domain':'short.ie','regex':null},'short.to':{'domain':'short.to','regex':null},'shortenurl.com':{'domain':'shortenurl.com','regex':null},'shorterlink.com':{'domain':'shorterlink.com','regex':null},'shortlinks.co.uk':{'domain':'shortlinks.co.uk','regex':null},'shoturl.us':{'domain':'shoturl.us','regex':null},'shredurl.com':{'domain':'shredurl.com','regex':null},'shrinkify.com':{'domain':'shrinkify.com','regex':null},'shrinkr.com':{'domain':'shrinkr.com','regex':null},'shrinkurl.us':{'domain':'shrinkurl.us','regex':null},'shrt.fr':{'domain':'shrt.fr','regex':null},'shrtnd.com':{'domain':'shrtnd.com','regex':null},'shurl.net':{'domain':'shurl.net','regex':null},'shw.me':{'domain':'shw.me','regex':null},'slate.me':{'domain':'slate.me','regex':null},'smallr.com':{'domain':'smallr.com','regex':null},'smsh.me':{'domain':'smsh.me','regex':null},'smurl.com':{'domain':'smurl.com','regex':null},'sn.im':{'domain':'sn.im','regex':null},'sn.vc':{'domain':'sn.vc','regex':null},'snadr.it':{'domain':'snadr.it','regex':null},'snipr.com':{'domain':'snipr.com','regex':null},'snipurl.com':{'domain':'snipurl.com','regex':null},'snurl.com':{'domain':'snurl.com','regex':null},'sp2.ro':{'domain':'sp2.ro','regex':null},'spedr.com':{'domain':'spedr.com','regex':null},'srnk.net':{'domain':'srnk.net','regex':null},'srs.li':{'domain':'srs.li','regex':null},'starturl.com':{'domain':'starturl.com','regex':null},'su.pr':{'domain':'su.pr','regex':null},'surl.co.uk':{'domain':'surl.co.uk','regex':null},'ta.gd':{'domain':'ta.gd','regex':null},'tcrn.ch':{'domain':'tcrn.ch','regex':null},'tgr.me':{'domain':'tgr.me','regex':null},'tighturl.com':{'domain':'tighturl.com','regex':null},'tiny.cc':{'domain':'tiny.cc','regex':null},'tiny.pl':{'domain':'tiny.pl','regex':null},'tinylink.com':{'domain':'tinylink.com','regex':null},'tinyurl.com':{'domain':'tinyurl.com','regex':null},'to.':{'domain':'to.','regex':null},'to.ly':{'domain':'to.ly','regex':null},'togoto.us':{'domain':'togoto.us','regex':null},'tr.im':{'domain':'tr.im','regex':null},'tra.kz':{'domain':'tra.kz','regex':null},'trunc.it':{'domain':'trunc.it','regex':null},'tubeurl.com':{'domain':'tubeurl.com','regex':null},'twitclicks.com':{'domain':'twitclicks.com','regex':null},'twitterurl.net':{'domain':'twitterurl.net','regex':null},'twiturl.de':{'domain':'twiturl.de','regex':null},'twurl.cc':{'domain':'twurl.cc','regex':null},'twurl.nl':{'domain':'twurl.nl','regex':null},'u.mavrev.com':{'domain':'u.mavrev.com','regex':null},'u.nu':{'domain':'u.nu','regex':null},'u76.org':{'domain':'u76.org','regex':null},'ub0.cc':{'domain':'ub0.cc','regex':null},'ulu.lu':{'domain':'ulu.lu','regex':null},'updating.me':{'domain':'updating.me','regex':null},'ur1.ca':{'domain':'ur1.ca','regex':null},'url.az':{'domain':'url.az','regex':null},'url.co.uk':{'domain':'url.co.uk','regex':null},'url.ie':{'domain':'url.ie','regex':null},'urlborg.com':{'domain':'urlborg.com','regex':null},'urlbrief.com':{'domain':'urlbrief.com','regex':null},'urlcut.com':{'domain':'urlcut.com','regex':null},'urlcutter.com':{'domain':'urlcutter.com','regex':null},'urlhawk.com':{'domain':'urlhawk.com','regex':null},'urli.nl':{'domain':'urli.nl','regex':null},'urlkiss.com':{'domain':'urlkiss.com','regex':null},'urlpire.com':{'domain':'urlpire.com','regex':null},'urlvi.be':{'domain':'urlvi.be','regex':null},'urlx.ie':{'domain':'urlx.ie','regex':null},'virl.com':{'domain':'virl.com','regex':null},'w33.us':{'domain':'w33.us','regex':null},'wapurl.co.uk':{'domain':'wapurl.co.uk','regex':null},'wipi.es':{'domain':'wipi.es','regex':null},'wp.me':{'domain':'wp.me','regex':null},'x.se':{'domain':'x.se','regex':null},'xil.in':{'domain':'xil.in','regex':null},'xrl.in':{'domain':'xrl.in','regex':null},'xrl.us':{'domain':'xrl.us','regex':null},'xurl.es':{'domain':'xurl.es','regex':null},'xurl.jp':{'domain':'xurl.jp','regex':null},'xzb.cc':{'domain':'xzb.cc','regex':null},'yatuc.com':{'domain':'yatuc.com','regex':null},'yep.it':{'domain':'yep.it','regex':null},'yfrog.com':{'domain':'yfrog.com','regex':null},'zi.ma':{'domain':'zi.ma','regex':null},'zud.me':{'domain':'zud.me','regex':null},'zurl.ws':{'domain':'zurl.ws','regex':null},'zz.gd':{'domain':'zz.gd','regex':null},'zzang.kr':{'domain':'zzang.kr','regex':null},'\u203a.ws':{'domain':'\u203a.ws','regex':null},'\u2729.ws':{'domain':'\u2729.ws','regex':null},'\u273f.ws':{'domain':'\u273f.ws','regex':null},'\u2765.ws':{'domain':'\u2765.ws','regex':null},'\u2794.ws':{'domain':'\u2794.ws','regex':null},'\u279e.ws':{'domain':'\u279e.ws','regex':null},'\u27a1.ws':{'domain':'\u27a1.ws','regex':null},'\u27a8.ws':{'domain':'\u27a8.ws','regex':null},'\u27af.ws':{'domain':'\u27af.ws','regex':null},'\u27b9.ws':{'domain':'\u27b9.ws','regex':null},'\u27bd.ws':{'domain':'\u27bd.ws','regex':null}};
		
		var checkLink = function(a)
		{
			if(a.getAttribute('checkLongURL'))
			{
				// Link already checked, stop here
				return;
			}
			else
			{
				// Preventing the link to be re-check
				a.setAttribute('checkLongURL', true);
				
				// What about cloned DOM nodes, doH!
				// If a copy of the a node is done before processRequest is executed, checkLongURL will prevent the copied item to be processed (when DOMNodeInserted will be fired).
			}
			
			// Get the link domain
			// Careful, maybe the link doesn't begin with 'http://' or 'www' or both...
			// This regex return false if the link is an anchor (href="#...") ; '#' won't match the pattern "[-\w]"
			// This regex return false if the link execute javascript (href="javascript:...") ; ':' won't match the pattern "[-\w]"
			// Nice js regex doc here : http://www.javascriptkit.com/jsref/regexp.shtml
			// Also useful : http://www.regextester.com/
			var regexResult = a.href.match(/^(?:https?:\/\/)?(?:www\.)?((?:[-\w]+\.)+[a-zA-Z]{2,})(\/.+)?/i);
			var domain = false;
			var params = false;
			if(regexResult)
			{
				// domain[0] == a.href ; We just want the domain ; obtained with domain[1] for that regex
				domain = regexResult[1];
				if(regexResult[2])
				{
					params = regexResult[2]; // there is some data (it's not simply the service url)
				}
			}
			
			// Only process links from a different domain and links corresponding to an url shortener service
			if((domain !== document.location.host) && (typeof(known_services[domain]) !== 'undefined') && params)
			{
				var regex = new RegExp(known_services[domain]['regex'], 'i'); // Check link URL against domain regex
				if(!known_services[domain]['regex'] || a.href.match(regex))
				{
					LongURL.prepareRequest(a);
				}
			}
		};
		
		//------------------------------
		
		// Listen for DOM modification (ajax request = potential shortened url)
		document.body.addEventListener('DOMNodeInserted', function(e)
		{
			// If the node as aldready been processed, do nothing :		
			if(e.target.id == 'LongURL_tooltip')
				return;
			
			var lookForA = function(n)
			{
				if(n.nodeName == 'A') // Found a link item (that you can click, not a simple url in the text)
				{
					checkLink(n);
				}
				for(var i = 0; i < n.childNodes.length; i++)
				{
					if(n.childNodes[i].nodeType == 1) // ELEMENT_NODE
					{
						lookForA(n.childNodes[i]);
					}
				}
			};
			lookForA(e.relatedNode); // Check children recursively, could slow down :-(
		}, false);
		
		//------------------------------
		
		if(LongURL.options.showPopup)
		{
			// Create tooltip div (hidden)
			var tooltipWidth = 400;
			LongURL.tooltip = document.createElement('div');
			LongURL.tooltip.setAttribute('id', 'LongURL_tooltip');
			LongURL.tooltip.style.position = 'absolute';
			LongURL.tooltip.style.textAlign = 'left';
			LongURL.tooltip.style.zIndex = '999';
			LongURL.tooltip.style.display = 'none';
			LongURL.tooltip.style.opacity = '0.9';
			LongURL.tooltip.style.backgroundColor = '#FFFF99';
			LongURL.tooltip.style.width = tooltipWidth + 'px';
			LongURL.tooltip.style.padding = '4px';
			if(window.opera)
				LongURL.tooltip.style['border-radius'] = '15px';
			else
				LongURL.tooltip.style['-moz-border-radius'] = '15px';
			document.body.appendChild(LongURL.tooltip);
			
			// Give a name to the function for removeEventListener (see later)
			var ondocumentmovemouse = function(e)
			{
				var posx=0;var posy=0;
				var ev=(!e)?window.event:e;//Moz:IE
				if(ev.pageX){posx=ev.pageX;posy=ev.pageY}//Mozilla or compatible
				else if(ev.clientX){posx=ev.clientX;posy=ev.clientY}//IE or compatible
				else{return;}//old browsers
				
				if(LongURL.tooltip)
				{
					LongURL.tooltip.style.top = posy+20 + 'px';
					LongURL.tooltip.style.left = posx-tooltipWidth/2 + 'px';
				}
			};
			
			// Set mousemove event for the tooltip
			document.body.addEventListener('mousemove', ondocumentmovemouse, false);
		}
		
		//------------------------------
		
		// !!x is true if x is not zero and false otherwise : forced cast to boolean.
		var isXpathSupported = !!(document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('XPath', '3.0'));
		if(isXpathSupported) // XPath
		{
			var links = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); // XPath (faster)
			for(var i = 0; i < links.snapshotLength; i++)
			{
				checkLink(links.snapshotItem(i));
			}
		}
		else // DOM
		{
			var linkss = document.links;
			for(var j = 0; j < linkss.length; j++)
			{
				checkLink(linkss[j]);
			}
		}
		
		/* Maybe some DOMNodeInserted events will be fired, and nodes inserted.
		if(LongURL.preparedRequests == 0)
		{
			document.body.removeEventListener('mousemove', ondocumentmovemouse, false);
			ondocumentmovemouse = null;
			document.body.removeChild(LongURL.tooltip);
			LongURL.tooltip = null;
		}
		*/
	}
	catch(err)
	{
		console.log(LongURL.options.logHeader + '[ERROR] ' + err);
	}
})();
// ]]>