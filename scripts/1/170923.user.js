// ==UserScript==
// @name		SeriesYonkis Downloader
// @version		1.0
// @description	Descargar facilmente series desde SeriesYonkis sin esperar
// @match		http://www.seriesyonkis.com/*
// @match		http://www.magnovideo.com/?v=*
// @copyright	2013 tfeserver
// @icon		http://s.staticyonkis.com/favicon.ico
// ==/UserScript==

if(/seriesyonkis.com/.test(location.href))
{
    // Pagina serie, lista de capitulos
    if(/serie/.test(location.href))
    {
        var links = document.querySelectorAll('.episode-title a');
        var len=links.length;
        console.log('encontrados '+len+' enlaces.');
        for(i=0; i<len; i++)
        {
            var a = document.createElement('span');
            a.setAttribute('style','float:left;cursor:pointer');
            a.innerHTML='[ descarga directa <img src="http://www.magnovideo.com/templates_mv/images/favicon.ico" alt="Magno video dl" />]';
            a.href=links[i].href;
            a.addEventListener('click', function()
            {
                this.innerHTML='Cargando...';
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = processSerie;
                xhr.open("GET", this.href, true);
                xhr.send();
            });
            links[i].parentNode.insertBefore(a,links[i].parentNode.firstChild);
        }
    }
    
    function processSerie()
    {
        if (this.readyState == 4) {
            resp = this.responseText;
            m=resp.match(/<a href="([^"]+)"[^>]+><span class="server magnovideo"/);
            if(!m)
            {
                return alert('Cannot find MagnoVideo Link...');
            }
            var magnoVideo = m[1];
            console.log('Series  link:'+magnoVideo);
            
             var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = processMagno;
                xhr.open("GET", magnoVideo, true);
                xhr.send();
            
        }
    }
    
    function processMagno()
    {
        console.log(this.readyState);
        if (this.readyState == 4) {
            resp = this.responseText;
            m=resp.match(/"([^"]+)" target="_blank">\s+Reproducir ahora/);
            console.log(m);
            var magnoVideo = m[1];
            console.log('Magno video link:'+magnoVideo);
            
            var ifr= document.createElement('iframe');
            ifr.src=magnoVideo;
            ifr.style='display:none';
            document.body.appendChild(ifr);
        }
    }
}

else if(/magnovideo.com/.test(location.href))
{
    console.log('Inside Magno Video');
    if(!document.querySelector('embed'))
    {
        console.log('Skip premium ad');
        document.querySelector('.table-headings a').click()
    }
    else
    {
        console.log('Get download uri');
        var  confUrl = document.querySelector('embed').getAttribute('flashvars').replace('config=','')
        console.log("Fetch conf: "+confUrl);
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4) {
                resp = this.responseText;
                
                var m = resp.match(/<storage_path>([^<]+)</);
                var host = m[1];
                var last = GM_getValue('replaceServer');
                if(last)
                {
                	host=host.replace('e1.','s1.');
                    last=0;
                }
                else
                {
                    last=1;
                }
                GM_setValue('replaceServer',last);
                
                
                var path = resp.match(/<first_frame>([^<]+)</); 
                path = path[1].replace(/http:\/\/[^\/]+/,'').replace(/[^\/]+\/[^\/]+$/,'');
                
                var m = resp.match(/<video_name>([^<]+)</);
                var videoname = m[1];
                
                var m = resp.match(/<movie_burst>([^<]+)</);
                var burst = m[1];
                
                var m = resp.match(/<burst_speed>([^<]+)</);
                var speed = m[1];
                
                var m = resp.match(/<ste>([^<]+)</);
                var ste = m[1];
                
                var dl= host+path+videoname+'?burst='+burst+'k&u='+speed+'k&'+ste;
                
                var li = document.createElement('li');
                li.innerHTML='<a id="direct_dl" href="'+dl+'" download="'+document.title+'.avi">DOWNLOAD</a>'
                document.querySelector('#navigation  .shell ul').appendChild(li);
                
                console.log(dl);
                document.querySelector('#direct_dl').click();
            }
        };
        xhr.open("GET", confUrl, true);
        xhr.send();
    }
   
}