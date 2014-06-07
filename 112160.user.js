// ==UserScript==
// @name           Facebook Yahoo Emoticons Bar
// @namespace      http://scripts.namdx1987.org/
// @description    Yahoo emoticons bar for Facebook
// @version        0.2.1
// @include        http://www.facebook.com/*
// ==/UserScript==

var document=unsafeWindow.document;

var yahooset={"emoticons":[{"id":1,"width":24,"height":24,"alt":"Happy","shortcuts":[":)",":-)","(-:","(:"]},{"id":2,"width":24,"height":24,"alt":"Sad","shortcuts":[":(",":-("]},{"id":3,"width":24,"height":24,"alt":"Winking","shortcuts":[";)",";-)"]},{"id":4,"width":24,"height":24,"alt":"Grin","shortcuts":[":D",":-D"]},{"id":5,"width":24,"height":24,"alt":"Eyelashes","shortcuts":[";;)",";;-)"]},{"id":6,"width":60,"height":24,"alt":"Hug","shortcuts":[">:D<"]},{"id":7,"width":30,"height":24,"alt":"Confused","shortcuts":[":-/",":-\\",":S"]},{"id":8,"width":26,"height":24,"alt":"Love","shortcuts":[":X",":x",":-x","(L)"]},{"id":9,"width":24,"height":24,"alt":"Blushing","shortcuts":[":``>",":\">",":$"]},{"id":10,"width":24,"height":24,"alt":"Tongue","shortcuts":[":P",":-P"]},{"id":11,"width":24,"height":24,"alt":"Kiss","shortcuts":[":-*",":*"]},{"id":12,"width":28,"height":24,"alt":"Broken","shortcuts":["=(("]},{"id":13,"width":24,"height":24,"alt":"Surprise","shortcuts":[":-O",":O"]},{"id":14,"width":27,"height":24,"alt":"Angry","shortcuts":["X(","X-(",":@"]},{"id":15,"width":24,"height":24,"alt":"Smug","shortcuts":[":>",":->"]},{"id":16,"width":24,"height":24,"alt":"Cool","shortcuts":["B-)"]},{"id":17,"width":24,"height":24,"alt":"Worried","shortcuts":[":-S"]},{"id":18,"width":39,"height":24,"alt":"Whew","shortcuts":["#:-S"]},{"id":19,"width":24,"height":24,"alt":"Devil","shortcuts":[">:)"]},{"id":20,"width":38,"height":24,"alt":"Crying","shortcuts":[":((",":-((",":'("]},{"id":21,"width":24,"height":24,"alt":"Laughing","shortcuts":[":))",":-))"]},{"id":22,"width":24,"height":24,"alt":"Straight","shortcuts":[":|",":-|"]},{"id":23,"width":24,"height":24,"alt":"Eyebrows","shortcuts":["/:)","/:-)","^o)"]},{"id":24,"width":42,"height":24,"alt":"Rolling","shortcuts":["=))"]},{"id":25,"width":46,"height":24,"alt":"Angel","shortcuts":["O:-)","o:-)","0:-)","o:)","0:)"]},{"id":26,"width":28,"height":24,"alt":"Nerd","shortcuts":[":-B",":B"]},{"id":27,"width":36,"height":24,"alt":"Talk Hand","shortcuts":["=;"]},{"id":28,"width":27,"height":24,"alt":"Sleepy","shortcuts":["I-)","|-)"]},{"id":29,"width":24,"height":24,"alt":"Roll Eyes","shortcuts":["8-|","8-)"]},{"id":30,"width":28,"height":24,"alt":"Loser","shortcuts":["L-)"]},{"id":31,"width":27,"height":24,"alt":"Sick","shortcuts":[":-&","+o("]},{"id":32,"width":24,"height":24,"alt":"Shhh!","shortcuts":[":-$",":-#"]},{"id":33,"width":24,"height":24,"alt":"No Talking","shortcuts":["[-("]},{"id":34,"width":40,"height":24,"alt":"Clown","shortcuts":[":O)",":o)",":0)","<@:)"]},{"id":35,"width":34,"height":24,"alt":"Silly","shortcuts":["8-}"]},{"id":36,"width":38,"height":24,"alt":"Party","shortcuts":["<:-P","<:o)"]},{"id":37,"width":24,"height":24,"alt":"Yawn","shortcuts":["(:|","(:}"]},{"id":38,"width":24,"height":24,"alt":"Drooling","shortcuts":["=P~"]},{"id":39,"width":25,"height":24,"alt":"Thinking","shortcuts":[":-?","*-)"]},{"id":40,"width":24,"height":24,"alt":"D`oh","shortcuts":["#-o"]},{"id":41,"width":32,"height":24,"alt":"Applause","shortcuts":["=D>"]},{"id":42,"width":34,"height":24,"alt":"Nail Biting","shortcuts":[":-SS"]},{"id":43,"width":24,"height":24,"alt":"Hypnotized","shortcuts":["@-)"]},{"id":44,"width":33,"height":24,"alt":"Liar","shortcuts":[":^o",":^O"]},{"id":45,"width":31,"height":24,"alt":"Waiting","shortcuts":[":-w"]},{"id":46,"width":24,"height":24,"alt":"Sigh","shortcuts":[":-<"]},{"id":47,"width":24,"height":24,"alt":"Phbbbbt","shortcuts":[">:P"]},{"id":48,"width":34,"height":24,"alt":"Cowboy","shortcuts":["<):)"]},{"id":49,"width":28,"height":24,"alt":"Pig","shortcuts":[":@)"]},{"id":50,"width":27,"height":24,"alt":"Cow","shortcuts":["3:-O","3:-0"]},{"id":51,"width":32,"height":24,"alt":"Monkey","shortcuts":[":(|)"]},{"id":52,"width":24,"height":24,"alt":"Chicken","shortcuts":["~:>"]},{"id":53,"width":25,"height":24,"alt":"Rose","shortcuts":["@};-"]},{"id":54,"width":25,"height":24,"alt":"Good Luck","shortcuts":["%%-"]},{"id":55,"width":36,"height":24,"alt":"Flag","shortcuts":["**=="]},{"id":56,"width":27,"height":24,"alt":"Pumpkin","shortcuts":["(~~)"]},{"id":57,"width":24,"height":24,"alt":"Coffee","shortcuts":["~O)","~o)"]},{"id":58,"width":24,"height":24,"alt":"Idea","shortcuts":["*-:)"]},{"id":59,"width":24,"height":24,"alt":"Skull","shortcuts":["8-X"]},{"id":60,"width":27,"height":24,"alt":"Bug","shortcuts":["=:)","=:-)"]},{"id":61,"width":24,"height":24,"alt":"Alien","shortcuts":[">-)"]},{"id":62,"width":24,"height":24,"alt":"Frustrated","shortcuts":[":-L"]},{"id":63,"width":24,"height":24,"alt":"Praying","shortcuts":["[-O<"]},{"id":64,"width":24,"height":24,"alt":"Money Eyes","shortcuts":["$-)"]},{"id":65,"width":34,"height":24,"alt":"Whistling","shortcuts":[":-``",":-\""]},{"id":66,"width":30,"height":24,"alt":"Beat Up","shortcuts":["b-("]},{"id":67,"width":34,"height":24,"alt":"Peace Sign","shortcuts":[":)>-"]},{"id":68,"width":38,"height":24,"alt":"Shame On","shortcuts":["[-X"]},{"id":69,"width":46,"height":24,"alt":"Dancing","shortcuts":["\\:D/"]},{"id":70,"width":36,"height":24,"alt":"Bring On","shortcuts":[">:/"]},{"id":71,"width":27,"height":24,"alt":"Hee Hee","shortcuts":[";))"]},{"id":72,"width":24,"height":24,"alt":"Hiro","shortcuts":["o->"]},{"id":73,"width":26,"height":24,"alt":"Billy","shortcuts":["o=>"]},{"id":74,"width":24,"height":24,"alt":"April","shortcuts":["o-+"]},{"id":75,"width":24,"height":24,"alt":"Yin Yang","shortcuts":["(%)"]},{"id":76,"width":44,"height":24,"alt":"Chatter Box","shortcuts":[":-@"]},{"id":77,"width":48,"height":24,"alt":"Not Worthy","shortcuts":["^:)^"]},{"id":78,"width":32,"height":24,"alt":"Oh Go On","shortcuts":[":-j"]},{"id":79,"width":31,"height":24,"alt":"Star","shortcuts":["(*)"]},{"id":100,"width":46,"height":24,"alt":"On Phone","shortcuts":[":)]"]},{"id":101,"width":39,"height":24,"alt":"Call Me","shortcuts":[":-c"]},{"id":102,"width":66,"height":24,"alt":"At Wits","shortcuts":["~X(","~x("]},{"id":103,"width":40,"height":24,"alt":"Wave","shortcuts":[":-h"]},{"id":104,"width":46,"height":24,"alt":"Time Out","shortcuts":[":-t"]},{"id":105,"width":33,"height":24,"alt":"Dreaming","shortcuts":["8->"]},{"id":106,"width":57,"height":24,"alt":"I Dunno","shortcuts":[":-??"]},{"id":107,"width":76,"height":24,"alt":"Not Listen","shortcuts":["%-("]},{"id":108,"width":46,"height":24,"alt":"Puppy Eyes","shortcuts":[":o3"]},{"id":109,"width":42,"height":24,"alt":"Rock On!","shortcuts":["\\m/"]},{"id":110,"width":34,"height":24,"alt":"Commando","shortcuts":["^:)","^:|"]},{"id":111,"width":28,"height":24,"alt":"Dunwant See","shortcuts":["X_X"]},{"id":112,"width":24,"height":24,"alt":"Thumbs Up","shortcuts":[":-bd"]},{"id":113,"width":37,"height":24,"alt":"Thumbs Down","shortcuts":[":-q"]},{"id":114,"width":36,"height":24,"alt":"Thank You","shortcuts":["_||_","^#(^"]},{"id":115,"width":34,"height":24,"alt":"Hurry Up!","shortcuts":[":!!"]},{"id":121,"width":24,"height":24,"alt":"Ninja","shortcuts":[":nj"]},{"id":122,"width":105,"height":24,"alt":"Double NJ","shortcuts":[":nj:nj"]},{"id":123,"width":28,"height":24,"alt":"Pirate","shortcuts":[":ar!"]},{"id":124,"width":42,"height":24,"alt":"Adam","shortcuts":[":-a"]},{"id":125,"width":40,"height":24,"alt":"Eve","shortcuts":[":-e"]},{"id":126,"width":54,"height":24,"alt":"Stinky","shortcuts":[":~("]},{"id":127,"width":55,"height":24,"alt":"Tomato","shortcuts":[">#("]},{"id":128,"width":44,"height":24,"alt":"Bride","shortcuts":[":-)@"]},{"id":129,"width":24,"height":24,"alt":"Groom","shortcuts":[":-)8"]},{"id":131,"width":31,"height":24,"alt":"Tahitian","shortcuts":["@:)"]},{"id":132,"width":32,"height":24,"alt":"Number 2","shortcuts":["~@"]},{"id":133,"width":52,"height":24,"alt":"Hot Pepper","shortcuts":["{>"]},{"id":134,"width":24,"height":24,"alt":"Beer","shortcuts":["()]"]},{"id":135,"width":31,"height":24,"alt":"Busy Bee","shortcuts":[":bz"]},{"id":136,"width":46,"height":24,"alt":"Bull","shortcuts":["}:8"]},{"id":137,"width":33,"height":24,"alt":"Cat","shortcuts":["=^^="]},{"id":138,"width":38,"height":24,"alt":"Fishy","shortcuts":["o-{"]},{"id":139,"width":28,"height":24,"alt":"Heart","shortcuts":["<3"]},{"id":140,"width":24,"height":24,"alt":"The Finger","shortcuts":["<^>"]},{"id":141,"width":25,"height":24,"alt":"Mooning","shortcuts":["(|)"]},{"id":142,"width":24,"height":24,"alt":"Nose Pick","shortcuts":[":~)"]},{"id":143,"width":39,"height":24,"alt":"Drunk","shortcuts":["%-}"]},{"id":144,"width":38,"height":24,"alt":"Number 1","shortcuts":[":)~*"]},{"id":145,"width":50,"height":24,"alt":"Whip","shortcuts":[":/\\/"]},{"id":146,"width":26,"height":24,"alt":"Backstabbed","shortcuts":["->:o"]},{"id":147,"width":27,"height":24,"alt":"Explode","shortcuts":["*:o*"]},{"id":148,"width":30,"height":24,"alt":"Jerk","shortcuts":[":jo"]},{"id":149,"width":33,"height":24,"alt":"First Sight","shortcuts":["8-p"]},{"id":150,"width":25,"height":24,"alt":"Stripper","shortcuts":[":-xxx"]},{"id":151,"width":30,"height":24,"alt":"Transformer","shortcuts":["[..]"]},{"id":152,"width":54,"height":24,"alt":"Hero","shortcuts":["\\s/"]},{"id":153,"width":37,"height":24,"alt":"Poke","shortcuts":[":p^"]},{"id":155,"width":32,"height":24,"alt":"So sweet","shortcuts":[";;>"]}],"shortcuts":{":)":0,":-)":0,"(-:":0,"(:":0,":(":1,":-(":1,";)":2,";-)":2,":D":3,":-D":3,";;)":4,";;-)":4,">:D<":5,":-/":6,":-\\":6,":S":6,":X":7,":x":7,":-x":7,"(L)":7,":``>":8,":\">":8,":$":8,":P":9,":-P":9,":-*":10,":*":10,"=((":11,":-O":12,":O":12,"X(":13,"X-(":13,":@":13,":>":14,":->":14,"B-)":15,":-S":16,"#:-S":17,">:)":18,":((":19,":-((":19,":'(":19,":))":20,":-))":20,":|":21,":-|":21,"/:)":22,"/:-)":22,"^o)":22,"=))":23,"O:-)":24,"o:-)":24,"0:-)":24,"o:)":24,"0:)":24,":-B":25,":B":25,"=;":26,"I-)":27,"|-)":27,"8-|":28,"8-)":28,"L-)":29,":-&":30,"+o(":30,":-$":31,":-#":31,"[-(":32,":O)":33,":o)":33,":0)":33,"<@:)":33,"8-}":34,"<:-P":35,"<:o)":35,"(:|":36,"(:}":36,"=P~":37,":-?":38,"*-)":38,"#-o":39,"=D>":40,":-SS":41,"@-)":42,":^o":43,":^O":43,":-w":44,":-<":45,">:P":46,"<):)":47,":@)":48,"3:-O":49,"3:-0":49,":(|)":50,"~:>":51,"@};-":52,"%%-":53,"**==":54,"(~~)":55,"~O)":56,"~o)":56,"*-:)":57,"8-X":58,"=:)":59,"=:-)":59,">-)":60,":-L":61,"[-O<":62,"$-)":63,":-``":64,":-\"":64,"b-(":65,":)>-":66,"[-X":67,"\\:D/":68,">:/":69,";))":70,"o->":71,"o=>":72,"o-+":73,"(%)":74,":-@":75,"^:)^":76,":-j":77,"(*)":78,":)]":79,":-c":80,"~X(":81,"~x(":81,":-h":82,":-t":83,"8->":84,":-??":85,"%-(":86,":o3":87,"\\m/":88,"^:)":89,"^:|":89,"X_X":90,":-bd":91,":-q":92,"_||_":93,"^#(^":93,":!!":94,":nj":95,":nj:nj":96,":ar!":97,":-a":98,":-e":99,":~(":100,">#(":101,":-)@":102,":-)8":103,"@:)":104,"~@":105,"{>":106,"()]":107,":bz":108,"}:8":109,"=^^=":110,"o-{":111,"<3":112,"<^>":113,"(|)":114,":~)":115,"%-}":116,":)~*":117,":/\\/":118,"->:o":119,"*:o*":120,":jo":121,"8-p":122,":-xxx":123,"[..]":124,"\\s/":125,":p^":126,";;>":127},"pattern":"#(?:-o|:-S)|\\$-\\)|%(?:%-|-(?:\\(|\\}))|\\((?:%\\)|\\)\\]|\\*\\)|-:|:(?:\\||\\})?|L\\)|\\|\\)|~~\\))|\\*(?:\\*==|-(?:\\)|:\\))|:o\\*)|\\+o\\(|->:o|/:(?:\\)|-\\))|0:(?:\\)|-\\))|3:-(?:0|O)|8-(?:\\)|>|X|p|\\||\\})|:(?:!!|\">|\\$|'\\(|\\((?:\\(|\\|\\))?|\\)(?:\\)|>-|\\]|~\\*)?|\\*|-(?:\"|#|\\$|&|\\((?:\\()?|\\)(?:\\)|8|@)?|\\*|/|<|>|\\?(?:\\?)?|@|B|D|L|O|P|S(?:S)?|\\\\|``|a|bd|c|e|h|j|q|t|w|x(?:xx)?|\\|)|/\\\\/|0\\)|>|@(?:\\))?|B|D|O(?:\\))?|P|S|X|\\^(?:O|o)|``>|ar!|bz|jo|nj(?::nj)?|o(?:\\)|3)|p\\^|x|\\||~(?:\\(|\\)))|;(?:\\)(?:\\))?|-\\)|;(?:\\)|-\\)|>))|<(?:\\):\\)|3|:(?:-P|o\\))|@:\\)|\\^>)|=(?:\\(\\(|\\)\\)|:(?:\\)|-\\))|;|D>|P~|\\^\\^=)|>(?:#\\(|-\\)|:(?:\\)|/|D<|P))|@(?:-\\)|:\\)|\\};-)|B-\\)|I-\\)|L-\\)|O:-\\)|X(?:\\(|-\\(|_X)|\\[(?:-(?:\\(|O<|X)|\\.\\.\\])|\\\\(?::D/|m/|s/)|\\^(?:#\\(\\^|:(?:\\)(?:\\^)?|\\|)|o\\))|_\\|\\|_|b-\\(|o(?:-(?:\\+|>|\\{)|:(?:\\)|-\\))|=>)|\\{>|\\|-\\)|\\}:8|~(?::>|@|O\\)|X\\(|o\\)|x\\()"}

