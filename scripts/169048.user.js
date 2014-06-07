// ==UserScript==
// @name        BGG BSG Chracter Image Selector
// @namespace   bgg_bsg_character_image_selector
// @include     http://boardgamegeek.com/article/*
// @include     http://boardgamegeek.com/thread/*
// @version     1.5
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var $ = unsafeWindow.$;
var Elements = unsafeWindow.Elements;
var Element = unsafeWindow.Element;
var Cookie = unsafeWindow.Cookie;

var form_wait_counter = 0; 

var docu = unsafeWindow.document;

var oldFunction = unsafeWindow.QuickReply;
unsafeWindow.QuickReply = function(a, b, c) {
  // set timeout to detect the form
  // if it doesnt show up after 10 seconds, give up
  setTimeout(addBSG, 500);
  return oldFunction(a, b, c);
};

function addBSG(){
    // check for the reply form
    if ($("articleform")){
        // get the stored character selection from a cookie if set
        var selectedChar = Cookie.read("bgg_bsg_character_selected");
        
        //alert(selectedChar);
        // add a nice form to select character and images
        var node = $("body").getParent();
        var newNode = new Element("p");
        newNode.inject(node, "top");
        var elem = Elements.from('<select id="bsg_character_select" name=""></select>');
        elem.addEvent('change',populateBSGImageList);
        for(var c = 0; c < bgg_bsg_characters.length; c++){
            var character = bgg_bsg_characters[c];
            if (selectedChar && (selectedChar.toString() == c.toString()) ){
                elem.adopt(Elements.from('<option selected="selected" value="'+c+'">'+character.name+'</option>'));
            }else {
                elem.adopt(Elements.from('<option value="'+c+'">'+character.name+'</option>'));
            }
        }

        newNode.adopt(elem);
        var elem = Elements.from('<select id="bsg_image_select" name=""></select>');
        elem.addEvent('change',saveBSGImageSelection);
        newNode.adopt(elem);
        var elem = Elements.from('<button type="button" onclick="insertBSGGeekImage()">Insert Image</button>');
        newNode.adopt(elem);
        
        var elem = Elements.from('<span> Skill Names: <button type="button" onclick="insertBSGSkillName(\'po\')"> Po </button></span>');
        newNode.adopt(elem);
        
        var elem = Elements.from('<button type="button" onclick="insertBSGSkillName(\'le\')"> Le </button>');
        newNode.adopt(elem);
        
        var elem = Elements.from('<button type="button" onclick="insertBSGSkillName(\'ta\')"> Ta </button>');
        newNode.adopt(elem);
        
        var elem = Elements.from('<button type="button" onclick="insertBSGSkillName(\'pi\')"> Pi </button>');
        newNode.adopt(elem);
        
        var elem = Elements.from('<button type="button" onclick="insertBSGSkillName(\'en\')"> En </button>');
        newNode.adopt(elem);
        
        var elem = Elements.from('<button type="button" onclick="insertBSGSkillName(\'tr\')"> Tr </button>');
        newNode.adopt(elem);
        
        
        populateBSGImageList();
    }else {
        form_wait_counter++;
        if (form_wait_counter < 5){
            setTimeout(addBSG, 500);
        }
    }    
}

function insertBSGSkillName(skill){
    var text = '';
    var color = '#0033CC';
    if (skill == "po"){
        text = 'Politics';
        color = 'ORANGE';
    }else if (skill == "le"){
        text = 'Leadership';
        color = '#009966';
    }else if (skill == "ta"){
        text = 'Tactics';
        color = 'PURPLE';
    }else if (skill == "pi"){
        text = 'Piloting';
        color = 'RED';
    }else if (skill == "en"){
        text == 'Engineeering';
        color = '0033CC';
    }else if (skill == "tr"){
        text = 'Treachery';
        color = 'BROWN';
    }
    unsafeWindow.emoticon(document.MESSAGEFORM.body,'[COLOR='+color+']'+text+'[/COLOR]')
}
unsafeWindow.insertBSGSkillName = insertBSGSkillName;

function saveBSGImageSelection(){
    var imageList = $("bsg_image_select");
    var value = imageList.getSelected().get("value");
    var myCookie = Cookie.write("bgg_bsg_image_selected", value, {'duration':120});
}
unsafeWindow.saveBSGImageSelection = saveBSGImageSelection;

