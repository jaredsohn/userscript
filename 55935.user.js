// ==UserScript==
                // @name           Dashboard Script Nettby
                // @namespace      Script Dash
                // @include        http://www.nettby.no*
                // @description    Logg byttes ut med dashboard.
                // @version        v1
                // ==/UserScript==

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
<script type="text/javascript">
$( function(){
	$("#logg").attr("href","http://www.nettby.no/user/action_log.php")
});
</script>
</head>
<body>
<a href="http://www.nettby.no/user/action_log.php" id="dashboard">Dashboard</a>
</body>
</html>