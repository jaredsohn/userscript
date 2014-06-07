// ==UserScript==
// @name          profile by Seed Aid aux64
// @namespace     http://pirat.ca/profile
// @description   profile
// @include       http://pirat.ca/profile.php*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @version        1.0
// ==/UserScript==	

//jqmodal начало
(function($) {
$.fn.jqm=function(o){
var p={
overlay: 50,
overlayClass: 'jqmOverlay',
closeClass: 'jqmClose',
trigger: '.jqModal',
ajax: F,
ajaxText: '',
target: F,
modal: F,
toTop: F,
onShow: F,
onHide: F,
onLoad: F
};
return this.each(function(){if(this._jqm)return H[this._jqm].c=$.extend({},H[this._jqm].c,o);s++;this._jqm=s;
H[s]={c:$.extend(p,$.jqm.params,o),a:F,w:$(this).addClass('jqmID'+s),s:s};
if(p.trigger)$(this).jqmAddTrigger(p.trigger);
});};

$.fn.jqmAddClose=function(e){return hs(this,e,'jqmHide');};
$.fn.jqmAddTrigger=function(e){return hs(this,e,'jqmShow');};
$.fn.jqmShow=function(t){return this.each(function(){t=t||window.event;$.jqm.open(this._jqm,t);});};
$.fn.jqmHide=function(t){return this.each(function(){t=t||window.event;$.jqm.close(this._jqm,t)});};

$.jqm = {
hash:{},
open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(parseInt(h.w.css('z-index'))),z=(z>0)?z:3000,o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});if(h.a)return F;h.t=t;h.a=true;h.w.css('z-index',z);
 if(c.modal) {if(!A[0])L('bind');A.push(s);}
 else if(c.overlay > 0)h.w.jqmAddClose(o);
 else o=F;

 h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):F;
 if(ie6){$('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in {Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'");}}

 if(c.ajax) {var r=c.target||h.w,u=c.ajax,r=(typeof r == 'string')?$(r,h.w):$(r),u=(u.substr(0,1) == '@')?$(t).attr(u.substring(1)):u;
  r.html(c.ajaxText).load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h);});}
 else if(cc)h.w.jqmAddClose($(cc,h.w));

 if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);	
 (c.onShow)?c.onShow(h):h.w.show();e(h);return F;
},
close:function(s){var h=H[s];if(!h.a)return F;h.a=F;
 if(A[0]){A.pop();if(!A[0])L('unbind');}
 if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();
 if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove();} return F;
},
params:{}};
var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version == "6.0"),F=false,
i=$('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),
e=function(h){if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!$('iframe.jqm',h.w)[0])h.w.prepend(i); f(h);},
f=function(h){try{$(':input:visible',h.w)[0].focus();}catch(_){}},
L=function(t){$()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m);},
m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return !r;},
hs=function(w,t,c){return w.each(function(){var s=this._jqm;$(t).each(function() {
 if(!this[c]){this[c]=[];$(this).click(function(){for(var i in {jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return F;});}this[c].push(s);});});};
})(jQuery);
//jqmodal конец
//CSS
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('h1 {color: red ; font-size: 10px;}');
addGlobalStyle('.seeaid {color: #666; cursor:pointer;}');
addGlobalStyle('.seeaid:hover {color: #666; cursor:pointer; text-decoration: underline;}');
addGlobalStyle('td.row4 p img {margin-bottom:-5px;}');
addGlobalStyle('.jqmWindow { display: none; position: fixed; top: 7%; left: 50%; margin-left: -500px;  width: 1000px; background-color: #EEE; color: #333; border: 1px solid black; padding: 12px; }');
addGlobalStyle('.jqmOverlay { background-color: #000; }');
addGlobalStyle('* iframe.jqm {position:absolute;top:0;left:0;z-index:-1; width: expression(this.parentNode.offsetWidth+"px"); height: expression(this.parentNode.offsetHeight+"px");}}');
addGlobalStyle('* html .jqmWindow { position: absolute; top: expression((document.documentElement.scrollTop || document.body.scrollTop) + Math.round(17 * (document.documentElement.offsetHeight || document.body.clientHeight) / 100) + "px");}');

//блок для jqmodal
var logo = document.createElement("div");
logo.innerHTML = '<div class="jqmWindow" id="ex2"><div style="margin:0 auto; width:900px; heidght:300px; text-align:center;">Загрузка... Подождите <br> <img alt="Загрузка..." src="/forum/templates/default/images/ajaxload.gif"></div></div>';
	
document.body.insertBefore(logo, document.body.firstChild);
$('document').ready(needHelp);
                           

function needHelp() {

$.each($('tr.row1 td.pad_4 a.med'), f2);//добавление кнопок    
$(".seeaid").click(showseed);// показать модальное окно
};

function showseed() {
$('div#ex2.jqmWindow').html('<div style="margin:0 auto; width:900px; heidght:300px; text-align:center;">Загрузка... Подождите <br> <img alt="Загрузка..." src="http://pirat.ca/images/smiles/dt.gif"></div>');
$('div#ex2.jqmWindow').jqm();
$('div#ex2.jqmWindow').load($(this).attr("href")+' div#full_details.bCenter');
$('div#ex2.jqmWindow').jqmShow();
}
	
 



function f2() 
{

	var seltor = $(this);
	var seltor2, stringlink;
	//seltor2 = seltor.children('div.torTopic a.torTopic');
	var linkaid = seltor.attr("href")+"&spmode=full#seeders";

		seltor.after("<span class='seeaid' href='"+linkaid+"'><img src='http://slaffko.name/images/stories/posts/css/iconize-05/icons/icon_pic.gif'></span>");

};