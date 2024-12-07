<?php
include '../dbConnection.php';

if (isset($_POST["name"])&&isset($_POST["score"])){
    $name = mysqli_real_escape_string($conn, trim($_POST["name"]));;
    $score = (int)$_POST["score"];

    $stmt = $conn->prepare("INSERT INTO test (name, score) VALUES (?, ?)");

    $stmt->bind_param("si", $name, $score);

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