// ==UserScript==
// @name           Bad Moon Minder
// @namespace      kol.interface.unfinished
// @description    Keeps track of which bad moon adventures you have encountered and yet to encounter in KOL. Adds a page to your quest log that provides short descriptions of bad moon adventures, links to wiki entries for associated effects, and to adventure locations.
// @include        http://*kingdomofloathing.com/adventure.php*
// @include        http://*kingdomofloathing.com/questlog.php*
// @include        http://*kingdomofloathing.com/valhalla.php*
// @include        http://*kingdomofloathing.com/charpane.php
// @include        http://127.0.0.1:*/adventure.php*
// @include        http://127.0.0.1:*/questlog.php*
// @include        http://127.0.0.1:*/valhalla.php*
// @include        http://127.0.0.1:*/charpane.php
// @version        1.1
// ==/UserScript==

//Version 1.1
//  changed drunkenness in the Surprising! (black kitten) adventure.
//Version 1.0
//  updated effects from newly released data 
//Version 0.9
//  fixed a problem with the Haunted Library special adventure not being recognized
//  recategorize some things to reflect updated info
//Version 0.7 (beta version)
//  added a missed adventure
//  fixed a problem with data from multiple accounts getting confused
//Version 0.6 (beta version)

// array of all bad moon adventures
var bma = 
    new Array(
              {cat:'meat',
               adv:"This Doesn't Look Like Candy Mountain",loc:'The Spooky Forest',snarfblat:15,
               effect:'Missing Kidney',
               image:"http://images.kingdomofloathing.com/itemimages/kidney.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Missing_Kidney',
               ititle:"Missing Kidney",
               pos:'1,000 Meat',neg:'none'},
              {cat:'meat',
               adv:"Flowers For ",loc:'Degrassi Knoll',snarfblat:18,
               effect:'Duhhh',
               image:"http://images.kingdomofloathing.com/itemimages/duncecap.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Duhhh',
               ititle:"Duhhh",
               pos:'2,000 Meat',neg:'Mysticality -20'},
              {cat:'meat',
               adv:"Onna Stick",loc:'The Bat Hole Entryway',snarfblat:30,
               effect:'Affronted Decency',
               image:"http://images.kingdomofloathing.com/itemimages/angry.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Affronted_Decency',
               ititle:"Affronted Decency",
               pos:'3,000 Meat',neg:'Moxie -20'},
              {cat:'meat',
               adv:"The Beaten-Senseless Man's Hand",loc:'South of the Border',snarfblat:45,
               effect:'Beaten Up',
               image:"http://images.kingdomofloathing.com/itemimages/beatenup.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/The_Beaten-Senseless_Man\'s_Hand',
               ititle:"Beaten Up",
               pos:'4,000 Meat',neg:'Beaten up'},
              {cat:'meat',
               adv:"A White Lie",loc:'Whitey\'s Grove',snarfblat:100,
               effect:'Maid Disservice',
               image:"http://images.kingdomofloathing.com/itemimages/skirt.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Maid_Disservice',
               ititle:"Maid Disservice",
               pos:'5,000 Meat',neg:'All attributes -20%'},
              {cat:'acquire',
               adv:"Surprising!",loc:'Noob Cave',snarfblat:91,
               effect:'black kitten',
               image:"http://images.kingdomofloathing.com/itemimages/bkitten.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Surprising!',
               ititle:"black kitten",
               pos:'Acquire black kitten, terrarium',neg:'Drunkenness +14'},
              {cat:'acquire',
               adv:"Because Stereotypes Are Awesome",loc:'The Typical Tavern (post quest)',snarfblat:25,
               effect:'leprechaun hatchling',
               image:"http://images.kingdomofloathing.com/itemimages/tinylep.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Because_Stereotypes_Are_Awesome',
               ititle:"leprechaun hatchling",
               pos:'Acquire leprechaun hatchling',neg:'Drunkenness +1'},
              {cat:'acquire',
               adv:"The Placebo Defect",loc:'The Haunted Conservatory',snarfblat:103,
               effect:'potato sprout',
               image:"http://images.kingdomofloathing.com/itemimages/sprout.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/The_Placebo_Defect',
               ititle:"potato sprout",
               pos:'Acquire potato sprout',neg:'Lose 75% of max HP, MP'},
              {cat:'acquire',
               adv:"Say Cheese!",loc:'The Arid, Extra-Dry Desert (unhydrated)',snarfblat:121,
               effect:'anticheese',
               image:"http://images.kingdomofloathing.com/itemimages/anticheese.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Say_Cheese!',
               ititle:"anticheese",
               pos:'Acquire anticheese',neg:'Lose 50 HP'},
              {cat:'acquire',
               adv:"Why Did It Have To Be Snake Eyes?",loc:'The Hidden Temple',snarfblat:17,
               effect:'loaded dice',
               image:"http://images.kingdomofloathing.com/itemimages/dice.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Loaded_dice',
               ititle:"loaded dice",
               pos:'Acquire loaded dice',neg:'Lose 50%-75% HP'},
              {cat:'acquire',
               adv:"That's My Favorite Kind of Contraption",loc:'The Spooky Forest',snarfblat:15,
               effect:'Dang Near Cut In Half',
               image:"http://images.kingdomofloathing.com/itemimages/gash.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Dang_Near_Cut_In_Half',
               ititle:"Dang Near Cut In Half",
               pos:'Torso Awareness',neg:'Muscle -50%'},
              {cat:'combat',
               adv:"Shall We Dance",loc:'Knob Goblin Laboratory',snarfblat:50,
               effect:'The Vitus Virus',
               image:"http://images.kingdomofloathing.com/itemimages/virus.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/The_Vitus_Virus',
               ititle:"The Vitus Virus",
               pos:'Items +50%',neg:'Stats/fight -5'},
              {cat:'combat',
               adv:"You Look Flushed",loc:'The Haunted Bathroom',snarfblat:107,
               effect:'Your #1 Problem',
               image:"http://images.kingdomofloathing.com/itemimages/footprints.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Your_1_Problem',
               ititle:"Your #1 Problem",
               pos:'Items +100%',neg:'All attributes -20'},
              {cat:'combat',
               adv:"What Do We Want?",loc:'The Misspelled Cemetary (Pre-Cyrpt)',snarfblat:21,
               effect:'Braaains',
               image:"http://images.kingdomofloathing.com/itemimages/realbrain.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Braaains',
               ititle:"Braaains",
               pos:'Meat +50%',neg:'Combat init -50%'},
              {cat:'combat',
               adv:"When Do We Want It?",loc:'The Misspelled Cemetary (Post-Cyrpt)',snarfblat:58,
               effect:'Braaaaaains',
               image:"http://images.kingdomofloathing.com/itemimages/realbrain.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Braaaaaains',
               ititle:"Braaaaaains",
               pos:'Meat +200%',neg:'Items -50%'},
              {cat:'bigskill',
               adv:"How Far Down Do You Want To Go?",loc:'The Obligatory Pirate\'s Cove',snarfblat:66,
               effect:'Hornswaggled',
               image:"http://images.kingdomofloathing.com/itemimages/eyepatch.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Hornswaggled',
               ititle:"Hornswaggled",
               pos:'Moxie +50%',neg:'Muscle -50%'},
              {cat:'bigskill',
               adv:"Double-Secret Initiation",loc:'Orcish Frat House (disguised)',snarfblat:29,
               effect:'Shamed & Manipulated',
               image:"http://images.kingdomofloathing.com/itemimages/blush.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Shamed_%26_Manipulated',
               ititle:"Shamed & Manipulated",
               pos:'Muscle +50%',neg:'Moxie -50%'},
              {cat:'bigskill',
               adv:"It's All The Rage",loc:'Orcish Frat House',snarfblat:27,
               effect:'The Rage',
               image:"http://images.kingdomofloathing.com/itemimages/angry.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/The_Rage',
               ititle:"The Rage",
               pos:'Muscle +50%',neg:'Mysticality -50%'},
              {cat:'bigskill',
               adv:"Better Dread Than Dead",loc:'The Hippy Camp',snarfblat:26,
               effect:'Dreadlocked',
               image:"http://images.kingdomofloathing.com/itemimages/hippywig.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Dreadlocked',
               ititle:"Dreadlocked",
               pos:'Mysticality +50%',neg:'Moxie -50%'},
              {cat:'bigskill',
               adv:"Drumroll, Please",loc:'The Hippy Camp (disguised)',snarfblat:65,
               effect:'Drummed Out',
               image:"http://images.kingdomofloathing.com/itemimages/drum.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Drummed_Out',
               ititle:"Drummed Out",
               pos:'Mysticality +50%',neg:'Muscle -50%'},
              {cat:'medattribute',
               adv:"On The Whole, the Bark is Better",loc:'Cobb\'s Knob Harem',snarfblat:42,
               effect:'Once Bitten, Twice Shy',
               image:"http://images.kingdomofloathing.com/itemimages/teeth.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Once_Bitten%2C_Twice_Shy',
               ititle:"Once Bitten, Twice Shy",
               pos:'Moxie +40',neg:'Familiar wgt -50%'},
              {cat:'medattribute',
               adv:"It's So Heavy",loc:'Cobb\'s Knob Treasury',snarfblat:41,
               effect:'Animal Exploiter',
               image:"http://images.kingdomofloathing.com/itemimages/reindeer.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Animal_Exploiter',
               ititle:"Animal Exploiter",
               pos:'Muscle +40 ',neg:'Familiar wgt -50% '},
              {cat:'medattribute',
               adv:"KELF! I Need Somebody!",loc:'Cobb\'s Knob Kitchens',snarfblat:40,
               effect:'Scent of a Kitchen Elf',
               image:"http://images.kingdomofloathing.com/itemimages/houseelf.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Scent_of_a_Kitchen_Elf',
               ititle:"Scent of a Kitchen Elf",
               pos:'Mysticality +40 ',neg:'Familiar wgt -50% '},
              {cat:'smallattribute',
               adv:"Sandwiched in the Club",loc:'The Sleazy Back Alley',snarfblat:112,
               effect:'Chronologically Pummeled',
               image:"http://images.kingdomofloathing.com/itemimages/watch.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Chronologically_Pummeled',
               ititle:"Chronologically Pummeled",
               pos:'Moxie +20',neg:'Muscle, Mysticality -5'},
              {cat:'smallattribute',
               adv:"O Goblin, Where Art Thou?",loc:'Outskirts of Cobb\'s Knob',snarfblat:114,
               effect:'Minioned',
               image:"http://images.kingdomofloathing.com/itemimages/cuffs.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Minioned',
               ititle:"Minioned",
               pos:'Muscle +20',neg:'Moxie, Mysticality -5'},
              {cat:'smallattribute',
               adv:"Pantry Raid!",loc:'The Haunted Pantry',snarfblat:113,
               effect:'Enhanced Archaeologist',
               image:"http://images.kingdomofloathing.com/itemimages/cocobra.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Enhanced_Archaeologist',
               ititle:"Enhanced Archaeologist",
               pos:'Mysticality +20',neg:'Moxie, Muscle -5'},
              {cat:'combatdr',
               adv:"Getting Hammered",loc:'The Inexplicable Door',snarfblat:73,
               effect:'Midgetized',
               image:"http://images.kingdomofloathing.com/itemimages/whitepix.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Midgetized',
               ititle:"Midgetized",
               pos:'Dmg reduction +4',neg:'Weapon dmg -8'},
              {cat:'combatdr',
               adv:"Obligatory Mascot Cameo",loc:'The Penultimate Fantasy Airship',snarfblat:81,
               effect:'Synthesized',
               image:"http://images.kingdomofloathing.com/itemimages/stuffcocoa.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Synthesized',
               ititle:"Synthesized",
               pos:'Dmg reduction +8',neg:'Weapon dmg -8'},
              {cat:'eltdmg',
               adv:"Frost Bitten, Twice Shy",loc:'The Goatlet',snarfblat:60,
               effect:'Frostbitten',
               image:"http://images.kingdomofloathing.com/itemimages/snowflake.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Frostbitten',
               ititle:"Frostbitten",
               pos:'Cold dmg +10',neg:'Dmg reduction -2'},
              {cat:'eltdmg',
               adv:"If You Smell Something Burning, It's My Heart",loc:'The Haunted Kitchen',snarfblat:102,
               effect:'Burning Heart',
               image:"http://images.kingdomofloathing.com/itemimages/heart.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Burning_Heart',
               ititle:"Burning Heart",
               pos:'Hot dmg +10',neg:'Dmg reduction -2'},
              {cat:'eltdmg',
               adv:"Oil Be Seeing You",loc:'The Deep Fat Friars\' Gate',snarfblat:79,
               effect:'Basted',
               image:"http://images.kingdomofloathing.com/itemimages/slimed.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Basted',
               ititle:"Basted",
               pos:'Sleaze dmg +10',neg:'Dmg reduction -2'},
              {cat:'eltdmg',
               adv:"Back Off, Man.  I'm a Scientist.",loc:'The Haunted Library',snarfblat:104,
               effect:'Freaked Out',
               image:"http://images.kingdomofloathing.com/itemimages/hoppeddown.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Freaked_Out',
               ititle:"Freaked Out",
               pos:'Spooky dmg +10',neg:'Dmg reduction -2'},
              {cat:'eltdmg',
               adv:"Oh Guanoes!",loc:'Guano Junction',snarfblat:31,
               effect:'Guanified',
               image:"http://images.kingdomofloathing.com/itemimages/guano.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Guanified',
               ititle:"Guanified",
               pos:'Stench dmg +10',neg:'Dmg reduction -2'},
              {cat:'eltdmg',
               adv:"Vole Call!",loc:'The Haunted Billiards Room',snarfblat:105,
               effect:'Re-Possessed',
               image:"http://images.kingdomofloathing.com/itemimages/stogie.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Re-Possessed',
               ititle:"Re-Possessed",
               pos:'Weapon dmg +10',neg:'Dmg reduction -2'},
              {cat:'eltdmg2',
               adv:"The Big Chill",loc:'The Icy Peak',snarfblat:110,
               effect:'Hyperbolic Hypothermia',
               image:"http://images.kingdomofloathing.com/itemimages/iceberglet.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Hyperbolic_Hypothermia',
               ititle:"Hyperbolic Hypothermia",
               pos:'Cold dmg +20',neg:'Cold dmg 1-3/rnd'},
              {cat:'eltdmg2',
               adv:"Mr. Sun Is Not Your Friend",loc:'The Oasis',snarfblat:122,
               effect:'Solar Flair',
               image:"http://images.kingdomofloathing.com/itemimages/sun.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Solar_Flair',
               ititle:"Solar Flair",
               pos:'Hot dmg +20',neg:'Hot dmg 1-3/rnd'},
              {cat:'eltdmg2',
               adv:"Pot Jacked",loc:'The Hole in the Sky',snarfblat:83,
               effect:'Greased',
               image:"http://images.kingdomofloathing.com/itemimages/bacon.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Greased',
               ititle:"Greased",
               pos:'Sleaze dmg +20',neg:'Sleaze dmg 1-3/rnd'},
              {cat:'eltdmg2',
               adv:"Party Crasher",loc:'The Haunted Ballroom',snarfblat:109,
               effect:'Slimed',
               image:"http://images.kingdomofloathing.com/itemimages/slimed.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Slimed',
               ititle:"Slimed",
               pos:'Spooky dmg +20',neg:'Spooky dmg 1-3/rnd'},
              {cat:'eltdmg2',
               adv:"A Potentially Offensive Reference Has Been Carefully Avoided Here",loc:'The Black Forest',snarfblat:111,
               effect:'Tar-Struck',
               image:"http://images.kingdomofloathing.com/itemimages/blpudding.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Tar-Struck',
               ititle:"Tar-Struck",
               pos:'Stench dmg +20',neg:'Stench dmg 1-3/rnd'},
              {cat:'eltdmg2',
               adv:"Do You Think You're Better Off Alone",loc:'The Castle in the Sky',snarfblat:82,
               effect:'Raving Lunatic',
               image:"http://images.kingdomofloathing.com/itemimages/hoppedup.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Raving_Lunatic',
               ititle:"Raving Lunatic",
               pos:'Weapon dmg +20',neg:'Melee dmg 1-3/rnd'},
              {cat:'resistance',
               adv:"Strategy: Get Arts",loc:'The Palindome',snarfblat:119,
               effect:'Paw swap',
               image:"http://images.kingdomofloathing.com/itemimages/hand2.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Paw_swap',
               ititle:"Paw swap",
               pos:'So-So Cold resistance',neg:'Hot/Spooky dmg x2'},
              {cat:'resistance',
               adv:"Pot-Unlucky",loc:'The Hidden City',snarfblat:118,
               effect:'Deep-Fried',
               image:"http://images.kingdomofloathing.com/itemimages/cheesestaf.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Deep-Fried',
               ititle:"Deep-Fried",
               pos:'So-So Hot resistance',neg:'Stench/Sleaze dmg x2'},
              {cat:'resistance',
               adv:"Mistaken Identity, LOL",loc:'The Valley Beyond the Orc Chasm',snarfblat:80,
               effect:'Scared Stiff',
               image:"http://images.kingdomofloathing.com/itemimages/hoppeddown.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Scared_Stiff',
               ititle:"Scared Stiff",
               pos:'So-So Sleaze resistance',neg:'Spooky/Cold dmg x2'},
              {cat:'resistance',
               adv:"Mind the Fine Print",loc:'Tower Ruins',snarfblat:22,
               effect:'Side Affectation',
               image:"http://images.kingdomofloathing.com/itemimages/goofballs.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Side_Affectation',
               ititle:"Side Affectation",
               pos:'So-So Spooky Resistance',neg:'Stench/Hot dmg x2'},
              {cat:'resistance',
               adv:"Sweatin' Like a Vet'ran",loc:'The Arid, Extra-Dry Desert (ultra-hydrated)',snarfblat:123,
               effect:'Shirtless in Seattle',
               image:"http://images.kingdomofloathing.com/itemimages/wtee.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Shirtless_in_Seattle',
               ititle:"Shirtless in Seattle",
               pos:'So-So Stench Resistance',neg:'Cold/Sleaze dmg x 2'},
              {cat:'resistance',
               adv:"Hair of the Hellhound",loc:'The Haunted Wine Cellar',snarfblat:178, //tbd fix
               effect:'Cupshotten',
               image:"http://images.kingdomofloathing.com/itemimages/snifter.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Cupshotten',
               ititle:"Cupshotten",
               pos:'So-So resistance to all elements',neg:'All attributes -20%'},
              {cat:'resistance',
               adv:"Elementally, My Deal Watson",loc:'Beanbat Chamber',snarfblat:33,
               effect:'Batigue',
               image:"http://images.kingdomofloathing.com/itemimages/batwing.gif",
               ionClick:'http://kol.coldfront.net/thekolwiki/index.php/Batigue',
               ititle:"Batigue",
               pos:'Slight resistance to all elements',neg:'All attributes -10%'}
              );

