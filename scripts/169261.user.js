// ==UserScript==
// @name           Hf Mentor Username Colors Edited By Komet For LF
// @namespace      Changes every Mentor's username color.
// @author         Connected
// @match          *://*.leakforums.org/*
// ==/UserScript==


var html = document.body.innerHTML;
html = html.replace( /-BoodyE-/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#666666"><b>-BoodyE-</b></font></span>' );
html = html.replace( /Komet/g, '<span style="text-shadow: 0px 0px 16px #E99931"><font color="#E99931"><b>Komet</b></font></span>' );
html = html.replace( /AsSaSs@iN/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>AsSaSs@iN</b></font></span>' );
html = html.replace( /bugga/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>bugga</b></font></span>' );
html = html.replace( /cobija/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>cobija</b></font></span>' );
html = html.replace( /Chris/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>Chris</b></font></span>' );
html = html.replace( /Crow/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>Crow</b></font></span>' );
html = html.replace( /Glassy/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>Glassy</b></font></span>' );
html = html.replace( /iNviZ/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>iNviZ</b></font></span>' );
html = html.replace( /Joey Tribbiani/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>Joey Tribbiani</b></font></span>' );
html = html.replace( /Kn1ght/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>Kn1ght</b></font></span>' );
html = html.replace( /Moralitas/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>Moralitas</b></font></span>' );
html = html.replace( /Mr Kewl/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>Mr Kewl</b></font></span>' );
html = html.replace( /N3w_2_H@Ck1n™/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>N3w_2_H@Ck1n™</b></font></span>' );
html = html.replace( /Positive/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>Positive</b></font></span>' );
html = html.replace( /Richie/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>Richie</b></font></span>' );
html = html.replace( /Robbieava/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>Robbieava</b></font></span>' );
html = html.replace( /Skill/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>Skill</b></font></span>' );
html = html.replace( /T3h Hack3r/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>T3h Hack3r</b></font></span>' );
html = html.replace( /The Rated R Superstar/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>The Rated R Superstar</b></font></span>' );
html = html.replace( /VipVince/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>VipVince</b></font></span>' );
html = html.replace( /xerotic/g, '<span style="text-shadow: 0px 0px 16px #FFFFFF"><font color="#E4FF99"><b>xerotic</b></font></span>' );
document.body.innerHTML = html;
