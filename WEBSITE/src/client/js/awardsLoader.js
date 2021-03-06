$(document).ready(documentReady);

function documentReady(){
    var id = getUrlVars()["id"];
    var name=getUrlVars()["name"];
    var surname=getUrlVars()["surname"];
    loadAwards(id,name, surname); 
}

//Function that crates the context in the html page.
function createContext(id,name,surname){
    var el="";
    el+=  "<a href='instructor.html?instr="+id+"'>"+name+" "+surname+"</a> <span> > </span>";
    $("#context").html(el);
}

//Function that loads all the information about awards
function loadAwards(id,name,surname){
    $.ajax({
        method: "POST",
        crossDomain: true, 
        url: "http://bigbiggym.altervista.org/server/getAwards.php", 
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
                console.log(awards[i].HasImg);
                if(awards[i].HasImg==1){
                    el+="<img src='images/Instructors/"+name+surname+"/awards/"+awards[i].Year+".png' width='50' height='80'/>";
                }
                el+="</td>";
                el+="</tr>";
            }
            $("tbody").html(el);
        },
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