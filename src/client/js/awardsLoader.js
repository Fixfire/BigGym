$(document).ready(documentReady);

function documentReady(){
    var id = getUrlVars()["instr"];
    var name=getUrlVars()["name"];
    var surname=getUrlVars()["surname"];
    loadAwards(id,name, surname); 
}


function createContext(id,name,surname){
    var el="";
    el+=  "<a href='instructor.html?instr="+id+"'>"+name+" "+surname+"</a> <span> > </span>";
    $("#context").html(el);
}

function loadAwards(id,name,surname){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "../../server/getAwards.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            console.log(JSON.parse(response));
            var awards=JSON.parse(response);
            var el="";
            
            createContext(id,name,surname);
            for(var i=0;i<awards.length;i++){
                el+="<tr>";
                el+="<td>";
                el+=awards[i].Year;
                el+="</td>";
                el+="<td>";
                el+=awards[i].Name;
                el+="</td>";
                el+="<td>";
                el+="<img src='images/Instructor/"+name+surname+"/awards/"+awards[i].Year+".png' width='50' height='50'/>";
                el+="</td>";
                el+="</tr>";
            }
            $("tbody").html(el);
        1},
    });
    
}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}