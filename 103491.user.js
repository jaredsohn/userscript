// ==UserScript==
// @name Facebook Tweaker
// @author Leonardo E. Comerci (alias NeonTiger)
// @namespace http://diveintogreasemonkey.org/download/
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// @unwrap
// ==/UserScript==

// Meto variables y funciones en un "contexto" propio
// y se lo engancho a "document", que es un objeto
// que existe de antemano en el scope de Javascript.

document.FBTweakerContextHelper = new function(){
    this.tags = ["img", "youtube"];
    this.allowedDelimiters = [ "\\/\\/\\/", "\\/", "\\|\\:\\:\\|" ];
};

document.FBTweakerContext = new function(){
    this.hooked = false;
    this.tags = document.FBTweakerContextHelper.tags;
    this.regexIMGTag = new RegExp(
        "\\bimg("+document.FBTweakerContextHelper.allowedDelimiters.join("|")+
        ")[a-zA-Z0-9\\-\\.\\%\\?\\/\\:\\/_=+]+\\b", "g");
    this.regexTag = {
            all: new RegExp(
                "\\b("+document.FBTweakerContextHelper.tags.join("|")+
                ")("+document.FBTweakerContextHelper.allowedDelimiters.join("|")+")[a-zA-Z0-9\\-\\.\\%\\?\\/\\:\\/_=+]+\\b", "g"),
            //all: /\b(img|youtube)\|\:\:\|[a-zA-Z0-9\-\.\%\?\/\:\/_=+]+\b/g,
            img: new RegExp(
                "\\bimg("+document.FBTweakerContextHelper.allowedDelimiters.join("|")+
                ")[a-zA-Z0-9\\-\\.\\%\\?\\/\\:\\/_=+]+\\b", "g"),
            youtube: new RegExp(
                "\\byoutube("+document.FBTweakerContextHelper.allowedDelimiters.join("|")+
                ")[a-zA-Z0-9\\-\\.\\%\\?\\/\\:\\/_=+]+\\b", "g")
    }
    this.busy = false;
    this.shortcut_1 = false;
    this.dialog_open = false;
}

//var spans = document.evaluate("//span[@data-jsid='text']", document.body, null, XPathResult.ANY_TYPE);
    
document.onload = new function(){
    //hookKeyboardCommand();
    replaceLinks();
    hookMinifeed();
}

function hookKeyboardCommand(){
    
    document.addEventListener("keydown", function(event){
        
        var elem = document.activeElement;
        
        if( elem.getAttribute("name")=="add_comment_text_text" ||
            elem.getAttribute("name")=="xhpc_message_text" ){

            if(!document.FBTweakerContext.dialog_open && event.ctrlKey && event.keyCode==32){
                
                document.FBTweakerContext.dialog_open = true;

                var res = prompt("dirección URL de la imagen a insertar?");
                if(res){
                    var str = "img|::|"+res;
                    for(i=0; i<str.length; i++){
                        var ev = document.createEvent("KeyboardEvent");
                        ev.initKeyboardEvent(
                            "keydown", false, false, null, 
                            false, false, false, false, 
                            str.charCodeAt(i), 0
                        );
                        elem.dispatchEvent(ev);
                    }
                }

                document.FBTweakerContext.dialog_open = false;
            }
        }
    }, false);
}

function toggleToolbar(){
    //alert("Tuc!");
    btn = document.getElementById("btnInsert");
    btn.style.visibility = (btn.style.visibility == "visible" ? "hidden" : "visible");
    //alert("Nice!");
}
    
function replaceLinks(){
    var xpathres = document.evaluate(
        "//span[@data-jsid='text']|"+
        "//span[@class='messageBody']|"+
        "//h6[@class='uiStreamMessage uiStreamPassive ministoryMessage ministoryInlineMessage']/span",
        document.body, null, XPathResult.ANY_TYPE
    );
    var spans = [];
    while(res = xpathres.iterateNext()){
        spans.push(res);
    }
    var containsTags = [];
    for(i=0; i<spans.length; i++){
        //var regex = document.FBTweakerContext.regexIMGTag;
        var regex = document.FBTweakerContext.regexTag.all;
        if( spans[i].innerText.match(regex) ){
            /*spans[i].removeAttribute("data-jsid");*/
            spans[i].innerHTML =
                "<br/><div style=\"width: 380px; overflow: auto; display: inline;\">"+
                    spans[i].innerText+
                "</div>";
            containsTags.push(spans[i]);
            //console.log(spans[i].innerText);
        } else {
            console.warn(regex+" no matchea. Duro.");
        }
    }
    
    for(j=0; j<containsTags.length; j++){
        var replacement,
            matchesIMG, matchesYOUTUBE;
        
        matchesIMG = containsTags[j].innerText.match(document.FBTweakerContext.regexTag.img);
        //console.log("matches["+j+"] ("+matches.length+" matches): "+matches);
        if(matchesIMG){
            for(m=0; m<matchesIMG.length; m++){
                var url = matchesIMG[m].split("|::|")[1]
                    .replace("hxxp://", "http://");
                containsTags[j].innerHTML = containsTags[j].innerHTML
                    // Imagenes
                    .replace(matchesIMG[m], "<a href=\""+url+"\" target=\"blank\"><img src=\""+url+"\" width=\"100\" /></a>");
            }
        }
        
        matchesYOUTUBE = containsTags[j].innerText.match(document.FBTweakerContext.regexTag.youtube);
        //console.log("matches["+j+"] ("+matches.length+" matches): "+matches);
        if(matchesYOUTUBE){
            for(m=0; m<matchesYOUTUBE.length; m++){
                var url = matchesYOUTUBE[m].split("|::|")[1]
                    .replace("youtube.com/watch?v=", "youtube.com/embed/");
                containsTags[j].innerHTML = containsTags[j].innerHTML
                    // Imagenes
                    .replace(matchesYOUTUBE[m], "<iframe width=\"370\" height=\"290\" src=\""+url+"\" frameborder=\"0\" allowfullscreen></iframe>");
            }
        }
    }
    document.FBTweakerContext.busy = false;
    console.log("FREE");
    /*
    console.log(
        "spans: "+spans.length+"\n"+
        "imgtags: "+containsTags.length+"\n"
    );*/
}
    
function hookMinifeed(){
    
    if(document.FBTweakerContext.hooked){
        ;
    } else {
        //var oMiniFeed = document.getElementById("profile_minifeed");
        var oMiniFeed = document.body;
        if(oMiniFeed){
            oMiniFeed.addEventListener(
                "DOMSubtreeModified", function(){
                    if(!document.FBTweakerContext.busy){
                        console.log("BUSY");
                        document.FBTweakerContext.busy = true;
                        replaceLinks();
                    }
                }, false
            );
            document.FBTweakerContext.hooked = true;
            console.log("["+(new Date().getTime())+"] HOOKED.")
        } else {
            //setTimeout(hookMinifeed, 10);
            console.log("["+(new Date().getTime())+"] No minifeed yet.")
        }
        console.log("["+(new Date().getTime())+"] Not HOOKED yet.")
        setTimeout(hookMinifeed, 10);
    }
}

