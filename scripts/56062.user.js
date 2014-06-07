// ==UserScript==
// @name           Better Rhapsody Just Added
// @namespace      www.rhapsody.com
// @description    Eliminates releases from genres and artists that don't interest me
// @include        http://www.rhapsody.com/justadded*
// @version        0.2.118
// ==/UserScript==
var pgm_version="0.2.118";

// based on ideas gleaned from rhapsody_artist_linker.user.js by Leo Dirac

// numeric list of genres I'm excluding (just for documentation of the numbers in the regex below)
// g.1=Roots
// g.4=Oldies
// g.6=20th/21st Century
// g.7=Romantic
// g.8=Southern Rock
// g.9=Cool/West Coast Jazz
// g.12=Japan
// g.17=Vocal
// g.18=Comedy
// g.19=Stand-Up Comedy
// g.21=Classical
// g.22=Afro-Cuban Jazz
// g.23=Traditional Jazz/Dixieland
// g.24=Vocal Jazz
// g.27=Alt Country
// g.28=Ska Revival
// g.32=Lo-Fi
// g.34=Latin &amp; World Jazz
// g.35=Soul Jazz
// g.36=Funk
// g.38=Indie Rap/Hip-Hop
// g.40=Cabaret
// g.41=Good Old Days
// g.42=Classic Rock
// g.43=British Invasion
// g.44=Art & Progressive Rock
// g.45=Blues & Boogie Rock
// g.47=Pub Rock
// g.48=Opera
// g.49=Orchestra
// g.52=Avant Garde Jazz
// g.55=Jump Blues
// g.57=Soul
// g.58=Classic R&B
// g.59=Electro-Funk
// g.60=Retro Soul
// g.62=Bebop
// g.67=Pop Standards
// g.68=Vocal-Pop
// g.69=Vocal/Easy Listening
// g.70=Easy Pop
// g.73=Bollywood
// g.75=Christian/Gospel
// g.76=Country Blues
// g.77=Jazz Piano
// g.78=Boogie-Woogie
// g.79=Ragtime
// g.80=Stride
// g.84=Bop
// g.86=Big Band
// g.87=Swing
// g.88=Classic Swing
// g.89=Vocal
// g.90=Blue-Eyed Soul
// g.91=Quiet Storm
// g.92=New Jack
// g.95=New Romantic
// g.98=Cowpunk
// g.99=Hardcore
// g.100=Gospel
// g.101=New Orleans Blues
// g.102=New Orleans R & B
// g.104=Piano Blues
// g.105=Soul Blues
// g.107=Hard Bop
// g.108=Delta Blues
// g.111=Glam
// g.112=Hard Rock
// g.113=Instrumental Rock
// g.114=Jazz Rock
// g.116=Celtic Folk
// g.119=Early
// g.120=Holiday Music
// g.123=Homemade
// g.125=Celtic Rock
// g.126=Western Swing
// g.128=Country Gospel
// g.130=Country Pop/Cosmopolitan
// g.131=Traditional Country
// g.132=Country-Folk/Bluegrass
// g.134=Thrash/Speed Metal
// g.136=Techno
// g.138=Old School Punk
// g.139=Punk Pioneers
// g.142=Black Metal
// g.143=Texas Blues
// g.144=Urban Blues
// g.146=Rap Hip Hop
// g.147=Political Folk & Protest Songs
// g.148=New Folk
// g.149=Progressive Folk
// g.150=Scottish Folk
// g.151=Traditional Folk
// g.153=Psychedelic
// g.155=50s Rock -n- Roll
// g.156=Comedy/Spoken Word
// g.157=Poetry/Poetry Slam
// g.158=Conductor
// g.162=Choral
// g.171=Baroque Pop
// g.173=Hitmakers
// g.174=East Coast Rap/Hip-Hop
// g.179=Percussion
// g.180=Performer
// g.181=Chamber Group
// g.182=Solo Instrumentalist
// g.183=Death Metal
// g.185=Rapcore
// g.187=Industrial Metal
// g.189=Meditation
// g.193=Post Bop
// g.194=Soul/R&B
// g.195=Funky House
// g.197=Soundtracks
// g.199=Jam Rock
// g.200=Free Improvisation
// g.201=Experimental
// g.204=Indie/Alternative
// g.205=TV Soundtracks
// g.206=Medieval
// g.208=Lecture
// g.214=Ambient
// g.215=Beats & Breaks
// g.216=Disco
// g.217=Psytrance
// g.225=Caribbean
// g.226=Europe
// g.227=Latin America
// g.229=Africa
// g.230=Free Jazz
// g.231=Jazz-Funk
// g.233=Electric Blues
// g.234=World Fusion
// g.235=Indian Classical
// g.236=Bhangra
// g.241=New Wave
// g.242=Noise Rock
// g.243=Guitar
// g.244=China
// g.246=Soundtracks/Musicals
// g.248=Latin Rap/Hip-Hop
// g.249=Southern Rap/Hip-Hop
// g.250=West Coast Rap/Hip-Hop
// g.252=Neo-Soul
// g.253=Contemporary R&B
// g.254=Piano
// g.258=Urban Cowboy
// g.259=Contemporary Instrumental
// g.262=Honky-Tonk
// g.263=Cowboy
// g.264=Native American
// g.265=Balkans/Eastern Europe
// g.266=Pop-Jazz
// g.269=Smooth Jazz
// g.274=Modern Blues
// g.275=Afro-Pop
// g.281=South Asia
// g.282=Doom Metal
// g.284=Detroit/U.S. Techno
// g.287=Jungle/Drum n& Bass
// g.292=Country Rock
// g.293=Acoustic Blues
// g.294=Tropicalia
// g.296=Progressive Bluegrass
// g.298=Western Swing Revival
// g.299=Jazz
// g.301=Chicago Blues
// g.302=Classic Female Blues
// g.303=Rai
// g.304=Musicals
// g.305=Film Scores
// g.306=Orchestral Scores
// g.308=Film Soundtracks
// g.309=Midwestern Rap/Hip-Hop
// g.312=Grindcore
// g.314=Punk
// g.315=Post-Punk
// g.318=Swing Revival
// g.319=Boom Bap/Nineties
// g.320=Emo/Hardcore
// g.322=Southern Gospel
// g.324=Urban/Contemporary Gospel
// g.326=Instrumental Pop
// g.327=Minimal/Glitch
// g.328=Polka
// g.331=Progressive/Tribal House
// g.334=Folk/Traditional Gospel
// g.335=Nashville Sound
// g.336=New Traditional
// g.337=Outlaw Country
// g.338=Brazilian Pop
// g.339=Cumbia
// g.341=Mariachi
// g.343=Tango
// g.344=Early Country
// g.346=Acid Jazz
// g.347=Belly Dancing
// g.348=Vintage Lounge
// g.350=Americana
// g.351=Pop Punk
// g.352=Funk Rock
// g.353=Greece
// g.357=Boogie Rock
// g.358=French Pop
// g.360=AOR
// g.366=G-Funk/ Gangsta
// g.371=Gospel Choir
// g.372=Mambo
// g.373=Merengue
// g.375=Salsa
// g.377=Bakersfield Sound
// g.380=Old-Time/Appalachian
// g.383=Reggae
// g.384=Turkey
// g.385=Jewish/Israeli
// g.387=Christian Rap/Hip-Hop
// g.390=Noise Pop
// g.394=Metal
// g.396=Instrumental Guitar Rock
// g.401=Soca
// g.404=Skate Punk
// g.406=Breaks
// g.407=Country
// g.408=Tech-House
// g.409=Folk-Rock
// g.410=Dancehall
// g.411=Gypsy
// g.413=Flamenco/Fado
// g.414=Bossa Nova
// g.415=Christian R&B
// g.416=CCM
// g.418=Alternative Christian Contemporary
// g.419=Christian Pop
// g.422=Cuban
// g.423=Hawaii
// g.426=Doo-Wop
// g.428=Rockabilly
// g.429=Brill Building Pop
// g.431=Cocktail/Lounge
// g.432=Garage Rock Revival
// g.434=Deep House
// g.437=Brazilian
// g.438=Blues
// g.441=60s Oldies
// g.442=Cajun/Zydeco
// g.444=Bluegrass
// g.445=Christian Metal
// g.446=Folk
// g.451=Pop-Reggae
// g.452=Roots Reggae
// g.453=New Age
// g.455=Ethnic Fusion
// g.457=Stoner Rock
// g.458=Singer-Songwriter
// g.460=Lite Rock
// g.464=Modern Folk
// g.465=Alt Metal
// g.466=Political Rock
// g.467=Children's Christian
// g.468=Leftfield/IDM
// g.470=Children
// g.471=Spoken Word
// g.472=Baroque
// g.473=Classical Period
// g.475=Psychobilly
// g.478=Urban Folk
// g.482=Celtic
// g.483=Celtic Pop
// g.486=Folk Pop
// g.487=New Orleans & Early Jazz
// g.488=World/Reggae
// g.489=British Folk
// g.490=Middle East
// g.494=Dub
// g.495=Lovers Rock
// g.498=Healing
// g.505=Bachata
// g.506=Banda
// g.507=Norteno
// g.508=Cantautor
// g.510=Latin
// g.514=Praise and Worship
// g.515=Reggaeton
// g.516=Performance Tracks
// g.517=Video Game Soundtracks
// g.1006=Street Hop
// g.1008=Instrumental Rap/Hip-Hop
// g.1009=East Coast Underground
// g.1011=East Coast Old School
// g.1012=West Coast O.G.
// g.1014=West Coast Indie
// g.1016=West Coast Lyricists
// g.1017=Bay Area
// g.1018=The Midwestern Basement
// g.1020=Traditional
// g.1021=Grime/Dubstep
// g.1022=Midwestern Lyricists
// g.1023=Asia
// g.1024=Europe
// g.1036=ATL
// g.1037=Dirty South
// g.1038=Texas/ H-Town
// g.1039=Memphis
// g.2082=Hindi
// g.2085=Lullabies
// g.2090=Hindustani Instrumental
// g.2093=Rhymes/Fairy Tales
// g.2096=Folk/Sing-Along
// g.2099=Children's TV/Movies

