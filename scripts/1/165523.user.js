// ==UserScript==
// @name       Fake SubredditDrama headlines
// @namespace  http://www.nekokittygames.com
// @version    1.0
// @description  This makes fake SRD headlines when you go to http://www.reddit.com/r/subredditdrama/#fake
// @match      http://www.reddit.com/r/subredditdrama/#fake
// @copyright  2013+, nekosune
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

//this code is shit, sorry
 
 
            function r  (arr, os) {
 
                //slow down the whole thread
 
                new Date();
 
                if (os && arr.length == 1) { return arr[0] }
 
                if (!os) { os=0; }
 
                return arr[Math.floor(Math.random()*arr.length-os)];
 
            }
 
 
 
            function capitalize(word)  {
 
                if (word.length) word[0] = word[0].toUpperCase();
 
                return word;
 
            }
 
 
 
            var a_generic = ["racist", "feminist", "butthurt", "fake", "atheist", "sexual", "homophobic", "deleted", "banned"],
 
                n_generic = ["subreddit", "downvote brigade", "doxing", "haterade", "drama", "AMA", "modmail leak", "flame war", "privilege denying"],
 
                ap_generic = function () { return r(a_generic) + " " + r(n_generic) },
 
                dramas_vp = ["gets mad", "posts angry tirade", "posts rant", "flips the fuck out", "goes on a banning spree"],
 
                reddit_celebs = ["OP", "Drunken_Economist", "karmanaut", "POTATO_IN_MY_ANUS", "andrewsmith1986", "Laurelai", "Trapped_in_Reddit", "creepig", "Mind_Virus", "Apostolate", "solidwhetstone", "violentacrez", "RobotAnna", "AlyoshaV", "redditbots", "Shitty_Watercolour", "culturalelitist", "BritishEnglishPolice", "superbroccoli", "syncretic", "eternalkerri", "TwasIWhoShotJR", "zahlman", "Daemon_of_Mail", "BritishHobo", "ArchAngelleDworkin"],
 
                mobs = function () { return ["Redditors", "users", "readers", "MRAs", "SRS", "PUAs", "cat lovers", "libertarians", "liberals", "Angry " + r(reddit_celebs) + " haters" ] },
 
                qualifiers = ["", "minor", "HUGE", "good old fashioned"],
 
                dramas_ap = ["slapfight", "shitstorm", "controversy", "slap fight", "trouble brewing", "scuffle"],
 
                drama_a = ["sexism", "rape", "feminist", "Libertarian", "LGBT", "racism", "soccer", "CP", "penis", "Israel", "Mac vs PC", "transgender", "sockpuppet", "abortion", "Ron Paul", "bot"],
 
                drama_np = ["drama", "public lynching", "mass downvoting", "SRS invasion", "admin intervention"],
 
                instigators = [ r(mobs()), "liberals", "atheists", "Game of Trolls", "karmanaut", "Admins", "SRD Mods", "antiSRS", "racists"],
 
                prepositions = ["in", "over in", "from", "at", "in"],
 
                subreddits = ["lgbt", "ainbow", "design", "ShitRedditSays", "ronpaul", "politics", "soccer", "2XC", "mensrights", "worldnews",  "AskReddit", "gonewild", "atheism", "SubRedditDrama", "guns", "canada", "aww", "ThePopcornStand", "worstof", "occupywallstreet", "SubRedditDramaDrama"],
 
                pitchforks = ["get dramatic", "call for mods to step down", "begin witchhunt", "gather pitchforks"],
 
                conjunctions = ["after ", "when "],
 
                cause_np = function () { return ["/r/"+ r(subreddits) + " user", r(reddit_celebs)] },
 
                slurs = ["fat", "ugly", "fag", "a slut", "a karma whore", "retarded"],
 
                activity = ["breastfeed ", "masturbate ", "upvote ", "downvote ", "drive while high on ", "legalize "],
 
                reddit_loves = ["cats", "Gabe Newell", "marijuana", "Keanu Reeves", "Batman", "girlfriend", r(drama_a), ap_generic()],
               
 
                cause_vp  = function () { return ["argues over the definition of " + r(drama_a),
 
                               "is revealed to be a sockpuppet of " + r(reddit_celebs),
 
                               "calls " + r(reddit_celebs) + " '" + r(slurs)+ "'",
 
                                "accuses " + r(reddit_celebs) + " of fascist moderation",
 
                               "brags about their " + r(qualifiers)+ " genitals",
 
                               r(dramas_vp),
 
                               "whores dead " + r(reddit_loves) + " for karma",
 
                               "generalizes about women",
 
                               "posts a rage comic about " + r(drama_a) + " to /r/" + r(subreddits)] },
 
                acceptable = ["whether its acceptable to ", "whether it is gay to", "a rage comic in which the OP tries to ", "a fake IAMA claiming " + r(reddit_loves) + " should ", "viral marketers trying to get reddit to"],
 
                acceptable_to = function () { return [r(activity) + r(reddit_loves) + " in public", r(activity) + r(reddit_loves), "raise your kids as " + r(reddit_loves), "post nudes to /r/" + r(subreddits), "call someone '" + r(slurs) + "'", "threaten " + r(instigators) + " with rape"] },
 
                postambles = function () { return ["Everyone loses their shit", "Drama Ensues", r(reddit_celebs) + " is upset", "I swear I am not making this up", "It does not go well", "World to end", "Hilarity ensues", "Oh boy", "Just when you thought it was over", "Jimmies are rustled", "The " + r(reddit_loves)+"ocalypse"] },
                count = 0;
                             
 
                function qualify() {
 
                    return r([r(qualifiers) + " ", ""])
 
                }
 
               
 
                function minor_drama() {
 
                    return [capitalize(qualify()) + capitalize(r(drama_a))+ " " +  r(dramas_ap),
 
                                   //huge feminist drama
 
                                   capitalize(qualify()) + r(drama_a) + " drama",
 
                                   //karmanaut gets mad,
 
                                   r(reddit_celebs) + " " + r(dramas_vp),
 
                                   // srd user gets mad
 
                                   "/r/" + r(subreddits) + " " + r(dramas_vp),
 
                                   // angry mob begins witchunt
 
                                   r(mobs()) + " " + r(pitchforks)
 
                                ];
 
                }
 
                             
 
                function preamble () {
 
                                   //minor sexism hitstorm
 
                    var minor = minor_drama(),
 
                        major   = [capitalize(r(drama_a)) + " drama", capitalize(r(drama_np))],
 
                        dramas = [capitalize(r(minor)) + " " + r(prepositions),
 
                                  "[RECAP] " + r(minor) + " " + r(prepositions),
 
                                  "Get your popcorn ready! " + r(minor) + " " + r(prepositions),
 
                                  "UPDATE: " + r(minor) + " " + r(prepositions),
 
                                  capitalize(r(minor)) + " " + r(prepositions),
                               
                                  "[classic] The " + r(reddit_celebs) + " saga " + r(prepositions),
 
                                  r(major) + " spreads to",
 
                                  "/r/" + r(subreddits) + " " + r(pitchforks) + " " + r(prepositions)]
 
                                 
 
                       
 
                    return r(dramas)
 
                }
 
               
 
                function s1() {
 
                    return preamble() + " /r/" + r(subreddits)
 
                }
 
               
 
                function s2() {
 
                    var vp = [ r(conjunctions) + r(cause_np()) + " " + r(cause_vp()),
 
                    "over" + " "  + r(acceptable) + " " + r(acceptable_to()),
 
                    r(conjunctions) + r(minor_drama()) + " in " + "/r/"+r(subreddits),
 
                    "after " + ap_generic()];
 
                    return r(vp);
 
                }
 
                                   
 
                                   
 
                   
 
                function c1() {
 
                    var postamble = "";
 
                    if (Math.random() > 0.8) {
 
                        postamble += r(postambles());
 
                    }
 
                    //reroll
                    if (postamble && Math.random() > 0.8) {
 
                        postamble += ". " + r(postambles());
 
                    }
 
                    return s1() + " " + s2() + ". " + postamble;
 
                }
 
                function new_post(i) {
                    return '<div class=" thing id-t3_wz3kk odd link " data-fullname="t3_wz3kk" data-ups="29" data-downs="2"><p class="parent"></p><span class="rank" style="width:2.20ex;">' + i + '</span>' +
'<div class="midcol unvoted" style="width:4ex;"><div class="arrow up login-required"></div><div class="score dislikes">29</div><div class="score unvoted">' +
Math.floor(Math.random()*500) + '</div><div class="score likes">31</div><div class="arrow down login-required"></div></div><a class="thumbnail default " href="#"></a><div class="entry unvoted"><p class="title"><a class="title " href="#">' + c1() + '</a><span class="domain">(<a href="#">reddit.com</a>)</span></p><p class="tagline">submitted <time>' +
Math.floor(Math.random()*24) + ' hours</time> ago by <a href="#" class="author id-t2_63a5d">' +
r(reddit_celebs) + '</a><span class="userattrs"></span></p><ul class="flat-list buttons"><li class="first"><a class="comments" href="#" target="_parent">' + Math.floor(Math.random()*500) + ' comments</a></li><li class="share"><span class="share-button toggle" style=""><a class="option active login-required" href="#" tabindex="100">share</a><a class="option " href="#">cancel</a></span></li></ul><div class="expando" style="display: none"><span class="error">loading...</span></div></div><div class="child"></div><div class="clearleft"></div></div><div class="clearleft"></div>';
                }
 
                function more () {
                        var i = $('#siteTable').children('.link').length+1;
                        generate(i);
                }
 
                function populate () {
                    console.log('populateee!')
                        $('#siteTable').empty();
                    console.log('emptied')
                        generate(1);
                }
 
                function generate(index) {
                        var html = "",
                            max = index + 25;
                       
                        for (i = index; i<max; i++) {
                                html += new_post(i);
                        }
 
                        $(html).appendTo('#siteTable').hide().fadeIn();
                }
 
                $(document).ready(function () {
                    populate();
                });
