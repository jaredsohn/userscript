// ==UserScript==
// @name       Bot
// @namespace   http://userscripts.org
// @description Swords and Potions 2 Bot
// @include     
// @version     2014-01-17
// @grant       none
// ==/UserScript==
 
global Verbose
Verbose=0
global Reserve
Reserve=1000000
global MaxPrice
MaxPrice=1000000
import sys
global PIndex
import time
import random
global FromConsole
FromConsole=0
 
 
PIndex=9
 
if len(sys.argv)>1:
    PIndex=int(sys.argv[1])
    FromConsole=1
if not FromConsole:
    Verbose=3
#aeno33, davliu
 
global PlayerData
global playerID
global client
 
global DesiredClasses
#DesiredClasses={'barbarian':1121532}
 
def GetPlayerData():
    global ID
    global PlayerData
    global playerID
    global client
    ID=7
    client='f726152cfa9b491960ad89d0df0'+str(random.randint(10000,99999))
    if PIndex==0:#aeno33
        playerID='5802223'
        PlayerData='{"method":"KongregateLogin","params":[{"user_id":6121613,"anonymous_id":"7a48e3eb48ff71783462ac6b671d7578","game_auth_token":"2ce2c54f7f1549787a245f67a6b4717e10b0df62cbc3cca424885fb8f7b05a03"}],"client_version":"16412","id":2,"time":'+str(int(time.time()*1000))+',"client_id":"'+client+'"}'
    elif PIndex==1:#JohnC
        playerID='0'
        PlayerData='######'
    elif PIndex==2:#dauntilus
        playerID='0'
        PlayerData='######'
    elif PIndex==3:#Town King?
        playerID='5860622'
        PlayerData='{"method":"KongregateLogin","params":[{"game_auth_token":"8dabfddd4dae5c4b3ad33a2295940964938d98b8dcadce4b09be8d65ac7c197c","user_id":12852015}],"client_version":"16412","id":2,"time":'+str(int(time.time()*1000))+',"client_id":"'+client+'"}'
    elif PIndex==4:#Gorkalax
        playerID='5860680'
        PlayerData='{"method":"KongregateLogin","params":[{"game_auth_token":"11915f2a6a194c6f93346e1d0fb7d913f82cc90a83de33a28435241851254110","user_id":12852226}],"client_version":"16412","id":2,"time":'+str(int(time.time()*1000))+',"client_id":"'+client+'"}'
    elif PIndex==5:#Belzbut
        playerID='5852643'
        PlayerData='{"method":"KongregateLogin","params":[{"user_id":12879476,"anonymous_id":"7a48e3eb48ff71783462ac6b671d7578","game_auth_token":"d39b0d505e911137b6ff6b1cb20f3b3d817cfda28857a2cbb3e15961ca725a69"}]'
        PlayerData+=',"client_version":"16412","id":2,"time":'+str(int(time.time()*1000))+',"client_id":"'+client+'"}'
    elif PIndex==6:#wtfgoingon
        playerID='5871027'
        PlayerData='{"method":"KongregateLogin","params":[{"user_id":12879576,"anonymous_id":"7a48e3eb48ff71783462ac6b671d7578","game_auth_token":"7aa0997ed5ca9aefdfe5d5a2609e103db55fd82ac6ee41b21928c31acd92b626"}]'
        PlayerData+=',"client_version":"16412","id":2,"time":'+str(int(time.time()*1000))+',"client_id":"'+client+'"}'
    elif PIndex==7:#lastlmgof
        playerID='5871038'
        PlayerData='{"method":"KongregateLogin","params":[{"user_id":12879606,"anonymous_id":"7a48e3eb48ff71783462ac6b671d7578","game_auth_token":"732c8970632522314532fba0b42151b355f556ea962566ed3d5c0c5f96feede9"}]'
        PlayerData+=',"client_version":"16412","id":2,"time":'+str(int(time.time()*1000))+',"client_id":"'+client+'"}'
    elif PIndex==8:#dalmon
        playerID='5887736'
        PlayerData='{"method":"KongregateLogin","params":[{"user_id":12930844,"anonymous_id":"7a48e3eb48ff71783462ac6b671d7578","game_auth_token":"cdc542ead607ec594aa4e537955a14aff8a82cbc63f200339fb942b66462abc9"}]'
        PlayerData+=',"client_version":"16412","id":2,"time":'+str(int(time.time()*1000))+',"client_id":"'+client+'"}'
    elif PIndex==9:#guestacct
        playerID='5897053'
        PlayerData='{"client_id":"'+client+'","params":[{"username":"a2578a96750203e647171801ebfe4bb8","password":"a2578a96750203e647171801ebfe4bb8"}]'
        PlayerData+=',"client_version":"16412","id":2,"time":'+str(int(time.time()*1000))+',"method":"GuestLogin"}'
    return PlayerData#
def vPrint(x):
    if Verbose:
        print x
 
class PriorityQueue:
  """
    Implements a priority queue data structure. Each inserted item
    has a priority associated with it and the client is usually interested
    in quick retrieval of the lowest-priority item in the queue. This
    data structure allows O(1) access to the lowest-priority item.
  """
   
  def __init__(self):
    """
      heap: A binomial heap storing [priority,item]
      lists.
     
      dict: Dictionary storing item -> [priorirty,item]
      maps so we can reach into heap for a given
      item and update the priorirty and heapify
    """
    self.heap = []
    self.dict = {}
     
  def push(self,item,priority):
    """
        Sets the priority of the 'item' to
    priority. If the 'item' is already
    in the queue, then its key is changed
    to the new priority, regardless if it
    is higher or lower than the current
    priority.
    """
    if item in self.dict:
      self.dict[item][0] = priority
      heapq.heapify(self.heap)
    else:
      pair = [priority,item]
      heapq.heappush(self.heap,pair)
      self.dict[item] = pair
     
  def getPriority(self,item):
    """
        Get priority of 'item'. If
    'item' is not in the queue returns None
    """
    if not item in self.dict:
      return None
    return self.dict[item][0]
     
  def pop(self):
    """
      Returns lowest-priority item in priority queue, or
      None if the queue is empty
    """
    if self.isEmpty(): return None
    (priority,item) = heapq.heappop(self.heap)
    del self.dict[item]
    return item  
 
  def isEmpty(self):
    """
        Returns True if the queue is empty
    """
    return len(self.heap) == 0
 
