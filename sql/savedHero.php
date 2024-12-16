<?php
// Include the database connection file
include '../dbConnection.php';

// Check if the 'username' parameter is passed via POST
if (isset($_POST['username'])) {
    $username = $_POST['username'];

    // Create the SQL query to select all gladiators for the given username
    $sql = "SELECT * FROM gladiators WHERE username='" . $conn->real_escape_string($username) . "'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Create an array to hold all gladiator records
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row; // Add each row to the array
        }
        // Output all rows as a JSON array
        echo json_encode($data);
    } else {
        // Return an error if no data is found
        echo json_encode(["error" => "No data found"]);
    }

    // Close the database connection
    $conn->close();
} else {
    // Return an error if the 'username' parameter is missing
    echo json_encode(["error" => "Username parameter missing"]);
}
?>
