// ==UserScript==
// @name           Twitter Emoticons from Yahoo!
// @namespace      http://lucianmarin.com/
// @description    Replaces text-based emoticons on Twitter with images from Yahoo!.
// @include        http://twitter.com/*
// ==/UserScript==

function addEmoticonsPermalink()
{

// transformer [..]
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\[\.\.\]/g, "<img src=\"http://l.yimg.com/a/i/us/msg/emoticons/transformer.gif\" />");

// pirate :ar!
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:ar\!/g, "<img src=\"http://l.yimg.com/a/i/us/msg/emoticons/pirate_2.gif\" />");

// 115 bee :bz
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:(B|b)(Z|z)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/115.gif\" />");

// 114 it wasn't me ^#(^
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\^\#\(\^/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/114.gif\" />");

// 113 thumbs up :-bd
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-(B|b)(D|d)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/113.gif\" />");

// 112 thumbs down :-Q :-q
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-(Q|q)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/112.gif\" />");

// 111 rock on! \m/
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\\(M|m)\//g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/111.gif\" />");

// 110 hurry up! :!!
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:\!\!/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/110.gif\" />");

// 109 I don't want to see X_X x_x x_X X_x
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/(X|x)\_(X|x)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/109.gif\" />");

// 108 puppy dog eyes :o3 :O3
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:(O|o)3/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/108.gif\" />");

// 107 not listening %-(
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\%-\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/107.gif\" />");

// 106 I don't know :-??
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:-\?\?/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif\" />");

// 105 day dreaming 8->
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/8-\&gt;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif\" />");

// 104 time out :-t :-T
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:-(T|t)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/104.gif\" />");

// 103 wave :-h :-H
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:-(H|h)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/103.gif\" />");

// 102 at wits' end ~x( ~X(
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\~(X|x)\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif\" />");

// 101 call me :-C :-c
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:-(C|c)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/101.gif\" />");

// 100 on the phone :)]
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:-?\)]/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/100.gif\" />");

// 79 star (*)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\(\*\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/79.gif\" />");

// 78 oh go on :-j :-J
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:-(J|j)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif\" />");

// 77 not worthy ^:)^
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\^:\)\^/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/77.gif\" />");

// 76 chatterbox :-@
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:\-\@/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/76.gif\" />");

// 75 yin yang (%)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\(\%\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/75.gif\" />");

// 74 april o-+
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/(O|o)\-\+/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/74.gif\" />");

// 73 billy o=>
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/(O|o)\=\&gt\;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/73.gif\" />");

// 72 hero o->
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/(O|o)\-\&gt;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/72.gif\" />");

// 71 hee hee ;))
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/;\)\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif\" />");

// 70 bring it on >:/
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\&gt\;\:\//g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/70.gif\" />");

// 69 dancing \:D/
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\\:(D|d)\//g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif\" />");

// 68 shame on you [-X [-x
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\[-(X|x)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif\" />");

// 67 peace sign :)>-
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:\)\&gt;-/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/67.gif\" />");

// 66 feeling beat up b-( B-(
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/(B|b)-\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif\" />");

// 65 whistling :-"
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-\"/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif\" />");

// 64 money eyes $-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\$\-\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/64.gif\" />");

// 63 praying [-O<
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\[-(O|o)\&lt;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif\" />");

// 62 frustated :-L :-l
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:-(L|l)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif\" />");

// 61 alien >-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\&gt;-\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/61.gif\" />");

// 60 bug =:)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/=:\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/60.gif\" />");

// 59 skull 8-X
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/8-(X|x)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/59.gif\" />");

// 58 idea *-:)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\*-:\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/58.gif\" />");

// 57 coffee ~o) ~O)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/~(O|o)\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif\" />");

// 56 pumpkin (~~)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\(~~\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/56.gif\" />");

// 55 us flag **==
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\*\*==/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/55.gif\" />");

// 54 good luck %%-
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\%\%-/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/54.gif\" />");

