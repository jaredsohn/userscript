// ==UserScript==
// @name           better360 v2
// @namespace      http://userscripts.org/scripts/show/24984
// @include        http://*360.yahoo*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version		   2.7
// ==/UserScript==

const currentVersion = '2.7';

var date = new Date();
var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
lastCheck = GM_getValue('lastCheck');

if (!lastCheck || lastCheck != today) {
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://360.huhiho.com/version.txt',
		onload: function(results) {
			version = results.responseText;
			if (version.length && /^\S+$/.test(version) && version != currentVersion) {
				if (confirm('[ Greasemonkey ] Better360 v2 đã có phiên bản mới. Bạn có muốn cập nhật không ?')) {
					GM_openInTab('http://360.huhiho.com');
				}
			}
		},
	});
}
GM_setValue('lastCheck',today);


var currentLocation = window.location;
var currentURL = currentLocation.href;
var WHERE = null;

// view comment
var nextURL;
var times = 0;
var stop = false;
var enable = true;

// is viewing 360 blog
if (urlMatch = /^http\:\/\/(?:[^\/]+\.)?360\.yahoo\.com\/?([\w\W]+)?$/.exec(currentURL)) {
	var queryMatch = urlMatch[1];

	if (!queryMatch || queryMatch[0] == '?' || queryMatch[0] == ';') {
		WHERE = 'home';
	}
	else if (/^guestbook\-[a-zA-Z0-9\-\_\.]+/.test(queryMatch)) {
		WHERE = 'all_comments';
	}
	else if (/^blog\/recent\_comments\.html/.test(queryMatch)) {
		WHERE = 'recent_comments';
	}
	else if (/^friends\/content\.html/.test(queryMatch)) {
		WHERE = 'all_updates';
	}
	
	else if (/^mailbox\//.test(queryMatch)) {
		WHERE = 'mailbox';
	}
	
	else if (/^blog\-[a-zA-Z0-9\-\_\.]+/.test(queryMatch)) {
		if (queryMatch.indexOf('&p=') != -1 || queryMatch.indexOf('?p=') != -1) {
			WHERE = 'post';
		}
		else {
			WHERE = 'blog';
		}
	}
	else if (/^(my\_)?profile\-[a-zA-Z0-9\-\_\.]+/.test(queryMatch)) {
		WHERE = 'profile';	
	}
	else if (/^friends\-[a-zA-Z0-9\-\_\.]+/.test(queryMatch)) {
		WHERE = 'friends';	
	}
	else if (/^blog\/compose/.test(queryMatch)) {
		WHERE = 'compose';
	}
	else if (/^edit\/blast\.html/.test(queryMatch)) {
		WHERE = 'blast';
	}
	else if (/^msgr\/V1\/blast\_compose\.html/.test(queryMatch)) {
		WHERE = 'blast';
	}
}

if (!WHERE) {
	return false;
}


