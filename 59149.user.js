// ==UserScript==
// @name           Fix Imperion NPC Trade Calcs
// @namespace      http://userscripts.org/users/110952
// @include        http://*.imperion.*/*
// ==/UserScript==

if (location.pathname.match(/\/npcTrade\//)) {
	
	//check pathname for resource values and if they exist get them
	if (location.pathname.indexOf('r1') != -1 &&
		location.pathname.indexOf('r2') != -1 &&
		location.pathname.indexOf('r3') != -1) {

		locR1 = location.pathname.indexOf('r1');
		locR1EndingSlash = location.pathname.indexOf('/',locR1+3);
		locR2 = location.pathname.indexOf('r2');
		locR2EndingSlash = location.pathname.indexOf('/',locR2+3);
		locR3 = location.pathname.indexOf('r3');
		locR3EndingSlash = location.pathname.indexOf('/',locR3+3);
			
		//Resource Cost of Item/Upgrade
		costR1 = parseInt(location.pathname.substring(locR1 + 3, locR1EndingSlash));
		costR2 = parseInt(location.pathname.substring(locR2 + 3, locR2EndingSlash));
		costR3 = parseInt(location.pathname.substring(locR3 + 3, locR3EndingSlash));
		
		costTotal = costR1+costR2+costR3;
		//calculate percentage of each total
		r1Perc = costR1 / costTotal;
		r2Perc = costR2 / costTotal;
		r3Perc = costR3 / costTotal;
		
		myRecs1 = parseInt(document.getElementById('mr1').innerHTML.replace('.',''));
		myRecs2 = parseInt(document.getElementById('mr2').innerHTML.replace('.',''));
		myRecs3 = parseInt(document.getElementById('mr3').innerHTML.replace('.',''));	
		
		myRecsTotal = myRecs1 + myRecs2 + myRecs3;
		
		tradeCalcRec1Val = Math.round(myRecsTotal * r1Perc);
		tradeCalcRec2Val = Math.round(myRecsTotal * r2Perc);
		tradeCalcRec3Val = Math.round(myRecsTotal * r3Perc);

		

		var recTextBox1 = document.getElementById('r1');
		var recTextBox2 = document.getElementById('r2');
		var recTextBox3 = document.getElementById('r3');
		var positions = ObjectPosition(document.getElementById('submitNpc'));
		var topOffset = positions[1] + 1;
		var leftOffset = positions[0] + 77;
		
		
		var str = '<div><table><tr><td><a class="buttonStd marginLeft15 interface_forms_buttons_standart" onClick="this.blur()" href="#"><span class="interface_forms_buttons_standart"></span>%</a></td></tr></table></div>';
		var div = document.createElement('div');
		div.id = "npcTrade";
		div.style.position = "absolute";
		div.style.display = "block";
		div.style.zIndex = 10000;
		div.style.top = topOffset + 'px';
		div.style.left = leftOffset + 'px';
		
		div.innerHTML = str;
		div.addEventListener('click', function(){
			recTextBox1.value = tradeCalcRec1Val;
			recTextBox2.value = tradeCalcRec2Val;
			recTextBox3.value = tradeCalcRec3Val;
			recTextBox1.focus();
		}, false);
		document.body.appendChild(div);
		
		
		
	}
}

function ObjectPosition(obj) {
    var curleft = 0;
      var curtop = 0;
      if (obj.offsetParent) {
            do {
                  curleft += obj.offsetLeft;
                  curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
      }
      return [curleft,curtop];
}

