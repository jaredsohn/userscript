// ==UserScript==
// @name Flashkeeper
// @author Spayder26
// @version 0.1
// @run-at document-start
// @include *
// @description Keep flash under control in Chromium (extra: simple add blocker).
// @namespace http://spayder26.blogspot.com
// ==/UserScript==

(function(){
    var filter='*[src^="http://cdn."],*[src^="http://pubads."],*[src^="http://googleads."],*[src^="http://ad."],*[href*="impresionesweb.com"],*[href*="/adserver/"],*[href^="http://pagead2."]';
    var hide="{display:none!important;visibility:hidden!important;overflow:hidden!important;width:1px!important;height:1px!important;opacity:0!important;}"; // Fire in the hole!
    var playimg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAUBJREFUKM+FkbFKwwAURU9jUSyCiIMOuoiLheLSD+gH9D8yqT/Qr9DJT3ATzFIQCTiIUFxCSuukqFSsVVMbTU36rkPTVd/04FwuF05B/H3F2XNbVV01VYQF8s3bbeVACNF1O2FfsTJlGulZN2HLnZIZjhJJiYaK9C0p1nV05eaBbrUTJpLe9aZLDfSqvqRYfnhRFQ5YfbW8wAdCnBEijBdKbJbjOhRBtRIJlu85w9hBxKyQ1MABqywwBgwDoMkjRswSWQUcECBsupk5fthCiB9Spg3BF/N5YI6UBl+IEgPSAByY+EMWEYaR0iDGMBZ5IvPBgbF31x6yhiEajDCMDXoEbbx8+bnbjF5l+tSzeoqU6l7H0ZErRGEq69RN97fL6ywzoc8DQXtyeHAMzAJwUh3V05oqGRaYX/T2clmF/3T/AmGA1yTCCs+1AAAAAElFTkSuQmCC";
    var playhover="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAXlJREFUKM990c1K41AAhuE36fG/tFbISC1aERpCh2JEqDdQ8Bbcz6pbb6aIK12UXoQUXCj+QQtCzQREVFIY6jBW05ppPOe4UNCV3/Ll2z2G5n3VBXJYpIE+PYJa970bGqgmcQobdjHjTjmKgffQvu7cnOLVQjA01SRrm5X8Vt5OIYCYf1z5942jA1q1UADOZmVlu5Q0gCEwwQ/m7MPtMmcvXCT+LBQq7q/VrEFIxDFZRrwww9L4XXYYNAKTXKGYtw1CFJodTlAo/iL4aSeL5ARWxk0hkQBodlCUUcTMg4tlkp5wBBGgPk57+EieSKMd0iYoQKPQaEAwpIRGEfMfMOkPvIhJFBqFIKLOM5oZugw9+ia9XvsBgUIiiajzhEQyjU/UpmcSXHda/gALiabOIxLJIrc0/dcOQeL8ua4n4/v13LjFGAMSzGJxy24Y7o6atd8C8C6nltnfKtvLWIzockXTHzXUAd4XrNSGUZQuToz0ZNvoqE+s77nfABk6rSnmp9XWAAAAAElFTkSuQmCC";
    var playclick="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAUJJREFUKM+N0b9qU3EcBfCPN20Sa/8EpSi0U8ZAJrM4WPIAeY9srg6uHcQpuPUNBN3MA1ywLtJMgSztJlRbLJFQ0jb39vd1aBw66ZkOnD/DOfwDD/6SQSd60dUOaRx5DF8f3TMM+vGq0aqrYmHufJLevzmAylJ+t7O7LiwUVmxY377Y607zERUGnXi7s1s1UzrWULiyYbP2o/ny25fTjNRrtKpmCLkTIbnw0LPWvMcKunU3AiHkkiaubFl0yUjtqgWSBL46k8ytKdtkltkkBDKFXYFC6a5hfG1VWsqlvmuh7rdyfGfIL9WXLaW+K0moOXObk7EYnk4uPZGEvrkQnvrleGJIhfz0xe3Pvc3aY5kbmTVbzh3Oiv0Pn5dLHo6eT783i+1Vj6yYOjGaFPufDu6d1e/Me2U32rfSOPLK8OOR/8Mf2KuRsHIhLvAAAAAASUVORK5CYII=";
    var playbg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAAAAAXNSR0IArs4c6QAAAKxJREFUKM+F0KsWgkAUheF/BnQZJrosZk1UwOpLID6iis9ggDHbzXSbUYOIzA0nTfjWPudsgYI1NQvsd2DPCwAJKy6jBMRc3ViOEhBPNftDYqRLjgaZcEW6KaVBNKmN7BRN+rluSEpjl4b0W0GIaLLu36NTkPSoYhckHaoorF0y4xwJZ4fkVi1RMi2sQblTrxBqPAXuyCGpvWT7qyCmZuMlLQIFENF4yIOEFngDIyM1q9qNZjoAAAAASUVORK5CYII=";
    var flash="embed,object{display:none;}div.FlashKeeper{background-image:url('"+playbg+"');text-align:center;outline:black dashed 1px;}div.FlashKeeper span{cursor:pointer;background:transparent url('"+playimg+"') left center no-repeat;padding-left:20px;min-height:16px;font-weight:bold;display:inline:block;}div.FlashKeeper span:hover{text-decoration:underline;background-image:url('"+playhover+"')}div.FlashKeeper span:active{background-image:url('"+playclick+"');}";
    var addStyle=function(css){
        var s=document.createElement('style');
        s.setAttribute('type','text/css');
        s.appendChild(document.createTextNode(css));
        return document.getElementsByTagName('head')[0].appendChild(s);
        };
    var ids={},idc=0;
    var playButton=function(el){
        if(!el.id){el.id="flashkept"+(idc++);}
        var id=el.id;
        if(!(id in ids)){
            ids[id]=el;
            var k=document.createElement("span"),r=document.createElement("div"),l=window.getComputedStyle(el,null);
            var a=el,b,c,cr=255,cg=255,cb=255,ca=0;
            if(l.zIndex){r.style.zIndex=l.zIndex;}
            if(l.position){r.style.position=l.position;}
            if(l.top){r.style.top=l.top;}
            if(l.right){r.style.right=l.right;}
            if(l.bottom){r.style.bottom=l.bottom;}
            if(l.left){r.style.left=l.left;}
            if(l.margin){r.style.margin=l.margin;}
            if(l.width){r.style.width=l.width;}
            if(l.height){r.style.height=l.height;k.style.lineHeight=l.height;}
            while((a=a.parentNode)||false){
                b=window.getComputedStyle(a,null).backgroundColor;
                if(b){
                    if(b.match(/^rgba\(*/)){
                        c=b.replace(/rgba\(|\)/g,"").split(",");
                        cr=parseInt(c[0],10);   
                        cg=parseInt(c[1],10); 
                        cb=parseInt(c[2],10);          
                        ca=parseInt(c[3],10);
                    }else if(b.match(/^rgb\(*/)){
                        c=b.replace(/rgb\(|\)/g,"").split(",");
                        cr=parseInt(c[0],10);   
                        cg=parseInt(c[1],10); 
                        cb=parseInt(c[2],10);          
                        ca=255;                
                    }else if(b.match(/^\#*/)){
                        if(b.length==7){
                            cr=parseInt("0x"+b[1]+b[2],16);
                            cg=parseInt("0x"+b[3]+b[4],16);
                            cb=parseInt("0x"+b[5]+b[6],16);
                        }else if(b.length==4){
                            cr=parseInt("0x"+b[1]+b[1],16);
                            cg=parseInt("0x"+b[2]+b[2],16);
                            cb=parseInt("0x"+b[3]+b[3],16);
                            ca=255;
                            }
                        }
                    if(ca>127){
                        k.style.color=r.style.outlineColor="#"+((cr>127)?"00":"ff")+((cg>127)?"00":"ff")+((cb>127)?"00":"ff");
                        break;
                        }
                    }
                }
            r.className="FlashKeeper";
            k.appendChild(document.createTextNode("Play movie"));
            k.addEventListener('click',function(){
                ids[id].style.display="block";
                r.style.display="none";
                r.parentNode.removeChild(r);
                return false;
                });
            
            r.appendChild(k);
            el.parentNode.insertBefore(r);
            }
        };
    var flag=false;
    var flashKeep=function(){
        var lookup=function(){
            if(!flag){
                flag=true;
                var t=[document.getElementsByTagName("embed"),document.getElementsByTagName("object")];
                for(var n=0,nl=t.length;n<nl;n++){
                    for(var i=0,il=t[n].length;i<il;i++){
                        playButton(t[n][i]);  
                        }
                    }
                flag=false;
                }
            };
        addStyle(filter+hide+flash);lookup();
        if(document.getElementsByTagName("script").length>0){
            document.addEventListener("click",function(){setTimeout(lookup,1000);});
            setInterval(lookup,10000);
            }
        };
    window.addEventListener("DOMContentLoaded",function(){setTimeout(flashKeep,1);});
})();
