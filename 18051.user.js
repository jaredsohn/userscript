// ==UserScript==
// @name           Emoticon para Orkut! 
// @namespace      Emoticon MSN - ORKUT
// @description    Emoticon msn! By:Ângelo
// @include        http://www.orkut.com/Scrapbook.aspx*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea() {
	return document.getElementsByTagName('textarea')[0];
}



function smile() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/lcheln.gif>";
}


function sad() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-traurig.gif>";
}


function angry() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley_wtend.gif>";
}



function bsmile() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-zunge.gif>";
}


function funny() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley-lachen.gif>";
}

function surprise() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-erstaunt.gif>";
}


function wink() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/zwinkern.gif>";
}


function cool() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-cool.gif>";
}

function confuse() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-grbeln.gif>";
}

function heart() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/Herz.gif>";
}

function vampire() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i214.photobucket.com/albums/cc149/abujug/vampire.gif>";
}

function emb() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i214.photobucket.com/albums/cc149/abujug/emb.gif>";
}

function dunno() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i189.photobucket.com/albums/z154/Danteez/Smileys/nono.gif>";
}

function cry() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-Smiley_heulen.gif>";
}

function devil() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/emsteufel.gif>";
}

function angel() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_angel.gif>";
}

function roll() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i103.photobucket.com/albums/m126/step666/MSN%20smilies/msn_rolleyes.gif>";
}

function sleep() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i103.photobucket.com/albums/m126/step666/MSN%20smilies/msn_sleepy.gif>";
}

function notalk() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i103.photobucket.com/albums/m126/step666/MSN%20smilies/msn_lipssealed.gif>";
}

function thumbs() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-daumenhoch.gif>";
}

function thumbs2() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/ms-daumenrunter.gif>";
}

function beer() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_beer.gif>";
}

function cake() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_cake.gif>";
}

function glass() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Martini.gif>";
}

function sick() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_sick.gif>";
}

function party() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_party.gif>";
}

function straight() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=ttp://i214.photobucket.com/albums/cc149/abujug/what_smile.gif>";
}

function lips() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley-Kuss.gif>";
}

function gift() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-geschenk.gif>";
}

function rose1() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley-Rose.gif>";
}

function nerd() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i189.photobucket.com/albums/z154/Danteez/Smileys/nerd.gif>";
}

function boy() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Guy.gif>";
}

function girl() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i96.photobucket.com/albums/l192/myshenty/MSN/girl.gif>";
}

function rose2() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/WiltedRose.gif>";
}

function foto() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i96.photobucket.com/albums/l192/myshenty/MSN/camera.gif>";
}

function film() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Film.gif>";
}

function cat() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i96.photobucket.com/albums/l192/myshenty/MSN/cat.gif>";
}

function dog() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i96.photobucket.com/albums/l192/myshenty/MSN/dog.gif>";
}

function moon() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i96.photobucket.com/albums/l192/myshenty/MSN/moon.gif>";
}

function pizza() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_pizza.gif>";
}

function ball() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Fotball.gif>";
}

function car() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Car.gif>";
}

function land() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Island.gif>";
}