var currentTextArea;
var currentString="";

function l(e)
{
    var target=e.target;
    
    if(target.localName=="textarea")
    {
        currentTextArea=target;
        currentString=currentTextArea.value;
    }
}

function b(e)
{
    var target=e.target;
    
    if(target.localName=="textarea")
    {
        currentString=currentTextArea.value;
    }
}


document.addEventListener("focus", l, true);
document.addEventListener("blur", b, true);

var bar=document.createElement("div");

var tab1=document.createElement("div");
var tab2=document.createElement("div");

tab1.style.display="none";
tab1.style.position="fixed";
tab1.style.bottom=20;

tab2.style.display="none";
tab2.style.position="fixed";
tab2.style.bottom=20;

document.getElementById("globalContainer").appendChild(bar);

bar.style.bottom=0;
bar.style.left=0;
bar.style.position="fixed";
bar.style.backgroundColor="#EBEEF4";
bar.style.border="1px solid rgba(29, 49, 91, 0.3)";
bar.style.padding="2px";

unsafeWindow.t=function (b1, b2)
{
    var c, o;
    
    if(!b1)
    {
        tab1.style.display="none";
        tab2.style.display="none";
        return;
    }
    
    if(b2)
    {
        c=tab1;
        o=tab2;
    }
    else
    {
        c=tab2;
        o=tab1;
    }
    
    c.style.display="";
    o.style.display="none";
    
}

