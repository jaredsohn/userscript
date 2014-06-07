// ==UserScript==
// @name           Hogwarts Live Riddle Answerer
// @namespace      http://labourissues.com
// @description    Automatically answers those pesky riddles. 
// @include        http://www.hogwartslive.com/forest.php*
// ==/UserScript==

var d_final = document.getElementsByTagName('a');
var d_riddle = document.getElementsByTagName('span');
for (var i = 0; i < d_final.length; i++) {
	if (d_riddle[i].innerHTML.match(/he[ ]asks[ ]his[ ]riddle/)) {
		var input = document.getElementsByTagName('input');
		var counter;
		var textbox;
		var isAnswerAvailable = 1;
		for (var j = 0; j < input.length; j++ ) {
			if (input[j].getAttribute('value') == 'Guess') counter = j;
			if (input[j].getAttribute('name') == 'guess') textbox = j;
		}
		
		
		// I love you edmund. But it doesn't stop very much
		var x = d_riddle[i+2].innerHTML.split(/span/);
		var string = "";
		for (var edmund = 0; edmund < x.length; edmund+=2) 
			string = string+x[edmund];
		var y = string.split(/[<]/);
		string = "";
		for (var edmund = 0; edmund < y.length; edmund++) 
			string = string+y[edmund];
		var z = string.split(/[>]/);
		string = "";
		for (var edmund = 0; edmund < z.length; edmund++) 
			string = string+z[edmund];
		
		if (string.match(/You eat something you neither plant nor plow./)) {
			input[textbox].value = 'Salt';
		} else if (string.match(/Teacher, open thy book./)) {
			input[textbox].value = 'A butterfly';
		} else if (string.match(/My tines are long./)) {
			input[textbox].value = 'Lightning';
		} else if (string.match(/Turn us on our backs/)) {
			input[textbox].value = 'A book';
		} else if (string.match(/Bury deep,/)) {
			input[textbox].value = 'Memories';
		} else if (string.match(/It occurs once in every minute/)) {
			input[textbox].value = 'M';
		} else if (string.match(/Never ahead, ever behind,/)) {
			input[textbox].value = 'Childhood';
		} else if (string.match(/Two horses, swiftest travelling,/)) {
			input[textbox].value = 'Your eyes';
		} else if (string.match(/It can be said:/)) {
			input[textbox].value = 'A heart';
		} else if (string.match(/Round she is, yet flat as a board/)) {
			input[textbox].value = 'The moon';
		} else if (string.match(/It has a golden head/)) {
			input[textbox].value = 'coin';
		} else if (string.match(/Speak, friend, and enter!/)) {
			input[textbox].value = 'Friend';
		} else if (string.match(/A leathery snake,/)) {
			input[textbox].value = 'A whip';
		} else if (string.match(/What has roots as nobody sees,/)) {
			input[textbox].value = 'A mountain';
		} else if (string.match(/Thirty white horses on a red hill,/)) {
			input[textbox].value = 'Your teeth';
		} else if (string.match(/Voiceless it cries,/)) {
			input[textbox].value = 'The wind';
		} else if (string.match(/It cannot be seen, cannot be felt,/)) {
			input[textbox].value = 'The darkness';
		} else if (string.match(/A box without hinges, key, or lid,/)) {
			input[textbox].value = 'Eggs';
		} else if (string.match(/Alive without breath,/)) {
			input[textbox].value = 'A fish';
		} else if (string.match(/This thing all things devours:/)) {
			input[textbox].value = 'Time';
		} else if (string.match(/You feel it, but never see it and never will./)) {
			input[textbox].value = 'Your heart';
		} else if (string.match(/You must keep it after giving it./)) {
			input[textbox].value = 'Your word';
		} else if (string.match(/As light as a feather, but you can't hold it for ten minutes./)) {
			input[textbox].value = 'Your breath';
		} else if (string.match(/Has a mouth but does not speak, has a bed but never sleeps./)) {
			input[textbox].value = 'A river';
		} else if (string.match(/Runs smoother than any rhyme, loves to fall but cannot climb!/)) {
			input[textbox].value = 'Water';
		} else if (string.match(/You break it even if you name it!/)) {
			input[textbox].value = 'Silence';
		} else if (string.match(/It passes before the sun and makes no shadow./)) {
			input[textbox].value = 'The air';
		} else if (string.match(/You feed it, it lives, you give it something to drink, it dies./)) {
			input[textbox].value = 'A fire';
		} else if (string.match(/A red drum which sounds/)) {
			input[textbox].value = 'Your heart';
		} else if (string.match(/A harvest sown and reaped on the same day/)) {
			input[textbox].value = 'A war';
		} else if (string.match(/If you break me/)) {
			input[textbox].value = 'Hope';
		} else if (string.match(/All about, but cannot be seen,/)) {
			input[textbox].value = 'wind';
		} else if (string.match(/I go around in circles,/)) {
			input[textbox].value = 'A wheel';
		} else if (string.match(/Lighter than what/)) {
			input[textbox].value = 'An iceberg';
		} else if (string.match(/If a man carried my burden,/)) {
			input[textbox].value = 'A snail';
		} else if (string.match(/My life can be measured in hours,/)) {
			input[textbox].value = 'A candle';
		} else if (string.match(/Weight in my belly,/)) {
			input[textbox].value = 'Ship';
		} else if (string.match(/You can see nothing else/)) {
			input[textbox].value = 'A mirror';
		} else if (string.match(/I am always hungry,/)) {
			input[textbox].value = 'A fire';
		} else if (string.match(/Three lives have I./)) {
			input[textbox].value = 'Water';
		} else if (string.match(/Glittering points/)) {
			input[textbox].value = 'Icicles';
		} else if (string.match(/Each morning I appear/)) {
			input[textbox].value = 'A shadow';
		} else if (string.match(/Keys without locks/)) {
			input[textbox].value = 'A piano';
		} else if (string.match(/I am so simple,/)) {
			input[textbox].value = 'A compass';
		} else if (string.match(/For our ambrosia we were blessed,/)) {
			input[textbox].value = 'Bees';
		} else if (string.match(/Colored as a maiden tweaked,/)) {
			input[textbox].value = 'An apple';
		} else if (string.match(/One where none should be,/)) {
			input[textbox].value = 'A unicorn';
		} else if (string.match(/One tooth to bite,/)) {
			input[textbox].value = 'An axe';
		} else if (string.match(/The part of the bird/)) {
			input[textbox].value = 'Shadow';
		} else if (string.match(/The root tops the trunk/)) {
			input[textbox].value = 'An icicle';
		} else if (string.match(/Touching one, yet holding two,/)) {
			input[textbox].value = 'A wedding ring';
		} else if (string.match(/The wise and knowledgeable man is sure of it./)) {
			input[textbox].value = 'Nothing';
		} else if (string.match(/What is greater than God,/)) {
			input[textbox].value = 'Nothing';
		} else if (string.match(/I am a wonderful help to women,/)) {
			input[textbox].value = 'An onion';
		} else if (string.match(/Power and treasure for a prince to hold,/)) {
			input[textbox].value = 'A sword';
		} else if (string.match(/As I was going to St. Ives,/)) {
			input[textbox].value = 'One';
		} else if (string.match(/Dawns away,/)) {
			input[textbox].value = 'The sun';
		} else if (string.match(/Deep, dark, underground,/)) {
			input[textbox].value = 'A diamond';
		} else if (string.match(/What must be in the oven yet can not be baked?/)) {
			input[textbox].value = 'Yeast';
		} else if (string.match(/Little Johnny Walker,/)) {
			input[textbox].value = 'Your opinions';
		} else if (string.match(/They are many and one,/)) {
			input[textbox].value = 'Your hands';
		} else if (string.match(/Stomp, stomp,/)) {
			input[textbox].value = 'Horses';
		} else if (string.match(/Sweet tooth,/)) {
			input[textbox].value = 'Candy';
		} else if (string.match(/It comes in on little cat's feet,/)) {
			input[textbox].value = 'Fog';
		} else if (string.match(/A laugh,/)) {
			input[textbox].value = 'Emotions';
		} else if (string.match(/What is it you have to answer?/)) {
			input[textbox].value = 'A riddle';
		} else if (string.match(/I can hit you in the eye,/)) {
			input[textbox].value = 'A star';
		} else if (string.match(/Squishes,/)) {
			input[textbox].value = 'Mud';
		} else if (string.match(/Up a hill,/)) {
			input[textbox].value = 'Your home';
		} else if (string.match(/This thing is a most amazing thing./)) {
			input[textbox].value = 'Music';
		} else if (string.match(/Deep, deep, do they go./)) {
			input[textbox].value = 'Roots';
		} else if (string.match(/I bend my limbs to the ground/)) {
			input[textbox].value = 'A willow';
		} else if (string.match(/Shifting, Shifting, Drifting deep./)) {
			input[textbox].value = 'The desert';
		} else if (string.match(/I bubble and laugh/)) {
			input[textbox].value = 'A fountain';
		} else if (string.match(/What has wings,/)) {
			input[textbox].value = 'A stage';
		} else if (string.match(/Do not begrudge this,/)) {
			input[textbox].value = 'Growing old';
		} else if (string.match(/Of these things - I have two./)) {
			input[textbox].value = 'Sharing';
		} else if (string.match(/I am a strange creature,/)) {
			input[textbox].value = 'A hummingbird';
		} else if (string.match(/Sleeping during the day,/)) {
			input[textbox].value = 'A morning glory';
		} else if (string.match(/Looks like water,/)) {
			input[textbox].value = 'A mirage';
		} else if (string.match(/A part of heaven,/)) {
			input[textbox].value = 'A rainbow';
		} else if (string.match(/I stand,/)) {
			input[textbox].value = 'The open plains';
		} else if (string.match(/I was born blind,/)) {
			input[textbox].value = 'A doll';
		} else if (string.match(/My breath doth shake/)) {
			input[textbox].value = 'Old age';
		} else if (string.match(/Hick-a-more, Hack-a-more,/)) {
			input[textbox].value = 'Sunlight';
		} else if (string.match(/It was asked of me what I could be made,/)) {
			input[textbox].value = 'A tree';
		} else if (string.match(/With this you can do wonderous things./)) {
			input[textbox].value = 'Your eyes';
		} else if (string.match(/Oh how I love my dancing feet!/)) {
			input[textbox].value = 'A centipede';
		} else if (string.match(/A muttered rumble was heard from the pen,/)) {
			input[textbox].value = 'A bull';
		} else if (string.match(/Twas the night of the day/)) {
			input[textbox].value = 'An eclipse';
		} else if (string.match(/From sun up to sun down I stare out across the sea./)) {
			input[textbox].value = 'A lighthouse';
		} else if (string.match(/A lot of bark,/)) {
			input[textbox].value = 'A tree';
		} else if (string.match(/Twas in December or June,/)) {
			input[textbox].value = 'A mouse';
		} else if (string.match(/I drift,/)) {
			input[textbox].value = 'A leaf';
		} else if (string.match(/A riddle, easily solved./)) {
			input[textbox].value = 'A robin';
		} else if (string.match(/I have four of these,/)) {
			input[textbox].value = 'Fingers';
		} else if (string.match(/When I looked upon the flames of his passion,/)) {
			input[textbox].value = 'eclipse';
		} else if (string.match(/What has a coat?/)) {
			input[textbox].value = 'A bear';
		} else if (string.match(/You can tumble in it,/)) {
			input[textbox].value = 'Hay';
		} else if (string.match(/Within passion's fruit they will be found,/)) {
			input[textbox].value = 'Seeds';
		} else if (string.match(/'Twas whispered in Heaven, 'twas muttered in hell,/)) {
			input[textbox].value = 'H';
		} else if (string.match(/We are little airy creatures,/)) {
			input[textbox].value = 'The vowels';
		} else if (string.match(/I'm a strange contradiction; I'm new, and I'm old,/)) {
			input[textbox].value = 'A book';
		} else if (string.match(/As I went through the garden gap,/)) {
			input[textbox].value = 'A cherry';
		} else if (string.match(/Little Nancy Etticote,/)) {
			input[textbox].value = 'A candle';
		} else if (string.match(/I have a little sister, they call her Peep, Peep;/)) {
			input[textbox].value = 'A star';
		} else if (string.match(/I saw a company a marching,/)) {
			input[textbox].value = 'clouds';
		} else if (string.match(/I'm up./)) {
			input[textbox].value = 'The wind';
		} else if (string.match(/I can be moved./)) {
			input[textbox].value = 'A ball';
		} else if (string.match(/Upon me you can tread,/)) {
			input[textbox].value = 'Stairs';
		} else if (string.match(/What is it which builds things up?/)) {
			input[textbox].value = 'Time';
		} else if (string.match(/It sat upon a willow tree,/)) {
			input[textbox].value = 'A bird';
		} else if (string.match(/They can be harbored, but few hold water,/)) {
			input[textbox].value = 'A grudge';
		} else if (string.match(/Deep as a bowl, round as a cup,/)) {
			input[textbox].value = 'A sieve';
		} else if (string.match(/Though desert men once called me God,/)) {
			input[textbox].value = 'A cat';
		} else if (string.match(/I heard of an invading, vanquishing army/)) {
			input[textbox].value = 'Rain';
		} else if (string.match(/Tall she is, and round as a cup,/)) {
			input[textbox].value = 'A well';
		} else if (string.match(/The more of it there is,/)) {
			input[textbox].value = 'Darkness';
		} else if (string.match(/What is not enough for one,/)) {
			input[textbox].value = 'A secret';
		} else if (string.match(/What gets wetter the more it dries?/)) {
			input[textbox].value = 'A towel';
		} else if (string.match(/A long snake/)) {
			input[textbox].value = 'Whip';
		} else if (string.match(/A warrior amongst the flowers,/)) {
			input[textbox].value = 'Bees';
		} else if (string.match(/The Load-bearer, the Warrior,/)) {
			input[textbox].value = 'A horse';
		} else if (string.match(/Walks in the wind/)) {
			input[textbox].value = 'Sand';
		} else if (string.match(/The rolling hills, the heart that beats forever,/)) {
			input[textbox].value = 'The sea';
		} else if (string.match(/Listen closely, I'm hard to understand/)) {
			input[textbox].value = 'A riddle';
		} else if (string.match(/What goes through the door without pinching itself?/)) {
			input[textbox].value = 'The sun';
		} else if (string.match(/Whilst I was engaged in sitting/)) {
			input[textbox].value = 'A ship';
		} else if (string.match(/I know a word of letters three,/)) {
			input[textbox].value = 'Few';
		} else if (string.match(/Who makes it, has no need of it./)) {
			input[textbox].value = 'A coffin';
		} else if (string.match(/The man who made it didn't need it./)) {
			input[textbox].value = 'A coffin';
		} else if (string.match(/You seized me, and yet I fled/)) {
			input[textbox].value = 'Snow';
		} else if (string.match(/What has four legs in the morning,/)) {
			input[textbox].value = 'Man';
		} else if (string.match(/What is deaf, dumb and blind/)) {
			input[textbox].value = 'A mirror';
		} else if (string.match(/What is always in front of you/)) {
			input[textbox].value = 'The future';
		} else if (string.match(/What does man love more than life,/)) {
			input[textbox].value = 'Nothing';
		} else if (string.match(/A life longer than any man,/)) {
			input[textbox].value = 'A tree';
		} else if (string.match(/In the eyes it causes blindness,/)) {
			input[textbox].value = 'Smoke';
		} else if (string.match(/It stands alone, with no bone or solid form./)) {
			input[textbox].value = 'The truth';
		} else if (string.match(/What sphinxes employ,/)) {
			input[textbox].value = 'A riddle';
		} else if (string.match(/There's someone that I'm always near,/)) {
			input[textbox].value = 'Your shadow';
		} else if (string.match(/I'm often held, yet rarely touched;/)) {
			input[textbox].value = 'Tongue';
		} else if (string.match(/In the window she sat weeping./)) {
			input[textbox].value = 'A candle';
		} else if (string.match(/I'm not really more than holes tied to more/)) {
			input[textbox].value = 'A chain';
		} else if (string.match(/I've little strength, but mighty powers;/)) {
			input[textbox].value = 'A key';
		} else if (string.match(/Delivered by breath,/)) {
			input[textbox].value = 'The Riddle';
		} else if (string.match(/In daytime I lie pooled about,/)) {
			input[textbox].value = 'Darkness';
		} else if (string.match(/Devils and rogues know nothing else,/)) {
			input[textbox].value = 'Darkness';
		} else if (string.match(/Both king and horse have this, of course,/)) {
			input[textbox].value = 'Reign';
		} else if (string.match(/My spring up on the cliff./)) {
			input[textbox].value = 'A coconut';
		} else if (string.match(/Three walls and you reach water./)) {
			input[textbox].value = 'A coconut';
		} else if (string.match(/My kapa [(]a type of cloth[)] log that/)) {
			input[textbox].value = 'The sea';
		} else if (string.match(/In the morning four legs,/)) {
			input[textbox].value = 'Man';
		} else if (string.match(/My man that cannot be cut./)) {
			input[textbox].value = 'A shadow';
		} else if (string.match(/My canoes, going day and night,/)) {
			input[textbox].value = 'feet';
		} else if (string.match(/My red cave, white soldiers standing in line./)) {
			input[textbox].value = 'mouth';
		} else if (string.match(/My man crying day and night,/)) {
			input[textbox].value = 'The sea';
		} else {
			isAnswerAvailable = 0;
		}
		// if (isAnswerAvailable == 1) input[counter].click();
		break;
	}
	
}