// ==UserScript==
// @author	burkotiya (at) email.bg
// @name	Travian Hidden Resources T3.6 v1.1
// @namespace	http://burkotiya.blogspot.com/2009/12/travian-hidden-resources.html
// @description	Shows how much of your resources are hidden, the value in brackets is against teutons.
// @include	http://*.travian.*/dorf2.php*
// ==/UserScript==

// Here are the translations (the words that appear when you hover the mouse over the cranny in your village and the resources under the top menu).
// The last array ends without comma.
var CrannyWord = new Array(
	new Array('Скривалище', 'Дървесина', 'Глина', 'Желязо', 'Жито'),	// Български
	new Array('Cranny', 'Wood', 'Clay', 'Iron', 'Crop'),			// English
	new Array('Versteck', 'Holz', 'Lehm', 'Eisen', 'Getreide'),		// German / Deutsch
	new Array('Deposito Segreto', 'Legno','Argilla', 'Ferro','Grano')	// Italiano
);

// Main part of the script
// base64 12 x 12 px images
var wood_img = 'data:image/gif;base64,R0lGODlhEgAMALMIAHAzFOrIk7SMTcp6EksfCNKqapdMCm8yCf///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAASAAwAAARDEMlJ0Tmg6nmMOcTGXcbwEdjWdSbogdVanjPMfTWRUyvptqGboFAQ/E68SyEQKKBWQcmweCBOjVHJshncOjdWSlgTAQA7';
var clay_img = 'data:image/gif;base64,R0lGODlhEgAMAMQYAPfOr+DVzOfZzp9RFrBeINS6pqhxScWhhvS8koVXNa9+WXIyA6SBaHc5CXM2B7mObdmogrSXgvaUSOh3INtnDmUrALFNAYlACf///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABgALAAAAAASAAwAAAVhICaO10AYhzCuq2Vd8EU8KitC0+S68FCzFspEIqHsKpVCi0cREifIimIkfMFcOQoSFhANJ7BoJcareJ+VJuXKa5gxgGx6aLQ6Kl0RoDknrhdIeTZ7WRdIETYrCE2GCQwrIQA7';
var iron_img = 'data:image/gif;base64,R0lGODlhEgAMANU/AJCRjl9dVl1bVX9/f4eBfGpqZWlpYnNubnp4dcG9tV1dWnNzanR1cqOkoezi193TvcbCtr26vbbBunhzcWJlZbCto3h4dkdJRNHR0Zqimqmrn1VVTiAgIFVWT1ZWVtrMvZaRh7q6oTk4OGVnXSkqKZGTh+zx3p2OjkBAOV9dW1haWOHYzsG/sEBFPT8/PWpuZERFQMfQvVpfVicpJ5+hljk5NP///7axsX19fUxOR7y8utra2SoqLLy1sZWQh////yH5BAEAAD8ALAAAAAASAAwAAAaXwJ9wSCwWdxhfT7czEncaSYQy6fl8Taejknn0FgJlAMDMCpU+GeHiK2BuvhBrZO4dAi5foCAdUCAfEwhkPwc+GwgaKyY2MRUmIC8WCgUwZAEIWwk4XQQ9NAZgKDw8PzoACSonFp4QBB4dFwMzpEMEByUDCQM4OT0GCiKkDUM7LQwpGwIKJAY8Ajk8DEU6vTgcOTW90sQ/QQA7';
var crop_img = 'data:image/gif;base64,R0lGODlhEgAMAKIGAG8yCZdMCv/nj//IALp7ANieAP///wAAACH5BAEAAAYALAAAAAASAAwAAANBaKpizSvCoSh1UhVrSjfXExUCaZZgZhDDRpTtpbIFa3vq2toDgauBmo9ACOQ0gQBgGTyCiLWabBbb1JwKwmorSQAAOw==';
var cranny_img = 'data:image/gif;base64,R0lGODlhDAAMAOf/ABIXDhUYCBkoBycuGyw6FSs+Ei5BFShHEkpDESVPCUVFFytTBDdPGzFTDz9PFjlRHT5OLTNVEjdUGEhOJEBQLytaDExRITxYHTBeBjhaF0RUM2dNEnNMBEdVLzJgCDZeEjNhCjdfE0lXMHlNCTxeGjhgFGtRFkdaLT1fGz5gHDBmDn5RAzdlD0NgJDxkGEFjHzlnETRpEn1VBHdWDWlaG0NlIT9nG4NVCDJtDFFgOFRgNE9iNEVnI4FYCUJpHUBpJDRvDlBjNDtuD0xmNl9fRnZeE1NmOFBoMlthWEtqM0ZuIlRqLzx1CkVyHltnS3BlJVtpQUhzF2xkRzp6AV1nV09xLUB5EDl7EZliBlVyNZJlBGNrVVlxO15uS2BuRkN8FD1+FVN1MD9/CjiBC055HX5rH15xQp1kClB4LEt8FnNuLEl8H2lvQ150OEGBDXZtOUp9IKFnAJpoC0OCDzyEEGR0OWB2Ol52QD2FEWRyW0CGA0yAIkGHBWZ1TGR1UlZ9MUKIB2N5PUaGE2J6RFOBLKZsCHRzWqJuBkOKCWl4T0WMDEaNDj+PD12DMHp6NkCQEVyENkyMG2aBPUSSA2WCRGGGM2OFQG1+bEuRFGmEQEeUB6Z3Em2AYlKQFVaOH1GQIEiVCXOAY1qNL0qXDXCGSap6FneAe2GOOFCWG7Z5D3uAg2+KRk2aE3CLRmGSLX+Bfn2DeViXJ2WSPEufCHKNSISJPHaJao+HPnSPSk6hDIGIcnqPS0+iDoKHikelEHyQTIOIi4eJhnuQZU2oAYKLhlmkE0uoFYOMh1ekH4eNg3KaS1CrCIaRgIuRh4GXa4mSjk2xE3qdVlWvEU6yFH2eUFawE4mWilexFYyVkISdZFS2BlW3CFa4C5OYmo6bj1e5DpeZlpWanIeoWZielF2+F4qrXIirYp2fnKCin6ClqKOloqmrVqGmqZKzZKGukKesr6Kur6iusKSwsaeztLS2s6LDc6PEdLHEdrS9xbi+wL/H0MPM1LnYgNjh6dfo7////yH5BAEKAP8ALAAAAAAMAAwAAAhwAP8JHEiwoEAfUzwZFFgN0KBvnQieihECjQEL/9AQ3HblGitQvBZxazLwxQsmQkJU+INHScFYCAiYoGEjDMEsFf5h+ZdogbKFK4j0k+eHIC564HpI6TLgXZ6B4zSsurFOILtzBCUd4VDkXzlOff4FBAA7';

