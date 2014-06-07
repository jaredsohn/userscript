// ==UserScript==
// @name           lm.gm.wishmaster
// @include        http://lurkmore.ru/*
// @author         Anotubus, Tachikoma
// @description    Interface enhancement script pack for lurkmore.ru
// @version        1.8.5
// @require        http://userscripts.org/scripts/source/79691.user.js
// ==/UserScript==

/* Wiki variables for FF*/
if (navigator.appName == "Netscape" && navigator.appCodeName == "Mozilla") {
var skin = unsafeWindow.skin;
var stylepath = unsafeWindow.stylepath;
var wgArticlePath = unsafeWindow.wgArticlePath;
var wgScriptPath = unsafeWindow.wgScriptPath;
var wgScript = unsafeWindow.wgScript;
var wgVariantArticlePath = unsafeWindow.wgVariantArticlePath;
var wgActionPaths = unsafeWindow.wgActionPaths;
var wgServer = unsafeWindow.wgServer;
var wgCanonicalNamespace = unsafeWindow.wgCanonicalNamespace;
var wgCanonicalSpecialPageName = unsafeWindow.wgCanonicalSpecialPageName;
var wgNamespaceNumber = unsafeWindow.wgNamespaceNumber;
var wgPageName = unsafeWindow.wgPageName;
var wgTitle = unsafeWindow.wgTitle;
var wgAction = unsafeWindow.wgAction;
var wgArticleId = unsafeWindow.wgArticleId;
var wgIsArticle = unsafeWindow.wgIsArticle;
var wgUserName = unsafeWindow.wgUserName;
var wgUserGroups = unsafeWindow.wgUserGroups;
var wgUserLanguage = unsafeWindow.wgUserLanguage;
var wgContentLanguage = unsafeWindow.wgContentLanguage;
var wgBreakFrames = unsafeWindow.wgBreakFrames;
var wgCurRevisionId = unsafeWindow.wgCurRevisionId;
var wgVersion = unsafeWindow.wgVersion;
var wgEnableAPI = unsafeWindow.wgEnableAPI;
var wgEnableWriteAPI = unsafeWindow.wgEnableWriteAPI;
var wgSeparatorTransformTable = unsafeWindow.wgSeparatorTransformTable;
var wgDigitTransformTable = unsafeWindow.wgDigitTransformTable;
var wgRestrictionEdit = unsafeWindow.wgRestrictionEdit;
var wgRestrictionMove = unsafeWindow.wgRestrictionMove;
var wgAjaxWatch = unsafeWindow.wgAjaxWatch;
var getElementsByClassName = unsafeWindow.getElementsByClassName;
var addClickHandler = unsafeWindow.addClickHandler;
var selectionStart  = unsafeWindow.selectionStart;
var selectionEnd = unsafeWindow.selectionEnd;
//Common.js
var Queue = unsafeWindow.Queue;
/* End ofWiki variables */
};

/* Gliphs */
var gliph= {
    close:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPFJREFUeNpiYKAB4AHiOiA+BsR/oPgYVIwHXTETGt8LiC9BFRYDMTsUF0PFLkHVYAWJQPwLiOvxuA4k9xuqFgUIAfFnIK4C4ldAbINFM0jsLVTNZ6geOGiBYhDwgCq0waLZA4t6MDgPxAZIfGRD0DUzQNWeRzbgJxCzoTnZFaoRXTMI8APxB+RY+A7EnGiKviOxv6DJ/QViZnxeQHa2K5YwwfACKEAacQQYsnfsofxG9EAUhUZNHg4/IxtSCFUriishNeFJSHVQNUm4FAQD8T0g7gJiMyRxM6gYSC6MmMwE8uNJIP4PxSehYjxUz7oAAQYAhTc+an80g7QAAAAASUVORK5CYII=',
    bookmark:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASBJREFUeNpiYKAB4AHiOiA+BsR/oPgYVIwHXTETGt8eiC9BFRYDMTsUF0PFLkHVYAWBQHwAiMPxuC4cqiYQXUIIiD8DsSuULw3Ei4D4HhTPB2JRqJwrVK0QsgEtUAwC6kD8FoirgVgRihuB+DmUja4eDM4DsQGUvQ6I87E4vxSIV0PZBlA9cPATiNmg7G9AzInFAH4g/oDOhsXCdyRNzED8F4sBf6FyKGyYAfeR/LcPhxcSoHIgoALEd0AMFqjAVmjUXADiLCT/LYbSydAwsEKK8q3IpotCo8YJyleEBuZzKF4NjVoGqJrPSNEKByFAvAtbIkECfkC8HaoWK3CFJpwuIDZDEjeDioHkPIjJTKCEcxKI/0PxSagYD9WzLkCAAQDW+z06uwj3tgAAAABJRU5ErkJggg==',
    up: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAF9JREFUeNpiYKAxsIdissFeKMYJmAjYzgxlO5FrezgQhxByBS7bD6AZ5kSO7TBAkivQbSfZFei2k+QKXLYT7QpcthPlCkK2E3QFIdvxuoJY23G6AiTwn0S8lyrZFSDAAFK0JJzfPMv2AAAAAElFTkSuQmCC',
    down: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGJJREFUeNpiYKASOADE/0nEB5ANcALivSRYuBeqB0MwhAjNIei2k+oKrLYT6wqcthPrCry2E3IFQdsJuYIo23G5gmjbcbmCJNvRXUGy7eiuIMt2ZFfgtZ2FgAGtDLQGAAEGAG9TJiiO9G0/AAAAAElFTkSuQmCC',
    brackett: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPxJREFUeNpiYKAB4AHiOiiNDMqxiGEAeyC+B8QfgJgfTe4DVM4el+ZAID4AxOF4DAiHqglE1ywExJ+B2BWIW4D4CRCzoqm5DsStUDWfoXoYmKCSRUA8EYj/AnEIEOsB8W80A6yAOADKngjVAwfngdgAiFdDDcDnzXVQteeRJX4CMRsOv6PH0Geomg/IXvgOxJwkRDXIq8zIBtwHYkUg3gfETng0ggJwNxCrAPEdkAAjVKIFauoRIJ4AxLZA/A5NsyBUvgCIbaAuqIFJikL95kRENDpB1YqiOw8U+rugIY0rIfkB8XZ8MeVKRFL2ICYzNWLJOJXEZCaSAUCAAQDRXTfCkbh6vgAAAABJRU5ErkJggg==',
    Ok: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASpJREFUeNqkk0FHRFEUx+cWJYYYZlWbPkDMplYRwxARjxjapQ8wi6FlRKvZtutbtBgRqdUwbWJo27btMKuI1+/wn+vMnftEHX7ede7/nHvPO+eGGlaWZe3PZsEerA5XMIJvMZKvnupXfLIQwiGfiZL0YV305ZtIs3wDrIAX6KanOE1XmiL6tNGAGXQqArfgQuuOtA2f4MaoCF6DIRw7X9TPHW/QygQG2IBnWHV7LYvxCb4swAn24VLrPbhNkm/C1CeYmtMJevAJ23AHB5lWz34r4Qle4T3zX2IJ8zkYqo3ezmEH7jPzVygm3qCp1rSTk85gN/G1pW3GErRxCo9+SDJXP4EH0y4MkhPYkHzAwDqRdGWgvaOFmIrHdA1jq1CM5Vt6TOFfTxn7EWAAkk5iDyzXSvwAAAAASUVORK5CYII=',
    deltag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANxJREFUeNpiZMAB/v//z0AMYGKgEKAb4EVIAyMjoxEuuUQg/gPENjAvoGOoHIiRiCQGBkJA/AKIk4D4FUghDs1vgTgCSgshG9ACxI1QtgdUgQ0WzR5Q/gSQHmQDzgOxOpJ34Iaga4ZqsgTpQTbgJ5YodIVqRNEMlWMD4g8gNiwWvmMJVGSxL2hyIAOYkQXQvQB3NpJLbPB5ATkQsfkZZog9rkAUhUZjBDY/oxsCpUXRkzsoIf3FphnNkF+g9IKekGAgGJRacRkA1RCGzGfEleRx5ND/xCokOjcCBBgAeybX9xepCjQAAAAASUVORK5CYII=',
    edittag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO5JREFUeNq007EKglAUBmArKAKDEHyPJqcgEIQgCITA1wjdg6agraWncI0glybBFsEHCHqGhiiK+oW/uFwuplAHvsHfoxyPqml/KB1mEMOdYma63FyXjgeQsTGAFgXMMvYoy4U9eAXTeexx5RMGnMGR8jUspMxhryE+gg8riErsKGKvL95gBGGFRYe8RqsxuEKHixJH7sMNDkI2hSacoPue4ALtChM8oCEGKfQUjaolauxNxR1sVK+moFxe8ymTr8YuMYHNXlO+6wR2XyYZw5a9yso/kiMswRJyi1l+bljmZ5pDAk9KmOk//3VfAgwAuaYuwPK2Ct4AAAAASUVORK5CYII='
};