var genresToExclude=/^&nbsp;$|rcid=\"g\.(1|4|6|7|8|9|12|17|18|19|21|22|23|24|27|28|32|34|35|36|38|40|41|42|43|44|45|47|48|49|52|55|57|58|59|60|62|67|68|69|70|73|75|76|77|78|79|80|84|86|87|88|89|90|91|92|95|98|99|100|101|102|104|105|107|108|111|112|113|114|116|119|120|123|125|126|128|130|131|132|134|136|138|139|142|143|144|146|147|148|149|150|151|153|155|156|157|158|162|171|173|174|179|180|181|182|183|185|187|189|193|194|195|197|199|200|201|204|205|206|208|214|215|216|217|225|226|227|229|230|231|233|234|235|236|241|242|243|244|246|248|249|250|252|253|254|258|259|262|263|264|265|266|269|274|275|281|282|284|287|292|293|294|296|298|299|301|302|303|304|305|306|308|309|312|314|315|318|319|320|322|324|326|327|328|331|334|335|336|337|338|339|341|343|344|346|347|348|350|351|352|353|357|358|360|366|371|372|373|375|377|380|383|384|385|387|390|394|396|401|404|406|407|408|409|410|411|413|414|415|416|418|419|422|423|426|428|429|431|432|434|437|438|441|442|444|445|446|451|452|453|455|457|458|460|464|465|466|467|468|470|471|472|473|475|478|482|483|486|487|488|489|490|494|495|498|505|506|507|508|510|514|515|516|17|1006|1008|1009|1101|1012|1014|1016|1017|1018|1020|1021|1022|1023|1024|1036|1037|1038|1039|2082|2085|2090|2093|2096|2099)\"/gi;

