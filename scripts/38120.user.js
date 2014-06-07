// ==UserScript==
// @name           Seafood Information Tool
// @namespace      tag:jmckenri@uci.edu,2008-12-04:SeafoodInfo
// @description    Lets you lookup the ecological status and health advisories about 90+ varieties of the most commonly consumed seafood in the world. 
// @include        *
// ==/UserScript==

//Change Log:
//12-08-08:  Changed text area font for easier readability.


//Launches the window where the queries will take place.
function launcher()
{

       var theWindow = open('','theWindowName','height=320,width=490,resizable=no,scrollbars=no'); 
//START SCRIPT
      theWindow.document.write("<head>"); 
    theWindow.document.write("<script>");
//open1
   theWindow.document.write("function lookupMultipleEntries() {"); 
  theWindow.document.write("var name = document.lookupForm.seafoodList.value;"); 
      theWindow.document.write("var para = 'There are multiple entries for this species.  Please  select the specific variety.';");
        theWindow.document.write("var linkage = 'http://www.blueocean.org';");
        theWindow.document.write("var gifUrl = 'http://www.blueocean.org/_gr/_flags/msclogo_small.gif';");
        theWindow.document.write("if(name == 'returnToMain' || name == 'Caviar' || name == 'Cod' || name == 'Crabs' || name == 'Eel' || name == 'Flounders' ||"
           + " name == 'Halibut' || name == 'Lobster' || name == 'Mackerel' || name == 'Mahimahi' || "
            + "name == 'Mussels' || name == 'Rockfish' || name == 'Salmon' || name == 'Scallops' || name == 'Sardine' || "
            + "name == 'Sea Bass' || name == 'Sea Urchin' || name == 'Shark' || name == 'Shrimp' || "
            + "name == 'Snapper' || name == 'Soles' || name == 'Spiny Lobster' || name == 'Squid'   || "
            + "name == 'Striped Bass' || name == 'Sturgeon' || name == 'Swordfish' || name == 'Trout' || "
             + "name == 'Tuna')");
        theWindow.document.write("{");
        theWindow.document.write("document.lookupForm.textArea.value='There are multiple entries for this species.  Please select the specific variety.';");
        theWindow.document.write("document.lookupForm.theImg.src='http://www.blueocean.org/_gr/_flags/msclogo_small.gif';");
        theWindow.document.write("document.getElementById('theLinkId').href='http://www.blueocean.org';");   
        theWindow.document.write("changeSelect(name);");
        theWindow.document.write("}");
        
        theWindow.document.write("else");
//open2
        theWindow.document.write("{");
        
        theWindow.document.write("if(name == 'returnToMain' || name == 'selecter')");
        theWindow.document.write("{");
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/msclogo_small.gif';");
        theWindow.document.write("linkage = 'http://www.blueocean.org';");
        theWindow.document.write("para = 'Please choose a species from the search bar.';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'subMenu')");
        theWindow.document.write("{");
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/msclogo_small.gif';");
        theWindow.document.write("linkage = 'http://www.blueocean.org';");
        theWindow.document.write("para = 'There are multiple entries for this species.  Please   select the specific variety.';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'caspSea')");
        theWindow.document.write("{");
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_1.gif';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?  spc_id=104';");
        theWindow.document.write("para = 'With a lifespan up to 100 years, Beluga sturgeon are naturally vulnerable to fishing pressure. Poor management, overfishing, pollution, and habitat destruction have contributed to severe population declines of this and other Caspian Sea sturgeon species. The high value of caviar has posed a major obstacle to stemming illegal trade in caviar.';}");

        theWindow.document.write("if(name == 'nA')");
        theWindow.document.write("{");
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_1.gif';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=107';");
        theWindow.document.write("para = 'The wild sturgeon populations of the U.S. and Canada are suffering from overfishing and habitat degradation. Because these species are long-lived, and little is known about habitat requirements, recovery will be slow. Management is weak because coordination of management agencies is poor, and there is insufficient data on populations to determine sustainable catch levels.';}");
        
        theWindow.document.write("if(name == 'Atlantic Herring')");
        theWindow.document.write("{");
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=163';");
        theWindow.document.write("para = 'In the U.S. and Canada Atlantic Herring range from the Labrador coast to South Carolina. Herring support a substantial bait industry for lobster, blue crab and tuna fisheries. They are also sold as steaks and kippers and are one of many species sold in the U.S. as canned sardines. The U.S. and Canadian populations have fully recovered from overfishing in the 1960s with large scale population increases since the 1990s. Early maturation, low bycatch gear, and collaborative management by federal and state partners contribute to the species\\' resilience to fishing pressure.';}");
        
        theWindow.document.write("if(name == 'Bluefish')");
        theWindow.document.write("{");
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_3_flag1.gif';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?  spc_id=101';");
        theWindow.document.write("para = 'Although mostly caught by recreational fishers, commercial Bluefish fishers also bring this species to market. Bluefish mature quickly, but fishing pressure is substantial enough that Bluefish remain overfished. Although managers have implemented a recovery plan, it\\'s too early to assess its effectiveness. Most Bluefish are caught with gillnets, which occasionally entangle sea turtles and dolphins. When caught by hook and line, Bluefish are more ocean-friendly.';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Barramundi')");
        theWindow.document.write("{");
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=161';");
        theWindow.document.write("para = 'U.S. farmed Barramundi are raised in closed aquaculture systems, where water is recycled and very little waste is released into the environment. The waste that is released is heavily treated and can be used as fertilizer for agriculture. Native to tropical Australia and Asia, Barramundi are opportunistic predators of fish and crustaceans. In the U.S., arm-raised Barramundi are fed high energy pellets consisting of moderate levels of fish meal and oil.';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Capelin')");
        theWindow.document.write("{");
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Capelin have a circumpolar distribution in the Arctic and represent one of the largest fisheries in the world. They grow fast, reproduce in 3-4 years and then die. Most Capelin is caught in Iceland and Canada using purse seines, which cause little habitat damage and produce limited bycatch. Capelin are an important source of food for many seabirds, marine mammals and cmmercially important fish species.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=200';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Catfish')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Fish farmers raise Catfish mostly in the Southern U.S. in large earthen ponds, resulting in some water pollution problems. Compared to other farmed fish, Catfish need less fishmeal/oil from wild sources in their feed, and they are native to where they\\'re farmed.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=15';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Chilean Sea Bass')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_1_flag1.gif';");
        theWindow.document.write("para = 'Really named Patagonian Toothfish, high demand for this naturally long-lived fish drives depletion and creates an incentive for illegal and unregulated fishing. Incidental catch of seabirds in Toothfish longlines jeopardizes populations of albatrosses and petrels. The small South Georgia and South Sandwich Islands fishery for Patagonian Toothfish has been certified as environmentally sustainable by the Marine Stewardship Council.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=98';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Lingcod (U.S. West Coast)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_4_flag1.gif';");
        theWindow.document.write("para = 'Lingcod, which aren\\'t actually related to cod, dwell along the ocean bottom. Males can be especially sedentary, establishing territories before spawning and guarding fertized eggs until they hatch. Off the U.S. West Coast, most commercially caught Lingcod are taken along with other groundfish in trawl fisheries. Today, however, recreational fishers are taking more Lingcod than commercial fishers. Lingcod are considered rebuilt from previous overfishing. Bycatch of depleted rockfish in trawl fisheries remains a major problem.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=117';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Pacific Cod')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'While faring better than their Atlantic counterparts, Pacific Cod are only moderately abundant. Alaska managers limit catches and consider bycatch. Declines of marine mammals and bycatch of North Pacific albatrosses have led to concerns about this fishery\\'s ecosystem impacts. In February 2006, the Bering Sea and Aleutian Islands Freezer Longline Fishery for Pacific Cod, which has implemented largely successful seabird bycatch reduction measures, was certified to the Marine Stewardship Council\\'s standard for sustainable fisheries.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=18';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Icelandic Cod')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_2.gif';");
        theWindow.document.write("para = 'While Icelandic Cod hover only slightly above the historic lows they suffered only a few years ago, they\\'re not officially overfished. Caught mostly with bottom trawls, Icelandic Cod fishing causes damage to ocean-floor habitats. Management is in place to reduce fishing effort and to reduce unintentional catch of other species.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=37';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Atlantic Cod (U.S. and Canada)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_1.gif';");
        theWindow.document.write("para = 'Decades of overfishing have driven these cod populations to historic low levels. Even with heavy management, populations show no sign of rebuilding. Catch methods for Atlantic Cod - primarily bottom trawling - cause substantial egradation. Stronger management for Icelandic groundfish fisheries put Atlantic Cod in their waters in slightly better shape than populations off the U.S. and Canada.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=56';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Conch')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_2.gif';");
        theWindow.document.write("para = 'Many conch populations are at densities too low for successful reproduction to ensue. International agreements regulate the trade of conch cells, but fishery products are managed more locally, and the species remains threatened by overfishing and poaching throughout most of its range. The Turks and Caicos Islands are an exception; their strong regulations on how and where conch can be caught have kept populations there stable.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=91';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Dungeness Crab')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Dungeness Crabs dwell in shallow coastal waters from Alaska to Mexico and are named after the Dungeness Spit along the south shore of the Straits of Juan de Fuca. Little is known about how abundant these crabs are since their abundance fluctuates with oceanic conditions and consequently populations are difficult to assess. Dungeness Crabs have some reproductive strategies that help populations withstand fishing pressure. Males will mate with numerous females, and large females can carry over two million eggs. To help protect Dungeness Crabs, state and tribal managers prohibit catches of females and require that fishers only catch males that are large enough to have mated at least twice. Most crabs are caught in low-bycatch traps, called pots.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=112';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'King Crabs')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'King Crab fisheries are strongly managed and their offshore, deep-sea habitat remains healthy. These spider-like crustaceans molt, aggregate to mate, and brood their eggs for about a year, all traits that make them vulnerable to fishing.  Their abundance naturally expands and contracts, but good management keeps these populations fairly healthy.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=35';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Stone Crabs')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Popular in the Southeast U.S. and supplied   predominantly by the Florida West coast crab fishery, fishers use relatively low-bycatch traps to catch Stone Crabs. These crabs benefit from naturally high fertility, which helps provide resilience to fishing pressure. Fishers for Stone Crabs have been advocates for strong management; they urged regulators to adopt a program to reduce the number of traps allowed in the fishery.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=55';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Blue Crab')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_3_flag1.gif';");
        theWindow.document.write("para = 'Blue Crabs mature early and carry their eggs for a short period of time, making them more resilient to fishing pressure than other crab species. Abundance varies hroughout their range. Habitat degradation in the Chesapeake Bay and Gulf of Mexico threaten Blue Crabs in those regions.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=6';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Snow and Tanner Crabs (U.S. and Canada)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_3.gif';");
        theWindow.document.write("para = 'Snow Crabs in Alaska are classified as overfished, owing to their low level of abundance. Although fishery managers have implemented rebuilding measures, it is too soon to tell if they are effective. Canadian Atlantic populations are considered healthy. Snow Crabs are caught in pots, which cause moderate damage to habitat, but generally have lower bycatch than other fishing methods.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view? spc_id=36';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Crawfish')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'U.S. farmers grow Red Swamp and White Swamp Crawfish in man-made ponds, often with rice or soybean crops. More than 90% of all U.S. crawfish production occurs in ouisiana, where these species are native. Crawfish producers do not use feed to raise crawfish; instead they subsist on detritus and small animals in their ponds\\' food webs.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=93';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'American Eel')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_2_flag1.gif';");
        theWindow.document.write("para = 'Some American eels do not reproduce until they are 24 years old, making them inherently vulnerable to fishing pressure. True abundance is unknown, but catches have decreased, and scientists believe that populations are drastically declining. American eels may be taken as bycatch during the collection of floating sargassum weed, which they depend on for habitat.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=73';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Steelhead')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_2.gif';");
        theWindow.document.write("para = 'Sea-going members of the Rainbow Trout species, Steelhead return to natal hatching grounds to spawn, with a small percentage surviving to reproduce more than once. Wild Steelhead populations have declined significantly due to overfishing and habitat loss. Commercial fishing for Steelhead in the U.S. has been restricted to Native American tribes for decades. Hatcheries supply the majority of the Steelhead these fishers catch.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=149';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Eel, Freshwater (farmed)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_1.gif';");
        theWindow.document.write("para = 'Most Freshwater Eel is farmed in net pens and ponds where waste is not treated before it\\'s discharged, causing serious environmental pollution. Freshwater Eels can also escape from net pens, transferring diseases to wild populations. Freshwater Eels are highly carnivorous and require a high protein diet, consisting mostly of fish meal and oil. Because of their complex life history, farming is dependent on wild-caught juvenile  or glass Eels, causing wild populations to decline.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=191';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Summer Flounder')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_4_flag1.gif';");
        theWindow.document.write("para = 'Summer Flounder were steadily declining until strong management was implemented in the early 1990s. They have since recovered and are no longer considered overfished. Trawls used to catch Atlantic groundfish cause habitat damage and bycatch problems.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=3';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Atlantic Flounders and Soles')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_2.gif';");
        theWindow.document.write("para = 'Long-term overfishing and high bycatch plague Atlantic groundfish fisheries. Naturally vulnerable to fishing pressure, most Atlantic flounders and soles remain depleted. Strong management measures have helped Summer Flounder (fluke) rebound.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=1';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Groupers')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_1_flag1.gif';");
        theWindow.document.write("para = 'Generally long-lived, many groupers have sedentary lives and change sex with age, making them particularly vulnerable to overfishing. Most groupers sold in the U.S. are imported, in many cases from countries with little management in place. Some grouper species in U.S. waters are recovering with the aid of improved management.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=33';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Pacific Halibut')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Related to flounders, Pacific Halibut are far larger. Although they grow slowly and can live over 50 years, Pacific Halibut remain abundant due to responsible management, where annual catches and bycatch are strictly capped. Fishers own shares of the total annual catch, eliminating the dangerous incentive to fish competitively. Seabird bycatch, especially of North Pacific albatross species, is a concern in the Alaska demersal longline halibut fishery.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=12';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Atlantic Halibut')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_1.gif';");
        theWindow.document.write("para = 'Fishers use bottom longlines and groundfish trawls to catch Atlantic Halibut. Long-lived and slow to mature, this fish is vulnerable to fishing pressure. Like Atlantic Cod, Atlantic Halibut in U.S. and Canadian waters crashed in the 20th century due to overfishing and remain depleted today.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=92';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Hoki')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_2.gif';");
        theWindow.document.write("para = 'Hoki form spawning aggregations which are easily targeted by fishers. Abundance of Hoki in New Zealand has declined in recent years. However, managers have recently instituted a large decrease in catch quotas and other measures to help rebuild the population. The fishery takes significant quantities of seabirds and fur seals. The New Zealand fishery is certified as sustainable to the Marine Stewardship Council\\'s environmental standard, but the fishery is currently undergoing reassessment.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=115';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Lingcod')");
        theWindow.document.write("{");       
        theWindow.document.write  ("gifUrl='http://www.blueocean.org/_gr/_flags/fish_4_flag1.gif';");
        theWindow.document.write("para = 'Lingcod, which aren\\'t actually related to cod, dwell along the ocean bottom. Males can be especially sedentary, establishing territories before spawning and guarding fertilized eggs until they hatch. Off the U.S. West Coast, most commercially caught Lingcod are taken along with other groundfish in trawl fisheries. Today, however, recreational fishers are taking more Lingcod than commercial fishers. Lingcod are considered rebuilt from previous overfishing. Bycatch of depleted rockfish in trawl fisheries remains a major problem.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=117';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'American Lobster (Maine and Canada)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'With few natural predators today, many populations are at record-high abundance. However, entanglements of endangered North Atlantic Right Whales in lobster fishing gear raise significant concerns.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=20';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'California Spiny Lobster')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'The California Spiny Lobster fishery is a small, but locally important and largely sustainable fishery in southern California. Abundance of Spiny Lobsters off California varies with broad-scale changes in environmental conditions caused by El Nino and La Nina. State managers closely regulate commercial fishing for Spiny Lobster, but do not monitor recreational catches. Bycatch is low since ports on the wire-mesh Spiny Lobster traps generally allow undersized lobsters and other animals to escape.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=151';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Western Rock Lobster (Australia)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'The first fishery certified by the Marine Stewardship Council, the Western Rock Lobster fishery of Australia remains a well-managed and sustainable fishery. Regular monitoring of juvenile lobster abundance allows managers to adjust fishing effort during periods of low recruitment. Although habitat effects are minimal, the occasional bycatch of sea lions, turtles and whales is of some concern.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=155';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Caribbean Spiny Lobster (Florida)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_3.gif';");
        theWindow.document.write("para = 'Caribbean Spiny Lobsters grow fast, are highly fecund, and can live up to 20 years. Centered in Florida, fishing pressure on Caribbean Spiny Lobsters in U.S. waters is heavy. Caribbean Spiny Lobsters in Florida waters exhibit a truncated size structure and commercial catches in recent years have been below the long-term average. Fishers use traps to catch Caribbean Spiny Lobsters, resulting in minimal bycatch. Concerns exist, however, about the widespread use of undersized Spiny Lobsters lieu of bait in Spin Lobster traps.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=154';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Atlantic Mackerel')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Atlantic Mackerel are fast swimmers found throughout the Atlantic Ocean that mature within 3 years. In U.S. waters, Atlantic Mackerel have rebounded from being overfished in the 1970s and are at a high level of abundance. Europeans target separate populations of Atlantic Mackerel, and both fisheries primarily use mid-water trawls, but also bottom trawls. Bycatch of marine mammals continues to be a problem in this otherwise healthy fishery.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=123';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Chub Mackerel')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Chub Mackerel are found along both coasts of North America, but the fisheries in California and Mexico are most important. Chub Mackerel school at the surface of coastal waters, often with sardines and anchovy. Bycatch is usually low, because fishers set nets directly on schools. Sardines and anchovies caught in the process are sold. Impacts of fishing gear on habitat are also low, because the fishery uses pelagic seine nets that rarely contact the seafloor. Chub Mackerel are sold fresh and as fish meal, oil, and tuna bait.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=121';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'King Mackerel')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_5_flag1.gif';");
        theWindow.document.write("para = 'Overfished in the mid-1980s, King Mackerel have rebounded to a high level of abundance today. Conservative management measures now govern the hook-and-line and runaround-gillnet fisheries for King Mackerel. These surface fisheries have little bycatch compared to other fisheries and no adverse effects on habitat.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=120';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Spanish Mackerel')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_5_flag1.gif';");
        theWindow.document.write("para = 'Spanish Mackerel inhabit coastal waters along the Eastern seaboard of the U.S. and have recovered from years of overfishing to high abundance today. They are important to recreational as well as commercial fishers. The surface gears fishers use to catch Spanish Mackerel have little bycatch and no adverse effects on habitat.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=118';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Cero Mackerel')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Cero Mackerel inhabit coastal waters from New England to Brazil, however they are primarily associated with reefs off South Florida and throughout the Caribbean. A small directed commercial fishery for Cero Mackerel exists in U.S. waters, but most Cero Mackerel in the U.S. market are caught incidentally in other fisheries. Little is known about the status of Cero Mackerel in U.S. waters or in the Caribbean, where catches are high.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view spc_id=147';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Mahimahi, pole- and troll-caught')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Fast-growing, short-lived species, Mahimahi potentially can withstand high fishing pressure. Pole- or troll-caught are better than longline-caught because fewer unintended fish and marine mammals are taken, and there is no problem of seabird and marine turtle bycatch.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=13';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Mahimahi, longline-caught')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_3.gif';");
        theWindow.document.write("para = 'With a life history strategy with high potential for resilience to fishing pressure, supply of mahimahi to the U.S. marketplace is primarily imports from modern industrial distant-water pelagic longline fleets from Asia and from coastal longline fleets from the eastern tropical Pacific. Bycatch of marine turtles and seabirds is a concern. Pirate pelagic longline vessels, flying flags of convenience, with many owners based in Taiwan, is a large concern. Little is known about mahimahi abundance status and trends.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=97';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Monkfish')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_3.gif';");
        theWindow.document.write("para = 'Monkfish were traditionally caught as bycatch and discarded until the 1980s when market demand for the species first grew in Asia and Europe. The rapid growth of the fishery landed Monkfish on the overfished species list. Abundance increased initially after fishery managers implemented protective measures in 1999, but then started a declining trend, indicating that stronger management is needed. Many fisheries in New England and the Mid-Atlantic catch Monkfish, but the majority are caught in gillnet and trawl fisheries. Trawls can harm the seafloor.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=111';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Blue Mussel (farmed)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Most Blue Mussels sold in the U.S. are native to where they\\'re farmed. They filter plankton from the water and need no extra feed. Farmers raise them on ropes hung on structures placed in coastal waters, which causes little habitat disruption. Mussels can also be grown on the seafloor and harvested using dredges, a method which causes some disruption to bottom habitat.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=62';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Green Mussel (farmed, New Zealand)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Like other mussels, New Zealand\\'s Green Mussels filter plankton and nutrients from the surrounding water, thereby improving water quality. Green Mussels are native to New Zealand, where they are farmed. Management there is strong; New Zealand\\'s rigorous permitting process prevents habitat degradation by ensuring that farms are excluded from sensitive habitat areas.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=99';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Mediterranean Mussel (farmed)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Although Mediterranean Mussels farmed in the U.S. are an introduced species, they are well established, and have not had negative effects on local ecosystems. Mussels feed by filtering water for plankton and nutrients, so no fishmeal or fish oil is needed to raise them. These mussels are raised on suspended ropes, which keeps habitat intact.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=102';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Octopus')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_2.gif';");
        theWindow.document.write("para = 'Although Octopus are wide-ranging and have short lifespans, some populations are declining due to heavy fishing pressure. Most Octopus are caught using bottom trawls, causing habitat damage and bycatch of unwanted wildlife. Management and monitoring of Octopus fisheries are weak in many countries.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=83';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Orange Roughy')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_1_flag1.gif';");
        theWindow.document.write("para = 'Orange Roughy, which don\\'t mature until they\\'re at least 20 years old and can live over 100 years, show dramatic population declines in some areas. They live in deep waters where they\\'re caught with habitat-damaging trawl gear when they gather to feed or spawn around seamounts and oceanic cliffs. A number of deep-sea shark species caught as bycatch in orange roughy fisheries are threatened.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=31';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Oreos')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_1.gif';");
        theWindow.document.write("para = 'Smooth and Black Oreos are slow to mature and are extremely long-lived fishes, qualities which make them vulnerable to overfishing. Most reported catches occur in New Zealand, where they are in low levels of abundance in some areas. They aggregate around seamounts, and the bottom trawls used to fish for Oreos cause extensive damage to their benthic habitats.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=116';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Oysters')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'The Chesapeake Bay was once the center of Eastern Oyster production, but overfishing and disease have decimated its oyster population. States bordering the Gulf of Mexico now supply the majority of Eastern Oysters. Eastern Oyster cultivation improves water quality by filtering algae from the water column. The most common method for harvesting Eastern Oysters is dredging, which is harmful to bottom habitat.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=68';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Pollock')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Pollock, which live on both sides of the North Pacific, are quick to mature, which potentially enables them to withstand high fishing pressure. Pollock support the world\\'s largest whitefish fishery, which supplies surimi (minced fish) for imitation crabmeat, roe, and fillets to markets in the U.S., Europe, and Japan. Managers closely monitor the large-scale Pollock fishery, which uses mid-water trawls and has low bycatch. Possible impacts on declining Steller Sea Lions, which prey on Pollock, continue to concern managers and environmental groups.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=125';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Rockfish (Alaska)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_3.gif';");
        theWindow.document.write("para = 'Some rockfish species may survive to be over 100 years old, making them vulnerable to fishing pressure. Rockfish populations in Alaska are in better shape than their counterparts in California, Washington and Oregon. Still, some Alaskan rockfish species may be locally depleted. Trawl gear used to catch rockfish is destructive to rocky seafloors and living corals.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=110';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Rockfish (U.S. West Coast)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_2_flag1.gif';");
        theWindow.document.write("para = 'There are over 60 species of rockfish found along the U.S. west coast, and many are important in commercial and recreational fisheries. Some rockfish species are overfished and the status of many others is unknown because of a lack of available information. Recovery plans introduced since the late 1990s are slowly helping vulnerable rockfish populations increase, but full recovery for the most depleted and slow growing species is not expected for many decades. Most rockfish are long-lived, late to mature, slow growing, and are affected by environmental factors such as warm ocean temperatures. This makes them especially vulnerable to fishing pressure and lengthens recovery time for overfished species.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=108';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Sablefish')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Alaska Sablefish is a long-lived species dwelling in deep waters of the Northeast Pacific. Although Sablefish were overexploited in the past, the population has increased in recent years as a result of progressive management and is now at a medium level of abundance. In contrast to the dangerous derby style of fishing that characterized the fishery in previous decades, Sablefish fishers now own shares of the quota. This system gives  fishers an incentive to maintain the population at healthier levels and reduces the amount of fish that\\'s wasted in the process of catching Sablefish. Most Sablefish in Alaska are caught by hook-and-line gear known as bottom longlines. This fishing method catches fewer unwanted species than trawling and is likely to cause less damage to the seafloor.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=128';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Alaska Salmon')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'With good management and fairly healthy habitat, Alaska salmon remain abundant. There is concern over the Alaska salmon hatchery program\\'s possible adverse effects on wild salmon. In contrast, depletion and degraded habitat from dams and logging pose serious problems for most Pacific Northwest salmon.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=95';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Pacific Salmon (California, Oregon, and Washington)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_3.gif';");
        theWindow.document.write("para = 'Management of U.S. West Coast (California to Washington) salmon is comprehensive and catches are monitored to protect weak populations, but overall population abundance remains well below historical levels. Habitat degradation from dams,   logging, and development pose serious problems for most Pacific salmon on the West Coast. There is concern over the possible adverse effects of salmon hatchery programs on wild salmon.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=164';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Atlantic Salmon (farmed)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_1_flag1.gif';");
        theWindow.document.write("para = 'There are high environmental costs in farming Atlantic Salmon such as water pollution, disease, and high wild fish content in feed. All Atlantic Salmon sold in the U.S. is farmed; of which 90% is imported from Canada and Chile. Farming Atlantic Salmon typically occurs at high stocking densities in sheltered coastal net pens. Antibiotics and vaccines are commonly used to treat infected farmed Atlantic Salmon. Global regulations are   highly variable and in some cases non-existent.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=29';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Atlantic Herring (U.S. and Canadian)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'In the U.S. and Canada Atlantic Herring range from the Labrador coast to South Carolina. Herring support a substantial bait industry for lobster, blue crab and tuna fisheries. They are also sold as steaks and kippers and are one of many species sold in the U.S. as canned sardines. The U.S. and Canadian populations have fully recovered from overfishing in the 1960s with large scale population increases since the 1990s. Early maturation,   low bycatch gear, and collaborative management by federal and state partners contribute to the species\\' resilience to fishing pressure.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=163';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Sardines')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Sardines are abundant in most temperate waters throughout the Pacific and Indian Oceans. They grow rapidly and are important food for many fish, seabirds and marine mammals. Sardines are caught using purse seines, which cause minimal habitat damage and result in little bycatch.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=201';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Bay Scallop (farmed)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Since native U.S. Bay Scallops suffer from depletion, most Bay Scallops come from coastal aquaculture farms in China. There, growers reportedly produce all their scallops via suspension culture, with relatively low impact to the environment. Be aware that some Calico Scallops may be labeled as Bay Scallops (Calicos are severely depleted and taken with habitat-damaging dredges).';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=61';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Icelandic Scallop')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_3.gif';");
        theWindow.document.write("para = 'The aggregative and sedentary behaviors of Icelandic Scallops make their populations particularly vulnerable to fishing pressure. Despite fishery closures in some areas and other management efforts, populations of Icelandic Scallops are declining in the waters of all countries that fish for them commercially, including Canada and Iceland. Icelandic Scallops are caught with dredges, which damage the seafloor, especially the hard-bottom habitats where the scallops live.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=134';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Sea Scallop')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_3.gif';");
        theWindow.document.write("para = 'Wild Sea Scallops were once overfished but have since recovered. With fishing pressure still high, recent management measures are controversial. Bottom dredges and trawls used to catch Sea Scallops inadvertently damage habitat, and there is unintended catch of endangered sea turtles and Atlantic Cod, Monkfish, flounders, and skates.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=19';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Black Sea Bass (U.S. Mid-Atlantic)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Black sea bass in the Mid-Atlantic are commonly caught among rocky structures by both recreational and commercial fishers. They begin life as females and become males by the time they\\'re five years old, a characteristic that has the potential to increase their vulnerability to fishing pressure. However, stronger management in recent years is  helping Black sea bass recover and they\\'re no longer overfished. The level of bycatch is unknown.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=100';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Chilean Sea Bass')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_1_flag1.gif';");
        theWindow.document.write("para = 'Really named Patagonian Toothfish, high demand for this naturally long-lived fish drives depletion and creates an incentive for illegal and unregulated fishing. Incidental catch of seabirds in Toothfish longlines jeopardizes populations of albatrosses and petrels. The small South Georgia and South Sandwich Islands fishery for Patagonian Toothfish has been certified as environmentally sustainable by the Marine Stewardship Council.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=98';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Green Sea Urchin (British Columbia)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Green Sea Urchins are reasonably abundant along the coasts of northeast Canada. Sea Urchins are prolific breeders and can live over 20 years. They are hand-caught by divers so bycatch is minimal with no damage to the habitat. Sea Urchins graze Kelp and are eaten by many animals like Sea Otters, and therefore are an important link in the marine ecosystem.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=186';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Red Sea Urchin (British Columbia)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Red Sea Urchins are moderately abundant along the coasts of northeast Canada. Sea Urchins are prolific breeders and can live over 20 years. They are hand-caught by divers so bycatch is minimal with no damage to the habitat. Sea Urchins graze Kelp and are eaten by many animals like Sea Otters, and therefore are an important link in the marine ecosystem.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=189';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Sea Urchin Roe')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Uni comes from Green and Red Sea Urchins, which are reasonably abundant along the coasts of the northeastern Pacific. Both Urchin species are prolific breeders and can live over 20 years. They are hand-caught by divers so bycatch is minimal with no damage to the habitat. Sea Urchins graze Kelp and are eaten by many animals like Sea Otters, and therefore are an important link in the marine ecosystem.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=203';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Red Sea Urchin (California)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Red Sea Urchins in California are overfished and generally uncommon in rocky habitats. They are hand-caught by divers so bycatch is minimal with no damage to the habitat. Sea Urchins graze Kelp and are eaten by many animals like Sea Otters, and therefore are an important link in the marine ecosystem.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=190';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Sharks (U.S.)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_3_flag1.gif';");
        theWindow.document.write("para = 'Many shark species mature relatively late, grow slowly, and have few offspring, making them vulnerable to fishing pressure. Yet, for many species globally, there is a paucity of information about shark biology and status, and no management. Recent efforts by scientists in the United States to assess shark abundance, combined with the prohibition on shark finning, represent improvements in shark fishery management. There are indications that populations of the species most commonly caught in U.S. waters, Blacktip Shark, Common Thresher Shark, Sandbar Shark, and Shortfin Mako Shark, are in better shape than species caught elsewhere in the world.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=34';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Sharks (imported)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_1_flag1.gif';");
        theWindow.document.write("para = 'Information on the biology and status of many shark species worldwide is lacking. However, of those we know about, many species grow slowly and have few offspring, making them vulnerable to fishing pressure. There is no international management in place for shark fisheries and few individual countries worldwide are working to maintain healthy shark populations. Sharks are caught both intentionally for their meat and fins, and unintentionally by fishers aiming to catch other species.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=32';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Northern Shrimp (Eastern Canada)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'This species is distributed along the northern coastlines of the Atlantic and Pacific Oceans, including the North and Bering Seas and the Sea of Okhotsk. The Canadian fishery uses trawl nets to catch Northern Shrimp over muddy bottoms, and mandatory use of bycatch reduction devices (called Nordmore grates) has greatly reduced bycatch of depleted groundfish. The fishery is also managed under an individual quota system, which has ended the dangerous incentive to fish competitively for shrimp.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=140';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Pink Shrimp')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'This coldwater species is found from California to Alaska and changes sex from male to female after its first year of life. The fishery, centered in Oregon, uses double-rigged trawl nets to catch shrimp over muddy bottoms. Effective management measures have addressed bycatch of depleted Pacific rockfish (through the use of Oregon grates) and overcapitalization problems (through groundfish license buyback and limited entry programs).';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=139';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Shrimp (farmed, U.S.)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Farmed shrimp require high amounts of fishmeal and fish oil in their food compared to other farmed fish and shellfish. To reduce pollution when shrimp water is discharged, it is usually treated. Imported farmed shrimp come from areas with weaker environmental protections, and practices commonly damage ecosystems. U.S. farm-raised shrimp are a better alternative to imported farm-raised shrimp and to trawl-caught shrimp.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=130';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Shrimp (farmed, imported)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_1.gif';");
        theWindow.document.write("para = 'The production of imported farm-raised shrimp - supplied almost entirely by developing nations in tropical regions - destroys critical managrove and coastal habitat and introduces chemical and biological wastes into sensitive environments. Raised at high stocking densities, farm-raised shrimp frequently suffer from disease and are given large quantities of antibiotics and chemicals. Shrimp feed contains high amounts of fish meal and farmers frequently collect larval and juvenile shrimp from the wild.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=159';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Shrimp (wild-caught, imported)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_1.gif';");
        theWindow.document.write("para = 'Bottom trawls used to catch most imported shrimp damage benthic habitat and result in large amounts of bycatch, including commercially important fish species and endangered sea turtles. Tropical shrimp trawl fisheries lack adequate management and enforcement. Essentially annual crops, imported shrimp species are short-lived and highly fecund, although information on their abundance is lacking.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=158';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'New Zealand Tai Snapper')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_3.gif';");
        theWindow.document.write("para = 'Tai Snapper are found in subtropical regions of the western Pacific Ocean including New Zealand, Australia, China and Japan. In New Zealand, Tai Snapper are a commercially important fishery. Due to prudent fisheries management, most Tai Snapper populations are stable or recovering from their previously overfished status. Juvenile Tai Snapper inhabit muddy estuaries, while adults mostly inhabit rocky reefs, but are also found in mud and seagrass habitats. Most Tai Snapper are caught using longlines, which can result in the incidental catch of seabirds.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=181';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Snappers')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_1_flag1.gif';");
        theWindow.document.write("para = 'Snappers, of which there are many species throughout the world, grow slowly and have long lifespans, making them vulnerable to overfishing. Much remains unknown about the impacts of fisheries on snapper populations because management and monitoring is poor to nonexistent. Nonetheless, clear signs indicate that many snapper species are declining.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=30';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Rock Sole (U.S. and Canada)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Southern and Northern Rock Soles are commercially important Pacific groundfish species targeted by U.S. and Canadian trawl vessels. Rock Soles grow at a moderate rate and can live 22 years. Thanks to successful management measures, they are at high levels of abundance, but changes in oceanic conditions may cause Rock Sole populations to decline a little in the future. Destructive bottom trawling for Rock Soles fortunately takes place over their sand\\/mud habitats, which are not as damaged by trawling as other habitats.';");
        theWindow.document.write("linkage = '';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Dover Sole (U.S. and Canada)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Dover Sole is a long-lived, deep-dwelling species targeted by the commercially important Pacific groundfish fisheries. The population size of Dover Sole is below healthy levels, but good management and changes in oceanic conditions may enable the population to grow in the near future. Destructive bottom trawling for Dover Sole fortunately takes place over their sand\\/mud habitats, which are not as damaged by trawling as other habitats.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=7';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Petrale Sole (U.S. and Canada)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Petrale Sole are a commercially important Pacific groundfish species targeted by U.S. and Canadian trawl vessels. Petrale Sole grow at a moderate rate and can live 25 years. They are at a medium level of abundance, but tight management and changes in oceanic conditions may enable the population to grow in the near future. Destructive bottom trawling for Petrale Sole fortunately takes place over their sand\\/mud habitats, which   are not as damaged by trawling as other habitats.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=8';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Yellowfin Sole (U.S and Canada)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Yellowfin Sole is a commercially important Pacific groundfish species targeted by U.S. and Canadian trawl vessels. Yellowfin Sole grow at a slow rate and can live 31 years. Thanks to successful management measures, they are at high levels of abundance, but changes in oceanic conditions may cause the population to decline a little in the future. Destructive bottom trawling for Yellowfin Sole fortunately takes place over their sand\\/mud habitats, which are not as damaged by trawling as other habitats.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view? spc_id=5';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Atlantic Flounders and Soles')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_2.gif';");
        theWindow.document.write("para = 'Long-term overfishing and high bycatch plague Atlantic groundfish fisheries. Naturally vulnerable to fishing pressure, most Atlantic flounders and soles remain depleted. Strong management measures have helped Summer Flounder (fluke) rebound.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=1';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'California Spiny Lobster')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'The California Spiny Lobster fishery is a small, but locally important and largely sustainable fishery in southern California. Abundance of Spiny Lobsters off California varies with broad-scale changes in environmental conditions caused by El Nino and La Nina. State managers closely regulate commercial fishing for Spiny Lobster, but do not monitor recreational catches. Bycatch is low since ports on the wire-mesh Spiny Lobster traps generally allow undersize lobsters and other animals to escape.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=151';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Caribbean Spiny Lobster (Florida)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_3.gif';");
        theWindow.document.write("para = 'Caribbean Spiny Lobsters grow fast, are highly fecund, and can live up to 20 years. Centered in Florida, fishing pressure on Caribbean Spiny Lobsters in U.S. waters is heavy. Caribbean Spiny Lobsters in Florida waters exhibit a truncated size structure and commercial catches in recent years have been below the long-term average. Fishers use traps to catch Caribbean Spiny Lobsters, resulting in minimal bycatch. Concerns exist, however, about the widespread use of undersized Spiny Lobsters lieu of bait in Spin Lobster traps.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=154';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Argentine Squid')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Argentine Squid constitute much of the U.S. imported squid supply. They reproduce and die often within one year, a lifecycle that potentially buffers them from heavy fishing pressure. Changes in environmental conditions influence their population sizes from year-to-year. South American and Asian distant-water jigging vessels dominate the fishery, which mainly occurs off the coasts of Argentina and the Falkland Islands and in international waters. Little is known about bycatch in Argentine Squid fisheries, except that it includes small numbers of other squid species and finfish.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=21';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Market Squid')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Market Squid are short-lived and can withstand intensive fishing pressure at their spawning grounds off the California coast. But they are vulnerable to large-scale changes in the environment driven by El Nino Southern Oscillation events. Robust estimates of Market Squid abundance elude fisheries biologists and managers, which makes management of the population difficult at best.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=122';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Longfin Squid')");
        theWindow.document.write("{");
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Overfished in the late 1990s, Longfin Squid are now abundant in U.S. Atlantic waters thanks to their fast growth and short lifespan which enable them to withstand moderate fishing pressure. Historically, the domestic fishery for Longfin Squid was small, but the exclusion of foreign squid boats from U.S. waters and increases in international demand for squid have fostered an expansion in the U.S. fishery. Longfin Squid are now well-managed, but bycatch of marine mammals continues to marr the fishery.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?  spc_id=126';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Shortfin Squid')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Shortfin Squid grow quickly and reproduce at a young age, which helps their resilience to fishing pressure. They appear to be at a healthy level of abundance, but it varies from year to year due their short life span and sensitivity to environmental conditions. To protect against overfishing, managers limit the number of boats allowed in the fishery. In the U.S. Shortfin Squid is not sold for human consumption but is used for bait primarily in the Atlantic Cod fishery.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=103';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Striped Bass1')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_5_flag1.gif';");
        theWindow.document.write("para = 'Striped bass populations reached severe lows in the 1980s, but strong management has helped them rebound. Striped bass fisheries utilize a range of gears, many of which have minimal impacts on habitat such as hook and line gear and midwater gillnets. There is work underway to assess bycatch.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=2';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Hybrid Striped Bass (farmed)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Hybrid striped bass are a cross between striped bass and white bass. The predominant farming methods for this species are inland ponds and tanks, which lead to less water pollution and disease than other aquaculture methods for finfish (e.g. netpens).';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=60';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Caviar (Caspian Sea)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_1.gif';");
        theWindow.document.write("para = 'With a lifespan up to 100 years, Beluga sturgeon are naturally vulnerable to fishing pressure. Poor management, overfishing, pollution, and habitat destruction have contributed to severe population declines of this and other Caspian Sea sturgeon species. The high value of caviar has posed a major obstacle to stemming illegal trade in caviar.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=104';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Caviar (wild-caught, North America)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_1.gif';");
        theWindow.document.write("para = 'The wild sturgeon populations of the U.S. and Canada are suffering from overfishing and habitat degradation. Because these species are long-lived, and little is known about habitat requirements, recovery will be slow. Management is weak because coordination of management agencies is poor, and there is insufficient data on populations to determine sustainable catch levels.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=107';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Swordfish (Atlantic and Mediterranean)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_4_flag1.gif';");
        theWindow.document.write("para = 'Swordfish remain overfished in the North Atlantic, but stronger catch limits are resulting in signs of recovery. Most Swordfish are longline-caught, with high bycatch of marine mammals, sea turtles, and sharks.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=59';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Swordfish (Pacific)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_3_flag1.gif';");
        theWindow.document.write("para = 'While the abundance of Swordfish in the North Pacific appears to be high, the status of the species is unknown throughout the rest of the Pacific ocean. Management throughout the Pacific is inadequate. Most swordfish are longline-caught, with high bycatch.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=38';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Tilapia')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Tilapia require little fishmeal and fish oil in their feed. Most U.S. tilapia farms use low-risk re-circulating systems, which produce less pollution and minimize escapes compared to most foreign tilapia farms. Because tilapia are aggressive, non-native species, escapes that do occur contribute to the decline of freshwater fish populations.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=17';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Steelhead')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_2.gif';");
        theWindow.document.write("para = 'Sea-going members of the Rainbow Trout species, Steelhead return to natal hatching grounds to spawn, with a small percentage surviving to reproduce more than once. Wild Steelhead populations have declined significantly due to overfishing and habitat loss. Commercial fishing for Steelhead in the U.S. has been restricted to Native American tribes for decades. Hatcheries supply the majority of the Steelhead these  fishers  catch.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=149';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Rainbow Trout (farmed)')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_3.gif';");
        theWindow.document.write("para = 'Some problems with farming this species exist. Feed for Rainbow Trout contains relatively large amounts of fishmeal and fish oil. Most Rainbow Trout farms in the U.S. use freshwater flow-through systems (called raceways) and discharge partially   treated water into nearby waters. Rainbow Trout are native to the Pacific Northwest where the majority of U.S. farms are located.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=16';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Albacore Tuna, U.S. pole and troll caught')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Albacore tuna are a migratory, schooling fish with a high reproductive rate. Although the status of the population is uncertain, scientists recommend that fishing efforts remain stable or be reduced to maintain long-term abundance. Agencies that manage albacore fisheries have capped fishing efforts. Pole and troll fishing for albacore cause no habitat damage and result in a relatively small amount of bycatch.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=169';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Skipjack Tuna, pole-and-line-caught')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Skipjack Tuna have high fecundity and relatively fast growth rates, life history characteristics that have the potential to buffer fish populations from overfishing. But with catches accounting for half the annual global tuna supply, they are only at moderate levels of abundance. There is little bycatch associated with pole-and-line-caught Skipjack Tuna, making it a better alternative to purse-seine-caught tuna.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?  spc_id=105';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Yellowfin Tuna, pole- and troll-caught')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_5.gif';");
        theWindow.document.write("para = 'Yellowfin Tuna grow rapidly and have shorter lifespans than other tunas, qualities which potentially enable them to withstand high fishing pressure. They are found throughout the world\\'s tropical and sub-tropical oceans. Fishery managers consider populations of Yellowfin Tuna to be at healthy levels of abundance, but they are depleted compared with historic levels. Generally captured by purse-seine fisheries for the canned tuna market, Yellowfin Tuna are also captured in pole and troll fisheries, which produce little to no bycatch and are a model for selective fisheries.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?  spc_id=44';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Albacore Tuna, pole- and troll-caught')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Albacore Tuna are highly fecund predators found throughout the world\\'s temperate and tropical seas. Highly exploited in the North Atlantic, Albacore Tuna populations are at a medium to high level of abundance in other regions. Bycatch in these fisheries is low and does not include endangered species, like longline fisheries.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=49';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Bigeye Tuna, pole- and troll-caught')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_4_flag1.gif';");
        theWindow.document.write("para = 'Highly prized by the Japanese sashimi market, Bigeye Tuna are widely distributed in the Atlantic, Pacific, and Indian Oceans and mature at a moderate rate. Except for the Eastern Pacific population, managers consider Bigeye Tuna to be at medium to   high levels of abundance, but there are signs that populations are declining. Longline and purse-seine gears account for the majority of Bigeye Tuna landings and have high bycatch of non-targeted species, including sea turtles, seabirds, and marine mammals. Pole-and-line and troll-caught Bigeye Tuna is the best alternative, as these gear types do not have high levels of bycatch.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=47';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Skipjack Tuna, purse-seine-caught')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'Skipjack Tuna have high fecundity and relatively fast growth rates, life history characteristics that have the potential to buffer fish populations from overfishing. But with catches accounting for half the annual global tuna supply, they are only at moderate levels of abundance. Skipjack Tuna school with juvenile Yellowfin and Bigeye Tunas, and fishing vessels target these schools together. Tuna purse-seine fisheries interact with sea turtles and marine mammals. Pole-and-line-caught Skipjack Tuna is a better alternative, because this gear has no bycatch problems.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=54';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Yellowfin Tuna, purse-seine-caught')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_4_flag1.gif';");
        theWindow.document.write("para = 'Yellowfin Tuna grow rapidly and have shorter lifespans than many other tunas, qualities that potentially enable them to withstand high fishing pressure. They are found throughout the world\\'s tropical and sub-tropical oceans. Fishery managers consider populations of Yellowfin Tuna to be at healthy levels of abundance, but they are depleted compared with historic levels. Purse-seine-caught Yellowfin Tuna is processed by canneries into Chunk Light tuna, along with Skipjack and Bigeye Tuna. Setting nets around schools of dolphins and tuna remains a dominant technique for capturing Yellowfin Tuna in the Eastern Pacific. Although current regulations have greatly reduced the number of dolphins caught and killed annually, dolphin populations are not recovering.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=70';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Canned Tuna')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_3.gif';");
        theWindow.document.write("para = 'Although they\\'re quick to mature and found throughout the world\\'s oceans, some skipjack, yellowfin (chunk light) and albacore (chunk white) populations are declining due to heavy fishing pressure. Few regulations exist and purse seine nets catch large numbers of marlins, sharks, sea turtles, marine mammals, and young tunas. Despite U.S. Dolphin safe standards, dolphins are not recovering. Consumption advisory is for albacore tuna only.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=23';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Yellowfin Tuna, longline-caught')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_3_flag1.gif';");
        theWindow.document.write("para = 'Yellowfin Tuna grow rapidly and have shorter lifespans than many other tunas, qualities that potentially enable them to withstand high fishing pressure. They are found throughout the world\\'s tropical and sub-tropical oceans. Fishery managers consider populations of Yellowfin Tuna to be at healthy levels of abundance, but they are depleted compared with historic levels. Generally captured by purse-seine vessels for the canned tuna market, Yellowfin Tuna are also captured by longline vessels, which supply fresh Yellowfin Tuna, or Ahi, to seafood markets. Longline gear catches large numbers of unwanted animals, including marlins, sharks, sea turtles, and marine mammals.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=43';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Albacore Tuna, longline-caught')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_2_flag1.gif';");
        theWindow.document.write("para = 'Albacore Tuna are highly fecund predators found throughout the world\\'s temperate and tropical seas. Highly exploited in the North Atlantic, Albacore Tuna populations are at a medium to high level of abundance in other regions. The majority of the global Albacore Tuna supply is caught by longlines, which incidentally kill high numbers of seabirds, sea turtles, sharks, and other fish.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=48';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Bigeye Tuna, longline-caught')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_2_flag1.gif';");
        theWindow.document.write("para = 'Highly prized by the Japanese sashimi market, Bigeye Tuna are widely distributed in the Atlantic, Pacific, and Indian Oceans and mature at a moderate rate. Except for the Eastern Pacific population, managers consider Bigeye Tuna to be at medium to high levels of abundance, but there are signs that populations are declining. Longline gears account for the majority of Bigeye Tuna landings, and purse-seine vessels catch high numbers of juveniles. Both of these gear types have high bycatch of non-targeted species, including sea turtles, seabirds, and marine mammals. Pole-and-line and troll-caught Bigeye Tuna is the best alternative.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=46';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Atlantic Bluefin Tuna')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_1_flag1.gif';");
        theWindow.document.write("para = 'Exploited heavily for decades, the West Atlantic Bluefin Tuna population is Critically Endangered, and the East Atlantic population is Endangered. Fishers use surface gears, such as pole-and-line, harpoon, trap, longline, and purse-seine gears to target this highly valuable species. These gear types have low impact on habitat. Little is known about bycatch associated with directed Atlantic Bluefin Tuna purse-seine fisheries, but tuna longline fisheries catch high numbers of finfish, sea turtles, and marine mammals.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=131';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Wahoo')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_5_flag1.gif';");
        theWindow.document.write("para = 'Wahoo are found throughout the Atlantic, Pacific, and Indian Oceans and are prized by recreational fishers for their fighting behavior and by commercial fishers for the high price they bring at fish houses. Wahoo do not support a directed commercial fishery; instead, they are incidentally captured in small numbers in other fisheries. Managers in the eastern US recently implemented a precautionary plan to prevent future commercial fisheries that target Wahoo from developing.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=124';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Weakfish')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_flags/fish_5_flag1.gif';");
        theWindow.document.write("para = 'Weakfish support important commercial and recreational fisheries along the Atlantic coast of the U.S. They are quick to mature and highly prized for their their taste by seafood lovers and for their strong fighting behavior by anglers. Weakfish recovered from being overfished in the early 1990s and are currently at a high level of abundance.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=127';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Western Rock Lobster')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_4.gif';");
        theWindow.document.write("para = 'The first fishery certified by the Marine Stewardship Council, the Western Rock Lobster fishery of Australia remains a well-managed and sustainable fishery. Regular monitoring of juvenile lobster abundance allows managers to adjust fishing effort during periods of low recruitment. Although habitat effects are minimal, the occasional bycatch of sea lions, turtles and whales is of some concern.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=155';");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Yellowtail')");
        theWindow.document.write("{");       
        theWindow.document.write("gifUrl='http://www.blueocean.org/_gr/_seafood/key_1.gif';");
        theWindow.document.write("para = 'Japanese amberjack, also known as yellowtail, is one of the most economically important marine species farmed in Japan. Its high quality meat is sold as sashimi in Japan and around the world. Japanese amberjack farming can cause substantial water quality impacts in areas of intensive farming. The fish is farmed in net cages with little or no treatment of effluent, which has been linked to localized pollution and damaging red tide episodes. Farmers also feed raw fish to large individuals, increasing waste accumulation and further degrading water quality. The biggest concern in farming practices is the dependence on wild juveniles called mojako to stock farms. The abundance of mojako has fluctuated in recent years, threatening the longterm viability of Japanese amberjack farming and the wild population it depends on. However, research is underway to improve the quality of feed, raise the fish in a less polluting system, and improve the success of hatchery-raised fish, which may improve the environmental effects in the coming decades.';");
        theWindow.document.write("linkage = 'http://www.blueocean.org/seafood/seafood-view?spc_id=75';");
        theWindow.document.write("}");
                
        theWindow.document.write("document.lookupForm.theImg.src=gifUrl;");
        theWindow.document.write("document.lookupForm.textArea.value=para;");
        theWindow.document.write("document.getElementById('theLinkId').href=linkage;");
        
