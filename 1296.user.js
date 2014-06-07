// ==UserScript==
// @name           Fox-ie ToolBar vDNG 
// @namespace      http://inmendham.com/tb0503.htm
// @description    User Tools and Links
// @include        *
//==/UserScript==

selON=0
TxXs=700;
kL=0;ioi=0;Ww=window;Dd=document;Di=Dd.images.length;Dl=Dd.links.length;CCh=Dd.body.clientHeight;CCw=Dd.body.clientWidth;cw=CCw-160;bgc=Dd.body.bgColor;RanN=0;sy1=0;bwb=1;testerv=3;var IE4 = (document.all);msn=new Array();var X2jsP1,X2jsP2,X2jsP3="";col1='ddddee';col2='000000';sindx=0;tsi='';loc='';dfd=0;ftr='X2jsN';tTm=555;TtM=0;Opto=0;
window.rAD = function(tx){RanN=Math.floor((Math.random()*tx));}

window.reFr=function(){if(IE4){ao.style.top=document.documentElement.scrollTop;aoL.style.top=document.documentElement.scrollTop;}TtM+=1;if(tTm==3000){clearInterval(TlL);location=f6t[3];}if(Opto==1){this.window.stop();}if(kL==3){Dd2();kL=2;}}

window.Dd2 = function(){void(Dd=wer.document);void(Ww=wer)};

