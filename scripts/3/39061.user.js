// ==UserScript==
// @name           Lazy Okcupid
// @namespace      Lazy Okcupid
// @include        *www.okcupid.com/profile/*/journal*
// ==/UserScript==


function dealWithPost(post) {
	var form = post.getElementsByTagName('form')[0];
	var bid = form.elements.namedItem("bid").value;
	var boardname = form.elements.namedItem("boardname").value;
	var ownerid = form.elements.namedItem("ownerid").value;
	var uservar = form.elements.namedItem("uservar").value;
	var uid = form.elements.namedItem("uid").value;
	var extra = form.elements.namedItem("extra").value;
	var URL = form.elements.namedItem("url").value;
	post.setAttribute('url',URL);
	post.setAttribute('uid',uid);
	post.setAttribute('uservar',uservar);
	post.setAttribute('extra',extra);
	post.setAttribute('bid',bid);
	post.setAttribute('boardname',boardname);
	post.setAttribute('ownerid',ownerid);
	post.setAttribute('refresh',"false");
	post.setAttribute('count',"0");
	post.setAttribute('alert',"false");
	post.setAttribute('id','journal_entry_'+bid);
	var refreshLI = document.createElement('li');
	var refreshLink = document.createElement('a');
	refreshLink.setAttribute('href',"#blah");
	refreshLink.setAttribute('onclick','if(getPost(this).getAttribute("refresh") != "true") {this.parentNode.nextSibling.setAttribute("style","display:block");this.textContent="Stop";getPost(this).setAttribute("refresh","true");/*displayThisPost(this);*/refreshPost(getPost(this));if (!document.refreshing) {document.refreshing=true;document.body.setAttribute("onFocus","if (document.title == \'COMMENT\') { document.title=secondtitle; } else {  }");document.body.setAttribute("onmouseover","if (document.title == \'COMMENT\') { document.title=secondtitle; } else {  }");setInterval("refreshFunc();",3000);}} else {this.parentNode.nextSibling.setAttribute("style","display:none");this.textContent="Refresh";getPost(this).setAttribute("refresh","false");getPost(this).setAttribute("count","0");realDisplayThisPost(this);}');
	refreshLI.appendChild(refreshLink);
	refreshLink.textContent = "Refresh";
	refreshLI.setAttribute('class','comment_add_link last');
	var ul = getElementsByAttribute(post,"class","mini_actions",false)[0];
	ul.appendChild(refreshLI);
	var alertLI = document.createElement('li');
	var alertLink = document.createElement('a');
	alertLink.setAttribute('href',"#blah");
	alertLink.setAttribute('onclick','if(getPost(this).getAttribute("alert") != "true") {this.textContent="Stop Alert";getPost(this).setAttribute("alert","true");} else {this.textContent="Start Alert";getPost(this).setAttribute("alert","false");}');
	alertLI.appendChild(alertLink);
	alertLink.textContent = "Start Alert";
	alertLI.setAttribute("style","display:none;");
	alertLI.setAttribute('class','comment_add_link last');
	ul.appendChild(alertLI);
}



