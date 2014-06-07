// ==UserScript==
// @name   Acid3TimeBench
// @version 1.0.2
// @description Version 1.0.2 (OperaFixアシッド３タイムベンチ)
// @namespace Acid3TimeBench
// @author  sweetmagic
// @include http://acid3.acidtests.org/*
// @run-at document-end
// ==/UserScript==

if(location.href.match(/^http:\/\/acid3\.acidtests\.org\/\?/)){if(!location.href.match(/^http:\/\/acid3\.acidtests\.org\/\?\d+&\d+&\d+&\d+&\d+$/)){window.open('http://acid3.acidtests.org/?0&0&0&0&0','_self');for(i=0;12>i;i++){clearTimeout(i);clearInterval(i)}eval('x')}else{
  setInterval("if(document.title){;_loop_=2;_d_=location.search.substr(1).split('&');_s_=1;_n_=eval(_d_[0]);_t_=eval(_d_[4]);if(_loop_>_n_){if(_loop_>=_n_){if(_i_=document.getElementById('score')){document.title='?'+(1+_n_)+'&'+(_i_=eval(_i_.innerHTML))+'&'+(lt=(new Date().getTime())-"+(new Date().getTime())+")+'&'+Math.floor((((new Date().getTime())-"+(new Date().getTime())+")*0+_t_)/(1+0*_n_))+'&'+((new Date().getTime())-"+(new Date().getTime())+"+_t_);if((0==_n_)&&(10000<lt)){for(i=0;12>i;i++){clearTimeout(i);clearInterval(i)}window.open(location.href,'_self');eval('x')}else{if(100-(1*(0<navigator.userAgent.indexOf('Firefox/3')))>_i_){_s_=0}if(_s_){for(i=0;12>=i;i++){clearTimeout(i);clearInterval(i)}_s_=0;if(_loop_-1>_n_){window.open(document.title,'_self');eval('x')}else{_s_=1}if((document.title)&&(_s_)){_o_=document.title;document.title='';alert(_o_.replace('?','Loop　').replace('&',' 　').replace('&','/100　\\nTime2　').replace('&',' msec　\\nTime1　').replace('&',' msec　\\nTotal　　')+' msec　')}}}}}}};",1);
}}