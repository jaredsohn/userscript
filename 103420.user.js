// ==UserScript==
// @name          iCluster
// @namespace     iCluster
// @description   Clusters links on a web page
// @include       http://google.com.mt/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// @require       http://tartarus.org/~martin/PorterStemmer/js.txt
// @require		  http://gate.ac.uk/wiki/code-repository/src/sheffield/examples/StandAloneAnnie.java
// ==/UserScript==

//list of stop words: words which are ignored by search engines
var stopWords = new Array("able","about","above","abroad","according","accordingly","across",
				"actually","adj","after","afterwards","again","against","ago","ahead","ain't",
				"all","allow","allows","almost","alone","along","alongside","already","also",
				"although","always","am","amid","amidst","among","amongst","an","and","another",
				"any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere",
				"apart","appear","appreciate","appropriate","are","aren't","around","as","a's",
				"aside","ask","asking","associated","at","available","away","awfully","back",
				"backward","backwards","be","became","because","become","becomes","becoming",
				"been","before","beforehand","begin","behind","being","believe","below","beside",
				"besides","best","better","between","beyond","both","brief","but","by","came",
				"can","cannot","cant","can't","caption","cause","causes","certain","certainly",
				"changes","clearly","c'mon","co","co.","com","come","comes","concerning",
				"consequently","consider","considering","contain","containing","contains",
				"corresponding","could","couldn't","course","c's","currently","dare","daren't",
				"definitely","described","despite","did","didn't","different","directly","do",
				"does","doesn't","doing","done","don't","down","downwards","during","each","edu",
				"eg","eight","eighty","either","else","elsewhere","end","ending","enough",
				"entirely","especially","et","etc","even","ever","evermore","every","everybody",
				"everyone","everything","everywhere","ex","exactly","example","except","fairly",
				"far","farther","few","fewer","fifth","first","five","followed","following",
				"follows","for","forever","former","formerly","forth","forward","found","four",
				"from","further","furthermore","get","gets","getting","given","gives","go","goes",
				"going","gone","got","gotten","greetings","had","hadn't","half","happens",
				"hardly","has","hasn't","have","haven't","having","he","he'd","he'll","hello",
				"help","hence","her","here","hereafter","hereby","herein","here's","hereupon",
				"hers","herself","he's","hi","him","himself","his","hither","hopefully","how",
				"howbeit","however","hundred","i'd","ie","if","ignored","i'll","i'm","immediate",
				"in","inasmuch","inc","inc.","indeed","indicate","indicated","indicates","inner",
				"inside","insofar","instead","into","inward","is","isn't","it","it'd","it'll",
				"its","it's","itself","i've","just","k","keep","keeps","kept","know","known",
				"knows","last","lately","later","latter","latterly","least","less","lest","let",
				"let's","like","liked","likely","likewise","little","look","looking","looks",
				"low","lower","ltd","made","mainly","make","makes","many","may","maybe","mayn't",
				"me","mean","meantime","meanwhile","merely","might","mightn't","mine","minus",
				"miss","more","moreover","most","mostly","mr","mrs","much","must","mustn't","my",
				"myself","name","namely","nd","near","nearly","necessary","need","needn't",
				"needs","neither","never","neverf","neverless","nevertheless","new","next","nine",
				"ninety","no","nobody","non","none","nonetheless","noone","no-one","nor",
				"normally","not","nothing","notwithstanding","novel","now","nowhere","obviously",
				"of","off","often","oh","ok","okay","old","on","once","one","ones","one's",
				"only","onto","opposite","or","other","others","otherwise","ought","oughtn't",
				"our","ours","ourselves","out","outside","over","overall","own","particular",
				"particularly","past","per","perhaps","placed","please","plus","possible",
				"presumably","probably","provided","provides","que","quite","qv","rather","rd",
				"re","really","reasonably","recent","recently","regarding","regardless",
				"regards","relatively","respectively","right","round","said","same","saw","say",
				"saying","says","second","secondly","see","seeing","seem","seemed","seeming",
				"seems","seen","self","selves","sensible","sent","serious","seriously","seven",
				"several","shall","shan't","she","she'd","she'll","she's","should","shouldn't",
				"since","six","so","some","somebody","someday","somehow","someone","something",
				"sometime","sometimes","somewhat","somewhere","soon","sorry","specified",
				"specify","specifying","still","sub","such","sup","sure","take","taken",
				"taking","tell","tends","th","than","thank","thanks","thanx","that","that'll",
				"thats","that's","that've","the","their","theirs","them","themselves","then",
				"thence","there","thereafter","thereby","there'd","therefore","therein",
				"there'll","there're","theres","there's","thereupon","there've","these","they",
				"they'd","they'll","they're","they've","thing","things","think","third","thirty",
				"this","thorough","thoroughly","those","though","three","through","throughout",
				"thru","thus","till","to","together","too","took","toward","towards","tried",
				"tries","truly","try","trying","t's","twice","two","un","under","underneath",
				"undoing","unfortunately","unless","unlike","unlikely","until","unto","up",
				"upon","upwards","us","use","used","useful","uses","using","usually","v",
				"value","various","versus","very","via","viz","vs","want","wants","was",
				"wasn't","way","we","we'd","welcome","well","we'll","went","were","we're",
				"weren't","we've","what","whatever","what'll","what's","what've","when",
				"whence","whenever","where","whereafter","whereas","whereby","wherein","where's",
				"whereupon","wherever","whether","which","whichever","while","whilst","whither",
				"who","who'd","whoever","whole","who'll","whom","whomever","who's","whose","why",
				"will","willing","wish","with","within","without","wonder","won't","would",
				"wouldn't","yes","yet","you","you'd","you'll","your","you're","yours","yourself",
				"yourselves","you've","zero");
				
