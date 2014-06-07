// ==UserScript==
// @name          LOL Guide
// @namespace     LOL
// @include       http://www.solomid.net/*
// @include       http://www.mobafire.com/league-of-legends/*
// ==/UserScript==


// Vias de dessarrollo:
// Usar count en pocions
// Meter mapa dominion (5v5:1 3v3:10 dominion:8, ARAM 3)
// Documentar os cambios de items na web
// Verifiacr nomes do grupos de items en Mobafire
// Automatizar mapeo de items e id.

var map = {};
map['abyssal-scepter'] = 3001;
map['aegis-of-the-legion'] = 3105;
map['amplifying-tome'] = 1052;
map['archangels-staff'] = 3003;
map['athenes-unholy-grail'] = 3174;
map['atmas-impaler'] = 3005;
map['augment:-death'] = 3198;
map['augment:-gravity'] = 3197;
map['augment:-power'] = 3196;
map['avarice-blade'] = 3093;
map['bf-sword'] = 1038;
map['banner-of-command'] = 3060;
map['banshees-veil'] = 3102;
map['berserkers-greaves'] = 3006;
map['bilgewater-cutlass'] = 3144;
map['blackfire-torch'] = 3188;
map['blade-of-the-ruined-king'] = 3153;
map['blasting-wand'] = 1026;
map['bonetooth-necklace'] = 3166;
map['boots-of-mobility'] = 3117;
map['boots-of-speed'] = 1001;
map['boots-of-swiftness'] = 3009;
map['brawlers-gloves'] = 1051;
map['catalyst-the-protector'] = 3010;
map['chain-vest'] = 1031;
map['chalice-of-harmony'] = 3028;
map['cloak-of-agility'] = 1018;
map['cloth-armor'] = 1029;
map['crystalline-flask'] = 2041;
map['dagger'] = 1042;
map['deathfire-grasp'] = 3128;
map['dorans-blade'] = 1055;
map['dorans-ring'] = 1056;
map['dorans-shield'] = 1054;
map['eleisas-miracle'] = 3173;
map['elixir-of-brilliance'] = 2039;
map['elixir-of-fortitude'] = 2037;
map['emblem-of-valor'] = 3097;
map['entropy'] = 3184;
map['executioners-calling'] = 3123;
map['faerie-charm'] = 1004;
map['fiendish-codex'] = 3108;
map['frozen-heart'] = 3110;
map['frozen-mallet'] = 3022;
map['giants-belt'] = 1011;
map['glacial-shroud'] = 3024;
map['grezs-spectral-lantern'] = 3159;
map['guardian-angel'] = 3026;
map['guinsoos-rageblade'] = 3124;
map['haunting-guise'] = 3136;
map['health-potion'] = 2003;
map['hexdrinker'] = 3155;
map['hextech-gunblade'] = 3146;
map['hextech-revolver'] = 3145;
map['hextech-sweeper'] = 3187;
map['hunters-machete'] = 1039;
map['iceborn-gauntlet'] = 3025;
map['ichor-of-illumination'] = 2048;
map['ichor-of-rage'] = 2040;
map['infinity-edge'] = 3031;
map['ionian-boots-of-lucidity'] = 3158;
map['kages-lucky-pick'] = 3098;
map['kindlegem'] = 3067;
map['kitaes-bloodrazor'] = 3186;
map['last-whisper'] = 3035;
map['liandrys-torment'] = 3151;
map['lich-bane'] = 3100;
map['locket-of-the-iron-solari'] = 3190;
map['long-sword'] = 1036;
map['madreds-razors'] = 3106;
map['malady'] = 3114;
map['mana-manipulator'] = 3037;
map['mana-potion'] = 2004;
map['manamune'] = 3004;
map['maw-of-malmortius'] = 3156;
map['mejais-soulstealer'] = 3041;
map['mercurial-scimitar'] = 3139;
map['mercurys-treads'] = 3111;
map['mikaels-crucible'] = 3222;
map['morellonomicon'] = 3165;
map['muramana'] = 3042;
map['nashors-tooth'] = 3115;
map['needlessly-large-rod'] = 1058;
map['negatron-cloak'] = 1057;
map['ninja-tabi'] = 3047;
map['null-magic-mantle'] = 1033;
map['odyns-veil'] = 3180;
map['ohmwrecker'] = 3056;
map['oracles-elixir'] = 2042;
map['oracles-extract'] = 2047;
map['overlords-bloodmail'] = 3084;
map['phage'] = 3044;
map['phantom-dancer'] = 3046;
map['philosophers-stone'] = 3096;
map['pickaxe'] = 1037;
map['prospectors-blade'] = 1062;
map['prospectors-ring'] = 1063;
map['quicksilver-sash'] = 3140;
map['rabadons-deathcap'] = 3089;
map['randuins-omen'] = 3143;
map['ravenous-hydra-(melee-only)'] = 3074;
map['recurve-bow'] = 1043;
map['rejuvenation-bead'] = 1006;
map['rod-of-ages'] = 3027;
map['ruby-crystal'] = 1028;
map['ruby-sightstone'] = 2045;
map['runaans-hurricane-(ranged-only)'] = 3085;
map['runic-bulwark'] = 3107;
map['rylais-crystal-scepter'] = 3116;
map['sanguine-blade'] = 3181;
map['sapphire-crystal'] = 1027;
map['seraphs-embrace'] = 3040;
map['shard-of-true-ice'] = 3092;
map['sheen'] = 3057;
map['shurelyas-reverie'] = 3069;
map['sight-ward'] = 2044;
map['sightstone'] = 2049;
map['sorcerers-shoes'] = 3020;
map['spirit-stone'] = 1080;
map['spirit-visage'] = 3065;
map['spirit-of-the-ancient-golem'] = 3207;
map['spirit-of-the-elder-lizard'] = 3209;
map['spirit-of-the-spectral-wraith'] = 3206;
map['statikk-shiv'] = 3087;
map['stinger'] = 3101;
map['sunfire-cape'] = 3068;
map['sword-of-the-divine'] = 3131;
map['sword-of-the-occult'] = 3141;
map['tear-of-the-goddess'] = 3070;
map['the-black-cleaver'] = 3071;
map['the-bloodthirster'] = 3072;
map['the-brutalizer'] = 3134;
map['the-hex-core'] = 3200;
map['the-lightbringer'] = 3185;
map['thornmail'] = 3075;
map['tiamat-(melee-only)'] = 3077;
map['trinity-force'] = 3078;
map['twin-shadows'] = 3023;
map['vampiric-scepter'] = 1053;
map['vision-ward'] = 2043;
map['void-staff'] = 3135;
map['wardens-mail'] = 3082;
map['warmogs-armor'] = 3083;
map['will-of-the-ancients'] = 3152;
map['wits-end'] = 3091;
map['wooglets-witchcap'] = 3090;
map['wriggles-lantern'] = 3154;
map['youmuus-ghostblade'] = 3142;
map['zeal'] = 3086;
map['zekes-herald'] = 3050;
map['zephyr'] = 3172;
map['zhonyas-hourglass'] = 3157;
map['health-potion3'] = 2003;
map['health-potion2'] = 2003;
map['health-potion4'] = 2003;
map['health-potion5'] = 2003;

