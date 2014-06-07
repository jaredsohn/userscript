// ==UserScript==
// @name          FeynTube
// @namespace     http://www.julien-oster.de/projects/feyntube
// @description   transform YouTube comments into reasonable and smart ones
// @include       http://www.youtube.*/*
// @include       http://youtube.*/*
// ==/UserScript==

// Written 2008 by Julien Oster <feyntube@julien-oster.de>, find
// newest version at http://www.julien-oster.de/projects/feyntube
//
// Thanks to Dan Phiffer for fixing it after YouTube's redesign

var quotes = [
 " It doesn't seem to me that this fantastically marvelous universe, this tremendous range of time and space and different kinds of animals, and all the different planets, and all these atoms with all their motions, and so on, all this complicated thing can merely be a stage so that God can watch human beings struggle for good and evil — which is the view that religion has. The stage is too big for the drama.",
 " On the infrequent occasions when I have been called upon in a formal place to play the bongo drums, the introducer never seems to find it necessary to mention that I also do theoretical physics.",
 " To those who do not know mathematics it is difficult to get across a real feeling as to the beauty, the deepest beauty, of nature ... If you want to learn about nature, to appreciate nature, it is necessary to understand the language that she speaks in.",
 " Our imagination is stretched to the utmost, not, as in fiction, to imagine things which are not really there, but just to comprehend those things which are there.",
 " I think that I can safely say that nobody understands quantum mechanics.",
 " Do not keep saying to yourself, if you can possibly avoid it, \"But how can it be like that?\" because you will get \"down the drain,\" into a blind alley from which nobody has yet escaped. Nobody knows how it can be like that.",
 " The chance is high that the truth lies in the fashionable direction. But, on the off chance that it is in another direction — a direction obvious from an unfashionable view of field theory — who will find it? Only someone who has sacrificed himself by teaching himself quantum electrodynamics from a peculiar and unfashionable point of view; one that he may have to invent for himself.",
 " The worthwhile problems are the ones you can really solve or help solve, the ones you can really contribute something to. ... No problem is too small or too trivial if we can really do something about it.",
 " You say you are a nameless man. You are not to your wife and to your child. You will not long remain so to your immediate colleagues if you can answer their simple questions when they come into your office. You are not nameless to me. Do not remain nameless to yourself — it is too sad a way to be. Know your place in the world and evaluate yourself fairly, not in terms of the naïve ideals of your own youth, nor in terms of what you erroneously imagine your teacher's ideals are.",
 " You can know the name of a bird in all the languages of the world, but when you're finished, you'll know absolutely nothing whatever about the bird... So let's look at the bird and see what it's doing — that's what counts. I learned very early the difference between knowing the name of something and knowing something.",
 " There is one feature I notice that is generally missing in \"cargo cult science\"... It's a kind of scientific integrity, a principle of scientific thought that corresponds to a kind of utter honesty — a kind of leaning over backwards... For example, if you're doing an experiment, you should report everything that you think might make it invalid — not only what you think is right about it... Details that could throw doubt on your interpretation must be given, if you know them.",
 " If I could explain it to the average person, I wouldn't have been worth the Nobel Prize.",
 " I took this stuff I got out of your [O-ring] seal and I put it in ice water, and I discovered that when you put some pressure on it for a while and then undo it it doesn't stretch back. It stays the same dimension. In other words, for a few seconds at least, and more seconds than that, there is no resilience in this particular material when it is at a temperature of 32 degrees. I believe that has some significance for our problem.",
 " When playing Russian roulette the fact that the first shot got off safely is little comfort for the next.",
 " For a successful technology, reality must take precedence over public relations, for nature cannot be fooled.",
 " There in wine is found the great generalization: all life is fermentation.",
 " I think I can safely say that no one understands quantum mechanics.",
"\"The Quantum Universe has a quotation from me in every chapter — but it's a damn good book anyway\" ~ reviewing the first edition of The Quantum Universe (1987)",
 " A poet once said \"The whole universe is in a glass of wine.\" We will probably never know in what sense he meant that, for poets do not write to be understood. But it is true that if we look at a glass closely enough we see the entire universe. There are the things of physics: the twisting liquid which evaporates depending on the wind and weather, the reflections in the glass, and our imaginations adds the atoms. The glass is a distillation of the Earth's rocks, and in its composition we see the secret of the universe's age, and the evolution of the stars. What strange array of chemicals are there in the wine? How did they come to be? There are the ferments, the enzymes, the substrates, and the products. There in wine is found the great generalization: all life is fermentation. Nobody can discover the chemistry of wine without discovering, as did Louis Pasteur, the cause of much disease. How vivid is the claret, pressing its existence into the consciousness that watches it! If our small minds, for some convenience, divide this glass of wine, this universe, into parts — physics, biology, geology, astronomy, psychology, and so on — remember that Nature does not know it! So let us put it all back together, not forgetting ultimately what it is for. Let it give us one more final pleasure: drink it and forget it all!",
 " What I cannot create, I do not understand.",
 " God was invented to explain mystery. God is always invented to explain those things that you do not understand. Now, when you finally discover how something works, you get some laws which you're taking away from God; you don't need him anymore. But you need him for the other mysteries. So therefore you leave him to create the universe because we haven't figured that out yet; you need him for understanding those things which you don't believe the laws will explain, such as consciousness, or why you only live to a certain length of time — life and death — stuff like that. God is always associated with those things that you do not understand. Therefore I don't think that the laws can be considered to be like God because they have been figured out.",
" Stuck on this carousel my little eye can catch one-million-year-old light. A vast pattern — of which I am a part... What is the pattern or the meaning or the why? It does not do harm to the mystery to know a little more about it.",
 " What I cannot create, I do not understand.",
 " We scientists are clever — too clever — are you not satisfied? Is four square miles in one bomb not enough? Men are still thinking. Just tell us how big you want it.",
 " I'd hate to die twice. It's so boring.",
 " We can't define anything precisely. If we attempt to, we get into that paralysis of thought that comes to philosophers… one saying to the other: \"you don't know what you are talking about!\". The second one says: \"what do you mean by talking? What do you mean by you? What do you mean by know?\"",
 " From a long view of the history of mankind — seen from, say, ten thousand years from now, there can be little doubt that the most significant event of the 19th century will be judged as Maxwell's discovery of the laws of electrodynamics. The American Civil War will pale into provincial insignificance in comparison with this important scientific event of the same decade.",
 " Far more marvelous is the truth than any artists of the past imagined it. Why do the poets of the present not speak of it?",
 " In fact, the science of thermodynamics began with an analysis, by the great engineer Sadi Carnot, of the problem of how to build the best and most efficient engine, and this constitutes one of the few famous cases in which engineering has contributed to fundamental physical theory. Another example that comes to mind is the more recent analysis of information theory by Claude Shannon. These two analyses, incidentally, turn out to be closely related.",
 " If, in some cataclysm, all scientific knowledge were to be destroyed, and only one sentence passed on to the next generation of creatures, what statement would contain the most information in the fewest words? I believe it is the atomic hypothesis (or atomic fact, or whatever you wish to call it) that all things are made of atoms — little particles that move around in perpetual motion, attracting each other when they are a little distance apart, but repelling upon being squeezed into one another. In that one sentence you will see an enormous amount of information about the world, if just a little imagination and thinking are applied.",
 " Although we humans cut nature up in different ways, and we have different courses in different departments, such compartmentalization is really artificial...",
 " Poets say science takes away from the beauty of the stars — mere globs of gas atoms. Nothing is \"mere\". I too can see the stars on a desert night, and feel them. But do I see less or more? The vastness of the heavens stretches my imagination — stuck on this carousel my little eye can catch one-million-year-old light. A vast pattern — of which I am a part... What is the pattern or the meaning or the why? It does not do harm to the mystery to know a little more about it. For far more marvelous is the truth than any artists of the past imagined it. Why do the poets of the present not speak of it? What men are poets who can speak of Jupiter if he were a man, but if he is an immense spinning sphere of methane and ammonia must be silent?",
 " So, ultimately, in order to understand nature it may be necessary to have a deeper understanding of mathematical relationships. But the real reason is that the subject is enjoyable, and although we humans cut nature up in different ways, and we have different courses in different departments, such compartmentalization is really artificial, and we should take our intellectual pleasures where we find them.",
 " For those who want some proof that physicists are human, the proof is in the idiocy of all the different units which they use for measuring energy.",
 " The next question was — what makes planets go around the sun? At the time of Kepler some people answered this problem by saying that there were angels behind them beating their wings and pushing the planets around an orbit. As you will see, the answer is not very far from the truth. The only difference is that the angels sit in a different direction and their wings push inward.",
 " Nature uses only the longest threads to weave her patterns, so that each small piece of her fabric reveals the organization of the entire tapestry.",
 " I think that it is much more likely that the reports of flying saucers are the results of the known irrational characteristics of terrestrial intelligence than of the unknown rational efforts of extra-terrestrial intelligence.",
 " Some years ago I had a conversation with a layman about flying saucers — because I am scientific I know all about flying saucers! I said \"I don't think there are flying saucers'. So my antagonist said, \"Is it impossible that there are flying saucers? Can you prove that it's impossible?\" \"No\", I said, \"I can't prove it's impossible. It's just very unlikely\". At that he said, \"You are very unscientific. If you can't prove it impossible then how can you say that it's unlikely?\" But that is the way that is scientific. It is scientific only to say what is more likely and what less likely, and not to be proving all the time the possible and impossible. To define what I mean, I might have said to him, \"Listen, I mean that from my knowledge of the world that I see around me, I think that it is much more likely that the reports of flying saucers are the results of the known irrational characteristics of terrestrial intelligence than of the unknown rational efforts of extra-terrestrial intelligence.\" It is just more likely. That is all.",
 " Anyway, I have to argue about flying saucers on the beach with people, you know. And I was interested in this: they keep arguing that it is possible. And that's true. It is possible. They do not appreciate that the problem is not to demonstrate whether it's possible or not but whether it's going on or not.",
 " I would see people building a bridge, or they'd be making a new road, and I thought, they're crazy, they just don't understand, they don't understand.",
 " I'm glad those other people had the sense to go ahead.",
 " I'll never make that mistake again, reading the experts' opinions. Of course, you only live one life, and you make all your mistakes, and learn what not to do, and that's the end of you.",
 " I don't know what's the matter with people: they don't learn by understanding, they learn by some other way — by rote or something. Their knowledge is so fragile!",
 " And this is medicine?",
 " I returned to civilization shortly after that and went to Cornell to teach, and my first impression was a very strange one. I can't understand it any more, but I felt very strongly then. I sat in a restaurant in New York, for example, and I looked out at the buildings and I began to think, you know, about how much the radius of the Hiroshima bomb damage was and so forth... How far from here was 34th street?... All those buildings, all smashed — and so on. And I would see people building a bridge, or they'd be making a new road, and I thought, they're crazy, they just don't understand, they don't understand. Why are they making new things? It's so useless.",
 " But, fortunately, it's been useless for almost forty years now, hasn't it? So I've been wrong about it being useless making bridges and I'm glad those other people had the sense to go ahead.",
 " One time I was in the men's room of the bar and there was a guy at the urinal. He was kind of drunk, and said to me in a mean-sounding voice, \"I don't like your face. I think I'll push it in. I was scared green. I replied in an equally mean voice, \"Get out of my way, or I'll pee right through ya!\"",
 " I have to understand the world, you see.",
 " There are all kinds of interesting questions that come from a knowledge of science, which only adds to the excitement and mystery and awe of a flower.",
 " We have found it of paramount importance that in order to progress, we must recognize our ignorance and leave room for doubt.",
 " I have a friend who's an artist, and he sometimes takes a view which I don't agree with. He'll hold up a flower and say, \"Look how beautiful it is,\" and I'll agree. But then he'll say, \"I, as an artist, can see how beautiful a flower is. But you, as a scientist, take it all apart and it becomes dull.\" I think he's kind of nutty. [...] There are all kinds of interesting questions that come from a knowledge of science, which only adds to the excitement and mystery and awe of a flower. It only adds. I don't understand how it subtracts.",
 " In particular, she had a wonderful sense of humor, and I learned from her that the highest forms of understanding we can achieve are laughter and human compassion.",
 " The scientist has a lot of experience with ignorance and doubt and uncertainty, and this experience is of very great importance, I think. When a scientist doesn’t know the answer to a problem, he is ignorant. When he has a hunch as to what the result is, he is uncertain. And when he is pretty damn sure of what the result is going to be, he is still in some doubt. We have found it of paramount importance that in order to progress, we must recognize our ignorance and leave room for doubt. Scientific knowledge is a body of statements of varying degrees of certainty — some most unsure, some nearly sure, but none absolutely certain. Now, we scientists are used to this, and we take it for granted that it is perfectly consistent to be unsure, that it is possible to live and not know. But I don’t know whether everyone realizes this is true. Our freedom to doubt was born out of a struggle against authority in the early days of science. It was a very deep and strong struggle: permit us to question — to doubt — to not be sure. I think that it is important that we do not forget this struggle and thus perhaps lose what we have gained."
	      ];

