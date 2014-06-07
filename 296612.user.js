// ==UserScript==
// @name        clippy
// @namespace   caluppy
// @include     https://www.facebook.com/
// @version     1
// @grant       none
// ==/UserScript==

var head = document.querySelector('head');

var clippy_css = document.createElement('link');
clippy_css.href = 'http://newmedia.merz-akademie.de/~sonjaschmid/clippy/clippy.css';
clippy_css.rel = 'stylesheet'

var jquery_script = document.createElement('script');
jquery_script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js';

var clippy_script = document.createElement('script');
clippy_script.src = 'http://newmedia.merz-akademie.de/~sonjaschmid/clippy/clippy.js';




head.appendChild(clippy_css);
head.appendChild(jquery_script);
head.appendChild(clippy_script);

setTimeout(function() {
    clippy.load('Clippy', function(agent) {

        /*
        setInterval(function(){
            var animations = ['LookRight', 'GestureRight', 'GetWizardy', 'RestPose', 'GetAttention'];
            var random_animation = animations[ Math.floor(Math.random() * animations.length) ];
            agent.play(random_animation);
        }, 3000)
        */

        var delay = setTimeout(function(){},0);

        // Do anything with the loaded agent
        agent.show();
        agent.play('RestPose');
         
         $(document).on('click','textarea.mentionsTextarea',function(){
         
            var posTextarea = $('textarea.mentionsTextarea').offset()
            var widthTextarea = $('textarea.mentionsTextarea').width()

            agent.moveTo(posTextarea.left+widthTextarea,posTextarea.top);
         });
         
         $(document).on('keyup','textarea.mentionsTextarea',function(){
         
            clearTimeout(delay);
            delay = setTimeout(function(){
                var animations = ['LookRight', 'GestureRight', 'GetWizardy', 'GetAttention'];
                var random_animation = animations[ Math.floor(Math.random() * animations.length) ];
                agent.play(random_animation);
                
                var grumps = ['I read your posts once, it was awful.', 
                'You know what is great about your post? Nothing.', 
                'Your posts are bad and you should feel bad.', 
                'The worst part of my day is hearing you complain about yours.', 
                'Not sure if... No. Definitly sure I hate you.', 
                'What an interesting story... Now it is my turn. Once upon a time I did not give a shit. The end.', 
                'What does not kill you... disappoints me.', 
                'Life is good. You should get one.',
                'Zombies eat brains?! Do not worry you are safe.',
                'I am not saying I hate you, but if you were on fire and I had water, I would drink it.',
                'Sure I will play with you... how about russian roulette?',
                'Why do you not slip in something more comfortable? Like a coma?',
                'I will literally die of sleep deprivation, if facebook ever adds a dislike button.',
                'Instead of "how is it going?" facebook need to be asking "what the hell is wrong with you?"',
                
                
                
                
                ];
                var random_grump = grumps[ Math.floor(Math.random() * grumps.length) ];
                agent.speak(random_grump);
                agent.play("RestPose");
            },2000);
         });

    });
}, 1000);
