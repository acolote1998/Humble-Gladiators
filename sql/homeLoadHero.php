<?php
include '../dbConnection.php';

// Check if the ID is passed via POST
if (isset($_POST['id'])) {
    $id = $_POST['id'];

    // Create the SQL query using the ID
    $sql = "SELECT * FROM gladiators WHERE id=" . intval($id);
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Output data as JSON
        $data = $result->fetch_assoc();
        echo json_encode($data);
    } else {
        echo json_encode(["error" => "No data found"]);
    }

    $conn->close();
} else {
    echo json_encode(["error" => "ID parameter missing"]);
}
?>
