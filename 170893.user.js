// ==UserScript==
// @name		MagnoVideo Downloader
// @version		1.1
// @description	Allows you to download videos from MagnoVideo via the Download button at the upper right corner of the player
// @match		http://www.magnovideo.com/?v=*
// @copyright	2013 tfeserver
// @icon		http://www.magnovideo.com/templates_mv/images/favicon.ico
// ==/UserScript==

if(!document.querySelector('embed'))
{
    document.querySelector('.table-headings a').click()
}
else
{
    var  confUrl = document.querySelector('embed').getAttribute('flashvars').replace('config=','')
    console.log("Fetch conf: "+confUrl);
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = process;
    xhr.open("GET", confUrl, true);
    xhr.send();
}

function process()
{
    if (xhr.readyState == 4) {
        resp = xhr.responseText;
        
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
        li.innerHTML='<a href="'+dl+'" download="'+document.title+'.avi">DOWNLOAD</a>'
        document.querySelector('#navigation  .shell ul').appendChild(li);
  }
}