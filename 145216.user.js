// ==UserScript==
// @name utube 
// @version 0.1.0.6
// @description down youtube url
// @include http://*.youtube.com/watch*
// @include https://*.youtube.com/watch*
// ==/UserScript==



do_it=  function() {
	URLscript=document.createTextNode(doAtStart +"\n doAtStart();");
    var Uscript = document.createElement('script');
    Uscript.setAttribute('language','javascript');
    Uscript.setAttribute('id','utube');
    document.body.appendChild(Uscript);
    document.getElementById('utube').appendChild(URLscript);
    
    
};


function doAtStart(){
    youurls=eval("[{"+ytplayer.config.args.url_encoded_fmt_stream_map.replace(/,/g,"\"}{").replace(/=/g,":\"").replace(/&/g,"\",").replace(/}{/g,"},{")+"\"}]");
    decodeURIComponent(youurls[0].url);
    var togdiv = document.createElement('div');
    
    thehtml="";
    thehtml='<style type="text/css">table td, table th{    padding: 3px; }</style><table style="text-align:center;"  dir="rtl"><tbody><tr><th>איכות</th><th>פורמט</th><th>קישור</th></tr>';
    for (uurl in youurls){
        thehtml+="<tr><td>"+decodeURIComponent(youurls[uurl].quality)+"</td><td>"+decodeURIComponent(youurls[uurl].type)+"</td><td><a href=\""+decodeURIComponent(youurls[uurl].url)+"&signature="+youurls[uurl].sig+"&title="+encodeURIComponent(document.title)+"\">להורדה</a></td></tr>";
        
    }
    thehtml+='</tbody></table>';
    //download.
    if (document.getElementById("watch-headline")){
        togdiv.setAttribute('id','togdiv');
        togdiv.setAttribute('hidden','');
        togdiv.setAttribute('class','yt-uix-slider yt-rounded');
        togdiv.setAttribute('style','background: rgba(0, 0, 0, .02);height: 130px; border: 1px solid silver; padding: 5px; overflow-x: hidden; overflow-y: auto; ');
        togdiv.innerHTML=thehtml;
        document.getElementById("watch-headline").appendChild(togdiv);
        var bat = document.createElement('button');
        bat.setAttribute('class','yt-uix-button yt-uix-button-default yt-uix-expander-collapsed');
        bat.setAttribute('onclick','togdiv.hidden=!togdiv.hidden');
        bat.innerHTML='הורדות';
        document.getElementById("watch-headline-user-info").appendChild(bat);
    }
    if (document.getElementById("watch7-action-buttons")){
        //'<button type="button" class="action-panel-trigger yt-uix-button yt-uix-button-text yt-uix-button-toggled" onclick=";return false;" data-button-toggle="true" data-trigger-for="action-panel-download" role="button"><span class="yt-uix-button-content">הורדות</span></button>'
        togdiv.setAttribute('id','action-panel-download');
        togdiv.setAttribute('class','action-panel-content hid');
        togdiv.setAttribute('data-panel-loaded','true');
        togdiv.innerHTML=thehtml;
        document.getElementById("watch7-action-panels").appendChild(togdiv);
        var bat = document.createElement('button');
        bat.setAttribute('class','action-panel-trigger yt-uix-button yt-uix-button-text');
        bat.setAttribute('onclick',';return false;');
        bat.setAttribute('data-button-toggle','true');
        bat.setAttribute('data-trigger-for','action-panel-download');
        bat.setAttribute('role','button');
        bat.innerHTML='<span class="yt-uix-button-content">הורדות</span>';
        document.getElementById('watch7-secondary-actions').insertBefore(bat,document.getElementById('watch7-secondary-actions').children[3]);
        
        //document.getElementById("watch7-secondary-actions").appendChild(bat);
        
        
    }
    
}
do_it();