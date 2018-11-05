<?php  

	if(isset($_POST['submit']))
	{
		$file = $_FILES['file'];
		$newName = $_POST['name'];

		$fileName = $_FILES['file']['name'];
		$fileTmpName = $_FILES['file']['tmp_name'];
		$fileSize = $_FILES['file']['size'];
		$fileError = $_FILES['file']['error'];
		$fileType = $_FILES['file']['type'];

		if($fileError === 0)
		{
			if($fileSize < 1000000)
			{
				$fileDestination = '../sources/' . $newName . '.jpg';
				move_uploaded_file($fileTmpName, $fileDestination);
				header("Location: ../setImagenes.html"); ##Change
			} else {
				echo "Size error";
			}
		} else {
			echo "Upload error";
		}
	}
	
?>