// ==UserScript==
// @name           Backlinks for anypage
// @namespace      http://userscripts.org/scripts/show/58103
// @description    Add a simple way to get all backlinks for any page.
// @homepage       http://userscripts.org/scripts/show/58103
// @include        http://*
// @include        https://*
// ==/UserScript==

var css = 
    "@namespace url(http://www.w3.org/1999/xhtml); "+
    "div#G_backlinks_bag div,  "+
    "div#G_backlinks_bag span,  "+
    "div#G_backlinks_bag li  "+
    "{  "+
    "    font-family : trebuchet MS,sans-serif !important;  "+
    "    text-align: left;"+
    "}  "+
    "  "+
    "a#G_backlinks_link  "+
    "{  "+
    "    font-size:9px !important;  "+
    "}  "+
    "div#G_backlinks_bag li  "+
    "{  "+
    "    font-size:12px !important;  "+
    "}  "+
    "  "+
    "div#G_backlinks_bag a  "+
    "{  "+
    "    color: #008000 !important;  "+
    "    text-decoration: none !important;  "+
    "}  "+
    "  "+
    "div#G_backlinks_bag a:hover  "+
    "{  "+
    "    color: #003300 !important;  "+
    "    text-decoration: none !important;  "+
    "}  "+
    "  "+
    "  "+
    "div#G_backlinks_anchor  "+
    "{  "+
    "    position: fixed !important;  "+
    "    right: 20px;  "+
    "    bottom: 0px !important;  "+
    "    z-index: 50758 !important;  "+
    "    border: 1px solid #000080 !important;  "+
    "    text-align: center !important;  "+
    "}  "+
    "div#G_backlinks_anchor div#G_backlinks_draggable  "+
    "{  "+
    "    background-color: #6666ff !important;  "+
    "    display: relative !important;  "+
    "    bottom: 0px !important;  "+
    "    width:34px !important;  "+
    "    height:4px !important;  "+
    "}  "+
    "div#G_backlinks_anchor div#G_backlinks_draggable.G_backlinks_draggable_move  "+
    "{  "+
    "    background-color: #ff0000 !important;  "+
    "}  "+
    "  "+
    "div#G_backlinks_anchor  "+
    "{  "+
    "    background-color: #cccccc !important;  "+
    "    width:34px !important;  "+
    "    height:3px !important;  "+
    "}  "+
    "div#G_backlinks_anchor.G_backlinks_hover  "+
    "{  "+
    "    background-color: #ccccff !important;  "+
    "    width:34px !important;  "+
    "    height:22px !important;  "+
    "    -moz-border-radius-topleft: 8px !important;  "+
    "    -moz-border-radius-topright: 8px !important;  "+
    "}  "+
    "div#G_backlinks_infobox {  "+
    "    background-color:#fff !important;   "+
    "    border:1px solid #000 !important;   "+
    "      "+
    "    display:none;  "+
    "    position: fixed !important;  "+
    "    right: 5px !important;  "+
    "    bottom: 35px !important;  "+
    "  "+
    "    width:300px !important;  "+
    "    padding:25px !important;  "+
    "    color:#fff !important;  "+
    "  "+
    "    z-index: 50847 !important;  "+
    "  "+
    "    -moz-box-shadow:0 0 10px #000 !important;   "+
    "    -moz-border-radius: 8px !important;  "+
    "      "+
    "}  "+
    "div#G_backlinks_infobox {  "+
    "    font-size: 9px !important;  "+
    "}  "+
    "div#G_backlinks_infobox ul {  "+
    "    margin: 0px !important;  "+
    "    padding: 0px !important;  "+
    "    display: block !important;  "+
    "}  "+
    "div#G_backlinks_infobox ul li {  "+
    "    margin: 0px !important;  "+
    "    padding: 0px !important;  "+
    "    display: block !important;  "+
    "    padding-bottom: 2px !important;  "+
    "    border-bottom : 1px solid #999999 !important;  "+
    "}  "+
    "div#G_backlinks_infobox ul li.G_backlinks_error {  "+
    "    color:red !important;  "+
    "}  "+
    "  "+
    "div#G_backlinks_infobox ul li#G_backlinks_link_next  "+
    "{  "+
    "    text-align: center !important;  "+
    "    margin: 1px 1px 0px 0px !important;  "+
    "}  "+
    "div#G_backlinks_infobox ul li#G_backlinks_link_close  "+
    "{  "+
    "    border-bottom : none !important;  "+
    "    text-align: center !important;  "+
    "    margin: 1px 0px 0px 0px !important;  "+
    "}  "+
    "  "+
    "div#G_backlinks_tooltip {  "+
    "    background-color:#000 !important;   "+
    "    border:1px solid #fff !important;   "+
    "    padding:10px 15px !important;   "+
    "    width:200px !important;   "+
    "    display:none;   "+
    "    color:#fff !important;   "+
    "    text-align:left !important;   "+
    "    font-size:16px !important;   "+
    "  "+
    "    position: fixed !important;  "+
    "    right: 370px !important;  "+
    "    bottom: 50px;  "+
    "  "+
    "    z-index: 50913 !important;  "+
    "  "+
    "    -moz-box-shadow:0 0 10px #000 !important;   "+
    "    -moz-border-radius: 8px !important;  "+
    "}  "+
    "a#G_backlinks_link {  "+
    "    margin-left: 9px !important;  "+
    "    margin-right: 9px !important;  "+
    "    margin-bottom: 1px !important;  "+
    "    margin-top: 1px !important;  "+
    "    width: 16px !important;  "+
    "    height: 16px !important;  "+
    "}  "+
    "  "+
    "a#G_backlinks_link,  "+
    "div#G_backlinks_infobox ul li#G_backlinks_link_next  "+
    "{  "+
    "    background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANFSURBVHjaYvz//z+Da92hBE4+9mgmRgZjBgYGDiBmZGCAkv+BxP9/DH/+/bv74e3/vYyf3pcenu7ziwEKAAKIEWSAV9vRw4tzjTWZmBgF/jMwMDP8Z4CD/2D2f4bXX34zLDvzgeHFo5/frl25IXRkus9PkAxAALGACCZmRnU2FmaBq68YmJkYGcE2Ay1l+Auy+c9/hu+//zI4qPIymKuxMJz895rr/z+N9/Y5WwUPTvH+CRBATGBnMDLyAF3CzMbMxMAKFGEBGgBkMjCDzAJiJrBf/jFI8rEx+JhKMiiosHOy8HHPB+kFCCAmiAMhfgZxmEAagLpQMNCk5+++M8jz/GbQEmJkSLUUZmBmZQ4F6QEIIBZkv7Iwg0xiBIYbI8O/v//BpoHE2P4zMdx5+5/h178/DP/+/WKwVWJnYGRh+gPSBxBALDDNoLBiYWQC0v/BbEYmRkgkAMPiP8g/bEDz/gEN/gcKYyaQArDFAAHEAvUC0IcQ/4JdABUDaWZlhsUXMCT+AuWY/oPV/ofGFEAAgQ0Augws8A8W9VBZJpAl/0De+A9ODy8f3mRYPauDgYeHh0H292+O2NhpvgABBHbHv3//IZr+IzQzwJzGAHHVy4e3GQ5vWsBgamHL0D1hCsNdqeQf7OzsCwECCOyCv+A4hzj5H5puoNkMj+/dYNizbg6DppE1g759AEN6cgLDX0Y1lufvn7MBBBDUC0B/AW1uOP8LHAL/QAkJlISBpvG/vcjAe2EZwx95C4ZtAj4Mk2IDGHKi/BhOnjjO8uzPHwWAAAIb8OfPX4a/fxmACYWVwUiMCWwryEUfbh5nuLx/BsN9DnEGN/cIhjPZ7gwu3iEMp04eZ7jEGvrj7E6vpwABBA6DPz///QNmlv+/gIYcf/qX4fjzPwwnX/xluL19AcO5zzwMDG8eMDS6yDKY+CUwfLx+jGHytBn/fv9nAacDgAACu+D3j78vudmYRcp1f3EDAxGUGMBhEXzmHMP+g8cYvnz+zHDi6CGGbZvWMUycOuMfJzvr579//j0F6QUIIBZIXvjf61ZyKBCYJwyB8cEFz6rGbQyy8hrs7EBVHo6mjNd5E384FB358e/fv3MsTAzLQGoAAgwASZ8/CaV0uxQAAAAASUVORK5CYII=) no-repeat scroll center center !important;  "+
    "    cursor: pointer !important;  "+
    "    -moz-user-select : none !important;  "+
    "}  "+
    "  "+
    "a#G_backlinks_link.loading,   "+
    "div#G_backlinks_infobox ul li#G_backlinks_link_next.loading  "+
    "{  "+
    "    background: transparent url(data:image/gif;base64,R0lGODlhEAAQAPIAAP///zMzmc7O5mdnszMzmYGBv5qazKen0yH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==) no-repeat scroll center center !important;  "+
    "}  "+
    "  "+
    "div#G_backlinks_infobox ul li#G_backlinks_link_close  "+
    "{  "+
    "    background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==) no-repeat scroll center center !important;  "+
    "}  "+
    " "+
    " "+


    "";

