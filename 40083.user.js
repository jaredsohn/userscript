// ==UserScript==
// @name           Fazed smilies
// @namespace      tatrat66.deviantart.com
// @description    a script to find and replace text smilies with attractive graphic equivilent.
// @include        http://*fazed.org/forum/*
// @include        http://*skill.org/forum/*
// @include        http://*fazed.net/forum/*
// @include        http://*fazed.org/pm/*
// @include        http://*skill.org/pm/*
// @include        http://*fazed.net/pm/*
// ==/UserScript==

/////////This script was modified for Fazed.org from the Yahoo smilies in ORKUT script./////////
/////////////////////////////YOU MAY ALL FEEL FREE TO HATE ME :)////////////////////////////////


///The smilies will only display for people who have inlines turned on, otherwise, they will display as image links to yahoo//

 addEventListener('load', function(event) {
function getTextArea() {
	return document.getElementsByTagName('textarea')[0];
}



function smile() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/1.gif[/img]";
}


function sad() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/2.gif[/img]";
}


function angry() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/14.gif[/img]";
}



function bsmile() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/4.gif[/img]";
}


function funny() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/10.gif[/img]";
}

function surprise() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/13.gif[/img]";
}


function wink() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/3.gif[/img]";
}


function cool() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/16.gif[/img]";
}

function confuse() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/7.gif[/img]";
}

function hug() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/6.gif[/img]";
}

function heart() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/8.gif[/img]";
}

function kiss() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/11.gif[/img]";
}

function laugh() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/21.gif[/img]";
}

function drool() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/38.gif[/img]";
}

function doubt() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/23.gif[/img]";
}

function blush() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/9.gif[/img]";
}

function devil() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/19.gif[/img]";
}

function angel() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/25.gif[/img]";
}

function roll() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/24.gif[/img]";
}

function sleep() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/28.gif[/img]";
}

function notalk() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/33.gif[/img]";
}

function worried() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/17.gif[/img]";
}

function wait() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/45.gif[/img]";
}

function applause() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/41.gif[/img]";
}

function straight() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/22.gif[/img]";
}

function silly() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/35.gif[/img]";
}

function smug() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/15.gif[/img]";
}

function sick() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/31.gif[/img]";
}

function party() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/36.gif[/img]";
}

function dream() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/105.gif[/img]";
}

function irritated() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/102.gif[/img]";
}

function eyelash() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/104.gif[/img]";
}

function whew() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/18.gif[/img]";
}

function nerd() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/26.gif[/img]";
}

function phbbt() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/47.gif[/img]";
}

function hypno() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/43.gif[/img]";
}

function yawn() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/37.gif[/img]";
}

function sigh() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/46.gif[/img]";
}

function clown() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/34.gif[/img]";
}

function bye() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/103.gif[/img]";
}

function bringiton() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/70.gif[/img]";
}

function peace() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/67.gif[/img]";
}

function dancing() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/69.gif[/img]";
}

function worthy() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/77.gif[/img]";
}

function money() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/64.gif[/img]";
}

function pray() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/63.gif[/img]";
}

function chatter() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/76.gif[/img]";
}

function whistle() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/65.gif[/img]";
}

function puppy() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/108.gif[/img]";
}

function pig() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/49.gif[/img]";
}

function cow() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/50.gif[/img]";
}

function monkey() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/51.gif[/img]";
}

function chick() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/52.gif[/img]";
}

function rose() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/53.gif[/img]";
}

function cafe() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/57.gif[/img]";
}

function skull() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/59.gif[/img]";
}

function star() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/79.gif[/img]";
}

function ying() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/75.gif[/img]";
}

function boy() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/72.gif[/img]";
}

function girl() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[img]http://i242.photobucket.com/albums/ff6/yahoo-emotions/74.gif[/img]";
}



