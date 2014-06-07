// ==UserScript==
// @name       Nekyos magic
// @version    0.2
// @match      http://www.reddit.com/r/*/
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    $(document).ready(function(){
        $("#siteTable").prepend("<button type=\"button\" id=\"nekyomagicbutton\">Nekyo's magic button</button>");
        $('#nekyomagicbutton').css("width","50%");
        $('#nekyomagicbutton').css("margin-left","25%");
        $('#nekyomagicbutton').css("margin-right","auto");
        var used = false;
        $('#nekyomagicbutton').click(function(){
            if(!used){
                $('a.title').each(function(){ 
                    var url = $(this).attr('href');
                    var isImgUrl = false;
                    if (url.indexOf("jpg") !=-1) {
                        isImgUrl = true;
                    }
                    if (url.indexOf("gif") !=-1) {
                        isImgUrl = true;
                    }
                    if (url.indexOf("jpeg") !=-1) {
                        isImgUrl = true;
                    }
                    if (url.indexOf("png") !=-1) {
                        isImgUrl = true;
                    }
                    if (url.indexOf("imgur") !=-1){
                        if(!isImgUrl){
                            url = url.replace("imgur","i.imgur") + ".gif";
                            isImgUrl = true;
                        }
                    }
                    if(isImgUrl){
                        $(this).parent().parent().append("<img src=\""+url+"\" class=\"nekyoimg\"/>");
                    }
                });
                $('.nekyoimg').css('clear','both');
                $('.nekyoimg').css('float','left');
                $('.nekyoimg').css('max-width','100%');
                used = true;
            }
            else{
                $('.nekyoimg').remove();
                used = false;
            }
        });
    });
}

addJQuery(main);