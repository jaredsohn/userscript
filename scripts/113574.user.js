// ==UserScript==
// @name           Autoload Browser Ponies
// @description    PONIES, PONIES EVERYWHERE. After installing, choose your settings on the main Browser Ponies site at http://web.student.tuwien.ac.at/~e0427417/browser-ponies/ponies.html and click the embed box.
// @version        0.1
// @author		   Michael Shepard
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://ajax.cdnjs.com/ajax/libs/json2/20110223/json2.js
// ==/UserScript==

//Make sure we don't run this in a frame...
if (window.top != window.self)
    return;

function appendPonies() {
    //initvars
GM_setValue('spawn',GM_getValue('spawn', JSON.stringify({
    'applejack': 1, 
    'fluttershy': 1, 
    'rainbow dash': 1,
    'twilight sparkle': 1,
    'pinkie pie': 1,
    'rarity': 1,
})))
GM_setValue('spawnRandom',GM_getValue('spawnRandom', 0));
GM_setValue('speakProbability',GM_getValue('speakProbability', 10));
GM_setValue('showLoadProgress',GM_getValue('showLoadProgress',false));
GM_setValue('audioEnabled',GM_getValue('audioEnabled',false));
GM_setValue('speed',GM_getValue('speed',30));
GM_setValue('fps',GM_getValue('fps',25));
GM_setValue('fadeDuration',GM_getValue('fadeDuration',500));
GM_setValue('showPonies',GM_getValue('showPonies',true));

// retrieve vars
fps = GM_getValue('fps');
fadeDuration = GM_getValue('fadeDuration');
speed = GM_getValue('speed') / 10;
audioEnabled = GM_getValue('audioEnabled');
showLoadProgress = GM_getValue('showLoadProgress');
speakProbability = GM_getValue('speakProbability') / 100;
spawnRandom = GM_getValue('spawnRandom');
spawn = GM_getValue('spawn');

//checkbox
jQuery("body").prepend("<div style='border-radius: 5px; background-color: pink; position: fixed; top: 32px; left: 32px; z-index: 9000;'><input type='checkbox' id='poniesaretheawesomest' /><label>&lt;&ndash;Ponies</label></div>");
jQuery("#poniesaretheawesomest").attr('checked', GM_getValue('showPonies'));
document.getElementById("poniesaretheawesomest").addEventListener('change', function(event){
    if (jQuery("#poniesaretheawesomest").attr('checked')) {
        unsafeWindow.BrowserPonies.start();
        GM_setValue('showPonies', true);
    } else {
        unsafeWindow.BrowserPonies.stop();
        GM_setValue('showPonies', false);
    }
}, false)

jQuery("body").append(unescape("%3Cscript type='text/javascript'%3E \n\
        function loadPonies(srcs, cfg) { \
    var cbcount = 1; \
    var callback = function () { \
            cbcount = cbcount - 1; \
            if (cbcount === 0) { \
                BrowserPonies.setBaseUrl(cfg.baseurl); \
                if (!BrowserPoniesBaseConfig.loaded) { \
                    BrowserPonies.loadConfig(BrowserPoniesBaseConfig); \
                    BrowserPoniesBaseConfig.loaded = true; \
                }; \
                BrowserPonies.loadConfig(cfg); \
                if (!BrowserPonies.running() && " + GM_getValue('showPonies') + ") { \
                    BrowserPonies.start(); \
                }; \
            }; \
        }; \
    if (typeof BrowserPoniesConfig === 'undefined') { \
        window.BrowserPoniesConfig = {}; \
    }; \
    if (typeof BrowserPoniesBaseConfig === 'undefined') { \
        ++cbcount; \
        BrowserPoniesConfig.onbasecfg = callback; \
    }; \
    if (typeof BrowserPonies === 'undefined') { \
        ++cbcount; \
        BrowserPoniesConfig.oninit = callback; \
    }; \
    var node = document.body || document.documentElement || document.getElementsByTagName('head')[0]; \
    for (var id in srcs) { \
        if (document.getElementById(id)) { \
            continue; \
        }; \
        if (node) { \
            var s = document.createElement('script'); \
            s.type = 'text/javascript'; \
            s.id = id; \
            s.src = srcs[id]; \
            node.appendChild(s); \
        } else { \
            document.write(unescape('%253Cscript type=\\'text/javascript\\' src=\\'' + srcs[id] + '\\' id=\\'' + id + '\\'%253E%253C/script%253E')); \
        }; \
    }; \
    callback(); \
}; \
\
srcs = { \
    'browser-ponies-script': 'http://web.student.tuwien.ac.at/%7Ee0427417/browser-ponies/browserponies.js', \
    'browser-ponies-config': 'http://web.student.tuwien.ac.at/%7Ee0427417/browser-ponies/basecfg.js' \
}; \
cfg = { \
    'baseurl': 'http://web.student.tuwien.ac.at/%7Ee0427417/browser-ponies/', \
    'fadeDuration': " + fadeDuration + ", \
    'fps': " + fps + ", \
    'speed': " + speed + ", \
    'audioEnabled': " + audioEnabled + ", \
    'showLoadProgress': " + showLoadProgress + ", \
    'speakProbability': " + speakProbability + ", \
    'spawn': " + spawn + ", \
    'spawnRandom': " + spawnRandom + " \
}; \
\
loadPonies(srcs,cfg); \n\
%3C/script%3E \
"));
}

jQuery(function() {
if (location.href == 'http://web.student.tuwien.ac.at/~e0427417/browser-ponies/ponies.html' || location.href == 'http://web.student.tuwien.ac.at/%7Ee0427417/browser-ponies/ponies.html') {
    jQuery("#main h1").html(jQuery("#main h1").html()+" <br /><span style='color: red;'>(Autoload Enabled: Adjust settings and click the embed box to save)</span>");
    jQuery("#embedcodewrap").before("<h1 style='color: red;'>Click the box below to save the autoloader settings. A message will pop up if it worked.</h1>");
    document.getElementById("embedcode").addEventListener('click', function(event) {
        event.preventDefault();
        try {
        newcfg = eval( "(" + document.getElementById("embedcode").value.split("basecfg.js\"},")[1].split(');')[0] + ")" );
        newcfg.spawn = JSON.stringify(newcfg.spawn);
        GM_setValue('fadeDuration',newcfg.fadeDuration);
        GM_setValue('spawn',newcfg.spawn);
        GM_setValue('speakProbability',Math.round(newcfg.speakProbability * 100));
        GM_setValue('showLoadProgress',newcfg.showLoadProgress);
        GM_setValue('audioEnabled',newcfg.audioEnabled);
        GM_setValue('speed',Math.round(newcfg.speed * 10));
        GM_setValue('fps',newcfg.fps);
        GM_setValue('fadeDuration',newcfg.fadeDuration);
        GM_setValue('spawnRandom',newcfg.spawnRandom);
        }
        catch(err){
            GM_setValue('spawnRandom', 0);
        }
        alert("autoloader settings saved");
    }, false)
} else {
    appendPonies();
}
})
