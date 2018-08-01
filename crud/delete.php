<?php
//get all your data on file
$data = file_get_contents('../db/data.json');

// decode json to associative array
$json_arr = json_decode($data, true);

// get array index to delete

$data = $_POST['data'];

$arr_index = array();
foreach ($json_arr as $key => $value) {
    if ($value['datecreated'] == $data['datecreated']) {
        $arr_index[] = $key;
    }
}

// delete data
foreach ($arr_index as $i) {
    unset($json_arr[$i]);
}
echo($data['datecreated']);
// rebase array
$json_arr = array_values($json_arr);

// encode array to json and save to file
file_put_contents('../db/data.json', json_encode($json_arr));
?>