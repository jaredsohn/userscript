// ==UserScript==
// @name       	        SkyDrive_Music_Link_Fetcher
// @namespace           http://skydrive.live.com
// @description	        fetching out fixed link of music on SkyDrive for online music playing
// @include    	        https://skydrive.live.com/*
// @grant    	        GM_xmlhttpRequest
// @version    	        0.1.4
// ==/UserScript==
document.addEventListener('DOMContentLoaded', function(event){
    setTimeout(
        function(){
            var c_header = document.getElementById('c_header');
            if(c_header){
                var newnode = document.createElement('li');
                newnode.innerHTML = '<a href=\"#\"><span>Click me!</span></a>';
                var container = c_header.getElementsByTagName('ul')[0];
                container.appendChild(newnode);
            }
        }
    ,0);
}, false);

document.addEventListener('click', function(event) {
    if (event.target.innerHTML == 'Click me!'){
        var URL;
		 var flag = 0;
        if(document.URL.indexOf('#') > -1 && document.URL.indexOf('#') < document.URL.length-1){
            URL = "https://skydrive.live.com/?" + document.URL.split('#')[1];
        }
        else{
            URL = document.URL;
        }
        setTimeout(
            function Fetch(addr){
                GM_xmlhttpRequest({
                    method: "GET",
                    headers: {
                        'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
                        'Accept': 'application/atom+xml,application/xml,text/xml'
                        //'Cookie': document.cookie
                       },
                    url: addr?addr:URL,
                    onreadystatechange: function(response){
                        var state = response.readyState;
                        if(state != 4)
                            event.target.innerHTML = 'Fetching...';
                        else
                            event.target.innerHTML = 'Click me!';
                    },
                    onload: function(response){
                        var content = response.responseText;
                        try{
                            var html = ""; 
                            var resid_raw = content.match(/"extension"\:"(.*?)".*?"Audio","id"\:"(.*?)".*?"name"\:"(.*?)".*?"parentId"\:"(.*?)",/g);
                            if(resid_raw == null)
                                {
                                html += "<p>Make sure you have opened the right page.</p>";
                                }
                            else
                                {
                                var parentid = resid_raw[0].match(/"parentId"\:"(.*?)",/)[1];
                                if(flag == 0 && URL.indexOf(parentid) == -1){
                                    flag = 1;
                                    Fetch(URL.replace(/\&id=.*?$/,"&id="+parentid));
                                    throw "not a folder"
									}
                                var addr = new Array();
                                html += "<p>" + resid_raw.length + " song" + ((resid_raw.length == 1)?"":"s") + " found:</p>";
                                for (var i = 0; i < resid_raw.length; i++)
                                    {
                                    var tmp = resid_raw[i].match(/"extension"\:"(.*?)".*?"Audio","id"\:"(.*?)".*?"name"\:"(.*?)",/);                            
                                    addr.push("http://storage.live.com/items/" + tmp[2] + "?filename=" + encodeURI(tmp[3]) + tmp[1]);
                                    html += "<a href=\"" + addr[i] + "\">" + tmp[3] + tmp[1] + "</a><br/>";
                                    }
                                }
                            sAlert(html);
                           }
                        catch(err)
                           {
                        if(err != 'not a folder')
                            console.log(err);
                           }
                    }
                });
            },
            0);
        event.stopPropagation();
        event.preventDefault();
    }
    //event.stopPropagation();
    //event.preventDefault();
}, true);

function insertCss(css){
         var style = document.createElement("style");
         style.type = "text/css";
         style.innerHTML = css;
         document.getElementsByTagName("HEAD").item(0).appendChild(style);
}

function sAlert(str){ 
     var bgDivClass = "#bgDiv {position: absolute;top: 0px;background: #777;opacity: 0.6;left: 0px;width: " + document.documentElement.clientWidth + "px;height: " + document.documentElement.clientHeight +"px;z-index: 10000;}";
     var msgDivClass = "#msgDiv {background: white;border: 1px solid #369;position: absolute;left: 50%;top: 50%;font: 12px/25px Verdana, Geneva, Arial, Helvetica, sans-serif;line-height: 25px;margin-left: -225px;margin-top: -225px;width: 400px;text-align: center;z-index: 10001;border-radius: 6px;box-shadow: 2px 2px 10px #06C;}";
     var msgTitleClass = "#msgTitle {margin: 0px;padding: 3px;background: #369;opacity: 0.75;border: 1px solid #369;height: 18px;font: 12px Verdana, Geneva, Arial, Helvetica, sans-serif;color: white;cursor: pointer;}";
     insertCss(bgDivClass + msgDivClass + msgTitleClass);
     var bgObj = document.createElement("div"); 
     bgObj.setAttribute('id','bgDiv'); 
     document.body.appendChild(bgObj); 
     var msgObj = document.createElement("div") 
     msgObj.setAttribute('id','msgDiv'); 
     msgObj.setAttribute('align','center'); 
     var title = document.createElement('h4'); 
     title.setAttribute('id','msgTitle'); 
     title.setAttribute('align','right'); 
     title.innerHTML = 'x Close'; 
     title.onclick = function(){ 
          document.body.removeChild(bgObj); 
          document.getElementById('msgDiv').removeChild(title); 
          document.body.removeChild(msgObj); 
        } 
     document.body.appendChild(msgObj); 
     document.getElementById('msgDiv').appendChild(title); 
     var result = document.createElement("div"); 
     result.style.margin = '1em 0' 
     result.setAttribute('id','result'); 
     result.innerHTML = str; 
     document.getElementById('msgDiv').appendChild(result); 
} 