// ==UserScript==
// @name           fgf smiley hijacking
// @description    let's use smilies that are from a better forum than ours
// @author         tazg mostly
// @include        http*://forum.free-games.com.au/*
// ==/UserScript== 
 

(function() {
    var imports = [
            "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js",
            "https://raw.github.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.min.js"
        ];


    var app = function() {
        (function() {
            var main = function() {
                var postbox = $("textarea[name=post_message]");
                
                $("center *").not(postbox).replaceText(/:[a-z0-9]*?:/ig, function(smilecode) {
                    return createImage(/:(.*):/.exec(smilecode)[1]).get(0).outerHTML;
                });
            
                var smilebox = postbox.closest("tr").find("td table");
                smilebox.replaceWith(createButton("some awful smilies"));
            };
            
                
            var createImage = function(smilename) {
                return $("<img />", {
                    src: "http://sae.tweek.us/static/images/emoticons/emot-" + smilename + ".gif"
                });
            };
            
                
            var createButton = function(buttonText) {
                return $("<button />").text(buttonText).click(function() {
                    window.open("//sae.tweek.us");
                    return false;
                })
            };
               
                
            main();
        })();
    };

            
        

    var loadScripts = function(scriptSources, callback) {
        var numScripts = scriptSources.length;
        
        var previousScript;
        var script;
        for (var i = 0; i < numScripts; i++) {
            var src = scriptSources[i];
            
            if (script !== undefined) previousScript = script;
            script = document.createElement("script");
            script.setAttribute("src", src);
            if (previousScript !== undefined) {
                previousScript.addEventListener("load", function() {
                    document.body.appendChild(script);
                }, false);
                document.body.appendChild(previousScript);
            }
        }
        
        var callbackScript = document.createElement("script");
        callbackScript.textContent = "(" + callback.toString() + ")();";
        
        if (script !== undefined) {
            script.addEventListener("load", function() {
                document.body.appendChild(callbackScript);
            }, false);
            if (previousScript === undefined) {
                document.body.appendChild(script);
            }
        } else {
            document.body.appendChild(callbackScript);
        }
    };
    
    
    loadScripts(imports, app);
})();