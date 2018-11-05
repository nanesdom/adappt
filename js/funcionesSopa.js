keys = [];
contentArray = [];
wordsArr = [];
keysArr = [];
charArr = [];

function rellenar()
{
	spaces = document.getElementsByClassName("charSopa");
	character = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	for (var i = 0 ; i < spaces.length; i++) {
		if (spaces[i].value == "") 
		{
			//spaces[i].style.color = "green";
			//console.log(parseInt(Math.random() * 27));
			spaces[i].value = character[parseInt(Math.random() * 26)];
		}
		else
		{
			keys.push(i);
		}
	}
}

function vaciar ()
{
	spaces = document.getElementsByClassName("charSopa");
	for (var i = 0 ; i < spaces.length; i++) {
		spaces[i].value = "";
	}
}

function saveSopa()
{
	rellenar();

  	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "php/saveSopa.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    spaces = document.getElementsByClassName("charSopa");

    l = spaces[0].value;

	for (var i = 1 ; i < spaces.length; i++) {
		l += " " + spaces[i].value.toUpperCase();
	}

	q2 = document.getElementById('words').value;

	q = q2.replace(/\n/g, "/");

	k = keys[0];

	for (var i = 1 ; i < keys.length; i++) {
		k += " " + keys[i];
	}

	//console.log(q);
    
    xhttp.send('l=' + l  + '&k=' + k + '&q=' + q);
}

function getContent4()
{
  fetch('/SocialApp/sources/sopa.txt')
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
				wordsArr.push(arr[i]);
			break;
			case 2:
				keysArr.push(arr[i]);
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
	grid = document.getElementById('grid');
	for (i = 0; i < charArr.length; i++)
	{
		grid.innerHTML += "<button class='charSopa2' value='" + charArr[i] + "' name='0' id='btn" + i + "' onclick='toggleBtn(this.id)'>" + charArr[i] + "</button>"
	}

	quest = document.getElementById('quest');
	for (i = 0; i < wordsArr.length; i++)
	{
		quest.innerHTML	+= "<h3>" + wordsArr[i] + "</h3>";
	}
}

function toggleBtn(btn)
{
	btnToggle = document.getElementById(btn);
	if(btnToggle.name == 0)
	{
		btnToggle.name = 1;
		btnToggle.style.background = 'black';
		btnToggle.style.color = 'white';
	} 
	else 
	{
		btnToggle.name = 0;
		btnToggle.style.background = 'white';
		btnToggle.style.color = 'black';
	}
}

function checkAns()
{
	spaces = document.getElementsByClassName("charSopa2");

	for (var i = 0 ; i < keysArr.length; i++) {
		if (spaces[parseInt(keysArr[i])].name == 1) 
		{
			spaces[parseInt(keysArr[i])].style.background = "green";
			console.log('true');
		}
		else
		{
			spaces[parseInt(keysArr[i])].style.background = "red";	
			console.log('false');
		}
	}
}