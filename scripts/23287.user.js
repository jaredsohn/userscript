// TAAT’em user script
// version 0.41beta
// 2008-02-28
// Copyright (c) 2007, TAAT Technologie Cyfrowe
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "taat’em", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TAAT’em converter
// @namespace     http://taat.pl/typografia/em/
// @description   Handy px to em converter
// @include       *
// ==/UserScript==

/*global options*/

var rythm=18;                   /* vertical rythm in pixels */
var minmax=false;                /* show min and max width and height */
var suggestions=true;           /* show grid correction suggestions true/false */
var color_item='cyan';          /* css syntax color */
var color_item_value='white';   /* css values color */
var opacity=1;                /* panel opacity (range: 0 max - 1 disabled) */
                                /*(if opacity <> 1 info box is positioned 
                                   at absolute 0,0 instead of fixed)*/

        
/*you should not have change anything below*/
/*============================================*/

function wURL(url) {
/* compare url to current window url and return difference path as string */
    var pos=0;
    tURL=window.location.href;
    if (tURL.indexOf('http://')==0) tURL=tURL.substring(7,tURL.length);
    if (url.indexOf('http://')==0) url=url.substring(7,url.length);
    for (i=0;i<url.length;i++) {
        if (url.charAt(i)=='/') pos=i;
        if (tURL.charAt(i)!=url.charAt(i)) return url.substring(pos,url.length);
    }
    return url;
}

function trim ( str, charlist ) {
    /*right trim*/
    /*from: 12.000px -> 12*/
    /*from: 12.560 -> 12.56*/
    /*from: 12.3333334 -> 12.3333*/
 str=parseFloat(str);
 if (str==0) return 0;
 if (str%10==0) return str;
 str=str.toFixed(4);
    charlist = !charlist ? ' \.0\s\xA' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    var re = new RegExp('[' + charlist + ']+$', 'g');
    return str.replace(re, '');
}