//close2
        theWindow.document.write("}");
        //after else...

//close1
        theWindow.document.write("}");
//        theWindow.document.write("");
//        theWindow.document.write("");
 //       theWindow.document.write("");
       /*
    ========new Option("Sports", "sportsvalue", true, false)
       */
//open1
        theWindow.document.write("function changeSelect(name) {");

        theWindow.document.write("document.lookupForm.seafoodList.options.length=0;");
        theWindow.document.write("document.lookupForm.seafoodList.options[0]=new Option('--Sub   Menu--', 'subMenu', true);");
        theWindow.document.write("document.lookupForm.seafoodList.options[1]=new Option('Return to Full List', 'returnToMain');");
        theWindow.document.write("var list = document.lookupForm.seafoodList;");
        theWindow.document.write("if(name == 'returnToMain')");    
        theWindow.document.write("{");
        theWindow.document.write("document.lookupForm.textArea.value='Please choose a species from the search bar.';");
        theWindow.document.write("document.lookupForm.theImg.src='http://www.blueocean.org/_gr/_flags/msclogo_small.gif';");
        theWindow.document.write("document.getElementById  ('theLinkId').href='http://www.blueocean.org';");
        theWindow.document.write("document.lookupForm.seafoodList.options.length=0;");
        theWindow.document.write("list.options[0]=new Option('--Select--', 'selecter', true);");
        theWindow.document.write("list.options[1]=new Option('Atlantic Herring', 'Atlantic Herring');");
        theWindow.document.write("list.options[2]=new Option('Barramundi', 'Barramundi');");
        theWindow.document.write("list.options[3]=new Option('Bluefish', 'Bluefish');");
        theWindow.document.write("list.options[4]=new Option('Capelin', 'Capelin');");
        theWindow.document.write("list.options[5]=new Option('Catfish', 'Catfish');");
        theWindow.document.write("list.options[6]=new Option('Caviar', 'Caviar');");
        theWindow.document.write("list.options[7]=new Option('Chilean Sea Bass', 'Chilean Sea Bass');");
        theWindow.document.write("list.options[8]=new Option('Cod', 'Cod');");
        theWindow.document.write("list.options[9]=new Option('Conch', 'Conch');");
        theWindow.document.write("list.options[10]=new Option('Crabs', 'Crabs');");
        theWindow.document.write("list.options[11]=new Option('Crawfish', 'Crawfish');");
        theWindow.document.write("list.options[12]=new Option('Eel', 'Eel');");
        theWindow.document.write("list.options[13]=new Option('Flounders', 'Flounders');");
        theWindow.document.write("list.options[14]=new Option('Groupers', 'Groupers');");
        theWindow.document.write("list.options[15]=new Option('Halibut', 'Halibut');");
        theWindow.document.write("list.options[16]=new Option('Hoki', 'Hoki');");
        theWindow.document.write("list.options[17]=new Option('Lingcod', 'Lingcod');");
        theWindow.document.write("list.options[18]=new Option('Lobster', 'Lobster');");
        theWindow.document.write("list.options[19]=new Option('Mackerel', 'Mackerel');");
        theWindow.document.write("list.options[20]=new Option('Mahimahi', 'Mahimahi');");
        theWindow.document.write("list.options[21]=new Option('Monkfish', 'Monkfish');");
        theWindow.document.write("list.options[22]=new Option('Mussels', 'Mussels');");
        theWindow.document.write("list.options[23]=new Option('Octopus', 'Octopus');");
        theWindow.document.write("list.options[24]=new Option('Orange Roughy', 'Orange Roughy');");
        theWindow.document.write("list.options[25]=new Option('Oreos', 'Oreos');");
        theWindow.document.write("list.options[26]=new Option('Oysters', 'Oysters');");
        theWindow.document.write("list.options[27]=new Option('Pollock', 'Pollock');");
