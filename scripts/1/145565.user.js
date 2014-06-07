// ==UserScript==
// @name        FreeBordel
// @namespace   PJSimply
// @description Ajouter une ou deux fonctions 
// @include     http://www.free-community.in/*
// @grant       je sais pas ce que c'est
// @version     1.2
// ==/UserScript==


// Travail original de Sofea : http://userscripts.org/users/79023
// Modifié pour la Free par PJSimply
// Distribué sous licence WTFPL

var LSKey_smiley = 'array_smileys'
var LSKey_option = 'array_options'

var smiley_array = new Array();

if (localStorage){
    eval(localStorage[LSKey_smiley]);
}

if (localStorage && typeof(localStorage[LSKey_option])=='undefined'){
    localStorage[LSKey_option] = '0:0:0:0';
}

if (localStorage){
var option_tab = localStorage[LSKey_option].split(":");
}
if (localStorage && typeof(localStorage[LSKey_smiley])=='undefined'){
    smiley_array["deathh"] = "http://www.free-community.in/upload/1/7748f7f5dafd33e72b1504164d89dc60.png";
    smiley_array["fsdeath"] = "http://www.free-community.in/upload/1/e9647d3fbb1e0411f0e2595a26751f79.png";
    smiley_array["fuud"] = "http://www.free-community.in/upload/1/d67a66a37d2c934f0ae75a560b27a11b.png";
    smiley_array["pokerdeath"] = "http://www.free-community.in/upload/1/1eb6d7c1046ce5ec6a7d558a3b41c9a2.png";
    smiley_array["feeld"] = "http://www.free-community.in/upload/1/8506aa14c24a8af4d86223c2a36602e5.png";
    smiley_array["deathj"] = "http://www.free-community.in/upload/1/e4b89d011b423b909211b0ad04eac603.png";
    smiley_array["swagd"] = "http://www.free-community.in/upload/1/0688182776c9999dd660614a0f9fb6d0.png";
    smiley_array["mod"] = "http://www.free-community.in/upload/1/ae8067ce17d42f3d05d679858652defe.png";
    smiley_array["twix"] = "http://www.free-community.in/upload/1/cf39a21e9351ffae5210aa4e25edcaf0.png";
    smiley_array["deathchaud"] = "http://www.free-community.in/upload/1/47e830f38697f31b639e14825f1fd533.png";
    smiley_array["deathbouche"] = "http://www.free-community.in/upload/1/003e37faa5d8f34353a408993831ffe3.png";
    smiley_array["deathombre"] = "http://www.free-community.in/upload/1/13d7707efa756a94e83569e340af6f54.png";
    smiley_array["trolldeath"] = "http://www.free-community.in/upload/1/de9da66e1ae24f77be61bef4866fe709.png";
    smiley_array["twixok"] = "http://www.free-community.in/upload/1/1335f65cd6e687448b136c5a9af21611.png";
    smiley_array["deathecrase"] = "http://www.free-community.in/upload/1/bf05e26ec2df2545f8d478d7e6d6ecc1.png";
    smiley_array["deathsnif"] = "http://www.free-community.in/upload/1/bbc604c38c697fae2888cd8f6f34f0ce.png";  
}   

// RÉGLAGES DE L'UTILISATEUR
// options
if (localStorage){
    var froid=option_tab[0];
    var smiley=option_tab[1];
    var brainfuck=option_tab[2];
    var noiw=option_tab[3];
}else{
    var froid=0;
    var smiley=0;
    var brainfuck=0;
    var noiw=0
}

function modStyle() {
    var stylsheet = document.getElementsByTagName("style")[2];
    //stylsheet.innerHTML += '';
}

    
function addPanel() {
        var panel = document.getElementById('sidebar').getElementsByTagName('div')[0].getElementsByTagName('div')[0];
        panel.innerHTML = panel.innerHTML + '<a id="menuExt"><img src="http://www.free-community.in/upload/1/772a637e600066ee9407b4d4983cb57f.png" alt="" /> Extension </a> &nbsp;&nbsp;&nbsp;&nbsp;';
        var liste_forums = document.getElementById('menu').getElementsByTagName('ul')[0];
        liste_forums.innerHTML =  liste_forums.innerHTML+'<li><a href="#" id="note" onclick="alert(\'ça arrive bientôt\')">Notes</a></li>';
}


function post(froid,smil,brainfu,noir,tab) {
    var form, message, invisible, submit, deb_smil, mid_smil, end_smil;
    form = document.getElementById("form");
    message = document.getElementById("message");
    deb_smil = "message.value = message.value.replace(/:";
    mid_smil = ':/gi,"[img]';
    end_smil = '[/img]");';
    if (form && message) {
        invisible = String.fromCharCode(31);
        form.addEventListener("submit", function () {
            
            //Extension froideur
            if (froid==1) {
                message.value = message.value.split(":" + invisible).join(":");
                message.value = message.value.split(":").join(":" + invisible);
            }
            
            //Gestion des smiley_array persos :
            if (smil==1) {
                var rempsmile = "";
                var actsmile = "";
                for(var indice in tab){
                    actsmile = deb_smil + indice + mid_smil + tab[indice] + end_smil;
                    rempsmile += actsmile;
                }
                eval(rempsmile);
            }
            //Modification des lettres pour faire chier les gens
            if (brainfu==1) {
                message.value = message.value.replace(/a/gi,":ah:");
                message.value = message.value.replace(/o/gi,":oh:");
            }
            if (noir == 1){
            	message.value = message.value.replace(/r/gi,"w");
            }
        }, false);
    }
}


modStyle();
addPanel();
post(froid,smiley,brainfuck,noiw,smiley_array);

var menu = document.getElementById('menuExt');

menu.onclick = function() {
    if (confirm("Voulez-vous ajouter un smiley ?")){
        if (localStorage){    
            var name = prompt("Mettez le nom du smiley","");
            if (name!=null && name!=""){
                var url=prompt("Et son url","");
                if (url!=null && url!=""){
                    add_smiley="Smiley ajouté:\n" + name + " : " + url;
                    smiley_in_LS = 'smiley_array["'+ name + '"] = "'+ url + '";'
                    if (typeof(localStorage[LSKey_smiley])=='undefined'){
                        localStorage[LSKey_smiley] = smiley_in_LS;
                    }else{
                        localStorage[LSKey_smiley] = localStorage[LSKey_smiley] + smiley_in_LS;
                    }
                    alert(add_smiley);
                }
            }   
        }else{
            alert("Vous n'avez pas activé le localStorage, activez le, mettez à jour votre navigatuer ou modifiez la source du script pour ajouter vos smileys");    
        }    
    }else{
        if (localStorage){
            if(confirm("Voulez-vous activer le mode froideur ?")){
                option_tab[0]=1
            }else{
                option_tab[0]=0
            }
            if(confirm("Voulez-vous activer les smileys perso ?")){
                option_tab[1]=1
            }else{
                option_tab[1]=0
            }
            if(confirm("Voulez-vous activer le mode brainfuck ?")){
                option_tab[2]=1
            }else{
                option_tab[2]=0
            }
            if(confirm("Voulez-vous écwiwe comme un noiw?")){
                option_tab[3]=1
            }else{
                option_tab[3]=0
            }
            localStorage[LSKey_option] = option_tab.join(":")

        }else{
            alert("Vous n'avez pas activé le localStorage, activez le, mettez à jour votre navigatuer ou modifiez la source du script pour modifier les options");    

        }
    }
};