// BEGIN Functions
function replaceBlastChars(blast) {
	return blast.replace(/'/g,"\u02C8").replace(/"/g,"\u00A8").replace(/>/g,"\u02C3").replace(/</g,"\u02C2");
}

function replaceCmtChars(cmt) {
	return cmt.replace(/>/g,"\u02C3").replace(/</g,"\u02C2");
}

function showStatusBox(text) {
	var statusBox = $('#b360_statusBox');
	if (!statusBox.length) {
		$('<div id="b360_statusBox"></div>')
			.css({
				cursor			:	'default',
				border			:	'1px solid #DDDDDD',
				padding			:	'2px',
				fontFamily		:	'Verdana',
				fontSize		:	'9px',
				fontWeight		:	'bold',
				textAlign		:	'right',
				position		:	'fixed',
				right			:	'5px',
				bottom			:	'5px',
				zIndex			:	'100',
				color			:	'black',
				backgroundColor	:	'#FFFFFF',
				opacity			:	'0.8',
				display			:	'none'
			})
			.appendTo($('body'));
		var statusBox = $('#b360_statusBox');
	}
	
	statusBox.text(text).show();
}

function watchScroll() {
	if (!$('#doc-2').length) {
		stop = true;
		return false;
	}
	
	if (stop) {
		$('b360_statusBox').hide();
		return;
	}
	
	if (enable) {
		var remain = document.body.scrollHeight - document.body.scrollTop - (window.innerHeight ? window.innerHeight : document.body.clientHeight);
		if (remain <= 100) {
			showStatusBox('Loading ...');
			fetchCmt();
			enable = false;
		}
		else {
			var self = arguments.callee;
			setTimeout(self,1000);
		}
		
	}
};

function getURL(sel) {
	return $(sel).attr('href');
}


function fetchCmt() {
	enable = false;
	
	if (stop) {
		$('#b360_statusBox').hide();
		return;
	}
	
	if (times == 0) {
		nextURL = getURL('#num_next');

		if (!nextURL) {
			stop = true;
			$('#b360_statusBox').hide();
			return;
		}
	}
	
	$.get(nextURL, function(content) {

		++times;
		
		var m = content.match(/href="([^"]+)" id="num\_next"/);
		if (!m) {
			stop = true;
		}
		else {
			nextURL = m[1];
		}
		
		var start = content.indexOf('<span class="pagination top">');
		var endTp = content.indexOf('<span class="pagination bottom">',start);
		if (WHERE == 'mailbox') {
			var end = content.indexOf('</span>\n\n</span>',endTp);
		}
		else {
			var end = content.indexOf('</span>\n</span>',endTp);
		}
		var newCmt = content.substr(start,end-start+15);
		
		var doc = (times == 1) ? $('#doc-2') : $('#cmt-'+(times-1));
		
		
		$('<div id="cmt-'+ times  +'"></div>').html(newCmt).appendTo(doc);
		enable = true;
		
		if (WHERE == 'all_comments') {
			addCmtCheckBox();
		}
		
		$('#b360_statusBox').hide();
		if (!stop) {
			setTimeout(watchScroll,1000);
		}
		
	});
}

