// ==UserScript==
// @name        ao3 work form autofill
// @namespace   ao3
// @include     *archiveofourown.org*/works/new
// @include     *archiveofourown.org/works/*/chapters/new
// @version     1.1
// @grant       unsafeWindow
// ==/UserScript==

(function($) {

    // CONFIG
    var
        title = '',
        rating = 'Teen And Up Audiences',
        // 'Not Rated', 'General Audiences', 'Teen And Up Audiences', 'Mature', 'Explicit' - pick one
        warnings = ['Graphic Depictions Of Violence', 'Major Character Death'],
        // 'Choose Not To Use Archive Warnings', 'No Archive Warnings Apply', 'Graphic Depictions Of Violence', 'Major Character Death', 'Rape/Non-Con', 'Underage' - include any from 0 to all
        fandoms = ['Testing'],
        characters = ['Yakko', 'Wakko', 'Dot'],
        pairings = ['Face/Palm'],
        additionalTags = ['shenanigans', 'tomfoolery', 'lulz'],
        summary = '',
        content = '',
        userIsTester = false;
    // end config
    
    // placeholder content generation
    var 
        date = new Date(),
        dateString = date.toDateString() + ', ' + date.getHours() +':' +('0' +date.getMinutes()).slice(-2),
        tokens1 = ["Amaranth", "Amber", "Apricot", "Aquamarine", "Azure", "Baby blue", "Beige", "Black", "Blue", "Blue-green", "Blue-violet", "Blush", "Bronze", "Brown", "Burgundy", "Byzantium", "Carmine", "Cerise", "Cerulean", "Champagne", "Chartreuse green", "Chocolate", "Coffee", "Copper", "Coral", "Crimson", "Cyan", "Desert sand", "Electric blue", "Erin", "Gold", "Gray", "Green", "Harlequin", "Indigo", "Ivory", "Jade", "Jungle green", "Lavender", "Lemon", "Lilac", "Lime", "Magenta", "Magenta rose", "Maroon", "Mauve", "Navy blue", "Olive", "Orange", "Orange-red", "Orchid", "Peach", "Pear", "Periwinkle", "Persian blue", "Pink", "Plum", "Prussian blue", "Puce", "Purple", "Raspberry", "Red", "Red-violet", "Rose", "Salmon", "Sapphire", "Scarlet", "Silver", "Slate gray", "Spring bud", "Spring green", "Tan", "Taupe", "Teal", "Turquoise", "Violet", "Viridian", "White", "Yellow"],
        tokens2 = ["Aardvark", "Albatross", "Alligator", "Alpaca", "American Bison", "Ant", "Anteater", "Antelope", "Ape", "Armadillo", "Ass/Donkey", "Baboon", "Badger", "Barracuda", "Bat", "Bear", "Beaver", "Bee", "Boar", "Buffalo", "Bush baby", "Butterfly", "Camel", "Caribou", "Cat", "Caterpillar", "Cattle", "Chamois", "Cheetah", "Chicken", "Chimpanzee", "Chinchilla", "Chough", "Clam", "Cobra", "Cockroach", "Cod", "Cormorant", "Coyote", "Crab", "Crane", "Crocodile", "Crow", "Curlew", "Deer", "Dinosaur", "Dog", "Dogfish", "Dolphin", "Donkey", "Dotterel", "Dove", "Dragonfly", "Duck", "Dugong", "Dunlin", "Eagle", "Echidna", "Eel", "Eland", "Elephant", "Elephant seal", "Elk", "Emu", "Falcon", "Ferret", "Finch", "Fish", "Flamingo", "Fly", "Fox", "Frog", "Gaur", "Gazelle", "Gerbil", "Giant Panda", "Giraffe", "Gnat", "Gnu", "Goat", "Goose", "Goldfinch", "Goldfish", "Gorilla", "Goshawk", "Grasshopper", "Grouse", "Guanaco", "Guinea fowl", "Guinea pig", "Gull", "Hamster", "Hare", "Hawk", "Hedgehog", "Heron", "Herring", "Hippopotamus", "Hornet", "Horse", "Human", "Hummingbird", "Hyena", "Jackal", "Jaguar", "Jay", "Jay, Blue", "Jellyfish", "Kangaroo", "Koala", "Komodo dragon", "Kouprey", "Kudu", "Lapwing", "Lark", "Lemur", "Leopard", "Lion", "Llama", "Lobster", "Locust", "Loris", "Louse", "Lyrebird", "Magpie", "Mallard", "Manatee", "Marten", "Meerkat", "Mink", "Mole", "Monkey", "Moose", "Mouse", "Mosquito", "Mule", "Narwhal", "Newt", "Nightingale", "Octopus", "Okapi", "Opossum", "Oryx", "Ostrich", "Otter", "Owl", "Ox", "Oyster", "Panther", "Parrot", "Partridge", "Peafowl", "Pelican", "Penguin", "Pheasant", "Pig", "Pigeon", "Pony", "Porcupine", "Porpoise", "Prairie Dog", "Quail", "Quelea", "Rabbit", "Raccoon", "Rail", "Ram", "Rat", "Raven", "Red deer", "Red panda", "Reindeer", "Rhinoceros", "Rook", "Ruff", "Salamander", "Salmon", "Sand Dollar", "Sandpiper", "Sardine", "Scorpion", "Sea lion", "Sea Urchin", "Seahorse", "Seal", "Shark", "Sheep", "Shrew", "Skunk", "Snail", "Snake", "Spider", "Squid", "Squirrel", "Starling", "Stingray", "Stinkbug", "Stork", "Swallow", "Swan", "Tapir", "Tarsier", "Termite", "Tiger", "Toad", "Trout", "Turkey", "Turtle", "Vicuña", "Viper", "Vulture", "Wallaby", "Walrus", "Wasp", "Water buffalo", "Weasel", "Whale", "Wolf", "Wolverine", "Wombat", "Woodcock", "Woodpecker", "Worm", "Wren", "Yak", "Zebra"],
        randomTitle = tokens1[Math.floor(Math.random() * tokens1.length)] +' '
            +tokens2[Math.floor(Math.random() * tokens2.length)];
            
    userIsTester = true;
    title = randomTitle;
    summary = 'Summary for work posted on ' +dateString;
    content = 'Content for work posted on ' +dateString;
    var chapterTitle = 'Chapter ' +$('#chapter_position').val() +' title',
        chapterContent = 'Content for chapter posted on ' +dateString;
    // end placeholders
    
    $(document).ready(function() {    

        if ($('.works-new form')[0]) {
            $('#work_rating_string').val(rating);
            
            $('dd.fandom input[type=text]').val(fandoms.join(', '));
            
            var warningInputs = $('fieldset.warnings input[type=checkbox]');
            warningInputs.prop('checked', false);
            for (var i = 0, len = warnings.length; i < len; i++) {
                var warning = warnings[i];
                warningInputs.filter('[value="'+warning+'"]').prop('checked', true);
            }
            
            $('input#work_title').val(title);
            
            $('.relationship input[type=text]').first().val(pairings.join(', '));
            
            $('.character input[type=text]').first().val(characters.join(', '));
            
            $('dd.freeform input[type=text]').val(additionalTags.join(', '));
            
            $('#work_summary').val(summary);
            
            $('textarea#content').val(content);
        }
        
        if (userIsTester && $('.chapters-new form')[0]) {
            $('#chapter_title').val(chapterTitle);
            
            $('#chapter_summary').val(summary.replace('work', 'chapter'));
            
            $('textarea#content').val(chapterContent);
        }
    
    });
    
})(unsafeWindow.jQuery);