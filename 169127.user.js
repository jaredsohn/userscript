// ==UserScript==
// @name           LeakForums.org - Custom Reputation Display Colors
// @namespace      DeNial/repcolors
// @description    Allows user to specific what color positive, neutral, and negative reputation is displayed in.
// @author         DeNail
// @copyright      DeNial 2013 (http://userscripts.org/users/429026)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.leakforums.org/*
// @match          *://leakforums.org/*
// @version        1.0.0
// @downloadURL    https://userscripts.org/scripts/source/.user.js
// @updateURL      https://userscripts.org/scripts/source/.meta.js
//
// @icon           http://www.leakforums.org/images/pro_star2.png
// @icon64         http://www.leakforums.org/images/pro_star2.png
// @history        1.0.0 - Script created
// ==/UserScript==

(function(){var d,e,a,f,j,g,h,c,b;if("undefined"==typeof localStorage)throw Error("Your browser does not support HTML5 localStorage. Try upgrading.");if(null==localStorage.getItem("lf_repcolors_v_1")||"undefined"==localStorage.getItem("lf_repcolors_v_1"))h={positive:"#008000",negative:"#FF0000",neutral:"#808080",positiveBG:"#00CC66",negativeBG:"#AE0023",neutralBG:"#ccc"},localStorage.setItem("lf_repcolors_v_1",JSON.stringify(h));c=JSON.parse(localStorage.getItem("lf_repcolors_v_1"));if(-1!=document.location.toString().indexOf("usercp.php?action=options"))d=document.getElementsByName("threadmode")[0].parentNode.parentNode.parentNode,a=document.createElement("tr"),a.innerHTML='<td colspan="2"><span class="smalltext"><span style="color:'+c.positive+'">Positive</span> repuation color (Default: #008000)</span></td>',d.appendChild(a),a=null,a=document.createElement("tr"),a.innerHTML='<td colspan="2"><input type="text" id="pos_color" value="'+c.positive+'"></input></td>',d.appendChild(a),a=null,a=document.createElement("tr"),a.innerHTML='<td colspan="2"><span class="smalltext"><span style="color:'+c.positiveBG+'">Positive</span> background color (Default: #00CC66)</span></td>',d.appendChild(a),a=null,a=document.createElement("tr"),a.innerHTML='<td colspan="2"><input type="text" id="pos_color_bg" value="'+c.positiveBG+'"></input></td>',d.appendChild(a),a=null,a=document.createElement("tr"),a.innerHTML='<td colspan="2"><span class="smalltext"><span style="color:'+c.neutral+'">Neutral</span> repuation color (Default: #808080)</span></td>',d.appendChild(a),a=null,a=document.createElement("tr"),a.innerHTML='<td colspan="2"><input type="text" id="ntr_color" value="'+c.neutral+'"></input></td>',d.appendChild(a),a=null,a=document.createElement("tr"),a.innerHTML='<td colspan="2"><span class="smalltext"><span style="color:'+c.neutralBG+'">Neutral</span> background color (Default: #ccc)</span></td>',d.appendChild(a),a=null,a=document.createElement("tr"),a.innerHTML='<td colspan="2"><input type="text" id="ntr_color_bg" value="'+c.neutralBG+'"></input></td>',d.appendChild(a),a=null,a=document.createElement("tr"),a.innerHTML='<td colspan="2"><span class="smalltext"><span style="color:'+c.negative+'">Negative</span> repuation color (Default: #FF0000)</span></td>',d.appendChild(a),a=null,a=document.createElement("tr"),a.innerHTML='<td colspan="2"><input type="text" id="neg_color" value="'+c.negative+'"></input></td>',d.appendChild(a),a=null,a=document.createElement("tr"),a.innerHTML='<td colspan="2"><span class="smalltext"><span style="color:'+c.negativeBG+'">Negative</span> background color (Default: #AE0023)</span></td>',d.appendChild(a),a=null,a=document.createElement("tr"),a.innerHTML='<td colspan="2"><input type="text" id="neg_color_bg" value="'+c.negativeBG+'"></input></td>',d.appendChild(a),a=null,document.getElementsByName("regsubmit")[0].addEventListener("click",function(){e=document.getElementById("pos_color").value;positiveBGcolor=document.getElementById("pos_color_bg").value;f=document.getElementById("ntr_color").value;neutralBGcolor=document.getElementById("ntr_color_bg").value;g=document.getElementById("neg_color").value;negativeBGcolor=document.getElementById("neg_color_bg").value;-1==e.search(/#/)&&(e="#"+e);-1==positiveBGcolor.search(/#/)&&(positiveBGcolor="#"+positiveBGcolor);-1==f.search(/#/)&&(f="#"+f);-1==neutralBGcolor.search(/#/)&&(neutralBGcolor="#"+neutralBGcolor);-1==g.search(/#/)&&(g="#"+g);-1==negativeBGcolor.search(/#/)&&(negativeBGcolor="#"+negativeBGcolor);h={positive:e,negative:g,neutral:f,positiveBG:positiveBGcolor,negativeBG:negativeBGcolor,neutralBG:neutralBGcolor};localStorage.setItem("lf_repcolors_v_1",JSON.stringify(h));return 1});else{d=document.getElementsByClassName("reputation_positive");positivesBG=document.getElementsByClassName("trow_reputation_positive");a=document.getElementsByClassName("reputation_neutral");neutralsBG=document.getElementsByClassName("trow_reputation_neutral");j=document.getElementsByClassName("reputation_negative");negativesBG=document.getElementsByClassName("trow_reputation_negative");for(b=0;b<d.length;b++)d[b].style.color=c.positive;for(b=0;b<a.length;b++)a[b].style.color=c.neutral;for(b=0;b<j.length;b++)j[b].style.color=c.negative;for(b=0;b<positivesBG.length;b++)positivesBG[b].style.background=c.positiveBG;for(b=0;b<neutralsBG.length;b++)neutralsBG[b].style.background=c.neutralBG;for(b=0;b<negativesBG.length;b++)negativesBG[b].style.background=c.negativeBG}})();

/* Decompressed code
 * 

(function(){
var positives,positivecolor,positiveBG,neutrals,neutralcolor,neutralBG,negatives,negativecolor,negativeBG,workarea,newtr,colorarray,colors,i;

if (typeof(localStorage) == 'undefined' ) {
	throw new Error('Your browser does not support HTML5 localStorage. Try upgrading.');
}

if((localStorage.getItem('lf_repcolors_v_1')==null) || (localStorage.getItem('lf_repcolors_v_1')=="undefined")) {
	colorarray={positive:"#008000",negative:"#FF0000",neutral:"#808080",
                positiveBG:"#00CC66",negativeBG:"#AE0023",neutralBG:"#ccc"};
                
	localStorage.setItem("lf_repcolors_v_1",JSON.stringify(colorarray));
}

colors = JSON.parse(localStorage.getItem('lf_repcolors_v_1'));

if(document.location.toString().indexOf("usercp.php?action=options")!=-1) {
	workarea = document.getElementsByName("threadmode")[0].parentNode.parentNode.parentNode;
	newtr = document.createElement("tr");
    
    // Positive Rep Color
	newtr.innerHTML = '<td colspan="2"><span class="smalltext"><span style="color:' + colors.positive + '">Positive</span> repuation color (Default: #008000)</span></td>';
	workarea.appendChild(newtr);
	newtr = null;
	
	newtr = document.createElement("tr");
	newtr.innerHTML = '<td colspan="2"><input type="text" id="pos_color" value="' + colors.positive + '"></input></td>';
	workarea.appendChild(newtr);
	newtr = null;
    
    // Positive Rep Color BG
    newtr = document.createElement("tr");
	newtr.innerHTML = '<td colspan="2"><span class="smalltext"><span style="color:' + colors.positiveBG + '">Positive</span> background color (Default: #00CC66)</span></td>';
	workarea.appendChild(newtr);
	newtr = null;
    
    newtr = document.createElement("tr");
	newtr.innerHTML = '<td colspan="2"><input type="text" id="pos_color_bg" value="' + colors.positiveBG + '"></input></td>';
	workarea.appendChild(newtr);
	newtr = null;
	
    // Neutral Rep Color
	newtr = document.createElement("tr");
	newtr.innerHTML = '<td colspan="2"><span class="smalltext"><span style="color:' + colors.neutral + '">Neutral</span> repuation color (Default: #808080)</span></td>';
	workarea.appendChild(newtr);
	newtr = null;
	
	newtr = document.createElement("tr");
	newtr.innerHTML = '<td colspan="2"><input type="text" id="ntr_color" value="' + colors.neutral + '"></input></td>';
	workarea.appendChild(newtr);
	newtr = null;
    
    // Neutral Rep Color BG
    newtr = document.createElement("tr");
	newtr.innerHTML = '<td colspan="2"><span class="smalltext"><span style="color:' + colors.neutralBG + '">Neutral</span> background color (Default: #ccc)</span></td>';
	workarea.appendChild(newtr);
	newtr = null;
    
    newtr = document.createElement("tr");
	newtr.innerHTML = '<td colspan="2"><input type="text" id="ntr_color_bg" value="' + colors.neutralBG + '"></input></td>';
	workarea.appendChild(newtr);
	newtr = null;
	
    // Negative Rep Color
	newtr = document.createElement("tr");
	newtr.innerHTML = '<td colspan="2"><span class="smalltext"><span style="color:' + colors.negative + '">Negative</span> repuation color (Default: #FF0000)</span></td>';
	workarea.appendChild(newtr);
	newtr = null;
	
	newtr = document.createElement("tr");
	newtr.innerHTML = '<td colspan="2"><input type="text" id="neg_color" value="' + colors.negative + '"></input></td>';
	workarea.appendChild(newtr);
	newtr = null;
    
    // Negative Rep Color BG
    // Neutral Rep Color BG
    newtr = document.createElement("tr");
	newtr.innerHTML = '<td colspan="2"><span class="smalltext"><span style="color:' + colors.negativeBG + '">Negative</span> background color (Default: #AE0023)</span></td>';
	workarea.appendChild(newtr);
	newtr = null;
    
    newtr = document.createElement("tr");
	newtr.innerHTML = '<td colspan="2"><input type="text" id="neg_color_bg" value="' + colors.negativeBG + '"></input></td>';
	workarea.appendChild(newtr);
	newtr = null;
	
	document.getElementsByName("regsubmit")[0].addEventListener("click",function() {
		positivecolor = document.getElementById("pos_color").value;
        positiveBGcolor = document.getElementById("pos_color_bg").value;
		neutralcolor = document.getElementById("ntr_color").value;
        neutralBGcolor = document.getElementById("ntr_color_bg").value;
		negativecolor = document.getElementById("neg_color").value;
        negativeBGcolor = document.getElementById("neg_color_bg").value;
		
		if(positivecolor.search(/#/)==-1) {
			positivecolor = "#" + positivecolor;
		}
        if(positiveBGcolor.search(/#/)==-1) {
			positiveBGcolor = "#" + positiveBGcolor;
		}
		if(neutralcolor.search(/#/)==-1) {
			neutralcolor = "#" + neutralcolor;
		}
        if(neutralBGcolor.search(/#/)==-1) {
			neutralBGcolor = "#" + neutralBGcolor;
		}
		if(negativecolor.search(/#/)==-1) {
			negativecolor = "#" + negativecolor;
		}
		if(negativeBGcolor.search(/#/)==-1) {
			negativeBGcolor = "#" + negativeBGcolor;
		}
		
		colorarray={positive:positivecolor, negative:negativecolor, neutral:neutralcolor,
                    positiveBG:positiveBGcolor, negativeBG:negativeBGcolor, neutralBG:neutralBGcolor};
		localStorage.setItem("lf_repcolors_v_1",JSON.stringify(colorarray));
		return 1;
	});
} else {
	positives = document.getElementsByClassName("reputation_positive");
    positivesBG = document.getElementsByClassName("trow_reputation_positive");
	neutrals = document.getElementsByClassName("reputation_neutral");
    neutralsBG = document.getElementsByClassName("trow_reputation_neutral");
	negatives = document.getElementsByClassName("reputation_negative");
    negativesBG = document.getElementsByClassName("trow_reputation_negative");
	
	for(i=0;i<positives.length;i++) {
		positives[i].style.color = colors.positive;
	}
	for(i=0;i<neutrals.length;i++) {
		neutrals[i].style.color = colors.neutral;
	}
	for(i=0;i<negatives.length;i++) {
		negatives[i].style.color = colors.negative;
	}
    for(i=0;i<positivesBG.length;i++) {
		positivesBG[i].style.background = colors.positiveBG;
	}
	for(i=0;i<neutralsBG.length;i++) {
		neutralsBG[i].style.background = colors.neutralBG;
	}
	for(i=0;i<negativesBG.length;i++) {
		negativesBG[i].style.background = colors.negativeBG;
	}
}
}());
*/