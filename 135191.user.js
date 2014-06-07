// ==UserScript==
// @name        FMC_moyenne_planete
// @namespace   moyenne planete
// @description Calcule la moyenne et compagnie...
// @author 		HassanCehef
// @include     http://planete.inp-toulouse.fr/*render.userLayoutRootNode*detailnotes.xhtml*
// @version     0.42
// @require 	http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==



/*Miam le gros danger de boucles infinies sur mes 2 fonctions récursives.
 *Il y en aura si le JSON heritages est mal fait (ex : on arrive à former une boucle entre les parents et enfants, en prenant en compte
 *toutes les familles (heritage_1, heritage_2,...)
 *
 *
 **/
var prefixe_coef="FMC-coef-";
var prefixe_note="FMC-note-";
var prefixe_li='FMC-';

var parametres={
    "gros coef":20,
    "bonne note":15,
    "mauvaise note":5,
    "heritages_actives":{
	1:"CPP1K1AE",
	2:"CPP1ANE"
    }
};


function FMC(){
console.log('lancement du script');
    $("head").append(CSS);
    var table_parent = $('th.portlet-table-header').parent().parent().parent();
    //contient le tableau sur lequel on va travailler. permet de limiter les recherches de jquery par la suite
    $('th.portlet-table-header:nth-child(4)',table_parent).before('<th class="portlet-table-header">Coefficients</th>');



    var ensemble_des_lignes = $('tr.portlet-table-body ,tr.portlet-table-alternate',table_parent);
    ensemble_des_lignes.each(function (){
	var code=$.trim($(':nth-child(2)',$(this)).text());
	try{
	    var coef_matiere =parseFloat(heritages[code]['coef_matiere']);
	}
	catch(e){
	    console.info('le code matière "'+code+'" n\'est pas défini dans heritages, en json. Tente de continuer le calcul');
	    return true;
	}

	$(this).attr('id', prefixe_li+code);
	var case_note=$(':nth-child(4)',$(this));
	var note=$.trim(case_note.text());
	case_note.replaceWith('<td><input size="6" id="'+prefixe_coef+code+'" class="coefficient" value="'+coef_matiere+
	    '"/></td><td><input class="note" size="8" id="'+prefixe_note+code+'" value="'+note+'"/><input type="hidden" value="'+note+'"/></td>')
    });


    /*console.log($('td',ensemble_des_lignes));
    $('td',ensemble_des_lignes).filter('.FMC_enfant_change,.FMC_parent_change,.FMC_note_changee').bind('click',function(){//.FMC_enfant_change,.FMC_parent_change,.FMC_note_changee
	alert('olol # '+$(this).parent().attr('id').substring(prefixe_li.length));
    //FMC_moyenne_revision($(this).parent.attr('id').substring(prefixe_li.length),false,true,false);
    });*/

    FMC_moyenne_recursive(2,'CPP1ANE');
    FMC_moyenne_recursive(1,'CPP1K1AE');
}