function bah() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_sheep.gif>";
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
	d.style.fontSize="11px";
	d.align="left";
	
        
        d.style.marginTop="10px";
	c.appendChild(d);
	
	mm=document.createElement("a");
	mm.href="javascript:;";
	mm.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/lcheln.gif>";
	mm.addEventListener("click", smile, true);
	d.appendChild(mm);

	aa=document.createElement("a");
	aa.href="javascript:;";
	aa.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-traurig.gif>";
	aa.addEventListener("click", sad, true);
	d.appendChild(aa);

	bb=document.createElement("a");
	bb.href="javascript:;";
	bb.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley_wtend.gif>";
	bb.addEventListener("click", angry, true);
	d.appendChild(bb);

 	cc=document.createElement("a");
	cc.href="javascript:;";
	cc.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-zunge.gif>";
	cc.addEventListener("click", bsmile, true);
	d.appendChild(cc);

	ff=document.createElement("a");
	ff.href="javascript:;";
	ff.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley-lachen.gif>";
	ff.addEventListener("click", funny, true);
	d.appendChild(ff);

	gg=document.createElement("a");
	gg.href="javascript:;";
	gg.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-erstaunt.gif>";
	gg.addEventListener("click", surprise, true);
	d.appendChild(gg);

	hh=document.createElement("a");
	hh.href="javascript:;";
	hh.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/zwinkern.gif>";
	hh.addEventListener("click", wink, true);
	d.appendChild(hh);

	jj=document.createElement("a");
	jj.href="javascript:;";
	jj.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-cool.gif>";
	jj.addEventListener("click", cool, true);
	d.appendChild(jj);

	kk=document.createElement("a");
	kk.href="javascript:;";
	kk.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-grbeln.gif>";
	kk.addEventListener("click", confuse, true);
	d.appendChild(kk);


	nn=document.createElement("a");
	nn.href="javascript:;";
	nn.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/Herz.gif>";
	nn.addEventListener("click", heart, true);
	d.appendChild(nn);


	oo=document.createElement("a");
	oo.href="javascript:;";
	oo.innerHTML="<img src=http://i214.photobucket.com/albums/cc149/abujug/vampire.gif>";
	oo.addEventListener("click", vampire, true);
	d.appendChild(oo);


	pp=document.createElement("a");
	pp.href="javascript:;";
	pp.innerHTML="<img src=http://i214.photobucket.com/albums/cc149/abujug/emb.gif>";
	pp.addEventListener("click", emb, true);
	d.appendChild(pp);


	qq=document.createElement("a");
	qq.href="javascript:;";
	qq.innerHTML="<img src=http://i189.photobucket.com/albums/z154/Danteez/Smileys/nono.gif>";
	qq.addEventListener("click", dunno, true);
	d.appendChild(qq);


	rr=document.createElement("a");
	rr.href="javascript:;";
	rr.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-Smiley_heulen.gif>";
	rr.addEventListener("click", cry, true);
	d.appendChild(rr);


	tt=document.createElement("a");
	tt.href="javascript:;";
	tt.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/emsteufel.gif>";
	tt.addEventListener("click", devil, true);
	d.appendChild(tt);


	uu=document.createElement("a");
	uu.href="javascript:;";
	uu.innerHTML="<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_angel.gif>";
	uu.addEventListener("click", angel, true);
	d.appendChild(uu);


	vv=document.createElement("a");
	vv.href="javascript:;";
	vv.innerHTML="<img src=http://i103.photobucket.com/albums/m126/step666/MSN%20smilies/msn_rolleyes.gif>";
	vv.addEventListener("click", roll, true);
	d.appendChild(vv);


	ww=document.createElement("a");
	ww.href="javascript:;";
	ww.innerHTML="<img src=http://i103.photobucket.com/albums/m126/step666/MSN%20smilies/msn_sleepy.gif>";
	ww.addEventListener("click", sleep, true);
	d.appendChild(ww);


	xx=document.createElement("a");
	xx.href="javascript:;";
	xx.innerHTML="<img src=http://i103.photobucket.com/albums/m126/step666/MSN%20smilies/msn_lipssealed.gif>";
	xx.addEventListener("click", notalk, true);
	d.appendChild(xx);


	yy=document.createElement("a");
	yy.href="javascript:;";
	yy.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-daumenhoch.gif>";
	yy.addEventListener("click", thumbs, true);
	d.appendChild(yy);


	os=document.createElement("a");
	os.href="javascript:;";
	os.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/ms-daumenrunter.gif>";
	os.addEventListener("click", thumbs2, true);
	d.appendChild(os);

              z=document.createElement("a");
	z.href="javascript:;";
	z.innerHTML="<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_beer.gif>";
	z.addEventListener("click", beer, true);
	d.appendChild(z);

              ps=document.createElement("a");
	ps.href="javascript:;";
	ps.innerHTML="<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_cake.gif>";
	ps.addEventListener("click", cake, true);
	d.appendChild(ps);

              ab=document.createElement("a");
	ab.href="javascript:;";
	ab.innerHTML="<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Martini.gif>";
	ab.addEventListener("click", glass, true);
	d.appendChild(ab);

              yz=document.createElement("a");
	yz.href="javascript:;";
	yz.innerHTML="<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_sick.gif>";
	yz.addEventListener("click", sick, true);
	d.appendChild(yz);

              xz=document.createElement("a");
	xz.href="javascript:;";
	xz.innerHTML="<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_party.gif>";
	xz.addEventListener("click", party, true);
	d.appendChild(xz);

              yx=document.createElement("a");
	yx.href="javascript:;";
	yx.innerHTML="<img src=http://i214.photobucket.com/albums/cc149/abujug/what_smile.gif>";
	yx.addEventListener("click", straight, true);
	d.appendChild(yx);

              xz=document.createElement("a");
	xz.href="javascript:;";
	xz.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley-Kuss.gif>";
	xz.addEventListener("click", lips, true);
	d.appendChild(xz);

              yq=document.createElement("a");
	yq.href="javascript:;";
	yq.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-geschenk.gif>";
	yq.addEventListener("click", gift, true);
	d.appendChild(yq);

              rz=document.createElement("a");
	rz.href="javascript:;";
	rz.innerHTML="<img src=http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley-Rose.gif>";
	rz.addEventListener("click", rose1, true);
	d.appendChild(rz);

              qw=document.createElement("a");
	qw.href="javascript:;";
	qw.innerHTML="<img src=http://i189.photobucket.com/albums/z154/Danteez/Smileys/nerd.gif>";
	qw.addEventListener("click", nerd, true);
	d.appendChild(qw);

              rt=document.createElement("a");
	rt.href="javascript:;";
	rt.innerHTML="<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Guy.gif>";
	rt.addEventListener("click", boy, true);
	d.appendChild(rt);

              er=document.createElement("a");
	er.href="javascript:;";
	er.innerHTML="<img src=http://i96.photobucket.com/albums/l192/myshenty/MSN/girl.gif>";
	er.addEventListener("click", girl, true);
	d.appendChild(er);

              yu=document.createElement("a");
	yu.href="javascript:;";
	yu.innerHTML="<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/WiltedRose.gif>";
	yu.addEventListener("click", rose2, true);
	d.appendChild(yu);

              mz=document.createElement("a");
	mz.href="javascript:;";
	mz.innerHTML="<img src=http://i96.photobucket.com/albums/l192/myshenty/MSN/camera.gif>";
	mz.addEventListener("click", foto, true);
	d.appendChild(mz);

              io=document.createElement("a");
	io.href="javascript:;";
	io.innerHTML="<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Film.gif>";
	io.addEventListener("click", film, true);
	d.appendChild(io);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i96.photobucket.com/albums/l192/myshenty/MSN/cat.gif>";
	we.addEventListener("click", cat, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i96.photobucket.com/albums/l192/myshenty/MSN/dog.gif>";
	we.addEventListener("click", dog, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i96.photobucket.com/albums/l192/myshenty/MSN/moon.gif>";
	we.addEventListener("click", moon, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_pizza.gif>";
	we.addEventListener("click", pizza, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Fotball.gif>";
	we.addEventListener("click", ball, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Car.gif>";
	we.addEventListener("click", car, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Island.gif>";
	we.addEventListener("click", land, true);
	d.appendChild(we);

              we=document.createElement("a");
	we.href="javascript:;";
	we.innerHTML="<img src=http://i123.photobucket.com/albums/o313/elecmx/msn_sheep.gif>";
	we.addEventListener("click", bah, true);
	d.appendChild(we);

}
dip();
}, false);

