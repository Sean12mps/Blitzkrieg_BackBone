<?php 

	$requestMethod = $_SERVER["REQUEST_METHOD"];     

	switch ( $requestMethod ) { 

		case 	'POST': 
					$data 		= 	json_decode( file_get_contents( 'php://input' ), true ); 
					$response 	=   $data;
			 	break; 

	};

	echo json_encode( $response );
	exit;