theWindow.document.write("list.options[28]=new Option('Rockfish', 'Rockfish');");
theWindow.document.write("list.options[29]=new Option('Sablefish', 'Sablefish');");
theWindow.document.write("list.options[30]=new Option('Salmon', 'Salmon');");
theWindow.document.write("list.options[31]=new Option('Sardine', 'Sardine');");
theWindow.document.write("list.options[32]=new Option('Scallops', 'Scallops');");
theWindow.document.write("list.options[33]=new Option('Sea Bass', 'Sea Bass');");
theWindow.document.write("list.options[34]=new Option('Sea Urchin', 'Sea Urchin');");
theWindow.document.write("list.options[35]=new Option('Shark', 'Shark');");
theWindow.document.write("list.options[36]=new Option('Shrimp', 'Shrimp');");
theWindow.document.write("list.options[37]=new Option('Snapper', 'Snapper');");
theWindow.document.write("list.options[38]=new Option('Soles', 'Soles');");
theWindow.document.write("list.options[39]=new Option('Spiny Lobster', 'Spiny Lobster');");
theWindow.document.write("list.options[40]=new Option('Squid', 'Squid');");
theWindow.document.write("list.options[41]=new Option('Striped Bass', 'Striped Bass');");
theWindow.document.write("list.options[42]=new Option('Sturgeon', 'Sturgeon');");
theWindow.document.write("list.options[43]=new Option('Swordfish', 'Swordfish');");
theWindow.document.write("list.options[44]=new Option('Tilapia', 'Tilapia');");
theWindow.document.write("list.options[45]=new Option('Trout', 'Trout');");
theWindow.document.write("list.options[46]=new Option('Tuna', 'Tuna');");
theWindow.document.write("list.options[47]=new Option('Wahoo', 'Wahoo');");
theWindow.document.write("list.options[48]=new Option('Western Rock Lobster', 'Western Rock Lobster');");
theWindow.document.write("list.options[49]=new Option('Yellowtail', 'Yellowtail');");


        
        theWindow.document.write("}");

        theWindow.document.write("if(name == 'Caviar')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Caviar (Caspian Sea)', 'caspSea');");
        theWindow.document.write("list.options[3]=new Option('Caviar (wild-caught, North America)', 'nA');");
        theWindow.document.write("}");

        theWindow.document.write("if(name == 'Cod')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Lingcod (U.S. West Coast)', 'Lingcod (U.S. West Coast)');");
        theWindow.document.write("list.options[3]=new Option('Pacific Cod', 'Pacific Cod');");
        theWindow.document.write("list.options[4]=new Option('Icelandic Cod', 'Icelandic Cod');");
        theWindow.document.write("list.options[5]=new Option('Atlantic Cod (U.S. and Canada)', 'Atlantic Cod (U.S. and Canada)');");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Crabs')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Dungeness Crab', 'Dungeness Crab');");
        theWindow.document.write("list.options[3]=new Option('King Crabs', 'King Crabs');");
        theWindow.document.write("list.options[4]=new Option('Stone Crabs', 'Stone Crabs');");
        theWindow.document.write("list.options[5]=new Option('Blue Crab', 'Blue Crab');");
        theWindow.document.write("list.options[6]=new Option('Snow and Tanner Crabs (U.S. and Canada)', 'Snow and Tanner Crabs (U.S. and Canada)');");
        theWindow.document.write("}");        
        
        theWindow.document.write("if(name == 'Eel')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('American Eel', 'American Eel');");
        theWindow.document.write("list.options[3]=new Option('Steelhead', 'Steelhead');");
        theWindow.document.write("list.options[4]=new Option('Eel, Freshwater (farmed)', 'Eel, Freshwater (farmed)');");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Flounders')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Summer Flounder', 'Summer Flounder');");
        theWindow.document.write("list.options[3]=new Option('Atlantic Flounders and Soles', 'Atlantic Flounders and Soles');");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Halibut')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Pacific Halibut', 'Pacific Halibut');");
        theWindow.document.write("list.options[3]=new Option('Atlantic Halibut', 'Atlantic Halibut');");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Lobster')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('American Lobster (Maine and Canada)', 'American Lobster (Maine and Canada)');");
        theWindow.document.write("list.options[3]=new Option('California Spiny Lobster', 'California Spiny Lobster');");
        theWindow.document.write("list.options[4]=new Option('Western Rock Lobster (Australia)', 'Western Rock Lobster (Australia)');");
        theWindow.document.write("list.options[5]=new Option('Caribbean Spiny Lobster (Florida)', 'Caribbean Spiny Lobster (Florida)');");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Mackerel')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Atlantic Mackerel', 'Atlantic Mackerel');");
        theWindow.document.write("list.options[3]=new Option('Chub Mackerel', 'Chub Mackerel');");
        theWindow.document.write("list.options[4]=new Option('King Mackerel', 'King Mackerel');");
        theWindow.document.write("list.options[5]=new Option('Spanish Mackerel', 'Spanish Mackerel');");
        theWindow.document.write("list.options[6]=new Option('Cero Mackerel', 'Cero Mackerel');");       
        theWindow.document.write("}");

        theWindow.document.write("if(name == 'Mahimahi')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Mahimahi, pole- and troll-caught', 'Mahimahi, pole- and troll-caught');");
        theWindow.document.write("list.options[3]=new Option('Mahimahi, longline-caught', 'Mahimahi, longline-caught');");
        theWindow.document.write("}");        
        
        theWindow.document.write("if(name == 'Mussels')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Blue Mussel (farmed)', 'Blue Mussel (farmed)');");
        theWindow.document.write("list.options[3]=new Option('Green Mussel (farmed, New Zealand)', 'Green Mussel (farmed, New Zealand)');");
        theWindow.document.write("list.options[4]=new Option('Mediterranean Mussel (farmed)', 'Mediterranean Mussel (farmed)');");
        theWindow.document.write("}");        
        
        theWindow.document.write("if(name == 'Rockfish')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Rockfish (Alaska)', 'Rockfish (Alaska)');");
        theWindow.document.write("list.options[3]=new Option('Rockfish (U.S. West Coast)','Rockfish (U.S. West Coast)');");
        theWindow.document.write("}");         
        
        theWindow.document.write("if(name == 'Salmon')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Alaska Salmon', 'Alaska Salmon');");
        theWindow.document.write("list.options[3]=new Option('Pacific Salmon (California, Oregon, and Washington)', 'Pacific Salmon (California, Oregon, and Washington)');");
        theWindow.document.write("list.options[4]=new Option('Atlantic Salmon (farmed)', 'Atlantic Salmon (farmed)');");
        theWindow.document.write("}");  
        
        theWindow.document.write("if(name == 'Sardine')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Atlantic Herring (U.S. and Canadian)', 'Atlantic Herring (U.S. and Canadian)');");
        theWindow.document.write("list.options[3]=new Option('Sardines', 'Sardines');");
        theWindow.document.write("}"); 
        
        theWindow.document.write("if(name == 'Scallops')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Bay Scallop (farmed)', 'Bay Scallop (farmed)');");
        theWindow.document.write("list.options[3]=new Option('Icelandic Scallop', 'Icelandic Scallop');");
        theWindow.document.write("list.options[4]=new Option('Sea Scallop', 'Sea Scallop');");
        theWindow.document.write("}");  
        
        theWindow.document.write("if(name == 'Sea Bass')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Black Sea Bass (U.S. Mid-  Atlantic)', 'Black Sea Bass (U.S. Mid-Atlantic)');");
        theWindow.document.write("list.options[3]=new Option('Chilean Sea Bass', 'Chilean Sea Bass');");
        theWindow.document.write("}");    
        
        theWindow.document.write("if(name == 'Sea Urchin')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Green Sea Urchin (British Columbia)', 'Green Sea Urchin (British Columbia)');");
        theWindow.document.write("list.options[3]=new Option('Red Sea Urchin (British Columbia)',   'Red Sea Urchin (British Columbia)');");
        theWindow.document.write("list.options[4]=new Option('Sea Urchin Roe', 'Sea Urchin Roe');");
        theWindow.document.write("list.options[5]=new Option('Red Sea Urchin (California)', 'Red Sea Urchin (California)');");
        theWindow.document.write("}");        
        
        theWindow.document.write("if(name == 'Shark')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Sharks (U.S.)', 'Sharks (U.S.)');");
        theWindow.document.write("list.options[3]=new Option('Sharks (imported)', 'Sharks (imported)');");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Shrimp')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Northern Shrimp (Eastern Canada)', 'Northern Shrimp (Eastern Canada)');");
        theWindow.document.write("list.options[3]=new Option('Pink Shrimp', 'Pink Shrimp');");
        theWindow.document.write("list.options[4]=new Option('Shrimp (farmed, U.S.)', 'Shrimp (farmed, U.S.)');");
        theWindow.document.write("list.options[5]=new Option('Shrimp (farmed, imported)', 'Shrimp (farmed, imported)');");
        theWindow.document.write("list.options[6]=new Option('Shrimp (wild-caught, imported)', 'Shrimp (wild-caught, imported)');");
        theWindow.document.write("}");    
        
        theWindow.document.write("if(name == 'Snapper')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('New Zealand Tai Snapper', 'New Zealand Tai Snapper');");
        theWindow.document.write("list.options[3]=new Option('Snappers', 'Snappers');");
        theWindow.document.write("}");        
        
        theWindow.document.write("if(name == 'Soles')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Rock Sole (U.S. and Canada)', 'Rock Sole (U.S. and Canada)');");
        theWindow.document.write("list.options[3]=new Option('Dover Sole (U.S. and Canada)', 'Dover Sole (U.S. and Canada)');");
        theWindow.document.write("list.options[4]=new Option('Petrale Sole (U.S. and Canada)', 'Petrale Sole (U.S. and Canada)');");
        theWindow.document.write("list.options[5]=new Option('Yellowfin Sole (U.S and Canada)', 'Yellowfin Sole (U.S and Canada)');");
        theWindow.document.write("list.options[6]=new Option('Atlantic Flounders and Soles', 'Atlantic Flounders and Soles');");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Spiny Lobster')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('California Spiny Lobster', 'California Spiny Lobster');");
        theWindow.document.write("list.options[3]=new Option('Caribbean Spiny Lobster (Florida)', 'Caribbean Spiny Lobster (Florida)');");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Squid')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Argentine Squid', 'Argentine Squid');");
        theWindow.document.write("list.options[3]=new Option('Market Squid', 'Market Squid');");
        theWindow.document.write("list.options[4]=new Option('Longfin Squid', 'Longfin Squid');");
        theWindow.document.write("list.options[5]=new Option('Shortfin Squid', 'Shortfin Squid');");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Striped Bass')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Striped Bass', 'Striped Bass1');");
        theWindow.document.write("list.options[3]=new Option('Hybrid Striped Bass (farmed)', 'Hybrid Striped Bass (farmed)');");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Sturgeon')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Caviar (Caspian Sea)', 'Caviar (Caspian Sea)');");
        theWindow.document.write("list.options[3]=new Option('Caviar (wild-caught, North America)', 'Caviar (wild-caught, North America)');");
        theWindow.document.write("}");
        
        theWindow.document.write("if(name == 'Swordfish')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Swordfish (Atlantic and Mediterranean)', 'Swordfish (Atlantic and Mediterranean)');");
        theWindow.document.write("list.options[3]=new Option('Swordfish (Pacific)', 'Swordfish (Pacific)');");
        theWindow.document.write("}"); 
        
        theWindow.document.write("if(name == 'Trout')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Rainbow Trout (farmed)', 'Rainbow Trout (farmed)');");
        theWindow.document.write("list.options[3]=new Option('Steelhead', 'Steelhead');");
        theWindow.document.write("}"); 
        
                theWindow.document.write("if(name == 'Tuna')");
        theWindow.document.write("{");
        theWindow.document.write("list.options[2]=new Option('Albacore Tuna, U.S. pole and troll   caught', 'Albacore Tuna, U.S. pole and troll caught');");
        theWindow.document.write("list.options[3]=new Option('Skipjack Tuna, pole-and-line-  caught', 'Skipjack Tuna, pole-and-line-caught');");
        theWindow.document.write("list.options[4]=new Option('Yellowfin Tuna, pole- and troll-  caught', 'Yellowfin Tuna, pole- and troll-caught');");
        theWindow.document.write("list.options[5]=new Option('Albacore Tuna, pole- and troll-  caught', 'Albacore Tuna, pole- and troll-caught');");
        theWindow.document.write("list.options[6]=new Option('Bigeye Tuna, pole- and troll-  caught', 'Bigeye Tuna, pole- and troll-caught');");
        theWindow.document.write("list.options[7]=new Option('Skipjack Tuna, purse-seine-caught', 'Skipjack Tuna, purse-seine-caught');");
        theWindow.document.write("list.options[8]=new Option('Yellowfin Tuna, purse-seine-  caught', 'Yellowfin Tuna, purse-seine-caught');");
        theWindow.document.write("list.options[9]=new Option('Canned Tuna', 'Canned Tuna');");
        theWindow.document.write("list.options[10]=new Option('Yellowfin Tuna, longline-caught', 'Yellowfin Tuna, longline-caught');");
        theWindow.document.write("list.options[11]=new Option('Albacore Tuna, longline-caught', 'Albacore Tuna, longline-caught');");
        theWindow.document.write("list.options[12]=new Option('Bigeye Tuna, longline-caught', 'Bigeye Tuna, longline-caught');");
        theWindow.document.write("list.options[13]=new Option('Atlantic Bluefin Tuna', 'Atlantic Bluefin Tuna');");
        theWindow.document.write("}");       
        
        
        
        
