// ==UserScript==
// @name         LibraryPan
// @namespace     http://www.warmtoyou.com/download/
// @description   find the more information from ishare & pan.baidu.com & 115.com and other use the custom google search
// @include       http://opac.lib.szu.edu.cn/opac/bookinfo.aspx*
// ==/UserScript==



//test the inner funciton exsit ? 

if(!GM_xmlhttpRequest){
	alert("请升级最近版本的 Greasemonkey  ^~~~^ ");
    return 0;
}

//test the architecture if exist

pdfString ='data:image/gif;base64,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'

cc = xpath('//a[@href]');
tempUrl = cc.snapshotItem(cc.snapshotLength-4)
trueName = cc.snapshotItem(cc.snapshotLength-3)['href'].split('q=')[1];
tempUrlGet = tempUrl['href'].split('wd=')[1];

getFromSina(tempUrlGet);


function getFromSina(key){
    GM_xmlhttpRequest({
       url : "http://ishare.iask.sina.com.cn/search.php?key="+key+'&format=txt%7Edoc%7Epdf%7Eppt%7Ehtm%7Erar',         
       method :"GET",        
        headers:{"User-Agent":"Mozilla/5.0 (Windows NT 6.1; rv:28.0) Gecko/20100101 Firefox/28.0",
                  "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
				  "Referer":"http://ishare.iask.sina.com.cn/",
				  "Host":"ishare.iask.sina.com.cn"
				  },
        onload: function(responseDetails) {            
            tempConetent =responseDetails.responseText;
            if(tempConetent.indexOf("checkticket")>0){
               processVerify(key);
            }else{
               processHtml(responseDetails.responseText,trueName);
            
            }          
            }
    });
    
    
}

function processVerify(key){
    url= "http://ishare.iask.sina.com.cn/search_ishare_engine_checkticket.php?referer="+key;
    img=document.createElement('img');
    img.src = 'data:image/gif;base64,R0lGODlhDQAOAJEAANno6wBmZgAAAAAAACH5BAAAAAAA'+
    'LAAAAAANAA4AQAIjjI8Iyw3GhACSQecutsFV3nzgNi7SVEbo06lZa66LRib2UQAAOw%3D%3D';
    var logo = document.createElement("div");
    logo.innerHTML = '<img src=data:image/gif;base64,R0lGODlhDQAOAJEAANno6wBmZgAAAAAAACH5BAAAAAAALAAAAAANAA4AQAIjjI8Iyw3GhACSQecutsFV3nzgNi7SVEbo06lZa66LRib2UQAAOw%3D%3D>'+'<a target="_blank" href='+url+'>'+'<red>如果要电子版请点击</red></a>'
    var relateResource = document.getElementById("erdiv");
    relateResource.parentNode.insertBefore(logo,relateResource.nextSibling);     
    console.log('holly shit');
}

function processHtml(theHtml,key){    
    pattern='<a .*?href="/f/(.*?)".*?>(.*?)</a>';
    var reg = new RegExp(pattern,"g");
    temp = theHtml.match(reg);
	console.log(theHtml);
    console.log(temp);
    cc =new Array();
    limit = 5
	if(temp==null){
		return;
	}
    if(temp!=null&&temp.length<limit){
        limit = temp.length
    }
   var logo = document.createElement("div");
   var relateResource = document.getElementById("erdiv");
   tempContent=""
   
    for(i = 0;i<limit;i++){        
        console.log(temp[i].match(pattern)[1]);
        
        tempContent = tempContent +'<div>'+'<a target="_blank" href="http://ishare.iask.sina.com.cn/f/'+temp[i].match(pattern)[1]+'">'+'<img src="'+pdfString+'">'+temp[i].match(pattern)[2]+'</a></div>'
    }
    logo.innerHTML = tempContent;
    console.log(logo);    
    relateResource.parentNode.insertBefore(logo,relateResource.nextSibling);
    console.log(relateResource);
     
    
    
    
    
    
}

function URLdecode(str) {
        var ret = "";
        for(var i=0;i<str.length;i++) {
                var chr = str.charAt(i);
                if(chr == "+") {
                        ret += " ";
                }else if(chr=="%") {
                        var asc = str.substring(i+1,i+3);
                        if(parseInt("0x"+asc)>0x7f) {
                                ret += decodeURI("%"+ str.substring(i+1,i+9));
                                i += 8;
                        }else {
                                ret += String.fromCharCode(parseInt("0x"+asc));
                                i += 2;
                        }
                }else {
                        ret += chr;
                }
        }
        return ret;
}

function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}