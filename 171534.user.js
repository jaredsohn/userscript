// ==UserScript==
// @name          4chan Janitor Reports UserJS
// @namespace     http://imgbear.com/Crap/Scripts/4chan_Janitor_Reports.user.js
// @description   Gives the report system a few addons and updates to make janitoring easier.
// @include       https://www.4chan.org/reports/*
// ==/UserScript==

//https://www.4chan.org/reports/?mode=details&board=jp&no=7668794

(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://cdn.jquerytools.org/1.2.5/jquery.tools.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

var $_GET = {};


var banReasons = {
		"General":{
			"Child": {
				"Nudity": "Child Nudity",
				"Porn": "Child Pornography",
				"Model": "Child Model",
			},
			"Off-Topic": {
				"Western": "Western Content",
				"General": "Off-Topic Posting",
				"Photograph/Photomanipulation": "Photograph/Photomanipulation"
			},
			"Underage": {
				"< 15": "Underage < 15 years old",
				"15": "Underage, 15 years old",
				"16": "Underage, 16 years old",
				"17": "Underage, 17 years old"
			},
			"JB": "Jailbait / Questionable Age",
			"Ban Evasion": "Ban evasion",
			"Spoiler abuse": "Spoiler Abuse",
			"Invasion": "Call to Invasion",
			"Requesting": {
				"General": "Requesting",
				"Illegal": "Requesting Illegal Material",
				"Copyright": "Requesting copyrighted material",
				"CP": "Requesting CP"
			},
			"SFW Abuse": {
				"NSFW": "NSFW on SFW board",
				"Porn": "Porn on SFW board"
			},
			"Board Raid": "Cross-Board Raid",
			"/b/ only": {
				"Furry": "Furry outside of /b/",
				"Loli": "Lolicon outside of /b/",
				"Shota": "Shotacon outside of /b/"
			},
			"Bestiality": "Bestiality",
			"Streaming Copyright": "Streaming Copyrighted content"
		},
		"Trolling": {
			"meme crap": {
				">mfw": ">MFW thread",
				"ISHYDDT": "ISHYDDT",
				">that feel": ">that feel thread",
				"Power Ranking": "Power Ranking",
				"Techloligy": "Techloligy",
				"Dubs": "Doubles",
				"Piccolo Dick": "Piccolo Dick"
		    },
			"Shitposting": "Shitposting",
			"/soc/ garbage": "/soc/ garbage",
			"/new/shit": "/new/shit"
		},
		"Spam": {
			"Daily": {
				"Have a nice day, anon": "Daily thread: have a nice day anonymous",
				"Cash/Sex": "Daily thread: Cash/Sex anime image"
			},
			"Spam Bot": "Spam Bot",
			"CP Spam Bot": "CP Spam Bot",
			"Advert": "Advertising",
			"Post after del": "Reposting after deletion",
			"Attention Whoring": {
				"General": "Attention Whoring",
				"Avatar": "Posting with an avatar",
				"Signature": "Posting with a signature"
			},
			"Banned Users": {
				"Abatap": "Ban Evasion: Abatap",
				"Buziel": "Ban Evasion: Buziel",
				"Cooltop": "Ban Evasion: Cooltop",
				"Quentin": "Ban Evasion: Quentin",
				"Manly": "Ban Evasion: Manly Tears"
			}
		}
	};

var banPageCss = 'div.buttonHold {margin-top:-40px;border-top:1px solid #800;border-bottom:1px solid #800;padding-top:10px;margin-bottom:10px;}ul.selection {list-style:none;overflow:hidden;margin:10px;padding:0px;}li.multi > ul {list-style:none;overflow:hidden;margin:0px;padding:0px;}ul.selection li {float:left;margin-right:25px;}ul.selection li.team {font-weight:700;color:#006400;}ul.selection li:last-child {margin-right:0px;}ul.button li:not(.multi) {	-moz-border-radius: 3px;	-webkit-border-radius: 3px;	padding: 4px 10px 4px 10px;		font-weight: bold;	background-color: #f0e0d6;		border: 1px solid #d9bfb7;		font-size: 11px;		/* Select hack for firefox users */	-moz-user-select: none;		margin-bottom: 5px;}ul.button > li {	margin-right: 5px!important;}ul.button li:not(.nohover):hover {	background-color: #d9bfb7;		cursor: pointer;}ul.button li.selected {	background-color: #89bc84;	border: 1px solid #2b6826;		color: #fff;}ul.button li.join, li.multi li {	margin-right: 0px!important;	margin-left: 0px!important;		-moz-border-radius: 0px!important;	border-left: none!important;	border-right: 1px solid #d9bfb7!important;}ul.button li.joinstart, li.multi li:first-child {	margin-right: 0px!important;		-moz-border-radius: 3px!important;	-moz-border-radius-topright: 0px!important;	-moz-border-radius-bottomright: 0px!important;}ul.button li.join:hover {	padding: 4px 9px 4px 9px;}ul.button li.joinend, li.multi li:last-child {	-moz-border-radius: 3px!important;	-moz-border-radius-topleft: 0px!important;	-moz-border-radius-bottomleft: 0px!important;border-left: none!important;}li.first, li > ul > li.nohover {	border-color: #a27d72!important; color: #fff; background-color: #a27d72!important;}';

var reportsCss = '*{font-family:arial!important;font-size:12px!important;}td,div,span,h1,h2,h3,h4,body>b,th{color:#800000!important;}center table{width:400px;border-spacing:0!important;border-collapse:collapse;border:none!important;}div.buttonHold h2{font-size:16px!important;margin-bottom:0;}div.buttonHold h2:first-child{margin:0!important;}center table td,center table th{border:none!important;padding-top:2px!important;padding-bottom:2px!important;}.fakebutton{padding:0!important;}center td{text-align:center;}center tr:nth-child(odd){background-color:#f0e0d6;}center tr:nth-child(odd) td:nth-child(odd){background-color:#ead6ca;}center tr:nth-child(even){background-color:#f6f1ed;}center tr:nth-child(even) td:nth-child(odd){background-color:#ede4dc;}center tr.redbg:nth-child(odd){background-color:#f7d3d3!important;}center tr.redbg:nth-child(odd) td:nth-child(odd){background-color:#f4caca!important;}center tr.redbg:nth-child(even) td:nth-child(odd){background-color:#fed4d4!important;}center tr.bluebg:nth-child(even) td:nth-child(odd){background-color:#e7edff!important;}center tr.bluebg:nth-child(odd){background-color:#e6e9f3!important;}center tr.bluebg:nth-child(odd) td:nth-child(odd){background-color:#dce1f0!important;}center th{text-transform:capitalize;}center tr:hover>th{background-color:#fca!important;}body>table{border-spacing:0!important;border-collapse:collapse;border:none!important;width:600px;margin-top:-25px;}body>table td,body>table th{border:none!important;padding-top:4px!important;padding-bottom:4px!important;}body>table tr th{width:150px!important;}body>table tr:nth-child(odd)>th{background:#ffba8c!important;padding-top:5px!important;padding-bottom:5px!important;}body>table tr:nth-child(even)>td{background:#ede4dc!important;}body>table tr:nth-child(odd)>td{background:#ead6ca!important;}.actions td,.actions input{vertical-align:middle!important;}.actions form{margin:0!important;padding:0!important;}input[type=submit]{width:100px;}table tr:first-child form{margin-right:25px!important;}table tr:first-child form input[type=submit]{margin-right:-25px!important;}.actions td{height:40px;}.actions tr td:first-child{width:150px!important;background:#fca!important;}.actions tr:nth-child(odd) td:first-child{background:#ffba8c!important;}body>b{font-size:20px!important;background-color:#ffe!important;position:relative;padding-right:100px;}body>b:last-child{margin-top:-20px!important;}body>table::before{content:"Post Content:";font-size:20px;font-weight:bold;}table{margin-bottom:50px!important;clear:both;}body>br{display:none!important;}body>div{margin-bottom:20px;}body>table:nth-of-type(2) tr:first-child>td,body>table:nth-of-type(2) tr:nth-of-type(2)>td{color:green!important;font-weight:bold;}a:not(.fakebutton){color:blue!important;font-weight:normal!important;}b:not(:empty){display:block;}font[color=#FF0000],.redtext,b[style=color:red;]{color:#f00!important;}.spoiler{color:#000!important;}.spoiler:hover{color:#fff!important;}.inlineReportPreview *{font-size:11px!important;}.inlineReportPreview{text-align:left!important;min-width:420px;max-width:400px;min-height:226px;float:left;background-color:#ede4dc;margin:10px;padding:5px;}div.inlineReportPreview>div.postContent{float:left;min-width:345px!important;max-width:410px!important;}div.postContent[id="hasImage"]>p{width:345px!important;}div.inlineReportPreview>div.postContent>p{margin-top:0;word-wrap:break-word!important;min-width:345px!important;max-width:410px;max-height:120px;height:120px;overflow:auto;width:100%;}div.inlineReportPreview>img.hoverImage{max-width:70px;max-height:120px;float:left;margin-right:5px;}div.inlineReportPreview>img:hover{cursor:pointer;pointer:hand;}img.full_image_display{max-width:450px;max-height:450px;position:fixed!important;left:20px;bottom:20px;-moz-box-shadow:0 0 80px rgba(0,0,0,1);background-color:#fff;}span.smalldate{font-size:11px;font-style:italic;float:right;text-align:right;}p font{clear:none!important;}span.poster_name{font-weight:bold;color:green!important;}div.nameHold{height:15px!important;overflow:hidden;background-color:#ead6ca;background-position:98% 6px!important;margin:-5px -5px 5px;padding:6px;}div.infoHold{background-color:#ffba8c!important;margin:-5px -5px 5px;padding:6px;}div.buttons{clear:both;overflow:hidden;}div.inlineReportPreview>div.buttons{margin:-5px!important;}.inlineHold{-moz-box-shadow:0 0 80px rgba(0,0,0,1);background-color:#ead6ca;border:none!important;max-width:600px;font-size:11px!important;padding:10px;}.inlineHold *{font-size:10px!important;}div.holdReportsLive .bluebg{background-color:#dee6ff!important;}div.holdReportsLive .redbg{background-color:#ffcbcb!important;}span[style=color:#800080]{color:#800080!important;}center table td:last-child,body>table td:last-child{padding-left:8px;padding-right:8px;}center tr:hover,center tr[class=bluebg]:hover td:nth-child(odd),center tr[class=redbg]:hover td:nth-child(odd),tr:hover td:nth-child(odd),center tr[class=bluebg]:hover td:nth-child(even),center tr[class=redbg]:hover td:nth-child(even),center tr:hover td:nth-child(even){background:#fff!important;}.postertrip,span.poster_trip{color:green!important;font-weight:normal;}';
	
var nsfwButton = 'data:image/gif;base64,R0lGODlhPAAPAIAAAO/BwRMSECH5BAAAAAAALAAAAAA8AA8AAAJpjI+py+0Kopy02ouzNLr7f3GWCJBRQqFnsJFmG4qmy8JpXdIjftczf9vlDrlYjPN7rYRIlnLJLE5ULSKsKa08i4jdj+kMG4VDzNdbNQNtVmj2PaWtbVrci+rupcegvp//F/j3QFho+FAAADs=';
var sfwButton = 'data:image/gif;base64,R0lGODlhPAAPAIAAANbb8AAAACH5BAAAAAAALAAAAAA8AA8AAAJejI+py+0Kopy02ouzNLr7f3FeQpGRCBxbMLIdiqbuBNftHc40S8aZnwPKLJwiT/dDYkwr1Wpo/AiXzpMSehziQFprsAmalmaxabX6uhIR469VvebK53G6ff7I6/ePAgA7';

var nsfwOpButton = 'data:image/gif;base64,R0lGODlhWgAPAKIEAO/BwRMSENLvwQAAAP///wAAAAAAAAAAACH5BAEAAAQALAAAAABaAA8AAAPVOLrcziTGQKu9OOvN7xBgKI4kOEgToK5s675wLK/BV97liQZz7/+wGokRcoh0Et6LQlM2K61L8zl1CY82hckm0JpQBGeUCSCrzOay+OyEspfcblzrlRfBa6qalR4veVJ9NHOEdlt3O0FQaRZ/jkyQeWeFRR91l3iKZXt8jZ1ub5GcVpSHRohJmp5jjJKionBYsnUjSCmOapJvVVZogoO1WcI3tmGauZ28o6x6scGXcUeZuMu5fb/IbLpl0Tg4xdtA4uPc3uZfieTq6zUP7u94HfLz9BsJADs=';

var sfwOpButton = 'data:image/gif;base64,R0lGODlhWgAPAJEDANbb8AAAANLvwf///yH5BAEAAAMALAAAAABaAA8AAAK6jI+pON0Lo5wUiYuz3je4B4TiSJbmiaaiwbWt9wXqTNcnq1ldksGOTEuQhCHDylgEqnAYnDPQhHY+A2UKCcBmrcmjUotiCsQsppnKvaWPJqMQHJbuelCz3AeaIdprt8xfQyY3Vnd3hxa4N0LUBQinRhep0INoo9hV4vi3xhcZRfhSabO1yHngZTkIuipGGRP0ZfW4FcvZmXPwyYFXlXhaqlab6kLs+jOKnHxbTMxrqwx9VUGBNm19PV0AADs=';

var boardInfo = {'a':'sfw','b':'nsfw','c':'sfw','d':'nsfw','e':'nsfw','f':'nsfw','g':'sfw','gif':'nsfw','h':'nsfw','hr':'nsfw','k':'sfw','m':'sfw','o':'sfw','p':'sfw','r':'nsfw','s':'nsfw','t':'nsfw','u':'nsfw','v':'sfw','w':'sfw','wg':'nsfw','i':'nsfw','ic':'nsfw','cm':'sfw','y':'nsfw','3':'sfw','adv':'sfw','an':'sfw','cgl':'sfw','ck':'sfw','co':'sfw','fa':'sfw','fit':'sfw','int':'sfw','jp':'sfw','lit':'sfw','mu':'sfw','n':'sfw','po':'sfw','sci':'sfw','soc':'nsfw','sp':'sfw','tg':'sfw','toy':'sfw','trv':'sfw','tv':'sfw','vp':'sfw','x':'sfw'};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    $_GET[decode(arguments[1])] = decode(arguments[2]);
});


