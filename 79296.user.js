// coding: utf-8
// version 0.1.2
// 2010-06-22
// author - Chris Kontokostas
// contributions by - Chris Kontokostas
//
// homepage - 
// for up to date details and version, please check the home page.
//
// Please do not remove the above details; it is impossible to ensure
// all copys of this script are kept upto date, people need to know
// where they can go to get the most up to date version.
//
// ==UserScript==
// @name           LinkGrabber
// @namespace      ikariamScript
// @description    Grab image, youtube and common link in ikariam messages, and make them live.
// @include        http://s*.*.ikariam.com/index.php*
// @exclude        http://board.*.ikariam.com/*
// ==/UserScript==

var td_c='#f8e0d8';

function s_m(ms,j){
	ss1="<small><br /><center><object width=640 height=385><param name=movie value=";
	ss2="&hl=el_GR&fs=1&rel=0&color1=0x492300&color2=0x9e4e00></param><param name=allowFullScreen value=true></param><param name=allowscriptaccess value=always></param><embed src=";
	ss3="&hl=el_GR&fs=1&rel=0&color1=0x492300&color2=0x9e4e00 type=application/x-shockwave-flash allowscriptaccess=always allowfullscreen=true width=398 height=259></embed></object></center> ";
	ss4="<br>by chr-kont</small><br>";
	re = false;
	msg=ms.innerHTML;
	if (msg.split("<object").length>1) { 
		msg = msg.split("<object")[0]+msg.split("</object>")[1];
	}
	if (msg.split("http://").length>1) { 
				lnk = msg.match(/((http|ftp):\/\/[^<| ]+)/g);
				for (i=0;i<lnk.length;i++) {
					lnk[i]=lnk[i].replace(/\s+/g,'');
					if (lnk[i].split(/\.jpg$/).length>1) // test
					{	
					 	s1 = "<a target='_blank' href='"+lnk[i]+"' style='text-decoration:none; color:#00F; font-weight:bold; font-size:12px;' onmouseover='document.getElementById(\"m_"+j+"_"+i+"\").style.display=\"\";' onmouseout='document.getElementById(\"m_"+j+"_"+i+"\").style.display=\"none\";' >"+lnk[i]+"<div id='m_"+j+"_"+i+"' style='position:absolute; display:none; z-index:99;'>";
						s2 = "<table border='1'><tr><td><img src='";
						s3 = "' ></td></tr></table></div></a>";
						msg = msg.replace(lnk[i],s1+s2+lnk[i]+s3);
						
					} else if ((lnk[i].search(/\.jpg$/)>-1)||(lnk[i].search(/\.gif$/)>-1)||(lnk[i].search(/\.png$/)>-1)) // Φωτογραφίες
					{ 	s1 = "<br><a href='";
						s2 = "' target='_blank' border='0' ><img src='";
						s3 = "' width='240' onmouseout='this.style.width=\"\";'";
						s3 +=" onmouseover='this.style.width=\"auto\";'";
						s3 +="></a>";
						msg = msg.replace(lnk[i],lnk[i]+s1+lnk[i]+s2+lnk[i]+s3);
					} else if (lnk[i].search(/http:\/\/www.youtube.com/)>-1) // video youtube
					{
						msg=msg.replace(lnk[i],lnk[i]+ss1+lnk[i]+ss2+lnk[i]+ss3+ss4);
					} else  // Απλός σύνδεσμος
					{ 
						msg = msg.replace(lnk[i],"<a href='"+lnk[i]+"' target='_blank' style='text-decoration:none; color:#00F; font-weight:bold; font-size:12px;'>( "+lnk[i]+" )</a>");
					}
				}
				msg = msg.replace(/(watch|watch_popup)\?v=/gi,"v/");
				ms.innerHTML=msg;
				re=true;
	}
	return(re);
}
function unt_split(ss) {
var tt = [0,0];
	if (ss=="-") { tt[0]=1-1; tt[1]=1-1;}
	else {
		ss = ss.split("(");
		tt[1] = ss[1].split(")")[0]*1;
		tt[0] = ss[0]*1;
	} 
	return(tt);
}
function init() {
if (document.getElementById('diplomacyAdvisorOutBox')) { 
	tbl=document.getElementsByTagName("table");
	for(j=1;j<=11;j++) {
		cl = tbl[1].rows[2*j].cells[0];
		dv = cl.getElementsByTagName("div");
		if (s_m(dv[0],j)) {
			tbl[1].rows[2*j-1].style.backgroundColor=td_c;

		};
	}
 
} else
if (document.getElementById('diplomacyAdvisor')) { 
	tbl=document.getElementsByTagName("table");
	for(j=1;j<=11;j++) {
		cl = tbl[1].rows[3*j-1].cells[0];
		if (!cl.getElementsByTagName("div")) {
			dv = cl.getElementsByTagName("div")[0];
		} else { dv = tbl[1].rows[3*j-1]; }
		if (s_m(dv,j)) {
			tbl[1].rows[3*j-2].style.backgroundColor=td_c;
		};
	}
 
}
}  

init();