function fixCompose() {
	if (!$('#rteWrapper')) {
		setTimeout(fixCompose,1000);
		return;
	}
	
	// fix smilies
	$('#rteWrapper table.smileys td').filter('[class*="wide"]').removeClass('wide').end().find('a').css({display:'block',width:'90%'}).end();
	
	$('#smiley').mouseup(function() {
		$('li.emoticon div.sub-list').css('height', '');
	});
	
	// inc/dec textarea height
	$('<div><b id="b360_inc">[+]</b> <b id="b360_dec">[-]</b></div>').css({cursor:'pointer', fontFamily:'Courier New', fontSize:'14px', fontWeight:'bold', textAlign:'right'}).insertBefore('div.footnote');
	// increase height
	$('#b360_inc').click(function() {
		var height = $('#rteEdit').css('height');
		var newHeight = parseInt(height.substr(0,height.length-2))+100+"px";
		$('#rteEdit,#rteCnt').css('height',newHeight);
	});
	// decrease height
	$('#b360_dec').click(function() {
		var height = $('#rteEdit').css('height');
		var newHeight = parseInt(height.substr(0,height.length-2))-100+"px";
		$('#rteEdit,#rteCnt').css('height',newHeight);
	});
	
	var imgUnderline = 'http://sg.yimg.com/i/vn/blog/i/global/tb_buttons_1.gif';
	
	
	var imgEmoticon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaUlEQVQ4y6WTO2hUURRF133z8iaJM5pEhVgYiYhgRAx+YqPEJiCKhaI22mhpGUgVbWwDgqWVNiIYUSyUgBBRCyEiKUQQf8MYMGpGJ5+XeZ977zkWQowfLHSXh8Nic87eRlX5H4W/DtwDU1JlUIUDIvSpggoTIoypcLF8WOPl+2a5A/fA9KtwxXQNdZu2PjTqAPVoUsPXJ8lej1REON1+RB/+BnDj5oi29d8KOk+iravwjZdI9gV1KZhmguZNGBuQvR8l+/Tw6NoTensJYMdNhyrVwrbrJQnm8WkF7ALiMtSn3yGimGIXheI25p6ciUXYsO6kfg0AVBgMNgyXNALJKuAWGb9TA8nB5zy6D2Jj3PxzfPaW1i3DJfEMAgQAIhwy7XuQtIK6BBXL/oMtqFjUW/b1x6hkqI1xs88I2zYjnkNLXxChh+JKJJnlU/UrLS3QFDlCctTl2MySLnqSRVjdUQMyvKd7CaBCoi6N8I6ZqTkaCzl56rFWsFWhFAbgA+JE2XvKgioiFH448FSwSS9E9OxuR12GuoTPlZjZd0XWGINNDFP1BBO0Ij7EZrxZfoO7tjaJibpQAfU56ixRsydrpGiS4xYSJGwQrtxOUqtic+7+AHguNV5ciHFlgmg9qEElo7zK0bRlnrczdarzc6w/3IkWtzP9+EJsMy79FKSZG+ZYuHZgtLnrKBQWcPWn+OQD6lJMWKZQ7sWzkfrLe9RfjR3fMaw3f4vy9DUzIJ7LK3qGuqPVWwmaAhCHyzyL06/4+GSk4ixnd57TsT92AWDqqimJZ0iEA97T53JwlglnGXOWkV3n/1Kmf9E3Kx1+4tmWzMkAAAAASUVORK5CYII=';
	var imgInsertImage	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACH0lEQVQ4y6WTzUuUURTGf+e+7/i+Y5pZjaAYBOIiyFpIMZk7ceEfEC1y0QdRmBuJQMJVpAh9bEoXEbiIFmFEKASFFYKIy8qMFi0kYUgjbXIc5+u9p8WMU+oUQQ/3Ls7luQ/nOR+iqvwPXIDOvtFbQU5OLScDP5EuwbKbw7AHO8OMPLlxsscFCKx0Xr/QHKmJRETERQEt/hNUQXUjVoJchrPXnp8G8gLLicCL7I1I1+0H1O3bhedYAvXAVGGE/DWCY4TPH2fp77lINhApWkimwRiXxob9HIy24hgH1QDEBRGMCCIGYwwhx2Dtlhps2PQ8Hz9ckc/3L9CiyS0C2UyKbGodRFC1WA2w1iCAquJIQC6TRNVuz0AVvsZjfFuKk7U5rAb8SC+SCeqRAqfGW2F9LQ5qSgt8WSwntJD69aARVFNF8gphFhZ0+xzYAt84ZRjHK+k7SEyQS7yiuvo7V+8/xJQ1eHBicwZ/Qjr+jD2V0zQ3H6V+dyOv556y/n7Sj3bX3XQB1FoEWJqfKykQCj2m7UgHgQk4XNvOxIdRok0tzH8au+TmZy3fnKGBvmL0O67c6SckFXQcOAfA5bZ7jM8OA2O+C7AzbOI2l6qqLZd8CwuChcPqWpy52DRvY1P0to8w+OIMfr5WKRdgh2cenR94eSyZ1SZrS+3ScX/m3bTXcqiV8dlhysRl6s0kwJD86zpHu+sGgS6gElgFhmfuxnp/AiX/3TGIfBNwAAAAAElFTkSuQmCC';
	var imgInsertClip = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACu0lEQVQ4y22RTWicZRCAn3m/r7ubWAgKXdwoLHS3abvaVhChFBGhFG+KOYgUKXjwpB6sEKpSiwerFA8i6EGwQtCKCOIPIir+UkpaY9qmJlrYGqQmkohmN5vd/fZ7d97xsMnWqAMDc5jnGWZGzIxDT5/K7BoZvhLHkjs/O18eP36wzv/EPQ88O7Tj1q3VRqOVzE5PliY+O5mKmQFskHw//Wv51IlDGyT7R48MjdxSqjZbrWT2wrnS5JdvpwB9AcBDT72VqWzdcgWz3Nmzs+UP3zhcB7j7vieGyju3VVvNdvLTpXOl89+8m64zGwQA9z/ySmb7SKGqoTvww8RUOU1bjFS2V5ur7fbPM5Pli9+9l/6zX8yMsbGx54Bn1mVmRj6fjwBUlRACi4uLamaYGapKs9l8fnx8/Fi8BhwtP/iC/PtoZqAGIRihrdH8iqetYMDyyYNHgWMOYHBwUPLXCU7+C3fVWKh7rtY93SBEAg7w3gv0asyMXAw3bhZidw1OUuVqLaWRBiIRItcDnAiqSl/gvcdrD7w+J4j04D9Wu1hgDRYcghPBGX1BDJCmKWkA1iZnxKgnCggihgOs9gnRyqckyTLtJMUVmtcEqopXCAYaAg0fGMw4vBrOQWfpfbYMfMXtd93BzTds4+uZD5gY+I29jw2/5AC63S4dNdKusZoaGnp7borATFhZeIfbduxBnbKncAAVz95d+wAedesrNDtGvWPUE2O1Ay1vqAkm8FfjdzbJZu7d+TgAT+5/nVJ+N0AuBshms9S+OMHc3BzHL1/mcLGI955KpcKPU1MsF/9kZuEMFxdOc+TAm7z4+cPkoixAEve/4D2FQoGX83luUkVVqdVqFItFXFhhYvoM+3bfyceXXiMjMacvfAvwqpgZo6OjtrS0RAihn2a2oY6KDeLhBIkMU8HPZ5n66Bf5G/BnjWljQCe9AAAAAElFTkSuQmCC';
	
	
	
	// add underline button
	
	$('<li></li>').addClass('highlight section')
		.append(
			$('<a id="b360_btnUnderline" title="Underline"><span>better360</span></a>').click(function() { underline(); }).css({backgroundImage:'url('+imgUnderline+')', backgroundRepeat:'no-repeat', backgroundPosition:'-86px 100%', cursor:'pointer', height:'25px', width:'25px'})
		)
		.insertAfter($('#italic').parent().removeClass('section'));
	
	// add image button
	$('<li></li>').addClass('highlight')
		.append(
			$('<a id="b360_btnInsertImage" title="Chèn ảnh"><span>better360</span></a>').click(function() { showInsertImage(); }).css({background:'url('+imgInsertImage+')', backgroundRepeat:'no-repeat', backgroundPosition:'50%', cursor:'pointer'})
		)
		.insertAfter($('#hilitecolor').parent());
	
	// emoticons button
	$('<li></li>').addClass('highlight')
		.append(
			$('<a id="b360_btnEmoticon" title="Chèn Emoticons"><span>better360</span></a>').click(function() { showEmoticonsFrame(); }).css({background:'url('+imgEmoticon+')', backgroundRepeat:'no-repeat', backgroundPosition:'50%', cursor:'pointer'})
		)
		.insertAfter($('#b360_btnInsertImage').parent());
	
	// add clip button
	$('<li></li>').addClass('highlight section')
		.append(
			$('<a id="b360_btnInsertClip" title="Chèn Clip ( Youtube )"><span>better360</span></a>').click(function() { showInsertClip(); }).css({background:'url('+imgInsertClip+')', backgroundRepeat:'no-repeat', backgroundPosition:'50%', cursor:'pointer'})
		)
		.insertAfter($('#b360_btnEmoticon').parent());
	
	
	// post, preview in new tab
	$('<input id="b360_newTab" type="checkbox" value="1" checked="checked" /><label for="b360_newTab" style="display:inline">Post/Preview entry ở Tab mới ( tránh bị mất entry )</label>').css('cursor','pointer').insertAfter('div.advanced');

	
	// resize image
	$('input.active[name="preview"],input.inactive[name="post"],input.inactive[name="edit"]').mouseup(function() { composePrepare(); });
	
	// fix ms word
	$('<input type="button" class="active" id="b360_fixMSWord" value="Sửa lỗi MS Word" />')
		.click(function() { fixMSWord(); })
		.insertBefore('input.active[name="preview"]');
	

	var rteEdit = $('#rteEdit')[0].contentWindow;
	
	var strHTML = rteEdit.document.body.innerHTML;

	strHTML = strHTML.replace(/<(\/?)(font|strong|em|span)><br\/?>/gi,"<$1$2>").replace(/<br\/?>\s*<br\/?>\s*<br\/?>\s*<br\/?>\s*<br\/?>\s*/, "<br /><br /><br /><br />");
	
	rteEdit.document.body.innerHTML = strHTML;
	
}


