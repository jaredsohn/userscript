// ==UserScript==
// @name           Fifth Grade Tall Tales
// @namespace      Fifth Grade Tall Tales
// @description    Fifth Grade Tall Tales quiz code source
// @include        http://*
// @author         Fifth Grade Tall Tales
// @version        0.01

// ==/UserScript==

//change 5 to the total number of questions
var total=15
var question=new Array()
for (i=1;i<=total+1;i++){
temp="choice"+i+"=new Array()"
eval(temp)
}
var solution=new Array()

/*Below lists the phrases that will be randomly displayed if the user correctly answers the question. You may extend or shorten this list as desired*/
var compliments=new Array()
compliments[0]="Excellent!"
compliments[1]="Wow, you're really rocking!"
compliments[2]="You must have listened well. Good job!"
compliments[3]="Right on."
compliments[4]="Correct!"
compliments[5]="Great Job!"
compliments[6]="Good work!"


/*Below lists the questions, its choices, and finally, the solution to each question. Folow the exact format below when editing the questions. You may have as many questions as needed. Check doc at http://javascriptkit.com/script/script2/comboquiz.htm for more info
*/

question[1]="What did Slue- foot Sue ride on?- Sam"
choice1[1]="A monkey"
choice1[2]="A salmon"
choice1[3]="A catfish"
choice1[4]="A lion"

question[2]="I am very strong and tall. Who am I?- Zoe"
choice2[1]="Davy Crockett"
choice2[2]="Paul Bunyan"
choice2[3]="Mike Fink"
choice2[4]="Casey Jones"

question[3]="Who ran away at the age of two?- Jabari"
choice3[1]="Casey Jones"
choice3[2]="Mike Fink"
choice3[3]="Paul Bunyan"
choice3[4]="Pecos Bill"

question[4]="What did Casey Jones add to the ice cream?- Bria"
choice4[1]="Peaches"
choice4[2]="Fudge"
choice4[3]="Sprinkles"
choice4[4]="Cookie dough"

question[5]="How far did the carpenter push Mike?- Margo"
choice5[1]="10 miles"
choice5[2]="Down the Block"
choice5[3]="1000's of miles"
choice5[4]="100's of miles"

question[6]="Casey Jones was said to make his trains what?- Audrey A."
choice6[1]="Start"
choice6[2]="Crash"
choice6[3]="Fly"
choice6[4]="Go"

question[7]="John Henry is a what?- Colm"
choice7[1]="Iron Man"
choice7[2]="Tin Man"
choice7[3]="Hulk"
choice7[4]="Steel Man"

question[8]="In 'Paul Bunyan', has a pancake ever crushed a house?- Bucky"
choice8[1]="No"
choice8[2]="Yes, but only halfway"
choice8[3]="No, it was a waffle"
choice8[4]="Yes"

question[9]="What did Pecos Bill's wife's name?- Michal"
choice9[1]="Fast- feet Fiona"
choice9[2]="Slue- foot Sue"
choice9[3]="Sally"
choice9[4]="Lightning"

question[10]="Who made it to the other side of a dangerous train track?- Mikayla"
choice10[1]="Pecos Bill"
choice10[2]="Paul Bunyan"
choice10[3]="Davy Crockett"
choice10[4]="Casey Jones"

question[11]="How did Casey Jones die?- Jeremiah"
choice11[1]="Train Crash"
choice11[2]="Dynamite"
choice11[3]="Hit in the head with a pickaxe"
choice11[4]="Shot in a duel"

question[12]="What was Casey Jones' Motto?- Audrey P."
choice12[1]="Just do it"
choice12[2]="Never give up"
choice12[3]="On time, every time"
choice12[4]="Don't stop believin'"

question[13]="What color was Paul Bunyan's ox?- Tige"
choice13[1]="Rainbow"
choice13[2]="Gold"
choice13[3]="Pink"
choice13[4]="Blue"

question[14]="What was the name of Paul Bunyan's ox?- Owen"
choice14[1]="Blue"
choice14[2]="Babe"
choice14[3]="Lightning"
choice14[4]="Snow"

question[15]="Who made a giant flap jack grille?- Erica"
choice15[1]="Pecos Bill"
choice15[2]="Paul Bunyan"
choice15[3]="Casey Jones"
choice15[4]="George Washington"


solution[1]="c"
solution[2]="b"
solution[3]="b"
solution[4]="a"
solution[5]="d"
solution[6]="c"
solution[7]="a"
solution[8]="d"
solution[9]="b"
solution[10]="d"
solution[11]="a"
solution[12]="c"
solution[13]="d"
solution[14]="b"
solution[15]="b"