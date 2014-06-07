// ==UserScript==
// @version 1.0
// @name Stylish HTML Font Generator (Fontex)
// @author Kiran - only God can judge Him
// @namespace http://www.orkut.com/Profile.aspx?uid=13589293559681889131
// @description This will be a little tough to use,Go to Your or Your Friends Scrapbook,Place the cursor in the scrapbox,Enter any small character eg "." then click on the desired font button then write Your text and then click on the same button after finishing,then submit.
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
	brush.innerHTML = '[Bauhaus]'
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font size=20 face='Bauhaus 93'>";
	d.replaceChild(brush_b,brush);}, false);
	d.appendChild(brush);


	brush_b=document.createElement("a");
	brush_b.href="javascript:;";
	brush_b.innerHTML = '[/Bauhaus]'
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
	comic.innerHTML = '[Bradley]'
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font size=20 face='Bradley Hand ITC'>";
	d.replaceChild(comic_c,comic);}, false);
	d.appendChild(comic);


	comic_c=document.createElement("a");
	comic_c.href="javascript:;";
	comic_c.innerHTML = '[/Bradley]'
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
	brita.innerHTML = '[Brush]'
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font size=20 face='Brush Script MT'>";
	d.replaceChild(brita_b,brita);}, false);
	d.appendChild(brita);


	brita_b=document.createElement("a");
	brita_b.href="javascript:;";
	brita_b.innerHTML = '[/Brush]'
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
	alger.innerHTML = '[Chiller]'
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font size=20 face='Chiller'>";
	d.replaceChild(alger_a,alger);}, false);
	d.appendChild(alger);


	alger_a=document.createElement("a");
	alger_a.href="javascript:;";
	alger_a.innerHTML = '[/Chiller]'
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
	impact.innerHTML = '[Forte]'
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font size=20 face='Forte'>";
	d.replaceChild(impact_i,impact);}, false);
	d.appendChild(impact);


	impact_i=document.createElement("a");
	impact_i.href="javascript:;";
	impact_i.innerHTML = '[/Forte]'
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
	lucida.innerHTML = '[Freestyle]'
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font size=20 face='Freestyle Script'>";
	d.replaceChild(lucida_l,lucida);}, false);
	d.appendChild(lucida);


	lucida_l=document.createElement("a");
	lucida_l.href="javascript:;";
	lucida_l.innerHTML = '[/Freestyle]'
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
	arial.innerHTML = '[French]'
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font size=20 face='French Script MT'>";
	d.replaceChild(arial_a,arial);}, false);
	d.appendChild(arial);


	arial_a=document.createElement("a");
	arial_a.href="javascript:;";
	arial_a.innerHTML = '[/French]'
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
	matura.innerHTML = '[Lucida]'
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font size=20 face='Lucida handwriting'>";
	d.replaceChild(matura_m,matura);}, false);
	d.appendChild(matura);


	matura_m=document.createElement("a");
	matura_m.href="javascript:;";
	matura_m.innerHTML = '[/Lucida]'
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
	widel.innerHTML = '[Magneto]'
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font size=20 face='Magneto'>";
	d.replaceChild(widel_w,widel);}, false);
	d.appendChild(widel);


	widel_w=document.createElement("a");
	widel_w.href="javascript:;";
	widel_w.innerHTML = '[/Magneto]'
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
	playb.innerHTML = '[Old English]'
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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"<font size=20 face='Old English text MT'>";
	d.replaceChild(playb_p,playb);}, false);
	d.appendChild(playb);


	playb_p=document.createElement("a");
	playb_p.href="javascript:;";
	playb_p.innerHTML = '[/Old English]'
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

	ad=document.createElement("a");
	ad.href="http://www.orkut.com/Profile.aspx?uid=13589293559681889131";
	ad.innerHTML=" ~~ Contact Me ~~ ";
	ad.target="_blank";
	d.appendChild(ad);

}
dip();
}, false);

