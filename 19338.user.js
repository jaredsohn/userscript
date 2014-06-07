// ==UserScript==
// @version 5.1
// @name Fontexxx
// @author DSSR
// @namespace http://www.orkut.com/Profile.aspx?uid=16095185957008117508
// @description Some fontss........
// @include http://www.orkut.com/CommMsgPost.aspx?*
// @include http://www.orkut.com/CommMsgs.aspx?*
// @include http://www.orkut.com/CommPollResults.aspx?*
// @include http://www.orkut.com/CommEventPost.aspx?*
// @exclude *.js


// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea() {
	return document.getElementsByTagName('textarea')[0];
}

var font_replacer = document.body.innerHTML;
document.body.innerHTML=font_replacer
.replace(/\[playb\]/gi,"<font size=7 face='PLAYBILL'>")
.replace(/\[widel\]/gi,"<font face='WIDE LATIN'>")
.replace(/\[matura\]/gi,"<font size=5 face='MATURA MT'>")
.replace(/\[lucida\]/gi,"<font size=5 face='LUCIDA CONSOLE'>")
.replace(/\[impact\]/gi,"<font face='IMPACT'>")
.replace(/\[arial\]/gi,"<font face='ARIAL BLACK'>")
.replace(/\[alger\]/gi,"<font size=3 face='ALGERIAN'>")
.replace(/\[brush\]/gi,"<font size=5 face='BRUSH SCRIPT MT'>")
.replace(/\[brita\]/gi,"<font size=3 face='BRITANNIC BOLD'>")
.replace(/\[comic\]/gi,"<font size=7 face='Comic Sans MS'>")

.replace(/\[\/(comic|brita|brush|alger|arial|impact|lucida|matura|widel|playb)\]/gi,'</font>')



//-----------------------------------------------------------
//--                  Written links                        --
//-----------------------------------------------------------



