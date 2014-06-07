// ==UserScript== 
// @name           asd
// @namespace      asdas?
// @description    asds
// @include        http://ncore.cc/*
// @include        http://ncore.nu/*
// ==/UserScript== 
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
$("#infosav_adatok").append("<a id='flop' href='http://ncore.cc/forum.php'>alma</a>");
var p = $("#plus50pont").length;
			if (p)
			{
			$("#plus50pont").remove();
			$("#flop").css("color","darkred");
			}
            $('#flop').click(function(){
                $.ajax({
                    type:'POST',
                    url:'/ajax.php',
                    data:{
                        action:'plus50pont'
                    },
                    success:function(){
                        $('#flop').remove();
                    }
                });
				return false;
            });   

 }

addJQuery(main);