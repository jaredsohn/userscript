// ==UserScript==
// @name           4chan Nightmare [ Real Time ]
// @description    Browse 4chan like a true boss. The threads get auto-updated every X miliseconds (both in the thread list and the reply mode)
// @author         anonwins (http://www.facebook.com/anonwins) 
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @version        0.2
// @include        *boards.4chan.org/*
// @history        0.2 status activity indicator in fixed position. also, click on a thread to open it in a new tab.
// @history		   0.1 >first version out
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function mainFunc() {

	unsafeWindow = this['unsafeWindow'] || window;
	chanRT=true
	
	chanRTms=$(".chanRTtxt").val()
	if((isNaN(chanRTms))||(chanRTms=='')){
		chanRTms=$(".chanRTtxt").attr('placeholder')
	}

	$("form[name=post]").css('position','relative').append('<div style="top:0;position:absolute;padding:10px 20px;background:#EA8;border:1px solid #800;text-

align:center;font-size:14px;">4chan Nightmare<br><div class="chanRTstatus" style="font-weight:bold;">ON</div><div class="chanRTbtn" style="cursor:pointer;padding:5px 

10px;margin:10px;background:white;border-radius:5px;box-shadow:0 1px 1px black;">ON / OFF</div><div style="font-size:10px;">Update Rate in miliseconds</div><input style="border: 

1px solid #3c3c3c;width:100px;"type="text" class="chanRTtxt" placeholder="3000" /></div>')

	$('body').append('<div style="position:fixed;top:62px;left:0;display:inline-block;border-radius:0 5px 5px 0;box-shadow:0 1px 1px black;background:white;padding:6px 5px 

3px 5px;" class="chanRTicoOut"><img class="chanRTico" src="data:image/gif;base64,R0lGODlhEAAQAPUAAP///zJAiPHy9nV

+rzJAiMTI3Pf4+t3g6+fp8IOMtzhFi8rO4HB6rOLk7khUlVJdmuzt84iQuk1Zl2p0qKyxzpeewtTX5aKoybq/1vz8/dnb6J2kxn

+HtENQko2VvM/S43qDsaety7W61GVvpVZinVtmoLC20ZKZvz1KjmBror/D2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVh

dGVkIHdpdGggYWpheGxvYWQuaW5mbwAh

+QQJCgAAACwAAAAAEAAQAAAGo0CA0IDJAAhIR0YgbDYmhAKggyQIDp/mwYGcADzIEGDT0QgRjyrgQHAYIMiRgAmhII0EDGBUFQ0SCAAGD0YNAiJIAwtHSBUQGQZNCEZNVQQSTZkWEQpIChEWQpQAApYEmRkLgQAZGRpQSAALA0kQTQlCBS

QlBZahDEIECotvBgxIwL1ZVYBCBxIEGgadIAAcSB0NWhdjahoEI9qZttexABiRQkEAIfkECQoAAAAsAAAAABAAEAAABmBAgBAgGhGEhJFoyGQQnsjniCk0PY+Aq4eZQACs2OfWcCI+vVbkWEEoXtHCtfR6ZhrYV6p

+z9fTCVtDYFdGYgAGQmiEIoZ3SIptACNyUWgMdnhRBF5UJ3lZTwl7bkhKTEEAIfkECQoAAAAsAAAAABAAEAAABp1AgBAAGRGOQoxhKNRoAI8jAaAhjA7DQwcEWBy5HOnSwDh+MuUPQEp4FqQowGFqOA6ez8XgeMogAAgoZwAbXEN

+TA0GKg5SChEWTEMgbJUFkgAWCQpsHRhMAggZTEYboxdDBkYEAwsABU8QKQSjIwACbCIZGRVScgSoF0cjAgAZHUcTAB5HAgIOHU9CEBMEl8gECRkf0qkYo1IMEExBADsAAAAAAAAAAAA=" style="visibility:hidden;" 

/></div>')	
	
	$(".chanRTbtn").live("click", function(){
		if (chanRT) {
			$(".chanRTstatus").html('OFF')
			$(".chanRTicoOut").hide('fast')
			chanRT=false
			clearTimeout(chanRTtimeout)
		} else {
			$(".chanRTstatus").html('ON')
			$(".chanRTicoOut").show('fast')
			chanRT=true
			chanRTtimeout=setTimeout("unsafeWindow.loadThreads()",chanRTms)
		}
	})

	$(".thread").live("click", function(){
		var curURL = window.location.href
		if(curURL.indexOf("/res/") < 0) {
			var href=$(this).attr('id').substring(1)
			window.open(curURL+'res/'+href,'_blank')
		}
	})
	
	chanRTtimeout=setTimeout("unsafeWindow.loadThreads()",chanRTms)

	unsafeWindow.loadThreads = function() {
		if(chanRT){
			$(".chanRTico").css('visibility','visible')
			$.ajax({
				url: window.location.href,
				success: function(data1) {
					var data2 = data1.split('<div class="board">')
					var data3 = data2[1].split('<div class="mobile"')
					$('#delform .board').html(data3[0])
					$(".chanRTico").css('visibility','hidden')
				}
			}).done(function() { 
				chanRTms=$(".chanRTtxt").val()
				if((isNaN(chanRTms))||(chanRTms=='')){
					chanRTms=$(".chanRTtxt").attr('placeholder')
				}
				chanRTtimeout=setTimeout("unsafeWindow.loadThreads()",chanRTms)
			})
		}
	}
	
}

// load jQuery and execute the main function
addJQuery(mainFunc)