// add link to the top of the quest log to the new page
function addPageLink() {
    var listing = document.getElementsByTagName('a');
    var centernode=null;
    for (var i=0;i<listing.length;i++) {
        var tblnode = listing[i];
        if (tblnode.getAttribute('href')=='questlog.php?which=1' && tblnode.firstChild && tblnode.firstChild.data=='[current quests]') {
            centernode=tblnode.parentNode;
            break;
        }
        if (tblnode.getAttribute('href')=='questlog.php?which=2' && tblnode.firstChild && tblnode.firstChild.data=='[completed quests]') {
            centernode=tblnode.parentNode;
            break;
        }
    }
    if (!centernode)
        return;
    var linknode = document.createElement('a');
    linknode.setAttribute("id",'badmoonstuff');
    linknode.addEventListener("click", showBadMoon, true);
    var linktext = document.createTextNode('[bad moon]');
    var spacing = document.createTextNode('\u00A0\u00A0\u00A0');
    centernode.appendChild(spacing);
    linknode.appendChild(linktext);
    centernode.appendChild(linknode);

}

// construct and show bad moon table, if it's not there already
function showBadMoon() {
    if (document.getElementById('badmoontable')) {
        window.location.reload();
        return;
    }
    badMoonPage();
}

function badMoonPage() {
    var link = document.getElementById('badmoonstuff').parentNode; // center
    while (link.nextSibling) {
        link.parentNode.removeChild(link.nextSibling);
    }
    //GM_log("removed "+x+" element(s)");
    // now to construct our page
    link.parentNode.appendChild(document.createElement('p'));
    var ctr = document.createElement('center');
    link.parentNode.appendChild(ctr);

    var maintbl = document.createElement('table');
    maintbl.setAttribute('style',"padding: 0px;");
    maintbl.setAttribute('id',"badmoontable");
    maintbl.setAttribute('width',"95%");
    ctr.appendChild(maintbl);

    // titles
    var arow = document.createElement('tr');
    maintbl.appendChild(arow);

    var acell = document.createElement('td');
    acell.setAttribute('width','25%');
    var bf = document.createElement('b');
    bf.appendChild(document.createTextNode('Effect'));
    acell.appendChild(bf);
    arow.appendChild(acell);

    acell = document.createElement('td');
    acell.setAttribute('width','35%');
    bf = document.createElement('b');
    bf.appendChild(document.createTextNode('Location'));
    acell.appendChild(bf);
    arow.appendChild(acell);

    acell = document.createElement('td');
    acell.setAttribute('width','20%');
    bf = document.createElement('b');
    bf.appendChild(document.createTextNode('Positive'));
    acell.appendChild(bf);
    arow.appendChild(acell);

    acell = document.createElement('td');
    acell.setAttribute('width','20%');
    bf = document.createElement('b');
    bf.appendChild(document.createTextNode('Negative'));
    acell.appendChild(bf);
    arow.appendChild(acell);

    var lastcat="";
    var known = getKnown();
    
    // entries
    for (var i=0;i<bma.length;i++) {

        var curcat = bma[i].cat;
        if (curcat!=lastcat) {
            lastcat=curcat;

            ctr.appendChild(document.createElement('p'));
            maintbl = document.createElement('table');
            maintbl.setAttribute('style',"padding: 0px; border: 1px solid blue;");
            maintbl.setAttribute('width',"95%");
            ctr.appendChild(maintbl);
        }

        var arow = document.createElement('tr');
        maintbl.appendChild(arow);

        var acell = document.createElement('td');
        acell.setAttribute('width','5%');
        var ilink = document.createElement('a');
        ilink.setAttribute('index',i);
        var imgnode = document.createElement('img');
        imgnode.setAttribute('src',bma[i].image);
        //imgnode.setAttribute('onclick','window.open("'+bma[i].ionClick+'","'+bma[i].ititle+"\")");
        imgnode.setAttribute('alt',bma[i].ititle);
        imgnode.setAttribute('title','Click to toggle status');
        imgnode.setAttribute('width','30');
        imgnode.setAttribute('height','30');
        imgnode.setAttribute('class','hand');
        ilink.addEventListener('click',toggleAdv,false);
        ilink.appendChild(imgnode);
        acell.appendChild(ilink);
        arow.appendChild(acell);

        acell = document.createElement('td');
        acell.setAttribute('width','20%');
        var elink = document.createElement('a'); 
        elink.setAttribute('title','Click to go to wiki entry');
        elink.setAttribute('onclick','window.open("'+bma[i].ionClick+'","'+bma[i].ititle+"\")");
        elink.appendChild(document.createTextNode(bma[i].effect));
        var isknown = 0;
        if (known.indexOf('::'+bma[i].effect+'::')>=0) {
            isknown=1;
            var font = document.createElement('font');
            font.setAttribute('color','gray');
            font.appendChild(elink);
            acell.appendChild(font);
        } else {
            acell.appendChild(elink);
        }
        arow.appendChild(acell);

        acell = document.createElement('td');
        acell.setAttribute('width','35%');
        var newlink = document.createElement('a');
        newlink.setAttribute('href','adventure.php?snarfblat='+bma[i].snarfblat);
        newlink.setAttribute('title','Click to adventure in this location');
        if (isknown==1) {
            var font = document.createElement('font');
            font.setAttribute('color','gray');
            font.appendChild(document.createTextNode(bma[i].loc));
            newlink.appendChild(font);
        } else {
            newlink.appendChild(document.createTextNode(bma[i].loc));
        }
        acell.appendChild(newlink);
        arow.appendChild(acell);

        acell = document.createElement('td');
        acell.setAttribute('width','20%');
        if (isknown==1) {
            var font = document.createElement('font');
            font.setAttribute('color','gray');
            font.appendChild(document.createTextNode(bma[i].pos));
            acell.appendChild(font);
        } else {
            acell.appendChild(document.createTextNode(bma[i].pos));
        }
        arow.appendChild(acell);

        acell = document.createElement('td');
        acell.setAttribute('width','20%');
        if (isknown==1) {
            var font = document.createElement('font');
            font.setAttribute('color','gray');
            font.appendChild(document.createTextNode(bma[i].neg));
            acell.appendChild(font);
        } else {
            acell.appendChild(document.createTextNode(bma[i].neg));
        }
        arow.appendChild(acell);
    }
    ctr.appendChild(document.createElement('p'));
    var rlink = document.createElement('a');
    rlink.addEventListener('click',resetAdv,false);
    rlink.setAttribute('title','Click to reset the status of all adventures to unknown.');
    rlink.appendChild(document.createTextNode('[Reset Adventure Status for All Adventures]'));
    ctr.appendChild(rlink);
}