function composePrepare() {
	if ($('#b360_newTab').is(':checked')) {
		$('form[name="blog_compose"]').attr('target', '_blank');
	}
	else {
		$('form[name="blog_compose"]').removeAttr('target');
	}

	composeResizeImage();
}

function composeResizeImage() {
	var rteEdit = $('#rteEdit')[0].contentWindow;
	//var img_xpath = rteEdit.document.evaluate("//img[contains(@style,'width') and contains(@style,'height')]",rteEdit.document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var img_xpath = rteEdit.document.evaluate("//img",rteEdit.document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=0;i<img_xpath.snapshotLength;i++) {
		var img = img_xpath.snapshotItem(i);
		var w,h;
		
		if (img.style.width) {
			var w = parseInt(img.style.width.substr(0,img.style.width.length-2));
		}
		else if (img.width) {
			var w = img.width;
		}
		
		if (img.style.height) {
			var h = parseInt(img.style.height.substr(0,img.style.height.length-2));
		}
		
		else if (img.height) {
			var h = img.height;
		}
		
		
		if (w) {
			img.width = w;
		}
		if (h) {
			img.height = h;
		}
		
	}
	
}

function underline() {
	if ($('#rteHTMLSrc').is(':checked')) {
		return false;
	}
	
	var rteEdit = $('#rteEdit')[0].contentWindow;
	rteEdit.focus();
	rteEdit.document.execCommand('underline', false, null);
	rteEdit.focus();
}

