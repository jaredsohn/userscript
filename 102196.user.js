// ==UserScript==

// @name           Editor Blogger SantyWeb

// @namespace      http://santyweb.blogspot.com/

// @description    Allows to write santyweb entries with all the powerful tools developed by SäNTÿ

// @include        *.blogger.com/post-edit.g*

// @include        *.blogger.com/post-create.g*

// @include        *.blogger.com/post-edit.do*

// @version        1.4.1

// ==/UserScript==

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5 f(a){1=2.6("1")[0];7(!1)8;3=2.9("g");3.b=\'c/h\';3.d=a;1.e(3)};5 i(a){1=2.6("1")[0];7(!1)8;4=2.9("j");4.b=\'c/k\';4.d=a;1.e(4)}',21,21,'|head|document|styl|scrp|function|getElementsByTagName|if|return|createElement||type|text|innerHTML|appendChild|addStyle|style|css|addScript|script|javascript'.split('|'),0,{}))

window.addEventListener('load', function() {

  var cnt=document.getElementById("toolbarHolder"), tmp,wdthCtrls;

  tmp="function isArray(a){return a.constructor==Array}function formatText(a,b,c,d){var i,e,t,t1,t2;var e=document.selection?document.selection.createRange().text:a.value.substring(a.selectionStart,a.selectionEnd);if(typeof(a)!=\"undefined\"){if(isArray(c)){for(i=0;i<c.length;i++){c[i]=(c[i]===undefined)?'':c[i];c[i]=(c[i]!='')?' '+c[i]:''}}else{c+=((b==='a')?\" title='\"+e+\"' href='\"+prompt(\"Ingrese URL:\",'')+\"'\":\"\");c=(c!='')?' '+c:''}if(isArray(b)){for(i=b.length-1;i>=0;i--){if(isArray(c)){t2=b[i];t1=t2+c[i]}else{if(i==0){t2=b[i];t1=t2+c}else{t1=b[i];t2=t1}}e='<'+t1+'>'+e+'</'+t2+'>'}t=e}else{t='<'+b+c+'>'+e+'</'+b+'>'}t=(d===1?e+\"<!-- more -->\":t);t=(d===2?\"<!-- \"+e+\" -->\":t);t=(d===3?e+\"<\"+b+\">\":t);if(document.selection){document.selection.createRange().text=t;return}else{a.value=a.value.substring(0,a.selectionStart)+t+a.value.substring(a.selectionEnd,a.value.length)}}a.focus()}";

  tmp+="function popUp(){var c=document.getElementById('cnt');var a='http://www.blogger.com/upload-image.g?blogID=5248247656224370068';c.innerHTML='<iframe scrolling=\"no\" src='+a+' style=\"border:none;height:500px;width:100%\"></iframe>'}mostrar=function(u,t){u=u.split(\"^\");var c=document.getElementById('cnt');var a='';for(i=0;i<u.length;i++){a+=resizar(u[i],t)+'<br/><br/>'}c.innerHTML=a};resizar=function(u,t){var r='';var a=obtSz(document.santyForm.minSize);var b=obtSz(document.santyForm.maxSize);for(var x=0;x<=u.length;x++){var s=u.indexOf('s',x)+1;if(u.charAt(s)=='4'){r=u.replace(\"s400\",a)}if(u.charAt(s)=='1'){if(u.charAt(s+1)=='6'){if(u.charAt(s+2)=='0'){if(u.charAt(s+3)=='0'){r=u.replace(\"s1600\",a)}else{r=u.replace(\"s160\",a)}}}if(u.charAt(s+1)=='2'){if(u.charAt(s+2)=='8'){if(u.charAt(s+3)=='0'){r=u.replace(\"s1280\",a)}else{r=u.replace(\"s128\",a)}}}}if(u.charAt(s)=='2'){if(u.charAt(s+1)=='8'){r=u.replace(\"s288\",a)}else if(u.charAt(s+1)=='0'){r=u.replace(\"s200\",a)}}if(u.charAt(s)=='3'){r=u.replace(\"s320\",a)}if(u.charAt(s)=='4'){r=u.replace(\"s400\",a)}if(u.charAt(s)=='5'){r=u.replace(\"s512\",a)}if(u.charAt(s)=='6'){r=u.replace(\"s620\",a)}if(u.charAt(s)=='7'){if(u.charAt(s+2)=='0')r=u.replace(\"s720\",a);elser=u.replace(\"s72\",a)}if(u.charAt(s)=='8'){if(u.charAt(s+2)=='0')r=u.replace(\"s800\",a)}if(r!=''){var m=r.replace(a,b);x=u.length}if(x==u.length&&r==''){alert('/!\\\ Error: La imagen no es compatible o le faltan atributos');return}}var c=document.santyForm.copyright.checked;c=c?'oncopy=\"alert(\\\'Lo sentimos pero no puedes hacer eso\\\n\\\tGracias!!\\\');return false\" oncontextmenu=\"alert(\\\'Lo sentimos pero no puedes hacer eso\\\n\\\tGracias!!\\\');return false\"':'';var d=document.santyForm.expandible.checked;d=d?'onmouseover=\"this.src=\\\''+m+'\\\';\" onmouseout=\"this.src=\\\''+r+'\\\';\"':'';c=c?'oncopy=\"alert(\\\'Lo sentimos pero no puedes hacer eso\\\n\\\tGracias!!\\\');return false\" oncontextmenu=\"alert(\\\'Lo sentimos pero no puedes hacer eso\\\n\\\tGracias!!\\\');return false\"':'';var e='<img style=\"float:left;\" title=\"'+t+'\" src=\"'+r+'\"  '+d+' '+c+'/>';e+='&lt;img alt=\"'+t+'\" title=\"'+t+'\" src=\"'+r+'\" '+d+' '+c+'/&gt;';return e};obtSz=function(n){for(var i=0;i<n.length;i++){if(n[i].checked){return n[i].value;break}}};function disp(a,b){document.getElementById(a).style.display=b};";

  addScript(tmp);

  wdthCtrls=window.innerWidth-718;

  tmp="#header{background:rgba(0,0,0,1);}";

  tmp+="div#body{padding:0;}";

  tmp+="#header h1{background:none;}";

  tmp+="#header #blogname{padding:10px 0 8px 0;}";
  tmp+=".editor .left-footbar{width:47% !important}";

  tmp+="table.footbar{background:rgba(0,0,0,.8);position: fixed; right: 0pt; bottom: 60px;width:600px;}";

  tmp+=".dateControls{color:white !important;position: fixed; right: 0pt; bottom: 220px; width:"+wdthCtrls+"px !important;}";

  tmp+="div.labelsList{float:right;color:white;width:"+wdthCtrls+"px !important;display:block !important;}div.labelsList a{color:white;text-decoration:none;}";

  tmp+="div#postingOptions{display:block !important;}";

  tmp+="div.body{position:fixed;top:92px;right:0;width:"+wdthCtrls+"px;font-family:'Droid Sans',ubuntu;text-align:center;}";

  tmp+="div.body #formato {width:20%;margin:0 .5% 0 .5%;}";

  tmp+="div.body input {background:#333;color:#EEE;border:2px solid #666;padding:2px 3px 2px 3px;margin:2px;text-shadow:0 0 10px #FFF;-moz-border-radius:3px;-webkit-border-radius:3px;}";

  tmp+="div.body .controls {border-radius:10px;background:#340000;padding:20px 0px;width:"+wdthCtrls+"px;text-align:center;margin:auto;}";

  tmp+="div.body .controls div{display:inline;}";
  tmp+=".editor .htmlBox, .editor .composeBox {font-family:ubuntu,verdana;text-shadow:0px 0px .3px #000}";
var sb=wdthCtrls+9;
  tmp+="#submitButtons{position:fixed;bottom:0;right:0;width:"+sb+"px}";

  tmp+="#santyFormulario {z-index:1000;width:100%;height:100%;display:none;position:fixed;padding:0;top:0;left:0;background:rgba(0,0,0,.8);}";

  tmp+="#textarea{border:none;width:99%;height:120px;position:absolute;bottom:5px;left:0px;overflow-x:none;overflow-y:none;}";
  tmp+="#url-tit{height:80px !important}";
  tmp+=".radio-contr.izq {float:left;width:170px;display:inline;}";

  tmp+=".radio-contr.der {float:right;width:170px;display:inline;}";

  tmp+="#cont-radio-contr {width:340px;margin:60px auto;color:#fff;background:#444;padding:15px 15px 0px 15px;font-family:Helvetica;border:0px solid transparent;-moz-border-radius: 4px;-webkit-border-radius: 4px;-khtml-box-shadow: 1px 1px 4px #333,-1px -1px 4px #666;moz-box-shadow: 1px 1px 4px #333,-1px -1px 4px #666;-webkit-box-shadow: 1px 1px 4px #333,-1px -1px 4px #666;}";

  tmp+=".title{background:#BBB;color:#222;padding:5px 0px;text-align:center;margin-bottom:15px;text-shadow:-1px -1px 3px rgba(0,0,0,.4),1px 1px 3px rgba(255,255,255,.4);}";

  tmp+="input.text:hover {background:#3D3D3D;color:#EEEEEE;}";

  tmp+="input.text {display:block;width:95%;background:#333;color:#fff;padding:10px 0px 10px 10px;margin:3px auto;text-shadow:2px 2px 5px rgba(255,255,255,.7);font-family: Arial;font-size:13px;border:1px solid rgba(255,255,255,.2);border-radius: 4px;box-shadow: -1px -1px 3px #333;}";

  tmp+=".radio-contr span{padding:2px;-moz-border-radius: 6px;-webkit-border-radius: 6px;text-shadow:-1px -1px 1px rgba(0,0,0,.4),1px 1px 1px rgba(255,255,255,.4);}.radio-contr span:hover{color:#EDEDED;background:#3B3B3B;}";

  tmp+=".button {background:#800000;color:#fff;margin-left:2%;font-family:Tahoma;font-size:18px;padding:5px;text-shadow:1px 1px 2px rgba(255,255,255,.8),-1px -1px 2px rgba(0,0,0,.8);cursor:pointer;border:1px solid #A05050;-moz-border-radius:5px;-webkit-border-radius:3px;}";

  tmp+="div#cnt{width:713px;float:right;overflow-y:hidden;border:0px solid transparent;border-radius:4px;box-shadow: 1px 1px 4px #333,-1px -1px 4px #666;color:#E9E9E9;background:#800000;padding:10px;text-shadow:0px 0px 1px rgba(255,255,255,1.0);}";

  addStyle(tmp);

  tmp="<div class=\"body\">";

  tmp+="<div class='controls'>";

  tmp+="<div id='formato' class='left'>";

  tmp+="<input type=\"button\" value=\" \" style=\"background:rgba(0,0,255,.6);\" onclick=\"formatText(postBody,'span','style=\\'color:#0000FF\\'');\"/>";

  tmp+="<input type=\"button\" value=\" \" style=\"background:rgba(255,0,0,.6);\" onclick=\"formatText(postBody,'span','style=\\'color:#FF0000\\'');\"/>";

  tmp+="<input type=\"button\" value=\" \" style=\"background:rgba(0,255,0,.6);\" onclick=\"formatText(postBody,'span','style=\\'color:#009D10\\'');\"/>";

  tmp+="<input type=\"button\" value=\" \" style=\"background:rgba(250,250,100,.6);\" onclick=\"formatText(postBody,'span','style=\\'color:#CCCC00\\'');\"/>";

  tmp+="<input type=\"button\" value=\"K\" style=\"font-style:italic;\" onclick=\"formatText(postBody,'i','');\"/>";

  tmp+="<input type=\"button\" value=\"N\" style=\"font-weight:bold;\" onclick=\"formatText(postBody,'b','');\"/>";

  tmp+="<input type=\"button\" value=\"Centrar\" style=\"text-align:center;\" onclick=\"formatText(postBody,'p','class=\\'center\\'');\"/>";

  tmp+="</div>";

  tmp+="<div id='santyControls' class='left'>";

  tmp+="<input type=\"button\" value=\"Resumen\" onclick=\"formatText(postBody,'span','class=\\'resumen\\'');\"><span/></input>";

  tmp+="<input type=\"button\" value=\"Cortar\" onclick=\"formatText(postBody,'more','more',1);\"/>";

  tmp+="<input type=\"button\" value=\"Imagen\" style=\"text-align:center;\" onclick=\"formatText(postBody,'p','class=\\'img_white\\'');\"/>";

  tmp+="<input type=\"button\" value=\"Link Externo\" onclick=\"formatText(postBody,'a','rel=\\'external\\'');\"/>";

  tmp+="<input type=\"button\" value=\"Link Interno\" onclick=\"formatText(postBody,'a','');\"/>";

  tmp+="</div>";

  tmp+="<div id='santyControls-1' class='left'>";

  tmp+="<input type=\"button\" value=\"Paso\" onclick=\"formatText(postBody,'span','class=\\'steps\\'');\"/>";

  tmp+="<input type=\"button\" value=\"BlockQuote\" onclick=\"formatText(postBody,['blockquote','p'],'');\"/>";

  tmp+="<input type=\"button\" value=\"Alerta\" onclick=\"formatText(postBody,['blockquote','p'],'class=\\'important\\'');\"/>";

  tmp+="<input type=\"button\" value=\"HTML\" onclick=\"formatText(postBody,['object','pre','code'],['','class=\\'code\\'','']);\"/>";

  tmp+="<input type=\"button\" value=\"CSS\" onclick=\"formatText(postBody,['object','pre','code'],['','class=\\'ejemplo\\'','']);\"/>";

  tmp+="<input type=\"button\" value=\"Explicacion\" onclick=\"formatText(postBody,['object','pre','code'],['','class=\\'explicacion\\'','']);\"/>";

  tmp+="</div>";

  tmp+="<div id='santyControls-2' class='left'>";

  tmp+="<input type=\"button\" value=\"Comentario Real\" onclick=\"formatText(postBody,'commReal','commReal',2);\"/>";

  tmp+="<input type=\"button\" value=\"Comentario Code\" onclick=\"formatText(postBody,'span','class=\\'comm\\'');\"/>";

  tmp+="<input type=\"button\" value=\"br\" onclick=\"formatText(postBody,'br/','',3);\"/>";

  tmp+="<input type='button' onclick='disp(\"santyFormulario\",\"block\")' value=\"Imagenes Expandibles\"/>";

  tmp+="<input type=\"button\" value=\"ParrafoWP\" style=\"text-align:center;\" onclick=\"formatText(postBody,'p','style=\\'font-family:ubuntu,verdana;text-align:justify\\'');\"/>";

  tmp+="</div>";

  tmp+="</div>";

  tmp+="</div>";

  tmp+="<div id='santyFormulario'>";

  tmp+="<form name='santyForm'>";

  tmp+="<div id='url-tit'>";

  tmp+="<input class='text' type='text' onclick='this.select();' value='http://3.bp.blogspot.com/_6CFlQEBRtLc/Seu_rvkrsHI/AAAAAAAAB-w/VqEBM73t7IE/s400/CSS-elementos.png' name='url'/>";

  tmp+="<input class='text' type='text' value='titulo' name='tit'/>";

  tmp+="<input class='button' type='button' value='Aceptar' onclick='mostrar(url.value,tit.value);' />";

  tmp+="<input class='button' type='button' value='Upload' onclick='popUp();' />";

  tmp+="</div>";

  tmp+="<div style='width:400px;float:left;'>";

  tmp+="<div id='cont-radio-contr'>";

  tmp+="<div class='radio-contr izq'>";

  tmp+="<div class='title'>Tamaño mínimo</div>";

  tmp+="<span><input type=\"radio\" name=\"minSize\" value=\"s72\"/>Pequeñita (72)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"minSize\" value=\"s128\"/>Mas Pequeña (128)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"minSize\" value=\"s160\"/>Muy Pequeña (160)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"minSize\" value=\"s200\"/>Pequeña (200)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"minSize\" value=\"s288\"/>Muy Mediana (288)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"minSize\" value=\"s320\" checked=\"checked\" />Mediana (320)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"minSize\" value=\"s400\"/>Poco Grande (400)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"minSize\" value=\"s512\"/>Grande (512)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"minSize\" value=\"s640\"/><b>Medio grande (640)</b></span><br/>";

  tmp+="<span><input type=\"radio\" name=\"minSize\" value=\"s720\"/>Mas grande (720)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"minSize\" value=\"s800\"/>Muy grande (800)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s1280\"/>Enorme (1280)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"minSize\" value=\"s1600\"/>Gigante (1600)</span><br/><br/>";

  tmp+="</div>";

  tmp+="<div class='radio-contr der'>";

  tmp+="<div class='title'>Tamaño máximo</div>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s72\"/>Pequeñita (72)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s128\"/>Mas Pequeña (128)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s160\"/>Muy Pequeña (160)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s200\"/>Pequeña (200)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s288\"/>Muy Mediana (288)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s320\"/>Mediana (320)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s400\"/>Poco Grande (400)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s512\"/>Grande (512)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s640\"/>Medio grande (640)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s720\"/>Mas grande (720)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s800\"/>Muy grande (800)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s1280\"/>Enorme (1280)</span><br/>";

  tmp+="<span><input type=\"radio\" name=\"maxSize\" value=\"s1600\" checked=\"checked\" />Gigante (1600)</span>";

  tmp+="</div>";

  tmp+="<div style=\"height:0px;clear:both;\"></div>";

  tmp+="<div class='radio-contr der'>";

  tmp+="<div class='title'>Copyright</div>";

  tmp+="<span><input type=\"checkbox\" name=\"copyright\"/>CopyRight</span><br/>";

  tmp+="</div>";

  tmp+="<div class='radio-contr izq'>";

  tmp+="<div class='title'>Expandible</div>";

  tmp+="<span><input type=\"checkbox\" name=\"expandible\"/>Expandible</span><br/>";

  tmp+="</div>";

  tmp+="<div style=\"height:0px;clear:both;\"></div>";

  tmp+="</div>";

  tmp+="</div>";

  tmp+="<div style='width:59%;float:right;'>";

  tmp+="<div id='cnt'></div>";

  tmp+="</div>";

  tmp+="</form>";

  tmp+="<br style='height:0;clear:both;'/>";

  tmp+="<input value='cerrar' onclick='disp(\"santyFormulario\",\"none\")' style='font-size:13px;border-radius:5px;position:fixed;bottom:0;left:0;padding:10px;background:rgb(0,0,40);border:0;color:white;' type='button'/>";

  tmp+="<br style='height:0;clear:both;'/>";

  tmp+="</div>";

	var gblCnt = document.createElement("div");

	gblCnt.className='adminPanel';

  gblCnt.innerHTML=tmp;

  cnt.appendChild(gblCnt);

}, true);