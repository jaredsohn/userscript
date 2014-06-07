// ==UserScript==
//
// @name			Advanced Favorites [Module] Easy Adding
// @namespace      	http://userscripts.org/users/63675
// @description    	Adds a "Add to Advanced Favorites" on all skins, for easier use of the module, which can be added here: http://www.fpsbanana.com/modules/407. Version 1.2.
// @include        	http://www.fpsbanana.com/skins/*
// @include        	http://www.rtsbanana.com/skins/*
// @include        	http://www.rpgbanana.com/skins/*
// @include        	http://www.fpsbanana.com/members/*
// @include        	http://www.rtsbanana.com/members/*
// @include        	http://www.rpgbanana.com/members/*
// @include        	http://www.fpsbanana.com/modules/user*
// @include        	http://www.rtsbanana.com/modules/user*
// @include        	http://www.rpgbanana.com/modules/user*
// ==/UserScript==

// edit these if you want:

// check for and fix the weird bug for modules that has "^@(" at the top
var do_checkcrazy = false;
// show "Add To Advanced Favorites" on skins?
var do_showadd = true;

var text_default = "Add to Advanced Favorites!";
var text_progress = "Adding...";
var text_added = "Successfully Added!";

// strongly recommended not to edit below this line!!!!!!!!!!!!!!!!!

if(do_checkcrazy)
{
	setTimeout(checkEles, 1000);
}

var is_skin = false;
var is_progress = false;
var is_done = false;

var test1 = document.title.split(" > ");
if(test1[0].toLowerCase().substr(3,6)=="banana")
{
	if(test1[1].toLowerCase()=="skins")
	{
		if(test1[2] && test1[2].length>1)
		{
			if(test1[3] && test1[3].length>2)
			{
				is_skin = true;
			}
		}
	}
}

// adds the add element to the page
if(is_skin&&do_showadd)
{
	var div_clear = document.createElement("div");
	div_clear.style.height = "0px";
	div_clear.style.padding = "0px";
	div_clear.style.clear = "both";
	
	var div_none = document.createElement("div");
	div_none.style.display="none";
	
	var script_blank = document.createElement("script");
	script_blank.type="text/javascript";
	script_blank.innerHTML = "";
	
	var a = document.createElement("a");
	a.href="javascript:";
	a.addEventListener("click", addAdvFav, false);
	a.className="blue";
	a.innerHTML = text_default;
	
	var div1 = document.createElement("div");
	div1.className = "toggle bit left bold";
	
	var div2 = document.createElement("div");
	div2.className = "row_alt row_emboss";
	
	div2.appendChild(a);
	div2.appendChild(div_clear);
	div2.appendChild(script_blank);
	div2.appendChild(div_none);
	div1.appendChild(div2);
	if(document.getElementById("add2favsresp"))
	{
		var ele = document.getElementById("add2favsresp").parentNode.parentNode.parentNode;
		var before = document.getElementById("divaddsub2wl").parentNode.parentNode;
		ele.insertBefore(div1,before);
	} else {
		var ele = getElementsByClassName("toggle bit left")[1];
		ele.parentNode.insertBefore(div1,ele.nextSibling);
	}
}

function getUser()
{

	var user_cookie = Get_Cookie("c_userid");
	if(user_cookie)
	{
		return user_cookie;
	}
	var profile_div;
	if(getElementsByTitle("Profile"))
	{
		profile_div = getElementsByTitle("Profile");
	}
	var reg1 = /Profile \([0-9]{0,} new message\)/ig;
	if(getElementsByTitleRegex(reg1))
	{
		profile_div = getElementsByTitleRegex(reg1);
	}
	var reg2 = /Profile \([0-9]{0,} new messages\)/ig;
	if(getElementsByTitleRegex(reg2))
	{
		profile_div = getElementsByTitleRegex(reg2);
	}
	if(profile_div.length<1)
	{
		return false;
	}
	profile_div = profile_div[0];
	var profile_a = profile_div.getElementsByTagName("a");
	if(profile_a.length<1)
	{
		return false;
	}
	profile_a = profile_a[0];
	var profile = profile_a.href.toString();
	profile = strrev(profile);
	profile = profile.split("/");
	profile = profile[0];
	profile = strrev(profile);
	return profile;
}

var user = getUser();

// adding the favorite, after click
function addAdvFav()
{
	user = getUser();
	
	if(is_progress)
	{
		alert("Adding, please wait!");
		return;
	}
	if(is_done)
	{
		alert("This is already in your advanced favorites!");
		return;
	}
	
	is_progress = true;
	a.innerHTML = text_progress;
	
	var data = encode_blowfish("u="+user+"&url="+escape(document.location),"5981nfoas8df891aksfs1Ft2asS");
	
	var ajax_url = "http://sleekupload.com/fpsbmodules/advfavs/responder_add.php?data=" + escape(data);
	
	GM_xmlhttpRequest({
	method:"GET",
	url:ajax_url,
	headers:{
		"User-Agent":"monkeyagent",
		"Accept":"text/monkey,text/xml",
	},
	onload:function(details) 
	{
		if(details.readyState==4)
		{
			is_progress = false;
			
			var txt = details.responseText;
			
			if(txt=="ok"||txt=="")
			{
				is_done = true;
				a.innerHTML = text_added;
				a.className = "green";
			} else {
				a.innerHTML = text_default;
				var errors = txt.split("::");
				var error_text = "Error(s) occured:\n";
				for(i=0;i<errors.length;i++)
				{
					error_text += errors[i] + "\n";
				}
					alert(error_text);
			}
		}
	}
	});
}


// returns all elements with given title
function getElementsByTitle(title)
{
	var returner = new Array();
	var eles = document.getElementsByTagName("*");
	for(i=0;i<eles.length;i++)
	{
		e1 = eles[i];
		if(e1.title==title)
		{
			returner[returner.length] = e1;
		}
	}
	return returner;
}

// returns all elements with given title (using regex)
function getElementsByTitleRegex(re)
{
	var returner = new Array();
	var eles = document.getElementsByTagName("*");
	for(i=0;i<eles.length;i++)
	{
		e1 = eles[i];
		tst = re.test(e1.title);
		if(tst)
		{
			returner[returner.length] = e1;
		}
	}
	return returner;
}


// returns all elements with given class name
function getElementsByClassName(name)
{
	var returner = new Array();
	var eles = document.getElementsByTagName("*");
	for(i=0;i<eles.length;i++)
	{
		e2 = eles[i];
		if(e2.className==name)
		{
			returner[returner.length] = e2;
		}
	}
	return returner;
}

//reverses a string
function strrev(str)
{
	var returner = "";
	var i=str.length;
	i=i-1;
	for (var x = i; x >=0; x--)
	{
		returner += str.charAt(x);
	}
	return returner;
}

//function to check for weird "^@(" bug
function checkEles()
{
	var eles_check = new Array("mnmdl", "box407mdl", "edtmdl");
	for(i=0;i<eles_check.length;i++)
	{
		if(document.getElementById(eles_check[i]))
		{
			var ele_mixed = document.getElementById(eles_check[i]);
			ele_mixed.innerHTML = ele_mixed.innerHTML.replace(/\^\@\(/, "");
		}
	}
}


// returns value of given cookie name
function Get_Cookie( name )
{
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) &&
	( name != document.cookie.substring( 0, name.length ) ) )
	{
		return null;
	}
	if ( start == -1 )
		return null;
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 )
		end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
}


var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function encode_blowfish(input, key) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
         keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}