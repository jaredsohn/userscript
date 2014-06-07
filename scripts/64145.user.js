// ==UserScript==
// @name           francotirador
// @namespace      francotirador
// @description    francotirador
// @include        http://www.frecuencialatina.com*
// ==/UserScript==
function fnLoad() {
    //var strFlashVideoPlayer = "http://www.frecuencialatina.com/www/flv/flvplayer.swf";
    //var strFlashVideoPlayer = "http://player.longtailvideo.com/player.swf";
    //var strFlashVideoPlayer = "http://as3flvplayer.sourceforge.net/lib/fPlayer/fPlayerIn.swf";
    var strFlashVideoPlayer = "http://flowplayer.org/swf/flowplayer-3.1.5.swf";

    if (window.location.href == "http://www.frecuencialatina.com.pe/noticias/el_francotirador/videos.php") {
        document.getElementsByTagName("iframe")[0].width = "500";
        document.getElementsByTagName("iframe")[0].scrolling = "auto";
    } else {
        document.getElementsByTagName("table")[0].rows[0].cells[0].setAttribute("background", "");
        document.getElementsByTagName("table")[0].rows[0].cells[0].style.backgroundColor = "#FFFFFF";
        var oProgramas = document.getElementsByClassName("verdana9gr");
        var oPartes = "";
        var strVideo = "";
        var strPlayList = "";

        for (var i = 0; i < oProgramas.length; i++) {
            oPartes = oProgramas[i].parentNode.getElementsByTagName("label");
            strPlayList = "";

            for (var j = 0; j < oPartes.length; j++) {
                strVideo = "";
                oPartes[j].title = oPartes[j].getAttribute("onclick");
                strVideo = oPartes[j].title;

                if (strVideo !== "") {
                    strVideo = strVideo.substr(strVideo.indexOf(String.fromCharCode(39)) + 1);
                    strVideo = "http://www.frecuencialatina.com/www/flv/" + strVideo.substring(0, strVideo.indexOf(String.fromCharCode(39)));
                    oPartes[j].style.cursor = "pointer";
                    oPartes[j].title = '<embed width="520" height="260" flashvars="overstretch=fit&file=' + strVideo + '&width=320&height=260&autostart=true&playlist=right&playlistsize=200" allowfullscreen="true" quality="high" src="' + strFlashVideoPlayer + '" type="application/x-shockwave-flash"/>';
                    oPartes[j].setAttribute("onclick", "this.parentNode.parentNode.getElementsByTagName('p')[0].innerHTML=this.title;");
                    strPlayList += "{'url':'" + strVideo + "'},";
                }
            }

            strPlayList = strPlayList.substring(0,strPlayList.length-1);
            oProgramas[i].innerHTML = '<a href="javascript:void(document.getElementById(\'player' + i + '\').style.display=\'\') ">' + oProgramas[i].innerHTML + '</a>';
            oProgramas[i].parentNode.parentNode.cells[1].innerHTML += "<br/><p id=\"player" + i + "\" style=\"display:none;width:320px;height:260px;background-color:#000000;\"><embed width=\"320\" height=\"260\" flashvars=\"config={'clip':{'url':'http://flowplayer.org/video/flowplayer-700.flv'},'playlist':[" + strPlayList + "],'plugins':{'controls':{'playlist':true,'url':'flowplayer.controls-tube-3.1.5.swf','backgroundColor':'#c0c0c0'}},'playerId':'player'}\" allowfullscreen=\"true\" quality=\"high\" src=\"http://flowplayer.org/swf/flowplayer-3.1.5.swf\" type=\"application/x-shockwave-flash\"/></p>";
        }

    }
}

fnLoad();