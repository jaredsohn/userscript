// ==UserScript==
// @name      mhkgolden
// @version    0.8 
// @author	    
// @description  mhkgolden  
// @match      http://*.hkgolden.com/*
// @include        http://*.hkgolden.com/*
// @copyright  2012, apple_W
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://tstranslate.googlecode.com/files/TSSelect.js
// ==/UserScript==





if(document.location.href.indexOf('view.aspx')!=-1)
{
    
    
    
    tsPage(1);
    var loadimg=false;
    for (i=0;i<document.getElementsByClassName('Image').length;i++){
        
        
        
        if(document.getElementsByClassName('Image')[i].alt.search('imageshack')!=-1)
        {
            //alert('黃娃');
            document.getElementsByClassName('Image')[i].alt= document.getElementsByClassName('Image')[i].alt.replace('[img]', "");
            document.getElementsByClassName('Image')[i].alt=   document.getElementsByClassName('Image')[i].alt.replace('[/img]', "");
            document.getElementsByClassName('Image')[i].alt= document.getElementsByClassName('Image')[i].alt.replace('[IMG]', "");
            document.getElementsByClassName('Image')[i].alt=   document.getElementsByClassName('Image')[i].alt.replace('[/IMG]', "");
            document.getElementsByClassName('Image')[i].alt=   document.getElementsByClassName('Image')[i].alt.replace('http://', "");
            //document.getElementsByClassName('Image')[i].src= 'http://a'+link1.substring(link1.indexOf('.')); 
            document.getElementsByClassName('Image')[i].src='http://a.'+document.getElementsByClassName('Image')[i].alt;
            // window.open(document.getElementsByClassName('Image')[0].src,"_blank");
        }else if(document.getElementsByClassName('Image')[i].alt.search('http')==-1) 
        {
            document.getElementsByClassName('Image')[i].alt= document.getElementsByClassName('Image')[i].alt.replace('[img]', "");
            document.getElementsByClassName('Image')[i].alt=   document.getElementsByClassName('Image')[i].alt.replace('[/img]', "");
            document.getElementsByClassName('Image')[i].alt= document.getElementsByClassName('Image')[i].alt.replace('[IMG]', "");
            document.getElementsByClassName('Image')[i].alt=   document.getElementsByClassName('Image')[i].alt.replace('[/IMG]', "");
            document.getElementsByClassName('Image')[i].alt='http://'+document.getElementsByClassName('Image')[i].alt;
            document.getElementsByClassName('Image')[i].setAttribute('onclick',"javascript: ViewImage(this,'"+document.getElementsByClassName('Image')[i].alt+"')");
            document.getElementsByClassName('Image')[i].click();
        }
        else if (document.getElementsByClassName('Image')[i].alt.search('圖片')!=-1)
        {
            //document.getElementsByClassName('Image')[i].style.display='none';
            // var text=document.createTextNode('[img]圖片網址[img]');
            //document.getElementsByClassName('Image')[i].parentNode.appendChild(document.createTextNode('[img]圖片網址[img]'));
            document.getElementsByClassName('Image')[i].parentNode.replaceChild(document.createTextNode('[img]圖片網址[img]'),document.getElementsByClassName('Image')[i]);
            i--;
        }else
        {
            
            document.getElementsByClassName('Image')[i].click();
        }
        var img =document.createElement('img');
        img.src='http://m.hkgolden.com/images/image.gif';
        img.alt=i;
        img.setAttribute("onclick","document.getElementsByClassName('Image')[this.alt].style.display = (document.getElementsByClassName('Image')[ this.alt].style.display != 'none' ? 'none' : '' )");
        
        document.getElementsByClassName('Image')[i].outerHTML=document.getElementsByClassName('Image')[i].outerHTML+img.outerHTML;
        document.getElementsByClassName('Image')[i].setAttribute('onclick',"window.open(this.src);");
        //document.getElementsByClassName('Image')[i].onclick=function () {window.open(this.src);};
    }
    
    var element = document.createElement("input");
    //Assign different attributes to the element. 
    element.type = 'button';
    element.value = '載入圖片:'+document.getElementsByClassName('Image').length+'(隱藏圖片)'; 
    element.name = 'mybutton01';  
    
    element.onclick = function() { 
        for ( var i=0; i < document.getElementsByClassName('Image').length; i++ ) {
            close='載入圖片:'+document.getElementsByClassName('Image').length+'(顯示圖片)';
            open='載入圖片:'+document.getElementsByClassName('Image').length+'(隱藏圖片)';
            (document.getElementsByClassName('Image')[i]).style.display = ((document.getElementsByClassName('Image')[i]).style.display != 'none' ? 'none' : '' );
        }
        element.value =(element.value !=open?open:close);
    };
    var  flotta= document.getElementsByClassName('ViewTitle')[0];
    flotta.appendChild(element);
    for (i=0;i<document.getElementsByClassName('ReplyBox').length;i++){
        for (o=0;o<document.getElementsByClassName('ReplyBox')[i].getElementsByTagName('div')[3].getElementsByTagName('a').length;o++){
            if(document.getElementsByClassName('ReplyBox')[i].getElementsByTagName('div')[3].getElementsByTagName('a')[o].href.search('youtube')!=-1)
            {
                //alert('have youtube');
                var youtubelink=document.getElementsByClassName('ReplyBox')[i].getElementsByTagName('div')[3].getElementsByTagName('a')[o].href;
                var youtubecode=youtubelink.substring(youtubelink.search('v=')+2);
                //alert(youtubecode);
                if(youtubecode.search('&')!=-1)
                {
                    youtubecode=youtubecode.substring(0,youtubecode.search('&'));
                    //alert(youtubecode);
                }
                var iframe = document.createElement("iframe");
                iframe.class= "youtube-player";
                
                
                iframe.type="text/html";
                iframe.width="640";
                iframe.height="385";
                iframe.frameborder="1";
                iframe.src = 'http://www.youtube.com/embed/'+youtubecode;
                var youtubeElement=document.getElementsByClassName('ReplyBox')[i].getElementsByTagName('div')[3].getElementsByTagName('a')[o];
                
                youtubeElement.appendChild(document.createElement("br"));
                youtubeElement.appendChild(iframe);
            }
        }
        
    }}