var temp;
var elements = new Array();
var clustered = new Array();
var nxtFound = new Boolean(false);
var nxtLink = "";
var att = "";
var stop = new Boolean(false);

var entityToCluster = new Array();
var linksToCluster = new Array();
var urlLinks = new Array();

//makes and arbitrary HTTP request can contain up to 7 fields of arguments
GM_xmlhttpRequest({
	method: 'GET',	//GET request to a remote document
	url: identifyWebPage(),	//function called to retreve the URL with list of links in it
	
	onload: function(returnDetails){
		
		//Creates an instance of the element object, which can then added to the document tree
		var holder = document.createElement('div');
		holder.innerHTML = htmlparser.XMLtoDOM(document.body);
		var remoteDocument = holder;
		//array to hold the temporary DOM elements that will be considered for clustering
		var content;
		content = identifyContent(document.body, remoteDocument);
		var entities = StandAloneAnnie.main(content);
		
		
		for(var i = 0; i < entites.length; i++){
					//push a DOM element that will be used for clustering
					elements2Cluster.push(entities[i]);	
					//split a sentence into an array of words
					var originalSentence = entities[i].textContent.split(/[\W]/);	
					
					//array to hold the words remaining after stop words are removed        
    				var wordsWithoutStopWords = new Array();
    				wordsWithoutStopWords = removeStopWords(i);
    				
    				//array to hold the stemmed words
    				var stemmedWords= new Array();
    				stemmedWords = stemWords(wordsWitoutStopWords);
    				
    				entityToCluster.push(stemmedWords);
    		
		}
		
		//function that performs the clustering process
		var clusters = cluster(entityToCluster, linksToCluster);
		
		//call the function that displays the clustered results
		displayClusters(tempElement);	
	}
}); 


//this function identifies the content of a web page
//finds the links and stores them into an array
function identifyWebPage(){
	//return an array containing all the links on the page
	var links = document.body.getElementsByTagName("a");
	var linkTarget = "";
	//StandAloneAnnie.main(links);
	
	if (links.length != -1){
		for(var i = 0; i < links.length; i++){
			//creates a list of links on a given page
			linkTarget = links[i].href;
		}
	}
	
	return linkTarget;

}
	

//this function traverses the clustered results and displays them as a list of list in HTML
//the clustered results will replace the original unclutered list
function displayClusters(entities){

	var css = document.createElement("style");
	css.type = 'text/css';
	
	document.getElementsByTagName('head')[0].entities(css);
	
	var testScript = document.createElement("script");
	testScript.src = "http://www.dnolan.com/code/js/listmenu/listmenu.js";
	testScript.type = 'text/javascript';
	
	document.getElementsByTagName('head')[0].entities(testScript);
	
	var testList = document.createElement("div");
  	var test1 = document.getElementById(entities.id);
	document.getElementById(entities.id).className = "";

	for(var i = 0; i < clustered.length; i++){
		var tempClusterHTML =  '<ul>'+
								'<li class="treenodeopen">' +
								'<a href="">' + clustered[i][0].innerHTML + '</a>';
		
		tempClusterHTML +=	'<ul>';
		
		for(var j = 1; j < clustered[i].length; j++){
			if(clustered[i][j].textContent.length > 1){
			tempClusterHTML += '<li>' + clustered[i][j].innerHTML + '</li>';
			}
		}
		tempClusterHTML += '</ul>';
		tempClusterHTML += 	'</li>' +
							'</ul>';					
		testList.innerHTML += tempClusterHTML;
	}
	test1.entities(testList,test1);
	
}