//close1
        theWindow.document.write("}");
        theWindow.document.write("</script" + ">");
        theWindow.document.write("");

        theWindow.document.write("");
        theWindow.document.write("</head" + ">");
        theWindow.document.write("<body bgcolor='#FFFF99'>");
        theWindow.document.write("<fieldset>");
        theWindow.document.write("<legend><b>Seafood Information Tool</b></legend>");
        theWindow.document.write("<form action='' name='lookupForm'> "
+"<select name='seafoodList' onchange='lookupMultipleEntries()'>"
+"<option value='selecter'>--Select--</option>"
+"<option value='Atlantic Herring'>Atlantic Herring</option>"
+"<option value='Barramundi'>Barramundi</option>"
+"<option value='Bluefish'>Bluefish</option>"
+"<option value='Capelin'>Capelin</option>"
+"<option value='Catfish'>Catfish</option>"
+"<option value='Caviar'>Caviar</option>"
+"<option value='Chilean Sea Bass'>Chilean Sea Bass</option>"
+"<option value='Cod'>Cod</option>"
+"<option value='Conch'>Conch</option>"
+"<option value='Crabs'>Crabs</option>"
+"<option value='Crawfish'>Crawfish</option>"
+"<option value='Eel'>Eel</option>"
+"<option value='Flounders'>Flounders</option>"
+"<option value='Groupers'>Groupers</option>"
+"<option value='Halibut'>Halibut</option>"
+"<option value='Hoki'>Hoki</option>"
+"<option value='Lingcod'>Lingcod</option>"
+"<option value='Lobster'>Lobster</option>"
+"<option value='Mackerel'>Mackerel</option>"
+"<option value='Mahimahi'>Mahimahi</option>"
+"<option value='Monkfish'>Monkfish</option>"
+"<option value='Mussels'>Mussels</option>"
+"<option value='Octopus'>Octopus</option>"
+"<option value='Orange Roughy'>Orange Roughy</option>"
+"<option value='Oreos'>Oreos</option>"
+"<option value='Oysters'>Oysters</option>"
+"<option value='Pollock'>Pollock</option>"
+"<option value='Rockfish'>Rockfish</option>"
+"<option value='Sablefish'>Sablefish</option>"
+"<option value='Salmon'>Salmon</option>"
+"<option value='Sardine'>Sardine</option>"
+"<option value='Scallops'>Scallops</option>"
+"<option value='Sea Bass'>Sea Bass</option>"
+"<option value='Sea Urchin'>Sea Urchin</option>"
+"<option value='Shark'>Shark</option>"
+"<option value='Shrimp'>Shrimp</option>"
+"<option value='Snapper'>Snapper</option>"
+"<option value='Soles'>Soles</option>"
+"<option value='Spiny Lobster'>Spiny Lobster</option>"
+"<option value='Squid'>Squid</option>"
+"<option value='Striped Bass'>Striped Bass</option>"
+"<option value='Sturgeon'>Sturgeon</option>"
+"<option value='Swordfish'>Swordfish</option>"
+"<option value='Tilapia'>Tilapia</option>"
+"<option value='Trout'>Trout</option>"
+"<option value='Tuna'>Tuna</option>"
+"<option value='Wahoo'>Wahoo</option>"
+"<option value='Weakfish'>Weakfish</option>"
+"<option value='Western Rock Lobster'>Western Rock Lobster</option>"
+"<option value='Yellowtail'>Yellowtail </option>"
+"</select" + ">"
+" &nbsp; &nbsp; "
+"Status: &nbsp; &nbsp;"
+"<img src='http://www.blueocean.org/_gr/_flags/msclogo_small.gif' name='theImg' id='theImgId'   width='55' height='35'>"
+"<textarea name='textArea' rows='9' cols='50' style='font-family:Verdana;'>"
+"Please choose a species from the search bar. "
+"</textarea" + ">"
+"For more information about this species, <a href='http://www.blueocean.org' name='theLink'   target='_blank' id='theLinkId'>click here.</a>");
        theWindow.document.write("</form" + ">");
        theWindow.document.write("</fieldset" + ">");
        theWindow.document.write("</body" + ">");


}

