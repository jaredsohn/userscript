// ==UserScript==
// @name        dAmnGotMail
// @namespace   DJ-Zemar
// @description Automatically refresh your dA messages.
// @include     *.deviantart.com/*
// @version     1.7
// ==/UserScript==

function refreshInfo(inboxId){
	//parsing DIFI
	queryStr = "?" +
	"c[]=MessageCenter;get_views;"+inboxId+",oq:fb_comments:0:0:f&" +				// 3.1 main comments
	"c[]=MessageCenter;get_views;"+inboxId+",oq:fb_replies:0:0:f&" +					// 3.2 main replies
	"c[]=MessageCenter;get_views;"+inboxId+",oq:notes_unread:0:0:f&" +				// 4 unread notes
	"c[]=MessageCenter;get_views;"+inboxId+",oq:notices:0:0:f&" +					// 0.1 hot topics
	"c[]=MessageCenter;get_views;"+inboxId+",oq:contests:0:0:f&" +					// 0.2 contest announcements
	"c[]=MessageCenter;get_views;"+inboxId+",oq:fb_activity:0:0:f&" +				// 3.3 main activity
	"c[]=MessageCenter;get_views;"+inboxId+",oq:fb_critiques:0:0:f&" +				// 5->3.5 critiques
	"c[]=MessageCenter;get_views;"+inboxId+",oq:correspondence:0:0:f&" +				// 5->3.4 correspondences
	"c[]=MessageCenter;get_views;"+inboxId+",oq:devwatch:0:0:f:tg=deviations&" +		// 1 devWATCH - deviations
	/*"c[]=MessageCenter;get_views;"+inboxId+",oq:devwatch:0:0:f:tg=news&" +			// 2.3 devWATCH - news articles
			2.3 Removed due to causing the script to fail.*/
	"c[]=MessageCenter;get_views;"+inboxId+",oq:devwatch:0:0:f:tg=journals&" +		// 2.1 devWATCH - journals
	"c[]=MessageCenter;get_views;"+inboxId+",oq:devwatch:0:0:f:tg=polls&" +			// 2.4 devWATCH - polls
	"c[]=MessageCenter;get_views;"+inboxId+",oq:devwatch:0:0:f:tg=critiques&" +		// 2.2 devWATCH - watched critiques
	"c[]=MessageCenter;get_views;"+inboxId+",oq:devwatch:0:0:f:tg=activities&" +		// 2.5 devWATCH - activity stack
	"c[]=MessageCenter;get_views;"+inboxId+",oq:bulletins:0:0:f&" +					// 0.3 bulletins from groups
	"c[]=MessageCenter;get_views;"+inboxId+",oq:zendesk:0:0:f";						// zendesk replies
	var b=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	GM_xmlhttpRequest({
        method: 'GET',
        url: 
		"http://www.deviantart.com/global/difi.php" + queryStr + "&t=xml",
        onload: function (responseDetails) {
			b = responseDetails.responseText.match(/<matches>(\d+)<\/matches>/gi);
			for(var i=0;i<b.length;i++){
				b[i]=b[i].replace(/(<\/?[^>]+>)/gi, '');
			}
			insert(b);
		}
    });
}

