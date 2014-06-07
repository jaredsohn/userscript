// ==UserScript==
// @name           sa web washer
// @namespace      sa web washer
// @description    beautify dirty sa content
// @include        http://www.news24.com/*
// @include        http://*.news24.com/*
// @include        http://www.iol.co.za/*
// @include        http://www.zasucks.com/*
// @include        http://www.fin24.com/*
// ==/UserScript==

function do_platypus_script() {
    searchNdestroy(); // steen des aanstoots
    var berig = soekBerig();


    if (berig.taal == "brits") {
        vertaalBrits(berig.elem);
    } else if (berig.taal == "afrikaans") {
        vertaalAfr(berig.elem);
    }
    vertaalAlle(berig.elem);
}

window.addEventListener("load", function() {
//alert("zip it - voor snd");
    do_platypus_script();
}, false);

function searchNdestroy() {
    // kotslap aka steen des aanstoots aka african ass wipe aka kaffer wapper
    var images = document.getElementsByTagName("img");
    var image;

    for(var i=0; i<images.length; i++) {
        image = images[i];
        if(image.src.search(/SA.*Flag/i)>0) {
            // alert("sdn gevind ["+image.src+"]");
            var w=image.width;
            var h=image.heigth;
            image.src = "http://www.gravatar.com/avatar/ed9546ab86359221e3e956e34a9ec8da?s=80";
            image.width = w;
            image.heigth = h;
        }
    }
}

function soekBerig() {

    var locat = location;
    if (locat.href.indexOf("/Beeld/") > 0) {
        if(locat.pathname.indexOf("/Home") > 0) {
            return { // beeld hoof bladsy
                elem: find_xpath('/html/body/table[3]/tbody'),
                taal: "afrikaans"
            };
        } else {

            return {
                elem: find_xpath('/html/body/table[2]/tbody/tr[3]/td'),
                taal: "afrikaans"
            };
        }
    } else if (locat.href.indexOf("/Rapport/") > 0) {
        if(locat.pathname.indexOf("/Home") > 0) {
            return { // rapport hoof bladsy
                elem: find_xpath('/html/body/table[2]/tbody/tr/td/table'),
                taal: "afrikaans"
            };
        } else {
            return { //enkel artikel
                elem: find_xpath('/html/body/table[2]/tbody/tr[2]/td'),
                taal: "afrikaans"
            };
        }
    } else if (locat.href.indexOf("news24") > 0) {
        if(locat.pathname.indexOf("/Home/") > 0) {
            return {
                elem: find_xpath("/html/body/table[5]/tbody/tr[2]/td/table"),
                taal: "brits"
            };
        } else {
            return { // single
                elem: find_xpath('/html/body/form/div[3]/div[5]/div/div[2]'),
                taal: "brits"
            };
        }
    } else if (locat.href.indexOf("www.iol.co.za") > 0) {
        var elem = find_xpath("/html/body/div[2]/div/div[2]");

        if (elem != null && elem.id == 'body') {
            return { // home page list
                elem: elem,
                taal: "brits"
            };
        } else {
            return { // one article
                elem: find_xpath('//*[@id="bodyleft"]'),
                taal: "brits"
            };
        }
    } else if (locat.href.indexOf("fin24") > 0) {
        return { // one article
            elem: find_xpath('/html/body/div[2]/div/form/div[3]/div/div[2]'),
            taal: "brits"
	}
    } else if (locat.href.indexOf("zasucks") > 0) {
        return { // one article
            elem: find_xpath('//*[@id="content"]'),
            taal: "giberish"
        };
    }



    return null;
}