// 53 rose @};-
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\@\};-/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif\" />");

// 52 chicken ~:>
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/~:\&gt;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/52.gif\" />");

// 51 monkey :(|)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:\(\|\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/51.gif\" />");

// 50 cow 3:-O 3:-o 3:-0
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/3:-(O|o|0)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/50.gif\" />");

// 49 pig :@)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:\@\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/49.gif\" />");

// 48 cowboy <):)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\&lt;\):\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/48.gif\" />");

// 47 phbbbbt >:P
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\&gt;:(P|p)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif\" />");

// 46 sigh :-<
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-\&lt\;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif\" />");

// 45 waiting :-w :-W
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:-(W|w)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif\" />");

// 44 liar :^o :^O
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:\^(O|o)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif\" />");

// 43 hypnotized @-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\@-\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/43.gif\" />");

// 42 nail biting :-SS
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:-(S|s)(S|s)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif\" />");

// 41 applause =D>
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/=(D|d)\&gt;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif\" />");

// 40 d'oh #-o #-O
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\#-(O|o)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif\" />");

// 39 thinking :-?
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:-\?/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif\" />");

// 38 drooling =P~ =p~
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/=(P|p)~/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif\" />");

// 37 yawn (:|	
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\(:\|/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif\" />");

// 36 party <:-P
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\&lt;:-(P|p)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif\" />");

// 35 silly 8-}
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/8-\}/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/35.gif\" />");

// 34 clown :O) :o) :0)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:(O|o|0)\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/34.gif\" />");

// 33 not talking [-(
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\[-\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif\" />");

// 32 don't tell anyone :-$
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:-\$/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif\" />");

// 31 sick :-&
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:-(\&amp;|\&)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif\" />");

// 30 loser L-) l-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/(L|l)-\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif\" />");

// 29 rolling eyes 8-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/8-\|/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/29.gif\" />");

// 28 sleeping I-) i-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/(I|i)\-\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif\" />");

// 27 talk to hand =;
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\=\;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif\" />");

// 26 nerd :-B :-b :B :b
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?(B|b)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif\" />");

// 25 angel O:-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/(O|o|0)\:\-?\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif\" />");

// 24 rofl =))
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\=\)\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif\" />");

// 23 raised eyebrows /:) /:-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\/\:\-?\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif\" />");

// 22 straight face :| :-|
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?\|/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif\" />");

// 21 laughing :)) or :-)) or :)))+
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?\)\)+/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif\" />");

// 20 cry :'( or :(( or :(((+
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:(\'|\()\(+/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif\" />");

// 19 devil >:)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\&gt\;\:\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif\" />");

// 18 whew! #:-S #:-s
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\#\:\-(S|s)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif\" />");

// 17 worried :-S :-s
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-(S|s)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif\" />");

// 16 cool b-) B-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/(B|b)\-\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif\" />");

// 15 smug :> :->
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/:\-?\&gt\;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif\" />");

// 14 angry x( X( x-( X-(
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/(X|x)\-?\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif\" />");

// 13 surprise :-O :-o
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?(O|o)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif\" />");

// 12 broken heart =((
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\=\(\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif\" />");

// 11 kiss :-* :*
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?\*/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif\" />");

// 10 tongue :P :p :-P :-p
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?(P|p)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif\" />");

// 9 blushing :">
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\"\&gt\;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif\" />");

// 8 love struck :x :X
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:(X|x)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif\" />");

// 7 confused :-/
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-\//g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif\" />");

// 6 big hug >:D< or >:d<
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\&gt\;\:(D|d)\&lt\;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif\" />");

// 5 batting eyelashes ;;)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\;\;\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif\" />");

// 4 big grin :-D :D :-d or :d
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?(D|d)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif\" />");

// 3 winking ;) or ;-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\;\-?\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif\" />");

// 2 sad :( or :-(
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif\" />");

// 1 happy :) or :-)
document.getElementById("permalink").innerHTML = document.getElementById("permalink").innerHTML.replace(/\:\-?\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif\" />");
}

