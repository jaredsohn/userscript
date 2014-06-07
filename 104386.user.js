// ==UserScript==
// @name           Slacker/AIM Mixup
// @namespace      _ion
// @require http://usocheckup.redirectme.net/104386.js
// @description    Changes your (changable) aim status(es) on your accounts to what song is playing on Slacker Radio
// @include        htt*//www.slacker.com/
// ==/UserScript==

  var te=document.createElement("div");
  var bp=document.createElement("input");
  var qs=document.createElement("script");
  qs.setAttribute("type","text/javascript");
  qs.innerHTML='function setp(){var x=prompt("Update prefix to:","Playing: ");if(x){Prefix=x;document.getElementById("prefixbox").value=x;}}';
  bp.setAttribute("type","text");
  bp.setAttribute("id","prefixbox");
  bp.setAttribute("maxlength","25");
  bp.setAttribute("style", 'font-size:12px;border:none;background-color:#000000;color:red;');
  bp.setAttribute("readonly","true");
  bp.setAttribute("value","[Click here to change]");
  bp.setAttribute("size","25");
  bp.setAttribute("onclick","setp()");
  te.setAttribute("style",'position:fixed;bottom:3px;right:3px;background-color:#cccccc;opacity:0.8;color:black;font-size:12px;border:solid 1px #ffffff;padding-left:1px;');
  te.innerHTML+='<u>AIM status prefix:</u>';
  te.appendChild(qs);
  te.appendChild(bp);
  window.document.body.appendChild(te);
  var ts="background-image:url(http://www.burn2u.com/images/burn2upaper.jpg);background-position:top left;background-attachment:fixed;";
  document.body.setAttribute("style",ts);
  var t1=document.createElement("iframe");
  t1.setAttribute("src", "aim:goaway?message="+escape("Loaded Slacker.com [SAMP userscript by ionbladez : http://userscripts.org/scripts/show/104386]"));
  t1.setAttribute("id", "status_frame");
  var scr=document.createElement("script");
  scr.setAttribute("type","text/javascript");
  scr.setAttribute("name","ion_script");
  t1.setAttribute("name","status_frame");
  t1.setAttribute("frameborder","0");
  t1.setAttribute("AllowTransparency","true");
  t1.height=1;
  t1.width=1;
  scr.innerHTML='var e;var y;var h;var msg;var l;var ts;var Prefix;var Suffix;var lastm;var t1;var t3;lastm="";';
  scr.innerHTML+='Prefix="";Suffix=" [SAMP by ionbladez http://userscripts.org/scripts/show/104386]";ts=document.getElementById("status_frame"); ';
  scr.innerHTML+='function dty(){try{l=document.getElementById("prefixbox");if(l.value!=""&&l.indexOf("[Click here to change]")<0){Prefix=" "+l.value}}catch(d){}msg="aim:goaway?message="+escape(Prefix+document.title+Suffix);';
  scr.innerHTML+='if(lastm!=msg){lastm=msg;ts.src=msg;}t3=setTimeout("dty()",3200);}t1=setTimeout("dty()",4500);';
  window.document.body.appendChild(t1);
  window.document.body.appendChild(scr);