// ==UserScript==
// @name        efoto geresni skelbimai
// @namespace   egs
// @include     http://www.efoto.lt/skelbimai
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant  GM_xmlhttpRequest
// ==/UserScript==
$(document).ready(function() {
    getLinks();
    attachEvent();
});
function attachEvent() {
    $(document).on('click','.adResume',function() {
        var el = $(this).prev();
        if(el.css("display") == "none") { el.show(); }
        else { el.hide(); }
    });  
 
};

function getLinks() {
    $.each($(".h3-title a"),function(i) {
        if(i==0) return;
        var url = $(this).attr('href');
        var current = $(this);
        setTimeout(function() {
            parsePage(current,url);
        },(i-1)*500);
        
    });
}

function parsePage(element, url) {
    GM_xmlhttpRequest({
        method : "GET",
        url : url,
        dataType : "text",
        synchronous : false,
        onload : function(xhr)
        {
            var content = xhr.responseText;
            var contentToElement = $(".left-side",content);
            var date = contentToElement.find(".date");
            var updatedText = "";
            try {
            var updatedAt = date.children("u").children("span").attr("title").slice(20);
            } catch(err) {}          
            if(typeof updatedAt!=='undefined') updatedText = updatedAt;
            else updatedText = "-";
            console.log(updatedText);
            date.children("u").remove();
            var dateText = date.html();
            var adContent = contentToElement.find(".node-body");
            element.next().after("<div class='adResumeContent' style='overflow:scroll;max-height:90%;border:1px solid black;background-color:white; max-width: 50%;position:fixed;top:0; right:0;display:none;z-index:1000'>" + adContent.html() + "</div> <p class='adResume' style='font-size:10px;'>Pakeltas: " + dateText + ". Atnaujintas: " + updatedText + "</p>");
            
        }
    });
    
}