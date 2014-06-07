// ==UserScript==
// @name           Shacknews Chatty News
// @namespace      http://troz.shackspace.com
// @description    Adds Headline to top of chatty and previews to Shacknews article posts
// @version	1.02
// @include        http://*.shacknews.com/chatty*
// @include        http://shacknews.com/chatty*
// @include        http://*.shacknews.com/article/*
// @include        http://shacknews.com/article/*
// @match        http://*.shacknews.com/chatty*
// @match        http://shacknews.com/chatty*
// @match        http://*.shacknews.com/article/*
// @match        http://shacknews.com/article/*

// ==/UserScript==
/*

Can add news article links to top of chatty (configurable number of recent articles)  - hover for preview
Can add complete article previews to Shacknews article posts. 
Can add image for first news article to background of chatty, faded to black or white
Can add Shacknews' posts 'missing' from first chatty page back to the chatty 
Can 'Sticky' Shacknews posts to top of chatty
--Can 'remove' Shacknews' posts from news article view, keeping replies - disabled due to bad operation
Settings in filters section

0.71  Feb 28, 2011 initial release - Headlines with configurable number, Shacknews Posts

0.8  March 1, 2011 (a few hours later)  Background image from latest story.

0.81 March 2, 2011 Move Shacknews posts to top, and add Shacknews posts for articles on RSS but not on first chatty page to chatty page (up to the configurable headlines number).

0.9 March 3, 2011 Now processing article page, can hide 'Shacknews' posts from article page, keeping replies.
I tried to 'promote' the first level replies to root posts, but it didn't work out.  If you are good at javascript / GreaseMonkey, you may be able to fix it - see 'step 6' at bottom of script

0.91 March 24, 2011 Now caching background image URL - saves an AJAX request if refreshing an same story is still the top story

1.01 July 13, 2011 Black Shack is Back day! updated to handle changes to Shacknew chatty styling

1.1 June 20, 2012 - Somehting change in the matrix - html is different causing background image to conver chatty - fixed.
*/



	// @copyright      2009, James Campos
	// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
	if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
		GM_addStyle = function(css) {
			var style = document.createElement('style');
			style.textContent = css;
			document.getElementsByTagName('head')[0].appendChild(style);
		}
		GM_deleteValue = function(name) {
			localStorage.removeItem(name);
		}
		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		}
		GM_log = function(message) {
			console.log(message);
		}
		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		}
	}
	
	
	//CODE TO HANDLE BAD ENTITIES IN SHACK'S RSS
function get_html_translation_table (table, quote_style) {
    // Returns the internal translation table used by htmlspecialchars and htmlentities  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/get_html_translation_table
    // +   original by: Philip Peterson
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: noname
    // +   bugfixed by: Alex
    // +   bugfixed by: Marco
    // +   bugfixed by: madipta
    // +   improved by: KELAN
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Frank Forte
    // +   bugfixed by: T.Wild
    // +      input by: Ratheous
    // %          note: It has been decided that we're not going to add global
    // %          note: dependencies to php.js, meaning the constants are not
    // %          note: real constants, but strings instead. Integers are also supported if someone
    // %          note: chooses to create the constants themselves.
    // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
    var entities = {},
        hash_map = {},
        decimal = 0,
        symbol = '';
    var constMappingTable = {},
        constMappingQuoteStyle = {};
    var useTable = {},
        useQuoteStyle = {};
 
    // Translate arguments
    constMappingTable[0] = 'HTML_SPECIALCHARS';
    constMappingTable[1] = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';
 
    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';
 
    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: " + useTable + ' not supported');
        // return false;
    }
 
    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    }
 
    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';
 
    // ascii decimals to real symbols
    for (decimal in entities) {
        symbol = String.fromCharCode(decimal);
        hash_map[symbol] = entities[decimal];
    }
 
    return hash_map;
}
	
