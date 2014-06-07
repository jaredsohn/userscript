// ==UserScript==
// @name           Auto Fighters
// @namespace      kol.interface.unfinished
// @description    Plays the Fighters of Fighting mini-game in KoL for you.
// @include        http://*kingdomofloathing.com/choice.php*
// @include        http://127.0.0.1:*/choice.php*
// ==/UserScript==

// Version 1.0

var m = {
    // Vaso de Agua
    'Vaso de Agua downs a beer, then says, "Una cerveza, una lanza a la cabeza!"  Before you can translate, you see his foot flying at your head, and that\'s the universal language.':'Gut Punch',
    'Vaso de Agua says, "sometimes, I think that unrequited love is the greatest pain anyone can suffer.  Then I remember that a well-placed foot to the groin is far, far more painful.  Thank you for reminding me of that, amigo."':"Knee Punch",
    'Vaso de Agua says, "when my lover, Laharina, left me, I felt as though my feet had been knocked out from under me.  Allow me to demonstrate how that feels, amigo."  He crouches down, ready to sweep you off your feet.':'Throat Punch',
    'Vaso de Agua cocks back one exquisitely manicured fist and aims it straight at your throat.':'Leg Sweep',
    'Vaso de Agua says, "your abdomen is flabby and unappealing compared to my flawless musculature, amigo.  But perhaps a few bruises would add to its aesthetic appeal."  He aims a helpful fist at your gut.':'Head Kick',
    'Vaso de Agua says, "you know, amigo, the pain of lost love is like a punch in the knee.  Okay, you got me, it\'s nothing like a punch in the knee.  But I\'m about to punch you in the knee."':'Groin Kick',

    // Serenity
    'Serenity says, "clearly you need a reboot, coppertop.  Maybe a hard boot to the head will clear your RAM!"':'Leg Sweep',
    'Serenity says, "sometimes, the only way to free a mind from the asymmetric net is with a nice, solid kick to the gonads!"':'Groin Kick',
    'Serenity crouches down and prepares to knock your ankles out from under you.  Well, it could be worse; she could be spouting her weird religious propaganda.':'Head Kick',
    'Serenity fires a warning shot with her crossbow.  Well, given how good a shot she is, they\'re pretty much *all* warning shots.  You chuckle at that thought, and she scowls and launches a fist at your throat.':'Gut Punch',
    'Serenity says, "if you\'re not enlightened, you\'re an agent of the asymmetric net!  And agents of the asymmetric net tend to get punched in the small intestine!"  You\'re not sure how she\'s going to pull that off, but you\'re sure you want to stop her from trying.':'Throat Punch',
    'Serenity says, "I\'m not going to stand for your ignorance, and neither are you!"  You start to ask what she meant by that, then notice she\'s about to punch you in the knee.':"Knee Punch",

    // Morbidda
    'A pseudopod detaches itself from Morbidda\'s costume, forming itself into a foot and launching itself at your head.':'Groin Kick',
    'Morbidda says, "you know, in Hey Deze I became skilled in a thousand thousand ways of causing pain.  But sometimes the simplest ones are the best."  Then she aims a knee square at your groin.':'Head Kick',
    'Morbidda shouts, "soon your soul will belong to me!  But for now, your soles can be pointed at the sky!"  She drops down into a crouch, trying to trip you up.':'Leg Sweep',
    'Morbidda shouts, "if you will not praise the dark Lord, perhaps your pained gurgling will please him!"  Then she cocks back a fist and aims it at your throat.':'Throat Punch',
    'Morbidda shouts, "if you will not kneel before the dark Lord, you can at least double over in pain!" and aims a punch at your solar plexus.':"Knee Punch",
    'Morbidda looks you up and down with an expert torturer\'s eye, trying to decide where to best inflict the maximum amount of pain.  Looks like she\'s chosen "fist to kneecap" as the best way, and who are you to argue with an expert?':'Gut Punch',

    // Kitty the Zmobie Basher
    'Kitty shouts, "you really need to get your head in the game!" and launches a kick straight at your forehead.':'Head Kick',
    'Kitty says, "I have a feeling you\'re about to get some paininess in your sexy parts."':'Leg Sweep',
    'Kitty says, "I\'m not exactly quaking in my stylish-yet-affordable boots here.  Especially since you\'re about to be flat on your back."  She crouches down, ready to sweep your leg.':'Groin Kick',
    'Kitty rolls her eyes and says, "Gah, will you just <i>shut up</i> already?"  As you\'re thinking, <i>wait, which of us said that?</i>, you see she\'s about to punch you in the throat.':"Knee Punch",
    'Kitty says, "you know, when Graah left me, it felt like a punch to the gut.  Kind of like how this punch I\'m about to deliver to your gut is going to feel like a punch to the gut!"':"Gut Punch",
    'Kitty says, "bored now," and aims a punch at your kneecap.':'Throat Punch',

    // Thorny Toad
    'Thorny hops into the air, his webbed feet inches from your skull, his powerful leg muscles poised to deliver a vicious kick to the head.':'Throat Punch',
    'Thorny\'s powerful leg muscles bunch as his eyes roam up and down your body, looking for a place to kick.  Fantastic. . . looks like he\'s going for the groin.':'Gut Punch',
    'Thorny says, "if a man can\'t stand, he can\'t fight croak croak!" and crouches to try and sweep your legs.':"Knee Punch",
    'He says, "Thorny make you croak, croak croak!" and launches a fist at your throat.':'Head Kick',
    'Thorny balls up one webbed-fingered fist and aims it square at your gut.':'Groin Kick',
    'Thorny says, "Thorny have joke!  How deep is water in Thorny\'s swamp?  Knee-deep!  Knee-deep!" and aims a punch at your knee.':'Leg Sweep',

    // Roo
    'Roo balances on his tail and aims one big, flat foot at your head.':'Knee Punch',
    'Roo says, "it would be dishonorable as a warrior for me to pummel you in your primary sexual characteristics, but sometimes such a pummeling is expedient enough to justify its ignominy ha ha ha ha!"  Then he aims a foot right at your crotch.':'Throat Punch',
    'Roo says, "if a man or woman is unable to remain upright it is impossible for that individual to fight don\'t you know!" and aims his tail at your ankles.':'Gut Punch',
    'Roo floats like a butterfly, and prepares to sting like a bee, provided the way bees sting is to punch you in the throat.':'Groin Kick',
    'Roo says, "baby I was never cool enough to get a job in a record store you know!" and prepares to suckerpunch you in the gut.':'Leg Sweep',
    'Roo says, "ordinarily, a fighter would never punch his opponent in the knee ha ha for the patella would mangle his own fingers you know!  But I am wearing boxing gloves for great justice!"  He aims a punch square at your kneecap.':'Head Kick'
};


