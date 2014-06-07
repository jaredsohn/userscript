// ==UserScript==
// @name           Recipe Counter
// @namespace      kol.interface.unfinished
// @description    Counts known recipes and tracks missing recipes in your crafting discovery pages in Kingdom of Loathing.
// @include        http://*kingdomofloathing.com/craft.php*
// @include        http://*.kingdomofloathing.com/account.php
// @include        http://127.0.0.1:*/craft.php*
// @include        http://127.0.0.1:*/account.php
// @include        http://kol.coldfront.net/thekolwiki/index.php/Cocktailcrafting_Discoveries*
// @include        http://kol.coldfront.net/thekolwiki/index.php/Cooking_Discoveries*
// @include        http://kol.coldfront.net/thekolwiki/index.php/Jewelry_Discoveries*
// @include        http://kol.coldfront.net/thekolwiki/index.php/Meat-Pasting_Discoveries*
// @include        http://kol.coldfront.net/thekolwiki/index.php/Meatsmithing_Discoveries*
// @include        http://kol.coldfront.net/thekolwiki/index.php/Miscellaneous_Discoveries*
// @version        3.85
// ==/UserScript==

//Version 3.85
// - sugar cubans
//Version 3.84
// - spring break beach stuff
//Version 3.83
// - V11 stuff
//Version 3.82
// - added lynrd stuff
//Version 3.81
// - add Sugar Scale Structures to miscellaneous
//Version 3.80
// - add Smiths-ing to cocktails, cooking, meatpasting, meatsmithing
// - add Weapons: Swords to meatpasting, Loathsome Smithery to meatsmithing
//Version 3.79
// - added tin-kering to miscellaneous
//Version 3.78
// - added cluster stuff to miscellanous, cooking, cocktails
//Version 3.77
// - added Aquatic Jewelry
// - added Sea Leatherworking
//Version 3.76
// - added Cosmic Potions to miscellaneous
// - added Papier-Mache to cooking
//Version 3.75
// - added Oil Rigging to miscellaneous
//Version 3.74
// - added 'tonstruction and Wax Wear to miscellaneous
//Version 3.73
// - added Papier Mache to miscellaneous
//Version 3.72
// - added Hot Daubery to miscellaneous
//Version 3.71
// - added category Confectionery to meatsmithing and cocktailcrafting
// - added Peppermints to meatpasting and miscellaneous
//Version 3.70
// - added category Confectionery to cooking
//Version 3.69
// - added categories: Confectionery to jewelry and meat-pasting, 
//   and Festive Crimbo Cocktails to cocktailcrafting.
//Version 3.68
// - added sticky paper and rough stuff category to meatpasting discoveries
//Version 3.674
// - fix suddenly re-broken Humpy Dumplings
//Version 3.673
// - added honey stuff
//Version 3.672
// - added knob cake
//Version 3.671
// - more Amazing Ideas
//Version 3.67
// - added new recipe sections from April 2011 IOTM
//Version 3.665
// - fix https/http issue in auto-update
//Version 3.66
// - fix weirdness with vial of jus de larmes, due to it's italicization
// - update shared account-menu tab code
//Version 3.65
// - incorporate Charon the Hand's code for a shared account menu tab
//Version 3.64
// - fix account menu so it works with the new account menu update
//Version 3.63
// - added an account menu entry to update recipe lists manually.
//Version 3.62
// - more robust when an auto-check fails or is incomplete
//Version 3.61
// - added Paperclip Paraphernalia
//Version 3.6
// - improved new discovery detection, based on md5 sums of the wiki table
//   text rather than last edit date of the page.
//Version 3.5
// - fix to work around kol's fuzzy matching system which would sometimes
//   cause the script to wrongly report info in the mouse-over text and
//   miscolour the item text after clicking on a missing recipe.
//Version 3.4
// - now checks and lets you know if wiki discovery pages (list of recipes)
//   has been updated so you can revisit it to refresh the recipes list.
//Version 3.3
// - sped up missing ingredient checking considerably and
//   it also retrieves the item counts, but only if you have
//   (ever) enabled chat (you do not need to be in chat).
//   Slower route is used when chat commands cannot be used.
//Version 3.2
// - added auto-update checking
//Version 3.1.1
// - updated Cooking recipe sections with Popsicles.
//Version 3.1
// - added ability to check inventory for ingredients of missing recipes.
//   Click on the item name and it looks through through your inventory, changing
//   the colour the item to either gray or black depending on whether you have
//   all the ingredients.  Mouseover text shows which ingredient is missing if
//   just one.
//Version 3.0.1
// - added Smoked Pottery to miscellaneous
//Version 3.0
// - added crafting links for missing recipes, which take you to the appropriate 
//   crafting page, with the selection boxes filled if you have the items.
// - script state is now persistent, with counts and any displayed missing recipes
//   not disappearing if you actually craft something.  
// - The "show missing" button is now a toggle instead of a one-time button, and
//   so can be applied by default as you switch discovery pages.
//Version 2.0
// - added gathering and display of missing recipes
//Version 1.3
// - add sub-counts for sections
//Version 1.2
// - add miscellaneous discoveries
//Version 1.1