function FMC_moyenne_recursive(numero_heritage,code_matiere){//recursif vers le bas
    //console.group(heritages[code_matiere]['nom_matiere']);
    //console.trace();
    //console.groupEnd(heritages[code_matiere]['nom_matiere']);
    var coefficient=0;
    var moyenne;
    var somme_note_fois_coef=0;
    var somme_coef_pris_en_compte=0
    var somme_coef_non_pris_en_compte=0;
    var note_input,somme_coefs;
    try{
	var info_matiere_json=heritages[code_matiere]['heritage_'+numero_heritage]['enfants'];
    }
    catch(e){
	console.info('problème au niveau des identifiants des matieres (variable heritages en JSON). Arrêt du calcul');
	console.warn('en fait, un parent demande la matiere repondant au code : '+code_matiere+', qui est inexistant dans le JSON');
	return false;
    }

    var liste_notes_coefs=new Array();
    for(var cle2 in info_matiere_json){
	liste_notes_coefs[cle2]=FMC_moyenne_recursive(numero_heritage,info_matiere_json[cle2]);
    //liste_notes_coefs : tableau [coefficient total, coefficient effectif, note]
    }
    if(cle2 === undefined){//note à un partiel, car n'a pas d'enfant
	coefficient = $('#'+prefixe_coef+code_matiere).val();
	moyenne = $('#'+prefixe_note+code_matiere).val();
	return [coefficient,coefficient,moyenne];
    }
    else{// moyenne calculée.

	for(var cle in liste_notes_coefs){
	    coefficient =parseFloat(liste_notes_coefs[cle][0]);
	    coefficient_effectif =parseFloat(liste_notes_coefs[cle][1]);

	    if(isNaN(coefficient_effectif)){
		continue;
	    }
	    somme_coef_non_pris_en_compte+=(coefficient-coefficient_effectif);

	    note_input=liste_notes_coefs[cle][2];
	    if(isNaN(parseFloat(note_input)) || (parseFloat(note_input)==0  && note_input=='0.00')){
		somme_coef_non_pris_en_compte+=coefficient_effectif;
	    }
	    else{
		somme_coef_pris_en_compte+=coefficient_effectif;
	    }
	    somme_note_fois_coef +=parseFloat(note_input*coefficient_effectif);

	}
	if(somme_coef_pris_en_compte!=0){
	    moyenne=Math.round(1000*somme_note_fois_coef/somme_coef_pris_en_compte)/1000;
	}
	else moyenne='';

	somme_coefs = somme_coef_pris_en_compte+somme_coef_non_pris_en_compte;
	$('#'+prefixe_note+code_matiere).val(moyenne).addClass('FMC_calcule');
	$('#'+prefixe_note+code_matiere).next().val(moyenne);//on pose la moyenne dans l'input hidden pour les verifications ensuite'
	if(somme_coefs>=parametres['gros coef']){
	    $('#'+prefixe_li+code_matiere).addClass('FMC_ligne_gros_coef');
	}
	$('#'+prefixe_coef+code_matiere).val(somme_coefs);

	return [somme_coefs,somme_coef_pris_en_compte,moyenne];
    }

}
var CSS = '<style type="text/css" charset="utf-8">';
CSS+='input.FMC_calcule{border:1px dotted green;font-weight:bold;}';
CSS+='.FMC_ligne_gros_coef{background-color: rgb(183, 206, 232); font-size: 8pt;}';
CSS+='.coefficient{border:none;}';
CSS+='.note{border:none;}';
CSS+='.FMC_parent_change{background-size:13px 13px;background-repeat:no-repeat;background-attachment:scroll;background-position:98%center; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlBJREFUeNpi/P//PwMy8KvcJwikEoHYGIgNgZgJiC9A8ZxN7U5vkNUzIhvgU7angYOdpVhXXYxVXISbWVSYm4kRqOb1u29/X7/99vfijZe/v//4PWFLl0sthgFexTt7FGQEspxsVDhefv7L+OHbX4ZP3/8ygGT5OJkZ+IFYio/l/6GT937cvv92xrZe9yK4Ae7522qV5YUqTU2VOS88+sbw+y/E0GvPn4JpLUlpMM0CdI++HBfDxQv3v9+8+6Z350SvWkanrI1SHOysN7089LkvPv3BiBwks5OUwHTqvHso4aQvw/l/955LX798/anO9Pf3n2RdDQm2C4+/Mf789Zfh128EhgFkMRA+//Aro4ayGBtIL8uf33/c/7Jxsnz58ocBHVg1HwLT8oJiKOK/QAQfF0ivL8ufX3803v5gYPr16y+GAfsqrMF09OQbGHIvvzAzAfUqAU35/fv1+x///zMyMjLgAD9/YbruF1AMqJcB5Iy7379+E2Nk48BjAKbr/v/69Q+o9wnICzv/vP9g+l9QlA2XAdi8x/jx4x+g3j1MQFPmvn/y7NfPn7//o4c2KEpBGF0c5Px3jx7/AuqdA05Iqo4Tm9mFhUvY5RQ5GIgAPx4//PHrzetJt/fnl8OTsqJtbx+rkEgmu6wCOyMTE/bw+PeP4cfTRz9+v3k1/f7h4iKMzCRn2dXMxMpawCImycbCL8TCxM7OBAmwn//+fHz/5/erF7///fo56dHxsiqsuREEZMzaZYBUChAHALESVPghEG8GZecnpypR0jVAgAEAzPVNyh34CewAAAAASUVORK5CYII=);}';
CSS+='.FMC_note_changee{background-size:14px 14px;background-repeat:no-repeat;background-attachment:scroll;background-position:98% center; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAkNJREFUeNpsk99rUmEYx7/HbbUaOlRithUUOhdBMPA2arQKXVR0FbWgIHZhnJVQVDf9BV00cOlt/0BRtJz0i11EbNHI3azp1AjTuZGzLfCk5xxPz/tO5RV94OHF5/1+vu/zcHwkwzAgxluHOUiHn7IDrRE+m/97Syx0ij+iBPeNHJeP3puEZDK10N+fPPWTBl7BpGEQIXj/qRPy0PVLUN4/Q7W43gSbLHa4r10ENewnLcZqJvyZmT5L0DE6Ig+OX4DyJYJIcA56RW3KSOgTSvMzGBw/D9L6iQnxDl4R3D96Uh687IMy/waLXxVczW4g6juDYec2fz2WsjRqHvU13FfOQadOiAWe7zNrf15MG7kHY0ZmwmOIMes9zVMMpsnd9xlbL0MGsYZJh9ShxGMo59eglTVsTN1pzO2dfcezHuyOacrreZSWF0EsTBp9RV3VoFV2cnvhA9Yeyy1fgNXYXV2nazoYyzqApupQybmeSx/jLQasJmoYwzvQ6VJnrv9Unj+Vg01ti+Owu7qOMYytjUBePb28NRFOP7rJUzRhGuzu4Ux9hHD88zI6HYfIxIbVhze4mJ2FuShPsYZuM7oOuLC6sMJGCEtsF8J2a6jfOeB3edxQfiSgFn+jXXRZ7dhzeAjpWBK/Epkwle5K9WWaJpMBZjLsQim1AnWr2Az3WrHXeQTJpSSyySyH5UJRaexCFdJkJpVDlf5hrmNudLfpIPGN4HSOYClwu7BZYTVJXOcpm20XO2rr3C7Yy4HA5g7M4r8AAwAUsGGsV0GHAQAAAABJRU5ErkJggg==);}';
CSS+='.FMC_enfant_change{background-size:13px 13px;background-repeat:no-repeat;background-attachment:scroll;background-position:98%center; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgFJREFUeNpsU79LI0EU/jabpPHSKfGUg1Mwyilcc4diqV44jNqJjZ2IbowQ8A+4nK3lgikEsRArC9GcV52dmPTxB6ImIpiIeNEqP3fWN7PZZTfJYx8zO/O+b755857075cbDaaSK+Qymi1OHuaTsVhVLDSiVf+Xn5GB0DokydWEvjr+reTTRzBJGglU/+BkpD+4gtrLLlj5zgF2eT+hP7hMM51IEhaJeYzaOTQVCQTDqL39hVa+gQ7mcK1yj2ohgUBQAcUqJzHPpqlAgPsmlqC9JujkrHXq/voxdAbMxibFPytnUCscIvCDpwicRChQ+sYXoRWOwIokmzHLmcYH3blWJJL/BwjQgRzLFcisdAutlOH3c9xbgPnHZdhMK2UhFa/tSaQAEeQkMMCo79lNsmINAorSWQsCk4S1INBtBFyirmstCXg5GHtOAvNalgKXt4uy/OAIm1e3xVh+2nHWhMdvKeCvEL87PYDc9hWSt7uuxvC96IJw+5rk6YDs+45sShRTnCsI5y+TosJ6R2dQY1VS8miwy0a6UM+By/sR7g8ETibwmD7lfbFmljKRpKj+JaVnZIpI6L0recxtbBlXyG0TuBNu3zdkCJw7PxNgaqiivRdWcxekhEg+D4dEK7Lqs9jwtE+LMZP6Y4KjBK40NhNPdZQCeJCC1ibA5BVz4V2AAQBo8gRz1Ov2wQAAAABJRU5ErkJggg==);}';


