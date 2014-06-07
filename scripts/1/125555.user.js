// ==UserScript==
// @name           Newgrounds Stretch
// @namespace      ngstretch@snakehole.net
// @description    Adds the stretch button when not available.
// @include        http://www.newgrounds.com/portal/view/*
// ==/UserScript==

// this function allows us to use the jquery on Newgrounds and to skip unsafeWindow calls
function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
	var ngStretch = {
		expand_btn: null,
		collapse_btn: null,
			
		movieExpandHtml: ' <a id="embedcontrol_expand" class="full" href="' + window.location + '/display/stretch"><span></span><span class="hovertext"><span>Stretch ' + $("meta[property=og\\:type]").attr("content") + '</span></span></a>',
		movieCollapseHtml: ' <a style="display:none" id="embedcontrol_collapse" class="orig" href="' + window.location + '"><span></span><span class="hovertext"><span>Original Size</span></span></a>',
		addButton: function()
		{
			// if expand button doesn't exist...
			if($("div.podtop > div > #embedcontrol_expand").length == 0)
			{
				// $("meta[property=og\\:type]").attr("content"); // this gets whether it is a game or movie
				// add buttons
				$("div.podtop > div > #embedcontrol_pop").after(ngStretch.movieExpandHtml + ngStretch.movieCollapseHtml); 
				// style button so it's more obvious it has been added
				$("div.podtop > div > #embedcontrol_expand, div.podtop > div > #embedcontrol_collapse").css({'background-image': 'url("' + ngStretch.link_stripes + '")'});
				$("div.podtop > div > #embedcontrol_expand > .hovertext * , div.podtop > div > #embedcontrol_collapse > .hovertext *").css({'text-transform': 'capitalize'});
	
	
				// prepare and add click events
				this.expand_btn = $("#embedcontrol_expand");
				this.collapse_btn = $("#embedcontrol_collapse");
	
				
				this.expand_btn.click(function(e) {
					movie_viewer.expand();
					ngStretch.expand_btn.hide();
					ngStretch.collapse_btn.show();
					return false;
				});
	
				this.collapse_btn.click(function(e) {
					movie_viewer.collapse();
					ngStretch.expand_btn.show();
					ngStretch.collapse_btn.hide();
					return false;
	
				});
			}
		},
	
		init: function()
		{
	   		ngStretch.addButton();
		},
	
		link_stripes: 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAlgAAAA2CAYAAAAbB+ffAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/' +
			'oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCDAMiEs9zEx0AAARASURBVHja7d1BUhtH' +
			'FIDhnlaLOMkiAQOG2EnlBLlHTuUcKKeKjUEgkLMICFZZuYoYpDeuvCmrqz6tZ77lX68fU81QSvmjBL/9' +
			'/f3okbJarQqHw+FM6fz2+59vo+ffnH4fmu/P/ykcDoczpdNEm8Ph9OIMQ936/C8/fReaf3245XA4nMmd' +
			'JtocDqcXZzYbNj7/80kcyXcXt1sNDofDyXKaaHM4nF6cTZF7/erb0Dxb3IWR5HA4nCyniTaHw+nFmdWn' +
			'oXtzGp9A35/fPvsuh8PhTOU00eZwOL04rQ2fnRzjSJ4tbp+89/QEyuFwOLlOE20Oh9OLM2/1UdzGrfcf' +
			'v/N8JDkcDiffaaLN4XB6cT5F7/T4Rfj8+eU6jCSHw+FM5TTR5nA4vTitDeX0aETcrtbhep/D4XCmdJpo' +
			'czicXpxfX4/4duJiXeazYL1/8oLD4XAmddqXxE38ORzO13RaEMCzxd2ID1PHfYPB4XA4/8dpos3hcHpx' +
			'9vbqlpPjXdmbRyfQEZHkcDicBKeJNofD6cXZdCfNxXK9dfgqpZSTw3i9z+FwOFlOE20Oh9OL89wa/+Jq' +
			'XVpw0/LJiA9TORwOJ9Npos3hcHpxZvW/p8TF8i6M5KvDeL3P4XA42U4TbQ6H04vz+H+CLZbx/wgbG0kO' +
			'h8PJdppoczicXpxPQbu6WZd58GHq0UG83udwOJypnCbaHA6nF2c+G8rl9X1pdXvcjl9+E5ocDoczpdNE' +
			'm8Ph9OJcf3wI1/JHB3Ekr27uORwOZ1KnfUncxJ/D4XxNJ7oM8PDHOJLLj/ccDoczudNEm8Ph9OJsuger' +
			'lFJe7u+F5vXqYavB4XA4WU4TbQ6H04uzaT1/8EMcyZu/4z8vcjgcTpbTRJvD4fTiDMPT0B0fxJG8vHl4' +
			'9l0Oh8OZymmizeFwenE+39IfjljvL1cPJdjuczgcTrrTRJvD4fTiPF7Vj41ktN7ncDicKZwq2hwOpzdn' +
			'bCSjH4fD4UzlVNHmcDiGKw6Hw8l1qmhzOBzDFYfD4eQ6VbQ5HE7PjvhzOJxddKpoczgcwxWHw+HkOlW0' +
			'ORyO4YrD4XBynSraHA7HcMXhcDi5ThVtDodjuOJwOJxcp4o2h8MxXHE4HE6uU0Wbw+H05og/h8PZdaeK' +
			'NofDMVxxOBxOrlNFm8PhGK44HA4n1wkvGhV/Doezy474czicXXSqaHM4HMMVh8Ph5DpVtDkcjuGKw+Fw' +
			'cp0q2hwOx3DF4XA4uU4VbQ6HY7jicDicXKeKNofDMVxxOBxOrlNFm8Ph9OaIP4fD2XWnijaHwzFccTgc' +
			'Tq5TRZvD4RiuOBwOJ9cJLxoVfw6Hs8uO+HM4nF10qmhzOBzDFYfD4eQ6VbQ5HI7hisPhcHKdKtocDsdw' +
			'xeFwOLlOFW0Oh2O44nA4nFynijaHwzFccTgcTq5TRZvD4fTmiD+Hw9l1p4o2h8MxXHE4HE6u8y/rLCPj' +
			'+IQ2QgAAAABJRU5ErkJggg=='
	};

	$(document).ready(function(){
		ngStretch.init();
	});
});