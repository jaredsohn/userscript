// ==UserScript==
// @version 6
// @name FontZZ
// @author ROCKY
// @namespace http://www.orkut.com/Profile.aspx?uid=16131242779070879659
// @description Some fonts by Rocky........
// @include http://www.orkut.com/Scrapbook.aspx*
// @exclude *.js


// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea() {
	return document.getElementsByTagName('textarea')[0];
}



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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='BRUSH SCRIPT MT'>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='Comic Sans MS'>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='BRITANNIC BOLD'>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='ALGERIAN'>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='IMPACT'>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='LUCIDA CONSOLE'>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='ARIAL BLACK'>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='MATURA MT'>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='WIDE LATIN'>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='PLAYBILL'>";
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(playb,playb_p);}, false);	
	
	
	courie=document.createElement("a");
	courie.href="javascript:;";
	courie.innerHTML = '[COURIE]'
    	courie.style.cssText = 'color: #000000;                    '+
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
	courie.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='Courier new'>";
	d.replaceChild(courie_c,courie);}, false);
	d.appendChild(courie);


	courie_c=document.createElement("a");
	courie_c.href="javascript:;";
	courie_c.innerHTML = '[/COURIE]'
    	courie_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	courie_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(courie,courie_c);}, false);
	
	roman=document.createElement("a");
	roman.href="javascript:;";
	roman.innerHTML = '[ROMAN]'
    	roman.style.cssText = 'color: #000000;                    '+
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
	roman.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='Roman'>";
	d.replaceChild(roman_c,roman);}, false);
	d.appendChild(roman);


	roman_c=document.createElement("a");
	roman_c.href="javascript:;";
	roman_c.innerHTML = '[/ROMAN]'
    	roman_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	roman_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(roman,roman_c);}, false);
	
	wilde=document.createElement("a");
	wilde.href="javascript:;";
	wilde.innerHTML = '[WILDE]'
    	wilde.style.cssText = 'color: #000000;                    '+
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
	wilde.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='WildWest'>";
	d.replaceChild(wilde_c,wilde);}, false);
	d.appendChild(wilde);


	wilde_c=document.createElement("a");
	wilde_c.href="javascript:;";
	wilde_c.innerHTML = '[/WILDE]'
    	wilde_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	wilde_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(wilde,wilde_c);}, false);
	
	
	weeke=document.createElement("a");
	weeke.href="javascript:;";
	weeke.innerHTML = '[WEEKE]'
    	weeke.style.cssText = 'color: #000000;                    '+
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
	weeke.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='WeekendInParis'>";
	d.replaceChild(weeke_c,weeke);}, false);
	d.appendChild(weeke);


	weeke_c=document.createElement("a");
	weeke_c.href="javascript:;";
	weeke_c.innerHTML = '[/WEEKE]'
    	weeke_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	weeke_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(weeke,weeke_c);}, false);
	
	webst=document.createElement("a");
	webst.href="javascript:;";
	webst.innerHTML = '[WEBST]'
    	webst.style.cssText = 'color: #000000;                    '+
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
	webst.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='WebstersHand'>";
	d.replaceChild(webst_c,webst);}, false);
	d.appendChild(webst);


	webst_c=document.createElement("a");
	webst_c.href="javascript:;";
	webst_c.innerHTML = '[/WEBST]'
    	webst_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	webst_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(webst,webst_c);}, false);
	
	
	yucat=document.createElement("a");
	yucat.href="javascript:;";
	yucat.innerHTML = '[YUCAT]'
    	yucat.style.cssText = 'color: #000000;                    '+
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
	yucat.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='Yucatan'>";
	d.replaceChild(yucat_c,yucat);}, false);
	d.appendChild(yucat);


	yucat_c=document.createElement("a");
	yucat_c.href="javascript:;";
	yucat_c.innerHTML = '[/YUCAT]'
    	yucat_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	yucat_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(yucat,yucat_c);}, false);
	
	
	yearb=document.createElement("a");
	yearb.href="javascript:;";
	yearb.innerHTML = '[YEARB]'
    	yearb.style.cssText = 'color: #000000;                    '+
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
	yearb.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='Yearbook Outline'>";
	d.replaceChild(yearb_c,yearb);}, false);
	d.appendChild(yearb);


	yearb_c=document.createElement("a");
	yearb_c.href="javascript:;";
	yearb_c.innerHTML = '[/YEARB]'
    	yearb_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	yearb_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(yearb,yearb_c);}, false);
	
	zipple=document.createElement("a");
	zipple.href="javascript:;";
	zipple.innerHTML = '[ZIPPLE]'
    	zipple.style.cssText = 'color: #000000;                    '+
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
	zipple.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='Zipple'>";
	d.replaceChild(zipple_c,zipple);}, false);
	d.appendChild(zipple);


	zipple_c=document.createElement("a");
	zipple_c.href="javascript:;";
	zipple_c.innerHTML = '[/ZIPPLE]'
    	zipple_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	zipple_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(zipple,zipple_c);}, false);
	
	
	zonker=document.createElement("a");
	zonker.href="javascript:;";
	zonker.innerHTML = '[ZONKER]'
    	zonker.style.cssText = 'color: #000000;                    '+
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
	zonker.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='ZonkersHand'>";
	d.replaceChild(zonker_c,zonker);}, false);
	d.appendChild(zonker);


	zonker_c=document.createElement("a");
	zonker_c.href="javascript:;";
	zonker_c.innerHTML = '[/ZONKER]'
    	zonker_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	zonker_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(zonker,zonker_c);}, false);
	
	
	wilds=document.createElement("a");
	wilds.href="javascript:;";
	wilds.innerHTML = '[WILDS]'
    	wilds.style.cssText = 'color: #000000;                    '+
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
	wilds.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='Wild Sewerage'>";
	d.replaceChild(wilds_c,wilds);}, false);
	d.appendChild(wilds);


	wilds_c=document.createElement("a");
	wilds_c.href="javascript:;";
	wilds_c.innerHTML = '[/WILDS]'
    	wilds_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	wilds_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(wilds,wilds_c);}, false);
	
	westm=document.createElement("a");
	westm.href="javascript:;";
	westm.innerHTML = '[WESTM]'
    	westm.style.cssText = 'color: #000000;                    '+
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
	westm.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='Westminster'>";
	d.replaceChild(westm_c,westm);}, false);
	d.appendChild(westm);


	westm_c=document.createElement("a");
	westm_c.href="javascript:;";
	westm_c.innerHTML = '[/WESTM]'
    	westm_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	westm_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(westm,westm_c);}, false);
	
	wendy=document.createElement("a");
	wendy.href="javascript:;";
	wendy.innerHTML = '[WENDY]'
    	wendy.style.cssText = 'color: #000000;                    '+
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
	wendy.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='WendysHand'>";
	d.replaceChild(wendy_c,wendy);}, false);
	d.appendChild(wendy);


	wendy_c=document.createElement("a");
	wendy_c.href="javascript:;";
	wendy_c.innerHTML = '[/WENDY]'
    	wendy_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	wendy_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(wendy,wendy_c);}, false);
	
	
	vtbull=document.createElement("a");
	vtbull.href="javascript:;";
	vtbull.innerHTML = '[VTBULL]'
    	vtbull.style.cssText = 'color: #000000;                    '+
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
	vtbull.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font style='font-size:78px; text-decoration:blink;' face='VTBulletin'>";
	d.replaceChild(vtbull_c,vtbull);}, false);
	d.appendChild(vtbull);


	vtbull_c=document.createElement("a");
	vtbull_c.href="javascript:;";
	vtbull_c.innerHTML = '[/VTBULL]'
    	vtbull_c.style.cssText = 'color: red;                       '+
                                'cursor: pointer;                  '+
                                'border: 2px inset #6E96D5;        '+
                                'border-right: 0px !important;     '+
                                'padding: 1px;                     '+
                                '-moz-border-radius-topleft:1;     '+
                                '-moz-border-radius-topright:1;    '+
                                '-moz-border-radius-bottomleft:1;  '+
                                '-moz-border-radius-bottomright:1; '
	vtbull_c.addEventListener("click", function(){e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"</font>";
	d.replaceChild(vtbull,vtbull_c);}, false);

}
dip();
}, false);