var my = {
	d:document,
	cr:function(s){return my.d.createElement(s)},
	crT:function(s){return my.d.createTextNode(s)},
	appBintoA:function(e,c){return e.appendChild(c)},
	appF:function(e,c){return e.insertBefore(c,e.firstChild)},
	insBbeforeA:function(e,c){return e.parentNode.insertBefore(c,e)},
	insBafterA:function(e,c){return e.parentNode.insertBefore(c,e.nextSibling)},
	replAwithB:function(e,c){return e.parentNode.replaceChild(c,e)},
	q:function(s){return my.d.querySelector(s)},
	qa:function(s){return my.d.querySelectorAll(s)},
	q1:function(e,s){return e.querySelector(s)},
	qa1:function(e,s){return e.querySelectorAll(s)},
	qp:function(s){return my.q(s).parentNode},
	k:function(s){var l,t;if(l=(t=my.qa(s)).length)for(var i=0;i<l;i++)t[i].parentNode.removeChild(t[i])},
	k1:function(e){e.parentNode.removeChild(e)},
	ka:function(a){for(var i=0;i<a.length;i++) a[i].parentNode.removeChild(t[i])}
};

function postEditFormPreview(form, submit, action, callback, callbackerror, callbackcomplete) {
	var req = '', boundary = '--------ololololo'
	function addData(n, v) {
		if (n == 'wpTextbox1' && submit == 'wpPreview') { if  (v.match(/<references \/>/)) {v = v + '<br clear=both/>\n----'} else v = v + '<br clear=both/>\n----\n<references />' };
		req += '--'+boundary+'\nContent-Disposition: form-data; name="'+n+'"\n\n'+(v || '')+'\n';
		}
	
	$(form[0].elements).each(function(){
		switch(this.type){
			case 'submit': break			
			case 'checkbox': if (!this.checked) break
			default: addData(this.name,this.value)
		}
	});
	addData(submit, submit)
	req += '--'+boundary
	$('body').css('cursor','wait')
	$.ajax({
		type: 'POST',
		url: action,
		contentType: 'multipart/form-data; boundary='+boundary,
		data: req,
		processData: false,
		success: function(s) { $('body').css('cursor','default'); callback(s) },
		error: function() { $('body').css('cursor','default'); callbackerror() },
		complete: function() { $('body').css('cursor','default'); callbackcomplete() }
	})
};

function _ev(e,x){
	e.preventDefault();
	if(x)e.stopPropagation();
}

function appendCSS(text) {
    var s = document.createElement('style');
    s.type = 'text/css';
    s.rel = 'stylesheet';
    if (s.styleSheet) s.styleSheet.cssText = text //IE
    else s.appendChild(document.createTextNode(text + '')) //Safari sometimes borks on null
    document.getElementsByTagName('head')[0].appendChild(s);
    return s;
};

