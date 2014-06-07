// ==UserScript==
// @name           Noc/Dzień
// @namespace      wykonoc
// @include        http://www.wykop.pl/*
// ==/UserScript==



if(unsafeWindow.jQuery){
var $ = unsafeWindow.jQuery;
 main();
} else {
 addJQuery(main);
}

function main(){
	var on = !($('body').css('backgroundColor')=="rgb(28, 28, 28)");
	var labs = "http://www.wykop.pl/labs/"+(
	on?'enable':'disable')+"/~2/3/hS3KsdEd/log_ref_0,"+document.location.pathname.slice(1, -1)+",log_ref_m_0,,log_ref_n_0,";

	var button='<div class="quickpoint fright rel">'+
					'<a id="swiatlo" title="Przełącz styl dzienny/nocny" class="fright cfff tdnone quickicon tcenter" href="javascript:void(0)">'+
						'<span class="icon inlblk fav"><span>Światło</span></span>'+
					'</a>'+
				'</div>';

	$('nav.main.medium.rel').append(button);
	$('#swiatlo').click(function(){
		document.location=labs;	
	}).children('span').css({backgroundPosition:'-97px -26px',width: 20});
}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}

