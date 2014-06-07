// CONTROL PANEL
        // version 0.1
        // Para greasemonkey
        // --------------------------------------------------------------------
        //
        // ==UserScript==
        // @name          CV-5
        // @description   TUNEO DEL PANEL DE CONTROL DEL MODERADOR DE EOL
        // @include       http://www.*elotrolado.net/mcp*
        //.php?i=138*
        // ==/UserScript==




        // DESTACAR REPORTES DE MODERADORES
        var allhits, onehit;

        var xx = document.getElementById("logout_cuadrologin");


        //TRATAMIENTO SOLO PARA REPORTES DE LOS QUE UNO ES MODERADOR. EN ESTE CASO CV.
        //MODIFICAR SEGUN QUIERA USARSE

        if (xx.innerHTML.match(/.*ZeusII.*/)
        || xx.innerHTML.match(/.*da_hot_funk.*/)
        || xx.innerHTML.match(/.*Enanon.*/)
        || xx.innerHTML.match(/.*[erick].*/)
        || xx.innerHTML.match(/.*fearandir.*/)
        || xx.innerHTML.match(/.*apmomp.*/)
        || xx.innerHTML.match(/.*cloudy.*/))

        {


        //------------------------------------------------------------------------------------------------------------------------------------------------------------------



        allhits = document.evaluate(

        // AÑADE O SUSTITUYE AL FINAL DE ESTA LINEA LOS NICKS DE LA GENTE QUE REPORTA QUE QUIERES DESTACAR.
        // INCLUIDOS: ZeusII, da_hot_funk, Enanon, [erick], fearandir, apmomp, cloudy

        "/html/body[@id='phpbb']/div[@id='wrap']/div[@id='rightcontent']/div[@id='page-body']/div[2]/div/div/div[@id='cp-main']/form[@id='mcp']/div/div/ul[3]/li/dl/dd[1]/span[contains(a[1],'ZeusII')] \
        |/html/body[@id='phpbb']/div[@id='wrap']/div[@id='rightcontent']/div[@id='page-body']/div[2]/div/div/div[@id='cp-main']/form[@id='mcp']/div/div/ul[3]/li/dl/dd[1]/span[contains(a[1],'da_hot_funk')] \
        |/html/body[@id='phpbb']/div[@id='wrap']/div[@id='rightcontent']/div[@id='page-body']/div[2]/div/div/div[@id='cp-main']/form[@id='mcp']/div/div/ul[3]/li/dl/dd[1]/span[contains(a[1],'Enanon')] \
        |/html/body[@id='phpbb']/div[@id='wrap']/div[@id='rightcontent']/div[@id='page-body']/div[2]/div/div/div[@id='cp-main']/form[@id='mcp']/div/div/ul[3]/li/dl/dd[1]/span[contains(a[1],'[erick]')] \
        |/html/body[@id='phpbb']/div[@id='wrap']/div[@id='rightcontent']/div[@id='page-body']/div[2]/div/div/div[@id='cp-main']/form[@id='mcp']/div/div/ul[3]/li/dl/dd[1]/span[contains(a[1],'fearandir')] \
        |/html/body[@id='phpbb']/div[@id='wrap']/div[@id='rightcontent']/div[@id='page-body']/div[2]/div/div/div[@id='cp-main']/form[@id='mcp']/div/div/ul[3]/li/dl/dd[1]/span[contains(a[1],'apmomp')] \
        |/html/body[@id='phpbb']/div[@id='wrap']/div[@id='rightcontent']/div[@id='page-body']/div[2]/div/div/div[@id='cp-main']/form[@id='mcp']/div/div/ul[3]/li/dl/dd[1]/span[contains(a[1],'cloudy')] \
        ",                   
        document,                                                                           

        null,

        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

        null);




        for (var i = 0; i < allhits.snapshotLength; i++)


        {

        onehit = allhits.snapshotItem(i);


        if (onehit.innerHTML.match(/.*fearandir.*/) )
        {
        onehit.setAttribute("style", "background-color:#E9B457;");  
        }

        else if (onehit.innerHTML.match(/.*ZeusII.*/) )
        {
        onehit.setAttribute("style", "background-color:#E86A56;"); 
        }
        else if (onehit.innerHTML.match(/.*da_hot_funk.*/) )
        {
        onehit.setAttribute("style", "background-color:#56DAE8;"); 
        }
        else if (onehit.innerHTML.match(/.*Enanon.*/) )
        {
        onehit.setAttribute("style", "background-color:#6198DF;"); 
        }
        else if (onehit.innerHTML.match(/.*[erick].*/) )
        {
        onehit.setAttribute("style", "background-color:#E856DF;"); 
        }
        else if (onehit.innerHTML.match(/.*apmomp.*/) )
        {
        onehit.setAttribute("style", "background-color:#A7AFAD;"); 
        }
        else if (onehit.innerHTML.match(/.*cloudy.*/) )
        {
        onehit.setAttribute("style", "background-color:#D7DF61;"); 
        }
        else
        {

        break;

        }

        }


        }