document.addEventListener("keydown",function (event) {
    //39next
    //37back
    //alert(event.keyCode); 
    if(document.location.href.indexOf('view.aspx')!=-1)
    {
        if(document.location.href.substring(document.location.href.lastIndexOf('&')+1).indexOf('page')!=-1)
        {
            var page=document.location.href.substring(document.location.href.lastIndexOf('&page')+6);
            var finalpage =document.getElementsByTagName('select')[0].options[document.getElementsByTagName('select')[0].options.length-2].value;
            if(event.keyCode==39)
            {
                if(page>=10)
                {
                    document.location.href= document.location.href.substring(0,document.location.href.length-2)+parseInt(parseInt(page)+1);
                }
                else if (page==finalpage)
                {
                    //alert('最尾');
                }
                else
                    document.location.href= document.location.href.substring(0,document.location.href.length-1)+parseInt(parseInt(page)+1);
            }
            else if (event.keyCode==37)
            {
                if(page>=10)
                    document.location.href= document.location.href.substring(0,document.location.href.length-2)+(page-1);
                else if(page==1)
                {
                }
                else
                    document.location.href= document.location.href.substring(0,document.location.href.length-1)+(page-1);
            }
        }
        else
        {
            var page=1; 
            if(event.keyCode==39)
                
                
                document.location.href= document.location.href+'&page=2';
            
            
        }
        
    }
    
}, false); 


