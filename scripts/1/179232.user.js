// ==UserScript==
// @id            sjtu-se-scholarship-userjs@phoeagon
// @name          SJTU SE scholarship system userscript 
// @namespace     http://about.me/phoeagon
// @description   Enhancements for the scholarship system of School of Software, Shanghai Jiao Tong University
// @include      *://202.120.40.52:10080/Home/Scoring
// @updateURL   http://userscripts.org/scripts/source/179232.user.js
// @downloadURL   https://raw.github.com/phoeagon/sjtu-se-scholarship-userjs/master/se.scholarship.user.js#bypass=true
// @run-at         document-end
// ==/UserScript==


function run(){
	$(window).load( 
	function (){
	console.log( " loading " );
	var distributeValueHandler = 0;
	function handleDialog(){
		$('#A').attr('class','indslide')
			.css('width','100px')
			.attr('max','8').attr('min','5').attr('step','0.5')[0].setAttribute('type','range')
		$('#B').attr('class','indslide')
			.css('width','100px').attr('max','7').attr('min','4').attr('step','0.5')[0].setAttribute('type','range')
		$('#C').attr('class','indslide')
			.css('width','100px').attr('max','6').attr('min','3').attr('step','0.5')[0].setAttribute('type','range')
		$('#D').attr('class','indslide')
			.css('width','100px').attr('max','3').attr('min','1').attr('step','0.2')[0].setAttribute('type','range')
		$('#E').attr('class','indslide')
			.css('width','100px').attr('max','3').attr('min','1').attr('step','0.2')[0].setAttribute('type','range')
		$('#F').attr('class','indslide')
			.css('width','100px').attr('max','3').attr('min','1').attr('step','0.2')[0].setAttribute('type','range')
			
		$('.indslide').each( function(ind,ele){
			$(ele).parent().contents()[4].nodeValue="";
			$(ele).parent().append(
				$('<span>').attr('id',$(ele).attr('id')+'_val').attr('class','indvalue')
			)
		})
		$('.indvalue').css('font-size','large')
			
		function updateValue(){
			var sum = 0;
			$('.indslide').each( function(ind , ele){
				sum += parseFloat( $(ele).val() );
				var tg = $(ele).attr('id') + '_val';
				$('#'+tg).text( $(ele).val() )
			})
			//console.log( sum );
			$('#avg').val(  sum  );
			$('#Notes').val(  Math.round(sum*1000)/1000  )
		}
		function distributeValue(){
			var sum = parseFloat( $('#avg').val() );
			sum -= 15;
			//console.log( sum );
			if ( isNaN(sum) ) return;
			$('.indslide').each( function(ind , ele){
				var min = parseFloat( $(ele).attr('min') );
				var max = parseFloat( $(ele).attr('max') );
				$(ele).val( min+(max-min)*sum/15.0 );
				$(ele).change();
			})
		}
		$('.indslide').change( updateValue )
		//if ( !distributeValueHandler )
		//	distributeValueHandler = setInterval(distributeValue , 1000 );

		var avgElement =  $('<input>').attr('id','avg').attr('max','30')
					.attr('min','15');
		
		$('#Notes').parent().append(
			avgElement
		).parent().append(
				$('<div>').css('font-size','small').html('Enhancements by Zhe Qiu <br/>Institute of Parallel And Distributed Systems')
			)
		$('#avg')[0].setAttribute('type','range')

		updateValue();
		$('#avg').change( distributeValue )
	}
	function handler(){
		setTimeout(  handleDialog , 100 );
	}
	$('[role=gridcell]').dblclick( handler );
	})
}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-2.0.3.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
if ( typeof($)=='undefined' )
	addJQuery( run );
else run();
