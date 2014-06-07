// ==UserScript==
// @name           quick reply
// @namespace      127.0.0.1
// @include        http://boards.adultswim.com/t5/*
// ==/UserScript==


function adjustHeight(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var thread = document.getElementsByClassName("page-link");
for(x=0;x<thread.length;x++){

	var qrbtn = document.createElement('a');
	qrbtn.innerHTML='<font style="color:#ccc;text-decoration:none; font-weight:bold;">+</font>';
	qrbtn.style.cursor = 'pointer';
	qrbtn.addEventListener("click", function(){
		
		//var box = document.createElement('div');
		//box.innerHTML='<i>Loading...</i>';
		//this.parentNode.appendChild(box);
		
var box = document.createElement("iframe");
box.setAttribute('id', 'replyframe');
box.src = 'about:blank';
box.style.border = 'none';
box.style.position = 'fixed';
box.style.width = '400px';
box.style.height = '170px';
box.style.overflow = 'hidden';
box.style.top = ""+(screen.height- 170)/10+"px";
box.style.left = ""+(screen.width - 400)/2+"px";
document.body.appendChild(box);
box.addEventListener("load", function() {
			    var doc = box.contentDocument;
			    doc.body.style.background = 'url("http://imgur.com/Wjnxr.jpg")';
			    doc.body.innerHTML = '<font style="color:#ccc; font-style:italic;">Loading reply form...</font><a style="position:absolute; top:0px; right:1px; font-size: 10px; color:#ccc; font-weight:bold; text-decoration:none;" href="javascript: window.parent.document.getElementById(\'replyframe\').parentNode.removeChild(window.parent.document.getElementById(\'replyframe\'))">[ x ]</a>';
			    doc.body.style.display = 'none';
			  }, false);


		
		var title = this.parentNode.getElementsByTagName('a')[0];
		var href = title.href;
		var replyhref;
		
		GM_xmlhttpRequest({
		method: "GET",
		url: href,
		onload: func1 });
			
		function func1(page){
				var post = page.responseText;
				var pos1 = post.indexOf('href="');
				var pos2 = post.indexOf('"></link>');
				var rss = post.substring(pos1, pos2);
				var exId = rss.indexOf('message.id=');
	 			var msgNum = rss.substring(exId);
				var msgId = msgNum.replace("message.id=", "");
				var boardId = window.location.href.substring();
				
				var start = window.location.href;
				var remove1 = 'http://boards.adultswim.com/t5/'
				var remove2 = /\/bd-p.*/;
				var end1 = start.replace(remove2, "");
				var boardId = end1.replace(remove1, "");
				
				replyhref = window.location.href.replace(boardId + "/bd-p/", "forums/replypage/board-id/") + '/message-id/' + msgId;
				
				GM_xmlhttpRequest({
				method: "GET",
				url: replyhref,
				onload: func2 });
			}
			
		function func2(reply){
			replypage = reply.responseText;
			
			var replypage = reply.responseText;
				var cut1 = replypage.indexOf('<title>');
				var cut2 = replypage.indexOf('favicon.ico" /> ');
				var trim1 = replypage.substring(cut1, cut2);
			var replypage1 = replypage.replace(trim1 + 'favicon.ico" />', "");
				var cut01 = replypage1.indexOf('<form action');
				var cut02 = replypage1.indexOf('</form>');
				var trim2 = replypage1.substring(cut01, cut02);
			var replypage2 = replypage1.replace(trim2+"</form>", "");
				var cut001 = replypage2.indexOf('<div class="lia-quilt-column lia-quilt-column-06 lia-quilt-column-right">');
				var cut002 = replypage2.indexOf('Email me when someone replies</label>');
				var trim3 = replypage2.substring(cut001, cut002);
			var replypage3 = replypage2.replace(trim3 + 'Email me when someone replies</label>', "");
				var cut0001 = replypage3.indexOf('<p><a class="lia-link-navigation discussion-link"');
				var cut0002 = replypage3.indexOf('AdultSwim.com is part of the Turner Sports and Entertainment Digital Network.');
				var trim4 = replypage3.substring(cut0001, cut0002);
			var replypage4 = replypage3.replace(trim4 + 'AdultSwim.com is part of the Turner Sports and Entertainment Digital Network.', "");
				var cut00001 = replypage4.indexOf('<div class="lia-quilt-column lia-quilt-column-24 lia-quilt-column-single lia-quilt-column-common-header">');
				var cut00002 = replypage4.indexOf('<div class="lia-quilt-column lia-quilt-column-24 lia-quilt-column-single lia-quilt-column-search-bar lia-mark-empty">');
				var trim5 = replypage4.substring(cut00001, cut00002);
			var replypage5 = replypage4.replace(trim5+'<div class="lia-quilt-column lia-quilt-column-24 lia-quilt-column-single lia-quilt-column-search-bar lia-mark-empty">', "<div>");
			
			var replypage6 = replypage5.replace('<div id="asNav" class="clearfix">', "<div>");
			var replypage7 = replypage6.replace('<div id="navcss-000000">', '<div id="null">');
			var replypage8 = replypage7.replace('<div class="lia-quilt-row lia-quilt-row-header">', '<div>');
			var replypage9 = replypage8.replace('<div class="min-width">', '<div>');

			var space = /\n\s*/g;
			var replypage10 = replypage9.replace(space, '');
			var replypage11 = replypage10.replace('<fieldset>', '<fieldset style="border:none">');
			
				var rem1 = replypage11.indexOf('<div class="lia-form-submit lia-button-group">');
				var rem01 = replypage11.indexOf('Spell Check</a></span>');
				var strip = replypage11.substring(rem1, rem01);
			var replypage12 = replypage11.replace(strip + 'Spell Check</a></span>', "");
			
				var rem2 = replypage12.indexOf('<div id="tabgroup" class="lia-tabs-standard-wrapper">');
				var rem02 = replypage12.indexOf('<div class="message-editor-controls">');
				var strip2 = replypage12.substring(rem2, rem02);
			var replypage13 = replypage12.replace(strip2, '');
			var replypage14 = replypage13.replace('<label id="tinyMceEditor-label" for="tinyMceEditor" class="lia-form-label">Body</label>', '');
			var replypage15 = replypage14.replace('<legend>Post Message</legend>', '');
			var replypage16 = replypage15.replace('<label id="lia-subject-label" for="lia-subject" class="lia-form-label">Subject</label>', '');
			var replypage17 = replypage16.replace('<div class="lia-form-row lia-form-subject-entry">', '<div>');
			var replypage18 = replypage17.replace('<div class="lia-content">', '<div>');
			var cutimage1 = replypage18.indexOf('<div class="lia-feedback-loading">');
			var cutimage2 = replypage18.indexOf('feedback_loading.gif"/>');
			var removeimage = replypage18.substring(cutimage1, cutimage2);
			var replypage19 = replypage18.replace(removeimage + 'feedback_loading.gif"/>', '');
			var replypage20 = replypage19.replace('<input class="lia-form-subject-input lia-form-type-text" maxlength="50"', '<input class="lia-form-subject-input lia-form-type-text" maxlength="50" style="background:black;color:#ccc;width:300px;"');
			
			var replypage21 = replypage20.replace('<textarea', '<textarea style="background:black;color:#ccc;width:300px; height:100px"');
			
			
			
			adjustHeight('#lia-body .lia-content .message-body-editor textarea{height: 100px !important}');
			//box.innerHTML = replypage18;
			
			
			
			var closebutton = '<a style="position:absolute; top:0px; right:1px; font-size: 10px; color:#ccc; font-weight:bold; text-decoration:none;" href="javascript: window.parent.document.getElementById(\'replyframe\').parentNode.removeChild(window.parent.document.getElementById(\'replyframe\'))">[ x ]</a>';
			
			//var replybox = document.getElementById('replyframe');
            //replybox = (replybox.contentWindow) ? replybox.contentWindow : (replybox.contentDocument.document) ? replybox.contentDocument.document : replybox.contentDocument;
            //replybox.document.open();
            //replybox.document.write(replypage);
            //replybox.document.close();
            
            var replywindow = box.contentDocument;
            replywindow.body.style.display = 'block';
            replywindow.body.innerHTML = replypage21 + closebutton;
            var postbtn = replywindow.getElementById('submitContext_1');
			
			postbtn.addEventListener('click', function(){
				replywindow.getElementById('tinyMceEditor').focus();
				replywindow.getElementById('tinyMceEditor').select();
				var input = replywindow.getElementById("tinyMceEditor");
				var addlinebreaks = input.value.substring(input.selectionStart, input.selectionEnd).replace(new RegExp( "\\n", "g" ), '<br>');
				input.value = addlinebreaks;

},false);

            
		}

		
	},false);	
	thread[x].parentNode.parentNode.appendChild(qrbtn);
}

	