function chageItem(s){
    if( s=='rabadons-deathcap')  return 'wooglets-witchcap';
    if( s=='warmogs-armor') return 'frozen-mallet';
    if( s=='the-bloodthirster') return 'sanguine-blade';
    if( s=='guardian-angel') return 'runic-bulwark';
    //
   return s ;
}


function solomid(){
    var first = 1;
    var campeon = document.getElementsByClassName('champname')[0].innerHTML.toLowerCase();
    campeon= campeon.charAt(0).toUpperCase() + campeon.substr(1);
    var json3='{"champion":"'+campeon+'","title":"Downloade build","priority":true,"map":"10","blocks":[{"items":[';
    var json5='{"champion":"'+campeon+'","title":"Downloade build","priority":true,"map":"1","blocks":[{"items":[';
    var itembox = document.getElementsByClassName('itemsboxcontent');
    for (var i=0; i<itembox.length; i++){
        var list= itembox[i].childNodes;
        for (var j=1; j<list.length; j++){
            if (list[j].tagName== 'IMG')
                if (list[j].getAttribute('alt')!=''){
                    if (first ==1 ){
                        json3+= '{"id":"'+map[chageItem(list[j].getAttribute('alt'))]+'","count":1}';
                        json5+= '{"id":"'+map[list[j].getAttribute('alt')]+'","count":1}';
                        first = 0;
                    }
                    else{
                        json3+= ',{"id":"'+map[chageItem(list[j].getAttribute('alt'))]+'","count":1}';
                        json5+= ',{"id":"'+map[list[j].getAttribute('alt')]+'","count":1}';
                    }
                }
        }
        json3+='],"type":"all Items"}],"_notes":"","type":"default","mode":"CLASSIC","_author":""}';
        json5+='],"type":"all Items"}],"_notes":"","type":"default","mode":"CLASSIC","_author":""}';
    }    
    var menuobj = document.createElement('ul');
    menuobj.innerHTML ='<br><br> Click on Download and save the file in \"League of Legends\\Config\\Champions\\'+campeon+'\\Recommended\\build.json'+'<br> <a id="Download3"  >Download 3V3</a>   <a id="Download5"  >Download 5V5</a> <a id="DownloadARAM"  >Download ARAM</a></tr>' ;
 	var  built = document.getElementsByClassName('itemsbox');
    built[0].appendChild(menuobj);
	var a = document.getElementById("Download3");
    a.onclick = function() {
        window.open("data:application/octet-stream, " + json3,'',0);
        return false;
    }
    var b = document.getElementById("Download5");
    b.onclick = function() {
        window.open("data:application/octet-stream, " + json5,'',0);
        return false;
    }
      var c = document.getElementById("DownloadARAM");
    c.onclick = function() {
        var n=json5.replace("\"map\":\"1\"","\"map\":\"3\"");
        window.open("data:application/octet-stream, " + n,'',0);
        return false;
    }
	
}





