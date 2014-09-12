<?php 
	
	$new_status 	= 	$_POST['text'];

	$response 		= 	array(
								'text' => $new_status
						);

	echo json_encode($response);
	exit;