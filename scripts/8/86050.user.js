// ==UserScript==
// @name           OGame Redesign: Proper Source and Target Pictures
// @description    Replaces the "ghost" pictures of the source and destinattion with proper ones
// @namespace      Vesselin
// @version        1.05
// @date           2012-04-25
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=fleet2*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=fleet2") < 0)
		return;
	const moonIcon = "data:image/gif;base64," +
		"iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAAXNSR0IArs4c6QAAAARnQU1BAACx" +
		"jwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRF" +
		"DRAUDRAVDhEWDhIWDhIXERQZFBgcFRgdFhoeFxsfGR0iGh8jGx8kHCAlHCAmHSImHSInHyQpIics" +
		"JCguJy0yKS81KjA1KzA3LTM5LjQ6LzU7Mjk/NTxCOD9GOUBHOkJIO0JJPENKPURLPkVMPkZNQUlQ" +
		"Q0tTRExTRU1UR1BYSFBYS1NbTFVcTVZeTldfT1lhUFlhUVpiVF1lVF1mVF5lVF5mVV9nV2FpV2Fq" +
		"WGJqWmVtW2ZuXGdwXWhwXmlyX2pzYGpzYGt0Ym12Y252Y254ZG94ZXF6Z3J7Z3N8aHN8aXR9aXR+" +
		"anV/anZ/a3eBcHyGcH2Hcn6Icn+Jc4CJdYKMd4OOd4WPeIWQeIaQeoeRe4mTfImUfYqVfYuWfoyW" +
		"foyXf42YgI6ZgY+agpCbg5GcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4TVapgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0" +
		"RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAONJREFUKFNjYCAZMAIBmiZOaUMHRzM5" +
		"XmRxAcvISPvg5BgncYRiPr+kBEVmmdiUlAgxmFp2XVXVQDUhi6SUlBQXPqhaKW0mVpPoEJBYSrwK" +
		"VFBXl5HD3BuoGQRsIPoZrQIUdM0E7SGCvlBBDYX4UC8l3/hkkKA3VFBe3E1SOcRRySYRKGgNtV7C" +
		"052by1Wcgc8/OTlOCWoRm5GbnkG4Oruwn7GHM9RJjIwC+oFRSdE2PkFa7qLQEACGBL+BsnFikGmY" +
		"nQgsWEDhwymh6WirI8vDBBdkYmJiZGJiYQZRjIxMpIQ6AA9eKP/VQ6aPAAAAAElFTkSuQmCC";
	const planetIcon = "data:image/gif;base64," +
		"iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAAXNSR0IArs4c6QAAAARnQU1BAACx" +
		"jwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRF" +
		"DRAUDRAVDhEWDhIVDxIWDxIXERUZEhUaEhYaExcbFBgcFRgdFRkeFhoeFhofFxogGh4jGx8kGyAl" +
		"HCEmHiInHiMoHyUqISYrIicsIictJCkvJCovJSowJSsxJywyJy0zKC4zKS40KS81KzE3LDI4LTM5" +
		"LjQ6LzY8MDY9MTg+Mjk/NDpANDpBNTxCNj1DOUBHOkJIPENKPURLPkVMP0dOQEdOQEhPQkpRQkpS" +
		"RU1URk5WR09XTFVdTVZeT1lgUVpiUVtjU1xkU1xlVF5mVmBoVmBpWGJrWmRsWmRtXmlyYGt0ZG54" +
		"Z3J7aHR9aXV+anV/anZ/anaAbHiBbXiCbXmDbnqEc3+JdIGLdYKMdoOOd4SOd4SPeIWQeYaQeoeR" +
		"eoeSe4iTfImUfYuVfouWfoyWfoyXgI2YgI6YgI6ZgY+agpCbg5GcAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA61SaVQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0" +
		"RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAPVJREFUKFNjYCAVMAsqqcjxMjIwcsuI" +
		"s0A0M0k5hCUkxgdbSqjqaDhKQwTVAjKzQSDVR5aNw1YULCYRCRYCAU9hQy2wGJcLXCw72c2EEyyo" +
		"EI4QzPCAiDEYpMAFM5x1RSCCFhBbgCDZSd9XDSJolAoRyoqwNI5NUASLsZglgcUyAvVt47LDBcBi" +
		"2i5+ILEkez2v9OwsZ0agGKOyl7hmYnZ6oKl5aFZ2dpAMSKGwtyuPmF+snaYTyOQYdVZGRkYGy7SU" +
		"UH8bKZ2QjKz0KHcZoBBQ0Co6wFqenUVI09zKVIUfLMbIwC/Jx8TExAjCjEAKTEBcSgwAABpUQbL8" +
		"ExTAAAAAAElFTkSuQmCC";
	function planetPic (system, position, isMoon, oldVersion, newVersion)
	{
		if (isMoon)
		{
			if (oldVersion)
				return "img/planets/moon/moon_" + ((system % 5) + 1) + "_3.gif";
			else
			{
				var moonImages =
				[
					"8d/fb0bad7c74712fe0d4f3e2b13e4d21",
					"2d/c56f1dc20c57cc934f75aa7c8f64dd",
					"07/9d5182ada9be53e12593f89715555e",
					"57/1d3c27a190ef6620e01b841b02c15c",
					"11/09f7964b201e1b5adb596c5a4d8785"
				];
				if (newVersion)
					return ("/cdn/img/planets/moon_" + ((system + position) % 5 + 1) + "_3.gif");
				else
					return ("http://gf" + (1 + Math.floor (Math.random () * 3)) + ".geo.gfsrv.net/" + moonImages [system % 5] + ".gif");
			}
		}
		if (position == 16)
			return (oldVersion) ? "img/layout/unbekanntes_ziel.gif" : "http://gf1.geo.gfsrv.net/72/449345bf70822be196b2bff6fc4763.gif";
		var pictureType;
		var pictureNumber = (system + position) % 10;
		var desert = Array ();
		var dry    = Array ();
		var normal = Array ();
		var jungle = Array ();
		var water  = Array ();
		var ice    = Array ();
		var gas    = Array ();
		if (oldVersion)
		{
			desert =
			[
				"desert_1",
				"desert_2",
				"desert_3",
				"desert_4",
				"desert_5",
				"desert_6",
				"desert_7",
				"desert_8",
				"desert_9",
				"desert_10"
			];
			dry =
			[
				"dry_1",
				"dry_2",
				"dry_3",
				"dry_4",
				"dry_5",
				"dry_6",
				"dry_7",
				"dry_8",
				"dry_9",
				"dry_10"
			];
			normal =
			[
				"normal_1",
				"normal_2",
				"normal_3",
				"normal_4",
				"normal_5",
				"normal_6",
				"normal_7",
				"normal_8",
				"normal_9",
				"normal_10"
			];
			jungle =
			[
				"jungle_1",
				"jungle_2",
				"jungle_3",
				"jungle_4",
				"jungle_5",
				"jungle_6",
				"jungle_7",
				"jungle_8",
				"jungle_9",
				"jungle_10"
			];
			water =
			[
				"water_1",
				"water_2",
				"water_3",
				"water_4",
				"water_5",
				"water_6",
				"water_7",
				"water_8",
				"water_9",
				"water_10"
			];
			ice =
			[
				"ice_1",
				"ice_2",
				"ice_3",
				"ice_4",
				"ice_5",
				"ice_6",
				"ice_7",
				"ice_8",
				"ice_9",
				"ice_10"
			];
			gas =
			[
				"gas_1",
				"gas_2",
				"gas_3",
				"gas_4",
				"gas_5",
				"gas_6",
				"gas_7",
				"gas_8",
				"gas_9",
				"gas_10"
			];
		}
		else
		{
			desert =
			[
				"87/23d6023d6bb94722e6a8e25f787ae4",
				"3a/47f44de76f130307260b01127f3414",
				"9c/f7706840dff3a5b5c94f7777d26854",
				"33/ffd70b1aeb2e0003a08205b041203b",
				"12/9c2c2004c5ea8b4f6698de466ce9f5",
				"27/1870c65c9e611e0eb8800a5e909323",
				"a2/b74207576dac0ede3d605060ec17d1",
				"1f/a82620b3a8da525457ffd1bb90b55b",
				"0d/4707003b9098b8d8d65fad91ad9ab1",
				"23/ec572264adfe1cc4ef2a4016d561ea"
			];
			dry =
			[
				"ee/0b22d0f51d1320bd3506c79e472a3d",
				"a5/cc31e98e5a9ff86f4e34acdc04196b",
				"5e/1405d93e3eca247a2cdb24cf3f3efa",
				"4d/4314174760e11ecc983d9e96f436b4",
				"21/a56f14cbb5487a948d6fdabdaaca73",
				"57/b6eff023c622c2e9c79fae30d9ff93",
				"e5/3f3c9a092b4b32ba968c9ce64d0523",
				"10/89884e75a747f21f3e4b139399cfbf",
				"5e/048af87feb94de0cf2a1e2ae0d7024",
				"2b/291d03eedc2bdfcab3259b81ddc8ab"
			];
			normal =
			[
				"f7/8d6533c3fbf0ec97112930dbabc5a3",
				"20/c4e2773fab713aafdc5979ab5de28a",
				"3a/7287cce8d970a6b853d9ec2ba7a6bd",
				"dd/972b9291461a14322d817357f2d8be",
				"84/a63f3c8015ca010698e09e6597638d",
				"b5/d15c8d6500bc780007d20cae48b5cf",
				"e8/83b9ec2fef60907168627bdd1db53d",
				"7c/bf00bee68abe7488e6c1fdd4d2b047",
				"a0/c1ace0db94deeb211467c18b3afcdd",
				"3d/0c4b4d647956b31ad87c1e5f8326a8"
			];
			jungle =
			[
				"9f/b3c0476e489c219d12aeb16c9e95d6",
				"fe/c14319ddc1d12171bc7b2113448085",
				"48/b27cfabc77dbe804ccbd09c7679fc2",
				"48/b27cfabc77dbe804ccbd09c7679fc2",
				"cd/035da66a1cb38b18ffc3318e494044",
				"4f/0d0aee6f1f70f5bf2c133cb399ecf1",
				"41/666267fb5eb073921ac3ab0cd8543f",
				"18/0b4039d0e01d419634b6d8de9217c0",
				"b4/89d7de1347da39eb4ff4e801335536",
				"cf/68f938395670dcac94086191a06843"
			];
			water =
			[
				"71/2dc5d85ca24e2f8ff0891804ba88d0",
				"0c/7020fd96bb39ae88fd2eeddd2a6d5b",
				"00/7350cfa633acf64341c94568531288",
				"44/3b394c13216ba2539bbf24415bf585",
				"ed/668d72f6bbce6ba7ff7e8e9ab4a4b1",
				"24/8d07264a3b1cd311e67356c8c17245",
				"49/cc15ed0f34bb7771c4fc831fb31c26",
				"ba/b7471a4b264fab3a64bd0ff3022d05",
				"a5/51ec5f9a7d6e4254a19cf2ffe2937e",
				"e3/a978538ab9ad0309a18d88dd0f99cc"
			];
			ice =
			[
				"5b/4d6d0cfd9e4cad9d97fe73ce50a76f",
				"36/466291aae4fb53639c69feb78e9835",
				"71/dc83bf9e50dee0c12c112ab343505c",
				"35/3a1cc3d6fa24b6623c189062570a2f",
				"81/a44e226613e8734afb2f824338aaf9",
				"82/f7645b1378eb16b465eadf52ffa7ca",
				"a8/96c221f82ee796196292809a6082c7",
				"bb/76851393cedf65e9088895c4bd5658",
				"39/23a528d9acf53ee038d9720671b753",
				"69/df072b9dd0580e9f36cb3ce32916cf"
			];
			gas =
			[
				"39/ee4f33870e031fdb38e56dd5fb668a",
				"8e/7c66450d3ae2cef9473065554d9869",
				"08/b403ed134e2e76bd8d73f038d469ff",
				"9e/b9d75677b8531fb8a2c7c9bca68b1d",
				"86/b226d64094dd692ce965215b820994",
				"52/d4fd2b032c7295909136cdd15305bf",
				"8f/5ce3943edfdcff674d0ed104d68d49",
				"3f/2fdc6a8efb3ae94267d3d06d3dfd0c",
				"35/7abb6ee816a852ee9fc610caa85b21",
				"78/654e63223c43dea614e4320a32ee96"
			];
		}
		if ((system % 2) == 0)
		{
			switch (position)
			{
				case 1:
				case 2:
				case 3:
					pictureType = desert;
					break;
				case 4:
				case 5:
					pictureType = dry;
					break;
				case 6:
				case 7:
					pictureType = normal;
					break;
				case 8:
				case 9:
					pictureType = jungle;
					break;
				case 10:
				case 11:
					pictureType = water;
					break;
				case 12:
				case 13:
					pictureType = ice;
					break;
				case 14:
				case 15:
					pictureType = gas;
					break;
			}
		}
		else
		{
			switch (position)
			{
				case 1:
				case 2:
				case 3:
					pictureType = dry;
					break;
				case 4:
				case 5:
				case 14:
				case 15:
					pictureType = normal;
					break;
				case 6:
				case 7:
					pictureType = jungle;
					break;
				case 8:
				case 9:
					pictureType = water;
					break;
				case 10:
				case 11:
					pictureType = ice;
					break;
				case 12:
				case 13:
					pictureType = gas;
					break;
			}
		}
		if (oldVersion)
			return ("img/planets/" + pictureType [pictureNumber] + "_2.gif");
		else
			return ("http://gf" + (1 + Math.floor (Math.random () * 3)) + ".geo.gfsrv.net/" + pictureType [pictureNumber] + ".gif");
	}
	var oldVersion = false;
	var newVersion = false;
	var oVersion = document.getElementsByName ("ogame-version");
	if (oVersion && (oVersion.length > 0))
	{
		var versionParts = oVersion [0].content.split (".");
		if (parseInt (versionParts [0]) < 2)
			oldVersion = true;
		else if ((parseInt (versionParts [0]) == 2) && (parseInt (versionParts [1]) < 3))
			oldVersion = true;
		else if (parseInt (versionParts [0]) > 3)
			newVersion = true;
	}
	else
		oldVersion = true;
	var startTd = document.getElementById ("start");
	if (startTd == null)
		return;
	var theDivs = startTd.getElementsByTagName ("div");
	if (theDivs.length < 3)
		return;
	var coords = theDivs [2].getElementsByTagName ("span") [0].textContent.split (":");
	var theAs = theDivs [1].getElementsByTagName ("a");
	var myImg;
	var isMoon = false;
	for (var i = 0; i < 2; i++)
	{
		var thisA = theAs [i];
		if (thisA.className.indexOf ("selected") < 0)
			thisA.style.display = "none";
		else
		{
			thisA.style.backgroundImage = "none";
			thisA.style.position = "relative";
			thisA.style.left = (i == 1) ? "65px" : "20px";
			myImg = document.createElement ("img");
			isMoon = (i == 1);
			myImg.setAttribute ("src", planetPic (parseInt (coords [1]), parseInt (coords [2]), isMoon, oldVersion, newVersion));
			myImg.style.width = "35px";
			myImg.style.height = "35px";
			thisA.appendChild (myImg);
		}
	}
	myImg = document.createElement ("img");
	myImg.setAttribute ("src", (isMoon) ? moonIcon : planetIcon);
	myImg.style.width  = "20px";
	myImg.style.height = "20px";
	myImg.style.verticalAlign = "middle";
	myImg.style.marginRight = "2px";
	theDivs [0].insertBefore (myImg, theDivs [0].firstChild);
	var targetTd = document.getElementById ("target");
	if (targetTd == null)
		return;
	function addEvent (el, evt, fxn)
	{
		if (el.addEventListener)
			el.addEventListener (evt, fxn, false); // for standards
		else if (el.attachEvent)
			el.attachEvent ("on" + evt, fxn); // for IE
		else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
	}
	var pbutton = document.getElementById ("pbutton");
	var mbutton = document.getElementById ("mbutton");
	function clearTheMess ()
	{
		var otherPic = document.getElementById ("truePlanetPic");
		if (otherPic != null)
			otherPic.parentNode.removeChild (otherPic);
		otherPic = document.getElementById ("trueMoonPic");
		if (otherPic != null)
			otherPic.parentNode.removeChild (otherPic);
		pbutton.style.backgroundImage = "";
	}
	function setPicture (element, isMoon)
	{
		clearTheMess ();
		var system   = parseInt (document.getElementById ("system").value);
		var position = parseInt (document.getElementById ("position").value);
		if ((position > 0) && (position <= 16))
		{
			var theId = "true" + ((isMoon) ? "Moon" : "Planet") + "Pic";
			var myImg = document.getElementById (theId);
			if (myImg == null)
			{
				myImg = document.createElement ("img");
				myImg.setAttribute ("id", theId);
				myImg.style.width = "35px";
				myImg.style.height = "35px";
			}
			myImg.setAttribute ("src", planetPic (system, position, isMoon, oldVersion, newVersion));
			element.appendChild (myImg);
			if (! isMoon)
				element.style.backgroundImage = "none";
		}
		else
			element.style.backgroundImage = "";
	}
	function setPictureOnKeypress ()
	{
		if (mbutton.className.indexOf ("selected") >= 0)
			setPicture (mbutton, true);
		else if (pbutton.className.indexOf ("selected") >= 0)
			setPicture (pbutton, false);
		else
			clearTheMess ();
	}
	if (pbutton.className.indexOf ("selected") >= 0)
		setPicture (pbutton, false);
	if (mbutton.className.indexOf ("selected") >= 0)
		setPicture (mbutton, true);
	addEvent (pbutton, "click", function ()
	{
		setPicture (this, false);
	});
	addEvent (mbutton, "click", function ()
	{
		setPicture (this, true);
	});
	addEvent (document.getElementById ("dbutton"), "click", function ()
	{
		clearTheMess ();
	});
	addEvent (document.getElementsByName ("system") [0], "keyup", function ()
	{
		setPictureOnKeypress ();
	});
	addEvent (document.getElementsByName ("position") [0], "keyup", function ()
	{
		setPictureOnKeypress ();
	});
	addEvent (document.getElementById ("slbox"), "change", function ()
	{
		setPictureOnKeypress ();
	});
	addEvent (document.getElementById ("aksbox"), "change", function ()
	{
		setPictureOnKeypress ();
	});
	// AntiGame support:
	slPanel = document.getElementById ("slPanel");
	if (slPanel == null)
		return;
	setTimeout (function ()
	{
		var shortcuts = slPanel.getElementsByTagName ("a");
		for (var i in shortcuts)
			addEvent (shortcuts [i], "click", function ()
			{
				setPictureOnKeypress ();
			});
	}, 0);
}
) ();
