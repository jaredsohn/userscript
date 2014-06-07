// ==UserScript==
// @name           Yahoo + Plurk Emoticon For Blogger
// @namespace      http://willysr.blogspot.com
// @description    Show Yahoo's and Plurk's Emoticon in Blogger
// @include        http://*blogger.com/post-edit.g?*
// @include        http://*blogger.com/post-create.g?*
// @include        http://*blogger.com/post-create.do
// ==/UserScript==



window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />"; 
  // Yahoo's Icon       
	buttons += emoticonButton("happy", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif",18);
	buttons += emoticonButton("sad", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif",18);
	buttons += emoticonButton("winking", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif",18);
	buttons += emoticonButton("big grin", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif",18);
	buttons += emoticonButton("batting eyelashes", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif",18);
	buttons += emoticonButton("big hug", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif",42);
	buttons += emoticonButton("confused", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif",20);
	buttons += emoticonButton("love struck", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif",18);
	buttons += emoticonButton("blushing", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif",18);
	buttons += emoticonButton("tongue", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif",18);
	buttons += emoticonButton("kiss", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif",18);
	buttons += emoticonButton("broken heart", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif",18);
	buttons += emoticonButton("surprise", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif",18);
	buttons += emoticonButton("angry", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif",34);
	buttons += emoticonButton("smug", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif",18);
	buttons += emoticonButton("cool", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif",18);
	buttons += emoticonButton("worried", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif",18);
	buttons += emoticonButton("whew!", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif",34);
	buttons += emoticonButton("devil", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif",18);
	buttons += emoticonButton("crying", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif",22);
	buttons += emoticonButton("laughing", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif",18);
	buttons += emoticonButton("straight face", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif",18);
	buttons += emoticonButton("raised eyebrow", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif",18);
	buttons += emoticonButton("rolling on the floor", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif",30);
	buttons += emoticonButton("angel", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif",30);
	buttons += emoticonButton("nerd", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif",24);
	buttons += emoticonButton("talk to the hand", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif",18);
	buttons += emoticonButton("call me", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/101.gif",28);
	buttons += emoticonButton("on the phone", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/100.gif",31);
	buttons += emoticonButton("at wits end", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif",44);
	buttons += emoticonButton("wave", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/103.gif",28);
	buttons += emoticonButton("time out", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/104.gif",30);
	buttons += emoticonButton("daydreaming", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif",23);
	buttons += emoticonButton("sleepy", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif",21);
	buttons += emoticonButton("rolling eyes", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/29.gif",18);
	buttons += emoticonButton("loser", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif",24);
	buttons += emoticonButton("sick", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif",18);
	buttons += emoticonButton("dont tell anyone", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif",18);
	buttons += emoticonButton("not talking", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif",18);
	buttons += emoticonButton("clown", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/34.gif",28);
	buttons += emoticonButton("silly", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/35.gif",24);
	buttons += emoticonButton("party", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif",38);
	buttons += emoticonButton("yawn", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif",18);
	buttons += emoticonButton("drooling", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif",18);
	buttons += emoticonButton("thinking", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif",18);
	buttons += emoticonButton("doh", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif",24);
	buttons += emoticonButton("applause", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif",18);
	buttons += emoticonButton("nailbiting", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif",36);
	buttons += emoticonButton("hypnotized", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/43.gif",18);
	buttons += emoticonButton("liar", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif",18);
	buttons += emoticonButton("waiting", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif",23);
	buttons += emoticonButton("sigh", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif",24);
	buttons += emoticonButton("phbbbbt", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif",18);
	buttons += emoticonButton("cowboy", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/48.gif",18);
	buttons += emoticonButton("I dont want to see", "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/109.gif",25);
	buttons += emoticonButton("hurry up!", "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/110.gif",36);
	buttons += emoticonButton("rock on!", "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/111.gif",32);
	buttons += emoticonButton("thumbs down", "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/112.gif",28);
	buttons += emoticonButton("thumbs up", "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/113.gif",39);
	buttons += emoticonButton("it wasnt me", "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/114.gif",40);
	buttons += emoticonButton("puppy dog eyes", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/108.gif",31);
	buttons += emoticonButton("I dont know", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif",40);
	buttons += emoticonButton("not listening", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/107.gif",52);
	buttons += emoticonButton("pig", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/49.gif",18);
	buttons += emoticonButton("cow", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/50.gif",18);
	buttons += emoticonButton("monkey", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/51.gif",21);
	buttons += emoticonButton("chicken", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/52.gif",18);
	buttons += emoticonButton("rose", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif",18);
	buttons += emoticonButton("good luck", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/54.gif",18);
	buttons += emoticonButton("flag", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/55.gif",25);
	buttons += emoticonButton("pumpkin", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/56.gif",17);
	buttons += emoticonButton("coffee", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif",18);
	buttons += emoticonButton("idea", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/58.gif",30);
	buttons += emoticonButton("skull", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/59.gif",18);
	buttons += emoticonButton("bug", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/60.gif",20);
	buttons += emoticonButton("alien", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/61.gif",18);
	buttons += emoticonButton("frustrated", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif",18);
	buttons += emoticonButton("praying", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif",18);
	buttons += emoticonButton("money eyes", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/64.gif",18);
	buttons += emoticonButton("whistling", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif",22);
	buttons += emoticonButton("feeling beat up", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif",18);
	buttons += emoticonButton("peace sign", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/67.gif",22);
	buttons += emoticonButton("shame on you", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif",22);
	buttons += emoticonButton("dancing", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif",26);
	buttons += emoticonButton("bring it on", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/70.gif",23);
	buttons += emoticonButton("hee hee", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif",18);
	buttons += emoticonButton("chatterbox", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/76.gif",36);
	buttons += emoticonButton("not worthy", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/77.gif",32);
	buttons += emoticonButton("oh go on", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif",26);
	buttons += emoticonButton("star", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/79.gif",18);
	buttons += emoticonButton("hiro", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/72.gif",18);
	buttons += emoticonButton("billy", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/73.gif",18);
	buttons += emoticonButton("april", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/74.gif",18);
	buttons += emoticonButton("yin yang", "http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/75.gif",18);
	buttons += emoticonButton("bee", "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/115.gif",29);	
	buttons += separator();
	buttons += emoticonButton("Kiss", "http://statics.plurk.com/9454d15bcaf411b159dcc147ebc3f0eb.gif", 19);
	buttons += emoticonButton("Angry", "http://statics.plurk.com/a5ae31c4185bc60cd006650dc10f8147.gif", 33);
	buttons += emoticonButton("Annoyed", "http://statics.plurk.com/35b16fc25623670e41c2be6bf8ac38c7.gif", 18);
	buttons += emoticonButton("Wave", "http://statics.plurk.com/4afd784c0df9f7a3ceacb92beca543f6.gif", 26);
	buttons += emoticonButton("B-)", "http://statics.plurk.com/c1c9870cf653fa3cd103d2eb0f519ccb.gif", 18);
	buttons += emoticonButton("Cozy", "http://statics.plurk.com/d1a6f08507b126ec6a215e6a2372e8bb.gif", 47);
	buttons += emoticonButton("Sick", "http://statics.plurk.com/5495d64ccb898ca596b061168fa0374a.gif", 19);
	buttons += emoticonButton("Goodluck", "http://statics.plurk.com/65271ac2126706bc09d31ff67c525d67.gif", 25);
	buttons += emoticonButton("Griltongue", "http://statics.plurk.com/a709dab8ddd26bd222466d31bd549579.png", 19);
	buttons += emoticonButton("mmm", "http://statics.plurk.com/e3baa9d0d78c35e955a6b07c39f530fa.gif", 19);
	buttons += emoticonButton("Hungry", "http://statics.plurk.com/0f96595ed7733393b93a3d67aa4f2f4f.gif", 29);
	buttons += emoticonButton("Music", "http://statics.plurk.com/919b87048fdf7bd59dae457f4284b20b.gif", 32);
	buttons += emoticonButton("Tears", "http://statics.plurk.com/96872d481bbfe87aad5aed976c7de4ee.gif", 18);
	buttons += emoticonButton("tongue", "http://statics.plurk.com/56336bb821c4766001816639e55e5811.gif", 20);
	buttons += emoticonButton("Unsure", "http://statics.plurk.com/6cb1dc388b9259565efedef8f336d27d.gif", 18);
	buttons += emoticonButton("Wave", "http://statics.plurk.com/a9560787e93f4f8890e4bd38696ba537.gif", 28);
	buttons += emoticonButton("Banana Lv 1", "http://statics.plurk.com/a55bdb344892676b0fea545354654a49.gif", 33);
	buttons += emoticonButton("Sky", "http://statics.plurk.com/9939dd585cf0e8d39e7912a98a9ce727.gif", 19);
	buttons += emoticonButton("Doh", "http://statics.plurk.com/e8ed6c7eed76d2acd9dbf469f29fbec2.gif", 21);
	buttons += emoticonButton("Broken Heart", "http://statics.plurk.com/2b3593aea68efa7a00b4ef2850f98b8a.gif", 18);
	buttons += emoticonButton("Cheers", "http://statics.plurk.com/ed3620ff28a02e3dc9ac4ffa8e6ae2e6.gif", 57);
	buttons += emoticonButton("Girl Kiss", "http://statics.plurk.com/08a43d50691a1ed22706fc92f568fa07.gif", 19);
	buttons += emoticonButton("rofl", "http://statics.plurk.com/8600839dc03e6275b53fd03a0eba09cf.gif", 30);
	buttons += emoticonButton("Money", "http://statics.plurk.com/e6bb16b6ef386c5f23900b103dbdba31.gif", 18);
	buttons += emoticonButton("Rock", "http://statics.plurk.com/1c890273544559b17f090d09238fa763.gif", 29);
	buttons += emoticonButton("Not Talking", "http://statics.plurk.com/f053074bcce500fbd1e2327d49748a6d.gif", 18);
	buttons += emoticonButton("Party", "http://statics.plurk.com/1f44d3984a094fceae1f1a016a730fc9.gif", 19);
	buttons += emoticonButton("Sleeping", "http://statics.plurk.com/2f7c90ce56fb4a70e34c04d8d7692dd0.gif", 29);
	buttons += emoticonButton("Thinking", "http://statics.plurk.com/900f3dd0adaad9142d567caf6bfb1311.gif", 18);
	buttons += emoticonButton("Bring it", "http://statics.plurk.com/95ace5ba1097301b5206a9e0fb431624.gif", 23);
	buttons += emoticonButton("Worship", "http://statics.plurk.com/95e69aa508d4bb435706b9db0a610dad.gif", 33);
	buttons += emoticonButton("Applause", "http://statics.plurk.com/a08ed27ec14b48d4703f53f7eb94834b.gif", 18);
	buttons += emoticonButton("8-)", "http://statics.plurk.com/85ef5fa01a6a67a525429f8bf4279fe7.gif", 24);
	buttons += emoticonButton("Gym", "http://statics.plurk.com/986ecf2b1ae69072e0195b0a58545900.gif", 32);
	buttons += emoticonButton("Heart", "http://statics.plurk.com/150e3f367a063d3baf9720719d78d778.gif", 19);
	buttons += emoticonButton("Devil", "http://statics.plurk.com/3fabe74e992888be701de2a9d80c180a.gif", 19);
	buttons += emoticonButton("lmao", "http://statics.plurk.com/92b595a573d25dd5e39a57b5d56d4d03.gif", 40);	
	buttons += emoticonButton("Banana Lv 2", "http://statics.plurk.com/4f01bac8a707e5450307f97065ec0fa7.gif", 30);
	buttons += emoticonButton("Rocking Banana", "http://statics.plurk.com/48515125401120316abb97666458d05b.gif", 35);
	buttons += emoticonButton("Bring it", "http://statics.plurk.com/aabbc82c2b0dc72bfbce2f82c97a95e8.gif", 15);
	buttons += emoticonButton("Breakdance", "http://statics.plurk.com/b0b0596acce9ffc1f2a27548aa642eaf.gif", 37);
	buttons += emoticonButton("Heart lv 2", "http://statics.plurk.com/52991d7ff65a05526454bd1170a0f14c.gif", 16);
	buttons += emoticonButton("Ninja", "http://statics.plurk.com/846277f0a154dc95a08594b7d32a5ccd.gif", 18);
	buttons += emoticonButton("Rolling", "http://statics.plurk.com/843739a95294fd0bf4c958840b46408f.gif", 20);
	buttons += emoticonButton("Annoyed Lv 2", "http://statics.plurk.com/22416dced8b59446db8cd366cc925d09.gif", 20);
	buttons += emoticonButton("Confused Lv 2", "http://statics.plurk.com/e3f0f67ca3af62e34f13abf1d036a010.gif", 19);
	buttons += emoticonButton("Devil Lv 2", "http://statics.plurk.com/84f94a47fcaf1df0a5f17a1cfa52fa64.gif", 29);
	buttons += emoticonButton("Teaser", "http://statics.plurk.com/44117848701cd748460921cfea5c3781.gif", 48);
	buttons += emoticonButton("Big Eyes", "http://statics.plurk.com/8073c1716e75d32eb79f97a9f521fa01.gif", 26);
	buttons += emoticonButton("Funky Dance", "http://statics.plurk.com/373cd2f23dab7528d4875170d13d64f7.gif", 31);
	buttons += emoticonButton("Idiot", "http://statics.plurk.com/8863234ebea13f109c9b15ba19a4531c.gif", 45);
	buttons += emoticonButton("Lonely", "http://statics.plurk.com/8738c7a1c402f41b5319abe504ce9687.gif", 43);
	buttons += emoticonButton("Scenic", "http://statics.plurk.com/db4c4a7d141fdcaca4d4b11f8fb360db.gif", 49);
	buttons += emoticonButton("Hassle", "http://statics.plurk.com/ced6d40bebe2d424b59322b311fc04bb.gif", 67);
	buttons += emoticonButton("Panic", "http://statics.plurk.com/b62d1e55e8311af5bc7526c595ac1dbb.gif", 20);
	buttons += emoticonButton("Annoyed Level 2", "http://statics.plurk.com/9b6f4864c822e1a97c98507c2b41a74f.gif", 20);
	buttons += emoticonButton("Panic", "http://statics.plurk.com/b62d1e55e8311af5bc7526c595ac1dbb.gif", 20);
	buttons += emoticonButton("Yahoo", "http://statics.plurk.com/e49c8ae965452550c98fc7f99741ae0d.gif", 42);
	buttons += emoticonButton("Crying", "http://statics.plurk.com/318416eab5a856bddb1e106a21ff557a.gif", 19);
  editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url,width) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"" + width + "\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);

