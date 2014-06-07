//
// (c) 2013 by gemeinagent (original by cms)
//

// ==UserScript==
// @name            mods.de - Steam Deals Hikkomi
// @namespace       userscripts.org/users/541210
// @description     Blendet die Posts von Hikkomi-Gaeshi im Steam Deals Thread aus und fuegt stattdessen Zitate von Calvin und Hobbes ein.
// @version         1.0.3
// @grant           none
// @include         http://forum.mods.de/bb/thread.php*
// ==/UserScript==

if (parent.document.title.toLowerCase().indexOf("steam") != -1)
{

// --- data -----------------

var users = [ "Hikkomi-Gaeshi" ];
var quotes = ["&ldquo;Until you stalk and overrun, you can't devour anyone.&rdquo;<br>-- Hobbes",
    "I'm killing time while I wait for life to shower me with meaning and happiness.<br>-- Calvin",
    "&ldquo;It's great to have a friend who appreciates an earnest discussion of ideas.&rdquo;<br>-- Calvin",
    "&ldquo;If people could put rainbows in zoos, they'd do it.&rdquo; <br>-- Hobbes",
    "&ldquo;I don't know which is worse, ...that everyone has his price, or that the price is always so low.&rdquo;<br>-- Calvin",
    "&ldquo;That's the whole problem with science. You've got a bunch of<br>empiricists trying to describe things of unimaginable wonder.&rdquo;<br>-- Calvin",
    "If you want to stay dad you've got to polish your image. I think the image<br>we need to create for you is 'repentant but learning'.<br>-- Calvin",
    "&ldquo;It's hard to be mad at someone who misses you while you're asleep.&rdquo;<br>-- Calvin",
    "&ldquo;Endorsing products is the American way of expressing individuality.&rdquo;<br>-- Calvin",
    "&ldquo;Weekends don't count unless you spend them doing something completely pointless.&rdquo;<br>-- Calvin",
    "You know what we need, Hobbes? We need an attitude. Yeah, you can't be cool if you don't have an attitude.<br>-- Calvin",
    "&ldquo;I love Saturday morning cartoons, what classic humour! This is what<br>entertainment is all about ... Idiots, explosives and falling anvils.&rdquo;<br>-- Calvin and Hobbes",
    "&ldquo;Mom knows EVERYTHING&rdquo;<br>-- Calvin",
    "&ldquo;One of the joys of being a kid is that experiences are new and therefore<br>more intense.&rdquo;<br>-- Calvin sniffing mustard",
    "It seems like once people grow up, they have no idea what's cool.<br>-- Calvin",
    "I'm looking for something that can deliver a 50-pound payload of snow<br>on a small feminine target. Can you suggest something? Hello...?<br>-- Calvin",
    "You can present the material, but you can't make me care.<br>-- Calvin",
    "&ldquo;All this modern technology just makes people try to do everything at once.&rdquo;<br>-- Hobbes",
    "&ldquo;I love Saturday morning cartoons, what classic humour! This is what<br>entertainment is all about ... Idiots, explosives and falling anvils.&rdquo;<br>-- Calvin and Hobbes",
    "&ldquo;I suppose if we couldn't laugh at things that don't make sense, we couldn't<br>react to a lot of life.&rdquo;<br>-- Hobbes",
    "It takes an uncommon mind to think of these things.<br>-- Calvin",
    "&ldquo;Some things don't need the thought people give them.&rdquo;<br>-- Hobbes",
    "Why waste time learning, when ignorance is instantaneous?<br>-- Calvin",
    "&ldquo;My ethicator machine must've had a built-in moral compromise<br>spectral release phantasmatron! I'm a genius!&rdquo;<br>-- Calvin",
    "&ldquo;If good things lasted forever, would we appreciate how precious they are?&rdquo;<br>-- Hobbes",
    "Calvin: Sometimes when I'm talking, my words can't keep up with my thoughts.<br>I wonder why we think faster than we speak. Hobbes: Probably so we can think<br>twice.",
    "This one's tricky. You have to use imaginary numbers, like eleventeen ...<br>-- Hobbes",
    "My life needs a rewind/erase button.<br>-- Calvin",
    "A voice crackles in Calvin's radio:<br>&ldquo;Enemy fighters at two o'clock!&rdquo;<br>&ldquo;Roger. What should I do until then?&rdquo;",
    "Hobbes : Shouldn't we read the instructions?<br>Calvin : Do I look like a sissy?",
    "Sometimes it seems things go by too quickly. We are so busy watching out for<br>what's just ahead of us that we don't take the time to enjoy where we are.<br>-- Calvin",
    "This is so cool I've to go to the bathroom.<br>-- Calvin",
    "&ldquo;The inside of my head was exploding with fireworks. Fortunately,<br>my last thought turned out the lights when it left.&rdquo;<br>-- Calvin",
    "Why can't I ever build character at a Miami condo or a casino somewhere?<br>-- Calvin",
    "But Calvin is no kind and loving god! He's one of the old gods! He demands sacrifice!<br>-- Calvin",
    "Sometimes I think the surest sign, that intelligent life exists else<br>where in our universe is, is that none of it has tried to contact us.<br>-- Calvin",
    "&ldquo;I don't understand this! Not a single part of my horoscope came true! ...<br>The paper should print Mom's daily predictions. Those sure come true.&rdquo;<br>-- Calvin",
    "&ldquo;The dynamics of inter-being and mono logical imperatives in Dick and Jane :<br>A study in psychic transrelational gender modes&rdquo;. Academia, here I come.<br>-- Calvin",
    "Is it a right to remain ignorant?<br>-- Calvin",
    "Ms. Wormwood : Calvin, how about you?<br>Calvin : Hard to say ma'am. I think my cerebellum just fused.",
    "I liked things better when I didn't understand them.<br>-- Calvin",
    "&ldquo;I love Saturday morning cartoons, what classic humour! This is what<br>entertainment is all about ... Idiots, explosives and falling anvils.&rdquo;<br>-- Calvin and Hobbes",
    "&ldquo;Mom and dad say I should make my life an example of the principles I<br>believe in. But every time I do, they tell me to stop it.&rdquo;<br>-- Calvin",
    "I think we dream so we don't have to be apart so long. If we're in each other's dreams, we can play together all night. <br>-- Calvin",
    "Verbing weirds language.<br>-- Calvin.",
    "&ldquo;Do you think there's a God?&rdquo;<br>&ldquo;Well, ____SOMEbody's out to get me!&rdquo;<br>-- Calvin and Hobbes",
    "&ldquo;I propose we leave math to the machines and go play outside.&rdquo;<br>-- Calvin",
    "Calvin : I think we have got enough information now, don't you?<br>Hobbes : All we have is one &ldquo;fact&rdquo; that you made up.<br>Calvin : That's plenty. By the time we add an introduction, a few<br>illustrations and a conclusion, it'll look like a graduate thesis.",
    "Reality continues to ruin my life.<br>-- Calvin",
    "As usual, goodness hardly puts up a fight.<br>-- Calvin",
    "&ldquo;I propose we leave math to the machines and go play outside.&rdquo;<br>--- Calvin",
    "This game lends itself to certain abuses.<br>--- Calvin",
    "&ldquo;The intrepid Spaceman Spiff is stranded on a distant planet!<br>...our hero ruefully acknowledges that this happens fairly frequently..&rdquo;<br>-- Calvin and Hobbes",
    "My behaviour is addictive functioning in a disease process of toxic<br>co-dependency. I need holistic healing and wellness before I'll accept any<br>responsibility for my actions.<br>-- Calvin",
    "I thrive on change... I thrive on making other people change.<br>-- Calvin",
    "A good compromise leaves everyone mad.<br>-- Calvin",
    "Given that sooner or later we're all just going to die, what's the point of learning about integers?<br>-- Calvin",
    "Miss Wormwood, could we arrange our seats in a little circle and have a<br>little discussion? Specifically, I'd like to debate whether cannibalism ought<br>to be grounds for leniency in murders since it is less wasteful.<br>-- Calvin",
    "There's never enough time to do all the nothing you want.<br>-- Calvin",
    "It must be awful to be a girl. I'm sure it's frustrating knowing that men<br>are bigger, stronger and better at abstract thought than women. Really, if you<br>are a girl, what would make you go on living?<br>--Calvin, Dictator-For-Life, of GROSS (Get Rid Of Slimy girlS)",
    "&ldquo;Summer is butter on your chin and corn mush between every tooth.&rdquo;<br>-- Calvin",
    "&ldquo;If we wanted more leisure, we'd invent machines that do things less efficiently.&rdquo;<br>-- Calvin's dad",
    "&ldquo;Oops, I always forget the purpose of competition is to divide people into<br>winners and losers.&rdquo;<br>-- Hobbes being sarcastic",
    "It's psychosomatic. You need a lobotomy. I'll get a saw.<br>-- Calvin",
    "Life is full of surprises but never when you need one.<br>-- Calvin",
    "If we don't all watch the same TV, what will keep our culture homogeneous?<br>-- Calvin",
    "Know what I pray for? The strength to change what I can, the inability to<br>accept what I can't and the incapacity to tell the difference. <br>-- Calvin",
    "Calvin: Can you make a living playing silly games? His Dad: Actually, you<br>can be among the most overpaid people on the planet.",
    "Miss Wormwood : Calvin where was the Byzantine empire?<br>Calvin : I'll take &ldquo;outer planets&rdquo; for $100.",
    "&ldquo;That's the problem with nature, something's always stinging you<br>or oozing mucous all over you. Let's go and watch TV.&rdquo;<br>--- Calvin",
    "As a math atheist, I think I should be excused from this.<br>--- Calvin, to Hobbes",
    "YAAH! DEATH TO OATMEAL!<br>-- Calvin",
    "How many boards would the Mongols hoard if the Mongol hordes got bored?<br>-- Calvin",
    "I'm just very selective about the reality I choose to accept.<br>--- Calvin",
    "I have plenty of common sense, I just choose to ignore it.<br>--- Calvin",
    "If something is so complicated that you can't explain it in 10 seconds, then<br>it's probably not worth knowing anyway. <br>-- Calvin",
    "Weekends don't count unless you spend them doing something completely pointless.<br>-- Calvin",
    "You know, Hobbes, some days even my lucky rocketship underpants don't help.<br>-- Calvin",
    "&ldquo;Dad buried in landslide! Jubilant throngs fill streets! Stunned father inconsolable - demands recount!&rdquo;<br>-- Calvin",
    "If you care, you just get disappointed all the time. If you don't care nothing matters so you are never upset.<br>-- Calvin",
    "&ldquo;That's the problem with science. You've got a bunch of empiricists trying<br>to describe things of unimaginable wonder.&rdquo;<br>-- Calvin",
    "&ldquo;Someday I'll write my own philosophy book.&rdquo; <br>-- Calvin",
    "Often it takes some calamity to make us live in the present. Then suddenly<br>we wake up and see all the mistakes we have made. But it is too late to change anything.<br>-- Calvin",
    "Yeah, that's me, Tracer Bullet. I've got eight slugs in me. One's lead,<br>the rest bourbon. The drink packs a wallop, and I pack a revolver. I'm<br>a private eye.<br>-- Calvin & Hobbes",
    "The only skills I have the patience to learn are those that have no real application in life.<br>-- Calvin",
    "For your information, I'm staying like this, and everyone else can just get<br>used to it! If people don't like me the way I am, well TOUGH BEANS! It's a free<br>country! I don't need anyone's permission to be the way I want! This is how I<br>am - Take it or leave it!<br>-- Calvin",
    "Sometimes I think the surest sign that intelligent life exists elsewhere in<br>the universe is that none of it has tried to contact us.<br>-- Calvin",
    "Susie: &ldquo;When life gives you a lemon, make lemonade.&rdquo;Calvin: &ldquo;I say, when life gives you a lemon, wing it right back and add some lemons of your own!&rdquo;<br>-- Calvin",
    "I imagine girls and bugs have a dim perception that nature played a cruel<br>trick on them but they lack the intelligence to really comprehend the magnitude<br>of it.<br>-- Calvin",
    "Dad are you vicariously living through me in the hope that my<br>accomplishments will validate your mediocre life and in some way compensate for<br>all the opportunities you botched?<br>-- Calvin",
    "Be careful or be road-kill.<br>-- Calvin",
    "That's the difference between me and the rest of the world! Happiness isn't<br>good enough for me! I demand euphoria! -- Calvin",
    "I don't need to compromise my principles, because they don't have the<br>slightest bearing on what happens to me anyway.<br>-- Calvin",
    "I like to say &ldquo;quark&rdquo;! Quark, quark, quark, quark!<br>-- Calvin",
    "&ldquo;MOM, CAN I SET FIRE TO MY BED MATTRESS?&rdquo; &ldquo;No, Calvin.&rdquo; &ldquo;CAN I RIDE MY TRICYCLE ON THE ROOF?&rdquo; &ldquo;No, Calvin.&rdquo; &ldquo;Then can I have a cookie?&rdquo; &ldquo;No, Calvin.&rdquo;<br>(&ldquo;She's on to me.&rdquo;)",
    "Miss Wormwood: What state do you live in?<br>Calvin: Denial.<br>Miss Wormwood: I don't suppose I can argue with that...",
    "I think nighttime is dark so you can imagine your fears with less distraction.<br>-- Calvin",
    "I say, if your knees aren't green by the end of the day, you ought to<br>seriously re-examine your life.<br>-- Calvin",
    "Calvin: Know what I pray for? Hobbes: What? Calvin: The strength to change<br>what I can, the inability to accept what I can't, and the incapacity to tell<br>the difference.<br>-- Calvin",
    "Calvin: I'm a genius, but I'm a misunderstood genius.<br>Hobbes: What's misunderstood about you? Calvin: Nobody thinks I'm a genius. <br>-- Calvin",
    "The real fun of living wisely is that you get to be smug about it.<br>-- Calvin",
    "The purpose of writing is to inflate weak ideas, obscure pure reasoning, and<br>inhibit clarity. With a little practice, writing can be an intimidating and<br>impenetrable fog!<br>-- Calvin",
    "Hobbes : Well, you still have afternoons and weekends<br>Calvin : That's when I watch TV.",
    "Sometimes one should just look at things and think about things without doing things.<br>-- Calvin",
    "What do you get when you cross a cantaloupe with lassie? A melon-collie baby! Get it?? HA HA HA OH OH HA HA!<br>-- Calvin",
    "Hobbes : How is the diorama coming along?<br>Calvin : I'm almost finished.<br>Hobbes : I don't see the roadrunner. Weren't you going to put one in?<br>Calvin : See the cotton balls I glued down?<br>Hobbes : Yeah?<br>Calvin : The roadrunner just ran out of the scene leaving behind clouds of dust!",
    "Golly, I'd hate to have a kid like me!<br>-- Calvin",
    "&ldquo;You don't get to be mom if you can't fix everything just right.&rdquo;<br>-- Calvin",
    "Why do we drink cow's milk? Who was the first guy who first looked at a cow<br>and said &ldquo;I think I'll drink whatever comes out of these things when I squeeze 'em!&rdquo;?<br>-- Calvin",
    "Hobbes : What if the public doesn't like your work?<br>Calvin : They are not supposed to like it. This is avant-garde stuff!<br>I'm criticizing the low brows who can't appreciate great art like this!",
    "&ldquo;I suppose the secret to happiness is learning to appreciate the moment.&rdquo;<br>-- Calvin",
    "Yeah, that's me, Tracer Bullet. I've got eight slugs in me. One's lead,<br>the rest bourbon. The drink packs a wallop, and I pack a revolver.<br>I'm a private eye.<br>-- Calvin & Hobbes",
    "&ldquo;But the important thing is persistence.&rdquo;<br>-- Calvin trying to juggle eggs",
    "The only skills I have patience to learn are those that have no real application in life.<br>-- Calvin",
    "I don't need to compromise my principles, because they don't have the<br>slightest bearing on what happens to me anyway.<br>-- Calvin",
    "&ldquo;To make a bad day worse, spend it wishing for the impossible.&rdquo;<br>-- Calvin",
    "The dame was hysterical. Dames Usually are.<br>-- Calvin as Tracer Bullet",
    "Calvin: &ldquo;Who can fathom the feminine mind?&rdquo;<br>Hobbes: &ldquo;I like `em anyway&rdquo;",
    "I imagine bugs and girls have a dim perception that nature played a cruel<br>trick on them, but they lack the intelligence to really comprehend the<br>magnitude of it.<br>-- Calvin",
    "What's the point of wearing your favorite rocketship underpants if nobody ever asks to see 'em? <br>-- Calvin",
    "Thank you. before I begin, I'd like everyone to notice that my report is in<br>a professional, clear plastic binder...When a report looks this good, you know<br>it'll get an A. That's a tip kids. Write it down.<br>-- Calvin",
    "If you do the job badly enough, sometimes you don't get asked to do it again.<br>-- Calvin",
    "I'm learning real skills that I can apply throughout the rest of my life ...<br>Procrastinating and rationalizing.<br>-- Calvin",
    "Well, it just seemed wrong to cheat on an ethics test.<br>-- Calvin",
    "From now on, I'll connect the dots my own way.<br>-- Calvin",
    "Susie: You'd get a good grade without doing any work.<br>Calvin: So?<br>Susie: It's wrong to get rewards you haven't earned.<br>Calvin: I've never heard of anyone who couldn't live with that.",
    "If you couldn't find any weirdness, maybe we'll just have to make some!<br>-- Calvin",
    "My family is dysfunctional and my parents won't empower me. Consequently I'm not self actualized. <br>-- Calvin",
    "Nothing I do is my fault.<br>-- Calvin",
    "Why should I have to work for everything? It's like saying that I don't deserve it.<br>-- Calvin"
];
    
// --- functions ------------

function init()
{
    var expr, node1, node2;

    users.forEach(function (user)
    {
        expr = document.evaluate(".//tr[@username='" + escape(user) + "']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        expr2 = document.evaluate(".//td[@class='quote'][contains(.,'von " + escape(user) + "')]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        // verstecke Beitraege
        for (var i = 0; item = expr.snapshotItem(i); i++)
        {
            node1 = item.getElementsByTagName("td")[3]; // Zum Anfügen des Links
            node2 = item.getElementsByTagName("td")[4]; // Der Beitrag selbst (der versteckt werden soll)

            node2.style.display = "none";
            makeLink(node1, node2);
            
        }
        
        // verstecke auch Zitate
        for (var i = 0; item = expr2.snapshotItem(i); i++)
        {
            node1 = item.parentNode.parentNode.parentNode.parentNode; // Zum Anfügen des Links
            node2 = item; // Der Beitrag selbst (der versteckt werden soll)

            node2.style.display = "none";
            makeLink(node1, node2);
            
        }
        
        
    });
}

function makeLink(node, hideNode)
{
    var button;
    
    button = document.createElement("a");
    button.href = "javascript:void(0);";
    button.addEventListener("click", function (event) { toggleDisplay.toggle(hideNode, button); }, false);
    button.appendChild(strip(calvinQuote()));
    
    node.appendChild(button);
}

function calvinQuote() {
    return quotes[Math.floor(Math.random()*(quotes.length))];
}

function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp;
}

function getStyle(el, styleProp)
{
    var y;

	if (el.currentStyle)
    {
		y = el.currentStyle[styleProp];
    }
	else if (window.getComputedStyle)
    {
		y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
	}

    return y;
}

var toggleDisplay =
{
    text: {"none": calvinQuote(), "table-cell": "verstecken"},
    display: {"none": "table-cell", "table-cell": "none"},
    
    toggle: function(node, callingLink)
    {
        node.style.display = toggleDisplay.display[getStyle(node, "display")];
         if(getStyle(node, "display") == "none")
         {
             callingLink.innerHTML = calvinQuote();
         }
         else
         {
            callingLink.innerHTML = "verstecken";
         }
    }
}

init();
}
