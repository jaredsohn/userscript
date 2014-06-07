// ==UserScript==
// @name           Mob Wars Fight
// @namespace      http://apps.facebook.com/mobwars/fight/
// @description    highlights mobsters you might (not) want to fight
// @include        http://apps.facebook.com/mobwars/fight/
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function log(message) {
	// GM_log(message);
}

window.addEventListener( 'load', function( e ) {

	var lobjCurrentBossRow, lstrCurrentBoss, lstrRegEx, lobjRegExResult;
	var lobjFoundBossLevel, lintBossLevel, lintMyBossLevel;
	var lintMobSize, lintMyMobSize;
	var lintBossLevelDifference, lintMobSizeDifference;
	var lintAcceptableMobSizeForStrongerBosses;
	
	var lintMaxMobSize;
	
	var lintFivePercent, lintThreePercent;
	
	var lobjBossRows = xpath("//div[@id='app8743457343_content']/table/tbody/tr");
	var lobjBossNamesAndLevels = xpath("//div[@id='app8743457343_content']/table/tbody/tr/td[1]");
	var lobjMobSizes = xpath("//div[@id='app8743457343_content']/table/tbody/tr/td[2]");

	var lstrLevelDiv = (xpath("//table[@id='app8743457343_statusMenu']/tbody/tr/td[6]/div")).snapshotItem(0).innerHTML;
	lstrRegEx = /Level:[ ]*([0-9]+)/;
	lobjRegExResult = lstrLevelDiv.match(lstrRegEx);
	lintMyBossLevel = +lobjRegExResult[1];
	
	var lstrMyMobSize = (xpath("//div[@id='app8743457343_header']/div/a[1]")).snapshotItem(0).innerHTML;
	lstrRegEx = /\(([0-9]+)\)/;
	lobjRegExResult = lstrMyMobSize.match(lstrRegEx);
	lintMyMobSize = +lobjRegExResult[1];
	lintFivePercent = Math.ceil(.05 * lintMyMobSize);
	lintThreePercent = Math.ceil(.03 * lintMyMobSize);
	
	
	log("My Boss, level=" + lintMyBossLevel + ", mob size=" + lintMyMobSize);
	
	for (var i=0; i < lobjBossNamesAndLevels.snapshotLength; i++ ) {
		
		lstrCurrentBoss = lobjBossNamesAndLevels.snapshotItem(i).innerHTML;
		
		lstrRegEx = /, Level ([0-9]+)/;
		lobjRegExResult = lstrCurrentBoss.match(lstrRegEx);

		if (lobjRegExResult) {
			
			lintMobSize = +lobjMobSizes.snapshotItem(i).innerHTML;
			lintBossLevel = +lobjRegExResult[1];
			
			lintBossLevelDifference = lintMyBossLevel - lintBossLevel;
			lintMobSizeDifference = lintMyMobSize - lintMobSize;
			
			log("Boss #" + i + ", level=" + lintBossLevel + ", mob size=" + lintMobSize + ", level diff=" + lintBossLevelDifference + ", mob size diff=" + lintMobSizeDifference);

			lobjCurrentBossRow = lobjBossRows.snapshotItem(i);
			
			//my boss is stronger
			if (lintBossLevelDifference > 1) {
			
				//and my mob size is bigger than theirs
				if (lintMobSizeDifference >= 0) {
					log("   My boss is same/stronger, their mob is smaller");
					lobjCurrentBossRow.style.color='darkgreen';
				}
				
			
				//and the mobs are within +/-5% members in size
				if (Math.abs(lintMobSizeDifference) < lintFivePercent ) {
					log("   My boss is stronger, acceptable mob size is " + (lintMyMobSize - lintFivePercent) + '-' + (lintMyMobSize + lintFivePercent) );
					lobjCurrentBossRow.style.color='green';
				}
			}

			//my boss is weaker
			if (lintBossLevelDifference < 1) {
				//but their mob size is (3% of my mob size)*levelDifference smaller...
				lintAcceptableMobSizeForStrongerBosses = lintMyMobSize - (lintThreePercent * Math.abs(lintBossLevelDifference));
				log("   Acceptable mob size=" + lintAcceptableMobSizeForStrongerBosses);
				
				if (lintMobSize <= lintAcceptableMobSizeForStrongerBosses) {
					lobjCurrentBossRow.style.color='blue';
				}
			}
			
			//Now that we're done highlighting bosses we may want to fight, let's also
			//highlight bosses who might have room in their mob for me to join...

			lintMaxMobSize = (lintBossLevel < 50) ? 500 : ((lintBossLevel - 50) * 2) + 500;
			log("max mob size for level=" + lintBossLevel + ' is ' + lintMaxMobSize);
			
			var lobjSpanMaxMobSize = document.createElement('span');
			lobjSpanMaxMobSize.innerHTML = "/" + lintMaxMobSize;
			//log(lobjSpanMaxMobSize.innerHTML );

			lobjMobSizes.snapshotItem(i).appendChild(lobjSpanMaxMobSize);

			if (lintMaxMobSize > lintMobSize) {

				//can we find the Facebook ID?
				
				lobjRegExResult = lstrCurrentBoss.match(/user_id=([0-9]+)/);
				if (lobjRegExResult) {
					
					var lobjSpan = document.createElement('span');
					lobjSpan.innerHTML = " [<a href='http://www.facebook.com/addfriend.php?id=" +  lobjRegExResult[1] + "' target='_blank'>Add Facebook Friend</a>]";
					//log(lobjSpan.innerHTML );
	
					lobjBossNamesAndLevels.snapshotItem(i).appendChild(lobjSpan);
					
				}

			}


		}

	}

},false);
