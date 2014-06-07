// ==UserScript==
// @name        TIM italia more SelfService
// @namespace   http://userscripts.org/users/burn
// @description Some improvements to TIM "Self Service" customers area (italy only). The script adds some statistics to the "TIM Special" section and moves some DOM elements. 
// @author      Burn
// @include     http*://www.119selfservice.tim.it/area-clienti-119/privata/opzioni*
// @grant       GM_log
// @version     3.01
// ==/UserScript==

//     README     ****************************************************
//
// if you  don't live in  italy you probably  don't need  this script, 
// since  it is  loaded  within  personal web  area  on  tim.it  site, 
// which is available to TIM (italian mobile carrier) customers  only.
// *******************************************************************

(function () {

	if(window.self!=window.top)return;
	if('undefined' == typeof unsafeWindow.jQuery)return;

	var jQ         = unsafeWindow.jQuery;
	var secMese    = 400*60;
	var mbMese     = 2048.00;
	var smsNo3Mese = 700;
	var sms3Mese   = 300;
	var REnum      = new RegExp("([0-9]{1,3})","");
	var REgb       = new RegExp("([0-9\.]+)","");
	var d          = document || unsafeWindow.document;
	var w          = window || unsafeWindow;
	
	jQ(w).load(function() {
		// remove some ads and move some dom elements
		jQ('#ajaxBannerAlto').remove();
		jQ('.box_servizi').css( {'width':'98%', 'height':'144px'} );
		var rowOpzioni = jQ(".row_servizi:eq(2)");
		jQ(".row_servizi:eq(1)").append( rowOpzioni.children() );
		rowOpzioni.siblings(".row_divisore:eq(0)").remove();
		rowOpzioni.remove();
		jQ('.info_user').css({'height':'164px'});
		jQ('.box_adv_boxImg').remove();
		jQ('.box_adv_box').css({'min-height':'138px'});
		
		//GM_log(jQ(".corpo_sx" ,"#bundles_ODH15").length);
		var parentN = jQ("#bundles_ODH15");
		jQ(".corpo_dx", parentN).each(function(idx) {
			var q = jQ(this);
			//replText(q);
			if(0==idx)improveMin(q);
			if(1==idx)improveSmsNo3(q);
			if(2==idx)improveSms3(q);
			if(3==idx)improveGb(q);
		
		});
		jQ(".corpo_sx", parentN).each(function(idx) {
			var q = jQ(this);
			var childr = jQ(q.children("span:eq(0)"));
			if(0==idx)insertTitle(childr, "400 Minuti v. tutti");
			if(1==idx)insertTitle(childr, "700 SMS non \"3\"");
			if(2==idx)insertTitle(childr, "300 SMS \"3\"");
			if(3==idx)insertTitle(childr, "2048 MB di traffico");
		});
	});

	// helpers	
	var insertTitle = function(el, txt) {
		el.before("<div style=\"clear:both;\"><h3 style=\"text-align:right;padding-right:31px\">"
			+ txt + "</h3></div>");
	};
	var improveGb = function(elm) {
		this.txt = elm.children("p").text();
		//GM_log(this.txt);
		this.gbUsati = REgb.exec(this.txt);
		this.diff = mbMese - parseFloat(this.gbUsati[0]);
		this.htmlOut = "<p>Utilizzati: " + this.diff.toFixed(2) + " MB</p>";
		printHtml(elm,this.htmlOut);
	};
	var improveSms3 = function(elm) {
		this.txt = elm.children("p").text();
		this.smsUsati = REnum.exec(this.txt);
		this.diff = sms3Mese-parseInt(this.smsUsati[0]);
		this.htmlOut = "<p>Inviati: " + this.diff.toString()+" SMS</p>";
		printHtml(elm,this.htmlOut);
	};
	var improveSmsNo3 = function(elm) {
		this.txt = elm.children("p").text();
		//GM_log(this.txt);
		this.smsUsati = REnum.exec(this.txt);
		this.diff = smsNo3Mese-parseInt(this.smsUsati[0]);
		this.htmlOut = "<p>Inviati: " + this.diff.toString()+" SMS</p>";
		printHtml(elm,this.htmlOut);
	};
	var improveMin = function(elm) {
		this.arr = elm
			.children(".tooltip_info")
			.text()
			.toString()
			.trim()
			.split("minuti");
		//GM_log( "improveMin: " + this.arr.toSource() );
		this.min = REnum.exec(this.arr[0]); 
		this.sec = REnum.exec(this.arr[1]);	
		if(null==this.sec){
			this.sec = new Array();
			this.sec.push(0);
		}
		//GM_log( this.min[0] + " " + this.sec[0] );
		this.diff = secMese - ( (parseInt(this.min[0])*60) + parseInt(this.sec[0]) );
		this.htmlOut = "<p>Utilizzati: " + (Math.floor(this.diff/60)).toString()
			+ " min. e " + (this.diff%60).toString() + " sec.</p>";
		printHtml(elm,this.htmlOut);
	};
	var printHtml = function(el,st) {
		jQ(el).children("p:eq(0)").append(st);
	};
	var replText = function(el) {
		this.repl = el.children("p:eq(0)").text();
		this.repl = this.repl.replace("Hai ancora a disposizione", "Disponibili:");
		//GM_log(this.repl);
		el.children("p:eq(0)").text(this.repl);
	};
	if (!String.prototype.trim) {
	   String.prototype.trim=function(){return this.replace(/(^[\s\xA0]+|[\s\xA0]+$)/g,'');};
	}
})();
