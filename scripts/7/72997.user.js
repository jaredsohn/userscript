// ==UserScript==
// @name           Geogebra to Asymptote converter
// @namespace      azjps
// @description    Converts psTricks (geogebra) to Asymptote
// ==/UserScript==


// DEPRECATED - USE Geogebra 4.0 instead:
//  http://www.geogebra.org/webstart/4.0/
// Go to File > Export > Graphics View as Asymptote ...
// documentation: http://www.artofproblemsolving.com/Wiki/index.php/User:Azjps/geogebra

var asy_advanced_FLAG = false; // global variable, tracks whether or not to compactify code

//--------------------------------------------------
// Perform basic conversion
//--------------------------------------------------
function asy_basic(geogebra){
 var reg_pg = /\\pspolygon.*\(.*\).*\n/g, 
     reg_pp = /\\rput\{.*\}\(.*,.*\)\{\\parametricplot.*?\{.*\}\{.*\}\{.*\|.*\}\}\n/g,
     reg_pc = /\\pscustom.*\{\\parametricplot\{.*\}\{.*\}\{.*\|.*\}.*\}\n/g,
     reg_ps = /\\psplot.*?\{.*\}\{.*\}\{.*\}\n/g,
     reg_rps = /\\rput\{.*\}\(.*,.*\)\{\\psplot.*?\{.*\}\{.*\}\{.*\}\}\n/g;
      
 if(geogebra.search(reg_pg) != -1) { /* pspolygon, with variable number of points */
  var pg = geogebra.match(reg_pg), pg_else = geogebra.split(reg_pg), temp = "";
  for(var i = 0; i < pg.length; i++){
   temp += pg_else[i] + pg[i].replace(/\)\(/g, ")--(");
  }
  geogebra = (temp + pg_else[pg.length])
   .replace(/\\pspolygon(\[.*\])?\((.*)\)\n/g, "draw(($2)--cycle$1);\n");
 }
 
 if(geogebra.search(reg_pp) != -1) { /* parametric plot */
  var pp = geogebra.match(reg_pp), pp_else = geogebra.split(reg_pp), temp = "";
  for(var i = 0; i < pp.length; i++){
   temp += pp_else[i] + pp[i].replace(/\\rput\{(.*)\}\((.*),(.*)\)\{\\parametricplot(\[.*\])?\{(.*)\}\{(.*)\}\{(.*)\|(.*)\}\}\n/g,
    "pair parametricplot"+i+"(real t){\n return rotate($1)*($7,$8) + ($2,$3);\n}\n"
    + "draw(graph(parametricplot"+i+",$5,$6)$4);\n");
  } 
  geogebra = temp + pp_else[pp.length];
 } 

 if(geogebra.search(reg_pc) != -1) { /* pscustom parametric plot */
  var pp = geogebra.match(reg_pc), pp_else = geogebra.split(reg_pc), temp = "";
  for(var i = 0; i < pp.length; i++){
   temp += pp_else[i] + pp[i].replace(
    /\\pscustom(\[.*\])?\{\\parametricplot\{(.*)\}\{(.*)\}\{(.*)\|(.*)\}\\lineto\((.*)\)\\closepath\}\n/g,
    "pair parametricplot"+i+"_cus(real t){\n return ($4,$5);\n}\n"
    + "draw(graph(parametricplot"+i+"_cus,$2,$3)--($6)--cycle$1);\n");
  } 
  geogebra = temp + pp_else[pp.length];
 } 
 
 if(geogebra.search(reg_rps) != -1) { /* rotated psplot */
  var ps = geogebra.match(reg_rps), ps_else = geogebra.split(reg_rps), temp = "";
  for(var i = 0; i < ps.length; i++){
   temp += ps_else[i] + ps[i].replace(/\\rput\{(.*)\}\((.*),(.*)\)\{\\psplot(\[.*\])?\{(.*)\}\{(.*)\}\{(.*)\}\}\n/g,
    "pair psplot"+i+"_rot(real x){\n return rotate($1)*(x,$7) + ($2,$3);\n}\n"
    + "draw(graph(psplot"+i+"_rot,$5,$6)$4);\n");
  } 
  geogebra = temp + ps_else[ps.length];
 } 
 
 geogebra = geogebra.replace(/\\psplot(\[.*\])?\{(.*)\}\{(.*)\}\{(.*)\*x(.*)\}/g,     // psplot, line segment case 
           "draw(($2,$4*$2$5)--($3,$4*$3$5)$1);");                          
 if(geogebra.search(reg_ps) != -1) { /* psplot, otherwise */
  var ps = geogebra.match(reg_ps), ps_else = geogebra.split(reg_ps), temp = "";
  for(var i = 0; i < ps.length; i++){
   temp += ps_else[i] + ps[i].replace(/\\psplot(\[.*\])?\{(.*)\}\{(.*)\}\{(.*)\}\n/g,
    "pair psplot"+i+"(real x){\n return (x,$4);\n}\n"
    + "draw(graph(psplot"+i+",$2,$3));\n");
  } 
  geogebra = temp + ps_else[ps.length];
 } 
          
 return geogebra
     // documentclass heading                                             
  .replace(/\\documentclass.*\n/,
           "  /* geogebra conversion, see azjps userscripts.org/scripts/show/72997 */"
           + "\nimport graph; size(300);"
           + "\nreal labelscalefactor = 0.5; /* changes label-to-point distance */"
           + "\npen dp = linewidth(0.7) + fontsize(10); defaultpen(dp); /* default pen */"    
           + "\npen dotstyle = black; /* changes dot styles */\n")
           
     // clip diagram
  .replace(/\n\\begin\{pspicture\*\}\((.*),(.*)\)\((.*),(.*)\)([^\Z]*)\n\\end\{pspicture\*\}/, 
           "$5\nclip(($1,$2)--($1,$4)--($3,$4)--($3,$2)--cycle);")
 
      /* labeling. labelscalefactor is defaulted as 0.5.  */
     // todo: Asymptote and Geogebra labeling styles different, integrate somehow
     // todo: better implementation of removing colors
  .replace(/\\rput\[bl\]\((.*),(.*)\)\{\\.*?\{(.*)\}\}\n/g, "label(\"$3\", ($1,$2),NE*labelscalefactor);\n")    // rput[bl]
//.replace(/\\rput\[bl\]\((.*),(.*)\)\{\\.*\{(.*?)\}\}\n/g, "label(\"$3\",($1,$2),NE);\n") 
  .replace(/\\rput\[bl\]\((.*),(.*)\)\{(.*)\}\n/g, "label(\"$3\", ($1,$2), NE*labelscalefactor);\n")
  .replace(/\\rput\[tl\]\((.*),(.*)\)\{\\.*?\{(.*)\}\}\n/g, "label(\"$3\", ($1,$2),SE*labelscalefactor);\n")    // rput[tl]
//.replace(/\\rput\[tl\]\((.*),(.*)\)\{\\.*\{(.*?)\}\}\n/g, "label(\"$3\",($1,$2),SE);\n") 
  .replace(/\\rput\[tl\]\((.*),(.*)\)\{(.*)\}\n/g, "label(\"$3\", ($1,$2), SE*labelscalefactor);\n")
  .replace(/\\rput\[Bl\]\((.*),(.*)\)\{\\.*?\{(.*)\}\}\n/g, "label(\"$3\", ($1,$2), E*labelscalefactor);\n")    // rput[Bl] 
//.replace(/\\rput\[Bl\]\((.*),(.*)\)\{\\.*\{(.*?)\}\}\n/g, "label(\"$3\",($1,$2),SE);\n") 
  .replace(/\\rput\[Bl\]\((.*),(.*)\)\{(.*)\}\n/g, "label(\"$3\", ($1,$2), SE*labelscalefactor);\n")
  .replace(/\\rput\[br\]\((.*),(.*)\)\{\\.*?\{(.*)\}\}\n/g, "label(\"$3\", ($1,$2),NW*labelscalefactor);\n")    // rput[br]
//.replace(/\\rput\[br\]\((.*),(.*)\)\{\\.*\{(.*?)\}\}\n/g, "label(\"$3\",($1,$2),NW);\n") 
  .replace(/\\rput\[br\]\((.*),(.*)\)\{(.*)\}\n/g, "label(\"$3\", ($1,$2), NW*labelscalefactor);\n")
  .replace(/\\rput\[tr\]\((.*),(.*)\)\{\\.*?\{(.*)\}\}\n/g, "label(\"$3\", ($1,$2),SW*labelscalefactor);\n")    // rput[tr]
//.replace(/\\rput\[tr\]\((.*),(.*)\)\{\\.*\{(.*?)\}\}\n/g, "label(\"$3\",($1,$2),SW);\n") 
  .replace(/\\rput\[tr\]\((.*),(.*)\)\{(.*)\}\n/g, "label(\"$3\", ($1,$2), SW*labelscalefactor);\n") 
  .replace(/\\rput\[Br\]\((.*),(.*)\)\{\\.*?\{(.*)\}\}\n/g, "label(\"$3\", ($1,$2), W*labelscalefactor);\n")    // rput[Br] 
//.replace(/\\rput\[Br\]\((.*),(.*)\)\{\\.*\{(.*?)\}\}\n/g, "label(\"$3\",($1,$2),SW);\n") 
  .replace(/\\rput\[Br\]\((.*),(.*)\)\{(.*)\}\n/g, "label(\"$3\", ($1,$2), SW*labelscalefactor);\n") 

     /* figures */
     
     // todo: define variable names for dots, for ease of manual editing of asymptote code
  .replace(/\\psdots(\[.*\])?\((.*),(.*)\)/g, "dot(($2,$3),dotstyle);")                   // psdots 
  .replace(/\\pscircle(\[.*\])?\((.*)\,(.*)\)\{(.*)\}/g, "draw(circle(($2,$3),$4)$1);")   // pscircle 
  .replace(/\\psarc(\[.*\])?\((.*),(.*)\)\{(.*)\}\{(.*)\}\{(.*)\}/g, "draw(arc(($2,$3),$4,$5,$6)$1);")
  .replace(/\\rput\{(.*)\}\((.*),(.*)\)\{\\psellipse(\[.*\])?\(0,0\)\((.*),(.*)\)\}/g,    // rotated psellipse 
           "draw(shift(($2,$3))*rotate($1)*xscale($5)*yscale($6)*unitcircle$4);")
  .replace(/\\psellipse(\[.*\])?\((.*)\,(.*)\)\((.*),(.*)\)/g,                            // psellipse 
           "draw(shift(($2,$3))*xscale($4)*yscale($5)*unitcircle$1);") 
    
     /* psline  */       
  .replace(/\\psline(\[.*\])?\((.*),(.*)\)\((.*),(.*)\)/g, 
           "draw(($2,$3)--($4,$5)$1);")     
  .replace(/\\psline(\[.*\])?\{->\}(\[.*\])?\((.*),(.*)\)\((.*),(.*)\)/g, 
           "draw(($3,$4)--($5,$6)$1,EndArrow(8));")
           
     /* headers/miscellaneous */      
     
     // double negatives
  .replace(/--(\d)/g, "+$1")
     // exponential notation to powers of 10
  .replace(/(\d)E-(\d)/g, "$1/10^$2")
     // render degrees in LaTeX notation
  .replace(/°/g,"^\\circ")
  .replace(/\\textrm\{\\degre\}/g,"^\\circ")   
  .replace(/label\(\"([^\$])(.*?)\^\\circ(.*?)\"/g,"label(\"$$$1$2^\\circ$3$$\"")
  
     // create pens   
  .replace(/\\newrgbcolor\{([a-z]{6})\}\{(.*?) (.*?) (.*?)\}/g, "pen $1 = rgb($2,$3,$4);")
  
     // fill pens. Removed due to transparency problems.
//.replace(/draw(.*?)\[(.*?)fillcolor=([^,\]]*)/g, "filldraw$1,$3FILLFLAG[$2,=,") 
//.replace(/filldraw(.*?)FILLFLAG\[(.*?)opacity=([^,\]]*)/g, "filldraw$1+opacity($3)FILLFLAG[$2,=,")
//.replace(/filldraw(.*?)FILLFLAG\[(.*?)transpalpha=([^,\]]*)/g, "filldraw$1+opacity($3)FILLFLAG[$2,=,")  
//.replace(/\[(.*?)linecolor=([^,\]]*)/g, ",$2[$1,=,$3")

     // line pens. PENFLAG is a temporary marker flag to be deleted later
  .replace(/\[(.*?)linecolor=([^,\]]*)/g, ",$2PENFLAG[$1,=,")
  .replace(/PENFLAG\[(.*?)linewidth=([^,\]]*)/g, "+linewidth($2)PENFLAG[$1,=,")
  .replace(/\[(.*?)linewidth=([^,\]]*)/g,        ",linewidth($2)PENFLAG[$1,=,")
  .replace(/PENFLAG\[(.*?)dash=([^,\]]*)pt ([^,\]]*)pt ([^,\]]*)pt ([^,\]]*)pt/g, 
           "+linetype(\"$2 $3 $4 $5\")PENFLAG[$1,=,")
  .replace(/PENFLAG\[(.*?)dash=([^,\]]*)/g, "+linetype(\"$2\")PENFLAG[$1,=,")
  .replace(/\[(.*?)dash=([^,\]]*)/g,        ",linetype(\"$2\")PENFLAG[$1,=,")
  .replace(/PENFLAG\[(.*?)linestyle=dotted/g, "+dottedPENFLAG[$1,=,")
  .replace(/\[(.*?)linestyle=dotted/g,        ",dottedPENFLAG[$1,=,")
  
     // unrecognized pens
  .replace(/label\(\"(.*?)\\(red|orange|yellow|green|blue|purple|white|black|gray|pink|magenta|cyan)(.*?)\"(.*?)\);/g, 
           "label(\"$1$3\"$4,dp+$2);")
  .replace(/label\(\"(.*?)\\([cdfqtuwxz]{6})([^a-zA-Z])(.*?)\"(.*?)\);/g, 
           "label(\"$1$3$4\"$5,dp+$2);")         
  .replace(/([^a-zA-Z])cyan([^a-zA-Z])/g, "$1rgb(0,1,1)$2")
  .replace(/([^a-zA-Z])magenta([^a-zA-Z])/g, "$1rgb(1,0,1)$2")
  .replace(/label\(\"(.*?)\\(mathbf)/g, "label(\"$1")
     
    // 1pt 1pt not visible
  .replace(/1pt 1pt/g, "2pt 2pt")
  
     // clear marker flags
  .replace(/FILLFLAG/g, "")
  .replace(/PENFLAG/g, "")
     // clear any remaining unused style attributes
  .replace(/\[.*?=.*?\](.*?\n)/g, "$1")       
             
     // axes
  // .replace(/\\psset\{xunit=(.*?)cm,yunit=(.*?)cm.*\n/, "unitsize((($1+$2)/2)cm);\n")
  
     // cleanup: delete any un-parsed lines 
  .replace(/\n\\.*/g, "")             
  .replace(/\n(  )( )*\\.*/g,""); 
}


//--------------------------------------------------
// Perform advanced, customizable conversion.
// As it is now, filler function. 
//--------------------------------------------------
function asy_advanced(geogebra){
 asy_advanced_FLAG = true;
 return asy_basic(geogebra     // pre-formatting
           
      /* post-formatting: add documentation comments */     
 ).replace(/\ndraw\(/, "\n\n  /* segments and figures */\ndraw(")  
  .replace(/\n(dot|label)/, "\n\n  /* points and labels */\n$1");
}

//--------------------------------------------------
// Make Asymptote code more concise.
//--------------------------------------------------
function asy_postcompact(geogebra){
 return geogebra
  .replace(/\/\*(.*?)\*\//g, "")
  .replace(/;( *)?\n([a-z])/g, "; $2")
  .replace(/labelscalefactor/g, "lsf")
  .replace(/dotstyle/g, "ds")
  .replace(/\n( *)?(\n( *)?)*/g, "\n");
}

//--------------------------------------------------
// Make Asymptote code more concise using cse5.
//--------------------------------------------------
function asy_postcompactcse5(geogebra){
 return geogebra
  .replace(/\/\*(.*?)\*\//g, "")
  .replace(/;( *)?\n([a-z])/g, "; $2")
  .replace(/labelscalefactor/g, "lsf")
  .replace(/dotstyle/g, "ds")
  .replace(/\n( )*?\n( )*?(\n( )*?)*/g, "\n");
}

function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}


//--------------------------------------------------
// Shortcut keys to perform conversion.
//--------------------------------------------------
(function(){
  var textareas = document.getElementsByTagName('textarea');
  document.addEventListener("click", function(e) {asy_advanced_FLAG = false;}, true);
  for(var i = 0; i < textareas.length; i++) {
   textareas[i].addEventListener("keypress", function(e) {
   
// Uses Alt+G and Ctrl+Alt+J as arbitrarily defined shortcut keys. 
//  Todo: Popup textarea with options. 
   
    if(typeof(this.selectionStart) != "undefined" && ((e.altKey && e.which == 103) ||
                                       (e.altKey && e.ctrlKey && e.which == 106))) {
     this.value = this.value.substr(0,this.selectionStart) 
       + ((asy_advanced_FLAG)
          ?(asy_postcompact(this.value.substr(this.selectionStart, this.selectionEnd-this.selectionStart))) 
          :(asy_advanced   (this.value.substr(this.selectionStart, this.selectionEnd-this.selectionStart)))) 
       + this.value.substr(this.selectionEnd);
    }
   }, true);
  }
  
  if(document.getElementsByName("addbbcode19")[0] && 
     document.getElementsByName("addbbcode19")[0].value == "Geogebra") {

   var b_asy = document.createElement("input"), 
       b_ggb = document.getElementsByName("addbbcode19")[0],
       b_ggb_p = b_ggb.parentNode;
   b_asy.setAttribute("value", "Convert GGB to ASY");    
   b_asy.setAttribute("type", "button"); 
   b_asy.setAttribute("class", "button2");  
   b_asy.setAttribute("onmouseover", 
    "document.getElementsByName('helpbox')[0].value = "
    + "'See script page at http://userscripts.org/scripts/show/72997'"); 
   b_asy.setAttribute("onmouseout", 
    "document.getElementsByName('helpbox')[0].value = "
    + "'Tip: Styles can be applied quickly to selected text.'"); 
   
   b_asy.addEventListener("click", function(e) {
    var txtbox = document.getElementsByName('message')[0];   
    
    // alert(txtbox.selectionStart + " " + txtbox.selectionEnd);
    if(typeof(txtbox.selectionStart) != "undefined" && txtbox.selectionStart != txtbox.selectionEnd)
     txtbox.value = txtbox.value.substr(0,txtbox.selectionStart)
       + asy_postcompact(asy_advanced(txtbox.value.substr(txtbox.selectionStart, txtbox.selectionEnd-txtbox.selectionStart))) 
       + txtbox.value.substr(txtbox.selectionEnd);
    else 
     txtbox.value = asy_postcompact(asy_advanced(txtbox.value));
   }, true); 
   
   insertAfter(b_ggb_p, b_asy, b_ggb);
  }
  
  else if(location.href.search("http://www.artofproblemsolving.com/Wiki/") != -1) {
   //addButton('/Wiki/skins/common/images/button_geogebra.png', 'Convert GeoGebra to Asymptote', '', '', '', 'mw_editbutton-ggbasyconvert'); 
  }
})();