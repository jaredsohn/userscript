            // ==UserScript==
            // @name           CV-3
            // @namespace      CV-3
            // @description    ACCESO DIRECTO A PANEL DE CONTROL
            // @include       http://www.*elotrolado.net*
            // ==/UserScript==




            var ubicaenlace, ubicaenlace2;



            //------------------------------------------------------------------------------------------------------------------------------------------------------------------



            ubicaenlace = document.evaluate(

            "/html/body[@id='phpbb']/div[@id='wrap']/div[1]/div[@id='search-box']/form[@id='search']/fieldset",

            document,                                                                           

            null,

            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

            null);

            for (var j = 0; j < ubicaenlace.snapshotLength; j++)


            {

            ubicaenlace2 = ubicaenlace.snapshotItem(j);


            enlace = document.createElement('a');
            enlace.style.color = 'white';
            enlace.style.margin = "20px";
            enlace.setAttribute("href", 'http://www.elotrolado.net/mcp.php');
            enlace.setAttribute("target", '_blank');
            enlace.innerHTML = '[ Panel de control de moderador ]';
            ubicaenlace2.appendChild(enlace);



            }
