// ==UserScript==
// @name           torrents.ru extended
// @version       2.20
// @namespace      blog.laptev.info
// @description    Extention for Torrents.ru and rutracker.org sites. Add floating statistic window (informer) into tracker page
// @include        http://torrents.ru/forum/*
// @include        http://rutracker.org/forum/*
// @include        http://*.rutracker.org/forum/*
// ==/UserScript==



var prof = document.getElementsByClassName("tRight");
var prof1 = prof[0];
var prof2 = document.getElementById("page_header");
var vodka = document.createElement('div');
	vodka.setAttribute('style', 'display: block; z-index: 0; position:absolute; left: 3px; top: 8px;');
	vodka.setAttribute('drag','1');
var rt1 = prof1.getElementsByTagName('a');

if ( location.href != rt1[1].href ) {
GM_xmlhttpRequest({
   method: 'GET',
   url: rt1[1].href,
   onload: function(responseDetails) {

       var vd = document.createElement('div');
       setStyle(vd,'display','none');
       document.body.appendChild(vd);
       vd.innerHTML =  responseDetails.responseText;
       var prof4 = vd.getElementsByClassName("pad_4");

       //Добавим остальное

       //количество закачек сидер-личер

   var det2=vd.getElementsByClassName("bordered w100");
   det2=det2[1];
   var st= det2.getElementsByTagName('tr');
       for (var i = 0; i < st.length; i++) {
                       if ( st[i].childNodes[1].className=='row1 tCenter seed lh_150 pad_4 nowrap') {
               ((st[i].childNodes[1].innerHTML )?sd=(st[i].childNodes[1].innerHTML):sd='0');
                       }
                       if ( st[i].childNodes[1].className=='row1 tCenter leech lh_150 pad_4 nowrap') {
               ((st[i].childNodes[1].innerHTML )?ld=(st[i].childNodes[1].innerHTML):ld='0');
                       }
           }
       sd=sd.substr(sd.indexOf('[',1)+1,sd.indexOf(']',sd.indexOf('[',1))-sd.indexOf('[',1)-1);
       ld=ld.substr(ld.indexOf('[',1)+1,ld.indexOf(']',ld.indexOf('[',1))-ld.indexOf('[',1)-1)
       ////
       var det1=vd.getElementsByClassName("user_details borderless w100");
       det1=det1[0];

       	var z1 =  prof4[0].getElementsByTagName('td');
	var z2 =  vd.getElementsByTagName('td');    //морда
	var dall = z1[2].innerHTML;
	var tall = z1[4].innerHTML;
	var dull = z1[6].innerHTML;
	var tull = z1[8].innerHTML;
	
	var rep = det1.childNodes[1].childNodes[10].childNodes[3].childNodes[0].childNodes[0].innerHTML; //репутация
    var mes = det1.childNodes[1].childNodes[8].childNodes[3].childNodes[1].childNodes[1].innerHTML; //количество сообщений
	var rt  = det1.childNodes[1].childNodes[12].childNodes[3].childNodes[1].innerHTML; //рейтинг
   var meshh = rt1[3];//сообщения

	var t1='<br><table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr>';
	var t2='<td valign="top" width="270"><table bgcolor="#778899" border="0" cellpadding="0" cellspacing="0" width="270"><tbody><tr><td><table border="0" cellpadding="3" cellspacing="1" width="100%"><tbody><tr><td class="boxtitle" align="center" bgcolor="#6699cc">';
	var t3='<p align="left"><b><font color="#ffffff" size="2" face="Verdana"><a href="http://blog.laptev.info/projects">»</a> </font></b></p></td></tr><tr>';
	var t4='<td bgcolor="#ffffff"><span><center><table align="center" border="0" cellpadding="1" cellspacing="0" width="99%"> <tbody><tr>';
	var t5='<td width="30%" rowspan=3>&nbsp;';
	var t51='</td>';
	var t6='<td width="70%"><font size="1" face="verdana">DL: ';
	var t61='<br>UP: ';  
	var t611='';
	var t612='<br> Сообщений: ';
	var t62='</font></td></tr>';
	var t7='<tr>';
	var t8='<td width="70%"><font size="1" face="verdana">[%]: <font color="#000000">';
	var t81='</font></font></td></tr>';
	var t9='<tr>';
	var t10='<td width="70%"><img src="data:image/gif,GIF89a%0F%00%10%00%B3%00%00%DA%E6%FE%DB%E3%F8%DC%E6%F9%C3%D4%E7%AE%C4%E5%E6%EE%FC%E1%EA%FE%D4%E1%FC%FE%FE%FBMa%85%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0F%00%10%00%00%045%10%C9I%2B*)%EB%9D%84L%06pp%DB%07%04d%89%A4%E4%C7%AA%DAZ%C6%F2D%D7rb%DB%99%DBS0U%EE%D7j%0D_%BE%97%0E%81R%02%10%03%8B%94%10%01%00%3B" alt="data:image/gif,GIF89a%0F%00%10%00%B3%00%00%DA%E6%FE%DB%E3%F8%DC%E6%F9%C3%D4%E7%AE%C4%E5%E6%EE%FC%E1%EA%FE%D4%E1%FC%FE%FE%FBMa%85%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0F%00%10%00%00%045%10%C9I%2B*)%EB%9D%84L%06pp%DB%07%04d%89%A4%E4%C7%AA%DAZ%C6%F2D%D7rb%DB%99%DBS0U%EE%D7j%0D_%BE%97%0E%81R%02%10%03%8B%94%10%01%00%3B"/> <font size="1" face="verdana">';
	var t101='</font> <img src="data:image/gif,GIF89a%0F%00%10%00%B3%00%00%D9%E3%F6%DA%E6%FE%E1%EA%FE%C3%D4%E7%DC%E6%F9%E6%EE%FC%AE%C4%E5%DB%E3%F8%FD%FD%FA%FF%FF%FFMa%85%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0F%00%10%00%00%048%10%A5I%AB-*%EB%AD%C8TB%C0q_p%8C%DB%87%92%C9%88%8C%AA%86%CC%EC6%DFi%9B%E1x%A6%F6%8A%5E%ECe%D3%C4V%3E%1D2%B94%26%00M%40b%60%A9N%0C%11%00%3B" alt="data:image/gif,GIF89a%0F%00%10%00%B3%00%00%D9%E3%F6%DA%E6%FE%E1%EA%FE%C3%D4%E7%DC%E6%F9%E6%EE%FC%AE%C4%E5%DB%E3%F8%FD%FD%FA%FF%FF%FFMa%85%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0F%00%10%00%00%048%10%A5I%AB-*%EB%AD%C8TB%C0q_p%8C%DB%87%92%C9%88%8C%AA%86%CC%EC6%DFi%9B%E1x%A6%F6%8A%5E%ECe%D3%C4V%3E%1D2%B94%26%00M%40b%60%A9N%0C%11%00%3B"/> <font size="1" face="verdana">';
	var t102='</font></td>';
	var t11='</tr></tbody></table></center></span></td></tr></tbody></table></td></tr></tbody></table>';
	var ttt=t1+t2+t3+t4+t5+'<a href="'+rep+'">'+z2[8].childNodes[1].innerHTML+'</a>'+t51+t6+tall+'('+dall+')'+t61+tull+'('+dull+')'+t611+t612+'<a href="'+meshh+'">'+mes+'</a>'+t62+t7+t8+rt+t81+t9+t10+ld+t101+sd+t102+t11+<br />;
	vodka.innerHTML = vodka.innerHTML+ttt;
  /////
           }
       });

       prof2.appendChild(vodka);
}

