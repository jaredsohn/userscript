// ==UserScript==
// @name        Firefox Speed Dial
// @namespace   http://ocube.bplaced.net
// @description adds 9 favorites to about:blank
// @include     about:blank
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
$(document).ready(function() {

//Stylesheet
$("body").append('<style type="text/css">body{background-color:rgba(229, 229, 229, 0.7); margin:0;font-family:Arial, Helvetica;}#main_favs{height:80%;width:80%;text-align:center;}#main_settings{height:80%;width:80%;text-align:left;display:none;}#footer{height:100px;position:absolute;bottom:0;border-top:1px solid #b9b9b9;width:100%;text-align:center;background-color:#cacaca;background:-moz-linear-gradient( top, #cecece, #8f8f8f);}#footer table{margin-top:0px;text-align:center;font-size:12px;color:#000;font-weight:bold;text-shadow:1px 1px 0px rgba(255, 255, 255, 0.5);}#footer table tr td{padding-left:15px;padding-right:15px;}.favs{height:170px;width:400px;background-color:#f8f8f8;text-align:left;-moz-border-radius:5px;border:1px solid #c0c0c0;}.favs:before,.favs:after {      content:"";position:absolute;z-index:-1;}.favs:before,.favs:after {margin-left:15px;margin-top:54px;width:200px;height:100px;max-width:300px;-webkit-box-shadow:0 15px 10px rgba(0, 0, 0, 0.7);-moz-box-shadow:0 15px 10px rgba(0, 0, 0, 0.7);box-shadow:0 15px 10px rgba(0, 0, 0, 0.7);-webkit-transform:rotate(-3deg);-moz-transform:rotate(-3deg);-ms-transform:rotate(-3deg);-o-transform:rotate(-3deg);transform:rotate(-3deg);}.favs:after {margin-left:190px;margin-top:-132px;width:200px;right:auto;-webkit-transform:rotate(3deg);-moz-transform:rotate(3deg);-ms-transform:rotate(3deg);-o-transform:rotate(3deg);transform:rotate(3deg);}.img_fav{height:140px;width:400px;background-color:grey;overflow:hidden;-moz-border-radius:5px 5px 0 0;border-bottom:1px solid #c0c0c0;}.fav_text{height:20px;padding-left:10px;padding-top:5px;padding-bottom:4px;margin-top:0px;background:-moz-linear-gradient( top, #fff, #cecece);text-shadow:1px 1px 0px rgba(255, 255, 255, 0.5);}.cf{z-index:2;position:absolute;bottom:50px;width:100%;zoom:1;text-align:center;left:30%;right:30%;}.cf:after{    clear:both;}.cf:before, .cf:after{content:"";display:table;}.form-wrapper {    width: 450px;    padding: 10px;    margin: 150px auto 50px auto;    background: #cecece;      border-radius: 10px 10px 0 0;box-shadow: 0 1px 1px rgba(0,0,0,.4) inset;}.form-wrapper input {    width: 340px;        padding: 10px 40px;    float: left;    font: bold 15px "lucida sans", "trebuchet MS", "Tahoma";    border: 0;    background: #eee;    border-radius: 3px 0 0 3px;}.form-wrapper input:focus {    outline: 0;    background: #fff;    box-shadow: 0 0 2px rgba(0,0,0,.8) inset;}.form-wrapper input::-webkit-input-placeholder {   color: #999;   font-weight: normal;   font-style: italic;} .form-wrapper input:-moz-placeholder {    color: #999;    font-weight: normal;    font-style: italic;}.form-wrapper input:-ms-input-placeholder {    color: #999;    font-weight: normal;    font-style: italic;}   /* Form submit button */.form-wrapper button {    overflow: visible;    position: relative;    float: right;    border: 0;    padding: 0;    cursor: pointer;    height: 40px;    width: 110px;    font: bold 15px/40px "lucida sans", "trebuchet MS", "Tahoma";   color: #fff;    text-transform: uppercase;    background: #d83c3c;border-radius: 0 3px 3px 0;    text-shadow: 0 -1px 0 rgba(0, 0 ,0, .3);}   .form-wrapper button:hover{    background: #e54040;}  .form-wrapper button:active,.form-wrapper button:focus{    background: #c42f2f;    outline: 0;}.form-wrapper button:before { /* left arrow */    content: "";    position: absolute;    border-width: 8px 8px 8px 0;    border-style: solid solid solid none;    border-color: transparent d83c3c transparent;   top: 12px;    left: -6px;} .form-wrapper button:hover:before{    border-right-color: #e54040;}.form-wrapper button:focus:before,.form-wrapper button:active:before{        border-right-color: #c42f2f;}    .form-wrapper button::-moz-focus-inner { /* remove extra button spacing for Mozilla Firefox */    border: 0;    padding: 0;}.search_bar{position:absolute;top:18px;left:18px;width:24px;height:24px;overflow:auto;text-align:left;}.search_bar img{padding-right:5px;cursor:pointer;}</style>');


//Content
$("body").append('<table id="main_favs" align="center"></table><table id="main_settings" align="center"><tr><td><h1>Settings</h1><table id="settings_tb">	<tr><td>N°</td><td>Name</td><td>Url</td><td>Image</td><td>Get Image</td></tr></table><br><br><b>Coming soon:</b><br>*ask for other functions<br><br><a href="http://ocube.bplaced.net/">Contact</a> | &copy; <a href="http://userscripts.org/users/chiefwrigley">chiefwrigley</a></td>	</tr></table><form class="form-wrapper cf"><div class="search_bar"><img src="http://cdn1.iconfinder.com/data/icons/socialmediaicons_v120/24/google.png" alt="https://www.google.com/search?q="><img src="http://cdn1.iconfinder.com/data/icons/socialmediaicons_v120/24/wikipedia.png" alt="http://en.wikipedia.org/wiki/"><img src="http://cdn1.iconfinder.com/data/icons/WPZOOM_Social_Networking_Icon_Set/24/bing.png" alt="http://www.bing.com/search?q="><img src="http://cdn1.iconfinder.com/data/icons/socialmediaicons_v120/24/amazon.png" alt="http://www.amazon.de/s/ref=nb_sb_noss?field-keywords="></div><input type="text" placeholder="Search..." required id="search"><button type="submit">Search</button></form><div id="footer"><table align="center"><tr><td><a href="'+GM_getValue("email_f")+'"><img src="http://ocube.bplaced.net/design/portfolio/email.png" height="60px"></a></td><td><a href="'+GM_getValue("fav_f")+'"><img src="http://ocube.bplaced.net/design/portfolio/favorites.png" height="50px"></a></td><td><a href="javascript:void(0);" id="toggle_settings" title="toggle settings"><img src="http://ocube.bplaced.net/design/portfolio/gear.png" height="50px"></a></td></tr><tr><td>E-Mail</td><td>Favorites</td><td>Settings</td></tr></table></div>');


for(i=1;i<4;i++){
   $('#main_favs').append('<tr><td><div id="f'+i+'" class="favs"><div class="img_fav"><a href="'+GM_getValue("url"+i)+'"><img id="i'+i+'" src="'+GM_getValue("image"+i)+'" width="500px"></a></div><p class="fav_text">'+GM_getValue("name"+i)+'</p></div></td><td><div id="f'+(i+3)+'" class="favs"><div class="img_fav"><a href="'+GM_getValue("url"+(i+3))+'"><img id="i'+(i+3)+'" src="'+GM_getValue("image"+(i+3))+'" width="500px"></a></div><p class="fav_text">'+GM_getValue("name"+(i+3))+'</p></div></td><td><div id="f'+(i+6)+'" class="favs"><div class="img_fav"><a href="'+GM_getValue("url"+(i+6))+'"><img id="i'+(i+6)+'" src="'+GM_getValue("image"+(i+6))+'" width="500px"></a></div><p class="fav_text">'+GM_getValue("name"+(i+6))+'</p></div></td></tr>');
}

for(i=1;i<10;i++){
   $('#settings_tb').append('<tr><td>'+i+')</td><td><input type="text" value="'+GM_getValue("name"+i)+'" id="name'+i+'"></td><td><input type="text" value="'+GM_getValue("url"+i)+'" id="url'+i+'"></td><td><input type="text" value="'+GM_getValue("image"+i)+'" id="image'+i+'"></td><td><button id="gimage'+i+'" class="gimgload">Load...</button></td></tr>');
}
$('#settings_tb').append('<tr><td></td><td>E-Mail</td><td><input type="text" id="email_fav" value="'+GM_getValue("email_f")+'"></td><td></td><td></td></tr><tr><td></td><td>Favorites</td><td><input type="text" id="fav_fav" value="'+GM_getValue("fav_f")+'"></td><td></td><td></td></tr><tr><td></td><td><button id="save_ch">Save changes</button></td></tr>');


//Searchbar
$(".search_bar").hover(
  function () {
    $(this).animate({
	width:"120px"
  }, 500);
  },
  function () {
    $(this).animate({
	width:"24px"
  }, 500);
  }
);
var srch_host = "https://www.google.com/search?q=";

$(".search_bar img").click(function(){
srch_attr = $(this).attr("src");
srch_host = $(this).attr("alt");
$(this).remove();
$(".search_bar").prepend('<img src="'+srch_attr+'">');
});

$(".cf").submit(function() {
  window.location = srch_host+$("#search").val();
  return false;
})



//toggle settings
$("#toggle_settings").click(function() {
$("#main_favs").toggle();
$("#main_settings").toggle();
})

//get image
$(".gimgload").click(function(){
thisid = $(this).attr("id");
i = thisid.substr(thisid.length-1);
img = $("#name"+i).val();
	websiteFilter = "screenshot of";
	visitUrl = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&key=AIzaSyDauMjVszjTDWypXonfB8MMMOn4cDKp59I&rsz=large&safe=active&q=" + websiteFilter + " " + img;
	currentRequest = "";

	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: visitUrl,
		headers:
		{
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/plain',
		},
		onload: function(responseDetails)
		{
				res=responseDetails.responseText;
				data = JSON.parse(res);
				results = data.responseData.results;
					currentRequest = data.responseData.results[0].unescapedUrl;
							$("#image"+i).val(currentRequest);
			setTimeout(function () {}, 3000);
			
		}
	});
	})
	
	//save changes
	$("#save_ch").click(function() {
	for(i=1;i<10;i++){
	fav_name = $("#name"+i).val();
	fav_url = $("#url"+i).val();
	fav_image = $("#image"+i).val();
	
	if(fav_name!=="undefined" && fav_name!=""){
	GM_setValue("name"+i, fav_name);}
	else{GM_setValue("name"+i, "");}
	
	if(fav_url!=="undefined" && fav_url!=""){
	GM_setValue("url"+i, fav_url);}
	else{GM_setValue("url"+i, "");}
	
	if(fav_image!=="undefined" && fav_image!=""){
	GM_setValue("image"+i, fav_image);}
	else{GM_setValue("image"+i, "http://ocube.bplaced.net/design/portfolio/placeholder.jpg");}
	
	}
	fav_email = $("#email_fav").val();
	fav_fav = $("#fav_fav").val();
	
	if(fav_email!=="undefined" && fav_email!=""){
	GM_setValue("email_f", fav_email);}
	else{GM_setValue("email_f", "");}
	
	if(fav_fav!=="undefined" && fav_fav!=""){
	GM_setValue("fav_f", fav_fav);}
	else{GM_setValue("fav_f", "");}
	$("#save_ch").text("Saved succesfully!");
	})
	
	
	
	
});