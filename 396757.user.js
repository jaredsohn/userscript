// ==UserScript==
// @name           Waifuist 8chan Enhancer
// @include        https://8chan.co/*res*
// @description    Userscript to add images from links, auto-reload, auto-noko and a handy scroll up and down shortcut div to 8chan.co. More features may be included later.
// @version        0.0.2
// @updateURL   http://userscripts.org/scripts/source/396757.user.js
// ==/UserScript==

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

$nofill = 'no';

$(".post_no").click(function(){
$nofill = 'yes';
});

function checkandffill(){
	$("#body").each(function() {
		if($(this).val() === "")
    var number = 12345678 + Math.floor(Math.random() * 6);
		$("#body").text(makeid());
});};

$("input[name='post']").click(function(){
	if($nofill === "no"){
	window.onload=checkandffill();
};
});



function linkimg(){
$('a[href$=".png"][rel="nofollow"], a[href$=".jpg"][rel="nofollow"], a[href$=".gif"][rel="nofollow"]').each(function(){
	$(this).replaceWith('<div class="linkedimg2" style="width:100px;display:inline-block;"><img class="linkedimg2" style="max-width: 100%;" src="' + $(this).attr('href') + '" /></div>');
});

$(document).on('click', ".linkedimg2", function() {
  $(this).css('width', 'auto');
 $(this).attr('class', 'clicked');
});

$(document).on('click', ".clicked", function() {
$(this).css('width', '100px');
$(this).attr('class', 'linkedimg2');
	});
	
};


function noko(){
document.getElementsByName("email", "input")[0].value = "noko";
};

window.onload=noko();


var div = document.createElement("div");
div.style.width = "47px";
div.style.height = "auto";
div.style.position = "fixed";
div.style.right = "90px";
div.style.top = "400px";
div.style.color = "white";
div.className = "scriptbox";
div.innerHTML = "<center><font size='30'><a alt='Scroll Up' style='text-decoration: none' href='javascript:window.scrollTo(0,0);'>▲</a><br><a style='text-decoration: none' href='javascript:window.scrollTo(0,900000000);'>▼</a><br><a style='text-decoration: none' class='QR'>↓</a><a style='text-decoration:none;display:none;' class='QR2'>↑</a><br></font></center>";

document.body.appendChild(div);


$('.QR').click(function(){
	$("table:first-of-type").css("background-color","#D1D1D1");
	$("table:first-of-type").css("position","fixed");
	$("table:first-of-type").css("top","100px");
	$("table:first-of-type").css("right","100px");
	$(".QR").css("display","none");
	$(".QR2").css("display","inline");
	imagelinks();
	
});

$('.QR2').click(function(){
	$("table:first-of-type").removeAttr('style');
	$(".QR").css("display","inline");
	$(".QR2").css("display","none");
});


$(document).ready(function(){
linkimg();
	
    $('#favicon').remove();
    $('head').append('<link href="https://8chan.co/waifuist/src/1393161837220.png" id="favicon" rel="shortcut icon">');
});





var count = 0;

var title_regex = /^\(\d+\) (.*)$/;
var original_title = document.title;
var match = title_regex.exec(document.title);
if (match != null) {
            original_title = match[1];
        };

var onVisibilityChange = function (args) {
  var state = document["visibilityState"];
  if (state == "visible")
  {
    document.title = original_title;
	  count = 0;
	$('#favicon').remove();
    $('head').append('<link href="https://8chan.co/waifuist/src/1393161837220.png" id="favicon" rel="shortcut icon">');
  }
};

document.addEventListener("visibilitychange", onVisibilityChange, false);


setInterval(function() {
$.ajax({
			url: document.location,
			success: function(data) {
				$(data).find('div.post.reply').each(function() {
					var id = $(this).attr('id');
					if($('#' + id).length == 0) {
						$(this).insertAfter($('div.post:last').next()).after('<br class="clear">');
						$(document).trigger('new_post', this);
						count++;
						linkimg();
					}
				});
				
			}
		});
	
var state2 = document["visibilityState"];
	if (state2 == "visible"){count = 0;};
if (count > 0 && state2 == "hidden") {
document.title = '('+count+') '+original_title;
$('#favicon').remove();
$('head').append('<link href="https://8chan.co/waifuist/thumb/1393161986195.png" id="favicon" rel="shortcut icon">');
};
}, 5000);

