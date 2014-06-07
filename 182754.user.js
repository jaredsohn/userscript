// ==UserScript==
// @name        Namize Background Ponies!
// @namespace   http://derpiboo.ru/images/namize_bp
// @description Namize Background Ponies on Derpibooru!
// @icon        https://dl.dropboxusercontent.com/u/7410519/ScreenS/Derpy_by_TheShadowArtist100.png
// @include     http://derpiboo.ru/*
// @include     http://www.derpiboo.ru/*
// @include     http://trixiebooru.org/*
// @include     http://www.trixiebooru.org/*
// @include     http://derpibooru.org/*
// @include     http://www.derpibooru.org/*
// @include     https://derpiboo.ru/*
// @include     https://www.derpiboo.ru/*
// @include     https://trixiebooru.org/*
// @include     https://www.trixiebooru.org/*
// @include     https://derpibooru.org/*
// @include     https://www.derpibooru.org/*
// @version     v1.022
// @grant       none
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require  https://gist.github.com/BrockA/2625891/raw/waitForKeyElements.js
// ==/UserScript==

//Change this
//vvv

var colored = true;          //change this to false if you don't like colors
var fullNameColor = false;   //true -  full name will be coloured
                             //false - only marker will be coloured
var addBackgroundPony = true;//change this to false if you don't wish add " (Background Pony)" to the end of anon's "names"

//------------------------------------------------------------------------------------------------
//Do not change this (if you user. Programmers/scripters can change this)
//vvv

var names1 = ["","8-bit","Aero","Air","Almond","Alpha","Amaranthine","Amber","American","Annoying","Apple","Apricot","Aqua","Asian","Astral","Awesome","Bad","Beauty","Beige","Bell","Belle","Berry","Big","Bitter","Black","Blaze","Blazing","Blue","Bold","Bon","Bright","Brisk","Broken","Bronze","Brown","Candy","Caramel","Careless","Carrot","Charming","Cherry","Chilly","Chimmy","Choco","Chocolate","Chromatic","Chubby","Citric","Classic","Clean","Clear","Clever","Cloudy","Cocky","Coco","Cold","Cool","Copper","Corky","Correct","Cosmic","Cranky","Crazy","Curly","Cute","Cutie","Da’","Daring","Dark","Deadly","Delta","Derpy","Desert","Desired","Diamond","Dim","Dirty","Ditzy","Dizzy","DJ","Doctor","Double","Drama","Dusk","Eastern","Easy","Emerald","Empress","Epic","European","Fancy","Fantastic","Fast","Fat","Fifth","Filthy","First","Flash","Flirtatious","Fluffy","Flutter","Foggy","Fourth","Full","Funny","Fuzzy","Gamma","General","Gentle","Ginger","Glass","Glitter","Golden","Good","Gotta","Gray","Green","Half","Half Baked","Handsome","Happy","Hard","Hasty","Heavy","Hematite","High","Holly","Honey","Horny","Hot","Hyper","Ice","Igneous","Innocent","Iron","Ivory","Jasper","Large","Last","Lavender","Legendary","Lemon","Lemony","Liberty","Light","Lightning","Lilac","Little","Lone","Long","Lovely","Low","Lucky","Main","Malachite","Melo","Metal","Meteor","Mini","Misty","Mixed","Mud","Multicolored","My Little","Mysterious","Mythical","Navy","Neat","Neon","Night","Noisy","Northern","Nurse","Nyan","Old","Olive","Omega","Onyx","Orange","Over","Paper","Party","Peachy","Pear","Pearl","Perfect","Pink","Pinkie","Platinum","Plumy","Princess","Professor","Proud","Pure","Purple","Quartz","Queen","Quick","Rainbow","Rainy","Red","Rosy","Ruby","Ruff","Sad","Sapphire","Saucy","Sea","Second","Shadow","Sharp","Shining","Short","Shy","Silken","Silver","Simply","Slow","Smart","Smooth","Snappy","Sneaky","Soft","Sonic","Southern","Speedy","Spicy","Starry","Stella","Stellar","Stellate","Stinkin'","Stolid","Strict","Strong","Sugar","Sunny","Super","Sweet","Tasty","The Great and Powerful","Third","Thunder","Timid","True","Turquoise","Twilight","Under","Vanilla","Violet","Warning","Western","White","Windy","Winy","Yellow"];
var names2 = ["Angel","Apple","Apples","Armor","Armour","Assassin","Autumn","Barry","Beauty","Bee","Beetle","Bell","Belle","Berries","Blade","Blink","Blossom","Bomb","Bon","Bone","Bones","Book","Boom","Boomer","Bread","Brooch","Brook","Bubble","Bubbles","Bug","Bun","Bunny","Butterfly","Button","Cake","Candle","Candy","Cargo","Cat","Changa","Charge","Cherry","Cider","Class","Clearing","Cloud","Cola","Comet","Computer","Cook","Crasher","Crate","Cream","Creeper","Crown","Crush","Crusher","Cupcake","Cupcakes","Curse","Daiquiri","Dance","Dancer","Dash","Dasher","Dashy","Day","Days","Deal","Derp","Dessert","Devil","Dew","Diamond","Dog","Dovahkiin","Dream","Dress","Drop","Dubstep","Dust","Dusty","Earring","Eclair","Egg","Emerald","Envy","Eye","Eyes","Factory","Faith","Fall","Fear","Feather","Feathers","Fire","Flag","Flame","Flames","Flare","Floor","Flower","Flowers","Flyer","Folder","Forest","Fork","Frost","Glass","Ground","Halo","Harvest","Hawk","Hay","Haze","Head","Heart","Hills","Hoof","Hooves","Hope","Horn","Horns","Horseshoe","Horseshoes","Hunt","Hunter","Image","In Socks","Jam","Jazz","Journal","Kettle","Key","Kill","Kills","Knife","Knight","Ladle","Lady","Lake","Lamp","Leaf","Lemon","Lemonade","Light","List","Loaf","Love","Luna","Mane","Mess","Miner","Mint","Mints","Mist","Moon","Mouse","Muffin","Music","Necklace","Needle","News","Night","Nights","Noon","Note","Notes","Nova","Patty","Pepper","Picnic","Picture","Pie","Pirate","Pixel","Pony","Pop","Popper","Pride","Prism","Prod","Punk","Rainbow","Rat","Reaper","Rice","Ring","Rock","Roll","Romance","Rosette","Ruby","Runner","Saddle","Sapphire","Scapula","Shield","Shimmer","Shine","Shovel","Shower","Shy","Signal","Skies","Sky","Slapjack","Snap","Snow","Song","Soul","Sparkle","Sparky","Spawn","Sphere","Spider","Spin","Spirit","Spoon","Spring","Stairs","Star","Stars","Stool","Strike","String","Strings","Stripe","Stripes","Stuff","Summer","Sun","Swirl","Sword","Swords","Table","Tart","Tiara","Time","Times","Top","Tree","Trees","Trixie","Tron","Twist","Vise","Water","Waterfall","Wheat","Wind","Window","Wing","Wings","Winter","Wolf"];

