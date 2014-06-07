// ==UserScript==
// @name        eRepublikEmployeeManagement
// @namespace   eRepublikEmployeeManagement
// @description eRepublik Employee Management
// @include     http://www.erepublik.com/*/economy/manage-employees/1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     0.2
// ==/UserScript==
$('.area').find('h4').eq(0).append('<div style="border:none; overflow:hidden; float:right;clear:both;"><font size=1>Presence <input type="text" id="presence_filter" class="field" maxlength="5" style="width:27px" value="" onkeypress="return checkNumber(\'float\', event);" /> Salary <input type="text" id="salary_filter" class="field" maxlength="5" style="width:27px" value="" onkeypress="return checkNumber(\'float\', event);" /></font></div>');
//$('.list_group').find('input').eq(0).remove();
//$('.list_group').find('.listing').eq(0).remove();
var aryStorageInput = new Array();
var aryStorageListing = new Array();

var i=0;
for (i=$('.list_group').find('.listing').size()-1;i>=0;i--) {
	var tmp_input = $('.list_group').find('input').eq(i*3);
	var tmp_listing = $('.list_group').find('.listing').eq(i);
	tmp_listing.find('.current_salary').eq(0).append('<BR><center>'+$('.list_group').find('.listing').eq(i).find('.working_days').eq(0).find('span[title="Worked"]').size()+'/7 Days</center>');
	aryStorageInput.push(tmp_input);
	aryStorageListing.push(tmp_listing);
}

$("#salary_filter").change(function () {
	for (i=$('.list_group').find('.listing').size()-1;i>=0;i--) {
		var tmp_input = $('.list_group').find('input').eq(i*3);
		var tmp_listing = $('.list_group').find('.listing').eq(i);
		tmp_input.remove();
		tmp_listing.remove();
	}
	
	var ary_List2BeAttached = new Array();
	
	if ($("#salary_filter").val()!='' || $("#presence_filter").val()!='') {
		if ($("#salary_filter").val()!='') {
			for (var i = 0;i<aryStorageListing.length;i++) {
				if (parseFloat(aryStorageListing[i].find('.current_salary').eq(0).text().split(' ')[0]) == $("#salary_filter").val()) {
					if ($("#presence_filter").val()!='') {
						if (aryStorageListing[i].find('.working_days').eq(0).find('span[title="Worked"]').size() == $("#presence_filter").val()) {
							$('.list_group').append(aryStorageInput[i]);
							$('.list_group').append(aryStorageListing[i]);
						}
					} else {
						$('.list_group').append(aryStorageInput[i]);
						$('.list_group').append(aryStorageListing[i]);
					}
				}
			}
		} else {
			for (var i = 0;i<aryStorageListing.length;i++) {
				if (aryStorageListing[i].find('.working_days').eq(0).find('span[title="Worked"]').size() == $("#presence_filter").val()) {
					$('.list_group').append(aryStorageInput[i]);
					$('.list_group').append(aryStorageListing[i]);
				}
			}
		}
	} else {
		for (var i = 0;i<aryStorageInput.length;i++) {
			$('.list_group').append(aryStorageInput[i]);
			$('.list_group').append(aryStorageListing[i]);
		}
	}
});

$("#presence_filter").change(function () {
	for (i=$('.list_group').find('.listing').size()-1;i>=0;i--) {
		var tmp_input = $('.list_group').find('input').eq(i*3);
		var tmp_listing = $('.list_group').find('.listing').eq(i);
		tmp_input.remove();
		tmp_listing.remove();
	}
	
	var ary_List2BeAttached = new Array();
	
	if ($("#salary_filter").val()!='' || $("#presence_filter").val()!='') {
		if ($("#salary_filter").val()!='') {
			for (var i = 0;i<aryStorageListing.length;i++) {
				if (parseFloat(aryStorageListing[i].find('.current_salary').eq(0).text().split(' ')[0]) == $("#salary_filter").val()) {
					if ($("#presence_filter").val()!='') {
						if (aryStorageListing[i].find('.working_days').eq(0).find('span[title="Worked"]').size() == $("#presence_filter").val()) {
							$('.list_group').append(aryStorageInput[i]);
							$('.list_group').append(aryStorageListing[i]);
						}
					} else {
						$('.list_group').append(aryStorageInput[i]);
						$('.list_group').append(aryStorageListing[i]);
					}
				}
			}
		} else {
			for (var i = 0;i<aryStorageListing.length;i++) {
				if (aryStorageListing[i].find('.working_days').eq(0).find('span[title="Worked"]').size() == $("#presence_filter").val()) {
					$('.list_group').append(aryStorageInput[i]);
					$('.list_group').append(aryStorageListing[i]);
				}
			}
		}
	} else {
		for (var i = 0;i<aryStorageInput.length;i++) {
			$('.list_group').append(aryStorageInput[i]);
			$('.list_group').append(aryStorageListing[i]);
		}
	}
});
