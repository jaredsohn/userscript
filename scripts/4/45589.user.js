// ==UserScript==
// @name			twitter_with_plurk_Smilies
// @namespace		kengao.tw
// @description		add plurk Smilies to twitter
// @include			http://twitter.com/*
// @include			https://twitter.com/*
// ==/UserScript==
// version: 0.1

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		jQuery = unsafeWindow.jQuery;
		main();
	}
}
GM_wait();

function updateStatusTextCharCounter(value) {
	var len = value.length;
	var char_counter = jQuery('#status-field-char-counter');
	char_counter.html('' + (140-len));
	if (len <= 0 || len > 140) {
		if(len == 0) { char_counter.css( 'color', '#cccccc'); }
		jQuery('.status-btn .round-btn').attr('disabled', 'disabled').addClass('disabled');
	} else {
		jQuery('.status-btn .round-btn').removeAttr('disabled').removeClass('disabled');
		if (len > 130) { char_counter.css( 'color', '#d40d12'); }
		else if (len > 120) { char_counter.css( 'color', '#5c0002'); }
		else { char_counter.css( 'color', '#cccccc'); }
	}
}

// main action
function main() {
	var array = [
	[":-))","http://statics.plurk.com/ff124032f8cc3a9d43b99e661f8fcb4d.gif","smile0"],
	[":-)","http://statics.plurk.com/99ef3957ef779718546752b749bdeabd.gif","smile1"],
	[":-D","http://statics.plurk.com/3385896779bf1c13188bf92ca516878e.gif","smile2"],
	["(LOL)","http://statics.plurk.com/615f18f7ea8abc608c4c20eaa667883b.gif","smile3"],
	[":-P","http://statics.plurk.com/627a5ddad41c22fb7e94305f0fd9b8e8.gif","smile4"],
	["(woot)","http://statics.plurk.com/13b15aa49358be8f47b58552401d7725.gif","smile5"],
	[";-)","http://statics.plurk.com/57c69f50e40a283dcd2e7b56fc191abe.gif","smile6"],
	[":-o","http://statics.plurk.com/8eb05ca7a32301ba16c9496bcad893c4.gif","smile7"],
	["X-(","http://statics.plurk.com/261c0fe4a88417146ae0292d697a5f52.gif","smile8"],
	[":-(","http://statics.plurk.com/11eed61b41a3e935773476ac33bc00d9.gif","smile9"],
	[":'-(","http://statics.plurk.com/72ddf2c585fe77dd0be731b19624d8cb.gif","smile10"],
	[":-&","http://statics.plurk.com/2884b8d0e496c06136c86e9c9599edae.gif","smile11"],
	["(K)","http://statics.plurk.com/9454d15bcaf411b159dcc147ebc3f0eb.gif","smile12"],
	[":-(","http://statics.plurk.com/11eed61b41a3e935773476ac33bc00d9.gif","smile13"],
	["(angry)","http://statics.plurk.com/a5ae31c4185bc60cd006650dc10f8147.gif","smile14"],
	["(annoyed)","http://statics.plurk.com/35b16fc25623670e41c2be6bf8ac38c7.gif","smile15"],
	["(bye)","http://statics.plurk.com/4afd784c0df9f7a3ceacb92beca543f6.gif","smile16"],
	["B-)","http://statics.plurk.com/c1c9870cf653fa3cd103d2eb0f519ccb.gif","smile17"],
	["(cozy)","http://statics.plurk.com/d1a6f08507b126ec6a215e6a2372e8bb.gif","smile18"],
	["(sick)","http://statics.plurk.com/5495d64ccb898ca596b061168fa0374a.gif","smile19"],
	["(:","http://statics.plurk.com/b82e3225c92a764d225429a6487d9f04.gif","smile20"],
	["(goodluck)","http://statics.plurk.com/65271ac2126706bc09d31ff67c525d67.gif","smile21"],
	["(griltongue)","http://statics.plurk.com/a709dab8ddd26bd222466d31bd549579.png","smile22"],
	["(mmm)","http://statics.plurk.com/e3baa9d0d78c35e955a6b07c39f530fa.gif","smile23"],
	["(hungry)","http://statics.plurk.com/0f96595ed7733393b93a3d67aa4f2f4f.gif","smile24"],
	["(music)","http://statics.plurk.com/919b87048fdf7bd59dae457f4284b20b.gif","smile25"],
	["(tears)","http://statics.plurk.com/96872d481bbfe87aad5aed976c7de4ee.gif","smile26"],
	["(tongue)","http://statics.plurk.com/56336bb821c4766001816639e55e5811.gif","smile27"],
	["(unsure)","http://statics.plurk.com/6cb1dc388b9259565efedef8f336d27d.gif","smile28"],
	["(highfive)","http://statics.plurk.com/a9560787e93f4f8890e4bd38696ba537.gif","smile29"],
	["(dance)","http://statics.plurk.com/a55bdb344892676b0fea545354654a49.gif","smile30"],
	["(blush)","http://statics.plurk.com/9939dd585cf0e8d39e7912a98a9ce727.gif","smile31"],
	["(doh)","http://statics.plurk.com/e8ed6c7eed76d2acd9dbf469f29fbec2.gif","smile32"],
	["(brokenheart)","http://statics.plurk.com/2b3593aea68efa7a00b4ef2850f98b8a.gif","smile33"],
	["(drinking)","http://statics.plurk.com/ed3620ff28a02e3dc9ac4ffa8e6ae2e6.gif","smile34"],
	["(girlkiss)","http://statics.plurk.com/08a43d50691a1ed22706fc92f568fa07.gif","smile35"],
	["(rofl)","http://statics.plurk.com/8600839dc03e6275b53fd03a0eba09cf.gif","smile36"],
	["(money)","http://statics.plurk.com/e6bb16b6ef386c5f23900b103dbdba31.gif","smile37"],
	["(rock)","http://statics.plurk.com/1c890273544559b17f090d09238fa763.gif","smile38"],
	["(nottalking)","http://statics.plurk.com/f053074bcce500fbd1e2327d49748a6d.gif","smile39"],
	["(party)","http://statics.plurk.com/1f44d3984a094fceae1f1a016a730fc9.gif","smile40"],
	["(sleeping)","http://statics.plurk.com/2f7c90ce56fb4a70e34c04d8d7692dd0.gif","smile41"],
	["(thinking)","http://statics.plurk.com/900f3dd0adaad9142d567caf6bfb1311.gif","smile42"],
	["(bringit)","http://statics.plurk.com/95ace5ba1097301b5206a9e0fb431624.gif","smile43"],
	["(worship)","http://statics.plurk.com/95e69aa508d4bb435706b9db0a610dad.gif","smile44"],
	["(applause)","http://statics.plurk.com/a08ed27ec14b48d4703f53f7eb94834b.gif","smile45"],
	["8-)","http://statics.plurk.com/85ef5fa01a6a67a525429f8bf4279fe7.gif","smile46"],
	["(gym)","http://statics.plurk.com/986ecf2b1ae69072e0195b0a58545900.gif","smile47"],
	["(heart)","http://statics.plurk.com/150e3f367a063d3baf9720719d78d778.gif","smile48"],
	["(devil)","http://statics.plurk.com/3fabe74e992888be701de2a9d80c180a.gif","smile49"],
	["(lmao)","http://statics.plurk.com/92b595a573d25dd5e39a57b5d56d4d03.gif","smile50"],
	["(banana_cool)","http://statics.plurk.com/4f01bac8a707e5450307f97065ec0fa7.gif","smile51"],
	["(banana_rock)","http://statics.plurk.com/48515125401120316abb97666458d05b.gif","smile52"],
	["(evil_grin)","http://statics.plurk.com/aabbc82c2b0dc72bfbce2f82c97a95e8.gif","smile53"],
	["(headspin)","http://statics.plurk.com/b0b0596acce9ffc1f2a27548aa642eaf.gif","smile54"],
	["(heart_beat)","http://statics.plurk.com/52991d7ff65a05526454bd1170a0f14c.gif","smile55"],
	["(ninja)","http://statics.plurk.com/846277f0a154dc95a08594b7d32a5ccd.gif","smile56"],
	["(haha)","http://statics.plurk.com/843739a95294fd0bf4c958840b46408f.gif","smile57"],
	["(evilsmirk)","http://statics.plurk.com/22416dced8b59446db8cd366cc925d09.gif","smile58"],
	["(eyeroll)","http://statics.plurk.com/e3f0f67ca3af62e34f13abf1d036a010.gif","smile59"]
	];
	
	jQuery('.hentry .status-body .entry-content').livequery(function(){
			var x = jQuery(this);
			var newHtml = x.html();
			for(var s in array){
				newHtml = newHtml.replace(array[s][0], "<img src='"+array[s][1]+"'/>","gm");
			}
			x.html( newHtml );
	});
	
	var h = document.createElement('div');
	h.setAttribute('class', 'interfacebutton');
	var interfaceHtml='';
	for(var s in array){
		interfaceHtml+="<a class='"+array[s][2]+"' smiletext='"+array[s][0]+"'><img src='"+array[s][1]+"'/></a> ";
	}
	h.innerHTML = '<a class="smiles_select">Plurk Smiles</a><div class="interface">'+interfaceHtml+'</div>';
	
	h.style.cursor = 'pointer';
	jQuery('.bar').append(h);
	jQuery('.interface').hide();
	jQuery('.smiles_select').click(function() {
		if( jQuery('.interface').css('display')=='none' )
			jQuery('.interface').show();
		else
			jQuery('.interface').hide();
	});
	for(var s in array){
		jQuery('.'+array[s][2]).click(function(){
			var content = jQuery('#status').val();
			var msg = content + jQuery(this).attr('smiletext');
			jQuery('#status').val(msg).focus();
			updateStatusTextCharCounter(msg);
			window.scroll(0,0);
		} );
	}
}