// retrieve the known list
function getKnown() {
    var pn=getPlayerName();
    if (pn=="")
        return;
    return GM_getValue(pn+"_known",'');
}

// add an effect if it's not there already
function addKnown(effect) {
    var pn=getPlayerName();
    if (pn=="")
        return;
    var known = getKnown();
    var addition = "::"+effect+"::";
    if (known.indexOf(addition)<0) {
        known = known + addition;
        GM_setValue(pn+"_known",known);
    }
}

// remove an effect
function removeKnown(effect) {
    var pn=getPlayerName();
    if (pn=="")
        return;
    var known = getKnown();
    var addition = "::"+effect+"::";
    var x=known.indexOf(addition);
    if (x>=0) {
        known = known.substr(0,x) + known.substr(x+addition.length);
        GM_setValue(pn+"_known",known);
    }
}

// handler to toggle an entry
function toggleAdv(e) {
    var idx = this.getAttribute('index');
    if (idx) {
        //GM_log("Toggling: "+idx);
        //GM_log("Was: "+getKnown());
        toggleKnown(bma[parseInt(idx)].effect);
        //GM_log("Now: "+getKnown());
        badMoonPage();
    } 
}

// handler to reset all entries
function resetAdv(e) {
    var answer = confirm('Reset all adventures to the unknown state?');
    if (answer) {
        resetKnown();
        badMoonPage();
        //window.location.reload();
    }
}

