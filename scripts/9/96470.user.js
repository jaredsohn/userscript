// ==UserScript==
// @name           letters2image-colors_ListVersion
// @namespace      letters2image-colors-ListVersion
// @description    exhaustive individual letter substitution: substitution by images. Addition of color in the background and the font. Replace a character by an other, even of an other font. Need some JavaScript and HTML skills to tweak the script, the default is a demo. This version simply looks in a list of characters, the other uses Unicode ranges(Chinese friendly). Potential uses with people of low eye site (read with out glasses), near blind (increase screen letter density), dyslexics, synaesthetics, children learning to read, mnemonics, and illiterate people (phonetic alphabet).
// ==/UserScript==

/* IF YOU WANT TO HAVE YOUR OWN SITE THAT YOU CAN ACCESS ONLY BY YOU. GREASE MONKEY DOESN'T ALLOW DIRECT ACCESS TO DISK.
 
download apache
http://www.apache.org/dyn/closer.cgi

setup UNIX
http://www.zaphu.com/2007/08/21/ubuntu-lamp-server-guide-configure-apache-mysql-and-cgi-bin/

setup mickeysoft :P
http://www.thesitewizard.com/apache/install-apache-2-windows.shtml

the default server will be
http://127.0.0.1

Don't put the images in the root folder, you need to put them in a subfolder, for example like this
http://127.0.0.1/img/
*/

// functions definitions
function PreProcessing() {

    for (var i = character.length - 1; i >= 0; i--)
    {
        if (linkimg[i] == '')
           {
           if(UseSpecialFont[i])
             {
               replacement[i] ='span style="color:'+colors[i]+'; background-color:'+colorbackground[i]+'; font-weight:bold; font-size:'+charactersize+'; font-family:'+SpecialFont+'"; '+replcharacter[i]+'\/span';
             }
           else
             {
               replacement[i] ='span style="color:'+colors[i]+'; background-color:'+colorbackground[i]+'; font-weight:bold; font-size:'+charactersize+';"; '+replcharacter[i]+'\/span';
             }
           }
        else
           {
           replacement[i] ='img src="'+linkimg[i]+'" alt="'+character[i]+'" height="'+heightimage+'"/';
           }
    }

}

function choise(char) {

if(everythingToLowerCase){char=char.toLowerCase();}

indexofchar=character.indexOf(char);

if(indexofchar==-1)
  {
    return char;
  }
else
  {
    return replacement[indexofchar];
  }
}

