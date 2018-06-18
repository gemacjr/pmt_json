resources = ["4927","2015","257","2055"];
restrictions = ["2055-ABS", "345-cts", "7766-POP"];
actions = [
  "EditTargets",
  "PerformCloneManagement",
  "PerformOrderModeling",
  "RunPretradeRisk",
  "SendOrdersToCrdCompliance",
  "ViewModelOrders",
  "ViewPositions",
  "ViewRisk"
];
restrictedActions = [
  "RunPretradeRisk",
  "SendOrdersToCrdCompliance",
  "ViewModelOrders",
  "ViewPositions",
  "ViewRisk"
];
var buArr = ["GMAG1"];
var roleArr = ["PM"];
var myArr = ["2055-MSVS",'2055-ABS', "2055-COMF","2055-GMEQ", "2055-ELFX","2055-LEVL", "2055-RVL" , "2055-EQOL", "2055-PBCL", "2055-CRL"];
var resourceArr = ['portfolios','sleeves'];

myJson = {business_unit: {}, roles: {}, actions: {}, resources: {}, restrictions: {}};
var myObj = {}

for(var i = 0; i < myArr.length; i++){
  myObj[[myArr[i]]] =  restrictedActions
}


myJson.business_unit = buArr;
myJson.roles = roleArr;
myJson.actions = actions;
myJson.resources[resourceArr[0]] = resources;
myJson.restrictions[resourceArr[1]] = myObj;
console.log(JSON.stringify(myJson));

//print("Res content:"+context.getVariable("response.content"));
//print("response.headers.count:"+context.getVariable("response.headers.count"));


var newRes = reconstructRes(context.getVariable("response.content"));
context.setVariable("response.content", newRes);

function reconstructRes(body){

    obj = JSON.parse(body);
    var isArr = Array.isArray(obj);
    var arr1 = obj.pop();
    //print("ARRAY LENGTH****************  " + obj.length);
    //print("ARRAY****************  " +JSON.stringify(arr1));
    //print("ARRAY sub resource****************  " +arr1.resource);
    var sleeveArr = [];
    var sleeveActionsArr = [];
    var portfolioActionsArr = [];
    var actionsArr = [];
    var portfolioArr = [];
    //var componentArr = [];
    var uniqueActions = [];
    var restrictedActions = [];
    var unRestrictedActions = [];
    var resourceArr = getResourceArray(obj);
    
    for (var i in obj){
        var resource = JSON.stringify(obj[i].resource);
        var actions = JSON.stringify(obj[i].actions);
        var restrictActions = obj[i].actions;
        
        //Restricted
        print("RESTIRCTED  " + getRestrictions(restrictActions));
        
        var isRestricted = getRestrictions(restrictActions);
        
        print("Actions " + getActions(restrictActions));
        
        if(isRestricted){
            unRestrictedActions = getActions(restrictActions);
            
        }else {
            restrictedActions = getActions(restrictActions);
        }
        
        autoGenerateVarFromArray(resource.split('://'), 'app');
        var appName = this.app_0;
        
        autoGenerateVarFromArray(this.app_1.split('/'), 'objective');
        var objectives = this.objective_0;
        var comp = this.objective_1;
        var id = this.objective_2;
        
        id = id.slice(0, -1);
        
        
        var source = comp;
  
        if(source === "sleeves") {
                sleeveArr.push(id);
                sleeveNumber = "";
            var sleeveObj = JSON.parse(actions);
            for (var k in sleeveObj){
                sleeveActionsArr.push(k);
            }
                
        }
        if(source === "portfolios") {
                portfolioArr.push(id); // builds portfolios array
                portfolioNumber = "";
                
            var portObj = JSON.parse(actions);
            for (var  q in portObj){
                portfolioActionsArr.push(q);
                }
                
            }
    }
    var buArr = ["GMAG1"];
    var roleArr = ["PM"];
 
  
    myJson = {business_unit: {}, roles: {}, actions: {}, resources: {}, restrictions: {}};
    var myObj = {}

for(var i = 0; i < myArr.length; i++){
  myObj[[myArr[i]]] =  restrictedActions
}


myJson.business_unit = buArr;
myJson.roles = roleArr;
myJson.actions = unRestrictedActions;
myJson.resources[resourceArr[0]] = resources;
myJson.restrictions[resourceArr[1]] = myObj;
  
  
 
  return myJson;
} 

function getRestrictions(actions){
    
    var restricted;
    
    for(var k in actions){
        
            
            if(actions[k] === true){
                restricted = true;
            }else {
                restricted = false;
            }
            
        }
        
        return restricted
}
function autoGenerateVarFromArray(srcArray, varNamePrefix)
{
  	var i = 0
  	while(i < srcArray.length)
  	{
    	this[varNamePrefix +'_' + i] = srcArray[i]; 
    	i++;
  	} 
}


function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}

function getActions(actions){
    
    
    var actionsArr = [];
    
    for (var x in actions){
        actionsArr.push(x);
    }
    
    return actionsArr;
}

function getResourceArray(obj){
    
    var componentArr = [];
    
    var i;
    
    for(i in obj){
        var resource = JSON.stringify(obj[i].resource);
        
        autoGenerateVarFromArray(resource.split('://'), 'app');
        var appName = this.app_0;
        
        autoGenerateVarFromArray(this.app_1.split('/'), 'objective');
        var objectives = this.objective_0;
        var comp = this.objective_1;
        var id = this.objective_2;
        
        componentArr.push(comp);
    }
    var unique = componentArr.filter(function(item, pos) {
                                    return componentArr.indexOf(item) == pos;
                                });
    
        
    return unique;
}
