// ==UserScript==
// @name			TucForumUX
// @namespace   	TucForumUX
// @author			Themistokles Koutsouris
// @version			0.1
// @description		T.U.C. forum UX enhancement (current version changes thread view only)
// @include			*www.tuc.gr/news*
// @downloadURL		http://userscripts.org/scripts/source/161299.user.js
// @updateURL		http://userscripts.org/scripts/source/161299.meta.js
// @grant			none
// ==/UserScript==
//
var dateCurr=new Date();
var theURL=window.location.href;
var flag=-1;
var flag2=-1;

if(theURL.indexOf("list_post")>0&&document.getElementsByClassName("tx-mmforum-error").length==0){
    //
    smilieRemover();//removes punctuation mark based smilies (prevent interference with text)
    //
    topUX();//Title & breadcrumbs styling
    //
    pageNavUX();//Page navigation styling
    //
    postUX();//Post styling
    //
    userUX();//user sidebar styling
    //
    youtubeVid();//Embeds youtube video links & changes size
    //
    docUX();//general webpage styling
    //
    domwalkerText2Span();//wraps text nodes in span ,colors post text black, adds text wrap
    //
    quotation();
    //
    // USING THE FAMFAMFAM SILK ICON SET. CREDITS: Mark James , http://famfamfam.com/lab/icons/silk/
    imgReplace();//Replace images with base 64 encoded icon set
    //
    dispOnlyDiv(document.getElementById("mainperiexomeno").children[0]);//Hides non children of div
    //
    //colorInverter();
}
/*
function colorInverter(f){
var colorProperties = ['color','background-color','border-top-color','border-right-color','border-bottom-color','border-left-color','outline-color'];
var all = document.getElementsByTagName("*");
for (var i=0; i<=all.length-1; i++) {
if (window.getComputedStyle) {
var compStyle = window.getComputedStyle (all[i], null);
try {
for (var prop in colorProperties) {
if(all[i].style[colorProperties[prop]].indexOf("rgb")==-1){continue;} //next iteration if cant find rgb attribute
console.log(all[i].tagName+" "+all[i].style[colorProperties[prop]]);
var value = compStyle.getPropertyCSSValue(colorProperties[prop]);
if (value.primitiveType == 25) {
var rgb = value.getRGBColorValue();
var r = rgb.red.getFloatValue (CSSPrimitiveValue.CSS_NUMBER);
var g = rgb.green.getFloatValue (CSSPrimitiveValue.CSS_NUMBER);
var b = rgb.blue.getFloatValue (CSSPrimitiveValue.CSS_NUMBER);
var rgbStr='rgb('+(255-r)+', '+(255-g)+', '+(255-b)+')';
all[i].style.setProperty(colorProperties[prop],rgbStr,null);
}else {console.warn("Not an RGB function!");}
}
}catch (e) {console.warn("Browser does not support getPropertyCSSValue: "+e);}
}else {console.warn("Browser does not support getComputedStyle");}
}
}
*/

function quotation(){
    if(document.getElementsByClassName("tx-mmforum-pi1-pt-quote").length>0){
        lst=document.getElementsByClassName("tx-mmforum-pi1-pt-quote");
        for(a=0;a<lst.length;a++){
            lst[a].style.borderRadius="5px";
            lst[a].style.fontStyle="italic";
            lst[a].style.fontSize="93%";
            
            temp=lst[a].getElementsByTagName("span");
            lst[a].innerHTML="<div class='quotemark'>&ldquo;</div><br>"+lst[a].innerHTML;
            var quotemark=lst[a].getElementsByClassName("quotemark")[0];
            quotemark.style.fontFamily="'Times New Roman',Garamond,'MS Georgia',Serif";
            quotemark.style.fontSize="80px";
            quotemark.style.float="left";
            quotemark.style.margin="0.33em 0 -0.45em -0.25em";
            quotemark.style.color="#ffffff";
            quotemark.style.textShadow="1px 0 1px #c6c6c6, -1px 0 1px #c6c6c6,  0 -1px 1px #c6c6c6, 0 1px 1px #c6c6c6, 1px 1px 0 #c6c6c6,  -1px -1px 0 #c6c6c6,  1px -1px 0 #c6c6c6, -1px 1px 0 #c6c6c6";
            if(temp.length>1){
                temp[0].style.color="#999999";
                temp[0].style.fontSize="13px";
                temp[0].style.fontStyle="normal";
                temp[0].style.zIndex="0";
                temp[0].style.display="inline-block";
                temp[0].style.marginLeft="2.2em";
                temp[0].style.lineHeight="1.7em";
                temp[0].innerHTML=temp[0].innerHTML.replace(/^"(?=.+" έγραψε)|" έγραψε/ig," ");
                lst[a].style.paddingTop=0;
                lst[a].style.margin="8px 0 0 0";
                lst[a].insertBefore(temp[0],lst[a].getElementsByClassName("quotemark")[0].nextSibling);
                while(temp[0].nextSibling&&temp[0].nextSibling.tagName=="BR"
                      &&temp[0].nextSibling.nextSibling&&temp[0].nextSibling.nextSibling.tagName=="BR"
                      &&temp[0].nextSibling.nextSibling.nextSibling&&temp[0].nextSibling.nextSibling.nextSibling.tagName=="BR"){
                    temp[0].parentNode.removeChild(temp[0].nextSibling);
                }
                while(lst[a].nextSibling&&lst[a].nextSibling.tagName=="BR"){
                    lst[a].parentNode.removeChild(lst[a].nextSibling);
                }
            }
            temp=lst[a];
            var flagChange=1;
            while(temp.className.indexOf("tx-mmforum-pi1-pt-quote")!=-1){
                if(flagChange==1){
                    temp.style.backgroundColor="#f5f5f5";
                }else{
                    temp.style.backgroundColor="#f9f9f9";
                }
                temp=temp.parentNode;
                if(flagChange==2){flagChange=1;}
                else{flagChange=2;}
            }
        }
    }
    
}

