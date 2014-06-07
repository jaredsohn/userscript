// ==UserScript==
// @name           Boots To Asses 2
// @include        http://unleashedarena.net/battle_member.php
// ==/UserScript==

function autoBattle() {
	try {
var btnContinue = unsafeWindow.document.querySelector('form[action='battle_member.php'] input[type="submit"][value="Battle"]');

		if (btnContinue) {
			btnContinue.click();
		}
		
	var btnContinue2 = unsafeWindow.document.querySelector('form[id='battle'] input[type="submit"][value="Attack!"]');
		if (btnContinue2) {
			btnContinue2.click();
		}
	
var btnAttack = unsafeWindow.document.querySelector('form[action='battle_member.php'] input[type="submit"][value="Re-Battle Member"]');
		if (btnAttack) {
			btnAttack.click();
		}
		
		}
	catch (e) {
		unsafeWindow.console.warn('Exception: ', e);
	}
}

autoBattle();