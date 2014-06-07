// ==UserScript==
// @name           Alleturniere Ergebniseingabe
// @namespace      http://www.tittgen.com/gmonkey/
// @description    Punkte per Maus statt Tastatur eingeben
// @version      1.0.0
// ==/UserScript==
	
	var field = '';

// sort out female / male in other sex fields - add // infront to deactivate
	clean_gender();
	
// onclick event
 var click_behavier = function(e) {
 
	if(e.button=='0' && e.target.nodeName=='INPUT' && e.target.type=="text") {  
		field = e.target;
		show_score_select();	
	}	
	
	if(e.button=='0' && e.target.nodeName=='TD' && e.target.parentNode.parentNode.parentNode.nodeName=='TABLE' && e.target.parentNode.parentNode.parentNode.id=='score_select_table') {  
		var str = e.target.childNodes[0].data;
		if(str!=='-') 	field.value = str;
		else 			field.value = '';
		document.getElementById('scorebox').style.display = 'none';
		var fieldid = parseInt(field.name.slice(0,-4));
		change_winner(fieldid,field);
	}	
 }	
 
 document.addEventListener('click', click_behavier, true);
 
 
 // score choice box
	var objBody = document.getElementsByTagName("body").item(0);
 
	var objScorebox = document.createElement("div");
	objScorebox.setAttribute('id','scorebox');
	objScorebox.setAttribute('style', 'padding: 0 15px; width:420px; height:530px; display:none; font-size: 101%; line-height:200%; background-color:#FCF7EF; border:2px solid #FF9900; position:absolute; z-Index:102; -moz-border-radius: 10px;');
    objScorebox.innerHTML =
			'<div style="text-align: right; height: 22px; margin: 4px 4px -4px 0;"><a style="color: #FF9900;" href="" onclick="' + "document.getElementById('scorebox').style.display='none'; return false;" + '">X</a></div>'
			+'<table id="score_select_table" style="font-weight: bold; width: 100%; margin: 20px 0 5px 0;">'
			+'<tr><td>21-9</td><td>21-19</td><td>30-29</td><td>29-30</td><td>19-21</td><td>9-21</td></tr>'
			+'<tr><td>21-8</td><td>21-18</td><td>30-28</td><td>28-30</td><td>18-21</td><td>8-21</td></tr>'
			+'<tr><td>21-7</td><td>21-17</td><td>29-27</td><td>27-29</td><td>17-21</td><td>7-21</td></tr>'
			+'<tr><td>21-6</td><td>21-16</td><td>28-26</td><td>26-28</td><td>16-21</td><td>6-21</td></tr>'
			+'<tr><td>21-5</td><td>21-15</td><td>27-25</td><td>25-27</td><td>15-21</td><td>5-21</td></tr>'
			+'<tr><td>21-4</td><td>21-14</td><td>26-24</td><td>24-26</td><td>14-21</td><td>4-21</td></tr>'
			+'<tr><td>21-3</td><td>21-13</td><td>25-23</td><td>23-25</td><td>13-21</td><td>3-21</td></tr>'
			+'<tr><td>21-2</td><td>21-12</td><td>24-22</td><td>22-24</td><td>12-21</td><td>2-21</td></tr>'
			+'<tr><td>21-1</td><td>21-11</td><td>23-21</td><td>21-23</td><td>11-21</td><td>1-21</td></tr>'
			+'<tr><td>21-0</td><td>21-10</td><td>22-20</td><td>20-22</td><td>10-21</td><td>0-21</td></tr>'
			+'<tr><td>-</td></tr>'
			+'</table>'		
			+'</div>';		
	objBody.appendChild(objScorebox);

	addGlobalStyle('#score_select_table td { font-size: 16px !important; line-height:200%; text-align:center; padding: 5px 5px; background-color: #F3F0E5; border:2px solid #FCF7EF;');
	addGlobalStyle('#score_select_table td:hover { cursor: pointer; background-color: #FFFFEF; }');
	
/*
	show box to select score
*/
function show_score_select() 
{
	var objScorebox = document.getElementById('scorebox');
    objScorebox.style.display = '';
	
	objScorebox.style.top    = (self.pageYOffset + (window.innerHeight/2) - 200) + 'px'; // (self.pageYOffset + 100) + 'px'; 
    objScorebox.style.left   = (self.pageXOffset + (window.innerWidth/2) - 200) + 'px'; // (self.pageXOffset + 150) + 'px'; 
}


/*
	change winner
*/
function change_winner(fieldid, field) 
{
	var set1 = document.getElementsByName(fieldid + 'set1')[0].value.split('-');
	var set2 = document.getElementsByName(fieldid + 'set2')[0].value.split('-');
	var set3 = document.getElementsByName(fieldid + 'set3')[0].value.split('-');
	var winner = document.getElementsByName(fieldid + 'winner')[0];
	
	if( (parseInt(set1[0])>parseInt(set1[1]) && parseInt(set2[0])>parseInt(set2[1])) || parseInt(set3[0])>parseInt(set3[1]) ) 
		winner.value = 1;
	else if	( (parseInt(set1[0])<parseInt(set1[1]) && parseInt(set2[0])<parseInt(set2[1])) || parseInt(set3[0])<parseInt(set3[1]) ) 
		winner.value = 2;
	else if ( winner.value == 1 || winner.value == 2)
		winner.value = 0;
}


/*
	sort out female / male in other sex fields
*/
function clean_gender()
{
	var arr = document.getElementsByTagName("SELECT");
	for(var j = arr.length-1; j>=0 ; j--) { 
		if(arr[j].id.slice(-2)=='p1' || arr[j].id.slice(-2)=='p2') {
			selectfield = arr[j]; // document.getElementById('34717t1p1');
			//alert(selectfield.id);

			if(selectfield.parentNode.parentNode.childNodes[0].nodeName=='#text') 
				var type = selectfield.parentNode.parentNode.childNodes[1].firstChild.firstChild.data;
			else 
				var type = selectfield.parentNode.parentNode.childNodes[0].firstChild.firstChild.data;
			
			for(var i=selectfield.childNodes.length-1;i>=0;i--) {
				if(type=='HD1' || type=='HD2' || type=='HE1' || type=='HE2' || type=='HE3' || (type=='GD' && selectfield.id.slice(-2)=='p1') ) {
					if(selectfield.childNodes[i].firstChild.data.search(/ \(F, /)>0)
						selectfield.childNodes[i].disabled = true;
				} else if(type=='DD' || type=='DE' || (type=='GD' && selectfield.id.slice(-2)=='p2') ){
					if(selectfield.childNodes[i].firstChild.data.search(/ \(M, /)>0)
						selectfield.childNodes[i].disabled = true;
				}	
			}
		}	
	}
}


/*
	add a Global Style
*/
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}