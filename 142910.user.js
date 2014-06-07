// ==UserScript==
   // @name Color
  @jscolor, JavaScript Color Picker
 
  @version 1.4.0
  @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
  @author  Jan Odvarko, http://odvarko.cz
  @created 2008-06-15
  @updated 2012-07-06
  @link    http://jscolor.com
// ==/UserScript==

/* Menucool Custom Color Picker v2012.8.30. http://www.menucool.com/color-picker */

var MC=MC||{};MC.cC=function(a,b,c){typeof OnCustomColorChanged!=="undefined"&&OnCustomColorChanged(a,b,c)};MC.CustomColorPicker=function(){var a=function(a,b,c){if(a.addEventListener)a.addEventListener(b,c,0);else if(a.attachEvent)a.attachEvent("on"+b,c);else a["on"+b]=c},d=function(a){a.cancelBubble=true;a.stopPropagation&&a.stopPropagation();a.preventDefault&&a.preventDefault();if(window.event)a.returnValue=0;if(a.cancel)a.cancel=1},c=function(a){if(!a)return 0;var b=/(^| )colorpicker( |$)/;return b.test(a)},b=function(a,b){this.i=b;this.a=this.b=this.c=this.d=this.f=null;this.r=a;this.g()};b.prototype={g:function(){if(this.r){this.r.style.display="inline-block";for(var b=this.r.getElementsByTagName("span"),a=0;a<b.length;a++)if(b[a].className=="hexbox")this.a=b[a];else if(b[a].className=="bgbox")this.b=b[a];else if(b[a].className=="colorbox")this.c=b[a];this.d=this.c.getElementsByTagName("b");for(var c=this,a=0;a<this.d.length;a++){if(this.d[a].className=="selected"){this.f=this.d[a];this.h(this.d[a])}this.d[a].onmouseout=function(){c.h(c.f)}}this.j();this.r.setAttribute("href","#")}},h:function(a){if(this.a)this.a.innerHTML=a.title?a.title:a.style.backgroundColor;if(this.b)this.b.style.backgroundColor=a.style.backgroundColor},j:function(){var b=this;a(this.c,"mouseover",function(a){b.k(a,b)});a(this.c,"click",function(a){b.k(a,b,1)})},k:function(c,b,f){if(c.target)var a=c.target;else a=c.srcElement;if(a.nodeName=="B"){b.b.style.backgroundColor=a.style.backgroundColor;b.a.innerHTML=a.title?a.title:a.style.backgroundColor;if(f){b.f=a;a.className="selected";for(var e=0;e<this.d.length;e++)if(this.d[e]!=a)this.d[e].className="";MC.cC(a.style.backgroundColor,a.title?a.title:a.style.backgroundColor,b.i)}}d(c)}};var e=function(){for(var d=document.getElementsByTagName("span"),e=[],a=0;a<d.length;a++)if(c(d[a].className)){var f=e.length;e[f]=new b(d[a],f)}};a(window,"load",e)}()