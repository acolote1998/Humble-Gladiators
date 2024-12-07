<?php
// Database configuration
$servername = "127.0.0.1";  // Your database server (usually localhost)
$username = "root";         // Your database username (e.g., "root" or another user)
$password = ""; // Your database password (empty if you don't have one)
$dbname = "gladiatorsdb";  // Name of the database you're connecting to

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>