var PageSelectPanel =document.getElementsByClassName('View_PageSelectPanel')[0];
var thread=document.createElement('select');
var forumserver=document.createElement('select');
forumserver.innerHTML="<option selected='selected' value=''>請選擇伺服器</option><option value='m'>Mforum</option><option value='forum1'>forum1</option><option value='forum2'>forum2</option>      <option value='forum3'>forum3</option>         <option value='forum4'>forum4</option>         <option value='forum5'>forum5</option>         <option value='forum6'>forum6</option>         <option value='forum7'>forum7</option>         <option value='forum8'>forum8</option>         <option value='forum9'>forum9</option>         <option value='forum10'>forum10</option>         <option value='forum11'>forum11</option>         <option value='forum12'>forum12</option>         <option value='forum101'>forum101</option>";
thread.innerHTML="<option selected='selected' value=''>請選擇討論區</option><option value='ET'>娛樂台</option><option value='CA'>時事台</option><option value='FN'>財經台</option><option value='GM'>遊戲台</option>         <option value='HW'>硬件台</option>        <option value='IN'>寬頻台</option>         <option value='SW'>軟件台</option>         <option value='MP'>手機台</option>         <option value='SP'>體育台</option>         <option value='LV'>感情台</option>         <option value='SY'>講故台</option>         <option value='ED'>飲食台</option>         <option value='TR'>旅遊台</option>         <option value='CO'>潮流台</option>         <option value='AN'>動漫台</option>         <option value='TO'>玩具台</option>         <option value='MU'>音樂台</option>         <option value='VI'>影視台</option>         <option value='DC'>攝影台</option>         <option value='ST'>學術台</option>         <option value='TS'>汽車台</option>         <option value='RA'>電　台</option>         <option value='MB'>站務台</option>         <option value='AC'>自組活動台</option><option value='EP'>創意台</option>         <option value='BW'>吹水台</option>";
thread.setAttribute("onchange","window.location.href='http://m.hkgolden.com/topics.aspx?type='+this.value;");
forumserver.setAttribute("onchange","window.location.hostname=this.value+'.hkgolden.com';");
forumserver.setAttribute("style","margin-bottom: 3px;");
thread.setAttribute("style","margin-bottom: 3px;");
if(document.location.href.indexOf('view.aspx')!=-1)
{
    
    PageSelectPanel.appendChild(thread);
    PageSelectPanel.appendChild(forumserver);
}else  if(document.location.href.indexOf('topics.aspx')!=-1)
{
    document.getElementsByClassName('TopicTitle')[0].appendChild(thread);
    document.getElementsByClassName('TopicTitle')[0].appendChild(forumserver);
}

setTimeout(
    function adblock() {
        var ad0=document.getElementsByTagName('div')[6].getElementsByClassName('ReplyFunc');
        var ad1=document.getElementsByTagName('div')[6].getElementsByClassName('TopicAd');
        if(document.location.href.indexOf('topics.aspx')!=-1){
            while (document.getElementsByTagName('div')[6].getElementsByClassName('TopicAd').length>=0)
            {
                
                for (i=0;i<=ad1.length;i++){
                    
                    var ad=document.getElementsByTagName('div')[6].getElementsByClassName('TopicAd');
                    //alert(ad.length);
                    ad[0].parentNode.removeChild(ad[0]);
                }
                void(0); 
            }
        }
        else if(document.location.href.indexOf('view.aspx')!=-1)
        {
            while (document.getElementsByTagName('div')[6].getElementsByClassName('ReplyFunc').length>=0)
            {
                
                for (i=0;i<=ad0.length;i++){
                    
                    var ad=document.getElementsByTagName('div')[6].getElementsByClassName('ReplyFunc');
                    //alert(ad.length);
                    ad[0].parentNode.removeChild(ad[0]);
                }
                void(0); 
            }
        }
        
    },170);


/*
function loadjscssfile(filename, filetype){
if (filetype=="js"){ //if filename is a external JavaScript file
var fileref=document.createElement('script')
fileref.setAttribute("type","text/javascript")
fileref.setAttribute("src", filename)
}
else if (filetype=="css"){ //if filename is an external CSS file
var fileref=document.createElement("link")
fileref.setAttribute("rel", "stylesheet")
fileref.setAttribute("type", "text/css")
fileref.setAttribute("href", filename)
}
if (typeof fileref!="undefined")
document.getElementsByTagName("head")[0].appendChild(fileref)
}*/