function populateBSGImageList(){
    // update the list of possible images on load and when a character is selected
    var selectedImage = Cookie.read("bgg_bsg_image_selected");

    var charList = $("bsg_character_select");
    var value = charList.getSelected().get("value");
    var imageList = $("bsg_image_select");
    imageList.empty();
    var char = bgg_bsg_characters[value].banners;
    for(var c = 0; c < char.length; c++){
        var image = char[c];
        if (selectedImage && (selectedImage.toString() == image.id ) ){
            imageList.adopt(Elements.from('<option selected="selected" value="'+image.id+'">'+image.title+'</option>'));
        }else {
            imageList.adopt(Elements.from('<option value="'+image.id+'">'+image.title+'</option>'));
        }
        //imageList.adopt(Elements.from('<option value="'+image.id+'">'+image.title+'</option>'));
    }
    
    var myCookie = Cookie.write("bgg_bsg_character_selected", value, {'duration':120});
}
unsafeWindow.populateBSGImageList = populateBSGImageList;
// insert the image tag into the text box. uses the BGG code that inserts emoticons.
unsafeWindow.insertBSGGeekImage = function (){
    var imageList = $("bsg_image_select");
    var value = imageList.getSelected().get("value");
    //$('body').adopt(Elements.from());
    //alert(value);
    unsafeWindow.emoticon(document.MESSAGEFORM.body,'[ImageID='+value+' medium]')
}