function editpage () {
	/* CSS */
	appendCSS(".PreviewBoxOuter  { border-bottom-color:#D0D0D0; border-bottom-style:solid; border-bottom-width:1px; border-left-color-ltr-source:physical; border-left-color-rtl-source:physical; border-left-color-value:#808080; border-left-style-ltr-source:physical; border-left-style-rtl-source:physical; border-left-style-value:solid; border-left-width-ltr-source:physical; border-left-width-rtl-source:physical; border-left-width-value:1px; border-right-color-ltr-source:physical; border-right-color-rtl-source:physical; border-right-color-value:#D0D0D0; border-right-style-ltr-source:physical; border-right-style-rtl-source:physical; border-right-style-value:solid; border-right-width-ltr-source:physical; border-right-width-rtl-source:physical; border-right-width-value:1px; border-top-color:#808080; border-top-style:solid; border-top-width:1px; clear:both; margin-bottom:0; margin-left:0; margin-right:0; margin-top:0; 	}\
    .mw-editTools {min-height:9em;}");
	$('<link type="text/css" href="/skins/common/diff.css?207" rel="stylesheet">').appendTo('head');

	document.getElementById("wpPreview").disabled=false;
	document.getElementById("wpDiff").disabled=false;
	
	/* NSFW & Collapsible tables postprocessing stage 0*/
	$('.NavToggle,.collapseButton').live('click', function(e) {
		var collapsibleTR;
		if ($(this).attr('class') == 'NavToggle') collapsibleTR = $('.NavContent:first', $(this).parent().parent());
		if ($(this).attr('class') == 'collapseButton') collapsibleTR = $('tr:gt(0)', $(this).parent().parent().parent().parent());
		if ($(collapsibleTR).css('display') != 'none') { $(collapsibleTR).css('display', 'none')} else {$(collapsibleTR).css('display', '')};
	} );
	function toggleChildVisibility(parent, visibility) {
		if (parent.hasChildNodes()) {
			var children = parent.childNodes;
				for (var i = 0; i < children.length; i++) {
				if (children[i].style) { children[i].style.visibility = visibility; };
			};
		};
	};
	
	/* Linkify sighting diff */
	diffpage();
	
	/* Preview Controls */
	$('<div id="previewctrls" style="position: fixed; border: 1px solid; font-size: 15px; width: 16px; -moz-border-radius: 8px 8px 8px 8px; top: 3.5em; right: 1.7em; background-color: white; cursor: pointer; z-index: 9001;" ><div id="previewclose" title="Скрыть предпросмотр." style="-moz-border-radius: 8px 8px 0px 0px; width: 16px; height: 16px; background-image: url('+gliph.close+') "></div><div id="scrolltopreview" title="Промотать к предпросмотру." style="width: 16px; height: 16px; background-image: url('+gliph.up+') "></div><div id="scrollbookmark" title="Закладка (Ctrl+Клик - удаляет закладку)." style="-moz-border-radius: 8px 8px 8px 8px; width: 16px; height: 16px; background-image: url('+gliph.bookmark+') "></div><div id="scrolltoeditor" title="Промотать к редактору." style="-moz-border-radius: 0px 0px 8px 8px; width: 16px; height: 16px; background-image: url('+gliph.down+') "></div></div>').appendTo('#content').hide();
	var scrollbookmark = {set: false, positiontop: 0}; 
	$('#previewclose')
		.click(function (e) {
            if ( $('#p-lang').size() > 0 ) $('#column-one > #p-lang').remove();
			$('#wikiPreview > *').remove();		
			$('#wikiPreview').hide();
			$('#previewctrls').hide();
			scrollbookmark.set = false;
			$('#scrollbookmark').css('background-color', '')
			window.scroll(0, $('#wpTextbox1').offset().top - 150);
		})
		.hover(function (){ $(this).css('background-color', 'red') }, function() { $(this).css('background-color', '') });
	$('#scrolltopreview')
		.click(function (e) {	window.scroll(0, $('#wikiPreview').offset().top);	})
		.hover(function (){ $(this).css('background-color', '#FFE96F') }, function() { $(this).css('background-color', '') });
	$('#scrollbookmark')
		.click(function (e) {
			if (scrollbookmark.set == false && e.ctrlKey == false) { scrollbookmark.set = true; scrollbookmark.positiontop = window.pageYOffset; $(this).css('background-color', '#90C07F')};
			if (scrollbookmark.set == true && e.ctrlKey == false) {	window.scroll(0, scrollbookmark.positiontop) };
			if (e.ctrlKey == true) {	scrollbookmark.set = false;	$(this).css('background-color', '')};
		})
		.hover(function (){ $(this).css('background-color', '#FFE96F') }, function() {
			if (scrollbookmark.set == false) {$(this).css('background-color', '')} else {$(this).css('background-color', '#90C07F')} });
	$('#scrolltoeditor')
		.click(function (e) {	window.scroll(0, $('#wpTextbox1').offset().top - 150);	})
		.hover(function (){ $(this).css('background-color', '#FFE96F') }, function() { $(this).css('background-color', '') });
		

	/* Recolor Button according to Ctrl-state */
	var currentButtonMouseOn = '';
	$(window).bind('keydown keyup keypress', function(event) {
			if (currentButtonMouseOn != '' && event.type == 'keydown' && event.ctrlKey == true ) { $('#wp'+currentButtonMouseOn).css('background-color', '') };
			if (currentButtonMouseOn != '' && event.type == 'keyup' && event.ctrlKey == false ) { $('#wp'+currentButtonMouseOn).css('background-color', '#90C07F') };	
	});
		
	/* Submit Buttons */	
	$('#wpPreview,#wpDiff')
		.css('background-color', '#90C07F')
		.hover(
			function (e) {
				if ($(this).attr('id') == 'wpPreview') currentButtonMouseOn = 'Preview';
				if ($(this).attr('id') == 'wpDiff') currentButtonMouseOn = 'Diff';
			},
			function (e) {
				currentButtonMouseOn = '';
				$(this).css('background-color', '#90C07F');
			}
		)
		.click( function (e) {
			var currentButtonMouseClick;
			if ($(this).attr('id') == 'wpPreview') currentButtonMouseClick = 'Preview';
			if ($(this).attr('id') == 'wpDiff') currentButtonMouseClick = 'Diff';
			if (e.ctrlKey == false) {
				$(this).attr('disabled','disabled');				
				_ev(e);
				var f=$("#editform");		
				postEditFormPreview(f,
						'wp'+currentButtonMouseClick,
						f.attr('action'),
						function(ret){
							$('#wikiPreview > *').remove();
							$('#wikiPreview').show();
							$('#wikiPreview').append('<div id="PreviewBoxOuter" class="PreviewBoxOuter"></div>');
							$('#PreviewBoxOuter').append('<div id="PreviewBox" class="PreviewBox"></div>');							
							$('#PreviewBox').append($('#wiki'+currentButtonMouseClick+' > *',ret));
                            if ( $('#p-lang').size() > 0 ) $('#column-one > #p-lang').remove();
                            if ( $('#p-lang',ret).size() > 0 ) $('#p-tb').after( $('#p-lang',ret) );
                            if ( $('#catlinks',ret).size() > 0 ) $('#PreviewBox').after( $('#catlinks',ret) );

							$('#wikiPreview').find('.diff-context,.diff-deletedline,.diff-addedline > div').each(function() { DiffLinkify(this) });
							if (currentButtonMouseClick == 'Preview') Queue.runEachFragment( $('#wikiPreview') );
							document.getElementById("wp"+currentButtonMouseClick).disabled=false;
							window.scroll(0, $('#wikiPreview').offset().top);
							$('#previewctrls').show();
						},
						function () {
							document.getElementById("wp"+currentButtonMouseClick).disabled=false;
							alert('Error While sending data');
						},
						function () {
                            //alert("wp"+currentButtonMouseClick);                            
							document.getElementById("wp"+currentButtonMouseClick).disabled=false;
						}
				);
				window.setTimeout(function(){ $(this).removeAttr('disabled') },30000);
			};
			currentButtonMouseOn = '';
		});
	refkiller();
	window.scroll(0, $('#wpTextbox1').offset().top - 150);
};