function mobafire(){
    var first = 1;
    var fg=1;
    var campeon= document.getElementsByClassName('float-left build-name')[0].childNodes[3].childNodes[1].innerHTML;
    campeon =campeon.split(" ").join("");
    var jsonv3='{"champion":"'+campeon+'","title":"Downloade built","priority":true,"map":"10","blocks":[';
    var jsonv5='{"champion":"'+campeon+'","title":"Downloade built","priority":true,"map":"1","blocks":[';
    var itemsGrups= document.getElementsByClassName('item-wrap self-clear float-left');
    for (var i=0; i<itemsGrups.length; i++){
        var childlist= itemsGrups[i].childNodes; 
        var chi= childlist[1].innerText.split(" ").join("-").split("\"").join(""); // Via desarrolo Nome grupos
        if (fg == 1) {
        	jsonv3+='{"items":[';
            jsonv5+='{"items":[';
            fg =0;
        } else{
            jsonv3+=',{"items":[';
            jsonv5+=',{"items":[';
        }
        var IMGs= itemsGrups[i].getElementsByTagName('IMG');
        for (var j=0; j<IMGs.length; j++){
           var item =IMGs[j].getAttribute('alt').toLowerCase().split(" ").join("-").split("'").join("").split(".").join("");
            
           var iteml=item.substr(0,item.length-4);
           if (first==1 ){
           		jsonv3+= '{"id":"'+map[chageItem(iteml)]+'","count":1}';
                jsonv5+= '{"id":"'+map[iteml]+'","count":1}';
                first=0;
           } 
            else {
                jsonv3+= ',{"id":"'+map[chageItem(iteml)]+'","count":1}';
                jsonv5+= ',{"id":"'+map[iteml]+'","count":1}';
            }
       }
       jsonv3+='],"type":"'+ chi +'"}';    
       jsonv5+='],"type":"'+ chi +'"}';   
       first=1;
    }
    jsonv3+='],"_notes":"","type":"default","mode":"CLASSIC","_author":""}';
    jsonv5+='],"_notes":"","type":"default","mode":"CLASSIC","_author":""}';
    var  menuobj = document.createElement('ul');
    menuobj.innerHTML ='<tr><br><br> Click on Download and save the file in \"League of Legends\\Config\\Champions\\'+campeon+'\\Recommended\\build.json'+'<br> <a id="Download3"  >Download 3V3</a>   <a id="Download5"  >Download 5V5</a> <a id="DownloadARAM"  >Download ARAM</a> </tr>' ;
    var built = document.getElementsByClassName('rune-wrap self-clear');
    built[0].appendChild(menuobj);
    
    var a = document.getElementById("Download3");
    a.onclick = function() {
        window.open("data:application/octet-stream, " + jsonv3,'',0);
        return false;
    }
    var b = document.getElementById("Download5");
    b.onclick = function() {
        window.open("data:application/octet-stream, " + jsonv5,'',0);
        return false;
    }
        var c = document.getElementById("DownloadARAM");
    c.onclick = function() {
        var n=jsonv5.replace("\"map\":\"1\"","\"map\":\"3\"");
        window.open("data:application/octet-stream, " + n,'',0);
        return false;
    }
    
}    


var url= document.location.href.substring(0,22);
if (url=='http://www.solomid.net')  solomid();
else if (url=='http://www.mobafire.co') mobafire();