function find_xpath(xp) {
    return document.evaluate(xp, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function do_modify_html_it(doc, element, match_re, replace_string) {
    var match_re = new RegExp(match_re);
    if (element.innerHTML) {
        element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    }
}


function vertaalBrits(berig) {

    do_modify_html_it(window.document, berig, /North West/g, 'Western-Transvaal');
    do_modify_html_it(window.document, berig, /learner/g, 'pupil');
    do_modify_html_it(window.document, berig, /learners/g, 'pupils');
    do_modify_html_it(window.document, berig, /Ekurhuleni/g, 'East Rand');
    do_modify_html_it(window.document, berig, /Polokwane/g, 'Pietasbeg');
    do_modify_html_it(window.document, berig, /Limpopo/g, 'Upper Northen Transvaal');
    do_modify_html_it(window.document, berig, /anti-apartheid icon/g, 'Liberator from Civilization terrorist');
    do_modify_html_it(window.document, berig, /Mpumalanga/g, 'Eastern Transvaal');
    do_modify_html_it(window.document, berig, /BEE/g, 'Black Nepotism(BEE)');
    do_modify_html_it(window.document, berig, /former president Thabo Mbeki/gi, 'His Excellency Comrade Glorious Leader Tarboy Mbeggi');
    do_modify_html_it(window.document, berig, /South African government/g, 'Azanian regime');
    do_modify_html_it(window.document, berig, /O\\.?R\\.? Tambo(?= International)?(?= Airport)?/g, 'Jan Smuts Airport');
    do_modify_html_it(window.document, berig, /township/gi, 'location');
    do_modify_html_it(window.document, berig, /Bushbuckridge/g, 'Bosbokrant');
    do_modify_html_it(window.document, berig, / nabbed /g, ' arrested ');
    do_modify_html_it(window.document, berig, / nab /g, ' arrest ');
    do_modify_html_it(window.document, berig, /Mossel Bay/g, 'Mosselbaai');
    do_modify_html_it(window.document, berig, /Nelson Mandela bay/g, 'Port Elizabeth');
    do_modify_html_it(window.document, berig, /Steve Biko Academic Hospital/g, 'Pretoria Academic Hospital');
    do_modify_html_it(window.document, berig, /Charlotte Maxeke Hospital/g, 'Johannesburg Hospital');
    do_modify_html_it(window.document, berig, /Rahina Moosa Mother and Child Hospital/g, 'Coronation Hospital');
    do_modify_html_it(window.document, berig, /Gr. 12/gi, 'Matric');
    do_modify_html_it(window.document, berig, /democracy/gi, 'kleptocracy');
    do_modify_html_it(window.document, berig, /Kuils River/g, 'Kuilsrivier');
    do_modify_html_it(window.document, berig, /Salt River/g, 'Soutrivier');
    do_modify_html_it(window.document, berig, /Diep River/g, 'Dieprivier');
    do_modify_html_it(window.document, berig, /Elsies River/g, 'Elsiesrivier');
    do_modify_html_it(window.document, berig, /facing the music/g, 'being charged');
    do_modify_html_it(window.document, berig, /at large/g, 'on the loose');
    do_modify_html_it(window.document, berig, /Mooi River/g, 'Mooirivier');
    do_modify_html_it(window.document, berig, /apartheid/gi, 'white-civilization');
    do_modify_html_it(window.document, berig, /tradisionele healer/gi, 'witch doctor');

}

function vertaalAfr(berig) {
    do_modify_html_it(window.document, berig, /Noordwes(?!-Beeld)/g, 'Wes-Transvaal');
    do_modify_html_it(window.document, berig, /Mpumalanga/g, 'Oos Transvaal');
    do_modify_html_it(window.document, berig, /leerder/g, 'leerling');
    do_modify_html_it(window.document, berig, /leerder/g, 'leerling');
    do_modify_html_it(window.document, berig, /Ekurhuleni/g, 'Oos Rand');
    do_modify_html_it(window.document, berig, /Polokwane/g, 'Pietersburg');
    do_modify_html_it(window.document, berig, /Limpopo/g, 'Verre Noord Transvaal');
    do_modify_html_it(window.document, berig, /BEE/g, 'Bandjies vir Bantoes (BEE)');
    do_modify_html_it(window.document, berig, /president Thabo Mbeki/gi, 'His Excellency Comrade Glorious Leader Tarboy Mbeggi');
    do_modify_html_it(window.document, berig, /O.R. Tambo-lughawe/gi, 'Jan Smuts Lughawe');
    do_modify_html_it(window.document, berig, /O[\\.\s]R\\.? Tambo(?= Internationale)?(?= Lughawe)?/gi, 'Jan Smuts Lughawe');
    do_modify_html_it(window.document, berig, /Suid-Afrikaanse regering/g, 'Regime van Azanië');
    do_modify_html_it(window.document, berig, /Eskom/g, 'Evkom');
    do_modify_html_it(window.document, berig, /Engels/g, 'Brits');
    do_modify_html_it(window.document, berig, /Iscor/g, 'Yskor');
    do_modify_html_it(window.document, berig, /township/gi, 'lokasie');
    do_modify_html_it(window.document, berig, /versoeningsdag/g, 'geloftedag');
    do_modify_html_it(window.document, berig, /Nelson Mandelabaai/g, 'Port Elizabeth');
    do_modify_html_it(window.document, berig, /Steve Biko([-\s])?hospitaal/gi, 'Pretoria Akademiese Hospitaal');
    do_modify_html_it(window.document, berig, /Charlotte Maxeke([-\s])?Hospitaal/gi, 'Johannesburg Hospitaal'); // dash of spasie
    do_modify_html_it(window.document, berig, /Rahina Moosa Mother and Child Hospitaal/gi, 'Coronation Hospitaal');
    do_modify_html_it(window.document, berig, /Gr. 12/gi, 'Matriek');
    do_modify_html_it(window.document, berig, /Informele Nedersetting/gi, 'plakkerskamp');
    do_modify_html_it(window.document, berig, /demokrasie/gi, 'kleptokrasie');
    do_modify_html_it(window.document, berig, /Grondwed/g, 'Strontwet');
    do_modify_html_it(window.document, berig, /apartheid/gi, 'wit-beskaafdheid');
    do_modify_html_it(window.document, berig, /tradisionele geneser/gi, 'toor dokter');

 
}

function vertaalAlle(berig) {

    do_modify_html_it(window.document, berig, /eThekwini/g, 'Durban');
    do_modify_html_it(window.document, berig, /Musina/g, 'Mesina');
    do_modify_html_it(window.document, berig, /Tshwane/g, 'Pretoria');
    do_modify_html_it(window.document, berig, /Gauteng/g, 'PWV');
    do_modify_html_it(window.document, berig, /Trevor Manuel/g, 'Comrade Clever Trevor Manuel');
    do_modify_html_it(window.document, berig, /SABC/g, 'ANC Broascasting Corporation');
    do_modify_html_it(window.document, berig, /Madiba/g, 'Comrade Nelson Osama bin Mandela');
    do_modify_html_it(window.document, berig, /Modimolle/g, 'Nylstroom');
    do_modify_html_it(window.document, berig, /KwaZulu-Natal/ig, 'Natal');
    do_modify_html_it(window.document, berig, /KwaZulu-Natalse/g, 'Natal');
    do_modify_html_it(window.document, berig, /Mafikeng/g, 'Mafiking');
    do_modify_html_it(window.document, berig, /Bela[-\s]Bela/g, 'Warmbad'); // minus of spasie
    do_modify_html_it(window.document, berig, /Mokopane/g, 'Potgietersrus');
    do_modify_html_it(window.document, berig, /Lephalale/g, 'Ellisras');
    do_modify_html_it(window.document, berig, /Proteas/g, 'Springbokke');
    do_modify_html_it(window.document, berig, /Centurion/g, 'Verwoerdburg');
    do_modify_html_it(window.document, berig, /Mookgopong/g, 'Naboomspruit');
    do_modify_html_it(window.document, berig, /Mthatha/g, 'Umtata');
    do_modify_html_it(window.document, berig, /KZN/g, 'Natal');
    do_modify_html_it(window.document, berig, /Joburg/g, 'Johannesburg');
    do_modify_html_it(window.document, berig, /(President ?)(Kgalema Motlanthe)/g, 'Illustrious Comrade Kgalema');
    do_modify_html_it(window.document, berig, /Luke Watson/g, 'Kots Watson');
    do_modify_html_it(window.document, berig, /Mbombela/g, 'Nelspruit');
    do_modify_html_it(window.document, berig, /Nkosazana Dlamini-Zuma/g, 'Comrade Knoffel');
    do_modify_html_it(window.document, berig, /Julius Malema/g, 'Julius -Monkey Man- Malema');
    do_modify_html_it(window.document, berig, /Nelson Mandela/g, 'His Holyness the most Excellent Comrade Nelson - The Usurper - Mandela');
    do_modify_html_it(window.document, berig, /Carl Niehaus/g, 'Kaal - geen huis - Niehaus');
    do_modify_html_it(window.document, berig, /Robert Mugabe/g, 'Robert - The Terrible - Mugabe');
    do_modify_html_it(window.document, berig, /Reivilo/g, 'Vryburg');
    do_modify_html_it(window.document, berig, /African National Congress veteran/g, 'Black supremacy Revolutionary');
    do_modify_html_it(window.document, berig, /struggle hero/g, 'Liberator from Civilization');
    do_modify_html_it(window.document, berig, /struggle /g, 'Liberation from Civilization years ');
    do_modify_html_it(window.document, berig, /Winnie Madikizela-Mandela/g, 'Winnie -Firestone- Mandela');
    do_modify_html_it(window.document, berig, /((mr)|(mnr)\. )?(Jacob )?(Zuma)/ig, 'Emperor Jacob Zuma'); // 0 or 1 "Jacob " followed by one "Zuma"
    do_modify_html_it(window.document, berig, /Mosiuoa Lekota/g, 'Terror Lekota');
    do_modify_html_it(window.document, berig, /Mbhazima Shilowa/g, 'Sam Shilowa');
    do_modify_html_it(window.document, berig, /African National Congress/g, 'African National Corruption');
    do_modify_html_it(window.document, berig, /Coca-Cola([-\s])?park /gi, 'Ellispark');
    do_modify_html_it(window.document, berig, /Absa-stadion/gi, 'Kingspark');
    do_modify_html_it(window.document, berig, /Mogwadi/gi, 'Dendron');
 

// Dalai Lama, seperatist/volkstaat proponent
  
}
