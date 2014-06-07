// ==UserScript==
// @name        Place_Loop
// @namespace   Place_Loop
// @description Place_Loop
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include     http://www.placelibertine.com/fiche.php?membre=*
// @version     1
// @grant			GM_log
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_addStyle
// ==/UserScript==

if ($('a[title="Résultat suivant"]').length) {

	var bLoop;
	var CheckAutoPillage = ' <div class="CheckAutoPillage"><input type="checkbox" name="CheckAutoPillage" class="CheckAutoPillage-checkbox" id="CheckAutoPillage" checked><label class="CheckAutoPillage-label" for="CheckAutoPillage"><div class="CheckAutoPillage-inner"><div class="CheckAutoPillage-active"></div><div class="CheckAutoPillage-inactive"></div></div><div class="CheckAutoPillage-switch"></div></label></div>';

	var acss = '.CheckAutoPillage {margin:44px 0px 0px 5px;position: absolute; width: 66px;-webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;}.CheckAutoPillage-checkbox {display: none;}.CheckAutoPillage-label {display: block; overflow: hidden; cursor: pointer;border: 2px solid #8A8282; border-radius: 5px;}.CheckAutoPillage-inner {width: 200%; margin-left: -100%;-moz-transition: margin 0.3s ease-in 0s; -webkit-transition: margin 0.3s ease-in 0s;-o-transition: margin 0.3s ease-in 0s; transition: margin 0.3s ease-in 0s;}.CheckAutoPillage-inner > div {float: left; width: 50%; height: 15px; padding: 0; line-height: 15px;font-size: 10px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;-moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box;}.CheckAutoPillage-inner .CheckAutoPillage-active {padding-left: 8px;background-color: #4FD134; color: #FFFFFF;}.CheckAutoPillage-inner .CheckAutoPillage-inactive {padding-right: 8px;background-color: #E62B2B; color: #FFFFFF;text-align: right;}.CheckAutoPillage-switch {width: 16px; margin: 0px;background: #E3E0DF;border: 2px solid #8A8282; border-radius: 5px;position: absolute; top: 0; bottom: 0; right: 46px;-moz-transition: all 0.3s ease-in 0s; -webkit-transition: all 0.3s ease-in 0s;-o-transition: all 0.3s ease-in 0s; transition: all 0.3s ease-in 0s;background-image: -moz-linear-gradient(center top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);background-image: -webkit-linear-gradient(center top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);background-image: -o-linear-gradient(center top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);background-image: linear-gradient(center top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);}.CheckAutoPillage-checkbox:checked + .CheckAutoPillage-label .CheckAutoPillage-inner {margin-left: 0;}.CheckAutoPillage-checkbox:checked + .CheckAutoPillage-label .CheckAutoPillage-switch {right: 0px;}';
	GM_addStyle(acss);

	$("body").after(CheckAutoPillage);
	bLoop = GM_getValue("LOOP_PLACELIBERTINE", true);
	$("#CheckAutoPillage").attr('checked', bLoop);

	$('div.CheckAutoPillage').change(function () {
		bLoop = $("#CheckAutoPillage").is(':checked');
		GM_setValue("LOOP_PLACELIBERTINE", bLoop);
		if (!bLoop)
			window.location.href = $('a[title="Résultat suivant"]').attr("href");
	});

	window.addEventListener('load', function () {
		if (!bLoop)
			window.location.href = $('a[title="Résultat suivant"]').attr("href");
	}, true);
};