def RefreshSession():
 
    data='input='+codify(GetPlayerData())
    url='http://www.edgebee.com/shopr2/client_action'
    q=mecGet(url,data)
    q=q.read()
    global NightData
    try:
        NightData=json.loads(q)
    except:
        q=zlib.decompress(q, 16+zlib.MAX_WBITS)
        NightData=json.loads(q)
    if ('result' not in NightData) or len(NightData['result'])==1:
        print NightData
        return 0
    global InstancetoCatID
    InstancetoCatID={}
    global itemMap
    global IDtoCat
    for i in NightData['result']['player']['item_instances']:
        itemMap[IDtoCat[i['item_id']]][i['item_id']].instance=i['id']
        itemMap[IDtoCat[i['item_id']]][i['item_id']].count=i['count']
        InstancetoCatID[i['id']]=[IDtoCat[i['item_id']],i['item_id']]
    global ses
    global ID
    ses=str(NightData['result']['session'])
    ID=3
   
    NewData=NightData
    global Cash
    Cash=NightData['result']['player']['money']
    global MaxPrice
    MaxPrice=Cash
    global Level
    global Reserve
    Level=NightData['result']['player']['level']
    Exp=NightData['result']['player']['_xp']
    print PIndex, Level, Cash, Exp
    if Level<40:
        Reserve=10000
    if Level<40:
        Reserve=0
    global Modules
    global AllRecipes
    global Unresearched
    global ResearchNow
    #Modules={}
    AllRecipes={}
    Unresearched=[]
    ResearchNow={}
    global ActiveWorkers
    global ActiveCodenames
    global AllCodenames
    global resource
    resource=getResource(NightData)
    ActiveWorkers={}
    ActiveCodenames={}
    AllCodenames={}
    global AllWorkers
    AllWorkers={}
    global Protected
    global ProtectedQuantity
    Protected=[]
    global DesiredItems
    DesiredItems=[]
    if PIndex==1:
        needed=[90]
        for i in needed:
            if itemMap[IDtoCat[i]][i].count<150:
                DesiredItems.append(i)
            Protected.append(i)
 
    global DesiredClasses
    DesiredClasses={}
    if NightData['result']['player']['group']['name']=="BestVilleUSA":
        for i in NightData['result']['player']['group']['improvement_instances']:
            if i['state']==1:
                impID=i['improvement_id']
                for k in StaticData['result']['improvements'][impID-1]['requirements']:
                    if k['character_codename']!=None:
                        DesiredClasses[k['character_codename']]=i['id']
                    if k['item_id']!=0:
                        if itemMap[IDtoCat[k['item_id']]][k['item_id']].count<k['amount']:
                            DesiredItems.append(k['item_id'])
    global longRunDesired
    longRunDesired={}
    if PIndex==3:
        for i in StaticData['result']['improvements'] :
            for j in i['requirements']:
                if j['item_id']!=0:
                    longRunDesired[j['item_id']]=j['amount']
       
    vPrint(DesiredClasses)
    global ModuleFamilies
    global ModuleFamilyMap
    ModuleFamilies=[]
    ModuleFamilyMap={}
    for i in StaticData['result']['modules']:
        if i['parent_id']!= 0 and i['disabled']==False:
            ID1=i['parent_id']
            ID2=i['id']
            if ID1 in ModuleFamilyMap:
                if not ID2 in ModuleFamilyMap[ID1]:
                    ModuleFamilyMap[ID1].append(ID2)
                    ModuleFamilyMap[ID2]=ModuleFamilyMap[ID1]
            elif ID2 in ModuleFamilyMap:
                ModuleFamilyMap[ID2].append(ID1)
                ModuleFamilyMap[ID1]=ModuleFamilyMap[ID2]
            else:
                ModuleFamilies.append([ID1,ID2])
                ModuleFamilyMap[ID1]=ModuleFamilies[-1]
                ModuleFamilyMap[ID2]=ModuleFamilies[-1]
 
    for worker in NewData['result']['player']['worker_instances']:
        if worker['is_hired']:
            ActiveWorkers[worker['worker_id']]=Worker(worker['worker_id'], worker['id'], StaticData['result']['character_classes'][StaticData['result']['workers'][worker['worker_id']-1]['character_class_id']-1]['codename'])
            ActiveCodenames[StaticData['result']['character_classes'][StaticData['result']['workers'][worker['worker_id']-1]['character_class_id']-1]['codename']]=worker['worker_id']
        AllCodenames[StaticData['result']['character_classes'][StaticData['result']['workers'][worker['worker_id']-1]['character_class_id']-1]['codename']]=worker['worker_id']
        AllWorkers[worker['worker_id']]=Worker(worker['worker_id'], worker['id'], StaticData['result']['character_classes'][StaticData['result']['workers'][worker['worker_id']-1]['character_class_id']-1]['codename'])
 
    global MyModules
    MyModules=[]
    global MyModulesMap
    MyModulesMap={}
    global MyModulesInstanceMap
    MyModulesInstanceMap={}
    for module in NewData['result']['player']['module_instances']:
        ModuleID=module['module_id']
        MyModulesInstanceMap[module['id']]=[module['module_id'],module['level']]
        if not ModuleID in MyModulesMap:
            MyModules.append([Module(module['module_id'], module['level'],module['id'])])
            if ModuleID in ModuleFamilyMap:
                for i in ModuleFamilyMap[ModuleID]:
                    MyModulesMap[i]=MyModules[-1]
            else:
                MyModulesMap[ModuleID]=MyModules[-1]
        else:
            MyModulesMap[ModuleID].append(Module(module['module_id'], module['level'],module['id']))
    for recipe in NewData['result']['player']['recipe_instances']:
        if recipe['researched_count']==0:
            Unresearched.append(recipe['recipe_id'])
        AllRecipes[recipe['recipe_id']]=Recipe(recipe['id'],recipe['researched_count'])
    for item in NewData['result']['player']['item_instances']:
        if item['item_id'] in AllRecipes:
            AllRecipes[item['item_id']].crafted=item['crafted']
            AllRecipes[item['item_id']].itemLongID=item['id']
    for i in Unresearched:
        recipeData=StaticData['result']['recipes'][i-1]
        if  recipeData['worker_codename'] in ActiveCodenames:
            ModuleID=recipeData['module_id']
            if ModuleID in MyModulesMap:
                for j in MyModulesMap[ModuleID]:
                    if j.ModuleID > ModuleID:
                        ResearchNow[i]=recipeData
                    elif j.ModuleID==ModuleID and j.ModuleLevel>=recipeData['module_level']:
                        ResearchNow[i]=recipeData
    for i in ResearchNow:
        1
        vPrint("Research "+str(itemMap[IDtoCat[i]][i].name))
 
    global WhatToMake
    WhatToMake=[[],[],[]]
    for unlock in  StaticData['result']['recipe_unlocks']:
        if unlock['crafted_item_id'] in AllRecipes and not unlock['recipe_id'] in AllRecipes:
            WhatToMake[0].append(unlock['crafted_item_id'])
           
    for i in longRunDesired:
        Protected.append(i)
        if itemMap[IDtoCat[i]][i].count < longRunDesired[i]:
            WhatToMake[0].insert(0,i)
    for i in DesiredItems:
        WhatToMake[0].insert(0,i)
        Protected.append(i)
    ProtectedQuantity={}
    global ListofJobs
    ListofJobs=[]
 
    for unlock in  StaticData['result']['recipe_unlocks']:
        if not unlock['recipe_id'] in AllRecipes:
            NeedToMake=unlock['crafted_item_id']
            Quantity=unlock['crafted_item_count']
            Parts=StaticData['result']['recipes'][NeedToMake-1]['components']
            for i in Parts:
                if i['resource_id']==0:
                    ComponentItem=i['item_id']
                    Q2=Quantity*i['quantity']
                    if not ComponentItem in ProtectedQuantity:
                        ProtectedQuantity[ComponentItem]=Q2
                    else:
                        ProtectedQuantity[ComponentItem]+=Q2
    for ComponentItem in ProtectedQuantity:
        if itemMap[IDtoCat[ComponentItem]][ComponentItem].count<ProtectedQuantity[ComponentItem]:
            Protected.append(ComponentItem)
    for i in Protected:
        recipe=StaticData['result']['recipes'][i-1]
        for part in recipe['components']:
            if part['resource_id']==0:
                if not part['item_id'] in Protected:
                    Protected.append(part['item_id'])
    UsedResources=[]
    global Burn
    Burn=[]
    for i in resource:
        if resource[i]>MaxRes[i]*0.8 and not i in Burn:
            Burn.append(i)
    if (Level<75 and PIndex!=3):
        Burn=range(1,16)
    SearchingWide=0
    #print Burn
    while 1:
        potential=[]
        ItemQueue=PriorityQueue()
        for i in AllRecipes:
            if SearchingWide or i in Protected:
                recipeData=StaticData['result']['recipes'][i-1]
                #if can make
                if recipeData['worker_codename'] in ActiveCodenames:
                    ModuleID=recipeData['module_id']
                    if ModuleID in MyModulesMap:
                        for j in MyModulesMap[ModuleID]:
                            if j.ModuleID > ModuleID or (j.ModuleID==ModuleID and j.ModuleLevel>=recipeData['module_level']):
                                BadFlag=0
                                for j in recipeData['components']:
                                    if j['resource_id']==0:
                                        BadFlag=1
                                    if j['resource_id'] not in Burn:
                                        BadFlag=1
                                if BadFlag:
                                    continue
                                price=StaticData['result']['items'][i-1]['price']
                                ItemQueue.push(i,-price)
        while not ItemQueue.isEmpty():
            i=ItemQueue.pop()
            WhatToMake[2].append(i)
        if SearchingWide:
            break
        else:
            SearchingWide=1