// toggle an effect in the known list
function toggleKnown(effect) {
    var pn=getPlayerName();
    if (pn=="")
        return;
    var known = getKnown();
    var addition = "::"+effect+"::";
    var x=known.indexOf(addition);
    if (x>=0) {
        known = known.substr(0,x) + known.substr(x+addition.length);
    } else {
        known = known + addition;
    }
    GM_setValue(pn+"_known",known);
}

// reset known list to empty
function resetKnown() {
    var pn=getPlayerName();
    if (pn=="")
        return;
    GM_setValue(pn+"_known",'');
}

// get the player name, from the charpane if necessary
function getPlayerName() {
    var pn=GM_getValue("currentPlayer", "");
    if (pn=="") {
        getPlayerNameFromCharpane();
        pn=GM_getValue("currentPlayer", "");
    }
    return pn;
}

////////////////////////////////////////////////////////////////////////////////
// stolen and adapted from Anti-Marty's fortune cookie script
////////////////////////////////////////////////////////////////////////////////
// parse the char pane for the player name
// revised version! now taken directly from kolpreviousnadventures to handle compact mode
function getPlayerNameFromCharpane() {
    var somef=window.parent.frames;
    var goo;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane") {
            goo=somef[j];
            var username = goo.document.getElementsByTagName("b");
            if (!username || username.length < 1) return false;
            username = username[0];
            if (!username) return false;
            username = username.firstChild;
            if (!username) return false;
            // in full mode the link is <a><b>Name</b></a>
            // in compact mode it's <b><a>Name</a></b>
            // so have to handle this, and also can use it to tell
            // whether it's in compact mode or not.
            var fullmode = true;
            while (username && username.nodeType == 1)
                {
                    username = username.firstChild;
                    fullmode = false;
                }
            if (!username) return false;
            username = username.nodeValue;
            if (!username) return false;
            username = username.toLowerCase();
            //alert("found username " + username + ", fullmode: " + fullmode);
            GM_setValue("currentPlayer", username);  // store for other functions that need to know who's playing
            //return {'username': username, 'fullmode': fullmode};
            break;
        }
    }
}

// function to check and see if this is a bad moon adventures, and
// to update the known list if so
function checkForBM() {
    //GM_log("Checking...");
    var listing = document.getElementsByTagName('b');
    var evidence = 0;
    var advname=null;
    for (var i=0;i<listing.length;i++) {
        var tblnode = listing[i];
        if (tblnode.firstChild) {
            if (tblnode.firstChild.data=='Adventure Results:')
                evidence++;
            else if (evidence>0) {
                advname=tblnode.firstChild.data;
                break;
            }
            
        }
    }
    if (advname) {
        //GM_log("Found "+advname);
        for (var i=0;i<bma.length;i++) {
            if (advname===bma[i].adv || (i==1 && advname.indexOf(bma[1].adv)==0)) {
                // yes it's a bm adventure
                //GM_log("Adding "+advname);
                addKnown(bma[i].effect);
                break;
            }
        }
    }
}


if(window.location.pathname.indexOf('/questlog.php')==0) {
    addPageLink();
} else if(window.location.pathname.indexOf('/valhalla.php')==0) {
    resetKnown();
} else if(window.location.pathname.indexOf('/charpane.php')==0) {
    getPlayerNameFromCharpane();
} else {
    checkForBM();
}

