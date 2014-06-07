// ==UserScript==
// @name        ashim
// @namespace   vashits
// @include     http://*/surf.php?*
// @include     *://*.com/surf*.php*
// @include     *://*.com/surfbar/index.php?*
// @include     *://*.com/surfbar/index.php*
// @include     *://*vasthits.com/surfh7ta9.php*
// @require     http://userscripts.org/scripts/source/161814.user.js
// ==/UserScript==

if(wparent.location.href.indexOf('surfh7ta9.php?') != -1||
wparent.location.href.indexOf('surf.php?') != -1||
wparent.location.href.indexOf('chat/surfmain.php') != -1||
wparent.location.href.indexOf('surf.php?mid') != -1 && top == self){
	
	var arr = [],ctr = 0;
	var div = $('<div>');
    var div2 = $('<div>');
	var clickNum = ctr + 1 ;
	var loading = 0;
	

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


function mydetect1()
{
   var counter=document.getElementById('counter');
   if(counter.outerHTML.indexOf("none")>0)
   {
      var buttons=document.getElementsByTagName('a');
      for(var i=0;i<buttons.length;i++)
      {
         if(buttons[i].outerHTML.indexOf("submitform")>0)
         {
               buttons[i].click();
               clearInterval(s1); 
         }
      } 
   }
}
function mydetect2()
{
   var url=window.top.document.getElementsByTagName('frame')[1].src;
   if(url.indexOf('vasthits.com/index.php')>0)
   {  
      var doc=window.top.document.getElementsByTagName('frame')[1].contentWindow.document;
      var result=doc.getElementsByName('check_page_set')[0].value;
      if(result.indexOf("One")>0){doc.forms[0].submit();}
      else if(result.indexOf("Two")>0){doc.forms[1].submit();}
      else if(result.indexOf("Three")>0){doc.forms[2].submit();}
      clearInterval(s2); 
   }
}
var s1=window.setInterval(function(){ mydetect1();},1000);
var s2=window.setInterval(function(){ mydetect2();},100);