var VERSION="3.85";

// current page title if at a kol discoveries page
var knownPage='';

var pageLinks={'Meat-Pasting Discoveries:':'craft.php?mode=combine',
               'Cocktailcrafting Discoveries:':'craft.php?mode=cocktail',
               'Meatsmithing Discoveries:':'craft.php?mode=smith',
               'Jewelry Discoveries:':'craft.php?mode=jewelry',
               'Cooking Discoveries:':'craft.php?mode=cook',
               'Miscellaneous Discoveries:':'craft.php?mode=discoveries'};

function doPage() {
    // find table root of area interested in
    var node,root;
    var listing = document.getElementsByTagName('b');
    for (var i=0;i<listing.length;i++) {
        var node = listing[i];
        if (node.firstChild && pageLinks[node.firstChild.data]) {
            root = node.parentNode;
            knownPage = node.firstChild.data; // ugh
            while (root && root.tagName!='TABLE')
                root = root.parentNode;
            break;
        }
    }
    if (root) {
        GM_setValue('missinga','');
        GM_setValue('missingb','');
        // count
        var count = document.evaluate('.//img[contains(@onclick,"descitem")]',root,null,
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength;
        node.firstChild.data = node.firstChild.data.substr(0,node.firstChild.data.length-1)+
            ' ('+count+' known):';
        addButton(node);
        addSubcounts(root);
        if (GM_getValue('showmissing',''))
            showMissing();
    } else {
        // direct crafting page?
        var a = document.getElementById('a');
        var b = document.getElementById('b');
        if (a && b) {
            var ma = GM_getValue('missinga');
            var mb = GM_getValue('missingb');
            if (ma) {
                selectOption(a,ma);
                selectOption(b,mb);
                GM_setValue('missinga','');
                GM_setValue('missingb','');
            }
        }
    }
}

function selectOption(sbox,txt) {
    for (var i=0;i<sbox.options.length;i++) {
        if (sbox.options[i].text.indexOf(txt)==0 &&
            sbox.options[i].text.replace(/\s*\([0-9]+\)\s*/,'')==txt) {
            sbox.selectedIndex = i;
            return;
        }
    }
}

function addButton(node) {
    var v = document.createElement('a');
    v.setAttribute('href','#');
    v.setAttribute('id','showmissingbutton');
    v.setAttribute('style','font-size:x-small;color:white;vertical-align:middle;');
    fixupButton(v);
    v.addEventListener('click',bHandler,false);
    var p = knownPage.replace(/:.*$/,'').replace(/ /g,'_');
    v.setAttribute('discoveries_page',p);
    node.parentNode.appendChild(document.createTextNode('\u00a0\u00a0\u00a0'));
    node.parentNode.appendChild(v);
    var ver = GM_getValue('newversion',VERSION);
    if (ver>VERSION) {
        node.parentNode.appendChild(document.createTextNode('\u00a0\u00a0\u00a0'));
        v = document.createElement('a');
        v.setAttribute('href','http://userscripts.org/scripts/source/35028.user.js');
        v.setAttribute('style','font-size:x-small;color:yellow;vertical-align:middle;');
        v.setAttribute('title','Version '+ver+' is available.  You have version '+VERSION);
        v.setAttribute('id','recipecountversionnotice');
        v.setAttribute('target','_blank');
        v.appendChild(document.createTextNode('New version of Recipe Counter!'));
        node.parentNode.appendChild(v);
    } else {
        v = document.getElementById('recipecountversionnotice');
        if (v) {
            v.parentNode.removeChild(v);
        }
    }

    if (GM_getValue(p+'_oldmd5',0)!=GM_getValue(p+'_newmd5',-1)) {
        node.parentNode.appendChild(document.createTextNode('\u00a0\u00a0\u00a0'));
        v = document.createElement('a');
        v.setAttribute('href','http://kol.coldfront.net/thekolwiki/index.php/'+p);
        v.setAttribute('style','font-size:x-small;color:yellow;vertical-align:middle;');
        v.setAttribute('title','Updated discoveries list detected!');
        v.setAttribute('id','recipecountdisoveriesnotice');
        v.setAttribute('target','_blank');
        v.appendChild(document.createTextNode('Click to update discoveries list'));
        node.parentNode.appendChild(v);
    } else {
        v = document.getElementById('recipecountdiscoveriesnotice');
        if (v) {
            v.parentNode.removeChild(v);
        }
    }
}

function fixupButton(v) {
    if (GM_getValue('showmissing','')) {
        v.setAttribute('title','Click to hide all missing recipes on this page.');
        if (v.firstChild)
            v.replaceChild(document.createTextNode('[Hide Missing]'),v.firstChild);
        else
            v.appendChild(document.createTextNode('[Hide Missing]'));
    } else {
        v.setAttribute('title','Click to display all missing recipes on this page.');
        if (v.firstChild)
            v.replaceChild(document.createTextNode('[Show Missing]'),v.firstChild);
        else
            v.appendChild(document.createTextNode('[Show Missing]'));
    }
}

function showMissing() {
    var v = document.getElementById('showmissingbutton');
    if (GM_getValue('showmissing','')) {
        if (!missing()) {
            var page = v.getAttribute('discoveries_page');
            var pages = page.replace(/_/g,' ');
            var goWiki = document.createElement('a');
            goWiki.setAttribute('title','Click to go to the full list of '+pages+' recipes on the KoL wiki.');
            goWiki.setAttribute('target','_blank');
            goWiki.setAttribute('style','font-size:x-small;color:white;vertical-align:middle;');
            goWiki.setAttribute('href','http://kol.coldfront.net/thekolwiki/index.php/'+page);
            goWiki.appendChild(document.createTextNode('[Load all '+pages+']'));
            v.parentNode.appendChild(goWiki);
        }
    } else {
        var xx = document.getElementsByClassName('showmissingaddition');
        for (var i=xx.length-1;i>=0;i--) {
            var x = xx[i];
            x.parentNode.removeChild(x);
        }
    }
    fixupButton(v);
}

function bHandler(e) {
    var b = GM_getValue('showmissing','');
    GM_setValue('showmissing', (b ? '' : 'true'));
    showMissing();
}

function addSubcounts(root) {
    var tbls = document.evaluate( './/table', root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=tbls.snapshotLength-1;i>=0;i--) {
        var tbl = tbls.snapshotItem(i);
        var id = tbl.getAttribute('id');
        if (id && id.indexOf('table_')==0) {
            // found one

            var count=0;
            var listing = tbl.getElementsByTagName('img');
            for (var j=0;j<listing.length;j++) {
                var imgnode = listing[j];
                var click;
                if (click=imgnode.getAttribute('onclick')) {
                    if (click.indexOf('descitem')==0) {
                        count++;
                    }
                }
            }

            // count the images
            if (tbl.previousSibling) {
                var hdr = tbl.previousSibling.previousSibling;
                if (hdr && hdr.tagName=='CENTER' && hdr.firstChild) {
                    var f = document.createElement('font');
                    f.setAttribute('style','font-size:x-small;');
                    f.appendChild(document.createTextNode('  ('+count+' recipe'+((count==1)? '' : 's')+')'));
                    hdr.firstChild.appendChild(f);
                }
            }
        }
    }
}

var rlists = [{title:'Cocktailcrafting Discoveries',
               sections:['Amazing Ideas','Confectionery','Clustercocktails','Distillations','Evil Fruity Girl Drinks',
                         'Eww','Extra-Fruity Girl Drinks',
                         'Fancy Garnishes','Festive Crimbo Cocktails','Fruity Girl Drinks','Hilarious Jokes','Infused Wines',
                         'Miscellaneous','Mushroom Wines','Premium Cocktails','Schnapps',
                         'Simple Cocktails','Smiths-ing','Specialty Beers','Tiny Plastic Sword Drinks',
                         'Underwater Cocktails']},
              {title:'Cooking Discoveries',
               sections:['Advanced Sauceror Potions','Amazing Ideas','Brownies','Casseroles','Clusterbaking','Confectionery',
                         'Confections','Dirty Exploits','Evil Noodle Dishes','Evil Sauceror Potions','Familiar',
                         'High-Pressure Potions','Kabobs','Key Limes','Miscellaneous',
                         'Nemesis Quest Slimes','Noodle Dishes','Papier-Mache', 'Pies','Pizzas','Popsicles','Pork Gem Potions',
                         'Quest Items','Sauceror Potions','Secret Sauces','Smiths-ing','Stir-Fries','Tempura','Tex-Mex',
                         'Tex-Mex-Italian','Transmutations']},
              {title:'Jewelry Discoveries',
               sections:['Amazing Ideas','Aquatic Jewelry','Confectionery','Elemental Jewelry','Expensive Pork Elf Jewelry','Miscellaneous',
                         'Pork Elf Jewelry','Rainbow Pearl Jewelry','Vampire Pearl Jewelry']},
              {title:'Meat-Pasting Discoveries',
               sections:['Amazing Ideas','Campground Items','Clusterbombs','Confectionery','Decoys','Familiars','Gear','Genetic Engineering',
                         'Miscellaneous','Parts','Parts for Campground Items','Parts for Familiars','Peppermints',
                         'Primordial Soup','Quest Items','Rough Stuff','Smiths-ing','Usable Items','Weapons: Swords']},
              {title:'Meatsmithing Discoveries',
               sections:['Armor: Accessories','Armor: Advanced Accessories','Armor: Advanced Hats',
                         'Armor: Advanced Pants','Armor: Advanced Shields', 'Armor: Advanced Shirts', 'Armor: Hats',
                         'Armor: Pants','Armor: Shields','Armor: Shirts','Campground Items', 'Confectionery','Depleted Grimacite', 'Gear', 
                         'Ingredients','Loathsome Smithery','Quest Weapons','Sea Leatherworking','Slimy Things','Smiths-ing','Weapons: Advanced Crossbows',
                         'Weapons: Advanced Staves','Weapons: Advanced Swords','Weapons: Clubs',
                         'Weapons: Crossbows','Weapons: Miscellaneous','Weapons: Staves',
                         'Weapons: Swords','Weapons: Utensils','Weapons: Whips']},
              {title:'Miscellaneous Discoveries',
               sections:["'tonstruction",'BRICKO Beasts','BRICKO Bits','Balloon Bendings','Clingfilm Creations',
                         'Cold Comforts','Cosmic Potions','Duct Tape Designs','Honey Stuff','Hot Daubery','Mummy Wrapping Manufacturings',
                         'Oil Rigging','Palm-Frond Preparations','Paperclip Paraphernalia','Papier-Mache','Peppermints','Smoked Pottery',
                         'Snailmail Structures','Spooky Bark Surprises','Sugar Cubans','Sugar Scale Structures','Tin-kering',
                         'Turtlemail Treasures','Wax Wear','Wumpus Hair Weavings']}];

// locate all missing recipes
function missing() {
    var s = knownPage;
    //GM_log('knownPage='+s);
    if (!s) {
        return;
    }
    for (var i=0;i<rlists.length;i++) {
        if (s.indexOf(rlists[i].title)>=0) {
            var r = missingInPage(retrieveCopy(rlists[i].title));
            if (!r)
                return false;
            insertMissing(r);
            return true;
        }
    }
}

// set by missingInPage and used by insertMissing
var secMap = {};

// uses the secMap and the given list of missing recipes to create fake versions
function insertMissing(r) {
    for (var s in r) {
        var tbl = secMap[s];
        var lastr = null;
        if (tbl && tbl.rows.length>0 && tbl.rows[tbl.rows.length-1].cells.length<3) {
            lastr = tbl.rows[tbl.rows.length-1];
        }
        for (var e in r[s]) {
            if (r[s][e]) {
                for (var j=0;j<r[s][e].length;j++) {
                    if (lastr) {
                        createMissing(lastr,e,r[s][e][j]);
                        lastr = null;
                    } else {
                        // TBD: what if tbl is null?
                        if (!tbl) {
                            if (secMap['last_table']) {
                                tbl = insertMissingTable(secMap['last_table'].nextSibling,s);
                            } else {
                                var root = document.evaluate( '//td[contains(text(),"You haven\'t made any discoveries in this field yet")]/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
                                tbl = insertMissingTable(root.singleNodeValue.nextSibling,s);
                            }
                            secMap[s] = tbl;
                        }
                        lastr = tbl.insertRow(-1);
                        lastr.setAttribute('class','showmissingaddition');
                        createMissing(lastr,e,r[s][e][j]);
                    }
//                  GM_log('missing in '+s+': '+e+' = '+r[s][e][j]);
                }
            }
        }
    }
    
}

// creates a table for a section s
function insertMissingTable(root,s) {
    var c = document.createElement('center');
    var tbl = document.createElement('table');
    var b = document.createElement('b');
    var br1 = document.createElement('br');
    var br2 = document.createElement('br');
    c.setAttribute('class','showmissingaddition');
    tbl.setAttribute('class','showmissingaddition');
    br1.setAttribute('class','showmissingaddition');
    br2.setAttribute('class','showmissingaddition');
    b.innerHTML = s;
    b.setAttribute('style','color:red;');
    c.appendChild(b);
    root.parentNode.insertBefore(br1,root);
    root.parentNode.insertBefore(c,root);
    root.parentNode.insertBefore(br2,root);
    root.parentNode.insertBefore(tbl,root);
    return tbl;
}


// locate missing recipes in the current kol discoveries page, given a list of recipes
function missingInPage(r) {
    if (!r) {
        alert('You need to visit the KoL Wiki discoveries pages (http://kol.coldfront.net/thekolwiki/index.php/Discoveries) to initialize the recipe list.  Visit each of the 6 pages of Recipes on the wiki, then re-open a recipe page in the game and try again.');
        return;
    }
    secMap = {};
    var tbls = document.evaluate( '//table', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=0;i<tbls.snapshotLength;i++) {
        var tbl = tbls.snapshotItem(i);
        var id = (tbl) ? tbl.getAttribute('id') : null;
        if (id && id.indexOf('table_')==0) {
            // found one
            // figure out which section this represents
            var sec = tbl.previousSibling;
            while (sec && sec.tagName!='CENTER')
                sec = sec.previousSibling;
            if (sec) {
                sec = sec.firstChild.firstChild.innerHTML;
            }
            var es = document.evaluate( './/td', tbl, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            for (var j=0;j<es.snapshotLength;j+=2) {
                var e = es.snapshotItem(j);
                var f = es.snapshotItem(j+1);
                var item = (f.firstChild.firstChild.nodeType==3) ? f.firstChild.firstChild.data : f.firstChild.firstChild.innerHTML;
                if (!item) continue;
                var itemr = f.firstChild.nextSibling;
                if (itemr.tagName!='FONT') itemr = itemr.nextSibling;
                var components = '';
                for (var k=0;k<itemr.childNodes.length;k++) {
                    if (itemr.childNodes[k].nodeType==3) {
                        components += itemr.childNodes[k].data;
                    } else if (itemr.childNodes[k].tagName=='I') {
                        components += '<i>'+itemr.childNodes[k].innerHTML+'</i>';
                    }
                }
                components = components.replace(/\([0-9]+\)/g,'').replace(/\+[\s]*$/,'').replace(/  /g,' ').replace(/\s\s+/,' ').replace(/ *$/,'').replace(/^ */,'');
                
                // check that we have a section
                if (sec) {
                    if (r && r[sec] && r[sec][item]) {
                        var hi = hasRecipe(r[sec][item],components);
                        if (hi>=0) {
                            r[sec][item].splice(hi,1);
                        }
                    }
                } else if (r) {
                    for (var s in r) {
                        if (r[s][item]) {
                            var hi = hasRecipe(r[s][item],components);
                            if (hi>=0) {
                                r[s][item].splice(hi,1);
                                sec = s;
                                break;
                            }
                        }
                    }
                }
            }
            secMap[sec] = tbl; // store for later
            secMap['last_table'] = tbl;
        }
    }
    return r;
}

// check the given list for a recipe combination, and return the index or -1
function hasRecipe(clist,c) {
    if (!clist)
        return -1;
    var c2 = c.match(/(^[^+]*)\+(.*$)/);
    if (c2) {
        c2 = c2[2] +' + '+c2[1];
        c2 = c2.replace(/\+[\s]*$/,'').replace(/  /g,' ').replace(/ *$/,'').replace(/^ */,'');
    }
    for (var i=0;i<clist.length;i++) {
        if (clist[i] == c || (c2 && clist[i] == c2)) {
            return i;
        }
    }
    return -1;
}

// creates a new entry for a missing title+components, and
// attaches the resulting td's to the given tr
function createMissing(tr,title,components) {
    var td1 = tr.insertCell(-1);
    var td2 = tr.insertCell(-1);
    td1.setAttribute('class','showmissingaddition');
    td2.setAttribute('class','showmissingaddition');
    td1.setAttribute('valign','center');
    td2.setAttribute('valign','top');
    var i = document.createElement('img');
    i.setAttribute('class','hand');
    i.setAttribute('src','http://images.kingdomofloathing.com/itemimages/confused.gif');
    td1.appendChild(i);
    var b = document.createElement('b');
    b.setAttribute('style','color:red;');
    b.innerHTML = title;
    td2.appendChild(b);
    var f = document.createElement('font');
    f.setAttribute('size','1');
    f.setAttribute('color','red');

    if (knownPage!='Miscellaneous Discoveries:') {
        var f2 = document.createElement('font');
        f2.setAttribute('size','2');
        f2.setAttribute('color','red');
        var ia = document.createElement('a');
        ia.appendChild(document.createTextNode('make?'));
        ia.setAttribute('title','Click to go the crafting page for this missing recipe');
        ia.setAttribute('href','#');
        ia.setAttribute('missinga',components.replace(/\s*\+.*/,''));
        ia.setAttribute('missingb',((components.indexOf('+')>0) ? components.replace(/[^+]*\+\s*/,'') : ''));
        ia.addEventListener('click',missingButtonHandler,false);
        f2.appendChild(document.createTextNode('\u00A0['));
        f2.appendChild(ia);
        f2.appendChild(document.createTextNode(']'));
        f.appendChild(f2);

        b.setAttribute('missinga',components.replace(/\s*\+.*/,''));
        b.setAttribute('missingb',((components.indexOf('+')>0) ? components.replace(/[^+]*\+\s*/,'') : ''));
        b.setAttribute('title','click to check for ingredients');
        b.addEventListener('click',checkIngredientsHandler,false);
    }
    f.appendChild(document.createElement('br'));
    f.appendChild(document.createTextNode(components));
    td2.appendChild(f);
}

function missingButtonHandler() {
    GM_setValue('missinga',this.getAttribute('missinga').replace(/<[^>]+>/g,''));
    GM_setValue('missingb',this.getAttribute('missingb').replace(/<[^>]+>/g,''));
    window.location.href = pageLinks[knownPage];
}

// return a new copy of the master recipes 
function retrieveCopy(page) {
    var r = JSON.parse(GM_getValue('recipes','{}'));
    return r[page];
}

// scrape data from a kol wiki page
function gather(m5) {
    var recipes = JSON.parse(GM_getValue('recipes','{}'));

    var s = window.location.pathname.replace(/_/g,' ');
//  GM_log('Gathering...'+s);
    for (var i=0;i<rlists.length;i++) {
        if (s.indexOf(rlists[i].title)>=0) {
            gatherRecipes(rlists[i],recipes);
            var p = rlists[i].title.replace(/:.*$/,'').replace(/ /g,'_');
            GM_setValue(p+'_oldmd5',m5);
            GM_setValue(p+'_newmd5',m5);
        }
    }
    GM_setValue('recipes',JSON.stringify(recipes));
}

// scrape data from a specific kol wiki page
function gatherRecipes(rlist,recipes) {
    var s = {};
    for (var i=0;i<rlist.sections.length;i++) {
        var r = gatherRecipesSection(rlist.sections[i]);
        s[rlist.sections[i]] = r;
        
    }
    recipes[rlist.title] = s;
    // var p = rlist.title.replace(/:.*$/,'').replace(/ /g,'_')+'_last';
    // GM_setValue(p,(new Date()).toUTCString());
    //GM_log('setting '+p+' to '+GM_getValue(p));
}

// scrapte data for the given section of a kol wiki page
function gatherRecipesSection(section) {
    var r = {};
    var sec = document.evaluate( '//span[@class="mw-headline"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //var sec = document.evaluate( '//span[text()="'+section+'"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//  GM_log('gathering for section '+section);
    var rx = new RegExp('','');
    for (var j=0;j<sec.snapshotLength;j++) {
        var sn = sec.snapshotItem(j).innerHTML;
        if (sn.replace(/^ */,'').replace(/ *$/,'')==section) {
            var hp = sec.snapshotItem(j).parentNode;
            if (hp && hp.tagName=='H2') {
                hp = hp.nextSibling.nextSibling;
                while (hp && hp.tagName!='H2') {
                    var i;
                    var tbls = document.evaluate( './/td', hp, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
                    for (i=0;i<tbls.snapshotLength-1;i+=2) {
                        var e = tbls.snapshotItem(i);
                        
                        var f = tbls.snapshotItem(i+1);
                        var n = f.firstChild.firstChild.innerHTML;
                        var c = '';
                        for (var k=0;k<f.firstChild.nextSibling.nextSibling.childNodes.length;k++) {
                            var s = f.firstChild.nextSibling.nextSibling.childNodes[k];
                            if (s.innerHTML)
                                c += s.innerHTML;
                            else if (s.nodeType==3)
                                c += s.data;
                            else if (c)
                                c += ' + ';
                        }
                        c = c.replace(/\+[\s]*$/,'').replace(/  /g,' ').replace(/ *$/,'').replace(/^ */,'');
                        if (c) {
//                          GM_log('found recipe for '+n+', consisting of: '+c);
                            if (r[n]) r[n][r[n].length] = c;
                            else r[n] = [c];
                        }
                    }
                    if (i>0) 
                        return r;
                    hp = hp.nextSibling;
                }
            }
        }
    }
    return r;
}

// called when the confused image is clicked on.
function checkIngredientsHandler(e) {
    this.removeEventListener('click',checkIngredientsHandler,false);
    checkIngredientsFast(this,this.getAttribute('missinga'),this.getAttribute('missingb'));
}

// utility function, stolen from other scripts
function GM_get(dest, callback)
{   GM_xmlhttpRequest({
      method: 'GET',
      url: dest,
        //onerror:function(error) { GM_log("GM_get Error: " + error); },
        onload:function(details) {
            if( typeof(callback)=='function' ){
                callback(details.responseText);
}   }   }); }

// if chat not enabled use the slow route
function checkIngredientsSlow(item,ing1,ing2) {
    //item.setAttribute('style','color:pink;');
    //item.setAttribute('title','checking...');
    var r1b = false;
    var r2b = false;
    GM_get('http://'+window.location.host+'/inventory.php?which=1',function(response){
        if(response!=''){
            var r1 = new RegExp('<b[^>]*>'+ing1+'</b>','gm');
            var r2 = new RegExp('<b[^>]*>'+ing2+'</b>','gm');
            if (!r1b) r1b = r1.test(response);
            if (!r2b) r2b = r2.test(response);
            if (r1b && r2b) {
                item.setAttribute('style','color:black;');
                item.addEventListener('click',checkIngredientsHandler,false);
                item.setAttribute('title','Ingredients found in inventory at last check.  Click to check again.');
            } else {
                GM_get('http://'+window.location.host+'/inventory.php?which=2',function(response){
                        if(response!=''){
                            if (!r1b) r1b = r1.test(response);
                            if (!r2b) r2b = r2.test(response);
                            if (r1b && r2b) {
                                item.setAttribute('style','color:black;');
                                item.addEventListener('click',checkIngredientsHandler,false);
                                item.setAttribute('title','Ingredients found in inventory at last check.  Click to check again.');
                            } else {
                                GM_get('http://'+window.location.host+'/inventory.php?which=3',function(response){
                                        if(response!=''){
                                            if (!r1b) r1b = r1.test(response);
                                            if (!r2b) r2b = r2.test(response);
                                            if (r1b && r2b) {
                                                item.setAttribute('style','color:black;');
                                                item.setAttribute('title','Ingredients found in inventory at last check.  Click to check again.');
                                            } else {
                                                item.setAttribute('style','color:gray;');
                                                if (r1b) 
                                                    item.setAttribute('title','Ingredient '+ing2+' not found in inventory. Click to check again.');
                                                else if (r2b) 
                                                    item.setAttribute('title','Ingredient '+ing1+' not found in inventory. Click to check again.');
                                                else 
                                                    item.setAttribute('title','Ingredients not found in inventory. Click to check again.');
                                            }
                                            item.addEventListener('click',checkIngredientsHandler,false);
                                        }});
                            }
                        }});
            }
        }});
}

// faster checking but requires chat is enabled
function checkIngredientsFast(item,ing1,ing2) {
    item.setAttribute('style','color:pink;');
    item.setAttribute('title','checking...');
    if (ing1.match(/<[^>]+>/) || ing2.match(/<[^>]+>/))
        return checkIngredientsSlow(item,ing1,ing2);
    var pd = findPwdhash();
    if (!pd) {
        GM_log('cound not find pwd or playerid');
        return;
    }
    //GM_log('pwd='+pd.pwd);
    //GM_log('pid='+pd.pid);
    GM_get('http://'+window.location.host+'/submitnewchat.php?playerid='+pd.pid+'&pwd='+pd.pwd+'&graf=/count '+encodeURI(ing1),
           function(response) {
               if(response!='') {
                   //GM_log('response: '+response);
                   var r1 = response.match(/(<[^>]*>)*You have ([0-9]*) ([^<]*)\./);
                   GM_get('http://'+window.location.host+'/submitnewchat.php?playerid='+pd.pid+'&pwd='+pd.pwd+'&graf=/count '+encodeURI(ing2),
                          function(response) {
                              if(response!='') {
                                  var r2 = response.match(/(<[^>]*>)*You have ([0-9]*) ([^<]*)\./);
                                  if (r1 && r2) {
                                      verifyItems(item,ing1,ing2,pd,r1,r2);
                                  } else {
                                      setItemState(item,r1,r2,ing1,ing2);
                                  }
                              }});
               } else {
                   checkIngredientsSlow(item,ing1,ing2);
               }});
}

function setItemState(item,r1,r2,ing1,ing2) {
    if (r1 && r2) {
        item.setAttribute('style','color:black;');
        item.setAttribute('title','Found '+r1[2]+' '+r1[3]+' and '+r2[2]+' '+r2[3]+' at last check.  Click to check again.');
    } else {
        item.setAttribute('style','color:gray;');
        if (r1) 
            item.setAttribute('title','Found '+r1[2]+' '+r1[3]+' but no '+ing2+' in your inventory. Click to check again.');
        else if (r2) 
            item.setAttribute('title','Found '+r2[2]+' '+r2[3]+' but no '+ing1+' in your inventory. Click to check again.');
        else 
            item.setAttribute('title','Neither ingredient is in your inventory. Click to check again.');
    }
    item.addEventListener('click',checkIngredientsHandler,false);
}

function verifyItems(item,ing1,ing2,pd,r1,r2) {
    GM_get('http://'+window.location.host+'/submitnewchat.php?playerid='+pd.pid+'&pwd='+pd.pwd+'&graf=/examine '+encodeURI(ing1),
           function(response) {
               var r3 = response.match(/^<[^>]*>Examining: ([^<]*)/);
               if (r3) r3 = (r3[1]==ing1) ? r3 : null;
               GM_get('http://'+window.location.host+'/submitnewchat.php?playerid='+pd.pid+'&pwd='+pd.pwd+'&graf=/examine '+encodeURI(ing2),
                      function(response) {
                          var r4 = response.match(/^<[^>]*>Examining: ([^<]*)/);
                          if (r4) r4 = (r4[1]==ing2) ? r4 : null;
                          setItemState(item,(r3) ? r1 : null,(r4) ? r2 : null,ing1,ing2);
                      });
           });
}

// auto-update check. (Some code adapted from ALLCOLOR.user.js)
function checkVersion() {
    var lastUpdateCheck = GM_getValue('lastUpdateCheck','NEVER');
    var curTime = new Date().getTime();
    if ((lastUpdateCheck == 'NEVER') || (parseInt(lastUpdateCheck) < (curTime - 345600000))) { // every 4 days
        GM_setValue('lastUpdateCheck',''+curTime);
        GM_get('http://userscripts.org/scripts/source/35028.meta.js',
               function(responseText) {
                   var v = responseText.match(/@version\s*([0-9.]+)/);
                   if (v) {
                       //GM_log('found version: '+v[1]);
                       GM_setValue('newversion',v[1]); 
                   }
               });
        checkDiscoveries();
    }
}

function checkDiscoveries() {
    for (p in pageLinks) {
        var purl = p.replace(/:.*$/,'').replace(/ /g,'_');
        GM_xmlhttpRequest({
                method: 'GET',
                    url: 'http://kol.coldfront.net/thekolwiki/index.php/'+purl,
                    onload: function(details) {
                    var q = this.url.replace(/[^/]*\//g,'');
                    if (details.responseText) {
                        var mdf = getPageMD5(details.responseText);
                        //GM_log('new md5 for '+q+': '+mdf);
                        GM_setValue(q+'_newmd5',mdf);
                    } 
                }
            });
    }
}

function getPageMD5(raw) {
    var text = '';
    var j,i = raw.indexOf('<table>');
    while(raw && i>=0) {
        raw = raw.substr(i+7);
        j = raw.indexOf('</table>');
        if (j<0)
            break; // bad parse?
        text = text + raw.substr(0,j);
        raw = raw.substr(j);
        i = raw.indexOf('<table>');
    }
    text = text.replace(/<[^>]*>/g,'');
    text = text.replace(/[\s\n]+/g,'');
    var m = MD5(text);
    //GM_log('md5 of '+text);
    return m;
}

function findPwdhash() {
    var somef=window.parent.frames;
    var goo = null;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane") {
            goo=somef[j];
            var page = goo.document.documentElement.innerHTML;
            var pwdh = page.match(/pwdhash\s*=\s*\"([a-f0-9]+)\"/);
            if (pwdh) {
                var plid = page.match(/playerid\s*=\s*([a-f0-9]+)/);
                if (plid) {
                    return {pwd:pwdh[1],pid:plid[1]};
                }
            }
        }
    }
}


/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/
 
var MD5 = function (string) {
 
    function RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
 
    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
 
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
 
    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };
 
    function WordToHex(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };
 
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
 
        for (var n = 0; n < string.length; n++) {
 
            var c = string.charCodeAt(n);
 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
 
        return utftext;
    };
 
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
 
    string = Utf8Encode(string);
 
    x = ConvertToWordArray(string);
 
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }
 
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
    return temp.toLowerCase();
}

// --------------------------------------------
// ---------- account menu option -------------
// --------------------------------------------


// Charon's code
function buildPrefs() {
    if (!document.querySelector('#privacy'))
        return;
    if (!document.querySelector('#scripts')) {
        //scripts tab is not built, do it here
        var scripts = document.querySelector('ul').appendChild(document.createElement('li'));
        scripts.id = 'scripts';
        var a = scripts.appendChild(document.createElement('a'));
        a.href = '#';
        var img = a.appendChild(document.createElement('img'));
        img.src = 'http://images.kingdomofloathing.com/itemimages/cmonkey1.gif';
        img.align = 'absmiddle';
        img.border = '0';
        img.style.paddingRight = '10px';
        a.appendChild(document.createTextNode('Scripts'));
        a.addEventListener('click', function (e) {
                //make our new tab active when clicked, clear out the #guts div and add our settings to it
                e.stopPropagation();
                document.querySelector('.active').className = '';
                document.querySelector('#scripts').className = 'active';
                document.querySelector('#guts').innerHTML = '<div class="scaffold"></div>';
                document.querySelector('#guts').appendChild(getSettings());
            }, false);
    } else {
        //script tab already exists
         document.querySelector('#scripts').firstChild.addEventListener('click', function (e) {
                //some other script is doing the activation work, just add our settings
                e.stopPropagation();
                document.querySelector('#guts').appendChild(getSettings());
            }, false);
    }
}

function getSettings() {
    //build our settings and return them for appending
    var contents = document.createElement('div');
    contents.id = 'recipecounterprefs';
    var fieldset = contents.appendChild(document.createElement('fieldset'));
    fieldset.setAttribute('style', 'width:33%; margin-top:20px');
    var legend = fieldset.appendChild(document.createElement('legend'));
    legend.className = 'subhead';
    legend.textContent = 'Recipe Counter';
    var section = fieldset.appendChild(document.createElement('div'));
    section.className = 'indent';
    section.appendChild(buildSettings());
    return contents;
}

function buildSettings() {
    //var ul = document.createElement('ul');
    //var li = document.createElement('li');
    var ar = document.createElement('a');
    ar.setAttribute('href','#');
    ar.appendChild(document.createTextNode('Update all recipe lists'));
    ar.addEventListener('click',openAll,false);
    ar.setAttribute('title','Note that this opens up 6 new windows.');
    //li.appendChild(ar);
    //ul.appendChild(li);
    return ar;
}

function openAll() {
    window.open('http://kol.coldfront.net/thekolwiki/index.php/Cocktailcrafting_Discoveries','Cocktailcrafting Discoveries');
    window.open('http://kol.coldfront.net/thekolwiki/index.php/Cooking_Discoveries','Cooking Discoveries');
    window.open('http://kol.coldfront.net/thekolwiki/index.php/Jewelry_Discoveries','Jewelry Discoveries');
    window.open('http://kol.coldfront.net/thekolwiki/index.php/Meat-Pasting_Discoveries','Meat-Pasting Discoveries');
    window.open('http://kol.coldfront.net/thekolwiki/index.php/Meatsmithing_Discoveries','Meatsmithing Discoveries');
    window.open('http://kol.coldfront.net/thekolwiki/index.php/Miscellaneous_Discoveries','Miscellaneous Discoveries');
}

if (window.location.href.indexOf('http://kol.coldfront.net/thekolwiki/index.php/')>=0) {    
    gather(getPageMD5(document.body.innerHTML));
} else if (window.location.pathname.indexOf('/account.php')==0) {
    buildPrefs();
} else {
    //checkDiscoveries();
    checkVersion();
    doPage();
}