// ===== CSS Loader =====
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}
// ===== CSS Loader =====


// ===== jQuery Loader =====
var GM_jquery_version = "1.3";

var GM_script_jquery_node = document.createElement('script');
GM_script_jquery_node.src = 'http://ajax.googleapis.com/ajax/libs/jquery/' + GM_jquery_version + '/jquery.min.js';
GM_script_jquery_node.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_script_jquery_node);

// Check if jQuery's loaded
function GM_wait() {
    // if an older (or other) version of jquery already exist in the page, we wait until our version is loaded
    if((typeof unsafeWindow.jQuery == 'undefined') || (unsafeWindow.jQuery.fn.jquery.substring(0,GM_jquery_version.length) != GM_jquery_version)) { 
        window.setTimeout(GM_wait,100); 
    } else { 
        $ = unsafeWindow.jQuery; 
        letsJQuery(); 
    }
}
GM_wait();
// ===== jQuery Loader =====

// ===== main jQuery code =====
function letsJQuery() {
    var backlinks_bag = $("<div id='G_backlinks_bag'></div>");
    var backlinks_tooltip = $("<div id='G_backlinks_tooltip'>&nbsp;</div>");
    var backlinks_infobox = $("<div id='G_backlinks_infobox'><ul></ul></div>")
    var backlinks_anchor = $("<div id='G_backlinks_anchor'><a id='G_backlinks_link'>&nbsp;</a><div id='G_backlinks_draggable'></div></div>");
    backlinks_bag.append(backlinks_tooltip);
    backlinks_bag.append(backlinks_infobox);
    backlinks_bag.append(backlinks_anchor);
    $($("body")[0]).append(backlinks_bag);
    
    $("#G_backlinks_link").css("display","none");
    $("#G_backlinks_anchor").hover(function(){
        $("#G_backlinks_link").css("display","block");
        $("#G_backlinks_anchor").addClass("G_backlinks_hover");
    },function(){
        $("#G_backlinks_link").css("display","none");
        $("#G_backlinks_anchor").removeClass("G_backlinks_hover");
    });

    function change_infobox_li(infobox_li_set) {
        infobox_li_set.hover(function() {
            var infobox = $("#G_backlinks_infobox")
            var conttop = infobox.offset().top;
            var contheight = infobox.outerHeight();
            var contmargin = infobox.find("ul").position().top;
            var thisli = $(this);
            var thislitop = thisli.offset().top;
            var contbottom = parseInt(infobox.css("bottom"));
            $("#G_backlinks_tooltip").html(thisli.attr("title"));
            var toolheight = $("#G_backlinks_tooltip").height();
            var thisliheight = thisli.height();
            var newbottom = contbottom+contheight-(thislitop-conttop)-(toolheight/2)-(thisliheight/2)-12;
            if (newbottom<5)
            {
                newbottom = 5;
            }
            $("#G_backlinks_tooltip").css("bottom",newbottom);
            $("#G_backlinks_tooltip").css("display","block");
        },function() {
            $("#G_backlinks_tooltip").css("display","none");
        });
    }
    
    function G_backlinks_link_next() {
        $("#G_backlinks_infobox").css("display","block");
        $("#G_backlinks_link_next").addClass("loading");
        var next = parseInt($("#G_backlinks_link_next").attr("next"));
        var url = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&start="+next+"&callback=?&q="+encodeURIComponent("link:"+$("#G_backlinks_link").attr("site"));
        // console.log(url);
        $("#G_backlinks_infobox").css("display","block");
        $.getJSON(
            url,
            function(data,status) {
                $("#G_backlinks_infobox").css("display","block");
                // console.log(data);
                var ul = $("#G_backlinks_infobox").find("ul");
                $("#G_backlinks_link_next").remove();
                $("#G_backlinks_link_close").remove();
                if (data.responseStatus == "200")
                {
                    // console.log(data.responseData.results);
                    $.each(data.responseData.results,function(i,result){
                        // console.log(result);
                        var li = $("<li><a></a></li>");
                        // console.log(li);
                        var a = li.find("a");
                        // console.log(a);
                        li.attr("title",result.content);
                        a.attr("href",result.unescapedUrl);
                        a.html(result.unescapedUrl);
                        // console.log(li[0]);
                        change_infobox_li(li);
                        ul.append(li);
                    });
                    var li = $("<li id='G_backlinks_link_next'>&nbsp;</li>");
                    li.attr("title","Get next links");
                    li.attr("next",next+data.responseData.results.length);
                    li.click(G_backlinks_link_next);
                    change_infobox_li(li);
                    ul.append(li);
                    li = $("<li id='G_backlinks_link_close'>&nbsp;</li>");
                    li.attr("title","Close");
                    li.click(function(){$("#G_backlinks_infobox").css("display","none");});
                    change_infobox_li(li);
                    ul.append(li);
                }
                else
                {
                    ul.append($("<li class='G_backlinks_error'>Error : <b>"+data.responseDetails+"</b></li>"));
                }
                $("#G_backlinks_link_next").removeClass("loading");
                $("#G_backlinks_infobox").css("display","block");
            }
        );
    }

    $("#G_backlinks_link").click(function() {
        $("#G_backlinks_link").addClass("loading");
        $("#G_backlinks_link").attr("site",document.location.href);
        // $("#G_backlinks_link").attr("site","http://www.google.com/");
        var url = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&callback=?&q="+encodeURIComponent("link:"+$("#G_backlinks_link").attr("site"));
        // console.log(url);
        $.getJSON(
            url,
            function(data,status) {
                // console.log(data);
                var ul = $("#G_backlinks_infobox").find("ul");
                if (data.responseStatus == "200")
                {
                    ul.html("");
                    // console.log(data.responseData.results);
                    $.each(data.responseData.results,function(i,result){
                        // console.log(result);
                        var li = $("<li><a></a></li>");
                        // console.log(li);
                        var a = li.find("a");
                        // console.log(a);
                        li.attr("title",result.content);
                        a.attr("href",result.unescapedUrl);
                        a.html(result.unescapedUrl);
                        // console.log(li[0]);
                        change_infobox_li(li);
                        ul.append(li);
                    });
                    var li = $("<li id='G_backlinks_link_next'>&nbsp;</li>");
                    li.attr("title","Get next links");
                    li.attr("next",data.responseData.results.length);
                    li.click(G_backlinks_link_next);
                    change_infobox_li(li);
                    ul.append(li);
                    li = $("<li id='G_backlinks_link_close'>&nbsp;</li>");
                    li.attr("title","Close");
                    li.click(function(){$("#G_backlinks_infobox").css("display","none");});
                    change_infobox_li(li);
                    ul.append(li);
                }
                else
                {
                    ul.html("<li class='G_backlinks_error'>Error : <b>"+data.responseDetails+"</b></li>");
                }
                // alert("Data loaded : " + data);
                $("#G_backlinks_link").removeClass("loading");
                $("#G_backlinks_infobox").css("display","block");
            }
        );
    });
    
    // $("#G_backlinks_infobox").click(function() {
    //     $("#G_backlinks_infobox").css("display","none");
    // });
    
    change_infobox_li($("#G_backlinks_infobox li"));
    $('#G_backlinks_draggable').attr("move","no");
    $('#G_backlinks_draggable').click(function() {
        if ($('#G_backlinks_draggable').attr("move")=="yes")
        {
            $('#G_backlinks_draggable').attr("move","no");
            $(this).removeClass("G_backlinks_draggable_move");
            $("body").css("cursor","");
        }
        else
        {
            $('#G_backlinks_draggable').attr("move","yes");
            $(this).addClass("G_backlinks_draggable_move");
            $("body").css("cursor","move");
        }
    })
    $("body").mousemove(function(e){
        if ($('#G_backlinks_draggable').attr("move")=="yes")
        {
            $('#G_backlinks_anchor').css("right","");
            $('#G_backlinks_anchor').css("left",e.clientX-$('#G_backlinks_anchor').width()/2);
        }
    });

}
// ===== main jQuery code =====


