/*
---------------------------
Author: hitman_
Website:______
Version: 0.2.2 
Works in: Bigpoint and Garena
---------------------------
*/
// ==UserScript==
// @name           Dark Orbit Pois Igrokov po GG ENG 4
// @namespace	   http://userscripts.org/users/hitman_/
// @description    Poisk igrokov po kolichestvy GG ENG 4
// @include        http://darkorbit.game.garena.com/indexInternal.es?action=internalStart
// @include        http://*.darkorbit.bigpoint.com/indexInternal.es?action=internalStart
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var $ar_version = "0.2.2";
var $ar_script_url = "http://userscripts.org/scripts/show/86625";
var $jq = jQuery.noConflict();

jQuery(function($){$.fn.ar_do_quicksearch=function(target,opt){var timeout,cache,rowcache,jq_results,val='',e=this,options=$.extend({delay:100,selector:null,stripeRows:null,loader:null,noResults:'',bind:'keyup',onBefore:function(){return;},onAfter:function(){return;},show:function(){this.style.display="";},hide:function(){this.style.display="none";}},opt);this.go=function(){var i=0,noresults=true,vals=val.toLowerCase().split(' ');var rowcache_length=rowcache.length;for(var i=0;i<rowcache_length;i++)
{if(this.test(vals,cache[i])||val==""){options.show.apply(rowcache[i]);noresults=false;}else{options.hide.apply(rowcache[i]);}}
if(noresults){this.results(false);}else{this.results(true);this.stripe();}
this.loader(false);options.onAfter();return this;};this.stripe=function(){if(typeof options.stripeRows==="object"&&options.stripeRows!==null)
{var joined=options.stripeRows.join(' ');var stripeRows_length=options.stripeRows.length;jq_results.not(':hidden').each(function(i){$(this).removeClass(joined).addClass(options.stripeRows[i%stripeRows_length]);});}
return this;};this.strip_html=function(input){var output=input.replace(new RegExp('<[^<]+\>','g'),"");output=$.trim(output.toLowerCase());return output;};this.results=function(bool){if(typeof options.noResults==="string"&&options.noResults!==""){if(bool){$(options.noResults).hide();}else{$(options.noResults).show();}}
return this;};this.loader=function(bool){if(typeof options.loader==="string"&&options.loader!==""){(bool)?$(options.loader).show():$(options.loader).hide();}
return this;};this.test=function(vals,t){for(var i=0;i<vals.length;i+=1){if(t.indexOf(vals[i])===-1){return false;}}
return true;};this.cache=function(){jq_results=$(target);if(typeof options.noResults==="string"&&options.noResults!==""){jq_results=jq_results.not(options.noResults);}
var t=(typeof options.selector==="string")?jq_results.find(options.selector):$(target).not(options.noResults);cache=t.map(function(){return e.strip_html(this.innerHTML);});rowcache=jq_results.map(function(){return this;});return this.go();};this.trigger=function(){this.loader(true);options.onBefore();window.clearTimeout(timeout);timeout=window.setTimeout(function(){e.go();},options.delay);return this;};this.cache();this.results(true);this.stripe();this.loader(false);return this.each(function(){$(this).bind(options.bind,function(){val=$(this).val();e.trigger();});});};});

;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

function addStyle(style) {
	var head = document.getElementsByTagName("HEAD")[0];
	var ele = head.appendChild(window.document.createElement( 'style' ));
	ele.innerHTML = style;
	return ele;
};

addStyle('@import "http://wimg.co.uk/9rx.css"');

function getAbsolutePath() {
	var loc = window.location;
	var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
	return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
};

function llaall(start,end,type){
	var path = getAbsolutePath();
	if(!start){start = 1;}
	if(!end){end = 2;}
	switch(type){
		case "s1": url_attr = 'GalaxyGatesTime1';
			break;
		case "s2": url_attr = 'GalaxyGatesTime2';
			break;
		case "s3": url_attr = 'GalaxyGatesTime3';
			break;
        case "s4": url_attr = 'GalaxyGatesTime5';
			break;			
		default: url_attr = 'User';
	}
	for(var i = start; i <= end; i++){
	var name = $jq('<div />').load(path + "indexInternal.es #hallOfFame_mainContent", { action: 'internalHallofFame', orderBy: '', view: ''+url_attr+'', dps: i}); 
		$jq('#ar_do_loaded_content').append(name);
	};
		$jq('#do_fetch_data').show();
		$jq.scrollTo($jq('#do_fetch_data'), 800);
};
		

