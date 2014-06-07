// ==UserScript==
// @name        trafficreturn
// @namespace   trafficreturn
// @include     *://*trafficreturn.com/surf.php*
// @require     http://userscripts.org/scripts/source/156923.user.js
// @include     *://*.*cks.com/
// @include     *://*cl.my/*
// @include     *://*link.com/*
// @include     *://*df.ly/*
// ==/UserScript==


if(wparent.location.href.indexOf('surf.php?mid') != -1  && top == self){
	
	var div = $('<div>');
	div.css({zIndex:1000000,textAlign:'center',padding:5,position:'fixed',width:85,height:20,background:'#AFFFAF',border:'2px solid green',top:10,left:10})
		.text('loadng');
	$('html').css({position:'relative'}).append(div);
	$('frame:first').load(function(){
		var inters = setInterval(function(){
			var doc = $( $('frame:first')[0].contentDocument );
			var win = $('frame:first')[0].contentWindow;
			
			var counter = $('#count',doc).text()
			div.text(counter);
			$('#buttons ',doc).show()
			if(counter == 0){
				clearInterval(inters);
				
				function decode(img,pos){
					var canvas = $('<canvas>')[0];
					canvas.width = $(img).width();
					canvas.height = $(img).height(); 
					var ctx = canvas.getContext('2d');
					//ctx.translate(canvas.width-1, canvas.height-1);
					//ctx.rotate(Math.PI); 
					// Draw image on canvas to get its pixel data
					ctx.drawImage(img, pos, 0);
					
					//$('body').prepend(canvas)
					// Get image pixels
					var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
					var pixels = imageData.data;
					return pixels;
				}
				var checker = [];
				var img0 = decode($('#buttons img:first',doc)[0],0)
				$.each($('#buttons img',doc),function(k,v){
					if(k!=0){
						var vct= 0;
						var imgs = decode($(v)[0],0)
						for(i=0;i<img0.length;i++){
							if(img0[i] == imgs[i]){
								vct++;
							}
						}
						checker.push(vct)
					}
					
				});
				var ind = checker.indexOf(Math.max.apply(Math, checker));
				console.log(checker)
				console.log(ind);
				$('#buttons img:nth('+(ind+1)+')',doc).trigger('click')
			}
		},1500)
	})
	
}