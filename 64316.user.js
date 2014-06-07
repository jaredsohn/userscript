// ==UserScript==
// @name          Smile abhishek
// @namespace     uid=15882802971460031749
// @author	  aBHISHEK sINGH
// @description   Not described, only prescribed :P
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

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
	var Soul = new Array();
Soul["smile"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz294c_VxI/AAAAAAAAAv8/1aFFq074XDI/s400/smile.png";

Soul["angry"]="http://lh3.ggpht.com/_35QFSJ1vbCE/SkzjAafV31I/AAAAAAAAApY/K8Q6DWNtA7U/s400/angry.png";

Soul["amazed"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skzi8VCHE6I/AAAAAAAAApM/Z1tLU2v0WZ4/s400/amazed.png";
	Soul["angry"]="http://lh3.ggpht.com/_35QFSJ1vbCE/SkzjAafV31I/AAAAAAAAApY/K8Q6DWNtA7U/s400/angry.png";
	Soul["beat_brick"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz1h1Zj2mI/AAAAAAAAAqU/gpoZC0l123A/s400/beat_brick.png";
	Soul["beat_plaster"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz1l4SvaLI/AAAAAAAAAqg/IC_FvTfO_VQ/s400/beat_plaster.png";
	Soul["beat_shot"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz1okyDecI/AAAAAAAAAqs/Hhgyi1HTij4/s400/beat_shot.png";
	Soul["beauty"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz1rmLNibI/AAAAAAAAAq4/EtLlGBoGCkw/s400/beauty.png";
	Soul["big_smile"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz1cc9UJgI/AAAAAAAAAqI/VJGV-6YjqhY/s400/big_smile.png";
	Soul["burn_joss_stick"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz1y2wtD3I/AAAAAAAAArE/pVnolf3ngw0/s400/burn_joss_stick.png";
	Soul["canny"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz18h7yCbI/AAAAAAAAArQ/E2N6mGAXGHw/s400/canny.png";
	Soul["choler"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz1_LLERAI/AAAAAAAAArc/VPvJabfQgwU/s400/choler.png";
	Soul["cold"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2BsNbjaI/AAAAAAAAAro/-uSEhA4V3LU/s400/cold.png";
	Soul["cool"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2ErCl22I/AAAAAAAAAr0/rnsP1uuJMsI/s400/cool.png";
	Soul["cry"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2HTAkUCI/AAAAAAAAAsA/8n_fdClKAfk/s400/cry.png";
	Soul["doubt"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz2Jlh6gEI/AAAAAAAAAsM/u3rIA5ldFys/s400/doubt.png";
	Soul["dribble"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2L_YD4MI/AAAAAAAAAsY/20DKZFsHxfg/s400/dribble.png";
	Soul["embressed"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2OM0FEII/AAAAAAAAAsk/0ypVBJtz1S4/s400/embarrassed.png";
	Soul["go"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2QTFSqwI/AAAAAAAAAsw/UPF-EEZ6Ucg/s400/go.png";
	Soul["haha"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2SmzTjrI/AAAAAAAAAs8/StBb4_r8cbQ/s400/haha.png";
	Soul["look_down"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2WthNAsI/AAAAAAAAAtI/-Mjdel2pOb0/s400/look_down.png";
	Soul["misdoubt"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2axb4Y6I/AAAAAAAAAtg/DSU1GP6m4uI/s400/misdoubt.png";
	Soul["nosebleed"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2dDFSkVI/AAAAAAAAAts/-cNgIReiF6U/s400/nosebleed.png";
	Soul["oh"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2mCxRZbI/AAAAAAAAAuQ/CVz5EgU5vPU/s400/oh.png";
	Soul["pudency"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2pAblhuI/AAAAAAAAAuc/T9T0ORSuA3U/s400/pudency.png";
	Soul["rap"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2rl0nBSI/AAAAAAAAAuo/VxsnFfAC08M/s400/rap.png";
	Soul["shame"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz23QN7rhI/AAAAAAAAAvk/eOeh-Cdj-8g/s400/shame.png";
	Soul["smile"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz294c_VxI/AAAAAAAAAv8/1aFFq074XDI/s400/smile.png";
	Soul["sure"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz25nsZ5yI/AAAAAAAAAvw/lUJxBBky9Bc/s400/sure.png";
	Soul["sweat"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz3B4cLrXI/AAAAAAAAAwI/HTyedK33PNA/s400/sweat.png";
	Soul["wtf"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz3FdSjT0I/AAAAAAAAAwU/4sdMHxrUH20/s400/waaaht.png";

Soul["Funny"]="http://lh3.ggpht.com/_Ajoc8AujQC0/StHudlqXeHI/AAAAAAAAAJ4/sz7QRLqRW0c/s400/i_funny.png";

Soul["Confuse"]="http://lh5.ggpht.com/_s0zy10ZcnuU/Sx3V286wjyI/AAAAAAAAAGg/SM6GIF5kgFA/s400/confused9.png";

Soul["Smokin"]="http://lh3.ggpht.com/_s0zy10ZcnuU/Sx3WAlbPuVI/AAAAAAAAAHQ/dA21Kvsh7x4/s400/glasses12.png";

Soul["Dance"]="http://lh4.ggpht.com/_s0zy10ZcnuU/Sx3WUj70l_I/AAAAAAAAAIw/xi_TxunwFaE/s400/laughing1.png";

Soul["Hi"]="http://lh3.ggpht.com/_s0zy10ZcnuU/Sx3WCxAWtXI/AAAAAAAAAHc/GtyWFw87Dmk/s400/greetings10.png";

Soul["lol"]="http://lh6.ggpht.com/_s0zy10ZcnuU/Sx3Wciy2uUI/AAAAAAAAAI8/_xQCQNwo64k/s400/laughing13.png";

Soul["Ouch"]="http://lh3.ggpht.com/_s0zy10ZcnuU/Sx3N_4nmpgI/AAAAAAAAAEE/DSBPnowmLbM/s400/violent5.png";

Soul["Lost"]="http://lh6.ggpht.com/_s0zy10ZcnuU/Sx3WlUrbQnI/AAAAAAAAAJI/F108H1ASrDU/s400/lostit4.png";

Soul["Sad"]="http://lh5.ggpht.com/_s0zy10ZcnuU/Sx3WoxikD0I/AAAAAAAAAJU/LFR931rO1yQ/s400/sad0.png";
	Soul["Angry"]="http://lh5.ggpht.com/_s0zy10ZcnuU/Sx3MdrOdAuI/AAAAAAAAADg/fX_9PeQHQIM/s400/angry0.png";

Soul["Sleepy"]="http://lh4.ggpht.com/_s0zy10ZcnuU/Sx3NcNQymCI/AAAAAAAAAD4/oBiROj51Yxs/s400/aloofandbored12.png";

Soul["Ban"]="http://lh3.ggpht.com/_s0zy10ZcnuU/Sx3Txod_lFI/AAAAAAAAAFM/xz8TVVj9mY4/s400/signsandflags14.png";

Soul["Dead"]="http://lh4.ggpht.com/_s0zy10ZcnuU/Sx3T0SrRvFI/AAAAAAAAAFY/TH2HqPhfjkA/s400/signsandflags19.png";

Soul["Off"]="http://lh4.ggpht.com/_s0zy10ZcnuU/Sx3T9zNjUgI/AAAAAAAAAF8/Z98tq8W-qh8/s400/signsandflags43.png";

Soul["Please"]="http://lh3.ggpht.com/_s0zy10ZcnuU/Sx3T3Ke9laI/AAAAAAAAAFk/EoNKxEfLEJY/s400/signsandflags20.png";


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
		
		for(title in Soul){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);

			mm.innerHTML="<img src='"+Soul[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

// Abh1sh3k