//CSS+='.excla_cercle_rouge{background-size:13px 13px;background-repeat:no-repeat;background-attachment:scroll;background-position:98%center; background-image:url(data:image/png;base64,);}';
//CSS+='.excla_cercle_rouge{background-size:13px 13px;background-repeat:no-repeat;background-attachment:scroll;background-position:98%center; background-image:url(data:image/png;base64,);}';
CSS+='</style>';

var heritages =
{
    "CPP1ANE":{
	"nom_matiere":"MOYENNES 1A",
	"coef_matiere":"0.00",
	"heritage_2":{
	    "enfants":["CPP1AE","CPP1BE","CPP1CE","CPP1ECE","CPP1EE2E","CPP1ME","CPP1PME","CPP1SE","CPP1VE"]
	}
    },
    "CPP11":{
	"nom_matiere":"CPP 1A",
	"coef_matiere":"0.00"
    },
    "CPP1AE":{
	"nom_matiere":"ANGLAIS 1A",
	"coef_matiere":"0.00",
	"heritage_2":{
	    "enfants":["CPP1AS1E","CPP1AS2E"],
	    "parent":"CPP1ANE"
	}
    },
    "CPP1BE":{
	"nom_matiere":"BIOLOGIE 1A",
	"coef_matiere":"0.00",
	"heritage_2":{
	    "enfants":["CPP1B01E","CPP1BS2E","CPP1G01E","CPP1G02E","CPP1G03E"],
	    "parent":"CPP1ANE"
	}
    },
    "CPP1CE":{
	"nom_matiere":"CHIMIE 1A",
	"coef_matiere":"0.00",
	"heritage_2":{
	    "enfants":["CPP1C01E","CPP1C02E","CPP1CTPE","CPP1C03E","CPP1C04E"],
	    "parent":"CPP1ANE"
	}
    },
    "CPP1ECE":{
	"nom_matiere":"EPREUVES COMMUNES 1A",
	"coef_matiere":"0.00",
	"heritage_2":{
	    "enfants":["CPP1M16E","CPP1ECME","CPP1ECPE"],
	    "parent":"CPP1ANE"
	}
    },
    "CPP1EE2E":{
	"nom_matiere":"EXPRESSION ECRITE",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1K08E"
	},
	"heritage_2":{
	    "parent":"CPP1ANE"
	}
    },
    "CPP1ME":{
	"nom_matiere":"MATHEMATIQUES 1A",
	"coef_matiere":"0.00",
	"heritage_2":{
	    "enfants":["CPP1M00E","CPP1M01E","CPP1M02E","CPP1M03E","CPP1M04E","CPP1M05E","CPP1M06E","CPP1M07E","CPP1M16E","CPP1M08E","CPP1M09E","CPP1M10E","CPP1M11E","CPP1M12E","CPP1M13E","CPP1M14E","CPP1M15E","CPP1M17E"],
	    "parent":"CPP1ANE"
	}
    },
    "CPP1PME":{
	"nom_matiere":"PHYSIQUE-MECANIQUE 1A",
	"coef_matiere":"0.00",
	"heritage_2":{
	    "enfants":["CPP1ME1E","CPP1P01E","CPP1P02E","CPP1P04E","CPP1TP1E","CPP1ME3E","CPP1P03E","CPP1P05E","CPP1P06E","CPP1TP2E"],
	    "parent":"CPP1ANE"
	}
    },
    "CPP1SE":{
	"nom_matiere":"EPS 1A",
	"coef_matiere":"0.00",
	"heritage_2":{
	    "enfants":["CPP1SS1E","CPP1SS2E"],
	    "parent":"CPP1ANE"
	}
    },
    "CPP1VE":{
	"nom_matiere":"LVII 1A",
	"coef_matiere":"0.00",
	"heritage_2":{
	    "enfants":["CPP1V02E","CPP1V05E","CPP1V01E","CPP1V04E"],
	    "parent":"CPP1ANE"
	}
    },
    "CPP1K1AE":{
	"nom_matiere":"UE PREMIERE ANNEE",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1S1E","CPP1S2E"]
	}
    },
    "CPP1KS1E":{
	"nom_matiere":"PREMIER SEMESTRE DE TRONC COMMUN",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1K01E","CPP1K04E","CPP1K03E","CPP1K02E"],
	    "parent":"CPP1S1E"
	}
    },
    "CPP1K01E":{
	"nom_matiere":"UE 1 MATHEMATIQUES SEMESTRE 1",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1MS1E"],
	    "parent":"CPP1KS1E"
	}
    },
    "CPP1MS1E":{
	"nom_matiere":"MATHEMATIQUES S1",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1M00E","CPP1M01E","CPP1M02E","CPP1M03E","CPP1M04E","CPP1M05E","CPP1M06E","CPP1M07E"],
	    "parent":"CPP1K01E"
	}
    },
    "CPP1M00E":{
	"nom_matiere":"REVISIONS",
	"coef_matiere":"0.50",
	"heritage_1":{
	    "parent":"CPP1MS1E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M01E":{
	"nom_matiere":"FONCTION DE R DANS R",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1MS1E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M02E":{
	"nom_matiere":"ESPACES VECTORIELS APPLICATIONS LINEAIRES",
	"coef_matiere":"1.50",
	"heritage_1":{
	    "parent":"CPP1MS1E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M03E":{
	"nom_matiere":"ALGEBRE GENERALE",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1MS1E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M04E":{
	"nom_matiere":"INTEGRATION ET POLYNOMES",
	"coef_matiere":"1.50",
	"heritage_1":{
	    "parent":"CPP1MS1E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M05E":{
	"nom_matiere":"FONCTIONS USUELLES",
	"coef_matiere":"0.50",
	"heritage_1":{
	    "parent":"CPP1MS1E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M06E":{
	"nom_matiere":"SUITES",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1MS1E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M07E":{
	"nom_matiere":"CALCUL DIFFERENTIEL",
	"coef_matiere":"1.50",
	"heritage_1":{
	    "parent":"CPP1MS1E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M16E":{
	"nom_matiere":"MEGAMATHS",
	"coef_matiere":"0.00",
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1K02E":{
	"nom_matiere":"UE 2 : PHYSIQUE-MECANIQUE SEMESTRE 1",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1PM1E"],
	    "parent":"CPP1KS1E"
	}
    },
    "CPP1PM1E":{
	"nom_matiere":"PHYSIQUE-MECANIQUE S1",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1ME1E","CPP1P01E","CPP1P02E","CPP1P04E","CPP1TP1E"],
	    "parent":"CPP1K02E"
	}
    },
    "CPP1ME1E":{
	"nom_matiere":"MECANIQUE I OU M\u00e9canique du point mat\u00e9riel",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1PM1E"
	},
	"heritage_2":{
	    "parent":"CPP1PME"
	}
    },
    "CPP1P01E":{
	"nom_matiere":"OUTILS DE LA PHYSIQUE",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1PM1E"
	},
	"heritage_2":{
	    "parent":"CPP1PME"
	}
    },
    "CPP1P02E":{
	"nom_matiere":"CIRCUITS ELECTRIQUES",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1PM1E"
	},
	"heritage_2":{
	    "parent":"CPP1PME"
	}
    },
    "CPP1P04E":{
	"nom_matiere":"THERMODYNAMIQUE I",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1PM1E"
	},
	"heritage_2":{
	    "parent":"CPP1PME"
	}
    },
    "CPP1TP1E":{
	"nom_matiere":"TP DE PHYSIQUE SEMESTRE 1",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "parent":"CPP1PM1E"
	},
	"heritage_2":{
	    "parent":"CPP1PME"
	}
    },
    "CPP1K03E":{
	"nom_matiere":"UE 3 : CHIMIE-BIOLOGIE SEMESTRE 1",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1CS1E","CPP1BS1E"],
	    "parent":"CPP1KS1E"
	}
    },
    "CPP1BS1E":{
	"nom_matiere":"BIOLOGIE S1",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1GS1E","CPP1B01E"],
	    "parent":"CPP1K03E"
	}
    },
    "CPP1B01E":{
	"nom_matiere":"BIOCHIMIE GENERALE- BIOLOGIE MOLECULAIRE",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1BS1E"
	},
	"heritage_2":{
	    "parent":"CPP1BE"
	}
    },
    "CPP1GS1E":{
	"nom_matiere":"GEOSCIENCES",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1G01E","CPP1G02E","CPP1G03E"],
	    "parent":"CPP1BS1E"
	}
    },
    "CPP1G01E":{
	"nom_matiere":"PARTIE 1 - PV -",
	"coef_matiere":"0.50",
	"heritage_1":{
	    "parent":"CPP1GS1E"
	},
	"heritage_2":{
	    "parent":"CPP1BE"
	}
    },
    "CPP1G02E":{
	"nom_matiere":"PARTIE 2 - DB-",
	"coef_matiere":"0.50",
	"heritage_1":{
	    "parent":"CPP1GS1E"
	},
	"heritage_2":{
	    "parent":"CPP1BE"
	}
    },
    "CPP1G03E":{
	"nom_matiere":"PARTIE 3 - FO-",
	"coef_matiere":"0.50",
	"heritage_1":{
	    "parent":"CPP1GS1E"
	},
	"heritage_2":{
	    "parent":"CPP1BE"
	}
    },
    "CPP1CS1E":{
	"nom_matiere":"CHIMIE S1",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1C01E","CPP1C02E","CPP1CTPE"],
	    "parent":"CPP1K03E"
	}
    },
    "CPP1C01E":{
	"nom_matiere":"CHIMIE THEORIQUE",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1CS1E"
	},
	"heritage_2":{
	    "parent":"CPP1CE"
	}
    },
    "CPP1C02E":{
	"nom_matiere":"CHIMIE MINERALE",
	"coef_matiere":"0.50",
	"heritage_1":{
	    "parent":"CPP1CS1E"
	},
	"heritage_2":{
	    "parent":"CPP1CE"
	}
    },
    "CPP1CTPE":{
	"nom_matiere":"TP DE CHIMIE",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "parent":"CPP1CS1E"
	},
	"heritage_2":{
	    "parent":"CPP1CE"
	}
    },
    "CPP1K04E":{
	"nom_matiere":"UE4 : SCIENCES HUMAINES SEMESTRE 1",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1AS1E","CPP1SS1E","CPP1VS1E"],
	    "parent":"CPP1KS1E"
	}
    },
    "CPP1AS1E":{
	"nom_matiere":"ANGLAIS S1",
	"coef_matiere":"1.50",
	"heritage_1":{
	    "parent":"CPP1K04E"
	},
	"heritage_2":{
	    "parent":"CPP1AE"
	}
    },
    "CPP1SS1E":{
	"nom_matiere":"EPS S1",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1K04E"
	},
	"heritage_2":{
	    "parent":"CPP1SE"
	}
    },
    "CPP1VS1E":{
	"nom_matiere":"LVII S1",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1V02E","CPP1V01E"],
	    "parent":"CPP1K04E"
	}
    },
    "CPP1V02E":{
	"nom_matiere":"ALLEMAND S1",
	"coef_matiere":"1.50",
	"heritage_1":{
	    "parent":"CPP1VS1E"
	},
	"heritage_2":{
	    "parent":"CPP1VE"
	}
    },
    "CPP1S1E":{
	"nom_matiere":"MOYENNES SEMESTRE 1",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1KS1E"],
	    "parent":"CPP1K1AE"
	}
    },
    "CPP1KS2E":{
	"nom_matiere":"DEUXIEME SEMESTRE DE TRONC COMMUN",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1K08E","CPP1K05E","CPP1K06E","CPP1K07E"],
	    "parent":"CPP1S2E"
	}
    },
    "CPP1ECME":{
	"nom_matiere":"EPREUVE COMMUNE DE MATHS",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1MS2E"
	},
	"heritage_2":{
	    "parent":"CPP1ECE"
	}
    },
    "CPP1ECPE":{
	"nom_matiere":"EPREUVE COMMUNE DE PHYSIQUE",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1K06E"
	},
	"heritage_2":{
	    "parent":"CPP1ECE"
	}
    },
    "CPP1K05E":{
	"nom_matiere":"UE 5 : MATHEMATIQUES SEMESTRE 2",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1MS2E"],
	    "parent":"CPP1KS2E"
	}
    },
    "CPP1MS2E":{
	"nom_matiere":"MATHEMATIQUES S2",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1M08E","CPP1M09E","CPP1M10E","CPP1M11E","CPP1M12E","CPP1M13E","CPP1M14E","CPP1M15E","CPP1M17E","CPP1ECME"],
	    "parent":"CPP1K05E"
	}
    },
    "CPP1M08E":{
	"nom_matiere":"EQUATIONS DIFFERENTIELLES",
	"coef_matiere":"0.50",
	"heritage_1":{
	    "parent":"CPP1MS2E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M09E":{
	"nom_matiere":"MATRICES",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1MS2E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M10E":{
	"nom_matiere":"DETERMINANTS",
	"coef_matiere":"0.75",
	"heritage_1":{
	    "parent":"CPP1MS2E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M11E":{
	"nom_matiere":"FONCTION A PLUSIEURS VARIABLES",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1MS2E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M12E":{
	"nom_matiere":"SERIES NUMERIQUES",
	"coef_matiere":"0.50",
	"heritage_1":{
	    "parent":"CPP1MS2E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M13E":{
	"nom_matiere":"GEOMETRIE",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1MS2E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M14E":{
	"nom_matiere":"INTEGRALES GENERALISEES",
	"coef_matiere":"0.50",
	"heritage_1":{
	    "parent":"CPP1MS2E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M15E":{
	"nom_matiere":"REDUCTION DES ENDOMORPHISMES",
	"coef_matiere":"1.25",
	"heritage_1":{
	    "parent":"CPP1MS2E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1M17E":{
	"nom_matiere":"INFORMATIQUE",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1MS2E"
	},
	"heritage_2":{
	    "parent":"CPP1ME"
	}
    },
    "CPP1K06E":{
	"nom_matiere":"UE 6 : PHYSIQUE-MECANIQUE SEMESTRE 2",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1ECPE","CPP1PM2E"],
	    "parent":"CPP1KS2E"
	}
    },
    "CPP1PM2E":{
	"nom_matiere":"PHYSIQUE-MECANIQUE S2",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1ME3E","CPP1P03E","CPP1P05E","CPP1P06E","CPP1TP2E"],
	    "parent":"CPP1K06E"
	}
    },
    "CPP1ME3E":{
	"nom_matiere":"MECANIQUE II ou M\u00e9canique des syst\u00e8mes et du solide",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1PM2E"
	},
	"heritage_2":{
	    "parent":"CPP1PME"
	}
    },
    "CPP1P03E":{
	"nom_matiere":"ELECTROSTATIQUE",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1PM2E"
	},
	"heritage_2":{
	    "parent":"CPP1PME"
	}
    },
    "CPP1P05E":{
	"nom_matiere":"MAGNETISME",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1PM2E"
	},
	"heritage_2":{
	    "parent":"CPP1PME"
	}
    },
    "CPP1P06E":{
	"nom_matiere":"THERMODYNAMIQUE II",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1PM2E"
	},
	"heritage_2":{
	    "parent":"CPP1PME"
	}
    },
    "CPP1TP2E":{
	"nom_matiere":"TP DE PHYSIQUE SEMESTRE 2",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "parent":"CPP1PM2E"
	},
	"heritage_2":{
	    "parent":"CPP1PME"
	}
    },
    "CPP1K07E":{
	"nom_matiere":"UE 7 : CHIMIE-BIOLOGIE SEMESTRE 2",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1BS2E","CPP1CS2E"],
	    "parent":"CPP1KS2E"
	}
    },
    "CPP1BS2E":{
	"nom_matiere":"BIOLOGIE CELLULAIRE - REGULATION DES L EXPRESSION GENIQUE EN",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1K07E"
	},
	"heritage_2":{
	    "parent":"CPP1BE"
	}
    },
    "CPP1CS2E":{
	"nom_matiere":"CHIMIE S2",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1C03E","CPP1C04E"],
	    "parent":"CPP1K07E"
	}
    },
    "CPP1C03E":{
	"nom_matiere":"THERMOCHIMIE",
	"coef_matiere":"1.50",
	"heritage_1":{
	    "parent":"CPP1CS2E"
	},
	"heritage_2":{
	    "parent":"CPP1CE"
	}
    },
    "CPP1C04E":{
	"nom_matiere":"SOLUTIONS ACQUEUSES",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1CS2E"
	},
	"heritage_2":{
	    "parent":"CPP1CE"
	}
    },
    "CPP2C01E":{
	"nom_matiere":"CINETIQUE CHIMIQUE HOMOGENE",
	"coef_matiere":"1.50"
    },
    "CPP1K08E":{
	"nom_matiere":"UE 8 : SCIENCES HUMAINES SEMESTRE 2",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1SS2E","CPP1AS2E","CPP1VS2E","CPP1EE2E"],
	    "parent":"CPP1KS2E"
	}
    },
    "CPP1AS2E":{
	"nom_matiere":"ANGLAIS S2",
	"coef_matiere":"1.50",
	"heritage_1":{
	    "parent":"CPP1K08E"
	},
	"heritage_2":{
	    "parent":"CPP1AE"
	}
    },
    "CPP1SS2E":{
	"nom_matiere":"EPS S2",
	"coef_matiere":"1.00",
	"heritage_1":{
	    "parent":"CPP1K08E"
	},
	"heritage_2":{
	    "parent":"CPP1SE"
	}
    },
    "CPP1VS2E":{
	"nom_matiere":"LVII S2",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1V05E","CPP1V04E"],
	    "parent":"CPP1K08E"
	}
    },
    "CPP1V05E":{
	"nom_matiere":"ALLEMAND S2",
	"coef_matiere":"1.50",
	"heritage_1":{
	    "parent":"CPP1VS2E"
	},
	"heritage_2":{
	    "parent":"CPP1VE"
	}
    },
    "CPP1S2E":{
	"nom_matiere":"MOYENNE SEMESTRE 2",
	"coef_matiere":"0.00",
	"heritage_1":{
	    "enfants":["CPP1KS2E"],
	    "parent":"CPP1K1AE"
	}
    },
    "CPP1V01E":{
	"nom_matiere":"ESPAGNOL S1",
	"coef_matiere":"1.50",
	"heritage_1":{
	    "parent":"CPP1VS1E"
	},
	"heritage_2":{
	    "parent":"CPP1VE"
	}
    },
    "CPP1V04E":{
	"nom_matiere":"ESPAGNOL S2",
	"coef_matiere":"1.50",
	"heritage_1":{
	    "parent":"CPP1VS2E"
	},
	"heritage_2":{
	    "parent":"CPP1VE"
	}
    }
};



FMC();