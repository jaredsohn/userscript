// ==UserScript==
// @name           Price Guide Summary fix-up
// @namespace      sculpturesupplies.com.au
// @description    Provide a title and image for the Price Guide Summary, links to full price guide
// @icon           http://www.sculpturesupplies.com.au/GMBL.png
// @include        http://www.bricklink.com/priceGuideSummary.asp*
// @match        http://www.bricklink.com/priceGuideSummary.asp*
// ==/UserScript==

function isImageOk(img) {
    // From: http://talideon.com/weblog/2005/02/detecting-broken-images-js.cfm
    // During the onload event, IE correctly identifies any images
    // that weren't downloaded as not complete. Others should too.
    // Gecko-based browsers act like NS4 in that they report this
    // incorrectly: they always return true.
    if (!img.complete) {
        return false;
    }

    // However, they do have two very useful properties: naturalWidth
    // and naturalHeight. These give the true size of the image. If
    // it failed to load, either of these should be zero.
    if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) {
        return false;
    }

    // No other way of checking: assume it's ok.
    return true;
}


// what part/color are we looking at?
paramsRegex=/a=(.)&colorID=(\d+)&itemID=(.+)/
params=paramsRegex.exec(document.URL);
var colorID = params[2];
smallGIF = new Image();
// The path for parts includes the color
itemType = params[1].toUpperCase();
if (itemType=='P') {
  var basename='http://img.bricklink.com/'+itemType+'/'+colorID+'/'+params[3];
} else {
  var basename='http://img.bricklink.com/'+itemType+'/'+params[3];
}
GM_log('Image url is '+basename);
// Try loading it as a GIF
smallGIF.src=basename+'.gif';
if (isImageOk(smallGIF)) {
  document.body.style.backgroundImage='url('+smallGIF.src+')';
} else {
  // Fine, it's a JPG
  smallJPG = new Image();
  smallJPG.src=basename+'.jpg';
  document.body.style.backgroundImage='url('+smallJPG.src+')';
}
// Only one copy of the image
document.body.style.backgroundRepeat='no-repeat';
// Replace no title with:
document.title="Price Guide Summary"

// Create a link to the full price guide
var newAnchor = ' <a href="http://www.bricklink.com/catalogPG.asp?'+itemType+'='+params[3];
if (itemType=='P') newAnchor=newAnchor+'&colorID='+params[2];
newAnchor=newAnchor+'" target="FullGuide" class="fv">Full Guide</a> ';
document.forms[0].innerHTML = document.forms[0].innerHTML+newAnchor;

