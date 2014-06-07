// ==UserScript==
// @name           The Joker
// @namespace      http://shoryuken.com
// @include        http://shoryuken.com/forum/index.php?threads/new-tn-thread-we-sonic-boom-our-lives-away-also-spam-butts-too.145349/page-6
// ==/UserScript==

    // Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');

            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;

            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

    // Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            letsJQuery();
        }
    }

    // All your GM code must be inside this function
    function letsJQuery()
    {
        var quotes = Array(
            "Some days I'm Uncle Situation, other days I'm Dr. Situation, I'm Chef Situation.. Bang Your Girl Situation… I'm like a pretty deep dude.",
            "I'm over here tryin' to clean my sneaks, I can't concentrate with all this fighting .. like they're talkin' about f*ckin' relationships and my sneakers are dirty!",
            "I hate the ocean, it's all whale sperm. Everybody Google it, because that's why the water is salty, from the f*ckin' whale sperm.",
            "It doesn't come up 'Stripper Pole' on my credit card, right? Cuz my Dad would be like 'what the f*ck?!'",
            "I invented the Kitchin' Ditchin'.",
            "You only get milk in [your breasts] if you're like pregnant.. I think.",
            "Even though we're tiny bitches, I don't give a sh*t.. I will f*ckin' attack you like a squirrel monkey.",
            "I'm not sure what lobsters eat, but I think they eat like insects or something… so I was gonna feed them worms.",
            "I went to the doctor he told me you gotta stop drinking, stop doing drugs & stop havin' sex, ya know what I did? I switched f*ckin' doctors!",
            "It's like putting a watermelon into a pinhole.",
            "I can't see any ice creams, I can't see any customers, cuz I'm a f*ckin' Smurf.",
            "My boss seems to think that my hair is gonna fall off & go into the ice cream. This hair ain't movin' my dude. 150mph on the highway on a street bike… it doesn't move! What makes you think it's gonna move in a gelato shop?",
            "I'm putting Vaseline on my face, taking my earrings out, putting my hair up & I'm beating the crap out of her.",
            "I am all natural. I have real boobs. I have a nice fat ass. Look at this sh*t, I mean, come on, I'm hot.",
            "I'm gonna break it down dancing, I love the beats, I got my creepy patent move.",
            "We're beatin'-up-the-beat, that's what we say when we're doing our fist pump.  First, we start off by banging the ground, we're banging it as the beat builds ‘cause that beat's hittin' us so we're fightin' back, it's like we beat up that beat.",
            "That's why I don't eat lobster or anything like that cause they're alive when you kill it.",
            "G.T.L. baby. Gym, Tanning, Laundry.",
            "How do I taste, bro? How does my d*ck taste, bro? Congratulations on my sloppy seconds.",
            "Me, I'm the total opposite I don't give a f*&k what people think about me. I peed my pants in public, I'm still not be embarrassed.",
            "You make me happy, you make me laugh, and I want to suck your butt.",
            "The priest was like, cover up when you come to my church, or he basically just called me a whore. At my church they'd be like, oh nice outfit.",
            "When I see Mike with his neck brace, I'm like oh my God he's got his gasses on like always and the neck brace. You don't wear sunglasses with a neck brace. He looks ridiculous.",
            "I am Joker and I post stuff with arguing and batman.",
            "Don't leave without me or I'll never talk to you guys again.",
            "Yeah I'm all right, just a little head trauma little sprain, little this little that.",
            "You don't belong here. You don't even look Italian.",
            "My ultimate dream is to move to Jersey, find a nice, juiced, hot, tanned guy and live my life.",
            "How do you go in a Jacuzzi in a bra? And a thong. Wear a thong bikini — that's a little bit more classier.",
            "I didn't necessarily want to bring home any sort of zoo creatures, whatsoever.",
            "She doesn't want to feel like she's a trash bag because she has a boyfriend and she kissed me with the tongue.",
            "Lose five or ten pounds and then we'll talk.",
            "Never fall in love at the Jersey Shore.",
            "One minute you got three girls in the Jacuzzi, the next minute somebody's in jail.",
            "Girls after girls after girls. That's an ideal summer for anybody.",
            "I was gonna try to uppercut her, but at that point I had too many bouncers wrapped around me. I just wish for like 3 more seconds. I would have done justice.",
            "I don't give a f*ck if you're fat, you're ugly, you're 45 years old. I'll dance with ya. I think it's hilarious.",
            "Tall, completely jacked, steroids, like, multiple growth hormones ... that's the type I'm attracted to.",
            ""
        );

        unsafeWindow.jQuery('li[data-author=TheJokerCPC]').each(function() {
            unsafeWindow.jQuery(this).find('article').text(quotes[Math.floor(Math.random() * quotes.length)]);
        });

        unsafeWindow.jQuery('div:contains(TheJokerCPC said:)').each(function() {
            unsafeWindow.jQuery(this).next('blockquote').text(quotes[Math.floor(Math.random() * quotes.length)]);
        });

        // determine if we want to try to quote someone
        var random_number = Math.floor(Math.random() * 10);

        if(random_number < 8)
        {
            // get some basic page statistics
            var post_count = unsafeWindow.jQuery('ol.messageList li[data-author]').length;
            var joker_post_count = unsafeWindow.jQuery('ol.messageList li[data-author=TheJokerCPC]').length;

            // found a joker quote?
            if(joker_post_count > 0 && post_count > joker_post_count)
            {
                // randomly select a joker quote
                var joker_quote = unsafeWindow.jQuery('ol.messageList li[data-author=TheJokerCPC]').get().sort(function(){
                    return Math.round(Math.random()) - 0.5
                }).slice(0,1);

                var quoteable_quotes = unsafeWindow.jQuery('ol.messageList li[data-author!=TheJokerCPC]:lt(' + unsafeWindow.jQuery(joker_quote).index('ol.messageList li[data-author]') + ')').length;

                if(unsafeWindow.jQuery(quoteable_quotes).length > 0)
                {
                    // randomly select a quote to quote
                    var joker_quote_index = unsafeWindow.jQuery(joker_quote).index('ol.messageList li[data-author]');

                    var quote = '';
                    var poster = '';
                    do
                    {
                        quote = unsafeWindow.jQuery('ol.messageList li[data-author]:lt(' + joker_quote_index + ')').get().sort(function(){
                            return Math.round(Math.random()) - 0.5
                        }).slice(0,1);

                        var quote_index = unsafeWindow.jQuery(quote).index('ol.messageList li[data-author]');

                        poster = unsafeWindow.jQuery('ol.messageList li[data-author]:eq(' + quote_index + ')').attr('data-author');
                    }
                    while(poster == 'TheJokerCPC');

                    // add the quote
                    var quote_text = unsafeWindow.jQuery(quote).find('article').text();
                    quote_text = quote_text.replace('↑', '');

                    var quote_bubble = '<div class="bbCodeBlock bbCodeQuote"><aside><div class="attribution type">' + poster + ' said: <a href="index.php?goto/post&amp;id=5846905#post-5846905" class="AttributionLink">.</a></div><blockquote>' + quote_text + '</blockquote></aside></div>';

                    var new_quote = quote_bubble + quotes[Math.floor(Math.random() * quotes.length)] + " ";

                    unsafeWindow.jQuery(joker_quote).find('article').html(new_quote);
                }
            }
        }
    }