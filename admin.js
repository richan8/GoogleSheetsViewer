function toolTips(x){$('.toolTips').html(x);}
/*
user='';
pass='';

function sendRequest(data){
    console.log('sending: ');
    str=JSON.stringify(data);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          serverResponse(this);
      }
    };
    console.log('sending: '+str);
    xmlhttp.open("GET", "gethint.php?q=" + str, true);
    xmlhttp.send();
}

function serverResponse(x){
    console.log(x);
}




function auth(){
    user=$('.authUser').val();
    pass=$('.authPass').val();
    console.log('Logging in with: '+user,pass);
    data={fun:'login',data:{username:user,password:pass}};
    res=sendRequest(data);
    if(res['data']['login']==true){
        $('.authBox').addClass('authBoxHide');
    }
    else{
        user=$('.authUser').val('');
        pass=$('.authPass').val('');
    }
}
*/



dataA=[
    {name:'A',tables:[['1.1','url1.1'],['1.2','url1.2'],['1.3','url1.3']]},
    {name:'B',tables:[['2.1','url2.1'],['2.2','url2.2']]},
    {name:'C',tables:[['3.1','url3.1'],['3.2','url3.2'],['3.3','url3.3'],['3.4','url3.4']]},
    {name:'D',tables:[['4.1','url4.1'],['4.2','url4.2']]}
];
dataB=[
    {name:'Animals',tables:[['Cats','www.cats.com'],['Dogs','www.dogs.com'],['Bears','www.bears.com']]},
    {name:'Objects',tables:[['Chairs','www.chairs.info'],['tables','www.tables.org']]}
];
metadata=[
    {sectionName:'Section A',data:dataA},
    {sectionName:'Section B',data:dataB}
];

activeSectionID=0;



function refreshCanvas(){
    i=0;
    finalStr='<i class="material-icons sectionButton addSectionButton" onclick="addSection();" onmouseover="toolTips('+"'Add a new section'"+');">add_box</i>';
    metadata.forEach(function(x){
        if(i==activeSectionID){
            finalStr+='<i class="material-icons sectionButton removeSectionButton" onclick="removeSection()"  onmouseover="toolTips('+"'Remove Current Section'"+');">delete</i>';
        }
        finalStr+='<div class="sectionButton secID'+i+'" onclick="section('+i+');" onmouseover="toolTips('+"'Goto section: "+x['sectionName']+"'"+');">'+x['sectionName']+'</div>';
        i+=1;
    });
    if(metadata.length>0){
        tableData=metadata[activeSectionID]['data'];
        $('.sectionName').val(metadata[activeSectionID]['sectionName']);
    }
    else{
        tableData=[];
        $('.sectionName').val('No sections created.');
    }
    $('.sectionBar').html('');
    $('.sectionBar').append(finalStr)
    i=0;
    finalStr='';
    tableData.forEach(function(x){
        gName=x['name'];
        str1='\n<div class="group group'+i+' selPar clearfix">\n<div class="sheet clearfix">\n<input class="groupNameInput groupName'+i+'" type="text" value="'+gName+'" onmouseover="toolTips('+"'Name of Group of Tables'"+');" onchange="updateGroupName('+i+')"/>\n<i class="material-icons cardButton" onclick="removeGroup('+i+');" onmouseover="toolTips('+"'Delete entire group'"+');">delete</i>\n<i class="material-icons cardButton" onclick="addSheet('+i+');" onmouseover="toolTips('+"'Add sheet as a TableName-URL pair'"+');">add</i>\n</div>';
        j=0;
        str2='';
        x['tables'].forEach(function(y){
            id=i+'_'+j;
            row='\n<div class="sheet sel sel'+id+' clearfix">\n<input onchange="updateSheetName(['+i+','+j+'])" class="nameInput sheetName'+id+'" type="text" value="'+y[0]+'" onmouseover="toolTips('+"'Input box for name of table.'"+');"/>\n<input onchange="updateSheetURL(['+i+','+j+'])" class="urlInput sheetURL'+id+'" type="url" value="'+y[1]+'" onmouseover="toolTips('+"'Input box for URL of table. example: https://docs.google.com/spreadsheets/d/12l90_h4G7ple0GRKnOUuH4JeVGFut2-Rq16OqWzhWjg/pubhtml'"+');"/>\n<i class="material-icons cancelButton" onclick="removeSheet(['+i+','+j+'])" onmouseover="toolTips('+"'Delete this TableName-URL entry'"+');">cancel</i>\n</div>';
            str2+=row
            j+=1;
        });
        str3='</div>';
        finalStr+=str1+str2+str3;
        i+=1;
    });
    $(".body").html('');
    $(".body").append(finalStr);
    sel='.secID'+activeSectionID;
    $('.sectionButton').removeClass('sectionButtonActive');
    $('.sectionBar').find(sel).addClass('sectionButtonActive');
}


function saveTable(){
    toolTips('Saving to Databse. Please wait');
    $('.saveTableButton').toggleClass('sideButtonProgress');
}



function loadTable(){
    console.log('Loading Table from DB');
}
function section(x){
    activeSectionID=x;
    refreshCanvas();
}
function addSection(){
    metadata.push({sectionName:'New Section',data:[]});
    refreshCanvas();
}
function renameSection(){
    metadata[activeSectionID]['sectionName']=$('body').find('.sectionName').val();
    refreshCanvas();
}


function removeSection(){
    metadata.splice(activeSectionID,1);
    activeSectionID=0;
    refreshCanvas();
}


function addGroup(){
    metadata[activeSectionID]['data'].push({name:'Untitled Group',tables:[]});
    refreshCanvas();
}
function removeGroup(x){
    metadata[activeSectionID]['data'].splice(x,1);
    refreshCanvas();
}
function addSheet(x){
    metadata[activeSectionID]['data'][x]['tables'].push(['Untitled Sheet','Insert URL here']);
    refreshCanvas(metadata[activeSectionID]['data']);
}
function removeSheet(x){
    metadata[activeSectionID]['data'][x[0]]['tables'].splice(x[1],1);
    refreshCanvas();
}
function updateGroupName(x){
    console.log(x)
    sel='.groupName'+x;
    metadata[activeSectionID]['data'][x]['name']=$('.body').find(sel).val();
    refreshCanvas();
}
function updateSheetName(x){
    sel='.sheetName'+x[0]+'_'+x[1];
    metadata[activeSectionID]['data'][x[0]]['tables'][x[1]][0]=$('.body').find(sel).val();
    refreshCanvas();
}
function updateSheetURL(x){
    sel='.sheetURL'+x[0]+'_'+x[1];
    metadata[activeSectionID]['data'][x[0]]['tables'][x[1]][1]=$('.body').find(sel).val();
    refreshCanvas();
}

section(0);