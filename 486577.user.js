// ==UserScript==
// @name Study Island Bot
// @description Automatically answer questions on Study Island
// @include http://*.studyisland.com/cfw/test/options*
// @include http://*.studyisland.com/cfw/test/practice-session*
// @grant none
// @namespace http://github.com/theopolisme
// @license MIT License
// @version 1.01
// @released 2013-09-01
// @updated 2013-09-01
// ==/UserScript==
 
/*
* This file is a Greasemonkey user script. To install it, you need
* the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
* After installing the extension, restart Firefox and revisit
* this script. Now you will see a new menu item "Install User Script"
* in your tools menu.
*
* To uninstall this script, go to your "Tools" menu and select
* "Manage User Scripts", then select this script from the list
* and click uninstall :)
*
* This script is used as a demonstration of the fatal flaws of rote learning
* in the 21st century and how Study Island is a depressingly ineffective
* learning tool for, well, just about anybody.
*
* Licensed under the MIT License
* http://opensource.org/licenses/MIT
*/
 
// Sample data is provided for [8th grade] -- [Science] -- [Pretest]
// This should be a dictionary of key-value pairs (question-answer)
SI_ANSWERS = {
"Which of the following contains only one type of atom?":"carbon",
"How does a bird's unique beak design most likely promote its survival?":"helps in food gathering",
"<p align=\"center\"><img src=\"/userfiles/ok8spr5.gif\"></p>An experiment was conducted to measure the effect of equal amounts of fertilizer on the growth of bean plants and corn plants. The results indicated that, although both seedlings benefited from the fertilizer, the bean plants benefited slightly more. Which graph <b>best</b> shows these results?":"X",
"When a gas changes into a liquid, it is called ____________, and the speed of the molecules is ___________.":"condensation; decreasing",
"Robbie is trying to learn as much as he can about a rock that he found. This particular rock contains some fossils. What can Robbie learn from the fossils?":"the relative age of the rock",
"Which statement about gravitational attraction is correct?":"The more massive a body is, and the closer an object is to its center of mass, the stronger the gravitational attraction the body exerts on the object.<br><br>",
"Joe wanted to experiment with different factors that affect the freezing rate of water. He put two cups of water into each of two identical glass bowls. Next, he stirred sugar into the water in one of the bowls, and he put both bowls in the freezer. He checked their temperatures after one hour, and measured how much water was still liquid in each bowl.<br><br>What was the variable that changed in this experiment?":"the amount of sugar mixed into each bowl",
"Stacy's home is sprayed with a pesticide to control spiders. She didn't see any spiders for a period of time, but eventually she began to see the spiders again. The next time the exterminator sprayed her house, they used the same pesticide, and it had no effect on the spiders. What is the best way to explain this change in survivorship of the spider population?":"The spiders with pesticide-resistant traits survived and reproduced.",
"A student combines 3 grams of one chemical with 4 grams of a different chemical, and a chemical reaction takes place. The product weighs only 5 grams. What is the BEST explanation for this?":"The reaction produced a gas as another product.",
"A red ball weighs more than a blue ball. This requires that":"Earth's gravitational pull on the red ball is greater than on the blue ball.",
"Ramon's mother gives him an ice cream cone after dinner. When he goes outside to eat it, the ice cream begins to melt very quickly. Which of the following describes what is happening to his ice cream?":"A physical change is taking place.",
"Scientists followed a set of steps designed to detect metals found in different sources of drinking water. The steps are out of order.<br><br><table align=\"center\" border=0 width=\"85%\"><tr><td nowrap>Step 1:&nbsp;&nbsp;</td><td>Collect the water samples.</td></tr><tr><td nowrap><br>Step 2:&nbsp;&nbsp;</td><td><br>Conclude which, if any, of the water samples have unsafe levels of metal.</td></tr><tr><td nowrap><br>Step 3:&nbsp;&nbsp;</td><td><br>Measure the amounts of metals in each sample and record the amounts in a table.</td></tr><tr><td nowrap><br>Step 4:&nbsp;&nbsp;</td><td><br>Predict whether or not water sources near a manufacturing plant are contaminated.</td></tr></table><br><br>Which of these shows the correct order of the steps for the water quality study?":"4-1-3-2",
"What is the <b>first</b> step in designing a product?":"identify the need or want",
"<p align=\"center\"><table cellspacing=\"10\" align=\"bottom\"><tr><td><img src=\"/userfiles/24118duck.jpg\"></td><td><img src=\"/userfiles/24118egret.jpg\"></td><td><img src=\"/userfiles/24118beluga.jpg\"></td></tr></table></p>These animals are grouped together because all of them":"are warm-blooded.",
"Tekia and Scott were in charge of measuring rainfall. Tekia checked the rainfall level one morning as soon as it had stopped raining. Scott checked it again, later that day. He got a lower reading than Tekia. What <b>MOST LIKELY</b> caused the difference in the readings?":"evaporation",
"<p align=\"center\"><img src=\"/userfiles/ny8gr12.gif\"></p>What evidence indicates that a chemical change took place when the iron and sulfur combined to form iron sulfide?":"The change resulted in a new property.",
"To find an object’s density (D), first measure its mass (m) and volume (V). Then use the following equation:<p align=\"center\">D = <sup>m</sup>/<sub>V</sub><br><br><b>Densities of Common Substances</b><table border=1 cellspacing=0 cellpadding=3><tr><td align=\"center\"><b>Substance</b></td><td align=\"center\"><b>Density</b> (g/cm<sup>3</sup>)</td></tr><tr><td align=\"center\">Water (liquid)</td><td align=\"center\">1.00</td></tr><tr><td align=\"center\">Silver (solid)</td><td align=\"center\">10.50</td></tr><tr><td align=\"center\">Gold (solid)</td><td align=\"center\">19.3</td></tr><tr><td align=\"center\">Platinum (solid)</td><td align=\"center\">21.4</td></tr></table></p>Examine the above equation and table. Shannon has a Platinum ball with a mass of 1,284 g. What is its volume?":"60 cm<sup>3</sup>",
"Mandy is testing an unknown solution to determine whether it is an acid or a base. She places a piece of red litmus paper into the solution and the paper turns blue.<br><br>Mandy's unknown solution":"is a base.",
"Which of these should be done after data is collected for an experiment?":"Conclusions should be drawn.",
"<p align=\"center\"><img src=\"/userfiles/24118oxygen.gif\"></p>In the periodic table, an element's <b>atomic number</b> is equal to the":"number of protons in the nucleus of one atom of that element.",
"Which of the following is a characteristic of elements?":"They cannot be divided into smaller substances.",
"<p align=\"center\"><img src=\"/pics/116211Frog.jpg\" ca #34825050></p>The frog shown in the picture above is shorter than 1.5 inches and has smooth skin. Based on the dichotomous key, the frog most likely belongs to which of the following species?":"Litoria caerulea",
"Which of the following are true about magnetic forces and electric currents?<p align=center><table border=0><tr align=left valign=top><td align=right>I.</td><td>Magnetic forces can be produced as an electric current moves along a wire.<br><br></td></tr><tr align=left valign=top><td align=right>II.</td><td>Electric currents can be generated by a magnetic force.<br><br></td></tr><tr align=left valign=top><td align=right>III.</td><td>In both magnetism and electricity, positively charged particles attract other positively charged particles.<br><br></td></tr><tr align=left valign=top><td align=right>IV.</td><td>Both magnets and electrically charged particles can move some objects without touching them.<br><br></td></tr></table></p>":"I, II, and IV only",
"What is the force that pulls matter in clouds of space dust together to create stars?":"gravity",
"Both living and nonliving things are composed of tiny particles known as&nbsp;_______.":"atoms",
"<p align=\"center\"><img src=\"/userfiles/24118periodictable.gif\"><br><font size=1 color=gray>Picture adapted from http://www.chem.wisc.edu/areas/reich/handouts/periodic-table.GIF.</font></p>What are the elements highlighted in yellow classified as?":"nonmetals",
"In which situation is a chemical reaction occurring?":"a nail rusts",
"The atmosphere is comprised mainly of":"nitrogen and oxygen.",
"Mixtures are very different from compounds. Mixtures can be physically separated into different components and compounds cannot be physically separated. Which of the following is <b>NOT</b> a mixture?":"sugar",
"What can be said about this equation?<p align=\"center\">2Na(s) + Cl<sub>2</sub>(g) &#8594; 2NaCl(s)</p>":"The mass of the reactants is the same as the mass of the products.",
"<p align=\"center\"><img src=\"/userfiles/24118periodictable.gif\"><br><font size=1 color=gray>Picture adapted from http://www.chem.wisc.edu/areas/reich/handouts/periodic-table.GIF.</font></p>What are the elements highlighted in pink classified as?":"metals",
"What is the force that keeps the planets in orbit around the sun?":"gravity",
"What is the force that keeps the moon in orbit around the Earth?": "gravity",
"Which of the items below helps the scientist to learn the most about the internal structure of cells? <p align=\"center\"><table border=0 cellpadding=10 cellspacing=0><tr><td align=\"center\" valign=\"bottom\"><img src=\"/userfiles/NJ8C.gif\"><br><font size=3 face=\"verdana\"><strong>W.</strong></font></td><td align=\"center\" valign=\"bottom\"><img src=\"/userfiles/NJ8A.gif\"><br><font size=3 face=\"verdana\"><strong>X.</strong></font></td></tr><tr><td align=\"center\" valign=\"bottom\"><img src=\"/userfiles/NJ8B.gif\"><br><font size=3 face=\"verdana\"><strong>Y.</strong></font></td><td align=\"center\" valign=\"bottom\"><img src=\"/userfiles/NJ8D.gif\"><br><font size=3 face=\"verdana\"><strong>Z.</strong></font></td></tr></table></p>":"Y",
"To find an object’s density (D), first measure its mass (m) and volume (V). Then use the following equation:<p align=\"center\">D = <sup>m</sup>/<sub>V</sub><br><br><b>Densities of Common Substances</b><table border=1 cellspacing=0 cellpadding=3><tr><td align=\"center\"><b>Substance</b></td><td align=\"center\"><b>Density</b> (g/cm<sup>3</sup>)</td></tr><tr><td align=\"center\">Water (liquid)</td><td align=\"center\">1.00</td></tr><tr><td align=\"center\">Silver (solid)</td><td align=\"center\">10.50</td></tr><tr><td align=\"center\">Gold (solid)</td><td align=\"center\">19.3</td></tr><tr><td align=\"center\">Platinum (solid)</td><td align=\"center\">21.4</td></tr></table></p>Examine the above equation and table. Shannon has a Platinum ball with a mass of 856 g. What is its volume?":"40 cm<sup>3</sup>",
"<p align=\"center\"><img src=\"/userfiles/24118periodictable.gif\"><br><font size=1 color=gray>Picture adapted from http://www.chem.wisc.edu/areas/reich/handouts/periodic-table.GIF.</font></p>What are the elements highlighted in green classified as?":"metalloids",
"To find an object’s density (D), first measure its mass (m) and volume (V). Then use the following equation:<p align=\"center\">D = <sup>m</sup>/<sub>V</sub><br><br><b>Densities of Common Substances</b><table border=1 cellspacing=0 cellpadding=3><tr><td align=\"center\"><b>Substance</b></td><td align=\"center\"><b>Density</b> (g/cm<sup>3</sup>)</td></tr><tr><td align=\"center\">Water (liquid)</td><td align=\"center\">1.00</td></tr><tr><td align=\"center\">Silver (solid)</td><td align=\"center\">10.50</td></tr><tr><td align=\"center\">Gold (solid)</td><td align=\"center\">19.3</td></tr><tr><td align=\"center\">Platinum (solid)</td><td align=\"center\">21.4</td></tr></table></p>Examine the above equation and table. Shannon has a Platinum ball with a mass of 428 g. What is its volume?":"20 cm<sup>3</sup>"
}
 