var artistsToExclude=/Various Artists| Singh( |-)|Karaoke|All(-| )Stars| AllStars|The Pop Hit Crew|The Hit Co\.|Pop Stars|Hitmaker|Singalong|The Popettes|Piano Recital|Ringtone|Fitness Music/gi;

var albumsToExclude=/Tribute to |Piano Recital/gi;


var allH1Elements = document.getElementsByTagName('h1');

//alert ( "allH1Elements[0].innerHTML=" + allH1Elements[0].innerHTML + "=");
allH1Elements[0].innerHTML=allH1Elements[0].innerHTML.replace(/Just Added \| All Genres/,"Better Rhapsody Just Added, version " + pgm_version);

var allTrElements = document.getElementsByTagName('tr');
var thisElement, str;
var exclude_idx, interested_idx,tr_idx;

var exclude_just_added_grid=[], interested_just_added_grid=[];

exclude_idx=0;
interested_idx=0;

for (tr_idx = 6; tr_idx < 26;tr_idx++) {
   // loop through every HTML tr element
   thisElement = allTrElements[tr_idx];
	str = thisElement.innerHTML;
	

	// split the row's td elements into an array so we can separate the content from the markup
	var row_cell = str.split("<td ");
	
	var album_art_markup=row_cell[2];
	var album_markup=row_cell[3];
	var album_rating_markup=row_cell[4];
	var artist_markup=row_cell[5];
	var genre_markup=row_cell[6];
	var add_date_markup=row_cell[7];

	var album_art_markup_pieces=album_art_markup.split("\n");
	var album_art_url=album_art_markup_pieces[1];

	// let's increase the size of the album art to 160x160
	album_art_url = album_art_url.replace('height="40" width="40"', 'height="160" width="160"');
	album_art_url = album_art_url.replace('class="album40x40"', '');
	
	var album_markup_pieces=album_markup.split("\n");
	if (album_markup_pieces[3] == "</td>") {
		var album_url=album_markup_pieces[1] + album_markup_pieces[2];
		album_url=album_url.replace(/<br>/ig,"");
	} else {
		var album_url=album_markup_pieces[1];
	}
	
	var album_rating_pieces=album_rating_markup.split("<\/script>",2);
	var album_rating_url=album_rating_pieces[1];
	//var album_rating_url="album_rating_url";
	//alert("album_rating_pieces[1]=" + album_rating_pieces[1] + "=");
	
	var artist_markup_pieces=artist_markup.split("\n");
	var artist_url=artist_markup_pieces[1];
	artist_url=artist_url.replace(/class="secondaryLink">/,"");

	var genre_markup_pieces=genre_markup.split("\n");
	var genre_url=genre_markup_pieces[2];

	var add_date_markup_pieces=add_date_markup.split("\n");
	var add_date=add_date_markup_pieces[1];


	var interested_td_class="bgcolor=SeaShell class=\"borderbottom999 paddingTop5px paddingBottom5px paddingRight5px borderright999\" ";

	//var exclude_td_class="bgcolor=Tan class=\"borderbottom999 paddingTop5px paddingBottom5px paddingRight5px borderright999\" ";
	var exclude_td_class="bgcolor=White class=\"borderbottom999 paddingTop5px paddingBottom5px paddingRight5px borderright999\" ";
	var exclude_highlight_td_class="bgcolor=Chocolate class=\"borderbottom999 paddingTop5px paddingBottom5px paddingRight5px borderright999\" ";

	//check to see if this row contains a genre to exclude
	if ( genre_url.search(genresToExclude) > -1 ) {
		exclude_idx++;
		
			exclude_just_added_grid[exclude_idx]="<td>" + album_art_url + "</td><td><table border=0 height=160 width=160><tr><td " + exclude_td_class + ">" + album_url + "</td></tr><tr><td " + exclude_td_class + ">" + album_rating_url + "</td></tr><tr><td " + exclude_td_class + ">" + artist_url +"</td></tr><tr><td " + exclude_highlight_td_class + ">" + genre_url + "</td></tr><tr><td " + exclude_td_class + ">" + add_date + "</td></tr></table></td>";

	} else {
	   //check to see if this row contains an artist to exclude
		if ( artist_url.search(artistsToExclude) > -1 ) {
			exclude_idx++;
			
			exclude_just_added_grid[exclude_idx]="<td>" + album_art_url + "</td><td><table border=0 height=160 width=160><tr><td " + exclude_td_class + ">" + album_url + "</td></tr><tr><td " + exclude_td_class + ">" + album_rating_url + "</td></tr><tr><td " + exclude_highlight_td_class + ">" + artist_url +"</td></tr><tr><td " + exclude_td_class + ">" + genre_url + "</td></tr><tr><td " + exclude_td_class + ">" + add_date + "</td></tr></table></td>";

		} else {
			//check to see if this row contains an album to exclude
			if ( album_url.search(albumsToExclude) > -1 ) {
				
				exclude_idx++;
				
				exclude_just_added_grid[exclude_idx]="<td>" + album_art_url + "</td><td><table border=0 height=160 width=160><tr><td " + exclude_highlight_td_class + ">" + album_url + "</td></tr><tr><td " + exclude_td_class + ">" + album_rating_url + "</td></tr><tr><td " + exclude_td_class + ">" + artist_url +"</td></tr><tr><td " + exclude_td_class + ">" + genre_url + "</td></tr><tr><td " + exclude_td_class + ">" + add_date + "</td></tr></table></td>";

			} else {
				interested_idx++;

				// save to interested grid
				interested_just_added_grid[interested_idx]="<td>" + album_art_url + "</td><td><table border=0 height=160 width=160><tr><td " + interested_td_class + ">" + album_url + "</td></tr><tr><td " + interested_td_class + ">" + album_rating_url + "</td></tr><tr><td " + interested_td_class + ">" + artist_url +"</td></tr><tr><td " + interested_td_class + ">" + genre_url + "</td></tr><tr><td " + interested_td_class + ">" + add_date + "</td></tr></table></td>";
			}
		}
	}
	
}

