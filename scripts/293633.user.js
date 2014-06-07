// ==UserScript==
// @name       5Dim Envio de flotas
// @version    0.4.1
// @description  Script para corregir errores en el juego 5Dim. www.5dim.es
// @include      http://*5dim.es/eljuego/web2/flota.php?*
// @include      http://*5dim.es/eljuego/web2/flota.php?nmenu=*
// @run-at document-end
// @grant window
// ==/UserScript==

function main(){
    /*Funciones*/
    window.limpia = function (q) {
        document.limpiame.lq.value = q;
        document.limpiame.submit();
    }
    window.quieto = function (razon) {
        document.inmovil.larazon.value = razon;
        document.inmovil.submit();
    }
    window.cruta = function (lqhace) {
        var nruta = disenoarmas0.rutassel.value;
        var ncruta = disenoarmas0.ncruta.value;

        crearuta.ncruta.value = ncruta;
        crearuta.lqhace.value = lqhace;
        crearuta.nruta.value = nruta;
        crearuta.misiond1.value = disenoarmas0.select2.value;
        crearuta.misiond2.value = disenoarmas0.select3.value;
        crearuta.destinos1.value = disenoarmas0.destino1.value;
        crearuta.destinop1.value = disenoarmas0.destino1p.value;
        crearuta.destinod1.value = disenoarmas0.destino1d.value;
        crearuta.destinos2.value = disenoarmas0.destino2.value;
        crearuta.destinop2.value = disenoarmas0.destino2p.value;
        crearuta.destinod2.value = disenoarmas0.destino2d.value;

        for (var ciclo = 1; ciclo < 12; ciclo++) {
            crearuta['reca'+ciclo].value = disenoarmas0['dest1rec'+ciclo].value;
            crearuta['recb'+ciclo].value = disenoarmas0['dest2rec'+ciclo].value;
            crearuta['prior'+ciclo].value = disenoarmas0['prior'+ciclo].value;
        }
        if (cantienvios > 2) {
            crearuta.misiond3.value = disenoarmas0.select4.value;
            crearuta.destinos3.value = disenoarmas0.destino3.value;
            crearuta.destinop3.value = disenoarmas0.destino3p.value;
            crearuta.destinod3.value = disenoarmas0.destino3d.value;
            for (var ciclo = 1; ciclo < 12; ciclo++) {
                crearuta['recc'+ciclo].value = disenoarmas0['dest3rec'+ciclo].value;
            }
        }
        //document.crearuta.submit();
        var lugars = 'enruta.php';
        var lugarss = '#crearuta';
        $('#aviso').css("height", 40);
        $('#aviso').css("width", 500);
        $("#aviso").css("top", valorY - 100);
        $('#aviso').html('POR FAVOR, ESPERE UNOS INSTANTES MIENTRAS LA PÁGINA SE RECARGA. GRACIAS');
        $('#aviso').fadeIn('fast');
        criterio = $(lugarss).serialize();
        $.post(lugars, criterio, function (datos) {
            $('#aviso').html(datos);
            setTimeout("$('#aviso').fadeOut('slow')", 20000);
        });
        return false;
    }
    window.todo0 = function (dest) {
        for (ciclo = 1; ciclo < 17; ciclo++) {
            disenoarmas0['dest'+dest+'rec'+ciclo].value = 0;
        }
        actualizacargas();
        resumencargas();
    }
    window.verruta = function () {
        var nruta = disenoarmas0.rutassel.value;
        disenoarmas0.ncruta.value = document.getElementById('rutassel').options[rutassel.selectedIndex].text;

        for (ciclo = 1; ciclo < 12; ciclo++) {
            disenoarmas0['dest1rec'+ciclo].value = this['RECA'+ciclo+'A'+nruta];
            disenoarmas0['dest2rec'+ciclo].value = this['RECA'+ciclo+'B'+nruta];
            disenoarmas0['prior'+ciclo].value = this['prior'+ciclo+'r'+nruta];
        }
        disenoarmas0.Ndestino1.value=this['DESTINOS1'+nruta];
        disenoarmas0.destino1.value=this['DESTINOS1'+nruta];
        disenoarmas0.destino1p.value=this['DESTINOP1'+nruta];
        disenoarmas0.destino1d.value=this['DESTINOD1'+nruta];

        disenoarmas0.Ndestino2.value=this['DESTINOS2'+nruta];
        disenoarmas0.destino2.value=this['DESTINOS2'+nruta];
        disenoarmas0.destino2p.value=this['DESTINOP2'+nruta];
        disenoarmas0.destino2d.value=this['DESTINOD2'+nruta];

        disenoarmas0.select2.value=this['MISIOND1'+nruta];
        disenoarmas0.select3.value=this['MISIOND2'+nruta];

        if (cantienvios == 3) {
            for (ciclo = 1; ciclo < 12; ciclo++) {
                disenoarmas0['dest3rec'+ciclo].value=this['RECA'+ciclo+'C'+nruta];
            }
            disenoarmas0.Ndestino3.value=this['DESTINOS3'+nruta];
            disenoarmas0.destino3.value=this['DESTINOS3'+nruta];
            disenoarmas0.destino3p.value=this['DESTINOP3'+nruta];
            disenoarmas0.destino3d.value=this['DESTINOD3'+nruta];

            disenoarmas0.select4.value=this['MISIOND3'+nruta];
            fotoplanet(3);
        }
        fotoplanet(1);
        fotoplanet(2);
        actualizacargas();
        resumencargas()
        onchang(1, 0);
    }
    window.formatNumber = function (num, prefix) {
        prefix = prefix || '';
        num += '';
        var splitStr = num.split('Â´');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? 'Â´' + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');
        }
        return prefix + splitLeft + splitRight;
    }
    window.unformatNumber = function (num) {
        return num.replace(/([^0-9\.\-])/g, '') * 1;
    }
    window.acceptNum = function (evt) {
        // NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57
        //var key = nav4 ? evt.which : evt.keyCode;
        //return ((key >= 48 && key <= 57))
    }
    window.objetosC = function (ciclo, varia, donde) { // manejando objetos
        var canti = disenoarmas0['cantproto1'+ciclo].value;
        document.creaproto.varia.value = varia;

        if (donde == 1) { // creando objetos
            canti = (canti * 1);
            varia = (varia * 1);
            if (canti + varia < 0) {
                varia = 0;
            }
            this['obj'+ciclo]+=varia;
            canti += varia;
            disenoarmas0['cantproto1'+ciclo].value = canti;
            var cosa = this['obj'+ciclo];
            this['obj'+ciclo]=cosa+varia;

            //creando proto
            var objV=this['objV'+ciclo];
            if (objV < 29) {//es invest
                if (varia < 0) {
                    document.creaproto.elimina.value = "Borrar";
                    document.creaproto.construye.value = "";
                }
                if (varia > 0) {
                    document.creaproto.construye.value = "Crear";
                }
                creaproto.ninvest.value = this['objV'+ciclo]; //objS?
                creaproto.selec1.value = this['objN'+ciclo];
                creaproto.Ninvest.value = this['objV'+ciclo];
                creaproto.elproto.value = this['objN'+ciclo];

                var lugars = 'enprototipo.php';
                var lugarss = '#creaproto';
                $('#aviso').css("height", 140);
                $('#aviso').css("width", 650);
                $("#aviso").css("top", valorY - 200);
            }
            if (objV > 30) {//es arma
                if (varia < 0) {
                    document.creaproto.elimina.value = "Borrar";
                    ;
                    document.creaproto.construye.value = "";
                }
                if (varia > 0) {
                    document.creaproto.construye.value = "Crear";
                }
                creaproto.ninvest.value = this['objS'+ciclo];
                creaproto.selec1.value = this['objN'+ciclo];
                creaproto.Ninvest.value = this['objV'+ciclo];
                creaproto.elproto.value = this['objN'+ciclo];

                var lugars = 'enprototipo.php';
                var lugarss = '#creaproto';
                $('#aviso').css("height", 140);
                $('#aviso').css("width", 650);
                $("#aviso").css("top", valorY - 200);
            }

            if (objV == 29) {//es nave
                if (varia < 0) {
                    document.creaproton.elproto.value = "Borrar";
                }
                if (varia > 0) {
                    document.creaproton.elproto.value = "Crear";
                }
                creaproton.NDISENO.value = this['objI'+ciclo];
                creaproton.NOMBRED.value = this['objN'+ciclo];
                creaproton.variacion.value = varia;

                lugars = 'enprototipoN.php';
                lugarss = '#creaproton';
                $('#aviso').css("height", 40);
                $('#aviso').css("width", 600);
                $("#aviso").css("top", valorY - 100);
            }

            criterio = $(lugarss).serialize();
            $.post(lugars, criterio, function (datos) {
                $('#aviso').html(datos);
                //setTimeout("$('#aviso').fadeOut('slow')",20000);
            });
            return false;
        }


        if (varia == 0) {
            donde = (donde * 1);
            var ested = donde;
            var elotrod = donde + 1;
            if (elotrod > 3) {
                var elotrod = 2;
            }
            var objmx= this['obj'+ciclo];
            var cantinsale= disenoarmas0['cantproto2'+ciclo].value;
            var cantineste= disenoarmas0['cantproto'+ested+ciclo].value;
            var cantinelotro= disenoarmas0['cantproto'+elotrod+ciclo].value;

            disenoarmas0['cantproto1'+ciclo].value= objmx-cantinsale;

            if (objmx - cantinsale < 0) {
                disenoarmas0['cantproto1'+ciclo].style.backgroundColor='#990000';
            } else {
                disenoarmas0['cantproto1'+ciclo].style.backgroundColor='';
            }

            if (cantinelotro > cantinsale || cantineste > cantinsale) {
                disenoarmas0['cantproto1'+ciclo].style.backgroundColor='#990000';
            } else {
                disenoarmas0['cantproto1'+ciclo].style.backgroundColor='';
            }
        }
    }
    window.enviarflota = function () {
        $('#aviso').css("height", 80);
        $('#aviso').css("width", 650);
        $("#aviso").css("top", valorY - 250);
        $('#aviso').html('Procesando');
        $('#aviso').fadeIn('fast');

        enviarlo();

        criterio = $('#disenoarmas0').serialize();
        $.post('enflota1.php', criterio, function (datos) {
            $('#aviso').html(datos);
            setTimeout("$('#aviso').fadeOut('slow')", 20000);
        });
        return false;
    }
    window.cnome = function () { //cambia nombre de la flota
        $('#aviso').css("height", 80);
        $('#aviso').css("width", 600);
        $('#aviso').css("left", 0);
        $("#aviso").css("top", valorY + 250);
        $('#aviso').html('POR FAVOR, ESPERE UNOS INSTANTES MIENTRAS LA PÁGINA SE RECARGA. GRACIAS');
        $('#aviso').fadeIn('fast');

        criterio = $('#disenoarmas0').serialize();
        $.post('enflota25.php', criterio, function (datos) {
            $('#aviso').html(datos);
            setTimeout("$('#aviso').fadeOut('slow')", 20000);
        });
        return false;
    }
    window.vertdano = function () {
        $('#tdano').fadeIn('slow');
    }
    window.ayuda = function (lqhace) {
        var fechac = this['ffecha'+lqhace];
        //	pdestino="http://www.5dim.org/eljuego/web2/construccion/ampliar.php?Submit=AMPLIAR&noesarma=3&ndiseno="+lqhace+"&fechac="+fechac;
        //popup=window.open(pdestino, "popup",  "toolbar=no,resizable=1,width=1024,height=300" )
        laayuda.ndiseno.value = lqhace;
        laayuda.lafecha.value = fechac;

        var lugars = 'construccion/armas4.php';
        var lugarss = '#laayuda';
        $('#aviso').css("height", 350);
        $('#aviso').css("width", 640);
        $("#aviso").css("top", valorY + 10);
        $('#aviso').html('POR FAVOR, ESPERE UNOS INSTANTES MIENTRAS LA PÁGINA SE RECARGA. GRACIAS');
        $('#aviso').fadeIn('fast');

        criterio = $(lugarss).serialize();
        $.post(lugars, criterio, function (datos) {
            $('#aviso').html(datos);
            setTimeout("$('#aviso').fadeOut('slow')", 20000);
        });
        return false;
    }
    window.ayudaX = function (lqhace) {
        laayuda.ndiseno.value = lqhace;
        laayuda.submit();
    }
    window.versist = function (dest) {
        var verdestino = disenoarmas0['destino'+dest].value;
        var verdestinop = disenoarmas0['destino'+dest+'p'].value;

        if (verdestino < limlargouni) {
            document.versistema.sistema.value = verdestino;
            document.versistema.planeta.value = verdestinop;
            //document.versistema.submit();
            lugars = 'versistema.php';
            lugarss = '#versistema';
            $('#aviso').css("height", 270);
            $('#aviso').css("top", 50);
            $('#aviso').css("width", 645);
        } else {
            document.versistema2.sistema.value = verdestino;
            //document.versistema2.submit();
            lugars = 'versistema2.php';
            lugarss = '#versistema2';
            $('#aviso').css("height", 40);
            $('#aviso').css("top", 250);
            $('#aviso').css("width", 645);
        }

        //$('#button2').click(function() {
        $('#aviso').html('POR FAVOR, ESPERE UNOS INSTANTES MIENTRAS LA PÁGINA SE RECARGA. GRACIAS');
        $('#aviso').fadeIn('fast');

        //enviarlo();

        criterio = $(lugarss).serialize();
        $.post(lugars, criterio, function (datos) {
            $('#aviso').html(datos);
            setTimeout("$('#aviso').fadeOut('slow')", 20000);
        });
        return false;
        //});
    }
    window.enviarlo = function () {
        for (ciclo = 1; ciclo < objetosT + 1; ciclo++) {//objetos
            disenoarmas0['cantproto2c'+ciclo].value = disenoarmas0['cantproto2'+ciclo].value;
            disenoarmas0['cantproto3c'+ciclo].value = disenoarmas0['cantproto3'+ciclo].value;

            disenoarmas0['cantproto2v'+ciclo].value = this['objS'+ciclo].value;
            disenoarmas0['cantproto3v'+ciclo].value = this['objS'+ciclo].value;

            disenoarmas0['cantproto2t'+ciclo].value = this['objV'+ciclo].value;
            disenoarmas0['cantproto3t'+ciclo].value = this['objV'+ciclo].value;
        }
    }
    window.gprior = function () {
        for(var i=1;i<18;i++)
            laprior['lprior'+i].value = disenoarmas0['prior'+i].value;
        laprior.submit();
    }
    window.botonrec0 = function (ciclico, dest, suma) { // exclusivo columna de recursos en origen
        dest2 = dest + 1;
        var carga = disenoarmas0['hay1r'+ciclico].value;
        carga = carga.replace(".", "");
        carga = carga.replace(".", ""); /// gi no funciona
        jQuery('#dest1rec'+ciclico).val(carga);
    }
    window.botonrec = function (ciclico, dest, suma) { /////// botones de carga //////////////////////////////////
        var cargalamuni = Math.round(disenoarmas0.municT.value);
        if (cargalamuni > municT) {
            disenoarmas0.municT.value = municT;
            cargalamuni = municT;
        }
        //suma de cargas actuales
        var mcargaT = 0;
        for (var ciclo = 1; ciclo < 18; ciclo++) {
            var asumar = disenoarmas0['dest'+dest+'rec'+ciclo].value;
            var pesorec = this['pesorec'+ciclo];
            mcargaT = mcargaT + asumar * pesorec;
        }
        var lqcabe = cdcargaT - mcargaT + cargalamuni;
        var esterec = this['FNCR'+ciclico];
        pesorec = this['pesorec'+ciclico];
        /// valores de los botones
        if (suma == 1) {
            var elmin = Math.min(esterec, lqcabe / pesorec);
            if (dest == 2) {
                elmin = lqcabe / pesorec;
            }
            if (elmin < 0) {
                elmin = 0
            }
            if (ciclico == 12) {
                elmin = FNCR12;
            }
            disenoarmas0['dest'+dest+'rec'+ciclico].value = Math.round (elmin);
        }
        if (suma == 0) {
            disenoarmas0['dest'+dest+'rec'+ciclico].value = 0;
        }
        if (suma == 2) { // lo que hay allÃ­
            var dest2 = dest + 1;
            var carga = disenoarmas0['hay'+dest+'r'+ciclico].value;
            carga = carga.replace(".", "");
            carga = carga.replace(".", ""); /// gi no funciona
            jQuery('#dest'+dest2+"rec"+ciclico).val(carga);
        }
        if (suma == -1) { // lo que queda para llenar el almacÃ©n
            var carga = disenoarmas0['hay'+dest+'r'+ciclico].value;
            carga = carga.replace(".", "");
            carga = carga.replace(".", ""); /// gi no funciona
            var alm = disenoarmas0['alm'+dest+'r'+ciclico].value;
            alm = alm.replace(".", "");
            alm = alm.replace(".", ""); /// gi no funciona
            if (alm == "?") {
                resto = 0;
            } else {
                resto = alm - carga;
            }
            jQuery('#dest'+dest+'rec'+ciclico).val(resto);
        }
        if (ciclico == 10 & suma == 0) {
            for (n = 1; n < cantienvios + 1; n++) {
                disenoarmas0['dest'+n+'rec10'].value=0;
            }
        }
        if (ciclico == 10) {
            //cargando municion
            var cargalamuni1=[0,0,0];
            cargalamuni1[0] = Math.round(Number(disenoarmas0.dest1rec10.value) + muniva);
            if (cantienvios > 1) {
                cargalamuni1[1] = Math.round(Number(disenoarmas0.dest2rec10.value) + muniviene);
            }
            if (cantienvios > 2) {
                cargalamuni1[2] = Math.round(Number(disenoarmas0.dest3rec10.value) + muniviene);
            }
            if (FNCR10 < (cargalamuni1[0] + cargalamuni)) {
                cargalamuni1[0] = FNCR10 - cargalamuni;
            }
            for (n = 1; n < cantienvios + 1; n++) {
                disenoarmas0['dest'+n+'rec10'].value = cargalamuni+((cargalamuni1[n-1]>cargalamuni)?(cargalamuni1[n-1]):0); //carga muni inicial
            }
        }
        actualizacargas();
        resumencargas();
    }
    window.actualizacargas = function () {
        for (ciclico = 1; ciclico < 18; ciclico++) {
            var esterec = this['FNCR'+ciclico];
            var asumar = disenoarmas0['dest1rec'+ciclico].value;
            disenoarmas0['srec'+ciclico].value = formatNumber(esterec-asumar);
        }
        //resumencargas ();
    }
    window.resumencargas = function () {
        // tabla de resumen de cargas
        var cargalamuni = Math.round(disenoarmas0.municT.value);
        for (var n = 1; n < cantienvios + 1; n++) {
            var cargaT = 0;
            for (ciclo = 1; ciclo < 18; ciclo++) {
                var pesorec = this['pesorec'+ciclo];
                var asumar = disenoarmas0['dest'+n+'rec'+ciclo].value;
                cargaT += asumar * pesorec;
            }
            if (cdcargaT < 0) {
                cdcargaT = 0
            }
            if (cargaT < 0) {
                cargaT = 0
            }
            var fcarga1 = formatNumber(cdcargaT);
            var lcarga1 = cdcargaT;
            var fcargaT1 = formatNumber(Math.round(cargaT - cargalamuni));
            disenoarmas0['rectot'+n].value= fcargaT1+' / '+fcarga1;

            if (cargaT > lcarga1 + cargalamuni) {
                disenoarmas0['rectot'+n].style.backgroundColor='#990000';
            } else {
                disenoarmas0['rectot'+n].style.backgroundColor='';
            }
        }
    }
    window.onchang = function (qpasa, ntoca) { //lo que se pide, el ndiseno

        defensaANT = defensaT;	 // defensa anterior, para saber si cambiamos naves
        combustd1 = 0;
        combustd2 = 0;
        cdcargaT = 0;
        cdcargaT = 0;
        velmaxT = 9999;
        combusT = 0;
        municT = 0;
        cazasT = 0;
        cazaschT = 0;
        hay0 = 0;
        ligerasT = 0;
        ligeraschT = 0;
        hay1 = 0;
        mediasT = 0;
        mediaschT = 0;
        hay2 = 0;
        pesadasT = 0;
        pesadaschT = 0;
        hay3 = 0;
        estacionT = 0;
        estacionchT = 0;
        hay5 = 0;
        defensaT = 0;
        ataqueT = 0;
        defensaTV = 0;
        ataqueTV = 0;
        cantidad = 0;

        for (ciclico = 0; ciclico < 8; ciclico++) {
            this['Vvar0'+ciclico] = 0;
            this['Vvar1'+ciclico] = 0;
            this['Vvar2'+ciclico] = 0;
            this['Vvar3'+ciclico] = 0;
            this['Vvar4'+ciclico] = 0;
        }
        // calcula para todas las naves
        for (c = 1; c < ntotnavesjava; c++) {
            var aflota = disenoarmas0['aflota'+naves[c][0]].value;
            var ahangar = disenoarmas0['ahangar'+naves[c][0]].value;

            aflota = Math.abs(Math.round(aflota));
            ahangar = Math.abs(Math.round(ahangar));

            var cant = aflota + ahangar;
            var cantidad = naves[c][1] - cant;

            this['hay'+naves[c][9]] += cant;

            if (anubis > 0 && naves[c][0] == 8 && aflota > 0){
                var velmaxT = Math.min(10, velmaxT);
            } else {  //excepcion anubis max=10
                var suvel = naves[c][5];
                var destino1 = disenoarmas0.destino1.value;
                var destino1p = disenoarmas0.destino1p.value;
                var origen = disenoarmas0.origen.value;
                var origenp = disenoarmas0.origenp2.value;

                if (origen == destino1 && origenp == destino1p && suvel < 1.5) {
                    suvel = 1.5;
                }
                // naves quimicas a la orbita
                if (aflota > 0) {
                    var velmaxT = Math.min(suvel, velmaxT);
                }
                combusT += naves[c][7] * aflota;
            }

            cdcargaT += naves[c][6] * cant;
            municT += naves[c][8] * cant;

            if (naves[c][9] == 0) {
                cazasT += ahangar;
            }
            else if (naves[c][9] == 1) {
                ligerasT += ahangar;
            }
            else if (naves[c][9] == 2) {
                mediasT += ahangar;
            }
            else if (naves[c][9] == 3) {
                pesadasT += ahangar;
            }
            else if (naves[c][9] == 5) {
                estacionT += ahangar;
            }

            if (cant > 0) {
                cazaschT += naves[c][10] * cant;
                ligeraschT += naves[c][11] * cant;
                mediaschT += naves[c][12] * cant;
                pesadaschT += naves[c][13] * cant;
                estacionchT += naves[c][16] * cant;
                ataqueT += naves[c][14] * cant;
                ataqueTV += naves[c][14] * aflota;
                defensaT += naves[c][15] * cant;
                defensaTV += naves[c][15] * aflota;

                for (ciclico = 0; ciclico < 8; ciclico++) {
                    this['Vvar0'+ciclico]+=this['V'+naves[c][0]+'var0'+ciclico]*cant;
                    this['Vvar1'+ciclico]+=this['V'+naves[c][0]+'var1'+ciclico]*cant;
                    this['Vvar2'+ciclico]+=this['V'+naves[c][0]+'var2'+ciclico]*cant;
                    this['Vvar3'+ciclico]+=this['V'+naves[c][0]+'var3'+ciclico]*cant;
                    this['Vvar4'+ciclico]+=this['V'+naves[c][0]+'var4'+ciclico]*cant;
                }
            }
            disenoarmas0['cant'+c].value = formatNumber(cantidad);
            // coloreando
            celda1 = document.getElementById('filaA' + naves[c][0]);
            celda2 = document.getElementById('filaB' + naves[c][0]);
            celda3 = document.getElementById('filaC' + naves[c][0]);
            celda4 = document.getElementById('filaD' + naves[c][0]);

            if (cant == naves[c][1]) {
                celda1.style.color = "Yellow";
                celda2.style.color = "Yellow";
                celda3.style.color = "Yellow";
                celda4.style.color = "Yellow";
            }
            else if (cant == 0) {
                celda1.style.color = "#999999";
                celda2.style.color = "#999999";
                celda3.style.color = "#999999";
                celda4.style.color = "#999999";
            }
            else if (cant > naves[c][1]) {
                celda1.style.color = "#F00";
                celda2.style.color = "#F00";
                celda3.style.color = "#F00";
                celda4.style.color = "#F00";
            }
            else {
                celda1.style.color = "#FF9";
                celda2.style.color = "#FF9";
                celda3.style.color = "#FF9";
                celda4.style.color = "#FF9";
            }
            //}  // for cada nave
        }//fin del if se ha cambiado una nave
        if (velmaxT == 9999) {
            velmaxT = 0
        }
        //totales
        disenoarmas0.cargatot.value = formatNumber(cdcargaT);
        disenoarmas0.velmaxT.value = formatNumber(velmaxT);
        disenoarmas0.combusT.value = formatNumber(combusT);
        disenoarmas0.municT.value = (municT);
        disenoarmas0.cazasT.value = formatNumber(cazasT);
        disenoarmas0.ligerasT.value = formatNumber(ligerasT);
        disenoarmas0.mediasT.value = formatNumber(mediasT);
        disenoarmas0.cazaschT.value = formatNumber(cazaschT);
        disenoarmas0.ligeraschT.value = formatNumber(ligeraschT);
        disenoarmas0.mediaschT.value = formatNumber(mediaschT);
        disenoarmas0.pesadasT.value = formatNumber(pesadasT);
        disenoarmas0.pesadaschT.value = formatNumber(pesadaschT);
        disenoarmas0.estacionT.value = formatNumber(estacionT);
        disenoarmas0.estacionchT.value = formatNumber(estacionchT);
        disenoarmas0.hay0.value = formatNumber(hay0);
        disenoarmas0.hay1.value = formatNumber(hay1);
        disenoarmas0.hay2.value = formatNumber(hay2);
        disenoarmas0.hay3.value = formatNumber(hay3);
        disenoarmas0.hay5.value = formatNumber(hay5);
        /// a cada destino
        for (n = 1; n < cantienvios + 1; n++) {
            this['velporc' + n] = disenoarmas0['velporc'+n].value;//%de vel
            velporc=this['velporc'+n];

            if (!velporc) {
                velporc = 1;
            } else if (velporc > 100) {
                velporc = 100;
            }else if (velporc < 1) {
                velporc = 1;
            }
            velo = (Math.floor(velporc * velmaxT)) / 100;
            disenoarmas0['veltrans'+n].value= formatNumber(velo);
            this['velo'+n] = velo;
        }
        // DISTANCIAS
        var destino1 = disenoarmas0.destino1.value;
        var destino1pr = disenoarmas0.destino1p.value;
        Ndestino1 = disenoarmas0.Ndestino1.value;
        alcanzo = 2; //si alcanzo el objetivo
        if (destino1 > 0) {
            if (destino1 < limlargouni) {//destino1 es un planeta
                // planetaria
                flotame = 0;
                distp = (((Math.pow(2, destino1pr - 3)) + 4) * 15) - (((Math.pow(2, origenp - 3)) + 4) * 15);
                distp = Math.abs(distp / .3); //segluz

                var destino1y = Math.floor(destino1 / anchouniverso);
                var destino1x = Math.floor(-destino1 + (destino1y * anchouniverso));
                destino1x = Math.abs(destino1x * luzdemallauniverso);
                destino1y = Math.abs(destino1y * luzdemallauniverso);
            }
            else {//es flota
                flotame = 1;
                distp = 0;
                destino1x = 1;
                destino1y = 1;
            }//fin de else es un planeta

            origenx = Math.abs(origenx);
            origeny = Math.abs(origeny);
            desx = destino1x; //por poner un valor
            desy = destino1y;

            if (flotame > 0 & velo > 0) { //es intercepcion AJX **********************************************************************
                ijava(origenx, origeny, destino1, velo);
            }
            //estelar
            destino1x = desx;
            destino1y = desy;
            distancia1 = Math.sqrt(((destino1x - origenx) * (destino1x - origenx)) + ((destino1y - origeny) * (destino1y - origeny)));
            distancia1 = Math.floor(distancia1);
            destino1p = destino1pr;
            distp = (((Math.pow(2, destino1p - 3)) + 4) * 15) - (((Math.pow(2, origenp - 3)) + 4) * 15);
            distp = Math.abs(distp / .3); //segluz
            distancia = distancia1 + distp;
            if (distancia < 10) {
                distancia = 10
            }
            var velk = (Math.floor(velporc1 * velmaxT)) / 100;
            veloX = velk;
            velock = veloX / 2;
            if (distancia < 100000) {
                valveW = .00001;
            } else {
                valveW = .5;
            }
            tllegada = (1 / 1) * Math.pow((distancia / (valveW * velock * velock)), .5);
            var horas = Math.floor(tllegada / 3600)
            var minutos = Math.floor((tllegada - (horas * 3600)) / 60);
            var segundos = Math.round(tllegada - (horas * 3600 + minutos * 60));
            tllegada1 = horas + " h " + minutos + " m " + segundos + " s";
            if (velo1 > 0) {
                disenoarmas0.tllegada1.value = (tllegada1);
            }
            //gasto de cm  POTENCIA(factorcm;1+(TIEMPO * VEL * $proporccm/divisorcm))*GASTOCM* compensadorcm
            combustd1 = Math.pow(factorcm, (velmaxT * proporccm * factorcm * .0004 * velporc1)) * combusT * compensadorcm * .001 * tllegada;
            combustd1 = Math.round(combustd1);
            distanciaksl = Math.round(distancia / 1000);
            if (combustd1 < 99999999 || tllegada1 < 1000 * 3600) {
                disenoarmas0.combustd1.value = formatNumber(combustd1);
                disenoarmas0.dist1.value = formatNumber(distanciaksl);
            }
            else {
                disenoarmas0.combustd1.value = "-";
                disenoarmas0.dist1.value = "-";
                disenoarmas0.tllegada1.value = "-";
            }
        }//fin dest1>0
        /// para ddestino 2 y sucesivos que no pueden ser flotas
        for(var n = 2; n < 2 + 1; n++) {
            var m = n - 1;
            var destinoB = disenoarmas0['destino'+n].value;
            var destinoBp = disenoarmas0['destino'+n+'p'].value;
            var destinoA = disenoarmas0['destino'+m].value;
            var destinoAp = disenoarmas0['destino'+m+'p'].value;
            veloB = this['velo'+n];
            velporc = this['velporc'+n];
            var M = n + 1;

            if (1 * 1 > .5) {
                var miselec = disenoarmas0['select'+M].value; //mi mision
            } else {
                var miselec = 3;
            }
            if (miselec > 0) {
                destinoAx = this['destino'+m+'x'];
                destinoAy = this['destino'+m+'y'];
                // planetaria
                distp = (((Math.pow(2, destinoBp - 3)) + 4) * 15) - (((Math.pow(2, destinoAp - 3)) + 4) * 15);
                distp = Math.abs(distp / .3); //segluz
                //estelar
                if (destinoB < limlargouni) {//destino2 es un planeta
                    var destinoBy = Math.floor(destinoB / anchouniverso);
                    var destinoBx = Math.floor(-destinoB + (destinoBy * anchouniverso));
                    destinoBx = Math.abs(destinoBx * luzdemallauniverso);
                    destinoBy = Math.abs(destinoBy * luzdemallauniverso);
                } else {
                    origenx = destinoAx;
                    origeny = destinoAy;
                    destino1 = destinoB;
                    ijava(origenx, origeny, destino1, velo);
                    destinoBx = desx;
                    destinoBy = desy;
                }
                distanciaB = Math.sqrt(((destinoBx - destinoAx) * (destinoBx - destinoAx)) + ((destinoBy - destinoAy) * (destinoBy - destinoAy)));
                distanciaB = Math.floor(distanciaB);
                distancia = distanciaB + distp;

                if (distancia < 10) {
                    distancia = 10
                }
                veloX = veloB;
                velock = veloX / 2;

                if (distancia < 100000) {
                    valveW = .00001;
                } else {
                    valveW = .5;
                }

                tllegada = (1 / 1) * Math.pow((distancia / (valveW * velock * velock)), .5);
                var horas = Math.floor(tllegada / 3600)
                var minutos = Math.floor((tllegada - (horas * 3600)) / 60);
                var segundos = Math.round(tllegada - (horas * 3600 + minutos * 60));
                var tllegadaF = horas + " h " + minutos + " m " + segundos + " s";

                if (veloB > 0) {
                } else {
                    tllegadaF = "-";
                }

                disenoarmas0['tllegada'+n].value = tllegadaF;
                combustd = Math.pow(factorcm, (velmaxT * proporccm * factorcm * .0004 * velporc)) * combusT * compensadorcm * .001 * tllegada;
                combustd = Math.round(combustd);
                distanciaks = Math.round(distancia / 1000);

                if (combustd < 99999999 || tllegada < 1000 * 3600) {
                } else {
                    combustd = "-";
                    distanciaks = "-";
                }

                disenoarmas0['combustd'+n].value = formatNumber (combustd);
                disenoarmas0['dist'+n].value = formatNumber (distanciaks);
                this['destino'+n+'x']=destinoBx;
                this['destino'+n+'y']=destinoBy;
            }//fin dest>0
            else {
                disenoarmas0['combustd'+n].value = '-';
                disenoarmas0['dist'+n].value = '-';
            }
        }
        // fin while cada destino
        if (alcanzo < 1) {
            disenoarmas0.tllegada1.value = "No llega";
            disenoarmas0.tllegada2.value = "No llega";
            disenoarmas0.dist1.value = "-";
            disenoarmas0.combustd1.value = "-";
            disenoarmas0.dist2.value = "-";
            disenoarmas0.combustd2.value = "-";
        }
        //SACANDO LA TABLA DE DAÃOS*************
        //valor de base
        for (ciclico = 0; ciclico < 8; ciclico++) {
            var Vvar = this['Vvar0'+ciclico];
            $('#var0' + ciclico).html(formatNumber(Vvar));
            Vvar = this['Vvar1'+ciclico];
            $('#var1' + ciclico).html(formatNumber(Vvar));
            Vvar = this['Vvar2'+ciclico];
            $('#var2' + ciclico).html(formatNumber(Vvar));
            Vvar = this['Vvar3'+ciclico];
            $('#var3' + ciclico).html(formatNumber(Vvar));
            Vvar = this['Vvar4'+ciclico];
            $('#var4' + ciclico).html(formatNumber(Vvar));
        }
        //
        //ataque total
        ataqueTm = formatNumber(ataqueT) + " / " + formatNumber(defensaT);
        disenoarmas0.atadefT.value = ataqueTm;
        ataqueTVm = formatNumber(ataqueTV) + " / " + formatNumber(defensaTV);
        disenoarmas0.atadefTV.value = ataqueTVm;
        //la municion
        if (disenoarmas0.municT.value > municT) {
            disenoarmas0.municT.value = municT;
        }
        if (defensaANT == defensaT) {
        } else {
            botonrec(10, 1, 0)
        }
        //se pone la municion
        //color de las celdas de municion y velocidad
        if (municT > 512000) {
            disenoarmas0.municT.style.backgroundColor = "#990000";
        }
        else {
            disenoarmas0.municT.style.backgroundColor = '';
        }
        if (velmaxT < .5) {
            disenoarmas0.velmaxT.style.backgroundColor = "#990000";
        }
        else {
            disenoarmas0.velmaxT.style.backgroundColor = '';
        }
        combT = combustd1 + combustd2;
        for (n = 1; n < cantienvios + 1; n++) {
            if (combT > 102406) {
                disenoarmas0['combustd'+n].style.backgroundColor='#990000';
            } else {
                disenoarmas0['combustd'+n].style.backgroundColor='';
            }
        }
        //Color de las celdas de hangar si te pasas
        if (cazasT > cazaschT) {
            disenoarmas0.cazasT.style.backgroundColor = "#990000";
        }
        else {
            disenoarmas0.cazasT.style.backgroundColor = '';
        }
        if (ligerasT > ligeraschT) {
            disenoarmas0.ligerasT.style.backgroundColor = "#990000";
        }
        else {
            disenoarmas0.ligerasT.style.backgroundColor = '';
        }
        if (mediasT > mediaschT) {
            disenoarmas0.mediasT.style.backgroundColor = "#990000";
        }
        else {
            disenoarmas0.mediasT.style.backgroundColor = '';
        }
        if (pesadasT > pesadaschT) {
            disenoarmas0.pesadasT.style.backgroundColor = "#990000";
        }
        else {
            disenoarmas0.pesadasT.style.backgroundColor = '';
        }
        if (estacionT > estacionchT) {
            disenoarmas0.estacionT.style.backgroundColor = "#990000";
        }
        else {
            disenoarmas0.estacionT.style.backgroundColor = '';
        }
        resumencargas(); //poniendo las cargas totales
    }
    window.lfavoritosp = function (n, d){ //lista de planetas y su imagen, actualizacion al poner destino
        $('#Ndestino'+d).css({color:'',background:''});
        var coor = n.split(".");
        var a = coor[0] * 1;
        var b = coor[1] * 1;
        var N = coor[37];
        var dueno = coor[39];
        jQuery('#Ndestino' + d).val(N);
        jQuery('#destino' + d).val(a);
        jQuery('#destino'+d+'p').val(b);
        jQuery('#destino'+d+'d').val(dueno);
        var nimagen = coor[2] * 1;
        var imagen = '<img src="skin0/mapa/sistema/planeta' + nimagen + '.png"  width="100%" height="100%">';
        jQuery('#fdest'+d).html(imagen);
        // poniendo los recursos de los destinos
        for(var i = 1; i < 18; ++i) {
            k = i + 2;
            var carga = coor[k] * 1;
            if (carga == -2) {
                carga = "?";
            }else {
                carga = formatNumber(coor[k] * 1);
            }
            r = i + 19;
            var alm = coor[r] * 1;
            if (alm == -1) {
                alm = "Infinito";
            }else if (alm == -2) {
                alm = "?";
            }else {
                alm = "" + formatNumber(alm) + "";
            }
            jQuery('#hay'+d+'r'+i).val(carga);
            jQuery('#alm'+d+'r'+i).val(alm);
        }
        onchang(1, 0)
    }
    window.lmision = function () { // cambia destino 2 segun el 1   autoelige mision
        var select2 = disenoarmas0.select2.value;
        var select3 = disenoarmas0.select3.value;
        if (select2 == 9) {
            disenoarmas0.select3.value = 0;
        }else if (select2 == 4 || select2 == 5 || select2 == 6 || select2 == 7) {
            disenoarmas0.select3.value = 0;
        }else if (select2 == 10) {
            disenoarmas0.destino1d.value = "";
        }else if (select3 == 0) {
            imagen = '<img src="skin0/colores/nada.png">';
            jQuery('#fdest2').html(imagen);
            disenoarmas0.Ndestino2.value = "";
        }
        if (0 > 0) {
            premiun = 1;
            var select4 = disenoarmas0.select4.value;
            if (select3 == 0) {
                disenoarmas0.select4.value = 0;
            }else if (select3 == 9) {
                disenoarmas0.select4.value = 0;
            }else if (select3 == 4 || select3 == 5 || select3 == 6 || select3 == 7) {
                disenoarmas0.select4.value = 0;
            }else if (select3 == 10) {
                disenoarmas0.destino2d.value = "";
            }else if (select4 == 0) {
                imagen = '<img src="skin0/colores/nada.png">';
                jQuery('#fdest3').html(imagen);
                disenoarmas0.Ndestino3.value = "";
            }
        }
    }
    window.todo = function () {
        for (c = 1; c < ntotnavesjava; c++) {
            if (naves[c][3] == 0 && naves[c][4] == 0) {//modo inteligente
                if (naves[c][5] < .5) {
                    disenoarmas0['ahangar'+naves[c][0]].value = naves[c][1];
                }
                else {
                    disenoarmas0['aflota'+naves[c][0]].value = naves[c][1];
                }
            }
            else {
                disenoarmas0['aflota'+naves[c][0]].value = naves[c][3];
                disenoarmas0['ahangar'+naves[c][0]].value = naves[c][4];
            }
        }
        onchang(0, 0);
    }
    window.nada = function (dnd) {
        if (dnd == 1) {
            for (var c = 1; c < ntotnavesjava; c++) {
                disenoarmas0['aflota'+naves[c][0]].value = 0;
            }
        }else if (dnd == 2) {
            for (var c = 1; c < ntotnavesjava; c++) {
                disenoarmas0['ahangar'+naves[c][0]].value = 0;
            }
        }
        onchang(0, 0);
    }
    window.fase = function (f) {
        $("#fase1").css("display", "none");
        $("#fase2").css("display", "none");
        $("#fase3").css("display", "none");
        $("#fase4").css("display", "none");
        $("#slec1").attr("class", "azul txt-med");
        $("#slec2").attr("class", "azul txt-med");
        $("#slec3").attr("class", "azul txt-med");
        $("#slec4").attr("class", "azul txt-med");
        $('#fase'+f).css('display', 'block');
        $('#slec'+f).attr('class', 'resplandor-blanco txt-med');
        if (f == 2) {
            onchang(0, 0);
        }
        //actualiza
        ajustame(); // ajusta el tamaÃ±o de la ventana
    }
    window.ijava = function (lorigenx, lorigeny, destino1, velo1) {
        var criterio = "lorigenx=" + lorigenx + "&nomandamejava=1&lorigeny=" + lorigeny + "&floaobj=" + destino1 + "&mivel=" + velo1 + "";  //criterio inicial
        $.ajax({
            url: 'enflota15.php',
            update: 'Layer3',
            type: 'POST',
            data: criterio,
            async: false,
            success: function (datos) {
                datoviene = datos.split(",");
                $('#Layer3').html(datos); //layer3 , el 4 para pruebas
                desx = datoviene[0];
                desy = datoviene[1];
                alcanzo = datoviene[2];
                destino1pr = datoviene[3];
            }
        });
    }
    window.busca = function (dnd) { // rellena user id
        var me=disenoarmas0['ndest'+dnd+'d'].value;
        for (i = 1; i < matrizid.length; ++i) {
            if (matriznick[i] == me) {
                break;
            }
            if (i == matrizid.length - 1) {
                $('#ndest'+dnd+'d').css({ color: '#FFFFFF', background: '#F00' });
            } else {
                $('#ndest'+dnd+'d').css({ color: '', background: '' });
            }
        }
        disenoarmas0['destino'+dnd+'d'].value=" + matrizid[i] + ";
    }
    window.buscaplaneta = function (dnd) {
        busca(dnd); //rellena id y resto de datos tras elegir el jugador
        var soy = disenoarmas0['destino'+dnd+'d'].value;
        var criterio = "soy=" + soy;  //criterio inicial
        var loption;
        $.ajax({
            url: 'enflota24.php',
            update: 'Layer3',
            type: 'POST',
            data: criterio,
            async: false,
            success: function (datosl) {
                var datolimsql = datosl.split(",");
                $('#Layer3').html(datosl); //layer3 , el 4 para pruebas
                loption = datolimsql[0];
            }
        });
        jQuery('#nuestrosd'+dnd).html(loption);
        for (i = 1; i < 18; ++i) {
            jQuery('#hay'+dnd+'r'+i).val(' ');
        }
    }
    window.locasitio = function (dnd) {   // busca destino x nombre
        var nomine = disenoarmas0['Ndestino'+dnd].value;

        if (isNaN(nomine) || 1 * nomine > 999999) { //es un texto
            var criterio = "nombre="+nomine;  //criterio inicial
            var nsis,npla,nimagen,sudueno,sunick;
            $.ajax({
                url: 'enflota26.php',
                update: 'Layer3',
                type: 'POST',
                data: criterio,
                async: false,
                success: function (datos) {
                    var datoviene = datos.split(",");
                    $('#Layer3').html(datos); //layer3 , el 4 para pruebas
                    nsis = datoviene[0];
                    npla = datoviene[1];
                    nimagen = datoviene[2];
                    sudueno = datoviene[3];
                    sunick = datoviene[4];
                }
            });

            disenoarmas0['destino'+dnd].value = nsis;
            disenoarmas0['destino'+dnd+'p'].value = npla;
            imagen = '<img src="skin0/mapa/sistema/planeta' + nimagen + '.png"  width="100%" height="100%">';
            jQuery('#fdest'+dnd).html(imagen);
            disenoarmas0['ndest'+dnd+'d'].value = sunick;
            disenoarmas0['destino'+dnd+'d'].value = sudueno;

            if (nimagen == 0) {
                $('#Ndestino'+dnd).css({color:'#FFFFFF',background:'#F00'});
            } else {
                $('#Ndestino'+dnd).css({color:'',background:''});
            }
            onchang(1, 0);
        } else {
            $('#Ndestino'+dnd).css({color:'',background:''});
        } //es un numero
    }
    window.fotoplanet = function (dnd) {
        var nomine=disenoarmas0['Ndestino'+dnd].value;
        if (isNaN(nomine)) {
        } else {// busca el dibujo del planeta si metemos coordenadas
            var norbita = disenoarmas0['destino'+dnd+'p'].value;
            var criterio = "nestrella=" + nomine + "&norbita=" + norbita + "";  //criterio inicial
            var nsis,npla,nimagen,sudueno,sunick;
            $.ajax({
                url: 'enflota27.php',
                update: 'Layer3',
                type: 'POST',
                data: criterio,
                async: false,
                success: function (datosp) {
                    var datovienep = datosp.split(",");
                    $('#Layer3').html(datosp); //layer3 , el 4 para pruebas
                    nsis = datovienep[0];
                    npla = datovienep[1];
                    nimagen = datovienep[2];
                    sudueno = datovienep[3];
                    sunick = datovienep[4];
                }
            });
            var imagen = '<img src="skin0/mapa/sistema/planeta' + nimagen + '.png"  width="100%" height="100%">';
            jQuery('#fdest'+dnd).html(imagen);
            disenoarmas0['ndest'+dnd+'d'].value = sunick;
            disenoarmas0['destino'+dnd+'d'].value = sudueno;
        }
    }
    window.actayuda = function () { //activa ayuda emergente
        if(activaayuda < 1){
            activaayuda = 1;
            $('#bayuda').val("Ayuda ON");
            ayudactx(1, 2);
        }else{
            activaayuda = 0;
            $('#bayuda').val("Ayuda OFF");
        }
    }
    window.ayudactx = function (asomo, lq) {  ///ayuda contextual
        if (asomo > 0 && activaayuda > 0) {
            ix = valorX;
            iy = valorY + 10;
            if (ix + 100 > 670) {
                ix = valorX - 110
            }
            if (iy + 100 > 780) {
                iy = valorY - 110
            }

            var info = this['tyflota'+lq];
            var alto = info.length;
            alto = ((alto / 20) + 1) * 10;

            $('#ayudat').css("width", 115);
            $('#ayudat').css("height", alto);
            $("#ayudat").css("top", iy);
            $("#ayudat").css("left", ix);
            $('#ayudat').html(info);
            $('#ayudat').css('display', 'block');
        } else {
            $('#ayudat').css("display", "none");
        }
    }
    window.infop = function (objV, objD) {  // info de un proto
        var criterio,lugars,noesarma;
        if (objV < 29) {//es invest
            lugars = 'construccion/armas4.php';
            noesarma = 1;
            criterio = "numinvest=" + objV + "&lnivel=" + objD + "&noesarma=" + noesarma + "";  //criterio inicial
        }else if (objV > 30) {//es arma
            lugars = 'construccion/armas4.php';
            noesarma = 0;
            criterio = "Narma=" + objV + "&lnivel=" + objD + "&noesarma=" + noesarma + "";  //criterio inicial
        }else if (objV == 29) {//es nave
            lugars = 'construccion/armas3.php';
            noesarma = 3;
            criterio = "Narma=" + objV + "&ndiseno=" + objD + "&noesarma=" + noesarma + "";  //criterio inicial
        }
        var vy = valorY - 250;
        if (vy < 1) {
            vy = 0;
        }
        $('#aviso').css("height", 250);
        $('#aviso').css("width", 640);
        $("#aviso").css("top", vy);
        $('#aviso').html('POR FAVOR, ESPERE UNOS INSTANTES MIENTRAS LA Pï¿½GINA SE RECARGA. GRACIAS');
        $('#aviso').fadeIn('fast');
        $.ajax({
            url: lugars,
            update: 'Layer3',
            type: 'POST',
            data: criterio,
            async: false,
            success: function (datos) {
                $('#aviso').html(datos);
                setTimeout("$('#aviso').fadeOut('slow')", 20000);
            }
        });
    }
    //$(document).ready(function () {
    window.docready = function(){
        $(document).mousemove(function (e) {
            //$('#mensajet').html(e.pageX +', '+ e.pageY);
            valorY = e.pageY;
            valorX = e.pageX;
        });
        var matriznick;// = new Array(' ', 0, 'abandonado', 'admin', 'ccomercio', 'piratas', 'odin_spain', 'mcfitus', 'mc guten', 'ace', 'vcode', 'phoenix', 'luzbel', 'daragones', 'centella', 'mega', 'tranki', 'fluzo', 'loki', 'itupe', 'mefisto', 'kasumi', 'dagoth', 'zolux', 'teryka', 'elkan', 'matacabr', 'edassgon', 'montado', 'corsario', 'max', 'godfavor', 'ch3ma', 'aqio', 'sire', 'cape', 'trompi', 'loih kar', 'vicedo1', 'shogun', 'thor', 'bo', 'dirichlet', 'scipio', 'aleph', 'dls', 'armin', 'data', 'uka', 'murana', 'danesas6', 'karima', 'paabajo', 'peter60', 'nasbor', 'nem', 'npi', 'cnd', 'ac', 'drt2', 'cops', 'sf', 'val', 'miac', 'galufa', 'rep', 'saq', 'parapuen', 'ae', 'os', 'valandil', 'sixper', 'neo', 'ed', 'arieluto', 'kkk', 'aaa', 'guyver', 'xd', 'zzz', 'cor', 'yurineo', 'arc', 'diabloii', 'dan30', 'scio', 'aganord', 'revoluty', 'cyt', 'wis', 'pkn', 'bc', 'fibax', 'pas', '5dim', 'contack', 'pp', '()', 'oh', 'txidonky', 'djx', 'fist', 'nival', 'sorkilin', 'cartman', 'onu', 'cm', 'ct', 'bsg', 'mira', 'zqt', '/(-)\\', 'spawn12', 'olimpus', 'au', 'mbr', 'hejegoca', 'cz', 'p - 1', 'nmd', 'luismips', 'ehmola', 'arale', 'rgb', 'mml', 'da', 'elamanse', 'cesare', 'melapela', 'fxcarlos', 'aburrido', 'b.nova', 'iskander', 'cl', 'mdr', 'yorman', 'rs', 'diogenes', 'undefined');
        $('#ndest1d').autocomplete({
            source: matriznick,
            minLength: 2,
            close: function () {
                buscaplaneta(1)
            }
        });
        $('#ndest2d').autocomplete({
            source: matriznick,
            minLength: 2,
            close: function () {
                buscaplaneta(2)
            }
        })
        /// al quitar el foco
        for (n = 1; n < cantienvios + 1; n++) {
            $('#Ndestino'+n).blur(function(){locasitio(n);});
        }
        for (n = 1; n < 12; n++) {
            $('#dest1rec'+n).blur(function(){actualizacargas();resumencargas();});
            $('#dest2rec'+n).blur(function(){actualizacargas();resumencargas();});
        }
        /// localiza destino
        for (n = 1; n < cantienvios + 1; n++) {
            $('#destino'+n+'p').blur(function(){fotoplanet(n);});
        }
        //})
    }
}
var elem=document.scripts[document.scripts.length-1];
elem.parentNode.removeChild(elem);
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);