window.GeTp = function(url)  {
GM_xmlhttpRequest({
method:"GET",url:url,onload:function(details) {

SmchF="<hr>";
var Smch = details.responseText.match(/<sc.[^<]*/gi);

if(Smch){for(i=0;i<Smch.length;++i){if(Smch[i].indexOf('.js')>0){Smch[i]=Smch[i].replace(/"/g,"\\'");SmchF+="<a href=\"javascript:Winb=window.open();Winb.document.write('<html><body>"+Smch[i]+"'+'</script></body></html>')\">.js file "+i+"</a><br>"}else{};}
}


match2F="<hr>";
var match2 = details.responseText.match(/<a .[^>]*/gi);
for(i=0;i<match2.length;++i){match2F+=match2[i]+">";match2[i]=match2[i].match(/=.[^"]*/gi);
match2F+=match2[i]+"</a><br>"}

var match = details.responseText.match(/<img.[^>]*/gi);

matchF="<hr>";
if(match){
url1=url.split("\/")
url2="";

for(i=0;i<url1.length-1;++i){url2+=url1[i]+"\/"}
frt=url2
frt="src=\""+frt
for(i=0;i<match.length;++i){if(match[i].indexOf('http')<0){match[i]=match[i].replace(/src="/gi,frt)};if(matchF.indexOf(match[i])<0){matchF+=match[i]+">"}}
}
matchF=matchF.replace(/align/gi,"a1")
matchF=matchF.replace(/width/gi,"W1")
matchF=matchF.replace(/height/gi,"H1")
matchF=matchF.replace(/img/gi,"img width=70 height=90")
whol=details.responseText.replace(/<s(\S+).*>(.*)<\/s\1>/gi,"<P>THIS WAS SCRIPT<P>")

whol=whol.replace(/<[^>]*/gi,"<P")

anc = document.createElement("DIV");
anc.style.background="#fff";
anc.style.left=200;
anc.style.top=0;
anc.style.height=400;
anc.style.width=600;
anc.style.overflow="auto"
anc.style.position="fixed";
          anc.innerHTML = SmchF+"<hr><a href='javascript:void(anc.innerHTML=matchF);'>Load images</a>"+whol+match2F;
          anc.href = url;
par=document.getElementsByTagName('body')[0];anc=par.insertBefore(anc,null);
//document.body.appendChild(anc);

        }
      })
   }




window.selX = function(){void(win=window.open(sel,'',''));win.resizeTo(CCw,CCh);win.focus()}

window.Findx = function(Tnn) {if(Tnn==1){ZoTx(1);};if(Tnn==2){ZoTx(-1)};if(Tnn==4){BBW()};if(Tnn==5){Dl=Dd.images.length;for(i=0;i<Dl;++i){zoomImage(Dd.images[i],1.5)}};if(Tnn==6){Dl=Dd.images.length;for(i=0;i<Dl;++i){zoomImage(Dd.images[i],.6)}};if(Tnn==3){fontsy()};if(Tnn==7){toBlank(Ww)};if(Tnn==8){MSNN()};if(Tnn==9){Bws();sel='http://www.google.com/search?as_epq=%22'+sel+'%22&num=20';selX()};if(Tnn==10){Bws();sel='http://www.google.com/search?as_epq='+sel+'&num=20';selX()};if(Tnn==11){Bws();sel='http://search.yahoo.com/search?&fr=donotgo&va=%22'+sel+'%22&n=20';selX()};if(Tnn==14){BoR()};if(Tnn==12){Bws();sel='http://search.yahoo.com/search?&fr=donotgo&va='+sel+'&n=20';selX()};if(Tnn==13){LoC('http://donotgo.com/index.html')};if(Tnn==15){if(document.referrer){document.location.href=document.referrer;}};}


window.BBW = function() {if(bwb==1){bwb1="#000";bwb2="#FFF";bwb=0}else{bwb2="#000";bwb1="#FFF";bwb=1}for(var i=0;i<obj.length;i++){if(obj[i].href==undefined){obj[i].style.color=bwb1;}obj[i].style.background=bwb2;};void(sy1=0);x=0;for(i=0;x=document.links[i];++i)x.style.color=["#6666ff","red","orange","#FF00AA"][sim(x,location,i)];
}


window.fontsy = function(){void(sy2=sy1);if(sy2<2){sty='Arial,Verdana,Geneva,Helvetica,sans-serif';sy2=2}else{if(sy2<3){sty='Courier New,Courier,monospace';sy2=3}else{sty='Georgia,Times New Roman,Times,serif';sy2=1}};for(i=0;i<obj.length;i++){obj[i].style.fontFamily=sty;};void(sy1=sy2);}

window.toBlank = function(w){lnks=Dd.links;for(jL1M=0;jL1M<lnks.length;jL1M++){lnk=lnks[jL1M];if(lnk.href.indexOf('javas')==-1){if(lnk.href.indexOf('http')>-1){void(lnk.target='_blank');}}}}

window.MSNN = function(){sms=100;sms2=10;msn[1]='POPULARITY ';msn[2]='HOW CURRENT';msn[3]='HOW EXACT';msn[4]='Links per Page';msn[7]=100;msn[8]=100;msn[9]=100;msn[10]=20;vl1='';Bws();if(sel!=null){vl1=sel+' {mtch=100} {popl=100} {frsh=100}';vl2='';for(i=1;i<5;i++){vl2+=msn[i]+'<br>';for(b=1;b<11;b++){vl2+=' . <a href=\'javascript:opener.msn['+i+'+6]='+b*10+';void(hyg=document.forms[0].gary.value.split("{mtch"));void(hyg[0]+="{mtch="+opener.msn[9]+"}%20{popl="+opener.msn[7]+"} {frsh="+opener.msn[8]+"}");void(document.forms[0].gary.value=hyg[0]);\'>'+b*10+'</a> . ';}vl2+='<p>'}vl2+='<a href=\'javascript:location="http://beta.search.msn.com/results.aspx?q="+document.forms[0].gary.value+"&count="+opener.msn[10];\'>SEARCH</a>';win=window.open('','','');win.resizeTo(CCw,CCh);win.document.write('<html><body><center><form name="o"><input id="gary" size=60 value="'+vl1+'"></textarea></form>'+unescape(vl2)+'</center></body></html>');}};

window.zoomImage = function(image,amt){if(image.initialHeight==null){image.initialHeight=image.height;image.initialWidth=image.width;image.scalingFactor=1;}if((image.initialWidth>11)&&(image.initialHeight!=16)){image.scalingFactor*=amt;Isz=image.scalingFactor*image.initialWidth;if(Isz<cw){image.width=image.scalingFactor*image.initialWidth;image.height=image.scalingFactor*image.initialHeight;}}}

window.LoC = function(Lo){
this.document.location=Lo
}
window.Bws = function(){if(selON==0){sel=''}else{sel+=' '}if(!IE4){sel+=Ww.getSelection()}else{void(sel+=Dd.selection.createRange().text)}if(sel==''){void(q=prompt('You Did Not Select Any Words...use these keywords:','blog'));sel=q;}}
fsize=16;

window.ZoTx = function(size){void(fsize+=size);void(tsi=fsize+"px");for(var i=0;i<obj.length;i++){obj[i].style.fontSize=tsi;};void(sy1=0)}






window.sim = function(a,b,c){reT=3;if(a.hostname==b.hostname){reT=0;}if(document.links[c].target.indexOf("_new")>-1){document.links[c].target="_blank";}if(document.links[c].target.indexOf("_blank")>-1){reT=2;};if(a.href.indexOf("javascr")>-1){reT=1}return reT;}
BoR1=1
window.BoR = function(){;for(var i=0;i<obj.length;i++){UY=obj[i].tagName;if(UY!="P"&&UY!="A"&&UY!="BR"&&UY!="FONT"){obj[i].style.border=BoR1+'px solid #ff9900';}}if(BoR1>0){BoR1=0}else{BoR1=1}}

window.Syt = function(){var x;for(i=0;x=document.styleSheets[i];++i)x.disabled=true;
}

window.TxO = function(){s8=document.getSelection();if(s8!=''){fR='';for(Ji=97;Ji<=122;Ji++){s9=s8.match(fL=new RegExp('\\b'+String.fromCharCode(Ji)+'\\w+','gi'));if(s9!=null){fR+=s9+'<br><br>'}};with(document){write(fR);void(close())}}else{alert('Select text first!')}}

window.CooK = function(){clearInterval(TlL);cK=window.open('','dng','');void(cK.document.write("<html><body><center>"+f6t[0]+"<p><form name='o'><hr><a href='javascript:void(document.forms[0].gary5.value+=\"Scr\"+opener.document.documentElement.scrollTop+\"Scr\");'>Set Scroll</a> | <a href='javascript:void(document.forms[0].gary5.value+=\"FOt\"+opener.fsize+\"FOt\");'>Set Font</a> | <a href='javascript:void(document.forms[0].gary5.value+=\"BW1\");'>Black</a> / <a href='javascript:void(document.forms[0].gary5.value+=\"BW2\");'>White</a> |  <a href='javascript:void(document.forms[0].gary5.value+=\"TxX\"+opener.TxXs+\"TxX\");'>TextBox</a> |  <a href='javascript:void(document.forms[0].gary5.value+=\"STP\");'>Stop Loading</a><p><TEXTAREA id='gary5' COLS=60 ROWS=0 WRAP=VIRTUAL>"+f6t[5]+"</textarea></form><br><a href='javascript:void(opener.f6t[5]=document.forms[0].gary5.value);opener.Wco()'>Set Values</a><hr><form name='o2'><TEXTAREA id='mos' COLS=60 ROWS=0 WRAP=VIRTUAL>"+f6t[6]+"</textarea></form><br><a href='javascript:void(opener.f6t[6]=document.forms[1].mos.value);opener.Wco()'>Set Script</a> || <a href='javascript:void(opener.eval(document.forms[1].mos.value))'>Run Script</a> || <a href='javascript:void(opener.eval(document.forms[1].mos.value));window.close()'>Run Script and Close</a></center></body></html>"));cK.document.close();}

window.Wco = function(){cook=f6t[0]+','+f6t[1]+',';for(i=2;i<f6t.length-1;i++){cook+=f6t[i]+','};pVj5D=86400000*300;dT9v=new Date;dT9v.setTime(dT9v.getTime()+pVj5D);void(Dd.cookie='foxbox='+escape(cook)+';  expires='+dT9v.toGMTString());cK.close()}

window.RtC = function(s){function R(a){ona = "on"+a; if(window.addEventListener) window.addEventListener(a, function (e) { for(var n=e.originalTarget; n; n=n.parentNode) n[ona]=null; }, true); window[ona]=null; document[ona]=null; if(document.body) document.body[ona]=null; } R("contextmenu"); R("click"); R("mousedown"); R("mouseup");} 

window.FlinK = function(g){if(g!=''){q=g}else{q=prompt("Link Target Has Been Changed--Select new target; _blank, _new, _top etc.","_self")};for(i=0;i<document.links.length;i++){document.links[i].target=q}}

window.SeTiT = function(Po,s){GM_setValue(Po,s);}

window.SeTiT2 = function(){s=GM_getValue('did it work?');alert(s);}

Tms2=""
Tms=""
var X2js= new Array();
var X2js2= new Array();
var starting=0;
fsr="1";
obj=document.getElementsByTagName("*")

FfF=document.getElementsByTagName('FRAMESET')[0];if(!FfF){

//alert(document.body.clientWidth+"   "+document.body.clientWidth+"  "+CCh)
BEmv=0;
dL8=Dd.cookie.indexOf('foxbox');if(dL8!=-1){d7n=Dd.cookie.substring(dL8+7,Dd.cookie.length);uHm=d7n.indexOf(';');dUP=(uHm==-1)?d7n.length:uHm;cook=unescape(d7n.substring(0,dUP));f6t=cook.split(',');f6t[0]=parseInt(f6t[0]);if(!f6t[0]){f6t[0]='1'}else{f6t[0]+=1;};cook='';for(i=0;i<f6t.length-1;i++){cook+=f6t[i]+','}pVj5D=86400000*300;dT9v=new Date;dT9v.setTime(dT9v.getTime()+pVj5D);if(f6t.length<10){cook+=',,,,,,,,,'};void(Dd.cookie='foxbox='+escape(cook)+';  expires='+dT9v.toGMTString());if(f6t[6].length>3){eval(f6t[6])};if(f6t[2].length>3){par=document.getElementsByTagName('body')[0];be01=par.innerHTML.indexOf('Stats</a> - ');if(be01>0){be02=par.innerHTML.split('Stats</a> - ');be03=be02[1].split(']');if(be03[0].length>3){if(f6t[2].indexOf(be03[0])>-1){if(f6t[4].length>5){KlK=f6t[4].split('http:');rAD(KlK.length-1);f6t[3]='http:'+KlK[RanN+1];}void(top.frames["pages"].location=f6t[3]);}}}}if(window.name!='topFrame'&&location.href.indexOf('blogex')<0){if(f6t[5].indexOf('BW1')>-1){bwb=0;BBW()};if(f6t[5].indexOf('BW2')>-1){bwb=1;BBW()};if(f6t[5].indexOf('Scr')>-1){SCr=f6t[5].split('Scr');document.documentElement.scrollTop=SCr[1];};if(f6t[5].indexOf('FOt')>-1){FOt2=f6t[5].split('FOt');fsize=parseInt(FOt2[1]);ZoTx(0)};if(f6t[5].indexOf('STP')>-1){tTm==2500;Opto=1};if(f6t[5].indexOf('TxX')>-1){FOt2=f6t[5].split('TxX');TxXs=parseInt(FOt2[1]);for(i=0;i<obj.length;i++){kiu=obj[i].offsetWidth;if(kiu>200&&kiu<TxXs){obj[i].style.width=TxXs+'px'}};void(sy1=0);};if(f6t[4].length>5){KlK=f6t[4].split('http:');rAD(KlK.length-1);f6t[3]='http:'+KlK[RanN+1];this.window.stop();tTm=3000}}else{BEmv=1;}}else{cook=0+',blank,,,,,,,,,,,,';f6t=cook.split(',');pVj5D=86400000*300;dT9v =new Date;dT9v.setTime(dT9v.getTime()+pVj5D);void(Dd.cookie='foxbox='+escape(cook)+'; expires='+dT9v.toGMTString());};}





koi="";
window.hE = function(s){s=s.replace(/&/g,"&amp;");s=s.replace(/>/g,"&gt;");s=s.replace(/</g,"&lt;");return s;} 




WrI="";


tL79="javascript:var u='';function getST(w){var s='';s=w.document.selection.createRange().text;return s.replace(/%20/g,'');}void(frms=window.frames);if(frms.length==0){u=getST(window);}else{for(i=0;i<frms.length;i++){void(u=getSelText(frms[i]));if(u.length>0){break;}}}if(u.length!=0){if(u.indexOf('.')<0){u+='.com/';}if(u.indexOf('www.')<0){u='www.'+u;}if(u.indexOf('http://')<0){u='http://'+u;}win=window.open('','','');void(win.document.location.href=u);}"
tL80="javascript:if(frames.length>1)alert('This bookmarklet does not work with frames.');else{var lm=new Date(document.lastModified);var now=new Date();if(lm.getTime()==0||now.toUTCString()==lm.toUTCString()){alert('Page is dynamically generated, cannot determine date.');}else{alert(document.location.href+' \nwas last modified '+lm.toLocaleString());}}"
WT="<STYLE>#yuo A{text-decoration:none;color:#000000;}#yuo A:hover{text-decoration:underline;color:#cc6000;}LI{background-color:#ffffff;}</STYLE>"
Wlink2='';
Wlink4='';
Wlink6='';



Wlink6+="<hr>Formating Tools<hr><li><a href=\"javascript:CooK();\" target=_self>Set app/script</a> "+f6t[0]+"</li><li><a href=\"javascript:for(i=0;i<obj.length;i++){kiu=obj[i].offsetWidth;if(kiu>200&&kiu<700){obj[i].style.width='700px'}};void(sy1=0);\" target=_self>EnLarge textbox</a></li><li><a href=\"javascript:fontsy();\" target=_self>Font Style</a></li><li><a href=\"javascript:ZoTx(+1);\" target=_self>EnLarge Font</a></li><li><a href=\"javascript:ZoTx(-1);\" target=_self>Reduce Font</a></li><li><a href=\"javascript:Dl=Dd.images.length;for(i=0;i<Dl;++i){zoomImage(Dd.images[i],1.5)};\" target=_self>Enlarge Images</a></li><li><a href=\"javascript:Dl=Dd.images.length;for(i=0;i<Dl;++i){zoomImage(Dd.images[i],.6)};\" target=_self>Reduce Images</a></li><li><a href=\"javascript:if(document.referrer){document.location.href=document.referrer;};\" target=_self>Referer/BackTo</a></li><li><a href=\"javascript:BBW();\" target=_self>Black&White</a></li><li><a href=\"javascript:BoR();\" target=_self>Borders on/off</a></li>"

Wlink4+="<hr>This & That<hr><li><a href=\"javascript:SeTiT('Ponoff','off')\" target=_self>Toolbar Closed/</a><a href=\"javascript:SeTiT('Ponoff','on')\" target=_self>open</a></li><li><a href=\"javascript:objT=document.getElementsByTagName('TEXTAREA');start=objT[0].selectionStart;end=objT[0].selectionEnd;sel=(objT[0].value).substring(start, end);Txx=objT[0].value;alert(escape(Txx));selz='%5C%5Cquote{'+sel+'}';Txx=Txx.replace(sel,selz);void(objT[0].value=Txx)\" target=_self>add formating</a></li><li><a href=\"javascript:s=prompt('Find:','http://');if(s.length>10){GeTp(s)};\" target=_self>Get Page</a></li><li><a href=\"javascript:FiY();\" target=_self>Game ThePage</a></li><li><a href=\"javascript:void(selON=1);Bws();\" target=_self>Select++</a> <a href=\"javascript:void(sel='');void(selON=0);\" target=_self>|OFF</a></li>"

Wlink4+="<hr>Search Tools<hr><li><a href=\"javascript:MSNN();\" target=_self>MSN SEARCH</a></li><li><a href=\"javascript:Bws();sel='http://search.yahoo.com/search?&fr=donotgo&va='+sel+'&n=20';selX()\" target=_self>Yahoo AllWords</a></li><li><a href=\"javascript:Bws();sel='http://search.yahoo.com/search?&fr=donotgo&va=%22'+sel+'%22&n=20';selX()\" target=_self>Yahoo Phrase</a></li><li><a href=\"javascript:Bws();sel='http://www.google.com/search?as_epq='+sel+'&num=20';selX()\" target=_self>Google AllWords</a></li><li><a href=\"javascript:Bws();sel='http://www.google.com/search?as_epq=%22'+sel+'%22&num=20';selX()\" target=_self>Google phrase</a></li><li><a href=\"javascript:Bws();sel='http://news.google.com/news?num=20&hl=en&scoring=d&as_qdr=all&q='+sel;;selX()\" target=_self>Google News</a></li><li><a href=\"javascript:Bws();sel='http://beta.search.msn.com/news/results.aspx?q=%22'+sel+'%22&count=20';selX()\" target=_self>MSN News</a></li><li><a href=\"javascript:Bws();sel='http://news.search.yahoo.com/news/search?p=%22'+sel+'%22&n=20';selX()\" target=_self>Yahoo News</a></li><li><a href=\"javascript:Bws();sel='http://images.google.com/images?&safe=off&as_qdr=all&q='+sel+'';selX()\" target=_self>Google Images</a></li><li><a href=\"javascript:Bws();sel='http://search.msn.com/images/results.aspx?q='+sel+'&count=20&size=300p';selX()\" target=_self>MSN Images</a></li><li><a href=\"javascript:Bws();sel='http://images.search.yahoo.com/search/images?p='+sel+'&n=20';selX()\" target=_self>Yahoo Images</a></li><hr><li><a href=\"javascript:Bws();wu=window.open();lo=document.location;wu.document.write('<html><body><pre><form action=\\'http://textalyser.net/index.php?lang=en\\' method=\\'post\\'><textarea name=\\'text_main\\' cols=\\'55\\' rows=\\'5\\'>Delete all text hear to analyze whole page   \\n'+sel+'</textarea><br><input type=\\'text\\' name=\\'site_to_analyze\\' size=\\'18\\' maxlength=\\'100\\' class=\\'cour\\' value=\\''+lo+'\\'><br><select class=\\'cour\\' name=\\'min_char\\'><option value=\\'3\\' selected> 3</option><option value=\\'5\\'> 5</option></select><select name=\\'words_toanalyse\\' class=\\'cour\\'><option value=\\'100\\' selected> 100<option value=\\'50\\'> 50<option value=\\'1000\\'> 1000</option></select><br><input class=\\'cour\\' type=\\'submit\\' value=\\'Analyze the text\\'></form></pre></body></html>')\" target=_self>TextAnalysis</a></li><li><a href=\"javascript:Bws();wu=window.open();lo=document.location;FR1='<br><INPUT type=\\'checkbox\\' name=';FR2='value=\\'1\\' checked>';FR3='value=\\'1\\'>';wu.document.write('<html><body><form target=\\'_parent\\' action=\\'http://roquefort.di.unipi.it/clus-bin/c\\' name=\\'simple--com\\'><input class=small type=\\'text\\' name=\\'q\\' size=\\'50\\' value=\\''+sel+'\\'><input class=query type=\\'submit\\' value=\\'send query\\' name=\\'\\'><p>'+FR1+'\\'google\\' '+FR2+'google'+FR1+'\\'yahoo\\' '+FR2+'yahoo'+FR1+'\\'altavista\\' '+FR2+'altavista'+FR1+'\\'alltheweb\\' '+FR3+'alltheweb'+FR1+'\\'teoma\\' '+FR2+'teoma'+FR1+'\\'looksmart\\' '+FR3+'looksmart'+FR1+'\\'overture\\' '+FR3+'overture'+FR1+'\\'msn\\' '+FR2+'msn'+FR1+'\\'about\\' '+FR3+'about'+FR1+'\\'mozdex\\' '+FR3+'mozdex'+FR1+'\\'aol\\' '+FR2+'aol'+FR1+'\\'findwhat\\' '+FR3+'findwhat'+FR1+'\\'gigablast\\' '+FR3+'gigablast'+FR1+'\\'espotting\\' '+FR3+'espotting'+FR1+'\\'a9\\' '+FR3+'a9</form></body></html>')\" target=_self>CompareSE all</a></li><li><a href=\"javascript:Bws();Wn=open('','','');Wn.document.location='http://roquefort.di.unipi.it/clus-bin/h?q=%22'+sel+'%22&google=1&yahoo=1&teoma=1&msn=1';void(0);\" target=_self>SnakeT</a></li><li><a href=\"javascript:Bws();Wn=open('','','');Wn.document.location='http://www.jux2.com/search.php?e=0&e2=1&q=%22'+sel+'%22&Submit=jux2+Search';void(0);\" target=_self>CompareSE Jux2</a></li><li><a href=\"javascript:h=location.host;Wn=open('','','');p=h.length;Wn.document.location='http://www.prsearch.net/index.php?Query='+h+'&BSearch=Search';void(0);\" target=_self>PR Search</a></li><li><a href=\"javascript:Bws();Wn=open('','','');Wn.document.location='http://c6.org/toogle/index.php?phrase=%22'+sel+'%22';void(0);\" target=_self>Toogle image</a></li><hr>"

Wlink2+="<hr>Links<hr><li><a href=\"http://donotgo.com/tb0503.htm\" target=_blank>FoxIe HomePage</a></li>"

if(IE4){
Wlink4+="<li><a href=\""+"javascript:FD983r={x:function(){var%20r,i,s=document.selection.createRange().text;if(!s)s=prompt('Find:','');if(s){r=document.body.createTextRange();for(i=0;r.findText(s);i++){r.execCommand('BackColor','','yellow');r.collapse(false)}}}};FD983r.x();"+"\" target=_self>Mark All</a></li><li><a href=\""+"javascript:var%20s='<h1>Page%20statistics%20for:%20'+Dd.location.href+'</h1>';s=s+'<table%20border=1%20cellpadding=4%20cellspacing=0>';s=s+'<tr%20valign=top><td>Page%20<b>title</b>:</td><td>'+document.title+'</td></tr>';s=s+'<tr%20valign=top><td><b>Created</b>%20on:</td><td>'+document.fileCreatedDate%20+'</td></tr>';s=s+'<tr%20valign=top><td>File%20<b>last%20modified</b>:</td><td>'+document.lastModified+'</td></tr>';s=s+'<tr%20valign=top><td>File%20<b>size</b>: </td><td>'+((parseInt(document.fileSize))/1000)+'%20KB </td></tr>';s=s+'<tr%20valign=top><td>Number%20of%20<b>images</b>: </td><td>"+Di+"</td></tr>';s=s+'<tr%20valign=top><td>Number%20of%20<b>links</b>:</td><td>"+Dl+"</td></tr>';s=s+'<tr%20valign=top><td>Linked%20<b>styleSheets</b>:</td><td>';for%20(css=0;css<document.styleSheets.length;css++){if%20(document.styleSheets[css].href!='')%20s=s+'<LI>'+document.styleSheets[css].href;}s=s+'</td></tr>';s=s+'<tr%20valign=top><td><b>Domain</b>:</td><td>'+document.location.hostname+'</td></tr>';s=s+'<tr%20valign=top><td><b>Character</b>%20set:</td><td>'+document.charset+'</td></tr>';s=s+'<tr%20valign=top><td>Linked%20<b>script%20files</b>:</td><td>';for(is=0;is<document.scripts.length;is++){if%20(document.scripts[is].src!='')%20s=s+'<LI>'+document.scripts[is].src;};s=s+'</td></tr>';s=s+'<tr%20valign=top><td>Number%20of%20<b>Forms</b>:</td><td>'+document.forms.length;for%20(i=0;i<document.forms.length;i++){s=s+'<LI>name:%20'+document.forms[i].name;s=s+'%20||%20action:%20'+document.forms[i].action;}s=s+'</td></tr>';s=s+'</table>';var%20statswin%20=%20window.open('',%20'statswin',%20'menubar,scrollbars,resizable,height=600,width=790');statswin.document.open();statswin.document.write('<html><head><title>Page%20Stats%20for%20'+location.href+'</title><style>*{font-family:verdana;font-size:x-small;}</style></head><body>'+s+'</body></html>');statswin.document.close();"+"\" target=_top>Page Stats</a></li><center><a href=\"javascript:void(aoL.style.visibility=\'hidden\')\" target=_self>Close</a> | <a href=\"javascript:onB=1\" target=_self>Lock</a></center>"}

if(!IE4){
Wlink2+="<hr>GreaseMonkey<hr><li><a href=\"http://greasemonkey.mozdev.org/\" target=_blank>GM HomePage</a></li><li><a href=\"http://greasemonkeyed.com/\" target=_blank>GreaseMonkeyed</a></li><li><a href=\"http://greaseblog.blogspot.com/\" target=_blank>GM Blog</a></li><li><a href=\"http://mozdev.org/pipermail/greasemonkey\" target=_blank>GM Pipermail</a></li><li><a href=\"http://dunck.us/collab/GreaseMonkeyUserScripts\" target=_blank>Script Directory</a></li><li><a href=\"http://www.reifysoft.com/turnabout.php\" target=_blank>GM for IE</a></li><hr><li><a href=\"http://docs.g-blog.net/code/greasemonkey/\" target=_blank>Carlo Zottmann</a></li><li><a href=\"http://neugierig.org/software/greasemonkey/\" target=_blank>Evan Martin</a></li><li><a href=\"http://www.mamata.com.br/greasemonkey/\" target=_blank>Fabricio Zuardi</a></li><li><a href=\"http://www.csh.rit.edu/~phytar/projects/tags/greasemonkey/\" target=_blank>John Resig</a></li><li><a href=\"http://diveintomark.org/projects/greasemonkey/\" target=_blank>Mark Pilgrim</a></li><li><a href=\"http://novemberborn.net/greasemonkey/\" target=_blank>Mark Wubben</a></li><li><a href=\"http://www.mkgray.com:8000/userscripts/\" target=_blank>Matthew Gray</a></li><li><a href=\"http://simon.incutio.com/code/greasemonkey/\" target=_blank>Simon Willison</a></li><li><a href=\"http://sharedobject.org/greasemonkey/\" target=_blank>Jonas Galvez</a></li><li><a href=\"http://xurble.org/projects/Greasemonkey\" target=_blank>Gareth Simpson</a></li>"}
Wlink2+="<hr>News<hr><li><a href=\"http://www.theregister.com\" target=_blank>TheRegister</a></li>"

Wlink2+="<hr>Other Stuff<hr><li><a href=\"http://50.lycos.com/\" target=_blank>Lycos Top 50</a></li><li><a href=\"http://www.webreference.com/\" target=_blank>WebReference.com</a></li><li><a href=\"http://www.icannwatch.org/\" target=_blank>ICANNWatch.org</a></li>"
Wlink2+="<hr>@DoNotGo.com<hr><li><a href=\"http://donotgo.com/\" target=_blank>HomePage</a></li><li><a href=\"http://donotgo.com/tb0503.htm\" target=_blank>Fox-Ie ToolBar</a></li><li><a href=\"http://donotgo.com/whatis.htm\" target=_blank>WhatIs Proposal </a></li><li><a href=\"http://donotgo.com/blog1.htm\" target=_blank>DoNotGo Blog</a></li><li><a href=\"http://donotgo.com/talk/messages/board-topics.html\" target=_blank>SearchTalk @donotgo </a></li>"

Wlink2+="<hr>General Technology Forums<hr><li><a href=\"http://slashdot.org/\" target=_blank>SlashDot.org</a></li><li><a href=\"http://www.kuro5hin.org\" target=_blank>kuro5hin</a></li>"

Wlink2+="<hr>BookMarklet Sites<hr><li><a href=\"http://samrod.com/\" target=_blank>samrod.com</a></li><li><a href=\"http://www.squarefree.com/bookmarklets/\" target=_blank>Jesse Ruderman </a></li><li><a href=\"http://www.fjordaan.uklinux.net/moveabletype/fblog/archives/000059.html\" target=_blank>Francois Jordaan </a></li><li><a href=\"http://www24.brinkster.com/bookmarklets/default.asp/\" target=_blank>brinkster.com</a></li><li><a href=\"http://www.woodster.com/bookmarklets/\" target=_blank>woodster.com</a></li><li><a href=\"http://tantek.com/favelets/\" target=_blank>tantek.com</a></li><li><a href=\"http://web1.archive.org/web/20001016101901/userpage.fu-berlin.de/~wschwarz/scripts/english.htm\" target=_blank>Wolfgang Schwarz</a></li><li><a href=\"http://bookmarklets.com\" target=_blank>bookmarklets.com (old)</a></li><center><a href=\"javascript:void(aoL.style.visibility=\'hidden\')\" target=_self>Close</a> | <a href=\"javascript:onB=1\" target=_self>Lock</a></center>"
onB=0

window.StEt = function(){Otp=0;if(this.document.location.host.indexOf('logspot')>0){Otp=40};aoL=document.createElement("div");aoL.style.top=0;aoL.style.left=0;aoL.style.overflow='scroll';if(!IE4){aoL.style.position="fixed";}else{aoL.style.position="absolute"};aoL.id="yuo";aoL.style.visibility="hidden";aoL.style.background="#efefef";aoL.style.border="2px solid gray";aoL.style.height="450px";aoL.style.width="200px";aoL.style.zIndex=0;par=document.getElementsByTagName('body')[0];aoL=par.insertBefore(aoL,null);void(aoL.innerHTML=WT);aoL.onclick=new Function("if(onB==0){setTimeout('aoL.style.visibility=\"hidden\";',500);}");ao=document.createElement("div");ao.style.top=0;ao.style.left=0;if(!IE4){ao.style.position="fixed";}else{ao.style.position="absolute"};ao.style.visibility="visible";ao.style.display="block";ao.style.zIndex=0;par=document.getElementsByTagName('body')[0];ao=par.insertBefore(ao,null);AOtx="<A HREF=\"javascript:void(ao.style.display='none');\" onMouseOver=\"void(aoL.style.visibility=\'hidden\');\"onMouseOut=\"if(this.target!='_self'){FlinK('')}\" target=\"_self\"><IMG SRC=\'http://donotgo.com/skin/xx.jpg\' WIDTH=20 HEIGHT=20 BORDER=0></a><A STYLE=\"text-decoration:none;color:#8800cc;\" HREF=\"javascript:void(aoL.innerHTML=WT+Wlink2+Wlink4+Wlink6);void(onB=1);\" onMouseOver=\"void(aoL.innerHTML=WT+Wlink2+Wlink4+Wlink6);void(aoL.style.visibility=\'visible\');void(aoL.scrollTop=0);onB=0;\"><IMG Id=\'gm1\' SRC=\'http://donotgo.com/skin/gm1.jpg\' WIDTH=50 HEIGHT=20 BORDER=0></a><A HREF=\"javascript:void(aoL.innerHTML=WT+Wlink6+Wlink4+Wlink2);void(onB=1);\" onMouseOver=\"void(aoL.innerHTML=WT+Wlink6+Wlink4+Wlink2);void(aoL.style.visibility=\'visible\');void(aoL.scrollTop=0);void(onB=0);\"><IMG Id=\'gm2\' SRC=\'http://donotgo.com/skin/gm2.jpg\' WIDTH=50 HEIGHT=20 BORDER=0></a><A STYLE=\"text-decoration:none;color:#8800cc;\" HREF=\"javascript:void(aoL.innerHTML=WT+Wlink4+Wlink6+Wlink2);void(onB=1);\" onMouseOver=\"void(aoL.innerHTML=WT+Wlink4+Wlink6+Wlink2);void(aoL.style.visibility=\'visible\');void(aoL.scrollTop=0);void(onB=0);\"><IMG Id=\'gm3\' SRC=\'http://donotgo.com/skin/gm3.jpg\' WIDTH=50 HEIGHT=20 BORDER=0></a><A HREF=\"javascript:void(ao.innerHTML=AOtx2);\" onMouseOver=\"void(aoL.style.visibility=\'hidden\');\"><IMG SRC=\'http://donotgo.com/skin/xx.jpg\' WIDTH=20 HEIGHT=20 BORDER=0></a></center>";AOtx2="<A HREF=\"javascript:void(ao.innerHTML=AOtx);\" onMouseOver=\"void(aoL.style.visibility=\'hidden\')\"><IMG SRC=\'http://donotgo.com/skin/xx.jpg\' WIDTH=20 HEIGHT=20 BORDER=0></a>";if(BEmv==1){void(ao.innerHTML=AOtx2)}else{void(ao.innerHTML=AOtx)}ao.style.zIndex=0;window.MyGetValue=GM_getValue('Ponoff');if(MyGetValue=='off'){void(ao.innerHTML=AOtx2);}
//reFr();
}
void(TlL=setInterval('reFr()',tTm))



void(TlL2=setTimeout('StEt()',1000))


//StEt()
void(0)








OBJJ=document.getElementsByTagName('BODY')[0];
OBJJ1=OBJJ.innerHTML;
Dl=document.images.length;
imlg=13;onf=0;var vP1a=new Array();
DiS=0


window.FillAr = function(onf1){if(stopend==0){}else{if(onf1==0){vP1a[0]="fill";for(i=1;i<Dl+1;++i){vP1a[i]=document.images[i-1].src};if(Dl<14){for(i=Dl+1;i<14;++i){rAD(30);RanN++;vP1a[i]="http://donotgo.com/skin/nm"+RanN+".jpg";Dl+=1;}}Sav=OBJJ.innerHTML;imlg=Dl+1;Wrt();}else{OBJJ.innerHTML=Sav;if(onf1==3){Dl=document.images.length;RanNum()}if(onf1==1){Dl=document.images.length;DiS=1;RanNum()}}}}


window.FiY = function(UoI){koI='';Ow=0;Wtxt='Click Images to remove<br>';for(i=0;i<document.images.length;i++){if(koI.indexOf(document.images[i].src)<0){koI+=document.images[i].src;Wtxt+="<a href='javascript:JkJ("+Ow+");'><img width=70 height=90 src="+document.images[i].src+"></a>";Ow++;}}if(UoI==1){Wq=i-1;for(i=1;i<42;i++){Wq++;Wtxt+="<a href='javascript:JkJ("+Wq+");'><img width=70 height=90 src=\'http://donotgo.com/skin/nm"+i+".jpg\'></a>"}};Wtxt+="<center><a href='javascript:Dl=document.images.length;RanNum()'>Game These</a> <a href='javascript:Dl=document.images.length;RanNum(5)'>target-self</a><br><a href='javascript:void(OBJJ.innerHTML=OBJJ1)'>BackToPage</a><br><a href='javascript:FiY(1)'>ADD More Images</a></center>";OBJJ.innerHTML=Wtxt;for(i=0;i<document.links.length;i++){document.links[i].target='_self'}}

window.JkJ = function(G){document.links[G].innerHTML=""}

window.Wrt = function(){OBJJ.innerHTML='<a href=\'javascript:void(OBJJ.innerHTML=OBJJ1)\'>BackToPage</a><CENTER><TABLE CELLPADDING=0 CELLSPACING=0 WIDTH=0 BORDER=0 BGCOLOR=#000000><TR><TD><table border=0 CELLSPACING= CELLPADDING=0><tr><TD rowspan=4><a href="javascript:LinkPic(\'0\')" onFocus="this.blur()"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=180 width=35 name=rd ></a></TD><td BGCOLOR="#000000" ><a href="javascript:LinkPic(1)"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=45 width=35 name=AA ></a></td><td BGCOLOR="#000000" ><a href="javascript:LinkPic(2)"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=45 width=35 name=BB ></a></td><td BGCOLOR="#000000" ><a href="javascript:LinkPic(3)"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=45 width=35 name=CC ></a></td><td rowspan=8><table  CELLSPACING=0 CELLPADDING=0 BACKGROUND="http://donotgo.com/skin/girl.jpg" BORDER=0><tr border=0><td><a href="javascript:sqClick(\'A\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=A ></a></td><td><a href="javascript:sqClick(\'B\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=B ></a></td><td><a href="javascript:sqClick(\'C\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=C ></a></td><td><a href="javascript:sqClick(\'D\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=D ></a></td><td><a href="javascript:sqClick(\'E\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=E ></a></td><td><a href="javascript:sqClick(\'F\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70  name=F ></a></td></tr><tr border=0><td><a href="javascript:sqClick(\'G\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=G ></a></td><td><a href="javascript:sqClick(\'H\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=H ></a></td><td><a href="javascript:sqClick(\'I\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=I ></a></td><td><a href="javascript:sqClick(\'J\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=J ></a></td><td><a href="javascript:sqClick(\'K\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=K ></a></td><td><a href="javascript:sqClick(\'L\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=L ></a></td></tr><tr border=0><td><a href="javascript:sqClick(\'M\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=M ></a></td><td><a href="javascript:sqClick(\'N\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=N ></a></td><td><a href="javascript:sqClick(\'O\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=O ></a></td><td><a href="javascript:sqClick(\'P\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=P ></a></td><td><a href="javascript:sqClick(\'Q\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=Q ></a></td><td><a href="javascript:sqClick(\'R\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=R ></a></td></tr><tr border=0><td><a href="javascript:sqClick(\'S\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=S ></a></td><td><a href="javascript:sqClick(\'T\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=T ></a></td><td><a href="javascript:sqClick(\'U\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=U ></a></td><td><a href="javascript:sqClick(\'V\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=V ></a></td><td><a href="javascript:sqClick(\'W\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70 name=W ></a></td><td><a href="javascript:sqClick(\'X\')" onFocus="this.blur()"><img src="load.jpg" border=0 height=90 width=70  name=X ></a></td></tr></table></td></TR><tr border=0><td BGCOLOR="#000000"><a href="javascript:LinkPic(4)"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=45 width=35 name=DD ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(5)"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=45 width=35 name=EE ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(6)"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=45 width=35 name=FF ></a></td></td></TR><tr border=0><td BGCOLOR="#000000"><a href="javascript:LinkPic(7)"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=45 width=35 name=GG ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(8)"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=45 width=35 name=HH ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(9)"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=45 width=35 name=II ></a></td> </td></TR><tr border=0><td BGCOLOR="#000000"><a href="javascript:LinkPic(10)"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=45 width=35 name=JJ ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(11)"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=45 width=35 name=KK ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(12)"><img src="http://donotgo.com/skin/bo.jpg"  border=0 height=45 width=35 name=LL ></a></td></td></TR><tr border=0><TD rowspan=4><a href="javascript:LinkPic(0)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=180 width=35 name=bl ></a></TD><td BGCOLOR="#000000"><a href="javascript:LinkPic(13)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=45 width=35 name=MM ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(14)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=45 width=35 name=NN ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(15)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=45 width=35 name=OO ></a></td></td></TR><tr border=0><td BGCOLOR="#000000"><a href="javascript:LinkPic(16)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=45 width=35 name=PP ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(17)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=45 width=35 name=QQ ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(18)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=45 width=35 name=RR ></a></td></td></TR><tr border=0><td BGCOLOR="#000000"><a href="javascript:LinkPic(19)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=45 width=35 name=SS ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(20)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=45 width=35 name=TT ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(21)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=45 width=35 name=UU ></a></td></td></TR><tr border=0><td BGCOLOR="#000000"><a href="javascript:LinkPic(22)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=45 width=35 name=VV ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(23)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=45 width=35 name=WW ></a></td><td BGCOLOR="#000000"><a href="javascript:LinkPic(24)"><img src="http://donotgo.com/skin/bb.jpg"  border=0 height=45 width=35 name=XX ></a></td></td></TR></table></TD><TD><IMG SRC="http://donotgo.com/skin/bo.jpg" WIDTH=8 HEIGHT=400 BORDER=0></TD><TD ALIGN=top VALIGN="TOP" WIDTH=0><CENTER><IMG SRC="http://donotgo.com/skin/bb.jpg" WIDTH=100 HEIGHT=10 BORDER=0><form name=game>Total Picks<BR><INPUT TYPE="TEXT" NAME="gary" VALUE="Loading" SIZE=8 MAXLENGTH=47>  <P><input type=button value="Game Help" onClick="help()"><P><INPUT TYPE="button" VALUE="Play Again" onClick="starto()"><P><input type=button NAME="gary3" value="Load-m-all" onClick="Win(1)"><BR><img src="http://donotgo.com/skin/bk.gif" border=0 height=3 width=3 name=q1><img src="http://donotgo.com/skin/g3g.gif" border=0 height=3 width=3 name=q2 onLoad="LoadPic()"><img src="http://donotgo.com/skin/g3g.gif" border=0 height=3 width=3 name=q3><img src="http://donotgo.com/skin/g3g.gif" border=0 height=3 width=3 name=q4><img src="http://donotgo.com/skin/g3g.gif" border=0 height=3 width=3 name=q5 onLoad="LoadPic()"><img src="http://donotgo.com/skin/g3g.gif" border=0 height=3 width=3 name=q6><img src="http://donotgo.com/skin/g3g.gif" border=0 height=3 width=3 name=q7><img src="http://donotgo.com/skin/g3g.gif" border=0 height=3 width=3 name=q8><img src="http://donotgo.com/skin/g3g.gif" border=0 height=3 width=3 name=q9 onLoad="LoadPic()"><img src="http://donotgo.com/skin/g3g.gif" border=0 height=3 width=3 name=q10><img src="http://donotgo.com/skin/g3g.gif" border=0 height=3 width=3 name=q11><img src="http://donotgo.com/skin/g3g.gif" border=0 height=3 width=3 name=q12 onLoad="LoadPic()"><img src="http://donotgo.com/skin/g3g.gif" border=0 height=3 width=3 name=q13></form></CENTER><CENTER><IMG SRC="http://donotgo.com/skin/logo.jpg" WIDTH=70 HEIGHT=90 BORDER=0 name=tw><br><A HREF="javascript:function%20zoomImage(image,amt){if(image.initialHeight==null){image.initialHeight=image.height;image.initialWidth=image.width;image.scalingFactor=1.1;}image.scalingFactor*=amt;image.width=image.scalingFactor*image.initialWidth;image.height=image.scalingFactor*image.initialHeight;}for(i=0;i<document.images.length-4;++i){zoomImage(document.images[i],1.1);}">image++</A><br><A HREF="javascript:function%20zoomImage(image,amt){if(image.initialHeight==null){image.initialHeight=image.height;image.initialWidth=image.width;image.scalingFactor=.8;}image.scalingFactor*=amt;image.width=image.scalingFactor*image.initialWidth;image.height=image.scalingFactor*image.initialHeight;}for(i=0;i<document.images.length-4;++i){zoomImage(document.images[i],.8);}">image--</A></CENTER></TD><TD><IMG SRC="http://donotgo.com/skin/bo.jpg" WIDTH=8 HEIGHT=400 BORDER=0></TD></TR></table><table  CELLSPACING=0 CELLPADDING=0 BORDER=0><TR><TD WIDTH=400><FONT SIZE=1 COLOR="#800080"><A HREF="http://donotgo.com/" target=_top>Game&copy 2001 DoNotGo.com</A> / image&copy:2001 various Photographers</FONT></TD><TD><Form action="/" method=POST><Select style="background : #C0C0C0 \; color : #000000" name=menuitem size=1 onChange="loadPage(this)"><Option value="http://donotgo.com/">Other Games<Option value="http://donotgo.com/"><Option style="background : #a7e2fc \; color : #000050" value="http://donotgo.com/">-->Memory Games<--<Option value="http://www.donotgo.com/logic/mdgame.htm">Missal Defense Game<Option value=""><Option></Select></FORM></TD></TR></table></center>';if(DiS>0){DiS=0}else{FillAr2()};}










var x = "http://donotgo.com/skin/g2.gif";
var onf= 0;
var timeloading=0;
var loadit=0;
var o = "http://donotgo.com/skin/g1.gif";

var stopend = 1
var blank = "http://donotgo.com/skin/g3g.gif";

var clnum= 1;
var clnumx= 0;
var lastp = "z";
var matlook = "";
var pause = 0;
timerID="";
timerD="";
timer2D="";
var all = 0;
var a = 0;
var b = 0;
var c = 0;
var d = 0;
var e = 0;
var f = 0;
var g = 0;
var h = 0;
var i = 0;
var j = 0;
var k = 0;
var l = 0;
var m = 0;
var n = 0;
var o = 0;
var p = 0;
var q = 0;
var r = 0;
var s = 0;
var t = 0;
var u = 0;
var v = 0;
var w = 0;
var x = 0;
var y= 0;
var temp="";
var ok = 0;
var cf = 0;
var choice=9;
var aRandomNumber = 0;
var comp = 0; 
var loadp=0
var wn = 0;
var ls = 0;
var pic1="";
var ts = 0;
var va = "F";
var vb = "J";
var vc = "E";
var vd = "P";
var ve = "C";
var vf = "A";
var vg = "N";
var vh = "X";
var vi = "T";
var vj = "B";
var vk = "O";
var vl = "U";
var vm = "S";
var vn= "G";
var vo= "K";
var vp = "D";
var vq = "W";
var vr = "V";
var vs = "M";
var vt = "I";
var vu = "L";
var vv= "R";
var vw = "Q";
var vx = "H";
var vy = "V";
var tmp1= 0;

var tmp1x="k";
var zz="Z";
var tmp2="";
var tmp3="";
var tmp4= 0;
var ans= 0;
var ans2= 0;
var nomatch= 0;
var time= 0;
var cont=0;
var ff="Z2";
var pa= "";
var theend=0;
var ttmp="tmp";
var pb= "";
var playeris=1;
var nomat1= "http://donotgo.com/skin/nomat.gif";
var add1=1;
var radnum=0;
arrpicadd= new Array(25);
var CTmat=0;
var CTall=0;
var working=0;
vP1= new Array(13);
// jjj one above

vP1a= new Array(35);
ranArray = new Array(25);

var lastN=0;
var py1c=1;
var py2c=12;
var pyc="";
ArrPic= new Array(25); 
var tester3 = "true"
window.starto = function() {


onf= 0;
timeloading=0;
loadit=0;


stopend = 1;


clnum= 1;
clnumx= 0;
lastp = "z";
matlook = "";
pause = 0;
timerID="";
timerD="";
timer2D="";
all = 0;
a = 0;
b = 0;
c = 0;
d = 0;
e = 0;
f = 0;
g = 0;
h = 0;
i = 0;
j = 0;
k = 0;
l = 0;
m = 0;
n = 0;
o = 0;
p = 0;
q = 0;
r = 0;
s = 0;
t = 0;
u = 0;
v = 0;
w = 0;
x = 0;
y= 0;
temp="";
ok = 0;
cf = 0;
choice=9;
aRandomNumber = 0;
comp = 0; 
loadp=0
wn = 0;
ls = 0;
pic1="";
ts = 0;
va = "F";
vb = "J";
vc = "E";
vd = "P";
ve = "C";
vf = "A";
vg = "N";
vh = "X";
vi = "T";
vj = "B";
vk = "O";
vl = "U";
vm = "S";
vn= "G";
vo= "K";
vp = "D";
vq = "W";
vr = "V";
vs = "M";
vt = "I";
vu = "L";
vv= "R";
vw = "Q";
vx = "H";
vy = "V";
tmp1= 0;

tmp1x="k";
zz="Z";
tmp2="";
tmp3="";
tmp4= 0;
ans= 0;
ans2= 0;
nomatch= 0;
time= 0;
cont=0;
ff="Z2";
pa= "";
theend=0;
ttmp="tmp";
pb= "";
playeris=1;

add1=1;
radnum=0;

CTmat=0;
CTall=0;
working=0;
vP1= new Array(13);
// jjj one above


lastN=0;
py1c=1;
py2c=12;
pyc="";
document.images["AA"].src = "http://donotgo.com/skin/bo.jpg";
document.images["BB"].src = "http://donotgo.com/skin/bo.jpg";
document.images["CC"].src = "http://donotgo.com/skin/bo.jpg";
document.images["DD"].src = "http://donotgo.com/skin/bo.jpg";
document.images["EE"].src = "http://donotgo.com/skin/bo.jpg";
document.images["FF"].src = "http://donotgo.com/skin/bo.jpg";
document.images["GG"].src = "http://donotgo.com/skin/bo.jpg";
document.images["HH"].src = "http://donotgo.com/skin/bo.jpg";
document.images["II"].src = "http://donotgo.com/skin/bo.jpg";
document.images["JJ"].src = "http://donotgo.com/skin/bo.jpg";
document.images["KK"].src = "http://donotgo.com/skin/bo.jpg";
document.images["LL"].src = "http://donotgo.com/skin/bo.jpg";
document.images["MM"].src = "http://donotgo.com/skin/bb.jpg";
document.images["NN"].src = "http://donotgo.com/skin/bb.jpg";
document.images["OO"].src = "http://donotgo.com/skin/bb.jpg";
document.images["PP"].src = "http://donotgo.com/skin/bb.jpg";
document.images["QQ"].src = "http://donotgo.com/skin/bb.jpg";
document.images["RR"].src = "http://donotgo.com/skin/bb.jpg";
document.images["SS"].src = "http://donotgo.com/skin/bb.jpg";
document.images["TT"].src = "http://donotgo.com/skin/bb.jpg";
document.images["UU"].src = "http://donotgo.com/skin/bb.jpg";
document.images["VV"].src = "http://donotgo.com/skin/bb.jpg";
document.images["WW"].src = "http://donotgo.com/skin/bb.jpg";
document.images["XX"].src = "http://donotgo.com/skin/bb.jpg";
document.images["rd"].src = "http://donotgo.com/skin/bo.jpg";
document.images["bl"].src = "http://donotgo.com/skin/bk.gif";
tester3 = "true"
FillAr(3);
}


window.FillAr2 = function() {
imlg1=imlg

for (i=1; i < 13; i++) {
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxjjj one above


radnum= Math.floor((Math.random() * imlg1));
if (vP1a[radnum]=="fill") {i = i -1;}
else {
vP1[i]=vP1a[radnum];
vP1a[radnum]="fill";
		}
	}
document.images["q1"].src = vP1[1];
document.images["A"].src = "http://donotgo.com/skin/1.gif";
document.images["B"].src = "http://donotgo.com/skin/2.gif";
document.images["q2"].src = vP1[2];
document.images["C"].src = "http://donotgo.com/skin/3.gif";
document.images["D"].src = "http://donotgo.com/skin/4.gif";
document.images["q3"].src = vP1[3];
document.images["E"].src = "http://donotgo.com/skin/5.gif";
document.images["F"].src = "http://donotgo.com/skin/6.gif";
document.images["q4"].src = vP1[4];
document.images["G"].src = "http://donotgo.com/skin/7.gif";
document.images["H"].src = "http://donotgo.com/skin/8.gif";
document.images["q5"].src = vP1[5];
document.images["I"].src = "http://donotgo.com/skin/9.gif";
document.images["J"].src = "http://donotgo.com/skin/10.gif";
document.images["q6"].src = vP1[6];
document.images["K"].src = "http://donotgo.com/skin/11.gif";
document.images["L"].src = "http://donotgo.com/skin/12.gif";
document.images["q7"].src = vP1[7];
document.images["M"].src = "http://donotgo.com/skin/13.gif";
document.images["N"].src = "http://donotgo.com/skin/14.gif";
document.images["q8"].src = vP1[8];
document.images["O"].src = "http://donotgo.com/skin/15.gif";
document.images["P"].src = "http://donotgo.com/skin/16.gif";
document.images["q9"].src = vP1[9];
document.images["Q"].src = "http://donotgo.com/skin/17.gif";
document.images["R"].src = "http://donotgo.com/skin/18.gif";
document.images["q10"].src = vP1[10];
document.images["S"].src = "http://donotgo.com/skin/19.gif";
document.images["T"].src = "http://donotgo.com/skin/20.gif";
document.images["q11"].src = vP1[11];
document.images["U"].src = "http://donotgo.com/skin/21.gif";
document.images["V"].src = "http://donotgo.com/skin/22.gif";
document.images["q12"].src = vP1[12];
document.images["W"].src = "http://donotgo.com/skin/23.gif";
document.images["X"].src = "http://donotgo.com/skin/24.gif";
document.close();

}

window.LinkPic = function(lp) {
naM=arrpicadd[lp];reF=naM.split('/');reF2='';for(i=0; i < reF.length-1; i++){reF2+=reF[i]+'/';}Awind=window.open('', '', '');Awind.location=reF2;
}

window.RanNum = function(r) {

FillAr(0)
if(r==5){for(i=0;i<document.links.length;i++){document.links[i].target='_self'}}
for (i=0; i < 25; i++) {
ArrPic[i]="t"
}

//document.game.gary.value = "Ready"
add1=1
for (i=0; i < 25; i++) {
ranArray[i]=0
}
for (i=0; i < 200; i++) {
radnum= Math.floor((Math.random() * 25))
	if (radnum !=0) {

		if ((ranArray[radnum]== 0)&&(lastN != radnum)) {
			if (lastN !=0) {
			ranArray[0]=add1
			add1=add1+1
			ranArray[radnum]= lastN
			ranArray[lastN]= radnum
		
			lastN=0
		
			}
			else {
			lastN=radnum
			}
}
}
}
if (add1>11) {

}
else {
add1=1
for (i=0; i < 25; i++) {
ranArray[i]=0
arrpicadd[i]="c"
}
}
Apic();;
}

window.Apic = function() {
// jjj-1 from total
imlg1=imlg-1
radnum= Math.floor((Math.random() * imlg1))
apxx=radnum +1

for (i=1; i < 13; i++) {
	if (ArrPic[apxx]=="t") {
	ArrPic[apxx]=vP1[i];
	xxx=ranArray[apxx];
	ArrPic[xxx]=vP1[i];
	}
else {
i = i -1;
}
if (apxx>23) {apxx=0;}
apxx=apxx+1

}
document.close();
}


window.witch = function() {
if (pic1=="A") { tmp1= ranArray[1]; tmp2= ArrPic[1]; tmp3="http://donotgo.com/skin/1.gif"; }
if (pic1=="B") { tmp1= ranArray[2]; tmp2= ArrPic[2]; tmp3="http://donotgo.com/skin/2.gif"; }
if (pic1=="C") { tmp1= ranArray[3]; tmp2= ArrPic[3]; tmp3="http://donotgo.com/skin/3.gif"; }
if (pic1=="D") { tmp1= ranArray[4]; tmp2= ArrPic[4]; tmp3="http://donotgo.com/skin/4.gif"; }
if (pic1=="E") { tmp1= ranArray[5]; tmp2= ArrPic[5]; tmp3="http://donotgo.com/skin/5.gif"; }
if (pic1=="F") { tmp1= ranArray[6]; tmp2= ArrPic[6]; tmp3="http://donotgo.com/skin/6.gif"; }
if (pic1=="G") { tmp1= ranArray[7]; tmp2= ArrPic[7]; tmp3="http://donotgo.com/skin/7.gif"; }
if (pic1=="H") { tmp1= ranArray[8]; tmp2= ArrPic[8]; tmp3="http://donotgo.com/skin/8.gif"; }
if (pic1=="I") { tmp1= ranArray[9]; tmp2= ArrPic[9]; tmp3="http://donotgo.com/skin/9.gif"; }
if (pic1=="J") { tmp1= ranArray[10]; tmp2= ArrPic[10]; tmp3="http://donotgo.com/skin/10.gif"; }
if (pic1=="K") { tmp1= ranArray[11]; tmp2= ArrPic[11]; tmp3="http://donotgo.com/skin/11.gif"; }
if (pic1=="L") { tmp1= ranArray[12]; tmp2= ArrPic[12]; tmp3="http://donotgo.com/skin/12.gif"; }
if (pic1=="M") { tmp1= ranArray[13]; tmp2= ArrPic[13]; tmp3="http://donotgo.com/skin/13.gif"; }
if (pic1=="N") { tmp1= ranArray[14]; tmp2= ArrPic[14]; tmp3="http://donotgo.com/skin/14.gif"; }
if (pic1=="O") { tmp1= ranArray[15]; tmp2= ArrPic[15]; tmp3="http://donotgo.com/skin/15.gif"; }
if (pic1=="P") { tmp1= ranArray[16]; tmp2= ArrPic[16]; tmp3="http://donotgo.com/skin/16.gif"; }
if (pic1=="Q") { tmp1= ranArray[17]; tmp2= ArrPic[17]; tmp3="http://donotgo.com/skin/17.gif"; }
if (pic1=="R") { tmp1= ranArray[18]; tmp2= ArrPic[18]; tmp3="http://donotgo.com/skin/18.gif"; }
if (pic1=="S") { tmp1= ranArray[19]; tmp2= ArrPic[19]; tmp3="http://donotgo.com/skin/19.gif"; }
if (pic1=="T") { tmp1= ranArray[20]; tmp2= ArrPic[20]; tmp3="http://donotgo.com/skin/20.gif"; }
if (pic1=="U") { tmp1= ranArray[21]; tmp2= ArrPic[21]; tmp3="http://donotgo.com/skin/21.gif"; }
if (pic1=="V") { tmp1= ranArray[22]; tmp2= ArrPic[22]; tmp3="http://donotgo.com/skin/22.gif"; }
if (pic1=="W") { tmp1= ranArray[23]; tmp2= ArrPic[23]; tmp3="http://donotgo.com/skin/23.gif"; }
if (pic1=="X") { tmp1= ranArray[24]; tmp2= ArrPic[24]; tmp3="http://donotgo.com/skin/24.gif"; }
 AtoZ();
}
window.AtoZ = function() {
if (tmp1==1) {tmp1x="A";}
if (tmp1==2) {tmp1x="B";}
if (tmp1==3) {tmp1x="C";}
if (tmp1==4) {tmp1x="D";}
if (tmp1==5) {tmp1x="E";}
if (tmp1==6) {tmp1x="F";}
if (tmp1==7) {tmp1x="G";}
if (tmp1==8) {tmp1x="H";}
if (tmp1==9) {tmp1x="I";}
if (tmp1==10) {tmp1x="J";}
if (tmp1==11) {tmp1x="K";}
if (tmp1==12) {tmp1x="L";}
if (tmp1==13) {tmp1x="M";}
if (tmp1==14) {tmp1x="N";}
if (tmp1==15) {tmp1x="O";}
if (tmp1==16) {tmp1x="P";}
if (tmp1==17) {tmp1x="Q";}
if (tmp1==18) {tmp1x="R";}
if (tmp1==19) {tmp1x="S";}
if (tmp1==20) {tmp1x="T";}
if (tmp1==21) {tmp1x="U";}
if (tmp1==22) {tmp1x="V";}
if (tmp1==23) {tmp1x="W";}
if (tmp1==24) {tmp1x="X";}

}
window.killMat = function(killv) {
if (killv=="A") {a=1;}
if (killv=="B") {b=1;}
if (killv=="C") {c=1;}
if (killv=="D") {d=1;}
if (killv=="E") {e=1;}
if (killv=="F") {f=1;}
if (killv=="G") {g=1;}
if (killv=="H") {h=1;}
if (killv=="I") {i=1;}
if (killv=="J") {j=1;}
if (killv=="K") {k=1;}
if (killv=="L") {l=1;}
if (killv=="M") {m=1;}
if (killv=="N") {n=1;}
if (killv=="O") {o=1;}
if (killv=="P") {p=1;}
if (killv=="Q") {q=1;}
if (killv=="R") {r=1;}
if (killv=="S") {s=1;}
if (killv=="T") {t=1;}
if (killv=="U") {u=1;}
if (killv=="V") {v=1;}
if (killv=="W") {w=1;}
if (killv=="X") {x=1;}
}
window.Used = function() {
if ((pic1=="A")&&(a==1)) {tmp4=1;}
if ((pic1=="B")&&(b==1)) {tmp4=1;}
if ((pic1=="C")&&(c==1)) {tmp4=1;}
if ((pic1=="D")&&(d==1)) {tmp4=1;}
if ((pic1=="E")&&(e==1)) {tmp4=1;}
if ((pic1=="F")&&(f==1)) {tmp4=1;}
if ((pic1=="G")&&(g==1)) {tmp4=1;}
if ((pic1=="H")&&(h==1)) {tmp4=1;}
if ((pic1=="I")&&(i==1)) {tmp4=1;}
if ((pic1=="J")&&(j==1)) {tmp4=1;}
if ((pic1=="K")&&(k==1)) {tmp4=1;}
if ((pic1=="L")&&(l==1)) {tmp4=1;}
if ((pic1=="M")&&(m==1)) {tmp4=1;}
if ((pic1=="N")&&(n==1)) {tmp4=1;}
if ((pic1=="O")&&(o==1)) {tmp4=1;}
if ((pic1=="P")&&(p==1)) {tmp4=1;}
if ((pic1=="Q")&&(q==1)) {tmp4=1;}
if ((pic1=="R")&&(r==1)) {tmp4=1;}
if ((pic1=="S")&&(s==1)) {tmp4=1;}
if ((pic1=="T")&&(t==1)) {tmp4=1;}
if ((pic1=="U")&&(u==1)) {tmp4=1;}
if ((pic1=="V")&&(v==1)) {tmp4=1;}
if ((pic1=="W")&&(w==1)) {tmp4=1;}
if ((pic1=="X")&&(x==1)) {tmp4=1;}
}
window.loDp = function(chName) {
working=1
timerID=setTimeout("loDp()", 1* 1000)

cont= cont+1
if (cont==2) {
pb=tmp3
cont=0	
ifTwo(chName) 

working=0
}

}

window.DeLay = function() {
time= new Date();
ans= time.getTime();
ans2= ans + 500;
while (ans < ans2) {
time= new Date();
ans= time.getTime();
}
}
window.noMat = function() {

document.images[pic1].src = tmp3;
nomatch= 0;
pic1= lastp;
witch();
document.images[pic1].src = tmp3

}

window.ifTwo = function(chName) {
clearTimeout(timerID)
	
cont=0

	if (lastp == tmp1x) {
	if (playeris==1){
	
	
	arrpicadd[py1c]=tmp2
tmp1hh=tmp1
tmp1xhh=tmp1x
tmp1=py1c
 AtoZ() 
pyc=tmp1x+tmp1x
tmp1=tmp1hh
tmp1x=tmp1xhh
	py1c=py1c+1;
		}
else {
py2c=py2c+1
arrpicadd[py2c]=tmp2
tmp1hh=tmp1
tmp1xhh=tmp1x
tmp1=py2c
 AtoZ() 
pyc=tmp1x+tmp1x
tmp1=tmp1hh
tmp1x=tmp1xhh
}
	
	killMat(pic1);
	killMat(lastp);
	
	document.images[pic1].src = blank;
	document.images[lastp].src = blank;
	pb=blank
CTmat=CTmat+1
document.images[pyc].src = tmp2;
document.images['tw'].src = tmp2;
if (CTmat >11){
document.game.gary.value = CTall;
Win(3)
}
	}

	if (lastp != tmp1x) {
	nomatch= 1; 
	pa=pic1
	pb=tmp2
	
	document.images[pic1].src = tmp2;
	if (playeris==1){
	playeris=2
	document.images['rd'].src = "http://donotgo.com/skin/g3g.gif";
	document.images['bl'].src = "http://donotgo.com/skin/bb.jpg";
	}
	else{
	playeris=1
	document.images['rd'].src = "http://donotgo.com/skin/bo.jpg";
	document.images['bl'].src = "http://donotgo.com/skin/g3g.gif";
	}

DeLay()
	noMat()
	
	}	
working=0
}
window.Win = function(xx) {
if (xx != 3) {
FillAr(1)
document.images["AA"].src = "http://donotgo.com/skin/bk.gif";
document.images["BB"].src = "http://donotgo.com/skin/bk.gif";
document.images["CC"].src = "http://donotgo.com/skin/bk.gif";
document.images["DD"].src = "http://donotgo.com/skin/bk.gif";
document.images["EE"].src = "http://donotgo.com/skin/bk.gif";
document.images["FF"].src = "http://donotgo.com/skin/bk.gif";
document.images["GG"].src = "http://donotgo.com/skin/bk.gif";
document.images["HH"].src = "http://donotgo.com/skin/bk.gif";
document.images["II"].src = "http://donotgo.com/skin/bk.gif";
document.images["JJ"].src = "http://donotgo.com/skin/bk.gif";
document.images["KK"].src = "http://donotgo.com/skin/bk.gif";
document.images["LL"].src = "http://donotgo.com/skin/bk.gif";
document.images["MM"].src = "http://donotgo.com/skin/bk.gif";
document.images["NN"].src = "http://donotgo.com/skin/bk.gif";
document.images["OO"].src = "http://donotgo.com/skin/bk.gif";
document.images["PP"].src = "http://donotgo.com/skin/bk.gif";
document.images["QQ"].src = "http://donotgo.com/skin/bk.gif";
document.images["RR"].src = "http://donotgo.com/skin/bk.gif";
document.images["SS"].src = "http://donotgo.com/skin/bk.gif";
document.images["TT"].src = "http://donotgo.com/skin/bk.gif";
document.images["UU"].src = "http://donotgo.com/skin/bk.gif";
document.images["VV"].src = "http://donotgo.com/skin/bk.gif";
document.images["WW"].src = "http://donotgo.com/skin/bk.gif";
document.images["XX"].src = "http://donotgo.com/skin/bk.gif";
document.images["rd"].src = "http://donotgo.com/skin/bk.gif";
document.images["bl"].src = "http://donotgo.com/skin/bk.gif";

if (stopend==1) {stopend=0}
else {stopend=1}
if (stopend==0) {document.game.gary3.value = "  Stop/start  "}
Win1()

}
}

window.Win1 = function() {
loadit=0
if (theend==1) {
clearTimeout(timerID)

}
if (theend>10000) {theend=2;}
theend = theend +1;
tmp4=1;

radnum= Math.floor((Math.random() * 24));
tmp1= radnum+1;
AtoZ();
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx jjj number of pics
imlg1=imlg-2
radnum= Math.floor((Math.random() * imlg1));
ttmp = vP1a[radnum+1];

if (tmp1<3) {document.images['tw'].src = ttmp;}
document.images[tmp1x].src = ttmp;
if (theend < 200) {
tester2 = document.images[tmp1x].complete ;
tester4=13
	if (tester2) {
	tester4=1
	clearTimeout(timerD)
	if (stopend==0) {timerD=setTimeout("Win1()", 1* 300)}
	}

	if (tester4==13) {
	timg();
	clearTimeout(timerD)
	if (stopend==0) {timerD=setTimeout("Win1()", 1* 300);}
	}
}
else {
clearTimeout(timerD)
if (stopend==0) {timerD=setTimeout("Win1()", 1* 250);}
document.game.gary.value =  timeloading;
}

}


window.timg = function() {
timeloading=timeloading+1
loadit=loadit+2;

document.game.gary.value =  timeloading;
tester2 = document.images[tmp1x].complete;
if (tester2) {

if (loadit > 1) {

clearTimeout(timer2D)
Win1();
}
}
else {

clearTimeout(timer2D)
timer2D=setTimeout("timg()", 1* 200);
}
}



window.sqClick = function(chName) {
if (working==0) {
pic1old= pic1;

pic1 = chName;
witch();

pic1= pic1old
witch();
goNext(chName)
}

}

window.goNext = function(chName) {

pic1 = chName

pic1 = chName;
Used();

if (tmp4==0) {
working=1
CTall=CTall+1
document.game.gary.value = CTall;
	if (clnum==2) {
	clnumx = 1;
	witch();
	document.images[chName].src = tmp2;


loDp(chName)
	
	}

if (clnum==1) {
clnum = 2;
witch();
lastp = pic1;
document.images[chName].src = tmp2;
working=0
}

if (clnumx==1) {
clnum=1;
clnumx=0;
}

pause = 0;
}

tmp4=0

}
window.sqClicks = function(chName) {
}
window.help = function() {
var helpin=window.open("", "helpin", "Width=570,hight=500, scrollbars=yes")
helpin.focus();
helpin.document.write("<HTML><HEAD></HEAD><BODY BGCOLOR='#95B0B9' TEXT='#000000' LINK='#0000FF' VLINK='#FF0000' ALINK='#FF0000' ><FONT SIZE=5><CENTER></FONT><BR><FONT SIZE=3 COLOR='#FFFF00'></FONT></CENTER>The object of this version of the old TV game Concentration is to try to find all the matching pictures in as few turns as possible (for 1 or 2 players). My best score is 42, but 50+ is the average. When you match a set of pictures a small icon will be placed in the left column. If you would like a vershion of the game 'ized' to your pictures email me at: <A HREF='MAILTO:games@inmendham.com'>games@donotgo.com</A>. <P><FONT SIZE=3 COLOR='#00FF00'>BUTTONS:</FONT><br><FONT COLOR=#aa33bb>Play Again</FONT>-- Reloads the game.<BR><FONT COLOR=#aa33bb>Load-m-all</FONT>-- Randomly displays all the available game pictures.<BR><FONT COLOR=#aa33bb>Game Help</FONT>-- What you are reading now.<P>Hints: The game can be played off line if you are able to leave you browser active after signing off. Let the end game run for a few seconds to load all the images and than you should be able to use the Play Again button (you might have to use the back button if no page loads) to play again even when off-line.<P><P>  To use the software on your site a link to some donotgo.com web page must be provided.<P>Game copyright: &copy; 2001 Donotgo.com</BODY></HTML>")
helpin.document.close()
}
window.LoadPic = function() {

loadp=loadp+1
document.game.gary.value = "LOADING  "+loadp
if (loadp>7) {document.game.gary.value = "Ready"}
}
window.loadPage = function(list) {
location.href = list.options[list.selectedIndex].value
}