function html_entity_decode (string, quote_style) {
    // Convert all HTML entities to their applicable characters  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/html_entity_decode
    // +   original by: john (http://www.jd-tech.net)
    // +      input by: ger
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: marc andreu
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Ratheous
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Nick Kolosov (http://sammy.ru)
    // +   bugfixed by: Fox
    // -    depends on: get_html_translation_table
    // *     example 1: html_entity_decode('Kevin &amp; van Zonneveld');
    // *     returns 1: 'Kevin & van Zonneveld'
    // *     example 2: html_entity_decode('&amp;lt;');
    // *     returns 2: '&lt;'
    var hash_map = {},
        symbol = '',
        tmp_str = '',
        entity = '';
    tmp_str = string.toString();
 
    if (false === (hash_map = get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }
 
    // fix &amp; problem
    // http://phpjs.org/functions/get_html_translation_table:416#comment_97660
	//modified by TroZ
    delete(hash_map['&']);
	delete(hash_map['<']);
	delete(hash_map['>']);
 
    for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(entity).join(symbol);
    }
    tmp_str = tmp_str.split('&#039;').join("'");
 
    return tmp_str;	
}
	
	
	
	//START

	
	GM_log("ShacknewsChattyNews - start");

	var newsRss	= 			GM_getValue("SCNnewsRss",true);
	var moveMain	= 		GM_getValue("SCNmoveMain",false);
	var articleNews = 		GM_getValue("SCNarticleNews",true);
	var newsRssCount = 		GM_getValue("SCNnewsRssCount",	"7");
	var newsImage = 		GM_getValue("SCNnewsImage",true);
	var whiteshack = 		GM_getValue("SCNwhiteshack",false);
	
	var newsPostAtTop = 	GM_getValue("SCNnewsTop",false);
	var addMissingNews = 	GM_getValue("SCNmissingNews",false);
	
	var artNoShack = 		GM_getValue("SCNartNoShack",true);
	
	var lastNewsUrl	=		GM_getValue("SCNlastNewsUrl","");
	var lastNewsImage =		GM_getValue("SCNlastNewsImage","");
	
	var firstPost = null;
	var missingArts = null;
	var rssItems = null;
	var expandElms = null;

	GM_log("ShacknewsChattyNews settings - nr:'"+newsRss+"' mm:'"+moveMain+"' an:'"+articleNews+"' rc:'"+newsRssCount+"' ni:'"+newsImage+"' ws:'"+whiteshack+"' nt:'"+newsPostAtTop+"' mn:'"+addMissingNews+"'");

	/* UTILITY FUNCTIONS */
	var benchmarkTimer = null;
	function getTime() { benchmarkTimer = new Date(); return benchmarkTimer.getTime(); }
	var scriptStartTime = getTime();
	
	function saveSettingCheck() {
		GM_log('SaveSettingCheck '+this.id.split('_')[1]+' - '+this.checked);
		GM_setValue(this.id.split('_')[1], this.checked);
	}
	function saveSettingValue() {
		GM_log('saveSettingValue '+this.id.split('_')[1]+' - '+this.value);
		GM_setValue(this.id.split('_')[1], this.value);
	}
	
	function getComputedStyle(_elem, _style)
	{
		var computedStyle;
		if (typeof _elem.currentStyle != 'undefined'){ 
			computedStyle = _elem.currentStyle; 
		}else{ 
			computedStyle = document.defaultView.getComputedStyle(_elem, null); 
		}
		return computedStyle[_style];
	}
	
	
	function SendAjax(url, callbackDoc, callbackText) {
		if (window.XMLHttpRequest) {
			var request = new XMLHttpRequest();
		} else {
			var request = new ActiveXObject("Microsoft.XMLHTTP");
		}
	 
		request.open("GET", url, true);
		//request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	 
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				if (request.responseText) {
//console.log("AjaXResponse to "+url+" doc="+callbackDoc+" text="+callbackText+" resplength="+(request.responseText.length()));
					if(callbackDoc!=null){
						if (window.ActiveXObject) {
							var doc = new ActiveXObject("Microsoft.XMLDOM");
							doc.async = "false";
							doc.loadXML(request.responseText);
						} else {
							var parser = new DOMParser();
							//replace handles badly (nonexistant) html encoded article titles
							var doc = parser.parseFromString(html_entity_decode(request.responseText),"text/xml"); //.replace(/& /g,"&amp;")
						}
						callbackDoc(doc.documentElement);
					}
					if(callbackText!=null){
						callbackText(request.responseText);
					}
				}
			}
		}
	 
		request.send(null);
	}
	 
	 
	function ValueFromTagName(item, tagname) {
		var val = item.getElementsByTagName(tagname);
		if(val.length>0 && val[0]!=null && val[0].firstChild!=null)
			return val[0].firstChild.nodeValue;
		return "";
	}
	
	function ShowPost(doc){
		GM_log("ShacknewsChattyNews - Showing post");
		
		var threads = document.getElementById('commenttools');
		while(threads!=null && ( threads.nodeType!=1 ||  threads.getAttribute('class')!='threads')){
			threads = threads.nextSibling;
		}
		if(threads!=null){
			var pos = doc.indexOf('class="threads">');
			if(pos>-1){
				pos+=16;
				var pos2 = doc.indexOf('<hr',pos);
				var thread = doc.substring(pos, pos2);
				
				var div = document.createElement("div");
				div.innerHTML = thread;
				
				threads.insertBefore(div,firstPost);
			}
		}
		
		var count = Number(newsRssCount); //int conversion
		var done = true;
//GM_log("adding missing news");		
		for (var i = 0; i < missingArts.length; ++i) {
//GM_log(" "+i+" = "+missingArts[i]);
			if( missingArts[i] != false && missingArts[i] != true){
				var link = missingArts[i];
				missingArts[i] = false;
GM_log("Requesting "+link);				
				SendAjax(link,null,ShowPost);
				done = false;
				break;
			}
		}
		
		if(done){
			//ok, newly added articles need the preview added to them
			var elms = document.evaluate("//div[contains(@class,'fpauthor_14475')]/div[contains(@class,'postbody')]/a[contains(@href,'article/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			//GM_log("Friend Foe Xpath - "+elms.snapshotLength);
			for(var k=0;k<elms.snapshotLength;k++){
				var elm = elms.snapshotItem(k);
				
				var postlink = elm.href;
				//elm should be the link to the article, compare href to links in RSS
				if(elm.getAttribute('converted')!='1'){
					for(var i=0;i<rssItems.length;i++){
						var link = ValueFromTagName(rssItems[i], 'link');
						if(postlink.indexOf(link) > -1){
						
							if(articleNews){
								//found match, mark as converted and replace
								elm.setAttribute('converted','1');
								var parent = elm.parentNode;
								var html = parent.innerHTML;
								html+="<br>"+ValueFromTagName(rssItems[i], 'description');
								parent.innerHTML = html;
							}
						
							break;
						}
					}
				}
			}
			GM_log("ShacknewsChattyNews - Totally Done now! "+(getTime() - scriptStartTime) + "ms");
		}
	}
	
	function ShowImage(doc){
	
		GM_log("ShacknewsChattyNews - displaying Image");
	
		//step 1,  find the article banner image, remove while noting url
		var imgurl;
		var pos = doc.indexOf('id="article"');
		if(pos>-1){

			pos = doc.indexOf('<img src="',pos);
			if(pos>-1){
				pos+=10;
				var pos2 = doc.indexOf('"',pos);
				imgurl = doc.substring(pos, pos2);
			}
		}
		
		GM_setValue("SCNlastNewsImage",imgurl);
		ShowImage2(imgurl);
	}
		
	function ShowImage2(imgurl){
		//step 2 put the image in the background
		var masthead = document.getElementById("container"); //was 'masthead' before june 20, 2012
		if(masthead!=null){
			var imgdiv = document.createElement("div");
			var img = document.createElement("img");
			var maskimg = document.createElement("div");
			
			img.setAttribute('src', imgurl);
			img.setAttribute('style', "height: 100%;");
			imgdiv.setAttribute('style', "position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px;");
			maskimg.setAttribute('style', "position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background: "+
			(whiteshack?"white":"black")+"; opacity: 0.85; ");
			
			imgdiv.appendChild(img);
			imgdiv.appendChild(maskimg);
			masthead.parentNode.insertBefore(imgdiv,masthead);
		}
		
		//step 3 fix the stlyes on some tags, so the background shows through
		var content = document.getElementById('content');
		if(content!=null){
			content.style.position = "relative";
//console.log("1");
		}
			
		var container = document.getElementById('container');
		var introwrap = document.getElementById('chatty_intro_wrap');
		if(container!=null && introwrap!=null){
			introwrap.style.backgroundColor = getComputedStyle(container,"backgroundColor");
			var main = document.getElementById('main');
			if(main!=null){
				main.style.margin="3px";
			}
//console.log("2 "+getComputedStyle(container,"background-Color")+" "+getComputedStyle(container,"backgroundColor") );
		}
		
		var commentwrap = document.getElementById('chatty_comments_wrap');
		if(commentwrap!=null){
			commentwrap.style.backgroundColor = "transparent";
//console.log("3");
		}
		
			
		GM_addStyle("div.threads ul ul li.last, div.commentsblock, body.page-chatty #content { background-color: transparent !important;} ");
		
		
		GM_log("ShacknewsChattyNews - image done "+(getTime() - scriptStartTime) + "ms");
	}
	 
	function ParseRSS(data) {
	
		GM_log("ShacknewsChattyNews - parsing RSS");
		var items = data.getElementsByTagName('item');
		rssItems = items;
		
		//console.log("newsRssCount = "+newsRssCount+".");
		var count = Number(newsRssCount); //int conversion
		if(count <1)
			count = 5;
			
		missingArts = new Array();
		for (var i = 0; i < count; ++i) {
			missingArts[i] = true;
		}
		
//console.log("items = "+ items);
		if(newsRss){
			var output = '<H3>NEWS</H3><ul style="list-style-type:disc; font-size: 110%; font-weight: bold;">';
//console.log("found "+items.length+" headlines in RSS");
			for (var i = 0; i < ((items.length<count)?items.length:count); ++i) {
	//console.log("item["+i+"] = "+ items[i]);		
				var title = ValueFromTagName(items[i], 'title');
				var link = ValueFromTagName(items[i], 'link');
				var desc = ValueFromTagName(items[i], 'description').replace(/<[^>]*>/g,'').replace(/"/g,'&quot;');
//console.log("desc="+desc);	 
				output += '<li><strong><a href ="' + link + '" title="'+desc+'" style="color: white !important">' + title + '</strong></li>\n';
			}
			output += '</ul>';
	 
			var introwrap = document.getElementById('chatty_intro_wrap');
			var content = document.getElementById('content');
			if(introwrap!=null){
				RSSOutput = document.createElement("div");
				RSSOutput.setAttribute('id','headlines');
				RSSOutput.setAttribute("style","width: 300px; position: absolute; right: 5px;");
				RSSOutput.innerHTML = output;
				
				var container = document.getElementById('container');
				if(container!=null){
					RSSOutput.style.backgroundColor = getComputedStyle(container,"backgroundColor");//container.style.backgroundColor;
				}
				
				if(moveMain){
					introwrap.style.marginLeft="5px";
				}
				
				
				content.insertBefore(RSSOutput,introwrap);
			}else{
				console.log("chatty_intro_wrap ="+introwrap);
				console.log("content ="+content);
			}
		}
		
		if(articleNews || addMissingNews){
			var elms = document.evaluate("//div[contains(@class,'fpauthor_14475')]/div[contains(@class,'postbody')]/a[contains(@href,'article/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			//GM_log("Friend Foe Xpath - "+elms.snapshotLength);
			for(var k=0;k<elms.snapshotLength;k++){
				var elm = elms.snapshotItem(k);
				
				var postlink = elm.href;
				//elm should be the link to the article, compare href to links in RSS
				for(var i=0;i<items.length;i++){
					var link = ValueFromTagName(items[i], 'link');
					if(postlink.indexOf(link) > -1){
					
						if(articleNews){
							//found match, mark as converted and replace
							elm.setAttribute('converted','1');
							var parent = elm.parentNode;
							var html = parent.innerHTML;
							html+="<br>"+ValueFromTagName(items[i], 'description');
							parent.innerHTML = html;
						}
						
						missingArts[i] = false;
						
						break;
					}
				}
				
			}
		
		}
		
		if(newsImage){
			
			var topStoryLink = ValueFromTagName(items[0], 'link');
			if(topStoryLink == lastNewsUrl){ 
			
				//if same news is top story, reuse stored image url, skip ajax request
				ShowImage2(lastNewsImage);
			
			}else{
			
				GM_setValue("SCNlastNewsUrl",topStoryLink);
				SendAjax(topStoryLink,null,ShowImage);
				
			}
		
		}
		
		if(addMissingNews){
//GM_log("adding missing news");
			for (var i = 0; i < ((items.length<count)?items.length:count); ++i) {
				if(missingArts[i]==true){
					missingArts[i] = ValueFromTagName(items[i], 'link');
				}
			}
		
			for (var i = 0; i < count; ++i) {
//GM_log(" "+i+" = "+missingArts[i]);
				if( missingArts[i] != false && missingArts[i] != true){
					var link = missingArts[i];
					missingArts[i] = false;
					SendAjax(link,null,ShowPost);
					break;
				}
			}
		}
		
		GM_log("ShacknewsChattyNews - RSS Done "+(getTime() - scriptStartTime) + "ms");
	}
	 
	function GetFeed( url ) {
		SendAjax(url, ParseRSS,null);
	}
	
	String.prototype.escapeHTML = function () {                                        
        return(                                                                 
            this.replace(/&/g,'&amp;').                                         
                replace(/>/g,'&gt;').                                           
                replace(/</g,'&lt;').                                           
                replace(/"/g,'&quot;')                                         
        );                                                                      
    };
	
	function addEvents(){
		node = document.getElementById('ShacknewsChattyNews_SCNnewsRss');
		if(node != null) node.addEventListener('change', saveSettingCheck, true);
		else GM_log("Unable to add event to ShacknewsChattyNews_SCNnewsRss");
		
		node = document.getElementById('ShacknewsChattyNews_SCNarticleNews');
		if(node != null) node.addEventListener('change', saveSettingCheck, true);
		else GM_log("Unable to add event to ShacknewsChattyNews_SCNarticleNews");
		
		node = document.getElementById('ShacknewsChattyNews_SCNmoveMain');
		if(node != null) node.addEventListener('change', saveSettingCheck, true);
		else GM_log("Unable to add event to ShacknewsChattyNews_SCNmoveMain");
		
		node = document.getElementById('ShacknewsChattyNews_SCNnewsRssCount');
		if(node != null) node.addEventListener('blur', saveSettingValue, true);
		else GM_log("Unable to add event to ShacknewsChattyNews_SCNnewsRssCount");
		
		node = document.getElementById('ShacknewsChattyNews_SCNnewsImage');
		if(node != null) node.addEventListener('change', saveSettingCheck, true);
		else GM_log("Unable to add event to ShacknewsChattyNews_SCNnewsImage");
		
		node = document.getElementById('ShacknewsChattyNews_SCNwhiteshack');
		if(node != null) node.addEventListener('change', saveSettingCheck, true);
		else GM_log("Unable to add event to ShacknewsChattyNews_SCNwhiteshack");
		
		node = document.getElementById('ShacknewsChattyNews_SCNnewsTop');
		if(node != null) node.addEventListener('change', saveSettingCheck, true);
		else GM_log("Unable to add event to ShacknewsChattyNews_SCNnewsTop");
		
		node = document.getElementById('ShacknewsChattyNews_SCNmissingNews');
		if(node != null) node.addEventListener('change', saveSettingCheck, true);
		else GM_log("Unable to add event to ShacknewsChattyNews_SCNmissingNews");
		
		node = document.getElementById('ShacknewsChattyNews_SCNartNoShack');
		if(node != null) node.addEventListener('change', saveSettingCheck, true);
		else GM_log("Unable to add event to ShacknewsChattyNews_SCNartNoShack");
		
		
		GM_log("ShacknewsChattyNews add events done");
	}
	
	function addSettings(){
	
		//settings on comments page
		var settings = document.getElementById('commentssettings');
		if(settings!=null){
			var setdiv = document.createElement('div');
			setdiv.setAttribute('style', 'float: left; width: 95%');
			var sstr = '<h5>Shacknews Chatty News</h5>Add headlines to top of page. Hover for preview. Also adds previews to "Shacknews" posts.';
			setdiv.innerHTML=sstr;
			settings.appendChild(setdiv);
			
			setdiv = document.createElement('div');
			setdiv.setAttribute('style', 'float: left;');
			
			sstr='<h6>Chatty Settings</h6><hr style="border: 1px solid;"/>';
			
			sstr+='Show Latest News at Chatty top:';
			sstr+='<input id="ShacknewsChattyNews_SCNnewsRss" type="checkbox" ';
			if(newsRss == true) sstr+='checked';
			sstr+='><br/>';
			
			sstr+='Number of articles: <input type="text" size="2" id="ShacknewsChattyNews_SCNnewsRssCount" value="'+newsRssCount+'" maxlength="2">';
			sstr+='<br/>';
			
			sstr+='Move Chatty Topic Text Left to fit Latest News:';
			sstr+='<input id="ShacknewsChattyNews_SCNmoveMain" type="checkbox" ';
			if(moveMain == true) sstr+='checked';
			sstr+='><br/>';
		
			sstr+='Add Preview to "Shacknews" Aritcle Posts';
			sstr+='<td><input id="ShacknewsChattyNews_SCNarticleNews" type="checkbox" ';
			if(articleNews == true) sstr+='checked';
			sstr+='><br/>';
			
			sstr+='Show News Image behind chatty:';
			sstr+='<input id="ShacknewsChattyNews_SCNnewsImage" type="checkbox" ';
			if(newsImage == true) sstr+='checked';
			sstr+='><br/>';
			
			sstr+='If News Image, do you use a white shack style:';
			sstr+='<input id="ShacknewsChattyNews_SCNwhiteshack" type="checkbox" ';
			if(whiteshack == true) sstr+='checked';
			sstr+='><br/>';
			
			sstr+='Move Shacknews Posts to chatty top:';
			sstr+='<input id="ShacknewsChattyNews_SCNnewsTop" type="checkbox" ';
			if(newsPostAtTop == true) sstr+='checked';
			sstr+='><br/>';
			
			sstr+='Add Shacknews posts for headlines that have scrolled off front page';
			sstr+='<input id="ShacknewsChattyNews_SCNmissingNews" type="checkbox" ';
			if(addMissingNews == true) sstr+='checked';
			sstr+='><br/>';
			
			sstr+='<h6>Article Settings</h6><hr style="border: 1px solid;"/>';
			
			sstr+='Remove root post, promote root replies';
			sstr+='<input id="ShacknewsChattyNews_SCNartNoShack" type="checkbox" ';
			if(artNoShack == true) sstr+='checked';
			sstr+='><br/>';
			
			
			setdiv.innerHTML=sstr;
			settings.appendChild(setdiv);
			
			setTimeout(addEvents,5000);
			//setTimeout(addEvents,15000);
			
		}
		
	}
	
/*	
	function expandReplies(){
		GM_log("ShacknewsChattyNews expanding replies");
		
		//set the full post for immediate replies to shacknew posts to be visible.
		
		//step 1, find  shacknews  fullpost replies
		var elms = document.evaluate("//div[contains(@class,'fpauthor_14475')]/following-sibling::div[@class='capcontainer']/ul/li/div[contains(@class,'fullpost')]",
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		GM_log("Found "+elms.snapshotLength+" Shacknews replies");
		
		//step 2, iterate them, set them to visible
		for(var k=0;k<elms.snapshotLength;k++){
			var elm = elms.snapshotItem(k);
			
			elm.style.display = "block";
			 
		}
	
		
		//step 3, find  shacknews oneline replies
		elms = document.evaluate("//div[contains(@class,'fpauthor_14475')]/following-sibling::div[@class='capcontainer']/ul/li/div[contains(@class,'oneline')]",
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		GM_log("Found "+elms.snapshotLength+" Shacknews replies");
		
		//step 4, iterate them, calling their open method
		for(var k=0;k<elms.snapshotLength;k++){
			var elm = elms.snapshotItem(k);
			
			elm.style.display = "none" ; //or possibly remove from DOM
		}
	
		GM_log("ShacknewsChattyNews expanding replies done");
	}
	
	function expandNext(){
		if(expandElms.length>0){
			var elm = expandElms.pop();
GM_log("running "+elm+" "+elm.getAttribute('onClick'));	
			//open post
			var funct = elm.getAttribute('onClick').split(';')[0];
			funct = funct.replace("return","");
			//Location Hack
			location.href = "javascript:void(" + encodeURI( funct ) + ")";
			
			//now we must wait for the ajax to load / work
			setTimeout(expandNext, 3000);
		}else{
			//now we must wait for the ajax to load / work
			setTimeout(expandReplies, 3000);
		}
		
	}
*/
		
	var count=0;
	if((document.location).toString().indexOf('chatty')>-1){
		
		addSettings();	
		
		if(newsPostAtTop){
//GM_log("moving shacknews posts to top");
			var threads = document.getElementById('commenttools');
			while(threads!=null && ( threads.nodeType!=1 ||  threads.getAttribute('class')!='threads')){
				threads = threads.nextSibling;
			}
		
			if(threads!=null){
				
				firstPost = threads.firstChild;
				
				//use xpath to get shacknews posts
				var elms = document.evaluate("//div[contains(@class,'fpauthor_14475')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				GM_log("Found "+elms.snapshotLength+" news article posts by Shacknews");
				for(var k=0;k<elms.snapshotLength;k++){
					var elm = elms.snapshotItem(k);
				
					if(elm!=null){
						var root = elm.parentNode.parentNode.parentNode; //div.fullpost (elm), li, ul, div#root_XXX
						
						threads.insertBefore(threads.removeChild(root),firstPost);//move the thread to before the original first thread
					}
				}
			}
		
		}
		
		
		if(newsRss || articleNews){
			GetFeed("http://www.shacknews.com/rss?recent_articles=1");
		}

	} else if((document.location).toString().indexOf('article')>-1){
GM_log("ShacknewsChattyNews - Article page "+artNoShack);	

		addSettings();

		if(artNoShack){
		
			//step 1, find  shacknews post(s)
			var elms = document.evaluate("//div[contains(@class,'fpauthor_14475')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			GM_log("Found "+elms.snapshotLength+" Shacknews posts");
			
			//step 2, remove shacknews post
			for(var k=0;k<elms.snapshotLength;k++){
				var elm = elms.snapshotItem(k);
//GM_log("elm is "+elm+"   "+elm.getAttribute("class"));				
				elm.style.display = "none"; 
				//elm.setAttribute('style','display:none;');
			}
			
			//step 3, find  shacknews replies
			elms = document.evaluate("//div[contains(@class,'fpauthor_14475')]/following-sibling::div[@class='capcontainer']/ul/li/div[contains(@class,'oneline')]/a[@class='shackmsg']",
				document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			GM_log("Found "+elms.snapshotLength+" Shacknews replies");
			
			//step 4, iterate them, calling their open method
			for(var k=0;k<elms.snapshotLength;k++){
				var elm = elms.snapshotItem(k);
//GM_log("elm is "+elm+"   "+elm.getAttribute("class"));
				
				//remove tree elements from these post's right side
				var li = elm.parentNode.parentNode;
				if(li!=null){
					li.style.background="none";
					var ul = li.parentNode;
					if(ul!=null){
						ul.style.background="none";
					}
				}
			}
			
			//step 5, move reply button into commenttools
			elms = document.evaluate("//div[contains(@class,'fpauthor_14475')]/div[@class='reply']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
GM_log("elms length "+elms.snapshotLength);
			if(elms.snapshotLength>0){
				var elm = elms.snapshotItem(0);
				var tools = document.getElementById('commenttools');
GM_log("tools is "+tools);				
				if(tools!=null){
					tools.insertBefore(elm.parentNode.removeChild(elm),null);
				}
			}
			
			//step 6,  we now need to 'expand' the posts, so that the full replies are laoded so we can display the full reply of the inital posts
/*			
			elms = document.evaluate("//div[contains(@class,'fpauthor_14475')]/following-sibling::div[@class='capcontainer']/ul/li[1]/div[contains(@class,'oneline')]/a[@class='shackmsg']",
				document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			GM_log("Found "+elms.snapshotLength+" Shacknews thread inital replies "+elms);
			expandElms = new Array();
			for(var k=0;k<elms.snapshotLength;k++){
				expandElms[k] = elms.snapshotItem(k);
			}
			
			if(expandElms.length>0){
				var elm = expandElms.pop();
				
				GM_log("running "+elm+" "+elm.getAttribute('onClick'));	
				//open post
				var funct = elm.getAttribute('onClick').split(';')[0];
				funct = funct.replace("return","");
				//Location Hack
				location.href = "javascript:void(" + encodeURI( funct ) + ")";
				
				//now we must wait for the ajax to load / work
				setTimeout(expandNext, 3000);
			}
*/
			//the above was an attempt to have all the immediate replies expanded, but contrary to my hope, 
			//clicking on one reply, while it fetches the full expanded tree, only adds that one post's full version 
			//to the html. and the full post is removed once another reply is clicked on 
			//(not shown and hidden like I was hoping)
			//so it is probably best not to expand any replies.
			//in theory, the whoel thing could be hacked, by expanding each root reply individually, saving their full post,
			//then doing the next reply until they are all saved, and then replacing the root replies with the saved versions,
			//but this would break as soon as a different reply was clicked, as that would cause the root posts to all close
			//(unless we did some further extreme hacking, to change the onClick methods to 'update' the root post id for
			//every reply, in the hopes that that would prevent the 'new root posts' not collapse.  I haven't looked at the 
			//clickItem(rootid, replyid) method actually works that way, or if that would totally break the code that 
			//expands replies
			
		}
	}

	// log execution time
	if(GM_log){
		GM_log("ShacknewsChattyNews - "+(getTime() - scriptStartTime) + 'ms ');
	}

