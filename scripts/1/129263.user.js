// ==UserScript==
// @name           memecompleter 
// @namespace      http://www.infusionss.com/
// @description    Importante: "SOLO PARA USO CONJUNTO A SOCOAL MEMES" auto completa una etiqueta en los campos de texto actualmente solo para facebook y cuanto cabron 
// 
// @require http://code.jquery.com/jquery.js
// @require http://code.jquery.com/ui/1.8.18/jquery-ui.js
// 
// @include *.cuantocabron.com/*
// @include *.facebook.com/*
// @include *.facebook.com/messages/*
// @include *.facebook.com/plugins/comments.php*
// @exclude *.facebook.com/plugins/likebox.php*
// @exclude *.facebook.com/plugins/like.php*
// @exclude *.facebook.com/connect/connect.php?*
// @exclude *.facebook.com/plugins/recommendations.php*
// @exclude *.facebook.com/plugins/activity.php*
// 
// 
// @version 0.3
// ==/UserScript==

$(document).ready(function() { // wait for the document to load. you might not want this in all scripts
    //console.log($); // check if the dollar (jquery) function works
    //console.log($().jquery); // check jQuery version
    //console.log(emoticons);
    
    $('head').append('<link href="http://code.jquery.com/ui/1.8.18/themes/flick/jquery-ui.css" rel="stylesheet" type="text/css">');
    
    var style = "<style type=\"text/css\">";
    style += " ul.ui-autocomplete{width: 400px; height: 70px;overflow: auto;}";
    style += " .ui-menu .ui-menu-item {clear: none;float: left;margin: 0;padding: 0;width: 64px;}";
    style += " .ui-menu .ui-menu-item a {display: block;line-height: 0;padding: 2px;text-decoration: none;}";
    style += " .ui-widget-content a {color: #444444;}";
    style += " .ui-widget-content a img{height: 60px; width: 60px;}";
    style += "\n</style>";
    
    $('head').append(style);
    /*
    $.get('https://jsfiddle.net/Delzon/AKzJs/show/',function(data){
        console.info(data)
    });
    */
    var availableTags = [":-tuversion-:",":yuuko-bling:",":yuuko-confused:",":yuuko-rofl:",":yuuko-idea:",":yuuko-evilsmile:",":yuuko-like:",":yuuko-shocked:",":yuuko-sad:",":hakase-nyan:",":sakamoto-sleeping:",":miya:",":morishima:",":rihoko:",":sae:",":ai:",":ayatsuji:",":junichi:",":kaoru:",":kagami:",":tsukasa:",":konata:",":miyuki:",":sojiro:",":itsuki:",":taniguchi:",":kyon:",":kyon-no-imouto:",":mikuru:",":haruhi:",":nagato:",":doctor500miles:",":dalek:",":1doctor:",":2doctor:",":3doctor:",":4doctor:",":5doctor:",":6doctor:",":7doctor:",":8doctor:",":9doctor:",":10doctor:",":11doctor:",":comegetsome:",":faponyou:",":flippingtable:",":nogusta:",":nojodas:",":ohgodwhy:",":philosoraptor:",":rage:",":slowpoke:",":thatsracist:",":type:",":whywhywhy:",":zorra1000:",":aw:",":awesome:",":yes:",":trollkitty:",":trollflame:",":trolledtroll:",":thisissparta:",":tacocat:",":reallife:",":pedodog:",":pedobot:",":pedoboo:",":over9000:",":ooo:",":onedoesnot:",":herpderp:",":feellikeagamer:",":epicfacepalm:",":doainternet:",":dammit:",":cryrainbows:",":cyoot:",":chuckthumbsup:",":byebyebye:",":omgomgomg:",":youdontsay:",":yaominggirl:",":creepygusta:",":quemalote:",":hero:",":hijadeputa:",":hijodeputa:",":theobserver:",":observer:",":yaomingscared:",":yaomingew:",":queesestamierda:",":perfecto:",":mexican:",":fuckyou:",":fucklogic:",":trollfacegif:",":lololol:",":salfate:",":despreocupado:",":impossibru:",":nomedigas:",":watchout:",":problem:",":santaclaustroll:",":adios:",":epiccry:",":chucktesta:",":cerealguyspitting:",":waitaminute:",":umad:",":teena.laugh:",":epicfuu:",":weegee:",":success:",":feelbro:",":freddie:",":freddiemercury:",":eviltroll:",":businesscat:",":mustnotfap:",":neveralone:",":melvin:",":icanfaptothis:",":ilovelife:",":thegame:",":haruhi:",":konata:",":paralawea:",":t-raisins:",":feellikeahuaso:",":exito:",":infinitoaprecio:",":badpokerface:",":loading:",":maximumtrolling:",":ohreally?:",":yareally:",":imwatchingyou:",":everywhere:",":notbad:",":venganza:",":areyouserious:",":thefuck:",":thumbsup:",":staredad:",":iamdisappoint:",":hmmm:",":grin:",":bighappy:",":troll:",":trollface:",":trollanim:",":trolldance:",":trolldad:",":areufuckingkiddingme:",":areyoufuckingkiddingme:",":awesomeface:",":awwyea:",":happy:",":boring:",":meh:",":cerealguy:",":challengeaccepted:",":cry:",":cryhappy:",":fapfapfap:",":feellikeaninja:",":feellikeasir:",":foreveralone:",":foreveralonehappy:",":friki:",":fry:",":futuramafry:",":fua:",":fuckyea:",":fuu:",":fffuuu:",":f7u12:",":fuuu:",":girlfap:",":girlfuckyea:",":girlhappy:",":girlhappy2:",":girlrage:",":girlmegusta:",":girltroll:",":girlmad:",":girlwait:",":girlyaoming:",":gtfo:",":happy:",":inglip:",":itsfree:",":itssomething:",":jelly:",":lied:",":ilied:",":menti:",":lol:",":megusta:",":mentira:",":miradafija:",":stare:",":motherofgod:",":nervious:",":no:",":nothingtodohere:",":okay:",":omg:",":pcguy:",":pedobear:",":pfft:",":pokerface:",":pukerainbows:",":serious:",":siclaro:",":suspicious:",":sweetjesus:",":hmm:",":thinking:",":truestory:",":why:",":whynot:",":yaoming:",":yuno:",":zomg:",":raisins:",":fu:",":infinitodesprecio:",":foreverchacalone:",":drunk:",":nomegusta:",":sad:",":nyancat:",":sohardcore:",":trollslap:",":rageanim:",":lmao:",":foreveralonedance:",":gaytroll:",":facepalm:",":noleiuncarajo:",":mio:",":yui:",":ritsu:",":mugi:",":azusa:",":ui:",":nodoka:",":sawa-chan:",":k-on:",":yui-shocked:",":yui-scare:",":yui-tired:",":ritsu-shocked:",":azusa-shocked:",":lol-azusa:",":azusa-tired:"];
    var complete = function(){
        $("input:text,textarea")            
            .autocomplete('destroy')
            .unbind()
            .autocomplete({
                source: availableTags,
                minLength: 2,
                autoFocus: true               
            });
        $('ul.ui-autocomplete').css('z-index','5');
    }
    complete();
    window.setInterval(complete, 15000, true);
    //setTimeout(complete(), (60000), true);
});