function refkiller() {
	/* Interface */	
	appendCSS('\
    #CallRefKillerButton {cursor: pointer; background-color: rgb(241, 246, 251); border-style: solid; border-width: thin 2px 1px thin; margin-bottom: 4px; padding-bottom: 0px; margin-top: 2px; padding-top: 2px; border-top: thin solid rgb(203, 207, 213); border-bottom: 1px solid rgb(203, 207, 213); border-left: thin solid rgb(203, 207, 213); border-right-color-ltr-source: physical; border-right-color-rtl-source: physical;}\
	#blend0 {width: 100%; height: 100%; position: fixed; z-index: 4; right: 0px; top: 0px; display: block; display: block; background-color: black; opacity: 0.5; }\
	#blend {width: 100%; height: 100%; position: fixed; z-index: 5; right: 0px; top: 0px; display: block;}\
	#blend2 {width: 100%; height: 100%; position: fixed; z-index: 7; right: 0px; top: 0px; display: block;}\
	#killboxwindow {border: 1px solid; vertical-align: middle; text-align: left; position: relative; font-size: 110%; width: 80%; -moz-border-radius: 8px 8px 8px 8px; background-color: white; z-index: 1; }\
	#killbox {font-family: monospace; width: auto; overflow: auto; padding: 2px; border: 1px solid; white-space: pre-wrap;}\
	.boxclose {right: 1px; top: 1px; -moz-border-radius: 8px 8px 8px 8px; width: 16px; height: 16px; background-image: url('+gliph.close+'); z-index: 2; cursor: pointer;}\
	.boxclose:hover {background-color: red}\
	.boxOk {right: 1px; bottom: 1px; -moz-border-radius: 8px 8px 8px 8px; width: 16px; height: 16px; background-image: url('+gliph.Ok+'); z-index: 2; cursor: pointer;}\
	.boxOk:hover {background-color: #90C07F}\
	#Killboxstats {text-decoration: underline; font-size: 80%; left: 1px; top: 1px; -moz-border-radius: 8px 8px 8px 8px; z-index: 2;}\
	#KillboxLegend {position: relative; margin-left: 5px; font-size: xx-small; left: 1px; top: 1px; -moz-border-radius: 8px 8px 8px 8px; z-index: 2;}\
	#refkilloptions {position: fixed; z-index: 2; white-space: pre; display: block;}\
	#refkilloptionsInner {position: absolute; border: 1px solid; background-color: white; -moz-border-radius: 8px 8px 8px 8px; width: auto; height: 24px;}\
	.RefOption {position: relative; -moz-border-radius: 8px 8px 8px 8px; width: 16px; height: 16px; z-index: 2; cursor: pointer; margin: 4px; right: 0px; left: 0px; }\
	.exref, .exdel {position: relative; background-color: #F24F4F;}\
	.plaintextNotATag.killtag, .exref.killtag, .exdel.killtag {position: relative; background-color: #000000; color: #FFFFFF;}\
	.exref.brackettTag, .exdel.brackettTag {position: relative; background-color: #FFD700; color: #306FCF;}\
	.exref.unwrap, .exdel.unwrap {position: relative; background-color: #90C07F; color: #FFD700;}\
	.focusedRef {text-decoration: underline}\
	#Refeditwindow {border: 1px solid; vertical-align: middle; text-align: left; position: relative; font-size: 10px; height: 40%; width: 60%; -moz-border-radius: 8px 8px 8px 8px; background-color: white; z-index: 1; margin-top: 70px; }\
	#Refedittextarea {padding: 0px; margin-bottom: 0px; margin-top: 0px;, overflow: auto; white-space: pre-wrap;}\
	.edited {font-style: italic;}\
	');	
	/* Live functions */
	$('#Killboxclose').live('click', function(event) { $('#blend0,#blend').hide() } );	
	$('#Refeditclose').live('click', function(event) { $('#blend2').hide(); $('#blend0').css('z-index', '4'); } );	
	$('#KillboxOk').live('click', function(event) {
		text = $('#wpTextbox1').val();
		$('.killtag')		.each( function() { $(this).html( $(this).html().replace(/.*/gi, '') ) });
		$('.brackettTag')	.each( function() { $(this).html( $(this).html().replace(/&lt;.*&gt;(.*?)&lt;\/.*&gt;/gi, ' ($1)') ) });
		$('.unwrap')		.each( function() { $(this).html( $(this).html().replace(/&lt;.*&gt;(.*?)&lt;\/.*&gt;/gi, ' $1') ) });
		$('#killbox')		.val( $('#killbox').text()/* .replace(/<span.*class="(?:exref|exdel|killtag|brackettTag|unwrap)".*>(.*)<\/span>/gi, '$1') */ );		
		if (wpTextbox1selstart != wpTextbox1selend) {
			$('#wpTextbox1').val( text.slice(0, wpTextbox1selstart) + $('#killbox').val().replace(/&lt;(.*?)&gt;/gi, '<$1>') + text.slice(wpTextbox1selend, text.length));
		} else $('#wpTextbox1').val( $('#killbox').val().replace(/&lt;(.*?)&gt;/gi, '<$1>') );		
		$('#killbox').val('');
		$('#blend0,#blend').hide();
	});
	/* Hover or click any Killboxelement (Text & options menu items) */
	$('.plaintextNotATag, .exref, .exdel, .killtag, .brackettTag, .unwrap, .RefOption, #refkilloptionsInner').live('mouseover mouseout click', function(event) {		
		function showrefkilloptions(thisfocus) {
			if ($(thisfocus).attr('id') == '') {
				$(focusedRef).removeClass('focusedRef');
				focusedRef = thisfocus;
			};			
			$(focusedRef).addClass('focusedRef');
			$('#refkilloptions').show();
			if ($(thisfocus).attr('id') == '') { $('#refkilloptions').offset({top: focusedRefoffset.top - 40, left: focusedRefoffset.left}); $('#refkilloptionsInner > *').show();}
			if ($(thisfocus).hasClass('exdel'))	$('#brackettOption').hide();
			if ($(thisfocus).hasClass('plaintextNotATag'))	$('#brackettOption, #unwrapOption').hide();
			TabMOverTimer = null;
		};		
		if (event.type == 'mouseover') {
			thisfocus = this;			
			if (focusedRef != thisfocus && focusedRef != null && TabMOverTimer == null) {
				TabMOverTimer = window.setTimeout(function(){showrefkilloptions(thisfocus)},750);
			}
			if (focusedRef == null) { showrefkilloptions(thisfocus) };
		};		
		if (event.type == 'mouseout'){
			thisfocus = null;
			if (TabMOutTimer == null) {
				TabMOutTimer = window.setTimeout(function() {
					if (thisfocus == null || thisfocus == undefined) {
						$(focusedRef).removeClass('focusedRef');
						focusedRefoffset = null;				
						focusedRef = null;
						$('#refkilloptionsInner > *').show();
						$('#refkilloptions').hide();
						//window.clearTimeout(TabMOutTimer);						
					};
					TabMOutTimer = null;
				},1500);
			}			
		};
		/* Options menu click only*/
		if (event.type == 'click'){
			switch ($(thisfocus).attr('id')) { // exref/exdel + killtag unwrap brackettTag
				case 'killOption'		: { $(focusedRef).removeClass('unwrap brackettTag').addClass('killtag'); break }
				case 'unwrapOption'		: { $(focusedRef).removeClass('killtag brackettTag').addClass('unwrap');  break }
				case 'brackettOption'	: { $(focusedRef).removeClass('killtag unwrap').addClass('brackettTag');  break }
				case 'editOption'		: { callrefedit(focusedRef); break }
				case 'undoOption'		: { $(focusedRef).removeClass('killtag unwrap brackettTag edited');
											if ($(focusedRef).attr('oldvalue') != '') {
												$(focusedRef).html($(focusedRef).attr('oldvalue'));
												sincTagContentAndClass(focusedRef, $(focusedRef).html());
											}; break }
			};
			$('#Killboxstats').html('Рефы: '+($('#killbox').text().match(/<[^\/>]*ref>/g).length-$('.exref.killtag, .exref.brackettTag, .exref.unwrap').size())+', Страйки: '+($('#killbox').text().match(/<[^\/>]*del>/g).length-$('.exdel.killtag, .exdel.unwrap').size()));	
		};
	});
	$(window).bind('resize', function() {
        $('#killbox').css('height', ((window.innerHeight*0.8)-32)+'px');
        $('#killboxwindow').css('margin-top', ((window.innerHeight*0.1)-16)+'px');
    });
    
	/* Prepare */
		/* killboxwindow */
	$(document).mousemove(function (event2){ focusedRefoffset = {top: event2.pageY, left: event2.pageX} });
	$('<div id="blend0"/><div id="blend" align="center"><table border="0" id="killboxwindow" style="margin-top: '+((window.innerHeight*0.1)-16)+'px;"><tr><td style="padding: 0px; width: 16px; height: 16px;"></td><td style="padding: 0px;"><span id="Killboxstats"/><span id="KillboxLegend"/></td><td style="padding: 0px;"><div title="Скрыть." id="Killboxclose" class="boxclose"/></td></tr><tr><td style="padding: 0px;"></td><td style="padding: 0px;"><div id="killbox" style="height: '+((window.innerHeight*0.8)-32)+'px; "/></td><td style="padding: 0px;"></td></tr><tr><td style="padding: 0px; width: 16px; height: 16px;"></td><td style="padding: 0px;"></td><td style="padding: 0px;"><div title="Применить." id="KillboxOk" class="boxOk"/></td></tr></table></div>')
	.appendTo('#globalWrapper');
	
	$('#KillboxLegend').append('<div style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 3;"/><span class="exref">А</span> - Примечание; <span class="exdel">B</span> - Перечёркивание; <span class="exref killtag">C</span> - К уничтожению; <span class="exref unwrap">D</span> - К внесению в текст; <span class="exref brackettTag">E</span> - Будет взято в скобки; <span class="edited brackettTag">F</span> - Изменённый участок.');
		/* Editref window */
	$('<div id="blend2" align="center"><table border="0" id="Refeditwindow"><tr><td style="padding: 0px; width: 16px; height: 16px;"></td><td style="padding: 0px;"></td><td style="padding: 0px;"><div title="Скрыть." id="Refeditclose" class="boxclose"/></td></tr><tr><td style="padding: 0px;"></td><td style="padding: 0px;"><textarea tabindex="1" rows="25" cols="80" id="Refedittextarea"/></td><td style="padding: 0px;"></td></tr><tr><td style="padding: 0px; width: 16px; height: 16px;"></td><td style="padding: 0px;"></td><td style="padding: 0px;"><div title="Применить." id="RefeditOk" class="boxOk"/></td></tr></table></div>')
	.appendTo('#globalWrapper');
		/* refkilloptions menu */
	$('<div id="refkilloptions"><div id="refkilloptionsInner"><img class="RefOption" src="'+gliph.close+'" id="killOption" title="Удалить."/><img class="RefOption" src="'+gliph.deltag+'" id="unwrapOption" title="Внести в текст."/><img class="RefOption" src="'+gliph.brackett+'" id="brackettOption" title="Вынести в скобки."/><img class="RefOption" src="'+gliph.edittag+'" id="editOption" title="Отредактировать участок текста."/><img class="RefOption" src="'+gliph.bookmark+'" id="undoOption" title="Вернуть."/></div></div>')
	.appendTo('#blend');		
		/* Toolbar button */
	$('<button id="CallRefKillerButton" type="button" title="DA REFKILLAH!!!111" border="0" ><del>&lt;ref&gt;&lt;del&gt;</del></button>')
	.insertAfter('#wpDiff')
	.click(function() {
		wpTextbox1selstart = document.getElementById("wpTextbox1").selectionStart;
		wpTextbox1selend = document.getElementById("wpTextbox1").selectionEnd;
		text = $('#wpTextbox1').val();	
		var selarea = text.slice(wpTextbox1selstart, wpTextbox1selend);
		if (selarea == '' ) selarea = text.slice(0, $('#wpTextbox1').val().length);			
		callrefkiller(selarea);
	});
	
	$('#blend0, #blend, #blend2, #refkilloptions').hide();
	if (location.href.match(/refkiller=yes/)) callrefkiller( $('#wpTextbox1').val().slice(wpTextbox1selstart, wpTextbox1selend) );
		
	function callrefkiller(selarea) {
		/* Programm */
		var selarea = selarea;
		$('#blend0,#blend').show();
		for (x in regexps) { selarea	= selarea.replace(regexps[x][0], regexps[x][1]) };
		selarea	= selarea.replace(/^([\s\S]*)$/i,'<span class="plaintextNotATag">$1</span>');
		for (x in regexps2) { selarea = selarea.replace(RegExp(regexps2[x][0], 'gi'), '</span><span class="'+regexps2[x][1]+'">$1</span><span class="plaintextNotATag">'); };		
		
		$('#killbox').html(selarea);
		$('#Killboxstats').html('Рефы: '+$('#killbox').text().match(/<[^\/>]*ref>/g).length+', Страйки: '+$('#killbox').text().match(/<[^\/>]*del>/g).length);	
	};

	function callrefedit(focusedRef) {
		$('#blend0').css('z-index', '6');
		var text = $(focusedRef).html()
		text = text.replace(/&lt;/gi, '<');
		text = text.replace(/&gt;/gi, '>');
		$('#blend2').show();
		$('#Refedittextarea').val( text );
		
		/* On OK button*/
		$('#RefeditOk').unbind('click').click( function(){
			text = $('#Refedittextarea').val();
			if ( $(focusedRef).attr('oldvalue') == undefined) $(focusedRef).attr('oldvalue', $(focusedRef).html());
			for (x in regexps) { text = text.replace(regexps[x][0], regexps[x][1]) };
			sincTagContentAndClass(focusedRef, text);
			/* Add "killtag" Class instead of making it empty in case of content deletion */
			if (text != '')
				{ $(focusedRef).html(text) }
			else {
				$(focusedRef)
				.html( $(focusedRef).attr('oldvalue') )
				.removeClass('unwrap brackettTag')
				.addClass('killtag');
			};
			if ($(focusedRef).attr('oldvalue') != $(focusedRef).html()) $(focusedRef).addClass('edited');
			$('#Refedittextarea').val('');
			$('#blend2').hide();
			$('#blend0').css('z-index', '4');
		});
	};
	
	function sincTagContentAndClass(focusedRef, innerHtml) {
		$(focusedRef).removeClass();
		for (x in regexps2) {
			if (innerHtml.match(RegExp('^'+regexps2[x][0]+'$', 'i')) != null) {$(focusedRef).addClass( innerHtml.replace(RegExp('^'+regexps2[x][0]+'$', 'i'), regexps2[x][1]) ) }
			else { $(focusedRef).addClass('plaintextNotATag') };
		};		
	}
	
	/* window.setInterval(function(){
		//GM_log('thisId: '+$(thisfocus).attr('id')+', thisClass '+$(thisfocus).attr('class')+', TabMOverTimer: '+TabMOverTimer+', TabMOutTimer: '+TabMOutTimer+', focusedRef: '+focusedRef);
		GM_log('focusedRef: '+$(focusedRef).html());
	}, 100); */	
};