textNodes = document.evaluate( 
    ".//a | .//strong | .//div[@class='metasection']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
//var searchREF = new RegExp('Background Pony #([0-9A-F]{4})','g'); 
var searchRER = new RegExp('Background Pony #([0-9A-F]{2})([0-9A-F]{2})',''); 
/*var searchRER = new RegExp('Background Pony','gi');*/
var replace = 'pling'; 


function getBPName(re, match, overrideNoColors)
{
    if(typeof(overrideNoColors)==='undefined') overrideNoColors=colored;

    var index1 = parseInt(match[1],16);
    var index2 = parseInt(match[2],16);
    var replace=names1[index1];
    
    if (replace!='') replace+=' ';
    replace+=names2[index2];
    var span_open='<span title="'+match[1]+match[2]+'" style="color: '+getRGBstr(match[1]+match[2])+';">';
    if (overrideNoColors)
    {
        if (fullNameColor) replace=span_open+replace+'</span>';
        else replace+=span_open+' •</span>';
    }
    else replace='<span title="'+match[1]+match[2]+'">'+replace+'</span>';
    if (addBackgroundPony) replace+=" (Background Pony)";
    re=re.replace(searchRER, replace);
    return re;
}


for (var i=0;i<textNodes.snapshotLength;i++) 
{ 
    var node = textNodes.snapshotItem(i); 
    
    var re = node.innerHTML;
    
    var match = re.match(searchRER);
    
    //alert(node.nodeName);
    
    if (match!=null)
    {
        re=getBPName(re, match);
        //re='123';
        node.innerHTML=re;
    }
}

waitForKeyElements("div.comment_info > strong, div.comment_body a, div.post-prevue a", get_span_content);

function getRGBstr(color16bit)
{
    var pixel = parseInt(color16bit,16);
    
    var red_mask = 0xF800;
    var green_mask = 0x7E0;
    var blue_mask = 0x1F;
    
    var red_value = (pixel & red_mask) >> 11;
    var green_value = (pixel & green_mask) >> 5;
    var blue_value = (pixel & blue_mask);
    
    // Expand to 8-bit values.
    var red   = red_value << 3;
    var green = green_value << 2;
    var blue  = blue_value << 3;
    
    return 'rgb('+red+','+green+','+blue+')';
}

function get_span_content (jNode) 
{
     var spanText   = $.trim (jNode.text () );
     var lastText   = jNode.data ("lastText")  ||  "";

     if (spanText != lastText) {
        //  DO WHATEVER WITH spanText HERE.

        //var re = jNode.html().replace(searchRER, replace);
        var re = jNode.html();
        
        match=searchRER.exec(re);
        
        if (match!=null)
        {
            re=getBPName(re, match);
            //re='123';
            jNode.html(re);
        }
        //alert(jNode.text());

        jNode.data ("lastText", spanText);
     }

     return true;
}


/**/