##        i=ItemQueue.pop()
##        if i ==None:
##            if SearchingWide:
##                break
##            else:
##                SearchingWide=1
##                continue
##        WhatToMake[2].append(i)
##        for j in StaticData['result']['recipes'][i-1]['components']:
##            Burn.remove(j['resource_id'])
#Assign modules to workers
#    WhatToMake[0].append(169)
    global WorkerNeeds
    WorkerNeeds={}
    for WhatSub in WhatToMake:
        for i in WhatSub:
            recipeData=StaticData['result']['recipes'][i-1]
            Components=[]
            for j in recipeData['components']:
                if j['resource_id']==0:
                    Components.append(j['item_id'])
            if len(Components)>0:
                BadFlag=0
                for j in range(501,515):
                    if j in Components:
                        BadFlag=1
                if BadFlag:
                    #print "Skipping Rare Ingredient"
                    continue
                for j in Components:
                    if itemMap[IDtoCat[j]][j].count<5 and j not in WhatToMake[1]:
                        #print itemMap[IDtoCat[j]][j].count
                        #print itemMap[IDtoCat[j]][j].name +' to make '+itemMap[IDtoCat[i]][i].name
                        WhatToMake[1].append(j)
            if AllCodenames[recipeData['worker_codename']] in ActiveWorkers:
                WorkerID=AllWorkers[AllCodenames[recipeData['worker_codename']]].ID
                ModuleID=recipeData['module_id']
                ModuleLevel=recipeData['module_level']
                if not WorkerID in WorkerNeeds:
                    WorkerNeeds[WorkerID]=[]
                if not (ModuleID,ModuleLevel) in WorkerNeeds[WorkerID]:
                    WorkerNeeds[WorkerID].append((ModuleID,ModuleLevel))
 
    global ModuleAssignments
    #print WorkerNeeds
    ModuleAssignments={}
    TakenModules=[]
    WorkerList=[]
    for i in ActiveWorkers:
        WorkerList.append(i)
    random.shuffle(WorkerList)
    #print WorkerList
    #print WorkerList
    #print WorkerNeeds
    for i in WorkerList:
        WorkerLongID=AllWorkers[i].longID
        if not WorkerLongID in ModuleAssignments:
            ModuleAssignments[WorkerLongID]={}
        while 1:
            if i not in WorkerNeeds or len(WorkerNeeds[i])==0:
                break
            need = max(WorkerNeeds[i])
            WorkerNeeds[i].remove(need)
            if need[0] in ModuleAssignments[WorkerLongID] or (need[0] not in MyModulesMap):
                continue
            else:
                PotentialModules=MyModulesMap[need[0]]
                ModuleQueue=PriorityQueue()
                for j in PotentialModules:
                    if not j.InstanceID in TakenModules:
                        if j.ModuleID>need[0] or (j.ModuleID==need[0] and j.ModuleLevel>= need[1]):
                            ModuleQueue.push(j, (100*j.ModuleID + j.ModuleLevel))
                BestModule=ModuleQueue.pop()
                if BestModule==None:
                    1
                else:
                    MatchingModules=ModuleFamilyMap[need[0]]
                    for j in MatchingModules:
                        if j<= BestModule.ModuleID:
                            ModuleAssignments[WorkerLongID][j]=BestModule.InstanceID
                            TakenModules.append(BestModule.InstanceID)
 
    #print ModuleAssignments
    for WhatSub in WhatToMake:
        for i in WhatSub:
            recipeData=StaticData['result']['recipes'][i-1]
            RecipeID=i
            if (RecipeID not in AllRecipes) or (AllRecipes[RecipeID].researched==0):
                continue
            WorkerInstanceID=AllWorkers[AllCodenames[recipeData['worker_codename']]].longID
            ResourceTypes=[]
            ResourceQuantity=[]
            Components=[]
            for j in recipeData['components']:
                if j['resource_id']>0:
                    ResourceTypes.append(j['resource_id'])
                    ResourceQuantity.append(j['quantity'])
                else:
                    Components.append(j['item_id'])
            if len(Components)>0:
                temp=[]
                BadFlag=0
                for j in range(501,515):
                    if j in Components:
                        BadFlag=1
                if BadFlag:
                    #print "Skipping Rare Ingredient"
                    continue
                for j in Components:
                    if itemMap[IDtoCat[j]][j].count<5 and j not in WhatToMake[1]:
                        #print itemMap[IDtoCat[j]][j].count
                        #print itemMap[IDtoCat[j]][j].name +' to make '+itemMap[IDtoCat[RecipeID]][RecipeID].name
                        WhatToMake[1].append(j)
                    if not j in Protected:
                        Protected.append(j)
                    temp.append([itemMap[IDtoCat[j]][j].instance,0])
                Components=temp
            RecipeInstanceID=AllRecipes[RecipeID].longID
#What ModuleInstanceID, if any, can we use?
            if WorkerInstanceID in ModuleAssignments and recipeData['module_id'] in ModuleAssignments[WorkerInstanceID]:
                AssignedModule=MyModulesInstanceMap[ModuleAssignments[WorkerInstanceID][recipeData['module_id']]]
                if AssignedModule[0]>recipeData['module_id'] or (AssignedModule[0]==recipeData['module_id'] and AssignedModule[1]>=recipeData['module_level']):
                #p#rint [MyModulesInstanceMap[ModuleAssignments[WorkerInstanceID][recipeData['module_id']]], recipeData['module_level']]
                    ModuleInstanceID=ModuleAssignments[WorkerInstanceID][recipeData['module_id']]
                else:
                    continue
            else:
                #p#rint Name(RecipeID)
                continue
            ItemInstanceID=itemMap[IDtoCat[RecipeID]][RecipeID].instance
            Time=StaticData['result']['recipes'][i-1]['crafting_time']*100+100
            if Time==500:
                Time=700
            if Time==600:
                Time=1000
            #what im making
            #print [WorkerInstanceID,ResourceTypes,ResourceQuantity,1,RecipeID,RecipeInstanceID,ModuleInstanceID,0,ItemInstanceID,Time,Components,str(itemMap[IDtoCat[RecipeID]][RecipeID].name)]
            ListofJobs.append([WorkerInstanceID,ResourceTypes,ResourceQuantity,1,RecipeID,RecipeInstanceID,ModuleInstanceID,0,ItemInstanceID,Time,Components,str(itemMap[IDtoCat[RecipeID]][RecipeID].name)])
    #Possible List:
    MakeList=set(WhatToMake[0]+WhatToMake[1])
    global WorkerUsefulness
    WorkerUsefulness={}
    for i in MakeList:
        recipeData=StaticData['result']['recipes'][i-1]
        moduleID=recipeData['module_id']
        moduleLevel=recipeData['module_level']
        if not moduleID in MyModulesMap:
            continue
        potentialModules=MyModulesMap[moduleID]
        for j in potentialModules:
            if j.ModuleID>moduleID or (j.ModuleID==moduleID and j.ModuleLevel>= moduleLevel):
                havemats=1
                for component in recipeData['components']:
                    if component['resource_id']==0:
                        item=component['item_id']
                        if itemMap[IDtoCat[item]][item].count<5:
                            havemats=0
                if havemats:
                    if not recipeData['worker_codename'] in WorkerUsefulness:
                        WorkerUsefulness[recipeData['worker_codename']]=1
                    else:
                        WorkerUsefulness[recipeData['worker_codename']]+=1
                    break
                else:
                    1
                    #print "no mats"
    for i in Unresearched:
        recipeData=StaticData['result']['recipes'][i-1]
        if  recipeData['worker_codename'] in AllCodenames:
            ModuleID=recipeData['module_id']
            if ModuleID in MyModulesMap:
                for j in MyModulesMap[ModuleID]:
                    if j.ModuleID > ModuleID or (j.ModuleID==ModuleID and j.ModuleLevel>=recipeData['module_level']):
                        if not recipeData['worker_codename'] in WorkerUsefulness:
                            WorkerUsefulness[recipeData['worker_codename']]=1
                        else:
                            WorkerUsefulness[recipeData['worker_codename']]+=1
                        break
    global sellBonusGold
    global sellBonusXP
    global craftBonus
   
    sellBonusGold=0
    sellBonusXP=0
    craftBonus=0
    for i in NightData['result']['player']['module_instances']:
        for j in StaticData['result']['modules'][i['module_id']-1]['modifiers']:
            if j['modifies']=='craft_xp.all':
                craftBonus+=j['add']
                if 'add_level' in j:
                    craftBonus+=j['add_level']*i['level']
            if j['modifies']=='sell_xp.all':
                sellBonusXP+=j['add']
                if 'add_level' in j:
                    sellBonusXP+=j['add_level']*i['level']
            if j['modifies']=='sell_price.all':
                sellBonusGold+=j['add']
                if 'add_level' in j:
                    sellBonusGold+=j['add_level']*i['level']
    #print [sellBonusGold, sellBonusXP, craftBonus]
    #refend
    huntcount=0
    global validhunts
    validhunts={}
    AllHunts=[]
    global QuestingCustomers
    QuestingCustomers=[]
    for i in NightData['result']['player']['hunt_instances']:
        if i['customer_id']!=0:
            huntcount+=1
        else:
            validhunts[i['hunt_id']]=i['id']
        AllHunts.append(i['hunt_id'])
    if huntcount<3:
        vPrint((3-huntcount," hunts available"))
        for i in StaticData['result']['hunts']:
            if i['id'] not in AllHunts and i['unlock_fame_level']<Level:
                GetNewQuest(i['id'])
        BestCustomers=PriorityQueue()
        for i in NightData['result']['player']['customer_instances']:
            if i['max_level']>5:
                #print i['customer_id'],i['max_level'],i['level']
                BestCustomers.push(i['customer_id'],-(i['max_level']-i['level'])*i['max_level'])
        while (not BestCustomers.isEmpty()) and (len(QuestingCustomers)<6):
            QuestingCustomers.append(BestCustomers.pop())
    global CustomerAffs
    CustomerAffs={}
    for i in NightData['result']['player']['customer_instances']:
            CustomerAffs[i['customer_id']]=i['shop_affinity']
    return 1
               
import os
import sys
import json
import Queue
import zlib
import urllib2
import gzip
import mechanize
import time
import urllib
global br
global craftBonus
global sellBonusXP
global sellBonusGold
sellBonusGold=4
sellBonusXP=3
craftBonus=2
import copy
 
class Module:
    def __init__(self,moduleID, moduleLevel,instanceID):
        self.ModuleID=moduleID
        self.ModuleLevel=moduleLevel
        self.InstanceID=instanceID
 
class Item:
    def __init__(self, Id, price, level, sellXP, buyPrice, name, craftXP):
        self.id=Id
        self.price=price
        self.level=level
        self.sellXP=sellXP
        self.count=0
        self.instance=0
        self.buyPrice=buyPrice
        self.name=name
        self.craftXP=craftXP
 
 
global itemMap
global IDtoCat
global NameDict
itemMap={}
IDtoCat={}
NameDict={}
StaticData=json.loads(open('realdata.txt','r').read())
for i in StaticData['result']['assets']:
    NameDict[i['id']]=i['value']
for i in StaticData['result']['items']:
    if not i['type'] in itemMap:
        itemMap[i['type']]={}
    name=NameDict[i["name_id"]]
    itemMap[i['type']][i['id']]=Item(i['id'],i['price'],i['level'],i['sell_xp'],i['purchase_price'],name, i['craft_xp'])
    IDtoCat[i['id']]=i['type']
 
