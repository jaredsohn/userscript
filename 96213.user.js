// ==UserScript==
// @name           Powerschool Editor
// @namespace      http://
// @description    Modify PowerSchool Pages
// @include        https://pschool2.glastonburyus.org/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// ==/UserScript==

$(document.body).prepend('<div style="position:fixed;top:0;display:none" id="toolbar"><button id="hidebar" style="float:none;">Close</button>Click a grade to change it<input id="userID" value="'+GM_getValue('uid','User ID')+'"><button id="UIDsave" style="float:none;display:none;">Save</button></div>');
$("#userID").bind('focus',function(){
	$("#UIDsave").show();
	});
$("#UIDsave").bind('click',function(){
	GM_setValue('uid',$("#userID").val());
	$(this).hide();
	});
$("#hidebar").click(function(){
	$("#toolbar").hide();
	$('#content-main a').each(
			function(index,element){
				$(this).html('Q');
				$(this).unbind();
				});
});

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.dimproductions.net/ps/getGrades.php?uid='+GM_getValue('uid','')+'&name='+encodeURIComponent(getName())
,
    onload: function(responseDetails) {
        var json = jQuery.parseJSON(responseDetails.responseText);
		for (var i in json.grades)
		{
			var change = json.grades[i];
			//alert(change.path+'>'+change.grade);
			$('a[href$="'+change.path+'"]').html(change.grade);
		}
		$("#content-main").show();
    }
});

$(document).keypress(function(e){
	if (e.charCode == 101 && e.ctrlKey)
	{
		alert('edit');
		$("#toolbar").show();
		$('#content-main a').each(
			function(index,element){
				$(this).bind('click',function(e){
					//alert('a');
					gradePrompt(this);
					return false;
					})
				});
	}
});

function gradePrompt(element)
{
	var grade;
	if(grade = prompt('Change grade',$(element).html()))
	{
		var id = element.search;
		$(element).html(grade);
		//alert(grade+", "+id);
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://www.dimproductions.net/ps/setGrade.php',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: 'search='+encodeURIComponent(id)+'&val='+encodeURIComponent(grade)+'&uid='+GM_getValue('uid','')+'&name='+getName()
		});
	}
}

function getName()
{
	var regex = /.+<span>/
	return regex.exec($("#userName").html());
}