function showInsertClip() {
	if ($('#rteHTMLSrc').is(':checked')) {
		return false;
	}
	
	var src = prompt('Nhập đường dẫn Youtube :','http://youtube.com/v/');
	if (src == 'http://' || src == '') {
		return false;
	}
	
	var clipID = src.match(/\/v\/([a-zA-Z0-9\_\-]+)/i)[1];
	
	var embed = "\r\n"+'<br /><embed type="application/x-shockwave-flash" allowscriptaccess="none" src="http://youtube.com/v/'+ clipID +'" width="425" height="350">'+"\r\n";
	
	var rteEdit = $('#rteEdit')[0].contentWindow;
	rteEdit.focus();
	rteEdit.document.execCommand('insertHTML', false, embed);
	rteEdit.focus();
	
}

function showInsertImage() {
	if ($('#rteHTMLSrc').is(':checked')) {
		return false;
	}
	
	var src = prompt('Nhập đường dẫn ảnh :','http://');
	
	if (src == 'http://' || src == '') {
		return false;
	}
	
	var rteEdit = $('#rteEdit')[0].contentWindow;
	rteEdit.focus();
	rteEdit.document.execCommand('InsertImage', false, src);
	rteEdit.focus();
}

function showEmoticonsFrame() {
	showIFrame('http://emo.huhiho.com');
}

function showIFrame(url) {
	if (!$('#b360_iframe').length) {
		$('<iframe id="b360_iframe"></iframe>').attr('src', url).css({width:'99%', height:'40%', background:'white', position:'fixed', bottom:'0px', zIndex:2512, padding:'0px', margin:'auto', display:'none'}).appendTo($('body'));
	}
	
	$('#b360_iframe').toggle();
}

function toggleBody(n, scroll) {
	$('dt.post-head:eq('+ n +') b')
		.add('dd.post-body:eq('+ n +') b')
		// image
		.add('dd.post-body:eq('+ n +') div.image-wrapper')
		// content
		.add('dd.post-body:eq('+ n +') div.content-wrapper')
		.toggle();
	
	if (scroll && $('dd.post-body:eq('+ n +') div.content-wrapper').is(':hidden')) {
		$('dt.post-head:eq('+ n +')')[0].scrollIntoView();
	}
	
}

