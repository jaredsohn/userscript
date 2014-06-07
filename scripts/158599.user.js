// ==UserScript==
// @name           Guild Members Chat Marker
// @namespace      tag://kongregate
// @description    Kongregate's Dawn of the Dragons Chat Guild Memebers Marker
// @author         Berbelucha
// @version        1.0.3
// @date           07.02.2012
// @grant          none
// @include        *kongregate.com/games/5thPlanetGames/dawn-of-the-dragons*
// @include        *web*.dawnofthedragons.com/kong*
// @include        http://userscripts.org/scripts/review/158599
// ==/UserScript==

function main() {
    Array.prototype.unique = function() {
        var a = this.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    };
    
    if (typeof GM_setValue == 'undefined' || typeof GM_getValue == 'undefined' || typeof GM_deleteValue == 'undefined') {//gm storage functions
        GM_setValue = function(name, value) {
            localStorage.setItem(name, value);
        }
        GM_getValue = function(name, dvalue) {
            var value = localStorage.getItem(name);
            if (typeof value != 'string') {
                return dvalue;
            }
            else {
                var type = value.substring(0, 1);
                if (type != '{')
                    value = value.substring(1);
                if (type == 'b') {
                    return (value == 'true');
                }
                else if (type == 'n') {
                    return Number(value);
                }
                else {
                    return value;
                }
            }
        }
        GM_deleteValue = function(name) {
            localStorage.removeItem(name);
        }
    }
    
    window.GMCM = {
        config: (function(){
            try {
                var tmp = JSON.parse(GM_getValue("GMCM","{}"));
            }catch (e) {
                var tmp = {};
            }
            tmp.guildMembers = (typeof tmp.guildMembers == 'string'?tmp.guildMembers:"");
            tmp.guildColor = (typeof tmp.guildColor == 'string'?tmp.guildColor:"#D113CB");
            tmp.save = function (b) {
                b = (typeof b==='undefined'?false:b);
                GM_setValue("GMCM",JSON.stringify(GMCM.config));
                if(b) setTimeout("GMCM.config.save(true);",30000);
            }
            return tmp;
        })(),
        guildMembersSet: function(b){
            var gM = GMCM.config.guildMembers.split("\n");
            var guild = {};
            for(var i=0; i<gM.length; i++){
                var m = gM[i].split(',');
                guild[m[0]] = m[1];
            }
            var users = document.querySelectorAll('.username');
            if(users.length > 0){
                for(var i=0;i<users.length;i++){
                    var name = users[i].getAttribute('username');
                    if(typeof guild[name] != 'undefined'){
                        if(users[i].parentNode.className.indexOf('whisper') == -1)
                            users[i].innerHTML = guild[name];
                        else{
                            var pref = "To ";
                            if(users[i].parentNode.className.indexOf('received_whisper') != -1) pref = "From ";
                            users[i].innerHTML = pref+guild[name];
                        }
                        users[i].style.fontWeight = 'bold';
                        users[i].style.color = GMCM.config.guildColor;
                    } else {
                        users[i].style.fontWeight = 'normal';
                        if(users[i].parentNode.tagName.toLowerCase() == "div"){
                            users[i].style.color = "#000";
                        } else {
                            users[i].style.color = "#285588";
                        }
                    }
                }
            }
            if(b && typeof document.querySelectorAll('.users_in_room')[1] != "undefined"){
                var parent = document.querySelectorAll('.users_in_room')[1];
                var childNodes = parent.childNodes;
                for(var i=0;i<childNodes.length;i++){
                    try{
                        var id = childNodes[i].getAttribute('id');
                        var user = id.match(/\user_[a-z0-9\_\-]+\_room/i)[0].replace(/\user_/,'').replace(/\_room/,'');
                        if(user in guild || (childNodes[i].hasOwnProperty("marked") && childNodes[i].getAttribute("marked") != "true")){
                            childNodes[i].setAttribute("marked", "true");
                            parent.insertBefore(childNodes[i],childNodes[1]);
                        } else {
                            
                        }
                    }catch(e){}
                }
            }
            console.log("[GMCM] Parsing chat...")
            if(b) setTimeout("GMCM.guildMembersSet(true);",10000);
        },
        setGuild: function () {
            GMCM.config.guildMembers = document.getElementById("GMCMGuildInput").value;
            GMCM.config.guildColor = document.getElementById("GMCMGuildColor").value;
            GMCM.config.save(false);
        },
        show: function(){
            var el = document.getElementById("GMCMGuildDiv");
            if(el.style.display == "none" || el.style.display == ""){
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        }
    };
    var GMCMlink = document.createElement("li");
    GMCMlink.setAttribute('class', 'spritegame GMCM_link');
    GMCMlink.innerHTML = '<a href="http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons" onclick="GMCM.show();return false;">GMCM</a>';
    document.getElementById("quicklinks").appendChild(GMCMlink);
    
    var GMCMhtml = '<div id="GMCMGuildDiv"> \
<div class="header">Guild Members Chat Marker</div>\
                        <div class="GMCMinner">\
                            <div id="GMCMclose">X</div>\
                            <input name="Submit"  type="button" value="Save" onClick="GMCM.setGuild();return false;"/><br> \
                            <input type="text" value="#D113CB" id="GMCMGuildColor" name="GMCMGuildColor" /><br> \
                            <textarea id="GMCMGuildInput" name="GMCMGuildInput" ></textarea> \
                        </div>\
                </div>';
    document.getElementsByClassName('links_connect')[0].innerHTML += GMCMhtml;
    
    GMCMStyles = '#GMCMGuildDiv{ display: none; position: absolute; top: 20px; left: 0; width: 200px; height: 400px; background: #FFF; border: 1px solid #CACACA; box-shadow: 0 0 5px #000; z-index: 899; }';
    GMCMStyles += '.links_connect{ position: relative; }';
    GMCMStyles += '#GMCMGuildDiv input, #GMCMGuildDiv textarea{ width: 190px; margin: 5px 0; }'+
'li.GMCM_link{ background-position-y: -132px; }'+
    '#GMCMGuildDiv textarea{ height: 300px; }'+
    '#GMCMGuildDiv .GMCMinner{ position: relative; }'+
'#GMCMGuildDiv .GMCMinner #GMCMclose{ position: absolute; top: -27px; right: -7px; width: 15px; height: 15px; background: #FFF; border: 1px solid #CACACA; box-shadow: 0 0 5px #000; z-index: 999; border-radius: 10px; cursor: pointer; line-height: 15px; font-weight: bold; font-size: 10px; }'+
'#GMCMGuildDiv .header{ height: 20px;height: 1;background: #CACACA;line-height: 20px;font-size: 12px;font-weight: bold;color: #303030;cursor: move; }';;
    document.getElementsByTagName('style')[0].innerHTML += GMCMStyles;
    
    var GMCMGuildText="Kong name,Guild Name<enter>\n NO SPACES!";
    document.getElementById("GMCMGuildColor").value = GMCM.config.guildColor;
    if(GMCM.config.guildMembers == ""){
        document.getElementById("GMCMGuildInput").value=GMCMGuildText;
    } else {
        document.getElementById("GMCMGuildInput").value=GMCM.config.guildMembers;
    }
    document.getElementById("GMCMGuildInput").addEventListener("blur",function() {
        if (this.value == "") {
            this.value = GMCMGuildText;
        }
    });
    document.getElementById("GMCMGuildInput").addEventListener("focus",function() {
        if (this.value == GMCMGuildText) {
            this.value = "";
        }
    });
    
    document.getElementById("GMCMclose").addEventListener("click",function(){
        document.getElementById("GMCMGuildDiv").style.display = "none";
    });
    GMCM.guildMembersSet(true);
    
//    #user_rollover_template .user_rollover spritesite .user_rollover_inner
//    <p class="rollover_mute_link_holder media" id="rollover_mute_link_holder">"
//      <a id="rollover_mute_link" class="rollover_mute_link bd" href="#" style="">Mute</a>
//    </p>
}

if (/^http:\/\/www\.kongregate\.com\/games\/5thplanetgames\/dawn-of-the-dragons(?:\/?$|\?|#)/i.test(document.location.href)) {//main
    var script = document.createElement("script");
    script.appendChild(document.createTextNode('('+main+')()'));
    (document.head || document.body || document.documentElement).appendChild(script);
}