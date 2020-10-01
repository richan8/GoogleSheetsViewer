publicSpreadsheetUrl='https://docs.google.com/spreadsheets/d/12l90_h4G7ple0GRKnOUuH4JeVGFut2-Rq16OqWzhWjg/pubhtml';

dataA=[
    {name:'A',tables:[['1.1','url1.1'],['1.2','url1.2'],['1.3','url1.3']]},
    {name:'B',tables:[['2.1','url2.1'],['2.2','url2.2']]},
    {name:'C',tables:[['3.1','url3.1'],['3.2','url3.2'],['3.3','url3.3'],['3.4','url3.4']]},
    {name:'D',tables:[['4.1','url4.1'],['4.2','url4.2']]},
    {name:'A',tables:[['1.1','url1.1'],['1.2','url1.2'],['1.3','url1.3']]},
    {name:'B',tables:[['2.1','url2.1'],['2.2','url2.2']]},
    {name:'C',tables:[['3.1','url3.1'],['3.2','url3.2'],['3.3','url3.3'],['3.4','url3.4']]},
    {name:'D',tables:[['4.1','url4.1'],['4.2','url4.2']]},
    {name:'A',tables:[['1.1','url1.1'],['1.2','url1.2'],['1.3','url1.3']]},
    {name:'B',tables:[['2.1','url2.1'],['2.2','url2.2']]},
    {name:'C',tables:[['3.1','url3.1'],['3.2','url3.2'],['3.3','url3.3'],['3.4','url3.4']]},
    {name:'D',tables:[['4.1','url4.1'],['4.2','url4.2']]},
    {name:'A',tables:[['1.1','url1.1'],['1.2','url1.2'],['1.3','url1.3']]},
    {name:'B',tables:[['2.1','url2.1'],['2.2','url2.2']]},
    {name:'C',tables:[['3.1','url3.1'],['3.2','url3.2'],['3.3','url3.3'],['3.4','url3.4']]},
    {name:'D',tables:[['4.1','url4.1'],['4.2','url4.2']]},
    {name:'A',tables:[['1.1','url1.1'],['1.2','url1.2'],['1.3','url1.3']]},
    {name:'B',tables:[['2.1','url2.1'],['2.2','url2.2']]},
    {name:'C',tables:[['3.1','url3.1'],['3.2','url3.2'],['3.3','url3.3'],['3.4','url3.4']]},
    {name:'D',tables:[['4.1','url4.1'],['4.2','url4.2']]},
    {name:'A',tables:[['1.1','url1.1'],['1.2','url1.2'],['1.3','url1.3']]},
    {name:'B',tables:[['2.1','url2.1'],['2.2','url2.2']]},
    {name:'C',tables:[['3.1','url3.1'],['3.2','url3.2'],['3.3','url3.3'],['3.4','url3.4']]},
    {name:'D',tables:[['4.1','url4.1'],['4.2','url4.2']]},
    {name:'A',tables:[['1.1','url1.1'],['1.2','url1.2'],['1.3','url1.3']]},
    {name:'B',tables:[['2.1','url2.1'],['2.2','url2.2']]},
    {name:'C',tables:[['3.1','url3.1'],['3.2','url3.2'],['3.3','url3.3'],['3.4','url3.4']]},
    {name:'D',tables:[['4.1','url4.1'],['4.2','url4.2']]}
];
dataB=[
    {name:'Animals',tables:[['Cats',publicSpreadsheetUrl],['Dogs','www.dogs.com'],['Bears','www.bears.com']]},
    {name:'Objects',tables:[['Chairs','www.chairs.info'],['tables','www.tables.org']]}
];
metadata=[
    {sectionName:'Section A',data:dataA},
    {sectionName:'Section B',data:dataB}
];

function init(){
    $('.loadingScreen').addClass('loadingScreenShow');
    $('#sb2').toggleClass('sidebarHide');
    $('#updateButton').html("Please Wait");
    $('#updateButton').addClass('disabled');
    Tabletop.init({key: publicSpreadsheetUrl, callback: returnData,simpleSheet:true});
}
function returnData(data,tabletop){createTable(data);}
function createTable(tableData,withHeader=true){
    flag=true;
    tableHtml="";
    i=0;
    tableData.forEach(function(row){
        i+=1
        if(withHeader && flag){
            htmlStr="<tr class='headRow'>";
            for(var key in row){
                htmlStr+="<th><div class='dataHolder'>"+row[key].toString()+"</div></th>";
            }
            htmlStr+="</tr>";
            tableHtml+=htmlStr;
            flag=false;
        }
        else{
            if(i%2==0){htmlStr="<tr class='evenRow'>";}
            else{htmlStr="<tr>";}
            for(var key in row){
                htmlStr+="<td><div class='dataHolder'>"+row[key].toString()+"</div></td>";
            };
            htmlStr+="</tr>";
            tableHtml+=htmlStr;
            $('.updateTable').html("Update Table");
        }
    });
    $('.table').html("")
    $('.table').append(tableHtml);
    console.log('Table Generated');
    $('#updateButton').html("Update Table");
    $('#updateButton').removeClass('disabled');
    setWidth();
    setZoom();
    $('.loadingScreen').removeClass('loadingScreenShow');
}