var j1 = '<script type="text/javascript"> ';
var j2 = '<!-- // ';
var j3 = 'var in_drag = false;';
var j4 = 'var in_drag_counter = 0;';
var j5 = 'function init(){';
var j6 = '   var i, coll = document.getElementsByTagName( "DIV" );';
var j7 = '   for( i = 0; i < coll.length; i ++ ){   ';
var j8 = '       if( coll[ i ].getAttribute("drag") == 1 ){ ';
var j9 = '           coll[ i ].onmousedown = function( evnt ){ ';
var j10 = '               evnt = evnt || event; ';
var j11 = '               in_drag = [ this, evnt.offsetX || evnt.layerX, evnt.offsetY || evnt.layerY ];';
var j12 = '               this.style.zIndex = ++in_drag_counter; ';
var j13 = '           }';
var j14 = '       }';
var j15 = '   }';
var j16 = '   document.onmouseup = function(){ ';
var j17 = '       in_drag = false;';  
var j18 = '   } ';
var j19 = '   document.onmousemove = function( evnt ){ ';
var j20 = '       if( ! in_drag ){';
var j21 = '           return false;';
var j22 = '       } ';
var j23 = '       evnt = evnt || event; ';
var j24 = '       in_drag[ 0 ].style.left = ( document.body.scrollLeft + ( evnt.x || evnt.clientX ) - in_drag[ 1 ] ) + "px"; ';
var j25 = '       in_drag[ 0 ].style.top  = ( document.body.scrollTop  + ( evnt.y || evnt.clientY ) - in_drag[ 2 ] ) + "px"; ';
var j26 = '   } ';
var j27 = '} ';
var j28 = '// -->  ';
var j29 = '</script>'; 
var j30 = '<script type="text/javascript">'+'\u000A'+'<!-- //'+'\u000A'+' init();'+'\u000A'+' // -->'+'\u000A'+'</script>';  

var jjs1=j1+'\u000A'+j2+'\u000A'+j3+'\u000A'+j4+'\u000A'+j5+'\u000A'+j6+'\u000A'+j7+'\u000A'+j8+'\u000A'+j9+'\u000A'+j10+'\u000A'+j11+'\u000A'+j12+'\u000A'+j13+'\u000A'+j14+'\u000A'+j15+'\u000A'+j16+'\u000A'+j17+'\u000A'+j18+'\u000A'+j19+'\u000A'+j20+'\u000A'+j21+'\u000A'+j22+'\u000A'+j23+'\u000A'+j24+'\u000A'+j25+'\u000A'+j26+'\u000A'+j27+'\u000A'+j28+'\u000A'+j29+'\u000A'+j30;

var vvv = document.createElement('div');
vvv.innerHTML=jjs1;
prof2.appendChild(vvv); 



//functions
               document.getElementsByClassName = function(cl) {
               var retnode = [];
               var myclass = new RegExp('\\b'+cl+'\\b');
               var elem = this.getElementsByTagName('*');
               for (var i = 0; i < elem.length; i++) {
               var classes = elem[i].className;
               if (myclass.test(classes)) retnode.push(elem[i]);
               }
               return retnode;
               };


       function setStyle(obj,property, value){
               obj.style[property] = value
               return obj
       }