// Variables
var lang = 1; // Don't edit this, the script determines the language on his own.

imgsholder = document.getElementById('village_map');
imgscount = imgsholder.getElementsByTagName('img');

crop = document.getElementById('l1');
iron = document.getElementById('l2');
clay = document.getElementById('l3');
wood = document.getElementById('l4');

res_output = document.getElementById('res').innerHTML;

function HiddenRes (c_text) {
	c_level = c_text.substring(c_text.length-2,c_text.length); c_level *= 1;
	switch (c_level) {
		case 0: c_hidden = 0; break
		case 1: c_hidden = 100; break
		case 2: c_hidden = 130; break
		case 3: c_hidden = 170; break
		case 4: c_hidden = 220; break
		case 5: c_hidden = 280; break
		case 6: c_hidden = 360; break
		case 7: c_hidden = 460; break
		case 8: c_hidden = 600; break
		case 9: c_hidden = 770; break
		case 10: c_hidden = 1000; break
		}
	if (GM_getValue('gauls') == 1) c_hidden *= 2;
	return (c_hidden);
}

function get_volume(building,t) {
	res = building.innerHTML;
	volume = building.innerHTML;
	res = res.substring(0,res.indexOf('/')); res *= 1;
	volume = volume.substring(volume.indexOf('/')+1,volume.length); volume *= 1;	
	if (teuton_bonus(hid_res,t) > volume) res += teuton_bonus(hid_res,t) - volume;
	return res;
}

function teuton_bonus (val,t) {
	if (t == 0) hid_res_teutons = val;
	else hid_res_teutons = Math.floor(0.8 * val);
	return hid_res_teutons;
}

function red_color (hr,t) {
	hr = teuton_bonus(hid_res,t) - get_volume(hr,t);
	var hr_str = '';
	if (hr >= 0) hr_str += hr + '';
	else {
	hr *= -1;
	hr_str += '<span style="color:#00ff00;">' + hr + '</span>';
	}
	return hr_str;
}

function build_res () {
	hid_res = 0;
	
	for (var ii = 0; ii < imgscount.length; ii++) {
		imgalt = imgscount[ii].alt;
		for (var xx = 0; xx < CrannyWord.length; xx++) {
			if (imgalt.indexOf(CrannyWord[xx][0]) != -1) {
				lang = xx; hid_res += HiddenRes(imgalt);
			}
		}
	}
	
	cranny_res = '<div style="text-indent:5px;">' +
	'<img src="' + wood_img + '" title="' + CrannyWord[lang][1] + '"> ' + red_color(wood,0) + '(' + red_color(wood,1) + ') ' +
	'<img src="' + clay_img + '" title="' + CrannyWord[lang][2] + '"> ' + red_color(clay,0) + '(' + red_color(clay,1) + ') ' +
	'<img src="' + iron_img + '" title="' + CrannyWord[lang][3] + '"> ' + red_color(iron,0) + '(' + red_color(iron,1) + ') ' +
	'<img src="' + crop_img + '" title="' + CrannyWord[lang][4] + '"> ' + red_color(crop,0) + '(' + red_color(crop,1) + ') ' +
	'<img id="cranny" src="' + cranny_img + '" style="cursor:pointer;" title="' + CrannyWord[lang][0] + '"> ' + hid_res + '(' + teuton_bonus(hid_res,1) + ') ' +
	'</div>';

	document.getElementById('res').innerHTML = res_output + cranny_res;
	document.getElementById('cranny').addEventListener("click", set_race, true);
}

function set_race () {
	gaul = GM_getValue('gauls');
	if (gaul == '1') gaul = 0;
	else gaul = 1;
	GM_setValue('gauls',gaul);
	build_res ();
}

build_res ();