function selectCmt(type) {
	if (WHERE == 'post') {
		var checkBoxs = $('#comments div.row input:checkbox');
	}
	else {
		var checkBoxs = $('div.doc-layout-2 div.thm-box div.body div.row input:checkbox');
	}
	
	switch (type) {
		case 'all':
			checkBoxs.attr('checked','checked');
			break;
		case 'none':
			checkBoxs.removeAttr('checked');
			break;
		case 'spam':
			if (WHERE == 'post') {
				var cmts = $('#comments div.row');
				var cmtContents = $('div.wrapper p.comment', cmts);
				var cmtPosters = $('div.user-card ul.vitals li.user-name a', cmts);
				
			}
			else {
				var cmts = $('div.doc-layout-2 div.thm-box div.body div.row');
				var cmtContents = $('div.wrapper p.comment', cmts);
				var cmtPosters = $('div.user-card ul.vitals li.user-name a', cmts);
			}
			
			for (var i=0;i<cmtContents.length-1;i++) {
				var currCmt = cmtContents.eq(i).html();
				var currPoster = cmtPosters.eq(i).html();
				
				for (var j=i+1;j<cmtContents.length;j++) {
					var nextCmt = cmtContents.eq(j).html();
					if (currCmt == nextCmt) {
						var nextPoster = cmtPosters.eq(j).html();
						if (currPoster == nextPoster) {
							checkBoxs.eq(j).attr('checked','checked');
						}
					}
				}
			}
			break;
	}
}

function removeCmt() {
	if (WHERE == 'post') {
		var checkBoxs = $('#comments div.row input:checked');
	}
	else {
		var checkBoxs = $('div.doc-layout-2 div.thm-box div.body div.row input:checked');
	}

	if (!checkBoxs.length) {
		alert('Chưa chọn comment nào');
		return false;
	}
	
	if (confirm('Bạn có muốn xóa những comment này ko ?')) {
		checkBoxs.each(function(i) {
			var currentCheckBox = checkBoxs.eq(i);
			var url = currentCheckBox.attr('value');
			
			//url = url.replace("blog.360.","360.");
			
			//$.get(url);
			
			GM_xmlhttpRequest({
				method: "GET",
				url: url,
			});
			
			if (WHERE == 'post') {
				currentCheckBox.parent().parent().remove();
			}
			else {
				currentCheckBox.parent().remove();
			}
		});
		alert('Đang xóa ...');
	}
}

function addCmtCheckBox() {
	if (!admin) return;
	
	$('div.doc-layout-2 div.thm-box div.body div[class*="row"]:not(:has(input))').each(function(i) {
		var divHTML = '';
		var deleteLink = $('div.wrapper p.datestamp a', this).attr('href');
		divHTML += '<input id="cmt-checkbox-'+(startCmt + i)+'" type="checkbox" value="'+deleteLink+'" name="b360_cmtChkBox" />';
		divHTML += '<br /></div>';
		
		$(divHTML).css({float:'right',width:'20px',fontSize:'10px', textAlign:'right'}).appendTo(this);
	});
}

function fixMSWord() {
	var rteEdit = $('#rteEdit')[0].contentWindow.document.body;
	
	rteEdit.innerHTML = rteEdit.innerHTML.replace(/<\!\-\-\[if [^\]]+\]>[\S\s]*?<\!\[endif\]\-\->/g,"").replace(/<style>\s+<!\-\-[\S\s]*?\-\->\s+<\/style>/g,"").replace(/<o\:p>[\S\s]*?<\/o\:p>/g,"");
	alert('Đã sửa xong');
}

// END Functions

// Main script

// fix avatar
$('#user-photos-full[width=0]').remove();

$('#ymgl-north-wrapper').remove();