global ClassesUse
ClassesUse={}
for i in StaticData['result']['character_classes']:
    if i['items_mask']!=0:
        if not i['id'] in ClassesUse:
            ClassesUse[i['id']]=[]
        n=0
        valid=bin(i['items_mask'])[2:]
        while n<len(valid):
            if valid[-n-1]=='1':
                ClassesUse[i['id']].append(2**n)
            n+=1
 
br = mechanize._mechanize.Browser()
#br.set_proxies({"http":'localhost:8888'})
cj = mechanize.LWPCookieJar()
br.set_cookiejar(cj)
br.set_handle_robots(False)
def codify(S):
    S=urllib.quote(S)
    S=S.replace("_",'%5F')
    return S
def mecGet(url, data='', cookies=0):
    #print data
    if data=='':
        req=mechanize.Request(url)
    else:
        req=mechanize.Request(url, data)
        req.add_header('Content-Length',len(data))
    if cookies!=0:
        req.add_header('Cookie',cookies)
    req.add_header('Host','www.edgebee.com')
    req.add_header('Connection','keep-alive')
   
    req.add_header('Origin','http://dluw3bk7cxwyu.cloudfront.net')
    req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36")
    req.add_header('content-type', 'application/x-www-form-urlencoded')
    req.add_header('Accept', '*/*')
    req.add_header("Referer", "http://dluw3bk7cxwyu.cloudfront.net/static/shopr2_flash_16412.swf")
   
    req.add_header('Accept-Encoding', 'gzip,deflate,sdch')
    req.add_header('Accept-Language','en-US,en;q=0.8')
    while 1:
        try:
            response = br.open(req, timeout=15)
            break
        except:
            continue
    return response
 
global ID
global ses
 
global index
global prodIndex
index=-1
prodIndex=0
global tick
tick=5
 
def Name(n):
    return itemMap[IDtoCat[n]][n].name
def Count(n):
    return itemMap[IDtoCat[n]][n].count
def Maker(n):
    return StaticData['result']['recipes'][i-1]['worker_codename']
import random
 
class Recipe:
    def __init__(self, longID, researched):
        self.longID=longID
        self.researched=researched
class Worker:
    def __init__(self, ID, longID, codeName):
        self.longID=longID
        self.ID=ID
        self.codeName=codeName
       
 
 
 
def Inc():
    global ID
    ID=ID+1
    global index
    index=index+1
def ProdInc():
    global prodIndex
    prodIndex=prodIndex+1
 
def SellItem(price, instance, itemID, xp, customer):
    Inc()
    data='{"client_version":"16412","id":%s,"time":%s,"params":[{"session":%s,"tick":%s,"data":{"price":%i,"item_instance_id":%i,"item_instance_temp_id":0,"item_id":%i,"xp":%i,"customer_id":%i},"player_id":%s,"index":%i,"event":"SellItemEvent"}],"method":"AddPredictedCommand","client_id":"%s"}'%(str(ID),str(int(time.time()*1000)),ses,str(tick),price, instance, itemID, xp, customer,playerID,index,client)
    #print data
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
   
def SellSuggest(price, instance, itemID, xp, customer):
    Inc()
    data='{"client_version":"16412","id":%s,"time":%s,"params":[{"session":%s,"tick":%s,"data":{"price":%i,"item_instance_id":%i,"item_instance_temp_id":0,"item_id":%i,"xp":%i,"customer_id":%i},"player_id":%s,"index":%i,"event":"SuggestItemEvent"}],"method":"AddPredictedCommand","client_id":"%s"}'%(str(ID),str(int(time.time()*1000)),ses,str(tick),price, instance, itemID, xp, customer,playerID,index,client)
    #print data
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
 
def BuyItem(price, instance,customer):
    Inc()
    data='{"client_version":"16412","id":%s,"time":%s,"params":[{"session":%s,"tick":%s,"data":{"price":%i,"item_instance_temp_id":0,"item_instance_id":%i,"customer_id":%i},"player_id":%s,"index":%i,"event":"CustomerBuyItemEvent"}],"method":"AddPredictedCommand","client_id":"%s"}'%(str(ID),str(int(time.time()*1000)),ses,str(tick),price, instance, customer,playerID,index,client)
    #print data
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
 
def BuyNewItem(price,customer):
    Inc()
    data='{"client_version":"16412","id":%s,"time":%s,"params":[{"session":%s,"tick":%s,"data":{"price":%i,"item_instance_temp_id":1,"item_instance_id":0,"customer_id":%i},"player_id":%s,"index":%i,"event":"CustomerBuyItemEvent"}],"method":"AddPredictedCommand","client_id":"%s"}'%(str(ID),str(int(time.time()*1000)),ses,str(tick),price, customer,playerID,index,client)
    #print data
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
 
 
def ResearchStart(worker, recipeID, recipeInstance, moduleInstance, itemInstance):
    global tick
    #print index
    Inc()
    ProdInc()
    data='{"client_version":"16412","id":%s,"time":%s,"params":[{"session":%s,"tick":%s,"data":{"is_research":true,"component_item_instance_ids":[],"resource_ids":[],"index":%i,"resource_amounts":[],"recipe_id":%i,"worker_instance_id":%i,"recipe_instance_id":[%i,0]},"player_id":%s,"index":%i,"event":"QueueCraftingEvent"}],"method":"AddPredictedCommand","client_id":"%s"}'%(str(ID),str(int(time.time()*1000)),ses,str(tick),prodIndex, recipeID, worker, recipeInstance,playerID,index,client)
    #print data
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
 
    tick=tick+5
    Inc()
    data='{"client_version":"16412","id":%s,"time":%s,"params":[{"session":%s,"tick":%s,"data":{"is_research":true,"queue_slot_index":%i,"module_instance_id":%i,"recipe_id":%i,"worker_instance_id":%i,"recipe_instance_id":[%i,0]},"player_id":%s,"index":%i,"event":"StartCraftingEvent"}],"method":"AddPredictedCommand","client_id":"%s"}'%(str(ID),str(int(time.time()*1000)),ses,str(tick), prodIndex,moduleInstance, recipeID, worker, recipeInstance,playerID,index,client)
    #print data
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
 
   
def ResearchEnd(worker, recipeID, recipeInstance, moduleInstance, itemInstance):
    Inc()
    data='{"client_version":"16412","id":%s,"time":%s,"params":[{"session":%s,"tick":%s,"data":{"worker_instance_id":%i,"xp":0,"item_instance_id":[%i,0],"recipe_instance_id":%i},"player_id":%s,"index":%i,"event":"EndCraftingEvent"}],"method":"AddPredictedCommand","client_id":"%s"}'%(str(ID),str(int(time.time()*1000)),ses,str(tick),worker, itemInstance,recipeInstance,playerID,index,client)
    #print data
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
 
def ContributeCustomer(customer, module):
    Inc()
    data='{"method":"AddPredictedCommand","params":[{"tick":%i,"data":{"requirement_index":0,"improvement_id":%i,"customer_id":%i},"player_id":%s,"index":%i,"session":%s,"event":"SendOnCityEvent"}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'\
          %(tick,module,customer,playerID,ID,ses,ID,str(int(time.time()*1000)),client)
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
 
 
 
   
def MakeItemCompoundQueue(X):
    resourceID,recipe1,worker,recipe2,module,XP,itemIndex,components=X
    resourceAmount=str(range(150, 150+len(resourceID)))
    #print index
    Inc()
    ProdInc()
    data='{"client_version":"16412","id":%s,"time":%s,"params":[{"session":%s,"tick":%s,"data":{"is_research":false,"component_item_instance_ids":%s,"resource_ids":%s,"index":%i,"resource_amounts":%s,"recipe_id":%i,"worker_instance_id":%i,"recipe_instance_id":[%i,0]},"player_id":%s,"index":%i,"event":"QueueCraftingEvent"}],"method":"AddPredictedCommand","client_id":"%s"}'%(str(ID),str(int(time.time()*1000)),ses,str(tick),str(components),str(resourceID), prodIndex,resourceAmount,recipe1,worker,recipe2,playerID,index,client)
    #print data
    data='input='+codify(data)
    #print [index,prodIndex]
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
def GetNewQuest(questID):
    Inc()
    data='{"method":"AddPredictedCommand","params":[{"session":%s,"data":{"hunt_id":%i},"index":%i,"tick":1,"player_id":%s,"event":"AckNewHuntEvent"}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'%(ses, questID,index, playerID, ID, str(int(time.time()*1000)), client)
    #data='{"method":"AddPredictedCommand","params":[{"session":%s,"data":{"quest_id":%i, "improvement_id":0},"index":%i,"tick":1,"player_id":%s,"event":"AckNewQuestEvent"}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'%(ses, questID,index, playerID, ID, str(int(time.time()*1000)), client)
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
 
 
def MakeItemStart(X,prodID):
    resourceID,recipe1,worker,recipe2,module,XP,itemIndex,components=X
    Inc()
    data='{"client_version":"16412","id":%s,"time":%s,"params":[{"session":%s,"tick":%s,"data":{"is_research":false,"queue_slot_index":%i,"module_instance_id":%i,"recipe_id":%i,"worker_instance_id":%i,"recipe_instance_id":[%i,0]},"player_id":%s,"index":%i,"event":"StartCraftingEvent"}],"method":"AddPredictedCommand","client_id":"%s"}'%(str(ID),str(int(time.time()*1000)),ses,str(tick), prodID,module,recipe1,worker,recipe2,playerID,index,client)
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
def MakeItemEnd(X):
    resourceID,recipe1,worker,recipe2,module,XP,itemIndex,components=X
    Inc()
    if itemIndex>0:
        data='{"client_version":"16412","id":%s,"time":%s,"params":[{"session":%s,"tick":%s,"data":{"worker_instance_id":%i,"xp":%i,"item_instance_id":[%i,0],"recipe_instance_id":%i},"player_id":%s,"index":%i,"event":"EndCraftingEvent"}],"method":"AddPredictedCommand","client_id":"%s"}'%(str(ID),str(int(time.time()*1000)),ses,str(tick),worker, XP, itemIndex,recipe2,playerID,index,client)
    else:
        #print "NEW ITEM!!!"
        data='{"client_version":"16412","id":%s,"time":%s,"params":[{"session":%s,"tick":%s,"data":{"worker_instance_id":%i,"xp":%i,"item_instance_id":[%i,1],"recipe_instance_id":%i},"player_id":%s,"index":%i,"event":"EndCraftingEvent"}],"method":"AddPredictedCommand","client_id":"%s"}'%(str(ID),str(int(time.time()*1000)),ses,str(tick),worker, XP, itemIndex,recipe2,playerID,index,client)
       
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
 
