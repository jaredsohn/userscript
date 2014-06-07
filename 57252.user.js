// ==UserScript==
// @name           Smiley Popo by soft
// @namespace     http://www.orkut.co.in/Main#Profile.aspx?rl=ls&uid=16119386298477409041
// @author	soft
// @description    installed this popo smileys..& insert the emotions in ur virtual world..enjoy!!
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//Whole structure changed by Praveen to simplify the script.
//and smileys appear below the reply box as well.
//Latest yahoo smileys added!! Captcha free in Orkut! ..ENJOY ;D
//Original Base script by Abhishek [OD] - http://userscripts.org/scripts/show/12735
//me just made this script & added sum new popo smileys!
// All credits to Original script writer. I hope u all enjoy the script! ;)
*********************************************************/

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();
	smileyarr["amazed by soft"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skzi8VCHE6I/AAAAAAAAApM/Z1tLU2v0WZ4/s400/amazed.png";
	smileyarr["angry"]="http://lh3.ggpht.com/_35QFSJ1vbCE/SkzjAafV31I/AAAAAAAAApY/K8Q6DWNtA7U/s400/angry.png";
	smileyarr["beat_brick"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz1h1Zj2mI/AAAAAAAAAqU/gpoZC0l123A/s400/beat_brick.png";
	smileyarr["beat_plaster"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz1l4SvaLI/AAAAAAAAAqg/IC_FvTfO_VQ/s400/beat_plaster.png";
	smileyarr["beat_shot"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz1okyDecI/AAAAAAAAAqs/Hhgyi1HTij4/s400/beat_shot.png";
	smileyarr["beauty"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz1rmLNibI/AAAAAAAAAq4/EtLlGBoGCkw/s400/beauty.png";
	smileyarr["big_smile"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz1cc9UJgI/AAAAAAAAAqI/VJGV-6YjqhY/s400/big_smile.png";
	smileyarr["burn_joss_stick"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz1y2wtD3I/AAAAAAAAArE/pVnolf3ngw0/s400/burn_joss_stick.png";
	smileyarr["canny"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz18h7yCbI/AAAAAAAAArQ/E2N6mGAXGHw/s400/canny.png";
	smileyarr["choler"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz1_LLERAI/AAAAAAAAArc/VPvJabfQgwU/s400/choler.png";
	smileyarr["cold"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2BsNbjaI/AAAAAAAAAro/-uSEhA4V3LU/s400/cold.png";
	smileyarr["cool"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2ErCl22I/AAAAAAAAAr0/rnsP1uuJMsI/s400/cool.png";
	smileyarr["cry"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2HTAkUCI/AAAAAAAAAsA/8n_fdClKAfk/s400/cry.png";
	smileyarr["doubt"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz2Jlh6gEI/AAAAAAAAAsM/u3rIA5ldFys/s400/doubt.png";
	smileyarr["dribble"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2L_YD4MI/AAAAAAAAAsY/20DKZFsHxfg/s400/dribble.png";
	smileyarr["embarrassed"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2OM0FEII/AAAAAAAAAsk/0ypVBJtz1S4/s400/embarrassed.png";
	smileyarr["go"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2QTFSqwI/AAAAAAAAAsw/UPF-EEZ6Ucg/s400/go.png";
	smileyarr["haha"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2SmzTjrI/AAAAAAAAAs8/StBb4_r8cbQ/s400/haha.png";
	smileyarr["look_down"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2WthNAsI/AAAAAAAAAtI/-Mjdel2pOb0/s400/look_down.png";
	smileyarr["misdoubt"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2axb4Y6I/AAAAAAAAAtg/DSU1GP6m4uI/s400/misdoubt.png";
	smileyarr["nosebleed"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2dDFSkVI/AAAAAAAAAts/-cNgIReiF6U/s400/nosebleed.png";
	smileyarr["oh"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2mCxRZbI/AAAAAAAAAuQ/CVz5EgU5vPU/s400/oh.png";
	smileyarr["pudency"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2pAblhuI/AAAAAAAAAuc/T9T0ORSuA3U/s400/pudency.png";
	smileyarr["rap"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2rl0nBSI/AAAAAAAAAuo/VxsnFfAC08M/s400/rap.png";
	smileyarr["shame"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz23QN7rhI/AAAAAAAAAvk/eOeh-Cdj-8g/s400/shame.png";
	smileyarr["smile"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz294c_VxI/AAAAAAAAAv8/1aFFq074XDI/s400/smile.png";
	smileyarr["sure"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz25nsZ5yI/AAAAAAAAAvw/lUJxBBky9Bc/s400/sure.png";
	smileyarr["sweat"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz3B4cLrXI/AAAAAAAAAwI/HTyedK33PNA/s400/sweat.png";
	smileyarr["waaaht"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz3FdSjT0I/AAAAAAAAAwU/4sdMHxrUH20/s400/waaaht.png";
	smileyarr["matrix"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2YxnfRMI/AAAAAAAAAtU/pfkmwrNV6pE/s400/matrix.png";
	smileyarr["amazing"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8aZlqSY9I/AAAAAAAAA1Y/tqyeq1S9oEg/s400/amazing.png";
	smileyarr["anger"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8ab2p3Z9I/AAAAAAAAA1k/_jgTJ3OudRI/s400/anger.png";
	smileyarr["bad_egg"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8ad20ACbI/AAAAAAAAA1w/o29w9ng-kP4/s400/bad_egg.png";
	smileyarr["bad_smile"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Sk8ag7Z260I/AAAAAAAAA18/zkRALbPl8OA/s400/bad_smile.png";
	smileyarr["beaten"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8ai6NRY6I/AAAAAAAAA2I/PZwgCUFd-lw/s400/beaten.png";
	smileyarr["big_smile1"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8ak9Ao_QI/AAAAAAAAA2U/v34i0Lc5yE0/s400/big_smile1.png";
	smileyarr["black_heart"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8am5UpicI/AAAAAAAAA2g/1G51x_Z4TWc/s400/black_heart.png";
	smileyarr["cry1"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8apNH6DtI/AAAAAAAAA2s/tMlIYA2xXyU/s400/cry1.png";
	smileyarr["electric_shock"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Sk8arFhNiwI/AAAAAAAAA24/ewmoGjDREEM/s400/electric_shock.png";
	smileyarr["exciting"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8as15PxfI/AAAAAAAAA3E/TLc1UT-QjOA/s400/exciting.png";
	smileyarr["eyes_droped"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8avXN-IaI/AAAAAAAAA3Q/pCFX0pVe6CI/s400/eyes_droped.png";
	smileyarr["girl"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8ayFfsvhI/AAAAAAAAA3c/X9tfyr57Bcw/s400/girl.png";
	smileyarr["greedy"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8a0VmZ-HI/AAAAAAAAA3o/9E9asixzxVE/s400/greedy.png";
	smileyarr["grimace"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8a2hV6v5I/AAAAAAAAA30/uumVUCl2dXo/s400/grimace.png";
	smileyarr["haha1"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8a5IpTZoI/AAAAAAAAA4A/a6RkXoHvr5g/s400/haha1.png";
	smileyarr["happy"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8a7i50FzI/AAAAAAAAA4M/_nmcC0upFwA/s400/happy.png";
	smileyarr["horror"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8a9cwRsSI/AAAAAAAAA4Y/wk6wJbOhJIc/s400/horror.png";
	smileyarr["money"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8a_ZoJSZI/AAAAAAAAA4k/CHv7hVa300s/s400/money.png";
	smileyarr["nothing"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2hhxg5DI/AAAAAAAAAt4/vkJv5qD5aBc/s400/nothing.png";
	smileyarr["nothing_to_say"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz2j8J54sI/AAAAAAAAAuE/4PBD9yqmspQ/s400/nothing_to_say.png";
	smileyarr["red_heart"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2uFepESI/AAAAAAAAAu0/fubgF8AAefM/s400/red_heart.png";
	smileyarr["scorn"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2zU3ILvI/AAAAAAAAAvM/-H9ckSXPxmc/s400/scorn.png";
	smileyarr["secret_smile"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz21NBPS2I/AAAAAAAAAvY/2pLmY0flx9s/s400/secret_smile.png";
	smileyarr["shame1"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8bCSxHGVI/AAAAAAAAA4w/l3uPvf8LtJw/s400/shame1.png";
	smileyarr["shocked"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8bE7jtOkI/AAAAAAAAA48/Z9jWZVCvpow/s400/shocked.png";
	smileyarr["super_man"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8bGyDnFmI/AAAAAAAAA5I/zJOWqcX5gd0/s400/super_man.png";
	smileyarr["the_iron_man"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8bIx8XfKI/AAAAAAAAA5U/WJgeaJZrE9E/s400/the_iron_man.png";
	smileyarr["unhappy"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8bLVkRExI/AAAAAAAAA5g/Tp3riIIinNA/s400/unhappy.png";
	smileyarr["victory"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8bNeb6g1I/AAAAAAAAA5s/pDeNaNj36bg/s400/victory.png";





	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);

			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

// soft's script