function doAction(vars) {
    GM_xmlhttpRequest({
            method: "POST",
                url: "http://" + location.host + "/choice.php",
                headers: {"Content-type": "application/x-www-form-urlencoded"},
                data: vars,
                onload: function(response){
                var d = document.getElementById('fighterresult');
                if (!d) {
                    var p = document.body.firstChild;
                    while (p.nextSibling && p.tagName!='CENTER') {
                        p = p.nextSibling;
                    }
                    d = document.createElement('center');
                    d.setAttribute('id','fighterresult');
                    p.parentNode.replaceChild(d,p);
                }
                d.innerHTML = response.responseText;
                if (!response.responseText.match(/You acquire.*Game Grid tickets/))
                    setTimeout(check,1000);
                //location.reload(); 
            }
        });
}

function check() {
    for (var x in m) {
        if (document.body.innerHTML.indexOf(x)>0) {
            // found it
            //GM_log('found text, result should be: '+m[x]);
            var opt = document.evaluate( '//input[@value="'+m[x]+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
            if (opt.singleNodeValue) {
                opt.singleNodeValue.setAttribute('style','color:red;');
                var f = opt.singleNodeValue.parentNode;
                while (f.tagName!='FORM')
                    f = f.parentNode;
                var ps = document.evaluate('.//input',f,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
                var args = '';
                for (var i=ps.snapshotLength-1;i>=0;i--) {
                    var p = ps.snapshotItem(i);
                    var n = p.getAttribute('name');
                    if (n) {
                        if (args)
                            args += '&';
                        args += n+'='+encodeURI(p.getAttribute('value'));
                    }
                }
                doAction(args);
            }
            break;
        }
    }
}

var snap = document.evaluate( '//b[text()="Fighters of Fighting"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if (snap.singleNodeValue) {
    check();
}
