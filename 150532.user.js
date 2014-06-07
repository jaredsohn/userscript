// ==UserScript==
// @name           GridQA Complement
// @namespace      http://llhuii5614.org/gmscripts
// @description    complement grid qa if you just forget to write. There's  a icon at bottom-right corner(stolen from feedly mini), just click and complement for someday.
// @version        1.2
// @grant					 none
// @author         Linghui Liu
// @require        http://userscripts.org/scripts/source/100842.user.js 
// @include        http://grid.hust.edu.cn/qa*
// ==/UserScript==

contentEval(  
function()
{
add_qa = function (title, description='', evt_start=currentStr, evt_end='') {
	if (description == '') description = title;
	if (evt_end == '')  evt_end=evt_start;
	var data="event.title=" + title +  "&event.start=" + evt_start +  "&event.end=" + evt_end + "&event.status=1&event.allDay=true" +  "&event.userId=" + cal.data.userId +  "&event.location=self&event.description=" + description ;
	data = data.replace(/ /g, '+');
	var robj =  jQuery.ajax({ type : "POST", url : "addEvent.action",
			data : data, dataType: "json", success: function(data) {
			console.log("add success") ; parent.jQuery.fancybox.close(); },
			error: function() { console.log("add failed"); }, 
			async: false });
	if (robj.status == 200) {
		return JSON.parse(robj.responseText).event.id;
	} else return 0;
}

update_qa = function (eid, title, description, evt_start, evt_end='') {
	if (description == '') description = title;
	if (evt_end == '')  evt_end=evt_start;
	var data="event.title=" + title +  "&event.start=" + evt_start +  "&event.end=" + evt_end +  "&eventId=" + eid + "&event.id=" + eid +   "&event.status=1&event.allDay=true" +  "&event.userId=" + cal.data.userId +  "&event.location=self&event.description=" + description ;
	data = data.replace(/ /g, '+');
	var robj = jQuery.ajax({ type : "POST", url : "updateEvent.action",
		data : data, dataType: "json",
		success: function(data) { console.log("update success"); },
	  error: function() { console.log("update failed"); },
		async: false});
	return  robj.status == 200 ;
}
delete_qa = function (eid) {
	var data="eventId=" + eid;
	jQuery.ajax({ type : "POST", url : "deleteEvent.action",
		data : data, dataType: "json",
		success: function(data) { console.log("delete success"); },
	  error: function() { console.log("delete failed"); },
		async: false});
}
complement_qa = function (title,  description, evt_start,evt_end='') {
	if (cal.data.userId == 0) {
		alert('please input your cal.data.userId');
		return false;
	}
	var eid = add_qa('');
	console.log(eid)
	if (eid > 0 && update_qa(eid, title, description, evt_start, evt_end)) {
			alert('qa complement succeed');
			return 0;
	}
	alert('qa complement failed');
}
var qabt = document.createElement('img');
qabt.id = "qa_comp";
qabt.title = "gridqa complement";
qabt.style.cssText = "position: fixed; bottom: 14px; right: 14px; z-index: 99; cursor: pointer; border: 0px none; visibility: visible; width: 24px; height: 24px; max-height: 24px; max-width: 24px; overflow: hidden; display: block; padding: 0px; opacity: 0.35;";
qabt.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYlJREFUeNrMVD1rwlAUPfkwBBxFKQQlDhmjqzj4F9w7FfwThZaW9n8UnDrrn1BEXNTBRQQhEE1ERRR0Sd990A7VaKJJ6YHzEu4N99z3zrsRGo2GAuCF8YFRQzSwGOuM7zJb3hgfES2o0SdGSWRLDfGhRgLpGAXS4q0VCoUCBEHwzd8skM/nUSqVoCjKybz8O1CtVn2LeZ4H27YxnU6xXC6x3+95PJPJoFKpoN1uY7vdnhfww3w+x3A4xGaz4d3quo5sNvuTTyaTXKTb7cJ13csCzWbzKKaqKj/zXC4HSZKO8iRcLpcxGAwwmUzC7UDTNBSLRSQSiVAeyUGNpM4v4XA4oNfr8eMMLJBKpWCaJn9fLBawLAur1Qq73Y6b/H0pyNyrTDYMA7PZDKPRCOv1+uQ3ZCqZe9UcOI6DTqfjW5zMbLVa3Bu6RaE9GI/HZ/P9fp8/qfipYROj+ukEnuQgEx0GImKGHGSC//UO/kTAibG+QwIfMQrUyeRXusaM94x3ERW2GT8Zn78EGACRmoKUJhB1TQAAAABJRU5ErkJggg==";

$('#wrap').append(qabt);

 function complement_toggle() {
			var ff = $('#fancybox-frame');
			if (ff != null) {
				ff = ff[0] ;
				var _$ = ff.contentWindow.$;

				var addbtn = _$('#addBtn')[0];
					_$('#startDate').removeAttr('readonly');
					_$('#endDate').removeAttr('readonly');
					addbtn.onclick = function () {
							var title = _$("input[name='event.title']").val();
							if (title == "") {
								alert("empty content!");
								return false;
							}else if (title.length > 199) {
								alert("content can't exceed 200 words");
								return false;
							}
							var description = _$("textarea[name='event.description']").val();
							var startDate = _$("input[name='event.start']").val();
							var endDate = _$("input[name='event.end']").val();
							complement_qa(title, description, startDate, endDate, cal.data.userId);
							return true;
						};
					return true;
			} else {
				alert('form null');
					return false;
			}
				
		}
qabt.onclick = function() { 
	if ($('#fancybox-frame').length == 0){
		openBox(520, 220, 'addEvent.jsp?start=' + currentStr + '&end=' + currentStr + '&status=1'); 
		setTimeout(complement_toggle, 1500); 
	} else { complement_toggle();}
}
/* 
function delete_qa(eid) {
	var data="eventId=" + eid;
	jQuery.ajax({ type : "POST", url : "deleteEvent.action",
		data : data, dataType: "json",
		success: function(data) { console.log("delete success"); },
	  error: function() { console.log("delete failed"); },
		async: false});
}
function gettoday() {
	var today = new Date();
	var dd = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	return year + '-' + month + '-' + dd;
}
*/


}
);
