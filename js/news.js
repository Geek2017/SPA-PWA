
(function(){
  var app = angular.module('newsApp',[]);
  
  app.controller('newsController',  function($http,$scope){
    
    $scope.copyright="Copyright © 2018. All Rights Reserved. Bicol Idol FM"

    $scope.auth=true;
    
    $scope.logauth=function(){
        if ($scope.user=='admin' && $scope.pass =='bic0l1d0l'){
          $scope.auth=false;
          $scope.add=true;
          $scope.logout=true;
          $scope.keydel=true;
          $scope.keylabel=true;
          $scope.keycode=true;
          $('#login-modal').modal('toggle');
          sessionStorage.setItem('session',1);
        }else{
          alert('Auth err!');
        }
    }

    $scope.sessionend=function(){
      sessionStorage.setItem('session',0);
      $scope.auth=true;
      $scope.add=false;
      $scope.logout=false;
      $scope.keydel=false;
      $scope.keylabel=false;
      $scope.keycode=false;
    } 

    if(sessionStorage.getItem('session')=='1'){
      $scope.auth=false;
      $scope.add=true;
      $scope.logout=true;
      $scope.keydel=true;
      $scope.keylabel=true;
      $scope.keycode=true;
    }

    var blog = this;
    
    blog.posts = {};
    $http.get('db/data.json').success(function(data){
      blog.posts = data;
    

    $scope.currentPage = 0;
    $scope.pageSize = 6;
   
    $scope.data=blog.posts;
   

     $scope.new1t=$scope.data[0].title
     $scope.new2t=$scope.data[1].title
     $scope.new3t=$scope.data[2].title
     $scope.new4t=$scope.data[3].title
     $scope.new5t=$scope.data[4].title

     $scope.new1img=$scope.data[0].image
     $scope.new2img=$scope.data[1].image
     $scope.new3img=$scope.data[2].image
     $scope.new4img=$scope.data[3].image
     $scope.new5img=$scope.data[4].image

     $scope.new1c=$scope.data[0].content
     $scope.new2c=$scope.data[1].content
     $scope.new3c=$scope.data[2].content
     $scope.new4c=$scope.data[3].content
     $scope.new5c=$scope.data[4].content



    


    $scope.numberOfPages= () => {
      return Math.ceil(
        $scope.data.length / $scope.pageSize
      );
    }
  });

    blog.tab = 'blog';
    
    blog.selectTab = function(setTab){
      blog.tab = setTab;
      // console.log(blog.tab)
    };
    
    blog.isSelected = function(checkTab){
      return blog.tab === checkTab;
    };
    
    blog.post = {};
    blog.addPost = function(){
      var r = confirm('Are you sure you want to proceed?');
      if (r == true) {
        $.post("crud/insert.php",{
          data: {
              "image":localStorage.getItem('PDFbase64'),
              "datecreated":Date.now(),
              "author":$('#author').val(),
              "title":$('#title').val(),
              "content":$('#content').val(),
              "tags":$('#tags').val()
          }
      }).success(function(response){
              console.log(response)
              

              $http.get('db/data.json').success(function(data){
                blog.posts = data;
                blog.tab = 'blog';
                $('#title').val('');
                $('#content').val('');
                $('#image').val('');
                $('#author').val('');
                $('#tags').val('');
              });
              
          });
      } else {
        window.location = 'news.html';
      }
     
    };   


   $scope.deletenews=function(){
    var r = confirm('Are you sure you want to proceed?');
    if (r == true) {

      var txt;
      var keycode = prompt("Please enter your key code:");
      if (keycode == null || keycode == "") {
          txt = "Cancelled ";
      } else {
        $.post("crud/delete.php",{
          data: {
              "datecreated":keycode
          }
      }).success(function(response){
              console.log(response)
              window.location = 'news.html';
          });
        }
      } else {
        window.location = 'news.html';
      }
   } 


    $('#image').on('change', function(){ convertToBase64(); });

    function convertToBase64() {
        //Read File
        var selectedFile = document.getElementById("image").files;
        //Check File is not Empty
        if (selectedFile.length > 0) {
            // Select the very first file from list
            var fileToLoad = selectedFile[0];
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var base64;
            // Onload of file read the file content
            fileReader.onload = function(fileLoadedEvent) {
                base64 = fileLoadedEvent.target.result;
                // Print data in console
                // console.log(base64);
                localStorage.setItem('PDFbase64',base64)
                
                console.log(base64)
              var data=base64;
               
            };
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
        }
    }

    
    

 
    
  });

  app.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});
  
  app.controller('CommentController', function(){
    this.comment = {};
    this.addComment = function(post){
      this.comment.createdOn = Date.now();
      post.comments.push(this.comment);
      this.comment ={};
    };
  });
 
})();