function DiffLinkify (object) {
    var html = $(object).html();

// &lt; &gt; &amp; to \x00 \x01
	html = html.replace(/&lt;/g, '\x00');
	html = html.replace(/&gt;/g, '\x01');

// external links
	html = html.replace(/\b(((https?|ftp|irc|gopher):\/\/)|news:|mailto:)([^\x00-\x20\s\"\[\]\x7f\|\{\}<>]|<[^>]*>)+?(?=([\!\"\(\)\.\,\:\;\‘-•]*(\s|$)|[\x00-\x20\s\"\[\]\x7f\|\{\}]))/gi,
		function (p) {
			var wholeLink = p;
			var targetNoTags = wholeLink.replace(/<[^>]*>/g, '');
			targetNoTags = targetNoTags.replace(/&lt;.*?&gt;/g, '');
			targetNoTags = targetNoTags.replace(/&lt;.*$/g, '');
			var url = targetNoTags.replace(/\s/g, '_');
			url = encodeURI(url);
			url = url.replace(/\"/g, '%22');
			url = url.replace(/\'/g, '%27');
			url = url.replace(/#/g, '%23');
			var linkTitle = targetNoTags.replace(/\"/g, '&quot;');

// linkify all url text fragments between highlighting <span>s seperately
			var anchorOpen = '<a target="_blank" href = "' + url + '" style="text-decoration: none; color: inherit; color: expression(parentElement.currentStyle.color);" title="' + linkTitle + '">';
			var anchorClose = '</a>';
			var wholeLinkAnchorified = wholeLink.replace(/(<[^>]*>)/g, anchorClose + '$1' + anchorOpen);

			return(anchorOpen + wholeLinkAnchorified + anchorClose);
		}
	);

// linkify links and templates
//                       12  [  23   <>  3 [ 4   <>  4 156    article     67     text     75
    html = html.replace(/((\[|\{)(<[^>]*>)*\2(<[^>]*>)*)(([^\|\[\]\{\}\n]*)([^\n\[\]\{\}]*))/g,
        function (p, p1, p2, p3, p4, p5, p6, p7, p8) {
            var pre = p1;
            var linkType = p2;
            var wholeLink = p5;
            var linkTarget = p6;

// create article name
            var targetNoTags = linkTarget.replace(/<[^>]*>/g, '');
            targetNoTags = targetNoTags.replace(/&lt;.*?&gt;/g, '');
            targetNoTags = targetNoTags.replace(/&lt;.*$/g, '');
            targetNoTags = targetNoTags.replace(/^\s+|\s+$/g, '');

// create url
            var url = targetNoTags.replace(/\s/g, '_');
            url = url.match(/^\//i)?(wgPageName+url):url;
            
            url = encodeURI(url);
            url = url.replace(/\"/g, '%22');
            url = url.replace(/\'/g, '%27');
            url = url.replace(/#/g, '%23');
            var articleTitle = targetNoTags.replace(/\"/g, '&quot;');
            if (linkType == '{') {
                if (/^[^\|\}\n\r]*:/.test(targetNoTags) == false) {
                    url = 'Template:' + url;
                    articleTitle = 'Template:' + articleTitle;
                }
            };
            // Interwiki goes here
            // ^([^\s]*)\s(http.*)$
            // case '$1': url = url.replace( (new RegExp('^:?'+'$1:(.*)\$') ), '$2'); break;
            switch ( url.replace(/^:?(ae|cache|commons|de.w|en.w|gentoo-wiki|google|he|imdb|ja.w|lm|netlore|tv|uk.w|urban|w|wiki|wikibooks|wiktionary|kym):.*$/, '$1') ) {
                case 'ae': url = url.replace( (new RegExp('^:?'+'ae:(.*)$') ), 'http://www.encyclopediadramatica.com/$1'); break;
                case 'cache': url = url.replace( (new RegExp('^:?'+'cache:(.*)$') ), 'http://www.google.com/search?q=cache:$1'); break;
                case 'commons': url = url.replace( (new RegExp('^:?'+'commons:(.*)$') ), 'http://commons.wikimedia.org/wiki/$1'); break;
                case 'de.w': url = url.replace( (new RegExp('^:?'+'de.w:(.*)$') ), 'http://de.wikipedia.org/wiki/$1'); break;
                case 'en.w': url = url.replace( (new RegExp('^:?'+'en.w:(.*)$') ), 'http://en.wikipedia.org/wiki/$1'); break;
                case 'gentoo-wiki': url = url.replace( (new RegExp('^:?'+'gentoo-wiki:(.*)$') ), 'http://gentoo-wiki.com/$1'); break;
                case 'google': url = url.replace( (new RegExp('^:?'+'google:(.*)$') ), 'http://www.google.com/search?q=$1'); break;
                case 'he': url = url.replace( (new RegExp('^:?'+'he:(.*)$') ), 'http://he.wikipedia.org/wiki/$1'); break;
                case 'imdb': url = url.replace( (new RegExp('^:?'+'imdb:(.*)$') ), 'http://us.imdb.com/Title?$1'); break;
                case 'ja.w': url = url.replace( (new RegExp('^:?'+'ja.w:(.*)$') ), 'http://ja.wikipedia.org/wiki/$1'); break;
                case 'lm': url = url.replace( (new RegExp('^:?'+'lm:(.*)$') ), 'http://lurkmore.com/wiki/$1'); break;
                case 'netlore': url = url.replace( (new RegExp('^:?'+'netlore:(.*)$') ), 'http://www.netlore.ru/$1'); break;
                case 'tv': url = url.replace( (new RegExp('^:?'+'tv:(.*)$') ), 'http://tvtropes.org/pmwiki/pmwiki.php/Main/$1'); break;
                case 'uk.w': url = url.replace( (new RegExp('^:?'+'uk.w:(.*)$') ), 'http://uk.wikipedia.org/wiki/$1'); break;
                case 'urban': url = url.replace( (new RegExp('^:?'+'urban:(.*)$') ), 'http://www.urbandictionary.com/define.php?term=$1'); break;
                case 'w': url = url.replace( (new RegExp('^:?'+'w:(.*)$') ), 'http://ru.wikipedia.org/wiki/$1'); break;
                case 'wiki': url = url.replace( (new RegExp('^:?'+'wiki:(.*)$') ), 'http://c2.com/cgi/wiki?$1'); break;
                case 'wikibooks': url = url.replace( (new RegExp('^:?'+'wikibooks:(.*)$') ), 'http://en.wikibooks.org/wiki/$1'); break;
                case 'wiktionary': url = url.replace( (new RegExp('^:?'+'wiktionary:(.*)$') ), 'http://en.wiktionary.org/wiki/$1'); break;
                case 'kym': url = url.replace( (new RegExp('^:?'+'kym:(.*)$') ), 'http://knowyourmeme.com/memes/$1'); break;
                default: url = wgServer + wgArticlePath.replace(/\$1/, url);
            };

// linkify all text fragments between highlighting <span>s seperately
            var anchorOpen = '<a target="_blank" href = "' + url + '" style = "text-decoration: none; color: inherit; color: expression(parentElement.currentStyle.color)" title="' + articleTitle + '">';
            var anchorClose = '</a>';
            var wholeLinkAnchorified = wholeLink.replace(/(<[^>]*>)/g, anchorClose + '$1' + anchorOpen);

            return(pre + anchorOpen + wholeLinkAnchorified + anchorClose);
        }
    );

	
// \x00 and \x01 back to &lt; and &gt;
	html = html.replace(/\x00/g, '&lt;');
	html = html.replace(/\x01/g, '&gt;');


    
/* linkify gallery titles */
	var fregexp = /^(?:Image:|Изображение:|Файл:|\|)([\s\S]*?)(png|jpeg|jpg|jpe|ogg|mp3|m4a|pdf|svg)(\|.*)?$/igm;
    var mwfile = null;
	if ($('<div>'+html+'</div>').text().match(fregexp)) {
        var mwfile = $('<div>'+html+'</div>').text().replace(fregexp, 'Файл:$1$2');
		$(object).parent().prepend('<a href = "' + wgServer + '/' + mwfile + '" target="_blank" style = "float:left;text-decoration: none; color: inherit; color: expression(parentElement.currentStyle.color)" title="' + mwfile + '">&#9713;</a>');
	};
	var vregexp = /^(?:{{video|YouTube|DailyMotion)?.*?\|([a-zA-Z0-9_-]{11})\|(?:.*)?(?:}})?/igm;
	if ($('<div>'+html+'</div>').text().match(vregexp)) {
		mwfile = $('<div>'+html+'</div>').text().replace(vregexp, '$1');
		$(object).parent().prepend('<a href = "http://www.youtube.com/watch?v=' + mwfile + '" target="_blank" style = "float:left;text-decoration: none; color: inherit; color: expression(parentElement.currentStyle.color)" title="Посмотреть на ютюбе">&#9713;</a>');
	};
    
    $(object).html(html);
};

function UI() {
    //my.k('#editpage-copywarn,#editpage-copywarn2');
	$('#editpage-copywarn,#editpage-copywarn2').appendTo('#bodyContent');
    var rec=my.q("#n-recentchanges");
    //rec.innerHTML=rec.innerHTML.replace("Свежие правки","Несвежие правки");
    var tb=my.q("#toolbar");
    if(tb){
	  var edittools=my.q(".mw-editTools");
	  my.insBbeforeA(tb,edittools);
    };
	/* Sect 0 Edit */
    if ( $('#p-cactions .pBody ul li a:contains("Править секцию")').size() > 0 ) $('#p-cactions .pBody ul li a:contains("Править секцию")').parent().remove();
	if (wgIsArticle == true && wgRestrictionEdit != "sysop" && $("#ca-edit a").size() > 0 && $('.editsection a[href*="section=0"]').size() < 1 ) {
		$('#firstHeading').append('<span class="editsection">[<a href="'+$("#ca-edit a").attr('href')+'&section=0">править</a>]</span>');
	};
    /* Ref highlite */
	appendCSS("\
	[id*='ref']:target {background:#eee}\
	:target:not([id*='ref'])::before {content:''}\
	:target:not([id*='ref']){background:#eee}\
    ");
	
	/*  Refoyobstvo lol */
	if (wgServer == 'http://lurkmore.ru') {
		var refs = $('.references li').size();
		var strikes = $('s,del').size();
		strikes -= $('.toccolours.collapsible.collapsed s,del').size();
		//alert(refs+' '+strikes);
		if(refs>10 || strikes > 5) {
			var warning=$('<div class="mw-warning-with-logexcerpt" style="margin-top: 10px;"/>')
				.html('<b>Achtung!</b> Статья подозрительно похожа на говно!<br/><ul><li class="mw-logline-protect">Количество рефов: '+refs+'; страйков: '+strikes+'. </li></ul>');
			$('li',warning).append($('<a/>').attr('href',wgScript+'?'+$.param({title:wgPageName,action:'edit',refkiller:'yes'})).html("Исправить?"));
			$('#content').prepend(warning)
		};
	};

	/* add custom time range links to the watchlist */
	$('#pt-watchlist a').after(' (<a href="/index.php?title=Служебная:Watchlist&amp;days=0.0416666666667" title="Служебная:Watchlist">1</a> | <a href="/index.php?title=Служебная:Watchlist&amp;days=0.0833333333333" title="Служебная:Watchlist">2</a> | <a href="/index.php?title=Служебная:Watchlist&amp;days=0.25" title="Служебная:Watchlist">6</a> | <a href="/index.php?title=Служебная:Watchlist&amp;days=0.5" title="Служебная:Watchlist">12</a> ч.)');
	
	/* add a link to the main namespace for the recent changes link */
	$('.pBody ul li a:contains("Несвежие правки")').after(' (<a href="/index.php?namespace=0&title=Special%3ARecentChanges" title="Только основное пространство статей">Осн.</a>)');
	
	/* wikilinks to the headers */
    function selectAllText(textbox) { textbox.focus(); textbox.select(); };
    
	$('.mw-headline')
    .each(function(n) {
        var h = $(this);
        $('<input id="wikiheaderanchor'+n+'" type="text" style="font-size: xx-small; min-height: 0.25em ! important; display: none;" value="'+wgPageName+'#'+$(h).text().replace(/^\s*([^\s].*[^\s])\s*$/, '$1')+'" >')
        .insertAfter(h)
        .mouseover(function() { selectAllText($('#wikiheaderanchor'+n)) });
	})
    .toggle(
        function() { $(this).parent().children('input').eq(0).show(); },
        function() { $(this).parent().children('input').eq(0).hide(); }
    );
    
    
    function addRdrctspicts() {
        $('.mw-redirect').each(function() {
            $('<a target="_blank" class="drctspict" href="'+$(this).attr('href').replace(/\/(.*)/, '/index.php?title=$1')+'&redirect=no"/>')
            .insertBefore(this);
        });
    };
    addRdrctspicts();
    Queue.addEachFragment( addRdrctspicts ); 
    
    $('<li id="ca-drctspictsw"><span class="drctspict" style="cursor: pointer; border: solid 1px" title="Показ редиректов."></span></li>').prependTo('#p-personal.portlet div.pBody ul');
    function SwitchRdrctspictHide() {
        $('a.drctspict').hide();
        $('#ca-drctspictsw span.drctspict').css('border', 'solid 1px transparent'); 
    };
    $('#ca-drctspictsw span.drctspict').click( function () {
        if ( localStorage.getItem('redirect_links_picts') == 'shown') {
            SwitchRdrctspictHide();
            localStorage.setItem('redirect_links_picts', 'hidden'); 
        } else {
            $('a.drctspict').show();
            $('#ca-drctspictsw span.drctspict').css('border', 'solid 1px'); 
            localStorage.setItem('redirect_links_picts', 'shown');
        };
    });
    if ( localStorage.getItem('redirect_links_picts') == 'hidden') SwitchRdrctspictHide();
	
};

function diffpage() {
	$('.diff-context > div,.diff-deletedline > div,.diff-addedline > div').each(function() { DiffLinkify(this) });
    
    if ( $('#p-cactions .pBody ul li a[href*=diff]').size() > 0 ) $('#p-cactions .pBody ul li a[href*=diff]').parent().remove();
	
    if (location.href.match(/diff=/)) {
		$('#p-cactions .pBody ul').append('<li><a href="'+
		wgServer+
		'/index.php?'+
		$('#mw-diff-otitle1 strong a').attr('href').replace(/.*?(oldid=\d+).*?/i,'$1')+
		'&diff='+
		$('#mw-diff-ntitle1 strong a').attr('href').replace(/.*?oldid=(\d+).*?/i,'$1')
		+'">diff</a></li>');

		if ($('#mw-diff-ntitle1 strong a').eq(1).attr('href').match(/oldid=\d+/)) {
			$('#differences-nextlink').after(' <a href="'+$('#mw-diff-ntitle1 strong a').eq(0).attr('href').replace(/^(.*)oldid=(\d+).*?$/,"$1oldid=$2&diff=cur")+'">Последняя →|</a>');
		};
		if ($('#mw-diff-otitle1 strong a').eq(1).attr('href').match(/oldid=\d+/)) {
			$('#differences-prevlink').after(' <a href="'+$('#mw-diff-otitle1 strong a').eq(0).attr('href').replace(/^(.*)oldid=(\d+).*?$/,"$1oldid=$2&diff=cur")+'">Последняя →|</a>');
		};

		if ($('.diff-multi').size() != 0) {
			if ($('#mw-diff-ntitle1 strong a').eq(1).attr('href').match(/oldid=\d+/)) {
				$('#differences-nextlink').before(' <a href="'+$('#mw-diff-ntitle1 strong a').eq(0).attr('href').replace(/^(.*)oldid=(\d+).*?$/,"$1oldid=$2&diff=prev")+'">●← Предыдущая</a> ');
			};
			if ($('#mw-diff-otitle1 strong a').eq(1).attr('href').match(/oldid=\d+/)) {
				$('#differences-prevlink').after(' <a href="'+$('#mw-diff-otitle1 strong a').eq(0).attr('href').replace(/^(.*)oldid=(\d+).*?$/,"$1oldid=$2&diff=next")+'">Следующая →●</a>');
			};	
			if ($('#mw-diff-ntitle4').children().size() == 0) {
				$('#mw-diff-ntitle4').append('<a href="'+$('#mw-diff-ntitle1 strong a').eq(0).attr('href').replace(/^(.*)oldid=(\d+).*?$/,"$1oldid=$2&diff=prev")+'">●← Предыдущая</a> ');
			};
		};

	};

	
};

function ImageCategorizerEnch() {
    $('.imageCatTmplFieldVal input[name="meme"]').live('click', function(e){
        var _this = this;
        if ( $(_this).val() == '' ) $(_this).val( $('.mw-imagepage-linkstoimage li a').eq(0).text() );
    });
};

function FilterWatchedArticlesOnRecentchanges () {
    $('.rcoptions br').eq(1).before(' | <a id="Switch-watched" style="cursor:pointer;">Скрыть</a>&nbsp;наблюдаемые&nbsp;статьи.');
    $('.rcoptions').eq(0).after('<span id="Switch-watched-status"></span>');
    function SwitchWatchedHide() {
        $('.mw-watched').parent().parent().hide();
        $('#Switch-watched').text('Показать');
        $('#Switch-watched-status').text('Наблюдаемые статьи скрыты из списка.');  
    };
    $('#Switch-watched').click( function () {
        if ( localStorage.getItem('watched_links_in_recent_chenges') == 'shown') {
            SwitchWatchedHide();
            localStorage.setItem('watched_links_in_recent_chenges', 'hidden'); 
        } else {
            $('.mw-watched').parent().parent().show();
            $('#Switch-watched').text('Скрыть');
            $('#Switch-watched-status').text('');  
            localStorage.setItem('watched_links_in_recent_chenges', 'shown');
        };
    });
    if ( localStorage.getItem('watched_links_in_recent_chenges') == 'hidden') SwitchWatchedHide();
};

/* Starter */

if(wgServer != null) {
	UI();
    if (wgCanonicalSpecialPageName == "Recentchanges") FilterWatchedArticlesOnRecentchanges ()
    if (wgCanonicalNamespace == 'File') ImageCategorizerEnch();
	if (location.href.match(/action=(edit|submit)/)) {
		var TabMOverTimer = null, TabMOutTimer = null;
		var thisfocus = null;	
		var focusedRef = null;
		var focusedRefoffset = null;
		var wpTextbox1selstart = 0, wpTextbox1selend = $('#wpTextbox1').val().length;
		var text = $('#wpTextbox1').val();
		var regexps = [
			//[//gi,''],
			[/(<[^>]*)s(>)/gi, '$1del$2'],
			[/(<[^>]*)strike(>)/gi, '$1del$2'],
			[/</gi, '&lt;'],
			[/>/gi, '&gt;']
			];
		var regexps2 = [		
			['(&lt;(ref|del)[^&gt;\\/]*&gt;[\\s\\S]*?&lt;\\/\\2[^&gt;]*&gt;)', 'ex$2']
			];	
		editpage();
	};
	if (location.href.match(/diff=/)) diffpage();
};

/* Updater */
function updateCheck(dayDelay) {
	if( parseInt(GM_getValue('last_check', 0)) + 24*3600*1000 > (new Date()).getTime() ) return;
	var scriptNum = 79647;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/'+scriptNum+'.meta.js?'+(new Date()).getTime(),
		headers: {'Cache-Control': 'no-cache'},
		onload: function(response)
		{
			GM_setValue('last_check', ''+(new Date()).getTime());

			var localVersion = parseInt(GM_getValue('local_version',0));
			var remoteVersion = parseInt(/@uso:version\s*([0-9]+?)\s*$/m.exec(response.responseText)[1]);
			dayDelay = parseInt(GM_getValue('day_delay',dayDelay));
						
			if( !localVersion || remoteVersion <= localVersion ) GM_setValue('local_version',remoteVersion);
			else if( dayDelay > 0 ) GM_setValue('day_delay',dayDelay-1);		
			else if( confirm('There is an update available for the Greasemonkey script "'+/@name\s*(.*?)\s*$/m.exec(response.responseText)[1]+'".\nWould you like to go to the install page now?') )
			{
				GM_openInTab('http://userscripts.org/scripts/show/'+scriptNum);
				GM_setValue('local_version', remoteVersion);
				GM_deleteValue('day_delay');
			}
		}
	});
} updateCheck(1);
