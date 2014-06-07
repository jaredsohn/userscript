// ==UserScript==
// @name           h
// @author         f
// @description    Pig
// @credits        Abg
// ==/UserScript==


	}
			
		if (donStatus == 'Train') {
			
			}
			
			moveFirstN(donBought);
			document.forms[1].submit();
		} else if (donStatus == 'buy') {
			window.location.assign('http://economy.erepublik.com/en/train/');
		} else if (donStatus == 'stop') {
			eRAdon['status'] = 'done';
			eRAdon['offer'] = '0';
			eRAdon['exists'] = 'no';
			writeSettings(document.userid + '.Donater', eRAdon);
			alert("Autodonater finished!");
		} else if (donStatus == 'errorMoney') {
			eRAdon['status'] = 'done';
			eRAdon['offer'] = '0';
			eRAdon['exists'] = 'no';
			writeSettings(document.userid + '.Donater', eRAdon);
			alert("Error! Not enough money!");
		} else if (donStatus == 'errorNone') {
			eRAdon['status'] = 'done';
			eRAdon['offer'] = '0';
			eRAdon['exists'] = 'no';
			writeSettings(document.userid + '.Donater', eRAdon);
			alert("Error! No offer with that ID!");
		} else if (donStatus == 'errorCountry') {
			eRAdon['status'] = 'done';
			eRAdon['offer'] = '0';
			eRAdon['exists'] = 'no';
			writeSettings(document.userid + '.Donater', eRAdon);
			alert("Error! Buying account is not from same country as offer ID!");
		}