function dip() {
	text=getTextArea();
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("div");
	d.className="T";
	d.style.fontSize="11px";
	d.align="left";
	
        
       	d.style.marginTop="10px";
	c.appendChild(d);



	brush=document.createElement("a");
	brush.href="javascript:;";
	brush.innerHTML = '[BRUSH]'
    	brush.style.cssText = 'color: #000000;                    '+
                             'cursor: pointer;                   '+
                             'border: 2px outset #6E96D5;        '+
                             'border-right: 0px !important;      '+
                             'padding: 1px;                      '+
                             'padding-left: 5px;                 '+
                             'padding-right: 5px;                '+
                             '-moz-border-radius-topleft:3;      '+
                             '-moz-border-radius-topright:3;     '+
                             '-moz-border-radius-bottomleft:3;   '+
                             '-moz-border-radius-bottomright:3;  ' 
	brush.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[brush]";
	d.replaceChild(brush_b,brush);}, false);
	d.appendChild(brush);


	brush_b=document.createElement("a");
	brush_b.href="javascript:;";
	brush_b.innerHTML = '[/BRUSH]'
    	brush_b.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	brush_b.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[/brush]";
	d.replaceChild(brush,brush_b);}, false);



	comic=document.createElement("a");
	comic.href="javascript:;";
	comic.innerHTML = '[COMIC]'
    	comic.style.cssText = 'color: #000000;                    '+
                             'cursor: pointer;                   '+
                             'border: 2px outset #6E96D5;        '+
                             'border-right: 0px !important;      '+
                             'padding: 1px;                      '+
                             'padding-left: 5px;                 '+
                             'padding-right: 5px;                '+
                             '-moz-border-radius-topleft:3;      '+
                             '-moz-border-radius-topright:3;     '+
                             '-moz-border-radius-bottomleft:3;   '+
                             '-moz-border-radius-bottomright:3;  ' 
	comic.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[comic]";
	d.replaceChild(comic_c,comic);}, false);
	d.appendChild(comic);


	comic_c=document.createElement("a");
	comic_c.href="javascript:;";
	comic_c.innerHTML = '[/COMIC]'
    	comic_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	comic_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[/comic]";
	d.replaceChild(comic,comic_c);}, false);



	brita=document.createElement("a");
	brita.href="javascript:;";
	brita.innerHTML = '[BRITA]'
    	brita.style.cssText = 'color: #000000;                    '+
                             'cursor: pointer;                   '+
                             'border: 2px outset #6E96D5;        '+
                             'border-right: 0px !important;      '+
                             'padding: 1px;                      '+
                             'padding-left: 5px;                 '+
                             'padding-right: 5px;                '+
                             '-moz-border-radius-topleft:3;      '+
                             '-moz-border-radius-topright:3;     '+
                             '-moz-border-radius-bottomleft:3;   '+
                             '-moz-border-radius-bottomright:3;  ' 
	brita.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[brita]";
	d.replaceChild(brita_b,brita);}, false);
	d.appendChild(brita);


	brita_b=document.createElement("a");
	brita_b.href="javascript:;";
	brita_b.innerHTML = '[/BRITA]'
    	brita_b.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	brita_b.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[/brita]";
	d.replaceChild(brita,brita_b);}, false);


	alger=document.createElement("a");
	alger.href="javascript:;";
	alger.innerHTML = '[ALGER]'
    	alger.style.cssText = 'color: #000000;                    '+
                             'cursor: pointer;                   '+
                             'border: 2px outset #6E96D5;        '+
                             'border-right: 0px !important;      '+
                             'padding: 1px;                      '+
                             'padding-left: 5px;                 '+
                             'padding-right: 5px;                '+
                             '-moz-border-radius-topleft:3;      '+
                             '-moz-border-radius-topright:3;     '+
                             '-moz-border-radius-bottomleft:3;   '+
                             '-moz-border-radius-bottomright:3;  ' 
	alger.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[alger]";
	d.replaceChild(alger_a,alger);}, false);
	d.appendChild(alger);


	alger_a=document.createElement("a");
	alger_a.href="javascript:;";
	alger_a.innerHTML = '[/ALGER]'
    	alger_a.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	alger_a.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[/alger]";
	d.replaceChild(alger,alger_a);}, false);


	impact=document.createElement("a");
	impact.href="javascript:;";
	impact.innerHTML = '[IMPACT]'
    	impact.style.cssText = 'color: #000000;                    '+
                             'cursor: pointer;                   '+
                             'border: 2px outset #6E96D5;        '+
                             'border-right: 0px !important;      '+
                             'padding: 1px;                      '+
                             'padding-left: 5px;                 '+
                             'padding-right: 5px;                '+
                             '-moz-border-radius-topleft:3;      '+
                             '-moz-border-radius-topright:3;     '+
                             '-moz-border-radius-bottomleft:3;   '+
                             '-moz-border-radius-bottomright:3;  ' 
	impact.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[impact]";
	d.replaceChild(impact_i,impact);}, false);
	d.appendChild(impact);


	impact_i=document.createElement("a");
	impact_i.href="javascript:;";
	impact_i.innerHTML = '[/IMPACT]'
    	impact_i.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	impact_i.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[/impact]";
	d.replaceChild(impact,impact_i);}, false);


	lucida=document.createElement("a");
	lucida.href="javascript:;";
	lucida.innerHTML = '[LUCIDA]'
    	lucida.style.cssText = 'color: #000000;                    '+
                             'cursor: pointer;                   '+
                             'border: 2px outset #6E96D5;        '+
                             'border-right: 0px !important;      '+
                             'padding: 1px;                      '+
                             'padding-left: 5px;                 '+
                             'padding-right: 5px;                '+
                             '-moz-border-radius-topleft:3;      '+
                             '-moz-border-radius-topright:3;     '+
                             '-moz-border-radius-bottomleft:3;   '+
                             '-moz-border-radius-bottomright:3;  ' 
	lucida.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[lucida]";
	d.replaceChild(lucida_l,lucida);}, false);
	d.appendChild(lucida);


	lucida_l=document.createElement("a");
	lucida_l.href="javascript:;";
	lucida_l.innerHTML = '[/LUCIDA]'
    	lucida_l.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	lucida_l.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[/lucida]";
	d.replaceChild(lucida,lucida_l);}, false);

	

	arial=document.createElement("a");
	arial.href="javascript:;";
	arial.innerHTML = '[ARIAL]'
    	arial.style.cssText = 'color: #000000;                    '+
                             'cursor: pointer;                   '+
                             'border: 2px outset #6E96D5;        '+
                             'border-right: 0px !important;      '+
                             'padding: 1px;                      '+
                             'padding-left: 5px;                 '+
                             'padding-right: 5px;                '+
                             '-moz-border-radius-topleft:3;      '+
                             '-moz-border-radius-topright:3;     '+
                             '-moz-border-radius-bottomleft:3;   '+
                             '-moz-border-radius-bottomright:3;  ' 
	arial.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[arial]";
	d.replaceChild(arial_a,arial);}, false);
	d.appendChild(arial);


	arial_a=document.createElement("a");
	arial_a.href="javascript:;";
	arial_a.innerHTML = '[/ARIAL]'
    	arial_a.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	arial_a.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[/arial]";
	d.replaceChild(arial,arial_a);}, false);


	matura=document.createElement("a");
	matura.href="javascript:;";
	matura.innerHTML = '[MATURA]'
    	matura.style.cssText = 'color: #000000;                    '+
                             'cursor: pointer;                   '+
                             'border: 2px outset #6E96D5;        '+
                             'border-right: 0px !important;      '+
                             'padding: 1px;                      '+
                             'padding-left: 5px;                 '+
                             'padding-right: 5px;                '+
                             '-moz-border-radius-topleft:3;      '+
                             '-moz-border-radius-topright:3;     '+
                             '-moz-border-radius-bottomleft:3;   '+
                             '-moz-border-radius-bottomright:3;  ' 
	matura.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[matura]";
	d.replaceChild(matura_m,matura);}, false);
	d.appendChild(matura);


	matura_m=document.createElement("a");
	matura_m.href="javascript:;";
	matura_m.innerHTML = '[/MATURA]'
    	matura_m.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	matura_m.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[/matura]";
	d.replaceChild(matura,matura_m);}, false);



	widel=document.createElement("a");
	widel.href="javascript:;";
	widel.innerHTML = '[WIDEL]'
    	widel.style.cssText = 'color: #000000;                    '+
                             'cursor: pointer;                   '+
                             'border: 2px outset #6E96D5;        '+
                             'border-right: 0px !important;      '+
                             'padding: 1px;                      '+
                             'padding-left: 5px;                 '+
                             'padding-right: 5px;                '+
                             '-moz-border-radius-topleft:3;      '+
                             '-moz-border-radius-topright:3;     '+
                             '-moz-border-radius-bottomleft:3;   '+
                             '-moz-border-radius-bottomright:3;  ' 
	widel.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[widel]";
	d.replaceChild(widel_w,widel);}, false);
	d.appendChild(widel);


	widel_w=document.createElement("a");
	widel_w.href="javascript:;";
	widel_w.innerHTML = '[/WIDEL]'
    	widel_w.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	widel_w.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[/widel]";
	d.replaceChild(widel,widel_w);}, false);


	playb=document.createElement("a");
	playb.href="javascript:;";
	playb.innerHTML = '[PLAYB]'
    	playb.style.cssText = 'color: #000000;                    '+
                             'cursor: pointer;                   '+
                             'border: 2px outset #6E96D5;        '+
                             'border-right: 0px !important;      '+
                             'padding: 1px;                      '+
                             'padding-left: 5px;                 '+
                             'padding-right: 5px;                '+
                             '-moz-border-radius-topleft:3;      '+
                             '-moz-border-radius-topright:3;     '+
                             '-moz-border-radius-bottomleft:3;   '+
                             '-moz-border-radius-bottomright:3;  ' 
	playb.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[playb]";
	d.replaceChild(playb_p,playb);}, false);
	d.appendChild(playb);


	playb_p=document.createElement("a");
	playb_p.href="javascript:;";
	playb_p.innerHTML = '[/PLAYB]'
    	playb_p.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	playb_p.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"[/playb]";
	d.replaceChild(playb,playb_p);}, false);	

}
dip();
}, false);

