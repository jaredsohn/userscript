// ==UserScript==

// @name           bitvisitor 
// @namespace      http://http://www.bitvisitor.com
// @description    fuera control de actividad
// @include        http://www.bitvisitor.com/next.php/*
// @include        http://http://www.bitvisitor.com/next.php/*
// @exclude


var  contents = document.getElementById("contents");
var link;
if(contents){
	if(contents.textContent.match('.*(Routine Check).*')){
		link = contents.getElementsByTagName("a")[1].href;
		setTimeout(Captcha,250);//use a delay
		
	}
}
function Captcha(){
	location.href = link;
}

<script type="text/javascript">
			jQuery.noConflict();		
		</script>

<script type="text/javascript">
	<!--
		if (top.location!= self.location) {
			top.location = self.location.href
		}
	//-->
</script>
<script language="javascript">

var mins
var secs;

    window.onbeforeunload = function () {
        if((mins == 0) && (secs == 0)) {
        } else {
         return "Please click \"Stay on Page\" to continue using Bitvisitor and receive credit for this visit!";
        }
    }


function cd() {
 	mins = 0 * m("1"); // change minutes here
 	secs = 0 + s(":01"); // change seconds here (always add an additional second to your total)
 	redo();
}

function m(obj) {
 	for(var i = 0; i < obj.length; i++) {
  		if(obj.substring(i, i + 1) == ":")
  		break;
 	}
 	return(obj.substring(0, i));
}

function s(obj) {
 	for(var i = 0; i < obj.length; i++) {
  		if(obj.substring(i, i + 1) == ":")
  		break;
 	}
 	return(obj.substring(i + 1, obj.length));
}

function dis(mins,secs) {
 	var disp;
 	if(mins <= 9) {
  		disp = " 0";
 	} else {
  		disp = " ";
 	}
 	disp += mins + ":";
 	if(secs <= 9) {
  		disp += "0" + secs;
 	} else {
  		disp += secs;
 	}
 	return(disp);
}

function redo() {
 	secs--;
 	if(secs == -1) {
  		secs = 59;
  		mins--;
 	}
 	document.cd.disp.value = dis(mins,secs); // setup additional displays here.
 	if((mins == 0) && (secs == 0)) {

showdiv('a1');
  		//window.alert("Time is up. Press OK to continue."); // change timeout message as required
  		// window.location = "yourpage.htm" // redirects to specified page once timer ends and ok button is pressed
 	} else {
 		cd = setTimeout("redo()",1000);
 	}
}

function init() {
  cd();
}
window.onload = init;
</script>
<script language="JavaScript">
//here you place the ids of every element you want.
var ids=new Array('a1','a2','a3','thiscanbeanything');

function switchid(id){	
	hideallids();
	showdiv(id);
}

function hideallids(){
	//loop through the array and hide each element by id
	for (var i=0;i<ids.length;i++){
		hidediv(ids[i]);
	}		  
}

function hidediv(id) {
	//safe function to hide an element with a specified id
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'none';
	}
	else {
		if (document.layers) { // Netscape 4
			document.id.display = 'none';
		}
		else { // IE 4
			document.all.id.style.display = 'none';
		}
	}
}

function showdiv(id) {
	//safe function to show an element with a specified id
		  
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'block';
	}
	else {
		if (document.layers) { // Netscape 4
			document.id.display = 'block';
		}
		else { // IE 4
			document.all.id.style.display = 'block';
		}
	}
}
</script>

<style type="text/css">
#txt {
  border:none;
  font-family:verdana;
  font-size:16pt;
  font-weight:bold;
  border-right-color:#FFFFFF
}

</style>
		
	</head>
	
	
	<body>
	
		<div class="details">
			<div class="right_side">
<div id='a1' style="display:none;postion:absolute;top:6px">
<form method="post" action="next.php" target="_blank">
<input type="hidden" name="addr" value="1Gxsunct83kjy3cB3hXA6hXK2YVhBresbt">
<input type="hidden" name="a" value="6516144">
<input type="hidden" name="t" value="15">
<button type="submit" style="border: 0; background: transparent">
    <img src="/next.png" alt="submit" />
</button>
</form>

</div>
			</div>
		

			<div class="left_side">
				<div style="float: left;">
					<img class="sml_logo" src="/images/BitVisitor_small.png" />
				</div>
				<div class="seperator"></div>
				<div class="l_content">
				Next Page in 
				</div>
<div class="l_timer">
<form name="cd">
<input style="background-color: #CCC" id="txt" readonly="true" type="text" value="0:00" border="0" name="disp">
</form>
</div>
				<div class="l_content">
				Payment sent every 100 uBTC! 
				</div>

// ==/UserScript==
