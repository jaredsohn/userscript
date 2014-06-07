// ==UserScript==
// @name          TwitchToFB
// @description   adds your fave Twitch emotes to your facebook conversations
// @homepage      https://modesttim.com/
// @version       1.1
// @match         https://www.facebook.com/*
// @copyright     ©2014 Timothy Cole All rights reserved. 
// ==/UserScript==

function twitchEmo(file) {
    return '<img src="https://static-cdn.jtvnw.net/jtv_user_pictures/' + file + '">';
}

var emotes = [
    //Global Twitch
    [/4Head/g,         twitchEmo('chansub-global-emoticon-76292ac622b0fc38-20x30.png')],
    [/ArsonNoSexy/g,         twitchEmo('chansub-global-emoticon-e13a8382e40b19c7-18x27.png')],
    [/AsianGlow/g,         twitchEmo('chansub-global-emoticon-a3708d1e15c3f197-24x30.png')],
    [/BCWarrior/g,         twitchEmo('chansub-global-emoticon-1e3ccd969459f889-29x27.png')],
    [/BORT/g,         twitchEmo('chansub-global-emoticon-6f9fa95e9e3d6a69-19x30.png')],
    [/BibleThump/g,         twitchEmo('chansub-global-emoticon-f6c13c7fc0a5c93d-36x30.png')],
    [/BigBrother/g,         twitchEmo('chansub-global-emoticon-63c10b84aaddd77c-24x30.png')],
    [/BionicBunion/g,         twitchEmo('chansub-global-emoticon-740242272832a108-30x30.png')],
    [/BlargNaut/g,         twitchEmo('chansub-global-emoticon-a5293e92212cadd9-21x27.png')],
    [/BloodTrail/g,         twitchEmo('chansub-global-emoticon-f124d3a96eff228a-41x28.png')],
    [/BrainSlug/g,         twitchEmo('chansub-global-emoticon-d8eee0a259b7dfaa-30x30.png')],
    [/BrokeBack/g,         twitchEmo('emoticon-4057-src-770e3d6c306dda14-28x28.png')],
    [/CougarHunt/g,         twitchEmo('chansub-global-emoticon-551cd64fc3d4590a-21x27.png')],
    [/DAESuppy/g,         twitchEmo('chansub-global-emoticon-ef2a16bdc037bc91-28x28.png')],
    [/DBstyle/g,         twitchEmo('chansub-global-emoticon-1752876c0d0ec35f-21x30.png')],
    [/DansGame/g,         twitchEmo('chansub-global-emoticon-ce52b18fccf73b29-25x32.png')],
    [/DatSheffy/g,         twitchEmo('chansub-global-emoticon-bf13a0595ecf649c-24x30.png')],
    [/DogFace/g,         twitchEmo('chansub-global-emoticon-d0134a612162a147-22x28.png')],
    [/EagleEye/g,         twitchEmo('chansub-global-emoticon-95eb8045e7ae63b8-18x27.png')],
    [/EleGiggle/g,         twitchEmo('emoticon-4339-src-07433e94eae8754e-28x28.png')],
    [/EvilFetus/g,         twitchEmo('chansub-global-emoticon-484439fc20e0d36d-29x30.png')],
    [/FPSMarksman/g,         twitchEmo('chansub-global-emoticon-6c26a3f04616c4bf-20x27.png')],
    [/FUNgineer/g,         twitchEmo('chansub-global-emoticon-731296fdc2d37bea-24x30.png')],
    [/FailFish/g,         twitchEmo('chansub-global-emoticon-c8a77ec0c49976d3-22x30.png')],
    [/FrankerZ/g,         twitchEmo('chansub-global-emoticon-3b96527b46b1c941-40x30.png')],
    [/FreakinStinkin/g,         twitchEmo('chansub-global-emoticon-d14278fea8fad146-19x27.png')],
    [/FuzzyOtterOO/g,         twitchEmo('chansub-global-emoticon-d141fc57f627432f-26x26.png')],
    [/GingerPower/g,         twitchEmo('chansub-global-emoticon-2febb829eae08b0a-21x27.png')],
    [/GrammarKing/g,         twitchEmo('emoticon-3632-src-c3bf1bef4de9bb99-28x28.png')],
    [/HassanChop/g,         twitchEmo('chansub-global-emoticon-22c6299e539344a9-19x28.png')],
    [/HotPokket/g,         twitchEmo('chansub-global-emoticon-55873089390f4a10-28x30.png')],
    [/ItsBoshyTime/g,         twitchEmo('chansub-global-emoticon-e8e0b0c4e70c4fb8-18x18.png')],
    [/JKanStyle/g,         twitchEmo('chansub-global-emoticon-3a7ee1bc0e5c9af0-21x27.png')],
    [/Jebaited/g,         twitchEmo('chansub-global-emoticon-39dff1bb9b42cf38-21x30.png')],
    [/JonCarnage/g,         twitchEmo('chansub-global-emoticon-6aaca644ea5374c6-20x27.png')],
    [/KZassault/g,         twitchEmo('emoticon-5248-src-914192574ba9feec-28x28.png')],
    [/KZcover/g,         twitchEmo('emoticon-5249-src-c649b1d10e887587-28x28.png')],
    [/KZguerilla/g,         twitchEmo('emoticon-5250-src-da9dd1029955070e-28x28.png')],
    [/KZhelghast/g,         twitchEmo('emoticon-5251-src-a1596431098da5d4-28x28.png')],
    [/KZowl/g,         twitchEmo('emoticon-5252-src-437c1b59f74e39bc-28x28.png')],
    [/KZskull/g,         twitchEmo('emoticon-5253-src-7358e7adaec32ecc-28x28.png')],
    [/Kappa/g,         twitchEmo('chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png')],
    [/Keepo/g,         twitchEmo('chansub-global-emoticon-8eed21805f6217ce-27x29.png')],
    [/KevinTurtle/g,         twitchEmo('chansub-global-emoticon-d530ef454aa17093-21x27.png')],
    [/Kippa/g,         twitchEmo('chansub-global-emoticon-56a84f0e87c3d3a5-24x28.png')],
    [/Kreygasm/g,         twitchEmo('chansub-global-emoticon-3a624954918104fe-19x27.png')],
    [/MVGame/g,         twitchEmo('chansub-global-emoticon-1a1a8bb5cdf6efb9-24x32.png')],
    [/MrDestructoid/g,         twitchEmo('chansub-global-emoticon-ac61a7aeb52a49d3-39x27.png')],
    [/NinjaTroll/g,         twitchEmo('chansub-global-emoticon-89e474822a976928-19x27.png')],
    [/NoNoSpot/g,         twitchEmo('chansub-global-emoticon-179f310b0746584d-23x27.png')],
    [/OMGScoots/g,         twitchEmo('chansub-global-emoticon-e01723a9ae4fbd8b-22x28.png')],
    [/OneHand/g,         twitchEmo('chansub-global-emoticon-b6d67569a0c6340a-20x27.png')],
    [/OpieOP/g,         twitchEmo('chansub-global-emoticon-21e708123d6a896d-21x30.png')],
    [/OptimizePrime/g,         twitchEmo('chansub-global-emoticon-41f8a86c4b15b5d8-22x27.png')],
    [/PJSalt/g,         twitchEmo('chansub-global-emoticon-18be1a297459453f-36x30.png')],
    [/PMSTwin/g,         twitchEmo('chansub-global-emoticon-a33f6c484c27e249-23x30.png')],
    [/PanicVis/g,         twitchEmo('emoticon-3668-src-f36f5a70b1c93a29-28x28.png')],
    [/PazPazowitz/g,         twitchEmo('chansub-global-emoticon-521420789e1e93ef-18x27.png')],
    [/PeoplesChamp/g,         twitchEmo('emoticon-3412-src-76b6e3c79b31b696-28x28.png')],
    [/PicoMause/g,         twitchEmo('emoticon-3412-src-76b6e3c79b31b696-28x28.png')],
    [/PipeHype/g,         twitchEmo('emoticon-4240-src-d0c560fa27408dc7-28x28.png')],
    [/PogChamp/g,         twitchEmo('chansub-global-emoticon-60aa1af305e32d49-23x30.png')],
    [/Poooound/g,         twitchEmo('chansub-global-emoticon-60aa1af305e32d49-23x30.png')],
    [/PunchTrees/g,         twitchEmo('chansub-global-emoticon-b85003ffba04e03e-24x24.png')],
    [/RalpherZ/g,         twitchEmo('chansub-global-emoticon-3d9b59b17687288c-33x30.png')],
    [/RedCoat/g,         twitchEmo('chansub-global-emoticon-6b8d1be08f244e92-19x27.png')],
    [/ResidentSleeper/g,         twitchEmo('chansub-global-emoticon-1ddcc54d77fc4a61-28x28.png')],
    [/RitzMitz/g,         twitchEmo('emoticon-4338-src-a741c02562405936-28x28.png')],
    [/RuleFive/g,         twitchEmo('chansub-global-emoticon-4e65703c52fb67b5-20x30.png')],
    [/SMOrc/g,         twitchEmo('chansub-global-emoticon-9f276ed33053ec70-32x32.png')],
    [/SMSkull/g,         twitchEmo('chansub-global-emoticon-50b9867ba05d1ecc-24x24.png')],
    [/SSSsss/g,         twitchEmo('chansub-global-emoticon-5d019b356bd38360-24x24.png')],
    [/ShazBotstix/g,         twitchEmo('chansub-global-emoticon-ccaf06d02a01a804-24x30.png')],
    [/SoBayed/g,         twitchEmo('chansub-global-emoticon-efca3da7a499ac81-24x30.png')],
    [/SoonerLater/g,         twitchEmo('chansub-global-emoticon-696192d9891880af-23x30.png')],
    [/StoneLightning/g,         twitchEmo('chansub-global-emoticon-8b5aaae6e2409deb-20x27.png')],
    [/StrawBeary/g,         twitchEmo('chansub-global-emoticon-3dac9659e838fab2-20x27.png')],
    [/SuperVinlin/g,         twitchEmo('chansub-global-emoticon-92a1b848540e9347-23x27.png')],
    [/SwiftRage/g,         twitchEmo('chansub-global-emoticon-680b6b3887ef0d17-21x28.png')],
    [/TF2John/g,         twitchEmo('chansub-global-emoticon-ffa884123ef70519-22x30.png')],
    [/TehFunrun/g,         twitchEmo('chansub-global-emoticon-a204e65775b969c5-27x27.png')],
    [/TheRinger/g,         twitchEmo('chansub-global-emoticon-1903cc415afc404c-20x27.png')],
    [/TheTarFu/g,         twitchEmo('chansub-global-emoticon-1fcfa48228bbd6ea-25x28.png')],
    [/TheThing/g,         twitchEmo('emoticon-7427-src-f1278d0b66848536-28x28.png')],
    [/ThunBeast/g,         twitchEmo('chansub-global-emoticon-1bae8ebfe6209a0c-26x28.png')],
    [/TinyFace/g,         twitchEmo('chansub-global-emoticon-b93007bc230754e1-19x30.png')],
    [/TooSpicy/g,         twitchEmo('chansub-global-emoticon-f193772ca6e512f2-23x30.png')],
    [/TriHard/g,         twitchEmo('chansub-global-emoticon-6407e6947eb69e21-24x30.png')],
    [/UleetBackup/g,         twitchEmo('chansub-global-emoticon-5342e829290d1af0-17x27.png')],
    [/UnSane/g,         twitchEmo('chansub-global-emoticon-4eea6f01e372a996-28x30.png')],
    [/UncleNox/g,         twitchEmo('emoticon-3666-src-19af357000ae2b42-28x28.png')],
    [/Volcania/g,         twitchEmo('chansub-global-emoticon-efbcc231b2d2d206-27x28.png')],
    [/WTRuck/g,         twitchEmo('chansub-global-emoticon-f9ee1c9eb52375de-28x28.png')],
    [/WholeWheat/g,         twitchEmo('chansub-global-emoticon-89a30a213fe46f49-20x30.png')],
    [/WinWaker/g,         twitchEmo('WinWaker.png')],
    [/YouWHY/g,         twitchEmo('emoticon-4337-src-abba134ff81d77c7-28x28.png')],
    [/aneleanele/g,         twitchEmo('emoticon-3792-src-1504dbbe3760173a-28x28.png')]

    //SocialBladeGaming Subscripion
    [/sbgLogo/g,         twitchEmo('emoticon-10650-src-96b7e5c31b35f822-28x28.png')],
    [/sbgLove/g,         twitchEmo('emoticon-11361-src-c38667279fa37c9a-28x28.png')]
];

var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; mutations++) {
        var msglist = mutations[i].target.getElementsByClassName('null');
        for (var j = 0; j < msglist.length; j++) {
            for (var k = 0; k < emotes.length; k++) {
                if (msglist[j].textContent.match(emotes[k][0])) {
                    msglist[j].innerHTML = msglist[j].innerHTML.replace(emotes[k][0], emotes[k][1]);
                }
            }
        }
    };
});

var readyChecker = setInterval(function () {
    var chatContainer = document.getElementById('ChatTabsPagelet');
    if (chatContainer != null) {
        observer.observe(chatContainer, {childList: true, subtree: true});
        clearInterval(readyChecker);
    }
}, 100);