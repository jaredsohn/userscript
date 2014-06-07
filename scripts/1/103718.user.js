// ==UserScript==
// @name Rage Faces 4 FB
// @author Leonardo E. Comerci (alias NeonTiger) [Fixed by Kristijan Ristovski]
// @namespace http://diveintogreasemonkey.org/download/
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// @unwrap
// ==/UserScript==


document.FBTweakerContextHelper = new function(){
    this.tags = ["r"];
    this.allowedDelimiters = [ "\\/\\/\\/", "\\/", "\\|\\|" ];
};

document.FBTweakerContext = new function(){
    this.hooked = false;
    this.tags = document.FBTweakerContextHelper.tags;
    this.regexIMGTag = new RegExp(
        "\\br("+document.FBTweakerContextHelper.allowedDelimiters.join("|")+
        ")[a-zA-Z0-9\\-\\.\\%\\?\\/\\:\\/_=+]+\\b", "g");
    this.regexTag = {
            all: new RegExp(
                "\\b("+document.FBTweakerContextHelper.tags.join("|")+
                ")("+document.FBTweakerContextHelper.allowedDelimiters.join("|")+")[a-zA-Z0-9\\-\\.\\%\\?\\/\\:\\/_=+]+\\b", "g"),
            //all: /\b(img|youtube)\|\:\:\|[a-zA-Z0-9\-\.\%\?\/\:\/_=+]+\b/g,
            img: new RegExp(
                "\\br("+document.FBTweakerContextHelper.allowedDelimiters.join("|")+
                ")[a-zA-Z0-9\\-\\.\\%\\?\\/\\:\\/_=+]+\\b", "g")
    }
    this.busy = false;
    this.shortcut_1 = false;
    this.dialog_open = false;
}

    
document.onload = new function(){
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

                var res = prompt("direccion URL de la imagen a insertar?");
                if(res){
                    var str = "r||"+res;
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
        var regex = document.FBTweakerContext.regexTag.all;
        if( spans[i].innerText.match(regex) ){
            spans[i].innerHTML =
                "<div style=\"display:block; margin-top:5px; overflow: auto;\">"+
                    spans[i].innerText+
                "</div>";
            containsTags.push(spans[i]);
        } 
    }
    
    for(j=0; j<containsTags.length; j++){
        var replacement, matchesIMG, matchesYOUTUBE;
        
        matchesIMG = containsTags[j].innerText.match(document.FBTweakerContext.regexTag.img);
        if(matchesIMG){
            for(m=0; m<matchesIMG.length; m++){
				
                var url = matchesIMG[m].split("||")[1].replace("hxxp://", "http://").toLowerCase();
				var gusta="http://hardtosayoutloud.files.wordpress.com/2011/05/me-gusta-jpg.png";
				var cgusta="http://ragemaker.com/images/Pleasure/me%20gusta%20mucho%20creepy.png";
				var noshit="http://www.myfacewhen.net/uploads/13-are-you-serious-face.jpg";
				var awwyea="http://weknowmemes.com/wp-content/uploads/2011/05/aww-yea-meme-original.jpg";
				var fuckyea="http://lh4.ggpht.com/-VO6khHBd75o/TbD14QS6rFI/AAAAAAAAAS8/u9TcYdK__B4/Fuck_Yeah_Meme.jpg";
				var fts="http://webservice.imagesauce.net/image/586063/400x.jpg";
				var close="http://files.sharenator.com/close_enough_The_Newest_Sharenator-s367x279-103178-475.jpg";
				var lolo="http://www.adamtam.com/wp-content/uploads/2011/05/tumblrlol.gif";
				var lol="http://media.tumblr.com/tumblr_lg50ikKfZs1qfoz45.jpg";
				var jizzed="http://api.ning.com/files/edb2xsb3LMotRHPBkIw3v9sS5tLzJ6AVejcjxGCYLNeuHCLFUhkN7wqBAH008B49T3U8nbBVNWyK1lVlK3KhOEQ9QCDjpe9O/Hejust....jizzed...in...HISPANTS.jpg";
				var notbad="http://www.webpagescreenshot.info/img/679986-528201193036pm.png";
				var challenge="http://blog.amhill.net/wp-content/uploads/2011/05/challenge-accepted.png";
				var fap="http://th03.deviantart.net/fs71/150/f/2011/145/e/a/rage_faces_by_shishywonka-d3h8gbn.png"
				var pokerface="http://fc07.deviantart.net/fs71/f/2011/145/4/5/rage_faces_by_shishywonka-d3h8gb2.png";
				var aaa="http://fc04.deviantart.net/fs70/f/2011/145/1/4/rage_faces_by_shishywonka-d3h8g98.png";
				var troll="http://upload.wikimedia.org/wikipedia/en/7/73/Trollface.png";
				var kiddingme="http://3.bp.blogspot.com/-BZNYYBGOjg0/TcFxzOP7RLI/AAAAAAAAAII/7p3vLYoaI2A/s320/Are-you-fucking-kidding-me.jpg";
				var lied="http://lolpics.se/pics/23357.gif";
				var angry="http://ragemaker.com/images/Angry/stare.png";
				switch(url){
					case "awwyea":
					url=awwyea;
					break;
					case "gusta":
					url=gusta;
					break;
					case "cgusta":
					url=cgusta;
					break;
					case "noshit":
					url=noshit;
					break;
					case "fts":
					url=fts;
					break;
					case "fuckyea":
					url=fuckyea;
					break;
					case "close":
					url=close;
					break;
					case "lololo":
					url=lolo;
					break;
					case "lol":
					url=lol;
					break;
					case "jizzed":
					url=jizzed;
					break;
					case "notbad":
					url=notbad;
					break;
					case "challenge":
					url=challenge;
					break;
					case "fap":
					url=fap;
					break;
					case "pokerface":
					url=pokerface;
					break;
					case "aaa":
					url=aaa;
					break;
					case "troll":
					url=troll;
					break;
					case "kiddingme":
					url=kiddingme;
					break;
					case "lied":
					url=lied;
					break;
                                       case "angry":
                                         url=angry;
                                          break;
					
				}	
                containsTags[j].innerHTML = containsTags[j].innerHTML
                    .replace(matchesIMG[m], "<a href=\""+url+"\" target=\"blank\"><img style='display:inline' src=\""+url+"\" width=\"100\" /></a><br>");
            }
        }
    }
    document.FBTweakerContext.busy = false;
	
}
    
function hookMinifeed(){
    
    if(document.FBTweakerContext.hooked){
        ;
    } else {
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
            console.log("["+(new Date().getTime())+"] No minifeed yet.")
        }
        console.log("["+(new Date().getTime())+"] Not HOOKED yet.")
        setTimeout(hookMinifeed, 10);
    }
}