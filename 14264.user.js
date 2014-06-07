// ==UserScript==
// @name           Ogame - Filo PUANI
// @author         Nizamettin AVCI
// @date           20-11-2007
// @version        1.0
// @namespace     
// @description    Bulundugu somurgenin filo puanini hesaplar.
// @include        http://*/game/index.php?page=flotten1*
// ==/UserScript==

    var kn = 0;
	var bn = 0;
	var ha = 0;
	var aa = 0;
	var kr = 0;
	var km = 0;
	var kl = 0;
	var gd = 0;               
	var cs = 0;
	var bm = 0;
	var sl = 0;
	var mh = 0;
	var rp = 0;
	var fr = 0;
	var top = 0;
    if (document.getElementsByName('ship202')[0]){kn=document.getElementsByName('maxship202')[0].value*4;}
    if (document.getElementsByName('ship203')[0]){bn=document.getElementsByName('maxship203')[0].value*12;}    
    if (document.getElementsByName('ship204')[0]){ha=document.getElementsByName('maxship204')[0].value*4;}    
    if (document.getElementsByName('ship205')[0]){aa=document.getElementsByName('maxship205')[0].value*10;}    
    if (document.getElementsByName('ship206')[0]){kr=document.getElementsByName('maxship206')[0].value*27;}    
    if (document.getElementsByName('ship207')[0]){km=document.getElementsByName('maxship207')[0].value*60;}    
    if (document.getElementsByName('ship208')[0]){kl=document.getElementsByName('maxship208')[0].value*30;}    
    if (document.getElementsByName('ship209')[0]){gd=document.getElementsByName('maxship209')[0].value*16;}    
    if (document.getElementsByName('ship210')[0]){cs=document.getElementsByName('maxship210')[0].value*1;}    
    if (document.getElementsByName('ship211')[0]){bm=document.getElementsByName('maxship211')[0].value*75;}    
    if (document.getElementsByName('maxship212')[0]){sl=document.getElementsByName('maxship212')[0].value*2;}    
    if (document.getElementsByName('ship213')[0]){mh=document.getElementsByName('maxship213')[0].value*110;}    
    if (document.getElementsByName('ship214')[0]){rp=document.getElementsByName('maxship214')[0].value*9000;}                                                
    if (document.getElementsByName('ship215')[0]){fr=document.getElementsByName('maxship215')[0].value*70;}    
    top=kn+bn+ha+aa+kr+km+kl+gd+cs+bm+sl+mh+rp+fr;
    var s=document.getElementsByTagName('td');
    var k=s.length-3;
    	s[k].innerHTML='<div style="text-align: center; background-color: rgb(0, 255, 0);"><font color="black"><b>FiLO PUANI :</b></font><font color="black"><b> '+ top + '</b></font></div>';