var allTableElements = document.getElementsByTagName('table');
just_added_table = allTableElements[4];

var just_added_grid_table_html;

var num_grids=interested_just_added_grid.length;
// tie together the grids we previously built into a single string of html
for (grid_idx = 1; grid_idx < num_grids; grid_idx=grid_idx+2) {

	left_grid_idx=grid_idx;

	right_grid_idx=grid_idx + 1;

	just_added_grid_table_html= just_added_grid_table_html + "<tr><td><table border=0 width=320><tr>" + interested_just_added_grid[left_grid_idx] + "</tr></table></td>";
	
	if (right_grid_idx <  num_grids) {
		just_added_grid_table_html= just_added_grid_table_html + "<td><table border=0 width=320><tr>" + interested_just_added_grid[right_grid_idx] + "</td></tr></table></td></tr>";
	} else {
		just_added_grid_table_html= just_added_grid_table_html + "</tr>";
	}

}

var num_grids=exclude_just_added_grid.length;
// tie together the grids we previously built into a single string of html
for (grid_idx = 1; grid_idx < num_grids; grid_idx=grid_idx+2) {

	left_grid_idx=grid_idx;

	right_grid_idx=grid_idx + 1;

	just_added_grid_table_html= just_added_grid_table_html + "<tr><td><table border=0 width=320><tr>" + exclude_just_added_grid[left_grid_idx] + "</tr></table></td>";
	
	if (right_grid_idx < num_grids) {
		just_added_grid_table_html= just_added_grid_table_html + "<td><table border=0 width=320><tr>" + exclude_just_added_grid[right_grid_idx] + "</td></tr></table></td></tr>";
	} else {
		just_added_grid_table_html= just_added_grid_table_html + "</tr>";
	}


}