function youtubeVid(){
    var lst=document.getElementsByClassName("tx-mmforum-td tx-mmforum-pi1-listpost-text");
    for(var a=0;a<=lst.length-1;a++){
        var elList=lst[a].getElementsByTagName("a");
        var source="";
        for(var i=0;i<=elList.length-1;i++){
            if((elList[i].href.toLowerCase().indexOf("www.youtube.com/watch?")!=-1||
                elList[i].href.toLowerCase().indexOf("/youtu.be/")!=-1)&&elList[i].parentNode.className.indexOf("tx-mmforum-td tx-mmforum-pi1-listpost-text")>=0){
                if(elList[i].href.toLowerCase().indexOf("www.youtube.com/watch?")!=-1){
                    source=elList[i].href.substring(elList[i].href.indexOf("v=")+2,elList[i].href.indexOf("v=")+13);
                }else{
                    source=elList[i].href.substring(elList[i].href.indexOf(".be/")+4,elList[i].href.indexOf(".be/")+15);
                }
                source="https://www.youtube.com/embed/"+source+"?modestbranding=1&html5=1&autohide=1&controls=2&disablekb=1&rel=0";
                
                var button = document.createElement("span");
                button.innerHTML="&nbsp;[Φόρτωσε]";
                button.style.MozTransition = "all 0.2s ease-in-out";
                button.style.OTransition = "all 0.2s ease-in-out";
                button.style.MsTransition = "all 0.2s ease-in-out";
                button.style.WebkitTransition = "all 0.2s ease-in-out";
                button.style.transition = "all 0.2s ease-in-out";
                button.style.cursor="pointer";
                button.style.color="#888888";
                
                button.onmouseover=function(event){
                    this.style.color="#004D80";
                };
                button.onmouseout=function(event){
                    this.style.color="#888888";
                };
                button.className="vidButton";
                button.setAttribute("source",source);
                var wrapper = document.createElement("span");
                elList[i].parentNode.insertBefore(wrapper,elList[i]);
                wrapper.appendChild(elList[i]);
                wrapper.appendChild(button);
                showVidButton(getWidth());
                
                button.onmousedown = function(event){
                    this.style.color="#32bDf0";
                };
                
                button.onmouseup = function(event){
                    var ifrm = document.createElement("IFRAME");
                    ifrm.setAttribute("src", this.getAttribute("source"));
                    ifrm.setAttribute("seamless", true);
                    ifrm.style.display = "inline-block";
                    ifrm.style.width = 640+"px";
                    ifrm.style.height = 360+"px";
                    ifrm.style.margin = 10+"px";
                    ifrm.style.marginLeft = "-320px";
                    ifrm.style.left = "50%";
                    ifrm.style.position = "relative";
                    ifrm.style.boxShadow = "0 0 8px 0 #999999";
                    ifrm.className = "youtube dynamicWidth";
                    if(this.parentNode.parentNode.lastChild.tagName!="IFRAME"){
                        var hrVid=document.createElement("hr");
                        hrVid.className="hrVid";
                        hrVid.style.border=0;
                        hrVid.style.height="1px";
                        hrVid.style.backgroundImage="-webkit-linear-gradient(left, rgba(200, 200, 200, 0),rgba(200, 200, 200, 1), rgba(200, 200, 200, 0) )";
                        hrVid.style.backgroundImage="-moz-linear-gradient(left, rgba(200, 200, 200, 0),rgba(200, 200, 200, 1), rgba(200, 200, 200, 0) )";
                        hrVid.style.backgroundImage="-ms-linear-gradient(left, rgba(200, 200, 200, 0),rgba(200, 200, 200, 1), rgba(200, 200, 200, 0) )";
                        hrVid.style.backgroundImage="-o-linear-gradient(left, rgba(200, 200, 200, 0),rgba(200, 200, 200, 1), rgba(200, 200, 200, 0) )";
                        hrVid.style.backgroundImage="linear-gradient(left, rgba(200, 200, 200, 0),rgba(200, 200, 200, 1), rgba(200, 200, 200, 0) )";
                        this.parentNode.parentNode.appendChild(hrVid);
                    }
                    var brVid=document.createElement("BR");
                    brVid.className="brVid";
                    this.parentNode.parentNode.insertBefore(ifrm,this.parentNode.parentNode.getElementsByClassName("hrVid")[0].nextSibling);
                    this.parentNode.parentNode.insertBefore(brVid,ifrm);
                    this.parentNode.removeChild(this);
                    changeVidwidth(getWidth());
                    console.warn("Disregard console errors, acquire cross domain access");
                };
            }
        }
    }
    window.onresize = function(event){
        var width=getWidth();
        showVidButton(width);
        changeVidwidth(width);
    };
}

function showVidButton(width){
    var elList=document.getElementsByClassName("vidButton");
    if(width<440&&flag2!=0){
        for(var i=0;i<=elList.length-1;i++){
            elList[i].style.display="none";
            flag2=0;
        }
    }else if(width>=440&&flag2!=1){
        for(var j=0;j<=elList.length-1;j++){
            elList[j].style.display="inline-block";
            flag2=1;
        }
    }
}

function changeVidwidth(width){
    if(width<440&&flag!=0){
        var elList=document.getElementsByClassName("youtube dynamicWidth");
        var hrList=document.getElementsByClassName("hrVid");
        var brList=document.getElementsByClassName("brVid");
        for(var i=0;i<=elList.length-1;i++){
            elList[i].style.display = "none";
            brList[i].style.display = "none";
            flag=0;
        }
        for(var k=0;k<=hrList.length-1;k++){
            hrList[k].style.display = "none";
        }
    }else if(width<570&&width>=440&&flag!=1){
        var elList=document.getElementsByClassName("youtube dynamicWidth");
        var hrList=document.getElementsByClassName("hrVid");
        var brList=document.getElementsByClassName("brVid");
        for(var i=0;i<=elList.length-1;i++){
            elList[i].style.display = "inline-block";
            brList[i].style.display = "block";
            elList[i].style.marginLeft = "-100px";
            elList[i].style.width = 200+"px";
            elList[i].style.height = 113+"px";
            flag=1;
        }
        for(var i=0;i<=hrList.length-1;i++){
            hrList[i].style.display = "block";
        }
    }else if(width<920&&width>=570&&flag!=2){
        var elList=document.getElementsByClassName("youtube dynamicWidth");
        var hrList=document.getElementsByClassName("hrVid");
        var brList=document.getElementsByClassName("brVid");
        for(var i=0;i<=elList.length-1;i++){
            elList[i].style.display = "inline-block";
            brList[i].style.display = "block";
            elList[i].style.marginLeft = "-160px";
            elList[i].style.width = 320+"px";
            elList[i].style.height = 180+"px";
            flag=2;
        }
        for(var i=0;i<=hrList.length-1;i++){
            hrList[i].style.display = "block";
        }
    }else if(width>=920&&flag!=3){
        var elList=document.getElementsByClassName("youtube dynamicWidth");
        var hrList=document.getElementsByClassName("hrVid");
        var brList=document.getElementsByClassName("brVid");
        for(var i=0;i<=elList.length-1;i++){
            elList[i].style.display = "inline-block";
            brList[i].style.display = "block";
            elList[i].style.marginLeft = "-320px";
            elList[i].style.width = 640+"px";
            elList[i].style.height = 360+"px";
            flag=3;
        }
        for(var i=0;i<=hrList.length-1;i++){
            hrList[i].style.display = "block";
        }
    }
}

function getWidth() {
    if (self.innerWidth) {
        return self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight){
        return document.documentElement.clientWidth;
    }
    else if (document.body) {
        return document.body.clientWidth;
    }
    return 0;
}

