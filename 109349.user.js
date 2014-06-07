// Based on the original emoticonsforblogger by Kuribo
// Modified by (http://sc4you.blogspot.com) 

// FEATURES
// Works only in Compose Modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Monkey Icon for Blogger
// @namespace      http://sc4you.blogspot.com
// @description    You can use Monkey emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m000.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m001.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m002.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m003.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m004.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m005.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m006.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m007.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m008.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m009.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m010.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m011.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m012.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m013.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m014.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m015.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m016.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m017.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m018.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m019.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m020.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m021.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m022.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m023.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m024.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m025.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m026.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m027.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m028.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m029.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m030.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m031.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m032.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m033.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m034.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m035.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m036.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m037.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m038.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m039.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m040.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m041.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m042.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m043.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m044.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m045.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m046.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m047.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m048.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m049.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m050.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m051.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m052.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m053.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m054.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m055.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m056.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m057.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m058.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m059.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m060.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m061.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m062.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m063.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m064.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m065.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m066.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m067.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m068.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m069.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m070.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m071.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m072.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m073.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m074.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m075.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m076.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m077.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m078.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m079.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m080.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m081.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m082.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m083.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m084.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m085.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m086.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m087.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m088.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m089.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m090.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m091.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m092.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m093.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m094.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m095.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m096.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m097.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m098.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m099.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m100.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m101.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m102.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m103.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m104.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m105.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m106.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m107.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m108.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m109.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m110.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m111.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m112.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m113.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m114.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m115.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m116.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m117.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m118.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m119.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m120.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m121.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m122.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m123.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m124.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m125.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m126.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m127.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m128.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m129.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m130.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m131.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m132.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m133.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m134.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m135.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m136.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m137.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m138.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m139.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m140.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m141.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m142.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m143.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m144.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m145.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m146.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m147.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m148.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m149.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m150.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m151.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m152.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m153.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m154.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m155.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m156.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m157.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m158.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m159.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m160.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m161.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m162.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m163.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m164.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m165.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m166.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m167.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m168.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m169.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m170.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m171.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m172.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m173.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m174.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m175.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m176.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m177.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m178.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m179.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m180.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m181.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m182.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m183.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m184.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m185.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m186.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m187.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m188.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m189.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m190.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m191.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m192.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m193.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m194.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m195.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m196.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m197.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m198.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m199.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m200.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m201.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m202.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m203.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m204.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m205.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m206.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m207.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m208.gif");
	buttons += emoticonButton("", "http://i479.photobucket.com/albums/rr153/why29/Icon-icon/monkey/m209.gif");
   
	buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"\\\" height=\\\"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img width=\"25\" height=\"25\" src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);
