 // ==UserScript==
 // @name      Calling a Spade a Spade
 // @version    1.0
 // ==/UserScript==

 (function() {
   var replacements, regex, key, textnodes, node, s;

   replacements = {
     "If you use ad blocking software while viewing Daily Kos, you're getting all the benefits of our site but we're not getting any of the advertisement revenue associated with your visits. This site relies on ad revenue for daily operations: a decrease in the number of ads seen means a decrease in the funding available to run the site, to pay those that work on it, and to create improved site features.

We won't stop you from using ad blocking software, but if you do use it we ask you to support Daily Kos another way: by purchasing a site subscription. A subscription is an inexpensive way to support the site that eliminates the advertisements without using ad blocking software.

Revenue generated from the subscriptions goes to the Daily Kos fellowship program, providing a steady income for bloggers and allowing them to concentrate full time on expanding the reach and influence of the netroots through a variety of projects.

By using ad blocking software, you may be hiding the site ads but you're also reducing the site's primary source of revenue. So if you must use one, please do your part to support the site and the people that bring it to you by purchasing a site subscription today.": "Lord Voldemort",
  11.     "President George Bush": "Lord Voldemort",
  12.     "President Bush": "Lord Voldemort",
  13.     "Mr. President": "Voldemort",
  14.     "Dubya": "Voldemort",
  15.     "George W. Bush": "Voldemort",
  16.     "George Walker Bush": "Voldemort",
  17.     "George Bush": "Voldemort",
  18.     "President Voldemort": "Lord Voldemort",
  19.     "Mr. Bush": "Lord Voldemort",
  20.     "Bush": "Voldemort",
  21.     "Vice President Dick Cheney": "The Dark Lord of Mordor",
  22.     "Vice President Cheney": "The Dark Lord of Mordor",
  23.     "Richard Bruce Cheney": "Sauron",
  24.     "Vice President Richard Bruce Cheney": "The Dark Lord of Mordor",
  25.     "Dick Cheney": "Sauron",
  26.     "Cheney": "Sauron",
  27.     "VP Cheney": "Sauron",
  28.     "No Child Left Behind": "Every Child Left Behind",
  29.     "NCLB": "Death of the Public Schools",
  30.     "abortion opponent": "misogynist",
  31.     "Abortion opponent": "Misogynist",
  32.     "Abortion Opponent": "Misogynist",
  33.     "Lieberman": "Warmonger",
  34.     "Pro-life": "Anti-choice",
  35.     "Pro life": "Anti-choice",
  36.     "pro-life": "anti-choice",
  37.     "pro life": "anti-choice",
  38.     "republican": "fascist",
  39.     "Republican": "Fascist",
  40.     "conservative": "fascist",
  41.     "Conservative": "Fascist",
  42.     "War in Iraq": "Civil War in Iraq",
  43.     "insurgents": "insurgents",
  44.     "insurgent": "insurgent",
  45.     "Insurgents": "Insurgents",
  46.     "Insurgent": "Insurgent",
  47.     "surge": "death of more troops",
  48.     "Surge": "Death of More Troops",
  49.     "Firefox": "Firefox",
  50.     "firefox": "firefox",
  51.     "Fox News": "Faux Propaganda",
  52.     "FoxNews": "FauxPropaganda",
  53.     "FOXNews": "Faux Propaganda",
  54.     "FOX": "FAUX",
  55.     "Press Secretary": "Propaganda Minister",
  56.     "Press secretary": "Propaganda Minister",
  57.     "press secretary": "Propaganda Minister",
  58.     "press briefing": "Propaganda briefing",
  59.     "Press briefing": "Propaganda briefing",
  60.     "Press Briefing": "Propaganda Briefing",
  61.     "White House Spokeswoman": "Assistant Propaganda Minister",
  62.     "White House spokeswoman": "Assistant Propaganda Minister",
  63.     "insists on a surrender date, handcuffs our generals and contains billions of dollars in spending unrelated to the war": "because it would save the lives of U.S. troops",
  64.     "White House": "Jail House",
  65.     "White House officials": "Jail House criminals",
  66.     "National Riffle Association": "National Death Association",
  67.     "NRA": "National Death Association",
  68.     "John McCain": "John Flipfloper Warmonger Condoms Don't Prevent AIDS McCain",
  69.     "NRA": "National Death Association",
  70.     "Impeachment": "Justice",
  71.     "impeachment": "justice",
  72.     "Department of Defense": "Department of War",
  73.     "Secretary of Defense": "Secretary of War",
  74.     "Defense Department": "War Department",
  75.     "Department of Justice": "Department of Oppression",
  76.     "Justice Department": "Oppression Department",
  77.     "impeachment": "justice",
  78.     "fight identity theft": "suppress the black vote",
  79.     "Fight Identity Theft": "Suppress the Black Vote",
  80.     "Signing Statement": "Royal Decree",
  81.     "Signing statement": "Royal decree",
  82.     "signing statement": "royal decree",
  83.     "President's Statement on Signing of": "Lord Voldemort's Royal Decree disregarding",
  84.     "President's statement on signing of": "Lord Voldemort's royal decree disregarding",
  85.     "President's Statement on": "Lord Voldemort's royal decree disregarding",
  86.     "President's statement on": "Lord Voldemort's royal decree disregarding",
  87.     "a troop buildup": "the death of more troops",
  88.     "troop buildup": "the death of more troops",
  89.     "Troop Buildup": "The Death of More Troops",
  90.     "A Troop Buildup": "The Death of More Troops",
  91.     "A troop buildup": "The death of more troops",
  92.     "contains a timetable for withdrawal of U.S. troops": "saves the lives of U.S. troops",
  93.     "R-": "F-",
  94.     "Homeland Security": "Fascist Government Surveillance",
  95.     "Identity Theft Task Force": "Voter Suppression Task Force, which will work to disenfranchise voters, ",
  96.     "God": "the Flying Spaghetti Monster",
  97.     "Intelligent Design": "Creationalism"};
  98.
  99.
 100. regex = {};
 101. for (key in replacements) {
 102.     regex[key] = new RegExp(key, 'g');
 103. }
 104.
 105. textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 106.
 107. for (var i = 0; i < textnodes.snapshotLength; i++) {
 108.     node = textnodes.snapshotItem(i);
 109.     s = node.data;
 110.     for (key in replacements) {
 111.         s = s.replace(regex[key], replacements[key]);
 112.     }
 113.     node.data = s;
 114. }
 115.
 116. })();