//Creates the FEST Banner at the top of the page.
function makeFESTBanner()
{
    var checkLogo = document.getElementById('social_code_logo');
    if (checkLogo)
        return;
    else
    {
        var logo = document.createElement("div");
        logo.setAttribute('id', 'social_code_logo');
        logo.innerHTML = '<div style="margin: 0 auto 0 auto; '
        + 'border-bottom: 1px solid #000000; margin-bottom: 5px; '
        + 'font-size: small; background-color: #44CC55; '
        + 'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> '
        + 'This site is running a script from the Firefox Environmental Sustainability '
        + 'Toolkit (FEST). Please visit '
        + '<a href="http://lotus.calit2.uci.edu/fest/index.html">our homepage</a> '
        + 'for more information on FEST.'
        + '</p></div>';
				
        document.body.insertBefore(logo, document.body.firstChild);
    }
}
//Creates the Seafood Info Banner at the top of the page.
function makeSeafoodInfoBanner()
{
    var checkFishie = document.getElementById('seafood_info_banner');
    if (checkFishie)
        return;
    else
    {
        var banner = document.createElement("div");
        banner.setAttribute('id', 'seafood_info_banner');
        banner.innerHTML = '<div style="margin: 0 auto 0 auto; '
        + 'border-bottom: 1px solid #000000; margin-bottom: 5px; '
        + 'font-size: small; background-color: #FFFF99; '
        + 'color: #000000;"><p style="margin: 2px 0 1px 0;"> '
        + '<b>Seafood Info</b> has detected that this site may be related to seafood. &nbsp; '
        + 'Would you like to launch the Seafood Information tool? &nbsp; '
        + '<input type="button" id="launchButtonID" value="Launch" name="launchButton">'
        + '</p></div>';
        
        document.body.insertBefore(banner, document.body.firstChild);
    }
}




