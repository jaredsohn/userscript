// ==UserScript==
// @name           eUkraine Training Ground Revamp (eRep)
// @namespace      http://www.erepublik.com/en/referrer/Ceriy
// @description    eUkraine Training Ground Revamp (eRep) based on eUS Training Revamp mabe by Publius
// @version        0.15
// @include        http://ww*.erepublik.com/*/my-places/army
// @include        http://ww*.erepublik.com/*/my-places/train/*
// @include        http://ww*.erepublik.com/*/train_human_check/*
// @require http://sizzlemctwizzle.com/updater.php?id=65315
// ==/UserScript==

//Names and pics of the replacement generals
var generals_txt = ["Іван Богун", "Іван Мазепа", "Богдан Хмельницький"];
var generals_pix = ["http://img16.imageshack.us/img16/2309/bohun.png", "http://img682.imageshack.us/img682/820/mazepa.png", "http://img6.imageshack.us/img6/8862/khmelnytsky.png"];

function replace_generals()
{
    //Replace the advanced trainers with Ukrainian leaders

    //Get the divs for the trainers
    var old_generals = document.evaluate("id('content')/div[2]/div[2]/div[2]/div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    //Start at i = 1 because the first container is a blank face
    for(var i = 1; i < old_generals.snapshotLength; i++)
    {
        old_generals.snapshotItem(i).innerHTML = ' <a href="/en/my-places/train/' + i + '"> <h4>+' + 50*Math.pow(2,i-1) + '%</h4> <small><b>extra</b> training effect</small> <img src="' + generals_pix[i-1] + '" alt="Lana_' + (i*2-1) + '" height="96" width="106">					<strong>' + generals_txt[i-1] + '</strong> <h6>' + (0.15*i*i + 0.05*i + 0.3) + '</h6> </a><a class="fluid_blue_dark_big" href="/en/my-places/train/' + i + '"><span>Advanced Training &amp; Strategy</span></a>';
    };

    //Change the text in the Lana speech bubble (for after training)
    var old_general_txt  = ["Alexander the Great", "Caesar", "Napoleon"];
    var speech_bubble = document.evaluate("id('content')/div/div[2]/div[1]/p", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    var temp_speech = speech_bubble.snapshotItem(0).innerHTML;
    for(var i = 0; i < old_general_txt.length; i++)
    {
        temp_speech = temp_speech.replace(old_general_txt[i], generals_txt[i]);
    };
    speech_bubble.snapshotItem(0).innerHTML = temp_speech;
}

function replace_lana_text(newtext)
{
    var lana_speech_bubble = document.evaluate("id('content')/div[2]/div[2]/div[1]/p", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    lana_speech_bubble.snapshotItem(0).innerHTML = newtext;
}


//Replace Lana
GM_addStyle('.lana_holder { background-image:url(http://img190.imageshack.us/img190/9753/lananavy.jpg);}');

replace_generals();

replace_lana_text('Привіт, я Галя! Я хочу бути певною, що ти стаєш сильнішим з кожним днем тренувань. Якщо ти хочеш мати більший ефект від тренувань і міцнішати швидше, замов собі заняття зі стратегіі навчайся у видатних полководців минулого. Ласкаво прошу всіх цивільних і військових до <a href="http://bit.ly/5Wycfm">армійського чату</a>. Заходь під ереп ніком.');