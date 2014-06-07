// ==UserScript==
// @name           OGame Redesign: my ver
// @namespace      Vesselin
// @description    Shows random images in some cases when the expedition brings nothing
// @version        1.04
// @date           2009-10-26
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=showmessage") == -1)
		return;
	var animal = "";
	var blackHole = "";
	var superNova = "";
	var energyBeing = "";
	var hallucination = "";
	server = document.location.href.match (/http:\/\/([^\\\/]+[\\\/])/i);
	if (server)
		server = server [1].toLowerCase ().replace (/\\/i, "/");
	if      (server.indexOf ("bg.ogame.org/") != -1)
	{
		animal = "Освен няколко остарели малки животинки от непозната блатиста планета, експедиционерите не носят нищо по специално.";
		blackHole = "Последното нещо, което получихме от експедиционерите бяха няколко добре направени снимки на отваряща се черна дупка.";
		superNova = 'Експедиционерите направиха прекрасни снимки на супернова. Нищо ново не беше открито, поне има добри шансове за спечелване на състезанието на годината за "Най-добра Снимка На Вселената".';
		energyBeing = "Същество, изградено от чиста енергия направи така, че всички експедиционери само да гледат хипнотизирано в мониторите. Когато повечето от тях се свестиха, експедицията трябваше да бъде прекратена, защото имаха много малко останал Деутериум.";
		hallucination = "Е, сега поне знаем, че тези червени аномалии от клас 5 не само имат хаотични ефекти върху навигационните системи на корабите, но също така водят до масови халюцинации на екипажа. Експедицията не носи нищо ново вкъщи.";
	}
	else if (server.indexOf ("ogame.ru/")     != -1)
	{
		animal = "Экспедиция не принесла ничего особого, кроме какой-то странной зверушки с неизвестной болотной  планеты.";
		blackHole = "Последнее, что удалось получить от экспедиции, были невероятно хорошо получившиеся снимки открывающейся чёрной дыры крупным планом.";
		superNova = "Ваша экспедиция сделала замечательные снимки сверхновой звезды, однако по-настоящему нового она ничего не принесла. Но тем не менее есть все шансы занять первое место на конкурсе за снимок года во вселенной.";
		energyBeing = "Жизненная форма, состоящая из чистой энергии заставила членов экспедиции несколько дней подряд смотреть на гипнотирующие узоры на мониторах. Когда же большинство вышло из гипноза, экспедиции надо было возвращаться, т.к. были исчерпаны все запасы дейтерия.";
		hallucination = "Ну по крайней мере мы теперь знаем, что красные аномалии 5-го класса не только вносят хаос в работу бортовых систем, но также вызывает массовые галлюцинации у экипажа. Но больше ничего нового экспедиция не принесла.";
	}
	else if (server.indexOf ("ogame.de/")     != -1)
	{
		animal = "Außer einiger kurioser, kleiner Tierchen von einem unbekannten Sumpfplaneten, bringt diese Expedition nichts Aufregendes von ihrer Reise mit.";
		blackHole = "Das Letzte, was von dieser Expedition noch gesendet wurde, waren einige unglaublich gut gelungene Nahaufnahmen eines sich öffnenden, schwarzen Loches.";
		superNova = "Deine Expedition hat wunderschöne Bilder einer Supernova gemacht. Wirklich neue Erkenntnisse hat diese Expedition jedoch nicht gebracht. Aber man hat gute Chancen auf den Bestes-Bild-Des-Universums-Wettbewerb in diesem Jahr.";
		energyBeing = "Eine Lebensform aus reiner Energie hat dafür gesorgt, dass sämtliche Expeditionsmitglieder tagelang auf die hypnotischen Muster auf den Bildschirmen starrten. Als endlich die Meisten wieder klar im Kopf geworden waren, musste die Expedition aufgrund von akutem Deuterium-Mangel allerdings abgebrochen werden.";
		hallucination = "Nun, zumindest weiß man jetzt, dass rote Anomalien der Klasse 5 nicht nur chaotische Auswirkungen auf die Schiffssysteme haben, sondern auch massive Halluzinationen bei der Crew auslösen können. Viel mehr hat diese Expedition aber nicht gebracht.";
	}
	else if ((server.indexOf ("ogame.us/")     != -1) || (server.indexOf ("ogame.org/") != -1))
	{
		animal = "Besides some quaint, small pets from a unknown marsh planet, this expedition brings nothing thrilling back from the trip.";
		blackHole = "The last transmission we received from the expedition fleet was this magnificent picture of the opening of a black hole.";
		superNova = 'Your expedition took gorgeous pictures of a super nova. Nothing new could be obtained from the expedition, but at least there is good chance to win that "Best Picture Of The Universe" competition in next months issue of OGame magazine.';
		energyBeing = "A living being made out of pure energy came aboard and induced all the expedition members into some strange trance, causing them to only gazed at the hypnotizing patterns on the computer screens. When most of them finally snapped out of the hypnotic-like state, the expedition mission needed to be aborted as they had way to little Deuterium.";
		hallucination = "Well, now we know that those red, class 5 anomalies do not only have chaotic effects on the ships navigation systems but also generate massive hallucination on the crew. The expedition didn't bring anything back.";
	}
	else
		return;	// Unrecognized language
	// URLs (with "http://" stripped). You can add your own.
	var animals = [
		"kbf.my1.ru/ogame/001.png",
		"kbf.my1.ru/ogame/002.png",
		"kbf.my1.ru/ogame/003.png",
		"kbf.my1.ru/ogame/004.png",
		"kbf.my1.ru/ogame/005.png",
		"kbf.my1.ru/ogame/006.png",
		"kbf.my1.ru/ogame/007.png"
	];
	var blackHoles = [
		"www.physics.fsu.edu/outreach/Planetarium/BlackHoles.jpg",
		"machetera.files.wordpress.com/2008/07/black-holes.jpg",
		"dsc.discovery.com/space/top-10/gallery/black-hole-625x450.jpg",
		"www.odec.ca/projects/2007/joch7c2/images/huge-black-holes-stifle-star-formation_2.jpg",
		"faraday.fc.up.pt/cfp/Members/paccetti/black_hole_milkyway.jpg",
		"mentalfloss.cachefly.net/wp-content/uploads/2009/02/131_BlackHole.jpg",
		"www.newscientist.com/data/images/ns/cms/dn12853/dn12853-1_600.jpg",
		"jilawww.colorado.edu/research/images/binary_black_holes.jpg",
		"www.cosmosmagazine.com/files/imagecache/news/files/20071029_supermassive.jpg",
	];
	var superNovae = [
		"snews.bnl.gov/popsci/crab.jpg",
		"www.newscientist.com/data/images/ns/cms/dn12918/dn12918-1_600.jpg",
		"1.bp.blogspot.com/_sliORYDGkHg/RmjbC0z3-OI/AAAAAAAAAA8/u7QWElMc_88/s400/300px-Keplers_supernova.jpg",
		"www.waynesthisandthat.com/images/apcatseyelarge.jpg",
		"www.astronomy-blog.com/images/blogs/5-2007/supernova-324010.jpg",
		"www.spaceandmotion.com/Images/cosmology/supernova-star-galaxy.jpg",
		"www.theage.com.au/ffximage/2007/05/08/0905N_SUPERNOVA_narrowweb__300x386,0.jpg",
		"2.bp.blogspot.com/_Fml3glz_LYc/SDZWwrW7sgI/AAAAAAAAAlo/fbGBmnkekH4/s400/supernova.jpg"
	];
	var energyBeings = [
		"www.weirdwarp.com/wp-content/uploads/2009/04/future-spaceman-237x300.jpg"
	];
	var hallucinations = [
		"www.peoplespharmacy.com/siteimages/terrifying_hall_photo.jpg",
		"www.blissplan.com/unfurl/2009/05/visionheadaches.jpg",
		"lh3.ggpht.com/_ucD7tktLuHo/SkZdLu_mdII/AAAAAAAAAOw/V-9iyRdQVRA/38Hallucinations-3.jpg",
		"sherlog.nm.ru//pic/00054_qetog.jpg"
	];
	var interval;
	function waitForMessage ()
	{
		var msgId = parseInt (document.location.href.match (/&msg_id=(\d+)/) [1]);
		var divs = document.getElementsByTagName ("div");
		var pictureURL = null;
		for (var i = 0; i < divs.length; i++)
		{
			var currentDiv = divs [i];
			if (currentDiv.className == "note")
			{
				if      ((animal        != "") && (currentDiv.firstChild.nodeValue.indexOf (animal)        != -1))
					pictureURL = animals        [msgId % animals.length];
				else if ((blackHole     != "") && (currentDiv.firstChild.nodeValue.indexOf (blackHole)     != -1))
					pictureURL = blackHoles     [msgId % blackHoles.length];
				else if ((superNova     != "") && (currentDiv.firstChild.nodeValue.indexOf (superNova)     != -1))
					pictureURL = superNovae     [msgId % superNovae.length];
				else if ((energyBeing   != "") && (currentDiv.firstChild.nodeValue.indexOf (energyBeing)   != -1))
					pictureURL = energyBeings   [msgId % energyBeings.length];
				else if ((hallucination != "") && (currentDiv.firstChild.nodeValue.indexOf (hallucination) != -1))
					pictureURL = hallucinations [msgId % hallucinations.length];
				if (pictureURL != null)
				{
					var picture = document.createElement ("img");
					picture.setAttribute ("src", "http://" + pictureURL);
					var center = document.createElement ("center");
					var p = document.createElement ("p");
					p.appendChild (picture);
					center.appendChild (p);
					currentDiv.appendChild (center);
				}
			}
		}
		//clearInterval (interval);
	}
	//interval = setInterval (waitForMessage, 1000);
	waitForMessage ();
}
)();