function options_page() {
$("#quesNum option").each(function() {
if (this.value == '10') {
$(this).val(200);
$(this).attr("selected", "selected");
}
});
$("#testSessionNextBtn").trigger("click");
}
 
function test_page() {
var q_num = $('#spanCurrentItemNumber').text();
var item = $.session.items[q_num];
var question_string = item.question;
var ansobject = item.answers;
var answers = $.map(ansobject, function (value, key) { return value; });
var ans_string = SI_ANSWERS[question_string];
if (ans_string) {
var ans_pos = answers.indexOf(ans_string);
if (ans_pos != -1) {
var answerdiv = "#answerSelection_"+q_num+"_"+(ans_pos+1);
$(answerdiv).trigger("click");
$(document).ajaxStop(function () {
$("#buttonNext").trigger("click");
$(document).ajaxStop(function() {
$('span.ui-button-text').each(function(){
if($(this).text() == 'End Session') {
$(this).trigger("click");
return;
}
});
});
test_page();
});
} else {
console.log('WTF...unable to find answer in answerlist...\n');
console.log(item);
console.log(ansobject);
$("#buttonNext").trigger("click"); // Skip it
}
} else {
console.log('Unable to find answer in cache...data:\n');
console.log(item);
console.log(ansobject);
$("#buttonNext").trigger("click"); // Skip it
}
}
 
function results_page() {
tryAgain();
}
 
if (window.location.href.indexOf("options") != -1) {
// If we're on the options page
options_page();
} else if (window.location.href.indexOf("practice-session-results") != -1) {
// If we're on the results page
results_page();
} else if (window.location.href.indexOf("practice-session") != -1) {
// If we're on the test page itself
test_page();
}