function hexnum(string, tohex, returnAsFormattedString){
    if (string=='transparent') return 'transparent';
string+='';//forced to string
if(string.indexOf('rgb')==0){tohex=true;};//forced
if(string.indexOf('#')==0){tohex=false;};//forced
string=string.replace(/#/g, '');
string=string.replace(/^\s*rgb/i, ' ');
string=string.replace(/[,\(\)]/g, ' ');
string=string.replace(/\s{2,}/g, ' ');
string=string.replace(/^[\s\b]+|[\s\b]+$/g, '');
var output=[];
if(tohex){//input is a rgb
string=string.split(' ');
	for(var s=0; s<string.length; s++){
	string[s]=parseInt(string[s]);
	var L=++output.length-1;
	output[L]=string[s].toString(16);
		if(output[L].length==1){output[L]=output[L]+output[L];};
	}
}
else{//input is an hex
string=string.replace(/\s+/g, '');
var three=(string.length<=3);
var increment=(!three || string.length==2)?2:1;
	for(var s=0; s<string.length; s+=increment){
	output[++output.length-1]=(!three)?
	parseInt(string.substring(s,s+2), 16):
	parseInt(string.substring(s,s+1)+string.substring(s,s+1), 16);
	}
};
if(!returnAsFormattedString){return output;}
else if(tohex){output='#'+output.join('');}
else{output='rgb('+output.join(',')+')';};
return output;
}
        
/*optimal line height in pixels*/
function optimalLH(width, fs){
    /* width to pica */
     wpica=(parseFloat(width)/fs);
     /* font size to points */
     fspt=(parseFloat(fs)*12)/fs;
        number = parseFloat(wpica/fspt+fs);
        number = number.toPrecision(1);
        number = parseFloat(number);
     return number;
}

function missing(size, base) {
	ret=0;
    while (ret<=size) {
        ret+=base;
    }
    return ret;
}

function getStyle(e, styleProp)
{
	if (e.currentStyle)
		var y = e.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(e,null).getPropertyValue(styleProp);
	return y;
}

function showInfo(ev) {
if (!ev) {ev=window.event;}
if (ev.target) {e=ev.target;}
else if (ev.srcElement) {e=ev.srcElement;}
if (e.nodeType==3)  /* defeat Safari bug */
{var e = e.parentNode;}

body=document.getElementsByTagName('body')[0];

  if (e2=document.getElementById('taat_em_converter_container')) {
      e2.parentNode.removeChild(e2);
      if (e3=document.getElementById('taat_em_converter_border'))
          e3.parentNode.removeChild(e3);
      (ev.preventDefault) ? ev.preventDefault() : (ev.returnValue = false);
      return false;
  }

    if (e.id=='taat_em_converter_background_link' || e.id=='taat_em_converter_image_link') window.location.href=e.href;

  if  (e.id=='taat_em_converter_border' || e.className=='taat_em_converter' ||
      e.parentNode.className=='taat_em_converter' || e.parentNode.parentNode.className=='taat_em_converter') {
      if (tecc=document.getElementById('taat_em_converter_container'))
          tecc.parentNode.removeChild(tecc);
      if (tecb=document.getElementById('taat_em_converter_border'))
          tecb.parentNode.removeChild(tecb);
      (ev.preventDefault) ? ev.preventDefault() : (ev.returnValue = false);
      return false;
  }
  

  
    ex=0;
    ey=0;
    oldid=e.id;
    
   /*container div*/
    cont=document.createElement("div");
    c1=document.createElement("div");
    c2=document.createElement("div");
    c3=document.createElement("div");
    c1.style.cssFloat='left';
    c2.style.cssFloat='left';
    c3.style.cssFloat='left';
    c1.style.width='32%';
    c2.style.width='32%';
    c3.style.width='32%';
    if (minmax) panelheight='320px';
    else panelheight='260px';
    c1.style.height=panelheight;
    c2.style.height=panelheight;
    c3.style.height=panelheight;
    
    cont.id='taat_em_converter_container';
    cont.className='taat_em_converter';
    cont.appendChild(c1);
    cont.appendChild(c2);
    cont.appendChild(c3);
    /*transparent background*/
    if (opacity!=1) {
        fixed='absolute !important';
        border=document.createElement('div');
        border.id='taat_em_converter_border';
        e.parentNode.insertBefore(border, e);
        /*body.appendChild(border);*/
    }
    else {
        cont.style.background='#222 !important';
        fixed='fixed !important';
    }
    
    /*container properties*/
    var atts0 = {
        display:'block !important',
        position:fixed,
        top:ey+'!important',
        left:ex+'!important',
        font:'11px/1.4 arial, sans-serif',
        color:'white',
        listStyleType:'none',
        margin:'0',
        paddingLeft:0,
        fontWeight:'bold',
        overflow:'hidden !important',
        paddingBottom:'10px',
        border:'2px solid #333',
        textAlign:'left !important',
        width:'100%',
        zIndex:9000,
    }
    
    for(var p in atts0) { cont.style[p]= atts0[p]; }
    
    /*info list*/
    ul3=document.createElement("ul");
    ul3.className='taat_em_converter';
    var atts3 = {
        display:'block !important',
        /*width:'326px !important',*/
        font:'11px/1.4 arial, sans-serif',
        color:'white',
        listStyleType:'none',
        margin:'10px !important',
        overflow:'hidden !important',
        fontWeight:'bold',
        paddingLeft:'10px !important',
    }
    for(var p in atts3) { ul3.style[p]= atts3[p]; }
    
    /*element type and id*/
    li3b=document.createElement('li');
    s3b=document.createElement('span');
    li3b.innerHTML='EL: ';
    li3b.title='Element: tag#id [display]';
    s3b.innerHTML=e.tagName.toLowerCase()+'#'+oldid+' ['+getStyle(e, 'display')+']';
        li3b.appendChild(s3b);
        ul3.appendChild(li3b);
        
       if (e.tagName.toLowerCase()=='img'){
       li3b2=document.createElement('li');
    s3b2=document.createElement('span');
    s3b22=document.createElement('a');
    li3b2.innerHTML='SRC: ';
    li3b2.title='Image source';
    imgsrc=e.src;
    wimgsrc=wURL(e.src);
    s3b22.title='Image source';
    s3b22.href=imgsrc;
    s3b22.innerHTML=wimgsrc;
        s3b22.id='taat_em_converter_image_link';
        s3b22.style.color='white !important';
        s3b22.style.textDecoration='underline !important';
        li3b2.appendChild(s3b2);
        li3b2.appendChild(s3b22);
        ul3.appendChild(li3b2);
        }
  
    /*position on screen*/
    li1=document.createElement('li');
    s1=document.createElement('span');
    li1.innerHTML='PO: '+e.offsetLeft+'px left, ';
    li1.title='Position on screen';
    s1.innerHTML=e.offsetTop+'px top';
        li1.appendChild(s1);
        ul3.appendChild(li1);
    
    /*font size & family*/
    li3=document.createElement('li');
    s3=document.createElement('span');
    li3.innerHTML='FO: ';
    li3.title='Font size & family';
    fs=getStyle(e, 'font-size');
    ff=getStyle(e, 'font-family');
    fs=parseFloat(fs);
    s3.innerHTML=fs+'px, '+ff;
        li3.appendChild(s3);
        ul3.appendChild(li3);
        
    /*parent font size & family*/
    li3cc=document.createElement('li');
    s3cc=document.createElement('span');
    li3cc.innerHTML='PFO: ';
    li3cc.title='Parent font size & family';
    pfs=getStyle(e.parentNode, 'font-size');
    pff=getStyle(e.parentNode, 'font-family');
    pfs=parseFloat(pfs);
    s3cc.innerHTML=trim(pfs)+'px, '+pff;
        li3cc.appendChild(s3cc);
        ul3.appendChild(li3cc);
        
        
        lh=getStyle(e, 'line-height');
    if (lh=='normal') lh=fs;
    else lh=parseFloat(lh);
    
    h=parseFloat(getStyle(e, 'height'));
    if (isNaN(h)) h=lh;
 
        
         /*number of lines*/
    li36=document.createElement('li');
    s36=document.createElement('span');
    li36.innerHTML='LI: ';
    li36.title='Number of lines';
   lines=h/lh;
   if (isNaN(lines)) lines=1; 
   s36.innerHTML=trim(lines);
        li36.appendChild(s36);
        ul3.appendChild(li36);
    
       /*color*/
    li3d=document.createElement('li');
    s3d=document.createElement('span');
    
    li3d.innerHTML='CO: ';
    li3d.title='Color';
    clr=hexnum(getStyle(e, 'color'),1,1);
    /*li3d.style.height='16px';*/
    s3d.innerHTML=clr;
    s3db=document.createElement('span');
    s3db.innerHTML='&thinsp;&#x25fc;';
    s3db.style.color=clr;
    s3db.style.fontFamily='monospace';
    s3db.style.fontSize='1.5em';
    s3db.style.lineHeight='0.5em';
    li3d.appendChild(s3d);
    li3d.appendChild(s3db);
    ul3.appendChild(li3d);
    
    /*background color*/
    li3e=document.createElement('li');
    /*li3e.style.height='16px';*/
    s3e=document.createElement('span');
    s3eb=document.createElement('span');
    li3e.innerHTML='BC: ';
    li3e.title='Background color';
    bc=hexnum(getStyle(e, 'background-color'),1,1);
    s3e.innerHTML=bc;
    s3eb.innerHTML='&thinsp;&#x25fc;';
    s3eb.style.color=bc;
    s3eb.style.fontFamily='monospace';
    s3eb.style.fontSize='1.5em';
    s3eb.style.lineHeight='0.5em';
    li3e.appendChild(s3e);
    li3e.appendChild(s3eb);
    ul3.appendChild(li3e);
    
     /*background image*/
    url=getStyle(e, 'background-image')
    if (url!='none' && url!='') {
        
        /*background url*/
        li3f=document.createElement('li');
        s3f=document.createElement('span');
        s3fa=document.createElement('a');
        src=url.substring(4,url.length-1);
        inner=wURL(src);
        s3fa.href=src;
        s3fa.title='Background image';
        s3fa.innerHTML=inner;
        s3fa.id='taat_em_converter_background_link';
        s3fa.style.color='white !important';
        s3fa.style.textDecoration='underline !important';
        
        li3f.innerHTML='BI: ';
        li3f.title='Background image';
        li3f.appendChild(s3f);
        li3f.appendChild(s3fa);
        ul3.appendChild(li3f);
        
        /*background position and repeat*/
        li3g=document.createElement('li');
        s3g=document.createElement('span');
        li3g.innerHTML='BP: ';
        li3g.title='Background position & repeat';
        bpr=getStyle(e, 'background-position')+' '+getStyle(e, 'background-repeat');
        s3g.innerHTML=bpr;
        li3g.appendChild(s3g);
        ul3.appendChild(li3g);
    }
    
    /*vertical rythm*/
    li3c=document.createElement('li');
    s3c=document.createElement('span');
    li3c.innerHTML='RY: ';
    li3c.title='Vertical rythm';
    s3c.innerHTML=rythm+'px';
    li3c.appendChild(s3c);
    ul3.appendChild(li3c);
 
    
    /*pixel list*/
    ul=document.createElement("ul");
    ul.className='taat_em_converter';
    var atts1 = {
        display:'block !important',
        font:'11px/1.4 "lucida grande", helvetica, arial, verdana, sans-serif',
        color:'white',
        /*cssFloat:'left',*/
        listStyleType:'none',
        margin:'10px !important',
        paddingLeft:'10px !important',
        fontWeight:'bold',
        /*width:'326px !important',*/
    }
    for(var p in atts1) { ul.style[p]= atts1[p]; }
    
    /*margins*/        
    li32=document.createElement('li');
    s32=document.createElement('span');
    li32.innerHTML='margin: ';
    li32.title='Margins';
    li32.style.color=color_item;
    s32.style.color=color_item_value;
    mt=getStyle(e, 'margin-top');
    mr=getStyle(e, 'margin-right');
    mb=getStyle(e, 'margin-bottom');
    ml=getStyle(e, 'margin-left');
    s32.innerHTML=trim(mt)+
            'px '+trim(mr)+
            'px '+trim(mb)+
            'px '+trim(ml)+'px;';
        li32.appendChild(s32);
        ul.appendChild(li32);
    
    /*paddings*/
    li33=document.createElement('li');
    s33=document.createElement('span');
    li33.innerHTML='padding: ';
    li33.title='Paddings';
    li33.style.color=color_item;
    s33.style.color=color_item_value;
      var pt=getStyle(e, 'padding-top');
    var pr=getStyle(e, 'padding-right');
    var pb=getStyle(e, 'padding-bottom');
    var pl=getStyle(e, 'padding-left');
    s33.innerHTML=trim(pt)+
            'px '+trim(pr)+
            'px '+trim(pb)+
            'px '+trim(pl)+'px;';
        li33.appendChild(s33);
        ul.appendChild(li33);
    
    /*height*/
    li34=document.createElement('li');
    s34=document.createElement('span');
    li34.innerHTML='height: ';
    li34.style.color=color_item;
    s34.style.color=color_item_value;
    li34.title='Height (without margins and paddings)';
    
       s34.innerHTML=trim(h)+'px;';
        li34.appendChild(s34);
        ul.appendChild(li34);
        
    /*width*/
    li315=document.createElement('li');
    s315=document.createElement('span');
    li315.innerHTML='width: ';
    li315.style.color=color_item;
    s315.style.color=color_item_value;
    li315.title='Width (without margins and paddings)';
    w=parseFloat(getStyle(e, 'width'));
    if (isNaN(w)) w=e.offsetWidth;
    s315.innerHTML=trim(w)+'px;';
        li315.appendChild(s315);
        ul.appendChild(li315);
        
    if (minmax)    {
        
     /*min width*/
    minwidth=getStyle(e, 'min-width');
    if (minwidth!='none') {
        minwidth=parseFloat(minwidth);
        li317=document.createElement('li');
        s317=document.createElement('span');
        li317.innerHTML='min-width: ';
        li317.style.color=color_item;
        s317.style.color=color_item_value;
        li317.title='Minimum width';
        s317.innerHTML=trim(minwidth)+'px;';
            li317.appendChild(s317);
            ul.appendChild(li317);
    }
    
         /*max width*/
    maxwidth=getStyle(e, 'max-width');
    if (maxwidth!='none') {
        maxwidth=parseFloat(maxwidth);
        li316=document.createElement('li');
        s316=document.createElement('span');
        li316.innerHTML='max-width: ';
        li316.style.color=color_item;
        s316.style.color=color_item_value;
        li316.title='Maximum width';
        s316.innerHTML=trim(maxwidth)+'px;';
            li316.appendChild(s316);
            ul.appendChild(li316);
    }
    
    
    /*min height*/
    minheight=getStyle(e, 'min-height');
    if (minheight!='none') {
        minheight=parseFloat(minheight);
        li318=document.createElement('li');
        s318=document.createElement('span');
        li318.innerHTML='min-height: ';
        li318.style.color=color_item;
        s318.style.color=color_item_value;
        li318.title='Minimum height';
        s318.innerHTML=trim(minheight)+'px;';
            li318.appendChild(s318);
            ul.appendChild(li318);
    }
    
     /*max height*/
    maxheight=getStyle(e, 'max-height');
    if (maxheight!='none') {
        maxheight=parseFloat(maxheight);
        li319=document.createElement('li');
        s319=document.createElement('span');
        li319.innerHTML='max-height: ';
        li319.style.color=color_item;
        s319.style.color=color_item_value;
        li319.title='Maximum height';
        s319.innerHTML=trim(maxheight)+'px;';
            li319.appendChild(s319);
            ul.appendChild(li319);
    }
}
        
      /*line height*/
    li31=document.createElement('li');
    s31=document.createElement('span');
    li31.innerHTML='line-height: ';
    li31.title='Line height';
    li31.style.color=color_item;
    s31.style.color=color_item_value;

    s31.innerHTML=trim(lh)+'px;';
        li31.appendChild(s31);
        ul.appendChild(li31);
        
    /*optimal line height*/
 /*   li316=document.createElement('li');
    s316=document.createElement('span');
    li316.innerHTML='OLH: ';
    li316.title='Optimal line height';
    olh=optimalLH(w, fs);
    s316.innerHTML=olh+'px';
        li316.appendChild(s316);
        ul.appendChild(li316);*/
        
    /*total height*/
    li35=document.createElement('li');
    s35=document.createElement('span');
    li35.innerHTML='TH: ';
    li35.title='Total height (with margins and paddings)';
    th=parseFloat(getStyle(e, 'height'))+parseFloat(getStyle(e, 'padding-top'))+parseFloat(getStyle(e, 'padding-bottom'))+parseFloat(getStyle(e, 'margin-top'))+parseFloat(getStyle(e, 'margin-bottom'));
    if (isNaN(th)) th=fs;
    th=parseFloat(th);
    s35.innerHTML=trim(th)+'px';
        li35.appendChild(s35);
        ul.appendChild(li35);
        
          /*total width*/
    li35=document.createElement('li');
    s35=document.createElement('span');
    li35.innerHTML='TW: ';
    li35.title='Total width (with margins and paddings)';
    tw=w+parseFloat(getStyle(e, 'padding-left'))+parseFloat(getStyle(e, 'padding-right'))+parseFloat(getStyle(e, 'margin-left'))+parseFloat(getStyle(e, 'margin-right'));
    s35.innerHTML=trim(tw)+'px';
        li35.appendChild(s35);
        ul.appendChild(li35);

    /*current rythm*/
/*    li37=document.createElement('li');
    s37=document.createElement('span');
    li37.innerHTML='Rythm: ';
    li37.title='Current rythm';
    s37.innerHTML=trim(lh/fs);
        li37.appendChild(s37);
        ul.appendChild(li37);*/
    
    /*rythm 2*/
 /*   li38=document.createElement('li');
    s38=document.createElement('span');
    li38.innerHTML='Rythm 2: ';
    s38.innerHTML=trim(th/lh);
        li38.appendChild(s38);
        ul.appendChild(li38);*/

        if (suggestions) {    
    /*sugggested height*/
    li39=document.createElement('li');
    s39=document.createElement('span');
    li39.innerHTML='SH: ';
    li39.title='Suggested height ';
    su=parseFloat(missing(h, rythm));
    su2=su-rythm;
    su22=su+rythm;
    s39.innerHTML=su+'px or '+su22+'px or '+su2+'px';
        li39.appendChild(s39);
        ul.appendChild(li39);
   
    /*suggested height correction*/
    li310=document.createElement('li');
    s310=document.createElement('span');
    li310.innerHTML='SHC: ';
    li310.title='Suggested Height Correction';
    mi=su-h;
    mi2=su2-h;
    if (mi!=rythm) s310.style.color='red';
    s310.innerHTML=trim(mi)+'px or '+trim(mi2)+'px';
        li310.appendChild(s310);
        ul.appendChild(li310);
    
    /*suggested total height*/
    li311=document.createElement('li');
    s311=document.createElement('span');
    li311.innerHTML='STH: ';
    li311.title='Suggested total height'
    su=parseFloat(missing(th, rythm));
    su2=su-rythm;
    s311.innerHTML=trim(su)+'px or '+trim(su2)+'px';
        li311.appendChild(s311);
        ul.appendChild(li311);
    
    /*Sugessted Total Height Correction*/
    li312=document.createElement('li');
    s312=document.createElement('span');
    li312.innerHTML='STHC: ';
    li312.title='Sugessted Total Height Correction (or Margin Correction)';
    mith=su-th;
    mi2th=su2-th;
    if (mith!=rythm) s312.style.color='red';
    s312.innerHTML=trim(mith)+'px or '+trim(mi2th)+'px';
        li312.appendChild(s312);
        ul.appendChild(li312);
        
    /*Sugessted Total Height Correction/2*/
    li313=document.createElement('li');
    s313=document.createElement('span');
    li313.innerHTML='STHC/2: ';
    li313.title='Sugessted top and bottom height correction';
    mith2=(su-th)/2;
    mi2th2=(su2-th)/2;
    if (mith!=rythm) s313.style.color='red';
    s313.innerHTML=trim(mith2)+'px or '+trim(mi2th2)+'px';
        li313.appendChild(s313);
        ul.appendChild(li313);
    
        
    /*Sugessted Total Height Correction/LI*/
    li314=document.createElement('li');
    s314=document.createElement('span');
    li314.innerHTML='STHC/LI: ';
    li314.title='Sugessted line height correction ';
    mithli=(su-th)/lines;
    mi2thli=(su2-th)/lines;
    if (mith!=rythm) s314.style.color='red';
    s314.innerHTML=trim(mithli)+'px or '+trim(mi2thli)+'px';
        li314.appendChild(s314);
        ul.appendChild(li314);
        }
        
    /*em list*/
    ul2=document.createElement("ul");
    ul2.className='taat_em_converter';
    var atts2 = {
        display:'block !important',
        font:'11px/1.4 arial, sans-serif',
        color:'white',
        listStyleType:'none',
        margin:'10px !important',
        paddingLeft:'10px !important',
        fontWeight:'bold',
        /*width:'326px !important',*/
    }
    for(var p in atts1) { ul2.style[p]= atts2[p]; }
  
    /*e.parentNode.insertBefore(border, e);*/
    
    fs=getStyle(e, 'font-size');
    fs=parseFloat(fs);
  
    li1=document.createElement('li');
    s1=document.createElement('span');
    li1.innerHTML='left: ';
    li1.style.color=color_item;
    s1.innerHTML=trim(px2em(e.offsetLeft, fs))+'em;';
    s1.style.color=color_item_value;
        li1.appendChild(s1);
        ul2.appendChild(li1);
      
    li2=document.createElement('li');
    s2=document.createElement('span');
    li2.innerHTML='top: ';
    li2.style.color=color_item;
    s2.style.color=color_item_value;
    s2.innerHTML=trim(px2em(e.offsetTop, fs))+'em;';
        li2.appendChild(s2);
        ul2.appendChild(li2);

    li3r=document.createElement('li');
    s3r=document.createElement('span');
    li3r.innerHTML='font-size: ';
    li3r.style.color=color_item;
    li3r.title='Font size (realative to container)';
    s3r.style.color=color_item_value;
    s3r.innerHTML=trim(fs/pfs)+'em;';
        li3r.appendChild(s3r);
        ul2.appendChild(li3r);
        
    /*line height in ems*/
    li4=document.createElement('li');
    s4=document.createElement('span');
    li4.innerHTML='line-height: ';
    li4.style.color=color_item;
    s4.style.color=color_item_value;
    s4.innerHTML=trim(px2em(lh, fs))+'em;';
        li4.appendChild(s4);
        ul2.appendChild(li4);
    
        
    /*margin in ems*/
    li5=document.createElement('li');
    s5=document.createElement('span');
    li5.style.color=color_item;
    li5.innerHTML='margin: ';
    s5.style.color=color_item_value;
    s5.innerHTML=trim(px2em(mt, fs))
        +'em '+trim(px2em(mr, fs))
        +'em '+trim(px2em(mb, fs))
        +'em '+trim(px2em(ml, fs))+'em;';
    li5.appendChild(s5);
    ul2.appendChild(li5);
    
    li6a=document.createElement('li');
    s6a=document.createElement('span');
    li6a.innerHTML='padding: ';
    li6a.style.color=color_item;
    s6a.style.color=color_item_value;
    s6a.innerHTML=trim(px2em(pt, fs))
        +'em '+trim(px2em(pr, fs))
        +'em '+trim(px2em(pb, fs))
        +'em '+trim(px2em(pl, fs))+'em;';
    li6a.appendChild(s6a);
    ul2.appendChild(li6a);
    
    li7=document.createElement('li');
    s7=document.createElement('span');
    li7.innerHTML='height: ';
    li7.title='Height';
    li7.style.color=color_item;
    h=parseFloat(getStyle(e, 'height'));
    h=parseFloat(h);
    if (isNaN(h)) { h=lh } ;
    s7.style.color=color_item_value;
    s7.innerHTML=trim(px2em(h, fs))+'em;';
        li7.appendChild(s7);
        ul2.appendChild(li7);
        
         li415=document.createElement('li');
    s415=document.createElement('span');
    li415.innerHTML='width: ';
    li415.title='Width';
    li415.style.color=color_item;
    s415.style.color=color_item_value;
    s415.innerHTML=trim(px2em(w, fs))+'em;';
        li415.appendChild(s415);
        ul2.appendChild(li415);
        
        if (minmax) {
            
        if (minwidth!='none') {
            li417=document.createElement('li');
            s417=document.createElement('span');
            li417.innerHTML='min-width: ';
            li417.title='Mimimal width';
            li417.style.color=color_item;
            s417.style.color=color_item_value;
            s417.innerHTML=trim(px2em(minwidth, fs))+'em;';
            li417.appendChild(s417);
            ul2.appendChild(li417);
        }
        
        if (maxwidth!='none') {
            li418=document.createElement('li');
            s418=document.createElement('span');
            li418.innerHTML='max-width: ';
            li418.title='Maximum width';
            li418.style.color=color_item;
            s418.style.color=color_item_value;
            s418.innerHTML=trim(px2em(maxwidth, fs))+'em;';
            li418.appendChild(s418);
            ul2.appendChild(li418);
        }
        
            if (minheight!='none') {
            li419=document.createElement('li');
            s419=document.createElement('span');
            li419.innerHTML='min-height: ';
            li419.title='Minimum height';
            li419.style.color=color_item;
            s419.style.color=color_item_value;
            s419.innerHTML=trim(px2em(minheight, fs))+'em;';
            li419.appendChild(s419);
            ul2.appendChild(li419);
        }
        
        if (maxheight!='none') {
            li420=document.createElement('li');
            s420=document.createElement('span');
            li420.innerHTML='max-height: ';
            li420.title='Miximum height';
            li420.style.color=color_item;
            s420.style.color=color_item_value;
            s420.innerHTML=trim(px2em(maxheight, fs))+'em;';
            li420.appendChild(s420);
            ul2.appendChild(li420);
        }
                
        }

    li8=document.createElement('li');
    s8=document.createElement('span');
    li8.innerHTML='TH: ';
    li8.title='Total box height (with margins and paddings) ';
       th=h+parseFloat(getStyle(e, 'padding-top'))+parseFloat(getStyle(e, 'padding-bottom'))+parseFloat(getStyle(e, 'margin-top'))+parseFloat(getStyle(e, 'margin-bottom'));
    th=parseFloat(th);
    s8.innerHTML=trim(px2em(th, fs))+'em';
        li8.appendChild(s8);
        ul2.appendChild(li8);
        
            li416=document.createElement('li');
    s416=document.createElement('span');
    li416.innerHTML='TW: ';
    th=h+parseFloat(getStyle(e, 'padding-left'))+parseFloat(getStyle(e, 'padding-right'))+parseFloat(getStyle(e, 'margin-left'))+parseFloat(getStyle(e, 'margin-right'));
    li416.title='Total box width (with margins and paddings) ';
    s416.innerHTML=trim(px2em(tw, fs))+'em';
        li416.appendChild(s416);
        ul2.appendChild(li416);

        
        if (suggestions) {
    li9=document.createElement('li');
    s9=document.createElement('span');
    li9.innerHTML='SH: ';
    li9.title='Suggested height ';
    s9.innerHTML=trim(px2em(su, fs))+'em or '+trim(px2em(su+fs, fs))+'em or '+trim(px2em(su-fs, fs))+'em';
        li9.appendChild(s9);
        ul2.appendChild(li9);
        
        
    /*suggested height correction*/
    li410=document.createElement('li');
    s410=document.createElement('span');
    li410.innerHTML='SHC: ';
    li410.title='Suggested Height Correction';
    mi=su-h;
    mi2=su2-h;
    if (mi!=rythm) s410.style.color='red';
    s410.innerHTML=trim(mi)+'em or '+trim(mi2)+'em';
        li410.appendChild(s410);
        ul2.appendChild(li410);
    
    /*suggested total height*/
    li411=document.createElement('li');
    s411=document.createElement('span');
    li411.innerHTML='STH: ';
    li411.title='Suggested total height'
    s411.innerHTML=trim(px2em(su,fs))+'em or '+trim(px2em(su2,fs))+'em';
        li411.appendChild(s411);
        ul2.appendChild(li411);
    
    /*Sugessted Total Height Correction*/
    li412=document.createElement('li');
    s412=document.createElement('span');
    li412.innerHTML='STHC: ';
    li412.title='Sugessted Total Height Correction (or Margin Correction)';
    if (mith!=rythm) s412.style.color='red';
    s412.innerHTML=trim(px2em(mith,fs))+'em or '+trim(px2em(mi2th,fs))+'em';
        li412.appendChild(s412);
        ul2.appendChild(li412);
        
    /*Sugessted Total Height Correction/2*/
    li413=document.createElement('li');
    s413=document.createElement('span');
    li413.innerHTML='STHC/2: ';
    li413.title='Sugessted top and bottom height correction';
    if (mith!=rythm) s413.style.color='red';
    s413.innerHTML=trim(px2em(mith2,fs))+'em or '+trim(px2em(mi2th2,fs))+'em';
        li413.appendChild(s413);
        ul2.appendChild(li413);
    
        
    /*Sugessted Total Height Correction/LI*/
    li414=document.createElement('li');
    s414=document.createElement('span');
    li414.innerHTML='STHC/LI: ';
    li414.title='Sugessted line height correction ';
    if (mith!=rythm) s414.style.color='red';
    s414.innerHTML=trim(px2em(mithli,fs))+'em or '+trim(px2em(mi2thli,fs))+'em';
        li414.appendChild(s414);
        ul2.appendChild(li414);
    }
    
    h1=document.createElement('h1');
    h1.className='taat_em_converter';
    h1.innerHTML='TAAT’em converter 0.41b';
    h1.style.background='#222';
    h1.style.color='white';
    h1.style.fontSize='16px !important';
    h1.style.lineHeight='24px !important';
    h1.style.margin='0';
    h1.style.width='326px !important';
    h1.style.marginTop='0 !important';
    h1.style.paddingTop='0 !important';
    h1.style.paddingLeft='20px !important';
    
    h20=document.createElement('h2');
    h20.className='taat_em_converter';
    h20.innerHTML='[info]';
    h20.style.color='orange';
    h20.style.fontSize='12px !important';
    h20.style.marginTop='0 !important';
    h20.style.marginBottom='0 !important';
    h20.style.paddingLeft='20px !important';
    h20.style.paddingTop='0 !important';
    h20.style.paddingBottom='0 !important';
    
    h21=document.createElement('h2');
    h21.className='taat_em_converter';
    h21.innerHTML='[px dimensions]';
    h21.style.color='orange';
    h21.style.fontSize='12px !important';
    h21.style.paddingLeft='20px !important';
    h21.style.marginTop='0 !important';
    h21.style.marginBottom='0 !important';
    h21.style.paddingTop='0 !important';
    h21.style.paddingBottom='0 !important';
     
    h22=document.createElement('h2');
    h22.className='taat_em_converter';
    h22.innerHTML='[em dimensions]';
    h22.style.color='orange';
    h22.style.fontSize='12px !important';
    h22.style.paddingLeft='20px !important';
    h22.style.marginTop='0 !important';
    h22.style.marginBottom='0 !important';
    h22.style.paddingTop='0 !important';
    h22.style.paddingBottom='0 !important';
    
    ul.style.marginTop='0 !important';
    ul.style.marginBottom='0 !important';
    ul2.style.marginTop='0 !important';
    ul2.style.marginBottom='0 !important';
    ul3.style.marginTop='0 !important';
    ul3.style.marginBottom='0 !important';
     
    body.appendChild(cont);
    c1.appendChild(h1);
    c1.appendChild(h20);
    c1.appendChild(ul3);
    c2.appendChild(h21);
    c2.appendChild(ul);
    c3.appendChild(h22);
    c3.appendChild(ul2);
    
    if (opacity!=1) {
     var atts = {
        display:'block !important',
        position:fixed,
        top:ey+'!important',
        left:ex+'!important',
        font:'11px/1.4 arial, sans-serif',
        color:'white',
        listStyleType:'none',
        margin:'0',
        paddingLeft:0,
        fontWeight:'bold',
        overflow:'hidden !important',
        paddingBottom:'10px',
        border:'2px solid #333',
        textAlign:'left !important',
        background:'black',
        opacity:opacity,
        width:'100%',
        zIndex:9000,
        height:parseFloat(getStyle(cont, 'height'))+'px !important',
    };
    
    for(var p in atts) { border.style[p]= atts[p]; }
    }
  (ev.preventDefault) ? ev.preventDefault() : (ev.returnValue = false);
}

function px2em(px, size) {return parseFloat(px)/size;}
            
function addEvent(obj, type, fn) {
if (obj.addEventListener) {
    obj.addEventListener(type, fn, false);
} else if (obj.attachEvent) {
    obj["e"+type+fn] = fn;
    obj[type+fn] = function() {obj["e"+type+fn](window.event); }
    obj.attachEvent("on"+type, obj[type+fn]);
}
}

function startMagic() {
    addEvent(document.getElementsByTagName("body")[0], "click", showInfo);
}

addEvent(window, "load", startMagic);