bar.innerHTML="<div><span onclick='t(true, true)'><object data='http://l.yimg.com/us.yimg.com/lib/msg/eden/smiley/v3/1.swf' width='24' height='24'><param name='wmode' value='transparent'/></object></span> <span onclick='t(true, false)'><object data='http://l.yimg.com/us.yimg.com/lib/msg/eden/smiley/v3/32.swf' width='24' height='24'><param name='wmode' value='transparent'/></object></span> <span onclick='t(false)'><img src='http://icons.iconarchive.com/icons/deleket/button/16/Button-Cancel-icon.png'/></span><div>";


bar.appendChild(tab1);
bar.appendChild(tab2);

function emoclick(e)
{
    unsafeWindow.console.log("clicked");
    if(currentTextArea)
    {
        var idx=this.idx;
        
            var start=currentTextArea.selectionStart;
            var end=currentTextArea.selectionEnd;
            var yemo=yahooset.emoticons[idx].shortcuts[0];
            currentString=currentTextArea.value=currentString.substring(0, start)+yemo+currentTextArea.value.substr(end);
            var spos=start+yemo.length;
            currentTextArea.setSelectionRange(spos, spos);
    }
} 
//document.addEventListener("click", emoclick, true);
function createTable(from, to)
{
    var size=8;
    
    var current=from;
    
    var result=document.createElement("table");
    for(var i=0;i<size;i++)
    {
        if(current>to)
            break;
            
        var r=result.insertRow(-1);
        for(var j=0;j<size;j++)
        {
            if(current>to)
                break;
            
            var c=r.insertCell(-1);
            c.style.textAlign="center";
            var o=document.createElement("object");
            o.data="http://l.yimg.com/us.yimg.com/lib/msg/eden/smiley/v3/"+yahooset.emoticons[current].id+".swf";
            c.idx=current;
            o.width=yahooset.emoticons[current].width/3*2;
            o.height=yahooset.emoticons[current].height/3*2;
            
            c.addEventListener("click", emoclick, true);
            
            o.setAttribute("wmode","transparent");
			
            c.appendChild(o);
            
            
            
            current++;
        }
    }
    result.style.padding="2px";
    result.style.position="fixed";
    result.style.bottom="30px";
    result.style.border="1px solid rgba(29, 49, 91, 0.3)";
    result.style.backgroundColor="#EBEEF4";
    result.style.zIndex="500";
    result.style.left="5px";
    return result;
}

tab1.appendChild(createTable(0, 63));
tab2.appendChild(createTable(64, 127));