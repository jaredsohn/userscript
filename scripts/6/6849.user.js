//{{GM}}<source lang="javascript">
// GMail Talk Emoticons
// version 0.1
// 2006-11-06
// Copyright (c) 2006, Jim R. Wilson (wilson.jim.r at gmail)
// Released under The MIT License (http://www.opensource.org/licenses/mit-license.php)
//
// Purpose:
//    Adds additional emoticons to Gmail's in-browser GTalk.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GMail Talk Emoticons
// @namespace     http://jimbojw.com/userscripts/
// @description   Adds additional emoticons to Gmail's in-browser GTalk.
// @include       https://mail.google.com/mail/?view=page&name=js&ver=*
// @include       https://mail.google.com/mail/?view=page&name=gp&ver=*
// @include       http://mail.google.com/mail/?view=page&name=js&ver=*
// @include       http://mail.google.com/mail/?view=page&name=gp&ver=*
// ==/UserScript==

// Anonymous function wrapper
(function() {

/**
 * Simple methods for retrieving the first instance of a tag.
 */
function first (tag, elem) {
    return (elem ? elem : document).getElementsByTagName(tag)[0];
}

/**
 * Custom script to inject.
 */
var scriptText =
    '(function() {' + "\n" +
        // Since GTalk's code is compiled, we have to dynamically determine the appropriate class and method to hijack.
        'var wp = (function () {' + "\n" +
            'for (var i in top.js) {' + "\n" +
                'var obj = top.js[i];' + "\n" +
                'if (obj && obj.prototype && /^function \\w+\\s*\\(a, b, c\\)/m.test(obj.toString())) {' + "\n" +
                    'for (var j in obj.prototype) {' + "\n" +
                        'var meth = obj.prototype[j];' + "\n" +
                        'if (meth && /\\/<e t=\\[\'"\\]\\(\\[\\\\w \\]\\+\\)\\[\'"\\]>\\//.test(meth.toString())) {' + "\n" +
                            'return [i, j];' + "\n" +
                        '}' + "\n" +
                    '}' + "\n" +
                '}' + "\n" +
            '}' + "\n" +
        '})();' + "\n" +
        // Similarly, we'll need to look up the method that does the image replacement in order to call it later.
        'var ws = (function () {' + "\n" +
            'var obj=top.js._BZ_RotaSmile;' + "\n" +
            'for (var j in obj) {' + "\n" +
                'var meth = obj[j];' + "\n" +
                'if (meth && /"<img id=emoticon"/.test(meth.toString())) {' + "\n" +
                    'return j;' + "\n" +
                '}' + "\n" +
            '}' + "\n" +
        '})();' + "\n" +
        'var meth=wp[1];' + "\n" +
        'var tp = top.js[wp[0]].prototype;' + "\n" +
        'if (!tp["_"+meth]) {' + "\n" +
            'tp[meth+"_reps"] = [' + "\n" +
                // Patterns to match - a mixture of MSN and Yahoo emots
                // Group 1 (must be IN ORDER listed and before all in Group 2)
                '[/(&lt;:[Oo]|\\(party)\\)/g,"party"],' + "\n" +
                '[/(:o|\\(clown)\\)/g,"clown"],' + "\n" +
                '[/&lt;:-p/g,"partier"],' + "\n" +
                '[/:-ss/g,"nail biting"],' + "\n" +
                '[/(:@|\\(pig)\\)/g,"pig"],' + "\n" +
                '[/\\(:\\|/g,"tired"],' + "\n" +
                '[/#:-s/g,"whew"],' + "\n" +
                // Group2 - the rest
                '[/\\((ap|plane)\\)/g,"airplane"],' + "\n" +
                '[/&gt;-\\)/g,"alien"],' + "\n" +
                '[/\\((A|a|angel)\\)/g,"angel"],' + "\n" +
                '[/:-?@/g,"angry"],' + "\n" +
                '[/[Xx]-?\\(/g,"angrier"],' + "\n" +
                '[/o-\\+/g,"april"],' + "\n" +
                '[/8o\\|/g,"barring teeth"],' + "\n" +
                '[/\\((B|b|beer)\\)/g,"beer"],' + "\n" +
                '[/o=&gt;/g,"billy"],' + "\n" +
                '[/b-\\(/g,"black eye"],' + "\n" +
                '[/:&quot;&gt;/g,"blushing"],' + "\n" +
                '[/\\(\\|\\|\\)/g,"bowl"],' + "\n" +
                '[/\\((Z|z|boy|guy)\\)/g,"boy"],' + "\n" +
                '[/\\([Uu]\\)/g,"broken heart"],' + "\n" +
                '[/:-[Bb]/g,"bucktooth"],' + "\n" +
                '[/~o\\)/g,"caffeine"],' + "\n" +
                '[/\\((\\^|cake)\\)/g,"cake"],' + "\n" +
                '[/\\((P|p|camera)\\)/g,"camera"],' + "\n" +
                '[/\\((@|cat)\\)/g,"cat"],' + "\n" +
                '[/\\((au|car)\\)/g,"car"],' + "\n" +
                '[/~:&gt;/g,"chicken"],' + "\n" +
                '[/\\((O|o|clock)\\)/g,"clock"],' + "\n" +
                '[/%%-/g,"clover"],' + "\n" +
                '[/\\((C|c|coffee)\\)/g,"coffee"],' + "\n" +
                '[/\\(mo\\)/g,"coins"],' + "\n" +
                '[/\\((H|h|cool)\\)/g,"cool"],' + "\n" +
                '[/b-\\)/g,"cooler"],' + "\n" +
                '[/\\(co\\)/g,"computer"],' + "\n" +
                '[/:-?[Ss]/g,"confused"],' + "\n" +
                '[/\\(coy\\)/g,"coy smile"],' + "\n" +
                '[/\\(6\\)/g,"devil"],' + "\n" +
                '[/:\\|/g,"disappointed"],' + "\n" +
                '[/\\((&amp;|dog)\\)/g,"dog"],' + "\n" +
                '[/#-o/g,"doh"],' + "\n" +
                '[/:\\^\\)/g,"dont know"],' + "\n" +
                '[/:-#/g,"dont tell"],' + "\n" +
                '[/\\([Ee]\\)/g,"email"],' + "\n" +
                '[/:-?\\$/g,"embarrassed"],' + "\n" +
                '[/8-\\)/g,"eye rolling"],' + "\n" +
                '[/\\(~\\)/g,"filmstrip"],' + "\n" +
                '[/\\*\\*==/g,"flag"],' + "\n" +
                '[/:-[Ll]/g,"frustrated"],' + "\n" +
                '[/\\((G|g|gift)\\)/g,"gift"],' + "\n" +
                '[/:d/g,"grin"],' + "\n" +
                '[/\\((X|x|girl)\\)/g,"girl"],' + "\n" +
                '[/\\(S\\)/g,"half moon"],' + "\n" +
                '[/\\((L|l|heart)\\)/g,"heart"],' + "\n" +
                '[/o-&gt;/g,"hiro"],' + "\n" +
                '[/@-\\)/g,"hypnotized"],' + "\n" +
                '[/(:x|\\(inlove\\))/g,"inlove"],' + "\n" +
                '[/\\((ip|island)\\)/g,"island"],' + "\n" +
                '[/:-j/g,"just kidding"],' + "\n" +
                '[/:-?\\*/g,"kiss"],' + "\n" +
                '[/\\(\\{\\)/g,"left hug"],' + "\n" +
                '[/\\([Ii]\\)/g,"light bulb"],' + "\n" +
                '[/\\(li\\)/g,"lightning"],' + "\n" +
                '[/l-\\)/g,"loser"],' + "\n" +
                '[/:\\^o/g,"lying"],' + "\n" +
                '[/\\((D|d|drink)\\)/g,"martini"],' + "\n" +
                '[/\\((mp|cell)\\)/g,"mobile phone"],' + "\n" +
                '[/\\$-\\)/g,"money eyes"],' + "\n" +
                '[/\\((M|m|msn)\\)/g,"msn icon"],' + "\n" +
                '[/\\((8|note)\\)/g,"music note"],' + "\n" +
                '[/8-\\|/g,"nerd"],' + "\n" +
                '[/\\[-\\(/g,"not talking"],' + "\n" +
                '[/@\\};-/g,"pink rose"],' + "\n" +
                '[/\\((pi|pizza)\\)/g,"pizza"],' + "\n" +
                '[/\\((pl|plate)\\)/g,"plate"],' + "\n" +
                '[/\\[-o&lt;/g,"praying"],' + "\n" +
                '[/\\(~~\\)/g,"pumpkin"],' + "\n" +
                '[/\\([Kk]\\)/g,"red lips"],' + "\n" +
                '[/\\((F|f|rose)\\)/g,"red rose"],' + "\n" +
                '[/\\(\\}\\)/g,"right hug"],' + "\n" +
                '[/\\^o\\)/g,"sarcastic"],' + "\n" +
                '[/\\[-X/g,"shame on you"],' + "\n" +
                '[/\\((bah|sheep)\\)/g,"sheep"],' + "\n" +
                '[/:-?[Oo]/g,"shocked"],' + "\n" +
                '[/\\+o\\(/g,"sick"],' + "\n" +
                '[/:-&amp;/g,"sicker"],' + "\n" +
                '[/:-&lt;/g,"sigh"],' + "\n" +
                '[/8-\\}/g,"silly"],' + "\n" +
                '[/8-X/g,"skull"],' + "\n" +
                '[/\\|-\\)/g,"sleepy"],' + "\n" +
                '[/[Ii]-\\)/g,"sleepier"],' + "\n" +
                '[/:&gt;/g,"smug"],' + "\n" +
                '[/\\((sn|snail)\\)/g,"snail"],' + "\n" +
                '[/\\((so|soccer)\\)/g,"soccer ball"],' + "\n" +
                '[/\\((\\*|star)\\)/g,"star"],' + "\n" +
                '[/\\(st\\)/g,"storm cloud"],' + "\n" +
                '[/\\((T|t)\\)/g,"telephone"],' + "\n" +
                '[/=;/g,"talk to the hand"],' + "\n" +
                '[/:-\\?/g,"thinking"],' + "\n" +
                '[/\\([Nn]\\)/g,"thumbs down"],' + "\n" +
                '[/\\([Yy]\\)/g,"thumbs up"],' + "\n" +
                '[/\\(um\\)/g,"umbrella"],' + "\n" +
                '[/:-?\\[/g,"vampire bat"],' + "\n" +
                '[/:-w/g,"waiting"],' + "\n" +
                '[/\\([Ww]\\)/g,"wilted rose"],' + "\n" +
                '[/:-&quot;/g,"whistling"],' + "\n" +
                '[/\\(%\\)/g,"ying yang"],' + "\n" +
            '];' + "\n" +
            'tp[meth+"_mmap"] = {' + "\n" +
                // MSN image map
                '"airplane":"60_60",' + "\n" +
                '"angry":"angry_smile",' + "\n" +
                '"angel":"angel_smile",' + "\n" +
                '"barring teeth":"48_48",' + "\n" +
                '"big nose wink":"wink_smile",' + "\n" +
                '"beer":"beer_mug",' + "\n" +
                '"bowl":"56_56",' + "\n" +
                '"boy":"guy",' + "\n" +
                '"broken heart":"broken_heart",' + "\n" +
                '"cake":"cake",' + "\n" +
                '"cat":"cat",' + "\n" +
                '"camera":"camera",' + "\n" +
                '"car":"59_59",' + "\n" +
                '"clock":"clock",' + "\n" +
                '"coffee":"coffee",' + "\n" +
                '"coins":"69_69",' + "\n" +
                '"computer":"63_63",' + "\n" +
                '"cool":"shades_smile",' + "\n" +
                '"confused":"confused_smile",' + "\n" +
                '"cry":"cry_smile",' + "\n" +
                '"devil":"devil_smile",' + "\n" +
                '"disappointed":"what_smile",' + "\n" +
                '"dog":"dog",' + "\n" +
                '"dont know":"71_71",' + "\n" +
                '"dont know":"71_71",' + "\n" +
                '"dont tell":"47_47",' + "\n" +
                '"email":"envelope",' + "\n" +
                '"embarrassed":"red_smile",' + "\n" +
                '"equal grin":"regular_smile",' + "\n" +
                '"equal sad":"sad_smile",' + "\n" +
                '"equal smile":"regular_smile",' + "\n" +
                '"equal tongue":"tongue_smile",' + "\n" +
                '"eye rolling":"75_75",' + "\n" +
                '"filmstrip":"film",' + "\n" +
                '"frown":"sad_smile",' + "\n" +
                '"gift":"present",' + "\n" +
                '"girl":"girl",' + "\n" +
                '"grin":"teeth_smile",' + "\n" +
                '"heart":"heart",' + "\n" +
                '"half moon":"moon",' + "\n" +
                '"island":"62_62",' + "\n" +
                '"left hug":"guy_hug",' + "\n" +
                '"light bulb":"lightbulb",' + "\n" +
                '"lightning":"73_73",' + "\n" +
                '"martini":"martini",' + "\n" +
                '"mobile phone":"64_64",' + "\n" +
                '"msn icon":"messenger",' + "\n" +
                '"music note":"note",' + "\n" +
                '"nerd":"49_49",' + "\n" +
                '"nose grin":"teeth_smile",' + "\n" +
                '"nose sad":"sad_smile",' + "\n" +
                '"nose smile":"regular_smile",' + "\n" +
                '"nose tongue":"tongue_smile",' + "\n" +
                '"nose wink":"wink_smile",' + "\n" +
                '"party":"74_74",' + "\n" +
                '"telephone":"phone",' + "\n" +
                '"pizza":"57_57",' + "\n" +
                '"plate":"55_55",' + "\n" +
                '"red lips":"kiss",' + "\n" +
                '"red rose":"rose",' + "\n" +
                '"right hug":"girl_hug",' + "\n" +
                '"sarcastic":"50_50",' + "\n" +
                '"sheep":"70_70",' + "\n" +
                '"shocked":"omg_smile",' + "\n" +
                '"sick":"52_52",' + "\n" +
                '"sleepy":"77_77",' + "\n" +
                '"smile":"regular_smile",' + "\n" +
                '"snail":"53_53",' + "\n" +
                '"soccer ball":"58_58",' + "\n" +
                '"star":"star",' + "\n" +
                '"storm cloud":"66_66",' + "\n" +
                '"tongue":"tongue_smile",' + "\n" +
                '"thinking":"72_72",' + "\n" +
                '"thumbs up":"thumbs_up",' + "\n" +
                '"thumbs down":"thumbs_down",' + "\n" +
                '"umbrella":"61_61",' + "\n" +
                '"vampire bat":"bat",' + "\n" +
                '"wilted rose":"wilted_rose",' + "\n" +
                '"wink":"wink_smile"' + "\n" +
            '};' + "\n" +
            'tp[meth+"_ymap"] = {' + "\n" +
                // Yahoo image map
                '"alien":"61",' + "\n" +
                '"angrier":"14",' + "\n" +
                '"april":"74",' + "\n" +
                '"billy":"73",' + "\n" +
                '"black eye":"66",' + "\n" +
                '"blushing":"9",' + "\n" +
                '"bucktooth":"26",' + "\n" +
                '"caffeine":"57",' + "\n" +
                '"chicken":"52",' + "\n" +
                '"clover":"54",' + "\n" +
                '"clown":"34",' + "\n" +
                '"cooler":"16",' + "\n" +
                '"coy smile":"5",' + "\n" +
                '"doh":"40",' + "\n" +
                '"equal slant":"7",' + "\n" +
                '"flag":"55",' + "\n" +
                '"frustrated":"62",' + "\n" +
                '"hiro":"72",' + "\n" +
                '"hypnotized":"43",' + "\n" +
                '"inlove":"8",' + "\n" +
                '"just kidding":"78",' + "\n" +
                '"kiss":"11",' + "\n" +
                '"loser":"30",' + "\n" +
                '"lying":"44",' + "\n" +
                '"monkey":"51",' + "\n" +
                '"money eyes":"64",' + "\n" +
                '"nail biting":"42",' + "\n" +
                '"not talking":"33",' + "\n" +
                '"pig":"49",' + "\n" +
                '"pink rose":"53",' + "\n" +
                '"praying":"63",' + "\n" +
                '"pumpkin":"56",' + "\n" +
                '"shame on you":"68",' + "\n" +
                '"sicker":"31",' + "\n" +
                '"sigh":"46",' + "\n" +
                '"silly":"35",' + "\n" +
                '"skull":"59",' + "\n" +
                '"slant":"7",' + "\n" +
                '"sleepier":"28",' + "\n" +
                '"smug":"15",' + "\n" +
                '"straightface":"22",' + "\n" +
                '"talk to the hand":"27",' + "\n" +
                '"tired":"37",' + "\n" +
                '"waiting":"45",' + "\n" +
                '"whew":"18",' + "\n" +
                '"whistling":"65",' + "\n" +
                '"ying yang":"75"' + "\n" +
            '};' + "\n" +
            'tp["_"+meth] = tp[meth];' + "\n" +
            'tp[meth] = function(a) {' + "\n" +
                'var reps = tp[meth+"_reps"];' + "\n" +
                'var mmap = tp[meth+"_mmap"];' + "\n" +
                'var ymap = tp[meth+"_ymap"];' + "\n" +
                'for (var i in reps) {' + "\n" +
                    'a = a.replace(reps[i][0], "<e t=\'"+reps[i][1]+"\'>");' + "\n" +
                '}' + "\n" +
                'for( var b=a.match(/<e t=[\'"]([\\w ]+)[\'"]>/); b!=null; b=a.match(/<e t=[\'"]([\\w ]+)[\'"]>/)) { ' + "\n" +
                    'var c="";' + "\n" +
                    'if (!c && mmap[b[1]]) c = "<img src=\'http://messenger.msn.com/Resource/emoticons/"+mmap[b[1]]+".gif\' />";' + "\n" +
                    'if (!c && ymap[b[1]]) c = "<img src=\'http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons6/"+ymap[b[1]]+".gif\' />";' + "\n" +
                    'if (!c) c = top.js._BZ_RotaSmile[ws](b[1]);' + "\n" +
                    'a=a.replace( /<e t=[\'"]([\\w ]+)[\'"]>/, c)' + "\n" +
                '}' + "\n" +
                'return a;' + "\n" +
            '};' + "\n" +
        '}' + "\n" +
    '})();' + "\n" +
    "";
var script = document.createElement('script');
script.appendChild(document.createTextNode(scriptText));
first('head').appendChild(script);

})(); // end anonymous function wrapper</source>