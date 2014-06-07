// ==UserScript==
// @name           Ikariam Highscore Utilities
// @namespace      holyschmidt
// @description    Collection of highscore utitlies.
// @include        http://s*.ikariam.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://www.betawarriors.com/bin/gm/57377user.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://www.betawarriors.com/bin/gm/62718user.js 
// @version        0.07
//
// @history        0.06 Fixed bug with other script incompatibility.
// @history        0.05 Options dialog implemented to turn on/off individual score quicklinks.
// @history        0.04 Added links on island view for quick lookup of player highscore values
// @history        0.03 Fixed include line
// @history        0.02 Changed default score type selection
// @history        0.01 Initial Release
// ==/UserScript==

ScriptUpdater.check(65961, '0.07');

Config.scriptName = "Highscore Utilities";
Config.tabs = {
	"Quicklinks":{
		html:'<p>Which highscore types do you want quicklinks created for?.</p>',
		fields:{
		}
	},
};

HighscoreUtilities = {
	init:function() {
		// Add Styling
		GM_addStyle('\
			#GF_toolbar ul li.highscore { position:relative; }\
			#GF_toolbar ul li.highscore:hover { padding-bottom:20px; }\
			#GF_toolbar ul li.highscore #IkaHighscoreFlyout { display:none !important; }\
			#GF_toolbar ul li.highscore:hover #IkaHighscoreFlyout { display:block !important;  }\
			#IkaHighscoreFlyout { background-color:#FFF5E1; padding:.5em; padding-bottom:0; border:1px solid #666; position:absolute; right:-80px; margin-top:2px; width:auto; }\
			#IkaHighscoreFlyout h1.header { font-size:14px; font-weight:bold; margin-left:0; padding-left:.2em; display:block; margin-bottom:.5em; }\
			#IkaHighscoreFlyout table { margin:3px; }\
			#IkaHighscoreFlyout tr { height:30px; }\
			#IkaHighscoreFlyout input { margin-left:2px; }\
			.IkaHighscoreLink img { width:15px; height:15px; }\
		');

		// Add highscore options.
		HighscoreUtilities.AddHighscoreOptions();

		// Add the highscore "flyout" control.
		HighscoreUtilities.AddFlyout();

		// Attach island listener(s).
		if ($('body').attr('id') == 'island') {
			$("a[id^='city_']").click(HighscoreUtilities.UpdateCityInformationWindow);
		}

		// Set timeout to exercise update, in case city selection was made during onload.
		setTimeout(HighscoreUtilities.UpdateCityInformationWindow, 500);

		// Create options link.
		IkaTools.addOptionsLink(Config.scriptName);
	},
	AddHighscoreOptions:function() {
		for (var type in HighscoreUtilities.Images) { 
			if (HighscoreUtilities.Images[type] != null)
			{
				Config.tabs.Quicklinks.fields[type] = {
					type	: 'checkbox',
					label	: HighscoreUtilities.Text[type],
					text	: null,
					value	: type != 'score',
				};
			}
		}
	},
	AddFlyout:function() {
		$('#GF_toolbar ul li.highscore').append('\
			<div id="IkaHighscoreFlyout">\
				<h1 class="header">Highscore Lookup</h1>\
				<form action="./index.php" method="POST">\
					<input type="hidden" name="view" value="highscore" />\
					<table>\
					<tr><td>\
						<select name="highscoreType">\
							<option value="score">Total score</option>\
							<option value="building_score_main" >Master builders</option>\
							<option value="building_score_secondary" >Building levels</option>\
							<option value="research_score_main" >Scientists</option>\
							<option value="research_score_secondary" >Levels of research</option>\
							<option value="army_score_main" selected="selected">Generals</option>\
							<option value="trader_score_secondary" >Gold supply</option>\
							<option value="offense" >Offensive points</option>\
							<option value="defense" >Defence points</option>\
							<option value="trade" >Trade high score</option>\
						</select>\
					</td></tr>\
					<tr><td>Player name <input type="text" name="searchUser" value="" /></td></tr>\
					<tr><td><input class="button" name="sbm" type="submit" value="Submit" /></td></tr>\
					</table>\
				</form>\
			</div>\
		');
	},
	UpdateCityInformationWindow:function() {
		if ($('#information ul.cityinfo').size() > 0 && $('#information ul.cityinfo li.owner span').size() > 0) 
		{
			var plabel = $('#information ul.cityinfo li.owner span').text();
			var player = $('#information ul.cityinfo li.owner').text().replace(plabel, '').replace(/\s+$/, '');
			var links = '';
			for (var type in HighscoreUtilities.Images) { 
				if (HighscoreUtilities.Images[type] != null && Config.get(type)) {
					links += 
						'<td><a class="IkaHighscoreLink" href="./index.php?view=highscore&highscoreType=' + type + '&searchUser=' + player + '">' +
							'<img src="' + HighscoreUtilities.Images[type] + '" alt="" title="' + HighscoreUtilities.Text[type] + '"/>' +
						'</a></td>';
				}
			}
			$('#information ul.cityinfo').append(
				'<table style="margin-left:auto; margin-right:auto;"><tr>' + links + '</tr></table>'
			);
		}
	},
	Images:{
		"score"	: null,
		"building_score_main" : 'data:image/gif;base64,R0lGODlhGQAZAMZ/AExuN9+5h9SVYvPMj7ySbMmJWzUsJOqxdVY5J5plRVhUU0o0JqYYGYdWOjYmG2pIMjlUKruyjigbFG5dSaNpR/Lmt3FoVHRNNRcCAhkmFHpVPDRLJubarlxINQAAAN3PpNGkdlQLDHmcVZeNcKZ6WWY1J4dcQGVDLishGnMQEbSGX2SHR7h5USIyGtXLyPfy6IV5dhUUDh0XE0EpHbKop4dlSpRaPC5EImdhYoGjWpt1WHanVqublLN0TkEuImWXSqtvS5lsT83CmyIBAcGAVf79yJeOilt5QF4+K5NgQjgEBD1bLRANCl6DRGpROwcSB1ZUPUhiMqqBYZt9Tqugf2MkHA4BAYR4YEU5LoBQNvzfnyIWEEBiMDMeFgMNBHZELrFtSCo+H4auXwsJB3J9U6FcPE9GOd+faXJuP4dvRVI+L/O/gE8yIqNjP45rT5VHNt/W0nGTUKJxUDBWKFN3PAYHBm+eUI1ELcW8uoqYVjMwHB0PDDw7PmuMS0xKSv///yH5BAEAAH8ALAAAAAAZABkAAAf+gH+Cg4SDER6IV4WLjH+Ijx5YjYIVWlpCg2opKQwMIVYejB8fAxMoFhY+gkFrAwdnD0whEYUqrAcCLLYkKgI+RAIXRBRAHgEBAwGCYDwaSBomJg8ISAgHTg8OUiY9MyoEBSq0QVJITkgnCAhsDihrCcAsAkljHRoXF3J/GndqHQsLZqhRg0KCgxPpCkib4WPBvweCEjBhEoPJmDp1LtZZ8ODBiQsxZIgUyUjGAw0NEiR50KNAAxRAqEwiJAPBgywNshQo08DGBg0FZhKKYDFBARZg7OwoIODAnwgvlAj9k6BljxxJ2AA5o+KFCw8uhNqgwAJAnxMejPKAgccFD6GXDxIk4BJlARMkLGgoUICD1iQhDxqc2AAhjAwhGvj42Ss0AwITXDaEaZEhgYAhJvhMpdxiiWTKWjxYCTp1w4YbYSZneDLgRAEdUytsiLOBC+obLYhcKIBJKJ0bS5aIENEkShgiCNRM/fNjQ+c4xAEoofJheZwdSyDMFtEHAITlgzpwWQJARI4dTQCAF+RADxdMCC48qb4oEAA7',
		"building_score_secondary" : 'data:image/gif;base64,R0lGODlhGQAZAMZ/AGVaSao0DvezVbBvMbVEF+fYxpaRh5aKev74xrO4refVuNrUx9WSVTEaEMQ3EJEuDKSYhde6idS7mOTKqMWoh2luKYR4ZdnGkeytd1EoGMpHF8W6quG4ivbkyfjqvamXerqjhXYqDfNiJbamU9NmPqxUKse0mLepk+VVHNhYI7upb8mmfZSHRf7nqeTEmabFspiEaqeIZunTq9XKt4l1WP//+FFrGYuFeOV3TjNGE+uYcNm0eJOrl+NKFv//5KONdv/+29eleaumlnh0WrGchMSskZZJH7WLZGtWOvnUhrmSZoeCakQZDsCddWRHKJFnQ+fGg8yxjKgBAZSVe/l5Oq6jitupZ2h4HUhCOamXWfN3F/3bktHt6kFZFm9gSqyQbryxn+jQntSugeno4eYAAF9oJXtWKfzIeMi0et3QvNubYlg9KImWeufSisy0aZG6oambQF9URPrEtfbKkfK4p9iyUPHit/bv3J1rUnh9M6i2n9+9YuuAXvbuz8Dh1P///yH5BAEAAH8ALAAAAAAZABkAAAf+gH+Cg4SFGVIBhYqLhIdkUoyRgywDT5KXfwMZmJdmA0icjANmTxkNoYJ1UGZ/dXBmIUxZoTIaIgRODQNOIQ0snCsEwgQwBxkZTHGzlxgpDDgEGjFDcV9eADSXGikaAUYDJWBrSytIH9mMKFQaGsIaYH13Yi5EIBMdD3WFLiIoBA4aHCxZ8kPBhCZrUqDoJyxFIQNCqKCgMcUMgVghMg7gIKJfjwkmIgwaMsJEHC80vtxB0QMFCTNxJoTBkeLOhiOWBNHAsgILEiReDowR8QUJiX4BSKw4ckAIjD9JCiQTEwcLli8gnjjx0s9Bjx4aFujJs8SSigIL+oTAU+LLEyyWE6ikeADQAZ4hQ8p0MRFj0AkIEzjImRBBgIAqMzT0KJHAyxIvXXJ0+fHjDwIEdppseQCFz5koQ36MwVsDJeTIlf/0iecCQQsMZ3zEgBGlCgCURD5U7fJrkI87BVpcRlBH6hAwQ7BQqHKgzBUseQoBAVKjDQd6J4R0iEHZC7UrklYg8AFEggwDN35AoNYblSA0G0bAiRQIADs%3D',
		"research_score_main" : 'data:image/gif;base64,R0lGODlhGAAVANU/AP/dZc/Ks/rIjLixsv/++25naVmPocGvnIVWNtXd0+bYyP/7u7F5UfHYonBGLSxba5FkSEZoc46Ji+Le3GUqD/386857SFAnD2ZZTk01J4R2alFMR69pPCYXD/rszHZsYP21crKVdNXFgeXq4FZ7iKGWhqqqoJuNchU6S7amdOWTWhgFBGc7IRImMTgfEtCLWU0FAH85F76FXjgpJP//2AAbLp+cnuzm0b/Ozu7u4f7tvY1FIptbMuaSZAAAAP///yH5BAEAAD8ALAAAAAAYABUAAAb/wJ9wSCQGBEhQIFFsFgMqUE/F4UluTgKh+VmxWBCIa1VynhgCGrHiwyBamEthQNT+Rp0OjFERVhA8HDIMCHNDFR4NIlt3Pj59CjsfBTEWPBg2fT8ENwIiIn0lATMrBCEFBSU2LJcaOUMjOjqfGxKbPgcBPCwXEAMDBR8TPw0KPwE6CwwaNFsmMwcsDAMOAxMZKyM/Gz5CASkLig1CHQwZGQgsJTgOFK8EPh8EGxMhIg0ADQ0rECwIEBY0SHDBIYQ3Hx22EDChIQUAFnk2uGAhqMUKBjyM/SjhY4eHLco6OMIgocCMci/+cQhwKAOMHQ6wITxAoIWGARIZvIDAg0mdgQA+XGBI4KzGHA1B/7HQSOQGBRYnhBCI0KKAgg0UXPjIcEETEQ0XMgjVguKBBAUo/M3Y2kSAChfYYAhIUOOBiQMoIsSIQQGFtkMgQLiAG4MBDhQoSHyIYIAEhg0PfA4BSKFywgR5I2xgbKAzCpZ1PmjQYGOLgQcPIkQgoVp1iwBBAAA7',
		"research_score_secondary" : 'data:image/gif;base64,R0lGODlhDQATAMQfAP/+RP/lKfPLJ/7JH/7XJo6Idf/rMv/3Ku3oN+zqz//9POrpRv//M6KahrWvluvFKpuTft68MgUGCcC4nt/HNKqiiqakl9vZT+3sVOnWMu7ZL//1NP//UMzFp/r2QAAAACH5BAEAAB8ALAAAAAANABMAAAWN4Cd+hhEExKhunrKZqaoAtGsQw7jRHKAwG1TOMPNwegxGQDAYED0XDGaBQGgizcBGsbgsqAjKo0kwJBGeswY3IAQMh+rhQGHn3AFNxkRh5kRtBA8CD2N/I02FEWMqIxYVFRAFFY0iDRMJHRANlR+RE5KUlQ0OCRMNnJUOEx0TEw6dBRAWDbKdHxK5EiohADs%3D',
		"army_score_main" : 'data:image/gif;base64,R0lGODlhFgAWALMPAPv03M+acqyJYtGzkm1HLJ9xTI5gM1IwIvPeuCQRCe3GknRgTNrKsd+hIOm4Yv///yH5BAEAAA8ALAAAAAAWABYAAATp8MkpVzpGlIAA/ZNwJeTlAB44DQRxjAnBAIqiPozQHvxBBArAIHBj+XotzrCQ+gh8u9avo+CoCtJSawAIXJoUncG38BkCA14CoRIYCIZFmbAQPOXgSaHAIxQWBhsMCAwObCABfGZJCgN1ViAMWDxYUiILAzZtLgeVBAIKPgMDNzo8OnQCc0M3BmMHqJ+qB1UqDICnLUEIGQoCkQNYFwELBQ4OxMYFH2kLCKaJe9ILyAEeAGUxDQ0FCRauflgGAAjLzy8Exw0EJSR7Alw0OAwkcAQNGiXwCA63AAwPCDnaAKrOsSAoRqEAEAEAOw%3D%3D',
		"trader_score_secondary" : 'data:image/gif;base64,R0lGODlhEQATAPfuAP7/X/7/Zv/oQv/RK/7/d/m4Bf30qP/WK//eJP2/B/7/e//BCfy9CPzot//sTvi3B/34jv//gv/5TPu6BP/5Vv//if/IHf/9Zv/dLv7/av2+Bf/tTv7+e/77f//LEP/IC//tS0UjDv/cLf/tSP7/cP7/c/7DFP7/f/7/Wf/kPPvot//mP9mbHf6/Av/ySfrdnf/uTvi4Bv/0Vfe6FP/wS//xUP/aQv/cJ5BSHfu7Bv/9a//rOvvmuf/SKv/SKP/pP//cP7+LOvvmuvrGNv/pV/zurv/8X/u/E//OJPO0E+u+Zv/yXP/gTP/3Wv/lSP/hS///hCcXDL+RQN2dIf7EG/76jvzotf/AAf7/a/3zpf/SI/31oP/VMeipDf/lO/78eP/OEP7/fv3IK6eOa+2vHvTFR//zaf/rRf74mZhqH//3Z/7JL//qTpx2P//aOv/VQfzptv7/ZP74osOsieO5Uv3wqf//i//KCWY0FbGLSq+NTmk1Ff/1TPnjtP/wRf/xRv7BDP/LHP/UMP/eQf/RJ/78hv7/eseNIP76l08oEP/wVv/IJP/rav/LJv7/dfzBF//3Vv/hN5tcIP7/bv/9Y/y8Av/7X//oSf/6ZP7/Y/3zmf/sUv/dMv73nXQ+GIBQGv3yrv75mWZLEv/XJv/3S/u7A//NGu/Jef76j++tD//OKP7EFv/fOP/tRP/iOKByJf74l//9ZN+gJP//lf/EE//1Tv/0U/u+Ef/GE/3ADPvnuP30pv/8UP/cQf/ePP/yU9qfGf/dI/7/YPXfsv/6WvzrtNaXKP/eNHpAGf/2VfHZnv/ZN//6UvrkuvO2GvvNVcu5X///jv/yS//9hvrisv7/Z//hP9vBi/29Av7/af/pMv/VH/zusfzrqfa1CP/XEP/sT/75kv/2XbaKUu+vCuS4NP/mN/7/XPm4Bv/SH/nitP/WPvu8Cf/8WvvluwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAO4ALAAAAAARABMAAAj/AN0JHOiuWJYqHSDUGUaQoC4DHEYcaSSgHbQ5Dd3BCQXuGwJfFAAMsCRqDMEGiFRVWkCpggJHSHqVi3JNoBA5gmJoYGSHwIkKbgbU+KRHIChFVwDZmBUmU4YIQI5dmBLEnZVpYCys04HiHIAAWAZYiCWGjDsDpBZQWRJNQiRmk0DcIkQCwAYVhRDkMKHgjIhNnPwIYPADCoEv3Jq06LLmFzprtrxIC5SLVQRDEHaleECOwbIeFFY88jEBA6YAATSh0fJglYNkTmC4YFcKmyszXPh0Q4VrERFIAp4Y2TEhwQ0CSVI9cxfuwCAmAGQAiDPKm6kSM4zJeuFuS6s7f9g4TuAVoECBC0NwSFIisIg4Dx8OBDMnIYGwMngS5aEmkAesS7Rsk442tWTjzB4htNHHSZ2oQQMx1bzBAjKejKNORu4oQwcwh6TxihSnNNNQQAA7',
		"offense" : 'data:image/gif;base64,R0lGODlhEAAQAOYAAP/bAC0QDf/XAOC4M+GnDv//AOC5M//WANqgDP/lAJ5EGdGaDP/TAHsXBUwAAPm5D9eeDOatD9GZDG0pKfv08+C9MzQAAPe8D/vCAP/oAPr29fPQD6RSJv/5AI1ENv/MBPLKD//IAM2WDOK8M/ft7Oq4DwUAAvS8AAAAAPO8AOewD//hAP/1AP/kAI1FPf/sANugDP/ZAP/OAP/NAPrCAP/VAPy+BN2jDunAWe64AP/SAO/KD//MAN6qFf/FAOG9M/XRGuSgdf/tAOW2Of/QAP/0APGxGeOsD+HBM7JfKv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEoALAAAAAAQABAAAAd5gEYJCSNKhoeIhjYPLRk/iZAfDBdFLEiQiDg1RCAFHRWYhzcHMhsFQgahhggCMzsvK6mqMDE8JQAAA6pKrD4qB7m7ECE0EQLBSaELGClHAkBByconOT0ESRO7IkPXFruGHkkOKNKhSUkNJAEBSRSqGocmARzfhwougQA7',
		"defense" : 'data:image/gif;base64,R0lGODlhEAAQAPcAAPY0It7VzaJ2WJp1XfM3DN3Uzb6rnbiad/Q4Ce6NLufFH/Y8JKV8Zqd+ZcCdRvRKLZ98aKZ5UKaIccOwo9ueDupYDPFSG7mRW+7p5Kp8V9y9E/XpLKuQe+poCaR6YriFSPPDDfnAlu94JfONL6BxUfKFLZ58ZPnQruDYF+5/HceMMOt5E5dxVvH7NKV5XK2MUad9XOZtDv2JaPM8Gd67D6VwPeiQF93SytLGvdvRyfSxPO+IIvNNDNqeH/hrHsmPOeTb1MCHN/dOF7uVc8hsDbeBGbuYe/huavH0T/J+IL6ol7mMc8WhN/PJC9ivhJ53Xv3bl+OHM/WfS6J6X+idGZhyWOa3GNy4E8+tENecC/uxHuC+HMSQR7aAQ/S5ReKqRuzn4trOxb9/IOzVj/b0VPLv7PaSjvqCh++oH8uaDsGPVfYWAK6KTfU5JvldMJl2X7mDSfcvC+fHH+5ZCqWHdL6rn96kE/X4OsKeRN+jEM6yUZ90U/liOe5HB+22bepBIPObLubBH+bVG7yUXf96GO+NFJtvT/TAN6GBa/fAGJ94XeevHuvCHuqEENOeFd+fJ9GRCPbDTaWCbaF4W9ivkLudSrqll+22EtyhDfrUIvfHFfPRJOejFfn/yPsHIve7i7COQOGsEOvxPuS+mufeJKJ+bMaNDauFaPQpGu5PC8WxpJxyU6F2SOiPEqKFb5pzXLyEKfzBPfqQYN21GZ9zWfVOJOhnEfL5Qvj5Z/OxF/n+6ufJG6F0WfjZR9idDNzXEf7QMPRJKuejGpd0V/M9E6t/SLCUgO1QCOunPNu1ivTy7/+BGOrGIfPlLdy3Dah4VOpiI/qYk/C7FbmVfNKZGp91W/HcKfn/cvYzIP88GP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANoALAAAAAAQABAAAAj/ALUJ1IbD1RQGHl7VUTawoQFaQ5yMSjYIBgQMDbVVOTAmlqYmIBIdqsQizEAJS2RouYNEFClBlwj9GAZGW4EGUNY86PRJSgorizwtA1WqDCJKwHqdOHPEDCAEK5hJe7RnQjU/ma7JiqarTQI5BIQx4lRjwDQvG3DxCRGMGDYRhWwpyANHgBEdzci4iTQDwIIdjWJs8aXGxSlkm24JKTEiSS0UqVrNgtRl0psvuVpYi2PjV6gKc7CkoVaMjqULaHxAo8LjWJ8OV/4QYcIrh0Y92SwE2kXDmQZHqKK8UCXwxioHPexQwJTFVBE8bCQ1BKKIVRAVYmBx+RDBWEaBSkyQCcjwzBCHAA0DAgA7',
		"trade" : 'data:image/gif;base64,R0lGODlhIgAUANUAAJhkKHBKHvbbtXg8Fch0L8SCM66Yd3tTIoJDF7h8MalyLCgZCat5NOqKOaSHWJt6ULuEN5JXIcimebloKaWdiVo2FjYgDGNGIYRaJPyXPT8rE49iKKBtN0szF4FWIaFsLHVfRaJZId7EoaxsK5ZpLOCEN3VPIUYnDhoRB4pVIaFkJJ9mK61gJYRdK29WOadpKbJ4MIldJIxfKY5OHKhtKJdRHVAsEZxvL4FPIP/Mmc20jbymg8aGN2VCHYJYIv///yH5BAEAAD8ALAAAAAAiABQAAAb/wN+PwVDQjkakkbR5uEAuoXRK/fGuWGyicIUpSBWTqUoWclZogDq9Gn1lrc6lVybfmJsWRu87+DFiJhoXFVUiZRCJCYuMMFsQDHcdAXRUIYdVXi8qnJudbmgycxdVIQQCVXqBqwEHGB6BHbKlE6dURR9seTFwMX0mhDYDwwMIxTUEJahWPBXOzxU9Pa0pEdYBGhUnxAjdCKYlDagPMFnm5ijpJ8LF3t/JGRk5BgkAfff4+Oko69zdMyzgZZBAb0W+g33SLejX7l/ABhkI/JAQSZrFixcVMnQHcEKDCUJ2QCCB8OCCkxu91ajFQgq9GyXzKbRAs6aFBQEjGHD5JSa+QAUoFtDUoGGoiwkzdkyhuAGjU2knhcoiShQEgp1TRCT44POX0KFTbXSg8ICMDgZdfWCow/aHA18e4sqdO6ZtlSAAOw%3D%3D',
	},
	Text:{
		"score"						: "Total Score",
		"building_score_main"		: "Master Builders",
		"building_score_secondary"	: "Building Levels",
		"research_score_main"		: "Scientists",
		"research_score_secondary"	: "Levels of Research",
		"army_score_main"			: "Generals",
		"trader_score_secondary"	: "Gold Supply",
		"offense"					: "Offensive Points",
		"defense"					: "Defensive Points",
		"trade"						: "Trade Score",
	},
}

HighscoreUtilities.init();
