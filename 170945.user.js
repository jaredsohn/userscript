// ==UserScript==
// @name htmlTatoebaQuiz
// @description Transform Tatoeba light view into a quiz
// @author Marcelo Stockle [http://tatoeba.org/user/profile/marcelostockle] [http://userscripts.org/users/521338]
// @version 0.0.3
// @include http://tatoeba.org/*/s/s/*
// @match http://tatoeba.org/*/s/s/*
// ==/UserScript==

function getPunctuation(str)
{
    // response: 3-bits Array:
    //   0.- left punctuation?
    //   1.- right punctuation?
    //   2.- single-char punctuation?
    var response = [false,false,false];
    var punct = "\".:,;!!??$"
    var firstC = str.charAt(0);
    var lastC = str.charAt(str.length-1);
    for (var j=0;j<punct.length;j++)
    {
        if (firstC==punct.charAt(j))
            response[0] = true;
        if (lastC==punct.charAt(j))
            response[1] = true;
    }
    if ((response[0] || response[1]) && str.length==1)
        response[2] = true;
    return response;
}

function makeInnerHTML(split)
{
    var str  = "";
    if (split.length == 1)
        str = split[0];
    else
    {
        str = "";
        for (var j=0;j<split.length;j++)
        {
            var punct = getPunctuation(split[j]);
            if (punct[2])
                str = str + split[j];
            else
            {
                var leftP = (punct[0])?split[j].charAt(0):"";
                var rightP = (punct[1])?split[j].charAt(split[j].length-1):"";
                str = str + leftP + '<input type="text" class="split" size="10">' + rightP;
            }
        }
    }
    return str;
}
function checkAnswer(inbox)
{
    if (inbox.value==inbox.name)
        inbox.style.backgroundColor="#00FF00";
    else
    {
        var newValue = "";
        for (var i=0;i<inbox.value.length;i++)
        {
            newValue = newValue + inbox.name.charAt(i);
            if (inbox.value.charAt(i)!=inbox.name.charAt(i))
            {
                i = inbox.value.length;
            }
        }
        inbox.value = newValue;
    }
}

var translations = document.getElementsByClassName("sentence directTranslation");
var right_answers = new Array();
var counter = 0;

for (var i=0;i<translations.length;i++)
{
    var split = translations[i].childNodes[2].innerHTML.split(" ");
    var textdir = translations[i].childNodes[2].dir;
    // add right answers to array
    for (var j=0;j<split.length && split.length>1;j++)
    {
        var punct = getPunctuation(split[j]);
        if (!punct[2])
        {
            var str = split[j];
            if (punct[0]) str = str.substr(1,str.length-1);
            if (punct[1]) str = str.substr(0,str.length-1);
            right_answers[counter] = str;
            counter++;
        }
    }
    // new node
    var nn = document.createElement("a");
    nn.innerHTML = makeInnerHTML(split);
    nn.className = "text"
    nn.dir = textdir;
    translations[i].removeChild(translations[i].childNodes[2]);
    translations[i].appendChild(nn);
    // flag: onclick
    translations[i].childNodes[1].onclick = function() {
        var in_array = this.parentNode.getElementsByClassName("split");
        for (var i=0;i<in_array.length;i++)
            in_array[i].value = in_array[i].name;
    }
}

// input box events
var in_array = document.getElementsByClassName("split");
for (var i=0;i<in_array.length;i++)
{
    in_array[i].name = right_answers[i];
    in_array[i].ondblclick = function(){this.value=this.name};
    in_array[i].onchange = function(){ checkAnswer(this) };
    in_array[i].onfocus = function(){ 
        var para = document.getElementsByTagName("p");
        para[0].innerHTML = "Characters: " + this.name.length;
    };
}