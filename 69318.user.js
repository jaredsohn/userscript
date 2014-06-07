// ==UserScript==
// @name           Auto E-Vote
// @namespace      anui
// @include        http://reg*.kku.ac.th/eappraisal/*vote.asp?*
// ==/UserScript==

// FUNCTIONS
LO = 2;
HI = 4;
function fill(lo, hi)
{
	hi-=1;
	lo-=1;
	//alert("lo: " + lo + " hi: " + hi);
	//alert(typeof(lo) + " " + typeof(hi));
  // INPUT
	var textElements = document.getElementsByTagName('input');
	var radios = new Array();
	first = 0;
	for (i=0 ; i<textElements.length ; i++)
	{
		if(textElements[i].type == 'radio')
		{
			if(first < 11)
			{
				first++;
				continue;
			}
			radios.push(textElements[i]);
		}
	}
	textElements = new Array();
	
	try{
	function rnd(a,b)
	{
		if(a>=b)
			return b;
		x = Math.floor(a + Math.random() * 1111 * rnd(a+1,b) % (b-a+1) );
		return x;
	}
	}catch(e){alert("at rnd : " + e);}
	
	try{
		nq = (radios.length)/5;
		//alert("nq : " + nq);
		var q = new Array();
		var tmp = new Array();
		for (n=0 ; n<radios.length ;)
			for (i=0 ; i<nq ; i++)
			{
				for (j=0 ; j<5 ; j++)
				{
					tmp.push(radios[n]);
					//alert("n,i,j : " + n + "," + i + "," + j + " : " + tmp);
					n++;
				}
				q.push(tmp);
				//alert("i : " + i + " : " + q[i]);
				tmp = new Array();
			}
		radios = new Array();
	}catch(e){alert("at divide : " + e);}
	
	try{
		//alert("length: " + q.length)
		for(i=0;i<q.length;i++)
		{
			r = rnd(lo,hi);
			//alert(i + "," + r + " " + q[i][r] + " ");
			q[i][r].checked = true;
		}
	}catch(e){alert("at check : " + e);}
}
function createMenu(){
	// Insert DIV style
	var styleCode = new Array();
	styleCode.push('#autofill  *, #autofill {color:#000;background:#fff;padding:0;margin:0;font-size:11px;text-align:left;font-family:Arial,sans-serif}');
	styleCode.push('#autofill {z-index:999;padding:10px;min-width:300px;border:2px solid #999;position:absolute;top:10px;right:10px}');
	styleCode.push('#autofill label {width: 3em;margin-left:1em}');
	styleCode.push('#autofill p {color:#000;margin:10px}');
	styleCode.push('#autofill p strong {font-size:14px}');
	styleCode.push('#autofill p label small {color:#ccc;font-size:8px;margin-left:10px}');
	styleCode.push('#autofill h2 a {color:#0085d5;margin:20px;font-size:16px}');
	styleCode.push('#autofill .submit input { font-size:20; margin-left: 20px;background:#fff;color:#0085d5}');
	styleCode.push('#autofill input {background: #f1f1f1;border: 1px solid #ccc;padding:4px;}');
	styleCode.push('#des {font-size:15;color:red;}');
	styleCode.push('#ins {height:20px;text-align:right}');
	styleCode.push('#maxscore, #minscore {width:25px;}');

	var style = document.createElement('style');
	style.innerHTML = styleCode.join('\n');

	try { document.getElementsByTagName('head')[0].appendChild(style); }
	catch(e) { console.debug(e)}
      
	// Draw DIV 
	var submitbutts = '<p class="submit"><input value="สุ่มคะแนน" type="button" name="savechanges" id="savechanges"/><input type="button" name="sendscore" id="sendscore" value="ส่งคะแนน"/></p>';
	var guiCode = new Array();
	GM_setValue('mins',3);
	GM_setValue('maxs',5);
	guiCode.push('<div id="autofill">');
	guiCode.push('<table id="filltable"><tr><td>');
	guiCode.push('<p><strong>ช่วงคะแนน (1-5)</strong></p>');
	guiCode.push('	<p id="ins">คะแนนต่ำสุด :<label><input type="text" value="'+GM_getValue('mins')+'" id="minscore" /></label></p>');
	guiCode.push('	<p id="ins">คะแนนสูงสุด :<label><input type="text" value="'+GM_getValue('maxs')+'" id="maxscore" /></label></p>');
	guiCode.push('</td><td><p id="des">โปรแกรมนี้จะทำการสุ่มคะแนนตาม<br>ช่วงที่กำหนดไว้<br>โดยผู้ใช้ต้องเลือกคะแนนความตั้งใจเรียน<br>และเปอร์เซนต์การเข้าเรียน ด้วยตัวเอง</p></td></tr></table>');
	guiCode.push(submitbutts);
	guiCode.push('</div>');

	// Insert DIV
	var gui = document.createElement('div');
	gui.id = 'autofilloptions';
	gui.innerHTML = guiCode.join('\n');
	guiCode.length = 0;
	document.body.insertBefore(gui, document.body.lastChild);
	  
	try{
		// Add event SAVE
		var sChange = document.getElementById('savechanges');
		var send = document.getElementById('sendscore');
		console.debug(sChange);
		console.debug(send);

		//for (var z=0;z<sChanges.length;z++){
			//alert("z: " + sChanges[z].value)
			sChange.addEventListener('click', saveChanges , false);
			send.addEventListener('click', sends , false);
			//sChanges[z].onclick = saveChanges;
	}catch(e){alert("at event : " + e);}
}

function sends(){
	try{
		document.getElementsByName('Submit')[0].click();
	}catch(e){alert("at send : " + e);}
}
function saveChanges(){
	try{
		var max = document.getElementById('maxscore').value;
		var min = document.getElementById('minscore').value;
		//alert(typeof(min) + " " + max);
		if(min>=1 && max<=5 && max-min>=0)
			fill(min,max);
		else{
			alert("คุณกรอกคะแนนไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง");
			document.getElementById('maxscore').value = 5;
			document.getElementById('minscore').value = 3;
		}
	}catch(e){alert("at save : " + e);}
}

$nd = function (xpath, context, from)
{
	var nd = (from||document).evaluate(xpath, (context||document), null, 9, null).singleNodeValue;
	//if($type($el) == 'function'){ return $el(nd); }
	return nd;
};

try{
	document.getElementById('autofill').style.display='block';
}catch(e){
	createMenu(); 
	console.debug(e);
}
//GM_registerMenuCommand("Fill",fill(3,5));