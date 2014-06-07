// ==UserScript==
// @name           Qreply
// @namespace      127.0.0.1
// @author         aperture/botnet
// @contact        o0101000 (aim/yim)
// @include        http://boards.adultswim.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// @require        http://cherne.net/brian/resources/jquery.hoverIntent.js
// ==/UserScript==
$(document).ready( function() {	
var css = '<style type="text/css">'
	+'body{height:100px;}'
	+'*{'
	+'	background:transparent;'
	+'	color: #ccc;'
	+'-moz-border-radius:10px;}'
	+'textarea#lia-body.lia-form-body-input{'
	+'padding:3px;'
	+'border:1px solid #ccc;'
	+'width:175px;}'
	+'.lia-form-validation-help-text{'
	+'	display:none;}	'
	+'.lia-button-wrapper{'
	+'	padding-left:10px;'
	+'	padding-right:10px;}	'
	+'div.lia-quilt-column-alley.lia-quilt-column-alley-left{'
	+'	height:5px;}'
	+'.lia-button{border:1px solid #ccc;}'
	+'	</style>';

var close = '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>script type="text/javascript">'
	+'$(\'#submitContext_1\').click(function(){'
	+'		$(\'#form_0\', window.parent.document).hide(500);'
	+'});'
	+'</script>';

var box = document.createElement("iframe");	
var QrBtn = document.createElement('a');
var thread = $('.page-link');
$(QrBtn).html('+');
$(QrBtn).attr('id', 'q');
$(QrBtn).css({'font-size': '10px', 'cursor': 'pointer'});
$(QrBtn).toggle(function(e){
	var left = e.pageX+15;
	var top = e.pageY-85;
	$(box).attr('id', 'replyframe');
	$(box).attr('src', 'about:blank');
	$(box).css({'display':'none','border':'none','position':'relative', 'width':'220px', 'height': '100px', 'overflow':'hidden'});
	$(this).parents('.MessageSubjectCell').append(box);
	$(box).show(1000);
	var title = this.parentNode.getElementsByTagName('a')[0];
	var href = title.href;
	var replyhref;
$(box).load(function(){
	var doc = box.contentDocument;
	doc.body.style.display = 'none';
});
$.get(href, {}, function(page){
	//turn thread into document
    var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
    var doc = document.implementation.createDocument('', '', dt);
    var html = doc.createElement('html');
    html.innerHTML = page;
    doc.appendChild(html);
	//get quickreply
    var replywindow = box.contentDocument;
    replywindow.body.style.display = 'block';
    replywindow.body.innerHTML = css + $(doc).find('.lia-message-quick-reply').parent().html();
    $(replywindow).find('#submitContext_1').click(function(){
		$('#replyframe').slideToggle(500);
	});
    $(replywindow).find('#submitContext_0').click(function(){
		$('#replyframe').slideToggle(500);
	});
});
}, function(){
	$('#replyframe').slideToggle(500);
});
$(thread).parent().append(QrBtn);
});