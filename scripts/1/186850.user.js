// ==UserScript==
// @name        Torec Time Saver
// @namespace   http://userscripts.org/users/367653
// @description Disable the time unregistered users need to wait for downloading subtitles in Torec.Net.
// @include     http://www.torec.net/sub.asp?sub_id=*
// @include     http://torec.net/sub.asp?sub_id=*
// @version     1.0
// ==/UserScript==
function realDownloadSub() {
	var shs, codes = $('#download_version :selected').val();
	//var codes = document.getElementById("download_version");
	//codes = codes.options[codes.selectedIndex].value;
	if(!codes) {
		codes = $('#download_version :option').val();
	}
	if(!codes) {
			$.weeboxs.open('נא לבחור גרסא להורדה.',{type:'error',title:'שגיאה',showCancel:false});
			return false;
	}

	$.post("/ajax/sub/guest_time.asp", { sub_id: sub_Id,s:screen.width}, function(data) {
			if(data!='error') {		
				$.post("/ajax/sub/downloadun.asp", { sub_id: $.getAllQueryStrings()["sub_id"].value, code: codes, sh : "yes", guest: data, timewaited : (Math.floor(Math.random()*7+12))}, function(data) {
					if(data!='')
						location.href = data;
						//$(data).appendTo('body');
				});
			}
		});
}

document.getElementById("download_version_btn").onclick = realDownloadSub;