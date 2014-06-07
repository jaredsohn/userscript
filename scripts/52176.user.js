// ==UserScript==
// @name          Twitexist
// @namespace     http://userscripts.org/users/96156
// @description   Replace the boring "What are you doing?" with some more interesting questions.
// @include       http://www.twitter.com/
// @include       http://twitter.com/
// @include       https://www.twitter.com/
// @include       https://twitter.com/
// ==/UserScript==

(function () {
	var twitexist = [
		"What are you not doing?", 
		"What matters to you?", 
		"Why are you here?",
		"What should you be doing?",
		"What have you done lately?",
		"What do you regret?",
		"Where is your life heading?",
		"What would you be rather doing?",
		"What were you thinking?",
		"What did you learn today?",
		"What are you afraid of?",
		"How do you feel?",
		"What's different from yesterday?",
		"What is important right now?",
		"What would you like to hear?",
		"Tell a story in six words.",
		"Wow the world with witty word play",
		"Jump to conclusions about someone",
		"Confess something embarrasing.",
		"What are you trying to say?",
		"Anything worth mentioning?",
		"Give it your best shot.",
		"Summarize your life in 140 characters.",
		"Remember your mother tongue.",
		"Is this the appropriate medium?",
		"What you say now will always be remembered.",
		"Imagine you have 10.000 followers",
		"Imagine nobody is following you",
		"What's your worst nightmare?",
		"What did you dream last night?",
		"Reply to a question from your feed.",
		"Write nothing today.",
		"How is it looking outside of the window?",
		"What's the outcome on your reputation?",
		"Why are things the way they are?",
		"Why do you do what you do?",
		"Can you imagine doing this in 5 years?",
		"What have you created lately?",
		"What are you proud of?",
		"What bothers you?",
		"What have you been obsessing about?",
		"What is everbody else doing?",
		"What is stopping you?",
		"Challenge the status-quo",
		"Start your small revolution.",
		"Make it viral.",
		"You get one chance to whine. This is it. Take it.",
		"Be this the most random thing you've said this week.",
		"Start a meme and see how well it spreads.",
		"Show some love",
		"What would you be doing if this were 100 years ago?",
		"What were you doing last year at this precise moment?",
		"What would you be doing if this were the future? (gasp!)",
		"Any notes for your future self?",
		"Choose your next words carefully...",
		"What is the guy next to you doing?",
		"What's the best thing that happened to you today?",
		"What has everybody forgotten about?",
		"What inspires you to do what you do?",
		"What made you get out of bed this morning?",
		"Tweet about tweeting.",
		"What's the other side of the story?",
		"What has everybody been overlooking?",
		"If this were your last tweet, what would it be?",
		"What's happening on the other side of the planet?",
		"What is your addiction?",
		"What is the next big thing?",
		"Imagine this is high school",
		"Imagine this is kindergarten",
		"What is your guilty pleasure?",
		"Spare us the details",
		"Tell us more",
		"What frustrates you?",
		"What have you done for the first time?",
		"What haven't you done in a long time?",
		"What does everybody else say you should be doing?",
		"Be careful, it might be a trap!",
		"How can you fix it?",
		"Think about a memory from your childhood.",
		"What useless things have you bought recently?",
		"Give something away.",
		"Do something about it.",
		"Do it and see what happens",
		"Advertise something you really believe in.",
		"Don't take it too seriously",
		"Limit your output.",
		"Avoid the obvious.",
		"Use a word nobody else used on Twitter.",
		"Make something up",
		"Translate your tweet in a language you don't know",
		"So much to tweet about, so little time...",
		"Make an obscure reference.",
		"Say it in rhymes",
		"Write a haiku",
		"What's the shortest tweet you can write?",
		"Make your tweet exactly 140 characters. Every time.",
		"What makes it remarkable?",
		"What's the soundtrack for your tweet?",
		"What does the horoscope say today?",
		"Try saying the opposite."
	];
	

	var twitexist_current = twitexist[Math.floor(Math.random() * twitexist.length)];
	
	var doing = document.evaluate("//label[@class='doing']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
	doing.innerHTML = twitexist_current;
	
	var status = document.getElementById("status");
	status.addEventListener("focus",twtxst,true);
	status.addEventListener("blur",twtxst,true);
	status.addEventListener("keyup",twtxst,true);
		

	function twtxst() {doing.innerHTML = twitexist_current;}
})();