def StartDay():
    #print
    #print "Starting Day"
    Inc()
    global tick
    tick=10
    data='{"client_version":"16412","id":'+str(ID)+',"time":'+str(int(time.time()*1000))+',"params":[{"session":'+ses+'}],"method":"StartDay","client_id":"'+client+'"}'
    data='input='+codify(data)
    return mecGet('http://www.edgebee.com/shopr2/client_action',data)
 
def GetMail():
    Inc()
    data='{"method":"GetMessages","params":[{"session":%s}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'%(ses,ID,str(int(time.time()*1000)),client)
    data='input='+codify(data)
    q=mecGet('http://www.edgebee.com/shopr2/client_action',data).read()
    try:
        q=json.loads(q)
    except:
        q=zlib.decompress(q, 16+zlib.MAX_WBITS)
        q=json.loads(q)
    return q
 
def JoinLatestInvite():
    q=GetMail()['result']['messages']
    if q[-1]['subject']=="City Invitation" and len(q[-1]['attachments'])>0:
        Inc()
        data='{"method":"ExecuteAttachment","params":[{"attachment_id":%i,"session":%s,"data":1}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'%(q[-1]['attachments'][0]['id'],ses,ID,str(int(time.time()*1000)),client)
        data='input='+codify(data)
        mecGet('http://www.edgebee.com/shopr2/client_action',data)
    else:
        print "No valid invitation"
def InviteToTown(player):
    Inc()
    data='{"method":"GroupInvitePlayer","params":[{"session":%s,"name":"%s"}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'%(ses,player,ID,str(int(time.time()*1000)),client)
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_action',data)
 
 
   
def EndDay():
    Inc()
    data='{"client_version":"16412","id":'+str(ID)+',"time":'+str(int(time.time()*1000+800000))+',"params":[{"session":'+ses+',"new_recipe_instances":[]}],"method":"EndDay","client_id":"'+client+'"}'
    data='input='+codify(data)
    q=mecGet('http://www.edgebee.com/shopr2/client_action',data).read()
    if len(q)<4000:
        print "failed"
def getResource(data):
    global MaxRes
    MaxRes={}
    n=1
    vals={}
    for i in data['result']['events']:
        if i['__type__']=="ResourceUpdateEvent":
            MaxRes[n]=i['max_count']
            vals[n]=i['count']+2
            n=n+1
    return vals
def GetQuest(cust, hunt, id1,id2,id3):
    Inc()
    i1='0,0'
    i2='0,0'
    i3='0,0'
    if id1!=0 and id1<500:
        i1=str(itemMap[IDtoCat[id1]][id1].instance)+',0'
    elif id1!=0 and id1>500:
        i1=str(itemMap[IDtoCat[id1]][id1].instance)+',0'
        if i1=='0,0':
            i1='0,1'
    if id2!=0 and id2<500:
        i2=str(itemMap[IDtoCat[id2]][id2].instance)+',0'
    elif id2!=0 and id2>500:
        i2=str(itemMap[IDtoCat[id2]][id2].instance)+',0'
        if i2=='0,0':
            i2='0,1'
    if id3!=0 and id3<500:
        i3=str(itemMap[IDtoCat[id3]][id3].instance)+',0'
    elif id3!=0 and id3>500:
        i3=str(itemMap[IDtoCat[id3]][id3].instance)+',0'
        if i3=='0,0':
            i3='0,1'
    data='{"method":"AddPredictedCommand","params":[{"tick":%s,"data":{"customer_id":%i,"item_instance3_id":[%s],"item_instance2_id":[%s],"hunt_id":%i,"item_instance1_id":[%s]},"player_id":%s,"index":%i,"session":%s,"event":"AckHuntResultEvent"}],"client_version":"16412","id":%s,"time":%s,"client_id":"%s"}'%(str(tick),cust,i3,i2, hunt, i1,playerID, index,ses,str(ID),str(int(time.time()*1000)),client)
    #print data
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
 
class Job():
    def __init__(self,time,params,duration,compl=0):
        self.type="J"
        self.state=0
        self.time=time
        self.params=params
        self.duration=duration
        self.compl=compl
class Customer:
    def __init__(self, price, instance, itemID, sellXP, customerID, tick):
        self.type="C"
        self.price=price
        self.instance=instance
        self.itemID=itemID
        self.sellXP=sellXP
        self.customerID=customerID
        self.tick=tick
    def __repr__(self):
        return str([self.price, self.instance, self.itemID, self.sellXP, self.customerID, self.tick])
    def __str__(self):
        return self.__repr__()
class Purchase:
    def __init__(self, price, instance, customerID, tick, itemID,new=0):
        self.type="P"
        self.price=price
        self.instance=instance
        self.customerID=customerID
        self.tick=tick
        self.new=new
        self.itemID=itemID
class Quester:
    def __init__(self, customerID, huntID, ID1, ID2, ID3, tick):
        self.type="Q"
        self.customerID=customerID
        self.huntID=huntID
        self.ID1=ID1
        self.ID2=ID2
        self.ID3=ID3
        self.tick=tick
class Contributer:
    def __init__(self, customerID, improvementID, tick):
        self.type="T"
        self.tick=tick
        self.customerID=customerID
        self.improvementID=improvementID
class SendQuestor:
    def __init__(self,item1,item2,item3, huntID,customerID, tick):
        self.item1=item1
        self.item2=item2
        self.item3=item3
        self.huntID=huntID
        self.customerID=customerID
        self.tick=tick
        self.type="SQ"
