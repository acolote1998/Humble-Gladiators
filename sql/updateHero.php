<?php
include '../dbConnection.php';

if (
    isset($_POST["id"]) &&
    isset($_POST["username"]) &&
    isset($_POST["name"]) &&
    isset($_POST["level"]) &&
    isset($_POST["somatotype"]) &&
    isset($_POST["height"]) &&
    isset($_POST["weight"]) &&
    isset($_POST["constitution"]) &&
    isset($_POST["dexterity"]) &&
    isset($_POST["strength"]) &&
    isset($_POST["speed"]) &&
    isset($_POST["luck"]) &&
    isset($_POST["maxHP"]) &&
    isset($_POST["hp"]) &&
    isset($_POST["localvictories"]) &&
    isset($_POST["onlineVictories"]) &&
    isset($_POST["totalVictories"]) &&
    isset($_POST["defeatedEnemies"]) &&
    isset($_POST["diedAgainst"]) &&
    isset($_POST["critic"]) &&
    isset($_POST["focused"]) &&
    isset($_POST["weapon"]) &&
    isset($_POST["weaponSRC"]) &&
    isset($_POST["bodySRC"]) &&
    isset($_POST["headSRC"]) &&
    isset($_POST["weaponURL"]) &&
    isset($_POST["bodyURL"]) &&
    isset($_POST["headURL"])
) {
    $id = (int)$_POST["id"];
    $username = mysqli_real_escape_string($conn, trim($_POST["username"]));
    $name = mysqli_real_escape_string($conn, trim($_POST["name"]));
    $level = (int)$_POST["level"];
    $somatotype = mysqli_real_escape_string($conn, trim($_POST["somatotype"]));
    $height = (int)$_POST["height"];
    $weight = (int)$_POST["weight"];
    $constitution = (int)$_POST["constitution"];
    $dexterity = (int)$_POST["dexterity"];
    $strength = (int)$_POST["strength"];
    $speed = (int)$_POST["speed"];
    $luck = (int)$_POST["luck"];
    $maxHP = (float)$_POST["maxHP"];
    $hp = (float)$_POST["hp"];
    $localvictories = (int)$_POST["localvictories"];
    $onlineVictories = (int)$_POST["onlineVictories"];
    $totalVictories = (int)$_POST["totalVictories"];
    
    // Decode JSON strings into PHP arrays
    $defeatedEnemies = json_decode($_POST["defeatedEnemies"], true);
    $diedAgainst = json_decode($_POST["diedAgainst"], true);
    
    // Encode PHP arrays back to JSON strings for database storage
    $defeatedEnemies_json = json_encode($defeatedEnemies);
    $diedAgainst_json = json_encode($diedAgainst);

    $critic = filter_var($_POST["critic"], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
    $focused = filter_var($_POST["focused"], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
    $weapon = mysqli_real_escape_string($conn, trim($_POST["weapon"]));
    $weaponSRC = mysqli_real_escape_string($conn, trim($_POST["weaponSRC"]));
    $bodySRC = mysqli_real_escape_string($conn, trim($_POST["bodySRC"]));
    $headSRC = mysqli_real_escape_string($conn, trim($_POST["headSRC"]));
    $weaponURL = mysqli_real_escape_string($conn, trim($_POST["weaponURL"]));
    $bodyURL = mysqli_real_escape_string($conn, trim($_POST["bodyURL"]));
    $headURL = mysqli_real_escape_string($conn, trim($_POST["headURL"]));

    // Prepare the SQL statement
    $stmt = $conn->prepare("UPDATE gladiators 
        SET username=?, name=?, level=?, somatotype=?, height=?, weight=?, constitution=?, dexterity=?, strength=?, speed=?, luck=?, maxHP=?, hp=?, localvictories=?, onlineVictories=?, totalVictories=?, defeatedEnemies=?, diedAgainst=?, critic=?, focused=?, weapon=?, weaponSRC=?, bodySRC=?, headSRC=?, weaponURL=?, bodyURL=?, headURL=? 
        WHERE id=?");

    $stmt->bind_param(
        "ssisisiiiiiddiiissiisssssssi", // Types for each variable (28 values)
        $username, 
        $name, 
        $level, 
        $somatotype, 
        $height, 
        $weight, 
        $constitution, 
        $dexterity, 
        $strength, 
        $speed, 
        $luck, 
        $maxHP, 
        $hp, 
        $localvictories, 
        $onlineVictories, 
        $totalVictories, 
        $defeatedEnemies_json, // JSON string of defeated enemies
        $diedAgainst_json,    // JSON string of died against
        $critic, 
        $focused, 
        $weapon, 
        $weaponSRC, 
        $bodySRC, 
        $headSRC, 
        $weaponURL, 
        $bodyURL, 
        $headURL, 
        $id
    );

    if ($stmt->execute()) {
        echo "Gladiator Updated!";
    } else {
        echo "Error updating data: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Missing data";
}

$conn->close();
?>