//-----------------------------------------------------------
//--                  Written links                        --
//-----------------------------------------------------------
	function dip() {
	text=getTextArea();
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("div");
	d.className="T";
	d.style.fontsize="11px";
	d.align="center";
	d.style.width="400px"
	d.style.background="#eeeeee";
	d.style.border="1px solid #000000";
	
        d.style.marginTop="10px";
	c.appendChild(d);
	mm=document.createElement("a");
	mm.href="javascript:;";
	mm.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/1.gif border=0>";
	mm.addEventListener("click", smile, true);
	d.appendChild(mm);

	aa=document.createElement("a");
	aa.href="javascript:;";
	aa.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/2.gif border=0>";
	aa.addEventListener("click", sad, true);
	d.appendChild(aa);

	bb=document.createElement("a");
	bb.href="javascript:;";
	bb.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/14.gif border=0>";
	bb.addEventListener("click", angry, true);
	d.appendChild(bb);

 	cc=document.createElement("a");
	cc.href="javascript:;";
	cc.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/4.gif border=0>";
	cc.addEventListener("click", bsmile, true);
	d.appendChild(cc);

	ff=document.createElement("a");
	ff.href="javascript:;";
	ff.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/10.gif border=0>";
	ff.addEventListener("click", funny, true);
	d.appendChild(ff);

	gg=document.createElement("a");
	gg.href="javascript:;";
	gg.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/13.gif border=0>";
	gg.addEventListener("click", surprise, true);
	d.appendChild(gg);

	hh=document.createElement("a");
	hh.href="javascript:;";
	hh.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/3.gif border=0>";
	hh.addEventListener("click", wink, true);
	d.appendChild(hh);

	jj=document.createElement("a");
	jj.href="javascript:;";
	jj.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/16.gif border=0>";
	jj.addEventListener("click", cool, true);
	d.appendChild(jj);

	kk=document.createElement("a");
	kk.href="javascript:;";
	kk.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/7.gif border=0>";
	kk.addEventListener("click", confuse, true);
	d.appendChild(kk);

	ll=document.createElement("a");
	ll.href="javascript:;";
	ll.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/6.gif border=0>";
	ll.addEventListener("click", hug, true);
	d.appendChild(ll);


	nn=document.createElement("a");
	nn.href="javascript:;";
	nn.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/8.gif border=0>";
	nn.addEventListener("click", heart, true);
	d.appendChild(nn);


	oo=document.createElement("a");
	oo.href="javascript:;";
	oo.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/11.gif border=0>";
	oo.addEventListener("click", kiss, true);
	d.appendChild(oo);


	pp=document.createElement("a");
	pp.href="javascript:;";
	pp.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/21.gif border=0>";
	pp.addEventListener("click", laugh, true);
	d.appendChild(pp);


	qq=document.createElement("a");
	qq.href="javascript:;";
	qq.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/38.gif border=0>";
	qq.addEventListener("click", drool, true);
	d.appendChild(qq);


	rr=document.createElement("a");
	rr.href="javascript:;";
	rr.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/23.gif border=0>";
	rr.addEventListener("click", doubt, true);
	d.appendChild(rr);


	ss=document.createElement("a");
	ss.href="javascript:;";
	ss.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/9.gif border=0>";
	ss.addEventListener("click", blush, true);
	d.appendChild(ss);


	tt=document.createElement("a");
	tt.href="javascript:;";
	tt.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/19.gif border=0>";
	tt.addEventListener("click", devil, true);
	d.appendChild(tt);


	uu=document.createElement("a");
	uu.href="javascript:;";
	uu.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/25.gif border=0>";
	uu.addEventListener("click", angel, true);
	d.appendChild(uu);


	vv=document.createElement("a");
	vv.href="javascript:;";
	vv.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/24.gif border=0>";
	vv.addEventListener("click", roll, true);
	d.appendChild(vv);


	ww=document.createElement("a");
	ww.href="javascript:;";
	ww.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/28.gif border=0>";
	ww.addEventListener("click", sleep, true);
	d.appendChild(ww);


	xx=document.createElement("a");
	xx.href="javascript:;";
	xx.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/33.gif border=0>";
	xx.addEventListener("click", notalk, true);
	d.appendChild(xx);


	yy=document.createElement("a");
	yy.href="javascript:;";
	yy.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/17.gif border=0>";
	yy.addEventListener("click", worried, true);
	d.appendChild(yy);


	zz=document.createElement("a");
	zz.href="javascript:;";
	zz.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/45.gif border=0>";
	zz.addEventListener("click", wait, true);
	d.appendChild(zz);

	os=document.createElement("a");
	os.href="javascript:;";
	os.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/41.gif border=0>";
	os.addEventListener("click", applause, true);
	d.appendChild(os);

              z=document.createElement("a");
	z.href="javascript:;";
	z.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/22.gif border=0>";
	z.addEventListener("click", straight, true);
	d.appendChild(z);

              ps=document.createElement("a");
	ps.href="javascript:;";
	ps.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/35.gif border=0>";
	ps.addEventListener("click", silly, true);
	d.appendChild(ps);

              ab=document.createElement("a");
	ab.href="javascript:;";
	ab.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/15.gif border=0>";
	ab.addEventListener("click", smug, true);
	d.appendChild(ab);

              yz=document.createElement("a");
	yz.href="javascript:;";
	yz.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/31.gif border=0>";
	yz.addEventListener("click", sick, true);
	d.appendChild(yz);

              xz=document.createElement("a");
	xz.href="javascript:;";
	xz.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/36.gif border=0>";
	xz.addEventListener("click", party, true);
	d.appendChild(xz);

              yx=document.createElement("a");
	yx.href="javascript:;";
	yx.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/105.gif border=0>";
	yx.addEventListener("click", dream, true);
	d.appendChild(yx);

              xz=document.createElement("a");
	xz.href="javascript:;";
	xz.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/102.gif border=0>";
	xz.addEventListener("click", irritated, true);
	d.appendChild(xz);

              yq=document.createElement("a");
	yq.href="javascript:;";
	yq.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/104.gif border=0>";
	yq.addEventListener("click", eyelash, true);
	d.appendChild(yq);

              rz=document.createElement("a");
	rz.href="javascript:;";
	rz.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/18.gif border=0>";
	rz.addEventListener("click", whew, true);
	d.appendChild(rz);

              qw=document.createElement("a");
	qw.href="javascript:;";
	qw.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/26.gif border=0>";
	qw.addEventListener("click", nerd, true);
	d.appendChild(qw);

              rt=document.createElement("a");
	rt.href="javascript:;";
	rt.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/47.gif border=0>";
	rt.addEventListener("click", phbbt, true);
	d.appendChild(rt);

              er=document.createElement("a");
	er.href="javascript:;";
	er.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/43.gif border=0>";
	er.addEventListener("click", hypno, true);
	d.appendChild(er);


              yu=document.createElement("a");
	yu.href="javascript:;";
	yu.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/37.gif border=0>";
	yu.addEventListener("click", yawn, true);
	d.appendChild(yu);

              mz=document.createElement("a");
	mz.href="javascript:;";
	mz.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/46.gif border=0>";
	mz.addEventListener("click", sigh, true);
	d.appendChild(mz);

              io=document.createElement("a");
	io.href="javascript:;";
	io.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/34.gif border=0>";
	io.addEventListener("click", clown, true);
	d.appendChild(io);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/103.gif border=0>";
	we.addEventListener("click", bye, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/70.gif border=0>";
	we.addEventListener("click", bringiton, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/67.gif border=0>";
	we.addEventListener("click", peace, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/69.gif border=0>";
	we.addEventListener("click", dancing, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/77.gif border=0>";
	we.addEventListener("click", worthy, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/64.gif border=0>";
	we.addEventListener("click", money, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/63.gif border=0>";
	we.addEventListener("click", pray, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/76.gif border=0>";
	we.addEventListener("click", chatter, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/65.gif border=0>";
	we.addEventListener("click", whistle, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/108.gif border=0>";
	we.addEventListener("click", puppy, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/49.gif border=0>";
	we.addEventListener("click", pig, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/50.gif border=0>";
	we.addEventListener("click", cow, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/51.gif border=0>";
	we.addEventListener("click", monkey, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/52.gif border=0>";
	we.addEventListener("click", chick, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/53.gif border=0>";
	we.addEventListener("click", rose, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/57.gif border=0>";
	we.addEventListener("click", cafe, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/59.gif border=0>";
	we.addEventListener("click", skull, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/79.gif border=0>";
	we.addEventListener("click", star, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/75.gif border=0>";
	we.addEventListener("click", ying, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/72.gif border=0>";
	we.addEventListener("click", boy, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i242.photobucket.com/albums/ff6/yahoo-emotions/74.gif border=0>";
	we.addEventListener("click", girl, true);
	d.appendChild(we);
	
}
dip();
}, false);