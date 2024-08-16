<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = $_FILES['file'];

    if ($file['error'] === UPLOAD_ERR_OK) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://backend:3000/api/upload");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, ['file' => new CURLFile($file['tmp_name'], $file['type'], $file['name'])]);

        $response = curl_exec($ch);
        curl_close($ch);

        echo "File uploaded successfully. Response: " . $response;
    } else {
        echo "File upload error.";
    }
} else {
    echo "Invalid request method.";
}
?>
