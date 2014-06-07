// ==UserScript==
// @name           OGame: Expedition Pictures
// @namespace      Vesselin
// @description    Shows random images in some cases when the expedition brings nothing
// @version        1.02
// @date           2009-12-01
// @include        http://*.ogame.*/game/index.php?page=messages*
// @exclude        http://uni6.ogame.de/*
// @exclude        http://uni42.ogame.org/*
// @exclude        http://a*.ogame.*
// @exclude        http://b*.ogame.*
// @exclude        http://c*.ogame.*
// @exclude        http://d*.ogame.*
// @exclude        http://e*.ogame.*
// @exclude        http://f*.ogame.*
// @exclude        http://g*.ogame.*
// @exclude        http://h*.ogame.*
// @exclude        http://i*.ogame.*
// @exclude        http://j*.ogame.*
// @exclude        http://k*.ogame.*
// @exclude        http://l*.ogame.*
// @exclude        http://m*.ogame.*
// @exclude        http://n*.ogame.*
// @exclude        http://o*.ogame.*
// @exclude        http://p*.ogame.*
// @exclude        http://q*.ogame.*
// @exclude        http://r*.ogame.*
// @exclude        http://sirius*.ogame.*
// @exclude        http://t*.ogame.*
// @exclude        http://ursa*.ogame.*
// @exclude        http://v*.ogame.*
// @exclude        http://w*.ogame.*
// @exclude        http://x*.ogame.*
// @exclude        http://y*.ogame.*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=messages") == -1)
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
		superNova = 'Експедиционерите направиха прекрасни снимки на супернова. Нищо ново не беше открито, нопе има добри шансове за спечелване на състезанието на годината за "Най-добра Снимка На Вселената".';
		energyBeing = "Същество, изградено от чиста енергия направи така, че всички експедиционери само да гледат хипнотизирано в мониторите. Когато повечето от тях се свестиха, експедицията трябваше да бъде прекратена, защото имаха много малко останал Деутерий.";
		hallucination = "Е, сега поне знаем, че тези червени аномалии от клас 5 не само имат хаотични ефекти върху навигационните системи на корабите, но също така водят до масови халюцинации на екипажа. Експедицията не носи нищо ново вкъщи.";
	}
	else if (server.indexOf ("ogame.ru/")     != -1)
	{
		animal = "Экспедиция не принесла ничего особого, кроме какой-то странной зверушки с неизвестной болотной планеты.";
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
		superNova = 'Your expedition took gorgeous pictures of a super nova. Nothing new could be obtained from the expedition, but at least there is  good chance to win that "Best Picture Of The Universe" competition in next months issue of OGame magazine.';
		energyBeing = "A living being made out of pure energy came aboard and induced all the expedition members into some strange trance, causing them to only gazed at the hypnotizing patterns on the computer screens. When most of them finally snapped out of the hypnotic-like state, the expedition mission needed to be aborted as they had way to little Deuterium.";
		hallucination = "Well, now we know that those red, class 5 anomalies do not only have chaotic effects on the ships navigation systems but also generate massive hallucination on the crew. The expedition didn't bring anything back.";
	}
	else
		return;	// Unrecognized language
	// URLs (with "http://" stripped). You can add your own.
	var animals = [
		"strana.az/uploads/posts/2008-10/1224604130_001-2484.jpg",
		"strana.az/uploads/posts/2008-10/1224604152_002-2434.jpg",
		"strana.az/uploads/posts/2008-10/1224604148_003-2406.jpg",
		"strana.az/uploads/posts/2008-10/1224604175_004-2413.jpg",
		"strana.az/uploads/posts/2008-10/1224604130_005-2388.jpg",
		"strana.az/uploads/posts/2008-10/1224604150_006-2343.jpg",
		"strana.az/uploads/posts/2008-10/1224604164_007-2225.jpg",
		"strana.az/uploads/posts/2008-10/1224604110_008-2075.jpg",
		"strana.az/uploads/posts/2008-10/1224604198_009-1884.jpg",
		"strana.az/uploads/posts/2008-10/1224604127_010-1665.jpg",
		"strana.az/uploads/posts/2008-10/1224604194_011-1462.jpg",
		"strana.az/uploads/posts/2008-10/1224604134_012-1312.jpg",
		"strana.az/uploads/posts/2008-10/1224604141_013-1123.jpg",
		"strana.az/uploads/posts/2008-10/1224591363_005-2394.jpg",
		"image2.etsy.com/il_430xN.24424438.jpg",
		"www.toyarchive.com/STAForSale/NEW2001+/Aliens/FigBullLoose1a.jpg",
		"rookery2.viary.com/storagev12/932500/932750_4aed_625x1000.jpg",
		"danielladooling.com/sculpture/alienanimals/images/01_FD-3-front-view.jpg",
		"zuzutop.com/wp-content/uploads/2009/07/cute-animals-spiders-2.jpg",
		"s59.radikal.ru/i165/0910/8e/43e1f5738da9.jpg",
		"www.e1.ru/fun/photo/view_pic.php/p/49f7e1df2aebb699574c77e33aef1165/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/3aa3a1ecd0375ce2eadcae3c5fe591d7/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/335b058734f4dff9c29689999daaaebe/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/b54290a294f95c69bcfe2614c6cfa0cd/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/1bfaa5fd78260f94cd1351770bd01098/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/b589030028d77493f09980d090f8d481/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/2960616a0f76470685f2c2e92502d666/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/5f893667b88513cfef595dd93d7a1154/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/64210b374cf35fc60fa4cecced2cb59e/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/87dbdac4aa68b5b5f919acd1b9731df6/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/6c9225a9f2ecf1d2dec09fb5b8951e98/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/6a818efffb2daed6f27cc600b4df35b2/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/e61f1d2a2435a73ad7a1132f620cdd8a/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/578490fa907033f19f465fd7eddce866/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/81ab64fd32cf2aef8130c86878102b75/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/acffdf35dfad52e8cdf930d52823dcbe/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/f1fb27574c073dfd6251eb617cf0b410/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/1418756963feba2e9ba40550c7ee23c4/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/4ec066e05fd0124889e0a93cc300be3d/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/78d798bd63a826e9f41ff675c174cd81/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/0d88a78416bc3dc5d141305802c4830a/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/4b6d9f780284235efb8a9ad9e917a378/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/b57c759e6c792a8075838acd81e37405/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/efadd9b36302c4fe4c7e65e9d9cdc97a/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/bb165fe872c4de3fd2f1a74e8bf07f15/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/80768d7e03769f76726807e9e5d1750a/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/078a864d1f216e52b2f843c76a2309f8/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/f79ac2a311d8f66841e69e11bdd13280/view.pic",
		"www.e1.ru/fun/photo/view_pic.php/p/d0a81ab760cdb1f191581ce0efda09da/view.pic"
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
	trs = document.getElementsByTagName ("tr");
	var msgId;
	for (var i = 0; i < trs.length; i++)
	{
		var currentTr = trs [i];
		var pictureURL = "";
		if (currentTr.className == "exp")
			msgId = parseInt (currentTr.getElementsByTagName ("th") [1].firstChild.nodeValue.replace (/\D+/, ""));
		else if (currentTr.className == "exptxt")
		{
			var secondTd = currentTr.getElementsByTagName ("td") [1];
			if (secondTd != null)
			{
				var expTxt = secondTd.firstChild.nodeValue;
				if      ((animal        != "") && (expTxt.indexOf (animal)        != -1))
					pictureURL = animals        [msgId % animals.length];
				else if ((blackHole     != "") && (expTxt.indexOf (blackHole)     != -1))
					pictureURL = blackHoles     [msgId % blackHoles.length];
				else if ((superNova     != "") && (expTxt.indexOf (superNova)     != -1))
					pictureURL = superNovae     [msgId % superNovae.length];
				else if ((energyBeing   != "") && (expTxt.indexOf (energyBeing)   != -1))
					pictureURL = energyBeings   [msgId % energyBeings.length];
				else if ((hallucination != "") && (expTxt.indexOf (hallucination) != -1))
					pictureURL = hallucinations [msgId % hallucinations.length];
				if (pictureURL != "")
				{
					var picture = document.createElement ("img");
					picture.setAttribute ("src", "http://" + pictureURL);
					var center = document.createElement ("center");
					var p = document.createElement ("p");
					p.appendChild (picture);
					center.appendChild (p);
					secondTd.appendChild (center);
				}
			}
		}
	}
}
)();
