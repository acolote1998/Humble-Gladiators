<?php
include '../dbConnection.php';

if (isset($_POST["id"]) &&
    isset($_POST["username"]) &&
    isset($_POST["name"]) &&
    isset($_POST["level"]) &&
    isset($_POST["somatotype"]) &&
    isset($_POST["height"]) &&
    isset($_POST["weight"]) &&
    isset($_POST["constitution"]) &&
    isset($_POST["dexterity"]) &&
    isset($_POST["strenght"]) &&
    isset($_POST["speed"]) &&
    isset($_POST["luck"]) &&
    isset($_POST["max_hp"]) &&
    isset($_POST["hp"]) &&
    isset($_POST["local_victories"]) &&
    isset($_POST["online_victories"]) &&
    isset($_POST["total_victories"]) &&
    isset($_POST["defeated_enemies"]) &&
    isset($_POST["died_against"]) &&
    isset($_POST["critic"]) &&
    isset($_POST["focused"]) &&
    isset($_POST["weapon"]) &&
    isset($_POST["weaponSRC"]) &&
    isset($_POST["bodySRC"]) &&
    isset($_POST["headSRC"]) &&
    isset($_POST["weaponURL"]) &&
    isset($_POST["bodyURL"]) &&
    isset($_POST["headURL"])) 
    {
    
        $id = (int)$_POST["id"];
        $username = mysqli_real_escape_string($conn, trim($_POST["username"]));
        $name = mysqli_real_escape_string($conn, trim($_POST["name"]));
        $level = (int)$_POST["level"];
        $somatotype = mysqli_real_escape_string($conn, trim($_POST["somatotype"]));
        $height = (int)$_POST["height"];
        $weight = (int)$_POST["weight"];
        $constitution = (int)$_POST["constitution"];
        $dexterity = (int)$_POST["dexterity"];
        $strenght = (int)$_POST["strenght"];
        $speed = (int)$_POST["speed"];
        $luck = (int)$_POST["luck"];
        $max_hp = (float)$_POST["max_hp"];
        $hp = (float)$_POST["hp"];
        $local_victories = (int)$_POST["local_victories"];
        $online_victories = (int)$_POST["online_victories"];
        $total_victories = (int)$_POST["total_victories"];
        $defeated_enemies = json_decode($_POST["defeated_enemies"], true); // Decoding into an array of heroes
        $died_against = json_decode($_POST["died_against"], true); // Decoding into an array of heroes    
        $critic = filter_var($_POST["critic"], FILTER_VALIDATE_BOOLEAN);
        $focused = filter_var($_POST["focused"], FILTER_VALIDATE_BOOLEAN);
        $weapon = mysqli_real_escape_string($conn, trim($_POST["weapon"]));
        $weaponSRC = mysqli_real_escape_string($conn, trim($_POST["weaponSRC"]));
        $bodySRC = mysqli_real_escape_string($conn, trim($_POST["bodySRC"]));
        $headSRC = mysqli_real_escape_string($conn, trim($_POST["headSRC"]));
        $weaponURL = mysqli_real_escape_string($conn, trim($_POST["weaponURL"]));
        $bodyURL = mysqli_real_escape_string($conn, trim($_POST["bodyURL"]));
        $headURL = mysqli_real_escape_string($conn, trim($_POST["headURL"]));
    


        $stmt = $conn->prepare("INSERT INTO gladiators 
(id, username, name, level, somatotype, height, weight, constitution, dexterity, strength, speed, luck, max_hp, hp, local_victories, online_victories, total_victories, defeated_enemies, died_against, critic, focused, weapon, weaponSRC, bodySRC, headSRC, weaponURL, bodyURL, headURL) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)");

$stmt->bind_param(
    "issisiiiiiiiddiiissiisssssss", // Types for each variable (28 values)
    $id, 
    $username, 
    $name, 
    $level, 
    $somatotype, 
    $height, 
    $weight, 
    $constitution, 
    $dexterity, 
    $strenght, 
    $speed, 
    $luck, 
    $max_hp, 
    $hp, 
    $local_victories, 
    $online_victories, 
    $total_victories, 
    $defeated_enemies_json, // JSON string of defeated enemies
    $died_against_json,    // JSON string of died against
    $critic, 
    $focused, 
    $weapon, 
    $weaponSRC, 
    $bodySRC, 
    $headSRC, 
    $weaponURL, 
    $bodyURL, 
    $headURL
);

    if ($stmt->execute()){
        echo "Data inserted successfully!";
    }else{
        echo "Error inserting data: ".$stmt->error;
    }

    $stmt->close();
}else {
    echo "Missing data";
}

$conn->close();
?>