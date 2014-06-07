// ==UserScript==
// @name           mafia-wars-copied-script-for-testing-don't-use
// @author         Unknown
// @version        1.0
// @include        http://apps.facebook.com/inthemafia/*

/* @reason
@end*/
// ==/UserScript==

javascript:var%20energy=document.getElementById("app10979261223_user_energy").innerHTML,expnow=document.getElementById("app10979261223_user_experience").innerHTML,expnext=document.getElementById("app10979261223_exp_for_next_level").innerHTML,expneed=parseInt(expnext)-parseInt(expnow),d=0,i,en,exp,ratio;alljobs=document.getElementsByClassName("job_energy");for(i=0;i<alljobs.length;i++){en=parseInt(document.getElementsByClassName("job_energy")[i].firstChild.innerHTML);exp=parseInt(document.getElementsByClassName("job_reward")[i].childNodes[4].innerHTML);ratio=(parseInt(exp)/parseInt(en)).toFixed(3);document.getElementsByClassName("job_reward")[i].childNodes[4].innerHTML=+exp+"%20("+ratio+")"}ratio=expneed/energy;if(Math.abs(ratio)<10){d=3}else{if(Math.abs(ratio)<100){d=2}else{if(Math.abs(ratio)<1000){d=1}}}void%20(document.getElementsByClassName("stat_title")[5].innerHTML="Need:%20"+expneed+"%20("+(ratio).toFixed(d)+")");