// big array of characters and their images
// currently just supports banners
// could also support other types of images, just takes time to get the ids and add them
var bgg_bsg_characters = [
    {
    'name': 'Adama',
    'banners' : [
        {'title': 'Standard', 'id':'544211'},
        {'title': 'CAG', 'id':'1263088'},
        {'title': 'Admiral', 'id':'1263070'},
        {'title': 'President', 'id':'1263106'},
        {'title': 'Cylon', 'id':'551658'}
    ]
    },
    {
    'name': 'Apollo',
    'banners' : [
        {'title': 'Standard', 'id':'544204'},
        {'title': 'CAG', 'id':'1263090'},
        {'title': 'Admiral', 'id':'1263072'},
        {'title': 'President', 'id':'1263108'},
        {'title': 'Cylon', 'id':'551665'}
    ]
    },
    {
    'name': 'Baltar',
    'banners' : [
        {'title': 'Standard', 'id':'544202'},
        {'title': 'CAG', 'id':'1263091'},
        {'title': 'Admiral', 'id':'1263073'},
        {'title': 'President', 'id':'1263109'},
        {'title': 'Cylon', 'id':'551652'}
    ]
    },
    
    {
    'name': 'Boomer',
    'banners' : [
        {'title': 'Standard', 'id':'544206'},
        {'title': 'CAG', 'id':'1263092'},
        {'title': 'Admiral', 'id':'1263074'},
        {'title': 'President', 'id':'1263110'},
        {'title': 'Cylon', 'id':'551655'}
    ]
    },
    
    {
    'name': 'Chief',
    'banners' : [
        {'title': 'Standard', 'id':'544210'},
        {'title': 'CAG', 'id':'1263095'},
        {'title': 'Admiral', 'id':'1263077'},
        {'title': 'President', 'id':'1263113'},
        {'title': 'Cylon', 'id':'551664'}
    ]
    },
    
    {
    'name': 'Helo',
    'banners' : [
        {'title': 'Standard', 'id':'544207'},
        {'title': 'CAG', 'id':'1263099'},
        {'title': 'Admiral', 'id':'1263081'},
        {'title': 'President', 'id':'1263117'},
        {'title': 'Cylon', 'id':'551660'}
    ]
    },
    
    {
    'name': 'Roslin',
    'banners' : [
        {'title': 'Standard', 'id':'544209'},
        {'title': 'CAG', 'id':'1263101'},
        {'title': 'Admiral', 'id':'1263083'},
        {'title': 'President', 'id':'1248698'},
        {'title': 'Cylon', 'id':'551661'}
    ]
    },
    
    {
    'name': 'Starbuck',
    'banners' : [
        {'title': 'Standard', 'id':'544208'},
        {'title': 'CAG', 'id':'1263102'},
        {'title': 'Admiral', 'id':'1263084'},
        {'title': 'President', 'id':'1263119'},
        {'title': 'Cylon', 'id':'551657'}
    ]
    },
    
    {
    'name': 'Tigh',
    'banners' : [
        {'title': 'Standard', 'id':'544203'},
        {'title': 'CAG', 'id':'1263103'},
        {'title': 'Admiral', 'id':'1263085'},
        {'title': 'President', 'id':'1263120'},
        {'title': 'Cylon', 'id':'551654'}
    ]
    },
    
    {
    'name': 'Zarek',
    'banners' : [
        {'title': 'Standard', 'id':'544205'},
        {'title': 'CAG', 'id':'1263105'},
        {'title': 'Admiral', 'id':'1263087'},
        {'title': 'President', 'id':'1263122'},
        {'title': 'Cylon', 'id':'551656'}
    ]
    },
    {
    'name': 'Cain',
    'banners' : [
        {'title': 'Standard', 'id':'544871'},
        {'title': 'CAG', 'id':'1263093'},
        {'title': 'Admiral', 'id':'1263075'},
        {'title': 'President', 'id':'1263111'},
        {'title': 'Cylon', 'id':'551659'}
    ]
    },
    
    {
    'name': 'Dee',
    'banners' : [
        {'title': 'Standard', 'id':'544872'},
        {'title': 'CAG', 'id':'1263096'},
        {'title': 'Admiral', 'id':'1263078'},
        {'title': 'President', 'id':'1263114'},
        {'title': 'Cylon', 'id':'551666'}
    ]
    },
    
    {
    'name': 'Ellen',
    'banners' : [
        {'title': 'Standard', 'id':'544875'},
        {'title': 'CAG', 'id':'1263097'},
        {'title': 'Admiral', 'id':'1263079'},
        {'title': 'President', 'id':'1263115'},
        {'title': 'Cylon', 'id':'551662'}
    ]
    },
    
    {
    'name': 'Kat',
    'banners' : [
        {'title': 'Standard', 'id':'544873'},
        {'title': 'CAG', 'id':'1263100'},
        {'title': 'Admiral', 'id':'1263082'},
        {'title': 'President', 'id':'1263118'},
        {'title': 'Cylon', 'id':'551668'}
    ]
    },
    
    {
    'name': 'Cavil',
    'banners' : [
        {'title': 'Standard', 'id':'551663'}
    ]
    },
    
    {
    'name': 'Leoben',
    'banners' : [
        {'title': 'Standard', 'id':'551653'}
    ]
    },
    
    {
    'name': 'Six',
    'banners' : [
        {'title': 'Standard', 'id':'551667'}
    ]
    },
    
    {
    'name': 'Anders',
    'banners' : [
        {'title': 'Standard', 'id':'878727'},
        {'title': 'CAG', 'id':'1263089'},
        {'title': 'Admiral', 'id':'1263071'},
        {'title': 'President', 'id':'1263107'},
        {'title': 'Cylon', 'id':'878728'}
    ]
    },
    
    {
    'name': 'Cally',
    'banners' : [
        {'title': 'Standard', 'id':'878729'},
        {'title': 'CAG', 'id':'1263094'},
        {'title': 'Admiral', 'id':'1263076'},
        {'title': 'President', 'id':'1263112'},
        {'title': 'Cylon', 'id':'878730'}
    ]
    },
    
    {
    'name': 'Gaeta',
    'banners' : [
        {'title': 'Standard', 'id':'878731'},
        {'title': 'CAG', 'id':'1263098'},
        {'title': 'Admiral', 'id':'1263080'},
        {'title': 'President', 'id':'1263116'},
        {'title': 'Cylon', 'id':'878732'}
    ]
    },
    
    {
    'name': 'Tory',
    'banners' : [
        {'title': 'Standard', 'id':'878733'},
        {'title': 'CAG', 'id':'1263104'},
        {'title': 'Admiral', 'id':'1263086'},
        {'title': 'President', 'id':'1263121'},
        {'title': 'Cylon', 'id':'878734'}
    ]
    }
    
];

unsafeWindow.bgg_bsg_characters = bgg_bsg_characters;

addBSG();
