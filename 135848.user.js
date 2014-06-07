// ==UserScript==
// @name       imo.im emoticons
// @version    2.2
// @description  add Skype emoticons to imo.im (web chat)
// @match      https://imo.im*
// @copyright  2012, Tetrakos, use it as you want :)
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

//height of theemoticons can be changed here
//using 15px, I kept the current row height
var emoticon_height = 15;
var end_img = '" height="'+emoticon_height+'px">';
var beginning_img = '<img src="http://emoticonhq.com/';

function replaceAll_old(txt, replace_this, with_this) {
  return txt.replace(replace_this,with_this);
}

function replaceAll(str, src, dst) {
    while (str.indexOf(src) !== -1) {
        str = str.replace(src, dst);
    }
    return str;
}

//replace every known emoticon by the corresponding gif picture from emoticonhq.com
function replaceSkypeEmoticons(content){
    content = replaceAll(content,'(angel)',     beginning_img+'images/Skype/angel.gif'+end_img);
    content = replaceAll(content,':@',     beginning_img+'images/Skype/angry.gif'+end_img);
    content = replaceAll(content,'(hug)',     beginning_img+'images/Skype/bearhug.gif'+end_img);
    content = replaceAll(content,'(beer)',     beginning_img+'images/Skype/beer.gif'+end_img);
    content = replaceAll(content,'(blush)',     beginning_img+'images/Skype/blush.gif'+end_img);
    content = replaceAll(content,':$',     beginning_img+'images/Skype/blush.gif'+end_img);
    content = replaceAll(content,'(bow)',     beginning_img+'images/Skype/bow.gif'+end_img);
    content = replaceAll(content,'(punch)',     beginning_img+'images/Skype/boxing.gif'+end_img);
    content = replaceAll(content,'(u)',     beginning_img+'images/Skype/brokenheart.gif'+end_img);
    content = replaceAll(content,'(^)',     beginning_img+'images/Skype/cake.gif'+end_img);
    content = replaceAll(content,'(call)',     beginning_img+'images/Skype/callme.gif'+end_img);
    content = replaceAll(content,'(cash)',     beginning_img+'images/Skype/cash.gif'+end_img);
    content = replaceAll(content,'(mp)',     beginning_img+'images/Skype/cellphone.gif'+end_img);
    content = replaceAll(content,'(clap)',     beginning_img+'images/Skype/clapping.gif'+end_img);
    content = replaceAll(content,'(coffee)',     beginning_img+'images/Skype/coffee.gif'+end_img);
    content = replaceAll(content,'8-)',     beginning_img+'images/Skype/cool.gif'+end_img);
    content = replaceAll(content,';(',     beginning_img+'images/Skype/crying.gif'+end_img);
    content = replaceAll(content,'(dance)',     beginning_img+'images/Skype/dance.gif'+end_img);
    content = replaceAll(content,'(devil)',     beginning_img+'images/Skype/devil.gif'+end_img);
    content = replaceAll(content,'(doh)',     beginning_img+'images/Skype/doh.gif'+end_img);
    content = replaceAll(content,'(d)',     beginning_img+'images/Skype/drink.gif'+end_img);
    content = replaceAll(content,'|-(',     beginning_img+'images/Skype/dull.gif'+end_img);
    content = replaceAll(content,'(emo)',     beginning_img+'images/Skype/emo.gif'+end_img);
    content = replaceAll(content,']:)',     beginning_img+'images/Skype/evilgrin.gif'+end_img);
    content = replaceAll(content,'(flex)',     beginning_img+'images/Skype/flex.gif'+end_img);
    content = replaceAll(content,'(F)',     beginning_img+'images/Skype/flower.gif'+end_img);
    content = replaceAll(content,'(chuckle)',     beginning_img+'images/Skype/giggle.gif'+end_img);
    content = replaceAll(content,'(handshake)',     beginning_img+'images/Skype/handshake.gif'+end_img);
    content = replaceAll(content,'(happy)',     beginning_img+'images/Skype/happy.gif'+end_img);
    content = replaceAll(content,'(h)',     beginning_img+'images/Skype/heart.gif'+end_img);
    content = replaceAll(content,'(wave)',     beginning_img+'images/Skype/hi.gif'+end_img);
    content = replaceAll(content,'(inlove)',     beginning_img+'images/Skype/inlove.gif'+end_img);
    content = replaceAll(content,'(wasntme)',     beginning_img+'images/Skype/itwasntme.gif'+end_img);
    content = replaceAll(content,'(envy)',     beginning_img+'images/Skype/jealous.gif'+end_img);
    content = replaceAll(content,':*',     beginning_img+'images/Skype/kiss.gif'+end_img);
    content = replaceAll(content,':D',     beginning_img+'images/Skype/laughing.gif'+end_img);
    content = replaceAll(content,'(e)',     beginning_img+'images/Skype/mail.gif'+end_img);
    content = replaceAll(content,'(makeup)',     beginning_img+'images/Skype/makeup.gif'+end_img);
    content = replaceAll(content,'(mm)',     beginning_img+'images/Skype/mmm.gif'+end_img);
    content = replaceAll(content,'(~)',     beginning_img+'images/Skype/movie.gif'+end_img);
    content = replaceAll(content,'(music)',     beginning_img+'images/Skype/music.gif'+end_img);
    content = replaceAll(content,'8-|',     beginning_img+'images/Skype/nerd.gif'+end_img);
    content = replaceAll(content,'(ninja)',     beginning_img+'images/Skype/ninja.gif'+end_img);
    content = replaceAll(content,'(n)',     beginning_img+'images/Skype/no.gif'+end_img);
    content = replaceAll(content,'(nod)',     beginning_img+'images/Skype/nod.gif'+end_img);
    content = replaceAll(content,':x',     beginning_img+'images/Skype/nospeak.gif'+end_img);
    content = replaceAll(content,'(party)',     beginning_img+'images/Skype/party.gif'+end_img);
    content = replaceAll(content,'(pi)',     beginning_img+'images/Skype/pizza.gif'+end_img);
    content = replaceAll(content,'(puke)',     beginning_img+'images/Skype/puke.gif'+end_img);
    content = replaceAll(content,'(rain)',     beginning_img+'images/Skype/rain.gif'+end_img);
    content = replaceAll(content,'(rofl)',     beginning_img+'images/Skype/rofl.gif'+end_img);
    content = replaceAll(content,':(',     beginning_img+'images/Skype/sad.gif'+end_img);
    content = replaceAll(content,'(shake)',     beginning_img+'images/Skype/shakeno.gif'+end_img);
    content = replaceAll(content,'(skype)',     beginning_img+'images/Skype/skype.gif'+end_img);
    content = replaceAll(content,'|-)',     beginning_img+'images/Skype/sleepy.gif'+end_img);
    content = replaceAll(content,':)',     beginning_img+'images/Skype/smile.gif'+end_img);
    content = replaceAll(content,'(smirk)',     beginning_img+'images/Skype/smirk.gif'+end_img);
    content = replaceAll(content,':-|',     beginning_img+'images/Skype/speechless.gif'+end_img);
    content = replaceAll(content,'(*)',     beginning_img+'images/Skype/star.gif'+end_img);
    content = replaceAll(content,'(sun)',     beginning_img+'images/Skype/sun.gif'+end_img);
    content = replaceAll(content,'(sweat)',     beginning_img+'images/Skype/sweating.gif'+end_img);
    content = replaceAll(content,'(talk)',     beginning_img+'images/Skype/talking.gif'+end_img);
    content = replaceAll(content,'(think)',     beginning_img+'images/Skype/thinking.gif'+end_img);
    content = replaceAll(content,'(o)',     beginning_img+'images/Skype/time.gif'+end_img);
    content = replaceAll(content,'(yawn)',     beginning_img+'images/Skype/tired.gif'+end_img);
    content = replaceAll(content,':p',     beginning_img+'images/Skype/tongue out.gif'+end_img);
    content = replaceAll(content,'(wait)',     beginning_img+'images/Skype/wait.gif'+end_img);
    content = replaceAll(content,'(whew)',     beginning_img+'images/Skype/whew.gif'+end_img);
    content = replaceAll(content,';)',     beginning_img+'images/Skype/wink.gif'+end_img);
    content = replaceAll(content,':^)',     beginning_img+'images/Skype/wondering.gif'+end_img);
    content = replaceAll(content,':s',     beginning_img+'images/Skype/worried.gif'+end_img);
    content = replaceAll(content,'(worry)',     beginning_img+'images/Skype/worried.gif'+end_img);
    content = replaceAll(content,'(y)',     beginning_img+'images/Skype/yes.gif'+end_img);
    content = replaceAll(content,'(bandit)',     beginning_img+'images/Skype/hiddenbandit.gif'+end_img);
    content = replaceAll(content,'(bug)',     beginning_img+'images/Skype/hiddenbug.gif'+end_img);
    content = replaceAll(content,'(drunk)',     beginning_img+'images/Skype/hiddendrunk.gif'+end_img);
    content = replaceAll(content,'(finger)',     beginning_img+'images/Skype/hiddenfinger.gif'+end_img);
    content = replaceAll(content,'(fubar)',     beginning_img+'images/Skype/hiddenfubar.gif'+end_img);
    content = replaceAll(content,'(headbang)',     beginning_img+'images/Skype/hiddenheadbang.gif'+end_img);
    content = replaceAll(content,'(mooning)',     beginning_img+'images/Skype/hiddenmooning.gif'+end_img);
    content = replaceAll(content,'(poolparty)',     beginning_img+'images/Skype/hiddenpoolparty.gif'+end_img);
    content = replaceAll(content,'(rock)',     beginning_img+'images/Skype/hiddenrockout.gif'+end_img);
    content = replaceAll(content,'(smoking)',     beginning_img+'images/Skype/hiddensmoking.gif'+end_img);
    content = replaceAll(content,'(heidy)',     beginning_img+'images/Skype/hiddensquirrell.gif'+end_img);
    content = replaceAll(content,'(swear)',     beginning_img+'images/Skype/hiddenswear.gif'+end_img);
    content = replaceAll(content,'(tmi)',     beginning_img+'images/Skype/hiddentmi.gif'+end_img);
    content = replaceAll(content,'(toivo)',     beginning_img+'images/Skype/hiddentoivo.gif'+end_img); 
    content = replaceAll(content,':-)',     beginning_img+'images/Skype/smile.gif'+end_img);
    content = replaceAll(content,':(',     beginning_img+'images/Skype/sad.gif'+end_img);
    content = replaceAll(content,':-(',     beginning_img+'images/Skype/sad.gif'+end_img);
    return content;
}

//run the.replaceAll function every 0.5s
setInterval(function() {
    $('.ms').each(function() {
        var message = $(this).html();
        var mod_message = replaceSkypeEmoticons(message);
        if (mod_message != message)
            $(this).html(mod_message);
    });
}, 500);
