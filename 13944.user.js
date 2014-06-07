// ==UserScript==
// @name           Hebrew Letter Information (BLB)
// @namespace      yqbd.hebrewletterinformation.blb
// @description    Adds Hebrew letter information in title of image for Blue Letter Bible.
// @include        http://*.blueletterbible.org/*
// @include        http://*.blb.org/*
// ==/UserScript==

(function hebrewletterinformationblb() {

	var node; 
	var anodes, linkname;

	// http://diveintogreasemonkey.org/patterns/match-attribute.html
	anodes = document.evaluate( "//img[@src]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

	for (var i = 0; i < anodes.snapshotLength; i++) { 

		node = anodes.snapshotItem(i); 

		if(node != null && node.nodeName.toLowerCase() == 'img' )
		{
			//node.data = node.data + " " + "(" + ")"
			switch (node.src)
			{
				//Hebrew Letter information from http://www.ancient-hebrew.org/28_chart.html	
			case "http://www.blueletterbible.org/bg/hs340.gif": case "http://www.blueletterbible.org/bg/h340.gif": node.title="א - Al - A,E - Oxhead - Strong,Power,Leader - Aleph - silent - א"; break;
			case "http://www.blueletterbible.org/bg/hs341.gif": case "http://www.blueletterbible.org/bg/h341.gif": node.title="ב - Bet - B,Bh - Tentfloorplan - Family,House,In - Beyt - B,V - ב"; break;
			case "http://www.blueletterbible.org/bg/hs342.gif": case "http://www.blueletterbible.org/bg/h342.gif": node.title="ג - Gam - G - Foot - Gather,Walk - Gimal - G - ג"; break;
			case "http://www.blueletterbible.org/bg/hs343.gif": case "http://www.blueletterbible.org/bg/h343.gif": node.title="ד - Dal - D - Door - Move,Hang,Enterance - Dalet - D - ד"; break;
			case "http://www.blueletterbible.org/bg/hs344.gif": case "http://www.blueletterbible.org/bg/h344.gif": node.title="ה - Hey - H,E - Manwitharmsraised - Look,Reveal,Breath - Hey - H - ה"; break;
			case "http://www.blueletterbible.org/bg/hs345.gif": case "http://www.blueletterbible.org/bg/h345.gif": node.title="ו - Waw - W,O,U - Tentpeg - Add,Secure,Hook - Vav - V,O,U - ו"; break;
			case "http://www.blueletterbible.org/bg/hs346.gif": case "http://www.blueletterbible.org/bg/h346.gif": node.title="ז - Zan - Z - Mattock - Food,Cut,Nourish - Zayin - Z - ז"; break;
			case "http://www.blueletterbible.org/bg/hs347.gif": case "http://www.blueletterbible.org/bg/h347.gif": node.title="ח - Chets - Hh - Tentwall - Outside,Divide,Half - Chet - Hh - ח"; break;
			case "http://www.blueletterbible.org/bg/hs350.gif": case "http://www.blueletterbible.org/bg/h350.gif": node.title="ט - Thet - Th - Basket - Surround,Contain,Mud - Tet - T - ט"; break;
			case "http://www.blueletterbible.org/bg/hs351.gif": case "http://www.blueletterbible.org/bg/h351.gif": node.title="י - Yad - Y,I - Armandclosedhand - Work,Throw,Worship - Yud - Y - י"; break;
			case "http://www.blueletterbible.org/bg/hs352.gif": case "http://www.blueletterbible.org/bg/h352.gif": node.title="ך - Kaph (Final) - K,Kh - Openpalm - Bend,Open,Allow,Tame - Kaph - K,Kh - ך"; break;
			case "http://www.blueletterbible.org/bg/hs353.gif": case "http://www.blueletterbible.org/bg/h353.gif": node.title="כ - Kaph - K,Kh - Openpalm - Bend,Open,Allow,Tame - Kaph - K,Kh - כ"; break;
			case "http://www.blueletterbible.org/bg/hs354.gif": case "http://www.blueletterbible.org/bg/h354.gif": node.title="ל - Lam - L - ShepherdStaff - Teach,Yoke,To,Bind - Lamed - L - ל"; break;
			case "http://www.blueletterbible.org/bg/hs355.gif": case "http://www.blueletterbible.org/bg/h355.gif": node.title="ם - Mem (Final) - M - Water - Chaos,Mighty,Blood - Mem - M - ם"; break;
			case "http://www.blueletterbible.org/bg/hs356.gif": case "http://www.blueletterbible.org/bg/h356.gif": node.title="מ - Mem - M - Water - Chaos,Mighty,Blood - Mem - M - מ"; break;
			case "http://www.blueletterbible.org/bg/hs357.gif": case "http://www.blueletterbible.org/bg/h357.gif": node.title="ן - Nun (Final) - N - Seed - Continue,Heir,Son - Nun - N - ן"; break;
			case "http://www.blueletterbible.org/bg/hs360.gif": case "http://www.blueletterbible.org/bg/h360.gif": node.title="נ - Nun - N - Seed - Continue,Heir,Son - Nun - N - נ"; break;
			case "http://www.blueletterbible.org/bg/hs361.gif": case "http://www.blueletterbible.org/bg/h361.gif": node.title="ס - Sin - S - Thorn - Grab,Hate,Protect - Samech - S - ס"; break;
			case "http://www.blueletterbible.org/bg/hs362.gif": case "http://www.blueletterbible.org/bg/h362.gif": node.title="ע - Ayin - stop - Eye - Watch,Know,Shade - Ayin - silent - ע"; break;
			case "http://www.blueletterbible.org/bg/hs363.gif": case "http://www.blueletterbible.org/bg/h363.gif": node.title="ף - Pey (Final) - P,Ph - Mouth - Blow,Scatter,Edge - Pey - P,Ph - ף"; break;
			case "http://www.blueletterbible.org/bg/hs364.gif": case "http://www.blueletterbible.org/bg/h364.gif": node.title="פ - Pey - P,Ph - Mouth - Blow,Scatter,Edge - Pey - P,Ph - פ"; break;
			case "http://www.blueletterbible.org/bg/hs365.gif": case "http://www.blueletterbible.org/bg/h365.gif": node.title="ץ - Tsad (Final) - Ts - Manonhisside - Wait,Chase,Snare,Hunt - Tsade - Ts - ץ"; break;
			case "http://www.blueletterbible.org/bg/hs366.gif": case "http://www.blueletterbible.org/bg/h366.gif": node.title="צ - Tsad - Ts - Manonhisside - Wait,Chase,Snare,Hunt - Tsade - Ts - צ"; break;
			case "http://www.blueletterbible.org/bg/hs367.gif": case "http://www.blueletterbible.org/bg/h367.gif": node.title="ק - Quph - Q - Sunonthehorizon - Condense,Circle,Time - Quph - Q - ק"; break;
			case "http://www.blueletterbible.org/bg/hs370.gif": case "http://www.blueletterbible.org/bg/h370.gif": node.title="ר - Rosh - R - Headofaman - First,Top,Beginning - Resh - R - ר"; break;
			case "http://www.blueletterbible.org/bg/hs371.gif": case "http://www.blueletterbible.org/bg/h371.gif": node.title="ש - Shin - Sh - Twofrontteeth - Sharp,Press,Eat,Two - Shin - Sh,S - ש"; break;
			case "http://www.blueletterbible.org/bg/hs372.gif": case "http://www.blueletterbible.org/bg/h372.gif": node.title="ת - Taw - T - Crossedsticks - Mark,Sign,Signal,Monument - Tav - T - ת"; break;

				default:
				break;
			}
		}

	} 

	
})();