//function that performs clustering
function cluster(names, links){
	
	var clusters = new Array();
	var temp = new Array();
	temp.push(names[0]);
	clusters.push(temp);
	
	var tempElement = new Array();
	tempElement.push(entities[0]);
	clustered.push(tempElement);
	
	for(var i = 1; i<names.length; i++){
		var element = entities[i];
		//call a function to update the existing clusters with a new cluster
		clusters = updateClusters(clusters, names[i], names[i].names/2, element);
	}
	
	return clusters;

}


//this function verifies whether an entity is similar enough to be
//appended to an existing cluster, if not to create a new cluster
function updateClusters(clusters, entity, entityThreshold, element){

	var entityClustered = false;
	
	for(var j = 0; j < clusters.length; j++){
		if((compareTwoStringArrays(clusters[j][0], entity) >= entityThreshold) && (!entityClustered)){
			clustered[j].push(element);	
			//add the entity to the cluster
			clusters[j].push(entity);	
			entityClustered = true;
			j++;
		}
	}
	
	//since no similar cluster has been found,
	//create a new cluster and assign the entity to it
	if(!entityClustered){
		var tempEltCluster = new Array();
		tempEltCluster.push(element);
		clustered.push(tempEltCluster);	
	
		var tempCluster = new Array();
		tempCluster.push(entity);
		clusters.push(tempCluster);	
	}
	
	return clusters;
}

//a function that compares two arrays of strings and returns
//the amount of common strings found
function compareTwoStringArrays(firstArray, secondArray){

	var similarity = 0;
	for(var i = 0; i < firstArray.length; i++){
		for(var j = 0; j < secondArray.length; j++){
			if(firstArray[i] == secondArray[j]){
				similarity++;
			}
		}
	}
	return similarity;
}

//does not filter out common content
function documentContainsElement(root, html) {

  var q1 = [root];
  var containsElement = false;
  
  var scripts = root.getElementsByTagName("LI");
  for(var i = 0; i < scripts.length; i++){
	if(scripts[i].textContent == html){
		containsElement = true;
		
	}
  }
  return containsElement;
}

//this function performs the comparison between two DOM trees. All elements from one DOM tree are checked to verify whether they are in the second DOM tree
//if an element is found to be in both DOM trees, its parent node is appended to a list which is returned when all elements have been traversed.
//the DOM trees are traversed in level-order
function identifyContent(docA, docB) {

  var root = docA;
  var q1 = [root];
  var mainContentElement = null;
  var tempParents = new Array();
  var cnt = 0;
  
  while(q1.length){
    var q2 = [];
    for(var i=0; i < q1.length; i++){
		if((q1[i].nodeName == "P") || (q1[i].nodeName == "li") || (q1[i].localName == "li") || (q1[i].localName == "p") || (q1[i].nodeName == "div") && q1[i].textContent){
			if(!documentContainsElement(docB, q1[i].textContent)){	
				cnt++;
				tempParents.push(q1[i].parentNode);
			}
		}		
      for(var j=0; j<q1[i].childNodes.length; j++)
        q2.push(q1[i].childNodes[j]);
    }
    q1 = q2;
  }
  return tempParents;
}

//function to remove stop words	
function removeStopWords(k){

	//split a sentence into an array of words
	var originalSentence = contentElement.childNodes[k].textContent.split(/[\W]/);	
	//array to hold the words remaining after stop words are removed        
    var removedStopWords = new Array();	
	for(var i = 0; i < originalSentence.length; i++){	
	//remove stop words
		if(originalSentence[i] != "")	{			
			if(stopWords.indexOf(originalSentence[i]) == -1){
				removedStopWords.push(originalSentence[i]);		
			}
		}
	}
	return removedStopWords;
}

//function to stem words using the Porter Stemmer Algorithm
function stemWords(revomedStopWords){

	var stemmedWords = new Array();
						
	for(var i = 0; i < removedStopWords.length; i++){
		//call the porter stemmer algorithm which is kept in a separate js file
		var tempStem = stemmer(removedStopWords[i]);	
		stemmedWords.push(tempStem);
	}

}

//this function is used to return the domain from a href
function stripString(href){
	var rev = reverseString(href);
	var first = rev.indexOf("/");	
	var tempStr = rev.substring(first,href.length);
	var ans = reverseString(tempStr);
    return ans;
}

//removes any white space from a string
function noWhiteSpace(str)
{
    str = str.trim();
    str = str.replace(/\s/g, "");
    return str;  
}