// Add color dropdown
function ColorChanged() {
  colorRegex=/(.*&colorID=)(\d+)(.*)/
  params=colorRegex.exec(document.URL);
  document.location.href = params[1]+this.value+params[3];
}
var colorDropdownHTML = '<span id="colorMenu"><select id="p_color" name="p_color"><option value="">--- Select Color ---</option><optgroup label="-"></optgroup><optgroup label="- LEGO Colors"></optgroup><optgroup label="-"><option value="41">Aqua</option><option value="11">Black</option><option value="7">Blue</option><option value="97">Blue-Violet</option><option value="36">Bright Green</option><option value="105">Bright Light Blue</option><option value="110">Bright Light Orange</option><option value="103">Bright Light Yellow</option><option value="104">Bright Pink</option><option value="8">Brown</option><option value="63">Dark Blue</option><option value="109">Dark Blue-Violet</option><option value="85">Dark Bluish Gray</option><option value="120">Dark Brown</option><option value="91">Dark Flesh</option><option value="10">Dark Gray</option><option value="80">Dark Green</option><option value="68">Dark Orange</option><option value="47">Dark Pink</option><option value="89">Dark Purple</option><option value="59">Dark Red</option><option value="69">Dark Tan</option><option value="39">Dark Turquoise</option><option value="29">Earth Orange</option><option value="106">Fabuland Brown</option><option value="28">Flesh</option><option value="6">Green</option><option value="62">Light Blue</option><option value="86">Light Bluish Gray</option><option value="90">Light Flesh</option><option value="9">Light Gray</option><option value="38">Light Green</option><option value="35">Light Lime</option><option value="32">Light Orange</option><option value="56">Light Pink</option><option value="93">Light Purple</option><option value="26">Light Salmon</option><option value="40">Light Turquoise</option><option value="44">Light Violet</option><option value="33">Light Yellow</option><option value="34">Lime</option><option value="72">Maersk Blue</option><option value="71">Magenta</option><option value="42">Medium Blue</option><option value="150">Medium Dark Flesh</option><option value="94">Medium Dark Pink</option><option value="37">Medium Green</option><option value="76">Medium Lime</option><option value="31">Medium Orange</option><option value="73">Medium Violet</option><option value="4">Orange</option><option value="23">Pink</option><option value="24">Purple</option><option value="5">Red</option><option value="88">Reddish Brown</option><option value="27">Rust</option><option value="25">Salmon</option><option value="55">Sand Blue</option><option value="48">Sand Green</option><option value="54">Sand Purple</option><option value="58">Sand Red</option><option value="87">Sky Blue</option><option value="2">Tan</option><option value="99">Very Light Bluish Gray</option><option value="49">Very Light Gray</option><option value="96">Very Light Orange</option><option value="43">Violet</option><option value="1">White</option><option value="3">Yellow</option><option value="13">Trans-Black</option><option value="108">Trans-Bright Green</option><option value="12">Trans-Clear</option><option value="14">Trans-Dark Blue</option><option value="50">Trans-Dark Pink</option><option value="20">Trans-Green</option><option value="15">Trans-Light Blue</option><option value="114">Trans-Light Purple</option><option value="74">Trans-Medium Blue</option><option value="16">Trans-Neon Green</option><option value="18">Trans-Neon Orange</option><option value="121">Trans-Neon Yellow</option><option value="98">Trans-Orange</option><option value="107">Trans-Pink</option><option value="51">Trans-Purple</option><option value="17">Trans-Red</option><option value="113">Trans-Very Lt Blue</option><option value="19">Trans-Yellow</option><option value="57">Chrome Antique Brass</option><option value="122">Chrome Black</option><option value="52">Chrome Blue</option><option value="21">Chrome Gold</option><option value="64">Chrome Green</option><option value="82">Chrome Pink</option><option value="22">Chrome Silver</option><option value="84">Copper</option><option value="81">Flat Dark Gold</option><option value="95">Flat Silver</option><option value="78">Metal Blue</option><option value="77">Pearl Dark Gray</option><option value="115">Pearl Gold</option><option value="61">Pearl Light Gold</option><option value="66">Pearl Light Gray</option><option value="119">Pearl Very Light Gray</option><option value="83">Pearl White</option><option value="65">Metallic Gold</option><option value="70">Metallic Green</option><option value="67">Metallic Silver</option><option value="46">Glow In Dark Opaque</option><option value="118">Glow In Dark Trans</option><option value="60">Milky White</option><option value="101">Glitter Trans-Clear</option><option value="100">Glitter Trans-Dark Pink</option><option value="102">Glitter Trans-Purple</option><option value="116">Speckle Black-Copper</option><option value="151">Speckle Black-Gold</option><option value="111">Speckle Black-Silver</option><option value="117">Speckle DBGray-Silver</option></optgroup><optgroup label="-"></optgroup><optgroup label="- Modulex Colors"></optgroup><optgroup label="-"><option value="142">Mx Aqua Green</option><option value="128">Mx Black</option><option value="132">Mx Brown</option><option value="133">Mx Buff</option><option value="126">Mx Charcoal Gray</option><option value="149">Mx Clear</option><option value="139">Mx Lemon</option><option value="124">Mx Light Bluish Gray</option><option value="125">Mx Light Gray</option><option value="136">Mx Light Orange</option><option value="137">Mx Light Yellow</option><option value="144">Mx Medium Blue</option><option value="138">Mx Ochre Yellow</option><option value="140">Mx Olive Green</option><option value="135">Mx Orange</option><option value="145">Mx Pastel Blue</option><option value="141">Mx Pastel Green</option><option value="148">Mx Pink</option><option value="130">Mx Pink Red</option><option value="129">Mx Red</option><option value="146">Mx Teal Blue</option><option value="134">Mx Terracotta</option><option value="143">Mx Tile Blue</option><option value="131">Mx Tile Brown</option><option value="127">Mx Tile Gray</option><option value="147">Mx Violet</option><option value="123">Mx White</option></optgroup></select></span>'
document.forms[0].innerHTML = document.forms[0].innerHTML+colorDropdownHTML;
// reflect the current color
colorDropdown = document.getElementById("p_color");
colorDropdown.value = colorID;
// onchange load the URL modified to reflect new color
colorDropdown.addEventListener("change", ColorChanged, true);
