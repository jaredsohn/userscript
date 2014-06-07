// ==UserScript==
// @name          custom-smilies
// @namespace     http://gaming.ngi.it/
// @description   You can add custom smilies
// @include       http://gaming.ngi.it/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
/*****************************************************************************
				  Parametri
*****************************************************************************/
var maxColonnaAd = 8; //Smilie per riga nell'advanced reply
var maxColonnaQR = 16; //Smilie per riga nel quick reply
var editor; //0=advanced | 1=quick
var ShowSmiliesInQR=false;//true mostra direttamente gli smilie | false mostra l'opzione per visualizzarli
maxSmilieHeight=30; //Altezza massima degli smilie
/*****************************************************************************
				   Oggetti
*****************************************************************************/
function CustomSmilies ()
{
	var myUrl=[

	//smilie

	"images/ngismiles/asd.gif",
	"http://img301.imageshack.us/img301/5281/ncasd.gif",
	"http://img114.imageshack.us/img114/1562/nonoasd.gif",
	"http://img96.imageshack.us/img96/2645/untitled32ds.gif",
	"http://i56.tinypic.com/2lb2yds.gif",
	"images/ngismiles/rotfl.gif",
	"http://www.planetsmilies.com/smilies/happy/happy0041.gif",
	"images/ngismiles/lookaround.gif",
	"http://img261.imageshack.us/img261/8836/omgvv9qs1kr3.gif",
	"images/ngismiles/face4.gif",
	"http://img338.imageshack.us/img338/3408/natale.gif",
	"images/ngismiles/metal.gif",
	"images/ngismiles/sbav.gif",
	"images/smilies/afraid.gif",
	"http://img32.imageshack.us/img32/8707/afraidsawjo0.gif",
	"images/ngismiles/06.gif",
	"images/ngismiles/rotfl2.gif",
	"images/ngismiles/scratch.gif",
	"images//emot-v.gif",
	"http://discutere.it/images/smilies/102.gif",
	"images/ngismiles/hail.gif",
	"images/ngismiles/badboy.gif",
	"http://gaming.ngi.it/images/ngismiles/nono.gif",
	"images/ngismiles/ka.gif",
	"http://img200.imageshack.us/img200/3204/dentone2.gif",
	"http://img228.imageshack.us/img228/3118/mexerullakx7.gif",
	"images/smilies/dentone.gif",
	"images/ngismiles/mecry.gif",
	"images/ngismiles/roargh.gif",
	"images/ngismiles/love.gif",
	"images/ngismiles/smiley10.gif",
	"http://www.nfscars.net/forum/images/smilies/images_smilies_facepalm.gif",
	"http://gaming.ngi.it/images/ngismiles/asd2.gif",
	"http://img10.imageshack.us/img10/9276/sherlockb.gif",
	"http://img104.imageshack.us/img104/5012/sese0hq.gif",
	"http://www.drusie.com/forum/images/smiles/sisidx.gif",
	"http://gaming.ngi.it/images//ahsisi.gif",
	"http://gaming.ngi.it/images/ngismiles/nerdmasturbation.gif",
	"http://www.containerd.com/phpbb/images/smilies/containerd%20pack/PopeFap.gif",
	"http://img100.imageshack.us/img100/4634/snobbz3.gif",
	"http://gaming.ngi.it/images/ngismiles/teach.gif",
	"http://gaming.ngi.it/images/ngismiles/shocked.gif",
	"http://gaming.ngi.it/images/smilies/awais.gif",
	"images/ngismiles/wall.gif",
	"images/ngismiles//madsawxm6.gif",
	"http://emoticons4u.com/mad/371.gif",
	"http://img222.imageshack.us/img222/2036/mmaddj0.gif",
	"http://gaming.ngi.it/images/ngismiles/bapho.gif",
	"http://img246.imageshack.us/img246/4600/badumtssh.gif",
	"http://www.planetsmilies.com/smilies/confused/confused0052.gif",

	//immagini
	"http://farm4.static.flickr.com/3101/2851814771_38b1ff5e57.jpg",
	"http://24.media.tumblr.com/tumblr_kxa5vtEhlo1qzo4t5o1_500.jpg",
	"http://img3.visualizeus.com/thumbs/63/87/bear,forum,utility,mabbaffanculo-6387fa4c60fed0586736aae78e45f539_h.jpg",
	"http://i56.tinypic.com/25svngo.jpg"


	//tabella standard lime
	/*"http://img577.imageshack.us/img577/439/asdslime1.gif",
	"http://img705.imageshack.us/img705/7088/rotflslimep.gif",
	"http://img844.imageshack.us/img844/7444/lookaround.gif",
	"http://img705.imageshack.us/img705/7245/face4slime.gif",
	"http://img691.imageshack.us/img691/3136/metaldh.gif",
	"http://img607.imageshack.us/img607/3218/kaslime.gif",
	"http://img337.imageshack.us/img337/1615/sbave.gif",
	"http://img607.imageshack.us/img607/5696/afraidslime.gif",
	"http://img607.imageshack.us/img607/8720/06slime.gif",
	"http://img685.imageshack.us/img685/9412/rotfl2.gif",
	"http://img258.imageshack.us/img258/4919/scratchslime.gif",
	"http://img338.imageshack.us/img338/8109/emotv.gif",
	"http://img697.imageshack.us/img697/1336/hailv.gif",
	"http://img258.imageshack.us/img258/5301/badboyslime.gif",
	"http://img258.imageshack.us/img258/6943/wallslime.gif",
	"http://img258.imageshack.us/img258/8074/dentoneslime.gif",*/

	];


	function insertMySmilie (smilie) {
		//prende l'url dello smilie
		url=smilie.attr('src');
		//inserisce lo smilie nel testo
		if(editor==0)
			location.assign( 'javascript:vB_Editor.vB_Editor_001.apply_format("InsertImage",'+ false+',"'+ url+'");void(0)' );
		else
			location.assign( 'javascript:vB_Editor.vB_Editor_QR.apply_format("InsertImage",'+ false+',"'+ url+'");void(0)' );
	}

	function creaTabella (url) {

		//allSmilesTitle	=allSmilesData[i].split("|")[0];
		//allSmilesLink	=allSmilesData[i].split("|")[1];
		var riga = 0;

		var colonna = 0;

		var select_tab = $('#mySmilieTable tbody');

		var select_tr = $('#mySmilieTable tr');

		var maxColonna;//smilie per riga

		//set maxColonna
		if(editor==0)
			maxColonna=maxColonnaAd;
		else
			maxColonna=maxColonnaQR;


		for (var i=0; i<url.length; i++) {

			//crea il nuovo smilie
			var newSmilie = $('#mySmilieTable td').eq(0).clone(false);

			newSmilie.find('img').attr({
										'style':'cursor:pointer;max-width:50px;max-height:' + maxSmilieHeight + 'px;',
										'src':url[i],
										'id':'vB_Editor_001_custom_smilie_'+(i+1),
										'title':'vB_Editor_001_custom_smilie_'+(i+1),
										'alt':''
									});

			//aggiunge il nuovo smilie
			if(colonna<maxColonna){
				colonna++
				newSmilie.appendTo(select_tr[riga]);
			}
			else{
				riga++;
				colonna=1;

				if(editor==0)
					trMore = select_tr.eq(select_tr.length-1);

				var newTr = select_tr.eq(0).clone(false).empty();

				newTr.appendTo(select_tab.eq(0));

				if(editor==0)
					trMore.appendTo(select_tab.eq(0));

				select_tr = $('#mySmilieTable tr');

				newSmilie.appendTo(select_tr[riga]);

			}
			newSmilie.find('img').click(function(){insertMySmilie ($(this));});
		}

		//rimuove l'immagine vuota
		$('#mySmilieTable td').eq(0).hide();

	}



	function addSmilieQuickReplyShow (url) {
		//toglie max width
		//$('#vB_Editor_QR').parent().attr({'style':'width: auto ! important;'});

		//rimuove Show Smilies
		if(!ShowSmiliesInQR)
		$('#ShowDiv').hide();

		var fieldsetSmilie = $('legend:contains("Options")').parent().clone(false).empty();
		var contenitore = $('#vB_Editor_QR');

		//nuova tabella
		var tabella = $('#vB_Editor_QR_controls table').eq(0).clone(false).empty();
		tabella.attr({
						'id':'mySmilieTable',
						'cellspacing':'0',
						'cellpadding':'4',
						'border':'0',
						'align':'center',
						'width':'auto'
					});

		tabella.append(
						'<tbody>'+
							'<tr valign="bottom" align="center">'+
								'<td>'+
									'<img>'+
								'</td>'+
							'</tr>'+
						'</tbody>'
						);

		fieldsetSmilie.appendTo(contenitore);
		fieldsetSmilie.append('<legend>Smilies</legend>');
		fieldsetSmilie.append(tabella);

		creaTabella (url);
	}

	function addSmilieQuickReply (url) {
		//aggiunge l'opzione Show Smilies
		if(!ShowSmiliesInQR){
			var contenitore = $('#vB_Editor_QR');

			contenitore.parent().attr({'style':'max-width: 660px; width: auto ! important;'});

			contenitore.append('<div id="ShowDiv">[<a>Show Smilies</a>]</div>');

			$('#vB_Editor_QR a:contains("Show Smilies")')
				.attr({'href':'javascript:void(0)'})
				.click(function(){addSmilieQuickReplyShow(url);});
		}
		else addSmilieQuickReplyShow(url);
	}

	function addSmilieReply (url) {

		select_tab = $('#vB_Editor_001_smiliebox table');
		select_tr = $('#vB_Editor_001_smiliebox tr');

		//svuota la tabella originale
		select_tr.eq(0).empty();

		for (var i=1; i<select_tr.length-1; i++)
			select_tr.eq(i).remove();

		//id tabella
		select_tab.eq(0).attr({'id':'mySmilieTable',});

		//aggiungi img
		select_tr.eq(0).append('<td><img></td>');

		creaTabella (url);
	}


	this.init = function () {
		//$('#vB_Editor_QR_color_bar').attr({'style':'background-color: Lime;'});

		if($('#vB_Editor_QR_iframe').length>0){
			editor=1;
			addSmilieQuickReply (myUrl);
		}
		else if($('#vB_Editor_001_smiliebox').length>0){
			editor=0;
			addSmilieReply (myUrl);
		}
	}
}


/*****************************************************************************
				    Script
*****************************************************************************/
var reply = null;
reply = new CustomSmilies ();
reply.init();


//Roba che non ho usato ma ha del potenziale
		//centra da mettere in addSmilieReply
		/*$('div.smallfont:contains("Logged in as")').parent().attr({
																	'width':'auto',
																	'style':'',
																	'align':'center'
																});
		//$('div.smallfont:contains("Message:")').parent().attr({'style':'float: left;'});*/


// unsafeWindow (security holes)

		//unsafeWindow.vB_Editor.vB_Editor_001.apply_format("InsertImage", false, url);
		//unsafeWindow.vB_Editor.vB_Editor_QR.apply_format("InsertImage", false, url);
