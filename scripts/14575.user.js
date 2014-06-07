// ==UserScript==
// @name           Yahoo Smilies in Orkut! 
// @namespace      Yahoo! Smilie
// @description    Use Yahoo! Smilies for Orkut! nd no need 2fill capcthas :P spl thnx 2 omkar
// @include        http://www.orkut.com/Scrapbook.aspx*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea() {
	return document.getElementsByTagName('textarea')[0];
}



function smile() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/agreement9.gif>";
}


function sad() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/alien8.gif>";
}


function angry() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/aloofandbored12.gif>";
}



function bsmile() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/angel9.gif>";
}


function funny() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/angry7.gif>";
}

function surprise() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/angry25.gif>";
}


function wink() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/angry19.gif>";
}


function cool() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/angry7.gif>";
}

function confuse() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/animals18.gif>";
}

function hug() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/animals4.gif>";
}

function heart() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/badtaste25.gif>";
}

function kiss() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/badtaste8.gif>";
}

function laugh() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/celebrate13.gif>";
}

function drool() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/celebrate15.gif>";
}

function doubt() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/confused10.gif>";
}

function blush() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/doh31.gif>";
}

function devil() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/fighting1.gif>";
}

function angel() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/fighting6.gif>";
}

function roll() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/foodanddrink13.gif>";
}

function sleep() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/foodanddrink8.gif>";
}

function notalk() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/foodanddrink21.gif>";
}

function worried() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/happy16.gif>";
}

function wait() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<img src=http://smileyjungle.com/smilies/happy21.gif>";
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
	mm.innerHTML="<img src=http://smileyjungle.com/smilies/agreement9.gif>";
	mm.addEventListener("click", smile, true);
	d.appendChild(mm);

	aa=document.createElement("a");
	aa.href="javascript:;";
	aa.innerHTML="<img src=http://smileyjungle.com/smilies/alien8.gif>";
	aa.addEventListener("click", sad, true);
	d.appendChild(aa);

	bb=document.createElement("a");
	bb.href="javascript:;";
	bb.innerHTML="<img src=http://smileyjungle.com/smilies/aloofandbored12.gif>";
	bb.addEventListener("click", angry, true);
	d.appendChild(bb);

 	cc=document.createElement("a");
	cc.href="javascript:;";
	cc.innerHTML="<img src=http://smileyjungle.com/smilies/angel9.gif>";
	cc.addEventListener("click", bsmile, true);
	d.appendChild(cc);

	ff=document.createElement("a");
	ff.href="javascript:;";
	ff.innerHTML="<img src=http://smileyjungle.com/smilies/angry7.gif>";
	ff.addEventListener("click", funny, true);
	d.appendChild(ff);

	gg=document.createElement("a");
	gg.href="javascript:;";
	gg.innerHTML="<img src=http://smileyjungle.com/smilies/angry25.gif>";
	gg.addEventListener("click", surprise, true);
	d.appendChild(gg);

	hh=document.createElement("a");
	hh.href="javascript:;";
	hh.innerHTML="<img src=http://smileyjungle.com/smilies/angry19.gif>";
	hh.addEventListener("click", wink, true);
	d.appendChild(hh);

	jj=document.createElement("a");
	jj.href="javascript:;";
	jj.innerHTML="<img src=http://smileyjungle.com/smilies/angry7.gif>";
	jj.addEventListener("click", cool, true);
	d.appendChild(jj);

	kk=document.createElement("a");
	kk.href="javascript:;";
	kk.innerHTML="<img src=http://smileyjungle.com/smilies/animals18.gif>";
	kk.addEventListener("click", confuse, true);
	d.appendChild(kk);

	ll=document.createElement("a");
	ll.href="javascript:;";
	ll.innerHTML="<img src=http://smileyjungle.com/smilies/animals4.gif>";
	ll.addEventListener("click", hug, true);
	d.appendChild(ll);


	nn=document.createElement("a");
	nn.href="javascript:;";
	nn.innerHTML="<img src=http://smileyjungle.com/smilies/badtaste25.gif>";
	nn.addEventListener("click", heart, true);
	d.appendChild(nn);


	oo=document.createElement("a");
	oo.href="javascript:;";
	oo.innerHTML="<img src=http://smileyjungle.com/smilies/badtaste8.gif>";
	oo.addEventListener("click", kiss, true);
	d.appendChild(oo);


	pp=document.createElement("a");
	pp.href="javascript:;";
	pp.innerHTML="<img src=http://smileyjungle.com/smilies/celebrate13.gif>";
	pp.addEventListener("click", laugh, true);
	d.appendChild(pp);


	qq=document.createElement("a");
	qq.href="javascript:;";
	qq.innerHTML="<img src=http://smileyjungle.com/smilies/celebrate15.gif>";
	qq.addEventListener("click", drool, true);
	d.appendChild(qq);


	rr=document.createElement("a");
	rr.href="javascript:;";
	rr.innerHTML="<img src=http://smileyjungle.com/smilies/confused10.gif>";
	rr.addEventListener("click", doubt, true);
	d.appendChild(rr);


	ss=document.createElement("a");
	ss.href="javascript:;";
	ss.innerHTML="<img src=http://smileyjungle.com/smilies/doh31.gif>";
	ss.addEventListener("click", blush, true);
	d.appendChild(ss);


	tt=document.createElement("a");
	tt.href="javascript:;";
	tt.innerHTML="<img src=http://smileyjungle.com/smilies/fighting1.gif>";
	tt.addEventListener("click", devil, true);
	d.appendChild(tt);


	uu=document.createElement("a");
	uu.href="javascript:;";
	uu.innerHTML="<img src=http://smileyjungle.com/smilies/fighting6.gif>";
	uu.addEventListener("click", angel, true);
	d.appendChild(uu);


	vv=document.createElement("a");
	vv.href="javascript:;";
	vv.innerHTML="<img src=http://smileyjungle.com/smilies/foodanddrink13.gif>";
	vv.addEventListener("click", roll, true);
	d.appendChild(vv);


	ww=document.createElement("a");
	ww.href="javascript:;";
	ww.innerHTML="<img src=http://smileyjungle.com/smilies/foodanddrink13.gif>";
	ww.addEventListener("click", sleep, true);
	d.appendChild(ww);


	xx=document.createElement("a");
	xx.href="javascript:;";
	xx.innerHTML="<img src=http://smileyjungle.com/smilies/foodanddrink8.gif>";
	xx.addEventListener("click", notalk, true);
	d.appendChild(xx);


	yy=document.createElement("a");
	yy.href="javascript:;";
	yy.innerHTML="<img src=http://smileyjungle.com/smilies/foodanddrink21.gif>";
	yy.addEventListener("click", worried, true);
	d.appendChild(yy);


	zz=document.createElement("a");
	zz.href="javascript:;";
	zz.innerHTML="<img src=http://smileyjungle.com/smilies/happy16.gif>";
	zz.addEventListener("click", wait, true);
	d.appendChild(zz);

	os=document.createElement("a");
	os.href="javascript:;";
	os.innerHTML="<img src=http://smileyjungle.com/smilies/happy21.gif>";
	os.addEventListener("click", applause, true);
	d.appendChild(os);

             
}
dip();
}, false);