function substitution() {

var alltextnodes = document.evaluate('.//text()[normalize-space(.) != ""]',document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

var currentchar ='';

var tmptext='';

for (var j = 0, l = alltextnodes.snapshotLength ; j < l; j++)
   {
   
   for (var i = 0, ll=alltextnodes.snapshotItem(j).data.length; i <ll; i++)
     {
       currentchar=alltextnodes.snapshotItem(j).data[i];
       currentchar=choise(currentchar);
       tmptext=tmptext+currentchar;
     }
   
   alltextnodes.snapshotItem(j).data = tmptext;
   tmptext='';
   }
}


function rmspecialchar() {

var RawHtml = document.getElementsByTagName('body')[0].innerHTML; 
    
RawHtml = RawHtml.replace(RegExp('','g'),'<');
RawHtml = RawHtml.replace(RegExp('','g'),'>');
    
document.getElementsByTagName('body')[0].innerHTML = RawHtml;

}

function run() {

PreProcessing();

substitution();

rmspecialchar();

}

//*******************************main*******************************

//*************data arrays******************

var character = new Array();
var replacement = new Array();



var colors = new Array();

var colorbackground = new Array();

var linkimg = new Array();

var UseSpecialFont = new Array();

var replcharacter = new Array();

//********************************lone variables*****************************************

//height of images
var heightimage = '30'

//font for special characters
var SpecialFont = 'test'

//character size
var charactersize = '100%'

//convert all the text in lower case? true or false
var everythingToLowerCase = true

//*************************************************CHARACTERS********************************************

//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
//which character you are treating
character[0] = 'a';
//you are replacing it by which character, if linkimg is empty
replcharacter[0] ='a';
//do you want to use the special font you defined at var "SpecialFont" above?, ignored if linkimg is not empty
UseSpecialFont[0] = false;
//link of the replacement image, if given, the othe transformation parameters will be ignored
linkimg[0] = 'http://i717.photobucket.com/albums/ww173/Daveyy/red-apple.jpg';
//defines the color of the character, if linkimg is empty
colors[0] = '#f01';
//defines the color of the background of the character, if linkimg is empty
colorbackground[0] = '#ff0';

//BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
character[1] = 'b';
replcharacter[1] ='b';
UseSpecialFont[1] = false;
linkimg[1] ='http://i148.photobucket.com/albums/s34/kimbero53/disney/071.gif';
colors[1] = 'blue';
colorbackground[1] = 'red';

//CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
character[2] = 'c';
replcharacter[2] ='c';
UseSpecialFont[2] = false;
linkimg[2] ='http://i1128.photobucket.com/albums/m497/munise/Chair.jpg';
colors[2] = 'blue';
colorbackground[2] = 'green';

//DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
character[3] = 'd';
replcharacter[3] ='d';
UseSpecialFont[3] = false;
linkimg[3] ='http://i1123.photobucket.com/albums/l545/ghkusanet/door.png';
colors[3] = 'blue';
colorbackground[3] = 'purple';

//EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
character[4] = 'e';
replcharacter[4] ='e';
UseSpecialFont[4] = false;
linkimg[4] ='http://i1082.photobucket.com/albums/j371/cfsguy99/Egg.jpg';
colors[4] = '#3FFF00';
colorbackground[4] = '#CD5C5C';

//FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
character[5] = 'f';
replcharacter[5] ='f';
UseSpecialFont[5] = false;
linkimg[5] ='http://i302.photobucket.com/albums/nn85/shunmaha/Fish.png';
colors[5] = '#EE82EE';
colorbackground[5] = '#FF8243';

//GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
character[6] = 'g';
replcharacter[6] ='g';
UseSpecialFont[6] = false;
linkimg[6] ='http://i44.photobucket.com/albums/f21/figata29/Monday_girl.jpg';
colors[6] = '#1C352D';
colorbackground[6] = '#004953';

//HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
character[7] = 'h';
replcharacter[7] ='h';
UseSpecialFont[7] = false;
linkimg[7] ='http://i885.photobucket.com/albums/ac53/RobinsonReunion/Sawgrass%20house/DSCN1778.jpg'; 
colors[7] = '#3EB489';
colorbackground[7] = '#FE59C2';

//IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
character[8] = 'i';
replcharacter[8] ='i';
UseSpecialFont[8] = false;
linkimg[8] = 'http://i33.photobucket.com/albums/d56/duenas05/ice_cube.jpg';
colors[8] = '#6B8E23';
colorbackground[8] = '#FF4500'; 

//JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ
character[9] = 'j';
replcharacter[9] ='j';
UseSpecialFont[9] = false;
linkimg[9] = 'http://i108.photobucket.com/albums/n19/rustybus/048.jpg';
colors[9] = '#DA70D6';
colorbackground[9] = '#990000';

//KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
character[10] = 'k';
replcharacter[10] ='k';
UseSpecialFont[10] = false;
linkimg[10] ='http://i40.photobucket.com/albums/e220/deathtolife22/hahagoodoldastraila.jpg';
colors[10] = '#ABCDEF';
colorbackground[10] = '#123524';

//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
character[11] = 'l';
replcharacter[11] ='l';
UseSpecialFont[11] = false;
linkimg[11] ='http://i1204.photobucket.com/albums/bb406/ashu7672/Mother%20Nature/SAM_0859.jpg';
colors[11] = '#0892D0';
colorbackground[11] = '#FF2400';

//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
character[12] = 'm';
replcharacter[12] ='m';
UseSpecialFont[12] = false;
linkimg[12] ='http://i957.photobucket.com/albums/ae59/electric_music/images/moon.jpg';
colors[12] = '#76FF7A';
colorbackground[12] = '#321414';

//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
character[13] = 'n';
replcharacter[13] ='n';
UseSpecialFont[13] = false;
linkimg[13] ='http://i454.photobucket.com/albums/qq270/concheta/nautilus.jpg';
colors[13] = '#990000';
colorbackground[13] = 'green';

//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
character[14] = 'o';
replcharacter[14] ='o';
UseSpecialFont[14] = false;
linkimg[14] ='http://i0006.photobucket.com/albums/0006/findstuff22/Best%20Images/Colors/oranges1.jpg';
colors[14] = '#FF6E4A';
colorbackground[14] = 'orange';

//PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
character[15] = 'p';
replcharacter[15] ='p';
UseSpecialFont[15] = false;
linkimg[15] ='http://i225.photobucket.com/albums/dd42/stellabar/cutecolorsschoolicon1.gif';
colors[15] = 'green';
colorbackground[15] = '#414A4C';

//QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
character[16] = 'q';
replcharacter[16] ='q';
UseSpecialFont[16] = false;
linkimg[16] = 'http://i49.photobucket.com/albums/f285/Readerchick08/Queen.jpg';
colors[16] = 'blue';
colorbackground[16] = '	#93C572'; 

//RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
character[17] = 'r';
replcharacter[17] ='r';
UseSpecialFont[17] = false;
linkimg[17] = 'http://i138.photobucket.com/albums/q259/yayitsjazz/robot.jpg';
colors[17] = 'orange';
colorbackground[17] = '	#65000B';

//SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
character[18] = 's';
replcharacter[18] ='s';
UseSpecialFont[18] = false;
linkimg[18] = 'http://i1105.photobucket.com/albums/h356/levis501z/star.jpg';
colors[18] = 'red';
colorbackground[18] = '#00563F';

//TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
character[19] = 't';
replcharacter[19] ='t';
UseSpecialFont[19] = false;
linkimg[19] = 'http://i64.photobucket.com/albums/h179/e30m42cab/Parts%20bin/E30toolbox.jpg';
colors[19] = '#FFCC00';
colorbackground[19] = '#CD5700';

//UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU
character[20] = 'u';
replcharacter[20] ='u';
UseSpecialFont[20] = false;
linkimg[20] = 'http://i1133.photobucket.com/albums/m589/tntmedia/Concept%20One%20NCAA%20Umbrella%20Woody/804371048544.jpg';
colors[20] = '#E1AD21';
colorbackground[20] = 'blue'; 

//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
character[21] = 'v';
replcharacter[21] ='v';
UseSpecialFont[21] = false;
linkimg[21] = 'http://i11.photobucket.com/albums/a152/StephanieMarie07/Random/vulture.png';
colors[21] = '#F3E5AB';
colorbackground[21] = '#DA1D81';

//WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
character[22] = 'w';
replcharacter[22] ='w';
UseSpecialFont[22] = false;
linkimg[22] = 'http://i1104.photobucket.com/albums/h332/Sunday88/Nike%20LED%20watch/N202BLACK.jpg';
colors[22] = '#F5DEB3';
colorbackground[22] = '#004242';

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
character[23] = 'x';
replcharacter[23] ='x';
UseSpecialFont[23] = false;
linkimg[23] = 'http://i275.photobucket.com/albums/jj297/papasmurf1957/bodytk4.gif';
colors[23] = '#738678';
colorbackground[23] = '#9ACD32';

//YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
character[24] = 'y';
replcharacter[24] ='y';
UseSpecialFont[24] = false;
linkimg[24] = 'http://i423.photobucket.com/albums/pp320/qwers58/yoyo.jpg';
colors[24] = '#F5DEB3';
colorbackground[24] = '#FF43A4';

//ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
character[25] = 'z';
replcharacter[25] ='z';
UseSpecialFont[25] = false;
linkimg[25] = 'http://i628.photobucket.com/albums/uu8/msspanky1057/Zebra-Print.jpg';
colors[25] = '#0014A8';
colorbackground[25] = '	#2C1608';

//000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
character[26] = '0';
replcharacter[26] ='0';
UseSpecialFont[26] = false;
linkimg[26] = '';
colors[26] = 'purple';
colorbackground[26] = 'purple';

//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
character[27] = '1';
replcharacter[27] ='1';
UseSpecialFont[27] = false;
linkimg[27] = '';
colors[27] = 'purple';
colorbackground[27] = 'purple';

//222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
character[28] = '2';
replcharacter[28] ='2';
UseSpecialFont[28] = false;
linkimg[28] = '';
colors[28] = 'purple';
colorbackground[28] = 'purple';

//333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
character[29] = '3';
replcharacter[29] ='3';
UseSpecialFont[29] = false;
linkimg[29] = '';
colors[29] = 'purple';
colorbackground[29] = 'purple';

//444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444
character[30] = '4';
replcharacter[30] ='4';
UseSpecialFont[30] = false;
linkimg[30] = '';
colors[30] = 'purple';
colorbackground[30] = 'purple';

//555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
character[31] = '5';
replcharacter[31] ='5';
UseSpecialFont[31] = false;
linkimg[31] = '';
colors[31] = 'purple';
colorbackground[31] = 'purple';

//666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
character[32] = '6';
replcharacter[32] ='6';
UseSpecialFont[32] = false;
linkimg[32] = '';
colors[32] = 'purple';
colorbackground[32] = 'purple';

//777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
character[33] = '7';
replcharacter[33] ='7';
UseSpecialFont[33] = false;
linkimg[33] = '';
colors[33] = 'purple';
colorbackground[33] = 'purple';

//888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
character[34] = '8';
replcharacter[34] ='8';
UseSpecialFont[34] = false;
linkimg[34] = '';
colors[34] = 'purple';
colorbackground[34] = 'purple';

//999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
character[35] = '9';
replcharacter[35] ='9';
UseSpecialFont[35] = false;
linkimg[35] = '';
colors[35] = 'purple';
colorbackground[35] = 'purple';

//spacespacespacespacespacespacespacespacespacespacespacespacespacespacespacespacespacespacespacespace
character[36] = ' ';
replcharacter[36] =' ';
UseSpecialFont[36] = false;
linkimg[36] = '';
colors[36] = '';
colorbackground[36] = '';

//weird
character[37] = '日';
replcharacter[37] ='☼';
UseSpecialFont[37] = false;
linkimg[37] = '';
colors[37] = 'yellow';
colorbackground[37] = 'blue';

/*
other gifs
http://artie.com/gif-anim.htm

*/

//**********executions

window.addEventListener('load',run(), true);