def SendQuesterPacket(i):
    Inc()
    instance1=itemMap[IDtoCat[i.item1]][i.item1].instance
    instance2=itemMap[IDtoCat[i.item2]][i.item2].instance
    instance3=itemMap[IDtoCat[i.item3]][i.item3].instance
    data='{"method":"AddPredictedCommand","params":[{"tick":%i,"data":{"item_instance3_temp_id":0,"item3_id":%i,"item_instance3_id":%i,"item_instance1_temp_id":0,"item_instance2_id":%i,"item_instance2_temp_id":0,"item_instance1_id":%i,"item2_id":%i,"hunt_id":%i,"item1_id":%i,"customer_id":%i},"player_id":%s,"index":%i,"session":%s,"event":"SendOnHuntEvent"}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'%(tick,i.item3, instance3, instance2,instance1, i.item2, i.huntID, i.item1, i.customerID, playerID,  index,  ses, ID, str(int(time.time()*1000)), client)
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_fast_action',data)
   
       
def Run():
    finishProgressJobs()
    global Cash
    global resource
    global tick
    global itemMap
    t=time.time()
    q=StartDay()
    q=q.read()
    try:
        data=json.loads(q)
    except:
        data=zlib.decompress(q, 16+zlib.MAX_WBITS)
        data=json.loads(data)
    resource=getResource(data)
    #resource=[100,100,100,100,100,100,100,100,100,100,100,100,100,100,]
    worker1Timer=5
    stack=PriorityQueue()
    stack2=PriorityQueue()
    customers=data['result']['events'][0]['visiting_customers']
    ClassModuleMap={}
    for i in DesiredClasses:
        for j in StaticData['result']['character_classes']:
            if j['codename']==i:
                ClassModuleMap[j['id']]=DesiredClasses[i]
   
    SentToday=0
    for i in customers:
        itemStack=PriorityQueue()
        cat=i['items_mask']
       
        custID=i['customer_id']
        #print custID
        if (i['customer_id'] in QuestingCustomers) and (SentToday==0) and (len(validhunts)>0) and (i['type']!=6) and Level>10:
            CustData=StaticData['result']['customers'][i['customer_id']-1]
            CustClass=CustData['character_class_id']
            CanUse=ClassesUse[CustClass]
            QuestQueue=PriorityQueue()
            for j in validhunts:
                HuntData=StaticData['result']['hunts'][j-1]
                if HuntData['min_level']<=i['level']+5:
                    #print j, HuntData['min_level']
                    QuestQueue.push(j, -HuntData['min_level'])
            GoingTo=QuestQueue.pop()
            if GoingTo==None:
                continue
            SentToday=1
            ## [GoingTo, validhunts[GoingTo]]
            #print i['customer_id']
            #Find Armor:
            UseItems=[]
            for j in [[0,512],[1000,4194304],[16777216,268435456]]:
                ItemQueue=PriorityQueue()
                for useclass in CanUse:
                    if useclass>=j[0] and useclass<=j[1]:
                        for item in itemMap[useclass]:
                            if itemMap[useclass][item].count>0:
                                ItemQueue.push(item, -itemMap[useclass][item].price)
                UseItems.append(ItemQueue.pop())
            #print UseItems
            #for j in UseItems:
            #    print Name(j)
            vPrint("Sending Questor")
            stack.push(SendQuestor(UseItems[0],UseItems[1],UseItems[2],GoingTo, i['customer_id'],i['enter_tick']+5),i['enter_tick']+5)
               
        elif StaticData['result']['customers'][custID-1]['character_class_id'] in ClassModuleMap and (i['type']!=6):
            print 'potential customer found'
            stack.push(Contributer(i['customer_id'],ClassModuleMap[StaticData['result']['customers'][custID-1]['character_class_id']], i['enter_tick']+5), int(i['enter_tick']+5))
        elif i['type']==1:
            happ=CustomerAffs[i['customer_id']]
            if happ<10:
                thresh=.1
            elif happ<25:
                thresh=.25
            elif happ<75:
                thresh=.5
            else:
                thresh=.74
 
            if i['suggest_roll']>thresh: #No suggest
                for j in itemMap[cat]:
                    if itemMap[cat][j].count>1 and i['level']>=itemMap[cat][j].level and (not j in Protected or (Level<75 and PIndex!=3)):
                        itemStack.push(Customer(itemMap[cat][j].price+sellBonusGold,
                         itemMap[cat][j].instance,
                         itemMap[cat][j].id,
                         itemMap[cat][j].sellXP+sellBonusXP,
                          i['customer_id'],int(i['enter_tick']+5)), -itemMap[cat][j].price)
                bestItem=itemStack.pop()            
                if bestItem==None:
                    #vPrint('cant sell')
                    #print cat,i['level']            
                    continue
                #print bestItem.sellXP
                vPrint('selling '+Name(bestItem.itemID))
                itemMap[cat][bestItem.itemID].count-=1
                stack.push(bestItem, bestItem.tick)
            else:
                CustData=StaticData['result']['customers'][i['customer_id']-1]
                valid=bin(CustData['items_mask'])[2:]
                n=0
                CanUse=[]
                while n<len(valid):
                    if valid[-n-1]=='1':
                        CanUse.append(2**n)
                    n+=1
                for cat in CanUse:
                    for j in itemMap[cat]:
                        if itemMap[cat][j].count>1 and i['level']>=itemMap[cat][j].level and (not j in Protected or (Level<75 and PIndex!=3)):
                            itemStack.push(Customer(itemMap[cat][j].price+sellBonusGold,
                             itemMap[cat][j].instance,
                             itemMap[cat][j].id,
                             itemMap[cat][j].sellXP+sellBonusXP,
                              i['customer_id'],int(i['enter_tick']+5)), -itemMap[cat][j].price)
                bestItem=itemStack.pop()  
                if bestItem==None:
                    #vPrint('cant suggest!!')
                    #print CustData
                    #print i['level']
                    #print CanUse
                    #print cat,i['level']            
                    continue
                vPrint('suggesting '+Name(bestItem.itemID))
                itemMap[IDtoCat[bestItem.itemID]][bestItem.itemID].count-=1
                bestItem.type='S'
                stack.push(bestItem, bestItem.tick)            
        elif i['type']==7:
            if itemMap[IDtoCat[i['item_id']]][i['item_id']].buyPrice<Cash:
                Cash-=itemMap[IDtoCat[i['item_id']]][i['item_id']].buyPrice
                if itemMap[IDtoCat[i['item_id']]][i['item_id']].instance>0:
                    stack.push(Purchase(itemMap[IDtoCat[i['item_id']]][i['item_id']].buyPrice,itemMap[IDtoCat[i['item_id']]][i['item_id']].instance, i['customer_id'],int(i['enter_tick']+5),i['item_id']),int(i['enter_tick']+5))
                else:
                    #print "New item"
                    #print itemMap[IDtoCat[i['item_id']]][i['item_id']].buyPrice
                    stack.push(Purchase(itemMap[IDtoCat[i['item_id']]][i['item_id']].buyPrice,-1,i['customer_id'],int(i['enter_tick']+5),i['item_id'],1),int(i['enter_tick']+5))
            else:
                1
                #print "not enough to buy for "+str(itemMap[IDtoCat[i['item_id']]][i['item_id']].buyPrice)
        elif i['type']==6:
            vPrint( "Quest returned")
            custID=i['customer_id']
            huntID=i['hunt_id']
            loots=[i['hunt_instance']['loot1_awarded'],i['hunt_instance']['loot2_awarded'],i['hunt_instance']['loot3_awarded']]
            lootData=StaticData['result']['hunts'][huntID-1]['loots']
            ID1=0
            ID2=0
            ID3=0
            if loots[0]==1 and lootData[0]['item_id']!=0:
                ID1=lootData[0]['item_id']
            if loots[1]==1 and lootData[1]['item_id']!=0:
                ID2=lootData[1]['item_id']
            if loots[2]==1 and lootData[2]['item_id']!=0:
                ID3=lootData[2]['item_id']
            stack.push(Quester(custID,huntID,ID1,ID2,ID3,i['enter_tick']+5),int(i['enter_tick']+5))        
        else:
            1
            #print "New type?"
            #print i['type']
#    #print asdfk
    workerTimer={}
    resource=getResource(data)
    for i in NightData['result']['player']['worker_instances']:
        if i['is_hired']:
            workerTimer[i['id']]=0
##    ListofJobs=[]
##    #ListofJobs.append([444752, [10, 4], [10, 4], 1, 187, 3226550, 8426388, 5, 0, 200, [], 'leather shoes']) #
##    ListofJobs.append([423257, [7], [2], 0, 244, 3226259, 8004431, 7, 0, 301, [], 'Suple Dust']) #Suple
##    ListofJobs.append([444752, [11, 10], [3, 1], 1, 208, 3229368, 8426388, 9, 4727448, 202, [], "apprentice's hat"]) #
##    ListofJobs.append([444752, [10], [4], 0, 163, 3226409, 8426388, 5, 0, 200, [], 'basic Tunic']) #
##    ListofJobs.append([423238, [1], [1], 0, 196, 3041887, 8004110, 4, 4451229, 200, [], 'iron bracers']) #
##    ListofJobs.append([423257, [4], [3], 0, 427, 3225597, 8004431, 5, 0, 200, []]) #basic staff
##    ListofJobs.append([423238, [1], [1], 0, 20, 3041888, 8004110, 4, 4451226, 200, []]) #dagger
##    #ListofJobs.append([444752, [4], [3], 0, 207, 3226408, 8426388, 4, 4726950, 200, [], 'circlet'])
##    #ListofJobs.append([423257, [7], [2], 0, 243, 3041995, 8004431, 4, 4451454, 200, []]) #bundle of herbs
##    #ListofJobs.append([444752, [10, 4], [1, 1], 1, 186, 3225637, 8426388, 4, 0, 200, []]) #Sandals
##    #ListofJobs.append([423238, [4], [1], 0, 376, 3041890, 8004110, 3, 4451227, 200, []]) #Club
    for i in ListofJobs:
        if len(i)==11:
            worker, resources, ResQuantity, compl, recipe1, recipe2, module, temp, itemIndex, timer, components= i
            name=''
        else:
            worker, resources, ResQuantity, compl, recipe1, recipe2, module, temp, itemIndex, timer, components, name= i
        if not i[0] in workerTimer:
            continue
        ResourceCondition=1
        for j in range(0,len(i[1])):
            if resource[i[1][j]]<i[2][j]:
                ResourceCondition=0
        ComponentCondition=1
        if len(components)>0:
            for j in components:
                componentInstance=j[0]
                if componentInstance==0:
                    ComponentCondition=0
                    continue
                cat, itemID = InstancetoCatID[componentInstance]
                if itemMap[cat][itemID].count>2:
                    itemMap[cat][itemID].count=0
                    #print "componenets good"
                    continue
                else:
                    ComponentCondition=0
        while workerTimer[i[0]]<= (1000-i[9]) and ResourceCondition and ComponentCondition:
            for j in range(0,len(i[1])):
                resource[i[1][j]]-= i[2][j]
                if resource[i[1][j]]<i[2][j]:
                    ResourceCondition=0
            if len(components)>0:
                for j in components:
                    componentInstance=j[0]
                    cat, itemID = InstancetoCatID[componentInstance]
                    if itemMap[cat][itemID].count>0:
                        itemMap[cat][itemID].count=0
                        itemMap[cat][itemID].count
                        continue
                    else:
                        ComponentCondition=0
            vPrint("Making item "+name)
            XP=itemMap[IDtoCat[recipe1]][recipe1].craftXP+craftBonus
            stack.push(Job(workerTimer[i[0]],[resources, recipe1, worker, recipe2, module, XP, itemIndex, str(components)], timer, compl), workerTimer[i[0]])
            workerTimer[i[0]]+= (timer+60)
    while not stack.isEmpty():
        i=stack.pop()
        if i.type=="S":
            vPrint("Suggesting " + itemMap[IDtoCat[i.itemID]][i.itemID].name)
            tick=i.tick
            SellSuggest(i.price, i.instance, i.itemID,i.sellXP,i.customerID)
        if i.type=="SQ":
            tick=i.tick
            SendQuesterPacket(i)
        if i.type=="T":
            tick=i.tick
            ContributeCustomer(i.customerID, i.improvementID)
        if i.type=="Q":
            tick=i.tick
            GetQuest(i.customerID,i.huntID,i.ID1,i.ID2,i.ID3)
        if i.type=="P":
            vPrint("Buying " + itemMap[IDtoCat[i.itemID]][i.itemID].name)
            #print i.price
            tick=i.tick
            if i.new:
                #print "Buying new item"
                BuyNewItem(i.price, i.customerID)    
            else:
                BuyItem(i.price, i.instance, i.customerID)        
        if i.type=='J':
            if i.state==0:
                #print "Queue item",Name(i.params[1])          
                tick=i.time
                MakeItemCompoundQueue(i.params)
                i.state=1
                i.prodID=prodIndex
                stack.push(i,i.time)
            elif i.state==1:
                #print "Start item",Name(i.params[1])    
                tick=i.time
                MakeItemStart(i.params, i.prodID)
                i.state=2
                stack.push(i,i.time+18+i.duration)
            elif i.state==2:
                #print "End item",Name(i.params[1])    
                tick=i.time+i.duration
                MakeItemEnd(i.params)
                itemMap[IDtoCat[i.params[1]]][i.params[1]].count += 1
                #print itemMap[IDtoCat[i.params[1]]][i.params[1]].count            #print [tick,ID, index, i.prodID, i.params[2],Name(i.params[1])]
        if i.type=="C":
            vPrint("Selling " + itemMap[IDtoCat[i.itemID]][i.itemID].name)
            #print i.price
            tick=i.tick
            SellItem(i.price, i.instance, i.itemID,i.sellXP,i.customerID)
            #
        #time.sleep(0.2)
    if time.time()-t<60:
        1
        #print "Out of time or resources, sleeping"
   # while time.time()-t<60:
   #     time.sleep(1)
   # print "Ending day"
   # EndDay()
    #time.sleep(1)
