// ==UserScript==
// @name          Oblique Strategies
// @namespace     http://interglacial.com/~sburke/pub/
// @description	  Puts a random Oblique Strategy on each document's status line
// @include       *
// ==/UserScript==
/*					Time-stamp: "2005-06-14 04:22:29 ADT"

		"Oblique Strategies"

This Greasemonkey extension puts a randomly chosen Oblique Strategy
onto the status bar of each web page.

  The Oblique Strategies, by Brian Eno and Peter Schmidt, constitute a
set of over 100 cards, each of which is a suggestion of a course of
action or thinking to assist in creative situations.
  These famous cards have been used by many artists and creative people
all over the world since their initial publication in 1975.  For more
info on getting a real print deck of the Oblique Strategies, see
http://www.recordstore.co.uk/brianeno/


-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-

 This is a Greasemonkey user script.

 To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
 Then restart Firefox and re-visit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Oblique Strategies", and click Uninstall.

*/


(function() {
  if( parent && (parent != self) ) {
    // we're inside a frame -- skip changing the status.
  } else {
    var them =
    [
	"Return to the Introduction",
	"Decorate, decorate",
	"When is it for?",
	"Revaluation (a warm feeling)",
	"Which parts can be grouped?",
	"Short circuit (example; a man eating peas with the idea that they will improve his virility shovels them straight into his lap)",
	"Balance the consistency principle with the inconsistency principle",
	"How would you have done it?",
	"What to increase? What to reduce? What to maintain?",
	"Is there something missing?",
	"Remove specifics and convert to ambiguities",
	"Cluster analysis",
	"Abandon desire",
	"Accept advice",
	"Do nothing for as long as possible",
	"Into the impossible",
	"Emphasize the flaws",
	"Cascades",
	"Use something nearby as a model",
	"Move towards the unimportant",
	"Intentions -nobility of -humility of -credibility of",
	"Disconnect from desire",
	"Overtly resist change",
	"The most important thing is the thing most easily forgotten",
	"Courage!",
	"What context would look right?",
	"Make an exhaustive list of everything you might do and do the last thing on the list",
	"Work at a different speed",
	"State the problem in words as clearly as possible",
	"Take a break",
	"It is quite possible (after all)",
	"Lowest common denominator",
	"Take away the important parts",
	"Question the heroic",
	"Use fewer notes",
	"What is the simplest solution?",
	"Give way to your worst impulse",
	"Try faking it (from Stewart Brand)",
	"Not building a wall; making a brick",
	"Simply a matter of work",
	"Change ambiguities to specifics",
	"Change instrument roles",
	"A line has two sides",
	"Are there sections? Consider transitions",
	"You are an engineer",
	"Go to an extreme, come part way back",
	"Do the last thing first",
	"Ask your body",
	"Distorting time",
	"What is the reality of the situation?",
	"In total darkness, or in a very large room, very quietly",
	"Make a sudden, destructive unpredictable action; incorporate",
	"Twist the spine",
	"Go slowly all the way round the outside",
	"Imagine the music as a set of disconnected events",
	"Faced with a choice, do both (from Dieter Rot)",
	"Put in earplugs",
	"Listen in total darkness, or in a very large room, very quietly",
	"You can only make one dot at a time",
	"Do the washing up",
	"Reverse",
	"Look at the order in which you do things",
	"Take away the elements in order of apparent non-importance",
	"Make it more sensual",
	"Just carry on",
	"Children -speaking -singing",
	"Find a safe part and use it as an anchor",
	"You don't have to be ashamed of using your own ideas",
	"The inconsistency principle",
	"Voice your suspicions",
	"Be extravagant",
	"Think of the radio",
	"The most easily forgotten thing is the most important",
	"Emphasize differences",
	"Ask people to work against their better judgement",
	"Give the game away",
	"Accretion",
	"Ghost echoes",
	"Go to an extreme, move back to a more comfortable place",
	"Destroy nothing; Destroy the most important thing",
	"Bridges -build -burn",
	"Discard an axiom",
	"State the problem as clearly as possible",
	"Go outside. Shut the door.",
	"Tidy up",
	"Do the words need changing?",
	"Spectrum analysis",
	"Use `unqualified' people",
	"Don't break the silence",
	"Once the search has begun, something will be found",
	"Use cliches",
	"What wouldn't you do?",
	"Breathe more deeply",
	"What mistakes did you make last time?",
	"Use an unacceptable color",
	"Slow preparation, fast execution",
	"Tape your mouth (given by Ritva Saarikko)",
	"Consider different fading systems",
	"Is the tuning appropriate?",
	"Turn it upside down",
	"Is the style right?",
	"Be less critical",
	"Listen to the quiet voice",
	"Convert a melodic element into a rhythmic element",
	"Imagine the piece as a set of disconnected events",
	"Openly resist change",
	"Define an area as `safe' and use it as an anchor",
	"Left channel, right channel, centre channel",
	"Repetition is a form of change",
	"Question the heroic approach",
	"Use an old idea",
	"Always give yourself credit for having more than personality (given by Arto Lindsay)",
	"Do we need holes?",
	"Assemble some of the instruments in a group and treat the group",
	"Once the search is in progress, something will be found",
	"Use filters",
	"Look closely at the most embarrassing details and amplify them",
	"Don't be frightened to display your talents",
	"Is something missing?",
	"Use your own ideas",
	"Mechanicalize something idiosyncratic",
	"(Organic) machinery",
	"Consider transitions",
	"Is the intonation correct?",
	"Get your neck massaged",
	"Magnify the most difficult details",
	"Where is the edge?",
	"Humanize something free of error",
	"Allow an easement (an easement is the abandonment of a stricture)",
	"Honor thy error as a hidden intention",
	"Change specifics to ambiguities",
	"Do something sudden, destructive and unpredictable",
	"From nothing to more than nothing",
	"Fill every beat with something",
	"Mute and continue",
	"Change nothing and continue with immaculate consistency",
	"Make a blank valuable by putting it in an exquisite frame",
	"Think - inside the work -outside the work",
	"What would your closest friend do?",
	"What are the sections sections of? Imagine a caterpillar moving",
	"Make what's perfect more human",
	"Change nothing and continue consistently",
	"Discover the recipes you are using and abandon them",
	"Be less critical more often",
	"Idiot glee (?)",
	"Always first steps",
	"Destroy -nothing -the most important thing",
	"Adding on",
	"Remember those quiet evenings",
	"Abandon normal instructions",
	"Infinitesimal gradations",
	"Shut the door and listen from outside",
	"Lowest common denominator check -single beat -single note -single riff",
	"Simple subtraction",
	"Emphasize repetitions",
	"Remember quiet evenings",
	"It is simply a matter of work",
	"Consult other sources -promising -unpromising",
	"Towards the insignificant",
	"Imagine the music as a moving chain or caterpillar",
	"Always the first steps",
	"Remove ambiguities and convert to specifics",
	"Children's voices -speaking -singing",
	"Retrace your steps",
	"Lost in useless territory",
	"Display your talent",
	"How would someone else do it?",
	"Distort time",
	"Would anybody want it?",
	"Is it finished?",
	"Discover your formulas and abandon them",
	"Edition 4 - 1996",
	"Faced with a choice, do both (given by Dieter Rot)",
	"Water",
	"Disciplined self-indulgence",
	"Do something boring",
	"Your mistake was a hidden intention",
	"Abandon normal instruments",
	"Would anyone want it?",
	"Trust in the you of now",
	"Only a part, not the whole",
	"The tape is now the music",
	"Not building a wall but making a brick",
	"Intentions -credibility of -nobility of -humility of",
	"Don't be frightened of cliches",
	"Remove a restriction",
	"Only one element of each kind",
	"Don't be afraid of things because they're easy to do",
	"Cut a vital connection",
	"Don't avoid what is easy",
	"Assemble some of the elements in a group and treat the group",
	"Don't stress one thing more than another"
    ];
    window.status = 
      "\xab " +  them[ Math.floor( Math.random() * them.length ) ]  + " \xbb";

  }
  return;
})();
//End