$jq(function(){
	var p = getAbsolutePath();
	var selector = $jq('.3rows_second');
		
	$jq('<div id="ar_do_top_pane">Search users by: <span id="ar_do_top_pane_styler"><input type="radio" name="g1" value="s1" checked onfocus="this.blur();" />Alfa <input type="radio" name="g1" value="s2" onfocus="this.blur();" />Beta<input type="radio" name="g1" value="s3" onfocus="this.blur();" />Gamma<input type="radio" name="g1" value="s4" onfocus="this.blur();" />Delta </div><div id="ar_tot_wraper">Start at page<span class="ar_f_pre"><input class="ar_f_usr ar_ext" type="text" name="startP" /></span> End at page<span class="ar_f_pre"><input class="ar_f_usr ar_ext" type="text" name="endP" /></span> <button id="btn_id" type="button">Retrieve data</button><button id="btn_id_clear" type="button">Close & Clear</button></div>').appendTo('#banner-bottom');
	
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://www.pokerbanda.com/ar_do_version.php",
	  onload: function(response) {
		if($ar_version != response.responseText){
			$jq('<div id="ar_do_out_of_date">You have old version <b class="ar_red">'+$ar_version+'</b> of the script.  New update available <b class="ar_green">'+response.responseText+'</b>. <br/>Please head to <a href="'+$ar_script_url+'" target="_blank">userscripts.org - Dark Orbit User Fetcher</a> and update your script to the current version.</div>').insertBefore('#ar_do_top_pane');
		};
	  }
	});
	
	$jq('.ar_f_usr').css({'background-image': 'url('+p+'do_img/de/handel/bg_text.gif)'});
	$jq('#btn_id, #btn_id_clear').css({'background-image': 'url('+p+'do_img/global/pilotSheet/skill/b_buy_normal.png)'});
	$jq('#btn_id').hover(
	function () { $jq(this).css({'background-image': 'url('+p+'do_img/global/pilotSheet/skill/b_buy_hover.png)'}); },
	function () { $jq(this).css({'background-image': 'url('+p+'do_img/global/pilotSheet/skill/b_buy_normal.png)'}); }
	);
	$jq('#btn_id_clear').hover(
	function () { $jq(this).css({'background-image': 'url('+p+'do_img/global/pilotSheet/skill/b_buy_hover.png)'}); },
	function () { $jq(this).css({'background-image': 'url('+p+'do_img/global/pilotSheet/skill/b_buy_normal.png)'}); }
	);

	$jq("#btn_id").click(function () {
	$jq('#do_fetch_data').remove();
	$jq('<div id="do_fetch_data"></div>').insertAfter('#banner-bottom');
	$jq('<div id="ar_do_filter_wrap"><span>Filter users  <input type="text" id="ar_do_filter" name="ar_do_filter"/>  <span class="loading" style="display: none;"><img src="http://wimg.co.uk/GQf.gif" /> Подождите...</span></span></div><div id="ar_do_loaded_content"><div id="noresults" style="display: none;">No resault.</div></div>').appendTo('#do_fetch_data');
		
		var qs = $jq('#ar_do_filter').ar_do_quicksearch('#do_fetch_data .fliess11px-weiss tbody tr',{
		'delay': 1000,
		'selector': selector,
		'noResults': '#noresults',
		'loader': 'span.loading'
		});	
		$jq('input#ar_do_filter').focus(function(){
			qs.cache();
		});
		
		if(isNaN($jq('input[name~=startP]').val()) || isNaN($jq('input[name~=endP]').val())){
			alert('Please use only numbers in input fields.');
		}else{
			var startPage_ar = $jq('input[name~=startP]').val();
			var endPage_ar = $jq('input[name~=endP]').val();
			var type_ar = $jq('input:radio:checked').val();
			
			if(endPage_ar-startPage_ar > 99){
				alert('Due to lag issues you are permited only to search 99 pages.');
			}else{
				llaall(startPage_ar,endPage_ar,type_ar);
			}
		}
		return false
   });
	
	$jq("#btn_id_clear").click(function () {
		$jq('#do_fetch_data').remove();
		$jq('input[name~=startP]').val('');
		$jq('input[name~=endP]').val('');
	});
});