// replace the just added table's html with our own gridded html
just_added_table.innerHTML=just_added_grid_table_html;










// ************************************   Sample Release Row in Rhapsody Just Added *************************************
// 
// album= rcid="alb.29716831"><img alt="Stop! Aux Mots (Remixes)" class== artist= rcid="art.10657734">Cyril Alexy</a>= genre= rcid="g.358">French Pop</a>=
// 
// 

// # Play, Add buttons: row_cell[0]

// <td class="borderbottom999 smBtnVerticalContainer paddingLeft5px" align="left" valign="middle">
// <a onclick="RhapsodyPlayer.sendMessage('play|alb.29716831|');; return false" href="http://www.rhapsody.com/goto?rcid=alb.29716831&amp;variant=play"><img title="Listen to Album: Stop! Aux Mots (Remixes)" alt="Listen to Album: Stop! Aux Mots (Remixes)" class="playSm" src="http://static.realone.com/rotw/images/buttons/playsm.gif" border="0" height="20" width="20"></a><br>
// <a href="#" class="button_playlistAdd" onclick="PlaylistDialogBoxManager.showDialogBox( { rcid:'alb.29716831', title:'Stop! Aux Mots (Remixes)' }, { spawnFrom: this, width:'230px' } ); return false" title="Add to..."><img style="border: 0pt none ;" class="playlist" src="http://static.realone.com/rotw/images/buttons/btn_add_pl.gif" height="17" width="18"></a>
// <br>
// </td>