function smilieRemover(){
    var imgs = document.getElementsByTagName("img");
    if(imgs.length>0){
        for (var i=imgs.length-1;i>=0;i--) {
            var img=imgs[i].src;
            if(img.indexOf("/smilies/icon_biggrin.gif")>0||img.indexOf("/smilies/biggrin.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":D"),imgs[i]);}
            else if(img.indexOf("/smilies/icon_frown.gif")>0||img.indexOf("/smilies/frown.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":("),imgs[i]);}
            else if(img.indexOf("/smilies/icon_eek.gif")>0||img.indexOf("/smilies/eek.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":o"),imgs[i]);}
            else if(img.indexOf("/smilies/icon_confused.gif")>0||img.indexOf("/smilies/confused.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":-?"),imgs[i]);}
            else if(img.indexOf("/smilies/icon_cool.gif")>0||img.indexOf("/smilies/cool.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode("8)"),imgs[i]);}
            //else if(img.indexOf("/smilies/icon_lol.gif")>0||img.indexOf("/smilies/lol.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":lol:"),imgs[i]);}
            else if(img.indexOf("/smilies/icon_mad.gif")>0||img.indexOf("/smilies/mad.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":x"),imgs[i]);}
            else if(img.indexOf("/smilies/icon_razz.gif")>0||img.indexOf("/smilies/razz.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":P"),imgs[i]);}
            //else if(img.indexOf("/smilies/icon_redface.gif")>0||img.indexOf("/smilies/redface.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":oops:"),imgs[i]);}
            //else if(img.indexOf("/smilies/icon_cry.gif")>0||img.indexOf("/smilies/cry.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":cry:"),imgs[i]);}
            //else if(img.indexOf("/smilies/icon_evil.gif")>0||img.indexOf("/smilies/evil.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":evil:"),imgs[i]);}
            //else if(img.indexOf("/smilies/icon_rolleyes.gif")>0||img.indexOf("/smilies/rolleyes.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":roll:"),imgs[i]);}
            else if(img.indexOf("/smilies/icon_wink.gif")>0||img.indexOf("/smilies/wink.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(";)"),imgs[i]);}
            //else if(img.indexOf("/smilies/icon_banghead.gif")>0||img.indexOf("/smilies/banghead.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":bang:"),imgs[i]);}
            else if(img.indexOf("/smilies/icon_smile.gif")>0||img.indexOf("/smilies/smile.gif")>0){imgs[i].parentNode.replaceChild(document.createTextNode(":)"),imgs[i]);}
            //else if(img.indexOf("/smilies/")>0){imgs[i].parentNode.removeChild(imgs[i]);}
        }
    }
}

function postUX(){
    if(document.getElementsByClassName("tx-mmforum-td tx-mmforum-pi1-listpost-text").length>0){
        var lst=document.getElementsByClassName("tx-mmforum-pi1-listpost-text");
        var temp=document.getElementsByClassName("tx-mmforum-pi1-listpost-date");
        
        for(var a=0;a<lst.length;a++){
            lst[a].style.padding="1em";
            lst[a].style.setProperty('border-bottom', '0', 'important');
            temp[a].parentNode.style.lineHeight="4px";
            temp[a].style.color="#888888";
            if(a>0){
                temp[a].parentNode.style.boxShadow="0 0 0 1px #c6c6c6,3px 1px 1px 0 #e5e5e5,2px -5px 0 4px #f8f8f8,0 -10px 0 1px #c6c6c6";
            }
            temp[a].parentNode.style.setProperty('border-bottom', '3px solid #fff', 'important');
            if(!window.chrome){//if not chrome
                if(a>0){
                    temp[a].parentNode.style.boxShadow="0 -1px 0 1px #c6c6c6,3px 0 1px 0 #e5e5e5,2px -5px 0 4px #f8f8f8,0 -10px 0 1px #c6c6c6";
                }
                temp[a].parentNode.style.setProperty('border-bottom', '3px solid transparent', 'important');
            }
            temp[a].parentNode.style.backgroundColor="#f0f0f0";
            /*temp[a].parentNode.style.backgroundImage="-webkit-repeating-linear-gradient(-30deg, transparent, transparent 35px, rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 70px)";
            temp[a].parentNode.style.backgroundImage="-moz-repeating-linear-gradient(-30deg, transparent, transparent 35px, rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 70px)";
            temp[a].parentNode.style.backgroundImage="-ms-repeating-linear-gradient(-30deg, transparent, transparent 35px, rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 70px)";
            temp[a].parentNode.style.backgroundImage="-o-repeating-linear-gradient(-30deg, transparent, transparent 35px, rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 70px)";
            temp[a].parentNode.style.backgroundImage="repeating-linear-gradient(-30deg, transparent, transparent 35px, rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 70px)";*/
            var elhtml=lst[a].innerHTML;
            lst[a].innerHTML=elhtml.replace(/\s*\[Έγινε επεξεργασία αυτού του άρθρου \d+ φορές, τελευταία {2}\d+\.\d+\.\d+ {2}στις \d+:\d+\.\]\s*/gim,"");
            var temp2=/\[Έγινε επεξεργασία αυτού του άρθρου \d+ φορές, τελευταία {2}\d+\.\d+\.\d+ {2}στις \d+:\d+\.\]/gim.exec(elhtml);
            if(temp2!=null){
                var chng=temp2[0].replace(/^\[Έγινε επεξεργασία αυτού του άρθρου /img,"");
                chng=chng.replace(/ φορές, τελευταία {2}\d+\.\d+\.\d+ {2}στις \d+:\d+\.\]/img,"");
                var chngdate=temp2[0].replace(/\[Έγινε επεξεργασία αυτού του άρθρου \d+ φορές, τελευταία {2}/img,"");
                chngdate=chngdate.replace(/ {2}στις \d+:\d+\.\]/img,"").split(".");
                var chngtime=temp2[0].replace(/\[Έγινε επεξεργασία αυτού του άρθρου \d+ φορές, τελευταία {2}\d+\.\d+\.\d+ {2}στις /img,"");
                chngtime=chngtime.replace(/\.\]/img,"").split(":");
                var dateChange=new Date(chngdate[2],chngdate[1]-1,chngdate[0],chngtime[0],chngtime[1],0);
                temp[a].innerHTML+=" | ".fontsize(2);
                if(chng==1){temp[a].appendChild(document.createTextNode("Mία αλλαγή "+timeAgo(dateChange,1)));}
                else if(chng>1){temp[a].appendChild(document.createTextNode(chng+" αλλαγές, η νεότερη "+timeAgo(dateChange,1)));}
            }
            
            if(lst[a].getElementsByClassName("tx-mmforum-pi1-attachment")[0]&&lst[a].getElementsByClassName("tx-mmforum-pi1-attachmentlabel")[0]){
                var attLst = lst[a].getElementsByClassName("tx-mmforum-pi1-attachment");
                lst[a].removeChild(lst[a].getElementsByClassName("tx-mmforum-pi1-attachmentlabel")[0]);
                for(var j=0;j<attLst.length;j++){
                    attLst[j].insertBefore(document.createElement("br"),attLst[j].getElementsByTagName("A")[1].nextSibling);
                    var inn=attLst[j].lastChild.nodeValue;
                    if(inn.indexOf("msword")>=0){
                        attLst[j].removeChild(attLst[j].getElementsByTagName("A")[0]);
                    }
                }
            }
        }
    }
    if(document.getElementsByClassName("tx-mmforum-td tx-mmforum-pi1-listpost-menu").length>0){
        var elArr=document.getElementsByClassName("tx-mmforum-td tx-mmforum-pi1-listpost-menu");
        for(var i=0;i<=elArr.length-1;i++){
            var elemCell=elArr[i].getElementsByClassName("tx-mmforum-textbutton")[0];
            var elemCell2=elemCell.parentNode.parentNode.previousElementSibling.getElementsByClassName("tx-mmforum-pi1-listpost-user")[0];
            var temp=elemCell2.parentNode.previousElementSibling.getElementsByTagName("td")[0];
            if(temp.getElementsByClassName("tx-mmforum-pi1-listpost-options")[0].getElementsByTagName("div").length>0){
                var elArr2=temp.getElementsByClassName("tx-mmforum-pi1-listpost-options")[0].getElementsByTagName("div");
                elArr2[0].style.width="9em";
                elArr2[0].style.float="right";
                elArr2[0].style.marginBottom="0.5em";
                elArr2[0].style.marginTop="0.5em";
                elArr2[0].style.marginRight="0";
                elArr2[0].style.marginLeft="1em";
                elArr2[0].getElementsByTagName("a")[0].style.padding="0.95em 0.9em 1.1em 0.4em";
                elArr2[1].style.width="9em";
                elArr2[1].style.float="right";
                elArr2[1].style.marginRight="0";
                elArr2[1].style.marginLeft="1em";
                elArr2[1].getElementsByTagName("a")[0].style.padding="0.95em 2.3em 1.1em 0.2em";
                elArr2[1].getElementsByTagName("a")[0].children[0].style.marginRight="11px";
                elemCell2.appendChild(elArr2[0]);
                elemCell2.appendChild(elArr2[0]);
            }
            elemCell2=temp.getElementsByTagName("div")[0];
            elemCell2.style.setProperty('float', 'right', 'important');
            temp=elemCell2.innerHTML;
            elemCell2.innerHTML=temp.replace(/\s*Συντάχθηκε την: \d+\/\d+\/\d+&nbsp;\[\d+:\d+\]\s*/gim,'');
            temp=/\Συντάχθηκε την: \d+\/\d+\/\d+&nbsp;\[\d+:\d+\]\s*/gim.exec(temp);
            if(temp!=null){
                var chngdate=temp[0].replace(/^\s*Συντάχθηκε την: /gim,"");
                chngdate=(chngdate.replace(/&nbsp;\[\d+:\d+\]\s*/gim,"")).split("/");
                var chngtime=temp[0].replace(/\s*Συντάχθηκε την: \d+\/\d+\/\d+&nbsp;\[/gim,"");
                chngtime=chngtime.replace(/\]\s*/gim,"").split(":");
                var dateChange=new Date(chngdate[2],chngdate[1]-1,chngdate[0],chngtime[0],chngtime[1],0);
                elemCell2.insertBefore(document.createTextNode("Δημοσιεύθηκε "+timeAgo(dateChange,0)),elemCell2.childNodes[0]);
            }
        }
    }
}

function timeAgo(dateChange,mode){
    var dateDiff=Math.floor((dateCurr.getTime()-dateChange.getTime())/1000);
    if(mode==1){
        if(dateDiff<120){dateDiff="προ ενός λεπτού";}
        else if(dateDiff<3600){dateDiff="προ "+Math.floor((dateDiff/60))+" λεπτών";}
        else if(dateDiff<7200){dateDiff="προ μίας ώρας";}
        else if(dateDiff<86400){dateDiff="προ "+Math.floor((dateDiff/3600))+" ωρών";}
        else if(dateDiff<172800){dateDiff="προ μίας ημέρας";}
        else if(dateDiff<2629746){dateDiff="προ "+Math.floor((dateDiff/86400))+" ημερών";}
        else if(dateDiff<5259492){dateDiff="προ ενός μήνα";}
        else if(dateDiff<31556952){dateDiff="προ "+Math.floor((dateDiff/2629746))+" μηνών";}
        else if(dateDiff<63113904){dateDiff="προ ενός έτους";}
        else{dateDiff="προ "+Math.floor((dateDiff/31556952))+" ετών";}
    }else{
        if(dateDiff<120){dateDiff="πριν από ένα λεπτό";}
        else if(dateDiff<3600){dateDiff="πριν από "+Math.floor((dateDiff/60))+" λεπτά";}
        else if(dateDiff<7200){dateDiff="πριν από μία ώρα";}
        else if(dateDiff<86400){dateDiff="πριν από "+Math.floor((dateDiff/3600))+" ώρες";}
        else if(dateDiff<172800){dateDiff="πριν από μία ημέρα";}
        else if(dateDiff<2629746){dateDiff="πριν από "+Math.floor((dateDiff/86400))+" ημέρες";}
        else if(dateDiff<5259492){dateDiff="πριν από ένα μήνα";}
        else if(dateDiff<31556952){dateDiff="πριν από "+Math.floor((dateDiff/2629746))+" μήνες";} //mean greg month = 30,436875 days
        else if(dateDiff<63113904){dateDiff="πριν από ένα χρόνο";}
        else{dateDiff="πριν από "+Math.floor((dateDiff/31556952))+" χρόνια";}
    }
    return dateDiff;
}
function pageNavUX(){
    if(document.getElementsByClassName("tx-pagebrowse").length>0){
        var elList=document.getElementsByClassName("tx-pagebrowse");
        elList[0].parentNode.parentNode.style.display="none";
        elList[1].style.marginBottom="-1em";
        elList[1].style.fontSize="130%";
        elList[1].style.letterSpacing="-2px";
        elList[1].children[0].innerHTML=elList[1].children[0].innerHTML.replace("Πρώτη","");
        elList[1].children[1].innerHTML=elList[1].children[1].innerHTML.replace("Προηγούμενη","");
        elList[1].children[2].style.letterSpacing="0";
        elList[1].children[2].style.padding="0";
        elList[1].children[2].children[0].style.padding="0";
        elList[1].children[3].innerHTML=elList[1].children[3].innerHTML.replace("Επόμενη","");
        elList[1].children[4].innerHTML=elList[1].children[4].innerHTML.replace("Τελευταία","");
    }
}

function docUX(){
    if(document.getElementById("c3468")){document.getElementById("c3468").style.display="none";}
    if(document.getElementById("c1557")){document.getElementById("c1557").style.display="none";}
    if(document.getElementById("c3990")){document.getElementById("c3990").style.display="none";}
    if(document.getElementById("c4679")){document.getElementById("c4679").style.display="none";}
    if(document.getElementById("c6470")){document.getElementById("c6470").style.display="none";}
    if(document.getElementById("tx-mmforum-footer")){document.getElementById("tx-mmforum-footer").style.display="none";}
    if(document.getElementById("socialshareprivacy")){document.getElementById("socialshareprivacy").style.display="none";}
    if(document.getElementById("socialontentfooter")){document.getElementById("socialontentfooter").style.display="none";}
    if(document.getElementById("socialcontentfooter")){document.getElementById("socialcontentfooter").style.display="none";}
    if(document.getElementById("contentfooter")){document.getElementById("contentfooter").style.display="none";}
    if(document.getElementById("pagetitle")){document.getElementById("pagetitle").style.display="none";}
    if(document.getElementsByClassName("csc-linkToTop").length>0){document.getElementsByClassName("csc-linkToTop")[0].style.display="none";}
    if(document.getElementsByClassName("tx-mmforum-table").length>0){
        document.getElementsByClassName("tx-mmforum-table")[document.getElementsByClassName("tx-mmforum-table").length-1].style.display="none";
    }
    if(document.getElementsByClassName("tx-felogin-pi1").length>0){
        var el=document.getElementsByClassName("tx-felogin-pi1")[0];
        //el.getElementsByTagName("form")[0].submit.name="submit_button";
        el.style.display="none";
        var button=document.getElementsByClassName("tx-mmforum-textbutton")[0].cloneNode(true);
        button.children[0].removeAttribute('href');
        button.style.float="left";
        button.style.marginTop="-2.4em";
        button.style.marginLeft="0";
        button.style.paddingLeft="1.6em";
        button.style.width="auto";
        button.setAttribute("id", "logoutButton");
        button.children[0].children[1].innerHTML="Αποσύνδεση: "+el.getElementsByTagName("label")[0].nextSibling.data;
        button.children[0].children[1].style.fontSize="95%";
        button.onmouseup=function(event){
            document.getElementsByClassName("tx-felogin-pi1")[0].getElementsByTagName("form")[0].submit.click();
        };
        el.parentNode.appendChild(button);
    }
    if(document.getElementsByTagName("a").length>0){
        var elList=document.getElementsByTagName("a");
        for(var i=0; i<elList.length; i++){
            elList[i].style.textDecoration="none";
            elList[i].style.MozTransition = "all 0.2s ease-in-out";
            elList[i].style.OTransition = "all 0.2s ease-in-out";
            elList[i].style.MsTransition = "all 0.2s ease-in-out";
            elList[i].style.WebkitTransition = "all 0.2s ease-in-out";
            elList[i].style.transition = "all 0.2s ease-in-out";
            
            elList[i].onmouseover=function(event){
                this.style.color="#004D80";
            };
            elList[i].onmousedown=function(event){
                this.style.color="#028DC0";
            };
            elList[i].onmouseout=function(event){
                this.style.color="#028DC0";
            };
        }
    }
    if(document.getElementsByTagName("hr").length>0){
        var elList=document.getElementsByTagName("hr");
        for(var i=0; i<elList.length; i++){
            elList[i].style.border=0;
            elList[i].style.height="1px";
            elList[i].style.backgroundImage="-webkit-linear-gradient(left, rgba(200, 200, 200, 0),rgba(200, 200, 200, 1), rgba(200, 200, 200, 0) )";
            elList[i].style.backgroundImage="-moz-linear-gradient(left, rgba(200, 200, 200, 0),rgba(200, 200, 200, 1), rgba(200, 200, 200, 0) )";
            elList[i].style.backgroundImage="-ms-linear-gradient(left, rgba(200, 200, 200, 0),rgba(200, 200, 200, 1), rgba(200, 200, 200, 0) )";
            elList[i].style.backgroundImage="-o-linear-gradient(left, rgba(200, 200, 200, 0),rgba(200, 200, 200, 1), rgba(200, 200, 200, 0) )";
            elList[i].style.backgroundImage="linear-gradient(left, rgba(200, 200, 200, 0),rgba(200, 200, 200, 1), rgba(200, 200, 200, 0) )";
        }
    }
    if(document.getElementsByClassName("tx-mmforum-textbutton").length>0){
        var elList=document.getElementsByClassName("tx-mmforum-textbutton");
        for(var i=0; i<elList.length; i++){
            elList[i].style.textAlign="center";
            elList[i].style.textShadow="0 1px 1px rgba(255, 255, 255, 0.75)";
            elList[i].style.verticalAlign="middle";
            elList[i].style.cursor="pointer";
            elList[i].style.backgroundColor="#f5f5f5";
            elList[i].style.backgroundImage="-moz-linear-gradient(top, #ffffff, #e6e6e6)";
            elList[i].style.backgroundImage="-webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6))";
            elList[i].style.backgroundImage="-webkit-linear-gradient(top, #ffffff, #e6e6e6)";
            elList[i].style.backgroundImage="-o-linear-gradient(top, #ffffff, #e6e6e6)";
            elList[i].style.backgroundImage="linear-gradient(to bottom, #ffffff, #e6e6e6)";
            elList[i].style.backgroundRepeat="repeat-x";
            elList[i].style.border="1px solid #888888";
            elList[i].style.borderColor="#c6c6c6 #c6c6c6 #9f9f9f";
            elList[i].style.WebkitBorderRadius="2px";
            elList[i].style.MozBorderRadius="2px";
            elList[i].style.borderRadius="2px";
            elList[i].style.filter="progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0)";
            elList[i].style.filter="progid:DXImageTransform.Microsoft.gradient(enabled=false)";
            elList[i].style.WebkitBoxShadow="inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)";
            elList[i].style.MozBoxShadow="inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)";
            elList[i].style.boxShadow="inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)";
            elList[i].style.MozTransition = "all 0.2s ease-in-out";
            elList[i].style.OTransition = "all 0.2s ease-in-out";
            elList[i].style.MsTransition = "all 0.2s ease-in-out";
            elList[i].style.WebkitTransition = "all 0.2s ease-in-out";
            elList[i].style.transition = "all 0.2s ease-in-out";
            elList[i].children[0].style.color="#028DC0";
            
            elList[i].onmouseover=function(event){
                this.style.textDecoration="none";
                this.style.backgroundPosition="0 -15px";
                this.children[0].style.color="#004D80";
                this.style.backgroundColor="#d9d9d9";
            };
            elList[i].onmousedown=function(event){
                this.style.backgroundColor="#e6e6e6";
                this.children[0].style.color="#028DC0";
            };
            if(elList[i].children[0].href){
                elList[i].onmouseup=function(event){
                    window.location=this.children[0].href;
                };
            }
            elList[i].onmouseout=function(event){
                this.style.backgroundColor="#f5f5f5";
                this.style.textDecoration="none";
                this.style.backgroundPosition="0 0";
                this.style.outline="0";
                this.children[0].style.color="#028DC0";
            };
            if(elList[i].innerHTML.indexOf("Απάντηση")>=0){
                elList[i].style.position="absolute";
                elList[i].style.marginTop="-1em";
                elList[i].style.marginRight="1em";
                elList[i].style.paddingLeft="0.33em";
                elList[i].style.textAlign="left";
                elList[i].style.right="0";
                elList[i].style.width="auto";
                elList[i].children[0].children[1].style.fontSize="95%";
            }
        }
    }
    if(document.getElementsByClassName("container periexomeno").length>0){
        document.getElementsByClassName("container periexomeno")[0].style.backgroundColor="transparent";
        if(document.getElementsByClassName("tx-mmforum-table").length>0){
            document.getElementsByClassName("tx-mmforum-table")[0].style.backgroundColor="#ffffff";
        }
    }
    document.getElementsByTagName("tbody")[0].parentNode.style.boxShadow="0 0 0 1px #c6c6c6, 0 1px 0 1px #c6c6c6,3px 1px 2px 0 #e5e5e5";
    document.body.style.padding="1.5em 0.6em 4em 1em";
    document.body.style.backgroundColor="#F8F8F8";
}

function domwalkerText2Span() {    
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false),counter,textNodes=[],i,newSpan;
    while (walker.nextNode()){
        textNodes.push(walker.currentNode);
    }
    counter=0;
    for (var i=0; i<textNodes.length; i++){
        if(!/^\s+$/i.test(textNodes[i].nodeValue)){
            counter++;
            newSpan = document.createElement('span');
            newSpan.id = "span"+counter;
            newSpan.appendChild( document.createTextNode(textNodes[i].nodeValue) );
            newSpan.style.MsWordBreak="break-word";
            newSpan.style.wordBreak="break-word";
            newSpan.style.WebkitHyphens="auto";
            newSpan.style.MozHyphens="auto";
            newSpan.style.hyphens="auto";
            newSpan.style.wordWrap="break-word";
            if (textNodes[i].parentNode.className.toLowerCase().indexOf("tx-mmforum-td tx-mmforum-pi1-listpost-text")>=0||(
                textNodes[i].parentNode.parentNode.className.toLowerCase().indexOf("tx-mmforum-td tx-mmforum-pi1-listpost-text")>=0&&
                !textNodes[i].parentNode.tagName.toLowerCase().indexOf("a")==0&&
                    textNodes[i].parentNode.className.toLowerCase().indexOf("tx-mmforum-pi1-pt-quote")==-1)){
                        newSpan.style.color="#000000";
                    }
            textNodes[i].parentNode.replaceChild(newSpan, textNodes[i]);
        }
    }
    
    var lst=document.getElementsByClassName("tx-mmforum-td tx-mmforum-pi1-listpost-text");
    for(var a=0;a<=lst.length-1;a++){
        var elList=lst[a].getElementsByTagName("a");
        while(lst.children&&lst[a].children[0].tagName=="BR"){
            lst[a].removeChild(lst[a].children[0]);
        }
        while(lst.children&&lst[a].children[lst[a].children.length-1].tagName=="BR"){
            lst[a].removeChild(lst[a].children[lst[a].children.length-1]);
        }
        lst[a].appendChild(document.createElement("br"));
        if(a<lst.length-1){
            lst[a].appendChild(document.createElement("br"));
        }
    }
}

function dispOnlyDiv(el){
    var originEl=el;
    while (el && el != document.body) {
        var parent = el.parentNode;
        var siblings = parent.childNodes;
        var len = 0;
        for (var i = 0, len = siblings.length; i < len; i++) {
            var node = siblings[i];
            if (node != el) {
                if (node.nodeType == 1) {
                    node.style.display = "none";
                } else if (node.nodeType == 3) {
                    var span = document.createElement("span");
                    span.style.display = "none";
                    span.className = "xwrap";
                    node.parentNode.insertBefore(span, node);
                    span.appendChild(node);
                }
            }
        }
        parent.style.width="auto";
        parent.style.marginTop="0.4em";
        parent.style.marginBottom="-1.5em";
        parent.style.display = "block";
        parent.style.cursor="default";
        el = parent;
    }
    originEl.parentNode.style.width="98%";
}

function topUX(){
    document.getElementById("c1443").children[0].children[1].style.display="none";
    var el=document.getElementById("c1443").children[0].children[2];
    el.style.textAlign="center";
    el.style.fontSize="200%";
    el.style.paddingBottom="0.66em";
    var title=el.innerHTML.trim();
    var start=0;
    var end=1;
    for(var i=0;i<=title.length;i++){
        if (title.charAt(i).toUpperCase()!=title.charAt(i).toLowerCase()||!isNaN(title.charAt(i))){//check if letter or number
            start=i;
            end=i+1;
            while(!isNaN(title.charAt(i))&&title.charAt(i)!=" "){ //if number and has more following numbers
                i++;
                end=i;
            }
            break;
        }
        
    }
    el.innerHTML=title.substring(0,start)+"<span id='capitalLetter' style=\"font-family:'Times New Roman',Garamond,'MS Georgia',Serif;font-size:300%;margin-right:-1px;\">"+title.substring(start,end).toUpperCase()+"</span>"+title.substring(end);
    el.style.cssText+="line-height:30px !important ;";
    document.getElementsByTagName("tbody")[0].children[0].style.display="none";
    
    if(document.getElementById("c8198")){
        document.getElementById("c8198").style.marginBottom="30px";
        document.getElementById("c8198").style.marginTop="-30px";
    }
    if(document.getElementsByClassName("tx-mmforum-rootline").length>0){
        var bread=document.getElementsByClassName("tx-mmforum-rootline")[0];
        var addedBreadCrumbs="<a href='/'>Αρχή</a>&nbsp;»&nbsp;<a href='https://www.tuc.gr/university.html'>Το Πολυτεχνείο</a>&nbsp;»&nbsp;";
        bread.innerHTML=addedBreadCrumbs+bread.innerHTML;
        for(var i=0;i<=bread.children.length-1;i++){
            bread.children[i].style.margin="0 2px 0 2px";
            bread.children[i].style.color="rgb(2, 141, 192)";
            bread.children[i].onmouseover=function(){this.style.color="rgb(21, 85, 160)";};
            bread.children[i].onmouseout=function(){this.style.color="rgb(2, 141, 192)";};
        }
        bread.style.color="#999999";
        bread.style.margin="-3em 0 2em 0";
        bread.style.textAlign="center";
        bread.style.border="0";
    }
    if(document.getElementsByClassName("breadcrumb").length>0){
        document.getElementsByClassName("breadcrumb")[0].parentNode.parentNode.parentNode.style.display="none";
    }
    if(document.getElementsByClassName("tx-mmforum-pi1").length>0){
        var elList=document.getElementsByClassName("tx-mmforum-pi1");
        for(var i=0; i<elList.length; i++){
            if(elList[i].className.indexOf("tx-mmforum-pi1-")==-1&&elList[i].getElementsByTagName("h2").length>0){
                elList[i].getElementsByTagName("h2")[0].nextSibling.style.display="none";
                break;
            }
        }
    }
}

function userUX(){
    var elList=document.getElementsByClassName("tx-mmforum-pi1-listpost-user");
    var el=0;
    for(var i=0;i<=elList.length-1;i++){
        if(i<elList.length-1){
            elList[i].style.setProperty('border-bottom', '1px solid #c6c6c6', 'important');
        }else{
            elList[i].style.setProperty('border-bottom', '0', 'important');
        }
        elList[i].style.textAlign="right";
        for(var k=0;k<elList[i].children.length-1;k++){
            var inner=elList[i].children[k].innerHTML;
            if(inner.indexOf("εγγεγραμμένος")>=0||inner.indexOf("Ιδιότητα Συντάκτη")>=0){
                elList[i].children[k].style.display="none";
            }
            if(inner.indexOf("Μηνύματα")>=0&&elList[i].getElementsByTagName("a").length>0){
                elList[i].children[k].innerHTML+="&nbsp;|&nbsp;";
                elList[i].children[k].appendChild(elList[i].getElementsByTagName("a")[0]);
            }
        }
        if(elList[i].getElementsByTagName("ul").length>0){
            elList[i].getElementsByTagName("ul")[0].style.listStyle="none";
            elList[i].getElementsByTagName("ul")[0].style.margin="0";
            elList[i].getElementsByTagName("ul")[0].style.fontSize="10px";
        }
        if(elList[i].getElementsByTagName("a").length>0){
            el=elList[i].getElementsByTagName("a")[0];
            if(el.getAttribute("title").indexOf("<στο>")>=0){
                el.innerHTML="email";
                el.style.fontSize="10px";
            }
        }
    }
    
    if(document.getElementsByClassName("tx-mmforum-td tx-mmforum-pi1-listpost-menu").length>0){
        var elArr=document.getElementsByClassName("tx-mmforum-td tx-mmforum-pi1-listpost-menu");
        for(i=0;i<=elArr.length-1;i++){
            var elemCell2=elArr[i].getElementsByClassName("tx-mmforum-textbutton")[0].parentNode.parentNode.previousElementSibling.getElementsByClassName("tx-mmforum-td tx-mmforum-pi1-listpost-user")[0];
            if(elArr[i].getElementsByClassName("tx-mmforum-textbutton").length<=1){
                var elemCell=elArr[i].getElementsByClassName("tx-mmforum-textbutton")[0];
                elemCell.style.display="none";
            }else{
                var elemCell=elArr[i].getElementsByClassName("tx-mmforum-textbutton")[1];
            }
            var temp=elemCell.getElementsByTagName("a")[0].href;
            var newNode = document.createElement("a");
            newNode.href=temp;
            elemCell2.insertBefore(newNode,elemCell2.children[0]);
            newNode.appendChild(elemCell2.getElementsByTagName("div")[0]);
            
            elemCell=elArr[i].getElementsByClassName("tx-mmforum-textbutton")[0];
            elemCell2.appendChild(elemCell);
            elemCell.style.float="right";
            elemCell.style.marginRight="0";
            elemCell.style.marginLeft="1em";
            elemCell.style.marginTop="0.5em";
            if(i<elArr.length-1){
                elemCell.style.marginBottom="1.2em";
            }else{
                elemCell.style.marginBottom="0.3em";
            }
            elemCell.style.width="9em";
            elemCell.getElementsByTagName("a")[0].style.marginLeft="-15px";
            elArr[i].style.display="none";
            
            temp=elemCell2.parentNode.previousElementSibling.getElementsByTagName("td")[0];
            
            if(elemCell2.getElementsByTagName("div")[1].innerHTML.indexOf("Δημιουργός θέματος")!=-1){
                elemCell=elemCell2.getElementsByTagName("div")[1];
                elemCell2.parentNode.previousElementSibling.getElementsByTagName("td")[0].appendChild(elemCell);
                elemCell.innerHTML="Συντάκτης θέματος";
                elemCell.style.float="left";
                elemCell.style.letterSpacing="1px";
                elemCell.style.fontSize="10px";
                elemCell.style.color="#888888";
                elemCell.style.marginLeft="5px";
                elemCell.style.paddingTop="1px";
            }
        }
    }
}

function imgReplace(){
    var imgArr,i;
    if(document.getElementsByTagName("img").length>0){
        imgArr=document.getElementsByTagName("img");
        for(i=0;i<imgArr.length;i++){
            if(imgArr[i].src.indexOf("/807bb9ddfa.gif")!=-1){imgArr[i].src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ1SURBVBgZBcFNiJVVGADg5z3fmTujY5NZBANBIVkZ2J9IKkZFGKRuglq1KaqVtoqoVbSKFi1LoY2QEVSbcqiFWWJqPxL044wUGESQVqJOKerce7/z9jyRmba++tXTy2YmnyphPaYQIJBBNuPWfls8l1/EfxdeOrJnxxAgMtO2148d2ffC+rWlxMqkkwBkQjp7aeT97xf99cfS5ZPzv6w6umfHElQoXdw+qN3KhX90JYIgG30243G6Muo9tOYa999WfdfOLs92x4UHd3163eG3ti8ViIgVmdkNumKiUIOu0AURFIFmdmZgx4ZZt9w6uazOTO+FAklAQQlKhBKhRCgRShfOnL/i5hUjd64Kz2+6XjfRPQkVIJPaEUJGaH1SQu0YZHHqXBq2sdaGHlg9KWoZQ4VMEjWKlBJRQiAb2RUGlBZa66RCFFAh0RBBCIlENiY6QBTRhyypIROo0MZk0hDITFAKWqhdkkGSQt/oG1ChtZSZJCkBSCCEE79+Yv7UnIuXLxiNR8rwnsomFfpGn2SjAUjQkuPzHzp98XMPb9ngplVrHFr42OX5ubpx1943K7Rxaple+2EopBZkBo2MNL3wnie2P6ovvbtntzp48iMb1232+6n9OyuMx72+Z3Zmwn03Fi3pkz5oyWffnjERKzy29lnw4iPvmDuxG/unKoyXWhu3lsNefPNnr0VKAVpy/tK/Fk5/7afTR72yda83DjxjqpuEqxVGV/u/pwfdDS+vG05nZpE0wLXLqn2Lzzn287s237XF3IndBlEd/fEwvB2ZacPOgzvHo3w8Iu5NuRxAkkhpovug1u5Q5SoGfWurDxzf/eW2/wEnITFm/fHryQAAAABJRU5ErkJggg==";}//new topic
            else if(imgArr[i].src.indexOf("/47c93dc0e8.gif")!=-1){imgArr[i].src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ5SURBVDjLfZJtSFNRGMenRkgY1BKiL30yEkqJrCjrgxBB5Qtmyy3NcGoUuqD5skEm+ZZizpTUmZEw33ML06lzGoQKtRRETXM2Z1LOTBs6LNNw9/w7d+IiuevAj3vO4fx/z+E5lweAtxVRvp5Pqaf8psAF3RQfngtBa1OvCet2Bq5Ge/80K5nkCntR7AwhsP0imF8msCwRfF4k+GQlmFxgYF7YEKerDJzV90vKexwHZm0EX2hw6juBaZ6B8RuDsa8MRiwbggL1IP57A7b6NK36kYbH5xiM0vCwhRXYHYKMmnd/gwlH+dvunPTOehy623ZLlrfO9oCVbA72JsMzjEPK2QP5Gb5UGewJxcXtKBLsQ2JKBkR5OkfHq/QfnKKlH2uONd0f/ecVioM8OzXyC+hRRKFAeBC3A3dAfHwn7ob71tCD5rnFlc3gKiVjM+cUlEbsqZ4xqLE81IT3Lx6gXyXDUMsjpGQqRip1Y2zwJ0W6tWfOyZUQQepEYxpZHW8FTFqsGdvRX5dORLlaKw0mcP0vTsHekAYPXkDFE3VxNplU3cREXQrMdRKoCnOI+5Gycu9zlR4uBbvON7l5nNbkykunGL0VkGvfQqo2QFJtwLNhIDHfZHc/UZvpFVThxik4FfEwNS2nDc+NBMkDwI0+4LoeiNQAV+sJcrsIxMnNJDD0noxTMFt4CAPqUiSp5xHbAcRoCIQ1BBFVBGFPAYFiAYPNSkxl+4JTYFYGv6mVxyBU2oe4LiC+GxDrKPR7rQU4G9eBl/ejMVEW1sspMDUk8V+VxPsHRDZkHbjcZvGL7lrxj+pe8xN2rviEa63HLlUVvS6JPWxqlPC5BH8A3ojcdBpMJSoAAAAASUVORK5CYII=";}//quote a comment
            else if(imgArr[i].src.indexOf("/b64a9f3db8.gif")!=-1){imgArr[i].src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGkSURBVDjLrZJPKINhHMd3UsrJTcpBDi6UC+3ookQ5OOBAaCh2cFQ40GqTzURTihI54DRp8dqBg3BQw5BtNmxe/4flT9re5+v3vJvF2l6Kp749Pe/7fj7P7/09jwqA6i9R/ZugVr+cSZmlvFOgEIGSl0xgnVt3IRyRoDSWtn1c4qakxQW0yKBEJMbw+MpwHWIQnxgCDwxnQQbvHYP7RoLnJirvntrkkuKvghytZU1+eUWg+MjgJ/j0nuEkBh9dSTgQo4KB+R0uqEgquCD4PBiDbxlc11HYSfBuILUg/gu8fB/t6rmVcEzw4aWEfYIdAS6IyILe6S0uUCdtIpd8Hbwah1+SxQlNTE91jJHPI5tcPoiLrBsL6BxrQOtQFep0pc/lXYU9P14kkngugy/onxlF30ITlpwWOEQB5tV21JgLUNKRZVSCTeM2J6/kuV5fFrbuD8N6OCJXY7S3wGxv44K3VHAuxUvR8HVldxFszolvvVncs3DB7+67Wpv9Nig0Qy80yrB+pVG5gsTQh7pqYz5Mgkbemc98rdiDJBIDJcTLjs0G/vwDCw/6dFwBuzsAAAAASUVORK5CYII=";}//new comment
            else if(imgArr[i].src.indexOf("/1906b3ebb0.gif")!=-1){imgArr[i].src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG2SURBVDjLrZNJKIRhGMdHxpTtwIUoRRxdlZvcJsuFcBAHFHGSSBKlbCUZOTgolLKXskyDshwsJWQLYx+DGcaSsWS+5+95Z5jQzJjirf/hfb9+v+d5l08GQPaXyP5NkFGnDuT0cF45cBENJ9KRYKRvdg9vFgmuxujSkZDscxR2AU/8OBaJCHdPhKsHgv6eoLslnJgIh9eEfYMErcEmr+hcEJKYr4KworYZ68dLBvV3hDOGj28IBx/wzqWELb1N0NC/IgQJDgXnDJ+aPmAjYe/KBm8yvK5zLrBvQbR/xFW1Rgm7DG9fSNhgeE0nBBaroLJ7UQhiHR6ikHwdopu1M8kq/nGI3s6u0fJ5ZR3qLbtIoyrARFoQpuLlGE70oZb0QM2vD4kl2guTGV3VmVgticXzWBNoWw1zbzGWC6NRk+o/7Qpuah/fFJ08DiX50RPDUCUBZQFAbTiMjXHoUyrIGRzBOeTkirlom1aGv53NbVUwJnndrfc+wJUeO3IAhl5KZTBxTvI9Maj0IrcErVkhcwt5UdCXhcNQ7oWDXA9MJctRn+I77/Zf15wdOtOvVEii7QGuzPCsWH8HCxz5pzmy7lQAAAAASUVORK5CYII=";}//delete comment
            else if(imgArr[i].src.indexOf("/706c695604.gif")!=-1){imgArr[i].src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIWSURBVDjLjZNPSBRRHMf32rVTdFOsDkJEhODNLGqXukgJpmiEURBGdEnbskNktrhCRQuaLEEikUhlbK5EiZmxjbWwfxvL0dHdtdlCx3VtZxyaed/eG5qwZct98DnM4/f9vN/M+40NgK1Y5p7tPTY9UIeZ4Q6EvIcQ9pQ3FR1O+kvqpbFWZCI+YG0RK5EhBNz2dFHhxIvSWjl+TdOSzyGNd0GJPoE+P4nogzPqpuGUv8wux64ahjIJZbYFy1Pnwfc3I9LXuDR1t2bnf8PC0xKHHL0MQw0gJ5yEmmhA9pMTYm9VOth9cA+rsdV1jm6lDFA0Cizabl6H9KH1d7gJ6kI9VmNXIHiqs5/dFfusQ5hg+PGbL/ipG7CWxPvAv7wEQ5mAKjZjPdGIDO2E9xwmgS7Hjo1dMoFuEIKMQvAtS8C9eoT4iBNh/22kuFrkxAYsh9ow661Bp9fHuqv4S9DiGTdPTa8SfM0QDLoOANl5TN8/jjHndrzrceCt2w71uwDXYJAJjhQULNJwQia4cXY3tMA9aNwdcB37MXRuF4Ih3qwpKLBegbUvLhGcqN6GW6fK8dp1FBP9F/AxvoBwSjcF7Q/fM0FlvsD8iEyycbFuQknDFLPl40QWnqFsyRdY16hbV+gdjf8Rraytm890P0opy5+VggNECwVJzllBldL+r2ErFO7uHYmx4A/Kxc1GPT9cSpmjnC72L/0FRS76cD+dhSEAAAAASUVORK5CYII=";}//edit comment
            else if(imgArr[i].src.indexOf("/b93bd54554.gif")!=-1){imgArr[i].src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ3SURBVDjLpZNtSNNRFIcNKunF1rZWBMJqKaSiX9RP1dClsjldA42slW0q5oxZiuHrlqllLayoaJa2jbm1Lc3QUZpKFmmaTMsaRp+kMgjBheSmTL2//kqMBJlFHx44XM7vOfdyuH4A/P6HFQ9zo7cpa/mM6RvCrVDzaVDy6C5JJKv6rwSnIhlFd0R0Up/GwF2KWyl01CTSkM/dQoQRzAurCjRCGnRUUE2FaoSL0HExiYVzsQwcj6RNrSqo4W5Gh6Yc4+1qDDTkIy+GhYK4nTgdz0H2PrrHUJzs71NQn86enPn+CVN9GnzruoYR63mMPbkC59gQzDl7pt7rc9f7FNyUhPY6Bx9gwt4E9zszhWWpdg6ZcS8j3O7zCTuEpnXB+3MNZkUUZu0NmHE8XsL91oSWwiiEc3MeseLrN6woYCWa/Zl8ozyQ3w3Hl2lYy0SwlCUvsVi/Gv2JwITnYPDun2Hy6jYuEzAF1jUBCVYpO6kXo+NuGMeBAgcgfwNkvgBOPgUqXgKvP7rBFvRhE1crp8Vq1noFYSlacVyqGk0D86gbART9BDk9BFnPCNJbCY5aCFL1Cyhtp0RWAp74MsKSrkq9guHyvfMTtmLc1togpZoyqYmyNoITzVTYRJCiXYBIQ3CwFqi83o3JDhX6C0M8XsGIMoQ4OyuRlq1DdZcLkmbgGDX1iIEKNxAcbgTEOqC4ZRaJ6Ub86K7CYFEo8Qo+GBQlQyXBczLZpbloaQ9k1NUz/kD2myBBKxRZpa5hVcQslalatoUxizxAVVrN3CW21bFj9F858Q9dnIRmDyeuybM71uxmH9BNBB1q6zybV7H9s1Ue4PM3/gu/AEbfqfWy2twsAAAAAElFTkSuQmCC";}//profile
        }
    }
    if(document.getElementById("logoutButton")){
        document.getElementById("logoutButton").getElementsByTagName("img")[0].src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKRSURBVDjLpZNrSNNRGIeVuaSLrW2NCozlSsrCvqifKrG1vyznRDLQMi9TsamsUCzvSWJKC0Ms0/I2hratmVbi3bLIysRZlgh9qFGuCKOF5KaonV9n+yAGokIHHs7hhd/zvofDcQHg8j8sW0wN2FpQJuVNl8u2QC3loEDMtUX7CYrXJDjrx8u6FcYlNVE83KbciOCiNISD9MDNRHaQf3lVQZWMgwYaVNNQqcwBF1dCBbhwlIczfpypVQWlgZvQVZUPS6cag7XpOBckQIZkB9IYEZIPcee02XL3FQU1scKfM98/YOpFFb72XseooRDm9quwmk3QKXdPvdOkrltRUBG9f8A6dBeTw0bY3+ooeufZatLhToLv8IpX2CZrYnsfTtXqVP6YHa7FzFirE/ubJrRk+sM3UHlfwNSsX1YgCNG586WNKZ7SPox9mYYhLwz6PLkTx/n5+G94Bj8BT1x3ni+u3vCPgH/c4OoRbIgXhg5g3GJHowXIGANSXgOJT4G4DkBTXolnMT7oFbPxgNlo7WDYuYuCAxH14ZKTahgHF1A9CqheESj7CZK6CWIfElwrqsRI5hHMtJeBjHfBps/AUJrvn55jbiqnYCR/38JkWzZu1rchvpN2pR0VjwhimglONREYw/fATsOokANZXKDECz/UQeiWsD45BaMFPsTaU4So5AYU99oQ3Qyc1hNEagkiagn66NjE1IKl61fhdlp3I07Be60qx5TjPa9QlMwHxPdDQUdPWELrCSGm6xIBGpq96AIr5bOShW6GZVl8BbM+xeNSbjF/V3hbtTBIMyFi7tlEwc1zIolxLjM0bv5l4l58y/LCZA4bH5Nc8VjuttDFsHLX/G0HIndm045mx9h0n3CEHfW/dpehdpL0UXsAAAAASUVORK5CYII=";//logout
    }
    var logoImg=document.createElement("img");
    var cap=document.getElementById("capitalLetter");
    logoImg.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAABZBAMAAACZAPrSAAAAMFBMVEWRNTqdoaUpeZ6Ei5RPaYHr2dMFicrdv7adVFLBi3/7/PpjW2m1c2pHhKHRqZ3ClY5ukX69AAAAEHRSTlP/////////////AP//////KeUZWAAAAAlwSFlzAAALEwAACxMBAJqcGAAABXRJREFUeJx9lV9oHEUcx4e0TVJ6JlApvskZ8WzB9kGwD6JVhPal+NIyjDfobL2Uo1CiGBmnGeperKRG+hc1xCvhisgwdB72aqEo+FKE0qaGKz7Y0LdiGTd36F5Fr2lDvPib3UsTvZxD2NvNZ3/z+zPf32+RaS3dNG0LLd/4rDPUUdAZMtLZUtVJZ0vtB51h9v+gzzShHaCeZwTLDjAQvsC1DpAQy2UnGDBupe0AL2huOekAs0QQ3l6iBBYIlE+35ZLAugCo2nJJYGR5SPjaUBUA8hpfG0YhIdK2RRRDPR8yiLe8NvQjRvz26ra29bkVvK1GMQyafs1aW/uvU1ScLhanhXBOBZt2D1NFuEzEsGtgYODpMPTjGr0GD7kMXAbGYtidhxUJn0MZ5K/55XU5hsfd7ZNCWAt/+x/Bb1csZ0NfMOZ7v+1psdzlFTjo84j4xcXa5n9vG8OcEIWoIur26zV85ncxr1gHsehb7T7zO8LJEY0tUzvbt80PVa8FRFItf18DDi4xKkEmdl8r2qVVPt9mivhw2GI5IkFXWWJivZPSFIKWJa+twHxt3vi8QBnOJM9bSqvgTw0lJrTVvJULD+Ujn/nnqIdD3AhkAnNb7PyK5aDyl+rhRLC8LbeFRzCzlUQNUpAXRAKHuGUygQOf/rmt2DARo9lCKxXOs2HsM/dKya8pAk1hgmzChrBgOrbckZ2kRilFIbdWEYYIdA8FOCSLUA5F+PnVkLCgBnBWn3Pa5ZHLu5xvlZMxwtHxHBeuyKJZdRX7KoHvBJppjroG1byDHo7fUUkRZmFbgMd36Ib7L4v7Wqk9MfyZaEYk6t5FYqihlioMo79j0wUuOPjsKujQKGrKADXHSr0HNCe5W+hUpCKjrplgAWDoR4IPuxrULBcWrWuqqjQzxrimp7oafv4yHAOITVqJPrZqJKRz0sT9x0qlD6H0z2qGYaahfmv0dDR3zrh5qywuaYAvskBjQdFG6MSj4ycrEI3wfWqaZhjisZAn1LZPuFFzfVGaEsfUkGkT3BqEeEhADOrBIMpmeCTuVnUPnR2vfDEbYCkIwNOk2gwxv5KCCpGzCI0ihMaYdrmAZRCF/hK5hyqi6oBbNzgLMF8wKGUxazbsHbRqRZyDLWgoNWMV9q6NrGJ92YcNTjxQX/8IVwIbA1uOj4NL+L2q66VJC4MbncmG3JDo4dRUhY+cPzGwFfVKM8IakzDO0GOUKv/m3MykLoXYizIHEMRtGXOCQpci6wleioyukGJoPkijfjeyWXbBTbCXbkJE2JoLE4aEZjiNPlINd+4TDs6UaF2CSALYxzP70ugbddWdD7yBjomQONmpAEqk6S9ptN240UpcQOuoYiYgNB7iGt9/FW3HTlRONmjjvLL6y4rXqMKZQO+m0QANnVRdtP0PQyoe3HyA507tosEf+TTKS6dgp0nUV4hAO4KqO91PGfMZwIz03WR30a7DRk0u1qv4Qfc2Ayo4ANC5xy7PY7cN5lmM/bPdt415K38YvS6Js3Q+u3LCQmsab7TrCQl9dBBdok45XjxNcr1urhmN1suGUZk8JAcp6ko8h3KoB0IyR9B6ygxMzYspBe7cCzFErgePjqYoJD6cT6dc4b0EHkaoB76rZbTR7N8NER3q5a0Cgc9DCKW8CROM9pj7B2k5k0MwBbSXzNsDTotFpdEYRPOC2Tk4ugEMP0lg2mkK+2W0Acbpu+b93W+kjLnb+iJddJCXsqgPWmiIqrCMpPgrGePHYphqvIlS5vlMvmZYODq2+VYCNyVanb+Herl6PPMMaOB6b6b1RepN4OkryPXx3e2QR+GH5e9Ka50BMW/6rvjj9+OVaPHE3r1JQFFrlZZvoqnzcHGyMv8Ad05CDKUJ9S4AAAAASUVORK5CYII=";
    logoImg.style.position="relative";
    logoImg.setAttribute("id","logoImg");
    logoImg.style.opacity="0.33";
    logoImg.style.zIndex="-1";
    logoImg.style.margin="-2.3em "+(-31-(cap.offsetWidth/2))+"px 0 0";
    cap.parentNode.insertBefore(logoImg,cap);
}