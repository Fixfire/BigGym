$(document).ready(documentReady);

var ordering;
function documentReady(){
    console.log("I'm ready");
    loadCategories();
}


function getPath(name) {
    name = name.replace(" ", "");
    return name;
}

function loadCategories(){

    console.log("Loading categories");
    
    document.title="All courses categories";
    
    $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        url: "../../server/getAllCourseCategories.php", //Relative or absolute path to file.php file
        success: function(response) {
            console.log(JSON.parse(response));
            var categories = JSON.parse(response);
            var el = "";
            for (var i=0; i<categories.length; i++) {
                el += "<div id='category'>";
                el += "<h4>" + categories[i].Name + "</h4>";
                el += "<div id='categoryContainer'> <hr>";
                var path = getPath(categories[i].Name);
                el += "<img src='images/" + path + "/main.jpg' height='200' width='200' style='float:right;'/>";
                el += "<p>" + categories[i].ShortDescription + "</p>";
                el += "<button class='btn category-btn1' type='button' id='std-btn' >More Info</button>";
                el += "<button class='btn category-btn2' type='button' id='std-btn' onclick=\"parent.location='coursesbycategory.html?cat=" + categories[i].Name + "'\" >Courses</button>";
                el += "</div> </div>";
            }
           
            console.log(el);
            $("#categoryList").html(el);
        1},
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
}


  




