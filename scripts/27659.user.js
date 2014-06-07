// ==UserScript==
// @name           Cheggit remove listings
// @namespace      http://userscripts.org
// @description    Remove listings based on tagnames and/or usernames
// @include        http://cheggit.net/browsetorrents.php*
// @include        http://*.cheggit.net/browsetorrents.php*
// ==/UserScript==

	var userslist = new Array("olympushic", "pete265", "Tapestry", "mardi72", "SnowyDog", "Kevlar", "beefiboi", "christinafan", "paulh430", "vincenzo", "Weasel404", "smokintony1", "dasatelier", "greuelz", "orclordz", "shemalelover1975", "hocy", "shorthairlover", "gaocan390", "Maetel", "Dominion300", "agathorn", "hattertim", "upgrader", "inckurei", "12mpro", "Bomkia", "kaanod", "smokinspartan", "jordgubbe", "thanoz", "Tazyizan", "wrightm100", "webbyno1", "ilu03240");

	var tagslist = new Array("fantasy.rape", "anal.creampie", "anal.only", "mommy", "mother", "bondage", "scat", "rim", "pregnant", "mommy", "gape", "mommy.got.boobs", "mom", "sister", "milf", "granny", "old.man", "dirtyoldman.com", "policeman.net", "blindfold", "i.love.anemia", "myfriendshotmom", "she male", "granny", "transexual", "transsexual", "policeman.net", "bizzare", "bizare", "midget", "midgets", "puke", "pieces.of.shit", "transvestit", "milfs", "mature", "gaping.asshole", "rimming", "asshole.fever", "funnybdsm", "bdsm", "fat", "curd.cheese", "plumper", "gang.bang", "anal.creampie", "femdom", "all.anal", "gape", "mommygotboobs", "prone.bone.anal", "cocaine", "milfslikeitbig", "milfslikeitbig.com", "pleasebangmywife", "buttsandblacks", "anal.driller", "mifl.next.door", "milf.next.door", "rectal.intrusion", "ladyboy", "shemale", "bubble.butt.mothers", "all.anal", "anal.gate", "pregnant", "mdfd", "teen.anal.pounding", "momsteachingteens", "cum.in.ass", "semi.milf", "anal.gape", "buttplug", "double.penetration", "anal.beads", "rim.my.gape");
	
   	var i, ii, bb, bbb, test, test2;
	var newTry = document.evaluate("//td[@class='tabletext']/span[@class='tablesubtext']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nlcond = tagslist.join(" ");
	for (i = 0; i<newTry.snapshotLength; i++) {
		var bb = newTry.snapshotItem(i).getElementsByTagName("a");
		for (ii = 0; ii<bb.length; ii++) {
			bbb = bb[ii].textContent.toString();
			//test2 = new RegExp("\\b" + bbb + "\\b","gi");
			//test = new RegExp("\\b" + "no." + bbb + "\\b","gi");
			test2 = new RegExp("(^| )" + bbb + "($| )","gi");
			test = new RegExp("(^| )" + "no." + bbb + "($| )","gi");
			if ((nlcond.match(test2)) && (!nlcond.match(test))) {
				newTry.snapshotItem(i).parentNode.parentNode.style.display = "none";
				newTry.snapshotItem(i).parentNode.parentNode.style.visibility = "hidden";
			}
		}
	}
	
	var nn = document.evaluate("//table[@class='torrentlist']/tbody/tr/td[@class='tabletext']/a[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nlcond2 = userslist.join(" ");
		for (i = 0; i<nn.snapshotLength; i++) {
		test = new RegExp("\\b" + nn.snapshotItem(i).textContent.toString() + "\\b","gi");
		if (nlcond2.match(test)) {
			nn.snapshotItem(i).parentNode.parentNode.style.display = "none";
			nn.snapshotItem(i).parentNode.parentNode.style.visibility = "hidden";
			}
	}