function addCss(css) {
	var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function initBanRequest() {
	
	var banReasonsBuilt = '';
	
	$('input[type="submit"]').before('<br /><strong style="font-size: 14px!important;" class="redtext">Double click a button to immediately submit a ban request for that reason.</strong><br /><br />');
	
	var buildHtml = '<div class="buttonHold">';
	
		
	var z = banQuickReasons.length;
	for(var ii = 0; ii < z; ii++) {
		buildHtml += '<h2>' + banQuickReasons[ii][0] + '</h2><ul class="selection button">';
		
		var arLen=banQuickReasons[ii].length;
		
		for ( var i=1, len=arLen; i<len; ++i ){
			buildHtml += '<li>' + banQuickReasons[ii][i] + '</li>';
		}
		
		buildHtml += '</ul>';
	}
	
	buildHtml += '</div>';
	
	$('table').after(buildHtml);

	$('ul.selection li').click(function() {
		$('textarea[name="reason"]').val($(this).html());
	});
	
	$('ul.selection li').dblclick(function() {
		$('form').submit();
	});
}

/***************************************************/

//                HUGE DONGS LOL

/***************************************************/

var reportUrl = 'https://www.4chan.org/reports/';

function initOverview()
{
	addCss(banPageCss);
	addCss(reportsCss);
	
	// Hide all posts.
	$('table').fadeOut(100);
	
	$('body').append('<center><div class="holdReportsLive"></div></center>');
	
	// Grab all the report links.
	$('.fakebutton').each(function(index, value) {
		level = $(this).parent().parent().attr('class');
		link = $(this).attr('href');
		index = index;
		
		//alert(current.link + ' - - - ' + current.index);
		
		setTimeout( fetchAndAdd, 500*index, link, index, level );
	});
}

function fetchAndAdd(link, index, level) {
	$.get(reportUrl + link, function(data) {
		newData = parseIncoming(data);
		
		
		var board = newData.board;
		
		var postLink = 'https://www.4chan.org/reports/?mode=details&board=' + board + '&no=' + newData.postId;
		
		if( newData.replyType == 0 ) {
			buttonData = (boardInfo[board] == 'nsfw') ? nsfwOpButton : sfwOpButton;
		} else {
			buttonData = (boardInfo[board] == 'nsfw') ? nsfwButton : sfwButton;
		}
		
		
		builtHtml = '<div class="infoHold">';
		
		builtHtml += '<span class="board" style="padding-right: 10px;"><strong>Board:</strong> /' + newData.board + '/</span>';
		builtHtml += '<span class="postNo" style="padding-right: 10px;"><strong>#</strong> <a href="' + postLink + '" target="_blank">' + newData.postId + '</a></span>';
		builtHtml += '<span class="viewDirect" style="padding-right: 10px;">[<a href="http://sys.4chan.org/' + board + '/imgboard.php?res=' + newData.postId + '" target="_blank">View Full</a>]</span>';
		builtHtml += '<span class="reports"><strong>Total:</strong> ' + newData.totalReports + '&nbsp;&nbsp;&nbsp;&nbsp;<strong>Illegal:</strong> ' + newData.illegalReports + '&nbsp;&nbsp;&nbsp;&nbsp;<strong>Spam:</strong> ' + newData.spamReports + '&nbsp;&nbsp;&nbsp;&nbsp;<strong>Rule:</strong> ' + newData.ruleReports + '</span>';
		builtHtml += '</div>';
		
		builtHtml += '<div class="nameHold" style="background:url(' + buttonData + ') #ead6ca right top no-repeat; padding-right: 107px; ">';
		builtHtml += newData.name;
		builtHtml += '<span class="smallDate">' + newData.date + '</span>';
		builtHtml += '</div>';
		
		if( newData.hasImage ) {
			builtHtml += '<img class="hoverImage" src="' + newData.imageUrl + '" /><img src="' + newData.fullImageUrl + '" class="full_image_display" style="display: none;">';
			builtHtml += '<div class="postContent" id="hasImage">';
		} else {
			builtHtml += '<div class="postContent" style="width: 100%;">';
		}
		
		builtHtml += newData.post;
		
		if( newData.post.match('Camera-Specific Properties:') ) {
			builtHtml += '</td></tr></tbody></table>';
		}
		
		builtHtml += '</div>';
		
		buttons = '<ul class="selection button"><li class="joinstart" id="del_' + newData.postId + '" title="Delete Post #' + newData.postId + ' on board /' + newData.board + '/">Delete Post</li><li class="joinend" id="del_img_' + newData.postId + '"  title="Delete Image from Post #' + newData.postId + ' on board /' + newData.board + '/">[image only]</li><li id="escalate_' + newData.postid + '"  title="Escalate Post #' + newData.postId + ' on board /' + newData.board + '/">Escalate</li><li id="ban_req_' + newData.postId + '"  title="Request Ban on Post #' + newData.postId + ' on board /' + newData.board + '/">Request Ban</li><li id="clear_' + newData.postId + '" title="Clear Reports on Post #' + newData.postId + ' on board /' + newData.board + '/">Clear</li></ul>';
			
		$('.holdReportsLive').append('<div class="inlineReportPreview ' + level + '" style="display:none;" id="rep_' + (newData.postId) + '">' + builtHtml + '<div class="buttons">' + buttons + '</div>');
		
		$('#rep_' + newData.postId).fadeIn(100, function() {
			id = $(this).attr('id');
			$('#' + id + ' img.hoverImage').tooltip({offset:'bottom', predelay:200});
		});
		
		// ban_req escalate del_img_ del_
		
		$('#del_' + newData.postId).dblclick(function() {
			doDelete($(this).attr('id'), $(this).attr('title'), false);
		});
		
		$('#del_img_' + newData.postId).dblclick(function() {
			doDelete($(this).attr('id'), $(this).attr('title'), true);
		});
		
		$('#escalate_' + newData.postId).dblclick(function() {
			doEscalate($(this).attr('id'), $(this).attr('title'));
		});
		
		$('#ban_req_' + newData.postId).dblclick(function(event) {
			doBanRequest($(this).attr('id'), $(this).attr('title'), event);
		});
		
		$('#clear_' + newData.postId).dblclick(function() {
			doClear($(this).attr('id'), $(this).attr('title'));
		});
		
		delete newData;
		delete builtHtml;
	});
}

function doDelete(id, data, imgonly)
{
	//https://www.4chan.org/reports/?mode=details&board=sp&no=14055813
	
	act = (imgonly == true) ? {imgonly:'on', action:'delete'} : {junk:'junk', action:'delete'};
	
	board = data.split('on board /')[1].split('/')[0];
	postid = data.split('#')[1].split(' on')[0];
	
	url = 'https://www.4chan.org/reports/?mode=details&board=' + board + '&no=' + postid;
	
	$.post(url, act, function(data) {
		$('#rep_' + postid).fadeOut(100);
	});
}

function doBanRequest(id, data, e) {
	$('#ban_req_popup').remove();
	
	mouse = {'x':e.screenX, 'y':e.screenY};
	
	board = data.split('on board /')[1].split('/')[0];
	postid = data.split('#')[1].split(' on')[0];
	
	offset = $('#rep_' + postid).offset();
	
	var buildHtml = '<div class="buttonHold inlineHold" id="ban_req_popup" style="position: absolute; top: ' + offset.top + 'px; left: ' + offset.left/2 + 'px"><div style="float: right; cursor: hand;;" id="close_box">[CLOSE BOX]</div><div style="display:none;" id="ban_request_id">' + board + '|' + postid + '</div><div>Filing a ban request for <strong>/' + board + '/' + postid + '.</strong></div><br /><strong>Custom Reason:</strong><br /><textarea name="reason" style="width: 100%; height: 100px;"></textarea> <input type="button" id="submit_banreq_custom" value="Submit Custom Reason"><hr />';
	
	buildHtml += buildBanReasons(banReasons);
	
	buildHtml += '</div>';
	
	$('body').append(buildHtml);
	
	
	$('.inlineHold ul.selection li:not(.nohover)').click(function() {		
		if( $('textarea[name="reason"]').val() == false ) {
			$('textarea[name="reason"]').val($(this).attr('title') + ' ');
		} else {
			if($('textarea[name="reason"]').val().match($(this).attr('title') + ' ')) {
				
			} else {
				$('textarea[name="reason"]').val($('textarea[name="reason"]').val() + '/ ' + $(this).attr('title') + ' ');
			}
		}
	});
	
	$('.inlineHold ul.selection li:not(.nohover)').dblclick(function() {
		submitBanRequest( postid );
	});
	
	$('#close_box').click(function() {
		$('#ban_req_popup').remove();
	});
	
	$('#submit_banreq_custom').dblclick(function() {
		submitBanRequest( postid );
	});
}

function submitBanRequest( delid )
{
	board = $('#ban_request_id').html().split('|')[0];
	postid = $('#ban_request_id').html().split('|')[1];
	
	url = 'https://www.4chan.org/reports/?mode=details&board=' + board + '&no=' + postid;
	theReason = $('textarea[name="reason"]').val();
	
	if( theReason == '' ) {
		alert('You must enter a ban request reason.');
		return false;
	}
	
	
	act = {action:'ban_req_complete',reason:theReason};
	
	$('#ban_req_popup').fadeOut(100, function() {
		$('#ban_req_popup').remove();
	});
	
	$.post(url, act, function(data) {
		$('#rep_' + delid).fadeOut(100);
	});
	
	
}

function doClear(id, data)
{
	//https://www.4chan.org/reports/?mode=details&board=sp&no=14055813
	
	board = data.split('on board /')[1].split('/')[0];
	postid = data.split('#')[1].split(' on')[0];
	
	act = {action:'clear'};
	
	url = 'https://www.4chan.org/reports/?mode=details&board=' + board + '&no=' + postid;
	
	$.post(url, act, function(data) {
		$('#rep_' + postid).fadeOut(100);
	});
}

function parseIncoming( data )
{
	newData = new Object();
	
	newData.totalReports = data.split('Total reports</th><td>')[1].split('</td>')[0];
	
	if( data.match('Reply to</th>') ) {
		newData.replyType = 1;
		newData.replyTo = data.split('Reply to</th><td>')[1].split('</td></tr><tr><th>')[0];
	} else {
		newData.replyType = 0;
	}
	
	newData.postId = data.split('?res=')[1].split('\'>')[0];
	newData.board = data.split('sys.4chan.org/')[1].split('/')[0];
	
	newData.name = data.split('Name</th><td>')[1].split('</td></tr>')[0];
	
	if( newData.name.match('postertrip') ) {
		newData.name = '<span class="poster_name">' + newData.name.split('<span class="postertrip">')[0] + '</span><span class="poster_trip">' + newData.name.split('<span class="postertrip">')[1] + '</span>';
	} else {
		newData.name = '<span class="poster_name">' + newData.name + '</span>';
	}
	
	newData.hasImage = Boolean(data.match('<img src'));
	if( newData.hasImage ) {
		newData.fullImageUrl = 'http://images.4chan.org/' + data.split('<a href="http://images.4chan.org/')[1].split('">')[0];
		newData.imageUrl = data.split('<img src="')[1].split('"></a>')[0];
		newData.post = '<p style="min-width: 195px!important;">' + data.split('<th>Comment</th><td>')[1].split('</td></tr>')[0] + '</p>';
	} else {
		newData.post = '<p>' + data.split('<th>Comment</th><td>')[1].split('</td></tr>')[0] + '</p>';
	}
	
	newData.subject = data.split('Subject</th><td>')[1].split('</td></tr>')[0];
	newData.date = data.split('Date</th><td>')[1].split('</td></tr>')[0];
	
	newData.date = newData.date.split('(')[0] + ' ' + newData.date.split(')')[1];
	
	// Report junk
	newData.totalReports = data.split('Total reports</th><td>')[1].split('</td>')[0];
	newData.illegalReports = data.split('\'illegal\'</th><td>')[1].split('</td>')[0];
	newData.ruleReports = data.split('\'rule vio.\'</th><td>')[1].split('</td>')[0];
	newData.spamReports = data.split('\'spam\'</th><td>')[1].split('</td>')[0];
	
	
	
	return newData;
}

function buildBanReasons(arr, level) {
	var build = "";
	
	if( !level ) {
		level = 0;
	}
	
	for( var item in arr ) {
		var value = arr[item];
		
		if( level == 0 ) {
			build += '<h2>' + item + "</h2>";
			build += '<ul class="selection button">';
			build += buildBanReasons(value, level + 1);
			build += '</ul>';
		} else if( level == 1 && typeof(value) == 'object' ) {
			build += '<li class="multi nohover"><ul>';
			build += '<li class="first nohover">' + item + '</li>';
			build += buildBanReasons(value, level+1);
			build +='</ul></li>'
		} else {
			build += '<li title="' + value + '">' + item + '</li>';
		}
	}
	
	return build;
}

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        begin();
    }
}

/*function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}*/


function begin() {
	if( $_GET['mode'] == 'details' ) {
		if( $('b:first').html().match('Filing a ban request') ) {
			initBanRequest();
		}
	}

	if( ($_GET['mode'] == 'overview' || !$_GET['mode']) && !$_GET['stopFade'] ) {
		initOverview();
	}
}
