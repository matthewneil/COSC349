<!DOCTYPE HTML>
<html>
  <head>
    <h1 id="demo"> World Timezone Converter </h1>
  </head>


  <body>
    

    <p id="output"></p>
    <?php
      session_start();

    if($_SERVER['REQUEST_METHOD'] == "POST" and isset($_POST['Convert'])){
    func();
    }
    
    function func(){
    $timezone = $_POST['timezone'];
    $db_host = '192.168.2.12';
    $db_name = 'timezones';
    $db_user = 'webuser';
    $db_passwd = 'Quack1nce4^';



    $pdo_dsn = "mysql:host=$db_host;dbname=$db_name";

    $pdo = new PDO($pdo_dsn, $db_user, $db_passwd);

    if($timezone == "EST"){
    $est = file_get_contents("http://192.168.2.13?timezone=est");
    echo "<p> Eastern Standard Time: $est </p>";
    $q = $pdo->query("UPDATE timezones SET defaultzone = 'EST' WHERE userID='User'");
  } else if($timezone == "JST"){
  $jst = file_get_contents("http://192.168.2.13?timezone=jst");
  echo "<p> Japan Standard Time: $jst </p>";
  $q = $pdo->query("UPDATE timezones SET defaultzone = 'JST' WHERE userID='User'");
  } else if($timezone == "MSK"){
  $msk = file_get_contents("http://192.168.2.13?timezone=msk");
  echo "<p> Moscow Time: $msk </p>";
  $q = $pdo->query("UPDATE timezones SET defaultzone = 'MSK' WHERE userID='User'");
  } else if($timezone == "SGT"){
  $sgt = file_get_contents("http://192.168.2.13?timezone=sgt");
  echo "<p> Singapore Time: $sgt </p>";
  $q = $pdo->query("UPDATE timezones SET defaultzone = 'SGT' WHERE userID='User'");
  } else if($timezone == "AEST"){
  $aest = file_get_contents("http://192.168.2.13?timezone=aest");
  echo "<p> Australian Eastern Standard Time: $aest </p>";
  $q = $pdo->query("UPDATE timezones SET defaultzone = 'AEST' WHERE userID='User'");
  } else if($timezone == "CLST"){
  $clst = file_get_contents("http://192.168.2.13?timezone=clst");
  echo "<p> Antarctica (Palmer Station) Time: $clst </p>";
  $q = $pdo->query("UPDATE timezones SET defaultzone = 'CLST' WHERE userID='User'");
  }

  }

  ?>
   
  <?php
    
    $db_host = '192.168.2.12';
    $db_name = 'timezones';
    $db_user = 'webuser';
    $db_passwd = 'Quack1nce4^';

    $pdo_dsn = "mysql:host=$db_host;dbname=$db_name";

    $pdo = new PDO($pdo_dsn, $db_user, $db_passwd);

    $q = $pdo->query("SELECT * FROM timezones");
  while($row = $q->fetch()){
  $default = $row["defaultzone"];
  echo $default;

  if($default == $timezone){
  
  header("refresh: 0;");
  }
  }

  $_SESSION['time'] = $default;

  ?>
  <p>test</p>
  <?php


  function getSelectSession($val, $val2)
  {
  if ($_SESSION[$val] == $val2) {
  echo "selected";
  }
  }
  ?>

  <form action="index.php" method="post">

    <p> Convert from NZT to:
      <select name="timezone">
        <option value="EST" <?php getSelectSession("time", "EST"); ?>>Eastern Standard Time</option>
        <option value="JST" <?php getSelectSession("time", "JST"); ?>>Japan Standard Time</option>
        <option value="MSK" <?php getSelectSession("time", "MSK"); ?>>Moscow Time</option>
        <option value="SGT" <?php getSelectSession("time", "SGT"); ?>>Singapore Time</option>
        <option value="AEST"<?php getSelectSession("time", "AEST"); ?>>Australian Eastern Standard Time</option>
        <option value="CLST"<?php getSelectSession("time", "CLST"); ?>>Antarctica (Palmer Station) Time</option>
      </select>

      <input type="submit" name="Convert" value="Convert"></input>

  </form>

  
  
  </body>
</html>
