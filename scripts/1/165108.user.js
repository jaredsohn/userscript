// ==UserScript==
// @name       TF2R Enter Button - CrossFire-Game.ru
// @namespace  http://userscripts.org/scripts/show/165092
// @version    0.1
// @description  Adds 'Enter!' to raffles on first page!
// @match      http://*tf2r.com/raffles.html
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2013, NanoCrate
// ==/UserScript==
var button;

button = document.createElement('div');
button.setAttribute('class', 'jlbut');
button.innerHTML = '<input type="button" id="enbut" value="Enter!">';

$('.pubrright.jqueryitemsgather').bind('mouseenter', function() {
        $('.jlbut').remove();
    	$(this).append(button);
    	$("#enbut").show([700]);
         url = $(this).attr('rqitems');
         url2 = "http://tf2r.com/" + "k" + url + ".html";
    
          $.ajax({
                    type: "post",
                    url: url2,
                    dataType: "json"
                });
        $("#enbut").bind('click', function(){
                $("#enbut").removeAttr("disabled");
                $("#enbut").attr("value", "Enter!");
                    $.ajax({
                    type: "post",
                    url: "http://tf2r.com/job.php",	
                    dataType: "json",
                    data: {
                        "enterraffle": "true",
                        "rid": url
                    },
                    success: function(data){
                        if(data.status == "fail")
                        {
                            if(data.message == "Login required")
                            {
                                window.location.href = "http://tf2r.com/login";
                            }else {
                                alert(data.message);
                                $("#enbut").removeAttr("disabled");
                                $("#enbut").attr("value", "Enter!");
                            }
                        }
                        else if(data.status == "ok")
                        {
                            //$(this).hide();
                            $("#enbut").hide([700]);
                        }
                    }
                });
            });
    });