function openSidebar(){
    $('#sb2').removeClass('sidebarShow');
    $('#sb1').addClass('sidebarShow');
}

function createTableList(data){
    i=0;
    data.forEach(function(section){
        str='<div class="selPar selPar'+i+'" onclick="selectSection('+i+');">'+section["sectionName"]+'</div>';
        $('#sb1').append(str);
        j=0;
        section['data'].forEach(function(group){
            str='<div class="sel sel'+i+' sel'+i+'_'+j+' hide" onclick="selectGroup(['+i+','+j+']);">'+group['name']+'</div>';
            $('#sb2').append(str);
            k=0;
            group['tables'].forEach(function(sheet){
                str='<div class="sheet sheet'+i+'_'+j+' sheet'+i+'_'+j+'_'+k+' hide" onclick="selectSheet(['+i+','+j+','+k+']);">'+sheet[0]+'</div>';
                $('#sb3').append(str);
                k+=1;
            });
            j+=1;
        });
        i+=1
    });
    $('#sb1').append('<div class="marginDiv"></div>');
    $('#sb2').append('<div class="marginDiv"></div>');
    $('#sb3').append('<div class="marginDiv"></div>');
}

$('.body').mouseenter(function(){
    $('#sb2').removeClass('sidebarShow');
    $('#sb3').removeClass('sidebarShow');
});

function selectSection(x){
    sel='.sel'+x;
    $('.sel').addClass('hide');
    $(sel).removeClass('hide');

    selPar='.selPar'+x;
    $('.selPar').removeClass('selActive');
    $(selPar).addClass('selActive');
    $('#sb2').addClass('sidebarShow');
}

function selectGroup(x){
    i=x[0];
    j=x[1];
    selGroup='.sel'+i+'_'+j;
    selSheet='.sheet'+i+'_'+j;
    $('.sheet').addClass('hide');
    $(selSheet).removeClass('hide');
    $('.sel').removeClass('selActive');
    $(selGroup).addClass('selActive');
    $('#sb3').addClass('sidebarShow');
}

function selectSheet(x){
    i=x[0];
    j=x[1];
    k=x[2];
    selSheet='.sheet'+i+'_'+j+'_'+k;
    $('.sheet').removeClass('selActive');
    $(selSheet).addClass('selActive');
    publicSpreadsheetUrl=metadata[i]['data'][j]['tables'][k][1];
    $('#sb1').removeClass('sidebarShow');
    $('#sb2').removeClass('sidebarShow');
    $('#sb3').removeClass('sidebarShow');
    init();
}

sideBarOpen=false;
function toggleSidebar(){
    if(sideBarOpen){
        $('#sb1').removeClass('sidebarShow');
        $('#sb2').removeClass('sidebarShow');
        $('#sb3').removeClass('sidebarShow');
        sideBarOpen=false;
    }
    else{
        $('#sb1').addClass('sidebarShow');
        $('#sb2').removeClass('sidebarShow');
        $('#sb3').removeClass('sidebarShow');
        sideBarOpen=true;
    }
}

thFontSizeEm=1.1;
tdFontSizeEm=0.8;
function zoomIn(){
    if(thFontSizeEm<2){
        tdFontSizeEm+=0.08;
        thFontSizeEm+=0.08;
        width+=3;
        setWidth();
        setZoom();
    }
}

function zoomOut(){
    if(thFontSizeEm>0.2){
        tdFontSizeEm-=0.08;
        thFontSizeEm-=0.08;
        width-=3;
        setWidth();
        setZoom();
    }
}

function setZoom(){
    tdfontSize=tdFontSizeEm.toString()+'em';
    thfontSize=thFontSizeEm.toString()+'em';
    $('td').css({
        'font-size':tdfontSize
    });
    $('th').css({
        'font-size':thfontSize
    });
}

width=75;
function contract(){
    if(width>11){
        width-=10;
        setWidth();
    }
}
function expand(){
    if(width<600){
        width+=10;
        setWidth();
    }
}
function setWidth(){
    str=width.toString()+'px';
    $('.dataHolder').css({
        'max-width':str
    });
}
/*
Q -> Zoom In
E -> Zoom Out
A -> Contract
D -> Expand
*/

$(document).keypress(function(e) {
    if(e.which == 81 || e.which == 113){
        zoomIn();
    }
    if(e.which == 69 || e.which == 101){
        zoomOut();
    }
    if(e.which == 65 || e.which == 97){
        contract();
    }
    if(e.which == 68 || e.which == 100){
        expand();
        i=0;
        doSomething();
    }
});

$('a').last().addClass("hide");
createTableList(metadata);

function doSomething(){
    $('td').each(function(){
        var x= $(this).find(".dataHolder").html();
        if(x == '100%'){
            $(this).addClass('highlight');
        }
    });
}

