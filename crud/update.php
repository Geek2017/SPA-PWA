<?php
// read file
$data = file_get_contents('../db/data.json');

// decode json to array
$json_arr = json_decode($data, true);

$data = $_POST['data'];

foreach ($json_arr as $key => $value) {
    if ($value['datecreated'] == $data['datecreated']) {
        $json_arr[$key]['Sports'] = "Foot Ball";
    }
}

// encode array to json and save to file
file_put_contents('../db/data.json', json_encode($json_arr));
?>