var updating = false;		  
function update() {
	updating = true;
	var divs = document.getElementById('comments-view').getElementsByTagName('li');
	for (var i = 0; i < divs.length; i++) {
		if(i >= quotes.length) shuffle();
		 if (!divs[i].hasAttribute('class')) continue;
		 if (divs[i].hasAttribute('feynman')) continue;
		 if (divs[i].getAttribute('class') == 'comment') {
			var cDivs = divs[i].getElementsByTagName('div');
			for(var j = 0; j < cDivs.length; j++) {
				if(!cDivs[j].hasAttribute('class')) continue;
				divs[i].setAttribute('feynman', '1');
				if(cDivs[j].getAttribute('class') == 'comment-text') cDivs[j].innerHTML = "<p>"+quotes[i % quotes.length]+"</p>";
				else if(cDivs[j].getAttribute('class') == 'metadata') cDivs[j].innerHTML = "<div>Richard Feynman</div>";
			}
		}
		else if(divs[i].getAttribute('class') == 'comment hidden') {
			divs[i].parentNode.removeChild(divs[i]);
			i--;
		}
	}
	updating = false;
}
function shuffle() {
	for(var i = quotes.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = quotes[j];
		quotes[j] = quotes[i];
		quotes[i] = temp;
	}
}

shuffle();
update();
document.body.addEventListener("DOMNodeInserted", function() { if(!updating) { shuffle(); update(); } }, false);