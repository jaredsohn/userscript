// ==UserScript==
// @name           Kongregate General Badges
// @description	 Kognregate General Badges
// @include		  http://www.kongregate.com/badges
// @include		  http://kongregate.com/badges
// ==/UserScript==
(function(){
	window.addEventListener('load', function(event){
		// Get Ajax Object From Prototype
		Ajax = unsafeWindow['Ajax'];
		Effect = unsafeWindow['Effect'];
		Element = unsafeWindow['Element'];
		initButtons();
		
		var d = document.createElement('div');
		d.id='loadingdiv';
		d.innerHTML = 'loading...';
		var f = document.getElementById('feature');
		f.insertBefore(d,f.firstChild);
		Element.setStyle('loadingdiv', {
			background:'url(http://chat.kongregate.com/images/presentation/indicator.gif) top right no-repeat',
			height:'20px',
			width:'80px',
			opacity:'0',
			display:'none',
			fontSize:'1.1em',
			float:'left'
		});
		
	}, 'false');
})();
function initButtons(){
	// Get Those Link Buttons
	var b = new Array;
	
	for (var i = 0; i<2; i++){
		var p = document.getElementById('main').getElementsByTagName('ul')[i].getElementsByTagName('a');
		for(var o = 0; o < p.length; o++){
			b.push(p[o]);
		}
	}
	for (var i = 0; i < b.length; i++){
		b[i].addEventListener('click', function(e){
			e.preventDefault();
			
			new Ajax.Request(this.href,{
				method: 'get',
				onCreate: function(){
					new Effect.Opacity('main',{
						duration:.2,
						from:1.0,
						to:0,
						afterFinish: function(){
							new Effect.Opacity('loadingdiv',{
								duration:.2,
								from:0,
								to:1.0,
								beforeStart: function(){
									Element.setStyle('loadingdiv', {
										display:'block'
									});
									Element.setStyle('main',{
										display:'none'
									});
								}
							});
						}
					});
				},
				onSuccess: function(transport){
					new Effect.Opacity('main',{
						duration:.4,
						from:0,
						to:1.0,
						beforeStart: function(){
							new Effect.Opacity('loadingdiv',{
								duration:.2,
								from:1.0,
								to:0,
								beforeStart: function(){
								
									var x = (new DOMParser()).parseFromString(transport.responseText,"text/xml");
									var d = x.getElementsByTagName('div');
									
									document.getElementById('main').innerHTML = extractMain(d,'main');
									document.getElementById('sidebar').innerHTML = extractMain(d,'sidebar');
									initButtons();
									
									Element.setStyle('loadingdiv', {
										display:'none'
									});
									Element.setStyle('main',{
										display:'block'
									});
								}
							});
						}
					});
				}
			});
			return(false);
		},false);
	}
}
function extractMain(d,id){
	for (var i = 0; i<d.length; i++){
		if (d[i].id == id){
			return d[i].innerHTML;
		}
	}
	return 'nothing';
}