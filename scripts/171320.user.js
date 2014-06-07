// ==UserScript==
// @name NCTU e3 Rapid Download
// @description Get rid of annoying download popup in e3 system
// @version 1.3.0.1
// @namespace http://spiderpowa.com
// @include http://e3.nctu.edu.tw/NCTU_EASY_E3P/LMS2/stu_materials_document_list.aspx*
// @include http://e3.nctu.edu.tw/NCTU_EASY_E3P/LMS2/stu_course_index.aspx*
// @include http://e3.nctu.edu.tw/NCTU_Easy_E3P/LMS2/dialog_common_view_attach_media_list.aspx*
// @require http://code.jquery.com/jquery-2.0.2.min.js
// @grant GM_addStyle
// ==/UserScript==

//Fast download
var file_selectors = ['a[id$="_lnkFile"]', 'a[id$="_linkFilePreview"]'];
var disable_download_popup = function(){
	for(var i=0; i<file_selectors.length; ++i)
		disable_download_popup_sel(file_selectors[i]);
};
var disable_download_popup_sel = function(selector){
	var links = $(selector);
	$.each(links, function(){
		var obj = $(this);
		var data = obj.attr('onclick');
		console.log(data);
		if(!data || !data.length || !data.match(/AttachMediaId/))return;
		var id_regex = /(\=[a-z0-9\-]+)/;
		var ids = ['AttachMediaId', 'CourseId'];
		var url = 'common_get_content_media_attach_file.ashx?StudyLog=1';
		for(var i=0; i<ids.length; ++i){
			var extract_id = id_regex.exec(data)[1];
			url += '&' + ids[i] + extract_id;
		}
		obj.attr('href', url);
		obj.attr('onclick', null);
	});
}
disable_download_popup();
var b = document.getElementsByTagName('body')[0];
var observer = new window.MutationObserver(function(mutationRecord, observer){
	disable_download_popup();
});
observer.observe(b, {childList:true, subtree:true});
//Popup fix
if(window.location.href.indexOf('dialog_common_view_attach_media_list.aspx') != -1){
	var links = $('td[onclick$="linkFilePreview\').onclick()"]');
	$.each(links, function(){
		var obj = $(this);
		var data = obj.attr('onclick');
		obj.attr('onclick',	data.replace(/onclick\(\)$/, 'click()'));
	});
}