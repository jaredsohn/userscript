// ==UserScript==
// @name           3D Smileys for orkut
// @namespace      vichi
// @description    3D smiley set for orkut
// @include        http://*.orkut.*/*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertEmotion(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var emotion = new Array();
	emotion["hiiii"]				="http://lh5.ggpht.com/_RI-sCRurLNk/Si6_EXFZEMI/AAAAAAAAAjM/4jQ1d45HwVs/hiiiiiiii.gif";
	emotion["byeeee"]				="http://lh5.ggpht.com/_RI-sCRurLNk/Si6_EfottXI/AAAAAAAAAjQ/nsZgHnRovbE/s128/byeeeeeeeee.gif";
	emotion["smile2"]				="http://lh5.ggpht.com/_RI-sCRurLNk/SXszjBuln7I/AAAAAAAAAWw/wuou9tovPOs/smile.gif";
	emotion["smile3"]				="http://lh5.ggpht.com/_RI-sCRurLNk/SXszjBuln7I/AAAAAAAAAWw/wuou9tovPOs/smile.gif";
	emotion["hello"]				="http://lh6.ggpht.com/_RI-sCRurLNk/SW4bxaHm2pI/AAAAAAAAAPo/8Gg2S8gqJqA/Hello.gif";
	emotion["Wassup"]				="http://lh4.ggpht.com/_RI-sCRurLNk/SW4ZQQcAaQI/AAAAAAAAANo/083CxNJJGnQ/00020335.gif";
	emotion["I miss u"]				="http://lh3.ggpht.com/_RI-sCRurLNk/SnGEZwUGcnI/AAAAAAAAArA/-zZPftVSf0Q/i%20miss%20u.gif";
	emotion["haha"]					="http://lh4.ggpht.com/_RI-sCRurLNk/SW4advjvoHI/AAAAAAAAAPQ/sjHEh6N1-E4/haha.gif";
	emotion["lol"]					="http://lh3.ggpht.com/_RI-sCRurLNk/SW4bxeEPVvI/AAAAAAAAAP4/PjTHXOF1qPs/lol.gif";
	emotion["HaHa"]					="http://lh6.ggpht.com/_RI-sCRurLNk/Sd7g8828gdI/AAAAAAAAAgY/gXH9ibsEItM/HaHa.gif";	
	emotion["RoFl"]					="http://lh3.ggpht.com/_RI-sCRurLNk/Sd7g8zZ15DI/AAAAAAAAAgQ/COoqM8xdl9A/ROFl.gif";
	emotion["ROFL"]					="http://lh5.ggpht.com/_RI-sCRurLNk/SW4cM83DcMI/AAAAAAAAAQg/j_2cOcezxOc/ROFL.gif";
	emotion["laugh"]				="http://lh5.ggpht.com/_RI-sCRurLNk/SW4bxTtxJBI/AAAAAAAAAPw/ROk5lQQ4OpA/laugh.gif";
	emotion["tounge out"]				="http://lh6.ggpht.com/_RI-sCRurLNk/SW4cu4N03aI/AAAAAAAAARQ/Z1JpLNKYrRU/Tounge%20out.gif";
	emotion["wink"]					="http://lh6.ggpht.com/_RI-sCRurLNk/SW4c64wsRsI/AAAAAAAAARg/la0uWg-WRUM/wink.gif";
	emotion["Beer"]					="http://lh3.ggpht.com/_RI-sCRurLNk/SW4ZQ6ct74I/AAAAAAAAAN4/1Sl6-IFk93E/beer.gif";
	emotion["BRB"]					="http://lh3.ggpht.com/_RI-sCRurLNk/SW4ZQ2EBgfI/AAAAAAAAAOI/YwkyN_k_h0o/BRB.gif";
	emotion["Celebrate"]				="http://lh3.ggpht.com/_RI-sCRurLNk/SW4Z9wHR0yI/AAAAAAAAAOQ/qDBl26x8EQk/Celebrate.gif";
	emotion["devil"]				="http://lh3.ggpht.com/_RI-sCRurLNk/SW4Z_Op4PbI/AAAAAAAAAOg/qccqk4wGnjU/Devil.gif";
	emotion["blushing"]				="http://lh3.ggpht.com/_RI-sCRurLNk/SnGEZcD8RQI/AAAAAAAAAq4/B7Q-vcEN2XA/blushing.gif";
	emotion["embarrased"]				="http://lh4.ggpht.com/_RI-sCRurLNk/SW4Z_DThHQI/AAAAAAAAAOo/e-WUZ7VeadM/Embarrased.gif";
	emotion["Dissapointed"]				="http://lh6.ggpht.com/_RI-sCRurLNk/SW4Z_XIuJRI/AAAAAAAAAOw/P7eeiqIwA0E/Dissapointed.gif";
	emotion["sad"]					="http://lh3.ggpht.com/_RI-sCRurLNk/SqOyrfcO-jI/AAAAAAAAAtQ/UDOzeS6tla0/sad.gif";
	emotion["Cry"]					="http://lh4.ggpht.com/_RI-sCRurLNk/SW4Z--pqN1I/AAAAAAAAAOY/nkWWQOwebEQ/cry.gif";
	emotion["dissapointed"]				="http://lh4.ggpht.com/_RI-sCRurLNk/SnGDmCEavhI/AAAAAAAAAqw/tf_huX4xfIk/dissapointed.gif";
	emotion["angry"]				="http://lh6.ggpht.com/_RI-sCRurLNk/SXsziw3PhHI/AAAAAAAAAWo/8ru4khmzI04/Angry.gif";
	emotion["Zipit"]				="http://lh5.ggpht.com/_RI-sCRurLNk/SqOyrepA8aI/AAAAAAAAAtU/0wiHZJboFwc/zipit.gif";
	emotion["angry"]				="http://lh4.ggpht.com/_RI-sCRurLNk/SnGDmdDd9BI/AAAAAAAAAq0/jVnNKFalmEw/angry.gif";
	emotion["happy birthday"]			="http://lh4.ggpht.com/_RI-sCRurLNk/SW4adx-K8_I/AAAAAAAAAPY/aYMR-LRX0LA/Happy%20B%27day.gif";
	emotion["O.K"]					="http://lh5.ggpht.com/_RI-sCRurLNk/SXLXBokUfRI/AAAAAAAAAWI/N50NrLWztvU/O.K.gif";
	emotion["mad"]					="http://lh6.ggpht.com/_RI-sCRurLNk/SW4bx8hAeCI/AAAAAAAAAQA/BgkabluaKow/Mad.gif";
	emotion["please"]				="http://lh6.ggpht.com/_RI-sCRurLNk/SW4cMjU5UDI/AAAAAAAAAQQ/b6GGnrzO7SM/Please.gif";
	emotion["ppphhbbbtttt"]				="http://lh6.ggpht.com/_RI-sCRurLNk/SW4cMpzBcDI/AAAAAAAAAQY/DX_mZGC-EVQ/pppphhhbbbbttt.gif";
	emotion["scream"]				="http://lh5.ggpht.com/_RI-sCRurLNk/SW4cMzM_I7I/AAAAAAAAAQo/HrP6cX0h2XE/Scream.gif";
	emotion["smile2"]				="http://lh6.ggpht.com/_RI-sCRurLNk/SW4cNH2DCFI/AAAAAAAAAQw/_QR2G1RHriI/Smile.gif";
	emotion["snop"]					="http://lh3.ggpht.com/_RI-sCRurLNk/SW4ctqCukEI/AAAAAAAAAQ4/6Nl6S_sEwb8/Snop.gif";
	emotion["thank u"]				="http://lh6.ggpht.com/_RI-sCRurLNk/SW4ctmBNfpI/AAAAAAAAARA/dcFC8yIuuPY/Thank%20u.gif";
	emotion["tired"]				="http://lh4.ggpht.com/_RI-sCRurLNk/SW4cu_YGW0I/AAAAAAAAARI/fBetkXiHxS0/tired.gif";
	emotion["surprised"]				="http://lh6.ggpht.com/_RI-sCRurLNk/SXszjezFZmI/AAAAAAAAAW4/0aKB0dKjjqk/Surprised.gif";
	emotion["scared"]				="http://lh6.ggpht.com/_RI-sCRurLNk/Si6_Eku5i-I/AAAAAAAAAjU/18i7kUdCLcQ/s128/scared.gif";
	emotion["thumb up"]				="http://lh4.ggpht.com/_RI-sCRurLNk/SqOyrinKMoI/AAAAAAAAAtc/SmRXIyCgL9U/thumbup.gif";
	emotion["yo"]					="http://lh3.ggpht.com/_RI-sCRurLNk/SqOyrZJKRAI/AAAAAAAAAtY/bfocMmogd6w/yo.gif";
	emotion["U rock"]				="http://lh4.ggpht.com/_RI-sCRurLNk/SW4cu7Q2FtI/AAAAAAAAARY/lTTSN_0EfH0/u%20rick.gif";
	emotion["B'day Hooter"]				="http://lh3.ggpht.com/_RI-sCRurLNk/SW4ZQs7yJJI/AAAAAAAAANw/CDexuJkbJqE/Bday%20hooter.gif";
	emotion["sweating it out"]			="http://lh3.ggpht.com/_RI-sCRurLNk/SbeZWeuWjfI/AAAAAAAAAY8/E6VlP6K971w/Its%20so%20hot.gif";
	emotion["hot"]					="http://lh6.ggpht.com/_RI-sCRurLNk/SbeZW3SDqkI/AAAAAAAAAZU/M88w6vS10BM/sweating.gif";
	emotion["angry"]				="http://lh5.ggpht.com/_RI-sCRurLNk/ScpLI50fnSI/AAAAAAAAAbo/-FoJAaUTIOw/ANGRY.gif";
	emotion["bad language"]				="http://lh3.ggpht.com/_RI-sCRurLNk/Si6_EreSoEI/AAAAAAAAAjY/RboE_qZb8Cc/dirty%20language.gif";
	emotion["yummy"]				="http://lh6.ggpht.com/_RI-sCRurLNk/SbeZXD3G2hI/AAAAAAAAAZc/N2nwfcgn350/yummy.gif";
	emotion["good night"]				="http://lh3.ggpht.com/_RI-sCRurLNk/SW4adqhK7FI/AAAAAAAAAPI/C0OZhMKBkig/Good%20night.gif";
	emotion["G2G"]					="http://lh3.ggpht.com/_RI-sCRurLNk/Sbed336IGwI/AAAAAAAAAZs/dRrKeWdr9b0/G2G.gif";
	emotion["boring"]				="http://lh3.ggpht.com/_RI-sCRurLNk/Sbed3tD5A3I/AAAAAAAAAZk/SBVTuxH03L4/boring.gif";
	emotion["Weight lifting"]				="http://lh6.ggpht.com/_RI-sCRurLNk/ScUmDim2f9I/AAAAAAAAAak/yxaFAJKFgXw/Vaidehi.gif";
	emotion["booring"]				="http://lh3.ggpht.com/_RI-sCRurLNk/Sd7g9MbEs9I/AAAAAAAAAgo/AcTjVsWYS-A/booring.gif";
	emotion["Coool"]				="http://lh4.ggpht.com/_RI-sCRurLNk/Sd7iV3k-XMI/AAAAAAAAAgw/v28XW2yCsus/cool.gif";
	emotion["muststayawake"]			="http://lh3.ggpht.com/_RI-sCRurLNk/Sd7iV8Mxp2I/AAAAAAAAAg4/paoqKsXe0yc/Must%20stay%20awake.gif";
	emotion["sleep"]				="http://lh5.ggpht.com/_RI-sCRurLNk/SnGEZuSJWJI/AAAAAAAAAq8/THsSYdrvzJI/ZZzz.gif";
	emotion["OMG"]					="http://lh5.ggpht.com/_RI-sCRurLNk/Sd7iV4IDXyI/AAAAAAAAAhA/aMJytHYPtVo/OMG.gif";
	

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++)
	{
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		for(title in emotion)
		{
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+emotion[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertEmotion, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);