function addEmoticonsTimeline()
{

// transformer [..]
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\[\.\.\]/g, "<img src=\"http://l.yimg.com/a/i/us/msg/emoticons/transformer.gif\" />");

// pirate :ar!
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:ar\!/g, "<img src=\"http://l.yimg.com/a/i/us/msg/emoticons/pirate_2.gif\" />");

// 115 bee :bz
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:(B|b)(Z|z)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/115.gif\" />");

// 114 it wasn't me ^#(^
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\^\#\(\^/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/114.gif\" />");

// 113 thumbs up :-bd
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-(B|b)(D|d)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/113.gif\" />");

// 112 thumbs down :-Q :-q
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-(Q|q)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/112.gif\" />");

// 111 rock on! \m/
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\\(M|m)\//g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/111.gif\" />");

// 110 hurry up! :!!
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:\!\!/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/110.gif\" />");

// 109 I don't want to see X_X x_x x_X X_x
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/(X|x)\_(X|x)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/109.gif\" />");

// 108 puppy dog eyes :o3 :O3
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:(O|o)3/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/108.gif\" />");

// 107 not listening %-(
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\%-\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/107.gif\" />");

// 106 I don't know :-??
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:-\?\?/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif\" />");

// 105 day dreaming 8->
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/8-\&gt;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif\" />");

// 104 time out :-t :-T
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:-(T|t)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/104.gif\" />");

// 103 wave :-h :-H
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:-(H|h)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/103.gif\" />");

// 102 at wits' end ~x( ~X(
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\~(X|x)\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif\" />");

// 101 call me :-C :-c
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:-(C|c)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/101.gif\" />");

// 100 on the phone :)]
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:-?\)]/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/100.gif\" />");

// 79 star (*)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\(\*\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/79.gif\" />");

// 78 oh go on :-j :-J
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:-(J|j)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif\" />");

// 77 not worthy ^:)^
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\^:\)\^/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/77.gif\" />");

// 76 chatterbox :-@
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:\-\@/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/76.gif\" />");

// 75 yin yang (%)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\(\%\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/75.gif\" />");

// 74 april o-+
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/(O|o)\-\+/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/74.gif\" />");

// 73 billy o=>
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/(O|o)\=\&gt\;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/73.gif\" />");

// 72 hero o->
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/(O|o)\-\&gt;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/72.gif\" />");

// 71 hee hee ;))
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/;\)\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif\" />");

// 70 bring it on >:/
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\&gt\;\:\//g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/70.gif\" />");

// 69 dancing \:D/
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\\:(D|d)\//g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif\" />");

// 68 shame on you [-X [-x
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\[-(X|x)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif\" />");

// 67 peace sign :)>-
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:\)\&gt;-/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/67.gif\" />");

// 66 feeling beat up b-( B-(
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/(B|b)-\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif\" />");

// 65 whistling :-"
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-\"/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif\" />");

// 64 money eyes $-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\$\-\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/64.gif\" />");

// 63 praying [-O<
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\[-(O|o)\&lt;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif\" />");

// 62 frustated :-L :-l
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:-(L|l)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif\" />");

// 61 alien >-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\&gt;-\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/61.gif\" />");

// 60 bug =:)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/=:\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/60.gif\" />");

// 59 skull 8-X
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/8-(X|x)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/59.gif\" />");

// 58 idea *-:)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\*-:\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/58.gif\" />");

// 57 coffee ~o) ~O)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/~(O|o)\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif\" />");

// 56 pumpkin (~~)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\(~~\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/56.gif\" />");

// 55 us flag **==
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\*\*==/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/55.gif\" />");

// 54 good luck %%-
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\%\%-/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/54.gif\" />");

// 53 rose @};-
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\@\};-/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif\" />");

// 52 chicken ~:>
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/~:\&gt;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/52.gif\" />");

// 51 monkey :(|)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:\(\|\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/51.gif\" />");

