// ==UserScript==
// @name        UltooSMSbyCompad
// @namespace   ulto.sms.in
// @description send different sms to your friends... automatic typing of sms. currently 138 sms are there.
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1.0
// ==/UserScript==

$(function(){

var url=window.location.href;
var pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

var mm = new Array();
mm[0] = "Don't cry because it's over, smile because it happened ..... "+ Math.floor((Math.random() * 100) + 1)+"...";
mm[1] = "You only live once, but if you do it right, once is enough...."+Math.floor((Math.random() * 100) + 1)+".";
mm[2] = "In three words I can sum up everything I've learned about life: it goes on...."+Math.floor((Math.random() * 100) + 1)+"....";
mm[3] = "To live is the rarest thing in the world. Most people exist, that is all....."+Math.floor((Math.random() * 100) + 1)+".....";
mm[4] = "It is better to be hated for what you are than to be loved for what you are not....."+Math.floor((Math.random() * 100) + 1)+" ";
mm[5] = "Life is what happens to you while you're busy making other plans...."+Math.floor((Math.random() * 100) + 1)+".....";
mm[6] = "Sometimes the questions are complicated and the answers are simple...."+Math.floor((Math.random() * 100) + 1)+"....";
mm[7] = "Today you are You, that is truer than true. There is no one alive who is Youer than You....."+Math.floor((Math.random() * 100) + 1)+"...";
mm[8] = "Everything you can imagine is real...."+Math.floor((Math.random() * 100) + 1)+"...";
mm[9] = "Life is like riding a bicycle. To keep your balance, you must keep moving....."+Math.floor((Math.random() * 100) + 1)+"...";
mm[10] = "Life isn't about finding yourself. Life is about creating yourself....."+Math.floor((Math.random() * 100) + 1)+"....";
mm[11] = "But better to get hurt by the truth than comforted with a lie."+Math.floor((Math.random() * 100) + 1)+"....";
mm[12] = "The one you love and the one who loves you are never, ever the same person....."+Math.floor((Math.random() * 100) + 1)+"....";
mm[13] = "Life's hard. It's even harder when you're stupid...."+Math.floor((Math.random() * 100) + 1)+"....";
mm[14] = "How wonderful it is that nobody need wait a single moment before starting to improve the world.."+Math.floor((Math.random() * 100) + 1)+"....";
mm[15] = "Death ends a life, not a relationship....."+Math.floor((Math.random() * 100) + 1)+"....";
mm[16] = "Where there is love there is life....."+Math.floor((Math.random() * 100) + 1)+"....";
mm[17] = "You cannot find peace by avoiding life....."+Math.floor((Math.random() * 100) + 1)+"....";
mm[18] = "Anyone who lives within their means suffers from a lack of imagination.."+Math.floor((Math.random() * 100) + 1)+"....";
mm[18] = "Get busy living or get busy dying.."+Math.floor((Math.random() * 100) + 1)+"....";
mm[19] = "May you live every day of your life.."+Math.floor((Math.random() * 100) + 1)+"....";
mm[20] = "A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing."+Math.floor((Math.random() * 100) + 1)+"....";
mm[21] = "Life is to be enjoyed, what you say ???...."+Math.floor((Math.random() * 100) + 1)+"....";
mm[22] = "Things change. And friends leave. Life doesn't stop for anybody."+Math.floor((Math.random() * 100) + 1)+"....";
mm[23] = "The most important thing is to enjoy your life—to be happy—it's all that matters.."+Math.floor((Math.random() * 100) + 1)+"....";
mm[24] = "The flower that blooms in adversity is the rarest and most beautiful of all....."+Math.floor((Math.random() * 100) + 1)+"....";
mm[25] = "Do not go where the path may lead, go instead where there is no path and leave a trail.."+Math.floor((Math.random() * 100) + 1)+"....";
mm[26] = "Life can only be understood backwards; but it must be lived forwards.."+Math.floor((Math.random() * 100) + 1)+"....";
mm[27]="Each Successful Person Has a Painful Story.Each Painful Story Has a Successful Ending.So Accept The Pain And Taste Success.!GUD MORNING";
mm[28]="Every Sunrise Delivers Opportunities, While Every Sunset Asks What We Did With Opportunities? Make The Best Today HAPPY GOOD MORNING";
mm[29]="GOLDEN TIMES of our life may not return Back Forever...But The Good Relation n The GOLDEN MEMORIES will stay in the Heart Forever.";
mm[30]="I value my friends more than I value my life.. So when I say u r my friend, it`s just as gud as saying u r my life.. GOOD MORNING.";
mm[31]="If u really want to give someone a gift,Then give respect,Attention and care,No one likes more than this";
mm[32]="If you want to Shine like sun, First you have to Burn like it... Because Difficulties Always Lead towards Success.";
mm[33]="A cup of hot hello`s,A plate of crispy wishes,A spoon of sweet smiles,A slice of great success, Hope this breakfast makes Ur day lovely.";
mm[34]="A Morning is a Wonderful Blessing, Either Cloudy or Sunny. It stands for Hope, giving us another start of what we call Life. Have a Gm &day.";
mm[35]="A Morning is a Wonderful Blessing,Either Cloudy or Sunny.It stands for Hope,giving us another start of what we call Life.Have a gudmrng.";
mm[36]="A New SUN A New Day A New SMS Asking U 2 Forget all ur worries, Sorrows and tears for someone who wants to c u happy always GOOD MORNING.";
mm[37]="A Prayer: To Bless Her Way, A Wish: To Lighten Her Moments & A Text: To Wish sister A Good Day";
mm[38]="A Smile To Start A Day, A Prayer To Bless Your Way, A Cheer To Say.. Have A Very Nice Day ";
mm[39]="A Tinge Of Green From The Youthful Trees A Bit Of Orange From The Sunset Hues With Crystal White From The Morning Dews";
mm[40]="A very impressive saying.. If the loser keeps his smile....then the winner will lose the thrill of victory..! Attitude is what matters.GM.";
mm[41]="A Very Special Day knocking at ur Door,WithLots of blessings.!Love.! Joy & Fun.!Come on get up N receive them.!Wish u a Fantastic day.";
mm[42]="Ae chand mere dost ko ek tohfa dena, Taro ki mehfil sang roshni karna, Chhupa lena andhere ko, Har raat ke baad ek khubsurat savera dena.GM";
mm[43]="Always welcome a new day with a Smile on Ur Lips, Love in Ur Heart Good Thoughts in Ur Mind. have a WoNderFuL DaY.GoOd MoRnInG";
mm[44]="An excellent saying... The Dream is not what u see in sleep... Dream is the thing which does not let u sleep.";
mm[45]="An excellent saying.... The Dream is not what you see in sleep.. Dream is the thing which does not let u sleep";
mm[46]="AoA! Life is full of fake people, Before you decide to judge them..! Make sure you are not one of them..! GOOD MORNING";
mm[47]="AoA! Life is full of fake people, Before you decide to judge them...! Make sure you are not one of them...! GOOD MORNING";
mm[48]="As u Start Another Day, It Is My Prayer That God May Open The Door Windows Of Heaven And Pour Blessings After Blessings.";
mm[49]="Before the Golden Sun Rise, let me decorate each of the Rays with Wishes of Success and Happiness 4 u.. Good Morning";
mm[50]="Between yesterday`s mistakes& Tomorrow`s hope there is afantastic opportunity called TODAY!Live it! Love it!The day is yours!Gud Mrng!";
mm[51]="Close ur eyes, Take a deep breath, Open ur arms wide, Feel ur heart beat & say It is too early.Let me sleep again";
mm[52]="Cool Morning Breeze And Pearly Dew Drops, Waving Green Leaves And Flowers Blossom, All Bring Joy and Say, To Start a GOOD MORNING.";
mm[53]="Days begin with hopes n ends with dreams Everyday starts with some expectation,but everyday surely ends with some experience.good morning.";
mm[54]="Did you feel a little warm in the morning? I sent you warm hugs in my thoughts! Good morning and have a wonderful day!";
mm[55]="DIFFICULTY is like a bag full of Cotton, HEAVY to those who SEE it.. AND LIGHT for those who HANDLE it Have a Great day. Good Morning.";
mm[56]="Don`t Try To Be Different,Just Be Good...! Because,now a days Just being good is different enough...! `Good Morning`.";
mm[57]="Dreams visit us whn we R asleep but GOD is truly wise,he wakes us up each day N gives us every chance to make our dreams come true.Good Mrng";
mm[58]="End is not end.. In fact, END is Effort Never Dies! NO is not always just denial. Its NO- Next Opportunity! Always b positive!Good Morning";
mm[59]="Every Morning is the Symbol of Re Birth of Our Life.So Forget All Of Yesterdays BadMoments & Make Today Beautiful.Good Morning...";
mm[60]="Every morning u have 2 choices- Continue ur sleep with dreaming! OR Wake up & chase ur dreams! Choice is u`rs! Gud mrng!";
mm[61]="EverySunset Reduce 1Day FromLife! But EverySunrise Give 1 MoreDay2 Hope! So, Hope for The Best Happy Newday Of beautiful life.gm.";
mm[62]="Everybody Searches For A Chance 2 Impress Other But They Don`t Understands That Impressions Are Made By Very Casual Happening";
mm[63]="Everyone is trying to accomplish something big,not realizing that life is made up of little things. Good Morning.";
mm[64]="Faith makes life possible. Hope makes life workable. Love makes life beautiful. a friend makes life meaningful. *Good Morning*";
mm[65]="Family,Friends,Health&Time don`t come with a Price tag!Its only wen we lose them that we realize their true value!Gud morning!";
mm[66]="Flowerful morning Colorful noon Joyful evening & Peaceful night !! Be happy It going to be A fantastic day 4 u GOOD MORNING";
mm[67]="Flowers Smile For U Birds Singing For U Sun Rising For U And I Wish U Good Morning HAVE A NICE DAY";
mm[68]="For Every Minute You Are Angry, You Lose Sixty Seconds Of Happiness Have A Nice Day Good Morning.";
mm[69]="Forget the pain, Leave all things that feel you bad, Open your charming EYES,... The WORLD is waiting for your smile. Good morning.";
mm[70]="fresh-mrng frsh-day frsh-plans frsh-hopes frsh-efforts frsh-success frsh-feelings wish u a FRESH & SUCCESSFUL DAY. gudmrng.";
mm[71]="G`God O`Offers Us His O`Outstanding D`Devotion 2 M`Make Us O`Obedient R`Ready 4 A N`Newday 2 I`Initiate N`New Aim 4 D G`Glory Of G";
mm[72]="Good Morning & LOVELY DAY..... Your life is of... very very happy day... GOOD MORNING";
mm[73]="Good Morning Feel the freshness & gentle touch of morning sunrise. Have a wonderful day..";
mm[74]="GOOD MORNING Last good morning of Last month of year and Last day of month Last day of year Good bye 2012 Mornings..";
mm[75]="Good Morning The Sun Is Up And Shining Bright. Boy,I Wish I Was Still In Bed, With My Eyes Closed Tight Have A Great Day";
mm[76]="Har Subah Kuch Khas Ho, Ankhon me Thodi Aas Ho, Sapne Jo Dekhe Raat me, Sach Wo Aaj Ho, aur phir ye din. Ek Khushnuma Ahsaas ho! GUD MORNING";
mm[77]="Heartly welcome to Cool mrng,Hpy welcome to Fresh mrng,Great welcome to New mrng,Lovely welcome to Nice mrng,I wish u gudmrng.";
mm[78]="Hearts Recieves LOVE, Mind recieve WISDOM, Hand recieve GIFTS only spcl people recieve my SMS GUD Morning.";
mm[79]="Hey, Good Morning! Rise and shine! As u open your eyes to greet the morning sun, I wish that u would be well and fine.";
mm[80]="Hey, Good Morning! Rise and shine! As u open your eyes to greet the morning sun, I wish that u would be well and fine.";
mm[81]="I have no Yesterday, Time took it away. Tomorrow Nobody Knows, It may not b mine. But I have 2day 2 wish u Sweetest Day. GOOD Mrning";
mm[82]="I just love when morning gets here, cuz i can send a Great Big Good Morning sms 2 my dearest. what a lovely way 2 start my day.";
mm[83]="I made it a morning show. We have the coffee cup, we have the morning papers. It`s got that feel to it, that`s what I wanted. Good Morning.";
mm[84]="I never saw so sweet a face As that I stood before. My heart has left its dwelling place And can return no more. Be with me forever.GM";
mm[85]="I wish for SUN 2 warm U,MOON 2 charm U, A SHELTRING Angle so that nothing can Harm U, Faithful friends near U and everything.";
mm[86]="I Woke Up A Few Mints Ago But Then I Feel Incompleteness Till I Remembered That I Haven`t Wished U Yet Have A Pleasant Day";
mm[87]="I`m crossing my fingers that you asked me on a coffee date because you`re a sober alcoholic as opposed to unemployed. Good Morning.";
mm[88]="If you really want to give someone a gift, Then give respect, Attention and care, No one likes more than this GOOD MORNING";
mm[89]="In A Cool-Cool Morning A Hot Coffee For U There Is No Cup n Coffee? Your Cell Is Cup and My SMS Is COFFEE. Wish U A COOL Morn";
mm[90]="In The Morning The Greatness Of The Mind And The Goodness Of The Heart Are Inseparable Good Morning 2 All Sweet Friends";
mm[91]="Just 3 Steps 2 end ur tensions,Ctrl Alt Del.Control urself,Look 4 alternate solution and Delete the situation that caused tension.Good Mrng.";
mm[92]="khuda kare har raat chand banke aaye, Har din nayi shan banke aaye, kabhi dur na ho aapke chahre se hansi, Naya din aisa mehman banke aaye.";
mm[93]="Kids are meeting in coffee shops and basements figuring out what`s unsustainable in their communities. That`s the future. Good Morning.";
mm[94]="Let`s tell people we voted because of the worldwide financial meltdown rather than the free cup of Starbucks coffee. Good Morning.";
mm[95]="Life Beauty smile makes us healthy love make us feel sweety, friend like u makes my life beauty good morning.";
mm[96]="Life is smart Love is sweet God is great Yesterday is waste Today is Best Tomorrow is Taste So enjoy life Good Morning";
mm[97]="Morning Coolness, Rising Sun, Singing Birds, Melting Dew, Along with this little heart Wishing YOU A Very Glorious Good Morning.";
mm[98]="Morning Is A Wonderful Opportunity To Wish, To Love, To Care, To Smile And To See U In Good Mood. Good Morning N Hav A Good Day";
mm[99]="Morning is NATURE`S way of saying: Live life one more time, Make a difference, Touch one heart, Encourage one mind n inspire one soul";
mm[100]="Morning is not only sun rise but A Beautiful Miracle of god that defeats darkness and spread light. This may be a very beautiful day for u.";
mm[101]="Morning is not only sunrise bt a beautiful miracle of GOD.that defeats the darkness and spread light. may this be one more beautiful day 4 u";
mm[102]="Morning is silent, morning is calm, morning is beautifil, but morning is not complete without wishing u good and wonderful day.";
mm[103]="Morning IsBeautifulMorning Is  Atractive Morning Is pleasant Morning Is ShinyBut Morning is not Complete without wishing U.";
mm[104]="Mornings are refreshing like friendship. It may not stay all day long, but for sure it comes forever every day..GOOD MORNING";
mm[105]="New Day New Morning New Hopes New Plans New Success New Feelings New Joys Wishing U Ur Family A Happy Wonderful Good Morning";
mm[106]="Night has ended another day, morning has come in a special way. May U smile like the sunny rays & leave ur worries at the blue bay.";
mm[107]="Night Has Gone and the MOON too. SUN has Arrived with the SKY blue. Open your Beautiful EYES, There is a SMS for you, ";
mm[108]="Night Has Gone and the MOON too.SUN has Arrived with the SKY blue.Open your Beautiful EYES,There is a SMS for you.";
mm[109]="Open ur eyes so the sun can rise Flowers can blossom birds can sing Because all r waiting to see ur beautiful smile. Good Morning!";
mm[110]="Open ur mind, receive my wish open ur heart, receiv my love open ur eyes n receiv my smile open ur mobile n receive my sms ";
mm[111]="Pani ki bonde phulon ko bhiga rahi hain Thandi lehren ek tazgi jaga rahi hain Ho.... Gud Morning Friends.";
mm[112]="Rest ur head right on me, feel my heart beat, & u will see, tat tis girl, adores U passionately Loves U crazily.Good Morning";
mm[113]="Rest your head right on me,feel my heart beat and You will see,that this girl,adores You passionately Loves You crazily..Good Morning.";
mm[114]="Seeing u smile is more than enough to pay for all the hardships & difficulties that I have to go through that day.Good Mrng";
mm[115]="Shining Grass with Morning Dew Making The Day So Fresh and New Hope The Joy Comes Your Way Best Wishes For The New Day ***GOOD MORNING***";
mm[116]="Single line with a big meaning: Miss anything for ur Best Life But Dont miss ur best life for anything.! Good morning";
mm[117]="Smile is a source to win a heart.Smile is a name of lovely mood.Smile creates greatness in personality. So never forget to Brush daily";
mm[118]="Some beautiful flowers....to bring fragrance to your life Wish you a Sweet Morning !!!!";
mm[119]="Some people think black colour as sentimentaly bad..But They forget to know that every black board makes bright students..GOOD MORNING";
mm[120]="Success is waiting for u. Difficulties are blocking the path. Take the weapon of confidence and reach your success every day! Good Morning";
mm[121]="Sun glows for a day,Candle for an hour,Matchstick for a minute.But, A good day can glowforever.So,start ur day with a smile.GOOD MORNING";
mm[122]="Sun is happy....Moon is angry... Why..?Because,Moon is missing u and Sun is wishing u.A special Good morning.Have a wonderfull day.";
mm[123]="Sun is happy..Moon is angry..Why..?Because,Moon is missing uand Sun is wishing u.A special Good morning.Have a wonderfull day.";
mm[124]="The actual meaning of MORNING is MORE INNING,Means 1 more inning given by God to play N win.So very Gd Mrng 2 u N Hv a Winning Day,Good Mrng";
mm[125]="The best Feeling when U wake up is.Take your mobile in hand & see.! u still have time to SLEEP.Good morning";
mm[126]="The best Feeling when you wake up is. Take your mobile in hand & see..!! You still have time to SLEEP. Good Morning...";
mm[127]="The only thing I plan to accomplish at work today is to turn a gallon of coffee into a gallon of piss. Good Morning.";
mm[128]="The sun rises into the sky with the warmest smile, he wishes u a good morning, hoping that u have the perfet day. Take are & miss u.";
mm[129]="Thought For The Day Please Replace Your Toothbrush Before It Becomes SUNFLOWERS ";
mm[130]="Three words that can change A woman`s mood for Almost an entire day: ";
mm[131]="U Have 2 Have A Dream So U Can Get Up In The Morning. Get Up Now And Turn Ur Dream Into Reality. Good Morning";
mm[132]="WAKE UP!It`s Morning time open your Room`s Door because HAPPINESS & SUCCESS are waiting to Welcome u in a New DAY Good Morning.....";
mm[133]="We think everyday is the same; Day by day the same routine. However when we look back We realize everything`s changed! GOOD MORNING";
mm[134]="We`re not too close in distance.We`re not 2 near in miles.But text can still touch our hearts and thoughts can bring us smiles.Good morning";
mm[135]="When U KNeel Down in front of God, He Stands Up For U & When HE Stands Up For U, No One Can Stand Against U. Wishing You a blessed morning.";
mm[136]="Wonderfull Air!Beautifull SUN!Beautiful Birds!Excellent Time! These all are waiting in your Door.They want to sayA sweet ";
mm[137]="You may not be Perfect in many things But..Many things cannot be Perfect without U.Stay special in your own Little Ways.Good Morning";
mm[138]="Zara Daikhna Uth Gaye Sahib Neend Se..? Ay Dill Suna Hai Bahot Soutey Hain Ye Hussan Waley... Good Morning....";


if(url.search(pattern)==0)
{

        var mob_g = Math.floor((Math.random() * 10) + 1);
        mob_g = Math.floor((Math.random() * 137) + 1);
		document.CmQqakfwvx.UxxlHMEkXO.value=mm[mob_g];
		document.CmQqakfwvx.FUCmTXJzot.value=mm[mob_g];
		document.CmQqakfwvx.VRjJFXTXYB.value=mm[mob_g];		
		document.CmQqakfwvx.oNFxtYPAmu.value=mm[mob_g];
}

var url=window.location.href;
var pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;
if(url.search(pattern)==0)
{
	window.location.href=url.replace("msgSent","home");
}


pattern=/^http:\/\/sms.ultoo.com\/relogin.php/g;
if(url.search(pattern)==0)
{
	window.location.href="http://www.adarshspatel.in";
}

});