#while 1:
#    Run()
 
 
def DoAllResearch():
    for i in ResearchNow:
        RecipeID=i
        i=ResearchNow[i]
        WorkerInstanceID=ActiveWorkers[ActiveCodenames[i['worker_codename']]].longID
        RecipeInstanceID=AllRecipes[RecipeID].longID
 
#        ModuleInstanceID=ModuleAssignments[WorkerInstanceID][i['module_id']]
 
        moduleID=i['module_id']
        moduleLevel=i['module_level']
        potentialModules=MyModulesMap[moduleID]
        for j in potentialModules:
            if j.ModuleID>moduleID or (j.ModuleID==moduleID and j.ModuleLevel>= moduleLevel):
                ModuleInstanceID=j.InstanceID
                break
                   
       
        ItemInstanceID=itemMap[IDtoCat[RecipeID]][RecipeID].instance
        if ItemInstanceID==-1:
            ItemInstanceID=0
        ResearchStart(WorkerInstanceID, RecipeID, RecipeInstanceID, ModuleInstanceID, ItemInstanceID)
        StartDay()
        RefreshSession()
        StartDay()
        RefreshSession()
        StartDay()
        RefreshSession()
        StartDay()
        RefreshSession()
        StartDay()
        RefreshSession()
        StartDay()
        RefreshSession()
        StartDay()
        RefreshSession()
        StartDay()
        RefreshSession()
        StartDay()
        tick=999
        ResearchEnd(WorkerInstanceID, RecipeID, RecipeInstanceID, ModuleInstanceID, ItemInstanceID)
 
#RefreshSession()
def MoveModules(Rotations, Upgrades):
    #print "Move and Upgrades"
    Inc()
    if len(Upgrades)>0:
        upgraded_module_instances='['
        for i in range(0,len(Upgrades)):
            upgraded_module_instances=upgraded_module_instances+'{"id":%i,"pay_with_hammers":false}'%Upgrades[i]
            if i<len(Upgrades)-1:
                upgraded_module_instances=upgraded_module_instances+','
            else:
                upgraded_module_instances=upgraded_module_instances+']'
    else:
        upgraded_module_instances='[]'
    if len(Rotations)>0:
        RotationData=[]
        for i in Rotations:
            RotationData.append('{"rotation_value":%i,"iso_x":%i,"id":%i,"iso_y":%i}'%(i[0],i[1],i[2],i[3]))
        moved_module_instances='['
        for i in range(0,len(RotationData)):
            moved_module_instances=moved_module_instances+RotationData[i]
            if i<len(RotationData)-1:
                moved_module_instances=moved_module_instances+','
            else:
                moved_module_instances=moved_module_instances+']'
    else:
        moved_module_instances='[]'
    data='''{"method":"EditShop","params":[{"upgraded_module_instances":%s,"session":%s,"new_module_instances":[],"deleted_module_instances":[],"moved_module_instances":%s}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'''\
                                          %(upgraded_module_instances, ses, moved_module_instances, ID, str(int(time.time()*1000)), client)
    #print data
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_action',data)
def BigModuleUpgrade(newID, oldInstance):
    #print "Big Upgrade"
    Inc()
    data='{"method":"EditShop","params":[{"upgraded_module_instances":[],"session":%s,"new_module_instances":[{"temp_id":1,"iso_x":5,"pay_with_hammers":false,"rotation_value":0,"module_id":%i,"iso_y":5}],"deleted_module_instances":[%i],"moved_module_instances":[]}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'%(ses, newID,oldInstance,ID,str(int(time.time()*1000)), client)
    #print data
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_action',data)
def BuyNewModules(NewModules):
    #print "Buying New"
    Inc()
    n=1
    NewModulesData=[]
    for i in NewModules:
        NewModulesData.append('{"iso_x":5,"pay_with_hammers":false,"rotation_value":0,"module_id":%i,"iso_y":5,"temp_id":%i}'%(i, n))
        n=n+1
    new_module_instances='['
    for i in range(0,len(NewModulesData)):
        new_module_instances=new_module_instances+NewModulesData[i]
        if i<len(NewModulesData)-1:
            new_module_instances=new_module_instances+','
        else:
            new_module_instances=new_module_instances+']'
 
    data='''{"method":"EditShop","params":[{"upgraded_module_instances":[],"session":%s,"new_module_instances":%s,"deleted_module_instances":[],"moved_module_instances":[]}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'''\
                                          %(ses, new_module_instances, ID, str(int(time.time()*1000)), client)
    #print data
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_action',data)
   
 
def NightStuff():
    global Cash
    Cash=NightData['result']['player']['money']
    global Level
    Level=NightData['result']['player']['level']
    Collate=1
    if Collate:
        m=[]
        x=2
        y=2
        specialX=3
        specialY=3
        for i in NightData['result']['player']['module_instances']:
            #if i['iso_y']>10:
            #    continue
            if i['module_id']==118:
                continue
            if i['module_id']==124:
                #m.append([0,5,i['id'],0])
                continue
            if i['module_id']==125:
                #m.append([0,9,i['id'],0])
                continue
    ##            m.append([0,specialX,i['id'],specialY])
    ##            specialX+=3
    ##            if specialX>32:
    ##                specialX=0
    ##                specialY+=3
    ##            if specialY==30:
    ##                specialY=0
            else:
                x=i['state']*5
                if i['module_id']==64:
                    x=20
                m.append([0,x,i['id'],5])
                x=x+2
                if x>29:
                    x=2
                    y=y+3
        MoveModules(m,[])
    for i in ActiveWorkers:
        FireWorker(ActiveWorkers[i].longID)          
    for i in StaticData['result']['workers']:
        if i['id'] not in AllWorkers:
            if i['unlock_shop_fame']<=Level:
                if i['cost']<Cash:
                    HireWorker(i['id'])
                    Cash-= i['cost']
                    for i in ActiveWorkers:
                        FireWorker(ActiveWorkers[i].longID)
                    RefreshSession()
 
    ModuleCount={}
    for i in NightData['result']['player']['module_instances']:
        ModuleID=i['module_id']
        if not ModuleID in ModuleCount:
            ModuleCount[ModuleID]=1
        else:
            ModuleCount[ModuleID]+=1
 
       
    BuildQueue=[]
    n=0
    for i in StaticData['result']['modules']:
        if i['parent_id']==0 and i['disabled']==False and i['unlock_fame_level']<=Level:
            Max=i['maximum']
            Current=0
            if i['id'] in ModuleFamilyMap:
                family = ModuleFamilyMap[i['id']]
                for j in family:
                    if j in ModuleCount:
                        Current=Current+ModuleCount[j]
            elif i['id'] in ModuleCount:
                Current=ModuleCount[i['id']]
            while Current<Max and i['costs'][0]<Cash-Reserve and i['costs'][0]<MaxPrice:
                Current=Current+1
                Cash-=i['costs'][0]
                #print i['codename']
                BuildQueue.append(i['id'])
                n=n+1
    if len(BuildQueue)>0:
        BuyNewModules(BuildQueue)
       
    DoUpgrade=1
    if DoUpgrade:
        UpgradeList=[]
        for i in NightData['result']['player']['module_instances']:
            ModuleID=i['module_id']
            if i['level']<StaticData['result']['modules'][ModuleID-1]['max_upgrade_level'] and i['state']==3 and i['is_extra']==0:
                level=i['level']
                if StaticData['result']['modules'][ModuleID-1]['costs'][level]>0 and StaticData['result']['modules'][ModuleID-1]['costs'][level]<Cash-Reserve and StaticData['result']['modules'][ModuleID-1]['costs'][level] <MaxPrice:
                    Cash-=StaticData['result']['modules'][ModuleID-1]['costs'][level]
                    UpgradeList.append(i['id'])
        #print UpgradeList
        if len(UpgradeList)>0:
            MoveModules([],UpgradeList)
            #print UpgradeList
 
 
 
 
    #Upgrade BIG
    UpgradeTree={}
    for i in StaticData['result']['modules']:
        if i['parent_id']!= 0 and i['disabled']==False:
            UpgradeTree[i['parent_id']]=i['id']
    for i in NightData['result']['player']['module_instances']:
        ModuleID=i['module_id']
        if i['level']==StaticData['result']['modules'][ModuleID-1]['max_upgrade_level'] and i['state']==3 and i['is_extra']==0:
            if ModuleID in UpgradeTree:
                if StaticData['result']['modules'][UpgradeTree[ModuleID]-1]['costs'][0]>0 and StaticData['result']['modules'][UpgradeTree[ModuleID]-1]['costs'][0]<Cash-Reserve and StaticData['result']['modules'][UpgradeTree[ModuleID]-1]['costs'][0]<MaxPrice:
                    Cash-=StaticData['result']['modules'][ModuleID-1]['costs'][0]
                    print str(ModuleID)+" upgrades to "+str(UpgradeTree[ModuleID])
                    BigModuleUpgrade(UpgradeTree[ModuleID],i['id'])