// 50 cow 3:-O 3:-o 3:-0
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/3:-(O|o|0)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/50.gif\" />");

// 49 pig :@)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:\@\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/49.gif\" />");

// 48 cowboy <):)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\&lt;\):\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/48.gif\" />");

// 47 phbbbbt >:P
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\&gt;:(P|p)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif\" />");

// 46 sigh :-<
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-\&lt\;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif\" />");

// 45 waiting :-w :-W
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:-(W|w)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif\" />");

// 44 liar :^o :^O
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:\^(O|o)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif\" />");

// 43 hypnotized @-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\@-\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/43.gif\" />");

// 42 nail biting :-SS
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:-(S|s)(S|s)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif\" />");

// 41 applause =D>
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/=(D|d)\&gt;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif\" />");

// 40 d'oh #-o #-O
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\#-(O|o)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif\" />");

// 39 thinking :-?
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:-\?/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif\" />");

// 38 drooling =P~ =p~
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/=(P|p)~/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif\" />");

// 37 yawn (:|	
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\(:\|/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif\" />");

// 36 party <:-P
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\&lt;:-(P|p)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif\" />");

// 35 silly 8-}
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/8-\}/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/35.gif\" />");

// 34 clown :O) :o) :0)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:(O|o|0)\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/34.gif\" />");

// 33 not talking [-(
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\[-\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif\" />");

// 32 don't tell anyone :-$
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:-\$/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif\" />");

// 31 sick :-&
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:-(\&amp;|\&)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif\" />");

// 30 loser L-) l-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/(L|l)-\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif\" />");

// 29 rolling eyes 8-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/8-\|/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/29.gif\" />");

// 28 sleeping I-) i-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/(I|i)\-\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif\" />");

// 27 talk to hand =;
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\=\;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif\" />");

// 26 nerd :-B :-b :B :b
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?(B|b)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif\" />");

// 25 angel O:-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/(O|o|0)\:\-?\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif\" />");

// 24 rofl =))
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\=\)\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif\" />");

// 23 raised eyebrows /:) /:-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\/\:\-?\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif\" />");

// 22 straight face :| :-|
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?\|/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif\" />");

// 21 laughing :)) or :-)) or :)))+
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?\)\)+/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif\" />");

// 20 cry :'( or :(( or :(((+
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:(\'|\()\(+/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif\" />");

// 19 devil >:)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\&gt\;\:\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif\" />");

// 18 whew! #:-S #:-s
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\#\:\-(S|s)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif\" />");

// 17 worried :-S :-s
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-(S|s)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif\" />");

// 16 cool b-) B-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/(B|b)\-\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif\" />");

// 15 smug :> :->
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/:\-?\&gt\;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif\" />");

// 14 angry x( X( x-( X-(
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/(X|x)\-?\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif\" />");

// 13 surprise :-O :-o
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?(O|o)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif\" />");

// 12 broken heart =((
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\=\(\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif\" />");

// 11 kiss :-* :*
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?\*/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif\" />");

// 10 tongue :P :p :-P :-p
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?(P|p)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif\" />");

// 9 blushing :">
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\"\&gt\;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif\" />");

// 8 love struck :x :X
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:(X|x)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif\" />");

// 7 confused :-/
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-\//g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif\" />");

// 6 big hug >:D< or >:d<
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\&gt\;\:(D|d)\&lt\;/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif\" />");

// 5 batting eyelashes ;;)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\;\;\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif\" />");

// 4 big grin :-D :D :-d or :d
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?(D|d)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif\" />");

// 3 winking ;) or ;-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\;\-?\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif\" />");

// 2 sad :( or :-(
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?\(/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif\" />");

// 1 happy :) or :-)
document.getElementById("timeline").innerHTML = document.getElementById("timeline").innerHTML.replace(/\:\-?\)/g, "<img src=\"http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif\" />");
}

window.addEventListener("load", function() { addEmoticonsPermalink(); }, false);
window.addEventListener("load", function() { addEmoticonsTimeline(); }, false);