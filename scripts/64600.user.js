// ==UserScript==
// @name          @j@y AutoSignature!
// @namespace     Black Panther
// @description   auto signature for orkut, random sign
// @include     http://www.orkut.com/CommMsgPost.aspx*
// ==/UserScript==

function f(){
txt = new Array ('life is like buying a porno movie you dont know what your getting but you pay your money and hope or the best','Are you always so stupid or is today a special occasion','As an outsider what do you think of the human race','I wud like to kick you in the teeth but why should I improve your looks','At least there is one thing good about your body It isnt as ugly as your face','Brains are not everything In fact in your case they are nothing','Careful now Dont let your brains go to your head','I like you People say I have no taste but I like you','Did your parents ever ask you to run away from home','If I had a face like yours I wud sure my parents','Dont feel bad A lot of people have no talent','Dont get insulted but is your job devoted to spreading ignorance','Keep talking someday you will say something intelligent','Dont you love nature despite what it did to you','Dont think it may sprain your brain','Fellows like you dont grow from trees they swing from them','He has a mechanical mind Too bad he forgot to wind it up this morning','He has a mind like a steel trap always closed','You are a man of the world and you know what sad shape the world is in','He is always lost in thought its unfamiliar territory','He is dark and handsome When its dark he is handsome',' He is known as a miracle comic if he is funny its a miracle','He is listed in Who is Who as Whats That','You are living proof that man can live without a brain','He is so short when it rains he is always the last one to know','He is the kind of a man that you would use as a blueprint to build an idiot','How come you are here I thought the zoo is closed at night','How did you get here Did someone leave your cage open','How much refund do you expect on your head now that its empty','How would you like to feel the way you look','Hi I am a human being What are you','I cant talk to you right now tell me where will you be in the next 10 years','I dont want you to turn the other cheek its just as ugly','I dont know who you are but whatever you are I am sure everyone will agree with me','I dont know what makes you so stupid but it really works','I could make a monkey out of you but why should I take all the credit','I cant seem to remember your name and please dont help me','I dont even like the people youre trying to imitate if you are at all','I know you were born silly but why did you have a relapse','I know you are a selfmade man Its nice of you to take the blame','I know you are not as stupid as you look Nobody could be','I have seen people like you but I had to pay admission','Why are you so stupid today Anyway I think thats very typical of you','Do u practice being this ugly');
lnbrk = '\n\n\n\n\n\n\n\n';
smily = new Array('8)',':(',':x',':)',';)',':D',':o',':P','/)');
txtrand = txt[Math.floor(Math.random()*txt.length)];
smilyrand = smily[Math.floor(Math.random()*smily.length)];
sign = "[maroon][b]"+txtrand+"  ["+smilyrand+"][/b][/maroon]";
signature = lnbrk+sign;
a = document.getElementsByTagName('textarea')[0];
a.value = a.value + signature;
clearTimeout(y);}
y = setTimeout(f,500);
void(y)