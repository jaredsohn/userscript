// ==UserScript==
// @name aroz9 
// @version 0.1.2.2
// @description Fix vvv
// @include http://*.inn.co.il/Forum/lmf_profile.aspx/*
// @include http://*.inn.co.il/Forum/lmf_Profile.aspx/*
// ==/UserScript==



  do_it=  function() {
	URLscript=document.createTextNode("MAS ="+mmm+"\n MAS();");
	var Uscript = document.createElement('script');
	Uscript.setAttribute('language','javascript');
	Uscript.setAttribute('id','MAS_HOD');
	document.body.appendChild(Uscript);
	document.getElementById('MAS_HOD').appendChild(URLscript);
	
	
	};

mmm=function (){
var arrtc=document.getElementsByClassName("TC")
var arrtd=document.getElementsByClassName("TD")

var date_from;
var mas_hod;
for (var i_tc=0;i_tc<arrtc.length;i_tc++){

if (arrtc[i_tc].innerHTML=="חבר מאז:"){
date_from=arrtd[i_tc].innerHTML.match(/\((.*?)\)/)[1]
}
if (arrtc[i_tc].innerHTML=="הודעות בפורום:"){
mas_hod=arrtd[i_tc].innerHTML
}
}

var daarr=date_from.split('/');

var hefresh=(Date.now()-Date.parse(daarr[1]+"/"+daarr[0]+"/"+daarr[2]))/(1000*60*60*24);
var m_h=mas_hod/hefresh;
var tab=document.getElementsByClassName("Td TdC")[0].children[0].children[0]

var mytr = document.createElement('tr');
mytr.innerHTML="<td class=\"TC\" nowrap=\"\">הודעות ליום:</td><td class=\"TD\">"+ m_h.toFixed(3) +"</td>"
tab.appendChild(mytr)

return m_h;
}
do_it();