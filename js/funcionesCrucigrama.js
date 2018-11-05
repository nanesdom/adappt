keys = [];
keysNum = [];
contentArray = [];
wordsVArr = [];
wordsHArr = [];
keysArr = [];
keysNumArr = [];
charArr = [];

function checkAns()
{
	spaces = document.getElementsByClassName("charCruci");

	/*for (var i = 0 ; i < spaces.length; i++) {
		console.log(spaces[i].name);
	}
	for (var i = 0 ; i < spaces.length; i++) {
		console.log(spaces[i].value);
	}*/
	for (var i = 0 ; i < spaces.length; i++) {
		if (spaces[i].name == spaces[i].value.toUpperCase()) 
		{
			spaces[i].style.color = "green";
			console.log('true');
		}
		else
		{
			spaces[i].style.color = "red";	
			console.log('false');
		}
	}
}

function rellenar()
{
	spaces = document.getElementsByClassName("charCruci");
	character = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

	for (var i = 0 ; i < spaces.length; i++) {
		if (spaces[i].value == "") 
		{
			//spaces[i].style.color = "green";
			//console.log(parseInt(Math.random() * 27));
			spaces[i].value = character[parseInt(Math.random() * 26)];
		}
		else
		{
			if (number.includes(spaces[i].value))
			{
				keysNum.push(i);
			}
			else
			{
				keys.push(i);
			}
		}
	}
}

function vaciar ()
{
	spaces = document.getElementsByClassName("charCruci");
	for (var i = 0 ; i < spaces.length; i++) {
		spaces[i].value = "";
	}
}

function saveCrucigrama()
{
	rellenar();

  	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "php/saveCrucigrama.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    spaces = document.getElementsByClassName("charCruci");

    l = spaces[0].value;

	for (var i = 1 ; i < spaces.length; i++) {
		l += " " + spaces[i].value.toUpperCase();
	}

	q2 = document.getElementById('vert').value;

	v = q2.replace(/\n/g, "/");

	q3 = document.getElementById('hori').value;

	h = q3.replace(/\n/g, "/");

	k = keys[0];

	for (var i = 1 ; i < keys.length; i++) {
		k += " " + keys[i];
	}

	k2 = keysNum[0];

	for (var i = 1 ; i < keysNum.length; i++) {
		k2 += " " + keysNum[i];
	}

	//console.log(q);
    
    xhttp.send('l=' + l  + '&v=' + v + '&h=' + h + '&k=' + k + '&k2=' + k2);
}

function getContent2()
{
  fetch('/SocialApp/sources/cruci.txt')
  .then(res => res.text())
  .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => contentArray.push(line));
    divideLines(contentArray);
  });
}

function divideLines(arr)
{
	flagNum = 0; 
	  for (i = 0; i < arr.length; i++)
	  {
	  	if(arr[i].includes(".EOT."))
	  	{
	  		flagNum++;
	  	}
	  	else
	  	{
	   	switch(flagNum)
		{
			case 0:
				charArr.push(arr[i]);
			break;
			case 1:
				wordsVArr.push(arr[i]);
			break;
			case 2:
				wordsHArr.push(arr[i]);
			break;
			case 3:
				keysArr.push(parseInt(arr[i]));
			break;
			case 4:
				keysNumArr.push(parseInt(arr[i]));
			break;
			default:
			break;
	  	}
	  }
	} 
	setGame();
}

function setGame()
{
	grid = document.getElementById('gridCruc');
	for (i = 0; i < charArr.length; i++)
	{
		console.log(i);
		if(keysArr.includes(i))
		{
			grid.innerHTML += '<input type="text" maxlength="1" class="charCruci" name=' + String(charArr[i]) + '>';
		}
		else
		{
			if(keysNumArr.includes(i))
			{
				grid.innerHTML += '<input type="text" maxlength="1" class="charCruciB" name="0" value="' + charArr[i] + '" disabled>';
			}
			else
			{
				grid.innerHTML += '<input type="text" maxlength="1" class="charCruciB" name="0" disabled>';
			}
		}
	}

	quest = document.getElementById('questionArea');
	quest.innerHTML = "<h2>Verticales</h2><br>";
	for (i = 0; i < wordsVArr.length; i++)
	{
		quest.innerHTML	+= "<p>" + wordsVArr[i] + "</p>";
	}

	quest.innerHTML += "<br><br><h2>Horizontales</h2><br>";
	for (i = 0; i < wordsHArr.length; i++)
	{
		quest.innerHTML	+= "<p>" + wordsHArr[i] + "</p>";
	}
}