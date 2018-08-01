<?php
   
   $myFile = "../db/data.json";
   $arr_data = array(); // create empty array

  try
  {
	   //Get form data
	   $data = $_POST['data'];
	   
	   $formdata = array(
		  'image'=> $data['image'],
		  'datecreated'=> $data['datecreated'],
	      'author'=> $data['author'],
	      'title'=>$data['title'],
		  'content'=> $data['content'],
		  'tags'=> $data['tags']
	   );

	   //Get data from existing json file
	   $jsondata = file_get_contents($myFile);

	   // converts json data into array
	   $arr_data = json_decode($jsondata, true);

	   // Push user data to array
	   array_push($arr_data,$formdata);

       //Convert updated array to JSON
	   $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);
	   
	   //write json data into data.json file
	   if(file_put_contents($myFile, $jsondata)) {
			
		
	    }
	   else 
	        echo "error";

   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }

?>