function insert(a){
	var messageMenu = document.getElementById('oh-menu-split');

	var totalMessages = (parseInt(a[0]) + parseInt(a[1]) + parseInt(a[2]) + parseInt(a[3]) + parseInt(a[4]) + parseInt(a[5]) + parseInt(a[6]) + parseInt(a[7]) + parseInt(a[8]) + parseInt(a[9]) + parseInt(a[10]) + parseInt(a[11]) + parseInt(a[12]) + parseInt(a[13]));
	
	var devnote = (parseInt(a[3])+parseInt(a[4])+parseInt(a[13])); //Notices
	
	var devwatch = (parseInt(a[8])+parseInt(a[9])+parseInt(a[10])+parseInt(a[11])+parseInt(a[12])); //devWatch
	
	var devfeed = (parseInt(a[0])+parseInt(a[1])+parseInt(a[5])+parseInt(a[6])); //Comments & Feedback
	
	var devcorr = (parseInt(a[7])); //Correspondence
	
	var devnach = (parseInt(a[2])); //Notes

	messageMenu.innerHTML = "<div class=\"oh-menuctrl\"><div style=\"width:20em\" class=\"oh-menu iconset-messages\"><a class=mi href=\"http://my.deviantart.com/messages/\"><i class=\"i13\"></i>"+(totalMessages == 0 ? "0 Messages" : "<b>View All Messages</b>")+"</a><div class=oh-hr></div><div class=\"oh-smaller\">" +
	(devnote == 0 ? "" : ("<a class=mi href=\"http://my.deviantart.com/messages/#view=notices\"><i class=\"i3\"></i>"+devnote+"&nbsp;<span class=oh-darker>"+(devnote > 1 ? "Notices" : "Notice")+"</span></a>")) +
	(devwatch == 0 ? "" : ("<a class=mi href=\"http://my.deviantart.com/messages/#view=deviantwatch\"><i class=\"i1\"></i>"+devwatch+"&nbsp;<span class=oh-darker>"+(devwatch > 1 ? "deviantWATCH Messages" : "deviantWATCH Message")+"</span></a>")) +
	(devfeed == 0 ? "" : ("<a class=mi href=\"http://my.deviantart.com/messages/#view=feedback\"><i class=\"i2\"></i>"+devfeed+"&nbsp;<span class=oh-darker>"+(devfeed > 1 ? "Feedback Messages" : "Feedback Message")+"</span></a>")) +
	(devcorr == 0 ? "" : ("<a class=mi href=\"http://my.deviantart.com/messages/#view=correspondence\"><i class=\"i17\"></i>"+devcorr+"&nbsp;<span class=oh-darker>"+(devcorr > 1 ? "Correspondence Messages" : "Correspondence Message")+"</span></a>")) +
	((totalMessages - devnach) != 0 ? "<div class=oh-hr></div>" : "") +
	(devnach == 0 ? "<a class=mi href=\"http://my.deviantart.com/notes/\"><i class=\"i23\"></i><span class=oh-darker>Notes</span></a></div><div class=oh-hr></div>" : ("<a class=mi href=\"http://my.deviantart.com/notes/\"><i class=\"i9\"></i>"+devnach+"&nbsp;<span class=oh-darker>"+(devnach > 1 ? "Notes" : "Note")+"</span></a></div><div class=oh-hr></div>")) +
	
	"<div align=\"center\"><small><b><a href=\"http://dj-zemar.deviantart.com/art/dAmnGotMail-Automatic-Inbox-Checker-350685597\">dAmnGotMail</a></b> by <a href=\"http://dj-zemar.deviantart.com\">DJ-Zemar</a></small></div>" +
	"</div></div><a class=oh-l href=\"http://my.deviantart.com/messages/\"><i class=\"icon h-icon i3\"></i>&nbsp;"+(totalMessages == devnach && totalMessages != 0 ? devnach+"&nbsp;"+(devnach == 1 ? "Note" : "Notes") : totalMessages+(devnach == 0 ? "" : "&nbsp;<span class=\"oh-darker\">(</span>"+devnach+"&nbsp;"+(devnach == 1 ? "Note" : "Notes")+"<span class=\"oh-darker\">)</span>"))+"</a>";

	/*
	Known bugs:
		Does not work with Group Messages.
		Does not work with Splinter Menu.
	*/
}

function sendRequest(){
if (!document.getElementById('oh-menu-split')){return;}
GM_xmlhttpRequest({
        method: 'GET',
        url: "http://deviantart.com/global/difi.php?c[]=MessageCenter;get_folders;&t=json",
        onload: function (responseDetails) {
			userid = responseDetails.responseText.match(/{"folderid":"(\d+)","is_inbox":true}/);
		
			//Call the refresh
			refreshInfo(userid[1]);
		}
    });
}

//Call function every 10 seconds
setInterval(sendRequest,10000);

//Call function on load
sendRequest();