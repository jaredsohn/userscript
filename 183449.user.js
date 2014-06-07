// ==UserScript==
// @name           nPrev V3
// @description    nCore image preview V3
// @author         Lovi
// @include        https://ncore.cc/torrents.php*
// @version        3.0
// @require	   http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

$(document).ready(function()
{

    var width = document.width;
    var height = window.innerHeight;

    $("body").append('<div id="shadow"  onclick="$(\'#shadow\').hide();" style="overflow: auto; background: rgba(0, 0, 0, 0.75); display: none; position: fixed; top: 0px; bottom: 0px; right: 0px; left: 0px;"><div id="shadowcontent" style="overflow: hidden; text-align: center; padding-top: 20px;"></div></div>');

    $(".lista_all").before('<div id="imagepreview" style="background-color: #616161;margin: 8px;border: 1px solid #828282;"></div>');
    $(".infobar img").each(function(){
        var src = $(this).attr("onmouseover").substr(7);
        src = src.substr(0, src.indexOf("'"));
	var onmouseout = $(this).attr("onmouseout");
        var id = onmouseout.substr(14, 7);
	if (id.indexOf("'") > -1)
	{
	    id = id.substr(0, 6);
	}
        $("#imagepreview").append(
 '<div onmouseover="document.getElementById(\'imagesid_' + id + '\').style.display = \'block\';" onmouseout="document.getElementById(\'imagesid_' + id + '\').style.display = \'none\';" style="display: inline-block; width: 180px; height: 155px; background: #000 url(' + src + ') no-repeat center center; background-size: auto 155px;">'
+'    <img onload="this.style.marginLeft = 0-(this.width-(155+18))/2 +\'px\';this.style.marginTop = \'-\'+ (this.height-149)/2 +\'px\';" id="imagesid_' + id + '" src="' + src + '" alt="" style="max-height: 300px; max-width: 300px; display: none; position: absolute; border: 3px solid #000; cursor: pointer;" />'
+'    <div style="display: none;" id="hiddendetails_' + id + '">'
+'    </div>'
+'</div>');

        document.getElementById('imagesid_' + id).addEventListener('click', function(){
            $("#hiddendetails_" + id).load("https://ncore.cc/ajax.php?action=torrent_drop&id=" + id, function(){ 
                $("#shadowcontent").html('<a href="torrents.php?action=download&id=' + id + '">Letölt</a> | <a href="torrents.php?action=details&id=' + id + '">Adatlap</a><br /><br />');
                $("#hiddendetails_" + id + " .torrent_kep_ico a").each(function(){
                    $("#shadowcontent").append('<a href="' + $(this).attr("href") + '"><img src="' + $(this).attr("href") + '" style="width: 31%; margin-left: 20px; margin-bottom: 20px;" /></a>');
                });
                $("#shadowcontent").append('<br />');
                $("#hiddendetails_" + id + " a").each(function(){
                    if ($(this).text() == "Csatolt kép megnyitása")
                    {
                        $("#shadowcontent").append('<a href="' + $(this).attr("href") + '"><img src="' + $(this).attr("href") + '" style="height: ' + (height - 380) + 'px; margin-left: 20px;" /></a>');
                    }
                });
                $("#shadowcontent a:first-child img").css("margin-left: 0px;");
                $("#shadow").show();
            });
        }, true);

    });

});