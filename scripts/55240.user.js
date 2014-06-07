// ==UserScript==

// @name           mbt_graou

// @namespace      http://userscripts.org/users/81692

// @description    graoutise mbt

// @include        http://mononoke-bt.org/*

// ==/UserScript==



/*pompé sur le site*/

function getXMLHTTP()

{

 	var xmlhttp = false;

	if (!xmlhttp && typeof XMLHttpRequest != 'undefined')

	{

		try

		{

			xmlhttp = new XMLHttpRequest();

		}

		catch (e)

		{

			xmlhttp = false;

		}

	}



	return xmlhttp;

}



/*pompé sur le site*/

function XHLoad( url, elem )

{

	if( !elem ) return;



	var req = getXMLHTTP();

	if (req)

	{

		req.onreadystatechange = function()

		{

			if (req.readyState == 4 && req.status == 200)

				elem.innerHTML = req.responseText;

		};

		req.open('GET', url );

		req.send( null );

	}

}

/*pompé sur le site et modifié pour contourner une difficulté (viré les parentNode)*/

function XHUVote( elem, params )

{

	XHLoad('http://mononoke-bt.org/xmlhttp.php?action=uvote&'+params, elem );

}





/**classe pour manipuler chaque post**/

function post(numero,divDuPost){
	//alert("creation");
	this.div=divDuPost;

	/**numero du post**/

	this.num=numero;

	/**nom du poster**/

	this.poster=divDuPost.childNodes[1].childNodes[1].firstChild.childNodes[1].childNodes[2].firstChild.nodeValue;

	tmp=divDuPost.childNodes[1].childNodes[1].firstChild.childNodes[1].childNodes[2];

	//tmp.tagName est A si simple poster, FONT/B/A si moro/vik/mk, FONT/A si kodama faiblard

	//on remonte jusqu'à le A

	while(tmp.tagName!="A"){

		tmp=tmp.firstChild;

	}

	tmp=tmp.getAttributeNode("href").nodeValue;

	/**numero du poster**/

	this.numPoster=tmp.substr(19,tmp.length-19);



	function isLoved(){

		return divDuPost.getElementsByClassName("uvote")[0].getElementsByTagName("TD")[0].firstChild.getAttributeNode("src").nodeValue.indexOf("y",0)!=-1;

	}

		this.isLoved=isLoved;



	function isHated(){

		return divDuPost.getElementsByClassName("uvote")[0].getElementsByTagName("TD")[1].firstChild.getAttributeNode("src").nodeValue.indexOf("y",0)!=-1;

	}

	this.isHated=isHated;



	function hate(){

		if (!this.isHated()){

		return XHUVote(divDuPost.getElementsByClassName("uvote")[0],'id='+this.numPoster+'&for=0');

		}

	}

	this.hate=hate;



	function love(){

		if (!this.isLoved()){

		return XHUVote(divDuPost.getElementsByClassName("uvote")[0],'id='+this.numPoster+'&for=1');

		}

	}

	this.love=love;

	function clean(){
		comment=this.div.getElementsByClassName("comment")[0].cloneNode(true);
		for (i=0;i<comment.childNodes.length;i++){
			node=comment.childNodes[i];
			if (node.tagName=="FONT" || node.tagName=="B"){
				comment.removeChild(node);
				for (j=0;j<node.childNodes.length;j++){
					comment.appendChild(node.childNodes[j]);	
				}
				i=-1;
			}
		}
		this.div.getElementsByClassName("comment")[0].parentNode.replaceChild(comment,this.div.getElementsByClassName("comment")[0]);
	}
	this.clean=clean;


	function apply(){
		document.getElementById("post"+this.num).parentNode.replaceChild(this.div,document.getElementById("post"+this.num));
	}
	this.apply=apply;


}





//var name=document.getElementsByClassName("topwelcomebar")[0].getElementsByTagName("a")[0].firstChild.firstChild.firstChild.nodeValue;



/**rend un tableau avec un objet post pour chaque post de la page**/

function getPosts(){

	tableTmp=document.getElementsByTagName("div");

	tablePost=new Array();

	j=0;

	for (i=0;i<tableTmp.length;i++){

		if (tableTmp[i].id.match(/post\d*/i)){

			tablePost[j]=new post(tableTmp[i].id.substr(4,tableTmp[i].id.length-4),tableTmp[i]);

			j++;

		}

	}

	return tablePost;

}

/**met des coeurs et des boulets aleatoirement à tout le monde, 

le fait plusiuers fois si plusieurs posts sur la page**/

function fillRandomly(){

	table=getPosts();

	for (i=0;i<table.length;i++){

		if (!(table[i].isLoved() || table[i].isHated())){

			

			rand=Math.round(Math.random());

			if (rand==0){

				table[i].love();

			}else{

				table[i].hate();

			}

		}

	}

}
function cleanAll(){

	table=getPosts();

	for (ici=0;ici<table.length;ici++){

		table[ici].clean();
		table[ici].apply();

	}

}




//var test=new post(0,

fillRandomly();
cleanAll();