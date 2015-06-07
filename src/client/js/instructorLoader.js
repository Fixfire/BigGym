$(document).ready(documentReady);

function documentReady(){
    //Facebook script setup
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
          appId: '1677221109163837',
        xfbml      : true,
          version: 'v2.3' // or v2.0, v2.1, v2.0
        });     
        $('#loginbutton,#feedbutton').removeAttr('disabled');
    });

    var id=getUrlVars()["instr"];
    var from=getUrlVars()["from"];
    loadInstructor(id,from); 
}


function createContext(from,el,instructors){
    if(from=="month"){
    el +=  "<a href='#'>Instructors of the month</a> <span> > </span>";
    //el+="<div id='padding'></div>";
    }else{
    el +=  "<a href='allinstructors.html'>All instructors</a> <span> > </span>";
    }
     $("#context").html(el);
}

function loadInstructor(id,from){

    var categoriesList;
    var hasAwards;
    
    $.ajax({
        method: "POST",
        async:false,
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "../../server/getInstructorCategories.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            categoriesList=JSON.parse(response);
        1},
    });
    
    $.ajax({
        method: "POST",
        async:false,
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "../../server/hasAwards.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            var result=JSON.parse(response);
            hasAwards=result['boolean'];
        1},
    });
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "../../server/server.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            var instructors=JSON.parse(response);
            var el="";
            var el2="";
            var el3="";
            
            createContext(from,el,instructors);
            el="";
            for(var i=0;i<instructors.length;i++){
                //Set the document title
                document.title=instructors[i].Name+" "+instructors[i].Surname;
                //Fill instructor name
                el+=instructors[i].Name+" "+instructors[i].Surname;
                $("#instructorName").html(el);
                //Fill the instructorContent
                $("#instrThumbnail").attr("src","images/Instructors/"+instructors[i].Name+instructors[i].Surname+".jpg");
                $(".instructorPositionTitle").html(instructors[i].Position);
                $(".instructorCertTitle").html(instructors[i].Certifications);
                $("#biography").html(instructors[i].Biography);
                if(hasAwards){
                    $("#awardsLink").html("Personal Awards");
                }
                for(var j=0;j<categoriesList.length;j++){
                     el2+="<a href='#'>"+categoriesList[j].Category+"</a><br>";
                }
                $(".categoriesTeaching").html(el2);
                $("#teaches").attr("href","http://bigbiggym.altervista.org/client/teaches.html?instr="+instructors[i].Id+"&name="+instructors[i].Name+"&surname="+instructors[i].Surname);
                //Fill tweets div
                if(!instructors[i].TwitterURL==""){
                    el3+="<a class='twitter-timeline'  href='https://twitter.com/"+instructors[i].TwitterURL+"' data-widget-id='"+instructors[i].TwitterID+"' width='500' height='200' data-chrome='nofooter transparent' data-tweet-limit='2'  data-aria-polite='assertive '>Tweets by @"+instructors[i].TwitterName+"</a>";
                    el3+="<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';                        if(!d.getElementById(id)){js=d.createElement(s);js.id=id;                            js.src=p+'://platform.twitter.com/widgets.js';                            fjs.parentNode.insertBefore(js,fjs);}}(document,'script','twitter-wjs');</script>";
                }
                $("#tweets").html(el3);
            }
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