function searchPage(bodyText, searchTerm) 
{
  var newText = "";
  var i = -1;
  var lcSearchTerm = searchTerm.toLowerCase();
  var lcBodyText = bodyText.toLowerCase();
    
  while (bodyText.length > 0) {
    i = lcBodyText.indexOf(lcSearchTerm, i+1);
    if (i < 0) {
      newText += bodyText;
      bodyText = "";
    } else {
      // skip anything inside an HTML tag
      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
        // skip anything inside a <script> block
        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
            begin();
            break;
          newText += bodyText.substring(0, i)  + bodyText.substr(i, searchTerm.length);
          bodyText = bodyText.substr(i + searchTerm.length);
          lcBodyText = bodyText.toLowerCase();
          i = -1;
        }
      }
    }
  }
}

function begin()
{
    //The way these function calls are ordered,
    //the FEST banner will be above the Seafood Info banner.
    makeSeafoodInfoBanner();
    makeFESTBanner();
}

function findFishie(searchText)
{
    searchArray = [searchText];
  if (!document.body || typeof(document.body.innerHTML) == "undefined") {
    found = false;
  }
  
  var bodyText = document.body.innerHTML;
  for (var i = 0; i < searchArray.length; i++) {
    var result = searchPage(bodyText, searchArray[i]);
  }
  searchArray = ["fish"];
  for (var i = 0; i < searchArray.length; i++) {
    var result = searchPage(bodyText, searchArray[i]);
  }

}

//Starts the process.
findFishie('seafood');
var el = document.getElementById('launchButtonID');
el.addEventListener('click',launcher,false);