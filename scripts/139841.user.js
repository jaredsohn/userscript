// ==UserScript==
// @name               TSR swear re-filter
// @version            1.0
// @description        Replaces filtered swear words with the names of animals
// @author             Chrosson
// @namespace          *.thestudentroom.co.uk/
// @include            *.thestudentroom.co.uk/*
// @exclude            *.thestudentroom.co.uk/modcp*
// @exclude            *.thestudentroom.co.uk/admincp*
// @exclude            *.thestudentroom.co.uk/login*
// @exclude            *.thestudentroom.co.uk/subscription.php?do=doaddsubscription*
// @exclude            *.thestudentroom.co.uk/subscription.php?do=removesubscription*
// ==/UserScript==

// jquery greasemonkey chrome - http://stackoverflow.com/questions/3032261/any-working-greasemonkey-script-with-jquery-that-works-in-google-chrome
// Add jquery to page without it - https://gist.github.com/437513
function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

// the guts of this userscript
function main() {
    words = {
        4: ['bear', 'deer', 'goat', 'hare', 'lion', 'lynx', 'mink', 'mole', 'mule', 'orca', 'pony', 'seal', 'wolf'],
        5: ['bison', 'camel', 'dingo', 'hippo', 'horse', 'human', 'hyena', 'koala', 'lemur', 'llama', 'loris', 'moose', 'mouse', 'otter', 'panda', 'quoll', 'rhino', 'sheep', 'skunk', 'sloth', 'tiger', 'whale', 'zebra'],
        6: ['baboon', 'badger', 'beaver', 'bobcat', 'bonobo', 'cougar', 'coyote', 'donkey', 'ferret', 'gerbil', 'gibbon', 'glider', 'jackal', 'jaguar', 'langur', 'marmot', 'monkey', 'numbat', 'rabbit', 'walrus', 'weasel', 'wombat'],
        7: ['buffalo', 'caribou', 'cheetah', 'dolphin', 'echidna', 'gazelle', 'giraffe', 'gorilla', 'hamster', 'leopard', 'mammoth', 'manatee', 'narwhal', 'opposum', 'raccoon', 'tarsier', 'warthog'],
        8: ['aardvark', 'anteater', 'antelope', 'capybara', 'chipmunk', 'elephant', 'kangaroo', 'mandrill', 'marmoset', 'mongoose', 'platypus', 'porpoise', 'squirrel'],
        9: ['bandicoot', 'bumblebee', 'orangutan', 'porcupine', 'wolverine'],
        10: ['armadillio', 'chimpanzee', 'chinchilla', 'wildebeest']
    };
    jQuery(document).ready(function ($) {
        console.log(words);
        $('.content').each(function () {
            $(this).html($(this).html().replace(/\*{4,10}/g, function (match) {
                var l = match.length;
                return '<span class="swear">' + words[l][Math.floor(Math.random() * words[l].length)] + '</span>';
            }));
        });
    });
}

// load jQuery and execute the main function

with_jquery(main);