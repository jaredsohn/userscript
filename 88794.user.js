// ==UserScript==
// @name        -QQQQQQQQQQQQQ
// @author		QQQww
// @namespace	-erererer
// @version	- 1.2.9 (M8)
// @description  -qqqqq
// @include http://my.opera.com/*/albums/showpic.dml?album=*
// @include http://my.opera.com/*/blog/*
// @include http://my.opera.com/*/comments/editcomment.dml*
// @include http://my.opera.com/*/forums/topic.dml?id=*
// @include http://my.opera.com/*/messages/reply.dml?id=*
// @include http://my.opera.com/*/messages/newmessage.dml*
// @include http://my.opera.com/community/customize/skins/info/?id=*
// @include http://widgets.opera.com/comment/*
// @include http://widgets.opera.com/widget/*
// ==/UserScript==

(function(opera, doc) {
var AutoReSelect    = 1, //-- set to 0 to turn off the 'auto-reselect/auto-reposition' cursor setting.
    PreloadSmilies  = 0, //-- preload the smiles ..
    UseDataURLs     = 1, //-- use data:image urls.
    Open_Smilies    = 0, //-- set to 1 to auto-open the smilies panel
    AnimatedSmilies = 1, //-- set to 0 to turn off animated smilies
    MySmilies       = 0, //-- set to 1 if you want to use your smilies
    SelectCollapse  = 1, //-- collapse selection around previous selected text (1) or expand around text + bbcode (0)
    HackyFix        = 1; //-- only toggle if needed
function getMethodClosure(object, method) {
  var fn = object[method];
  return function() {
    //opera.postError([fn, object].join('\n'));
    return fn.apply(object, arguments);
  };
}
opera.AddCodeTools = function(textarea, container, params) {
  if (!textarea || !container) return;

  var options = params || {}
      ,newNode = getMethodClosure(document, 'createElement')
      ,main = newNode('div')
      ,right = main.appendChild(newNode('div'))
      ,smDiv = newNode('div')
      ,buttons = main.appendChild(newNode('ul'))
      ,base = 'http://my.opera.com/community/graphics/ui/'
      ,codes = {
    B                :{img:'bold.gif',        key:'b'},
    I                :{img:'italic.gif',      key:'i'},
    U                :{img:'underline.gif',   key:'u'},
    'ALIGN-left'     :{img:'alignleft.gif'},
    'ALIGN-center'   :{img:'aligncenter.gif', key:'a'},
    'ALIGN-right'    :{img:'alignright.gif'},
    'ALIGN-justify'  :{img:'alignjustify.gif'},
    LIST             :{img:'listbullet.gif',  key:'l'},
    QUOTE            :{img:'quote.gif',       key:'q'},
    CODE             :{img:'code.gif',        key:'c'},
    IMGLEFT          :{img:'imgleft.gif'},
    IMG              :{img:'img.gif',         key:'m'},
    IMGRIGHT         :{img:'imgright.gif'},
    'URL-http://'    :{img:'url.gif',         key:'h'},
    EMAIL            :{img:'email.gif',       key:'e'},
    S                :{img:'strike.gif',      key:'s'},
    SUP              :{img:'sup.gif'},
    SUB              :{img:'sub.gif'},
    SMILIES          :{img:'smilies.gif'}
  },
keys={};
/*
for (var iX in codes) {
    var img = newNode('img'), curr = codes[iX];
    if (curr.key)
      keys[curr.key] = iX;
    img.src = UseDataURLs ? (curr.dataURI ?'data:image/gif;base64,' + curr.dataURI : base + curr.img) : base + curr.img;
    img.title = iX;
    img.addEventListener('click', function() { format(textarea, this.title.split('-'), this); }, false);
    main.appendChild(img);
}*/

for (var iX in codes) {
    var item = newNode('li'), curr = codes[iX];
    item.className = 'sprite-' + curr.img.split('.')[0];
    item.title = iX;
    if (curr.key) {
      keys[curr.key] = iX;
    }
    item.addEventListener('click', function() { format(textarea, this.title.split('-'), this); }, false);
    buttons.appendChild(item).appendChild(document.createTextNode('foo'));
}
//'iVBORw0KGgoAAAANSUhEUgAAABcAAAJKCAYAAADHpd6gAAAIO0lEQVR42u2da1BU5xnH92M/OP3Qmc6YD8lM2+llJpmpSTqJM0mbaiQmNYbUkNZpoJqYRY2ALqBCcJVgVKpYueQiilzFQcALCqhcBbl4gQhC1SgCIgkqECsaZBf03/OeZVcW8ew5uAel/H8zz5zb+/yf9zznss/ZOReDgRBCyGMEo7TxtwbMOXPOnBNCCCGE9Tl7zp6z5xP7yoIQQgghrF3GQ63CnDPnEyHnhBBCCJlINcv4rWGYc+actTohhBBCnviywn0BGuuOy+bOAP8H4sz5mIizbCaEEEII0Z2QkBCnyiojIwPR0dF4ZNHJkyfLNnR+QkICJk2ahClTpmgPIpztosN7bSc3Nxfz5893BBHTqsT9/PwwUjpGCuDl5QV7h0aVkuFBhvd61Pm3Bxk6T4g9kighhBBCCJFISUmGVlMtvn37NoSHh0PQ19c3zCzy0DI4LtptT9imTTw/P98RoLur+wETiOWinSbxuLhY2XlogO/a2x02VFgQFxujXjwyMlJ2am+74hSgtfWyk/CVNlugf0ntVYubV5tlpwvnLyA1NcUpgF1YzBfLBavNZvXiQcHBspNduKG+wRFg6LRYLggKDlIvvmTJEoewEvYAor1qcaPRCK3GswMhhBCiI611R3H4CxNSTNM1mfARvorieTH+qE9eCtTEazLhI3wVxbcuehmt+8xIDXxdk7XuNUP4KhehC55HU1aI7FBTU6PKRNuLmSEQvorim32exdn0QCQu/bPsaNzfAWNOB3zFULK0M3dl8x2cJ9okBkyTfIIgfBXFN/z9N6hL8sPWxa/KjqZDnQg81IXAw12OMm7u3HXyUMwXbUTbuiR/CF9F8fC//gKn4o2IWfCy7Bhe+l/ZhGB46U152NAIzJhhkqdFm9iPpuLkVl8IX0XxsFlPoyJ2HjZ6vyA7/ruq10lQDNN2AlFRx+Rp0Ua0FT7CV1E82OMpFEfNRYTXc7KjXXiooBjaTbSJeP852Uf4Kor7vfZzHF4/B2Gzfys7CuGgoGQnEwHs46KNaCt8hK9y+Tz1Zzj42WwEz/yl6l0xSGp7QPIRvoriPs//FHtXvYml059GwPRnRrZpgzZkeu+qtyB8FcUD33kRXxpfQlaohyYTPsJXUbwifw8+/cADnr/+iSYTPsKXp35CCCGsz1mfsz5XU59LA33qcyEsEEN31+eOvNrF3VWfOwm7sz53EtajPncKoEd97hRAj/rcIa7XmZdXCIQQQiYguj87J4uKuxfcqjooqFtlwF6P817zuVBCCCFkAiDKB7uNjbi73t6ma8+5QblBuUG5QQkhhBBC3ABcTA+vwh42PWph3cU1t9faG93Eta4lIYQQQnQolPR5JzS+l+z6oEnj9y4+ehDgmmS3JbNI1j9ofZLdkuyqAZaG0QUAugdF74nbOkewXltwS722ALY09NlEHKkZIuyY96NkVwz4oUx9AKBHsrvOovbxB+ZJa2g5o04caBlcZaiwAcluShv4ggEt2SqqXLGauKPtOzn3LhnQfkCteK999e/fADyU4ctEz9tyVIiLhiLnWsSt0i55Pl2FeG+N7WDRIt5TZUBVtMqNKo5A/HA/wMPExbC/UV1KHOJiv0WzbTe7v587iwsbOGfA9UIDyjZqPJC6S6RenbVt4JH2EHFkXi0woDpmlKcAse/eKDfgTq3tQBGCP56yBW7abUDRukc8eQmr/dqAxmTJkgyokcYL1ur0Ov6HiI7NPXUG3hRPCCFkLC5Z3Prb6Wqe28QNBp1+9cfHZaIu5cOYfYVzTPYW3iJOCCGEENbnrM/Hd33uKrfja295rPU5nvgNbNBzA4+pOC/ECCGEPDlltttrF93/EXWruMHd4nBRlLotAOtz/n9OCCGEEDImVwxKBT/cFWD81osUH2Nx+7sV9XiR4/i7ANDlRiVCCCHkCeBMcy/W7ryKv61twaywSw4LSfgehbU9o/+Ji8/thE9sEWKq4rH2pDeWVbyHg10rEFrpifjiRqxI6MCS2DbcvnNXW5CozA4Yd6Qj87vliDvng4CqQCw86o3gCg+k1e3GmbYBlJ0bQEjSNSyObsGtXpUBssu64PN1IlJaFiG7w4TkloX4rMYT1db1CCz0Rt75SpxutYlHlmTgk7QdMH3Z4lr8Vu8AZoU0YmXxR0hq9kVGuz9yOpfjyI0wFPesxpaqzfhP+12caBpAQUM/1hRsQ8xZb7yzbh9OX7zl4pNN1V14f8MJhFa9hcVFryK1dRHSLn8C/5KZWHFsNsJKA2Th0rP9OPBNP9IrrVi4z4x/fJGHdWmtyuJbMi/DN64Jntm/w3tZf8RX5+dhZeVMJJ+sQERJFJYXf4xCqccHT/dj93ErdpRZseWwBSG7evDup3XK4r4bG2FK7EREXh2+KpFyn+OBhYWvIKe2H3tqurG9oh57T/VjV5UViZJwXIEFH2aZYTz0Ol5cUKksvmBDPRbHX8f6A32IOWJBxKFyeS02FR/DTikFaRVWJJVbEV9iQbS0fOX+ciw7Og2b6+fi9/PKlMUjU7/FnM8vISyrD+H7OzEn6w+IOOmJRQWv4MPc17Bsf7wsuinPgs9z+hCQWYagshkIyjdiTugJZfE9pe14I7QOgbvu4IP0jTCVTsOqqr9gdfXbWHN89gNFqDG9TH1hevO2FVN8jsC0+wZ8MjfBv/BPCCyZPuIzoiM9lOryGzsJOU2YFf4NzEXN8NrzEj7On+r0JKsrcxnAtKUGb0fUIuJYM/yObHNy2lRtderxG/5FTlfXqr4QZN56GlP9SuC3q9W9PbdTUXcN/1xTjl+9m+2enD/uPxoIIcQV/wO/gtlY3i8evwAAAABJRU5ErkJggg==';
var Font = {
  SIZE:   ['Size','1','2','3','4','5','6','7']
  ,FONT:  ['Font','Arial','Times new roman','Courier New','Century Gothic','Verdana','Tahoma','Comic Sans MS','Microsoft Sans Serif','Georgia','Impact','Lucida Sans','Roman','Script','Segoe UI','Small Fonts','Terminal']
  ,COLOR: ['Color','black','sky blue','royal blue','blue','dark-blue','orange','orange-red','crimson','red','firebrick','dark red','green','limegreen','sea-green','deeppink','tomato','coral','purple','indigo','burlywood','sandy brown','sienna','chocolate','teal','silver','gray','yellow','lime','darkorange','khaki','royalblue','floralwhite']
}, re = /\W/;

main.className = 'OperaEditTools';
buttons.className = 'buttons';
right.className = 'flRight';
for (var ii in Font) {
  var select = newNode('select'), section = Font[ii], coloring = ii == 'COLOR';
  for (var jj = 0, current, option; current = section[jj]; jj++) {
    option = new Option(current);
    if (coloring && jj)
      option.style.color = current.replace(re, '');
    select.add(option);
  }
  select.options[0].selected = 1;
  select.name = select.title = ii;
  select.addEventListener('change'
    ,function() {
      if (this.selectedIndex) {
        format(textarea, [this.name, this.value.toLowerCase().replace(new RegExp(this.name == 'COLOR'? '\\W' : 'A', 'g'), '')]);
        this.selectedIndex = 0;
      } 
    }
    ,false
  );
  right.appendChild(select);
}

base='http://my.opera.com/community/graphics/smilies/'
var Smilies={
    ':)'        : 'smile.gif',       ':('         : 'frown.gif',        ':o'         : 'blush.gif',
    ':D'        : 'bigsmile.gif',    ';)'         : 'wink.gif',         ':p'         : 'tongue.gif',
    ':cool:'    : 'cool.gif',        ':awww:'     : 'awww.gif',         ':mad:'      : 'mad.gif',
    ':eek:'     : 'eek.gif',         ':worried:'  : 'worried.gif',      ':yuck:'     : 'yuck.gif',
    ':irked:'   : 'irked.gif',       ':happy:'    : 'pleased.gif',      ':eyes:'     : 'bigeyes.gif',
    ':ko:'      : 'knockout.gif',    ':left:'     : 'left.gif',         ':right:'    : 'right.gif',
    ':whistle:' : 'whistle.gif',     ':zip:'      : 'zipped.gif',       ':sst:'      : 'sst.gif',
    ':angel:'   : 'angel.gif',       ':devil:'    : 'devil.gif',        ':cat:'      : 'cat.gif',
    ':clown:'   : 'sadclown.gif',    ':king:'     : 'king.gif',         ':queen:'    : 'queen.gif',
    ':zzz:'     : 'zzz.gif',         ':alien:'    : 'alien.gif',        ':lol:'      : 'haha.gif',
    ':faint:'   : 'faint.gif',       ':psmurf:'   : 'papasmurf.gif',    ':smurf:'    : 'smurf.gif',
    ':wine:'    : 'wine.gif',        ':beer:'     : 'beeer.gif',        ':star:'     : 'star.gif',
    ':cry:'     : 'weeping.gif',     ':insane:'   : 'scared.gif',       ':bomb:'     : 'bomb.gif',
    ':love:'    : 'love.gif',        ':flirt:'    : 'flirt.gif',        ':rolleyes:' : 'rolleyes.gif',
    ':pirate:'  : 'pirate.gif',      ':spock:'    : 'spock.gif',        ':beard:'    : 'beard.gif',
    ':up:'      : 'thumbsup.gif',    ':down:'     : 'thumbsdown.gif',   ':cheers:'   : 'cheers.gif',
    ':idea:'    : 'idea.gif',        ':confused:' : 'confused.gif',     ':wait:'     : 'waiting.gif',
    ':coffee:'  : 'coffee.gif',      ':sing:'     : 'sing.gif',         ':ninja:'    : 'ninja.gif',
    ':knight:'  : 'knight.gif',      ':chef:'     : 'chef.gif',         ':hat:'      : 'party.gif',
    ':wizard:'  : 'wizard.gif',      ':drunk:'    : 'drunk.gif',        ':sherlock:' : 'detective.gif',
    ':furious:' : 'furious.gif',     ':yikes:'    : 'yikes.gif',        ':troll:'    : 'troll.gif',
    ':bandit:'  : 'bandit.gif',      ':jester:'   : 'jester.gif',       ':yes:'      : 'yes.gif',
    ':no:'      : 'no.gif',          ':headbang:' : 'headbang.gif',     ':heart:'    : 'heart.gif',
    ':doh:'     : 'doh.gif',         ':nervous:'  : 'nervous.gif',      ':banana:'   : 'banana.gif',
    ':monkey:'  : 'monkey.gif',      ':cow:'      : 'cow.gif',          ':pingu:'    : 'pingu.gif',
    ':bug:'     : 'bug.gif',         ':dragonfly:': 'dragonfly.gif',    ':rip:'      : 'rip.gif',
    ':norris:'  : 'norris.gif',      ':hi:'       : 'hi.gif',           ':bye:'      : 'bye.gif'
}

var AnimatedSmiliesBase = 'http://files.myopera.com/Tamil/Smilies/';
var AnimatedSmiliesList={
	'BigGrin'	: 'BigGrin.gif',
	'BigGrin2'	: 'BigGrin2.gif',
	'LOL'		: 'LOL.gif',
	'LOL2'		: 'LOL2.gif',
	'Cool'		: 'Cool.gif',
	'Cool2'		: 'Cool2.gif',
	'Wink'		: 'Wink.gif',
	'Happy'		: 'Happy.gif',
	'Good'		: 'Good.gif',
	'ThumbsUp'	: 'ThumbsUp.gif',
	'Clap'		: 'Clap.gif',
	'Yes'		: 'Yes.gif',
	'Applause'	: 'Applause.gif',
	'Dance'		: 'Dance.gif',
	'Dance2'	: 'Dance2.gif',
	'Dance3'	: 'Dance3.gif',
	'Cheers'	: 'Cheers.gif',
	'Tease'		: 'Tease.gif',
	'Boo'		: 'Boo.gif',
	'Crazy'		: 'Crazy.gif',
	'Crazy2'	: 'Crazy2.gif',
	'Adore'		: 'Adore.gif',
	'Victory'	: 'Victory.gif',
	'Oo'		: 'Oo.gif',
	'Eek'		: 'Eek.gif',
	'Sad'		: 'Sad.gif',
	'Drool'		: 'Drool.gif',
	'Woot'		: 'Woot.gif',
	'Whistle'	: 'Whistle.gif',
	'Secret'	: 'Secret.gif',
	'Scared'	: 'Scared.gif',
	'Bye'		: 'Bye.gif',
	'Heart'		: 'Heart.gif',
	'Love'		: 'Love.gif',
	'Bang'		: 'Bang.gif',
	'Danger'	: 'Danger.gif',
	'Cop'		: 'Cop.gif',
	'Hit'		: 'Hit.gif',
	'Stop'		: 'Stop.gif',
	'Fool'		: 'Fool.gif',
	'Yahoo'		: 'Yahoo.gif',
	'Spam'		: 'Spam.gif',
	'Help'		: 'Help.gif',
	'Wait'		: 'Wait.gif',
	'Devil'		: 'Devil.gif',
	'Guns'		: 'Guns.gif',
	'ROFL'		: 'ROFL.gif'
}

var MySmiliesBase = 'http://files.myopera.com/';  // Path to your smilies folder
var MySmiliesList = {
  // Add your smilies below. Example:  'Smiley1'  : 'Smiley1.gif',  'Smiley2'  : 'Smiley2.gif',  'Smiley3'  : 'Smiley3.gif'
};

function AddSmilies() {
  if (this.Added) return;
  var img, iX, curr;
  smDiv.className = 'smilies';
  smDiv.style.display = 'none';
  for (iX in Smilies) {
    img = newNode('img');
    curr = base + Smilies[iX];
    img.src = curr;
    img.title = iX;
    img.addEventListener('click', function() { format(textarea, ['SMADD',this.title+' ']); }, false);
    new Image().src = curr;
    smDiv.appendChild(img);
  }
  if (AnimatedSmilies) {
    for (iX in AnimatedSmiliesList) {
      img = newNode('img');
      curr = AnimatedSmiliesBase + AnimatedSmiliesList[iX];
      img.src = curr;
      img.title = iX;
      img.addEventListener('click', function() { format(textarea,['SMADD','[IMG='+AnimatedSmiliesBase+this.title+'.gif][/IMG] ']); }, false);
      new Image().src = curr;
      smDiv.appendChild(img);
    }
  }
  if (MySmilies) {
    for (iX in MySmiliesList) {
      img = newNode('IMG');
      curr = MySmiliesBase + MySmiliesList[iX];
      img.src = curr;
      img.title = iX;
      img.addEventListener('click', function() { format(textarea,['SMADD','[IMG='+MySmiliesBase+this.title+'.gif][/IMG] ']) }, false);
      new Image().src = curr;
      smDiv.appendChild(img);
    }
  }
 main.appendChild(smDiv);
 this.Added = 1;
}

  if (Open_Smilies)
    format(textarea, ['SMILIES'], tImg);
  else if (PreloadSmilies)
    AddSmilies();

  var bgImage = UseDataURLs ? 'data:image/gif;base64,R0lGODlhAQBAANUAAN3d3tvb3Ovr6%2B3t7ebm59%2Ff3%2Bjo6OTk5N7e3uDg4Nzc3ezs7Nra2tvb2%2Brq6%2Brq6trb2unq6uLi497e3eHi4e3s7e3u7d3c3eXl5enp6tzc3uPi4ufn6Onp6ezs6%2B7t7ezt7Ojn5%2BLi4eHh4efn5%2BXm5eTk4%2BDg4eHg4OPj49rb2%2BXk5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABAEAAAAY4wMFnYBmAKgvPQsB0PCKZjsEQ4pAIBExpdTiYUhuJiDI6oRKJQgGBmADeb81FoQgEGgFVgwFhBAEAOw%3D%3D' : '/community/graphics/blogform/bg.gif';
  addCssToDocument('\
div.OperaEditTools > img, div.OperaEditTools .buttons li { background: #E6E6E6 none repeat scroll 0%; border:1px solid #ccc; margin: 3px 2px 5px 0; }\n\
div.OperaEditTools > img:hover, div.OperaEditTools .buttons li:hover { background-color: #fff; border: 1px outset #DADADA; }\n\
div.OperaEditTools > img:active, div.OperaEditTools .buttons li:active { border-style: inset; }\n\
div.OperaEditTools, div.OperaEditTools select { /*font-size: 12px;*/ }\n\
div.OperaEditTools { border-top:1px solid #A8A8A8; background: #DADADA url("' + bgImage + '") repeat-x scroll left top; }\n\
div.OperaEditTools > div.flRight { float: right; height: 30px; }\n\
div.OperaEditTools > .smilies { padding: 8px; padding-top: 0px; border-top: 2px outset #989898; }\n\
div.OperaEditTools > .smilies img {margin: 2px 3px; background: transparent; border: none; cursor: hand; }\n\
div.OperaEditTools select { margin: 4px 0 0 2px; }\n\
div.OperaEditTools .buttons { margin: 0; }\n\
div.OperaEditTools .buttons li { margin-right: -1px; display: inline-block; height: 22px; width: 22px; text-indent: -9999px; background: url(data:image/png;base64,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) no-repeat top left; }\n\
div.OperaEditTools .buttons .sprite-aligncenter { background-position: 0 -10px; }\n\
div.OperaEditTools .buttons .sprite-alignjustify { background-position: 0 -42px; }\n\
div.OperaEditTools .buttons .sprite-alignleft { background-position: 0 -74px; }\n\
div.OperaEditTools .buttons .sprite-alignright { background-position: 0 -106px; }\n\
div.OperaEditTools .buttons .sprite-bold { background-position: 0 -138px; }\n\
div.OperaEditTools .buttons .sprite-code { background-position: 0 -170px; }\n\
div.OperaEditTools .buttons .sprite-email { background-position: 0 -202px; }\n\
div.OperaEditTools .buttons .sprite-img { background-position: 0 -234px; }\n\
div.OperaEditTools .buttons .sprite-imgleft { background-position: 0 -266px; }\n\
div.OperaEditTools .buttons .sprite-imgright { background-position: 0 -298px; }\n\
div.OperaEditTools .buttons .sprite-italic { background-position: 0 -330px; }\n\
div.OperaEditTools .buttons .sprite-listbullet { background-position: 0 -362px; }\n\
div.OperaEditTools .buttons .sprite-quote { background-position: 0 -394px; }\n\
div.OperaEditTools .buttons .sprite-smilies { background-position: 0 -426px; }\n\
div.OperaEditTools .buttons .sprite-strike { background-position: 0 -458px; }\n\
div.OperaEditTools .buttons .sprite-sub { background-position: 0 -490px; }\n\
div.OperaEditTools .buttons .sprite-sup { background-position: 0 -522px; }\n\
div.OperaEditTools .buttons .sprite-underline { background-position: 0 -554px; }\n\
div.OperaEditTools .buttons .sprite-url { background-position: 0 -586px; }\n\
div.OperaEditTools { clear: both; }\n\
div.OperaEditTools > img { width: 22px; margin-right: 0; }\n' +
(options.Styles || ''));
    
  container.parentElement.insertBefore(main, container);
  
  var cst = main.offsetTop + main.offsetHeight + 1;
  if (cst < textarea.offsetTop && 0)
    main.style.marginBottom = '-' + (textarea.offsetTop - cst) + 'px';
  
  if (!options.NoAutoAdjust) {
    var adjust = function() {
      main.style.width = textarea.offsetWidth
    };
    var qr = document.getElementById('quickreply');
    if (qr)
      qr.style.marginBottom = 0;
    
    adjust();
    document.addEventListener('load', adjust, false);
    document.addEventListener('resize', adjust, false);
  }
  
  textarea.addEventListener('keypress'
    ,function(e) {
      var key = String.fromCharCode(e.keyCode).toLowerCase();
      if ((key in keys) && ('cavx'.indexOf(key) < 0) && /*e.target.hotKey && !*/e.ctrlKey) {
          format(textarea, keys[key].split('-'));
          e.preventDefault();
          //e.target.hotKey = 0;
      }
      /*
      else if (e.keyCode == 17)
        e.target.hotKey = !e.target.hotKey;
      else
        e.target.hotKey = 0;
      */
    }
    ,false
  );
  
  
  function format(textarea, q, elem) {
    var value = q[1] || '';
    q = q[0];
    if (q == 'SMILIES') {
      AddSmilies()
      var hid=smDiv.style.display=='none'
      smDiv.style.display = hid ? '' : 'none';
      elem.style.backgroundColor = hid ? '#C6C6C6' : '';
      elem.style.borderStyle = hid ? 'ridge' : '';
      //textarea.blur();textarea.focus();
      return;
    }
    
    var CurPos = textarea.selectionStart;
    var start = textarea.selectionStart, end = textarea.selectionEnd, text = textarea.value;
    textarea.focus();
    var sel = document.createRange(), selTxt = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    switch (q) {
      case 'SMADD':
        if (!selTxt)
          textarea.value += value;
        else {
          textarea.value = text.substring(0, start) +  '[' + q + (value ? '=' + value : '') + ']' + selTxt + '[/' + q + ']' + text.substring(end);
        }
        return;
      case 'LIST':
        if (!(value = prompt('  1\tfor Numbered list,\n  a\tfor Alphabetical list,\n  \tfor bullet list.','1')))
          return;
        selTxt = '\n  [*]' + selTxt.replace(/\n/g, '\n  [*]') + '\n';
        break;
      case 'IMG':
      case 'IMGLEFT':
      case 'IMGRIGHT':
        if (!(value = prompt('Enter the URL for the image', '')))
          return;
        break;
      case 'URL':
      case 'EMAIL':
        if (!selTxt.length)
            selTxt = prompt('Enter the text to be displayed for the link', '');
        if (!(value = prompt('Enter the ' + (q == 'URL' ? 'full URL' : 'E-mail') + ' for the link', value)))
          return;
        break;
    }
    
    if (q != 'IMGLEFT' && !selTxt)
      selTxt = prompt('Enter the text to be formatted:', '') || '';
    
    if (q != 'IMGLEFT' && selTxt) {
      textarea.value = text.substring(0, start) +  '[' + q + (value ? '=' + value : '') + ']' + selTxt + '[/' + q + ']' + text.substring(end);
    }
    else
      textarea.value += '[' + q + (value ? '=' + value : '') + ']' + (q != 'IMGLEFT' ? selTxt + '[/' + q + ']' : '');
    
    if (AutoReSelect) {
      if (SelectCollapse) {
        start = CurPos + q.length + 2 + (value ? 1 + value.length : 0);
        textarea.setSelectionRange(start,start+selTxt.length)
      }
      else {
        textarea.setSelectionRange(CurPos,CurPos + selTxt.length + (q.length *2) + 5 + (value ? 1 + value.length : 0) + (q == 'LIST' && HackyFix ? 2 : 0));
      }
    }
  }
}

document.addEventListener('DOMContentLoaded'
  ,function() {
    var codTT = document.forms.addcomment;
    if (codTT && /\/.*?\/forums\//.test(location.pathname))
      opera.AddCodeTools(codTT.comment, codTT);
    else if (codTT = document.selectSingleNode('//form//textarea[@id="message" or @name="comment"]')) {
      var widgetsPage = location.hostname == 'widgets.opera.com', selWidth = widgetsPage ? 54 : 40;
      opera.AddCodeTools(codTT, widgetsPage ? codTT : codTT.form
        ,{Styles://' div.OperaEditTools > img { margin-right:-.7pt; width: 22px; height: 22px; }\n'+
                ' div.OperaEditTools > div.flRight { width: ' + (selWidth*3 + 3) + 'px; overflow: hidden; }\n'+
                ' div.OperaEditTools select { width: ' + selWidth + 'px; margin-left: 0; }\n'+
                ' div.OperaEditTools { width: ' + (codTT.form || {}).offsetWidth + 'px; line-height: 0; padding: 0 !important; ' + (widgetsPage ? 'margin-top: 3px' : '') + ' }'
          ,NoAutoAdjust: 1
        }
      );
    }
    else if (codTT = document.selectSingleNode('//form//textarea[@name="message"]'))
      opera.AddCodeTools(codTT
        ,codTT
        ,{
          Styles: 'div.OperaEditTools > img { margin-right: 0; }\ndiv.OperaEditTools > div.flRight { display: none; }'
        }
      );
  }
  ,false
);
function addCssToDocument(cssText, mediaStr) { var doc = document, media = mediaStr || 'screen', styles = this.styleObj; if (!styles) { var head = doc.selectSingleNode('//head'); if (!head) { var docEl = doc.selectSingleNode('/html') || doc.documentElement; if (!docEl) { doc.addEventListener(opera && opera.version() >= 9 ? 'DOMContentLoaded' : 'load', function() { addCssToDocument(cssText); }, false); return; } head = doc.createElement('head'); if (head) docEl.insertBefore(head,docEl.firstChild); else head = docEl; } this.styleObj = styles = head.appendChild(doc.createElement('style')); styles.setAttribute('type', 'text/css'); styles.appendChild(doc.createTextNode('\n')); } styles.firstChild.nodeValue += '@media ' + media + ' {\n ' + cssText + '\n}\n'; return true; }
})(this.opera || this, this.document);