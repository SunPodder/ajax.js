<?php
  echo "POST\n";
  
  foreach($_POST as $key => $value){
    echo $key.": ".$value."\n";
  }
  echo "\n".file_get_contents("php://input");
  echo "\n\n";
  
  echo "HEADERS\n";
  foreach($_SERVER as $key => $value){
    if(str_starts_with($key, "HTTP")){
      echo $key.": ".$value."\n";
    }
  }
  echo "";
  
 // echo $_SERVER["HTTP_CUSTOM"];
?>