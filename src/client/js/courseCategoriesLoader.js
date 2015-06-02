$(document).ready(documentReady);

function documentReady(){
    console.log("I'm ready");
    var category = getUrlVars()["cat"];
    loadCoursesCategories(category);
}




function loadCoursesCategories(category){

    console.log("Loading courses" + category.toString());
    
    document.title="All courses by categories";
    
    $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        url: "../../server/getAllCourses_category.php", //Relative or absolute path to file.php file
        data: {category:category},
        success: function(response) {
            console.log(JSON.parse(response));
            var courses = JSON.parse(response);
            var el = "";
      
            el += "<div id='context'>";
            el +=  "<a href='#'>" + courses[0].Category + "</a> <span> > " + courses[0].Category + " Course</span>";
            el +=  "</div> <div id='padding'></div> <div id='subtitleDiv'>";
            el += "<div class='container' id='container'>";
            el += "<div class='row'>";
            for (var i=0; i<courses.length; i++) {
               
                console.log(courses[i].Name);
                
                el += "<div class='col-md-2' id='courseBlock'>";
                el += "<img src='images/" + courses[i].Name  + "/main.png' height='200' width='230' />";
                el += "<h3>" + courses[i].Name + "</h3>";
                el += "<p id='courseDetail'>" + courses[i].ShortDescription + "</p>";
                el += "<p>Category : " + courses[i].Category + "</p>";
                el += "<p>Level : " + courses[i].Level + "</p>";
                el += "<button class='btn' type='button' id='std-btn'></button>";
                el += "</div>";
            }
            el += "</div>";
            el += "</div>";
            console.log(el);
            $(".centralText").html(el);
        1},
        error: function(request,error) 
        {
            console.log("Error");
        }
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