// # Album Art: row_cell[1]

// <td class="borderbottom999 padding5px" width="5%">
// <a title="Stop! Aux Mots (Remixes)" href="http://www.rhapsody.com/goto?rcid=alb.29716831&amp;artistId=10657734" rcid="alb.29716831"><img alt="Stop! Aux Mots (Remixes)" class="album40x40" src="http://image.listen.com/img/170x170/4/3/2/7/1777234_170x170.jpg" border="0" height="40" width="40"></a><br>
// </td>

// # Album Name: row_cell[2]

// <td class="borderbottom999 padding5px" align="left" width="35%">
// <a href="http://www.rhapsody.com/goto?rcid=alb.29716831" rcid="alb.29716831">Stop! Aux Mots (Remixes)</a>
// </td>

// # Album Rating (if any): row_cell[3]

// <td class="borderbottom999 paddingTop5px paddingBottom5px paddingRight5px borderright999" align="left">
// <script type="text/javascript">
// try{
// document.write(getRatingWidget('alb.29716831','xsm'));
// }catch(e){
// /* document.write("Error calling getRatingWidget()"); */
// }
// </script><div style="text-decoration: none;" id="Alb.29716831.1" class="ratings_0_xsm" title="Rate this album"><a href="#" class="ratingslistitem_xsm" onmouseover="mouseoverRating('Alb.29716831.1','-1','xsm')" onmouseout="mouseoutRating('Alb.29716831')" onclick="mouseclickRating('Alb.29716831','-1','Alb.29716831.1'); return false;"></a><a href="#" class="ratingslistitem_xsm" onmouseover="mouseoverRating('Alb.29716831.1','1','xsm')" onmouseout="mouseoutRating('Alb.29716831')" onclick="mouseclickRating('Alb.29716831','1','Alb.29716831.1'); return false;"></a><a href="#" class="ratingslistitem_xsm" onmouseover="mouseoverRating('Alb.29716831.1','2','xsm')" onmouseout="mouseoutRating('Alb.29716831')" onclick="mouseclickRating('Alb.29716831','2','Alb.29716831.1'); return false;"></a><a href="#" class="ratingslistitem_xsm" onmouseover="mouseoverRating('Alb.29716831.1','3','xsm')" onmouseout="mouseoutRating('Alb.29716831')" onclick="mouseclickRating('Alb.29716831','3','Alb.29716831.1'); return false;"></a><a href="#" class="ratingslistitem_xsm" onmouseover="mouseoverRating('Alb.29716831.1','4','xsm')" onmouseout="mouseoutRating('Alb.29716831')" onclick="mouseclickRating('Alb.29716831','4','Alb.29716831.1'); return false;"></a><a href="#" class="ratingslistitem_xsm" onmouseover="mouseoverRating('Alb.29716831.1','5','xsm')" onmouseout="mouseoutRating('Alb.29716831')" onclick="mouseclickRating('Alb.29716831','5','Alb.29716831.1'); return false;"></a></div>
// </td>

// # Band Name:  row_cell[4]

// <td class="borderbottom999 borderright999 padding5px" align="left" width="30%">
// <div class="secondaryLink"><a href="http://www.rhapsody.com/cyril-alexy" rcid="art.10657734">Cyril Alexy</a></div>
// </td>


// # Album (or Band?) Genre:  row_cell[5]

// <td class="borderbottom999 padding5px borderright999" align="left" width="15%">
// <div class="secondaryLink paddingLeft5px">
// <a title="French Pop" href="http://www.rhapsody.com/world-reggae/europe/french-pop" rcid="g.358">French Pop</a>
// </div>
// </td>


// # Album Add Date:  row_cell[6]

// <td class="borderbottom999 padding5px" align="left" nowrap="nowrap" width="10%">
// Aug 18, 2009
// </td>
//
