// ==UserScript==
// @name addtime
// @version 0.1.2.4
// @description adds last message time of Favorites
// @include http://*.inn.co.il/Forum/Forum.aspx/*
// ==/UserScript==


if (unsafeWindow.bIsFav){
    var loc=unsafeWindow.localStorage;
    loc["addtime-"+unsafeWindow.Forum.ID]=unsafeWindow.ForumView.maxMessage;
    
}
//document.getElementsByTagName('select')[0].onClick=getit;
opt=document.getElementsByTagName('select')[0].options;
favList=[];

for (var Ifav=0;Ifav<opt.length;Ifav++)
    favList[Ifav]=opt[Ifav].innerHTML;
var sty=document.createElement("style");
sty.innerHTML=".bold{background:#8FE3D5;color:#FF0000;}";
document.body.appendChild(sty);
lastTimeArr=[];
opIndex=1;
Forum=unsafeWindow.Forum;
nIDate=unsafeWindow.nIDate;
function getit(){
    if (opIndex<opt.length){
        AddReq=unsafeWindow.$.get('http://www.inn.co.il/Forum/Forum.aspx/f'+opt[opIndex].value,function(data){
            var forumid=opt[opIndex].value;
            var loc=unsafeWindow.localStorage;
            var textHTML=data;
            var strtIN=textHTML.indexOf("a= [new Forum");
            var finIN=textHTML.indexOf("for (i=0;i<a.length;i++)",strtIN);
            var jsTEXT=textHTML.slice(strtIN,finIN);
            var a=[];
            eval (jsTEXT);
            var maxmsg=0;
            var maxmsgplc=0;
            for (var i=0;i<a.length;i++){
                var msgarr=a[i].oMessages;
                for (var j=0;j<msgarr.length;j++){
                    if(msgarr[j].id>maxmsg){
                        maxmsg=msgarr[j].id;
                        maxmsgplc=j;
                        maxtopic=i;
                    }
                }
                
            }
            lastTimeArr[forumid]=a[maxtopic].oMessages[maxmsgplc].date.miniDate();
            opt[opIndex].innerHTML= favList[opIndex]+" ("+lastTimeArr[forumid]+")";
            if (!loc["addtime-"+forumid]||(parseInt(loc["addtime-"+forumid])<parseInt(maxmsg))) opt[opIndex].className="bold";
            opIndex++;
            getit();
            
        });
    }
}
getit();
document.getElementsByTagName('select')[0].addEventListener('click',function(e){AddReq.abort();opIndex=1;getit();}, true);