function init() {
	
	

addform_submit_array = getElementsByAttribute(document,"class","add_submit",false);

for (i=0;i<addform_submit_array.length;i++) {

	var addform_submit_button = addform_submit_array[i].childNodes[1];
var oclick = addform_submit_button.getAttribute('onclick');
	oclick = "var text = getElementsByAttribute(this.parentNode.parentNode,'class','addform_ta',false)[0];text.value = '<p>' + text.value;text.value = text.value.replace(/(\\n+)/g,'</p><p>$1');text.value = text.value + '</p>';"+oclick;
	addform_submit_button.setAttribute('onclick',oclick);
	var mainform = addform_submit_button.parentNode.parentNode;
	var bid = mainform.elements.namedItem("bid").value;
	var commentaddlink = document.getElementById("comment_add_link_"+bid);
	
if (commentaddlink.getAttribute('style') != "display:none;") {
	var newLI = document.createElement('li');
	newLI.innerHTML = commentaddlink.innerHTML;
	newLI.setAttribute('class',commentaddlink.getAttribute('class'));
	commentaddlink.parentNode.insertBefore(newLI,commentaddlink);
	commentaddlink.setAttribute('style','display:none;');
	}

	var commentholder = 

getElementsByAttribute(mainform.parentNode.parentNode.parentNode.parentNode,"class","comment_load_shell",false)[0];
var newUL = document.createElement('ul');
newUL.setAttribute("class","mini_actions");
var newLI2 = document.createElement('li');
	newLI2.innerHTML = commentaddlink.innerHTML;
var ind2 = newLI2.innerHTML.indexOf("util.toggle('")+String("util.toggle('").length;


newLI2.innerHTML = newLI2.innerHTML.substring(0,ind2)+"new_"+newLI2.innerHTML.substring(ind2,newLI2.innerHTML.length);



	newLI2.setAttribute('class',commentaddlink.getAttribute('class'));
	commentholder.parentNode.insertBefore(newUL,commentholder.nextSibling);
newUL.appendChild(newLI2);

var comment_add = mainform.parentNode;

var new_comment_add = document.createElement('div');
new_comment_add.setAttribute('class','comment_add');
new_comment_add.setAttribute('id','new_'+comment_add.getAttribute('id'));
new_comment_add.innerHTML = comment_add.innerHTML;
commentholder.parentNode.insertBefore(new_comment_add,commentholder.nextSibling);
new_comment_add.setAttribute('style','display:none;');



var ind3 = new_comment_add.innerHTML.indexOf("util.toggle('")+String("util.toggle('").length;


new_comment_add.innerHTML = new_comment_add.innerHTML.substring(0,ind3)+"new_"+new_comment_add.innerHTML.substring(ind3,new_comment_add.innerHTML.length);




var ind4 = new_comment_add.innerHTML.indexOf("addComment('")+String("addComment('").length;


new_comment_add.innerHTML = new_comment_add.innerHTML.substring(0,ind4)+"new_"+new_comment_add.innerHTML.substring(ind4,new_comment_add.innerHTML.length);





var ind5 = new_comment_add.innerHTML.indexOf('<form id="')+String('<form id="').length;


new_comment_add.innerHTML = new_comment_add.innerHTML.substring(0,ind5)+"new_"+new_comment_add.innerHTML.substring(ind5,new_comment_add.innerHTML.length);









var ind6 = new_comment_add.innerHTML.indexOf('">Submit<');


new_comment_add.innerHTML = new_comment_add.innerHTML.substring(0,ind6)+"javascript:util.toggle('new_comment_add_"+bid+"', false, false, 1);javascript:util.toggle('comment_add_"+bid+"', false, false,1);"+new_comment_add.innerHTML.substring(ind6,new_comment_add.innerHTML.length);


	
}

var scriptstring = 'documentrefreshing = false;'+
'function gotCmtCount(data) {'+
    'data = eval(\'(\' + stripBreaks(data.responseText) + \')\');'+
    'var cmtstr = " Comments";'+
    'if (data.count == 1 || data.count == "1") {'+
        'cmtstr = " Comment";'+
    '}'+
    'var url = "/journal?tuid=" + data.ownerid + "&pid=" + data.extra;'+
''+
	'var count = data.count;'+
	'var pending_count = data.pending_count;'+
	'var page_size = 20;'+
	'var pageLink = "";'+
	'var pageLinkClose = "";'+
	'var num_pages = Math.floor ((count + page_size - 1) / page_size);'+
''+
	'if (count > 0) {'+
'		'+
		'pageLink += "<a id=\'loadup_link_"+data.boardid+"\' href=\\"javascript:loadIDBoard(\'" +'+
			'data.boardid + "\',\'" + data.boardname + "\',\'" + data.uservar +'+
			'"\',\'" + data.ownerid + "\',\'" + data.userid + "\',\'" + data.extra'+
			'+ "\', \'" + 0 + "\',\'" + page_size + "\',\'" + url + "\',\'\')\\">";'+
'			'+
	    'if (pending_count > 0)'+
    	'{'+
    		'pageLinkClose += "  (" + pending_count + " pending)";'+
    	'}	'+
'		'+
		'pageLinkClose += "</a>";'+
'		'+
	'} else {'+
	    'pageLink = "<span class=\'holder\'>";'+
	    'pageLinkClose = "</span>";'+
	'}'+
''+
	'var content = "<div class=\'comment_count\'>" + pageLink + count + cmtstr + pageLinkClose;'+
''+
'	'+
'	'+
''+
''+
	'content += "</div>";'+
''+
	'if (count > 0) {'+
		'content += "<div class=\'comment_nav\' id=\'comment_nav_" + data.boardid + "\'><ul>";'+
''+
		'for (var i = 0; i < num_pages; ++i) {'+
		    'start = i*20 + 1;'+
		    'end = start + 19;'+
		    'end = (end > count ? count : end);'+
''+
            'content += "<li class=\'st_"+(i*20)+"\'><a id=\\"comment_page_" + (i+1) + "_" + data.boardid + "\\" href=\\"javascript:loadIDBoard(" '+
				'+ "\'" + data.boardid + "\',"'+
				'+ "\'" + data.boardname + "\',"'+
				'+ "\'" + data.uservar + "\',"'+
				'+ "\'" + data.ownerid + "\',"'+
				'+ "\'" + data.userid + "\',"'+
				'+ "\'" + data.extra + "\',"'+
				'+ "\'" + i * page_size + "\',"'+
				'+ "\'" + page_size + "\',"'+
				'+ "\'" + url + "\',\'\')"'+
				'+"\\">" + start +" - "+ end + "</a></li>";'+
'			'+
		'}'+
''+
		'content += "</ul></div>";'+
	'}'+
    '$(data.boardid).innerHTML = content;'+
'}'+
''+
'function gotData(data) '+
'{'+
''+
''+
''+
    'data = eval(\'(\' + stripBreaks(data.responseText) + \')\');'+
'	'+
'	'+
	'$(\'comment_add_\' + data.boardid).style.display="none";'+
'	'+
	'$(\'comment_submit_message_\' + data.boardid).style.display="none";'+
''+
    'if (data.error && data.error == "not logged in") {'+
        'url = "/signup?p=" + escape("/board") + "&key1=redirect&val1=1&key2=add&val2=1&key3=bid&val3=" + data.bid + "&key4=url&val4=" + escape(data.board_url) + "&key5=boardname&val5=" + escape(data.boardname) + "&key6=text&val6=" + escape(data.comment) + "&key7=uservar&val7=" + escape(data.uservar);'+
        'window.location.href = url;'+
    '}'+
    'else {'+
'        '+
''+
'		'+
		'if (data.has_pending_comments == 0)'+
		'{'+
			'alert("pending comments gone for " + data.boardid);'+
			'if ($("pending_comments_"+data.boardid))'+
			'{'+
				'$("pending_comments_"+data.boardid).style.display = "none";'+
			'}'+
		'}'+
'		'+
''+
''+
		'var navstuff;'+
		'if ($("comment_nav_" + data.boardid)) {'+
''+
            '$A($("comment_nav_" + data.boardid).getElementsByTagName("li")).each(function(obj){'+
''+
                'Element.removeClassName(obj,"active");'+
''+
                'if(typeof obj.stashit != "undefined") obj.innerHTML = obj.stashit;'+
			    'if(obj.className == "st_" + starting) {'+
			        'obj.className = obj.className + " active";'+
			        'span = obj.getElementsByTagName("a")[0].innerHTML;'+
			        'obj.stashit = obj.innerHTML;'+
			        'obj.innerHTML = "<span>" + span + "</span>";'+
			    '}'+
''+
			'});'+
''+
'            '+
'            '+
			'navstuff = ""'+
			    '+ $("comment_nav_" + data.boardid).getElementsByTagName("ul")[0].innerHTML '+
    			'+ "<li><a href=\'#nogo\' id=\'close_" + data.boardid'+
    			'+ "\' onclick=\\"$(\'comment_load_"+data.boardid+"\').innerHTML = \'\';\\""'+
    			'+ ">Close</a></li>";'+
''+
		'} else if(data.num_comments != 0) {'+
''+
''+
''+
			'navstuff = "<li class=\'st_0 active\'><span>1 - "+data.num_comments+"</span></li>"'+
			    '+ "<li><a href=\'#nogo\' id=\'close_" + data.boardid'+
    			'+ "\' onclick=\\"$(\'comment_load_"+data.boardid+"\').innerHTML = \'\';\\""'+
    			'+ ">Close</a></li>";'+
'			'+
'			'+
		'} else {'+
		    'navstuff = "";'+
		'}'+
'		'+
''+
''+
		'var top_nav = "<div class=\'comment_nav\' id=\'comment_nav_top_" + data.boardid + "\'><ul>" + navstuff + "</ul></div>";'+
		'var bottom_nav = "<div class=\'comment_nav\' id=\'comment_nav_" + data.boardid + "\'><ul>" + navstuff + "</ul></div>";'+
''+
		'var url = "/journal?tuid=" + data.ownerid + "&pid=" + data.extra;'+
''+
		'var comment_added_str = "";'+
		'if (data.added_comment != undefined)'+
		'{'+
		    '$(\'comment_add_link_\' + data.boardid).innerHTML="<span class=\'holder\'>Comment added.</span>";'+
		'}'+
''+
		'var hide_top_nav = 0;'+
		'if (data.num_comments != undefined)'+
		'{'+
			'if (data.num_comments == 0) { hide_top_nav = 1; }'+
		'}'+
		'if (!hide_top_nav)'+
		'{'+
			'$("comment_load_" + data.boardid).innerHTML = top_nav + data.content + comment_added_str + bottom_nav;'+
		'}'+
		'else'+
		'{'+
			'$("comment_load_" + data.boardid).innerHTML = bottom_nav;'+
		'}'+
		'if($("loadup_link_"+data.boardid).stashit) $("loadup_link_"+data.boardid).innerHTML = $("loadup_link_"+data.boardid).stashit;'+
''+
    '}'+
'}'+
''+
'function loadIDBoard(boardid, boardname, uservar, ownerid, userid, postid, start, limit, s_url, cmtid) '+
'{'+
    'starting = start;'+
'try {'+
    '$("loadup_link_"+boardid).stashit = $("loadup_link_"+boardid).innerHTML;'+
    '$("loadup_link_"+boardid).innerHTML = "Loading Comments";'+
'} catch (e) {}'+
    'var req = "bid=" + boardid + "&boardname=" + escape(boardname) + "&uservar=" '+
		'+ escape(uservar) + "&ownerid=" + escape(ownerid) + "&uid=" + userid '+
		'+ "&extra=" + postid + "&start=" + start + "&limit=" + limit + "&cmtid=" '+
        '+ cmtid + "&" + gettzo() + cacheBust();'+
''+
    'if (s_url != null && s_url.length > 0) {'+
        'req += "&tpurl=" + escape(s_url);'+
    '}'+
''+
    'var myajax = newreq(req);'+
'}'+
''+
'function loadCommentCount(count_pending, boardid, boardname, uservar, ownerid, userid, postid, cmtid) {'+
'	'+
	'PersistantBoard[boardid] = {};'+
'	'+
	'PersistantBoard[boardid].countPending 	= count_pending;'+
	'PersistantBoard[boardid].user_id		= userid;'+
	'PersistantBoard[boardid].post_id 		= postid;'+
	'PersistantBoard[boardid].cmt_id 		= cmtid;'+
'	'+
'	'+
    'var params = "getcount=1&count_pending=" + count_pending + "&bid=" + boardid + "&boardname=" +'+
		'escape(boardname) + "&uservar=" + escape(uservar) + "&ownerid=" +'+
		'escape(ownerid) + "&uid=" + userid + "&extra=" + postid + "&" + '+
		'gettzo() + cacheBust();'+
    'var myajax = new Ajax.Request("/board",'+
			          '{method: \'get\', '+
					   'parameters: params,'+
					   'onSuccess: gotCmtCount, '+
					   'onFailure: failedCmtCount});'+
    'return myajax;'+
'}'+
''+
'function newreq(params) {'+
''+
    'return new Ajax.Request("/board",'+
	                    '{method: "post", '+
                             'parameters: params, '+
                             'onSuccess: gotData, '+
                             'onFailure: failed});'+
'}'+

'function newreq2(params) {'+
''+
    'return new Ajax.Request("/board",'+
	                    '{method: "post", '+
                             'parameters: params, '+
                             'onSuccess: gotData2, '+
                             'onFailure: failed});'+
'}'+

'function gotData2(data) '+
'{'+
'refreshcount = 0;'+
''+
    'data = eval(\'(\' + stripBreaks(data.responseText) + \')\');'+
'	'+
'var toreplacestring = \'>Commented        <span><img src="http://cdn.okcimg.com/graphics/0.gif"  onload="var d = new Date(\';'+
'var toreplacewithstring = \'commenttime="\';'+
'while (data.content.indexOf(toreplacestring) != -1) {'+
'data.content = data.content.replace(toreplacestring,toreplacewithstring);'+
'}'+
'toreplacestring = \' * 1000); this.parentNode.innerHTML = makeSmartDateString(d,JOURNAL_FORMAT)" /></span>\';'+
'toreplacewithstring = \'">Loading Time...\';'+
'while (data.content.indexOf(toreplacestring) != -1) {'+
'data.content = data.content.replace(toreplacestring,toreplacewithstring);'+
'}'+
'	'+
	'$(\'comment_add_\' + data.boardid).style.display="none";'+
'	'+
	'$(\'comment_submit_message_\' + data.boardid).style.display="none";'+
''+
    'if (data.error && data.error == "not logged in") {'+
        'url = "/signup?p=" + escape("/board") + "&key1=redirect&val1=1&key2=add&val2=1&key3=bid&val3=" + data.bid + "&key4=url&val4=" + escape(data.board_url) + "&key5=boardname&val5=" + escape(data.boardname) + "&key6=text&val6=" + escape(data.comment) + "&key7=uservar&val7=" + escape(data.uservar);'+
        'window.location.href = url;'+
    '}'+
    'else {'+
'        '+
''+
'		'+
		'if (data.has_pending_comments == 0)'+
		'{'+
			'alert("pending comments gone for " + data.boardid);'+
			'if ($("pending_comments_"+data.boardid))'+
			'{'+
				'$("pending_comments_"+data.boardid).style.display = "none";'+
			'}'+
		'}'+
'		'+
''+
''+
		'var navstuff;'+
		'if ($("comment_nav_" + data.boardid)) {'+
''+
            '$A($("comment_nav_" + data.boardid).getElementsByTagName("li")).each(function(obj){'+
''+
                'Element.removeClassName(obj,"active");'+
''+
                'if(typeof obj.stashit != "undefined") obj.innerHTML = obj.stashit;'+
			    'if(obj.className == "st_" + starting) {'+
			        '/*obj.className = obj.className + " active";'+
			        'span = obj.getElementsByTagName("a")[0].innerHTML;'+
			        'obj.stashit = obj.innerHTML;'+
			        'obj.innerHTML = "<span>" + span + "</span>";*/'+
			    '}'+
''+
			'});'+
''+
'            '+
'            '+

'navstuff = $("comment_nav_" + data.boardid).getElementsByTagName("ul")[0].innerHTML; '+
'/*navstuff = navstuff + "<li><a href=\\"#nogo\\" id=\\"close_" + data.boardid+"\\" onclick=\\"$(\\"comment_load_"+data.boardid+"\\").innerHTML = \\"\\";\\">Close</a></li>";*/'+
''+
		'} else if(data.num_comments != 0) {'+
''+
''+
''+
			'navstuff = "<li class=\\"st_0 active\\"><span>1 - "+data.num_comments+"</span></li><li><a href=\\"#nogo\\" id=\\"close_"+data.boardid+"\\" onclick=\\"$(\\"comment_load_"+data.boardid+"\\").innerHTML = \\"\\";\\">Close</a></li>";'+
    			
    			
		'} else {'+
		    'navstuff = "";'+
		'}'+
'		'+
''+
''+
		'var top_nav = "<div class=\'comment_nav\' id=\'comment_nav_top_" + data.boardid + "\'><ul>" + navstuff + "</ul></div>";'+
		'var bottom_nav = "<div class=\'comment_nav\' id=\'comment_nav_" + data.boardid + "\'><ul>" + navstuff + "</ul></div>";'+
''+
		'var url = "/journal?tuid=" + data.ownerid + "&pid=" + data.extra;'+
''+
		'var comment_added_str = "";'+
		'if (data.added_comment != undefined)'+
		'{'+
		    '$(\'comment_add_link_\' + data.boardid).innerHTML="<span class=\'holder\'>Comment added.</span>";'+
		'}'+
''+
		'var hide_top_nav = 0;'+
		'if (data.num_comments != undefined)'+
		'{'+
			'if (data.num_comments == 0) { hide_top_nav = 1; }'+
		'}'+
		'if (!hide_top_nav)'+
		'{'+
			'$("comment_load_" + data.boardid).innerHTML = top_nav + data.content + comment_added_str + bottom_nav;'+
		'}'+
		'else'+
		'{'+
			'$("comment_load_" + data.boardid).innerHTML = bottom_nav;'+
		'}'+
		'if($("loadup_link_"+data.boardid).stashit) $("loadup_link_"+data.boardid).innerHTML = $("loadup_link_"+data.boardid).stashit;'+
    '}'+
'}'+
''+
'function gotInterestingJournalData(data) {'+
    'data = eval(\'(\' + stripBreaks(data.responseText) + \')\');'+
    'if (data.error && data.error == "not logged in") {'+
        'url = "/signup?p=" + escape("/board") + "&key1=redirect&val1=1&key2=add&val2=1&key3=bid&val3=" + data.bid + "&key4=url&val4=" + escape(data.board_url) + "&key5=boardname&val5=" + escape(data.boardname) + "&key6=text&val6=" + escape(data.comment) + "&key7=uservar&val7=" + escape(data.uservar);'+
        'window.location.href = url;'+
    '}'+
    'else {'+
			'$(data.boardid).innerHTML = data.content;'+
			'if (window.postJournalLoad) {'+
				'postJournalLoad();'+
			'}'+
    '}'+
'}'+
''+
''+
'function failed(err) {'+
''+
'}'+
''+
'function gotJournal(data) {'+
    'data = eval(\'(\' + stripBreaks(data.responseText) + \')\');'+
    'if (!data.empty) {'+
	'$("jnl" + data.userid).innerHTML = data.content;'+
    '}'+
'}'+
''+
'function failedJournal(err) {'+
'}'+
''+
'var secondtitle = "";var chkbool=false;'+


'function gotCmtCount2(data) {'+
    'data = eval(\'(\' + stripBreaks(data.responseText) + \')\');'+
    'var cmtstr = " Comments";'+
    'if (data.count == 1 || data.count == "1") {'+
        'cmtstr = " Comment";'+
    '}'+
    'var post = getPostByBid(data.boardid);'+
    'var ccount = post.getAttribute("count");'+
	'var alerting = post.getAttribute("alert");'+
    'var url = "/journal?tuid=" + data.ownerid + "&pid=" + data.extra;'+
	'var count = data.count;'+
	'if (count != Number(ccount)) {'+
		'if (document.title != "COMMENT") {'+
			'secondtitle = document.title;'+
			'document.title = "COMMENT";if(alerting=="true"){if (count<Number(ccount)) {alert("deleted comment");} else {alert("new comment");}}'+
		'}'+
		'post.setAttribute("count",String(count));'+
		'displayPost(data.boardid);'+
		'ccount=count;'+
	'}'+
	'var pending_count = data.pending_count;'+
	'var page_size = 20;'+
	'var pageLink = "";'+
	'var pageLinkClose = "";'+
	'var num_pages = 0;'+
''+
	    'pageLink = "<span class=\'holder\'>";'+
	    'pageLinkClose = "</span>";'+
	'var content = "<div class=\'comment_count\'>" + pageLink + count + cmtstr + pageLinkClose;'+
''+
''+
	'content += "</div>";'+
''+
	'if (count > 0) {'+
		'content += "<div class=\'comment_nav\' id=\'comment_nav_" + data.boardid + "\'><ul>";'+
''+
		'for (var i = 0; i < num_pages; ++i) {'+
		    'start = i*20 + 1;'+
		    'end = start + 19;'+
		    'end = (end > count ? count : end);'+
''+
            '/*content += "<li class=\'st_0\'>Refreshing</li>";*/'+

		'}'+
''+
		'content += "</ul></div>";'+
	'}'+
    '$(data.boardid).innerHTML = content;'+
'}'+
''+
'function failedCmtCount(data) {'+
'}'+
''+
'function gotActionPosts(data)'+
'{'+
   	'data = eval("(" + stripBreaks(data.responseText) + ")");'+
	'$("action_posts").innerHTML = data.content;'+
'}'+
''+
'function failedActionPosts(data)'+
'{'+
'}'+
''+
'function cacheBust() {'+
  'return "&cacheBust=" + Math.round(Math.random()*100000000);'+
'}'+
''+
 'function stripBreaks(str) {'+
   'var res = str.replace(/\\n/g," ");'+
   'res = res.replace(/\\n/g," ");'+
   'return res;'+
 '}'+
''+
 'function confirmPostDelete(postid) {'+
    'if (confirm("Are you totally sure you want to delete this post?")) {'+
       'window.location="/jpost?delete="+postid;'+
    '}'+
 '}'+
''+
''+
'function newjreq(params) {'+
    'return new Ajax.Request("/journal",'+
	                    '{method: "post", '+
                             'parameters: params, '+
                             'onSuccess: gotJournal, '+
                             'onFailure: failedJournal});'+
'}'+
''+
'function gettzo() {'+
    'return "tzo=" + (new Date().getTimezoneOffset()/-60);'+
'}'+
''+
'function addComment(formid) {'+
    'var myajax = newreq2("add=1&start=" + starting + "&limit=20&" + Form.serialize(formid) + "&" + gettzo() + cacheBust());'+
'}'+
''+
'function delComment(boardid) {'+
    'var myajax = newreq2("del=1&" + Form.serialize(\'cmtmodify_\' + boardid) + "&" + gettzo() + cacheBust());'+
'}'+
''+
'function delCommentInline(boardid, boardname, uservar, ownerid, userid, cid)'+
'{'+
    'var req = "del=1&bid=" + boardid + "&boardname=" + escape(boardname) + "&uservar=" '+
		'+ escape(uservar) + "&ownerid=" + escape(ownerid) + "&uid=" + userid '+
		'+ "&cid=" + escape(cid) + "&" + gettzo() + cacheBust();'+
''+
    'var myajax = newreq2(req);'+
'}'+
''+
'function approveCommentInline(boardid, boardname, uservar, ownerid, userid, cid)'+
'{'+
    'var req = "approve=1&bid=" + boardid + "&boardname=" + escape(boardname) + "&uservar=" '+
		'+ escape(uservar) + "&ownerid=" + escape(ownerid) + "&uid=" + userid '+
		'+ "&cid=" + escape(cid) + "&" + gettzo() + cacheBust();'+
''+
    'var myajax = newreq2(req);'+
'}'+
''+
'function boardActionInline(action, boardid, boardname, uservar, ownerid, userid, cid)'+
'{'+
    'if(!starting) starting = 0;'+
    'var req = escape(action) + "=1&bid=" + boardid'+
		'+ "&boardname=" + escape(boardname) '+
		'+ "&uservar=" + escape(uservar) '+
		'+ "&ownerid=" + escape(ownerid)'+
		'+ "&uid=" + userid '+
		'+ "&cid=" + escape(cid)'+
		'+ "&start=" + starting + "&limit=20"'+
		'+ "&" + gettzo() + cacheBust();'+
''+
    'var myajax = newreq2(req);'+
'}'+
''+
'function delAndBlock(boardid) {'+
    'var myajax = newreq2("delblock=1&" + Form.serialize(\'cmtmodify_\' + boardid) + "&" + gettzo() + cacheBust());'+
'}'+
''+
'function loadBoard2(boardid, boardname, userid) {'+
    'var myajax = newreq2("bid=" + boardid + "&uid=" + userid + "&boardname=" + escape(boardname) + "&" + gettzo() + cacheBust());'+
'}'+
''+
'var starting = 0;'+
''+
'function loadIDBoard2(boardid, boardname, uservar, ownerid, userid, postid, start, limit, s_url, cmtid) '+
'{'+
    'starting = start;'+
'try {'+
    '$("loadup_link_"+boardid).stashit = $("loadup_link_"+boardid).innerHTML;'+
    '$("loadup_link_"+boardid).innerHTML = "Loading Comments";'+
'} catch (e) {}'+
    'var req = "bid=" + boardid + "&boardname=" + escape(boardname) + "&uservar=" '+
		'+ escape(uservar) + "&ownerid=" + escape(ownerid) + "&uid=" + userid '+
		'+ "&extra=" + postid + "&start=" + start + "&limit=" + limit + "&cmtid=" '+
        '+ cmtid + "&" + gettzo() + cacheBust();'+
''+
    'if (s_url != null && s_url.length > 0) {'+
        'req += "&tpurl=" + escape(s_url);'+
    '}'+
''+
    'var myajax = newreq2(req);'+
'}'+
''+
'function loadRecent(recentid, userid) '+
'{'+
    'var myajax = newreq2("recent=" + escape(recentid) + "&uid=" + userid + "&" + gettzo() + cacheBust());'+
'}'+
''+
'function loadRelevant(relevantid, userid, includecomments) '+
'{'+
    'var params;'+
    'if (includecomments)'+
       'params = "relevant=" + escape(relevantid) + "&userid=" + userid + "&" + gettzo() + "&comments=1&posts=1" + cacheBust();'+
    'else'+
       'params = "relevant=" + escape(relevantid) + "&userid=" + userid + "&" + gettzo() + "&posts=1" + cacheBust();       '+
''+
    'var myajax = new Ajax.Request("/relevant",'+
				  '{method: \'get\','+
				   'parameters: params,'+
				   'onSuccess: gotData2,'+
				   'onFailure: failed});'+
'}'+
''+
'function loadRelevantStrangers(relevantid, userid, gender, orientation) '+
'{'+
    'var params = "relevant=" + escape(relevantid) '+
             '+ "&userid=" + userid + "&g=" + gender + "&o=" '+
	     '+ orientation +"&" + gettzo() + "&comments=1&posts=1" '+
	     '+ cacheBust();'+
    'var myajax = new Ajax.Request("/relevant",'+
				  '{method: \'get\','+
				   'parameters: params,'+
				   'onSuccess: gotData2,'+
				   'onFailure: failed});'+
'}'+
''+
'function loadInterestingJournalPosts(relevantid, userid, limit, start, maxperuser,'+
	'timestamp_weight, match_weight, distance_weight, age_diff_weight, '+
	'gentation_weight, buddy_weight) '+
'{'+
    'var params = "relevant=" + escape(relevantid) '+
	     '+ "&userid=" + userid'+
	     '+ "&limit=" + limit'+
	     '+ "&start=" + start	'+
		 '+ "&maxperuser=" + maxperuser'+
	     '+ "&interesting=1"'+
	     '+ "&timestamp_weight="+timestamp_weight'+
	     '+ "&match_weight="+match_weight'+
	     '+ "&distance_weight="+distance_weight'+
		 '+ "&age_diff_weight="+age_diff_weight'+
	     '+ "&gentation_weight="+gentation_weight'+
         '+ "&buddy_weight="+buddy_weight'+
   		 '+ "&" + gettzo()'+
	     '+ cacheBust();'+
   'var myajax = new Ajax.Request("/relevant",'+
				  '{method: "get",'+
				   'parameters: params,'+
				   'onSuccess: gotInterestingJournalData,'+
				   'onFailure: failed});'+
'}'+
''+
''+
'function loadJournal(userid) {'+
    'var myajax = newjreq("method=axml&tuid=" + userid + "&" + gettzo() + cacheBust());'+
'}'+
''+
''+
'function loadCommentCount2(count_pending, boardid, boardname, uservar, ownerid, userid, postid, cmtid) {'+
'	'+
	'PersistantBoard[boardid] = {};'+
'	'+
	'PersistantBoard[boardid].countPending 	= count_pending;'+
	'PersistantBoard[boardid].user_id		= userid;'+
	'PersistantBoard[boardid].post_id 		= postid;'+
	'PersistantBoard[boardid].cmt_id 		= cmtid;'+
'	'+
'	'+
    'var params = "getcount=1&count_pending=" + count_pending + "&bid=" + boardid + "&boardname=" +'+
		'escape(boardname) + "&uservar=" + escape(uservar) + "&ownerid=" +'+
		'escape(ownerid) + "&uid=" + userid + "&extra=" + postid + "&" + '+
		'gettzo() + cacheBust();'+
    'var myajax = new Ajax.Request("/board",'+
			          '{method: "get", '+
					   'parameters: params,'+
					   'onSuccess: gotCmtCount2, '+
					   'onFailure: failedCmtCount});'+
    'return myajax;'+
'}'+
''+
'function loadActionPosts(boardid, boardname, uservar, ownerid, userid, postid) {'+
    'var params = "get_action_posts=1&bid=" + boardid + "&boardname=" +'+
		'escape(boardname) + "&uservar=" + escape(uservar) + "&ownerid=" +'+
		'escape(ownerid) + "&uid=" + userid + "&extra=" + postid + "&" + '+
		'gettzo() + cacheBust();'+
    'var myajax = new Ajax.Request("/board",'+
			          '{method: "post", '+
					   'parameters: params,'+
					   'onSuccess: gotActionPosts, '+
					   'onFailure: failedActionPosts});'+
    'return myajax;'+
'}'+
''+
''+
'function showDeleteForm2(boardid) {'+
    'var mydiv = $("comments_modify_js_" + boardid);'+
    'var x = \'<input type=hidden name=url value="\' +'+
		'window.location.pathname + window.location.search + '+
		'\'">\' + \'<input type=hidden name=loghash value="\' +'+
		'encodeURI(getCookie("data")) +'+
		'\'">\' + \'<input type=hidden name=uid value=\' +'+
		'CURRENTUSERID + \'>\';'+
    'mydiv.innerHTML = x;'+
'}'+
''+
'function toggleModify(boardid) {'+
    'divdisp = $("comments_display_" + boardid);'+
    'divmod = $("comments_modify_" + boardid);'+
    'if (divdisp.style.display == "none") {'+
        'divdisp.style.display = "block";'+
        'divmod.style.display = "none";'+
    '}'+
    'else {'+
        'divdisp.style.display = "none";'+
        'divmod.style.display = "block";'+
        'showDeleteForm2(boardid);'+
    '}'+
'}';

var scriptstring2 ="function getElementsByAttribute(frst,attrN,attrV,multi){"+
	"attrV=attrV.replace(/\\|/g,'\\\\|').replace(/\\[/g,'\\\\[').replace(/\\(/g,'\\\\(').replace(/\\+/g,'\\\\+').replace(/\\./g,'\\\\.').replace(/\\*/g,'\\\\*').replace(/\\?/g,'\\\\?').replace(/\\//g,'\\\\/');"+
    	"var multi=typeof multi!='undefined'?"+
            "multi:"+
            "false,"+
        "cIterate=frst.getElementsByTagName('*'),"+
        "aResponse=[],"+
        "attr,"+
        "re=new RegExp(multi?'\\\\b'+attrV+'\\\\b':'^'+attrV+'$'),"+
        "i=0,"+
        "elm;"+
    "while((elm=cIterate.item(i++))){"+
        "attr=elm.getAttributeNode(attrN);"+
        "if(attr &&"+
            "attr.specified &&"+
            "re.test(attr.value)"+
        ")"+
"            aResponse.push(elm);"+
    "}"+
    "return aResponse;"+
"}";




var scriptstring3 = 'function getPost(button) {'+
'var LI = button;'+
'while (LI.getAttribute("class") != "journal_entry") {'+
	'LI = LI.parentNode;'+
'}'+
'return LI;'+
'}'+
'function getPostByBid(bid) {'+
	'return document.getElementById("journal_entry_"+bid);'+
'}'+
'var refreshcount = 0;'+
'function refreshFunc() {'+
	'CurrentGMT = new Date();'+
	'var posts = getElementsByAttribute(document.body,"class","journal_entry",false);'+
	'for (var i=0;i<posts.length;i++) {'+
		'var post = posts[i];'+
		'if (post.getAttribute("refresh") == "true") {'+
			'refreshPost(post);'+
			'if (refreshcount%10 == 0) {'+
			'refreshTimes(post);'+
			'}'+
		'}'+
	'}'+
	'refreshcount++;'+
'}'+
''+
'function refreshTimes(post) {'+
'var comments = getElementsByAttribute(post.parentNode,"class","post_time",false);'+
'for (var j=0;j<comments.length;j++) {'+
'var comment = comments[j];'+
'var commenttime = Number(comment.getAttribute("commenttime"));'+
'if (commenttime != 0) {'+
'comment.innerHTML = myMakeSmartDateString(new Date(1000*commenttime));'+
'}'+
'}'+
'}'+

'function refreshPost(post) {'+
	'var boardid = post.getAttribute("bid");'+
	'var boardname = post.getAttribute("boardname");'+
	'var ownerid = post.getAttribute("ownerid");'+
	'var userid = post.getAttribute("uid");'+
	'var uservar = post.getAttribute("uservar");'+
	'var extra = post.getAttribute("extra");'+
	'var URL = post.getAttribute("url");'+
	'loadCommentCount2(0,boardid,boardname,uservar,ownerid,userid,extra);'+
	'/*loadIDBoard2(boardid,boardname,uservar,ownerid,userid,extra,0,1000,URL);*/'+

'}'+
'function displayPost(bid) {'+
	'var post = getPostByBid(bid);'+
	'var boardid = post.getAttribute("bid");'+
	'var boardname = post.getAttribute("boardname");'+
	'var ownerid = post.getAttribute("ownerid");'+
	'var userid = post.getAttribute("uid");'+
	'var uservar = post.getAttribute("uservar");'+
	'var extra = post.getAttribute("extra");'+
	'var URL = post.getAttribute("url");'+
	'var count = Number(post.getAttribute("count"));'+
	'loadIDBoard2(boardid,boardname,uservar,ownerid,userid,extra,String(Math.max(0,count-20)),1000,URL);'+
'}'+
'function displayThisPost(button) {'+
	'var post = getPost(button);'+
	'var boardid = post.getAttribute("bid");'+
	'var boardname = post.getAttribute("boardname");'+
	'var ownerid = post.getAttribute("ownerid");'+
	'var userid = post.getAttribute("uid");'+
	'var uservar = post.getAttribute("uservar");'+
	'var extra = post.getAttribute("extra");'+
	'var URL = post.getAttribute("url");'+
	'var count = Number(post.getAttribute("count"));'+
	'loadIDBoard2(boardid,boardname,uservar,ownerid,userid,extra,Math.max(0,count-20),0,URL);'+
	'/*loadCommentCount2(0,boardid,boardname,uservar,ownerid,userid,extra);*/'+
'}'+
'function realDisplayThisPost(button) {'+
	'var post = getPost(button);'+
	'var boardid = post.getAttribute("bid");'+
	'var boardname = post.getAttribute("boardname");'+
	'var ownerid = post.getAttribute("ownerid");'+
	'var userid = post.getAttribute("uid");'+
	'var uservar = post.getAttribute("uservar");'+
	'var extra = post.getAttribute("extra");'+
	'var URL = post.getAttribute("url");'+
	'var count = Number(post.getAttribute("count"));'+
	'loadIDBoard(boardid,boardname,uservar,ownerid,userid,extra,0,20,URL);'+
	'loadCommentCount(0,boardid,boardname,uservar,ownerid,userid,extra);'+

'}'+

'function myMakeSmartDateString(d, format) {'+
'var their_now = new Date();'+
'var our_now = new Date();'+
'var their_time_error;'+
'if (CurrentGMT) {'+
'our_now = CurrentGMT;'+
'their_time_error = (their_now - CurrentGMT) / 1000;'+
'}'+
'else {'+
'our_now = their_now;'+
'their_time_error = 0;'+
'}'+
'var min_ago = Math.round((our_now - d) / 60000);'+
'    '+
'lastmidnight = new Date();'+
'lastmidnight = lastmidnight - 1000*60*60*lastmidnight.getHours() '+
'- 1000*60*lastmidnight.getMinutes() '+
'- 1000*lastmidnight.getSeconds() '+
'- lastmidnight.getMilliseconds();'+
'lastlastmidnight = new Date;'+
'lastlastmidnight = lastmidnight - 1000*60*60*24;'+
'    '+
'var res = "";'+
''+
'if (min_ago < 2) {'+
'res = "<em>just now</em>!";'+
'}'+
'else if ( min_ago < 60) {'+
'res = min_ago + "&nbsp;minutes ago";'+
'}'+
'else if (d > lastmidnight) {'+
'res = "Today - " + display12Or24(d);'+
'}'+
'else if (d > lastlastmidnight) {'+
'res = "Yesterday - " + display12Or24(d);'+
'}'+
'else if (our_now.getYear() != d.getYear()) {'+
'res = dateFormat(d, "mmm d, yyyy")+" - "+display12Or24(d);'+
'}'+
'else {'+
'res = dateFormat(d, "mmm d")+" - "+display12Or24(d);'+
'}'+
'return(res);'+
'}'+
'function display12Or24(somedate) {'+
    'if (true)'+
        'return dateFormat(somedate, "h:MMtt");'+
    'else '+
        'return dateFormat(somedate, "HH:MM");'+
'}';





var scriptdiv = document.createElement('script');
scriptdiv.setAttribute("type","text/javascript");
scriptdiv.innerHTML = scriptstring;
document.body.insertBefore(scriptdiv,document.body.childNodes[0]);


var scriptdiv2 = document.createElement('script');
scriptdiv2.setAttribute("type","text/javascript");
scriptdiv2.innerHTML = scriptstring2;
document.body.insertBefore(scriptdiv2,document.body.childNodes[0]);


var scriptdiv3 = document.createElement('script');
scriptdiv3.setAttribute("type","text/javascript");
scriptdiv3.innerHTML = scriptstring3;
document.body.insertBefore(scriptdiv3,document.body.childNodes[0]);









	var posts = getElementsByAttribute(document.body,"class","journal_entry",false);
	
	for (var i=0;i<posts.length;i++) {
		var post = posts[i];
		dealWithPost(post);	
	}
	
	
	


}




init();



function getElementsByAttribute(frst,attrN,attrV,multi){
	attrV=attrV.replace(/\|/g,'\\|').replace(/\[/g,'\\[').replace(/\(/g,'\\(').replace(/\+/g,'\\+').replace(/\./g,'\\.').replace(/\*/g,'\\*').replace(/\?/g,'\\?').replace(/\//g,'\\/');
    	var multi=typeof multi!='undefined'?
            multi:
            false,
        cIterate=frst.getElementsByTagName('*'),
        aResponse=[],
        attr,
        re=new RegExp(multi?'\\b'+attrV+'\\b':'^'+attrV+'$'),
        i=0,
        elm;
    while((elm=cIterate.item(i++))){
        attr=elm.getAttributeNode(attrN);
        if(attr &&
            attr.specified &&
            re.test(attr.value)
        )
            aResponse.push(elm);
    }
    return aResponse;
}

