// ==UserScript==
// @name       DPStream.TV lien rapide
// @namespace  http://korri.fr/
// @version    0.4
// @description  Faster link access on DPStream.TV
// @match      http://www.dpstream.tv/mylink.php*
// @match      http://www.dpstream.tv/w.php*
// @copyright  2013+, Korri
// ==/UserScript==
if(document.location.href.match('mylink.php')) {
    var href = document.location.href.replace('mylink.php?v=', 'w.php?w=');
    var divs = document.getElementsByTagName('div');
    if(divs && divs.length > 0) {
        divs[0].innerHTML = '<iframe ALLOWTRANSPARENCY="true" style="width: 100%; height: 50px; border: none; background: transparent; overflow: hidden" src="' + href + '"></iframe>';
    }
}else {
    document.body.style.backgroundColor = 'transparent';
    document.body.style.textAlign = 'center';
    document.body.innerHTML = '<div id="movieL">Veuillez patienter</div>';
    loadMovie = function(){
        var real_count = (count + 4) / 2;
        if (real_count > 1) {
            s = 'secondes';
        }else{
            s = 'seconde';
        }
        if(real_count == Math.floor(real_count)) {
            real_count = String(real_count) + '.0';
        }
        if(count>-4){
            count--;
            document.getElementById('movieL').innerHTML = 'Veuillez patienter '+(real_count)+' '+s;
            setTimeout(loadMovie,500);
        }
        else{
            xhRequest("secur.php",function(res){
                var urls = res.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/ig);
                if(urls && urls.length > 0) {
                    document.body.innerHTML = '<a style="kword-wrap: break-word;" href="' + urls[0] + '">'+urls[0]+'</a>';
                }else {
            		document.getElementById('movieL').innerHTML = 'Bientôt...' + --count;
                    setTimeout(loadMovie,500);
                }
            },"k="+k);
        }
    }
}