switch (WHERE) {
	// Homepage
	case 'home':
		// replace special chars in blast
		$('input[name="save"]').mouseup(function() {
			$('#blst_ff').val(replaceBlastChars($('#blst_ff').val()));
		});
		break;
	// ---------------------
	case 'profile':
		// blast
		$('#submitbutton').live('mouseup', function(){
				$('#blst').val(replaceBlastChars($('#blst').val()));
			});
		// comment
		$('input[name="post"]').mouseup(function() {
			$('#comment_ff').val(replaceCmtChars($('#comment_ff').val()));
		});
		
		break;
	// ---------------------
	case 'all_comments':
		var admin = false;
		if ($('div.doc-layout-2 div.thm-box div.body div[class*="row"] div.wrapper:has(a):eq(0)').length) {
			admin = true;
			
			addCmtCheckBox();
	
			$('<div><input id="b360_removeCmtSpam" type="button" value="Chọn spam" class="inactive" /> <input id="b360_removeCmtAll" type="button" value="Chọn hết" class="inactive" /> <input id="b360_removeCmtNone" type="button" value="Bỏ chọn hết" class="inactive" /> <input id="b360_removeCmtDelete" type="button" value="Xóa" class="active" /></div>')
					.css('text-align','right')
					.insertBefore('div.doc-layout-2 div.thm-box div.body');
			
			$('#b360_removeCmtSpam').click(function() { selectCmt('spam'); });
			$('#b360_removeCmtAll').click(function() { selectCmt('all'); });
			$('#b360_removeCmtNone').click(function() { selectCmt('none'); });
			
			$('#b360_removeCmtDelete').click(function() { removeCmt(); });
		}
		
	case 'recent_comments':
	case 'all_updates':
	case 'mailbox':
		// scroll comment
		watchScroll();
		break;
	// ---------------------
	case 'post':
		// add comment number
		var startCmt = document.location.search.match(/&l=([0-9]+)&/);
		if (startCmt) {
			var startCmt = parseInt(startCmt[1]);
		}
		else {
			var startCmt = 1;
		}
		
		var admin = false;
		var postNum = document.location.search.match(/p=([0-9]+)/);
		if (postNum && $('#edit-tag-'+postNum[1]+'.edit-tags"').length) {
			admin = true;
		}
		
		$('#comments div[class*="row"]').each(function(i) {
			var divHTML = '<div>';
			if (admin) {
				var deleteLink = $('div.wrapper p.datestamp a', this).attr('href');
				divHTML += '<input id="cmt-checkbox-'+(startCmt + i)+'" type="checkbox" value="'+deleteLink+'" name="b360_cmtChkBox" />';
				divHTML += '<br />';
			}
			
			divHTML += '#'+ (startCmt + i);
			divHTML += '</div>';
			$(divHTML).css({float:'right',width:'50px',fontSize:'10px', marginBottom:'10px', textAlign:'right'}).appendTo(this);
		});
		
		if (admin) {
			$('<div><input id="b360_removeCmtSpam" type="button" value="Chọn spam" class="inactive" /> <input id="b360_removeCmtAll" type="button" value="Chọn hết" class="inactive" /> <input id="b360_removeCmtNone" type="button" value="Bỏ chọn hết" class="inactive" /> <input id="b360_removeCmtDelete" type="button" value="Xóa" class="active" /></div>')
				.css('text-align','right')
				.appendTo('#comments');
			
			$('#b360_removeCmtSpam').click(function() { selectCmt('spam'); });
			$('#b360_removeCmtAll').click(function() { selectCmt('all'); });
			$('#b360_removeCmtNone').click(function() { selectCmt('none'); });
			
			$('#b360_removeCmtDelete').click(function() { removeCmt(); });
		}
		
		
	case 'blog':
	
		// remove dead links
		$('#ymgl-sticky-post a[href$="p="]').removeAttr('href').css('text-decoration','underline');
		
		// add link to entry header
		var postLinks = new Array();
		$('dd.post-body div.foot a[href*="p="]:even').each(function(i) {
			postLinks[i] = $(this).attr('href');
		});
		
		// [+] [-]
		if (!document.location.search.match(/list=1/i)) {
			$('dl.body dt.post-head').each(function(i) {
				$(this).wrapInner('<a href="'+ postLinks[i] +'"></a>');
				$(this).prepend('<b name="switch-'+ i +'">[-]</b><b name="switch-'+ i +'" style="display:none">[+]</b> ');
				$('dd.post-body:eq('+ i +')').append('<b name="switch-'+ i +'">[-]</b>');
			});
			
			$('dl.body dt.post-head b').add('dd.post-body div.foot + b').css('cursor','pointer').click(function() {
					var n = $(this).attr('name').replace('switch-','');
					toggleBody(n, $(this).parent().hasClass('post-body'));
				});
		}
		
		break;
	// ---------------------
	case 'compose':
		$(function() {
			setTimeout(fixCompose,1000);
		});
		

		break;
	// ---------------------
}
