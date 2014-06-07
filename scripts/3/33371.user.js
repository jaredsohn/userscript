// ==UserScript==
// @name           Travian: Richiedi alla capitale
// @namespace      richiedi_dalla_capitale
// @include        http://*.travian.*/*
// @version        1.0.1 alpha
// ==/UserScript==

var config=new Array();
// copy this part to make a new server configuration | Start
config['speed.travian.it']=new Array();
config['speed.travian.it']['capitalid']=00000;  // The id of your capital. ES: http://speed.travian.com/dorf1.php?newdid=12435 <- This is the ID!
// copy this part to make a new server configuration | End

var host=window.location.host;
var securevalue=60;

// INIZIO BASE64 ******************************************************************************************
var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

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

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}
// FINE BASE64 *******************************************************************************************
function risorse(){
var returna=new Array();

var legno=document.getElementById('l4').innerHTML;
var legno=legno.split("/");
var legno=legno[0];
	
var argilla=document.getElementById('l3').innerHTML;
var argilla=argilla.split("/");
var argilla=argilla[0];

var ferro=document.getElementById('l2').innerHTML;
var ferro=ferro.split("/");
var ferro=ferro[0];

var grano=document.getElementById('l1').innerHTML;
var grano=grano.split("/");
var grano=grano[0];

returna[0]=legno;
returna[1]=argilla;
returna[2]=ferro;
returna[3]=grano;
return returna;
}

function capacita(){
var returna=new Array();

var legno=document.getElementById('l4').innerHTML;
var legno=legno.split("/");
var legno=legno[1];

var grano=document.getElementById('l1').innerHTML;
var grano=grano.split("/");
var grano=grano[1];

returna[0]=legno;
returna[1]=legno;
returna[2]=legno;
returna[3]=grano;
return returna;
}

function produzioni(){
var returna=new Array();
var legno=document.getElementById('l4').title;
var argilla=document.getElementById('l3').title;
var ferro=document.getElementById('l2').title;
var grano=document.getElementById('l1').title;
returna[0]=legno;
returna[1]=argilla;
returna[2]=ferro;
returna[3]=grano;
return returna;
}

function GET(nome){
if(!window.location.search) {
return 'null';
}
var qst = window.location.search.substr(1);
var dati = qst.split(/\&/);
var valore = '';
for (var i=0; i<dati.length; i++) {
var tmp = dati[i].split(/\=/);
if (tmp[0] == nome) {
return tmp[1];
}
}
return 'null';
}

if(document.getElementById('r1')!=null){
if(GET('r1')!='null' && GET('r2')!='null' && GET('r3')!='null' && GET('r4')!='null' && GET('v')!='null'){
document.getElementById('r1').value=GET('r1');
document.getElementById('r2').value=GET('r2');
document.getElementById('r3').value=GET('r3');
document.getElementById('r4').value=GET('r4');
document.getElementsByTagName('input')[5].value=Base64.decode(GET('v'));
}
}

var risorse=risorse();
var capacita=capacita();
var legno=capacita[0]-risorse[0]-securevalue;
var argilla=capacita[1]-risorse[1]-securevalue;
var ferro=capacita[2]-risorse[2]-securevalue;
var grano=capacita[3]-risorse[3]-securevalue;

if(legno<0){legno=0;}
if(argilla<0){argilla=0;}
if(ferro<0){ferro=0;}
if(grano<0){grano=0;}

allElements = document.getElementsByTagName('a');
for (var i = 0; i < allElements.length; i++) {
    if(allElements[i].href.match(/(.*?)\?newdid=(.*?)/ig)){
    // do something with thisElement
	if(allElements[i].className=='active_vl'){
	var village=Base64.encode(allElements[i].innerHTML);
	var villageid=allElements[i].href.replace(/(.*?)\?newdid=(.*?)/ig, "$2");
	}
	}

}

if(parseInt(villageid)!=config[host]['capitalid']){
document.getElementById('lres0').innerHTML+='<a id="request_from_capital" href="build.php?newdid='+config[host]['capitalid']+'&gid=17&r1='+legno+'&r2='+argilla+'&r3='+ferro+'&r4='+grano+'&v='+village+'">Full resource from capital</a>';