#                    RefreshSession()
 
    for i in ActiveWorkers:
        FireWorker(ActiveWorkers[i].longID)
 
 
       
    bestQ=PriorityQueue()
    for i in WorkerUsefulness:
        bestQ.push(i,-WorkerUsefulness[i])
    BestWorkers=[bestQ.pop(),bestQ.pop(),bestQ.pop()]
    print BestWorkers
    if not ('sorceress' in BestWorkers or 'druid' in BestWorkers):
        if 'druid' in WorkerUsefulness:
            BestWorkers.append('druid')
        elif 'sorceress' in WorkerUsefulness:
            BestWorkers.append('sorceress')
        else:
            BestWorkers.append('druid')
    else: BestWorkers.append(bestQ.pop())
    #print BestWorkers
    for i in BestWorkers:
        if i!=None:
            HireWorker(AllCodenames[i])
    for i in AllWorkers:
        HireWorker(i)
def FireWorker(workerInstance):
    Inc()
    data='{"method":"FireWorker","params":[{"session":%s,"worker_instance_id":%i}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'%(ses, workerInstance,ID,str(int(time.time()*1000)), client)
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_action',data)
def HireWorker(workerID):
    Inc()
    data='{"method":"HireWorker","params":[{"improvement_id":0,"worker_id":%i,"session":%s,"pay_with_gold":true}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'%(workerID,ses,ID,str(int(time.time()*1000)), client)
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_action',data)
 
def ContributeGold(instanceID):
    Inc()
    data='{"method":"ImprovementContribute","params":[{"session":%s,"improvement_instance_id":%i,"payment_type":0}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'%(ses,instanceID,ID,str(int(time.time()*1000)),client)
    data='input='+codify(data)
    q= mecGet('http://www.edgebee.com/shopr2/client_action',data).read()
   
    try:
        q=zlib.decompress(q, 16+zlib.MAX_WBITS)
    except:
        1
    return q
 
 
   
def ResumeNight():
    Inc()
    data='{"method":"ResumeNight","params":[{"session":%s}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'%(ses, ID, str(int(time.time()*1000)), client)
    data='input='+codify(data)
    q=mecGet('http://www.edgebee.com/shopr2/client_action',data).read()
    global NightData
    try:
        NightData=json.loads(q)
    except:
        q=zlib.decompress(q, 16+zlib.MAX_WBITS)
        NightData=json.loads(q)
 
def ContributeAll():
    if NightData['result']['player']['group']['name']=="BestVilleUSA":
        ResumeNight()
        for i in NightData['result']['events'][1]['city']['improvement_instances']:
            if i['state']==1:
                bug=0
                for k in StaticData['result']['improvements'][i['improvement_id']-1]['requirements']:
                    if k['item_id']!=0:
                        if itemMap[IDtoCat[k['item_id']]][k['item_id']].count==0:
                            bug=1
                    if k['character_codename']!=None:
                        bug=1
                if bug==0:
                    if k['amount']>4000:
                        k=max(40, k['amount']/10000)
                    else:
                        k=int(min(itemMap[IDtoCat[k['item_id']]][k['item_id']].count,k['amount'])/3)
                    #print i['id'],i['
                    print "Contributing ", k, " times"
                    for j in range(0,k):
                        q=ContributeGold(i['id'])
                        if len(q)<160:
                            break
def MoveandGive():
    global PIndex
    PIndex=3
    RefreshSession()
    InviteToTown("johnc188")
    PIndex=1
    RefreshSession()
    JoinLatestInvite()
    PIndex=4
    RefreshSession()
    InviteToTown("johnc188")
    PIndex=1
    RefreshSession()
 
   
def ClaimPrize():
    Inc()
    data='{"method":"ClaimGift","params":[{"session":%s}],"client_version":"16412","id":%i,"time":%s,"client_id":"%s"}'%(ses,ID,str(int(time.time()*1000)), client)
    data='input='+codify(data)
    mecGet('http://www.edgebee.com/shopr2/client_action',data)    
#MoveModules(m)
#print "done"  
#
 
    #resourceID,recipe1,worker,recipe2,module,XP,itemIndex,components=X
def finishProgressJobs():
    if len(NightData['result']['events'])==1:
        ClaimPrize()
        StartDay()
        RefreshSession()
    elif len(NightData['result']['events'])>0:
        DayIndex=NightData['result']['events'][0]['day_index']
    else:
         StartDay()
         RefreshSession()
         DayIndex=NightData['result']['events'][0]['day_index']
    NeedRefresh=0
    for i in NightData['result']['player']['worker_instances']:
        if i['is_hired'] and i['module_instance_id']!=0 and i['is_researching']==False:
            print 'asdf'
            if i['day_index']>DayIndex:
                #print "Gotta wait a long time for this"
                StartDay()
                RefreshSession()
                finishJobs()
            else:
                global tick
                tick=i['day_tick']
                RecipeID=i['recipe_id']
                recipeLongID=AllRecipes[RecipeID].longID
                XP=itemMap[IDtoCat[RecipeID]][RecipeID].craftXP+craftBonus
                itemInstance=itemMap[IDtoCat[RecipeID]][RecipeID].instance
                MakeItemEnd([0,0,i['id'], recipeLongID, i['module_instance_id'], XP, itemInstance,0])
                print 'Finishing Old Stuff'
                NeedRefresh=1
    if NeedRefresh:
        StartDay()
        RefreshSession()
    for i in NightData['result']['player']['queue']:
        for j in ListofJobs:
            if j[4]==i:
                break
        worker, resources, ResQuantity, compl, recipe1, recipe2, module, temp, itemIndex, timer, components, name= j
        XP=itemMap[IDtoCat[recipe1]][recipe1].craftXP+craftBonus
        MakeItemStart([resources, recipe1, worker, recipe2, module, XP, itemIndex, str(components)],i['index'])
        RefreshSession()
        finishProgressJobs()
        break
 
 
 
#recipeLongID, XP, itemInstance
       
RefreshSession()
StartTime=time.time()
needTime=60*30
if Level<20:
    needTime=10*60
if FromConsole:
    for i in range(0,1000000):
        try:
            #CT+=1
            #if CT>10 and FromConsole:
               
                #os.system('cls')
                #CT=0
            while RefreshSession()==0:
                1
            if len(ResearchNow)>0:
                DoAllResearch()
            Run()
            if time.time()-StartTime>needTime:
                StartTime=time.time()
                time.sleep(70)
                EndDay()
                NightStuff()
                ContributeAll()
                days=1
                break
        except Exception, e:
            print e
            continue
 
 
 
##
##names={}
##for i in StaticData['result']['assets']:
##    names[i['id']]=i['value']