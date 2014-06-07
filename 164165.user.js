// ==UserScript==
// @name           Custom Heavy Load
// @include        http://www.reddit.com/*
// @include        *.mtu.edu/*
// @version                1.0
// ==/UserScript==
 
//******************************************************************************************************************
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//READ ME. NO REALLY, READ THIS
//Anything written using "//" is not actually part of the code. These are called comments and don't affect anything
//Usually they contain notes about how the program works.
//Hopefully this should be simple enough that someone without code experience can operate it
//
//Note: Not all parts of this program are guaranteed to work. I've tested everything as best as possible, but
//it is difficult to do without being able to access the heavy load page whenever I need it
//I also can't guarantee that it works on all systems in all browsers. I hope it works for your system,
//but I don't have the means to to test everything
//SERIOUSLY. READ THAT.
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//******************************************************************************************************************
 
if (document.title.indexOf('Ow') !== -1) {
    //******************************************************************************************************************
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    //THINGS YOU CAN MESS WITH
    //These are some settings that currently let you modify parts of the script
    var rotation_delay = 5; //This controls how long that the program waits between image swaps. It's measured in seconds
   
    var num = 34; 
    //This is how many different images the script has. It is for something called pre-allocation which is a fancy way of making it run faster.
    //If you change the amount of images the program holds make sure to update the number stored in num
    //Num should always be 1 greater than the highest images[#] that you have.
   
    var random = false;//This allows you to choose which mode the program operates in. There are two options:
    //if random = false then the program will operate in a loop that always goes in the same direction
    //if random = true then the program will automatically select a different random image every time the image swaps
   
    var custom_text = true; //This allows you to display custom text instead of the default heavy load message
    //if custom_text = true "phrase1" and "phrase2" will override "reddit is under heavy load right now" and "please try again in a few minutes" respectively
    //if custom_text = false the text will not change
    
    var vertical_offset = 400; //This variable controls how close the image will get to the top of the screen.
    //Reddit's default value is 275
    //HIGHER NUMBERS BRING IT CLOSER TO THE TOP
   
    //DON'T MESS WITH ANYTHING BELOW THIS EXCEPT FOR THE HUGE LIST OF image[#]
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //******************************************************************************************************************
   
    var images = new Array(num); //Preallocates an array so it doesn't have to deal with re-sizing
    var choice = Math.floor(Math.random() * num); //Pretty simple automatic array index generator
    var img = document.getElementsByTagName('img')[0]; //Finds the target image
    var milliseconds_per_second = 1000; //The rotation interval is measured in milliseconds, this allows an easy conversion
    var replacement_text = "<h2>reddit is under heavy load right now</h2><h3>please try again in a few minutes." ; //Part of an experimental update that will allow custom text for each image
    for(var i = 0; i < num; i++) { //More preallocation. I don't think this part actually helps since each of the arrays with the bigger array is all dealt with at once, but I'm not sure
        images[num] = new Array(4); //I'm leaving it in until I get a chance to do some more testing
    }
    document.head.innerHTML = document.head.innerHTML.replace("margin-top:-275px","margin-top:-"+vertical_offset+"px")
    //******************************************************************************************************************
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    //MORE THINGS YOU CAN MESS WITH
    //This area contains a giant list of images that the script will pull from
    //The basic format is:
    //image[#] = ["URL",x,y,"phrase"];//Comment
   
    //"#" Represents which image in the set this is, # start from 0 and count up
    // It is very important that
    // 1)Every # is unique
    // 2)You never skip a #, you need to count in order from 0 to your maximum
    // 3)"num" in the settings is equal to 1 more than your highest #
   
    //"URL" is where on the internet you can find the image
    //It should start with either "http://" or "https://"
    //And end with something like ".gif", ".jpg", or "png"
    //Those are image types and will work with this script
    //If it ends with something that is not an image type such as ".html", ".htm", or ".php"
    //You will run into trouble
   
    //"x" represents how wide the image is. If you set this to something different than the regular resolution of the image it will stretch or shrink it as appropriate
    //"y" represents how tall the image is. It works the same way as x. I recommend not setting y above 400, but its up to you
    //If you set x or y to something other than the default, remember to scale the other appropriately or your image will be distorted
    //If you change x use the equation "new y = ((new x/old x) * old y)" to find what the new value for y should be
    //If you change y use the equation "new x = ((new y/old y) * old x)" to find what the new value for x should be
   
    //"phrase" lets you customize the text message that is displayed
    //This only works if custom_text is set to true
    //If you decide to insert your own phrases, quotation marks will not display properly
    //If you wish to make a " appear you need to put \" in place of it in your phrase.
    //HTML inserted into the phrase -should- work properly, <h2> and <h3> should be predefined by the webpage
    //You're going to want to include <h2></h2>, or <h3></h3> around your phrase to make the formatting work
    //DO NOT PUT IN A BLANK PHRASE
   
    //"//Comment" is a note to yourself about what the image is
    // The URL is a difficult way to remember it, so this will help keep track of everything
    images[0] = ["http://i.imgur.com/mTw94oJ.gif",640,360,"<h2>You broke reddit,</h2><h3>It's okay though</h3>"];//Lyra head bob
    images[1] = ["http://i.imgur.com/NaggdFT.png",640,360,"<h2>You promised not to break Reddit</h2><h3>No one breaks a Pinkie Promise</h3>"];//Pinkie Stare
    images[2] = ["http://i.imgur.com/Lu9leHR.gif",400,400,"<h2>Reddit is down</h2><h3>Why don't you take a nap while you wait</h3>"];//Luna Twitch
    images[3] = ["http://i.imgur.com/1RWPtKy.jpg",400,400,"<h2>Oh no, you can't waste more time on the internet</h2><h3>Your life must be awful</h3>"];//Twilight Nobody Cares
    images[4] = ["http://i.imgur.com/dlIl34A.png",640,200,"<h3>\"Moon?\"</h3><h3>\"Moon.\"</h3><h3>\"TO THE <b><b><b>MOOOOOOOON!\"</b></b></b></h3>"];//Pissed Princesses
    images[5] = ["http://i.imgur.com/6DMMeKe.png",400,400,"<h2>Go back to what you were doing</h2><h3>Don't mind me</h3>"];//It's not creepy.
    images[6] = ["http://i.imgur.com/PZfk2ve.png",224,400,"<h3>Reddit is down</h3><h2>FOR-EV-ER</h2>"];//Pinkie FOREVER
    images[7] = ["http://i.imgur.com/64J1tx8.png",400,400,"<h2>Reddit is down</h2><h3>So here's Scootaloo in a tree</h3>"];//Scootaloo in a tree
    images[8] = ["http://i.imgur.com/ddcl1I0.png",640,360,"<h2>Hello, Tech Support?</h2><h3>I think I found a bug</h3>"];//Dash's Mini-Me
    images[9] = ["http://i.imgur.com/S86OxTD.png",400,400,"<h2>Reddit is down, so have some Derpy</h2><h3>Why else would you use the internet?</h3>"];//Derpy Sombrero
    images[10] = ["http://i.imgur.com/3rXXQV1.png",400,400,"<h2>All you have to do is build an exact copy of Reddit's servers</h2><h3>You have 2 minutes</h3>"];//Nervous Twilight
    images[11] = ["http://i.imgur.com/sfZuuf9.png",400,400,"<h2>Stand back</h2><h3>We've got this</h3>"];//Twilight and Spike ready for battle
    images[12] = ["http://i.imgur.com/JCBAYAP.png",400,400,"<h2>Fascinating!</h2><h3>I have just the book for this</h3>"];//Twilight excited
    images[13] = ["http://i.imgur.com/qADpCWR.png",452,400,"<h2>Don't worry</h2><h3>I know just the spell for this</h3>"];//Twilight um... doing something?
    images[14] = ["http://i.imgur.com/sMLjJ.gif",320,180,"<h2>Meanwhile</h2><h3>Over in Reddit's server room</h3>"];//Rainboom
    images[15] = ["http://i.imgur.com/TUpkrFE.png",400,400,"<h2>whatisthisidonteven</h2>"];//Twiderp
    images[16] = ["http://i.imgur.com/bcLUXFs.gif",300,300,"<h2>THE.</h2><h2><b>WORST.</b></h2><h2><b><b>POSSIBLE.</b></b></h2><h2><b><b><b><b>THING.</b></b></b></b></h2>"];//Rarity frightened
    images[17] = ["http://i.imgur.com/4AWWSas.gif",600,360,"<h2>Stop</h2><h3>Hammertime</h3>"];//CMC dancing
    images[18] = ["http://i.imgur.com/doGE0sk.gif",300,300,"<h2>The Great and Powerful Trixie doesn't trust servers"];//The Great and Powerful Scrunchy Face
    images[19] = ["http://i.imgur.com/vjGavLe.gif",300,300,"<h2>Reddit is down right now</h2><h3>Don't worry, it's not your fault</h3>"];//Derpy happy
    images[20] = ["http://i.imgur.com/rpMUq00.gif",400,400,"<h1>Dear Princess Celestia,</h1><h3>Today I ruined everything</h3>"];//Celestia eyebrows
    images[21] = ["http://i.imgur.com/DzliUCA.gif",400,235,"<h2>Reddit couldn't handle us</h2>"];//Pinkie Pie/Fluttershy Swag
    images[22] = ["http://i.imgur.com/MVz4MLY.gif",635,360,"<h3>Fix it.</h3><h2>NOW!</h2>"];//Flutterstare
    images[23] = ["http://i.imgur.com/1rQPGPO.gif",400,400,"<h2>OMIGOSHOMIGOSHOMIGOSH</h2><h3>OMIGOSHOMIGOSHOMIGOSHOMIGOSH</h3>"];//OMIGOSHOMIGOSHOMIGOSHOMIGOSHOMIGOSH
    images[24] = ["http://i.imgur.com/IskzGlS.gif",300,400,"<h2>And then you let her near the servers?</h2><h3>Um...</h3>"];//Twilight coffee
    images[25] = ["http://i.imgur.com/0SWrJiE.gif",400,400,"<h2>Reddit is down.</h2><h3>If you know what I mean</h3>"];//Cherilee Eyebrows
    images[26] = ["http://i.imgur.com/MuZxsct.gif",300,300,"<h1><i>Serious Business.</i></h1>"];//Twilight LOL INTERNET
    images[27] = ["http://i.imgur.com/fpiVyL3.gif",640,360,"<h3>Can I get a</h3><h2><b>BIZZAM</b></h2>"];//Canni excited
    images[28] = ["http://i.imgur.com/gpbLMkU.gif",640,360,"<h2>Oh look,</h2><h3>Something else <b><i>you</i></b> can't do</h3>"];//Twilight sucks at DDR
    images[29] = ["http://i.imgur.com/t66Ghiy.gif",300,300,"<h2>What'cha doing?</h2>"];//Dash looking at something
    images[30] = ["http://i.imgur.com/IkFk3X1.jpg",320,180,"<h2>Derpy is under heavy load right now</h2>"];//Derpy + Muffins
    images[31] = ["http://i.imgur.com/T8FnF6S.gif",297,400,"<h2>Did you say something darling?</h2><h3>I was a bit distracted</h3>"];//Rarity Prance
    images[32] = ["http://i.imgur.com/HEDhALI.gif",550,233,"<h2>Cutie Mark Crusaders Network Adminstrators!</h2><h3>... Oops ...</h3>"];//CMC loading
    images[33] = ["http://i.imgur.com/44EZkM3.gif",770,136,"<h2>Reddit is down</h2><h3>Why not go outside?</h3>"];//Pinkie Trampoline
        //DON'T MESS WITH ANYTHING BELOW HERE
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //******************************************************************************************************************
       
    changeimage();//First time it runs
    setInterval(function(){changeimage()},rotation_delay * milliseconds_per_second);//Sets it to loop repeatedly
}
 
function changeimage(){
    if(random == false) {
        choice++;
        choice %= num; //Modulus equals, BITCHES. Ah yeah
    }
    else
    {
        var lastchoice = choice;
        while(lastchoice == choice) {//ensures a different image each time
            choice = Math.floor(Math.random() * num);
        }
    }
    if(custom_text == true) {
        document.body.innerHTML = document.body.innerHTML.replace(replacement_text, images[choice][3]); //Swaps out the text for what is currently there
        img = document.getElementsByTagName('img')[0]; //Finds the target image
        replacement_text = images[choice][3]; //Updates text to look for
    }
    img.src = images[choice][0];
    img.height = images[choice][2];
    img.width = images[choice][1];
    
}